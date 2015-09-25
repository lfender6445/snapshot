
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes');

var request = require('request');

var app = module.exports = express.createServer();

var browser = require('./lib/browser');

// HAR libs
var Proxy = require('browsermob-proxy').Proxy
  , proxy = new Proxy({proxyPort: 8081})
  , fs = require('fs');

// Configuration

app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('production', function(){
  app.use(express.errorHandler());
});

// Routes

app.get('/', routes.index);
app.use('/play', routes.play);

app.get('/play/:profile', function(req, res){
  var profile = req.param('profile');
  var opts = {
    title: 'Playback for ' + profile,
    profile: profile
  };
  res.render('play', opts);
});

// TODO: drop casper / spooky for new phantom api
var recordImpressionHar = function(target){
  browser.visit(target);
  // proxy.doHAR(target, function(err, data) {
  //   if (err) {
  //     console.error('ERROR: ' + err);
  //   } else {
  //     console.log('Generating har for ' + target);
  //     console.log(data);
  //     // fs.writeFileSync(target, data, 'utf8');
  //   }
  // });
};

var getImpression = function(target){
  var req = request.get({url: target, proxy: 'http://127.0.0.1:8081'}, function (error, response, body) {
    response.setEncoding('utf8');
    response.on('data', function (chunk) { data += chunk; });
    if (!error && response.statusCode == 200) {
      console.log('requested ' + target + ' successfully');
      // is this whats preventing recorded har data?
      // fs.writeFileSync(target, body, 'utf8');
    } else {
      console.log('could not communicate with ' + target);
    }
  });
  req.on('response', function(response){ console.log(response); });
  req.end();
};

// generate impression data for bmp
app.post('/play/:profile/har', function(req, res){
  var postData = req.body;
  for(var prop in postData){
    var target =  postData[prop];
    console.log('initiating request for ' + target);
    // getImpression(target);
    recordImpressionHar(target);
  }
});

app.get('/record', routes.record);

app.listen(3000);
// console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
