const subcategorySchema = require("../models/subcategorySchema")
const categorySchema = require("../models/categorySchema")
const HttpError = require("../middleware/httpError")

const createSubcategory = async (req, res, next) => {

    const { name, category } = req.body

    const newSubcategory = new subcategorySchema({
        name: name,
        category: category
    })

    try {
        await newSubcategory.save()

        await categorySchema.findByIdAndUpdate(category, { $push: { subcategories: newSubcategory._id } })

    } catch (err) {
        const error = new HttpError(err.message, 500)
        return next(error)
    }

    res.status(201).json({ message: 'Subcategory created successfully' })

}

const getSubcategories = async (req, res, next) => {

    let subcategories

    const { category } = req.query

    let where = { isDeleted: false }

    if (category) where.category = category

    try {
        subcategories = await subcategorySchema.find(where).populate('category')
    } catch (err) {
        const error = new HttpError(err.message, 500)
        return next(error)
    }

    res.status(200).json({ subcategories: subcategories })
}

const getSubcategory = async (req, res, next) => {
    try {

        const { id } = req.params

        let subcategory = await subcategorySchema.findById(id).populate('category')

        if (!subcategory) {
            const error = new HttpError('Subcategory not found', 404)
            return next(error)
        }

        res.status(200).json({ subcategory: subcategory })

    } catch (error) {
        return next(HttpError(error.message, 500))
    }
}

const deleteSubcategory = async (req, res, next) => {

    const { id } = req.params

    let subcategory

    try {
        subcategory = await subcategorySchema.findById(id)
    } catch (err) {
        const error = new HttpError(err.message, 500)
        return next(error)
    }

    if (!subcategory) {
        const error = new HttpError('Subcategory not found', 404)
        return next(error)
    }

    try {
        await subcategorySchema.findByIdAndUpdate(id, { isDeleted: true })
    } catch (err) {
        const error = new HttpError(err.message, 500)
        return next(error)
    }

    res.status(200).json({ message: 'Subcategory deleted successfully' })
}

const updateSubcategory = async (req, res, next) => {

    try {

        const { id } = req.params

        const { name, inputs, category } = req.body

        let subcategory = await subcategorySchema.findById(id)

        if (!subcategory) {
            const error = new HttpError('Subcategory not found', 404)
            return next(error)
        }

        if (subcategory.category != category) {

            await categorySchema.findByIdAndUpdate(subcategory.category, { $pull: { subcategories: id } })

            await categorySchema.findByIdAndUpdate(category, { $push: { subcategories: id } })

        }

        await subcategorySchema.findByIdAndUpdate(id, req.body)

        res.status(200).json({ message: 'Subcategory updated successfully' })

    } catch (error) {
        return next(HttpError(error.message, 500))
    }



}

module.exports = {
    createSubcategory,
    getSubcategories,
    deleteSubcategory,
    updateSubcategory,
    getSubcategory
}