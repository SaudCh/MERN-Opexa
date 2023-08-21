const userSchema = require('../models/userSchema')
const HttpError = require('../middleware/httpError')

const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const transporter = require('../middleware/nodemailer')
const notificationSchema = require('../models/notificationSchema')
const productSchema = require('../models/productSchema')

const getAllUsers = async (req, res, next) => {
    let users

    const { role, er, status } = req.query

    let where = {}

    if (role) where.role = role

    if (status) where.status = status.split(',')

    if (er) where.editorRequest = er.split(',')

    try {
        users = await userSchema.find(where, { name: 1, email: 1, role: 1, avatar: 1, name: 1, editorRequest: 1, status: 1 })
    }
    catch (err) {
        const error = new HttpError(err.message, 500)
        return next(error)
    }

    res.status(201).json({ users: users })
}

const getUserById = async (req, res, next) => {
    try {
        const { id } = req.params

        const user = await userSchema.findById(id, { name: 1, email: 1, role: 1, avatar: 1, firstname: 1, lastname: 1 })

        if (!user) return next(new HttpError("User not found", 404))

        res.status(200).json({ user: user })

    } catch (err) {
        return new HttpError(err.message, 500)
    }

}

const getUserByEmail = async (req, res, next) => {
    try {
        const { email } = req.params

        const user = await userSchema.findOne({ email: email }, { name: 1, email: 1, role: 1, avatar: 1, name: 1 })

        if (!user) return next(new HttpError("User not found", 404))

        res.status(200).json({ user: user })

    } catch (error) {
        return new HttpError(error.message, 500)
    }
}

const updateStatus = async (req, res, next) => {
    try {
        const { id, status } = req.body

        const user = await userSchema.findById(id)

        if (!user) return next(new HttpError("User not found", 404))

        await userSchema.findByIdAndUpdate(id, { status: status })

        res.status(200).json({ message: "Status updated" })

    } catch (err) {
        return new HttpError(err.message, 500)
    }

}

const inviteUser = async (req, res, next) => {

    try {
        const { email } = req.body
        const exisitingUser = await userSchema.findOne({ email: email })

        if (exisitingUser) {

            if (exisitingUser.role === 'editor' || exisitingUser.role === 'admin') return next(new HttpError("User already invited", 400))

            const token = jwt.sign({ email: email, role: 'editor', id: exisitingUser._id }, process.env.JWT_KEY, { expiresIn: '6h' })

            await userSchema.findByIdAndUpdate(exisitingUser._id, { editorRequest: 'pending' })

            const mailOptions = {
                from: process.env.EMAIL,
                to: email,
                subject: 'Invitation to join the team',
                html: `<p>You have been invited to join the team. Please click the link below to accept the invitation</p>
                <a href="${process.env.ADMIN_URL}/accept-invitation/${token}">Accept Invitation</a>`
            }

            transporter.sendMail(mailOptions, (err, info) => {
                if (err) return next(new HttpError(err.message, 500))
                else {
                    res.status(200).json({ message: "Invitation sent" })
                }
            }
            )
        } else {

            // create random password for user
            const password = Math.random().toString(36).slice(-8)

            const hashedPassword = await bcrypt.hash(password, 12)


            const newUser = new userSchema({
                email: email,
                password: hashedPassword,
                editorRequest: 'pending'
            })

            await newUser.save()

            const token = jwt.sign({ id: newUser._id, email: email, role: 'editor' }, process.env.JWT_KEY, { expiresIn: '6h' })

            const mailOptions = {
                from: process.env.EMAIL,
                to: email,
                subject: 'Invitation to join the team',
                html: `<p>You have been invited to join the team. Please click the link below to accept the invitation</p>
                <p>Your one time password is ${password}</p>
                <a href="${process.env.ADMIN_URL}/accept-invitation/${token}">Accept Invitation</a>`
            }

            transporter.sendMail(mailOptions, (err, info) => {
                if (err) return next(new HttpError(err.message, 500))
                else {
                    res.status(200).json({ message: "Invitation sent" })
                }

            })

        }
    } catch (error) {
        return next(new HttpError(error.message, 500))
    }

}

const acceptInvitation = async (req, res, next) => {
    try {
        const { token } = req.body

        const decodedToken = jwt.verify(token, process.env.JWT_KEY)

        const { id, email, role } = decodedToken

        const existingUser = await userSchema.findById(id)

        if (!existingUser) return next(new HttpError("User not found", 404))

        if (existingUser.editorRequest === 'active') return next(new HttpError("User already accepted invitation", 400))
        if (existingUser.editorRequest === 'blocked') return next(new HttpError("Invitation removed by admin", 400))

        await userSchema.findByIdAndUpdate(id, { role: role, editorRequest: 'active' })

        const newNotification = new notificationSchema({
            user: id,
            message: "You have been added to the team",
            link: "/",
            read: false
        })

        await newNotification.save()

        res.status(200).json({ message: "Invitation accepted" })

    } catch (error) {
        return next(new HttpError(error.message, 500))
    }

}

const removeInvitation = async (req, res, next) => {

    try {
        const { id } = req.params

        const existingUser = await userSchema.findById(id)

        if (!existingUser) return next(new HttpError("User not found", 404))

        if (existingUser.editorRequest === 'active') return next(new HttpError("User already accepted invitation", 400))

        await userSchema.findByIdAndUpdate(id, { editorRequest: 'blocked' })

        res.status(200).json({ message: "Invitation removed" })

    } catch (error) {
        return next(new HttpError(error.message, 500))
    }

}

const sellerProfile = async (req, res, next) => {
    try {
        const { id } = req.params

        const user = await userSchema.findById(id, { password: 0, status: 0 })

        if (!user) return next(new HttpError("User not found", 404))

        const products = await productSchema.find({ user: id, status: 'active' })

        res.status(200).json({ user: user, products: products })

    } catch (error) {
        return next(new HttpError(error.message, 500))
    }

}

module.exports = {
    getAllUsers,
    getUserById,
    inviteUser,
    acceptInvitation,
    removeInvitation,
    updateStatus,
    getUserByEmail,
    sellerProfile
}