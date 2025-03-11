const express = require('express');
const router = express.Router();
const conn = require('../mariadb');
const { statusCodes, StatusCodes } = require('http-status-codes');
const {
    join,
    login,
    passwordResetRequest,
    passwordReset
} = require('../controller/UserController');

router.use(express.json());

//join
router.post('/join', join);

//login
router.post('/login', login);

//reset req
router.post('/reset', passwordResetRequest);

//reset
router.put('/reset', passwordReset);

module.exports = router