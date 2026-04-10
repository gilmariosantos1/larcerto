const { Pessoa, Localizacao } = require('../models');

const PessoaController = {
    async listar(req, res) {
        try {
            const pessoas = await Pessoa.findAll({
                include: [{ model: Localizacao, as: 'localizacao' }]
            });
            res.json(pessoas);
        } catch (err) {
            res.status(500).json({ error: 'Erro ao buscar pessoas.' });
        }
    },

    async buscarPorId(req, res) {
        try {
            const pessoa = await Pessoa.findByPk(req.params.id, {
                include: [{ model: Localizacao, as: 'localizacao' }]
            });
            if (!pessoa) return res.status(404).json({ error: 'Pessoa não encontrada.' });
            res.json(pessoa);
        } catch (err) {
            res.status(500).json({ error: 'Erro ao buscar pessoa.' });
        }
    },

    async atualizar(req, res) {
        try {
            const pessoa = await Pessoa.findByPk(req.params.id);
            if (!pessoa) return res.status(404).json({ error: 'Pessoa não encontrada.' });

            const { Nome, Telefone, Perfil } = req.body;
            await pessoa.update({ Nome, Telefone, Perfil });
            res.json({ message: 'Perfil atualizado com sucesso!', pessoa });
        } catch (err) {
            res.status(400).json({ error: 'Erro ao atualizar pessoa.' });
        }
    }
};

module.exports = PessoaController;
