<script>
  import { formatDate, ansiUp } from "../common";

  export let myAlert;
  export let index;
</script>

<style>
  .modal-body {
    word-wrap: break-word;
  }
</style>

<div
  class="modal fade"
  id="modal{index}"
  tabindex="-1"
  role="dialog"
  aria-labelledby="exampleModalLabel"
  aria-hidden="true">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Alert Details</h5>
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
            <b>Severity :</b>
            {myAlert.severity}
          </li>
          <li class="list-group-item">
            <b>Status :</b>
            {myAlert.status}
          </li>
          <li class="list-group-item">
            <b>Time :</b>
            {myAlert.time}
          </li>
          <li class="list-group-item">
            <b>Count :</b>
            {myAlert.count}
          </li>
          <li class="list-group-item">
            <b>Environment :</b>
            {myAlert.environment}
          </li>
          <li class="list-group-item">
            <b>Service :</b>
            {myAlert.service}
          </li>
          <li class="list-group-item">
            <b>Resource :</b>
            {myAlert.resource}
          </li>
          <li class="list-group-item">
            <b>Event :</b>
            {myAlert.event}
          </li>
          <li class="list-group-item">
            <b>Value :</b>
            <p>
              {#each myAlert.value.split('\n') as line}
                {@html ansiUp.ansi_to_html(line)}
                <br />
              {/each}
            </p>
          </li>
          <li class="list-group-item">
            <b>message Type :</b>
            {myAlert.messageType}
          </li>
          <li class="list-group-item">
            <b>Text :</b>
            {@html ansiUp.ansi_to_html(myAlert.text)}
          </li>
          {#if myAlert.occurrences.length}
            <li class="list-group-item">
              <b>Occurrences :</b>
              <ul>
                {#each myAlert.occurrences as item}
                  <li>{formatDate(item)}</li>
                {/each}
              </ul>
            </li>
          {/if}
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
