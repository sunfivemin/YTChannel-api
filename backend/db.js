const mysql = require("mysql2");

const connection = mysql.createConnection({
  host: "127.0.0.1",
  user: "root", // 본인 MySQL 사용자명
  password: "root", // 본인 MySQL 비밀번호
  database: "Youtube", // 연결할 데이터베이스 이름
  dateStrings: true,
});

// // DB 연결 확인
// connection.connect((err) => {
//   if (err) {
//     console.error("❌ DB 연결 실패:", err);
//     return;
//   }
//   console.log("✅ MySQL 연결 성공!");

//   // 여기서 쿼리를 실행해봅니다
//   connection.query("SELECT * FROM users", (err, results, fields) => {
//     if (err) {
//       console.error("쿼리 실행 오류:", err);
//     } else {
//       console.log("📄 users 테이블 결과:", results);
//       let { id, email, name, created_at } = results[0];
//       console.log(id, email, name, created_at);
//     }

//     // 작업 끝나면 연결 종료
//     connection.end();
//   });
// });
module.exports = connection;
