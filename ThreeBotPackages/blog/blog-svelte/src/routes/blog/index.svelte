<script context="module">
  export function preload({ params, query }) {}
</script>

<script>
  import { onMount } from "svelte";
  import { gunStore } from "./gunstore.js";
  import Tags from "../../components/Tags.svelte";
  export let params;

  //   function getArticles() {
  //     let res = [];
  //     var gun = Gun("ws://127.0.0.1:8000/gun");
  //     // let gun = Gun();

  //     gun
  //       .get("wiki://1")
  //       .map()
  //       .on((v, k) => {
  //         if (v.title !== undefined && v.slug !== undefined) {
  //           res.push({
  //             slug: v.slug,
  //             title: v.title,
  //             content: v.content,
  //             likes: v.likes || 0,
  //             author: {}
  //           });
  //         }
  //       });
  //     return res;
  //   }
  //
</script>

<style>
  ul {
    margin: 0 0 1em 0;
    line-height: 1.5;
  }
</style>

<svelte:head>
  <title>Wiki main</title>

</svelte:head>

<div class="row">

  <div class="col-md-9 pull-xs-left">

    {#each $gunStore.getAllArticles(1) as article}
      <!-- we're using the non-standard `rel=prefetch` attribute to
				tell Sapper to load the data for the page as soon as
				the user hovers over the link or taps it, instead of
				waiting for the 'click' event -->
      <div class="row">
        <a rel="prefetch" href="wiki/{article.slug}">
          <h1>{article.title}</h1>
        </a>
        <div class="col-md-3 pull-xs-right">
          <button class="btn btn-sm btn-outline-primary">
            <i class="ion-heart" />
            {article.likes}
          </button>
        </div>

      </div>
    {:else}
      <div class="row">
        <p>no articles yet..</p>
      </div>
    {/each}

  </div>

  <div class="col-md-3 pull-xs-right">
    <div class="sidebar">
      <h2>Popular Tags</h2>
      <Tags tags={$gunStore.getAllTags(1)} />
    </div>
  </div>
</div>
