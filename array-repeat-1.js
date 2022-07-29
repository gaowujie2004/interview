// 1、Map/Object key 不能重复
function arrNotRepeat(arr) {
  let map = new Map();
  arr.forEach((item) => map.set(item, true));

  return [...map.keys()];
}

var arr = [1, 1, 11, 2, 3, 3, 3, 1, 1, 1, 2, 2, 4];
var res1 = arrNotRepeat(arr);
console.log('Map/Object 去重', res1);
