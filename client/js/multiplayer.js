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






const socket = io(); //initialise a new socket each time a player arrives

let players = [];   
let points = [];    //client side list for points
let playerNumber = 0;
let attacks = [] //client side list for bullets
let bulletx, bullety;

socket.on("init", ({id,num, player_list, fuelPoints, bullets}) => {

    console.log("got the init message");
    const player = new Liveplayers({id, num}); //instantiate an object of the 'liveplayers' class

    controls(player, socket);
    //playerNumber++;

    socket.emit('newPlayer', player);   //emit to the server that a new player has joined 
    socket.on('newPlayer', newPlayer => {
        //console.log("pushing the player onto screen");
        players.push(new Liveplayers(newPlayer))});  //update the 'clients' list on the browser when a newPlayer message is recieved
    

    socket.on('playerMoved', ({id, horizontalPos, verticalPos}) => {
        players.find(elem => elem.id === id).horizontalPos = horizontalPos;
        players.find(elem => elem.id === id).verticalPos = verticalPos; 
    });

    socket.on('playerAttack', ({id}) => {
        console.log("client knows player has attacced");
        //console.log("player list is: " + players);
        //console.log("bullet list is: " + attacks); //check if the bug is bc bullet is undefined?
    });

    
    players = player_list.map(element => new Liveplayers(element)).concat(player);  //make a copy of the list of players sent by the server on the client browser

    points = fuelPoints.map(element => new Fuel(element));  //make a copy of the list of fuelPoints sent by the server on the client browser

    console.log('here');
        
    //attacks = bullets.map(element => new Bullet(element));

    //                                                                 Collision Detection


function collision(player, object){

   if (player.horizontalPos < ((object.horizontalPos + object.width) -30) &&
    ((player.horizontalPos+ player.width)-30) > object.horizontalPos &&
    player.verticalPos < ( (object.verticalPos + object.height) -30) &&
    (player.verticalPos + player.height) > object.verticalPos - 30) {
    return true;
 
    }

}

    let counter = 0;
    let x,y;  

    function draw(){
        ctx.clearRect(0,0,canvas.width,canvas.height); //clear the canvas every frame
        
        points.forEach(v=>{
            console.log(v.horizontalPos);
            console.log(v.verticalPos);
            v.draw(ctx)
        });
        
        players.forEach(client => {
            client.draw(ctx)
            if (client.attack === true){
                attacks.forEach(attacc => {
                    attacc.draw(ctx);
                });
            }
        });    //draw the updated position of the client on the canvas
        
        
        /*if (counter >100 && counter < 500){
            counter++;
            points.forEach(client => {client.draw(ctx);players.forEach( player => 
                    {
                        let collided = collision(player,client);
                        if (collided){
                            console.log("collided!");
                            player.score +=10;
                        }
                    
                    })}); 
                if (counter === 448) {
                    counter = 0;
                }
           
            
        }*/
        //counter++;
        window.requestAnimationFrame(draw); 
    }
    draw();
});
