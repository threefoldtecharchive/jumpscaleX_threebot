<script>
  import { stores } from "@sapper/app";
  const { preloading, page, session } = stores();
  export let username = $page.params.theuser;
  export let posts = [];
</script>

<header>
  <h3 class="h6">Latest Posts</h3>
</header>
{#each posts as post}
  <div class="blog-posts">
    <a rel="prefetch" href="blog/{username}/posts/{post.slug}">
      <div class="item d-flex align-items-center">
        <div class="image">
          <img src="img/small-thumbnail-1.jpg" alt="..." class="img-fluid" />
        </div>
        <div class="title">
          <strong>{post.title}</strong>
        </div>
      </div>
    </a>
  </div>
{/each}
