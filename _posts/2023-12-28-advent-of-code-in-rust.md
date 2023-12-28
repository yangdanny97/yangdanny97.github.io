---
layout: post
title: "Advent of Code 2023 in Rust"
description: "My thoughts as a newcomer to Rust"
date: 2023-12-28
category: "Technical"
tag: "Technical"
---

This is my third year doing [Advent of Code](https://adventofcode.com/2023). In the past, I've used it as a way to practice problem solving & learn new languages. This year, I decided to try Rust.

My team at work has a sizable Rust codebase that I've touched a few times in the past, so this was a good opportunity to get a feel for the language and hopefully get better at my job.

Since folks have been hyping up ChatGPT for a while, I was also curious to see how useful it would be for learning a new language. I didn't use it for any of the problem solving parts, and mainly just used it to explain compiler errors and as an alternative language documentation (think, "how do I split a string at each colon and semicolon").

As usual, I won't bother with describing my solutions to each problem in this post. If you want to know about that, just check out the [source code](https://github.com/yangdanny97/advent-of-code-2023-rust). 

<!-- more -->

## Highlights

A lot of things really impressed me about Rust:
- tooling/ecosystem - I knew cargo was pretty great from using it at work, but I had never set up my own project from scratch before. Generally speaking the experience was a breeze (with one exception for a particular crate, which I'll touch on later). The VSCode extension was responsive and helpful, and having a formatter out of the box was great as well. I think this standard is what I would hold most newer languages to, and certainly the development experience compares favorably with the likes of C# or Swift, both of which almost require an IDE and the former not having an official formatter at all.
- clippy - Having a built-in linter is a huge boon for newcomers trying to learn the language, since it can prevent bad habits from forming. It was surprisingly opinionated, but I welcomed the suggestions for keeping my code clean.
- `derive` - Having the compiler automatically implement useful traits was very nice for AOC. Since I like to do a lot of print-debugging for these problems `#[derive(Debug)]` was particularly helpful.

## Mixed Feelings

Overall I think the borrow checker and the idea of ownership is great. I also don't think I've run into any horribly hairy situations with the borrow checker yet, since the code I wrote for AOC was mostly simple procedural code. 

I found that writing code in a functional style helped keep the borrow checker happy. I ended up writing a lot of functions where I take a container, update it, and return the updated container. If I really wanted functions with side effects, I could have made some custom traits for the containers I cared about, but for scripting purposes I found just returning the updated container from a regular function to be adequate. For more complex update-or-insert style operations on HashMaps, I found `entry` to be very useful. 

The trickiest situation that I ran into was probably is the "using a value in the container == borrowing the whole container" thing. I had a `HashMap<String, int64>` and I wanted to find & remove the mapping with the largest value (like a priority queue, but `O(n)`). My initial intuition was to use `max_by_value`, which should give me both the key and the value, but that borrows the whole container due to returning a reference to the value, preventing me from removing the mapping later on.

Another strange (hopefully not-representative) issue that I ran into was some linking errors when I tried to use the `z3` crate. I tried a number of solutions, including building z3 from source, but in the end I was unable to get it to work in Rust. For that particular puzzle, I gave up and just printed the constraints out and ran the z3 binary manually.

I had some small syntax nits as well:
- type parameters: `collect::<Vec<_>>()` is a little too many angle brackets for my liking, I would have preferred for it to just be `collect::Vec<_>()`, though there might be ambiguity issues preventing that
- the `?` operator is neat, I just wish it also worked with options

## ChatGPT

In the first few days there was speculation/hysteria in the community that the problems had become a lot harder to stop people from solving them with ChatGPT. Looking at the problems this year as a whole, I don't think this was the case. The instructions for each puzzle have historically been pretty convoluted (at least for the years I've done it), and there's no way ChatGPT would be able to solve anything past the first few days without heavy prompting, if it could even solve it at all.

In any case, I was never interested in using ChatGPT to solve the whole problem, just as a learning aid and a way to generate examples or explain errors. I would say its performance was barely satisfactory overall. 

It could give examples for very simple things, but the examples tended to be quite verbose unless I specifically prompted it for a one-liner. It also didn't suggest some pretty obvious shortcuts like `split_whitespace`, and I ended up getting a number of good suggestions from Reddit comments that I didn't learn from ChatGPT or clippy.

For explaining compiler errors, it was good at explaining the error messages abstractly, but it did not give correct/useful responses the few times I asked "how can I rewrite this snippet to avoid the error".

## Final Thoughts

Overall, it was another fun set of puzzles to close out the year, and it's always good to get some algorithms practice without needing to grind Leetcode. 

The toughest part of this year was probably being on the East coast, since the problems release at midnight. I certainly can't stay up late every night for a whole month straight, so halfway through I gave up and started doing them the morning after. 

I'm not sure if I'll do this again next year - maybe I'll spice it up with this [distributed systems challenge](https://fly.io/dist-sys/1/), or do something data vis related.

