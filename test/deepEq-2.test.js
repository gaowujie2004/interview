const deepEq = require('../deep-eq-712');

test('基本值/函数', () => {
  expect(deepEq()).toBe(true);
  expect(deepEq(1, 1)).toBe(true);
  expect(deepEq(true, true)).toBe(true);
  expect(deepEq(true, false)).toBe(false);

  expect(
    deepEq(
      () => {},
      () => {}
    )
  ).toBe(false);

  const noop = () => {};
  expect(deepEq(noop, noop)).toBe(true);
});

test('Object 简单的', () => {
  expect(deepEq({}, {})).toBe(true);
  expect(deepEq({ a: 1 }, { a: 1 })).toBe(true);

  // 忽略顺序
  expect(deepEq({ a: 1, b: 2 }, { b: 2, a: 1 })).toBe(true);
  expect(deepEq({ a: 1 }, { b: 2, a: 1 })).toBe(false);
});

test('Array 简单的', () => {
  expect(deepEq([], [])).toBe(true);
  expect(deepEq([1], [1])).toBe(true);
  expect(deepEq([1, 2], [1, 2])).toBe(true);
  expect(deepEq([1, 2, 3], [1, 2, 3])).toBe(true);
  expect(deepEq([1, 2, 3, 4, 5, 6], [1, 2, 3, 4, 5, 6])).toBe(true);
});

test('Object 循环引用-1', () => {
  let obj1 = { a: 1 };
  let obj2 = { a: 1 };

  obj1.b = obj2;
  obj2.b = obj1;

  // 忽略顺序
  expect(deepEq(obj1, obj2)).toBe(true);
});

test('Object 循环引用-2', () => {
  let obj1 = { a: 1 };
  let obj2 = { a: 1 };
  let obj3 = { a: 1 };

  obj1.b = obj2;
  obj2.b = obj3;
  obj3.b = obj1;

  // 忽略顺序
  expect(deepEq(obj1, obj2)).toBe(true);
});

test('复杂的1', () => {
  let o1 = {
    a: 1,
    b: 2,
    list1: {
      obj: {
        name: 'G',
      },
      c: 3,
      d: 4,
    },
  };
  let o2 = {
    a: 1,
    b: 2,
    list1: {
      obj: {
        name: 'G',
      },
      c: 3,
      d: 4,
    },
  };
  expect(deepEq(o1, o2)).toBe(true);
});

test('复杂的2', () => {
  let o1 = {
    d: 5,
    c: [
      1,
      2,
      3,
      {
        test: [1, 2, 3],
      },
    ],
    a: 1,
    b: 2,
    list1: {
      obj: {
        name: 'G',
      },
      c: 3,
      d: 4,
    },
  };
  let o2 = {
    a: 1,
    b: 2,
    list1: {
      obj: {
        name: 'G',
      },
      c: 3,
      d: 4,
    },
    d: 5,
    c: [1, 2, 3, { test: [1, 2, 3] }],
  };
  expect(deepEq(o1, o2)).toBe(true);
});

test('Set', () => {
  let set1 = new Set([1, 2, 3, 4, 4, 4, 4]);
  let set2 = new Set([1, 2, 3, 4]);

  expect(deepEq(set1, set2)).toBe(true);
});

test('Map', () => {
  let map1 = new Map([
    ['k1', 111],
    ['k2', 222],
    ['k3', 333],
    ['a', 99],
  ]);

  let map2 = new Map([
    ['k1', 111],
    ['k2', 222],
    ['k3', 333],
    ['b', 99],
  ]);

  expect(deepEq(map1, map2)).toBe(false);
});

test('Map', () => {
  let map1 = new Map([
    ['k1', 111],
    ['k2', 222],
    ['k3', 333],
  ]);

  let map2 = new Map([
    ['k1', 111],
    ['k2', 222],
    ['k3', 333],
  ]);

  expect(deepEq(map1, map2)).toBe(true);
});

test('Map 引用类型健名', () => {
  let map1 = new Map([
    [{}, 111],
    [{}, 222],
    [{ a: 1 }, {}],
  ]);

  let map2 = new Map([
    [{}, 111],
    [{}, 222],
    [{ a: 1 }, {}],
  ]);
  map1.set('hh', map2);
  map2.set('hh', map1);

  expect(deepEq(map1, map2)).toBe(true);
});
