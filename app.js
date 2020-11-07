//entry point file of the server



const express = require('express');
const PORT = 3000 || process.env.PORT
const app = express();
app.listen(PORT, () => console.log('Server running on port ${PORT}'));
app.use(express.static('client'));


/*const path = require('path');
const server = require('http').createServer(app);


//app.use(express.static(path.join(__dirname, '/static')))

app.get('/', function (req, res) {
  res.send("This is a test");
});

server.listen(3000);*/
