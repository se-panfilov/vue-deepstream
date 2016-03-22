import VueDeepstream from '../../../src'
import ClientMock from './client-mock'

class VueDeepstreamMocks extends VueDeepstream {
  constructor (init = {}) {
    super(init)
  }

  connect () {
    this.client = new ClientMock()

    return this
  }
}

export default VueDeepstreamMocks
