const productSchema = require("../models/productSchema")
const HttpError = require("../middleware/httpError")
const userSchema = require("../models/userSchema")
const walletSchema = require("../models/walletSchema")
const transcationSchema = require("../models/transactionSchema")

const createProduct = async (req, res, next) => {
    const {
        title,
        description,
        price,
        images,
        location,
        category,
        subcategory,
        furthercategory,
        user,
        expert,
        inputs,
        inputsData,
        city,
        state,
        area,
        stateCode,
    } = req.body

    const usr = await userSchema.findById(user)

    if (!usr) {
        const error = new HttpError("User not found", 404)
        return next(error)
    }

    const wallet = await walletSchema.findOne({ user })

    if (!wallet) {
        const error = new HttpError("Wallet not found", 404)
        return next(error)
    }

    const ductedAmount = expert ? 10000 : 200

    if (wallet.balance < ductedAmount) {
        const error = new HttpError("Insufficient balance", 404)
        return next(error)
    }

    await walletSchema.findByIdAndUpdate(wallet._id, {
        $inc: { balance: -ductedAmount }
    })

    const newtranscation = new transcationSchema({
        user,
        amount: -ductedAmount,
        type: "debit",
        description: "Product creation fee",
        status: "succeeded",
        paymentMethod: "wallet",
        email: usr.email,
        paymentId: randomText(6)
    })

    await newtranscation.save()

    const product = new productSchema({
        title,
        description,
        price,
        images,
        location,
        category,
        subcategory,
        furthercategory,
        user,
        expert,
        inputs,
        inputsData,
        city,
        state,
        area,
        stateCode,
    })

    try {
        await product.save()
        res.status(201).json({ product })
    } catch (err) {
        const error = new HttpError(err.message, 500)
        return next(error)
    }
}

const notForSale = async (req, res, next) => {
    const {
        title,
        description,
        price,
        images,
        location,
        category,
        subcategory,
        furthercategory,
        user,
        expert,
        inputs,
        inputsData,
        city,
        state,
        area,
        stateCode,
    } = req.body

    const usr = await userSchema.findById(user)

    if (!usr) {
        const error = new HttpError("User not found", 404)
        return next(error)
    }

    const product = new productSchema({
        title,
        description,
        price,
        images,
        location,
        category,
        subcategory,
        furthercategory,
        user,
        expert,
        inputs,
        inputsData,
        city,
        state,
        area,
        stateCode,
        status: 'not-for-sale'
    })

    try {
        await product.save()
        res.status(201).json({ product })
    } catch (err) {
        const error = new HttpError(err.message, 500)
        return next(error)
    }
}

const randomText = (length = 6) => {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
};

const getProducts = async (req, res, next) => {
    let products

    const { status = "active", user } = req.query
    let where = { status: 'active', isDeleted: false }
    if (status) where.status = status.split(',')

    console.log(where)

    if (user) where.user = { $ne: user }

    try {
        products = await productSchema.find(where).populate('user', { name: 1, email: 1, createdAt: 1, avatar: 1 }).populate('category').populate('subcategory').populate('furthercategory')
    } catch (err) {
        const error = new HttpError(err.message, 500)
        return next(error)
    }

    res.status(200).json({ products })

}

const getProductById = async (req, res, next) => {
    console.log("Get product by id")
    const { productId } = req.params
    console.log(productId)

    let product

    try {
        product = await productSchema.findById(productId).populate('user', { name: 1, email: 1, createdAt: 1, avatar: 1 }).populate('category').populate('subcategory').populate('furthercategory')
    } catch (err) {
        const error = new HttpError(err.message, 500)
        return next(error)
    }

    if (!product) {
        const error = new HttpError("Product not found", 404)
        return next(error)
    }

    if (product.isDeleted) {
        const error = new HttpError("Product not found", 404)
        return next(error)
    }

    res.status(200).json({ product })

}

const updateProduct = async (req, res, next) => {
    const { productId } = req.params

    const body = req.body

    let product

    try {
        product = await productSchema.findById(productId)

        if (!product) {
            const error = new HttpError("Product not found", 404)
            return next(error)
        }

        if (product.isDeleted) {
            const error = new HttpError("Product not found", 404)
            return next(error)
        }

        await productSchema.findByIdAndUpdate(productId, body)

    } catch (err) {
        const error = new HttpError(err.message, 500)
        return next(error)
    }

    res.status(200).json({ product })
}

const deleteProduct = async (req, res, next) => {
    const { id } = req.params

    let product

    try {
        product = await productSchema.findById(id)

        if (!product) {
            const error = new HttpError("Product not found", 404)
            return next(error)
        }

        if (product.isDeleted) {
            const error = new HttpError("Product not found", 404)
            return next(error)
        }

        await productSchema.findByIdAndUpdate(id, { isDeleted: true, status: "deleted" })

    } catch (err) {
        const error = new HttpError(err.message, 500)
        return next(error)
    }

    res.status(200).json({ product })
}

const myProducts = async (req, res, next) => {
    const { userId } = req.params

    const { status = 'active,pending,blocked' } = req.query



    let products

    try {
        products = await productSchema.find({ user: userId, isDeleted: false, status: status.split(',') }).populate('user', { name: 1, email: 1, createdAt: 1, avatar: 1 }).populate('category').populate('subcategory').populate('furthercategory')
    } catch (err) {
        const error = new HttpError(err.message, 500)
        return next(error)
    }

    res.status(200).json({ products })
}

const approveProduct = async (req, res, next) => {
    const { productId } = req.params
    try {
        const product = productSchema.findById(productId)

        if (!product) {
            const error = new HttpError("Product not found", 404)
            return next(error)
        }

        if (product.isDeleted) {
            const error = new HttpError("Product not found", 404)
            return next(error)
        }

        await productSchema.findByIdAndUpdate(productId, { status: "active" })

        res.status(200).json({ message: "Product approved" })

    } catch (err) {
        const error = new HttpError(err.message, 500)
        return next(error)
    }
}

const rejectProduct = async (req, res, next) => {
    const { productId } = req.params
    try {
        const product = productSchema.findById(productId)

        if (!product) {
            const error = new HttpError("Product not found", 404)
            return next(error)
        }

        if (product.isDeleted) {
            const error = new HttpError("Product not found", 404)
            return next(error)
        }

        await productSchema.findByIdAndUpdate(productId, { status: "rejected" })

        res.status(200).json({ message: "Product rejected" })


    } catch (err) {
        const error = new HttpError(err.message, 500)
        return next(error)
    }
}

const blockProduct = async (req, res, next) => {
    const { productId } = req.params
    try {
        const product = productSchema.findById(productId)

        if (!product) {
            const error = new HttpError("Product not found", 404)
            return next(error)
        }

        if (product.isDeleted) {
            const error = new HttpError("Product not found", 404)
            return next(error)
        }

        await productSchema.findByIdAndUpdate(productId, { status: "blocked" })

        res.status(200).json({ message: "Product blocked" })

    } catch (err) {
        const error = new HttpError(err.message, 500)
        return next(error)
    }
}

const unblockProduct = async (req, res, next) => {
    const { productId } = req.params
    try {
        const product = productSchema.findById(productId)

        if (!product) {
            const error = new HttpError("Product not found", 404)
            return next(error)
        }

        if (product.isDeleted) {
            const error = new HttpError("Product not found", 404)
            return next(error)
        }

        await productSchema.findByIdAndUpdate(productId, { status: "active" })

        res.status(200).json({ message: "Product unblocked" })

    } catch (err) {
        const error = new HttpError(err.message, 500)
        return next(error)
    }
}

module.exports = {
    createProduct,
    getProducts,
    getProductById,
    updateProduct,
    deleteProduct,
    myProducts,
    approveProduct,
    rejectProduct,
    blockProduct,
    unblockProduct,
    notForSale
}