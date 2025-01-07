const pool = require("../../config/dbConnection"); // Certifique-se de que o pool está sendo exportado corretamente

module.exports = {
  // Obter todos os pagamentos
  getAll: (pool, callback) => {
    const sql = "SELECT * FROM Pagamentos";
    pool.query(sql, callback);
  },

  // Criar um novo pagamento
  create: (pool, data, callback) => {
    const sql = `
            INSERT INTO Pagamentos (id_reserva, valor, data_pagamento, metodo_pagamento)
            VALUES ($1, $2, $3, $4)
        `;
    const values = [
      data.id_reserva,
      data.valor,
      data.data_pagamento,
      data.metodo_pagamento,
    ];
    pool.query(sql, values, callback);
  },

  // Verificar se há pagamento pendente para um pai
  verificarPagamentoPendente: (pool, id_pai, callback) => {
    const sql = `
            SELECT
                p.id_pai,
                COUNT(pg.id_pagamento) AS pagamentos_pendentes
            FROM
                Pais p
            INNER JOIN
                Reservas r ON p.id_pai = r.id_pai
            INNER JOIN
                Pagamentos pg ON r.id_reserva = pg.id_reserva
            WHERE
                p.id_pai = $1 AND pg.status_pagamento = 'Pendente'
            GROUP BY
                p.id_pai
        `;
    pool.query(sql, [id_pai], (err, result) => {
      if (err) {
        return callback(err);
      }
      // Verifica se existem pagamentos pendentes
      const temPendentes =
        result.rows.length > 0 && result.rows[0].pagamentos_pendentes > 0;
      callback(null, temPendentes);
    });
  },

  // Atualizar o status do pagamento
  updateStatus: (pool, id_pagamento, status_pagamento, callback) => {
    const sql =
      "UPDATE Pagamentos SET status_pagamento = $1 WHERE id_pagamento = $2";
    pool.query(sql, [status_pagamento, id_pagamento], callback);
  },

  // Obter pagamento por ID
  getById: (pool, id_pagamento, callback) => {
    const sql = "SELECT * FROM Pagamentos WHERE id_pagamento = $1";
    pool.query(sql, [id_pagamento], callback);
  },

  // Deletar pagamento
  delete: (pool, id_pagamento, callback) => {
    const sql = "DELETE FROM Pagamentos WHERE id_pagamento = $1";
    pool.query(sql, [id_pagamento], callback);
  },
};
