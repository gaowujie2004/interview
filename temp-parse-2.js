let template = '我是{{name}}，年龄{{age}}，性别{{sex}}，爱好有:{{hobby.toString()}}';
let data = {
  name: 'GWJ',
  age: 18,
  sex: '男',
  hobby: ['HTML', 'CSS', 'JavaScript', 'React'],
};

// render(template, data); 我是姓名，年龄18，性别undefined

function render(template, data) {
  return template.replace(/{{([\s\S]*?)}}/g, (all, cur) => get(data, cur.trim()));
}

function get(obj, path, defaultValue) {
  // 不用reduce是为了及时退出
  const keys = path.split(/\.|\[|\]/).filter(Boolean);
  let res = obj;

  for (let i = 0; i < keys.length; i++) {
    /**
     * @type string
     */
    const key = keys[i].trim();
    if (key.endsWith('()')) {
      res = res[key.slice(0, -2)]();
    } else {
      res = res[key];
    }
    if (res === undefined || res === null) {
      return defaultValue;
    }
  }

  return res;
}

console.log('模板字符串解析 RES', render(template, data));
