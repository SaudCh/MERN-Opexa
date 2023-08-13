const {
    getChat,
    getChatList,
    getMessages,
    sendAMessage
} = require('../controllers/chatController')

const express = require('express');
const router = express.Router();

router.get('/get-chat-list', getChatList);
router.get('/get-chat/:chatId', getChat);
router.get('/get-messages/:chatId', getMessages);
router.post('/send-message', sendAMessage);


module.exports = router;