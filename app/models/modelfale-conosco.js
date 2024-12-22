module.exports = {
    // Recupera todas as mensagens (opcional, caso necessário no futuro)
    getMessages: (dbConnection, callback) => {
        console.log('Model fale-conosco: Recuperando mensagens...');
        const sql = "SELECT * FROM contato"; // Consulta para recuperar mensagens
        dbConnection.query(sql, callback);
    },

    // Salva uma mensagem no banco de dados
    saveMessage: (dbConnection, nome, email, mensagem, callback) => {
        console.log('Model fale-conosco: Salvando mensagem...');
        const sql = "INSERT INTO contato (nome, email, mensagem) VALUES (?, ?, ?)";
        dbConnection.query(sql, [nome, email, mensagem], callback);
    }
};
