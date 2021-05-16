export type PositionProps = { x: number; y: number }

export class Position {
  private _x: number
  private _y: number

  public constructor(props: PositionProps) {
    this._x = props.x
    this._y = props.y
  }

  // public properties

  public get x(): number {
    return this._x
  }
  public get y(): number {
    return this._y
  }
}
