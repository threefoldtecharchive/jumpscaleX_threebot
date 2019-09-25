<script>
  import showdown from "showdown";
  export let post;
  export let username;
  let converter = new showdown.Converter({ metadata: true });
  converter.setFlavor("github");
  let mdtext = converter.makeHtml(post.content);
</script>

<div class="post-card-title">
  <a rel="prefetch" href="{username}/blog/{post.slug}">{post.title}</a>
</div>
<!-- <div class="post-card-content">
    {@html mdtext.slice(0, 500)}
  </div> -->
