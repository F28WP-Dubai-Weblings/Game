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
    
    const find = require('../db/db');
    //database 
    find();

    const findByName = require('../db/db');
    //database 
    findByName(name);

    const findById = require('../db/db');
    //database 
    findById();

    const createUser = require('../db/db');
    //database 
    createUser(name, pass);

    const deleteUser = require('../db/db');
    //database 
    deleteUser();

    response.json(user);
    response.end();
};

module.exports = signin;
