const obj = {
  a: {
    b: 1,
    c: 2,
    d: { e: 5 },
  },
  b: [1, 3, { a: 2, b: 3 }],
  c: () => 111,
};
// get(obj, 'a.d.e')  -> 5
// get(obj, 'a.b.c.c.c') -> undefined;
// get(obj, 'a.b.c.c.c', 90) -> 90;
// get(obj, 'b[2].a', 90) -> 2;

function getObjValue(obj, path, defaultValue) {
  const keys = path.split(/[.\[\]]/).filter(Boolean);

  let curr = obj;
  let k = '';
  let value = null;
  for (let i = 0; i < keys.length; i++) {
    k = keys[i];
    value = curr[k];
    if (value === undefined) {
      return defaultValue;
    }

    curr = value;
  }

  return value;
}

module.exports = getObjValue;

// console.log(getObjValue(obj, 'b[2].a', 'hhhh'));
