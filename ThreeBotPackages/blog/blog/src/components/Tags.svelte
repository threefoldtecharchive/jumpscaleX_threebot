<script>
  import { createEventDispatcher } from "svelte";
  import { link } from "svelte-spa-router";

  export let tags;
  const dispatch = createEventDispatcher();
</script>

{#if tags}
  <div className="tag-list">
    {#each tags as tag}
      <a
        href="/tag/{tag}"
        class="tag-default tag-pill"
        on:click={() => dispatch('select', { tag })}
        use:link>
        {tag}
      </a>
    {/each}
  </div>
{:else}
  <div>Loading Tags...</div>
{/if}
