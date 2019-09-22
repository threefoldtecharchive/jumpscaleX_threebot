<script>
  import { onMount } from "svelte";
  import { blogStore } from "./blogstore.js";
  import PostList from "./PostList.svelte";

  let posts = [];

  onMount(() => {
    blogStore.getPosts(blog_name).then(data => {
      console.log("get all posts..");
      posts = data.data;
      console.log("POSTS: ", posts);
    });
  });
</script>

<PostList {posts} />
