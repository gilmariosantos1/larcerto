require('dotenv').config();
const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

// Garante que a pasta de uploads exista
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir);
    console.log('📁 Pasta uploads criada com sucesso.');
}

const petRoutes = require('./routes/petRoutes');
const adocaoRoutes = require('./routes/adocaoRoutes');
const pessoaRoutes = require('./routes/pessoaRoutes');
const loginRoutes = require('./routes/loginRoutes');

const db = require('./models');

const app = express();

app.use('/api/uploads', express.static(path.join(__dirname, 'uploads')));

const allowedOrigins = process.env.ALLOWED_ORIGINS 
    ? process.env.ALLOWED_ORIGINS.split(',') 
    : ['http://localhost:5173', 'http://localhost:3000'];

app.use(cors({
    origin: allowedOrigins,
    credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/pets', petRoutes);
app.use('/api/adocoes', adocaoRoutes);
app.use('/api/pessoas', pessoaRoutes);
app.use('/api/auth', loginRoutes);

app.get('/', (req, res) => {
    res.json({ message: 'API Lar Certo está online! 🐶', version: '2.0' });
});

app.use((err, req, res, next) => {
    console.error('ERRO NÃO TRATADO:', err);
    res.status(500).json({ error: 'Erro interno do servidor.' });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`✅ Servidor rodando na porta ${PORT}`);
});
