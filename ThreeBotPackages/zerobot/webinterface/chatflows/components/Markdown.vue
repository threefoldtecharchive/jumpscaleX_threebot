<template>
  <div v-if="payload" v-html="render()"></div>
</template>

<script>  
  module.exports = {
    mixins: [field],
    props: {payload: Object},
    methods: {
      render () {
        return markdown.toHTML(this.payload.msg)
      }
    }
  }
</script>