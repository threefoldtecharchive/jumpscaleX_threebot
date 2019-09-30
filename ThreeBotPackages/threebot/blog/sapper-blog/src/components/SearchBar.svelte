<script>
  import axios from "axios";
  import blogName from "./Header.svelte";
  axios.defaults.headers.post["Content-Type"] = "application/json";

  let query = "";
  let search_res = "";
  const BLOG_API = "/actors/blog";
  function search(e) {
    if (!query) {
      alert("empty search !");
    }
    e.preventDefault();
    res = axios.post(`${BLOG_API}/search`, {
      args: {
        blog: blogName,
        query: query
      }
    });
    return search_res;
  }
</script>

<div class="col-sm-3 col-md-3 pull-right">
  <form class="navbar-form form-inline" role="search" on:submit={search}>
    <!-- <i class="fas fa-search" aria-hidden="true" /> -->
    <input
      class="form-control"
      type="text"
      bind:value={query}
      placeholder="Search"
      aria-label="Search" />
    <!-- <button>Search</button> -->
  </form>
</div>

{#if search_res}
  <ul>
    {#each search_res as res}
      <li>
        <p>Search Result</p>
        <a href="blog/{res.slug}">Type: {res.type}</a>
      </li>
    {/each}
  </ul>
{/if}
