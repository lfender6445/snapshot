var childProcess = require('child_process');
var binPath = require('phantomjs').path;
var path = require("path");

module.exports = {
  visit: function(target){
    if(target){
      var childArgs = [
        '--proxy=http://127.0.0.1:8082',
        path.join(__dirname, 'driver.js'),
        target
      ];
      childProcess.execFile(binPath, childArgs, function(err, stdout, stderr) {
        console.log(err);
        console.log(stdout);
        console.log(stderr);
        console.log('phantomjs request complete');
      });
    } else { console.log('invalid target') }
  }
};
