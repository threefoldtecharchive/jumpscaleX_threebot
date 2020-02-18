# Macros
## Overview
Macros are a custom extension to markdown syntax that take some input from the user, then produces some markdown as an output.

## List of available macros
* [include](include.md): to include content from other documents or files.
* [dot](dot.md): to convert [DOT](https://en.wikipedia.org/wiki/DOT_(graph_description_language)) graphs to images directly from blocks.
* [team](team.md): for team member listing (with data from another repository).
* [gallery](gallery.md): to create a gallery from images list
* [gslide](gslide.md): to include slides from google presentation
* [slideshow](slideshow.md): to include slides from multuple google presentations
* [markdown](markdown.md): to include markdown from google documents directly
* [dynamic_content](dynamic_content.md): to rener dynamic html content returned by actors
* [gpdf](gpdf.md): to generate pdf download links from google docs



### Example
`include` macro can include any markdown or content from anohter document or file (even in another repository or wiki).
- _Usage_: macro that starts with `!!!` like ```!!!include(...)```
- _Parameters_ : If the macro needs some input data, it can be passed in one of two ways

    1. using function style

        ```
        !!!include("link_to_doc.md")
        ```

    2. using toml (inside a code block)

        ````
        ```
        !!!include
        link = "link_to_doc.md"
        header_level_modify = 1
        ```
        ````

## Errors

When executing any macro, errors can occur, in such a case, they are saved in a document called `errors.md` in the root directory of the docsite, and can be accessed normally by the link `<wiki or website link>/#/errors.md`. The content will be a listing of errors that have occured when pre-processing all of the markdown documents.
