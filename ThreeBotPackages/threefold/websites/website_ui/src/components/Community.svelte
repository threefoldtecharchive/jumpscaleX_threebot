<script>
  import { onMount } from "svelte";
  import { api } from "./api.js";
  import Partner from "./Partner.svelte";
  export let partners = [];
  onMount(() => {
    api.getPartners().then(data => {
      partners = data;
      console.log("data..", data);
    });
  });
</script>

{#each partners as partner}
  <Partner {partner} />
{:else}no partners..{/each}
<div>COOMMUNITY page</div>
