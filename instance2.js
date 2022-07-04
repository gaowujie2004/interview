function myInstanceOf(left, right) {
  const prototype = right.prototype;
  while (left && left.__proto__ !== prototype) {
    left = left.__proto__;
  }

  return !!left;
}

let obj = {};

function Person() {
  this.name = 'gwj';
}
let person = new Person();

console.log(myInstanceOf(obj, Object));
console.log(myInstanceOf(person, Object));
console.log(myInstanceOf(person, Person));
console.log(myInstanceOf(() => {}, Function));
console.log(myInstanceOf(Function.prototype, Object));
