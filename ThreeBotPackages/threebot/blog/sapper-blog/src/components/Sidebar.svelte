<script>
  import Links from "./Links.svelte";
  export let metadata = {};
</script>

<Links header="Links" links={metadata.sidebar_links} />
<Links header="Social" links={metadata.sidebar_social_links} />
