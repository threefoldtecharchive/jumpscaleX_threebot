<script>
  import TasksRendering from "./TasksRendering.svelte";
  import { getJobs } from "../data";
  import { onMount } from "svelte";

  let allTasks = [];
  let isAllTasksAvailable = false;
  //Make all the states UpperCase
  allTasks.forEach(task => {
    task.state = task.state.toUpperCase();
  });

  onMount(async () => {
    isAllTasksAvailable = false;
    getJobs().then(function(data) {
      isAllTasksAvailable = true;
      console.log(`DATA : ${data}`);

      if (!data) {
        return;
      }
      allTasks = JSON.parse(data).jobs;
      //Make all the states UpperCase
      allTasks.forEach(task => {
        task.state = task.state.toUpperCase();
      });
    });
  });
</script>

<style>

</style>

<!--[Header]-->
<h1>Tasks</h1>
{#if allTasks && allTasks.length > 0 && isAllTasksAvailable}
  <TasksRendering {allTasks} />
{:else if allTasks.length == 0 && isAllTasksAvailable}
  <div>
    <h2>There is no Jobs</h2>
  </div>
{:else if !isAllTasksAvailable}
  <div class="text-center">
    <img src={'/img/loader.gif'} class="img-fluid" alt="Responsive image" />
  </div>
{/if}
