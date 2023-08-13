const {
    uploadImage,
    uploadImages
} = require('../controllers/');

const express = require('express');
const { upload } = require('../middleware/multer');
const router = express.Router();

router.post('/upload-image', upload.single('image'), uploadImage);
router.post('/upload-images', upload.array('images'), uploadImages);

module.exports = router;
