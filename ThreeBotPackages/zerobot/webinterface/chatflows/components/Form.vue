<template>
  <div>
    <h3 class="title font-regular mb-7">{{payload.msg}}</h3>
    <component 
      v-for="(field, i) in payload.fields" 
      :key="i" 
      :ref="`field-${i}`"
      :payload="field" 
      v-bind:is="categories[field.category]" 
      v-model="data[i]"
    />
  </div>
</template>

<script>  
  module.exports = {
    mixins: [field],
    props: {payload: Object},
    data () {
      return {
        data: []
      }
    },
    watch: {
      data: {
        handler (val) {
          this.val = val  
        },
        deep: true
      }
    },
    mounted () {
      if (this.val){
        this.data = this.val
      } else {
        this.val = []
      }
    }
  }
</script>
