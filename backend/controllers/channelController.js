const channelModel = require("../models/channel");
/**
 *•	컨트롤러(요청 처리/핸들러)
	•	라우터가 호출하면, 실제 비즈니스 로직을 실행
	•	(요청값 검증, 모델 호출, 결과값 응답 등)
	•	실제 데이터 접근/수정은 model에 맡김
 */
// 1. 채널 생성
exports.create = (req, res) => {
  const { userId, channelTitle } = req.body;
  if (!userId || !channelTitle) {
    return res
      .status(400)
      .json({ message: "userId와 channelTitle이 필요합니다." });
  }
  const id = channelModel.createChannel({ userId, channelTitle });
  res
    .status(201)
    .json({ message: `${channelTitle} 채널이 생성되었습니다.`, id });
};

// 2. 채널 개별조회
exports.get = (req, res) => {
  const channel = channelModel.getChannel(req.params.id);
  if (channel) res.json(channel);
  else res.status(404).json({ message: "채널을 찾을 수 없습니다." });
};

// 3. 채널 수정
exports.update = (req, res) => {
  const { channelTitle } = req.body;
  const channel = channelModel.getChannel(req.params.id);

  if (!channel) {
    return res.status(404).json({ message: "수정할 채널이 없습니다." });
  }

  // 기존 채널명 저장
  const oldTitle = channel.channelTitle;

  // 유저 ID는 그대로 두고, 채널 타이틀만 변경
  channelModel.updateChannel(req.params.id, { ...channel, channelTitle });

  res.json({
    message: `채널명이 정상적으로 수정되었습니다. 기존: "${oldTitle}" → 수정: "${channelTitle}"`,
  });
};

// 4. 채널 삭제
exports.remove = (req, res) => {
  if (channelModel.deleteChannel(req.params.id)) {
    res.json({ message: "채널이 삭제되었습니다." });
  } else {
    res.status(404).json({ message: "삭제할 채널이 없습니다." });
  }
};

// 5. 채널 전체 조회 - 모든 채널 반환
exports.getAll = (req, res) => {
  const channels = channelModel.getAllChannels(); // userId 파라미터 없이 전체 조회
  res.json(channels);
};
