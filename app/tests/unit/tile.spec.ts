import { Position } from '@/domain/position'
import { Tile } from '@/domain/tile'
import { assert } from 'chai'

describe('Unit Tests', () => {
  describe('Tile', () => {
    describe('combine', () => {
      it('should add other tile value to this tile', () => {
        const aTile = new Tile(new Position({ x: 0, y: 0 }), 4)
        const bTile = new Tile(new Position({ x: 0, y: 0 }), 5)

        aTile.combine(bTile)
        assert.equal(aTile.value, 9)
      })
      it('should destroy other tile', () => {
        const aTile = new Tile(new Position({ x: 0, y: 0 }), 4)
        const bTile = new Tile(new Position({ x: 0, y: 0 }), 5)

        aTile.combine(bTile)
        assert.isTrue(bTile.destroyed)
        assert.isFalse(aTile.destroyed)
      })
      it('should update this tile position', () => {
        const bTilesPosition = { x: 0, y: 2 }
        const aTile = new Tile(new Position({ x: 1, y: 1 }), 4)
        const bTile = new Tile(new Position(bTilesPosition), 5)

        aTile.combine(bTile)
        assert.equal(aTile.position.y, bTilesPosition.y)
        assert.equal(aTile.position.x, bTilesPosition.x)
      })
      it('should mark as dirty', () => {
        const aTile = new Tile(new Position({ x: 0, y: 0 }), 4)
        const bTile = new Tile(new Position({ x: 0, y: 0 }), 5)

        aTile.combine(bTile)
        assert.isTrue(aTile.isDirty)
      })
      it('should mark as combined', () => {
        const aTile = new Tile(new Position({ x: 0, y: 0 }), 4)
        const bTile = new Tile(new Position({ x: 0, y: 0 }), 5)

        aTile.combine(bTile)
        assert.isTrue(aTile.combined)
      })
    })
    describe('destroy', () => {
      it('should mark as destroyed', () => {
        const tile = new Tile(new Position({ x: 0, y: 0 }), 4)
        tile.destroy()
        assert.isTrue(tile.destroyed)
      })
      it('should mark tile as dirty', () => {
        const tile = new Tile(new Position({ x: 0, y: 0 }), 4)
        tile.destroy()
        assert.isTrue(tile.isDirty)
      })
      it('should set value to 0', () => {
        const tile = new Tile(new Position({ x: 0, y: 0 }), 4)
        tile.destroy()
        assert.equal(tile.value, 0)
      })
    })
    describe('set position', () => {
      it('should mark as dirty', () => {
        const tile = new Tile(new Position({ x: 0, y: 0 }), 4)
        tile.position = new Position({ x: 1, y: 0 })
        assert.isTrue(tile.isDirty)
      })
    })
  })
})
