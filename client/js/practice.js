//JS CODE FOR SINGLE PLAYER MODE
/*AUTHOR NAME: RIDA @raqp2000*/

const score = document.querySelector(".scoreBoard");
const startBoard = document.querySelector(".startNav");
const gameScreen = document.querySelector(".practiceScreen");   
const end = document.querySelector(".end"); //game over alert

let road = document.querySelector(".animateTrack")

//listen for any of the following events:
document.addEventListener("keydown", downKey);  //when a key is pressed
document.addEventListener("keyup", upKey);  //when a key is left
startBoard.addEventListener("click", start);    //listen for when startboard is clciked

let counter = 0;
let coneCounter = 0;

let racer = {
    pixelPosition:4,
    score:0
};

//declare empty dictionary/objects

let fuelObj = {};   
let coneObj = {};



let events = {  //set the default values of all relevant key events to false
    ArrowUp:   false,
    ArrowDown:  false,
    ArrowRight: false,
    ArrowLeft: false
}; 
//when a key is pressed
function downKey(event){
    event.preventDefault(); //disregrard the inbuilt default representation of the key events
    events[event.key] = true;    
}
//when a key is left
function upKey(event){  
    event.preventDefault();
    events[event.key] = false;

}


function collision(racer,object){

    
    /* NOTE TO READER: the +40s and +10s here are added to make sure the collision is significant, 
    i.e, the bullet or the fuelPoints have significantly collided with the player, not simply overlapped at their boundaries/borders*/
   playerRect = racer.getBoundingClientRect();
   objectRect = object.getBoundingClientRect();


   return( !((playerRect.bottom < 10+objectRect.top) || (playerRect.top+10> objectRect.bottom)|| (playerRect.right<objectRect.left+40) || (playerRect.left+40> objectRect.right)))
            
}

function gameOver(){    //call when player has collided with a cone
    racer.ready = false;
    road.style.animationPlayState = "paused";
    end.classList.remove("hide");    //add classList "hide" to get rid of the start navigation pop-up
}


/*flag will be true if the player has collided with a fuel and the position must me set to (1000,1000) 
and false in the default case when a random position within the track has to be generated*/
let flag = false;   

let fuel;
function updatePos(flag){

    /*the position of the fuel must only be updated when counter value is greater than 650,
    settimeinterval is not used as this is not exactly frame based and any errors must be avoided*/
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
}



let cone;   //declare cone as a variable
function updateCone() {
    cone = document.querySelector(".coneDiv");
    car = document.querySelector(".carVector");


    coneCounter++;

    /*the position of the cone must only be updated when concounter value is greater than 650,
    settimeinterval is not used as this is not exactly frame based and any errors must be avoided*/
    if (coneCounter >100 && coneCounter < 680){
        coneCounter++;  

    }   
    if (coneCounter >650){
        coneObj.horizontalPos = (Math.random() * 670);
        coneObj.verticalPos = (Math.random() * 620);
        
        coneCounter = 0;
    } 
    
    //update the position of the cones
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
            racer.score +=100;  //increase the player score
            updatePos(true);    //this causes the fuel position to be instantly updated to (1000,1000) so it overflows from the track and is not visible
            collide = false;    //reset collide flag
        }

        //call the game over func if player has hit a cone
        let crash = collision(car, cone);
        if (crash){
            gameOver();     
        }

        if (events.ArrowUp && racer.verticalPos>0) {   //move up when ArrowUp is pressed & don't let the car move above the border of the track (height)
            racer.verticalPos -= racer.pixelPosition;
        }
        if (events.ArrowLeft && racer.horizontalPos>0) {   //move left when ArrowLeft is pressed & dont let the car move beyond the left border of the track (width)
            racer.horizontalPos -= racer.pixelPosition;
        }

        if (events.ArrowDown  && racer.verticalPos<530) {  //move down when ArrowDown is pressed & don't let the car move beyond the bottom of the track (height)
            racer.verticalPos += racer.pixelPosition;
        }
        if (events.ArrowRight && racer.horizontalPos<690) {    //move right when the ArrowRight is press & don't let the car move beyond the right border of the track (width)
            racer.horizontalPos += racer.pixelPosition;
        }     
        
        racer.score+=1;//increment the players score by 1 in every fram

        //update .carVector div positon i.e., player 
        car.style.left = racer.horizontalPos + "px";    
        car.style.top = racer.verticalPos + "px";

    //generate random fuel positions.
    score.innerText = "SCORE:  " + racer.score;
    }
    

    window.requestAnimationFrame(move);
}



function start(){

    racer.ready = true; //set flag as true to continue movement
    racer.score = 0;    //reset racer's score
    
    startBoard.classList.add("hide");    //add classList "hide" to get rid of the start navigation pop-up
    gameScreen.classList.remove("hide");    //remove class list "hide" from gameScreen to make the game screen visible
    
    window.requestAnimationFrame(move)  //invoke another move() to start the game

    let car = document.createElement("div"); //create a div element in the dom
    car.setAttribute("class", "carVector"); //set class attribute of the div
    road.appendChild(car);    //append the div to the game screen

    racer.horizontalPos = car.offsetLeft+100;   //initialise the position of the player (x-axis)
    racer.verticalPos = car.offsetTop+557; //initialise the position of the player (y-axis) 
  

    let fuel = document.createElement("div");
    fuel.setAttribute("class", "fuelDiv");     
    road.appendChild(fuel);    //add fuelImg to the fuelDiv
    
    //set the default positions of the fuel , these will be update in updated in updatePos() at every frame
    fuelObj.horizontalPos = 1000;   
    fuelObj.verticalPos = 1000;

    //set up cone obstacles
    let cone = document.createElement("div");
    cone.setAttribute("class", "coneDiv");
    road.appendChild(cone);

    //set the default positions of the fuel , these will be update in updated in updatePos() at every frame
    coneObj.horizontalPos = 1000;
    coneObj.verticalPos = 1000;



}
