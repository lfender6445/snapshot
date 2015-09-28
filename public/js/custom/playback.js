var BmpApi = {
  createHref: function(port){
    if(window.config.profile){
      var utc = new Date().toJSON();
      var href = utc + '_' + window.config.profile;
      var endpoint = '/bmp/proxy/' + (window.config.port || port) + '/har';
      $.ajax({
        url: endpoint,
        data: 'initialPageRef=' + href,
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
    getProxy();
  },
  downloadImpressionHarData: function(data){
    if(data){
      var params = $.param(data);
      var endpoint = '/play/' + window.config.profile + '/har';
      console.log('downloadImpressionHarData');
      console.log(params);
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

  var cacheHarData = function(){
    BmpApi.checkApi();
    console.log('running playback code');
    $(document).on('readyToDownload', function(data){
      var urlData = getUrls();
      BmpApi.downloadImpressionHarData(urlData);
    });
    $(document).on('proxyIsReady', function(port){
      console.log('creating href')
      BmpApi.createHref(port);
    });
  };

  $(document).ready(function(){
    cacheHarData();
  });
};

Playback();
