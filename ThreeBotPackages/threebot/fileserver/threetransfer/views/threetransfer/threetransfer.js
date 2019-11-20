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
      'downloadfile',
      'clearMessages'
    ]),
    handleFileUpload () {
      this.clearMessages()
      this.file = this.$refs.file.files[0];
    },
    submitFile () {
      this.uploadfile(this.file)    
    },
    downloadFile () {
      
      this.downloadfile(this.downloadUUID)

    }
  }
}
