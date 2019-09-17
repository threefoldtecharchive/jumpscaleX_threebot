<script>
  import { link } from "svelte-spa-router";

  import { onMount } from "svelte";
  import { blogStore } from "./blogstore.js";
  import Tags from "./Tags.svelte";
  import PostCard from "./PostCard.svelte";
  import Links from "./Links.svelte";

  let posts = [];
  let tags = [];
  let links = [];
  let social_links = [];
  let blog_meta = {};
  export let params;
  export let tag = "";

  onMount(() => {
    blogStore.getMeta(blog_name).then(data => {
      blog_meta = data.data;
      links = blog_meta.sidebar_links;
      social_links = blog_meta.sidebar_social_links;
    });

    blogStore.getTags(blog_name).then(data => {
      tags = data.data;
    });
  });
</script>

<nav class="nav">
  {#if links}
    <Links title="LINKS" {links} />
  {/if}

  {#if social_links}
    <Links title="SOCIAL" links={social_links} />
  {/if}
</nav>

{#if tags}
  <Tags {tags} />
{/if}
