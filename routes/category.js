const express = require('express')
const router = express.Router()
const categoryController = require('../controllers/category')
const { authenticateJWT } = require('../middleware/authenticator')

router.post('/', authenticateJWT, categoryController.create)
router.get('/', categoryController.findAll)
router.delete('/', authenticateJWT, categoryController.delete)

module.exports = router