<script context="module">
  export async function preload({ params }) {
    try {
      const pagesResp = await this.fetch(`blog/pages.json`);
      const pages = await pagesResp.json();

      const metaResp = await this.fetch(`blog/metadata.json`);
      const metadata = await metaResp.json();

      const tagsResp = await this.fetch(`blog/tags.json`);
      const tags = await tagsResp.json();
      return { pages, metadata, tags };
    } catch (error) {
      console.log(error);
    }
  }
</script>

<script>
  import Nav from "../components/Nav.svelte";
  import Sidebar from "../components/Sidebar.svelte";
  import Footer from "../components/Footer.svelte";

  export let segment;
  export let pages = [];
  export let metadata = {};
  export let tags = [];
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
  </div>

  <div class="col-md-9">
    <main>
      <slot />
    </main>
  </div>
  <Footer />
</div>
