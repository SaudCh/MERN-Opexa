const {
    getWishlist,
    addToWishlist,
    removeFromWishlist
} = require('../controllers/wishlistController')

const router = require('express').Router()

const checkAuth = require('../middleware/checkAuth')

router.use(checkAuth)

router.get('/', getWishlist)
router.post('/', addToWishlist)
router.delete('/:productId', removeFromWishlist)

module.exports = router
