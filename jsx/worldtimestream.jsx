
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
          if (typeof dynamicKey === "undefined") {
            dynamicKey = 't'; //fallback you must use t()
          }
          var o = Date.now;
          o.computeInterval = (...args) => {
            var f = () => {
              setInterval(args[0], args[1]);
            };
            return f;
          };
          o.computeTimeout = (...args) => {
            var f = () => {
              setTimeout(args[0], args[1]);
            };
            return f;
          };
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
            get() {
              return state;
            },
            set(x) {
              state = x;
              computingF.map(
                (f) => {
                  f(x);
                });
              return;
            }
          }
        });
      var o = {
        compute(f) {
          var f1 = () => {
            computingF[computingF.length] = f; //push  f
          };
          return f1;
        },
        appear(a) {
          var f1 = () => {
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
  worldtimestream.log = (...args) => {
    var f = () => {
      console.info.apply(console, args);
    };
    return f;
  };

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = worldtimestream;
  } else {
    window.___ = worldtimestream;
  }

})();
