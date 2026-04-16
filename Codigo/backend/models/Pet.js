const { DataTypes } = require('sequelize');
const sequelize = require('../database/connection');

const Pet = sequelize.define('Pet', {
    idPet: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    Nome:     { type: DataTypes.STRING(45),  allowNull: false },
    Tipo:     {
        type: DataTypes.STRING(20),
        allowNull: true,
        validate: { isIn: [['cao', 'gato', 'outro']] }
    },
    Porte:    {
        type: DataTypes.STRING(20),
        allowNull: true,
        validate: { isIn: [['P', 'M', 'G']] }
    },
    Genero:   { type: DataTypes.STRING(10),  allowNull: true },
    Idade:    { type: DataTypes.STRING(20),  allowNull: true },
    Status:   {
        type: DataTypes.STRING(20),
        defaultValue: 'disponivel',
        validate: { isIn: [['disponivel', 'adotado']] }
    },
    Img:      { type: DataTypes.STRING(500), allowNull: true },
    Descricao: { type: DataTypes.TEXT,         allowNull: true },
    idDoador: { type: DataTypes.INTEGER,     allowNull: true },
    idLocal:  { type: DataTypes.INTEGER,     allowNull: true }
}, {
    tableName: 'Pet',
    timestamps: false
});

module.exports = Pet;
