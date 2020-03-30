import contactService from './service.js'

export const state = {
  contacts: []
}
export const actions = {
  getContacts: (context) => {
    contactService.getContacts().then((response) => {
      context.commit('setContacts', response.data.contacts)
    }).catch((error) => {
      console.error(error)
    })
  },
  deleteContact: (context, contactId) => {
    contactService.deleteContact(contactId).then((response) => {
      context.dispatch('getContacts')
    }).catch((error) => {
      console.error(error)
    })
  },
  createContact: (context, contact) => {
    contactService.updateOrCreate(contact).then((response) => {
      context.dispatch('getContacts')
    }).catch((error) => {
      console.error(error)
    })
  }
}
export const mutations = {
  setContacts: (state, contact) => {
    state.contacts = contact
  }
}
export const getters = {
  contacts: (state) => state.contacts
}
