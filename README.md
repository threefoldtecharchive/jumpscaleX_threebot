# Threebot Application Server

Threebot is a pluggable application server based on [openresty](https://openresty.org/en/) and gevent servers and comes with lots of goodies by default.

- [Wiki system](./docs/wikis/README.md)
- [Chat](./ThreeBotPackages/zerobot/webinterface/wiki/chatbot/README.md)
- [Multisite blog](./ThreeBotPackages/threebot/blog/wiki/README.md)
- [Alerta](./ThreeBotPackages/zerobot/alerta/wiki/README.md)
- [MyJobs Dashboard](./ThreeBotPackages/zerobot/myjobs_ui/wiki/README.md)
- [Pastebin](./ThreeBotPackages/demo/pastebin/wiki/README.md)
- [Package Manager](./ThreeBotPackages/zerobot/packagemanager/wiki/README.md)
- [Webhooks](./ThreeBotPackages/zerobot/webhooks/wiki/README.md)
- [BCDBFS](https://github.com/threefoldtech/jumpscaleX_core/blob/development/docs/BCDB/README.md)
- [API Server](./ThreeBotPackages/zerobot/webinterface/wiki/README.md)

### Content:
- [Installation](#installation)
- [Starting the server](#starting-the-server)
- [Applications and extensions](#applications-and-extensions)
- [Core and example packages](#core-and-example-packages)

## Installation
Threebot is part of [JumpscaleX](https://github.com/threefoldtech/jumpscaleX_core). Make sure to follow the [installation instructions](https://github.com/threefoldtech/jumpscaleX_core/blob/development/docs/Installation/README.md)

## Starting the server
Using  `j.servers.threebot.start()`.

This will give you a ready shell in the same process where you can interact with your threebot:

```
*****************************
*** 3BOTSERVER IS RUNNING ***
*****************************

*** file: /sandbox/lib/jumpscale/Jumpscale/servers/threebot/ThreebotServer.py
*** function: start [linenr:295]

JSX>
```
The server starts with `base`, `webinterface`, `myjobs`, `oauth2`, `alerta` and `packagemanager` packages by default.

For a quick start, you can access myjobs

## Applications and extensions

Threebot sever can be extended using packages, see documentation on packages [here](docs/packages.md).

#### APIs

APIs can be added as actors to your package, which are exposed directly and can be accessed via http or using our `gedis` clients for python or javascript, see [documentation](docs/actors.md).


#### Openresty (nginx)

We use openresty (nginx) for serving requests. Inside a package, you can define different types of locations to handle these requests, for more information, check [documentation](docs/locations.md).

## Core and example packages

Some core functionality are being added as a package:

#### Webinterface package

[Webinterface](https://github.com/threefoldtech/jumpscaleX_threebot/blob/c58b3db99095a8a9635c75ac7f82647947a9d110/ThreeBotPackages/threebot/webinterface) package is always registered when starting your threebot. It is responsible for

- exposing http endpoints for actors, wikis and gdrive.
- exposing websocket endpoints for actors
- exposing bcdbfs endpoints

#### Complete examples

- Myjobs

  - [backend](ThreeBotPackages/zerobot/myjobs/wiki/README.md)
  - [frontend](ThreeBotPackages/zerobot/myjobs/frontend_src/README.md)

- Alerta
    - [backend](ThreeBotPackages/zerobot/alerta/wiki/README.md)
    - [frontend](ThreeBotPackages/zerobot/alerta/frontend_src/README.md)

- Pastebin
  - [backend](ThreeBotPackages/demo/pastebin/wiki/README.md)
  - [frontend](ThreeBotPackages/demo/pastebin/pastebin/README.md)

- VueJS
  - [backend](ThreeBotPackages/examples/vuejs/wiki/README.md)
  - [frontend](ThreeBotPackages/examples/vuejs/newproject/README.md)
