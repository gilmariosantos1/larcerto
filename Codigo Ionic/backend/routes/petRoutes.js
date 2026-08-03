const express = require('express');
const router = express.Router();
const PetController = require('../controllers/PetController');
const authMiddleware = require('../middlewares/authMiddleware');
const upload = require('../middlewares/upload');

// Rotas públicas
router.get('/', PetController.listar);
router.get('/:id', PetController.buscarPorId);

// Rotas protegidas (exigem login e perfil de Doador)
// upload.single('Img') processa o campo 'Img' do formulário como arquivo
router.post('/', authMiddleware, upload.single('Img'), PetController.criar);

router.put('/:id', authMiddleware, PetController.atualizar);
router.delete('/:id', authMiddleware, PetController.excluir);

module.exports = router;
