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

```js
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

##React Physics

![enter image description here](https://lh3.googleusercontent.com/4W_WOyyW4pK6--X5WcJWHNOHmlPuj-3bSuW3g0snPM8=w340-h240-no)

$$
x=(v_0\cosθ)t
$$

$$
y = (v_0\sinθ)t - gt^2
$$

###code

```js


  ___.world = ___((t) => { // world engine
    //===========================================================================
    //MKS system of units

    var ___coordinate = ___();

    var V0 = 85.0; // m/s
    var deg = 30; //degree
    var THETA = deg / 180 * Math.PI; //radian
    var G = 9.8; //gravity const

    var coordinateEquation = (t) => {
      var x = V0 * Math.cos(THETA) * t;
      var y = V0 * Math.sin(THETA) * t - G * Math.pow(t, 2);
      return {
        x: x,
        y: y
      };
    };
    //
    //==============================================================
    var Drawscale = 4; //4 dot = 1 meter

    class ReactComponent extends React . Component {
      static get defaultProps() {
        return {
          ___x: ___(),
          ___y: ___()
        };
      }
      constructor(props) {
        super(props);
        ___.world = ___coordinate.compute((coordinate) => {
          ___.world = this.props.___x.appear(50 + coordinate.x * Drawscale);
          ___.world = this.props.___y.appear(300 - coordinate.y * Drawscale);
          this.forceUpdate();
        });
        var init = () => {
          var T0 = t();
          var f = () => {
            ___.world = ___coordinate.appear(coordinateEquation((t() - T0) / 1000));
          };
          ___.world = t.computeInterval(f, 10); //calculate 10milsec resolution
        };
        ___.world = t.computeTimeout(init, 0);
      }
      render() {
        var el = (
        <div>
          <h1>For new shot, Just Reload the browser page</h1>
          <svg height = "100%"  width = "100%">
              <circle r="5" fill="blue"
        cx = {this.props.___x.t()}
        cy = {this.props.___y.t()}/>
          </svg>
        </div>
        );
        return el;
      }
    }

    var mount = React.render(<ReactComponent />, document.body);
  //==============================================================
  //===========================================================================
  });

```

###Live Demo

http://sakurafunctional.github.io/demo/react-physics/
