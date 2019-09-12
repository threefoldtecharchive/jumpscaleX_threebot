import NotFound from './components/NotFound.svelte';
import PostList from './components/PostList.svelte';
import Post from './components/Post.svelte';

// import NotFound from './routes/NotFound.svelte';

let routes
routes = new Map()
routes.set('/post/:slug', Post)
routes.set('/tag/:tag', PostList)
routes.set('/', PostList)

// Catch-all, must be last
routes.set('*', NotFound)

export default routes