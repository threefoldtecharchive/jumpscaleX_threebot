<script>
  import axios from "axios";
  axios.defaults.headers.get["Content-Type"] = "application/json";

  import { stores } from "@sapper/app";
  const { preloading, page, session } = stores();
  export let blogName = $page.params.theuser;
  let query = "";
  let search_res = "";

  const BLOG_API = `search.json`;

  export async function search_method(e) {
    // if (!query) {
    //   alert("empty search !");
    // }
    e.preventDefault();
    search_res = await axios.get(BLOG_API, {
      params: {
        blog_name: blogName,
        query: query
      }
    });
    search_res = search_res.data;
  }

  export function clear_results(e) {
    if (e.key === "Escape" || e.type === "click") {
      search_res = "";
      document.querySelector(".search-area").style.display = "none";
      document.getElementById("search").value = "";
    }
  }
</script>

<form on:submit={search_method} on:keyup={clear_results} class="search-form">
  <div class="form-group">
    <input type="search" placeholder="What are you looking for?" id="search" />
    <button type="submit" class="submit search-btn">
      <i class="icon-search" />
    </button>
  </div>
</form>
