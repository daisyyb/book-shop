
//express 모듈듈
const express = require('express');
const app = express();


// dotenv 모듈
const dotenv = require('dotenv')
dotenv.config();

app.listen(process.env.PORT);// 기왕이면 유의미한 번호로 하자자

// 라우터 불러오기
const userRouter = require('./routes/users');
const bookRouter = require('./routes/books'); 
const likeRouter = require('./routes/likes');
const cartRouter = require('./routes/carts');
const orderRouter = require('./routes/orders'); 

// 라우터 등록
app.use("/users", userRouter);
app.use("/books", bookRouter);
app.use("/likes", likeRouter);
app.use("/carts", cartRouter);
app.use("/orders", orderRouter);

