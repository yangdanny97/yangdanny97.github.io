---
layout: post
title: "Compiler Hacking Part 2: Building a JVM Backend"
description: "Building a JVM compiler backend for Chocopy, a subset of Python 3"
date: 2021-08-26
category: "Compilers"
tag: "Technical"
---

Around a year ago, I [built a compiler frontend]((https://github.com/yangdanny97/chocopy-python-compiler)) for [Chocopy](https://chocopy.org/), a subset of Python 3.6 with mandatory type annotations. In my [blog post for that project](https://yangdanny97.github.io/blog/2020/05/29/chocopy-typechecker), I noted several possible backends that I could extend the compiler to support. 

Part 2 of my Chocopy Compiler Hacking series will be all about how I built a backend to compile this subset of Python to JVM bytecode.

In this post, I will discuss my general approach to the project, and dive into details on how I compiled the more interesting features in Python, like nested functions and nonlocals. I'll also outline some tips for debugging and testing, which may be useful to anyone who wants to implement a JVM backend themselves.

<!-- more -->

## General Approach

The entire Chocopy compiler is implemented in Python, and extends the Chocopy frontend/typechecker I implemented last time. It features a mutable AST, which is transformed and annotated by multiple passes implemented using the visitor pattern. The JVM bytecode is output in a human-readable text format.

Early on in the project I decided that I wanted to generate bytecode in a text format, to simplify the project and so I could avoid dealing with dealing with the binary format of `.class` files. Instead, I could focus on the part I was interested in - compiling different language features. 

To transform the text representation into `.class` files, I decided to leverage the [Krakatau assembler](https://github.com/Storyyeller/Krakatau), as it was the most modern and well-maintained option. The only downside was that Krakatau was not distributed as a package on PyPi - it needed to be cloned from Github and executed as a script.

## Translating Language Features

The overall approach I took for translating most language features was:
1. write a program & translate it to Java
2. compile the Java program
3. disassemble the `.class` file and read the instructions
4. generate those instructions in the JVM bytecode generator for Chocopy

There were several resources I found very useful for reference:
- I frequently consulted the [list of JVM instructions](https://en.wikipedia.org/wiki/List_of_Java_bytecode_instructions) to see the exact behavior of each instruction.
- The [official JVM specification](https://docs.oracle.com/javase/specs/jvms/se8/html/index.html) contained important details about local variables, call frames, and the class file format/directives.

For the most part, expressions, statements, and control flow work similarly between Python and Java, so translating them to JVM bytecode was straightforward. It's also worth noting that classes in Chocopy work essentially the same as classes in Java, so compiling them was trivial. In the following sections, I'll discuss language features in Chocopy that were more interesting or tricky to compile.

### Top-level Declarations, Functions, and Statements

In Chocopy statements, variable declarations, and function declarations may appear outside of a class, but in JVM everything must be part of a class. To accommodate this, I generate a main class for every Chocopy program, which uses the name of the input file. Global variable declarations get compiled to static attributes, and top level function declarations are mapped to static methods. The top level statements are placed inside the `main` method of the main class, which will run when the class is executed.

To illustrate this with an example, let's say we have a Chocopy file called `example.py` with the following contents:
```python
def test()->int:
    return 1

x:int = 0
x = test()
```

The compiler emits bytecode that represents roughly the following in Java:
```java
class example {
    // global variables -> static attributes
    static int x = 0;

    // top level functions -> static methods
    public static int test() {
        return 1;
    }

    public static void main(String[] args) {
        // top level statements go inside main
        example.x = example.test();
    }
}
```

### Operators - Added 6/2023

Most operators were straightforward, with a few that deserve special discussion.
- `//` is implemented with `Math.floorDiv`
- `%` is implemented with `Math.floorMod` - watch out here: the `irem` instruction does not match the behavior of [Python's modulo operator](https://en.wikipedia.org/wiki/Modulo#In_programming_languages)
- `and` and `or` are short-circuiting, so we can't use a single instruction. Instead, they are implemented as ternaries.

### Lists

Lists in Chocopy compile to arrays in JVM. Although arrays are rarely used in Java these days, they are sufficient for our needs here because Chocopy lists don't support dynamic resizing (unlike Python, Chocopy doesn't have an `append()` function).

#### List Concatenation

List concatenation was tricky to implement: while Chocopy supports list concatenation with the `+` operator, Java does not have anything similar for array concatenation. Thankfully, allocating a new array and copying values between arrays can be done with standard library functions. 

When we want to concatenate 2 `Object` arrays `x` and `y`, the compiler generates bytecode equivalent to the following in Java:
```java
int[] result = new Object[x.length + y.length]; 
System.arraycopy(x, 0, result, 0, x.length);  
System.arraycopy(y, 0, result, x.length, y.length);  
```
#### Primitive Lists and Autoboxing

Another problem arises when we want to concatenate arrays of different primitive types. In Chocopy, primitive types are part of the typing hierarchy, so a list of type `[int]` concatenated with a list of type `[bool]` yields a list of type `[object]`. In JVM however, `int[]` and `boolean[]` cannot be copied into an `Object[]`, since the former are primitive types that don't belong to the class hierarchy. 

To solve this problem, I represent `int` and `bool` lists as `Integer` and `Boolean` arrays. Since these wrapper classes are part of the class hierarchy, we are able to concatenate `Integer[]` and `Boolean[]` into `Object[]`. Since these values are represented in JVM as `int` and `boolean` elsewhere, I implemented [autoboxing](https://docs.oracle.com/javase/8/docs/technotes/guides/language/autoboxing.html) to automatically wrap and unwrap `Integer`s and `Boolean`s when values are written to or read from arrays.

#### Empty Lists

In Chocopy, empty list literals have the special type `<Empty>`. They can be used in most contexts that expect a list, with some restrictions. Since all JVM arrays have to have a type when they are initialized, empty list literals also need to be typed. 

I solved this by implementing a new compiler pass that visits the AST using a preorder traversal and assigns types to empty list literals based on the context they are used in.

### Nested functions

Chocopy and Python support nested function definitions, which capture variables from surrounding scopes.In the below example, `func2` inherits the binding for `x` defined in the body of `func1`:

```python
def func1():
    x:int = 0
    def func2():
        print(x)
    func2()

func1() # prints 0
```

Translating this to Java is tricky, because there's no direct equivalent. I considered approaches involving anonymous classes/lambdas, but ultimately I settled on a solution that could be reused for other backends in the future: hoisting all the nested functions to be top-level functions.

The goal of the hoisting pass is to rewrite all nested functions to be top level functions, which can be easily compiled to JVM. The steps are as follows:
1. Compile a list of free variables for each nested function (these are the variables they need to get from surrounding scopes). I accomplished this by collecting all the unique variables used in the function, and removed the ones corresponding to local variable declarations, parameters, and global variables. Since functions can be nested many layers deep, this had to work recursively.
2. Modify nested function definitions to include the free variables explicitly as new parameters.
3. Modify the call sites of each nested function to explicitly pass in each free variable.
4. Move all nested function definitions to be top level functions, renaming them to avoid name collisions.

To illustrate with an example, if we apply the function hoisting pass to the example from above, the new AST would a program that looks like this:
```python
# func2 has been hoisted to the top level
def func1__func2(x:int):
    print(x)

def func1():
    x:int = 0
    func1__func2(x)

func1() # prints 0
```

If all the bindings inherited from the surrounding scope are only read and never assigned, then this transformation would be sufficient to preserve program semantics. However, there are some inherited variables that can be assigned to, which brings us to our next topic...

### Nonlocals

Inside nested functions, Chocopy has a declaration called `nonlocal` which allows assignment of variables inherited from surrounding scopes.

For example, in the following code snippet the value of `x` is being changed inside the body of `func2`.
```python
def func1():
    x:int = 0
    def func2():
        nonlocal x
        x = 1
    func2()
    print(x)

func1() # prints 1
```

Applying the hoisting pass from the previous section results in a program that looks like this:
```python
def func1__func2(x:int):
    x = 1

def func1():
    x:int = 0
    func1__func2(x)
    print(x)

func1() # prints 0 -- wrong!
```
The semantics have changed: the variable `x` inside `func1__func2` is now captured by the added parameter, instead of being inherited from `func1`, so assigning to `x` inside `func1__func2` no longer affects the value of `x` in `func1`.

Instead of passing in the value of variables from surrounding scopes, in these cases we want to pass in a pointer so that the value can be changed. Since neither Python nor JVM supports C-style pointers, we need to create a wrapper class to encapsulate the value of the variable:

```python
def func1__func2(x:Ref):
    x.value = 1 # 1. Don't assign directly to the variable; assign to the value inside the wrapper

def func1():
    x:Ref = Ref(0) # 2. Change the declaration of the variable to wrap the value
    func1__func2(x) # 3. Pass the wrapper to nested functions which write to that variable
    print(x.value) # 4. Unwrap the value before using it in all other contexts

func1() # prints 1 -- correct!
```

Implementing these transformations can be a bit tricky - when we see a `nonlocal` declaration, how do we know which binding from a surrounding scope captures the variable? How do we know which variables need to be unwrapped before using, and which do not?

To solve this, I borrow the idea of variable instances from the [Polyglot compiler framework](https://www.cs.cornell.edu/projects/polyglot/). Every variable binding (declaration or function param) corresponds with a single, unique variable instance. 

Every variable used in the program can be associated with a particular instance. When a variable is used in a `nonlocal` declaration, we can modify its instance, and this information can be accessed from the original declaration of the variable, as well as all other uses of the same variable.

I refined this idea further to use arrays instead of a special reference class. Instead of having a code-generated polymorphic ref class, I chose to just use arrays w/ a single element. Values can be unwrapped by indexing the array, and values can be wrapped by putting them inside a new array. 

With final version of the transformation pass, the output is now something that can be easily transformed into JVM bytecode while preserving the correct semantics:
```python
def func1__func2(x:[int]):
    x[0] = 1

def func1():
    x:[int] = [0]
    func1__func2(x)
    print(x[0])

func1() # prints 1 -- correct!
```

## Testing

Since this backend required several complex AST transformations, I wanted to make sure that the transformed ASTs were still valid programs. To help with this, I wrote a Python backend for the compiler. This was pretty straightforward; since Chocopy is a subset of Python with type annotations, I just needed to print out the AST nodes minus the type annotations. 

To make sure that the generated code was correct, I used the `subprocess` library in my test suite to actually execute the generated code. In order to check expected values in my runtime tests, I extended my compiler to support an `__assert__` standard library function, which takes in a boolean value and throws if it's false. Having this suite of runtime tests for the transformation passes allowed me to be confident that they were correct.

The same approach was used to validate the JVM bytecode generator. Beyond just generating well-formed bytecode, I wanted to verify that the semantics of the generated code matched what I expected, so I again leveraged the `subprocess` library to actually assemble and execute the generated bytecode. Since the same test suite was executed for the Python backend, I could be confident that the JVM bytecode I generated had the same semantics.

## Debugging

One of the trickiest parts of debugging this compiler was when I successfully generated and assembled bytecode into a `.class` file, only for it to fail when I try to execute the file. The reasons for this varied from trying to call a function with the wrong arguments, to storing a value from the stack with the wrong instruction (`aload` for references vs `iload` for ints/bools). 

To debug these issues, I found inspecting the bytecode to be very helpful. Since I figured out how to compile each language feature by reverse-engineering the bytecode generated from compiling its Java equivalent, I could just compare my bytecode with the Java program's bytecode to see the discrepancies.

For more complicated test cases, reading thousands of bytecode instructions was difficult, so I used an [online decompiler](https://www.decompiler.com/) to transform my incorrect bytecode into Java source files. Oftentimes, type mismatches in the bytecode would get transformed into Java source code that had suspicious casts.

## Conclusions

Overall, the whole project took about a month of intermittent work on evenings & weekends. That's surprisingly fast and painless, considering how Chocopy is a non-trivial subset of Python 3 with some pretty interesting language features like classes, nested functions, and nonlocals. Figuring out how to complete each language feature was an interesting challenge, and the additional transformation passes & improvements to the test framework should make extending this compiler in the future much easier. 

For me, this project really highlighted to me some of the advantages of JVM as a target:
1. Interop w/ Java - having the full power of Java's standard library at my disposal made implementing language features a lot easier. For example, the Chocopy standard library functions `print` and `input` can be completely handled by calling Java's standard library, which eliminated the need for me to worry about I/O. While Java didn't support array concatenation out of the box, being able to call `System.arrayCopy` meant that I didn't need to write bytecode to iterate through each array and copy the values. Since Python and Java classes are so similar, I got OOP support for free right out of the box, without having to implement any sort of vtable.
2. Portability - instead of targeting a single instruction set or a particular OS, targeting JVM means that a language automatically becomes portable across many different platforms
3. Good documentation - As someone who is used to missing/incomplete documentation at work, I found it very nice that the JVM documentation was so detailed and clear.

That said, JVM isn't the right target for every language - it's not compatible with languages that require manual memory management, and it might be difficult to compile a language that has substantially different semantics from Java. 

So what's next for me? I've heard WASM brought up a few times at work, so adding a WASM target for this compiler might be a good way for me to learn more about it - there's a [university course that builds a Chocopy->WASM compiler](https://ucsd-cse231-w21.github.io/), and I can reuse much of my work from this project. There's also a [suggestion to add a PPCI target](https://github.com/yangdanny97/chocopy-python-compiler/issues/1), which I've been thinking about for a while. That would require me to bust out my notes for SSA again, but it could be a fun project for later.

Stay tuned for the next post in the series - hopefully it won't take a year like this one did!
