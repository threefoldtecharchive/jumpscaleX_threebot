<template>
  <div>
    <h3 class="title font-regular mb-2">{{payload.msg}}</h3>
    <v-text-field v-model="val" :rules="rules" validate-on-blur outlined></v-text-field>
  </div>
</template>

<script>
  module.exports = {
    mixins: [field],
    props: {payload: Object},
  }
</script>
