---
layout: post
title: "Compiler Hacking Part 1: Building a compiler frontend in Python"
description: "Building a typechecker for a subset of Python, using Python"
date: 2020-05-29
category: "Compilers"
tag: "Technical"
---

A while back, I thought about trying to hack around with various languages and compilers for fun/practice. Since I'm still pretty busy with research currently and I start work in 2 months, I decided from the outset to keep my projects limited in scope. 

After taking a peek at the project ideas page for Cornell's [grad compilers course](https://www.cs.cornell.edu/courses/cs6120/2019fa/), I decided that Chocopy seemed like a suitable language to work on. [Chocopy](https://chocopy.org/) is a subset of Python 3.6 that is used for UC Berkeley's compilers course and has a reference compiler implementation built in Java. 

For the first project, I built a compiler frontend for Chocopy. It was implemented in Python, in order to leverage Python's built-in parser and the `ast` module. Despite using a different language, I wanted to maintain compatibility with Chocopy's reference implementation, which would allow Chocopy's backend to generate assembly using typechecked ASTs from my frontend.

<!-- more -->

Here's a link to the source code for this project: [Chocopy Python Frontend Source Code](https://github.com/yangdanny97/chocopy-python-frontend).
 
### Parser

Since Chocopy syntax is a subset of Python 3, all valid Chocopy can be parsed by Python's built-in parser (`ast.parse`). 

The first task in this stage involves validating the Python AST that the parser produced, to ensure the source code doesn't have anything that's legal in Python but not legal in Chocopy (imports, comprehensions, slices, multiple inheritance, etc). To support static type checking, Chocopy has mandatory type annotations in variable/attribute/function definitions.

One interesting difference: unlike Python, Chocopy makes a distinction between declarations and statements and requires that all declarations precede all statements. Chocopy also only allows declarations to appear at the top level of each program and at the beginning of functions. This was probably designed to make typechecking and code generation easier for students building Chocopy compilers. 
- On the typechecking side, handling scopes is simplified because loops can't declare new variables with the iterator, and if-statements and loops can't declare new variables inside their bodies. 
- On the code generation side, this makes it easier to calculate the amount of space on the stack to allocate for local variables in each function, by simply counting the number of declarations at the beginning of the function.

Aside from syntax validation, the Python AST nodes also need to be converted into their equivalent Chocopy AST nodes, which contain methods for typechecking and dumping to JSON. 

Working on the Python AST is surprisingly simple, thanks to the `ast` module. Using the `NodeVisitor` class, I handled the AST validation and conversion in a single pass. 

I found the documentation on [Green Tree Snakes](https://greentreesnakes.readthedocs.io/en/latest/nodes.html) to be helpful in working with Python's AST; for some reason, the Python3 official docs for the `ast` module doesn't describe each AST node, but I was able to find details on each AST node in this resource.

### Type System/Typechecking

Chocopy's type system is pretty simple. The primitive types are `int`, `bool`, and `str`. User-defined classes with single inheritance are supported, with `object` at the top of the typing hierarchy. The concept of null exists with `None`, which can be assigned to anything that isn't a primitive. Lists are supported but dictionaries and sets are not. Higher-order functions and anonymous functions are not supported.

Since lists don't have mutable lengths in Chocopy, they actually behave more like Java's arrays, but with one big difference: Chocopy lists have invariant subtyping, while Java arrays have covariant subtyping. 

To illustrate this with an example, Java's type system allows code such as the following:

```java
Cat[] cats = {new Cat(), new Cat()};
Animal[] animals = cats;
animals[0] = new Dog();
```

Java's type system does not catch this error because `Cat[]` is a subtype of `Animal[]`, but when the third line is executed there will be a runtime error, because a `Dog` can't be placed into a `Cat[]`.

In Chocopy, lists have invariant subtyping:`[Cat]` is not a subtype of `[Animal]`, even though `Cat` is a subtype of `Animal`. That feature, along with disallowing `[None]` on the right side of multi-assignment statements, means that it is impossible for 2 pointers with different types to point to the same list.

When building the typechecker, I frequently referenced the [Chocopy language manual](http://www-inst.eecs.berkeley.edu/~cs164/sp19/chocopy_language_reference.pdf), which included all the typing rules. Implementing them was pretty straightforward with the visitor pattern.

Since compatibility with the reference implementation was the main goal, there were a few key features that the typechecker needed to have:
- errors messages needed to be attached to the AST nodes that caused them
- typechecking can't fail after a single error; instead, it should try its best to continue typechecking and report as many errors as possible

In practice, this meant that the typechecker would still add bindings for classes and functions even if their bodies didn't typecheck, and that expressions that didn't typecheck would just be assigned the type of `object`. 

### Compatibility

Chocopy's reference implementation uses JSON as an intermediate representation - the AST can be dumped after each stage, and later stages can accept those files as input. 

Overall, I tried my best to maintain compatibility with the reference implementation, in order to be able to use the test cases provided in the CS164 release code. This meant that the typechecker needed to match the reference implementation almost exactly: it had to return with the exact same number of errors, attached to the exact same nodes. 

Initially, I tried to use structural equality to compare my AST and the AST from the test cases. However, I soon discovered some issues that led me to loosen some restrictions. 

Chocopy represents node locations as 4-item lists of `[start line, start col, end line, end col]`. Python's built-in parser doesn't provide the end position of nodes, and in some cases the starting column was slightly off -- additionally, many nodes (especially names) are represented in the Python AST as raw strings, whereas Chocopy requires them to all have positions. In the end, I allowed tests to pass if the starting line of each node matched.

I made no attempt to have the exact same typechecking error messages as the reference implementation; as mentioned before, I simply checked the number of errors and the nodes those errors were attached to. I also ignored inferred types unless they were present in both ASTs, because certain typechecking errors in the reference implementation caused child nodes to not be visited. There's no functional difference from having the extra annotations, so I decided to let that slide.

### Conclusion

For me, this was a pretty fun project, and I hope to do more projects like this in the future. I built a compiler frontend in ~2000 lines of code, and learned a lot about Python's `ast` module and its import system in the process.

For others, this project is an example of a non-trivial use of the `ast` module and the visitor pattern -- when I was learning about these things, I had trouble finding good examples of either so I hope that this project can serve as a good example.

I've got a few ideas for future projects, involving compiler backends. For example, compiling Chocopy to LLVM IR and/or JVM bytecode. These ideas would let me build on top of and leverage parts of the reference implementation. They would also let me get my feet wet in terms of working with LLVM and JVM (although since the Chocopy compiler is in Java I'd have to use the Java bindings instead of working with LLVM directly). 

Another idea I had was connecting the Chocopy compiler to the optimizing backend of [XiC](https://github.com/yangdanny97/xic), creating a chimera (the head of a snake and the tail of a ...Xi?) that can compile Chocopy to x86-64. Time permitting, I'll take a stab at all of these ideas, but we'll see. 

Special thanks to [Dee Guo](https://github.com/deeguo) for helping with this project.

