const express = require('express');
const router = express.Router();

router.use(express.json());

// 장바구니에 상품 추가
router.post('/', (req, res) => {
    res.json('장바구니에 상품 추가');
});

// 장바구니 조회
router.get('/', (req, res) => {
    res.json('장바구니 조회');
});

// 장바구니 상품 삭제
router.delete('/:id', (req, res) => {
    res.json(`장바구니에서 상품 삭제: ${req.params.id}`);
});

// // 장바구니 조회 추가기능 예정
// router.get('/cart', (req, res) => {
//     res.json('장바구니 조회');
// });

module.exports = router;
