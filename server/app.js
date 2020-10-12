//entry point file of the server

console.log("This is working");

const express = require('express');
const app = express();
const path = require('path');
const server = require('http').createServer(app);


//app.use(express.static(path.join(__dirname, '/static')))

app.get('/', function (req, res) {
  res.send("This is a test");
});
server.listen(3000);
