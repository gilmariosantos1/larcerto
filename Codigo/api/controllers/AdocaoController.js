const { Doacao, Pet, Pessoa } = require('../models');

const AdocaoController = {
    async listar(req, res) {
        try {
            const doacoes = await Doacao.findAll({
                include: [
                    { model: Pet,    as: 'pet',     attributes: ['idPet', 'Nome', 'Tipo', 'Img'] },
                    { model: Pessoa, as: 'adotante', attributes: ['idPessoa', 'Nome', 'Telefone', 'Perfil'] }
                ],
                order: [['DataSolicitacao', 'DESC']]
            });
            res.json(doacoes);
        } catch (err) {
            console.error('ERRO AO LISTAR ADOÇÕES:', err);
            res.status(500).json({ error: 'Erro ao buscar adoções.' });
        }
    },

    async listarRecebidas(req, res) {
        try {
            console.log('--- BUSCANDO ADOÇÕES RECEBIDAS ---');
            console.log('ID do Login:', req.userId);
            console.log('ID da Pessoa (Doador):', req.pessoaId);

            // 2. Busca os IDs de todos os pets que pertencem a este doador
            const meusPets = await Pet.findAll({
                where: { idDoador: req.pessoaId },
                attributes: ['idPet']
            });

            const idsMeusPets = meusPets.map(p => p.idPet);
            console.log('IDs dos Pets do Doador:', idsMeusPets);

            if (idsMeusPets.length === 0) {
                return res.json([]); // Se não tem pets, não tem solicitações
            }

            const doacoes = await Doacao.findAll({
                where: { idPet: idsMeusPets },
                include: [
                    { model: Pet, as: 'pet', attributes: ['idPet', 'Nome', 'Tipo', 'Img'] },
                    { model: Pessoa, as: 'adotante', attributes: ['idPessoa', 'Nome', 'Telefone', 'Perfil'] }
                ],
                order: [['DataSolicitacao', 'DESC']]
            });

            console.log('Total de solicitações encontradas:', doacoes.length);
            res.json(doacoes);
        } catch (err) {
            console.error('❌ ERRO AO LISTAR ADOÇÕES RECEBIDAS:', err);
            res.status(500).json({ error: 'Erro ao buscar solicitações recebidas.' });
        }
    },

    async listarMinhas(req, res) {
        try {
            const minhasAdocoes = await Doacao.findAll({
                where: { idAdotante: req.pessoaId },
                include: [
                    { 
                        model: Pet, 
                        as: 'pet', 
                        attributes: ['idPet', 'Nome', 'Tipo', 'Img'],
                        include: [{ model: Pessoa, as: 'doador', attributes: ['Nome', 'Telefone'] }]
                    }
                ],
                order: [['DataSolicitacao', 'DESC']]
            });
            res.json(minhasAdocoes);
        } catch (err) {
            console.error('ERRO AO LISTAR MINHAS ADOÇÕES:', err);
            res.status(500).json({ error: 'Erro ao buscar suas adoções.' });
        }
    },

    async criar(req, res) {
        const { idPet } = req.body;
        if (!idPet) return res.status(400).json({ error: 'idPet é obrigatório.' });

        try {
            // REGRA DE NEGÓCIO: Apenas Adotantes podem solicitar adoção
            if (req.userPerfil !== 'Adotante') {
                return res.status(403).json({ 
                    error: 'Apenas usuários com perfil Adotante podem solicitar adoções.' 
                });
            }

            // Verifica se o pet existe e está disponível
            const pet = await Pet.findByPk(idPet);
            if (!pet) return res.status(404).json({ error: 'Pet não encontrado.' });
            
            if (pet.Status !== 'disponivel')
                return res.status(400).json({ error: 'Este pet não está mais disponível para adoção.' });

            // Verifica se o próprio doador está tentando adotar o próprio pet
            if (pet.idDoador === req.pessoaId) {
                return res.status(400).json({ error: 'Você não pode solicitar a adoção do seu próprio pet.' });
            }

            const doacao = await Doacao.create({
                idPet,
                idAdotante: req.pessoaId,
                Status: 'pendente',
                DataSolicitacao: new Date()
            });

            res.status(201).json({ message: 'Solicitação de adoção enviada com sucesso!', doacao });
        } catch (err) {
            console.error('ERRO AO CRIAR ADOÇÃO:', err);
            res.status(400).json({ error: 'Erro ao criar solicitação de adoção.' });
        }
    },

    async atualizarStatus(req, res) {
        const { id } = req.params;
        const { Status } = req.body;
        const statusValidos = ['pendente', 'aprovado', 'recusado'];

        if (!statusValidos.includes(Status))
            return res.status(400).json({ error: 'Status inválido.' });

        try {
            const doacao = await Doacao.findByPk(id, {
                include: [{ model: Pet, as: 'pet' }]
            });

            if (!doacao) return res.status(404).json({ error: 'Adoção não encontrada.' });
            
            // SEGURANÇA: Apenas o doador do PET pode atualizar o status da solicitação
            if (doacao.pet?.idDoador !== req.pessoaId) {
                return res.status(403).json({ error: 'Você não tem permissão para alterar esta solicitação.' });
            }

            await doacao.update({ Status });

            // Se aprovada, marca o pet como adotado
            if (Status === 'aprovado') {
                await Pet.update({ Status: 'adotado' }, { where: { idPet: doacao.idPet } });
                
                // Recusar outras solicitações pendentes para o mesmo pet
                await Doacao.update(
                    { Status: 'recusado' }, 
                    { where: { idPet: doacao.idPet, Status: 'pendente' } }
                );
            }

            res.json({ message: `Solicitação ${Status}!`, doacao });
        } catch (err) {
            res.status(400).json({ error: 'Erro ao atualizar adoção.' });
        }
    }
};

module.exports = AdocaoController;
