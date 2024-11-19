-- Inserindo dados na tabela Pais
INSERT INTO Pais (nome, email, telefone, cpf)
VALUES
('João Silva', 'joao.silva@email.com', '(11) 99999-1111', '123.456.789-01'),
('Maria Oliveira', 'maria.oliveira@email.com', '(21) 98888-2222', '987.654.321-09');

-- Inserindo dados na tabela Criancas
INSERT INTO Criancas (nome, idade, alergias, id_pai)
VALUES
('Ana Silva', 7, 'Alergia a amendoim', 1),
('Pedro Oliveira', 5, NULL, 2),
('Clara Oliveira', 3, 'Intolerância à lactose', 2);

-- Inserindo dados na tabela Orientadores
INSERT INTO Orientadores (nome, especialidade)
VALUES
('Carlos Mendes', 'Jogos recreativos'),
('Beatriz Santos', 'Artes e Oficinas'),
('Fernanda Lima', 'Esportes ao ar livre');

-- Inserindo dados na tabela Atividades
INSERT INTO Atividades (nome, descricao, faixa_etaria)
VALUES
('Pintura', 'Atividade artística com tintas e pincéis', '3-7 anos'),
('Futebol', 'Partida de futebol recreativa', '5-10 anos'),
('Contação de histórias', 'Sessão interativa de histórias infantis', '3-7 anos');

-- Inserindo dados na tabela Reservas
INSERT INTO Reservas (id_crianca, id_pai, data_reserva, id_atividade, status_reserva)
VALUES 
    (1, 1, '2024-11-20', 1, 'Agendado'),   -- Exemplo de reserva
    (2, 2, '2024-11-21', 2, 'Finalizado'),  -- Outro exemplo de reserva
    (3, 3, '2024-11-22', 3, 'Agendado');    -- Mais um exemplo
	
-- Inserindo dados na tabela Pagamentos
INSERT INTO Pagamentos (id_reserva, valor, data_pagamento, metodo_pagamento, status_pagamento)
VALUES
(1, 500.00, '2024-11-10', 'Cartão de Crédito', 'Pago'),
(2, 600.00, NULL, 'Boleto', 'Pendente'),
(3, 550.00, '2024-11-15', 'Pix', 'Pago');

-- Inserindo dados na tabela Cardapio
INSERT INTO Cardapio (nome, descricao, tipo, dia_semana)
VALUES
('Pão de queijo', 'Porção com 5 unidades', 'Café', 'Segunda'),
('Suco de Laranja', 'Copo de 300ml', 'Café', 'Terça'),
('Arroz, feijão e frango grelhado', 'Prato saudável', 'Almoço', 'Quarta'),
('Sanduíche Natural', 'Sanduíche de pão integral com queijo e presunto', 'Lanche', 'Quinta'),
('Bolo de Cenoura', 'Porção com cobertura de chocolate', 'Lanche', 'Sexta'),
('Salada de frutas', 'Porção variada com frutas frescas', 'Lanche', 'Sábado');
