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
      posts = data.data;
      console.log("POSTS: ", posts);

      console.log("TAGS: ", tags);
    });
    blogStore.getTags(blog_name).then(data => {
      console.log("received data for tags:", data);
      tags = data.data;
      console.log("TAGS: ", tags);
    });
    blogStore.getMeta(blog_name).then(data => {
      blog_meta = data.data;
      links = blog_meta.links;
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
<section class="post-list">

  {#each posts as post}
    <PostCard {post} />
  {:else}
    <article class="hentry h-entry">
      <p>no posts yet..</p>
    </article>
  {/each}

</section>
