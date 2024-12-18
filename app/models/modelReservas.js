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
            INNER JOIN Pais p ON r.id_pai = p.id_pai
            LEFT JOIN Atividades a ON r.id_atividade = a.id_atividade
        `;
        dbConn.query(sql, callback);
    },

    // Verificar se o pai tem pagamento pendente
    verificarPagamentoPendente: (dbConn, id_pai, callback) => {
        const sql = `
            SELECT 
                COUNT(pg.id_pagamento) AS pagamentos_pendentes
            FROM 
                Reservas r
            LEFT JOIN 
                Pagamentos pg ON r.id_reserva = pg.id_reserva
            WHERE 
                r.id_pai = ? AND (pg.status_pagamento = 'Pendente' OR pg.status_pagamento IS NULL);
        `;
        dbConn.query(sql, [id_pai], (err, result) => {
            if (err) {
                return callback(err);
            }
            const temPendencia = result.length > 0 && result[0].pagamentos_pendentes > 0;
            callback(null, temPendencia);
        });
    },




// Criar uma nova reserva
create: (dbConn, data, callback) => {
    // Garantir que id_pai não seja uma string vazia
    if (data.id_pai === '') {
        data.id_pai = null;  // Se for uma string vazia, definir como null
    }

    // Antes de criar a reserva, verificar pendências
    module.exports.verificarPagamentoPendente(dbConn, data.id_pai, (err, temPendente) => {
        if (err) {
            return callback(err);
        }
        if (temPendente) {
            return callback(new Error('Este pai possui um pagamento pendente. Não é possível fazer uma nova reserva.'));
        }

        const sql = 'INSERT INTO Reservas (id_crianca, id_pai, data_reserva, id_atividade) VALUES (?, ?, ?, ?)';
        const values = [data.id_crianca, data.id_pai, data.data_reserva, data.id_atividade];
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
        const values = [data.data_reserva, data.status_reserva, id];
        dbConn.query(sql, values, callback);
    },

    // Deletar uma reserva
    delete: (dbConn, id, callback) => {
        const sql = 'DELETE FROM Reservas WHERE id_reserva = ?';
        dbConn.query(sql, [id], callback);
    }
};
