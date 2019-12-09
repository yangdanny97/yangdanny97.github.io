---
layout: post
title: "Scrutinizing Datasets"
date: 2019-11-11
category: "Technical"
---
One of the biggest challenges for people new to data science is finding the right dataset to use. There are a lot of online sources for data these days: from online collections found on sites like Kaggle to government and nonprofit open data APIs. The documentation on many datasets is lacking or inconsistent, and many beginners don't know what questions to ask when evaluating whether a dataset should be used.

Recently, there has been a push to set industry standards for documenting datasets. One such example is [Datasheets for Datasets](https://arxiv.org/pdf/1803.09010.pdf), where the authors propose a documentation standard similar to datasheets for electronic components. 

Although this proposal has not yet been adopted, the questions that a datasheet must answer are the same questions that everyone should be asking about the datasets that they find and use.

Roughly following the ideas presented in the above paper, I'll go over several types of questions that we should be all be asking when we scrutinize datasets. 

### Motivation

The key question to ask regarding a dataset's motivation is: "Who created this dataset and why?"  

The "who" part is much easier to answer than the "why" part, but in general it is best if we know that the dataset comes from a reliable source - otherwise, it is worth scrutinizing their collection methods to see if there could be any bias (intentional or otherwise).

### Composition

The first question to ask should be: "Does it have the right features?"

Many aspects of a dataset's composition can affect whether or not we can use it. Oftentimes, not every feature that we want can be found in a single dataset - it is okay to combine multiple data sources to create a dataset that has the right features.

How much preprocessing we have to do can also be affected by a dataset's composition. For example, I did a project with the [Million Song Dataset](http://millionsongdataset.com/) which was several hundred GB and required almost 12 hours to download and preprocess. This might be important if we're working with limited computing resources.

In some cases file formats are an important consideration, such as when working with geospatial data (GeoJSON, TopoJSON, Shapefiles, etc). Sometimes, an extra preprocessing step is needed to [convert the geospatial data into the desired format](https://yangdanny97.github.io/blog/2019/08/24/D3-Mapmaking-Tips). Another good question to ask here: "is the data at the right granularity"? For instance, if we want to do a block-level analysis but the dataset is at the neighborhood level, then it is probably not appropriate.

### Collection

The key question here is: "How was the data collected?" 

The collection method is where we should scrutinize the dataset for any potential bias. For example, if we were working with survey data on employee salaries at a company, we would want to know whether the survey's respondents are a representative sample, or if it was targeted to a specific audience. 

Note that any difference between the demographics of the survey respondents and the demographics of the company as a whole might not mean intentional bias; it could just be that certain groups of people were more likely to respond to the survey than others, but we definitely need to be aware of it.

Using a dataset of Tweets as another example, we could ask: "over what period of time were these Tweets collected?"

This question might not be obvious, but it may have a big impact depending on what we're trying to get out of the data. The distribution of topics in Tweets collected over a day might be different than the distribution of topics in Tweets collected over a year, because the former is much more susceptible to influence by any current events trending that day.

### Labeling

Training sets for supervised learning tasks are often hand-labeled by humans, either by experts or by workers on a platform like MTurk. The former is higher quality, but the latter is much more practical and common on large datasets.

For example, say that we want to build a model to detect hate speech, and we find a dataset that has comments labeled as "hate speech" and "not hate speech". Sounds perfect, right? But we need to consider: "Does this dataset's definition of hate speech match our definition of hate speech?" If we train a model without fully understanding where the labels came from, then it might not do what we intended.

### Usage

Here, we should ask: "How should this data be used?" and "How have other people used this data?"

The former question is important if the dataset is biased in some way. Bias doesn't mean that a dataset can't be used at all; it means that it is inappropriate to use it in a situation where the bias could lead to unfair treatment (imagine if we trained models for predicting insurance costs or interest rates or salaries or criminal convictions using biased datasets).

On sites like Kaggle and the UCI ML Repository, the latter question can be answered by looking at the list of kernels/papers that have used the dataset. If a dataset was introduced in a paper, it is also worth looking for other papers that cite it. Reviewing past work/literature can often reveal limitations in the dataset, or at least help inform the direction of our own research.

### Restrictions

The format in which a dataset is distributed can have important implications for the way we use it - for example, datasets that are only available using APIs may have a rate limit.

We also want to understand we are and are not allowed to do with the data. Can we include the data in a public Github repository, or are we only allowed to link to the original source? This question is most relevant if we are working with personal data.

### Conclusion

Blindly using data without properly scrutinizing it is a common mistake among people new to data science. Many people just rely on poorly documented datasets found online or on Kaggle, without asking enough questions to see if it is actually suitable for their task. That said, I think it is okay to consider and use data from a broad range of sources, as long as we do our due diligence and ask the right questions.
