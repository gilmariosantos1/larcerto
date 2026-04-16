USE larcerto;

SET FOREIGN_KEY_CHECKS = 0;

-- Tabelas antigas (snake_case / plural)
DROP TABLE IF EXISTS `doacoes`;
DROP TABLE IF EXISTS `pets`;
DROP TABLE IF EXISTS `Pessoas`;
DROP TABLE IF EXISTS `pessoas`;
DROP TABLE IF EXISTS `enderecos`;
DROP TABLE IF EXISTS `logins`;

-- Tabelas novas (podem existir de ran anterior)
DROP TABLE IF EXISTS `Doacao`;
DROP TABLE IF EXISTS `Pet`;
DROP TABLE IF EXISTS `Login`;
DROP TABLE IF EXISTS `Pessoa`;
DROP TABLE IF EXISTS `Localizacao`;

SET FOREIGN_KEY_CHECKS = 1;

-- ── Localizacao ─────────────────────────────────────────────────────────────
CREATE TABLE `Localizacao` (
  `idLocal`   INT          NOT NULL AUTO_INCREMENT,
  `Cidade`    VARCHAR(45)  NULL,
  `Estado`    VARCHAR(45)  NULL,
  `Bairro`    VARCHAR(45)  NULL,
  `Detalhes`  VARCHAR(100) NULL,
  PRIMARY KEY (`idLocal`)
) ENGINE = InnoDB;

-- ── Pessoa ───────────────────────────────────────────────────────────────────
CREATE TABLE `Pessoa` (
  `idPessoa`  INT          NOT NULL AUTO_INCREMENT,
  `Nome`      VARCHAR(100) NOT NULL,
  `Telefone`  VARCHAR(20)  NULL,
  `Perfil`    VARCHAR(20)  NOT NULL DEFAULT 'Adotante',
  `idLocal`   INT          NULL,
  PRIMARY KEY (`idPessoa`),
  CONSTRAINT `fk_Pessoa_Localizacao`
    FOREIGN KEY (`idLocal`) REFERENCES `Localizacao` (`idLocal`)
    ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE = InnoDB;

-- ── Login ────────────────────────────────────────────────────────────────────
CREATE TABLE `Login` (
  `idLogin`   INT          NOT NULL AUTO_INCREMENT,
  `email`     VARCHAR(100) NOT NULL,
  `senha`     VARCHAR(255) NOT NULL,
  `idPessoa`  INT          NOT NULL,
  PRIMARY KEY (`idLogin`),
  UNIQUE KEY `email_unique` (`email`),
  CONSTRAINT `fk_Login_Pessoa`
    FOREIGN KEY (`idPessoa`) REFERENCES `Pessoa` (`idPessoa`)
    ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB;

-- ── Pet ──────────────────────────────────────────────────────────────────────
CREATE TABLE `Pet` (
  `idPet`    INT          NOT NULL AUTO_INCREMENT,
  `Nome`     VARCHAR(45)  NOT NULL,
  `Tipo`     VARCHAR(20)  NULL,
  `Porte`    VARCHAR(20)  NULL,
  `Genero`   VARCHAR(10)  NULL,
  `Idade`    VARCHAR(20)  NULL,
  `Status`   VARCHAR(20)  NOT NULL DEFAULT 'disponivel',
  `Img`      VARCHAR(500) NULL,
  `Descricao` TEXT        NULL,
  `idDoador` INT          NULL,
  `idLocal`  INT          NULL,
  PRIMARY KEY (`idPet`),
  CONSTRAINT `fk_Pet_Doador`
    FOREIGN KEY (`idDoador`) REFERENCES `Pessoa` (`idPessoa`)
    ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `fk_Pet_Localizacao`
    FOREIGN KEY (`idLocal`) REFERENCES `Localizacao` (`idLocal`)
    ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE = InnoDB;

-- ── Doacao ───────────────────────────────────────────────────────────────────
CREATE TABLE `Doacao` (
  `idDoacao`        INT         NOT NULL AUTO_INCREMENT,
  `idPet`           INT         NOT NULL,
  `idAdotante`      INT         NOT NULL,
  `Status`          VARCHAR(20) NOT NULL DEFAULT 'pendente',
  `DataSolicitacao` DATE        NOT NULL,
  PRIMARY KEY (`idDoacao`),
  CONSTRAINT `fk_Doacao_Pet`
    FOREIGN KEY (`idPet`) REFERENCES `Pet` (`idPet`)
    ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_Doacao_Adotante`
    FOREIGN KEY (`idAdotante`) REFERENCES `Pessoa` (`idPessoa`)
    ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB;

