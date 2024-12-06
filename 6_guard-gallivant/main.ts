const testing = false

const input = testing
    ? await Deno.readTextFile("test.txt")
    : await Deno.readTextFile("input.txt")

// Part 1 -------------------------------------
const matrix = input.split("\n")
    .map((str) => str.split(""))

type GuardDirection = "^" | ">" | "v" | "<"

class Guard {
    x
    y
    direction

    constructor(
        startingPosition: [number, number],
        direction: GuardDirection,
    ) {
        this.x = startingPosition[0]
        this.y = startingPosition[1]
        this.direction = direction
    }

    walk() {
        switch (this.direction) {
            case "^":
                this.y--
                break
            case ">":
                this.x++
                break
            case "v":
                this.y++
                break
            case "<":
                this.x--
                break
        }
    }

    turn() {
        switch (this.direction) {
            case "^":
                this.direction = ">"
                break
            case ">":
                this.direction = "v"
                break
            case "v":
                this.direction = "<"
                break
            case "<":
                this.direction = "^"
                break
        }
    }
}

class Lab {
    matrix
    width
    height
    guard

    constructor(
        matrix: string[][],
        guardX: number,
        guardY: number,
        guardDirection: GuardDirection,
    ) {
        this.matrix = matrix
        this.width = matrix[0].length
        this.height = matrix.length
        this.guard = new Guard([guardX, guardY], guardDirection)
    }

    #getNextStep() {
        let nextStep: string | null

        if (this.guard.direction === "^") {
            if (this.guard.y > 0) {
                nextStep = this.matrix[this.guard.y - 1][this.guard.x]
            } else {
                nextStep = null
            }
        } else if (this.guard.direction === ">") {
            if (this.guard.x < (this.matrix[0].length - 1)) {
                nextStep = this.matrix[this.guard.y][this.guard.x + 1]
            } else {
                nextStep = null
            }
        } else if (this.guard.direction === "v") {
            if (this.guard.y < (this.matrix.length - 1)) {
                nextStep = this.matrix[this.guard.y + 1][this.guard.x]
            } else {
                nextStep = null
            }
        } else if (this.guard.direction === "<") {
            if (this.guard.x > 0) {
                nextStep = this.matrix[this.guard.y][this.guard.x - 1]
            } else {
                nextStep = null
            }
        }
        return nextStep
    }

    #leaveTrace() {
        matrix[this.guard.y][this.guard.x] = "X"
    }

    #markNewPosition() {
        matrix[this.guard.y][this.guard.x] = this.guard.direction
    }

    step() {
        if (lastStep === false) {
            console.log(matrix.map((row) => row.join("")).join("\n"))
            console.log("\n\n")
            console.log("taking step!")
            const nextStep = this.#getNextStep()
            if (nextStep === "#") {
                console.log("turning!")
                this.guard.turn()
                this.#leaveTrace()
                this.guard.walk()
                this.#markNewPosition()
                this.step()
            } else if (nextStep === "." || nextStep === "X") {
                this.#leaveTrace()
                this.guard.walk()
                this.#markNewPosition()
                this.step()
            } else if (nextStep === null) {
                console.log("Leaving lab!")
                lastStep = true
                this.#leaveTrace()
                this.step()
            }
        }
    }

    run() {
        this.step()
        return this.matrix
    }
}

function getStartingPosition(matrix: string[][]) {
    let x: number
    let y: number
    matrix.forEach((row, i) => {
        const index = row.findIndex((element) => element.match(/\^|>|v|</))
        if (index > 0) { // as in, if one of those characters is found, otherwise findIndex returns -1
            y = i
            x = index
        }
    })
    if (x === undefined || y === undefined) {
        throw new Error("Could not find starting position")
    }
    return [x, y]
}

const [x, y] = getStartingPosition(matrix)
const lab = new Lab(matrix, x, y, "^")

// State
// (I was having errors storing this in the Lab class and accessing it within recursive loop, need to look into later)
let lastStep = false

// Start the guard walk!
console.log("\n-------START--------\n")
const finalMatrix = lab.run()
console.log("\n-------END--------\n")

console.log(
    "finalMatrix:\n\n",
    finalMatrix.map((row) => row.join("")).join("\n"),
)

function countXs(matrix: string[][]) {
    const flatMatrix = matrix.flat()
    const count = flatMatrix.filter((char) => char === "X").length
    return count
}

const count = countXs(finalMatrix)
console.log("\n-----\nPart 1 count:", count)

// PART 2 --------------------------------------------------
