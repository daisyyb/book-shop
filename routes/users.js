const express = require('express');
const router = express.Router();

router.use(express.json());
//join
router.post('/join', (req, res) =>{
    res.json('회원가입')
});
//login
router.post('/login',(req, res) =>{
    res.json('회원가입')
});
//reset req
router.post('/reset',(req, res) =>{
    res.json('회원가입')
});
//reset
router.put('reset',(req, res) =>{
    res.json('회원가입')
});

module.exports = router