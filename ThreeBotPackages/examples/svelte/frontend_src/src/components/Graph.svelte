<script>
  export let data = [];

  $: {
    console.log("data changed: ", data);

    if (data.length) {
      console.log("plotting data: ", data);
      Plotly.newPlot("myDiv", data, {}, { showSendToCloud: true });
    }
  }
</script>

<div id="myDiv">
  <!-- Plotly chart will be drawn inside this DIV -->
</div>
