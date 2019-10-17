# An example for vuejs using vue-cli

To start the package in `kosmos` use the following:

```python
JSX> cl = j.servers.threebot.local_start_default(web=True)
JSX> cl.actors.package_manager.package_add(path="/sandbox/code/github/threefoldtech/jumpscaleX_threebot/ThreeBotPackages/examples/vuejs/")
```

## Front End

## Prequesites

- Npm installed `kosmos 'j.builders.runtimes.nodejs.install()'`
- vue cli `npm install -g @vue/cli`

## Creating vue app

`vue create my-project` or from:`vue ui`

Check this [Vue Docs](https://cli.vuejs.org/)

## Add some routes

- Install VueRouter `"vue-router":"^3.1.3"` by adding it to `package.json` dependancies then `npm install`
- At `main.js`

  - You will need to import VueRouter `import VueRouter from "vue-router";`
  - Register the router to Vue by `Vue.use(VueRouter)`
  - Then add your apps routes

  ```javascript
    const routes = [
    { path: "/hello", component: HelloWorld },
    { path: "/test", component: TestComponent }
        ];

    const router = new VueRouter({
    routes
    });
    ```

  - And finally register the router to your App

  - example using the routes as a navigation view, in App.vue or your component

  ```html
    <script src="https://unpkg.com/vue/dist/vue.js"></script>
    <script src="https://unpkg.com/vue-router/dist/vue-router.js"></script>
    <template>
    <div id="app">
        Hello to App
        <br />
        <router-link to="/hello">Go to Hello world</router-link>
        <br />
        <router-link to="/test">Go to Test Page</router-link>
        <router-view></router-view>
    </div>
    </template>
    ```

  - For more information about the router [Check Here](https://router.vuejs.org/guide/)

- Also make sure to configure your `vue.config.js` to your required  locations

```javascript
module.exports = {

  // if you need to serve at `/`
  publicPath: process.env.dev === '1'
    ? '/location-example'
    : '/',
  devServer: {
    host: '0.0.0.0',
    port: '8080',
    public: '0.0.0.0:8080',
    disableHostCheck: true,
  },

}
```

## BackEnd

Create a package: check package creation instructions [Here](https://github.com/threefoldtech/jumpscaleX_threebot/blob/development/docs/quickstart.md)

- Endpoint

  To use development mode which will serve your site at a location `/location-example`
  in `package.py` init set the DEV variable = 1 otherwise will serve your site at `/`

  ```python
  def _init(self, **kwargs):
    # CHANGE ME (default 1: development mode)
    os.environ["dev"] = "1"
    self.DEV = os.environ.get("dev")
  ```

- For `package.py`

For Prepare method it will build the frontend stuff and make it ready to be served,
This will copy the vuejs's files (html(s), css(s) and js(s) files) to our serving dir `html` dir

```python
def prepare(self):
    """
    is called at install time
    :return:
    """
    prepare_cmd = f"""
    cd {self.package_root}
    pushd newproject
    export dev={self.DEV}
    npm install
    npm run build
    popd
    cp newproject/dist/* html/ -R
    """
    j.sal.process.execute(prepare_cmd)
```

For start method, It follows the threebot's `spa` way like alerta package
in configuring the openresty locations

```python
def start(self):
    """
    called when the 3bot starts
    :return:
    """
    server = self.openresty
    server.install(reset=False)
    server.configure()

    website = server.get_from_port(443)

    locations = website.locations.get("vuejs_locations")

    website_location = locations.locations_spa.new()
    website_location.name = "vuejs"
    if self.DEV == "1":
        website_location.path_url = "/location-example"
    else:
        website_location.path_url = "/"

    website_location.use_jumpscale_weblibs = False
    fullpath = j.sal.fs.joinPaths(self.package_root, "html/")
    website_location.path_location = fullpath

    locations.configure()
    website.configure()
```
