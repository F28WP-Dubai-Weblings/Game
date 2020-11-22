const loginCtrl = (request, response, next) => {
    const loginServices = require('../searchdb/searching');

    let name = request.body.auser.name;
    let pass = request.body.auser.pass;

    loginServices.loginService(name, pass, function(err, oldy, user) {
        console.log("User that logged in :" + JSON.stringify(user));
        if (user === null) {
            console.log("Auhtentication problem!");
            response.json(null);
        } else {
            console.log("Auhtentication went through!");
            if (oldy === true) {
                console.log(`Hello ${name}, welcome back!`);
            } else {
                console.log(`Hello ${name}, you have been registred!`);
                console.log(`Your id is ${user.id}!`);
            }
            response.json({ old: oldy, obj: user });
        }
        response.end();
        next();
    });
};

const getUsers = (request, response) => {
    const loginServices = require('../searchdb/searching');
    loginServices.searchService(function(err, rows) {
        response.json(rows);
        response.end();
    });
};

const getUserByID = (request, response) => {
    const loginServices = require('../searchdb/searching');
    let id = request.params.id;
    loginServices.searchIDService(id, function(err, rows) {
        response.json(rows);
        response.end();
    });
};

module.exports = {
    loginCtrl,
    getUsers,
    getUserByID
};
