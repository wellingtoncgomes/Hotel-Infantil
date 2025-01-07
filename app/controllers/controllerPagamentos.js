const pagamentosModel = require("../models/modelPagamento");
const pool = require("../../config/dbConnection"); // Certifique-se de que o arquivo exporte o pool corretamente

module.exports = {
  // Listar todos os pagamentos
  listPagamentos: (req, res) => {
    pagamentosModel.getAll(pool, (err, result) => {
      if (err) {
        console.error("Erro ao buscar pagamentos:", err);
        return res
          .status(500)
          .send(
            "Erro ao buscar pagamentos. Por favor, tente novamente mais tarde."
          );
      }
      const pagamentos = result.rows;
      const pagamentosFormatados = pagamentos.map((pagamento) => ({
        ...pagamento,
        data_pagamento: formatDate(pagamento.data_pagamento),
      }));

      res.render("pagamentos-list", { pagamentos: pagamentosFormatados });
    });
  },

  // Criar um novo pagamento
  createPagamento: (req, res) => {
    const { id_reserva, valor, data_pagamento, metodo_pagamento } = req.body;

    // Validação básica
    if (!id_reserva || !valor || !data_pagamento || !metodo_pagamento) {
      return res.status(400).send("Todos os campos são obrigatórios.");
    }

    const pagamentoData = {
      id_reserva,
      valor: parseFloat(valor),
      data_pagamento,
      metodo_pagamento,
    };

    pagamentosModel.create(pool, pagamentoData, (err) => {
      if (err) {
        console.error("Erro ao registrar pagamento:", err);
        return res
          .status(500)
          .send("Erro ao registrar pagamento. Por favor, tente novamente.");
      }
      res.redirect("/pagamentos");
    });
  },

  // Atualizar o status do pagamento
  updatePagamento: (req, res) => {
    const { id_pagamento } = req.params; // Certifique-se de usar o mesmo nome da variável
    const { status_pagamento } = req.body;

    // Validação básica
    if (!status_pagamento) {
      return res.status(400).send("O campo status_pagamento é obrigatório.");
    }

    pagamentosModel.updateStatus(
      pool,
      id_pagamento,
      status_pagamento,
      (err) => {
        if (err) {
          console.error("Erro ao atualizar pagamento:", err);
          return res
            .status(500)
            .send("Erro ao atualizar pagamento. Por favor, tente novamente.");
        }
        res.redirect("/pagamentos");
      }
    );
  },

  // Remover um pagamento
  removePagamento: (req, res) => {
    const { id_pagamento } = req.params; // Certifique-se de usar o mesmo nome da variável

    pagamentosModel.delete(pool, id_pagamento, (err) => {
      if (err) {
        console.error("Erro ao excluir pagamento:", err);
        return res
          .status(500)
          .send("Erro ao excluir pagamento. Por favor, tente novamente.");
      }
      res.redirect("/pagamentos");
    });
  },
};

function formatDate(dateStr) {
  const date = new Date(dateStr);
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
}
