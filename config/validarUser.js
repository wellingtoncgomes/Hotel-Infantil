const Joi = require("joi");

module.exports.validarUsuario = (req, res, next) => {
  const schema = Joi.object({
    email: Joi.string().min(10).required(),
    password: Joi.string().min(8).max(20).required(),
  });
  const { error } = schema.validate(req.body);

  const usuario = req.body.email;
  const password = req.body.password;

  const novoUsuario = {
    usuario: usuario,
    password: password,
  };
  if (error)
    res.render("addUser.ejs", { errors: error.details, usuario: novoUsuario });
  next();
};
