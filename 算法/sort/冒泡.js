function paoPao(arr) {
  let temp = 0;
  // 外层循环次数:length-1
  for (let i = arr.length - 1; i >= 1; i--) {
    for (let j = 0; j < i; j++) {
      if (arr[j] > arr[j + 1]) {
        temp = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = temp;
      }
    }
  }
}

/**================================== TEST **/
const arr1 = [7, 6, 5, 4, 3, 2, 1, 0];
const arr2 = [1, 2, 3, 9, 8, 7, 1, 2, 3, 0];

console.log("--arr1 结果：", arr1);
console.log("--arr2 结果：", arr2);
