function initDB(){
    var mysql = require('mysql');
    
    const connection = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "root",
        port: '3306',
        multipleStatements: true,
      });
    
      connection.connect(function(err) {
        if (err) throw err; 
        //create database
        console.log("Connected the database");
          
        const sqlDB = "CREATE DATABASE IF NOT EXISTS `database`;";
        connection.query(sqlDB, function(err, result) {
            if (err) throw err;
            console.log('The database has been created');
        });
        
        //create table players
        const sqlUser = "Create table if not exists `database`.`users`(" +
        "`id` int(11) NOT NULL auto_increment," +
        "`name` varchar(32) NOT NULL default 'Unknown'," +
        "`pass` varchar(32) NOT NULL," +
        "`score` int," +
        "PRIMARY KEY (`id`)" +
        "); ";
        
        connection.query(sqlUser, function(err, result) {
          if (err) throw err;
          console.log("Users table created");
        });  
        
         //create table Sessions
        const sqlSession = "Create table if not exists `database`.`sessions` (" +
        "`id` int(11) NOT NULL auto_increment," +
        "`startDate` DATETIME DEFAULT CURRENT_TIMESTAMP," +
        "PRIMARY KEY(`id`)" +
        ");";
  
        connection.query(sqlSession, function(err, result) {
        if (err) throw err;
        console.log("Sessions table created");
       }); 
        
    });
}
module.exports =initDB;
    
