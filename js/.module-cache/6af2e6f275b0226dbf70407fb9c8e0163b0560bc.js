'use strict';

var ___ = require('./worldtimestream.js');

___.world = ___(function(t)  {
  console.log(t());
  ___.log(t()); //show user's current time

  var ___a = ___();
  var ___b = ___();

  ___.world = ___a.compute(function()  {
    ___.log(t(), 'a', ___a.t());
  });
  ___.world = ___a.compute(function()  {
    ___.log(t(), 'b', ___b.t());
  });

  ___.world = ___a.compute(function(x) {
    ___.world = ___b.appear(x * 5);
  });

  ___.world = ___a.appear(0);
  var f = function() {
    ___.world = ___a.appear(___a.t() + 1);

  };

  var timer = setInterval(f, 1000);

});
