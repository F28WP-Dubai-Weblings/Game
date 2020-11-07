const score = document.querySelector("#scoreBoard");
const startBoard = document.querySelector(".startNav");
const gameScreen = document.querySelector(".practiceScreen");

document.addEventListener("keydown", downKey);
document.addEventListener("keyup", upKey);
startBoard.addEventListener("click", start);

let racer = {
    pixelPosition:7
};

let events = {  //set the default values of all relevant key events to false
    ArrowUp:   false,
    ArrowDown:  false,
    ArrowRight: false,
    ArrowLeft: false
}; 

function downKey(event){
    event.preventDefault();
    events[event.key] = true;
    
}

function upKey(event){
    event.preventDefault();
    events[event.key] = false;

}

function move(){

    let car = document.querySelector(".carVector");
    
    if(racer.ready){
        if (events.ArrowUp) {
            racer.verticalPos -= racer.pixelPosition;
        }
        if (events.ArrowLeft) {
            racer.horizontalPos -= racer.pixelPosition;
        }

        if (events.ArrowDown) {
            racer.verticalPos += racer.pixelPosition;
        }
        if (events.ArrowRight) {
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
    gameScreen.appendChild(car);    //append the div to the game screen

    racer.horizontalPos = car.offsetLeft;   //initialise the position of the player (x-axis)
    racer.verticalPos = car.offsetTop; //initialise the position of the player (y-axis) 

}
