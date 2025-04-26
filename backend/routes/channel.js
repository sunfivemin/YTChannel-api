const express = require("express");
const router = express.Router();
const channelController = require("../controllers/channelController");

// 채널 생성
router.post("/", channelController.create);

// 내 채널 전체 조회 (ex: /channels?userId=tester)
router.get("/", channelController.getAll);

// 채널 개별 조회/수정/삭제 (ex: /channels/1)
router
  .route("/:id")
  .get(channelController.get)
  .put(channelController.update)
  .delete(channelController.remove);

module.exports = router;
