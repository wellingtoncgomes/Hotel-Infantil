const dbConnection = require('../../config/dbConnection');

module.exports = {
    getAll: (dbConn, callback) => {
        const sql = 'SELECT * FROM Criancas';
        dbConn.query(sql, callback);
    },

    create: (dbConn, data, callback) => {
        const sql = 'INSERT INTO Criancas (nome, idade, alergias, id_pai) VALUES (?, ?, ?, ?)';
        const values = [data.nome, data.idade, data.alergias, data.id_pai];
        dbConn.query(sql, values, callback);
    },

    getById: (dbConn, id, callback) => {
        const sql = 'SELECT * FROM Criancas WHERE id_crianca = ?';
        dbConn.query(sql, [id], callback);
    },


    update: (dbConn, id, data, callback) => {
        const sql = 'UPDATE Criancas SET nome = ?, idade = ?, alergias = ?, id_pai = ? WHERE id_crianca = ?';
        const values = [data.nome, data.idade, data.alergias, data.id_pai, id];
        dbConn.query(sql, values, callback);
    },


    delete: (dbConn, id, callback) => {
        const sql = 'DELETE FROM Criancas WHERE id_crianca = ?';
        dbConn.query(sql, [id], callback);
    }
};
