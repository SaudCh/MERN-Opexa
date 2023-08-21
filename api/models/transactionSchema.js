const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true },
    type: { type: String, enum: ['deposit', 'withdrawal', 'debit'], required: true },
    amount: { type: Number, required: true },
    paymentMethod: { type: String, required: true },
    description: { type: String },
    email: { type: String },
    status: { type: String, default: 'pending' },
    transactionDate: { type: Date, default: Date.now },
    // for stripe transaction
    paymentIntent: { type: String },
    paymentId: { type: String },
    clientSecret: { type: String },
    currency: { type: String },
    // for by hand cash transaction
    // rcptnum: { type: String },
    // for crypto transaction
    cryptoAddress: { type: String },
    screenshot: { type: String },
    transactionHash: { type: String },
}, {
    timestamps: true
});

const Transaction = mongoose.model('transaction', transactionSchema);

module.exports = Transaction;
