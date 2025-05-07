const router = require('express').Router();

const {
    registerUser,
    loginUser,
} = require('../services/auth');

const {
    registerUserValidator,
    loginUserValidator,
} = require('../utils/authValidator');

router.route('/register')
    .post(
        registerUserValidator,
        registerUser
    );
router.route('/login')
    .post(
        loginUserValidator,
        loginUser
    );

module.exports = router;