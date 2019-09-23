<script>
  import Links from "./Links.svelte";
  export let metadata = {};
</script>

<div class="container">
  <Links header="Links" links={metadata.sidebar_links} />
  <Links header="Social" links={metadata.sidebar_social_links} />

</div>
