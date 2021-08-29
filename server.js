const express = require("express")
const cors = require('cors')
const app = express()
app.use(cors());
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
const multer = require('multer');
const multerConfig = require('./multer/multer');
const upload = multer(multerConfig);


app.post('/enviararquivo', upload.single('image'), async function (req, res) {
    if (req.file.filename != "") {
        return res.status(200).json({ "data": "Sucesso !" })
    } else {
        return res.status(400).json({ "data": "Ocorreu algum erro !" })
    }
})

app.listen(process.env.PORT || 3000, () => { console.log('Server is running') })