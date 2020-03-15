<script>
  import { Company } from "../hello/hello";
  import { createEventDispatcher } from "svelte";

  const dispatch = createEventDispatcher();

  let company = new Company();

  function handleSubmit(event) {
    console.log(event);
    const newData = {
      name: event.target[0].value,
      score: event.target[1].value
    };

    company.add_company(newData).then(() => {
      dispatch("new_company", newData);
    });
  }
</script>

<form on:submit|preventDefault={handleSubmit}>
  <label>Name</label>
  :
  <input name="name" type="text" />
  <label>Score</label>
  :
  <input name="score" type="number" />
  <button type="submit" value="submit">Submit</button>
</form>
