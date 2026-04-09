const { Pet, Pessoa, Localizacao, Login } = require('../models');
const fileHelper = require('../utils/fileHelper');

const PetController = {

    async listar(req, res) {
        try {
            const where = {};
            if (req.query.status) where.Status = req.query.status;

            const pets = await Pet.findAll({
                where,
                include: [
                    { model: Pessoa,      as: 'doador',      attributes: ['idPessoa', 'Nome', 'Telefone'] },
                    { model: Localizacao, as: 'localizacao', attributes: ['idLocal', 'Cidade', 'Estado', 'Bairro'] }
                ],
                order: [['idPet', 'DESC']]
            });
            res.json(pets);
        } catch (err) {
            console.error('ERRO AO LISTAR PETS:', err);
            res.status(500).json({ error: 'Erro ao buscar pets.' });
        }
    },

    async buscarPorId(req, res) {
        try {
            const pet = await Pet.findByPk(req.params.id, {
                include: [
                    { model: Pessoa,      as: 'doador',      attributes: ['idPessoa', 'Nome', 'Telefone'] },
                    { model: Localizacao, as: 'localizacao' }
                ]
            });
            if (!pet) return res.status(404).json({ error: 'Pet não encontrado.' });
            res.json(pet);
        } catch (err) {
            res.status(500).json({ error: 'Erro ao buscar pet.' });
        }
    },

    async criar(req, res) {
        try {
            if (!req.userId) return res.status(401).json({ error: 'Usuário não autenticado.' });

            if (req.userPerfil !== 'Doador') {
                return res.status(403).json({
                    error: 'Apenas usuários com perfil Doador podem cadastrar pets.'
                });
            }

            const { Nome, Tipo, Porte, Genero, Idade, Descricao, Cidade, Estado } = req.body;
            
            if (!Nome?.trim()) return res.status(400).json({ error: 'O nome do pet é obrigatório.' });
            if (!Tipo) return res.status(400).json({ error: 'O tipo do animal é obrigatório.' });
            
            // Tratamento da localização
            let idLocal = null;
            if (Cidade && Estado) {
                // FindOrCreate garante que não duplicaremos cidades no banco
                const [local] = await Localizacao.findOrCreate({
                    where: { Cidade, Estado }
                });
                idLocal = local.idLocal;
            }

            // Se um arquivo foi enviado pelo multer, salvamos o caminho relativo
            let caminhoImagem = req.body.Img; // Fallback para link se não houver arquivo
            if (req.file) {
                // No frontend, a URL será algo como /api/uploads/filename.jpg
                caminhoImagem = `/api/uploads/${req.file.filename}`;
            }

            const pet = await Pet.create({
                Nome,
                Tipo,
                Porte,
                Genero,
                Idade,
                Descricao,
                Img: caminhoImagem,
                idDoador: req.pessoaId,
                idLocal,
                Status: 'disponivel'
            });

            res.status(201).json({ message: 'Pet cadastrado com sucesso!', pet });
        } catch (err) {
            console.error('❌ ERRO AO CRIAR PET:', err);
            
            // Se for erro de validação do Sequelize, retornamos o primeiro erro
            if (err.name === 'SequelizeValidationError' || err.name === 'SequelizeUniqueConstraintError') {
                return res.status(400).json({ error: err.errors[0].message });
            }

            res.status(400).json({ error: 'Erro ao cadastrar pet. Verifique os dados ou tente outra foto.' });
        }
    },

    async atualizar(req, res) {
        try {
            const pet = await Pet.findByPk(req.params.id);
            if (!pet) return res.status(404).json({ error: 'Pet não encontrado.' });
            await pet.update(req.body);
            res.json({ message: 'Pet atualizado!', pet });
        } catch (err) {
            res.status(400).json({ error: 'Erro ao atualizar pet.' });
        }
    },

    async excluir(req, res) {
        try {
            const pet = await Pet.findByPk(req.params.id);
            if (!pet) return res.status(404).json({ error: 'Pet não encontrado.' });
            
            // Segurança: Apenas o doador que cadastrou o pet pode excluí-lo
            if (pet.idDoador !== req.pessoaId) {
                return res.status(403).json({ error: 'Você não tem permissão para excluir este pet.' });
            }

            // Se o pet tem uma imagem local, deletamos o arquivo físico
            if (pet.Img && pet.Img.startsWith('/api/uploads/')) {
                const fileName = pet.Img.split('/').pop();
                fileHelper.excluirImagem(fileName);
            }

            await pet.destroy();
            res.json({ message: 'Pet removido com sucesso e imagem excluída.' });
        } catch (err) {
            console.error('Erro ao excluir pet:', err);
            res.status(500).json({ error: 'Erro ao remover pet.' });
        }
    }
};

module.exports = PetController;
