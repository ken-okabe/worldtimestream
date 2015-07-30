'use strict';

var dynamic = 't';

var prototype = require('prototype');
Object.extend(global, prototype);

var worldtimestream = function(cbF)  {
  if (typeof cbF === "function") {
    return function()  {
      console.log('ee');
      function fn(foo, bar) {
        return foo + bar;
      }
      fn.argumentNames();
      cbF(Date.now);
    };
  } else {
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
      }
    };
    o[dynamic] = function()  {
      return value.val;
    };

    return o;
  }
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


worldtimestream.log = function(a)  {
  var f = console.log.bind(console, a);
  return f;
};

module.exports = worldtimestream;
