# NodeJS
## express, express-session, jsonwebtoken을 이용한 REST API 만들기
* 프로젝트 초기 셋팅
* 프로젝트 사전 조건 1. JWT로 encode하고 decode 하는 부분을 async await를 이용해서 작성
* 프로젝트 사전 조건 2. 3개의 API 모두 매 요청이 들어왔을 때 클라이언트에서 보내는 값이 빈 값인지 체크해서 빈 값이면 404를 응답하는 middleware를 작성
* Json Web Token 1. encode (POST /api/encode) 구현
* Json Web Token 2. decode (GET /api/decode) 구현
* Json Web Token 3. destroy (DELETE /api/destroy) 구현
* 참고한 URL
  
  
## 프로젝트 초기 셋팅
* nodejs를 잘 모르기에 사용한 모든 명령어를 적도록 한다.  
	- (Terminal)> npm init  
	- (Terminal)> npm i body-parser morgan express express-session jsonwebtoken  
	- (Terminal)> code .  
	- (VSCode).gitignore 생성 및 node_modules 폴더 커밋 제외 설정 추가  
	- (VSCode)index.js(main), config.js(secret key) 파일 생성  
  
* index.js  

~~~
var express = require('express');
var session = require('express-session');
var bodyParser = require('body-parser');
var jwt = require('jsonwebtoken');
var app = express();

const config = require('./config');

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({extended: true})); // for parsing application/x-www-form-urlencoded

// express-session init
app.use(session({
    secret: 'mysessionsign',
    resave: false,
    saveUninitialized: true
}));
~~~
  
* config.js  

~~~
module.exports = {
    'secret': 'SeCrEtKeYfOrHaShInG',
}
~~~
  
  
## 서버 실행하기
* node index.js  