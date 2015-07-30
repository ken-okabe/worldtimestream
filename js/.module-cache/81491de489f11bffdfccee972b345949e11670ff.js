'use strict';

var ___ = require('./worldtimestream.js');

___(function(t)  {

  ___.tt = ___.log(t()); //show user's current time

  var ___a = ___();
  var ___b = ___();

  ___.tt = ___a.compute(___.log('a:'));
  ___.tt = ___b.compute(___.log('b:'));

  ___.tt = ___a.compute(function(x) {
    ___.tt = ___b.appear(x * 5);
  });

  ___.tt = ___a.appear(0);
  var f = function() {
    ___.tt = ___a.appear(___a.tt() + 1);
  };

  var timer = setInterval(f, 1000);
});
