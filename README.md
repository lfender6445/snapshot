# install

- install latest jdk
- build browser-mob-proxy from source via` tag browsermob-proxy-2.0.0
- add conf/snapshot.com to nginx config
- start nginx
- start bmp
  - ./target/browsermob-proxy-2.0.0/bin/browsermob-proxy
- start snapshot
  - node app.js

# debugging
- start app
  - http_proxy=http://127.0.0.1:8081 node --debug app.js
- start debugger
  - node-inspector --web-port=8083
- set breakpoints

# deps
- services
  - [browsermob-proxy svc](https://github.com/lightbody/browsermob-proxy/)
- misc
- [casper](http://casperjs.org/)
- [theme](http://ironsummitmedia.github.io/startbootstrap-grayscale/)
- [font awesome](https://fortawesome.github.io/Font-Awesome/icons/)

