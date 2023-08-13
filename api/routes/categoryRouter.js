const {
    createCategory,
    getCategories,
    deleteCategory,
    updateCategory,
    getCategory
} = require('../controllers/categoryController')

const router = require('express').Router()

router.post('/', createCategory)
router.get('/', getCategories)
router.get('/:id', getCategory)
router.delete('/:id', deleteCategory)
router.patch('/:id', updateCategory)

module.exports = router