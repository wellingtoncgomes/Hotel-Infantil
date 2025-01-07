const { home, addComment } = require("../controllers/controllerHome");
const {
  listPais,
  createPais,
  editPais,
  removePais,
} = require("../controllers/controllerPais");
const {
  listCriancas,
  createCrianca,
  editCrianca,
  removeCrianca,
} = require("../controllers/controllerCriancas");
const {
  listOrientadores,
  createOrientador,
  editOrientador,
  removeOrientador,
} = require("../controllers/controllerOrientadores");
const {
  listAtividades,
  createAtividade,
  editAtividade,
  removeAtividade,
} = require("../controllers/controllerAtividade");
const {
  listReservas,
  createReserva,
  editReserva,
  removeReserva,
} = require("../controllers/controllerReserva");
const {
  listPagamentos,
  createPagamento,
  updatePagamento,
  removePagamento,
} = require("../controllers/controllerPagamentos");
const {
  listCardapio,
  createCardapio,
  updateCardapio,
  removeCardapio,
} = require("../controllers/controllerCardapio");
const {
  faleConosco,
  sendMessage,
} = require("../controllers/controllerfale-conosco");
const { validarUsuario } = require("../../config/validarUser");
const {
  authenticateUser,
  cadastrarUsuario,
  mostrarCadastro,
  mostrarLogin,
} = require("../controllers/controllerAuth");
//const { criarUsuario } = require('../models/modelAuthUser');
const authMiddleware = require("../../config/authMiddleware");
const { criarUsuario } = require("../models/modelAuthUser");

module.exports = (app) => {
  // Rota para a página inicial
  app.get("/", home);

  // Rota para verificar a sessão
  app.get("/test-session", (req, res) => {
    if (req.session.user) {
      res.send(`Sessão ativa para o usuário: ${req.session.user.email}`);
    } else {
      res.send("Nenhuma sessão ativa.");
    }
  });

  // Rota para login (sem autenticação)
  app.get("/login", mostrarLogin);
  app.get("/cadastro", authMiddleware, mostrarCadastro);
  app.post("/logar", authenticateUser);
  app.post("/usuarios", authMiddleware, cadastrarUsuario);

  // Rotas relacionadas a 'Pais' (com autenticação)
  app.get("/pais", authMiddleware, listPais);
  app.post("/pais/edit", authMiddleware, editPais);
  app.get("/pais/delete/:id", authMiddleware, removePais);
  app.get("/pais/cadastrar", authMiddleware, (req, res) => {
    res.render("cadastro-pais");
  });
  app.post("/pais/cadastrar", authMiddleware, createPais);

  // Rota de Fale Conosco (com autenticação)
  app.get("/fale-conosco", faleConosco);
  app.post("/fale-conosco/enviar", sendMessage);

  // Rotas relacionadas a 'Criancas' (com autenticação)
  app.get("/criancas", authMiddleware, listCriancas);
  app.post("/criancas", authMiddleware, createCrianca);
  app.post("/criancas/edit", authMiddleware, editCrianca);
  app.get("/criancas/delete/:id", authMiddleware, removeCrianca);

  // Rotas relacionadas aos 'Orientadores' (com autenticação)
  app.get("/orientadores", authMiddleware, listOrientadores);
  app.post("/orientadores", authMiddleware, createOrientador);
  app.post("/orientadores/edit", authMiddleware, editOrientador);
  app.get("/orientadores/delete/:id", authMiddleware, removeOrientador);

  // Rotas relacionadas as 'Atividades' (com autenticação)
  app.get("/atividades", authMiddleware, listAtividades);
  app.post("/atividades", authMiddleware, createAtividade);
  app.post("/atividades/edit", authMiddleware, editAtividade);
  app.get("/atividades/delete/:id", authMiddleware, removeAtividade);

  // Rotas relacionadas a 'Reservas' (com autenticação)
  app.get("/reservas", authMiddleware, listReservas);
  app.post("/reservas", authMiddleware, createReserva);
  app.get("/reservas/finalizar/:id", authMiddleware, editReserva);
  app.get("/reservas/delete/:id", authMiddleware, removeReserva);

  // Rotas relacionadas a 'Pagamentos' (com autenticação)
  app.get("/pagamentos", authMiddleware, listPagamentos);
  app.post("/pagamentos", authMiddleware, createPagamento);
  app.post("/pagamentos/edit/:id", authMiddleware, updatePagamento);
  app.get("/pagamentos/delete/:id", authMiddleware, removePagamento);

  // Rotas relacionadas a 'Cardápio' (com autenticação)
  app.get("/cardapio", authMiddleware, listCardapio);
  app.post("/cardapio", authMiddleware, createCardapio);
  app.post("/cardapio/edit", authMiddleware, updateCardapio);
  app.get("/cardapio/delete/:id", authMiddleware, removeCardapio);
};
