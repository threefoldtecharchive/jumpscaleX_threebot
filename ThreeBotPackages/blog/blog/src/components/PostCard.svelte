<script>
  import { link } from "svelte-spa-router";

  export let post = { tags: [] };
  let post_link = `/post/${post.slug}`;
  console.log(`post link ${post_link}`);
</script>

<article class="hentry h-entry">
  <header>
    <h2 class="entry-title p-name">
      <a rel="bookmark" href={post_link} use:link>{post.title}</a>
    </h2>
  </header>

  <!-- /.entry-content -->
  <footer class="post-info">
    <div class="tag-list">
      {#each post.tags as tag, idx}
        <span class="tag-default tag-pill">
          <i class="ion-close-round" />
          {tag}
        </span>
      {/each}
    </div>

    <div class="author">author info goes here..</div>
  </footer>
  <!-- /.post-info -->
</article>
