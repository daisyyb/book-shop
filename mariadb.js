//mysql 모듈 소환
const maraiadb = require('mysql2');

//db connect
const connection = maraiadb.createConnection({
    host : '127.0.0.1',
    user : 'root',
    password : 'root',
    database : 'Bookshop',
    dateStrings: true // ✅ 올바른 옵션
});

module.exports = connection;