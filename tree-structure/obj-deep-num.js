// 嵌套对象的层数

function getObjN(obj) {
  function getObjNImpl(obj) {
    // 递归临界
    if (Object.prototype.toString.call(obj) !== '[object Object]') {
      return 0;
    }

    let numbers = Object.entries(obj).map(([, val]) => getObjNImpl(val));
    return Math.max(...numbers) + 1;
  }

  return getObjNImpl(obj) - 1;
}

let o1 = {
  a: 1,
};
// 层数0

let o2 = {
  a: 1,

  info2: {
    c: 3,
    info3: {
      d: 4,
      info4: {
        e: 5,
      },
    },
  },

  person: {
    info: {
      b: 2,
    },
  },
};
// 层数1

console.log(getObjN(o2));
