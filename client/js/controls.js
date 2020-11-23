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
        bulletx = player.horizontalPos;
        bullety=player.verticalPos;
        player.attack = true;
        attacks.forEach(attacc => {
            attacc.generatePos(bulletx,bullety);
        });
        socket.emit("playerAttack", {id: player.id});
    }

};
