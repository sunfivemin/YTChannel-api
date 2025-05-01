const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const { body, param, validationResult, query } = require("express-validator");

// 회원가입
router.post(
  "/join",
  [
    body("email").isEmail().withMessage("이메일 형식이 아닙니다."),
    body("name").notEmpty().withMessage("이름은 필수입니다."),
    body("password").notEmpty().withMessage("비밀번호는 필수입니다."),
    body("contact").notEmpty().withMessage("연락처는 필수입니다."),
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() });

    userController.join(req, res);
  }
);

// 로그인
router.post(
  "/login",
  [
    body("email").isEmail().withMessage("이메일 형식이 아닙니다."),
    body("password").notEmpty().withMessage("비밀번호는 필수입니다."),
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() });

    userController.login(req, res);
  }
);

// 전체 조회 또는 이메일로 단일 조회
router.get(
  "/",
  [query("email").optional().isEmail().withMessage("이메일 형식이 아닙니다.")],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() });

    if (req.query.email) {
      return userController.getByEmail(req, res);
    } else {
      return userController.getAll(req, res);
    }
  }
);

// 개별 조회 (ID)
router.get(
  "/:id",
  [param("id").isInt().withMessage("숫자 ID가 필요합니다.")],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() });

    userController.get(req, res);
  }
);

// 수정
router.put(
  "/:id",
  [
    param("id").isInt().withMessage("숫자 ID가 필요합니다."),
    body("name").notEmpty().withMessage("이름을 입력해주세요."),
    body("password").notEmpty().withMessage("비밀번호는 필수입니다."),
    body("contact").notEmpty().withMessage("연락처는 필수입니다."),
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() });

    userController.update(req, res);
  }
);

// 삭제
router.delete(
  "/:id",
  [param("id").isInt().withMessage("숫자 ID가 필요합니다.")],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() });

    userController.remove(req, res);
  }
);

module.exports = router;
