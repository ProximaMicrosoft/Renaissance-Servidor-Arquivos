const multer = require('multer')
const path = require('path')
const crypto = require('crypto')

module.exports = {
    storage: multer.diskStorage({
        destination: path.resolve(__dirname, '..', 'uploads'),
        filename(request, file, callback) {
            console.log(file)
            const hash = crypto.randomBytes(16).toString('hex');
            const filename = `${hash}-${ajeitaEspaco(file.originalname)}`;
            callback(null, filename);
        }
    }),
};

function ajeitaEspaco(originalname) {
    var array = originalname.split(" ")
    var nomenovo = ""
    for (var i = 0; i < array.length; i++) {
        nomenovo = nomenovo + "_" + array[i]
    }
    return nomenovo
}