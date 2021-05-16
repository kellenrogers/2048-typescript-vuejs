export function range(start: number, end: number): number[] {
  const min = Math.min(start, end)
  const length = 1 + (end >= start ? end - start : start - end)
  const list = Array(length)
    .fill(0)
    .map((_: undefined, i: number) => min + i)

  return end >= start ? list : list.reverse()
}
