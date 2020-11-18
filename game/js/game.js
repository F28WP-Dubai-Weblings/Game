// js code here
let i = 1;
setTimeout(function run() {
  func(i++);
  setTimeout(run, 100000);
}, 100000);
console.log('Timer Function');