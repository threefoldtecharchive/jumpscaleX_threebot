module.exports = {
  name: 'minigraph',
  components: {},
  props: {
    color: {
      type: String,
      default: 'secondary darken-2 '
    },
    title: {
      type: String,
      default: ''
    },
    value: {
      default: '0'
    },
    append: {
      type: String,
      default: ''
    },
    special: {
      type: Boolean
    },
    clickable: {
      type: Boolean,
      default: false
    }
  },
  mounted () {
  },
  data () {
    return {
      data: []
    }
  },
  methods: {
  },
  computed: {

  }
}
