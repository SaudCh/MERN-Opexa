const mongoose = require('mongoose');

const walletSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    balance: { type: Number, default: 0 },
}, {
    timestamps: true,
});

const Wallet = mongoose.model('wallet', walletSchema);

module.exports = Wallet;
