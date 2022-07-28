const obj = {
  a: {
    b: 1,
    c: 2,
    d: { e: 5 },
  },
  b: [1, 3, { a: 2, b: 3 }],
  c: 3,
};

// flatten(obj) 结果返回如下
// {
//  'a.b': 1,
//  'a.c': 2,
//  'a.d.e': 5,
//  'b[0]': 1,
//  'b[1]': 3,
//  'b[2].a': 2,
//  'b[2].b': 3
//   c: 3
// }

function flattenObj(obj) {
  const retObj = {};

  // 将当前 key前缀拼接, value，加入 retObj 中。
  function flattenImpl(value, prefix) {
    if ({}.toString() === Object.prototype.toString.call(value)) {
      for (const key in value) {
        flattenImpl(value[key], `${prefix}.${key}`);
      }
    } else if (Array.isArray(value)) {
      for (let i = 0; i < value.length; i++) {
        flattenImpl(value[i], `${prefix}[${i}]`);
      }
    } else {
      // 基本值
      retObj[prefix] = value;
    }
  }

  for (const key in obj) {
    // 入口
    flattenImpl(obj[key], key);
  }

  return retObj;
}

/**================================== TEST **/
console.log('对象扁平化 RES', flattenObj(obj));
