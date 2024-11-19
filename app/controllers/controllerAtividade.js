const atividadesModel = require('../models/modelAtividade');
const dbConnection = require('../../config/dbConnection');

module.exports = {
    listAtividades: (req, res) => {
        const dbConn = dbConnection();
        atividadesModel.getAll(dbConn, (err, result) => {
            if (err) {
                console.error(err);
                return res.status(500).send('Erro ao buscar atividades');
            }
            res.render('atividades-list.ejs', { atividades: result });
        });
    },

    createAtividade: (req, res) => {
        const dbConn = dbConnection();
        atividadesModel.create(dbConn, req.body, (err) => {
            if (err) {
                console.error(err);
                return res.status(500).send('Erro ao criar atividade');
            }
            res.redirect('/atividades');
        });
    },

    editAtividade: (req, res) => {
        const dbConn = dbConnection();
        const { id } = req.params;
        atividadesModel.update(dbConn, id, req.body, (err) => {
            if (err) {
                console.error(err);
                return res.status(500).send('Erro ao atualizar atividade');
            }
            res.redirect('/atividades');
        });
    },

    removeAtividade: (req, res) => {
        const dbConn = dbConnection();
        const { id } = req.params;
        atividadesModel.delete(dbConn, id, (err) => {
            if (err) {
                console.error(err);
                return res.status(500).send('Erro ao excluir atividade');
            }
            res.redirect('/atividades');
        });
    }
};
