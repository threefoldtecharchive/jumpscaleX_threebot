<script>
  export let header = "";
  export let links = [];
</script>

{#if links}
  <ul>
    {#each links as link}
      <li>

        {#if link.img}
          <a href={link.link}>
            <img src={link.img} alt={link.img} style="height: 50px;width: 50px;">
          </a>
        {:else}
          <a href={link.link}>{link.title}</a>
          <!-- else content here -->
        {/if}
      </li>
    {/each}
  </ul>
{/if}
