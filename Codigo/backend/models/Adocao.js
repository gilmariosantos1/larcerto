const { DataTypes, Sequelize } = require('sequelize');
const sequelize = require('../database/connection');

const Doacao = sequelize.define('Doacao', {
    idDoacao: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    idPet:        { type: DataTypes.INTEGER, allowNull: false },
    idAdotante:   { type: DataTypes.INTEGER, allowNull: false },
    Status:       {
        type: DataTypes.STRING(20),
        defaultValue: 'pendente',
        validate: { isIn: [['pendente', 'aprovado', 'recusado']] }
    },
    DataSolicitacao: {
        type: DataTypes.DATEONLY,
        defaultValue: Sequelize.NOW
    }
}, {
    tableName: 'Doacao',
    timestamps: false
});

module.exports = Doacao;
