export function parseIntArray(array: string[]) {
    const parsed = array.map((string) => parseInt(string));
    if (parsed.includes(NaN)) throw new Error('Could not parse all numbers');
    return parsed;
}

export function sumArray(array: number[]) {
    return array.reduce((acc, value) => acc + value, 0);
}
