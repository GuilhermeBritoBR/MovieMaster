-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Tempo de geração: 21/08/2024 às 20:42
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
-- Estrutura para tabela `credenciais`
--

CREATE TABLE `credenciais` (
  `id` int(11) NOT NULL,
  `nome` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `senha` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `credenciais`
--

INSERT INTO `credenciais` (`id`, `nome`, `email`, `senha`) VALUES
(1, 'teste', 'teste', '46070d4bf934fb0d4b06d9e2c46e346944e322444900a435d7d9a95e6d7435f5'),
(2, 'teste', 'teste', '46070d4bf934fb0d4b06d9e2c46e346944e322444900a435d7d9a95e6d7435f5'),
(3, 'brito', 'guilhfdshfdhs@hfjds', '9ef63e4b62acf2456b0fe4b0db3f3696ea63a69685a3023d36e033cea197142b'),
(4, 'brito', 'guilhfdshfdhs@hfjds', '9ef63e4b62acf2456b0fe4b0db3f3696ea63a69685a3023d36e033cea197142b'),
(5, 'Dhedhdhdd', 'Fdhxhdh@hfjfjd', '0cf07a77fbdfcb6645fe8a4daab68c7b179878e76e28d2d61138a91e2b934fed'),
(6, 'Dhedhdhdd', 'MagoNicolaldo', '0cf07a77fbdfcb6645fe8a4daab68c7b179878e76e28d2d61138a91e2b934fed'),
(7, 'Gui Brito', 'Guilherme@briti', '29649d4224dc16146cd4ef32c19c744e0a224d7e8622f041ba8055f0e998c6db'),
(8, 'Nicolas', 'MagoNicolaldo', 'ef797c8118f02dfb649607dd5d3f8c7623048c9c063d532cc95c5ed7a898a64f'),
(9, 'Pedro', 'Pedro@gmail.com', 'f7308341937e89daf1140b6c4636e9a33736e187e2250d7b661d1304cad6c4fc'),
(10, 'sdsadasd', 'dsasaasdda', '92f15cbd78bf55ff08079ca4549a64b793ebf372d0193f496d8c72a59d1ce36e'),
(11, 'GuilhermeBrito', 'guilhermesantiagodebrito@gmail.com', 'ebdf496f67651cddf6aaa1f0b130f1b99ce9e2e93dc2503d926edcff15aee668'),
(12, 'Brito', 'brito.running@gmail.com', 'ebdf496f67651cddf6aaa1f0b130f1b99ce9e2e93dc2503d926edcff15aee668'),
(13, 'Hdjdjdjdbdb', 'Teesteebsbssb', '7095aed4d14b32ef5e7a9c6bd954506d7593fd3e912b9e3a0d1e1c7d1ebeca95'),
(14, 'brito', 'brito', 'brito'),
(15, 'brito', 'brito', '04e60ff82d01c521c578eec39c415b99512c658feb264ef03cd1a5efdbe893b3'),
(16, 'Brito', 'Brito', 'ef797c8118f02dfb649607dd5d3f8c7623048c9c063d532cc95c5ed7a898a64f'),
(17, 'brito', 'flamengo', 'd58d736c7a967fb5f307951932734f8b0594725faa5011dbb66a8c538e635fb6'),
(18, 'aaa', 'aaa', 'ef797c8118f02dfb649607dd5d3f8c7623048c9c063d532cc95c5ed7a898a64f'),
(19, 'britoFlamengo', 'britoFlamengo', 'ef797c8118f02dfb649607dd5d3f8c7623048c9c063d532cc95c5ed7a898a64f'),
(20, 'punpun', 'nicolas@gmail.com', '81edcda020d618244e9bc2fd65e69cd16e042349d6eba134132b3a4521380b0c'),
(21, 'brito', 'nko@gmail.com', '4b03dcd4a2ad0fd235b38b0ceb7a7bef5b848d5ae63d58fcbec4178b61b3a9e9'),
(22, 'nicolas', 'nicolas@gmail.com', 'd6d34583ad7ff5022ab7bbd5a22798035a69851dd69676d9bca708baf0c967b3'),
(23, 'Brito', 'Guilherme@gmail.com', 'ef797c8118f02dfb649607dd5d3f8c7623048c9c063d532cc95c5ed7a898a64f');

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
('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Ikd1aWxoZXJtZUBnbWFpbC5jb20iLCJpYXQiOjE3MjQyNjUyNDksImV4cCI6MTcyNjg1NzI0OX0.6VvU2NpRLTHR5NKftDZyt93N9e7f_MbpeYWrvqeP5x4', '2024-09-20 18:34:09'),
('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbEVub21lIjoiYnJpdG9GbGFtZW5nbyIsImlhdCI6MTcyNDI0NzA5MSwiZXhwIjoxNzI2ODM5MDkxfQ.C5yoIIIXfKzjjBhjNoVrfe5jV8YOBTkzgE0xTSwjxQs', '2024-09-20 13:31:31'),
('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbEVub21lIjoiYnJpdG9GbGFtZW5nbyIsImlhdCI6MTcyNDI2MjA5NywiZXhwIjoxNzI2ODU0MDk3fQ.rO2hxYZgTVVZQYCHyBYBblJtcplwECvbr8CiySLy_tg', '2024-09-20 17:41:37'),
('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbEVub21lIjoiYnJpdG9GbGFtZW5nbyIsImlhdCI6MTcyNDI2NDEwMSwiZXhwIjoxNzI2ODU2MTAxfQ.AFzNhBpjX1_Qu4LsntmMT7-7YLzDo_zUO0OHLElU_RM', '2024-09-20 18:15:01');

--
-- Índices para tabelas despejadas
--

--
-- Índices de tabela `credenciais`
--
ALTER TABLE `credenciais`
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
-- AUTO_INCREMENT de tabela `credenciais`
--
ALTER TABLE `credenciais`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
