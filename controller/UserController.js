const conn = require('../mariadb');
const { StatusCodes } = require('http-status-codes');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const bcrypt = require('bcrypt');

dotenv.config();
const saltRounds = 10;

const join = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(StatusCodes.BAD_REQUEST).json({ error: "이메일과 비밀번호를 입력해주세요." });
        }
        
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        
        let sql = 'INSERT INTO users (email, password) VALUES (?,?)';
        let values = [email, hashedPassword];
        
        conn.query(sql, values, (err, results) => {
            if (err) {
                console.log(err);
                return res.status(StatusCodes.BAD_REQUEST).json({ error: "회원가입 실패" });
            }
            res.status(StatusCodes.CREATED).json({ message: "회원가입 성공" });
        });
    } catch (error) {
        console.log(error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: "서버 오류" });
    }
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(StatusCodes.BAD_REQUEST).json({ error: "이메일과 비밀번호를 입력해주세요." });
        }
        
        let sql = 'SELECT * FROM users WHERE email = ?';
        let values = [email];

        conn.query(sql, values, async (err, results) => {
            if (err) {
                console.log(err);
                return res.status(StatusCodes.BAD_REQUEST).json({ error: "로그인 실패" });
            }
            
            const loginUser = results[0];
            if (!loginUser) {
                return res.status(StatusCodes.UNAUTHORIZED).json({ error: "존재하지 않는 이메일입니다." });
            }
            
            const match = await bcrypt.compare(password, loginUser.password);
            if (!match) {
                return res.status(StatusCodes.UNAUTHORIZED).json({ error: "비밀번호가 일치하지 않습니다." });
            }
            
            const token = jwt.sign({ email: loginUser.email }, process.env.PRIVATE_KEY, {
                expiresIn: '5m',
                issuer: "songa"
            });
            
            res.cookie("token", token, { httpOnly: true });
            console.log("신규 토큰 발행 : " + token);
            
            return res.status(StatusCodes.OK).json({ message: "로그인 성공", token });
        });
    } catch (error) {
        console.log(error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: "서버 오류" });
    }
};

const passwordReset = async (req, res) => {
    try {
        const { email, newPassword } = req.body;
        if (!email || !newPassword) {
            return res.status(StatusCodes.BAD_REQUEST).json({ error: "이메일과 새로운 비밀번호를 입력해주세요." });
        }
        
        const hashedPassword = await bcrypt.hash(newPassword, saltRounds);
        
        let updateSql = 'UPDATE users SET password = ? WHERE email = ?';
        let updateValues = [hashedPassword, email];

        conn.query(updateSql, updateValues, (err, updateResults) => {
            if (err) {
                console.log(err);
                return res.status(StatusCodes.BAD_REQUEST).json({ error: "비밀번호 변경 실패" });
            }
            res.status(StatusCodes.OK).json({ message: "비밀번호가 성공적으로 변경되었습니다." });
        });
    } catch (error) {
        console.log(error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: "서버 오류" });
    }
};

// 비밀번호 초기화 요청
const passwordResetRequest = async (req, res) => {
    try {
        const { email } = req.body;

        let sql = 'SELECT * FROM users WHERE email = ?';
        let values = [email];

        conn.query(sql, values, (err, results) => {
            if (err) {
                console.log(err);
                return res.status(StatusCodes.BAD_REQUEST).json({ error: "비밀번호 초기화 요청 실패" });
            }

            const user = results[0];
            if (!user) {
                return res.status(StatusCodes.NOT_FOUND).json({ error: "이메일을 찾을 수 없습니다." });
            }

            // 이메일이 일치하면 비밀번호 변경을 위한 응답
            res.status(StatusCodes.OK).json({ message: "이메일이 확인되었습니다. 새로운 비밀번호를 설정하세요." });
        });
    } catch (error) {
        console.log(error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: "서버 오류" });
    }
};

module.exports = {
    join,
    login,
    passwordResetRequest,
    passwordReset
};
