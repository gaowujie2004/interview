// 遍历输出文件路径，如果是文件夹则不输出，而是递归输出文件夹下的文件

const fs = require('fs');
const path = require('path');
const join = (...args) => {
  return path.resolve(__dirname, ...args);
};

// 迭代
function filePath(rootPath) {
  const stack = [rootPath];

  while (stack.length) {
    const curPath = stack.pop();
    if (fs.statSync(curPath).isFile()) {
      console.log('文件Path--', curPath);
    } else {
      // 文件夹
      const childrenPath = fs.readdirSync(curPath);
      for (let i = childrenPath.length - 1; i >= 0; i--) {
        stack.push(join(curPath, childrenPath[i]));
      }
    }
  }
}

// 递归
function filePath(curPath) {
  if (fs.statSync(curPath).isFile()) {
    console.log('--file path: ', curPath);
    return;
  }

  // 文件夹,非叶子节点
  fs.readdirSync(join(curPath)).forEach((childPath) => {
    // childPath 相对路径
    // ....../a/ 文件夹 、a.js  b.js
    filePath(join(curPath, childPath));
  });
}

filePath(join('./test'));
