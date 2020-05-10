<template>
  <div>
    <h3 class="title font-regular mb-2">{{payload.msg}}</h3>
    <v-textarea v-model="val" :rules="rules" clearable clear-icon="mdi-close" validate-on-blur outlined></v-textarea>
  </div>
</template>

<script>  
  module.exports = {
    mixins: [field],
    props: {payload: Object},
  }
</script>
