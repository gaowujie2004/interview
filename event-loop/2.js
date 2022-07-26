Promise.resolve()
  .then(function then1() {
    setTimeout(function timeout() {
      console.log('--111');
    }, 0);
  })
  .then(function then2() {
    console.log('--222');
  });
