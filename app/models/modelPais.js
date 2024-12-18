const dbConnection = require('../../config/dbConnection');

module.exports = {
  getAll: (dbConn, callback) => {
    dbConn.query('SELECT * FROM pais', (err, result) => {
      if (err) return callback(err);
      callback(null, result);
    });
  },

  create: (dbConn, data, callback) => {
    const { nome, email, cpf, telefone } = data;
    dbConn.query(
      'INSERT INTO pais (nome, email, cpf, telefone) VALUES (?, ?, ?, ?)',
      [nome, email, cpf, telefone],
      (err) => {
        if (err) return callback(err);
        callback(null);
      }
    );
  },

  update: (dbConn, id, data, callback) => {
    const { nome, email, cpf, telefone } = data;
    dbConn.query(
      'UPDATE pais SET nome = ?, email = ?, cpf = ?, telefone = ? WHERE id = ?',
      [nome, email, cpf, telefone, id],
      (err) => {
        if (err) return callback(err);
        callback(null);
      }
    );
  },

  delete: (dbConn, id, callback) => {
    dbConn.query('DELETE FROM pais WHERE id = ?', [id], (err) => {
      if (err) return callback(err);
      callback(null);
    });
  },
};
