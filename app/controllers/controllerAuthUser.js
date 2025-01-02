const { criarUsuario, authenticateUser } = require('../models/modelAuthUser');
const dbConnection = require('../../config/dbConnection');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');

const salt = process.env.SALT;

module.exports.adicionarUsuario = async (app, req, res) => {
    console.log('[Controller criarUsuario]');

    const dbConn = dbConnection();

    let { email, password } = req.body;

    bcrypt.genSalt(10, function (err, salt) {
        bcrypt.hash(password, salt, function (err, hash) {
            console.log(hash);

    let encryptedPass = hash;

    console.log("senha: ", encryptedPass);

    criarUsuario(dbConn, email, encryptedPass, (error, result) => {
        console.log('banco');
        if (error) {
            console.log('[error]:', error);
        }

        res.redirect('/validar.usuario');
            });

        });
    });
};

module.exports.authenticateUser = (app, req, res) => {
    console.log('[Controller authenticateUser]');

    let user = req.body;

    const dbConn = dbConnection();

    authenticateUser(dbConn, user, (error, result) => {
        if (erro) {
            console.log(error);
        }

        //validar se email ja existe antes de entrar com a senha e validar ela

        else if (result.length > 0) {
            console.log("password: ", result[0].password)
            bcrypt.compare(user.password, result[0].password, function (err, resultBycript) {
                if (err) {
                    console.log('Houve uma falha na autenticação bycript');
                    res.send('Falha na autenticação');
                }
                if (resultBycript) {
                    console.log('usuario autenticado');

                    user = result[0];

                    req.session.logado = true;
                    req.session.user = {
                        id: user.id_user,
                        email: user.email
                    }

                    console.log('User controller req.session: ', req.session.user);
                    res.redirect('/');
                }

            });
        }
        else {
            console.log('Houve uma falha na autenticação');
            res.send('Falha na autenticação');
        }
    });
};