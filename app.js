//entry point file of the server

console.log("This is working");

const express = require('express');
var session = require('express-session');
const app = express();
const path = require('path');
//const server = require('http').createServer(app);


app.use(express.urlencoded({ extended: false}))
const port = process.env.PORT || 3000;
const server = app.listen(port, function() {
    console.log(`listening on port : ${port}`);
});

//creqte q socket for the server
const io = require('socket.io')(server);

//send the static file

app.use(express.static('client'));
app.get('/', (req, res) => {
    res.sendFile('index.html', { root: __dirname });
});

// middleware
app.use(express.json());
app.use(express.urlencoded());

app.post('/register', function (request,response) {
const signin = require('./routes/signin');
  signin(request,response);
  console.log("finished signing in");
});


io.sockets.on('connection', function(socket) {
 
  socket.on('user_logged', function(object) {
    io.emit('participant' + object + ' Logged succesfully...</i>');
  });

  socket.on('login', function(user) {
    socket.pseudoname = user.name;
    socket.password = user.pass;
    //we send the event 'participant' and a message including the pseudoname
    io.emit('participant', '🔵 <i>' + socket.pseudoname + ' (' + socket.contact + ') joined the chat...</i>');
    io.emit('logged', user);
  });
  
});
