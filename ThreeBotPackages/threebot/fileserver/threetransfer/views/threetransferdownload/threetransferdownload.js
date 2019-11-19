module.exports = {
  name: 'threetransferdownload',
  components: {
  },
  props: ['identifier'],
  data () {
    return {
      
    }
  },
  computed: {

  },
  mounted () {
    this.downloadFile()
  },
  methods: {
    ...window.vuex.mapActions([
      'downloadfile'
    ]),
    downloadFile () {
      this.downloadfile(this.identifier)
    }
  }
}
