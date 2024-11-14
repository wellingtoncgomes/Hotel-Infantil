const mysql = require('mysql2');
const host = 'localhost';
const database = 'museu';
const user = 'root';
const password = '1234';

module.exports = ()=>{
    return dbConn = mysql.createConnection({
        host: host,
        database: database,
        user: user,
        password: password
    });   
}

