// this page should be renamed to record or current
var BmpApi = {
  createHref: function(){
    var href = null; // date.now + profile
    // var endpoint = '/bmp/foo' + date;
  },
  checkApi: function(){
    var createProxy = function(){
      $.post('/bmp/proxy', function(data){
        if(data.port){
          data.proxyList = [{port: data.port}];
          checkProxy(data);
        }
      }).fail(function(){
        $('.api_offline').removeClass('hidden').find('span').text('api offline - unable to create a proxy');
      });
    };
    var checkProxy = function(data){
      if(data['proxyList'].length){
        var proxyPort = data['proxyList'][0].port;
        if(proxyPort){
          $('.api_online').removeClass('hidden').find('span').text('api online / port ' + proxyPort);
        } else {
          $('.api_online').removeClass('hidden');
          createProxy();
        }
      } else {
        createProxy();
      }
    };
    var getProxy = function(){
      $.get('/bmp/proxy', function(data){
        if(data){ checkProxy(data) }
      }).fail(function(){
        createProxy();
      });
    };
    // connect to proxy server
    // add a proxy port or fail
    getProxy();
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
    BmpApi.checkApi();
    BmpApi.createHref();
    // send off url(s) to internal request endpoint via params via ajax
    // encode array in url
    // endpoint will eventually issue requests on server via casper
  });
};

Impressions();
