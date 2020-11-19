var mysql = require('mysql');
var express = require('express');
var session = require('express-session');
var bodyParser = require('body-parser');
var path = require('path');
var app = express();
// socket = io.connect('http://localhost:3000');

var connection = mysql.createConnection({
	host     : 'localhost',
	user     : 'root',
	password : '',
	database : 'nodelogin'
});

connection.connect(function(error){
    if(!!error){
        console.log('Error');
    }
    else{
        console.log('Connected');
    }
});

app.use(session({
	secret: 'secret',
	resave: true,
	saveUninitialized: true
}));
app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());

app.get('/', function(request, response) {
    // response.sendFile(path.join(__dirname + '/login.html'));
    response.render('index.ejs')
});

app.listen(3000);
