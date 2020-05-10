<template>
  <div>
    <h3 class="title font-regular mb-2">{{payload.msg}}</h3>
    <v-text-field outlined v-model="val" :rules="rules" validate-on-blur type="number"></v-text-field>
  </div>
</template>

<script>  
  module.exports = {
    mixins: [field],
    props: {payload: Object}
  }
</script>
