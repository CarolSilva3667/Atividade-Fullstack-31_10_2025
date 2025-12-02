DROP DATABASE IF EXISTS clinica;

CREATE DATABASE clinica;

USE clinica;

CREATE TABLE usuarios (
    id INT PRIMARY KEY AUTO_INCREMENT,
    login VARCHAR(50) NOT NULL UNIQUE,
    senha VARCHAR(100) NOT NULL,
    nome VARCHAR(50) NOT NULL,
    cargo VARCHAR(50)
);

CREATE TABLE pacientes (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(50) NOT NULL,
    telefone VARCHAR(20),
    endereco VARCHAR(300),
    data_nascimento DATE
);

CREATE TABLE consultas (
    id INT PRIMARY KEY AUTO_INCREMENT,
    usuario_id INT NOT NULL,
    paciente_id INT NOT NULL,
    data DATE NOT NULL,
    hora TIME NOT NULL,
    status VARCHAR(50) NOT NULL,
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id),
    FOREIGN KEY (paciente_id) REFERENCES pacientes(id),
    CONSTRAINT consulta_unica UNIQUE (usuario_id, paciente_id, data)
);