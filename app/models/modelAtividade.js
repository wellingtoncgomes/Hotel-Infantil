
module.exports = {
    // Obter todas as atividades
    getAll: (dbConn, callback) => {
        const sql = 'SELECT * FROM Atividades';
        dbConn.query(sql, callback);
    },

    // Criar uma nova atividade
    create: (dbConn, data, callback) => {
        const sql = 'INSERT INTO Atividades (nome, descricao, faixa_etaria) VALUES (?, ?, ?)';
        const values = [data.nome, data.descricao, data.faixa_etaria];
        dbConn.query(sql, values, callback);
    },

    // Obter uma atividade específica pelo ID
    getById: (dbConn, id, callback) => {
        const sql = 'SELECT * FROM Atividades WHERE id_atividade = ?';
        dbConn.query(sql, [id], callback);
    },

    // Atualizar uma atividade
    update: (dbConn, id, data, callback) => {
        const sql = 'UPDATE Atividades SET nome = ?, descricao = ?,  faixa_etaria = ? WHERE id_atividade = ?';
        const values = [data.nome, data.descricao, data.faixa_etaria , id];
        dbConn.query(sql, values, callback);
    },

    // Deletar uma atividade
    delete: (dbConn, id, callback) => {
        const sql = 'DELETE FROM Atividades WHERE id_atividade = ?';
        dbConn.query(sql, [id], callback);
    }
};
