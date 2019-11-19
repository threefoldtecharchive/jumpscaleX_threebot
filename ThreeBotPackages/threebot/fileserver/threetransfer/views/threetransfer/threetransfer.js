module.exports = {
  name: 'threetransfer',
  components: {
  },
  props: [],
  data () {
    return {
      file: '',
      downloadUUID: '',
      generatedUUID: ''
    }
  },
  computed: {
    ...window.vuex.mapGetters([
      'uploadMessages'
    ])
  },
  mounted () {
    
  },
  methods: {
    ...window.vuex.mapActions([
      'uploadfile',
      'generateLink',
      'downloadfile'
    ]),
    handleFileUpload () {
      this.file = this.$refs.file.files[0];
    },
    submitFile () {
      console.log(`submit file`, this.file)
      this.uploadfile(this.file)
      console.log("after submit")
      console.log(this.uploadMessages)
      this.generateLink(this.file.name)
    },
    downloadFile () {
      
      this.downloadfile(this.downloadUUID)

    }
  }
}
