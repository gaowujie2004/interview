// 数组扁平化
var arr = [
  1,
  2,
  3,
  [],
  [
    [
      [
        [4, 5, 6],
        [7, [8, 9]],
      ],
    ],
  ],
  10,
  11,
  [12, 13, 14, 15],
];

// 1. 递归
var flattenArr = function (arr) {
  const retArr = [];

  // 将当前数组的成员，放入 retArr 中
  // 深度优先
  function impl(arr) {
    if (Array.isArray(arr)) {
      arr.forEach((item) => {
        impl(item);
      });
    } else {
      retArr.push(arr);
    }
  }
  impl(arr);

  return retArr;
};
var res1 = flattenArr(arr);

// 2. 迭代 ——先序   ERROR
var flattenArr = function (arr) {
  const retArr = [];

  function impl(value) {
    const stack = [value];
    while (stack.length) {
      const curNode = stack.pop();

      // 先序
      retArr.push(curNode);

      if (Array.isArray(curNode)) {
        for (let i = curNode.length - 1; i >= 0; i--) {
          stack.push(curNode[i]);
        }
      }
    }
  }

  arr.forEach((value) => impl(value));

  return retArr;
};
var res2 = flattenArr(arr);

// 3. 迭代
var flattenArr = function (arr) {
  let retArr = arr;
  while (retArr.some(Array.isArray)) {
    retArr = [].concat(...retArr);
  }

  return retArr;
};
var res3 = flattenArr(arr);

// 4. 递归
var flattenArr = function (arr) {
  return arr.reduce((memo, cur) => (Array.isArray(cur) ? [...memo, ...flattenArr(cur)] : [...memo, cur]), []);
};
var res4 = flattenArr(arr);

console.log(res1, res3, res4);
