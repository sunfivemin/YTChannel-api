const express = require("express");
const app = express();
const userRouter = require("./routes/user");

app.use(express.json());
app.use(userRouter);

app.listen(7777, () => {
  console.log("서버가 7777번 포트에서 실행 중입니다.");
});
