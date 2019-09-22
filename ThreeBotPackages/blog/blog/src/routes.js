import NotFound from './components/NotFound.svelte';
import BlogPostListByTag from './components/BlogPostListByTag.svelte';
import BlogPostList from './components/BlogPostList.svelte';

import Post from './components/Post.svelte';

// import NotFound from './routes/NotFound.svelte';

let routes
routes = new Map()
routes.set('/post/:slug', Post)
routes.set('/tag/:tag', BlogPostListByTag)
routes.set('/', BlogPostList)

// Catch-all, must be last
routes.set('*', NotFound)

export default routes