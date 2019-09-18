# Blog


## Start
`kosmos -p 'j.threebot.package.blog.start(BLOG_NAME, REPO_URL)'`

e.g `kosmos -p 'j.threebot.package.blog.start("xmon")'`


## Blog structure
```
.
├── images
│   └── me.jpg
├── metadata.yml
├── pages
│   ├── about.md
│   └── contactus.md
└── posts
    ├── 2019-9-8-hello-world.md
    ├── 2019-9-8-post 1.md
    ├── 2019-9-8-post 2.md
    └── 2019-9-9-bye-bye-world.md


```

## Post structure

```
---
tags: python, markdown
title: My Hello World
---

hiiiii what's up? ok



    ```

    for i in range(50):
        print("hello world")

    ```

```


## Blog metadata

```yml
blog_title: "xmonader weblog"
blog_description: "let there be posts"
blog_logo: images/blog.jpg
author_name: "ahmed"
author_email: "ahmed@there.com"
author_image_filename: "images/author.jpg"
posts_dir: "posts"
pages_dir: "pages"
images_dir: "images"
github_username: "xmonader"
posts_per_page: 5

sidebar_links:
  - title: google
    link: https://google.com
  - title: yahoo
    link: https://yahoo.com

sidebar_social_links:
  - title: facebook
    link: https://facebook.com/abc
  - title: github
    link: https://github.com/abc

nav_links:
  - title: about
    page: pages/about.md
  - title: contact us
    page: pages/contactus.md
  - title: foundation link
    link: https://threefold.io

```


## Svelte
Svelte is used for frontend


### Components
- in blog/src/components

### Routes
Done using `svelte-router-spa` in `blog/src/routers.js`

### API access
Are accessed using gedishttp client check [BlogAPI access](https://github.com/threefoldtech/jumpscaleX_threebot/blob/55c6a0d1e24d469f0235c500775b6394c326432d/ThreeBotPackages/blog/blog/src/components/blogstore.js)




### Workflow
TBD

## Actors

check [actors](/home/ahmed/sandbox/code/github/threefoldtech/jumpscaleX_threebot/ThreeBotPackages/blog/actors)
