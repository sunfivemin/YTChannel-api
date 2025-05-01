/**
 * • 컨트롤러: 요청 처리 핸들러
 * • 비즈니스 로직 실행 (검정, DB 조회/삽입, 응답 구성)
 */
const conn = require("../db");

// 공통 404 처리 함수
function notFoundUser(res) {
  res.status(404).json({ message: "사용자를 찾을 수 없습니다." });
}

// 회원가입
exports.join = (req, res) => {
  const { email, name, password, contact } = req.body;

  const sql = `SELECT * FROM users WHERE email = ?`;
  conn.query(sql, [email], (err, results) => {
    if (err) {
      console.error("구도 오류:", err);
      return res.status(500).json({ message: "DB 조회 실패" });
    }

    if (results.length > 0) {
      return res.status(409).json({ message: "이미 가입된 이메일입니다." });
    }

    const insertSql = `INSERT INTO users (email, name, password, contact) VALUES (?, ?, ?, ?)`;
    conn.query(insertSql, [email, name, password, contact], (err, result) => {
      if (err) {
        console.error("회원가입 실패:", err);
        return res.status(500).json({ message: "회원가입 실패" });
      }

      res.status(201).json({
        message: `${name}님, 환영합니다.`,
        id: result.insertId,
      });
    });
  });
};

// 로그인
exports.login = (req, res) => {
  const { email, password } = req.body;

  const sql = `SELECT * FROM users WHERE email = ?`;
  conn.query(sql, [email], (err, results) => {
    if (err) {
      console.error("로그인 구도 오류:", err);
      return res.status(500).json({ message: "DB 오류" });
    }

    if (results.length === 0) return notFoundUser(res);

    const loginUser = results[0];

    if (loginUser.password === password) {
      return res.status(200).json({
        message: `${loginUser.name}님 로그인 되었습니다.`,
        user: loginUser,
      });
    } else {
      return res
        .status(400)
        .json({ message: "이메일 또는 비밀번호가 틀렸습니다." });
    }
  });
};

// 전체 회원 조회
exports.getAll = (req, res) => {
  const sql = `SELECT * FROM users`;
  conn.query(sql, (err, results) => {
    if (err) return res.status(500).json({ message: "전체 조회 실패" });
    res.json(results);
  });
};

// 개별 회원 조회
exports.get = (req, res) => {
  const id = req.params.id;
  const sql = `SELECT * FROM users WHERE id = ?`;
  conn.query(sql, [id], (err, results) => {
    if (err) return res.status(500).json({ message: "조회 실패" });
    if (results.length === 0) return notFoundUser(res);

    res.json(results[0]);
  });
};

// 이메일로 개별 회원 조회 (추가)
exports.getByEmail = (req, res) => {
  const email = req.query.email;
  if (!email) return res.status(400).json({ message: "email가 필수합니다." });

  const sql = `SELECT * FROM users WHERE email = ?`;
  conn.query(sql, [email], (err, results) => {
    if (err) return res.status(500).json({ message: "DB 오류" });
    if (results.length === 0)
      return res
        .status(404)
        .json({ message: "해당 사용자를 찾을 수 없습니다." });

    res.status(200).json(results[0]);
  });
};

// 회원 수정
exports.update = (req, res) => {
  const id = req.params.id;
  const { name, password, contact } = req.body;

  const sql = `UPDATE users SET name = ?, password = ?, contact = ? WHERE id = ?`;
  const values = [name, password, contact, id];

  conn.query(sql, values, (err, result) => {
    if (err) return res.status(500).json({ message: "수정 실패" });
    if (result.affectedRows === 0) return notFoundUser(res);

    res.json({ message: `${id}번 사용자가 수정되었습니다.` });
  });
};

// 회원 삭제
exports.remove = (req, res) => {
  const id = req.params.id;
  const sql = `DELETE FROM users WHERE id = ?`;
  conn.query(sql, [id], (err, result) => {
    if (err) return res.status(500).json({ message: "삭제 실패" });
    if (result.affectedRows === 0) return notFoundUser(res);

    res.json({ message: `${id}번 사용자가 삭제되었습니다.` });
  });
};
