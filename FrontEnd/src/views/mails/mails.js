import emailNavigation from '../../components/emailnavigation'
import fullEmail from '../../components/fullemail'
import emailListItem from '../../components/emaillistitem'
export default {
  name: 'mails',
  components: { emailNavigation, fullEmail, emailListItem },
  props: [],
  data () {
    return {
      openMail: null,
      selected: [],
      sortingSelection: [
        'Date',
        'From',
        'Subject'
      ],
      item:
        {
          hash: 'abc123',
          from: 'John Lennon',
          star: false,
          subject: 'All my troubles seemed so far away',
          // body: 'hoi<img src="#" onerror=alert("hoi") />',
          body: 'Yesterday, all my troubles seemed so far away<br>Now it looks as though they\'re here to stay<br>Oh, I believe in yesterday<br><br>Suddenly, I\'m not half the man I used to be<br>There\'s a shadow hanging over me<br>Oh, yesterday came suddenly<br><br>Why she had to go I don\'t know she wouldn\'t say<br>I said something wrong, now I long for yesterday<br><br>Yesterday, love was such an easy game to play<br>Now I need a place to hide away<br>Oh, I believe in yesterday<br><br>Why she had to go I don\'t know she wouldn\'t say<br>I said something wrong, now I long for yesterday<br><br>Yesterday, love was such an easy game to play<br>Now I need a place to hide away<br>Oh, I believe in yesterday<br>Mm mm mm mm mm mm mm<br><br>',
          timestamp: 'Yesterday'
        }

    }
  },
  computed: {

  },
  mounted () {

  },
  methods: {
    openTheMail (mail) {
      this.openMail = mail
    }
  }
}
