<template>
  <div>
    <h3 class="title font-regular mb-2">{{payload.msg}}</h3>
    <div class="text-center">
      <img style="border:1px dashed #85929E" :src="`data:image/png;base64, ${payload.qrcode}`"/>
    </div>
  </div>
</template>

<script>  
  module.exports = {
    mixins: [field],
    props: {payload: Object},
  }
</script>
