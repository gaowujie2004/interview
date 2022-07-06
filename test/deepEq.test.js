const deepEq = require('../deepEq');

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
