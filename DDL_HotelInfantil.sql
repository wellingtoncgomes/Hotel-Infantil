DROP DATABASE IF EXISTS hotelInfantil;
create database hotelInfantil;
use hotelInfantil;

-- Tabela Pais
CREATE TABLE Pais (
    id_pai INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    telefone VARCHAR(15),
    cpf VARCHAR(14) UNIQUE
);

-- Tabela Crianças
CREATE TABLE Criancas (
    id_crianca INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    idade INT NOT NULL,
    alergias TEXT,
    id_pai INT,
    FOREIGN KEY (id_pai) REFERENCES Pais(id_pai) ON DELETE CASCADE
);

-- Tabela Orientadores
CREATE TABLE Orientadores (
    id_orientador INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    especialidade VARCHAR(100)
);

-- Tabela Atividades
CREATE TABLE Atividades (
    id_atividade INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    descricao TEXT,
    faixa_etaria VARCHAR(50)
);

-- Tabela Reservas
CREATE TABLE Reservas (
    id_reserva INT AUTO_INCREMENT PRIMARY KEY,
    id_crianca INT NOT NULL,
    id_pai INT NOT NULL,
    data_reserva DATE NOT NULL,
    id_atividade INT,
    status_reserva ENUM('Agendado', 'Finalizado')  DEFAULT 'Agendado',
    FOREIGN KEY (id_crianca) REFERENCES Criancas(id_crianca) ON DELETE CASCADE,
    FOREIGN KEY (id_pai) REFERENCES pais(id_pai) ON DELETE CASCADE,
    FOREIGN KEY (id_atividade) REFERENCES Atividades(id_atividade) ON DELETE SET NULL
);

-- Tabela Pagamentos
CREATE TABLE Pagamentos (
    id_pagamento INT AUTO_INCREMENT PRIMARY KEY,
    id_reserva INT NOT NULL,
    valor DECIMAL(10, 2) NOT NULL,
    data_pagamento DATE,
    metodo_pagamento VARCHAR(50),
    status_pagamento ENUM('Pago', 'Pendente') DEFAULT 'Pendente',
    FOREIGN KEY (id_reserva) REFERENCES Reservas(id_reserva) ON DELETE CASCADE
);

-- Tabela Cardapio
CREATE TABLE Cardapio (
    id_item INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    descricao TEXT,
    tipo ENUM('Café', 'Almoço', 'Lanche') NOT NULL,
    dia_semana ENUM('Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado', 'Domingo') NOT NULL
);
