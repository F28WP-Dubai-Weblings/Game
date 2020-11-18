//TimerCode Here
let t=1;
setTimeout(function race(){
    func(t++)
    setTimeout(race,900000);
} , 900000);
console.log("This is the timer function");