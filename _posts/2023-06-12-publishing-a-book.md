---
layout: post
title: "Reflections on Writing My First Book"
description: "The story of how I wrote my first book"
date: 2023-06-12
category: "Technical"
---

At the beginning of 2023, I published [a functional programming book](https://yangdanny97.github.io/book).

The goal of this blog post is to tell the story of the entire writing and publication process. Although I can't say that I know all the ins and outs of publishing from writing this single book, I hope my story is useful - whether you're interested in publishing a book or you're just curious about how it all works.

To frame the story, here a summary of the timeline:
- 11/2021 - book proposal
- 12/2021 - contract signed
- 3/2022 - first three chapters deadline
- 9/2022 - first draft deadline
- 10/2022 - technical review and revisions
- 11/2022 - final proofing
- 1/2023 - publication

## November 2021: Proposal

To be honest, it wasn't even my idea to write a book. Apress, a publishing company under Springer, reached out to me after reading a blog post I wrote about a side project I had built using ReScript. Since there were no books about ReScript at the time, they probably felt like there was an untapped market. 

At first, I didn't think that I was the right person to do this. My experience with ReScript wasn't particularly impressive: I had used it a few times at work and had dabbled with it in side projects. But the more I thought about it, the more I realized that experienced ReScript users weren't the right target audience for the book. 

ReScript, with its functional roots in OCaml and integration with the web ecosystem, was a really great vehicle for introducing functional programming concepts to web developers. Just like how OCaml is used to teach functional programming in universities, except even more accessible - no formal computer science education needed, just knowing a bit of JavaScript is enough. With that target audience in mind, I became a lot more confident in my vision for the book. For the conceptual side of the book, I could draw on my past experience with functional programming at work and several years of experience writing OCaml in college.

During my back and forth with Apress, I realized that I did want to try writing this book, regardless of whether or not I accepted a contract with then.

I had three options:

Option 1: Publish through Apress

- Pros
  - Apress helps with editing, proofreading, and typesetting
- Cons
  - No control over the pricing, cover, or format of the book. I would have preferred for the book to be available for free digitally, but unfortunately that wasn't an option.

Option 2: Publish through Apress Open Access

- Pros
  - The e-book is free for anyone to read
  - Apress helps with editing, proofreading, and typesetting
- Cons
  - I have to pay Apress a flat fee
  - The book would only be available digitally, unless I paid even more for printed copies

Option 3: Self-publish through Amazon

- Pros
  - I don't have to spend any money
  - Physical copies would be more affordable, and I could distribute it electronically for free if I wanted to
- Cons
  - No one to help with editing/proofreading/typesetting
  - Less "legit" than being published by someone else

In the end I chose #1, because I wasn't willing to spend money and I thought that going through the whole process with the support of the publishers would be a better experience for a first-time author like myself. 

## December - March 2022: First Three Chapters

In the contract I signed, I agreed on a deadline of March 1 to submit a draft of the first three chapters. Although I had created an outline for the book proposal, actually writing the content gave me more insight into what order I should introduce each topic in. I also paid attention to the length of each chapter - some chapters in the initial outline had to be split up, and other chapters were merged to keep each chapter reasonably sized.

Working on these chapters also helped me figure out my writing setup. The manuscript was a collection of Markdown files authored in VSCode. For proofreading and submission, I wrote a script to convert the Markdown files into PDFs.The source code for the examples was developed in the same Git repository as the manuscript. 

During December, I did Advent of Code in ReScript to get a better sense for the language. Although the functional programming concepts in the book would mostly be based on my knowledge of OCaml, I wanted to get a better grasp of ReScript's standard library and ergonomics.

I also had the chance to have a VC with Bob Zhang, one of ReScript's creators who was also working at Meta at the time. He clarified to me the state of the language and the community, and gave me confidence that ReScript was mature enough to be used as a language to introduce FP concepts to web developers.

In the lead-up to the first submission deadline, I received emails from multiple editors at the publisher while my queries to my original editor were mostly unanswered. After submitting the drafts, I waited for two months before I sent an email asking when I would be receiving feedback. A few days later, they replied with the feedback - to my surprise, the only feedback I got was on the first page of the first chapter - supposedly, everything else "looked fine". This was very concerning to me, since I was hoping for more substantive feedback on these early chapters to make sure the rest of the book turned out well. Did they even read it all? At the time, it looked like I was on my own.

## March - August 2022: First Draft

After the first three chapters were submitted, the next deadline was for the entire first draft on September 1. The goal was for the whole book to be 150-200 pages, and I estimated I would have to write around 40,000 words in total (the final number was just over 45,000). To complete the book by the deadline I would have to write 1000-2000 words a week, so I tracked the word count and tried to pace myself accordingly. This schedule turned out to be rather optimistic, and I slipped behind schedule when I decided to rewrite several chapters.

Keeping to the schedule wasn't easy, especially on top of my day job, and the only reason I didn't burn out was because I changed teams in May. As that deadline got closer I devoted more of my time each week to writing, usually spending several hours every weekend holed up in a cafe. Although I tried dozens of coffee shops during this time, I never found one that I liked enough to stick with. 

During this time, my friends were vital in providing feedback on the book. It's not easy to read so much (and pay attention enough to give useful feedback), and I'm very thankful for everyone who contributed to the proofreading process - you know who you are.

At the publishing company's request, during the final month I submitted the chapters individually whenever I finished one, to allow them to get a head start on the technical review. I wrote the introduction last and submitted it a few weeks late, but it didn't affect the technical review timelines.

## September-October 2022: Technical Review

After I finished my first draft, I found out that "technical review" meant "have someone go through and try to run all my code examples". I had expected some feedback on the technical merits of the work or some sort of lightweight "peer review" like for scientific papers, but there was nothing of the sort. That said, the technical reviewer was very helpful and uncovered quite a few errors and typos in my examples. 

Around this time, I got dinner with Cheng Lou, another former member of ReScript's core team. He seeed skeptical but still shared many insights with me, which I tried my best to absorb.

In retrospect, I should have asked members of the ReScript community to actually preview my book and provide feedback. At the time, I was held back by my impostor syndrome as a first-time author. I only shared my drafts with close friends, but I knew I needed to get comfortable with sharing this book with the world soon, since it was about to be published.  Although I had maintained a blog for nearly 4 years at that point, writing for a physical book felt different. With a blog, I could delete posts that I didn't like, or publish corrections instantly. With the book, any mistake I made would be printed forever.

## November 2022: Typesetting/Final Proofing

When I was first assigned an editor, I was told that I had to submit everything in a Word document with everything typeset to the correct format. What a horrifying thought. Luckily, in the end I didn't have to do that - I submitted everything as Markdown and they found someone to typeset everything for me. Whew!

Once the book was typeset, I did a final review. It felt different and good to see the book as a reader would, and it was around this time that the pre-order pages for my book appeared online at Amazon and Barnes & Noble. I was also allowed to provide a final set of revisions (mostly grammatical). 

During this time there were some small hiccups. Issues with typesetting the Markdown tables led to some delays, and the description on the pre-order page (as well as the back cover) had egregious typos. Thankfully, things were resolved without too much delay, although to this date the description on the B&N website is still wrong.

## January - March 2023: Post-publication

In January, I received word that the book had been published. Hooray! A while later, I received five printed copies of my book in the mail, which I distributed to friends and family. 


<image width=300px src="https://yangdanny97.github.io/images/book.png"/>


I'm not sure how much the publishers marketed the book - there wasn't really much information from them aside from giving me some affiliate link. I also didn't really know how to market the book myself, so I just threw a link on my blog and made some Facebook and Linkedin posts about it.

I experimented with a couple of Facebook/Instagram ads, but the cost-per-click was ridiculously bad, something like $0.70. Considering how I get like $3.50 of royalties per copy sold at full price, one in every 5 clicks would have to be a sale for these ads to break even. A terrible deal, had I not been using free ad credits. Without access to timely and detailed information on the sales data (a downside of not self-publishing), it's pretty hard to tweak ads to optimize for sales.

Anyways, the point is that if you're looking for advice on how to become a best-seller, I'm the wrong person to ask. 

Recently, I emailed the publishers to get the sales numbers. By the end of March, it had sold 55 copies (which presumably translates to just under $200 of royalties, plus a tiny one-time advance). Those numbers aren't entirely unexpected for a very niche book, but it certainly shows that writing this book was not a lucrative endeavor to say the least.

In the end, the publishers' biggest contribution was probably technical review, typesetting, and managing the ISBN/online listing stuff. Overall I would say that, despite all the hiccups, working with a publisher was still pretty useful.
