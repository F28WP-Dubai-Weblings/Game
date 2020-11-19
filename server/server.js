//entry point file of the server

const io = require('socket.io')();

io.on('connection', client => {
  client.emit('initialise', {data: "hello world"});
})

io.listen(3000);

console.log("This is working");

/*const express = require('express');
const app = express();
const path = require('path');
const server = require('http').createServer(app);
//app.use(express.static(path.join(__dirname, '/static')))
app.get('/', function (req, res) {
  res.send("This is a test");
});
server.listen(3000);*/
