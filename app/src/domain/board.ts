import { Tile } from './tile'
import { range } from './utils'
import { Position } from './position'
import { Move, Direction, RowOrCol, Moves } from './moves'

const WINNING_SCORE = 2048
const BOARD_SIZE = 4
const BOARD_TOTAL_SPACES = BOARD_SIZE * BOARD_SIZE

export class Board {
  private _tiles: Tile[] = []
  private _size: number = BOARD_SIZE
  private _score = 0
  private _isGameOver = false

  public constructor() {
    this.startNewGame()
  }

  // public properties

  public get tiles(): Tile[] {
    return this._tiles
  }

  public get isGameOver(): boolean {
    return this._isGameOver
  }

  public get isGameWon(): boolean {
    return this._score >= WINNING_SCORE
  }

  public get score(): number {
    return this._score
  }

  // public functions

  public startNewGame(): void {
    this._tiles = []
    this._score = 0
    this._isGameOver = false

    this.addRandomTile()
    this.addRandomTile()
  }

  public applyMove(move: Move, testOnly = false): void {
    if (this.isGameOver) return

    this.printBoard('Before Apply Move')
    this.clearIsDirtyTileFlags()
    const tileGroups = this.getTileGroupsForMove(move)

    this._tiles = tileGroups.reduce((allTiles: Tile[], group: Tile[]) => {
      const combinedTiles = this.combineAlikeTiles(group, move.shiftDirection)
      const shiftedTiles = this.shift(combinedTiles, move.shiftDirection, move.groupsBy)
      allTiles.push(...shiftedTiles)
      return allTiles
    }, [])

    if (this.atleastOneTileMoved()) {
      console.log('Board Moved, Adding New Tile')
      this.addRandomTile()
    }

    if (!testOnly) {
      this.checkIfGameIsOver()
    }
  }

  // private functions

  private checkIfGameIsOver(): void {
    this.printBoard(
      `Checking For Game Over State (${this.tiles.length} of ${BOARD_TOTAL_SPACES} spaces filled)`
    )

    if (this.tiles.length < BOARD_TOTAL_SPACES) return

    if (!this.doesMoveExist()) {
      this._isGameOver = true
    }
  }

  private doesMoveExist(): boolean {
    const testOnly = true

    const moveIsPossible = Object.values(Moves).some((move) => {
      const testBoard = this.deepCopy()

      testBoard.applyMove(move, testOnly)

      return testBoard['atleastOneTileMoved']()
    })

    return moveIsPossible
  }

  private deepCopy(): Board {
    const copy = new Board()
    copy['_tiles'] = this.tiles.map((tile) => tile.deepCopy())
    copy['_score'] = this._score
    copy['_isGameOver'] = this._isGameOver

    return copy
  }

  private clearIsDirtyTileFlags(): void {
    this.tiles.forEach((tile) => (tile.isDirty = false))
  }

  private atleastOneTileMoved(): boolean {
    return this._tiles.some((tile) => tile.isDirty)
  }

  private addRandomTile(): void {
    const position = this.getRandomEmptyPosition()
    const value = Math.random() < 0.9 ? 2 : 4

    if (!position) {
      console.log('Failed To Find Empty Position For New Tile')
      return
    }

    this._tiles.push(new Tile(position, value))
  }

  private getRandomEmptyPosition(): Position | undefined {
    if (this.tiles.length === this._size * this._size) return

    const notFound = true
    while (notFound) {
      const x = Math.floor(Math.random() * this._size)
      const y = Math.floor(Math.random() * this._size)
      const exists = this.tiles.find((tile) => tile.position.x === x && tile.position.y === y)
      if (!exists) {
        return new Position({ x, y })
      }
    }
  }

  private combineAlikeTiles(group: Tile[], direction: Direction) {
    if (group.length < 2) return group

    const orderedGroup = direction === Direction.FORWARD ? [...group].reverse() : group

    range(1, orderedGroup.length - 1).forEach((index) => {
      const previousTile = orderedGroup[index - 1]
      const currentTile = orderedGroup[index]

      if (previousTile.value === currentTile.value) {
        currentTile.combine(previousTile)
        this._score += currentTile.value
      }
    })

    return group.filter((tile) => tile.value)
  }

  private shift(group: Tile[], direction: Direction, tilesGroupedBy: RowOrCol): Tile[] {
    let slot = direction === Direction.BACKWARD ? 0 : this._size - group.length

    return group.map((tile) => {
      const newPosition = { x: tile.position.x, y: tile.position.y }
      newPosition[tilesGroupedBy === RowOrCol.ROW ? 'y' : 'x'] = slot
      tile.position = new Position(newPosition)
      slot++
      return tile
    })
  }

  private getTileGroupsForMove(move: Move) {
    return move.groupsBy === RowOrCol.ROW ? this.getRows() : this.getColumns()
  }

  private getRows(): Tile[][] {
    return range(0, this._size - 1).map((i: number) => this.getRow(i))
  }

  private getColumns(): Tile[][] {
    return range(0, this._size - 1).map((i: number) => this.getColumn(i))
  }

  private getRow(num: number): Tile[] {
    const row = this.tiles.filter((tile) => tile.position.x === num)
    const sortedRow = row.sort((a: Tile, b: Tile) => (a.position.y < b.position.y ? -1 : 1))
    return sortedRow
  }

  private getColumn(num: number): Tile[] {
    const col = this.tiles.filter((tile) => tile.position.y === num)
    const sortedCol = col.sort((a: Tile, b: Tile) => (a.position.x < b.position.x ? -1 : 1))
    return sortedCol
  }

  private printBoard(message: string): void {
    const HIDE_DEBUG_PRINTS = true
    if (HIDE_DEBUG_PRINTS) {
      return
    }

    const printableBoard = [
      ['', '', '', ''],
      ['', '', '', ''],
      ['', '', '', ''],
      ['', '', '', ''],
    ]
    this.tiles.forEach(
      (tile) => (printableBoard[tile.position.x][tile.position.y] = `${tile.value}:${tile.isDirty}`)
    )

    console.log(message)
    console.table(printableBoard)
  }
}
