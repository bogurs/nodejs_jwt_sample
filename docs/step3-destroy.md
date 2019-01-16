## Json Web Token 3. destroy (DELETE /api/destroy) 구현
* index.js  

~~~
// 1.
app.delete('/api/destroy/:token', function(req, res) {
    console.log('call /api/destroy!!!');

    // 2.
    let token = req.params.token;
    if (!req.session[token]) { // if session's token is null
        return res.status(400).end();
    }

    // 3.
    delete req.session[token];
    res.end();
});
~~~
  
* 위 코드의 동작 과정에 대해 적어보자면 아래와 같다(코드와 같이 보기).  
	1. express 어플리케이션으로 'DELETE /api/destroy/:token' 명령을 수행할 API를 작성하였다.  
    2. 클라이언트가 전송한 Request.Params에 JWT 토큰이 부재인 경우 서버는 클라이언트에게 400(Bad Request)에러를 리턴한다.  
    3. 전달 받은 JWT을 Session에서 제거하고, 클라이언트에게 정상 종료 되었음을 리턴해준다(200)  
  
## 서버 실행하여 Postman으로 검증해보기
* (Terminal)> node index.js  
* 성공 시나리오
    1. POST localhost:3000/api/encode를 통해 얻은 JWT값을 2.과정의 :token에 대입하기  
    2. DELETE localhost:3000/api/destroy/:token 으로 설정  
    3. Send  
    4. 200 Return Code 확인  
  
* 실패 시나리오 1
    1. 성공 시나리오에서 2.부분의 :token 데이터를 공란으로 셋팅  
    2. Send  
    3. 404 Not Found Error Return 확인  
  
* 실패 시나리오 2
    1. 성공 시나리오에서 2.부분의 :token 데이터를 임의로 변경  
    2. Send  
    3. 400 Bad Request Error Return 확인  
  