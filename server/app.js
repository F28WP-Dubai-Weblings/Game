//entry point file of the server

console.log("This is working");

const express = require('express');
const app = express();
const path = require('path');
// const server = require('http').createServer(app);
const io = require('socket.io')(server);

// app.use(express.static(''));
app.set('view-engine', 'ejs')
app.use(express.static(path.join(__dirname, '/static')))

app.get('/', function(req, res){
  res.render('index.ejs', {name: 'Kyle'})
});

app.use(express.urlencoded({ extended: false}))
const port = process.env.PORT || 3000;
const server = app.listen(port, function() {
    console.log(`listening on port : ${port}`);
});

app.get('/register', function (request, response) {
  res.render(register.ejs);
});
app.post('/register', function (request,response) {
  name = req.body.name,
  password= req.body.password

});
io.sockets.on('connection', function(socket) {
  socket.on('login', function(pseudoname) {
    socket.pseudoname = name;
      io.emit('participant' + socket.pseudoname + ' joined the chat...</i>');
  });

app.listen(3000)
server.listen(3000);})

// const express = require('express');
// const socket = require('socket.io');
// const mysql = require('mysql');
// const cookieParser = require('cookie-parser');
// const session = require('express-session');

// //App setup
// var app = express();
// var server = app.listen(82, function () {
//   console.log("listening to port 82.");
// });
// var io = socket(server);

// var sessionMiddleware = session({
//   secret: "keyboard cat"
// });

// io.use(function (socket, next) {
//   sessionMiddleware(socket.request, socket.request.res, next);
// });
// app.use(sessionMiddleware);
// app.use(cookieParser());

// const config = {
//   "host": "localhost",
//   "user": "root",
//   "password": "",
//   "base": "mysql_example"
// };

// var db = mysql.createConnection({
//   host: config.host,
//   user: config.user,
//   password: config.password,
//   database: config.base
// });

// db.connect(function (error) {
//   if (!!error)
//   throw error;

//   console.log('mysql connected to ' + config.host + ", user " + config.user + ", database " + config.base);
// });

// app.use(express.static('./'));

// io.on('connection', function (socket) {
//   var req = socket.request;
//   socket.on("login_register", function(data){
//     const user = data.user,
//     pass = data.pass;
//     db.query("SELECT * FROM users WHERE Username=?", [user], function(err, rows, fields){
//     if(rows.length == 0){
//     // console.log("nothing here");
//     db.query("INSERT INTO users(`Username`, `Password`) VALUES(?, ?)", [user, pass], function(err, result){
//       if(!!err)
//       throw err;
    
//       console.log(result);
//       socket.emit("logged_in", {user: user});
//     });
//     }else{
//       const dataUser = rows[0].Username,
//           dataPass = rows[0].Password;
//         if(dataPass == null || dataUser == null){
//           socket.emit("error");
//         }
//         if(user == dataUser && pass == dataPass){
//           socket.emit("logged_in", {user: user});
//           req.session.userID = rows[0].id;
//           req.session.save();
//         }else{
//           socket.emit("invalid");
//         }
//       }
//     });
//   });
// });

// socket.on("logged_in", function(name){
//   $("#n_log_in").hide();
//   $("#log_in").html("Welcome back " + name + ", nice to see you again!");
//   $("#log_in").show();
// });

// socket.on("invalid", function(){
//   alert("Username / Password Invalid, Please try again!");
// });

// socket.on("error", function(){
//   alert("Error: Please try again!");
// });
// db.query("INSERT INTO users(`Username`, `Password`) VALUES(?, ?)", [user, pass], function(err, result){
//   if(!!err)
//   throw err;

//   console.log(result);
//   socket.emit("logged_in", {user: user});
// });