# Threefold wikis

This package serves both [info_threefold](https://github.com/threefoldfoundation/info_threefold) and [info_tfgridsdk](https://github.com/threefoldfoundation/info_tfgridsdk) wikis, it build them using `mdbook` and serves the output located at `book` directory.

It set the domain and create nginx locations at `/` for both.

Also, it registers a web-hook handler to re-build in case of github push events, make sure you already had a correct [github web-hooks setup](https://github.com/threefoldtech/jumpscaleX_threebot/tree/unstable/ThreeBotPackages/zerobot/webhooks/wiki).

## Installation

Make sure threebot server is started, then you can install the package using one of the following methods:
- Using package manager actor

    ```python
    gedis = j.clients.gedis.get("pm", port=8901, package_name="zerobot.admin")
    gedis.actors.package_manager.package_add(path="/sandbox/code/github/threefoldtech/jumpscaleX_threebot/ThreeBotPackages/threefold/wikis")
    ```

- From dashboard at `https://<your hostname>/admin/#!/main/packages`.
