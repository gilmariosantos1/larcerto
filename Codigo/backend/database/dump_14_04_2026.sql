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

SET @@GLOBAL.GTID_PURGED=/*!80000 '+'*/ '080af3ce-05de-11f1-a2c7-00090faa0001:1-375';

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
-- Dumping data for table `consulta adotador`
--

LOCK TABLES `consulta adotador` WRITE;
/*!40000 ALTER TABLE `consulta adotador` DISABLE KEYS */;
/*!40000 ALTER TABLE `consulta adotador` ENABLE KEYS */;
UNLOCK TABLES;

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
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `doacao`
--

LOCK TABLES `doacao` WRITE;
/*!40000 ALTER TABLE `doacao` DISABLE KEYS */;
INSERT INTO `doacao` VALUES (2,2,2,'aprovado','2026-04-10'),(3,3,2,'aprovado','2026-04-14'),(4,4,2,'pendente','2026-04-14');
/*!40000 ALTER TABLE `doacao` ENABLE KEYS */;
UNLOCK TABLES;

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
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `localizacao`
--

LOCK TABLES `localizacao` WRITE;
/*!40000 ALTER TABLE `localizacao` DISABLE KEYS */;
INSERT INTO `localizacao` VALUES (1,'São Paulo','SP',NULL,NULL),(2,'gloria','SE',NULL,NULL),(3,'ITABAIANA','SE',NULL,NULL);
/*!40000 ALTER TABLE `localizacao` ENABLE KEYS */;
UNLOCK TABLES;

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
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `login`
--

LOCK TABLES `login` WRITE;
/*!40000 ALTER TABLE `login` DISABLE KEYS */;
INSERT INTO `login` VALUES (1,'doador@teste.com','$2b$10$OxrQPRoPa40R0sfY/O3JHeZTP7sDUMBts2G1Xt9a.tKGbtMBJtjfC',1),(2,'adotante@teste.com','$2b$10$rHBtl4Glb67ft7Xt0Qo4TuWWgEUcDx58zB4XVJxmBI/3jgbyJOw/q',2),(3,'adotante1@teste.com','$2b$10$F.RxTV.9BAUDWovbn9iQGeIOw5T6oOo0XaDdGt4sdp.9pHxeoqxTS',3),(4,'testejulia@gmail.com','$2b$10$4tZrZXRhc867BiBtR0Vq3u41QU.BDkuHENmZ65CXUCk9DFwjpw9Ge',4);
/*!40000 ALTER TABLE `login` ENABLE KEYS */;
UNLOCK TABLES;


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
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pessoa`
--

LOCK TABLES `pessoa` WRITE;
/*!40000 ALTER TABLE `pessoa` DISABLE KEYS */;
INSERT INTO `pessoa` VALUES (1,'Ana Silva','11999999999','Doador',NULL),(2,'Carlos Adotante','11888888888','Adotante',NULL),(3,'teste 2','9292992292','Doador',NULL),(4,'julia','999999999','Doador',NULL);
/*!40000 ALTER TABLE `pessoa` ENABLE KEYS */;
UNLOCK TABLES;

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
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pet`
--

LOCK TABLES `pet` WRITE;
/*!40000 ALTER TABLE `pet` DISABLE KEYS */;
INSERT INTO `pet` VALUES (2,'rex','cao','P','Macho','2','adotado','/api/uploads/1775859763187-344181497.jpg','lola afe',3,2),(3,'rex','gato','P','Macho','2','adotado','/api/uploads/1776203265020-688588085.png','testee',4,3),(4,'rex','cao','P','Macho','2','disponivel','/api/uploads/1776205211826-164892167.jpeg','historia bnt',4,3);
/*!40000 ALTER TABLE `pet` ENABLE KEYS */;
UNLOCK TABLES;
SET @@SESSION.SQL_LOG_BIN = @MYSQLDUMP_TEMP_LOG_BIN;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-04-14 19:39:14
