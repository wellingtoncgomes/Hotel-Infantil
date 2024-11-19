const dbConnection = require('../../config/dbConnection');

module.exports = {
    // Obter todas as reservas
    getAll: (dbConn, callback) => {
        const sql = `
            SELECT 
                r.id_reserva,
                r.data_reserva,
                r.status_reserva,
                c.nome AS nome_crianca,
                p.nome AS nome_pai,
                a.nome
            FROM Reservas r
            INNER JOIN Criancas c ON r.id_crianca = c.id_crianca
            INNER JOIN pais p ON r.id_pai = p.id_pai
            LEFT JOIN Atividades a ON r.id_atividade = a.id_atividade
        `;
        dbConn.query(sql, callback);
    },

    // Verificar se o pai tem pagamento pendente
    verificarPagamentoPendente: (dbConn, id_pai, callback) => {
        const sql = `
            SELECT 
                p.id_pai,
                p.nome AS nome_pai,
                COUNT(pg.id_pagamento) AS pagamentos_pendentes
            FROM 
                Pais p
            LEFT JOIN 
                Reservas r ON p.id_pai = r.id_pai
            LEFT JOIN 
                Pagamentos pg ON r.id_reserva = pg.id_reserva
            WHERE 
                p.id_pai = ? AND (pg.status_pagamento = 'Pendente' OR pg.status_pagamento IS NULL)
            GROUP BY 
                p.id_pai, p.nome;
        `;
    
        console.log(`Verificando pagamentos pendentes para id_pai: ${id_pai}`);
    
        dbConn.query(sql, [id_pai], (err, result) => {
            if (err) {
                return callback(err);
            }
    
            // Verificar se existem pagamentos pendentes
            const pagamentosPendente = result.length > 0 && result[0].pagamentos_pendentes > 0;
            callback(null, pagamentosPendente);
        });
    },
    

    // Criar uma nova reserva
    create: (dbConn, data, callback) => {
        // Verificar se o pai tem pagamento pendente antes de permitir a criação da reserva
        module.exports.verificarPagamentoPendente(dbConn, data.id_pai, (err, temPendente) => {
            if (err) {
                return callback(err);
            }
            if (temPendente) {
                return callback(new Error('Este pai possui um pagamento pendente. Não é possível fazer uma nova reserva.'));
            }

            const sql = 'INSERT INTO Reservas ( id_crianca,id_pai,data_reserva, id_atividade) VALUES (?, ?, ?, ?)';
            const values = [data.id_crianca, data.id_pai,data.data_reserva, data.id_atividade];
            dbConn.query(sql, values, callback);
        });
    },

    // Obter uma reserva específica pelo ID
    getById: (dbConn, id, callback) => {
        const sql = 'SELECT * FROM Reservas WHERE id_reserva = ?';
        dbConn.query(sql, [id], callback);
    },

    // Atualizar uma reserva
    update: (dbConn, id, data, callback) => {
        const sql = 'UPDATE Reservas SET data_reserva = ?, status_reserva = ? WHERE id_reserva = ?';
        const values = [data.data_reserva, data.status, id];
        dbConn.query(sql, values, callback);
    },

    // Deletar uma reserva
    delete: (dbConn, id, callback) => {
        const sql = 'DELETE FROM Reservas WHERE id_reserva = ?';
        dbConn.query(sql, [id], callback);
    }
};
