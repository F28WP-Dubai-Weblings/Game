// js code here
let i = 1;
setTimeout(function run() {
  func(i++);
  setTimeout(run, 200000);
}, 200000);
console.log('Timer Function');