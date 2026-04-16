const fs = require('fs');
const path = require('path');

/**
 * Utilitário para gerenciar arquivos físicos (uploads)
 */
const fileHelper = {
  /**
   * Remove um arquivo da pasta de uploads
   * @param {string} fileName - Apenas o nome do arquivo (ex: '17123456-123.jpg')
   */
  excluirImagem(fileName) {
    if (!fileName) return;

    // Resolve o caminho absoluto para a pasta de uploads na raiz da API
    const filePath = path.resolve(__dirname, '..', 'uploads', fileName);

    fs.unlink(filePath, (err) => {
      if (err) {
        if (err.code === 'ENOENT') {
          console.warn(`Arquivo não encontrado para exclusão: ${fileName}`);
        } else {
          console.error(`Erro ao excluir arquivo físico: ${fileName}`, err);
        }
      } else {
        console.log(`✅ Arquivo removido com sucesso: ${fileName}`);
      }
    });
  }
};

module.exports = fileHelper;
