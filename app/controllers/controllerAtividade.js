const atividadesModel = require('../models/modelAtividades');
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
        const { id_atividade } = req.params;  // Ajuste aqui para usar 'id_atividade'
        atividadesModel.update(dbConn, id_atividade, req.body, (err) => {
            if (err) {
                console.error(err);
                return res.status(500).send('Erro ao atualizar atividade');
            }
            res.redirect('/atividades');
        });
    },

    removeAtividade: (req, res) => {
        const dbConn = dbConnection();
        const { id_atividade } = req.params;  // Ajuste aqui para usar 'id_atividade'
        atividadesModel.delete(dbConn, id_atividade, (err) => {
            if (err) {
                console.error(err);
                return res.status(500).send('Erro ao excluir atividade');
            }
            res.redirect('/atividades');
        });
    }
};
