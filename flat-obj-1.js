function isObject(val) {
  return !!val && typeof val === 'object';
}

function flatObj(obj) {
  if (!isObject(obj)) return;

  const retObj = {};

  function implFlat(curr, prefix) {
    if (isObject(curr)) {
      if (Array.isArray(curr)) {
        curr.forEach((item, index) => {
          implFlat(item, `${prefix}[${index}]`);
        });
      } else {
        for (const k in curr) {
          implFlat(curr[k], `${prefix}.${k}`);
        }
      }
    } else {
      retObj[prefix] = curr;
    }
  }

  for (const k in obj) {
    implFlat(obj[k], k);
  }

  return retObj;
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

console.log(flatObj(obj));
