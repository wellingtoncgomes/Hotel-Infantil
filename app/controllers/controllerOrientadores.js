const orientadoresModel = require("../models/modelOrientadores");
const pool = require("../../config/dbConnection"); // Certifique-se de que o arquivo exporte o pool corretamente

module.exports = {
  // Lista todos os orientadores
  listOrientadores: (req, res) => {
    orientadoresModel.getAll(pool, (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).send("Erro ao buscar orientadores");
      }
      if (result.rows.length === 0) {
        return res.status(404).send("Nenhum orientador encontrado");
      }
      res.render("orientadores-list.ejs", { orientadores: result.rows }); // Renderiza a página com os dados
    });
  },

  // Cria um novo orientador
  createOrientador: (req, res) => {
    orientadoresModel.create(pool, req.body, (err) => {
      if (err) {
        console.error(err);
        return res.status(500).send("Erro ao criar orientador");
      }
      res.redirect("/orientadores");
    });
  },

  // Atualiza um orientador existente
  editOrientador: (req, res) => {
    console.log(req.body);
    orientadoresModel.update(pool, req.body, (err) => {
      if (err) {
        console.error(err);
        return res.status(500).send("Erro ao atualizar orientador");
      }
      res.redirect("/orientadores");
    });
  },

  // Remove um orientador
  removeOrientador: (req, res) => {
    const { id_orientador } = req.params; // Certifique-se de usar o mesmo nome da variável
    orientadoresModel.delete(pool, id_orientador, (err) => {
      if (err) {
        console.error(err);
        return res.status(500).send("Erro ao excluir orientador");
      }
      res.redirect("/orientadores");
    });
  },
};
