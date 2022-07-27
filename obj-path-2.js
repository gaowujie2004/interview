/**
{
  'a.b': 1,
  'a.c': 2,
  'a.d.e': 5,
  'b[0]': 1,
  'b[1]': 3,
  'b[2].a': 2,
  'b[2].b': 3,
  c: 3
}
 */
function get(obj, path, defaultValue) {
  if (!obj) return defaultValue;

  const keys = path.split(/[.\[\]]/).filter(str);
  let curr = obj;
  let key = null;

  for (let i = 0; i < keys.length; i++) {
    key = keys[i];
    curr = curr[key];

    if (curr === undefined) {
      return defaultValue;
    }
  }

  return curr;
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

console.log(get(obj, 'b[2].b', 0));
