create database bdnode;
use bdnode;
CREATE DATABASE IF NOT EXISTS elenco CHARACTER SET utf8mb4;
USE elenco;

CREATE TABLE IF NOT EXISTS jogadores (
  id            INT AUTO_INCREMENT PRIMARY KEY,
  foto          VARCHAR(255) NULL,
  nome          VARCHAR(100) NOT NULL,
  posicao       VARCHAR(30)  NOT NULL,
  preco         DECIMAL(12,2) NOT NULL DEFAULT 0,
  nacionalidade VARCHAR(60)  NULL,
  clube         VARCHAR(80)  NULL
);

INSERT INTO jogadores (foto, nome, posicao, preco, nacionalidade, clube) VALUES
(NULL, 'Alisson Becker',   'Goleiro',   30000000, 'Brasil',    'Liverpool'),
(NULL, 'Danilo',           'Lateral',   12000000, 'Brasil',    'Flamengo'),
(NULL, 'Marquinhos',       'Zagueiro',  40000000, 'Brasil',    'PSG'),
(NULL, 'Rúben Dias',       'Zagueiro',  75000000, 'Portugal',  'Manchester City'),
(NULL, 'Alphonso Davies',  'Lateral',   55000000, 'Canadá',    'Bayern de Munique'),
(NULL, 'Casemiro',         'Volante',   20000000, 'Brasil',    'Manchester United'),
(NULL, 'Luka Modrić',      'Meia',      10000000, 'Croácia',   'Real Madrid'),
(NULL, 'Kevin De Bruyne',  'Meia',      60000000, 'Bélgica',   'Manchester City'),
(NULL, 'Vinícius Júnior',  'Atacante', 150000000, 'Brasil',    'Real Madrid'),
(NULL, 'Erling Haaland',   'Atacante', 180000000, 'Noruega',   'Manchester City'),
(NULL, 'Mohamed Salah',    'Atacante',  65000000, 'Egito',     'Liverpool');