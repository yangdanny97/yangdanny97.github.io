---
layout: post
title: "Mapmaking using D3: Tips and Common Pitfalls"
date: 2019-08-24
category: "Notes"
---

This post is a collection of common problems people will encounter while making maps using D3, and my advice for how to deal with them.

### Large GeoJSON Files

Depending on the level of detail, GeoJSON can get very large. For example, the GeoJSON containing [land use information on each parcel of land in San Francisco](https://data.sfgov.org/Housing-and-Buildings/Land-Use/us3s-fp9q) is ~137mb. Since D3 visualizations are rendered by the browser, it forces the user to download a massive data file to view the visualization, which makes load times exceedingly long. This is something we want to minimize, and thankfully there are several ways to deal with this.

1. **Reducing the amount of properties for each feature** 

    A feature refers to some object on the map (like a building) that has a shape and some properties. Properties are like columns in a traditional CSV, they can hold data. For example, in the SF Land Use dataset, each parcel is a feature and contains properties like their age and zoning type. 
    
    Oftentimes, the datasets you download will have a lot of properties that you don't plan on displaying, which can be removed to save on size. Applying this method reduced the SF Land Use dataset from 137mb to 98mb.

2. **Compacting the JSON** 

    JSON data is stored as text, and thus we can save on file size by cutting down the number of characters we use. For example, removing spaces after each colon or comma, or shortening the names of properties/features. The former can be easily done by loading the JSON into Python, then saving it with separators that don't have trailing spaces. Removing whitespace reduced the size of the SF Land Use dataset from 98 to 93mb.

    ``` python
    json.dump(data,f, separators=(',',':'))
    ```

3. **Simplifying the shapes** 
    
    If you don't need a high level of detail, it is possible to reduce the complexity of the shape data by removing vertices, or reducing the precision of the coordinates.

4. **Converting to TopoJSON** 

    GeoJSON encodes each shape separately while TopoJSON encodes each shared line once, so converting a GeoJSON to a TopoJSON saves a lot of space when there are many shapes with shared edges. This approach can lead to very drastic savings - the entire SF Land Use dataset can be represented by a 32mb TopoJSON. 

    Converting is as easy as loading the file into MapShaper and exporting as TopoJSON. The drawback, as I understand it, is that you can't adjust the projection like you can with GeoJSON, so it is best to set your desired projection using a tool like MapShaper before you convert it. 

As a rule of thumb, you should keep data under 10mb for best performance, although if you included a loading indicator you might be able to get away with 50mb without the user complaining too much.

### Non-JSON File Formats

Map data doesn't always come nicely formatted as GeoJSON or TopoJSON; sometimes they will come as shapefiles, which cannot directly be displayed by D3. You can edit and convert map data using a tool called [MapShaper](https://mapshaper.org). It has both a web interface and CLI where you can upload files in a variety of formats, edit their layers and polygons, and re-export them as GeoJSON or TopoJSON. I used it once to convert a shapefile of Westeros into a format that can be displayed in D3 (the final map, if you're curious, is [here](https://yangdanny97.github.io/GoT-interactive-battles-map/)).

### Scaling Issues

This is most common when working with city-level GeoJSON data, which will appear as a tiny speck on the screen if the projection is not adjusted. This can be fixed by centering the projection on the city's centroid, then zooming and offsetting appropriately. For example, my map of San Francisco was zoomed to a factor of 250000 in order to fill the screen. 

Note that most of the time TopoJSON already comes with a projection applied, so it is not possible to adjust the projection's scaling. In this case, you can set the `transform` attribute [using D3](https://www.tutorialspoint.com/d3js/d3js_svg_transformation.htm), or you can upload the file to MapShaper and export a new version with the desired width/height/scaling.

### Zooming Behavior

Sadly, this is one of the things that D3 is bad at. For simpler maps with fewer shapes, this is totally doable. Unfortunately, when the number of shapes gets large (>10000), it becomes very difficult to have smooth zooming behavior. 

By optimizing zooming behavior on the map of Westeros, I was able to improve the zooming animation from <1fps to 10-12fps. While not ideal, this made the visualization at least usable. Here are some features that have a lot of negative impact on zooming smoothness - they should be avoided if possible.

1. filling shapes with images

2. layering shapes

3. semi-transparent fill

For smooth dynamic behavior on more detailed maps, the best bet is probably to use a specialized mapmaking tool like MapBox, which has tiling behavior and can adjust the level of detail based on your magnification level. 

