---
layout: post
title: "Advent of Code 2022 in Erlang"
description: "My thoughts as a newcomer to Erlang"
date: 2022-12-27
category: "Technical"
---

This year, I decided to do [Advent of Code](https://adventofcode.com/2022) using [Erlang](https://www.erlang.org/doc/index.html). My main interest in doing AoC is not the puzzles themselves - for me, it's just an excuse to learn/practice/evaluate various programming languages. 

Therefore, I won't bother with describing my solutions to each problem in this post. If you want to know about that, just check out the [source code](https://github.com/yangdanny97/advent-of-code-2022-erlang). 

Although algorithmic puzzles are outside of the typical use case for Erlang (building distributed systems), I found that Erlang was surprisingly suitable for the task. Although Erlang is a functional language and the puzzle solutions I came up with were written in a functional style, there were quite a few features that made writing scripts in Erlang feel a bit like writing Python. 

## Highlights

Erlang ended up being surprisingly easy to pick up; although the syntax was quite different from other popular languages, there were very few pieces of syntax to actually learn. 

Some of my favorite features include:
- dynamic typing is very nice for development speed; static typing offers minimal benefits for quick and dirty scripts where the inputs are tightly controlled, as is the case for AoC
- `erlang:display` and easily printable collections (lists, tuples, ordsets, maps) were super useful for debugging
- easy conversion between many built-in data types (`tuple_to_list`, `list_to_integer`, etc)
- list comprehensions
- guards in function headers help keep code clean and reduce conditional nesting

All of these features aside from function guards are also found in Python, hence why I say that the two languages feel surprisingly similar in a scripting context.

## Mixed Feelings

There were also a few features that took some time to get used to:
- single assignment - unlike in OCaml, a name can't be shadowed and bound to a different value in the same scope. This is fine for clarity/disambiguation purposes but it could be strange for people not used to coming up with so many variable names - my code ended up being littered with variables like `Foo`, `Foo2`, `Foo3`, etc.
- lack of pipe - piping allows nested function calls to be more cleanly composed as a sequence of operations, making code more readable. This feature does not exist in Erlang, so the programmer has to manually assign the result of each step to a new variable, creating a lot of extra variables which all need unique names (see above).
- strings are lists of integers - this is an interesting one because it actually made doing AoC puzzles (which had ASCII inputs) easier, but I imagine it would make processing anything with unicode more difficult

## Comparison to Last Year

Last year, I did Advent of Code using another functional language: ReScript. Unlike Erlang, ReScript is intended for web development - it has static typing with a type system inherited from OCaml, and it can interoperate with JavaScript.

The primary use cases for the two languages are very different so it's unwise to directly compare the two languages as a whole, but I would say that for the very narrow case of solving programming puzzles I prefer Erlang because its more concise syntax and dynamic typing allowed me to implement solutions faster. 

## Final Thoughts

The two simple takeaways here are:
1. Erlang is a cool language that is pleasant to write and surprisingly easy to pick up.
2. Advent of Code is a fun excuse to learn and practice new languages, you should try it if you've never done it before.