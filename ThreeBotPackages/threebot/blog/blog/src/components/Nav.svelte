<script>
  import { link } from "svelte-spa-router";

  import { onMount } from "svelte";
  import { blogStore } from "./blogstore.js";
  import Tags from "./Tags.svelte";
  import PostCard from "./PostCard.svelte";
  import Links from "./Links.svelte";

  let blog_meta = { nav_links: [] };

  onMount(() => {
    blogStore.getMeta(blog_name).then(data => {
      blog_meta = data.data;
    });
  });
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
    {#each blog_meta.nav_links as link}
      <!-- content here -->
      <h1 class="title">
        <a href={link.link}>{link.title}</a>
      </h1>
    {/each}

  </div>
</header>
<!-- /#banner -->
