const categorySchema = require("../models/categorySchema")
const HttpError = require("../middleware/httpError")

const createCategory = async (req, res, next) => {
    const { name, image } = req.body

    const newCategory = new categorySchema({
        name: name,
        image: image,
    })

    try {
        await newCategory.save()
    } catch (err) {
        const error = new HttpError(err.message, 500)
        return next(error)
    }

    res.status(201).json({ message: 'Category created successfully' })

}

const getCategories = async (req, res, next) => {

    let categories

    try {
        categories = await categorySchema.find({ isDeleted: false })
    } catch (err) {
        const error = new HttpError(err.message, 500)
        return next(error)
    }

    res.status(200).json({ categories: categories })
}

const getCategory = async (req, res, next) => {

    const { id } = req.params

    try {

        const category = await categorySchema.findById(id)

        if (!category || category.isDeleted) {
            const error = new HttpError('Category not found', 404)
            return next(error)
        }

        res.status(200).json({ category: category })

    } catch (error) {
        const err = new HttpError(error.message, 500)
        return next(err)
    }

}

const deleteCategory = async (req, res, next) => {

    const { id } = req.params

    let category

    try {
        category = await categorySchema.findById(id)
    } catch (err) {
        const error = new HttpError(err.message, 500)
        return next(error)
    }

    if (!category) {
        const error = new HttpError('Category not found', 404)
        return next(error)
    }

    try {
        await categorySchema.findByIdAndUpdate(id, { isDeleted: true })
    } catch (err) {
        const error = new HttpError(err.message, 500)
        return next(error)
    }

    res.status(200).json({ message: 'Category deleted successfully' })
}

const updateCategory = async (req, res, next) => {

    try {
        const { id } = req.params
        const { name, inputs } = req.body

        let category = await categorySchema.findById(id)

        if (!category) {
            const error = new HttpError('Category not found', 404)
            return next(error)
        }

        await categorySchema.findByIdAndUpdate(id, { name, inputs })

        res.status(200).json({ message: 'Category updated successfully' })

    } catch (error) {
        const err = new HttpError(error.message, 500)
        return next(err)
    }
}

module.exports = {
    createCategory,
    getCategories,
    deleteCategory,
    updateCategory,
    getCategory
}