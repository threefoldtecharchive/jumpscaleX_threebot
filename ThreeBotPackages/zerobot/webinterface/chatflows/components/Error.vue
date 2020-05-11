<template>
  <v-alert outlined type="error">
    <strong>{{payload.msg}}</strong>
  </v-alert>
</template>

<script>
  module.exports = {
    props: {payload: Object}
  }
</script>
