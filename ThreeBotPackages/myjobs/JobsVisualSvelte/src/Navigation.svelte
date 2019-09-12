<script>
  import active from "svelte-spa-router/active";
  import {
    link,
    push,
    pop,
    replace,
    location,
    querystring
  } from "svelte-spa-router";
</script>

<style>
  /* Style for "active" links; need to mark this :global because the router adds the class directly */
  :global(a.my-active) {
    color: #9d9d9d !important;
  }
</style>

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
