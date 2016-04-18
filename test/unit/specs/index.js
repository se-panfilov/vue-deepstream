import Vue from 'vue'
import VueDeepstream from '../mocks/vue-deepstream-mock'
import { mountFoo } from '../utils/component-generator'

Vue.use(VueDeepstream)

describe('VueDeepstream.core', () => {
  let deepstream
  let Foo

  beforeEach(() => {
    Foo = require('../mocks/Foo')
    deepstream = new VueDeepstream()
    deepstream.connect()
  })

  it('should inject $ds into the root component', function () {
    const vm = new Vue({
      deepstream
    }).$mount()

    expect(vm.$ds).toBeDefined()
  })

  it('should inject $ds into child components', function () {
    const vm = mountFoo(deepstream, Foo)

    expect(vm.$ds).toBeDefined()
    expect(vm.$refs.foo.$ds).toBeDefined()
  })
})
