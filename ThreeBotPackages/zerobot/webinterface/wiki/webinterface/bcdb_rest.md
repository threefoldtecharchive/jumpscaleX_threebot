# BCDB REST Interface

Models of bcdb are exposed over HTTP, only for admins.

Operations of create/delete/update/find are supported.

All request and response body (data) are `json` formatted.

### Model operations:

**Base URL:** `<threebot_name>/<package_name>/model/<model_name>`

|Operation   |URL                       | Method | Data (Request body)         |
|------------|--------------------------|--------|-----------------------------|
| List all   | `<BASE_URL>`             | `GET`  |                             |
| Create     | `<BASE_URL>`             | `POST` | `{name: "...", ....}`       |
| Find       | `<BAE_URL>?name=...`     | `GET`  |                             |


### Record operations

**Base URL:** `<threebot_name>/<package_name>/model/<model_name>/<record_id>`


| Operation             | Method    | Data (Request body)         |
|-----------------------|-----------|-----------------------------|
| Get                   | `GET`     |                             |
| Update (Partial)      | `POST`    | `{name: "..."}`             |
| Delete                | `DELETE`  |                             |



#### Examples (client side):

Assuming your app is running on top of threebot, here's an example manipulating the model of `tfgrid.directory.location.1`, which is inside `tfgrid.directory` package:


Listing all records (webix):

```javascript
webix.ajax().get("/tfgrid/directory/model/tfgrid.directory.location.1").then(data => {
    console.log(data.json())
});
```


Creating a new record (webix):

```javascript
const ajax = webix.ajax().headers({"Content-Type": "application/json"});
const data = {
    "city": "giza",
    "country": "egypt",
    "continent": "africa",
    "latitude": 1.0,
    "longitude": 1.0
};
ajax.post("/tfgrid/directory/model/tfgrid.directory.location.1", data).then(data => {
    console.log(data.json())
});
```

Delete the record with `id` of `5` (using fetch):

```javascript
fetch("/tfgrid/directory/model/tfgrid.directory.location.1/5", {method: "delete"})
```
