import Vue from 'vue'
import VueDeepstream from '../mocks/vue-deepstream-mock'

Vue.use(VueDeepstream)

let deepstream
let Foo
let Bar

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
    const vm = new Vue({
      deepstream,
      template: '<div><foo></foo></div>',
      components: {
        Foo
      }
    }).$mount()

    expect(vm.$ds).toBeDefined()
    expect(vm.$children[0].$ds).toBeDefined()
  })

  it('should create a wrapper function for every \'on\' and \'once\' subscribed event', function () {
    const vm = new Vue({
      deepstream,
      template: '<div><bar></bar></div>',
      components: {
        Bar
      }
    }).$mount()

    expect(vm.$children[0].$_ds).toBeDefined()
    expect(vm.$children[0].$options.ds.on.length).toBe(vm.$children[0].$_ds.on.length)
    expect(vm.$children[0].$options.ds.once.length).toBe(vm.$children[0].$_ds.once.length)
  })

  it('should trigger subscribed \'on\' events correctly', function () {
    const vm = new Vue({
      deepstream,
      template: '<div><foo></foo></div>',
      components: {
        Foo
      }
    }).$mount()

    expect(vm.$children[0].counter).toEqual(0)
    deepstream.client.emit('foo')
    deepstream.client.emit('foo')
    expect(vm.$children[0].counter).toEqual(2)
  })

  it('should trigger subscribed \'once\' events correctly', function () {
    const vm = new Vue({
      deepstream,
      template: '<div><bar></bar></div>',
      components: {
        Bar
      }
    }).$mount()

    expect(vm.$children[0].counter).toEqual(0)
    deepstream.client.emit('bar')
    deepstream.client.emit('bar')
    expect(vm.$children[0].counter).toEqual(-1)
  })

  it('should trigger subscribed \'on\' events on several objects', function () {
    const vm = new Vue({
      deepstream,
      template: '<div><foo></foo><bar></bar></div>',
      components: {
        Foo,
        Bar
      }
    }).$mount()

    expect(vm.$children[0].counter).toEqual(0)
    expect(vm.$children[1].counter).toEqual(0)
    deepstream.client.emit('foo')
    deepstream.client.emit('foo')
    expect(vm.$children[0].counter).toEqual(2)
    expect(vm.$children[1].counter).toEqual(2)
  })

  it('should trigger multiple subscribed events correctly', function () {
    const vm = new Vue({
      deepstream,
      template: '<div><foo></foo><bar></bar></div>',
      components: {
        Foo,
        Bar
      }
    }).$mount()

    expect(vm.$children[0].counter).toEqual(0)
    expect(vm.$children[1].counter).toEqual(0)
    deepstream.client.emit('foo')
    deepstream.client.emit('foo')
    deepstream.client.emit('bar')
    deepstream.client.emit('foo')
    deepstream.client.emit('bar')
    expect(vm.$children[0].counter).toEqual(3)
    expect(vm.$children[1].counter).toEqual(2)
  })

  it('should unsubscribe events when object is destroyed', function () {
    const vm = new Vue({
      deepstream,
      template: '<div><foo></foo><bar></bar></div>',
      components: {
        Foo,
        Bar
      }
    }).$mount()

    expect(deepstream.client.listeners('foo').length).toEqual(2)
    vm.$children[0].$destroy()
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
      const vm = new Vue({
        deepstream,
        template: '<div><foo></foo></div>',
        components: {
          Foo
        }
      }).$mount()
      spyOn(vm.$children[0].$options.ds.once, 'toOnce').and.callThrough()
      deepstream.client.emit('toOnce', ...parameters)
      expect(vm.$children[0].$options.ds.once.toOnce).toHaveBeenCalledWith(...parameters)
      expect(vm.$children[0].to).toEqual(parameters[0])
    })

    it('\'on\' subscriptions should receive the correct number of parameters and the right parameters', function () {
      const vm = new Vue({
        deepstream,
        template: '<div><foo></foo></div>',
        components: {
          Foo
        }
      }).$mount()
      spyOn(vm.$children[0].$options.ds.on, 'toOn').and.callThrough()
      deepstream.client.emit('toOn', ...parameters)
      expect(vm.$children[0].$options.ds.on.toOn).toHaveBeenCalledWith(...parameters)
      expect(vm.$children[0].to).toEqual(parameters[0])
    })
  }
}
