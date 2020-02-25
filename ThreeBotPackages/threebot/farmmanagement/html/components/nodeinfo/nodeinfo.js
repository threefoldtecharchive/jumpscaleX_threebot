module.exports = {
  name: 'nodeinfo',
  props: ['node'],
  data () {
    return {
    }
  },
  methods: {
    getPercentage(type) {
      return (this.node.usedResources[type] / this.node.totalResources[type]) * 100
    }
  }
}
