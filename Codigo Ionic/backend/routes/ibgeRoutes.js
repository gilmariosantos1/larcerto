// backend/routes/ibgeRoutes.js
const express = require('express');
const router = express.Router();
const ibgeController = require('../controllers/ibgeController');

// Rota para buscar os estados da API do IBGE (sem salvar no banco)
router.get('/estados', ibgeController.buscarEstadosIBGE);

// Rota para buscar e salvar os estados no seu banco MySQL
router.post('/estados/popular', ibgeController.popularBancoComEstados);

module.exports = router;