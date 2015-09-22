exports.index = function(req, res){
  res.render('index', { title: 'Express' });
};
exports.play = function(req, res){
  res.render('play', { title: 'Play' });
}
exports.record = function(req, res){
  res.render('record', { title: 'Record' });
}
