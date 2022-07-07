class DoubleList {
  constructor() {
    this.dummyHead = {
      prev: null,
      next: null,
      key: null,
      val: null,
    };
    this.dummyHead.next = this.dummyHead.prev = this.dummyHead;
  }

  addFirst(newNode) {
    this.dummyHead.next.prev = newNode; // 旧的首节点

    newNode.next = this.dummyHead.next;
    newNode.prev = this.dummyHead;

    this.dummyHead.next = newNode; // 虚拟头节点
  }

  remove(cur) {
    if (this.dummyHead.next === this.dummyHead) return false;

    // 剪断cur的前驱，后驱节点对cur的引用。
    cur.prev.next = cur.next;
    cur.next.prev = cur.prev;
  }

  removeLast() {
    if (this.dummyHead.next === this.dummyHead) return false;

    const lastNode = this.dummyHead.prev;
    const lastTwoNode = lastNode.prev;

    this.dummyHead.prev = lastTwoNode;
    lastTwoNode.next = this.dummyHead; //干啥呢？

    return lastNode;
  }
}

const createNode = (key, val) => ({
  prev: null,
  next: null,
  key,
  val,
});

/**
 * Your LRUCache object will be instantiated and called as such:
 * var obj = new LRUCache(capacity)
 * var param_1 = obj.get(key)
 * obj.put(key,value)
 */

class LRUCache {
  /**
   * @param {number} capacity
   */
  constructor(capacity) {
    this.max = capacity;
    this.map = new Map();
    this.doubleList = new DoubleList();
  }

  /**
   * @param {number} key
   * @return {number}
   */
  get(key) {
    // 获取(map)，就将获取后的 node 移到最前(链表中)
    const node = this.map.get(key);
    if (node === undefined) return -1; // 必须要用 undefined 判断

    this.doubleList.remove(node);
    this.doubleList.addFirst(node);
    // 链表更新位置

    return node.val;
  }

  /**
   * @param {number} key
   * @param {number} value
   * @return {void}
   */
  put(key, val) {
    /**
     * case 边界： 将node放到最前。
     * 1、key 不存在，则插入。链表中是头位置，map中顺序插入，因为查找时间复杂度O(1)
     * 2、key 存储，则更新，并放到最前
     * 3、溢出，删除最后节点（链表），并插入
     */
    let newNode = createNode(key, val);

    if (this.map.has(key)) {
      // 更新
      this.doubleList.remove(this.map.get(key));
      this.doubleList.addFirst(newNode);
      this.map.set(key, newNode);
    } else {
      // 插入
      if (this.map.size === this.max) {
        // 溢出
        const lastNode = this.doubleList.removeLast();
        this.map.delete(lastNode.key); // todo: 存key的原因
      }
      this.map.set(key, newNode);
      this.doubleList.addFirst(newNode);
    }
  }
}

module.exports = LRUCache;
