# Admin package

This package provides an admin dashboard interface with some actors for your 3Bot health, logs..etc.

## What's included

### Home

Shows system versions, network, processes status, memory consumptions and some health checks
![images/dashboard.png](images/dashboard.png)

### Logs
Allows seeing logs per application

![logs](images/logs.png)


### Alerts
Advanced alerts system

![alerts](images/alerts.png)

check [alerts.md](./alerts.md) for info about its actors
### Package management system
Easy way to install/stop packages available on the filesystem or from a trusted git repository

![packagemanager](images/packagemanager.png)


### Online code editor

If you want to edit code from the dashboard directly you can do so using CodeServer package

![codeserver](images/codeserverterminal.png)

## Installation

Admin dashboard is installed by default, you also can install it by path or git url as any other package.

You can view the dashboard by navigating to `http://<host>/admin`.

## Login

The dashboard is protected by 3Bot connect, you need to register your current 3Bot, from 3Bot server shell (for now, you need to suffix your name with `.3bot`):

```
j.tools.threebot.init_my_threebot()
```

Now, you can download [3Bot connect app](https://3bot.org/3bot.html) and use it to login with the 3Bot name you registered.

Also, other people can access the dashboard, but they need to be added to admins from `Settings`, Also, admins can be dded to `j.tools.threebot.me.default.admins` via `kosmos` shell:

```python3
j.tools.threebot.me.default.admins.append("ahmed.3bot")
j.tools.threebot.me.default.save()
```



## Frontend

The frontend is written in webix, and located at `frontend_src`, the build is at `frontend`, for more go to [frontend_src/README.md](frontend_src/README.md).


### To rebuild frontend

- `cd frontend_src`
- `bash build_frontend.sh`


## Including other packages in the admin panel

If u want to add another view "menu" item to include another package in the admin view. It's very easy using

```python
import { ExternalView } from "../external";

const CODE_URL = "/codeserver/?folder=/sandbox/code";
const REQUIRED_PACKAGES = {
    "zerobot.codeserver": "https://github.com/threefoldtech/jumpscaleX_threebot/tree/development/ThreeBotPackages/zerobot/codeserver"
}

export default class CodeserverView extends ExternalView {
    constructor(app, name) {
        super(app, name, CODE_URL, REQUIRED_PACKAGES);
    }
}

```
- Make sure to pass the url of the remote view -in our example its `CODE_URL`-
- If it requires packages to be installed first you define them in `REQUIRED_PACKAGES` 
- Just extend `ExternalView` and pass the remote view url `CODE_URL` and required packages `REQUIRED_PACKGGES` to the super
- update `main.js` sidebarData with your view 

