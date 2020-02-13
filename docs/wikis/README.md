# Wikis

Wikis are a collection of docsites, which are a collection of markdown documents, images and files.

A [simple docsite](examples/simple) has two files, `README.md` which includes content to the main content that will be viewed first and `_sidebar.md` which is used for navigation in [docsify.js](https://docsify.js.org/#/more-pages?id=sidebar).

We use [docsify.js](https://docsify.js.org/) to get an html web page directly from the markdown, and our [3git](https://github.com/threefoldtech/jumpscaleX_core/tree/development/JumpscaleCore/tools/threegit) tool to pre-process this docsite to support some markdown extenstions like [macros](macro/README.md).


## Existing wikis
Some wiki contents can be found in [threefoldfoundation](https://github.com/threefoldfoundation) organization on github like:
* [Foundation](https://github.com/threefoldfoundation/info_foundation)
* [Tokens](https://github.com/threefoldfoundation/info_tokens)

All wikis are now hosted at [https://wiki.grid.tf/](https://wiki.grid.tf/), for example foundation wiki can be found at [https://wiki.grid.tf/wiki/foundation](https://wiki.grid.tf/wiki/foundation).

![wiki.png](images/wiki.png)

Editing the content of the wikis are done collaboratively in the previous repositories. as mentioned earlier, you can use our custom markdown extensions like:

* [Macros](macro/README.md)
* [Custom link format](links.md)
* [Inline HTML](html.md)

## Running your own wiki
ًWikis are supported by default in threebot packages, to run and setup your own package with a wiki, more technical documentation can be found [here](tech/README.md).
