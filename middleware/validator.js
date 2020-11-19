const { check, validationResult} = require('express-validator');

exports.signupValidator =  [
    //Checks if is not empty
    check('firstName').not().isEmpty().trim().withMessage('All fields required !'),
    check('lastName').not().isEmpty().trim().withMessage('All fields required !'),
    check('username').not().isEmpty().trim().withMessage('All fields required !'),
    check('email').not().isEmpty().trim().withMessage('All fields required !'),
    check('password').not().isEmpty().trim().withMessage('All fields required !'),
    check('password2').not().isEmpty().trim().withMessage('All fields required !'),
    //Check input length
    check('firstName').isLength({min: 2}).withMessage('First/Last name and Username must be at lest 2 characters long !'),
    check('lastName').isLength({min: 2}).withMessage('First/Last name and Username must be at lest 2 characters long !'),
    check('username').isLength({min: 2}).withMessage('First/Last name and Username must be at lest 2 characters long !'),
    check('email')
        .isEmail()
        .normalizeEmail()
        .withMessage('Invalid E-mail'),
    check('password')
        .isLength({min: 6})
        .withMessage('Password must be at lest 6 characters long !'),
]

exports.signinValidator =  [
    check('email')
        .isEmail()
        .normalizeEmail()
        .withMessage('Invalid E-mail'),
    check('password')
        .isLength({min: 6})
        .withMessage('Password must be at lest 6 characters long !'),
]

exports.validatorResult = (req, res, next) => {
    const result = validationResult (req)
    const hasErrors = !result.isEmpty()
    if(hasErrors){
        const firstError = result.array()[0].msg
        return res.status(400).json({
            errorMessage: firstError
        })
    }

    next()
}