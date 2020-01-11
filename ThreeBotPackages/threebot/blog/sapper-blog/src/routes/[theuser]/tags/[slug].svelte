<script context="module">
import {
    getPosts
} from "../../_api"

  export async function preload({ params }) {
    let slug = params.slug;
    let allPosts = await getPosts(params.theuser);

    const lookup = new Map()
    allPosts.forEach(post => {
        post.tags.forEach(tag => {
            if (lookup.has(tag)) {
                lookup.set(tag, [...lookup.get(tag), post])
            } else {
                lookup.set(tag, [post])
            }
        })
    });

    let posts = lookup.get(slug);
    return {posts, tag: params.slug}
  }
</script>

<script>
  import PostList from "../../../components/PostList.svelte";
  export let posts = [];
  export let tag = "";
</script>

<svelte:head>
  <title>Blog</title>
</svelte:head>

{#await posts}
  Loading
{:then value}
  <PostList title="Posts with tag {tag}" posts={value} />
{/await}
