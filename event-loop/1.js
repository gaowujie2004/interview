setTimeout(function timeout() {
  console.log('setTimeout');
}, 0);

Promise.resolve()
  .then(function then1() {
    console.log('promise1');
  })
  .then(function then2() {
    console.log('promise2');
  });
// 第一个then()调用完毕后，第二个then中的回调函数已经加入微任务队列
