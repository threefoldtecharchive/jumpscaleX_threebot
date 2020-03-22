module.exports = new Promise(async (resolve, reject) => {
  const vuex = await import("/weblibs/vuex/vuex.esm.browser.js");
  resolve({
    name: "capacity",
    components: {
      minigraph: "url:/capacity/components/minigraph/index.vue",
      capacitymap: "url:/capacity/components/capacitymap/index.vue",
      scrollablecard: "url:/capacity/components/scrollablecard/index.vue",
      nodestable: "url:/capacity/components/nodestable/index.vue"
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
        menu: false
      };
    },
    computed: {
      ...vuex.mapGetters("capacity", [
        "nodeSpecs",
      ]),
    },
    mounted() {
      this.getRegisteredNodes();
      this.getRegisteredFarms();
    },
    methods: {
      ...vuex.mapActions("capacity", ["getRegisteredNodes", "getRegisteredFarms"])
    }
  });
});
