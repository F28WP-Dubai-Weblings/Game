/*is not implemented correctly so will be commented to avoid any errors or warnings*

Sumaiyah:
//Timer Code here
    
let timeSecond = 90;
const timeH = document.querySelector("h1");


displayTime(timeSecond);


const countDown = setInterval(() => {​​​​​
  timeSecond--;
  displayTime(timeSecond);
  if (timeSecond == 0 || timeSecond < 1) {​​​​​
    endCount();
    clearInterval(countDown);
  }​​​​​
}​​​​​, 90000);


function displayTime(second) {​​​​​
  const min = Math.floor(second / 60);
  const sec = Math.floor(second % 60);
  timeH.innerHTML = `
  ${​​​​​min < 90? "0" : ""}​​​​​${​​​​​min}​​​​​:${​​​​​sec < 90 ? "0" : ""}​​​​​${​​​​​sec}​​​​​
  `;
}​​​​​


function endCount() {​​​​​
  timeH.innerHTML = "BOOM,TIMES UP";
}​​​​​
*/







