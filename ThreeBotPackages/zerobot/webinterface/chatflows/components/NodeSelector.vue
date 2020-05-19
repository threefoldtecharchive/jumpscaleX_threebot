<template>
    <div>
      <Message :payload="payload"></Message>
      <v-autocomplete v-model="val" :hint="hint" :rules="rules" :persistent-hint="true" label="Nodes" :items="nodes" validate-on-blur outlined small-chips :multiple="multiple"></v-autocomplete>
      
      <h3 class="title font-regular mb-3 mt-5">Filter Nodes</h3>
      <v-autocomplete v-model="filters.farm" label="Farm" :items="farms" validate-on-blur outlined small-chips></v-autocomplete>
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
          country: null,
          farm: null
        },
        nodes: [],
        farms: []
      }
    },
    watch: {
      filters: {
        handler () {
          this.findNodes()
        },
        deep: true
      }
    },
    computed: {
      hint () {
        if (this.multiple) {
          return `${this.nodes.length} Nodes, ${this.val.length} Selected`
        } else {
          return `${this.nodes.length} Nodes, ${this.val.length ? 1 : 0} Selected`
        }
      },
      multiple () {
        return this.payload.kwargs.multiple === true
      }
    },
    methods: {
      findNodes () {
        axios({
          url: `${baseUrl}/zos/find_nodes`,
          params: {
            farm_name: this.filters.farm,
            cru: this.filters.cru,
            mru: this.filters.mru,
            hru: this.filters.hru,
            sru: this.filters.sru
          }
        }).then((response) => {
          this.nodes = response.data
        })
      },
      get_farms () {
        axios({
          url: `${baseUrl}/zos/list_farms`,
        }).then((response) => {
          this.farms = response.data
        })
      }
    },
    mounted () {
      this.get_farms()
    }
  }
</script>
