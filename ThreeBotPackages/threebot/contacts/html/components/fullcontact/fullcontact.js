const cloneDeep = function (x) {
  return JSON.parse(JSON.stringify(x))
}
module.exports = {
  name: 'fullcontact',
  components: {},
  props: {
    editable: {
      type: Boolean,
      default: false
    },
    contact: {
      type: Object,
      default: () => {
        return {
          addresses: [{}],
          email: [{}],
          phone_numbers: [{}]
        }
      }
    }
  },
  data () {
    return {
      salutations: window.config.salutations,
      description: window.config.description,
      edit: this.editable,
      currentContact: {
        addresses: [{}],
        email: [{}],
        phone_numbers: [{}]
      },
      birthDateDialog: false
    }
  },
  computed: {
    currentSalutations: {
      get () {
        return this.currentContact.salutation ? this.currentContact.salutation.split(',') : []
      },
      set (val) {
        this.currentContact.salutation = val.join(',')
      }
    }
  },
  mounted () {
    this.currentContact = cloneDeep(this.contact)
    this.edit = cloneDeep(this.editable)
  },
  methods: {
    ...window.vuex.mapActions([
      'deleteContact',
      'createContact'
    ]),
    updateFavorite (isFavorite) {
      this.currentContact.favorite = isFavorite
      this.createContact(this.currentContact)
    },
    openFilePicker () {
      this.$refs.image.click()
    },
    onFilePicked (e) {
      const files = e.target.files
      if (e.target.files && e.target.files[0]) {
        var fr = new window.FileReader()
        fr.addEventListener('load', (x) => {
          this.currentContact.picture = x.target.result
        })
        fr.readAsDataURL(files[0])
      }
    },
    updateContact () {
      if (this.$refs.contactForm.validate()) {
        for (let index = 0; index < this.currentContact.email.length; index++) {
          const element = this.currentContact.email[index]
          if (!element.email) {
            this.currentContact.email.splice(index, 1)
          }
        }
        for (let index = 0; index < this.currentContact.phone_numbers.length; index++) {
          const element = this.currentContact.phone_numbers[index]
          if (!element.number) {
            this.currentContact.phone_numbers.splice(index, 1)
          }
        }
        for (let index = 0; index < this.currentContact.addresses.length; index++) {
          const element = this.currentContact.addresses[index]
          if (!element.street_name) {
            this.currentContact.addresses.splice(index, 1)
          }
        }
        this.createContact(this.currentContact)
        this.edit = false
        this.$emit('update')
      }
    },
    cancelUpdate () {
      this.currentContact = cloneDeep(this.contact)
      this.edit = false
      this.$refs.contactForm.resetValidation()
      this.$emit('cancel')
    },
    addPhoneNumber () {
      this.currentContact.phone_numbers.push({})
    },
    removeNumber (index) {
      // TODO show dialog "are you sure"
      this.currentContact.phone_numbers.splice(index, 1)
    },
    addAddress () {
      this.currentContact.addresses.push({})
    },
    removeAddress (index) {
      // TODO show dialog "are you sure"
      this.currentContact.addresses.splice(index, 1)
    },
    addEmail () {
      this.currentContact.email.push({})
    },
    removeEmail (index) {
      // TODO show dialog "are you sure"
      this.currentContact.email.splice(index, 1)
    },
    deleteThisContact () {
      // TODO show dialog "are you sure"
      this.deleteContact(this.currentContact.id)
      this.$emit('delete:contact', this.currentContact.id)
    }
  },
  watch: {
    edit: {
      immediate: true,
      handler (val) {
        if (val) {
          if (!this.currentContact.phone_numbers.length) this.currentContact.phone_numbers.push({})
          if (!this.currentContact.email.length) this.currentContact.email.push({})
          if (!this.currentContact.addresses.length) this.currentContact.addresses.push({})
        }
      }
    }
  }
}
