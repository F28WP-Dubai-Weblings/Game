/*AUTHOR NAME: RIDA @raqp2000 */
function controls(player, socket) {
      
    window.addEventListener("keydown", downKey);    //listen for a key pressed
    function downKey(event){

        event.preventDefault(); //disregrard the inbuilt default representation of the key events
        player.keyEvents[event.key] = true; //set required keypress flag to true
        player.move();   //move the player

        //emit to the server that player has moved
        socket.emit("playerMoved", {id: player.id, horizontalPos: player.horizontalPos, verticalPos: player.verticalPos});  
    }

    window.addEventListener("keyup", upKey);
    function upKey(event){
        event.preventDefault();
        player.keyEvents[event.key] = false;
        player.move();
    }

    document.getElementById("button").addEventListener("click", attack);    //listen for when attack button is clicked
    function attack(){


        if (player.score >=200){ //player can only attack if player is score is equal to or greater than 100
            player.attack = true;

            //generate a random angle to determine the players horizontal/vertical velocity
            let angle= attacks[0].generatePos(player.horizontalPos, player.verticalPos);   

            //update player's attack properties
            player.bull_angle = angle; 
            
            //emit to the server that player has attacked
            socket.emit("playerAttack", ({id:player.id, bull_angle: player.bull_angle}));            
        }
        
    }

};
