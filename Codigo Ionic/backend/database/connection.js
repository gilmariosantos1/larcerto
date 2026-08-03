const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
  process.env.DB_NAME || 'nome_do_banco',
  process.env.DB_USER || 'root',
  process.env.DB_PASSWORD !== undefined ? process.env.DB_PASSWORD : '',
  {
    host: process.env.DB_HOST || 'localhost',
    dialect: 'mysql',
    logging: false,
  }
);

sequelize.authenticate()
  .then(() => console.log('Conexão com o banco de dados (Sequelize) estabelecida com sucesso.'))
  .catch(err => console.error('Não foi possível conectar ao banco de dados:', err));

module.exports = sequelize;
