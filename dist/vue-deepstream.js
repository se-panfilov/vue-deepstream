(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("deepstream.io-client-js"));
	else if(typeof define === 'function' && define.amd)
		define(["deepstream.io-client-js"], factory);
	else if(typeof exports === 'object')
		exports["VueDeepstream"] = factory(require("deepstream.io-client-js"));
	else
		root["VueDeepstream"] = factory(root["deepstream.io-client-js"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_6__) {
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
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _classCallCheck2 = __webpack_require__(1);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(2);

	var _createClass3 = _interopRequireDefault(_createClass2);

	var _deepstream = __webpack_require__(6);

	var _deepstream2 = _interopRequireDefault(_deepstream);

	var _utils = __webpack_require__(7);

	var _utils2 = _interopRequireDefault(_utils);

	var _override = __webpack_require__(8);

	var _override2 = _interopRequireDefault(_override);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var Vue = void 0;

	var Deepstream = function () {
	  function Deepstream() {
	    var _ref = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

	    var _ref$host = _ref.host;
	    var host = _ref$host === undefined ? 'localhost' : _ref$host;
	    var _ref$port = _ref.port;
	    var port = _ref$port === undefined ? 8745 : _ref$port;
	    (0, _classCallCheck3.default)(this, Deepstream);

	    if (!Vue) {
	      throw new Error('[vue-deepstream] must call Vue.use(VueDeepstream) before creating an instance.');
	    }

	    this.host = host;
	    this.port = port;
	    this.client = null;
	  }

	  (0, _createClass3.default)(Deepstream, [{
	    key: 'connect',
	    value: function connect() {
	      this.client = (0, _deepstream2.default)(this.host + ':' + this.port);

	      return this;
	    }
	  }]);
	  return Deepstream;
	}();

	Deepstream.installed = false;

	Deepstream.install = function (_Vue) {
	  if (Deepstream.installed) {
	    (0, _utils.warn)('already installed');
	    return;
	  }

	  Vue = _Vue;
	  _utils2.default.Vue = Vue;
	  (0, _override2.default)(Vue);
	  Deepstream.installed = true;
	};

	if (typeof window !== 'undefined' && window.Vue) {
	  window.Vue.use(Deepstream);
	}

	exports.default = Deepstream;

/***/ },
/* 1 */
/***/ function(module, exports) {

	"use strict";

	exports.__esModule = true;

	exports.default = function (instance, Constructor) {
	  if (!(instance instanceof Constructor)) {
	    throw new TypeError("Cannot call a class as a function");
	  }
	};

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	exports.__esModule = true;

	var _defineProperty = __webpack_require__(3);

	var _defineProperty2 = _interopRequireDefault(_defineProperty);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = function () {
	  function defineProperties(target, props) {
	    for (var i = 0; i < props.length; i++) {
	      var descriptor = props[i];
	      descriptor.enumerable = descriptor.enumerable || false;
	      descriptor.configurable = true;
	      if ("value" in descriptor) descriptor.writable = true;
	      (0, _defineProperty2.default)(target, descriptor.key, descriptor);
	    }
	  }

	  return function (Constructor, protoProps, staticProps) {
	    if (protoProps) defineProperties(Constructor.prototype, protoProps);
	    if (staticProps) defineProperties(Constructor, staticProps);
	    return Constructor;
	  };
	}();

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(4), __esModule: true };

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	var $ = __webpack_require__(5);
	module.exports = function defineProperty(it, key, desc){
	  return $.setDesc(it, key, desc);
	};

/***/ },
/* 5 */
/***/ function(module, exports) {

	var $Object = Object;
	module.exports = {
	  create:     $Object.create,
	  getProto:   $Object.getPrototypeOf,
	  isEnum:     {}.propertyIsEnumerable,
	  getDesc:    $Object.getOwnPropertyDescriptor,
	  setDesc:    $Object.defineProperty,
	  setDescs:   $Object.defineProperties,
	  getKeys:    $Object.keys,
	  getNames:   $Object.getOwnPropertyNames,
	  getSymbols: $Object.getOwnPropertySymbols,
	  each:       [].forEach
	};

/***/ },
/* 6 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_6__;

/***/ },
/* 7 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.warn = warn;
	var _exports = {};
	exports.default = _exports;
	function warn(msg) {
	  if (window.console) {
	    console.warn('[vue-deepstream] ' + msg);
	    if (!_exports.Vue || _exports.Vue.config.debug) {
	      console.warn(new Error('warning stack trace:').stack);
	    }
	  }
	}

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	exports.default = function (Vue) {
	  var _init = Vue.prototype._init;
	  Vue.prototype._init = function () {
	    var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

	    options.init = options.init ? [dsInit].concat(options.init) : dsInit;

	    _init.call(this, options);
	  };

	  var _destroy = Vue.prototype._destroy;
	  Vue.prototype._destroy = function () {
	    if (this.$_ds) {
	      var _$_ds = this.$_ds;
	      var on = _$_ds.on;
	      var once = _$_ds.once;


	      if (on) {
	        for (var event in on) {
	          this.$ds.client.off(event, on[event]);
	        }
	      }

	      if (once) {
	        for (var _event in once) {
	          this.$ds.client.off(_event, once[_event]);
	        }
	      }
	    }

	    _destroy.apply(this, arguments);
	  };

	  function dsInit() {
	    var _this2 = this;

	    var _this = this;
	    var options = this.$options;
	    var deepstream = options.deepstream;
	    var ds = options.ds;

	    if (deepstream) {
	      this.$ds = deepstream;
	    } else if (options.parent && options.parent.$ds) {
	      this.$ds = options.parent.$ds;
	    }

	    if (ds) {
	      (function () {
	        if (!_this2.$ds) {
	          (0, _utils.warn)('deepstream not injected. Make sure to provide deepstream option in yout root component.');
	        }

	        _this2.$_ds = {};

	        var on = ds.on;
	        var once = ds.once;
	        var emit = ds.emit;
	        var rpc = ds.rpc;

	        var make = void 0,
	            provide = void 0;
	        if (rpc) {
	          make = rpc.make;
	          provide = rpc.provide;
	        }

	        if (on) {
	          _this2.$_ds.on = {};

	          var _loop = function _loop(event) {
	            _this2.$_ds.on[event] = function () {
	              on[event].apply(_this, arguments);
	            };
	            _this2.$ds.client.on(event, _this2.$_ds.on[event]);
	          };

	          for (var event in on) {
	            _loop(event);
	          }
	        }

	        if (once) {
	          _this2.$_ds.once = {};

	          var _loop2 = function _loop2(_event2) {
	            _this2.$_ds.once[_event2] = function () {
	              once[_event2].apply(_this, arguments);
	            };
	            _this2.$ds.client.once(_event2, _this2.$_ds.once[_event2]);
	          };

	          for (var _event2 in once) {
	            _loop2(_event2);
	          }
	        }

	        if (emit) {
	          options.methods = options.methods || {};
	          for (var _event3 in emit) {
	            options.methods[_event3] = makeBoundEmit(_event3, emit[_event3], _this2.$ds);
	          }
	        }

	        if (make) {
	          options.methods = options.methods || {};
	          for (var _rpc in make) {
	            options.methods[_rpc] = makeBoundMake(_rpc, make[_rpc], _this2.$ds);
	          }
	        }

	        if (provide) {}
	      })();
	    }

	    function makeBoundEmit(event, emit, ds) {
	      return function boundEmit() {
	        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	          args[_key] = arguments[_key];
	        }

	        var emitArgs = emit.call.apply(emit, [_this].concat(args));
	        ds.client.emit(event, emitArgs);

	        return emitArgs;
	      };
	    }

	    function makeBoundMake(rpc, fn, ds) {
	      return function boundMake(data) {
	        data = data || {};
	        ds.client.rpc.make(rpc, data, function (e, r) {
	          fn.call(_this, e, r);
	        });
	      };
	    }
	  }
	};

	var _utils = __webpack_require__(7);

/***/ }
/******/ ])
});
;