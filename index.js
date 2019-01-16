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

/*
sample data 
{
    count: 111
    ...
}
*/
// encode json web token with body json data
app.post('/api/encode', async function(req, res) {
    console.log('call /api/encode!!!');
    if (Object.keys(req.body).length === 0) { // if body is null
        console.log('have to call /api/encode with body json data!!!');
        return res.status(404).end(); // 404 error return to client
    }
    
    // to Use await, jwt.sign with Promise instance
    let tokenPromise = new Promise((resolve, reject) => {
        setTimeout(() => resolve(jwt.sign(req.body, config.secret)))
    });
    
    // await Promise instance and get jwt
    let token = await tokenPromise;

    /*
    set token in Request.session
    { jwt: true }
    */
    req.session[token] = true;
    res.json(token); // return token to client
});

app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});