import { warn } from './utils'

export default function (Vue) {
  const _init = Vue.prototype._init
  Vue.prototype._init = function (options = {}) {
    options.init = options.init
      ? [dsInit].concat(options.init)
      : dsInit

    _init.call(this, options)
  }

  const _destroy = Vue.prototype._destroy
  Vue.prototype._destroy = function () {
    if (this.$_ds) {
      const { on, once } = this.$_ds

      if (on) {
        for (let event in on) {
          this.$ds.client.off(event, on[event])
        }
      }

      if (once) {
        for (let event in once) {
          this.$ds.client.off(event, once[event])
        }
      }
    }

    _destroy.apply(this, arguments)
  }

  function dsInit () {
    const _this = this
    const options = this.$options
    const { deepstream, ds } = options

    // deepstream injection
    if (deepstream) {
      this.$ds = deepstream
    } else if (options.parent && options.parent.$ds) {
      this.$ds = options.parent.$ds
    }

    if (ds) {
      if (!this.$ds) {
        warn('deepstream not injected. Make sure to provide deepstream option in yout root component.')
      }

      this.$_ds = {}

      let { on, once, emit, rpc } = ds
      let make, provide
      if (rpc) {
        make = rpc.make
        provide = rpc.provide
      }

      if (on) {
        this.$_ds.on = {}
        for (let event in on) {
          this.$_ds.on[event] = function () {
            on[event].apply(_this, arguments)
          }
          this.$ds.client.on(event, this.$_ds.on[event])
        }
      }

      if (once) {
        this.$_ds.once = {}
        for (let event in once) {
          this.$_ds.once[event] = function () {
            once[event].apply(_this, arguments)
          }
          this.$ds.client.once(event, this.$_ds.once[event])
        }
      }

      if (emit) {
        options.methods = options.methods || {}
        for (let event in emit) {
          options.methods[event] = makeBoundEmit(event, emit[event], this.$ds)
        }
      }

      if (make) {
        options.methods = options.methods || {}
        for (let rpc in make) {
          options.methods[rpc] = makeBoundMake(rpc, make[rpc], this.$ds)
        }
      }

      if (provide) {
        // TODO implement feature later
      }
    }

    function makeBoundEmit (event, emit, ds) {
      return function boundEmit (...args) {
        const emitArgs = emit.apply(_this, args)
        ds.client.emit(event, emitArgs)

        return emitArgs
      }
    }

    function makeBoundMake (rpc, fn, ds) {
      return function boundMake (data) {
        data = data || {}
        ds.client.rpc.make(rpc, data, (e, r) => { fn.call(_this, e, r) })
      }
    }
  }
}
