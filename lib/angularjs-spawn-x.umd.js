(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("Spawn"), require("angular"));
	else if(typeof define === 'function' && define.amd)
		define("ngSpawn", ["Spawn", "angular"], factory);
	else if(typeof exports === 'object')
		exports["ngSpawn"] = factory(require("Spawn"), require("angular"));
	else
		root["ngSpawn"] = factory(root["Spawn"], root["angular"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_3__, __WEBPACK_EXTERNAL_MODULE_4__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.l = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };

/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};

/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};

/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 5);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _angular = __webpack_require__(4);

var _angular2 = _interopRequireDefault(_angular);

var _spawnX = __webpack_require__(3);

var _helpers = __webpack_require__(2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _angular2.default.module('ngSpawnModule', []).provider('ngSpawn', ngSpawn).name;


function ngSpawn() {
  var store = void 0;

  this.createStore = function () {
    store = _spawnX.createStore.apply(undefined, arguments);
  };
  this.addInterceptor = function () {
    return _spawnX.addInterceptor.apply(undefined, arguments);
  };

  this.$get = function () {
    var connect = function connect(selection) {
      return function (component) {
        component['@@SPAWN'] = {
          selection: selection,
          callbacks: []
        };

        Object.keys(selection).forEach(function (key) {
          var zone = void 0,
              selector = void 0;

          if ((0, _helpers.isString)(selection[key])) {
            zone = selection[key];
            selector = selection[key];
          }

          if ((0, _helpers.isArray)(selection[key])) {
            if (selection[key].length === 1 && (0, _helpers.isString)(selection[key][0])) {
              zone = selection[key][0];
              selector = selection[key][0];
            }

            if (selection[key].length > 1 && (0, _helpers.isString)(selection[key][0]) && (0, _helpers.isFunc)(selection[key][1])) {
              zone = selection[key][0];
              selector = selection[key][1];
            }
          }

          if ((0, _helpers.isUndefined)(zone) || (0, _helpers.isUndefined)(selector)) {
            return (0, _helpers.error)('angularjs-spawn-x: incorrect arguments for selection');
          }

          detect({ zone: zone, component: component, key: key, selector: selector });
        });

        function detect(_ref) {
          var zone = _ref.zone,
              component = _ref.component,
              key = _ref.key,
              selector = _ref.selector;

          component['@@SPAWN']['callbacks'].push(updateWithState);
          return store.detect(zone, updateWithState, component, key, selector);
        }

        function updateWithState(component, key, selector) {
          component[key] = store.select(selector);
        }
      };
    };

    var disconnect = function disconnect(component) {
      Object.keys(component['@@SPAWN']['selection']).forEach(function (key) {
        component['@@SPAWN']['callbacks'].forEach(function (cb) {
          store.reject(key, cb);
        });
      });
    };

    var select = function select() {
      var _store;

      return (_store = store).select.apply(_store, arguments);
    };
    var detect = function detect() {
      var _store2;

      return (_store2 = store).detect.apply(_store2, arguments);
    };
    var reject = function reject() {
      var _store3;

      return (_store3 = store).reject.apply(_store3, arguments);
    };
    var update = function update() {
      var _store4;

      return (_store4 = store).update.apply(_store4, arguments);
    };

    return {
      connect: connect,
      disconnect: disconnect,
      select: select,
      detect: detect,
      reject: reject,
      update: update
    };
  };
}
module.exports = exports['default'];

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
function isArray(target) {
  return Array.isArray(target);
}

function isFunc(target) {
  return typeof target === 'function';
}

function isString(target) {
  return typeof target === 'string';
}

function isUndefined(target) {
  return typeof target === 'undefined';
}

function error(message) {
  throw new Error(message);
}

exports.isArray = isArray;
exports.isFunc = isFunc;
exports.isString = isString;
exports.isUndefined = isUndefined;
exports.error = error;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.error = exports.isUndefined = exports.isString = exports.isFunc = exports.isArray = undefined;

var _helpers = __webpack_require__(1);

exports.isArray = _helpers.isArray;
exports.isFunc = _helpers.isFunc;
exports.isString = _helpers.isString;
exports.isUndefined = _helpers.isUndefined;
exports.error = _helpers.error;

/***/ }),
/* 3 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_3__;

/***/ }),
/* 4 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_4__;

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _ngSpawn = __webpack_require__(0);

var _ngSpawn2 = _interopRequireDefault(_ngSpawn);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _ngSpawn2.default;
module.exports = exports['default'];

/***/ })
/******/ ]);
});