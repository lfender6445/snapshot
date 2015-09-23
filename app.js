
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes');

var request = require('request');

var app = module.exports = express.createServer();

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

app.post('/play/:profile/har', function(req, res){
  console.log(req);
  // var data = req.body;
  // for(env in data){
  //   var url = data[env];
  //   request(url, function (error, response, body) {
  //     if (!error && response.statusCode == 200) {
  //       console.log('request ' + url + 'successfully')
  //     } else {
  //       console.log('could not communicate with ' + url);
  //     }
  //   });
  // }
  // how to start a break point on server
  // req.body appears to contain post params
});

app.get('/record', routes.record);

app.listen(3000);
console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
