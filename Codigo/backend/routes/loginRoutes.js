const express = require('express');
const router = express.Router();
const LoginController = require('../controllers/LoginController');
const authMiddleware = require('../middlewares/authMiddleware');

router.post('/logar', LoginController.logar);
router.post('/registrar', LoginController.registrar);
router.get('/me', authMiddleware, LoginController.meuPerfil);

module.exports = router;
