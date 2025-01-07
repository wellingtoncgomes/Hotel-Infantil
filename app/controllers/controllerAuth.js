const { criarUsuario, authenticateUser ,buscarUsuarioPorEmail} = require('../models/modelAuthUser');
const pool = require('../../config/dbConnection');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

module.exports = {
  // Exibir a página de login
  mostrarLogin: (req, res) => {
    res.render('login'); // Renderiza o arquivo login.ejs
  },
    mostrarCadastro: (req, res) => {
      res.render('cadastroUsuario'); // Renderiza a página de cadastro
    },
  
    cadastrarUsuario: async (req, res) => {
      const { nome, email, senha } = req.body;
  
      try {
        // Verificar se o usuário já existe
        const userExists = await buscarUsuarioPorEmail(email);
        if (userExists) {
          return res.render('cadastroUsuario', { error: 'Email já cadastrado!' });
        }
  
        // Hash da senha
        const hashedPassword = await bcrypt.hash(senha, 10);
  
        // Criar o usuário no banco de dados
        await criarUsuario(nome, email, hashedPassword);
  
        res.redirect('/login'); // Redirecionar para a página de login após o cadastro
      } catch (error) {
        console.error('Erro ao cadastrar usuário:', error);
        res.status(500).render('cadastroUsuario', {
          error: 'Erro no servidor. Tente novamente mais tarde.',
        });
      }
    },
  // Autenticar usuário
  authenticateUser: async (req, res) => {
    const { email, senha } = req.body;

    try {
      const user = await authenticateUser(email);
      console.log(user);
      if (!user) {
        return res.status(401).render('login', { error: 'Usuário ou senha inválidos' });
      }

      // Verificar a senha com bcrypt
      const isMatch = await bcrypt.compare(senha, user.password);

      if (!isMatch) {
        return res.status(401).render('login', { error: 'Usuário ou senha inválidos' });
      }

      // Criar o token JWT
      const token = jwt.sign(
        { id: user.id_user, email: user.email },
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
      );

        // Salvar o token na sessão
        req.session.token = token;
        req.session.user = { id: user.id_user, email: user.email };

      //console.log('Sessão criada:', req.session);

        // Redirecionar para a página inicial
        res.redirect('/');
        } catch (error) {
        console.error('Erro no login:', error);
        res.status(500).render('login', { error: 'Erro no servidor. Tente novamente mais tarde.' });
        }
  },
};


