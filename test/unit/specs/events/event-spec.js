import Vue from 'vue'
import VueDeepstream from '../../mocks/vue-deepstream-mock'
import { mountFoo, mountBar, mountFooBar } from '../../utils/component-generator'

Vue.use(VueDeepstream)

describe('VueDeepstream.events', () => {
  let deepstream
  let Foo
  let Bar
  let vm

  beforeEach(() => {
    Foo = require('../../mocks/Foo')
    Bar = require('../../mocks/Bar')
    deepstream = new VueDeepstream()
    deepstream.connect()
  })

  it('should create a wrapper function for every \'on\' subscribed event', function () {
    vm = mountBar(deepstream, Bar)
    expect(vm.$refs.bar.$options.ds.on.length).toBe(vm.$refs.bar.$_ds.on.length)
  })

  it('should create a wrapper function for every \'once\' subscribed event', function () {
    expect(vm.$refs.bar.$options.ds.once.length).toBe(vm.$refs.bar.$_ds.once.length)
  })

  it('should trigger subscribed \'once\' events correctly', function () {
    vm = mountBar(deepstream, Bar)

    expect(vm.$refs.bar.counter).toEqual(0)
    deepstream.client.emit('bar')
    deepstream.client.emit('bar')
    expect(vm.$refs.bar.counter).toEqual(-1)
  })

  it('should trigger subscribed \'on\' events correctly', function () {
    vm = mountFoo(deepstream, Foo)

    expect(vm.$refs.foo.counter).toEqual(0)
    deepstream.client.emit('foo')
    deepstream.client.emit('foo')
    expect(vm.$refs.foo.counter).toEqual(2)
  })

  it('should trigger subscribed \'on\' events on several objects', function () {
    vm = mountFooBar(deepstream, Foo, Bar)

    expect(vm.$refs.foo.counter).toEqual(0)
    expect(vm.$refs.bar.counter).toEqual(0)
    deepstream.client.emit('foo')
    deepstream.client.emit('foo')
    expect(vm.$refs.foo.counter).toEqual(2)
    expect(vm.$refs.bar.counter).toEqual(2)
  })

  it('should trigger multiple subscribed events correctly', function () {
    vm = mountFooBar(deepstream, Foo, Bar)

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
    vm = mountFooBar(deepstream, Foo, Bar)

    expect(deepstream.client.listeners('foo').length).toEqual(2)
    vm.$refs.foo.$destroy()
    expect(deepstream.client.listeners('foo').length).toEqual(1)
  })

  describe('when emits have one argument of a primitive type', subscriptionsAreCalled(1))

  describe('when emits have one argument of a non primitive type', subscriptionsAreCalled({ a: 1, b: ['a', 'b'], c: false }))

  describe('when emits have several arguments of a primitive type', subscriptionsAreCalled(1, 'string', false, null))

  describe('when emits have several arguments', subscriptionsAreCalled({ a: 1, b: ['a', 'b'], c: false }, 'string', false, [1, 2, 3]))

  function subscriptionsAreCalled (...parameters) {
    return function () {
      it('\'once\' subscriptions should receive the correct number of parameters and the right parameters', function () {
        const vm = mountFoo(deepstream, Foo)

        spyOn(vm.$refs.foo.$options.ds.once, 'toOnce').and.callThrough()
        deepstream.client.emit.apply(deepstream.client, ['toOnce'].concat(parameters))
        expect(vm.$refs.foo.$options.ds.once.toOnce).toHaveBeenCalled()
        expect(vm.$refs.foo.$options.ds.once.toOnce.calls.argsFor(0)).toEqual(parameters)
      })

      it('\'on\' subscriptions should receive the correct number of parameters and the right parameters', function () {
        const vm = mountFoo(deepstream, Foo)

        spyOn(vm.$refs.foo.$options.ds.on, 'toOn').and.callThrough()
        deepstream.client.emit.apply(deepstream.client, ['toOn'].concat(parameters))
        expect(vm.$refs.foo.$options.ds.on.toOn).toHaveBeenCalled()
        expect(vm.$refs.foo.$options.ds.on.toOn.calls.argsFor(0)).toEqual(parameters)
      })
    }
  }
})
