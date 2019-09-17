<script>
  import { onMount } from "svelte";
  import { api } from "./api.js";
  onMount(() => {
    console.log("onmount comm");

    api.getPartners().then(data => {
      console.log("data..", data);
    });
  });
</script>

<div>COOMMUNITY page</div>
