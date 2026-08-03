const multer = require('multer');
const path = require('path');
const fs = require('fs');

const uploadsDir = path.join(__dirname, '..', 'uploads');
if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir);
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadsDir);
    },
    filename: (req, file, cb) => {
        const timestamp = Date.now();
        const ext = path.extname(file.originalname);
        cb(null, `pet_${timestamp}${ext}`);
    }
});

const fileFilter = (req, file, cb) => {
    const tiposAceitos = ['image/jpeg', 'image/png', 'image/webp'];
    if (tiposAceitos.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error('Apenas imagens JPG, PNG ou WEBP são aceitas.'), false);
    }
};

const upload = multer({
    storage,
    fileFilter,
    limits: { fileSize: 5 * 1024 * 1024 } 
});

module.exports = upload;
