const arr1 = ["a", "b", "c", "b", "a", "c", "a", "a", 1, 2, 3, 4, 1, 2, 3, 4, "b"];

/**
 * {
 *   a: 2,
 *   b: 2
 *   .....
 * }
 */
function tongji(arr) {
  return arr.reduce((memoObj, cur) => {
    if (memoObj.hasOwnProperty(cur)) {
      memoObj[cur]++;
    } else {
      memoObj[cur] = 1;
    }

    return memoObj;
  }, {});
}

const ret1 = tongji(arr1);
console.log("结果1：", ret1);
