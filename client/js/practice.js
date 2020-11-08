const score = document.querySelector("#scoreBoard");
const startBoard = document.querySelector(".startNav");
const gameScreen = document.querySelector(".practiceScreen");
let road = document.querySelector(".animateTrack")

document.addEventListener("keydown", downKey);
document.addEventListener("keyup", upKey);
startBoard.addEventListener("click", start);

let racer = {
    pixelPosition:10
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
        if (events.ArrowUp && racer.verticalPos>70) {   //move up when ArrowUp is pressed & don't let the car move above 70px (height)
            racer.verticalPos -= racer.pixelPosition;
        }
        if (events.ArrowLeft && racer.horizontalPos>0) {   //move left when ArrowLeft is pressed & set minimum horizontal position as 35px (width)
            racer.horizontalPos -= racer.pixelPosition;
        }

        if (events.ArrowDown  && racer.verticalPos<1000) {  //move down when ArrowDown is pressed & don't let the car move beyond 1000px (height)
            racer.verticalPos += racer.pixelPosition;
        }
        if (events.ArrowRight && racer.horizontalPos<950) {    //move right when the ArrowRight is press & don't let the car move beyond 1020px (width)
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


    for (x = 0; x<3; x++)   {
        let fuel = document.createElement("div");
        fuel.setAttribute("class", "fuelStyle");
        
        fuel.verticalPos=(x*150);
        fuel.style.top = fuel.verticalPos + "px";
        let random =  Math.floor(Math.random() * 750) + "px";
        fuel.style.left = random;
        road.append(fuel);
   }

   
    
		
		
    
}
