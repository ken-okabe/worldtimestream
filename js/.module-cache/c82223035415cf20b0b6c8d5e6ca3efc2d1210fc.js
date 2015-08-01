(function()  {
  'use strict';

  var extendMethod = function(object, methodName, method)  {
    if (typeof Object.defineProperty !== 'function') {
      object[methodName] = method;
    } else {
      Object.defineProperty(object, methodName, {
        configurable: false,
        enumerable: false,
        value: method
      });
    }
  };

  extendMethod(Object.prototype, 'argumentNames', function() {
    var names = this.toString().match(/^[\s\(]*function[^(]*\(([^)]*)\)/)[1]
      .replace(/\/\/.*?[\r\n]|\/\*(?:.|[\r\n])*?\*\//g, '')
      .replace(/\s+/g, '').split(',');
    return names.length === 1 && !names[0] ? [] : names;
  });

  var dynamicKey;
  var instance = false;

  var worldtimestream = function(cbF)  {
    if (typeof cbF === "function") {
      return function()  {
        if (instance === false) {
          dynamicKey = cbF.argumentNames()[0];
          if (typeof dynamicKey === "undefined") {
            dynamicKey = 't'; //fallback you must use t()
          }

          var o = Date.now;
          o.computeInterval = setInterval;

          cbF(o);
          instance = true;
        } else {
          throw "ERROR: This code runs in your single universe.";
        }
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
                function(f)  {
                  f(x);
                });
              return;
            }
          }
        });

      var o = {
        compute:function(f) {
          var f1 = function()  {
            computingF[computingF.length] = f; //push  f
          };
          return f1;
        },
        appear:function(a) {
          var f1 = function()  {
            value.val = a;
          };
          return f1;
        }
      };
      o[dynamicKey] = function()  {
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

  worldtimestream.log = function()  {
    var arg = arguments;
    var f = function()  {
      console.info.apply(console, arg);
    };
    return f;
  };

  var root = this;
  if (typeof module !== 'undefined' && module.exports) {
    module.exports = worldtimestream;
  } else {
    root.___ = worldtimestream;
  }

}.bind(this))();
