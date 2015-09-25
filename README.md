# resources
[casper](http://casperjs.org/)
[proxy svc](https://github.com/lightbody/browsermob-proxy/)
[theme](http://ironsummitmedia.github.io/startbootstrap-grayscale/)
[font awesome](https://fortawesome.github.io/Font-Awesome/icons/)

# install

- install latest jdk
- build browser-mob-proxy from source

note, the following steps must be executed in order

- start bmp
  - sh ../browsermob-proxy/browsermob-dist/target/browsermob-proxy-2.1.0-beta-4-SNAPSHOT/bin/browsermob-proxy -port 9090
- add a proxy
  - curl -X POST http://localhost:9090/proxy
  - the returned port will be used to configure your network proxy
- configure proxy in preferences/network/proxies http proxy panel. use the returned port for added proxy
- create empty har with pageref id
  - curl -X PUT -d 'initialPageRef=Foo' http://localhost:8080/proxy/9091/har
- load up browser and visit a page
- see https://github.com/lightbody/browsermob-proxy for API information
- add local.snapshot.com to hosts and setup nginx reverse proxy via conf/snapshot.con


# debugging
- start app
  - http_proxy=http://127.0.0.1:8081 node --debug app.js
- start debugger
  - node-inspector --web-port=8083
- set breakpoints
