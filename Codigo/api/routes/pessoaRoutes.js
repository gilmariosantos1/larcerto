const express = require('express');
const router = express.Router();
const PessoaController = require('../controllers/PessoaController');
const authMiddleware = require('../middlewares/authMiddleware');

router.get('/',    authMiddleware, PessoaController.listar);
router.get('/:id', authMiddleware, PessoaController.buscarPorId);
router.put('/:id', authMiddleware, PessoaController.atualizar);

module.exports = router;
