---
layout: post
title: "Rewriting a Project in ReScript"
date: 2021-07-09
category: "Technical"
---

This blog post describes my experience incrementally rewriting a small [project](https://github.com/yangdanny97/fire-emblem-chess) in [ReScript](https://rescript-lang.org/). I'll talk about why I decided to migrate languages, how I approached the migration, and my thoughts on the language. I hope this will be useful to anyone considering starting a new project or rewriting an existing project in ReScript. 

Note that this project did not use ReScript-React, and the parts migrated to ReScript did not include any UI-related code.

## Background
Several months ago, I built a [pass & play browser-based chess game](https://github.com/yangdanny97/fire-emblem-chess) entirely using Javascript. While I was developing the project, I realized several things:
- Implementing a game like chess in JS requires some very complicated state management. Immutability and a functional approach would be preferred here, but that is difficult to do in JS.
- In a codebase with a lot of branching logic and special cases, iterating quickly was difficult without strong static typing/null-safety (which Javascript doesn't have) or an extensive test suite (a rarity for personal projects such as this)

## Why I Chose ReScript
For those unfamiliar with the language, ReScript is a functional programming language which has the same type system as OCaml, and compiles to Javascript. It can be used to write UI code or backend logic, and since it compiles to JS, it can interoperate with existing JS code.

Before this project, I didn't have a lot of exposure to ReScript. I used it once for work a few months ago, but that was it. However, I did have a lot of experience with OCaml and functional programming. Since ReScript was supposed to have the same functional features and type system for OCaml, I was optimistic that ReScript would provide many of the same benefits as OCaml and hopefully solve some of the problems I outlined earlier. 

For me, the biggest/most game-changing features in ReScript were:
- Strong static typing with type inference - fewer runtime exceptions without having to annotate types everywhere
- Options - null-safety hooray
- Pattern matching - cleaner and more powerful than Javascript's if statements & instanceof checks
- Immutability by default - no complicated state management

Of course, lack of strong typing could have been solved by rewriting the project in TypeScript (which would have been much less work). A full comparison with TypeScript is out of scope for this blog post, but ReScript's soundness, immutability, type inference, lower verbosity, and pattern matching led me to choose it over TypeScript. In case you haven't realized already, I'm a big fan of functional programming.

## Migration Process

I approached the migration by starting with core logic and rewriting one class at a time into ReScript. Ultimately, I migrated around 80% of the codebase to ReScript, leaving only the event listeners, sound, and rendering code in Javascript. 

### Setup

Project setup was smooth; I followed the tutorial on the official docs to install the compiler & editor integrations, and followed the instructions [here](https://webbureaucrat.gitlab.io/articles/setting-up-webpack-for-rescript/) to integrate with webpack. The compiler is quite fast and the editor integrations are solid as well. 

### Goals

At the beginning of the rewriting process, I knew that the rendering code would remain in JS, due to its heavy usage of the D3 library. Rewriting it in ReScript would have meant either 1) adding typed bindings for every D3 function that I use, or 2) using an untyped binding, which misses the whole point of migrating to ReScript in the first place (type-safety).

As part of the conversion to ReScript, I decided to change parts of the logic to leverage immutability and functional features in ReScript to the fullest extent possible. This meant that Classes would be converted to Records & Variants, Arrays would be converted to Lists, and methods would be converted to static functions. The original codebase already made extensive use of functional APIs like map/filter/reduce, and converting those sections of code to ReScript was relatively straightforward. 

### Data Shimming

Because this conversion was done in stages, one of the trickier things I had to deal with was interop between the new ReScript sections and the rest of the codebase. Normally, interop would be a piece of cake if I had stuck with using Arrays in all my code. However, since I was sticking to a more functional style in this rewrite, the new code used Records and Lists instead of Classes and Arrays. This meant that I had to write some helper functions to shim the data between JS and ReScript. 
- When JS code calls a ReScript function that returns a List, the caller converts the output to an Array using `Belt.List.toArray`. 
- Variants (tagged unions) have a wrapper object which contains the tag; shimming that data mainly involved replacing `instanceof` checks with checks on the `TAG` field, and changing the JS code to account for the new wrapper layer when accessing those objects.
- Nullability also required some modifications to handle; since `None` in ReScript maps to `undefined` in JS, I converted my codebase to use `undefined` instead of `null`. This is impractical for larger projects, in which case the [`Js.nullable`](https://rescript-lang.org/docs/manual/latest/api/js/nullable) library may help.

Overall, as I converted more of the project to ReScript the need for shimming was reduced. By the end of the rewrite, all the shims were removed. 

### Before & After

Some stats, plus commit pointers if you want to check out the code for yourself.
| Before                    | After                           |
|---------------------------|---------------------------------|
| ~1050 LOC JS              | ~1050 LOC ReScript, ~200 LOC JS |
| [Commit before the rewrite](https://github.com/yangdanny97/fire-emblem-chess/tree/4846a94c4a729ee957bb1713f048acea35b8dff2) | [Most recent commit](https://github.com/yangdanny97/fire-emblem-chess)       |
<br>

Before I conclude this section I'd like to mention that the official ReScript docs has a tutorial for [converting from Javascript](https://rescript-lang.org/docs/manual/latest/converting-from-js) which provides some generally sound advice. I did not see it until I finished converting my project :P 

## My Thoughts on ReScript

### Syntax

As someone who knew OCaml going in, learning ReScript wasn't too tricky, since it was basically an alternate (dare I say, nicer) syntax for OCaml. The main syntax differences from OCaml bring ReScript closer to Javascript syntax (curly braces, parentheses around function calls, etc), so JS developers should be able to easily read and understand ReScript. 

### Feels like OCaml

The functional nature of ReScript, along with features like Lists, Variants, Options, and Records, are very much second nature to anyone who has used OCaml, although for someone with no functional programming experience the learning curve may be a bit steeper.

Like in OCaml, both mutable and immutable data types are supported, although perhaps ReScript promotes mutability a little more than OCaml does (more on that later). Although interop with Javascript is always a looming concern, it's entirely possible to implement something in ReScript basically the same way you would implement it in OCaml.

### Documentation

I was pleasantly surprised by the documentation: the core language documentation was clear and easy to understand; the ReScript/Javascript code snippet comparisons were especially helpful to see what each language construct mapped to at runtime.

However, it's not all perfect. Some [older docs](https://rescript-lang.org/docs/reason-compiler/latest/class) haven't been converted from the ReasonML syntax yet, and aren't linked from other documentation pages. The sections about external bindings were a bit unclear to me, and it took me several tries to get them working correctly. Another part that seems lacking is documentation on attributes/decorators; although they're mentioned in the interop docs, I've been unable to find an exhaustive list of attributes and what they do.

### Interop
Interop between the various data types in ReScript & JS is clean and intuitive for the most part, aside from some complications for Lists, Classes, and Variants. 

Lists are represented in JS as a nested object that looks roughly like
```
{
  hd: 1,
  tl: {
    hd: 2,
    tl: {
      hd: 3,
      tl: 0
    }
  }
}
```
which means that Lists aren't easily manipulated or accessed in JS code, although ReScript's standard library functions may be used directly in the JS code in cases where List values need to be manipulated in JS.

Although Classes and OOP exist in OCaml, interop for Classes between ReScript & JS is a bit more complicated and the level of support for classes in ReScript is unclear. There is [old documentation](https://rescript-lang.org/docs/reason-compiler/latest/class) for Class interop, but it is written for ReasonML.

Variants are also represented as a nested object:
```
{
    TAG: 0, // which type the object is
    _0: {...} // your actual object
}
```
Using them in JS is possible, but it's a bit of an abstraction leak and [isn't recommended](https://rescript-lang.org/docs/manual/latest/shared-data-types) by the official docs.

### Lists vs Arrays

ReScript's List data type, an immutable, singly linked list, is an idea taken from OCaml. The main benefit to Lists is that they're immutable, at the cost of worse performance for most operations compared to Arrays.

While both Lists and Arrays are supported in ReScript and OCaml, it feels like ReScript heavily prefers using Arrays over Lists, while the opposite is true in OCaml. Indeed, the documentation says that ["Arrays are our main ordered data structure."](https://rescript-lang.org/docs/manual/latest/array-and-list) There's several reasons for this preference:
- Lists have worse performance in ReScript than in OCaml due to Javascript lacking tail recursion
- Lists don't interop cleanly with existing Javascript code, while Arrays map 1:1 to Javascript arrays. 

In practice, this means that if you decide to use Lists, you either have to convert them back and forth from Arrays whenever you pass them between ReScript and JS, or you have to change the JS code to use Lists as well. The former has performance issues and the latter is probably a bad idea. 

In my case, I explicitly chose to use Lists over Arrays despite the performance implication, because immutability was important and because I knew that the Lists I was dealing with were small (a maximum of 32 pieces & 64 squares on the board).

### Records vs Objects

Records and Objects in ReScript both map to Javascript objects at runtime, although they have pretty different behavior in the type system. The main limitations for Records are that they cannot be extended and are not structurally typed (so it's impossible to write a function that takes in any record with a certain field). On the other hand, Objects are structurally typed, but they don't support pattern matching & don't support updates unless they're imported from JS.

To newcomers, this can be confusing - if they both compile to the same thing, why are there weird limitations on each? Ultimately this can be traced back to OCaml's type system; Records and Objects were originally two separate concepts in OCaml that happened to compile to the same thing in ReScript, resulting in the aforementioned differences in typechecking. This is one of the few downsides of trying to build a new language using another language's type system - which has led me to view ReScript more as "OCaml that runs in the browser" than as a distinct/separate language.

## Conclusion

Overall, converting this project to ReScript was a very positive experience for me. Picking up the language wasn't too difficult, and the compiler & tooling were reliable and fast. ReScript retains not only OCaml's type system and functional feel but also its flexibility in supporting mutability and side effects. For all the features that ReScript adds, interop with JS is still surprisingly good, although advanced data types may require some shimming between ReScript & JS code. I had a lot of fun learning and writing ReScript, and I'd definitely recommend it to any Javascript developers looking for a taste of something new and refreshing.
