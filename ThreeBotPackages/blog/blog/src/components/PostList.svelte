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
  let blog_meta = {};
  export let params;
  export let tag = "";

  onMount(() => {
    blogStore.getPosts(blog_name).then(data => {
      posts = JSON.parse(data);
      console.log("POSTS: ", posts);

      blogStore.getTags(blog_name).then(data => {
        console.log("received data for tags:", data);
        tags = JSON.parse(data);
        console.log("TAGS: ", tags);

        blogStore.getMeta(blog_name).then(data => {
          blog_meta = JSON.parse(data);
          links = blog_meta.links;
        });
      });
      console.log("TAGS: ", tags);
    });
  });
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
<section class="cold-md-9 pull-xs-left post-list">

  {#each posts as post}
    <PostCard {post} />
  {:else}
    <div class="row">
      <p>no posts yet..</p>
    </div>
  {/each}
  <div class="col-md-3 pull-xs-right">
    <div class="sidebar">
      {#if links}
        <Links {links} />
      {/if}
      {#if tags}
        <Tags {tags} />
      {/if}
    </div>

  </div>
</section>
