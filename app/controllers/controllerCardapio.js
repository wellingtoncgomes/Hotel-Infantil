const cardapioModel = require('../models/modelCardapio');
const pool = require('../../config/dbConnection');

module.exports = {
    // Listar todos os itens do cardápio
    listCardapio: (req, res) => {
        cardapioModel.getAll(pool, (err, result) => {
            if (err) {
                console.error(err);
                return res.status(500).send('Erro ao buscar itens do cardápio');
            }
            res.render('cardapio-list', { cardapio: result});
        });
    },

    // Criar um novo item no cardápio
    createCardapio: (req, res) => {
        cardapioModel.create(pool, req.body, (err) => {
            if (err) {
                console.error(err);
                return res.status(500).send('Erro ao criar item no cardápio');
            }
            res.redirect('/cardapio');
        });
    },


    // Atualizar um item no cardápio
    updateCardapio: (req, res) => {
        cardapioModel.update(pool, req.body, (err) => {
            if (err) {
                console.error(err);
                return res.status(500).send('Erro ao atualizar item do cardápio');
            }
            res.redirect('/cardapio');
        });
    },

    // Remover um item do cardápio
    removeCardapio: (req, res) => {
        const { id } = req.params;
        cardapioModel.delete(pool, id, (err) => {
            if (err) {
                console.error(err);
                return res.status(500).send('Erro ao excluir item do cardápio');
            }
            res.redirect('/cardapio');
        });
    }
};
