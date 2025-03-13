const conn = require('../mariadb');
const { StatusCodes } = require('http-status-codes');

// SQL 실행 함수 분리
const executeQuery = (res, sql, params = []) => {
    conn.query(sql, params, (err, results) => {
        if (err) {
            console.log(err);
            return res.status(StatusCodes.BAD_REQUEST).end();
        }

        if (results.length > 0) {
            return res.status(StatusCodes.OK).json(results);
        } else {
            return res.status(StatusCodes.NOT_FOUND).end();
        }
    });
};

// 전체 도서 조회 (페이징 추가)
const allBooks = (req, res) => {
    let { category_id, news, currentPage = 1, itemsPerPage = 10 } = req.query;

    // itemsPerPage 유효성 검사 (1 이상 100 이하로 제한)
    itemsPerPage = Math.min(Math.max(parseInt(itemsPerPage), 1), 100);

    let sql = "SELECT * FROM books";
    let params = [];

    // 페이지네이션 설정
    const offset = (currentPage - 1) * itemsPerPage;

    if (category_id) {
        sql += " WHERE category_id = ?";
        params.push(category_id);
        
        // news가 존재하면 한 달 내 출판된 책만 조회 (pub_date 사용)
        if (news) {
            sql += " AND pub_date >= DATE_SUB(NOW(), INTERVAL 1 MONTH)";
        }
    } else if (news) {
        // 카테고리 없이 news만 있을 경우, 전체에서 한 달 내 출판된 책 조회
        sql += " WHERE pub_date >= DATE_SUB(NOW(), INTERVAL 1 MONTH)";
    }

    // 페이징을 위한 LIMIT과 OFFSET 추가 (문자열이 아닌 숫자로 처리)
    sql += " ORDER BY pub_date DESC LIMIT ? OFFSET ?";
    params.push(parseInt(itemsPerPage), parseInt(offset));

    executeQuery(res, sql, params);
};

// 도서 상세 조회
const booksDetail = (req, res) => {
    let { id } = req.params;
    let sql = `SELECT * FROM books LEFT JOIN category ON books.category_id = category.id WHERE books.id = ?`;
    executeQuery(res, sql, [id]);
};

module.exports = {
    allBooks,
    booksDetail,
};
