const fs = require('fs');
const path = require('path');

const fileHelper = {
    excluirImagem: (fileName) => {
        if (!fileName) return;
        const filePath = path.join(__dirname, '..', 'uploads', fileName);
        if (fs.existsSync(filePath)) {
            try {
                fs.unlinkSync(filePath);
                console.log(`Arquivo removido: ${fileName}`);
            } catch (err) {
                console.error(`Erro ao remover o arquivo: ${fileName}`, err);
            }
        }
    }
};

module.exports = fileHelper;
