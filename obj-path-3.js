const obj = {
  a: {
    b: 1,
    c: 2,
    d: { e: 5 },
  },
  b: [1, 3, { a: 2, b: 3 }],
  c: 3,
  utils: {
    getTime: () => Date.now(),
  },
};
// get(obj, 'a.d.e')  -> 5
// get(obj, 'a.b.c.c.c') -> undefined;
// get(obj, 'a.b.c.c.c', 90) -> 90;
// get(obj, 'b[2].a', 90) -> 2;
// get(obj, 'utils.getTime()')

/**
 *
 * @param {Object} obj
 * @param {string} path
 * @param {any} defaultValue
 */
function get(obj, path, defaultValue) {
  // 不用reduce是为了及时退出
  const keys = path.split(/\.|\[|\]/).filter(Boolean);
  let res = obj;

  for (let i = 0; i < keys.length; i++) {
    const key = keys[i].trim();

    if (key.endsWith('()')) {
      res = res[key.slice(0, -2)]();
    } else {
      res = res[key];
    }
    if (res === undefined || res === null) {
      return defaultValue;
    }
  }

  return res;
}

/**================================== TEST **/
console.log('时间', get(obj, 'utils.getTime()'));

function get(obj, path, defaultValue) {
  // 不用reduce是为了及时退出
  const keys = path.split(/\.|\[|\]/).filter(Boolean);

  return keys.reduce((curObj, curKey) => curObj[curKey], obj);
}
