
'use strict';

var ___ = require('./worldtimestream.js');



___.world = ___.map(function(t)  {

  ___.world = ___.log(t());


  var ___a = ___();
  var ___b = ___();

  ___.world = ___a.compute(___.log('a:'));
  ___.world = ___b.compute(___.log('b:'));

  ___.world = ___a.compute(function(x) {
    ___.world = ___b.appear(x * 5);
  });


  ___.world = ___a.appear(0);
  var f = function() {
    ___.world = ___a.appear(___a.now() + 1);
  };

  var timer = setInterval(f, 1000);


});
