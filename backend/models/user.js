const db = new Map(); // 임시 DB
let id = 1;

function createUser({ userId, password, name }) {
  db.set(id, { userId, password, name });
  return id++;
}

function getUser(userId) {
  return db.get(Number(userId));
}

function deleteUser(userId) {
  return db.delete(Number(userId));
}

function updateUser(userId, data) {
  db.set(Number(userId), data);
}

function getAllUsers() {
  const users = [];
  for (let [key, value] of db.entries()) {
    users.push({ id: key, ...value });
  }
  return users;
}

module.exports = {
  createUser,
  getUser,
  deleteUser,
  updateUser,
  getAllUsers,
};
