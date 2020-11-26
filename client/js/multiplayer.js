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


//                                                          CLIENT SIDE EVENTS


const socket = io(); //initialise a new socket each time a player arrives

let players = [];   //client side list for players/clients
let points = [];    //client side list for points
let playerNumber = 0;   //initialise player num
let attacks = [] //client side list for bullets
let wait = 0;
socket.on("init", ({id,num, player_list, fuelPoints, bullets}) => {

    const player = new Liveplayers({id, num}); //instantiate an object of the 'liveplayers' class

    controls(player, socket);   //call controls in controls.js to keep track of player movement

    socket.emit('newPlayer', player);   //emit to the server that a new player has joined 
    socket.on('newPlayer', newPlayer => {
        players.push(new Liveplayers(newPlayer))});  //update the 'clients' list on the browser when a newPlayer message is recieved
    
    //if another player has moved, update the position of that player on the client side
    socket.on('playerMoved', ({id, horizontalPos, verticalPos}) => {
        players.find(elem => elem.id === id).horizontalPos = horizontalPos;
        players.find(elem => elem.id === id).verticalPos = verticalPos; 
    });

    //if another player(attacker) has attacked, update the angle of the bullet to the randomly generated angle given by the attacker to the server
    socket.on('playerAttack', ({id, bull_angle }) => {
        reqPlayer = players.find(elem => elem.id===id); //find the player that just attacked

        players.find(elem => elem.id===id).attack = true;   //set his attack flag to true

        attacks[0].setup({angle:bull_angle});   //call setup() on the bullet to set it's vertical and horizontal velocity to be the same as the attacker's
        //find the exact position of the attacker so the bullet that will be drawn on the client screen will be shot from the attackr's position
        attacks[0].horizontalPos = reqPlayer.horizontalPos; 
        attacks[0].verticalPos = reqPlayer.verticalPos;
    });


    
    players = player_list.map(element => new Liveplayers(element)).concat(player);  //make a copy of the list of players sent by the server on the client browser
    points = fuelPoints.map(element => new Fuel(element));  //make a copy of the list of fuelPoints sent by the server on the client browser
    attacks = bullets.map(shoot => new Bullet(shoot));  //make a copy of the array containing bullet sent by the server on the client browser
    
        
const ScoreBoard = document.getElementById("scoreBoard");

//                                                                 Collision Detection


function collision(player, object){

    /* NOTE TO READER: the -35s here are added to make sure the collision is significant, 
    i.e, the bullet or the fuelPoints have significantly collided with the player, not simply overlapped at their boundaries/borders*/
   if (player.horizontalPos < ((object.horizontalPos + object.width) -35) &&
    ((player.horizontalPos+ player.width)-35) > object.horizontalPos &&
    player.verticalPos < ( (object.verticalPos + object.height) -35) &&
    (player.verticalPos + player.height) > object.verticalPos - 35) {
        return true;
    }
    return false; //else return false - no collision.
}

    /*Note to Reader: the game screen is hidden once multiplayer.js is run AS SOON AS the canvas is created to prevent
    any sneaky bugs, in terms of players being drawn to the game canvas*/
    const gameScreen = document.getElementById("gameScreen");
    gameScreen.style.display = "none"; //hide the game screen

    const waitScreen = document.getElementById("waitScreen");
    waitScreen.style.display = "block"; //display the wait screen


    let counter = 0;  
    let index = 0;  //initialise index counter (this will be used to draw a new fuel point at a new position on the screen)

    function draw(){

        if (players.length === 3 ){
        setTimeout(function(){alert("Game Over! "+ "Your score was: " + player.score)},90000);    //game ends after 90 seconds

        waitScreen.style.display = "none";  //remove the wait screen
        gameScreen.style.display = "flex";  //now display the gameScreen
        
        ScoreBoard.innerHTML="SCORE:  " + player.score; 

        ctx.clearRect(0,0,canvas.width,canvas.height); //clear the canvas every frame        

        let attacker;
        //draw the player attacks on the canvas
        players.forEach(client => {
            client.draw(ctx)
            if (client.attack === true){
                attacker = client;
                attacks[0].draw(ctx);
            }
        });    
        
        let carCrash;
        //check if a player has crashed
        players.forEach(client=> {
            carCrash = collision(client,attacks[0]);
            if (carCrash && client != attacker){
                client.crash = true;
                client.draw(ctx); //player's car dissapears.
                if(client === player){
                    setTimeout(function(){alert("Game Over!" + "Your score was: " + player.score)},1000);    //player's game is over
                }
            } 
        })

        /*NOTE TO READER: I am not using a SetInterval function here as there are multiple functionalities and cases to be handled. 
        We want to avoid any time errors/bugs. 
        For example, it is important to have a counter as we want to make sure score is only increased once during a collision, when counter = 448.
        Using a setinterval along with the counter will increase code complexity unneccesarily*/

        if (counter >100 && counter < 500){
            counter++;
            let currentPoint = points[index];   //a new fuel point position for every point in the array
            currentPoint.draw(ctx); //draw the fuel

            //check if any player has collected the fuel
            let collided = false;
            players.forEach( player => {
                collided = collision(player,currentPoint);
                if (collided){
                    currentPoint.used = true; 
                    currentPoint.draw(ctx);
                    player.score++}
            })
                if (counter === 448) {
                    collided = false; //reset collision state
                    counter = 0;
                    index++;
                }
        }

    counter++; }
        window.requestAnimationFrame(draw); 
        }
    if (player.num > 4){
        setTimeout(function(){alert("Sorry this game is full!")},500);//game over alert after 90s
    }
    draw();

    
});
