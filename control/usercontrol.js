const loginCtrl = (request, response, next) => {
    const loginServices = require('../services/userService');

    let name = request.body.username;
    let pass = request.body.password;

    loginServices.loginService(name, pass, function(err, user) {
        console.log("User that logged in :");
        if (user === null) {
            console.log("Authentication problem!");
            response.json(null);
        } else {
            //here you have to add the user to the session
            response.json(user);
        }
        response.end();
        next();
    });
};

const registerCtrl = (request, response, next) => {
    const loginServices = require('../services/userServices');

    let username = request.body.username;
    let password = request.body.password;

    loginServices.registerService(username, password, function(err, user) {
        console.log("Inserting user in DB");
        if (user === null) {
            console.log("User insertion problem!");
            response.json(null);
        } else {
            response.json(user);
    //here you should addd the username to the session
        }
        response.end();
        next();
    });
};

const getUsers = (request, response) => {
    const loginServices = require('../services/userServices');
    loginServices.searchService(function(err, rows) {
        response.json(rows);
        response.end();
    });
};

const getUserByUsername = (request, response) => {
    const loginServices = require('../services/userServices');
    let id = request.params.username;
    loginServices.searchUsernameService(username, function(err, rows) {
        response.json(rows);
        response.end();
    });
});

const getUserByID = (request, response) => {
    const loginServices = require('../services/userServices');
    let id = request.params.id;
    loginServices.searchIDService(id, function(err, rows) {
        response.json(rows);
        response.end();
    });
};

module.exports = {
    loginCtrl,
    getUserByUsername,
    getUsers,
    getUserByID,
    registerCtrl
};
