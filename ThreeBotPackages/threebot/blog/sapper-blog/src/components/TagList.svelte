<script>
  export let tags = [];
  export let title = "";
</script>

<style>
  ul {
    margin: 0 0 1em 0;
    line-height: 1.5;
  }
</style>

<h1>{title}</h1>

<ul>
  {#each tags as tag}
    <!-- we're using the non-standard `rel=prefetch` attribute to
				tell Sapper to load the data for the page as soon as
				the user hovers over the link or taps it, instead of
				waiting for the 'click' event -->
    <li>
      <a href="blog/tags/{tag}">{tag}</a>
    </li>
  {/each}
</ul>
