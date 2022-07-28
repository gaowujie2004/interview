const { isObject } = require('./utils');

const obj = {
  a: {
    b: 1,
    c: 2,
    d: { e: 5 },
  },
  b: [1, 3, { a: 2, b: 3 }],
  c: 3,
};

/**
 * {
 *  'a.b': 1,
 *  'a.c': 2
 * }
 */

function flatObj(obj) {
  const retObj = {};

  const implFlatObj = (val, prefix) => {
    if (isObject(val)) {
      if (Array.isArray(val)) {
        val.forEach((item, index) => implFlatObj(item, `${prefix}[${index}]`));
      } else {
        for (const k in val) {
          implFlatObj(val[k], `${prefix}.${k}`);
        }
      }
    } else {
      // 基本值
      retObj[prefix] = val;
    }
  };

  for (const k in obj) {
    implFlatObj(obj[k], k);
  }

  return retObj;
}

console.log(flatObj(obj));
