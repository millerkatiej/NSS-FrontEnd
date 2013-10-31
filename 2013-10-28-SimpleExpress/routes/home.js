
/*
 * GET home page.
 */

exports.index = function(req, res){ // req is the request that came from the server (ip address, the browser type, etc) res is the response the server will send back aout
  res.render('home'); //is sending home as the response (under views/home.jade)
};