const ok = Promise.resolve(111);
// const err = Promise.reject(999);

console.log('go');
ok.finally(() => {
  return new Promise((r) => {
    setTimeout(() => {
      r(2000);
    }, 2000);
  });
}).then((val) => {
  console.log(val, 'ok');
});
