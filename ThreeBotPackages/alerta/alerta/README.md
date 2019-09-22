This is a tool which is used to <b> visualize </b> all the logged alerts from different systems in one central place and <b>filter</b> these logs on specific criteria

# Features
* Visualize logs
* Central pool for all logs
* Filter all logs using different criteria   
* Search logs

# svelte app

This is a project template for [Svelte](https://svelte.dev) apps. It lives at https://github.com/sveltejs/template.

To create a new project based on this template using [degit](https://github.com/Rich-Harris/degit):

```bash
npx degit sveltejs/template svelte-app
cd svelte-app
```

*Note that you will need to have [Node.js](https://nodejs.org) installed.*


## Get started

Install the dependencies...

```bash
cd svelte-app
npm install
```

...then start [Rollup](https://rollupjs.org):

```bash
npm run dev
```

Navigate to [localhost:5000](http://localhost:5000). You should see your app running. Edit a component file in `src`, save it, and reload the page to see your changes.

## project structure 
```
.
├── back-end
│   ├── Api.py
│   ├── data.json
│   └── views
│       └── 404.tpl
├── front-end
│   ├── package.json
│   ├── package-lock.json
│   ├── public
│   │   ├── favicon.png
│   │   ├── global.css
│   │   ├── img
│   │   │   └── loader.gif
│   │   └── index.html
│   ├── rollup.config.js
│   └── src
│       ├── App.svelte
│       ├── components
│       │   └── Alerts.svelte
│       ├── main.js
│       └── Navigation.svelte
├── package-lock.json
├── README.md
└── tree

7 directories, 17 files
```
## Working on front-end
* Add all the front-end libraries <b> example</b> ```Bootstrap and Font awesome``` in ```/public/index.html```

* Create navigation component <b>example</b> ```front-end/src/Navigation.svelte``` and import this component in ```front-end/src/App.svelte``` <b>example</b> ```import Navigation from './Navigation.svelte';```to use this component ```<Navigation />```

```html
<div>
	<nav class="navbar navbar-expand-lg navbar navbar-primary bg-primary">
		<a class="navbar-brand" href="#">Sharable Highlited Code</a>
		<button
			class="navbar-toggler"
			type="button"
			data-toggle="collapse"
			data-target="#navbarText"
			aria-controls="navbarText"
			aria-expanded="false"
			aria-label="Toggle navigation">
			<span class="navbar-toggler-icon" />
		</button>
		<div class="collapse navbar-collapse" id="navbarText">
			<ul class="navbar-nav mr-auto">
				<li class="nav-item active">
					<a class="nav-link" href="/">
						Home
						<span class="sr-only">(current)</span>
					</a>
				</li>
			</ul>
			<span class="navbar-text">
				We Share your code and keep the Highlights
			</span>
		</div>
	</nav>
</div>

```

* Create ```front-end/src/components/Alerts.svelte``` component which will contain all the required logic to render the Alerts 
```html
<script>
  import { deleteAlert } from "../data";
  import AlertModal from "./AlertModal.svelte";

  export let alerts;
  $: alerts;
  const severity = {
    CRITICAL: "CRITICAL",
    MAJOR: "MAJOR",
    MINOR: "MINOR",
    WARNING: "WARNING",
    INDETERMINATE: "INDETERMINATE"
  };
  function onDeleteAlert(alertId) {
    //Call gedis actor
    deleteAlert(alertId)
      .then(resp => {
        let toBeDeletedArrayIndex = getIndexOfAlert(alertId);
        alerts.splice(toBeDeletedArrayIndex, 1);
        alerts = [...alerts];
      })
      .catch(err => {
        console.log(err);
      });
  }

  function getIndexOfAlert(alertId) {
    for (let i = 0; i < alerts.length; i++) {
      if (alerts[i].id == alertId) return i;
    }
  }
</script>

<div>
  <div class="row">
    <!--[Tasks-Data]-->
    <div class="col-sm-12 _m-4">
      <!-- content here -->
      <table class="table table-striped">
        <!--[Tasks-Data-Headers]-->
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Severity</th>
            <th scope="col">Status</th>
            <th scope="col">Time</th>
            <th scope="col">Dupl.</th>
            <th scope="col">Environment</th>
            <th scope="col">Service</th>
            <th scope="col">Resource</th>
            <th scope="col">Event</th>
            <th scope="col">Value</th>
            <th scope="col">Message Type</th>
            <!-- <th scope="col">Text</th> -->
            <th scope="col" class="text-center">Action</th>
          </tr>
        </thead>
        <!--[Tasks-Data-Body]-->
        <tbody>

          <!-- content here -->
          {#each alerts as myAlert, i}
            <tr>
              <th scope="row">{i + 1}</th>
              {#if myAlert.severity == severity.CRITICAL}
                <td>
                  <span class="badge badge-danger">{myAlert.severity}</span>
                </td>
              {:else if myAlert.severity == severity.MAJOR}
                <td>
                  <span class="badge badge-info">{myAlert.severity}</span>
                </td>
              {:else if myAlert.severity == severity.WARNING}
                <td>
                  <span class="badge badge-warning">{myAlert.severity}</span>
                </td>
              {:else if myAlert.severity == severity.MINOR}
                <td>
                  <span class="badge badge-secondary">{myAlert.severity}</span>
                </td>
              {:else}
                <td>
                  <span class="badge badge-primary">{myAlert.severity}</span>
                </td>
              {/if}
              <td>{myAlert.status}</td>
              <td>{myAlert.time}</td>
              <td>{myAlert.dupl}</td>
              <td>{myAlert.environment}</td>
              <td>{myAlert.service}</td>
              <td>{myAlert.resource}</td>
              <td>{myAlert.event}</td>
              <td>{myAlert.value}</td>
              <td>{myAlert.messageType}</td>
              <td>
                <!--[Actions]-->
                <div class="d-flex d-flex justify-content-center">
                  <!--[Delete-Alert-BTN]-->
                  <div class="mr-1">
                    <button
                      type="button"
                      class="btn btn-primary pointer"
                      on:click={() => onDeleteAlert(myAlert.id)}>
                      Delete
                    </button>
                  </div>
                  <!--[Details-Alert-BTN]-->
                  <div>
                    <button
                      type="button"
                      class="btn btn-warning pointer"
                      data-toggle="modal"
                      data-target="#modal{i}">
                      Details
                    </button>
                  </div>
                </div>
              </td>
              <!--[Modal]-->
              <div>
                <AlertModal {myAlert} index={i} />
              </div>
            </tr>
          {/each}
        </tbody>
      </table>

    </div>
  </div>
</div>
```

* In  ```front-end/src/App.svelte``` will contain the logic to handle and get the alerts 
```javascript 
<script>
  import Navigation from "./Navigation.svelte";
  import Alerts from "./components/Alerts.svelte";
  import { getAlerts, deleteAll } from "./data";

  let alerts;
  let searchText = "";
  let formatedAlerts = "";
  let currentFilteredAlerts;
  let isAlertsLoaded = false;
  let servicesLoading = true;
  let isAllAlertsDeleted = false;
  const environments = {
    ALL: "ALL",
    PROD: "PRODUCTION",
    DEV: "DEVELOPMENT",
    INFRA: "INFRASTRUCTURE"
  };

  let services;
  const severity = {
    ALL: "ALL",
    CRITICAL: "CRITICAL",
    MAJOR: "MAJOR",
    MINOR: "MINOR",
    WARNING: "WARNING",
    INDETERMINATE: "INDETERMINATE"
  };
  const messageTypes = {
    ALL: "ALL",
    ERROR: "ERROR",
    INFORMATION: "INFORMATION",
    WARNING: "WARNING"
  };
  const status = { ALL: "ALL", OPEN: "OPEN", CLOSED: "CLOSED", NEW: "NEW" };
  let currentFilters = {
    service: "ALL",
    messageType: messageTypes.ALL,
    status: status.ALL
  };

  document.addEventListener("DOMContentLoaded", function(event) {
    // your page initialization code here
    // the DOM will be available here
    var tab = document.getElementById("pills-all-tab");
    tab.click();
  });
  //Get Data from the API
  function updateAlerts(environment) {
    isAlertsLoaded = false;
    isAllAlertsDeleted = false; //The alerts all available now and not deleted (reintialize the state)
    alerts = [];

    getAlerts(environment)
      .then(response => {
        // handle success
        let parsedJson = response.data.result;
        alerts = parsedJson.alerts;
        formatedAlerts = convertDataToUpperCase(parsedJson.alerts);
        filterAlerts(formatedAlerts);
        getServices();
        isAlertsLoaded = true;
      })
      .catch(err => {
        console.log("error ", err);
      });
  }

  function updateFilters(selectedService, selectedMessageType, selectedState) {
    currentFilters = {
      service: selectedService,
      messageType: selectedMessageType,
      status: selectedState
    };
    filterAlerts(formatedAlerts);
  }

  function convertDataToUpperCase(alerts) {
    for (let i = 0; i < alerts.length; i++) {
      alerts[i].severity = alerts[i].severity.toUpperCase();
      alerts[i].service = alerts[i].service.toUpperCase();
      alerts[i].status = alerts[i].status.toUpperCase();
      alerts[i].messageType = alerts[i].messageType.toUpperCase();
    }
    return alerts;
  }

  function filterAlerts(filteredAlerts) {
    if (currentFilters.service != "ALL")
      filteredAlerts = filteredAlerts.filter(singelAlert => {
        return singelAlert.service == currentFilters.service;
      });
    if (currentFilters.messageType != messageTypes.ALL)
      filteredAlerts = filteredAlerts.filter(singelAlert => {
        return singelAlert.messageType == currentFilters.messageType;
      });
    if (currentFilters.status != status.ALL)
      filteredAlerts = filteredAlerts.filter(singelAlert => {
        return singelAlert.status == currentFilters.status;
      });
    currentFilteredAlerts = filteredAlerts; //keeping the current filtered alerts
    alerts = filteredAlerts; //update the alerts to update the Rendering
  }

  $: if (searchText) {
    searchAlertsText();
  }
  function searchAlertsText() {
    alerts = currentFilteredAlerts.filter(singleAlert => {
      return singleAlert.text.includes(searchText);
    });
  }
  function resetFilters() {
    currentFilters = {
      service: "ALL",
      messageType: messageTypes.ALL,
      status: status.ALL
    };
    document.getElementById("InputSearch").value = "";
    filterAlerts(formatedAlerts);
  }
  function getServices() {
    servicesLoading = true;
    services = formatedAlerts.map(singleAlert => singleAlert.service);
    services = Array.from([...new Set(services)]); //Making services unique and convert it from set to array
    services.unshift("ALL"); //Add "All" in the begining of the array
    servicesLoading = false;
  }

  function deleteAllAlerts() {
    deleteAll()
      .then(res => {
        alerts = [];
        isAllAlertsDeleted = true;
      })
      .catch(err => {
        console.log("error while deleting all alerts", err);
      });
  }
</script>

<style>
  .search-width {
    width: 350px;
  }
</style>

<div>
  <Navigation />
</div>

<!--[Container]-->
<div class="container-fluid">
  <!--[Title]-->
  <div class="m-3 text-center">
    <h1>Central Alert System</h1>
  </div>
  <!--[Filters]-->
  <div class="row m-5">
    <div class="col-sm-12">
      <div class="d-flex justify-content-start">
        <!--[Search]-->
        <div class="mx-4 search-width">
          <input
            type="search"
            class="form-control"
            id="InputSearch"
            placeholder="Search text"
            bind:value={searchText} />

        </div>
        <!--[Services]-->
        <!-- content here -->
        <div class="dropdown mx-2">
          <button
            class="btn btn-light dropdown-toggle pointer"
            type="button"
            id="dropdownMenuButton"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
            disabled={servicesLoading}>
            Services
          </button>
          {#if services && services.length > 0}
            <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
              {#each services as service}
                <!-- content here -->
                <a
                  class="dropdown-item"
                  href="#"
                  on:click={() => updateFilters(service, currentFilters.messageType, currentFilters.status)}>
                  {service}
                </a>
              {/each}
            </div>
          {/if}
        </div>
        <!--[Message-Type]-->
        <div class="dropdown mx-2">
          <button
            class="btn btn-light dropdown-toggle pointer"
            type="button"
            id="dropdownMenuButton"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
            disabled={servicesLoading}>
            Message type
          </button>
          <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
            <a
              class="dropdown-item"
              href="#"
              on:click={() => updateFilters(currentFilters.service, messageTypes.ALL, currentFilters.status)}>
              All
            </a>
            <a
              class="dropdown-item"
              href="#"
              on:click={() => updateFilters(currentFilters.service, messageTypes.ERROR, currentFilters.status)}>
              Error
            </a>
            <a
              class="dropdown-item"
              href="#"
              on:click={() => updateFilters(currentFilters.service, messageTypes.INFORMATION, currentFilters.status)}>
              Information
            </a>
            <a
              class="dropdown-item"
              href="#"
              on:click={() => updateFilters(currentFilters.service, messageTypes.WARNING, currentFilters.status)}>
              Warning
            </a>

          </div>
        </div>
        <!--[Status]-->
        <div class="dropdown mx-2">
          <button
            class="btn btn-light dropdown-toggle pointer"
            type="button"
            id="dropdownMenuButton"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
            disabled={servicesLoading}>
            Status
          </button>
          <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
            <a
              class="dropdown-item"
              href="#"
              on:click={() => updateFilters(currentFilters.service, currentFilters.messageType, status.ALL)}>
              All
            </a>
            <a
              class="dropdown-item"
              href="#"
              on:click={() => updateFilters(currentFilters.service, currentFilters.messageType, status.NEW)}>
              New
            </a>
            <a
              class="dropdown-item"
              href="#"
              on:click={() => updateFilters(currentFilters.service, currentFilters.messageType, status.OPEN)}>
              Open
            </a>
            <a
              class="dropdown-item"
              href="#"
              on:click={() => updateFilters(currentFilters.service, currentFilters.messageType, status.CLOSED)}>
              Closed
            </a>

          </div>
        </div>

        <!--[Reset-Filter]-->
        <div class="mx-2">
          <button
            type="button"
            class="btn btn-light pointer"
            on:click={() => resetFilters()}
            disabled={servicesLoading}>
            Reset Filters
          </button>
        </div>
        <!--[Delete-Alerts]-->
        <div class="mx-2">
          <button
            type="button"
            class="btn btn-light pointer"
            on:click={() => deleteAllAlerts()}
            disabled={servicesLoading}>
            Delete Alerts
          </button>
        </div>
      </div>
    </div>
  </div>
  <!--[Tabs]-->
  <div class="row mt-4">
    <div class="col-sm-12 ml-4">
      <div>
        <ul class="nav nav-pills mb-3" id="pills-tab" role="tablist">
          <li class="nav-item">
            <a
              class="nav-link active"
              id="pills-all-tab"
              data-toggle="pill"
              href="#pills-all"
              role="tab"
              aria-controls="pills-all"
              aria-selected="true"
              on:click={() => updateAlerts(environments.ALL)}>
              All
            </a>
          </li>
          <li class="nav-item">
            <a
              class="nav-link"
              id="infra-profile-tab"
              data-toggle="pill"
              href="#pills-infra"
              role="tab"
              aria-controls="pills-infra"
              aria-selected="false"
              on:click={() => updateAlerts(environments.INFRA)}>
              Infrastructure
            </a>
          </li>
          <li class="nav-item">
            <a
              class="nav-link"
              id="pills-prod-tab"
              data-toggle="pill"
              href="#pills-prod"
              role="tab"
              aria-controls="pills-prod"
              aria-selected="false"
              on:click={() => updateAlerts(environments.PROD)}>
              Production
            </a>
          </li>
          <li class="nav-item">
            <a
              class="nav-link"
              id="pills-development-tab"
              data-toggle="pill"
              href="#pills-development"
              role="tab"
              aria-controls="pills-development"
              aria-selected="false"
              on:click={() => updateAlerts(environments.DEV)}>
              Development
            </a>
          </li>
        </ul>
        <div class="tab-content" id="pills-tabContent">
          <div
            class="tab-pane fade show active"
            id="pills-all"
            role="tabpanel"
            aria-labelledby="pills-all-tab" />
          <div
            class="tab-pane fade"
            id="pills-infra"
            role="tabpanel"
            aria-labelledby="pills-infra-tab" />
          <div
            class="tab-pane fade"
            id="pills-prod"
            role="tabpanel"
            aria-labelledby="pills-prod-tab" />
          <div
            class="tab-pane fade"
            id="pills-development"
            role="tabpanel"
            aria-labelledby="pills-development-tab" />
        </div>
      </div>

    </div>
  </div>
  <!--[Alerts]-->
  {#if alerts && alerts != '' && isAlertsLoaded && !isAllAlertsDeleted}
    <!-- content here -->
    <div class="row">
      <div class="col-sm-12">
        <Alerts {alerts} />
      </div>
    </div>
  {:else if !isAlertsLoaded && !isAllAlertsDeleted}
    <div class="text-center">
      <img src={'/img/loader.gif'} class="img-fluid" alt="Responsive image" />
    </div>
  {:else if isAlertsLoaded && isAllAlertsDeleted}
    <div class="mt-5 text-center">
      <h2>All the alerts have been deleted.</h2>
    </div>
  {:else}
    <div class="mt-5 text-center">
      <h2>There is no alerts matching your criteria</h2>
    </div>
  {/if}
</div>
```

* In requests handling to deal with APIs, I have used <b>axios library</b>
, to install ```npm install axios```, import it ```	import axios from 'axios';``` and then you will be able to do requests to the APIs.</br>
```javascript

import axios from 'axios'

export function getAlerts(envName = "all") {
    return (axios.post("/actors/alerta/list_alerts_by_env", { "args": { "env_name": envName } }))
}
export function deleteAll() {
    return (axios.post("/actors/alerta/delete_all_alerts"))

}
export function deleteAlert(alertId) {
    return (axios.post("/actors/alerta/delete_alert", { "args": { "alert_id": alertId } }))
}
```

## Deploying to the web

### With [now](https://zeit.co/now)

Install `now` if you haven't already:

```bash
npm install -g now
```

Then, from within your project folder:

```bash
cd public
now
```

As an alternative, use the [Now desktop client](https://zeit.co/download) and simply drag the unzipped project folder to the taskbar icon.

### With [surge](https://surge.sh/)

Install `surge` if you haven't already:

```bash
npm install -g surge
```

Then, from within your project folder:

```bash
npm run build
surge public
```
