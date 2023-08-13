const {
    createSubcategory,
    getSubcategories,
    deleteSubcategory,
    updateSubcategory,
    getSubcategory
} = require('../controllers/subcategoryController');
const express = require('express');

const router = express.Router();

router.post('/', createSubcategory);
router.get('/', getSubcategories);
router.get('/:id', getSubcategory);
router.delete('/:id', deleteSubcategory);
router.patch('/:id', updateSubcategory);

module.exports = router;