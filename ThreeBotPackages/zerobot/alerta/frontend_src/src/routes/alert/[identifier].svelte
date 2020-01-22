<script context="module">
  // the (optional) preload function takes a
  // `{ path, params, query }` object and turns it into
  // the data we need to render the page
  export async function preload(page, session) {
    // the `slug` parameter is available because this file
    // is called [slug].svelte
    const { identifier } = page.params;
    return { identifier };
  }
</script>

<script>
  import AlertDetails from "../../components/AlertDetails.svelte";
  import Spinner from "../../components/Spinner.svelte";
  import levels from "../../components/Alerts.svelte";
  import { getAlert } from "../data";
  import { onMount } from "svelte";

  export let identifier;
  export let myAlert;

  onMount(async () => {
    getAlert(identifier).then(resp => {
      myAlert = resp.data;
    });
  });
</script>

{#if myAlert}
  {#if myAlert.identifier}
    <AlertDetails {myAlert} {levels} />
  {:else}Alert of {identifier} cannot be found{/if}
{:else}
  <Spinner />
{/if}
