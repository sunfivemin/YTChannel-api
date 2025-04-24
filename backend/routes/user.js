/**
 *•	라우터(주소/메서드 관리)
	•	어떤 URL(경로)과 HTTP 메서드에 어떤 로직을 실행할지 지정.
	•	실제 요청이 들어오면 controller 함수를 실행.

예시:
	•	POST /join → userController.join 호출
	•	POST /login → userController.login 호출
	•	GET /users → userController.getAll 호출
 */
const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

// 회원가입
router.post("/join", userController.join);
// 로그인
router.post("/login", userController.login);
// 전체 조회
router.get("/users", userController.getAll);
// 체이닝 (개별 조회/수정/삭제)
router
  .route("/users/:id")
  .get(userController.get)
  .put(userController.update)
  .delete(userController.remove);

module.exports = router;
