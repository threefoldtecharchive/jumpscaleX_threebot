<script>
  import showdown from "showdown";
  export let post;
  import { stores } from "@sapper/app";
  const { preloading, page, session } = stores();
  export let username = $page.params.theuser;
  let converter = new showdown.Converter({ metadata: true });
  converter.setFlavor("github");
  let mdtext = converter.makeHtml(post.content);
  //   import { fly } from "svelte/transition";
</script>

<!-- <div in:fly={{ x: -60, duration: 100 }} class="post-card-title">
 -->
<div class="post-card-title">

  <a rel="prefetch" href="blog/{username}/posts/{post.slug}">{post.title}</a>
</div>
<!-- <div class="post-card-content">
    {@html mdtext.slice(0, 500)}
  </div> -->
