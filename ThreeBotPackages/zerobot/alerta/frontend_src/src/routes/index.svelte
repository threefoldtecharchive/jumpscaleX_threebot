<script>
  import Alerts from "../components/Alerts.svelte";
  import Spinner from "../components/Spinner.svelte";
  import Confirm from "../components/Confirm.svelte";
  import { getAlerts, deleteAll, deleteAlert } from "./data";
  import { formatDate } from "./common";
  import { onMount } from "svelte";

  let alerts;
  let searchText = "";
  let formattedAlerts = "";
  let currentFilteredAlerts;
  let isAlertsLoaded = false;
  let isAllAlertsDeleted = false;

  const alertTypes = {
    BUG: "BUG",
    QUESTION: "QUESTION",
    EVENT_SYSTEM: "EVENT (SYSTEM)",
    EVENT_MONITOR: "EVENT (MONITOR_",
    EVENT_OPERATOR: "EVENT (OPERATOR)"
  };

  const status = {
    ALL: "",
    OPEN: "OPEN",
    CLOSED: "CLOSED",
    NEW: "NEW",
    REOPEN: "REOPEN"
  };

  let currentFilters = {
    alert_type: alertTypes.ALL,
    status: status.ALL
  };

  onMount(async () => {
    updateAlerts("");
  });

  function alertsAreEmpty() {
    if (!alerts) {
      return true;
    }
    return alerts.length == 0;
  }

  //Get Data from the API
  function updateAlerts(alert_type) {
    isAlertsLoaded = false;
    isAllAlertsDeleted = false; //The alerts all available now and not deleted (reintialize the state)
    alerts = [];

    getAlerts(alert_type)
      .then(response => {
        // handle success
        let parsedJson = response.data;
        alerts = parsedJson.alerts;
        formattedAlerts = convertData(parsedJson.alerts);
        filterAlerts(formattedAlerts);
        isAlertsLoaded = true;
      })
      .catch(err => {
        throw err;
        console.log("error ", err);
      });
  }

  function updateFilters(selectedAlertType, selectedState) {
    currentFilters = {
      alertType: selectedAlertType,
      status: selectedState
    };
    filterAlerts(formattedAlerts);
  }

  function convertData(alerts) {
    for (let i = 0; i < alerts.length; i++) {
      let alert = alerts[i];

      alert.status = alert.status.toUpperCase();
      alert.alert_type = alertTypes[alert.alert_type.toUpperCase()];
      alert.time_first = alert.time_first; //formatDate(alert.time_first);
      alert.time_last = alert.time_last; //formatDate(alert.time_last);
    }
    return alerts;
  }

  function filterAlerts(filteredAlerts) {
    // if (currentFilters.alert_type != "ALL")
    //   filteredAlerts = filteredAlerts.filter(singelAlert => {
    //     return singelAlert.service == currentFilters.service;
    //   });
    // if (currentFilters.messageType != messageTypes.ALL)
    //   filteredAlerts = filteredAlerts.filter(singelAlert => {
    //     return singelAlert.messageType == currentFilters.messageType;
    //   });
    // if (currentFilters.status != status.ALL)
    //   filteredAlerts = filteredAlerts.filter(singelAlert => {
    //     return singelAlert.status == currentFilters.status;
    //   });
    currentFilteredAlerts = filteredAlerts; //keeping the current filtered alerts
    alerts = filteredAlerts; //update the alerts to update the Rendering

    return filterAlerts;
  }

  $: if (searchText) {
    searchAlertsText();
  } else {
    alerts = currentFilteredAlerts;
  }
  function searchAlertsText() {
    const keyworkd = searchText.trim().toLocaleLowerCase();

    alerts = currentFilteredAlerts.filter(singleAlert => {
      const values = Object.values(singleAlert);
      let found = false;
      for (let value of values) {
        value = String(value).toLocaleLowerCase();
        found |= value.includes(keyworkd);
      }
      return found;
    });
  }
  function resetFilters() {
    currentFilters = {
      alert_type: alertTypes.ALL,
      status: status.ALL
    };
    document.getElementById("InputSearch").value = "";
    filterAlerts(formattedAlerts);
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

  function getIndexOfAlert(identifier) {
    for (let i = 0; i < alerts.length; i++) {
      if (alerts[i].identifier == identifier) return i;
    }
  }

  function doDeleteAlert(event) {
    let identifier = event.detail.identifier;

    //Call gedis actor
    deleteAlert(identifier)
      .then(resp => {
        let toBeDeletedArrayIndex = getIndexOfAlert(identifier);
        alerts.splice(toBeDeletedArrayIndex, 1);
        alerts = [...alerts];
      })
      .catch(err => {
        console.log(err);
      });
  }
</script>

<style>
  .search-width {
    width: 350px;
  }
</style>

<svelte:head>
  <title>Alerta</title>
</svelte:head>

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
        <!--[Message-Type]-->
        <!-- <div class="dropdown mx-2">
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
        </div> -->
        <!--[Status]-->
        <!-- <div class="dropdown mx-2">
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
        </div> -->

        <!--[Reset-Filter]-->
        <!-- <div class="mx-2">
          <button
            type="button"
            class="btn btn-light pointer"
            on:click={() => resetFilters()}
            disabled={servicesLoading}>
            Reset Filters
          </button>
        </div> -->
        <!--[Delete-Alerts]-->
        <div class="mx-2">
          <Confirm
            let:confirm={confirmThis}
            confirmTitle="Delete all"
            cancelTitle="Cancel">
            <span slot="title">Delete all alerts?</span>
            <span slot="description">
              All alerts stored by alerta will be completely removed, are you
              sure?
            </span>

            <button
              type="button"
              class="btn btn-primary pointer"
              disabled={alerts ? alerts.length == 0 : false}
              on:click={() => confirmThis(deleteAllAlerts)}>
              Delete all
            </button>
          </Confirm>
        </div>
      </div>
    </div>
  </div>
  <!--[Tabs]-->
  <!-- <div class="row mt-4">
    <div class="col-sm-12 ml-4">
      <div>
        <ul class="nav nav-pills mb-3" id="pills-tab" role="tablist">
          {#each environments as item}
            <li class="nav-item">
              <a
                class="nav-link {item.selected ? 'active' : ''}"
                id="pills-{item.id}-tab"
                data-toggle="pill"
                href="#pills-{item.id}"
                role="tab"
                aria-controls="pills-{item.id}"
                aria-selected={item.selected ? 'true' : ''}
                on:click={() => updateAlerts(item.id)}>
                {item.name}
              </a>
            </li>
          {/each}
        </ul>
        <div class="tab-content" id="pills-tabContent">
          {#each environments as item}
            <div
              class="tab-pane fade show active"
              id="pills-{item.id}"
              role="tabpanel"
              aria-labelledby="pills-{item.id}-tab" />
          {/each}
        </div>
      </div>

    </div>
  </div> -->
  <!--[Alerts]-->
  {#if alerts && alerts != '' && isAlertsLoaded && !isAllAlertsDeleted}
    <!-- content here -->
    <div class="row">
      <div class="col-sm-12">
        <Alerts {alerts} on:delete={doDeleteAlert} />
      </div>
    </div>
  {:else if !isAlertsLoaded && !isAllAlertsDeleted}
    <Spinner />
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
