# Docsites:

Docsites are a collection of markdown documents, images and data files that can be generated using jumpscale `markdowndocs` tool.

The tool pre-process the given markdown directory (it adds some extension to markdown like custom link format and macros), also, it verifies and follows all the links and download it if needed, so you end up having a static directory that can be served directly.

The output is written to bcdb filesystem under `/docsites`, it's also indexed in `sonic` server, so search is available by default.

### Markdown extensions:

* [Custom link format](../links.md)
* [Macros](../macros/)

## Tool usage

Given a markdown documents directory (a link to repository), the tool will pull, pre-process and generate the docsite.
You can find some markdown docs examples [here](../examples).

Usage example:

```python
url = "https://github.com/threefoldtech/jumpscaleX_threebot/tree/development/docs/wiki/examples/docs"
docsite = j.tools.markdowndocs.load(url, name="test_example")
docsite.write()
```

This will pull the repo at the branch specified, then generate a docsite at `/docsites/test_example` in bcdb file system.

Jumpscale job queue can be used too to load docsites in background, see [threefold wikis](https://github.com/threefoldtech/jumpscaleX_threebot/tree/development/ThreeBotPackages/threefold/threefold_wikis) package.


## Serving using wiki package

You can start threebot wiki package as follows:

`kosmos -p "j.threebot.wikis.start()"`

Then open your brwoser with 3bot/container hostname at `https:<hostname>/wiki/<your_docsite_name>`.

## Setting up gdrive and service account

Gdrive extension and `gslide/slideshow` macros require google service account credentials to work properly.

* [Service account](service_account.md)
* [GDrive](gdrive.md) serve your google documents, sheets and slides directly from wikis.
