<script>
  import { blogStore } from "./blogstore.js";
  import { onMount } from "svelte";
  import { link } from "svelte-spa-router";

  let post = { tags: [] };
  export let params;
  let mdtext = "";

  onMount(() => {
    blogStore.getPostBySlug(blog_name, params.slug).then(data => {
      console.log(`postBySlug ${data}`);
      post = data.data;
      let converter = new showdown.Converter({ metadata: true });
      converter.setFlavor("github");

      mdtext = converter.makeHtml(post.content);
    });
    //   .then(data => {
    //     console.log("IN HERE..", params);
    //     console.log(data);
    //     post = JSON.parse(data);
    //   })
    //   .catch(err => console.log(`err ${err}`));
  });
</script>

<article class="hentry h-entry">

  <footer class="post-info">
    <div class="tag-list">
      {#each post.tags as tag, idx}
        <span class="tag-default tag-pill">
          <i class="ion-close-round" />
          {tag}
        </span>
      {/each}
    </div>
  </footer>
  <!-- <div class="author">
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
    </div> -->

  <header>
    <h2 class="entry-title p-name">{post.title}</h2>
  </header>
  <div class="entry-content e-content">
    {@html mdtext}
  </div>
</article>
