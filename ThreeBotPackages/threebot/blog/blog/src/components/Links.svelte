<script>
  import { blogStore } from "./blogstore.js";
  import { onMount } from "svelte";
  import { link } from "svelte-spa-router";

  export let params;
  export let links = [];
  export let title = "";
</script>

{#if links}
  <ul class="nav-list">
    <li class="nav-header">
      <h4>{title}</h4>
    </li>

    {#each links as link}
      <li>
        <a href={link.link}>{link.title}</a>
      </li>
    {/each}
  </ul>
{/if}
