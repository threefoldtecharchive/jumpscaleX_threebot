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
    computed: {
      cpr_total: function () {
        const cu = this.ru2cu(this.node.totalResources)
        return 1.5 * cu.cu + cu.su
      },
    },
    methods: {
      ...vuex.mapActions("farmmanagement", ["setNodeFree"]),

      ru2cu(r){
        const cu = {
          cu : Math.round(Math.min(r.mru/4*0.95, r.cru * 2) * 1000) / 1000,
          su : Math.round(( r.hru / 1093 + r.sru / 91) * 1000) / 1000,
        }
        return cu
      },

      getPercentage(type) {
          const reservedResources = this.node.reservedResources[type]
          const totalResources = this.node.totalResources[type]
          if (reservedResources === 0 && totalResources === 0) return 0
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
