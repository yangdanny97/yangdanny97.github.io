---
layout: post
title: "The Limitations of AI"
date: 2020-09-19
category: "Technical"
---

Whenever a new ML/AI breakthrough makes headlines, my friends always ask for my thoughts. After flashy demos of GPT-3 and Facebook’s [source code translation](https://ai.facebook.com/blog/deep-learning-to-translate-between-programming-languages/) model, they wondered if AI was on the verge of taking our jobs. To this, I replied: “No, because machine learning models don't actually understand anything”. 

Fundamentally, ML models learn patterns from their inputs, and they recognize new inputs or generate outputs based on similarity to what they have seen so far. Similarity and correctness are not the same thing, and in cases where correctness is required (most jobs), the most advanced AIs fall woefully short, even to the point of making comical mistakes, as you’ll see later.

## Deep-learning AI: GPT-3

Even GPT-3, the most advanced NLP model in existence, cannot answer the simple question, [“How many eyes does a horse have”](https://aiweirdness.com/post/621186154843324416/all-your-questions-answered).

Fyi, three of its responses were:
- Four. One in the front and three in the rear
- 4, it has two eyes on the outside and two eyes on the inside
- Four. Two in front, two in back

While it seems absurd that a model like GPT-3 doesn’t know a simple fact like how many eyes a horse has, this limitation makes sense if you understand deep learning models work.

Put simply, GPT-3 is a deep learning model that can generate sequences of words similar to what it has been trained on. This means that training it on news articles will cause it to generate text that looks like it would belong in a news article, and training it on Python code will cause it to generate text that looks like Python programs, etc.

The English language training data for GPT-3 consists of text that humans wrote, and humans just don’t ask the question “how many eyes does a horse have”; by far the most commonly asked question with the format “How many ___ does a horse have” is “How many legs does a horse have”. 

Therefore, when asked “How many eyes does a horse have”, the model recognizes the sequence of words as almost identical to “How many legs does a horse have” and tries to generate words that are likely to follow, which is why it responds with “4”. 

From this, we can see that GPT-3 does not actually know facts about horses, despite having been trained on text containing hundreds, if not thousands, of horse facts. 

## A Digression Into Rule-Based AI: Watson & Chatbots

But what about Watson, which certainly had to “know” facts to win Jeopardy, or the impressive humanlike chatbots currently being developed? Surely they must “know” things and be able to “reason”? That type of AI is a bit different from deep learning models like GPT-3. To give comprehensible answers, AI like Watson and chatbots like [Mitsuku](https://www.pandorabots.com/mitsuku/) are often pre-programmed with sets of inputs and responses. By using a deep set of rules and loosely matching the question that is asked, the model finds the most similar pre-programmed input and returns a pre-programmed response.

While on the surface they may seem humanlike, they fall short when given inputs that they have not been explicitly programmed to respond to. To illustrate their limitations, I will describe a conversation with Mitsuku, the self proclaimed “world’s best conversational AI”.

After correctly answering “How many wings does a ____ have?” for various winged and non-winged animals, I asked “How many wings does Pegasus have?” It responded “No wings at all,” probably becase it had not been explicitly programmed with the number of wings on a Pegasus.

When asked “How many wings does a one-winged chicken have?”, it responded with “Two”. This shows that it cannot reason that the one-winged modifier meant the chicken I was referring to had only one wing.

Compared to rule-based AI like Watson, ML-based AI like GPT-3 have an advantage when it comes to the breadth of answers they can provide, because they can learn from huge datasets instead of pulling from explicitly programmed facts. This makes ML-based AI better at generating outputs for unknown/novel inputs, but neither type of AI can truly reason about facts.

## Final Thoughts

While I don’t deny that the ML models of today can do things that we couldn’t even dream about a decade ago, I think we need to be realistic about the limitations of what we call AI. It’s impressive that ML models can be used to generate blogs and articles and source code or even translate between languages, but the truth is that the most advanced NLP models billed as AI cannot truly comprehend things or reason about facts as humans can.
