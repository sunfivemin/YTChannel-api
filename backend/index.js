const express = require("express");
const app = express();
const userRouter = require("./routes/user");
const channelRouter = require("./routes/channel");

app.use(express.json());
app.use(userRouter);
app.use("/channels", channelRouter); // /channels로 들어온 요청 처리

app.listen(7777, () => {
  console.log("서버가 7777번 포트에서 실행 중입니다.");
});
