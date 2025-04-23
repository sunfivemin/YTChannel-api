const userModel = require("../models/user");

// 회원가입
exports.join = (req, res) => {
  const { userId, password, name } = req.body;
  if (userId && password && name) {
    const id = userModel.createUser({ userId, password, name });
    res.status(201).json({ message: `${name}님, 환영합니다.`, id });
  } else {
    res
      .status(400)
      .json({ message: "userId, password, name을 모두 입력해주세요." });
  }
};

// 전체 조회
exports.getAll = (req, res) => {
  res.json(userModel.getAllUsers());
};

// 개별 조회
exports.get = (req, res) => {
  const user = userModel.getUser(req.params.id);
  if (user) res.json(user);
  else res.status(404).json({ error: "사용자를 찾을 수 없습니다." });
};

// 수정
exports.update = (req, res) => {
  const { userId, password, name } = req.body;
  if (!userModel.getUser(req.params.id)) {
    return res.status(404).json({ error: "수정할 사용자가 없습니다." });
  }
  userModel.updateUser(req.params.id, { userId, password, name });
  res.json({ message: `${req.params.id}번 사용자가 수정되었습니다.` });
};

// 삭제
exports.remove = (req, res) => {
  if (userModel.deleteUser(req.params.id)) {
    res.json({ message: `${req.params.id}번 사용자가 삭제되었습니다.` });
  } else {
    res.status(404).json({ error: "삭제할 사용자가 없습니다." });
  }
};
