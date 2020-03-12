<svelte:head>
  <title>Plotly</title>
  <meta name="description" content="">
  <script src="https://cdn.plot.ly/plotly-latest.min.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/axios/0.19.2/axios.min.js"></script>
</svelte:head>

<script>

  import CompanyForm from "../../components/CompanyForm.svelte";


  import { onMount } from 'svelte';

  let data = [{
    x: ['giraffes', 'orangutans', 'monkeys'],
    y: [20, 14, 23],
    type: 'bar'
  }];

  onMount(() => {

   let script = document.createElement('script');
   script.src = "https://cdn.plot.ly/plotly-latest.min.js"
   document.head.append(script);

   script.onload = function() {
     Plotly.newPlot('myDiv', data, {}, {showSendToCloud:true});
   };

  });
            
</script>

<div>
  <h1>Plotly Example</h1>
</div>

<div id="myDiv"><!-- Plotly chart will be drawn inside this DIV --></div>

<CompanyForm />