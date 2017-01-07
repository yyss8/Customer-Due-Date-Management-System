/******/ (function(modules) { // webpackBootstrap
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

	module.exports = __webpack_require__(1);


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _router = __webpack_require__(21);

	var _router2 = _interopRequireDefault(_router);

	var _store = __webpack_require__(36);

	var _store2 = _interopRequireDefault(_store);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var app = new Vue({
	    router: _router2.default,
	    store: _store2.default,
	    computed: {
	        isAuth: function isAuth() {
	            return _store2.default.state.loginStatus;
	        }
	    },
	    watch: {
	        "isAuth": function isAuth() {
	            if (this.isAuth) {
	                this.$router.push('/cp/createUser');
	            }
	        }
	    },
	    beforeCreate: function beforeCreate() {
	        $.ajax({
	            url: '/user/loginStatus',
	            type: 'GET',
	            success: function success(r) {
	                if (r.status == "ok") {
	                    _store2.default.commit("login", r.user);
	                }
	            }
	        });
	    }
	}).$mount('#main');

/***/ },
/* 2 */,
/* 3 */,
/* 4 */,
/* 5 */,
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_exports__, __vue_options__
	var __vue_styles__ = {}

	/* styles */
	__webpack_require__(22)

	/* script */
	__vue_exports__ = __webpack_require__(7)

	/* template */
	var __vue_template__ = __webpack_require__(8)
	__vue_options__ = __vue_exports__ = __vue_exports__ || {}
	if (
	  typeof __vue_exports__.default === "object" ||
	  typeof __vue_exports__.default === "function"
	) {
	if (Object.keys(__vue_exports__).some(function (key) { return key !== "default" && key !== "__esModule" })) {console.error("named exports are not supported in *.vue files.")}
	__vue_options__ = __vue_exports__ = __vue_exports__.default
	}
	if (typeof __vue_options__ === "function") {
	  __vue_options__ = __vue_options__.options
	}
	__vue_options__.__file = "D:\\b\\src\\components\\loginview.vue"
	__vue_options__.render = __vue_template__.render
	__vue_options__.staticRenderFns = __vue_template__.staticRenderFns

	/* hot reload */
	if (false) {(function () {
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  module.hot.accept()
	  if (!module.hot.data) {
	    hotAPI.createRecord("data-v-4aed13fc", __vue_options__)
	  } else {
	    hotAPI.reload("data-v-4aed13fc", __vue_options__)
	  }
	})()}
	if (__vue_options__.functional) {console.error("[vue-loader] loginview.vue: functional components are not supported and should be defined in plain js files using render functions.")}

	module.exports = __vue_exports__


/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _store = __webpack_require__(36);

	var _store2 = _interopRequireDefault(_store);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = {
	    data: function data() {
	        return {
	            username: '',
	            password: '',
	            email: '',
	            result: '',
	            resultSuccess: true,
	            resultAlert: true,
	            bntText: 'Login',
	            unPlaceholder: 'Username',
	            pwPlaceholder: 'Password',
	            emailDisplay: true,
	            formType: "login"
	        };
	    },

	    store: _store2.default,
	    methods: {
	        submitBnt: function submitBnt() {
	            if (this.formValid(this.formType)) {
	                switch (this.formType) {
	                    case 'login':
	                        this.login();
	                        break;
	                    case 'signup':
	                        this.signup();
	                        break;
	                }
	            }
	        },
	        login: function login() {
	            var _this = this;

	            $.ajax({
	                url: '/user/login',
	                type: 'GET',
	                data: { username: this.username, password: this.password },
	                success: function success(result) {
	                    if (result.status == "ok") {
	                        if (_this.resultAlert != true) {
	                            _this.resultAlert = true;
	                        }
	                        _store2.default.commit("login", result.user);
	                        _this.resultSuccess = false;
	                        _this.result = result.content;
	                    } else {
	                        _this.resultAlert = false;
	                        _this.result = result.content;
	                    }
	                }
	            });
	        },
	        signup: function signup() {
	            var _this2 = this;

	            $.ajax({
	                url: '/m/signup',
	                type: 'POST',
	                dataType: "json",
	                data: { 'username': this.username, 'password': this.password, 'email': this.email },
	                success: function success(result) {
	                    if (result.status == "ok") {
	                        if (_this2.resultAlert != true) {
	                            _this2.resultAlert = true;
	                        }
	                        _this2.resultSuccess = false;
	                        _this2.result = result.content;
	                    } else {
	                        _this2.resultAlert = false;
	                        _this2.result = result.content;
	                    }
	                }
	            });
	        },
	        formValid: function formValid(form) {
	            var emailValid = new RegExp('^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$');
	            if (this.username == "") {
	                this.resultAlert = false;
	                this.result = "Please Enter Username";
	                return false;
	            } else if (this.password == "") {
	                this.resultAlert = false;
	                this.result = "Please Enter Password";
	                return false;
	            } else if (form == 'signup' && this.email == "") {
	                this.resultAlert = false;
	                this.result = "Please Enter E-mail Address";
	                return false;
	            } else if (form == 'signup' && this.email.match(emailValid) == null) {
	                this.resultAlert = false;
	                this.result = "Please Enter Correct E-mail";
	                return false;
	            } else {
	                return true;
	            }
	        },
	        successMsg: function successMsg(txt) {
	            var _this3 = this;

	            this.msg = txt;
	            this.msgSuccess = true;
	            setTimeout(function () {
	                _this3.msg = "";
	                _this3.msgSuccess = false;
	            }, 3000);
	        },
	        errorMsg: function errorMsg(txt) {
	            var _this4 = this;

	            this.msg = txt;
	            this.msgError = true;
	            setTimeout(function () {
	                _this4.msg = "";
	                _this4.msgError = false;
	            }, 3000);
	        }
	    },
	    watch: {
	        'formType': function formType() {
	            switch (this.formType) {
	                case 'login':
	                    this.emailDisplay = true;
	                    this.bntText = 'Login';
	                    this.unPlaceholder = 'Username';
	                    this.pwPlaceholder = 'Password';
	                    break;
	                case 'signup':
	                    this.emailDisplay = false;
	                    this.bntText = "Sign Up";
	                    this.unPlaceholder = 'Pick A Username';
	                    this.pwPlaceholder = 'Enter Your Password';
	                    break;
	            }
	        }
	    }
	};

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
	  return _c('div', {
	    staticClass: "col-md-offset-4 col-md-4 login-view"
	  }, [_c('br'), _c('br'), _c('br'), _c('br'), _vm._v(" "), _c('div', {
	    staticClass: "col-md-offset-2 col-md-8"
	  }, [_c('form', {
	    attrs: {
	      "id": "login"
	    }
	  }, [_c('div', [_c('label', {
	    staticClass: "radio-inline"
	  }, [_c('input', {
	    directives: [{
	      name: "model",
	      rawName: "v-model",
	      value: (_vm.formType),
	      expression: "formType"
	    }],
	    staticStyle: {
	      "color": "white"
	    },
	    attrs: {
	      "type": "radio",
	      "value": "login"
	    },
	    domProps: {
	      "value": "login",
	      "checked": _vm._q(_vm.formType, "login")
	    },
	    on: {
	      "change": function($event) {
	        _vm.formType = "login"
	      }
	    }
	  }), _vm._v("Login")]), _vm._v(" "), _c('label', {
	    staticClass: "radio-inline"
	  }, [_c('input', {
	    directives: [{
	      name: "model",
	      rawName: "v-model",
	      value: (_vm.formType),
	      expression: "formType"
	    }],
	    staticStyle: {
	      "color": "white"
	    },
	    attrs: {
	      "type": "radio",
	      "value": "signup"
	    },
	    domProps: {
	      "value": "signup",
	      "checked": _vm._q(_vm.formType, "signup")
	    },
	    on: {
	      "change": function($event) {
	        _vm.formType = "signup"
	      }
	    }
	  }), _vm._v("Sign Up")])]), _c('br'), _vm._v(" "), _c('div', {
	    staticClass: "form-group"
	  }, [_c('div', {
	    staticClass: "input-group"
	  }, [_vm._m(0), _vm._v(" "), _c('input', {
	    directives: [{
	      name: "model",
	      rawName: "v-model",
	      value: (_vm.username),
	      expression: "username"
	    }],
	    staticClass: "form-control mainInput",
	    attrs: {
	      "type": "text",
	      "placeholder": _vm.unPlaceholder,
	      "required": "",
	      "data-minlength": "2"
	    },
	    domProps: {
	      "value": _vm._s(_vm.username)
	    },
	    on: {
	      "keyup": function($event) {
	        if (_vm._k($event.keyCode, "enter", 13)) { return; }
	        _vm.loginBnt($event)
	      },
	      "input": function($event) {
	        if ($event.target.composing) { return; }
	        _vm.username = $event.target.value
	      }
	    }
	  })])]), _vm._v(" "), _c('div', {
	    staticClass: "form-group"
	  }, [_c('div', {
	    staticClass: "input-group"
	  }, [_vm._m(1), _vm._v(" "), _c('input', {
	    directives: [{
	      name: "model",
	      rawName: "v-model",
	      value: (_vm.password),
	      expression: "password"
	    }],
	    staticClass: "form-control mainInput",
	    attrs: {
	      "type": "password",
	      "placeholder": _vm.pwPlaceholder,
	      "required": "",
	      "data-minlength": "6"
	    },
	    domProps: {
	      "value": _vm._s(_vm.password)
	    },
	    on: {
	      "keyup": function($event) {
	        if (_vm._k($event.keyCode, "enter", 13)) { return; }
	        _vm.loginBnt($event)
	      },
	      "input": function($event) {
	        if ($event.target.composing) { return; }
	        _vm.password = $event.target.value
	      }
	    }
	  })])]), _vm._v(" "), _c('div', {
	    staticClass: "form-group"
	  }, [_c('div', {
	    staticClass: "input-group",
	    class: {
	      hidden: _vm.emailDisplay
	    }
	  }, [_vm._m(2), _vm._v(" "), _c('input', {
	    directives: [{
	      name: "model",
	      rawName: "v-model",
	      value: (_vm.email),
	      expression: "email"
	    }],
	    staticClass: "form-control mainInput",
	    attrs: {
	      "type": "email",
	      "placeholder": "Enter Your E-mail",
	      "required": "",
	      "data-error": "Please Enter Correc E-mail"
	    },
	    domProps: {
	      "value": _vm._s(_vm.email)
	    },
	    on: {
	      "input": function($event) {
	        if ($event.target.composing) { return; }
	        _vm.email = $event.target.value
	      }
	    }
	  })])]), _vm._v(" "), _c('button', {
	    staticClass: "btn btn-primary mainBnt",
	    attrs: {
	      "type": "button"
	    },
	    on: {
	      "click": _vm.submitBnt
	    }
	  }, [_vm._v(_vm._s(_vm.bntText))])]), _c('br'), _c('b', {
	    staticStyle: {
	      "color": "white"
	    }
	  }, [_vm._v("Demo Account: ID:1 Pw:1")]), _vm._v(" "), _c('p', {
	    staticClass: "alert alert-danger",
	    class: {
	      hidden: _vm.resultAlert
	    },
	    attrs: {
	      "role": "alert"
	    }
	  }, [_c('i', {
	    staticClass: "fa  fa-exclamation fa-fw",
	    class: {
	      hidden: _vm.resultAlert
	    },
	    attrs: {
	      "aria-hidden": "true"
	    }
	  }), _vm._v("\n        " + _vm._s(_vm.result))]), _vm._v(" "), _c('p', {
	    staticClass: "alert alert-success",
	    class: {
	      hidden: _vm.resultSuccess
	    },
	    attrs: {
	      "role": "alert"
	    }
	  }, [_c('i', {
	    staticClass: "fa  fa-check fa-fw",
	    attrs: {
	      "aria-hidden": "true"
	    }
	  }), _vm._v("\n        " + _vm._s(_vm.result))])])])
	},staticRenderFns: [function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
	  return _c('span', {
	    staticClass: "input-group-addon"
	  }, [_c('i', {
	    staticClass: "fa fa-user fa-fw",
	    attrs: {
	      "aria-hidden": "true"
	    }
	  })])
	},function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
	  return _c('span', {
	    staticClass: "input-group-addon"
	  }, [_c('i', {
	    staticClass: "fa fa-key fa-fw",
	    attrs: {
	      "aria-hidden": "true"
	    }
	  })])
	},function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
	  return _c('span', {
	    staticClass: "input-group-addon"
	  }, [_c('i', {
	    staticClass: "fa fa-envelope fa-fw",
	    attrs: {
	      "aria-hidden": "true"
	    }
	  })])
	}]}
	module.exports.render._withStripped = true
	if (false) {
	  module.hot.accept()
	  if (module.hot.data) {
	     require("vue-hot-reload-api").rerender("data-v-4aed13fc", module.exports)
	  }
	}

/***/ },
/* 9 */,
/* 10 */,
/* 11 */,
/* 12 */,
/* 13 */,
/* 14 */,
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/**
	  * vue-router v2.1.1
	  * (c) 2016 Evan You
	  * @license MIT
	  */
	'use strict';

	var View = {
	  name: 'router-view',
	  functional: true,
	  props: {
	    name: {
	      type: String,
	      default: 'default'
	    }
	  },
	  render: function render (h, ref) {
	    var props = ref.props;
	    var children = ref.children;
	    var parent = ref.parent;
	    var data = ref.data;

	    data.routerView = true

	    var route = parent.$route
	    var cache = parent._routerViewCache || (parent._routerViewCache = {})
	    var depth = 0
	    var inactive = false

	    while (parent) {
	      if (parent.$vnode && parent.$vnode.data.routerView) {
	        depth++
	      }
	      if (parent._inactive) {
	        inactive = true
	      }
	      parent = parent.$parent
	    }

	    data.routerViewDepth = depth
	    var matched = route.matched[depth]
	    if (!matched) {
	      return h()
	    }

	    var name = props.name
	    var component = inactive
	      ? cache[name]
	      : (cache[name] = matched.components[name])

	    if (!inactive) {
	      var hooks = data.hook || (data.hook = {})
	      hooks.init = function (vnode) {
	        matched.instances[name] = vnode.child
	      }
	      hooks.prepatch = function (oldVnode, vnode) {
	        matched.instances[name] = vnode.child
	      }
	      hooks.destroy = function (vnode) {
	        if (matched.instances[name] === vnode.child) {
	          matched.instances[name] = undefined
	        }
	      }
	    }

	    return h(component, data, children)
	  }
	}

	/*  */

	function assert (condition, message) {
	  if (!condition) {
	    throw new Error(("[vue-router] " + message))
	  }
	}

	function warn (condition, message) {
	  if (!condition) {
	    typeof console !== 'undefined' && console.warn(("[vue-router] " + message))
	  }
	}

	/*  */

	var encode = encodeURIComponent
	var decode = decodeURIComponent

	function resolveQuery (
	  query,
	  extraQuery
	) {
	  if ( extraQuery === void 0 ) extraQuery = {};

	  if (query) {
	    var parsedQuery
	    try {
	      parsedQuery = parseQuery(query)
	    } catch (e) {
	      process.env.NODE_ENV !== 'production' && warn(false, e.message)
	      parsedQuery = {}
	    }
	    for (var key in extraQuery) {
	      parsedQuery[key] = extraQuery[key]
	    }
	    return parsedQuery
	  } else {
	    return extraQuery
	  }
	}

	function parseQuery (query) {
	  var res = {}

	  query = query.trim().replace(/^(\?|#|&)/, '')

	  if (!query) {
	    return res
	  }

	  query.split('&').forEach(function (param) {
	    var parts = param.replace(/\+/g, ' ').split('=')
	    var key = decode(parts.shift())
	    var val = parts.length > 0
	      ? decode(parts.join('='))
	      : null

	    if (res[key] === undefined) {
	      res[key] = val
	    } else if (Array.isArray(res[key])) {
	      res[key].push(val)
	    } else {
	      res[key] = [res[key], val]
	    }
	  })

	  return res
	}

	function stringifyQuery (obj) {
	  var res = obj ? Object.keys(obj).map(function (key) {
	    var val = obj[key]

	    if (val === undefined) {
	      return ''
	    }

	    if (val === null) {
	      return encode(key)
	    }

	    if (Array.isArray(val)) {
	      var result = []
	      val.slice().forEach(function (val2) {
	        if (val2 === undefined) {
	          return
	        }
	        if (val2 === null) {
	          result.push(encode(key))
	        } else {
	          result.push(encode(key) + '=' + encode(val2))
	        }
	      })
	      return result.join('&')
	    }

	    return encode(key) + '=' + encode(val)
	  }).filter(function (x) { return x.length > 0; }).join('&') : null
	  return res ? ("?" + res) : ''
	}

	/*  */

	function createRoute (
	  record,
	  location,
	  redirectedFrom
	) {
	  var route = {
	    name: location.name || (record && record.name),
	    meta: (record && record.meta) || {},
	    path: location.path || '/',
	    hash: location.hash || '',
	    query: location.query || {},
	    params: location.params || {},
	    fullPath: getFullPath(location),
	    matched: record ? formatMatch(record) : []
	  }
	  if (redirectedFrom) {
	    route.redirectedFrom = getFullPath(redirectedFrom)
	  }
	  return Object.freeze(route)
	}

	// the starting route that represents the initial state
	var START = createRoute(null, {
	  path: '/'
	})

	function formatMatch (record) {
	  var res = []
	  while (record) {
	    res.unshift(record)
	    record = record.parent
	  }
	  return res
	}

	function getFullPath (ref) {
	  var path = ref.path;
	  var query = ref.query; if ( query === void 0 ) query = {};
	  var hash = ref.hash; if ( hash === void 0 ) hash = '';

	  return (path || '/') + stringifyQuery(query) + hash
	}

	var trailingSlashRE = /\/$/
	function isSameRoute (a, b) {
	  if (b === START) {
	    return a === b
	  } else if (!b) {
	    return false
	  } else if (a.path && b.path) {
	    return (
	      a.path.replace(trailingSlashRE, '') === b.path.replace(trailingSlashRE, '') &&
	      a.hash === b.hash &&
	      isObjectEqual(a.query, b.query)
	    )
	  } else if (a.name && b.name) {
	    return (
	      a.name === b.name &&
	      a.hash === b.hash &&
	      isObjectEqual(a.query, b.query) &&
	      isObjectEqual(a.params, b.params)
	    )
	  } else {
	    return false
	  }
	}

	function isObjectEqual (a, b) {
	  if ( a === void 0 ) a = {};
	  if ( b === void 0 ) b = {};

	  var aKeys = Object.keys(a)
	  var bKeys = Object.keys(b)
	  if (aKeys.length !== bKeys.length) {
	    return false
	  }
	  return aKeys.every(function (key) { return String(a[key]) === String(b[key]); })
	}

	function isIncludedRoute (current, target) {
	  return (
	    current.path.indexOf(target.path.replace(/\/$/, '')) === 0 &&
	    (!target.hash || current.hash === target.hash) &&
	    queryIncludes(current.query, target.query)
	  )
	}

	function queryIncludes (current, target) {
	  for (var key in target) {
	    if (!(key in current)) {
	      return false
	    }
	  }
	  return true
	}

	/*  */

	// work around weird flow bug
	var toTypes = [String, Object]

	var Link = {
	  name: 'router-link',
	  props: {
	    to: {
	      type: toTypes,
	      required: true
	    },
	    tag: {
	      type: String,
	      default: 'a'
	    },
	    exact: Boolean,
	    append: Boolean,
	    replace: Boolean,
	    activeClass: String,
	    event: {
	      type: [String, Array],
	      default: 'click'
	    }
	  },
	  render: function render (h) {
	    var this$1 = this;

	    var router = this.$router
	    var current = this.$route
	    var ref = router.resolve(this.to, current, this.append);
	    var normalizedTo = ref.normalizedTo;
	    var resolved = ref.resolved;
	    var href = ref.href;
	    var classes = {}
	    var activeClass = this.activeClass || router.options.linkActiveClass || 'router-link-active'
	    var compareTarget = normalizedTo.path ? createRoute(null, normalizedTo) : resolved
	    classes[activeClass] = this.exact
	      ? isSameRoute(current, compareTarget)
	      : isIncludedRoute(current, compareTarget)

	    var handler = function (e) {
	      if (guardEvent(e)) {
	        if (this$1.replace) {
	          router.replace(normalizedTo)
	        } else {
	          router.push(normalizedTo)
	        }
	      }
	    }

	    var on = { click: guardEvent }
	    if (Array.isArray(this.event)) {
	      this.event.forEach(function (e) { on[e] = handler })
	    } else {
	      on[this.event] = handler
	    }

	    var data = {
	      class: classes
	    }

	    if (this.tag === 'a') {
	      data.on = on
	      data.attrs = { href: href }
	    } else {
	      // find the first <a> child and apply listener and href
	      var a = findAnchor(this.$slots.default)
	      if (a) {
	        // in case the <a> is a static node
	        a.isStatic = false
	        var extend = _Vue.util.extend
	        var aData = a.data = extend({}, a.data)
	        aData.on = on
	        var aAttrs = a.data.attrs = extend({}, a.data.attrs)
	        aAttrs.href = href
	      } else {
	        // doesn't have <a> child, apply listener to self
	        data.on = on
	      }
	    }

	    return h(this.tag, data, this.$slots.default)
	  }
	}

	function guardEvent (e) {
	  // don't redirect with control keys
	  /* istanbul ignore if */
	  if (e.metaKey || e.ctrlKey || e.shiftKey) { return }
	  // don't redirect when preventDefault called
	  /* istanbul ignore if */
	  if (e.defaultPrevented) { return }
	  // don't redirect on right click
	  /* istanbul ignore if */
	  if (e.button !== 0) { return }
	  // don't redirect if `target="_blank"`
	  /* istanbul ignore if */
	  var target = e.target.getAttribute('target')
	  if (/\b_blank\b/i.test(target)) { return }

	  e.preventDefault()
	  return true
	}

	function findAnchor (children) {
	  if (children) {
	    var child
	    for (var i = 0; i < children.length; i++) {
	      child = children[i]
	      if (child.tag === 'a') {
	        return child
	      }
	      if (child.children && (child = findAnchor(child.children))) {
	        return child
	      }
	    }
	  }
	}

	var _Vue

	function install (Vue) {
	  if (install.installed) { return }
	  install.installed = true

	  _Vue = Vue

	  Object.defineProperty(Vue.prototype, '$router', {
	    get: function get () { return this.$root._router }
	  })

	  Object.defineProperty(Vue.prototype, '$route', {
	    get: function get$1 () { return this.$root._route }
	  })

	  Vue.mixin({
	    beforeCreate: function beforeCreate () {
	      if (this.$options.router) {
	        this._router = this.$options.router
	        this._router.init(this)
	        Vue.util.defineReactive(this, '_route', this._router.history.current)
	      }
	    }
	  })

	  Vue.component('router-view', View)
	  Vue.component('router-link', Link)

	  var strats = Vue.config.optionMergeStrategies
	  // use the same hook merging strategy for route hooks
	  strats.beforeRouteEnter = strats.beforeRouteLeave = strats.created
	}

	/*  */

	function resolvePath (
	  relative,
	  base,
	  append
	) {
	  if (relative.charAt(0) === '/') {
	    return relative
	  }

	  if (relative.charAt(0) === '?' || relative.charAt(0) === '#') {
	    return base + relative
	  }

	  var stack = base.split('/')

	  // remove trailing segment if:
	  // - not appending
	  // - appending to trailing slash (last segment is empty)
	  if (!append || !stack[stack.length - 1]) {
	    stack.pop()
	  }

	  // resolve relative path
	  var segments = relative.replace(/^\//, '').split('/')
	  for (var i = 0; i < segments.length; i++) {
	    var segment = segments[i]
	    if (segment === '.') {
	      continue
	    } else if (segment === '..') {
	      stack.pop()
	    } else {
	      stack.push(segment)
	    }
	  }

	  // ensure leading slash
	  if (stack[0] !== '') {
	    stack.unshift('')
	  }

	  return stack.join('/')
	}

	function parsePath (path) {
	  var hash = ''
	  var query = ''

	  var hashIndex = path.indexOf('#')
	  if (hashIndex >= 0) {
	    hash = path.slice(hashIndex)
	    path = path.slice(0, hashIndex)
	  }

	  var queryIndex = path.indexOf('?')
	  if (queryIndex >= 0) {
	    query = path.slice(queryIndex + 1)
	    path = path.slice(0, queryIndex)
	  }

	  return {
	    path: path,
	    query: query,
	    hash: hash
	  }
	}

	function cleanPath (path) {
	  return path.replace(/\/\//g, '/')
	}

	/*  */

	function createRouteMap (routes) {
	  var pathMap = Object.create(null)
	  var nameMap = Object.create(null)

	  routes.forEach(function (route) {
	    addRouteRecord(pathMap, nameMap, route)
	  })

	  return {
	    pathMap: pathMap,
	    nameMap: nameMap
	  }
	}

	function addRouteRecord (
	  pathMap,
	  nameMap,
	  route,
	  parent,
	  matchAs
	) {
	  var path = route.path;
	  var name = route.name;
	  if (process.env.NODE_ENV !== 'production') {
	    assert(path != null, "\"path\" is required in a route configuration.")
	    assert(
	      typeof route.component !== 'string',
	      "route config \"component\" for path: " + (String(path || name)) + " cannot be a " +
	      "string id. Use an actual component instead."
	    )
	  }

	  var record = {
	    path: normalizePath(path, parent),
	    components: route.components || { default: route.component },
	    instances: {},
	    name: name,
	    parent: parent,
	    matchAs: matchAs,
	    redirect: route.redirect,
	    beforeEnter: route.beforeEnter,
	    meta: route.meta || {}
	  }

	  if (route.children) {
	    // Warn if route is named and has a default child route.
	    // If users navigate to this route by name, the default child will
	    // not be rendered (GH Issue #629)
	    if (process.env.NODE_ENV !== 'production') {
	      if (route.name && route.children.some(function (child) { return /^\/?$/.test(child.path); })) {
	        warn(false, ("Named Route '" + (route.name) + "' has a default child route.\n          When navigating to this named route (:to=\"{name: '" + (route.name) + "'\"), the default child route will not be rendered.\n          Remove the name from this route and use the name of the default child route for named links instead.")
	        )
	      }
	    }
	    route.children.forEach(function (child) {
	      addRouteRecord(pathMap, nameMap, child, record)
	    })
	  }

	  if (route.alias !== undefined) {
	    if (Array.isArray(route.alias)) {
	      route.alias.forEach(function (alias) {
	        addRouteRecord(pathMap, nameMap, { path: alias }, parent, record.path)
	      })
	    } else {
	      addRouteRecord(pathMap, nameMap, { path: route.alias }, parent, record.path)
	    }
	  }

	  if (!pathMap[record.path]) {
	    pathMap[record.path] = record
	  }
	  if (name) {
	    if (!nameMap[name]) {
	      nameMap[name] = record
	    } else if (process.env.NODE_ENV !== 'production') {
	      warn(false, ("Duplicate named routes definition: { name: \"" + name + "\", path: \"" + (record.path) + "\" }"))
	    }
	  }
	}

	function normalizePath (path, parent) {
	  path = path.replace(/\/$/, '')
	  if (path[0] === '/') { return path }
	  if (parent == null) { return path }
	  return cleanPath(((parent.path) + "/" + path))
	}

	var __moduleExports = Array.isArray || function (arr) {
	  return Object.prototype.toString.call(arr) == '[object Array]';
	};

	var isarray = __moduleExports

	/**
	 * Expose `pathToRegexp`.
	 */
	var index = pathToRegexp
	var parse_1 = parse
	var compile_1 = compile
	var tokensToFunction_1 = tokensToFunction
	var tokensToRegExp_1 = tokensToRegExp

	/**
	 * The main path matching regexp utility.
	 *
	 * @type {RegExp}
	 */
	var PATH_REGEXP = new RegExp([
	  // Match escaped characters that would otherwise appear in future matches.
	  // This allows the user to escape special characters that won't transform.
	  '(\\\\.)',
	  // Match Express-style parameters and un-named parameters with a prefix
	  // and optional suffixes. Matches appear as:
	  //
	  // "/:test(\\d+)?" => ["/", "test", "\d+", undefined, "?", undefined]
	  // "/route(\\d+)"  => [undefined, undefined, undefined, "\d+", undefined, undefined]
	  // "/*"            => ["/", undefined, undefined, undefined, undefined, "*"]
	  '([\\/.])?(?:(?:\\:(\\w+)(?:\\(((?:\\\\.|[^\\\\()])+)\\))?|\\(((?:\\\\.|[^\\\\()])+)\\))([+*?])?|(\\*))'
	].join('|'), 'g')

	/**
	 * Parse a string for the raw tokens.
	 *
	 * @param  {string}  str
	 * @param  {Object=} options
	 * @return {!Array}
	 */
	function parse (str, options) {
	  var tokens = []
	  var key = 0
	  var index = 0
	  var path = ''
	  var defaultDelimiter = options && options.delimiter || '/'
	  var res

	  while ((res = PATH_REGEXP.exec(str)) != null) {
	    var m = res[0]
	    var escaped = res[1]
	    var offset = res.index
	    path += str.slice(index, offset)
	    index = offset + m.length

	    // Ignore already escaped sequences.
	    if (escaped) {
	      path += escaped[1]
	      continue
	    }

	    var next = str[index]
	    var prefix = res[2]
	    var name = res[3]
	    var capture = res[4]
	    var group = res[5]
	    var modifier = res[6]
	    var asterisk = res[7]

	    // Push the current path onto the tokens.
	    if (path) {
	      tokens.push(path)
	      path = ''
	    }

	    var partial = prefix != null && next != null && next !== prefix
	    var repeat = modifier === '+' || modifier === '*'
	    var optional = modifier === '?' || modifier === '*'
	    var delimiter = res[2] || defaultDelimiter
	    var pattern = capture || group

	    tokens.push({
	      name: name || key++,
	      prefix: prefix || '',
	      delimiter: delimiter,
	      optional: optional,
	      repeat: repeat,
	      partial: partial,
	      asterisk: !!asterisk,
	      pattern: pattern ? escapeGroup(pattern) : (asterisk ? '.*' : '[^' + escapeString(delimiter) + ']+?')
	    })
	  }

	  // Match any characters still remaining.
	  if (index < str.length) {
	    path += str.substr(index)
	  }

	  // If the path exists, push it onto the end.
	  if (path) {
	    tokens.push(path)
	  }

	  return tokens
	}

	/**
	 * Compile a string to a template function for the path.
	 *
	 * @param  {string}             str
	 * @param  {Object=}            options
	 * @return {!function(Object=, Object=)}
	 */
	function compile (str, options) {
	  return tokensToFunction(parse(str, options))
	}

	/**
	 * Prettier encoding of URI path segments.
	 *
	 * @param  {string}
	 * @return {string}
	 */
	function encodeURIComponentPretty (str) {
	  return encodeURI(str).replace(/[\/?#]/g, function (c) {
	    return '%' + c.charCodeAt(0).toString(16).toUpperCase()
	  })
	}

	/**
	 * Encode the asterisk parameter. Similar to `pretty`, but allows slashes.
	 *
	 * @param  {string}
	 * @return {string}
	 */
	function encodeAsterisk (str) {
	  return encodeURI(str).replace(/[?#]/g, function (c) {
	    return '%' + c.charCodeAt(0).toString(16).toUpperCase()
	  })
	}

	/**
	 * Expose a method for transforming tokens into the path function.
	 */
	function tokensToFunction (tokens) {
	  // Compile all the tokens into regexps.
	  var matches = new Array(tokens.length)

	  // Compile all the patterns before compilation.
	  for (var i = 0; i < tokens.length; i++) {
	    if (typeof tokens[i] === 'object') {
	      matches[i] = new RegExp('^(?:' + tokens[i].pattern + ')$')
	    }
	  }

	  return function (obj, opts) {
	    var path = ''
	    var data = obj || {}
	    var options = opts || {}
	    var encode = options.pretty ? encodeURIComponentPretty : encodeURIComponent

	    for (var i = 0; i < tokens.length; i++) {
	      var token = tokens[i]

	      if (typeof token === 'string') {
	        path += token

	        continue
	      }

	      var value = data[token.name]
	      var segment

	      if (value == null) {
	        if (token.optional) {
	          // Prepend partial segment prefixes.
	          if (token.partial) {
	            path += token.prefix
	          }

	          continue
	        } else {
	          throw new TypeError('Expected "' + token.name + '" to be defined')
	        }
	      }

	      if (isarray(value)) {
	        if (!token.repeat) {
	          throw new TypeError('Expected "' + token.name + '" to not repeat, but received `' + JSON.stringify(value) + '`')
	        }

	        if (value.length === 0) {
	          if (token.optional) {
	            continue
	          } else {
	            throw new TypeError('Expected "' + token.name + '" to not be empty')
	          }
	        }

	        for (var j = 0; j < value.length; j++) {
	          segment = encode(value[j])

	          if (!matches[i].test(segment)) {
	            throw new TypeError('Expected all "' + token.name + '" to match "' + token.pattern + '", but received `' + JSON.stringify(segment) + '`')
	          }

	          path += (j === 0 ? token.prefix : token.delimiter) + segment
	        }

	        continue
	      }

	      segment = token.asterisk ? encodeAsterisk(value) : encode(value)

	      if (!matches[i].test(segment)) {
	        throw new TypeError('Expected "' + token.name + '" to match "' + token.pattern + '", but received "' + segment + '"')
	      }

	      path += token.prefix + segment
	    }

	    return path
	  }
	}

	/**
	 * Escape a regular expression string.
	 *
	 * @param  {string} str
	 * @return {string}
	 */
	function escapeString (str) {
	  return str.replace(/([.+*?=^!:${}()[\]|\/\\])/g, '\\$1')
	}

	/**
	 * Escape the capturing group by escaping special characters and meaning.
	 *
	 * @param  {string} group
	 * @return {string}
	 */
	function escapeGroup (group) {
	  return group.replace(/([=!:$\/()])/g, '\\$1')
	}

	/**
	 * Attach the keys as a property of the regexp.
	 *
	 * @param  {!RegExp} re
	 * @param  {Array}   keys
	 * @return {!RegExp}
	 */
	function attachKeys (re, keys) {
	  re.keys = keys
	  return re
	}

	/**
	 * Get the flags for a regexp from the options.
	 *
	 * @param  {Object} options
	 * @return {string}
	 */
	function flags (options) {
	  return options.sensitive ? '' : 'i'
	}

	/**
	 * Pull out keys from a regexp.
	 *
	 * @param  {!RegExp} path
	 * @param  {!Array}  keys
	 * @return {!RegExp}
	 */
	function regexpToRegexp (path, keys) {
	  // Use a negative lookahead to match only capturing groups.
	  var groups = path.source.match(/\((?!\?)/g)

	  if (groups) {
	    for (var i = 0; i < groups.length; i++) {
	      keys.push({
	        name: i,
	        prefix: null,
	        delimiter: null,
	        optional: false,
	        repeat: false,
	        partial: false,
	        asterisk: false,
	        pattern: null
	      })
	    }
	  }

	  return attachKeys(path, keys)
	}

	/**
	 * Transform an array into a regexp.
	 *
	 * @param  {!Array}  path
	 * @param  {Array}   keys
	 * @param  {!Object} options
	 * @return {!RegExp}
	 */
	function arrayToRegexp (path, keys, options) {
	  var parts = []

	  for (var i = 0; i < path.length; i++) {
	    parts.push(pathToRegexp(path[i], keys, options).source)
	  }

	  var regexp = new RegExp('(?:' + parts.join('|') + ')', flags(options))

	  return attachKeys(regexp, keys)
	}

	/**
	 * Create a path regexp from string input.
	 *
	 * @param  {string}  path
	 * @param  {!Array}  keys
	 * @param  {!Object} options
	 * @return {!RegExp}
	 */
	function stringToRegexp (path, keys, options) {
	  return tokensToRegExp(parse(path, options), keys, options)
	}

	/**
	 * Expose a function for taking tokens and returning a RegExp.
	 *
	 * @param  {!Array}          tokens
	 * @param  {(Array|Object)=} keys
	 * @param  {Object=}         options
	 * @return {!RegExp}
	 */
	function tokensToRegExp (tokens, keys, options) {
	  if (!isarray(keys)) {
	    options = /** @type {!Object} */ (keys || options)
	    keys = []
	  }

	  options = options || {}

	  var strict = options.strict
	  var end = options.end !== false
	  var route = ''

	  // Iterate over the tokens and create our regexp string.
	  for (var i = 0; i < tokens.length; i++) {
	    var token = tokens[i]

	    if (typeof token === 'string') {
	      route += escapeString(token)
	    } else {
	      var prefix = escapeString(token.prefix)
	      var capture = '(?:' + token.pattern + ')'

	      keys.push(token)

	      if (token.repeat) {
	        capture += '(?:' + prefix + capture + ')*'
	      }

	      if (token.optional) {
	        if (!token.partial) {
	          capture = '(?:' + prefix + '(' + capture + '))?'
	        } else {
	          capture = prefix + '(' + capture + ')?'
	        }
	      } else {
	        capture = prefix + '(' + capture + ')'
	      }

	      route += capture
	    }
	  }

	  var delimiter = escapeString(options.delimiter || '/')
	  var endsWithDelimiter = route.slice(-delimiter.length) === delimiter

	  // In non-strict mode we allow a slash at the end of match. If the path to
	  // match already ends with a slash, we remove it for consistency. The slash
	  // is valid at the end of a path match, not in the middle. This is important
	  // in non-ending mode, where "/test/" shouldn't match "/test//route".
	  if (!strict) {
	    route = (endsWithDelimiter ? route.slice(0, -delimiter.length) : route) + '(?:' + delimiter + '(?=$))?'
	  }

	  if (end) {
	    route += '$'
	  } else {
	    // In non-ending mode, we need the capturing groups to match as much as
	    // possible by using a positive lookahead to the end or next path segment.
	    route += strict && endsWithDelimiter ? '' : '(?=' + delimiter + '|$)'
	  }

	  return attachKeys(new RegExp('^' + route, flags(options)), keys)
	}

	/**
	 * Normalize the given path string, returning a regular expression.
	 *
	 * An empty array can be passed in for the keys, which will hold the
	 * placeholder key descriptions. For example, using `/user/:id`, `keys` will
	 * contain `[{ name: 'id', delimiter: '/', optional: false, repeat: false }]`.
	 *
	 * @param  {(string|RegExp|Array)} path
	 * @param  {(Array|Object)=}       keys
	 * @param  {Object=}               options
	 * @return {!RegExp}
	 */
	function pathToRegexp (path, keys, options) {
	  if (!isarray(keys)) {
	    options = /** @type {!Object} */ (keys || options)
	    keys = []
	  }

	  options = options || {}

	  if (path instanceof RegExp) {
	    return regexpToRegexp(path, /** @type {!Array} */ (keys))
	  }

	  if (isarray(path)) {
	    return arrayToRegexp(/** @type {!Array} */ (path), /** @type {!Array} */ (keys), options)
	  }

	  return stringToRegexp(/** @type {string} */ (path), /** @type {!Array} */ (keys), options)
	}

	index.parse = parse_1;
	index.compile = compile_1;
	index.tokensToFunction = tokensToFunction_1;
	index.tokensToRegExp = tokensToRegExp_1;

	/*  */

	var regexpCache = Object.create(null)

	function getRouteRegex (path) {
	  var hit = regexpCache[path]
	  var keys, regexp

	  if (hit) {
	    keys = hit.keys
	    regexp = hit.regexp
	  } else {
	    keys = []
	    regexp = index(path, keys)
	    regexpCache[path] = { keys: keys, regexp: regexp }
	  }

	  return { keys: keys, regexp: regexp }
	}

	var regexpCompileCache = Object.create(null)

	function fillParams (
	  path,
	  params,
	  routeMsg
	) {
	  try {
	    var filler =
	      regexpCompileCache[path] ||
	      (regexpCompileCache[path] = index.compile(path))
	    return filler(params || {}, { pretty: true })
	  } catch (e) {
	    if (process.env.NODE_ENV !== 'production') {
	      warn(false, ("missing param for " + routeMsg + ": " + (e.message)))
	    }
	    return ''
	  }
	}

	/*  */

	function normalizeLocation (
	  raw,
	  current,
	  append
	) {
	  var next = typeof raw === 'string' ? { path: raw } : raw
	  // named target
	  if (next.name || next._normalized) {
	    return next
	  }

	  // relative params
	  if (!next.path && next.params && current) {
	    next = assign({}, next)
	    next._normalized = true
	    var params = assign(assign({}, current.params), next.params)
	    if (current.name) {
	      next.name = current.name
	      next.params = params
	    } else if (current.matched) {
	      var rawPath = current.matched[current.matched.length - 1].path
	      next.path = fillParams(rawPath, params, ("path " + (current.path)))
	    } else if (process.env.NODE_ENV !== 'production') {
	      warn(false, "relative params navigation requires a current route.")
	    }
	    return next
	  }

	  var parsedPath = parsePath(next.path || '')
	  var basePath = (current && current.path) || '/'
	  var path = parsedPath.path
	    ? resolvePath(parsedPath.path, basePath, append || next.append)
	    : (current && current.path) || '/'
	  var query = resolveQuery(parsedPath.query, next.query)
	  var hash = next.hash || parsedPath.hash
	  if (hash && hash.charAt(0) !== '#') {
	    hash = "#" + hash
	  }

	  return {
	    _normalized: true,
	    path: path,
	    query: query,
	    hash: hash
	  }
	}

	function assign (a, b) {
	  for (var key in b) {
	    a[key] = b[key]
	  }
	  return a
	}

	/*  */

	function createMatcher (routes) {
	  var ref = createRouteMap(routes);
	  var pathMap = ref.pathMap;
	  var nameMap = ref.nameMap;

	  function match (
	    raw,
	    currentRoute,
	    redirectedFrom
	  ) {
	    var location = normalizeLocation(raw, currentRoute)
	    var name = location.name;

	    if (name) {
	      var record = nameMap[name]
	      var paramNames = getRouteRegex(record.path).keys
	        .filter(function (key) { return !key.optional; })
	        .map(function (key) { return key.name; })

	      if (typeof location.params !== 'object') {
	        location.params = {}
	      }

	      if (currentRoute && typeof currentRoute.params === 'object') {
	        for (var key in currentRoute.params) {
	          if (!(key in location.params) && paramNames.indexOf(key) > -1) {
	            location.params[key] = currentRoute.params[key]
	          }
	        }
	      }

	      if (record) {
	        location.path = fillParams(record.path, location.params, ("named route \"" + name + "\""))
	        return _createRoute(record, location, redirectedFrom)
	      }
	    } else if (location.path) {
	      location.params = {}
	      for (var path in pathMap) {
	        if (matchRoute(path, location.params, location.path)) {
	          return _createRoute(pathMap[path], location, redirectedFrom)
	        }
	      }
	    }
	    // no match
	    return _createRoute(null, location)
	  }

	  function redirect (
	    record,
	    location
	  ) {
	    var originalRedirect = record.redirect
	    var redirect = typeof originalRedirect === 'function'
	        ? originalRedirect(createRoute(record, location))
	        : originalRedirect

	    if (typeof redirect === 'string') {
	      redirect = { path: redirect }
	    }

	    if (!redirect || typeof redirect !== 'object') {
	      process.env.NODE_ENV !== 'production' && warn(
	        false, ("invalid redirect option: " + (JSON.stringify(redirect)))
	      )
	      return _createRoute(null, location)
	    }

	    var re = redirect
	    var name = re.name;
	    var path = re.path;
	    var query = location.query;
	    var hash = location.hash;
	    var params = location.params;
	    query = re.hasOwnProperty('query') ? re.query : query
	    hash = re.hasOwnProperty('hash') ? re.hash : hash
	    params = re.hasOwnProperty('params') ? re.params : params

	    if (name) {
	      // resolved named direct
	      var targetRecord = nameMap[name]
	      if (process.env.NODE_ENV !== 'production') {
	        assert(targetRecord, ("redirect failed: named route \"" + name + "\" not found."))
	      }
	      return match({
	        _normalized: true,
	        name: name,
	        query: query,
	        hash: hash,
	        params: params
	      }, undefined, location)
	    } else if (path) {
	      // 1. resolve relative redirect
	      var rawPath = resolveRecordPath(path, record)
	      // 2. resolve params
	      var resolvedPath = fillParams(rawPath, params, ("redirect route with path \"" + rawPath + "\""))
	      // 3. rematch with existing query and hash
	      return match({
	        _normalized: true,
	        path: resolvedPath,
	        query: query,
	        hash: hash
	      }, undefined, location)
	    } else {
	      warn(false, ("invalid redirect option: " + (JSON.stringify(redirect))))
	      return _createRoute(null, location)
	    }
	  }

	  function alias (
	    record,
	    location,
	    matchAs
	  ) {
	    var aliasedPath = fillParams(matchAs, location.params, ("aliased route with path \"" + matchAs + "\""))
	    var aliasedMatch = match({
	      _normalized: true,
	      path: aliasedPath
	    })
	    if (aliasedMatch) {
	      var matched = aliasedMatch.matched
	      var aliasedRecord = matched[matched.length - 1]
	      location.params = aliasedMatch.params
	      return _createRoute(aliasedRecord, location)
	    }
	    return _createRoute(null, location)
	  }

	  function _createRoute (
	    record,
	    location,
	    redirectedFrom
	  ) {
	    if (record && record.redirect) {
	      return redirect(record, redirectedFrom || location)
	    }
	    if (record && record.matchAs) {
	      return alias(record, location, record.matchAs)
	    }
	    return createRoute(record, location, redirectedFrom)
	  }

	  return match
	}

	function matchRoute (
	  path,
	  params,
	  pathname
	) {
	  var ref = getRouteRegex(path);
	  var regexp = ref.regexp;
	  var keys = ref.keys;
	  var m = pathname.match(regexp)

	  if (!m) {
	    return false
	  } else if (!params) {
	    return true
	  }

	  for (var i = 1, len = m.length; i < len; ++i) {
	    var key = keys[i - 1]
	    var val = typeof m[i] === 'string' ? decodeURIComponent(m[i]) : m[i]
	    if (key) { params[key.name] = val }
	  }

	  return true
	}

	function resolveRecordPath (path, record) {
	  return resolvePath(path, record.parent ? record.parent.path : '/', true)
	}

	/*  */

	var inBrowser = typeof window !== 'undefined'

	var supportsHistory = inBrowser && (function () {
	  var ua = window.navigator.userAgent

	  if (
	    (ua.indexOf('Android 2.') !== -1 || ua.indexOf('Android 4.0') !== -1) &&
	    ua.indexOf('Mobile Safari') !== -1 &&
	    ua.indexOf('Chrome') === -1 &&
	    ua.indexOf('Windows Phone') === -1
	  ) {
	    return false
	  }

	  return window.history && 'pushState' in window.history
	})()

	/*  */

	function runQueue (queue, fn, cb) {
	  var step = function (index) {
	    if (index >= queue.length) {
	      cb()
	    } else {
	      if (queue[index]) {
	        fn(queue[index], function () {
	          step(index + 1)
	        })
	      } else {
	        step(index + 1)
	      }
	    }
	  }
	  step(0)
	}

	/*  */


	var History = function History (router, base) {
	  this.router = router
	  this.base = normalizeBase(base)
	  // start with a route object that stands for "nowhere"
	  this.current = START
	  this.pending = null
	};

	History.prototype.listen = function listen (cb) {
	  this.cb = cb
	};

	History.prototype.transitionTo = function transitionTo (location, onComplete, onAbort) {
	    var this$1 = this;

	  var route = this.router.match(location, this.current)
	  this.confirmTransition(route, function () {
	    this$1.updateRoute(route)
	    onComplete && onComplete(route)
	    this$1.ensureURL()
	  }, onAbort)
	};

	History.prototype.confirmTransition = function confirmTransition (route, onComplete, onAbort) {
	    var this$1 = this;

	  var current = this.current
	  var abort = function () { onAbort && onAbort() }
	  if (isSameRoute(route, current)) {
	    this.ensureURL()
	    return abort()
	  }

	  var ref = resolveQueue(this.current.matched, route.matched);
	    var deactivated = ref.deactivated;
	    var activated = ref.activated;

	  var queue = [].concat(
	    // in-component leave guards
	    extractLeaveGuards(deactivated),
	    // global before hooks
	    this.router.beforeHooks,
	    // enter guards
	    activated.map(function (m) { return m.beforeEnter; }),
	    // async components
	    resolveAsyncComponents(activated)
	  )

	  this.pending = route
	  var iterator = function (hook, next) {
	    if (this$1.pending !== route) {
	      return abort()
	    }
	    hook(route, current, function (to) {
	      if (to === false) {
	        // next(false) -> abort navigation, ensure current URL
	        this$1.ensureURL(true)
	        abort()
	      } else if (typeof to === 'string' || typeof to === 'object') {
	        // next('/') or next({ path: '/' }) -> redirect
	        (typeof to === 'object' && to.replace) ? this$1.replace(to) : this$1.push(to)
	        abort()
	      } else {
	        // confirm transition and pass on the value
	        next(to)
	      }
	    })
	  }

	  runQueue(queue, iterator, function () {
	    var postEnterCbs = []
	    var enterGuards = extractEnterGuards(activated, postEnterCbs, function () {
	      return this$1.current === route
	    })
	    // wait until async components are resolved before
	    // extracting in-component enter guards
	    runQueue(enterGuards, iterator, function () {
	      if (this$1.pending !== route) {
	        return abort()
	      }
	      this$1.pending = null
	      onComplete(route)
	      if (this$1.router.app) {
	        this$1.router.app.$nextTick(function () {
	          postEnterCbs.forEach(function (cb) { return cb(); })
	        })
	      }
	    })
	  })
	};

	History.prototype.updateRoute = function updateRoute (route) {
	  var prev = this.current
	  this.current = route
	  this.cb && this.cb(route)
	  this.router.afterHooks.forEach(function (hook) {
	    hook && hook(route, prev)
	  })
	};

	function normalizeBase (base) {
	  if (!base) {
	    if (inBrowser) {
	      // respect <base> tag
	      var baseEl = document.querySelector('base')
	      base = baseEl ? baseEl.getAttribute('href') : '/'
	    } else {
	      base = '/'
	    }
	  }
	  // make sure there's the starting slash
	  if (base.charAt(0) !== '/') {
	    base = '/' + base
	  }
	  // remove trailing slash
	  return base.replace(/\/$/, '')
	}

	function resolveQueue (
	  current,
	  next
	) {
	  var i
	  var max = Math.max(current.length, next.length)
	  for (i = 0; i < max; i++) {
	    if (current[i] !== next[i]) {
	      break
	    }
	  }
	  return {
	    activated: next.slice(i),
	    deactivated: current.slice(i)
	  }
	}

	function extractGuard (
	  def,
	  key
	) {
	  if (typeof def !== 'function') {
	    // extend now so that global mixins are applied.
	    def = _Vue.extend(def)
	  }
	  return def.options[key]
	}

	function extractLeaveGuards (matched) {
	  return flatten(flatMapComponents(matched, function (def, instance) {
	    var guard = extractGuard(def, 'beforeRouteLeave')
	    if (guard) {
	      return Array.isArray(guard)
	        ? guard.map(function (guard) { return wrapLeaveGuard(guard, instance); })
	        : wrapLeaveGuard(guard, instance)
	    }
	  }).reverse())
	}

	function wrapLeaveGuard (
	  guard,
	  instance
	) {
	  return function routeLeaveGuard () {
	    return guard.apply(instance, arguments)
	  }
	}

	function extractEnterGuards (
	  matched,
	  cbs,
	  isValid
	) {
	  return flatten(flatMapComponents(matched, function (def, _, match, key) {
	    var guard = extractGuard(def, 'beforeRouteEnter')
	    if (guard) {
	      return Array.isArray(guard)
	        ? guard.map(function (guard) { return wrapEnterGuard(guard, cbs, match, key, isValid); })
	        : wrapEnterGuard(guard, cbs, match, key, isValid)
	    }
	  }))
	}

	function wrapEnterGuard (
	  guard,
	  cbs,
	  match,
	  key,
	  isValid
	) {
	  return function routeEnterGuard (to, from, next) {
	    return guard(to, from, function (cb) {
	      next(cb)
	      if (typeof cb === 'function') {
	        cbs.push(function () {
	          // #750
	          // if a router-view is wrapped with an out-in transition,
	          // the instance may not have been registered at this time.
	          // we will need to poll for registration until current route
	          // is no longer valid.
	          poll(cb, match.instances, key, isValid)
	        })
	      }
	    })
	  }
	}

	function poll (
	  cb, // somehow flow cannot infer this is a function
	  instances,
	  key,
	  isValid
	) {
	  if (instances[key]) {
	    cb(instances[key])
	  } else if (isValid()) {
	    setTimeout(function () {
	      poll(cb, instances, key, isValid)
	    }, 16)
	  }
	}

	function resolveAsyncComponents (matched) {
	  return flatMapComponents(matched, function (def, _, match, key) {
	    // if it's a function and doesn't have Vue options attached,
	    // assume it's an async component resolve function.
	    // we are not using Vue's default async resolving mechanism because
	    // we want to halt the navigation until the incoming component has been
	    // resolved.
	    if (typeof def === 'function' && !def.options) {
	      return function (to, from, next) {
	        var resolve = function (resolvedDef) {
	          match.components[key] = resolvedDef
	          next()
	        }

	        var reject = function (reason) {
	          warn(false, ("Failed to resolve async component " + key + ": " + reason))
	          next(false)
	        }

	        var res = def(resolve, reject)
	        if (res && typeof res.then === 'function') {
	          res.then(resolve, reject)
	        }
	      }
	    }
	  })
	}

	function flatMapComponents (
	  matched,
	  fn
	) {
	  return flatten(matched.map(function (m) {
	    return Object.keys(m.components).map(function (key) { return fn(
	      m.components[key],
	      m.instances[key],
	      m, key
	    ); })
	  }))
	}

	function flatten (arr) {
	  return Array.prototype.concat.apply([], arr)
	}

	/*  */

	var positionStore = Object.create(null)

	function saveScrollPosition (key) {
	  if (!key) { return }
	  positionStore[key] = {
	    x: window.pageXOffset,
	    y: window.pageYOffset
	  }
	}

	function getScrollPosition (key) {
	  if (!key) { return }
	  return positionStore[key]
	}

	function getElementPosition (el) {
	  var docRect = document.documentElement.getBoundingClientRect()
	  var elRect = el.getBoundingClientRect()
	  return {
	    x: elRect.left - docRect.left,
	    y: elRect.top - docRect.top
	  }
	}

	function isValidPosition (obj) {
	  return isNumber(obj.x) || isNumber(obj.y)
	}

	function normalizePosition (obj) {
	  return {
	    x: isNumber(obj.x) ? obj.x : window.pageXOffset,
	    y: isNumber(obj.y) ? obj.y : window.pageYOffset
	  }
	}

	function isNumber (v) {
	  return typeof v === 'number'
	}

	/*  */


	var genKey = function () { return String(Date.now()); }
	var _key = genKey()

	var HTML5History = (function (History) {
	  function HTML5History (router, base) {
	    var this$1 = this;

	    History.call(this, router, base)

	    var expectScroll = router.options.scrollBehavior
	    window.addEventListener('popstate', function (e) {
	      _key = e.state && e.state.key
	      var current = this$1.current
	      this$1.transitionTo(getLocation(this$1.base), function (next) {
	        if (expectScroll) {
	          this$1.handleScroll(next, current, true)
	        }
	      })
	    })

	    if (expectScroll) {
	      window.addEventListener('scroll', function () {
	        saveScrollPosition(_key)
	      })
	    }
	  }

	  if ( History ) HTML5History.__proto__ = History;
	  HTML5History.prototype = Object.create( History && History.prototype );
	  HTML5History.prototype.constructor = HTML5History;

	  HTML5History.prototype.go = function go (n) {
	    window.history.go(n)
	  };

	  HTML5History.prototype.push = function push (location) {
	    var this$1 = this;

	    var current = this.current
	    this.transitionTo(location, function (route) {
	      pushState(cleanPath(this$1.base + route.fullPath))
	      this$1.handleScroll(route, current, false)
	    })
	  };

	  HTML5History.prototype.replace = function replace (location) {
	    var this$1 = this;

	    var current = this.current
	    this.transitionTo(location, function (route) {
	      replaceState(cleanPath(this$1.base + route.fullPath))
	      this$1.handleScroll(route, current, false)
	    })
	  };

	  HTML5History.prototype.ensureURL = function ensureURL (push) {
	    if (getLocation(this.base) !== this.current.fullPath) {
	      var current = cleanPath(this.base + this.current.fullPath)
	      push ? pushState(current) : replaceState(current)
	    }
	  };

	  HTML5History.prototype.handleScroll = function handleScroll (to, from, isPop) {
	    var router = this.router
	    if (!router.app) {
	      return
	    }

	    var behavior = router.options.scrollBehavior
	    if (!behavior) {
	      return
	    }
	    if (process.env.NODE_ENV !== 'production') {
	      assert(typeof behavior === 'function', "scrollBehavior must be a function")
	    }

	    // wait until re-render finishes before scrolling
	    router.app.$nextTick(function () {
	      var position = getScrollPosition(_key)
	      var shouldScroll = behavior(to, from, isPop ? position : null)
	      if (!shouldScroll) {
	        return
	      }
	      var isObject = typeof shouldScroll === 'object'
	      if (isObject && typeof shouldScroll.selector === 'string') {
	        var el = document.querySelector(shouldScroll.selector)
	        if (el) {
	          position = getElementPosition(el)
	        } else if (isValidPosition(shouldScroll)) {
	          position = normalizePosition(shouldScroll)
	        }
	      } else if (isObject && isValidPosition(shouldScroll)) {
	        position = normalizePosition(shouldScroll)
	      }

	      if (position) {
	        window.scrollTo(position.x, position.y)
	      }
	    })
	  };

	  return HTML5History;
	}(History));

	function getLocation (base) {
	  var path = window.location.pathname
	  if (base && path.indexOf(base) === 0) {
	    path = path.slice(base.length)
	  }
	  return (path || '/') + window.location.search + window.location.hash
	}

	function pushState (url, replace) {
	  // try...catch the pushState call to get around Safari
	  // DOM Exception 18 where it limits to 100 pushState calls
	  var history = window.history
	  try {
	    if (replace) {
	      history.replaceState({ key: _key }, '', url)
	    } else {
	      _key = genKey()
	      history.pushState({ key: _key }, '', url)
	    }
	    saveScrollPosition(_key)
	  } catch (e) {
	    window.location[replace ? 'assign' : 'replace'](url)
	  }
	}

	function replaceState (url) {
	  pushState(url, true)
	}

	/*  */


	var HashHistory = (function (History) {
	  function HashHistory (router, base, fallback) {
	    History.call(this, router, base)
	    // check history fallback deeplinking
	    if (fallback && this.checkFallback()) {
	      return
	    }
	    ensureSlash()
	  }

	  if ( History ) HashHistory.__proto__ = History;
	  HashHistory.prototype = Object.create( History && History.prototype );
	  HashHistory.prototype.constructor = HashHistory;

	  HashHistory.prototype.checkFallback = function checkFallback () {
	    var location = getLocation(this.base)
	    if (!/^\/#/.test(location)) {
	      window.location.replace(
	        cleanPath(this.base + '/#' + location)
	      )
	      return true
	    }
	  };

	  HashHistory.prototype.onHashChange = function onHashChange () {
	    if (!ensureSlash()) {
	      return
	    }
	    this.transitionTo(getHash(), function (route) {
	      replaceHash(route.fullPath)
	    })
	  };

	  HashHistory.prototype.push = function push (location) {
	    this.transitionTo(location, function (route) {
	      pushHash(route.fullPath)
	    })
	  };

	  HashHistory.prototype.replace = function replace (location) {
	    this.transitionTo(location, function (route) {
	      replaceHash(route.fullPath)
	    })
	  };

	  HashHistory.prototype.go = function go (n) {
	    window.history.go(n)
	  };

	  HashHistory.prototype.ensureURL = function ensureURL (push) {
	    var current = this.current.fullPath
	    if (getHash() !== current) {
	      push ? pushHash(current) : replaceHash(current)
	    }
	  };

	  return HashHistory;
	}(History));

	function ensureSlash () {
	  var path = getHash()
	  if (path.charAt(0) === '/') {
	    return true
	  }
	  replaceHash('/' + path)
	  return false
	}

	function getHash () {
	  // We can't use window.location.hash here because it's not
	  // consistent across browsers - Firefox will pre-decode it!
	  var href = window.location.href
	  var index = href.indexOf('#')
	  return index === -1 ? '' : href.slice(index + 1)
	}

	function pushHash (path) {
	  window.location.hash = path
	}

	function replaceHash (path) {
	  var i = window.location.href.indexOf('#')
	  window.location.replace(
	    window.location.href.slice(0, i >= 0 ? i : 0) + '#' + path
	  )
	}

	/*  */


	var AbstractHistory = (function (History) {
	  function AbstractHistory (router) {
	    History.call(this, router)
	    this.stack = []
	    this.index = -1
	  }

	  if ( History ) AbstractHistory.__proto__ = History;
	  AbstractHistory.prototype = Object.create( History && History.prototype );
	  AbstractHistory.prototype.constructor = AbstractHistory;

	  AbstractHistory.prototype.push = function push (location) {
	    var this$1 = this;

	    this.transitionTo(location, function (route) {
	      this$1.stack = this$1.stack.slice(0, this$1.index + 1).concat(route)
	      this$1.index++
	    })
	  };

	  AbstractHistory.prototype.replace = function replace (location) {
	    var this$1 = this;

	    this.transitionTo(location, function (route) {
	      this$1.stack = this$1.stack.slice(0, this$1.index).concat(route)
	    })
	  };

	  AbstractHistory.prototype.go = function go (n) {
	    var this$1 = this;

	    var targetIndex = this.index + n
	    if (targetIndex < 0 || targetIndex >= this.stack.length) {
	      return
	    }
	    var route = this.stack[targetIndex]
	    this.confirmTransition(route, function () {
	      this$1.index = targetIndex
	      this$1.updateRoute(route)
	    })
	  };

	  AbstractHistory.prototype.ensureURL = function ensureURL () {
	    // noop
	  };

	  return AbstractHistory;
	}(History));

	/*  */

	var VueRouter = function VueRouter (options) {
	  if ( options === void 0 ) options = {};

	  this.app = null
	  this.options = options
	  this.beforeHooks = []
	  this.afterHooks = []
	  this.match = createMatcher(options.routes || [])

	  var mode = options.mode || 'hash'
	  this.fallback = mode === 'history' && !supportsHistory
	  if (this.fallback) {
	    mode = 'hash'
	  }
	  if (!inBrowser) {
	    mode = 'abstract'
	  }
	  this.mode = mode

	  switch (mode) {
	    case 'history':
	      this.history = new HTML5History(this, options.base)
	      break
	    case 'hash':
	      this.history = new HashHistory(this, options.base, this.fallback)
	      break
	    case 'abstract':
	      this.history = new AbstractHistory(this)
	      break
	    default:
	      process.env.NODE_ENV !== 'production' && assert(false, ("invalid mode: " + mode))
	  }
	};

	var prototypeAccessors = { currentRoute: {} };

	prototypeAccessors.currentRoute.get = function () {
	  return this.history && this.history.current
	};

	VueRouter.prototype.init = function init (app /* Vue component instance */) {
	    var this$1 = this;

	  process.env.NODE_ENV !== 'production' && assert(
	    install.installed,
	    "not installed. Make sure to call `Vue.use(VueRouter)` " +
	    "before creating root instance."
	  )

	  this.app = app

	  var history = this.history

	  if (history instanceof HTML5History) {
	    history.transitionTo(getLocation(history.base))
	  } else if (history instanceof HashHistory) {
	    var setupHashListener = function () {
	      window.addEventListener('hashchange', function () {
	        history.onHashChange()
	      })
	    }
	    history.transitionTo(getHash(), setupHashListener, setupHashListener)
	  }

	  history.listen(function (route) {
	    this$1.app._route = route
	  })
	};

	VueRouter.prototype.beforeEach = function beforeEach (fn) {
	  this.beforeHooks.push(fn)
	};

	VueRouter.prototype.afterEach = function afterEach (fn) {
	  this.afterHooks.push(fn)
	};

	VueRouter.prototype.push = function push (location) {
	  this.history.push(location)
	};

	VueRouter.prototype.replace = function replace (location) {
	  this.history.replace(location)
	};

	VueRouter.prototype.go = function go (n) {
	  this.history.go(n)
	};

	VueRouter.prototype.back = function back () {
	  this.go(-1)
	};

	VueRouter.prototype.forward = function forward () {
	  this.go(1)
	};

	VueRouter.prototype.getMatchedComponents = function getMatchedComponents (to) {
	  var route = to
	    ? this.resolve(to).resolved
	    : this.currentRoute
	  if (!route) {
	    return []
	  }
	  return [].concat.apply([], route.matched.map(function (m) {
	    return Object.keys(m.components).map(function (key) {
	      return m.components[key]
	    })
	  }))
	};

	VueRouter.prototype.resolve = function resolve (
	  to,
	  current,
	  append
	) {
	  var normalizedTo = normalizeLocation(to, current || this.history.current, append)
	  var resolved = this.match(normalizedTo, current)
	  var fullPath = resolved.redirectedFrom || resolved.fullPath
	  var base = this.history.base
	  var href = createHref(base, fullPath, this.mode)
	  return {
	    normalizedTo: normalizedTo,
	    resolved: resolved,
	    href: href
	  }
	};

	Object.defineProperties( VueRouter.prototype, prototypeAccessors );

	function createHref (base, fullPath, mode) {
	  var path = mode === 'hash' ? '#' + fullPath : fullPath
	  return base ? cleanPath(base + '/' + path) : path
	}

	VueRouter.install = install

	if (inBrowser && window.Vue) {
	  window.Vue.use(VueRouter)
	}

	module.exports = VueRouter;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(16)))

/***/ },
/* 16 */
/***/ function(module, exports) {

	// shim for using process in browser
	var process = module.exports = {};

	// cached from whatever global is present so that test runners that stub it
	// don't break things.  But we need to wrap it in a try catch in case it is
	// wrapped in strict mode code which doesn't define any globals.  It's inside a
	// function because try/catches deoptimize in certain engines.

	var cachedSetTimeout;
	var cachedClearTimeout;

	function defaultSetTimout() {
	    throw new Error('setTimeout has not been defined');
	}
	function defaultClearTimeout () {
	    throw new Error('clearTimeout has not been defined');
	}
	(function () {
	    try {
	        if (typeof setTimeout === 'function') {
	            cachedSetTimeout = setTimeout;
	        } else {
	            cachedSetTimeout = defaultSetTimout;
	        }
	    } catch (e) {
	        cachedSetTimeout = defaultSetTimout;
	    }
	    try {
	        if (typeof clearTimeout === 'function') {
	            cachedClearTimeout = clearTimeout;
	        } else {
	            cachedClearTimeout = defaultClearTimeout;
	        }
	    } catch (e) {
	        cachedClearTimeout = defaultClearTimeout;
	    }
	} ())
	function runTimeout(fun) {
	    if (cachedSetTimeout === setTimeout) {
	        //normal enviroments in sane situations
	        return setTimeout(fun, 0);
	    }
	    // if setTimeout wasn't available but was latter defined
	    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
	        cachedSetTimeout = setTimeout;
	        return setTimeout(fun, 0);
	    }
	    try {
	        // when when somebody has screwed with setTimeout but no I.E. maddness
	        return cachedSetTimeout(fun, 0);
	    } catch(e){
	        try {
	            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
	            return cachedSetTimeout.call(null, fun, 0);
	        } catch(e){
	            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
	            return cachedSetTimeout.call(this, fun, 0);
	        }
	    }


	}
	function runClearTimeout(marker) {
	    if (cachedClearTimeout === clearTimeout) {
	        //normal enviroments in sane situations
	        return clearTimeout(marker);
	    }
	    // if clearTimeout wasn't available but was latter defined
	    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
	        cachedClearTimeout = clearTimeout;
	        return clearTimeout(marker);
	    }
	    try {
	        // when when somebody has screwed with setTimeout but no I.E. maddness
	        return cachedClearTimeout(marker);
	    } catch (e){
	        try {
	            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
	            return cachedClearTimeout.call(null, marker);
	        } catch (e){
	            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
	            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
	            return cachedClearTimeout.call(this, marker);
	        }
	    }



	}
	var queue = [];
	var draining = false;
	var currentQueue;
	var queueIndex = -1;

	function cleanUpNextTick() {
	    if (!draining || !currentQueue) {
	        return;
	    }
	    draining = false;
	    if (currentQueue.length) {
	        queue = currentQueue.concat(queue);
	    } else {
	        queueIndex = -1;
	    }
	    if (queue.length) {
	        drainQueue();
	    }
	}

	function drainQueue() {
	    if (draining) {
	        return;
	    }
	    var timeout = runTimeout(cleanUpNextTick);
	    draining = true;

	    var len = queue.length;
	    while(len) {
	        currentQueue = queue;
	        queue = [];
	        while (++queueIndex < len) {
	            if (currentQueue) {
	                currentQueue[queueIndex].run();
	            }
	        }
	        queueIndex = -1;
	        len = queue.length;
	    }
	    currentQueue = null;
	    draining = false;
	    runClearTimeout(timeout);
	}

	process.nextTick = function (fun) {
	    var args = new Array(arguments.length - 1);
	    if (arguments.length > 1) {
	        for (var i = 1; i < arguments.length; i++) {
	            args[i - 1] = arguments[i];
	        }
	    }
	    queue.push(new Item(fun, args));
	    if (queue.length === 1 && !draining) {
	        runTimeout(drainQueue);
	    }
	};

	// v8 likes predictible objects
	function Item(fun, array) {
	    this.fun = fun;
	    this.array = array;
	}
	Item.prototype.run = function () {
	    this.fun.apply(null, this.array);
	};
	process.title = 'browser';
	process.browser = true;
	process.env = {};
	process.argv = [];
	process.version = ''; // empty string to avoid regexp issues
	process.versions = {};

	function noop() {}

	process.on = noop;
	process.addListener = noop;
	process.once = noop;
	process.off = noop;
	process.removeListener = noop;
	process.removeAllListeners = noop;
	process.emit = noop;

	process.binding = function (name) {
	    throw new Error('process.binding is not supported');
	};

	process.cwd = function () { return '/' };
	process.chdir = function (dir) {
	    throw new Error('process.chdir is not supported');
	};
	process.umask = function() { return 0; };


/***/ },
/* 17 */,
/* 18 */,
/* 19 */,
/* 20 */,
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _loginview = __webpack_require__(6);

	var _loginview2 = _interopRequireDefault(_loginview);

	var _controlview = __webpack_require__(28);

	var _controlview2 = _interopRequireDefault(_controlview);

	var _createuser = __webpack_require__(33);

	var _createuser2 = _interopRequireDefault(_createuser);

	var _userview = __webpack_require__(37);

	var _userview2 = _interopRequireDefault(_userview);

	var _eventview = __webpack_require__(42);

	var _eventview2 = _interopRequireDefault(_eventview);

	var _ = __webpack_require__(45);

	var _2 = _interopRequireDefault(_);

	var _store = __webpack_require__(36);

	var _store2 = _interopRequireDefault(_store);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var VueRouter = __webpack_require__(15);


	var router = new VueRouter({
	    mode: "history",
	    routes: [{ path: '/', component: _loginview2.default }, {
	        path: '/cp',
	        component: _controlview2.default, children: [{
	            path: "createuser",
	            component: _createuser2.default
	        }, {
	            path: "user",
	            component: _userview2.default
	        }, {
	            path: "event",
	            component: _eventview2.default
	        }],
	        redirect: "/cp/createuser",
	        meta: { requiresAuth: true }
	    }, { path: '*', component: _2.default }]
	});

	router.beforeEach(function (to, from, next) {
	    if (to.matched.some(function (record) {
	        return record.meta.requiresAuth;
	    })) {
	        if (!_store2.default.state.loginStatus) {
	            next({
	                path: '/',
	                query: { redirect: to.fullPath }
	            });
	        } else {
	            next();
	        }
	    } else {
	        next();
	    }
	});

	exports.default = router;

/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(23);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(25)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../node_modules/css-loader/index.js!./../../node_modules/vue-loader/lib/style-rewriter.js?id=data-v-4aed13fc!./../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./loginview.vue", function() {
				var newContent = require("!!./../../node_modules/css-loader/index.js!./../../node_modules/vue-loader/lib/style-rewriter.js?id=data-v-4aed13fc!./../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./loginview.vue");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(24)();
	// imports


	// module
	exports.push([module.id, "\n.login-view{\n    min-height: 360px;\n    background-color:cornflowerblue;\n    border-radius: 20px;\n}\n.mainBnt{\n    background-color:cornflowerblue;\n    border:2px solid white; \n    width:100%;\n}\n.mainBnt:hover{\n    color:cornflowerblue;\n    background-color:white;\n    border-color: cornflowerblue;\n}\n.mainBnt:focus{\n    color:cornflowerblue;\n    background-color:white;\n    border-color: cornflowerblue;\n}\n.mainBnt:active{\n    color:white;\n    background-color:cornflowerblue;\n    border-color: white;\n}\n", ""]);

	// exports


/***/ },
/* 24 */
/***/ function(module, exports) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	// css base code, injected by the css-loader
	module.exports = function() {
		var list = [];

		// return the list of modules as css string
		list.toString = function toString() {
			var result = [];
			for(var i = 0; i < this.length; i++) {
				var item = this[i];
				if(item[2]) {
					result.push("@media " + item[2] + "{" + item[1] + "}");
				} else {
					result.push(item[1]);
				}
			}
			return result.join("");
		};

		// import a list of modules into the list
		list.i = function(modules, mediaQuery) {
			if(typeof modules === "string")
				modules = [[null, modules, ""]];
			var alreadyImportedModules = {};
			for(var i = 0; i < this.length; i++) {
				var id = this[i][0];
				if(typeof id === "number")
					alreadyImportedModules[id] = true;
			}
			for(i = 0; i < modules.length; i++) {
				var item = modules[i];
				// skip already imported module
				// this implementation is not 100% perfect for weird media query combinations
				//  when a module is imported multiple times with different media queries.
				//  I hope this will never occur (Hey this way we have smaller bundles)
				if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
					if(mediaQuery && !item[2]) {
						item[2] = mediaQuery;
					} else if(mediaQuery) {
						item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
					}
					list.push(item);
				}
			}
		};
		return list;
	};


/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	var stylesInDom = {},
		memoize = function(fn) {
			var memo;
			return function () {
				if (typeof memo === "undefined") memo = fn.apply(this, arguments);
				return memo;
			};
		},
		isOldIE = memoize(function() {
			return /msie [6-9]\b/.test(window.navigator.userAgent.toLowerCase());
		}),
		getHeadElement = memoize(function () {
			return document.head || document.getElementsByTagName("head")[0];
		}),
		singletonElement = null,
		singletonCounter = 0,
		styleElementsInsertedAtTop = [];

	module.exports = function(list, options) {
		if(false) {
			if(typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
		}

		options = options || {};
		// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
		// tags it will allow on a page
		if (typeof options.singleton === "undefined") options.singleton = isOldIE();

		// By default, add <style> tags to the bottom of <head>.
		if (typeof options.insertAt === "undefined") options.insertAt = "bottom";

		var styles = listToStyles(list);
		addStylesToDom(styles, options);

		return function update(newList) {
			var mayRemove = [];
			for(var i = 0; i < styles.length; i++) {
				var item = styles[i];
				var domStyle = stylesInDom[item.id];
				domStyle.refs--;
				mayRemove.push(domStyle);
			}
			if(newList) {
				var newStyles = listToStyles(newList);
				addStylesToDom(newStyles, options);
			}
			for(var i = 0; i < mayRemove.length; i++) {
				var domStyle = mayRemove[i];
				if(domStyle.refs === 0) {
					for(var j = 0; j < domStyle.parts.length; j++)
						domStyle.parts[j]();
					delete stylesInDom[domStyle.id];
				}
			}
		};
	}

	function addStylesToDom(styles, options) {
		for(var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];
			if(domStyle) {
				domStyle.refs++;
				for(var j = 0; j < domStyle.parts.length; j++) {
					domStyle.parts[j](item.parts[j]);
				}
				for(; j < item.parts.length; j++) {
					domStyle.parts.push(addStyle(item.parts[j], options));
				}
			} else {
				var parts = [];
				for(var j = 0; j < item.parts.length; j++) {
					parts.push(addStyle(item.parts[j], options));
				}
				stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
			}
		}
	}

	function listToStyles(list) {
		var styles = [];
		var newStyles = {};
		for(var i = 0; i < list.length; i++) {
			var item = list[i];
			var id = item[0];
			var css = item[1];
			var media = item[2];
			var sourceMap = item[3];
			var part = {css: css, media: media, sourceMap: sourceMap};
			if(!newStyles[id])
				styles.push(newStyles[id] = {id: id, parts: [part]});
			else
				newStyles[id].parts.push(part);
		}
		return styles;
	}

	function insertStyleElement(options, styleElement) {
		var head = getHeadElement();
		var lastStyleElementInsertedAtTop = styleElementsInsertedAtTop[styleElementsInsertedAtTop.length - 1];
		if (options.insertAt === "top") {
			if(!lastStyleElementInsertedAtTop) {
				head.insertBefore(styleElement, head.firstChild);
			} else if(lastStyleElementInsertedAtTop.nextSibling) {
				head.insertBefore(styleElement, lastStyleElementInsertedAtTop.nextSibling);
			} else {
				head.appendChild(styleElement);
			}
			styleElementsInsertedAtTop.push(styleElement);
		} else if (options.insertAt === "bottom") {
			head.appendChild(styleElement);
		} else {
			throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");
		}
	}

	function removeStyleElement(styleElement) {
		styleElement.parentNode.removeChild(styleElement);
		var idx = styleElementsInsertedAtTop.indexOf(styleElement);
		if(idx >= 0) {
			styleElementsInsertedAtTop.splice(idx, 1);
		}
	}

	function createStyleElement(options) {
		var styleElement = document.createElement("style");
		styleElement.type = "text/css";
		insertStyleElement(options, styleElement);
		return styleElement;
	}

	function addStyle(obj, options) {
		var styleElement, update, remove;

		if (options.singleton) {
			var styleIndex = singletonCounter++;
			styleElement = singletonElement || (singletonElement = createStyleElement(options));
			update = applyToSingletonTag.bind(null, styleElement, styleIndex, false);
			remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true);
		} else {
			styleElement = createStyleElement(options);
			update = applyToTag.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
			};
		}

		update(obj);

		return function updateStyle(newObj) {
			if(newObj) {
				if(newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap)
					return;
				update(obj = newObj);
			} else {
				remove();
			}
		};
	}

	var replaceText = (function () {
		var textStore = [];

		return function (index, replacement) {
			textStore[index] = replacement;
			return textStore.filter(Boolean).join('\n');
		};
	})();

	function applyToSingletonTag(styleElement, index, remove, obj) {
		var css = remove ? "" : obj.css;

		if (styleElement.styleSheet) {
			styleElement.styleSheet.cssText = replaceText(index, css);
		} else {
			var cssNode = document.createTextNode(css);
			var childNodes = styleElement.childNodes;
			if (childNodes[index]) styleElement.removeChild(childNodes[index]);
			if (childNodes.length) {
				styleElement.insertBefore(cssNode, childNodes[index]);
			} else {
				styleElement.appendChild(cssNode);
			}
		}
	}

	function applyToTag(styleElement, obj) {
		var css = obj.css;
		var media = obj.media;
		var sourceMap = obj.sourceMap;

		if (media) {
			styleElement.setAttribute("media", media);
		}

		if (sourceMap) {
			// https://developer.chrome.com/devtools/docs/javascript-debugging
			// this makes source maps inside style tags work properly in Chrome
			css += '\n/*# sourceURL=' + sourceMap.sources[0] + ' */';
			// http://stackoverflow.com/a/26603875
			css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
		}

		if (styleElement.styleSheet) {
			styleElement.styleSheet.cssText = css;
		} else {
			while(styleElement.firstChild) {
				styleElement.removeChild(styleElement.firstChild);
			}
			styleElement.appendChild(document.createTextNode(css));
		}
	}


/***/ },
/* 26 */,
/* 27 */
/***/ function(module, exports) {

	'use strict';

	module.exports = {
	    loginSuccess: function loginSuccess() {
	        var _this = this;

	        $('#loginField').addClass('loginSuccess');
	        setTimeout(function () {
	            $('#loginField').hide();
	            $('#mainField').show();
	            createUserField.hideStatus = false;
	            _this.curPage = "createUserField";
	            schField.loginStatus = "block";
	            mainHeaderField.loginStatus = "block";
	        }, 500);
	    },
	    switchPg: function switchPg(nxtPg) {
	        eval(this.curPage).hideStatus = true;
	        this.curPage = nxtPg;
	        eval(nxtPg).hideStatus = false;
	    },
	    formValid: function formValid(form, callback) {
	        var inputs = $(form);
	        var noError = true;
	        inputs.each(function () {
	            if ($(this).val() == "") {
	                $(this).focus();
	                noError = false;
	                return false;
	            }
	        });
	        callback(noError);
	    },
	    success: function success(txt, status) {
	        status = false;
	        setTimeout(function () {
	            status = true;
	        }, 3000);
	    }
	};

/***/ },
/* 28 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_exports__, __vue_options__
	var __vue_styles__ = {}

	/* styles */
	__webpack_require__(29)

	/* script */
	__vue_exports__ = __webpack_require__(31)

	/* template */
	var __vue_template__ = __webpack_require__(32)
	__vue_options__ = __vue_exports__ = __vue_exports__ || {}
	if (
	  typeof __vue_exports__.default === "object" ||
	  typeof __vue_exports__.default === "function"
	) {
	if (Object.keys(__vue_exports__).some(function (key) { return key !== "default" && key !== "__esModule" })) {console.error("named exports are not supported in *.vue files.")}
	__vue_options__ = __vue_exports__ = __vue_exports__.default
	}
	if (typeof __vue_options__ === "function") {
	  __vue_options__ = __vue_options__.options
	}
	__vue_options__.__file = "D:\\b\\src\\components\\controlview.vue"
	__vue_options__.render = __vue_template__.render
	__vue_options__.staticRenderFns = __vue_template__.staticRenderFns

	/* hot reload */
	if (false) {(function () {
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  module.hot.accept()
	  if (!module.hot.data) {
	    hotAPI.createRecord("data-v-5df01e14", __vue_options__)
	  } else {
	    hotAPI.reload("data-v-5df01e14", __vue_options__)
	  }
	})()}
	if (__vue_options__.functional) {console.error("[vue-loader] controlview.vue: functional components are not supported and should be defined in plain js files using render functions.")}

	module.exports = __vue_exports__


/***/ },
/* 29 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(30);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(25)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../node_modules/css-loader/index.js!./../../node_modules/vue-loader/lib/style-rewriter.js?id=data-v-5df01e14!./../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./controlview.vue", function() {
				var newContent = require("!!./../../node_modules/css-loader/index.js!./../../node_modules/vue-loader/lib/style-rewriter.js?id=data-v-5df01e14!./../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./controlview.vue");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 30 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(24)();
	// imports


	// module
	exports.push([module.id, "\nnav {\n    background-color:#337ab7;\n    width:100%;\n    border-color:#2e6da4;\n    border-radius: 4px;\n    padding-right:15px;\n    padding-left:20px;\n}\nnav a{\n    color:white;\n}\n.caret-right {\n    position: relative;\n    top:6px;\n    border-bottom: 4px solid transparent;\n    border-top: 4px solid transparent;\n    border-left: 4px solid;\n    display: inline-block;\n    height: 0;\n    width: 0;\n}\n.container-left-padding-0{\n    padding-left:0;\n}\ninput[type='number'] {\n    -moz-appearance:textfield;\n}\ninput[type=number]::-webkit-inner-spin-button, \ninput[type=number]::-webkit-outer-spin-button { \n    -webkit-appearance: none;\n    -moz-appearance: none;\n    appearance: none;\n    margin: 0;\n}\n", ""]);

	// exports


/***/ },
/* 31 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _searchbar = __webpack_require__(51);

	var _searchbar2 = _interopRequireDefault(_searchbar);

	var _store = __webpack_require__(36);

	var _store2 = _interopRequireDefault(_store);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = {
	    data: function data() {
	        return {};
	    },

	    store: _store2.default,
	    methods: {
	        switchPg: function switchPg(pg) {
	            this.schKeywords = "";
	            this.users = [];
	            this.$router.push(pg);
	        }
	    },
	    components: {
	        search: _searchbar2.default
	    }
	};

/***/ },
/* 32 */
/***/ function(module, exports, __webpack_require__) {

	module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
	  return _c('div', [_vm._m(0), _vm._v(" "), _c('div', {
	    staticClass: "row"
	  }, [_c('div', {
	    staticClass: "col-md-offset-2 col-md-8"
	  }, [_c('div', {
	    staticClass: "col-md-4"
	  }, [_c('div', {
	    staticClass: "sidebar-nav navbar-collapse"
	  }, [_c('div', {
	    staticClass: "list-group"
	  }, [_c('div', {
	    staticClass: "list-group-item"
	  }, [_c('search', {
	    ref: "search"
	  }, [_c('br')])], 1), _vm._v(" "), _c('button', {
	    staticClass: "list-group-item",
	    on: {
	      "click": function($event) {
	        _vm.switchPg("/cp/user")
	      }
	    }
	  }, [_c('i', {
	    staticClass: "fa fa-user"
	  }), _vm._v("  Manage Customer Infos"), _c('span', {
	    staticClass: "caret-right pull-right"
	  })]), _vm._v(" "), _c('button', {
	    staticClass: "list-group-item",
	    on: {
	      "click": function($event) {
	        _vm.switchPg("/cp/createuser")
	      }
	    }
	  }, [_c('i', {
	    staticClass: "fa fa-users"
	  }), _vm._v("  Create Customer Info"), _c('span', {
	    staticClass: "caret-right pull-right"
	  })]), _vm._v(" "), _c('button', {
	    staticClass: "list-group-item",
	    on: {
	      "click": function($event) {
	        _vm.switchPg("/cp/event")
	      }
	    }
	  }, [_c('i', {
	    staticClass: "fa  fa-database"
	  }), _vm._v("  Data Summary & Report"), _c('span', {
	    staticClass: "caret-right pull-right"
	  })]), _vm._v(" "), _vm._m(1)])])]), _vm._v(" "), _c('div', {
	    staticClass: "col-md-8"
	  }, [_c('div', {
	    staticClass: "panel panel-default"
	  }, [_c('router-view', {
	    attrs: {
	      "save": _vm.refreshSearch
	    }
	  })], 1)])])])])
	},staticRenderFns: [function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
	  return _c('nav', {
	    staticClass: "navbar"
	  }, [_c('div', {
	    staticClass: "col-md-offset-2 col-md-8"
	  }, [_c('a', {
	    staticClass: "navbar-text",
	    staticStyle: {
	      "color": "white"
	    },
	    attrs: {
	      "href": "/"
	    }
	  }, [_vm._v("Control Panel")]), _vm._v(" "), _c('ul', {
	    staticClass: "nav navbar-nav navbar-right"
	  }, [_c('li', [_c('a', {
	    staticClass: "btn dropdown-toggle",
	    staticStyle: {
	      "font-size": "120%"
	    },
	    attrs: {
	      "data-toggle": "dropdown",
	      "href": "#"
	    }
	  }, [_c('i', {
	    staticClass: "fa fa-user fa-fw",
	    attrs: {
	      "aria-hidden": "true"
	    }
	  }), _vm._v(" "), _c('span', {
	    staticClass: "caret"
	  })]), _vm._v(" "), _c('ul', {
	    staticClass: "dropdown-menu",
	    staticStyle: {
	      "float": "left"
	    }
	  }, [_c('li', [_c('a', [_c('i', {
	    staticClass: "fa fa-user fa-fw",
	    attrs: {
	      "aria-hidden": "true"
	    }
	  }), _vm._v("  User Profile")])]), _vm._v(" "), _c('li', [_c('a', [_c('i', {
	    staticClass: "fa fa-gear fa-fw",
	    attrs: {
	      "aria-hidden": "true"
	    }
	  }), _vm._v("  Setting")])]), _vm._v(" "), _c('li', {
	    staticClass: "divider",
	    attrs: {
	      "role": "separator"
	    }
	  }), _vm._v(" "), _c('li', [_c('a', {
	    attrs: {
	      "href": "/user/logout"
	    }
	  }, [_c('i', {
	    staticClass: "fa  fa-sign-out fa-fw",
	    attrs: {
	      "aria-hidden": "true"
	    }
	  }), _vm._v("  Logout")])])])])])])])
	},function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
	  return _c('button', {
	    staticClass: "list-group-item"
	  }, [_c('i', {
	    staticClass: "fa  fa-gear"
	  }), _vm._v("  Control Panel Setting"), _c('span', {
	    staticClass: "caret-right pull-right"
	  })])
	}]}
	module.exports.render._withStripped = true
	if (false) {
	  module.hot.accept()
	  if (module.hot.data) {
	     require("vue-hot-reload-api").rerender("data-v-5df01e14", module.exports)
	  }
	}

/***/ },
/* 33 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_exports__, __vue_options__
	var __vue_styles__ = {}

	/* script */
	__vue_exports__ = __webpack_require__(34)

	/* template */
	var __vue_template__ = __webpack_require__(35)
	__vue_options__ = __vue_exports__ = __vue_exports__ || {}
	if (
	  typeof __vue_exports__.default === "object" ||
	  typeof __vue_exports__.default === "function"
	) {
	if (Object.keys(__vue_exports__).some(function (key) { return key !== "default" && key !== "__esModule" })) {console.error("named exports are not supported in *.vue files.")}
	__vue_options__ = __vue_exports__ = __vue_exports__.default
	}
	if (typeof __vue_options__ === "function") {
	  __vue_options__ = __vue_options__.options
	}
	__vue_options__.__file = "D:\\b\\src\\components\\createuser.vue"
	__vue_options__.render = __vue_template__.render
	__vue_options__.staticRenderFns = __vue_template__.staticRenderFns

	/* hot reload */
	if (false) {(function () {
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  module.hot.accept()
	  if (!module.hot.data) {
	    hotAPI.createRecord("data-v-24125483", __vue_options__)
	  } else {
	    hotAPI.reload("data-v-24125483", __vue_options__)
	  }
	})()}
	if (__vue_options__.functional) {console.error("[vue-loader] createuser.vue: functional components are not supported and should be defined in plain js files using render functions.")}

	module.exports = __vue_exports__


/***/ },
/* 34 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _globals = __webpack_require__(27);

	var _globals2 = _interopRequireDefault(_globals);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = {
	    data: function data() {
	        return {
	            msg: "",
	            msgSuccess: false,
	            msgError: false,
	            spinHidden: true,
	            custid: "",
	            custName: "",
	            custEmail: "",
	            custNum: "",
	            custAddress: "",
	            eventid: 1,
	            eventName: "",
	            eventNote: "",
	            events: []
	        };
	    },

	    methods: {
	        addEvent: function addEvent() {
	            var _this = this;

	            _globals2.default.formValid("form#newEventForm :input[required]:visible", function (v) {
	                if (v) {
	                    var event = { id: _this.eventid, name: _this.eventName, date: $("#us_InputEventDate").val(), note: _this.eventNote };
	                    _this.successMsg('Event Added.');
	                    _this.events.push(event);
	                    _this.eventName = "";
	                    $("#us_InputEventDate").val("");
	                    _this.eventNote = "";
	                    _this.eventid += 1;
	                } else {
	                    _this.errorMsg("Missing Event Infos.");
	                }
	            });
	        },
	        removeEvent: function removeEvent() {
	            if (this.events.length != 0) {
	                this.successMsg('Event Deleted.');
	                this.events.pop();
	                this.eventid -= 1;
	            } else {
	                this.errorMsg("No Event Loaded.");
	            }
	        },
	        save: function save() {
	            var _this2 = this;

	            var user = { "A_Username": this.custid, "A_Password": "111", "A_Email": this.custEmail, "A_Type": "C", "A_Name": this.custName, "A_Phone": this.custNum, "A_Address": this.custAddress, "A_Events": this.events };
	            _globals2.default.formValid("form#newCustForm :input[required]:visible", function (v) {
	                _this2.spinHidden = false;
	                _this2.successMsg("User Creating");
	                if (v) {
	                    $.ajax({
	                        url: '/user/' + _this2.custid,
	                        type: 'POST',
	                        contentType: "application/json",
	                        data: JSON.stringify(user),
	                        success: function success(result) {
	                            if (result.status == "ok") {
	                                _this2.spinHidden = true;
	                                _this2.successMsg(result.content);
	                                $('#newCustForm')[0].reset();
	                                _this2.eventid = 1;
	                                _this2.events.length = 0;
	                                _this2.eventName = "";
	                                _this2.eventNote = "";
	                            } else {
	                                _this2.errorMsg(result.content);
	                            }
	                        }
	                    });
	                } else {
	                    _this2.errorMsg("Missing Customer Infos.");
	                }
	            });
	        },
	        removeSlc: function removeSlc(id) {
	            this.events.splice(id - 1, 1);
	            for (var i = 1; i <= this.events.length; i++) {
	                var index = i - 1;
	                this.events[index].id = i;
	            }
	            this.eventid = this.events.length + 1;
	        },
	        reset: function reset() {
	            this.successMsg('Forms Reset.');
	            $('#newCustForm')[0].reset();
	            this.eventid = 1;
	            this.events.length = 0;
	            this.eventName = "";
	            this.eventNote = "";
	        },
	        successMsg: function successMsg(txt) {
	            var _this3 = this;

	            this.msg = txt;
	            this.msgSuccess = true;
	            setTimeout(function () {
	                _this3.msg = "";
	                _this3.msgSuccess = false;
	            }, 3000);
	        },
	        errorMsg: function errorMsg(txt) {
	            var _this4 = this;

	            this.msg = txt;
	            this.msgError = true;
	            setTimeout(function () {
	                _this4.msg = "";
	                _this4.msgError = false;
	            }, 3000);
	        }
	    }
	};

/***/ },
/* 35 */
/***/ function(module, exports, __webpack_require__) {

	module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
	  return _c('div', {
	    staticClass: "panel-body"
	  }, [_c('div', {
	    staticClass: "row"
	  }, [_c('h2', {
	    staticClass: "col-md-8"
	  }, [_vm._v("New Customer Profile")]), _vm._v(" "), _c('div', {
	    staticClass: "col-md-4 text-center"
	  }, [_c('br'), _c('br'), _vm._v(" "), _c('span', {
	    staticClass: "pull-right",
	    class: {
	      "alert-danger": _vm.msgError, "alert-success": _vm.msgSuccess
	    },
	    attrs: {
	      "role": "alert"
	    }
	  }, [_c('i', {
	    staticClass: "fa fa-circle-o-notch fa-spin",
	    class: {
	      hidden: _vm.spinHidden
	    }
	  }, [_vm._v("  ")]), _vm._v("\n            " + _vm._s(_vm.msg) + " \n            ")])])]), _vm._v(" "), _c('hr'), _vm._v(" "), _c('span', {
	    staticStyle: {
	      "font-size": "12px",
	      "font-weight": "700"
	    }
	  }, [_vm._v("Customer Information")]), _vm._v(" "), _c('form', {
	    attrs: {
	      "id": "newCustForm"
	    }
	  }, [_c('div', {
	    staticClass: "row"
	  }, [_c('div', {
	    staticClass: "form-group col-md-3"
	  }, [_c('label', {
	    staticClass: "control-label"
	  }, [_vm._v("ID *")]), _vm._v(" "), _c('input', {
	    directives: [{
	      name: "model",
	      rawName: "v-model",
	      value: (_vm.custid),
	      expression: "custid"
	    }],
	    staticClass: "form-control",
	    attrs: {
	      "type": "text",
	      "required": ""
	    },
	    domProps: {
	      "value": _vm._s(_vm.custid)
	    },
	    on: {
	      "input": function($event) {
	        if ($event.target.composing) { return; }
	        _vm.custid = $event.target.value
	      }
	    }
	  })]), _vm._v(" "), _c('div', {
	    staticClass: "form-group col-md-3"
	  }, [_c('label', {
	    staticClass: "control-label"
	  }, [_vm._v("Name *")]), _vm._v(" "), _c('input', {
	    directives: [{
	      name: "model",
	      rawName: "v-model",
	      value: (_vm.custName),
	      expression: "custName"
	    }],
	    staticClass: "form-control",
	    attrs: {
	      "type": "text",
	      "required": ""
	    },
	    domProps: {
	      "value": _vm._s(_vm.custName)
	    },
	    on: {
	      "input": function($event) {
	        if ($event.target.composing) { return; }
	        _vm.custName = $event.target.value
	      }
	    }
	  })]), _vm._v(" "), _c('div', {
	    staticClass: "form-group col-md-6"
	  }, [_c('label', {
	    staticClass: "control-label"
	  }, [_vm._v("Email *")]), _vm._v(" "), _c('input', {
	    directives: [{
	      name: "model",
	      rawName: "v-model",
	      value: (_vm.custEmail),
	      expression: "custEmail"
	    }],
	    staticClass: "form-control",
	    attrs: {
	      "type": "email",
	      "required": ""
	    },
	    domProps: {
	      "value": _vm._s(_vm.custEmail)
	    },
	    on: {
	      "input": function($event) {
	        if ($event.target.composing) { return; }
	        _vm.custEmail = $event.target.value
	      }
	    }
	  })])]), _vm._v(" "), _c('br'), _vm._v(" "), _c('div', {
	    staticClass: "row"
	  }, [_c('div', {
	    staticClass: "form-group col-md-3"
	  }, [_c('label', {
	    staticClass: "control-label"
	  }, [_vm._v("Contact#")]), _vm._v(" "), _c('input', {
	    directives: [{
	      name: "model",
	      rawName: "v-model",
	      value: (_vm.custNum),
	      expression: "custNum"
	    }],
	    staticClass: "form-control",
	    attrs: {
	      "type": "number",
	      "required": ""
	    },
	    domProps: {
	      "value": _vm._s(_vm.custNum)
	    },
	    on: {
	      "input": function($event) {
	        if ($event.target.composing) { return; }
	        _vm.custNum = _vm._n($event.target.value)
	      },
	      "blur": function($event) {
	        _vm.$forceUpdate()
	      }
	    }
	  })]), _vm._v(" "), _c('div', {
	    staticClass: "form-group col-md-9"
	  }, [_c('label', {
	    staticClass: "control-label"
	  }, [_vm._v("Contact Address")]), _vm._v(" "), _c('input', {
	    directives: [{
	      name: "model",
	      rawName: "v-model",
	      value: (_vm.custAddress),
	      expression: "custAddress"
	    }],
	    staticClass: "form-control",
	    attrs: {
	      "type": "text"
	    },
	    domProps: {
	      "value": _vm._s(_vm.custAddress)
	    },
	    on: {
	      "input": function($event) {
	        if ($event.target.composing) { return; }
	        _vm.custAddress = $event.target.value
	      }
	    }
	  })])]), _vm._v(" "), _c('span', {
	    staticStyle: {
	      "font-size": "12px",
	      "font-weight": "700"
	    }
	  }, [_vm._v("Customer Event Information")])]), _vm._v(" "), _c('form', {
	    attrs: {
	      "id": "newEventForm"
	    }
	  }, [_c('div', {
	    staticClass: "row"
	  }, [_c('div', {
	    staticClass: "col-md-2"
	  }, [_c('label', {
	    staticClass: "control-label"
	  }, [_vm._v("ID *")]), _vm._v(" "), _c('input', {
	    directives: [{
	      name: "model",
	      rawName: "v-model",
	      value: (_vm.eventid),
	      expression: "eventid"
	    }],
	    staticClass: "form-control",
	    attrs: {
	      "type": "text",
	      "required": "",
	      "readonly": ""
	    },
	    domProps: {
	      "value": _vm._s(_vm.eventid)
	    },
	    on: {
	      "input": function($event) {
	        if ($event.target.composing) { return; }
	        _vm.eventid = $event.target.value
	      }
	    }
	  })]), _vm._v(" "), _c('div', {
	    staticClass: "col-md-2"
	  }, [_c('label', {
	    staticClass: "control-label"
	  }, [_vm._v("Name *")]), _vm._v(" "), _c('input', {
	    directives: [{
	      name: "model",
	      rawName: "v-model",
	      value: (_vm.eventName),
	      expression: "eventName"
	    }],
	    staticClass: "form-control",
	    attrs: {
	      "type": "text",
	      "required": ""
	    },
	    domProps: {
	      "value": _vm._s(_vm.eventName)
	    },
	    on: {
	      "input": function($event) {
	        if ($event.target.composing) { return; }
	        _vm.eventName = $event.target.value
	      }
	    }
	  })]), _vm._v(" "), _vm._m(0), _vm._v(" "), _c('div', {
	    staticClass: "col-md-5"
	  }, [_c('label', {
	    staticClass: "control-label",
	    attrs: {
	      "for": "us_InputEventDet"
	    }
	  }, [_vm._v("Event Note")]), _vm._v(" "), _c('input', {
	    directives: [{
	      name: "model",
	      rawName: "v-model",
	      value: (_vm.eventNote),
	      expression: "eventNote"
	    }],
	    staticClass: "form-control",
	    attrs: {
	      "type": "text",
	      "id": "us_InputEventDet"
	    },
	    domProps: {
	      "value": _vm._s(_vm.eventNote)
	    },
	    on: {
	      "input": function($event) {
	        if ($event.target.composing) { return; }
	        _vm.eventNote = $event.target.value
	      }
	    }
	  })])])]), _c('br'), _vm._v(" "), _c('div', {
	    staticClass: "row"
	  }, [_c('div', {
	    staticClass: "col-md-10"
	  }, [_c('table', {
	    staticClass: "table table-striped"
	  }, [_vm._m(1), _vm._v(" "), _c('tbody', _vm._l((_vm.events), function(event) {
	    return _c('tr', [_c('td', [_vm._v(_vm._s(event.id))]), _vm._v(" "), _c('td', [_vm._v(_vm._s(event.name))]), _vm._v(" "), _c('td', [_vm._v(_vm._s(event.date))]), _vm._v(" "), _c('td', {
	      staticClass: "text-center dropdown"
	    }, [_c('a', {
	      staticClass: "fa fa-info-circle",
	      attrs: {
	        "href": "javascript:void(0)",
	        "id": "dropdownMenu2",
	        "data-toggle": "dropdown",
	        "aria-haspopup": "true",
	        "aria-expanded": "false"
	      }
	    }), _vm._v(" "), _c('ul', {
	      staticClass: "dropdown-menu",
	      attrs: {
	        "aria-labelledby": "dropdownMenu2"
	      }
	    }, [_c('li', [_c('div', {
	      staticClass: "container-fluid"
	    }, [_vm._v(_vm._s(event.note))])])])]), _vm._v(" "), _c('td', {
	      staticClass: "text-center"
	    }, [_c('button', {
	      staticClass: "btn-xs btn-default glyphicon glyphicon-remove",
	      staticStyle: {
	        "margin-top": "-20px"
	      },
	      on: {
	        "click": function($event) {
	          _vm.removeSlc(event.id)
	        }
	      }
	    })])])
	  }))])]), _vm._v(" "), _c('div', {
	    staticClass: "col-md-2 text-right"
	  }, [_c('button', {
	    staticClass: "btn btn-default glyphicon glyphicon-plus",
	    on: {
	      "click": _vm.addEvent
	    }
	  }), _c('br'), _vm._v(" "), _c('button', {
	    staticClass: "btn btn-default glyphicon glyphicon-minus",
	    on: {
	      "click": _vm.removeEvent
	    }
	  }), _c('br'), _c('br')])]), _vm._v(" "), _c('div', {
	    staticClass: "row"
	  }, [_c('div', {
	    staticClass: "col-md-offset-10 col-md-2 text-right"
	  }, [_c('button', {
	    staticClass: "btn btn-default",
	    on: {
	      "click": _vm.save
	    }
	  }, [_c('i', {
	    staticClass: "glyphicon glyphicon-floppy-disk"
	  })]), _c('br'), _vm._v(" "), _c('button', {
	    staticClass: "btn btn-default",
	    on: {
	      "click": _vm.reset
	    }
	  }, [_c('i', {
	    staticClass: "glyphicon glyphicon-trash"
	  })])])])])
	},staticRenderFns: [function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
	  return _c('div', {
	    staticClass: "col-md-3"
	  }, [_c('div', {
	    staticClass: "input-group date",
	    attrs: {
	      "data-provide": "datepicker"
	    }
	  }, [_c('label', {
	    staticClass: "control-label",
	    attrs: {
	      "for": "us_InputEventDate"
	    }
	  }, [_vm._v("Date *")]), _vm._v(" "), _c('div', {
	    staticClass: "input-group"
	  }, [_c('input', {
	    staticClass: "form-control",
	    attrs: {
	      "type": "text",
	      "required": "",
	      "id": "us_InputEventDate"
	    }
	  }), _vm._v(" "), _c('span', {
	    staticClass: "input-group-addon"
	  }, [_c('i', {
	    staticClass: "fa fa-table"
	  })])])])])
	},function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
	  return _c('thead', [_c('tr', [_c('th', [_vm._v("ID")]), _vm._v(" "), _c('th', [_vm._v("Name")]), _vm._v(" "), _c('th', [_vm._v("Date")]), _vm._v(" "), _c('th', {
	    staticClass: "text-center"
	  }, [_vm._v("Note")])])])
	}]}
	module.exports.render._withStripped = true
	if (false) {
	  module.hot.accept()
	  if (module.hot.data) {
	     require("vue-hot-reload-api").rerender("data-v-24125483", module.exports)
	  }
	}

/***/ },
/* 36 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	var store = new Vuex.Store({
	    state: {
	        currentUser: "",
	        loginStatus: false,
	        selectedUser: {}
	    },
	    mutations: {
	        login: function login(state, user) {
	            state.currentUser = user;
	            state.loginStatus = true;
	        },
	        selectUserPage: function selectUserPage(state, user) {
	            state.selectedUser = user;
	        },
	        updateCurrentUserEvent: function updateCurrentUserEvent(state, events) {
	            state.selectedUser.events = events;
	        }
	    }
	});

	exports.default = store;

/***/ },
/* 37 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_exports__, __vue_options__
	var __vue_styles__ = {}

	/* script */
	__vue_exports__ = __webpack_require__(38)

	/* template */
	var __vue_template__ = __webpack_require__(39)
	__vue_options__ = __vue_exports__ = __vue_exports__ || {}
	if (
	  typeof __vue_exports__.default === "object" ||
	  typeof __vue_exports__.default === "function"
	) {
	if (Object.keys(__vue_exports__).some(function (key) { return key !== "default" && key !== "__esModule" })) {console.error("named exports are not supported in *.vue files.")}
	__vue_options__ = __vue_exports__ = __vue_exports__.default
	}
	if (typeof __vue_options__ === "function") {
	  __vue_options__ = __vue_options__.options
	}
	__vue_options__.__file = "D:\\b\\src\\components\\userview.vue"
	__vue_options__.render = __vue_template__.render
	__vue_options__.staticRenderFns = __vue_template__.staticRenderFns

	/* hot reload */
	if (false) {(function () {
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  module.hot.accept()
	  if (!module.hot.data) {
	    hotAPI.createRecord("data-v-e047e9a8", __vue_options__)
	  } else {
	    hotAPI.reload("data-v-e047e9a8", __vue_options__)
	  }
	})()}
	if (__vue_options__.functional) {console.error("[vue-loader] userview.vue: functional components are not supported and should be defined in plain js files using render functions.")}

	module.exports = __vue_exports__


/***/ },
/* 38 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _globals = __webpack_require__(27);

	var _globals2 = _interopRequireDefault(_globals);

	var _store = __webpack_require__(36);

	var _store2 = _interopRequireDefault(_store);

	var _searchbar = __webpack_require__(51);

	var _searchbar2 = _interopRequireDefault(_searchbar);

	var _msgbar = __webpack_require__(54);

	var _msgbar2 = _interopRequireDefault(_msgbar);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = {
	    data: function data() {
	        return {
	            custid: "",
	            custName: "",
	            custEmail: "",
	            custNum: "",
	            custAddress: "",
	            eventid: 1,
	            eventName: "",
	            eventNote: "",
	            events: [],
	            users: []
	        };
	    },

	    store: _store2.default,
	    computed: {
	        currentUser: function currentUser() {
	            return _store2.default.state.selectedUser;
	        }
	    },
	    methods: {
	        addEvent: function addEvent() {
	            var _this = this;

	            _globals2.default.formValid("form#modifyEventForm :input[required]:visible", function (v) {
	                if (v) {
	                    (function () {

	                        var event = { id: _this.eventid, name: _this.eventName, date: $("#su_InputEventDate").val(), note: _this.eventNote, status: "on" };

	                        var ajax = new Promise(function (resolve, reject) {
	                            $.ajax({
	                                url: '/event/add/' + _this.custid,
	                                type: 'POST',
	                                contentType: "application/json",
	                                data: JSON.stringify(event)
	                            }).done(resolve).fail(reject);
	                        });

	                        var onSuccess = function onSuccess(result) {
	                            if (result.status == "ok") {
	                                _this.events.push(event);
	                                _store2.default.commit("updateCurrentUserEvent", _this.events);
	                                _this.reset();
	                                if (_this.$parent.$refs.search.users.length != 0) {
	                                    _this.$parent.$refs.search.getByUsername();
	                                }
	                            }
	                        };

	                        var onError = function onError(err) {};

	                        _this.$refs.msg.ajaxCall(ajax, onSuccess, onError, {
	                            loading: "Event Creating"
	                        });
	                    })();
	                } else {
	                    _this.$refs.msg.errorMsg("Missing Event Infos.");
	                }
	            });
	        },
	        removeEvent: function removeEvent() {
	            if (this.events.length != 0) {
	                this.$refs.msg.successMsg('Event Deleted.');
	                this.events.pop();
	                this.eventid -= 1;
	            } else {
	                this.$refs.msg.errorMsg("No Event Loaded.");
	            }
	        },
	        removeSlc: function removeSlc(id) {
	            this.events.splice(id - 1, 1);
	            for (var i = 1; i <= this.events.length; i++) {
	                var index = i - 1;
	                this.events[index].id = i;
	            }
	            this.$refs.msg.successMsg('Event Deleted.');
	            this.eventid = this.events.length + 1;
	        },
	        save: function save() {
	            var _this2 = this;

	            _globals2.default.formValid("form#modifyCustForm :input[required]:visible", function (v) {
	                var user = { "A_Username": _this2.custid, "A_Email": _this2.custEmail, "A_Name": _this2.custName, "A_Phone": _this2.custNum, "A_Address": _this2.custAddress, "A_Events": _this2.events };
	                if (v) {
	                    var ajax = new Promise(function (resolve, reject) {
	                        $.ajax({
	                            url: '/user/' + _this2.custid,
	                            type: 'PUT',
	                            contentType: "application/json",
	                            data: JSON.stringify(user)
	                        }).done(resolve).fail(reject);
	                    });

	                    var onSuccess = function onSuccess(result) {
	                        var curUser = { "username": _this2.custid,
	                            'name': _this2.custName,
	                            "email": _this2.custEmail,
	                            "phone": _this2.custNum,
	                            "address": _this2.custAddress,
	                            "events": _this2.events,
	                            "selected": false };
	                        if (result.status == "ok") {
	                            if (_this2.$parent.$refs.search.users.length != 0) {
	                                _this2.$parent.$refs.search.getByUsername();
	                                curUser.selected = true;
	                            }
	                        }

	                        _store2.default.commit('selectUserPage', curUser);
	                    };

	                    var onError = function onError(err) {};

	                    _this2.$refs.msg.ajaxCall(ajax, onSuccess, onError, {
	                        loading: "Modification Processing"
	                    });
	                } else {
	                    _this2.$refs.msg.errorMsg("Missing Customer Infos.");
	                }
	            });
	        },
	        reset: function reset() {
	            this.eventName = "";
	            $("#su_InputEventDate").val("");
	            this.eventNote = "";
	            this.loadData();
	        },
	        loadData: function loadData() {
	            this.eventid = this.currentUser.events.length + 1;
	            this.custid = this.currentUser.username;
	            this.custName = this.currentUser.name;
	            this.custEmail = this.currentUser.email;
	            this.custNum = this.currentUser.phone;
	            this.custAddress = this.currentUser.address;
	            this.events = this.currentUser.events.slice();
	        }
	    },
	    watch: {
	        currentUser: function currentUser() {
	            this.loadData();
	        }
	    },
	    created: function created() {
	        if (this.currentUser.username != undefined) {
	            this.loadData();
	        }
	    },

	    components: {
	        search: _searchbar2.default,
	        msgbar: _msgbar2.default
	    }

	};

/***/ },
/* 39 */
/***/ function(module, exports, __webpack_require__) {

	module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
	  return _c('div', {
	    staticClass: "panel-body"
	  }, [_c('div', {
	    staticClass: "row"
	  }, [_c('h2', {
	    staticClass: "col-md-8"
	  }, [_vm._v("Customer Profile")]), _vm._v(" "), _c('div', {
	    staticClass: "col-md-4 text-center"
	  }, [_c('br'), _c('br'), _vm._v(" "), _c('msgbar', {
	    ref: "msg"
	  })], 1)]), _vm._v(" "), _c('hr'), _vm._v(" "), _c('div', {
	    staticClass: "row"
	  }, [_c('div', {
	    staticClass: "col-md-4"
	  }, [_c('search', {
	    attrs: {
	      "requireRefresh": "{true}"
	    }
	  })], 1)]), _vm._v(" "), _c('br'), _vm._v(" "), _c('span', {
	    staticStyle: {
	      "font-size": "12px",
	      "font-weight": "700"
	    }
	  }, [_vm._v("Customer Information")]), _vm._v(" "), _c('form', {
	    attrs: {
	      "id": "modifyCustForm"
	    }
	  }, [_c('div', {
	    staticClass: "row"
	  }, [_c('div', {
	    staticClass: "form-group col-md-3"
	  }, [_c('label', {
	    staticClass: "control-label"
	  }, [_vm._v("ID")]), _vm._v(" "), _c('input', {
	    directives: [{
	      name: "model",
	      rawName: "v-model",
	      value: (_vm.custid),
	      expression: "custid"
	    }],
	    staticClass: "form-control",
	    attrs: {
	      "type": "text"
	    },
	    domProps: {
	      "value": _vm._s(_vm.custid)
	    },
	    on: {
	      "input": function($event) {
	        if ($event.target.composing) { return; }
	        _vm.custid = $event.target.value
	      }
	    }
	  })]), _vm._v(" "), _c('div', {
	    staticClass: "form-group col-md-3"
	  }, [_c('label', {
	    staticClass: "control-label"
	  }, [_vm._v("Name")]), _vm._v(" "), _c('input', {
	    directives: [{
	      name: "model",
	      rawName: "v-model",
	      value: (_vm.custName),
	      expression: "custName"
	    }],
	    staticClass: "form-control",
	    attrs: {
	      "type": "text"
	    },
	    domProps: {
	      "value": _vm._s(_vm.custName)
	    },
	    on: {
	      "input": function($event) {
	        if ($event.target.composing) { return; }
	        _vm.custName = $event.target.value
	      }
	    }
	  })]), _vm._v(" "), _c('div', {
	    staticClass: "form-group col-md-6"
	  }, [_c('label', {
	    staticClass: "control-label"
	  }, [_vm._v("Email")]), _vm._v(" "), _c('input', {
	    directives: [{
	      name: "model",
	      rawName: "v-model",
	      value: (_vm.custEmail),
	      expression: "custEmail"
	    }],
	    staticClass: "form-control",
	    attrs: {
	      "type": "text"
	    },
	    domProps: {
	      "value": _vm._s(_vm.custEmail)
	    },
	    on: {
	      "input": function($event) {
	        if ($event.target.composing) { return; }
	        _vm.custEmail = $event.target.value
	      }
	    }
	  })])]), _vm._v(" "), _c('div', {
	    staticClass: "row"
	  }, [_c('div', {
	    staticClass: "form-group col-md-3"
	  }, [_c('label', {
	    staticClass: "control-label"
	  }, [_vm._v("Contact#")]), _vm._v(" "), _c('input', {
	    directives: [{
	      name: "model",
	      rawName: "v-model",
	      value: (_vm.custNum),
	      expression: "custNum"
	    }],
	    staticClass: "form-control",
	    attrs: {
	      "type": "number"
	    },
	    domProps: {
	      "value": _vm._s(_vm.custNum)
	    },
	    on: {
	      "input": function($event) {
	        if ($event.target.composing) { return; }
	        _vm.custNum = _vm._n($event.target.value)
	      },
	      "blur": function($event) {
	        _vm.$forceUpdate()
	      }
	    }
	  })]), _vm._v(" "), _c('div', {
	    staticClass: "form-group col-md-9"
	  }, [_c('label', {
	    staticClass: "control-label"
	  }, [_vm._v("Contact Address")]), _vm._v(" "), _c('input', {
	    directives: [{
	      name: "model",
	      rawName: "v-model",
	      value: (_vm.custAddress),
	      expression: "custAddress"
	    }],
	    staticClass: "form-control",
	    attrs: {
	      "type": "text"
	    },
	    domProps: {
	      "value": _vm._s(_vm.custAddress)
	    },
	    on: {
	      "input": function($event) {
	        if ($event.target.composing) { return; }
	        _vm.custAddress = $event.target.value
	      }
	    }
	  })])])]), _vm._v(" "), _c('span', {
	    staticStyle: {
	      "font-size": "12px",
	      "font-weight": "700"
	    }
	  }, [_vm._v("Event Information")]), _vm._v(" "), _c('form', {
	    attrs: {
	      "id": "modifyEventForm"
	    }
	  }, [_c('div', {
	    staticClass: "row"
	  }, [_c('div', {
	    staticClass: "col-md-2"
	  }, [_c('label', {
	    staticClass: "control-label"
	  }, [_vm._v("ID *")]), _vm._v(" "), _c('input', {
	    directives: [{
	      name: "model",
	      rawName: "v-model",
	      value: (_vm.eventid),
	      expression: "eventid"
	    }],
	    staticClass: "form-control",
	    attrs: {
	      "type": "text",
	      "required": "",
	      "readonly": ""
	    },
	    domProps: {
	      "value": _vm._s(_vm.eventid)
	    },
	    on: {
	      "input": function($event) {
	        if ($event.target.composing) { return; }
	        _vm.eventid = $event.target.value
	      }
	    }
	  })]), _vm._v(" "), _c('div', {
	    staticClass: "col-md-2"
	  }, [_c('label', {
	    staticClass: "control-label"
	  }, [_vm._v("Name *")]), _vm._v(" "), _c('input', {
	    directives: [{
	      name: "model",
	      rawName: "v-model",
	      value: (_vm.eventName),
	      expression: "eventName"
	    }],
	    staticClass: "form-control",
	    attrs: {
	      "type": "text",
	      "required": ""
	    },
	    domProps: {
	      "value": _vm._s(_vm.eventName)
	    },
	    on: {
	      "input": function($event) {
	        if ($event.target.composing) { return; }
	        _vm.eventName = $event.target.value
	      }
	    }
	  })]), _vm._v(" "), _vm._m(0), _vm._v(" "), _c('div', {
	    staticClass: "col-md-5"
	  }, [_c('label', {
	    staticClass: "control-label"
	  }, [_vm._v("Event Note")]), _vm._v(" "), _c('input', {
	    directives: [{
	      name: "model",
	      rawName: "v-model",
	      value: (_vm.eventNote),
	      expression: "eventNote"
	    }],
	    staticClass: "form-control",
	    attrs: {
	      "type": "text"
	    },
	    domProps: {
	      "value": _vm._s(_vm.eventNote)
	    },
	    on: {
	      "input": function($event) {
	        if ($event.target.composing) { return; }
	        _vm.eventNote = $event.target.value
	      }
	    }
	  })])])]), _c('br'), _vm._v(" "), _c('div', {
	    staticClass: "row"
	  }, [_c('div', {
	    staticClass: "col-md-10"
	  }, [_c('table', {
	    staticClass: "table table-striped"
	  }, [_vm._m(1), _vm._v(" "), _c('tbody', _vm._l((_vm.events), function(event) {
	    return _c('tr', [_c('td', [_vm._v(_vm._s(event.id))]), _vm._v(" "), _c('td', [_vm._v(_vm._s(event.name))]), _vm._v(" "), _c('td', [_vm._v(_vm._s(event.date))]), _vm._v(" "), _c('td', {
	      staticClass: "text-center dropdown"
	    }, [_c('a', {
	      staticClass: "fa fa-info-circle",
	      attrs: {
	        "href": "javascript:void(0)",
	        "id": "dropdownMenu2",
	        "data-toggle": "dropdown",
	        "aria-haspopup": "true",
	        "aria-expanded": "false"
	      }
	    }), _vm._v(" "), _c('ul', {
	      staticClass: "dropdown-menu",
	      attrs: {
	        "aria-labelledby": "dropdownMenu2"
	      }
	    }, [_c('li', [_c('div', {
	      staticClass: "container-fluid"
	    }, [_vm._v(_vm._s(event.note))])])])]), _vm._v(" "), _c('td', {
	      staticClass: "text-center"
	    }, [_vm._v(_vm._s(event.status))]), _vm._v(" "), _c('td', {
	      staticClass: "text-center"
	    }, [(event.status === 'on') ? _c('button', {
	      staticClass: "btn-xs btn-default glyphicon glyphicon-remove",
	      staticStyle: {
	        "margin-top": "-20px"
	      },
	      on: {
	        "click": function($event) {
	          _vm.removeSlc(event.id)
	        }
	      }
	    }) : _c('button', {
	      staticClass: "btn-xs btn-default glyphicon glyphicon glyphicon-ok",
	      staticStyle: {
	        "margin-top": "-20px"
	      },
	      on: {
	        "click": function($event) {
	          _vm.removeSlc(event.id)
	        }
	      }
	    })])])
	  }))])]), _vm._v(" "), _c('div', {
	    staticClass: "col-md-2 text-right"
	  }, [_c('button', {
	    staticClass: "btn btn-default glyphicon glyphicon-plus",
	    on: {
	      "click": _vm.addEvent
	    }
	  }), _c('br'), _vm._v(" "), _c('button', {
	    staticClass: "btn btn-default glyphicon glyphicon-minus",
	    on: {
	      "click": _vm.removeEvent
	    }
	  }), _c('br'), _c('br')])]), _vm._v(" "), _c('div', {
	    staticClass: "row"
	  }, [_c('div', {
	    staticClass: "col-md-offset-10 col-md-2 text-right"
	  }, [_c('button', {
	    staticClass: "btn btn-default",
	    on: {
	      "click": _vm.save
	    }
	  }, [_c('i', {
	    staticClass: "glyphicon glyphicon-floppy-disk"
	  })]), _c('br'), _vm._v(" "), _c('button', {
	    staticClass: "btn btn-default",
	    on: {
	      "click": _vm.reset
	    }
	  }, [_c('i', {
	    staticClass: "glyphicon glyphicon-repeat"
	  })])])])])
	},staticRenderFns: [function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
	  return _c('div', {
	    staticClass: "col-md-3"
	  }, [_c('div', {
	    staticClass: "input-group date",
	    attrs: {
	      "data-provide": "datepicker"
	    }
	  }, [_c('label', {
	    staticClass: "control-label"
	  }, [_vm._v("Date *")]), _vm._v(" "), _c('div', {
	    staticClass: "input-group"
	  }, [_c('input', {
	    staticClass: "form-control",
	    attrs: {
	      "type": "text",
	      "required": "",
	      "id": "su_InputEventDate"
	    }
	  }), _vm._v(" "), _c('span', {
	    staticClass: "input-group-addon"
	  }, [_c('i', {
	    staticClass: "fa fa-table"
	  })])])])])
	},function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
	  return _c('thead', [_c('tr', [_c('th', [_vm._v("ID")]), _vm._v(" "), _c('th', [_vm._v("Name")]), _vm._v(" "), _c('th', [_vm._v("Date")]), _vm._v(" "), _c('th', {
	    staticClass: "text-center"
	  }, [_vm._v("Note")]), _vm._v(" "), _c('th', {
	    staticClass: "text-center"
	  }, [_vm._v("Status")]), _vm._v(" "), _c('th')])])
	}]}
	module.exports.render._withStripped = true
	if (false) {
	  module.hot.accept()
	  if (module.hot.data) {
	     require("vue-hot-reload-api").rerender("data-v-e047e9a8", module.exports)
	  }
	}

/***/ },
/* 40 */,
/* 41 */,
/* 42 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_exports__, __vue_options__
	var __vue_styles__ = {}

	/* script */
	__vue_exports__ = __webpack_require__(43)

	/* template */
	var __vue_template__ = __webpack_require__(44)
	__vue_options__ = __vue_exports__ = __vue_exports__ || {}
	if (
	  typeof __vue_exports__.default === "object" ||
	  typeof __vue_exports__.default === "function"
	) {
	if (Object.keys(__vue_exports__).some(function (key) { return key !== "default" && key !== "__esModule" })) {console.error("named exports are not supported in *.vue files.")}
	__vue_options__ = __vue_exports__ = __vue_exports__.default
	}
	if (typeof __vue_options__ === "function") {
	  __vue_options__ = __vue_options__.options
	}
	__vue_options__.__file = "D:\\b\\src\\components\\eventview.vue"
	__vue_options__.render = __vue_template__.render
	__vue_options__.staticRenderFns = __vue_template__.staticRenderFns

	/* hot reload */
	if (false) {(function () {
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  module.hot.accept()
	  if (!module.hot.data) {
	    hotAPI.createRecord("data-v-bfdf8f9a", __vue_options__)
	  } else {
	    hotAPI.reload("data-v-bfdf8f9a", __vue_options__)
	  }
	})()}
	if (__vue_options__.functional) {console.error("[vue-loader] eventview.vue: functional components are not supported and should be defined in plain js files using render functions.")}

	module.exports = __vue_exports__


/***/ },
/* 43 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.default = {
	    data: function data() {
	        return {
	            eventUser: "",
	            eventName: "",
	            eventNote: "",
	            events: [],
	            schType: "all",
	            schUserName: "",
	            typeHidden: true,
	            spinHidden: true,
	            msg: "",
	            msgError: false,
	            msgSuccess: false,
	            sortTable: {
	                date: false,
	                username: false,
	                name: false
	            }
	        };
	    },

	    methods: {
	        getEvents: function getEvents() {
	            var _this = this;

	            this.spinHidden = false;
	            $.ajax({
	                url: "/event/all?kyWrds=" + this.schUserName,
	                type: 'GET',
	                success: function success(r) {
	                    if (r.status == "ok") {
	                        if (r.result.length == 0) {
	                            _this.spinHidden = true;
	                            _this.errorMsg("No Event Found For This ID");
	                        } else {
	                            _this.spinHidden = true;
	                            _this.events = r.result;
	                            _this.successMsg("Event List Loaded");
	                        }
	                    } else {
	                        _this.errorMsg(r.content);
	                    }
	                }
	            });
	        },
	        sortBy: function sortBy(t) {
	            if (this.sortTable[t]) {
	                if (t != "date") {
	                    this.events = this.events.sort(function (a, b) {
	                        return a[t] > b[t] ? 1 : b[t] > a[t] ? -1 : 0;
	                    });
	                } else {
	                    this.events = this.events.sort(function (a, b) {
	                        return new Date(a[t]) > new Date(b[t]) ? 1 : new Date(b[t] > new Date(a[t])) ? -1 : 0;
	                    });
	                }
	                this.sortTable[t] = false;
	            } else {
	                if (t != "date") {
	                    this.events = this.events.sort(function (a, b) {
	                        return a[t] > b[t] ? -1 : b[t] > a[t] ? 1 : 0;
	                    });
	                } else {
	                    this.events = this.events.sort(function (a, b) {
	                        return new Date(a[t]) > new Date(b[t]) ? -1 : new Date(b[t] > new Date(a[t])) ? 1 : 0;
	                    });
	                }
	                this.sortTable[t] = true;
	            }
	        },
	        successMsg: function successMsg(txt) {
	            var _this2 = this;

	            this.msg = txt;
	            this.msgSuccess = true;
	            setTimeout(function () {
	                _this2.msg = "";
	                _this2.msgSuccess = false;
	            }, 3000);
	        },
	        errorMsg: function errorMsg(txt) {
	            var _this3 = this;

	            this.msg = txt;
	            this.msgError = true;
	            setTimeout(function () {
	                _this3.msg = "";
	                _this3.msgError = false;
	            }, 3000);
	        },
	        search: function search() {}
	    },
	    watch: {
	        "schType": function schType() {
	            if (this.schType == "all") {
	                this.schUserName = "";
	                this.typeHidden = true;
	            } else {
	                this.typeHidden = false;
	            }
	        },
	        "hideStatus": function hideStatus() {
	            if (!this.hideStatus) {
	                this.getEvents();
	            }
	        }
	    },
	    created: function created() {
	        this.getEvents();
	    }
	};

/***/ },
/* 44 */
/***/ function(module, exports, __webpack_require__) {

	module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
	  return _c('div', {
	    staticClass: "panel-body"
	  }, [_c('div', {
	    staticClass: "row"
	  }, [_c('h2', {
	    staticClass: "col-md-8"
	  }, [_vm._v("Events Information")]), _vm._v(" "), _c('div', {
	    staticClass: "col-md-4 text-center"
	  }, [_c('br'), _c('br'), _vm._v(" "), _c('span', {
	    class: {
	      "alert-danger": _vm.msgError, "alert-success": _vm.msgSuccess
	    },
	    attrs: {
	      "role": "alert"
	    }
	  }, [_c('i', {
	    staticClass: "fa fa-circle-o-notch fa-spin",
	    class: {
	      hidden: _vm.spinHidden
	    }
	  }, [_vm._v("  ")]), _vm._v("\n            " + _vm._s(_vm.msg) + "\n            ")])])]), _vm._v(" "), _c('hr'), _vm._v(" "), _c('form', {
	    attrs: {
	      "id": "addEventForm"
	    }
	  }, [_c('div', {
	    staticClass: "row"
	  }, [_c('div', {
	    staticClass: "col-md-2"
	  }, [_c('label', {
	    staticClass: "control-label"
	  }, [_vm._v("ID *")]), _vm._v(" "), _c('input', {
	    directives: [{
	      name: "model",
	      rawName: "v-model",
	      value: (_vm.eventUser),
	      expression: "eventUser"
	    }],
	    staticClass: "form-control",
	    attrs: {
	      "type": "text",
	      "required": ""
	    },
	    domProps: {
	      "value": _vm._s(_vm.eventUser)
	    },
	    on: {
	      "input": function($event) {
	        if ($event.target.composing) { return; }
	        _vm.eventUser = $event.target.value
	      }
	    }
	  })]), _vm._v(" "), _c('div', {
	    staticClass: "col-md-2"
	  }, [_c('label', {
	    staticClass: "control-label"
	  }, [_vm._v("Name *")]), _vm._v(" "), _c('input', {
	    directives: [{
	      name: "model",
	      rawName: "v-model",
	      value: (_vm.eventName),
	      expression: "eventName"
	    }],
	    staticClass: "form-control",
	    attrs: {
	      "type": "text",
	      "required": ""
	    },
	    domProps: {
	      "value": _vm._s(_vm.eventName)
	    },
	    on: {
	      "input": function($event) {
	        if ($event.target.composing) { return; }
	        _vm.eventName = $event.target.value
	      }
	    }
	  })]), _vm._v(" "), _vm._m(0), _vm._v(" "), _c('div', {
	    staticClass: "col-md-5"
	  }, [_c('label', {
	    staticClass: "control-label"
	  }, [_vm._v("Event Note")]), _vm._v(" "), _c('input', {
	    directives: [{
	      name: "model",
	      rawName: "v-model",
	      value: (_vm.eventNote),
	      expression: "eventNote"
	    }],
	    staticClass: "form-control",
	    attrs: {
	      "type": "text"
	    },
	    domProps: {
	      "value": _vm._s(_vm.eventNote)
	    },
	    on: {
	      "input": function($event) {
	        if ($event.target.composing) { return; }
	        _vm.eventNote = $event.target.value
	      }
	    }
	  })])])]), _c('br'), _vm._v(" "), _c('div', {
	    staticClass: "row"
	  }, [_c('div', {
	    staticClass: "col-md-3"
	  }, [_c('div', {
	    staticClass: "btn-group"
	  }, [_c('label', {
	    staticClass: "btn btn-default active"
	  }, [_vm._v("All "), _c('input', {
	    directives: [{
	      name: "model",
	      rawName: "v-model",
	      value: (_vm.schType),
	      expression: "schType"
	    }],
	    attrs: {
	      "type": "radio",
	      "value": "all"
	    },
	    domProps: {
	      "value": "all",
	      "checked": _vm._q(_vm.schType, "all")
	    },
	    on: {
	      "change": function($event) {
	        _vm.schType = "all"
	      }
	    }
	  })]), _vm._v(" "), _c('label', {
	    staticClass: "btn btn-default"
	  }, [_vm._v("ID "), _c('input', {
	    directives: [{
	      name: "model",
	      rawName: "v-model",
	      value: (_vm.schType),
	      expression: "schType"
	    }],
	    attrs: {
	      "type": "radio",
	      "value": "user"
	    },
	    domProps: {
	      "value": "user",
	      "checked": _vm._q(_vm.schType, "user")
	    },
	    on: {
	      "change": function($event) {
	        _vm.schType = "user"
	      }
	    }
	  })])])]), _vm._v(" "), _c('div', {
	    staticClass: "col-md-3"
	  }, [_c('div', {
	    staticClass: "input-group",
	    class: {
	      hidden: _vm.typeHidden
	    }
	  }, [_c('input', {
	    directives: [{
	      name: "model",
	      rawName: "v-model",
	      value: (_vm.schUserName),
	      expression: "schUserName"
	    }],
	    staticClass: "form-control",
	    attrs: {
	      "type": "text",
	      "placeholder": "ID"
	    },
	    domProps: {
	      "value": _vm._s(_vm.schUserName)
	    },
	    on: {
	      "input": function($event) {
	        if ($event.target.composing) { return; }
	        _vm.schUserName = $event.target.value
	      }
	    }
	  }), _vm._v(" "), _c('span', {
	    staticClass: "input-group-addon"
	  }, [_c('a', {
	    attrs: {
	      "href": "javascript:void(0)"
	    },
	    on: {
	      "click": _vm.getEvents
	    }
	  }, [_c('i', {
	    staticClass: "glyphicon glyphicon-search"
	  })])])])]), _vm._v(" "), _c('div', {
	    staticClass: "col-md-offset-3 col-md-3 text-right"
	  }, [_c('button', {
	    staticClass: "btn btn-default glyphicon glyphicon-repeat",
	    on: {
	      "click": _vm.getEvents
	    }
	  })])]), _vm._v(" "), _c('div', {
	    staticClass: "row"
	  }, [_c('div', {
	    staticClass: "col-md-12"
	  }, [_c('table', {
	    staticClass: "table table-striped"
	  }, [_c('thead', [_c('tr', [_c('th', [_c('a', {
	    attrs: {
	      "href": "javascript:void(0)"
	    },
	    on: {
	      "click": function($event) {
	        _vm.sortBy("username")
	      }
	    }
	  }, [_vm._v("Customer "), _c('span', {
	    staticClass: "caret"
	  })])]), _vm._v(" "), _c('th', [_c('a', {
	    attrs: {
	      "href": "javascript:void(0)"
	    },
	    on: {
	      "click": function($event) {
	        _vm.sortBy("name")
	      }
	    }
	  }, [_vm._v("Name "), _c('span', {
	    staticClass: "caret"
	  })])]), _vm._v(" "), _c('th', [_c('a', {
	    attrs: {
	      "href": "javascript:void(0)"
	    },
	    on: {
	      "click": function($event) {
	        _vm.sortBy("date")
	      }
	    }
	  }, [_vm._v("Date "), _c('span', {
	    staticClass: "caret"
	  })])]), _vm._v(" "), _c('th', {
	    staticClass: "text-center"
	  }, [_vm._v("Note")]), _vm._v(" "), _c('th', {
	    staticClass: "text-center"
	  }, [_vm._v("Status")]), _vm._v(" "), _c('th', {
	    staticClass: "text-center"
	  })])]), _vm._v(" "), _c('tbody', _vm._l((_vm.events), function(event) {
	    return _c('tr', [_c('td', [_vm._v(_vm._s(event.username))]), _vm._v(" "), _c('td', [_vm._v(_vm._s(event.name))]), _vm._v(" "), _c('td', [_vm._v(_vm._s(event.date))]), _vm._v(" "), _c('td', {
	      staticClass: "text-center dropdown"
	    }, [_c('a', {
	      staticClass: "fa fa-info-circle",
	      attrs: {
	        "href": "javascript:void(0)",
	        "id": "dropdownMenu2",
	        "data-toggle": "dropdown",
	        "aria-haspopup": "true",
	        "aria-expanded": "false"
	      }
	    }), _vm._v(" "), _c('ul', {
	      staticClass: "dropdown-menu",
	      attrs: {
	        "aria-labelledby": "dropdownMenu2"
	      }
	    }, [_c('li', [_c('div', {
	      staticClass: "container-fluid"
	    }, [_vm._v(_vm._s(event.note))])])])]), _vm._v(" "), _c('td', {
	      staticClass: "text-center"
	    }, [_vm._v(_vm._s(event.status))]), _vm._v(" "), _c('td', {
	      staticClass: "text-center"
	    }, [(event.status === 'on') ? _c('button', {
	      staticClass: "btn-xs btn-default glyphicon glyphicon-remove",
	      staticStyle: {
	        "margin-top": "-20px"
	      },
	      on: {
	        "click": function($event) {
	          _vm.removeSlc(event.id)
	        }
	      }
	    }) : _c('button', {
	      staticClass: "btn-xs btn-default glyphicon glyphicon glyphicon-ok",
	      staticStyle: {
	        "margin-top": "-20px"
	      },
	      on: {
	        "click": function($event) {
	          _vm.removeSlc(event.id)
	        }
	      }
	    })])])
	  }))])])])])
	},staticRenderFns: [function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
	  return _c('div', {
	    staticClass: "col-md-3"
	  }, [_c('div', {
	    staticClass: "input-group date",
	    attrs: {
	      "data-provide": "datepicker"
	    }
	  }, [_c('label', {
	    staticClass: "control-label"
	  }, [_vm._v("Date *")]), _vm._v(" "), _c('div', {
	    staticClass: "input-group"
	  }, [_c('input', {
	    staticClass: "form-control",
	    attrs: {
	      "type": "text",
	      "required": "",
	      "id": "ae_InputEventDate"
	    }
	  }), _vm._v(" "), _c('span', {
	    staticClass: "input-group-addon"
	  }, [_c('i', {
	    staticClass: "fa fa-table"
	  })])])])])
	}]}
	module.exports.render._withStripped = true
	if (false) {
	  module.hot.accept()
	  if (module.hot.data) {
	     require("vue-hot-reload-api").rerender("data-v-bfdf8f9a", module.exports)
	  }
	}

/***/ },
/* 45 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_exports__, __vue_options__
	var __vue_styles__ = {}

	/* script */
	__vue_exports__ = __webpack_require__(47)

	/* template */
	var __vue_template__ = __webpack_require__(46)
	__vue_options__ = __vue_exports__ = __vue_exports__ || {}
	if (
	  typeof __vue_exports__.default === "object" ||
	  typeof __vue_exports__.default === "function"
	) {
	if (Object.keys(__vue_exports__).some(function (key) { return key !== "default" && key !== "__esModule" })) {console.error("named exports are not supported in *.vue files.")}
	__vue_options__ = __vue_exports__ = __vue_exports__.default
	}
	if (typeof __vue_options__ === "function") {
	  __vue_options__ = __vue_options__.options
	}
	__vue_options__.__file = "D:\\b\\src\\components\\404.vue"
	__vue_options__.render = __vue_template__.render
	__vue_options__.staticRenderFns = __vue_template__.staticRenderFns

	/* hot reload */
	if (false) {(function () {
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  module.hot.accept()
	  if (!module.hot.data) {
	    hotAPI.createRecord("data-v-6094e1ac", __vue_options__)
	  } else {
	    hotAPI.reload("data-v-6094e1ac", __vue_options__)
	  }
	})()}
	if (__vue_options__.functional) {console.error("[vue-loader] 404.vue: functional components are not supported and should be defined in plain js files using render functions.")}

	module.exports = __vue_exports__


/***/ },
/* 46 */
/***/ function(module, exports, __webpack_require__) {

	module.exports={render:function(){},staticRenderFns:[]}
	if (false) {
	  module.hot.accept()
	  if (module.hot.data) {
	     require("vue-hot-reload-api").rerender("data-v-6094e1ac", module.exports)
	  }
	}

/***/ },
/* 47 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.default = {
	    data: function data() {
	        return {};
	    }
	};

/***/ },
/* 48 */,
/* 49 */,
/* 50 */,
/* 51 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_exports__, __vue_options__
	var __vue_styles__ = {}

	/* script */
	__vue_exports__ = __webpack_require__(52)

	/* template */
	var __vue_template__ = __webpack_require__(53)
	__vue_options__ = __vue_exports__ = __vue_exports__ || {}
	if (
	  typeof __vue_exports__.default === "object" ||
	  typeof __vue_exports__.default === "function"
	) {
	if (Object.keys(__vue_exports__).some(function (key) { return key !== "default" && key !== "__esModule" })) {console.error("named exports are not supported in *.vue files.")}
	__vue_options__ = __vue_exports__ = __vue_exports__.default
	}
	if (typeof __vue_options__ === "function") {
	  __vue_options__ = __vue_options__.options
	}
	__vue_options__.__file = "D:\\b\\src\\components\\minorcomponents\\searchbar.vue"
	__vue_options__.render = __vue_template__.render
	__vue_options__.staticRenderFns = __vue_template__.staticRenderFns

	/* hot reload */
	if (false) {(function () {
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  module.hot.accept()
	  if (!module.hot.data) {
	    hotAPI.createRecord("data-v-32f8c1ce", __vue_options__)
	  } else {
	    hotAPI.reload("data-v-32f8c1ce", __vue_options__)
	  }
	})()}
	if (__vue_options__.functional) {console.error("[vue-loader] searchbar.vue: functional components are not supported and should be defined in plain js files using render functions.")}

	module.exports = __vue_exports__


/***/ },
/* 52 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _store = __webpack_require__(36);

	var _store2 = _interopRequireDefault(_store);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = {
	    data: function data() {
	        return {
	            schKeywords: '',
	            schAlert: '',
	            schAlertHid: false,
	            removeBtn: true,
	            users: []
	        };
	    },

	    props: ['requireRefresh'],
	    store: _store2.default,
	    methods: {
	        select: function select(un) {
	            if (un.username != "No Result") {
	                var userNum = this.users.indexOf(un);
	                if (this.prevSelected != 1000) {
	                    this.users[this.prevSelected].selected = false;
	                }
	                this.users[userNum].selected = true;
	                this.prevSelected = userNum;
	                this.$router.push('/cp/user');
	                _store2.default.commit("selectUserPage", this.users[this.prevSelected]);
	                if (this.requireRefresh) {
	                    this.clearResult();
	                }
	            }
	        },
	        search: function search() {
	            this.schAlert = '';
	            this.getByUsername();
	        },
	        keyUpSearch: function keyUpSearch() {
	            if (this.schKeywords.length != 0) {
	                this.schAlert = '';
	                this.getByUsername();
	            }
	        },
	        getByUsername: function getByUsername() {
	            var _this = this;

	            $.ajax({
	                url: '/m/users/byusername',
	                type: 'GET',
	                data: { kyWrds: this.schKeywords },
	                success: function success(r) {
	                    _this.prevSelected = 1000;
	                    _this.users.length = 0;
	                    if (r.results.length != 0) {
	                        r.results.forEach(function (result) {
	                            var user = { "username": result.A_Username,
	                                'name': result.A_Name,
	                                "email": result.A_Email,
	                                "phone": result.A_Phone,
	                                "address": result.A_Address,
	                                "events": result.A_Events,
	                                "selected": false };
	                            var eventDue = 0;
	                            if (user.events.length != 0) {
	                                user.events.forEach(function (e) {
	                                    var dueDate = new Date(e.date);
	                                    var today = new Date();
	                                    if ((dueDate - today) / (1000 * 60 * 60 * 24) <= 5) {
	                                        eventDue += 1;
	                                    }
	                                });
	                            };
	                            user["eventDue"] = eventDue;
	                            _this.users.push(user);
	                        });
	                    } else {
	                        var notFound = { "username": "No Result", "selected": false };
	                        _this.users.push(notFound);
	                    }
	                }
	            });
	        },
	        clearResult: function clearResult() {
	            this.users.length = 0;
	            this.removeBtn = true;
	            this.schKeywords = "";
	        }
	    },
	    watch: {
	        schKeywords: function schKeywords() {
	            if (this.schKeywords.length == 0) {
	                this.schAlertHid = false;
	                this.schAlert = "";
	                this.users.length = 0;
	                this.removeBtn = true;
	            }
	        },
	        users: function users() {
	            if (this.users.length != 0) {
	                this.removeBtn = false;
	            }
	        }
	    }
	};

/***/ },
/* 53 */
/***/ function(module, exports, __webpack_require__) {

	module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
	  return _c('div', [_c('div', {
	    staticClass: "input-group"
	  }, [_c('input', {
	    directives: [{
	      name: "model",
	      rawName: "v-model",
	      value: (_vm.schKeywords),
	      expression: "schKeywords"
	    }],
	    staticClass: "form-control",
	    attrs: {
	      "type": "text",
	      "placeholder": "User Search"
	    },
	    domProps: {
	      "value": _vm._s(_vm.schKeywords)
	    },
	    on: {
	      "keyup": _vm.keyUpSearch,
	      "input": function($event) {
	        if ($event.target.composing) { return; }
	        _vm.schKeywords = $event.target.value
	      }
	    }
	  }), _vm._v(" "), _c('div', {
	    staticClass: "input-group-btn"
	  }, [_c('button', {
	    staticClass: "btn btn-default",
	    attrs: {
	      "type": "button"
	    },
	    on: {
	      "click": _vm.search
	    }
	  }, [_c('i', {
	    staticClass: "glyphicon glyphicon-search"
	  })]), _vm._v(" "), _c('button', {
	    staticClass: "btn btn-default",
	    class: {
	      hidden: _vm.removeBtn
	    },
	    attrs: {
	      "type": "button"
	    },
	    on: {
	      "click": _vm.clearResult
	    }
	  }, [_c('i', {
	    staticClass: "glyphicon glyphicon-remove"
	  })])])]), _vm._v(" "), _c('div', {
	    staticClass: "alert-danger",
	    class: {
	      alert: _vm.schAlertHid
	    }
	  }, [_vm._v(_vm._s(_vm.schAlert))]), _vm._v(" "), _vm._t("default"), _vm._v(" "), _c('ul', {
	    staticClass: "nav nav-second-level  list-group-item-overflow"
	  }, _vm._l((_vm.users), function(user) {
	    return _c('a', {
	      staticClass: "list-group-item list-group-item-action",
	      class: {
	        active: user.selected
	      },
	      attrs: {
	        "href": "javascript:void(0)"
	      },
	      on: {
	        "click": function($event) {
	          _vm.select(user)
	        }
	      }
	    }, [_vm._v("\n            " + _vm._s(user.username) + " "), _c('span', {
	      staticClass: "badge"
	    }, [_vm._v(_vm._s(user.eventDue))])])
	  }))], 2)
	},staticRenderFns: []}
	module.exports.render._withStripped = true
	if (false) {
	  module.hot.accept()
	  if (module.hot.data) {
	     require("vue-hot-reload-api").rerender("data-v-32f8c1ce", module.exports)
	  }
	}

/***/ },
/* 54 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_exports__, __vue_options__
	var __vue_styles__ = {}

	/* styles */
	__webpack_require__(57)

	/* script */
	__vue_exports__ = __webpack_require__(56)

	/* template */
	var __vue_template__ = __webpack_require__(55)
	__vue_options__ = __vue_exports__ = __vue_exports__ || {}
	if (
	  typeof __vue_exports__.default === "object" ||
	  typeof __vue_exports__.default === "function"
	) {
	if (Object.keys(__vue_exports__).some(function (key) { return key !== "default" && key !== "__esModule" })) {console.error("named exports are not supported in *.vue files.")}
	__vue_options__ = __vue_exports__ = __vue_exports__.default
	}
	if (typeof __vue_options__ === "function") {
	  __vue_options__ = __vue_options__.options
	}
	__vue_options__.__file = "D:\\b\\src\\components\\minorcomponents\\msgbar.vue"
	__vue_options__.render = __vue_template__.render
	__vue_options__.staticRenderFns = __vue_template__.staticRenderFns

	/* hot reload */
	if (false) {(function () {
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  module.hot.accept()
	  if (!module.hot.data) {
	    hotAPI.createRecord("data-v-c79c51c2", __vue_options__)
	  } else {
	    hotAPI.reload("data-v-c79c51c2", __vue_options__)
	  }
	})()}
	if (__vue_options__.functional) {console.error("[vue-loader] msgbar.vue: functional components are not supported and should be defined in plain js files using render functions.")}

	module.exports = __vue_exports__


/***/ },
/* 55 */
/***/ function(module, exports, __webpack_require__) {

	module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
	  return _c('div', [_c('transition', {
	    attrs: {
	      "name": "fade"
	    }
	  }, [(_vm.msgHidden) ? _c('span', {
	    class: {
	      "alert-danger": _vm.msgError, "alert-success": _vm.msgSuccess
	    },
	    attrs: {
	      "role": "alert"
	    }
	  }, [(_vm.spinHidden) ? _c('i', {
	    staticClass: "fa fa-circle-o-notch fa-spin"
	  }) : _vm._e(), _vm._v("\n        " + _vm._s(_vm.msg) + "\n        ")]) : _vm._e()])], 1)
	},staticRenderFns: []}
	module.exports.render._withStripped = true
	if (false) {
	  module.hot.accept()
	  if (module.hot.data) {
	     require("vue-hot-reload-api").rerender("data-v-c79c51c2", module.exports)
	  }
	}

/***/ },
/* 56 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.default = {
	    data: function data() {
	        return {
	            msg: "",
	            msgSuccess: false,
	            msgError: false,
	            spinHidden: false,
	            msgHidden: true
	        };
	    },

	    methods: {
	        ajaxCall: function ajaxCall(promise, onSuccess) {
	            var _this = this;

	            var onError = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : function () {};
	            var options = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : { loading: "Loading Content" };


	            this.spinHidden = true;
	            this.successMsg(options.loading);
	            promise.then(function (result) {
	                _this.spinHidden = false;
	                _this.successMsg(result.content);
	                onSuccess(result);
	            }, function (error) {
	                _this.spinHidden = false;
	                _this.errorMsg(error.content);
	                onError(error);
	            });
	        },
	        successMsg: function successMsg(txt) {
	            var _this2 = this;

	            this.msgHidden = true;
	            this.msg = txt;
	            this.msgSuccess = true;
	            setTimeout(function () {
	                _this2.msg = "";
	                _this2.msgSuccess = false;
	                _this2.msgHidden = false;
	            }, 3000);
	        },
	        errorMsg: function errorMsg(txt) {
	            var _this3 = this;

	            this.msgHidden = true;
	            this.msg = txt;
	            this.msgError = true;
	            setTimeout(function () {
	                _this3.msg = "";
	                _this3.msgError = false;
	                _this3.msgHidden = false;
	            }, 3000);
	        }
	    }
	};

/***/ },
/* 57 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(58);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(25)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../../node_modules/css-loader/index.js!./../../../node_modules/vue-loader/lib/style-rewriter.js?id=data-v-c79c51c2!./../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./msgbar.vue", function() {
				var newContent = require("!!./../../../node_modules/css-loader/index.js!./../../../node_modules/vue-loader/lib/style-rewriter.js?id=data-v-c79c51c2!./../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./msgbar.vue");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 58 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(24)();
	// imports


	// module
	exports.push([module.id, "\n.fade-enter-active, .fade-leave-active {\n    transition: opacity 0.5s\n}\n.fade-enter, .fade-leave-to {\n    opacity: 0\n}\n", ""]);

	// exports


/***/ }
/******/ ]);