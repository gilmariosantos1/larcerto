const express = require('express');
const router = express.Router();
const AdocaoController = require('../controllers/AdocaoController');
const authMiddleware = require('../middlewares/authMiddleware');

router.use(authMiddleware);

router.get('/', AdocaoController.listar);
router.get('/recebidas', AdocaoController.listarRecebidas);
router.get('/minhas', AdocaoController.listarMinhas);
router.post('/', AdocaoController.criar);
router.put('/:id', AdocaoController.atualizarStatus);

module.exports = router;
