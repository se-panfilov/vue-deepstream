const exports = {}
export default exports

/**
 * Warn stuff
 */
export function warn (msg) {
  if (window.console) {
    console.warn(`[vue-deepstream] ${msg}`)
    if (!exports.Vue || exports.Vue.config.debug) {
      console.warn(new Error('warning stack trace:').stack)
    }
  }
}
