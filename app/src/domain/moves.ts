export enum Direction {
  FORWARD = 1,
  BACKWARD = -1,
}
export enum RowOrCol {
  ROW,
  COLUMN,
}

export type Move = {
  name: string
  shiftDirection: Direction
  groupsBy: RowOrCol
}

export type PossibleMoves = {
  RIGHT: Move
  LEFT: Move
  DOWN: Move
  UP: Move
}

export const Moves: PossibleMoves = {
  RIGHT: {
    name: 'RIGHT',
    shiftDirection: Direction.FORWARD,
    groupsBy: RowOrCol.ROW,
  },
  LEFT: {
    name: 'LEFT',
    shiftDirection: Direction.BACKWARD,
    groupsBy: RowOrCol.ROW,
  },
  DOWN: {
    name: 'DOWN',
    shiftDirection: Direction.FORWARD,
    groupsBy: RowOrCol.COLUMN,
  },
  UP: {
    name: 'UP',
    shiftDirection: Direction.BACKWARD,
    groupsBy: RowOrCol.COLUMN,
  },
}
