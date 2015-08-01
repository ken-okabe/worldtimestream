'use strict';

var ___ = require('./worldtimestream.js');

___.world = ___((t) => {

  var ___a = ___();
  var ___b = ___();

  ___.world = ___a.compute(() => {
    ___.world = ___.log(t(), 'a', ___a.t());

  });
  ___.world = ___b.compute(() => {
    ___.world = ___.log(t(), 'b', ___b.t());
  });

  ___.world = ___a.compute((x) => {
    ___.world = ___b.appear(x * 5);
  });

  var f0 = () => {
    ___.world = ___.log('test start');
    ___.world = ___a.appear(0);
  };
  var f = () => {
    ___.world = ___a.appear(___a.t() + 1);
  };

  ___.world = t.computeTimeout(f0, 0);
  ___.world = t.computeInterval(f, 1000);

});
