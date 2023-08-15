const mongoose = require("mongoose")

const schema = mongoose.Schema

const messageSchema = schema({
    chatId: { type: String, required: true },
    senderId: { type: String, required: true },
    receiverId: { type: String, required: true },
    // sender: { type: mongoose.Types.ObjectId, required: true, ref: "user" },
    // receiver: { type: mongoose.Types.ObjectId, required: true, ref: "user" },
    text: { type: String, required: true },
    isRead: { type: Boolean, default: false },
    user: { type: mongoose.Types.ObjectId, required: true, ref: "user" },
}, {
    timestamps: true
})


module.exports = mongoose.model("messages", messageSchema)