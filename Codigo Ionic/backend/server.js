require('dotenv').config();
const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const ibgeRoutes = require('./routes/ibgeRoutes');

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
    : [
        'http://localhost:8100',
        'http://localhost:8101',
        'http://localhost:5173',
        'http://localhost:3000',
        'http://127.0.0.1:8100',
        'ionic://localhost',
        'capacitor://localhost'
      ];

app.use(cors({
    origin: function (origin, callback) {
        // Permite requisições sem origin (apps mobile, Postman, curl)
        if (!origin) return callback(null, true);
        if (allowedOrigins.includes(origin)) {
            return callback(null, true);
        }
        callback(new Error('Origem não permitida pelo CORS: ' + origin));
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/pets', petRoutes);
app.use('/api/adocoes', adocaoRoutes);
app.use('/api/pessoas', pessoaRoutes);
app.use('/api/auth', loginRoutes);
app.use('/api', ibgeRoutes);

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
