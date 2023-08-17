const {
    createProduct,
    getProducts,
    getProductById,
    updateProduct,
    deleteProduct,
    myProducts
} = require('../controllers/productController')

const router = require('express').Router()
const checkAuth = require('../middleware/checkAuth')

router.post('/', createProduct)
router.get('/', getProducts)
router.get('/:id', getProductById)
router.patch('/:id', updateProduct)
router.delete('/:id', deleteProduct)

router.use(checkAuth)

router.get('/my-products/:userId', myProducts)

module.exports = router
