import { range } from '@/domain/utils'
import { assert } from 'chai'

describe('Unit Tests', () => {
  describe('Utils', () => {
    describe('range', () => {
      it('should return list of numbers inclusive of start and end', () => {
        const start = 0
        const end = 2
        const list = range(start, end)
        assert.isArray(list)
        assert.equal(list[0], 0)
        assert.equal(list[1], 1)
        assert.equal(list[2], 2)
      })

      it('should return allow starting at non zero number', () => {
        const start = 1
        const end = 2
        const list = range(start, end)
        assert.isArray(list)
        assert.equal(list[0], 1)
        assert.equal(list[1], 2)
      })

      it('should return list of single number if start and end are the same', () => {
        const start = 2
        const end = 2
        const list = range(start, end)
        assert.isArray(list)
        assert.equal(list.length, 1)
        assert.equal(list[0], 2)
      })

      it('should return list of numbers in descending order', () => {
        const start = 7
        const end = 5
        const list = range(start, end)
        assert.isArray(list)
        assert.equal(list[0], 7)
        assert.equal(list[1], 6)
        assert.equal(list[2], 5)
      })
    })
  })
})
