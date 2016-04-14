import Vue from 'vue'
import VueDeepstream from '../mocks/vue-deepstream-mock'

Vue.use(VueDeepstream)

let deepstream
let Foo
let Bar

function mountFoo () {
  const vm = new Vue({
    deepstream,
    template: '<div><foo v-ref:foo></foo></div>',
    components: {
      Foo
    }
  }).$mount()

  return vm
}

function mountBar () {
  const vm = new Vue({
    deepstream,
    template: '<div><bar v-ref:bar></bar></div>',
    components: {
      Bar
    }
  }).$mount()

  return vm
}

function mountFooBar () {
  const vm = new Vue({
    deepstream,
    template: '<div><foo v-ref:foo></foo><bar v-ref:bar></bar></div>',
    components: {
      Foo,
      Bar
    }
  }).$mount()

  return vm
}

describe('VueDeepstream', () => {
  beforeEach(() => {
    Foo = require('./Foo')
    Bar = require('./Bar')
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
    const vm = mountFoo()

    expect(vm.$ds).toBeDefined()
    expect(vm.$refs.foo.$ds).toBeDefined()
  })

  it('should create a wrapper function for every \'on\' and \'once\' subscribed event', function () {
    const vm = mountBar()

    expect(vm.$refs.bar.$_ds).toBeDefined()
    expect(vm.$refs.bar.$options.ds.on.length).toBe(vm.$refs.bar.$_ds.on.length)
    expect(vm.$refs.bar.$options.ds.once.length).toBe(vm.$refs.bar.$_ds.once.length)
  })

  it('should trigger subscribed \'on\' events correctly', function () {
    const vm = mountFoo()

    expect(vm.$refs.foo.counter).toEqual(0)
    deepstream.client.emit('foo')
    deepstream.client.emit('foo')
    expect(vm.$refs.foo.counter).toEqual(2)
  })

  it('should trigger subscribed \'once\' events correctly', function () {
    const vm = mountBar()

    expect(vm.$refs.bar.counter).toEqual(0)
    deepstream.client.emit('bar')
    deepstream.client.emit('bar')
    expect(vm.$refs.bar.counter).toEqual(-1)
  })

  it('should trigger subscribed \'on\' events on several objects', function () {
    const vm = mountFooBar()

    expect(vm.$refs.foo.counter).toEqual(0)
    expect(vm.$refs.bar.counter).toEqual(0)
    deepstream.client.emit('foo')
    deepstream.client.emit('foo')
    expect(vm.$refs.foo.counter).toEqual(2)
    expect(vm.$refs.bar.counter).toEqual(2)
  })

  it('should trigger multiple subscribed events correctly', function () {
    const vm = mountFooBar()

    expect(vm.$refs.foo.counter).toEqual(0)
    expect(vm.$refs.bar.counter).toEqual(0)
    deepstream.client.emit('foo')
    deepstream.client.emit('foo')
    deepstream.client.emit('bar')
    deepstream.client.emit('foo')
    deepstream.client.emit('bar')
    expect(vm.$refs.foo.counter).toEqual(3)
    expect(vm.$refs.bar.counter).toEqual(2)
  })

  it('should unsubscribe events when object is destroyed', function () {
    const vm = mountFooBar()

    expect(deepstream.client.listeners('foo').length).toEqual(2)
    vm.$refs.foo.$destroy()
    expect(deepstream.client.listeners('foo').length).toEqual(1)
  })

  describe('when emits have one argument of a primitive type', subscriptionsAreCalled(1))

  describe('when emits have one argument of a non primitive type', subscriptionsAreCalled({ a: 1, b: ['a', 'b'], c: false }))

  describe('when emits have several arguments of a primitive type', subscriptionsAreCalled(1, 'string', false, null))

  describe('when emits have several arguments', subscriptionsAreCalled({ a: 1, b: ['a', 'b'], c: false }, 'string', false, [1, 2, 3]))
})

function subscriptionsAreCalled (...parameters) {
  return function () {
    it('\'once\' subscriptions should receive the correct number of parameters and the right parameters', function () {
      const vm = mountFoo()

      spyOn(vm.$refs.foo.$options.ds.once, 'toOnce').and.callThrough()
      deepstream.client.emit.apply(deepstream.client, ['toOnce'].concat(parameters))
      expect(vm.$refs.foo.$options.ds.once.toOnce).toHaveBeenCalled()
      expect(vm.$refs.foo.$options.ds.once.toOnce.calls.argsFor(0)).toEqual(parameters)
    })

    it('\'on\' subscriptions should receive the correct number of parameters and the right parameters', function () {
      const vm = mountFoo()

      spyOn(vm.$refs.foo.$options.ds.on, 'toOn').and.callThrough()
      deepstream.client.emit.apply(deepstream.client, ['toOn'].concat(parameters))
      expect(vm.$refs.foo.$options.ds.on.toOn).toHaveBeenCalled()
      expect(vm.$refs.foo.$options.ds.on.toOn.calls.argsFor(0)).toEqual(parameters)
    })
  }
}
