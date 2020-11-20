//background music
/*function startGame() {
    
    
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




const canvas = document.getElementById("canvas"),
ctx = canvas.getContext("2d");

fillTrack(canvas);

function fillTrack(canvas){   //make the canvas cover the entire Track div
    canvas.style.width='100%';
    canvas.style.height='100%';
    canvas.width  = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
}

//const Fuel = require('./fuel.js');
//const Liveplayers = require('./liveplayers.js');



//                                                 MODULE AND EVENT LISTENERS FOR PLAYER MOVEMENT

function controls(player, socket) {
    console.log("here");
      
    window.addEventListener("keydown", downKey);

    function downKey(event){
        console.log("the player position is"+ player.horizontalPos + player.verticalPos);
        event.preventDefault(); //disregrard the inbuilt default representation of the key events
        player.keyEvents[event.key] = true;

        player.move();   //try without dir?
        console.log("the new player positionn is"+ player.horizontalPos + player.verticalPos);
        console.log("the player sent is" + player.id);
        socket.emit("playerMoved", {id: player.id, horizontalPos: player.horizontalPos, verticalPos: player.verticalPos});
    }

    window.addEventListener("keyup", upKey);
    function upKey(event){
        event.preventDefault();
        player.keyEvents[event.key] = false;
        player.move();
    }

};

let players = [];
let points = [];
let number = 0;

const socket = io(); //initialise a new socket each time a player arrives

socket.on("init", ({id,num, player_list, fuelPoints}) => {
    console.log("there is a player connected" + players.length);

    console.log("got the init message");
    const player = new Liveplayers({id, num}); //instantiate an object of the 'liveplayers' class

    controls(player, socket);
    number++;

    socket.emit('newPlayer', player);   //emit to the server that a new player has joined 
    socket.on('newPlayer', newPlayer => {
        console.log("pushing the player onto screen");
        players.push(new Liveplayers(newPlayer))});  //update the 'clients' list on the browser when a newPlayer message is recieved
    

    socket.on('playerMoved', ({id, horizontalPos, verticalPos}) => {
        console.log("the horizontal Pos recieved here in multiplayer.js "+ horizontalPos);
        players.find(elem => elem.id === id).horizontalPos = horizontalPos;
        players.find(elem => elem.id === id).verticalPos = verticalPos;

    });

    players = player_list.map(element => new Liveplayers(element)).concat(player);  //make a copy of the list of players sent by the server on the client browser
    points = fuelPoints.map(element => new Fuel(element));  //make a copy of the list of fuelPoints sent by the server on the client browser

    let counter = 0;
    let x,y;
    function store() {
        x = Math.random()*620;
        y = Math.random()*600;
    };

    function draw(){
        ctx.clearRect(0,0,canvas.width,canvas.height); //clear the canvas every frame
        players.forEach(client => client.draw(ctx));    //draw the updated position of the client on the canvas

       
        if (counter >100 && counter < 450){
            points.forEach(client => client.draw(ctx, {x: x, y: y})); 
            counter++;
            if (counter === 448) {
                counter = 0;
                store();
            }
        }
        counter++;
        window.requestAnimationFrame(draw); //try adding window.
    }
    draw();
});