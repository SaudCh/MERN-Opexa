const mongoose = require("mongoose")

const schema = mongoose.Schema

const chatSchema = schema({
    chatId: { type: String, required: true },
    altChatId: { type: String, required: true },
    senderId: { type: String, required: true },
    lastMessage: { type: String, required: true },
    members: [{ type: mongoose.Types.ObjectId, required: true, ref: "user" }],
}, {
    timestamps: true
})


module.exports = mongoose.model("chat", chatSchema)