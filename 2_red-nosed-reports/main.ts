import { partition, slidingWindows } from "@std/collections"
const testing = false
const input = testing
    ? await Deno.readTextFile("test.txt")
    : await Deno.readTextFile("input.txt")

// PART 1 --------------------------------------------------

const lines = input.split("\r\n")

function isGrowing(window: number[]) {
    return window[0] - window[1] < 0
}

function isInRange(window: number[]) {
    return Math.abs(window[0] - window[1]) >= 1 &&
        Math.abs(window[0] - window[1]) <= 3
}

function isSafe(array: number[]) {
    const windows = slidingWindows(array, 2)
    const shouldGrow = isGrowing(windows[0])

    const windowBools = windows.map((window) => {
        return isInRange(window) && shouldGrow === isGrowing(window)
    })
    return !windowBools.includes(false)
}

const lineIsSafeBools = lines.map((line) => {
    const numbers = line.split(" ").map((numString) => parseInt(numString))
    return isSafe(numbers)
})

const [safe, unsafe] = partition(lineIsSafeBools, (bool) => bool)
console.log("safe", safe.length)
console.log("unsafe", unsafe.length)

// PART 2 --------------------------------------------------

function getAllPermutations(array: number[]) {
    const result = []
    for (let i = 0; i < array.length; i++) {
        result.push(array.toSpliced(i, 1))
    }
    return result
}

function problemDampener(array: number[]) {
    const permutations = getAllPermutations(array).map((permutation) =>
        isSafe(permutation)
    )
    return permutations.includes(true)
}

const lineIsSafeWithDampenerBools = lines.map((line) => {
    const numbers = line.split(" ").map((numString) => parseInt(numString))
    if (isSafe(numbers)) {
        return true
    } else {
        return problemDampener(numbers)
    }
})

const [safe2, unsafe2] = partition(lineIsSafeWithDampenerBools, (bool) => bool)
console.log("safe2", safe2.length)
console.log("unsafe2", unsafe2.length)
