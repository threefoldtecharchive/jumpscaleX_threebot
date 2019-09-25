<script context="module">
  export function preload({ host, path, params, query }) {
    console.log(host, path, params, query);
    const username = params.slug;
    return { username };
  }
</script>

<script>
  import showdown from "showdown";
  export let posts = [];
  export let title = "";
  export let username;
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
