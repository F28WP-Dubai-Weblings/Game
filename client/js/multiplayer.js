// js code here

/*var raceGame;
var spwanpoint=0;
var type=0;
var raceObstacles = [];
var raceScore;


function startGame() {
    raceGame = new component(40, 70, "c1.png",200,400, "image");
    raceGame.gravity = 0.00;
    raceScore = new component("30px", "Impact", "white", 150, 40, "text");
    raceGameArea.start();
}

var raceGameArea = {
    canvas : document.getElementById("Game") ,
        start : function() {
        this.canvas.width = 420;
        this.canvas.height = 500;
		this.canvas.id="demo";
        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
        this.frameNo = 0;
        this.interval = setInterval(updateGameArea, 20);
		 window.addEventListener('keydown', function (e) {
            raceGameArea.key = e.keyCode;
        })
        window.addEventListener('keyup', function (e) {
            raceGameArea.key = false;
        })

console.log("the client script is working") ;

function downarrow() {
    accelerate(-0.2);
  }
  
  function uparrow() {
    accelerate(0.05);
  }
          },
      clear : function() {
          this.context.clearRect(0, 0, this.canvas.Width, this.canvas.Height);
      },
      stop : function() {
          clearInterval(this.interval);
      }


}

//background music
function startGame() {
    
    
    myMusic = new sound("car bg music 1.mp3");
    myMusic.play();
    myGameArea.start();
}
function updateGameArea() //this function : stops the music when the car hits an obstacle.
{
    var x, height, gap, minHeight, maxHeight, minGap, maxGap;
    for (i = 0; i < myObstacles.length; i += 1) {
        if (myGamePiece.crashWith(myObstacles[i])) {
            
            myMusic.stop();
            myGameArea.stop();
            return;
        } 
    }

}*/


/*let car = document.createElement("div"); //create a div element in the dom
    car.setAttribute("class", "carVector"); //set class attribute of the div
    track.appendChild(car);   //add the car to the track*/ 

//import Liveplayers from './liveplayers.js'

class Liveplayers{
    constructor({id}){
        this.id = id;
        this.horizontalPos = 10;
        this.verticalPos = 10;
        this.score = 0;
        this.movement = {
            ArrowUp = false,
            ArrowDown = false,
            ArrowRight = false,
            ArrowLeft = false
        };
        this.acceleration = 10;
        //this.speed = 10;
    }
    
    draw(ctx){
        ctx.beginPath();
        ctx.fillStyle = "red";
        ctx.fillRect(this.horizontalPos, this.verticalPos, 50, 50);
    }
}

const canvas = document.getElementById("canvas"),
ctx = canvas.getContext("2d");

fillTrack(canvas);

function fillTrack(canvas){   //make the canvas cover the entire Track div
    canvas.style.width='100%';
    canvas.style.height='100%';
    canvas.width  = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
}

let clients = [];
const socket = io(); //initialise a new socket each time a player arrives

socket.emit('happy', {
    reason:'data recieved!'
});

socket.on("init", ({id,player_list}) => {
    console.log("got the init message");

    const player = new Liveplayers({id}); //instantiate an object of the 'liveplayers' class
    
    socket.emit('newPlayer', player);   //to broadcast to other players that there is a new player
    socket.on('newPlayer', newPlayer => clients.push(new Liveplayer(newPlayer)));   //update the 'clients' list on their browser when a newPlayer message is recieved
 
    clients = player_list.map( elem => new Liveplayers(elem)).concat(player);
    //clients.forEach(client => clients.push(new Liveplayers(client)))

    function updateGameState(){
        ctx.clearRect(0,0,canvas.width,canvas.height); //clear the canvas every frame
        clients.forEach(client => client.draw(ctx))    //draw the updated position of the client on the canvas
        requestAnimationFrame(updateGameState); //try adding window.
    }
    updateGameState();
});
