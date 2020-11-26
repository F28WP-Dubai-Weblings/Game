//entry point file of the server
console.log("In app.js");

//Rida's Server Connection
const express = require('express');
const app = express();
var session = require('express-session');
//didnt put favicon

//define a session
/*app.use(session({
  secret: 'your secrete word goes here',
  cookie: { maxAge: 60000 },
  resave: false,
  saveUninitialized: false
}));*/
//*Rida's static file* 
//  app.use(express.static(__dirname + '/client')); //app.use(express.static('client'));
//  app.get('/', function (req, res) {
//      res.sendFile(__dirname + '/client/index.html'); //set default request path
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


//*Susan's port connection* <---
//set the port to be 3000
app.use(express.urlencoded({ extended: false}))
const port = process.env.PORT || 3000;

/*since both our app.listen function impementations were technically the same, 
i'm going to be deleting mine and combining both our inputs: */
const server = app.listen(port, () => {
   console.log(`server listening on port : ${port}`);
});


// middleware
app.use(express.json());
app.use(express.urlencoded());




//                                                                  FUELPOINTS CLASS
const Fuel = require('./client/js/fuel'); //require the class for fuel points
const Bullet = require('./client/js/bullet.js');  //require the class for bullets


//                                                                  WEBSOCKET COMMUNICATION


const io = require('socket.io')(server);  //rquire socket.io

let clients =[];  //create an object to store the socket of each client
let fuelPoints = [];  //array to store the fuelPoint : easier to push and delte on collision
let playerNumber = 0; // unique player number that will determine the car each player gets
let bullets = [];  //create an object to store the socket of each client


for (let i = 0; i<=30; i++) {
  fuelPoints.push(new Fuel({horizontalPos: Math.random() * 620, verticalPos:  Math.random() * 670}));
}

/*we will only be needing one bullet, the server will be sending this to all clients however, 
the game code is implemented in such a way that one bullet element will be sufficient for all clients*/
bullets.push(new Bullet({horizontalPos: Math.random() * 620, verticalPos:  Math.random() * 670})); //initialise with a random x,y position

 
//all socket events go in here

io.sockets.on('connection',socket => {
  playerNumber++; //give each new client a new number. i.e., first client will be player1, second will be player 2 and so on...
  
  //assign a unique id for each client and give all other clients access to the list of live players, player number, player list, fuelpoints and bullet
  socket.emit('init', {id:socket.id, num:playerNumber, player_list: clients, fuelPoints,bullets});  
  
//when a new player has joined, broadcast it to all other clients
socket.on('newPlayer', newPlayer => {
  newPlayer.id = socket.id;
  clients.push(newPlayer);  //add new player to the server side client list
  socket.broadcast.emit("newPlayer", newPlayer);
});


//if the player has moved, broadcast to other clients the player id and the position the player has moved to
socket.on('playerMoved', ({id, horizontalPos, verticalPos}) => {
  socket.broadcast.emit('playerMoved', {id: socket.id, horizontalPos, verticalPos});
});


/*if the player has attacked, listen to the emit message sent by the client in (controls.js) and broadcast to other clients
the angle along with the player id*/
socket.on('playerAttack',({id, bull_angle}) =>{
  socket.broadcast.emit('playerAttack', ({id:socket.id, bull_angle}));
});


});
/*

//                                                                           DATABASE 
const router = require('./routes/routes');
// defining routes
  app.use(router);

//create database if not exists
const initDB = require('./db/db');
initDB();
  */

