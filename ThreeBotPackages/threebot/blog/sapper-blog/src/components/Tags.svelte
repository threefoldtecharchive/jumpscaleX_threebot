<script>
  export let tags;
</script>

<span>
  {#each tags as tag}
    <a href="blog/tag/{tag.trim()}">{tag}</a>
  {/each}
</span>
