const express = require('express');
const router = express.Router();

router.use(express.json());

// 도서 추가
router.post('/', (req, res) => {
    res.json('도서 추가');
});

// 도서 전체 목록 조회
router.get('/', (req, res) => {
    res.json('도서 목록 조회');
});

// 개별 도서 조회
router.get('/:id', (req, res) => {
    res.json(`도서 상세 조회: ${req.params.id}`);
});

// 도서 수정
router.put('/:id', (req, res) => {
    res.json(`도서 수정: ${req.params.id}`);
});

// 도서 삭제
router.delete('/:id', (req, res) => {
    res.json(`도서 삭제: ${req.params.id}`);
});

module.exports = router;
