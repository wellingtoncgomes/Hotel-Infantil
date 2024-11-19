const dbConnection = require('../../config/dbConnection');

module.exports = {
    // Obter todos os orientadores
    getAll: (dbConn, callback) => {
        const sql = 'SELECT * FROM Orientadores';
        dbConn.query(sql, callback);
    },

    // Criar um novo orientador
    create: (dbConn, data, callback) => {
        const sql = 'INSERT INTO Orientadores (nome, especialidade) VALUES (?, ?)';
        const values = [data.nome, data.especialidade];
        dbConn.query(sql, values, callback);
    },

    // Obter um orientador específico pelo ID
    getById: (dbConn, id, callback) => {
        const sql = 'SELECT * FROM Orientadores WHERE id_orientador = ?';
        dbConn.query(sql, [id], callback);
    },

    // Atualizar um orientador
    update: (dbConn, id, data, callback) => {
        const sql = 'UPDATE Orientadores SET nome = ?, especialidade = ? WHERE id_orientador = ?';
        const values = [data.nome, data.especialidade, id];
        dbConn.query(sql, values, callback);
    },

    // Deletar um orientador
    delete: (dbConn, id, callback) => {
        const sql = 'DELETE FROM Orientadores WHERE id_orientador = ?';
        dbConn.query(sql, [id], callback);
    }
};
