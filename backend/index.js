const express = require("express");
const app = express();
const userRouter = require("./routes/users");
const channelRouter = require("./routes/channels");

app.use(express.json());
app.use(userRouter); // /join, /login, /users 등
app.use("/channels", channelRouter); // /channels로 시작하는 모든 요청

app.listen(7777, () => {
  console.log("서버가 7777번 포트에서 실행 중입니다.");
});
