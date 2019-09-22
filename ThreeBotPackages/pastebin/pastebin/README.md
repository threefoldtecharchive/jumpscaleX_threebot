
This is a tool which is used to <b> auto highlight</b> your code and allow you to <b>share</b> with friends using an auto generated URL

# Features
* Auto Highlight code
* Share code
* Download code
* Copy code

## svelte app

This is a project template for [Svelte](https://svelte.dev) apps. It lives at https://github.com/sveltejs/template.

To create a new project based on this template using [degit](https://github.com/Rich-Harris/degit):

```bash
npx degit sveltejs/template svelte-app
cd svelte-app
```

*Note that you will need to have [Node.js](https://nodejs.org) installed.*


## Get started

Install the dependencies...

```bash
cd svelte-app
npm install
```

...then start [Rollup](https://rollupjs.org):

```bash
npm run dev
```

Navigate to [localhost:5000](http://localhost:5000). You should see your app running. Edit a component file in `src`, save it, and reload the page to see your changes.
## project structure 
```
.
├── back-end
│   ├── Api.py
│   └── views
│       └── 404.tpl
├── front-end
│   ├── package.json
│   ├── package-lock.json
│   ├── public
│   │   ├── favicon.png
│   │   ├── global.css
│   │   └── index.html
│   ├── rollup.config.js
│   └── src
│       ├── App.svelte
│       ├── components
│       │   ├── HighlightedCode.svelte
│       │   ├── NotFound.svelte
│       │   ├── OriginalCode.svelte
│       │   └── SharedCode.svelte
│       ├── main.js
│       ├── Navigation.svelte
│       └── routes.js
├── README.md
└── tree

6 directories, 18 files
```

## Routing between components
- Install the dependencies for external router **svelte-spa-router**...

```bash
npm install svelte-spa-router
```

- Register your routes to the component
```javascript
let routes
routes = new Map()
routes.set('/highlight', OriginalCode)
routes.set('/share/:codeId', SharedCode)
routes.set('/', OriginalCode)
routes.set('*', NotFound)
```

For more information about the router check <https://www.npmjs.com/package/svelte-spa-router>

## Working on front-end
* Add all the front-end libraries <b> example</b> ```Bootstrap and Font awesome``` in ```/public/index.html```

* Create navigation component <b>example</b> ```front-end/src/Navigation.svelte``` and import this component in ```front-end/src/App.svelte``` <b>example</b> ```import Navigation from './Navigation.svelte';```to use this component ```<Navigation />```

```html
<div>
	<nav class="navbar navbar-expand-lg navbar navbar-dark bg-dark">
		<a class="navbar-brand" href="#">Sharable Highlited Code</a>
		<button
			class="navbar-toggler"
			type="button"
			data-toggle="collapse"
			data-target="#navbarText"
			aria-controls="navbarText"
			aria-expanded="false"
			aria-label="Toggle navigation">
			<span class="navbar-toggler-icon" />
		</button>
		<div class="collapse navbar-collapse" id="navbarText">
			<ul class="navbar-nav mr-auto">
				<li class="nav-item active">
					<a class="nav-link" href="/">
						Home
						<span class="sr-only">(current)</span>
					</a>
				</li>
			</ul>
			<span class="navbar-text">
				We Share your code and keep the Highlights
			</span>
		</div>
	</nav>
</div>

```

* Create  ```front-end/src/components/OriginalCode.svelte``` component which contain all the required logic to get the orginal code and highlight it
```html
<script>
  import hljs from "highlight.js";
  import { newPaste } from "./data";

  import HighlightedCode from "./HighlightedCode.svelte";

  hljs.initHighlightingOnLoad();
  let shareableUrl = "";

  let originalCode = "";
  let highlightedCode = { value: "" };
  function highlightCode(originalCode) {
    highlightedCode = hljs.highlightAuto(originalCode);
    newPaste(originalCode)
      .then(function(response) {
        // let parsedJson = JSON.parse(response);
        shareableUrl = `${window.location.href}#/share/${response.data.id}`;
      })
      .catch(function(error) {});
  }

  //Copy the code
  function copyToClipboard(elementId) {
    var range = document.createRange();
    range.selectNode(document.getElementById(elementId));
    window.getSelection().removeAllRanges(); // clear current selection
    window.getSelection().addRange(range); // to select text
    document.execCommand("copy");
    window.getSelection().removeAllRanges(); // to deselect
  }
  //Download the code3
  function downloadCode(data, fileName = "originalCode") {
    var element = document.createElement("a");
    element.setAttribute(
      "href",
      "data:text/plain;charset=utf-8," + encodeURIComponent(data)
    );
    element.setAttribute("download", fileName);
    element.style.display = "none";
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  }
</script>

<div class="row">
  <!--[Left-Side]-->
  <div class="col-sm-6">
    <!--[Content]-->
    <div class="row">
      <div class="col-sm-12">
        <textarea
          id="original-code"
          rows="25"
          cols="95"
          bind:value={originalCode} />
      </div>
    </div>
    <!--[BTNs]-->
    <div class="d-flex justify-content-between mt-4">
      <!--[Submit-BTN]-->
      <div>
        <button
          type="button"
          on:click={() => highlightCode(originalCode)}
          class="btn btn-dark btn-lg">
          Submit
        </button>
      </div>
      <!--[Download-BTN]-->
      <div>
        <button
          type="button"
          class="btn btn-dark btn-lg"
          on:click={() => downloadCode(originalCode)}>
          Download
        </button>
      </div>
      <!--[Submit-Copy]-->
      <div>
        <button
          class="btn btn-dark btn-lg"
          on:click={() => copyToClipboard('original-code')}>
          <i class="far fa-copy" />
        </button>
      </div>
    </div>
    <!--[Sharabe-Link]-->
    {#if shareableUrl != ''}
      <div class="row">
        <div class="col-sm-12">
          <div class="d-flex mt-5 align-items-center">
            <!--[Display-URL]-->
            <div class="h3" id="shareable-url">{shareableUrl}</div>
            <div>
              <!--[Copy-BTN]-->
              <button
                class="btn btn-grey ml-3"
                on:click={() => copyToClipboard('shareable-url')}>
                <i class="far fa-copy" />
              </button>
            </div>
          </div>
        </div>
      </div>
    {/if}

  </div>
  <!--[Right-Side]-->
  <div class="col-sm-6">
    <HighlightedCode {highlightedCode} />
  </div>
</div>
``` 

* Create ```front-end/src/components/NotFound.svelte``` component to handle the not found pages
```
<h2>Not Found</h2>
<h3>Oops, this route doesn't exist!</h3>
```

* Create  ```front-end/src/components/SharedCode.svelte``` component which contain all the required logic to all the user to get the shared code from the API in bottle server
```html
<script>
  import HighlightedCode from "./HighlightedCode.svelte";
  import { getPaste } from "./data";

  let highlightedCode = { value: "" };
  export let params;
  if (params && params.codeId != null && params.codeId != undefined) {
    getSharedCode(params.codeId);
  }

  function getSharedCode(codeId) {
    getPaste(codeId)
      .then(function(response) {
        // handle success
        //call highlitedCode

        //Get the orginal code from the response to be highlighted
        // let parsedJson = JSON.parse(response);
        let actualCode = response.data.code;
        highlightCode(actualCode);
      })
      .catch(function(error) {
        // handle error
        console.log(error);
      })
      .finally(function() {
        // always executed
      });
  }

  function highlightCode(originalCode) {
    highlightedCode = hljs.highlightAuto(originalCode);
  }
</script>

<div>
  <h1>The shared code</h1>
  <HighlightedCode {highlightedCode} />
</div>
```
* Create ```front-end/src/components/HighlightedCode.svelte``` component which will contain the logic to render the Highlighted code.
```html
<script>
	export let highlightedCode;
</script>
	<!--[Highlighted-Code]-->
	{#if highlightedCode.value}
		<pre>
			<code class="hljs">
				{@html highlightedCode.value}
			</code>
		</pre>
	{/if}
```
* In code highlighting, I have used <b>highlighjs library</b>, to install ```npm install highlight.js```, import this library ```	import hljs from 'highlight.js';```, call ```hljs.initHighlightingOnLoad();``` to attache highlighting to the page load event and call ```highlightAuto(value, languageSubset)``` to get the markup that will highligh the code
```
highlightedCode = hljs.highlightAuto(originalCode);
```
to render it it must be in ```<pre>``` and ```<code>``` tags 
```html
<pre>
	<code class="hljs">
	    {@html highlightedCode.value}
	</code>
</pre>
```

 * Add ```Axios``` to handle the HTTP requests ```$ npm install axios```
example 
```javascript
import axios from 'axios'

export function getPaste(pasteId) {
    return (axios.post("/actors/pastebin/get_paste", { "args": { "paste_id": pasteId } }))
}

export function newPaste(code) {
    return (axios.post("/actors/pastebin/new_paste", { "args": { "code": code } }))
}
```

## Deploying to the web

### With [now](https://zeit.co/now)

Install `now` if you haven't already:

```bash
npm install -g now
```

Then, from within your project folder:

```bash
cd public
now
```

As an alternative, use the [Now desktop client](https://zeit.co/download) and simply drag the unzipped project folder to the taskbar icon.

