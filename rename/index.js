/**
 * 目标：实现删除一个深文件夹，即删除 a 文件夹，但 a 有还有文件夹和文件。
 *
 * 使用 async-await，以及 fs/promise 文件系统，最终形态
 * 好处：
 * 1、统一处理错误（也能够针对某个处理）
 * 2、很简洁，易懂
 */

const fs = require('fs/promises');
const path = require('path');
const join = (...args) => {
  return path.resolve(__dirname, ...args);
};

// 删除深文件夹 —— Promise
async function rmdir(rootPath, fileCount) {
  const rootState = await fs.stat(rootPath);

  // rootPath，是叶子节点，是文件
  if (rootState.isFile()) {
    if (!fileCount) return '请传入目录路径，而不是文件路径';

    await fs.rename(rootPath, rootPath.replace(/(?=\.\w+$)/, String(fileCount)));
    return;
  }

  // rootPath，是父节点，是文件夹
  let childrenPaths = await fs.readdir(rootPath);
  if (!childrenPaths.length) return;
  childrenPaths = childrenPaths.map((dir) => join(rootPath, dir));

  // 并行删除兄弟节点，IO是多线程的
  let resList = childrenPaths.map((childPath, index) => rmdir(childPath, index + 1));
  await Promise.all(resList);

  // 子节点全部删除完，再删除自身
  // await fs.rmdir(rootPath);
}

rmdir(join('./test'))
  .then((val) => {
    console.log('--修改成功');
  })
  .catch((err) => {
    console.log('--修改失败！！！', err);
  });

// const parsePath = path.parse(path.join(__dirname, './index.js'));
// console.log('----新的', join(parsePath.dir, parsePath.name + '-new' + parsePath.ext));

// console.log(path.join(__dirname, './index.js').replace(/(?=\.\w+$)/, '-1'));
