const conn = require('../db');

// 공통 응답 함수: 404
const notFoundChannel = (res) => {
  return res.status(404).json({ message: '채널을 찾을 수 없습니다.' });
};

// 1. 채널 생성
exports.create = (req, res) => {
  const { name, userId } = req.body;
  const sql = 'INSERT INTO channels (name, user_id) VALUES (?, ?)';

  conn.query(sql, [name, userId], (err, result) => {
    if (err) {
      console.error('채널 생성 실패:', err);
      return res.status(500).json({ message: '채널 생성 실패' });
    }

    res.status(201).json({
      message: `${name} 님 채널 개설을 축하합니다!`,
      id: result.insertId,
    });
  });
};

// 2. 채널 개별 조회
exports.get = (req, res) => {
  const id = req.params.id;
  const sql = 'SELECT * FROM channels WHERE id = ?';

  conn.query(sql, [id], (err, results) => {
    if (err) return res.status(500).json({ message: '채널 조회 실패' });
    if (results.length === 0) return notFoundChannel(res);
    res.status(200).json(results[0]);
  });
};

// 3. 채널 수정
exports.update = (req, res) => {
  const id = req.params.id;
  const { name } = req.body;
  const sql = 'UPDATE channels SET name = ? WHERE id = ?';

  conn.query(sql, [name, id], (err, result) => {
    if (err) {
      console.error('채널 수정 실패:', err);
      return res.status(500).json({ message: 'DB 오류' });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({
        message: '해당 ID의 채널이 없거나 수정할 내용이 없습니다.',
      });
    }

    res.status(200).json({
      message: `${id}번 채널명이 '${name}'으로 수정되었습니다.`,
    });
  });
};

// 4. 채널 삭제
exports.remove = (req, res) => {
  const id = req.params.id;
  const sql = 'DELETE FROM channels WHERE id = ?';

  conn.query(sql, [id], (err, result) => {
    if (err) {
      console.error('삭제 오류:', err);
      return res.status(500).json({ message: '삭제 실패' });
    }

    if (result.affectedRows === 0) {
      return res
        .status(404)
        .json({ message: '해당 채널이 존재하지 않습니다.' });
    }

    res.status(200).json({ message: `${id}번 채널이 삭제되었습니다.` });
  });
};

// 5. 특정 유저의 채널 전체 조회
exports.getAllByUser = (req, res) => {
  const userId = req.query.userId;
  const sql = 'SELECT * FROM channels WHERE user_id = ?';

  conn.query(sql, [userId], (err, results) => {
    if (err) return res.status(500).json({ message: '조회 실패' });
    if (results.length === 0) {
      return res
        .status(404)
        .json({ message: '해당 사용자의 채널이 없습니다.' });
    }
    res.status(200).json(results);
  });
};

// 6. 전체 채널 모두 조회
exports.getAll = (req, res) => {
  const sql = 'SELECT * FROM channels';

  conn.query(sql, (err, results) => {
    if (err) return res.status(500).json({ message: '전체 조회 실패' });
    res.status(200).json(results);
  });
};
