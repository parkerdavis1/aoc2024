import { parseIntArray, sumArray } from './helperFunctions.ts';

// PART 1 --------------------------------------------------------------------

const decoder = new TextDecoder('utf-8');
const data = await Deno.readFile('input.txt');
const listInput = decoder.decode(data);

function splitInputToTwoLists(listInput: string) {
    const list1: string[] = [];
    const list2: string[] = [];

    const listPairs = listInput.split('\n');
    listPairs.forEach((pair: string) => {
        const duple = pair.split('   ');
        list1.push(duple[0]);
        list2.push(duple[1]);
    });

    // Filter out the blank and undefined entries
    const list1Filtered = list1.filter(
        (item) => item !== '' && item !== undefined
    );
    const list2Filtered = list2.filter(
        (item) => item !== '' && item !== undefined
    );

    // Sort lists
    const list1Sorted = list1Filtered.toSorted();
    const list2Sorted = list2Filtered.toSorted();

    // parse To Int
    const list1Int = parseIntArray(list1Sorted);
    const list2Int = parseIntArray(list2Sorted);

    return {
        list1: list1Int,
        list2: list2Int,
    };
}

const { list1, list2 } = splitInputToTwoLists(listInput);

function calculateDifferenceScore(list1: number[], list2: number[]) {
    if (list1.length !== list2.length)
        throw new Error('lists do not have the same length');

    const differences = [];

    for (let i = 0; i < list1.length; i++) {
        differences.push(Math.abs(list1[i] - list2[i]));
    }
    return sumArray(differences);
}

console.log('differenceScore', calculateDifferenceScore(list1, list2));

// PART 2 --------------------------------------------------------------------

function calculateSimilarityScore(list1: number[], list2: number[]) {
    let sum = 0;
    list1.forEach((number) => {
        const numberOfMatches = list2.filter((num) => num === number).length;
        const score = number * numberOfMatches;
        sum += score;
    });
    return sum;
}

console.log('similarityScore', calculateSimilarityScore(list1, list2));
