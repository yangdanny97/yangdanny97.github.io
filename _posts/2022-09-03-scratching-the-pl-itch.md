---
layout: post
title: "Scratching the PL Itch"
description: "How to use compilers and programming languages skills in industry without being a compiler engineer"
date: 2022-09-03
category: "Compilers"
tag: "Technical"
---

When browsing programming forums online, I often see people ask questions along the lines of "is a background in PL/compilers useful in industry?"

<!-- more -->

I can't blame them for asking the question - 90% of discussion on PL and compilers topics online are either A) highly academic and theoretical, or B) hobbyists making a new language for fun. At a glance, it can be hard to see how knowledge about PL and compilers can be used practically in day-to-day work, outside of academia and side projects.

Of course, you could just work as a compiler engineer - big tech companies hire compiler engineers all the time to specifically work on languages, optimizations, and static analysis. 

But, as it turns out, you don't even have to be a compiler engineer to scratch the PL itch - PL/compilers knowledge is applicable to many other aspects of software engineering. 

At its most basic level, knowing the theory behind how language features work will help you take advantage of the full power of the languages you use, and it will help you select the right language with thr right features. for your team or company to use for a new project.

In the rest of the post, I'll outline a few areas that PL & compilers knowledge can be applied to in a regular software engineering job, from least specific to most specific. These examples are based on both my own experiences and conversations I've had with coworkers.

## API Design

Language design skills are very helpful when designing APIs. Whether you're writing a library, a framework, or just another layer of abstraction for your product, the design of the API matters a lot. A well-designed API is easy to learn, hard to make mistakes with, and is expressive enough to support a wide range of use cases. These are all considerations that language designers have when deciding what features to support in a programming language.

Sometimes, the most complex APIs approach the complexity of a small language, blurring the line between APIs and domain-specific languages. For example, ORMs allow programmers to express some subset of SQL using classes and methods. 

Unlike designing a language, when designing an API we are restricted to the syntax and semantics of the host languages. A solid understanding of the design and featureset of different languages is beneficial.
- ease-of-use - the API itself should be idiomatic and concise, but the underlying implementation might require advanced features like metaprogramming or reflection to create that user experience
- safety - APIs often have restrictions on how they can be used, but it's not always as simple as making functions with the right type signature. Designing an API so that as many restrictions can be statically checked as possible is not easy - for example, if your API uses the builder pattern to add one argument at a time, how would you make sure that all the required arguments are provided?
- expressiveness - a more expressive API is generally desirable; it can be used in a wider range of use cases, saving time and money down the line. An ORM written to support the bare minimum queries, or it may support a wide range of operations like joins and filters - it all depends on the skills of the API designer and the constraints of the host language.

## Code Generation

At a certain scale, it becomes difficult to maintain large hand-written APIs if they are based on some external source-of-truth (for example, wrappers for external functions, SQL tables, or other configurations). As source-of-truth changes, the code needs to be updated as well - a manual process which can be slow and error-prone. 

One way to solve this is via automatic code-generation - essentially, writing a source-to-source compiler from your source-of-truth to the code you want to generate.

For example:
- For an ORM, you might compile a database schema into type-safe wrappers to query and modify tables and rows, so that you don't have to write queries as raw strings. One example of this is [Ent](https://github.com/ent/ent)
- For function bindings, you might compile function signatures in one language to function signatures in another language. One example of this is [GenType](https://rescript-lang.org/docs/gentype/latest/introduction).
- For web APIs, you might define a schema for what payloads are accepted and automatically generate boilerplate to handle and validate requests, that way you don't have to parse JSON into arbitrary objects and validate the payloads manually. Examples of this include [Swagger](https://swagger.io/) and [JSON schema](https://json-schema.org/).

The structure of a code generation tool is exactly that of a simple source-to-source compiler:
1. Parse the source language or schema. If your source-of-truth is something like SQL or JSON or XML, off the shelf parsers may already exist. Otherwise, you might need to write your own.
2. Perform static analysis - for example, validating that schema changes are backwards-compatible.
3. Output source code in your target language.

How frequently you need to spin up custom code generation depends heavily on what your source of truth is and what language you're working in, but the coverage of existing open-sourced code generation tools is far from complete.

## Domain-Specific Languages

Sometimes, your source of truth for codegen isn't a declarative, static schema - for example, if you have a custom configuration format and you want to add some scripting capabilities to allow other engineers to customize their configurations. In situations like that, sometimes the best tool for the job is to write your own language.

Writing your own domain-specific language is probably the most direct application for PL/compiler skills I've discussed, but it's also the hardest to do outside of the biggest tech companies with the most resources to spare. 

Some DSLs in industry are used by hundreds of engineers, and are maintained by a team dedicated to improving developer experience. Sometimes they get open-sourced (GraphQL and [CG/SQL](https://cgsql.dev/) for example), but in many other cases they are only used internally at one company and never see the light of day. DSLs are surprisingly common at giant tech companies - in my two years at Meta I've used four DSLs that had more than a hundred users, and heard about several more at Google and other companies.

You might be wondering: what counts as a DSL? The line between an API, a codegen tool, and a DSL are not as sharply defined as one may think, and DSLs may come in many forms.

For example, a DSL doesn't need to have a bespoke syntax and parser to count as a language, many DSLs are subsets or extensions of other languages. I've worked with DSLs that are based on XML, SQL, Python - co-opting the syntax of another language but generating code for a completely different runtime.

In fact, a DSL doesn't even need any syntax at all! I've also worked with that can only be used by building their AST programmatically in another language. These were definitely "languages": they supported variables, control flow, and functions; their compilers had static analysis and generated source code or bytecode. They just didn't have a standalone syntax, and that's fine. Designing that type of language is an interesting blend of API design and language design.

## Aside: Web Performance

I've had multiple engineers working on performance for web applications tell me that a compilers background has been helpful to their job, and it was the topic of one of the most memorable industry tech talks I attended when I was in college. 

For the heaviest web applications, dynamically loading resources on-demand is vital to ensure that the initial page load time is performant. Dominator trees can be used to model the dependencies between resources, allowing optimizations to be made similar to how dominator trees are used for compiler optimizations.

## Final Thoughts

Even though programming language design and implementation skills seem niche (after all, how many new languages do you need?), they're actually very relevant to other areas of software engineering. The definition of what actually counts as a language or a compiler is pretty blurry, and software that isn't explicitly a compiler can still have similarities to what we traditionally consider to be a compiler.

After reading the post, you might be inspired to try to convince your manager to let you write a DSL for your team - if you do, don't tell them it was because of me! While I don't know if writing a new language is the best use of your time at work, the key takeaways you should get from this are:
- There's plenty of opportunities relevant to people with a compilers/PL background outside of academia and being hired specifically as a compiler engineer.
- In general, compilers/PL knowledge is quite applicable to software engineering, and knowing how programming languages work will make you a better programmer/engineer.