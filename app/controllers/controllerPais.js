const paisModel = require('../models/modelPais');
const dbConnection = require('../../config/dbConnection');

module.exports = {
    listPais: (req, res) => { // Removido o parâmetro "app"
        const dbConn = dbConnection();
        paisModel.getAll(dbConn, (err, result) => {
            if (err) {
                console.error(err);
                return res.status(500).send('Erro ao buscar dados');
            }
            console.log(result);
            res.render('pais-list.ejs', { pais: result }); // Certifique-se de que o template "pais-list.ejs" existe e está no diretório correto
        });
    },

    createPais: (req, res) => {
        const dbConn = dbConnection();
        console.log("aqui",req.body)
        paisModel.create(dbConn, req.body, (err) => {
            if (err) {
                console.error(err);
                return res.status(500).send('Erro ao criar pai');
            }
            res.redirect('/pais');
        });
    },

    editPais: (req, res) => {
        const dbConn = dbConnection();
        const { id } = req.params;
        console.log("aqui",req.params)
        console.log("aqui",req.body)
        paisModel.update(dbConn, id, req.body, (err) => {
            if (err) {
                console.error(err);
                return res.status(500).send('Erro ao atualizar pai');
            }
            res.redirect('/pais');
        });
    },

    removePais: (req, res) => {
        const dbConn = dbConnection();
        const { id } = req.params;
        console.log("aqui",req.params)
        paisModel.delete(dbConn, id, (err) => {
            if (err) {
                console.error(err);
                return res.status(500).send('Erro ao excluir pai');
            }
            res.redirect('/pais');
        });
    }
};
