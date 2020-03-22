module.exports = new Promise(async (resolve, reject) => {
  const vuex = await import("/weblibs/vuex/vuex.esm.browser.js");
  resolve({
    name: "capacitymap",
    components: { 
      capacityselector: 'url:/capacity/components/capacityselector/index.vue',
      nodeinfo: 'url:/capacity/components/nodeinfo/index.vue'
    },
    props: [],
    data() {
      return {
        select: { text: "All", value: "All" }
      };
    },
    computed: {
      ...vuex.mapGetters("capacity", ["registeredFarms", "registeredNodes"]),
      allFarmsList: function() {
        const allFarmers = this.registeredFarms.map(farm => {
          return {
            value: farm,
            text: farm.name
          };
        });
        allFarmers.push({ text: "All", value: "All" });
        return allFarmers;
      },
      nodeLocation: function() {
        // Group nodes by country
        const groupedNodeLocations = _.groupBy(
          this.nodes,
          node => node.location.country
        );

        const nodeLocations = [];
        // Map expect type [[country, count], ...]
        _.map(groupedNodeLocations, (groupedLocation, key) => {
          const numberOfNodesInLocation = [];
          const count = groupedLocation.length;
          numberOfNodesInLocation.push(key, count);
          nodeLocations.push(numberOfNodesInLocation);
        });

        return nodeLocations;
      }
    },
    mounted() {},
    methods: {
      setSelected(value) {
        if (value === "All") return this.setNodes(this.registeredNodes);
        const filteredNodes = this.registeredNodes.filter(
          node => node.farm_id.toString() === value.id.toString()
        );
        this.setNodes(filteredNodes);
      },
      ...vuex.mapMutations("capacity", ["setNodes"])
    }
  });
});
