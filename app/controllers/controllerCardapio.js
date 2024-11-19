const cardapioModel = require('../models/modelCardapio');
const dbConnection = require('../../config/dbConnection');

module.exports = {
    // Listar todos os itens do cardápio
    listCardapio: (req, res) => {
        const dbConn = dbConnection();
        cardapioModel.getAll(dbConn, (err, result) => {
            if (err) {
                console.error(err);
                return res.status(500).send('Erro ao buscar itens do cardápio');
            }
            res.render('cardapio-list.ejs', { cardapio: result });
        });
    },

    // Criar um novo item no cardápio
    createCardapio: (req, res) => {
        const dbConn = dbConnection();
        cardapioModel.create(dbConn, req.body, (err) => {
            if (err) {
                console.error(err);
                return res.status(500).send('Erro ao criar item no cardápio');
            }
            res.redirect('/cardapio');
        });
    },


    // Atualizar um item no cardápio
    updateCardapio: (req, res) => {
        const dbConn = dbConnection();
        const { id } = req.params;
        cardapioModel.update(dbConn, id, req.body, (err) => {
            if (err) {
                console.error(err);
                return res.status(500).send('Erro ao atualizar item do cardápio');
            }
            res.redirect('/cardapio');
        });
    },

    // Remover um item do cardápio
    removeCardapio: (req, res) => {
        const dbConn = dbConnection();
        const { id } = req.params;
        cardapioModel.delete(dbConn, id, (err) => {
            if (err) {
                console.error(err);
                return res.status(500).send('Erro ao excluir item do cardápio');
            }
            res.redirect('/cardapio');
        });
    }
};
