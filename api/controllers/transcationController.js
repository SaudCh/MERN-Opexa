const userSchema = require('../models/userSchema')
const HttpError = require('../middleware/httpError')
const walletSchema = require('../models/walletSchema')
const transcationSchema = require('../models/transactionSchema')
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)

const bcrypt = require('bcryptjs')
const stripeSigningSecret = process.env.STRIPE_SIGNING_SECRET

const getUserPayments = async (req, res, next) => {
    try {
        const { id } = req.body
        const { status } = req.query

        const user = await userSchema.findById(id)

        if (!user) return next(new HttpError('User not found', 404))

        let where = { user: id }

        if (status) where.status = status.split(',')


        const transactions = await transcationSchema.find(where).sort({ createdAt: -1 })

        res.status(200).json({
            transactions
        })

    } catch (error) {
        return next(new HttpError(error.message, 500))
    }

}

const getAllPayments = async (req, res, next) => {
    try {

        const { status, paymentMethod } = req.query

        let where = {}

        if (status) where.status = status.split(',')
        if (paymentMethod) where.paymentMethod = paymentMethod.split(',')

        const transactions = await transcationSchema.find(where).sort({ createdAt: -1 }).populate('user')

        res.status(200).json({
            transactions
        })


    } catch (error) {
        return next(new HttpError(error.message, 500))
    }
}

const getPayment = async (req, res, next) => {
    try {
        const { id } = req.params

        const transaction = await transcationSchema.findById(id).populate('user')

        if (!transaction) return next(new HttpError('Transaction not found', 404))

        res.status(200).json({
            transaction
        })

    } catch (error) {
        return next(new HttpError(error.message, 500))
    }
}

const createIntent = async (req, res, next) => {

    const {
        amount,
        currency,
        receipt_email,
        receipt_name,
        description,
        uid
    } = req.body;

    let user;

    try {
        user = await userSchema.findById(uid)
    } catch (err) {
        const error = new HttpError(err.message, 500)
        return next(error)
    }

    if (!user) {
        const error = new HttpError('User not found', 404)
        return next(error)
    }

    const customers = await stripe.customers.list({
        email: receipt_email
    });

    let customer = null;

    if (customers.data.length > 0) {
        customer = customers.data[0];
    } else {
        customer = await stripe.customers.create({
            email: receipt_email,
            name: receipt_name
        });
    }

    const ephemeralKey = await stripe.ephemeralKeys.create(
        { customer: customer.id },
        { apiVersion: '2022-11-15' }
    );

    let paymentIntent

    try {
        paymentIntent = await stripe.paymentIntents.create({
            amount: amount,
            currency: currency ? currency : 'pkr',
            customer: customer.id,
            payment_method_types: ['card'],
            receipt_email: receipt_email,
            description: description,
        });

        const newTransaction = new transcationSchema({
            user: uid,
            type: 'deposit',
            amount: parseFloat(amount).toFixed(2) / 100,
            paymentMethod: 'card',
            currency: currency ? currency : 'usd',
            description,
            email: receipt_email,
            status: 'created',
            transactionDate: Date.now(),

            paymentIntent: paymentIntent.id,
            paymentId: randomText(6),
            clientSecret: paymentIntent.client_secret,
            customer: customer.id,
        })

        await newTransaction.save()

    } catch (error) {
        return next(new HttpError(error.message, 500))
    }

    res.status(201).json({
        paymentIntent: paymentIntent.client_secret,
        ephemeralKey: ephemeralKey.secret,
        customer: customer.id
    });

}

const stripeHook = async (req, res, next) => {
    const sig = req.headers['stripe-signature'];

    let event;
    try {
        event = stripe.webhooks.constructEvent(req.body, sig, stripeSigningSecret);

        let paymentIntent = null;
        switch (event.type) {
            case "payment_intent.created":
                paymentIntent = event.data.object;
                // functions.logger.log("Payment Intent Created", paymentIntent.id);
                break;
            case "payment_intent.succeeded":
                paymentIntent = event.data.object;

                const { amount_received, id } = paymentIntent;

                const amount = parseFloat(amount_received).toFixed(2) / 100

                const transaction = await transcationSchema.findOne({ paymentIntent: id })

                console.log(transaction)

                await transcationSchema.findOneAndUpdate({ paymentIntent: id }, {
                    status: 'succeeded',
                    amount
                })

                await walletSchema.findOneAndUpdate({ user: transaction.user }, {
                    $inc: {
                        balance: amount
                    }
                })

                break;
            case "payment_intent.canceled":
                paymentIntent = event.data.object;
                functions.logger.log("Payment Intent Cancelled", paymentIntent.id);
                break;
            default:
                functions.logger.log("Unhandled event type", event.type);
                break;
        }

        res.json({ received: true });
    } catch (error) {
        console.log(error)
        return next(new HttpError(error.message, 500))
    }
}

const randomText = (length = 6) => {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
};

const createOffline = async (req, res, next) => {

    const {
        amount,
        currency,
        receiptEmail,
        description = 'Byhand Cash Deposit',
        uid,
        rcptnum
    } = req.body;

    let user;

    try {
        user = await userSchema.findById(uid)
    } catch (err) {
        const error = new HttpError(err.message, 500)
        return next(error)
    }

    if (!user) {
        const error = new HttpError('User not found', 404)
        return next(error)
    }

    const newTransaction = new transcationSchema({
        user: uid,
        type: 'deposit',
        amount: amount,
        paymentMethod: 'offline',
        currency: currency ? currency : 'usd',
        description,
        email: receiptEmail,
        status: 'succeeded',
        transactionDate: Date.now(),

        paymentId: rcptnum,
    })

    await walletSchema.findOneAndUpdate({ user: uid }, {
        $inc: {
            balance: amount
        }
    })

    await newTransaction.save()

    res.status(201).json({
        transaction: newTransaction
    });

}

const createCrypto = async (req, res, next) => {

    const {
        amount,
        currency,
        receiptEmail,
        description = 'Crypto Deposit',
        uid,
        screenshot,
    } = req.body;

    let user;

    try {
        user = await userSchema.findById(uid)

        if (!user) return next(new HttpError('User not found', 404))

        const newTransaction = new transcationSchema({
            user: uid,
            type: 'deposit',
            amount: amount,
            paymentMethod: 'crypto',
            currency: currency ? currency : 'usd',
            description,
            email: receiptEmail,
            status: 'pending',
            transactionDate: Date.now(),
            screenshot,
            paymentId: randomText(6),
        })

        await newTransaction.save()

        res.status(201).json({
            transaction: newTransaction
        });

    } catch (error) {
        return next(new HttpError(error.message, 500))
    }

}

const acceptCrypto = async (req, res, next) => {

    const {
        amount,
        id,
        transactionHash,
        uid
    } = req.body;

    try {
        const user = await userSchema.findById(uid)

        if (!user) return next(new HttpError('User not found', 404))

        const transaction = await transcationSchema.findById(id, { status: 'pending' })

        if (!transaction) return next(new HttpError('Transaction not found', 404))

        await transcationSchema.findByIdAndUpdate(id, {
            status: 'succeeded',
            transactionHash,
            amount
        })

        await walletSchema.findOneAndUpdate({ user: uid }, {
            $inc: {
                balance: amount
            }
        })

        res.status(201).json({
            transaction
        });

    } catch (error) {
        return next(new HttpError(error.message, 500))
    }

}

const rejectCrypto = async (req, res, next) => {

    const {
        id,
        uid
    } = req.body;

    try {
        const user = await userSchema.findById(uid)

        if (!user) return next(new HttpError('User not found', 404))

        const transaction = await transcationSchema.findById(id, { status: 'pending' })

        if (!transaction) return next(new HttpError('Transaction not found', 404))

        await transcationSchema.findByIdAndUpdate(id, {
            status: 'failed',
        })

        res.status(201).json({
            transaction
        });

    } catch (error) {
        return next(new HttpError(error.message, 500))
    }

}

module.exports = {
    createIntent,
    stripeHook,
    getPayment,
    getUserPayments,
    getAllPayments,
    createOffline,
    createCrypto,
    acceptCrypto,
    rejectCrypto
}

