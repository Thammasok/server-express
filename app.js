const express = require('express');
const path = require('path');
const expressValidator= require('express-validator');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const fs = require('fs');

const env       = process.env.NODE_ENV || 'development';
const config    = require('./config/config.json')[env];
const MongoConnector = require('./mongo_models');

const app = express();

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(expressValidator());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
// app.set('view engine', 'html');

// SETTING CROSS FOR RUN ON SERVER
// COMMENT PUSH ON DEV / PROD SERVER
// app.use(function (req, res, next) {
//   res.setHeader("Access-Control-Allow-Origin", "*");
//   res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
//   res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
//   next();
// });


const index = require('./routes/index');
app.use('/', index);

var files = fs.readdirSync('./routes/v1');
for (var i in files) {
  const routeName = require('./routes/v1/' + files[i]);
  let fileName = files[i].replace(/\.[^/.]+$/, "");
  app.use('/api/' + fileName, routeName);
}

MongoConnector({
  host: config.mongodb.host,
  port: config.mongodb.port,
  database: config.mongodb.database
}).connect();

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
