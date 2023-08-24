const {
    createBid,
    getBids,
    getBidById,
    acceptOffer,
    rejectOffer,
    completeBidSeller,
    completeBidBuyer,
    getBidMessages,
    sendAMessage,
    deleteBid,
    getBidsByBuyer,
    getActiveBids
} = require('../controllers/bidController');

const router = require('express').Router();

router.get('/', getBids);
router.get('/buyer/:buyerId', getBidsByBuyer);
router.get('/active', getActiveBids);
router.get('/:bidId', getBidById);
router.post('/', createBid);
router.patch('/accept/:bidId', acceptOffer);
router.patch('/reject/:bidId', rejectOffer);
router.patch('/completeSeller/:bidId', completeBidSeller);
router.patch('/completeBuyer/:bidId', completeBidBuyer);
router.get('/messages/:chatId', getBidMessages);
router.post('/messages', sendAMessage);
router.delete('/:bidId', deleteBid);

module.exports = router;