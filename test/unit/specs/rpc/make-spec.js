import Vue from 'vue'
import VueDeepstream from '../../../../src'
import { mountBar } from '../../utils/component-generator'

Vue.use(VueDeepstream)

describe('VueDeepstream.rpc', () => {
  const makeFncName = 'add-two-numbers'
  let vm
  let Bar
  let deepstream

  describe('make', () => {
    let callback = jasmine.createSpy('make callback')

    beforeEach(() => {
      Bar = require('../../mocks/Bar')
      Bar.ds.rpc = {
        make: {
          [makeFncName]: callback
        }
      }

      deepstream = new VueDeepstream()
      deepstream.connect()
    })

    it('should be defined', () => {
      vm = mountBar(deepstream, Bar)
      expect(vm.$refs.bar[makeFncName]).toBeDefined()
    })

    it('should be a function', () => {
      expect(typeof vm.$refs.bar[makeFncName] === 'function')
    })

    describe('when make is called', () => {
      let bar
      let arg
      let rpc

      beforeAll(() => {
        bar = vm.$refs.bar
        arg = 'dummy data'
        rpc = bar.$ds.client.rpc
        spyOn(bar, makeFncName).and.callThrough()
        spyOn(rpc, 'make').and.callFake((rpc, data, fn) => {
          fn('ERROR_CODE', { val: 10, type: 'foobar' })
        })
      })

      it('should trigger wrapper function', () => {
        bar[makeFncName](arg)
        expect(bar[makeFncName]).toHaveBeenCalledTimes(1)
      })

      it('should receive the correct arguments', () => {
        expect(bar[makeFncName]).toHaveBeenCalledWith(arg)
      })

      it('should call rpc.make with the right parameters', () => {
        const args = rpc.make.calls.argsFor(0)
        expect(args[0]).toEqual(makeFncName)
        expect(args[1]).toEqual(arg)
        expect(typeof args[2]).toEqual('function')
      })

      it('should trigger the callback with the right arguments', () => {
        expect(callback).toHaveBeenCalledWith('ERROR_CODE', { val: 10, type: 'foobar' })
      })
    })
  })
})
