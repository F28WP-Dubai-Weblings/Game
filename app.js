//entry point file of the server
console.log("hello world");

const express = require('express');
const app = express();
const server = require('http').createServer(app);

app.use(express.static(__dirname + '/client'));

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/client'); //set default request path
});



server.listen(5000);

console.log("server is on");

//app.listen(PORT, () => console.log('Server running on port ${PORT}'));
//app.use(express.static('client'));


//                                                                  FUELPOINTS CLASS
const Fuel = require('./client/js/fuel');


//                                                                  WEBSOCKET COMMUNICATION
let io = require ('socket.io')(server,{});
let clients =[];  //create an object to store the socket of each client
let fuelPoints = [];
let number = 0;

for (let i = 1; i<=3; i++) {
  fuelPoints.push(new Fuel({horizontalPos: Math.random() * 620, verticalPos:  Math.random() * 670}));
}

//all socket events go in here

io.sockets.on('connection',socket => {
  number++;
  socket.emit('init', {id:socket.id, num:number, player_list: clients, fuelPoints});  //assign a unique id to each client and access to the list of live players
  
  socket.on('newPlayer', newPlayer => {
    console.log("got the new player message");
    newPlayer.id = socket.id;
    clients.push(newPlayer);
    socket.broadcast.emit("newPlayer", newPlayer);
  });

  socket.on('playerMoved', ({id, horizontalPos, verticalPos}) => {
    socket.broadcast.emit('playerMoved', {id: socket.id, horizontalPos, verticalPos})});
});



