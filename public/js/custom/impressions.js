// this page should be renamed to record or current
var BmpApi = {
  createHref: function(){
    var href = // date.now + profile
    var endpoint = '/bmp/foo' + date;
  }
};

var Impressions = function(){
  var getUrls = function(){
    var $anchors = $('.env a');
    var urls = [];
    $anchors.each(function(elem){
      var href = $(this).attr('href');
      urls.push(href);
    });
    return urls;
  };

  var tagFor = function(){
  };

  var compareCurrentTags = function(){
    var urls = getUrls();
    $.each(urls, function(url){
      var tag = tagFor(url);
    });
  };

  $(document).ready(function(){
    // create new href
    BmpApi.createHref();
    // send off url(s) to internal request endpoint via params via ajax
    // encode array in url
    // endpoint will eventually issue requests on server via casper
  });
};

Impressions();
