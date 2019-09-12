<script>
  // import active from 'svelte-spa-router/active';
  // import {
  // 	link,
  // 	push,
  // 	pop,
  // 	replace,
  // 	location,
  // 	querystring,
  // } from 'svelte-spa-router';
</script>

<style>
  /* Style for "active" links; need to mark this :global because the router adds the class directly */
  :global(a.my-active) {
    color: #9d9d9d !important;
  }
</style>

<header id="banner" class="header">
  <div class="bg" />
  <div class="wrapper">
    <a class="logo" href="https://blog.taiga.io/">
      <img
        class="logo"
        src="https://blog.taiga.io/theme/images/logo-color.png"
        alt="Taiga" />
    </a>
    <h1 class="title">
      <a href="https://blog.taiga.io/">TF Blog Blog</a>
    </h1>
  </div>
</header>
<!-- /#banner -->
