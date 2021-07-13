---
layout: post
title: "Flaws of Essay Autograders"
description: "How essay autograders work, and when they fail"
date: 2020-11-14
category: "Technical"
---

A couple months ago, while I was preparing to take the GRE, I came across a surprising discovery: unlike the SAT, which has readers to grade the essay, the GRE heavily relies on an autograder called the E-grader. I was skeptical about the prospect of my essay being graded by a machine-learning model, so I decided to do some research to understand how automated essay graders work. 

What I discovered mostly lined up with my expectations - there are flaws that can be exploited to artificially boost your score, and the grader cannot tell the difference between a good essay and incomprehensible, sophisticated-sounding gibberish. 

## How Essay Autograders Work

Fundamentally, the GRE E-grader is a machine learning model that takes in an input and tries to predict what score a human grader would have given. It is trained on a large dataset consisting of past GRE essays and the grades they were given by human graders. Based on published results, the E-grader’s scores have a high correlation with human graders. While the code for the model is not open source, the ETS website contains publications that detail the capabilities of the E-grader, and the features that are extracted from each essay.

Taken directly from the website, the categories are:
- errors in grammar (e.g., subject-verb agreement)
- usage (e.g., preposition selection)
- mechanics (e.g., capitalization)
- style (e.g., repetitious word use)
- discourse structure (e.g., presence of a thesis statement, main points)
- vocabulary usage (e.g., relative sophistication of vocabulary)
- sentence variety
- source use
- discourse coherence quality

## Exploiting the Autograder

In general, the features that the E-grader uses seem sensible. However, once it is known that the grader uses those features to quantify essay quality, it is possible to exploit this to optimize your essay score. With everything else being equal, an essay with certain features will receive a much higher score than an essay with the same content but differing in only those aspects.

Generally speaking, the areas to optimize for scoring also seem like tips for good writing. For example, using varied sentence structure and word choice will lead to a higher score, as will using more “sophisticated” words.

Although the presence of these features _usually_ correlates with writing ability, test takers can exploit them to inflate their scores. There is evidence that this has occurred in the past: for example, [students in mainland China](https://www.vice.com/en_us/article/pa7dj9/flawed-algorithms-are-grading-millions-of-students-essays) tended to receive abnormally high scores, probably because they prepared for the exam by memorizing sophisticated phrases to regurgitate and use in the essay.

Structure and coherence are also important aspects of scoring. Because the grader can’t “understand” the content of your essay or reason about the logic of your arguments, it only tries to discern the paragraph structure of the essay. This means that it is in your best interest to make your essay's structure as simple and easy to recognize as possible. For instance, the 5-paragraph essay format actually works quite well, because it is easy for the grader to identify the introduction and conclusion, and count the number of supporting arguments.

## Where Essay Autograders Fail

The content and logic of your essay do not matter at all to the E-grader. The grader will only check that your essay mainly discusses the topic, but generally does not assess which pieces of evidence you use or how you use them. To illustrate this point, Dr. Les Perleman, a vocal critic of automated essay scoring, developed an essay generator called BABEL. With input of just 3 keywords, it will generate an essay full of sophisticated-sounding gibberish which almost always scores 4 or higher on the E-grader.

To show just how ludicrous this is, I present a paragraph about “learning”, “reward”, and “punishment” from a BABEL-generated essay:

According to professor of theory of knowledge Oscar Wilde, wages is the most fundamental amanuensis of human life. a neuron on opportunity inverts to reproduce. Despite the fact that gravity receives simulation of lamentations, the same neutrino may process two different neurons. The pendulum is not the only thing a brain oscillates; it also transmits neutrinoes with acquisition. Payoff which should be toil changes mimic on punishment. Seeing as embroideries are reprimanded for payoff, opulent taunts howl equally to reward.

Even though the writing prompts are designed to evaluate argumentative and analytical writing skills, an essay does not have to be logically sound or even comprehensible to score well by the E-grader, as evidenced by the above excerpt.

You can play around with the BABEL essay generator [here](https://babel-generator.herokuapp.com).

## Conclusion: Lessons for Applied ML

Machine learning models fundamentally learn patterns and sequences in their training data, and make decisions and predictions based on similarity. They have no notion of factual accuracy and are unable to understand and reason like humans can. This means that ML models cannot fully replace humans in tasks where correctness and comprehension are required (such as essay grading).

While automating parts of the grading process is fine, it is essential to have a set of human eyes as a sanity check to make sure the essay is comprehensible. Otherwise, the computer grader’s outputs cannot be trusted.
