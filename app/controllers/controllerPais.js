const paisModel = require("../models/modelPais");
const pool = require("../../config/dbConnection");

module.exports = {
  // Lista todos os pais
  listPais: (req, res) => {
    paisModel.getAll(pool, (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).send("Erro ao buscar dados");
      }

      if (result.length === 0) {
        return res.status(404).send("Nenhum pai encontrado");
      }

      // Renderizando a visão pais-list.ejs com os dados de 'pais'
      res.render("pais-list.ejs", { pais: result });
    });
  },

  // Cria um novo pai
  createPais: (req, res) => {
    paisModel.create(pool, req.body, (err) => {
      if (err) {
        console.error("Erro ao adicionar pais:", err);
        return res.status(500).send({
          error: "Erro ao adicionar pais:",
          message: err.detail || "Erro desconhecido",
        });
      }
      res.redirect("/pais");
    });
  },

  // Atualiza os dados de um pai
  editPais: (req, res) => {
    paisModel.update(pool, req.body, (err) => {
      if (err) {
        console.error(err);
        return res.status(500).send("Erro ao atualizar pai");
      }
      res.redirect("/pais");
    });
  },

  // Remove um pai
  removePais: (req, res) => {
    const { id } = req.params;
    paisModel.delete(pool, id, (err) => {
      if (err) {
        console.error(err);
        return res.status(500).send("Erro ao excluir pai");
      }
      res.status(200).send("Pai excluído com sucesso");
    });
  },
};
