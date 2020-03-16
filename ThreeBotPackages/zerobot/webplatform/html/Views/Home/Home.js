module.exports = new Promise(async (resolve, reject) => {
  const vuex = await import(
    "/weblibs/vuex/vuex.esm.browser.js"
  );

  resolve({
    name: "home",
    components: {},
    props: [],
    data() {
      return {};
    },
    computed: {
        ...vuex.mapGetters(["routes"])
    },
    async mounted() {
    },
    methods: {}
  });
});
