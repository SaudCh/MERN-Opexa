const furthercategorySchema = require("../models/furthercategorySchema")
const categorySchema = require("../models/categorySchema")
const subcategorySchema = require("../models/subcategorySchema")
const HttpError = require("../middleware/httpError")

const createFurtherCategory = async (req, res, next) => {
    const { name, category, subcategory, inputs } = req.body
    let furthercategory
    try {
        furthercategory = new furthercategorySchema({
            name,
            category,
            subcategory,
            inputs
        })
    } catch (err) {
        return (new HttpError(err.message, 500))
    }
    try {
        await furthercategory.save()
    } catch (err) {
        const error = new HttpError(err.message, 500)
        return next(error)
    }
    res.status(201).json({ furthercategory: furthercategory.toObject({ getters: true }) })
}

const getFurtherCategories = async (req, res, next) => {
    let furthercategories

    const { category, subcategory } = req.query

    let where = { isDeleted: false }

    if (category) where.category = category
    if (subcategory) where.subcategory = subcategory

    try {
        furthercategories = await furthercategorySchema.find(where).populate("category").populate("subcategory")
    } catch (err) {
        return (new HttpError(err.message, 500))
    }
    res.json({ furthercategories: furthercategories.map(furthercategory => furthercategory.toObject({ getters: true })) })
}

const getFurtherCategoryById = async (req, res, next) => {
    const furthercategoryId = req.params.id
    let furthercategory
    try {
        furthercategory = await furthercategorySchema.findById(furthercategoryId).populate("category").populate("subcategory")
    } catch (err) {
        return (new HttpError(err.message, 500))
    }
    if (!furthercategory) {
        const error = new HttpError("Could not find further category for the provided id.", 404)
        return next(error)
    }
    res.json({ furthercategory: furthercategory.toObject({ getters: true }) })
}

const updateFurtherCategory = async (req, res, next) => {
    const { name, inputs } = req.body
    const furthercategoryId = req.params.id
    let furthercategory
    try {
        furthercategory = await furthercategorySchema.findById(furthercategoryId)
    } catch (err) {
        return (new HttpError(err.message, 500))
    }
    if (!furthercategory) {
        const error = new HttpError("Could not find further category for the provided id.", 404)
        return next(error)
    }

    try {
        await furthercategorySchema.findByIdAndUpdate(furthercategoryId, { name, inputs })
    } catch (err) {
        return (new HttpError(err.message, 500))
    }
    res.status(200).json({ furthercategory: furthercategory.toObject({ getters: true }) })
}

const deleteFurtherCategory = async (req, res, next) => {
    const furthercategoryId = req.params.id
    let furthercategory
    try {
        furthercategory = await furthercategorySchema.findById(furthercategoryId)
    } catch (err) {
        return (new HttpError(err.message, 500))
    }
    if (!furthercategory) {
        const error = new HttpError("Could not find further category for the provided id.", 404)
        return next(error)
    }

    try {
        await furthercategorySchema.findByIdAndUpdate(furthercategoryId, { isDeleted: true })
    } catch (err) {
        return (new HttpError(err.message, 500))
    }
    res.status(200).json({ message: "Deleted further category." })
}

module.exports = {
    createFurtherCategory,
    getFurtherCategories,
    getFurtherCategoryById,
    updateFurtherCategory,
    deleteFurtherCategory
}