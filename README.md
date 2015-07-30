# worldtimestream
world time stream, the tiny FRP

https://www.npmjs.com/package/worldtimestream

https://github.com/kenokabe/worldtimestream


##Install

###node / io.js

>npm install worldtimestream

###WebBrowser

Copy and Paste
https://raw.githubusercontent.com/kenokabe/worldtimestream/master/js/worldtimestream.js



##Test

**test.jsx**

```
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
```

**result**

```
1438234695190 'a' 0
1438234695200 'b' 0
1438234696204 'a' 1
1438234696204 'b' 5
1438234697206 'a' 2
1438234697206 'b' 10
1438234698208 'a' 3
1438234698208 'b' 15
1438234699209 'a' 4
1438234699209 'b' 20
1438234700211 'a' 5
1438234700211 'b' 25
1438234701213 'a' 6
1438234701213 'b' 30
1438234702214 'a' 7
1438234702214 'b' 35
1438234703215 'a' 8
1438234703215 'b' 40
```
