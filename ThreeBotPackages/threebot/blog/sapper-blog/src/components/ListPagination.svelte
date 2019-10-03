<script>
  export let articlesCount;
  export let page;
  export let articlesPerPage;
  export let objectPath;

  export let posts = [];
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
  <nav aria-label="Page navigation example">
    <ul class="pagination pagination-template d-flex justify-content-center">
      {#each range as v}
        <li class="page-item {v === page ? 'active' : ''}">
          <a href="{objectPath}?page={v + 1}" class="page-link">
            <i class="fa fa-angle-left" />
            {v + 1}
          </a>
        </li>
      {/each}
    </ul>
  </nav>
{/if}
