'use strict';

var worldtimestream = function()  {
  var computingF = [];

  var value = {};
  var state;

  Object.defineProperties(value,
    {
      val: //value.val
      {
        get:function() {
          return state;
        },
        set:function(x) {
          state = x;
          computingF.map(
            function(f) {
              f(x);
            });
          return;
        }
      }
    });

  var o = {
    compute:function(f) {
      var f1 = function() {
        computingF[computingF.length] = f; //push  f
      };
      return f1;
    },
    appear:function(a) {
      var f1 = function() {
        value.val = a;
      };
      return f1;
    },
    now:function() {
      return value.val;
    }
  };
  return o;
};
Object.defineProperties(worldtimestream,
  {
    world: //our physical world
    {
      set:function(f) {
        f();
      }
    }
  });

worldtimestream.map = function(a)  {
  var f = console.log.bind(console, a);
  return f;
};

worldtimestream.log = function(a)  {
  var f = console.log.bind(console, a);
  return f;
};

module.exports = worldtimestream;
