<script>
  import { formatDate, ansiUp } from "../routes/common";

  export let myAlert;
  export let levels;
</script>

<!--[Data-Listing]-->
<ul class="list-group">
  <li class="list-group-item">
    <b>ID :</b>
    <a href="/zerobot/alerta_ui/{myAlert.identifier}">{myAlert.identifier}</a>
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
</ul>
