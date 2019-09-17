<script>
  import { onMount } from "svelte";
  import { api } from "./api.js";
  let posts = [];
  onMount(() => {
    console.log("onmount team");
    api.getMembers().then(data => {
      console.log("data..", data);
    });
  });
</script>

<div>TEAM page</div>
