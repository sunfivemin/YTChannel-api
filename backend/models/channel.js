/**
 * •모델(데이터, DB 역할)
	•	데이터를 저장/조회/수정/삭제하는 순수 기능 담당 (지금은 Map, 나중에 DB 가능)
	•	비즈니스 로직(로우 데이터)은 여기에서만 함.
 */
// models/channel.js
// const db = new Map();
// let channelId = 1;

// function createChannel({ userId, channelTitle }) {
//   db.set(channelId, { id: channelId, userId, channelTitle });
//   return channelId++;
// }

// function getChannel(id) {
//   return db.get(Number(id));
// }

// function updateChannel(id, data) {
//   db.set(Number(id), data);
// }

// function deleteChannel(id) {
//   return db.delete(Number(id));
// }

// // userId로 채널 전체 조회
// function getChannelsByUser(userId) {
//   const result = [];
//   db.forEach((value, key) => {
//     if (value.userId === userId) {
//       result.push({ id: key, ...value });
//     }
//   });
//   return result;
// }

// // 전체 채널 조회 (관리자용)
// function getAllChannels() {
//   const result = [];
//   db.forEach((value) => result.push(value));
//   return result;
// }

// module.exports = {
//   createChannel,
//   getChannel,
//   updateChannel,
//   deleteChannel,
//   getChannelsByUser,
//   getAllChannels,
// };
