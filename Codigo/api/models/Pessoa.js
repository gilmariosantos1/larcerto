const { DataTypes } = require('sequelize');
const sequelize = require('../database/connection');

const Pessoa = sequelize.define('Pessoa', {
    idPessoa: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    Nome:     { type: DataTypes.STRING(100), allowNull: false },
    Telefone: { type: DataTypes.STRING(20),  allowNull: true  },
    Perfil:   {
        type: DataTypes.STRING(20),
        allowNull: false,
        defaultValue: 'Adotante',
        validate: { isIn: [['Adotante', 'Doador']] }
    },
    idLocal:  { type: DataTypes.INTEGER, allowNull: true }
}, {
    tableName: 'Pessoa',
    timestamps: false
});

module.exports = Pessoa;
