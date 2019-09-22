<script>
  import { link } from "svelte-spa-router";

  import { onMount } from "svelte";
  import { blogStore } from "./blogstore.js";
  import Tags from "./Tags.svelte";
  import PostCard from "./PostCard.svelte";
  import Links from "./Links.svelte";

  let posts = [];
  let tags = [];
  let blog_meta = {};
  export let params = {};

  onMount(() => {
    console.log("params: ", params);
    if (params.tag === undefined) {
      blogStore.getPosts(blog_name).then(data => {
        console.log("get all posts..");
        posts = data.data;
        console.log("POSTS: ", posts);
      });
    } else {
      blogStore.getPostsByTag(blog_name, params.tag).then(data => {
        console.log("get by tag..");
        posts = data.data;
        console.log("POSTS: ", posts);
      });
    }
    blogStore.getTags(blog_name).then(data => {
      console.log("received data for tags:", data);
      tags = data.data;
      console.log("TAGS: ", tags);
    });
    blogStore.getMeta(blog_name).then(data => {
      blog_meta = data.data;
    });
  });
</script>

<style>
  ul {
    margin: 0 0 1em 0;
    line-height: 1.5;
  }
</style>

<section class="post-list">

  {#each posts as post}
    <PostCard {post} />
  {:else}
    <article class="hentry h-entry">
      <p>no posts yet..</p>
    </article>
  {/each}

</section>
