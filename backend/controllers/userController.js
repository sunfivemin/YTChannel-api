/**
 *•	컨트롤러(요청 처리/핸들러)
	•	라우터가 호출하면, 실제 비즈니스 로직을 실행
	•	(요청값 검증, 모델 호출, 결과값 응답 등)
	•	실제 데이터 접근/수정은 model에 맡김

예시:
	•	회원가입: req.body 값 검증 → model의 createUser() 호출
	•	로그인: model.getAllUsers() 조회 → 아이디/비번 일치 여부 확인
 */
const userModel = require("../models/user");

// 로그인
exports.login = (req, res) => {
  const { userId, password } = req.body;
  let foundUser = null;

  // 모든 회원 순회, 아이디/비번 일치 회원 찾기
  userModel.getAllUsers().forEach((user) => {
    if (user.userId === userId && user.password === password) {
      foundUser = user;
    }
  });

  // foundUser가 있으면(로그인 성공), 없으면(실패)
  if (isExisted(foundUser)) {
    // 로그인 성공
    res
      .status(200)
      .json({ message: `${foundUser.name}님 환영합니다`, user: foundUser });
  } else {
    // 로그인 실패
    res.status(401).json({ message: "아이디 또는 비밀번호가 틀렸습니다." });
  }
};

/**
 * foundUser가 null/undefined가 아니고, 빈 객체도 아닐 때 true 반환
 */
function isExisted(user) {
  return user && Object.keys(user).length !== 0;
}

// 2. 회원가입
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

// 3. 전체 회원 조회
exports.getAll = (req, res) => {
  res.json(userModel.getAllUsers());
};

// 4. 개별 회원 조회
exports.get = (req, res) => {
  const user = userModel.getUser(req.params.id);
  if (user) res.json(user);
  else res.status(404).json({ error: "사용자를 찾을 수 없습니다." });
};

// 5. 회원 정보 수정
exports.update = (req, res) => {
  const { userId, password, name } = req.body;
  if (!userModel.getUser(req.params.id)) {
    return res.status(404).json({ error: "수정할 사용자가 없습니다." });
  }
  userModel.updateUser(req.params.id, { userId, password, name });
  res.json({ message: `${req.params.id}번 사용자가 수정되었습니다.` });
};

// 6. 회원 삭제
exports.remove = (req, res) => {
  if (userModel.deleteUser(req.params.id)) {
    res.json({ message: `${req.params.id}번 사용자가 삭제되었습니다.` });
  } else {
    res.status(404).json({ error: "삭제할 사용자가 없습니다." });
  }
};
