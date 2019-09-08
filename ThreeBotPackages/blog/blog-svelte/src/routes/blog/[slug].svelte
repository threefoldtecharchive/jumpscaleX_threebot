<script context="module">
  export function preload({ params, query }) {
    let { slug } = params.slug;
    console.log("hello from wiki page " + JSON.stringify(params));
    return { params };
  }
</script>

<script>
  import { gunStore } from "./gunstore.js";
  import { onMount } from "svelte";

  const ENTER_KEY = "Enter";
  const ESCAPE_KEY = "Escape";
  export let params;
  export let currentArticleTitle = "";
  export let currentArticleContent = "";
  export let currentLikes = 0;
  export let editingTitle = false;
  export let editingContent = false;
  export let slug = params.slug;
  export let articlebucket = {};
  export let article = $gunStore.getEmptyArticle(slug);
  export let currentTags = [];
  export var gun;
  $: currentArticleMarkdown = converter.makeHtml(currentArticleContent);
  $: articleContentMarkdown = converter.makeHtml(article.content);
  $: tagslist = currentTags.filter(x => x !== undefined);
  $: dataToSave = {
    content: currentArticleContent,
    title: currentArticleTitle,
    slug: slug,
    likes: article.likes
    // articleTags: tags
  };
  var converter = new showdown.Converter();

  onMount(() => {
    gun = Gun("ws://127.0.0.1:8000/gun");
    // gun = Gun();
    articlebucket = gun.get("wiki://1").get(slug);

    articlebucket.get("list_tags").map((tag, i) => {
      if (!tag) {
        return;
      }
      // console.log("init adding tag.." + tag.tag);
      // console.log(`init currentTags: ${currentTags}`);
      console.log(
        `${currentTags} includes ${tag.tag}`,
        currentTags.includes(tag.tag)
      );
      if (tag !== undefined && !currentTags.includes(tag.tag)) {
        // console.log(`current tags in init: ${currentTags} and tag: ${tag.tag}`);
        currentTags.push(tag.tag);
      }
      currentTags = Array.from(new Set(currentTags));
    });
    articlebucket.on(data => {
      console.log(`incoming data ${JSON.stringify(data)}`);
      article = data || $gunStore.getEmptyArticle(slug);
      article.likes = article.likes || 0;
      console.log(`setting article to ${JSON.stringify(article)}`);
      currentArticleContent = article.content;
      currentArticleTitle = article.title;
    });

    console.log("article: ", article);
  });

  function reloadTags() {
    tagslist = $gunStore.getArticleTags(1, slug);
  }
  function reloadArticle(slug) {
    article =
      $gunStore.getArticleBySlug(slug) || $gunStore.getEmptyArticle(slug);
    console.log(`reloading article to ${JSON.stringify(article)}`);
    currentArticleContent = article.content;
    currentArticleTitle = article.title;
    likes = article.likes;
  }
  function saveArticle(slug, theArticle) {
    $gunStore.updateArticleWithData(1, slug, dataToSave);
    reloadArticle();
  }
  function editArticleTitle(article) {
    editingTitle = true;
    currentArticleTitle = article.title;
  }

  function editArticleContent(article) {
    editingContent = true;
    currentArticleContent = article.content;
  }

  function maybeDoneEditTitle(event, article) {
    if (event.key === ENTER_KEY) {
      console.log(`updating title  to ${currentArticleTitle}`);
      editingTitle = false;
      editingContent = false;
      $gunStore.updateArticleWithData(1, slug, dataToSave);
      reloadArticle();
    }
  }

  function saveContent(event) {
    console.log(`updating content  to ${currentArticleContent}`);
    editingTitle = false;
    editingContent = false;
    $gunStore.updateArticleWithData(1, slug, dataToSave);
    reloadArticle();
  }
  function like() {
    article.likes = $gunStore.incArticleLikes(1, slug);
  }
  function addTag(input) {
    let newTag = input.value;
    input.value = "";
    console.log("adding tag.." + newTag);
    console.log(`currentTags: ${currentTags}, tagslist ${tagslist}`);
    let added = $gunStore.addTagToArticle(1, slug, newTag);
    if (added) {
      currentTags = [...currentTags, newTag];
    }
    reloadTags();
  }
  function removeTag(idx) {
    console.log(`removing tag ${currentTags[idx]}`);
    let tag = currentTags[idx];
    let removed = $gunStore.removeTagFromArticle(1, slug, tag);
    if (removed) {
      currentTags = [
        ...currentTags.slice(0, idx),
        ...currentTags.slice(idx + 1)
      ];
    }
    reloadTags();
  }

  function enter(node, callback) {
    function onkeydown(event) {
      if (event.which === 13) callback(node);
    }
    node.addEventListener("keydown", onkeydown);
    return {
      destroy() {
        node.removeEventListener("keydown", onkeydown);
      }
    };
  }
</script>

<svelte:head>
  <title>Wiki main {params.slug}</title>
</svelte:head>
<div>
  <div>
    <span class="date">{article.updatedAt}</span>
    <div class="tag-list">
      <!-- currenttags {currentTags} taglist {tagslist} -->
      {#each tagslist as tag, idx}
        <span class="tag-default tag-pill" on:click={() => removeTag(idx)}>
          <i class="ion-close-round" />
          {tag}
        </span>
      {/each}
    </div>

    <input
      class="form-control"
      type="text"
      placeholder="Enter tags"
      use:enter={addTag} />
    {#if !article.title || editingTitle}
      <input
        type="text"
        class="form-control form-control-lg"
        bind:value={currentArticleTitle}
        on:keydown={event => maybeDoneEditTitle(event, article)} />
    {:else}
      <div
        class="article-item-title article-item-label content"
        on:dblclick={() => editArticleTitle(article)}>
        <h1>
          <i>{article.title}</i>
        </h1>
        <hr />
      </div>
    {/if}
  </div>

  <div>
    {#if !article.content || editingContent}
      <div class="article-content">
        <textarea
          rows="20"
          class="form-control form-control-lg"
          bind:value={currentArticleContent} />
        <button
          class="btn btn-lg pull-xs-right btn-primary"
          on:click={saveContent}>
          Save
        </button>
      </div>
      <div class="markdownpreview">
        {@html currentArticleMarkdown}
      </div>
    {:else}
      <div
        class="article-item-title article-item-label content"
        on:dblclick={() => editArticleContent(article)}>
        {@html articleContentMarkdown}
      </div>
    {/if}

    {#if !(editingContent || editingTitle)}
      <div class="rows">
        heart more
        <button class="btn btn-sm btn-outline-primary" on:click={like}>
          <i class="ion-heart" />
          {article.likes}
        </button>
      </div>
    {/if}

  </div>

</div>
