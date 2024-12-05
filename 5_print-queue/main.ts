import { slidingWindows } from "@std/collections"

const testing = false

const input = testing
    ? await Deno.readTextFile("test.txt")
    : await Deno.readTextFile("input.txt")

// Part 1 -------------------------------------

const [rulesStr, updatesStr] = input.split("\r\n\r\n")

const updates = updatesStr
    .split("\r\n")
    .map((line) =>
        line
            .split(",")
            .map((str) => Number(str))
    )

const rulePairs = rulesStr
    .split("\r\n")
    .map((string) =>
        string
            .split("|")
            .map((str) => Number(str))
    ) as [number, number][]

function testPair(pair: [number, number]) {
    const [a, b] = pair
    const rule = rulePairs.find((arrPair) =>
        arrPair.includes(a) && arrPair.includes(b)
    )
    if (rule) {
        const [ruleA, ruleB] = rule
        if (ruleA === a && ruleB === b) return true
        return false
    }
}

function testUpdate(update: number[]) {
    const testPairs = slidingWindows(update, 2) as [number, number][]
    const testResults = testPairs.map((pair) => testPair(pair))
    if (testResults.includes(false)) return false
    return true
}

function getMiddleNum(update: number[]) {
    if (update.length % 2 === 0) throw new Error("EVEN NUMBER!")
    return update[Math.floor(update.length / 2)]
}

let middleNumSum = 0
updates.forEach((update) => {
    if (testUpdate(update)) {
        middleNumSum += getMiddleNum(update)
    }
})

console.log(
    "\n-----\nPart 1: middleNumSum",
    middleNumSum,
    "\n-----",
)

// Part 2 ------------------------------------------------

function sortUpdate(update: number[]) {
    const sortedUpdate = update.toSorted((a, b) =>
        testPair([a, b]) === true ? -1 : 1
    )
    return sortedUpdate
}

const unsortedUpdates = updates.filter((update) => !testUpdate(update))

let sortedMiddleNumSum = 0
unsortedUpdates.forEach((update) => {
    const sorted = sortUpdate(update)
    sortedMiddleNumSum += getMiddleNum(sorted)
})

console.log(
    "\n-----\nPart2: sortedMiddleNumSum",
    sortedMiddleNumSum,
    "\n-----\n",
)
