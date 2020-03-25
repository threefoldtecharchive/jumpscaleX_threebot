<script>
  import axios from "axios";
  import CompanyForm from "../../components/CompanyForm.svelte";
  import Graph from "../../components/Graph.svelte";

  import { onMount } from "svelte";
  export let data;
  $: data;

  onMount(() => {
    let script = document.createElement("script");
    script.src = "https://cdn.plot.ly/plotly-latest.min.js";
    document.head.append(script);

    axios
      .get("/jumpscale/svelte/model/jumpscale.svelte.company.1")
      .then(resp => {
        const allData = resp.data;
        data = [
          {
            x: allData.map(item => item.name),
            y: allData.map(item => item.score),
            type: "bar"
          }
        ];

        console.log("data ready to be plotted: ", data);
      });
  });

  function handleNewCompany(event) {
    const newData = event.detail;
    console.log("new company data was added", newData);
    data = [
      {
        x: [...data[0].x, newData.name],
        y: [...data[0].y, newData.score],
        type: "bar"
      }
    ];
  }
</script>

<svelte:head>
  <title>Plotly</title>
  <meta name="description" content="" />
  <script src="https://cdn.plot.ly/plotly-latest.min.js">

  </script>
  <script
    src="https://cdnjs.cloudflare.com/ajax/libs/axios/0.19.2/axios.min.js">

  </script>
</svelte:head>
<div>
  <h1>Plotly Example</h1>
</div>

<Graph {data} />
<CompanyForm on:new_company={handleNewCompany} />
