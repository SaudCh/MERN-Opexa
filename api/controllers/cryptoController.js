const cryptoSchema = require('../models/cryptoSchema');
const HttpError = require('../middleware/httpError');

const getCoins = async (req, res, next) => {
    let coins;
    try {
        coins = await cryptoSchema.find({ isDeleted: false });
    } catch (err) {
        const error = new HttpError('Something went wrong, could not find a coin.', 500);
        return next(error);
    }
    res.json({ coins: coins.map(coin => coin.toObject({ getters: true })) });
}

const getCoinById = async (req, res, next) => {
    const coinId = req.params.cid;

    let coin;
    try {
        coin = await cryptoSchema.findById(coinId);
    } catch (err) {
        const error = new HttpError('Something went wrong, could not find a coin.', 500);
        return next(error);
    }

    if (!coin) {
        const error = new HttpError('Could not find a coin for the provided id.', 404);
        return next(error);
    }

    res.json({ coin: coin.toObject({ getters: true }) });

}

const addCoin = async (req, res, next) => {

    const { name, image, address } = req.body;

    const createdCoin = new cryptoSchema({
        name,
        image,
        address,
    });

    try {
        await createdCoin.save();
    } catch (err) {
        const error = new HttpError(err.message, 500);
        return next(error);
    }

    res.status(201).json({ coin: createdCoin });
}

const updateCoin = async (req, res, next) => {
    const { name, image, address } = req.body;
    const coinId = req.params.cid;

    let coin;
    try {
        coin = await cryptoSchema.findById(coinId);
    } catch (err) {
        const error = new HttpError('Something went wrong, could not update coin.', 500);
        return next(error);
    }

    try {
        await cryptoSchema.findByIdAndUpdate(coinId, { name, image, address });
    } catch (err) {
        const error = new HttpError('Something went wrong, could not update coin.', 500);
        return next(error);
    }

    res.status(200).json({ coin: coin.toObject({ getters: true }) });
}

const deleteCoin = async (req, res, next) => {

    let coinId = req.params.cid;
    let coin;
    try {
        coin = await cryptoSchema.findById(coinId);
    } catch (err) {
        const error = new HttpError('Something went wrong, could not update coin.', 500);
        return next(error);
    }

    try {
        await cryptoSchema.findByIdAndUpdate(coinId, { isDeleted: true });
    } catch (err) {
        const error = new HttpError('Something went wrong, could not update coin.', 500);
        return next(error);
    }

    res.status(200).json({ coin: coin.toObject({ getters: true }) });
}

module.exports = {
    getCoins,
    addCoin,
    updateCoin,
    deleteCoin,
    getCoinById
}