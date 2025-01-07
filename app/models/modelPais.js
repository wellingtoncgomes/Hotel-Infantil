module.exports = {

    getAll: (pool, callback) => {
      pool.query('SELECT * FROM pais', (err, result) => {
          if (err) return callback(err);
          callback(null, result.rows); // Usando 'rows' para acessar os dados no PostgreSQL
      });
  },
   create: (pool, data, callback) => {
      const { nome, email, cpf, telefone } = data;
      pool.query(
          'INSERT INTO pais (nome, email, cpf, telefone) VALUES ($1, $2, $3, $4)',
          [nome, email, cpf, telefone],
          (err) => {
              if (err) return callback(err);
              callback(null);
          }
      );
  },

  update: (pool,data, callback) => {
      const { nome, email, cpf, telefone, id_pai} = data;
      pool.query(
          'UPDATE pais SET nome = $1, email = $2, cpf = $3, telefone = $4 WHERE id_pai = $5',
          [nome, email, cpf, telefone, id_pai],
          (err) => {
              if (err) return callback(err);
              callback(null);
          }
      );
  },

  delete: (pool, id, callback) => {
      pool.query('DELETE FROM pais WHERE id_pai = $1', [id], (err) => {
          if (err) return callback(err);
          callback(null);
      });
  },
};
