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
        //Get the orginal code from the response to be highlighted
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
