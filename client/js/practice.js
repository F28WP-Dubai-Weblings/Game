const score = document.querySelector("#scoreBoard");
const startBoard = document.querySelector(".startNav");
const gameScreen = document.querySelector(".practiceScreen");
let road = document.querySelector(".animateTrack")

document.addEventListener("keydown", downKey);
document.addEventListener("keyup", upKey);
startBoard.addEventListener("click", start);

console.log("in practice")
let racer = {
    pixelPosition:4
};

let events = {  //set the default values of all relevant key events to false
    ArrowUp:   false,
    ArrowDown:  false,
    ArrowRight: false,
    ArrowLeft: false
}; 

function downKey(event){
    event.preventDefault(); //disregrard the inbuilt default representation of the key events
    events[event.key] = true;
    
}

function upKey(event){
    event.preventDefault();
    events[event.key] = false;

}


function move(){

    let car = document.querySelector(".carVector");

    if(racer.ready){
        if (events.ArrowUp && racer.verticalPos>70) {   //move up when ArrowUp is pressed & don't let the car move above 70px (height)
            racer.verticalPos -= racer.pixelPosition;
        }
        if (events.ArrowLeft && racer.horizontalPos>0) {   //move left when ArrowLeft is pressed & set minimum horizontal position as 35px (width)
            racer.horizontalPos -= racer.pixelPosition;
        }

        if (events.ArrowDown  && racer.verticalPos<1000) {  //move down when ArrowDown is pressed & don't let the car move beyond 1000px (height)
            racer.verticalPos += racer.pixelPosition;
        }
        if (events.ArrowRight && racer.horizontalPos<687) {    //move right when the ArrowRight is press & don't let the car move beyond 1020px (width)
            racer.horizontalPos += racer.pixelPosition;
        }
    }
    car.style.left = racer.horizontalPos + "px";
    car.style.top = racer.verticalPos + "px";

    window.requestAnimationFrame(move);
}



function start(){

    racer.ready = true;
    gameScreen.classList.remove("hide");    //remove class list "hide" from gameScreen to make the game screen visible
    startBoard.classList.add("hide");    //add classList "hide" to get rid of the start navigation pop-up


    window.requestAnimationFrame(move)  //invoke another play()

    let car = document.createElement("div"); //create a div element in the dom
    car.setAttribute("class", "carVector"); //set class attribute of the div
    road.appendChild(car);    //append the div to the game screen

    racer.horizontalPos = car.offsetLeft;   //initialise the position of the player (x-axis)
    racer.verticalPos = car.offsetTop; //initialise the position of the player (y-axis) 
  

    let fuelImg = document.createElement("img");    //create an image element, fuelImg
 
    fuelImg.src = "https://f28wp-dubai-weblings.github.io/Game/client/media/fuel.png"; //add the image source to fuelImg 
    let fuelPoint = document.getElementById("fuelDiv");   //create a parent variable that stores the fuelDiv
     
    fuelPoint.appendChild(fuelImg);    //add fuelImg to the fuelDiv
    
    
    let currentTop = 0; //initialise currentTop to 0
    
    
    let initialHeight = road.offsetHeight;  //initialise height on the road
    let initialWidth = road.offsetWidth;    //initialise width of the road
    
    
    let runner = 0;
    window.setInterval(function() { //generate a fuelPoint at a random position every 3000ms
        
        if (runner === 2){
            runner = 0;
            currentTop = 0;
        }
        if (runner === 1){
            currentTop = 400;
        }
       
        currentLeft =(0.9 * (initialWidth)-100)+1;
        
        fuelPoint.style.top = currentTop + "px";    
        fuelPoint.style.left = currentLeft + "px";
        runner = runner +1;
        }, 3000);      

}
