
const dbConnection = require('../../config/dbConnection');

const modelfaleconosco = require('../models/modelfale-conosco');


const controllerfaleconosco = {
    // Exibe a página do formulário
    getPage: (req, res) => {
        res.render('fale-conosco'); // Renderiza a página do formulário
    },

    // Processa o envio da mensagem
    sendMessage: (req, res) => {
        const { nome, email, mensagem } = req.body; // Dados enviados pelo formulário
        const connection = dbConnection(); // Cria a conexão com o banco de dados

        // Chama o model para salvar a mensagem
        modelfaleconosco.saveMessage(connection, nome, email, mensagem, (err, result) => {
            connection.end(); // Fecha a conexão após a operação

            if (err) {
                console.error('Erro ao salvar mensagem:', err);
                return res.status(500).send('Erro ao enviar mensagem'); // Retorna erro ao cliente
            }

            console.log(`Mensagem de ${nome} salva com sucesso!`);
            
            // Renderiza a página de confirmação com o nome do usuário
            res.render('confirmacao', { nome });
        });
    }
};

module.exports = controllerfaleconosco;
