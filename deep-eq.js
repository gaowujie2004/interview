const isObject = (val) => !!val && typeof val === 'object';

/**
 *
 * @param {any} value1
 * @param {any} value2
 * @returns {boolean}
 */
function deepEq(value1, value2) {
  // 基本值 || 函数
  if (!isObject(value1) || !isObject(value2)) {
    return value1 === value2;
  }
  // 结构要相同
  if (Object.prototype.toString.call(value1) !== Object.prototype.toString.call(value2)) {
    return false;
  }

  // 都是数组
  if (Array.isArray(value1)) {
    // 引用判断，有可能动态修改属性了
    // if (value1 === value2) {
    //   return true;
    // }

    const len1 = value1.length;
    const len2 = value2.length;
    if (len1 !== len2) {
      return false;
    }

    // len1 === len2
    for (let i = 0; i < len1; i++) {
      if (!deepEq(value1[i], value2[i])) {
        return false;
      }
    }

    return true;
  }

  // 普通对象，忽略写入时的顺序。
  if (Object.prototype.toString.call(value1) === '[object Object]') {
    // 不比较原型链
    const arr1 = Object.keys(value1);
    const arr2 = Object.keys(value2);
    if (arr1.length !== arr2.length) {
      return false;
    }

    // 空对象
    if (arr1.length === 0) {
      return true;
    }
    // 属性个数相同。

    let k1, k2;
    for (let i = 0; i < arr1.length; i++) {
      k1 = arr1[i];
      k2 = arr2[i];

      /**
       * {
       *    name: 'G',
       *    age: 18
       * }
       *
       * {
       *    age: 18,
       *    name: 'G'
       * }
       *
       * 这两个对象，arr1 arr2 的元素顺序、值是一样的，这个有兼容性问题。
       * 下面代码是为了解决这个问题，我的规定是：对象深度比较不考虑顺序。
       */
      let index1, index2;
      if ((index1 = arr1.indexOf(k2)) === -1 || (index2 = arr2.indexOf(k1)) === -1) {
        return false;
      }

      if (deepEq(value2[k2], value1[arr1[index1]]) && deepEq(value1[k1], value2[arr2[index2]])) {
        return true;
      } else {
        return false;
      }
    }
  }

  // 其他结构不比较，列如Set、Map......暂不考虑
  return false;
}

/**
 * ES6中，Object.keys() 针对普通属性，key的顺序和写入时一致。
 * 针对下标属性，则是升序。
 *
 * ES5总，对象中的普通属性key是按照ASCII码排序的，下标属性则升序。在最前面
 */

console.log(deepEq({ a: 1 }, { a: 1 }));

module.exports = deepEq;
