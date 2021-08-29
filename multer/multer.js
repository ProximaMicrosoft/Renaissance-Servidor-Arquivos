const multer = require('multer')
const path = require('path')
const crypto = require('crypto')

module.exports = {
    storage: multer.diskStorage({
        destination: path.resolve(__dirname, '..', 'uploads'),
        filename(request, file, callback) {
            console.log(file)
            const hash = crypto.randomBytes(16).toString('hex');
            const filename = `${hash}-${file.originalname}`;
            callback(null, filename);
        }
    }),
};