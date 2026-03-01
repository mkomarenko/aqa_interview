/*
Problem: Return unique values present in both arrays.

Example

Input: [1,2,2,3] and [2,2,4]

Output: [2]
*/

const arrayA = [1,2,2,3]
const arrayB = [4, 5]

function uniqueElementsOfTwoArrays<T>(arr1: Array<T>, arr2: Array<T>): Array<T> {
    let setA = new Set<T>(arr1);
    let setB = new Set<T>(arr2);
    let intersection = setA.intersection(setB);
    return Array.from(intersection.values());
}
/*
Complexity

Time: O(n + m) average

Space: O(n)
*/


console.log(uniqueElementsOfTwoArrays(arrayA, arrayB));