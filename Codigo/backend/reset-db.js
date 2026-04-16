const fs = require('fs');
const path = require('path');
require('dotenv').config();

const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASS,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: 'mysql',
    logging: false
  }
);

async function resetDb() {
  try {
    await sequelize.authenticate();
    console.log('Conectado ao banco ' + process.env.DB_NAME + '!');

    const sqlPath = path.join(__dirname, 'database', 'reset.sql');
    const sql = fs.readFileSync(sqlPath, 'utf8');

    // Remove comment-only lines, then split by ;\n at end of real statements
    const statements = sql
      .replace(/--[^\n]*/g, '')   // remove inline comments
      .split(/;\s*\n/)
      .map(s => s.trim())
      .filter(s => s.length > 0);

    for (const stmt of statements) {
      await sequelize.query(stmt);
      console.log('OK:', stmt.substring(0, 70).replace(/\n/g, ' '));
    }

    console.log('\n✅ Banco de dados resetado com sucesso!');
    process.exit(0);
  } catch (err) {
    console.error('❌ Erro:', err.message);
    process.exit(1);
  }
}

resetDb();
