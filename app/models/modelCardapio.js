module.exports = {
    // Obter todos os itens do cardápio
    getAll: (pool, callback) => {
        const sql = "SELECT id_item AS id, nome, descricao, tipo, dia_semana, imagem FROM Cardapio";
        pool.query(sql, (err, result) => {
            if (err) return callback(err);
            callback(null, result.rows); 
        });
    },

    // Criar um novo item no cardápio
    create: (pool, data, callback) => {
        console.log(data)
        const { nome, descricao, tipo, dia_semana, imagem_url } = data;
        const sql = "INSERT INTO cardapio (nome, descricao, tipo, dia_semana, imagem) VALUES ($1, $2, $3, $4, $5)";
        pool.query(sql, [nome, descricao, tipo, dia_semana, imagem_url], (err) => {
            if (err) return callback(err);
            callback(null);
        });
    },

    // Atualizar um item do cardápio
    update: (pool, data, callback) => {
        console.log("aqui",data)
        const { nome, descricao, tipo, dia_semana, imagem_url, id } = data;
        console.log(data)
        const sql = "UPDATE Cardapio SET nome = $1, descricao = $2, tipo = $3, dia_semana = $4, imagem = $5 WHERE id_item = $6";
        pool.query(sql, [nome, descricao, tipo, dia_semana, imagem_url, id], (err) => {
            if (err) return callback(err);
            callback(null);
        });
    },

    // Deletar um item do cardápio
    delete: (pool, id, callback) => {
        const sql = "DELETE FROM Cardapio WHERE id_item = $1";
        pool.query(sql, [id], (err) => {
            if (err) return callback(err);
            callback(null);
        });
    },

    // Obter um item específico pelo ID
    getById: (pool, id, callback) => {
        const sql = "SELECT * FROM Cardapio WHERE id_item = $1";
        pool.query(sql, [id], (err, result) => {
            if (err) return callback(err);
            callback(null, result.rows[0]); // Retorna apenas o primeiro resultado
        });
    }
};
