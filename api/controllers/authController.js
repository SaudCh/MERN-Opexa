const userSchema = require('../models/userSchema')
const HttpError = require('../middleware/httpError')
const walletSchema = require('../models/walletSchema')

const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const transporter = require('../middleware/nodemailer')
const notificationSchema = require('../models/notificationSchema')

const signup = async (req, res, next) => {

    const { name, email, password } = req.body

    let existingUser

    try {
        existingUser = await userSchema.findOne({ email: email })

    } catch (err) {
        const error = new HttpError(err.message, 500)
        return next(error)
    }

    if (existingUser) {
        const error = new HttpError('User already exists', 422)
        return next(error)
    }

    let hashedPassword

    try {
        hashedPassword = await bcrypt.hash(password, 12)
    } catch (err) {
        const error = new HttpError(err.message, 500)
        return next(error)
    }

    const newUser = new userSchema({
        name: name,
        email: email,
        password: hashedPassword
    })

    const newWallet = new walletSchema({
        user: newUser._id
    })

    try {
        await newWallet.save()
        await newUser.save()
    } catch (err) {
        const error = new HttpError(err.message, 500)
        return next(error)
    }

    res.status(201).json({ message: 'User created successfully' })

}

const login = async (req, res, next) => {

    const { email, password } = req.body

    let existingUser

    try {
        existingUser = await userSchema.findOne({ email: email })

    } catch (err) {

        const error = new HttpError(err.message, 500)
        return next(error)
    }

    if (!existingUser) {
        const error = new HttpError('Invalid credentials', 401)
        return next(error)
    }

    let isValidPassword = false

    try {
        isValidPassword = await bcrypt.compare(password, existingUser.password)
    } catch (err) {

        const error = new HttpError(err.message, 500)
        return next(error)
    }

    if (!isValidPassword) {
        const error = new HttpError('Invalid credentials', 401)
        return next(error)
    }

    let token;
    try {
        token = jwt.sign({ id: existingUser.id, email: existingUser.email, role: existingUser.role }, process.env.JWT_KEY, { expiresIn: '6h' })

    } catch (err) {
        const error = new HttpError(err.message, 500);
        return next(error);
    }

    res.status(201).json({ message: "Login Success", user: { id: existingUser.id, email: existingUser.email, role: existingUser.role, status: existingUser.status }, token: token });

}

const adminLogin = async (req, res, next) => {

    const { email, password } = req.body

    let existingUser

    try {
        existingUser = await userSchema.findOne({ email: email })

    } catch (err) {

        const error = new HttpError(err.message, 500)
        return next(error)
    }

    if (!existingUser) {
        const error = new HttpError('Invalid credentials', 401)
        return next(error)
    }

    let isValidPassword = false

    try {
        isValidPassword = await bcrypt.compare(password, existingUser.password)
    } catch (err) {

        const error = new HttpError(err.message, 500)
        return next(error)
    }

    if (!isValidPassword) {
        const error = new HttpError('Invalid credentials', 401)
        return next(error)
    }

    if (existingUser.role !== 'admin') return next(new HttpError('Invalid credentials', 401))

    let token;
    try {
        token = jwt.sign({ id: existingUser.id, email: existingUser.email, role: existingUser.role }, process.env.JWT_KEY, { expiresIn: '6h' })

    } catch (err) {
        const error = new HttpError(err.message, 500);
        return next(error);
    }

    res.status(201).json({ message: "Login Success", user: { id: existingUser.id, email: existingUser.email, role: existingUser.role, status: existingUser.status }, token: token });

}

const forgotPassword = async (req, res, next) => {

    try {
        const { email } = req.body

        console.log(email)

        const existingUser = await userSchema.findOne({ email: email })

        if (!existingUser) return next(new HttpError("User not found", 404))

        const token = jwt.sign({ id: existingUser.id, email: existingUser.email }, process.env.JWT_KEY, { expiresIn: '6h' })

        const url = existingUser.role === 'admin' ? `${process.env.ADMIN_URL}/reset-password/${token}` : `${process.env.CLIENT_URL}/reset-password/${token}`

        console.log(token)

        const mailOptions = {
            from: process.env.EMAIL,
            to: email,
            subject: 'Reset Password',
            html: `<h1>Reset Password</h1>
            <p>Click <a href="${url}">here</a> to reset your password</p>`
        }

        const notification = new notificationSchema({
            user: existingUser._id,
            title: "Reset Password",
            message: "Reset Password link sent to your email",
            type: "success"
        })

        await notification.save()

        transporter.sendMail(mailOptions, (err, info) => {
            if (err) {
                console.log(err)
                return next(new HttpError("Something went wrong", 500))
            } else {
                res.status(200).json({ message: "Reset Password link sent to your email" })
            }
        })



    } catch (error) {
        return next(new HttpError(error.message, 500))
    }

}

const resetPassword = async (req, res, next) => {

    try {
        const { password, token } = req.body

        const decodedToken = jwt.verify(token, process.env.JWT_KEY)

        const existingUser = await userSchema.findById(decodedToken.id)

        if (!existingUser) return next(new HttpError("User not found", 404))

        const hashedPassword = await bcrypt.hash(password, 12)

        await userSchema.findByIdAndUpdate(decodedToken.id, { password: hashedPassword })

        res.status(200).json({ message: "Password updated" })

    } catch (error) {
        return next(new HttpError(error.message, 500))
    }

}

const getbasicProfile = async (req, res, next) => {

    try {
        const { id } = req.user

        const user = await userSchema.findById(id, { password: 0 })
        if (!user) return next(new HttpError("User not found", 404))

        res.status(200).json({ user })

    } catch (error) {
        return next(new HttpError(error.message, 500))
    }

}

const updateProfile = async (req, res, next) => {

    try {

        const { id } = req.user

        const {
            name,
            phoneNumber,
            phNumWithCode,
            countryCode,
            city,
            state,
            country,
            birthdate,
            about,
            website,
            facebook,
            instagram,
            twitter,
            avatar
        } = req.body

        const user = await userSchema.findById(id)

        if (!user) return next(new HttpError("User not found", 404))

        await userSchema.findByIdAndUpdate(id, {
            name,
            phoneNumber,
            phNumWithCode,
            countryCode,
            city,
            state,
            country,
            birthdate,
            about,
            website,
            facebook,
            instagram,
            twitter,
            avatar
        })


        res.status(200).json({ message: "Profile updated" })

    } catch (error) {
        return next(new HttpError(error.message, 500))
    }

}


module.exports = {
    signup,
    adminLogin,
    login,
    forgotPassword,
    resetPassword,
    getbasicProfile,
    updateProfile
}