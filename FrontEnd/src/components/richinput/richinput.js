import { VueEditor } from 'vue2-editor'
export default {
  name: 'richinput',
  components: { VueEditor },
  props: ['fullToolbar'],
  data () {
    return {
      customToolbar: [['bold', 'italic', 'underline'], [{ list: 'ordered' }, { list: 'bullet' }], ['image', 'code-block']]
    }
  },
  computed: {

  },
  mounted () {

  },
  methods: {

  }
}
