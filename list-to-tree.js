function listToTree(data) {
  let treeData = [];
  let temp = data.reduce((memo, node) => {
    memo[node.id] = node;
    return memo;
  }, {});

  for (let id in temp) {
    if (+temp[id].parentId === 0) {
      treeData.push(temp[id]);
      continue;
    }
    // parentId !== 0

    const curNode = temp[id];
    const curParentNode = temp[curNode.parentId];
    if (!curNode.children) {
      curNode.children = [];
    }
    if (!curParentNode.children) {
      curParentNode.children = [];
    }
    curParentNode.children.push(curNode);
  }

  return treeData;
}

let list = [
  {
    id: 1,
    text: '节点1',
    parentId: 0, //这里用0表示为顶级节点
  },
  {
    id: 2,
    text: '节点1_1',
    parentId: 1, //通过这个字段来确定子父级
  },
  {
    id: 3,
    text: '节点1_2',
    parentId: 1, //通过这个字段来确定子父级
  },
  {
    id: 4,
    text: '节点1_3',
    parentId: 1, //通过这个字段来确定子父级
  },
  {
    id: 5,
    text: '节点2',
    parentId: 0, //这里用0表示为顶级节点
  },
];

const tree = listToTree(list);
console.log(tree);
