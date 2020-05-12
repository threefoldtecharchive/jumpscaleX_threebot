validators = {
  common: {
    required: (field) => {
      return field.val !== undefined ? true : 'Field is required'
    },
    min_length: (field, length) => {
      if (field.val !== undefined) {
        return field.val.length >= length ? true : `Value length is too small, minimum value is ${length}`
      }
    },
    max_length: (field, length) => {
      if (field.val !== undefined) {
        return field.val.length <= length ? true : `Value length is too large, maximum value is ${length}`
      }
    }
  },
  string_ask: {

  },
  int_ask: {
    min: (field, min) => {
      if (field.val !== undefined) {
        return field.val >= min ? true : `Value is too small, minimum value is ${min}`
      }
    },
    max: (field, max) => {
      if (field.val !== undefined) {
        return field.val <= max ? true : `Value is too large, maximum value is ${max}`
      }
    }
  },
  secret_ask: {

  },
  text_ask: {

  },
  single_choice: {

  },
  multi_choice: {
    min_options: (field, min) => {
      if (field.val !== undefined) {
        return field.val.length >= min ? true : `Required at least ${min} options`
      }
    },
    max_options: (field, max) => {
      if (field.val !== undefined) {
        return field.val.length >= max ? true : `You cannnot choose more than ${max} options`
      }
    },
    required: (field) => {
      return field.val !== undefined && field.val.length > 0 ? true : 'Field is required'
    },
  },
  drop_down_choice: {

  },
  datetime_picker: {
    is_valid: (field) => {
      if (field.val !== undefined) {
        return new Date(field.val * 1000) !== "Invalid date" ? true : "Invalid date"
      }
    },
    future: (field) => {
      if (field.val !== undefined) {
        return field.val > new Date().getTime() / 1000 ? true : "Date must not be in the past"
      }
    },
    min_time: (field, args) => {
      if (field.val !== undefined) {
        var message = args.length >= 2 ? args[1] : "Date must be in the future";
        return field.val > Date.now() / 1000 + args[0] ? true : message
      }
    }
  },
  time_delta: {

  },
  location_ask: {
    is_valid: (field) => {
      if (field.val !== undefined) {
        return field.val === [0, 0] ? "Invalid location" : true
      }
    },
    required: (field) => {
      if (field.val !== undefined) {
        return field.val.length == 2 ? true : 'Field is required'
      }
    },
  },
  upload_file: {
    max_size: (field, size) => {
      if (field.file) {
        return field.file.size >= size ? `File is too large, max allowed size is ${size}` : true
      }
    },
    allowed_types: (field, types) => {
      if (field.file && types) {
        return types.includes(field.file.type) ? true : `Invalid file type, allowed types ${types.join(',')}`
      }
    }
  },
  captcha_ask: {
    is_valid: (field) => {
      if (field.val !== undefined) {
        return field.val === field.payload.value ? true : `Invalid captcha, please try again`
      }
    }
  },
}


field = {
  props: ["value"],
  data() {
    return {
      validators: {},
    }
  },
  computed: {
    val: {
      get() {
        return this.value
      },
      set(value) {
        this.$emit('input', value)
      }
    },
    rules() {
      return [this.validate]
    },
    commonValidators() {
      return Object.keys(validators.common)
    },
    categoryValidators() {
      if (validators.hasOwnProperty(this.payload.category)) {
        return Object.keys(validators[this.payload.category])
      } else {
        return []
      }
    }
  },
  methods: {
    validate() {
      let fieldValidators = { ...this.validators, ...this.payload.kwargs }
      for (let [key, value] of Object.entries(fieldValidators)) {
        let validator = null
        if (this.categoryValidators.includes(key)) {
          validator = validators[this.payload.category][key]
        } else if (this.commonValidators.includes(key)) {
          validator = validators.common[key]
        }
        if (validator) {
          let result = validator(this, value)
          if (result !== true && result !== undefined) return result
        }
      }
      return true
    }
  },
  mounted() {
    if (this.val === undefined || (Array.isArray(this.val) && this.val.length === 0)) {
      if (this.payload.kwargs.default) {
        this.val = this.payload.kwargs.default
      }
    }
  }
}
