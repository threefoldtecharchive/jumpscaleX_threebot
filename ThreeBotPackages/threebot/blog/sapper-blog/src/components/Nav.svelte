<script>
  import { stores } from "@sapper/app";
  const { preloading, page, session } = stores();
  export let username = $page.params.theuser;

  $: currentuser = $page.params.theuser;
  export let segment;
  export let pages = [];
  import SearchBar from "./SearchBar.svelte";
</script>

<header class="header">
  <!-- Main Navbar-->
  <nav class="navbar navbar-expand-lg">

    <div class="container">
      <!-- Navbar Brand -->
      <div
        class="navbar-header d-flex align-items-center justify-content-between">
        <!-- Navbar Brand -->
        <a href="blog/" rel="prefetch" class="navbar-brand">Blog</a>
        <!-- Toggle Button-->
        <button
          type="button"
          data-toggle="collapse"
          data-target="#navbarcollapse"
          aria-controls="navbarcollapse"
          aria-expanded="false"
          aria-label="Toggle navigation"
          class="navbar-toggler">
          <span />
          <span />
          <span />
        </button>
      </div>
      <!-- Navbar Menu -->
      <div id="navbarcollapse" class="collapse navbar-collapse">
        <ul class="navbar-nav ml-auto">
          {#if currentuser}
            <li class="nav-item">
              <a
                href="blog/{currentuser}/posts"
                rel="prefetch"
                class={segment === undefined ? 'nav-link active' : 'nav-link'}>
                {currentuser}
              </a>
            </li>
            {#each pages as page}
              <li class="nav-item">
                <a
                  rel="prefetch"
                  href="blog/{currentuser}/pages/{page.slug}"
                  class={segment === undefined ? 'nav-link active' : 'nav-link'}>
                  {page.title}
                </a>
              </li>
            {/each}
            <li class="nav-item">
              <a
                href="blog/{currentuser}/tags/"
                class={segment === undefined ? 'nav-link active' : 'nav-link'}>
                Tags
              </a>
            </li>
          {/if}
        </ul>
        <SearchBar />
      </div>
    </div>
  </nav>
</header>
