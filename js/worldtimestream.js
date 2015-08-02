'use strict';
(function () {
  var extendMethod = function extendMethod(object, methodName, method) {
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
  extendMethod(Object.prototype, 'argumentNames', function () {
    var names = this.toString().match(/^[\s\(]*function[^(]*\(([^)]*)\)/)[1].replace(/\/\/.*?[\r\n]|\/\*(?:.|[\r\n])*?\*\//g, '').replace(/\s+/g, '').split(',');
    return names.length === 1 && !names[0] ? [] : names;
  });
  var dynamicKey;
  var instance = false;
  var worldtimestream = function worldtimestream(cbF) {
    if (typeof cbF === "function") {
      return function () {
        if (instance === false) {
          dynamicKey = cbF.argumentNames()[0];
          if (typeof dynamicKey === "undefined") {
            dynamicKey = 't'; //fallback you must use t()
          }
          var o = Date.now;
          o.computeInterval = function () {
            for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
              args[_key] = arguments[_key];
            }

            var f = function f() {
              setInterval(args[0], args[1]);
            };
            return f;
          };
          o.computeTimeout = function () {
            for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
              args[_key2] = arguments[_key2];
            }

            var f = function f() {
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
      Object.defineProperties(value, {
        val: //value.val
        {
          get: function get() {
            return state;
          },
          set: function set(x) {
            state = x;
            computingF.map(function (f) {
              f(x);
            });
            return;
          }
        }
      });
      var o = {
        compute: function compute(f) {
          var f1 = function f1() {
            computingF[computingF.length] = f; //push  f
          };
          return f1;
        },
        appear: function appear(a) {
          var f1 = function f1() {
            value.val = a;
          };
          return f1;
        }
      };
      o[dynamicKey] = function () {
        return value.val;
      };
      return o;
    }
  };
  Object.defineProperties(worldtimestream, {
    world: //our physical world
    {
      set: function set(f) {
        f();
      }
    }
  });
  worldtimestream.log = function () {
    for (var _len3 = arguments.length, args = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
      args[_key3] = arguments[_key3];
    }

    var f = function f() {
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