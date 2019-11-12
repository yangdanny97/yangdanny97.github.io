---
layout: post
title: "Scrutinizing Datasets"
date: 2019-11-12
category: "Technical"
---

One of the biggest challenges for people new to data science is finding the right dataset to use. There are a lot of online sources for data these days: from online collections found on sites like Kaggle to government and nonprofit open data APIs. The documentation on many datasets is lacking or inconsistent, and many people don't know what questions to ask when evaluating whether a dataset should be used.

Recently, there has been a push to set industry standards for documenting datasets. One such example is [Datasheets for Datasets](https://arxiv.org/pdf/1803.09010.pdf), where the authors propose a documentation standard similar to datasheets for electronic components. Although this proposal has not yet been adopted, the questions that a datasheet must answer are the same questions that everyone should be asking about the datasets that they find and use.

The questions that must be addressed by dataset documentation can be grouped into 7 categories, and are roughly analogous to sections on a datasheet: Motivation, Composition, Collection, Preprocessing, Uses, Distribution, and Maintenance. 

I'll be using these topics to go over examples of what types of questions we should be asking when we select datasets. For more details on each category, refer to the original paper (linked above).

### Motivation

The key question to ask regarding a dataset's motivation is: "Who created this dataset and why?"  

The "who" part is much easier to answer than the "why" part, but in general it is best if we know that the dataset comes from a reliable source - otherwise, it is worth scrutinizing their collection methods to see if there could be any bias (intentional or otherwise).

### Composition

The first question to ask should be: "Does it have the right features?"

Many aspects of a dataset's composition can affect whether or not we can use it. Oftentimes, not every feature that we want can be found in a single dataset - it is okay to combine multiple data sources to create a dataset that has the right features.

How much preprocessing we have to do can also be affected by a dataset's composition. For example, I once had to work with the [Million Song Dataset](http://millionsongdataset.com/) which was several hundred GB. At the time, I needed to load the data and run the model on a laptop, so I wrote a script that ran for 5 hours to preprocess the data into a smaller dataset of the features that I wanted. 

Another example is when we're working with geospatial data, which can be in many different formats: GeoJSON, TopoJSON, Shapefiles, etc. With geospatial data, we may need to [convert the dataset to the desired format](https://yangdanny97.github.io/blog/2019/08/24/D3-Mapmaking-Tips). We also need to ask, is the data at the right granularity? For instance, if we want to do a block-level analysis but the dataset is at the neighborhood level, then it is probably not appropriate.

### Collection

The key question here is: "How was the data collected?" 

The collection method is where we should scrutinize the dataset for any potential bias. For example, if we were working with survey data on employee salaries at a company, we would want to know whether the survey's respondents are a representative sample, or if it was targeted to a specific audience. 

Note that any difference between the demographics of the survey respondents and the demographics of the company as a whole might not mean intentional bias - it could just be that certain groups of people were more likely to respond to the survey than others.

Using a dataset of Tweets as another example, we could ask: "over what period of time were these Tweets collected?"

This question might not be obvious, but it may have a big impact depending on what we're trying to get out of the data. The distribution of topics in Tweets collected over a day might be different than the distribution of topics in Tweets collected over a year, because the former is much more susceptible to influence by any current events trending that day.

### Labeling

Training sets for supervised learning tasks are often hand-labeled by humans, either by experts or by gig workers on a platform like MTurk. The former is higher quality, but the latter is much more practical and common on large datasets.

For example, say that we want to build a model to detect hate speech, and we find a dataset that has comments labeled as "hate speech" and "not hate speech". Sounds perfect, right? But we must not forget to ask an important question: "Does this dataset's definition of hate speech match our definition of hate speech?" If we train a model without fully understanding where the labels came from, then it might not do what we want it to do.

### Usage

Here, we should ask: "How should this data be used?" and "Has anyone else used it in the past?"

The former question is important if the dataset is biased in some way. Bias doesn't mean that a dataset can't be used at all; it means that it is inappropriate to use it in a situation where the bias could lead to unfair treatment (imagine if we trained models for calculating insurance costs or interest rates or salaries using biased datasets).

On sites like Kaggle and the UCI ML Repository, the latter question can be answered by looking at the list of kernels/papers that have used the dataset. If a dataset was introduced in a paper, it is also worth looking for other papers that cite it. Reviewing past work/literature can often reveal limitations in the dataset, or at least help inform the direction of our own research.

### Restrictions

The format in which a dataset is distributed can have important implications for the way we use it - for example, datasets that are only available using APIs may have a rate limit.

We also want to understand we are and are not allowed to do with the data. Can we include the data in a public Github repository, or are we only allowed to link to the original source? This question is most relevant if we are working with personal data.

### Conclusion

To conclude, I'd like to briefly discuss a few sources of data. Many universities/cities/counties/government agencies have [open data websites](https://codi.engineering.cornell.edu/) that give access to many datasets/APIs, and more publicly available datasets are listed and hosted on [Amazon Web Services](https://registry.opendata.aws/)/[Google Cloud](https://cloud.google.com/public-datasets/). These are often great sources because they provide sufficient documentation for us to be confident in using the data. Two other good sources of data are the [UCI Machine Learning Repository](https://archive.ics.uci.edu/ml/index.php), and [FiveThirtyEight](https://data.fivethirtyeight.com/). 

Oftentimes, open data is not considered by beginners, who tend to default to Kaggle when looking for data. While Kaggle has a big community, the datasets are often not well-documented. Blindly trusting data without properly scrutinizing it is a common mistake among people new to data science. That said, I believe that it is okay to use data from a broad range of sources, as long as we do our due diligence and ask the right questions.
