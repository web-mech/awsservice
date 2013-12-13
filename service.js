/**
 * Module dependencies.
 */
var express = require('express');
var service = require('./routes/service');
var http = require('http');
var path = require('path');

var app = express();

// all environments
app.set('port', 443);
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.all('*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
});


//app.get('/', routes.index);
app.get('/aws/:query/:index',service.service);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
