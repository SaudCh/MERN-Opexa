const mongoose = require("mongoose")

const schema = mongoose.Schema

const areaSchema = schema({
    seller: { type: schema.Types.ObjectId, ref: "user" },
    buyer: { type: schema.Types.ObjectId, ref: "user" },
    product: { type: schema.Types.ObjectId, ref: "product" },
    offeredProducts: [{ type: schema.Types.ObjectId, ref: "product" }],
    status: { type: String, enum: ["pending", "accepted", "rejected", "completed", "issued"], default: "pending" },
    total: { type: Number },
    cash: { type: Number },
    startTime: { type: Date },
    endTime: { type: Date },
    sellerComplete: { type: Boolean, default: false },
    buyerComplete: { type: Boolean, default: false },
    chatId: { type: String },
}, {
    timestamps: true
})


module.exports = mongoose.model("bids", areaSchema)