// 获取数组深度

/**
 * 以下数组深度为2
 * [1,2, [3]]
 * 返回一个数组的深度
 */
function getArrayDeep(arr) {
  if (!Array.isArray(arr)) {
    return 0;
  }

  // 获取数组元素项的深度
  const deeps = arr.map((el) => getArrayDeep(el));

  return Math.max(...deeps) + 1;
}

var arr = [1, 2, [[4]]];
var ret1 = getArrayDeep(arr);
console.log('结果', ret1);
