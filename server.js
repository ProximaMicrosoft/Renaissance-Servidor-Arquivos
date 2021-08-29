const express = require("express")
const cors = require('cors')
const app = express()
const path = require('path')
const { unlink } = require('fs/promises');
app.use(cors());
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use('/uploads', express.static(path.resolve(__dirname, 'uploads')));
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

app.delete('/apagararquivo', async function (req, res) {
    var nome = req.body.arquivo
    if (nome != "") {
        try {
            await unlink(path.resolve(__dirname, 'uploads', nome))
            return res.status(200).json({ "data": "Sucesso !" })

        } catch (err) {
            console.log(err)
            return res.status(400).json({ "data": "Ocorreu algum erro !" })
        }
    } else {
        return res.status(400).json({ "data": "Ocorreu algum erro !" })
    }
})

app.listen(process.env.PORT || 3000, () => { console.log('Server is running') })