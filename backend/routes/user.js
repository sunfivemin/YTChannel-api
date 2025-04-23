const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

// 회원가입
router.post("/join", userController.join);

// 전체 조회
router.get("/users", userController.getAll);

// /users/:id 체이닝 패턴
router
  .route("/users/:id")
  .get(userController.get)
  .put(userController.update)
  .delete(userController.remove);

module.exports = router;
