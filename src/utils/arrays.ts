export function zip(arr1: any[], arr2: any[]): any[] {
    const output = [];
    for(let i = 0; i < arr1.length;  i++ ) {
        output.push([arr1[i], arr2[i]])
    }
    return output;
}
