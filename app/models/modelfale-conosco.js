const pool = require('../../config/dbConnection');
module.exports = {
    getMessages: (pool, callback) => {
        console.log('Model fale-conosco: Recuperando mensagens...');
        const sql = "SELECT * FROM contato"; // Consulta para recuperar mensagens
        pool.query(sql, callback);
    },

    // Salva uma mensagem no banco de dados
    saveMessage: (pool, nome, email, mensagem, callback) => {
        console.log('Model fale-conosco: Salvando mensagem...');
        const sql = "INSERT INTO contato (nome, email, mensagem) VALUES ($1, $2, $3)";
        const values = [nome, email, mensagem];
        pool.query(sql, values, callback);
    }
};
