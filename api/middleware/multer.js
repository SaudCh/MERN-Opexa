const multer = require('multer')
const path = require('path')
const { v4: uuidv4 } = require("uuid");

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads')
    },
    filename: (req, file, cb) => {
        cb(null, uuidv4() + file.originalname)
    }
})

const filefilter = (req, file, cb) => {

    const regex = /^image\/.*/;
    const isValid = regex.test(file.mimetype);

    let error = isValid ? null : new Error('Invalid File Type!')
    cb(error, isValid)
}

const upload = multer({ storage: storage, fileFilter: filefilter })

module.exports = { upload }