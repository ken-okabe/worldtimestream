'use strict';

var ___ = require('./worldtimestream.js');

___.world = ___(function(t)  {

  var ___a = ___();
  var ___b = ___();

  ___.world = ___a.compute(function()  {
    ___.world = ___.log(t(), 'a', ___a.t());

  });
  ___.world = ___b.compute(function()  {
    ___.world = ___.log(t(), 'b', ___b.t());
  });

  ___.world = ___a.compute(function(x)  {
    ___.world = ___b.appear(x * 5);
  });

  var f0 = function()  {
    ___.world = ___.log('test start');
    ___.world = ___a.appear(0);
  };
  var f = function()  {
    ___.world = ___a.appear(___a.t() + 1);

  };

  ___.world = t.computeTimeout(f0, 0);
  ___.world = t.computeInterval(f, 1000);

});
