module.exports = {
  name: 'contacts',
  components: {
    fullContact: httpVueLoader('contacts/components/fullcontact/index.vue'),
    contactListItem: httpVueLoader('contacts/components/contactlistitem/index.vue')
  },
  props: [],
  data () {
    return {
      openContact: null,
      newContact: {},
      addContactDialog: false,
      sortingSelection: [
        'Name',
        'Recent'
      ]
    }
  },
  computed: {
    ...window.vuex.mapGetters([
      'contacts'
    ])
  },
  mounted () {
    this.getContacts()
  },
  methods: {
    ...window.vuex.mapActions([
      'getContacts',
      'createContact'
    ]),
    deleteContact (contactId) {
      this.openContact = null
    },
    clearAndClose () {
      this.newContact = {}
      this.addContactDialog = false
    }
  }
}
