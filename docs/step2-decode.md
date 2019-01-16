## Json Web Token 2. decode (GET /api/decode) 구현
* index.js  

~~~
// 1.
app.get('/api/decode/:token', async function(req, res) {
    console.log('call /api/decode!!!');

    // 2.
    let token = req.params.token;
    if (!req.session[token]) {
        return res.status(400).end();
    }

    // 3.
    let rawDataPromise = new Promise((resolve, reject) => {
        setTimeout(() => resolve(jwt.decode(token)))
    });

    // 4.
    let rawData = await rawDataPromise;

    // 5.
    res.json(rawData);
});
~~~
  
* 위 코드의 동작 과정에 대해 적어보자면 아래와 같다(코드와 같이 보기).  
	1. express 어플리케이션으로 'GET /api/decode' 명령을 수행할 API를 작성하였다. 비동기로 동작하는 async function을 사용하였으며 토큰을 생성하는 과정인 tokenPromise(03번 과정)가 선행되어야 하므로 04단계에서 await를 사용하여 대기하는 설정을 하였다.  
    2. 클라이언트가 전송한 Request.Params에 JWT 토큰이 부재인 경우 서버는 클라이언트에게 404(Not Found)에러를 리턴한다.  
    3. async/await 기능과 같이 사용되는 것으로 Promise를 이용하여 Json Web Token이 정상적으로 decode되어야 함을 인스턴스로 선언한다.  
    4. 03.과정의 Promise 인스턴스를 정상적으로 넘겨 받은 후 생성한 raw data를 내부 변수로 셋팅한다.  
    5. 클라이언트에게 생성한 raw data를 리턴해준다(200)  
  
## 서버 실행하여 Postman으로 검증해보기
* (Terminal)> node index.js  
* 성공 시나리오
    1. POST localhost:3000/api/encode를 통해 얻은 JWT값을 1.과정의 :token에 대입하기  
    2. GET localhost:3000/api/decode/:token 으로 설정  
    3. Send  
    4. Return한 Body에 Decoded된 Raw데이터 확인  
  
* 실패 시나리오 1
    1. 성공 시나리오에서 2.부분의 :token 데이터를 공란으로 셋팅  
    2. Send  
    3. 404 Not Found Error Return 확인  
  
* 실패 시나리오 2
    1. 성공 시나리오에서 2.부분의 :token 데이터를 임의로 변경  
    2. Send  
    3. 400 Bad Request Error Return 확인  
  