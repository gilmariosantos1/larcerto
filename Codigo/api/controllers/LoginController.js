const { Login, Pessoa } = require('../models');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const LoginController = {

    async logar(req, res) {
        const { email, senha } = req.body;
        if (!email || !senha)
            return res.status(400).json({ error: 'E-mail e senha são obrigatórios.' });

        try {
            const login = await Login.findOne({
                where: { email },
                include: [{ model: Pessoa, as: 'pessoa' }]
            });

            if (!login)
                return res.status(401).json({ error: 'E-mail não encontrado.' });

            const senhaOk = await bcrypt.compare(senha, login.senha);
            if (!senhaOk)
                return res.status(401).json({ error: 'Senha incorreta.' });

            const token = jwt.sign(
                { 
                    id: login.idLogin, 
                    idPessoa: login.idPessoa, 
                    perfil: login.pessoa?.Perfil 
                }, 
                process.env.JWT_SECRET, 
                { expiresIn: '1d' }
            );

            res.json({
                message: 'Login realizado com sucesso!',
                token,
                user: {
                    idLogin:  login.idLogin,
                    email:    login.email,
                    idPessoa: login.idPessoa,
                    Nome:     login.pessoa?.Nome,
                    Telefone: login.pessoa?.Telefone,
                    Perfil:   login.pessoa?.Perfil
                }
            });
        } catch (err) {
            console.error('ERRO NO LOGIN:', err);
            res.status(500).json({ error: 'Erro interno. Tente novamente.' });
        }
    },

    async registrar(req, res) {
        const { Nome, email, senha, Telefone, Perfil } = req.body;

        if (!Nome || !email || !senha)
            return res.status(400).json({ error: 'Nome, e-mail e senha são obrigatórios.' });
        if (senha.length < 6)
            return res.status(400).json({ error: 'A senha deve ter no mínimo 6 caracteres.' });
        const perfilValido = ['Adotante', 'Doador'];
        if (Perfil && !perfilValido.includes(Perfil))
            return res.status(400).json({ error: 'Perfil inválido. Use Adotante ou Doador.' });

        try {
            const existe = await Login.findOne({ where: { email } });
            if (existe)
                return res.status(400).json({ error: 'Este e-mail já está cadastrado.' });

            const pessoa = await Pessoa.create({
                Nome,
                Telefone: Telefone || null,
                Perfil: Perfil || 'Adotante'
            });

            const hashedSenha = await bcrypt.hash(senha, 10);
            const login = await Login.create({
                email,
                senha: hashedSenha,
                idPessoa: pessoa.idPessoa
            });

            res.status(201).json({
                message: 'Cadastro realizado com sucesso!',
                user: {
                    idLogin:  login.idLogin,
                    email:    login.email,
                    idPessoa: pessoa.idPessoa,
                    Nome:     pessoa.Nome,
                    Telefone: pessoa.Telefone,
                    Perfil:   pessoa.Perfil
                }
            });
        } catch (err) {
            console.error('ERRO NO REGISTRO:', err);
            res.status(500).json({ error: 'Erro ao realizar cadastro. Tente novamente.' });
        }
    },

    async meuPerfil(req, res) {
        try {
            const login = await Login.findByPk(req.userId, {
                include: [{ model: Pessoa, as: 'pessoa' }]
            });
            if (!login) return res.status(404).json({ error: 'Perfil não encontrado.' });

            res.json({
                idLogin:  login.idLogin,
                email:    login.email,
                idPessoa: login.idPessoa,
                Nome:     login.pessoa?.Nome,
                Telefone: login.pessoa?.Telefone,
                Perfil:   login.pessoa?.Perfil
            });
        } catch (err) {
            console.error('ERRO PERFIL:', err);
            res.status(500).json({ error: 'Erro ao buscar perfil.' });
        }
    }
};

module.exports = LoginController;
