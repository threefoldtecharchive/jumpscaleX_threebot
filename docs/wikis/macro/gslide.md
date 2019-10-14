# Gslide

This macro can be used to generate a slideshow from one presentation.


### Syntax:
Inside a code block as following

````
```
!!!gslide
presentation = "link to presentation"
width = "5000"
height = "5000"
```
````

#### Options
* `presentation`: the link of google docs presentation.
* `width`: optional width in pixels
* `height`: optional height in pixels

### Examples

The following code block
````
```
!!!gslide
presentation = "https://docs.google.com/presentation/d/1DDVRHNIGiv7sPXP61Dt6hzwjhRRUdSDN8nz_vF_9XrQ/edit"
width = "5000"
height = "5000"
```
````

Will create a slideshow of one slide with width and height of 5000px.
