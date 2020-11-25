
const score = document.querySelector("#scoreBoard");
const startBoard = document.querySelector(".startNav");
const gameScreen = document.querySelector(".practiceScreen");
let road = document.querySelector(".animateTrack")

document.addEventListener("keydown", downKey);
document.addEventListener("keyup", upKey);
startBoard.addEventListener("click", start);

let counter = 0;


console.log("in practice")
let racer = {
    pixelPosition:4
};

let fuelObj = {
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

   return( !((playerRect.bottom < objectRect.top) || (playerRect.top > objectRect.bottom)|| (playerRect.right<objectRect.left) || (playerRect.left > objectRect.right)))
    console.log("in dissapear");
   /*
    //let fuel = document.querySelector(".fuelDiv");
    let collide = false;
    let time;
    console.log("in collide");
        collide = collision(racer,fuel);
        if (collide){        
            fuel.style.backgroundImage = none;
        }
        fuel.style.backgroundImage = url("https://f28wp-dubai-weblings.github.io/Game/client/media/icons/fuel.png");
        collide = false;*/
            
}

function move(){

    let car = document.querySelector(".carVector");
    let fuel = document.querySelector(".fuelDiv");


    if(racer.ready){
        
        let collide = collision(car,fuel);

        () => {
            if (collide){
                console.log("in rmove")
                fuel.style.backgroundImage = none;
            }
            else{
            fuel.style.backgroundImage = url("https://f28wp-dubai-weblings.github.io/Game/client/media/icons/fuel.png");
            }
            setTimeout(function(){collide = false}, 2000);
        }
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

    //generate random fuel positions.
    counter++; 
    if (counter >100 && counter < 500){
        counter++;
    }   
    if (counter > 399){
        fuelObj.horizontalPos = (Math.random() * 670);
        fuelObj.verticalPos = (Math.random() * 620);
        counter = 0;
    } 
    fuel.style.left = fuelObj.horizontalPos + "px";
    fuel.style.top = fuelObj.verticalPos + "px";
    
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
  

    let fuel = document.createElement("div");
    fuel.setAttribute("class", "fuelDiv");     
    road.appendChild(fuel);    //add fuelImg to the fuelDiv
    
    fuelObj.horizontalPos = (Math.random() * 670);
    fuelObj.horizontalPos = (Math.random() * 620);
    
    /*let currentTop = 0; //initialise currentTop to 0
    
    
    let initialHeight = road.offsetHeight;  //initialise height on the road
    let initialWidth = road.offsetWidth;    //initialise width of the road
    
    
    let runner = 0;
    let collide = false;
    let time;
    window.setInterval(function() {
        currentTop = (Math.random() * 670);
        currentLeft =  (Math.random() * 620);
        fuelPoint.style.top = currentTop + "px";    
        fuelPoint.style.left = currentLeft + "px";
        runner = runner +1;
    },5000);     
*/
}
