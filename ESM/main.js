import { age } from './data.js';

setInterval(() => {
  console.log('main.js 循环定时器', age);
}, 2500);
