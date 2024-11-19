const criancasModel = require('../models/modelCriancas');
const dbConnection = require('../../config/dbConnection');

module.exports = {
    listCriancas: (req, res) => {
        const dbConn = dbConnection();
        criancasModel.getAll(dbConn, (err, result) => {
            if (err) {
                console.error(err);
                return res.status(500).send('Erro ao buscar crianças');
            }
            res.render('criancas-list.ejs', { criancas: result });
        });
    },

    createCrianca: (req, res) => {
        const dbConn = dbConnection();
        console.log("aqui adciona crianca",req.body)
        criancasModel.create(dbConn, req.body, (err) => {
            if (err) {
                console.error(err);
                return res.status(500).send('Erro ao adicionar criança');
            }
            res.redirect('/criancas');
        });
    },

    editCrianca: (req, res) => {
        const dbConn = dbConnection();
        const { id } = req.params;
        criancasModel.update(dbConn, id, req.body, (err) => {
            if (err) {
                console.error(err);
                return res.status(500).send('Erro ao atualizar criança');
            }
            res.redirect('/criancas');
        });
    },

    removeCrianca: (req, res) => {
        const dbConn = dbConnection();
        const { id } = req.params;
        criancasModel.delete(dbConn, id, (err) => {
            if (err) {
                console.error(err);
                return res.status(500).send('Erro ao excluir criança');
            }
            res.redirect('/criancas');
        });
    }
};
