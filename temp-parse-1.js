const get = require('./obj-path');

/**
 *
 * @param { string } tempStr
 * @param { object } data
 */
function render(tempStr, data) {
  tempStr.replace(/{{\s*([\s\S]+?)\s*}}/gi, (...[, pathStr]) => {
    console.log(get(data, pathStr, '--'));
  });
}

/**================================== 测试 **/
let template = '我是{{name}}，年龄{{age}}，爱好:{{hobby.join("-")}}';
let data = {
  name: '姓名',
  age: 18,
  body: {
    height: 174,
    weight: 138,
  },
  address: {
    region: 'china',
    detail: {
      province: '河南',
    },
  },
  hobby: [
    'css',
    'html',
    {
      name: 'js',
      full: 'JavaScript',
      version: 'es6+',
    },
  ],
};

// console.log(get(data, 'address.detail.province'));
render(template, data); // 我是姓名，年龄18，性别undefined
