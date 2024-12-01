import { parseIntArray } from "./helperFunctions.ts"
import { sumOf, unzip } from "@std/collections"

// PART 1 --------------------------------------------------------------------
const listInput = await Deno.readTextFile("input.txt")

function parseIntArray(array: string[]) {
  const parsed = array.map((string) => parseInt(string))
  if (parsed.includes(NaN)) throw new Error("Could not parse all numbers")
  return parsed
}

function splitInputToTwoLists(listInput: string) {
  const listPairs = listInput.split("\n").map((duple) => duple.split("   "))

  const [list1, list2] = unzip(listPairs)

  // parse To Int
  const list1Int = parseIntArray(list1.toSorted())
  const list2Int = parseIntArray(list2.toSorted())

  return {
    list1: list1Int,
    list2: list2Int,
  }
}

const { list1, list2 } = splitInputToTwoLists(listInput)

function calculateDifferenceScore(list1: number[], list2: number[]) {
  if (list1.length !== list2.length) {
    throw new Error("lists do not have the same length")
  }

  const differences = []

  for (let i = 0; i < list1.length; i++) {
    differences.push(Math.abs(list1[i] - list2[i]))
  }
  return sumOf(differences, (v) => v)
}

console.log("differenceScore", calculateDifferenceScore(list1, list2))

// PART 2 --------------------------------------------------------------------

function calculateSimilarityScore(list1: number[], list2: number[]) {
  let sum = 0
  list1.forEach((number) => {
    const numberOfMatches = list2.filter((num) => num === number).length
    const score = number * numberOfMatches
    sum += score
  })
  return sum
}

console.log("similarityScore", calculateSimilarityScore(list1, list2))
