module.exports = {
  getOrientadores: (pool, callback) => {
    const sql =
      "SELECT id_orientador AS id, nome, especialidade, imagem FROM Orientadores";
    pool.query(sql, (err, result) => {
      if (err) return callback(err);
      callback(null, result.rows);
    });
  },

  getCardapios: (pool, callback) => {
    const sql =
      "SELECT id_item AS id, nome, descricao, tipo, dia_semana, imagem FROM Cardapio";
    pool.query(sql, (err, result) => {
      if (err) return callback(err);
      callback(null, result.rows);
    });
  },

  getAtividades: (pool, callback) => {
    const sql =
      "SELECT id_atividade AS id, nome, descricao, faixa_etaria, imagem FROM Atividades";
    pool.query(sql, (err, result) => {
      if (err) return callback(err);
      callback(null, result.rows);
    });
  },
};
