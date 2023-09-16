const bidSchema = require('../models/bidsSchema');
const HttpError = require('../middleware/httpError');
const walletSchema = require('../models/walletSchema');
const transactionSchema = require('../models/transactionSchema');
const messageSchema = require('../models/bidMessageScehma');
const { sendMessage } = require("../sockets/socketManager")


const { sendNotification } = require('./notificationController');
const { default: mongoose } = require('mongoose');

const createBid = async (req, res, next) => {
    const { seller, buyer, product, offeredProducts, total, cash } = req.body;

    const bid = new bidSchema({
        seller,
        buyer,
        product,
        offeredProducts,
        total,
        cash,
    });

    try {

        const extBids = await bidSchema.find({ product, buyer });

        if (extBids.length > 0) {
            const error = new HttpError('Bid already placed', 400);
            return next(error);
        }

        const wallet = await walletSchema.findOne({ user: buyer });

        if (wallet.balance < 10000) {
            const error = new HttpError('Insufficient balance', 400);
            return next(error);
        }

        await walletSchema.findOneAndUpdate({
            user: buyer,
        }, { $inc: { balance: -10000 } });

        const newTransaction = new transactionSchema({
            user: buyer,
            amount: -10000,
            type: 'debit',
            description: 'Bid placed',
            paymentMethod: 'wallet',
            status: 'succeeded'
        });

        await newTransaction.save();

        await bid.save();

        sendNotification([seller], { title: 'New Bid', body: 'You have a new bid' });

        sendNotification([buyer], { title: 'Bid Placed', body: 'Your bid has been placed' });

        res.status(201).json({ bid });
    } catch (err) {
        const error = new HttpError(err.message, 500);
        return next(error);
    }
}

const getBids = async (req, res, next) => {
    const { seller, buyer, product, status } = req.query;

    let match = {};
    if (seller) match.seller = seller
    if (buyer) match.buyer = buyer
    if (product) match.product = product
    if (status) match.status = status

    try {

        const bids = await bidSchema.find(match).populate('product').populate('buyer', { name: 1, avatar: 1 }).populate("offeredProducts")

        console.log(bids);

        let newBids = [];
        let products = [];

        for (let i = 0; i < bids.length; i++) {

            if (products.includes(bids[i].product._id)) {

                for (let j = 0; j < newBids.length; j++) {
                    if (newBids[j].product._id === bids[i].product._id) {
                        newBids[j].bids.push({
                            _id: bids[i]._id,
                            products: bids[i].offeredProducts,
                            cash: bids[i].cash,
                            buyer: bids[i].buyer,
                        });
                    }
                }

            } else {
                products.push(bids[i].product._id);
                newBids.push({
                    product: bids[i].product,
                    seller: bids[i].seller,
                    bids: [{
                        _id: bids[i]._id,
                        products: bids[i].offeredProducts,
                        cash: bids[i].cash,
                        buyer: bids[i].buyer,
                    }]

                });
            }


        }

        console.log(newBids);


        res.status(200).json({ bids: newBids });
    } catch (err) {
        const error = new HttpError('Fetching bids failed, please try again', 500);
        return next(error);
    }
}

const getActiveBids = async (req, res, next) => {
    const { user } = req.query;

    try {
        const bids = await bidSchema.find({
            $or: [
                { seller: user },
                { buyer: user }
            ],
            status: { $in: ['accepted', 'completed', 'issued'] }
        }).populate('product').populate('buyer', { name: 1, avatar: 1 }).populate("offeredProducts").populate('seller', { name: 1, avatar: 1 });

        res.status(200).json({ bids });
    } catch (err) {
        const error = new HttpError(err.message, 500);
        return next(error);
    }
}

const getActiveBidsAdmin = async (req, res, next) => {

    try {
        const bids = await bidSchema.find({
            status: { $in: ['accepted', 'completed', 'issued'] }
        }).populate('product').populate('buyer', { name: 1, avatar: 1 }).populate("offeredProducts").populate('seller', { name: 1, avatar: 1 });

        res.status(200).json({ bids });
    } catch (err) {
        const error = new HttpError(err.message, 500);
        return next(error);
    }
}

const getBidsByBuyer = async (req, res, next) => {
    const { buyerId } = req.params;
    try {
        const bids = await bidSchema.find({ buyer: buyerId }).populate('product').populate('buyer', { name: 1, avatar: 1 }).populate("offeredProducts")

        res.status(200).json({ bids });
    } catch (err) {
        const error = new HttpError(err.message, 500);
        return next(error);
    }
}


const getBidById = async (req, res, next) => {
    const { bidId } = req.params;

    try {
        const bid = await bidSchema.findById(bidId);

        if (!bid) {
            const error = new HttpError('Bid not found', 404);
            return next(error);
        }

        res.status(200).json({ bid });
    } catch (err) {
        const error = new HttpError(err.message, 500);
        return next(error);
    }
}

const acceptOffer = async (req, res, next) => {

    const { bidId } = req.params;

    try {
        const bid = await bidSchema.findById(bidId);

        if (!bid) {
            const error = new HttpError('Bid not found', 404);
            return next(error);
        }

        const bids = await bidSchema.findOne({
            product: bid.product,
            status: 'accepted',
        });

        if (bids) {
            const error = new HttpError('Bid already accepted for that project', 400);
            return next(error);
        }

        await bidSchema.findByIdAndUpdate(bidId, {
            status: 'accepted',
            chatId: bid.seller + bid.buyer + bid.product,
            startTime: new Date(),
            endTime: new Date(new Date().getTime() + 24 * 60 * 60 * 1000),
        });

        sendNotification([bid.buyer], { title: 'Bid Accepted', body: 'Your bid has been accepted' });

        const sameProductBids = await bidSchema.find({ product: bid.product, status: 'pending' });


        for (let i = 0; i < sameProductBids.length; i++) {
            await bidSchema.findByIdAndUpdate(sameProductBids[i]._id, { status: 'rejected' });

            await walletSchema.findOneAndUpdate({ user: sameProductBids[i].buyer }, { $inc: { balance: 10000 } });

            const newTransaction = new transactionSchema({
                user: sameProductBids[i].buyer,
                amount: 10000,
                type: 'credit',
                paymentMethod: 'wallet',
                description: 'Bid rejected',
                status: 'succeeded'
            });

            await newTransaction.save();

            sendNotification([sameProductBids[i].buyer], { title: 'Bid Rejected', body: 'Your bid has been rejected' });

            sendNotification([sameProductBids[i].buyer], { title: 'Amount Credited', body: 'Amount has been credited to your wallet' })

        }


        res.status(200).json({
            message: 'Bid accepted',
            chatId: bid.chatId
        });
    } catch (err) {
        const error = new HttpError(err.message, 500);
        return next(error);
    }
}

const rejectOffer = async (req, res, next) => {
    const { bidId } = req.params;

    try {
        const bid = await bidSchema.findById(bidId);

        if (!bid) {
            const error = new HttpError('Bid not found', 404);
            return next(error);
        }

        await bidSchema.findByIdAndUpdate(bidId, { status: 'rejected' });

        await walletSchema.findOneAndUpdate({ user: bid.buyer }, { $inc: { balance: 10000 } });

        const newTransaction = new transactionSchema({
            user: bid.buyer,
            amount: 10000,
            type: 'credit',
            description: 'Bid rejected',
        });

        await newTransaction.save();

        sendNotification([bid.buyer], { title: 'Bid Rejected', body: 'Your bid has been rejected' });

        sendNotification([bid.buyer], { title: 'Amount Credited', body: 'Amount has been credited to your wallet' })

        res.status(200).json({
            message: 'Bid rejected',
        });

    } catch (err) {
        const error = new HttpError(err.message, 500);
        return next(error);
    }

}

const completeBidSeller = async (req, res, next) => {
    const { bidId } = req.params;

    try {
        const bid = await bidSchema.findById(bidId);

        if (!bid) {
            const error = new HttpError('Bid not found', 404);
            return next(error);
        }

        await bidSchema.findByIdAndUpdate(bidId, {
            sellerComplete: true,
            status: bid.buyerComplete ? 'completed' : 'accepted',
        });

        if (bid.buyerComplete) {

            const newTransaction = new transactionSchema({
                user: bid.seller,
                amount: 8000,
                type: 'credit',
                description: 'Bid completed',
            })

            const newTransaction2 = new transactionSchema({
                user: bid.buyer,
                amount: 8000,
                type: 'credit',
                description: 'Bid completed',
            })

            await newTransaction.save();
            await newTransaction2.save();

            await walletSchema.findOneAndUpdate({
                user: bid.seller
            }, { $inc: { balance: 8000 } });
            await walletSchema.findOneAndUpdate({
                user: bid.buyer
            }, { $inc: { balance: 8000 } });

            sendNotification([bid.seller, bid.buyer], { title: 'Bid Completed', body: 'Your bid has been completed' });

            sendNotification([bid.seller, bid.buyer], { title: 'Amount Credited', body: 'Amount has been credited to your wallet' })

        } else {
            sendNotification([bid.seller], { title: 'Bid Completed', body: 'Your bid has been completed. Waiting for buyer to complete' });
        }

        res.status(200).json({
            message: 'Bid completed',
        });

    } catch (err) {
        const error = new HttpError(err.message, 500);
        return next(error);
    }
}

const completeBidBuyer = async (req, res, next) => {
    const { bidId } = req.params;

    try {
        const bid = await bidSchema.findById(bidId);

        if (!bid) {
            const error = new HttpError('Bid not found', 404);
            return next(error);
        }

        await bidSchema.findByIdAndUpdate(bidId, {
            buyerComplete: true,
            status: bid.sellerComplete ? 'completed' : 'accepted',
        });

        if (bid.sellerComplete) {
            const newTransaction = new transactionSchema({
                user: bid.seller,
                amount: 8000,
                type: 'credit',
                description: 'Bid completed',
            })

            const newTransaction2 = new transactionSchema({
                user: bid.buyer,
                amount: 8000,
                type: 'credit',
                description: 'Bid completed',
            })

            await newTransaction.save();
            await newTransaction2.save();

            await walletSchema.findOneAndUpdate({ user: bid.seller }, { $inc: { balance: 8000 } });
            await walletSchema.findOneAndUpdate({ user: bid.buyer }, { $inc: { balance: 8000 } });

            sendNotification([bid.seller, bid.buyer], { title: 'Bid Completed', body: 'Your bid has been completed' });

            sendNotification([bid.seller, bid.buyer], { title: 'Amount Credited', body: 'Amount has been credited to your wallet' })

        } else {
            sendNotification([bid.seller], { title: 'Bid Completed', body: 'Your bid has been completed. Waiting for seller to complete' });
        }

        res.status(200).json({
            message: 'Bid completed',
        });

    } catch (err) {
        const error = new HttpError(err.message, 500);
        return next(error);
    }

}

const getBidMessages = async (req, res, next) => {
    const { chatId } = req.params;

    try {
        const messages = await messageSchema.find({ chatId }).populate('user').sort({
            createdAt: -1
        })

        res.status(200).json({ messages });
    } catch (err) {
        const error = new HttpError(err.message, 500);
        return next(error);
    }
}

const sendAMessage = async (req, res, next) => {
    // const { chatId } = req.params;
    const { senderId, receiverId, text, image, chatId, user } = req.body;

    const message = new messageSchema({
        chatId,
        senderId,
        receiverId,
        text,
        image,
        user: senderId,
    });

    try {
        await message.save().then(async (message) => {

            sendMessage(receiverId,
                {
                    _id: message._id,
                    chatId: chatId,
                    senderId,
                    receiverId,
                    text,
                    image,
                    user: user,
                    createdAt: message.createdAt,
                })
        });

        res.status(201).json({ message });
    } catch (err) {
        const error = new HttpError(err.message, 500);
        return next(error);
    }
}

const deleteBid = async (req, res, next) => {
    const { bidId } = req.params;

    try {
        const bid = await bidSchema.findById(bidId);

        if (!bid) {
            const error = new HttpError('Bid not found', 404);
            return next(error);
        }

        await bidSchema.findByIdAndDelete(bidId);

        res.status(200).json({ message: 'Bid deleted' });
    } catch (err) {
        const error = new HttpError(err.message, 500);
        return next(error);
    }
}

module.exports = {
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
    getActiveBids,
    getActiveBidsAdmin
}