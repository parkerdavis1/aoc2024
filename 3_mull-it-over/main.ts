const testing = false

let input = testing
    ? await Deno.readTextFile("test.txt")
    : await Deno.readTextFile("input.txt")

// Part 1 -------------------------------------
const regex = /mul\(\d+,\d+\)/g
const mulMatches = input.match(regex)
if (mulMatches) {
    const numPairs = mulMatches.map((string) => {
        return string.slice(4, -1).split(",")
    })

    const sum = numPairs.reduce(
        (prev, curr) => prev + (parseInt(curr[0]) * parseInt(curr[1])),
        0,
    )

    console.log("\nPart 1 sum", sum, "\n")
}

// Part 2 ------------------------------------

input = testing
    ? await Deno.readTextFile("test2.txt")
    : await Deno.readTextFile("input.txt")

const regex2 = /(mul\(\d+,\d+\))|do\(\)|don't\(\)/g
const allMatches = input.match(regex2)

function calculateMulString(string: string) {
    const numString = string.slice(4, -1)
    const nums = numString.split(",").map((num) => parseInt(num))
    return nums[0] * nums[1]
}

if (allMatches) {
    let sum2 = 0
    let DO = true
    for (const string of allMatches) {
        if (string.includes("don't")) {
            DO = false
        } else if (string.includes("do")) {
            DO = true
        } else if (string.includes("mul")) {
            if (DO) {
                sum2 += calculateMulString(string)
            }
        }
    }
    console.log("Part 2 sum", sum2, "\n")
}
