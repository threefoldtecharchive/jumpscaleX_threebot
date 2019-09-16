<script>
  import { blogStore } from "./blogstore.js";
  import { onMount } from "svelte";
  import { link } from "svelte-spa-router";

  export let params;
  export let links = [];
  onMount(() => {
    if (!links) {
      blogStore.getMeta(blog_name).then(data => {
        meta = JSON.parse(data);
        links = meta.links;
      });
    }
  });
</script>

{#if links}
  <ul class="nav-list">
    <li class="nav-header">
      <h4>Links</h4>
    </li>

    {#each links as link}
      <li>
        <a href={link}>{link}</a>
      </li>
    {/each}
  </ul>
{/if}
