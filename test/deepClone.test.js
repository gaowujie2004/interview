const deepClone = require('../deep-clone-712');

test('基本值', () => {
  expect(deepClone(1)).toBe(1);
  expect(deepClone(0)).toBe(0);
  expect(deepClone(true)).toBe(true);
  expect(deepClone(false)).toBe(false);

  const noop = () => {};
  expect(deepClone(noop)).toBe(noop);
});

test('一层深度', () => {
  expect(
    deepClone({
      name: 1,
      age: 22,
    })
  ).toEqual({
    name: 1,
    age: 22,
  });
});
