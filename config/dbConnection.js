const mysql = require('mysql2');
const host = 'localhost';
const database = 'hotelInfantil';
const user = 'root';
const password = '';

module.exports = ()=>{
    return dbConn = mysql.createConnection({
        host: host,
        database: database,
        user: user,
        password: password
    });   
}

