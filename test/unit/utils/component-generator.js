import Vue from 'vue'

export const mountFoo = function (deepstream, Foo) {
  const vm = new Vue({
    deepstream,
    template: '<div><foo v-ref:foo></foo></div>',
    components: {
      Foo
    }
  }).$mount()

  return vm
}

export const mountBar = function (deepstream, Bar) {
  const vm = new Vue({
    deepstream,
    template: '<div><bar v-ref:bar></bar></div>',
    components: {
      Bar
    }
  }).$mount()

  return vm
}

export const mountFooBar = function (deepstream, Foo, Bar) {
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
