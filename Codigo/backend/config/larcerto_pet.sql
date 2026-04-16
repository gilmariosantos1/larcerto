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

-- Dump completed on 2026-04-14 19:37:23
