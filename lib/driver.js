console.log('executing phantom request')
// ./node_modules/phantomjs/bin/phantomjs --proxy='http://127.0.01:8082' ./lib/phantom-browser.js
var system = require('system');
var target = null;
if (system.args.length === 1) {
  console.log('phantomjs must receive a target url');
} else {
  system.args.forEach(function(arg, i) {
    console.log(i + ': ' + arg);
  });
  if(system.args[1]) {
    target = system.args[1];
  }
}
var page = require('webpage').create();
page.open(target, function(status) {
  console.log("phantom request status: " + status);
  phantom.exit();
});
