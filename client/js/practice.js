const score = document.querySelector(".scoreBoard");
const startBoard = document.querySelector(".startNav");
const gameScreen = document.querySelector(".practiceScreen");
const end = document.querySelector(".end");

let road = document.querySelector(".animateTrack")

document.addEventListener("keydown", downKey);
document.addEventListener("keyup", upKey);
startBoard.addEventListener("click", start);

let counter = 0;
let coneCounter = 0;

console.log("in practice")
let racer = {
    pixelPosition:4,
    score:0
};

let fuelObj = {
    pixelPosition:4
};

let coneObj = {
    pixelPosition:5
}

let events = {  //set the default values of all relevant key events to false
    ArrowUp:   false,
    ArrowDown:  false,
    ArrowRight: false,
    ArrowLeft: false
}; 

function downKey(event){
    event.preventDefault(); //disregrard the inbuilt default representation of the key events
    events[event.key] = true;
    console.log(event.key);
    
}

function upKey(event){
    event.preventDefault();
    events[event.key] = false;

}


function collision(racer,fuelObj){

    
    /* NOTE TO READER: the -35s here are added to make sure the collision is significant, 
    i.e, the bullet or the fuelPoints have significantly collided with the player, not simply overlapped at their boundaries/borders*/
   playerRect = racer.getBoundingClientRect();
   objectRect = fuelObj.getBoundingClientRect();

   return( !((playerRect.bottom < objectRect.top) || (playerRect.top > objectRect.bottom)|| (playerRect.right<objectRect.left+40) || (playerRect.left +40 > objectRect.right)))
            
}

function gameOver(){
    racer.ready = false;
    road.style.animationPlayState = "paused";
    end.classList.remove("hide");    //add classList "hide" to get rid of the start navigation pop-up

 
}

let flag = false;
let fuel;
function updatePos(flag){
    if (!flag){
        fuel = document.querySelector(".fuelDiv");
        counter++; 
        if (counter >100 && counter < 300){
            counter++;
        }   
        if (counter > 298){
            fuelObj.horizontalPos = (Math.random() * 670);
            fuelObj.verticalPos = (Math.random() * 620);
            counter = 0;
        } 
    }
    else{
        fuelObj.horizontalPos = 1000;
        fuelObj.verticalPos = 1000;
    }
    fuel.style.left = fuelObj.horizontalPos + "px";
    fuel.style.top = fuelObj.verticalPos + "px";
}{}



let cone;
let bug = false;
function updateCone() {
    cone = document.querySelector(".coneDiv");
    car = document.querySelector(".carVector");


    coneCounter++;

    if (coneCounter >100 && coneCounter < 700){
        coneCounter++;

    }   
    if (coneCounter >650){
        coneObj.horizontalPos = (Math.random() * 670);
        coneObj.verticalPos = (Math.random() * 620);
        bug = collision(car,cone);
        
        coneCounter = 0;
    } 
    

    cone.style.left = coneObj.horizontalPos + "px";
    cone.style.top = coneObj.verticalPos + "px";

}

function move(){

    let car = document.querySelector(".carVector");
    let fuel = document.querySelector(".fuelDiv");
    let cone = document.querySelector(".coneDiv");

   

    if(racer.ready){

        updatePos(false);
        updateCone();

        let collide = collision(car,fuel);
        if (collide){
            racer.score +=100;
            updatePos(true);
            collide = false;         
        }

        let crash = collision(car, cone);
        if (crash){
            gameOver();     
        }

        if (events.ArrowUp && racer.verticalPos>70) {   //move up when ArrowUp is pressed & don't let the car move above 70px (height)
            racer.verticalPos -= racer.pixelPosition;
        }
        if (events.ArrowLeft && racer.horizontalPos>0) {   //move left when ArrowLeft is pressed & set minimum horizontal position as 35px (width)
            racer.horizontalPos -= racer.pixelPosition;
        }

        if (events.ArrowDown  && racer.verticalPos<700) {  //move down when ArrowDown is pressed & don't let the car move beyond 1000px (height)
            racer.verticalPos += racer.pixelPosition;
        }
        if (events.ArrowRight && racer.horizontalPos<675) {    //move right when the ArrowRight is press & don't let the car move beyond 1020px (width)
            racer.horizontalPos += racer.pixelPosition;
        }     
        
        racer.score+=1;
        car.style.left = racer.horizontalPos + "px";
        car.style.top = racer.verticalPos + "px";

    //generate random fuel positions.
    score.innerText = "SCORE:  " + racer.score;
    }
    

    window.requestAnimationFrame(move);
}



function start(){

    racer.ready = true;
    racer.score = 0;
    
    startBoard.classList.add("hide");    //add classList "hide" to get rid of the start navigation pop-up
    gameScreen.classList.remove("hide");    //remove class list "hide" from gameScreen to make the game screen visible
    
    window.requestAnimationFrame(move)  //invoke another play()

    let car = document.createElement("div"); //create a div element in the dom
    car.setAttribute("class", "carVector"); //set class attribute of the div
    road.appendChild(car);    //append the div to the game screen

    racer.horizontalPos = car.offsetLeft;   //initialise the position of the player (x-axis)
    racer.verticalPos = car.offsetTop+250; //initialise the position of the player (y-axis) 
  

    let fuel = document.createElement("div");
    fuel.setAttribute("class", "fuelDiv");     
    road.appendChild(fuel);    //add fuelImg to the fuelDiv
    
    fuelObj.horizontalPos = (Math.random() * 670);
    fuelObj.verticalPos = (Math.random() * 620);

    //set up cone obstacles
    let cone = document.createElement("div");
    cone.setAttribute("class", "coneDiv");
    road.appendChild(cone);

    coneObj.horizontalPos = (Math.random() * 670);
    coneObj.verticalPos = (Math.random() * 620);



}