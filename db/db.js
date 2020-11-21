function initDB(){
    var mysql = require('mysql');
    
    const connection = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "root"
      });
    
      connection.connect(function(err) {
        if (err) throw err;
        //create database
        console.log("Connected the database");
        
    
        
    });
    // function createUser(name, pass, callback) {
    //     const insertUser = (SQL `INSERT INTO mytable.users (name, pass) VALUES (${name}, ${pass}) ;`);
    //     getResult(insertUser, function(err, result) {
    //         if (!err) {
    //             callback(null, result.affectedRows, result.insertId);
    //         } else {
    //             console.log(err);
    //         }
    //     });
    // };
      
}
module.exports =initDB;
    
