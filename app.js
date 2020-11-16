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

let clients =[]; //create an object to store the socket of each client

let io = require ('socket.io')(server,{});

io.sockets.on('connection',socket => {
  console.log(socket.id)
  
  //socket.horizontalPos = 0; //assign client car's default position (x-axis)
  //socket.verticalPos = 0; //assign client car's default position (y-axis)
  //clientSockets[socket.id] = socket;

  socket.emit('init', {id:socket.id, player_list: clients});  //assign a unique id to each client and access to the list of live players
  socket.on('newPlayer', newPlayer => socket.broadcast.emit('newPlayer', newPlayer))
  
  socket.on('happy', function(data){
    console.log('yay!' + data.reason);
   
  });
});



