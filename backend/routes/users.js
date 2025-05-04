const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { body, param, query } = require('express-validator');
const validate = require('../middlewares/validate');

// 회원가입
router.post(
  '/join',
  [
    body('email').isEmail().withMessage('이메일 형식이 아닙니다.'),
    body('name').notEmpty().withMessage('이름은 필수입니다.'),
    body('password').notEmpty().withMessage('비밀번호는 필수입니다.'),
    body('contact').notEmpty().withMessage('연락처는 필수입니다.'),
    validate,
  ],
  userController.join
);

// 로그인
router.post(
  '/login',
  [
    body('email').isEmail().withMessage('이메일 형식이 아닙니다.'),
    body('password').notEmpty().withMessage('비밀번호는 필수입니다.'),
    validate,
  ],
  userController.login
);

// 전체 조회 or 이메일로 단일 조회
router.get(
  '/',
  [
    query('email').optional().isEmail().withMessage('이메일 형식이 아닙니다.'),
    validate,
  ],
  (req, res) => {
    if (req.query.email) return userController.getByEmail(req, res);
    else return userController.getAll(req, res);
  }
);

// 개별 ID 조회
router.get(
  '/:id',
  [param('id').isInt().withMessage('숫자 ID가 필요합니다.'), validate],
  userController.get
);

// 수정
router.put(
  '/:id',
  [
    param('id').isInt().withMessage('숫자 ID가 필요합니다.'),
    body('name').notEmpty().withMessage('이름을 입력해주세요.'),
    body('password').notEmpty().withMessage('비밀번호는 필수입니다.'),
    body('contact').notEmpty().withMessage('연락처는 필수입니다.'),
    validate,
  ],
  userController.update
);

// 삭제
router.delete(
  '/:id',
  [param('id').isInt().withMessage('숫자 ID가 필요합니다.'), validate],
  userController.remove
);

module.exports = router;
