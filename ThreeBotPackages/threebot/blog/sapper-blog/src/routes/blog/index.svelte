<script context="module">
  export async function preload({ host, path, params, query }) {
    console.log("query", JSON.stringify(query));
    let resp = await this.fetch(`blog.json`);
    let pageNum = parseInt(query.page);
    // please notice it might be undefined
    // parseInt(undefined) > 0 -> false
    // parseInt(undefined) < 0 -> false
    // because.. javascript `\-()-/`

    if (pageNum > 0) {
      pageNum--;
    } else {
      pageNum = 0;
    }

    let allPosts = await resp.json();
    let totalPostsLength = allPosts.length;
    const metaResp = await this.fetch(`blog/metadata.json`);
    const metadata = await metaResp.json();

    let begin = pageNum * metadata.posts_per_page;
    let end = pageNum * metadata.posts_per_page + metadata.posts_per_page;
    let posts = allPosts.slice(begin, end);

    console.log(begin, end, posts.length);
    return { path, posts, totalPostsLength, metadata };
  }
</script>

<script>
  import PostList from "../../components/PostList.svelte";
  import ListPagination from "../../components/ListPagination.svelte";

  export let posts = [];
  export let metadata;
  export let totalPostsLength;
  export let path;
</script>

<svelte:head>
  <title>Blog</title>
</svelte:head>

{#await posts then value}
  <PostList title="Recent posts" posts={value} />
  <ListPagination
    articlesCount={totalPostsLength}
    articlesPerPage={metadata.posts_per_page}
    objectPath="/blog/" />

{/await}
