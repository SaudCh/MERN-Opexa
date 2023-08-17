const {
    getCoins,
    addCoin,
    updateCoin,
    deleteCoin,
    getCoinById
} = require('../controllers/cryptoController');

const express = require('express');
const router = express.Router();

router.get('/', getCoins);
router.post('/', addCoin);
router.get('/:cid', getCoinById);
router.patch('/:cid', updateCoin);
router.delete('/:cid', deleteCoin);

module.exports = router;