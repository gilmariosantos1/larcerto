CREATE SCHEMA IF NOT EXISTS `larcerto` DEFAULT CHARACTER SET utf8 ;
USE `larcerto` ;

-- -----------------------------------------------------
-- Table `logins`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `logins` (
  `idlogin` INT NOT NULL AUTO_INCREMENT,
  `email` VARCHAR(100) NULL,
  `senha` VARCHAR(255) NULL,
  PRIMARY KEY (`idlogin`))
ENGINE = InnoDB;

-- -----------------------------------------------------
-- Table `enderecos`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `enderecos` (
  `idlocalizacao` INT NOT NULL AUTO_INCREMENT,
  `cidade` VARCHAR(45) NULL,
  `estado` VARCHAR(45) NULL,
  `bairro` VARCHAR(45) NULL,
  `detalhes` VARCHAR(45) NULL,
  PRIMARY KEY (`idlocalizacao`))
ENGINE = InnoDB;

-- -----------------------------------------------------
-- Table `Pessoas`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Pessoas` (
  `idPessoa` INT NOT NULL AUTO_INCREMENT,
  `nome` VARCHAR(45) NULL,
  `telefone` VARCHAR(20) NULL,
  `perfil` VARCHAR(45) NULL,
  `email` VARCHAR(45) NULL,
  `enderecos_idlocalizacao` INT,
  PRIMARY KEY (`idPessoa`),
  INDEX `fk_Pessoas_enderecos1_idx` (`enderecos_idlocalizacao` ASC) VISIBLE,
  CONSTRAINT `fk_Pessoas_enderecos1`
    FOREIGN KEY (`enderecos_idlocalizacao`)
    REFERENCES `enderecos` (`idlocalizacao`)
    ON DELETE SET NULL
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

-- -----------------------------------------------------
-- Table `pets`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `pets` (
  `idpet` INT NOT NULL AUTO_INCREMENT,
  `nome` VARCHAR(45) NULL,
  `tipo` VARCHAR(45) NULL,
  `porte` VARCHAR(45) NULL,
  `genero` VARCHAR(45) NULL,
  `idade_prox` VARCHAR(45) NULL,
  `status` VARCHAR(45) NULL,
  `atributitutor` VARCHAR(45) NULL,
  PRIMARY KEY (`idpet`))
ENGINE = InnoDB;

-- -----------------------------------------------------
-- Table `doacoes`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `doacoes` (
  `iddocao` INT NOT NULL AUTO_INCREMENT,
  `status` VARCHAR(45) NULL,
  `DataSolicitacao` DATE NULL,
  `pets_idpet` INT NOT NULL,
  `Pessoas_idPessoa` INT NOT NULL,
  `Pessoas_enderecos_idlocalizacao` INT,
  PRIMARY KEY (`iddocao`),
  INDEX `fk_doacoes_pets1_idx` (`pets_idpet` ASC) VISIBLE,
  INDEX `fk_doacoes_Pessoas1_idx` (`Pessoas_idPessoa` ASC) VISIBLE,
  CONSTRAINT `fk_doacoes_pets1`
    FOREIGN KEY (`pets_idpet`)
    REFERENCES `pets` (`idpet`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_doacoes_Pessoas1`
    FOREIGN KEY (`Pessoas_idPessoa`)
    REFERENCES `Pessoas` (`idPessoa`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION)
ENGINE = InnoDB;
