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

  ___.world = ___a.appear(0);
  var f = () => {
    ___.world = ___a.appear(___a.t() + 1);

  };

  var timer = setInterval(f, 1000);

});
