const arr1 = [1, 2, 3, 4, 5];
const arr2 = [1, 2, 3, 4];

// 会改变原数组
const reverse = (arr) => {
  let left = 0;
  let right = arr.length - 1;
  let temp;
  while (left < right) {
    temp = arr[left];
    arr[left] = arr[right];
    arr[right] = temp;

    // "指针"移动
    left++;
    right--;
  }

  return arr;
};

/**================================== TEST **/
const ret1 = reverse(arr1);
const ret2 = reverse(arr2);

console.log('结果1： ', ret1);
console.log('结果2： ', ret2);
