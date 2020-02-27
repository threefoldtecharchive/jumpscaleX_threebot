module.exports = new Promise(async (resolve, reject) => {
  const vuex = await import(
    "/weblibs/vuex/vuex.esm.browser.js"
  );

  resolve({
    name: "App",
    components: {
      navigation: "url:../Components/Navigation/index.vue"
    },
  })
})
