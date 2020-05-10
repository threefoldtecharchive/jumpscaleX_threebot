<template>
  <div>
    {{val}}
    <h3 class="title font-regular mb-2">{{payload.msg}}</h3>
    <v-menu v-model="menu" :close-on-content-click="false" min-width="290">
      <template v-slot:activator="{ on }">
        <v-text-field
          v-model="dateTime"
          v-on="on"
          readonly
          outlined
          @click="menu = true"
          :rules="rules"
          prepend-inner-icon="mdi-calendar-month"
          validate-on-blur
        />
      </template>

      <v-tabs v-model="tab">
        <v-tab>Date</v-tab>
        <v-tab readOnly>Time</v-tab>
      </v-tabs>

      <v-tabs-items v-model="tab">
        <v-tab-item>
          <v-date-picker v-model="date" color="primary" @click:date="tab = date ? 1 : 0;" no-title scrollable/>
        </v-tab-item>
        <v-tab-item>
          <v-time-picker v-model="time" color="primary" @click:minute="save" no-title scrollable/> 
        </v-tab-item>
      </v-tabs-items>
    </v-menu>
  </div>

</template>

<script>
  module.exports = {
    mixins: [field],
    props: {payload: Object},
    data () {
      return {
        menu: false,
        tab: 0,
        date: null,
        time: null,
        dateTime: null,
        validators: {
          is_valid: true
        }
      }
    },
    watch: {
      val () {
        this.setDefault()
      }
    },
    methods: {
      setDefault () {
        this.dateTime = new Date(this.val * 1000).toLocaleString()
      },
      save () {
        this.tab = 0
        this.menu = false
        this.val = new Date(this.date + ' ' + this.time).getTime() / 1000
      }
    },
    mounted () {
      if (this.val){
        this.setDefault()
      }
    }
  }
</script>
