// 获取对象的深度

/**
 * 返回当前对象的深度，当前深度：2
 * let obj1 = {
 *    a:1,
 *    b:2,
 *    c: {}
 * }
 */
function getObjectDeep(obj) {
  if (Object.prototype.toString.call(obj) !== {}.toString()) {
    return 0;
  }

  let deeps = [];
  for (const key in obj) {
    deeps.push(getObjectDeep(obj[key]));
  }

  return Math.max(...deeps) + 1;
}

/**================================== TEST **/
var obj = {
  a: 1,
  b: 2,
  c: {
    d: 3,
    e: 4,
  },
};

var ret1 = getObjectDeep(obj);
console.log('obj 深度', ret1);
