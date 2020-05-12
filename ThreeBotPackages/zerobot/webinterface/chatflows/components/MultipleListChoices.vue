<template>
  <div>
    <Message :payload="payload"></Message>
    <v-select v-model="val" :items="payload.options" :rules="rules" validate-on-blur small-chips multiple outlined/>
  </div>
</template>

<script>
  module.exports = {
    mixins: [field],
    props: {payload: Object}
  }
</script>
