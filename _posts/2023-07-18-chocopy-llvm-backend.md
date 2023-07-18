---
layout: post
title: "Compiler Hacking Part 5: Building an LLVM Backend"
description: "Building a LLVM compiler backend for Chocopy, a subset of Python 3"
date: 2023-07-18
category: "Compilers"
tag: "Technical"
---

In part 5 of my Chocopy Compiler Hacking series, I discuss building a backend to compile [Chocopy](https://chocopy.org/) to LLVM using LLVMLite. In this post, I'll discuss the overall approach & some interesting considerations for building this backend. I'll also compare my experience using LLVM and LLVMLite with the other backends I've implemented for this compiler.

<!-- more -->

For reference, the source code for the compiler is available on Github, and past projects in this series are documented on this blog. It may be worth reading from the beginning for full context, since I don't repeat details that I covered in previous posts.
- [Source Code](https://github.com/yangdanny97/chocopy-python-compiler)
- [Part 1: Frontend/typechecker](https://yangdanny97.github.io/blog/2020/05/29/chocopy-typechecker)
- [Part 2: JVM backend](https://yangdanny97.github.io/blog/2021/08/26/chocopy-jvm-backend)
- [Part 3: CIL backend](https://yangdanny97.github.io/blog/2022/05/22/chocopy-cil-backend)
- [Part 4: WASM backend](https://yangdanny97.github.io/blog/2022/10/11/chocopy-wasm-backend)

## Background

For those unfamiliar with the topic, Chocopy is a subset of Python 3 with static type annotations. LLVM is an extensive toolchain for building compilers that has (among other things) an IR (intermediate representation), optimization passes, and backends for many instruction sets. 

I first considered doing an LLVM backend for this compiler starting back in 2020, I wasn't sure how much work it would be given that LLVM IR was much lower-level than other potential compilation targets I was considering. After building the WASM backend last year, I finally felt like I had enough context to tackle LLVM. Since this compiler was written in Python, I decided to use LLVMLite, a set of Python bindings for LLVM that was originally developed for the numba library.

Before I get started, I'd like to note an observation that the words "frontend" and "backend" are entirely relative terms. Since a compiler is just a series of transformations between text and binary data, something that is a frontend in one context can be a backend in another context. For example, the LLVM backend for this compiler transforms the Chocopy AST into LLVM IR, but when we view the compilation process from Chocopy to native code this entire compiler is a frontend while LLVM itself is the backend.

## Getting Started & Resources

When I was researching this project, I had a pretty hard time finding useful tutorials for LLVMLite, official or otherwise. The official LLVM docs and tutorials were sufficient for high-level concepts, but I really wanted some code examples to reference so I searched Github for repos that used LLVMLite.

In the end, I primarily referenced these two repos to get started:
- [numba](https://github.com/numba/numba/blob/main/numba/core/cgutils.py) (specifically `cgutils.py`)
- Eli Bendersky's [pykaleidoscope](https://github.com/eliben/pykaleidoscope), a translation of the LLVM Kaleidoscope Tutorial for LLVMLite

Numba was probably the most useful direct reference since the source language is Python and it's also the reason why LLVMLite was created in the first place. The codebase was large so it took quite a bit of digging to find what I was looking for. The much simpler pykaleidoscope was fantastic as well, serving as a Rosetta stone of sorts for showing how the concepts in the kaleidoscope tutorial translated to LLVMLite using code.

After getting Hello World to work end-to-end, I moved onto the other features in Chocopy. The [end of the Kaleidoscope tutorial](https://llvm.org/docs/tutorial/MyFirstLanguageFrontend/LangImpl10.html) gave several useful hints on how to approach other features.

When I built the JVM backend, I found it helpful to try to map each Chocopy construct to its equivalent in Java. Similarly, when building this backend I found it helpful to think about how each language feature would look like in C. 

One of my goals for this backend was to avoid having to implement a custom runtime. This meant that memory "management" would be very simple, and external functions would be limited to the C standard library.

### Strings

As mentioned previously, I handled Chocopy's strings exactly like C strings. This allowed me to use C standard library functions to implement most of the string operations I needed.

| Chocopy              | C                                   |
|----------------------|-------------------------------------|
| `string1 + string2`  | `sprintf("%s%s", string1, string2)` |
| `len(string1)`       | `strlen(string1)`                   |
| `string1 == string2` | `strcmp(string1, string2) == 0`     |

Indexing had to be handled specially, since indexing a string in Python yields another string instead of a char. Implementing this was relatively simple. After some bounds checks (more on that in the error handling section), I just allocated 2 bytes worth of memory and stored the character along with a null terminator to get a 1-length string.

Chocopy's `input` standard library function is implemented with a call to `scanf`, differing from Python's `input` in that the length is capped to 100 characters to avoid overflowing the buffer.

### Lists

Chocopy's lists couldn't be represented as C arrays directly since we need to be able to easily get the length of the list for concatenation, indexing, and bounds checks. I used a similar memory layout as I did for the WASM backend - the first 4 bytes used to store the length, followed by the actual array data. 

An alternative memory layout for arrays that I considered was a struct containing the length and a pointer to the actual array. That would have reduced the amount of pointer arithmetic in the compiler but would have been less efficient overall (twice as many allocations per list, an extra dereference each time we index).

List concatenation was implemented by allocating a new list and calling `memcpy`. To provide useful error messages instead of segfaulting, list indexing includes null checks and bounds checks. Chocopy's lists don't support adding/removing elements unlike in Python, so thankfully we didn't need to worry about that (although the [doubling vector](https://github.com/yangdanny97/chocopy-python-compiler/blob/master/tests/runtime/doubling_vector.py) test case shows how Chocopy's existing features can be used to implement a dynamic list).

### Nested Functions and Nonlocals

Nested functions and nonlocals are handled exactly the same way as the other backends: nested functions are hoisted to the top-level, and nonlocals are passed in as references. For more information, refer to the [JVM backend blog post](https://yangdanny97.github.io/blog/2021/08/26/chocopy-jvm-backend).

### Objects

Objects are represented as structs and handled much the same was the WASM backend. There is a global variable storing the vtable for each class, and each object struct stores a pointer to the vtable in addition to its attributes.

Since inheritance is supported by Chocopy, layouts are pre-calculated so that attributes/methods shared by parent and child classes are located at the same indices in the struct/vtable, respectively.

### Memory Management

Due to the existence of global and nonlocal variables in Chocopy allowing values to escape the scope of functions they are created in, the memory for strings, lists, and objects is always allocated in the heap instead of the stack. As with the WASM backend, this memory is never freed so long-running programs will eventually run out of memory. 

As with the WASM backend, I intentionally ignored the memory management aspect to keep the overall project scope manageable in my limited free time. This is a major space for potential future improvements, ranging from analyzing which values are guaranteed to be local (and thus can be stack-allocated) to implementing a full-blown garbage collector.

### Error Handling

The Chocopy spec doesn't define how errors should be handled and LLVM doesn't really provide simple error handling out of the box, so my implementation took a relatively simple approach. 

Errors can be thrown by out-of-bounds checks, null-pointer checks, and assertion failures and cannot be caught. A thrown error will cause the program to exit after printing the type of error and what line it occurred on. 

More complex error handling wasn't warranted, since the main motivation for adding error handling at all was to allow me to debug the compiler more easily instead of having the program segfault all the time and needing to use gdb.

Most of the resources I saw on implementing error handling were overkill due to the lack of `except`/`catch` in Chocopy, so I used the `setjmp`/`longjmp` strategy mentioned at the very end of the Kaleidoscope tutorial. 

In C pseudocode it would look something like this:

```c
jmp_buf __jmp_buf;
int32_t __error_code;
int32_t __error_line;

int main () {
    if (setjmp(__jmp_buf) != 0) {
        if (__error_code == 1) {
            // print error message
            goto END_PROGRAM;
        }
        // handle other error types
    } else {
        // program code goes here
    }
    END_PROGRAM: return 0;
}
```

When an error is thrown, the `__error_code` and `__error_line` globals are set to appropriate values, and `longjmp` is called. 

## Using LLVMLite

In the end, this project wasn't nearly as difficult as I feared. The full implementation of this backend was less than 1000 lines of code, which is roughly inline with the complexity of the other backends and actually quite a bit less than the WASM backend. A big part of this was due to my choice to use LLVMLite to generate the IR.

For the other three backends, the compiler generated the text-formatted IR using a sort of string-builder pattern, which as you can imagine was quite error prone. With this backend, using a proper library like LLVMLite to build the output was kind of a game-changer. I didn't need to generate variable names, manage the stack, create new temporary values for SSA form, and a bunch of other small things that added up to a much faster development process. LLVMLite also performed some validation on the IR before emitting it as text, allowing me to catch and debug some errors faster. 

It wasn't all great, and there were some issues I ran into as well. Some of the LLVMLite APIs had parameters that weren't explained by type hints, the official docs, or code comments in the library itself, leaving me at a loss for how to use them. The documentation was somewhat lacking in examples, tutorials, and just general explanations, in many cases only providing the type signature of the API. 

## Comparing JVM, CIL, WASM, and LLVM

Since I don't currently plan on building any other backends for this compiler, I thought that we could end this post by comparing and contrasting the merits of these four IRs as compilation targets based on my current understanding, gained over the last three years of researching and working on this compiler.

JVM and CIL are most suitable for higher-level languages, since object-oriented features and garbage collection come for free. You don't need to have an imperative language though, Scala and F# are proof that functional languages have no issues targeting these IRs. On the other hand, you're forced to use a relatively complex runtime with garbage collection, so these IRs would be bad targets for systems languages that want more control over memory. Between the two, CIL was easier to target than JVM for me, due to the latter's lack of an official plaintext IR format and assembler.

WASM's biggest selling point is that it allows libraries to be compiled for and run in the browser or other JS environments. Although the core bytecode is mature, garbage collection, standard library, and system interfaces like I/O are not standardized/finalized in the WASM spec yet, which limits the portability of the IR and gives rise to inconsistencies between different runtimes. In practice this makes WASM rather difficult to target directly, since you either have to build your own runtime or match an existing runtime at the expense of portability. It might be better to target another language or IR that can then be compiled to WASM, but that adds complexity into your compilation process.

LLVM is a full-featured and mature toolchain with support for tons of backends, including WASM. Additionally, it supports both static compilation and JIT compilation. This allows your compiler to generate well-optimized code for any platform/environment without the need to build a bunch of different backends. Runtime support is a different story though - as its original name "Low Level Virtual Machine" implies, LLVM is low-level and doesn't come with runtime support like garbage collection, so if you want garbage collection you'll have to implement a custom runtime for each platform. Depending on your language's needs, LLVM may be overkill - all these backends and optimizations come at the cost of bloat and speed. If your language doesn't need to run on every platform, if you want to minimize the binary size of the compiler itself, or if you want to compilation to be very fast, then LLVM may not be the best choice for you.

## Conclusion

Overall, I really enjoyed the experience of learning about and working with so many different runtimes and toolchains in this whole series of projects. In the end, the compiler that I produced wasn't really the most important part, since these projects were just a structured and practical way for me to learn/teach myself these new technologies. To that end, they accomplished the goal admirably. Using the same source language each time was intentional to reuse previous work and keep the scope of each project small, but it was also a major limitation of the project since I basically implemented the same set of language features four times. My future projects in the PL/compiler space will probably focus on one of the areas that I intentionally neglected in this series of projects - either higher level like interesting language features, type systems, and static analysis, or lower level like garbage collection.
