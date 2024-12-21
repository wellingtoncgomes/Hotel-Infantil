const {home,addComment}= require('../controllers/controllerHome');
const {listPais,createPais,editPais,removePais} = require('../controllers/controllerPais')
const {listCriancas,createCrianca,editCrianca,removeCrianca} = require('../controllers/controllerCriancas')
const {listOrientadores,createOrientador,editOrientador,removeOrientador} = require('../controllers/controllerOrientadores')
const { listAtividades, createAtividade, editAtividade, removeAtividade } = require('../controllers/controllerAtividade');
const { listReservas, createReserva, editReserva, removeReserva } = require('../controllers/controllerReserva');
const { listPagamentos, createPagamento, updatePagamento, removePagamento } = require('../controllers/controllerPagamentos');
const { listCardapio, createCardapio, updateCardapio, removeCardapio } = require('../controllers/controllerCardapio');


module.exports = (app) => {
  // Rota para a página inicial
  app.get('/', home);

  // Rotas relacionadas a 'Pais'
  app.get('/pais', listPais);
  app.post('/pais', createPais);
  app.post('/pais/edit/:id', editPais);
  app.get('/pais/delete/:id', removePais);
  
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

   // Rotas relacionadas a 'Reservas'
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