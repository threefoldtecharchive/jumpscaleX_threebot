<script>
  import Nav from "./components/Nav.svelte";
  import Router from "svelte-spa-router";
  import routes from "./routes";
</script>

<div>
  <Nav />
</div>

<!--[Container]-->
<div class="container-fluid">
  <Router {routes} />

</div>
