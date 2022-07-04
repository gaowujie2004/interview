const { isObject } = require('./utils');
const { isMap, isSet } = require('util/types');

function clone(obj) {
  // 原始对象 - 克隆后的对象，解决循环引用
  const weakMap = new WeakMap();

  // 返回一个新的（克隆后的）
  function implClone(val) {
    if (weakMap.has(val)) {
      return weakMap.get(val);
    }

    if (isObject(val)) {
      if (Array.isArray(val)) {
        const newArr = new Array(val.length);
        weakMap.set(val, newArr);

        val.forEach((item) => {
          newArr.push(implClone(item));
        });

        return newArr;
      }

      if (isMap(val)) {
        const newMap = new Map();

        for (const [k, v] of val) {
          newMap.set(k, implClone(v));
        }

        return newMap;
      }

      if (isSet(val)) {
        const newSet = new Set();

        for (const v of val) {
          newSet(implClone(v));
        }

        return newSet;
      }

      // 对象, 遍历自身可枚举，不遍历原型链
      const newObj = {};
      weakMap.set(val, newObj);

      Object.entries(val).forEach(([key, v]) => {
        newObj[key] = implClone(v);
      });

      return newObj;
    } else {
      // 非键值对结构
      return val;
    }
  }

  return implClone(obj);
}

const a1 = {
  name: 'a1',
};
const a2 = {
  name: 'a2',
};
a1.next = a2;
a2.next = a1;
const obj = {
  a: {
    b: 1,
    c: 2,
    d: { e: 5 },
  },
  b: [1, 3, { a: 2, b: 3 }],
  c: 3,
  a1,
  a2,
};

const newObj = clone(obj);
obj.a = 90;
a1.name = 'new a1';
a2.name = 'new a2';

// console.log(obj);
console.log(newObj);
