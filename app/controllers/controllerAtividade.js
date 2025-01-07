const atividadesModel = require('../models/modelAtividades');
const pool = require('../../config/dbConnection'); // Certifique-se de que o arquivo 'dbConnection' exporte o pool corretamente


module.exports = {
    // Lista todas as atividades
    listAtividades: (req, res) => {
        atividadesModel.getAll(pool, (err, result) => {
            if (err) {
                console.error(err);
                return res.status(500).send('Erro ao buscar atividades');
            }
            if (result.length === 0) {
                return res.status(404).send('Nenhuma atividade encontrada');
            }
            res.render('atividades-list.ejs', { atividades: result }); // Use 'result.rows' para obter os dados
        });
    },

    // Cria uma nova atividade
    createAtividade: (req, res) => {
        atividadesModel.create(pool, req.body, (err) => {
            if (err) {
                console.error(err);
                return res.status(500).send('Erro ao criar atividade');
            }
            res.redirect('/atividades');
        });
    },


    // Atualiza uma atividade existente
    editAtividade: (req, res) => {
        atividadesModel.update(pool, req.body, (err) => {
            if (err) {
                console.error(err);
                return res.status(500).send('Erro ao atualizar atividade');
            }
            res.redirect('/atividades');
        });
    },


    // Remove uma atividade
    removeAtividade: (req, res) => {
        const { id_atividade } = req.params; // Usando 'id_atividade' como identificador
        atividadesModel.delete(pool, id_atividade, (err) => {
            if (err) {
                console.error(err);
                return res.status(500).send('Erro ao excluir atividade');
            }
            res.redirect('/atividades');
        });
    }
};



