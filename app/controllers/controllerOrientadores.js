const orientadoresModel = require('../models/modelOrientadores');
const dbConnection = require('../../config/dbConnection');

module.exports = {
    listOrientadores: (req, res) => {
        const dbConn = dbConnection();
        orientadoresModel.getAll(dbConn, (err, result) => {
            if (err) {
                console.error(err);
                return res.status(500).send('Erro ao buscar orientadores');
            }
            res.render('orientadores-list.ejs', { orientadores: result });
        });
    },

    createOrientador: (req, res) => {
        const dbConn = dbConnection();
        orientadoresModel.create(dbConn, req.body, (err) => {
            if (err) {
                console.error(err);
                return res.status(500).send('Erro ao criar orientador');
            }
            res.redirect('/orientadores');
        });
    },

    editOrientador: (req, res) => {
        const dbConn = dbConnection();
        const { id } = req.params;
        orientadoresModel.update(dbConn, id, req.body, (err) => {
            if (err) {
                console.error(err);
                return res.status(500).send('Erro ao atualizar orientador');
            }
            res.redirect('/orientadores');
        });
    },

    removeOrientador: (req, res) => {
        const dbConn = dbConnection();
        const { id } = req.params;
        orientadoresModel.delete(dbConn, id, (err) => {
            if (err) {
                console.error(err);
                return res.status(500).send('Erro ao excluir orientador');
            }
            res.redirect('/orientadores');
        });
    }
};
