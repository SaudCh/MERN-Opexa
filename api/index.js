const dotenv = require('dotenv')
dotenv.config()

// const cookieSession = require('cookie-session')
const session = require('express-session');
const passport = require('passport')

const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const cors = require('cors')
const http = require('http');
const socketIo = require("socket.io");


const HttpError = require('./middleware/httpError')
const path = require('path')



const app = express()
const server = http.createServer(app);


const port = process.env.PORT || 5000
const url = ""


const corsOptions = {
    origin: [process.env.CLIENT_URL, process.env.ADMIN_URL, "http://localhost:5173", "http://localhost:5174"],
    credentials: true,
    optionSuccessStatus: 200
}

app.use(cors(corsOptions))

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.use('/uploads', express.static(path.join(__dirname, 'uploads')))
app.use('/assets', express.static(path.join(__dirname, '../admin/dist/assets')))

const io = socketIo(server, {
    cors: {
        origin: "*",
    },
    pingTimeout: 4000,
    pingInterval: 12000,
});

global.io = io;
require("./sockets/socketManager")(io);

// app.use('/api/retreat', require('./routes/retreatRouter'))
app.use('/api/auth', require('./routes/authRouter'))
app.use('/api/user', require('./routes/userRouter'))
app.use('/api/chat', require('./routes/chatRouter'))
app.use('/api/category', require('./routes/categoryRouter'))
app.use('/api/subcategory', require('./routes/subcatergoryRouter'))
app.use('/api/furthercategory', require('./routes/furthercategoryRouter'))
app.use('/api/notification', require('./routes/notificationRouter'))
app.use('/api/transcation', require('./routes/transcationRouter'))
app.use('/api/swiper', require('./routes/swiperRouter'))
app.use('/api/wishlist', require('./routes/wishlistRouter'))
app.use('/api', require('./routes/'))

app.use(express.static(path.join(__dirname, "../admin/dist")))
app.get('/*', function (req, res) {
    res.sendFile(
        path.resolve(__dirname, "../admin/dist/index.html"),
        function (err) {
            if (err) {
                res.status(500).send(err);
            }
        }
    )
})

app.use((req, res, next) => {
    const error = new HttpError("Could not find this route.", 404);
    return next(error);
});

app.use((error, req, res, next) => {
    if (res.headerSent) {
        return next(error);
    }
    res.status(error.code || 500);
    res.json({ message: error.message || "An unknown error occurred!" });
});

mongoose
    .connect(process.env.MONGODB_URI || url)
    .then(() => {
        server.listen(port, () => {
            console.log("App started on " + port)
        })
        console.log("Connected to Database")
    }).catch((err) => {
        console.log("Error Occured", err)
    })