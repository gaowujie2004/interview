/**================================== 循环 **/
function myInstanceOf(left, right) {
  while (left) {
    left = left.__proto__;
    if (left === right.prototype) {
      return true;
    }
  }

  return false;
}

function Person() {
  this.name = 'gwj';
}

let obj = {};
let person = new Person();

console.log(myInstanceOf(obj, Object));
console.log(myInstanceOf(person, Object));
console.log(myInstanceOf(person, Person));
console.log(myInstanceOf(() => {}, Function));
