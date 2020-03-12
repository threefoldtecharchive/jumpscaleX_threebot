<script>
  import { Person } from "../hello/hello";

  let person = new Person("abdo", 111);

</script>

<form>
  <input name="name" type="text" bind:value={person.name} />
  <input name="number" type="number" bind:value={person.number} />

</form>

<b>Name:</b>
{person.name}
<b>Number:</b>
{person.number}
