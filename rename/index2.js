const path = require('path');
const fs = require('fs/promises');

function join(...args) {
  return path.resolve(__dirname, ...args);
}

/**
 *
 * @param {string} rootPath - 文件夹路径
 * @param {number} fileCount - 外部调用不需要传递此参数 default：0
 */
async function deepRename(rootPath, fileCount = 0) {
  const rootState = await fs.stat(rootPath);

  // 递归退出条件
  if (rootState.isFile()) {
    if (fileCount === 0) throw new TypeError('rootPath必须是文件夹');

    const newFilePath = rootPath.replace(/(?=\.[a-z]+$)/i, `-${fileCount}`);
    await fs.rename(rootPath, newFilePath);
    return;
  }

  // 文件夹，继续递归
  const fullChildrenPath = (await fs.readdir(rootPath)).map((child) => join(rootPath, child));
  await Promise.all(fullChildrenPath.map((childPath, fileCount) => deepRename(childPath, fileCount + 1)));

  // rootPath的叶子节点都修改完毕后，程序执行到这里 <-----
}

deepRename(join('./test'));
