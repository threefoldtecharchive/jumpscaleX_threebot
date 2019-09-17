<script>
  export let partner = {};
  import Stars from "./Stars.svelte";
</script>

<div class="partner">
  <div class="partner-name">{partner.name}</div>
  <div class="partner-logo">
    <img src={partner.logo} alt={partner.name} />
  </div>
  <div class="partner-description">{partner.description}</div>
  <div class="partner-stars">
    <Stars count={partner.stars} />
  </div>

</div>
