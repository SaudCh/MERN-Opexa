const productSchema = require("../models/productSchema")
const HttpError = require("../middleware/httpError")

const createProduct = async (req, res, next) => {
    const {
        name, description, location,
        city, state, country,
        inputs, images, status,
        user, category, subcategory,
        furthercategory, price
    } = req.body

    const product = new productSchema({
        name,
        description,
        location,
        city,
        state,
        country,
        inputs,
        images,
        status,
        user
    })

    try {
        await product.save()
        res.status(201).json({ product })
    } catch (err) {
        const error = new HttpError(err.message, 500)
        return next(error)
    }
}

const getProducts = async (req, res, next) => {
    let products

    try {
        products = await productSchema.find({ isDeleted: false, status: "active" })
    } catch (err) {
        const error = new HttpError(err.message, 500)
        return next(error)
    }

    res.status(200).json({ products })

}

const getProductById = async (req, res, next) => {
    const { productId } = req.params

    let product

    try {
        product = productSchema.findById(productId)
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
    const { productId } = req.params

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

        await productSchema.findByIdAndUpdate(productId, { isDeleted: true })

    } catch (err) {
        const error = new HttpError(err.message, 500)
        return next(error)
    }

    res.status(200).json({ product })
}

const myProducts = async (req, res, next) => {
    const { userId } = req.params

    let products

    try {
        products = await productSchema.find({ user: userId, isDeleted: false })
    } catch (err) {
        const error = new HttpError(err.message, 500)
        return next(error)
    }

    res.status(200).json({ products })
}

module.exports = {
    createProduct,
    getProducts,
    getProductById,
    updateProduct,
    deleteProduct,
    myProducts
}