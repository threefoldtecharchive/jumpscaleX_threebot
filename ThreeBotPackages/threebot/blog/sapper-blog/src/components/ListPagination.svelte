<script>
  export let articlesCount;
  export let page;
  export let articlesPerPage;
  export let objectPath;

  let range;
  $: {
    range = [];
    for (let i = 0; i < Math.ceil(articlesCount / articlesPerPage); ++i) {
      range.push(i);
    }
    console.log();
  }
</script>

{#if articlesCount >= articlesPerPage}
  <nav>
    <ul class="pagination">

      {#each range as v}
        <li class="page-item {v === page ? 'active' : ''}">
          <a class="page-link" href="{objectPath}?page={v + 1}">{v + 1}</a>
        </li>
      {/each}
    </ul>
  </nav>
{/if}
