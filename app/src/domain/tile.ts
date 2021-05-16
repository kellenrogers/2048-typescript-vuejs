import { Position } from './position'
import { v4 as uuidv4 } from 'uuid'

export class Tile {
  private _id: string
  private _destoryed: boolean
  private _combined: boolean
  private _position: Position
  private _value: number
  private _isDirty: boolean

  public constructor(position: Position, value: number) {
    this._id = uuidv4()
    this._destoryed = false
    this._combined = false
    this._position = position
    this._value = value
    this._isDirty = false
  }

  // public properties

  public get destroyed(): boolean {
    return this._destoryed
  }

  public get combined(): boolean {
    return this._combined
  }

  public get isDirty(): boolean {
    return this._isDirty
  }

  public set isDirty(value: boolean) {
    this._isDirty = value
  }

  public get value(): number {
    return this._value
  }

  public get position(): Position {
    return this._position
  }

  public set position(value: Position) {
    if (this.position.x === value.x && this.position.y === value.y) return

    this._position = value
    this._isDirty = true
  }

  // public functions

  public combine(previousTile: Tile): void {
    this._value += previousTile.value
    this._position = previousTile.position
    this._combined = true
    this._isDirty = true
    previousTile.destroy()
  }

  public destroy(): void {
    console.log(`Destroying Tile: ${this._id}`)
    this._destoryed = true
    this._value = 0
    this._isDirty = true
  }

  public deepCopy(): Tile {
    const copy = new Tile(this._position, this._value)

    copy['_destoryed'] = this._destoryed
    copy['_combined'] = this._combined
    copy['_isDirty'] = this._isDirty

    return copy
  }
}
