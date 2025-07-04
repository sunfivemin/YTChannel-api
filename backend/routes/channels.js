const express = require('express');
const router = express.Router();
const channelController = require('../controllers/channelController');
const { body, query, param } = require('express-validator');
const validate = require('../middlewares/validate');

// 채널 등록 (POST /channels)
router.post(
  '/',
  [
    body('name')
      .notEmpty()
      .withMessage('채널 이름은 필수입니다.')
      .isString()
      .withMessage('문자 입력하세요!'),
    body('userId')
      .notEmpty()
      .withMessage('userId는 필수입니다.')
      .isInt()
      .withMessage('숫자 입력하세요!'),
    validate,
  ],
  channelController.create
);

// 특정 회원의 채널 전체 조회 (GET /channels?userId=1)
router.get(
  '/',
  [
    query('userId')
      .notEmpty()
      .withMessage('userId가 필요합니다.')
      .isInt()
      .withMessage('숫자 입력하세요!'),
    validate,
  ],
  channelController.getAllByUser
);
// 전체 채널 조회 (GET /channels/all)
router.get('/all', channelController.getAll);

// 채널 개별 조회 (GET /channels/:id)
router.get(
  '/:id',
  [param('id').notEmpty().withMessage('채널 id는 필수입니다.'), validate],
  channelController.get
);

// 채널 수정 (PUT /channels/:id)
router.put(
  '/:id',
  [
    param('id').notEmpty().withMessage('채널 id는 필수입니다.'),
    body('name').notEmpty().withMessage('수정할 name을 입력해주세요.'),
    validate,
  ],
  channelController.update
);

// 채널 삭제 (DELETE /channels/:id)
router.delete(
  '/:id',
  [param('id').notEmpty().withMessage('채널 id는 필수입니다.'), validate],
  channelController.remove
);

module.exports = router;
