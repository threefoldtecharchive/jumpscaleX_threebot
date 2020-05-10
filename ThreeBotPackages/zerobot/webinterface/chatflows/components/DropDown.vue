<template>
  <div>
    <h3 class="title font-regular mb-2">{{payload.msg}}</h3>
    <v-autocomplete v-if="payload.kwargs.auto_complete" v-model="val" :items="payload.options" :rules="rules" validate-on-blur outlined></v-autocomplete>
    <v-select v-else v-model="val" :items="payload.options" :rules="rules" validate-on-blur outlined></v-select>
  </div>
</template>

<script>
  module.exports = {
    mixins: [field],
    props: {payload: Object}
  }
</script>
