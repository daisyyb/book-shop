const express = require('express');
const router = express.Router();

router.use(express.json());

// 주문 추가
router.post('/', (req, res) => {
    res.json('주문 추가');
});

// 주문 조회
router.get('/', (req, res) => {
    res.json('주문 조회');
});

// 주문 삭제
router.delete('/:id', (req, res) => {
    res.json(`주문 삭제: ${req.params.id}`);
});

module.exports = router;
