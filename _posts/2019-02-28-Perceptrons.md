---
layout: post
title: "How Perceptrons Work"
date: 2019-02-28
---

Note: This is a high-level explanation of how perceptrons work, intended for a college-educated but non-technical audience. I wrote this piece a few weeks ago for a technical writing class.

Due to the recent surge in popularity of machine learning, many people have become interested in learning about how these algorithms work, either to understand how they can be applied to their businesses, or just out of curiosity. Systems such as Google Translate and self-driving cars are powered by machine learning models called neural networks, which are made of thousands of interconnected simpler models. Here, I will discuss an algorithm that was used as the building block of the earliest neural networks, the perceptron.

Originally developed in 1967 at Cornell for the task of image recognition, the perceptron algorithm is one of the earliest machine learning algorithms. Machine learning algorithms are used to build a model that can take in an input (images, numbers, text) and generate a useful output. For example, a model used in a self-driving car might take in a video of the road as input, and output the angle to turn the steering wheel. The perceptron is designed to classify the input into one of two categories (for example, red or blue, hotdog or not) - this problem is called binary classification.

![Figure of perceptron, borrowed from an O'Reilly book](https://www.oreilly.com/library/view/deep-learning-for/9781788295628/assets/ca819363-76a0-4968-b4ec-d9e239e2ba31.png){: height="px350" width="175"}

Inputs to the perceptron (x) are given as lists of numbers. The perceptron stores some more numbers called weights (w). To make a prediction, the perceptron multiplies each input with its corresponding weight andsums them up. This result is fed into an activation function, which decides the final classification. The activation function for the perceptron outputs 1 if the result is positive, otherwise it outputs 0.

A perceptron must be trained to determine the best weights (weights that will result in the correct output for inputs that the perceptron has not seen before). The training process involves giving the perceptron inputs where the correct output is already known, and adjusting the weights when the perceptron makes an incorrect prediction. This training method is called supervised learning, and contrasts with unsupervised learning, where the correct outputs are not known. The method of adjusting weights to minimize error is called gradient descent. 

A good analogy for this is if you think of weights as latitude and longitude and the error as the elevation. Walking around changes your position, and is analogous to adjusting the weights. The goal is to get to a place with the lowest elevation, which is analogous to finding weights that give the minimum error. Gradient descent starts from the current position, and takes a small step in the most steeply downhill direction. This process is repeated until you end up in a location where the elevation increases in all directions (like the bottom of a bowl-shaped depression in the terrain), which means the algorithm cannot make another small adjustment to the weights to reduce the error. Using gradient descent, the perceptron is able to find better weights to make better predictions.

![Figure of neural network, borrowed from Wikipedia](https://upload.wikimedia.org/wikipedia/commons/e/e4/Artificial_neural_network.svg){: height="px280" width="250s"}

Another trait of the perceptron is that they can be chained together; the output of a perceptron can be used as the input to another perceptron. This is the basis for building a neural network - each perceptron acts like a node, and the output of the final layer of perceptrons is the output of the entire network. Being able to combine the outputs of its neurons allows a neural network to perform more complex tasks. Many of the recent advances in AI come from deep learning, which simply means neural nets with many stacked layers of neurons. Although the complexity of this type of model balloons massively, the same basic concepts apply.
