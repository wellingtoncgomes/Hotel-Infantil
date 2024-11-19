const dbConnection = require('../../config/dbConnection');

module.exports = {
    // Obter todos os itens do cardápio
    getAll: (dbConn, callback) => {
        const sql = 'SELECT * FROM Cardapio';
        dbConn.query(sql, callback);
    },

    // Criar um novo item no cardápio
    create: (dbConn, data, callback) => {
        const sql = 'INSERT INTO Cardapio (nome, descricao, tipo, dia_semana) VALUES (?, ?, ?,?)';
        const values = [data.nome, data.descricao, data.tipo, data.dia_semana];
        dbConn.query(sql, values, callback);
    },

    // Atualizar um item do cardápio
    update: (dbConn, id, data, callback) => {
        const sql = 'UPDATE Cardapio SET nome = ?, descricao = ?, tipo = ? , dia_semana = ? WHERE id_item = ?';
        const values = [data.nome, data.descricao, data.tipo, data.dia_semana, id];
        dbConn.query(sql, values, callback);
    },

    // Deletar um item do cardápio
    delete: (dbConn, id, callback) => {
        const sql = 'DELETE FROM Cardapio WHERE id_item = ?';
        dbConn.query(sql, [id], callback);
    },

    // Obter um item específico pelo ID
    getById: (dbConn, id, callback) => {
        const sql = 'SELECT * FROM Cardapio WHERE id_item = ?';
        dbConn.query(sql, [id], callback);
    }
};
