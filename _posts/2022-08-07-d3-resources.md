---
layout: post
title: "D3.js Resources: Tutorials, Tools, and References"
description: "List of resources for learning and using D3.js"
date: 2022-08-07
category: "Vis"
tag: "Technical"
---
Learning D3 from scratch is not easy - breaking API changes mean that examples and tutorials are frequently outdated, and the advent of Observable means that official examples from recent years are not directly runnable.

The following is a curated list of tutorials, references, and tools for learning and using D3. I hope that this is a useful starting point for anyone trying to get started with D3. 

<!-- more -->

# Learning D3

## [Intro to D3](https://yangdanny97.github.io/intro-to-d3)

A very quick introduction that covers the basics of D3, including the core concept of binding data to DOM elements. It begins with an explanation of HTML and CSS, so it's a great starting point for those new to web development. 

The tutorial can be completed in a couple of hours, and by the end you should have a sense for how D3 works and how to make simple interactive graphs.

Topics:
- Web Standards (HTML, CSS, DOM)
- Parts of a Graph (Scales, Axes, Shapes)
- Data Binding

## [D3 In Depth](https://www.d3indepth.com)

This is a detailed tutorial that goes much more in-depth on different types of charts and interactivity, and is a good choice if you want to spend a week or so learning D3.

Topics:
- Selections
- Data joins
- Scale functions
- Shapes
- Axes
- Hierarchies
- Chord Diagrams
- Force layout
- Maps
- Data Requests
- Transitions
- Picking, Dragging and Brushing
- Zoom & pan

# D3 References

## [D3 Graph Gallery](https://www.d3-graph-gallery.com/)

The [D3 Graph Gallery](https://www.d3-graph-gallery.com/) is a website that list dozens of different types of charts organized by type, with examples for how to create each one using D3. 

It's impressively extensive, covering everything from heatmaps to chord diagrams to sunburst charts. Some of the examples are not completely up-to-date, but nonetheless it's a great resource for seeing what's possible to make in D3.

## [Data To Viz](https://www.data-to-viz.com/)

[Data To Viz](https://www.data-to-viz.com/) is another fantastic resource by the creator of the D3 Graph Gallery. This website doesn't focus on D3 specifically, but instead describes and categorizes different types of charts, with a flowchart that suggests which types of chart to use to display your data.

If you want to learn about the strengths, weaknesses, and use cases for different types of charts, or if you have a dataset and aren't sure what type of chart to use to visualize it, then this site is a great starting point.

## Official API Reference

The [official API reference](https://github.com/d3/d3/blob/main/API.md) for D3 is found on Github. 

If you want to know which arguments a function accepts or can't find an example for how to use a particular function, this is your best resource. 

For example, if you want to learn about the different kinds of map projections that D3 provides and see what each one looks like, [the API reference has you covered](https://github.com/d3/d3-geo/blob/v3.0.1/README.md#geoAzimuthalEqualArea).


# Useful Tools/Datasets

## MapShaper

Map data is frequently provided in a format compatible with GIS systems but not with D3. With [MapShaper](https://mapshaper.org), you can edit the data and convert it into a format that D3 can visualize. 

It has both a web interface and CLI where you can upload files in a variety of formats, edit their layers and polygons, and re-export them as GeoJSON or TopoJSON. This is also a good way to shrink the size of the dataset, by removing the features and layers you don't want to visualize.

## Open Topography

One of the challenges of sourcing topographical data online is that elevation data is often provided as PDFs, which is easy for a human to read but not so easy to integrate with other datasets.

Luckily, [Open Topography](https://portal.opentopography.org) provides high resolution topography data captured from space in a machine-readable format. 

For more on how to use this data with D3, check out [this blog post](https://yangdanny97.github.io/blog/2020/11/26/D3-elevations).

## Open Data

In the US, many local, state, and federal governments have open data websites that provide a wealth of datasets that can be analyzed and visualized. It's a great resource for anyone looking for inspiration or ideas. 

There is no standardized portal or URL for these sites, but you can find open data websites by googling "open data" + the name of whatever entity you are looking for.

Here are a few examples:
- [New York City Open Data](https://opendata.cityofnewyork.us/)
- [Data.gov (Federal Open Data)](https://data.gov/)
- [Sacramento Open Data](https://data.cityofsacramento.org/)

Local governments may provide information ranging from parcels of land and zoning to the location of each tree maintained by the city government. Federal and state level datasets may provide aggregated information on elections, healthcare, infrastructure, and more.

Just be aware that the datasets aren't always provided in a format that can be loaded directly by D3, so tools like MapShaper will come in handy.
