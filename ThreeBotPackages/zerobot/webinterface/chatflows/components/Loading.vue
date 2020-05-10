<template>
  <div class="text-center">
    <h3 class="title font-regular mb-6">{{payload.msg}}</h3>
    <v-progress-circular
      :rotate="-90"
      :size="150"
      :width="15"
      :value="payload.value"
      color="primary"
    >
      <strong>{{ payload.value }} %</strong>
    </v-progress-circular>
  </div>
</template>

<script>  
  module.exports = {
    props: {payload: Object}
  }
</script>