const express = require('express')
const router = express.Router()
const productController = require('../controllers/product')
const { authenticateJWT } = require('../middleware/authenticator')

router.post('/', authenticateJWT, productController.create)
router.get('/',productController.findAll)
router.get('/latest', productController.findLatest)

router.get('/user/:id', productController.findUserProductsById)

router.get('/store/?search/q=:query', productController.search)
router.get('/store/?filter/cat=:category', productController.filter)
router.get('/store/?sort/by=:option', productController.sort)

router.get('/details/:id', productController.findById)
router.put('/update', authenticateJWT, productController.update)
router.put('/update/inCart/:id', authenticateJWT, productController.updateInCart)
router.get('/check/inCart', authenticateJWT, productController.checkIfInCart)
router.delete('/:id', authenticateJWT, productController.delete)



module.exports = router