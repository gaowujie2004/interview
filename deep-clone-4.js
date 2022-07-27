// 递归函数，入参 obj，如果是对象，则返回一个新的对象。

const { isDate, isRegExp, isSet, isMap } = require('util/types');

const isObject = (val) => !!val && typeof val === 'object';

// key: 要克隆的对象，value: 克隆后的对象
const map = new Map();

/**
 * 返回克隆后的新值
 * @param {*} value
 * @returns
 */
function deepClone(value) {
  // 基本值 || 函数
  if (!isObject(value)) {
    return value;
  }

  // 克隆引用值。解决循环引用
  if (map.has(value)) {
    return map.get(value);
  }

  // 数组
  if (Array.isArray(value)) {
    const newArr = new Array(value.length);
    map.set(value, newArr);
    for (const item of value) {
      newArr.push(deepClone(item));
    }

    return newArr;
  }

  // 普通对象
  if (Object.prototype.toString.call(value) === '[object Object]') {
    // 为什么不用 value.construction，因为构造函数可能需要参数
    const newObj = {};
    map.set(value, newObj);

    for (const key in value) {
      newObj[key] = deepClone(value[key]);
    }

    return newObj;
  }

  // 日期 & RegExp
  if ([isRegExp, isDate].some((fn) => fn(value))) {
    return new value.constructor(value);
  }

  // Set
  if (isSet(value)) {
    const newSet = new value.constructor();
    map.set(value, newSet);

    for (const item of value) {
      newSet.add(deepClone(item));
    }
    return newSet;
  }

  // Map
  if (isMap(value)) {
    const newMap = new Map();
    map.set(value, newMap);

    for (const [k, v] of value) {
      newMap.set(deepClone(k), deepClone(v));
    }
    return newMap;
  }

  // 其余数据结构，暂不考虑
  return value;
}

const obj = {
  a: {
    b: 1,
    c: 2,
    d: { e: 5 },
  },
  b: [1, 3, { a: 2, b: 3 }],
  c: 3,
};

const newObj = deepClone(obj);
obj.a = 90;
obj.c = 99999999;

// console.log(obj);
console.log(newObj);
