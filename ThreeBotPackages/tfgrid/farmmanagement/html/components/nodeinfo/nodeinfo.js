module.exports = {
  name: 'nodeinfo',
  props: ['node'],
  data () {
    return {
    }
  },
  mounted () {
    console.log(this.node)
  }
}
