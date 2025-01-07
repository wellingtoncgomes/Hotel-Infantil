const pool = require("../../config/dbConnection");

module.exports = {
  // Obter todas as reservas
  getAll: (pool, callback) => {
    const sql = `
            SELECT 
                r.id_reserva,
                r.data_reserva,
                r.status_reserva,
                c.nome AS nome_crianca,
                p.nome AS nome_pai,
                a.nome AS nome_atividade
            FROM Reservas r
            INNER JOIN Criancas c ON r.id_crianca = c.id_crianca
            INNER JOIN Pais p ON r.id_pai = p.id_pai
            LEFT JOIN Atividades a ON r.id_atividade = a.id_atividade 
        `;
    pool.query(sql, (err, result) => {
      if (err) return callback(err);
      callback(null, result.rows); // Usando 'rows' para acessar os dados no PostgreSQL
    });
  },

  // Verificar se o pai tem pagamento pendente
  verificarRelacaoPaiFilho: async (pool, id_crianca, id_pai) => {
    const sql = "SELECT * FROM Criancas WHERE id_crianca = $1 AND id_pai = $2";
    const values = [id_crianca, id_pai];
    const result = await pool.query(sql, values);
    return result.rowCount > 0; // Retorna true se a relação for válida
  },

  // Verificar se o pai possui pagamentos pendentes
  verificarPagamentoPendente: (pool, id_pai, callback) => {
    const sql = `
            SELECT 
                COUNT(pg.id_pagamento) AS pagamentos_pendentes
            FROM 
                Reservas r
            INNER JOIN 
                Pagamentos pg ON r.id_reserva = pg.id_reserva
            WHERE 
                r.id_pai = $1 AND pg.status_pagamento = 'Pendente';
        `;
    pool.query(sql, [id_pai], (err, result) => {
      if (err) {
        return callback(err);
      }
      const temPendencia = result.rows[0]?.pagamentos_pendentes > 0;
      callback(null, temPendencia);
    });
  },

  // Criar uma nova reserva
  create: async (pool, data) => {
    const sql =
      "INSERT INTO Reservas (id_crianca, id_pai, data_reserva, id_atividade) VALUES ($1, $2, $3, $4)";
    const values = [
      data.id_crianca,
      data.id_pai,
      data.data_reserva,
      data.id_atividade,
    ];
    await pool.query(sql, values);
  },

  // Obter uma reserva específica pelo ID
  getById: (pool, id, callback) => {
    const sql = "SELECT * FROM Reservas WHERE id_reserva = $1";
    pool.query(sql, [id], (err, result) => {
      if (err) return callback(err);
      callback(null, result.rows[0]); // Retorna a reserva encontrada
    });
  },

  // Atualizar uma reserva
  update: (pool, id, data, callback) => {
    const sql = "UPDATE Reservas SET status_reserva = $1 WHERE id_reserva = $2";
    const values = [data.status_reserva, id]; // Inclui a data e o status na atualização
    pool.query(sql, values, (err) => {
      if (err) return callback(err); // Retorna erro se houver
      callback(null); // Retorna null se a atualização for bem-sucedida
    });
  },

  checkPagamento: (pool, id, callback) => {
    const sql = "SELECT COUNT(*) FROM pagamentos WHERE id_reserva = $1";
    pool.query(sql, [id], (err, result) => {
      if (err) return callback(err); // Se ocorrer um erro na consulta, chama o callback com o erro
      callback(null, result.rows[0].count > 0); // Retorna true se houver pagamento atrelado
    });
  },

  // Deletar uma reserva
  delete: (pool, id, callback) => {
    const sql = "DELETE FROM reservas WHERE id_reserva = $1";
    pool.query(sql, [id], (err) => {
      if (err) return callback(err); // Se houver erro, chama o callback com o erro
      callback(null); // Se não houver erro, chama o callback com null
    });
  },
};
