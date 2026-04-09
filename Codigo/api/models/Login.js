const { DataTypes } = require('sequelize');
const sequelize = require('../database/connection');

const Login = sequelize.define('Login', {
    idLogin: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    email: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true,
        validate: { isEmail: true }
    },
    senha: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    idPessoa: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    tableName: 'Login',
    timestamps: false
});

module.exports = Login;
