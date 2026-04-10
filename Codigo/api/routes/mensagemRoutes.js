const express = require('express');
const router = express.Router();
const MensagemController = require('../controllers/MensagemController');
const authMiddleware = require('../middlewares/authMiddleware');

router.use(authMiddleware);

router.get('/:idDoacao', MensagemController.listar);
router.post('/:idDoacao', MensagemController.enviar);

module.exports = router;
