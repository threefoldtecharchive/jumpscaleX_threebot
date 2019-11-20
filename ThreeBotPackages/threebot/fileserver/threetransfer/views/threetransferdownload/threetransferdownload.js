module.exports = {
  name: 'threetransferdownload',
  components: {
  },
  props: ['identifier'],
  data () {
    return {
      ...window.vuex.mapGetters([
        'downloadError'
      ])
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
      let file = this.downloadfile(this.identifier)
      this.downloadToSystem(file)
    },
    downloadToSystem(file){
      console.log(file)
    }
  }
}
