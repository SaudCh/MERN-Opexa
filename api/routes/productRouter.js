const {
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
} = require('../controllers/productController')

const router = require('express').Router()
const checkAuth = require('../middleware/checkAuth')

router.post('/', createProduct)
router.get('/', getProducts)
router.get('/:productId', getProductById)
router.patch('/:productId', updateProduct)
router.delete('/:id', deleteProduct)
router.patch('/approve/:productId', approveProduct)
router.patch('/reject/:productId', rejectProduct)
router.patch('/block/:productId', blockProduct)
router.patch('/unblock/:productId', unblockProduct)
router.post('/not-for-sale', notForSale)


router.use(checkAuth)

router.get('/my-products/:userId', myProducts)

module.exports = router
