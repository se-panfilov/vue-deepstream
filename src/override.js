import { warn } from './utils'

export default function (Vue) {
  const _init = Vue.prototype._init
  Vue.prototype._init = function (options = {}) {
    options.init = options.init
      ? [dsInit].concat(options.init)
      : dsInit
    _init.call(this, options)
  }

  function dsInit () {
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

      let { on, once, emit } = ds

      if (on) {
        for (let event in on) {
          boundListener.call(this, 'on', event, on[event])
        }
      }

      if (once) {
        for (let event in once) {
          boundListener.call(this, 'once', event, once[event])
        }
      }

      if (emit) {
        options.methods = options.methods || {}
        for (let event in emit) {
          options.methods[event] = makeBoundEmit(event, emit[event], this.$ds)
        }
      }
    }
  }

  function boundListener (listenerType, event, callback) {
    this.$ds.client[listenerType](event, (...args) => {
      callback.call(this, ...args)
    })
  }

  function makeBoundEmit (event, emit, ds) {
    return function boundEmit (...args) {
      const emitArgs = emit.call(this, ...args)
      ds.client.emit(event, emitArgs)

      return emitArgs
    }
  }
}
