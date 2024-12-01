export function parseIntArray(array: string[]) {
  const parsed = array.map((string) => parseInt(string))
  if (parsed.includes(NaN)) throw new Error("Could not parse all numbers")
  return parsed
}
