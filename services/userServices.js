const { User } = require('../models/objects');
const playerdb = require('../db/playerdb');

const loginService = (username, password, callback) => {
    //check if the user is in the DB
    playerdb.findByUsername(username, function(err, rows) {
        if (rows.length == 0) {
            //the user is not in the DB
            console.log("no  user found with this name");
            callback(true, null);
        } else {
            console.log(`Selected user; ${rows[0].id}, ${rows[0].username}, ${rows[0].password}, ${rows[0].score} `);
            user = {id:rows[0].id, username:rows[0].username, password:rows[0].password, score:rows[0].score};
            
            callback(null, user);
        }
    });
};

const registerService = (username, password, callback) => {
    //insert in db
    playerdb.createUser(username, password, function(err, count, id) {
        if (count == 0) {
            //the user has not been inserted
            console.log("user has not been inserted");
            callback(true, null);
        } else {
            console.log(`User has been inserted id= ${id}`);
            user = {id:id, username:username, password:password, score:0};
            callback(null, user);
        }
    });
};


const searchService = function(callback) {
    playerdb.find(function(err, rows) {
        if (rows.length == 0) {
            console.log("No users!");
        } else {
            callback(null, rows);
        }
    });
};

const searchScore = function(callback) {
    playerdb.findScore(function(err, rows) {
        if (rows.length == 0) {
            console.log("No users!");
        } else {
            callback(null, rows);
        }
    });
};

const noOfRows = function(callback) {
    playerdb.findScore(function(err, rows) {
        if (rows.length == 0) {
            console.log("No users!");
        } else {
            callback(null, rows);
        }
    });
};

const searchIDService = function(id, callback) {
    playerdb.findById(id, function(err, rows) {
        if (rows.length == 0) { //unkown
            console.log("Unknown user!");
            let user = null;
            callback(null, user);
        } else {

            let user = new User(rows[0].id, rows[0].name, rows[0].pass);
            callback(null, user);
        }
    });
};

const deleteService = function(id, callback) {
    let count = playerdb.deleteUser(id, function(err, count) {
        if (count === 0) { //unkown
            console.log("No user deleted!");
            callback(null, false);
        } else {
            callback(null, true);
        }
    });
};

module.exports = {
    loginService,
    searchIDService,
    searchService,
    searchScore,
    deleteService,
    registerService,
    noOfRows
};
