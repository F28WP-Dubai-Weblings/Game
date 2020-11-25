//entry point file of the server
console.log("This is working");

const express = require('express');
const app = express();
var session = require('express-session');
const path = require('path');

//These will be used when doing database
var session = require('express-session');
const path = require('path');

//*Rida's static file*
//  app.use(express.static(__dirname + '/client'));
//  app.get('/', function (req, res) {
//      res.sendFile(__dirname + '/client'); //set default request path
//  });

//*Susan's static file* <---
//send the static file
//make a route for homepage
app.use(express.static('client'));
app.get('/', (req, res) => {
   res.sendFile('index.html', { root: __dirname });
});

//*Rida's port connection*
//server.listen(5000);


//set the port to be 3000
app.use(express.urlencoded({ extended: false}))
const port = process.env.PORT || 5000;
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
const Bullet = require('./client/js/bullet.js');


//                                                                  WEBSOCKET COMMUNICATION


const io = require('socket.io')(server);

let clients =[];  //create an object to store the socket of each client
let fuelPoints = [];  //array to store the fuelPoint : easier to push and delte on collision
let playerNumber = 0; // unique player number that will determine the car each player gets
let bullets = [];
let x,y;

for (let i = 0; i<=30; i++) {
  fuelPoints.push(new Fuel({horizontalPos: Math.random() * 620, verticalPos:  Math.random() * 670}));
  bullets.push(new Bullet({horizontalPos: Math.random() * 620, verticalPos:  Math.random() * 670}))
}

/*function store() {  //will update horizontalPosand y to a different value everytime it is called
        x = Math.random()*620;
        y = Math.random()*600;
  };*/
 
//all socket events go in here

io.sockets.on('connection',socket => {
  playerNumber++;
  socket.emit('init', {id:socket.id, num:playerNumber, player_list: clients, fuelPoints,bullets});  //assign a unique id to each client and access to the list of live players
  
  socket.on('newPlayer', newPlayer => {
    console.log("got the new player message");
    newPlayer.id = socket.id;
    clients.push(newPlayer);
    socket.broadcast.emit("newPlayer", newPlayer);
  });

  socket.on('playerMoved', ({id, horizontalPos, verticalPos}) => {
    socket.broadcast.emit('playerMoved', {id: socket.id, horizontalPos, verticalPos});
  });

  socket.on('playerAttack',({id, bull_angle}) =>{
    console.log("in server side attack");
    console.log("bullet angle in server:" + bull_angle);

    socket.broadcast.emit('playerAttack', ({id:socket.id, bull_angle}));
  });

});


//                                                                           DATABASE 
const router = require('./routes/routes');
// defining routes
  app.use(router);

//create database if not exists
const initDB = require('./db/db');
initDB();
  
