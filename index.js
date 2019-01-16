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

// destroy json web token (null error handle)
app.get('/api/decode', function(req, res) {
    console.log('have to call /api/decode/${TOKEN}!!!');
    res.status(404).end(); // token is null
});

// decode json web token
app.get('/api/decode/:token', async function(req, res) {
    console.log('call /api/decode!!!');
    let token = req.params.token;
    if (!req.session[token]) { // if session's token is null
        return res.status(400).end();
    }

    let rawDataPromise = new Promise((resolve, reject) => {
        setTimeout(() => resolve(jwt.decode(token)))
    });
    let rawData = await rawDataPromise;

    res.json(rawData);
});

// destroy json web token (null error handle)
app.delete('/api/destroy', function(req, res) {
    console.log('have to call /api/destroy/${TOKEN}!!!');
    res.status(404).end(); // token is null
});

// destroy json web token
app.delete('/api/destroy/:token', function(req, res) {
    console.log('call /api/destroy!!!');
    let token = req.params.token;
    if (!req.session[token]) { // if session's token is null
        return res.status(400).end();
    }

    delete req.session[token];
    res.end();
});

app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});