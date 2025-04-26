# ytchannel-api

**유저(회원) + 유튜브 채널 관리 기능(가입, 로그인, 전체/개별조회, 수정, 삭제)** 을 제공하는 간단한 RESTful API 실습 프로젝트입니다.  
Node.js + Express, 기본적인 MVC 폴더 구조 연습용입니다.

---

## 🚀 주요 기능

- **회원(User) API**

  - 회원가입 (POST `/join`)
  - 로그인 (POST `/login`)
  - 전체 회원 조회 (GET `/users`)
  - 개별 회원 조회/수정/삭제 (GET/PUT/DELETE `/users/:id`)

- **채널(Channel) API**
  - 채널 생성 (POST `/channels`)
  - 내 채널 목록 조회 (GET `/channels?userId=xxx`)
  - 채널 개별 조회/수정/삭제 (GET/PUT/DELETE `/channels/:id`)

---

## 🛠️ 기술 스택

- Node.js, Express
- (연습용) **MVC 일부 구조**
  - `models/` 데이터 관리 (임시 DB: Map)
  - `controllers/` 핵심 로직 처리
  - `routes/` API 경로/메서드 관리

---

## 📂 폴더 구조

backend/
controllers/
userController.js
channelController.js
models/
user.js
channel.js
routes/
user.js
channel.js
index.js
README.md

---

## ⚡ 실행 방법

```bash
cd backend
npm install
node index.js
```

• 서버 주소: http://localhost:7777
• Postman 등으로 API 요청 테스트 가능
