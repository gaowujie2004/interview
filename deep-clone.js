/**
 * 只考虑
 */
const { isObject } = require('./utils');

function clone(value) {
  const map = new WeakMap();

  function implClone(value) {
    if (isObject(value)) {
      if (map.has(value)) {
        return map.get(value);
      }

      if (Array.isArray(value)) {
        // 数组

        let newArray = [];
        map.set(value, newArray);

        value.forEach((item) => {
          newArray.push(implClone(item));
        });

        return newArray;
      } else {
        // 普通对象
        let newObj = {};
        map.set(value, newObj);
        // 会沿着原型链，访问可枚举属性
        for (const k in value) {
          newObj[k] = implClone(value[k]);
        }

        return newObj;
      }
    } else {
      // 基本值
      return value;
    }
  }

  return implClone(value);
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
