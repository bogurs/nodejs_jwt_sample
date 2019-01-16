## Json Web Token 1. encode (POST /api/encode) 구현
* index.js  

~~~
// 1.
app.post('/api/encode', async function(req, res) {
    console.log('call /api/encode!!!');

    // 2.
    if (Object.keys(req.body).length === 0) {
        console.log('have to call /api/encode with body json data!!!');
        return res.status(404).end();
    }
    
    // 3.
    let tokenPromise = new Promise((resolve, reject) => {
        setTimeout(() => resolve(jwt.sign(req.body, config.secret)))
    });
    
    // 4.
    let token = await tokenPromise;

    // 5.
    req.session[token] = true;
    res.json(token);
});
~~~
  
* 위 코드의 동작 과정에 대해 적어보자면 아래와 같다(코드와 같이 보기).  
	1. express 어플리케이션으로 'POST /api/encode' 명령을 수행할 API를 작성하였다. 비동기로 동작하는 async function을 사용하였으며 토큰을 생성하는 과정인 tokenPromise(03번 과정)가 선행되어야 하므로 04단계에서 await를 사용하여 대기하는 설정을 하였다.  
    2. 클라이언트가 전송한 Request.Body에 JSON data가 부재인 경우 서버는 클라이언트에게 404(Not Found)에러를 리턴한다.  
    3. async/await 기능과 같이 사용되는 것으로 Promise를 이용하여 Json Web Token이 정상적으로 생성되어야 함을 인스턴스로 선언한다.  
    4. 03.과정의 Promise 인스턴스를 정상적으로 넘겨 받은 후 생성한 토큰을 내부 변수로 셋팅한다.  
    5. express-session으로 생성한 session에 key로 token을, value로 true를 셋팅하고, 클라이언트에게 생성한 토큰을 리턴해준다(200)  
  
## 서버 실행하여 Postman으로 검증해보기
* (Terminal)> node index.js  
    1. POST localhost:3000/api/encode 으로 설정한 후 body>raw>JSON(application/json)으로 진입하여 아래와 같이 데이터 작성  
    2. 
    ~~~
    {
        number: 777
    }
    ~~~
    3. Send  
    4. Return한 Body에 Encoded된 JWT데이터 확인  
  