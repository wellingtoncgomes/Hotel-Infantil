const dbConnection = require('../../config/dbConnection');
const reservasModel = require('../models/modelReservas');

const criancasModel = require('../models/modelCriancas');
const paisModel = require('../models/modelPais');
const atividadeModel = require('../models/modelAtividades');

module.exports = {
    // Listar todas as reservas
    listReservas: (req, res) => {
        const dbConn = dbConnection();
    
        const criancasPromise = new Promise((resolve, reject) => {
            criancasModel.getAll(dbConn, (err, criancas) => {
                if (err) return reject(err);
                resolve(criancas);
            });
        });
    
        const paisPromise = new Promise((resolve, reject) => {
            paisModel.getAll(dbConn, (err, pais) => {
                if (err) return reject(err);
                resolve(pais);
            });
        });
    
        const atividadesPromise = new Promise((resolve, reject) => {
            atividadeModel.getAll(dbConn, (err, atividades) => {
                if (err) return reject(err);
                resolve(atividades);
            });
        });
    
        Promise.all([criancasPromise, paisPromise, atividadesPromise])
            .then(([criancas, pais, atividades]) => {
                // Aqui, você pode usar as reservas também, como abaixo:
                reservasModel.getAll(dbConn, (err, reservas) => {
                    if (err) {
                        console.error(err);
                        return res.status(500).send('Erro ao buscar reservas');
                    }
                    // Passando reservas, criancas, pais e atividades para a view
                    res.render('reservas-list.ejs', { reservas, criancas, pais, atividades });
                });
            })
            .catch(err => {
                console.error('[Erro em listReservas]', err);
                res.status(500).send('Erro ao carregar dados');
            });
    },

    
    // Criar nova reserva
    createReserva: (req, res) => {
        const { id_crianca, id_pai, id_atividade, data_reserva } = req.body;
        
        // Verificar se todos os campos estão preenchidos
        if (!id_crianca, !id_pai, !id_atividade, !data_reserva) {
            return res.status(400).send("Todos os campos são obrigatórios.");
        }

        const dbConn = dbConnection();  // Conexão com o banco

        // Chamar a função do model para criar a reserva
        reservasModel.create(dbConn, { id_crianca, id_pai, id_atividade, data_reserva }, (err, result) => {
            if (err) {
                return res.status(500).send("Erro ao cadastrar reserva.");
            }
            res.redirect('/reservas'); // Redirecionar de volta para a página de reservas
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

    // Renderizar o formulário de reserva
    renderFormReserva: (req, res) => {
        const dbConn = dbConnection();

        const criancasPromise = new Promise((resolve, reject) => {
            criancasModel.getAll(dbConn, (err, criancas) => {
                if (err) return reject(err);
                resolve(criancas);
            });
        });

        const paisPromise = new Promise((resolve, reject) => {
            paisModel.getAll(dbConn, (err, pais) => {
                if (err) return reject(err);
                resolve(pais);
            });
        });

        const atividadesPromise = new Promise((resolve, reject) => {
            atividadeModel.getAll(dbConn, (err, atividades) => {
                if (err) return reject(err);
                resolve(atividades);
            });
        });

        Promise.all([criancasPromise, paisPromise, atividadesPromise])
            .then(([criancas, pais, atividades]) => {
                res.render('form-reserva.ejs', { criancas, pais, atividades });
            })
            .catch(err => {
                console.error('[Erro em renderFormReserva]', err);
                res.status(500).send('Erro ao carregar dados');
            });
    }
};
