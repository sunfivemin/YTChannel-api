/**
 * •모델(데이터, DB 역할)
	•	데이터를 저장/조회/수정/삭제하는 순수 기능 담당 (지금은 Map, 나중에 DB 가능)
	•	비즈니스 로직(로우 데이터)은 여기에서만 함.

예시:
	•	createUser() : 회원 Map에 데이터 저장
	•	getUser() : 특정 id로 회원정보 반환
 */
// const db = new Map(); // 임시 DB
// let id = 1;

// function createUser({ userId, password, name }) {
//   db.set(id, { userId, password, name });
//   return id++;
// }

// function getUser(id) {
//   return db.get(Number(id));
// }

// function deleteUser(id) {
//   return db.delete(Number(id));
// }

// function updateUser(id, data) {
//   db.set(Number(id), data);
// }

// function getAllUsers() {
//   const users = [];
//   db.forEach((value, key) => users.push({ id: key, ...value }));
//   return users;
// }

// module.exports = {
//   createUser,
//   getUser,
//   deleteUser,
//   updateUser,
//   getAllUsers,
// };
