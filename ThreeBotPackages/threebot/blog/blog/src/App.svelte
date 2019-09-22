<script>
  import Nav from "./components/Nav.svelte";
  import Sidebar from "./components/Sidebar.svelte";
  import Router from "svelte-spa-router";
  import routes from "./routes";
</script>

<div>
  <Nav />
</div>
<div class="wrapper content">

  <!--[Container]-->
  <div class="main">
    <!--[Title]-->
    <!-- Show the router -->
    <Router {routes} />

  </div>
  <Sidebar />
</div>
