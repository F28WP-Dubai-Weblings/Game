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

let io = require ('socket.io')(server,{});
io.sockets.on('connection',function(socket){
  console.log('socket connected');

  socket.on('happy', function(data){
    console.log('yay!' + data.reason);
  });
});

