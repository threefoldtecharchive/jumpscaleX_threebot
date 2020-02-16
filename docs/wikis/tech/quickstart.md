# Wikis quick start

## Prerequisite

- JumpscaleX with threebotserver running
  - To Install JumpscaleX follow [here](https://github.com/threefoldtech/jumpscaleX_core/tree/development/docs/Installation)
  - More information about threebotserver [here](https://github.com/threefoldtech/jumpscaleX_threebot/tree/development/docs)

- Configure Gdrive client with GDrive credentials files (used in slides, markdown, pdf macros)
  - Get creds file from [here](https://github.com/threefoldtech/jumpscaleX_threebot/blob/development/docs/wikis/tech/service_account.md)
  - Configure Gdrive client [here](https://github.com/threefoldtech/jumpscaleX_threebot/blob/development/docs/wikis/tech/gdrive.md)

## Loading wiki

- Start threebotserver using jsx shell

  ```bash
  kosmos -p "j.servers.threebot.start(background=True)"
  ```

- Load your wiki using `jsx wiki-load -n WIKI-NAME -u WIKI-URL -f`

  - extra params:
    - `-f` using foreground
    - `-r` will reset your wiki, delete all output files and reload it

  - Example:

    ```bash
    jsx wiki-load -n grid -u https://github.com/threefoldfoundation/info_grid/tree/development/docs -f
    ```

  - Now we can check our wikis at: http://172.17.0.2/wiki/info_grid

## Reloading wiki

- Start threebotserver using jsx shell

  ```bash
  kosmos -p "j.servers.threebot.start(background=True)"
  ```

- You should have your wiki reloaded already using `jsx wiki-load` like previous example

- Now make your changes

- Reload the wikis using

  ```bash
  jsx wiki-reload -n grid
  ```

  - extra params:
    - `-r` will reset your wiki, delete all output files and reload it

## Threefold wikis

- Start threebotserver using jsx shell

  ```bash
  kosmos -p "j.servers.threebot.start(background=True)"
  ```

- Load threefold wiki package, from kosmos shell with either ways

  - from the server shell

    ```python
    j.threebot.packages.threefold.wikis.start()
    ```

  - with gedis packagemanager

    ```python
    gedis = j.clients.gedis.get("pm", port=8901, package_name="zerobot.packagemanager")
    gedis.actors.package_manager.package_add(path="/sandbox/code/github/threefoldtech/jumpscaleX_threebot/ThreeBotPackages/threefold/wikis")
    ```

- See the output at: http://172.17.0.2/wiki/info_grid/

## More Info

- What is a macro and macros we use [here](https://github.com/threefoldtech/jumpscaleX_threebot/blob/development/docs/wikis/macro/README.md)

- To make your own macros check [here](https://github.com/threefoldtech/jumpscaleX_threebot/blob/development/docs/wikis/tech/macro.md) and [here](https://github.com/threefoldtech/jumpscaleX_threebot/tree/development/docs/wikis/tech#writing-you-own-macro)

- To more detailed docs please check [here](https://github.com/threefoldtech/jumpscaleX_threebot/tree/development/docs/wikis/tech)
