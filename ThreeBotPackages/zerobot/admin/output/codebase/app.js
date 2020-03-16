var AdminApp =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
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
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/codebase/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 32);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return plugins; });
/* unused harmony export errors */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return JetApp; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return JetView; });
/* unused harmony export HashRouter */
/* unused harmony export StoreRouter */
/* unused harmony export UrlRouter */
/* unused harmony export EmptyRouter */
/* unused harmony export SubRouter */
var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var NavigationBlocked = function NavigationBlocked() {
    _classCallCheck(this, NavigationBlocked);
};

var JetBase = function () {
    function JetBase(webix) {
        _classCallCheck(this, JetBase);

        this.webixJet = true;
        this.webix = webix;
        this._events = [];
        this._subs = {};
        this._data = {};
    }

    JetBase.prototype.getRoot = function getRoot() {
        return this._root;
    };

    JetBase.prototype.destructor = function destructor() {
        this._detachEvents();
        this._destroySubs();
        this._events = this._container = this.app = this._parent = this._root = null;
    };

    JetBase.prototype.setParam = function setParam(id, value, url) {
        if (this._data[id] !== value) {
            this._data[id] = value;
            this._segment.update(id, value, 0);
            if (url) {
                return this.show(null);
            }
        }
    };

    JetBase.prototype.getParam = function getParam(id, parent) {
        var value = this._data[id];
        if (typeof value !== "undefined" || !parent) {
            return value;
        }
        var view = this.getParentView();
        if (view) {
            return view.getParam(id, parent);
        }
    };

    JetBase.prototype.getUrl = function getUrl() {
        return this._segment.suburl();
    };

    JetBase.prototype.getUrlString = function getUrlString() {
        return this._segment.toString();
    };

    JetBase.prototype.getParentView = function getParentView() {
        return this._parent;
    };

    JetBase.prototype.$$ = function $$(id) {
        if (typeof id === "string") {
            var root = this.getRoot();
            return root.queryView(function (obj) {
                return (obj.config.id === id || obj.config.localId === id) && obj.$scope === root.$scope;
            }, "self");
        } else {
            return id;
        }
    };

    JetBase.prototype.on = function on(obj, name, code) {
        var id = obj.attachEvent(name, code);
        this._events.push({ obj: obj, id: id });
        return id;
    };

    JetBase.prototype.contains = function contains(view) {
        for (var key in this._subs) {
            var kid = this._subs[key].view;
            if (kid === view || kid.contains(view)) {
                return true;
            }
        }
        return false;
    };

    JetBase.prototype.getSubView = function getSubView(name) {
        var sub = this.getSubViewInfo(name);
        if (sub) {
            return sub.subview.view;
        }
    };

    JetBase.prototype.getSubViewInfo = function getSubViewInfo(name) {
        var sub = this._subs[name || "default"];
        if (sub) {
            return { subview: sub, parent: this };
        }
        if (name === "_top") {
            this._subs[name] = { url: "", id: null, popup: true };
            return this.getSubViewInfo(name);
        }
        // when called from a child view, searches for nearest parent with subview
        if (this._parent) {
            return this._parent.getSubViewInfo(name);
        }
        return null;
    };

    JetBase.prototype._detachEvents = function _detachEvents() {
        var events = this._events;
        for (var i = events.length - 1; i >= 0; i--) {
            events[i].obj.detachEvent(events[i].id);
        }
    };

    JetBase.prototype._destroySubs = function _destroySubs() {
        // destroy sub views
        for (var key in this._subs) {
            var subView = this._subs[key].view;
            // it possible that subview was not loaded with any content yet
            // so check on null
            if (subView) {
                subView.destructor();
            }
        }
        // reset to prevent memory leaks
        this._subs = {};
    };

    JetBase.prototype._init_url_data = function _init_url_data() {
        var url = this._segment.current();
        this._data = {};
        this.webix.extend(this._data, url.params, true);
    };

    JetBase.prototype._getDefaultSub = function _getDefaultSub() {
        if (this._subs.default) {
            return this._subs.default;
        }
        for (var key in this._subs) {
            var sub = this._subs[key];
            if (!sub.branch && sub.view && key !== "_top") {
                var child = sub.view._getDefaultSub();
                if (child) {
                    return child;
                }
            }
        }
    };

    JetBase.prototype._routed_view = function _routed_view() {
        var parent = this.getParentView();
        if (!parent) {
            return true;
        }
        var sub = parent._getDefaultSub();
        if (!sub && sub !== this) {
            return false;
        }
        return parent._routed_view();
    };

    return JetBase;
}();

function parse(url) {
    // remove starting /
    if (url[0] === "/") {
        url = url.substr(1);
    }
    // split url by "/"
    var parts = url.split("/");
    var chunks = [];
    // for each page in url
    for (var i = 0; i < parts.length; i++) {
        var test = parts[i];
        var result = {};
        // detect params
        // support old 			some:a=b:c=d
        // and new notation		some?a=b&c=d
        var pos = test.indexOf(":");
        if (pos === -1) {
            pos = test.indexOf("?");
        }
        if (pos !== -1) {
            var params = test.substr(pos + 1).split(/[\:\?\&]/g);
            // create hash of named params
            for (var _iterator = params, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
                var _ref;

                if (_isArray) {
                    if (_i >= _iterator.length) break;
                    _ref = _iterator[_i++];
                } else {
                    _i = _iterator.next();
                    if (_i.done) break;
                    _ref = _i.value;
                }

                var param = _ref;

                var dchunk = param.split("=");
                result[dchunk[0]] = decodeURIComponent(dchunk[1]);
            }
        }
        // store parsed values
        chunks[i] = {
            page: pos > -1 ? test.substr(0, pos) : test,
            params: result,
            isNew: true
        };
    }
    // return array of page objects
    return chunks;
}
function url2str(stack) {
    var url = [];
    for (var _iterator2 = stack, _isArray2 = Array.isArray(_iterator2), _i2 = 0, _iterator2 = _isArray2 ? _iterator2 : _iterator2[Symbol.iterator]();;) {
        var _ref2;

        if (_isArray2) {
            if (_i2 >= _iterator2.length) break;
            _ref2 = _iterator2[_i2++];
        } else {
            _i2 = _iterator2.next();
            if (_i2.done) break;
            _ref2 = _i2.value;
        }

        var chunk = _ref2;

        url.push("/" + chunk.page);
        var params = obj2str(chunk.params);
        if (params) {
            url.push("?" + params);
        }
    }
    return url.join("");
}
function obj2str(obj) {
    var str = [];
    for (var key in obj) {
        if (str.length) {
            str.push("&");
        }
        str.push(key + "=" + encodeURIComponent(obj[key]));
    }
    return str.join("");
}

var Route = function () {
    function Route(route, index) {
        _classCallCheck(this, Route);

        this._next = 1;
        if (typeof route === "string") {
            this.route = {
                url: parse(route),
                path: route
            };
        } else {
            this.route = route;
        }
        this.index = index;
    }

    Route.prototype.current = function current() {
        return this.route.url[this.index];
    };

    Route.prototype.next = function next() {
        return this.route.url[this.index + this._next];
    };

    Route.prototype.suburl = function suburl() {
        return this.route.url.slice(this.index);
    };

    Route.prototype.shift = function shift() {
        return new Route(this.route, this.index + this._next);
    };

    Route.prototype.refresh = function refresh() {
        var url = this.route.url;
        for (var i = this.index + 1; i < url.length; i++) {
            url[i].isNew = true;
        }
    };

    Route.prototype.toString = function toString() {
        var str = url2str(this.suburl());
        return str ? str.substr(1) : "";
    };

    Route.prototype._join = function _join(path, kids) {
        var url = this.route.url;
        if (path === null) {
            // change of parameters, route elements are not affected
            return url;
        }
        var old = this.route.url;
        url = old.slice(0, this.index + (kids ? this._next : 0));
        if (path) {
            url = url.concat(parse(path));
            for (var i = 0; i < url.length; i++) {
                if (old[i]) {
                    url[i].view = old[i].view;
                }
                if (old[i] && url[i].page === old[i].page) {
                    url[i].isNew = false;
                }
            }
        }
        return url;
    };

    Route.prototype.append = function append(path) {
        var url = this._join(path, true);
        this.route.path = url2str(url);
        this.route.url = url;
        return this.route.path;
    };

    Route.prototype.show = function show(path, view, kids) {
        var _this = this;

        var url = this._join(path, kids);
        return new Promise(function (res, rej) {
            var redirect = url2str(url);
            var obj = {
                url: url,
                redirect: redirect,
                confirm: Promise.resolve()
            };
            var app = view ? view.app : null;
            // when creating a new route, it possible that it will not have any content
            // guard is not necessary in such case
            if (app) {
                var result = app.callEvent("app:guard", [obj.redirect, view, obj]);
                if (!result) {
                    rej(new NavigationBlocked());
                    return;
                }
            }
            obj.confirm.catch(function (err) {
                return rej(err);
            }).then(function () {
                if (obj.redirect === null) {
                    rej(new NavigationBlocked());
                    return;
                }
                if (obj.redirect !== redirect) {
                    app.show(obj.redirect);
                    rej(new NavigationBlocked());
                    return;
                }
                _this.route.path = redirect;
                _this.route.url = url;
                res();
            });
        });
    };

    Route.prototype.size = function size(n) {
        this._next = n;
    };

    Route.prototype.split = function split() {
        var route = {
            url: this.route.url.slice(this.index + 1),
            path: ""
        };
        if (route.url.length) {
            route.path = url2str(route.url);
        }
        return new Route(route, 0);
    };

    Route.prototype.update = function update(name, value, index) {
        var chunk = this.route.url[this.index + (index || 0)];
        if (!chunk) {
            this.route.url.push({ page: "", params: {} });
            return this.update(name, value, index);
        }
        if (name === "") {
            chunk.page = value;
        } else {
            chunk.params[name] = value;
        }
        this.route.path = url2str(this.route.url);
    };

    return Route;
}();

var JetView = function (_JetBase) {
    _inherits(JetView, _JetBase);

    function JetView(app, config) {
        _classCallCheck(this, JetView);

        var _this2 = _possibleConstructorReturn(this, _JetBase.call(this, app.webix));

        _this2.app = app;
        //this.$config = config;
        _this2._children = [];
        return _this2;
    }

    JetView.prototype.ui = function ui(_ui, config) {
        config = config || {};
        var container = config.container || _ui.container;
        var jetview = this.app.createView(_ui);
        this._children.push(jetview);
        jetview.render(container, this._segment, this);
        if ((typeof _ui === "undefined" ? "undefined" : _typeof(_ui)) !== "object" || _ui instanceof JetBase) {
            // raw webix UI
            return jetview;
        } else {
            return jetview.getRoot();
        }
    };

    JetView.prototype.show = function show(path, config) {
        config = config || {};
        // convert parameters object to url
        if ((typeof path === "undefined" ? "undefined" : _typeof(path)) === "object") {
            for (var key in path) {
                this.setParam(key, path[key]);
            }
            path = null;
        } else {
            // deligate to app in case of root prefix
            if (path.substr(0, 1) === "/") {
                return this.app.show(path);
            }
            // local path, do nothing
            if (path.indexOf("./") === 0) {
                path = path.substr(2);
            }
            // parent path, call parent view
            if (path.indexOf("../") === 0) {
                var parent = this.getParentView();
                if (parent) {
                    return parent.show(path.substr(3), config);
                } else {
                    return this.app.show("/" + path.substr(3));
                }
            }
            var sub = this.getSubViewInfo(config.target);
            if (sub) {
                if (sub.parent !== this) {
                    return sub.parent.show(path, config);
                } else if (config.target && config.target !== "default") {
                    return this._renderFrameLock(config.target, sub.subview, path);
                }
            } else {
                if (path) {
                    return this.app.show("/" + path);
                }
            }
        }
        return this._show(this._segment, path, this);
    };

    JetView.prototype._show = function _show(segment, path, view) {
        var _this3 = this;

        return segment.show(path, view, true).then(function () {
            _this3._init_url_data();
            return _this3._urlChange();
        }).then(function () {
            if (segment.route.linkRouter) {
                _this3.app.getRouter().set(segment.route.path, { silent: true });
                _this3.app.callEvent("app:route", [segment.route.path]);
            }
        });
    };

    JetView.prototype.init = function init(_$view, _$) {
        // stub
    };

    JetView.prototype.ready = function ready(_$view, _$url) {
        // stub
    };

    JetView.prototype.config = function config() {
        this.app.webix.message("View:Config is not implemented");
    };

    JetView.prototype.urlChange = function urlChange(_$view, _$url) {
        // stub
    };

    JetView.prototype.destroy = function destroy() {
        // stub
    };

    JetView.prototype.destructor = function destructor() {
        this.destroy();
        this._destroyKids();
        // destroy actual UI
        this._root.destructor();
        _JetBase.prototype.destructor.call(this);
    };

    JetView.prototype.use = function use(plugin, config) {
        plugin(this.app, this, config);
    };

    JetView.prototype.refresh = function refresh() {
        var url = this.getUrl();
        this.destroy();
        this._destroyKids();
        this._destroySubs();
        this._detachEvents();
        if (this._container.tagName) {
            this._root.destructor();
        }
        this._segment.refresh();
        return this._render(this._segment);
    };

    JetView.prototype.render = function render(root, url, parent) {
        var _this4 = this;

        if (typeof url === "string") {
            url = new Route(url, 0);
        }
        this._segment = url;
        this._parent = parent;
        this._init_url_data();
        root = root || document.body;
        var _container = typeof root === "string" ? this.webix.toNode(root) : root;
        if (this._container !== _container) {
            this._container = _container;
            return this._render(url);
        } else {
            return this._urlChange().then(function () {
                return _this4.getRoot();
            });
        }
    };

    JetView.prototype._render = function _render(url) {
        var _this5 = this;

        var config = this.config();
        if (config.then) {
            return config.then(function (cfg) {
                return _this5._render_final(cfg, url);
            });
        } else {
            return this._render_final(config, url);
        }
    };

    JetView.prototype._render_final = function _render_final(config, url) {
        var _this6 = this;

        // get previous view in the same slot
        var slot = null;
        var container = null;
        var show = false;
        if (!this._container.tagName) {
            slot = this._container;
            if (slot.popup) {
                container = document.body;
                show = true;
            } else {
                container = this.webix.$$(slot.id);
            }
        } else {
            container = this._container;
        }
        // view already destroyed
        if (!this.app || !container) {
            return Promise.reject(null);
        }
        var response = void 0;
        var current = this._segment.current();
        // using wrapper object, so ui can be changed from app:render event
        var result = { ui: {} };
        this.app.copyConfig(config, result.ui, this._subs);
        this.app.callEvent("app:render", [this, url, result]);
        result.ui.$scope = this;
        /* destroy old HTML attached views before creating new one */
        if (!slot && current.isNew && current.view) {
            current.view.destructor();
        }
        try {
            // special handling for adding inside of multiview - preserve old id
            if (slot && !show) {
                var oldui = container;
                var parent = oldui.getParentView();
                if (parent && parent.name === "multiview" && !result.ui.id) {
                    result.ui.id = oldui.config.id;
                }
            }
            this._root = this.app.webix.ui(result.ui, container);
            var asWin = this._root;
            // check for url added to ignore this.ui calls
            if (show && asWin.setPosition && !asWin.isVisible()) {
                asWin.show();
            }
            // check, if we are replacing some older view
            if (slot) {
                if (slot.view && slot.view !== this && slot.view !== this.app) {
                    slot.view.destructor();
                }
                slot.id = this._root.config.id;
                if (this.getParentView() || !this.app.app) slot.view = this;else {
                    // when we have subapp, set whole app as a view
                    // so on destruction, the whole app will be destroyed
                    slot.view = this.app;
                }
            }
            if (current.isNew) {
                current.view = this;
                current.isNew = false;
            }
            response = Promise.resolve(this._init(this._root, url)).then(function () {
                return _this6._urlChange().then(function () {
                    _this6._initUrl = null;
                    return _this6.ready(_this6._root, url.suburl());
                });
            });
        } catch (e) {
            response = Promise.reject(e);
        }
        return response.catch(function (err) {
            return _this6._initError(_this6, err);
        });
    };

    JetView.prototype._init = function _init(view, url) {
        return this.init(view, url.suburl());
    };

    JetView.prototype._urlChange = function _urlChange() {
        var _this7 = this;

        this.app.callEvent("app:urlchange", [this, this._segment]);
        var waits = [];
        for (var key in this._subs) {
            var frame = this._subs[key];
            var wait = this._renderFrameLock(key, frame, null);
            if (wait) {
                waits.push(wait);
            }
        }
        return Promise.all(waits).then(function () {
            return _this7.urlChange(_this7._root, _this7._segment.suburl());
        });
    };

    JetView.prototype._renderFrameLock = function _renderFrameLock(key, frame, path) {
        // if subview is not occupied by some rendering yet
        if (!frame.lock) {
            // retreive and store rendering end promise
            var lock = this._renderFrame(key, frame, path);
            if (lock) {
                // clear lock after frame rendering
                // as promise.finally is not supported by  Webix lesser than 6.2
                // using a more verbose notation
                frame.lock = lock.then(function () {
                    return frame.lock = null;
                }, function () {
                    return frame.lock = null;
                });
            }
        }
        // return rendering end promise
        return frame.lock;
    };

    JetView.prototype._renderFrame = function _renderFrame(key, frame, path) {
        var _this8 = this;

        //default route
        if (key === "default") {
            if (this._segment.next()) {
                // we have a next segment in url, render it
                return this._createSubView(frame, this._segment.shift());
            } else if (frame.view && frame.popup) {
                // there is no next segment, delete the existing sub-view
                frame.view.destructor();
                frame.view = null;
            }
        }
        //if new path provided, set it to the frame
        if (path !== null) {
            frame.url = path;
        }
        // in case of routed sub-view
        if (frame.route) {
            // we have a new path for sub-view
            if (path !== null) {
                return frame.route.show(path, frame.view).then(function () {
                    return _this8._createSubView(frame, frame.route);
                });
            }
            // do not trigger onChange for isolated sub-views
            if (frame.branch) {
                return;
            }
        }
        var view = frame.view;
        // if view doesn't exists yet, init it
        if (!view && frame.url) {
            if (typeof frame.url === "string") {
                // string, so we have isolated subview url
                frame.route = new Route(frame.url, 0);
                return this._createSubView(frame, frame.route);
            } else {
                // object, so we have an embeded subview
                if (typeof frame.url === "function" && !(view instanceof frame.url)) {
                    view = new frame.url(this.app, "");
                }
                if (!view) {
                    view = frame.url;
                }
            }
        }
        // trigger onChange for already existed view
        if (view) {
            return view.render(frame, frame.route || this._segment, this);
        }
    };

    JetView.prototype._initError = function _initError(view, err) {
        /*
            if view is destroyed, ignore any view related errors
        */
        if (this.app) {
            this.app.error("app:error:initview", [err, view]);
        }
        return true;
    };

    JetView.prototype._createSubView = function _createSubView(sub, suburl) {
        var _this9 = this;

        return this.app.createFromURL(suburl.current()).then(function (view) {
            return view.render(sub, suburl, _this9);
        });
    };

    JetView.prototype._destroyKids = function _destroyKids() {
        // destroy child views
        var uis = this._children;
        for (var i = uis.length - 1; i >= 0; i--) {
            if (uis[i] && uis[i].destructor) {
                uis[i].destructor();
            }
        }
        // reset vars for better GC processing
        this._children = [];
    };

    return JetView;
}(JetBase);

// wrapper for raw objects and Jet 1.x structs


var JetViewRaw = function (_JetView) {
    _inherits(JetViewRaw, _JetView);

    function JetViewRaw(app, config) {
        _classCallCheck(this, JetViewRaw);

        var _this10 = _possibleConstructorReturn(this, _JetView.call(this, app, config));

        _this10._ui = config.ui;
        return _this10;
    }

    JetViewRaw.prototype.config = function config() {
        return this._ui;
    };

    return JetViewRaw;
}(JetView);

var SubRouter = function () {
    function SubRouter(cb, config, app) {
        _classCallCheck(this, SubRouter);

        this.path = "";
        this.app = app;
    }

    SubRouter.prototype.set = function set(path, config) {
        this.path = path;
        var a = this.app;
        a.app.getRouter().set(a._segment.append(this.path), { silent: true });
    };

    SubRouter.prototype.get = function get() {
        return this.path;
    };

    return SubRouter;
}();

var _once = true;

var JetAppBase = function (_JetBase2) {
    _inherits(JetAppBase, _JetBase2);

    function JetAppBase(config) {
        _classCallCheck(this, JetAppBase);

        var webix = (config || {}).webix || window.webix;

        // init config
        var _this11 = _possibleConstructorReturn(this, _JetBase2.call(this, webix));

        _this11.config = _this11.webix.extend({
            name: "App",
            version: "1.0",
            start: "/home"
        }, config, true);
        _this11.app = _this11.config.app;
        _this11.ready = Promise.resolve();
        _this11._services = {};
        _this11.webix.extend(_this11, _this11.webix.EventSystem);
        return _this11;
    }

    JetAppBase.prototype.getUrl = function getUrl() {
        return this._subSegment.suburl();
    };

    JetAppBase.prototype.getUrlString = function getUrlString() {
        return this._subSegment.toString();
    };

    JetAppBase.prototype.getService = function getService(name) {
        var obj = this._services[name];
        if (typeof obj === "function") {
            obj = this._services[name] = obj(this);
        }
        return obj;
    };

    JetAppBase.prototype.setService = function setService(name, handler) {
        this._services[name] = handler;
    };

    JetAppBase.prototype.destructor = function destructor() {
        this.getSubView().destructor();
        _JetBase2.prototype.destructor.call(this);
    };
    // copy object and collect extra handlers


    JetAppBase.prototype.copyConfig = function copyConfig(obj, target, config) {
        // raw ui config
        if (obj instanceof JetBase || typeof obj === "function" && obj.prototype instanceof JetBase) {
            obj = { $subview: obj };
        }
        // subview placeholder
        if (typeof obj.$subview != "undefined") {
            return this.addSubView(obj, target, config);
        }
        // process sub-properties
        target = target || (obj instanceof Array ? [] : {});
        for (var method in obj) {
            var point = obj[method];
            // view class
            if (typeof point === "function" && point.prototype instanceof JetBase) {
                point = { $subview: point };
            }
            if (point && (typeof point === "undefined" ? "undefined" : _typeof(point)) === "object" && !(point instanceof this.webix.DataCollection) && !(point instanceof RegExp)) {
                if (point instanceof Date) {
                    target[method] = new Date(point);
                } else {
                    var copy = this.copyConfig(point, point instanceof Array ? [] : {}, config);
                    if (copy !== null) {
                        target[method] = copy;
                    }
                }
            } else {
                target[method] = point;
            }
        }
        return target;
    };

    JetAppBase.prototype.getRouter = function getRouter() {
        return this.$router;
    };

    JetAppBase.prototype.clickHandler = function clickHandler(e, target) {
        if (e) {
            target = target || e.target || e.srcElement;
            if (target && target.getAttribute) {
                var trigger = target.getAttribute("trigger");
                if (trigger) {
                    this._forView(target, function (view) {
                        return view.app.trigger(trigger);
                    });
                    e.cancelBubble = true;
                    return e.preventDefault();
                }
                var route = target.getAttribute("route");
                if (route) {
                    this._forView(target, function (view) {
                        return view.show(route);
                    });
                    e.cancelBubble = true;
                    return e.preventDefault();
                }
            }
        }
        var parent = target.parentNode;
        if (parent) {
            this.clickHandler(e, parent);
        }
    };

    JetAppBase.prototype.getRoot = function getRoot() {
        return this.getSubView().getRoot();
    };

    JetAppBase.prototype.refresh = function refresh() {
        var _this12 = this;

        if (!this._subSegment) {
            return Promise.resolve(null);
        }
        return this.getSubView().refresh().then(function (view) {
            _this12.callEvent("app:route", [_this12.getUrl()]);
            return view;
        });
    };

    JetAppBase.prototype.loadView = function loadView(url) {
        var _this13 = this;

        var views = this.config.views;
        var result = null;
        if (url === "") {
            return Promise.resolve(this._loadError("", new Error("Webix Jet: Empty url segment")));
        }
        try {
            if (views) {
                if (typeof views === "function") {
                    // custom loading strategy
                    result = views(url);
                } else {
                    // predefined hash
                    result = views[url];
                }
                if (typeof result === "string") {
                    url = result;
                    result = null;
                }
            }
            if (!result) {
                if (url === "_blank") {
                    result = {};
                } else {
                    result = this._loadViewDynamic(url);
                }
            }
        } catch (e) {
            result = this._loadError(url, e);
        }
        // custom handler can return view or its promise
        if (!result.then) {
            result = Promise.resolve(result);
        }
        // set error handler
        result = result.then(function (module) {
            return module.__esModule ? module.default : module;
        }).catch(function (err) {
            return _this13._loadError(url, err);
        });
        return result;
    };

    JetAppBase.prototype._forView = function _forView(target, handler) {
        var view = this.webix.$$(target);
        if (view) {
            handler(view.$scope);
        }
    };

    JetAppBase.prototype._loadViewDynamic = function _loadViewDynamic(url) {
        return null;
    };

    JetAppBase.prototype.createFromURL = function createFromURL(chunk) {
        var _this14 = this;

        var view = void 0;
        if (chunk.isNew || !chunk.view) {
            view = this.loadView(chunk.page).then(function (ui) {
                return _this14.createView(ui, name);
            });
        } else {
            view = Promise.resolve(chunk.view);
        }
        return view;
    };

    JetAppBase.prototype.createView = function createView(ui, name) {
        var obj = void 0;
        if (typeof ui === "function") {
            if (ui.prototype instanceof JetAppBase) {
                // UI class
                return new ui({ app: this, name: name, router: SubRouter });
            } else if (ui.prototype instanceof JetBase) {
                // UI class
                return new ui(this, { name: name });
            } else {
                // UI factory functions
                ui = ui(this);
            }
        }
        if (ui instanceof JetBase) {
            obj = ui;
        } else {
            // UI object
            obj = new JetViewRaw(this, { name: name, ui: ui });
        }
        return obj;
    };
    // show view path


    JetAppBase.prototype.show = function show(url) {
        return this.render(this._container, url || this.config.start);
    };
    // event helpers


    JetAppBase.prototype.trigger = function trigger(name) {
        for (var _len = arguments.length, rest = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
            rest[_key - 1] = arguments[_key];
        }

        this.apply(name, rest);
    };

    JetAppBase.prototype.apply = function apply(name, data) {
        this.callEvent(name, data);
    };

    JetAppBase.prototype.action = function action(name) {
        return this.webix.bind(function () {
            for (var _len2 = arguments.length, rest = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
                rest[_key2] = arguments[_key2];
            }

            this.apply(name, rest);
        }, this);
    };

    JetAppBase.prototype.on = function on(name, handler) {
        this.attachEvent(name, handler);
    };

    JetAppBase.prototype.use = function use(plugin, config) {
        plugin(this, null, config);
    };

    JetAppBase.prototype.error = function error(name, er) {
        this.callEvent(name, er);
        this.callEvent("app:error", er);
        /* tslint:disable */
        if (this.config.debug) {
            for (var i = 0; i < er.length; i++) {
                console.error(er[i]);
                if (er[i] instanceof Error) {
                    var text = er[i].message;
                    if (text.indexOf("Module build failed") === 0) {
                        text = text.replace(/\x1b\[[0-9;]*m/g, "");
                        document.body.innerHTML = "<pre style='font-size:16px; background-color: #ec6873; color: #000; padding:10px;'>" + text + "</pre>";
                    } else {
                        text += "<br><br>Check console for more details";
                        this.webix.message({ type: "error", text: text, expire: -1 });
                    }
                }
            }
            debugger;
        }
        /* tslint:enable */
    };
    // renders top view


    JetAppBase.prototype.render = function render(root, url, parent) {
        var _this15 = this;

        this._container = typeof root === "string" ? this.webix.toNode(root) : root || document.body;
        var firstInit = !this.$router;
        var path = null;
        if (firstInit) {
            if (_once && "tagName" in this._container) {
                this.webix.event(document.body, "click", function (e) {
                    return _this15.clickHandler(e);
                });
                _once = false;
            }
            if (typeof url === "string") {
                url = new Route(url, 0);
            }
            this._subSegment = this._first_start(url);
            this._subSegment.route.linkRouter = true;
        } else {
            if (typeof url === "string") {
                path = url;
            } else {
                if (this.app) {
                    path = url.split().route.path || this.config.start;
                } else {
                    path = url.toString();
                }
            }
        }
        var top = this.getSubView();
        var segment = this._subSegment;
        var ready = segment.show(path, top).then(function () {
            return _this15.createFromURL(segment.current());
        }).then(function (view) {
            return view.render(root, segment);
        }).then(function (base) {
            _this15.$router.set(segment.route.path, { silent: true });
            _this15.callEvent("app:route", [_this15.getUrl()]);
            return base;
        });
        this.ready = this.ready.then(function () {
            return ready;
        });
        return ready;
    };

    JetAppBase.prototype.getSubView = function getSubView() {
        if (this._subSegment) {
            var view = this._subSegment.current().view;
            if (view) return view;
        }
        return new JetView(this, {});
    };

    JetAppBase.prototype._first_start = function _first_start(route) {
        var _this16 = this;

        this._segment = route;
        var cb = function cb(a) {
            return setTimeout(function () {
                _this16.show(a).catch(function (e) {
                    if (!(e instanceof NavigationBlocked)) throw e;
                });
            }, 1);
        };
        this.$router = new this.config.router(cb, this.config, this);
        // start animation for top-level app
        if (this._container === document.body && this.config.animation !== false) {
            var node = this._container;
            this.webix.html.addCss(node, "webixappstart");
            setTimeout(function () {
                _this16.webix.html.removeCss(node, "webixappstart");
                _this16.webix.html.addCss(node, "webixapp");
            }, 10);
        }
        if (!route) {
            // if no url defined, check router first
            var urlString = this.$router.get();
            if (!urlString) {
                urlString = this.config.start;
                this.$router.set(urlString, { silent: true });
            }
            route = new Route(urlString, 0);
        } else if (this.app) {
            route.current().view = this;
            if (route.next()) {
                route.refresh();
                route = route.split();
            } else {
                route = new Route(this.config.start, 0);
            }
        }
        return route;
    };
    // error during view resolving


    JetAppBase.prototype._loadError = function _loadError(url, err) {
        this.error("app:error:resolve", [err, url]);
        return { template: " " };
    };

    JetAppBase.prototype.addSubView = function addSubView(obj, target, config) {
        var url = obj.$subview !== true ? obj.$subview : null;
        var name = obj.name || (url ? this.webix.uid() : "default");
        target.id = obj.id || "s" + this.webix.uid();
        var view = config[name] = {
            id: target.id,
            url: url,
            branch: obj.branch,
            popup: obj.popup
        };
        return view.popup ? null : target;
    };

    return JetAppBase;
}(JetBase);

var HashRouter = function () {
    function HashRouter(cb, config) {
        var _this17 = this;

        _classCallCheck(this, HashRouter);

        this.config = config || {};
        this._detectPrefix();
        this.cb = cb;
        window.onpopstate = function () {
            return _this17.cb(_this17.get());
        };
    }

    HashRouter.prototype.set = function set(path, config) {
        var _this18 = this;

        if (this.config.routes) {
            var compare = path.split("?", 2);
            for (var key in this.config.routes) {
                if (this.config.routes[key] === compare[0]) {
                    path = key + (compare.length > 1 ? "?" + compare[1] : "");
                    break;
                }
            }
        }
        if (this.get() !== path) {
            window.history.pushState(null, null, this.prefix + this.sufix + path);
        }
        if (!config || !config.silent) {
            setTimeout(function () {
                return _this18.cb(path);
            }, 1);
        }
    };

    HashRouter.prototype.get = function get() {
        var path = this._getRaw().replace(this.prefix, "").replace(this.sufix, "");
        path = path !== "/" && path !== "#" ? path : "";
        if (this.config.routes) {
            var compare = path.split("?", 2);
            var key = this.config.routes[compare[0]];
            if (key) {
                path = key + (compare.length > 1 ? "?" + compare[1] : "");
            }
        }
        return path;
    };

    HashRouter.prototype._detectPrefix = function _detectPrefix() {
        // use "#!" for backward compatibility
        var sufix = this.config.routerPrefix;
        this.sufix = "#" + (typeof sufix === "undefined" ? "!" : sufix);
        this.prefix = document.location.href.split("#", 2)[0];
    };

    HashRouter.prototype._getRaw = function _getRaw() {
        return document.location.href;
    };

    return HashRouter;
}();

var isPatched = false;
function patch(w) {
    if (isPatched || !w) {
        return;
    }
    isPatched = true;
    // custom promise for IE8
    var win = window;
    if (!win.Promise) {
        win.Promise = w.promise;
    }
    var version = w.version.split(".");
    // will be fixed in webix 5.3
    if (version[0] * 10 + version[1] * 1 < 53) {
        w.ui.freeze = function (handler) {
            // disabled because webix jet 5.0 can't handle resize of scrollview correctly
            // w.ui.$freeze = true;
            var res = handler();
            if (res && res.then) {
                res.then(function (some) {
                    w.ui.$freeze = false;
                    w.ui.resize();
                    return some;
                });
            } else {
                w.ui.$freeze = false;
                w.ui.resize();
            }
            return res;
        };
    }
    // adding views as classes
    var baseAdd = w.ui.baselayout.prototype.addView;
    var baseRemove = w.ui.baselayout.prototype.removeView;
    var config = {
        addView: function addView(view, index) {
            var _this19 = this;

            // trigger logic only for widgets inside of jet-view
            // ignore case when addView used with already initialized widget
            if (this.$scope && this.$scope.webixJet && !view.queryView) {
                var _ret = function () {
                    var jview = _this19.$scope;
                    var subs = {};
                    view = jview.app.copyConfig(view, {}, subs);
                    baseAdd.apply(_this19, [view, index]);

                    var _loop = function _loop(key) {
                        jview._renderFrame(key, subs[key], null).then(function () {
                            jview._subs[key] = subs[key];
                        });
                    };

                    for (var key in subs) {
                        _loop(key);
                    }
                    return {
                        v: view.id
                    };
                }();

                if ((typeof _ret === "undefined" ? "undefined" : _typeof(_ret)) === "object") return _ret.v;
            } else {
                return baseAdd.apply(this, arguments);
            }
        },
        removeView: function removeView() {
            baseRemove.apply(this, arguments);
            if (this.$scope && this.$scope.webixJet) {
                var subs = this.$scope._subs;
                // check all sub-views, destroy and clean the removed one
                for (var key in subs) {
                    var test = subs[key];
                    if (!w.$$(test.id)) {
                        test.view.destructor();
                        delete subs[key];
                    }
                }
            }
        }
    };
    w.extend(w.ui.layout.prototype, config, true);
    w.extend(w.ui.baselayout.prototype, config, true);
    // wrapper for using Jet Apps as views
    w.protoUI({
        name: "jetapp",
        $init: function $init(cfg) {
            this.$app = new this.app(cfg);
            var id = w.uid().toString();
            cfg.body = { id: id };
            this.$ready.push(function () {
                this.$app.render({ id: id });
            });
            for (var key in this.$app) {
                var origin = this.$app[key];
                if (typeof origin === "function" && !this[key]) {
                    this[key] = origin.bind(this.$app);
                }
            }
        }
    }, w.ui.proxy);
}

var JetApp = function (_JetAppBase) {
    _inherits(JetApp, _JetAppBase);

    function JetApp(config) {
        _classCallCheck(this, JetApp);

        config.router = config.router || HashRouter;

        var _this20 = _possibleConstructorReturn(this, _JetAppBase.call(this, config));

        patch(_this20.webix);
        return _this20;
    }

    JetApp.prototype._loadViewDynamic = function _loadViewDynamic(url) {
        url = url.replace(/\./g, "/");
        return __webpack_require__(34)("./" + url);
    };

    return JetApp;
}(JetAppBase);

var StoreRouter = function () {
    function StoreRouter(cb, config, app) {
        _classCallCheck(this, StoreRouter);

        this.storage = config.storage || app.webix.storage.session;
        this.name = config.storeName || config.id + ":route";
        this.cb = cb;
    }

    StoreRouter.prototype.set = function set(path, config) {
        var _this21 = this;

        this.storage.put(this.name, path);
        if (!config || !config.silent) {
            setTimeout(function () {
                return _this21.cb(path);
            }, 1);
        }
    };

    StoreRouter.prototype.get = function get() {
        return this.storage.get(this.name);
    };

    return StoreRouter;
}();

var UrlRouter = function (_HashRouter) {
    _inherits(UrlRouter, _HashRouter);

    function UrlRouter() {
        _classCallCheck(this, UrlRouter);

        return _possibleConstructorReturn(this, _HashRouter.apply(this, arguments));
    }

    UrlRouter.prototype._detectPrefix = function _detectPrefix() {
        this.prefix = "";
        this.sufix = this.config.routerPrefix || "";
    };

    UrlRouter.prototype._getRaw = function _getRaw() {
        return document.location.pathname + (document.location.search || "");
    };

    return UrlRouter;
}(HashRouter);

var EmptyRouter = function () {
    function EmptyRouter(cb, _$config) {
        _classCallCheck(this, EmptyRouter);

        this.path = "";
        this.cb = cb;
    }

    EmptyRouter.prototype.set = function set(path, config) {
        var _this23 = this;

        this.path = path;
        if (!config || !config.silent) {
            setTimeout(function () {
                return _this23.cb(path);
            }, 1);
        }
    };

    EmptyRouter.prototype.get = function get() {
        return this.path;
    };

    return EmptyRouter;
}();

function UnloadGuard(app, view, config) {
    view.on(app, "app:guard", function (_$url, point, promise) {
        if (point === view || point.contains(view)) {
            var res = config();
            if (res === false) {
                promise.confirm = Promise.reject(new NavigationBlocked());
            } else {
                promise.confirm = promise.confirm.then(function () {
                    return res;
                });
            }
        }
    });
}

//     (c) 2012-2018 Airbnb, Inc.

// var has = require('has');
function has(store, key) {
    return Object.prototype.hasOwnProperty.call(store, key);
}
// var forEach = require('for-each');
function forEach(obj, handler, context) {
    for (var key in obj) {
        if (has(obj, key)) {
            handler.call(context || obj, obj[key], key, obj);
        }
    }
}
// var trim = require('string.prototype.trim');
function trim(str) {
    return str.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, '');
}
// var warning = require('warning');
function warn(message) {
    message = 'Warning: ' + message;
    if (typeof console !== 'undefined') {
        console.error(message);
    }

    try {
        throw new Error(message);
    } catch (x) {}
}

var replace = String.prototype.replace;
var split = String.prototype.split;

// #### Pluralization methods
// The string that separates the different phrase possibilities.
var delimiter = '||||';

var russianPluralGroups = function russianPluralGroups(n) {
    var end = n % 10;
    if (n !== 11 && end === 1) {
        return 0;
    }
    if (2 <= end && end <= 4 && !(n >= 12 && n <= 14)) {
        return 1;
    }
    return 2;
};

// Mapping from pluralization group plural logic.
var pluralTypes = {
    arabic: function arabic(n) {
        // http://www.arabeyes.org/Plural_Forms
        if (n < 3) {
            return n;
        }
        var lastTwo = n % 100;
        if (lastTwo >= 3 && lastTwo <= 10) return 3;
        return lastTwo >= 11 ? 4 : 5;
    },
    bosnian_serbian: russianPluralGroups,
    chinese: function chinese() {
        return 0;
    },
    croatian: russianPluralGroups,
    french: function french(n) {
        return n > 1 ? 1 : 0;
    },
    german: function german(n) {
        return n !== 1 ? 1 : 0;
    },
    russian: russianPluralGroups,
    lithuanian: function lithuanian(n) {
        if (n % 10 === 1 && n % 100 !== 11) {
            return 0;
        }
        return n % 10 >= 2 && n % 10 <= 9 && (n % 100 < 11 || n % 100 > 19) ? 1 : 2;
    },
    czech: function czech(n) {
        if (n === 1) {
            return 0;
        }
        return n >= 2 && n <= 4 ? 1 : 2;
    },
    polish: function polish(n) {
        if (n === 1) {
            return 0;
        }
        var end = n % 10;
        return 2 <= end && end <= 4 && (n % 100 < 10 || n % 100 >= 20) ? 1 : 2;
    },
    icelandic: function icelandic(n) {
        return n % 10 !== 1 || n % 100 === 11 ? 1 : 0;
    },
    slovenian: function slovenian(n) {
        var lastTwo = n % 100;
        if (lastTwo === 1) {
            return 0;
        }
        if (lastTwo === 2) {
            return 1;
        }
        if (lastTwo === 3 || lastTwo === 4) {
            return 2;
        }
        return 3;
    }
};

// Mapping from pluralization group to individual language codes/locales.
// Will look up based on exact match, if not found and it's a locale will parse the locale
// for language code, and if that does not exist will default to 'en'
var pluralTypeToLanguages = {
    arabic: ['ar'],
    bosnian_serbian: ['bs-Latn-BA', 'bs-Cyrl-BA', 'srl-RS', 'sr-RS'],
    chinese: ['id', 'id-ID', 'ja', 'ko', 'ko-KR', 'lo', 'ms', 'th', 'th-TH', 'zh'],
    croatian: ['hr', 'hr-HR'],
    german: ['fa', 'da', 'de', 'en', 'es', 'fi', 'el', 'he', 'hi-IN', 'hu', 'hu-HU', 'it', 'nl', 'no', 'pt', 'sv', 'tr'],
    french: ['fr', 'tl', 'pt-br'],
    russian: ['ru', 'ru-RU'],
    lithuanian: ['lt'],
    czech: ['cs', 'cs-CZ', 'sk'],
    polish: ['pl'],
    icelandic: ['is'],
    slovenian: ['sl-SL']
};

function langToTypeMap(mapping) {
    var ret = {};
    forEach(mapping, function (langs, type) {
        forEach(langs, function (lang) {
            ret[lang] = type;
        });
    });
    return ret;
}

function pluralTypeName(locale) {
    var langToPluralType = langToTypeMap(pluralTypeToLanguages);
    return langToPluralType[locale] || langToPluralType[split.call(locale, /-/, 1)[0]] || langToPluralType.en;
}

function pluralTypeIndex(locale, count) {
    return pluralTypes[pluralTypeName(locale)](count);
}

function escape(token) {
    return token.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function constructTokenRegex(opts) {
    var prefix = opts && opts.prefix || '%{';
    var suffix = opts && opts.suffix || '}';

    if (prefix === delimiter || suffix === delimiter) {
        throw new RangeError('"' + delimiter + '" token is reserved for pluralization');
    }

    return new RegExp(escape(prefix) + '(.*?)' + escape(suffix), 'g');
}

var dollarRegex = /\$/g;
var dollarBillsYall = '$$';
var defaultTokenRegex = /%\{(.*?)\}/g;

// ### transformPhrase(phrase, substitutions, locale)
//
// Takes a phrase string and transforms it by choosing the correct
// plural form and interpolating it.
//
//     transformPhrase('Hello, %{name}!', {name: 'Spike'});
//     // "Hello, Spike!"
//
// The correct plural form is selected if substitutions.smart_count
// is set. You can pass in a number instead of an Object as `substitutions`
// as a shortcut for `smart_count`.
//
//     transformPhrase('%{smart_count} new messages |||| 1 new message', {smart_count: 1}, 'en');
//     // "1 new message"
//
//     transformPhrase('%{smart_count} new messages |||| 1 new message', {smart_count: 2}, 'en');
//     // "2 new messages"
//
//     transformPhrase('%{smart_count} new messages |||| 1 new message', 5, 'en');
//     // "5 new messages"
//
// You should pass in a third argument, the locale, to specify the correct plural type.
// It defaults to `'en'` with 2 plural forms.
function transformPhrase(phrase, substitutions, locale, tokenRegex) {
    if (typeof phrase !== 'string') {
        throw new TypeError('Polyglot.transformPhrase expects argument #1 to be string');
    }

    if (substitutions == null) {
        return phrase;
    }

    var result = phrase;
    var interpolationRegex = tokenRegex || defaultTokenRegex;

    // allow number as a pluralization shortcut
    var options = typeof substitutions === 'number' ? { smart_count: substitutions } : substitutions;

    // Select plural form: based on a phrase text that contains `n`
    // plural forms separated by `delimiter`, a `locale`, and a `substitutions.smart_count`,
    // choose the correct plural form. This is only done if `count` is set.
    if (options.smart_count != null && result) {
        var texts = split.call(result, delimiter);
        result = trim(texts[pluralTypeIndex(locale || 'en', options.smart_count)] || texts[0]);
    }

    // Interpolate: Creates a `RegExp` object for each interpolation placeholder.
    result = replace.call(result, interpolationRegex, function (expression, argument) {
        if (!has(options, argument) || options[argument] == null) {
            return expression;
        }
        // Ensure replacement value is escaped to prevent special $-prefixed regex replace tokens.
        return replace.call(options[argument], dollarRegex, dollarBillsYall);
    });

    return result;
}

// ### Polyglot class constructor
function Polyglot(options) {
    var opts = options || {};
    this.phrases = {};
    this.extend(opts.phrases || {});
    this.currentLocale = opts.locale || 'en';
    var allowMissing = opts.allowMissing ? transformPhrase : null;
    this.onMissingKey = typeof opts.onMissingKey === 'function' ? opts.onMissingKey : allowMissing;
    this.warn = opts.warn || warn;
    this.tokenRegex = constructTokenRegex(opts.interpolation);
}

// ### polyglot.locale([locale])
//
// Get or set locale. Internally, Polyglot only uses locale for pluralization.
Polyglot.prototype.locale = function (newLocale) {
    if (newLocale) this.currentLocale = newLocale;
    return this.currentLocale;
};

// ### polyglot.extend(phrases)
//
// Use `extend` to tell Polyglot how to translate a given key.
//
//     polyglot.extend({
//       "hello": "Hello",
//       "hello_name": "Hello, %{name}"
//     });
//
// The key can be any string.  Feel free to call `extend` multiple times;
// it will override any phrases with the same key, but leave existing phrases
// untouched.
//
// It is also possible to pass nested phrase objects, which get flattened
// into an object with the nested keys concatenated using dot notation.
//
//     polyglot.extend({
//       "nav": {
//         "hello": "Hello",
//         "hello_name": "Hello, %{name}",
//         "sidebar": {
//           "welcome": "Welcome"
//         }
//       }
//     });
//
//     console.log(polyglot.phrases);
//     // {
//     //   'nav.hello': 'Hello',
//     //   'nav.hello_name': 'Hello, %{name}',
//     //   'nav.sidebar.welcome': 'Welcome'
//     // }
//
// `extend` accepts an optional second argument, `prefix`, which can be used
// to prefix every key in the phrases object with some string, using dot
// notation.
//
//     polyglot.extend({
//       "hello": "Hello",
//       "hello_name": "Hello, %{name}"
//     }, "nav");
//
//     console.log(polyglot.phrases);
//     // {
//     //   'nav.hello': 'Hello',
//     //   'nav.hello_name': 'Hello, %{name}'
//     // }
//
// This feature is used internally to support nested phrase objects.
Polyglot.prototype.extend = function (morePhrases, prefix) {
    forEach(morePhrases, function (phrase, key) {
        var prefixedKey = prefix ? prefix + '.' + key : key;
        if ((typeof phrase === "undefined" ? "undefined" : _typeof(phrase)) === 'object') {
            this.extend(phrase, prefixedKey);
        } else {
            this.phrases[prefixedKey] = phrase;
        }
    }, this);
};

// ### polyglot.unset(phrases)
// Use `unset` to selectively remove keys from a polyglot instance.
//
//     polyglot.unset("some_key");
//     polyglot.unset({
//       "hello": "Hello",
//       "hello_name": "Hello, %{name}"
//     });
//
// The unset method can take either a string (for the key), or an object hash with
// the keys that you would like to unset.
Polyglot.prototype.unset = function (morePhrases, prefix) {
    if (typeof morePhrases === 'string') {
        delete this.phrases[morePhrases];
    } else {
        forEach(morePhrases, function (phrase, key) {
            var prefixedKey = prefix ? prefix + '.' + key : key;
            if ((typeof phrase === "undefined" ? "undefined" : _typeof(phrase)) === 'object') {
                this.unset(phrase, prefixedKey);
            } else {
                delete this.phrases[prefixedKey];
            }
        }, this);
    }
};

// ### polyglot.clear()
//
// Clears all phrases. Useful for special cases, such as freeing
// up memory if you have lots of phrases but no longer need to
// perform any translation. Also used internally by `replace`.
Polyglot.prototype.clear = function () {
    this.phrases = {};
};

// ### polyglot.replace(phrases)
//
// Completely replace the existing phrases with a new set of phrases.
// Normally, just use `extend` to add more phrases, but under certain
// circumstances, you may want to make sure no old phrases are lying around.
Polyglot.prototype.replace = function (newPhrases) {
    this.clear();
    this.extend(newPhrases);
};

// ### polyglot.t(key, options)
//
// The most-used method. Provide a key, and `t` will return the
// phrase.
//
//     polyglot.t("hello");
//     => "Hello"
//
// The phrase value is provided first by a call to `polyglot.extend()` or
// `polyglot.replace()`.
//
// Pass in an object as the second argument to perform interpolation.
//
//     polyglot.t("hello_name", {name: "Spike"});
//     => "Hello, Spike"
//
// If you like, you can provide a default value in case the phrase is missing.
// Use the special option key "_" to specify a default.
//
//     polyglot.t("i_like_to_write_in_language", {
//       _: "I like to write in %{language}.",
//       language: "JavaScript"
//     });
//     => "I like to write in JavaScript."
//
Polyglot.prototype.t = function (key, options) {
    var phrase, result;
    var opts = options == null ? {} : options;
    if (typeof this.phrases[key] === 'string') {
        phrase = this.phrases[key];
    } else if (typeof opts._ === 'string') {
        phrase = opts._;
    } else if (this.onMissingKey) {
        var onMissingKey = this.onMissingKey;
        result = onMissingKey(key, opts, this.currentLocale, this.tokenRegex);
    } else {
        this.warn('Missing translation for key: "' + key + '"');
        result = key;
    }
    if (typeof phrase === 'string') {
        result = transformPhrase(phrase, opts, this.currentLocale, this.tokenRegex);
    }
    return result;
};

// ### polyglot.has(key)
//
// Check if polyglot has a translation for given key
Polyglot.prototype.has = function (key) {
    return has(this.phrases, key);
};

// export transformPhrase
Polyglot.transformPhrase = function transform(phrase, substitutions, locale) {
    return transformPhrase(phrase, substitutions, locale);
};

var webixPolyglot = Polyglot;

function Locale(app, _view, config) {
    config = config || {};
    var storage = config.storage;
    var lang = storage ? storage.get("lang") || "en" : config.lang || "en";
    function setLangData(name, data, silent) {
        if (data.__esModule) {
            data = data.default;
        }
        var pconfig = { phrases: data };
        if (config.polyglot) {
            app.webix.extend(pconfig, config.polyglot);
        }
        var poly = service.polyglot = new webixPolyglot(pconfig);
        poly.locale(name);
        service._ = app.webix.bind(poly.t, poly);
        lang = name;
        if (storage) {
            storage.put("lang", lang);
        }
        if (config.webix) {
            var locName = config.webix[name];
            if (locName) {
                app.webix.i18n.setLocale(locName);
            }
        }
        if (!silent) {
            return app.refresh();
        }
        return Promise.resolve();
    }
    function getLang() {
        return lang;
    }
    function setLang(name, silent) {
        // ignore setLang if loading by path is disabled
        if (config.path === false) {
            return;
        }
        var path = (config.path ? config.path + "/" : "") + name;
        var data = __webpack_require__(39)("./" + path);
        setLangData(name, data, silent);
    }
    var service = {
        getLang: getLang, setLang: setLang, setLangData: setLangData, _: null, polyglot: null
    };
    app.setService("locale", service);
    setLang(lang, true);
}

function show(view, config, value) {
    if (config.urls) {
        value = config.urls[value] || value;
    } else if (config.param) {
        var _value;

        value = (_value = {}, _value[config.param] = value, _value);
    }
    view.show(value);
}
function Menu(app, view, config) {
    var frame = view.getSubViewInfo().parent;
    var ui = view.$$(config.id || config);
    var silent = false;
    ui.attachEvent("onchange", function () {
        if (!silent) {
            show(frame, config, this.getValue());
        }
    });
    ui.attachEvent("onafterselect", function () {
        if (!silent) {
            var id = null;
            if (ui.setValue) {
                id = this.getValue();
            } else if (ui.getSelectedId) {
                id = ui.getSelectedId();
            }
            show(frame, config, id);
        }
    });
    view.on(app, "app:route", function () {
        var name = "";
        if (config.param) {
            name = view.getParam(config.param, true);
        } else {
            var segment = frame.getUrl()[1];
            if (segment) {
                name = segment.page;
            }
        }
        if (name) {
            silent = true;
            if (ui.setValue && ui.getValue() !== name) {
                ui.setValue(name);
            } else if (ui.select && ui.exists(name) && ui.getSelectedId() !== name) {
                ui.select(name);
            }
            silent = false;
        }
    });
}

var baseicons = {
    good: "check",
    error: "warning",
    saving: "refresh fa-spin"
};
var basetext = {
    good: "Ok",
    error: "Error",
    saving: "Connecting..."
};
function Status(app, view, config) {
    var status = "good";
    var count = 0;
    var iserror = false;
    var expireDelay = config.expire;
    if (!expireDelay && expireDelay !== false) {
        expireDelay = 2000;
    }
    var texts = config.texts || basetext;
    var icons = config.icons || baseicons;
    if (typeof config === "string") {
        config = { target: config };
    }
    function refresh(content) {
        var area = view.$$(config.target);
        if (area) {
            if (!content) {
                content = "<div class='status_" + status + "'><span class='webix_icon fa-" + icons[status] + "'></span> " + texts[status] + "</div>";
            }
            area.setHTML(content);
        }
    }
    function success() {
        count--;
        setStatus("good");
    }
    function fail(err) {
        count--;
        setStatus("error", err);
    }
    function start(promise) {
        count++;
        setStatus("saving");
        if (promise && promise.then) {
            promise.then(success, fail);
        }
    }
    function getStatus() {
        return status;
    }
    function hideStatus() {
        if (count === 0) {
            refresh(" ");
        }
    }
    function setStatus(mode, err) {
        if (count < 0) {
            count = 0;
        }
        if (mode === "saving") {
            status = "saving";
            refresh();
        } else {
            iserror = mode === "error";
            if (count === 0) {
                status = iserror ? "error" : "good";
                if (iserror) {
                    app.error("app:error:server", [err.responseText || err]);
                } else {
                    if (expireDelay) {
                        setTimeout(hideStatus, expireDelay);
                    }
                }
                refresh();
            }
        }
    }
    function track(data) {
        var dp = app.webix.dp(data);
        if (dp) {
            view.on(dp, "onAfterDataSend", start);
            view.on(dp, "onAfterSaveError", function (_id, _obj, response) {
                return fail(response);
            });
            view.on(dp, "onAfterSave", success);
        }
    }
    app.setService("status", {
        getStatus: getStatus,
        setStatus: setStatus,
        track: track
    });
    if (config.remote) {
        view.on(app.webix, "onRemoteCall", start);
    }
    if (config.ajax) {
        view.on(app.webix, "onBeforeAjax", function (_mode, _url, _data, _request, _headers, _files, promise) {
            start(promise);
        });
    }
    if (config.data) {
        track(config.data);
    }
}

function Theme(app, _view, config) {
    config = config || {};
    var storage = config.storage;
    var theme = storage ? storage.get("theme") || "flat-default" : config.theme || "flat-default";
    var service = {
        getTheme: function getTheme() {
            return theme;
        },
        setTheme: function setTheme(name, silent) {
            var parts = name.split("-");
            var links = document.getElementsByTagName("link");
            for (var i = 0; i < links.length; i++) {
                var lname = links[i].getAttribute("title");
                if (lname) {
                    if (lname === name || lname === parts[0]) {
                        links[i].disabled = false;
                    } else {
                        links[i].disabled = true;
                    }
                }
            }
            app.webix.skin.set(parts[0]);
            // remove old css
            app.webix.html.removeCss(document.body, "theme-" + theme);
            // add new css
            app.webix.html.addCss(document.body, "theme-" + name);
            theme = name;
            if (storage) {
                storage.put("theme", name);
            }
            if (!silent) {
                app.refresh();
            }
        }
    };
    app.setService("theme", service);
    service.setTheme(theme, true);
}

function copyParams(data, url, route) {
    for (var i = 0; i < route.length; i++) {
        data[route[i]] = url[i + 1] ? url[i + 1].page : "";
    }
}
function UrlParam(app, view, config) {
    var route = config.route || config;
    var data = {};
    view.on(app, "app:urlchange", function (subview, segment) {
        if (view === subview) {
            copyParams(data, segment.suburl(), route);
            segment.size(route.length + 1);
        }
    });
    var os = view.setParam;
    var og = view.getParam;
    view.setParam = function (name, value, show) {
        var index = route.indexOf(name);
        if (index >= 0) {
            data[name] = value;
            this._segment.update("", value, index + 1);
            if (show) {
                return view.show(null);
            }
        } else {
            return os.call(this, name, value, show);
        }
    };
    view.getParam = function (key, mode) {
        var val = data[key];
        if (typeof val !== "undefined") {
            return val;
        }
        return og.call(this, key, mode);
    };
    copyParams(data, view.getUrl(), route);
}

function User(app, _view, config) {
    config = config || {};
    var login = config.login || "/login";
    var logout = config.logout || "/logout";
    var afterLogin = config.afterLogin || app.config.start;
    var afterLogout = config.afterLogout || "/login";
    var ping = config.ping || 5 * 60 * 1000;
    var model = config.model;
    var user = config.user;
    var service = {
        getUser: function getUser() {
            return user;
        },
        getStatus: function getStatus(server) {
            if (!server) {
                return user !== null;
            }
            return model.status().catch(function () {
                return null;
            }).then(function (data) {
                user = data;
            });
        },
        login: function login(name, pass) {
            return model.login(name, pass).then(function (data) {
                user = data;
                if (!data) {
                    throw new Error("Access denied");
                }
                app.callEvent("app:user:login", [user]);
                app.show(afterLogin);
            });
        },
        logout: function logout() {
            user = null;
            return model.logout().then(function (res) {
                app.callEvent("app:user:logout", []);
                return res;
            });
        }
    };
    function canNavigate(url, obj) {
        if (url === logout) {
            service.logout();
            obj.redirect = afterLogout;
        } else if (url !== login && !service.getStatus()) {
            obj.redirect = login;
        }
    }
    app.setService("user", service);
    app.attachEvent("app:guard", function (url, _$root, obj) {
        if (config.public && config.public(url)) {
            return true;
        }
        if (typeof user === "undefined") {
            obj.confirm = service.getStatus(true).then(function () {
                return canNavigate(url, obj);
            });
        }
        return canNavigate(url, obj);
    });
    if (ping) {
        setInterval(function () {
            return service.getStatus(true);
        }, ping);
    }
}

/*
MIT License
Copyright (c) 2019 XB Software
*/
var webix = window.webix;
if (webix) {
    patch(webix);
}
var plugins = {
    UnloadGuard: UnloadGuard, Locale: Locale, Menu: Menu, Theme: Theme, User: User, Status: Status, UrlParam: UrlParam
};
var errors = { NavigationBlocked: NavigationBlocked };
var w = window;
if (!w.Promise) {
    w.Promise = w.webix.promise;
}


//# sourceMappingURL=jet.js.map

/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ExternalView", function() { return ExternalView; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_webix_jet__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_packages__ = __webpack_require__(23);
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }




var STATUS_INSTALLED = 3;

var ExternalView = function (_JetView) {
    _inherits(ExternalView, _JetView);

    function ExternalView(app, name, targetUrl, requiredPackages) {
        _classCallCheck(this, ExternalView);

        var _this = _possibleConstructorReturn(this, _JetView.call(this, app, name));

        _this.targetUrl = targetUrl || "/";
        _this.requiredPackages = requiredPackages || {}; // required packages as name: git_url pairs
        return _this;
    }

    ExternalView.prototype.config = function config() {
        var iframe = {
            view: "iframe",
            localId: "iframe-external",
            on: {
                onAfterLoad: function onAfterLoad() {
                    if (this.hideProgress) {
                        this.hideProgress();
                    }
                    this.enable();
                }
            }
        };

        var names = Object.keys(this.requiredPackages).join(", ");

        return {
            rows: [{
                localId: "install-packages",
                hidden: true,
                cols: [{
                    template: "<div style='width:auto;text-align:center'><h3>You need to install the following required packages: " + names + "<h3/></div>",
                    autoheight: true
                }, {
                    view: "button",
                    localId: "install_btn",
                    value: "Install required packages",
                    css: "webix_primary",
                    height: 50
                }, {
                    view: "button",
                    localId: "go_to_packages_btn",
                    value: "Go to packages and install them manually",
                    css: "webix_primary",
                    height: 50,
                    click: function click() {
                        this.$scope.show("/main/packages");
                    }
                }]
            }, iframe]
        };
    };

    ExternalView.prototype.installRequiredPackages = function installRequiredPackages() {
        var _this2 = this;

        var promises = Object.keys(this.requiredPackages).map(function (name) {
            // add by git url
            return __WEBPACK_IMPORTED_MODULE_1__services_packages__["a" /* packages */].add(null, _this2.requiredPackages[name]);
        });

        this.installButton.disable();
        Promise.all(promises).then(function () {
            webix.message({ type: "success", text: "All required packages installed successfully, page will be reloaded in 2 seconds" });
            setInterval(function () {
                return window.location.reload(true);
            }, 2000);
            _this2.installButton.enable();
        }).catch(function () {
            webix.message({ type: "error", text: "An error occurred, please try installing from packages for more details" });
        });
    };

    ExternalView.prototype.init = function init(view) {
        var _this3 = this;

        view.installPackageContainer = this.$$("install-packages");
        this.installButton = this.$$("install_btn");
        this.installButton.attachEvent("onItemClick", this.installRequiredPackages.bind(this));

        view.externalIframe = this.$$("iframe-external");
        webix.extend(view.externalIframe, webix.ProgressBar);
        view.externalIframe.disable();
        view.externalIframe.showProgress({ type: "icon" });
        view.externalIframe.load(this.targetUrl);

        // check which packages to install
        __WEBPACK_IMPORTED_MODULE_1__services_packages__["a" /* packages */].list().then(function (data) {
            var allPackages = data.json().packages;
            for (var _iterator = allPackages, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
                var _ref;

                if (_isArray) {
                    if (_i >= _iterator.length) break;
                    _ref = _iterator[_i++];
                } else {
                    _i = _iterator.next();
                    if (_i.done) break;
                    _ref = _i.value;
                }

                var p = _ref;

                var requiredPackage = _this3.requiredPackages[p.name];
                if (requiredPackage && p.status == STATUS_INSTALLED) {
                    delete _this3.requiredPackages[p.name];
                }
            }

            if (Object.keys(_this3.requiredPackages).length) {
                view.installPackageContainer.show();
                view.externalIframe.hide();
            } else {
                view.installPackageContainer.hide();
                view.externalIframe.show();
            }
        });
    };

    return ExternalView;
}(__WEBPACK_IMPORTED_MODULE_0_webix_jet__["b" /* JetView */]);

/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MAX_MSG_LEN", function() { return MAX_MSG_LEN; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LEVELS", function() { return LEVELS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "STATES", function() { return STATES; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TYPES", function() { return TYPES; });

var MAX_MSG_LEN = 100;
var LEVELS = {
    50: "CRITICAL",
    40: "ERROR",
    30: "WARNING",
    20: "INFO",
    15: "STDOUT",
    10: "DEBUG"
};

var STATES = ['CLOSED', 'NEW', 'OPEN', 'REOPEN'];

var TYPES = ['BUG', 'QUESTION', 'EVENT_SYSTEM', 'EVENT_MONITOR', 'EVENT_OPERATOR'];

/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export dateFormat */
/* unused harmony export webixDateFormatter */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return dateFormatter; });
var dateFormat = "%Y-%m-%d %G:%i:%s";

var webixDateFormatter = webix.Date.dateToStr(dateFormat);

var dateFormatter = function dateFormatter(value) {
    // format epoch timestamps
    if (value instanceof String) {
        value = parseInt(value);
    }

    return webixDateFormatter(new Date(value * 1000));
};

/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Service; });
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ajax = webix.ajax().headers({ "Content-type": "application/json" });

var Service = function () {
    function Service(baseUrl) {
        _classCallCheck(this, Service);

        this.baseUrl = baseUrl;
    }

    Service.prototype.joinUrl = function joinUrl(url) {
        if (this.baseUrl) {
            return this.baseUrl + "/" + url;
        }
        return url;
    };

    Service.prototype.call = function call(method, url, args) {
        method = method.toLowerCase();
        url = this.joinUrl(url);

        if (args) {
            args = { args: args };
        } else {
            args = {};
        }

        if (method === "get") {
            return ajax.get(url, args);
        } else if (method == "post") {
            return ajax.post(url, args);
        }

        throw ValueError(method + " is not supported");
    };

    Service.prototype.getCall = function getCall(url, args) {
        return this.call("get", url, args);
    };

    Service.prototype.postCall = function postCall(url, args) {
        return this.call("post", url, args);
    };

    return Service;
}();

/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return health; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__common_api__ = __webpack_require__(4);
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }



var BASE_URL = "/zerobot/admin/actors/health";

var HealthService = function (_Service) {
    _inherits(HealthService, _Service);

    function HealthService() {
        _classCallCheck(this, HealthService);

        return _possibleConstructorReturn(this, _Service.call(this, BASE_URL));
    }

    HealthService.prototype.getDiskSpace = function getDiskSpace() {
        return this.getCall("get_disk_space");
    };

    HealthService.prototype.getHealth = function getHealth() {
        return this.getCall("health");
    };

    HealthService.prototype.getIdentity = function getIdentity() {
        return this.getCall("get_identity");
    };

    HealthService.prototype.getNetworkInfo = function getNetworkInfo() {
        return this.getCall("network_info");
    };

    HealthService.prototype.getJsxVersion = function getJsxVersion() {
        return this.getCall("jsx_version");
    };

    HealthService.prototype.getRunningProcesses = function getRunningProcesses() {
        return this.getCall("get_running_processes");
    };

    HealthService.prototype.getRunningPorts = function getRunningPorts() {
        return this.getCall("get_running_ports");
    };

    return HealthService;
}(__WEBPACK_IMPORTED_MODULE_0__common_api__["a" /* Service */]);

var health = new HealthService();

/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_webix_jet__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__common_colors__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__data__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__common_formatters__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__services_alerts__ = __webpack_require__(36);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__alert__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__common_filters__ = __webpack_require__(22);
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }











var AlertsView = function (_JetView) {
    _inherits(AlertsView, _JetView);

    function AlertsView() {
        _classCallCheck(this, AlertsView);

        return _possibleConstructorReturn(this, _JetView.apply(this, arguments));
    }

    AlertsView.prototype.config = function config() {
        var view = {
            rows: [{
                view: "datatable",
                id: "alerts_table",
                resizeColumn: true,
                select: true,
                multiselect: true,
                scroll: "xy",
                css: "webix_header_border webix_data_border",
                columns: [{
                    id: "index",
                    header: "#",
                    sort: "int",
                    autowidth: true
                }, {
                    id: "alert_type",
                    sort: "int",
                    format: function format(value) {
                        return __WEBPACK_IMPORTED_MODULE_2__data__["TYPES"][value];
                    },
                    width: 150,
                    header: ["Type", {
                        content: "selectFilter",
                        options: Object(__WEBPACK_IMPORTED_MODULE_6__common_filters__["a" /* createFilterOptions */])(__WEBPACK_IMPORTED_MODULE_2__data__["TYPES"])
                    }]
                }, {
                    id: "count",
                    header: "Count",
                    sort: "int"
                }, {
                    id: "status",
                    sort: "int",
                    format: function format(value) {
                        return __WEBPACK_IMPORTED_MODULE_2__data__["STATES"][value];
                    },
                    header: ["Status", {
                        content: "selectFilter",
                        options: Object(__WEBPACK_IMPORTED_MODULE_6__common_filters__["a" /* createFilterOptions */])(__WEBPACK_IMPORTED_MODULE_2__data__["STATES"])
                    }]
                }, {
                    id: "level",
                    sort: "int",
                    format: function format(value) {
                        return __WEBPACK_IMPORTED_MODULE_2__data__["LEVELS"][value];
                    },
                    header: ["Level", {
                        content: "selectFilter",
                        options: Object(__WEBPACK_IMPORTED_MODULE_6__common_filters__["a" /* createFilterOptions */])(__WEBPACK_IMPORTED_MODULE_2__data__["LEVELS"])
                    }]
                }, {
                    id: "cat",
                    header: ["Category", {
                        content: "textFilter"
                    }],
                    sort: "string"
                }, {
                    id: "time_first",
                    header: "First time",
                    sort: "date",
                    format: __WEBPACK_IMPORTED_MODULE_3__common_formatters__["a" /* dateFormatter */],
                    width: 200
                }, {
                    id: "time_last",
                    header: "Last time",
                    sort: "date",
                    format: __WEBPACK_IMPORTED_MODULE_3__common_formatters__["a" /* dateFormatter */],
                    width: 200
                }, {
                    id: "message",
                    header: ["Message", {
                        content: "textFilter"
                    }],
                    sort: "str",
                    fillspace: true,
                    format: function format(value) {
                        if (value.length > __WEBPACK_IMPORTED_MODULE_2__data__["MAX_MSG_LEN"]) {
                            value = value.substr(0, __WEBPACK_IMPORTED_MODULE_2__data__["MAX_MSG_LEN"]) + '...';
                        }
                        return __WEBPACK_IMPORTED_MODULE_1__common_colors__["a" /* ansiUp */].ansi_to_html(value);
                    }
                }],
                autoConfig: true,
                // url:{
                //     $proxy:true,
                //     load: function(view, params){
                //         let data = webix.ajax("/zerobot/alerta/actors/alerta/list_alerts");
                //         return data;
                //     },
                // }
                scheme: {
                    $init: function $init(obj) {
                        obj.index = this.count();
                    }
                }
            }, {
                $subview: true,
                popup: true
            }]
        };

        return view;
    };

    AlertsView.prototype.deleteItem = function deleteItem(objects) {
        var self = this;

        var items = [],
            ids = [],
            indexes = [];

        for (var _iterator = objects, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
            var _ref;

            if (_isArray) {
                if (_i >= _iterator.length) break;
                _ref = _iterator[_i++];
            } else {
                _i = _iterator.next();
                if (_i.done) break;
                _ref = _i.value;
            }

            var obj = _ref;

            ids.push(obj.id);
            var item = self.table.getItem(obj.id);
            items.push(item);
            indexes.push(item.index);
        }

        webix.confirm({
            title: "Delete alerts",
            ok: "Yes",
            cancel: "No",
            text: "Delete alert item(s) of " + indexes.join(", ")
        }).then(function () {
            var identifiers = items.map(function (item) {
                return item.identifier;
            });
            self.table.showProgress({
                hide: false
            });
            __WEBPACK_IMPORTED_MODULE_4__services_alerts__["a" /* alerts */].delete(identifier).then(function () {
                self.table.remove(ids);
                self.table.showProgress({
                    hide: true
                });
            });
        });
    };

    AlertsView.prototype.viewItem = function viewItem(id) {
        this.alertView.showFor(this.table.getItem(id));
    };

    AlertsView.prototype.init = function init() {
        // this.use(plugins.ProgressBar, "progress");
        var self = this;
        self.table = $$("alerts_table");
        self.alertView = self.ui(__WEBPACK_IMPORTED_MODULE_5__alert__["default"]);

        webix.extend(self.table, webix.ProgressBar);
        webix.ready(function () {
            self.table.clearAll();
            self.table.showProgress({
                hide: false
            });
            __WEBPACK_IMPORTED_MODULE_4__services_alerts__["a" /* alerts */].list().then(function (data) {
                var alerts = data.json().alerts;
                self.table.parse(alerts);
            });
        });

        webix.ui({
            view: "contextmenu",
            id: "alerts_cm",
            data: ["View", "Delete"]
        }).attachTo(self.table);

        self.table.attachEvent("onItemDblClick", function () {
            self.viewItem(self.table.getSelectedId());
        });

        $$("alerts_cm").attachEvent("onMenuItemClick", function (id) {
            if (id == "Delete") {
                self.deleteItem(self.table.getSelectedId(true));
            } else if (id == "View") {
                self.viewItem(self.table.getSelectedId());
            }
        });
    };

    return AlertsView;
}(__WEBPACK_IMPORTED_MODULE_0_webix_jet__["b" /* JetView */]);

/* harmony default export */ __webpack_exports__["default"] = (AlertsView);

/***/ }),
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__external__ = __webpack_require__(1);
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }



var CODE_URL = "/codeserver/?folder=/sandbox/code";
var REQUIRED_PACKAGES = {
    "zerobot.codeserver": "https://github.com/threefoldtech/jumpscaleX_threebot/tree/development/ThreeBotPackages/zerobot/codeserver"
};

var CodeserverView = function (_ExternalView) {
    _inherits(CodeserverView, _ExternalView);

    function CodeserverView(app, name) {
        _classCallCheck(this, CodeserverView);

        return _possibleConstructorReturn(this, _ExternalView.call(this, app, name, CODE_URL, REQUIRED_PACKAGES));
    }

    return CodeserverView;
}(__WEBPACK_IMPORTED_MODULE_0__external__["ExternalView"]);

/* harmony default export */ __webpack_exports__["default"] = (CodeserverView);

/***/ }),
/* 8 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_webix_jet__ = __webpack_require__(0);
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }



var TopView = function (_JetView) {
	_inherits(TopView, _JetView);

	function TopView() {
		_classCallCheck(this, TopView);

		return _possibleConstructorReturn(this, _JetView.apply(this, arguments));
	}

	TopView.prototype.config = function config() {
		return {
			type: "space",
			responsive: true,
			rows: [{
				cols: [{
					$subview: "dash.jsxInfo"
				}, {
					$subview: "dash.health"
				}, {
					$subview: "dash.diskSpace"
				}]
			}, {
				cols: [{
					$subview: "dash.processes"
				}, { $subview: "dash.runningPorts" }]
			}]
		};
	};

	return TopView;
}(__WEBPACK_IMPORTED_MODULE_0_webix_jet__["b" /* JetView */]);

/* harmony default export */ __webpack_exports__["default"] = (TopView);

/***/ }),
/* 9 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__external__ = __webpack_require__(1);
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }



var URL = "/simulator/threefold/notebook/";
var REQUIRED_PACKAGES = {
    "threefold.simulator": "https://github.com/threefoldtech/jumpscaleX_threebot/tree/development/ThreeBotPackages/threefold/simulator"
};

var JupyterView = function (_ExternalView) {
    _inherits(JupyterView, _ExternalView);

    function JupyterView(app, name) {
        _classCallCheck(this, JupyterView);

        return _possibleConstructorReturn(this, _ExternalView.call(this, app, name, URL, REQUIRED_PACKAGES));
    }

    return JupyterView;
}(__WEBPACK_IMPORTED_MODULE_0__external__["ExternalView"]);

/* harmony default export */ __webpack_exports__["default"] = (JupyterView);

/***/ }),
/* 10 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_webix_jet__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__appLogs__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_logs__ = __webpack_require__(37);
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }






var LogsView = function (_JetView) {
    _inherits(LogsView, _JetView);

    function LogsView() {
        _classCallCheck(this, LogsView);

        return _possibleConstructorReturn(this, _JetView.apply(this, arguments));
    }

    LogsView.prototype.config = function config() {

        var view = {
            rows: [{
                cols: [{
                    view: "template",
                    type: "header", template: "Logs"
                }, {
                    view: "combo",
                    id: "apps_combo",
                    placeholder: "Choose your application",
                    on: {
                        onChange: function onChange(appName) {
                            this.$scope.showFor(appName);
                        }
                    }
                }]
            }, __WEBPACK_IMPORTED_MODULE_1__appLogs__["default"]]
        };

        return view;
    };

    LogsView.prototype.init = function init(view) {
        view.appsCombo = $$("apps_combo");
        __WEBPACK_IMPORTED_MODULE_2__services_logs__["a" /* logs */].listApps().then(function (data) {
            view.appsCombo.define("options", data.json());
            view.appsCombo.render();
        });
    };

    LogsView.prototype.urlChange = function urlChange(view, url) {
        var appName = url[0].params.appname,
            logId = url[0].params.logid;
        if (appName) {
            this.showFor(appName, logId);
        }
    };

    LogsView.prototype.showFor = function showFor(appName, logId) {
        var self = this;
        self.appLogs = $$("applogs_table");

        webix.extend(self.appLogs, webix.ProgressBar);
        self.appLogs.showProgress({ hide: false });

        __WEBPACK_IMPORTED_MODULE_2__services_logs__["a" /* logs */].list(appName, logId).then(function (data) {
            self.appLogs.clearAll();
            self.appLogs.parse(data.json()[0]);
            self.appLogs.showProgress({ hide: true });
        });
    };

    return LogsView;
}(__WEBPACK_IMPORTED_MODULE_0_webix_jet__["b" /* JetView */]);

/* harmony default export */ __webpack_exports__["default"] = (LogsView);

/***/ }),
/* 11 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_webix_jet__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__common_formatters__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_myjobs__ = __webpack_require__(30);
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }






var JobsView = function (_JetView) {
    _inherits(JobsView, _JetView);

    function JobsView() {
        _classCallCheck(this, JobsView);

        return _possibleConstructorReturn(this, _JetView.apply(this, arguments));
    }

    JobsView.prototype.config = function config() {
        var view = {
            view: "datatable",
            id: "jobs_table",
            resizeColumn: true,
            select: true,
            multiselect: true,
            css: "webix_header_border webix_data_border",
            columns: [{
                id: "index",
                header: "#",
                sort: "int",
                autowidth: true
            }, {
                id: "category",
                header: "Category",
                sort: "string"
            }, {
                id: "time_start",
                header: "Start time",
                sort: "date",
                format: __WEBPACK_IMPORTED_MODULE_1__common_formatters__["a" /* dateFormatter */],
                width: 200
            }, {
                id: "time_stop",
                header: "Stop time",
                sort: "date",
                format: __WEBPACK_IMPORTED_MODULE_1__common_formatters__["a" /* dateFormatter */],
                width: 200
            }, {
                id: "timeout",
                header: "Timeout",
                sort: "int"
            }, {
                id: "action_id",
                header: "Action",
                sort: "string"
            }, {
                id: "kwargs",
                header: "Arguments",
                sort: "string",
                format: JSON.stringify
            }, {
                id: "result",
                header: ["Result", {
                    content: "textFilter"
                }],
                sort: "string",
                format: JSON.stringify
            }],
            scheme: {
                $init: function $init(obj) {
                    obj.index = this.count();
                }
            }
        };

        return view;
    };

    JobsView.prototype.init = function init(view) {
        __WEBPACK_IMPORTED_MODULE_2__services_myjobs__["a" /* myjobs */].listJobs().then(function (data) {
            view.parse(data);
        });
    };

    return JobsView;
}(__WEBPACK_IMPORTED_MODULE_0_webix_jet__["b" /* JetView */]);

/* harmony default export */ __webpack_exports__["default"] = (JobsView);

/***/ }),
/* 12 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_webix_jet__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__errors_dialog__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_packages__ = __webpack_require__(23);
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }






var UNKNOWN_STATUS = 'Unkown';

var PACKAGE_STATES = [{
    name: "Init",
    actions: ["delete"]
}, {
    name: "Config",
    actions: ['install', 'delete']
}, {
    name: "Installed",
    actions: ['delete', "start"]
}, {
    name: "Running",
    actions: ['delete', "stop"]
}, {
    name: "Halted",
    actions: ['delete', "start", "disable"]
}, {
    name: "Disabled",
    actions: ['delete', "enable"]
}, {
    name: "Error",
    actions: ["delete"]
}];

var PackagesView = function (_JetView) {
    _inherits(PackagesView, _JetView);

    function PackagesView() {
        _classCallCheck(this, PackagesView);

        return _possibleConstructorReturn(this, _JetView.apply(this, arguments));
    }

    PackagesView.prototype.config = function config() {
        var _ref;

        var grid = {
            rows: [{
                //Header
                view: "template",
                type: "header",
                template: "Packages"
            }, { //adding Package
                cols: [{
                    //selector
                    view: "select",
                    id: 'method_selector',
                    options: ["Path", "Giturl"],
                    width: 100
                },
                //text area
                {
                    view: "text",
                    id: 'package_path',
                    inputAlign: "left"
                },
                //submit button
                {
                    view: "button",
                    id: "add_package_button",
                    value: "Add package",
                    autowidth: true,
                    type: ""
                }]
            }, (_ref = { //DataTable
                view: "datatable",
                id: "packages_table",
                resizeColumn: true,
                type: {
                    height: 200
                },
                scroll: "xy",
                autoConfig: true
            }, _ref["view"] = "datatable", _ref.select = true, _ref.css = "webix_header_border webix_data_border", _ref.onContext = {}, _ref.columns = [{
                id: "index",
                header: "#",
                sort: "int",
                autowidth: true
            }, {
                id: "author",
                header: ["Author", {
                    content: "selectFilter"
                }],
                sort: "string",
                width: 200
            }, {
                id: "name",
                header: ["Name", {
                    content: "textFilter"
                }],
                sort: "string",
                width: 200
            }, {
                id: "status",
                header: "Status",
                sort: "string"
            }, {
                id: "path",
                header: "Path",
                sort: "string",
                width: 700
            }], _ref.scheme = {
                $init: function $init(obj) {
                    obj.index = this.count();
                }
            }, _ref)]
        };
        return grid;
    };

    PackagesView.prototype.showError = function showError(message) {
        this.errorView.showError(message);
    };

    PackagesView.prototype.handleResult = function handleResult(promise, callback) {
        var _this2 = this;

        this.packageTable.showProgress({ hide: false });

        promise.then(function (data) {
            if (callback instanceof Function) {
                callback(data);
            }

            webix.message({
                type: "success",
                text: "The operation has beed done successfully"
            });
            _this2.packageTable.showProgress({ hide: true });
        }).catch(function (error) {
            _this2.showError("Error has happened during this operation: " + error.response, "Error");
            _this2.packageTable.showProgress({ hide: true });
        });
    };

    PackagesView.prototype.addPackage = function addPackage(path, gitUrl) {
        this.handleResult(__WEBPACK_IMPORTED_MODULE_2__services_packages__["a" /* packages */].add(path, gitUrl));
    };

    PackagesView.prototype.deletePackage = function deletePackage(packageName, elementID) {
        var _this3 = this;

        this.handleResult(__WEBPACK_IMPORTED_MODULE_2__services_packages__["a" /* packages */].delete(packageName), function () {
            _this3.packageTable.remove(elementID);
        });
    };

    PackagesView.prototype.startPackage = function startPackage(packageName) {
        this.handleResult(__WEBPACK_IMPORTED_MODULE_2__services_packages__["a" /* packages */].start(packageName));
    };

    PackagesView.prototype.stopPackage = function stopPackage(packageName) {
        this.handleResult(__WEBPACK_IMPORTED_MODULE_2__services_packages__["a" /* packages */].stop(packageName));
    };

    PackagesView.prototype.enablePackage = function enablePackage(packageName) {
        this.handleResult(__WEBPACK_IMPORTED_MODULE_2__services_packages__["a" /* packages */].enablePackage(packageName));
    };

    PackagesView.prototype.disablePackage = function disablePackage(packageName) {
        this.handleResult(__WEBPACK_IMPORTED_MODULE_2__services_packages__["a" /* packages */].disable(packageName));
    };

    PackagesView.prototype.init = function init(view) {
        var self = this;

        self.errorView = this.ui(__WEBPACK_IMPORTED_MODULE_1__errors_dialog__["ErrorView"]);

        var menu = webix.ui({
            view: "contextmenu",
            id: "packages_cm"
        });

        this.packageTable = this.$$("packages_table");
        webix.extend(this.packageTable, webix.ProgressBar);

        function checkAction(action, selectedItemId) {
            if (self.packageTable.getItem(selectedItemId)) {
                var name = self.packageTable.getItem(selectedItemId).name;
                var author = self.packageTable.getItem(selectedItemId).author;
                var elementID = self.packageTable.getItem(selectedItemId).id;
                var packageName = author + "." + name;
                if (action == 'delete') {
                    //deletePackage(packageName)
                    // self.packageTable.remove(elementID)
                    //
                    webix.confirm({
                        title: "Delete Package",
                        ok: "Yes",
                        text: "Are you sure you want to delete " + author + "." + name + "?",
                        cancel: "No"
                    }).then(function () {
                        self.deletePackage(packageName, elementID);
                    });
                    //
                } else if (action == 'start') {
                    self.startPackage(packageName);
                } else if (action == 'stop') {
                    self.stopPackage(packageName);
                } else if (action == 'disable') {
                    self.disablePackage(packageName);
                } else if (action == 'enable') {
                    self.enablePackage(packageName);
                }
            } else {
                webix.message("you have to select a package");
            }
        }

        $$("add_package_button").attachEvent("onItemClick", function (id) {
            var pacakgeLocation = $$("package_path").getValue();
            if (pacakgeLocation == "") {
                alert("please enter package location");
            } else {
                var packageMethod = $$("method_selector").getValue();
                var gitUrl = null;
                var path = null;
                if (packageMethod == "Giturl") {
                    gitUrl = pacakgeLocation;
                } else if (packageMethod == "Path") {
                    path = pacakgeLocation;
                } else {
                    alert("something went wrong during selecting the package method");
                }
                self.addPackage(path, gitUrl);
            }
        });

        $$("packages_cm").attachEvent("onMenuItemClick", function (id) {
            checkAction(id, self.packageTable.getSelectedId());
        });

        webix.event(self.packageTable.$view, "contextmenu", function (e /*MouseEvent*/) {
            var pos = self.packageTable.locate(e);
            var menudata = [];
            if (pos) {
                var item = self.packageTable.getItem(pos.row);
                for (var i = 0; i < PACKAGE_STATES.length; i++) {
                    if (PACKAGE_STATES[i].name == item.status) {
                        menudata = addActions(menudata, i);
                    }
                }
            }
            menu.clearAll();
            menu.parse(menudata);
            menu.show(e);
            return webix.html.preventEvent(e);
        });

        /////////////////////////////////////////


        // Helper functions

        // Mapping the data to the right format to be able to diplay the actual status
        function mapData(allItems) {
            return allItems.map(function (item) {
                var status = PACKAGE_STATES[item.status];
                return {
                    "name": item.source.name,
                    "author": item.source.threebot,
                    "path": item.path,
                    "status": status && status.name || UNKNOWN_STATUS
                };
            });
        }

        function addActions(menudata, pkgIndex) {
            for (var j = 0; j < PACKAGE_STATES[pkgIndex].actions.length; j++) {
                menudata.push(PACKAGE_STATES[pkgIndex].actions[j]);
            }return menudata;
        }

        __WEBPACK_IMPORTED_MODULE_2__services_packages__["a" /* packages */].list().then(function (data) {
            var allPackages = data.json().packages;
            self.packageTable.parse(mapData(allPackages));
        });
    };

    return PackagesView;
}(__WEBPACK_IMPORTED_MODULE_0_webix_jet__["b" /* JetView */]);

/* harmony default export */ __webpack_exports__["default"] = (PackagesView);

/***/ }),
/* 13 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_webix_jet__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__admins__ = __webpack_require__(21);
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }





var SettingsView = function (_JetView) {
    _inherits(SettingsView, _JetView);

    function SettingsView() {
        _classCallCheck(this, SettingsView);

        return _possibleConstructorReturn(this, _JetView.apply(this, arguments));
    }

    SettingsView.prototype.config = function config() {
        var view = {
            view: "tabview",
            cells: [{
                header: "Administrators",
                body: __WEBPACK_IMPORTED_MODULE_1__admins__["default"]
            }]
        };

        return view;
    };

    SettingsView.prototype.init = function init(view) {};

    return SettingsView;
}(__WEBPACK_IMPORTED_MODULE_0_webix_jet__["b" /* JetView */]);

/* harmony default export */ __webpack_exports__["default"] = (SettingsView);

/***/ }),
/* 14 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__external__ = __webpack_require__(1);
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }



var WIKIS_URL = "/wiki";

var WikisView = function (_ExternalView) {
    _inherits(WikisView, _ExternalView);

    function WikisView(app, name) {
        _classCallCheck(this, WikisView);

        return _possibleConstructorReturn(this, _ExternalView.call(this, app, name, WIKIS_URL));
    }

    return WikisView;
}(__WEBPACK_IMPORTED_MODULE_0__external__["ExternalView"]);

/* harmony default export */ __webpack_exports__["default"] = (WikisView);

/***/ }),
/* 15 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_webix_jet__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__common_formatters__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_myjobs__ = __webpack_require__(30);
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }






var JobsView = function (_JetView) {
    _inherits(JobsView, _JetView);

    function JobsView() {
        _classCallCheck(this, JobsView);

        return _possibleConstructorReturn(this, _JetView.apply(this, arguments));
    }

    JobsView.prototype.config = function config() {
        var view = {
            view: "datatable",
            id: "workers_table",
            resizeColumn: true,
            select: true,
            multiselect: true,
            css: "webix_header_border webix_data_border",
            columns: [{
                id: "index",
                header: "#",
                sort: "int",
                autowidth: true
            }, {
                id: "state",
                header: "State",
                sort: "string"
            }, {
                id: "halt",
                header: "Halted",
                sort: "string",
                format: function format(value) {
                    return value ? 'Yes' : 'No';
                }
            }, {
                id: "pid",
                header: "PID"
            }, {
                id: "current_job",
                header: "Current job",
                format: function format(value) {
                    return value == 2147483647 ? 'N/A' : value;
                }
            }, {
                id: "last_update",
                header: "Last update",
                sort: "date",
                format: __WEBPACK_IMPORTED_MODULE_1__common_formatters__["a" /* dateFormatter */],
                width: 200
            }, {
                id: "time_start",
                header: "Start time",
                sort: "date",
                format: __WEBPACK_IMPORTED_MODULE_1__common_formatters__["a" /* dateFormatter */],
                width: 200
            }, {
                id: "timeout",
                header: "Timeout"
            }, {
                id: "type",
                header: "Type"
            }, {
                id: "error",
                header: "Error"
            }],
            autoConfig: true,
            scheme: {
                $init: function $init(obj) {
                    obj.index = this.count();
                }
            }
        };

        return view;
    };

    JobsView.prototype.init = function init(view) {
        __WEBPACK_IMPORTED_MODULE_2__services_myjobs__["a" /* myjobs */].listWorkers().then(function (data) {
            view.parse(data);
        });
    };

    return JobsView;
}(__WEBPACK_IMPORTED_MODULE_0_webix_jet__["b" /* JetView */]);

/* harmony default export */ __webpack_exports__["default"] = (JobsView);

/***/ }),
/* 16 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ansiUp; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_ansi_up__ = __webpack_require__(35);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_ansi_up___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_ansi_up__);


var ansiUp = new __WEBPACK_IMPORTED_MODULE_0_ansi_up___default.a();

/***/ }),
/* 17 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_webix_jet__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__common_colors__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__data__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__common_formatters__ = __webpack_require__(3);
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }







var AlertView = function (_JetView) {
    _inherits(AlertView, _JetView);

    function AlertView() {
        _classCallCheck(this, AlertView);

        return _possibleConstructorReturn(this, _JetView.apply(this, arguments));
    }

    AlertView.prototype.config = function config() {
        var info = {
            view: "form",
            id: "form",
            elementsConfig: { labelWidth: 140 },
            elements: [{
                view: "text",
                label: "ID",
                name: "identifier",
                readonly: true
            }, {
                view: "text",
                label: "Type",
                name: "alert_type",
                readonly: true
            }, {
                view: "text",
                label: "Status",
                name: "status",
                readonly: true
            }, {
                view: "text",
                label: "Level",
                name: "level",
                readonly: true
            }, {
                view: "text",
                label: "Count",
                name: "count",
                readonly: true
            }, {
                view: "text",
                label: "Category",
                name: "cat",
                readonly: true
            }, {
                view: "text",
                label: "First time",
                name: "time_first",
                readonly: true
            }, {
                view: "text",
                label: "Last time",
                name: "time_last",
                readonly: true
            }, {
                view: "text",
                label: "Message (pub)",
                name: "public",
                readonly: true
            }]
        };

        var tab = {
            view: "tabview",
            cells: [{
                header: "Information",
                body: info
            }, {
                header: "Message",
                body: {
                    id: "message",
                    view: "template",
                    template: "",
                    scroll: "auto"
                }
            }, {
                header: "Tracebacks",
                body: {
                    rows: [{
                        view: "tabbar",
                        id: "tb_tabs",
                        multiview: true,
                        options: []
                    }, {
                        view: "multiview",
                        id: "tb_views",
                        cells: [{
                            template: ""
                        }]
                    }]
                }
            }, {
                id: "logs",
                view: "datatable",
                resizeColumn: true,
                select: true,
                multiselect: true,
                css: "webix_header_border webix_data_border",
                scroll: true,
                autoConfig: true,
                columns: [{
                    id: "index",
                    header: "#",
                    sort: "int",
                    autowidth: true,
                    width: 60
                }, {
                    id: "threebot_name",
                    header: "Threebot Name",
                    sort: "string",
                    width: 180
                }, {
                    id: "app_name",
                    header: "App Name",
                    sort: "string",
                    width: 180
                }, {
                    id: "latest_logid",
                    header: "Latest Log#",
                    sort: "int",
                    width: 180
                }],
                scheme: {
                    $init: function $init(obj) {
                        obj.index = this.count();
                    }
                }
            }]
        };

        return {
            view: "window",
            head: "Alert",
            modal: true,
            width: 600,
            height: 800,
            position: "center",
            body: {
                rows: [tab, {
                    view: "button",
                    value: "OK",
                    css: "webix_primary",
                    click: function click() {
                        this.getTopParentView().hide();
                    }
                }]
            }
        };
    };

    AlertView.prototype.init = function init() {
        var self = this;
        this.form = $$("form");
        this.message = $$("message");
        this.logs = $$("logs");

        this.tbViews = $$("tb_views");
        this.tbTabs = $$("tb_tabs");

        this.logs.attachEvent("onItemDblClick", function () {
            var logData = self.logs.getSelectedItem();
            this.$scope.show("/main/logs?appname=" + logData.app_name + "&logid=" + logData.latest_logid);
        });
    };

    AlertView.prototype.addTraceback = function addTraceback(tb) {
        var tbId = tb.threebot_name + "_" + tb.process_id;
        var tbTitle = tb.threebot_name + " - PID: (" + tb.process_id + ")";

        this.tbViews.addView({
            view: "template",
            id: tbId,
            scroll: "xy",
            template: "<p>" + __WEBPACK_IMPORTED_MODULE_1__common_colors__["a" /* ansiUp */].ansi_to_html(tb.formatted) + "</p>"
        });

        this.tbTabs.addOption(tbId, tbTitle, true);
    };

    AlertView.prototype.clearTraceBacks = function clearTraceBacks() {
        var id = this.tbTabs.getValue();

        while (id) {
            this.tbTabs.removeOption(id);
            this.tbViews.removeView(id);

            id = this.tbTabs.getValue();
        }
    };

    AlertView.prototype.showFor = function showFor(item) {
        var values = Object.assign({}, item);

        values.alert_type = __WEBPACK_IMPORTED_MODULE_2__data__["TYPES"][item.alert_type];
        values.status = __WEBPACK_IMPORTED_MODULE_2__data__["STATES"][item.status];
        values.level = __WEBPACK_IMPORTED_MODULE_2__data__["LEVELS"][item.level];
        values.time_first = Object(__WEBPACK_IMPORTED_MODULE_3__common_formatters__["a" /* dateFormatter */])(item.time_first);
        values.time_last = Object(__WEBPACK_IMPORTED_MODULE_3__common_formatters__["a" /* dateFormatter */])(item.time_last);
        this.form.setValues(values);

        this.message.setHTML("<p>" + __WEBPACK_IMPORTED_MODULE_1__common_colors__["a" /* ansiUp */].ansi_to_html(item.message) + "</p>");

        this.clearTraceBacks();

        for (var _iterator = item.tracebacks, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
            var _ref;

            if (_isArray) {
                if (_i >= _iterator.length) break;
                _ref = _iterator[_i++];
            } else {
                _i = _iterator.next();
                if (_i.done) break;
                _ref = _i.value;
            }

            var tb = _ref;

            this.addTraceback(tb);
        }

        this.logs.clearAll();
        this.logs.parse(item.logs);

        this.getRoot().show();
    };

    return AlertView;
}(__WEBPACK_IMPORTED_MODULE_0_webix_jet__["b" /* JetView */]);

/* harmony default export */ __webpack_exports__["default"] = (AlertView);

/***/ }),
/* 18 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_webix_jet__ = __webpack_require__(0);
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }



var ProcessesChildView = function (_JetView) {
    _inherits(ProcessesChildView, _JetView);

    function ProcessesChildView() {
        _classCallCheck(this, ProcessesChildView);

        return _possibleConstructorReturn(this, _JetView.apply(this, arguments));
    }

    ProcessesChildView.prototype.config = function config() {
        var view = {
            view: "datatable",
            id: "process_table",
            resizeColumn: true,
            select: true,
            multiselect: true,
            css: "webix_header_border webix_data_border",
            scroll: true,
            autoConfig: true,
            columns: [{
                id: "index",
                header: "#",
                sort: "int",
                autowidth: true
            }, {
                id: "name",
                header: ["Proccess", {
                    content: "textFilter"
                }],
                sort: "string"
            }, {
                id: "pid",
                header: "PID",
                sort: "int"
            }, {
                id: "username",
                header: "Username",
                sort: "string"
            }, {
                id: "vms",
                header: "Memory Usage",
                sort: "int",
                format: function format(value) {
                    return Math.ceil(value);
                }
            }],
            scheme: {
                $init: function $init(obj) {
                    obj.index = this.count();
                }
            }
        };

        return {
            view: "window",
            head: "Running Processes, Memory usage in MB",
            modal: true,
            width: 550,
            height: 600,
            position: "center",
            body: {
                rows: [view, {
                    view: "button",
                    value: "OK",
                    css: "webix_primary",
                    click: function click() {
                        this.getTopParentView().hide();
                    }
                }]
            }

        };
    };

    ProcessesChildView.prototype.showFor = function showFor(data) {
        this.table.parse(data);
        this.getRoot().show();
    };

    ProcessesChildView.prototype.init = function init() {
        this.table = $$("process_table");
    };

    return ProcessesChildView;
}(__WEBPACK_IMPORTED_MODULE_0_webix_jet__["b" /* JetView */]);

/* harmony default export */ __webpack_exports__["default"] = (ProcessesChildView);

/***/ }),
/* 19 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ErrorView", function() { return ErrorView; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_webix_jet__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__common_colors__ = __webpack_require__(16);
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }





var ErrorView = function (_JetView) {
    _inherits(ErrorView, _JetView);

    function ErrorView() {
        _classCallCheck(this, ErrorView);

        return _possibleConstructorReturn(this, _JetView.apply(this, arguments));
    }

    ErrorView.prototype.config = function config() {
        var message = {
            view: "template",
            id: "error_template",
            template: "",
            scroll: "xy"
        };

        return {
            view: "window",
            head: "Error",
            modal: true,
            width: 500,
            height: 600,
            position: "center",
            body: {
                rows: [message, {
                    view: "button",
                    value: "OK",
                    css: "webix_primary",
                    click: function click() {
                        this.getTopParentView().hide();
                    }
                }]
            }
        };
    };

    ErrorView.prototype.init = function init() {
        this.message = $$("error_template");
    };

    ErrorView.prototype.showError = function showError(message, head) {
        this.message.setHTML("<p>" + __WEBPACK_IMPORTED_MODULE_1__common_colors__["a" /* ansiUp */].ansi_to_html(message) + "</p>");
        if (head) {
            this.message.getHead().setHTML(head);
        }

        this.getRoot().show();
    };

    return ErrorView;
}(__WEBPACK_IMPORTED_MODULE_0_webix_jet__["b" /* JetView */]);

/***/ }),
/* 20 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_webix_jet__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__common_formatters__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__alerts_data__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__common_filters__ = __webpack_require__(22);
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }







var AppLogsView = function (_JetView) {
    _inherits(AppLogsView, _JetView);

    function AppLogsView() {
        _classCallCheck(this, AppLogsView);

        return _possibleConstructorReturn(this, _JetView.apply(this, arguments));
    }

    AppLogsView.prototype.config = function config() {
        var pager = {
            view: "pager",
            id: "pager",
            size: 100,
            group: 20
        };
        var applogs = {
            view: "datatable",
            id: "applogs_table",
            pager: "pager",
            resizeColumn: true,
            select: true,
            multiselect: true,
            css: "webix_header_border webix_data_border",
            scroll: true,
            autoConfig: true,
            on: {
                onAfterLoad: function onAfterLoad() {
                    this.sort("epoch", "des");
                    this.markSorting("epoch", "des");
                }
            },

            columns: [{
                id: "id",
                header: ["Log#", {
                    content: "textFilter"
                }],
                sort: "int",
                width: 50,
                autowidth: true
            }, {
                id: "filepath",
                header: ["Path", {
                    content: "textFilter"
                }],
                sort: "string",
                autowidth: true,
                width: 140
            }, {
                id: "linenr",
                header: ["Line.nr", {
                    content: "textFilter"
                }],
                sort: "int",
                autowidth: true,
                width: 60
            }, {
                id: "context",
                header: ["Context", {
                    content: "textFilter"
                }],
                sort: "string"
            }, {
                id: "message",
                header: ["Message", {
                    content: "textFilter"
                }],
                sort: "string",
                width: 500,
                autowidth: true
            }, {
                id: "level",
                header: ["Level", {
                    content: "selectFilter",
                    options: Object(__WEBPACK_IMPORTED_MODULE_3__common_filters__["a" /* createFilterOptions */])(__WEBPACK_IMPORTED_MODULE_2__alerts_data__["LEVELS"])
                }],
                sort: "int",
                format: function format(value) {
                    return __WEBPACK_IMPORTED_MODULE_2__alerts_data__["LEVELS"][value];
                },
                width: 100
            }, {
                id: "epoch",
                header: ["Time", {
                    content: "textFilter"
                }],
                sort: "date",
                format: __WEBPACK_IMPORTED_MODULE_1__common_formatters__["a" /* dateFormatter */],
                width: 130
            }, {
                id: "processid",
                header: ["PID", {
                    content: "textFilter"
                }],
                sort: "int",
                width: 60
            }, {
                id: "cat",
                header: ["Category", {
                    content: "textFilter"
                }],
                sort: "string",
                width: 80
            }, {
                id: "data",
                header: ["Data", {
                    content: "textFilter"
                }],
                sort: "string"
            }]

        };

        return {
            rows: [applogs, pager]
        };
    };

    return AppLogsView;
}(__WEBPACK_IMPORTED_MODULE_0_webix_jet__["b" /* JetView */]);

/* harmony default export */ __webpack_exports__["default"] = (AppLogsView);

/***/ }),
/* 21 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_webix_jet__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__common_dialogs__ = __webpack_require__(38);
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }





var AdminsView = function (_JetView) {
    _inherits(AdminsView, _JetView);

    function AdminsView() {
        _classCallCheck(this, AdminsView);

        return _possibleConstructorReturn(this, _JetView.apply(this, arguments));
    }

    AdminsView.prototype.config = function config() {
        var self = this;

        return {
            cols: [{
                rows: [{
                    view: "template",
                    template: "All of the following 3Bot names can access dashboard, you can add or remove them from here",
                    autoheight: true
                }, {
                    localId: "add-admin",
                    view: "button",
                    value: "Add new administrator",
                    click: self.addAdmin.bind(self)
                }]
            }, {
                localId: "admins-table",
                view: "datatable",
                autoheight: true,
                columns: [{
                    id: "name",
                    header: ["Name", {
                        content: "textFilter"
                    }],
                    sort: "string"
                }, {
                    template: function template(obj) {
                        return "<span class='webix_icon mdi mdi-trash-can webix_danger delete_admin'></span>";
                    }
                }],
                onClick: {
                    delete_admin: function delete_admin(e, id) {
                        this.$scope.deleteAdmin(id);
                    }
                }
            }]
        };
    };

    AdminsView.prototype.handleResult = function handleResult() {};

    AdminsView.prototype.addAdmin = function addAdmin() {
        var self = this;

        Object(__WEBPACK_IMPORTED_MODULE_1__common_dialogs__["a" /* inputDialog */])("Add admin", "3Bot name", "Add", function (input) {
            // TODO: call actor.add
            // TODO: check if already exists (can be actor too, other session may have added or removed it)
            self.table.add({ name: input });
        });
    };

    AdminsView.prototype.deleteAdmin = function deleteAdmin(itemId) {
        var self = this;

        var item = self.table.getItem(itemId);

        webix.confirm({
            title: "Delete admin",
            ok: "Yes",
            text: "Are you sure you want to delete \"" + item.name + "\"?",
            cancel: "No"
        }).then(function () {
            // TODO: call actor.delete
            self.table.remove(itemId);
        });
    };

    AdminsView.prototype.init = function init() {
        this.table = this.$$("admins-table");

        webix.extend(this.table, webix.ProgressBar);
    };

    return AdminsView;
}(__WEBPACK_IMPORTED_MODULE_0_webix_jet__["b" /* JetView */]);

/* harmony default export */ __webpack_exports__["default"] = (AdminsView);

/***/ }),
/* 22 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = createFilterOptions;
function createFilterOptions(obj) {
    // returns a new object as {id: value}, used as data table filter options
    // obj: can be an array or a mapping object

    if (obj instanceof Array) {
        return obj.map(function (value, index) {
            return { id: index, value: value };
        });
    } else {
        // assume it's just a mapping otherwise
        return Object.keys(obj).map(function (key) {
            return { id: key, value: obj[key] };
        });
    }
}

/***/ }),
/* 23 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return packages; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__common_api__ = __webpack_require__(4);
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }



var BASE_URL = "/zerobot/packagemanager/actors/package_manager";

var PackagesService = function (_Service) {
    _inherits(PackagesService, _Service);

    function PackagesService() {
        _classCallCheck(this, PackagesService);

        return _possibleConstructorReturn(this, _Service.call(this, BASE_URL));
    }

    PackagesService.prototype.list = function list() {
        return this.getCall("packages_list");
    };

    PackagesService.prototype.add = function add(path, gitUrl) {
        return this.postCall("package_add", {
            path: path,
            git_url: gitUrl
        });
    };

    PackagesService.prototype.delete = function _delete(packageName) {
        return this.postCall("package_delete", { name: packageName });
    };

    PackagesService.prototype.start = function start(packageName) {
        return this.postCall("package_start", { name: packageName });
    };

    PackagesService.prototype.stop = function stop(packageName) {
        return this.postCall("package_stop", { name: packageName });
    };

    PackagesService.prototype.disable = function disable(packageName) {
        return this.postCall("package_disable", { name: packageName });
    };

    PackagesService.prototype.enable = function enable(packageName) {
        return this.postCall("package_enable", { name: packageName });
    };

    return PackagesService;
}(__WEBPACK_IMPORTED_MODULE_0__common_api__["a" /* Service */]);

var packages = new PackagesService();

/***/ }),
/* 24 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_webix_jet__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_health__ = __webpack_require__(5);
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }




var DiskSpaceView = function (_JetView) {
    _inherits(DiskSpaceView, _JetView);

    function DiskSpaceView() {
        _classCallCheck(this, DiskSpaceView);

        return _possibleConstructorReturn(this, _JetView.apply(this, arguments));
    }

    DiskSpaceView.prototype.config = function config() {
        var diskSpace = {
            id: "diskSpace",
            responsive: true,
            view: "list",
            type: {
                height: 60
            },
            template: "\n            <p><font size=\"3\"><b>#key#: </b></font> <font size=\"3\">#value#</font></p>\n            "
        };

        return {
            type: "space",
            rows: [{
                template: "<div style='width:auto;text-align:center'><h3>Disk Space<h3/></div>",
                height: 50
            }, diskSpace]
        };
    };

    DiskSpaceView.prototype.init = function init() {
        var self = this;

        this.diskInfo = this.$$("diskSpace");

        __WEBPACK_IMPORTED_MODULE_1__services_health__["a" /* health */].getDiskSpace().then(function (data) {
            data = data.json();

            self.diskInfo.add({
                key: "Used",
                value: data.used + " GB"
            });
            self.diskInfo.add({
                key: "Free",
                value: data.free + " GB"
            });
            self.diskInfo.add({
                key: "Total",
                value: data.total + " GB"
            });
            self.diskInfo.add({
                key: "Percent",
                value: data.percent + " %"
            });
        });
    };

    return DiskSpaceView;
}(__WEBPACK_IMPORTED_MODULE_0_webix_jet__["b" /* JetView */]);

/* harmony default export */ __webpack_exports__["default"] = (DiskSpaceView);

/***/ }),
/* 25 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_webix_jet__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_health__ = __webpack_require__(5);
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }




var healthInfoView = function (_JetView) {
    _inherits(healthInfoView, _JetView);

    function healthInfoView() {
        _classCallCheck(this, healthInfoView);

        return _possibleConstructorReturn(this, _JetView.apply(this, arguments));
    }

    healthInfoView.prototype.config = function config() {
        var _healthInfo;

        var healthInfo = (_healthInfo = {
            id: "healthInfo",
            responsive: true,
            view: "list"
        }, _healthInfo["responsive"] = true, _healthInfo.type = {
            height: 60
        }, _healthInfo.template = "\n            <p><font size=\"3\"><b>#key#: </b></font> #value#</p>\n            ", _healthInfo);

        return {
            type: "space",
            rows: [{
                template: "<div style='width:auto;text-align:center'><h3>Health Checks<h3/></div>",
                height: 50
            }, healthInfo]
        };
    };

    healthInfoView.prototype.init = function init(view) {
        var self = this;

        this.healthInfo = this.$$("healthInfo");

        __WEBPACK_IMPORTED_MODULE_1__services_health__["a" /* health */].getHealth().then(function (data) {
            data = data.json();

            if (data.bcdb === "OK") {
                self.healthInfo.add({
                    key: "BCDB Status",
                    value: "<span class='webix_icon wxi-checkbox-marked' style=\"color:green\">OK</span>"
                });
            }
            if (data.bcdb === "Error") {
                self.healthInfo.add({
                    key: "BCDB",
                    value: "<span class='webix_icon wxi-close-circle' style=\"color:red\">Error</span>"
                });
            }
            if (data.wikis === "OK") {
                self.healthInfo.add({
                    key: "Wikis",
                    value: "<span class='webix_icon wxi-checkbox-marked' style=\"color:green\">OK</span>"
                });
            }
            if (data.wikis === "Error") {
                self.healthInfo.add({
                    key: "Wikis",
                    value: "<span class='webix_icon wxi-close-circle' style=\"color:red\">Error</span>"
                });
            }
            if (data.codeserver === "OK") {
                self.healthInfo.add({
                    key: "Codeserver",
                    value: "<span class='webix_icon wxi-checkbox-marked' style=\"color:green\">OK</span>"
                });
            }
            if (data.codeserver === "Error") {
                self.healthInfo.add({
                    key: "Codeserver",
                    value: "<span class='webix_icon wxi-close-circle' style=\"color:red\">Error</span>"
                });
            }
            if (data.jupyter === "OK") {
                self.healthInfo.add({
                    key: "Jupyter",
                    value: "<span class='webix_icon wxi-checkbox-marked' style=\"color:green\">OK</span>"
                });
            }
            if (data.jupyter === "Error") {
                self.healthInfo.add({
                    key: "Jupyter",
                    value: "<span class='webix_icon wxi-close-circle' style=\"color:red\">Error</span>"
                });
            }
        });
    };

    return healthInfoView;
}(__WEBPACK_IMPORTED_MODULE_0_webix_jet__["b" /* JetView */]);

/* harmony default export */ __webpack_exports__["default"] = (healthInfoView);

/***/ }),
/* 26 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_webix_jet__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_health__ = __webpack_require__(5);
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }




var JSXInfoView = function (_JetView) {
    _inherits(JSXInfoView, _JetView);

    function JSXInfoView() {
        _classCallCheck(this, JSXInfoView);

        return _possibleConstructorReturn(this, _JetView.apply(this, arguments));
    }

    JSXInfoView.prototype.config = function config() {
        var _info;

        var info = (_info = {
            id: "jsxInfo",
            responsive: true,
            view: "list"
        }, _info["responsive"] = true, _info.type = {
            height: 60
        }, _info.template = "\n                <p><font size=\"3\"><b>#key#: </b></font> <font size=\"3\">#value#</font></p>\n            ", _info);

        return {
            type: "space",
            rows: [{
                template: "<div style='width:auto;text-align:center'><h3>JSX Info<h3/></div>",
                height: 50
            }, info]
        };
    };

    JSXInfoView.prototype.init = function init() {
        var self = this;

        this.info = this.$$("jsxInfo");

        __WEBPACK_IMPORTED_MODULE_1__services_health__["a" /* health */].getIdentity().then(function (data) {
            self.info.add({
                key: "3bot",
                value: data.text()
            });
        });

        __WEBPACK_IMPORTED_MODULE_1__services_health__["a" /* health */].getNetworkInfo().then(function (data) {
            data = data.json();
            self.info.add({
                key: "IP",
                value: data.ip
            });
            if (data.ip6.length) {
                self.info.add({
                    key: "IPv6",
                    value: data.ip6
                });
            } else {
                self.info.add({
                    key: "IPv6",
                    value: "Not set"
                });
            }
        });

        __WEBPACK_IMPORTED_MODULE_1__services_health__["a" /* health */].getJsxVersion().then(function (data) {
            self.info.add({
                key: "JSX Version",
                value: data.text()
            });
        });
    };

    return JSXInfoView;
}(__WEBPACK_IMPORTED_MODULE_0_webix_jet__["b" /* JetView */]);

/* harmony default export */ __webpack_exports__["default"] = (JSXInfoView);

/***/ }),
/* 27 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_webix_jet__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__processesChildView__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_health__ = __webpack_require__(5);
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }






var colorsDataset = [{
    color: "#ee3639"
}, {
    color: "#ee9e36"
}, {
    color: "#eeea36"
}, {
    color: "#a9ee36"
}, {
    color: "#36d3ee"
}, {
    color: "#367fee"
}, {
    color: "#9b36ee"
}];

var ProcessesView = function (_JetView) {
    _inherits(ProcessesView, _JetView);

    function ProcessesView() {
        _classCallCheck(this, ProcessesView);

        return _possibleConstructorReturn(this, _JetView.apply(this, arguments));
    }

    ProcessesView.prototype.config = function config() {
        var processesInfo = {
            id: "process",
            view: "chart",
            responsive: true,
            type: "pie",
            width: 500,
            height: 400,
            color: "#color#",
            value: "#vms#",
            label: "<h4>#name#</h4>",
            pieInnerText: "<h4>#vms#</h4>",
            data: "#chartsData#"
        };

        return {
            type: "space",
            rows: [{
                template: "<div style='width:auto;text-align:center'><h3>Running processes memory usage (MB)<h3/></div>",
                height: 50
            }, processesInfo, {
                view: "button",
                id: "show_all",
                value: "Show All",
                align: "center",
                css: "webix_primary",
                inputWidth: 100,
                click: function click() {
                    this.$scope.childview.showFor(this.$scope.processesList);
                }
            }]
        };
    };

    ProcessesView.prototype.init = function init(view) {
        var self = this;

        this.processesList = [];

        this.runProcessInfo = this.$$("process");

        self.childview = self.ui(__WEBPACK_IMPORTED_MODULE_1__processesChildView__["default"]);

        __WEBPACK_IMPORTED_MODULE_2__services_health__["a" /* health */].getRunningProcesses().then(function (data) {
            var chartsData = [];

            data = data.json();
            self.processesList = data.processes_list;

            // memory usage
            self.memoryUsage = data.memory_usage;
            self.totalMemory = self.memoryUsage.total_mem;
            self.percent = self.memoryUsage.usage_percent;

            self.runProcessInfo.define("legend", {
                layout: "x",
                width: 110,
                values: [{
                    text: "<b>Total memory: </b>" + self.totalMemory + "GB"
                }, {
                    text: "<b>Usage: </b>" + self.percent + "%"
                }]
            });
            self.runProcessInfo.refresh();

            for (var i = 0; i < self.processesList.length; i++) {
                //Break when there is no more colors
                if (i == colorsDataset.length) break;

                var temp = {
                    "color": colorsDataset[i].color,
                    "name": self.processesList[i].name,
                    "vms": Math.ceil(self.processesList[i].vms)
                };
                chartsData.push(temp);
                // console.log(myArray[i]);
            }

            self.runProcessInfo.parse({
                data: chartsData
            });
        });
    };

    return ProcessesView;
}(__WEBPACK_IMPORTED_MODULE_0_webix_jet__["b" /* JetView */]);

/* harmony default export */ __webpack_exports__["default"] = (ProcessesView);

/***/ }),
/* 28 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_webix_jet__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_health__ = __webpack_require__(5);
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }





var runningPortsView = function (_JetView) {
    _inherits(runningPortsView, _JetView);

    function runningPortsView() {
        _classCallCheck(this, runningPortsView);

        return _possibleConstructorReturn(this, _JetView.apply(this, arguments));
    }

    runningPortsView.prototype.config = function config() {
        var ports = {
            id: "runningPorts",
            view: "datatable",
            responsive: true,
            autoConfig: true,
            type: {
                height: 200
            },
            template: "Running Ports",
            resizeColumn: true,
            select: true,
            multiselect: true,
            css: "webix_header_border webix_data_border",
            columns: [{
                id: "index",
                header: "#",
                sort: "int",
                autowidth: true
            }, {
                id: "port_number",
                header: ["Port Number", {
                    content: "textFilter"
                }],
                sort: "string"
            }, {
                id: "process",
                header: ["Process", {
                    content: "textFilter"
                }],
                sort: "string"
            }],
            scheme: {
                $init: function $init(obj) {
                    obj.index = this.count();
                }
            }
        };

        return {
            type: "space",
            rows: [{
                template: "<div style='width:auto;text-align:center'><h3>Ports<h3/></div>",
                height: 50
            }, ports]
        };
    };

    runningPortsView.prototype.init = function init() {
        var self = this;

        self.portsTable = this.$$("runningPorts");
        __WEBPACK_IMPORTED_MODULE_1__services_health__["a" /* health */].getRunningPorts().then(function (data) {
            self.portsTable.parse(data.json());
        });
    };

    return runningPortsView;
}(__WEBPACK_IMPORTED_MODULE_0_webix_jet__["b" /* JetView */]);

/* harmony default export */ __webpack_exports__["default"] = (runningPortsView);

/***/ }),
/* 29 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_webix_jet__ = __webpack_require__(0);
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }



var TopView = function (_JetView) {
    _inherits(TopView, _JetView);

    function TopView() {
        _classCallCheck(this, TopView);

        return _possibleConstructorReturn(this, _JetView.apply(this, arguments));
    }

    TopView.prototype.config = function config() {
        var header = {
            cols: [{
                id: "button_hide_menu",
                view: "icon", icon: "mdi mdi-menu",
                css: "custom_dark", height: 58,
                click: this.hideMenu,
                tooltip: "Hide menu"
            }, {
                id: "header",
                type: "header",
                css: "custom_dark", height: 58,
                template: "ADMIN",
                borderless: true
            }]
        };

        var sidebar = {
            localId: "menu",
            view: "sidebar",
            css: "webix_dark",
            width: 200,
            data: [{
                id: "dash",
                value: "Dashboard",
                icon: "mdi mdi-view-dashboard"
            }, {
                id: "wikis",
                value: "Wikis",
                icon: "mdi mdi-newspaper"
            }, {
                id: "alerts",
                value: "Alerts",
                icon: "mdi mdi-bell-alert"
            }, {
                id: "logs",
                value: "Logs",
                icon: "mdi mdi-history"
            }, {
                id: "myjobs_main",
                value: "My jobs",
                icon: "mdi mdi-animation-play",
                data: [{
                    id: "myjobs",
                    icon: "mdi mdi-book-open",
                    value: "Jobs"
                }, {
                    id: "workers",
                    icon: "mdi mdi-worker",
                    value: "Workers"
                }]
            }, {
                id: "packages",
                value: "Packages",
                icon: "mdi mdi-package"
            }, {
                id: "codeserver",
                value: "Codeserver",
                icon: "mdi mdi-code-tags"
            }, {
                id: "jupyter",
                value: "Jupyter",
                icon: "mdi mdi-play"
            }, {
                id: "settings",
                value: "Settings",
                icon: "mdi mdi-settings"
            }]
        };

        var toolbar = {
            view: "toolbar",
            padding: 9,
            height: 58,
            cols: [{
                id: "button_show_menu",
                view: "icon",
                icon: "mdi mdi-menu",
                click: this.showMenu,
                hidden: true, // hidden by default
                tooltip: "Show menu"
            }, {
                view: "template",
                template: "<img class=\"webix_icon\" src=\"static/img/3bot.png\"/>",
                borderless: true,
                height: 40
            }, {
                id: "username_label",
                view: "label",
                label: "username",
                borderless: true,
                align: "right"
            }, {
                id: "user_icon",
                view: "icon",
                icon: "mdi mdi-account-circle",
                borderless: true,
                popup: "user_menu"
            }]
        };

        return {
            type: "clean",
            cols: [{
                rows: [header, sidebar]
            }, {
                rows: [toolbar, {
                    $subview: true
                }]
            }]
        };
    };

    TopView.prototype.showMenu = function showMenu() {
        this.$scope.menu.show();
        this.$scope.header.show();
        this.$scope.buttonHideMenu.show();

        this.$scope.buttonShowMenu.hide();
    };

    TopView.prototype.hideMenu = function hideMenu() {
        this.$scope.menu.hide();
        this.$scope.header.hide();
        this.$scope.buttonHideMenu.hide();

        this.$scope.buttonShowMenu.show();
    };

    TopView.prototype.init = function init() {
        var self = this;

        this.use(__WEBPACK_IMPORTED_MODULE_0_webix_jet__["c" /* plugins */].Menu, "menu");
        this.menu = this.$$("menu");
        this.header = this.$$("header");

        this.buttonShowMenu = this.$$("button_show_menu");
        this.buttonHideMenu = this.$$("button_hide_menu");

        this.webix.ui({
            view: "submenu",
            id: "user_menu",
            autowidth: true,
            data: []
        });

        this.userMenu = $$("user_menu");
        this.userMenu.attachEvent("onItemClick", function (id, e, node) {
            if (id == "logout") {
                window.location.href = "/auth/logout?next_url=/admin";
            }
        });

        this.usernameLabel = $$("username_label");

        webix.ajax().get("/auth/authenticated", function (data) {
            var info = JSON.parse(data);
            self.usernameLabel.config.label = info.username;
            self.usernameLabel.config.width = webix.html.getTextSize(info.username) + 10;
            self.usernameLabel.refresh();

            self.userMenu.add({ id: 'email', value: info.email });
            self.userMenu.add({ id: 'logout', value: "Logout" });
        });
    };

    return TopView;
}(__WEBPACK_IMPORTED_MODULE_0_webix_jet__["b" /* JetView */]);

/* harmony default export */ __webpack_exports__["default"] = (TopView);

/***/ }),
/* 30 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return myjobs; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__common_api__ = __webpack_require__(4);
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }



var BASE_URL = "/zerobot/myjobs_ui/actors/myjobs";

var MyjobsService = function (_Service) {
    _inherits(MyjobsService, _Service);

    function MyjobsService() {
        _classCallCheck(this, MyjobsService);

        return _possibleConstructorReturn(this, _Service.call(this, BASE_URL));
    }

    MyjobsService.prototype.listJobs = function listJobs() {
        return this.getCall("list_jobs");
    };

    MyjobsService.prototype.listWorkers = function listWorkers() {
        return this.getCall("list_workers");
    };

    return MyjobsService;
}(__WEBPACK_IMPORTED_MODULE_0__common_api__["a" /* Service */]);

var myjobs = new MyjobsService();

/***/ }),
/* 31 */
/***/ (function(module, exports) {



/***/ }),
/* 32 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__styles_app_css__ = __webpack_require__(33);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__styles_app_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__styles_app_css__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_webix_jet__ = __webpack_require__(0);
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }




var InventoryApp = function (_JetApp) {
	_inherits(InventoryApp, _JetApp);

	function InventoryApp(config) {
		_classCallCheck(this, InventoryApp);

		/* error tracking */
		var _this = _possibleConstructorReturn(this, _JetApp.call(this, webix.extend({
			id: "admin-app",
			version: "1.0.0",
			start: "/main/dash",
			debug: !false
		}, config, true)));

		_this.attachEvent("app:error:resolve", function (name, error) {
			window.console.error(error);
		});
		return _this;
	}

	return InventoryApp;
}(__WEBPACK_IMPORTED_MODULE_1_webix_jet__["a" /* JetApp */]);

/* harmony default export */ __webpack_exports__["default"] = (InventoryApp);

/***/ }),
/* 33 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./alerts": 6,
	"./alerts/": 6,
	"./alerts/alert": 17,
	"./alerts/alert.js": 17,
	"./alerts/data": 2,
	"./alerts/data.js": 2,
	"./alerts/index": 6,
	"./alerts/index.js": 6,
	"./codeserver": 7,
	"./codeserver/": 7,
	"./codeserver/index": 7,
	"./codeserver/index.js": 7,
	"./dash": 8,
	"./dash/": 8,
	"./dash/diskSpace": 24,
	"./dash/diskSpace.js": 24,
	"./dash/health": 25,
	"./dash/health.js": 25,
	"./dash/index": 8,
	"./dash/index.js": 8,
	"./dash/jsxInfo": 26,
	"./dash/jsxInfo.js": 26,
	"./dash/processes": 27,
	"./dash/processes.js": 27,
	"./dash/processesChildView": 18,
	"./dash/processesChildView.js": 18,
	"./dash/runningPorts": 28,
	"./dash/runningPorts.js": 28,
	"./errors/dialog": 19,
	"./errors/dialog.js": 19,
	"./external": 1,
	"./external/": 1,
	"./external/index": 1,
	"./external/index.js": 1,
	"./jupyter": 9,
	"./jupyter/": 9,
	"./jupyter/index": 9,
	"./jupyter/index.js": 9,
	"./logs": 10,
	"./logs/": 10,
	"./logs/appLogs": 20,
	"./logs/appLogs.js": 20,
	"./logs/index": 10,
	"./logs/index.js": 10,
	"./main": 29,
	"./main.js": 29,
	"./myjobs": 11,
	"./myjobs/": 11,
	"./myjobs/index": 11,
	"./myjobs/index.js": 11,
	"./packages": 12,
	"./packages/": 12,
	"./packages/index": 12,
	"./packages/index.js": 12,
	"./settings": 13,
	"./settings/": 13,
	"./settings/admins": 21,
	"./settings/admins.js": 21,
	"./settings/index": 13,
	"./settings/index.js": 13,
	"./wikis": 14,
	"./wikis/": 14,
	"./wikis/index": 14,
	"./wikis/index.js": 14,
	"./workers": 15,
	"./workers/": 15,
	"./workers/index": 15,
	"./workers/index.js": 15
};
function webpackContext(req) {
	return __webpack_require__(webpackContextResolve(req));
};
function webpackContextResolve(req) {
	var id = map[req];
	if(!(id + 1)) // check for number or string
		throw new Error("Cannot find module '" + req + "'.");
	return id;
};
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = 34;

/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/*  ansi_up.js
 *  author : Dru Nelson
 *  license : MIT
 *  http://github.com/drudru/ansi_up
 */
(function (root, factory) {
    if (true) {
        // AMD. Register as an anonymous module.
        !(__WEBPACK_AMD_DEFINE_ARRAY__ = [exports], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
    } else if ((typeof exports === 'undefined' ? 'undefined' : _typeof(exports)) === 'object' && typeof exports.nodeName !== 'string') {
        // CommonJS
        factory(exports);
    } else {
        // Browser globals
        var exp = {};
        factory(exp);
        root.AnsiUp = exp.default;
    }
})(this, function (exports) {
    "use strict";

    var __makeTemplateObject = this && this.__makeTemplateObject || function (cooked, raw) {
        if (Object.defineProperty) {
            Object.defineProperty(cooked, "raw", { value: raw });
        } else {
            cooked.raw = raw;
        }
        return cooked;
    };
    var PacketKind;
    (function (PacketKind) {
        PacketKind[PacketKind["EOS"] = 0] = "EOS";
        PacketKind[PacketKind["Text"] = 1] = "Text";
        PacketKind[PacketKind["Incomplete"] = 2] = "Incomplete";
        PacketKind[PacketKind["ESC"] = 3] = "ESC";
        PacketKind[PacketKind["Unknown"] = 4] = "Unknown";
        PacketKind[PacketKind["SGR"] = 5] = "SGR";
        PacketKind[PacketKind["OSCURL"] = 6] = "OSCURL";
    })(PacketKind || (PacketKind = {}));
    var AnsiUp = function () {
        function AnsiUp() {
            this.VERSION = "4.0.4";
            this.setup_palettes();
            this._use_classes = false;
            this._escape_for_html = true;
            this.bold = false;
            this.fg = this.bg = null;
            this._buffer = '';
            this._url_whitelist = { 'http': 1, 'https': 1 };
        }
        Object.defineProperty(AnsiUp.prototype, "use_classes", {
            get: function get() {
                return this._use_classes;
            },
            set: function set(arg) {
                this._use_classes = arg;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(AnsiUp.prototype, "escape_for_html", {
            get: function get() {
                return this._escape_for_html;
            },
            set: function set(arg) {
                this._escape_for_html = arg;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(AnsiUp.prototype, "url_whitelist", {
            get: function get() {
                return this._url_whitelist;
            },
            set: function set(arg) {
                this._url_whitelist = arg;
            },
            enumerable: true,
            configurable: true
        });
        AnsiUp.prototype.setup_palettes = function () {
            var _this = this;
            this.ansi_colors = [[{ rgb: [0, 0, 0], class_name: "ansi-black" }, { rgb: [187, 0, 0], class_name: "ansi-red" }, { rgb: [0, 187, 0], class_name: "ansi-green" }, { rgb: [187, 187, 0], class_name: "ansi-yellow" }, { rgb: [0, 0, 187], class_name: "ansi-blue" }, { rgb: [187, 0, 187], class_name: "ansi-magenta" }, { rgb: [0, 187, 187], class_name: "ansi-cyan" }, { rgb: [255, 255, 255], class_name: "ansi-white" }], [{ rgb: [85, 85, 85], class_name: "ansi-bright-black" }, { rgb: [255, 85, 85], class_name: "ansi-bright-red" }, { rgb: [0, 255, 0], class_name: "ansi-bright-green" }, { rgb: [255, 255, 85], class_name: "ansi-bright-yellow" }, { rgb: [85, 85, 255], class_name: "ansi-bright-blue" }, { rgb: [255, 85, 255], class_name: "ansi-bright-magenta" }, { rgb: [85, 255, 255], class_name: "ansi-bright-cyan" }, { rgb: [255, 255, 255], class_name: "ansi-bright-white" }]];
            this.palette_256 = [];
            this.ansi_colors.forEach(function (palette) {
                palette.forEach(function (rec) {
                    _this.palette_256.push(rec);
                });
            });
            var levels = [0, 95, 135, 175, 215, 255];
            for (var r = 0; r < 6; ++r) {
                for (var g = 0; g < 6; ++g) {
                    for (var b = 0; b < 6; ++b) {
                        var col = { rgb: [levels[r], levels[g], levels[b]], class_name: 'truecolor' };
                        this.palette_256.push(col);
                    }
                }
            }
            var grey_level = 8;
            for (var i = 0; i < 24; ++i, grey_level += 10) {
                var gry = { rgb: [grey_level, grey_level, grey_level], class_name: 'truecolor' };
                this.palette_256.push(gry);
            }
        };
        AnsiUp.prototype.escape_txt_for_html = function (txt) {
            return txt.replace(/[&<>]/gm, function (str) {
                if (str === "&") return "&amp;";
                if (str === "<") return "&lt;";
                if (str === ">") return "&gt;";
            });
        };
        AnsiUp.prototype.append_buffer = function (txt) {
            var str = this._buffer + txt;
            this._buffer = str;
        };
        AnsiUp.prototype.get_next_packet = function () {
            var pkt = {
                kind: PacketKind.EOS,
                text: '',
                url: ''
            };
            var len = this._buffer.length;
            if (len == 0) return pkt;
            var pos = this._buffer.indexOf("\x1B");
            if (pos == -1) {
                pkt.kind = PacketKind.Text;
                pkt.text = this._buffer;
                this._buffer = '';
                return pkt;
            }
            if (pos > 0) {
                pkt.kind = PacketKind.Text;
                pkt.text = this._buffer.slice(0, pos);
                this._buffer = this._buffer.slice(pos);
                return pkt;
            }
            if (pos == 0) {
                if (len == 1) {
                    pkt.kind = PacketKind.Incomplete;
                    return pkt;
                }
                var next_char = this._buffer.charAt(1);
                if (next_char != '[' && next_char != ']') {
                    pkt.kind = PacketKind.ESC;
                    pkt.text = this._buffer.slice(0, 1);
                    this._buffer = this._buffer.slice(1);
                    return pkt;
                }
                if (next_char == '[') {
                    if (!this._csi_regex) {
                        this._csi_regex = rgx(__makeTemplateObject(['\n                        ^                           # beginning of line\n                                                    #\n                                                    # First attempt\n                        (?:                         # legal sequence\n                          \x1B[                      # CSI\n                          ([<-?]?)              # private-mode char\n                          ([d;]*)                    # any digits or semicolons\n                          ([ -/]?               # an intermediate modifier\n                          [@-~])                # the command\n                        )\n                        |                           # alternate (second attempt)\n                        (?:                         # illegal sequence\n                          \x1B[                      # CSI\n                          [ -~]*                # anything legal\n                          ([\0-\x1F:])              # anything illegal\n                        )\n                    '], ["\n                        ^                           # beginning of line\n                                                    #\n                                                    # First attempt\n                        (?:                         # legal sequence\n                          \\x1b\\[                      # CSI\n                          ([\\x3c-\\x3f]?)              # private-mode char\n                          ([\\d;]*)                    # any digits or semicolons\n                          ([\\x20-\\x2f]?               # an intermediate modifier\n                          [\\x40-\\x7e])                # the command\n                        )\n                        |                           # alternate (second attempt)\n                        (?:                         # illegal sequence\n                          \\x1b\\[                      # CSI\n                          [\\x20-\\x7e]*                # anything legal\n                          ([\\x00-\\x1f:])              # anything illegal\n                        )\n                    "]));
                    }
                    var match = this._buffer.match(this._csi_regex);
                    if (match === null) {
                        pkt.kind = PacketKind.Incomplete;
                        return pkt;
                    }
                    if (match[4]) {
                        pkt.kind = PacketKind.ESC;
                        pkt.text = this._buffer.slice(0, 1);
                        this._buffer = this._buffer.slice(1);
                        return pkt;
                    }
                    if (match[1] != '' || match[3] != 'm') pkt.kind = PacketKind.Unknown;else pkt.kind = PacketKind.SGR;
                    pkt.text = match[2];
                    var rpos = match[0].length;
                    this._buffer = this._buffer.slice(rpos);
                    return pkt;
                }
                if (next_char == ']') {
                    if (len < 4) {
                        pkt.kind = PacketKind.Incomplete;
                        return pkt;
                    }
                    if (this._buffer.charAt(2) != '8' || this._buffer.charAt(3) != ';') {
                        pkt.kind = PacketKind.ESC;
                        pkt.text = this._buffer.slice(0, 1);
                        this._buffer = this._buffer.slice(1);
                        return pkt;
                    }
                    if (!this._osc_st) {
                        this._osc_st = rgxG(__makeTemplateObject(['\n                        (?:                         # legal sequence\n                          (\x1B\\)                    # ESC                           |                           # alternate\n                          (\x07)                      # BEL (what xterm did)\n                        )\n                        |                           # alternate (second attempt)\n                        (                           # illegal sequence\n                          [\0-\x06]                 # anything illegal\n                          |                           # alternate\n                          [\b-\x1A]                 # anything illegal\n                          |                           # alternate\n                          [\x1C-\x1F]                 # anything illegal\n                        )\n                    '], ["\n                        (?:                         # legal sequence\n                          (\\x1b\\\\)                    # ESC \\\n                          |                           # alternate\n                          (\\x07)                      # BEL (what xterm did)\n                        )\n                        |                           # alternate (second attempt)\n                        (                           # illegal sequence\n                          [\\x00-\\x06]                 # anything illegal\n                          |                           # alternate\n                          [\\x08-\\x1a]                 # anything illegal\n                          |                           # alternate\n                          [\\x1c-\\x1f]                 # anything illegal\n                        )\n                    "]));
                    }
                    this._osc_st.lastIndex = 0;
                    {
                        var match_1 = this._osc_st.exec(this._buffer);
                        if (match_1 === null) {
                            pkt.kind = PacketKind.Incomplete;
                            return pkt;
                        }
                        if (match_1[3]) {
                            pkt.kind = PacketKind.ESC;
                            pkt.text = this._buffer.slice(0, 1);
                            this._buffer = this._buffer.slice(1);
                            return pkt;
                        }
                    }
                    {
                        var match_2 = this._osc_st.exec(this._buffer);
                        if (match_2 === null) {
                            pkt.kind = PacketKind.Incomplete;
                            return pkt;
                        }
                        if (match_2[3]) {
                            pkt.kind = PacketKind.ESC;
                            pkt.text = this._buffer.slice(0, 1);
                            this._buffer = this._buffer.slice(1);
                            return pkt;
                        }
                    }
                    if (!this._osc_regex) {
                        this._osc_regex = rgx(__makeTemplateObject(['\n                        ^                           # beginning of line\n                                                    #\n                        \x1B]8;                    # OSC Hyperlink\n                        [ -:<-~]*       # params (excluding ;)\n                        ;                           # end of params\n                        ([!-~]{0,512})        # URL capture\n                        (?:                         # ST\n                          (?:\x1B\\)                  # ESC                           |                           # alternate\n                          (?:\x07)                    # BEL (what xterm did)\n                        )\n                        ([!-~]+)              # TEXT capture\n                        \x1B]8;;                   # OSC Hyperlink End\n                        (?:                         # ST\n                          (?:\x1B\\)                  # ESC                           |                           # alternate\n                          (?:\x07)                    # BEL (what xterm did)\n                        )\n                    '], ["\n                        ^                           # beginning of line\n                                                    #\n                        \\x1b\\]8;                    # OSC Hyperlink\n                        [\\x20-\\x3a\\x3c-\\x7e]*       # params (excluding ;)\n                        ;                           # end of params\n                        ([\\x21-\\x7e]{0,512})        # URL capture\n                        (?:                         # ST\n                          (?:\\x1b\\\\)                  # ESC \\\n                          |                           # alternate\n                          (?:\\x07)                    # BEL (what xterm did)\n                        )\n                        ([\\x21-\\x7e]+)              # TEXT capture\n                        \\x1b\\]8;;                   # OSC Hyperlink End\n                        (?:                         # ST\n                          (?:\\x1b\\\\)                  # ESC \\\n                          |                           # alternate\n                          (?:\\x07)                    # BEL (what xterm did)\n                        )\n                    "]));
                    }
                    var match = this._buffer.match(this._osc_regex);
                    if (match === null) {
                        pkt.kind = PacketKind.ESC;
                        pkt.text = this._buffer.slice(0, 1);
                        this._buffer = this._buffer.slice(1);
                        return pkt;
                    }
                    pkt.kind = PacketKind.OSCURL;
                    pkt.url = match[1];
                    pkt.text = match[2];
                    var rpos = match[0].length;
                    this._buffer = this._buffer.slice(rpos);
                    return pkt;
                }
            }
        };
        AnsiUp.prototype.ansi_to_html = function (txt) {
            this.append_buffer(txt);
            var blocks = [];
            while (true) {
                var packet = this.get_next_packet();
                if (packet.kind == PacketKind.EOS || packet.kind == PacketKind.Incomplete) break;
                if (packet.kind == PacketKind.ESC || packet.kind == PacketKind.Unknown) continue;
                if (packet.kind == PacketKind.Text) blocks.push(this.transform_to_html(this.with_state(packet)));else if (packet.kind == PacketKind.SGR) this.process_ansi(packet);else if (packet.kind == PacketKind.OSCURL) blocks.push(this.process_hyperlink(packet));
            }
            return blocks.join("");
        };
        AnsiUp.prototype.with_state = function (pkt) {
            return { bold: this.bold, fg: this.fg, bg: this.bg, text: pkt.text };
        };
        AnsiUp.prototype.process_ansi = function (pkt) {
            var sgr_cmds = pkt.text.split(';');
            while (sgr_cmds.length > 0) {
                var sgr_cmd_str = sgr_cmds.shift();
                var num = parseInt(sgr_cmd_str, 10);
                if (isNaN(num) || num === 0) {
                    this.fg = this.bg = null;
                    this.bold = false;
                } else if (num === 1) {
                    this.bold = true;
                } else if (num === 22) {
                    this.bold = false;
                } else if (num === 39) {
                    this.fg = null;
                } else if (num === 49) {
                    this.bg = null;
                } else if (num >= 30 && num < 38) {
                    this.fg = this.ansi_colors[0][num - 30];
                } else if (num >= 40 && num < 48) {
                    this.bg = this.ansi_colors[0][num - 40];
                } else if (num >= 90 && num < 98) {
                    this.fg = this.ansi_colors[1][num - 90];
                } else if (num >= 100 && num < 108) {
                    this.bg = this.ansi_colors[1][num - 100];
                } else if (num === 38 || num === 48) {
                    if (sgr_cmds.length > 0) {
                        var is_foreground = num === 38;
                        var mode_cmd = sgr_cmds.shift();
                        if (mode_cmd === '5' && sgr_cmds.length > 0) {
                            var palette_index = parseInt(sgr_cmds.shift(), 10);
                            if (palette_index >= 0 && palette_index <= 255) {
                                if (is_foreground) this.fg = this.palette_256[palette_index];else this.bg = this.palette_256[palette_index];
                            }
                        }
                        if (mode_cmd === '2' && sgr_cmds.length > 2) {
                            var r = parseInt(sgr_cmds.shift(), 10);
                            var g = parseInt(sgr_cmds.shift(), 10);
                            var b = parseInt(sgr_cmds.shift(), 10);
                            if (r >= 0 && r <= 255 && g >= 0 && g <= 255 && b >= 0 && b <= 255) {
                                var c = { rgb: [r, g, b], class_name: 'truecolor' };
                                if (is_foreground) this.fg = c;else this.bg = c;
                            }
                        }
                    }
                }
            }
        };
        AnsiUp.prototype.transform_to_html = function (fragment) {
            var txt = fragment.text;
            if (txt.length === 0) return txt;
            if (this._escape_for_html) txt = this.escape_txt_for_html(txt);
            if (!fragment.bold && fragment.fg === null && fragment.bg === null) return txt;
            var styles = [];
            var classes = [];
            var fg = fragment.fg;
            var bg = fragment.bg;
            if (fragment.bold) styles.push('font-weight:bold');
            if (!this._use_classes) {
                if (fg) styles.push("color:rgb(" + fg.rgb.join(',') + ")");
                if (bg) styles.push("background-color:rgb(" + bg.rgb + ")");
            } else {
                if (fg) {
                    if (fg.class_name !== 'truecolor') {
                        classes.push(fg.class_name + "-fg");
                    } else {
                        styles.push("color:rgb(" + fg.rgb.join(',') + ")");
                    }
                }
                if (bg) {
                    if (bg.class_name !== 'truecolor') {
                        classes.push(bg.class_name + "-bg");
                    } else {
                        styles.push("background-color:rgb(" + bg.rgb.join(',') + ")");
                    }
                }
            }
            var class_string = '';
            var style_string = '';
            if (classes.length) class_string = " class=\"" + classes.join(' ') + "\"";
            if (styles.length) style_string = " style=\"" + styles.join(';') + "\"";
            return "<span" + style_string + class_string + ">" + txt + "</span>";
        };
        ;
        AnsiUp.prototype.process_hyperlink = function (pkt) {
            var parts = pkt.url.split(':');
            if (parts.length < 1) return '';
            if (!this._url_whitelist[parts[0]]) return '';
            var result = "<a href=\"" + this.escape_txt_for_html(pkt.url) + "\">" + this.escape_txt_for_html(pkt.text) + "</a>";
            return result;
        };
        return AnsiUp;
    }();
    function rgx(tmplObj) {
        var subst = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            subst[_i - 1] = arguments[_i];
        }
        var regexText = tmplObj.raw[0];
        var wsrgx = /^\s+|\s+\n|\s*#[\s\S]*?\n|\n/gm;
        var txt2 = regexText.replace(wsrgx, '');
        return new RegExp(txt2);
    }
    function rgxG(tmplObj) {
        var subst = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            subst[_i - 1] = arguments[_i];
        }
        var regexText = tmplObj.raw[0];
        var wsrgx = /^\s+|\s+\n|\s*#[\s\S]*?\n|\n/gm;
        var txt2 = regexText.replace(wsrgx, '');
        return new RegExp(txt2, 'g');
    }
    //# sourceMappingURL=ansi_up.js.map
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = AnsiUp;
});

/***/ }),
/* 36 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return alerts; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__common_api__ = __webpack_require__(4);
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }



var BASE_URL = "/zerobot/alerta/actors/alerta";

var AlertsService = function (_Service) {
    _inherits(AlertsService, _Service);

    function AlertsService() {
        _classCallCheck(this, AlertsService);

        return _possibleConstructorReturn(this, _Service.call(this, BASE_URL));
    }

    AlertsService.prototype.list = function list() {
        return this.getCall("list_alerts");
    };

    AlertsService.prototype.delete = function _delete(identifiers) {
        return this.postCall("delete_alerts", {
            identifiers: identifiers
        });
    };

    return AlertsService;
}(__WEBPACK_IMPORTED_MODULE_0__common_api__["a" /* Service */]);

var alerts = new AlertsService();

/***/ }),
/* 37 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return logs; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__common_api__ = __webpack_require__(4);
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }



var BASE_URL = "/zerobot/admin/actors/logs";

var LogsService = function (_Service) {
    _inherits(LogsService, _Service);

    function LogsService() {
        _classCallCheck(this, LogsService);

        return _possibleConstructorReturn(this, _Service.call(this, BASE_URL));
    }

    LogsService.prototype.listApps = function listApps() {
        return this.getCall("list_apps");
    };

    LogsService.prototype.list = function list(appName, logId) {
        return this.postCall("list", {
            appname: appName,
            id_from: logId
        });
    };

    return LogsService;
}(__WEBPACK_IMPORTED_MODULE_0__common_api__["a" /* Service */]);

var logs = new LogsService();

/***/ }),
/* 38 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = inputDialog;
function inputDialog(head, label, buttonLabel, callback) {
    var window = webix.ui({
        view: "window",
        height: 200,
        width: 300,
        modal: true,
        position: "center",
        head: head || "Input",
        body: {
            view: "form",
            elements: [{
                id: "input_dialog_text",
                view: "text",
                name: "input",
                label: label || "Value"
            }, {
                cols: [{
                    view: "button",
                    label: "Cancel",
                    click: function click() {
                        return window.hide();
                    },
                    css: "webix_danger"
                }, {
                    view: "button",
                    label: buttonLabel || "Ok",
                    click: handleInput,
                    css: "webix_primary"
                }]
            }]
        }
    });

    function handleInput() {
        var value = this.getFormView().elements.input.getValue().trim();
        if (!value) {
            return;
        }

        if (callback instanceof Function) {
            callback(value);
        }

        window.hide();
    }

    var textInput = $$("input_dialog_text");
    textInput.attachEvent("onEnter", handleInput.bind(textInput));

    window.show();
    webix.UIManager.setFocus(textInput);
}

/***/ }),
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./en": 31,
	"./en.js": 31
};
function webpackContext(req) {
	return __webpack_require__(webpackContextResolve(req));
};
function webpackContextResolve(req) {
	var id = map[req];
	if(!(id + 1)) // check for number or string
		throw new Error("Cannot find module '" + req + "'.");
	return id;
};
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = 39;

/***/ })
/******/ ])["default"];
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgN2YxNDJmY2QxNDJjNDczNjQ3NzkiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3dlYml4LWpldC9kaXN0L2VzNi9qZXQuanMiLCJ3ZWJwYWNrOi8vLy4vc291cmNlcy92aWV3cy9leHRlcm5hbC9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9zb3VyY2VzL3ZpZXdzL2FsZXJ0cy9kYXRhLmpzIiwid2VicGFjazovLy8uL3NvdXJjZXMvY29tbW9uL2Zvcm1hdHRlcnMuanMiLCJ3ZWJwYWNrOi8vLy4vc291cmNlcy9jb21tb24vYXBpLmpzIiwid2VicGFjazovLy8uL3NvdXJjZXMvc2VydmljZXMvaGVhbHRoLmpzIiwid2VicGFjazovLy8uL3NvdXJjZXMvdmlld3MvYWxlcnRzL2luZGV4LmpzIiwid2VicGFjazovLy8uL3NvdXJjZXMvdmlld3MvY29kZXNlcnZlci9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9zb3VyY2VzL3ZpZXdzL2Rhc2gvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vc291cmNlcy92aWV3cy9qdXB5dGVyL2luZGV4LmpzIiwid2VicGFjazovLy8uL3NvdXJjZXMvdmlld3MvbG9ncy9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9zb3VyY2VzL3ZpZXdzL215am9icy9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9zb3VyY2VzL3ZpZXdzL3BhY2thZ2VzL2luZGV4LmpzIiwid2VicGFjazovLy8uL3NvdXJjZXMvdmlld3Mvc2V0dGluZ3MvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vc291cmNlcy92aWV3cy93aWtpcy9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9zb3VyY2VzL3ZpZXdzL3dvcmtlcnMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vc291cmNlcy9jb21tb24vY29sb3JzLmpzIiwid2VicGFjazovLy8uL3NvdXJjZXMvdmlld3MvYWxlcnRzL2FsZXJ0LmpzIiwid2VicGFjazovLy8uL3NvdXJjZXMvdmlld3MvZGFzaC9wcm9jZXNzZXNDaGlsZFZpZXcuanMiLCJ3ZWJwYWNrOi8vLy4vc291cmNlcy92aWV3cy9lcnJvcnMvZGlhbG9nLmpzIiwid2VicGFjazovLy8uL3NvdXJjZXMvdmlld3MvbG9ncy9hcHBMb2dzLmpzIiwid2VicGFjazovLy8uL3NvdXJjZXMvdmlld3Mvc2V0dGluZ3MvYWRtaW5zLmpzIiwid2VicGFjazovLy8uL3NvdXJjZXMvY29tbW9uL2ZpbHRlcnMuanMiLCJ3ZWJwYWNrOi8vLy4vc291cmNlcy9zZXJ2aWNlcy9wYWNrYWdlcy5qcyIsIndlYnBhY2s6Ly8vLi9zb3VyY2VzL3ZpZXdzL2Rhc2gvZGlza1NwYWNlLmpzIiwid2VicGFjazovLy8uL3NvdXJjZXMvdmlld3MvZGFzaC9oZWFsdGguanMiLCJ3ZWJwYWNrOi8vLy4vc291cmNlcy92aWV3cy9kYXNoL2pzeEluZm8uanMiLCJ3ZWJwYWNrOi8vLy4vc291cmNlcy92aWV3cy9kYXNoL3Byb2Nlc3Nlcy5qcyIsIndlYnBhY2s6Ly8vLi9zb3VyY2VzL3ZpZXdzL2Rhc2gvcnVubmluZ1BvcnRzLmpzIiwid2VicGFjazovLy8uL3NvdXJjZXMvdmlld3MvbWFpbi5qcyIsIndlYnBhY2s6Ly8vLi9zb3VyY2VzL3NlcnZpY2VzL215am9icy5qcyIsIndlYnBhY2s6Ly8vLi9zb3VyY2VzL2FwcC5qcyIsIndlYnBhY2s6Ly8vLi9zb3VyY2VzL3N0eWxlcy9hcHAuY3NzIiwid2VicGFjazovLy8uL3NvdXJjZXMvdmlld3MgXlxcLlxcLy4qJCIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvYW5zaV91cC9hbnNpX3VwLmpzIiwid2VicGFjazovLy8uL3NvdXJjZXMvc2VydmljZXMvYWxlcnRzLmpzIiwid2VicGFjazovLy8uL3NvdXJjZXMvc2VydmljZXMvbG9ncy5qcyIsIndlYnBhY2s6Ly8vLi9zb3VyY2VzL2NvbW1vbi9kaWFsb2dzLmpzIiwid2VicGFjazovLy8uL3NvdXJjZXMvbG9jYWxlcyBeXFwuXFwvLiokIl0sIm5hbWVzIjpbIk5hdmlnYXRpb25CbG9ja2VkIiwiSmV0QmFzZSIsIndlYml4Iiwid2ViaXhKZXQiLCJfZXZlbnRzIiwiX3N1YnMiLCJfZGF0YSIsImdldFJvb3QiLCJfcm9vdCIsImRlc3RydWN0b3IiLCJfZGV0YWNoRXZlbnRzIiwiX2Rlc3Ryb3lTdWJzIiwiX2NvbnRhaW5lciIsImFwcCIsIl9wYXJlbnQiLCJzZXRQYXJhbSIsImlkIiwidmFsdWUiLCJ1cmwiLCJfc2VnbWVudCIsInVwZGF0ZSIsInNob3ciLCJnZXRQYXJhbSIsInBhcmVudCIsInZpZXciLCJnZXRQYXJlbnRWaWV3IiwiZ2V0VXJsIiwic3VidXJsIiwiZ2V0VXJsU3RyaW5nIiwidG9TdHJpbmciLCIkJCIsInJvb3QiLCJxdWVyeVZpZXciLCJvYmoiLCJjb25maWciLCJsb2NhbElkIiwiJHNjb3BlIiwib24iLCJuYW1lIiwiY29kZSIsImF0dGFjaEV2ZW50IiwicHVzaCIsImNvbnRhaW5zIiwia2V5Iiwia2lkIiwiZ2V0U3ViVmlldyIsInN1YiIsImdldFN1YlZpZXdJbmZvIiwic3VidmlldyIsInBvcHVwIiwiZXZlbnRzIiwiaSIsImxlbmd0aCIsImRldGFjaEV2ZW50Iiwic3ViVmlldyIsIl9pbml0X3VybF9kYXRhIiwiY3VycmVudCIsImV4dGVuZCIsInBhcmFtcyIsIl9nZXREZWZhdWx0U3ViIiwiZGVmYXVsdCIsImJyYW5jaCIsImNoaWxkIiwiX3JvdXRlZF92aWV3IiwicGFyc2UiLCJzdWJzdHIiLCJwYXJ0cyIsInNwbGl0IiwiY2h1bmtzIiwidGVzdCIsInJlc3VsdCIsInBvcyIsImluZGV4T2YiLCJwYXJhbSIsImRjaHVuayIsImRlY29kZVVSSUNvbXBvbmVudCIsInBhZ2UiLCJpc05ldyIsInVybDJzdHIiLCJzdGFjayIsImNodW5rIiwib2JqMnN0ciIsImpvaW4iLCJzdHIiLCJlbmNvZGVVUklDb21wb25lbnQiLCJSb3V0ZSIsInJvdXRlIiwiaW5kZXgiLCJfbmV4dCIsInBhdGgiLCJuZXh0Iiwic2xpY2UiLCJzaGlmdCIsInJlZnJlc2giLCJfam9pbiIsImtpZHMiLCJvbGQiLCJjb25jYXQiLCJhcHBlbmQiLCJQcm9taXNlIiwicmVzIiwicmVqIiwicmVkaXJlY3QiLCJjb25maXJtIiwicmVzb2x2ZSIsImNhbGxFdmVudCIsImNhdGNoIiwiZXJyIiwidGhlbiIsInNpemUiLCJuIiwiSmV0VmlldyIsIl9jaGlsZHJlbiIsInVpIiwiY29udGFpbmVyIiwiamV0dmlldyIsImNyZWF0ZVZpZXciLCJyZW5kZXIiLCJ0YXJnZXQiLCJfcmVuZGVyRnJhbWVMb2NrIiwiX3Nob3ciLCJzZWdtZW50IiwiX3VybENoYW5nZSIsImxpbmtSb3V0ZXIiLCJnZXRSb3V0ZXIiLCJzZXQiLCJzaWxlbnQiLCJpbml0IiwiXyR2aWV3IiwiXyQiLCJyZWFkeSIsIl8kdXJsIiwibWVzc2FnZSIsInVybENoYW5nZSIsImRlc3Ryb3kiLCJfZGVzdHJveUtpZHMiLCJ1c2UiLCJwbHVnaW4iLCJ0YWdOYW1lIiwiX3JlbmRlciIsImRvY3VtZW50IiwiYm9keSIsInRvTm9kZSIsIl9yZW5kZXJfZmluYWwiLCJjZmciLCJzbG90IiwicmVqZWN0IiwicmVzcG9uc2UiLCJjb3B5Q29uZmlnIiwib2xkdWkiLCJhc1dpbiIsInNldFBvc2l0aW9uIiwiaXNWaXNpYmxlIiwiX2luaXQiLCJfaW5pdFVybCIsImUiLCJfaW5pdEVycm9yIiwid2FpdHMiLCJmcmFtZSIsIndhaXQiLCJhbGwiLCJsb2NrIiwiX3JlbmRlckZyYW1lIiwiX2NyZWF0ZVN1YlZpZXciLCJlcnJvciIsImNyZWF0ZUZyb21VUkwiLCJ1aXMiLCJKZXRWaWV3UmF3IiwiX3VpIiwiU3ViUm91dGVyIiwiY2IiLCJhIiwiZ2V0IiwiX29uY2UiLCJKZXRBcHBCYXNlIiwid2luZG93IiwidmVyc2lvbiIsInN0YXJ0IiwiX3NlcnZpY2VzIiwiRXZlbnRTeXN0ZW0iLCJfc3ViU2VnbWVudCIsImdldFNlcnZpY2UiLCJzZXRTZXJ2aWNlIiwiaGFuZGxlciIsInByb3RvdHlwZSIsIiRzdWJ2aWV3IiwiYWRkU3ViVmlldyIsIkFycmF5IiwibWV0aG9kIiwicG9pbnQiLCJEYXRhQ29sbGVjdGlvbiIsIlJlZ0V4cCIsIkRhdGUiLCJjb3B5IiwiJHJvdXRlciIsImNsaWNrSGFuZGxlciIsInNyY0VsZW1lbnQiLCJnZXRBdHRyaWJ1dGUiLCJ0cmlnZ2VyIiwiX2ZvclZpZXciLCJjYW5jZWxCdWJibGUiLCJwcmV2ZW50RGVmYXVsdCIsInBhcmVudE5vZGUiLCJsb2FkVmlldyIsInZpZXdzIiwiX2xvYWRFcnJvciIsIkVycm9yIiwiX2xvYWRWaWV3RHluYW1pYyIsIm1vZHVsZSIsIl9fZXNNb2R1bGUiLCJyb3V0ZXIiLCJyZXN0IiwiYXBwbHkiLCJkYXRhIiwiYWN0aW9uIiwiYmluZCIsImVyIiwiZGVidWciLCJjb25zb2xlIiwidGV4dCIsInJlcGxhY2UiLCJpbm5lckhUTUwiLCJ0eXBlIiwiZXhwaXJlIiwiZmlyc3RJbml0IiwiZXZlbnQiLCJfZmlyc3Rfc3RhcnQiLCJ0b3AiLCJiYXNlIiwic2V0VGltZW91dCIsImFuaW1hdGlvbiIsIm5vZGUiLCJodG1sIiwiYWRkQ3NzIiwicmVtb3ZlQ3NzIiwidXJsU3RyaW5nIiwidGVtcGxhdGUiLCJ1aWQiLCJIYXNoUm91dGVyIiwiX2RldGVjdFByZWZpeCIsIm9ucG9wc3RhdGUiLCJyb3V0ZXMiLCJjb21wYXJlIiwiaGlzdG9yeSIsInB1c2hTdGF0ZSIsInByZWZpeCIsInN1Zml4IiwiX2dldFJhdyIsInJvdXRlclByZWZpeCIsImxvY2F0aW9uIiwiaHJlZiIsImlzUGF0Y2hlZCIsInBhdGNoIiwidyIsIndpbiIsInByb21pc2UiLCJmcmVlemUiLCJzb21lIiwiJGZyZWV6ZSIsInJlc2l6ZSIsImJhc2VBZGQiLCJiYXNlbGF5b3V0IiwiYWRkVmlldyIsImJhc2VSZW1vdmUiLCJyZW1vdmVWaWV3IiwianZpZXciLCJzdWJzIiwiYXJndW1lbnRzIiwibGF5b3V0IiwicHJvdG9VSSIsIiRpbml0IiwiJGFwcCIsIiRyZWFkeSIsIm9yaWdpbiIsInByb3h5IiwiSmV0QXBwIiwicmVxdWlyZSIsIlN0b3JlUm91dGVyIiwic3RvcmFnZSIsInNlc3Npb24iLCJzdG9yZU5hbWUiLCJwdXQiLCJVcmxSb3V0ZXIiLCJwYXRobmFtZSIsInNlYXJjaCIsIkVtcHR5Um91dGVyIiwiXyRjb25maWciLCJVbmxvYWRHdWFyZCIsImhhcyIsInN0b3JlIiwiT2JqZWN0IiwiaGFzT3duUHJvcGVydHkiLCJjYWxsIiwiZm9yRWFjaCIsImNvbnRleHQiLCJ0cmltIiwid2FybiIsIngiLCJTdHJpbmciLCJkZWxpbWl0ZXIiLCJydXNzaWFuUGx1cmFsR3JvdXBzIiwiZW5kIiwicGx1cmFsVHlwZXMiLCJhcmFiaWMiLCJsYXN0VHdvIiwiYm9zbmlhbl9zZXJiaWFuIiwiY2hpbmVzZSIsImNyb2F0aWFuIiwiZnJlbmNoIiwiZ2VybWFuIiwicnVzc2lhbiIsImxpdGh1YW5pYW4iLCJjemVjaCIsInBvbGlzaCIsImljZWxhbmRpYyIsInNsb3ZlbmlhbiIsInBsdXJhbFR5cGVUb0xhbmd1YWdlcyIsImxhbmdUb1R5cGVNYXAiLCJtYXBwaW5nIiwicmV0IiwibGFuZ3MiLCJsYW5nIiwicGx1cmFsVHlwZU5hbWUiLCJsb2NhbGUiLCJsYW5nVG9QbHVyYWxUeXBlIiwiZW4iLCJwbHVyYWxUeXBlSW5kZXgiLCJjb3VudCIsImVzY2FwZSIsInRva2VuIiwiY29uc3RydWN0VG9rZW5SZWdleCIsIm9wdHMiLCJzdWZmaXgiLCJSYW5nZUVycm9yIiwiZG9sbGFyUmVnZXgiLCJkb2xsYXJCaWxsc1lhbGwiLCJkZWZhdWx0VG9rZW5SZWdleCIsInRyYW5zZm9ybVBocmFzZSIsInBocmFzZSIsInN1YnN0aXR1dGlvbnMiLCJ0b2tlblJlZ2V4IiwiVHlwZUVycm9yIiwiaW50ZXJwb2xhdGlvblJlZ2V4Iiwib3B0aW9ucyIsInNtYXJ0X2NvdW50IiwidGV4dHMiLCJleHByZXNzaW9uIiwiYXJndW1lbnQiLCJQb2x5Z2xvdCIsInBocmFzZXMiLCJjdXJyZW50TG9jYWxlIiwiYWxsb3dNaXNzaW5nIiwib25NaXNzaW5nS2V5IiwiaW50ZXJwb2xhdGlvbiIsIm5ld0xvY2FsZSIsIm1vcmVQaHJhc2VzIiwicHJlZml4ZWRLZXkiLCJ1bnNldCIsImNsZWFyIiwibmV3UGhyYXNlcyIsInQiLCJfIiwidHJhbnNmb3JtIiwid2ViaXhQb2x5Z2xvdCIsIkxvY2FsZSIsIl92aWV3Iiwic2V0TGFuZ0RhdGEiLCJwY29uZmlnIiwicG9seWdsb3QiLCJwb2x5Iiwic2VydmljZSIsImxvY05hbWUiLCJpMThuIiwic2V0TG9jYWxlIiwiZ2V0TGFuZyIsInNldExhbmciLCJ1cmxzIiwiTWVudSIsImdldFZhbHVlIiwic2V0VmFsdWUiLCJnZXRTZWxlY3RlZElkIiwic2VsZWN0IiwiZXhpc3RzIiwiYmFzZWljb25zIiwiZ29vZCIsInNhdmluZyIsImJhc2V0ZXh0IiwiU3RhdHVzIiwic3RhdHVzIiwiaXNlcnJvciIsImV4cGlyZURlbGF5IiwiaWNvbnMiLCJjb250ZW50IiwiYXJlYSIsInNldEhUTUwiLCJzdWNjZXNzIiwic2V0U3RhdHVzIiwiZmFpbCIsImdldFN0YXR1cyIsImhpZGVTdGF0dXMiLCJtb2RlIiwicmVzcG9uc2VUZXh0IiwidHJhY2siLCJkcCIsIl9pZCIsIl9vYmoiLCJyZW1vdGUiLCJhamF4IiwiX21vZGUiLCJfdXJsIiwiX3JlcXVlc3QiLCJfaGVhZGVycyIsIl9maWxlcyIsIlRoZW1lIiwidGhlbWUiLCJnZXRUaGVtZSIsInNldFRoZW1lIiwibGlua3MiLCJnZXRFbGVtZW50c0J5VGFnTmFtZSIsImxuYW1lIiwiZGlzYWJsZWQiLCJza2luIiwiY29weVBhcmFtcyIsIlVybFBhcmFtIiwib3MiLCJvZyIsInZhbCIsIlVzZXIiLCJsb2dpbiIsImxvZ291dCIsImFmdGVyTG9naW4iLCJhZnRlckxvZ291dCIsInBpbmciLCJtb2RlbCIsInVzZXIiLCJnZXRVc2VyIiwic2VydmVyIiwicGFzcyIsImNhbk5hdmlnYXRlIiwiXyRyb290IiwicHVibGljIiwic2V0SW50ZXJ2YWwiLCJwbHVnaW5zIiwiZXJyb3JzIiwiU1RBVFVTX0lOU1RBTExFRCIsIkV4dGVybmFsVmlldyIsInRhcmdldFVybCIsInJlcXVpcmVkUGFja2FnZXMiLCJpZnJhbWUiLCJvbkFmdGVyTG9hZCIsImhpZGVQcm9ncmVzcyIsImVuYWJsZSIsIm5hbWVzIiwia2V5cyIsInJvd3MiLCJoaWRkZW4iLCJjb2xzIiwiYXV0b2hlaWdodCIsImNzcyIsImhlaWdodCIsImNsaWNrIiwiaW5zdGFsbFJlcXVpcmVkUGFja2FnZXMiLCJwcm9taXNlcyIsIm1hcCIsInBhY2thZ2VzIiwiYWRkIiwiaW5zdGFsbEJ1dHRvbiIsImRpc2FibGUiLCJyZWxvYWQiLCJpbnN0YWxsUGFja2FnZUNvbnRhaW5lciIsImV4dGVybmFsSWZyYW1lIiwiUHJvZ3Jlc3NCYXIiLCJzaG93UHJvZ3Jlc3MiLCJsb2FkIiwibGlzdCIsImFsbFBhY2thZ2VzIiwianNvbiIsInAiLCJyZXF1aXJlZFBhY2thZ2UiLCJoaWRlIiwiTUFYX01TR19MRU4iLCJMRVZFTFMiLCJTVEFURVMiLCJUWVBFUyIsImRhdGVGb3JtYXQiLCJ3ZWJpeERhdGVGb3JtYXR0ZXIiLCJkYXRlVG9TdHIiLCJkYXRlRm9ybWF0dGVyIiwicGFyc2VJbnQiLCJoZWFkZXJzIiwiU2VydmljZSIsImJhc2VVcmwiLCJqb2luVXJsIiwiYXJncyIsInRvTG93ZXJDYXNlIiwicG9zdCIsIlZhbHVlRXJyb3IiLCJnZXRDYWxsIiwicG9zdENhbGwiLCJCQVNFX1VSTCIsIkhlYWx0aFNlcnZpY2UiLCJnZXREaXNrU3BhY2UiLCJnZXRIZWFsdGgiLCJnZXRJZGVudGl0eSIsImdldE5ldHdvcmtJbmZvIiwiZ2V0SnN4VmVyc2lvbiIsImdldFJ1bm5pbmdQcm9jZXNzZXMiLCJnZXRSdW5uaW5nUG9ydHMiLCJoZWFsdGgiLCJBbGVydHNWaWV3IiwicmVzaXplQ29sdW1uIiwibXVsdGlzZWxlY3QiLCJzY3JvbGwiLCJjb2x1bW5zIiwiaGVhZGVyIiwic29ydCIsImF1dG93aWR0aCIsImZvcm1hdCIsIndpZHRoIiwiY3JlYXRlRmlsdGVyT3B0aW9ucyIsImZpbGxzcGFjZSIsImFuc2lVcCIsImFuc2lfdG9faHRtbCIsImF1dG9Db25maWciLCJzY2hlbWUiLCJkZWxldGVJdGVtIiwib2JqZWN0cyIsInNlbGYiLCJpdGVtcyIsImlkcyIsImluZGV4ZXMiLCJpdGVtIiwidGFibGUiLCJnZXRJdGVtIiwidGl0bGUiLCJvayIsImNhbmNlbCIsImlkZW50aWZpZXJzIiwiaWRlbnRpZmllciIsImFsZXJ0cyIsImRlbGV0ZSIsInJlbW92ZSIsInZpZXdJdGVtIiwiYWxlcnRWaWV3Iiwic2hvd0ZvciIsIkFsZXJ0VmlldyIsImNsZWFyQWxsIiwiYXR0YWNoVG8iLCJDT0RFX1VSTCIsIlJFUVVJUkVEX1BBQ0tBR0VTIiwiQ29kZXNlcnZlclZpZXciLCJUb3BWaWV3IiwicmVzcG9uc2l2ZSIsIlVSTCIsIkp1cHl0ZXJWaWV3IiwiTG9nc1ZpZXciLCJwbGFjZWhvbGRlciIsIm9uQ2hhbmdlIiwiYXBwTmFtZSIsIkFwcExvZ3NWaWV3IiwiYXBwc0NvbWJvIiwibG9ncyIsImxpc3RBcHBzIiwiZGVmaW5lIiwiYXBwbmFtZSIsImxvZ0lkIiwibG9naWQiLCJhcHBMb2dzIiwiSm9ic1ZpZXciLCJKU09OIiwic3RyaW5naWZ5IiwibXlqb2JzIiwibGlzdEpvYnMiLCJVTktOT1dOX1NUQVRVUyIsIlBBQ0tBR0VfU1RBVEVTIiwiYWN0aW9ucyIsIlBhY2thZ2VzVmlldyIsImdyaWQiLCJpbnB1dEFsaWduIiwib25Db250ZXh0Iiwic2hvd0Vycm9yIiwiZXJyb3JWaWV3IiwiaGFuZGxlUmVzdWx0IiwiY2FsbGJhY2siLCJwYWNrYWdlVGFibGUiLCJGdW5jdGlvbiIsImFkZFBhY2thZ2UiLCJnaXRVcmwiLCJkZWxldGVQYWNrYWdlIiwicGFja2FnZU5hbWUiLCJlbGVtZW50SUQiLCJzdGFydFBhY2thZ2UiLCJzdG9wUGFja2FnZSIsInN0b3AiLCJlbmFibGVQYWNrYWdlIiwiZGlzYWJsZVBhY2thZ2UiLCJFcnJvclZpZXciLCJtZW51IiwiY2hlY2tBY3Rpb24iLCJzZWxlY3RlZEl0ZW1JZCIsImF1dGhvciIsInBhY2FrZ2VMb2NhdGlvbiIsImFsZXJ0IiwicGFja2FnZU1ldGhvZCIsIiR2aWV3IiwibG9jYXRlIiwibWVudWRhdGEiLCJyb3ciLCJhZGRBY3Rpb25zIiwicHJldmVudEV2ZW50IiwibWFwRGF0YSIsImFsbEl0ZW1zIiwic291cmNlIiwidGhyZWVib3QiLCJwa2dJbmRleCIsImoiLCJTZXR0aW5nc1ZpZXciLCJjZWxscyIsIkFkbWluc1ZpZXciLCJXSUtJU19VUkwiLCJXaWtpc1ZpZXciLCJsaXN0V29ya2VycyIsIkFuc2lVcCIsImluZm8iLCJlbGVtZW50c0NvbmZpZyIsImxhYmVsV2lkdGgiLCJlbGVtZW50cyIsImxhYmVsIiwicmVhZG9ubHkiLCJ0YWIiLCJtdWx0aXZpZXciLCJoZWFkIiwibW9kYWwiLCJwb3NpdGlvbiIsImdldFRvcFBhcmVudFZpZXciLCJmb3JtIiwidGJWaWV3cyIsInRiVGFicyIsImxvZ0RhdGEiLCJnZXRTZWxlY3RlZEl0ZW0iLCJhcHBfbmFtZSIsImxhdGVzdF9sb2dpZCIsImFkZFRyYWNlYmFjayIsInRiIiwidGJJZCIsInRocmVlYm90X25hbWUiLCJwcm9jZXNzX2lkIiwidGJUaXRsZSIsImZvcm1hdHRlZCIsImFkZE9wdGlvbiIsImNsZWFyVHJhY2VCYWNrcyIsInJlbW92ZU9wdGlvbiIsInZhbHVlcyIsImFzc2lnbiIsImFsZXJ0X3R5cGUiLCJsZXZlbCIsInRpbWVfZmlyc3QiLCJ0aW1lX2xhc3QiLCJzZXRWYWx1ZXMiLCJ0cmFjZWJhY2tzIiwiUHJvY2Vzc2VzQ2hpbGRWaWV3IiwiTWF0aCIsImNlaWwiLCJnZXRIZWFkIiwicGFnZXIiLCJncm91cCIsImFwcGxvZ3MiLCJtYXJrU29ydGluZyIsImFkZEFkbWluIiwib25DbGljayIsImRlbGV0ZV9hZG1pbiIsImRlbGV0ZUFkbWluIiwiaW5wdXREaWFsb2ciLCJpbnB1dCIsIml0ZW1JZCIsIlBhY2thZ2VzU2VydmljZSIsImdpdF91cmwiLCJEaXNrU3BhY2VWaWV3IiwiZGlza1NwYWNlIiwiZGlza0luZm8iLCJ1c2VkIiwiZnJlZSIsInRvdGFsIiwicGVyY2VudCIsImhlYWx0aEluZm9WaWV3IiwiaGVhbHRoSW5mbyIsImJjZGIiLCJ3aWtpcyIsImNvZGVzZXJ2ZXIiLCJqdXB5dGVyIiwiSlNYSW5mb1ZpZXciLCJpcCIsImlwNiIsImNvbG9yc0RhdGFzZXQiLCJjb2xvciIsIlByb2Nlc3Nlc1ZpZXciLCJwcm9jZXNzZXNJbmZvIiwicGllSW5uZXJUZXh0IiwiYWxpZ24iLCJpbnB1dFdpZHRoIiwiY2hpbGR2aWV3IiwicHJvY2Vzc2VzTGlzdCIsInJ1blByb2Nlc3NJbmZvIiwiY2hhcnRzRGF0YSIsInByb2Nlc3Nlc19saXN0IiwibWVtb3J5VXNhZ2UiLCJtZW1vcnlfdXNhZ2UiLCJ0b3RhbE1lbW9yeSIsInRvdGFsX21lbSIsInVzYWdlX3BlcmNlbnQiLCJ0ZW1wIiwidm1zIiwicnVubmluZ1BvcnRzVmlldyIsInBvcnRzIiwicG9ydHNUYWJsZSIsImljb24iLCJoaWRlTWVudSIsInRvb2x0aXAiLCJib3JkZXJsZXNzIiwic2lkZWJhciIsInRvb2xiYXIiLCJwYWRkaW5nIiwic2hvd01lbnUiLCJidXR0b25IaWRlTWVudSIsImJ1dHRvblNob3dNZW51IiwidXNlck1lbnUiLCJ1c2VybmFtZUxhYmVsIiwidXNlcm5hbWUiLCJnZXRUZXh0U2l6ZSIsImVtYWlsIiwiTXlqb2JzU2VydmljZSIsIkludmVudG9yeUFwcCIsIkFQUE5BTUUiLCJWRVJTSU9OIiwiUFJPRFVDVElPTiIsImZhY3RvcnkiLCJleHBvcnRzIiwibm9kZU5hbWUiLCJleHAiLCJfX21ha2VUZW1wbGF0ZU9iamVjdCIsImNvb2tlZCIsInJhdyIsImRlZmluZVByb3BlcnR5IiwiUGFja2V0S2luZCIsInNldHVwX3BhbGV0dGVzIiwiX3VzZV9jbGFzc2VzIiwiX2VzY2FwZV9mb3JfaHRtbCIsImJvbGQiLCJmZyIsImJnIiwiX2J1ZmZlciIsIl91cmxfd2hpdGVsaXN0IiwiYXJnIiwiZW51bWVyYWJsZSIsImNvbmZpZ3VyYWJsZSIsIl90aGlzIiwiYW5zaV9jb2xvcnMiLCJyZ2IiLCJjbGFzc19uYW1lIiwicGFsZXR0ZV8yNTYiLCJwYWxldHRlIiwicmVjIiwibGV2ZWxzIiwiciIsImciLCJiIiwiY29sIiwiZ3JleV9sZXZlbCIsImdyeSIsImVzY2FwZV90eHRfZm9yX2h0bWwiLCJ0eHQiLCJhcHBlbmRfYnVmZmVyIiwiZ2V0X25leHRfcGFja2V0IiwicGt0Iiwia2luZCIsIkVPUyIsImxlbiIsIlRleHQiLCJJbmNvbXBsZXRlIiwibmV4dF9jaGFyIiwiY2hhckF0IiwiRVNDIiwiX2NzaV9yZWdleCIsInJneCIsIm1hdGNoIiwiVW5rbm93biIsIlNHUiIsInJwb3MiLCJfb3NjX3N0Iiwicmd4RyIsImxhc3RJbmRleCIsIm1hdGNoXzEiLCJleGVjIiwibWF0Y2hfMiIsIl9vc2NfcmVnZXgiLCJPU0NVUkwiLCJibG9ja3MiLCJwYWNrZXQiLCJ0cmFuc2Zvcm1fdG9faHRtbCIsIndpdGhfc3RhdGUiLCJwcm9jZXNzX2Fuc2kiLCJwcm9jZXNzX2h5cGVybGluayIsInNncl9jbWRzIiwic2dyX2NtZF9zdHIiLCJudW0iLCJpc05hTiIsImlzX2ZvcmVncm91bmQiLCJtb2RlX2NtZCIsInBhbGV0dGVfaW5kZXgiLCJjIiwiZnJhZ21lbnQiLCJzdHlsZXMiLCJjbGFzc2VzIiwiY2xhc3Nfc3RyaW5nIiwic3R5bGVfc3RyaW5nIiwidG1wbE9iaiIsInN1YnN0IiwiX2kiLCJyZWdleFRleHQiLCJ3c3JneCIsInR4dDIiLCJBbGVydHNTZXJ2aWNlIiwiTG9nc1NlcnZpY2UiLCJpZF9mcm9tIiwiYnV0dG9uTGFiZWwiLCJoYW5kbGVJbnB1dCIsImdldEZvcm1WaWV3IiwidGV4dElucHV0IiwiVUlNYW5hZ2VyIiwic2V0Rm9jdXMiXSwibWFwcGluZ3MiOiI7O1FBQUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7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QUFILENBQWxCO0FBQ0E2eEIsY0FBVW54QixXQUFWLENBQXNCLFNBQXRCLEVBQWlDaXhCLFlBQVlsbUIsSUFBWixDQUFpQm9tQixTQUFqQixDQUFqQzs7QUFFQTVvQixXQUFPMUosSUFBUDtBQUNBbkIsVUFBTTB6QixTQUFOLENBQWdCQyxRQUFoQixDQUF5QkYsU0FBekI7QUFDSCxDOzs7Ozs7QUNsREQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsdUIiLCJmaWxlIjoiYXBwLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7XG4gXHRcdFx0XHRjb25maWd1cmFibGU6IGZhbHNlLFxuIFx0XHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcbiBcdFx0XHRcdGdldDogZ2V0dGVyXG4gXHRcdFx0fSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiL2NvZGViYXNlL1wiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IDMyKTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyB3ZWJwYWNrL2Jvb3RzdHJhcCA3ZjE0MmZjZDE0MmM0NzM2NDc3OSIsImNsYXNzIE5hdmlnYXRpb25CbG9ja2VkIHsgfVxuXG5jbGFzcyBKZXRCYXNlIHtcclxuICAgIGNvbnN0cnVjdG9yKHdlYml4KSB7XHJcbiAgICAgICAgdGhpcy53ZWJpeEpldCA9IHRydWU7XHJcbiAgICAgICAgdGhpcy53ZWJpeCA9IHdlYml4O1xyXG4gICAgICAgIHRoaXMuX2V2ZW50cyA9IFtdO1xyXG4gICAgICAgIHRoaXMuX3N1YnMgPSB7fTtcclxuICAgICAgICB0aGlzLl9kYXRhID0ge307XHJcbiAgICB9XHJcbiAgICBnZXRSb290KCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9yb290O1xyXG4gICAgfVxyXG4gICAgZGVzdHJ1Y3RvcigpIHtcclxuICAgICAgICB0aGlzLl9kZXRhY2hFdmVudHMoKTtcclxuICAgICAgICB0aGlzLl9kZXN0cm95U3VicygpO1xyXG4gICAgICAgIHRoaXMuX2V2ZW50cyA9IHRoaXMuX2NvbnRhaW5lciA9IHRoaXMuYXBwID0gdGhpcy5fcGFyZW50ID0gdGhpcy5fcm9vdCA9IG51bGw7XHJcbiAgICB9XHJcbiAgICBzZXRQYXJhbShpZCwgdmFsdWUsIHVybCkge1xyXG4gICAgICAgIGlmICh0aGlzLl9kYXRhW2lkXSAhPT0gdmFsdWUpIHtcclxuICAgICAgICAgICAgdGhpcy5fZGF0YVtpZF0gPSB2YWx1ZTtcclxuICAgICAgICAgICAgdGhpcy5fc2VnbWVudC51cGRhdGUoaWQsIHZhbHVlLCAwKTtcclxuICAgICAgICAgICAgaWYgKHVybCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuc2hvdyhudWxsKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGdldFBhcmFtKGlkLCBwYXJlbnQpIHtcclxuICAgICAgICBjb25zdCB2YWx1ZSA9IHRoaXMuX2RhdGFbaWRdO1xyXG4gICAgICAgIGlmICh0eXBlb2YgdmFsdWUgIT09IFwidW5kZWZpbmVkXCIgfHwgIXBhcmVudCkge1xyXG4gICAgICAgICAgICByZXR1cm4gdmFsdWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNvbnN0IHZpZXcgPSB0aGlzLmdldFBhcmVudFZpZXcoKTtcclxuICAgICAgICBpZiAodmlldykge1xyXG4gICAgICAgICAgICByZXR1cm4gdmlldy5nZXRQYXJhbShpZCwgcGFyZW50KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBnZXRVcmwoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX3NlZ21lbnQuc3VidXJsKCk7XHJcbiAgICB9XHJcbiAgICBnZXRVcmxTdHJpbmcoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX3NlZ21lbnQudG9TdHJpbmcoKTtcclxuICAgIH1cclxuICAgIGdldFBhcmVudFZpZXcoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX3BhcmVudDtcclxuICAgIH1cclxuICAgICQkKGlkKSB7XHJcbiAgICAgICAgaWYgKHR5cGVvZiBpZCA9PT0gXCJzdHJpbmdcIikge1xyXG4gICAgICAgICAgICBjb25zdCByb290ID0gdGhpcy5nZXRSb290KCk7XHJcbiAgICAgICAgICAgIHJldHVybiByb290LnF1ZXJ5Vmlldygob2JqID0+IChvYmouY29uZmlnLmlkID09PSBpZCB8fCBvYmouY29uZmlnLmxvY2FsSWQgPT09IGlkKSAmJlxyXG4gICAgICAgICAgICAgICAgKG9iai4kc2NvcGUgPT09IHJvb3QuJHNjb3BlKSksIFwic2VsZlwiKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIHJldHVybiBpZDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBvbihvYmosIG5hbWUsIGNvZGUpIHtcclxuICAgICAgICBjb25zdCBpZCA9IG9iai5hdHRhY2hFdmVudChuYW1lLCBjb2RlKTtcclxuICAgICAgICB0aGlzLl9ldmVudHMucHVzaCh7IG9iaiwgaWQgfSk7XHJcbiAgICAgICAgcmV0dXJuIGlkO1xyXG4gICAgfVxyXG4gICAgY29udGFpbnModmlldykge1xyXG4gICAgICAgIGZvciAoY29uc3Qga2V5IGluIHRoaXMuX3N1YnMpIHtcclxuICAgICAgICAgICAgY29uc3Qga2lkID0gdGhpcy5fc3Vic1trZXldLnZpZXc7XHJcbiAgICAgICAgICAgIGlmIChraWQgPT09IHZpZXcgfHwga2lkLmNvbnRhaW5zKHZpZXcpKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcbiAgICBnZXRTdWJWaWV3KG5hbWUpIHtcclxuICAgICAgICBjb25zdCBzdWIgPSB0aGlzLmdldFN1YlZpZXdJbmZvKG5hbWUpO1xyXG4gICAgICAgIGlmIChzdWIpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHN1Yi5zdWJ2aWV3LnZpZXc7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgZ2V0U3ViVmlld0luZm8obmFtZSkge1xyXG4gICAgICAgIGNvbnN0IHN1YiA9IHRoaXMuX3N1YnNbbmFtZSB8fCBcImRlZmF1bHRcIl07XHJcbiAgICAgICAgaWYgKHN1Yikge1xyXG4gICAgICAgICAgICByZXR1cm4geyBzdWJ2aWV3OiBzdWIsIHBhcmVudDogdGhpcyB9O1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAobmFtZSA9PT0gXCJfdG9wXCIpIHtcclxuICAgICAgICAgICAgdGhpcy5fc3Vic1tuYW1lXSA9IHsgdXJsOiBcIlwiLCBpZDogbnVsbCwgcG9wdXA6IHRydWUgfTtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZ2V0U3ViVmlld0luZm8obmFtZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIHdoZW4gY2FsbGVkIGZyb20gYSBjaGlsZCB2aWV3LCBzZWFyY2hlcyBmb3IgbmVhcmVzdCBwYXJlbnQgd2l0aCBzdWJ2aWV3XHJcbiAgICAgICAgaWYgKHRoaXMuX3BhcmVudCkge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fcGFyZW50LmdldFN1YlZpZXdJbmZvKG5hbWUpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgIH1cclxuICAgIF9kZXRhY2hFdmVudHMoKSB7XHJcbiAgICAgICAgY29uc3QgZXZlbnRzID0gdGhpcy5fZXZlbnRzO1xyXG4gICAgICAgIGZvciAobGV0IGkgPSBldmVudHMubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIHtcclxuICAgICAgICAgICAgZXZlbnRzW2ldLm9iai5kZXRhY2hFdmVudChldmVudHNbaV0uaWQpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIF9kZXN0cm95U3VicygpIHtcclxuICAgICAgICAvLyBkZXN0cm95IHN1YiB2aWV3c1xyXG4gICAgICAgIGZvciAoY29uc3Qga2V5IGluIHRoaXMuX3N1YnMpIHtcclxuICAgICAgICAgICAgY29uc3Qgc3ViVmlldyA9IHRoaXMuX3N1YnNba2V5XS52aWV3O1xyXG4gICAgICAgICAgICAvLyBpdCBwb3NzaWJsZSB0aGF0IHN1YnZpZXcgd2FzIG5vdCBsb2FkZWQgd2l0aCBhbnkgY29udGVudCB5ZXRcclxuICAgICAgICAgICAgLy8gc28gY2hlY2sgb24gbnVsbFxyXG4gICAgICAgICAgICBpZiAoc3ViVmlldykge1xyXG4gICAgICAgICAgICAgICAgc3ViVmlldy5kZXN0cnVjdG9yKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gcmVzZXQgdG8gcHJldmVudCBtZW1vcnkgbGVha3NcclxuICAgICAgICB0aGlzLl9zdWJzID0ge307XHJcbiAgICB9XHJcbiAgICBfaW5pdF91cmxfZGF0YSgpIHtcclxuICAgICAgICBjb25zdCB1cmwgPSB0aGlzLl9zZWdtZW50LmN1cnJlbnQoKTtcclxuICAgICAgICB0aGlzLl9kYXRhID0ge307XHJcbiAgICAgICAgdGhpcy53ZWJpeC5leHRlbmQodGhpcy5fZGF0YSwgdXJsLnBhcmFtcywgdHJ1ZSk7XHJcbiAgICB9XHJcbiAgICBfZ2V0RGVmYXVsdFN1YigpIHtcclxuICAgICAgICBpZiAodGhpcy5fc3Vicy5kZWZhdWx0KSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9zdWJzLmRlZmF1bHQ7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGZvciAoY29uc3Qga2V5IGluIHRoaXMuX3N1YnMpIHtcclxuICAgICAgICAgICAgY29uc3Qgc3ViID0gdGhpcy5fc3Vic1trZXldO1xyXG4gICAgICAgICAgICBpZiAoIXN1Yi5icmFuY2ggJiYgc3ViLnZpZXcgJiYga2V5ICE9PSBcIl90b3BcIikge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgY2hpbGQgPSBzdWIudmlldy5fZ2V0RGVmYXVsdFN1YigpO1xyXG4gICAgICAgICAgICAgICAgaWYgKGNoaWxkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGNoaWxkO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgX3JvdXRlZF92aWV3KCkge1xyXG4gICAgICAgIGNvbnN0IHBhcmVudCA9IHRoaXMuZ2V0UGFyZW50VmlldygpO1xyXG4gICAgICAgIGlmICghcGFyZW50KSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjb25zdCBzdWIgPSBwYXJlbnQuX2dldERlZmF1bHRTdWIoKTtcclxuICAgICAgICBpZiAoIXN1YiAmJiBzdWIgIT09IHRoaXMpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gcGFyZW50Ll9yb3V0ZWRfdmlldygpO1xyXG4gICAgfVxyXG59XG5cbmZ1bmN0aW9uIHBhcnNlKHVybCkge1xyXG4gICAgLy8gcmVtb3ZlIHN0YXJ0aW5nIC9cclxuICAgIGlmICh1cmxbMF0gPT09IFwiL1wiKSB7XHJcbiAgICAgICAgdXJsID0gdXJsLnN1YnN0cigxKTtcclxuICAgIH1cclxuICAgIC8vIHNwbGl0IHVybCBieSBcIi9cIlxyXG4gICAgY29uc3QgcGFydHMgPSB1cmwuc3BsaXQoXCIvXCIpO1xyXG4gICAgY29uc3QgY2h1bmtzID0gW107XHJcbiAgICAvLyBmb3IgZWFjaCBwYWdlIGluIHVybFxyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBwYXJ0cy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgIGNvbnN0IHRlc3QgPSBwYXJ0c1tpXTtcclxuICAgICAgICBjb25zdCByZXN1bHQgPSB7fTtcclxuICAgICAgICAvLyBkZXRlY3QgcGFyYW1zXHJcbiAgICAgICAgLy8gc3VwcG9ydCBvbGQgXHRcdFx0c29tZTphPWI6Yz1kXHJcbiAgICAgICAgLy8gYW5kIG5ldyBub3RhdGlvblx0XHRzb21lP2E9YiZjPWRcclxuICAgICAgICBsZXQgcG9zID0gdGVzdC5pbmRleE9mKFwiOlwiKTtcclxuICAgICAgICBpZiAocG9zID09PSAtMSkge1xyXG4gICAgICAgICAgICBwb3MgPSB0ZXN0LmluZGV4T2YoXCI/XCIpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAocG9zICE9PSAtMSkge1xyXG4gICAgICAgICAgICBjb25zdCBwYXJhbXMgPSB0ZXN0LnN1YnN0cihwb3MgKyAxKS5zcGxpdCgvW1xcOlxcP1xcJl0vZyk7XHJcbiAgICAgICAgICAgIC8vIGNyZWF0ZSBoYXNoIG9mIG5hbWVkIHBhcmFtc1xyXG4gICAgICAgICAgICBmb3IgKGNvbnN0IHBhcmFtIG9mIHBhcmFtcykge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgZGNodW5rID0gcGFyYW0uc3BsaXQoXCI9XCIpO1xyXG4gICAgICAgICAgICAgICAgcmVzdWx0W2RjaHVua1swXV0gPSBkZWNvZGVVUklDb21wb25lbnQoZGNodW5rWzFdKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICAvLyBzdG9yZSBwYXJzZWQgdmFsdWVzXHJcbiAgICAgICAgY2h1bmtzW2ldID0ge1xyXG4gICAgICAgICAgICBwYWdlOiAocG9zID4gLTEgPyB0ZXN0LnN1YnN0cigwLCBwb3MpIDogdGVzdCksXHJcbiAgICAgICAgICAgIHBhcmFtczogcmVzdWx0LFxyXG4gICAgICAgICAgICBpc05ldzogdHJ1ZVxyXG4gICAgICAgIH07XHJcbiAgICB9XHJcbiAgICAvLyByZXR1cm4gYXJyYXkgb2YgcGFnZSBvYmplY3RzXHJcbiAgICByZXR1cm4gY2h1bmtzO1xyXG59XHJcbmZ1bmN0aW9uIHVybDJzdHIoc3RhY2spIHtcclxuICAgIGNvbnN0IHVybCA9IFtdO1xyXG4gICAgZm9yIChjb25zdCBjaHVuayBvZiBzdGFjaykge1xyXG4gICAgICAgIHVybC5wdXNoKFwiL1wiICsgY2h1bmsucGFnZSk7XHJcbiAgICAgICAgY29uc3QgcGFyYW1zID0gb2JqMnN0cihjaHVuay5wYXJhbXMpO1xyXG4gICAgICAgIGlmIChwYXJhbXMpIHtcclxuICAgICAgICAgICAgdXJsLnB1c2goXCI/XCIgKyBwYXJhbXMpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiB1cmwuam9pbihcIlwiKTtcclxufVxyXG5mdW5jdGlvbiBvYmoyc3RyKG9iaikge1xyXG4gICAgY29uc3Qgc3RyID0gW107XHJcbiAgICBmb3IgKGNvbnN0IGtleSBpbiBvYmopIHtcclxuICAgICAgICBpZiAoc3RyLmxlbmd0aCkge1xyXG4gICAgICAgICAgICBzdHIucHVzaChcIiZcIik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHN0ci5wdXNoKGtleSArIFwiPVwiICsgZW5jb2RlVVJJQ29tcG9uZW50KG9ialtrZXldKSk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gc3RyLmpvaW4oXCJcIik7XHJcbn1cblxuY2xhc3MgUm91dGUge1xyXG4gICAgY29uc3RydWN0b3Iocm91dGUsIGluZGV4KSB7XHJcbiAgICAgICAgdGhpcy5fbmV4dCA9IDE7XHJcbiAgICAgICAgaWYgKHR5cGVvZiByb3V0ZSA9PT0gXCJzdHJpbmdcIikge1xyXG4gICAgICAgICAgICB0aGlzLnJvdXRlID0ge1xyXG4gICAgICAgICAgICAgICAgdXJsOiBwYXJzZShyb3V0ZSksXHJcbiAgICAgICAgICAgICAgICBwYXRoOiByb3V0ZVxyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5yb3V0ZSA9IHJvdXRlO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmluZGV4ID0gaW5kZXg7XHJcbiAgICB9XHJcbiAgICBjdXJyZW50KCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnJvdXRlLnVybFt0aGlzLmluZGV4XTtcclxuICAgIH1cclxuICAgIG5leHQoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMucm91dGUudXJsW3RoaXMuaW5kZXggKyB0aGlzLl9uZXh0XTtcclxuICAgIH1cclxuICAgIHN1YnVybCgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5yb3V0ZS51cmwuc2xpY2UodGhpcy5pbmRleCk7XHJcbiAgICB9XHJcbiAgICBzaGlmdCgpIHtcclxuICAgICAgICByZXR1cm4gbmV3IFJvdXRlKHRoaXMucm91dGUsIHRoaXMuaW5kZXggKyB0aGlzLl9uZXh0KTtcclxuICAgIH1cclxuICAgIHJlZnJlc2goKSB7XHJcbiAgICAgICAgY29uc3QgdXJsID0gdGhpcy5yb3V0ZS51cmw7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IHRoaXMuaW5kZXggKyAxOyBpIDwgdXJsLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIHVybFtpXS5pc05ldyA9IHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgdG9TdHJpbmcoKSB7XHJcbiAgICAgICAgY29uc3Qgc3RyID0gdXJsMnN0cih0aGlzLnN1YnVybCgpKTtcclxuICAgICAgICByZXR1cm4gc3RyID8gc3RyLnN1YnN0cigxKSA6IFwiXCI7XHJcbiAgICB9XHJcbiAgICBfam9pbihwYXRoLCBraWRzKSB7XHJcbiAgICAgICAgbGV0IHVybCA9IHRoaXMucm91dGUudXJsO1xyXG4gICAgICAgIGlmIChwYXRoID09PSBudWxsKSB7IC8vIGNoYW5nZSBvZiBwYXJhbWV0ZXJzLCByb3V0ZSBlbGVtZW50cyBhcmUgbm90IGFmZmVjdGVkXHJcbiAgICAgICAgICAgIHJldHVybiB1cmw7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNvbnN0IG9sZCA9IHRoaXMucm91dGUudXJsO1xyXG4gICAgICAgIHVybCA9IG9sZC5zbGljZSgwLCB0aGlzLmluZGV4ICsgKGtpZHMgPyB0aGlzLl9uZXh0IDogMCkpO1xyXG4gICAgICAgIGlmIChwYXRoKSB7XHJcbiAgICAgICAgICAgIHVybCA9IHVybC5jb25jYXQocGFyc2UocGF0aCkpO1xyXG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHVybC5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgaWYgKG9sZFtpXSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHVybFtpXS52aWV3ID0gb2xkW2ldLnZpZXc7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZiAob2xkW2ldICYmIHVybFtpXS5wYWdlID09PSBvbGRbaV0ucGFnZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHVybFtpXS5pc05ldyA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB1cmw7XHJcbiAgICB9XHJcbiAgICBhcHBlbmQocGF0aCkge1xyXG4gICAgICAgIGNvbnN0IHVybCA9IHRoaXMuX2pvaW4ocGF0aCwgdHJ1ZSk7XHJcbiAgICAgICAgdGhpcy5yb3V0ZS5wYXRoID0gdXJsMnN0cih1cmwpO1xyXG4gICAgICAgIHRoaXMucm91dGUudXJsID0gdXJsO1xyXG4gICAgICAgIHJldHVybiB0aGlzLnJvdXRlLnBhdGg7XHJcbiAgICB9XHJcbiAgICBzaG93KHBhdGgsIHZpZXcsIGtpZHMpIHtcclxuICAgICAgICBjb25zdCB1cmwgPSB0aGlzLl9qb2luKHBhdGgsIGtpZHMpO1xyXG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzLCByZWopID0+IHtcclxuICAgICAgICAgICAgY29uc3QgcmVkaXJlY3QgPSB1cmwyc3RyKHVybCk7XHJcbiAgICAgICAgICAgIGNvbnN0IG9iaiA9IHtcclxuICAgICAgICAgICAgICAgIHVybCxcclxuICAgICAgICAgICAgICAgIHJlZGlyZWN0LFxyXG4gICAgICAgICAgICAgICAgY29uZmlybTogUHJvbWlzZS5yZXNvbHZlKClcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgY29uc3QgYXBwID0gdmlldyA/IHZpZXcuYXBwIDogbnVsbDtcclxuICAgICAgICAgICAgLy8gd2hlbiBjcmVhdGluZyBhIG5ldyByb3V0ZSwgaXQgcG9zc2libGUgdGhhdCBpdCB3aWxsIG5vdCBoYXZlIGFueSBjb250ZW50XHJcbiAgICAgICAgICAgIC8vIGd1YXJkIGlzIG5vdCBuZWNlc3NhcnkgaW4gc3VjaCBjYXNlXHJcbiAgICAgICAgICAgIGlmIChhcHApIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHJlc3VsdCA9IGFwcC5jYWxsRXZlbnQoXCJhcHA6Z3VhcmRcIiwgW29iai5yZWRpcmVjdCwgdmlldywgb2JqXSk7XHJcbiAgICAgICAgICAgICAgICBpZiAoIXJlc3VsdCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJlaihuZXcgTmF2aWdhdGlvbkJsb2NrZWQoKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIG9iai5jb25maXJtLmNhdGNoKGVyciA9PiByZWooZXJyKSkudGhlbigoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAob2JqLnJlZGlyZWN0ID09PSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVqKG5ldyBOYXZpZ2F0aW9uQmxvY2tlZCgpKTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZiAob2JqLnJlZGlyZWN0ICE9PSByZWRpcmVjdCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGFwcC5zaG93KG9iai5yZWRpcmVjdCk7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVqKG5ldyBOYXZpZ2F0aW9uQmxvY2tlZCgpKTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB0aGlzLnJvdXRlLnBhdGggPSByZWRpcmVjdDtcclxuICAgICAgICAgICAgICAgIHRoaXMucm91dGUudXJsID0gdXJsO1xyXG4gICAgICAgICAgICAgICAgcmVzKCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgc2l6ZShuKSB7XHJcbiAgICAgICAgdGhpcy5fbmV4dCA9IG47XHJcbiAgICB9XHJcbiAgICBzcGxpdCgpIHtcclxuICAgICAgICBjb25zdCByb3V0ZSA9IHtcclxuICAgICAgICAgICAgdXJsOiB0aGlzLnJvdXRlLnVybC5zbGljZSh0aGlzLmluZGV4ICsgMSksXHJcbiAgICAgICAgICAgIHBhdGg6IFwiXCJcclxuICAgICAgICB9O1xyXG4gICAgICAgIGlmIChyb3V0ZS51cmwubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgIHJvdXRlLnBhdGggPSB1cmwyc3RyKHJvdXRlLnVybCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBuZXcgUm91dGUocm91dGUsIDApO1xyXG4gICAgfVxyXG4gICAgdXBkYXRlKG5hbWUsIHZhbHVlLCBpbmRleCkge1xyXG4gICAgICAgIGNvbnN0IGNodW5rID0gdGhpcy5yb3V0ZS51cmxbdGhpcy5pbmRleCArIChpbmRleCB8fCAwKV07XHJcbiAgICAgICAgaWYgKCFjaHVuaykge1xyXG4gICAgICAgICAgICB0aGlzLnJvdXRlLnVybC5wdXNoKHsgcGFnZTogXCJcIiwgcGFyYW1zOiB7fSB9KTtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMudXBkYXRlKG5hbWUsIHZhbHVlLCBpbmRleCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChuYW1lID09PSBcIlwiKSB7XHJcbiAgICAgICAgICAgIGNodW5rLnBhZ2UgPSB2YWx1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIGNodW5rLnBhcmFtc1tuYW1lXSA9IHZhbHVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLnJvdXRlLnBhdGggPSB1cmwyc3RyKHRoaXMucm91dGUudXJsKTtcclxuICAgIH1cclxufVxuXG5jbGFzcyBKZXRWaWV3IGV4dGVuZHMgSmV0QmFzZSB7XHJcbiAgICBjb25zdHJ1Y3RvcihhcHAsIGNvbmZpZykge1xyXG4gICAgICAgIHN1cGVyKGFwcC53ZWJpeCk7XHJcbiAgICAgICAgdGhpcy5hcHAgPSBhcHA7XHJcbiAgICAgICAgLy90aGlzLiRjb25maWcgPSBjb25maWc7XHJcbiAgICAgICAgdGhpcy5fY2hpbGRyZW4gPSBbXTtcclxuICAgIH1cclxuICAgIHVpKHVpLCBjb25maWcpIHtcclxuICAgICAgICBjb25maWcgPSBjb25maWcgfHwge307XHJcbiAgICAgICAgY29uc3QgY29udGFpbmVyID0gY29uZmlnLmNvbnRhaW5lciB8fCB1aS5jb250YWluZXI7XHJcbiAgICAgICAgY29uc3QgamV0dmlldyA9IHRoaXMuYXBwLmNyZWF0ZVZpZXcodWkpO1xyXG4gICAgICAgIHRoaXMuX2NoaWxkcmVuLnB1c2goamV0dmlldyk7XHJcbiAgICAgICAgamV0dmlldy5yZW5kZXIoY29udGFpbmVyLCB0aGlzLl9zZWdtZW50LCB0aGlzKTtcclxuICAgICAgICBpZiAodHlwZW9mIHVpICE9PSBcIm9iamVjdFwiIHx8ICh1aSBpbnN0YW5jZW9mIEpldEJhc2UpKSB7XHJcbiAgICAgICAgICAgIC8vIHJhdyB3ZWJpeCBVSVxyXG4gICAgICAgICAgICByZXR1cm4gamV0dmlldztcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIHJldHVybiBqZXR2aWV3LmdldFJvb3QoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBzaG93KHBhdGgsIGNvbmZpZykge1xyXG4gICAgICAgIGNvbmZpZyA9IGNvbmZpZyB8fCB7fTtcclxuICAgICAgICAvLyBjb252ZXJ0IHBhcmFtZXRlcnMgb2JqZWN0IHRvIHVybFxyXG4gICAgICAgIGlmICh0eXBlb2YgcGF0aCA9PT0gXCJvYmplY3RcIikge1xyXG4gICAgICAgICAgICBmb3IgKGNvbnN0IGtleSBpbiBwYXRoKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNldFBhcmFtKGtleSwgcGF0aFtrZXldKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBwYXRoID0gbnVsbDtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIC8vIGRlbGlnYXRlIHRvIGFwcCBpbiBjYXNlIG9mIHJvb3QgcHJlZml4XHJcbiAgICAgICAgICAgIGlmIChwYXRoLnN1YnN0cigwLCAxKSA9PT0gXCIvXCIpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmFwcC5zaG93KHBhdGgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIC8vIGxvY2FsIHBhdGgsIGRvIG5vdGhpbmdcclxuICAgICAgICAgICAgaWYgKHBhdGguaW5kZXhPZihcIi4vXCIpID09PSAwKSB7XHJcbiAgICAgICAgICAgICAgICBwYXRoID0gcGF0aC5zdWJzdHIoMik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgLy8gcGFyZW50IHBhdGgsIGNhbGwgcGFyZW50IHZpZXdcclxuICAgICAgICAgICAgaWYgKHBhdGguaW5kZXhPZihcIi4uL1wiKSA9PT0gMCkge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgcGFyZW50ID0gdGhpcy5nZXRQYXJlbnRWaWV3KCk7XHJcbiAgICAgICAgICAgICAgICBpZiAocGFyZW50KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHBhcmVudC5zaG93KHBhdGguc3Vic3RyKDMpLCBjb25maWcpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuYXBwLnNob3coXCIvXCIgKyBwYXRoLnN1YnN0cigzKSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY29uc3Qgc3ViID0gdGhpcy5nZXRTdWJWaWV3SW5mbyhjb25maWcudGFyZ2V0KTtcclxuICAgICAgICAgICAgaWYgKHN1Yikge1xyXG4gICAgICAgICAgICAgICAgaWYgKHN1Yi5wYXJlbnQgIT09IHRoaXMpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gc3ViLnBhcmVudC5zaG93KHBhdGgsIGNvbmZpZyk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlIGlmIChjb25maWcudGFyZ2V0ICYmIGNvbmZpZy50YXJnZXQgIT09IFwiZGVmYXVsdFwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3JlbmRlckZyYW1lTG9jayhjb25maWcudGFyZ2V0LCBzdWIuc3VidmlldywgcGF0aCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBpZiAocGF0aCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmFwcC5zaG93KFwiL1wiICsgcGF0aCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX3Nob3codGhpcy5fc2VnbWVudCwgcGF0aCwgdGhpcyk7XHJcbiAgICB9XHJcbiAgICBfc2hvdyhzZWdtZW50LCBwYXRoLCB2aWV3KSB7XHJcbiAgICAgICAgcmV0dXJuIHNlZ21lbnQuc2hvdyhwYXRoLCB2aWV3LCB0cnVlKS50aGVuKCgpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5faW5pdF91cmxfZGF0YSgpO1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fdXJsQ2hhbmdlKCk7XHJcbiAgICAgICAgfSkudGhlbigoKSA9PiB7XHJcbiAgICAgICAgICAgIGlmIChzZWdtZW50LnJvdXRlLmxpbmtSb3V0ZXIpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuYXBwLmdldFJvdXRlcigpLnNldChzZWdtZW50LnJvdXRlLnBhdGgsIHsgc2lsZW50OiB0cnVlIH0pO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5hcHAuY2FsbEV2ZW50KFwiYXBwOnJvdXRlXCIsIFtzZWdtZW50LnJvdXRlLnBhdGhdKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgaW5pdChfJHZpZXcsIF8kKSB7XHJcbiAgICAgICAgLy8gc3R1YlxyXG4gICAgfVxyXG4gICAgcmVhZHkoXyR2aWV3LCBfJHVybCkge1xyXG4gICAgICAgIC8vIHN0dWJcclxuICAgIH1cclxuICAgIGNvbmZpZygpIHtcclxuICAgICAgICB0aGlzLmFwcC53ZWJpeC5tZXNzYWdlKFwiVmlldzpDb25maWcgaXMgbm90IGltcGxlbWVudGVkXCIpO1xyXG4gICAgfVxyXG4gICAgdXJsQ2hhbmdlKF8kdmlldywgXyR1cmwpIHtcclxuICAgICAgICAvLyBzdHViXHJcbiAgICB9XHJcbiAgICBkZXN0cm95KCkge1xyXG4gICAgICAgIC8vIHN0dWJcclxuICAgIH1cclxuICAgIGRlc3RydWN0b3IoKSB7XHJcbiAgICAgICAgdGhpcy5kZXN0cm95KCk7XHJcbiAgICAgICAgdGhpcy5fZGVzdHJveUtpZHMoKTtcclxuICAgICAgICAvLyBkZXN0cm95IGFjdHVhbCBVSVxyXG4gICAgICAgIHRoaXMuX3Jvb3QuZGVzdHJ1Y3RvcigpO1xyXG4gICAgICAgIHN1cGVyLmRlc3RydWN0b3IoKTtcclxuICAgIH1cclxuICAgIHVzZShwbHVnaW4sIGNvbmZpZykge1xyXG4gICAgICAgIHBsdWdpbih0aGlzLmFwcCwgdGhpcywgY29uZmlnKTtcclxuICAgIH1cclxuICAgIHJlZnJlc2goKSB7XHJcbiAgICAgICAgY29uc3QgdXJsID0gdGhpcy5nZXRVcmwoKTtcclxuICAgICAgICB0aGlzLmRlc3Ryb3koKTtcclxuICAgICAgICB0aGlzLl9kZXN0cm95S2lkcygpO1xyXG4gICAgICAgIHRoaXMuX2Rlc3Ryb3lTdWJzKCk7XHJcbiAgICAgICAgdGhpcy5fZGV0YWNoRXZlbnRzKCk7XHJcbiAgICAgICAgaWYgKHRoaXMuX2NvbnRhaW5lci50YWdOYW1lKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX3Jvb3QuZGVzdHJ1Y3RvcigpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLl9zZWdtZW50LnJlZnJlc2goKTtcclxuICAgICAgICByZXR1cm4gdGhpcy5fcmVuZGVyKHRoaXMuX3NlZ21lbnQpO1xyXG4gICAgfVxyXG4gICAgcmVuZGVyKHJvb3QsIHVybCwgcGFyZW50KSB7XHJcbiAgICAgICAgaWYgKHR5cGVvZiB1cmwgPT09IFwic3RyaW5nXCIpIHtcclxuICAgICAgICAgICAgdXJsID0gbmV3IFJvdXRlKHVybCwgMCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuX3NlZ21lbnQgPSB1cmw7XHJcbiAgICAgICAgdGhpcy5fcGFyZW50ID0gcGFyZW50O1xyXG4gICAgICAgIHRoaXMuX2luaXRfdXJsX2RhdGEoKTtcclxuICAgICAgICByb290ID0gcm9vdCB8fCBkb2N1bWVudC5ib2R5O1xyXG4gICAgICAgIGNvbnN0IF9jb250YWluZXIgPSAodHlwZW9mIHJvb3QgPT09IFwic3RyaW5nXCIpID8gdGhpcy53ZWJpeC50b05vZGUocm9vdCkgOiByb290O1xyXG4gICAgICAgIGlmICh0aGlzLl9jb250YWluZXIgIT09IF9jb250YWluZXIpIHtcclxuICAgICAgICAgICAgdGhpcy5fY29udGFpbmVyID0gX2NvbnRhaW5lcjtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3JlbmRlcih1cmwpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3VybENoYW5nZSgpLnRoZW4oKCkgPT4gdGhpcy5nZXRSb290KCkpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIF9yZW5kZXIodXJsKSB7XHJcbiAgICAgICAgY29uc3QgY29uZmlnID0gdGhpcy5jb25maWcoKTtcclxuICAgICAgICBpZiAoY29uZmlnLnRoZW4pIHtcclxuICAgICAgICAgICAgcmV0dXJuIGNvbmZpZy50aGVuKGNmZyA9PiB0aGlzLl9yZW5kZXJfZmluYWwoY2ZnLCB1cmwpKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9yZW5kZXJfZmluYWwoY29uZmlnLCB1cmwpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIF9yZW5kZXJfZmluYWwoY29uZmlnLCB1cmwpIHtcclxuICAgICAgICAvLyBnZXQgcHJldmlvdXMgdmlldyBpbiB0aGUgc2FtZSBzbG90XHJcbiAgICAgICAgbGV0IHNsb3QgPSBudWxsO1xyXG4gICAgICAgIGxldCBjb250YWluZXIgPSBudWxsO1xyXG4gICAgICAgIGxldCBzaG93ID0gZmFsc2U7XHJcbiAgICAgICAgaWYgKCF0aGlzLl9jb250YWluZXIudGFnTmFtZSkge1xyXG4gICAgICAgICAgICBzbG90ID0gdGhpcy5fY29udGFpbmVyO1xyXG4gICAgICAgICAgICBpZiAoc2xvdC5wb3B1cCkge1xyXG4gICAgICAgICAgICAgICAgY29udGFpbmVyID0gZG9jdW1lbnQuYm9keTtcclxuICAgICAgICAgICAgICAgIHNob3cgPSB0cnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgY29udGFpbmVyID0gdGhpcy53ZWJpeC4kJChzbG90LmlkKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgY29udGFpbmVyID0gdGhpcy5fY29udGFpbmVyO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvLyB2aWV3IGFscmVhZHkgZGVzdHJveWVkXHJcbiAgICAgICAgaWYgKCF0aGlzLmFwcCB8fCAhY29udGFpbmVyKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdChudWxsKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IHJlc3BvbnNlO1xyXG4gICAgICAgIGNvbnN0IGN1cnJlbnQgPSB0aGlzLl9zZWdtZW50LmN1cnJlbnQoKTtcclxuICAgICAgICAvLyB1c2luZyB3cmFwcGVyIG9iamVjdCwgc28gdWkgY2FuIGJlIGNoYW5nZWQgZnJvbSBhcHA6cmVuZGVyIGV2ZW50XHJcbiAgICAgICAgY29uc3QgcmVzdWx0ID0geyB1aToge30gfTtcclxuICAgICAgICB0aGlzLmFwcC5jb3B5Q29uZmlnKGNvbmZpZywgcmVzdWx0LnVpLCB0aGlzLl9zdWJzKTtcclxuICAgICAgICB0aGlzLmFwcC5jYWxsRXZlbnQoXCJhcHA6cmVuZGVyXCIsIFt0aGlzLCB1cmwsIHJlc3VsdF0pO1xyXG4gICAgICAgIHJlc3VsdC51aS4kc2NvcGUgPSB0aGlzO1xyXG4gICAgICAgIC8qIGRlc3Ryb3kgb2xkIEhUTUwgYXR0YWNoZWQgdmlld3MgYmVmb3JlIGNyZWF0aW5nIG5ldyBvbmUgKi9cclxuICAgICAgICBpZiAoIXNsb3QgJiYgY3VycmVudC5pc05ldyAmJiBjdXJyZW50LnZpZXcpIHtcclxuICAgICAgICAgICAgY3VycmVudC52aWV3LmRlc3RydWN0b3IoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgLy8gc3BlY2lhbCBoYW5kbGluZyBmb3IgYWRkaW5nIGluc2lkZSBvZiBtdWx0aXZpZXcgLSBwcmVzZXJ2ZSBvbGQgaWRcclxuICAgICAgICAgICAgaWYgKHNsb3QgJiYgIXNob3cpIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IG9sZHVpID0gY29udGFpbmVyO1xyXG4gICAgICAgICAgICAgICAgY29uc3QgcGFyZW50ID0gb2xkdWkuZ2V0UGFyZW50VmlldygpO1xyXG4gICAgICAgICAgICAgICAgaWYgKHBhcmVudCAmJiBwYXJlbnQubmFtZSA9PT0gXCJtdWx0aXZpZXdcIiAmJiAhcmVzdWx0LnVpLmlkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0LnVpLmlkID0gb2xkdWkuY29uZmlnLmlkO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMuX3Jvb3QgPSB0aGlzLmFwcC53ZWJpeC51aShyZXN1bHQudWksIGNvbnRhaW5lcik7XHJcbiAgICAgICAgICAgIGNvbnN0IGFzV2luID0gdGhpcy5fcm9vdDtcclxuICAgICAgICAgICAgLy8gY2hlY2sgZm9yIHVybCBhZGRlZCB0byBpZ25vcmUgdGhpcy51aSBjYWxsc1xyXG4gICAgICAgICAgICBpZiAoc2hvdyAmJiBhc1dpbi5zZXRQb3NpdGlvbiAmJiAhYXNXaW4uaXNWaXNpYmxlKCkpIHtcclxuICAgICAgICAgICAgICAgIGFzV2luLnNob3coKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAvLyBjaGVjaywgaWYgd2UgYXJlIHJlcGxhY2luZyBzb21lIG9sZGVyIHZpZXdcclxuICAgICAgICAgICAgaWYgKHNsb3QpIHtcclxuICAgICAgICAgICAgICAgIGlmIChzbG90LnZpZXcgJiYgc2xvdC52aWV3ICE9PSB0aGlzICYmIHNsb3QudmlldyAhPT0gdGhpcy5hcHApIHtcclxuICAgICAgICAgICAgICAgICAgICBzbG90LnZpZXcuZGVzdHJ1Y3RvcigpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgc2xvdC5pZCA9IHRoaXMuX3Jvb3QuY29uZmlnLmlkO1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuZ2V0UGFyZW50VmlldygpIHx8ICF0aGlzLmFwcC5hcHApXHJcbiAgICAgICAgICAgICAgICAgICAgc2xvdC52aWV3ID0gdGhpcztcclxuICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIHdoZW4gd2UgaGF2ZSBzdWJhcHAsIHNldCB3aG9sZSBhcHAgYXMgYSB2aWV3XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gc28gb24gZGVzdHJ1Y3Rpb24sIHRoZSB3aG9sZSBhcHAgd2lsbCBiZSBkZXN0cm95ZWRcclxuICAgICAgICAgICAgICAgICAgICBzbG90LnZpZXcgPSB0aGlzLmFwcDtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoY3VycmVudC5pc05ldykge1xyXG4gICAgICAgICAgICAgICAgY3VycmVudC52aWV3ID0gdGhpcztcclxuICAgICAgICAgICAgICAgIGN1cnJlbnQuaXNOZXcgPSBmYWxzZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXNwb25zZSA9IFByb21pc2UucmVzb2x2ZSh0aGlzLl9pbml0KHRoaXMuX3Jvb3QsIHVybCkpLnRoZW4oKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3VybENoYW5nZSgpLnRoZW4oKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2luaXRVcmwgPSBudWxsO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLnJlYWR5KHRoaXMuX3Jvb3QsIHVybC5zdWJ1cmwoKSk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNhdGNoIChlKSB7XHJcbiAgICAgICAgICAgIHJlc3BvbnNlID0gUHJvbWlzZS5yZWplY3QoZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiByZXNwb25zZS5jYXRjaChlcnIgPT4gdGhpcy5faW5pdEVycm9yKHRoaXMsIGVycikpO1xyXG4gICAgfVxyXG4gICAgX2luaXQodmlldywgdXJsKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuaW5pdCh2aWV3LCB1cmwuc3VidXJsKCkpO1xyXG4gICAgfVxyXG4gICAgX3VybENoYW5nZSgpIHtcclxuICAgICAgICB0aGlzLmFwcC5jYWxsRXZlbnQoXCJhcHA6dXJsY2hhbmdlXCIsIFt0aGlzLCB0aGlzLl9zZWdtZW50XSk7XHJcbiAgICAgICAgY29uc3Qgd2FpdHMgPSBbXTtcclxuICAgICAgICBmb3IgKGNvbnN0IGtleSBpbiB0aGlzLl9zdWJzKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGZyYW1lID0gdGhpcy5fc3Vic1trZXldO1xyXG4gICAgICAgICAgICBjb25zdCB3YWl0ID0gdGhpcy5fcmVuZGVyRnJhbWVMb2NrKGtleSwgZnJhbWUsIG51bGwpO1xyXG4gICAgICAgICAgICBpZiAod2FpdCkge1xyXG4gICAgICAgICAgICAgICAgd2FpdHMucHVzaCh3YWl0KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gUHJvbWlzZS5hbGwod2FpdHMpLnRoZW4oKCkgPT4ge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy51cmxDaGFuZ2UodGhpcy5fcm9vdCwgdGhpcy5fc2VnbWVudC5zdWJ1cmwoKSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICBfcmVuZGVyRnJhbWVMb2NrKGtleSwgZnJhbWUsIHBhdGgpIHtcclxuICAgICAgICAvLyBpZiBzdWJ2aWV3IGlzIG5vdCBvY2N1cGllZCBieSBzb21lIHJlbmRlcmluZyB5ZXRcclxuICAgICAgICBpZiAoIWZyYW1lLmxvY2spIHtcclxuICAgICAgICAgICAgLy8gcmV0cmVpdmUgYW5kIHN0b3JlIHJlbmRlcmluZyBlbmQgcHJvbWlzZVxyXG4gICAgICAgICAgICBjb25zdCBsb2NrID0gdGhpcy5fcmVuZGVyRnJhbWUoa2V5LCBmcmFtZSwgcGF0aCk7XHJcbiAgICAgICAgICAgIGlmIChsb2NrKSB7XHJcbiAgICAgICAgICAgICAgICAvLyBjbGVhciBsb2NrIGFmdGVyIGZyYW1lIHJlbmRlcmluZ1xyXG4gICAgICAgICAgICAgICAgLy8gYXMgcHJvbWlzZS5maW5hbGx5IGlzIG5vdCBzdXBwb3J0ZWQgYnkgIFdlYml4IGxlc3NlciB0aGFuIDYuMlxyXG4gICAgICAgICAgICAgICAgLy8gdXNpbmcgYSBtb3JlIHZlcmJvc2Ugbm90YXRpb25cclxuICAgICAgICAgICAgICAgIGZyYW1lLmxvY2sgPSBsb2NrLnRoZW4oKCkgPT4gZnJhbWUubG9jayA9IG51bGwsICgpID0+IGZyYW1lLmxvY2sgPSBudWxsKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICAvLyByZXR1cm4gcmVuZGVyaW5nIGVuZCBwcm9taXNlXHJcbiAgICAgICAgcmV0dXJuIGZyYW1lLmxvY2s7XHJcbiAgICB9XHJcbiAgICBfcmVuZGVyRnJhbWUoa2V5LCBmcmFtZSwgcGF0aCkge1xyXG4gICAgICAgIC8vZGVmYXVsdCByb3V0ZVxyXG4gICAgICAgIGlmIChrZXkgPT09IFwiZGVmYXVsdFwiKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLl9zZWdtZW50Lm5leHQoKSkge1xyXG4gICAgICAgICAgICAgICAgLy8gd2UgaGF2ZSBhIG5leHQgc2VnbWVudCBpbiB1cmwsIHJlbmRlciBpdFxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2NyZWF0ZVN1YlZpZXcoZnJhbWUsIHRoaXMuX3NlZ21lbnQuc2hpZnQoKSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSBpZiAoZnJhbWUudmlldyAmJiBmcmFtZS5wb3B1cCkge1xyXG4gICAgICAgICAgICAgICAgLy8gdGhlcmUgaXMgbm8gbmV4dCBzZWdtZW50LCBkZWxldGUgdGhlIGV4aXN0aW5nIHN1Yi12aWV3XHJcbiAgICAgICAgICAgICAgICBmcmFtZS52aWV3LmRlc3RydWN0b3IoKTtcclxuICAgICAgICAgICAgICAgIGZyYW1lLnZpZXcgPSBudWxsO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vaWYgbmV3IHBhdGggcHJvdmlkZWQsIHNldCBpdCB0byB0aGUgZnJhbWVcclxuICAgICAgICBpZiAocGF0aCAhPT0gbnVsbCkge1xyXG4gICAgICAgICAgICBmcmFtZS51cmwgPSBwYXRoO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvLyBpbiBjYXNlIG9mIHJvdXRlZCBzdWItdmlld1xyXG4gICAgICAgIGlmIChmcmFtZS5yb3V0ZSkge1xyXG4gICAgICAgICAgICAvLyB3ZSBoYXZlIGEgbmV3IHBhdGggZm9yIHN1Yi12aWV3XHJcbiAgICAgICAgICAgIGlmIChwYXRoICE9PSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZnJhbWUucm91dGUuc2hvdyhwYXRoLCBmcmFtZS52aWV3KS50aGVuKCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fY3JlYXRlU3ViVmlldyhmcmFtZSwgZnJhbWUucm91dGUpO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgLy8gZG8gbm90IHRyaWdnZXIgb25DaGFuZ2UgZm9yIGlzb2xhdGVkIHN1Yi12aWV3c1xyXG4gICAgICAgICAgICBpZiAoZnJhbWUuYnJhbmNoKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IHZpZXcgPSBmcmFtZS52aWV3O1xyXG4gICAgICAgIC8vIGlmIHZpZXcgZG9lc24ndCBleGlzdHMgeWV0LCBpbml0IGl0XHJcbiAgICAgICAgaWYgKCF2aWV3ICYmIGZyYW1lLnVybCkge1xyXG4gICAgICAgICAgICBpZiAodHlwZW9mIGZyYW1lLnVybCA9PT0gXCJzdHJpbmdcIikge1xyXG4gICAgICAgICAgICAgICAgLy8gc3RyaW5nLCBzbyB3ZSBoYXZlIGlzb2xhdGVkIHN1YnZpZXcgdXJsXHJcbiAgICAgICAgICAgICAgICBmcmFtZS5yb3V0ZSA9IG5ldyBSb3V0ZShmcmFtZS51cmwsIDApO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2NyZWF0ZVN1YlZpZXcoZnJhbWUsIGZyYW1lLnJvdXRlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIC8vIG9iamVjdCwgc28gd2UgaGF2ZSBhbiBlbWJlZGVkIHN1YnZpZXdcclxuICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgZnJhbWUudXJsID09PSBcImZ1bmN0aW9uXCIgJiYgISh2aWV3IGluc3RhbmNlb2YgZnJhbWUudXJsKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHZpZXcgPSBuZXcgZnJhbWUudXJsKHRoaXMuYXBwLCBcIlwiKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmICghdmlldykge1xyXG4gICAgICAgICAgICAgICAgICAgIHZpZXcgPSBmcmFtZS51cmw7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gdHJpZ2dlciBvbkNoYW5nZSBmb3IgYWxyZWFkeSBleGlzdGVkIHZpZXdcclxuICAgICAgICBpZiAodmlldykge1xyXG4gICAgICAgICAgICByZXR1cm4gdmlldy5yZW5kZXIoZnJhbWUsIChmcmFtZS5yb3V0ZSB8fCB0aGlzLl9zZWdtZW50KSwgdGhpcyk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgX2luaXRFcnJvcih2aWV3LCBlcnIpIHtcclxuICAgICAgICAvKlxyXG4gICAgICAgICAgICBpZiB2aWV3IGlzIGRlc3Ryb3llZCwgaWdub3JlIGFueSB2aWV3IHJlbGF0ZWQgZXJyb3JzXHJcbiAgICAgICAgKi9cclxuICAgICAgICBpZiAodGhpcy5hcHApIHtcclxuICAgICAgICAgICAgdGhpcy5hcHAuZXJyb3IoXCJhcHA6ZXJyb3I6aW5pdHZpZXdcIiwgW2Vyciwgdmlld10pO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH1cclxuICAgIF9jcmVhdGVTdWJWaWV3KHN1Yiwgc3VidXJsKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuYXBwLmNyZWF0ZUZyb21VUkwoc3VidXJsLmN1cnJlbnQoKSkudGhlbih2aWV3ID0+IHtcclxuICAgICAgICAgICAgcmV0dXJuIHZpZXcucmVuZGVyKHN1Yiwgc3VidXJsLCB0aGlzKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuICAgIF9kZXN0cm95S2lkcygpIHtcclxuICAgICAgICAvLyBkZXN0cm95IGNoaWxkIHZpZXdzXHJcbiAgICAgICAgY29uc3QgdWlzID0gdGhpcy5fY2hpbGRyZW47XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IHVpcy5sZW5ndGggLSAxOyBpID49IDA7IGktLSkge1xyXG4gICAgICAgICAgICBpZiAodWlzW2ldICYmIHVpc1tpXS5kZXN0cnVjdG9yKSB7XHJcbiAgICAgICAgICAgICAgICB1aXNbaV0uZGVzdHJ1Y3RvcigpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIHJlc2V0IHZhcnMgZm9yIGJldHRlciBHQyBwcm9jZXNzaW5nXHJcbiAgICAgICAgdGhpcy5fY2hpbGRyZW4gPSBbXTtcclxuICAgIH1cclxufVxuXG4vLyB3cmFwcGVyIGZvciByYXcgb2JqZWN0cyBhbmQgSmV0IDEueCBzdHJ1Y3RzXHJcbmNsYXNzIEpldFZpZXdSYXcgZXh0ZW5kcyBKZXRWaWV3IHtcclxuICAgIGNvbnN0cnVjdG9yKGFwcCwgY29uZmlnKSB7XHJcbiAgICAgICAgc3VwZXIoYXBwLCBjb25maWcpO1xyXG4gICAgICAgIHRoaXMuX3VpID0gY29uZmlnLnVpO1xyXG4gICAgfVxyXG4gICAgY29uZmlnKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl91aTtcclxuICAgIH1cclxufVxuXG5jbGFzcyBTdWJSb3V0ZXIge1xyXG4gICAgY29uc3RydWN0b3IoY2IsIGNvbmZpZywgYXBwKSB7XHJcbiAgICAgICAgdGhpcy5wYXRoID0gXCJcIjtcclxuICAgICAgICB0aGlzLmFwcCA9IGFwcDtcclxuICAgIH1cclxuICAgIHNldChwYXRoLCBjb25maWcpIHtcclxuICAgICAgICB0aGlzLnBhdGggPSBwYXRoO1xyXG4gICAgICAgIGNvbnN0IGEgPSB0aGlzLmFwcDtcclxuICAgICAgICBhLmFwcC5nZXRSb3V0ZXIoKS5zZXQoYS5fc2VnbWVudC5hcHBlbmQodGhpcy5wYXRoKSwgeyBzaWxlbnQ6IHRydWUgfSk7XHJcbiAgICB9XHJcbiAgICBnZXQoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMucGF0aDtcclxuICAgIH1cclxufVxuXG5sZXQgX29uY2UgPSB0cnVlO1xyXG5jbGFzcyBKZXRBcHBCYXNlIGV4dGVuZHMgSmV0QmFzZSB7XHJcbiAgICBjb25zdHJ1Y3Rvcihjb25maWcpIHtcclxuICAgICAgICBjb25zdCB3ZWJpeCA9IChjb25maWcgfHwge30pLndlYml4IHx8IHdpbmRvdy53ZWJpeDtcclxuICAgICAgICBzdXBlcih3ZWJpeCk7XHJcbiAgICAgICAgLy8gaW5pdCBjb25maWdcclxuICAgICAgICB0aGlzLmNvbmZpZyA9IHRoaXMud2ViaXguZXh0ZW5kKHtcclxuICAgICAgICAgICAgbmFtZTogXCJBcHBcIixcclxuICAgICAgICAgICAgdmVyc2lvbjogXCIxLjBcIixcclxuICAgICAgICAgICAgc3RhcnQ6IFwiL2hvbWVcIlxyXG4gICAgICAgIH0sIGNvbmZpZywgdHJ1ZSk7XHJcbiAgICAgICAgdGhpcy5hcHAgPSB0aGlzLmNvbmZpZy5hcHA7XHJcbiAgICAgICAgdGhpcy5yZWFkeSA9IFByb21pc2UucmVzb2x2ZSgpO1xyXG4gICAgICAgIHRoaXMuX3NlcnZpY2VzID0ge307XHJcbiAgICAgICAgdGhpcy53ZWJpeC5leHRlbmQodGhpcywgdGhpcy53ZWJpeC5FdmVudFN5c3RlbSk7XHJcbiAgICB9XHJcbiAgICBnZXRVcmwoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX3N1YlNlZ21lbnQuc3VidXJsKCk7XHJcbiAgICB9XHJcbiAgICBnZXRVcmxTdHJpbmcoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX3N1YlNlZ21lbnQudG9TdHJpbmcoKTtcclxuICAgIH1cclxuICAgIGdldFNlcnZpY2UobmFtZSkge1xyXG4gICAgICAgIGxldCBvYmogPSB0aGlzLl9zZXJ2aWNlc1tuYW1lXTtcclxuICAgICAgICBpZiAodHlwZW9mIG9iaiA9PT0gXCJmdW5jdGlvblwiKSB7XHJcbiAgICAgICAgICAgIG9iaiA9IHRoaXMuX3NlcnZpY2VzW25hbWVdID0gb2JqKHRoaXMpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gb2JqO1xyXG4gICAgfVxyXG4gICAgc2V0U2VydmljZShuYW1lLCBoYW5kbGVyKSB7XHJcbiAgICAgICAgdGhpcy5fc2VydmljZXNbbmFtZV0gPSBoYW5kbGVyO1xyXG4gICAgfVxyXG4gICAgZGVzdHJ1Y3RvcigpIHtcclxuICAgICAgICB0aGlzLmdldFN1YlZpZXcoKS5kZXN0cnVjdG9yKCk7XHJcbiAgICAgICAgc3VwZXIuZGVzdHJ1Y3RvcigpO1xyXG4gICAgfVxyXG4gICAgLy8gY29weSBvYmplY3QgYW5kIGNvbGxlY3QgZXh0cmEgaGFuZGxlcnNcclxuICAgIGNvcHlDb25maWcob2JqLCB0YXJnZXQsIGNvbmZpZykge1xyXG4gICAgICAgIC8vIHJhdyB1aSBjb25maWdcclxuICAgICAgICBpZiAob2JqIGluc3RhbmNlb2YgSmV0QmFzZSB8fFxyXG4gICAgICAgICAgICAodHlwZW9mIG9iaiA9PT0gXCJmdW5jdGlvblwiICYmIG9iai5wcm90b3R5cGUgaW5zdGFuY2VvZiBKZXRCYXNlKSkge1xyXG4gICAgICAgICAgICBvYmogPSB7ICRzdWJ2aWV3OiBvYmogfTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gc3VidmlldyBwbGFjZWhvbGRlclxyXG4gICAgICAgIGlmICh0eXBlb2Ygb2JqLiRzdWJ2aWV3ICE9IFwidW5kZWZpbmVkXCIpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuYWRkU3ViVmlldyhvYmosIHRhcmdldCwgY29uZmlnKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gcHJvY2VzcyBzdWItcHJvcGVydGllc1xyXG4gICAgICAgIHRhcmdldCA9IHRhcmdldCB8fCAob2JqIGluc3RhbmNlb2YgQXJyYXkgPyBbXSA6IHt9KTtcclxuICAgICAgICBmb3IgKGNvbnN0IG1ldGhvZCBpbiBvYmopIHtcclxuICAgICAgICAgICAgbGV0IHBvaW50ID0gb2JqW21ldGhvZF07XHJcbiAgICAgICAgICAgIC8vIHZpZXcgY2xhc3NcclxuICAgICAgICAgICAgaWYgKHR5cGVvZiBwb2ludCA9PT0gXCJmdW5jdGlvblwiICYmIHBvaW50LnByb3RvdHlwZSBpbnN0YW5jZW9mIEpldEJhc2UpIHtcclxuICAgICAgICAgICAgICAgIHBvaW50ID0geyAkc3VidmlldzogcG9pbnQgfTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAocG9pbnQgJiYgdHlwZW9mIHBvaW50ID09PSBcIm9iamVjdFwiICYmXHJcbiAgICAgICAgICAgICAgICAhKHBvaW50IGluc3RhbmNlb2YgdGhpcy53ZWJpeC5EYXRhQ29sbGVjdGlvbikgJiYgIShwb2ludCBpbnN0YW5jZW9mIFJlZ0V4cCkpIHtcclxuICAgICAgICAgICAgICAgIGlmIChwb2ludCBpbnN0YW5jZW9mIERhdGUpIHtcclxuICAgICAgICAgICAgICAgICAgICB0YXJnZXRbbWV0aG9kXSA9IG5ldyBEYXRlKHBvaW50KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGNvcHkgPSB0aGlzLmNvcHlDb25maWcocG9pbnQsIChwb2ludCBpbnN0YW5jZW9mIEFycmF5ID8gW10gOiB7fSksIGNvbmZpZyk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGNvcHkgIT09IG51bGwpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGFyZ2V0W21ldGhvZF0gPSBjb3B5O1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHRhcmdldFttZXRob2RdID0gcG9pbnQ7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRhcmdldDtcclxuICAgIH1cclxuICAgIGdldFJvdXRlcigpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy4kcm91dGVyO1xyXG4gICAgfVxyXG4gICAgY2xpY2tIYW5kbGVyKGUsIHRhcmdldCkge1xyXG4gICAgICAgIGlmIChlKSB7XHJcbiAgICAgICAgICAgIHRhcmdldCA9IHRhcmdldCB8fCAoZS50YXJnZXQgfHwgZS5zcmNFbGVtZW50KTtcclxuICAgICAgICAgICAgaWYgKHRhcmdldCAmJiB0YXJnZXQuZ2V0QXR0cmlidXRlKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCB0cmlnZ2VyID0gdGFyZ2V0LmdldEF0dHJpYnV0ZShcInRyaWdnZXJcIik7XHJcbiAgICAgICAgICAgICAgICBpZiAodHJpZ2dlcikge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2ZvclZpZXcodGFyZ2V0LCB2aWV3ID0+IHZpZXcuYXBwLnRyaWdnZXIodHJpZ2dlcikpO1xyXG4gICAgICAgICAgICAgICAgICAgIGUuY2FuY2VsQnViYmxlID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgY29uc3Qgcm91dGUgPSB0YXJnZXQuZ2V0QXR0cmlidXRlKFwicm91dGVcIik7XHJcbiAgICAgICAgICAgICAgICBpZiAocm91dGUpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9mb3JWaWV3KHRhcmdldCwgdmlldyA9PiB2aWV3LnNob3cocm91dGUpKTtcclxuICAgICAgICAgICAgICAgICAgICBlLmNhbmNlbEJ1YmJsZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBjb25zdCBwYXJlbnQgPSB0YXJnZXQucGFyZW50Tm9kZTtcclxuICAgICAgICBpZiAocGFyZW50KSB7XHJcbiAgICAgICAgICAgIHRoaXMuY2xpY2tIYW5kbGVyKGUsIHBhcmVudCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgZ2V0Um9vdCgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5nZXRTdWJWaWV3KCkuZ2V0Um9vdCgpO1xyXG4gICAgfVxyXG4gICAgcmVmcmVzaCgpIHtcclxuICAgICAgICBpZiAoIXRoaXMuX3N1YlNlZ21lbnQpIHtcclxuICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZShudWxsKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0U3ViVmlldygpLnJlZnJlc2goKS50aGVuKHZpZXcgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLmNhbGxFdmVudChcImFwcDpyb3V0ZVwiLCBbdGhpcy5nZXRVcmwoKV0pO1xyXG4gICAgICAgICAgICByZXR1cm4gdmlldztcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuICAgIGxvYWRWaWV3KHVybCkge1xyXG4gICAgICAgIGNvbnN0IHZpZXdzID0gdGhpcy5jb25maWcudmlld3M7XHJcbiAgICAgICAgbGV0IHJlc3VsdCA9IG51bGw7XHJcbiAgICAgICAgaWYgKHVybCA9PT0gXCJcIikge1xyXG4gICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKHRoaXMuX2xvYWRFcnJvcihcIlwiLCBuZXcgRXJyb3IoXCJXZWJpeCBKZXQ6IEVtcHR5IHVybCBzZWdtZW50XCIpKSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIGlmICh2aWV3cykge1xyXG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZiB2aWV3cyA9PT0gXCJmdW5jdGlvblwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gY3VzdG9tIGxvYWRpbmcgc3RyYXRlZ3lcclxuICAgICAgICAgICAgICAgICAgICByZXN1bHQgPSB2aWV3cyh1cmwpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gcHJlZGVmaW5lZCBoYXNoXHJcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0ID0gdmlld3NbdXJsXTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgcmVzdWx0ID09PSBcInN0cmluZ1wiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdXJsID0gcmVzdWx0O1xyXG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdCA9IG51bGw7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKCFyZXN1bHQpIHtcclxuICAgICAgICAgICAgICAgIGlmICh1cmwgPT09IFwiX2JsYW5rXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXN1bHQgPSB7fTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdCA9IHRoaXMuX2xvYWRWaWV3RHluYW1pYyh1cmwpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNhdGNoIChlKSB7XHJcbiAgICAgICAgICAgIHJlc3VsdCA9IHRoaXMuX2xvYWRFcnJvcih1cmwsIGUpO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvLyBjdXN0b20gaGFuZGxlciBjYW4gcmV0dXJuIHZpZXcgb3IgaXRzIHByb21pc2VcclxuICAgICAgICBpZiAoIXJlc3VsdC50aGVuKSB7XHJcbiAgICAgICAgICAgIHJlc3VsdCA9IFByb21pc2UucmVzb2x2ZShyZXN1bHQpO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvLyBzZXQgZXJyb3IgaGFuZGxlclxyXG4gICAgICAgIHJlc3VsdCA9IHJlc3VsdFxyXG4gICAgICAgICAgICAudGhlbihtb2R1bGUgPT4gbW9kdWxlLl9fZXNNb2R1bGUgPyBtb2R1bGUuZGVmYXVsdCA6IG1vZHVsZSlcclxuICAgICAgICAgICAgLmNhdGNoKGVyciA9PiB0aGlzLl9sb2FkRXJyb3IodXJsLCBlcnIpKTtcclxuICAgICAgICByZXR1cm4gcmVzdWx0O1xyXG4gICAgfVxyXG4gICAgX2ZvclZpZXcodGFyZ2V0LCBoYW5kbGVyKSB7XHJcbiAgICAgICAgY29uc3QgdmlldyA9IHRoaXMud2ViaXguJCQodGFyZ2V0KTtcclxuICAgICAgICBpZiAodmlldykge1xyXG4gICAgICAgICAgICBoYW5kbGVyKHZpZXcuJHNjb3BlKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBfbG9hZFZpZXdEeW5hbWljKHVybCkge1xyXG4gICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgfVxyXG4gICAgY3JlYXRlRnJvbVVSTChjaHVuaykge1xyXG4gICAgICAgIGxldCB2aWV3O1xyXG4gICAgICAgIGlmIChjaHVuay5pc05ldyB8fCAhY2h1bmsudmlldykge1xyXG4gICAgICAgICAgICB2aWV3ID0gdGhpcy5sb2FkVmlldyhjaHVuay5wYWdlKVxyXG4gICAgICAgICAgICAgICAgLnRoZW4odWkgPT4gdGhpcy5jcmVhdGVWaWV3KHVpLCBuYW1lKSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICB2aWV3ID0gUHJvbWlzZS5yZXNvbHZlKGNodW5rLnZpZXcpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdmlldztcclxuICAgIH1cclxuICAgIGNyZWF0ZVZpZXcodWksIG5hbWUpIHtcclxuICAgICAgICBsZXQgb2JqO1xyXG4gICAgICAgIGlmICh0eXBlb2YgdWkgPT09IFwiZnVuY3Rpb25cIikge1xyXG4gICAgICAgICAgICBpZiAodWkucHJvdG90eXBlIGluc3RhbmNlb2YgSmV0QXBwQmFzZSkge1xyXG4gICAgICAgICAgICAgICAgLy8gVUkgY2xhc3NcclxuICAgICAgICAgICAgICAgIHJldHVybiBuZXcgdWkoeyBhcHA6IHRoaXMsIG5hbWUsIHJvdXRlcjogU3ViUm91dGVyIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2UgaWYgKHVpLnByb3RvdHlwZSBpbnN0YW5jZW9mIEpldEJhc2UpIHtcclxuICAgICAgICAgICAgICAgIC8vIFVJIGNsYXNzXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gbmV3IHVpKHRoaXMsIHsgbmFtZSB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIC8vIFVJIGZhY3RvcnkgZnVuY3Rpb25zXHJcbiAgICAgICAgICAgICAgICB1aSA9IHVpKHRoaXMpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh1aSBpbnN0YW5jZW9mIEpldEJhc2UpIHtcclxuICAgICAgICAgICAgb2JqID0gdWk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAvLyBVSSBvYmplY3RcclxuICAgICAgICAgICAgb2JqID0gbmV3IEpldFZpZXdSYXcodGhpcywgeyBuYW1lLCB1aSB9KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIG9iajtcclxuICAgIH1cclxuICAgIC8vIHNob3cgdmlldyBwYXRoXHJcbiAgICBzaG93KHVybCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnJlbmRlcih0aGlzLl9jb250YWluZXIsICh1cmwgfHwgdGhpcy5jb25maWcuc3RhcnQpKTtcclxuICAgIH1cclxuICAgIC8vIGV2ZW50IGhlbHBlcnNcclxuICAgIHRyaWdnZXIobmFtZSwgLi4ucmVzdCkge1xyXG4gICAgICAgIHRoaXMuYXBwbHkobmFtZSwgcmVzdCk7XHJcbiAgICB9XHJcbiAgICBhcHBseShuYW1lLCBkYXRhKSB7XHJcbiAgICAgICAgdGhpcy5jYWxsRXZlbnQobmFtZSwgZGF0YSk7XHJcbiAgICB9XHJcbiAgICBhY3Rpb24obmFtZSkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLndlYml4LmJpbmQoZnVuY3Rpb24gKC4uLnJlc3QpIHtcclxuICAgICAgICAgICAgdGhpcy5hcHBseShuYW1lLCByZXN0KTtcclxuICAgICAgICB9LCB0aGlzKTtcclxuICAgIH1cclxuICAgIG9uKG5hbWUsIGhhbmRsZXIpIHtcclxuICAgICAgICB0aGlzLmF0dGFjaEV2ZW50KG5hbWUsIGhhbmRsZXIpO1xyXG4gICAgfVxyXG4gICAgdXNlKHBsdWdpbiwgY29uZmlnKSB7XHJcbiAgICAgICAgcGx1Z2luKHRoaXMsIG51bGwsIGNvbmZpZyk7XHJcbiAgICB9XHJcbiAgICBlcnJvcihuYW1lLCBlcikge1xyXG4gICAgICAgIHRoaXMuY2FsbEV2ZW50KG5hbWUsIGVyKTtcclxuICAgICAgICB0aGlzLmNhbGxFdmVudChcImFwcDplcnJvclwiLCBlcik7XHJcbiAgICAgICAgLyogdHNsaW50OmRpc2FibGUgKi9cclxuICAgICAgICBpZiAodGhpcy5jb25maWcuZGVidWcpIHtcclxuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBlci5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihlcltpXSk7XHJcbiAgICAgICAgICAgICAgICBpZiAoZXJbaV0gaW5zdGFuY2VvZiBFcnJvcikge1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCB0ZXh0ID0gZXJbaV0ubWVzc2FnZTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAodGV4dC5pbmRleE9mKFwiTW9kdWxlIGJ1aWxkIGZhaWxlZFwiKSA9PT0gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0ZXh0ID0gdGV4dC5yZXBsYWNlKC9cXHgxYlxcW1swLTk7XSptL2csIFwiXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBkb2N1bWVudC5ib2R5LmlubmVySFRNTCA9IGA8cHJlIHN0eWxlPSdmb250LXNpemU6MTZweDsgYmFja2dyb3VuZC1jb2xvcjogI2VjNjg3MzsgY29sb3I6ICMwMDA7IHBhZGRpbmc6MTBweDsnPiR7dGV4dH08L3ByZT5gO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGV4dCArPSBcIjxicj48YnI+Q2hlY2sgY29uc29sZSBmb3IgbW9yZSBkZXRhaWxzXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMud2ViaXgubWVzc2FnZSh7IHR5cGU6IFwiZXJyb3JcIiwgdGV4dDogdGV4dCwgZXhwaXJlOiAtMSB9KTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZGVidWdnZXI7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8qIHRzbGludDplbmFibGUgKi9cclxuICAgIH1cclxuICAgIC8vIHJlbmRlcnMgdG9wIHZpZXdcclxuICAgIHJlbmRlcihyb290LCB1cmwsIHBhcmVudCkge1xyXG4gICAgICAgIHRoaXMuX2NvbnRhaW5lciA9ICh0eXBlb2Ygcm9vdCA9PT0gXCJzdHJpbmdcIikgP1xyXG4gICAgICAgICAgICB0aGlzLndlYml4LnRvTm9kZShyb290KSA6XHJcbiAgICAgICAgICAgIChyb290IHx8IGRvY3VtZW50LmJvZHkpO1xyXG4gICAgICAgIGNvbnN0IGZpcnN0SW5pdCA9ICF0aGlzLiRyb3V0ZXI7XHJcbiAgICAgICAgbGV0IHBhdGggPSBudWxsO1xyXG4gICAgICAgIGlmIChmaXJzdEluaXQpIHtcclxuICAgICAgICAgICAgaWYgKF9vbmNlICYmIFwidGFnTmFtZVwiIGluIHRoaXMuX2NvbnRhaW5lcikge1xyXG4gICAgICAgICAgICAgICAgdGhpcy53ZWJpeC5ldmVudChkb2N1bWVudC5ib2R5LCBcImNsaWNrXCIsIGUgPT4gdGhpcy5jbGlja0hhbmRsZXIoZSkpO1xyXG4gICAgICAgICAgICAgICAgX29uY2UgPSBmYWxzZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAodHlwZW9mIHVybCA9PT0gXCJzdHJpbmdcIikge1xyXG4gICAgICAgICAgICAgICAgdXJsID0gbmV3IFJvdXRlKHVybCwgMCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5fc3ViU2VnbWVudCA9IHRoaXMuX2ZpcnN0X3N0YXJ0KHVybCk7XHJcbiAgICAgICAgICAgIHRoaXMuX3N1YlNlZ21lbnQucm91dGUubGlua1JvdXRlciA9IHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICBpZiAodHlwZW9mIHVybCA9PT0gXCJzdHJpbmdcIikge1xyXG4gICAgICAgICAgICAgICAgcGF0aCA9IHVybDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmFwcCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHBhdGggPSB1cmwuc3BsaXQoKS5yb3V0ZS5wYXRoIHx8IHRoaXMuY29uZmlnLnN0YXJ0O1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcGF0aCA9IHVybC50b1N0cmluZygpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNvbnN0IHRvcCA9IHRoaXMuZ2V0U3ViVmlldygpO1xyXG4gICAgICAgIGNvbnN0IHNlZ21lbnQgPSB0aGlzLl9zdWJTZWdtZW50O1xyXG4gICAgICAgIGNvbnN0IHJlYWR5ID0gc2VnbWVudC5zaG93KHBhdGgsIHRvcClcclxuICAgICAgICAgICAgLnRoZW4oKCkgPT4gdGhpcy5jcmVhdGVGcm9tVVJMKHNlZ21lbnQuY3VycmVudCgpKSlcclxuICAgICAgICAgICAgLnRoZW4odmlldyA9PiB2aWV3LnJlbmRlcihyb290LCBzZWdtZW50KSlcclxuICAgICAgICAgICAgLnRoZW4oYmFzZSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuJHJvdXRlci5zZXQoc2VnbWVudC5yb3V0ZS5wYXRoLCB7IHNpbGVudDogdHJ1ZSB9KTtcclxuICAgICAgICAgICAgdGhpcy5jYWxsRXZlbnQoXCJhcHA6cm91dGVcIiwgW3RoaXMuZ2V0VXJsKCldKTtcclxuICAgICAgICAgICAgcmV0dXJuIGJhc2U7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgdGhpcy5yZWFkeSA9IHRoaXMucmVhZHkudGhlbigoKSA9PiByZWFkeSk7XHJcbiAgICAgICAgcmV0dXJuIHJlYWR5O1xyXG4gICAgfVxyXG4gICAgZ2V0U3ViVmlldygpIHtcclxuICAgICAgICBpZiAodGhpcy5fc3ViU2VnbWVudCkge1xyXG4gICAgICAgICAgICBjb25zdCB2aWV3ID0gdGhpcy5fc3ViU2VnbWVudC5jdXJyZW50KCkudmlldztcclxuICAgICAgICAgICAgaWYgKHZpZXcpXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdmlldztcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIG5ldyBKZXRWaWV3KHRoaXMsIHt9KTtcclxuICAgIH1cclxuICAgIF9maXJzdF9zdGFydChyb3V0ZSkge1xyXG4gICAgICAgIHRoaXMuX3NlZ21lbnQgPSByb3V0ZTtcclxuICAgICAgICBjb25zdCBjYiA9IChhKSA9PiBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5zaG93KGEpLmNhdGNoKGUgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKCEoZSBpbnN0YW5jZW9mIE5hdmlnYXRpb25CbG9ja2VkKSlcclxuICAgICAgICAgICAgICAgICAgICB0aHJvdyBlO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9LCAxKTtcclxuICAgICAgICB0aGlzLiRyb3V0ZXIgPSBuZXcgKHRoaXMuY29uZmlnLnJvdXRlcikoY2IsIHRoaXMuY29uZmlnLCB0aGlzKTtcclxuICAgICAgICAvLyBzdGFydCBhbmltYXRpb24gZm9yIHRvcC1sZXZlbCBhcHBcclxuICAgICAgICBpZiAodGhpcy5fY29udGFpbmVyID09PSBkb2N1bWVudC5ib2R5ICYmIHRoaXMuY29uZmlnLmFuaW1hdGlvbiAhPT0gZmFsc2UpIHtcclxuICAgICAgICAgICAgY29uc3Qgbm9kZSA9IHRoaXMuX2NvbnRhaW5lcjtcclxuICAgICAgICAgICAgdGhpcy53ZWJpeC5odG1sLmFkZENzcyhub2RlLCBcIndlYml4YXBwc3RhcnRcIik7XHJcbiAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy53ZWJpeC5odG1sLnJlbW92ZUNzcyhub2RlLCBcIndlYml4YXBwc3RhcnRcIik7XHJcbiAgICAgICAgICAgICAgICB0aGlzLndlYml4Lmh0bWwuYWRkQ3NzKG5vZGUsIFwid2ViaXhhcHBcIik7XHJcbiAgICAgICAgICAgIH0sIDEwKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKCFyb3V0ZSkge1xyXG4gICAgICAgICAgICAvLyBpZiBubyB1cmwgZGVmaW5lZCwgY2hlY2sgcm91dGVyIGZpcnN0XHJcbiAgICAgICAgICAgIGxldCB1cmxTdHJpbmcgPSB0aGlzLiRyb3V0ZXIuZ2V0KCk7XHJcbiAgICAgICAgICAgIGlmICghdXJsU3RyaW5nKSB7XHJcbiAgICAgICAgICAgICAgICB1cmxTdHJpbmcgPSB0aGlzLmNvbmZpZy5zdGFydDtcclxuICAgICAgICAgICAgICAgIHRoaXMuJHJvdXRlci5zZXQodXJsU3RyaW5nLCB7IHNpbGVudDogdHJ1ZSB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByb3V0ZSA9IG5ldyBSb3V0ZSh1cmxTdHJpbmcsIDApO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmICh0aGlzLmFwcCkge1xyXG4gICAgICAgICAgICByb3V0ZS5jdXJyZW50KCkudmlldyA9IHRoaXM7XHJcbiAgICAgICAgICAgIGlmIChyb3V0ZS5uZXh0KCkpIHtcclxuICAgICAgICAgICAgICAgIHJvdXRlLnJlZnJlc2goKTtcclxuICAgICAgICAgICAgICAgIHJvdXRlID0gcm91dGUuc3BsaXQoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHJvdXRlID0gbmV3IFJvdXRlKHRoaXMuY29uZmlnLnN0YXJ0LCAwKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gcm91dGU7XHJcbiAgICB9XHJcbiAgICAvLyBlcnJvciBkdXJpbmcgdmlldyByZXNvbHZpbmdcclxuICAgIF9sb2FkRXJyb3IodXJsLCBlcnIpIHtcclxuICAgICAgICB0aGlzLmVycm9yKFwiYXBwOmVycm9yOnJlc29sdmVcIiwgW2VyciwgdXJsXSk7XHJcbiAgICAgICAgcmV0dXJuIHsgdGVtcGxhdGU6IFwiIFwiIH07XHJcbiAgICB9XHJcbiAgICBhZGRTdWJWaWV3KG9iaiwgdGFyZ2V0LCBjb25maWcpIHtcclxuICAgICAgICBjb25zdCB1cmwgPSBvYmouJHN1YnZpZXcgIT09IHRydWUgPyBvYmouJHN1YnZpZXcgOiBudWxsO1xyXG4gICAgICAgIGNvbnN0IG5hbWUgPSBvYmoubmFtZSB8fCAodXJsID8gdGhpcy53ZWJpeC51aWQoKSA6IFwiZGVmYXVsdFwiKTtcclxuICAgICAgICB0YXJnZXQuaWQgPSBvYmouaWQgfHwgXCJzXCIgKyB0aGlzLndlYml4LnVpZCgpO1xyXG4gICAgICAgIGNvbnN0IHZpZXcgPSBjb25maWdbbmFtZV0gPSB7XHJcbiAgICAgICAgICAgIGlkOiB0YXJnZXQuaWQsXHJcbiAgICAgICAgICAgIHVybCxcclxuICAgICAgICAgICAgYnJhbmNoOiBvYmouYnJhbmNoLFxyXG4gICAgICAgICAgICBwb3B1cDogb2JqLnBvcHVwXHJcbiAgICAgICAgfTtcclxuICAgICAgICByZXR1cm4gdmlldy5wb3B1cCA/IG51bGwgOiB0YXJnZXQ7XHJcbiAgICB9XHJcbn1cblxuY2xhc3MgSGFzaFJvdXRlciB7XHJcbiAgICBjb25zdHJ1Y3RvcihjYiwgY29uZmlnKSB7XHJcbiAgICAgICAgdGhpcy5jb25maWcgPSBjb25maWcgfHwge307XHJcbiAgICAgICAgdGhpcy5fZGV0ZWN0UHJlZml4KCk7XHJcbiAgICAgICAgdGhpcy5jYiA9IGNiO1xyXG4gICAgICAgIHdpbmRvdy5vbnBvcHN0YXRlID0gKCkgPT4gdGhpcy5jYih0aGlzLmdldCgpKTtcclxuICAgIH1cclxuICAgIHNldChwYXRoLCBjb25maWcpIHtcclxuICAgICAgICBpZiAodGhpcy5jb25maWcucm91dGVzKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGNvbXBhcmUgPSBwYXRoLnNwbGl0KFwiP1wiLCAyKTtcclxuICAgICAgICAgICAgZm9yIChjb25zdCBrZXkgaW4gdGhpcy5jb25maWcucm91dGVzKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5jb25maWcucm91dGVzW2tleV0gPT09IGNvbXBhcmVbMF0pIHtcclxuICAgICAgICAgICAgICAgICAgICBwYXRoID0ga2V5ICsgKGNvbXBhcmUubGVuZ3RoID4gMSA/IFwiP1wiICsgY29tcGFyZVsxXSA6IFwiXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0aGlzLmdldCgpICE9PSBwYXRoKSB7XHJcbiAgICAgICAgICAgIHdpbmRvdy5oaXN0b3J5LnB1c2hTdGF0ZShudWxsLCBudWxsLCB0aGlzLnByZWZpeCArIHRoaXMuc3VmaXggKyBwYXRoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKCFjb25maWcgfHwgIWNvbmZpZy5zaWxlbnQpIHtcclxuICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB0aGlzLmNiKHBhdGgpLCAxKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBnZXQoKSB7XHJcbiAgICAgICAgbGV0IHBhdGggPSB0aGlzLl9nZXRSYXcoKS5yZXBsYWNlKHRoaXMucHJlZml4LCBcIlwiKS5yZXBsYWNlKHRoaXMuc3VmaXgsIFwiXCIpO1xyXG4gICAgICAgIHBhdGggPSAocGF0aCAhPT0gXCIvXCIgJiYgcGF0aCAhPT0gXCIjXCIpID8gcGF0aCA6IFwiXCI7XHJcbiAgICAgICAgaWYgKHRoaXMuY29uZmlnLnJvdXRlcykge1xyXG4gICAgICAgICAgICBjb25zdCBjb21wYXJlID0gcGF0aC5zcGxpdChcIj9cIiwgMik7XHJcbiAgICAgICAgICAgIGNvbnN0IGtleSA9IHRoaXMuY29uZmlnLnJvdXRlc1tjb21wYXJlWzBdXTtcclxuICAgICAgICAgICAgaWYgKGtleSkge1xyXG4gICAgICAgICAgICAgICAgcGF0aCA9IGtleSArIChjb21wYXJlLmxlbmd0aCA+IDEgPyBcIj9cIiArIGNvbXBhcmVbMV0gOiBcIlwiKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gcGF0aDtcclxuICAgIH1cclxuICAgIF9kZXRlY3RQcmVmaXgoKSB7XHJcbiAgICAgICAgLy8gdXNlIFwiIyFcIiBmb3IgYmFja3dhcmQgY29tcGF0aWJpbGl0eVxyXG4gICAgICAgIGNvbnN0IHN1Zml4ID0gdGhpcy5jb25maWcucm91dGVyUHJlZml4O1xyXG4gICAgICAgIHRoaXMuc3VmaXggPSBcIiNcIiArICgodHlwZW9mIHN1Zml4ID09PSBcInVuZGVmaW5lZFwiKSA/IFwiIVwiIDogc3VmaXgpO1xyXG4gICAgICAgIHRoaXMucHJlZml4ID0gZG9jdW1lbnQubG9jYXRpb24uaHJlZi5zcGxpdChcIiNcIiwgMilbMF07XHJcbiAgICB9XHJcbiAgICBfZ2V0UmF3KCkge1xyXG4gICAgICAgIHJldHVybiBkb2N1bWVudC5sb2NhdGlvbi5ocmVmO1xyXG4gICAgfVxyXG59XG5cbmxldCBpc1BhdGNoZWQgPSBmYWxzZTtcclxuZnVuY3Rpb24gcGF0Y2godykge1xyXG4gICAgaWYgKGlzUGF0Y2hlZCB8fCAhdykge1xyXG4gICAgICAgIHJldHVybjtcclxuICAgIH1cclxuICAgIGlzUGF0Y2hlZCA9IHRydWU7XHJcbiAgICAvLyBjdXN0b20gcHJvbWlzZSBmb3IgSUU4XHJcbiAgICBjb25zdCB3aW4gPSB3aW5kb3c7XHJcbiAgICBpZiAoIXdpbi5Qcm9taXNlKSB7XHJcbiAgICAgICAgd2luLlByb21pc2UgPSB3LnByb21pc2U7XHJcbiAgICB9XHJcbiAgICBjb25zdCB2ZXJzaW9uID0gdy52ZXJzaW9uLnNwbGl0KFwiLlwiKTtcclxuICAgIC8vIHdpbGwgYmUgZml4ZWQgaW4gd2ViaXggNS4zXHJcbiAgICBpZiAodmVyc2lvblswXSAqIDEwICsgdmVyc2lvblsxXSAqIDEgPCA1Mykge1xyXG4gICAgICAgIHcudWkuZnJlZXplID0gZnVuY3Rpb24gKGhhbmRsZXIpIHtcclxuICAgICAgICAgICAgLy8gZGlzYWJsZWQgYmVjYXVzZSB3ZWJpeCBqZXQgNS4wIGNhbid0IGhhbmRsZSByZXNpemUgb2Ygc2Nyb2xsdmlldyBjb3JyZWN0bHlcclxuICAgICAgICAgICAgLy8gdy51aS4kZnJlZXplID0gdHJ1ZTtcclxuICAgICAgICAgICAgY29uc3QgcmVzID0gaGFuZGxlcigpO1xyXG4gICAgICAgICAgICBpZiAocmVzICYmIHJlcy50aGVuKSB7XHJcbiAgICAgICAgICAgICAgICByZXMudGhlbihmdW5jdGlvbiAoc29tZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHcudWkuJGZyZWV6ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgIHcudWkucmVzaXplKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHNvbWU7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHcudWkuJGZyZWV6ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgdy51aS5yZXNpemUoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gcmVzO1xyXG4gICAgICAgIH07XHJcbiAgICB9XHJcbiAgICAvLyBhZGRpbmcgdmlld3MgYXMgY2xhc3Nlc1xyXG4gICAgY29uc3QgYmFzZUFkZCA9IHcudWkuYmFzZWxheW91dC5wcm90b3R5cGUuYWRkVmlldztcclxuICAgIGNvbnN0IGJhc2VSZW1vdmUgPSB3LnVpLmJhc2VsYXlvdXQucHJvdG90eXBlLnJlbW92ZVZpZXc7XHJcbiAgICBjb25zdCBjb25maWcgPSB7XHJcbiAgICAgICAgYWRkVmlldyh2aWV3LCBpbmRleCkge1xyXG4gICAgICAgICAgICAvLyB0cmlnZ2VyIGxvZ2ljIG9ubHkgZm9yIHdpZGdldHMgaW5zaWRlIG9mIGpldC12aWV3XHJcbiAgICAgICAgICAgIC8vIGlnbm9yZSBjYXNlIHdoZW4gYWRkVmlldyB1c2VkIHdpdGggYWxyZWFkeSBpbml0aWFsaXplZCB3aWRnZXRcclxuICAgICAgICAgICAgaWYgKHRoaXMuJHNjb3BlICYmIHRoaXMuJHNjb3BlLndlYml4SmV0ICYmICF2aWV3LnF1ZXJ5Vmlldykge1xyXG4gICAgICAgICAgICAgICAgY29uc3QganZpZXcgPSB0aGlzLiRzY29wZTtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHN1YnMgPSB7fTtcclxuICAgICAgICAgICAgICAgIHZpZXcgPSBqdmlldy5hcHAuY29weUNvbmZpZyh2aWV3LCB7fSwgc3Vicyk7XHJcbiAgICAgICAgICAgICAgICBiYXNlQWRkLmFwcGx5KHRoaXMsIFt2aWV3LCBpbmRleF0pO1xyXG4gICAgICAgICAgICAgICAgZm9yIChjb25zdCBrZXkgaW4gc3Vicykge1xyXG4gICAgICAgICAgICAgICAgICAgIGp2aWV3Ll9yZW5kZXJGcmFtZShrZXksIHN1YnNba2V5XSwgbnVsbCkudGhlbigoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGp2aWV3Ll9zdWJzW2tleV0gPSBzdWJzW2tleV07XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdmlldy5pZDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBiYXNlQWRkLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LFxyXG4gICAgICAgIHJlbW92ZVZpZXcoKSB7XHJcbiAgICAgICAgICAgIGJhc2VSZW1vdmUuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcclxuICAgICAgICAgICAgaWYgKHRoaXMuJHNjb3BlICYmIHRoaXMuJHNjb3BlLndlYml4SmV0KSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBzdWJzID0gdGhpcy4kc2NvcGUuX3N1YnM7XHJcbiAgICAgICAgICAgICAgICAvLyBjaGVjayBhbGwgc3ViLXZpZXdzLCBkZXN0cm95IGFuZCBjbGVhbiB0aGUgcmVtb3ZlZCBvbmVcclxuICAgICAgICAgICAgICAgIGZvciAoY29uc3Qga2V5IGluIHN1YnMpIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCB0ZXN0ID0gc3Vic1trZXldO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICghdy4kJCh0ZXN0LmlkKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0ZXN0LnZpZXcuZGVzdHJ1Y3RvcigpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBkZWxldGUgc3Vic1trZXldO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH07XHJcbiAgICB3LmV4dGVuZCh3LnVpLmxheW91dC5wcm90b3R5cGUsIGNvbmZpZywgdHJ1ZSk7XHJcbiAgICB3LmV4dGVuZCh3LnVpLmJhc2VsYXlvdXQucHJvdG90eXBlLCBjb25maWcsIHRydWUpO1xyXG4gICAgLy8gd3JhcHBlciBmb3IgdXNpbmcgSmV0IEFwcHMgYXMgdmlld3NcclxuICAgIHcucHJvdG9VSSh7XHJcbiAgICAgICAgbmFtZTogXCJqZXRhcHBcIixcclxuICAgICAgICAkaW5pdChjZmcpIHtcclxuICAgICAgICAgICAgdGhpcy4kYXBwID0gbmV3IHRoaXMuYXBwKGNmZyk7XHJcbiAgICAgICAgICAgIGNvbnN0IGlkID0gdy51aWQoKS50b1N0cmluZygpO1xyXG4gICAgICAgICAgICBjZmcuYm9keSA9IHsgaWQgfTtcclxuICAgICAgICAgICAgdGhpcy4kcmVhZHkucHVzaChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLiRhcHAucmVuZGVyKHsgaWQgfSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICBmb3IgKHZhciBrZXkgaW4gdGhpcy4kYXBwKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgb3JpZ2luID0gdGhpcy4kYXBwW2tleV07XHJcbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mIG9yaWdpbiA9PT0gXCJmdW5jdGlvblwiICYmICF0aGlzW2tleV0pIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzW2tleV0gPSBvcmlnaW4uYmluZCh0aGlzLiRhcHApO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfSwgdy51aS5wcm94eSk7XHJcbn1cblxuY2xhc3MgSmV0QXBwIGV4dGVuZHMgSmV0QXBwQmFzZSB7XHJcbiAgICBjb25zdHJ1Y3Rvcihjb25maWcpIHtcclxuICAgICAgICBjb25maWcucm91dGVyID0gY29uZmlnLnJvdXRlciB8fCBIYXNoUm91dGVyO1xyXG4gICAgICAgIHN1cGVyKGNvbmZpZyk7XHJcbiAgICAgICAgcGF0Y2godGhpcy53ZWJpeCk7XHJcbiAgICB9XHJcbiAgICBfbG9hZFZpZXdEeW5hbWljKHVybCkge1xyXG4gICAgICAgIHVybCA9IHVybC5yZXBsYWNlKC9cXC4vZywgXCIvXCIpO1xyXG4gICAgICAgIHJldHVybiByZXF1aXJlKFwiamV0LXZpZXdzL1wiICsgdXJsKTtcclxuICAgIH1cclxufVxuXG5jbGFzcyBTdG9yZVJvdXRlciB7XHJcbiAgICBjb25zdHJ1Y3RvcihjYiwgY29uZmlnLCBhcHApIHtcclxuICAgICAgICB0aGlzLnN0b3JhZ2UgPSBjb25maWcuc3RvcmFnZSB8fCBhcHAud2ViaXguc3RvcmFnZS5zZXNzaW9uO1xyXG4gICAgICAgIHRoaXMubmFtZSA9IChjb25maWcuc3RvcmVOYW1lIHx8IGNvbmZpZy5pZCArIFwiOnJvdXRlXCIpO1xyXG4gICAgICAgIHRoaXMuY2IgPSBjYjtcclxuICAgIH1cclxuICAgIHNldChwYXRoLCBjb25maWcpIHtcclxuICAgICAgICB0aGlzLnN0b3JhZ2UucHV0KHRoaXMubmFtZSwgcGF0aCk7XHJcbiAgICAgICAgaWYgKCFjb25maWcgfHwgIWNvbmZpZy5zaWxlbnQpIHtcclxuICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB0aGlzLmNiKHBhdGgpLCAxKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBnZXQoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuc3RvcmFnZS5nZXQodGhpcy5uYW1lKTtcclxuICAgIH1cclxufVxuXG5jbGFzcyBVcmxSb3V0ZXIgZXh0ZW5kcyBIYXNoUm91dGVyIHtcclxuICAgIF9kZXRlY3RQcmVmaXgoKSB7XHJcbiAgICAgICAgdGhpcy5wcmVmaXggPSBcIlwiO1xyXG4gICAgICAgIHRoaXMuc3VmaXggPSB0aGlzLmNvbmZpZy5yb3V0ZXJQcmVmaXggfHwgXCJcIjtcclxuICAgIH1cclxuICAgIF9nZXRSYXcoKSB7XHJcbiAgICAgICAgcmV0dXJuIGRvY3VtZW50LmxvY2F0aW9uLnBhdGhuYW1lICsgKGRvY3VtZW50LmxvY2F0aW9uLnNlYXJjaCB8fCBcIlwiKTtcclxuICAgIH1cclxufVxuXG5jbGFzcyBFbXB0eVJvdXRlciB7XHJcbiAgICBjb25zdHJ1Y3RvcihjYiwgXyRjb25maWcpIHtcclxuICAgICAgICB0aGlzLnBhdGggPSBcIlwiO1xyXG4gICAgICAgIHRoaXMuY2IgPSBjYjtcclxuICAgIH1cclxuICAgIHNldChwYXRoLCBjb25maWcpIHtcclxuICAgICAgICB0aGlzLnBhdGggPSBwYXRoO1xyXG4gICAgICAgIGlmICghY29uZmlnIHx8ICFjb25maWcuc2lsZW50KSB7XHJcbiAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4gdGhpcy5jYihwYXRoKSwgMSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgZ2V0KCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnBhdGg7XHJcbiAgICB9XHJcbn1cblxuZnVuY3Rpb24gVW5sb2FkR3VhcmQoYXBwLCB2aWV3LCBjb25maWcpIHtcclxuICAgIHZpZXcub24oYXBwLCBgYXBwOmd1YXJkYCwgZnVuY3Rpb24gKF8kdXJsLCBwb2ludCwgcHJvbWlzZSkge1xyXG4gICAgICAgIGlmIChwb2ludCA9PT0gdmlldyB8fCBwb2ludC5jb250YWlucyh2aWV3KSkge1xyXG4gICAgICAgICAgICBjb25zdCByZXMgPSBjb25maWcoKTtcclxuICAgICAgICAgICAgaWYgKHJlcyA9PT0gZmFsc2UpIHtcclxuICAgICAgICAgICAgICAgIHByb21pc2UuY29uZmlybSA9IFByb21pc2UucmVqZWN0KG5ldyBOYXZpZ2F0aW9uQmxvY2tlZCgpKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHByb21pc2UuY29uZmlybSA9IHByb21pc2UuY29uZmlybS50aGVuKCgpID0+IHJlcyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9KTtcclxufVxuXG4vLyAgICAgKGMpIDIwMTItMjAxOCBBaXJibmIsIEluYy5cblxuLy8gdmFyIGhhcyA9IHJlcXVpcmUoJ2hhcycpO1xuZnVuY3Rpb24gaGFzKHN0b3JlLCBrZXkpIHtcbiAgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChzdG9yZSwga2V5KTtcbn1cbi8vIHZhciBmb3JFYWNoID0gcmVxdWlyZSgnZm9yLWVhY2gnKTtcbmZ1bmN0aW9uIGZvckVhY2gob2JqLCBoYW5kbGVyLCBjb250ZXh0KSB7XG4gIGZvciAodmFyIGtleSBpbiBvYmopIHtcbiAgICBpZiAoaGFzKG9iaiwga2V5KSkge1xuICAgICAgaGFuZGxlci5jYWxsKChjb250ZXh0IHx8IG9iaiksIG9ialtrZXldLCBrZXksIG9iaik7XG4gICAgfVxuICB9XG59XG4vLyB2YXIgdHJpbSA9IHJlcXVpcmUoJ3N0cmluZy5wcm90b3R5cGUudHJpbScpO1xuZnVuY3Rpb24gdHJpbShzdHIpIHtcbiAgcmV0dXJuIHN0ci5yZXBsYWNlKC9eW1xcc1xcdUZFRkZcXHhBMF0rfFtcXHNcXHVGRUZGXFx4QTBdKyQvZywgJycpO1xufVxuLy8gdmFyIHdhcm5pbmcgPSByZXF1aXJlKCd3YXJuaW5nJyk7XG5mdW5jdGlvbiB3YXJuKG1lc3NhZ2UpIHtcbiAgbWVzc2FnZSA9ICdXYXJuaW5nOiAnICsgbWVzc2FnZTtcbiAgaWYgKHR5cGVvZiBjb25zb2xlICE9PSAndW5kZWZpbmVkJykge1xuICAgIGNvbnNvbGUuZXJyb3IobWVzc2FnZSk7XG4gIH1cblxuICB0cnkgeyB0aHJvdyBuZXcgRXJyb3IobWVzc2FnZSk7IH0gY2F0Y2ggKHgpIHt9XG59XG5cbnZhciByZXBsYWNlID0gU3RyaW5nLnByb3RvdHlwZS5yZXBsYWNlO1xudmFyIHNwbGl0ID0gU3RyaW5nLnByb3RvdHlwZS5zcGxpdDtcblxuLy8gIyMjIyBQbHVyYWxpemF0aW9uIG1ldGhvZHNcbi8vIFRoZSBzdHJpbmcgdGhhdCBzZXBhcmF0ZXMgdGhlIGRpZmZlcmVudCBwaHJhc2UgcG9zc2liaWxpdGllcy5cbnZhciBkZWxpbWl0ZXIgPSAnfHx8fCc7XG5cbnZhciBydXNzaWFuUGx1cmFsR3JvdXBzID0gZnVuY3Rpb24gKG4pIHtcbiAgdmFyIGVuZCA9IG4gJSAxMDtcbiAgaWYgKG4gIT09IDExICYmIGVuZCA9PT0gMSkge1xuICAgIHJldHVybiAwO1xuICB9XG4gIGlmICgyIDw9IGVuZCAmJiBlbmQgPD0gNCAmJiAhKG4gPj0gMTIgJiYgbiA8PSAxNCkpIHtcbiAgICByZXR1cm4gMTtcbiAgfVxuICByZXR1cm4gMjtcbn07XG5cbi8vIE1hcHBpbmcgZnJvbSBwbHVyYWxpemF0aW9uIGdyb3VwIHBsdXJhbCBsb2dpYy5cbnZhciBwbHVyYWxUeXBlcyA9IHtcbiAgYXJhYmljOiBmdW5jdGlvbiAobikge1xuICAgIC8vIGh0dHA6Ly93d3cuYXJhYmV5ZXMub3JnL1BsdXJhbF9Gb3Jtc1xuICAgIGlmIChuIDwgMykgeyByZXR1cm4gbjsgfVxuICAgIHZhciBsYXN0VHdvID0gbiAlIDEwMDtcbiAgICBpZiAobGFzdFR3byA+PSAzICYmIGxhc3RUd28gPD0gMTApIHJldHVybiAzO1xuICAgIHJldHVybiBsYXN0VHdvID49IDExID8gNCA6IDU7XG4gIH0sXG4gIGJvc25pYW5fc2VyYmlhbjogcnVzc2lhblBsdXJhbEdyb3VwcyxcbiAgY2hpbmVzZTogZnVuY3Rpb24gKCkgeyByZXR1cm4gMDsgfSxcbiAgY3JvYXRpYW46IHJ1c3NpYW5QbHVyYWxHcm91cHMsXG4gIGZyZW5jaDogZnVuY3Rpb24gKG4pIHsgcmV0dXJuIG4gPiAxID8gMSA6IDA7IH0sXG4gIGdlcm1hbjogZnVuY3Rpb24gKG4pIHsgcmV0dXJuIG4gIT09IDEgPyAxIDogMDsgfSxcbiAgcnVzc2lhbjogcnVzc2lhblBsdXJhbEdyb3VwcyxcbiAgbGl0aHVhbmlhbjogZnVuY3Rpb24gKG4pIHtcbiAgICBpZiAobiAlIDEwID09PSAxICYmIG4gJSAxMDAgIT09IDExKSB7IHJldHVybiAwOyB9XG4gICAgcmV0dXJuIG4gJSAxMCA+PSAyICYmIG4gJSAxMCA8PSA5ICYmIChuICUgMTAwIDwgMTEgfHwgbiAlIDEwMCA+IDE5KSA/IDEgOiAyO1xuICB9LFxuICBjemVjaDogZnVuY3Rpb24gKG4pIHtcbiAgICBpZiAobiA9PT0gMSkgeyByZXR1cm4gMDsgfVxuICAgIHJldHVybiAobiA+PSAyICYmIG4gPD0gNCkgPyAxIDogMjtcbiAgfSxcbiAgcG9saXNoOiBmdW5jdGlvbiAobikge1xuICAgIGlmIChuID09PSAxKSB7IHJldHVybiAwOyB9XG4gICAgdmFyIGVuZCA9IG4gJSAxMDtcbiAgICByZXR1cm4gMiA8PSBlbmQgJiYgZW5kIDw9IDQgJiYgKG4gJSAxMDAgPCAxMCB8fCBuICUgMTAwID49IDIwKSA/IDEgOiAyO1xuICB9LFxuICBpY2VsYW5kaWM6IGZ1bmN0aW9uIChuKSB7IHJldHVybiAobiAlIDEwICE9PSAxIHx8IG4gJSAxMDAgPT09IDExKSA/IDEgOiAwOyB9LFxuICBzbG92ZW5pYW46IGZ1bmN0aW9uIChuKSB7XG4gICAgdmFyIGxhc3RUd28gPSBuICUgMTAwO1xuICAgIGlmIChsYXN0VHdvID09PSAxKSB7XG4gICAgICByZXR1cm4gMDtcbiAgICB9XG4gICAgaWYgKGxhc3RUd28gPT09IDIpIHtcbiAgICAgIHJldHVybiAxO1xuICAgIH1cbiAgICBpZiAobGFzdFR3byA9PT0gMyB8fCBsYXN0VHdvID09PSA0KSB7XG4gICAgICByZXR1cm4gMjtcbiAgICB9XG4gICAgcmV0dXJuIDM7XG4gIH1cbn07XG5cblxuLy8gTWFwcGluZyBmcm9tIHBsdXJhbGl6YXRpb24gZ3JvdXAgdG8gaW5kaXZpZHVhbCBsYW5ndWFnZSBjb2Rlcy9sb2NhbGVzLlxuLy8gV2lsbCBsb29rIHVwIGJhc2VkIG9uIGV4YWN0IG1hdGNoLCBpZiBub3QgZm91bmQgYW5kIGl0J3MgYSBsb2NhbGUgd2lsbCBwYXJzZSB0aGUgbG9jYWxlXG4vLyBmb3IgbGFuZ3VhZ2UgY29kZSwgYW5kIGlmIHRoYXQgZG9lcyBub3QgZXhpc3Qgd2lsbCBkZWZhdWx0IHRvICdlbidcbnZhciBwbHVyYWxUeXBlVG9MYW5ndWFnZXMgPSB7XG4gIGFyYWJpYzogWydhciddLFxuICBib3NuaWFuX3NlcmJpYW46IFsnYnMtTGF0bi1CQScsICdicy1DeXJsLUJBJywgJ3NybC1SUycsICdzci1SUyddLFxuICBjaGluZXNlOiBbJ2lkJywgJ2lkLUlEJywgJ2phJywgJ2tvJywgJ2tvLUtSJywgJ2xvJywgJ21zJywgJ3RoJywgJ3RoLVRIJywgJ3poJ10sXG4gIGNyb2F0aWFuOiBbJ2hyJywgJ2hyLUhSJ10sXG4gIGdlcm1hbjogWydmYScsICdkYScsICdkZScsICdlbicsICdlcycsICdmaScsICdlbCcsICdoZScsICdoaS1JTicsICdodScsICdodS1IVScsICdpdCcsICdubCcsICdubycsICdwdCcsICdzdicsICd0ciddLFxuICBmcmVuY2g6IFsnZnInLCAndGwnLCAncHQtYnInXSxcbiAgcnVzc2lhbjogWydydScsICdydS1SVSddLFxuICBsaXRodWFuaWFuOiBbJ2x0J10sXG4gIGN6ZWNoOiBbJ2NzJywgJ2NzLUNaJywgJ3NrJ10sXG4gIHBvbGlzaDogWydwbCddLFxuICBpY2VsYW5kaWM6IFsnaXMnXSxcbiAgc2xvdmVuaWFuOiBbJ3NsLVNMJ11cbn07XG5cbmZ1bmN0aW9uIGxhbmdUb1R5cGVNYXAobWFwcGluZykge1xuICB2YXIgcmV0ID0ge307XG4gIGZvckVhY2gobWFwcGluZywgZnVuY3Rpb24gKGxhbmdzLCB0eXBlKSB7XG4gICAgZm9yRWFjaChsYW5ncywgZnVuY3Rpb24gKGxhbmcpIHtcbiAgICAgIHJldFtsYW5nXSA9IHR5cGU7XG4gICAgfSk7XG4gIH0pO1xuICByZXR1cm4gcmV0O1xufVxuXG5mdW5jdGlvbiBwbHVyYWxUeXBlTmFtZShsb2NhbGUpIHtcbiAgdmFyIGxhbmdUb1BsdXJhbFR5cGUgPSBsYW5nVG9UeXBlTWFwKHBsdXJhbFR5cGVUb0xhbmd1YWdlcyk7XG4gIHJldHVybiBsYW5nVG9QbHVyYWxUeXBlW2xvY2FsZV1cbiAgICB8fCBsYW5nVG9QbHVyYWxUeXBlW3NwbGl0LmNhbGwobG9jYWxlLCAvLS8sIDEpWzBdXVxuICAgIHx8IGxhbmdUb1BsdXJhbFR5cGUuZW47XG59XG5cbmZ1bmN0aW9uIHBsdXJhbFR5cGVJbmRleChsb2NhbGUsIGNvdW50KSB7XG4gIHJldHVybiBwbHVyYWxUeXBlc1twbHVyYWxUeXBlTmFtZShsb2NhbGUpXShjb3VudCk7XG59XG5cbmZ1bmN0aW9uIGVzY2FwZSh0b2tlbikge1xuICByZXR1cm4gdG9rZW4ucmVwbGFjZSgvWy4qKz9eJHt9KCl8W1xcXVxcXFxdL2csICdcXFxcJCYnKTtcbn1cblxuZnVuY3Rpb24gY29uc3RydWN0VG9rZW5SZWdleChvcHRzKSB7XG4gIHZhciBwcmVmaXggPSAob3B0cyAmJiBvcHRzLnByZWZpeCkgfHwgJyV7JztcbiAgdmFyIHN1ZmZpeCA9IChvcHRzICYmIG9wdHMuc3VmZml4KSB8fCAnfSc7XG5cbiAgaWYgKHByZWZpeCA9PT0gZGVsaW1pdGVyIHx8IHN1ZmZpeCA9PT0gZGVsaW1pdGVyKSB7XG4gICAgdGhyb3cgbmV3IFJhbmdlRXJyb3IoJ1wiJyArIGRlbGltaXRlciArICdcIiB0b2tlbiBpcyByZXNlcnZlZCBmb3IgcGx1cmFsaXphdGlvbicpO1xuICB9XG5cbiAgcmV0dXJuIG5ldyBSZWdFeHAoZXNjYXBlKHByZWZpeCkgKyAnKC4qPyknICsgZXNjYXBlKHN1ZmZpeCksICdnJyk7XG59XG5cbnZhciBkb2xsYXJSZWdleCA9IC9cXCQvZztcbnZhciBkb2xsYXJCaWxsc1lhbGwgPSAnJCQnO1xudmFyIGRlZmF1bHRUb2tlblJlZ2V4ID0gLyVcXHsoLio/KVxcfS9nO1xuXG4vLyAjIyMgdHJhbnNmb3JtUGhyYXNlKHBocmFzZSwgc3Vic3RpdHV0aW9ucywgbG9jYWxlKVxuLy9cbi8vIFRha2VzIGEgcGhyYXNlIHN0cmluZyBhbmQgdHJhbnNmb3JtcyBpdCBieSBjaG9vc2luZyB0aGUgY29ycmVjdFxuLy8gcGx1cmFsIGZvcm0gYW5kIGludGVycG9sYXRpbmcgaXQuXG4vL1xuLy8gICAgIHRyYW5zZm9ybVBocmFzZSgnSGVsbG8sICV7bmFtZX0hJywge25hbWU6ICdTcGlrZSd9KTtcbi8vICAgICAvLyBcIkhlbGxvLCBTcGlrZSFcIlxuLy9cbi8vIFRoZSBjb3JyZWN0IHBsdXJhbCBmb3JtIGlzIHNlbGVjdGVkIGlmIHN1YnN0aXR1dGlvbnMuc21hcnRfY291bnRcbi8vIGlzIHNldC4gWW91IGNhbiBwYXNzIGluIGEgbnVtYmVyIGluc3RlYWQgb2YgYW4gT2JqZWN0IGFzIGBzdWJzdGl0dXRpb25zYFxuLy8gYXMgYSBzaG9ydGN1dCBmb3IgYHNtYXJ0X2NvdW50YC5cbi8vXG4vLyAgICAgdHJhbnNmb3JtUGhyYXNlKCcle3NtYXJ0X2NvdW50fSBuZXcgbWVzc2FnZXMgfHx8fCAxIG5ldyBtZXNzYWdlJywge3NtYXJ0X2NvdW50OiAxfSwgJ2VuJyk7XG4vLyAgICAgLy8gXCIxIG5ldyBtZXNzYWdlXCJcbi8vXG4vLyAgICAgdHJhbnNmb3JtUGhyYXNlKCcle3NtYXJ0X2NvdW50fSBuZXcgbWVzc2FnZXMgfHx8fCAxIG5ldyBtZXNzYWdlJywge3NtYXJ0X2NvdW50OiAyfSwgJ2VuJyk7XG4vLyAgICAgLy8gXCIyIG5ldyBtZXNzYWdlc1wiXG4vL1xuLy8gICAgIHRyYW5zZm9ybVBocmFzZSgnJXtzbWFydF9jb3VudH0gbmV3IG1lc3NhZ2VzIHx8fHwgMSBuZXcgbWVzc2FnZScsIDUsICdlbicpO1xuLy8gICAgIC8vIFwiNSBuZXcgbWVzc2FnZXNcIlxuLy9cbi8vIFlvdSBzaG91bGQgcGFzcyBpbiBhIHRoaXJkIGFyZ3VtZW50LCB0aGUgbG9jYWxlLCB0byBzcGVjaWZ5IHRoZSBjb3JyZWN0IHBsdXJhbCB0eXBlLlxuLy8gSXQgZGVmYXVsdHMgdG8gYCdlbidgIHdpdGggMiBwbHVyYWwgZm9ybXMuXG5mdW5jdGlvbiB0cmFuc2Zvcm1QaHJhc2UocGhyYXNlLCBzdWJzdGl0dXRpb25zLCBsb2NhbGUsIHRva2VuUmVnZXgpIHtcbiAgaWYgKHR5cGVvZiBwaHJhc2UgIT09ICdzdHJpbmcnKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcignUG9seWdsb3QudHJhbnNmb3JtUGhyYXNlIGV4cGVjdHMgYXJndW1lbnQgIzEgdG8gYmUgc3RyaW5nJyk7XG4gIH1cblxuICBpZiAoc3Vic3RpdHV0aW9ucyA9PSBudWxsKSB7XG4gICAgcmV0dXJuIHBocmFzZTtcbiAgfVxuXG4gIHZhciByZXN1bHQgPSBwaHJhc2U7XG4gIHZhciBpbnRlcnBvbGF0aW9uUmVnZXggPSB0b2tlblJlZ2V4IHx8IGRlZmF1bHRUb2tlblJlZ2V4O1xuXG4gIC8vIGFsbG93IG51bWJlciBhcyBhIHBsdXJhbGl6YXRpb24gc2hvcnRjdXRcbiAgdmFyIG9wdGlvbnMgPSB0eXBlb2Ygc3Vic3RpdHV0aW9ucyA9PT0gJ251bWJlcicgPyB7IHNtYXJ0X2NvdW50OiBzdWJzdGl0dXRpb25zIH0gOiBzdWJzdGl0dXRpb25zO1xuXG4gIC8vIFNlbGVjdCBwbHVyYWwgZm9ybTogYmFzZWQgb24gYSBwaHJhc2UgdGV4dCB0aGF0IGNvbnRhaW5zIGBuYFxuICAvLyBwbHVyYWwgZm9ybXMgc2VwYXJhdGVkIGJ5IGBkZWxpbWl0ZXJgLCBhIGBsb2NhbGVgLCBhbmQgYSBgc3Vic3RpdHV0aW9ucy5zbWFydF9jb3VudGAsXG4gIC8vIGNob29zZSB0aGUgY29ycmVjdCBwbHVyYWwgZm9ybS4gVGhpcyBpcyBvbmx5IGRvbmUgaWYgYGNvdW50YCBpcyBzZXQuXG4gIGlmIChvcHRpb25zLnNtYXJ0X2NvdW50ICE9IG51bGwgJiYgcmVzdWx0KSB7XG4gICAgdmFyIHRleHRzID0gc3BsaXQuY2FsbChyZXN1bHQsIGRlbGltaXRlcik7XG4gICAgcmVzdWx0ID0gdHJpbSh0ZXh0c1twbHVyYWxUeXBlSW5kZXgobG9jYWxlIHx8ICdlbicsIG9wdGlvbnMuc21hcnRfY291bnQpXSB8fCB0ZXh0c1swXSk7XG4gIH1cblxuICAvLyBJbnRlcnBvbGF0ZTogQ3JlYXRlcyBhIGBSZWdFeHBgIG9iamVjdCBmb3IgZWFjaCBpbnRlcnBvbGF0aW9uIHBsYWNlaG9sZGVyLlxuICByZXN1bHQgPSByZXBsYWNlLmNhbGwocmVzdWx0LCBpbnRlcnBvbGF0aW9uUmVnZXgsIGZ1bmN0aW9uIChleHByZXNzaW9uLCBhcmd1bWVudCkge1xuICAgIGlmICghaGFzKG9wdGlvbnMsIGFyZ3VtZW50KSB8fCBvcHRpb25zW2FyZ3VtZW50XSA9PSBudWxsKSB7IHJldHVybiBleHByZXNzaW9uOyB9XG4gICAgLy8gRW5zdXJlIHJlcGxhY2VtZW50IHZhbHVlIGlzIGVzY2FwZWQgdG8gcHJldmVudCBzcGVjaWFsICQtcHJlZml4ZWQgcmVnZXggcmVwbGFjZSB0b2tlbnMuXG4gICAgcmV0dXJuIHJlcGxhY2UuY2FsbChvcHRpb25zW2FyZ3VtZW50XSwgZG9sbGFyUmVnZXgsIGRvbGxhckJpbGxzWWFsbCk7XG4gIH0pO1xuXG4gIHJldHVybiByZXN1bHQ7XG59XG5cbi8vICMjIyBQb2x5Z2xvdCBjbGFzcyBjb25zdHJ1Y3RvclxuZnVuY3Rpb24gUG9seWdsb3Qob3B0aW9ucykge1xuICB2YXIgb3B0cyA9IG9wdGlvbnMgfHwge307XG4gIHRoaXMucGhyYXNlcyA9IHt9O1xuICB0aGlzLmV4dGVuZChvcHRzLnBocmFzZXMgfHwge30pO1xuICB0aGlzLmN1cnJlbnRMb2NhbGUgPSBvcHRzLmxvY2FsZSB8fCAnZW4nO1xuICB2YXIgYWxsb3dNaXNzaW5nID0gb3B0cy5hbGxvd01pc3NpbmcgPyB0cmFuc2Zvcm1QaHJhc2UgOiBudWxsO1xuICB0aGlzLm9uTWlzc2luZ0tleSA9IHR5cGVvZiBvcHRzLm9uTWlzc2luZ0tleSA9PT0gJ2Z1bmN0aW9uJyA/IG9wdHMub25NaXNzaW5nS2V5IDogYWxsb3dNaXNzaW5nO1xuICB0aGlzLndhcm4gPSBvcHRzLndhcm4gfHwgd2FybjtcbiAgdGhpcy50b2tlblJlZ2V4ID0gY29uc3RydWN0VG9rZW5SZWdleChvcHRzLmludGVycG9sYXRpb24pO1xufVxuXG4vLyAjIyMgcG9seWdsb3QubG9jYWxlKFtsb2NhbGVdKVxuLy9cbi8vIEdldCBvciBzZXQgbG9jYWxlLiBJbnRlcm5hbGx5LCBQb2x5Z2xvdCBvbmx5IHVzZXMgbG9jYWxlIGZvciBwbHVyYWxpemF0aW9uLlxuUG9seWdsb3QucHJvdG90eXBlLmxvY2FsZSA9IGZ1bmN0aW9uIChuZXdMb2NhbGUpIHtcbiAgaWYgKG5ld0xvY2FsZSkgdGhpcy5jdXJyZW50TG9jYWxlID0gbmV3TG9jYWxlO1xuICByZXR1cm4gdGhpcy5jdXJyZW50TG9jYWxlO1xufTtcblxuLy8gIyMjIHBvbHlnbG90LmV4dGVuZChwaHJhc2VzKVxuLy9cbi8vIFVzZSBgZXh0ZW5kYCB0byB0ZWxsIFBvbHlnbG90IGhvdyB0byB0cmFuc2xhdGUgYSBnaXZlbiBrZXkuXG4vL1xuLy8gICAgIHBvbHlnbG90LmV4dGVuZCh7XG4vLyAgICAgICBcImhlbGxvXCI6IFwiSGVsbG9cIixcbi8vICAgICAgIFwiaGVsbG9fbmFtZVwiOiBcIkhlbGxvLCAle25hbWV9XCJcbi8vICAgICB9KTtcbi8vXG4vLyBUaGUga2V5IGNhbiBiZSBhbnkgc3RyaW5nLiAgRmVlbCBmcmVlIHRvIGNhbGwgYGV4dGVuZGAgbXVsdGlwbGUgdGltZXM7XG4vLyBpdCB3aWxsIG92ZXJyaWRlIGFueSBwaHJhc2VzIHdpdGggdGhlIHNhbWUga2V5LCBidXQgbGVhdmUgZXhpc3RpbmcgcGhyYXNlc1xuLy8gdW50b3VjaGVkLlxuLy9cbi8vIEl0IGlzIGFsc28gcG9zc2libGUgdG8gcGFzcyBuZXN0ZWQgcGhyYXNlIG9iamVjdHMsIHdoaWNoIGdldCBmbGF0dGVuZWRcbi8vIGludG8gYW4gb2JqZWN0IHdpdGggdGhlIG5lc3RlZCBrZXlzIGNvbmNhdGVuYXRlZCB1c2luZyBkb3Qgbm90YXRpb24uXG4vL1xuLy8gICAgIHBvbHlnbG90LmV4dGVuZCh7XG4vLyAgICAgICBcIm5hdlwiOiB7XG4vLyAgICAgICAgIFwiaGVsbG9cIjogXCJIZWxsb1wiLFxuLy8gICAgICAgICBcImhlbGxvX25hbWVcIjogXCJIZWxsbywgJXtuYW1lfVwiLFxuLy8gICAgICAgICBcInNpZGViYXJcIjoge1xuLy8gICAgICAgICAgIFwid2VsY29tZVwiOiBcIldlbGNvbWVcIlxuLy8gICAgICAgICB9XG4vLyAgICAgICB9XG4vLyAgICAgfSk7XG4vL1xuLy8gICAgIGNvbnNvbGUubG9nKHBvbHlnbG90LnBocmFzZXMpO1xuLy8gICAgIC8vIHtcbi8vICAgICAvLyAgICduYXYuaGVsbG8nOiAnSGVsbG8nLFxuLy8gICAgIC8vICAgJ25hdi5oZWxsb19uYW1lJzogJ0hlbGxvLCAle25hbWV9Jyxcbi8vICAgICAvLyAgICduYXYuc2lkZWJhci53ZWxjb21lJzogJ1dlbGNvbWUnXG4vLyAgICAgLy8gfVxuLy9cbi8vIGBleHRlbmRgIGFjY2VwdHMgYW4gb3B0aW9uYWwgc2Vjb25kIGFyZ3VtZW50LCBgcHJlZml4YCwgd2hpY2ggY2FuIGJlIHVzZWRcbi8vIHRvIHByZWZpeCBldmVyeSBrZXkgaW4gdGhlIHBocmFzZXMgb2JqZWN0IHdpdGggc29tZSBzdHJpbmcsIHVzaW5nIGRvdFxuLy8gbm90YXRpb24uXG4vL1xuLy8gICAgIHBvbHlnbG90LmV4dGVuZCh7XG4vLyAgICAgICBcImhlbGxvXCI6IFwiSGVsbG9cIixcbi8vICAgICAgIFwiaGVsbG9fbmFtZVwiOiBcIkhlbGxvLCAle25hbWV9XCJcbi8vICAgICB9LCBcIm5hdlwiKTtcbi8vXG4vLyAgICAgY29uc29sZS5sb2cocG9seWdsb3QucGhyYXNlcyk7XG4vLyAgICAgLy8ge1xuLy8gICAgIC8vICAgJ25hdi5oZWxsbyc6ICdIZWxsbycsXG4vLyAgICAgLy8gICAnbmF2LmhlbGxvX25hbWUnOiAnSGVsbG8sICV7bmFtZX0nXG4vLyAgICAgLy8gfVxuLy9cbi8vIFRoaXMgZmVhdHVyZSBpcyB1c2VkIGludGVybmFsbHkgdG8gc3VwcG9ydCBuZXN0ZWQgcGhyYXNlIG9iamVjdHMuXG5Qb2x5Z2xvdC5wcm90b3R5cGUuZXh0ZW5kID0gZnVuY3Rpb24gKG1vcmVQaHJhc2VzLCBwcmVmaXgpIHtcbiAgZm9yRWFjaChtb3JlUGhyYXNlcywgZnVuY3Rpb24gKHBocmFzZSwga2V5KSB7XG4gICAgdmFyIHByZWZpeGVkS2V5ID0gcHJlZml4ID8gcHJlZml4ICsgJy4nICsga2V5IDoga2V5O1xuICAgIGlmICh0eXBlb2YgcGhyYXNlID09PSAnb2JqZWN0Jykge1xuICAgICAgdGhpcy5leHRlbmQocGhyYXNlLCBwcmVmaXhlZEtleSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMucGhyYXNlc1twcmVmaXhlZEtleV0gPSBwaHJhc2U7XG4gICAgfVxuICB9LCB0aGlzKTtcbn07XG5cbi8vICMjIyBwb2x5Z2xvdC51bnNldChwaHJhc2VzKVxuLy8gVXNlIGB1bnNldGAgdG8gc2VsZWN0aXZlbHkgcmVtb3ZlIGtleXMgZnJvbSBhIHBvbHlnbG90IGluc3RhbmNlLlxuLy9cbi8vICAgICBwb2x5Z2xvdC51bnNldChcInNvbWVfa2V5XCIpO1xuLy8gICAgIHBvbHlnbG90LnVuc2V0KHtcbi8vICAgICAgIFwiaGVsbG9cIjogXCJIZWxsb1wiLFxuLy8gICAgICAgXCJoZWxsb19uYW1lXCI6IFwiSGVsbG8sICV7bmFtZX1cIlxuLy8gICAgIH0pO1xuLy9cbi8vIFRoZSB1bnNldCBtZXRob2QgY2FuIHRha2UgZWl0aGVyIGEgc3RyaW5nIChmb3IgdGhlIGtleSksIG9yIGFuIG9iamVjdCBoYXNoIHdpdGhcbi8vIHRoZSBrZXlzIHRoYXQgeW91IHdvdWxkIGxpa2UgdG8gdW5zZXQuXG5Qb2x5Z2xvdC5wcm90b3R5cGUudW5zZXQgPSBmdW5jdGlvbiAobW9yZVBocmFzZXMsIHByZWZpeCkge1xuICBpZiAodHlwZW9mIG1vcmVQaHJhc2VzID09PSAnc3RyaW5nJykge1xuICAgIGRlbGV0ZSB0aGlzLnBocmFzZXNbbW9yZVBocmFzZXNdO1xuICB9IGVsc2Uge1xuICAgIGZvckVhY2gobW9yZVBocmFzZXMsIGZ1bmN0aW9uIChwaHJhc2UsIGtleSkge1xuICAgICAgdmFyIHByZWZpeGVkS2V5ID0gcHJlZml4ID8gcHJlZml4ICsgJy4nICsga2V5IDoga2V5O1xuICAgICAgaWYgKHR5cGVvZiBwaHJhc2UgPT09ICdvYmplY3QnKSB7XG4gICAgICAgIHRoaXMudW5zZXQocGhyYXNlLCBwcmVmaXhlZEtleSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBkZWxldGUgdGhpcy5waHJhc2VzW3ByZWZpeGVkS2V5XTtcbiAgICAgIH1cbiAgICB9LCB0aGlzKTtcbiAgfVxufTtcblxuLy8gIyMjIHBvbHlnbG90LmNsZWFyKClcbi8vXG4vLyBDbGVhcnMgYWxsIHBocmFzZXMuIFVzZWZ1bCBmb3Igc3BlY2lhbCBjYXNlcywgc3VjaCBhcyBmcmVlaW5nXG4vLyB1cCBtZW1vcnkgaWYgeW91IGhhdmUgbG90cyBvZiBwaHJhc2VzIGJ1dCBubyBsb25nZXIgbmVlZCB0b1xuLy8gcGVyZm9ybSBhbnkgdHJhbnNsYXRpb24uIEFsc28gdXNlZCBpbnRlcm5hbGx5IGJ5IGByZXBsYWNlYC5cblBvbHlnbG90LnByb3RvdHlwZS5jbGVhciA9IGZ1bmN0aW9uICgpIHtcbiAgdGhpcy5waHJhc2VzID0ge307XG59O1xuXG4vLyAjIyMgcG9seWdsb3QucmVwbGFjZShwaHJhc2VzKVxuLy9cbi8vIENvbXBsZXRlbHkgcmVwbGFjZSB0aGUgZXhpc3RpbmcgcGhyYXNlcyB3aXRoIGEgbmV3IHNldCBvZiBwaHJhc2VzLlxuLy8gTm9ybWFsbHksIGp1c3QgdXNlIGBleHRlbmRgIHRvIGFkZCBtb3JlIHBocmFzZXMsIGJ1dCB1bmRlciBjZXJ0YWluXG4vLyBjaXJjdW1zdGFuY2VzLCB5b3UgbWF5IHdhbnQgdG8gbWFrZSBzdXJlIG5vIG9sZCBwaHJhc2VzIGFyZSBseWluZyBhcm91bmQuXG5Qb2x5Z2xvdC5wcm90b3R5cGUucmVwbGFjZSA9IGZ1bmN0aW9uIChuZXdQaHJhc2VzKSB7XG4gIHRoaXMuY2xlYXIoKTtcbiAgdGhpcy5leHRlbmQobmV3UGhyYXNlcyk7XG59O1xuXG5cbi8vICMjIyBwb2x5Z2xvdC50KGtleSwgb3B0aW9ucylcbi8vXG4vLyBUaGUgbW9zdC11c2VkIG1ldGhvZC4gUHJvdmlkZSBhIGtleSwgYW5kIGB0YCB3aWxsIHJldHVybiB0aGVcbi8vIHBocmFzZS5cbi8vXG4vLyAgICAgcG9seWdsb3QudChcImhlbGxvXCIpO1xuLy8gICAgID0+IFwiSGVsbG9cIlxuLy9cbi8vIFRoZSBwaHJhc2UgdmFsdWUgaXMgcHJvdmlkZWQgZmlyc3QgYnkgYSBjYWxsIHRvIGBwb2x5Z2xvdC5leHRlbmQoKWAgb3Jcbi8vIGBwb2x5Z2xvdC5yZXBsYWNlKClgLlxuLy9cbi8vIFBhc3MgaW4gYW4gb2JqZWN0IGFzIHRoZSBzZWNvbmQgYXJndW1lbnQgdG8gcGVyZm9ybSBpbnRlcnBvbGF0aW9uLlxuLy9cbi8vICAgICBwb2x5Z2xvdC50KFwiaGVsbG9fbmFtZVwiLCB7bmFtZTogXCJTcGlrZVwifSk7XG4vLyAgICAgPT4gXCJIZWxsbywgU3Bpa2VcIlxuLy9cbi8vIElmIHlvdSBsaWtlLCB5b3UgY2FuIHByb3ZpZGUgYSBkZWZhdWx0IHZhbHVlIGluIGNhc2UgdGhlIHBocmFzZSBpcyBtaXNzaW5nLlxuLy8gVXNlIHRoZSBzcGVjaWFsIG9wdGlvbiBrZXkgXCJfXCIgdG8gc3BlY2lmeSBhIGRlZmF1bHQuXG4vL1xuLy8gICAgIHBvbHlnbG90LnQoXCJpX2xpa2VfdG9fd3JpdGVfaW5fbGFuZ3VhZ2VcIiwge1xuLy8gICAgICAgXzogXCJJIGxpa2UgdG8gd3JpdGUgaW4gJXtsYW5ndWFnZX0uXCIsXG4vLyAgICAgICBsYW5ndWFnZTogXCJKYXZhU2NyaXB0XCJcbi8vICAgICB9KTtcbi8vICAgICA9PiBcIkkgbGlrZSB0byB3cml0ZSBpbiBKYXZhU2NyaXB0LlwiXG4vL1xuUG9seWdsb3QucHJvdG90eXBlLnQgPSBmdW5jdGlvbiAoa2V5LCBvcHRpb25zKSB7XG4gIHZhciBwaHJhc2UsIHJlc3VsdDtcbiAgdmFyIG9wdHMgPSBvcHRpb25zID09IG51bGwgPyB7fSA6IG9wdGlvbnM7XG4gIGlmICh0eXBlb2YgdGhpcy5waHJhc2VzW2tleV0gPT09ICdzdHJpbmcnKSB7XG4gICAgcGhyYXNlID0gdGhpcy5waHJhc2VzW2tleV07XG4gIH0gZWxzZSBpZiAodHlwZW9mIG9wdHMuXyA9PT0gJ3N0cmluZycpIHtcbiAgICBwaHJhc2UgPSBvcHRzLl87XG4gIH0gZWxzZSBpZiAodGhpcy5vbk1pc3NpbmdLZXkpIHtcbiAgICB2YXIgb25NaXNzaW5nS2V5ID0gdGhpcy5vbk1pc3NpbmdLZXk7XG4gICAgcmVzdWx0ID0gb25NaXNzaW5nS2V5KGtleSwgb3B0cywgdGhpcy5jdXJyZW50TG9jYWxlLCB0aGlzLnRva2VuUmVnZXgpO1xuICB9IGVsc2Uge1xuICAgIHRoaXMud2FybignTWlzc2luZyB0cmFuc2xhdGlvbiBmb3Iga2V5OiBcIicgKyBrZXkgKyAnXCInKTtcbiAgICByZXN1bHQgPSBrZXk7XG4gIH1cbiAgaWYgKHR5cGVvZiBwaHJhc2UgPT09ICdzdHJpbmcnKSB7XG4gICAgcmVzdWx0ID0gdHJhbnNmb3JtUGhyYXNlKHBocmFzZSwgb3B0cywgdGhpcy5jdXJyZW50TG9jYWxlLCB0aGlzLnRva2VuUmVnZXgpO1xuICB9XG4gIHJldHVybiByZXN1bHQ7XG59O1xuXG5cbi8vICMjIyBwb2x5Z2xvdC5oYXMoa2V5KVxuLy9cbi8vIENoZWNrIGlmIHBvbHlnbG90IGhhcyBhIHRyYW5zbGF0aW9uIGZvciBnaXZlbiBrZXlcblBvbHlnbG90LnByb3RvdHlwZS5oYXMgPSBmdW5jdGlvbiAoa2V5KSB7XG4gIHJldHVybiBoYXModGhpcy5waHJhc2VzLCBrZXkpO1xufTtcblxuLy8gZXhwb3J0IHRyYW5zZm9ybVBocmFzZVxuUG9seWdsb3QudHJhbnNmb3JtUGhyYXNlID0gZnVuY3Rpb24gdHJhbnNmb3JtKHBocmFzZSwgc3Vic3RpdHV0aW9ucywgbG9jYWxlKSB7XG4gIHJldHVybiB0cmFuc2Zvcm1QaHJhc2UocGhyYXNlLCBzdWJzdGl0dXRpb25zLCBsb2NhbGUpO1xufTtcblxudmFyIHdlYml4UG9seWdsb3QgPSBQb2x5Z2xvdDtcblxuZnVuY3Rpb24gTG9jYWxlKGFwcCwgX3ZpZXcsIGNvbmZpZykge1xyXG4gICAgY29uZmlnID0gY29uZmlnIHx8IHt9O1xyXG4gICAgY29uc3Qgc3RvcmFnZSA9IGNvbmZpZy5zdG9yYWdlO1xyXG4gICAgbGV0IGxhbmcgPSBzdG9yYWdlID8gKHN0b3JhZ2UuZ2V0KFwibGFuZ1wiKSB8fCBcImVuXCIpIDogKGNvbmZpZy5sYW5nIHx8IFwiZW5cIik7XHJcbiAgICBmdW5jdGlvbiBzZXRMYW5nRGF0YShuYW1lLCBkYXRhLCBzaWxlbnQpIHtcclxuICAgICAgICBpZiAoZGF0YS5fX2VzTW9kdWxlKSB7XHJcbiAgICAgICAgICAgIGRhdGEgPSBkYXRhLmRlZmF1bHQ7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNvbnN0IHBjb25maWcgPSB7IHBocmFzZXM6IGRhdGEgfTtcclxuICAgICAgICBpZiAoY29uZmlnLnBvbHlnbG90KSB7XHJcbiAgICAgICAgICAgIGFwcC53ZWJpeC5leHRlbmQocGNvbmZpZywgY29uZmlnLnBvbHlnbG90KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgY29uc3QgcG9seSA9IHNlcnZpY2UucG9seWdsb3QgPSBuZXcgd2ViaXhQb2x5Z2xvdChwY29uZmlnKTtcclxuICAgICAgICBwb2x5LmxvY2FsZShuYW1lKTtcclxuICAgICAgICBzZXJ2aWNlLl8gPSBhcHAud2ViaXguYmluZChwb2x5LnQsIHBvbHkpO1xyXG4gICAgICAgIGxhbmcgPSBuYW1lO1xyXG4gICAgICAgIGlmIChzdG9yYWdlKSB7XHJcbiAgICAgICAgICAgIHN0b3JhZ2UucHV0KFwibGFuZ1wiLCBsYW5nKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKGNvbmZpZy53ZWJpeCkge1xyXG4gICAgICAgICAgICBjb25zdCBsb2NOYW1lID0gY29uZmlnLndlYml4W25hbWVdO1xyXG4gICAgICAgICAgICBpZiAobG9jTmFtZSkge1xyXG4gICAgICAgICAgICAgICAgYXBwLndlYml4LmkxOG4uc2V0TG9jYWxlKGxvY05hbWUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICghc2lsZW50KSB7XHJcbiAgICAgICAgICAgIHJldHVybiBhcHAucmVmcmVzaCgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKCk7XHJcbiAgICB9XHJcbiAgICBmdW5jdGlvbiBnZXRMYW5nKCkgeyByZXR1cm4gbGFuZzsgfVxyXG4gICAgZnVuY3Rpb24gc2V0TGFuZyhuYW1lLCBzaWxlbnQpIHtcclxuICAgICAgICAvLyBpZ25vcmUgc2V0TGFuZyBpZiBsb2FkaW5nIGJ5IHBhdGggaXMgZGlzYWJsZWRcclxuICAgICAgICBpZiAoY29uZmlnLnBhdGggPT09IGZhbHNlKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgY29uc3QgcGF0aCA9IChjb25maWcucGF0aCA/IGNvbmZpZy5wYXRoICsgXCIvXCIgOiBcIlwiKSArIG5hbWU7XHJcbiAgICAgICAgY29uc3QgZGF0YSA9IHJlcXVpcmUoXCJqZXQtbG9jYWxlcy9cIiArIHBhdGgpO1xyXG4gICAgICAgIHNldExhbmdEYXRhKG5hbWUsIGRhdGEsIHNpbGVudCk7XHJcbiAgICB9XHJcbiAgICBjb25zdCBzZXJ2aWNlID0ge1xyXG4gICAgICAgIGdldExhbmcsIHNldExhbmcsIHNldExhbmdEYXRhLCBfOiBudWxsLCBwb2x5Z2xvdDogbnVsbFxyXG4gICAgfTtcclxuICAgIGFwcC5zZXRTZXJ2aWNlKFwibG9jYWxlXCIsIHNlcnZpY2UpO1xyXG4gICAgc2V0TGFuZyhsYW5nLCB0cnVlKTtcclxufVxuXG5mdW5jdGlvbiBzaG93KHZpZXcsIGNvbmZpZywgdmFsdWUpIHtcclxuICAgIGlmIChjb25maWcudXJscykge1xyXG4gICAgICAgIHZhbHVlID0gY29uZmlnLnVybHNbdmFsdWVdIHx8IHZhbHVlO1xyXG4gICAgfVxyXG4gICAgZWxzZSBpZiAoY29uZmlnLnBhcmFtKSB7XHJcbiAgICAgICAgdmFsdWUgPSB7IFtjb25maWcucGFyYW1dOiB2YWx1ZSB9O1xyXG4gICAgfVxyXG4gICAgdmlldy5zaG93KHZhbHVlKTtcclxufVxyXG5mdW5jdGlvbiBNZW51KGFwcCwgdmlldywgY29uZmlnKSB7XHJcbiAgICBjb25zdCBmcmFtZSA9IHZpZXcuZ2V0U3ViVmlld0luZm8oKS5wYXJlbnQ7XHJcbiAgICBjb25zdCB1aSA9IHZpZXcuJCQoY29uZmlnLmlkIHx8IGNvbmZpZyk7XHJcbiAgICBsZXQgc2lsZW50ID0gZmFsc2U7XHJcbiAgICB1aS5hdHRhY2hFdmVudChcIm9uY2hhbmdlXCIsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBpZiAoIXNpbGVudCkge1xyXG4gICAgICAgICAgICBzaG93KGZyYW1lLCBjb25maWcsIHRoaXMuZ2V0VmFsdWUoKSk7XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcbiAgICB1aS5hdHRhY2hFdmVudChcIm9uYWZ0ZXJzZWxlY3RcIiwgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIGlmICghc2lsZW50KSB7XHJcbiAgICAgICAgICAgIGxldCBpZCA9IG51bGw7XHJcbiAgICAgICAgICAgIGlmICh1aS5zZXRWYWx1ZSkge1xyXG4gICAgICAgICAgICAgICAgaWQgPSB0aGlzLmdldFZhbHVlKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSBpZiAodWkuZ2V0U2VsZWN0ZWRJZCkge1xyXG4gICAgICAgICAgICAgICAgaWQgPSB1aS5nZXRTZWxlY3RlZElkKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgc2hvdyhmcmFtZSwgY29uZmlnLCBpZCk7XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcbiAgICB2aWV3Lm9uKGFwcCwgYGFwcDpyb3V0ZWAsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBsZXQgbmFtZSA9IFwiXCI7XHJcbiAgICAgICAgaWYgKGNvbmZpZy5wYXJhbSkge1xyXG4gICAgICAgICAgICBuYW1lID0gdmlldy5nZXRQYXJhbShjb25maWcucGFyYW0sIHRydWUpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgY29uc3Qgc2VnbWVudCA9IGZyYW1lLmdldFVybCgpWzFdO1xyXG4gICAgICAgICAgICBpZiAoc2VnbWVudCkge1xyXG4gICAgICAgICAgICAgICAgbmFtZSA9IHNlZ21lbnQucGFnZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAobmFtZSkge1xyXG4gICAgICAgICAgICBzaWxlbnQgPSB0cnVlO1xyXG4gICAgICAgICAgICBpZiAodWkuc2V0VmFsdWUgJiYgdWkuZ2V0VmFsdWUoKSAhPT0gbmFtZSkge1xyXG4gICAgICAgICAgICAgICAgdWkuc2V0VmFsdWUobmFtZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSBpZiAodWkuc2VsZWN0ICYmIHVpLmV4aXN0cyhuYW1lKSAmJiB1aS5nZXRTZWxlY3RlZElkKCkgIT09IG5hbWUpIHtcclxuICAgICAgICAgICAgICAgIHVpLnNlbGVjdChuYW1lKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBzaWxlbnQgPSBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxufVxuXG5jb25zdCBiYXNlaWNvbnMgPSB7XHJcbiAgICBnb29kOiBcImNoZWNrXCIsXHJcbiAgICBlcnJvcjogXCJ3YXJuaW5nXCIsXHJcbiAgICBzYXZpbmc6IFwicmVmcmVzaCBmYS1zcGluXCJcclxufTtcclxuY29uc3QgYmFzZXRleHQgPSB7XHJcbiAgICBnb29kOiBcIk9rXCIsXHJcbiAgICBlcnJvcjogXCJFcnJvclwiLFxyXG4gICAgc2F2aW5nOiBcIkNvbm5lY3RpbmcuLi5cIlxyXG59O1xyXG5mdW5jdGlvbiBTdGF0dXMoYXBwLCB2aWV3LCBjb25maWcpIHtcclxuICAgIGxldCBzdGF0dXMgPSBcImdvb2RcIjtcclxuICAgIGxldCBjb3VudCA9IDA7XHJcbiAgICBsZXQgaXNlcnJvciA9IGZhbHNlO1xyXG4gICAgbGV0IGV4cGlyZURlbGF5ID0gY29uZmlnLmV4cGlyZTtcclxuICAgIGlmICghZXhwaXJlRGVsYXkgJiYgZXhwaXJlRGVsYXkgIT09IGZhbHNlKSB7XHJcbiAgICAgICAgZXhwaXJlRGVsYXkgPSAyMDAwO1xyXG4gICAgfVxyXG4gICAgY29uc3QgdGV4dHMgPSBjb25maWcudGV4dHMgfHwgYmFzZXRleHQ7XHJcbiAgICBjb25zdCBpY29ucyA9IGNvbmZpZy5pY29ucyB8fCBiYXNlaWNvbnM7XHJcbiAgICBpZiAodHlwZW9mIGNvbmZpZyA9PT0gXCJzdHJpbmdcIikge1xyXG4gICAgICAgIGNvbmZpZyA9IHsgdGFyZ2V0OiBjb25maWcgfTtcclxuICAgIH1cclxuICAgIGZ1bmN0aW9uIHJlZnJlc2goY29udGVudCkge1xyXG4gICAgICAgIGNvbnN0IGFyZWEgPSB2aWV3LiQkKGNvbmZpZy50YXJnZXQpO1xyXG4gICAgICAgIGlmIChhcmVhKSB7XHJcbiAgICAgICAgICAgIGlmICghY29udGVudCkge1xyXG4gICAgICAgICAgICAgICAgY29udGVudCA9IFwiPGRpdiBjbGFzcz0nc3RhdHVzX1wiICtcclxuICAgICAgICAgICAgICAgICAgICBzdGF0dXMgK1xyXG4gICAgICAgICAgICAgICAgICAgIFwiJz48c3BhbiBjbGFzcz0nd2ViaXhfaWNvbiBmYS1cIiArXHJcbiAgICAgICAgICAgICAgICAgICAgaWNvbnNbc3RhdHVzXSArIFwiJz48L3NwYW4+IFwiICsgdGV4dHNbc3RhdHVzXSArIFwiPC9kaXY+XCI7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgYXJlYS5zZXRIVE1MKGNvbnRlbnQpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGZ1bmN0aW9uIHN1Y2Nlc3MoKSB7XHJcbiAgICAgICAgY291bnQtLTtcclxuICAgICAgICBzZXRTdGF0dXMoXCJnb29kXCIpO1xyXG4gICAgfVxyXG4gICAgZnVuY3Rpb24gZmFpbChlcnIpIHtcclxuICAgICAgICBjb3VudC0tO1xyXG4gICAgICAgIHNldFN0YXR1cyhcImVycm9yXCIsIGVycik7XHJcbiAgICB9XHJcbiAgICBmdW5jdGlvbiBzdGFydChwcm9taXNlKSB7XHJcbiAgICAgICAgY291bnQrKztcclxuICAgICAgICBzZXRTdGF0dXMoXCJzYXZpbmdcIik7XHJcbiAgICAgICAgaWYgKHByb21pc2UgJiYgcHJvbWlzZS50aGVuKSB7XHJcbiAgICAgICAgICAgIHByb21pc2UudGhlbihzdWNjZXNzLCBmYWlsKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBmdW5jdGlvbiBnZXRTdGF0dXMoKSB7XHJcbiAgICAgICAgcmV0dXJuIHN0YXR1cztcclxuICAgIH1cclxuICAgIGZ1bmN0aW9uIGhpZGVTdGF0dXMoKSB7XHJcbiAgICAgICAgaWYgKGNvdW50ID09PSAwKSB7XHJcbiAgICAgICAgICAgIHJlZnJlc2goXCIgXCIpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGZ1bmN0aW9uIHNldFN0YXR1cyhtb2RlLCBlcnIpIHtcclxuICAgICAgICBpZiAoY291bnQgPCAwKSB7XHJcbiAgICAgICAgICAgIGNvdW50ID0gMDtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKG1vZGUgPT09IFwic2F2aW5nXCIpIHtcclxuICAgICAgICAgICAgc3RhdHVzID0gXCJzYXZpbmdcIjtcclxuICAgICAgICAgICAgcmVmcmVzaCgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgaXNlcnJvciA9IChtb2RlID09PSBcImVycm9yXCIpO1xyXG4gICAgICAgICAgICBpZiAoY291bnQgPT09IDApIHtcclxuICAgICAgICAgICAgICAgIHN0YXR1cyA9IGlzZXJyb3IgPyBcImVycm9yXCIgOiBcImdvb2RcIjtcclxuICAgICAgICAgICAgICAgIGlmIChpc2Vycm9yKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgYXBwLmVycm9yKFwiYXBwOmVycm9yOnNlcnZlclwiLCBbZXJyLnJlc3BvbnNlVGV4dCB8fCBlcnJdKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChleHBpcmVEZWxheSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KGhpZGVTdGF0dXMsIGV4cGlyZURlbGF5KTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICByZWZyZXNoKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBmdW5jdGlvbiB0cmFjayhkYXRhKSB7XHJcbiAgICAgICAgY29uc3QgZHAgPSBhcHAud2ViaXguZHAoZGF0YSk7XHJcbiAgICAgICAgaWYgKGRwKSB7XHJcbiAgICAgICAgICAgIHZpZXcub24oZHAsIFwib25BZnRlckRhdGFTZW5kXCIsIHN0YXJ0KTtcclxuICAgICAgICAgICAgdmlldy5vbihkcCwgXCJvbkFmdGVyU2F2ZUVycm9yXCIsIChfaWQsIF9vYmosIHJlc3BvbnNlKSA9PiBmYWlsKHJlc3BvbnNlKSk7XHJcbiAgICAgICAgICAgIHZpZXcub24oZHAsIFwib25BZnRlclNhdmVcIiwgc3VjY2Vzcyk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgYXBwLnNldFNlcnZpY2UoXCJzdGF0dXNcIiwge1xyXG4gICAgICAgIGdldFN0YXR1cyxcclxuICAgICAgICBzZXRTdGF0dXMsXHJcbiAgICAgICAgdHJhY2tcclxuICAgIH0pO1xyXG4gICAgaWYgKGNvbmZpZy5yZW1vdGUpIHtcclxuICAgICAgICB2aWV3Lm9uKGFwcC53ZWJpeCwgXCJvblJlbW90ZUNhbGxcIiwgc3RhcnQpO1xyXG4gICAgfVxyXG4gICAgaWYgKGNvbmZpZy5hamF4KSB7XHJcbiAgICAgICAgdmlldy5vbihhcHAud2ViaXgsIFwib25CZWZvcmVBamF4XCIsIChfbW9kZSwgX3VybCwgX2RhdGEsIF9yZXF1ZXN0LCBfaGVhZGVycywgX2ZpbGVzLCBwcm9taXNlKSA9PiB7XHJcbiAgICAgICAgICAgIHN0YXJ0KHByb21pc2UpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgaWYgKGNvbmZpZy5kYXRhKSB7XHJcbiAgICAgICAgdHJhY2soY29uZmlnLmRhdGEpO1xyXG4gICAgfVxyXG59XG5cbmZ1bmN0aW9uIFRoZW1lKGFwcCwgX3ZpZXcsIGNvbmZpZykge1xyXG4gICAgY29uZmlnID0gY29uZmlnIHx8IHt9O1xyXG4gICAgY29uc3Qgc3RvcmFnZSA9IGNvbmZpZy5zdG9yYWdlO1xyXG4gICAgbGV0IHRoZW1lID0gc3RvcmFnZSA/XHJcbiAgICAgICAgKHN0b3JhZ2UuZ2V0KFwidGhlbWVcIikgfHwgXCJmbGF0LWRlZmF1bHRcIilcclxuICAgICAgICA6XHJcbiAgICAgICAgICAgIChjb25maWcudGhlbWUgfHwgXCJmbGF0LWRlZmF1bHRcIik7XHJcbiAgICBjb25zdCBzZXJ2aWNlID0ge1xyXG4gICAgICAgIGdldFRoZW1lKCkgeyByZXR1cm4gdGhlbWU7IH0sXHJcbiAgICAgICAgc2V0VGhlbWUobmFtZSwgc2lsZW50KSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHBhcnRzID0gbmFtZS5zcGxpdChcIi1cIik7XHJcbiAgICAgICAgICAgIGNvbnN0IGxpbmtzID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoXCJsaW5rXCIpO1xyXG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxpbmtzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBsbmFtZSA9IGxpbmtzW2ldLmdldEF0dHJpYnV0ZShcInRpdGxlXCIpO1xyXG4gICAgICAgICAgICAgICAgaWYgKGxuYW1lKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGxuYW1lID09PSBuYW1lIHx8IGxuYW1lID09PSBwYXJ0c1swXSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsaW5rc1tpXS5kaXNhYmxlZCA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGlua3NbaV0uZGlzYWJsZWQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBhcHAud2ViaXguc2tpbi5zZXQocGFydHNbMF0pO1xyXG4gICAgICAgICAgICAvLyByZW1vdmUgb2xkIGNzc1xyXG4gICAgICAgICAgICBhcHAud2ViaXguaHRtbC5yZW1vdmVDc3MoZG9jdW1lbnQuYm9keSwgXCJ0aGVtZS1cIiArIHRoZW1lKTtcclxuICAgICAgICAgICAgLy8gYWRkIG5ldyBjc3NcclxuICAgICAgICAgICAgYXBwLndlYml4Lmh0bWwuYWRkQ3NzKGRvY3VtZW50LmJvZHksIFwidGhlbWUtXCIgKyBuYW1lKTtcclxuICAgICAgICAgICAgdGhlbWUgPSBuYW1lO1xyXG4gICAgICAgICAgICBpZiAoc3RvcmFnZSkge1xyXG4gICAgICAgICAgICAgICAgc3RvcmFnZS5wdXQoXCJ0aGVtZVwiLCBuYW1lKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoIXNpbGVudCkge1xyXG4gICAgICAgICAgICAgICAgYXBwLnJlZnJlc2goKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH07XHJcbiAgICBhcHAuc2V0U2VydmljZShcInRoZW1lXCIsIHNlcnZpY2UpO1xyXG4gICAgc2VydmljZS5zZXRUaGVtZSh0aGVtZSwgdHJ1ZSk7XHJcbn1cblxuZnVuY3Rpb24gY29weVBhcmFtcyhkYXRhLCB1cmwsIHJvdXRlKSB7XHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHJvdXRlLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgZGF0YVtyb3V0ZVtpXV0gPSB1cmxbaSArIDFdID8gdXJsW2kgKyAxXS5wYWdlIDogXCJcIjtcclxuICAgIH1cclxufVxyXG5mdW5jdGlvbiBVcmxQYXJhbShhcHAsIHZpZXcsIGNvbmZpZykge1xyXG4gICAgY29uc3Qgcm91dGUgPSBjb25maWcucm91dGUgfHwgY29uZmlnO1xyXG4gICAgY29uc3QgZGF0YSA9IHt9O1xyXG4gICAgdmlldy5vbihhcHAsIFwiYXBwOnVybGNoYW5nZVwiLCBmdW5jdGlvbiAoc3Vidmlldywgc2VnbWVudCkge1xyXG4gICAgICAgIGlmICh2aWV3ID09PSBzdWJ2aWV3KSB7XHJcbiAgICAgICAgICAgIGNvcHlQYXJhbXMoZGF0YSwgc2VnbWVudC5zdWJ1cmwoKSwgcm91dGUpO1xyXG4gICAgICAgICAgICBzZWdtZW50LnNpemUocm91dGUubGVuZ3RoICsgMSk7XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcbiAgICBjb25zdCBvcyA9IHZpZXcuc2V0UGFyYW07XHJcbiAgICBjb25zdCBvZyA9IHZpZXcuZ2V0UGFyYW07XHJcbiAgICB2aWV3LnNldFBhcmFtID0gZnVuY3Rpb24gKG5hbWUsIHZhbHVlLCBzaG93KSB7XHJcbiAgICAgICAgY29uc3QgaW5kZXggPSByb3V0ZS5pbmRleE9mKG5hbWUpO1xyXG4gICAgICAgIGlmIChpbmRleCA+PSAwKSB7XHJcbiAgICAgICAgICAgIGRhdGFbbmFtZV0gPSB2YWx1ZTtcclxuICAgICAgICAgICAgdGhpcy5fc2VnbWVudC51cGRhdGUoXCJcIiwgdmFsdWUsIGluZGV4ICsgMSk7XHJcbiAgICAgICAgICAgIGlmIChzaG93KSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdmlldy5zaG93KG51bGwpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICByZXR1cm4gb3MuY2FsbCh0aGlzLCBuYW1lLCB2YWx1ZSwgc2hvdyk7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuICAgIHZpZXcuZ2V0UGFyYW0gPSBmdW5jdGlvbiAoa2V5LCBtb2RlKSB7XHJcbiAgICAgICAgY29uc3QgdmFsID0gZGF0YVtrZXldO1xyXG4gICAgICAgIGlmICh0eXBlb2YgdmFsICE9PSBcInVuZGVmaW5lZFwiKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB2YWw7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBvZy5jYWxsKHRoaXMsIGtleSwgbW9kZSk7XHJcbiAgICB9O1xyXG4gICAgY29weVBhcmFtcyhkYXRhLCB2aWV3LmdldFVybCgpLCByb3V0ZSk7XHJcbn1cblxuZnVuY3Rpb24gVXNlcihhcHAsIF92aWV3LCBjb25maWcpIHtcclxuICAgIGNvbmZpZyA9IGNvbmZpZyB8fCB7fTtcclxuICAgIGNvbnN0IGxvZ2luID0gY29uZmlnLmxvZ2luIHx8IFwiL2xvZ2luXCI7XHJcbiAgICBjb25zdCBsb2dvdXQgPSBjb25maWcubG9nb3V0IHx8IFwiL2xvZ291dFwiO1xyXG4gICAgY29uc3QgYWZ0ZXJMb2dpbiA9IGNvbmZpZy5hZnRlckxvZ2luIHx8IGFwcC5jb25maWcuc3RhcnQ7XHJcbiAgICBjb25zdCBhZnRlckxvZ291dCA9IGNvbmZpZy5hZnRlckxvZ291dCB8fCBcIi9sb2dpblwiO1xyXG4gICAgY29uc3QgcGluZyA9IGNvbmZpZy5waW5nIHx8IDUgKiA2MCAqIDEwMDA7XHJcbiAgICBjb25zdCBtb2RlbCA9IGNvbmZpZy5tb2RlbDtcclxuICAgIGxldCB1c2VyID0gY29uZmlnLnVzZXI7XHJcbiAgICBjb25zdCBzZXJ2aWNlID0ge1xyXG4gICAgICAgIGdldFVzZXIoKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB1c2VyO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgZ2V0U3RhdHVzKHNlcnZlcikge1xyXG4gICAgICAgICAgICBpZiAoIXNlcnZlcikge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHVzZXIgIT09IG51bGw7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIG1vZGVsLnN0YXR1cygpLmNhdGNoKCgpID0+IG51bGwpLnRoZW4oZGF0YSA9PiB7XHJcbiAgICAgICAgICAgICAgICB1c2VyID0gZGF0YTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBsb2dpbihuYW1lLCBwYXNzKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBtb2RlbC5sb2dpbihuYW1lLCBwYXNzKS50aGVuKGRhdGEgPT4ge1xyXG4gICAgICAgICAgICAgICAgdXNlciA9IGRhdGE7XHJcbiAgICAgICAgICAgICAgICBpZiAoIWRhdGEpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJBY2Nlc3MgZGVuaWVkXCIpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgYXBwLmNhbGxFdmVudChcImFwcDp1c2VyOmxvZ2luXCIsIFt1c2VyXSk7XHJcbiAgICAgICAgICAgICAgICBhcHAuc2hvdyhhZnRlckxvZ2luKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBsb2dvdXQoKSB7XHJcbiAgICAgICAgICAgIHVzZXIgPSBudWxsO1xyXG4gICAgICAgICAgICByZXR1cm4gbW9kZWwubG9nb3V0KCkudGhlbihyZXMgPT4ge1xyXG4gICAgICAgICAgICAgICAgYXBwLmNhbGxFdmVudChcImFwcDp1c2VyOmxvZ291dFwiLCBbXSk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVzO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG4gICAgZnVuY3Rpb24gY2FuTmF2aWdhdGUodXJsLCBvYmopIHtcclxuICAgICAgICBpZiAodXJsID09PSBsb2dvdXQpIHtcclxuICAgICAgICAgICAgc2VydmljZS5sb2dvdXQoKTtcclxuICAgICAgICAgICAgb2JqLnJlZGlyZWN0ID0gYWZ0ZXJMb2dvdXQ7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYgKHVybCAhPT0gbG9naW4gJiYgIXNlcnZpY2UuZ2V0U3RhdHVzKCkpIHtcclxuICAgICAgICAgICAgb2JqLnJlZGlyZWN0ID0gbG9naW47XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgYXBwLnNldFNlcnZpY2UoXCJ1c2VyXCIsIHNlcnZpY2UpO1xyXG4gICAgYXBwLmF0dGFjaEV2ZW50KGBhcHA6Z3VhcmRgLCBmdW5jdGlvbiAodXJsLCBfJHJvb3QsIG9iaikge1xyXG4gICAgICAgIGlmIChjb25maWcucHVibGljICYmIGNvbmZpZy5wdWJsaWModXJsKSkge1xyXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHR5cGVvZiB1c2VyID09PSBcInVuZGVmaW5lZFwiKSB7XHJcbiAgICAgICAgICAgIG9iai5jb25maXJtID0gc2VydmljZS5nZXRTdGF0dXModHJ1ZSkudGhlbigoKSA9PiBjYW5OYXZpZ2F0ZSh1cmwsIG9iaikpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gY2FuTmF2aWdhdGUodXJsLCBvYmopO1xyXG4gICAgfSk7XHJcbiAgICBpZiAocGluZykge1xyXG4gICAgICAgIHNldEludGVydmFsKCgpID0+IHNlcnZpY2UuZ2V0U3RhdHVzKHRydWUpLCBwaW5nKTtcclxuICAgIH1cclxufVxuXG4vKlxyXG5NSVQgTGljZW5zZVxyXG5Db3B5cmlnaHQgKGMpIDIwMTkgWEIgU29mdHdhcmVcclxuKi9cclxubGV0IHdlYml4ID0gd2luZG93LndlYml4O1xyXG5pZiAod2ViaXgpIHtcclxuICAgIHBhdGNoKHdlYml4KTtcclxufVxyXG5jb25zdCBwbHVnaW5zID0ge1xyXG4gICAgVW5sb2FkR3VhcmQsIExvY2FsZSwgTWVudSwgVGhlbWUsIFVzZXIsIFN0YXR1cywgVXJsUGFyYW1cclxufTtcclxuY29uc3QgZXJyb3JzID0geyBOYXZpZ2F0aW9uQmxvY2tlZCB9O1xyXG5jb25zdCB3ID0gd2luZG93O1xyXG5pZiAoIXcuUHJvbWlzZSkge1xyXG4gICAgdy5Qcm9taXNlID0gdy53ZWJpeC5wcm9taXNlO1xyXG59XG5cbmV4cG9ydCB7IHBsdWdpbnMsIGVycm9ycywgSmV0QXBwLCBKZXRWaWV3LCBIYXNoUm91dGVyLCBTdG9yZVJvdXRlciwgVXJsUm91dGVyLCBFbXB0eVJvdXRlciwgU3ViUm91dGVyIH07XG4vLyMgc291cmNlTWFwcGluZ1VSTD1qZXQuanMubWFwXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9ub2RlX21vZHVsZXMvd2ViaXgtamV0L2Rpc3QvZXM2L2pldC5qcyIsImltcG9ydCB7IEpldFZpZXcgfSBmcm9tIFwid2ViaXgtamV0XCI7XG5pbXBvcnQgeyBwYWNrYWdlcyB9IGZyb20gXCIuLi8uLi9zZXJ2aWNlcy9wYWNrYWdlc1wiO1xuXG5jb25zdCBTVEFUVVNfSU5TVEFMTEVEID0gMztcblxuZXhwb3J0IGNsYXNzIEV4dGVybmFsVmlldyBleHRlbmRzIEpldFZpZXcge1xuICAgIGNvbnN0cnVjdG9yKGFwcCwgbmFtZSwgdGFyZ2V0VXJsLCByZXF1aXJlZFBhY2thZ2VzKSB7XG4gICAgICAgIHN1cGVyKGFwcCwgbmFtZSk7XG5cbiAgICAgICAgdGhpcy50YXJnZXRVcmwgPSB0YXJnZXRVcmwgfHwgXCIvXCI7XG4gICAgICAgIHRoaXMucmVxdWlyZWRQYWNrYWdlcyA9IHJlcXVpcmVkUGFja2FnZXMgfHwge307IC8vIHJlcXVpcmVkIHBhY2thZ2VzIGFzIG5hbWU6IGdpdF91cmwgcGFpcnNcbiAgICB9XG5cbiAgICBjb25maWcoKSB7XG4gICAgICAgIGNvbnN0IGlmcmFtZSA9IHtcbiAgICAgICAgICAgIHZpZXc6IFwiaWZyYW1lXCIsXG4gICAgICAgICAgICBsb2NhbElkOiBcImlmcmFtZS1leHRlcm5hbFwiLFxuICAgICAgICAgICAgb246IHtcbiAgICAgICAgICAgICAgICBvbkFmdGVyTG9hZDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5oaWRlUHJvZ3Jlc3MpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuaGlkZVByb2dyZXNzKCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgdGhpcy5lbmFibGUoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG5cbiAgICAgICAgY29uc3QgbmFtZXMgPSBPYmplY3Qua2V5cyh0aGlzLnJlcXVpcmVkUGFja2FnZXMpLmpvaW4oXCIsIFwiKTtcblxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgcm93czogW3tcbiAgICAgICAgICAgICAgICBsb2NhbElkOiBcImluc3RhbGwtcGFja2FnZXNcIixcbiAgICAgICAgICAgICAgICBoaWRkZW46IHRydWUsXG4gICAgICAgICAgICAgICAgY29sczogW1xuICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0ZW1wbGF0ZTogYDxkaXYgc3R5bGU9J3dpZHRoOmF1dG87dGV4dC1hbGlnbjpjZW50ZXInPjxoMz5Zb3UgbmVlZCB0byBpbnN0YWxsIHRoZSBmb2xsb3dpbmcgcmVxdWlyZWQgcGFja2FnZXM6ICR7bmFtZXN9PGgzLz48L2Rpdj5gLFxuICAgICAgICAgICAgICAgICAgICAgICAgYXV0b2hlaWdodDogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmlldzogXCJidXR0b25cIixcbiAgICAgICAgICAgICAgICAgICAgICAgIGxvY2FsSWQ6IFwiaW5zdGFsbF9idG5cIixcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlOiBcIkluc3RhbGwgcmVxdWlyZWQgcGFja2FnZXNcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIGNzczogXCJ3ZWJpeF9wcmltYXJ5XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBoZWlnaHQ6IDUwXG4gICAgICAgICAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZpZXc6IFwiYnV0dG9uXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBsb2NhbElkOiBcImdvX3RvX3BhY2thZ2VzX2J0blwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU6IFwiR28gdG8gcGFja2FnZXMgYW5kIGluc3RhbGwgdGhlbSBtYW51YWxseVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgY3NzOiBcIndlYml4X3ByaW1hcnlcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIGhlaWdodDogNTAsXG4gICAgICAgICAgICAgICAgICAgICAgICBjbGljazogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuJHNjb3BlLnNob3coXCIvbWFpbi9wYWNrYWdlc1wiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgIH0sIGlmcmFtZV1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIGluc3RhbGxSZXF1aXJlZFBhY2thZ2VzKCkge1xuICAgICAgICBsZXQgcHJvbWlzZXMgPSBPYmplY3Qua2V5cyh0aGlzLnJlcXVpcmVkUGFja2FnZXMpLm1hcCgobmFtZSkgPT4ge1xuICAgICAgICAgICAgLy8gYWRkIGJ5IGdpdCB1cmxcbiAgICAgICAgICAgIHJldHVybiBwYWNrYWdlcy5hZGQobnVsbCwgdGhpcy5yZXF1aXJlZFBhY2thZ2VzW25hbWVdKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgdGhpcy5pbnN0YWxsQnV0dG9uLmRpc2FibGUoKTtcbiAgICAgICAgUHJvbWlzZS5hbGwocHJvbWlzZXMpLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgd2ViaXgubWVzc2FnZSh7IHR5cGU6IFwic3VjY2Vzc1wiLCB0ZXh0OiBcIkFsbCByZXF1aXJlZCBwYWNrYWdlcyBpbnN0YWxsZWQgc3VjY2Vzc2Z1bGx5LCBwYWdlIHdpbGwgYmUgcmVsb2FkZWQgaW4gMiBzZWNvbmRzXCIgfSk7XG4gICAgICAgICAgICBzZXRJbnRlcnZhbCgoKSA9PiB3aW5kb3cubG9jYXRpb24ucmVsb2FkKHRydWUpLCAyMDAwKTtcbiAgICAgICAgICAgIHRoaXMuaW5zdGFsbEJ1dHRvbi5lbmFibGUoKTtcbiAgICAgICAgfSkuY2F0Y2goKCkgPT4ge1xuICAgICAgICAgICAgd2ViaXgubWVzc2FnZSh7IHR5cGU6IFwiZXJyb3JcIiwgdGV4dDogXCJBbiBlcnJvciBvY2N1cnJlZCwgcGxlYXNlIHRyeSBpbnN0YWxsaW5nIGZyb20gcGFja2FnZXMgZm9yIG1vcmUgZGV0YWlsc1wiIH0pO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBpbml0KHZpZXcpIHtcbiAgICAgICAgdmlldy5pbnN0YWxsUGFja2FnZUNvbnRhaW5lciA9IHRoaXMuJCQoXCJpbnN0YWxsLXBhY2thZ2VzXCIpO1xuICAgICAgICB0aGlzLmluc3RhbGxCdXR0b24gPSB0aGlzLiQkKFwiaW5zdGFsbF9idG5cIik7XG4gICAgICAgIHRoaXMuaW5zdGFsbEJ1dHRvbi5hdHRhY2hFdmVudChcIm9uSXRlbUNsaWNrXCIsIHRoaXMuaW5zdGFsbFJlcXVpcmVkUGFja2FnZXMuYmluZCh0aGlzKSk7XG5cbiAgICAgICAgdmlldy5leHRlcm5hbElmcmFtZSA9IHRoaXMuJCQoXCJpZnJhbWUtZXh0ZXJuYWxcIik7XG4gICAgICAgIHdlYml4LmV4dGVuZCh2aWV3LmV4dGVybmFsSWZyYW1lLCB3ZWJpeC5Qcm9ncmVzc0Jhcik7XG4gICAgICAgIHZpZXcuZXh0ZXJuYWxJZnJhbWUuZGlzYWJsZSgpO1xuICAgICAgICB2aWV3LmV4dGVybmFsSWZyYW1lLnNob3dQcm9ncmVzcyh7IHR5cGU6IFwiaWNvblwiIH0pO1xuICAgICAgICB2aWV3LmV4dGVybmFsSWZyYW1lLmxvYWQodGhpcy50YXJnZXRVcmwpO1xuXG5cbiAgICAgICAgLy8gY2hlY2sgd2hpY2ggcGFja2FnZXMgdG8gaW5zdGFsbFxuICAgICAgICBwYWNrYWdlcy5saXN0KCkudGhlbihkYXRhID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGFsbFBhY2thZ2VzID0gZGF0YS5qc29uKCkucGFja2FnZXM7XG4gICAgICAgICAgICBmb3IgKGNvbnN0IHAgb2YgYWxsUGFja2FnZXMpIHtcbiAgICAgICAgICAgICAgICBjb25zdCByZXF1aXJlZFBhY2thZ2UgPSB0aGlzLnJlcXVpcmVkUGFja2FnZXNbcC5uYW1lXTtcbiAgICAgICAgICAgICAgICBpZiAocmVxdWlyZWRQYWNrYWdlICYmIHAuc3RhdHVzID09IFNUQVRVU19JTlNUQUxMRUQpIHtcbiAgICAgICAgICAgICAgICAgICAgZGVsZXRlIHRoaXMucmVxdWlyZWRQYWNrYWdlc1twLm5hbWVdO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKE9iamVjdC5rZXlzKHRoaXMucmVxdWlyZWRQYWNrYWdlcykubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgdmlldy5pbnN0YWxsUGFja2FnZUNvbnRhaW5lci5zaG93KCk7XG4gICAgICAgICAgICAgICAgdmlldy5leHRlcm5hbElmcmFtZS5oaWRlKCk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHZpZXcuaW5zdGFsbFBhY2thZ2VDb250YWluZXIuaGlkZSgpO1xuICAgICAgICAgICAgICAgIHZpZXcuZXh0ZXJuYWxJZnJhbWUuc2hvdygpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgIH0pO1xuICAgIH1cblxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc291cmNlcy92aWV3cy9leHRlcm5hbC9pbmRleC5qcyIsIlxuZXhwb3J0IGNvbnN0IE1BWF9NU0dfTEVOID0gMTAwO1xuZXhwb3J0IGNvbnN0IExFVkVMUyA9IHtcbiAgICA1MDogXCJDUklUSUNBTFwiLFxuICAgIDQwOiBcIkVSUk9SXCIsXG4gICAgMzA6IFwiV0FSTklOR1wiLFxuICAgIDIwOiBcIklORk9cIixcbiAgICAxNTogXCJTVERPVVRcIixcbiAgICAxMDogXCJERUJVR1wiXG59O1xuXG5leHBvcnQgY29uc3QgU1RBVEVTID0gW1xuICAgICdDTE9TRUQnLFxuICAgICdORVcnLFxuICAgICdPUEVOJyxcbiAgICAnUkVPUEVOJ1xuXVxuXG5leHBvcnQgY29uc3QgVFlQRVMgPSBbXG4gICAgJ0JVRycsXG4gICAgJ1FVRVNUSU9OJyxcbiAgICAnRVZFTlRfU1lTVEVNJyxcbiAgICAnRVZFTlRfTU9OSVRPUicsXG4gICAgJ0VWRU5UX09QRVJBVE9SJyxcbl1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NvdXJjZXMvdmlld3MvYWxlcnRzL2RhdGEuanMiLCJleHBvcnQgY29uc3QgZGF0ZUZvcm1hdCA9IFwiJVktJW0tJWQgJUc6JWk6JXNcIjtcblxuZXhwb3J0IGNvbnN0IHdlYml4RGF0ZUZvcm1hdHRlciA9IHdlYml4LkRhdGUuZGF0ZVRvU3RyKGRhdGVGb3JtYXQpO1xuXG5leHBvcnQgY29uc3QgZGF0ZUZvcm1hdHRlciA9IGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgIC8vIGZvcm1hdCBlcG9jaCB0aW1lc3RhbXBzXG4gICAgaWYgKHZhbHVlIGluc3RhbmNlb2YgU3RyaW5nKSB7XG4gICAgICAgIHZhbHVlID0gcGFyc2VJbnQodmFsdWUpO1xuICAgIH1cblxuICAgIHJldHVybiB3ZWJpeERhdGVGb3JtYXR0ZXIobmV3IERhdGUodmFsdWUgKiAxMDAwKSk7XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zb3VyY2VzL2NvbW1vbi9mb3JtYXR0ZXJzLmpzIiwiY29uc3QgYWpheCA9IHdlYml4LmFqYXgoKS5oZWFkZXJzKHsgXCJDb250ZW50LXR5cGVcIjogXCJhcHBsaWNhdGlvbi9qc29uXCIgfSk7XG5cbmV4cG9ydCBjbGFzcyBTZXJ2aWNlIHtcbiAgICBjb25zdHJ1Y3RvcihiYXNlVXJsKSB7XG4gICAgICAgIHRoaXMuYmFzZVVybCA9IGJhc2VVcmw7XG4gICAgfVxuXG4gICAgam9pblVybCh1cmwpIHtcbiAgICAgICAgaWYgKHRoaXMuYmFzZVVybCkge1xuICAgICAgICAgICAgcmV0dXJuIGAke3RoaXMuYmFzZVVybH0vJHt1cmx9YDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdXJsO1xuICAgIH1cblxuICAgIGNhbGwobWV0aG9kLCB1cmwsIGFyZ3MpIHtcbiAgICAgICAgbWV0aG9kID0gbWV0aG9kLnRvTG93ZXJDYXNlKCk7XG4gICAgICAgIHVybCA9IHRoaXMuam9pblVybCh1cmwpO1xuXG4gICAgICAgIGlmIChhcmdzKSB7XG4gICAgICAgICAgICBhcmdzID0geyBhcmdzOiBhcmdzIH07XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBhcmdzID0ge307XG4gICAgICAgIH1cblxuICAgICAgICBpZiAobWV0aG9kID09PSBcImdldFwiKSB7XG4gICAgICAgICAgICByZXR1cm4gYWpheC5nZXQodXJsLCBhcmdzKTtcbiAgICAgICAgfSBlbHNlIGlmIChtZXRob2QgPT0gXCJwb3N0XCIpIHtcbiAgICAgICAgICAgIHJldHVybiBhamF4LnBvc3QodXJsLCBhcmdzKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRocm93IFZhbHVlRXJyb3IoYCR7bWV0aG9kfSBpcyBub3Qgc3VwcG9ydGVkYCk7XG4gICAgfVxuXG4gICAgZ2V0Q2FsbCh1cmwsIGFyZ3MpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuY2FsbChcImdldFwiLCB1cmwsIGFyZ3MpO1xuICAgIH1cblxuICAgIHBvc3RDYWxsKHVybCwgYXJncykge1xuICAgICAgICByZXR1cm4gdGhpcy5jYWxsKFwicG9zdFwiLCB1cmwsIGFyZ3MpO1xuICAgIH1cbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NvdXJjZXMvY29tbW9uL2FwaS5qcyIsImltcG9ydCB7IFNlcnZpY2UgfSBmcm9tIFwiLi4vY29tbW9uL2FwaVwiO1xuXG5jb25zdCBCQVNFX1VSTCA9IFwiL3plcm9ib3QvYWRtaW4vYWN0b3JzL2hlYWx0aFwiO1xuXG5jbGFzcyBIZWFsdGhTZXJ2aWNlIGV4dGVuZHMgU2VydmljZSB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHN1cGVyKEJBU0VfVVJMKTtcbiAgICB9XG5cbiAgICBnZXREaXNrU3BhY2UoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmdldENhbGwoXCJnZXRfZGlza19zcGFjZVwiKTtcbiAgICB9XG5cbiAgICBnZXRIZWFsdGgoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmdldENhbGwoXCJoZWFsdGhcIik7XG4gICAgfVxuXG4gICAgZ2V0SWRlbnRpdHkoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmdldENhbGwoXCJnZXRfaWRlbnRpdHlcIik7XG4gICAgfVxuXG4gICAgZ2V0TmV0d29ya0luZm8oKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmdldENhbGwoXCJuZXR3b3JrX2luZm9cIik7XG4gICAgfVxuXG4gICAgZ2V0SnN4VmVyc2lvbigpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0Q2FsbChcImpzeF92ZXJzaW9uXCIpO1xuICAgIH1cblxuICAgIGdldFJ1bm5pbmdQcm9jZXNzZXMoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmdldENhbGwoXCJnZXRfcnVubmluZ19wcm9jZXNzZXNcIik7XG4gICAgfVxuXG4gICAgZ2V0UnVubmluZ1BvcnRzKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5nZXRDYWxsKFwiZ2V0X3J1bm5pbmdfcG9ydHNcIik7XG4gICAgfVxufVxuXG5leHBvcnQgY29uc3QgaGVhbHRoID0gbmV3IEhlYWx0aFNlcnZpY2UoKTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NvdXJjZXMvc2VydmljZXMvaGVhbHRoLmpzIiwiaW1wb3J0IHsgSmV0VmlldyB9IGZyb20gXCJ3ZWJpeC1qZXRcIjtcblxuaW1wb3J0IHsgYW5zaVVwIH0gZnJvbSBcIi4uLy4uL2NvbW1vbi9jb2xvcnNcIjtcbmltcG9ydCB7IExFVkVMUywgTUFYX01TR19MRU4sIFNUQVRFUywgVFlQRVMgfSBmcm9tIFwiLi9kYXRhXCI7XG5pbXBvcnQgeyBkYXRlRm9ybWF0dGVyIH0gZnJvbSBcIi4uLy4uL2NvbW1vbi9mb3JtYXR0ZXJzXCI7XG5pbXBvcnQgeyBhbGVydHMgfSBmcm9tIFwiLi4vLi4vc2VydmljZXMvYWxlcnRzXCI7XG5cbmltcG9ydCBBbGVydFZpZXcgZnJvbSBcIi4vYWxlcnRcIjtcbmltcG9ydCB7IGNyZWF0ZUZpbHRlck9wdGlvbnMgfSBmcm9tIFwiLi4vLi4vY29tbW9uL2ZpbHRlcnNcIjtcblxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBBbGVydHNWaWV3IGV4dGVuZHMgSmV0VmlldyB7XG4gICAgY29uZmlnKCkge1xuICAgICAgICBjb25zdCB2aWV3ID0ge1xuICAgICAgICAgICAgcm93czogW1xuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgdmlldzogXCJkYXRhdGFibGVcIixcbiAgICAgICAgICAgICAgICAgICAgaWQ6IFwiYWxlcnRzX3RhYmxlXCIsXG4gICAgICAgICAgICAgICAgICAgIHJlc2l6ZUNvbHVtbjogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgc2VsZWN0OiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICBtdWx0aXNlbGVjdDogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgc2Nyb2xsOiBcInh5XCIsXG4gICAgICAgICAgICAgICAgICAgIGNzczogXCJ3ZWJpeF9oZWFkZXJfYm9yZGVyIHdlYml4X2RhdGFfYm9yZGVyXCIsXG4gICAgICAgICAgICAgICAgICAgIGNvbHVtbnM6IFt7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZDogXCJpbmRleFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgaGVhZGVyOiBcIiNcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIHNvcnQ6IFwiaW50XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBhdXRvd2lkdGg6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlkOiBcImFsZXJ0X3R5cGVcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIHNvcnQ6IFwiaW50XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBmb3JtYXQ6ICh2YWx1ZSkgPT4gVFlQRVNbdmFsdWVdLFxuICAgICAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDE1MCxcbiAgICAgICAgICAgICAgICAgICAgICAgIGhlYWRlcjogW1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiVHlwZVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29udGVudDogXCJzZWxlY3RGaWx0ZXJcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb3B0aW9uczogY3JlYXRlRmlsdGVyT3B0aW9ucyhUWVBFUylcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZDogXCJjb3VudFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgaGVhZGVyOiBcIkNvdW50XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBzb3J0OiBcImludFwiXG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlkOiBcInN0YXR1c1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgc29ydDogXCJpbnRcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvcm1hdDogKHZhbHVlKSA9PiBTVEFURVNbdmFsdWVdLFxuICAgICAgICAgICAgICAgICAgICAgICAgaGVhZGVyOiBbXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJTdGF0dXNcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRlbnQ6IFwic2VsZWN0RmlsdGVyXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9wdGlvbnM6IGNyZWF0ZUZpbHRlck9wdGlvbnMoU1RBVEVTKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlkOiBcImxldmVsXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBzb3J0OiBcImludFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgZm9ybWF0OiAodmFsdWUpID0+IExFVkVMU1t2YWx1ZV0sXG4gICAgICAgICAgICAgICAgICAgICAgICBoZWFkZXI6IFtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIkxldmVsXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb250ZW50OiBcInNlbGVjdEZpbHRlclwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvcHRpb25zOiBjcmVhdGVGaWx0ZXJPcHRpb25zKExFVkVMUylcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZDogXCJjYXRcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIGhlYWRlcjogW1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiQ2F0ZWdvcnlcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRlbnQ6IFwidGV4dEZpbHRlclwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHNvcnQ6IFwic3RyaW5nXCJcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWQ6IFwidGltZV9maXJzdFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgaGVhZGVyOiBcIkZpcnN0IHRpbWVcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIHNvcnQ6IFwiZGF0ZVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgZm9ybWF0OiBkYXRlRm9ybWF0dGVyLFxuICAgICAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDIwMFxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZDogXCJ0aW1lX2xhc3RcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIGhlYWRlcjogXCJMYXN0IHRpbWVcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIHNvcnQ6IFwiZGF0ZVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgZm9ybWF0OiBkYXRlRm9ybWF0dGVyLFxuICAgICAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDIwMFxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZDogXCJtZXNzYWdlXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBoZWFkZXI6IFtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIk1lc3NhZ2VcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRlbnQ6IFwidGV4dEZpbHRlclwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgICAgICAgICBzb3J0OiBcInN0clwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgZmlsbHNwYWNlOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgZm9ybWF0OiBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodmFsdWUubGVuZ3RoID4gTUFYX01TR19MRU4pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWUgPSB2YWx1ZS5zdWJzdHIoMCwgTUFYX01TR19MRU4pICsgJy4uLic7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBhbnNpVXAuYW5zaV90b19odG1sKHZhbHVlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICAgICAgYXV0b0NvbmZpZzogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgLy8gdXJsOntcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgICRwcm94eTp0cnVlLFxuICAgICAgICAgICAgICAgICAgICAvLyAgICAgbG9hZDogZnVuY3Rpb24odmlldywgcGFyYW1zKXtcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgICBsZXQgZGF0YSA9IHdlYml4LmFqYXgoXCIvemVyb2JvdC9hbGVydGEvYWN0b3JzL2FsZXJ0YS9saXN0X2FsZXJ0c1wiKTtcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgICByZXR1cm4gZGF0YTtcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIC8vIH1cbiAgICAgICAgICAgICAgICAgICAgc2NoZW1lOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAkaW5pdDogZnVuY3Rpb24gKG9iaikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9iai5pbmRleCA9IHRoaXMuY291bnQoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgJHN1YnZpZXc6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgIHBvcHVwOiB0cnVlXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgXVxuICAgICAgICB9O1xuXG4gICAgICAgIHJldHVybiB2aWV3O1xuICAgIH1cblxuICAgIGRlbGV0ZUl0ZW0ob2JqZWN0cykge1xuICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XG5cbiAgICAgICAgbGV0IGl0ZW1zID0gW10sXG4gICAgICAgICAgICBpZHMgPSBbXSxcbiAgICAgICAgICAgIGluZGV4ZXMgPSBbXTtcblxuICAgICAgICBmb3IgKGxldCBvYmogb2Ygb2JqZWN0cykge1xuICAgICAgICAgICAgaWRzLnB1c2gob2JqLmlkKTtcbiAgICAgICAgICAgIGxldCBpdGVtID0gc2VsZi50YWJsZS5nZXRJdGVtKG9iai5pZCk7XG4gICAgICAgICAgICBpdGVtcy5wdXNoKGl0ZW0pXG4gICAgICAgICAgICBpbmRleGVzLnB1c2goaXRlbS5pbmRleCk7XG4gICAgICAgIH1cblxuICAgICAgICB3ZWJpeC5jb25maXJtKHtcbiAgICAgICAgICAgIHRpdGxlOiBcIkRlbGV0ZSBhbGVydHNcIixcbiAgICAgICAgICAgIG9rOiBcIlllc1wiLFxuICAgICAgICAgICAgY2FuY2VsOiBcIk5vXCIsXG4gICAgICAgICAgICB0ZXh0OiBgRGVsZXRlIGFsZXJ0IGl0ZW0ocykgb2YgJHtpbmRleGVzLmpvaW4oXCIsIFwiKX1gXG4gICAgICAgIH0pLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgaWRlbnRpZmllcnMgPSBpdGVtcy5tYXAoKGl0ZW0pID0+IGl0ZW0uaWRlbnRpZmllcik7XG4gICAgICAgICAgICBzZWxmLnRhYmxlLnNob3dQcm9ncmVzcyh7XG4gICAgICAgICAgICAgICAgaGlkZTogZmFsc2VcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICBhbGVydHMuZGVsZXRlKGlkZW50aWZpZXIpLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgICAgIHNlbGYudGFibGUucmVtb3ZlKGlkcylcbiAgICAgICAgICAgICAgICBzZWxmLnRhYmxlLnNob3dQcm9ncmVzcyh7XG4gICAgICAgICAgICAgICAgICAgIGhpZGU6IHRydWVcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHZpZXdJdGVtKGlkKSB7XG4gICAgICAgIHRoaXMuYWxlcnRWaWV3LnNob3dGb3IodGhpcy50YWJsZS5nZXRJdGVtKGlkKSk7XG4gICAgfVxuXG4gICAgaW5pdCgpIHtcbiAgICAgICAgLy8gdGhpcy51c2UocGx1Z2lucy5Qcm9ncmVzc0JhciwgXCJwcm9ncmVzc1wiKTtcbiAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgICAgICBzZWxmLnRhYmxlID0gJCQoXCJhbGVydHNfdGFibGVcIik7XG4gICAgICAgIHNlbGYuYWxlcnRWaWV3ID0gc2VsZi51aShBbGVydFZpZXcpO1xuXG4gICAgICAgIHdlYml4LmV4dGVuZChzZWxmLnRhYmxlLCB3ZWJpeC5Qcm9ncmVzc0Jhcik7XG4gICAgICAgIHdlYml4LnJlYWR5KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHNlbGYudGFibGUuY2xlYXJBbGwoKTtcbiAgICAgICAgICAgIHNlbGYudGFibGUuc2hvd1Byb2dyZXNzKHtcbiAgICAgICAgICAgICAgICBoaWRlOiBmYWxzZVxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBhbGVydHMubGlzdCgpLnRoZW4oZGF0YSA9PiB7XG4gICAgICAgICAgICAgICAgbGV0IGFsZXJ0cyA9IGRhdGEuanNvbigpLmFsZXJ0cztcbiAgICAgICAgICAgICAgICBzZWxmLnRhYmxlLnBhcnNlKGFsZXJ0cyk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgd2ViaXgudWkoe1xuICAgICAgICAgICAgdmlldzogXCJjb250ZXh0bWVudVwiLFxuICAgICAgICAgICAgaWQ6IFwiYWxlcnRzX2NtXCIsXG4gICAgICAgICAgICBkYXRhOiBbXCJWaWV3XCIsIFwiRGVsZXRlXCJdXG4gICAgICAgIH0pLmF0dGFjaFRvKHNlbGYudGFibGUpO1xuXG5cbiAgICAgICAgc2VsZi50YWJsZS5hdHRhY2hFdmVudChcIm9uSXRlbURibENsaWNrXCIsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHNlbGYudmlld0l0ZW0oc2VsZi50YWJsZS5nZXRTZWxlY3RlZElkKCkpO1xuICAgICAgICB9KTtcblxuICAgICAgICAkJChcImFsZXJ0c19jbVwiKS5hdHRhY2hFdmVudChcIm9uTWVudUl0ZW1DbGlja1wiLCBmdW5jdGlvbiAoaWQpIHtcbiAgICAgICAgICAgIGlmIChpZCA9PSBcIkRlbGV0ZVwiKSB7XG4gICAgICAgICAgICAgICAgc2VsZi5kZWxldGVJdGVtKHNlbGYudGFibGUuZ2V0U2VsZWN0ZWRJZCh0cnVlKSk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKGlkID09IFwiVmlld1wiKSB7XG4gICAgICAgICAgICAgICAgc2VsZi52aWV3SXRlbShzZWxmLnRhYmxlLmdldFNlbGVjdGVkSWQoKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NvdXJjZXMvdmlld3MvYWxlcnRzL2luZGV4LmpzIiwiaW1wb3J0IHsgRXh0ZXJuYWxWaWV3IH0gZnJvbSBcIi4uL2V4dGVybmFsXCI7XG5cbmNvbnN0IENPREVfVVJMID0gXCIvY29kZXNlcnZlci8/Zm9sZGVyPS9zYW5kYm94L2NvZGVcIjtcbmNvbnN0IFJFUVVJUkVEX1BBQ0tBR0VTID0ge1xuICAgIFwiemVyb2JvdC5jb2Rlc2VydmVyXCI6IFwiaHR0cHM6Ly9naXRodWIuY29tL3RocmVlZm9sZHRlY2gvanVtcHNjYWxlWF90aHJlZWJvdC90cmVlL2RldmVsb3BtZW50L1RocmVlQm90UGFja2FnZXMvemVyb2JvdC9jb2Rlc2VydmVyXCJcbn1cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ29kZXNlcnZlclZpZXcgZXh0ZW5kcyBFeHRlcm5hbFZpZXcge1xuICAgIGNvbnN0cnVjdG9yKGFwcCwgbmFtZSkge1xuICAgICAgICBzdXBlcihhcHAsIG5hbWUsIENPREVfVVJMLCBSRVFVSVJFRF9QQUNLQUdFUyk7XG4gICAgfVxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc291cmNlcy92aWV3cy9jb2Rlc2VydmVyL2luZGV4LmpzIiwiaW1wb3J0IHsgSmV0VmlldyB9IGZyb20gXCJ3ZWJpeC1qZXRcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVG9wVmlldyBleHRlbmRzIEpldFZpZXcge1xuXHRjb25maWcoKSB7XG5cdFx0cmV0dXJuIHtcblx0XHRcdHR5cGU6IFwic3BhY2VcIixcblx0XHRcdHJlc3BvbnNpdmU6IHRydWUsXG5cdFx0XHRyb3dzOiBbXG5cdFx0XHRcdHtcblx0XHRcdFx0XHRjb2xzOiBbe1xuXHRcdFx0XHRcdFx0JHN1YnZpZXc6IFwiZGFzaC5qc3hJbmZvXCJcblx0XHRcdFx0XHR9LFxuXHRcdFx0XHRcdHtcblx0XHRcdFx0XHRcdCRzdWJ2aWV3OiBcImRhc2guaGVhbHRoXCJcblx0XHRcdFx0XHR9LFxuXHRcdFx0XHRcdHtcblx0XHRcdFx0XHRcdCRzdWJ2aWV3OiBcImRhc2guZGlza1NwYWNlXCJcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XVxuXHRcdFx0XHR9LFxuXHRcdFx0XHR7XG5cdFx0XHRcdFx0Y29sczogW3tcblx0XHRcdFx0XHRcdCRzdWJ2aWV3OiBcImRhc2gucHJvY2Vzc2VzXCJcblx0XHRcdFx0XHR9LFxuXHRcdFx0XHRcdHsgJHN1YnZpZXc6IFwiZGFzaC5ydW5uaW5nUG9ydHNcIiB9XVxuXHRcdFx0XHR9LFxuXHRcdFx0XVxuXHRcdH07XG5cdH1cbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NvdXJjZXMvdmlld3MvZGFzaC9pbmRleC5qcyIsImltcG9ydCB7IEV4dGVybmFsVmlldyB9IGZyb20gXCIuLi9leHRlcm5hbFwiO1xuXG5jb25zdCBVUkwgPSBcIi9zaW11bGF0b3IvdGhyZWVmb2xkL25vdGVib29rL1wiO1xuY29uc3QgUkVRVUlSRURfUEFDS0FHRVMgPSB7XG4gICAgXCJ0aHJlZWZvbGQuc2ltdWxhdG9yXCI6IFwiaHR0cHM6Ly9naXRodWIuY29tL3RocmVlZm9sZHRlY2gvanVtcHNjYWxlWF90aHJlZWJvdC90cmVlL2RldmVsb3BtZW50L1RocmVlQm90UGFja2FnZXMvdGhyZWVmb2xkL3NpbXVsYXRvclwiXG59XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEp1cHl0ZXJWaWV3IGV4dGVuZHMgRXh0ZXJuYWxWaWV3IHtcbiAgICBjb25zdHJ1Y3RvcihhcHAsIG5hbWUpIHtcbiAgICAgICAgc3VwZXIoYXBwLCBuYW1lLCBVUkwsIFJFUVVJUkVEX1BBQ0tBR0VTKTtcbiAgICB9XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zb3VyY2VzL3ZpZXdzL2p1cHl0ZXIvaW5kZXguanMiLCJpbXBvcnQgeyBKZXRWaWV3IH0gZnJvbSBcIndlYml4LWpldFwiO1xuXG5pbXBvcnQgQXBwTG9nc1ZpZXcgZnJvbSBcIi4vYXBwTG9nc1wiO1xuaW1wb3J0IHsgbG9ncyB9IGZyb20gXCIuLi8uLi9zZXJ2aWNlcy9sb2dzXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIExvZ3NWaWV3IGV4dGVuZHMgSmV0VmlldyB7XG4gICAgY29uZmlnKCkge1xuXG4gICAgICAgIGNvbnN0IHZpZXcgPSB7XG4gICAgICAgICAgICByb3dzOiBbe1xuICAgICAgICAgICAgICAgIGNvbHM6IFtcbiAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmlldzogXCJ0ZW1wbGF0ZVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgdHlwZTogXCJoZWFkZXJcIiwgdGVtcGxhdGU6IFwiTG9nc1wiLFxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICB2aWV3OiBcImNvbWJvXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBpZDogXCJhcHBzX2NvbWJvXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBwbGFjZWhvbGRlcjogXCJDaG9vc2UgeW91ciBhcHBsaWNhdGlvblwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgb246IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbkNoYW5nZTogZnVuY3Rpb24gKGFwcE5hbWUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy4kc2NvcGUuc2hvd0ZvcihhcHBOYW1lKVxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgQXBwTG9nc1ZpZXdcbiAgICAgICAgICAgIF1cbiAgICAgICAgfTtcblxuICAgICAgICByZXR1cm4gdmlldztcbiAgICB9XG5cbiAgICBpbml0KHZpZXcpIHtcbiAgICAgICAgdmlldy5hcHBzQ29tYm8gPSAkJChcImFwcHNfY29tYm9cIik7XG4gICAgICAgIGxvZ3MubGlzdEFwcHMoKS50aGVuKGRhdGEgPT4ge1xuICAgICAgICAgICAgdmlldy5hcHBzQ29tYm8uZGVmaW5lKFwib3B0aW9uc1wiLCBkYXRhLmpzb24oKSk7XG4gICAgICAgICAgICB2aWV3LmFwcHNDb21iby5yZW5kZXIoKTtcbiAgICAgICAgfSk7XG5cbiAgICB9XG5cbiAgICB1cmxDaGFuZ2UodmlldywgdXJsKSB7XG4gICAgICAgIGNvbnN0IGFwcE5hbWUgPSB1cmxbMF0ucGFyYW1zLmFwcG5hbWUsIGxvZ0lkID0gdXJsWzBdLnBhcmFtcy5sb2dpZDtcbiAgICAgICAgaWYgKGFwcE5hbWUpIHtcbiAgICAgICAgICAgIHRoaXMuc2hvd0ZvcihhcHBOYW1lLCBsb2dJZCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBzaG93Rm9yKGFwcE5hbWUsIGxvZ0lkKSB7XG4gICAgICAgIHZhciBzZWxmID0gdGhpcztcbiAgICAgICAgc2VsZi5hcHBMb2dzID0gJCQoXCJhcHBsb2dzX3RhYmxlXCIpO1xuXG4gICAgICAgIHdlYml4LmV4dGVuZChzZWxmLmFwcExvZ3MsIHdlYml4LlByb2dyZXNzQmFyKTtcbiAgICAgICAgc2VsZi5hcHBMb2dzLnNob3dQcm9ncmVzcyh7IGhpZGU6IGZhbHNlIH0pO1xuXG4gICAgICAgIGxvZ3MubGlzdChhcHBOYW1lLCBsb2dJZCkudGhlbihkYXRhID0+IHtcbiAgICAgICAgICAgIHNlbGYuYXBwTG9ncy5jbGVhckFsbCgpXG4gICAgICAgICAgICBzZWxmLmFwcExvZ3MucGFyc2UoZGF0YS5qc29uKClbMF0pXG4gICAgICAgICAgICBzZWxmLmFwcExvZ3Muc2hvd1Byb2dyZXNzKHsgaGlkZTogdHJ1ZSB9KTtcbiAgICAgICAgfSk7XG4gICAgfVxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc291cmNlcy92aWV3cy9sb2dzL2luZGV4LmpzIiwiaW1wb3J0IHsgSmV0VmlldyB9IGZyb20gXCJ3ZWJpeC1qZXRcIjtcblxuaW1wb3J0IHsgZGF0ZUZvcm1hdHRlciB9IGZyb20gXCIuLi8uLi9jb21tb24vZm9ybWF0dGVyc1wiO1xuaW1wb3J0IHsgbXlqb2JzIH0gZnJvbSBcIi4uLy4uL3NlcnZpY2VzL215am9ic1wiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBKb2JzVmlldyBleHRlbmRzIEpldFZpZXcge1xuICAgIGNvbmZpZygpIHtcbiAgICAgICAgY29uc3QgdmlldyA9IHtcbiAgICAgICAgICAgIHZpZXc6IFwiZGF0YXRhYmxlXCIsXG4gICAgICAgICAgICBpZDogXCJqb2JzX3RhYmxlXCIsXG4gICAgICAgICAgICByZXNpemVDb2x1bW46IHRydWUsXG4gICAgICAgICAgICBzZWxlY3Q6IHRydWUsXG4gICAgICAgICAgICBtdWx0aXNlbGVjdDogdHJ1ZSxcbiAgICAgICAgICAgIGNzczogXCJ3ZWJpeF9oZWFkZXJfYm9yZGVyIHdlYml4X2RhdGFfYm9yZGVyXCIsXG4gICAgICAgICAgICBjb2x1bW5zOiBbe1xuICAgICAgICAgICAgICAgIGlkOiBcImluZGV4XCIsXG4gICAgICAgICAgICAgICAgaGVhZGVyOiBcIiNcIixcbiAgICAgICAgICAgICAgICBzb3J0OiBcImludFwiLFxuICAgICAgICAgICAgICAgIGF1dG93aWR0aDogdHJ1ZSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgaWQ6IFwiY2F0ZWdvcnlcIixcbiAgICAgICAgICAgICAgICBoZWFkZXI6IFwiQ2F0ZWdvcnlcIixcbiAgICAgICAgICAgICAgICBzb3J0OiBcInN0cmluZ1wiXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGlkOiBcInRpbWVfc3RhcnRcIixcbiAgICAgICAgICAgICAgICBoZWFkZXI6IFwiU3RhcnQgdGltZVwiLFxuICAgICAgICAgICAgICAgIHNvcnQ6IFwiZGF0ZVwiLFxuICAgICAgICAgICAgICAgIGZvcm1hdDogZGF0ZUZvcm1hdHRlcixcbiAgICAgICAgICAgICAgICB3aWR0aDogMjAwXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGlkOiBcInRpbWVfc3RvcFwiLFxuICAgICAgICAgICAgICAgIGhlYWRlcjogXCJTdG9wIHRpbWVcIixcbiAgICAgICAgICAgICAgICBzb3J0OiBcImRhdGVcIixcbiAgICAgICAgICAgICAgICBmb3JtYXQ6IGRhdGVGb3JtYXR0ZXIsXG4gICAgICAgICAgICAgICAgd2lkdGg6IDIwMFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBpZDogXCJ0aW1lb3V0XCIsXG4gICAgICAgICAgICAgICAgaGVhZGVyOiBcIlRpbWVvdXRcIixcbiAgICAgICAgICAgICAgICBzb3J0OiBcImludFwiXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGlkOiBcImFjdGlvbl9pZFwiLFxuICAgICAgICAgICAgICAgIGhlYWRlcjogXCJBY3Rpb25cIixcbiAgICAgICAgICAgICAgICBzb3J0OiBcInN0cmluZ1wiXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGlkOiBcImt3YXJnc1wiLFxuICAgICAgICAgICAgICAgIGhlYWRlcjogXCJBcmd1bWVudHNcIixcbiAgICAgICAgICAgICAgICBzb3J0OiBcInN0cmluZ1wiLFxuICAgICAgICAgICAgICAgIGZvcm1hdDogSlNPTi5zdHJpbmdpZnlcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgaWQ6IFwicmVzdWx0XCIsXG4gICAgICAgICAgICAgICAgaGVhZGVyOiBbXG4gICAgICAgICAgICAgICAgICAgIFwiUmVzdWx0XCIsXG4gICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRlbnQ6IFwidGV4dEZpbHRlclwiXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgIHNvcnQ6IFwic3RyaW5nXCIsXG4gICAgICAgICAgICAgICAgZm9ybWF0OiBKU09OLnN0cmluZ2lmeSxcbiAgICAgICAgICAgIH1dLFxuICAgICAgICAgICAgc2NoZW1lOiB7XG4gICAgICAgICAgICAgICAgJGluaXQ6IGZ1bmN0aW9uIChvYmopIHtcbiAgICAgICAgICAgICAgICAgICAgb2JqLmluZGV4ID0gdGhpcy5jb3VudCgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgIH07XG5cbiAgICAgICAgcmV0dXJuIHZpZXc7XG4gICAgfVxuXG4gICAgaW5pdCh2aWV3KSB7XG4gICAgICAgIG15am9icy5saXN0Sm9icygpLnRoZW4oZGF0YSA9PiB7XG4gICAgICAgICAgICB2aWV3LnBhcnNlKGRhdGEpO1xuICAgICAgICB9KTtcbiAgICB9XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zb3VyY2VzL3ZpZXdzL215am9icy9pbmRleC5qcyIsImltcG9ydCB7IEpldFZpZXcgfSBmcm9tIFwid2ViaXgtamV0XCI7XG5cbmltcG9ydCB7IEVycm9yVmlldyB9IGZyb20gXCIuLi9lcnJvcnMvZGlhbG9nXCI7XG5pbXBvcnQgeyBwYWNrYWdlcyB9IGZyb20gXCIuLi8uLi9zZXJ2aWNlcy9wYWNrYWdlc1wiO1xuXG5jb25zdCBVTktOT1dOX1NUQVRVUyA9ICdVbmtvd24nO1xuXG5jb25zdCBQQUNLQUdFX1NUQVRFUyA9IFtcbiAgICB7XG4gICAgICAgIG5hbWU6IFwiSW5pdFwiLFxuICAgICAgICBhY3Rpb25zOiBbXCJkZWxldGVcIl1cbiAgICB9LFxuICAgIHtcbiAgICAgICAgbmFtZTogXCJDb25maWdcIixcbiAgICAgICAgYWN0aW9uczogWydpbnN0YWxsJywgJ2RlbGV0ZSddLFxuICAgIH0sXG4gICAge1xuICAgICAgICBuYW1lOiBcIkluc3RhbGxlZFwiLFxuICAgICAgICBhY3Rpb25zOiBbJ2RlbGV0ZScsIFwic3RhcnRcIl1cbiAgICB9LFxuICAgIHtcbiAgICAgICAgbmFtZTogXCJSdW5uaW5nXCIsXG4gICAgICAgIGFjdGlvbnM6IFsnZGVsZXRlJywgXCJzdG9wXCJdXG4gICAgfSxcbiAgICB7XG4gICAgICAgIG5hbWU6IFwiSGFsdGVkXCIsXG4gICAgICAgIGFjdGlvbnM6IFsnZGVsZXRlJywgXCJzdGFydFwiLCBcImRpc2FibGVcIl1cbiAgICB9LFxuICAgIHtcbiAgICAgICAgbmFtZTogXCJEaXNhYmxlZFwiLFxuICAgICAgICBhY3Rpb25zOiBbJ2RlbGV0ZScsIFwiZW5hYmxlXCJdXG4gICAgfSxcbiAgICB7XG4gICAgICAgIG5hbWU6IFwiRXJyb3JcIixcbiAgICAgICAgYWN0aW9uczogW1wiZGVsZXRlXCJdXG4gICAgfVxuXVxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBQYWNrYWdlc1ZpZXcgZXh0ZW5kcyBKZXRWaWV3IHtcbiAgICBjb25maWcoKSB7XG4gICAgICAgIGNvbnN0IGdyaWQgPSB7XG4gICAgICAgICAgICByb3dzOiBbe1xuICAgICAgICAgICAgICAgIC8vSGVhZGVyXG4gICAgICAgICAgICAgICAgdmlldzogXCJ0ZW1wbGF0ZVwiLFxuICAgICAgICAgICAgICAgIHR5cGU6IFwiaGVhZGVyXCIsXG4gICAgICAgICAgICAgICAgdGVtcGxhdGU6IFwiUGFja2FnZXNcIixcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7IC8vYWRkaW5nIFBhY2thZ2VcbiAgICAgICAgICAgICAgICBjb2xzOiBbe1xuICAgICAgICAgICAgICAgICAgICAvL3NlbGVjdG9yXG4gICAgICAgICAgICAgICAgICAgIHZpZXc6IFwic2VsZWN0XCIsXG4gICAgICAgICAgICAgICAgICAgIGlkOiAnbWV0aG9kX3NlbGVjdG9yJyxcbiAgICAgICAgICAgICAgICAgICAgb3B0aW9uczogW1wiUGF0aFwiLCBcIkdpdHVybFwiXSxcbiAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDEwMFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgLy90ZXh0IGFyZWFcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIHZpZXc6IFwidGV4dFwiLFxuICAgICAgICAgICAgICAgICAgICBpZDogJ3BhY2thZ2VfcGF0aCcsXG4gICAgICAgICAgICAgICAgICAgIGlucHV0QWxpZ246IFwibGVmdFwiLFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgLy9zdWJtaXQgYnV0dG9uXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICB2aWV3OiBcImJ1dHRvblwiLFxuICAgICAgICAgICAgICAgICAgICBpZDogXCJhZGRfcGFja2FnZV9idXR0b25cIixcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU6IFwiQWRkIHBhY2thZ2VcIixcbiAgICAgICAgICAgICAgICAgICAgYXV0b3dpZHRoOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICB0eXBlOiBcIlwiLFxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgeyAvL0RhdGFUYWJsZVxuICAgICAgICAgICAgICAgIHZpZXc6IFwiZGF0YXRhYmxlXCIsXG4gICAgICAgICAgICAgICAgaWQ6IFwicGFja2FnZXNfdGFibGVcIixcbiAgICAgICAgICAgICAgICByZXNpemVDb2x1bW46IHRydWUsXG4gICAgICAgICAgICAgICAgdHlwZToge1xuICAgICAgICAgICAgICAgICAgICBoZWlnaHQ6IDIwMCxcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHNjcm9sbDogXCJ4eVwiLFxuICAgICAgICAgICAgICAgIGF1dG9Db25maWc6IHRydWUsXG4gICAgICAgICAgICAgICAgdmlldzogXCJkYXRhdGFibGVcIixcbiAgICAgICAgICAgICAgICBzZWxlY3Q6IHRydWUsXG4gICAgICAgICAgICAgICAgY3NzOiBcIndlYml4X2hlYWRlcl9ib3JkZXIgd2ViaXhfZGF0YV9ib3JkZXJcIixcbiAgICAgICAgICAgICAgICBvbkNvbnRleHQ6IHt9LFxuICAgICAgICAgICAgICAgIGNvbHVtbnM6IFt7XG4gICAgICAgICAgICAgICAgICAgIGlkOiBcImluZGV4XCIsXG4gICAgICAgICAgICAgICAgICAgIGhlYWRlcjogXCIjXCIsXG4gICAgICAgICAgICAgICAgICAgIHNvcnQ6IFwiaW50XCIsXG4gICAgICAgICAgICAgICAgICAgIGF1dG93aWR0aDogdHJ1ZSxcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgaWQ6IFwiYXV0aG9yXCIsXG4gICAgICAgICAgICAgICAgICAgIGhlYWRlcjogW1wiQXV0aG9yXCIsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRlbnQ6IFwic2VsZWN0RmlsdGVyXCJcbiAgICAgICAgICAgICAgICAgICAgfV0sXG4gICAgICAgICAgICAgICAgICAgIHNvcnQ6IFwic3RyaW5nXCIsXG4gICAgICAgICAgICAgICAgICAgIHdpZHRoOiAyMDBcbiAgICAgICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgICAgIGlkOiBcIm5hbWVcIixcbiAgICAgICAgICAgICAgICAgICAgaGVhZGVyOiBbXCJOYW1lXCIsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRlbnQ6IFwidGV4dEZpbHRlclwiXG4gICAgICAgICAgICAgICAgICAgIH1dLFxuICAgICAgICAgICAgICAgICAgICBzb3J0OiBcInN0cmluZ1wiLFxuICAgICAgICAgICAgICAgICAgICB3aWR0aDogMjAwXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIGlkOiBcInN0YXR1c1wiLFxuICAgICAgICAgICAgICAgICAgICBoZWFkZXI6IFwiU3RhdHVzXCIsXG4gICAgICAgICAgICAgICAgICAgIHNvcnQ6IFwic3RyaW5nXCJcbiAgICAgICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgICAgIGlkOiBcInBhdGhcIixcbiAgICAgICAgICAgICAgICAgICAgaGVhZGVyOiBcIlBhdGhcIixcbiAgICAgICAgICAgICAgICAgICAgc29ydDogXCJzdHJpbmdcIixcbiAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDcwMFxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgIHNjaGVtZToge1xuICAgICAgICAgICAgICAgICAgICAkaW5pdDogZnVuY3Rpb24gKG9iaikge1xuICAgICAgICAgICAgICAgICAgICAgICAgb2JqLmluZGV4ID0gdGhpcy5jb3VudCgpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgXVxuICAgICAgICB9O1xuICAgICAgICByZXR1cm4gZ3JpZDtcbiAgICB9XG5cbiAgICBzaG93RXJyb3IobWVzc2FnZSkge1xuICAgICAgICB0aGlzLmVycm9yVmlldy5zaG93RXJyb3IobWVzc2FnZSk7XG4gICAgfVxuXG4gICAgaGFuZGxlUmVzdWx0KHByb21pc2UsIGNhbGxiYWNrKSB7XG4gICAgICAgIHRoaXMucGFja2FnZVRhYmxlLnNob3dQcm9ncmVzcyh7IGhpZGU6IGZhbHNlIH0pO1xuXG4gICAgICAgIHByb21pc2UudGhlbigoZGF0YSkgPT4ge1xuICAgICAgICAgICAgaWYgKGNhbGxiYWNrIGluc3RhbmNlb2YgRnVuY3Rpb24pIHtcbiAgICAgICAgICAgICAgICBjYWxsYmFjayhkYXRhKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgd2ViaXgubWVzc2FnZSh7XG4gICAgICAgICAgICAgICAgdHlwZTogXCJzdWNjZXNzXCIsXG4gICAgICAgICAgICAgICAgdGV4dDogXCJUaGUgb3BlcmF0aW9uIGhhcyBiZWVkIGRvbmUgc3VjY2Vzc2Z1bGx5XCJcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgdGhpcy5wYWNrYWdlVGFibGUuc2hvd1Byb2dyZXNzKHsgaGlkZTogdHJ1ZSB9KTtcbiAgICAgICAgfSkuY2F0Y2goZXJyb3IgPT4ge1xuICAgICAgICAgICAgdGhpcy5zaG93RXJyb3IoXCJFcnJvciBoYXMgaGFwcGVuZWQgZHVyaW5nIHRoaXMgb3BlcmF0aW9uOiBcIiArIGVycm9yLnJlc3BvbnNlLCBcIkVycm9yXCIpO1xuICAgICAgICAgICAgdGhpcy5wYWNrYWdlVGFibGUuc2hvd1Byb2dyZXNzKHsgaGlkZTogdHJ1ZSB9KTtcbiAgICAgICAgfSlcbiAgICB9XG5cbiAgICBhZGRQYWNrYWdlKHBhdGgsIGdpdFVybCkge1xuICAgICAgICB0aGlzLmhhbmRsZVJlc3VsdChwYWNrYWdlcy5hZGQocGF0aCwgZ2l0VXJsKSk7XG4gICAgfVxuXG5cbiAgICBkZWxldGVQYWNrYWdlKHBhY2thZ2VOYW1lLCBlbGVtZW50SUQpIHtcbiAgICAgICAgdGhpcy5oYW5kbGVSZXN1bHQocGFja2FnZXMuZGVsZXRlKHBhY2thZ2VOYW1lKSwgKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5wYWNrYWdlVGFibGUucmVtb3ZlKGVsZW1lbnRJRClcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgc3RhcnRQYWNrYWdlKHBhY2thZ2VOYW1lKSB7XG4gICAgICAgIHRoaXMuaGFuZGxlUmVzdWx0KHBhY2thZ2VzLnN0YXJ0KHBhY2thZ2VOYW1lKSk7XG4gICAgfVxuXG4gICAgc3RvcFBhY2thZ2UocGFja2FnZU5hbWUpIHtcbiAgICAgICAgdGhpcy5oYW5kbGVSZXN1bHQocGFja2FnZXMuc3RvcChwYWNrYWdlTmFtZSkpO1xuXG4gICAgfVxuXG4gICAgZW5hYmxlUGFja2FnZShwYWNrYWdlTmFtZSkge1xuICAgICAgICB0aGlzLmhhbmRsZVJlc3VsdChwYWNrYWdlcy5lbmFibGVQYWNrYWdlKHBhY2thZ2VOYW1lKSk7XG4gICAgfVxuXG4gICAgZGlzYWJsZVBhY2thZ2UocGFja2FnZU5hbWUpIHtcbiAgICAgICAgdGhpcy5oYW5kbGVSZXN1bHQocGFja2FnZXMuZGlzYWJsZShwYWNrYWdlTmFtZSkpO1xuXG4gICAgfVxuXG4gICAgaW5pdCh2aWV3KSB7XG4gICAgICAgIGNvbnN0IHNlbGYgPSB0aGlzO1xuXG4gICAgICAgIHNlbGYuZXJyb3JWaWV3ID0gdGhpcy51aShFcnJvclZpZXcpO1xuXG4gICAgICAgIGNvbnN0IG1lbnUgPSB3ZWJpeC51aSh7XG4gICAgICAgICAgICB2aWV3OiBcImNvbnRleHRtZW51XCIsXG4gICAgICAgICAgICBpZDogXCJwYWNrYWdlc19jbVwiXG4gICAgICAgIH0pO1xuXG4gICAgICAgIHRoaXMucGFja2FnZVRhYmxlID0gdGhpcy4kJChcInBhY2thZ2VzX3RhYmxlXCIpO1xuICAgICAgICB3ZWJpeC5leHRlbmQodGhpcy5wYWNrYWdlVGFibGUsIHdlYml4LlByb2dyZXNzQmFyKTtcblxuICAgICAgICBmdW5jdGlvbiBjaGVja0FjdGlvbihhY3Rpb24sIHNlbGVjdGVkSXRlbUlkKSB7XG4gICAgICAgICAgICBpZiAoc2VsZi5wYWNrYWdlVGFibGUuZ2V0SXRlbShzZWxlY3RlZEl0ZW1JZCkpIHtcbiAgICAgICAgICAgICAgICBsZXQgbmFtZSA9IHNlbGYucGFja2FnZVRhYmxlLmdldEl0ZW0oc2VsZWN0ZWRJdGVtSWQpLm5hbWVcbiAgICAgICAgICAgICAgICBsZXQgYXV0aG9yID0gc2VsZi5wYWNrYWdlVGFibGUuZ2V0SXRlbShzZWxlY3RlZEl0ZW1JZCkuYXV0aG9yXG4gICAgICAgICAgICAgICAgbGV0IGVsZW1lbnRJRCA9IHNlbGYucGFja2FnZVRhYmxlLmdldEl0ZW0oc2VsZWN0ZWRJdGVtSWQpLmlkXG4gICAgICAgICAgICAgICAgbGV0IHBhY2thZ2VOYW1lID0gYXV0aG9yICsgXCIuXCIgKyBuYW1lXG4gICAgICAgICAgICAgICAgaWYgKGFjdGlvbiA9PSAnZGVsZXRlJykge1xuICAgICAgICAgICAgICAgICAgICAvL2RlbGV0ZVBhY2thZ2UocGFja2FnZU5hbWUpXG4gICAgICAgICAgICAgICAgICAgIC8vIHNlbGYucGFja2FnZVRhYmxlLnJlbW92ZShlbGVtZW50SUQpXG4gICAgICAgICAgICAgICAgICAgIC8vXG4gICAgICAgICAgICAgICAgICAgIHdlYml4LmNvbmZpcm0oe1xuICAgICAgICAgICAgICAgICAgICAgICAgdGl0bGU6IFwiRGVsZXRlIFBhY2thZ2VcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIG9rOiBcIlllc1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgdGV4dDogYEFyZSB5b3Ugc3VyZSB5b3Ugd2FudCB0byBkZWxldGUgJHthdXRob3J9LiR7bmFtZX0/YCxcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhbmNlbDogXCJOb1wiLFxuICAgICAgICAgICAgICAgICAgICB9KS50aGVuKCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuZGVsZXRlUGFja2FnZShwYWNrYWdlTmFtZSwgZWxlbWVudElEKVxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgLy9cbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGFjdGlvbiA9PSAnc3RhcnQnKSB7XG4gICAgICAgICAgICAgICAgICAgIHNlbGYuc3RhcnRQYWNrYWdlKHBhY2thZ2VOYW1lKVxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoYWN0aW9uID09ICdzdG9wJykge1xuICAgICAgICAgICAgICAgICAgICBzZWxmLnN0b3BQYWNrYWdlKHBhY2thZ2VOYW1lKVxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoYWN0aW9uID09ICdkaXNhYmxlJykge1xuICAgICAgICAgICAgICAgICAgICBzZWxmLmRpc2FibGVQYWNrYWdlKHBhY2thZ2VOYW1lKVxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoYWN0aW9uID09ICdlbmFibGUnKSB7XG4gICAgICAgICAgICAgICAgICAgIHNlbGYuZW5hYmxlUGFja2FnZShwYWNrYWdlTmFtZSlcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHdlYml4Lm1lc3NhZ2UoXCJ5b3UgaGF2ZSB0byBzZWxlY3QgYSBwYWNrYWdlXCIpXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICAkJChcImFkZF9wYWNrYWdlX2J1dHRvblwiKS5hdHRhY2hFdmVudChcIm9uSXRlbUNsaWNrXCIsIGZ1bmN0aW9uIChpZCkge1xuICAgICAgICAgICAgbGV0IHBhY2FrZ2VMb2NhdGlvbiA9ICQkKFwicGFja2FnZV9wYXRoXCIpLmdldFZhbHVlKClcbiAgICAgICAgICAgIGlmIChwYWNha2dlTG9jYXRpb24gPT0gXCJcIikge1xuICAgICAgICAgICAgICAgIGFsZXJ0KFwicGxlYXNlIGVudGVyIHBhY2thZ2UgbG9jYXRpb25cIilcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgbGV0IHBhY2thZ2VNZXRob2QgPSAkJChcIm1ldGhvZF9zZWxlY3RvclwiKS5nZXRWYWx1ZSgpXG4gICAgICAgICAgICAgICAgbGV0IGdpdFVybCA9IG51bGw7XG4gICAgICAgICAgICAgICAgbGV0IHBhdGggPSBudWxsO1xuICAgICAgICAgICAgICAgIGlmIChwYWNrYWdlTWV0aG9kID09IFwiR2l0dXJsXCIpIHtcbiAgICAgICAgICAgICAgICAgICAgZ2l0VXJsID0gcGFjYWtnZUxvY2F0aW9uXG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChwYWNrYWdlTWV0aG9kID09IFwiUGF0aFwiKSB7XG4gICAgICAgICAgICAgICAgICAgIHBhdGggPSBwYWNha2dlTG9jYXRpb25cbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBhbGVydChcInNvbWV0aGluZyB3ZW50IHdyb25nIGR1cmluZyBzZWxlY3RpbmcgdGhlIHBhY2thZ2UgbWV0aG9kXCIpXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHNlbGYuYWRkUGFja2FnZShwYXRoLCBnaXRVcmwpXG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgICQkKFwicGFja2FnZXNfY21cIikuYXR0YWNoRXZlbnQoXCJvbk1lbnVJdGVtQ2xpY2tcIiwgZnVuY3Rpb24gKGlkKSB7XG4gICAgICAgICAgICBjaGVja0FjdGlvbihpZCwgc2VsZi5wYWNrYWdlVGFibGUuZ2V0U2VsZWN0ZWRJZCgpKTtcbiAgICAgICAgfSk7XG5cblxuICAgICAgICB3ZWJpeC5ldmVudChzZWxmLnBhY2thZ2VUYWJsZS4kdmlldywgXCJjb250ZXh0bWVudVwiLCBmdW5jdGlvbiAoZSAvKk1vdXNlRXZlbnQqLykge1xuICAgICAgICAgICAgdmFyIHBvcyA9IHNlbGYucGFja2FnZVRhYmxlLmxvY2F0ZShlKTtcbiAgICAgICAgICAgIHZhciBtZW51ZGF0YSA9IFtdO1xuICAgICAgICAgICAgaWYgKHBvcykge1xuICAgICAgICAgICAgICAgIHZhciBpdGVtID0gc2VsZi5wYWNrYWdlVGFibGUuZ2V0SXRlbShwb3Mucm93KTtcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IFBBQ0tBR0VfU1RBVEVTLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChQQUNLQUdFX1NUQVRFU1tpXS5uYW1lID09IGl0ZW0uc3RhdHVzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBtZW51ZGF0YSA9IGFkZEFjdGlvbnMobWVudWRhdGEsIGkpXG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIG1lbnUuY2xlYXJBbGwoKTtcbiAgICAgICAgICAgIG1lbnUucGFyc2UobWVudWRhdGEpO1xuICAgICAgICAgICAgbWVudS5zaG93KGUpO1xuICAgICAgICAgICAgcmV0dXJuIHdlYml4Lmh0bWwucHJldmVudEV2ZW50KGUpO1xuICAgICAgICB9KVxuXG4gICAgICAgIC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG5cblxuICAgICAgICAvLyBIZWxwZXIgZnVuY3Rpb25zXG5cbiAgICAgICAgLy8gTWFwcGluZyB0aGUgZGF0YSB0byB0aGUgcmlnaHQgZm9ybWF0IHRvIGJlIGFibGUgdG8gZGlwbGF5IHRoZSBhY3R1YWwgc3RhdHVzXG4gICAgICAgIGZ1bmN0aW9uIG1hcERhdGEoYWxsSXRlbXMpIHtcbiAgICAgICAgICAgIHJldHVybiBhbGxJdGVtcy5tYXAoaXRlbSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3Qgc3RhdHVzID0gUEFDS0FHRV9TVEFURVNbaXRlbS5zdGF0dXNdO1xuICAgICAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgICAgIFwibmFtZVwiOiBpdGVtLnNvdXJjZS5uYW1lLFxuICAgICAgICAgICAgICAgICAgICBcImF1dGhvclwiOiBpdGVtLnNvdXJjZS50aHJlZWJvdCxcbiAgICAgICAgICAgICAgICAgICAgXCJwYXRoXCI6IGl0ZW0ucGF0aCxcbiAgICAgICAgICAgICAgICAgICAgXCJzdGF0dXNcIjogc3RhdHVzICYmIHN0YXR1cy5uYW1lIHx8IFVOS05PV05fU1RBVFVTXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICBmdW5jdGlvbiBhZGRBY3Rpb25zKG1lbnVkYXRhLCBwa2dJbmRleCkge1xuICAgICAgICAgICAgZm9yICh2YXIgaiA9IDA7IGogPCBQQUNLQUdFX1NUQVRFU1twa2dJbmRleF0uYWN0aW9ucy5sZW5ndGg7IGorKylcbiAgICAgICAgICAgICAgICBtZW51ZGF0YS5wdXNoKFBBQ0tBR0VfU1RBVEVTW3BrZ0luZGV4XS5hY3Rpb25zW2pdKTtcbiAgICAgICAgICAgIHJldHVybiBtZW51ZGF0YVxuXG4gICAgICAgIH1cblxuICAgICAgICBwYWNrYWdlcy5saXN0KCkudGhlbihkYXRhID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGFsbFBhY2thZ2VzID0gZGF0YS5qc29uKCkucGFja2FnZXM7XG4gICAgICAgICAgICBzZWxmLnBhY2thZ2VUYWJsZS5wYXJzZShtYXBEYXRhKGFsbFBhY2thZ2VzKSk7XG4gICAgICAgIH0pO1xuXG5cbiAgICB9XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zb3VyY2VzL3ZpZXdzL3BhY2thZ2VzL2luZGV4LmpzIiwiaW1wb3J0IHsgSmV0VmlldyB9IGZyb20gXCJ3ZWJpeC1qZXRcIjtcblxuaW1wb3J0IEFkbWluc1ZpZXcgZnJvbSBcIi4vYWRtaW5zXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFNldHRpbmdzVmlldyBleHRlbmRzIEpldFZpZXcge1xuICAgIGNvbmZpZygpIHtcbiAgICAgICAgY29uc3QgdmlldyA9IHtcbiAgICAgICAgICAgIHZpZXc6IFwidGFidmlld1wiLFxuICAgICAgICAgICAgY2VsbHM6IFt7XG4gICAgICAgICAgICAgICAgaGVhZGVyOiBcIkFkbWluaXN0cmF0b3JzXCIsXG4gICAgICAgICAgICAgICAgYm9keTogQWRtaW5zVmlld1xuICAgICAgICAgICAgfV1cbiAgICAgICAgfTtcblxuICAgICAgICByZXR1cm4gdmlldztcbiAgICB9XG5cbiAgICBpbml0KHZpZXcpIHtcbiAgICB9XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zb3VyY2VzL3ZpZXdzL3NldHRpbmdzL2luZGV4LmpzIiwiaW1wb3J0IHsgRXh0ZXJuYWxWaWV3IH0gZnJvbSBcIi4uL2V4dGVybmFsXCI7XG5cbmNvbnN0IFdJS0lTX1VSTCA9IFwiL3dpa2lcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgV2lraXNWaWV3IGV4dGVuZHMgRXh0ZXJuYWxWaWV3IHtcbiAgICBjb25zdHJ1Y3RvcihhcHAsIG5hbWUpIHtcbiAgICAgICAgc3VwZXIoYXBwLCBuYW1lLCBXSUtJU19VUkwpO1xuICAgIH1cbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NvdXJjZXMvdmlld3Mvd2lraXMvaW5kZXguanMiLCJpbXBvcnQgeyBKZXRWaWV3IH0gZnJvbSBcIndlYml4LWpldFwiO1xuXG5pbXBvcnQgeyBkYXRlRm9ybWF0dGVyIH0gZnJvbSBcIi4uLy4uL2NvbW1vbi9mb3JtYXR0ZXJzXCI7XG5pbXBvcnQgeyBteWpvYnMgfSBmcm9tIFwiLi4vLi4vc2VydmljZXMvbXlqb2JzXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEpvYnNWaWV3IGV4dGVuZHMgSmV0VmlldyB7XG4gICAgY29uZmlnKCkge1xuICAgICAgICBjb25zdCB2aWV3ID0ge1xuICAgICAgICAgICAgdmlldzogXCJkYXRhdGFibGVcIixcbiAgICAgICAgICAgIGlkOiBcIndvcmtlcnNfdGFibGVcIixcbiAgICAgICAgICAgIHJlc2l6ZUNvbHVtbjogdHJ1ZSxcbiAgICAgICAgICAgIHNlbGVjdDogdHJ1ZSxcbiAgICAgICAgICAgIG11bHRpc2VsZWN0OiB0cnVlLFxuICAgICAgICAgICAgY3NzOiBcIndlYml4X2hlYWRlcl9ib3JkZXIgd2ViaXhfZGF0YV9ib3JkZXJcIixcbiAgICAgICAgICAgIGNvbHVtbnM6IFt7XG4gICAgICAgICAgICAgICAgaWQ6IFwiaW5kZXhcIixcbiAgICAgICAgICAgICAgICBoZWFkZXI6IFwiI1wiLFxuICAgICAgICAgICAgICAgIHNvcnQ6IFwiaW50XCIsXG4gICAgICAgICAgICAgICAgYXV0b3dpZHRoOiB0cnVlLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBpZDogXCJzdGF0ZVwiLFxuICAgICAgICAgICAgICAgIGhlYWRlcjogXCJTdGF0ZVwiLFxuICAgICAgICAgICAgICAgIHNvcnQ6IFwic3RyaW5nXCJcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgaWQ6IFwiaGFsdFwiLFxuICAgICAgICAgICAgICAgIGhlYWRlcjogXCJIYWx0ZWRcIixcbiAgICAgICAgICAgICAgICBzb3J0OiBcInN0cmluZ1wiLFxuICAgICAgICAgICAgICAgIGZvcm1hdDogZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB2YWx1ZSA/ICdZZXMnIDogJ05vJztcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBpZDogXCJwaWRcIixcbiAgICAgICAgICAgICAgICBoZWFkZXI6IFwiUElEXCIsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGlkOiBcImN1cnJlbnRfam9iXCIsXG4gICAgICAgICAgICAgICAgaGVhZGVyOiBcIkN1cnJlbnQgam9iXCIsXG4gICAgICAgICAgICAgICAgZm9ybWF0OiBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHZhbHVlID09IDIxNDc0ODM2NDcgPyAnTi9BJyA6IHZhbHVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgaWQ6IFwibGFzdF91cGRhdGVcIixcbiAgICAgICAgICAgICAgICBoZWFkZXI6IFwiTGFzdCB1cGRhdGVcIixcbiAgICAgICAgICAgICAgICBzb3J0OiBcImRhdGVcIixcbiAgICAgICAgICAgICAgICBmb3JtYXQ6IGRhdGVGb3JtYXR0ZXIsXG4gICAgICAgICAgICAgICAgd2lkdGg6IDIwMFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBpZDogXCJ0aW1lX3N0YXJ0XCIsXG4gICAgICAgICAgICAgICAgaGVhZGVyOiBcIlN0YXJ0IHRpbWVcIixcbiAgICAgICAgICAgICAgICBzb3J0OiBcImRhdGVcIixcbiAgICAgICAgICAgICAgICBmb3JtYXQ6IGRhdGVGb3JtYXR0ZXIsXG4gICAgICAgICAgICAgICAgd2lkdGg6IDIwMFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBpZDogXCJ0aW1lb3V0XCIsXG4gICAgICAgICAgICAgICAgaGVhZGVyOiBcIlRpbWVvdXRcIixcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgaWQ6IFwidHlwZVwiLFxuICAgICAgICAgICAgICAgIGhlYWRlcjogXCJUeXBlXCIsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGlkOiBcImVycm9yXCIsXG4gICAgICAgICAgICAgICAgaGVhZGVyOiBcIkVycm9yXCIsXG4gICAgICAgICAgICB9XSxcbiAgICAgICAgICAgIGF1dG9Db25maWc6IHRydWUsXG4gICAgICAgICAgICBzY2hlbWU6IHtcbiAgICAgICAgICAgICAgICAkaW5pdDogZnVuY3Rpb24gKG9iaikge1xuICAgICAgICAgICAgICAgICAgICBvYmouaW5kZXggPSB0aGlzLmNvdW50KCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgfTtcblxuICAgICAgICByZXR1cm4gdmlldztcbiAgICB9XG5cbiAgICBpbml0KHZpZXcpIHtcbiAgICAgICAgbXlqb2JzLmxpc3RXb3JrZXJzKCkudGhlbihkYXRhID0+IHtcbiAgICAgICAgICAgIHZpZXcucGFyc2UoZGF0YSk7XG4gICAgICAgIH0pO1xuXG4gICAgfVxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc291cmNlcy92aWV3cy93b3JrZXJzL2luZGV4LmpzIiwiaW1wb3J0IEFuc2lVcCBmcm9tIFwiYW5zaV91cFwiO1xuXG5leHBvcnQgY29uc3QgYW5zaVVwID0gbmV3IEFuc2lVcCgpO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc291cmNlcy9jb21tb24vY29sb3JzLmpzIiwiaW1wb3J0IHsgSmV0VmlldyB9IGZyb20gXCJ3ZWJpeC1qZXRcIjtcblxuaW1wb3J0IHsgYW5zaVVwIH0gZnJvbSBcIi4uLy4uL2NvbW1vbi9jb2xvcnNcIjtcbmltcG9ydCB7IExFVkVMUywgU1RBVEVTLCBUWVBFUyB9IGZyb20gXCIuL2RhdGFcIjtcbmltcG9ydCB7IGRhdGVGb3JtYXR0ZXIgfSBmcm9tIFwiLi4vLi4vY29tbW9uL2Zvcm1hdHRlcnNcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQWxlcnRWaWV3IGV4dGVuZHMgSmV0VmlldyB7XG4gICAgY29uZmlnKCkge1xuICAgICAgICBjb25zdCBpbmZvID0ge1xuICAgICAgICAgICAgdmlldzogXCJmb3JtXCIsXG4gICAgICAgICAgICBpZDogXCJmb3JtXCIsXG4gICAgICAgICAgICBlbGVtZW50c0NvbmZpZzogeyBsYWJlbFdpZHRoOiAxNDAgfSxcbiAgICAgICAgICAgIGVsZW1lbnRzOiBbXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICB2aWV3OiBcInRleHRcIixcbiAgICAgICAgICAgICAgICAgICAgbGFiZWw6IFwiSURcIixcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJpZGVudGlmaWVyXCIsXG4gICAgICAgICAgICAgICAgICAgIHJlYWRvbmx5OiB0cnVlXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIHZpZXc6IFwidGV4dFwiLFxuICAgICAgICAgICAgICAgICAgICBsYWJlbDogXCJUeXBlXCIsXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiYWxlcnRfdHlwZVwiLFxuICAgICAgICAgICAgICAgICAgICByZWFkb25seTogdHJ1ZVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICB2aWV3OiBcInRleHRcIixcbiAgICAgICAgICAgICAgICAgICAgbGFiZWw6IFwiU3RhdHVzXCIsXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwic3RhdHVzXCIsXG4gICAgICAgICAgICAgICAgICAgIHJlYWRvbmx5OiB0cnVlXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIHZpZXc6IFwidGV4dFwiLFxuICAgICAgICAgICAgICAgICAgICBsYWJlbDogXCJMZXZlbFwiLFxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImxldmVsXCIsXG4gICAgICAgICAgICAgICAgICAgIHJlYWRvbmx5OiB0cnVlXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIHZpZXc6IFwidGV4dFwiLFxuICAgICAgICAgICAgICAgICAgICBsYWJlbDogXCJDb3VudFwiLFxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImNvdW50XCIsXG4gICAgICAgICAgICAgICAgICAgIHJlYWRvbmx5OiB0cnVlXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIHZpZXc6IFwidGV4dFwiLFxuICAgICAgICAgICAgICAgICAgICBsYWJlbDogXCJDYXRlZ29yeVwiLFxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImNhdFwiLFxuICAgICAgICAgICAgICAgICAgICByZWFkb25seTogdHJ1ZVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICB2aWV3OiBcInRleHRcIixcbiAgICAgICAgICAgICAgICAgICAgbGFiZWw6IFwiRmlyc3QgdGltZVwiLFxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcInRpbWVfZmlyc3RcIixcbiAgICAgICAgICAgICAgICAgICAgcmVhZG9ubHk6IHRydWVcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgdmlldzogXCJ0ZXh0XCIsXG4gICAgICAgICAgICAgICAgICAgIGxhYmVsOiBcIkxhc3QgdGltZVwiLFxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcInRpbWVfbGFzdFwiLFxuICAgICAgICAgICAgICAgICAgICByZWFkb25seTogdHJ1ZVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICB2aWV3OiBcInRleHRcIixcbiAgICAgICAgICAgICAgICAgICAgbGFiZWw6IFwiTWVzc2FnZSAocHViKVwiLFxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcInB1YmxpY1wiLFxuICAgICAgICAgICAgICAgICAgICByZWFkb25seTogdHJ1ZSxcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgXVxuICAgICAgICB9O1xuXG4gICAgICAgIGNvbnN0IHRhYiA9IHtcbiAgICAgICAgICAgIHZpZXc6IFwidGFidmlld1wiLFxuICAgICAgICAgICAgY2VsbHM6IFtcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIGhlYWRlcjogXCJJbmZvcm1hdGlvblwiLFxuICAgICAgICAgICAgICAgICAgICBib2R5OiBpbmZvLFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBoZWFkZXI6IFwiTWVzc2FnZVwiLFxuICAgICAgICAgICAgICAgICAgICBib2R5OiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZDogXCJtZXNzYWdlXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICB2aWV3OiBcInRlbXBsYXRlXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICB0ZW1wbGF0ZTogXCJcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIHNjcm9sbDogXCJhdXRvXCIsXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgaGVhZGVyOiBcIlRyYWNlYmFja3NcIixcbiAgICAgICAgICAgICAgICAgICAgYm9keToge1xuICAgICAgICAgICAgICAgICAgICAgICAgcm93czogW1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmlldzogXCJ0YWJiYXJcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWQ6IFwidGJfdGFic1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtdWx0aXZpZXc6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9wdGlvbnM6IFtdXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZpZXc6IFwibXVsdGl2aWV3XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlkOiBcInRiX3ZpZXdzXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNlbGxzOiBbXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGVtcGxhdGU6IFwiXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBpZDogXCJsb2dzXCIsXG4gICAgICAgICAgICAgICAgICAgIHZpZXc6IFwiZGF0YXRhYmxlXCIsXG4gICAgICAgICAgICAgICAgICAgIHJlc2l6ZUNvbHVtbjogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgc2VsZWN0OiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICBtdWx0aXNlbGVjdDogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgY3NzOiBcIndlYml4X2hlYWRlcl9ib3JkZXIgd2ViaXhfZGF0YV9ib3JkZXJcIixcbiAgICAgICAgICAgICAgICAgICAgc2Nyb2xsOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICBhdXRvQ29uZmlnOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICBjb2x1bW5zOiBbXG4gICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWQ6IFwiaW5kZXhcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBoZWFkZXI6IFwiI1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNvcnQ6IFwiaW50XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYXV0b3dpZHRoOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdpZHRoOiA2MFxuICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZDogXCJ0aHJlZWJvdF9uYW1lXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaGVhZGVyOiBcIlRocmVlYm90IE5hbWVcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzb3J0OiBcInN0cmluZ1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdpZHRoOiAxODBcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWQ6IFwiYXBwX25hbWVcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBoZWFkZXI6IFwiQXBwIE5hbWVcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzb3J0OiBcInN0cmluZ1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdpZHRoOiAxODBcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWQ6IFwibGF0ZXN0X2xvZ2lkXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaGVhZGVyOiBcIkxhdGVzdCBMb2cjXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc29ydDogXCJpbnRcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aWR0aDogMTgwXG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgICAgIHNjaGVtZToge1xuICAgICAgICAgICAgICAgICAgICAgICAgJGluaXQ6IGZ1bmN0aW9uIChvYmopIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvYmouaW5kZXggPSB0aGlzLmNvdW50KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgXVxuICAgICAgICB9O1xuXG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICB2aWV3OiBcIndpbmRvd1wiLFxuICAgICAgICAgICAgaGVhZDogXCJBbGVydFwiLFxuICAgICAgICAgICAgbW9kYWw6IHRydWUsXG4gICAgICAgICAgICB3aWR0aDogNjAwLFxuICAgICAgICAgICAgaGVpZ2h0OiA4MDAsXG4gICAgICAgICAgICBwb3NpdGlvbjogXCJjZW50ZXJcIixcbiAgICAgICAgICAgIGJvZHk6IHtcbiAgICAgICAgICAgICAgICByb3dzOiBbXG4gICAgICAgICAgICAgICAgICAgIHRhYixcbiAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmlldzogXCJidXR0b25cIixcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlOiBcIk9LXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBjc3M6IFwid2ViaXhfcHJpbWFyeVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgY2xpY2s6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmdldFRvcFBhcmVudFZpZXcoKS5oaWRlKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cblxuICAgIGluaXQoKSB7XG4gICAgICAgIHZhciBzZWxmID0gdGhpcztcbiAgICAgICAgdGhpcy5mb3JtID0gJCQoXCJmb3JtXCIpO1xuICAgICAgICB0aGlzLm1lc3NhZ2UgPSAkJChcIm1lc3NhZ2VcIik7XG4gICAgICAgIHRoaXMubG9ncyA9ICQkKFwibG9nc1wiKTtcblxuICAgICAgICB0aGlzLnRiVmlld3MgPSAkJChcInRiX3ZpZXdzXCIpO1xuICAgICAgICB0aGlzLnRiVGFicyA9ICQkKFwidGJfdGFic1wiKTtcblxuICAgICAgICB0aGlzLmxvZ3MuYXR0YWNoRXZlbnQoXCJvbkl0ZW1EYmxDbGlja1wiLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBsZXQgbG9nRGF0YSA9IHNlbGYubG9ncy5nZXRTZWxlY3RlZEl0ZW0oKVxuICAgICAgICAgICAgdGhpcy4kc2NvcGUuc2hvdyhgL21haW4vbG9ncz9hcHBuYW1lPSR7bG9nRGF0YS5hcHBfbmFtZX0mbG9naWQ9JHtsb2dEYXRhLmxhdGVzdF9sb2dpZH1gKVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBhZGRUcmFjZWJhY2sodGIpIHtcbiAgICAgICAgY29uc3QgdGJJZCA9IGAke3RiLnRocmVlYm90X25hbWV9XyR7dGIucHJvY2Vzc19pZH1gO1xuICAgICAgICBjb25zdCB0YlRpdGxlID0gYCR7dGIudGhyZWVib3RfbmFtZX0gLSBQSUQ6ICgke3RiLnByb2Nlc3NfaWR9KWA7XG5cbiAgICAgICAgdGhpcy50YlZpZXdzLmFkZFZpZXcoe1xuICAgICAgICAgICAgdmlldzogXCJ0ZW1wbGF0ZVwiLFxuICAgICAgICAgICAgaWQ6IHRiSWQsXG4gICAgICAgICAgICBzY3JvbGw6IFwieHlcIixcbiAgICAgICAgICAgIHRlbXBsYXRlOiBgPHA+JHthbnNpVXAuYW5zaV90b19odG1sKHRiLmZvcm1hdHRlZCl9PC9wPmBcbiAgICAgICAgfSk7XG5cbiAgICAgICAgdGhpcy50YlRhYnMuYWRkT3B0aW9uKHRiSWQsIHRiVGl0bGUsIHRydWUpO1xuICAgIH1cblxuICAgIGNsZWFyVHJhY2VCYWNrcygpIHtcbiAgICAgICAgbGV0IGlkID0gdGhpcy50YlRhYnMuZ2V0VmFsdWUoKTtcblxuICAgICAgICB3aGlsZSAoaWQpIHtcbiAgICAgICAgICAgIHRoaXMudGJUYWJzLnJlbW92ZU9wdGlvbihpZCk7XG4gICAgICAgICAgICB0aGlzLnRiVmlld3MucmVtb3ZlVmlldyhpZCk7XG5cbiAgICAgICAgICAgIGlkID0gdGhpcy50YlRhYnMuZ2V0VmFsdWUoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHNob3dGb3IoaXRlbSkge1xuICAgICAgICBsZXQgdmFsdWVzID0gT2JqZWN0LmFzc2lnbih7fSwgaXRlbSk7XG5cbiAgICAgICAgdmFsdWVzLmFsZXJ0X3R5cGUgPSBUWVBFU1tpdGVtLmFsZXJ0X3R5cGVdO1xuICAgICAgICB2YWx1ZXMuc3RhdHVzID0gU1RBVEVTW2l0ZW0uc3RhdHVzXTtcbiAgICAgICAgdmFsdWVzLmxldmVsID0gTEVWRUxTW2l0ZW0ubGV2ZWxdO1xuICAgICAgICB2YWx1ZXMudGltZV9maXJzdCA9IGRhdGVGb3JtYXR0ZXIoaXRlbS50aW1lX2ZpcnN0KTtcbiAgICAgICAgdmFsdWVzLnRpbWVfbGFzdCA9IGRhdGVGb3JtYXR0ZXIoaXRlbS50aW1lX2xhc3QpO1xuICAgICAgICB0aGlzLmZvcm0uc2V0VmFsdWVzKHZhbHVlcyk7XG5cbiAgICAgICAgdGhpcy5tZXNzYWdlLnNldEhUTUwoYDxwPiR7YW5zaVVwLmFuc2lfdG9faHRtbChpdGVtLm1lc3NhZ2UpfTwvcD5gKTtcblxuICAgICAgICB0aGlzLmNsZWFyVHJhY2VCYWNrcygpO1xuXG4gICAgICAgIGZvciAobGV0IHRiIG9mIGl0ZW0udHJhY2ViYWNrcykge1xuICAgICAgICAgICAgdGhpcy5hZGRUcmFjZWJhY2sodGIpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5sb2dzLmNsZWFyQWxsKClcbiAgICAgICAgdGhpcy5sb2dzLnBhcnNlKGl0ZW0ubG9ncyk7XG5cbiAgICAgICAgdGhpcy5nZXRSb290KCkuc2hvdygpO1xuICAgIH1cbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NvdXJjZXMvdmlld3MvYWxlcnRzL2FsZXJ0LmpzIiwiaW1wb3J0IHsgSmV0VmlldyB9IGZyb20gXCJ3ZWJpeC1qZXRcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUHJvY2Vzc2VzQ2hpbGRWaWV3IGV4dGVuZHMgSmV0VmlldyB7XG5cbiAgICBjb25maWcoKSB7XG4gICAgICAgIGNvbnN0IHZpZXcgPSB7XG4gICAgICAgICAgICB2aWV3OiBcImRhdGF0YWJsZVwiLFxuICAgICAgICAgICAgaWQ6IFwicHJvY2Vzc190YWJsZVwiLFxuICAgICAgICAgICAgcmVzaXplQ29sdW1uOiB0cnVlLFxuICAgICAgICAgICAgc2VsZWN0OiB0cnVlLFxuICAgICAgICAgICAgbXVsdGlzZWxlY3Q6IHRydWUsXG4gICAgICAgICAgICBjc3M6IFwid2ViaXhfaGVhZGVyX2JvcmRlciB3ZWJpeF9kYXRhX2JvcmRlclwiLFxuICAgICAgICAgICAgc2Nyb2xsOiB0cnVlLFxuICAgICAgICAgICAgYXV0b0NvbmZpZzogdHJ1ZSxcbiAgICAgICAgICAgIGNvbHVtbnM6IFtcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIGlkOiBcImluZGV4XCIsXG4gICAgICAgICAgICAgICAgICAgIGhlYWRlcjogXCIjXCIsXG4gICAgICAgICAgICAgICAgICAgIHNvcnQ6IFwiaW50XCIsXG4gICAgICAgICAgICAgICAgICAgIGF1dG93aWR0aDogdHJ1ZSxcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgaWQ6IFwibmFtZVwiLFxuICAgICAgICAgICAgICAgICAgICBoZWFkZXI6IFtcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiUHJvY2Nlc3NcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb250ZW50OiBcInRleHRGaWx0ZXJcIlxuICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICAgICAgc29ydDogXCJzdHJpbmdcIixcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgaWQ6IFwicGlkXCIsXG4gICAgICAgICAgICAgICAgICAgIGhlYWRlcjogXCJQSURcIixcbiAgICAgICAgICAgICAgICAgICAgc29ydDogXCJpbnRcIlxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBpZDogXCJ1c2VybmFtZVwiLFxuICAgICAgICAgICAgICAgICAgICBoZWFkZXI6IFwiVXNlcm5hbWVcIixcbiAgICAgICAgICAgICAgICAgICAgc29ydDogXCJzdHJpbmdcIlxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBpZDogXCJ2bXNcIixcbiAgICAgICAgICAgICAgICAgICAgaGVhZGVyOiBcIk1lbW9yeSBVc2FnZVwiLFxuICAgICAgICAgICAgICAgICAgICBzb3J0OiBcImludFwiLFxuICAgICAgICAgICAgICAgICAgICBmb3JtYXQ6IGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIE1hdGguY2VpbCh2YWx1ZSlcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBdLFxuICAgICAgICAgICAgc2NoZW1lOiB7XG4gICAgICAgICAgICAgICAgJGluaXQ6IGZ1bmN0aW9uIChvYmopIHtcbiAgICAgICAgICAgICAgICAgICAgb2JqLmluZGV4ID0gdGhpcy5jb3VudCgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgdmlldzogXCJ3aW5kb3dcIixcbiAgICAgICAgICAgIGhlYWQ6IFwiUnVubmluZyBQcm9jZXNzZXMsIE1lbW9yeSB1c2FnZSBpbiBNQlwiLFxuICAgICAgICAgICAgbW9kYWw6IHRydWUsXG4gICAgICAgICAgICB3aWR0aDogNTUwLFxuICAgICAgICAgICAgaGVpZ2h0OiA2MDAsXG4gICAgICAgICAgICBwb3NpdGlvbjogXCJjZW50ZXJcIixcbiAgICAgICAgICAgIGJvZHk6IHtcbiAgICAgICAgICAgICAgICByb3dzOiBbXG4gICAgICAgICAgICAgICAgICAgIHZpZXcsXG4gICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZpZXc6IFwiYnV0dG9uXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZTogXCJPS1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgY3NzOiBcIndlYml4X3ByaW1hcnlcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIGNsaWNrOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5nZXRUb3BQYXJlbnRWaWV3KCkuaGlkZSgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgfVxuXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBzaG93Rm9yKGRhdGEpIHtcbiAgICAgICAgdGhpcy50YWJsZS5wYXJzZShkYXRhKVxuICAgICAgICB0aGlzLmdldFJvb3QoKS5zaG93KCk7XG4gICAgfVxuXG4gICAgaW5pdCgpIHtcbiAgICAgICAgdGhpcy50YWJsZSA9ICQkKFwicHJvY2Vzc190YWJsZVwiKTtcbiAgICB9XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zb3VyY2VzL3ZpZXdzL2Rhc2gvcHJvY2Vzc2VzQ2hpbGRWaWV3LmpzIiwiaW1wb3J0IHsgSmV0VmlldyB9IGZyb20gXCJ3ZWJpeC1qZXRcIjtcblxuaW1wb3J0IHsgYW5zaVVwIH0gZnJvbSBcIi4uLy4uL2NvbW1vbi9jb2xvcnNcIjtcblxuZXhwb3J0IGNsYXNzIEVycm9yVmlldyBleHRlbmRzIEpldFZpZXcge1xuICAgIGNvbmZpZygpIHtcbiAgICAgICAgY29uc3QgbWVzc2FnZSA9IHtcbiAgICAgICAgICAgIHZpZXc6IFwidGVtcGxhdGVcIixcbiAgICAgICAgICAgIGlkOiBcImVycm9yX3RlbXBsYXRlXCIsXG4gICAgICAgICAgICB0ZW1wbGF0ZTogXCJcIixcbiAgICAgICAgICAgIHNjcm9sbDogXCJ4eVwiXG4gICAgICAgIH07XG5cbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHZpZXc6IFwid2luZG93XCIsXG4gICAgICAgICAgICBoZWFkOiBcIkVycm9yXCIsXG4gICAgICAgICAgICBtb2RhbDogdHJ1ZSxcbiAgICAgICAgICAgIHdpZHRoOiA1MDAsXG4gICAgICAgICAgICBoZWlnaHQ6IDYwMCxcbiAgICAgICAgICAgIHBvc2l0aW9uOiBcImNlbnRlclwiLFxuICAgICAgICAgICAgYm9keToge1xuICAgICAgICAgICAgICAgIHJvd3M6IFtcbiAgICAgICAgICAgICAgICAgICAgbWVzc2FnZSxcbiAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmlldzogXCJidXR0b25cIixcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlOiBcIk9LXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBjc3M6IFwid2ViaXhfcHJpbWFyeVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgY2xpY2s6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmdldFRvcFBhcmVudFZpZXcoKS5oaWRlKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBpbml0KCkge1xuICAgICAgICB0aGlzLm1lc3NhZ2UgPSAkJChcImVycm9yX3RlbXBsYXRlXCIpO1xuICAgIH1cblxuICAgIHNob3dFcnJvcihtZXNzYWdlLCBoZWFkKSB7XG4gICAgICAgIHRoaXMubWVzc2FnZS5zZXRIVE1MKGA8cD4ke2Fuc2lVcC5hbnNpX3RvX2h0bWwobWVzc2FnZSl9PC9wPmApO1xuICAgICAgICBpZiAoaGVhZCkge1xuICAgICAgICAgICAgdGhpcy5tZXNzYWdlLmdldEhlYWQoKS5zZXRIVE1MKGhlYWQpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5nZXRSb290KCkuc2hvdygpO1xuICAgIH1cbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NvdXJjZXMvdmlld3MvZXJyb3JzL2RpYWxvZy5qcyIsImltcG9ydCB7IEpldFZpZXcgfSBmcm9tIFwid2ViaXgtamV0XCI7XG5cbmltcG9ydCB7IGRhdGVGb3JtYXR0ZXIgfSBmcm9tIFwiLi4vLi4vY29tbW9uL2Zvcm1hdHRlcnNcIjtcbmltcG9ydCB7IExFVkVMUyB9IGZyb20gXCIuLi9hbGVydHMvZGF0YVwiO1xuaW1wb3J0IHsgY3JlYXRlRmlsdGVyT3B0aW9ucyB9IGZyb20gXCIuLi8uLi9jb21tb24vZmlsdGVyc1wiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBBcHBMb2dzVmlldyBleHRlbmRzIEpldFZpZXcge1xuICAgIGNvbmZpZygpIHtcbiAgICAgICAgdmFyIHBhZ2VyID0ge1xuICAgICAgICAgICAgdmlldzogXCJwYWdlclwiLFxuICAgICAgICAgICAgaWQ6IFwicGFnZXJcIixcbiAgICAgICAgICAgIHNpemU6IDEwMCxcbiAgICAgICAgICAgIGdyb3VwOiAyMFxuICAgICAgICB9O1xuICAgICAgICBjb25zdCBhcHBsb2dzID0ge1xuICAgICAgICAgICAgdmlldzogXCJkYXRhdGFibGVcIixcbiAgICAgICAgICAgIGlkOiBcImFwcGxvZ3NfdGFibGVcIixcbiAgICAgICAgICAgIHBhZ2VyOiBcInBhZ2VyXCIsXG4gICAgICAgICAgICByZXNpemVDb2x1bW46IHRydWUsXG4gICAgICAgICAgICBzZWxlY3Q6IHRydWUsXG4gICAgICAgICAgICBtdWx0aXNlbGVjdDogdHJ1ZSxcbiAgICAgICAgICAgIGNzczogXCJ3ZWJpeF9oZWFkZXJfYm9yZGVyIHdlYml4X2RhdGFfYm9yZGVyXCIsXG4gICAgICAgICAgICBzY3JvbGw6IHRydWUsXG4gICAgICAgICAgICBhdXRvQ29uZmlnOiB0cnVlLFxuICAgICAgICAgICAgb246IHtcbiAgICAgICAgICAgICAgICBvbkFmdGVyTG9hZDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnNvcnQoXCJlcG9jaFwiLCBcImRlc1wiKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5tYXJrU29ydGluZyhcImVwb2NoXCIsIFwiZGVzXCIpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG5cbiAgICAgICAgICAgIGNvbHVtbnM6IFt7XG4gICAgICAgICAgICAgICAgaWQ6IFwiaWRcIixcbiAgICAgICAgICAgICAgICBoZWFkZXI6IFtcbiAgICAgICAgICAgICAgICAgICAgXCJMb2cjXCIsXG4gICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRlbnQ6IFwidGV4dEZpbHRlclwiXG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICBzb3J0OiBcImludFwiLFxuICAgICAgICAgICAgICAgIHdpZHRoOiA1MCxcbiAgICAgICAgICAgICAgICBhdXRvd2lkdGg6IHRydWUsXG4gICAgICAgICAgICB9LFxuXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgaWQ6IFwiZmlsZXBhdGhcIixcbiAgICAgICAgICAgICAgICBoZWFkZXI6IFtcbiAgICAgICAgICAgICAgICAgICAgXCJQYXRoXCIsXG4gICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRlbnQ6IFwidGV4dEZpbHRlclwiXG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICBzb3J0OiBcInN0cmluZ1wiLFxuICAgICAgICAgICAgICAgIGF1dG93aWR0aDogdHJ1ZSxcbiAgICAgICAgICAgICAgICB3aWR0aDogMTQwXG4gICAgICAgICAgICB9LFxuXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgaWQ6IFwibGluZW5yXCIsXG4gICAgICAgICAgICAgICAgaGVhZGVyOiBbXG4gICAgICAgICAgICAgICAgICAgIFwiTGluZS5uclwiLFxuICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb250ZW50OiBcInRleHRGaWx0ZXJcIlxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgc29ydDogXCJpbnRcIixcbiAgICAgICAgICAgICAgICBhdXRvd2lkdGg6IHRydWUsXG4gICAgICAgICAgICAgICAgd2lkdGg6IDYwXG4gICAgICAgICAgICB9LFxuXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgaWQ6IFwiY29udGV4dFwiLFxuICAgICAgICAgICAgICAgIGhlYWRlcjogW1xuICAgICAgICAgICAgICAgICAgICBcIkNvbnRleHRcIixcbiAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29udGVudDogXCJ0ZXh0RmlsdGVyXCJcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgIHNvcnQ6IFwic3RyaW5nXCJcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgaWQ6IFwibWVzc2FnZVwiLFxuICAgICAgICAgICAgICAgIGhlYWRlcjogW1xuICAgICAgICAgICAgICAgICAgICBcIk1lc3NhZ2VcIixcbiAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29udGVudDogXCJ0ZXh0RmlsdGVyXCJcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgIHNvcnQ6IFwic3RyaW5nXCIsXG4gICAgICAgICAgICAgICAgd2lkdGg6IDUwMCxcbiAgICAgICAgICAgICAgICBhdXRvd2lkdGg6IHRydWVcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgaWQ6IFwibGV2ZWxcIixcbiAgICAgICAgICAgICAgICBoZWFkZXI6IFtcbiAgICAgICAgICAgICAgICAgICAgXCJMZXZlbFwiLFxuICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb250ZW50OiBcInNlbGVjdEZpbHRlclwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgb3B0aW9uczogY3JlYXRlRmlsdGVyT3B0aW9ucyhMRVZFTFMpXG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICBzb3J0OiBcImludFwiLFxuICAgICAgICAgICAgICAgIGZvcm1hdDogKHZhbHVlKSA9PiBMRVZFTFNbdmFsdWVdLFxuICAgICAgICAgICAgICAgIHdpZHRoOiAxMDBcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgaWQ6IFwiZXBvY2hcIixcbiAgICAgICAgICAgICAgICBoZWFkZXI6IFtcbiAgICAgICAgICAgICAgICAgICAgXCJUaW1lXCIsXG4gICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRlbnQ6IFwidGV4dEZpbHRlclwiXG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICBzb3J0OiBcImRhdGVcIixcbiAgICAgICAgICAgICAgICBmb3JtYXQ6IGRhdGVGb3JtYXR0ZXIsXG4gICAgICAgICAgICAgICAgd2lkdGg6IDEzMFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBpZDogXCJwcm9jZXNzaWRcIixcbiAgICAgICAgICAgICAgICBoZWFkZXI6IFtcbiAgICAgICAgICAgICAgICAgICAgXCJQSURcIixcbiAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29udGVudDogXCJ0ZXh0RmlsdGVyXCJcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgIHNvcnQ6IFwiaW50XCIsXG4gICAgICAgICAgICAgICAgd2lkdGg6IDYwXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGlkOiBcImNhdFwiLFxuICAgICAgICAgICAgICAgIGhlYWRlcjogW1xuICAgICAgICAgICAgICAgICAgICBcIkNhdGVnb3J5XCIsXG4gICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRlbnQ6IFwidGV4dEZpbHRlclwiXG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICBzb3J0OiBcInN0cmluZ1wiLFxuICAgICAgICAgICAgICAgIHdpZHRoOiA4MFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBpZDogXCJkYXRhXCIsXG4gICAgICAgICAgICAgICAgaGVhZGVyOiBbXG4gICAgICAgICAgICAgICAgICAgIFwiRGF0YVwiLFxuICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb250ZW50OiBcInRleHRGaWx0ZXJcIlxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgc29ydDogXCJzdHJpbmdcIlxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBdLFxuXG4gICAgICAgIH1cblxuXG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICByb3dzOiBbXG4gICAgICAgICAgICAgICAgYXBwbG9ncyxcbiAgICAgICAgICAgICAgICBwYWdlclxuICAgICAgICAgICAgXVxuICAgICAgICB9XG4gICAgfVxuXG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zb3VyY2VzL3ZpZXdzL2xvZ3MvYXBwTG9ncy5qcyIsImltcG9ydCB7IEpldFZpZXcgfSBmcm9tIFwid2ViaXgtamV0XCI7XG5cbmltcG9ydCB7IGlucHV0RGlhbG9nIH0gZnJvbSBcIi4uLy4uL2NvbW1vbi9kaWFsb2dzXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEFkbWluc1ZpZXcgZXh0ZW5kcyBKZXRWaWV3IHtcbiAgICBjb25maWcoKSB7XG4gICAgICAgIHZhciBzZWxmID0gdGhpcztcblxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgY29sczogW3tcbiAgICAgICAgICAgICAgICByb3dzOiBbe1xuICAgICAgICAgICAgICAgICAgICB2aWV3OiBcInRlbXBsYXRlXCIsXG4gICAgICAgICAgICAgICAgICAgIHRlbXBsYXRlOiBcIkFsbCBvZiB0aGUgZm9sbG93aW5nIDNCb3QgbmFtZXMgY2FuIGFjY2VzcyBkYXNoYm9hcmQsIHlvdSBjYW4gYWRkIG9yIHJlbW92ZSB0aGVtIGZyb20gaGVyZVwiLFxuICAgICAgICAgICAgICAgICAgICBhdXRvaGVpZ2h0OiB0cnVlLFxuICAgICAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICAgICAgbG9jYWxJZDogXCJhZGQtYWRtaW5cIixcbiAgICAgICAgICAgICAgICAgICAgdmlldzogXCJidXR0b25cIixcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU6IFwiQWRkIG5ldyBhZG1pbmlzdHJhdG9yXCIsXG4gICAgICAgICAgICAgICAgICAgIGNsaWNrOiBzZWxmLmFkZEFkbWluLmJpbmQoc2VsZiksXG4gICAgICAgICAgICAgICAgfV1cbiAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICBsb2NhbElkOiBcImFkbWlucy10YWJsZVwiLFxuICAgICAgICAgICAgICAgIHZpZXc6IFwiZGF0YXRhYmxlXCIsXG4gICAgICAgICAgICAgICAgYXV0b2hlaWdodDogdHJ1ZSxcbiAgICAgICAgICAgICAgICBjb2x1bW5zOiBbe1xuICAgICAgICAgICAgICAgICAgICBpZDogXCJuYW1lXCIsXG4gICAgICAgICAgICAgICAgICAgIGhlYWRlcjogW1xuICAgICAgICAgICAgICAgICAgICAgICAgXCJOYW1lXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29udGVudDogXCJ0ZXh0RmlsdGVyXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICAgICAgc29ydDogXCJzdHJpbmdcIixcbiAgICAgICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgICAgIHRlbXBsYXRlOiBmdW5jdGlvbiAob2JqKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gXCI8c3BhbiBjbGFzcz0nd2ViaXhfaWNvbiBtZGkgbWRpLXRyYXNoLWNhbiB3ZWJpeF9kYW5nZXIgZGVsZXRlX2FkbWluJz48L3NwYW4+XCI7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XSxcbiAgICAgICAgICAgICAgICBvbkNsaWNrOiB7XG4gICAgICAgICAgICAgICAgICAgIGRlbGV0ZV9hZG1pbjogZnVuY3Rpb24gKGUsIGlkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLiRzY29wZS5kZWxldGVBZG1pbihpZCk7XG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfV1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIGhhbmRsZVJlc3VsdCgpIHtcblxuICAgIH1cblxuICAgIGFkZEFkbWluKCkge1xuICAgICAgICBjb25zdCBzZWxmID0gdGhpcztcblxuICAgICAgICBpbnB1dERpYWxvZyhcIkFkZCBhZG1pblwiLCBcIjNCb3QgbmFtZVwiLCBcIkFkZFwiLCAoaW5wdXQpID0+IHtcbiAgICAgICAgICAgIC8vIFRPRE86IGNhbGwgYWN0b3IuYWRkXG4gICAgICAgICAgICAvLyBUT0RPOiBjaGVjayBpZiBhbHJlYWR5IGV4aXN0cyAoY2FuIGJlIGFjdG9yIHRvbywgb3RoZXIgc2Vzc2lvbiBtYXkgaGF2ZSBhZGRlZCBvciByZW1vdmVkIGl0KVxuICAgICAgICAgICAgc2VsZi50YWJsZS5hZGQoeyBuYW1lOiBpbnB1dCB9KTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgZGVsZXRlQWRtaW4oaXRlbUlkKSB7XG4gICAgICAgIGNvbnN0IHNlbGYgPSB0aGlzO1xuXG4gICAgICAgIGNvbnN0IGl0ZW0gPSBzZWxmLnRhYmxlLmdldEl0ZW0oaXRlbUlkKTtcblxuICAgICAgICB3ZWJpeC5jb25maXJtKHtcbiAgICAgICAgICAgIHRpdGxlOiBcIkRlbGV0ZSBhZG1pblwiLFxuICAgICAgICAgICAgb2s6IFwiWWVzXCIsXG4gICAgICAgICAgICB0ZXh0OiBgQXJlIHlvdSBzdXJlIHlvdSB3YW50IHRvIGRlbGV0ZSBcIiR7aXRlbS5uYW1lfVwiP2AsXG4gICAgICAgICAgICBjYW5jZWw6IFwiTm9cIixcbiAgICAgICAgfSkudGhlbigoKSA9PiB7XG4gICAgICAgICAgICAvLyBUT0RPOiBjYWxsIGFjdG9yLmRlbGV0ZVxuICAgICAgICAgICAgc2VsZi50YWJsZS5yZW1vdmUoaXRlbUlkKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgaW5pdCgpIHtcbiAgICAgICAgdGhpcy50YWJsZSA9IHRoaXMuJCQoXCJhZG1pbnMtdGFibGVcIik7XG5cbiAgICAgICAgd2ViaXguZXh0ZW5kKHRoaXMudGFibGUsIHdlYml4LlByb2dyZXNzQmFyKTtcbiAgICB9XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zb3VyY2VzL3ZpZXdzL3NldHRpbmdzL2FkbWlucy5qcyIsImV4cG9ydCBmdW5jdGlvbiBjcmVhdGVGaWx0ZXJPcHRpb25zKG9iaikge1xuICAgIC8vIHJldHVybnMgYSBuZXcgb2JqZWN0IGFzIHtpZDogdmFsdWV9LCB1c2VkIGFzIGRhdGEgdGFibGUgZmlsdGVyIG9wdGlvbnNcbiAgICAvLyBvYmo6IGNhbiBiZSBhbiBhcnJheSBvciBhIG1hcHBpbmcgb2JqZWN0XG5cbiAgICBpZiAob2JqIGluc3RhbmNlb2YgQXJyYXkpIHtcbiAgICAgICAgcmV0dXJuIG9iai5tYXAoKHZhbHVlLCBpbmRleCkgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIHsgaWQ6IGluZGV4LCB2YWx1ZTogdmFsdWUgfVxuICAgICAgICB9KTtcbiAgICB9IGVsc2Uge1xuICAgICAgICAvLyBhc3N1bWUgaXQncyBqdXN0IGEgbWFwcGluZyBvdGhlcndpc2VcbiAgICAgICAgcmV0dXJuIE9iamVjdC5rZXlzKG9iaikubWFwKGtleSA9PiB7XG4gICAgICAgICAgICByZXR1cm4geyBpZDoga2V5LCB2YWx1ZTogb2JqW2tleV0gfVxuICAgICAgICB9KTtcbiAgICB9XG5cblxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc291cmNlcy9jb21tb24vZmlsdGVycy5qcyIsImltcG9ydCB7IFNlcnZpY2UgfSBmcm9tIFwiLi4vY29tbW9uL2FwaVwiO1xuXG5jb25zdCBCQVNFX1VSTCA9IFwiL3plcm9ib3QvcGFja2FnZW1hbmFnZXIvYWN0b3JzL3BhY2thZ2VfbWFuYWdlclwiO1xuXG5cbmNsYXNzIFBhY2thZ2VzU2VydmljZSBleHRlbmRzIFNlcnZpY2Uge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICBzdXBlcihCQVNFX1VSTCk7XG4gICAgfVxuXG4gICAgbGlzdCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0Q2FsbChcInBhY2thZ2VzX2xpc3RcIik7XG4gICAgfVxuXG4gICAgYWRkKHBhdGgsIGdpdFVybCkge1xuICAgICAgICByZXR1cm4gdGhpcy5wb3N0Q2FsbChcInBhY2thZ2VfYWRkXCIsIHtcbiAgICAgICAgICAgIHBhdGg6IHBhdGgsXG4gICAgICAgICAgICBnaXRfdXJsOiBnaXRVcmxcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgZGVsZXRlKHBhY2thZ2VOYW1lKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnBvc3RDYWxsKFwicGFja2FnZV9kZWxldGVcIiwgeyBuYW1lOiBwYWNrYWdlTmFtZSB9KTtcblxuICAgIH1cblxuICAgIHN0YXJ0KHBhY2thZ2VOYW1lKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnBvc3RDYWxsKFwicGFja2FnZV9zdGFydFwiLCB7IG5hbWU6IHBhY2thZ2VOYW1lIH0pO1xuICAgIH1cblxuICAgIHN0b3AocGFja2FnZU5hbWUpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucG9zdENhbGwoXCJwYWNrYWdlX3N0b3BcIiwgeyBuYW1lOiBwYWNrYWdlTmFtZSB9KTtcblxuICAgIH1cblxuICAgIGRpc2FibGUocGFja2FnZU5hbWUpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucG9zdENhbGwoXCJwYWNrYWdlX2Rpc2FibGVcIiwgeyBuYW1lOiBwYWNrYWdlTmFtZSB9KTtcblxuICAgIH1cblxuICAgIGVuYWJsZShwYWNrYWdlTmFtZSkge1xuICAgICAgICByZXR1cm4gdGhpcy5wb3N0Q2FsbChcInBhY2thZ2VfZW5hYmxlXCIsIHsgbmFtZTogcGFja2FnZU5hbWUgfSk7XG4gICAgfVxufVxuXG5cbmV4cG9ydCBjb25zdCBwYWNrYWdlcyA9IG5ldyBQYWNrYWdlc1NlcnZpY2UoKTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NvdXJjZXMvc2VydmljZXMvcGFja2FnZXMuanMiLCJpbXBvcnQgeyBKZXRWaWV3IH0gZnJvbSBcIndlYml4LWpldFwiO1xuaW1wb3J0IHsgaGVhbHRoIH0gZnJvbSBcIi4uLy4uL3NlcnZpY2VzL2hlYWx0aFwiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBEaXNrU3BhY2VWaWV3IGV4dGVuZHMgSmV0VmlldyB7XG4gICAgY29uZmlnKCkge1xuICAgICAgICBjb25zdCBkaXNrU3BhY2UgPSB7XG4gICAgICAgICAgICBpZDogXCJkaXNrU3BhY2VcIixcbiAgICAgICAgICAgIHJlc3BvbnNpdmU6IHRydWUsXG4gICAgICAgICAgICB2aWV3OiBcImxpc3RcIixcbiAgICAgICAgICAgIHR5cGU6IHtcbiAgICAgICAgICAgICAgICBoZWlnaHQ6IDYwLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHRlbXBsYXRlOiBgXG4gICAgICAgICAgICA8cD48Zm9udCBzaXplPVwiM1wiPjxiPiNrZXkjOiA8L2I+PC9mb250PiA8Zm9udCBzaXplPVwiM1wiPiN2YWx1ZSM8L2ZvbnQ+PC9wPlxuICAgICAgICAgICAgYFxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHR5cGU6IFwic3BhY2VcIixcbiAgICAgICAgICAgIHJvd3M6IFt7XG4gICAgICAgICAgICAgICAgdGVtcGxhdGU6IFwiPGRpdiBzdHlsZT0nd2lkdGg6YXV0bzt0ZXh0LWFsaWduOmNlbnRlcic+PGgzPkRpc2sgU3BhY2U8aDMvPjwvZGl2PlwiLFxuICAgICAgICAgICAgICAgIGhlaWdodDogNTBcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgZGlza1NwYWNlXG4gICAgICAgICAgICBdXG4gICAgICAgIH1cbiAgICB9XG5cblxuICAgIGluaXQoKSB7XG4gICAgICAgIHZhciBzZWxmID0gdGhpcztcblxuICAgICAgICB0aGlzLmRpc2tJbmZvID0gdGhpcy4kJChcImRpc2tTcGFjZVwiKTtcblxuICAgICAgICBoZWFsdGguZ2V0RGlza1NwYWNlKCkudGhlbihkYXRhID0+IHtcbiAgICAgICAgICAgIGRhdGEgPSBkYXRhLmpzb24oKTtcblxuICAgICAgICAgICAgc2VsZi5kaXNrSW5mby5hZGQoe1xuICAgICAgICAgICAgICAgIGtleTogXCJVc2VkXCIsXG4gICAgICAgICAgICAgICAgdmFsdWU6IGRhdGEudXNlZCArIFwiIEdCXCJcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgc2VsZi5kaXNrSW5mby5hZGQoe1xuICAgICAgICAgICAgICAgIGtleTogXCJGcmVlXCIsXG4gICAgICAgICAgICAgICAgdmFsdWU6IGRhdGEuZnJlZSArIFwiIEdCXCJcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgc2VsZi5kaXNrSW5mby5hZGQoe1xuICAgICAgICAgICAgICAgIGtleTogXCJUb3RhbFwiLFxuICAgICAgICAgICAgICAgIHZhbHVlOiBkYXRhLnRvdGFsICsgXCIgR0JcIlxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBzZWxmLmRpc2tJbmZvLmFkZCh7XG4gICAgICAgICAgICAgICAga2V5OiBcIlBlcmNlbnRcIixcbiAgICAgICAgICAgICAgICB2YWx1ZTogZGF0YS5wZXJjZW50ICsgXCIgJVwiXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zb3VyY2VzL3ZpZXdzL2Rhc2gvZGlza1NwYWNlLmpzIiwiaW1wb3J0IHsgSmV0VmlldyB9IGZyb20gXCJ3ZWJpeC1qZXRcIjtcbmltcG9ydCB7IGhlYWx0aCB9IGZyb20gXCIuLi8uLi9zZXJ2aWNlcy9oZWFsdGhcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgaGVhbHRoSW5mb1ZpZXcgZXh0ZW5kcyBKZXRWaWV3IHtcbiAgICBjb25maWcoKSB7XG4gICAgICAgIGNvbnN0IGhlYWx0aEluZm8gPSB7XG4gICAgICAgICAgICBpZDogXCJoZWFsdGhJbmZvXCIsXG4gICAgICAgICAgICByZXNwb25zaXZlOiB0cnVlLFxuICAgICAgICAgICAgdmlldzogXCJsaXN0XCIsXG4gICAgICAgICAgICByZXNwb25zaXZlOiB0cnVlLFxuICAgICAgICAgICAgdHlwZToge1xuICAgICAgICAgICAgICAgIGhlaWdodDogNjAsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgdGVtcGxhdGU6IGBcbiAgICAgICAgICAgIDxwPjxmb250IHNpemU9XCIzXCI+PGI+I2tleSM6IDwvYj48L2ZvbnQ+ICN2YWx1ZSM8L3A+XG4gICAgICAgICAgICBgXG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgdHlwZTogXCJzcGFjZVwiLFxuICAgICAgICAgICAgcm93czogW3tcbiAgICAgICAgICAgICAgICB0ZW1wbGF0ZTogXCI8ZGl2IHN0eWxlPSd3aWR0aDphdXRvO3RleHQtYWxpZ246Y2VudGVyJz48aDM+SGVhbHRoIENoZWNrczxoMy8+PC9kaXY+XCIsXG4gICAgICAgICAgICAgICAgaGVpZ2h0OiA1MFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBoZWFsdGhJbmZvXVxuICAgICAgICB9XG4gICAgfVxuICAgIGluaXQodmlldykge1xuICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XG5cbiAgICAgICAgdGhpcy5oZWFsdGhJbmZvID0gdGhpcy4kJChcImhlYWx0aEluZm9cIik7XG5cbiAgICAgICAgaGVhbHRoLmdldEhlYWx0aCgpLnRoZW4oZGF0YSA9PiB7XG4gICAgICAgICAgICBkYXRhID0gZGF0YS5qc29uKCk7XG5cbiAgICAgICAgICAgIGlmIChkYXRhLmJjZGIgPT09IFwiT0tcIikge1xuICAgICAgICAgICAgICAgIHNlbGYuaGVhbHRoSW5mby5hZGQoe1xuICAgICAgICAgICAgICAgICAgICBrZXk6IFwiQkNEQiBTdGF0dXNcIixcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU6IGA8c3BhbiBjbGFzcz0nd2ViaXhfaWNvbiB3eGktY2hlY2tib3gtbWFya2VkJyBzdHlsZT1cImNvbG9yOmdyZWVuXCI+T0s8L3NwYW4+YFxuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoZGF0YS5iY2RiID09PSBcIkVycm9yXCIpIHtcbiAgICAgICAgICAgICAgICBzZWxmLmhlYWx0aEluZm8uYWRkKHtcbiAgICAgICAgICAgICAgICAgICAga2V5OiBcIkJDREJcIixcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU6IGA8c3BhbiBjbGFzcz0nd2ViaXhfaWNvbiB3eGktY2xvc2UtY2lyY2xlJyBzdHlsZT1cImNvbG9yOnJlZFwiPkVycm9yPC9zcGFuPmBcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGRhdGEud2lraXMgPT09IFwiT0tcIikge1xuICAgICAgICAgICAgICAgIHNlbGYuaGVhbHRoSW5mby5hZGQoe1xuICAgICAgICAgICAgICAgICAgICBrZXk6IFwiV2lraXNcIixcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU6IGA8c3BhbiBjbGFzcz0nd2ViaXhfaWNvbiB3eGktY2hlY2tib3gtbWFya2VkJyBzdHlsZT1cImNvbG9yOmdyZWVuXCI+T0s8L3NwYW4+YFxuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoZGF0YS53aWtpcyA9PT0gXCJFcnJvclwiKSB7XG4gICAgICAgICAgICAgICAgc2VsZi5oZWFsdGhJbmZvLmFkZCh7XG4gICAgICAgICAgICAgICAgICAgIGtleTogXCJXaWtpc1wiLFxuICAgICAgICAgICAgICAgICAgICB2YWx1ZTogYDxzcGFuIGNsYXNzPSd3ZWJpeF9pY29uIHd4aS1jbG9zZS1jaXJjbGUnIHN0eWxlPVwiY29sb3I6cmVkXCI+RXJyb3I8L3NwYW4+YFxuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoZGF0YS5jb2Rlc2VydmVyID09PSBcIk9LXCIpIHtcbiAgICAgICAgICAgICAgICBzZWxmLmhlYWx0aEluZm8uYWRkKHtcbiAgICAgICAgICAgICAgICAgICAga2V5OiBcIkNvZGVzZXJ2ZXJcIixcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU6IGA8c3BhbiBjbGFzcz0nd2ViaXhfaWNvbiB3eGktY2hlY2tib3gtbWFya2VkJyBzdHlsZT1cImNvbG9yOmdyZWVuXCI+T0s8L3NwYW4+YFxuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoZGF0YS5jb2Rlc2VydmVyID09PSBcIkVycm9yXCIpIHtcbiAgICAgICAgICAgICAgICBzZWxmLmhlYWx0aEluZm8uYWRkKHtcbiAgICAgICAgICAgICAgICAgICAga2V5OiBcIkNvZGVzZXJ2ZXJcIixcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU6IGA8c3BhbiBjbGFzcz0nd2ViaXhfaWNvbiB3eGktY2xvc2UtY2lyY2xlJyBzdHlsZT1cImNvbG9yOnJlZFwiPkVycm9yPC9zcGFuPmBcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGRhdGEuanVweXRlciA9PT0gXCJPS1wiKSB7XG4gICAgICAgICAgICAgICAgc2VsZi5oZWFsdGhJbmZvLmFkZCh7XG4gICAgICAgICAgICAgICAgICAgIGtleTogXCJKdXB5dGVyXCIsXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlOiBgPHNwYW4gY2xhc3M9J3dlYml4X2ljb24gd3hpLWNoZWNrYm94LW1hcmtlZCcgc3R5bGU9XCJjb2xvcjpncmVlblwiPk9LPC9zcGFuPmBcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGRhdGEuanVweXRlciA9PT0gXCJFcnJvclwiKSB7XG4gICAgICAgICAgICAgICAgc2VsZi5oZWFsdGhJbmZvLmFkZCh7XG4gICAgICAgICAgICAgICAgICAgIGtleTogXCJKdXB5dGVyXCIsXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlOiBgPHNwYW4gY2xhc3M9J3dlYml4X2ljb24gd3hpLWNsb3NlLWNpcmNsZScgc3R5bGU9XCJjb2xvcjpyZWRcIj5FcnJvcjwvc3Bhbj5gXG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICB9XG5cbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NvdXJjZXMvdmlld3MvZGFzaC9oZWFsdGguanMiLCJpbXBvcnQgeyBKZXRWaWV3IH0gZnJvbSBcIndlYml4LWpldFwiO1xuaW1wb3J0IHsgaGVhbHRoIH0gZnJvbSBcIi4uLy4uL3NlcnZpY2VzL2hlYWx0aFwiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBKU1hJbmZvVmlldyBleHRlbmRzIEpldFZpZXcge1xuICAgIGNvbmZpZygpIHtcbiAgICAgICAgY29uc3QgaW5mbyA9IHtcbiAgICAgICAgICAgIGlkOiBcImpzeEluZm9cIixcbiAgICAgICAgICAgIHJlc3BvbnNpdmU6IHRydWUsXG4gICAgICAgICAgICB2aWV3OiBcImxpc3RcIixcbiAgICAgICAgICAgIHJlc3BvbnNpdmU6IHRydWUsXG4gICAgICAgICAgICB0eXBlOiB7XG4gICAgICAgICAgICAgICAgaGVpZ2h0OiA2MCxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB0ZW1wbGF0ZTogYFxuICAgICAgICAgICAgICAgIDxwPjxmb250IHNpemU9XCIzXCI+PGI+I2tleSM6IDwvYj48L2ZvbnQ+IDxmb250IHNpemU9XCIzXCI+I3ZhbHVlIzwvZm9udD48L3A+XG4gICAgICAgICAgICBgXG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgdHlwZTogXCJzcGFjZVwiLFxuICAgICAgICAgICAgcm93czogW3tcbiAgICAgICAgICAgICAgICB0ZW1wbGF0ZTogXCI8ZGl2IHN0eWxlPSd3aWR0aDphdXRvO3RleHQtYWxpZ246Y2VudGVyJz48aDM+SlNYIEluZm88aDMvPjwvZGl2PlwiLFxuICAgICAgICAgICAgICAgIGhlaWdodDogNTBcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgaW5mb1xuICAgICAgICAgICAgXVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgaW5pdCgpIHtcbiAgICAgICAgY29uc3Qgc2VsZiA9IHRoaXM7XG5cbiAgICAgICAgdGhpcy5pbmZvID0gdGhpcy4kJChcImpzeEluZm9cIik7XG5cbiAgICAgICAgaGVhbHRoLmdldElkZW50aXR5KCkudGhlbihkYXRhID0+IHtcbiAgICAgICAgICAgIHNlbGYuaW5mby5hZGQoe1xuICAgICAgICAgICAgICAgIGtleTogXCIzYm90XCIsXG4gICAgICAgICAgICAgICAgdmFsdWU6IGRhdGEudGV4dCgpXG4gICAgICAgICAgICB9KVxuICAgICAgICB9KVxuXG4gICAgICAgIGhlYWx0aC5nZXROZXR3b3JrSW5mbygpLnRoZW4oZGF0YSA9PiB7XG4gICAgICAgICAgICBkYXRhID0gZGF0YS5qc29uKCk7XG4gICAgICAgICAgICBzZWxmLmluZm8uYWRkKHtcbiAgICAgICAgICAgICAgICBrZXk6IFwiSVBcIixcbiAgICAgICAgICAgICAgICB2YWx1ZTogZGF0YS5pcCxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgaWYgKGRhdGEuaXA2Lmxlbmd0aCkge1xuICAgICAgICAgICAgICAgIHNlbGYuaW5mby5hZGQoe1xuICAgICAgICAgICAgICAgICAgICBrZXk6IFwiSVB2NlwiLFxuICAgICAgICAgICAgICAgICAgICB2YWx1ZTogZGF0YS5pcDZcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBzZWxmLmluZm8uYWRkKHtcbiAgICAgICAgICAgICAgICAgICAga2V5OiBcIklQdjZcIixcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU6IFwiTm90IHNldFwiXG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgaGVhbHRoLmdldEpzeFZlcnNpb24oKS50aGVuKGRhdGEgPT4ge1xuICAgICAgICAgICAgc2VsZi5pbmZvLmFkZCh7XG4gICAgICAgICAgICAgICAga2V5OiBcIkpTWCBWZXJzaW9uXCIsXG4gICAgICAgICAgICAgICAgdmFsdWU6IGRhdGEudGV4dCgpXG4gICAgICAgICAgICB9KVxuICAgICAgICB9KVxuXG4gICAgfVxuXG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zb3VyY2VzL3ZpZXdzL2Rhc2gvanN4SW5mby5qcyIsImltcG9ydCB7IEpldFZpZXcgfSBmcm9tIFwid2ViaXgtamV0XCI7XG5cbmltcG9ydCBQcm9jZXNzZXNDaGlsZFZpZXcgZnJvbSBcIi4vcHJvY2Vzc2VzQ2hpbGRWaWV3XCI7XG5pbXBvcnQgeyBoZWFsdGggfSBmcm9tIFwiLi4vLi4vc2VydmljZXMvaGVhbHRoXCI7XG5cbmNvbnN0IGNvbG9yc0RhdGFzZXQgPSBbXG4gICAge1xuICAgICAgICBjb2xvcjogXCIjZWUzNjM5XCJcbiAgICB9LFxuICAgIHtcbiAgICAgICAgY29sb3I6IFwiI2VlOWUzNlwiXG4gICAgfSxcbiAgICB7XG4gICAgICAgIGNvbG9yOiBcIiNlZWVhMzZcIlxuICAgIH0sXG4gICAge1xuICAgICAgICBjb2xvcjogXCIjYTllZTM2XCJcbiAgICB9LFxuICAgIHtcbiAgICAgICAgY29sb3I6IFwiIzM2ZDNlZVwiXG4gICAgfSxcbiAgICB7XG4gICAgICAgIGNvbG9yOiBcIiMzNjdmZWVcIlxuICAgIH0sXG4gICAge1xuICAgICAgICBjb2xvcjogXCIjOWIzNmVlXCJcbiAgICB9XG5dO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBQcm9jZXNzZXNWaWV3IGV4dGVuZHMgSmV0VmlldyB7XG5cbiAgICBjb25maWcoKSB7XG4gICAgICAgIGNvbnN0IHByb2Nlc3Nlc0luZm8gPSB7XG4gICAgICAgICAgICBpZDogXCJwcm9jZXNzXCIsXG4gICAgICAgICAgICB2aWV3OiBcImNoYXJ0XCIsXG4gICAgICAgICAgICByZXNwb25zaXZlOiB0cnVlLFxuICAgICAgICAgICAgdHlwZTogXCJwaWVcIixcbiAgICAgICAgICAgIHdpZHRoOiA1MDAsXG4gICAgICAgICAgICBoZWlnaHQ6IDQwMCxcbiAgICAgICAgICAgIGNvbG9yOiBcIiNjb2xvciNcIixcbiAgICAgICAgICAgIHZhbHVlOiBcIiN2bXMjXCIsXG4gICAgICAgICAgICBsYWJlbDogXCI8aDQ+I25hbWUjPC9oND5cIixcbiAgICAgICAgICAgIHBpZUlubmVyVGV4dDogXCI8aDQ+I3ZtcyM8L2g0PlwiLFxuICAgICAgICAgICAgZGF0YTogXCIjY2hhcnRzRGF0YSNcIixcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICB0eXBlOiBcInNwYWNlXCIsXG4gICAgICAgICAgICByb3dzOiBbXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICB0ZW1wbGF0ZTogXCI8ZGl2IHN0eWxlPSd3aWR0aDphdXRvO3RleHQtYWxpZ246Y2VudGVyJz48aDM+UnVubmluZyBwcm9jZXNzZXMgbWVtb3J5IHVzYWdlIChNQik8aDMvPjwvZGl2PlwiLFxuICAgICAgICAgICAgICAgICAgICBoZWlnaHQ6IDUwXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBwcm9jZXNzZXNJbmZvLFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgdmlldzogXCJidXR0b25cIixcbiAgICAgICAgICAgICAgICAgICAgaWQ6IFwic2hvd19hbGxcIixcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU6IFwiU2hvdyBBbGxcIixcbiAgICAgICAgICAgICAgICAgICAgYWxpZ246IFwiY2VudGVyXCIsXG4gICAgICAgICAgICAgICAgICAgIGNzczogXCJ3ZWJpeF9wcmltYXJ5XCIsXG4gICAgICAgICAgICAgICAgICAgIGlucHV0V2lkdGg6IDEwMCxcbiAgICAgICAgICAgICAgICAgICAgY2xpY2s6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuJHNjb3BlLmNoaWxkdmlldy5zaG93Rm9yKHRoaXMuJHNjb3BlLnByb2Nlc3Nlc0xpc3QpXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIF1cbiAgICAgICAgfVxuICAgIH1cblxuXG4gICAgaW5pdCh2aWV3KSB7XG4gICAgICAgIGNvbnN0IHNlbGYgPSB0aGlzO1xuXG4gICAgICAgIHRoaXMucHJvY2Vzc2VzTGlzdCA9IFtdXG5cbiAgICAgICAgdGhpcy5ydW5Qcm9jZXNzSW5mbyA9IHRoaXMuJCQoXCJwcm9jZXNzXCIpO1xuXG4gICAgICAgIHNlbGYuY2hpbGR2aWV3ID0gc2VsZi51aShQcm9jZXNzZXNDaGlsZFZpZXcpO1xuXG4gICAgICAgIGhlYWx0aC5nZXRSdW5uaW5nUHJvY2Vzc2VzKCkudGhlbihkYXRhID0+IHtcbiAgICAgICAgICAgIHZhciBjaGFydHNEYXRhID0gW11cblxuICAgICAgICAgICAgZGF0YSA9IGRhdGEuanNvbigpO1xuICAgICAgICAgICAgc2VsZi5wcm9jZXNzZXNMaXN0ID0gZGF0YS5wcm9jZXNzZXNfbGlzdFxuXG4gICAgICAgICAgICAvLyBtZW1vcnkgdXNhZ2VcbiAgICAgICAgICAgIHNlbGYubWVtb3J5VXNhZ2UgPSBkYXRhLm1lbW9yeV91c2FnZVxuICAgICAgICAgICAgc2VsZi50b3RhbE1lbW9yeSA9IHNlbGYubWVtb3J5VXNhZ2UudG90YWxfbWVtXG4gICAgICAgICAgICBzZWxmLnBlcmNlbnQgPSBzZWxmLm1lbW9yeVVzYWdlLnVzYWdlX3BlcmNlbnRcblxuXG4gICAgICAgICAgICBzZWxmLnJ1blByb2Nlc3NJbmZvLmRlZmluZShcImxlZ2VuZFwiLCB7XG4gICAgICAgICAgICAgICAgbGF5b3V0OiBcInhcIixcbiAgICAgICAgICAgICAgICB3aWR0aDogMTEwLFxuICAgICAgICAgICAgICAgIHZhbHVlczogW1xuICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0ZXh0OiBgPGI+VG90YWwgbWVtb3J5OiA8L2I+JHtzZWxmLnRvdGFsTWVtb3J5fUdCYFxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0ZXh0OiBgPGI+VXNhZ2U6IDwvYj4ke3NlbGYucGVyY2VudH0lYFxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIHNlbGYucnVuUHJvY2Vzc0luZm8ucmVmcmVzaCgpXG5cbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc2VsZi5wcm9jZXNzZXNMaXN0Lmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgLy9CcmVhayB3aGVuIHRoZXJlIGlzIG5vIG1vcmUgY29sb3JzXG4gICAgICAgICAgICAgICAgaWYgKGkgPT0gY29sb3JzRGF0YXNldC5sZW5ndGgpXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICAgICAgdmFyIHRlbXAgPSB7XG4gICAgICAgICAgICAgICAgICAgIFwiY29sb3JcIjogY29sb3JzRGF0YXNldFtpXS5jb2xvcixcbiAgICAgICAgICAgICAgICAgICAgXCJuYW1lXCI6IHNlbGYucHJvY2Vzc2VzTGlzdFtpXS5uYW1lLFxuICAgICAgICAgICAgICAgICAgICBcInZtc1wiOiBNYXRoLmNlaWwoc2VsZi5wcm9jZXNzZXNMaXN0W2ldLnZtcyksXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGNoYXJ0c0RhdGEucHVzaCh0ZW1wKVxuICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKG15QXJyYXlbaV0pO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBzZWxmLnJ1blByb2Nlc3NJbmZvLnBhcnNlKHtcbiAgICAgICAgICAgICAgICBkYXRhOiBjaGFydHNEYXRhLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH1cblxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc291cmNlcy92aWV3cy9kYXNoL3Byb2Nlc3Nlcy5qcyIsImltcG9ydCB7IEpldFZpZXcgfSBmcm9tIFwid2ViaXgtamV0XCI7XG5cbmltcG9ydCB7IGhlYWx0aCB9IGZyb20gXCIuLi8uLi9zZXJ2aWNlcy9oZWFsdGhcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgcnVubmluZ1BvcnRzVmlldyBleHRlbmRzIEpldFZpZXcge1xuICAgIGNvbmZpZygpIHtcbiAgICAgICAgY29uc3QgcG9ydHMgPSB7XG4gICAgICAgICAgICBpZDogXCJydW5uaW5nUG9ydHNcIixcbiAgICAgICAgICAgIHZpZXc6IFwiZGF0YXRhYmxlXCIsXG4gICAgICAgICAgICByZXNwb25zaXZlOiB0cnVlLFxuICAgICAgICAgICAgYXV0b0NvbmZpZzogdHJ1ZSxcbiAgICAgICAgICAgIHR5cGU6IHtcbiAgICAgICAgICAgICAgICBoZWlnaHQ6IDIwMCxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB0ZW1wbGF0ZTogXCJSdW5uaW5nIFBvcnRzXCIsXG4gICAgICAgICAgICByZXNpemVDb2x1bW46IHRydWUsXG4gICAgICAgICAgICBzZWxlY3Q6IHRydWUsXG4gICAgICAgICAgICBtdWx0aXNlbGVjdDogdHJ1ZSxcbiAgICAgICAgICAgIGNzczogXCJ3ZWJpeF9oZWFkZXJfYm9yZGVyIHdlYml4X2RhdGFfYm9yZGVyXCIsXG4gICAgICAgICAgICBjb2x1bW5zOiBbe1xuICAgICAgICAgICAgICAgIGlkOiBcImluZGV4XCIsXG4gICAgICAgICAgICAgICAgaGVhZGVyOiBcIiNcIixcbiAgICAgICAgICAgICAgICBzb3J0OiBcImludFwiLFxuICAgICAgICAgICAgICAgIGF1dG93aWR0aDogdHJ1ZSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgaWQ6IFwicG9ydF9udW1iZXJcIixcbiAgICAgICAgICAgICAgICBoZWFkZXI6IFtcIlBvcnQgTnVtYmVyXCIsIHtcbiAgICAgICAgICAgICAgICAgICAgY29udGVudDogXCJ0ZXh0RmlsdGVyXCJcbiAgICAgICAgICAgICAgICB9LF0sXG4gICAgICAgICAgICAgICAgc29ydDogXCJzdHJpbmdcIlxuICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIGlkOiBcInByb2Nlc3NcIixcbiAgICAgICAgICAgICAgICBoZWFkZXI6IFtcIlByb2Nlc3NcIiwge1xuICAgICAgICAgICAgICAgICAgICBjb250ZW50OiBcInRleHRGaWx0ZXJcIlxuICAgICAgICAgICAgICAgIH1dLFxuICAgICAgICAgICAgICAgIHNvcnQ6IFwic3RyaW5nXCJcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIF0sXG4gICAgICAgICAgICBzY2hlbWU6IHtcbiAgICAgICAgICAgICAgICAkaW5pdDogZnVuY3Rpb24gKG9iaikge1xuICAgICAgICAgICAgICAgICAgICBvYmouaW5kZXggPSB0aGlzLmNvdW50KCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICB0eXBlOiBcInNwYWNlXCIsXG4gICAgICAgICAgICByb3dzOiBbXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICB0ZW1wbGF0ZTogXCI8ZGl2IHN0eWxlPSd3aWR0aDphdXRvO3RleHQtYWxpZ246Y2VudGVyJz48aDM+UG9ydHM8aDMvPjwvZGl2PlwiLFxuICAgICAgICAgICAgICAgICAgICBoZWlnaHQ6IDUwXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBwb3J0c1xuICAgICAgICAgICAgXVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgaW5pdCgpIHtcbiAgICAgICAgY29uc3Qgc2VsZiA9IHRoaXM7XG5cbiAgICAgICAgc2VsZi5wb3J0c1RhYmxlID0gdGhpcy4kJChcInJ1bm5pbmdQb3J0c1wiKTtcbiAgICAgICAgaGVhbHRoLmdldFJ1bm5pbmdQb3J0cygpLnRoZW4oZGF0YSA9PiB7XG4gICAgICAgICAgICBzZWxmLnBvcnRzVGFibGUucGFyc2UoZGF0YS5qc29uKCkpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NvdXJjZXMvdmlld3MvZGFzaC9ydW5uaW5nUG9ydHMuanMiLCJpbXBvcnQgeyBKZXRWaWV3LCBwbHVnaW5zIH0gZnJvbSBcIndlYml4LWpldFwiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBUb3BWaWV3IGV4dGVuZHMgSmV0VmlldyB7XG4gICAgY29uZmlnKCkge1xuICAgICAgICBjb25zdCBoZWFkZXIgPSB7XG4gICAgICAgICAgICBjb2xzOiBbXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBpZDogXCJidXR0b25faGlkZV9tZW51XCIsXG4gICAgICAgICAgICAgICAgICAgIHZpZXc6IFwiaWNvblwiLCBpY29uOiBcIm1kaSBtZGktbWVudVwiLFxuICAgICAgICAgICAgICAgICAgICBjc3M6IFwiY3VzdG9tX2RhcmtcIiwgaGVpZ2h0OiA1OCxcbiAgICAgICAgICAgICAgICAgICAgY2xpY2s6IHRoaXMuaGlkZU1lbnUsXG4gICAgICAgICAgICAgICAgICAgIHRvb2x0aXA6IFwiSGlkZSBtZW51XCIsXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIGlkOiBcImhlYWRlclwiLFxuICAgICAgICAgICAgICAgICAgICB0eXBlOiBcImhlYWRlclwiLFxuICAgICAgICAgICAgICAgICAgICBjc3M6IFwiY3VzdG9tX2RhcmtcIiwgaGVpZ2h0OiA1OCxcbiAgICAgICAgICAgICAgICAgICAgdGVtcGxhdGU6IFwiQURNSU5cIixcbiAgICAgICAgICAgICAgICAgICAgYm9yZGVybGVzczogdHJ1ZSxcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgXVxuICAgICAgICB9O1xuXG4gICAgICAgIGNvbnN0IHNpZGViYXIgPSB7XG4gICAgICAgICAgICBsb2NhbElkOiBcIm1lbnVcIixcbiAgICAgICAgICAgIHZpZXc6IFwic2lkZWJhclwiLFxuICAgICAgICAgICAgY3NzOiBcIndlYml4X2RhcmtcIixcbiAgICAgICAgICAgIHdpZHRoOiAyMDAsXG4gICAgICAgICAgICBkYXRhOiBbe1xuICAgICAgICAgICAgICAgIGlkOiBcImRhc2hcIixcbiAgICAgICAgICAgICAgICB2YWx1ZTogXCJEYXNoYm9hcmRcIixcbiAgICAgICAgICAgICAgICBpY29uOiBcIm1kaSBtZGktdmlldy1kYXNoYm9hcmRcIlxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBpZDogXCJ3aWtpc1wiLFxuICAgICAgICAgICAgICAgIHZhbHVlOiBcIldpa2lzXCIsXG4gICAgICAgICAgICAgICAgaWNvbjogXCJtZGkgbWRpLW5ld3NwYXBlclwiXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGlkOiBcImFsZXJ0c1wiLFxuICAgICAgICAgICAgICAgIHZhbHVlOiBcIkFsZXJ0c1wiLFxuICAgICAgICAgICAgICAgIGljb246IFwibWRpIG1kaS1iZWxsLWFsZXJ0XCJcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgaWQ6IFwibG9nc1wiLFxuICAgICAgICAgICAgICAgIHZhbHVlOiBcIkxvZ3NcIixcbiAgICAgICAgICAgICAgICBpY29uOiBcIm1kaSBtZGktaGlzdG9yeVwiXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGlkOiBcIm15am9ic19tYWluXCIsXG4gICAgICAgICAgICAgICAgdmFsdWU6IFwiTXkgam9ic1wiLFxuICAgICAgICAgICAgICAgIGljb246IFwibWRpIG1kaS1hbmltYXRpb24tcGxheVwiLFxuICAgICAgICAgICAgICAgIGRhdGE6IFt7XG4gICAgICAgICAgICAgICAgICAgIGlkOiBcIm15am9ic1wiLFxuICAgICAgICAgICAgICAgICAgICBpY29uOiBcIm1kaSBtZGktYm9vay1vcGVuXCIsXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlOiBcIkpvYnNcIlxuICAgICAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICAgICAgaWQ6IFwid29ya2Vyc1wiLFxuICAgICAgICAgICAgICAgICAgICBpY29uOiBcIm1kaSBtZGktd29ya2VyXCIsXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlOiBcIldvcmtlcnNcIlxuICAgICAgICAgICAgICAgIH1dXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGlkOiBcInBhY2thZ2VzXCIsXG4gICAgICAgICAgICAgICAgdmFsdWU6IFwiUGFja2FnZXNcIixcbiAgICAgICAgICAgICAgICBpY29uOiBcIm1kaSBtZGktcGFja2FnZVwiXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGlkOiBcImNvZGVzZXJ2ZXJcIixcbiAgICAgICAgICAgICAgICB2YWx1ZTogXCJDb2Rlc2VydmVyXCIsXG4gICAgICAgICAgICAgICAgaWNvbjogXCJtZGkgbWRpLWNvZGUtdGFnc1wiXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGlkOiBcImp1cHl0ZXJcIixcbiAgICAgICAgICAgICAgICB2YWx1ZTogXCJKdXB5dGVyXCIsXG4gICAgICAgICAgICAgICAgaWNvbjogXCJtZGkgbWRpLXBsYXlcIlxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBpZDogXCJzZXR0aW5nc1wiLFxuICAgICAgICAgICAgICAgIHZhbHVlOiBcIlNldHRpbmdzXCIsXG4gICAgICAgICAgICAgICAgaWNvbjogXCJtZGkgbWRpLXNldHRpbmdzXCJcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBdXG4gICAgICAgIH07XG5cbiAgICAgICAgY29uc3QgdG9vbGJhciA9IHtcbiAgICAgICAgICAgIHZpZXc6IFwidG9vbGJhclwiLFxuICAgICAgICAgICAgcGFkZGluZzogOSxcbiAgICAgICAgICAgIGhlaWdodDogNTgsXG4gICAgICAgICAgICBjb2xzOiBbe1xuICAgICAgICAgICAgICAgIGlkOiBcImJ1dHRvbl9zaG93X21lbnVcIixcbiAgICAgICAgICAgICAgICB2aWV3OiBcImljb25cIixcbiAgICAgICAgICAgICAgICBpY29uOiBcIm1kaSBtZGktbWVudVwiLFxuICAgICAgICAgICAgICAgIGNsaWNrOiB0aGlzLnNob3dNZW51LFxuICAgICAgICAgICAgICAgIGhpZGRlbjogdHJ1ZSwgLy8gaGlkZGVuIGJ5IGRlZmF1bHRcbiAgICAgICAgICAgICAgICB0b29sdGlwOiBcIlNob3cgbWVudVwiLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICB2aWV3OiBcInRlbXBsYXRlXCIsXG4gICAgICAgICAgICAgICAgdGVtcGxhdGU6IGA8aW1nIGNsYXNzPVwid2ViaXhfaWNvblwiIHNyYz1cInN0YXRpYy9pbWcvM2JvdC5wbmdcIi8+YCxcbiAgICAgICAgICAgICAgICBib3JkZXJsZXNzOiB0cnVlLFxuICAgICAgICAgICAgICAgIGhlaWdodDogNDAsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGlkOiBcInVzZXJuYW1lX2xhYmVsXCIsXG4gICAgICAgICAgICAgICAgdmlldzogXCJsYWJlbFwiLFxuICAgICAgICAgICAgICAgIGxhYmVsOiBcInVzZXJuYW1lXCIsXG4gICAgICAgICAgICAgICAgYm9yZGVybGVzczogdHJ1ZSxcbiAgICAgICAgICAgICAgICBhbGlnbjogXCJyaWdodFwiLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBpZDogXCJ1c2VyX2ljb25cIixcbiAgICAgICAgICAgICAgICB2aWV3OiBcImljb25cIixcbiAgICAgICAgICAgICAgICBpY29uOiBcIm1kaSBtZGktYWNjb3VudC1jaXJjbGVcIixcbiAgICAgICAgICAgICAgICBib3JkZXJsZXNzOiB0cnVlLFxuICAgICAgICAgICAgICAgIHBvcHVwOiBcInVzZXJfbWVudVwiXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBdXG4gICAgICAgIH07XG5cbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHR5cGU6IFwiY2xlYW5cIixcbiAgICAgICAgICAgIGNvbHM6IFt7XG4gICAgICAgICAgICAgICAgcm93czogW2hlYWRlciwgc2lkZWJhcl1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgcm93czogW1xuICAgICAgICAgICAgICAgICAgICB0b29sYmFyLFxuICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAkc3VidmlldzogdHJ1ZVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgXVxuICAgICAgICB9O1xuICAgIH1cblxuICAgIHNob3dNZW51KCkge1xuICAgICAgICB0aGlzLiRzY29wZS5tZW51LnNob3coKTtcbiAgICAgICAgdGhpcy4kc2NvcGUuaGVhZGVyLnNob3coKTtcbiAgICAgICAgdGhpcy4kc2NvcGUuYnV0dG9uSGlkZU1lbnUuc2hvdygpO1xuXG4gICAgICAgIHRoaXMuJHNjb3BlLmJ1dHRvblNob3dNZW51LmhpZGUoKTtcbiAgICB9XG5cbiAgICBoaWRlTWVudSgpIHtcbiAgICAgICAgdGhpcy4kc2NvcGUubWVudS5oaWRlKCk7XG4gICAgICAgIHRoaXMuJHNjb3BlLmhlYWRlci5oaWRlKCk7XG4gICAgICAgIHRoaXMuJHNjb3BlLmJ1dHRvbkhpZGVNZW51LmhpZGUoKTtcblxuICAgICAgICB0aGlzLiRzY29wZS5idXR0b25TaG93TWVudS5zaG93KCk7XG4gICAgfVxuXG4gICAgaW5pdCgpIHtcbiAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xuXG4gICAgICAgIHRoaXMudXNlKHBsdWdpbnMuTWVudSwgXCJtZW51XCIpO1xuICAgICAgICB0aGlzLm1lbnUgPSB0aGlzLiQkKFwibWVudVwiKTtcbiAgICAgICAgdGhpcy5oZWFkZXIgPSB0aGlzLiQkKFwiaGVhZGVyXCIpO1xuXG4gICAgICAgIHRoaXMuYnV0dG9uU2hvd01lbnUgPSB0aGlzLiQkKFwiYnV0dG9uX3Nob3dfbWVudVwiKTtcbiAgICAgICAgdGhpcy5idXR0b25IaWRlTWVudSA9IHRoaXMuJCQoXCJidXR0b25faGlkZV9tZW51XCIpO1xuXG5cbiAgICAgICAgdGhpcy53ZWJpeC51aSh7XG4gICAgICAgICAgICB2aWV3OiBcInN1Ym1lbnVcIixcbiAgICAgICAgICAgIGlkOiBcInVzZXJfbWVudVwiLFxuICAgICAgICAgICAgYXV0b3dpZHRoOiB0cnVlLFxuICAgICAgICAgICAgZGF0YTogW11cbiAgICAgICAgfSk7XG5cbiAgICAgICAgdGhpcy51c2VyTWVudSA9ICQkKFwidXNlcl9tZW51XCIpO1xuICAgICAgICB0aGlzLnVzZXJNZW51LmF0dGFjaEV2ZW50KFwib25JdGVtQ2xpY2tcIiwgZnVuY3Rpb24gKGlkLCBlLCBub2RlKSB7XG4gICAgICAgICAgICBpZiAoaWQgPT0gXCJsb2dvdXRcIikge1xuICAgICAgICAgICAgICAgIHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gXCIvYXV0aC9sb2dvdXQ/bmV4dF91cmw9L2FkbWluXCI7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHRoaXMudXNlcm5hbWVMYWJlbCA9ICQkKFwidXNlcm5hbWVfbGFiZWxcIik7XG5cbiAgICAgICAgd2ViaXguYWpheCgpLmdldChcIi9hdXRoL2F1dGhlbnRpY2F0ZWRcIiwgZnVuY3Rpb24gKGRhdGEpIHtcbiAgICAgICAgICAgIGNvbnN0IGluZm8gPSBKU09OLnBhcnNlKGRhdGEpO1xuICAgICAgICAgICAgc2VsZi51c2VybmFtZUxhYmVsLmNvbmZpZy5sYWJlbCA9IGluZm8udXNlcm5hbWU7XG4gICAgICAgICAgICBzZWxmLnVzZXJuYW1lTGFiZWwuY29uZmlnLndpZHRoID0gd2ViaXguaHRtbC5nZXRUZXh0U2l6ZShpbmZvLnVzZXJuYW1lKSArIDEwO1xuICAgICAgICAgICAgc2VsZi51c2VybmFtZUxhYmVsLnJlZnJlc2goKTtcblxuICAgICAgICAgICAgc2VsZi51c2VyTWVudS5hZGQoeyBpZDogJ2VtYWlsJywgdmFsdWU6IGluZm8uZW1haWwgfSlcbiAgICAgICAgICAgIHNlbGYudXNlck1lbnUuYWRkKHsgaWQ6ICdsb2dvdXQnLCB2YWx1ZTogXCJMb2dvdXRcIiB9KVxuICAgICAgICB9KTtcbiAgICB9XG5cbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NvdXJjZXMvdmlld3MvbWFpbi5qcyIsImltcG9ydCB7IFNlcnZpY2UgfSBmcm9tIFwiLi4vY29tbW9uL2FwaVwiO1xuXG5jb25zdCBCQVNFX1VSTCA9IFwiL3plcm9ib3QvbXlqb2JzX3VpL2FjdG9ycy9teWpvYnNcIjtcblxuY2xhc3MgTXlqb2JzU2VydmljZSBleHRlbmRzIFNlcnZpY2Uge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICBzdXBlcihCQVNFX1VSTCk7XG4gICAgfVxuXG4gICAgbGlzdEpvYnMoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmdldENhbGwoXCJsaXN0X2pvYnNcIik7XG4gICAgfVxuXG4gICAgbGlzdFdvcmtlcnMoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmdldENhbGwoXCJsaXN0X3dvcmtlcnNcIik7XG4gICAgfVxufVxuXG5leHBvcnQgY29uc3QgbXlqb2JzID0gbmV3IE15am9ic1NlcnZpY2UoKTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NvdXJjZXMvc2VydmljZXMvbXlqb2JzLmpzIiwiaW1wb3J0IFwiLi9zdHlsZXMvYXBwLmNzc1wiO1xuaW1wb3J0IHtKZXRBcHB9IGZyb20gXCJ3ZWJpeC1qZXRcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgSW52ZW50b3J5QXBwIGV4dGVuZHMgSmV0QXBwIHtcblx0Y29uc3RydWN0b3IoY29uZmlnKXtcblx0XHRzdXBlcih3ZWJpeC5leHRlbmQoe1xuXHRcdFx0aWQ6XHRcdFx0QVBQTkFNRSxcblx0XHRcdHZlcnNpb246XHRWRVJTSU9OLFxuXHRcdFx0c3RhcnQ6XHRcdFwiL21haW4vZGFzaFwiLFxuXHRcdFx0ZGVidWc6XHRcdCFQUk9EVUNUSU9OXG5cdFx0fSwgY29uZmlnLCB0cnVlKSk7XG5cblx0XHQvKiBlcnJvciB0cmFja2luZyAqL1xuXHRcdHRoaXMuYXR0YWNoRXZlbnQoXCJhcHA6ZXJyb3I6cmVzb2x2ZVwiLCBmdW5jdGlvbihuYW1lLCBlcnJvcil7XG5cdFx0XHR3aW5kb3cuY29uc29sZS5lcnJvcihlcnJvcik7XG5cdFx0fSk7XG5cdH1cbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NvdXJjZXMvYXBwLmpzIiwiLy8gcmVtb3ZlZCBieSBleHRyYWN0LXRleHQtd2VicGFjay1wbHVnaW5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3NvdXJjZXMvc3R5bGVzL2FwcC5jc3Ncbi8vIG1vZHVsZSBpZCA9IDMzXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsInZhciBtYXAgPSB7XG5cdFwiLi9hbGVydHNcIjogNixcblx0XCIuL2FsZXJ0cy9cIjogNixcblx0XCIuL2FsZXJ0cy9hbGVydFwiOiAxNyxcblx0XCIuL2FsZXJ0cy9hbGVydC5qc1wiOiAxNyxcblx0XCIuL2FsZXJ0cy9kYXRhXCI6IDIsXG5cdFwiLi9hbGVydHMvZGF0YS5qc1wiOiAyLFxuXHRcIi4vYWxlcnRzL2luZGV4XCI6IDYsXG5cdFwiLi9hbGVydHMvaW5kZXguanNcIjogNixcblx0XCIuL2NvZGVzZXJ2ZXJcIjogNyxcblx0XCIuL2NvZGVzZXJ2ZXIvXCI6IDcsXG5cdFwiLi9jb2Rlc2VydmVyL2luZGV4XCI6IDcsXG5cdFwiLi9jb2Rlc2VydmVyL2luZGV4LmpzXCI6IDcsXG5cdFwiLi9kYXNoXCI6IDgsXG5cdFwiLi9kYXNoL1wiOiA4LFxuXHRcIi4vZGFzaC9kaXNrU3BhY2VcIjogMjQsXG5cdFwiLi9kYXNoL2Rpc2tTcGFjZS5qc1wiOiAyNCxcblx0XCIuL2Rhc2gvaGVhbHRoXCI6IDI1LFxuXHRcIi4vZGFzaC9oZWFsdGguanNcIjogMjUsXG5cdFwiLi9kYXNoL2luZGV4XCI6IDgsXG5cdFwiLi9kYXNoL2luZGV4LmpzXCI6IDgsXG5cdFwiLi9kYXNoL2pzeEluZm9cIjogMjYsXG5cdFwiLi9kYXNoL2pzeEluZm8uanNcIjogMjYsXG5cdFwiLi9kYXNoL3Byb2Nlc3Nlc1wiOiAyNyxcblx0XCIuL2Rhc2gvcHJvY2Vzc2VzLmpzXCI6IDI3LFxuXHRcIi4vZGFzaC9wcm9jZXNzZXNDaGlsZFZpZXdcIjogMTgsXG5cdFwiLi9kYXNoL3Byb2Nlc3Nlc0NoaWxkVmlldy5qc1wiOiAxOCxcblx0XCIuL2Rhc2gvcnVubmluZ1BvcnRzXCI6IDI4LFxuXHRcIi4vZGFzaC9ydW5uaW5nUG9ydHMuanNcIjogMjgsXG5cdFwiLi9lcnJvcnMvZGlhbG9nXCI6IDE5LFxuXHRcIi4vZXJyb3JzL2RpYWxvZy5qc1wiOiAxOSxcblx0XCIuL2V4dGVybmFsXCI6IDEsXG5cdFwiLi9leHRlcm5hbC9cIjogMSxcblx0XCIuL2V4dGVybmFsL2luZGV4XCI6IDEsXG5cdFwiLi9leHRlcm5hbC9pbmRleC5qc1wiOiAxLFxuXHRcIi4vanVweXRlclwiOiA5LFxuXHRcIi4vanVweXRlci9cIjogOSxcblx0XCIuL2p1cHl0ZXIvaW5kZXhcIjogOSxcblx0XCIuL2p1cHl0ZXIvaW5kZXguanNcIjogOSxcblx0XCIuL2xvZ3NcIjogMTAsXG5cdFwiLi9sb2dzL1wiOiAxMCxcblx0XCIuL2xvZ3MvYXBwTG9nc1wiOiAyMCxcblx0XCIuL2xvZ3MvYXBwTG9ncy5qc1wiOiAyMCxcblx0XCIuL2xvZ3MvaW5kZXhcIjogMTAsXG5cdFwiLi9sb2dzL2luZGV4LmpzXCI6IDEwLFxuXHRcIi4vbWFpblwiOiAyOSxcblx0XCIuL21haW4uanNcIjogMjksXG5cdFwiLi9teWpvYnNcIjogMTEsXG5cdFwiLi9teWpvYnMvXCI6IDExLFxuXHRcIi4vbXlqb2JzL2luZGV4XCI6IDExLFxuXHRcIi4vbXlqb2JzL2luZGV4LmpzXCI6IDExLFxuXHRcIi4vcGFja2FnZXNcIjogMTIsXG5cdFwiLi9wYWNrYWdlcy9cIjogMTIsXG5cdFwiLi9wYWNrYWdlcy9pbmRleFwiOiAxMixcblx0XCIuL3BhY2thZ2VzL2luZGV4LmpzXCI6IDEyLFxuXHRcIi4vc2V0dGluZ3NcIjogMTMsXG5cdFwiLi9zZXR0aW5ncy9cIjogMTMsXG5cdFwiLi9zZXR0aW5ncy9hZG1pbnNcIjogMjEsXG5cdFwiLi9zZXR0aW5ncy9hZG1pbnMuanNcIjogMjEsXG5cdFwiLi9zZXR0aW5ncy9pbmRleFwiOiAxMyxcblx0XCIuL3NldHRpbmdzL2luZGV4LmpzXCI6IDEzLFxuXHRcIi4vd2lraXNcIjogMTQsXG5cdFwiLi93aWtpcy9cIjogMTQsXG5cdFwiLi93aWtpcy9pbmRleFwiOiAxNCxcblx0XCIuL3dpa2lzL2luZGV4LmpzXCI6IDE0LFxuXHRcIi4vd29ya2Vyc1wiOiAxNSxcblx0XCIuL3dvcmtlcnMvXCI6IDE1LFxuXHRcIi4vd29ya2Vycy9pbmRleFwiOiAxNSxcblx0XCIuL3dvcmtlcnMvaW5kZXguanNcIjogMTVcbn07XG5mdW5jdGlvbiB3ZWJwYWNrQ29udGV4dChyZXEpIHtcblx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18od2VicGFja0NvbnRleHRSZXNvbHZlKHJlcSkpO1xufTtcbmZ1bmN0aW9uIHdlYnBhY2tDb250ZXh0UmVzb2x2ZShyZXEpIHtcblx0dmFyIGlkID0gbWFwW3JlcV07XG5cdGlmKCEoaWQgKyAxKSkgLy8gY2hlY2sgZm9yIG51bWJlciBvciBzdHJpbmdcblx0XHR0aHJvdyBuZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiICsgcmVxICsgXCInLlwiKTtcblx0cmV0dXJuIGlkO1xufTtcbndlYnBhY2tDb250ZXh0LmtleXMgPSBmdW5jdGlvbiB3ZWJwYWNrQ29udGV4dEtleXMoKSB7XG5cdHJldHVybiBPYmplY3Qua2V5cyhtYXApO1xufTtcbndlYnBhY2tDb250ZXh0LnJlc29sdmUgPSB3ZWJwYWNrQ29udGV4dFJlc29sdmU7XG5tb2R1bGUuZXhwb3J0cyA9IHdlYnBhY2tDb250ZXh0O1xud2VicGFja0NvbnRleHQuaWQgPSAzNDtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3NvdXJjZXMvdmlld3MgXlxcLlxcLy4qJFxuLy8gbW9kdWxlIGlkID0gMzRcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLyogIGFuc2lfdXAuanNcbiAqICBhdXRob3IgOiBEcnUgTmVsc29uXG4gKiAgbGljZW5zZSA6IE1JVFxuICogIGh0dHA6Ly9naXRodWIuY29tL2RydWRydS9hbnNpX3VwXG4gKi9cbihmdW5jdGlvbiAocm9vdCwgZmFjdG9yeSkge1xuICAgIGlmICh0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQpIHtcbiAgICAgICAgLy8gQU1ELiBSZWdpc3RlciBhcyBhbiBhbm9ueW1vdXMgbW9kdWxlLlxuICAgICAgICBkZWZpbmUoWydleHBvcnRzJ10sIGZhY3RvcnkpO1xuICAgIH0gZWxzZSBpZiAodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnICYmIHR5cGVvZiBleHBvcnRzLm5vZGVOYW1lICE9PSAnc3RyaW5nJykge1xuICAgICAgICAvLyBDb21tb25KU1xuICAgICAgICBmYWN0b3J5KGV4cG9ydHMpO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIC8vIEJyb3dzZXIgZ2xvYmFsc1xuICAgICAgICB2YXIgZXhwID0ge307XG4gICAgICAgIGZhY3RvcnkoZXhwKTtcbiAgICAgICAgcm9vdC5BbnNpVXAgPSBleHAuZGVmYXVsdDtcbiAgICB9XG59KHRoaXMsIGZ1bmN0aW9uIChleHBvcnRzKSB7XG5cInVzZSBzdHJpY3RcIjtcbnZhciBfX21ha2VUZW1wbGF0ZU9iamVjdCA9ICh0aGlzICYmIHRoaXMuX19tYWtlVGVtcGxhdGVPYmplY3QpIHx8IGZ1bmN0aW9uIChjb29rZWQsIHJhdykge1xuICAgIGlmIChPYmplY3QuZGVmaW5lUHJvcGVydHkpIHsgT2JqZWN0LmRlZmluZVByb3BlcnR5KGNvb2tlZCwgXCJyYXdcIiwgeyB2YWx1ZTogcmF3IH0pOyB9IGVsc2UgeyBjb29rZWQucmF3ID0gcmF3OyB9XG4gICAgcmV0dXJuIGNvb2tlZDtcbn07XG52YXIgUGFja2V0S2luZDtcbihmdW5jdGlvbiAoUGFja2V0S2luZCkge1xuICAgIFBhY2tldEtpbmRbUGFja2V0S2luZFtcIkVPU1wiXSA9IDBdID0gXCJFT1NcIjtcbiAgICBQYWNrZXRLaW5kW1BhY2tldEtpbmRbXCJUZXh0XCJdID0gMV0gPSBcIlRleHRcIjtcbiAgICBQYWNrZXRLaW5kW1BhY2tldEtpbmRbXCJJbmNvbXBsZXRlXCJdID0gMl0gPSBcIkluY29tcGxldGVcIjtcbiAgICBQYWNrZXRLaW5kW1BhY2tldEtpbmRbXCJFU0NcIl0gPSAzXSA9IFwiRVNDXCI7XG4gICAgUGFja2V0S2luZFtQYWNrZXRLaW5kW1wiVW5rbm93blwiXSA9IDRdID0gXCJVbmtub3duXCI7XG4gICAgUGFja2V0S2luZFtQYWNrZXRLaW5kW1wiU0dSXCJdID0gNV0gPSBcIlNHUlwiO1xuICAgIFBhY2tldEtpbmRbUGFja2V0S2luZFtcIk9TQ1VSTFwiXSA9IDZdID0gXCJPU0NVUkxcIjtcbn0pKFBhY2tldEtpbmQgfHwgKFBhY2tldEtpbmQgPSB7fSkpO1xudmFyIEFuc2lVcCA9IChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gQW5zaVVwKCkge1xuICAgICAgICB0aGlzLlZFUlNJT04gPSBcIjQuMC40XCI7XG4gICAgICAgIHRoaXMuc2V0dXBfcGFsZXR0ZXMoKTtcbiAgICAgICAgdGhpcy5fdXNlX2NsYXNzZXMgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5fZXNjYXBlX2Zvcl9odG1sID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5ib2xkID0gZmFsc2U7XG4gICAgICAgIHRoaXMuZmcgPSB0aGlzLmJnID0gbnVsbDtcbiAgICAgICAgdGhpcy5fYnVmZmVyID0gJyc7XG4gICAgICAgIHRoaXMuX3VybF93aGl0ZWxpc3QgPSB7ICdodHRwJzogMSwgJ2h0dHBzJzogMSB9O1xuICAgIH1cbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoQW5zaVVwLnByb3RvdHlwZSwgXCJ1c2VfY2xhc3Nlc1wiLCB7XG4gICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3VzZV9jbGFzc2VzO1xuICAgICAgICB9LFxuICAgICAgICBzZXQ6IGZ1bmN0aW9uIChhcmcpIHtcbiAgICAgICAgICAgIHRoaXMuX3VzZV9jbGFzc2VzID0gYXJnO1xuICAgICAgICB9LFxuICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgICAgICBjb25maWd1cmFibGU6IHRydWVcbiAgICB9KTtcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoQW5zaVVwLnByb3RvdHlwZSwgXCJlc2NhcGVfZm9yX2h0bWxcIiwge1xuICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9lc2NhcGVfZm9yX2h0bWw7XG4gICAgICAgIH0sXG4gICAgICAgIHNldDogZnVuY3Rpb24gKGFyZykge1xuICAgICAgICAgICAgdGhpcy5fZXNjYXBlX2Zvcl9odG1sID0gYXJnO1xuICAgICAgICB9LFxuICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgICAgICBjb25maWd1cmFibGU6IHRydWVcbiAgICB9KTtcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoQW5zaVVwLnByb3RvdHlwZSwgXCJ1cmxfd2hpdGVsaXN0XCIsIHtcbiAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fdXJsX3doaXRlbGlzdDtcbiAgICAgICAgfSxcbiAgICAgICAgc2V0OiBmdW5jdGlvbiAoYXJnKSB7XG4gICAgICAgICAgICB0aGlzLl91cmxfd2hpdGVsaXN0ID0gYXJnO1xuICAgICAgICB9LFxuICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgICAgICBjb25maWd1cmFibGU6IHRydWVcbiAgICB9KTtcbiAgICBBbnNpVXAucHJvdG90eXBlLnNldHVwX3BhbGV0dGVzID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgICB0aGlzLmFuc2lfY29sb3JzID1cbiAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgICAgIHsgcmdiOiBbMCwgMCwgMF0sIGNsYXNzX25hbWU6IFwiYW5zaS1ibGFja1wiIH0sXG4gICAgICAgICAgICAgICAgICAgIHsgcmdiOiBbMTg3LCAwLCAwXSwgY2xhc3NfbmFtZTogXCJhbnNpLXJlZFwiIH0sXG4gICAgICAgICAgICAgICAgICAgIHsgcmdiOiBbMCwgMTg3LCAwXSwgY2xhc3NfbmFtZTogXCJhbnNpLWdyZWVuXCIgfSxcbiAgICAgICAgICAgICAgICAgICAgeyByZ2I6IFsxODcsIDE4NywgMF0sIGNsYXNzX25hbWU6IFwiYW5zaS15ZWxsb3dcIiB9LFxuICAgICAgICAgICAgICAgICAgICB7IHJnYjogWzAsIDAsIDE4N10sIGNsYXNzX25hbWU6IFwiYW5zaS1ibHVlXCIgfSxcbiAgICAgICAgICAgICAgICAgICAgeyByZ2I6IFsxODcsIDAsIDE4N10sIGNsYXNzX25hbWU6IFwiYW5zaS1tYWdlbnRhXCIgfSxcbiAgICAgICAgICAgICAgICAgICAgeyByZ2I6IFswLCAxODcsIDE4N10sIGNsYXNzX25hbWU6IFwiYW5zaS1jeWFuXCIgfSxcbiAgICAgICAgICAgICAgICAgICAgeyByZ2I6IFsyNTUsIDI1NSwgMjU1XSwgY2xhc3NfbmFtZTogXCJhbnNpLXdoaXRlXCIgfVxuICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAgICAgICB7IHJnYjogWzg1LCA4NSwgODVdLCBjbGFzc19uYW1lOiBcImFuc2ktYnJpZ2h0LWJsYWNrXCIgfSxcbiAgICAgICAgICAgICAgICAgICAgeyByZ2I6IFsyNTUsIDg1LCA4NV0sIGNsYXNzX25hbWU6IFwiYW5zaS1icmlnaHQtcmVkXCIgfSxcbiAgICAgICAgICAgICAgICAgICAgeyByZ2I6IFswLCAyNTUsIDBdLCBjbGFzc19uYW1lOiBcImFuc2ktYnJpZ2h0LWdyZWVuXCIgfSxcbiAgICAgICAgICAgICAgICAgICAgeyByZ2I6IFsyNTUsIDI1NSwgODVdLCBjbGFzc19uYW1lOiBcImFuc2ktYnJpZ2h0LXllbGxvd1wiIH0sXG4gICAgICAgICAgICAgICAgICAgIHsgcmdiOiBbODUsIDg1LCAyNTVdLCBjbGFzc19uYW1lOiBcImFuc2ktYnJpZ2h0LWJsdWVcIiB9LFxuICAgICAgICAgICAgICAgICAgICB7IHJnYjogWzI1NSwgODUsIDI1NV0sIGNsYXNzX25hbWU6IFwiYW5zaS1icmlnaHQtbWFnZW50YVwiIH0sXG4gICAgICAgICAgICAgICAgICAgIHsgcmdiOiBbODUsIDI1NSwgMjU1XSwgY2xhc3NfbmFtZTogXCJhbnNpLWJyaWdodC1jeWFuXCIgfSxcbiAgICAgICAgICAgICAgICAgICAgeyByZ2I6IFsyNTUsIDI1NSwgMjU1XSwgY2xhc3NfbmFtZTogXCJhbnNpLWJyaWdodC13aGl0ZVwiIH1cbiAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICBdO1xuICAgICAgICB0aGlzLnBhbGV0dGVfMjU2ID0gW107XG4gICAgICAgIHRoaXMuYW5zaV9jb2xvcnMuZm9yRWFjaChmdW5jdGlvbiAocGFsZXR0ZSkge1xuICAgICAgICAgICAgcGFsZXR0ZS5mb3JFYWNoKGZ1bmN0aW9uIChyZWMpIHtcbiAgICAgICAgICAgICAgICBfdGhpcy5wYWxldHRlXzI1Ni5wdXNoKHJlYyk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgICAgIHZhciBsZXZlbHMgPSBbMCwgOTUsIDEzNSwgMTc1LCAyMTUsIDI1NV07XG4gICAgICAgIGZvciAodmFyIHIgPSAwOyByIDwgNjsgKytyKSB7XG4gICAgICAgICAgICBmb3IgKHZhciBnID0gMDsgZyA8IDY7ICsrZykge1xuICAgICAgICAgICAgICAgIGZvciAodmFyIGIgPSAwOyBiIDwgNjsgKytiKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBjb2wgPSB7IHJnYjogW2xldmVsc1tyXSwgbGV2ZWxzW2ddLCBsZXZlbHNbYl1dLCBjbGFzc19uYW1lOiAndHJ1ZWNvbG9yJyB9O1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnBhbGV0dGVfMjU2LnB1c2goY29sKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgdmFyIGdyZXlfbGV2ZWwgPSA4O1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IDI0OyArK2ksIGdyZXlfbGV2ZWwgKz0gMTApIHtcbiAgICAgICAgICAgIHZhciBncnkgPSB7IHJnYjogW2dyZXlfbGV2ZWwsIGdyZXlfbGV2ZWwsIGdyZXlfbGV2ZWxdLCBjbGFzc19uYW1lOiAndHJ1ZWNvbG9yJyB9O1xuICAgICAgICAgICAgdGhpcy5wYWxldHRlXzI1Ni5wdXNoKGdyeSk7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIEFuc2lVcC5wcm90b3R5cGUuZXNjYXBlX3R4dF9mb3JfaHRtbCA9IGZ1bmN0aW9uICh0eHQpIHtcbiAgICAgICAgcmV0dXJuIHR4dC5yZXBsYWNlKC9bJjw+XS9nbSwgZnVuY3Rpb24gKHN0cikge1xuICAgICAgICAgICAgaWYgKHN0ciA9PT0gXCImXCIpXG4gICAgICAgICAgICAgICAgcmV0dXJuIFwiJmFtcDtcIjtcbiAgICAgICAgICAgIGlmIChzdHIgPT09IFwiPFwiKVxuICAgICAgICAgICAgICAgIHJldHVybiBcIiZsdDtcIjtcbiAgICAgICAgICAgIGlmIChzdHIgPT09IFwiPlwiKVxuICAgICAgICAgICAgICAgIHJldHVybiBcIiZndDtcIjtcbiAgICAgICAgfSk7XG4gICAgfTtcbiAgICBBbnNpVXAucHJvdG90eXBlLmFwcGVuZF9idWZmZXIgPSBmdW5jdGlvbiAodHh0KSB7XG4gICAgICAgIHZhciBzdHIgPSB0aGlzLl9idWZmZXIgKyB0eHQ7XG4gICAgICAgIHRoaXMuX2J1ZmZlciA9IHN0cjtcbiAgICB9O1xuICAgIEFuc2lVcC5wcm90b3R5cGUuZ2V0X25leHRfcGFja2V0ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgcGt0ID0ge1xuICAgICAgICAgICAga2luZDogUGFja2V0S2luZC5FT1MsXG4gICAgICAgICAgICB0ZXh0OiAnJyxcbiAgICAgICAgICAgIHVybDogJydcbiAgICAgICAgfTtcbiAgICAgICAgdmFyIGxlbiA9IHRoaXMuX2J1ZmZlci5sZW5ndGg7XG4gICAgICAgIGlmIChsZW4gPT0gMClcbiAgICAgICAgICAgIHJldHVybiBwa3Q7XG4gICAgICAgIHZhciBwb3MgPSB0aGlzLl9idWZmZXIuaW5kZXhPZihcIlxceDFCXCIpO1xuICAgICAgICBpZiAocG9zID09IC0xKSB7XG4gICAgICAgICAgICBwa3Qua2luZCA9IFBhY2tldEtpbmQuVGV4dDtcbiAgICAgICAgICAgIHBrdC50ZXh0ID0gdGhpcy5fYnVmZmVyO1xuICAgICAgICAgICAgdGhpcy5fYnVmZmVyID0gJyc7XG4gICAgICAgICAgICByZXR1cm4gcGt0O1xuICAgICAgICB9XG4gICAgICAgIGlmIChwb3MgPiAwKSB7XG4gICAgICAgICAgICBwa3Qua2luZCA9IFBhY2tldEtpbmQuVGV4dDtcbiAgICAgICAgICAgIHBrdC50ZXh0ID0gdGhpcy5fYnVmZmVyLnNsaWNlKDAsIHBvcyk7XG4gICAgICAgICAgICB0aGlzLl9idWZmZXIgPSB0aGlzLl9idWZmZXIuc2xpY2UocG9zKTtcbiAgICAgICAgICAgIHJldHVybiBwa3Q7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHBvcyA9PSAwKSB7XG4gICAgICAgICAgICBpZiAobGVuID09IDEpIHtcbiAgICAgICAgICAgICAgICBwa3Qua2luZCA9IFBhY2tldEtpbmQuSW5jb21wbGV0ZTtcbiAgICAgICAgICAgICAgICByZXR1cm4gcGt0O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdmFyIG5leHRfY2hhciA9IHRoaXMuX2J1ZmZlci5jaGFyQXQoMSk7XG4gICAgICAgICAgICBpZiAoKG5leHRfY2hhciAhPSAnWycpICYmIChuZXh0X2NoYXIgIT0gJ10nKSkge1xuICAgICAgICAgICAgICAgIHBrdC5raW5kID0gUGFja2V0S2luZC5FU0M7XG4gICAgICAgICAgICAgICAgcGt0LnRleHQgPSB0aGlzLl9idWZmZXIuc2xpY2UoMCwgMSk7XG4gICAgICAgICAgICAgICAgdGhpcy5fYnVmZmVyID0gdGhpcy5fYnVmZmVyLnNsaWNlKDEpO1xuICAgICAgICAgICAgICAgIHJldHVybiBwa3Q7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAobmV4dF9jaGFyID09ICdbJykge1xuICAgICAgICAgICAgICAgIGlmICghdGhpcy5fY3NpX3JlZ2V4KSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2NzaV9yZWdleCA9IHJneChfX21ha2VUZW1wbGF0ZU9iamVjdChbXCJcXG4gICAgICAgICAgICAgICAgICAgICAgICBeICAgICAgICAgICAgICAgICAgICAgICAgICAgIyBiZWdpbm5pbmcgb2YgbGluZVxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAjXFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICMgRmlyc3QgYXR0ZW1wdFxcbiAgICAgICAgICAgICAgICAgICAgICAgICg/OiAgICAgICAgICAgICAgICAgICAgICAgICAjIGxlZ2FsIHNlcXVlbmNlXFxuICAgICAgICAgICAgICAgICAgICAgICAgICBcXHUwMDFCWyAgICAgICAgICAgICAgICAgICAgICAjIENTSVxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgKFs8LT9dPykgICAgICAgICAgICAgICMgcHJpdmF0ZS1tb2RlIGNoYXJcXG4gICAgICAgICAgICAgICAgICAgICAgICAgIChbZDtdKikgICAgICAgICAgICAgICAgICAgICMgYW55IGRpZ2l0cyBvciBzZW1pY29sb25zXFxuICAgICAgICAgICAgICAgICAgICAgICAgICAoWyAtL10/ICAgICAgICAgICAgICAgIyBhbiBpbnRlcm1lZGlhdGUgbW9kaWZpZXJcXG4gICAgICAgICAgICAgICAgICAgICAgICAgIFtALX5dKSAgICAgICAgICAgICAgICAjIHRoZSBjb21tYW5kXFxuICAgICAgICAgICAgICAgICAgICAgICAgKVxcbiAgICAgICAgICAgICAgICAgICAgICAgIHwgICAgICAgICAgICAgICAgICAgICAgICAgICAjIGFsdGVybmF0ZSAoc2Vjb25kIGF0dGVtcHQpXFxuICAgICAgICAgICAgICAgICAgICAgICAgKD86ICAgICAgICAgICAgICAgICAgICAgICAgICMgaWxsZWdhbCBzZXF1ZW5jZVxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgXFx1MDAxQlsgICAgICAgICAgICAgICAgICAgICAgIyBDU0lcXG4gICAgICAgICAgICAgICAgICAgICAgICAgIFsgLX5dKiAgICAgICAgICAgICAgICAjIGFueXRoaW5nIGxlZ2FsXFxuICAgICAgICAgICAgICAgICAgICAgICAgICAoW1xcMC1cXHUwMDFGOl0pICAgICAgICAgICAgICAjIGFueXRoaW5nIGlsbGVnYWxcXG4gICAgICAgICAgICAgICAgICAgICAgICApXFxuICAgICAgICAgICAgICAgICAgICBcIl0sIFtcIlxcbiAgICAgICAgICAgICAgICAgICAgICAgIF4gICAgICAgICAgICAgICAgICAgICAgICAgICAjIGJlZ2lubmluZyBvZiBsaW5lXFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICNcXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIyBGaXJzdCBhdHRlbXB0XFxuICAgICAgICAgICAgICAgICAgICAgICAgKD86ICAgICAgICAgICAgICAgICAgICAgICAgICMgbGVnYWwgc2VxdWVuY2VcXG4gICAgICAgICAgICAgICAgICAgICAgICAgIFxcXFx4MWJcXFxcWyAgICAgICAgICAgICAgICAgICAgICAjIENTSVxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgKFtcXFxceDNjLVxcXFx4M2ZdPykgICAgICAgICAgICAgICMgcHJpdmF0ZS1tb2RlIGNoYXJcXG4gICAgICAgICAgICAgICAgICAgICAgICAgIChbXFxcXGQ7XSopICAgICAgICAgICAgICAgICAgICAjIGFueSBkaWdpdHMgb3Igc2VtaWNvbG9uc1xcbiAgICAgICAgICAgICAgICAgICAgICAgICAgKFtcXFxceDIwLVxcXFx4MmZdPyAgICAgICAgICAgICAgICMgYW4gaW50ZXJtZWRpYXRlIG1vZGlmaWVyXFxuICAgICAgICAgICAgICAgICAgICAgICAgICBbXFxcXHg0MC1cXFxceDdlXSkgICAgICAgICAgICAgICAgIyB0aGUgY29tbWFuZFxcbiAgICAgICAgICAgICAgICAgICAgICAgIClcXG4gICAgICAgICAgICAgICAgICAgICAgICB8ICAgICAgICAgICAgICAgICAgICAgICAgICAgIyBhbHRlcm5hdGUgKHNlY29uZCBhdHRlbXB0KVxcbiAgICAgICAgICAgICAgICAgICAgICAgICg/OiAgICAgICAgICAgICAgICAgICAgICAgICAjIGlsbGVnYWwgc2VxdWVuY2VcXG4gICAgICAgICAgICAgICAgICAgICAgICAgIFxcXFx4MWJcXFxcWyAgICAgICAgICAgICAgICAgICAgICAjIENTSVxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgW1xcXFx4MjAtXFxcXHg3ZV0qICAgICAgICAgICAgICAgICMgYW55dGhpbmcgbGVnYWxcXG4gICAgICAgICAgICAgICAgICAgICAgICAgIChbXFxcXHgwMC1cXFxceDFmOl0pICAgICAgICAgICAgICAjIGFueXRoaW5nIGlsbGVnYWxcXG4gICAgICAgICAgICAgICAgICAgICAgICApXFxuICAgICAgICAgICAgICAgICAgICBcIl0pKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdmFyIG1hdGNoID0gdGhpcy5fYnVmZmVyLm1hdGNoKHRoaXMuX2NzaV9yZWdleCk7XG4gICAgICAgICAgICAgICAgaWYgKG1hdGNoID09PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgICAgIHBrdC5raW5kID0gUGFja2V0S2luZC5JbmNvbXBsZXRlO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcGt0O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAobWF0Y2hbNF0pIHtcbiAgICAgICAgICAgICAgICAgICAgcGt0LmtpbmQgPSBQYWNrZXRLaW5kLkVTQztcbiAgICAgICAgICAgICAgICAgICAgcGt0LnRleHQgPSB0aGlzLl9idWZmZXIuc2xpY2UoMCwgMSk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2J1ZmZlciA9IHRoaXMuX2J1ZmZlci5zbGljZSgxKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHBrdDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKChtYXRjaFsxXSAhPSAnJykgfHwgKG1hdGNoWzNdICE9ICdtJykpXG4gICAgICAgICAgICAgICAgICAgIHBrdC5raW5kID0gUGFja2V0S2luZC5Vbmtub3duO1xuICAgICAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICAgICAgcGt0LmtpbmQgPSBQYWNrZXRLaW5kLlNHUjtcbiAgICAgICAgICAgICAgICBwa3QudGV4dCA9IG1hdGNoWzJdO1xuICAgICAgICAgICAgICAgIHZhciBycG9zID0gbWF0Y2hbMF0ubGVuZ3RoO1xuICAgICAgICAgICAgICAgIHRoaXMuX2J1ZmZlciA9IHRoaXMuX2J1ZmZlci5zbGljZShycG9zKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gcGt0O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKG5leHRfY2hhciA9PSAnXScpIHtcbiAgICAgICAgICAgICAgICBpZiAobGVuIDwgNCkge1xuICAgICAgICAgICAgICAgICAgICBwa3Qua2luZCA9IFBhY2tldEtpbmQuSW5jb21wbGV0ZTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHBrdDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKCh0aGlzLl9idWZmZXIuY2hhckF0KDIpICE9ICc4JylcbiAgICAgICAgICAgICAgICAgICAgfHwgKHRoaXMuX2J1ZmZlci5jaGFyQXQoMykgIT0gJzsnKSkge1xuICAgICAgICAgICAgICAgICAgICBwa3Qua2luZCA9IFBhY2tldEtpbmQuRVNDO1xuICAgICAgICAgICAgICAgICAgICBwa3QudGV4dCA9IHRoaXMuX2J1ZmZlci5zbGljZSgwLCAxKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fYnVmZmVyID0gdGhpcy5fYnVmZmVyLnNsaWNlKDEpO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcGt0O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAoIXRoaXMuX29zY19zdCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9vc2Nfc3QgPSByZ3hHKF9fbWFrZVRlbXBsYXRlT2JqZWN0KFtcIlxcbiAgICAgICAgICAgICAgICAgICAgICAgICg/OiAgICAgICAgICAgICAgICAgICAgICAgICAjIGxlZ2FsIHNlcXVlbmNlXFxuICAgICAgICAgICAgICAgICAgICAgICAgICAoXFx1MDAxQlxcXFwpICAgICAgICAgICAgICAgICAgICAjIEVTQyAgICAgICAgICAgICAgICAgICAgICAgICAgIHwgICAgICAgICAgICAgICAgICAgICAgICAgICAjIGFsdGVybmF0ZVxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgKFxcdTAwMDcpICAgICAgICAgICAgICAgICAgICAgICMgQkVMICh3aGF0IHh0ZXJtIGRpZClcXG4gICAgICAgICAgICAgICAgICAgICAgICApXFxuICAgICAgICAgICAgICAgICAgICAgICAgfCAgICAgICAgICAgICAgICAgICAgICAgICAgICMgYWx0ZXJuYXRlIChzZWNvbmQgYXR0ZW1wdClcXG4gICAgICAgICAgICAgICAgICAgICAgICAoICAgICAgICAgICAgICAgICAgICAgICAgICAgIyBpbGxlZ2FsIHNlcXVlbmNlXFxuICAgICAgICAgICAgICAgICAgICAgICAgICBbXFwwLVxcdTAwMDZdICAgICAgICAgICAgICAgICAjIGFueXRoaW5nIGlsbGVnYWxcXG4gICAgICAgICAgICAgICAgICAgICAgICAgIHwgICAgICAgICAgICAgICAgICAgICAgICAgICAjIGFsdGVybmF0ZVxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgW1xcYi1cXHUwMDFBXSAgICAgICAgICAgICAgICAgIyBhbnl0aGluZyBpbGxlZ2FsXFxuICAgICAgICAgICAgICAgICAgICAgICAgICB8ICAgICAgICAgICAgICAgICAgICAgICAgICAgIyBhbHRlcm5hdGVcXG4gICAgICAgICAgICAgICAgICAgICAgICAgIFtcXHUwMDFDLVxcdTAwMUZdICAgICAgICAgICAgICAgICAjIGFueXRoaW5nIGlsbGVnYWxcXG4gICAgICAgICAgICAgICAgICAgICAgICApXFxuICAgICAgICAgICAgICAgICAgICBcIl0sIFtcIlxcbiAgICAgICAgICAgICAgICAgICAgICAgICg/OiAgICAgICAgICAgICAgICAgICAgICAgICAjIGxlZ2FsIHNlcXVlbmNlXFxuICAgICAgICAgICAgICAgICAgICAgICAgICAoXFxcXHgxYlxcXFxcXFxcKSAgICAgICAgICAgICAgICAgICAgIyBFU0MgXFxcXFxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgfCAgICAgICAgICAgICAgICAgICAgICAgICAgICMgYWx0ZXJuYXRlXFxuICAgICAgICAgICAgICAgICAgICAgICAgICAoXFxcXHgwNykgICAgICAgICAgICAgICAgICAgICAgIyBCRUwgKHdoYXQgeHRlcm0gZGlkKVxcbiAgICAgICAgICAgICAgICAgICAgICAgIClcXG4gICAgICAgICAgICAgICAgICAgICAgICB8ICAgICAgICAgICAgICAgICAgICAgICAgICAgIyBhbHRlcm5hdGUgKHNlY29uZCBhdHRlbXB0KVxcbiAgICAgICAgICAgICAgICAgICAgICAgICggICAgICAgICAgICAgICAgICAgICAgICAgICAjIGlsbGVnYWwgc2VxdWVuY2VcXG4gICAgICAgICAgICAgICAgICAgICAgICAgIFtcXFxceDAwLVxcXFx4MDZdICAgICAgICAgICAgICAgICAjIGFueXRoaW5nIGlsbGVnYWxcXG4gICAgICAgICAgICAgICAgICAgICAgICAgIHwgICAgICAgICAgICAgICAgICAgICAgICAgICAjIGFsdGVybmF0ZVxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgW1xcXFx4MDgtXFxcXHgxYV0gICAgICAgICAgICAgICAgICMgYW55dGhpbmcgaWxsZWdhbFxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgfCAgICAgICAgICAgICAgICAgICAgICAgICAgICMgYWx0ZXJuYXRlXFxuICAgICAgICAgICAgICAgICAgICAgICAgICBbXFxcXHgxYy1cXFxceDFmXSAgICAgICAgICAgICAgICAgIyBhbnl0aGluZyBpbGxlZ2FsXFxuICAgICAgICAgICAgICAgICAgICAgICAgKVxcbiAgICAgICAgICAgICAgICAgICAgXCJdKSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHRoaXMuX29zY19zdC5sYXN0SW5kZXggPSAwO1xuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIG1hdGNoXzEgPSB0aGlzLl9vc2Nfc3QuZXhlYyh0aGlzLl9idWZmZXIpO1xuICAgICAgICAgICAgICAgICAgICBpZiAobWF0Y2hfMSA9PT0gbnVsbCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcGt0LmtpbmQgPSBQYWNrZXRLaW5kLkluY29tcGxldGU7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gcGt0O1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGlmIChtYXRjaF8xWzNdKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBwa3Qua2luZCA9IFBhY2tldEtpbmQuRVNDO1xuICAgICAgICAgICAgICAgICAgICAgICAgcGt0LnRleHQgPSB0aGlzLl9idWZmZXIuc2xpY2UoMCwgMSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9idWZmZXIgPSB0aGlzLl9idWZmZXIuc2xpY2UoMSk7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gcGt0O1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIG1hdGNoXzIgPSB0aGlzLl9vc2Nfc3QuZXhlYyh0aGlzLl9idWZmZXIpO1xuICAgICAgICAgICAgICAgICAgICBpZiAobWF0Y2hfMiA9PT0gbnVsbCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcGt0LmtpbmQgPSBQYWNrZXRLaW5kLkluY29tcGxldGU7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gcGt0O1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGlmIChtYXRjaF8yWzNdKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBwa3Qua2luZCA9IFBhY2tldEtpbmQuRVNDO1xuICAgICAgICAgICAgICAgICAgICAgICAgcGt0LnRleHQgPSB0aGlzLl9idWZmZXIuc2xpY2UoMCwgMSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9idWZmZXIgPSB0aGlzLl9idWZmZXIuc2xpY2UoMSk7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gcGt0O1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmICghdGhpcy5fb3NjX3JlZ2V4KSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX29zY19yZWdleCA9IHJneChfX21ha2VUZW1wbGF0ZU9iamVjdChbXCJcXG4gICAgICAgICAgICAgICAgICAgICAgICBeICAgICAgICAgICAgICAgICAgICAgICAgICAgIyBiZWdpbm5pbmcgb2YgbGluZVxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAjXFxuICAgICAgICAgICAgICAgICAgICAgICAgXFx1MDAxQl04OyAgICAgICAgICAgICAgICAgICAgIyBPU0MgSHlwZXJsaW5rXFxuICAgICAgICAgICAgICAgICAgICAgICAgWyAtOjwtfl0qICAgICAgICMgcGFyYW1zIChleGNsdWRpbmcgOylcXG4gICAgICAgICAgICAgICAgICAgICAgICA7ICAgICAgICAgICAgICAgICAgICAgICAgICAgIyBlbmQgb2YgcGFyYW1zXFxuICAgICAgICAgICAgICAgICAgICAgICAgKFshLX5dezAsNTEyfSkgICAgICAgICMgVVJMIGNhcHR1cmVcXG4gICAgICAgICAgICAgICAgICAgICAgICAoPzogICAgICAgICAgICAgICAgICAgICAgICAgIyBTVFxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgKD86XFx1MDAxQlxcXFwpICAgICAgICAgICAgICAgICAgIyBFU0MgICAgICAgICAgICAgICAgICAgICAgICAgICB8ICAgICAgICAgICAgICAgICAgICAgICAgICAgIyBhbHRlcm5hdGVcXG4gICAgICAgICAgICAgICAgICAgICAgICAgICg/OlxcdTAwMDcpICAgICAgICAgICAgICAgICAgICAjIEJFTCAod2hhdCB4dGVybSBkaWQpXFxuICAgICAgICAgICAgICAgICAgICAgICAgKVxcbiAgICAgICAgICAgICAgICAgICAgICAgIChbIS1+XSspICAgICAgICAgICAgICAjIFRFWFQgY2FwdHVyZVxcbiAgICAgICAgICAgICAgICAgICAgICAgIFxcdTAwMUJdODs7ICAgICAgICAgICAgICAgICAgICMgT1NDIEh5cGVybGluayBFbmRcXG4gICAgICAgICAgICAgICAgICAgICAgICAoPzogICAgICAgICAgICAgICAgICAgICAgICAgIyBTVFxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgKD86XFx1MDAxQlxcXFwpICAgICAgICAgICAgICAgICAgIyBFU0MgICAgICAgICAgICAgICAgICAgICAgICAgICB8ICAgICAgICAgICAgICAgICAgICAgICAgICAgIyBhbHRlcm5hdGVcXG4gICAgICAgICAgICAgICAgICAgICAgICAgICg/OlxcdTAwMDcpICAgICAgICAgICAgICAgICAgICAjIEJFTCAod2hhdCB4dGVybSBkaWQpXFxuICAgICAgICAgICAgICAgICAgICAgICAgKVxcbiAgICAgICAgICAgICAgICAgICAgXCJdLCBbXCJcXG4gICAgICAgICAgICAgICAgICAgICAgICBeICAgICAgICAgICAgICAgICAgICAgICAgICAgIyBiZWdpbm5pbmcgb2YgbGluZVxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAjXFxuICAgICAgICAgICAgICAgICAgICAgICAgXFxcXHgxYlxcXFxdODsgICAgICAgICAgICAgICAgICAgICMgT1NDIEh5cGVybGlua1xcbiAgICAgICAgICAgICAgICAgICAgICAgIFtcXFxceDIwLVxcXFx4M2FcXFxceDNjLVxcXFx4N2VdKiAgICAgICAjIHBhcmFtcyAoZXhjbHVkaW5nIDspXFxuICAgICAgICAgICAgICAgICAgICAgICAgOyAgICAgICAgICAgICAgICAgICAgICAgICAgICMgZW5kIG9mIHBhcmFtc1xcbiAgICAgICAgICAgICAgICAgICAgICAgIChbXFxcXHgyMS1cXFxceDdlXXswLDUxMn0pICAgICAgICAjIFVSTCBjYXB0dXJlXFxuICAgICAgICAgICAgICAgICAgICAgICAgKD86ICAgICAgICAgICAgICAgICAgICAgICAgICMgU1RcXG4gICAgICAgICAgICAgICAgICAgICAgICAgICg/OlxcXFx4MWJcXFxcXFxcXCkgICAgICAgICAgICAgICAgICAjIEVTQyBcXFxcXFxuICAgICAgICAgICAgICAgICAgICAgICAgICB8ICAgICAgICAgICAgICAgICAgICAgICAgICAgIyBhbHRlcm5hdGVcXG4gICAgICAgICAgICAgICAgICAgICAgICAgICg/OlxcXFx4MDcpICAgICAgICAgICAgICAgICAgICAjIEJFTCAod2hhdCB4dGVybSBkaWQpXFxuICAgICAgICAgICAgICAgICAgICAgICAgKVxcbiAgICAgICAgICAgICAgICAgICAgICAgIChbXFxcXHgyMS1cXFxceDdlXSspICAgICAgICAgICAgICAjIFRFWFQgY2FwdHVyZVxcbiAgICAgICAgICAgICAgICAgICAgICAgIFxcXFx4MWJcXFxcXTg7OyAgICAgICAgICAgICAgICAgICAjIE9TQyBIeXBlcmxpbmsgRW5kXFxuICAgICAgICAgICAgICAgICAgICAgICAgKD86ICAgICAgICAgICAgICAgICAgICAgICAgICMgU1RcXG4gICAgICAgICAgICAgICAgICAgICAgICAgICg/OlxcXFx4MWJcXFxcXFxcXCkgICAgICAgICAgICAgICAgICAjIEVTQyBcXFxcXFxuICAgICAgICAgICAgICAgICAgICAgICAgICB8ICAgICAgICAgICAgICAgICAgICAgICAgICAgIyBhbHRlcm5hdGVcXG4gICAgICAgICAgICAgICAgICAgICAgICAgICg/OlxcXFx4MDcpICAgICAgICAgICAgICAgICAgICAjIEJFTCAod2hhdCB4dGVybSBkaWQpXFxuICAgICAgICAgICAgICAgICAgICAgICAgKVxcbiAgICAgICAgICAgICAgICAgICAgXCJdKSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHZhciBtYXRjaCA9IHRoaXMuX2J1ZmZlci5tYXRjaCh0aGlzLl9vc2NfcmVnZXgpO1xuICAgICAgICAgICAgICAgIGlmIChtYXRjaCA9PT0gbnVsbCkge1xuICAgICAgICAgICAgICAgICAgICBwa3Qua2luZCA9IFBhY2tldEtpbmQuRVNDO1xuICAgICAgICAgICAgICAgICAgICBwa3QudGV4dCA9IHRoaXMuX2J1ZmZlci5zbGljZSgwLCAxKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fYnVmZmVyID0gdGhpcy5fYnVmZmVyLnNsaWNlKDEpO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcGt0O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBwa3Qua2luZCA9IFBhY2tldEtpbmQuT1NDVVJMO1xuICAgICAgICAgICAgICAgIHBrdC51cmwgPSBtYXRjaFsxXTtcbiAgICAgICAgICAgICAgICBwa3QudGV4dCA9IG1hdGNoWzJdO1xuICAgICAgICAgICAgICAgIHZhciBycG9zID0gbWF0Y2hbMF0ubGVuZ3RoO1xuICAgICAgICAgICAgICAgIHRoaXMuX2J1ZmZlciA9IHRoaXMuX2J1ZmZlci5zbGljZShycG9zKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gcGt0O1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfTtcbiAgICBBbnNpVXAucHJvdG90eXBlLmFuc2lfdG9faHRtbCA9IGZ1bmN0aW9uICh0eHQpIHtcbiAgICAgICAgdGhpcy5hcHBlbmRfYnVmZmVyKHR4dCk7XG4gICAgICAgIHZhciBibG9ja3MgPSBbXTtcbiAgICAgICAgd2hpbGUgKHRydWUpIHtcbiAgICAgICAgICAgIHZhciBwYWNrZXQgPSB0aGlzLmdldF9uZXh0X3BhY2tldCgpO1xuICAgICAgICAgICAgaWYgKChwYWNrZXQua2luZCA9PSBQYWNrZXRLaW5kLkVPUylcbiAgICAgICAgICAgICAgICB8fCAocGFja2V0LmtpbmQgPT0gUGFja2V0S2luZC5JbmNvbXBsZXRlKSlcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGlmICgocGFja2V0LmtpbmQgPT0gUGFja2V0S2luZC5FU0MpXG4gICAgICAgICAgICAgICAgfHwgKHBhY2tldC5raW5kID09IFBhY2tldEtpbmQuVW5rbm93bikpXG4gICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICBpZiAocGFja2V0LmtpbmQgPT0gUGFja2V0S2luZC5UZXh0KVxuICAgICAgICAgICAgICAgIGJsb2Nrcy5wdXNoKHRoaXMudHJhbnNmb3JtX3RvX2h0bWwodGhpcy53aXRoX3N0YXRlKHBhY2tldCkpKTtcbiAgICAgICAgICAgIGVsc2UgaWYgKHBhY2tldC5raW5kID09IFBhY2tldEtpbmQuU0dSKVxuICAgICAgICAgICAgICAgIHRoaXMucHJvY2Vzc19hbnNpKHBhY2tldCk7XG4gICAgICAgICAgICBlbHNlIGlmIChwYWNrZXQua2luZCA9PSBQYWNrZXRLaW5kLk9TQ1VSTClcbiAgICAgICAgICAgICAgICBibG9ja3MucHVzaCh0aGlzLnByb2Nlc3NfaHlwZXJsaW5rKHBhY2tldCkpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBibG9ja3Muam9pbihcIlwiKTtcbiAgICB9O1xuICAgIEFuc2lVcC5wcm90b3R5cGUud2l0aF9zdGF0ZSA9IGZ1bmN0aW9uIChwa3QpIHtcbiAgICAgICAgcmV0dXJuIHsgYm9sZDogdGhpcy5ib2xkLCBmZzogdGhpcy5mZywgYmc6IHRoaXMuYmcsIHRleHQ6IHBrdC50ZXh0IH07XG4gICAgfTtcbiAgICBBbnNpVXAucHJvdG90eXBlLnByb2Nlc3NfYW5zaSA9IGZ1bmN0aW9uIChwa3QpIHtcbiAgICAgICAgdmFyIHNncl9jbWRzID0gcGt0LnRleHQuc3BsaXQoJzsnKTtcbiAgICAgICAgd2hpbGUgKHNncl9jbWRzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIHZhciBzZ3JfY21kX3N0ciA9IHNncl9jbWRzLnNoaWZ0KCk7XG4gICAgICAgICAgICB2YXIgbnVtID0gcGFyc2VJbnQoc2dyX2NtZF9zdHIsIDEwKTtcbiAgICAgICAgICAgIGlmIChpc05hTihudW0pIHx8IG51bSA9PT0gMCkge1xuICAgICAgICAgICAgICAgIHRoaXMuZmcgPSB0aGlzLmJnID0gbnVsbDtcbiAgICAgICAgICAgICAgICB0aGlzLmJvbGQgPSBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKG51bSA9PT0gMSkge1xuICAgICAgICAgICAgICAgIHRoaXMuYm9sZCA9IHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmIChudW0gPT09IDIyKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5ib2xkID0gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmIChudW0gPT09IDM5KSB7XG4gICAgICAgICAgICAgICAgdGhpcy5mZyA9IG51bGw7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmIChudW0gPT09IDQ5KSB7XG4gICAgICAgICAgICAgICAgdGhpcy5iZyA9IG51bGw7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmICgobnVtID49IDMwKSAmJiAobnVtIDwgMzgpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5mZyA9IHRoaXMuYW5zaV9jb2xvcnNbMF1bKG51bSAtIDMwKV07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmICgobnVtID49IDQwKSAmJiAobnVtIDwgNDgpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5iZyA9IHRoaXMuYW5zaV9jb2xvcnNbMF1bKG51bSAtIDQwKV07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmICgobnVtID49IDkwKSAmJiAobnVtIDwgOTgpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5mZyA9IHRoaXMuYW5zaV9jb2xvcnNbMV1bKG51bSAtIDkwKV07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmICgobnVtID49IDEwMCkgJiYgKG51bSA8IDEwOCkpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmJnID0gdGhpcy5hbnNpX2NvbG9yc1sxXVsobnVtIC0gMTAwKV07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmIChudW0gPT09IDM4IHx8IG51bSA9PT0gNDgpIHtcbiAgICAgICAgICAgICAgICBpZiAoc2dyX2NtZHMubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgaXNfZm9yZWdyb3VuZCA9IChudW0gPT09IDM4KTtcbiAgICAgICAgICAgICAgICAgICAgdmFyIG1vZGVfY21kID0gc2dyX2NtZHMuc2hpZnQoKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKG1vZGVfY21kID09PSAnNScgJiYgc2dyX2NtZHMubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHBhbGV0dGVfaW5kZXggPSBwYXJzZUludChzZ3JfY21kcy5zaGlmdCgpLCAxMCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAocGFsZXR0ZV9pbmRleCA+PSAwICYmIHBhbGV0dGVfaW5kZXggPD0gMjU1KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGlzX2ZvcmVncm91bmQpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZmcgPSB0aGlzLnBhbGV0dGVfMjU2W3BhbGV0dGVfaW5kZXhdO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5iZyA9IHRoaXMucGFsZXR0ZV8yNTZbcGFsZXR0ZV9pbmRleF07XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgaWYgKG1vZGVfY21kID09PSAnMicgJiYgc2dyX2NtZHMubGVuZ3RoID4gMikge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHIgPSBwYXJzZUludChzZ3JfY21kcy5zaGlmdCgpLCAxMCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgZyA9IHBhcnNlSW50KHNncl9jbWRzLnNoaWZ0KCksIDEwKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBiID0gcGFyc2VJbnQoc2dyX2NtZHMuc2hpZnQoKSwgMTApO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKChyID49IDAgJiYgciA8PSAyNTUpICYmIChnID49IDAgJiYgZyA8PSAyNTUpICYmIChiID49IDAgJiYgYiA8PSAyNTUpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGMgPSB7IHJnYjogW3IsIGcsIGJdLCBjbGFzc19uYW1lOiAndHJ1ZWNvbG9yJyB9O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpc19mb3JlZ3JvdW5kKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmZnID0gYztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuYmcgPSBjO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfTtcbiAgICBBbnNpVXAucHJvdG90eXBlLnRyYW5zZm9ybV90b19odG1sID0gZnVuY3Rpb24gKGZyYWdtZW50KSB7XG4gICAgICAgIHZhciB0eHQgPSBmcmFnbWVudC50ZXh0O1xuICAgICAgICBpZiAodHh0Lmxlbmd0aCA9PT0gMClcbiAgICAgICAgICAgIHJldHVybiB0eHQ7XG4gICAgICAgIGlmICh0aGlzLl9lc2NhcGVfZm9yX2h0bWwpXG4gICAgICAgICAgICB0eHQgPSB0aGlzLmVzY2FwZV90eHRfZm9yX2h0bWwodHh0KTtcbiAgICAgICAgaWYgKCFmcmFnbWVudC5ib2xkICYmIGZyYWdtZW50LmZnID09PSBudWxsICYmIGZyYWdtZW50LmJnID09PSBudWxsKVxuICAgICAgICAgICAgcmV0dXJuIHR4dDtcbiAgICAgICAgdmFyIHN0eWxlcyA9IFtdO1xuICAgICAgICB2YXIgY2xhc3NlcyA9IFtdO1xuICAgICAgICB2YXIgZmcgPSBmcmFnbWVudC5mZztcbiAgICAgICAgdmFyIGJnID0gZnJhZ21lbnQuYmc7XG4gICAgICAgIGlmIChmcmFnbWVudC5ib2xkKVxuICAgICAgICAgICAgc3R5bGVzLnB1c2goJ2ZvbnQtd2VpZ2h0OmJvbGQnKTtcbiAgICAgICAgaWYgKCF0aGlzLl91c2VfY2xhc3Nlcykge1xuICAgICAgICAgICAgaWYgKGZnKVxuICAgICAgICAgICAgICAgIHN0eWxlcy5wdXNoKFwiY29sb3I6cmdiKFwiICsgZmcucmdiLmpvaW4oJywnKSArIFwiKVwiKTtcbiAgICAgICAgICAgIGlmIChiZylcbiAgICAgICAgICAgICAgICBzdHlsZXMucHVzaChcImJhY2tncm91bmQtY29sb3I6cmdiKFwiICsgYmcucmdiICsgXCIpXCIpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgaWYgKGZnKSB7XG4gICAgICAgICAgICAgICAgaWYgKGZnLmNsYXNzX25hbWUgIT09ICd0cnVlY29sb3InKSB7XG4gICAgICAgICAgICAgICAgICAgIGNsYXNzZXMucHVzaChmZy5jbGFzc19uYW1lICsgXCItZmdcIik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBzdHlsZXMucHVzaChcImNvbG9yOnJnYihcIiArIGZnLnJnYi5qb2luKCcsJykgKyBcIilcIik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGJnKSB7XG4gICAgICAgICAgICAgICAgaWYgKGJnLmNsYXNzX25hbWUgIT09ICd0cnVlY29sb3InKSB7XG4gICAgICAgICAgICAgICAgICAgIGNsYXNzZXMucHVzaChiZy5jbGFzc19uYW1lICsgXCItYmdcIik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBzdHlsZXMucHVzaChcImJhY2tncm91bmQtY29sb3I6cmdiKFwiICsgYmcucmdiLmpvaW4oJywnKSArIFwiKVwiKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgdmFyIGNsYXNzX3N0cmluZyA9ICcnO1xuICAgICAgICB2YXIgc3R5bGVfc3RyaW5nID0gJyc7XG4gICAgICAgIGlmIChjbGFzc2VzLmxlbmd0aClcbiAgICAgICAgICAgIGNsYXNzX3N0cmluZyA9IFwiIGNsYXNzPVxcXCJcIiArIGNsYXNzZXMuam9pbignICcpICsgXCJcXFwiXCI7XG4gICAgICAgIGlmIChzdHlsZXMubGVuZ3RoKVxuICAgICAgICAgICAgc3R5bGVfc3RyaW5nID0gXCIgc3R5bGU9XFxcIlwiICsgc3R5bGVzLmpvaW4oJzsnKSArIFwiXFxcIlwiO1xuICAgICAgICByZXR1cm4gXCI8c3BhblwiICsgc3R5bGVfc3RyaW5nICsgY2xhc3Nfc3RyaW5nICsgXCI+XCIgKyB0eHQgKyBcIjwvc3Bhbj5cIjtcbiAgICB9O1xuICAgIDtcbiAgICBBbnNpVXAucHJvdG90eXBlLnByb2Nlc3NfaHlwZXJsaW5rID0gZnVuY3Rpb24gKHBrdCkge1xuICAgICAgICB2YXIgcGFydHMgPSBwa3QudXJsLnNwbGl0KCc6Jyk7XG4gICAgICAgIGlmIChwYXJ0cy5sZW5ndGggPCAxKVxuICAgICAgICAgICAgcmV0dXJuICcnO1xuICAgICAgICBpZiAoIXRoaXMuX3VybF93aGl0ZWxpc3RbcGFydHNbMF1dKVxuICAgICAgICAgICAgcmV0dXJuICcnO1xuICAgICAgICB2YXIgcmVzdWx0ID0gXCI8YSBocmVmPVxcXCJcIiArIHRoaXMuZXNjYXBlX3R4dF9mb3JfaHRtbChwa3QudXJsKSArIFwiXFxcIj5cIiArIHRoaXMuZXNjYXBlX3R4dF9mb3JfaHRtbChwa3QudGV4dCkgKyBcIjwvYT5cIjtcbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9O1xuICAgIHJldHVybiBBbnNpVXA7XG59KCkpO1xuZnVuY3Rpb24gcmd4KHRtcGxPYmopIHtcbiAgICB2YXIgc3Vic3QgPSBbXTtcbiAgICBmb3IgKHZhciBfaSA9IDE7IF9pIDwgYXJndW1lbnRzLmxlbmd0aDsgX2krKykge1xuICAgICAgICBzdWJzdFtfaSAtIDFdID0gYXJndW1lbnRzW19pXTtcbiAgICB9XG4gICAgdmFyIHJlZ2V4VGV4dCA9IHRtcGxPYmoucmF3WzBdO1xuICAgIHZhciB3c3JneCA9IC9eXFxzK3xcXHMrXFxufFxccyojW1xcc1xcU10qP1xcbnxcXG4vZ207XG4gICAgdmFyIHR4dDIgPSByZWdleFRleHQucmVwbGFjZSh3c3JneCwgJycpO1xuICAgIHJldHVybiBuZXcgUmVnRXhwKHR4dDIpO1xufVxuZnVuY3Rpb24gcmd4Ryh0bXBsT2JqKSB7XG4gICAgdmFyIHN1YnN0ID0gW107XG4gICAgZm9yICh2YXIgX2kgPSAxOyBfaSA8IGFyZ3VtZW50cy5sZW5ndGg7IF9pKyspIHtcbiAgICAgICAgc3Vic3RbX2kgLSAxXSA9IGFyZ3VtZW50c1tfaV07XG4gICAgfVxuICAgIHZhciByZWdleFRleHQgPSB0bXBsT2JqLnJhd1swXTtcbiAgICB2YXIgd3NyZ3ggPSAvXlxccyt8XFxzK1xcbnxcXHMqI1tcXHNcXFNdKj9cXG58XFxuL2dtO1xuICAgIHZhciB0eHQyID0gcmVnZXhUZXh0LnJlcGxhY2Uod3NyZ3gsICcnKTtcbiAgICByZXR1cm4gbmV3IFJlZ0V4cCh0eHQyLCAnZycpO1xufVxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9YW5zaV91cC5qcy5tYXBcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG4gICAgZXhwb3J0cy5kZWZhdWx0ID0gQW5zaVVwO1xufSkpO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vbm9kZV9tb2R1bGVzL2Fuc2lfdXAvYW5zaV91cC5qcyIsImltcG9ydCB7IFNlcnZpY2UgfSBmcm9tIFwiLi4vY29tbW9uL2FwaVwiO1xuXG5jb25zdCBCQVNFX1VSTCA9IFwiL3plcm9ib3QvYWxlcnRhL2FjdG9ycy9hbGVydGFcIjtcblxuY2xhc3MgQWxlcnRzU2VydmljZSBleHRlbmRzIFNlcnZpY2Uge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICBzdXBlcihCQVNFX1VSTCk7XG4gICAgfVxuXG4gICAgbGlzdCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0Q2FsbChcImxpc3RfYWxlcnRzXCIpO1xuICAgIH1cblxuICAgIGRlbGV0ZShpZGVudGlmaWVycykge1xuICAgICAgICByZXR1cm4gdGhpcy5wb3N0Q2FsbChcImRlbGV0ZV9hbGVydHNcIiwge1xuICAgICAgICAgICAgaWRlbnRpZmllcnM6IGlkZW50aWZpZXJzXG4gICAgICAgIH0pO1xuICAgIH1cbn1cblxuZXhwb3J0IGNvbnN0IGFsZXJ0cyA9IG5ldyBBbGVydHNTZXJ2aWNlKCk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zb3VyY2VzL3NlcnZpY2VzL2FsZXJ0cy5qcyIsImltcG9ydCB7IFNlcnZpY2UgfSBmcm9tIFwiLi4vY29tbW9uL2FwaVwiO1xuXG5jb25zdCBCQVNFX1VSTCA9IFwiL3plcm9ib3QvYWRtaW4vYWN0b3JzL2xvZ3NcIjtcblxuY2xhc3MgTG9nc1NlcnZpY2UgZXh0ZW5kcyBTZXJ2aWNlIHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgc3VwZXIoQkFTRV9VUkwpO1xuICAgIH1cblxuICAgIGxpc3RBcHBzKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5nZXRDYWxsKFwibGlzdF9hcHBzXCIpO1xuICAgIH1cblxuICAgIGxpc3QoYXBwTmFtZSwgbG9nSWQpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucG9zdENhbGwoXCJsaXN0XCIsIHtcbiAgICAgICAgICAgIGFwcG5hbWU6IGFwcE5hbWUsXG4gICAgICAgICAgICBpZF9mcm9tOiBsb2dJZFxuICAgICAgICB9KTtcbiAgICB9XG59XG5cbmV4cG9ydCBjb25zdCBsb2dzID0gbmV3IExvZ3NTZXJ2aWNlKCk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zb3VyY2VzL3NlcnZpY2VzL2xvZ3MuanMiLCJleHBvcnQgZnVuY3Rpb24gaW5wdXREaWFsb2coaGVhZCwgbGFiZWwsIGJ1dHRvbkxhYmVsLCBjYWxsYmFjaykge1xuICAgIGNvbnN0IHdpbmRvdyA9IHdlYml4LnVpKHtcbiAgICAgICAgdmlldzogXCJ3aW5kb3dcIixcbiAgICAgICAgaGVpZ2h0OiAyMDAsXG4gICAgICAgIHdpZHRoOiAzMDAsXG4gICAgICAgIG1vZGFsOiB0cnVlLFxuICAgICAgICBwb3NpdGlvbjogXCJjZW50ZXJcIixcbiAgICAgICAgaGVhZDogaGVhZCB8fCBcIklucHV0XCIsXG4gICAgICAgIGJvZHk6IHtcbiAgICAgICAgICAgIHZpZXc6IFwiZm9ybVwiLFxuICAgICAgICAgICAgZWxlbWVudHM6IFt7XG4gICAgICAgICAgICAgICAgaWQ6IFwiaW5wdXRfZGlhbG9nX3RleHRcIixcbiAgICAgICAgICAgICAgICB2aWV3OiBcInRleHRcIixcbiAgICAgICAgICAgICAgICBuYW1lOiBcImlucHV0XCIsXG4gICAgICAgICAgICAgICAgbGFiZWw6IGxhYmVsIHx8IFwiVmFsdWVcIixcbiAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICBjb2xzOiBbe1xuICAgICAgICAgICAgICAgICAgICB2aWV3OiBcImJ1dHRvblwiLFxuICAgICAgICAgICAgICAgICAgICBsYWJlbDogXCJDYW5jZWxcIixcbiAgICAgICAgICAgICAgICAgICAgY2xpY2s6ICgpID0+IHdpbmRvdy5oaWRlKCksXG4gICAgICAgICAgICAgICAgICAgIGNzczogXCJ3ZWJpeF9kYW5nZXJcIlxuICAgICAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICAgICAgdmlldzogXCJidXR0b25cIixcbiAgICAgICAgICAgICAgICAgICAgbGFiZWw6IGJ1dHRvbkxhYmVsIHx8IFwiT2tcIixcbiAgICAgICAgICAgICAgICAgICAgY2xpY2s6IGhhbmRsZUlucHV0LFxuICAgICAgICAgICAgICAgICAgICBjc3M6IFwid2ViaXhfcHJpbWFyeVwiXG4gICAgICAgICAgICAgICAgfV1cbiAgICAgICAgICAgIH1dXG4gICAgICAgIH1cbiAgICB9KTtcblxuICAgIGZ1bmN0aW9uIGhhbmRsZUlucHV0KCkge1xuICAgICAgICBjb25zdCB2YWx1ZSA9IHRoaXMuZ2V0Rm9ybVZpZXcoKS5lbGVtZW50cy5pbnB1dC5nZXRWYWx1ZSgpLnRyaW0oKTtcbiAgICAgICAgaWYgKCF2YWx1ZSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGNhbGxiYWNrIGluc3RhbmNlb2YgRnVuY3Rpb24pIHtcbiAgICAgICAgICAgIGNhbGxiYWNrKHZhbHVlKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHdpbmRvdy5oaWRlKCk7XG4gICAgfVxuXG5cbiAgICBjb25zdCB0ZXh0SW5wdXQgPSAkJChcImlucHV0X2RpYWxvZ190ZXh0XCIpO1xuICAgIHRleHRJbnB1dC5hdHRhY2hFdmVudChcIm9uRW50ZXJcIiwgaGFuZGxlSW5wdXQuYmluZCh0ZXh0SW5wdXQpKTtcblxuICAgIHdpbmRvdy5zaG93KCk7XG4gICAgd2ViaXguVUlNYW5hZ2VyLnNldEZvY3VzKHRleHRJbnB1dCk7XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zb3VyY2VzL2NvbW1vbi9kaWFsb2dzLmpzIiwidmFyIG1hcCA9IHtcblx0XCIuL2VuXCI6IDMxLFxuXHRcIi4vZW4uanNcIjogMzFcbn07XG5mdW5jdGlvbiB3ZWJwYWNrQ29udGV4dChyZXEpIHtcblx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18od2VicGFja0NvbnRleHRSZXNvbHZlKHJlcSkpO1xufTtcbmZ1bmN0aW9uIHdlYnBhY2tDb250ZXh0UmVzb2x2ZShyZXEpIHtcblx0dmFyIGlkID0gbWFwW3JlcV07XG5cdGlmKCEoaWQgKyAxKSkgLy8gY2hlY2sgZm9yIG51bWJlciBvciBzdHJpbmdcblx0XHR0aHJvdyBuZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiICsgcmVxICsgXCInLlwiKTtcblx0cmV0dXJuIGlkO1xufTtcbndlYnBhY2tDb250ZXh0LmtleXMgPSBmdW5jdGlvbiB3ZWJwYWNrQ29udGV4dEtleXMoKSB7XG5cdHJldHVybiBPYmplY3Qua2V5cyhtYXApO1xufTtcbndlYnBhY2tDb250ZXh0LnJlc29sdmUgPSB3ZWJwYWNrQ29udGV4dFJlc29sdmU7XG5tb2R1bGUuZXhwb3J0cyA9IHdlYnBhY2tDb250ZXh0O1xud2VicGFja0NvbnRleHQuaWQgPSAzOTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3NvdXJjZXMvbG9jYWxlcyBeXFwuXFwvLiokXG4vLyBtb2R1bGUgaWQgPSAzOVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiXSwic291cmNlUm9vdCI6IiJ9
