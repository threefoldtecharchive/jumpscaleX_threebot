<script>
  import showdown from "showdown";
  export let posts = [];
  export let title = "";
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
      <PostCard {post} />
    </li>
  {/each}
</ul>
