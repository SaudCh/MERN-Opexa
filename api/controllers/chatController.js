const chatSchema = require("../models/chatSchema")
const HttpError = require("../middleware/httpError")
const userSchema = require("../models/userSchema")
const messageSchema = require("../models/messageSchema")
const { sendMessage } = require("../sockets/socketManager")

const getChatList = async (req, res, next) => {
    const { userId } = req.query

    try {
        const user = await userSchema.findById(userId)

        if (!user) return next(new HttpError("User not found", 404))

        const chatList = await chatSchema.find({ members: { $in: [userId] } }).populate("members", "name email avatar").sort({ updatedAt: -1 })

        res.status(200).json({ chatList })

    } catch (error) {
        return next(new HttpError(error.message, 500))
    }
}

const getChat = async (req, res, next) => {
    const { chatId } = req.params

    try {
        const chat = await chatSchema.findOne({
            $or: [
                { chatId },
                { altChatId: chatId }
            ]
        }).populate("members", "name email")


        if (!chat) return res.status(200).json({ chat: null, messages: [] })

        const messages = await messageSchema.find({ chatId: chat.chatId }).populate("user", "name email").sort({ createdAt: -1 })

        res.status(200).json({ chat, messages })

    } catch (error) {
        return next(new HttpError(error.message, 500))
    }
}

const getMessages = async (req, res, next) => {

    const { chatId } = req.params
    try {
        const messages = await messageSchema.find({ chatId }).populate("user", "name email avatar")
        res.status(200).json({ messages })
    } catch (error) {
        return next(new HttpError(error.message, 500))
    }

}

const sendAMessage = async (req, res, next) => {

    const { chatId, altChatId, senderId, receiverId, text, user } = req.body

    try {

        const chat = await chatSchema.findOne({
            $or: [
                { chatId },
                { chatId: altChatId }
            ]
        }).populate("members", "name email avatar")

        if (!chat) {
            const newChat = new chatSchema({
                chatId,
                altChatId,
                members: [senderId, receiverId],
                senderId,
                user: senderId,
                lastMessage: text
            })

            await newChat.save()

        } else {
            await chatSchema.updateOne({ chatId: chat.chatId }, { lastMessage: text })
        }

        let nc = await chatSchema.findOne({
            $or: [
                { chatId },
                { chatId: altChatId }
            ]
        }).populate("members", "name email avatar")

        nc = nc.toObject({ getters: true })

        const newMessage = new messageSchema({
            chatId: nc.chatId,
            senderId,
            receiverId,
            text,
            user: senderId,
        })
        await newMessage.save().then(() => {
            sendMessage(receiverId,
                {
                    _id: newMessage._id,
                    chatId: nc.chatId,
                    senderId,
                    receiverId,
                    text,
                    user: user,
                    createdAt: newMessage.createdAt,
                },
                {
                    ...nc,
                    lastMessage: text,
                    updatedAt: newMessage.createdAt,
                })
        })


        res.status(201).json({ message: 'Message sent successfully' })


    } catch (error) {
        return next(new HttpError(error.message, 500))
    }

}

const sendImage = async (req, res, next) => {

    const { chatId, altChatId, senderId, receiverId, image, user } = req.body

    try {

        const chat = await chatSchema.findOne({
            $or: [
                { chatId },
                { chatId: altChatId }
            ]
        }).populate("members", "name email avatar")

        if (!chat) {
            const newChat = new chatSchema({
                chatId,
                altChatId,
                members: [senderId, receiverId],
                senderId,
                user: senderId,
                lastMessage: "Sent a Image"
            })

            await newChat.save()

            // return res.status(201).json({ message: 'Message sent successfully' })
        } else {
            await chatSchema.updateOne({ chatId: chat.chatId }, { lastMessage: "Sent a Image" })
        }


        let nc = await chatSchema.findOne({
            $or: [
                { chatId },
                { chatId: altChatId }
            ]
        }).populate("members", "name email avatar")

        nc = nc.toObject({ getters: true })


        const newMessage = new messageSchema({
            chatId: nc.chatId,
            senderId,
            receiverId,
            image,
            user: senderId,
        })
        await newMessage.save().then(() => {
            sendMessage(receiverId, {
                _id: newMessage._id,
                chatId: nc.chatId,
                senderId,
                receiverId,
                image,
                user: user,
                createdAt: newMessage.createdAt,
            }, {
                ...nc,
                lastMessage: "Sent a Image",
                updatedAt: newMessage.createdAt,
            })
        })


        res.status(201).json({ message: 'Message sent successfully' })


    } catch (error) {
        console.log(error)
        return next(new HttpError(error.message, 500))
    }


}

module.exports = {
    getChatList,
    getChat,
    getMessages,
    sendAMessage,
    sendImage
}