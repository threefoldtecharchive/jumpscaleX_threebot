module.exports = new Promise(async (resolve, reject) => {
  const vuex = await import("/weblibs/vuex/vuex.esm.browser.js");
  resolve({
    name: 'nodeinfo',
    props: ['node'],
    data() {
      return {
        freeSwitchAlert: undefined,
        healthyIcon: this.node.healthy === true ? { icon: 'fa-check', color: 'green' } : { icon: 'fa-times', color: 'red' },
        dialog: false,
      }
    },
    mounted() {
      console.log(this.node)
      if (this.node.free_to_use == undefined) {
        this.node.free_to_use = false;
      }
    },
    methods: {
      ...vuex.mapActions("farmmanagement", ["setNodeFree"]),

      getPercentage(type) {
          const reservedResources = this.node.reservedResources[type]
          const totalResources = this.node.totalResources[type]
          if (reservedResources === 0 && totalResources === 0) return 0
          return (reservedResources / totalResources) * 100
      },

      async setFree() {
        console.log(`set node ${this.node.id} ${this.node.free_to_use}`);

        const args = {
          node_id: this.node.id,
          free: this.node.free_to_use,
        }

        this.setNodeFree(args)
          .then(response => {
            if (response.status == 200) {
              this.freeSwitchAlert = {
                message: this.node.free_to_use ? 'free to use enabled' : "free to use disabled",
                type: "success",
              }
            } else {
              this.freeSwitchAlert = {
                message: response.data['error'],
                type: "error",
              }
            }
          }).catch(err => {
            this.freeSwitchAlert = {
              message: "server error",
              type: "error",
            }
          })

        setTimeout(() => {
          this.freeSwitchAlert = undefined
        }, 5000)
      }
    }
  });
});
