const swiperSchema = require("../models/swiperSchema")
const HttpError = require("../middleware/httpError")

const createSwiper = async (req, res, next) => {

    try {
        const { title, date, location, image } = req.body

        const createdSwiper = new swiperSchema({
            title,
            date,
            location,
            image,
            formattedDate: new Date(date)
        })

        await createdSwiper.save()

        res.status(201).json({ message: "Swiper created" })

    } catch (err) {
        return (new HttpError(err.message, 500))
    }

}

const getSwipers = async (req, res, next) => {
    try {
        const swipers = await swiperSchema.find().sort({ formattedDate: 1 })

        res.status(200).json({ swipers })

    } catch (err) {
        return (new HttpError(err.message, 500))
    }

}

const getSwiper = async (req, res, next) => {
    try {
        const { id } = req.params

        const swiper = await swiperSchema.findById(id)

        if (!swiper) return next(new HttpError("Swiper not found", 404))

        res.status(200).json({ swiper })

    } catch (err) {
        return (new HttpError(err.message, 500))
    }

}

const updateSwiper = async (req, res, next) => {

    try {

        const { title, date, location, image, id } = req.body

        const swiper = await swiperSchema.findById(id)

        if (!swiper) return next(new HttpError("Swiper not found", 404))

        await swiperSchema.findByIdAndUpdate(id, {
            title,
            date,
            location,
            image,
            formattedDate: new Date(date)
        })

        res.status(200).json({ message: "Swiper updated" })

    } catch (error) {
        return next(new HttpError(error.message, 500))
    }

}

const deleteSwiper = async (req, res, next) => {
    try {

        const { id } = req.params

        const swiper = await swiperSchema.findById(id)

        if (!swiper) return next(new HttpError("Swiper not found", 404))

        await swiperSchema.findByIdAndDelete(id)

        res.status(200).json({ message: "Swiper deleted" })

    } catch (error) {
        return next(new HttpError(error.message, 500))
    }

}

module.exports = {
    createSwiper,
    getSwipers,
    updateSwiper,
    deleteSwiper,
    getSwiper
}