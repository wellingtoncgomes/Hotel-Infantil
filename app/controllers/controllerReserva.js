const criancasModel = require("../models/modelCriancas");
const paisModel = require("../models/modelPais");
const atividadeModel = require("../models/modelAtividades");
const reservasModel = require("../models/modelReservas");

const pool = require("../../config/dbConnection");

module.exports = {
  listReservas: (req, res) => {
    // Busca as reservas
    reservasModel.getAll(pool, (err, reservas) => {
      if (err) {
        console.error("Erro ao buscar reservas:", err);
        return res.status(500).send("Erro ao buscar reservas");
      }

      // Busca as crianças
      criancasModel.getAll(pool, (err, criancas) => {
        if (err) {
          console.error("Erro ao buscar crianças:", err);
          return res.status(500).send("Erro ao buscar crianças");
        }

        // Busca os pais
        paisModel.getAll(pool, (err, pais) => {
          if (err) {
            console.error("Erro ao buscar pais:", err);
            return res.status(500).send("Erro ao buscar pais");
          }

          // Busca as atividades
          atividadeModel.getAll(pool, (err, atividades) => {
            if (err) {
              console.error("Erro ao buscar atividades:", err);
              return res.status(500).send("Erro ao buscar atividades");
            }

            const reservasFormatadas = reservas.map((reserva) => ({
              ...reserva,
              data_reserva: formatDate(reserva.data_reserva),
            }));

            // Renderiza a view com os dados das reservas, crianças, pais e atividades
            res.render("reservas-list.ejs", {
              reservas: reservasFormatadas,
              criancas: criancas,
              pais: pais,
              atividades: atividades,
            });
          });
        });
      });
    });
  },

  createReserva: async (req, res) => {
    const { id_crianca, id_pai, id_atividade, data_reserva } = req.body;

    // Inicialize a variável de erro
    let error = null;

    // Verificar se todos os campos estão preenchidos
    if (!id_crianca || !id_pai || !id_atividade || !data_reserva) {
      error = "Todos os campos são obrigatórios.";
    }

    try {
      // Verificar se a criança pertence ao pai indicado
      if (!error) {
        const relacaoValida = await reservasModel.verificarRelacaoPaiFilho(
          pool,
          id_crianca,
          id_pai
        );
        if (!relacaoValida) {
          error = "A criança selecionada não pertence ao pai indicado.";
        }
      }

      // Verificar se o pai possui pagamentos pendentes
      if (!error) {
        await new Promise((resolve, reject) => {
          reservasModel.verificarPagamentoPendente(
            pool,
            id_pai,
            (err, temPagamentoPendente) => {
              if (err) return reject(err);
              if (temPagamentoPendente) {
                error =
                  "O pai possui pagamentos pendentes. Não é possível realizar a reserva.";
              }
              resolve();
            }
          );
        });
      }

      // Criar a reserva se não houver erro
      if (!error) {
        await reservasModel.create(pool, {
          id_crianca,
          id_pai,
          id_atividade,
          data_reserva,
        });
        return res.redirect("/reservas"); // Redirecionar em caso de sucesso
      }
    } catch (err) {
      console.error("[Erro em createReserva]", err);
      error = "Erro ao cadastrar reserva.";
    }

    // Caso haja erro, busque todos os dados necessários para a renderização
    reservasModel.getAll(pool, (err, reservas) => {
      if (err) {
        console.error("Erro ao buscar reservas:", err);
        return res.status(500).send("Erro ao buscar reservas");
      }

      criancasModel.getAll(pool, (err, criancas) => {
        if (err) {
          console.error("Erro ao buscar crianças:", err);
          return res.status(500).send("Erro ao buscar crianças");
        }

        paisModel.getAll(pool, (err, pais) => {
          if (err) {
            console.error("Erro ao buscar pais:", err);
            return res.status(500).send("Erro ao buscar pais");
          }

          atividadeModel.getAll(pool, (err, atividades) => {
            if (err) {
              console.error("Erro ao buscar atividades:", err);
              return res.status(500).send("Erro ao buscar atividades");
            }

            // Renderizar a página com os dados e o erro
            res.render("reservas-list.ejs", {
              reservas: reservas,
              criancas: criancas,
              pais: pais,
              atividades: atividades,
              error: error, // Adiciona o erro à renderização
            });
          });
        });
      });
    });
  },

  editReserva: (req, res) => {
    const { id } = req.params; // Obtém o id da reserva da URL

    // Dados a serem atualizados, incluindo o status 'finalizado'
    const data = {
      status_reserva: "Finalizado", // Status fixo para 'finalizado'
    };

    // Chama o modelo para atualizar a reserva
    reservasModel.update(pool, id, data, (err) => {
      if (err) {
        console.error("[Erro ao atualizar reserva]", err);
        return res.status(500).send("Erro ao atualizar reserva");
      }
      res.redirect("/reservas"); // Redireciona após a atualização
    });
  },

  removeReserva: (req, res) => {
    const { id } = req.params; // Obtém o id da reserva da URL

    // Verifica se a reserva tem pagamento atrelado
    reservasModel.checkPagamento(pool, id, (err, hasPagamento) => {
      if (err) {
        console.error("[Erro ao verificar pagamento]", err);
        return res.status(500).send("Erro ao verificar pagamento");
      }

      if (hasPagamento) {
        // Se houver pagamento, não permite a exclusão
        return res
          .status(400)
          .send(
            "Não é possível excluir a reserva, pois há pagamento atrelado."
          );
      }

      // Se não houver pagamento, prossegue com a exclusão
      reservasModel.delete(pool, id, (err) => {
        if (err) {
          console.error("[Erro ao excluir reserva]", err);
          return res.status(500).send("Erro ao excluir reserva");
        }
        res.redirect("/reservas"); // Redireciona após exclusão bem-sucedida
      });
    });
  },

  renderFormReserva: async (req, res) => {
    try {
      const criancas = await criancasModel.getAll(pool);
      const pais = await paisModel.getAll(pool);
      const atividades = await atividadeModel.getAll(pool);
      res.render("form-reserva.ejs", { criancas, pais, atividades });
    } catch (err) {
      console.error("[Erro em renderFormReserva]", err);
      res.status(500).send("Erro ao carregar dados");
    }
  },
};

function formatDate(dateStr) {
  const date = new Date(dateStr);
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
}
