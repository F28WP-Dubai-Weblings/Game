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
              const sqlDB = "CREATE DATABASE IF NOT EXISTS `mytable`;";
        connection.query(sqlDB, function(err, result) {
            if (err) throw err;
            console.log('The database has been created');
        });
        
        //create table players
        const sqlUser = "Create table if not exists `mytable`.`users`(" +
        "`id` int(11) NOT NULL auto_increment," +
        "`name` varchar(32) NOT NULL default 'Unknown'," +
        "`pass` varchar(32) NOT NULL," +
        "PRIMARY KEY (`id`)" +
        "); ";
        
        connection.query(sqlUser, function(err, result) {
          if (err) throw err;
          console.log("Users table created");
        });  
    
        
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
    
