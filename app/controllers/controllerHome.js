const pool = require("../../config/dbConnection");
const modelHome = require("../models/modelHome");

module.exports = {
  home: (req, res) => {
    // Buscar informações de orientadores, cardápios e atividades
    modelHome.getOrientadores(pool, (err, orientadores) => {
      if (err) {
        console.error(err);
        return res.status(500).send("Erro ao buscar orientadores");
      }

      modelHome.getCardapios(pool, (err, cardapios) => {
        if (err) {
          console.error(err);
          return res.status(500).send("Erro ao buscar cardápios");
        }

        modelHome.getAtividades(pool, (err, atividades) => {
          if (err) {
            console.error(err);
            return res.status(500).send("Erro ao buscar atividades");
          }

          // Renderizar a página com os dados
          res.render("home", {
            orientadores: orientadores,
            cardapios: cardapios,
            atividades: atividades,
          });
        });
      });
    });
  },
};
