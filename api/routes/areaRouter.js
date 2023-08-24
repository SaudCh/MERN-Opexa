const {
    createArea,
    getAreas,
    getAreaById,
    updateArea,
    deleteArea
} = require('../controllers/areaController')

const router = require('express').Router()
const checkAuth = require('../middleware/checkAuth')

router.get('/', getAreas)
router.get('/:areaId', getAreaById)
router.post('/', checkAuth, createArea)
router.patch('/:areaId', checkAuth, updateArea)
router.delete('/:areaId', checkAuth, deleteArea)

module.exports = router
