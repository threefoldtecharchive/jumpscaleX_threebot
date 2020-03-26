# Code-server
Code-server provides VisualStudio Code to be running on the server and accessible through the browser to enable hosting a development platform on the machine.

![codeserver](./images/codeserver.png)

## Installation

- from 3bot shell

```python
p.zerobot.codeserver.install()
p.zerobot.codeserver.start()

```

- from package manager on port 8080:
    1. install the package
    ```python
    package_manager = j.clients.gedis.get("packagemanager", host=HOST,port=8901, package_name="zerobot.packagemanager")

    package_manager.actors.package_manager.package_add(path="/sandbox/code/github/threefoldtech/jumpscaleX_threebot/ThreeBotPackages/zerobot/codeserver")
    ```
