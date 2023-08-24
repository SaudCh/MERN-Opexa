const areaSchema = require('../models/areaSchema')
const HttpError = require('../middleware/httpError')

const createArea = async (req, res, next) => {
    const { name, city, state, stateCode } = req.body
    const area = new areaSchema({
        name,
        city,
        state,
        stateCode
    })
    try {
        await area.save()
        res.status(201).json({ area })
    } catch (err) {
        const error = new HttpError('Creating area failed, please try again', 500)
        return next(error)
    }
}

const getAreas = async (req, res, next) => {

    const { city } = req.query

    let where = {}
    if (city) where.city = city

    try {
        const areas = await areaSchema.find(where)
        res.status(200).json({ areas })
    } catch (err) {
        const error = new HttpError('Fetching areas failed, please try again', 500)
        return next(error)
    }
}

const getAreaById = async (req, res, next) => {
    const { areaId } = req.params

    try {
        const area = await areaSchema.findById(areaId)
        res.status(200).json({ area })
    } catch (err) {
        const error = new HttpError(err.message, 500)
        return next(error)
    }

}

const updateArea = async (req, res, next) => {
    const { areaId } = req.params
    const { name, city, state, stateCode } = req.body

    try {
        const area = await areaSchema.findById(areaId)

        if (!area) {
            const error = new HttpError('Area not found', 404)
            return next(error)
        }

        await areaSchema.findByIdAndUpdate(areaId, {
            name: name || area.name,
            city: city || area.city,
            state: state || area.state,
            stateCode: stateCode || area.stateCode
        })

        res.status(200).json({ area })
    } catch (err) {
        const error = new HttpError('Updating area failed, please try again', 500)
        return next(error)
    }
}

const deleteArea = async (req, res, next) => {
    const { areaId } = req.params

    try {
        await areaSchema.findByIdAndDelete(areaId)
        res.status(200).json({ message: 'Area deleted successfully' })
    } catch (err) {
        const error = new HttpError('Deleting area failed, please try again', 500)
        return next(error)
    }
}

module.exports = {
    createArea,
    getAreas,
    getAreaById,
    updateArea,
    deleteArea
}