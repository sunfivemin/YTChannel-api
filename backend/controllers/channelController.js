const conn = require("../db");

// 404 응답 전용 함수
function notFoundChannel(res) {
  res.status(404).json({ message: "채널을 찾을 수 없습니다." });
}

// 1. 채널 생성 (POST /channels)
exports.create = (req, res) => {
  const { name, userId } = req.body;

  // 유효성 검사: 빈 값 또는 숫자가 아닌 userId 거르기
  if (!name || !userId || isNaN(Number(userId))) {
    return res
      .status(400)
      .json({ message: "name과 숫자 userId가 필요합니다." });
  }

  const sql = `INSERT INTO channels (name, user_id) VALUES (?, ?)`;
  const values = [name, userId];

  conn.query(sql, values, (err, result) => {
    if (err) {
      console.error("채널 생성 실패:", err);
      return res.status(500).json({ message: "채널 생성 실패" });
    }

    res.status(201).json({
      message: `${name} 님 채널 개설을 축하합니다!`,
      id: result.insertId,
    });
  });
};

// 2. 채널 개별 조회 (GET /channels/:id)
exports.get = (req, res) => {
  const id = req.params.id;
  const sql = "SELECT * FROM channels WHERE id = ?";

  conn.query(sql, [id], (err, results) => {
    if (err) return res.status(500).json({ message: "조회 실패" });
    if (results.length === 0) return notFoundChannel(res);

    res.json(results[0]);
  });
};

// 3. 채널 수정 (PUT /channels/:id)
exports.update = (req, res) => {
  const id = req.params.id;
  const { name } = req.body;

  if (!name) {
    return res.status(400).json({ message: "수정할 name을 입력해주세요." });
  }

  // 먼저 기존 채널 존재 확인
  conn.query("SELECT * FROM channels WHERE id = ?", [id], (err, results) => {
    if (err) return res.status(500).json({ message: "조회 실패" });
    if (results.length === 0) return notFoundChannel(res);

    const oldName = results[0].name;

    // 실제 수정
    const updateSql = "UPDATE channels SET name = ? WHERE id = ?";
    conn.query(updateSql, [name, id], (err) => {
      if (err) return res.status(500).json({ message: "수정 실패" });

      res.json({
        message: `채널명이 수정되었습니다. 기존: "${oldName}" → 변경: "${name}"`,
      });
    });
  });
};

// 4. 채널 삭제 (DELETE /channels/:id)
exports.remove = (req, res) => {
  const id = req.params.id;

  // 존재 여부 확인
  conn.query("SELECT * FROM channels WHERE id = ?", [id], (err, results) => {
    if (err) return res.status(500).json({ message: "삭제 전 확인 실패" });
    if (results.length === 0) return notFoundChannel(res);

    // 삭제
    conn.query("DELETE FROM channels WHERE id = ?", [id], (err) => {
      if (err) return res.status(500).json({ message: "삭제 실패" });

      res.json({ message: "채널이 삭제되었습니다." });
    });
  });
};

// 5. 특정 유저의 채널 전체 조회 (GET /channels?userId=1)
exports.getAllByUser = (req, res) => {
  const userId = req.query.userId;
  if (!userId) {
    return res.status(400).json({ message: "userId가 필요합니다." });
  }

  const sql = "SELECT * FROM channels WHERE user_id = ?";
  conn.query(sql, [userId], (err, results) => {
    if (err) return res.status(500).json({ message: "조회 실패" });
    if (results.length === 0)
      return res
        .status(404)
        .json({ message: "해당 사용자의 채널이 없습니다." });

    res.status(200).json(results);
  });
};

// 6. 전체 채널 모두 조회 (GET /channels)
exports.getAll = (req, res) => {
  conn.query("SELECT * FROM channels", (err, results) => {
    if (err) return res.status(500).json({ message: "전체 조회 실패" });
    res.json(results);
  });
};
