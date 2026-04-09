const { Mensagem, Doacao, Pessoa, Login } = require('../models');

const MensagemController = {
    // Listar mensagens de um chat (relativo a uma adoção)
    async listar(req, res) {
        const { idDoacao } = req.params;

        try {
            // Verificar a doação para garantir segurança
            const doacao = await Doacao.findByPk(idDoacao, {
                include: ['pet', 'adotante']
            });

            if (!doacao) return res.status(404).json({ error: 'Adoção não encontrada.' });

            // Segurança: Só o Doador ou o Adotante podem ver este chat
            const ehAdotante = doacao.idAdotante === req.pessoaId;
            const ehDoador = doacao.pet?.idDoador === req.pessoaId;
            
            if (!ehAdotante && !ehDoador) {
                return res.status(403).json({ error: 'Você não tem permissão para visualizar este chat.' });
            }

            const mensagens = await Mensagem.findAll({
                where: { idDoacao },
                include: [{ model: Pessoa, as: 'remetente', attributes: ['idPessoa', 'Nome', 'Perfil'] }],
                order: [['DataHora', 'ASC']]
            });

            res.json(mensagens);
        } catch (err) {
            console.error('ERRO AO LISTAR MENSAGENS:', err);
            res.status(500).json({ error: 'Erro ao buscar mensagens.' });
        }
    },

    // Enviar nova mensagem
    async enviar(req, res) {
        const { idDoacao } = req.params;
        const { Texto } = req.body;

        if (!Texto || !Texto.trim()) return res.status(400).json({ error: 'Mensagem não pode estar vazia.' });

        try {
            // Verificar doação
            const doacao = await Doacao.findByPk(idDoacao, {
                include: ['pet']
            });

            if (!doacao) return res.status(404).json({ error: 'Adoção não encontrada.' });

            // Segurança
            const ehAdotante = doacao.idAdotante === req.pessoaId;
            const ehDoador = doacao.pet?.idDoador === req.pessoaId;

            if (!ehAdotante && !ehDoador) {
                return res.status(403).json({ error: 'Permissão negada para enviar mensagem neste chat.' });
            }

            const mensagem = await Mensagem.create({
                idDoacao,
                idRemetente: req.pessoaId,
                Texto,
                DataHora: new Date()
            });

            // Retornar formatado para o front-end
            const mensagemFormatada = await Mensagem.findByPk(mensagem.idMensagem, {
                include: [{ model: Pessoa, as: 'remetente', attributes: ['idPessoa', 'Nome', 'Perfil'] }]
            });

            res.status(201).json(mensagemFormatada);
        } catch (err) {
            console.error('ERRO AO ENVIAR MENSAGEM:', err);
            res.status(500).json({ error: 'Erro ao enviar mensagem.' });
        }
    }
};

module.exports = MensagemController;
