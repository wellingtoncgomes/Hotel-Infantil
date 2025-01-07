const pool = require('../../config/dbConnection');
module.exports = {
    // Obter todos os orientadores
    getAll: (pool, callback) => {
        const sql = 'SELECT * FROM Orientadores';
        pool.query(sql, callback);
    },


    // Criar um novo orientador
    create: (pool, data, callback) => {
        const sql = 'INSERT INTO Orientadores (nome, especialidade, imagem) VALUES ($1, $2, $3)';
        const values = [data.nome, data.especialidade, data.imagem_url];
        pool.query(sql, values, callback);
    },


    // Obter um orientador específico pelo ID
    getById: (pool, id, callback) => {
        const sql = 'SELECT * FROM Orientadores WHERE id_orientador = $1';
        pool.query(sql, [id], callback);
    },


    // Atualizar um orientador
    update: (pool, data, callback) => {
        const sql = 'UPDATE Orientadores SET nome = $1, especialidade = $2, imagem = $3 WHERE id_orientador = $4';
        const values = [data.nome, data.especialidade,  data.imagem_url, data.id_orientador];
        console.log(values)
        pool.query(sql, values, callback);
    },


    // Deletar um orientador
    delete: (pool, id, callback) => {
        const sql = 'DELETE FROM Orientadores WHERE id_orientador = $1';
        pool.query(sql, [id], callback);
    }
};



