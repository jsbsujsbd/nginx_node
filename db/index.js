 const mysql = require('mysql2');
 const pool = mysql.createPool({  
        host: '192.168.88.130',
        user: 'root',   
        password: '123456', 
        database: 'nginx_test',
        port: 3306,
 });      
 module.exports=pool