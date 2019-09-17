
This is a tool which is used to visualization the workers and tasks

## Features
* Visualize Tasks
* Visualize workers
* Filter Tasks
# svelte app

This is a project template for [Svelte](https://svelte.dev) apps. It lives at https://github.com/sveltejs/template.

To create a new project based on this template using [degit](https://github.com/Rich-Harris/degit):

```bash
npx degit sveltejs/template svelte-app
cd svelte-app
```

*Note that you will need to have [Node.js](https://nodejs.org) installed.*


## Get started

- Install the dependencies...

```bash
cd svelte-app
npm install
```

- start [Rollup](https://rollupjs.org):

```bash
npm run dev
```

- Navigate to [localhost:5000](http://localhost:5000). You should see your app running. Edit a component file in `src`, save it, and reload the page to see your changes.

## Project stucture
```
.
└── JobsVisualSvelt
    ├── active.js
    ├── npm-debug.log
    ├── package.json
    ├── package-lock.json
    ├── public
    │   ├── favicon.png
    │   ├── global.css
    │   ├── img
    │   │   └── loader.gif
    │   └── index.html
    ├── README.md
    ├── rollup.config.js
    └── src
        ├── App.svelte
        ├── data.js
        ├── main.js
        ├── Navigation.svelte
        ├── routes
        │   ├── NotFound.svelte
        │   ├── SingleWorkerTasks.svelte
        │   ├── TasksRendering.svelte
        │   ├── Tasks.svelte
        │   └── Workers.svelte
        │   └── JobModal.svelte
        └── routes.js

5 directories, 21 files
```
## Routing between components
- Install the dependencies for external router **svelte-spa-router**...

```bash
npm install svelte-spa-router
```

- Register your routes to the component
```
let routes
routes = new Map()
routes.set('/', MyComponent)
routes.set('/MyComponent', MyComponent)
```

For more information about the router check <https://www.npmjs.com/package/svelte-spa-router>

## Working on frontend
* Add all the front-end libraries <b> example</b> ```Bootstrap and Font awesome``` in ```public/index.html```

* Add ```Axios``` to handle the HTTP requests ```$ npm install axios```
example 
```javascript
import axios from "axios";
function getJobs() {
    return (axios.post("/actors/myjobs/list_jobs"));
}
function getWorkers() {
    return (axios.post("/actors/myjobs/list_workers"));
}
export {
    getJobs,
    getWorkers
}
```

* Create Worker Component ```src/routes/Workers.svelte``` which will contain all the logic to Render and Visualize the workers
```html
<script>
  import { getWorkers } from "../data";
  import { onMount } from "svelte";
  import {
    link,
    push,
    pop,
    replace,
    location,
    querystring
  } from "svelte-spa-router";

  const state = {
    RESULT: "OK",
    ERROR: "ERROR",
    NEW: "NEW",
    HALTED: "HALTED",
    WAITING: "WAITING",
    RUNNING: "RUNNING",
    WARNING: "WARNING",
    ALL: "all"
  };
  let isAllWorkersAvailable = false;
  let counters = {
    success: 0,
    error: 0,
    new: 0,
    running: 0,
    halted: 0,
    waiting: 0,
    warning: 0
  };

  let currentFilter = state.ALL;
  let workers = [];

  onMount(async () => {
    isAllWorkersAvailable = false;
    getWorkers()
      .then(function(data) {
        if (!data) {
          return;
        }
        isAllWorkersAvailable = true;
        console.log(`DATA : ${data}`);
        workers = data.data.workers;
        workers.forEach(worker => {
          worker.state = worker.state.toUpperCase();
        });

        //Calculating the statstics relatedt to the workers
        statsticsCalculation();
      })
      .catch(err => {
        console.log(err);
      });
  });

  function statsticsCalculation() {
    workers.forEach(worker => {
      if (worker.state == state.RESULT) counters["success"]++;
      else if (worker.state == state.ERROR) counters["error"]++;
      else if (worker.state == state.NEW) counters["new"]++;
      else if (worker.state == state.RUNNING) counters["running"]++;
      else if (worker.state == state.HALTED) counters["halted"]++;
      else if (worker.state == state.WAITING) counters["waiting"]++;
      else if (worker.state == state.WARNING) counters["warning"]++;
      else {
      }
    });
  }
  $: filteredWorkers = () => {
    counters = {
      success: 0,
      error: 0,
      new: 0,
      running: 0,
      halted: 0,
      waiting: 0,
      warning: 0
    };
    statsticsCalculation();
    if (currentFilter == state.ALL) return workers;
    else if (currentFilter == state.RESULT)
      return WorkersFiltering(state.RESULT);
    else if (currentFilter == state.ERROR) return WorkersFiltering(state.ERROR);
    else if (currentFilter == state.NEW) return WorkersFiltering(state.NEW);
    else if (currentFilter == state.RUNNING)
      return WorkersFiltering(state.RUNNING);
    else if (currentFilter == state.HALTED)
      return WorkersFiltering(state.HALTED);
    else if (currentFilter == state.WARNING)
      return WorkersFiltering(state.WARNING);
    else if (currentFilter == state.WAITING)
      return WorkersFiltering(state.WAITING);
  };

  function updateFilter(filter) {
    currentFilter = filter;
  }
  function WorkersFiltering(state) {
    let filteredWorkers = [];
    workers.forEach(worker => {
      if (worker.state == state) filteredWorkers.push(worker);
    });
    return filteredWorkers;
  }
</script>

<style>
  .mt-3 {
    margin-top: 20px;
  }
</style>

<!--[Header]-->
<h1>Workers</h1>
<!--[Filter]-->
<div class="d-flex justify-content-start">
  <div class="mr-3">
    <button
      class="btn"
      on:click={() => updateFilter(state.ALL)}
      class:active={currentFilter === state.ALL}>
      All
    </button>
  </div>
  <div class="mr-3">
    <button
      class="btn"
      on:click={() => updateFilter(state.NEW)}
      class:active={currentFilter === state.NEW}>
      New
    </button>
  </div>
  <div class="mr-3">
    <button
      class="btn"
      on:click={() => updateFilter(state.RESULT)}
      class:active={currentFilter === state.RESULT}>
      Success
    </button>
  </div>
  <div class="mr-3">
    <button
      class="btn"
      on:click={() => updateFilter(state.ERROR)}
      class:active={currentFilter === state.ERROR}>
      Failure
    </button>
  </div>
  <div class="mr-3">
    <button
      class="btn"
      on:click={() => updateFilter(state.WARNING)}
      class:active={currentFilter === state.WARNING}>
      Warning
    </button>
  </div>
  <div class="mr-3">
    <button
      class="btn"
      on:click={() => updateFilter(state.RUNNING)}
      class:active={currentFilter === state.RUNNING}>
      Running
    </button>
  </div>
  <div class="mr-3">
    <button
      class="btn"
      on:click={() => updateFilter(state.HALTED)}
      class:active={currentFilter === state.HALTED}>
      Halted
    </button>
  </div>

  <div class="mr-3">
    <button
      class="btn"
      on:click={() => updateFilter(state.WAITING)}
      class:active={currentFilter === state.WAITING}>
      Waiting
    </button>
  </div>
</div>

<!--[Statstics]-->
<div class="row mt-5">

  <div class="col-sm-12">
    <table class="table table-striped">
      <thead>
        <tr>
          <th class="text-center" scope="col">Total</th>
          <th class="text-center" scope="col">New</th>
          <th class="text-center" scope="col">Success</th>
          <th class="text-center" scope="col">Failure</th>
          <th class="text-center" scope="col">Warning</th>
          <th class="text-center" scope="col">Running</th>
          <th class="text-center" scope="col">Halted</th>
          <th class="text-center" scope="col">Waiting</th>
        </tr>
      </thead>
      <tbody class="text-center">
        <td>{workers.length}</td>
        <td>{counters['new']}</td>
        <td>{counters['success']}</td>
        <td>{counters['error']}</td>
        <td>{counters['warning']}</td>
        <td>{counters['running']}</td>
        <td>{counters['halted']}</td>
        <td>{counters['waiting']}</td>
      </tbody>
    </table>
  </div>
</div>

{#if filteredWorkers() && filteredWorkers().length > 0 && isAllWorkersAvailable}
  <!--[Containder]-->
  <div>
    <div class="row mt-5">
      <!--[Workers-Data]-->
      <div class="col-sm-12">
        <table class="table table-striped">
          <!--[Workers-Data-Headers]-->
          <thead>
            <tr>
              <!-- <th scope="col">#</th> -->
              <th scope="col">#</th>
              <th scope="col">State</th>
              <th scope="col">Halt</th>
              <th scope="col">Pid</th>
              <th scope="col">Current Job</th>
              <th scope="col">Last Update</th>
              <th scope="col">Time Start</th>
              <th scope="col">Timeout</th>
              <th scope="col">Type</th>
              <th scope="col">Error</th>

            </tr>
          </thead>
          <!--[Workers-Data-Body]-->
          <tbody>
            {#each workers as worker, i}
              <tr>
                <!-- <th scope="row">{i + 1}</th> -->
                <td>{worker.id}</td>

                {#if worker.state == state.RESULT}
                  <td>
                    <span class="badge badge-success">{worker.state}</span>
                  </td>
                {:else if worker.state == state.ERROR}
                  <td>
                    <span class="badge badge-danger">{worker.state}</span>
                  </td>
                {:else if worker.state == state.NEW}
                  <td>
                    <span class="badge badge-primary">{worker.state}</span>
                  </td>
                {:else if worker.state == state.RUNNING}
                  <td>
                    <span class="badge badge-info">{worker.state}</span>
                  </td>
                {:else if worker.state == state.HALTED}
                  <td>
                    <span class="badge badge-secondary">{worker.state}</span>
                  </td>
                {:else if worker.state == state.WAITING}
                  <td>
                    <span class="badge badge-dark">{worker.state}</span>
                  </td>
                {:else}
                  <td>
                    <span class="badge badge-warning">{worker.state}</span>
                  </td>
                {/if}
                <td>{worker.halt}</td>
                <td>{worker.pid}</td>
                <td>{worker.current_job}</td>
                <td>{worker.last_update}</td>
                <td>{worker.time_start}</td>
                <td>{worker.timeout}</td>
                <td>{worker.type}</td>
                <td>{worker.error}</td>

              </tr>
            {/each}
          </tbody>
        </table>
      </div>
    </div>

  </div>
{:else if filteredWorkers().length == 0 && isAllWorkersAvailable}
  <div>
    <h2>There is no Workers matching your criteria</h2>
  </div>
{:else if !isAllWorkersAvailable}
  <div class="text-center">
    <img src={'/img/loader.gif'} class="img-fluid" alt="Responsive image" />
  </div>
{/if}
```

* Create Tasks component ```src/routes/Tasks.svelte``` which will contain the logic to visualize the tasks
```html
<script>
  import TasksRendering from "./TasksRendering.svelte";
  import { getJobs } from "../data";
  import { onMount } from "svelte";

  let allTasks = [];
  let isAllTasksAvailable = false;
  //Make all the states UpperCase
  allTasks.forEach(task => {
    task.state = task.state.toUpperCase();
  });

  onMount(async () => {
    isAllTasksAvailable = false;

    getJobs()
      .then(data => {
        isAllTasksAvailable = true;
        console.log(`DATA : ${data}`);

        if (!data) {
          return;
        }
        allTasks = data.data;
        //Make all the states UpperCase
        allTasks.forEach(task => {
          task.state = task.state.toUpperCase();
        });
      })
      .catch(err => {
        console.log(err);
      });
  });
</script>

<style>

</style>

<!--[Header]-->
<h1>Tasks</h1>
{#if allTasks && allTasks.length > 0 && isAllTasksAvailable}
  <TasksRendering {allTasks} />
{:else if allTasks.length == 0 && isAllTasksAvailable}
  <div>
    <h2>There is no Jobs</h2>
  </div>
{:else if !isAllTasksAvailable}
  <div class="text-center">
    <img src={'/img/loader.gif'} class="img-fluid" alt="Responsive image" />
  </div>
{/if}

```

* Create TasksRendering component ```src/routes/TasksRendering.svelte``` which contains the logic to render the tasks and filter them.
```html
	<script>
  export let allTasks = [];
  export let isError = false;
  import JobModel from "./JobModel.svelte";

  const state = {
    RESULT: "OK",
    ERROR: "ERROR",
    NEW: "NEW",
    RUNNING: "RUNNING",
    HALTED: "HALTED",
    ALL: "all"
  };

  let counters = { success: 0, error: 0, new: 0, running: 0, halted: 0 };
  let currentFilter = state.ALL;
  $: filteredTasks = () => {
    //Re-intialize the counters and re-calculate the statstics
    counters = { success: 0, error: 0, new: 0, running: 0, halted: 0 };
    statsticsCalculation();
    if (currentFilter == state.ALL) return allTasks;
    else if (currentFilter == state.RESULT) return tasksFiltering(state.RESULT);
    else if (currentFilter == state.ERROR) return tasksFiltering(state.ERROR);
    else if (currentFilter == state.NEW) return tasksFiltering(state.NEW);
    else if (currentFilter == state.RUNNING)
      return tasksFiltering(state.RUNNING);
    else if (currentFilter == state.HALTED) return tasksFiltering(state.HALTED);
  };

  function tasksFiltering(state) {
    let filteredTasks = [];
    allTasks.forEach(task => {
      if (task.state == state) filteredTasks.push(task);
    });
    return filteredTasks;
  }

  //Calculating the stastics related to the tasks
  function statsticsCalculation() {
    allTasks.forEach(task => {
      console.log(`task.state: ${task.state}`);

      if (task.state === state.RESULT) counters["success"]++;
      else if (task.state === state.ERROR) counters["error"]++;
      else if (task.state === state.NEW) counters["new"]++;
      else if (task.state === state.RUNNING) counters["running"]++;
      else if (task.state === state.HALTED) counters["halted"]++;
      else {
        console.log(`task.state: ${task.state}`);
      }
    });
  }

  function updateFilter(filter) {
    currentFilter = filter;
  }
</script>

<style>
  .mt-3 {
    margin-top: 20px;
  }
</style>

<!--[Filter]-->
<div class="d-flex justify-content-start">
  <div class="mr-3">
    <button
      class="btn"
      on:click={() => updateFilter(state.ALL)}
      class:active={currentFilter === state.ALL}>
      All
    </button>
  </div>
  <div class="mr-3">
    <button
      class="btn"
      on:click={() => updateFilter(state.RESULT)}
      class:active={currentFilter === state.RESULT}>
      Success
    </button>
  </div>
  <div class="mr-3">
    <button
      class="btn"
      on:click={() => updateFilter(state.ERROR)}
      class:active={currentFilter === state.ERROR}>
      Failure
    </button>
  </div>
  <div class="mr-3">
    <button
      class="btn"
      on:click={() => updateFilter(state.NEW)}
      class:active={currentFilter === state.NEW}>
      New
    </button>
  </div>
  <div class="mr-3">
    <button
      class="btn"
      on:click={() => updateFilter(state.RUNNING)}
      class:active={currentFilter === state.RUNNING}>
      Running
    </button>
  </div>
  <div class="mr-3">
    <button
      class="btn"
      on:click={() => updateFilter(state.HALTED)}
      class:active={currentFilter === state.HALTED}>
      Halted
    </button>
  </div>
</div>
<!--[Statstics]-->
{#if isError != true}
  <!--[Containder]-->
  <div class="row mt-5">
    <!--[Tasks-Data]-->
    <div class="col-sm-12">
      <!-- content here -->
      <table class="table table-striped">
        <!--[Tasks-Data-Headers]-->
        <thead>
          <tr>
            <th class="text-center" scope="col">Total Tasks</th>
            <th class="text-center" scope="col">Success Tasks</th>
            <th class="text-center" scope="col">Failure Tasks</th>
            <th class="text-center" scope="col">New Tasks</th>
            <th class="text-center" scope="col">Running Tasks</th>
            <th class="text-center" scope="col">Halted Tasks</th>
          </tr>
        </thead>
        <tbody class="text-center">
          <td>{allTasks.length}</td>
          <td>{counters['success']}</td>
          <td>{counters['error']}</td>
          <td>{counters['new']}</td>
          <td>{counters['running']}</td>
          <td>{counters['halted']}</td>
        </tbody>
      </table>
    </div>
  </div>
{/if}
<!--[Tasks-Data]-->
<div>
  <div class="row mt-5">
    <!--[Tasks-Data]-->
    <div class="col-sm-12">
      {#if filteredTasks().length > 0}
        <!-- content here -->
        <table class="table table-striped">
          <!--[Tasks-Data-Headers]-->
          <thead>
            <tr>
              <th scope="col">#</th>
              <!-- <th scope="col">Id</th> -->
              <th scope="col">Category</th>
              <th scope="col">Time Start</th>
              <th scope="col">Time Stop</th>
              <th scope="col">State</th>
              <th scope="col">Timeout</th>
              <th scope="col">Action</th>
              <!-- <th scope="col">args</th> -->
              <th scope="col">kwargs</th>
              <th scope="col">Result</th>
              <th scope="col" class="text-center">Actions</th>
              <!-- <th scope="col">Return Queues</th> -->
            </tr>
          </thead>
          <!--[Tasks-Data-Body]-->
          <tbody>
            {#each filteredTasks() as task, i}
              <tr>
                <th scope="row">{i + 1}</th>
                <!-- <td>{task.id}</td> -->
                <td>{task.category}</td>
                <td>{task.time_start}</td>
                <td>{task.time_stop}</td>
                {#if task.state == state.RESULT}
                  <td>
                    <span class="badge badge-success">{task.state}</span>
                  </td>
                {:else if task.state == state.ERROR}
                  <td>
                    <span class="badge badge-danger">{task.state}</span>
                  </td>
                {:else if task.state == state.NEW}
                  <td>
                    <span class="badge badge-primary">{task.state}</span>
                  </td>
                {:else if task.state == state.RUNNING}
                  <td>
                    <span class="badge badge-warning">{task.state}</span>
                  </td>
                {:else if task.state == state.HALTED}
                  <td>
                    <span class="badge badge-info">{task.state}</span>
                  </td>
                {/if}

                <td>{task.timeout}</td>
                <td>{task.action_id}</td>
                <!-- <td>{task.args}</td> -->
                <td>{task.kwargs}</td>
                <td>{task.result}</td>
                <td class="text-center">
                  <!--[Actions]-->
                  <div>
                    <!--[Details-Job-BTN]-->
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
                  <JobModel {task} index={i} />
                </div>
              </tr>
            {/each}
          </tbody>
        </table>
      {:else}
        <h3>There is no Jobs matching your criteria</h3>
      {/if}
    </div>
  </div>
</div>
```
 * Create JobModal component ```ThreeBotPackages/myjobs/JobsVisualSvelte/src/routes/JobModal.svelte``` which is responsible for rendering the job details
 ```html
 <script>
  export let task;
  export let index;
</script>

<style>
  .text-wrap {
    overflow-wrap: break-word;
  }
  .job-modal {
    max-width: 70%;
  }
</style>

<div
  class="modal fade"
  id="modal{index}"
  tabindex="-1"
  role="dialog"
  aria-labelledby="exampleModalLabel"
  aria-hidden="true">
  <div class="modal-dialog job-modal" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Job Details</h5>
        <button
          type="button"
          class="close"
          data-dismiss="modal"
          aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        <!--[Data-Listing]-->
        <ul class="list-group">
          <li class="list-group-item">
            <b>Category :</b>
            {task.category}
          </li>
          <li class="list-group-item">
            <b>Time Start :</b>
            {task.time_start}
          </li>
          <li class="list-group-item">
            <b>Time Stop :</b>
            {task.time_stop}
          </li>
          <li class="list-group-item">
            <b>State :</b>
            {task.state}
          </li>
          <li class="list-group-item">
            <b>Timeout :</b>
            {task.timeout}
          </li>
          <li class="list-group-item">
            <b>Action Id :</b>
            {task.action_id}
          </li>
          <li class="list-group-item">
            <b>Kwargs :</b>
            {task.kwargs}
          </li>
          <li class="list-group-item">
            <b>Result :</b>
            {task.result}
          </li>
          <li class="list-group-item">
            <b>Error :</b>
            <p class="text-wrap">{task.error}</p>
          </li>
        </ul>

      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">
          Close
        </button>
      </div>
    </div>
  </div>
</div>
 ```

* Create navigation component <b>example</b> ```src/Navigation.svelte``` and import this component in ```src/App.svelte``` <b>example</b> ```import Navigation from './Navigation.svelte';```to use this component ```<Navigation />```
```html
<div>
  <nav class="navbar navbar-expand-lg navbar navbar-primary bg-primary">
    <a class="navbar-brand text-white" href="#">Workers and Jobs</a>
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
          <a class="nav-link text-white" href="/workers" use:link>
            Workers
            <span class="sr-only">(current)</span>
          </a>
        </li>
        <li class="nav-item active">
          <a class="nav-link text-white" href="/tasks" use:link>
            Tasks
            <span class="sr-only">(current)</span>
          </a>
        </li>
      </ul>
      <span class="navbar-text text-white">Workers and Jobs visualization</span>
    </div>
  </nav>
</div>

```

* Create ```src/routes/NotFound.svelte``` component to handle the not found pages
```html
<h2>Not Found</h2>
<h3>Oops, this route doesn't exist!</h3>
```
## Deploying to the web

### With [now](https://zeit.co/now)

- Install `now` if you haven't already:

```bash
npm install -g now
```

- From within your project folder:

```bash
cd public
now
```

As an alternative, use the [Now desktop client](https://zeit.co/download) and simply drag the unzipped project folder to the taskbar icon.

