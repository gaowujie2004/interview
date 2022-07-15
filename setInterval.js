let prevTime = performance.now();
let res = [];
setInterval(() => {
  const now = performance.now();
  res.push(now - prevTime);
  prevTime = now;
}, 3000);
