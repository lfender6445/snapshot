var phantomjs = require('phantomjs');
var childProcess = require('child_process');
var binPath = phantomjs.path;
var path = require("path");

module.exports = {
  visit: function(target){
    var childArgs = [
      path.join(__dirname, 'phantomjs-browser.js'),
      target
    ];
    childProcess.execFile(binPath, childArgs, function(err, stdout, stderr) {
      console.log('phantomjs request complete');
    });
  }
};
