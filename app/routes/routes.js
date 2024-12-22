const {home,addComment}= require('../controllers/controllerHome');
const {listPais, createPais, editPais, removePais} = require('../controllers/controllerPais');
const {listCriancas,createCrianca,editCrianca,removeCrianca} = require('../controllers/controllerCriancas');
const {listOrientadores,createOrientador,editOrientador,removeOrientador} = require('../controllers/controllerOrientadores');
const { listAtividades, createAtividade, editAtividade, removeAtividade } = require('../controllers/controllerAtividade');
const { listReservas, createReserva, editReserva, removeReserva } = require('../controllers/controllerReserva');
const { listPagamentos, createPagamento, updatePagamento, removePagamento } = require('../controllers/controllerPagamentos');
const { listCardapio, createCardapio, updateCardapio, removeCardapio } = require('../controllers/controllerCardapio');
const controllerfaleconosco = require('../controllers/controllerfale-conosco');





module.exports = (app) => {
  // Rota para a página inicial
  app.get('/', home);

  // Rotas relacionadas a 'Pais'
  app.get('/pais', listPais);
  app.post('/pais', createPais);

  app.put('/pais/edit/:id', editPais);
  app.delete('/pais/delete/:id', removePais);


  
  
  app.get('/fale-conosco', controllerfaleconosco.getPage);

  // Rota para processar o envio da mensagem de 'Fale Conosco'
  app.post('/fale-conosco/enviar', controllerfaleconosco.sendMessage);


  // Rota para exibir a página de cadastro de pais
  app.get('/pais/cadastrar', (req, res) => {
  res.render('cadastro-pais');  // Vamos criar a view "cadastro-pais.ejs"
});

// Rota para cadastrar o pai no banco de dados
app.post('/pais/cadastrar', createPais);





   // Rotas relacionadas a 'Criancas'
   app.get('/criancas', listCriancas);
   app.post('/criancas', createCrianca);
   app.post('/criancas/edit/:id', editCrianca);
   app.get('/criancas/delete/:id', removeCrianca);

  // Rotas relacionadas aos 'Orientadores'
   app.get('/orientadores', listOrientadores);
   app.post('/orientadores', createOrientador);
   app.post('/orientadores/edit/:id', editOrientador);
   app.get('/orientadores/delete/:id', removeOrientador);

   // Rotas relacionadas as 'Atividades'
   app.get('/atividades', listAtividades);
   app.post('/atividades', createAtividade);
   app.post('/atividades/edit/:id', editAtividade);
   app.get('/atividades/delete/:id', removeAtividade);
   

<<<<<<< HEAD
   // Rotas relacionadas a 'Reservas'
=======
   
>>>>>>> 9ef67a6de8a8a3ba15c5c8e2acf1209f6f2127a3
   app.get('/reservas', listReservas);
   app.post('/reservas', createReserva);
   app.post('/reservas/edit/:id', editReserva);
   app.get('/reservas/delete/:id', removeReserva);

   // Rotas relacionadas a 'PAgamentos'
   app.get('/pagamentos', listPagamentos);
   app.post('/pagamentos', createPagamento);
   app.post('/pagamentos/edit/:id', updatePagamento);
   app.get('/pagamentos/delete/:id', removePagamento);

   // Rotas relacionadas a 'Cardapio' 
   app.get('/cardapio', listCardapio);
   app.post('/cardapio', createCardapio);
   app.post('/cardapio/edit/:id', updateCardapio); 
   app.get('/cardapio/delete/:id', removeCardapio);

  };