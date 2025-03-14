// express 모듈
const express = require('express');
const app = express();

// dotenv 모듈
const dotenv = require('dotenv');
dotenv.config();

// JSON 요청 본문을 처리할 수 있도록 설정
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 요청 로그 미들웨어를 라우터 등록 전에 위치시키기
app.use((req, res, next) => {
    // URL에서 불필요한 공백 및 줄 바꿈 문자 제거
    req.url = req.url.replace(/\s+/g, ''); // 공백 문자 제거
    console.log(`📌 요청: ${req.method} ${req.url}`);
    next();  // 요청이 라우터로 넘어가도록 해야 함
});

// 라우터 불러오기
const userRouter = require('./routes/users');
const bookRouter = require('./routes/books');
const categoryRouter = require('./routes/category');
const likeRouter = require('./routes/likes');
const cartRouter = require('./routes/carts');
const orderRouter = require('./routes/orders');

// 라우터 등록
app.use("/users", userRouter);
app.use("/books", bookRouter);
app.use("/category", categoryRouter);
app.use("/likes", likeRouter);
app.use("/carts", cartRouter);
app.use("/orders", orderRouter);

// 서버 실행 (라우터 등록 후 listen 호출)
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`서버가 http://localhost:${PORT} 에서 정상 실행 중입니다.`);
});
