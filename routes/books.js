const express = require('express');
const router = express.Router();

const {
    allBooks,
    booksDetail,
    booksByCategory
} = require('../controller/BookController')

router.use(express.json());

// 도서 전체 목록 조회
router.get('/', allBooks);

// 개별 도서 조회
router.get('/:id', booksDetail);






module.exports = router;
