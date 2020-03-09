<script>
  import AlertModal from "./AlertModal.svelte";
  import { ansiUp } from "../routes/common";
  import Confirm from "./Confirm.svelte";
  import { createEventDispatcher } from "svelte";

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

  const dispatch = createEventDispatcher();

  function dispatchDelete(identifier) {
    dispatch("delete", { identifier: identifier });
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
            <th scope="col">App name</th>
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
                <a href="/zerobot/alerta/alert/{myAlert.identifier}">{i + 1}</a>
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
              <td>{myAlert.appname}</td>
              <td>{myAlert.time_first}</td>
              <td>{myAlert.time_last}</td>
              <td>
                <span>
                  {@html myAlert.message.length > 500 ? ansiUp.ansi_to_html(myAlert.message.substring(0, 500) + '...') : ansiUp.ansi_to_html(myAlert.message)}
                </span>
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
                        on:click={() => confirmThis(dispatchDelete, myAlert.identifier)}>
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
