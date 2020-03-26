module.exports = new Promise(async (resolve, reject) => {
  const vuex = await import("/weblibs/vuex/vuex.esm.browser.js");
  resolve({
    name: "capacity",
    components: {
      minigraph: "url:/threebot/capacity_standalone/components/minigraph/index.vue",
      capacitymap: "url:/threebot/capacity_standalone/components/capacitymap/index.vue",
      scrollablecard: "url:/threebot/capacity_standalone/components/scrollablecard/index.vue",
      nodestable: "url:/threebot/capacity_standalone/components/nodestable/index.vue"
    },
    props: [],
    data() {
      return {
        showDialog: false,
        dilogTitle: "title",
        dialogBody: "",
        dialogActions: [],
        dialogImage: null,
        block: null,
        showBadge: true,
        menu: false,
        selectedNode: ''
      };
    },
    computed: {
      ...vuex.mapGetters("capacity", [
        "nodeSpecs",
        "registeredNodes"
      ]),
    },
    mounted() {
      this.getRegisteredNodes();
      this.getRegisteredFarms();
    },
    methods: {
      ...vuex.mapActions("capacity", ["getRegisteredNodes", "getRegisteredFarms"]),
      changeSelectedNode (data) {
        this.selectedNode = data
      }
    }
  });
});
