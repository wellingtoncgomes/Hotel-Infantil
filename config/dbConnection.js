const mysql = require('mysql2');
dotenv.config({ path: './.env' });
//<<<<<<< HEAD
const host = 'localhost';
const database = 'hotelInfantil';
const user = 'root';
const password = '';
//=======
//>>>>>>> 9ef67a6de8a8a3ba15c5c8e2acf1209f6f2127a3

// Configuração do banco de dados
const dbConfig = {
    host: process.env.database_host,
    user: process.env.database_user,
    password: process.env.database_password,
    database: process.env.database,
};

// Função para criar a conexão com o banco de dados
 module.exports = () => {
     const connection = mysql.createConnection(dbConfig);

     // Testando a conexão
     connection.connect((err) => {
         if (err) {
             console.error('Erro ao conectar ao banco de dados:', err);
         } else {
            console.log('Conectado ao banco de dados.');
         }
     });

     return connection;
 };
