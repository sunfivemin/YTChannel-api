const conn = require("../db");

// 404 응답 전용 함수
function notFoundChannel(res) {
  res.status(404).json({ message: "채널을 찾을 수 없습니다." });
}

// 1. 채널 생성 (POST /channels)
exports.create = (req, res) => {
  const { userId, channelTitle } = req.body;
  if (!userId || !channelTitle) {
    return res
      .status(400)
      .json({ message: "userId와 channelTitle이 필요합니다." });
  }

  const sql = "INSERT INTO channels (user_id, channel_title) VALUES (?, ?)";
  conn.query(sql, [userId, channelTitle], (err, result) => {
    if (err) return res.status(500).json({ message: "채널 생성 실패" });

    res.status(201).json({
      message: `${channelTitle} 채널이 생성되었습니다.`,
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
  const { channelTitle } = req.body;

  // 먼저 기존 채널 존재 확인
  conn.query("SELECT * FROM channels WHERE id = ?", [id], (err, results) => {
    if (err) return res.status(500).json({ message: "조회 실패" });
    if (results.length === 0) return notFoundChannel(res);

    const oldTitle = results[0].channel_title;

    // 실제 수정
    const updateSql = "UPDATE channels SET channel_title = ? WHERE id = ?";
    conn.query(updateSql, [channelTitle, id], (err) => {
      if (err) return res.status(500).json({ message: "수정 실패" });

      res.json({
        message: `채널명이 수정되었습니다. 기존: "${oldTitle}" → 변경: "${channelTitle}"`,
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

// 6. 전체 채널 모두 조회 (GET /channels/all)
exports.getAll = (req, res) => {
  conn.query("SELECT * FROM channels", (err, results) => {
    if (err) return res.status(500).json({ message: "전체 조회 실패" });
    res.json(results);
  });
};
