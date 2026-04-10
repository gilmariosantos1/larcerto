const express = require('express');
const router = express.Router();
const AdocaoController = require('../controllers/AdocaoController');
const authMiddleware = require('../middlewares/authMiddleware');

router.use(authMiddleware);

router.get('/', authMiddleware, AdocaoController.listar);
router.get('/recebidas', authMiddleware, AdocaoController.listarRecebidas);
router.get('/minhas', authMiddleware, AdocaoController.listarMinhas);
router.post('/', authMiddleware, AdocaoController.criar);
router.put('/:id', authMiddleware, AdocaoController.atualizarStatus);

module.exports = router;
