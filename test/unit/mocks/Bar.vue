<script>
  export default {
    template: '<span>{{ msg }}</span>',
    data () {
      return {
        msg: 'Hello Bar',
        counter: 0
      }
    },
    ds: {
      on: {
        foo () {
          this.counter++
        }
      },
      once: {
        bar () {
          this.counter--
        }
      }
    }
  }
</script>
