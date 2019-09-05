<script>
  export let alerts;
  console.log("alerts in Alerts component", alerts);
  const severity = {
    CRITICAL: "CRITICAL",
    MAJOR: "MAJOR",
    MINOR: "MINOR",
    WARNING: "WARNING",
    INDETERMINATE: "INDETERMINATE"
  };
</script>

<div>
  <div class="row">
    <!--[Tasks-Data]-->
    <div class="col-xs-12">
      <!-- content here -->
      <table class="table table-striped">
        <!--[Tasks-Data-Headers]-->
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Severity</th>
            <th scope="col">Status</th>
            <th scope="col">Time</th>
            <th scope="col">Environment</th>
            <th scope="col">Service</th>
            <th scope="col">Resource</th>
            <th scope="col">Event</th>
            <th scope="col">Value</th>
            <th scope="col">Message Type</th>
            <th scope="col">Text</th>
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
              <td>{myAlert.environment}</td>
              <td>{myAlert.service}</td>
              <td>{myAlert.resource}</td>
              <td>{myAlert.event}</td>
              <td>{myAlert.value}</td>
              <td>{myAlert.messageType}</td>
              <td>{myAlert.text}</td>
            </tr>
          {/each}
        </tbody>
      </table>
    </div>
  </div>
</div>
