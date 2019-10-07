<script>
  import showdown from "showdown";
  import Tags from "./Tags.svelte";
  export let post;
  import { stores } from "@sapper/app";
  const { preloading, page, session } = stores();
  export let username = $page.params.theuser;
  let converter = new showdown.Converter({ metadata: true });
  converter.setFlavor("github");
  let mdtext = converter.makeHtml(post.content);
</script>

<!-- Latest Posts -->
<main class="post blog-post col-lg-12">
  <div class="container">
    <div class="post-single">
      <div class="post-thumbnail">
        <img src="img/blog-post-3.jpeg" alt="..." class="img-fluid" />
      </div>
      <div class="post-details">
        <div class="post-meta d-flex justify-content-between">
          <div class="category">
            <Tags tags={post.tags} />
          </div>
        </div>
        <h1>{post.title}</h1>
        <div
          class="post-footer d-flex align-items-center flex-column flex-sm-row">
          <a href="#" class="author d-flex align-items-center flex-wrap">
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
          <div class="d-flex align-items-center flex-wrap">
            <div class="date">
              <i class="icon-clock" />
              {post.published_at}
            </div>
          </div>
        </div>
        <div class="post-body">
          <p>
            {@html mdtext}
          </p>

        </div>
        <div class="post-tags">
          <Tags tags={post.tags} />

        </div>
        <div
          class="posts-nav d-flex justify-content-between align-items-stretch
          flex-column flex-md-row">
          <a href="#" class="prev-post text-left d-flex align-items-center">
            <div class="icon prev">
              <i class="fa fa-angle-left" />
            </div>
            <div class="text">
              <strong class="text-primary">Previous Post</strong>
              <h6>I Bought a Wedding Dress.</h6>
            </div>
          </a>
          <a
            href="#"
            class="next-post text-right d-flex align-items-center
            justify-content-end">
            <div class="text">
              <strong class="text-primary">Next Post</strong>
              <h6>I Bought a Wedding Dress.</h6>
            </div>
            <div class="icon next">
              <i class="fa fa-angle-right" />
            </div>
          </a>
        </div>
      </div>
    </div>
  </div>
</main>
