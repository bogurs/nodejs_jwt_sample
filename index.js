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