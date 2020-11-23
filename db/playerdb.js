//const { Player } = require('../models/entities');
var SQL = require('sql-template-strings');
const mysql = require('mysql');

var pool = mysql.createPool({
    connectionLimit: 100,
    host: "localhost",
    user: "root",
    password: "root",
    database: "mytable",
    debug: true
});

function executeQuery(query, callback) {
    pool.getConnection(function(err, connection) {
        if (err) {
            return callback(err, null);
        } else if (connection) {
            connection.query(query, function(err, rows, fields) {
                connection.release();
                if (err) {
                    return callback(err, null);
                }
                return callback(null, rows);
            });
        } else {
            return callback(true, "No Connection");
        }
    });
}


function getResult(query, callback) {
    executeQuery(query, function(err, rows) {
        if (!err) {
            callback(null, rows);
        } else {
            callback(true, err);
        }
    });
}

function find(callback) {
    const selectUsers = "SELECT * from mytable.users; ";
    getResult(selectUsers, function(err, rows) {
        if (!err) {
            callback(null, rows);
        } else {
            console.log(err);
        }
    });
}



function findByName(name, callback) {
    const selectUser = (SQL `SELECT * from mytable.users where name like ${name};`);
    getResult(selectUser, function(err, rows) {
        if (!err) {
            callback(null, rows);
        } else {
            console.log(err);
        }
    });
}

function findById(id, callback) {
    const selectUser = (SQL `SELECT * from groupchat.users where id = ${id};`);
    getResult(selectUser, function(err, rows) {
        if (!err) {
            callback(null, rows);
        } else {
            console.log(err);
        }
    });
}

function createUser(name, pass, callback) {
    const insertUser = (SQL `INSERT INTO mytable.users (name, pass) VALUES (${name}, ${pass}) ;`);
    getResult(insertUser, function(err, result) {
        if (!err) {
            callback(null, result.affectedRows, result.insertId);
        } else {
            console.log(err);
        }
    });
}


function deleteUser(name, callback) {
    const insertUser = (SQL `DELETE from groupchat.users where id = ${name};`);
    getResult(selectUser, function(err, result) {
        if (!err) {
            console.log("Number of users inserted: " + result.affectedRows);
            callback(null, result.affectedRows);
        } else {
            console.log(err);
        }
    });
}


module.exports = {
    find,
    findByName,
    findById,
    createUser,
    deleteUser
};
