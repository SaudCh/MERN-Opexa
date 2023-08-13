const {
    createRetreat,
    getRetreats,
    getRetreatById,
    updateRetreat,
    searchRetreats,
    deleteRetreat,
    myRetreat
} = require('../controllers/retreatController')

const router = require('express').Router()
const checkAuth = require('../middleware/checkAuth')

router.post('/create', createRetreat)
router.get('/get', getRetreats)
router.get('/get/:id', getRetreatById)
router.patch('/update/:id', updateRetreat)
router.post('/search', searchRetreats)
router.delete('/delete/:id', deleteRetreat)


router.use(checkAuth)
router.get('/my-retreat', myRetreat)


module.exports = router
