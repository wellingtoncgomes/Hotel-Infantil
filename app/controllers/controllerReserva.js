const reservasModel = require('../models/modelReservas');
const dbConnection = require('../../config/dbConnection');

module.exports = {
    // Listar todas as reservas
    listReservas: (req, res) => {
        const dbConn = dbConnection();
        reservasModel.getAll(dbConn, (err, result) => {
            if (err) {
                console.error('[Erro em listReservas]', err);
                return res.status(500).send('Erro ao buscar reservas.');
            }
            console.log(result)
            res.render('reservas-list.ejs', { reservas: result });
        });
    },

    // Criar uma nova reserva
    createReserva: (req, res) => {
        const dbConn = dbConnection();
        reservasModel.create(dbConn, req.body, (err) => {
            if (err) {
                console.error('[Erro em createReserva]', err.message);
                return res.status(400).send(err.message); // Inclui a mensagem de erro do modelo
            }
            res.redirect('/reservas');
        });
    },

    // Editar uma reserva
    editReserva: (req, res) => {
        const dbConn = dbConnection();
        const { id } = req.params;
        reservasModel.update(dbConn, id, req.body, (err) => {
            if (err) {
                console.error('[Erro em editReserva]', err);
                return res.status(500).send('Erro ao editar reserva.');
            }
            res.redirect('/reservas');
        });
    },

    // Remover uma reserva
    removeReserva: (req, res) => {
        const dbConn = dbConnection();
        const { id } = req.params;
        reservasModel.delete(dbConn, id, (err) => {
            if (err) {
                console.error('[Erro em removeReserva]', err);
                return res.status(500).send('Erro ao excluir reserva.');
            }
            res.redirect('/reservas');
        });
    },
};
