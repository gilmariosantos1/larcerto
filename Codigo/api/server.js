require('dotenv').config();
const express = require('express');
const cors = require('cors');

const petRoutes = require('./routes/petRoutes');
const adocaoRoutes = require('./routes/adocaoRoutes');
const pessoaRoutes = require('./routes/pessoaRoutes');
const loginRoutes = require('./routes/loginRoutes');
const mensagemRoutes = require('./routes/mensagemRoutes');

const db = require('./models');

const app = express();
const path = require('path');

app.use('/api/uploads', express.static(path.join(__dirname, 'uploads')));

app.use(cors({
    origin: ['http://localhost:5173', 'http://localhost:3000'],
    credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/pets', petRoutes);
app.use('/api/adocoes', adocaoRoutes);
app.use('/api/pessoas', pessoaRoutes);
app.use('/api/auth', loginRoutes);
app.use('/api/mensagens', mensagemRoutes);

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
