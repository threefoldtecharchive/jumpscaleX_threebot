<script>
  import showdown from "showdown";
  import Tags from "./Tags.svelte";
  import { excerptOf } from "../_helper.js";
  export let post;
  import { stores } from "@sapper/app";
  const { preloading, page, session } = stores();
  export let username = $page.params.theuser;
  let converter = new showdown.Converter({ metadata: true });
  converter.setFlavor("github");
  let mdtext = converter.makeHtml(post.content);
  export let showExcerpt = true;
  //   let summary = mdtext
  //     .split("\n")
  //     .splice(1)
  //     .join("\n")
  //     .slice(0, 300);

  let summary = excerptOf(mdtext);
  //   import { fly } from "svelte/transition";
</script>

<div class="post col-xl-6">
  <div class="post-thumbnail">
    <a rel="prefetch" href="blog/{username}/posts/{post.slug}">
      <img src="img/blog-post-1.jpeg" alt="..." class="img-fluid" />
    </a>
  </div>
  <div class="post-details">
    <div class="post-meta d-flex justify-content-between">
      <!-- Change date format -->
      <div class="date meta-last">{post.published_at}</div>
      {#if post.tags.length}
        <div class="category">
          <Tags tags={post.tags} />
        </div>
      {/if}
    </div>
    <a rel="prefetch" href="blog/{username}/posts/{post.slug}">
      <h3 class="h4">{post.title}</h3>
    </a>
    {#if showExcerpt}
      <p class="text-muted">
        {@html summary}
      </p>
    {/if}

    <footer class="post-footer d-flex align-items-center">
      <a
        href="blog/{username}/posts/{post.slug}"
        class="author d-flex align-items-center flex-wrap">
        <div class="avatar">
          <img
            src="/blog/blog_{username}/assets/me.jpg"
            onerror="this.src='me.jpg'"
            alt="..."
            class="img-fluid" />
        </div>
        <div class="title">
          <span>{post.author_name}</span>
        </div>
      </a>
    </footer>
  </div>
</div>
