<script>
  import { link } from "svelte-spa-router";
  import { onMount } from "svelte";
  import { blogStore } from "./blogstore.js";
  import Tags from "./Tags.svelte";
  import PostList from "./PostList.svelte";

  let posts = [];
  export let params = {};

  onMount(() => {
    blogStore.getPostsByTag(blog_name, params.tag).then(data => {
      console.log("get by tag..");
      posts = data.data;
      console.log("POSTS: ", posts);
    });
  });
</script>

<PostList {posts} />
