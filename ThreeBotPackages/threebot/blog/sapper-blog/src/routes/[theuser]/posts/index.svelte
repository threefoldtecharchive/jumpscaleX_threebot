<script context="module">
  import axios from "axios";
  import PostList from "../../../components/PostList.svelte";
  import ListPagination from "../../../components/ListPagination.svelte";

  axios.defaults.headers.post["Content-Type"] = "application/json";

  export let posts = [];
  export let metadata = {};
  export let totalPostsLength;
  export let page_path;
  export let username;
  export let pageNum;

  const BLOG_API = "/web/gedis/http/blog";
  export async function callActorWithArgs(actorCmd, actorArgs) {
    let p = () =>
      axios.post(`${BLOG_API}/${actorCmd}`, {
        args: actorArgs
      });

    let resp = await p();
    return new Promise((resolve, reject) => resolve(resp.data));
  }

  export async function preload({ host, path, params, query }) {
    console.log("params in posts index", JSON.stringify(params));
    let blogName = params.theuser;
    username = blogName;

    let pageNum = parseInt(query.page) || 0;
    // if (!pageNum) {
    //   this.redirect(302, `${params.theuser}/posts?page=1`);
    // }
    // please notice it might be undefined
    // parseInt(undefined) > 0 -> false
    // parseInt(undefined) < 0 -> false
    // because.. javascript `\-()-/`

    if (pageNum > 0) {
      pageNum--;
    }

    let allPosts = await callActorWithArgs("get_posts", {
      blog_name: blogName
    });

    console.log(allPosts.length);
    // console.log("parsed blogs ", allPosts);
    totalPostsLength = allPosts.length;
    metadata = await callActorWithArgs("get_metadata", {
      blog_name: blogName
    });
    let per_page = metadata.posts_per_page || 5;
    let begin = pageNum * per_page;
    let end = pageNum * per_page + per_page;

    posts = allPosts.slice(begin, end);
    page_path = `/blog${path}`;
    return { page_path, posts, totalPostsLength, metadata };
  }
</script>

<svelte:head>
  <title>Blog</title>
</svelte:head>

{#await posts then value}
  <PostList posts={value} {username} />
  <ListPagination
    articlesCount={totalPostsLength}
    articlesPerPage={metadata.posts_per_page}
    objectPath={page_path}
    page={pageNum} />

{/await}
