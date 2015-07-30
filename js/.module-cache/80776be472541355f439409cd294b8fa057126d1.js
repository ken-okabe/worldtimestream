'use strict';

var ___ = require('./worldtimestream.js');

___.t = ___.map(function(t)  {

  ___.t = ___.log(t());

  var ___a = ___();
  var ___b = ___();

  ___.t = ___a.compute(___.log('a:'));
  ___.t = ___b.compute(___.log('b:'));

  ___.t = ___a.compute(function(x) {
    ___.t = ___b.appear(x * 5);
  });

  ___.t = ___a.appear(0);
  var f = function() {
    ___.t = ___a.appear(___a.t() + 1);
  };

  var timer = setInterval(f, 1000);
});
