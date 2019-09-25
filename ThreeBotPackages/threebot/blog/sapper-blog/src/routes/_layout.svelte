<script context="module">
  export async function preload({ host, path, params, query }) {
    console.log(host, path, params, query);
    try {
      const pagesResp = await this.fetch(`blog/${params.username}/pages.json`);
      const pages = await pagesResp.json();

      const metaResp = await this.fetch(
        `blog/${params.username}/metadata.json`
      );
      const metadata = await metaResp.json();

      const tagsResp = await this.fetch(`blog/${params.username}/tags.json`);
      const tags = await tagsResp.json();
      const username = params.username;
      return { pages, metadata, tags, username };
    } catch (error) {
      console.log(error);
    }
  }
</script>

<script>
  import Nav from "../components/Nav.svelte";
  import Sidebar from "../components/Sidebar.svelte";
  import Footer from "../components/Footer.svelte";
  import Header from "../components/Header.svelte";

  export let segment;
  export let pages = [];
  export let metadata = {};
  export let tags = [];
  export let username;
</script>

<style>
  main {
    position: relative;
    max-width: 56em;
    background-color: white;
    padding: 2em;
    margin: 0 auto;
    box-sizing: border-box;
  }
</style>

{#await metadata then value}
  <Header
    blogName={value.blog_name}
    blogDescription={value.blog_description}
    blogLogo={value.blog_logo}
    authorName={value.authorName} />
{/await}

{#await pages}
  loading
{:then value}
  <Nav {segment} pages={value} />
{/await}

<div class="container container-left">

  <div class="row">
    <div class="col-md-3 hidden-xs">
      <Sidebar {metadata} />
    </div>

    <div class="col-md-9">
      <main>
        <slot />
      </main>
    </div>
  </div>
  <Footer />
</div>
