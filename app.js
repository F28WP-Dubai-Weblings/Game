//entry point file of the server
console.log("This is working");

const express = require('express');
const app = express();
//const server = require('http').createServer(app);

//These will be used when I(Susan) will do database
var session = require('express-session');
const path = require('path');

//*Rida's static file*
// app.use(express.static(__dirname + '/client'));
// app.get('/', function (req, res) {
//     res.sendFile(__dirname + '/client'); //set default request path
// });

//*Susan's static file* <---
//send the static file
//make a route for homepage
app.use(express.static('client'));
app.get('/', (req, res) => {
    res.sendFile('index.html', { root: __dirname });
});

//*Rida's port connection*
//server.listen(5000);

//*Susan's port connection* <---
//set the port to be 3000
app.use(express.urlencoded({ extended: false}))
const port = process.env.PORT || 3000;
const server = app.listen(port, function() {
    console.log(`listening on port : ${port}`);
});


// middleware
app.use(express.json());
app.use(express.urlencoded());

console.log("server is on");

//app.listen(PORT, () => console.log('Server running on port ${PORT}'));
//app.use(express.static('client'));


//                                                                  FUELPOINTS CLASS
const Fuel = require('./client/js/fuel');


//                                                                  WEBSOCKET COMMUNICATION


const io = require('socket.io')(server);

let clients =[];  //create an object to store the socket of each client
let fuelPoints = [];  //array to store the fuelPoint : easier to push and delte on collision
let playerNumber = 0; // unique player number that will determine the car each player gets

for (let i = 1; i<=3; i++) {
  fuelPoints.push(new Fuel({horizontalPos: Math.random() * 620, verticalPos:  Math.random() * 670}));
}

//all socket events go in here

io.sockets.on('connection',socket => {
  playerNumber++;
  socket.emit('init', {id:socket.id, num:playerNumber, player_list: clients, fuelPoints});  //assign a unique id to each client and access to the list of live players
  
  socket.on('newPlayer', newPlayer => {
    console.log("got the new player message");
    newPlayer.id = socket.id;
    clients.push(newPlayer);
    socket.broadcast.emit("newPlayer", newPlayer);
  });

  socket.on('playerMoved', ({id, horizontalPos, verticalPos}) => {
    socket.broadcast.emit('playerMoved', {id: socket.id, horizontalPos, verticalPos})});
});

//--------------------------------------------------------------------------------------------------------------------------------------------------------------
//                                                                DATABASE (MORE TO BE ADDED)

//FOR NOW THESE WILL BE COMMENTED OUT
//app.post('/register', function (request,response) {
//const signin = require('./routes/signin');
//  signin(request,response);
//  console.log("finished signing in");
//});
  
