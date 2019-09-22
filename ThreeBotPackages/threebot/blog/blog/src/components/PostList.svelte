<script>
  import PostCard from "./PostCard.svelte";

  export let posts = [];
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
