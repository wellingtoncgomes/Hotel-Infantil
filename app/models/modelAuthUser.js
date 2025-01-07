const pool = require("../../config/dbConnection");

module.exports = {
  // Função para autenticar um usuário
  authenticateUser: (email) => {
    return new Promise((resolve, reject) => {
      const sql = "SELECT * FROM usuarios WHERE email = $1";
      pool.query(sql, [email], (err, result) => {
        if (err) {
          return reject(err);
        }
        // Retorna o primeiro usuário encontrado
        resolve(result.rows[0]);
      });
    });
  },
  buscarUsuarioPorEmail: (email) => {
    return new Promise((resolve, reject) => {
      const sql = "SELECT * FROM usuarios WHERE email = $1";
      pool.query(sql, [email], (err, result) => {
        if (err) {
          return reject(err);
        }
        resolve(result.rows[0]); // Retorna o usuário encontrado ou null
      });
    });
  },

  // Função para criar um novo usuário
  criarUsuario: (nome, email, senha) => {
    return new Promise((resolve, reject) => {
      const sql =
        "INSERT INTO usuarios (nome, email, password) VALUES ($1, $2, $3)";
      pool.query(sql, [nome, email, senha], (err, result) => {
        if (err) {
          return reject(err);
        }
        resolve(result);
      });
    });
  },
};
