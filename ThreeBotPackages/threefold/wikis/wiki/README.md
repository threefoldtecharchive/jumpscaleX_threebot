# Threefold wikis

## Installation

- Start threebot server

```python
j.servers.threebot.start()
```

- Install the package with either ways of

    - from the server shell
        ```python
        j.threebot.packages.threefold.wikis.start()
        ```

    - with gedis packagemanager
        ```python
        gedis = j.clients.gedis.get("pm", port=8901, package_name="zerobot.packagemanager")
        gedis.actors.package_manager.package_add(path="/sandbox/code/github/threefoldtech/jumpscaleX_threebot/ThreeBotPackages/threefold/wikis")
        ```

- Wait for the first time cloning then from the browser go to your wiki:

    - grid -> https://172.17.0.2/wiki/grid
    - foundation -> https://172.17.0.2/wiki/foundation
    - tokens -> https://172.17.0.2/wiki/tokens#/
