const {
    createSwiper,
    getSwipers,
    updateSwiper,
    deleteSwiper,
    getSwiper
} = require('../controllers/swiperController')

const router = require('express').Router()

router.post('/create-swiper', createSwiper)
router.get('/get-swiper/:id', getSwiper)
router.get('/get-swipers', getSwipers)
router.patch('/update-swiper', updateSwiper)
router.delete('/delete-swiper/:id', deleteSwiper)

module.exports = router