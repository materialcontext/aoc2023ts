export function countUnique(str: string) {
    return new Set(str.split('')).size;
}