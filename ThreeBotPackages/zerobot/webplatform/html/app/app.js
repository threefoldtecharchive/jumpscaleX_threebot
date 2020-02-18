module.exports = {
  name: "app",
  components: {},
  props: [],
  data() {
    return {
      showDialog: false,
      showBadge: true,
      menu: false,
      alreadyAddedStores: []
    };
  },
  computed: {
    ...mapGetters(["routes"]),
    topRoutes() {
      return this.routes.filter(r => r.meta.position === "top");
    },
    bottomRoutes() {
      return this.routes.filter(r => r.meta.position === "bottom");
    },
    bottomNavApps() {
      return this.topRoutes.concat(this.bottomRoutes);
    },
    showOverlay() {
      return false;
    }
  },
  methods: {
    signOut() {},
    getAllRoutes(app) {}
  }
};
