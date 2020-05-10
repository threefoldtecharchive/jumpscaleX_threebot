<template>
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
