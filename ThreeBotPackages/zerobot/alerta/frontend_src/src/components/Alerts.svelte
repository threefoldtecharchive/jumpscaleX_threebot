<script>
  import { deleteAlert } from "../routes/data";
  import AlertModal from "./AlertModal.svelte";
  import { ansiUp } from "../routes/common";
  import Confirm from "./Confirm.svelte";

  export let alerts;
  $: alerts;
  export const levels = {
    50: "CRITICAL",
    40: "ERROR",
    30: "WARNING",
    20: "INFO",
    15: "STDOUT",
    10: "DEBUG"
  };

  function onDeleteAlert(identifier) {
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

  function getIndexOfAlert(identifier) {
    for (let i = 0; i < alerts.length; i++) {
      if (alerts[i].identifier == identifier) return i;
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
            <th scope="col">Type</th>
            <th scope="col">Status</th>
            <th scope="col">Level</th>
            <th scope="col">Count</th>
            <th scope="col">Category</th>
            <th scope="col">First time</th>
            <th scope="col">Last time</th>
            <th scope="col">Message</th>
            <th scope="col">Message (Public)</th>
            <th scope="col" class="text-center">Action</th>
          </tr>
        </thead>
        <!--[Tasks-Data-Body]-->
        <tbody>

          <!-- content here -->
          {#each alerts as myAlert, i}
            <tr>
              <th scope="row">
                <a href="/zerobot/alerta_ui/alert/{myAlert.identifier}">
                  {i + 1}
                </a>
              </th>
              <td>{myAlert.alert_type}</td>
              <td>{myAlert.status}</td>
              {#if myAlert.level == 50}
                <td>
                  <span class="badge badge-dark">{levels[myAlert.level]}</span>
                </td>
              {:else if myAlert.level == 40}
                <td>
                  <span class="badge badge-danger">
                    {levels[myAlert.level]}
                  </span>
                </td>
              {:else if myAlert.level == 30}
                <td>
                  <span class="badge badge-warning">
                    {levels[myAlert.level]}
                  </span>
                </td>
              {:else if myAlert.level == 20}
                <td>
                  <span class="badge badge-info">{levels[myAlert.level]}</span>
                </td>
              {:else if myAlert.level == 15}
                <td>
                  <span class="badge badge-light">{levels[myAlert.level]}</span>
                </td>
              {:else if myAlert.level == 10}
                <td>
                  <span class="badge badge-sucess">
                    {levels[myAlert.level]}
                  </span>
                </td>
              {:else}
                <td>
                  <span class="badge badge-primary">
                    {levels[myAlert.level]}
                  </span>
                </td>
              {/if}
              <td>{myAlert.count}</td>
              <td>{myAlert.cat}</td>
              <td>{myAlert.time_first}</td>
              <td>{myAlert.time_last}</td>
              <td>
                {@html ansiUp.ansi_to_html(myAlert.message)}
              </td>
              <td>{myAlert.message_pub}</td>
              <td>
                <!--[Actions]-->
                <div class="d-flex d-flex justify-content-center">
                  <!--[Delete-Alert-BTN]-->
                  <div class="mr-1" />
                  <!--[Details-Alert-BTN]-->
                  <div>
                    <button
                      type="button"
                      class="btn btn-warning pointer"
                      data-toggle="modal"
                      data-target="#modal{myAlert.identifier}">
                      Details
                    </button>
                    <Confirm
                      let:confirm={confirmThis}
                      confirmTitle="Delete"
                      cancelTitle="Cancel">
                      <span slot="title">Delete alert</span>
                      <span slot="description">
                        Alert of {myAlert.identifier} will be completely
                        removed?
                      </span>

                      <button
                        type="button"
                        class="btn btn-primary pointer"
                        on:click={() => confirmThis(onDeleteAlert, myAlert.identifier)}>
                        Delete
                      </button>
                    </Confirm>
                  </div>
                </div>
              </td>
              <!--[Modal]-->
              <div>
                <AlertModal {myAlert} {levels} index={myAlert.identifier} />
              </div>
            </tr>
          {/each}
        </tbody>
      </table>

    </div>
  </div>
</div>
