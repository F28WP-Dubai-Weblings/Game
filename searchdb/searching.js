const { User } = require('../Variables/attributes');
const userDB = require('../db/playerdb');

var name =$("#userName").val();
var pass =$("#Password").val();
// var user = {username:name, password:pass };

const loginService = (name, pass, callback) => {
    //check if the user is in the DB
    userDB.findByName(name, function(err, rows) {
        if (rows.length == 0) {
            //the user is not in the DB
            console.log("new user, try insert");
            //insert user in the DB
            userDB.createUser(name, email, function(err, affectedRows, insertId) {
                console.log(`Insertion  from DB : ${affectedRows}, ${insertId}`);
                if (affectedRows != 0) {
                    console.log(`new user ${insertId}, ${name}, ${pass}`);
                    user = new User(insertId, name, pass);
                    callback(null, false, user);
                }
            });
        } else {
            console.log(`Old user ${rows[0].id}, ${rows[0].name}, ${rows[0].pass}`);
            user = new User(rows[0].id, rows[0].name, rows[0].pass);
            callback(null, true, user);
        }
    });
};


const searchService = function(callback) {
    userDB.find(function(err, rows) {
        if (rows.length == 0) {
            console.log("No users!");
        } else {
            callback(null, rows);
        }
    });
};

const searchIDService = function(id, callback) {
    userDB.findById(id, function(err, rows) {
        if (rows.length == 0) { //unkown
            console.log("Unkown user!");
            let user = null;
            calback(null, user);
        } else {

            let user = new User(rows[0].id, rows[0].name, rows[0].pass);
            callback(null, user);
        }
    });
};

const deleteService = function(id, callback) {
    let count = userDB.deleteUser(id, function(err, count) {
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
    deleteService
};
