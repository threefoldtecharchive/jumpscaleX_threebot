<template>
  <div>
    <h3 class="title font-regular mb-2">{{payload.msg}}</h3>
    <v-file-input @change="readFile" prepend-icon="" prepend-inner-icon="mdi-paperclip" :rules="rules" validate-on-blur outlined></v-file-input>
    <v-sheet v-if="val" color="accent" class="pa-5">
      <pre>{{val}}</pre>
    </v-sheet><br><br>
  </div>
</template>

<script>
  module.exports = {
    mixins: [field],
    props: {payload: Object},
    data () {
      return {
        file: null,
        validators: {
          // max_size: 1000,
          // file_types: 'text/plain'
        }
      }
    },
    methods: {
      readFile (file) {
        this.file = file
        const reader = new FileReader()
        reader.onload = (event) => {
          this.val = event.target.result
        }
        if (file) {
          reader.readAsText(file)
        }
      }
    }
  }
</script>

<style scoped>
  pre {
    word-wrap: break-word;
    white-space: pre-wrap;
  }
</style>