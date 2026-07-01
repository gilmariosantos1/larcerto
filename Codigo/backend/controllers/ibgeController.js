// backend/controllers/ibgeController.js
const axios = require('axios');
const { Localizacao } = require('../models'); 

const URL_IBGE = 'https://servicodados.ibge.gov.br/api/v1/localidades/estados';

exports.buscarEstadosIBGE = async (req, res) => {
    try {
        const response = await axios.get(URL_IBGE);
        return res.status(200).json(response.data);
    } catch (error) {
        console.error('Erro ao buscar estados do IBGE:', error.message);
        return res.status(500).json({ error: 'Falha ao buscar dados do IBGE' });
    }
};

exports.popularBancoComEstados = async (req, res) => {
    try {
        const response = await axios.get(URL_IBGE);
        const estados = response.data;

        for (const estado of estados) {
            await Localizacao.findOrCreate({
                where: { Estado: estado.sigla },
                defaults: {
                    Estado: estado.sigla,
                    Cidade: null,   
                    Bairro: null,  
                    DataInclusao: new Date()
                }
            });
        }

        return res.status(200).json({ message: 'Estados populados no banco com sucesso!' });
    } catch (error) {
        console.error('Erro ao popular banco:', error.message);
        return res.status(500).json({ error: 'Falha ao popular banco com estados' });
    }
};
