-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Tempo de geração: 25/10/2024 às 20:42
-- Versão do servidor: 10.4.32-MariaDB
-- Versão do PHP: 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Banco de dados: `moviemaster`
--

-- --------------------------------------------------------

--
-- Estrutura para tabela `amigos`
--

CREATE TABLE `amigos` (
  `id` int(11) NOT NULL,
  `credenciais_id` int(11) NOT NULL,
  `amigos` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL CHECK (json_valid(`amigos`))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `amigos`
--

INSERT INTO `amigos` (`id`, `credenciais_id`, `amigos`) VALUES
(3, 52, '[28]'),
(4, 81, '[79, 79]'),
(5, 82, '[79, 81, 80]'),
(6, 79, '[83, 82, 84, 84, 92, 81, 94, 95, 86, 96]'),
(7, 84, '[81]'),
(9, 87, '[79]'),
(10, 83, '[79]'),
(11, 88, '[81]'),
(12, 94, '[86, 79]'),
(13, 95, '[79]'),
(15, 86, '[95]');

-- --------------------------------------------------------

--
-- Estrutura para tabela `credenciais`
--

CREATE TABLE `credenciais` (
  `id` int(11) NOT NULL,
  `nome` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `senha` varchar(255) NOT NULL,
  `foto` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `credenciais`
--

INSERT INTO `credenciais` (`id`, `nome`, `email`, `senha`, `foto`) VALUES
(79, 'Brito', 'brito@gmail.com', '289160db0d9f39f9ae1754c4ec9c16f90b50e32e09c5fb5481ae642b3d3d1a36', 'uploads/Brito_foto.jpg'),
(80, 'ovo', 'dsaasdsdadas', 'ef797c8118f02dfb649607dd5d3f8c7623048c9c063d532cc95c5ed7a898a64f', 'uploads/ovo_foto.jpg'),
(81, 'Veiga', 'guipe@mail.com', 'ef797c8118f02dfb649607dd5d3f8c7623048c9c063d532cc95c5ed7a898a64f', 'uploads/Veiga_foto.jpg'),
(82, 'Pedroh', 'pedro@', 'ef797c8118f02dfb649607dd5d3f8c7623048c9c063d532cc95c5ed7a898a64f', 'uploads/Pedroh_foto.jpg'),
(83, 'Davi', 'Davi', '289160db0d9f39f9ae1754c4ec9c16f90b50e32e09c5fb5481ae642b3d3d1a36', 'uploads/Davi_foto.jpg'),
(84, 'Joao Pedro Araujo Teixeira', 'joao.teixeira25@gmail.com', 'ef797c8118f02dfb649607dd5d3f8c7623048c9c063d532cc95c5ed7a898a64f', 'uploads/Joao Pedro Araujo Teixeira_foto.jpg'),
(85, 'JãoVitin', 'Jão Vitor', 'ef797c8118f02dfb649607dd5d3f8c7623048c9c063d532cc95c5ed7a898a64f', 'uploads/JãoVitin_foto.jpg'),
(86, 'Maykon', 'Maykon', '289160db0d9f39f9ae1754c4ec9c16f90b50e32e09c5fb5481ae642b3d3d1a36', 'uploads/Maykon_foto.jpg'),
(87, 'JaoVitin', 'JaoVitin', '7d77e3acd1942735ef029aecb05cffbb7295f10be3c11be9d508d75369f29742', 'uploads/JaoVitin_foto.jpg'),
(88, 'Isabella', 'isabellatexeira7@gmail.com', 'ef797c8118f02dfb649607dd5d3f8c7623048c9c063d532cc95c5ed7a898a64f', 'uploads/Isabella_foto.jpg'),
(89, 'dawdqwuodqh2i', '3nfhegvdfiuwehow', '5a90c54ad827ca32d1037cf1b55e152f7e67f211ffa74c81508734ad67974038', 'uploads/dawdqwuodqh2i_foto.jpg'),
(90, 'Motorola', 'Motorola', '1342876683994a451a37a7ec299876b51a7a3dec386bef15b9c8320d9e7ee7d7', 'uploads/Motorola_foto.jpg'),
(91, '`; DROP TABLE credenciais; select ´a', 'caio@yahool', 'ef797c8118f02dfb649607dd5d3f8c7623048c9c063d532cc95c5ed7a898a64f', 'uploads/`; DROP TABLE credenciais; select ´a_foto.jpg'),
(92, 'DROP DATABASE', 'DROP DATABASE', 'b0681a99914d1b939afad4e467cf3066dbf2702894e84f666f01bfb336eb542e', 'uploads/DROP DATABASE_foto.jpg'),
(93, 'DROP TABLE credenciais', 'DROP TABLE credenciais', 'ef797c8118f02dfb649607dd5d3f8c7623048c9c063d532cc95c5ed7a898a64f', 'uploads/DROP TABLE credenciais_foto.jpg'),
(94, 'Sócrates', 'Platao', '9742a53274b218df30f1c9cd07ce376275b457e915bdb8a909f76fd508f6d055', 'uploads/Sócrates_foto.jpg'),
(95, 'JesusCristo', 'nicoas', '637696f53867ab71ea6bb722e7b60e621357dfb3018b9e0b45ddfa7d731436c5', 'uploads/JesusCristo_foto.jpg'),
(96, 'teste', 'teste', '2f2442394496f88ca50db70f53f6bc7a3b0f402a4f9680e30358128e215bf37b', 'uploads/1f2334rfgflamengobrasil2024senaiservicosocial.jpg');

-- --------------------------------------------------------

--
-- Estrutura para tabela `curtidas`
--

CREATE TABLE `curtidas` (
  `id` int(11) NOT NULL,
  `credenciais_id` int(11) NOT NULL,
  `postagens_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `curtidas`
--

INSERT INTO `curtidas` (`id`, `credenciais_id`, `postagens_id`) VALUES
(667, 79, 75),
(698, 79, 75),
(699, 79, 43),
(700, 79, 75),
(716, 79, 75),
(717, 79, 75),
(734, 79, 76),
(736, 79, 58),
(737, 95, 77),
(738, 79, 79),
(739, 79, 78);

-- --------------------------------------------------------

--
-- Estrutura para tabela `descurtidas`
--

CREATE TABLE `descurtidas` (
  `id` int(11) NOT NULL,
  `usuario_id` int(11) DEFAULT NULL,
  `post_id` int(11) DEFAULT NULL,
  `data_curtida` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estrutura para tabela `favoritos`
--

CREATE TABLE `favoritos` (
  `id` int(11) NOT NULL,
  `idFilme` int(11) NOT NULL,
  `titulo` varchar(255) NOT NULL,
  `capa` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estrutura para tabela `filmes`
--

CREATE TABLE `filmes` (
  `id` int(11) NOT NULL,
  `titulo` varchar(255) NOT NULL,
  `descricao` text DEFAULT NULL,
  `ano_lancamento` year(4) DEFAULT NULL,
  `genero` varchar(100) DEFAULT NULL,
  `data_adicao` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estrutura para tabela `listas`
--

CREATE TABLE `listas` (
  `id` int(11) NOT NULL,
  `lista` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL CHECK (json_valid(`lista`)),
  `credenciais_id` int(11) NOT NULL,
  `nome_lista` varchar(255) NOT NULL,
  `descricao` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `listas`
--

INSERT INTO `listas` (`id`, `lista`, `credenciais_id`, `nome_lista`, `descricao`) VALUES
(13, '[{\"id\":616037,\"titulo\":\"Thor: Amor e Trovão\",\"capaURL\":\"/nsxLBSlQDumCjOEDvfXyTcF2ND9.jpg\"},{\"id\":519182,\"titulo\":\"Meu Malvado Favorito 4\",\"capaURL\":\"/84cX5hBdCE6c90GZNEhSTiYYwIl.jpg\"},{\"id\":1087822,\"titulo\":\"Hellboy e o Homem Torto\",\"capaURL\":\"/rfzLtrGeH25k8t3WO8ceQzHi06J.jpg\"},{\"id\":889737,\"titulo\":\"Coringa: Delírio a Dois\",\"capaURL\":\"/miLzGpMR4SyeaScG32kc2oPtmu8.jpg\"},{\"id\":1184918,\"titulo\":\"Robô Selvagem\",\"capaURL\":\"/pG9Vfb3r0Nwd0QO7g01CNaOowXX.jpg\"},{\"id\":1361184,\"titulo\":\"Dragon Ball DAIMA\",\"capaURL\":\"/cVxwxuKI6yXsB8zuGj6cDiL8GtU.jpg\"}]', 79, 'Filmes ruins', ''),
(14, '[{\"id\":157336,\"titulo\":\"Interestelar\",\"capaURL\":\"/nCbkOyOMTEwlEV0LtCOvCnwEONA.jpg\"},{\"id\":497,\"titulo\":\"À Espera de um Milagre\",\"capaURL\":\"/14hEqW67IiHlKpzKMLUXyktzZIV.jpg\"},{\"id\":1893,\"titulo\":\"Star Wars: Episódio I - A Ameaça Fantasma\",\"capaURL\":\"/gNk8UNAumXlfCdtaxDqsQe7ZGlt.jpg\"}]', 79, 'Melhores', 'Da minha vida, estes são de outro nível!');

-- --------------------------------------------------------

--
-- Estrutura para tabela `postagens`
--

CREATE TABLE `postagens` (
  `id` int(11) NOT NULL,
  `credenciais_id` int(11) DEFAULT NULL,
  `filme_id` int(11) DEFAULT NULL,
  `texto` varchar(255) NOT NULL,
  `data_postagem` varchar(255) DEFAULT current_timestamp(),
  `nota` int(11) NOT NULL,
  `favorito` tinyint(1) NOT NULL,
  `autor` varchar(255) NOT NULL,
  `tituloDoFilme` varchar(255) NOT NULL,
  `likesDaPostagem` int(11) NOT NULL,
  `capaDoFilme` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `postagens`
--

INSERT INTO `postagens` (`id`, `credenciais_id`, `filme_id`, `texto`, `data_postagem`, `nota`, `favorito`, `autor`, `tituloDoFilme`, `likesDaPostagem`, `capaDoFilme`) VALUES
(43, 52, 519182, 'asdasdasddasdsadsadasd', '02/10/2024, 10:33', 0, 0, 'Brito', 'Meu Malvado Favorito 4', 0, 'https://image.tmdb.org/t/p/w500/jWYTtmxSuWVXP22hxAeXdQZLZrh.jpg'),
(44, 52, 1184918, 'robo chato', '02/10/2024, 10:38', 1, 0, 'Brito', 'Robô Selvagem', 0, 'https://image.tmdb.org/t/p/w500/pG9Vfb3r0Nwd0QO7g01CNaOowXX.jpg'),
(45, 57, 573435, 'Bom', '02/10/2024, 09:50', 0, 0, 'Pedroh', 'Bad Boys: Até o Fim', 0, 'https://image.tmdb.org/t/p/w500/ak6VZDHms5T4p0eFISk336kqjR6.jpg'),
(46, 57, 573435, 'Bom', '02/10/2024, 09:50', 4, 0, 'Pedroh', 'Bad Boys: Até o Fim', 0, 'https://image.tmdb.org/t/p/w500/ak6VZDHms5T4p0eFISk336kqjR6.jpg'),
(47, 57, 573435, 'Bom', '02/10/2024, 09:51', 4, 0, 'Pedroh', 'Bad Boys: Até o Fim', 0, 'https://image.tmdb.org/t/p/w500/ak6VZDHms5T4p0eFISk336kqjR6.jpg'),
(48, 57, 573435, 'Bom', '02/10/2024, 09:51', 4, 0, 'Pedroh', 'Bad Boys: Até o Fim', 0, 'https://image.tmdb.org/t/p/w500/ak6VZDHms5T4p0eFISk336kqjR6.jpg'),
(49, 57, 857, 'Bomdemais', '02/10/2024, 09:54', 4, 1, 'Pedroh', 'O Resgate do Soldado Ryan', 0, 'https://image.tmdb.org/t/p/w500/hMLxNLCXRDd62acfCBn6mIyW1HU.jpg'),
(50, 52, 1329912, 'efsdfdsfsfsdfss', '02/10/2024, 12:03', 5, 1, 'Brito', 'Kung Fu Games', 0, 'https://image.tmdb.org/t/p/w500/yjDdBBUEBMvyUiVohZ8T7W2IFl6.jpg'),
(51, 58, 573435, 'Bad Boys What you Gonna Do When they come for you', '02/10/2024, 12:14', 5, 0, 'João Pedro', 'Bad Boys: Até o Fim', 0, 'https://image.tmdb.org/t/p/w500/ak6VZDHms5T4p0eFISk336kqjR6.jpg'),
(52, 58, 573435, 'Bad Boys What you Gonna Do When they come for you', '02/10/2024, 12:14', 5, 1, 'João Pedro', 'Bad Boys: Até o Fim', 0, 'https://image.tmdb.org/t/p/w500/ak6VZDHms5T4p0eFISk336kqjR6.jpg'),
(53, 59, 12, 'bom demias', '02/10/2024, 12:18', 5, 1, 'Isabela', 'Procurando Nemo', 0, 'https://image.tmdb.org/t/p/w500/5jrPMq7IMLTqcuPDlK6jfruEbpq.jpg'),
(54, 52, 18491, 'o nicolas viu', '02/10/2024, 13:11', 1, 0, 'Brito', 'Neon Genesis Evangelion: O Fim do Evangelho', 0, 'https://image.tmdb.org/t/p/w500/txDIbdn7p6eYdFMVoHbd4wwrNkM.jpg'),
(55, 52, 1184918, 'dsdsdsdsddsdddsdd', '02/10/2024, 13:47', 5, 1, 'Brito', 'Robô Selvagem', 0, 'https://image.tmdb.org/t/p/w500/pG9Vfb3r0Nwd0QO7g01CNaOowXX.jpg'),
(56, 52, 1184918, 'dahora', '02/10/2024, 13:58', 5, 1, 'Brito', 'Robô Selvagem', 0, 'https://image.tmdb.org/t/p/w500/pG9Vfb3r0Nwd0QO7g01CNaOowXX.jpg'),
(57, 52, 877817, 'SDASADASDDADASD', '04/10/2024, 13:10', 4, 1, 'Brito', 'Lobos', 0, 'https://image.tmdb.org/t/p/w500/5LvefZZsapIsOIckLZHbYlwCAkm.jpg'),
(58, 81, 1215162, 'lak,kkkk', '09/10/2024, 12:52', 5, 1, 'Veiga', 'O Vingador da Iugoslávia 2', 0, 'https://image.tmdb.org/t/p/w500/fSrBQXN5u0EeG9Acv2SBX84yuBY.jpg'),
(59, 84, 1215162, 'VINGADOR DA IUGOSLÁVIA', '09/10/2024, 15:41', 5, 1, 'Joao Pedro Araujo Teixeira', 'O Vingador da Iugoslávia 2', 0, 'https://image.tmdb.org/t/p/w500/fSrBQXN5u0EeG9Acv2SBX84yuBY.jpg'),
(61, 86, 957452, 'ruimmmmmmm demais', '11/10/2024, 10:46', 5, 1, 'Maykon', 'O Corvo', 0, 'https://image.tmdb.org/t/p/w500/7QX2ghxNjzCxx2OCO3SrxpiW001.jpg'),
(62, 86, 957452, 'ruimmmmmmm demais', '11/10/2024, 10:52', 5, 1, 'Maykon', 'O Corvo', 0, 'https://image.tmdb.org/t/p/w500/7QX2ghxNjzCxx2OCO3SrxpiW001.jpg'),
(65, 86, 223702, 'filme maravilhoso recomendo para todas as idades', '16/10/2024, 15:07', 0, 0, 'Maykon', 'Festa da Salsicha', 0, 'https://image.tmdb.org/t/p/w500/ocZj2eTuSyylC5I9Rnm5Jk9yJNn.jpg'),
(66, 86, 18785, 'filme bom porem ainda estou solteiro', '16/10/2024, 15:08', 0, 0, 'Maykon', 'Se Beber, Não Case!', 0, 'https://image.tmdb.org/t/p/w500/q55Gluy15mKdjgES7TdETHecWqv.jpg'),
(67, 88, 703021, 'Amei!', '16/10/2024, 15:11', 5, 0, 'Isabella', 'C.S. Lewis: Dreamer of Narnia', 0, 'https://image.tmdb.org/t/p/w500/9HlIdUlttuNOe1IuOZivCsovOL2.jpg'),
(68, 86, 1357459, 'muita safadeza do começo ao fim isso não é da minha religião', '16/10/2024, 15:18', 5, 0, 'Maykon', 'Tatsulok: Tatlo Magkasalo', 0, 'https://image.tmdb.org/t/p/w500/15B2oabjTSiydkqsV05jX2IV1Dq.jpg'),
(69, 86, 86328, 'assisti com meus filhos eles são outras crianças agr nem na rua querem sair mais ', '16/10/2024, 15:20', 5, 0, 'Maykon', 'Terrifier', 0, 'https://image.tmdb.org/t/p/w500/uP5k78WkCVrxrFp4AJflHbC61Ao.jpg'),
(70, 86, 299536, 'um dos melhores filmes da marvel mas chorei muito quando o batman morreu', '16/10/2024, 15:22', 5, 0, 'Maykon', 'Vingadores: Guerra Infinita', 0, 'https://image.tmdb.org/t/p/w500/A4kvp7vY1BDLrrQIagRCffLKj1t.jpg'),
(71, 86, 475557, 'legal até só nn entendi pq o batman nn apareceu', '16/10/2024, 15:23', 5, 0, 'Maykon', 'Coringa', 0, 'https://image.tmdb.org/t/p/w500/xLxgVxFWvb9hhUyCDDXxRPPnFck.jpg'),
(72, 86, 14574, 'muito bom o filme me lembra minha infância', '16/10/2024, 15:25', 5, 0, 'Maykon', 'O Menino do Pijama Listrado', 0, 'https://image.tmdb.org/t/p/w500/zYRk58BJd7bLErTWlx3tVsUUbbV.jpg'),
(73, 86, 1284157, 'sou muito fã desse cara, escondeu michael jackson e passo o nabo no justin bieber', '16/10/2024, 15:27', 5, 0, 'Maykon', 'TMZ Presents: The Downfall of Diddy', 0, 'https://image.tmdb.org/t/p/w500/9HparZrsKQ2nEPPWBWjnVnGrsQd.jpg'),
(74, 90, 1144962, 'njsnhuwfehuweun', '16/10/2024, 15:22', 0, 0, 'Motorola', 'Transmorphers: Mech Beasts', 0, 'https://image.tmdb.org/t/p/w500/oqhaffnQqSzdLrYAQA5W4IdAoCX.jpg'),
(75, 79, 47145, 'Esse filme é bom! A vida de Santo Agostinho é um exemplo para todos nós! Recomendadíssimo!!! ', '18/10/2024, 10:08', 5, 1, 'Brito', 'Santo Augustinho - O Declínio do Império Romano', 0, 'https://image.tmdb.org/t/p/w500/fexq7cUOGcQMpbNB9GoxX0AD0S3.jpg'),
(76, 79, 157336, 'Muito bom! Filme detalhado e com uma história de explodir a cabeça, se você não assistiu, assista! ????', '18/10/2024, 12:24', 5, 1, 'Brito', 'Interestelar', 0, 'https://image.tmdb.org/t/p/w500/nCbkOyOMTEwlEV0LtCOvCnwEONA.jpg'),
(77, 79, 14164, 'Sancto Deus! Que filme horrível, quem foi o colega que pensou nisso.', '25/10/2024, 10:32', 1, 0, 'Brito', 'Dragonball Evolution', 0, 'https://image.tmdb.org/t/p/w500/sunS9xhPnFNP5wlOWrvbpBteAB.jpg'),
(78, 79, 663712, 'Filme horrível, não perca nenhum momento da tua vida assistindo essa porcaria. Esse filme é um lástima! Afe perdi 2 horas da minha vida, que coco! Ass Lacerda', '25/10/2024, 13:35', 0, 0, 'Brito', 'Terrifier 2', 0, 'https://image.tmdb.org/t/p/w500/kkck5DiLrGkqUDzjGQrxgD6BXVJ.jpg'),
(79, 95, 4258, 'MUITO ENGRAÇADO HSHAHAHAHAAHHAHAHAHAHAHAHAHAHAHAHAHAHAHAHAHAHAHAHHAHAHAHA', '25/10/2024, 13:40', 5, 1, 'JesusCristo', 'Todo Mundo em Pânico 5', 0, 'https://image.tmdb.org/t/p/w500/xx8Lw28eJGEn8QyQVQExuIBDo3z.jpg'),
(80, 84, 438866, 'ruim', '25/10/2024, 14:52', 1, 0, 'Joao Pedro Araujo Teixeira', 'Nicolas', 0, 'https://image.tmdb.org/t/p/w500/2Eju3RvSfqfRunHFVUkcmFHtcis.jpg');

-- --------------------------------------------------------

--
-- Estrutura para tabela `tokensrevogados`
--

CREATE TABLE `tokensrevogados` (
  `token` varchar(255) NOT NULL,
  `tempoExpirado` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `tokensrevogados`
--

INSERT INTO `tokensrevogados` (`token`, `tempoExpirado`) VALUES
('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NTIsIm5vbWVSZXNwb3N0YSI6InRlc3RlIiwiaWF0IjoxNzI3ODY2NDkzLCJleHAiOjE3MzA0NTg0OTN9.-jKaRnf_WuRB4B-n8G8PnPmwB0CZ892fkrXW-d18Cpw', '2024-11-01 10:54:53'),
('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NzksIm5vbWVSZXNwb3N0YSI6IkJyaXRvIiwiaWF0IjoxNzI4NDg4NTc0LCJleHAiOjE3MzEwODA1NzR9.xoYXqnnXEo2yhZmf3KWBpsHZtxDJubn_9R548fA2bZE', '2024-11-08 15:42:54'),
('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NzksIm5vbWVSZXNwb3N0YSI6IkJyaXRvIiwiaWF0IjoxNzI4NDg4NzAxLCJleHAiOjE3MzEwODA3MDF9.4qeUToRNXrrkkwQoBmlfdoq39CDbl9lw0DwJwHQhdIo', '2024-11-08 15:45:01'),
('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NzksIm5vbWVSZXNwb3N0YSI6IkJyaXRvIiwiaWF0IjoxNzI4NDk1MTMzLCJleHAiOjE3MzEwODcxMzN9.Qxo4OHwGc7SvYhYWZwBSCC9wKQaAa7Evc8wgAo6mezU', '2024-11-08 17:32:13'),
('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NzksIm5vbWVSZXNwb3N0YSI6IkJyaXRvIiwiaWF0IjoxNzI4NjQyODU0LCJleHAiOjE3MzEyMzQ4NTR9.DUf1XVaSqQsEekT1kO3NQkF4LwP-np4-ATkVK3uUqgE', '2024-11-10 10:34:14'),
('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NzksIm5vbWVSZXNwb3N0YSI6IkJyaXRvIiwiaWF0IjoxNzI5MDc2ODQ4LCJleHAiOjE3MzE2Njg4NDh9.xdZ8_9G4GQjHuqu0q1gD6m9sG9VXo2ppxbzwBTZf0BU', '2024-11-15 11:07:28'),
('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NzksIm5vbWVSZXNwb3N0YSI6IkJyaXRvIiwiaWF0IjoxNzI5MDc5NDg2LCJleHAiOjE3MzE2NzE0ODZ9.uMm0t0TA18b4QJEZz0SmyZY2hJ_dmJVPS1mOALU53_I', '2024-11-15 11:51:26'),
('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NzksIm5vbWVSZXNwb3N0YSI6IkJyaXRvIiwiaWF0IjoxNzI5ODc3OTYwLCJleHAiOjE3MzI0Njk5NjB9.tjvgFPn1Am1B3ghYc0DVfmYOjNBBw4PqJvZvxfyogNM', '2024-11-24 17:39:20'),
('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NzksIm5vbWVSZXNwb3N0YSI6IkJyaXRvIiwiaWF0IjoxNzI5ODgwNTQ3LCJleHAiOjE3MzI0NzI1NDd9.G53yuu5MiLvUmO6buVTVtsy__1Y30kxaEjOUDc-hPr4', '2024-11-24 18:22:27'),
('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ODgsIm5vbWUiOiJJc2FiZWxsYSIsImlhdCI6MTcyOTEwMTk1NSwiZXhwIjoxNzMxNjkzOTU1fQ.BjMa7m1zoO8fx2A-h7ai323zDIy87N1ypNQP0MQqAQ8', '2024-11-15 18:05:55'),
('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ODMsIm5vbWVSZXNwb3N0YSI6IkRhdmkiLCJpYXQiOjE3MjkwODMzODAsImV4cCI6MTczMTY3NTM4MH0.RXE2zHZUtHMscNaQg0fOT6s8oDzhA2_NKmq28lruR9Y', '2024-11-15 12:56:20'),
('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ODUsIm5vbWUiOiJKw6NvVml0aW4iLCJpYXQiOjE3Mjg2NDM5ODIsImV4cCI6MTczMTIzNTk4Mn0.yB_xq-JJgmP7mjoherXTTbKRq9lEUPCKHazzVKuAslU', '2024-11-10 10:53:02'),
('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ODYsIm5vbWVSZXNwb3N0YSI6Ik1heWtvbiIsImlhdCI6MTcyOTg3NjQzOCwiZXhwIjoxNzMyNDY4NDM4fQ.ETyfkY0M-hjHSx8YL3weYsQgx0ZTUcD3zmwFlMxIlzQ', '2024-11-24 17:13:58'),
('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ODYsIm5vbWVSZXNwb3N0YSI6Ik1heWtvbiIsImlhdCI6MTcyOTg3NTgxOSwiZXhwIjoxNzMyNDY3ODE5fQ.HrZ0Xh8dIKpruO3tKGrtoPQftWr8TFa6XO0WvC8D46Q', '2024-11-24 17:03:39'),
('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6OTEsIm5vbWUiOiJgOyBEUk9QIFRBQkxFIGNyZWRlbmNpYWlzOyBzZWxlY3QgwrRhIiwiaWF0IjoxNzI5MTAzMDM0LCJleHAiOjE3MzE2OTUwMzR9.M7TMe4PEQquL7Fjcw6Yzx4FccOxifgeR14Mgf50ZrvA', '2024-11-15 18:23:54'),
('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6OTIsIm5vbWUiOiJEUk9QIERBVEFCQVNFIiwiaWF0IjoxNzI5MTAzMTE5LCJleHAiOjE3MzE2OTUxMTl9.H0Q5TEAIg-xkUq_ONoOVwtHVMgRdvAreCCbUs7JnJiQ', '2024-11-15 18:25:19'),
('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6OTUsIm5vbWUiOiJKZXN1c0NyaXN0byIsImlhdCI6MTcyOTg1NjMzOCwiZXhwIjoxNzMyNDQ4MzM4fQ.bH_2F_i2ieVbBQ5dkgj1ti776_DY2TjfpzoEBuZDOEo', '2024-11-24 11:38:58'),
('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6OTUsIm5vbWVSZXNwb3N0YSI6Ikplc3VzQ3Jpc3RvIiwiaWF0IjoxNzI5ODc4NzA4LCJleHAiOjE3MzI0NzA3MDh9.tvMI-bk8Snc66CPkj2brwgARifV0ZO0TOmVjrT7qfuY', '2024-11-24 17:51:48'),
('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6OTYsIm5vbWUiOiJ0ZXN0ZSIsImlhdCI6MTcyOTg4MDQ0MSwiZXhwIjoxNzMyNDcyNDQxfQ.f-VfVSGUQHgEx_U0pWsoaw0ln_ogAhNSCEVOKrNjY38', '2024-11-24 18:20:41');

--
-- Índices para tabelas despejadas
--

--
-- Índices de tabela `amigos`
--
ALTER TABLE `amigos`
  ADD PRIMARY KEY (`id`);

--
-- Índices de tabela `credenciais`
--
ALTER TABLE `credenciais`
  ADD PRIMARY KEY (`id`);

--
-- Índices de tabela `curtidas`
--
ALTER TABLE `curtidas`
  ADD PRIMARY KEY (`id`),
  ADD KEY `curtidas_ibfk_1` (`credenciais_id`),
  ADD KEY `curtidas_ibfk_2` (`postagens_id`);

--
-- Índices de tabela `descurtidas`
--
ALTER TABLE `descurtidas`
  ADD PRIMARY KEY (`id`),
  ADD KEY `usuario_id` (`usuario_id`),
  ADD KEY `post_id` (`post_id`);

--
-- Índices de tabela `favoritos`
--
ALTER TABLE `favoritos`
  ADD PRIMARY KEY (`id`);

--
-- Índices de tabela `filmes`
--
ALTER TABLE `filmes`
  ADD PRIMARY KEY (`id`);

--
-- Índices de tabela `listas`
--
ALTER TABLE `listas`
  ADD PRIMARY KEY (`id`);

--
-- Índices de tabela `postagens`
--
ALTER TABLE `postagens`
  ADD PRIMARY KEY (`id`);

--
-- Índices de tabela `tokensrevogados`
--
ALTER TABLE `tokensrevogados`
  ADD PRIMARY KEY (`token`);

--
-- AUTO_INCREMENT para tabelas despejadas
--

--
-- AUTO_INCREMENT de tabela `amigos`
--
ALTER TABLE `amigos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT de tabela `credenciais`
--
ALTER TABLE `credenciais`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=97;

--
-- AUTO_INCREMENT de tabela `curtidas`
--
ALTER TABLE `curtidas`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=740;

--
-- AUTO_INCREMENT de tabela `descurtidas`
--
ALTER TABLE `descurtidas`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de tabela `favoritos`
--
ALTER TABLE `favoritos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de tabela `filmes`
--
ALTER TABLE `filmes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de tabela `listas`
--
ALTER TABLE `listas`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT de tabela `postagens`
--
ALTER TABLE `postagens`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=81;

--
-- Restrições para tabelas despejadas
--

--
-- Restrições para tabelas `curtidas`
--
ALTER TABLE `curtidas`
  ADD CONSTRAINT `curtidas_ibfk_1` FOREIGN KEY (`credenciais_id`) REFERENCES `credenciais` (`id`),
  ADD CONSTRAINT `curtidas_ibfk_2` FOREIGN KEY (`postagens_id`) REFERENCES `postagens` (`id`);

--
-- Restrições para tabelas `descurtidas`
--
ALTER TABLE `descurtidas`
  ADD CONSTRAINT `descurtidas_ibfk_1` FOREIGN KEY (`usuario_id`) REFERENCES `usuarios` (`id`),
  ADD CONSTRAINT `descurtidas_ibfk_2` FOREIGN KEY (`post_id`) REFERENCES `posts` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
