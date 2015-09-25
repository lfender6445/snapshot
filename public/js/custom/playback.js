// this page should be renamed to record or current

var BmpApi = {
  createHref: function(port){
    if(window.config.profile){
      var utc = new Date().toJSON();
      var href = utc + '_' + window.config.profile;
      var endpoint = '/bmp/proxy/' + (window.config.port || port) + '/har/?initialPageRef=' + href;
      $.ajax({
        url: endpoint,
        type: 'PUT',
        success: function(data) {
          $(document).trigger('readyToDownload', data);
        },
        error: function(xhr, err){
          console.log(err);
          console.log('unable to init har');
        }
      });
    } else {
      console.log('missing window.config.profile');
    }

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
          window.config.port = proxyPort;
          $('.api_online').removeClass('hidden').find('span').text('api online / port ' + proxyPort);
          $(document).trigger('proxyIsReady', proxyPort);
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
        if(data){ checkProxy(data); }
      }).fail(function(){
        createProxy();
      });
    };
    // connect to proxy server
    // add a proxy port or fail
    getProxy();
  },
  downloadImpressionHarData: function(data){
    if(data){
      var params = $.param(data);
      var endpoint = '/play/' + window.config.profile + '/har';
      $.post(endpoint, params);
    }
  }
};

var Playback = function(){
  var getUrls = function(){
    var $anchors = $('.env_url a');
    var data = {};
    $anchors.each(function(index){
      var href = $(this).attr('href');
      var env  = $(this).data('env');
      data[env] = href;
    });
    return data;
  };

  //var tagFor = function(url){
  //  return url;
  //};

  //var compareCurrentTags = function(){
  //  var urls = getUrls();
  //  $.each(urls, function(url){
  //    var tag = tagFor(url);
  //  });
  //};

  var cacheHarData = function(){
    BmpApi.checkApi();
    $(document).on('readyToDownload', function(){
      var urlData = getUrls();
      BmpApi.downloadImpressionHarData(urlData);
    });
    $(document).on('proxyIsReady', function(port){
      BmpApi.createHref(port);
    });
  };

  $(document).ready(function(){
    cacheHarData();
    // send off url(s) to internal request endpoint via params via ajax
    // encode array in url
    // endpoint will eventually issue requests on server via casper
  });
};

Playback();
