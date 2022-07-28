const { isObject, isFunc } = require('./utils');

/**
 * new 的原理是，生成一个对象，obj，obj.__proto__  === fn.prototype
 * 然后，看构造函数，如果return一个引用值，则 new 构造函数() 返回这个引用值，
 * 否则返回 obj
 */

function myNew(fn, ...args) {
  const obj = Object.create(fn.prototype);
  const res = fn.apply(obj, args);

  if (isObject(res) || isFunc(res)) {
    return res;
  }

  return obj;
}

/**================================== TEST **/
function Person(name, age) {
  this.name = name;
  this.age = age;
}
const person = myNew(Person, 'gwj', 23);
console.log(person);
