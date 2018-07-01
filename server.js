
var port =process.env.PORT || 8888;
var express = require('express');
var app = express();
var mysql = require('mysql');
var session = require('express-session');
var flash = require('connect-flash');
var db = require('./database')();
var morgan = require('morgan');
var passport = require('passport');
var formidable = require('formidable');
var path = require('path');

require('./app/passport')(passport, db);

app.use(morgan('dev'));  
app.set('view engine', 'ejs'); 

app.use(function (req, res, next) {

  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8888');

  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, content-type');

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true);

  // Pass to next layer of middleware
  next();
});

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// required for passport
app.set('trust proxy', 1); // trust first proxy

app.use(session({
  secret: 'secretsecretsecretpaper',
  resave: false,
  saveUninitialized: true,
  cookie: {
    secure: false
  }
}));

app.use(flash());

app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions

app.use("/assets", express.static(__dirname + "/assets"));

global.rootDir = path.resolve(__dirname);

require('./app/routes')(app, passport, db);

app.listen(port);

console.log("Server listening on port " + port);
