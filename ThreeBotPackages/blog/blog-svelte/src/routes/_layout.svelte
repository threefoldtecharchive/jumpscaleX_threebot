<script>
  import Nav from "../components/Nav.svelte";

  export let segment;
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

<Nav {segment} />

<main>
  <slot />
</main>

<svelte:head>
  <script src="https://unpkg.com/browse/moment@2.24.0/">

  </script>
  <script src="/static/weblibs/gedis/gedis_client.js">

  </script>
  <script src="https://code.jquery.com/jquery-1.12.4.min.js">

  </script>
  <script
    src="https://cdn.jsdelivr.net/npm/showdown@latest/dist/showdown.min.js">

  </script>
</svelte:head>
