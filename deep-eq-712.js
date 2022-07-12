/**
 * 相比于上一版，多了一个循环引用判断。
 */

const isObject = (val) => !!val && typeof val === 'object';
const isType = (v1, typeStr) => Object.prototype.toString.call(v1) === `[object ${typeStr}]`;

const isSet = (val) => isType(val, 'Set');
const isMap = (val) => isType(val, 'Map');

const weakMap = new Map();

// 递归： 两个入参，return bool，
function deepEq(value1, value2) {
  if (value1 === value2) {
    return true;
  } else {
    // 只要有一个 基本值||函数
    // 即一个引用值 一个基本值
    if (!isObject(value1) || !isObject(value2)) {
      return false;
    }
  }

  // value1、value2 all is 指针(not Function)
  if (weakMap.has(value1) && weakMap.has(value2)) {
    return true;
  } else {
    weakMap.set(value1, true);
    weakMap.set(value2, true);
  }

  // structure not eq
  if (Object.prototype.toString.call(value1) !== Object.prototype.toString.call(value2)) {
    return false;
  }

  // all is Object
  // ignore key-value order
  if (Object.prototype.toString.call(value1) === '[object Object]') {
    // 获取自身属性，包括非枚举属性（普通键、Symbol键）
    const key1s = Reflect.ownKeys(value1);
    const key2s = Reflect.ownKeys(value2);

    if (key1s.length !== key2s.length) {
      return false;
    } else if (key1s.length === 0) {
      return true;
    }

    // 长度相同，不为零
    // 不使用迭代模式，是因为需要随时退出函数
    for (const key1 of key1s) {
      if (!value2.hasOwnProperty(key1)) {
        return false;
      }

      if (!deepEq(value1[key1], value2[key1])) {
        return false;
      }
    }

    // 全部OK
    return true;
  }

  // all is Array
  if (Array.isArray(value1)) {
    if (value1.length !== value2.length) {
      return false;
    }

    for (let i = 0; i < value1.length; i++) {
      if (!deepEq(value1[i], value2[i])) return false;
    }

    return true;
  }

  // all is Set or Map
  if (isSet(value1) || isMap(value1)) {
    if (value1.size !== value2.size) return false;

    if (!deepEq([...value1], [...value2])) {
      return false;
    }
    return true;
  }

  // Set、Map 等其他结构，暂不考虑
  // 为什么false，因为开头已经引用判断了
  return false;
}

module.exports = deepEq;
