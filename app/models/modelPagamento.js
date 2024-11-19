const dbConnection = require('../../config/dbConnection');

module.exports = {
    // Obter todos os pagamentos
    getAll: (dbConn, callback) => {
        const sql = 'SELECT * FROM Pagamentos';
        dbConn.query(sql, callback);
    },

    // Criar um novo pagamento
    create: (dbConn, data, callback) => {
        const sql = `
            INSERT INTO Pagamentos (id_reserva, valor, data_pagamento, metodo_pagamento)
            VALUES (?, ?, ?, ?)
        `;
        const values = [data.id_reserva, data.valor, data.data_pagamento, data.metodo_pagamento];
        dbConn.query(sql, values, callback);
    },

    // Verificar se há pagamento pendente para um pai
    verificarPagamentoPendente: (dbConn, id_pai, callback) => {
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
                p.id_pai = ? AND pg.status_pagamento = 'Pendente'
            GROUP BY 
                p.id_pai
        `;
        dbConn.query(sql, [id_pai], (err, result) => {
            if (err) {
                return callback(err);
            }
            // Verifica se existem pagamentos pendentes
            const temPendentes = result.length > 0 && result[0].pagamentos_pendentes > 0;
            callback(null, temPendentes);
        });
    },

    // Atualizar o status do pagamento
    updateStatus: (dbConn, id_pagamento, status_pagamento, callback) => {
        const sql = 'UPDATE Pagamentos SET status_pagamento = ? WHERE id_pagamento = ?';
        dbConn.query(sql, [status_pagamento, id_pagamento], callback);
    },

    // Obter pagamento por ID
    getById: (dbConn, id_pagamento, callback) => {
        const sql = 'SELECT * FROM Pagamentos WHERE id_pagamento = ?';
        dbConn.query(sql, [id_pagamento], callback);
    },

    // Deletar pagamento
    delete: (dbConn, id_pagamento, callback) => {
        const sql = 'DELETE FROM Pagamentos WHERE id_pagamento = ?';
        dbConn.query(sql, [id_pagamento], callback);
    }
};
