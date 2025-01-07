const pool = require('../../config/dbConnection'); 
const modelfaleconosco = require('../models/modelfale-conosco');

module.exports = {
    faleConosco: (req, res) => {
      res.render('fale-conosco.ejs');
    },
    sendMessage: (req, res) => {
        const { nome, email, mensagem } = req.body; // Dados enviados pelo formulário
  

        // Chama o model para salvar a mensagem
        modelfaleconosco.saveMessage(pool, nome, email, mensagem, (err, result) => {
            
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
    
