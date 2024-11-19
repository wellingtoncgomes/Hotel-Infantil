const pagamentosModel = require('../models/modelPagamento');
const dbConnection = require('../../config/dbConnection');

module.exports = {
    // Listar todos os pagamentos
    listPagamentos: (req, res) => {
        const dbConn = dbConnection();
        pagamentosModel.getAll(dbConn, (err, result) => {
            if (err) {
                console.error('Erro ao buscar pagamentos:', err);
                return res.status(500).send('Erro ao buscar pagamentos. Por favor, tente novamente mais tarde.');
            }
            res.render('pagamentos-list.ejs', { pagamentos: result });
        });
    },

    // Criar um novo pagamento
    createPagamento: (req, res) => {
        const dbConn = dbConnection();
        const { id_reserva, valor, data_pagamento, metodo_pagamento } = req.body;

        // Validação básica
        if (!id_reserva || !valor || !data_pagamento || !metodo_pagamento) {
            return res.status(400).send('Todos os campos são obrigatórios.');
        }

        const pagamentoData = {
            id_reserva,
            valor: parseFloat(valor),
            data_pagamento,
            metodo_pagamento
        };

        pagamentosModel.create(dbConn, pagamentoData, (err) => {
            if (err) {
                console.error('Erro ao registrar pagamento:', err);
                return res.status(500).send('Erro ao registrar pagamento. Por favor, tente novamente.');
            }
            res.redirect('/pagamentos');
        });
    },

    // Atualizar o status do pagamento
    updatePagamento: (req, res) => {
        const dbConn = dbConnection();
        const { id } = req.params;
        const { status_pagamento } = req.body;

        // Validação básica
        if (!status_pagamento) {
            return res.status(400).send('O campo status_pagamento é obrigatório.');
        }

        pagamentosModel.updateStatus(dbConn, id, status_pagamento, (err) => {
            if (err) {
                console.error('Erro ao atualizar pagamento:', err);
                return res.status(500).send('Erro ao atualizar pagamento. Por favor, tente novamente.');
            }
            res.redirect('/pagamentos');
        });
    },

    // Remover um pagamento
    removePagamento: (req, res) => {
        const dbConn = dbConnection();
        const { id } = req.params;

        pagamentosModel.delete(dbConn, id, (err) => {
            if (err) {
                console.error('Erro ao excluir pagamento:', err);
                return res.status(500).send('Erro ao excluir pagamento. Por favor, tente novamente.');
            }
            res.redirect('/pagamentos');
        });
    }
};
