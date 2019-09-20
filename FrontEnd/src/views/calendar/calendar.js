export default {
  name: 'calendar',
  components: {},
  props: [],
  data () {
    return {
      today: '2019-01-08',
      events: [
        {
          name: 'Weekly Meeting',
          start: '2019-01-07 09:00',
          end: '2019-01-07 10:00'
        },
        {
          name: 'Thomas\' Birthday',
          start: '2019-01-10'
        },
        {
          name: 'Mash Potatoes',
          start: '2019-01-09 12:30',
          end: '2019-01-09 15:30'
        }
      ]
    }
  },
  computed: {

  },
  mounted () {
    this.$refs.calendar.scrollToTime('08:00')
  },
  methods: {

  }
}
