const userSchema = require("../models/userSchema")
const HttpError = require('../middleware/httpError')
const productSchema = require("../models/productSchema")

const getWishlist = async (req, res, next) => {

    try {
        const { id } = req.user

        let user = await userSchema.findById(id)

        if (!user) return next(new HttpError("User not found", 404))

        if (!user.wishlist.length) return res.status(200).json({ wishlist: [] })

        const wishlist = await productSchema.find({ _id: { $in: user.wishlist }, isDeleted: false }).populate("host")

        res.status(200).json({ wishlist })

    } catch (error) {
        return next(new HttpError(error.message, 500))
    }

}

const addToWishlist = async (req, res, next) => {

    try {

        const { id } = req.user

        const { productId } = req.body

        const user = await userSchema.findById(id)

        if (!user) return next(new HttpError("User not found", 404))

        await userSchema.findByIdAndUpdate(id, { $addToSet: { wishlist: productId } })

        res.status(200).json({ message: "Product added to wishlist" })

    } catch (error) {
        return next(new HttpError(error.message, 500))
    }

}

const removeFromWishlist = async (req, res, next) => {

    try {

        const { id } = req.user

        const { productId } = req.params

        const user = await userSchema.findById(id)

        if (!user) return next(new HttpError("User not found", 404))

        await userSchema.findByIdAndUpdate(id, { $pull: { wishlist: productId } })

        res.status(200).json({ message: "Product removed from wishlist" })

    } catch (error) {
        return next(new HttpError(error.message, 500))
    }

}

module.exports = {
    getWishlist,
    addToWishlist,
    removeFromWishlist
}