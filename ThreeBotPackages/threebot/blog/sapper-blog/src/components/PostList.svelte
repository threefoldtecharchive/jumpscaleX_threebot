<script>
  import showdown from "showdown";
  export let posts = [];
  export let title = "";
  import { stores } from "@sapper/app";
  const { preloading, page, session } = stores();
  export let username = $page.params.theuser;
  import PostCard from "./PostCard.svelte";
</script>

<style>
  ul {
    margin: 0 0 1em 0;
    line-height: 1.5;
  }
</style>

<h1>{title}</h1>

<ul>
  {#each posts as post}
    <li>
      <PostCard {post} {username} />
    </li>
  {/each}
</ul>
