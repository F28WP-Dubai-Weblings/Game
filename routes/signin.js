const signin = function (request, response) {
    console.log(request.body);
    console.log(request.body.username + "'" + request.body.password);
    //send response
    var name = request.body.username;
    var pass = request.body.password;


    var user = { username: name, password: pass };

    const initDB = require('../db/db');
    //database 
    initDB();

    response.json(user);
    response.end();
};

module.exports = signin;
