//entry point file of the server
console.log("hello world");

const express = require('express');
const app = express();
const server = require('http').createServer(app);


app.get('/', function (req, res) {
    res.sendFile(__dirname + '/client'); //set default request path
});

app.use(express.static(__dirname + '/client'));

server.listen(5000);

console.log("server is on");

//app.listen(PORT, () => console.log('Server running on port ${PORT}'));
//app.use(express.static('client'));


//                                                                  FUELPOINTS CLASS

class Fuel {
  constructor({x,y}) {
    this.horizontalPos = horizontalPos;
    this.verticalPos = this.verticalPos;
    this.width = 70;
    this.height = 40;
  }

  draw(ctx) {
    ctx.beginPath();
    const img = new Image();
        img.src = "https://f28wp-dubai-weblings.github.io/Game/client/media/raceGreen.png";
        ctx.drawImage(img, this.horizontalPos, this.verticalPos, img.width, 150);
  }
}








//                                                                  WEBSOCKET COMMUNICATION
let io = require ('socket.io')(server,{});
let clients =[];  //create an object to store the socket of each client

//all socket events go in here

io.sockets.on('connection',socket => {
  
  socket.emit('init', {id:socket.id, player_list: clients});  //assign a unique id to each client and access to the list of live players
  

  socket.on('newPlayer', newPlayer => {
    console.log("got the new player message");
    newPlayer.id = socket.id;
    clients.push(newPlayer);
    socket.broadcast.emit("newPlayer", newPlayer);
  });


  socket.on('playerMoved', ({id, horizontalPos, verticalPos}) => {

    console.log("the horizontal Pos recieved here in app.js "+ horizontalPos);
    socket.broadcast.emit('playerMoved', {id: socket.id, horizontalPos, verticalPos})});
});



