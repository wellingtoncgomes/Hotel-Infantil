module.exports.auth = (req, res, next) => {
  if (req.session.logado == true) {
    console.log("logado");
    next();
  } else {
    console.log("Usuario não autenticado");

    res.send("Usuario não autenticado");
    res.redirect("/");
  }
};
