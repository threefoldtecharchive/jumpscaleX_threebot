<script>
  import { formatDate, ansiUp } from "../routes/common";

  export let myAlert;
  export let levels;
</script>

<!--[Data-Listing]-->
<ul class="list-group">
  <li class="list-group-item">
    <b>ID :</b>
    <a href="/zerobot/alerta/{myAlert.identifier}">{myAlert.identifier}</a>
  </li>
  <li class="list-group-item">
    <b>Type :</b>
    {myAlert.alert_type}
  </li>
  <li class="list-group-item">
    <b>Status :</b>
    {myAlert.status}
  </li>
  <li class="list-group-item">
    <b>App name :</b>
    {myAlert.appname}
  </li>
  <li class="list-group-item">
    <b>Level :</b>
    {levels[myAlert.level]}
  </li>
  <li class="list-group-item">
    <b>Count :</b>
    {myAlert.count}
  </li>
  <li class="list-group-item">
    <b>Category :</b>
    {myAlert.cat}
  </li>
  <li class="list-group-item">
    <b>First time :</b>
    {myAlert.time_first}
  </li>
  <li class="list-group-item">
    <b>Last time :</b>
    {myAlert.time_last}
  </li>
  <li class="list-group-item">
    <b>Message :</b>
    {@html ansiUp.ansi_to_html(myAlert.message)}
  </li>
  <li class="list-group-item">
    <b>Message (Public) :</b>
    {myAlert.message_pub}
  </li>
  <li class="list-group-item">
    <b>Tracebacks :</b>
  </li>
</ul>

{#if myAlert.tracebacks.length}
  <ul class="nav nav-tabs">
    {#each myAlert.tracebacks as tb, i}
      <li class="nav-item">
        <a
          class="nav-link {i == 0 ? 'active' : ''}"
          role="tab"
          data-toggle="tab"
          href="#{tb.process_id}_{tb.threebot_name}">
          {tb.threebot_name} - PID: ({tb.process_id})
        </a>
      </li>
    {/each}
  </ul>

  <div class="tab-content">
    {#each myAlert.tracebacks as tb, i}
      <div
        role="tabpanel"
        class="tab-pane {i == 0 ? 'active' : ''}"
        id="{tb.process_id}_{tb.threebot_name}"
        style="white-space: pre-wrap;">
        <p>
          {@html ansiUp.ansi_to_html(tb.formatted)}
        </p>
      </div>
    {/each}
  </div>
{/if}
