<template>
  <v-app id="inspire">
      <v-container
        class="fill-height"
        fluid
      >
        <v-row
          align="center"
          justify="center"
        >
          <v-col
            cols="12"
            sm="8"
            md="4"
          >
            <v-card class="elevation-12">
              <v-toolbar
                color="primary"
                dark
                flat
              >
                <v-toolbar-title>Fund a Stellar address</v-toolbar-title>
              </v-toolbar>
              <v-card-text>
                <v-form v-on:submit.prevent="fundAddress">
                  <v-text-field v-model="address" required placeholder="Address" />
                  <p v-if="error">{{ error }}</p>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer />
                <v-btn
                  color="primary"
                  class="ma-2"
                  :loading="loading"
                  :disabled="loading || address === ''"
                  v-on:click="fundAddress()">
                  Fund
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
  </v-app>
</template>

<script lang="ts">
/* eslint-disable no-console */
import { fundAccount } from "../../actions/fundAccount"
export default {
  data() {
    return {
      error: "",
      address: "",
      loading: false
    }
  },
  methods: {
    fundAddress() {
      this.loading = true
      fundAccount(this.address)
        .then(res => {
          if (res.status == 200) {
            this.loading = false
            this.$toasted.success("Address funded successfully")
          }
        })
        .catch(() => {
          this.loading = false
          this.$toasted.error("Something went wrong!")
        })
    }
  },
  name: "FundAccount"
}
</script>
