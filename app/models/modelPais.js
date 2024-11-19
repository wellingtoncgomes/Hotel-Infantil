// app/models/paisModel.js
module.exports = {
    getAll: (dbConnection, callback) => {
        const sql = 'SELECT * FROM Pais;';
        dbConnection.query(sql, callback);
    },

    create: (dbConnection, data, callback) => {
        const sql = 'INSERT INTO Pais (nome, email, telefone, cpf) VALUES (?, ?, ?, ?);';
        dbConnection.query(sql, [data.nome, data.email, data.telefone, data.cpf], callback);
    },

    update: (dbConnection, id, data, callback) => {
        const sql = 'UPDATE Pais SET nome = ?, email = ?, telefone = ?, cpf = ? WHERE id_pai = ?;';
        dbConnection.query(sql, [data.nome, data.email, data.telefone, data.cpf, id], callback);
    },

    delete: (dbConnection, id, callback) => {
        const sql = 'DELETE FROM Pais WHERE id_pai = ?;';
        dbConnection.query(sql, [id], callback);
    }
};
