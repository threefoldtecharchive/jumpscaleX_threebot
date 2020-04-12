# Threefold wikis

## Installation

- 
- configure [google drive client](https://github.com/threefoldtech/jumpscaleX_threebot/blob/development/docs/wikis/tech/gdrive.md) `j.clients.gdrive.get_from_file("main","/sandbox/code/cred.json")`
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
        gedis = j.clients.gedis.get("pm", port=8901, package_name="zerobot.admin")
        gedis.actors.package_manager.package_add(path="/sandbox/code/github/threefoldtech/jumpscaleX_threebot/ThreeBotPackages/threefold/wikis")
        ```

- Wait for the first time cloning then from the browser go to your wiki:

    - threefold -> https://172.17.0.2/wiki/threefold
