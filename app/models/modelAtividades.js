module.exports = {
    // Obter todas as atividades
    getAll: (pool, callback) => {
        const sql = 'SELECT * FROM Atividades';
        pool.query(sql, (err, result) => {
            if (err) {
                console.error('Erro na consulta:', err);
                return callback(err, []);
            }        
            callback(null, result.rows);
        });
    },
   

    // Criar uma nova atividade
    create: (pool, data, callback) => {
        const sql = 'INSERT INTO Atividades (nome, descricao, faixa_etaria, imagem) VALUES ($1, $2, $3, $4)';
        const values = [data.nome, data.descricao, data.faixa_etaria, data.imagem_url];
        pool.query(sql, values, callback);
    },


    // Obter uma atividade específica pelo ID
    getById: (pool, id, callback) => {
        const sql = 'SELECT * FROM Atividades WHERE id_atividade = $1';
        pool.query(sql, [id], callback);
    },


    // Atualizar uma atividade
    update: (pool, data, callback) => {
        const sql = 'UPDATE Atividades SET nome = $1, descricao = $2, faixa_etaria = $3, imagem = $4 WHERE id_atividade = $5';
        const values = [data.nome, data.descricao, data.faixa_etaria,data.imagem_url, data.id_atividade];
        pool.query(sql, values, callback);
    },


    // Deletar uma atividade
    delete: (pool, id, callback) => {
        const sql = 'DELETE FROM Atividades WHERE id_atividade = $1';
        pool.query(sql, [id], callback);
    }
};



