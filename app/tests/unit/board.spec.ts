import { Board } from '@/domain/board'
import { Moves, Direction, RowOrCol } from '@/domain/moves'
import { Position } from '@/domain/position'
import { Tile } from '@/domain/tile'
import { range } from '@/domain/utils'
import { assert } from 'chai'

describe('Unit Tests', () => {
  describe('Board', () => {
    describe('Moves', () => {
      it('RIGHT should move forward and group by rows', () => {
        assert.equal(Moves.RIGHT.shiftDirection, Direction.FORWARD)
        assert.equal(Moves.RIGHT.groupsBy, RowOrCol.ROW)
      })
      it('LEFT should move backward and group by rows', () => {
        assert.equal(Moves.LEFT.shiftDirection, Direction.BACKWARD)
        assert.equal(Moves.LEFT.groupsBy, RowOrCol.ROW)
      })
      it('DOWN should move forward and group by rows', () => {
        assert.equal(Moves.DOWN.shiftDirection, Direction.FORWARD)
        assert.equal(Moves.DOWN.groupsBy, RowOrCol.COLUMN)
      })
      it('UP should move backward and group by rows', () => {
        assert.equal(Moves.UP.shiftDirection, Direction.BACKWARD)
        assert.equal(Moves.UP.groupsBy, RowOrCol.COLUMN)
      })
    })
    describe('startNewGame', () => {
      it('should set score to 0', () => {
        const board = new Board()
        board['_score'] = 100
        assert.equal(board.score, 100)

        board.startNewGame()
        assert.equal(board.score, 0)
      })
      it('should set isGameOver to false', () => {
        const board = new Board()
        board['_isGameOver'] = true
        assert.isTrue(board.isGameOver)

        board.startNewGame()
        assert.isFalse(board.isGameOver)
      })
      it('should clear tiles and add two random tiles', () => {
        const board = new Board()
        board['_tiles'] = Array(5)
        assert.equal(board.tiles.length, 5)

        board.startNewGame()
        assert.equal(board.tiles.length, 2)
      })
    })
    describe('isGameOver', () => {
      it('should return true if there are no possible moves', () => {
        const board = new Board()
        board['_tiles'] = []

        // fill array
        range(0, 3).forEach((row) => {
          range(0, 3).forEach((col) => {
            board['_tiles'].push(
              new Tile(new Position({ x: row, y: col }), (col + 1) * ((row + 4) * 8))
            )
          })
        })

        // remove first element
        board['_tiles'].pop()

        board.applyMove(Moves.RIGHT)

        assert.isTrue(board.isGameOver)
      })
    })
    describe('isGameWon', () => {
      it('should return false if max tile value is less than 2048', () => {
        const board = new Board()
        board['_score'] = 4096

        assert.isAbove(board.score, 2048)
        assert.isFalse(board.isGameWon)
      })
      it('should return true if max tile value is 2048', () => {
        const board = new Board()
        board['_score'] = 500
        board['_tiles'] = [new Tile(new Position({ x: 0, y: 0 }), 2048)]

        assert.isTrue(board.isGameWon)
      })
      it('should return true if max tile value is greater than 2048', () => {
        const board = new Board()
        board['_score'] = 500
        board['_tiles'] = [new Tile(new Position({ x: 0, y: 0 }), 4096)]

        assert.isTrue(board.isGameWon)
      })
    })
    describe('applyMove', () => {
      it('RIGHT should shift tiles to far most right', () => {
        const tile1 = new Tile(new Position({ x: 0, y: 1 }), 2)
        const tile2 = new Tile(new Position({ x: 1, y: 2 }), 4)
        const tile3 = new Tile(new Position({ x: 1, y: 0 }), 8)
        const board = new Board()
        board['_tiles'] = [tile1, tile2, tile3]

        board.applyMove(Moves.RIGHT)

        assert.equal(board.tiles.length, 4)
        assert.equal(tile1.position.x, 0)
        assert.equal(tile1.position.y, 3)
        assert.equal(tile1.value, 2)
        assert.equal(tile2.position.x, 1)
        assert.equal(tile2.position.y, 3)
        assert.equal(tile2.value, 4)
        assert.equal(tile3.position.x, 1)
        assert.equal(tile3.position.y, 2)
        assert.equal(tile3.value, 8)
      })
      it('LEFT should shift tiles to far most left', () => {
        const tile1 = new Tile(new Position({ x: 0, y: 1 }), 2)
        const tile2 = new Tile(new Position({ x: 1, y: 2 }), 4)
        const tile3 = new Tile(new Position({ x: 1, y: 0 }), 8)
        const board = new Board()
        board['_tiles'] = [tile1, tile2, tile3]

        board.applyMove(Moves.LEFT)

        assert.equal(board.tiles.length, 4)
        assert.equal(tile1.position.x, 0)
        assert.equal(tile1.position.y, 0)
        assert.equal(tile2.position.x, 1)
        assert.equal(tile2.position.y, 1)
        assert.equal(tile3.position.x, 1)
        assert.equal(tile3.position.y, 0)
      })
      it('UP should shift tiles to far most top', () => {
        const tile1 = new Tile(new Position({ x: 3, y: 2 }), 2)
        const tile2 = new Tile(new Position({ x: 1, y: 2 }), 4)
        const tile3 = new Tile(new Position({ x: 1, y: 0 }), 8)
        const board = new Board()
        board['_tiles'] = [tile1, tile2, tile3]

        board.applyMove(Moves.UP)

        assert.equal(board.tiles.length, 4)
        assert.equal(tile1.position.x, 1)
        assert.equal(tile1.position.y, 2)
        assert.equal(tile1.value, 2)
        assert.equal(tile2.position.x, 0)
        assert.equal(tile2.position.y, 2)
        assert.equal(tile2.value, 4)
        assert.equal(tile3.position.x, 0)
        assert.equal(tile3.position.y, 0)
        assert.equal(tile3.value, 8)
      })
      it('DOWN should shift tiles to far bottom', () => {
        const tile1 = new Tile(new Position({ x: 3, y: 2 }), 2)
        const tile2 = new Tile(new Position({ x: 1, y: 2 }), 4)
        const tile3 = new Tile(new Position({ x: 1, y: 0 }), 8)
        const board = new Board()
        board['_tiles'] = [tile1, tile2, tile3]

        board.applyMove(Moves.DOWN)

        assert.equal(board.tiles.length, 4)
        assert.equal(tile1.position.x, 3)
        assert.equal(tile1.position.y, 2)
        assert.equal(tile1.value, 2)
        assert.equal(tile2.position.x, 2)
        assert.equal(tile2.position.y, 2)
        assert.equal(tile2.value, 4)
        assert.equal(tile3.position.x, 3)
        assert.equal(tile3.position.y, 0)
        assert.equal(tile3.value, 8)
      })
      it('should combine neighboring alike tiles', () => {
        const tile1 = new Tile(new Position({ x: 0, y: 1 }), 2)
        const tile2 = new Tile(new Position({ x: 0, y: 2 }), 2)
        const tile3 = new Tile(new Position({ x: 1, y: 0 }), 8)
        const board = new Board()
        board['_tiles'] = [tile1, tile2, tile3]

        board.applyMove(Moves.RIGHT)

        assert.isTrue(tile2.destroyed)
        assert.isTrue(tile1.combined)
        assert.equal(tile1.position.x, 0)
        assert.equal(tile1.position.y, 3)
        assert.equal(tile1.value, 4)
        assert.equal(tile3.position.x, 1)
        assert.equal(tile3.position.y, 3)
        assert.equal(tile3.value, 8)
      })
      it('should combine non-neighboring tiles', () => {
        const tile1 = new Tile(new Position({ x: 0, y: 0 }), 2)
        const tile2 = new Tile(new Position({ x: 0, y: 3 }), 2)
        const board = new Board()
        board['_tiles'] = [tile1, tile2]

        board.applyMove(Moves.RIGHT)

        assert.isTrue(tile2.destroyed)
        assert.isTrue(tile1.combined)
        assert.equal(tile1.position.x, 0)
        assert.equal(tile1.position.y, 3)
        assert.equal(tile1.value, 4)
      })
      it('should combine neighboring in direction of travel', () => {
        const tile1 = new Tile(new Position({ x: 0, y: 1 }), 2)
        const tile2 = new Tile(new Position({ x: 0, y: 2 }), 2)
        const tile3 = new Tile(new Position({ x: 0, y: 3 }), 2)
        const board = new Board()
        board['_tiles'] = [tile1, tile2, tile3]

        board.applyMove(Moves.RIGHT)

        assert.isTrue(tile3.destroyed)
        assert.isTrue(tile2.combined)
        assert.equal(tile1.position.x, 0)
        assert.equal(tile1.position.y, 2)
        assert.equal(tile1.value, 2)
        assert.equal(tile2.position.x, 0)
        assert.equal(tile2.position.y, 3)
        assert.equal(tile2.value, 4)
      })
      it('should combine one level', () => {
        const tile0 = new Tile(new Position({ x: 0, y: 0 }), 2)
        const tile1 = new Tile(new Position({ x: 0, y: 1 }), 2)
        const tile2 = new Tile(new Position({ x: 0, y: 2 }), 2)
        const tile3 = new Tile(new Position({ x: 0, y: 3 }), 2)
        const board = new Board()
        board['_tiles'] = [tile0, tile1, tile2, tile3]

        board.applyMove(Moves.RIGHT)

        assert.isTrue(tile3.destroyed)
        assert.isTrue(tile1.destroyed)
        assert.isTrue(tile2.combined)
        assert.equal(tile0.position.x, 0)
        assert.equal(tile0.position.y, 2)
        assert.equal(tile0.value, 4)
        assert.equal(tile2.position.x, 0)
        assert.equal(tile2.position.y, 3)
        assert.equal(tile2.value, 4)
      })
      it('should not combine tiles twice', () => {
        const tile0 = new Tile(new Position({ x: 0, y: 0 }), 2)
        const tile1 = new Tile(new Position({ x: 0, y: 1 }), 8)
        const tile2 = new Tile(new Position({ x: 0, y: 2 }), 4)
        const tile3 = new Tile(new Position({ x: 0, y: 3 }), 4)
        const board = new Board()
        board['_tiles'] = [tile0, tile1, tile2, tile3]

        board.applyMove(Moves.RIGHT)

        assert.isTrue(tile3.destroyed)
        assert.isFalse(tile2.destroyed)
        assert.isTrue(tile2.combined)
        assert.isFalse(tile1.combined)
        assert.isFalse(tile3.combined)
        assert.equal(tile0.position.x, 0)
        assert.equal(tile0.position.y, 1)
        assert.equal(tile0.value, 2)
        assert.equal(tile1.position.x, 0)
        assert.equal(tile1.position.y, 2)
        assert.equal(tile1.value, 8)
        assert.equal(tile2.position.x, 0)
        assert.equal(tile2.position.y, 3)
        assert.equal(tile2.value, 8)
      })
      it('should not have any dirty flags if no movement was made', () => {
        const tile1 = new Tile(new Position({ x: 0, y: 0 }), 2)
        const board = new Board()
        board['_tiles'] = [tile1]

        board.applyMove(Moves.LEFT)
        assert.isTrue(board.tiles.every((tile) => !tile.isDirty))
      })
      it('should clear any dirty flags from previous move', () => {
        const tile1 = new Tile(new Position({ x: 0, y: 0 }), 2)
        tile1['_isDirty'] = true
        const board = new Board()
        board['_tiles'] = [tile1]

        board.applyMove(Moves.LEFT)
        assert.isTrue(board.tiles.every((tile) => !tile.isDirty))
      })
    })
  })
})
