var express = require('express');
var mongoose = require('mongoose');

// model definitions
require('require-dir')('./models');

// route definitions
var home = require('./routes/home');
var germantown = require('./routes/germantown');
var fivepoints = require('./routes/fivepoints');
var eighthsouth = require('./routes/eighthsouth');
var twelfthsouth = require('./routes/twelfthsouth');
var belmont = require('./routes/belmont');
var downtown = require('./routes/downtown');
var elliston = require('./routes/elliston');
var fairgrounds = require('./routes/fairgrounds');
var fisk = require('./routes/fisk');
var greenhills = require('./routes/greenhills');
var gulch = require('./routes/gulch');
var hillsboro = require('./routes/hillsboro');
var lipscomb = require('./routes/lipscomb');
var metrocenter = require('./routes/metrocenter');
var midtown = require('./routes/midtown');
var musicrow = require('./routes/musicrow');
var nations = require('./routes/nations');
var northnashville = require('./routes/northnashville');
var riverside = require('./routes/riverside');
var sobro= require('./routes/sobro');
var sylvanpark = require('./routes/sylvanpark');
var tsu = require('./routes/tsu');
var vanderbilt = require('./routes/vanderbilt');
var parking = require('./routes/parking');
var faq = require('./routes/faq');

var app = express();
var RedisStore = require('connect-redis')(express);
mongoose.connect('mongodb://localhost/park-nashville');

// configure express
require('./config').initialize(app, RedisStore);

// routes
app.get('/', home.index);
app.get('/germantown', germantown.index);
app.get('/fivepoints', fivepoints.index);
app.get('/eighthsouth', eighthsouth.index);
app.get('/twelfthsouth', twelfthsouth.index);
app.get('/belmont', belmont.index);
app.get('/downtown', downtown.index);
app.get('/elliston', elliston.index);
app.get('/fairgrounds', fairgrounds.index);
app.get('/fisk', fisk.index);
app.get('/greenhills', greenhills.index);
app.get('/gulch', gulch.index);
app.get('/hillsboro', hillsboro.index);
app.get('/lipscomb', lipscomb.index);
app.get('/metrocenter', metrocenter.index);
app.get('/midtown', midtown.index);
app.get('/musicrow', musicrow.index);
app.get('/nations', nations.index);
app.get('/northnashville', northnashville.index);
app.get('/riverside', riverside.index);
app.get('/sobro', sobro.index);
app.get('/sylvanpark', sylvanpark.index);
app.get('/tsu', tsu.index);
app.get('/vanderbilt', vanderbilt.index);

app.get('/faq', faq.index);

app.post('/parking', parking.create);
app.get('/parking', parking.marker);
app.get('/parking/:id', parking.new);
app.post('/comments', parking.comments);


// start server & socket.io
var common = require('./sockets/common');
var server = require('http').createServer(app);
var io = require('socket.io').listen(server, {log: true, 'log level': 2});
server.listen(app.get('port'));
io.of('/app').on('connection', common.connection);
