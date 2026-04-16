const sequelize = require('../database/connection');
const Localizacao = require('./Localizacao');
const Pessoa      = require('./Pessoa');
const Login       = require('./Login');
const Pet         = require('./Pet');
const Doacao      = require('./Adocao');

// ── Pessoa ↔ Localizacao ──────────────────────────────────────────────────
Pessoa.belongsTo(Localizacao, { foreignKey: 'idLocal', as: 'localizacao' });
Localizacao.hasMany(Pessoa,   { foreignKey: 'idLocal', as: 'pessoas' });

// ── Login ↔ Pessoa ────────────────────────────────────────────────────────
Login.belongsTo(Pessoa, { foreignKey: 'idPessoa', as: 'pessoa' });
Pessoa.hasOne(Login,    { foreignKey: 'idPessoa', as: 'login' });

// ── Pet ↔ Pessoa (Doador) ─────────────────────────────────────────────────
Pet.belongsTo(Pessoa, { foreignKey: 'idDoador', as: 'doador' });
Pessoa.hasMany(Pet,   { foreignKey: 'idDoador', as: 'petsDoados' });

// ── Pet ↔ Localizacao ─────────────────────────────────────────────────────
Pet.belongsTo(Localizacao, { foreignKey: 'idLocal', as: 'localizacao' });
Localizacao.hasMany(Pet,   { foreignKey: 'idLocal', as: 'pets' });

// ── Doacao ↔ Pet ──────────────────────────────────────────────────────────
Doacao.belongsTo(Pet, { foreignKey: 'idPet', as: 'pet' });
Pet.hasMany(Doacao,   { foreignKey: 'idPet', as: 'doacoes', onDelete: 'CASCADE', hooks: true });

// ── Doacao ↔ Pessoa (Adotante) ────────────────────────────────────────────
Doacao.belongsTo(Pessoa, { foreignKey: 'idAdotante', as: 'adotante' });
Pessoa.hasMany(Doacao,   { foreignKey: 'idAdotante', as: 'adocoes' });

module.exports = { sequelize, Localizacao, Pessoa, Login, Pet, Doacao };

