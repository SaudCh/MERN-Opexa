const users = require('./users');
const socketToId = {};
const EVENTS = require('./events');

const SocketManger = (io) => {
    io.on(EVENTS.CONNECTION, (socket) => {
        console.log('user connected ', socket.id);

        if (!socket.handshake.query.user) return;
        const user = JSON.parse(socket.handshake.query.user);

        users[user.id] = { socketId: socket.id, ...user };
        socketToId[socket.id] = user._id;

        socket.on(EVENTS.DISCONNECT, async () => {
            console.log('user disconnected ', socket.id);
            const userId = socketToId[socket.id];

            delete users[userId];
            delete socketToId[socket.id];
        });
    });
};

const sendMessage = (userId, message) => {
    const socketId = users[userId]?.socketId;
    // console.log(users);
    io.to(socketId).emit(EVENTS.CHAT.MESSAGE, message);
    console.log('message sent');
};

module.exports = SocketManger;
module.exports.sendMessage = sendMessage;
