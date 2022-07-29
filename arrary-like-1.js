// 类数组转数组
const arrayLike = { length: 3, 0: 'a', 1: 'b', 2: 'c' };

// 1. Array.from(), 接收具有迭代属性的对象，或者类数组（索引属性和length属性）
const a1 = Array.from(arrayLike);
// [...arrayLike]

// 2. slice
const a2 = Array.prototype.slice.call(arrayLike);

// 3. concat
const a3 = Array.prototype.concat.apply([], arrayLike);
// 相当于这样 [].concat(arrayLike[0], arrayLike[1], ...)

// 4. for生成

// 5. apply, TODO: 很吊
const a4 = Array.apply(null, arrayLike);
// Array(1,2,3,4) -> [1,2,3,4]
