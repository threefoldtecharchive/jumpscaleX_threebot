# Include

This macro can be used to include content from other documents and files, it takes a link and include the content of that link into current document.

### Syntax:

```
!!!include("link/to/document.md")
```

or using toml (inside a code block)

````
```
!!!include
link = "link/to/document.md"
```
````

The **link** can be in the format of our [custom links](../links.md).

### Other options
* `docsite_name`: the name of another wiki (optional)
* `header_levels_modify`: a numeric value to increase or decrease header levels by.
* `ignore`: a list of regular expressions to ignore any line that matchs any of them.
* `codeblock_type`: the content included will be put inside a code block with this type
* `host`: hosting servie, in case a custom link without host is used, it will be `github.com` by default.
* `raw`: should be set if it's a raw link, it'll be directly download, defaults to False.

* Python files related options:
    * `doc_only`: will only include docstrings
    * `remarks_skip`: will skip any comments


### Examples

In all examples, we will include some content from [this document](examples/document.md), it contains headings, links and some paragrpahs with [markers](../markers.md).

```
+++
title = "hello"
+++

This is an example document to include from

## head

[b](other_document.md)


   This is a paragraph !!A!!
You need to include this para, para, para !!A!!

   A new para, !!B!!
This is a new para
```


#### Include the whole document

```
!!!include("examples/document.md")
```


#### A part of the document with markers

```
!!!include("examples/document.md!A")
```

Will include only the paragapah marked with `A`.

```
   This is a paragraph
You need to include this para, para, para
```


And this

```
!!!include("examples/document.md!B")
```

This will include another part marker with `B`

```
   A new para,
This is a new para
```

#### Modify headers

```
!!!include("examples/document.md", header_levels_modify=2)
```

The content included will be the whole document, with `## head` modified to `#### head`:

```
+++
title = "hello"
+++

Hiiii how are you

#### head

[b](test.md)


   This is a paragraph !!A!!
You need to include this para, para, para !!A!!

   A new para, !!B!!
This is a new para
```

#### From external repository

Using full link (this will get the full content of the link)

```
!!!include("https://github.com/abom/test_custom_md/tree/master/docs/test_src.md")
```


#### From external repo with custom link format
Custom link format with markers, this will get only the part marked with `B`)

```
!!!include("abom:test_custom_md:docs/test_src.md!B")
```

#### From another wiki

if you already know the wiki name, you can just specify `docsite_name` with link being the path to the document.

```
!!!include("presentations/tech.md", docsite_name="info_foundation")
```

#### Ignore some patterns

Using the toml syntax to pass input and set ignore to a single pattern to exclude lines starts with a dash followed by a space.

````
```
!!!include
link = "presentations/tech.md"
docsite_name="info_foundation"
ignore = ["^- "]
```
````


#### From another hosting service

Including a link from gitlab.com

```
!!!include("threefoldforks:Threefold-Circles-back:CODE_OF_CONDUCT.md", host="gitlab.com")
```

### Raw links

Directly download a raw link

```
!!!include("https://gitlab.com/threefoldforks/Threefold-Circles-back/raw/master/CODE_OF_CONDUCT.md", raw=True)
```
