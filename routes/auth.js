const express = require('express')
const router = express.Router()
const { signupValidator, signinValidator,validatorResult } = require("../middleware/validator")
const { signupController, signinController, cartController, userController, imgController } = require("../controllers/auth")
const { authenticateJWT } = require('../middleware/authenticator')



//Sign up/in
router.post('/signup', signupValidator, validatorResult, signupController)
router.post('/signin', signinValidator, validatorResult, signinController)

//Profile
router.get('/:id', userController.findById)
router.put('/avatar', authenticateJWT, imgController.uploadAvatar)

//Cart
router.put('/cart/:id/save', cartController.saveCart)


module.exports = router