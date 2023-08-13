const {
    createFurtherCategory,
    getFurtherCategories,
    getFurtherCategoryById,
    updateFurtherCategory,
    deleteFurtherCategory
} = require('../controllers/furthercategoryController')

const express = require('express')
const router = express.Router()

router.post('/', createFurtherCategory)
router.get('/', getFurtherCategories)
router.get('/:id', getFurtherCategoryById)
router.patch('/:id', updateFurtherCategory)
router.delete('/:id', deleteFurtherCategory)

module.exports = router