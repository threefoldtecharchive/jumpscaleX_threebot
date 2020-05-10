<template>
    <div>
      <h3 class="title font-regular mb-5">{{payload.msg}}</h3>
      <v-text-field class="time-delta" v-model="val" height="50" placeholder="Time delta format" :rules="rules" readonly validate-on-blur outlined></v-text-field>
      <v-slider label="Years" v-model="parts.Y" thumb-label dense></v-slider>
      <v-slider label="Months" v-model="parts.M" max="11" thumb-label dense></v-slider>
      <v-slider label="Weeks" v-model="parts.w" max="3" thumb-label dense></v-slider>
      <v-slider label="Days" v-model="parts.d" max="29" thumb-label dense></v-slider>
      <v-slider label="Hours" v-model="parts.h" max="23" thumb-label dense></v-slider>
    </div>
</template>

<script>
  module.exports = {
    mixins: [field],
    props: {payload: Object},
    data () {
      return {
        parts: {
          Y: null,
          M: null,
          w: null,
          d: null,
          h: null,
          m: null,
          s: null
        },
        validators: {
          is_valid: true
        }
      }
    },
    watch: {
      parts: {
        handler (val) {
          this.val = this.toString()
        },
        deep: true
      }
    },
    methods: {
      toString () {
        let values = []
        for (let [name, value] of Object.entries(this.parts)) {
          if (value > 0) {
            values.push(`${Number(value)}${name}`)
          }
        }
        return values.join(" ")
      },
      fromString () {
        let parts = this.val.split(" ")
        parts.forEach((part) => {
          if (part.length < 2) return 
          let name = part.slice(-1)
          let value = part.slice(0, -1)
          this.parts[name] = value
        })
      }
    },
    mounted () {
      if (this.val) {
        this.fromString()
      }
    }
  }
</script>

<style>
.time-delta input {
  font-size: 32px;
  text-align: center;
}
.time-delta .v-messages__message {
  text-align: center;
}
</style>