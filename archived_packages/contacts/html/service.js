const headers = { headers: { 'Content-Type': 'application/json' } }
export default ({
  getContacts () {
    return axios.post(`${window.config.jsApiUrl}contacts/list`)
  },
  updateOrCreate (contact) {
    return axios.post(`${window.config.jsApiUrl}contacts/put`, {
      args: {
        contact
      }
    }, headers)
  },
  deleteContact (id) {
    return axios.post(`${window.config.jsApiUrl}contacts/remove`, {
      args: {
        contact_id: id
      }
    }, headers)
  }
})
