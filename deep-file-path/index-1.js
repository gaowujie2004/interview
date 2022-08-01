// 递归获取文件夹下的所有文件路径。
const fs = require('fs');
const path = require('path');
const join = (...args) => path.resolve(__dirname, ...args);

// 将文件夹下的文件路径放入数组中。
var deepFilePath = function (curPath) {
  const retPaths = [];

  function impl(curPath) {
    if (fs.statSync(join(curPath)).isFile()) {
      retPaths.push(curPath);
      return;
    }

    // 返回curPath下的一层相对路径
    fs.readdirSync(join(curPath)).forEach((childPath) => {
      const fullChildPath = join(curPath, childPath);
      impl(fullChildPath);
    });
  }
  impl(curPath);

  return retPaths;
};

const ret1 = deepFilePath(join('./test'));

// 迭代
var deepFilePath = function (rootPath) {
  const retPaths = [];
  const stack = [join(rootPath)];

  let curPath = '';
  while (stack.length) {
    curPath = stack.pop();
    if (fs.statSync(curPath).isFile()) {
      retPaths.push(curPath);
    } else {
      fs.readdirSync(curPath).forEach((childRelativePath) => {
        stack.push(join(curPath, childRelativePath));
      });
    }
  }

  return retPaths;
};

const ret2 = deepFilePath(join('./test'));

// console.log
console.log('递归结果：', ret1);
console.log('迭代结果：', ret2);
