<script>
  import { blogStore } from "./blogstore.js";
  import { onMount } from "svelte";

  let post = { tags: [] };
  export let params;

  onMount(() => {
    blogStore.getPostBySlug(blog_name, params.slug).then(data => {
      console.log(`postBySlug ${data}`);
      post = JSON.parse(data);
    });
    //   .then(data => {
    //     console.log("IN HERE..", params);
    //     console.log(data);
    //     post = JSON.parse(data);
    //   })
    //   .catch(err => console.log(`err ${err}`));
  });
</script>

<div>
  in post
  <div>
    <span class="date">POST DATE</span>
    <div class="tag-list">
      {#each post.tags as tag, idx}
        <span class="tag-default tag-pill">
          <i class="ion-close-round" />
          {tag}
        </span>
      {/each}
    </div>

    <div class="article-item-title article-item-label content">
      <h1>
        <i>{post.title}</i>
      </h1>
      <hr />
    </div>
  </div>

  <div>
    <div>
      {@html post.content}
    </div>

  </div>

</div>
