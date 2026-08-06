-- MySQL dump 10.13  Distrib 8.0.23, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: larcerto
-- ------------------------------------------------------
-- Server version	9.6.0

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
SET @MYSQLDUMP_TEMP_LOG_BIN = @@SESSION.SQL_LOG_BIN;
SET @@SESSION.SQL_LOG_BIN= 0;

--
-- GTID state at the beginning of the backup 
--

SET @@GLOBAL.GTID_PURGED=/*!80000 '+'*/ '080af3ce-05de-11f1-a2c7-00090faa0001:1-498';

--
-- Table structure for table `consulta adotador`
--

DROP TABLE IF EXISTS `consulta adotador`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `consulta adotador` (
  `nome` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `doacao`
--

DROP TABLE IF EXISTS `doacao`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `doacao` (
  `idDoacao` int NOT NULL AUTO_INCREMENT,
  `idPet` int NOT NULL,
  `idAdotante` int NOT NULL,
  `Status` varchar(20) NOT NULL DEFAULT 'pendente',
  `DataSolicitacao` date NOT NULL,
  PRIMARY KEY (`idDoacao`),
  KEY `fk_Doacao_Pet` (`idPet`),
  KEY `fk_Doacao_Adotante` (`idAdotante`),
  CONSTRAINT `fk_Doacao_Adotante` FOREIGN KEY (`idAdotante`) REFERENCES `pessoa` (`idPessoa`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_Doacao_Pet` FOREIGN KEY (`idPet`) REFERENCES `pet` (`idPet`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `localizacao`
--

DROP TABLE IF EXISTS `localizacao`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `localizacao` (
  `idLocal` int NOT NULL AUTO_INCREMENT,
  `Cidade` varchar(45) DEFAULT NULL,
  `Estado` varchar(45) DEFAULT NULL,
  `Bairro` varchar(45) DEFAULT NULL,
  `Detalhes` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`idLocal`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `login`
--

DROP TABLE IF EXISTS `login`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `login` (
  `idLogin` int NOT NULL AUTO_INCREMENT,
  `email` varchar(100) NOT NULL,
  `senha` varchar(255) NOT NULL,
  `idPessoa` int NOT NULL,
  PRIMARY KEY (`idLogin`),
  UNIQUE KEY `email_unique` (`email`),
  KEY `fk_Login_Pessoa` (`idPessoa`),
  CONSTRAINT `fk_Login_Pessoa` FOREIGN KEY (`idPessoa`) REFERENCES `pessoa` (`idPessoa`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `mensagem`
--

DROP TABLE IF EXISTS `mensagem`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `mensagem` (
  `idMensagem` int NOT NULL AUTO_INCREMENT,
  `idDoacao` int NOT NULL,
  `idRemetente` int NOT NULL,
  `Texto` text NOT NULL,
  `DataHora` datetime NOT NULL,
  PRIMARY KEY (`idMensagem`),
  KEY `fk_Mensagem_Doacao` (`idDoacao`),
  KEY `fk_Mensagem_Remetente` (`idRemetente`),
  CONSTRAINT `fk_Mensagem_Doacao` FOREIGN KEY (`idDoacao`) REFERENCES `doacao` (`idDoacao`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_Mensagem_Remetente` FOREIGN KEY (`idRemetente`) REFERENCES `pessoa` (`idPessoa`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `pessoa`
--

DROP TABLE IF EXISTS `pessoa`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `pessoa` (
  `idPessoa` int NOT NULL AUTO_INCREMENT,
  `Nome` varchar(100) NOT NULL,
  `Telefone` varchar(20) DEFAULT NULL,
  `Perfil` varchar(20) NOT NULL DEFAULT 'Adotante',
  `idLocal` int DEFAULT NULL,
  PRIMARY KEY (`idPessoa`),
  KEY `fk_Pessoa_Localizacao` (`idLocal`),
  CONSTRAINT `fk_Pessoa_Localizacao` FOREIGN KEY (`idLocal`) REFERENCES `localizacao` (`idLocal`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `pet`
--

DROP TABLE IF EXISTS `pet`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `pet` (
  `idPet` int NOT NULL AUTO_INCREMENT,
  `Nome` varchar(45) NOT NULL,
  `Tipo` varchar(20) DEFAULT NULL,
  `Porte` varchar(20) DEFAULT NULL,
  `Genero` varchar(10) DEFAULT NULL,
  `Idade` varchar(20) DEFAULT NULL,
  `Status` varchar(20) NOT NULL DEFAULT 'disponivel',
  `Img` varchar(500) DEFAULT NULL,
  `Descricao` text,
  `idDoador` int DEFAULT NULL,
  `idLocal` int DEFAULT NULL,
  PRIMARY KEY (`idPet`),
  KEY `fk_Pet_Doador` (`idDoador`),
  KEY `fk_Pet_Localizacao` (`idLocal`),
  CONSTRAINT `fk_Pet_Doador` FOREIGN KEY (`idDoador`) REFERENCES `pessoa` (`idPessoa`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `fk_Pet_Localizacao` FOREIGN KEY (`idLocal`) REFERENCES `localizacao` (`idLocal`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
SET @@SESSION.SQL_LOG_BIN = @MYSQLDUMP_TEMP_LOG_BIN;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-08-05 21:28:10
