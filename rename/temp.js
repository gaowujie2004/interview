const fs = require('fs/promises');

(async () => {
  const res = await fs.readdir('./test');
  console.log(res);
})();
