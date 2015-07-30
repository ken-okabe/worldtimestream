(() => {
  'use strict';

  var extendMethod = (object, methodName, method) => {
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

  var worldtimestream = (cbF) => {
    if (typeof cbF === "function") {
      return () => {
        if (instance === false) {
          dynamicKey = cbF.argumentNames()[0];
          cbF(Date.now);
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
            get() {
              return state;
            },
            set(x) {
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
        compute(f) {
          var f1 = function() {
            computingF[computingF.length] = f; //push  f
          };
          return f1;
        },
        appear(a) {
          var f1 = function() {
            value.val = a;
          };
          return f1;
        }
      };
      o[dynamicKey] = () => {
        return value.val;
      };

      return o;
    }
  };

  Object.defineProperties(worldtimestream,
    {
      world: //our physical world
      {
        set(f) {
          f();
        }
      }
    });

  worldtimestream.log = () => {
    var arg = arguments;
    var f = () => {
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

})();
