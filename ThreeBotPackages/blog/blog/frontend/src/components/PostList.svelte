<script>
  import { onMount } from "svelte";
  import { blogStore } from "./blogstore.js";
  import Tags from "./Tags.svelte";
  export let params;
  $: blog_name = window.location.path.split("/")[1];
</script>

<style>
  ul {
    margin: 0 0 1em 0;
    line-height: 1.5;
  }
</style>

<svelte:head>
  <title>Blog main</title>

</svelte:head>

<div class="row">

  <div class="col-md-9 pull-xs-left">

    {#each $blogStore.getPosts() as post}
      <div class="row">
        <a rel="prefetch" href="blog/{post.slug}">
          <h1>{post.title}</h1>
        </a>

      </div>
    {:else}
      <div class="row">
        <p>no posts yet..</p>
      </div>
    {/each}

  </div>

  <div class="col-md-3 pull-xs-right">
    <div class="sidebar">
      <h2>Popular Tags</h2>
      <Tags tags={$blogStore.getTags()} />
    </div>
  </div>
</div>
