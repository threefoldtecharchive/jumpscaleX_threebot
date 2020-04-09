module.exports = new Promise(async (resolve, reject) => {
  const vuex = await import("/weblibs/vuex/vuex.esm.browser.js");
  resolve({
    name: 'nodeinfo',
    props: ['node'],
    data() {
      return {}
    },
    mounted() {
      console.log(this.node)
      if (this.node.free_to_use == undefined) {
        this.node.free_to_use = false;
      }
    },
    methods: {
      ...vuex.mapActions("farmmanagement", ["setNodeFree",]),

      getPercentage(type) {
        return (this.node.reservedResources[type] / this.node.totalResources[type]) * 100
      },

      setFree() {
        console.log(`set node ${this.node.id} ${this.node.free_to_use}`);
        this.setNodeFree(this.node.id, this.node.free_to_use);
      }
    }
  });
});
