// js code here
let i = 1;
setTimeout(function run() {
  func(i++);
  setTimeout(run, 900000);
}, 900000);
console.log('Timer Function');