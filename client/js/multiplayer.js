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



//                                                 MODULE AND EVENT LISTENERS FOR PLAYER MOVEMENT

function controls(player, socket) {
    console.log("here");
      
    window.addEventListener("keydown", downKey);

    function downKey(event){

        event.preventDefault(); //disregrard the inbuilt default representation of the key events
        player.keyEvents[event.key] = true;

        players.move();   //try without dir?
        socket.emit("playerMoved", {id: player.id, horizontalPos: player.horizontalPos, verticalPos: player.verticalPos});
    }

    window.addEventListener("keyup", upKey);
    function upKey(event){
        event.preventDefault();
        player.keyEvents[event.key] = false;
        players.move();
    }

};

let players = [];
let points = [];
let playerNumber = 0;
//Live Players 





const socket = io(); //initialise a new socket each time a player arrives

socket.on("init", ({id,num, player_list, fuelPoints}) => {
    console.log("there is a player connected" + players.length);

    console.log("got the init message");
    const player = new Liveplayers({id, num}); //instantiate an object of the 'liveplayers' class

    controls(player, socket);
    //playerNumber++;

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

    //                                                                 Collision Detection
function collision(player, object){

//CASE 1 -- OPTIONAL
    if (player.horizontalPos>= object.horizontalPos&&    //if the player's horizontal Pos is greater than or equal to the same of the object
        player.horizontalPos<= object.horizontalPos+ object.width &&    //if the player's horizontal Pos is lesser than or equal to the same of the object and
        player.verticalPos >= object.verticalPos &&   //if the car has an equal or greater verticalposition as the object (if the car is above the object vertically)
        player.verticalPos <= object.verticalPos + object.height){
            console.log(1);
            return true;
        }

//CASE 2
    if (player.horizontalPos+ player.width >= object.horizontalPos&&
        player.horizontalPos+ player.width <= object.horizontalPos+ object.width &&
        player.verticalPos >= object.verticalPos &&
        player.verticalPos <= object.verticalPos + object.height) {
            console.log(2);

            return true;
        }

//CASE 3
        console.log("player height is: " + player.height);
        console.log("player width is :" + player.width);
        console.log("object hegith is: "+ object.height);
        console.log("object width is: " + object.width);
    if (player.horizontalPos>= object.horizontalPos&&
        player.horizontalPos<= object.horizontalPos+ object.width &&
        player.verticalPos + player.height >= object.verticalPos &&
        player.verticalPos + player.height <= object.verticalPos + object.height){
            console.log(3);

            return true;
        }

//CASE 4
    if (player.horizontalPos+ player.width >= object.horizontalPos&&
        player.horizontalPos+ player.width <= object.horizontalPos+ object.width &&
        player.verticalPos + player.height >= object.verticalPos &&
        player.verticalPos + player.height <= object.verticalPos + object.height){
            console.log(4);

            return true;
        }

//CASE 5
    if (object.horizontalPos>= player.horizontalPos&&
        object.horizontalPos<= player.horizontalPos+ player.width &&
        object.verticalPos >= player.verticalPos &&
        object.verticalPos <= player.verticalPos + player.height) {
            console.log(5);

            return true;
        }

//CASE 6
    if (object.horizontalPos+ object.width >= player.horizontalPos&&
        object.horizontalPos+ object.width <= player.horizontalPos+ player.width &&
        object.verticalPos >= player.verticalPos &&
        object.verticalPos <= player.verticalPos + player.height) {
            console.log(6);

            return true;
        }

//CASE 7
    if (object.horizontalPos>= player.horizontalPos&&
        object.horizontalPos<= player.horizontalPos+ player.width &&
        object.verticalPos + object.height >= player.verticalPos &&
        object.verticalPos + object.height <= player.verticalPos + player.height){
            console.log(7);

            return true;
        }
//CASE 8 -- unecessary
    if (object.horizontalPos+ object.width >= player.horizontalPos&&
        object.horizontalPos+ object.width <= player.horizontalPos+ player.width &&
        object.verticalPos + object.height >= player.verticalPos &&
        object.verticalPos + object.height <= player.verticalPos + player.height){
            console.log(8);

            return true;
        }

}

    let counter = 0;
    let x,y;

    function store() {  //will update horizontalPosand y to a different value everytime it is called
        x = 100;//Math.random()*620;
        y = 100;//Math.random()*600;
    };

    function draw(){
        ctx.clearRect(0,0,canvas.width,canvas.height); //clear the canvas every frame
        players.forEach(client => client.draw(ctx));    //draw the updated position of the client on the canvas
 
       
        if (counter >100 && counter < 1000){
            points.x = x; 
            points.y = y;
            points.forEach(client => {client.updatePos(x,y);players.forEach( player => 
                {
                    let collided = collision(player,client);
                    if (collided){
                        console.log("collided!");
                        player.score +=10;
                        console.log("player"+player.num+" "+ player.score);
                    }
                })}); 
            counter++;
            if (counter === 698) {
                counter = 0;
                store();
            }
        }
        counter++;
        window.requestAnimationFrame(draw); 
    }
    draw();
});
