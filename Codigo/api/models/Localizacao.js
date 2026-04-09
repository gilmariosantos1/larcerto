const { DataTypes } = require('sequelize');
const sequelize = require('../database/connection');

const Localizacao = sequelize.define('Localizacao', {
    idLocal: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    Cidade: { type: DataTypes.STRING(45), allowNull: true },
    Estado: { type: DataTypes.STRING(45), allowNull: true },
    Bairro:  { type: DataTypes.STRING(45), allowNull: true },
    Detalhes:{ type: DataTypes.STRING(100), allowNull: true }
}, {
    tableName: 'Localizacao',
    timestamps: false
});

module.exports = Localizacao;
