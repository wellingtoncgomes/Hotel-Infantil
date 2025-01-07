const criancasModel = require("../models/modelCriancas");
const pool = require("../../config/dbConnection");

module.exports = {
  // Lista todas as crianças
  listCriancas: (req, res) => {
    criancasModel.getAll(pool, (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).send("Erro ao buscar crianças");
      }
      if (result.length === 0) {
        return res.status(404).send("Nenhuma criança encontrada");
      }

      res.render("criancas-list.ejs", { criancas: result }); // Renderiza o template com os dados
    });
  },

  // Cria uma nova criança
  createCrianca: (req, res) => {
    criancasModel.create(pool, req.body, (err) => {
      if (err) {
        console.error(err);
        return res.status(500).send("Erro ao adicionar criança");
      }
      res.redirect("/criancas");
    });
  },

  // Atualiza os dados de uma criança
  editCrianca: (req, res) => {
    console.log("body :", req.body);
    criancasModel.update(pool, req.body, (err) => {
      if (err) {
        console.error(err);
        return res.status(500).send("Erro ao atualizar criança");
      }
      res.redirect("/criancas");
    });
  },

  // Remove uma criança
  removeCrianca: (req, res) => {
    const { id } = req.params;
    criancasModel.delete(pool, id, (err) => {
      if (err) {
        console.error(err);
        return res.status(500).send("Erro ao excluir criança");
      }
      res.redirect("/criancas");
    });
  },
};
