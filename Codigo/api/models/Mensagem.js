const { DataTypes, Sequelize } = require('sequelize');
const sequelize = require('../database/connection');

const Mensagem = sequelize.define('Mensagem', {
    idMensagem: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    idDoacao: { 
        type: DataTypes.INTEGER, 
        allowNull: false 
    },
    idRemetente: { 
        type: DataTypes.INTEGER, 
        allowNull: false 
    },
    Texto: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    DataHora: {
        type: DataTypes.DATE,
        defaultValue: Sequelize.NOW
    }
}, {
    tableName: 'Mensagem',
    timestamps: false
});

module.exports = Mensagem;
