// 递归含义：返回克隆后的数据

function deepClone(value) {
  const weakMap = new WeakMap(); // key 必须是对象
  function deepCloneImpl(value) {
    if (!isObject(value)) {
      return value;
    }

    // 循环引用
    if (weakMap.has(value)) {
      return weakMap.get(value);
    }

    // 普通对象
    if (Object.prototype.toString.call(value) === {}.toString()) {
      const retObj = {};
      weakMap.set(value, retObj);

      for (const key in value) {
        retObj[key] = deepCloneImpl(value[key]);
      }
      return retObj;
    }

    // 数组
    if (Array.isArray(value)) {
      const retArr = new Array(value.length);
      weakMap.set(value, retArr);

      for (const el of value) {
        retArr.push(deepCloneImpl(el));
      }
      return retArr;
    }

    // Date RegExp
    if (value instanceof Data || value instanceof RegExp) {
      return new value.constructor(value);
    }

    // Set
    if (value instanceof Set) {
      const retSet = new Set();
      weakMap.set(value, retSet);

      for (const el of value) {
        retSet.add(deepCloneImpl(el));
      }
      return retSet;
    }

    // Map
    if (value instanceof Map) {
      const retMap = new Map();
      weakMap.set(value, retMap);

      for (const [key, val] of value) {
        retMap.set(deepCloneImpl(key), deepCloneImpl(val));
      }
      return retMap;
    }

    // 其他结构
    return value;
  }
  return deepCloneImpl(value);
}

function isObject(val) {
  return typeof val === "object" && val !== null;
}
