require('deepstream.io-client-js')
require('es6-promise').polyfill()

var Vue = require('vue')
var VueDeepstream = require('../../../src').default

Vue.use(VueDeepstream)

describe('Mock', function () {
  it('should pass', function () {
    expect(true).toBeTruthy()
  })
})
