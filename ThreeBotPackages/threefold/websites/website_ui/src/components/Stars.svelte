<script>
  import Star from "./Star.svelte";
  export let count = 5;

  $: starsArr = new Array(count);
</script>

{#if count > 0}
  <div class="stars">
    {#each starsArr as item}
      <Star />
    {/each}
  </div>
{/if}
