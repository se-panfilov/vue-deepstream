<script>
  export default {
    template: '<span>{{ msg }}</span>',
    data () {
      return {
        msg: 'Hello Foo',
        counter: 0,
        to: null
      }
    },
    ds: {
      on: {
        foo () {
          // console.log('called', require('util').inspect(this, { depth: 0 }))
          this.counter++
        },
        toOn (val) {
          this.to = val
        }
      },
      once: {
        toOnce (val) {
          this.to = val
        }
      }
    }
  }
</script>
