<script>
  import BlogCard from "./BlogCard.svelte";
  export let blogs = [];
</script>

<style>
  ul {
    margin: 0 0 1em 0;
    line-height: 1.5;
  }
</style>

<h1>Blogs</h1>

<ul>
  {#each blogs as blogName}
    <li>
      <BlogCard {blogName} />
    </li>
  {/each}
</ul>
