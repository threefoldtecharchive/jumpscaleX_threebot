<template>
  <div>
    <h3 class="title font-regular mb-2">{{payload.msg}}</h3>
    <v-select v-model="val" :items="payload.options" :rules="rules" validate-on-blur small-chips multiple outlined/>
  </div>
</template>

<script>
  module.exports = {
    mixins: [field],
    props: {payload: Object},
     mounted () {
      if (!this.val) {
        this.val = []
      }
    }
  }
</script>
