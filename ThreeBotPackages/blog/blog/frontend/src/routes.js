import OriginalCode from './components/OriginalCode.svelte';
import SharedCode from './components/SharedCode.svelte';
import NotFound from './components/NotFound.svelte';

// import NotFound from './routes/NotFound.svelte';

let routes
routes = new Map()
routes.set('/blog/', Blogposts)
routes.set('/blog/:postId', Post)

// Catch-all, must be last
routes.set('*', NotFound)

export default routes