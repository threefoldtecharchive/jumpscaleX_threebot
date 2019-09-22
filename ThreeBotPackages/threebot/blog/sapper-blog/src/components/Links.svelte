<script>
  export let header = "";
  export let links = [];
</script>

{#if header}
  <h1>{header}</h1>
{/if}

{#if links}
  <ul>
    {#each links as link}
      <li>
        <a href={link.link}>{link.title}</a>
      </li>
    {/each}
  </ul>
{/if}
