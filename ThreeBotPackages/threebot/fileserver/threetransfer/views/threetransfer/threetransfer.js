module.exports = {
  name: 'threetransfer',
  components: {
  },
  props: [],
  data () {
    return {
      file: ''
    }
  },
  computed: {

  },
  mounted () {

  },
  methods: {
    ...window.vuex.mapActions([
      'uploadfile'
    ]),
    handleFileUpload () {
      this.file = this.$refs.file.files[0];
    },
    submitFile () {
      let formData = new FormData();
      formData.append('file', this.file);
      this.uploadfile(formData)
    }
  }
}
