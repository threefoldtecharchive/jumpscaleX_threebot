import {
    writable
} from 'svelte/store';

import moment from 'moment'

class BlogStore {
    constructor(blog_name) {
        this.blog_name = blog_name
    }

    getPosts() {

    }

    getMeta() {

    }

    getPostsByTag(tag) {

    }

    getTags() {
    }


}

//     getAllTags(wikiId = 1) {
//         let res = [];
//         console.log(this.gun)
//         this.gun
//             .get(`wiki://${wikiId}`)
//             .map()
//             .on((v, k) => {
//                 console.log("in all store tags.... ", k, v, wikiId);
//                 if (k && v && k.includes("_tag")) {
//                     res.push(v.tag);
//                 }
//             });
//         console.log(`store tags: ${res}`)
//         return res;
//     }

//     updateArticleWithData(wikiId, articleSlug, withData) {
//         console.log(`updating article ${articleSlug} with data ${withData}`)
//         withData.updatedAt = moment().format('MMMM Do YYYY, h:mm:ss a')
//         this.gun
//             .get(`wiki://${wikiId}`)
//             .get(articleSlug)
//             .put(withData)
//     }
//     addTagToArticle(wikiId, articleSlug, newTag) {
//         let t = this.gun.get("wiki://1").get(newTag + "_tag");
//         t.put({
//             tag: newTag
//         });
//         this.gun
//             .get(`wiki://${wikiId}`)
//             .get(articleSlug)
//             .get("list_tags").set(t);
//         return true;
//     }
//     removeTagFromArticle(wikiId, articleSlug, theTag) {

//         let t = this.gun.get("wiki://1").get(theTag + "_tag");
//         this.gun
//             .get(`wiki://${wikiId}`)
//             .get(articleSlug)
//             .get("list_tags").unset(t);


//         return true;
//     }
//     incArticleLikes(wikiId, articleSlug) {
//         let article = this.getArticleBySlug(wikiId, articleSlug)
//         article.likes = article.likes || 0;
//         article.likes++;
//         this.gun
//             .get(`wiki://${wikiId}`)
//             .get(articleSlug).put({
//                 likes: article.likes
//             })
//         return article.likes
//     }
//     getAllArticles(wikiId = 1) {
//         let res = [];

//         this.gun
//             .get(`wiki://${wikiId}`)
//             .map()
//             .on((v, k) => {
//                 if (k && v && !k.includes("_tag") && v.title !== undefined) {
//                     console.log("in all articles store here.... ", k, v, wikiId, " done");

//                     res.push(this.prepareArticle(v));
//                 }
//             });
//         console.log(`store all articles: ${res}`)

//         return res;
//     }

//     getArticleBySlug(wikiId, articleSlug) {
//         let article = {}
//         this.gun
//             .get(`wiki://${wikiId}`)
//             .get(articleSlug).on((data) => {
//                 article = this.prepareArticle(data)
//             })
//         console.log(`returning article ${JSON.stringify(article)}`)
//         return article
//     }
//     getArticleTags(wikiId, articleSlug) {
//         let res = []
//         this.gun
//             .get(`wiki://${wikiId}`)
//             .get(articleSlug).get("list_tags").map().on((v, k) => {
//                 if (!k.includes("_tag") && v.tag !== undefined) {
//                     res.push(v.tag)
//                 }
//             })
//         return res;
//     }
//     getEmptyArticle(slug) {
//         let now = moment().format('MMMM Do YYYY, h:mm:ss a')

//         return {

//             likes: 0,
//             content: "",
//             slug: slug,
//             title: "",
//             createdAt: now,
//             updatedAt: now

//         }
//     }

//     prepareArticle(article) {
//         console.log("calling prepare article..")
//         let now = moment().format('MMMM Do YYYY, h:mm:ss a')
//         article.updatedAt = article.updatedAt || now
//         article.likes = article.likes || 0
//         article.createdAt = article.createAt || now
//         console.log(`article prepared with ${JSON.stringify(article)}`)
//         return article
//     }

//     getArticlesByTag(wikiId, tag) {
//         let res = []
//         this.gun
//             .get(`wiki://${wikiId}`)
//             .map().on((v, k) => {
//                 if (v !== undefined && !k.includes("_tag") && v.slug) {
//                     let articleTags = this.getArticleTags(v.slug)
//                     if (articleTags.includes(tag)) {
//                         res.push(this.prepareArticle(v))
//                     }
//                 }
//             })
//     }
// }


export let blogStore = writable(new BlogStore())