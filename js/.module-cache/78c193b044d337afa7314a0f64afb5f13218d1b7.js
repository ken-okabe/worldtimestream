'use strict';

var ___ = require('./worldtimestream.js');

___.world = ___(function(t)  {

  ___.world = ___.log(t()); //show user's current time

  var ___a = ___();
  var ___b = ___();

  ___.world = ___a.compute(function()  {
    ___world = ___.log(t());
  });
  ___.world = ___b.compute(___.log('b(' + Date.now() + ') : '));

  ___.world = ___a.compute(function(x) {
    ___.world = ___b.appear(x * 5);
  });

  ___.world = ___a.appear(0);
  var f = function() {
    ___.world = ___a.appear(___a.t() + 1);

    console.log(t());
  };

  var timer = setInterval(f, 1000);
});
