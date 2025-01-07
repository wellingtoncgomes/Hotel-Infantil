module.exports = {
  getAll: (pool, callback) => {
    const sql = "SELECT id_crianca AS id, nome, idade, alergias FROM Criancas";
    pool.query(sql, (err, result) => {
      if (err) return callback(err);
      callback(null, result.rows); // 'rows' para acessar os dados no PostgreSQL
    });
  },

  create: (pool, data, callback) => {
    const { nome, idade, alergias, id_pai } = data;
    const sql =
      "INSERT INTO Criancas (nome, idade, alergias, id_pai) VALUES ($1, $2, $3, $4)";
    pool.query(sql, [nome, idade, alergias, id_pai], (err) => {
      if (err) return callback(err);
      callback(null);
    });
  },

  getById: (pool, id, callback) => {
    const sql = "SELECT * FROM Criancas WHERE id_crianca = $1";
    pool.query(sql, [id], (err, result) => {
      if (err) return callback(err);
      callback(null, result.rows[0]); // Retorna apenas o primeiro resultado
    });
  },

  update: (pool, data, callback) => {
    const { nome, idade, alergias, id_crianca } = data;
    const sql =
      "UPDATE Criancas SET nome = $1, idade = $2, alergias = $3 WHERE id_crianca = $4";
    pool.query(sql, [nome, idade, alergias, id_crianca], (err) => {
      if (err) return callback(err);
      callback(null);
    });
  },

  delete: (pool, id, callback) => {
    const sql = "DELETE FROM Criancas WHERE id_crianca = $1";
    pool.query(sql, [id], (err) => {
      if (err) return callback(err);
      callback(null);
    });
  },
};
