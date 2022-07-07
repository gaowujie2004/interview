const LRUCache = require('../LRU');

['LRUCache', 'put', 'put', 'put', 'put', 'get', 'get', 'get', 'get', 'put', 'get', 'get', 'get', 'get', 'get'];
//
[[3], [1, 1], [2, 2], [3, 3], [4, 4], [4], [3], [2], [1], [5, 5], [1], [2], [3], [4], [5]];

const cache = new LRUCache(1);
cache.put(1, 1);
cache.put(2, 2);
cache.put(3, 3);
cache.put(4, 4);

cache.get(4);
cache.get(3);
cache.get(2);
cache.get(1);

cache.put(5, 5);

cache.get(1);
let e1 = cache.get(2); //
cache.get(3);
let e2 = cache.get(4); //
cache.get(5);

console.log(e1, e2);
