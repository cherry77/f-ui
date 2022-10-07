// 比Array.concat快
export function concat(arr: any[], arr2: any[]) {
  const arrLength = arr.length;
  const arr2Length = arr2.length;
  arr.length = arrLength + arr2Length;
  for (let i = 0; i < arr2Length; i++) {
    arr[arrLength + i] = arr2[i];
  }
  return arr;
}