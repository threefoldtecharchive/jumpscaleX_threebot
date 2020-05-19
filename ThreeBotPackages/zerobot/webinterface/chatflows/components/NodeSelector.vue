<template>
    <div>
      <Message :payload="payload"></Message>
      <v-autocomplete v-model="val" :hint="hint" :rules="rules" :persistent-hint="true" label="Nodes" item-value="node_id" item-text="node_id" :items="filtered" validate-on-blur outlined small-chips :multiple="multiple"></v-autocomplete>
      
      <h3 class="title font-regular mb-3 mt-5">Filter Nodes</h3>
      <v-autocomplete v-model="filters.farm_id" label="Farm" :items="farms" item-value="id" item-text="name" validate-on-blur outlined small-chips></v-autocomplete>
      <v-slider class="mt-5" label="CRU" v-model="filters.cru" max="64" thumb-label="always"></v-slider>
      <v-slider class="mt-3" label="MRU" v-model="filters.mru" max="512" thumb-label="always"></v-slider>
      <v-slider class="mt-3" label="HRU" v-model="filters.hru" max="5000" thumb-label="always"></v-slider>
      <v-slider class="mt-3" label="SRU" v-model="filters.sru" max="5000" thumb-label="always"></v-slider>
    </div>
</template>

<script>
  const axios = require('axios')
  const baseUrl = "/zerobot/webinterface/actors"
  
  module.exports = {
    mixins: [field],
    props: {payload: Object},
    data () {
      return {
        filters: {
          cru: null,
          mru: null,
          hru: null,
          sru: null,
          farm_id: null
        },
        nodes: [],
        farms: []
      }
    },
    computed: {
      hint () {
        if (this.multiple) {
          return `${this.filtered.length} Nodes, ${this.val.length} Selected`
        } else {
          return `${this.filtered.length} Nodes, ${this.val && this.val.length ? 1 : 0} Selected`
        }
      },
      filtered () {
        return this.nodes.filter((node) => {
          if (this.filters.farm_id && node.farm_id !== this.filters.farm_id) return false
          if (node.total_resources.cru - node.used_resources.cru < this.filters.cru) return false
          if (node.total_resources.mru - node.used_resources.mru < this.filters.mru) return false
          if (node.total_resources.sru - node.used_resources.sru < this.filters.sru) return false
          if (node.total_resources.hru - node.used_resources.hru < this.filters.hru) return false
          return true
        })
      },
      multiple () {
        return this.payload.kwargs.multiple === true
      }
    },
    methods: {
      getNodes () {
        axios({
          url: `${baseUrl}/zos/list_nodes`,
        }).then((response) => {
          this.nodes = response.data
        })
      },
      getFarms () {
        axios({
          url: `${baseUrl}/zos/list_farms`,
        }).then((response) => {
          this.farms = response.data
        })
      }
    },
    mounted () {
      this.getFarms()
      this.getNodes()
    }
  }
</script>
