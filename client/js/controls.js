
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

        let vx,vy = attacks[1].generatePos(player.horizontalPos, player.verticalPos);

        //update player's attack properties
        player.bull_vx = vx;
        player.bull_vy = vy;

        console.log("attacks1 in controls is " + attacks[1]);
        
        console.log("bullet vx in controls:" + player.bull_vx);
        console.log("bullet vy in controls:" + player.bull_vy);

        socket.emit("playerAttack", ({id:player.id, bull_vx: player.bull_vx, bull_vy: player.bull_vy}));
    }

};
