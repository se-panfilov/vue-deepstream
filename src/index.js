import ds from 'deepstream.io-client-js'
import util, { warn } from './utils'
import override from './override'

let Vue

class VueDeepstream {
  constructor ({
    host = 'localhost',
    port = 8745
  } = {}) {
    if (!Vue) {
      throw new Error('[vue-deepstream] must call Vue.use(VueDeepstream) before creating an instance.')
    }

    // Connection params
    this.host = host
    this.port = port
    this.client = null
  }

  connect () {
    this.client = ds(`${this.host}:${this.port}`)

    return this
  }
}

VueDeepstream.installed = false

VueDeepstream.install = function (_Vue) {
  if (VueDeepstream.installed) {
    warn('already installed')
    return
  }

  Vue = _Vue
  util.Vue = Vue
  override(Vue)
  VueDeepstream.installed = true
}

// auto install
if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(VueDeepstream)
}

export default VueDeepstream
