class LRUCache {
  constructor(maxSize) {
    this.maxSize = maxSize;
    this.map = new Map(); // key-value
  }

  // 不存在返回-1
  // 存在则将这个key变为最新的。
  get(key) {
    if (this.map.has(key)) {
      const value = this.map.get(key);

      this.map.delete(key);
      this.map.set(key, value); // 添加到最后面
      return value;
    } else {
      return -1;
    }
  }

  // 设置。是否存在，不存在直接添加
  // 存在，看看是否溢出
  put(key, value) {
    if (this.map.has(key)) {
      // 存在，仅修改，那么这个key就是最新的
      this.map.delete(key);
      this.map.set(key, value);
      return;
    } else if (this.map.size <= this.maxSize) {
      // 未溢出，插入，默认最后面
      this.map.set(key, value);
    } else {
      // 溢出，插入
      this.map.set(key, value);

      // 删除最旧的
      this.map.delete(this.ma);
    }
  }
}
