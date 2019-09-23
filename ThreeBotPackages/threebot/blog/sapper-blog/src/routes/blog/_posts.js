// Ordinarily, you'd generate this data from markdown files in your
// repo, or fetch them from a database of some kind. But in order to
// avoid unnecessary dependencies in the starter template, and in the
// service of obviousness, we're just going to leave it here.

// This file is called `_posts.js` rather than `posts.js`, because
// we don't want to create an `/blog/posts` route — the leading
// underscore tells Sapper not to do that.

const posts = [{
    "title": "My Hello World",
    "slug": "hello-world",
    "content": "hiiiii what's up? ok```for i in range(50):    print(\"hello world\")```",
    "content_with_meta": "---\ntags: python, markdown\ntitle: My Hello World\n---\n\nhiiiii what's up? ok\n\n\n\n```\n\nfor i in range(50):\n    print(\"hello world\")\n\n```",
    "tags": ["python", "markdown"],
    "published_at": "",
    "id": 6
}, {
    "title": "Post 1",
    "slug": "post-1",
    "content": "# post 1post 1hello world```pythonfor i in range(50):    print(\"post 1 world\")```",
    "content_with_meta": "---\ntags: lame, markdown\ntitle: Post 1\n---\n# post 1\n\npost 1\n\nhello world\n\n```python\n\nfor i in range(50):\n    print(\"post 1 world\")\n\n```",
    "tags": ["lame", "markdown"],
    "published_at": "",
    "id": 7
}, {
    "title": "Post 2",
    "slug": "post-2",
    "content": "# post 2post 2hello world```pythonfor i in range(50):    print(\"post 2 world\")```",
    "content_with_meta": "---\ntags: java, markdown\ntitle: Post 2\n---\n# post 2\n\npost 2\n\n\nhello world\n\n```python\n\nfor i in range(50):\n    print(\"post 2 world\")\n\n```",
    "tags": ["java", "markdown"],
    "published_at": "",
    "id": 8
}, {
    "title": "Bye bye",
    "slug": "bye-bye-world",
    "content": "# bye byeGood bye cruel world.hello world```pythonfor i in range(50):    print(\"bye world\")```",
    "content_with_meta": "---\ntags: python, markdown\ntitle: Bye bye\n---\n# bye bye\n\nGood bye cruel world.\n\n\nhello world\n\n```python\n\nfor i in range(50):\n    print(\"bye world\")\n\n```",
    "tags": ["python", "markdown"],
    "published_at": "",
    "id": 9
}, {
    "title": "My Hello World",
    "slug": "hello-world",
    "content": "hiiiii what's up? ok```for i in range(50):    print(\"hello world\")```",
    "content_with_meta": "---\ntags: python, markdown\ntitle: My Hello World\n---\n\nhiiiii what's up? ok\n\n\n\n```\n\nfor i in range(50):\n    print(\"hello world\")\n\n```",
    "tags": ["python", "markdown"],
    "published_at": "",
    "id": 1
}, {
    "title": "Post 1",
    "slug": "post-1",
    "content": "# post 1post 1hello world```pythonfor i in range(50):    print(\"post 1 world\")```",
    "content_with_meta": "---\ntags: lame, markdown\ntitle: Post 1\n---\n# post 1\n\npost 1\n\nhello world\n\n```python\n\nfor i in range(50):\n    print(\"post 1 world\")\n\n```",
    "tags": ["lame", "markdown"],
    "published_at": "",
    "id": 2
}, {
    "title": "Post 2",
    "slug": "post-2",
    "content": "# post 2post 2hello world```pythonfor i in range(50):    print(\"post 2 world\")```",
    "content_with_meta": "---\ntags: java, markdown\ntitle: Post 2\n---\n# post 2\n\npost 2\n\n\nhello world\n\n```python\n\nfor i in range(50):\n    print(\"post 2 world\")\n\n```",
    "tags": ["java", "markdown"],
    "published_at": "",
    "id": 3
}, {
    "title": "Bye bye",
    "slug": "bye-bye-world",
    "content": "# bye byeGood bye cruel world.hello world```pythonfor i in range(50):    print(\"bye world\")```",
    "content_with_meta": "---\ntags: python, markdown\ntitle: Bye bye\n---\n# bye bye\n\nGood bye cruel world.\n\n\nhello world\n\n```python\n\nfor i in range(50):\n    print(\"bye world\")\n\n```",
    "tags": ["python", "markdown"],
    "published_at": "",
    "id": 4
}]

// posts.forEach(post => {
//     post.html = post.html.replace(/^\t{3}/gm, '');
// });

export default posts;