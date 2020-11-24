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

//const Bullet = require("./bullet");





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
let index = 0;

socket.on("init", ({id,num, player_list, fuelPoints, bullets}) => {

    console.log("got the init message");
    const player = new Liveplayers({id, num}); //instantiate an object of the 'liveplayers' class

    controls(player, socket);
    //playerNumber++;

    socket.emit('newPlayer', player);   //emit to the server that a new player has joined 
    socket.on('newPlayer', newPlayer => {
        console.log("pushing the player onto screen");
        players.push(new Liveplayers(newPlayer))});  //update the 'clients' list on the browser when a newPlayer message is recieved
    

    socket.on('playerMoved', ({id, horizontalPos, verticalPos}) => {
        players.find(elem => elem.id === id).horizontalPos = horizontalPos;
        players.find(elem => elem.id === id).verticalPos = verticalPos; 
    });

    socket.on('playerAttack', ({id, bull_angle }) => {
        console.log("in mult attack");
        reqPlayer = players.find(elem => elem.id===id); //find the player that just attacked

        players.find(elem => elem.id===id).attack = true;   //set his attack flag to true

        attacks[1].setup({angle:bull_angle});
        attacks[1].horizontalPos = reqPlayer.horizontalPos;
        attacks[1].verticalPos = reqPlayer.verticalPos;

        console.log("bullet angle in mult is" +bull_angle);        
    });

    
    players = player_list.map(element => new Liveplayers(element)).concat(player);  //make a copy of the list of players sent by the server on the client browser
    points = fuelPoints.map(element => new Fuel(element));  //make a copy of the list of fuelPoints sent by the server on the client browser
    attacks = bullets.map(shoot => new Bullet(shoot));

        
    //                                                                 Collision Detection


function collision(player, object){

   if (player.horizontalPos < ((object.horizontalPos + object.width) -30) &&
    ((player.horizontalPos+ player.width)-30) > object.horizontalPos &&
    player.verticalPos < ( (object.verticalPos + object.height) -30) &&
    (player.verticalPos + player.height) > object.verticalPos - 30) {
    return true;
    }
    return false; //else return false - no collision.
}

    const gameScreen = document.getElementById("gameScreen");
    gameScreen.style.display = "none";

    const waitScreen = document.getElementById("waitScreen");
    waitScreen.style.display = "block";

    let flag =false;
    let counter = 0;
    let x,y;  

    function draw(){
        if (players.length === 3 ){
        setTimeout(function(){alert("Game Over")},90000);

        waitScreen.style.display = "none";
        gameScreen.style.display = "flex"; 
        
        ctx.clearRect(0,0,canvas.width,canvas.height); //clear the canvas every frame        

        let attacker;
        //draw the player attacks on the canvas
        players.forEach(client => {
            client.draw(ctx)
            if (client.attack === true){
                attacker = client;
                attacks[1].draw(ctx);
                console.log("client is attacker" + (client===attacker) +" " +client.num);
                client.score -= 30 // reduce client's running score after theyve attacked.
                setTimeout(()=> {client.attack=false;},7000);   //reset the client's attack state after 5 seconds.
                }
                
        });    
        
        let carCrash;
        //check if a player has crashed
        players.forEach(client=> {
            carCrash = collision(client,attacks[1]);
            if (carCrash && client != attacker){
                client.crash =true;
                client.draw(ctx); //player's car dissapears.
                if(client === player){
                    setTimeout(function(){alert("Game Over")},1000);    //player's game is over
                }
            } 

        })

        if (counter >100 && counter < 500){
            counter++;
            let currentPoint = points[index];
            currentPoint.draw(ctx); //draw the fuel

            //check if any player has collected the fuel
            players.forEach( player => {
                let collided = collision(player,currentPoint);
                if (collided){
                    player.score +=10;  //increase the running score of the player
                    player.finalScore +=10; //increase the total score of the player
                    currentPoint.used = true; 
                    currentPoint.draw(ctx);}
            })
                if (counter === 448) {
                    counter = 0;
                    index++;
                }
        }
        counter++; }
       
        window.requestAnimationFrame(draw); 
    }
    draw();

    /*const waitScreen = document.getElementById("waitScreen");
    const gameScreen = document.getElementById("gameScreen");
    gameScreen.style.display = "none";


    function check(){
        if (players.length === 3 && !flag){
            console.log("in check");
            flag = true;
            //waitScreen.style.display = "none";
            
            console.log(flag);
        }
        else{
            console.log("players.length is"+players.length);}
          
    }

    

    if (players.length < 4){
        console.log("in call to check");
        check();
    }

    setInterval(check(),10000);

    console.log("this player is" + player.num);
    //tempAlert("close", 5000);
    if (player.num >3){
        setTimeout(function(){alert("Sorry this game is full!")},);//game over alert after 90s
    }

    function start(){
        if (players.length <= 3 && flag){
            console.log("in less than");
            //setTimeout(function(){alert("Game Over")},90000);//game over alert after 90s
        }
    }*/

    
});
