console.log(process.argv);
console.log('------------------');
var page = require('webpage').create();
page.open('http://www.apartmentguide.com', function(status) {
  console.log("Status: " + status);
  phantom.exit();
});
