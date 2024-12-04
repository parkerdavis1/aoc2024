import { transpose } from "d3"
const testing = false

let input = testing
    ? await Deno.readTextFile("test.txt")
    : await Deno.readTextFile("input.txt")

// Part 1 -------------------------------------

// CHECK 1: get all rows, read forwards and backwards
const forwardsRows = input.split("\r\n")
const reverseRows = forwardsRows.map((string) =>
    string.split("").toReversed().join("")
)

// CHECK 2: get all columns, read forwards and backwards
const forwardsColumns = transpose(forwardsRows).map((arr: string[]) =>
    arr.join("")
)
const reverseColumns = forwardsColumns.map((string: string) =>
    string.split("").toReversed().join("")
)

// CHECK 3: get diagonals, read forwards and backwards
function getDiagonals(matrix: string[][]) {
    const rowsCount = matrix.length
    const colCount = matrix[0].length
    const maxLength = rowsCount + colCount - 1

    const forwardSlashDiagonals = Array.from(
        new Array(maxLength),
        () => [] as string[],
    )
    for (let i = 0; i < rowsCount; i++) {
        for (let j = 0; j < colCount; j++) {
            forwardSlashDiagonals[i + j].push(matrix[i][j])
            // 0,0(0) M
            // 0,1(1) M
            // 1,0(1) M
            // 0,2(2) M
            // 1,1(2) S
            // 2,0(2) A
            // 0,3(3) S
            // 1,2(3) A
            // 2,1(3) M
            // 3,0(3) M
        }
    }

    const backslashDiagonals = Array.from(
        new Array(maxLength),
        () => [] as string[],
    )
    for (let i = 0; i < rowsCount; i++) {
        for (let j = 0; j < colCount; j++) {
            backslashDiagonals[i + j].push(matrix[i][colCount - 1 - j])
        }
    }

    return [
        forwardSlashDiagonals,
        backslashDiagonals,
    ]
}
// get those diagonals
const [arrForwardSlashDiagonals, arrBackslashDiagonals] = getDiagonals(
    forwardsRows.map((string) => string.split("")),
)

const forwardSlashDiagonals = arrForwardSlashDiagonals
    .map((diagonal) => diagonal.join(""))
const backslashDiagonals = arrBackslashDiagonals
    .map((diagonal) => diagonal.join(""))
const reverseForwardSlashDiagonals = arrForwardSlashDiagonals
    .map((diagonal) => diagonal.toReversed().join(""))
const reverseBackslashDiagonals = arrBackslashDiagonals
    .map((diagonal) => diagonal.toReversed().join(""))

// Combine all searches into one array
const allSearches = [
    ...forwardsRows,
    ...reverseRows,
    ...forwardsColumns,
    ...reverseColumns,
    ...forwardSlashDiagonals,
    ...backslashDiagonals,
    ...reverseForwardSlashDiagonals,
    ...reverseBackslashDiagonals,
]

function countInString(inputStr: string, regex: RegExp) {
    const count = inputStr.match(regex)?.length ?? 0
    return count
}

let totalCount = 0
allSearches.forEach((string) => {
    totalCount += countInString(string, /XMAS/g)
})

console.log(
    "\n--------------\nPart 1: XMAS count",
    totalCount,
    "\n--------------\n",
)

// PART 2 --------------------------------------------------

// Get all x's as arrays of strings read l-r
// search for possibilities
// MMASS
// MSAMS
// SSAMM
// SMASM

function getAllXs(matrix: string[][]) {
    const height = matrix.length
    const width = matrix[0].length

    const xCount = (width - 2) * (height - 2)
    const xes = [] as string[]

    for (let y = 0; y < height - 2; y++) {
        for (let x = 0; x < width - 2; x++) {
            const cross = [
                matrix[y][x],
                matrix[y][x + 2],
                matrix[y + 1][x + 1],
                matrix[y + 2][x],
                matrix[y + 2][x + 2],
            ].join("")
            xes.push(cross)
        }
    }
    return xes
}

const allXes = getAllXs(forwardsRows.map((string) => string.split("")))

// Go ahead and get that count!
let xMasCount = 0
allXes.forEach((x) => {
    if (
        x === "MMASS" ||
        x === "MSAMS" ||
        x === "SSAMM" ||
        x === "SMASM"
    ) {
        xMasCount++
    }
})

console.log(
    "\n--------------\nPart2: X-MAS Count",
    xMasCount,
    "\n--------------\n",
)
