Admin dashboard
===============================

Admin dashboard UI based on [webix jet](https://webix.gitbook.io/webix-jet/).


### Dependencies

* nodejs & npm
* `cd frontend_src`
* `npm install`


### Development

3Bot need to started with this package installed, then for building the front-end, you can use `build_frontend.sh`:

```
cd frontend_src && bash build_frontend.sh
```

This script will build and copy the output to `frontend` directory to be served as a single page app,then you can go to `http://<host>/admin`.

### Structure

* The main entry is [app.js](sources/app.js)
* Views:
    * Main view is defined at [main.js](sources/views/main.js)
    * External views are [wiki](sources/views/wiki), [codeserver](sources/views/codeserver) and [jupyter](sources/views/jupyter).
* Services (calling backend/actors) can be found at [sources/services](sources/services).
