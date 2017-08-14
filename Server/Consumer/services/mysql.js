const mysql = require('mysql')
const config = require('../config')
var connection = mysql.createConnection({
  host: config.mysql.host,
  user: config.mysql.user,
  password: config.mysql.password,
  database: config.mysql.database
});
var createUserTableSql = 
  'CREATE TABLE IF NOT EXISTS `users`( \
  `username` VARCHAR(100) NOT NULL, \
  `password` VARCHAR(40) NOT NULL, \
  `token` VARCHAR(300), \
  PRIMARY KEY ( `username` ) \
  )ENGINE=InnoDB DEFAULT CHARSET=utf8;'
var createDataTableSql = 
  'CREATE TABLE IF NOT EXISTS `datas`( \
  `username` VARCHAR(100) NOT NULL, \
  `one` INT UNSIGNED, \
  `two` INT UNSIGNED, \
  `three` INT UNSIGNED, \
  `four` INT UNSIGNED, \
  PRIMARY KEY ( `username` ) \
  )ENGINE=InnoDB DEFAULT CHARSET=utf8;'
connection.connect(function(err) {
    if (!err) {
        console.log('Database is connected ...');    
    } else {
        console.log('Error connecting database ...');
    }
});
connection.query(createDataTableSql,(err,result)=>{
  console.log(err)
})
connection.query(createUserTableSql,(err,result)=>{
  console.log(err)
})
module.exports=connection