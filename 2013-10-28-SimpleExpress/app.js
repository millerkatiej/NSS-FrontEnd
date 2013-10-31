
/**
 * Module dependencies.
 */

//every file you would use is in a module. this 'require' calls those modules.

var express = require('express');

//our Defined Route Modules
var home = require('./routes/home'); //go into the routes folder and open index fild (if it does not show the file, index is the default file)
var cats = require('./routes/cats');
var dogs = require('./routes/dogs');

var http = require('http');
var path = require('path');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade'); //says that when you write your html, view it in jade
app.use(express.favicon()); //allows favicon to show
app.use(express.logger('dev')); //will log your requests if you're in development environment
app.use(express.bodyParser()); //takes the form data the browser sends and parses it
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public'))); //tells that the static files are under root directory/public

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', home.index);//when the browser sends a get request to '/' (the home page)
app.get('/cats', cats.index);
app.get('/dogs', dogs.index);


http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});

//pulls in all the modules at the top, configures everything and then begins to listen (does this in a loop)
