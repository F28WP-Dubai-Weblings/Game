const score = document.querySelector("#scoreBoard");
const startBoard = document.querySelector(".startNav");
const gameScreen = document.querySelector(".practiceScreen");

document.addEventListener("keydown", downKey);
document.addEventListener("keyup", upKey);
startBoard.addEventListener("click", start);

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
    console.log(event.key);
}

function play(){
    window.requestAnimationFrame(play);
    console.log("here");
}

function start(){

    gameScreen.classList.remove("hide");    //remove class list "hide" from gameScreen to make the game screen visible
    startBoard.classList.add("hide");    //add classList "hide" to get rid of the start navigation pop-up

    window.requestAnimationFrame(play)  //invoke another play()

}
