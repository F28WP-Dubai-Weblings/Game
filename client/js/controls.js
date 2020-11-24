
function controls(player, socket) {
    console.log("here");
      
    window.addEventListener("keydown", downKey);

    function downKey(event){

        event.preventDefault(); //disregrard the inbuilt default representation of the key events
        player.keyEvents[event.key] = true;

        player.move();   
        socket.emit("playerMoved", {id: player.id, horizontalPos: player.horizontalPos, verticalPos: player.verticalPos});
    }

    window.addEventListener("keyup", upKey);
    function upKey(event){
        event.preventDefault();
        player.keyEvents[event.key] = false;
        player.move();
    }

    document.getElementById("button").addEventListener("click", attack);
    
    function attack(){
        console.log("attack is called");

        player.attack = true;
        //player.score = 0; //reset player's running score

        let angle= attacks[1].generatePos(player.horizontalPos, player.verticalPos);
        console.log("angle in control is " + angle);
        //update player's attack properties
        
        player.bull_angle = angle; 
        
        socket.emit("playerAttack", ({id:player.id, bull_angle: player.bull_angle}));
    }

};
