<script>
  import { Company } from "../hello/hello";
  let company = new Company();

</script>

<form on:submit|preventDefault={company.add_company}>
  <label>Name</label> : <input name="name" type="text" />
  <label>Score</label> : <input name="score" type="number"/>
  <button type='submit' value='submit'> Submit</button>
</form>
