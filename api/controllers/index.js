const HttpError = require('../middleware/httpError');

const uploadImage = async (req, res, next) => {
    const file = req?.file;

    if (!file) {
        const error = new HttpError('No image provided', 400);
        return next(error);
    }

    res.status(201).json({
        message: 'Image uploaded successfully',
        imageUrl: file.path
    });
}

const uploadImages = async (req, res, next) => {
    const files = req?.files;

    if (!files) {
        const error = new HttpError('No image provided', 400);
        return next(error);
    }

    res.status(201).json({
        message: 'Images uploaded successfully',
        imageUrls: files.map(file => file.path)
    });
}

module.exports = {
    uploadImage,
    uploadImages
}
