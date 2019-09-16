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
  here
  <footer class="post-info">
    <div class="tag-list">
      {#each post.tags as tag, idx}
        <span class="tag-default tag-pill">
          <i class="ion-close-round" />
          {tag}
        </span>
      {/each}
    </div>
    <div class="author">
      <div style="display: inline; max-width: 450px">
        <span class="article-by">Written by</span>
        <a class="url fn" href="https://blog.taiga.io/author/taiga-team.html">
          <span class="article-author p-author">Taiga Team</span>
        </a>
        <abbr class="published" title="2019-04-24T09:00:00+02:00">
          on
          <time class="dt-published" datetime="2019-04-24T09:00:00+02:00">
            Wed 24 April 2019
          </time>
        </abbr>
      </div>
      <a class="gravatar" href="https://blog.taiga.io/author/taiga-team.html">
        <img
          src="https://www.gravatar.com/avatar/5288feba63b137c766fabd9f03f420db"
          alt="" />
      </a>
    </div>
  </footer>
  <!-- /.post-info -->
</article>
