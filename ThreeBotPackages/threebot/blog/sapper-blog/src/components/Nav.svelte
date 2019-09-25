<script context="module">
  export function preload({ host, path, params, query }) {
    console.log(host, path, params, query);
    const username = params.slug;
    console.log("username: ", username);
    return { username };
  }
</script>

<script>
  export let segment;
  export let pages;
  let username;
  import SearchBar from "./SearchBar.svelte";
</script>

<style>
  nav {
    border-bottom: 1px solid rgba(255, 62, 0, 0.1);
    font-weight: 300;
    padding: 0 1em;
  }

  ul {
    margin: 0;
    padding: 0;
  }

  /* clearfix */
  ul::after {
    content: "";
    display: block;
    clear: both;
  }

  li {
    display: block;
    float: left;
  }

  .selected {
    position: relative;
    display: inline-block;
  }

  .selected::after {
    position: absolute;
    content: "";
    width: calc(100% - 1em);
    height: 2px;
    background-color: rgb(255, 62, 0);
    display: block;
    bottom: -1px;
  }

  a {
    text-decoration: none;
    padding: 1em 0.5em;
    display: block;
  }
</style>

<div class="container-fluid">
  <div class="row-fluid">
    <div class="navbar navbar-inverse navbar-fixed-top" role="navigation">
      <nav>
        <ul>
          <!-- <li>
      <a class={segment === undefined ? 'selected' : ''} href=".">home</a>
    </li> -->
          <!-- for the blog link, we're using rel=prefetch so that Sapper prefetches
		     the blog data when we hover over the link or tap it on a touchscreen -->
          <li>
            <a
              rel="prefetch"
              class={segment === undefined ? 'selected' : ''}
              href="{username}/blog">
              blog
            </a>
          </li>
          {#each pages as page}
            <li>
              <a
                rel="prefetch"
                class={segment === page.slug ? 'selected' : ''}
                href="{username}/blog/pages/{page.slug}">
                {page.title}
              </a>
            </li>
          {/each}
          <li>
            <a
              class={segment === 'tags' ? 'selected' : ''}
              href="{username}/blog/tags/">
              Tags
            </a>

          </li>
          <li>
            <SearchBar />
          </li>
        </ul>
      </nav>

    </div>
  </div>
</div>
