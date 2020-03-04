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
/******/ 	return __webpack_require__(__webpack_require__.s = 26);
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
        return __webpack_require__(28)("./" + url);
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
        var data = __webpack_require__(32)("./" + path);
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
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return health; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__common_api__ = __webpack_require__(2);
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
/* 2 */
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
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_webix_jet__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__common_colors__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__common_formatters__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__services_alerts__ = __webpack_require__(30);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__alert__ = __webpack_require__(13);
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }









var MAX_MSG_LEN = 100;

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
                css: "webix_header_border webix_data_border",
                columns: [{
                    id: "index",
                    header: "#",
                    sort: "int",
                    autowidth: true
                }, {
                    id: "alert_type",
                    header: "Type",
                    sort: "string"
                }, {
                    id: "count",
                    header: "Count",
                    sort: "int"
                }, {
                    id: "status",
                    header: "Status",
                    sort: "string"
                }, {
                    id: "level",
                    header: "Level",
                    sort: "int"
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
                    format: __WEBPACK_IMPORTED_MODULE_2__common_formatters__["a" /* dateFormatter */],
                    width: 200
                }, {
                    id: "time_last",
                    header: "Last time",
                    sort: "date",
                    format: __WEBPACK_IMPORTED_MODULE_2__common_formatters__["a" /* dateFormatter */],
                    width: 200
                }, {
                    id: "message",
                    header: ["Message", {
                        content: "textFilter"
                    }],
                    sort: "str",
                    fillspace: true,
                    format: function format(value) {
                        if (value.length > MAX_MSG_LEN) {
                            value = value.substr(0, MAX_MSG_LEN) + '...';
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
            __WEBPACK_IMPORTED_MODULE_3__services_alerts__["a" /* alerts */].delete(identifier).then(function () {
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

    AlertsView.prototype.init = function init(view) {
        // this.use(plugins.ProgressBar, "progress");
        var self = this;
        self.table = $$("alerts_table");
        self.alertView = self.ui(__WEBPACK_IMPORTED_MODULE_4__alert__["default"]);

        webix.extend(self.table, webix.ProgressBar);
        webix.ready(function () {
            self.table.clearAll();
            self.table.showProgress({
                hide: false
            });
            __WEBPACK_IMPORTED_MODULE_3__services_alerts__["a" /* alerts */].list().then(function (data) {
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
/* 4 */
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
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_webix_jet__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_health__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_packages__ = __webpack_require__(17);
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }





var CODE_URL = "/codeserver&folder=/sandbox/code";
var PACKAGE_PATH = "/sandbox/code/github/threefoldtech/jumpscaleX_threebot/ThreeBotPackages/zerobot/codeserver";

var CodeserverView = function (_JetView) {
    _inherits(CodeserverView, _JetView);

    function CodeserverView() {
        _classCallCheck(this, CodeserverView);

        return _possibleConstructorReturn(this, _JetView.apply(this, arguments));
    }

    CodeserverView.prototype.config = function config() {
        var iframe = {
            view: "iframe",
            id: "iframe-codeserver",
            on: {
                onAfterLoad: function onAfterLoad() {
                    if (this.hideProgress) {
                        this.hideProgress();
                    }
                    this.enable();
                }
            }
        };

        return {
            type: "space",
            rows: [{
                id: "install-package",
                cols: [{
                    template: "<div style='width:auto;text-align:center'><h3>You need to install Codeserver package<h3/></div>",
                    height: 50,
                    id: "info-message"
                }, {
                    view: "button",
                    id: "install_btn",
                    value: "Install Package",
                    css: "webix_primary",
                    inputWidth: 140,
                    height: 50
                }, {
                    template: "<div style='width:auto;text-align:center'><h3>Codeserver<h3/></div>",
                    height: 50,
                    id: "codeserver_title"
                }]
            }, iframe]
        };
    };

    CodeserverView.prototype.installCodeserverPackage = function installCodeserverPackage() {
        __WEBPACK_IMPORTED_MODULE_2__services_packages__["a" /* packages */].add(PACKAGE_PATH);
    };

    CodeserverView.prototype.init = function init(view) {
        view.codeserverIframe = $$("iframe-codeserver");
        view.installPackageContainer = $$("install-package");

        webix.extend(view.codeserverIframe, webix.ProgressBar);

        view.codeserverIframe.disable();
        view.codeserverIframe.showProgress({ type: "icon" });
        view.codeserverIframe.load(CODE_URL);

        $$("install_btn").attachEvent("onItemClick", function (id) {
            view.installCodeserverPackage();
        });

        __WEBPACK_IMPORTED_MODULE_1__services_health__["a" /* health */].getHealth().then(function (data) {
            var codeServerStatus = data.json().codeserver;
            if (codeServerStatus == "OK") {
                view.codeserverIframe.show();
                view.installPackageContainer.hide();
            } else {
                view.codeserverIframe.show();
                view.installPackageContainer.hide();
            }
        });
    };

    return CodeserverView;
}(__WEBPACK_IMPORTED_MODULE_0_webix_jet__["b" /* JetView */]);

/* harmony default export */ __webpack_exports__["default"] = (CodeserverView);

/***/ }),
/* 6 */
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
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_webix_jet__ = __webpack_require__(0);
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }



var JupyterView = function (_JetView) {
    _inherits(JupyterView, _JetView);

    function JupyterView() {
        _classCallCheck(this, JupyterView);

        return _possibleConstructorReturn(this, _JetView.apply(this, arguments));
    }

    JupyterView.prototype.config = function config() {
        var view = {
            rows: [{
                view: "template",
                type: "header",
                template: "Jupyter"
            }, {
                view: "template",
                template: "2nd row"
            }, {
                cols: [{
                    view: "template",
                    template: "1st col"
                }, {
                    view: "template",
                    template: "2nd col"
                }, {
                    rows: [{
                        view: "list",
                        id: "mylist",
                        template: "#id# - #title#",
                        data: [{
                            id: 1,
                            title: "Item 1"
                        }, {
                            id: 2,
                            title: "Item 2"
                        }, {
                            id: 3,
                            title: "Item 3"
                        }]
                    }, {
                        view: "button",
                        value: "add",
                        click: function click() {
                            this.$scope.addToList();
                        }
                    }]
                }]
            }]
        };

        return view;
    };

    JupyterView.prototype.addToList = function addToList() {
        this.mylist.add({
            id: 5,
            title: "hamada"
        }, 0);
    };

    JupyterView.prototype.init = function init(view) {
        this.mylist = $$("mylist");
    };

    return JupyterView;
}(__WEBPACK_IMPORTED_MODULE_0_webix_jet__["b" /* JetView */]);

/* harmony default export */ __webpack_exports__["default"] = (JupyterView);

/***/ }),
/* 8 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_webix_jet__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__appLogs__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_logs__ = __webpack_require__(31);
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
                    id: "logs_apps",
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

        self.appsComob = $$("apps_combo");
    };

    LogsView.prototype.urlChange = function urlChange(view, url) {
        var appName = url[0].params.appname,
            logId = url[0].params.logid;
        if (appName) {
            this.showFor(appName, logId);
        }
    };

    LogsView.prototype.showFor = function showFor(appName, logId) {
        var _this2 = this;

        var self = this;
        self.appLogs = $$("applogs_table");

        __WEBPACK_IMPORTED_MODULE_2__services_logs__["a" /* logs */].listApps().then(function (data) {
            _this2.appsComob.config.options = data;
            _this2.appsComob.refresh();
        });

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
/* 9 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_webix_jet__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__common_formatters__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_myjobs__ = __webpack_require__(24);
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
/* 10 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_webix_jet__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_packages__ = __webpack_require__(17);
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }




var pkgStatus = [{
    name: "Init",
    actions: ["delete"]
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
                scroll: true,
                autoConfig: true
            }, _ref["view"] = "datatable", _ref.select = true, _ref.css = "webix_header_border webix_data_border", _ref.onContext = {}, _ref.columns = [{
                id: "index",
                header: "#",
                sort: "int",
                autowidth: true
            }, {
                id: "author",
                header: ["Author", {
                    content: "textFilter"
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

    PackagesView.prototype.handleResult = function handleResult(promise, callback) {
        promise.then(function () {
            callback();
            webix.message({
                type: "success",
                text: "The operation has beed done successfully"
            });
        }).catch(function (error) {
            webix.message({
                type: "error",
                text: "error has happened " + error.response
            });
        });
    };

    PackagesView.prototype.addPackage = function addPackage(path, gitUrl) {
        this.handleResult(__WEBPACK_IMPORTED_MODULE_1__services_packages__["a" /* packages */].add(path, gitUrl));
    };

    PackagesView.prototype.deletePackage = function deletePackage(packageName, elementID) {
        var _this2 = this;

        this.handleResult(__WEBPACK_IMPORTED_MODULE_1__services_packages__["a" /* packages */].delete(packageName), function () {
            _this2.packageTable.remove(elementID);
        });
    };

    PackagesView.prototype.startPackage = function startPackage(packageName) {
        this.handleResult(__WEBPACK_IMPORTED_MODULE_1__services_packages__["a" /* packages */].start(packageName));
    };

    PackagesView.prototype.stopPackage = function stopPackage(packageName) {
        this.handleResult(__WEBPACK_IMPORTED_MODULE_1__services_packages__["a" /* packages */].stop(packageName));
    };

    PackagesView.prototype.enablePackage = function enablePackage(packageName) {
        this.handleResult(__WEBPACK_IMPORTED_MODULE_1__services_packages__["a" /* packages */].enablePackage(packageName));
    };

    PackagesView.prototype.disablePackage = function disablePackage(packageName) {
        this.handleResult(__WEBPACK_IMPORTED_MODULE_1__services_packages__["a" /* packages */].disable(packageName));
    };

    PackagesView.prototype.init = function init(view) {
        var self = this;
        var menu = webix.ui({
            view: "contextmenu",
            id: "packages_cm"
        });
        this.packageTable = this.$$("packages_table");

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
                        deletePackage(packageName, elementID);
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
                for (var i = 0; i < pkgStatus.length; i++) {
                    if (pkgStatus[i].name == item.status) {
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
        function mapData(allitems) {
            return allitems.map(function (item) {
                return {
                    "name": item.source.name,
                    "author": item.source.threebot,
                    "path": item.path,
                    "status": pkgStatus[item.status].name
                };
            });
        }

        function addActions(menudata, pkgIndex) {
            for (var j = 0; j < pkgStatus[pkgIndex].actions.length; j++) {
                menudata.push(pkgStatus[pkgIndex].actions[j]);
            }return menudata;
        }

        __WEBPACK_IMPORTED_MODULE_1__services_packages__["a" /* packages */].list().then(function (data) {
            self.packageTable.parse(mapData(data.json()));
        });
    };

    return PackagesView;
}(__WEBPACK_IMPORTED_MODULE_0_webix_jet__["b" /* JetView */]);

/* harmony default export */ __webpack_exports__["default"] = (PackagesView);

/***/ }),
/* 11 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_webix_jet__ = __webpack_require__(0);
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }



var WikisView = function (_JetView) {
    _inherits(WikisView, _JetView);

    function WikisView() {
        _classCallCheck(this, WikisView);

        return _possibleConstructorReturn(this, _JetView.apply(this, arguments));
    }

    WikisView.prototype.config = function config() {
        return {
            view: "iframe",
            id: "iframe-wikis",
            src: "/wiki"
        };
    };

    return WikisView;
}(__WEBPACK_IMPORTED_MODULE_0_webix_jet__["b" /* JetView */]);

/* harmony default export */ __webpack_exports__["default"] = (WikisView);

/***/ }),
/* 12 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_webix_jet__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__common_formatters__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_myjobs__ = __webpack_require__(24);
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
/* 13 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_webix_jet__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__common_colors__ = __webpack_require__(16);
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }





var MAX_MSG_LEN = 100;

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
        this.form.setValues(item);
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
/* 14 */
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
/* 15 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_webix_jet__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__common_formatters__ = __webpack_require__(4);
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
                    content: "textFilter"
                }],
                sort: "int",
                width: 50
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
/* 16 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ansiUp; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_ansi_up__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_ansi_up___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_ansi_up__);


var ansiUp = new __WEBPACK_IMPORTED_MODULE_0_ansi_up___default.a();

/***/ }),
/* 17 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return packages; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__common_api__ = __webpack_require__(2);
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
/* 18 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_webix_jet__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_health__ = __webpack_require__(1);
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
/* 19 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_webix_jet__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_health__ = __webpack_require__(1);
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
/* 20 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_webix_jet__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_health__ = __webpack_require__(1);
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
/* 21 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_webix_jet__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__processesChildView__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_health__ = __webpack_require__(1);
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
            self.processesList = data.processesList;

            // memory usage
            self.memoryUsage = data.memoryUsage;
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
/* 22 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_webix_jet__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_health__ = __webpack_require__(1);
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
        __WEBPACK_IMPORTED_MODULE_1__services_health__["a" /* health */].getRunningProcesses().then(function (data) {
            self.portsTable.parse(data.json());
        });
    };

    return runningPortsView;
}(__WEBPACK_IMPORTED_MODULE_0_webix_jet__["b" /* JetView */]);

/* harmony default export */ __webpack_exports__["default"] = (runningPortsView);

/***/ }),
/* 23 */
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
/* 24 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return myjobs; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__common_api__ = __webpack_require__(2);
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
/* 25 */
/***/ (function(module, exports) {



/***/ }),
/* 26 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__styles_app_css__ = __webpack_require__(27);
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
/* 27 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./alerts": 3,
	"./alerts/": 3,
	"./alerts/alert": 13,
	"./alerts/alert.js": 13,
	"./alerts/index": 3,
	"./alerts/index.js": 3,
	"./codeserver": 5,
	"./codeserver/": 5,
	"./codeserver/index": 5,
	"./codeserver/index.js": 5,
	"./dash": 6,
	"./dash/": 6,
	"./dash/diskSpace": 18,
	"./dash/diskSpace.js": 18,
	"./dash/health": 19,
	"./dash/health.js": 19,
	"./dash/index": 6,
	"./dash/index.js": 6,
	"./dash/jsxInfo": 20,
	"./dash/jsxInfo.js": 20,
	"./dash/processes": 21,
	"./dash/processes.js": 21,
	"./dash/processesChildView": 14,
	"./dash/processesChildView.js": 14,
	"./dash/runningPorts": 22,
	"./dash/runningPorts.js": 22,
	"./jupyter": 7,
	"./jupyter/": 7,
	"./jupyter/index": 7,
	"./jupyter/index.js": 7,
	"./logs": 8,
	"./logs/": 8,
	"./logs/appLogs": 15,
	"./logs/appLogs.js": 15,
	"./logs/index": 8,
	"./logs/index.js": 8,
	"./main": 23,
	"./main.js": 23,
	"./myjobs": 9,
	"./myjobs/": 9,
	"./myjobs/index": 9,
	"./myjobs/index.js": 9,
	"./packages": 10,
	"./packages/": 10,
	"./packages/index": 10,
	"./packages/index.js": 10,
	"./wikis": 11,
	"./wikis/": 11,
	"./wikis/index": 11,
	"./wikis/index.js": 11,
	"./workers": 12,
	"./workers/": 12,
	"./workers/index": 12,
	"./workers/index.js": 12
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
webpackContext.id = 28;

/***/ }),
/* 29 */
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
/* 30 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return alerts; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__common_api__ = __webpack_require__(2);
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
/* 31 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return logs; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__common_api__ = __webpack_require__(2);
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
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./en": 25,
	"./en.js": 25
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
webpackContext.id = 32;

/***/ })
/******/ ])["default"];
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgNzAyNWUyZjc1MGE2ZjkwZjRlMzciLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3dlYml4LWpldC9kaXN0L2VzNi9qZXQuanMiLCJ3ZWJwYWNrOi8vLy4vc291cmNlcy9zZXJ2aWNlcy9oZWFsdGguanMiLCJ3ZWJwYWNrOi8vLy4vc291cmNlcy9jb21tb24vYXBpLmpzIiwid2VicGFjazovLy8uL3NvdXJjZXMvdmlld3MvYWxlcnRzL2luZGV4LmpzIiwid2VicGFjazovLy8uL3NvdXJjZXMvY29tbW9uL2Zvcm1hdHRlcnMuanMiLCJ3ZWJwYWNrOi8vLy4vc291cmNlcy92aWV3cy9jb2Rlc2VydmVyL2luZGV4LmpzIiwid2VicGFjazovLy8uL3NvdXJjZXMvdmlld3MvZGFzaC9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9zb3VyY2VzL3ZpZXdzL2p1cHl0ZXIvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vc291cmNlcy92aWV3cy9sb2dzL2luZGV4LmpzIiwid2VicGFjazovLy8uL3NvdXJjZXMvdmlld3MvbXlqb2JzL2luZGV4LmpzIiwid2VicGFjazovLy8uL3NvdXJjZXMvdmlld3MvcGFja2FnZXMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vc291cmNlcy92aWV3cy93aWtpcy9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9zb3VyY2VzL3ZpZXdzL3dvcmtlcnMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vc291cmNlcy92aWV3cy9hbGVydHMvYWxlcnQuanMiLCJ3ZWJwYWNrOi8vLy4vc291cmNlcy92aWV3cy9kYXNoL3Byb2Nlc3Nlc0NoaWxkVmlldy5qcyIsIndlYnBhY2s6Ly8vLi9zb3VyY2VzL3ZpZXdzL2xvZ3MvYXBwTG9ncy5qcyIsIndlYnBhY2s6Ly8vLi9zb3VyY2VzL2NvbW1vbi9jb2xvcnMuanMiLCJ3ZWJwYWNrOi8vLy4vc291cmNlcy9zZXJ2aWNlcy9wYWNrYWdlcy5qcyIsIndlYnBhY2s6Ly8vLi9zb3VyY2VzL3ZpZXdzL2Rhc2gvZGlza1NwYWNlLmpzIiwid2VicGFjazovLy8uL3NvdXJjZXMvdmlld3MvZGFzaC9oZWFsdGguanMiLCJ3ZWJwYWNrOi8vLy4vc291cmNlcy92aWV3cy9kYXNoL2pzeEluZm8uanMiLCJ3ZWJwYWNrOi8vLy4vc291cmNlcy92aWV3cy9kYXNoL3Byb2Nlc3Nlcy5qcyIsIndlYnBhY2s6Ly8vLi9zb3VyY2VzL3ZpZXdzL2Rhc2gvcnVubmluZ1BvcnRzLmpzIiwid2VicGFjazovLy8uL3NvdXJjZXMvdmlld3MvbWFpbi5qcyIsIndlYnBhY2s6Ly8vLi9zb3VyY2VzL3NlcnZpY2VzL215am9icy5qcyIsIndlYnBhY2s6Ly8vLi9zb3VyY2VzL2FwcC5qcyIsIndlYnBhY2s6Ly8vLi9zb3VyY2VzL3N0eWxlcy9hcHAuY3NzIiwid2VicGFjazovLy8uL3NvdXJjZXMvdmlld3MgXlxcLlxcLy4qJCIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvYW5zaV91cC9hbnNpX3VwLmpzIiwid2VicGFjazovLy8uL3NvdXJjZXMvc2VydmljZXMvYWxlcnRzLmpzIiwid2VicGFjazovLy8uL3NvdXJjZXMvc2VydmljZXMvbG9ncy5qcyIsIndlYnBhY2s6Ly8vLi9zb3VyY2VzL2xvY2FsZXMgXlxcLlxcLy4qJCJdLCJuYW1lcyI6WyJOYXZpZ2F0aW9uQmxvY2tlZCIsIkpldEJhc2UiLCJ3ZWJpeCIsIndlYml4SmV0IiwiX2V2ZW50cyIsIl9zdWJzIiwiX2RhdGEiLCJnZXRSb290IiwiX3Jvb3QiLCJkZXN0cnVjdG9yIiwiX2RldGFjaEV2ZW50cyIsIl9kZXN0cm95U3VicyIsIl9jb250YWluZXIiLCJhcHAiLCJfcGFyZW50Iiwic2V0UGFyYW0iLCJpZCIsInZhbHVlIiwidXJsIiwiX3NlZ21lbnQiLCJ1cGRhdGUiLCJzaG93IiwiZ2V0UGFyYW0iLCJwYXJlbnQiLCJ2aWV3IiwiZ2V0UGFyZW50VmlldyIsImdldFVybCIsInN1YnVybCIsImdldFVybFN0cmluZyIsInRvU3RyaW5nIiwiJCQiLCJyb290IiwicXVlcnlWaWV3Iiwib2JqIiwiY29uZmlnIiwibG9jYWxJZCIsIiRzY29wZSIsIm9uIiwibmFtZSIsImNvZGUiLCJhdHRhY2hFdmVudCIsInB1c2giLCJjb250YWlucyIsImtleSIsImtpZCIsImdldFN1YlZpZXciLCJzdWIiLCJnZXRTdWJWaWV3SW5mbyIsInN1YnZpZXciLCJwb3B1cCIsImV2ZW50cyIsImkiLCJsZW5ndGgiLCJkZXRhY2hFdmVudCIsInN1YlZpZXciLCJfaW5pdF91cmxfZGF0YSIsImN1cnJlbnQiLCJleHRlbmQiLCJwYXJhbXMiLCJfZ2V0RGVmYXVsdFN1YiIsImRlZmF1bHQiLCJicmFuY2giLCJjaGlsZCIsIl9yb3V0ZWRfdmlldyIsInBhcnNlIiwic3Vic3RyIiwicGFydHMiLCJzcGxpdCIsImNodW5rcyIsInRlc3QiLCJyZXN1bHQiLCJwb3MiLCJpbmRleE9mIiwicGFyYW0iLCJkY2h1bmsiLCJkZWNvZGVVUklDb21wb25lbnQiLCJwYWdlIiwiaXNOZXciLCJ1cmwyc3RyIiwic3RhY2siLCJjaHVuayIsIm9iajJzdHIiLCJqb2luIiwic3RyIiwiZW5jb2RlVVJJQ29tcG9uZW50IiwiUm91dGUiLCJyb3V0ZSIsImluZGV4IiwiX25leHQiLCJwYXRoIiwibmV4dCIsInNsaWNlIiwic2hpZnQiLCJyZWZyZXNoIiwiX2pvaW4iLCJraWRzIiwib2xkIiwiY29uY2F0IiwiYXBwZW5kIiwiUHJvbWlzZSIsInJlcyIsInJlaiIsInJlZGlyZWN0IiwiY29uZmlybSIsInJlc29sdmUiLCJjYWxsRXZlbnQiLCJjYXRjaCIsImVyciIsInRoZW4iLCJzaXplIiwibiIsIkpldFZpZXciLCJfY2hpbGRyZW4iLCJ1aSIsImNvbnRhaW5lciIsImpldHZpZXciLCJjcmVhdGVWaWV3IiwicmVuZGVyIiwidGFyZ2V0IiwiX3JlbmRlckZyYW1lTG9jayIsIl9zaG93Iiwic2VnbWVudCIsIl91cmxDaGFuZ2UiLCJsaW5rUm91dGVyIiwiZ2V0Um91dGVyIiwic2V0Iiwic2lsZW50IiwiaW5pdCIsIl8kdmlldyIsIl8kIiwicmVhZHkiLCJfJHVybCIsIm1lc3NhZ2UiLCJ1cmxDaGFuZ2UiLCJkZXN0cm95IiwiX2Rlc3Ryb3lLaWRzIiwidXNlIiwicGx1Z2luIiwidGFnTmFtZSIsIl9yZW5kZXIiLCJkb2N1bWVudCIsImJvZHkiLCJ0b05vZGUiLCJfcmVuZGVyX2ZpbmFsIiwiY2ZnIiwic2xvdCIsInJlamVjdCIsInJlc3BvbnNlIiwiY29weUNvbmZpZyIsIm9sZHVpIiwiYXNXaW4iLCJzZXRQb3NpdGlvbiIsImlzVmlzaWJsZSIsIl9pbml0IiwiX2luaXRVcmwiLCJlIiwiX2luaXRFcnJvciIsIndhaXRzIiwiZnJhbWUiLCJ3YWl0IiwiYWxsIiwibG9jayIsIl9yZW5kZXJGcmFtZSIsIl9jcmVhdGVTdWJWaWV3IiwiZXJyb3IiLCJjcmVhdGVGcm9tVVJMIiwidWlzIiwiSmV0Vmlld1JhdyIsIl91aSIsIlN1YlJvdXRlciIsImNiIiwiYSIsImdldCIsIl9vbmNlIiwiSmV0QXBwQmFzZSIsIndpbmRvdyIsInZlcnNpb24iLCJzdGFydCIsIl9zZXJ2aWNlcyIsIkV2ZW50U3lzdGVtIiwiX3N1YlNlZ21lbnQiLCJnZXRTZXJ2aWNlIiwic2V0U2VydmljZSIsImhhbmRsZXIiLCJwcm90b3R5cGUiLCIkc3VidmlldyIsImFkZFN1YlZpZXciLCJBcnJheSIsIm1ldGhvZCIsInBvaW50IiwiRGF0YUNvbGxlY3Rpb24iLCJSZWdFeHAiLCJEYXRlIiwiY29weSIsIiRyb3V0ZXIiLCJjbGlja0hhbmRsZXIiLCJzcmNFbGVtZW50IiwiZ2V0QXR0cmlidXRlIiwidHJpZ2dlciIsIl9mb3JWaWV3IiwiY2FuY2VsQnViYmxlIiwicHJldmVudERlZmF1bHQiLCJwYXJlbnROb2RlIiwibG9hZFZpZXciLCJ2aWV3cyIsIl9sb2FkRXJyb3IiLCJFcnJvciIsIl9sb2FkVmlld0R5bmFtaWMiLCJtb2R1bGUiLCJfX2VzTW9kdWxlIiwicm91dGVyIiwicmVzdCIsImFwcGx5IiwiZGF0YSIsImFjdGlvbiIsImJpbmQiLCJlciIsImRlYnVnIiwiY29uc29sZSIsInRleHQiLCJyZXBsYWNlIiwiaW5uZXJIVE1MIiwidHlwZSIsImV4cGlyZSIsImZpcnN0SW5pdCIsImV2ZW50IiwiX2ZpcnN0X3N0YXJ0IiwidG9wIiwiYmFzZSIsInNldFRpbWVvdXQiLCJhbmltYXRpb24iLCJub2RlIiwiaHRtbCIsImFkZENzcyIsInJlbW92ZUNzcyIsInVybFN0cmluZyIsInRlbXBsYXRlIiwidWlkIiwiSGFzaFJvdXRlciIsIl9kZXRlY3RQcmVmaXgiLCJvbnBvcHN0YXRlIiwicm91dGVzIiwiY29tcGFyZSIsImhpc3RvcnkiLCJwdXNoU3RhdGUiLCJwcmVmaXgiLCJzdWZpeCIsIl9nZXRSYXciLCJyb3V0ZXJQcmVmaXgiLCJsb2NhdGlvbiIsImhyZWYiLCJpc1BhdGNoZWQiLCJwYXRjaCIsInciLCJ3aW4iLCJwcm9taXNlIiwiZnJlZXplIiwic29tZSIsIiRmcmVlemUiLCJyZXNpemUiLCJiYXNlQWRkIiwiYmFzZWxheW91dCIsImFkZFZpZXciLCJiYXNlUmVtb3ZlIiwicmVtb3ZlVmlldyIsImp2aWV3Iiwic3VicyIsImFyZ3VtZW50cyIsImxheW91dCIsInByb3RvVUkiLCIkaW5pdCIsIiRhcHAiLCIkcmVhZHkiLCJvcmlnaW4iLCJwcm94eSIsIkpldEFwcCIsInJlcXVpcmUiLCJTdG9yZVJvdXRlciIsInN0b3JhZ2UiLCJzZXNzaW9uIiwic3RvcmVOYW1lIiwicHV0IiwiVXJsUm91dGVyIiwicGF0aG5hbWUiLCJzZWFyY2giLCJFbXB0eVJvdXRlciIsIl8kY29uZmlnIiwiVW5sb2FkR3VhcmQiLCJoYXMiLCJzdG9yZSIsIk9iamVjdCIsImhhc093blByb3BlcnR5IiwiY2FsbCIsImZvckVhY2giLCJjb250ZXh0IiwidHJpbSIsIndhcm4iLCJ4IiwiU3RyaW5nIiwiZGVsaW1pdGVyIiwicnVzc2lhblBsdXJhbEdyb3VwcyIsImVuZCIsInBsdXJhbFR5cGVzIiwiYXJhYmljIiwibGFzdFR3byIsImJvc25pYW5fc2VyYmlhbiIsImNoaW5lc2UiLCJjcm9hdGlhbiIsImZyZW5jaCIsImdlcm1hbiIsInJ1c3NpYW4iLCJsaXRodWFuaWFuIiwiY3plY2giLCJwb2xpc2giLCJpY2VsYW5kaWMiLCJzbG92ZW5pYW4iLCJwbHVyYWxUeXBlVG9MYW5ndWFnZXMiLCJsYW5nVG9UeXBlTWFwIiwibWFwcGluZyIsInJldCIsImxhbmdzIiwibGFuZyIsInBsdXJhbFR5cGVOYW1lIiwibG9jYWxlIiwibGFuZ1RvUGx1cmFsVHlwZSIsImVuIiwicGx1cmFsVHlwZUluZGV4IiwiY291bnQiLCJlc2NhcGUiLCJ0b2tlbiIsImNvbnN0cnVjdFRva2VuUmVnZXgiLCJvcHRzIiwic3VmZml4IiwiUmFuZ2VFcnJvciIsImRvbGxhclJlZ2V4IiwiZG9sbGFyQmlsbHNZYWxsIiwiZGVmYXVsdFRva2VuUmVnZXgiLCJ0cmFuc2Zvcm1QaHJhc2UiLCJwaHJhc2UiLCJzdWJzdGl0dXRpb25zIiwidG9rZW5SZWdleCIsIlR5cGVFcnJvciIsImludGVycG9sYXRpb25SZWdleCIsIm9wdGlvbnMiLCJzbWFydF9jb3VudCIsInRleHRzIiwiZXhwcmVzc2lvbiIsImFyZ3VtZW50IiwiUG9seWdsb3QiLCJwaHJhc2VzIiwiY3VycmVudExvY2FsZSIsImFsbG93TWlzc2luZyIsIm9uTWlzc2luZ0tleSIsImludGVycG9sYXRpb24iLCJuZXdMb2NhbGUiLCJtb3JlUGhyYXNlcyIsInByZWZpeGVkS2V5IiwidW5zZXQiLCJjbGVhciIsIm5ld1BocmFzZXMiLCJ0IiwiXyIsInRyYW5zZm9ybSIsIndlYml4UG9seWdsb3QiLCJMb2NhbGUiLCJfdmlldyIsInNldExhbmdEYXRhIiwicGNvbmZpZyIsInBvbHlnbG90IiwicG9seSIsInNlcnZpY2UiLCJsb2NOYW1lIiwiaTE4biIsInNldExvY2FsZSIsImdldExhbmciLCJzZXRMYW5nIiwidXJscyIsIk1lbnUiLCJnZXRWYWx1ZSIsInNldFZhbHVlIiwiZ2V0U2VsZWN0ZWRJZCIsInNlbGVjdCIsImV4aXN0cyIsImJhc2VpY29ucyIsImdvb2QiLCJzYXZpbmciLCJiYXNldGV4dCIsIlN0YXR1cyIsInN0YXR1cyIsImlzZXJyb3IiLCJleHBpcmVEZWxheSIsImljb25zIiwiY29udGVudCIsImFyZWEiLCJzZXRIVE1MIiwic3VjY2VzcyIsInNldFN0YXR1cyIsImZhaWwiLCJnZXRTdGF0dXMiLCJoaWRlU3RhdHVzIiwibW9kZSIsInJlc3BvbnNlVGV4dCIsInRyYWNrIiwiZHAiLCJfaWQiLCJfb2JqIiwicmVtb3RlIiwiYWpheCIsIl9tb2RlIiwiX3VybCIsIl9yZXF1ZXN0IiwiX2hlYWRlcnMiLCJfZmlsZXMiLCJUaGVtZSIsInRoZW1lIiwiZ2V0VGhlbWUiLCJzZXRUaGVtZSIsImxpbmtzIiwiZ2V0RWxlbWVudHNCeVRhZ05hbWUiLCJsbmFtZSIsImRpc2FibGVkIiwic2tpbiIsImNvcHlQYXJhbXMiLCJVcmxQYXJhbSIsIm9zIiwib2ciLCJ2YWwiLCJVc2VyIiwibG9naW4iLCJsb2dvdXQiLCJhZnRlckxvZ2luIiwiYWZ0ZXJMb2dvdXQiLCJwaW5nIiwibW9kZWwiLCJ1c2VyIiwiZ2V0VXNlciIsInNlcnZlciIsInBhc3MiLCJjYW5OYXZpZ2F0ZSIsIl8kcm9vdCIsInB1YmxpYyIsInNldEludGVydmFsIiwicGx1Z2lucyIsImVycm9ycyIsIkJBU0VfVVJMIiwiSGVhbHRoU2VydmljZSIsImdldERpc2tTcGFjZSIsImdldENhbGwiLCJnZXRIZWFsdGgiLCJnZXRJZGVudGl0eSIsImdldE5ldHdvcmtJbmZvIiwiZ2V0SnN4VmVyc2lvbiIsImdldFJ1bm5pbmdQcm9jZXNzZXMiLCJnZXRSdW5uaW5nUG9ydHMiLCJTZXJ2aWNlIiwiaGVhbHRoIiwiaGVhZGVycyIsImJhc2VVcmwiLCJqb2luVXJsIiwiYXJncyIsInRvTG93ZXJDYXNlIiwicG9zdCIsIlZhbHVlRXJyb3IiLCJwb3N0Q2FsbCIsIk1BWF9NU0dfTEVOIiwiQWxlcnRzVmlldyIsInJvd3MiLCJyZXNpemVDb2x1bW4iLCJtdWx0aXNlbGVjdCIsImNzcyIsImNvbHVtbnMiLCJoZWFkZXIiLCJzb3J0IiwiYXV0b3dpZHRoIiwiZm9ybWF0IiwiZGF0ZUZvcm1hdHRlciIsIndpZHRoIiwiZmlsbHNwYWNlIiwiYW5zaVVwIiwiYW5zaV90b19odG1sIiwiYXV0b0NvbmZpZyIsInNjaGVtZSIsImRlbGV0ZUl0ZW0iLCJvYmplY3RzIiwic2VsZiIsIml0ZW1zIiwiaWRzIiwiaW5kZXhlcyIsIml0ZW0iLCJ0YWJsZSIsImdldEl0ZW0iLCJ0aXRsZSIsIm9rIiwiY2FuY2VsIiwiaWRlbnRpZmllcnMiLCJtYXAiLCJpZGVudGlmaWVyIiwic2hvd1Byb2dyZXNzIiwiaGlkZSIsImFsZXJ0cyIsImRlbGV0ZSIsInJlbW92ZSIsInZpZXdJdGVtIiwiYWxlcnRWaWV3Iiwic2hvd0ZvciIsIkFsZXJ0VmlldyIsIlByb2dyZXNzQmFyIiwiY2xlYXJBbGwiLCJsaXN0IiwianNvbiIsImF0dGFjaFRvIiwiZGF0ZUZvcm1hdCIsIndlYml4RGF0ZUZvcm1hdHRlciIsImRhdGVUb1N0ciIsInBhcnNlSW50IiwiQ09ERV9VUkwiLCJQQUNLQUdFX1BBVEgiLCJDb2Rlc2VydmVyVmlldyIsImlmcmFtZSIsIm9uQWZ0ZXJMb2FkIiwiaGlkZVByb2dyZXNzIiwiZW5hYmxlIiwiY29scyIsImhlaWdodCIsImlucHV0V2lkdGgiLCJpbnN0YWxsQ29kZXNlcnZlclBhY2thZ2UiLCJwYWNrYWdlcyIsImFkZCIsImNvZGVzZXJ2ZXJJZnJhbWUiLCJpbnN0YWxsUGFja2FnZUNvbnRhaW5lciIsImRpc2FibGUiLCJsb2FkIiwiY29kZVNlcnZlclN0YXR1cyIsImNvZGVzZXJ2ZXIiLCJUb3BWaWV3IiwicmVzcG9uc2l2ZSIsIkp1cHl0ZXJWaWV3IiwiY2xpY2siLCJhZGRUb0xpc3QiLCJteWxpc3QiLCJMb2dzVmlldyIsInBsYWNlaG9sZGVyIiwib25DaGFuZ2UiLCJhcHBOYW1lIiwiQXBwTG9nc1ZpZXciLCJhcHBzQ29tb2IiLCJhcHBuYW1lIiwibG9nSWQiLCJsb2dpZCIsImFwcExvZ3MiLCJsb2dzIiwibGlzdEFwcHMiLCJKb2JzVmlldyIsIkpTT04iLCJzdHJpbmdpZnkiLCJteWpvYnMiLCJsaXN0Sm9icyIsInBrZ1N0YXR1cyIsImFjdGlvbnMiLCJQYWNrYWdlc1ZpZXciLCJncmlkIiwiaW5wdXRBbGlnbiIsInNjcm9sbCIsIm9uQ29udGV4dCIsImhhbmRsZVJlc3VsdCIsImNhbGxiYWNrIiwiYWRkUGFja2FnZSIsImdpdFVybCIsImRlbGV0ZVBhY2thZ2UiLCJwYWNrYWdlTmFtZSIsImVsZW1lbnRJRCIsInBhY2thZ2VUYWJsZSIsInN0YXJ0UGFja2FnZSIsInN0b3BQYWNrYWdlIiwic3RvcCIsImVuYWJsZVBhY2thZ2UiLCJkaXNhYmxlUGFja2FnZSIsIm1lbnUiLCJjaGVja0FjdGlvbiIsInNlbGVjdGVkSXRlbUlkIiwiYXV0aG9yIiwicGFjYWtnZUxvY2F0aW9uIiwiYWxlcnQiLCJwYWNrYWdlTWV0aG9kIiwiJHZpZXciLCJsb2NhdGUiLCJtZW51ZGF0YSIsInJvdyIsImFkZEFjdGlvbnMiLCJwcmV2ZW50RXZlbnQiLCJtYXBEYXRhIiwiYWxsaXRlbXMiLCJzb3VyY2UiLCJ0aHJlZWJvdCIsInBrZ0luZGV4IiwiaiIsIldpa2lzVmlldyIsInNyYyIsImxpc3RXb3JrZXJzIiwiaW5mbyIsImVsZW1lbnRzQ29uZmlnIiwibGFiZWxXaWR0aCIsImVsZW1lbnRzIiwibGFiZWwiLCJyZWFkb25seSIsInRhYiIsImNlbGxzIiwibXVsdGl2aWV3IiwiaGVhZCIsIm1vZGFsIiwicG9zaXRpb24iLCJnZXRUb3BQYXJlbnRWaWV3IiwiZm9ybSIsInRiVmlld3MiLCJ0YlRhYnMiLCJsb2dEYXRhIiwiZ2V0U2VsZWN0ZWRJdGVtIiwiYXBwX25hbWUiLCJsYXRlc3RfbG9naWQiLCJhZGRUcmFjZWJhY2siLCJ0YiIsInRiSWQiLCJ0aHJlZWJvdF9uYW1lIiwicHJvY2Vzc19pZCIsInRiVGl0bGUiLCJmb3JtYXR0ZWQiLCJhZGRPcHRpb24iLCJjbGVhclRyYWNlQmFja3MiLCJyZW1vdmVPcHRpb24iLCJzZXRWYWx1ZXMiLCJ0cmFjZWJhY2tzIiwiUHJvY2Vzc2VzQ2hpbGRWaWV3IiwiTWF0aCIsImNlaWwiLCJwYWdlciIsImdyb3VwIiwiYXBwbG9ncyIsIm1hcmtTb3J0aW5nIiwiQW5zaVVwIiwiUGFja2FnZXNTZXJ2aWNlIiwiZ2l0X3VybCIsIkRpc2tTcGFjZVZpZXciLCJkaXNrU3BhY2UiLCJkaXNrSW5mbyIsInVzZWQiLCJmcmVlIiwidG90YWwiLCJwZXJjZW50IiwiaGVhbHRoSW5mb1ZpZXciLCJoZWFsdGhJbmZvIiwiYmNkYiIsIndpa2lzIiwianVweXRlciIsIkpTWEluZm9WaWV3IiwiaXAiLCJpcDYiLCJjb2xvcnNEYXRhc2V0IiwiY29sb3IiLCJQcm9jZXNzZXNWaWV3IiwicHJvY2Vzc2VzSW5mbyIsInBpZUlubmVyVGV4dCIsImFsaWduIiwiY2hpbGR2aWV3IiwicHJvY2Vzc2VzTGlzdCIsInJ1blByb2Nlc3NJbmZvIiwiY2hhcnRzRGF0YSIsIm1lbW9yeVVzYWdlIiwidG90YWxNZW1vcnkiLCJ0b3RhbF9tZW0iLCJ1c2FnZV9wZXJjZW50IiwiZGVmaW5lIiwidmFsdWVzIiwidGVtcCIsInZtcyIsInJ1bm5pbmdQb3J0c1ZpZXciLCJwb3J0cyIsInBvcnRzVGFibGUiLCJpY29uIiwiaGlkZU1lbnUiLCJ0b29sdGlwIiwiYm9yZGVybGVzcyIsInNpZGViYXIiLCJ0b29sYmFyIiwicGFkZGluZyIsInNob3dNZW51IiwiaGlkZGVuIiwiYnV0dG9uSGlkZU1lbnUiLCJidXR0b25TaG93TWVudSIsInVzZXJNZW51IiwidXNlcm5hbWVMYWJlbCIsInVzZXJuYW1lIiwiZ2V0VGV4dFNpemUiLCJlbWFpbCIsIk15am9ic1NlcnZpY2UiLCJJbnZlbnRvcnlBcHAiLCJBUFBOQU1FIiwiVkVSU0lPTiIsIlBST0RVQ1RJT04iLCJmYWN0b3J5IiwiZXhwb3J0cyIsIm5vZGVOYW1lIiwiZXhwIiwiX19tYWtlVGVtcGxhdGVPYmplY3QiLCJjb29rZWQiLCJyYXciLCJkZWZpbmVQcm9wZXJ0eSIsIlBhY2tldEtpbmQiLCJzZXR1cF9wYWxldHRlcyIsIl91c2VfY2xhc3NlcyIsIl9lc2NhcGVfZm9yX2h0bWwiLCJib2xkIiwiZmciLCJiZyIsIl9idWZmZXIiLCJfdXJsX3doaXRlbGlzdCIsImFyZyIsImVudW1lcmFibGUiLCJjb25maWd1cmFibGUiLCJfdGhpcyIsImFuc2lfY29sb3JzIiwicmdiIiwiY2xhc3NfbmFtZSIsInBhbGV0dGVfMjU2IiwicGFsZXR0ZSIsInJlYyIsImxldmVscyIsInIiLCJnIiwiYiIsImNvbCIsImdyZXlfbGV2ZWwiLCJncnkiLCJlc2NhcGVfdHh0X2Zvcl9odG1sIiwidHh0IiwiYXBwZW5kX2J1ZmZlciIsImdldF9uZXh0X3BhY2tldCIsInBrdCIsImtpbmQiLCJFT1MiLCJsZW4iLCJUZXh0IiwiSW5jb21wbGV0ZSIsIm5leHRfY2hhciIsImNoYXJBdCIsIkVTQyIsIl9jc2lfcmVnZXgiLCJyZ3giLCJtYXRjaCIsIlVua25vd24iLCJTR1IiLCJycG9zIiwiX29zY19zdCIsInJneEciLCJsYXN0SW5kZXgiLCJtYXRjaF8xIiwiZXhlYyIsIm1hdGNoXzIiLCJfb3NjX3JlZ2V4IiwiT1NDVVJMIiwiYmxvY2tzIiwicGFja2V0IiwidHJhbnNmb3JtX3RvX2h0bWwiLCJ3aXRoX3N0YXRlIiwicHJvY2Vzc19hbnNpIiwicHJvY2Vzc19oeXBlcmxpbmsiLCJzZ3JfY21kcyIsInNncl9jbWRfc3RyIiwibnVtIiwiaXNOYU4iLCJpc19mb3JlZ3JvdW5kIiwibW9kZV9jbWQiLCJwYWxldHRlX2luZGV4IiwiYyIsImZyYWdtZW50Iiwic3R5bGVzIiwiY2xhc3NlcyIsImNsYXNzX3N0cmluZyIsInN0eWxlX3N0cmluZyIsInRtcGxPYmoiLCJzdWJzdCIsIl9pIiwicmVnZXhUZXh0Iiwid3NyZ3giLCJ0eHQyIiwiQWxlcnRzU2VydmljZSIsIkxvZ3NTZXJ2aWNlIiwiaWRfZnJvbSJdLCJtYXBwaW5ncyI6Ijs7UUFBQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtR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QixJQUFNNkMsU0FBUyxJQUFJNlIsYUFBSixFQUFmLEM7Ozs7Ozs7Ozs7Ozs7OztBQ3BCUDs7QUFFQSxJQUFNcFYsV0FBVyw0QkFBakI7O0lBRU1xVixXOzs7QUFDRiwyQkFBYztBQUFBOztBQUFBLGdEQUNWLG9CQUFNclYsUUFBTixDQURVO0FBRWI7OzBCQUVEMkcsUSx1QkFBVztBQUNQLGVBQU8sS0FBS3hHLE9BQUwsQ0FBYSxXQUFiLENBQVA7QUFDSCxLOzswQkFFRDZELEksaUJBQUttQyxPLEVBQVNJLEssRUFBTztBQUNqQixlQUFPLEtBQUtwRixRQUFMLENBQWMsTUFBZCxFQUFzQjtBQUN6Qm1GLHFCQUFTSCxPQURnQjtBQUV6Qm1QLHFCQUFTL087QUFGZ0IsU0FBdEIsQ0FBUDtBQUlILEs7OztFQWRxQjdGLDREOztBQWlCbkIsSUFBTWdHLE9BQU8sSUFBSTJPLFdBQUosRUFBYixDOzs7Ozs7QUNyQlA7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsdUIiLCJmaWxlIjoiYXBwLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7XG4gXHRcdFx0XHRjb25maWd1cmFibGU6IGZhbHNlLFxuIFx0XHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcbiBcdFx0XHRcdGdldDogZ2V0dGVyXG4gXHRcdFx0fSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiL2NvZGViYXNlL1wiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IDI2KTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyB3ZWJwYWNrL2Jvb3RzdHJhcCA3MDI1ZTJmNzUwYTZmOTBmNGUzNyIsImNsYXNzIE5hdmlnYXRpb25CbG9ja2VkIHsgfVxuXG5jbGFzcyBKZXRCYXNlIHtcclxuICAgIGNvbnN0cnVjdG9yKHdlYml4KSB7XHJcbiAgICAgICAgdGhpcy53ZWJpeEpldCA9IHRydWU7XHJcbiAgICAgICAgdGhpcy53ZWJpeCA9IHdlYml4O1xyXG4gICAgICAgIHRoaXMuX2V2ZW50cyA9IFtdO1xyXG4gICAgICAgIHRoaXMuX3N1YnMgPSB7fTtcclxuICAgICAgICB0aGlzLl9kYXRhID0ge307XHJcbiAgICB9XHJcbiAgICBnZXRSb290KCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9yb290O1xyXG4gICAgfVxyXG4gICAgZGVzdHJ1Y3RvcigpIHtcclxuICAgICAgICB0aGlzLl9kZXRhY2hFdmVudHMoKTtcclxuICAgICAgICB0aGlzLl9kZXN0cm95U3VicygpO1xyXG4gICAgICAgIHRoaXMuX2V2ZW50cyA9IHRoaXMuX2NvbnRhaW5lciA9IHRoaXMuYXBwID0gdGhpcy5fcGFyZW50ID0gdGhpcy5fcm9vdCA9IG51bGw7XHJcbiAgICB9XHJcbiAgICBzZXRQYXJhbShpZCwgdmFsdWUsIHVybCkge1xyXG4gICAgICAgIGlmICh0aGlzLl9kYXRhW2lkXSAhPT0gdmFsdWUpIHtcclxuICAgICAgICAgICAgdGhpcy5fZGF0YVtpZF0gPSB2YWx1ZTtcclxuICAgICAgICAgICAgdGhpcy5fc2VnbWVudC51cGRhdGUoaWQsIHZhbHVlLCAwKTtcclxuICAgICAgICAgICAgaWYgKHVybCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuc2hvdyhudWxsKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGdldFBhcmFtKGlkLCBwYXJlbnQpIHtcclxuICAgICAgICBjb25zdCB2YWx1ZSA9IHRoaXMuX2RhdGFbaWRdO1xyXG4gICAgICAgIGlmICh0eXBlb2YgdmFsdWUgIT09IFwidW5kZWZpbmVkXCIgfHwgIXBhcmVudCkge1xyXG4gICAgICAgICAgICByZXR1cm4gdmFsdWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNvbnN0IHZpZXcgPSB0aGlzLmdldFBhcmVudFZpZXcoKTtcclxuICAgICAgICBpZiAodmlldykge1xyXG4gICAgICAgICAgICByZXR1cm4gdmlldy5nZXRQYXJhbShpZCwgcGFyZW50KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBnZXRVcmwoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX3NlZ21lbnQuc3VidXJsKCk7XHJcbiAgICB9XHJcbiAgICBnZXRVcmxTdHJpbmcoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX3NlZ21lbnQudG9TdHJpbmcoKTtcclxuICAgIH1cclxuICAgIGdldFBhcmVudFZpZXcoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX3BhcmVudDtcclxuICAgIH1cclxuICAgICQkKGlkKSB7XHJcbiAgICAgICAgaWYgKHR5cGVvZiBpZCA9PT0gXCJzdHJpbmdcIikge1xyXG4gICAgICAgICAgICBjb25zdCByb290ID0gdGhpcy5nZXRSb290KCk7XHJcbiAgICAgICAgICAgIHJldHVybiByb290LnF1ZXJ5Vmlldygob2JqID0+IChvYmouY29uZmlnLmlkID09PSBpZCB8fCBvYmouY29uZmlnLmxvY2FsSWQgPT09IGlkKSAmJlxyXG4gICAgICAgICAgICAgICAgKG9iai4kc2NvcGUgPT09IHJvb3QuJHNjb3BlKSksIFwic2VsZlwiKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIHJldHVybiBpZDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBvbihvYmosIG5hbWUsIGNvZGUpIHtcclxuICAgICAgICBjb25zdCBpZCA9IG9iai5hdHRhY2hFdmVudChuYW1lLCBjb2RlKTtcclxuICAgICAgICB0aGlzLl9ldmVudHMucHVzaCh7IG9iaiwgaWQgfSk7XHJcbiAgICAgICAgcmV0dXJuIGlkO1xyXG4gICAgfVxyXG4gICAgY29udGFpbnModmlldykge1xyXG4gICAgICAgIGZvciAoY29uc3Qga2V5IGluIHRoaXMuX3N1YnMpIHtcclxuICAgICAgICAgICAgY29uc3Qga2lkID0gdGhpcy5fc3Vic1trZXldLnZpZXc7XHJcbiAgICAgICAgICAgIGlmIChraWQgPT09IHZpZXcgfHwga2lkLmNvbnRhaW5zKHZpZXcpKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcbiAgICBnZXRTdWJWaWV3KG5hbWUpIHtcclxuICAgICAgICBjb25zdCBzdWIgPSB0aGlzLmdldFN1YlZpZXdJbmZvKG5hbWUpO1xyXG4gICAgICAgIGlmIChzdWIpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHN1Yi5zdWJ2aWV3LnZpZXc7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgZ2V0U3ViVmlld0luZm8obmFtZSkge1xyXG4gICAgICAgIGNvbnN0IHN1YiA9IHRoaXMuX3N1YnNbbmFtZSB8fCBcImRlZmF1bHRcIl07XHJcbiAgICAgICAgaWYgKHN1Yikge1xyXG4gICAgICAgICAgICByZXR1cm4geyBzdWJ2aWV3OiBzdWIsIHBhcmVudDogdGhpcyB9O1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAobmFtZSA9PT0gXCJfdG9wXCIpIHtcclxuICAgICAgICAgICAgdGhpcy5fc3Vic1tuYW1lXSA9IHsgdXJsOiBcIlwiLCBpZDogbnVsbCwgcG9wdXA6IHRydWUgfTtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZ2V0U3ViVmlld0luZm8obmFtZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIHdoZW4gY2FsbGVkIGZyb20gYSBjaGlsZCB2aWV3LCBzZWFyY2hlcyBmb3IgbmVhcmVzdCBwYXJlbnQgd2l0aCBzdWJ2aWV3XHJcbiAgICAgICAgaWYgKHRoaXMuX3BhcmVudCkge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fcGFyZW50LmdldFN1YlZpZXdJbmZvKG5hbWUpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgIH1cclxuICAgIF9kZXRhY2hFdmVudHMoKSB7XHJcbiAgICAgICAgY29uc3QgZXZlbnRzID0gdGhpcy5fZXZlbnRzO1xyXG4gICAgICAgIGZvciAobGV0IGkgPSBldmVudHMubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIHtcclxuICAgICAgICAgICAgZXZlbnRzW2ldLm9iai5kZXRhY2hFdmVudChldmVudHNbaV0uaWQpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIF9kZXN0cm95U3VicygpIHtcclxuICAgICAgICAvLyBkZXN0cm95IHN1YiB2aWV3c1xyXG4gICAgICAgIGZvciAoY29uc3Qga2V5IGluIHRoaXMuX3N1YnMpIHtcclxuICAgICAgICAgICAgY29uc3Qgc3ViVmlldyA9IHRoaXMuX3N1YnNba2V5XS52aWV3O1xyXG4gICAgICAgICAgICAvLyBpdCBwb3NzaWJsZSB0aGF0IHN1YnZpZXcgd2FzIG5vdCBsb2FkZWQgd2l0aCBhbnkgY29udGVudCB5ZXRcclxuICAgICAgICAgICAgLy8gc28gY2hlY2sgb24gbnVsbFxyXG4gICAgICAgICAgICBpZiAoc3ViVmlldykge1xyXG4gICAgICAgICAgICAgICAgc3ViVmlldy5kZXN0cnVjdG9yKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gcmVzZXQgdG8gcHJldmVudCBtZW1vcnkgbGVha3NcclxuICAgICAgICB0aGlzLl9zdWJzID0ge307XHJcbiAgICB9XHJcbiAgICBfaW5pdF91cmxfZGF0YSgpIHtcclxuICAgICAgICBjb25zdCB1cmwgPSB0aGlzLl9zZWdtZW50LmN1cnJlbnQoKTtcclxuICAgICAgICB0aGlzLl9kYXRhID0ge307XHJcbiAgICAgICAgdGhpcy53ZWJpeC5leHRlbmQodGhpcy5fZGF0YSwgdXJsLnBhcmFtcywgdHJ1ZSk7XHJcbiAgICB9XHJcbiAgICBfZ2V0RGVmYXVsdFN1YigpIHtcclxuICAgICAgICBpZiAodGhpcy5fc3Vicy5kZWZhdWx0KSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9zdWJzLmRlZmF1bHQ7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGZvciAoY29uc3Qga2V5IGluIHRoaXMuX3N1YnMpIHtcclxuICAgICAgICAgICAgY29uc3Qgc3ViID0gdGhpcy5fc3Vic1trZXldO1xyXG4gICAgICAgICAgICBpZiAoIXN1Yi5icmFuY2ggJiYgc3ViLnZpZXcgJiYga2V5ICE9PSBcIl90b3BcIikge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgY2hpbGQgPSBzdWIudmlldy5fZ2V0RGVmYXVsdFN1YigpO1xyXG4gICAgICAgICAgICAgICAgaWYgKGNoaWxkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGNoaWxkO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgX3JvdXRlZF92aWV3KCkge1xyXG4gICAgICAgIGNvbnN0IHBhcmVudCA9IHRoaXMuZ2V0UGFyZW50VmlldygpO1xyXG4gICAgICAgIGlmICghcGFyZW50KSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjb25zdCBzdWIgPSBwYXJlbnQuX2dldERlZmF1bHRTdWIoKTtcclxuICAgICAgICBpZiAoIXN1YiAmJiBzdWIgIT09IHRoaXMpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gcGFyZW50Ll9yb3V0ZWRfdmlldygpO1xyXG4gICAgfVxyXG59XG5cbmZ1bmN0aW9uIHBhcnNlKHVybCkge1xyXG4gICAgLy8gcmVtb3ZlIHN0YXJ0aW5nIC9cclxuICAgIGlmICh1cmxbMF0gPT09IFwiL1wiKSB7XHJcbiAgICAgICAgdXJsID0gdXJsLnN1YnN0cigxKTtcclxuICAgIH1cclxuICAgIC8vIHNwbGl0IHVybCBieSBcIi9cIlxyXG4gICAgY29uc3QgcGFydHMgPSB1cmwuc3BsaXQoXCIvXCIpO1xyXG4gICAgY29uc3QgY2h1bmtzID0gW107XHJcbiAgICAvLyBmb3IgZWFjaCBwYWdlIGluIHVybFxyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBwYXJ0cy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgIGNvbnN0IHRlc3QgPSBwYXJ0c1tpXTtcclxuICAgICAgICBjb25zdCByZXN1bHQgPSB7fTtcclxuICAgICAgICAvLyBkZXRlY3QgcGFyYW1zXHJcbiAgICAgICAgLy8gc3VwcG9ydCBvbGQgXHRcdFx0c29tZTphPWI6Yz1kXHJcbiAgICAgICAgLy8gYW5kIG5ldyBub3RhdGlvblx0XHRzb21lP2E9YiZjPWRcclxuICAgICAgICBsZXQgcG9zID0gdGVzdC5pbmRleE9mKFwiOlwiKTtcclxuICAgICAgICBpZiAocG9zID09PSAtMSkge1xyXG4gICAgICAgICAgICBwb3MgPSB0ZXN0LmluZGV4T2YoXCI/XCIpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAocG9zICE9PSAtMSkge1xyXG4gICAgICAgICAgICBjb25zdCBwYXJhbXMgPSB0ZXN0LnN1YnN0cihwb3MgKyAxKS5zcGxpdCgvW1xcOlxcP1xcJl0vZyk7XHJcbiAgICAgICAgICAgIC8vIGNyZWF0ZSBoYXNoIG9mIG5hbWVkIHBhcmFtc1xyXG4gICAgICAgICAgICBmb3IgKGNvbnN0IHBhcmFtIG9mIHBhcmFtcykge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgZGNodW5rID0gcGFyYW0uc3BsaXQoXCI9XCIpO1xyXG4gICAgICAgICAgICAgICAgcmVzdWx0W2RjaHVua1swXV0gPSBkZWNvZGVVUklDb21wb25lbnQoZGNodW5rWzFdKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICAvLyBzdG9yZSBwYXJzZWQgdmFsdWVzXHJcbiAgICAgICAgY2h1bmtzW2ldID0ge1xyXG4gICAgICAgICAgICBwYWdlOiAocG9zID4gLTEgPyB0ZXN0LnN1YnN0cigwLCBwb3MpIDogdGVzdCksXHJcbiAgICAgICAgICAgIHBhcmFtczogcmVzdWx0LFxyXG4gICAgICAgICAgICBpc05ldzogdHJ1ZVxyXG4gICAgICAgIH07XHJcbiAgICB9XHJcbiAgICAvLyByZXR1cm4gYXJyYXkgb2YgcGFnZSBvYmplY3RzXHJcbiAgICByZXR1cm4gY2h1bmtzO1xyXG59XHJcbmZ1bmN0aW9uIHVybDJzdHIoc3RhY2spIHtcclxuICAgIGNvbnN0IHVybCA9IFtdO1xyXG4gICAgZm9yIChjb25zdCBjaHVuayBvZiBzdGFjaykge1xyXG4gICAgICAgIHVybC5wdXNoKFwiL1wiICsgY2h1bmsucGFnZSk7XHJcbiAgICAgICAgY29uc3QgcGFyYW1zID0gb2JqMnN0cihjaHVuay5wYXJhbXMpO1xyXG4gICAgICAgIGlmIChwYXJhbXMpIHtcclxuICAgICAgICAgICAgdXJsLnB1c2goXCI/XCIgKyBwYXJhbXMpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiB1cmwuam9pbihcIlwiKTtcclxufVxyXG5mdW5jdGlvbiBvYmoyc3RyKG9iaikge1xyXG4gICAgY29uc3Qgc3RyID0gW107XHJcbiAgICBmb3IgKGNvbnN0IGtleSBpbiBvYmopIHtcclxuICAgICAgICBpZiAoc3RyLmxlbmd0aCkge1xyXG4gICAgICAgICAgICBzdHIucHVzaChcIiZcIik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHN0ci5wdXNoKGtleSArIFwiPVwiICsgZW5jb2RlVVJJQ29tcG9uZW50KG9ialtrZXldKSk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gc3RyLmpvaW4oXCJcIik7XHJcbn1cblxuY2xhc3MgUm91dGUge1xyXG4gICAgY29uc3RydWN0b3Iocm91dGUsIGluZGV4KSB7XHJcbiAgICAgICAgdGhpcy5fbmV4dCA9IDE7XHJcbiAgICAgICAgaWYgKHR5cGVvZiByb3V0ZSA9PT0gXCJzdHJpbmdcIikge1xyXG4gICAgICAgICAgICB0aGlzLnJvdXRlID0ge1xyXG4gICAgICAgICAgICAgICAgdXJsOiBwYXJzZShyb3V0ZSksXHJcbiAgICAgICAgICAgICAgICBwYXRoOiByb3V0ZVxyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5yb3V0ZSA9IHJvdXRlO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmluZGV4ID0gaW5kZXg7XHJcbiAgICB9XHJcbiAgICBjdXJyZW50KCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnJvdXRlLnVybFt0aGlzLmluZGV4XTtcclxuICAgIH1cclxuICAgIG5leHQoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMucm91dGUudXJsW3RoaXMuaW5kZXggKyB0aGlzLl9uZXh0XTtcclxuICAgIH1cclxuICAgIHN1YnVybCgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5yb3V0ZS51cmwuc2xpY2UodGhpcy5pbmRleCk7XHJcbiAgICB9XHJcbiAgICBzaGlmdCgpIHtcclxuICAgICAgICByZXR1cm4gbmV3IFJvdXRlKHRoaXMucm91dGUsIHRoaXMuaW5kZXggKyB0aGlzLl9uZXh0KTtcclxuICAgIH1cclxuICAgIHJlZnJlc2goKSB7XHJcbiAgICAgICAgY29uc3QgdXJsID0gdGhpcy5yb3V0ZS51cmw7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IHRoaXMuaW5kZXggKyAxOyBpIDwgdXJsLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIHVybFtpXS5pc05ldyA9IHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgdG9TdHJpbmcoKSB7XHJcbiAgICAgICAgY29uc3Qgc3RyID0gdXJsMnN0cih0aGlzLnN1YnVybCgpKTtcclxuICAgICAgICByZXR1cm4gc3RyID8gc3RyLnN1YnN0cigxKSA6IFwiXCI7XHJcbiAgICB9XHJcbiAgICBfam9pbihwYXRoLCBraWRzKSB7XHJcbiAgICAgICAgbGV0IHVybCA9IHRoaXMucm91dGUudXJsO1xyXG4gICAgICAgIGlmIChwYXRoID09PSBudWxsKSB7IC8vIGNoYW5nZSBvZiBwYXJhbWV0ZXJzLCByb3V0ZSBlbGVtZW50cyBhcmUgbm90IGFmZmVjdGVkXHJcbiAgICAgICAgICAgIHJldHVybiB1cmw7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNvbnN0IG9sZCA9IHRoaXMucm91dGUudXJsO1xyXG4gICAgICAgIHVybCA9IG9sZC5zbGljZSgwLCB0aGlzLmluZGV4ICsgKGtpZHMgPyB0aGlzLl9uZXh0IDogMCkpO1xyXG4gICAgICAgIGlmIChwYXRoKSB7XHJcbiAgICAgICAgICAgIHVybCA9IHVybC5jb25jYXQocGFyc2UocGF0aCkpO1xyXG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHVybC5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgaWYgKG9sZFtpXSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHVybFtpXS52aWV3ID0gb2xkW2ldLnZpZXc7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZiAob2xkW2ldICYmIHVybFtpXS5wYWdlID09PSBvbGRbaV0ucGFnZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHVybFtpXS5pc05ldyA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB1cmw7XHJcbiAgICB9XHJcbiAgICBhcHBlbmQocGF0aCkge1xyXG4gICAgICAgIGNvbnN0IHVybCA9IHRoaXMuX2pvaW4ocGF0aCwgdHJ1ZSk7XHJcbiAgICAgICAgdGhpcy5yb3V0ZS5wYXRoID0gdXJsMnN0cih1cmwpO1xyXG4gICAgICAgIHRoaXMucm91dGUudXJsID0gdXJsO1xyXG4gICAgICAgIHJldHVybiB0aGlzLnJvdXRlLnBhdGg7XHJcbiAgICB9XHJcbiAgICBzaG93KHBhdGgsIHZpZXcsIGtpZHMpIHtcclxuICAgICAgICBjb25zdCB1cmwgPSB0aGlzLl9qb2luKHBhdGgsIGtpZHMpO1xyXG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzLCByZWopID0+IHtcclxuICAgICAgICAgICAgY29uc3QgcmVkaXJlY3QgPSB1cmwyc3RyKHVybCk7XHJcbiAgICAgICAgICAgIGNvbnN0IG9iaiA9IHtcclxuICAgICAgICAgICAgICAgIHVybCxcclxuICAgICAgICAgICAgICAgIHJlZGlyZWN0LFxyXG4gICAgICAgICAgICAgICAgY29uZmlybTogUHJvbWlzZS5yZXNvbHZlKClcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgY29uc3QgYXBwID0gdmlldyA/IHZpZXcuYXBwIDogbnVsbDtcclxuICAgICAgICAgICAgLy8gd2hlbiBjcmVhdGluZyBhIG5ldyByb3V0ZSwgaXQgcG9zc2libGUgdGhhdCBpdCB3aWxsIG5vdCBoYXZlIGFueSBjb250ZW50XHJcbiAgICAgICAgICAgIC8vIGd1YXJkIGlzIG5vdCBuZWNlc3NhcnkgaW4gc3VjaCBjYXNlXHJcbiAgICAgICAgICAgIGlmIChhcHApIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHJlc3VsdCA9IGFwcC5jYWxsRXZlbnQoXCJhcHA6Z3VhcmRcIiwgW29iai5yZWRpcmVjdCwgdmlldywgb2JqXSk7XHJcbiAgICAgICAgICAgICAgICBpZiAoIXJlc3VsdCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJlaihuZXcgTmF2aWdhdGlvbkJsb2NrZWQoKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIG9iai5jb25maXJtLmNhdGNoKGVyciA9PiByZWooZXJyKSkudGhlbigoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAob2JqLnJlZGlyZWN0ID09PSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVqKG5ldyBOYXZpZ2F0aW9uQmxvY2tlZCgpKTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZiAob2JqLnJlZGlyZWN0ICE9PSByZWRpcmVjdCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGFwcC5zaG93KG9iai5yZWRpcmVjdCk7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVqKG5ldyBOYXZpZ2F0aW9uQmxvY2tlZCgpKTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB0aGlzLnJvdXRlLnBhdGggPSByZWRpcmVjdDtcclxuICAgICAgICAgICAgICAgIHRoaXMucm91dGUudXJsID0gdXJsO1xyXG4gICAgICAgICAgICAgICAgcmVzKCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgc2l6ZShuKSB7XHJcbiAgICAgICAgdGhpcy5fbmV4dCA9IG47XHJcbiAgICB9XHJcbiAgICBzcGxpdCgpIHtcclxuICAgICAgICBjb25zdCByb3V0ZSA9IHtcclxuICAgICAgICAgICAgdXJsOiB0aGlzLnJvdXRlLnVybC5zbGljZSh0aGlzLmluZGV4ICsgMSksXHJcbiAgICAgICAgICAgIHBhdGg6IFwiXCJcclxuICAgICAgICB9O1xyXG4gICAgICAgIGlmIChyb3V0ZS51cmwubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgIHJvdXRlLnBhdGggPSB1cmwyc3RyKHJvdXRlLnVybCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBuZXcgUm91dGUocm91dGUsIDApO1xyXG4gICAgfVxyXG4gICAgdXBkYXRlKG5hbWUsIHZhbHVlLCBpbmRleCkge1xyXG4gICAgICAgIGNvbnN0IGNodW5rID0gdGhpcy5yb3V0ZS51cmxbdGhpcy5pbmRleCArIChpbmRleCB8fCAwKV07XHJcbiAgICAgICAgaWYgKCFjaHVuaykge1xyXG4gICAgICAgICAgICB0aGlzLnJvdXRlLnVybC5wdXNoKHsgcGFnZTogXCJcIiwgcGFyYW1zOiB7fSB9KTtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMudXBkYXRlKG5hbWUsIHZhbHVlLCBpbmRleCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChuYW1lID09PSBcIlwiKSB7XHJcbiAgICAgICAgICAgIGNodW5rLnBhZ2UgPSB2YWx1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIGNodW5rLnBhcmFtc1tuYW1lXSA9IHZhbHVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLnJvdXRlLnBhdGggPSB1cmwyc3RyKHRoaXMucm91dGUudXJsKTtcclxuICAgIH1cclxufVxuXG5jbGFzcyBKZXRWaWV3IGV4dGVuZHMgSmV0QmFzZSB7XHJcbiAgICBjb25zdHJ1Y3RvcihhcHAsIGNvbmZpZykge1xyXG4gICAgICAgIHN1cGVyKGFwcC53ZWJpeCk7XHJcbiAgICAgICAgdGhpcy5hcHAgPSBhcHA7XHJcbiAgICAgICAgLy90aGlzLiRjb25maWcgPSBjb25maWc7XHJcbiAgICAgICAgdGhpcy5fY2hpbGRyZW4gPSBbXTtcclxuICAgIH1cclxuICAgIHVpKHVpLCBjb25maWcpIHtcclxuICAgICAgICBjb25maWcgPSBjb25maWcgfHwge307XHJcbiAgICAgICAgY29uc3QgY29udGFpbmVyID0gY29uZmlnLmNvbnRhaW5lciB8fCB1aS5jb250YWluZXI7XHJcbiAgICAgICAgY29uc3QgamV0dmlldyA9IHRoaXMuYXBwLmNyZWF0ZVZpZXcodWkpO1xyXG4gICAgICAgIHRoaXMuX2NoaWxkcmVuLnB1c2goamV0dmlldyk7XHJcbiAgICAgICAgamV0dmlldy5yZW5kZXIoY29udGFpbmVyLCB0aGlzLl9zZWdtZW50LCB0aGlzKTtcclxuICAgICAgICBpZiAodHlwZW9mIHVpICE9PSBcIm9iamVjdFwiIHx8ICh1aSBpbnN0YW5jZW9mIEpldEJhc2UpKSB7XHJcbiAgICAgICAgICAgIC8vIHJhdyB3ZWJpeCBVSVxyXG4gICAgICAgICAgICByZXR1cm4gamV0dmlldztcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIHJldHVybiBqZXR2aWV3LmdldFJvb3QoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBzaG93KHBhdGgsIGNvbmZpZykge1xyXG4gICAgICAgIGNvbmZpZyA9IGNvbmZpZyB8fCB7fTtcclxuICAgICAgICAvLyBjb252ZXJ0IHBhcmFtZXRlcnMgb2JqZWN0IHRvIHVybFxyXG4gICAgICAgIGlmICh0eXBlb2YgcGF0aCA9PT0gXCJvYmplY3RcIikge1xyXG4gICAgICAgICAgICBmb3IgKGNvbnN0IGtleSBpbiBwYXRoKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNldFBhcmFtKGtleSwgcGF0aFtrZXldKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBwYXRoID0gbnVsbDtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIC8vIGRlbGlnYXRlIHRvIGFwcCBpbiBjYXNlIG9mIHJvb3QgcHJlZml4XHJcbiAgICAgICAgICAgIGlmIChwYXRoLnN1YnN0cigwLCAxKSA9PT0gXCIvXCIpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmFwcC5zaG93KHBhdGgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIC8vIGxvY2FsIHBhdGgsIGRvIG5vdGhpbmdcclxuICAgICAgICAgICAgaWYgKHBhdGguaW5kZXhPZihcIi4vXCIpID09PSAwKSB7XHJcbiAgICAgICAgICAgICAgICBwYXRoID0gcGF0aC5zdWJzdHIoMik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgLy8gcGFyZW50IHBhdGgsIGNhbGwgcGFyZW50IHZpZXdcclxuICAgICAgICAgICAgaWYgKHBhdGguaW5kZXhPZihcIi4uL1wiKSA9PT0gMCkge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgcGFyZW50ID0gdGhpcy5nZXRQYXJlbnRWaWV3KCk7XHJcbiAgICAgICAgICAgICAgICBpZiAocGFyZW50KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHBhcmVudC5zaG93KHBhdGguc3Vic3RyKDMpLCBjb25maWcpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuYXBwLnNob3coXCIvXCIgKyBwYXRoLnN1YnN0cigzKSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY29uc3Qgc3ViID0gdGhpcy5nZXRTdWJWaWV3SW5mbyhjb25maWcudGFyZ2V0KTtcclxuICAgICAgICAgICAgaWYgKHN1Yikge1xyXG4gICAgICAgICAgICAgICAgaWYgKHN1Yi5wYXJlbnQgIT09IHRoaXMpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gc3ViLnBhcmVudC5zaG93KHBhdGgsIGNvbmZpZyk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlIGlmIChjb25maWcudGFyZ2V0ICYmIGNvbmZpZy50YXJnZXQgIT09IFwiZGVmYXVsdFwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3JlbmRlckZyYW1lTG9jayhjb25maWcudGFyZ2V0LCBzdWIuc3VidmlldywgcGF0aCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBpZiAocGF0aCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmFwcC5zaG93KFwiL1wiICsgcGF0aCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX3Nob3codGhpcy5fc2VnbWVudCwgcGF0aCwgdGhpcyk7XHJcbiAgICB9XHJcbiAgICBfc2hvdyhzZWdtZW50LCBwYXRoLCB2aWV3KSB7XHJcbiAgICAgICAgcmV0dXJuIHNlZ21lbnQuc2hvdyhwYXRoLCB2aWV3LCB0cnVlKS50aGVuKCgpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5faW5pdF91cmxfZGF0YSgpO1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fdXJsQ2hhbmdlKCk7XHJcbiAgICAgICAgfSkudGhlbigoKSA9PiB7XHJcbiAgICAgICAgICAgIGlmIChzZWdtZW50LnJvdXRlLmxpbmtSb3V0ZXIpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuYXBwLmdldFJvdXRlcigpLnNldChzZWdtZW50LnJvdXRlLnBhdGgsIHsgc2lsZW50OiB0cnVlIH0pO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5hcHAuY2FsbEV2ZW50KFwiYXBwOnJvdXRlXCIsIFtzZWdtZW50LnJvdXRlLnBhdGhdKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgaW5pdChfJHZpZXcsIF8kKSB7XHJcbiAgICAgICAgLy8gc3R1YlxyXG4gICAgfVxyXG4gICAgcmVhZHkoXyR2aWV3LCBfJHVybCkge1xyXG4gICAgICAgIC8vIHN0dWJcclxuICAgIH1cclxuICAgIGNvbmZpZygpIHtcclxuICAgICAgICB0aGlzLmFwcC53ZWJpeC5tZXNzYWdlKFwiVmlldzpDb25maWcgaXMgbm90IGltcGxlbWVudGVkXCIpO1xyXG4gICAgfVxyXG4gICAgdXJsQ2hhbmdlKF8kdmlldywgXyR1cmwpIHtcclxuICAgICAgICAvLyBzdHViXHJcbiAgICB9XHJcbiAgICBkZXN0cm95KCkge1xyXG4gICAgICAgIC8vIHN0dWJcclxuICAgIH1cclxuICAgIGRlc3RydWN0b3IoKSB7XHJcbiAgICAgICAgdGhpcy5kZXN0cm95KCk7XHJcbiAgICAgICAgdGhpcy5fZGVzdHJveUtpZHMoKTtcclxuICAgICAgICAvLyBkZXN0cm95IGFjdHVhbCBVSVxyXG4gICAgICAgIHRoaXMuX3Jvb3QuZGVzdHJ1Y3RvcigpO1xyXG4gICAgICAgIHN1cGVyLmRlc3RydWN0b3IoKTtcclxuICAgIH1cclxuICAgIHVzZShwbHVnaW4sIGNvbmZpZykge1xyXG4gICAgICAgIHBsdWdpbih0aGlzLmFwcCwgdGhpcywgY29uZmlnKTtcclxuICAgIH1cclxuICAgIHJlZnJlc2goKSB7XHJcbiAgICAgICAgY29uc3QgdXJsID0gdGhpcy5nZXRVcmwoKTtcclxuICAgICAgICB0aGlzLmRlc3Ryb3koKTtcclxuICAgICAgICB0aGlzLl9kZXN0cm95S2lkcygpO1xyXG4gICAgICAgIHRoaXMuX2Rlc3Ryb3lTdWJzKCk7XHJcbiAgICAgICAgdGhpcy5fZGV0YWNoRXZlbnRzKCk7XHJcbiAgICAgICAgaWYgKHRoaXMuX2NvbnRhaW5lci50YWdOYW1lKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX3Jvb3QuZGVzdHJ1Y3RvcigpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLl9zZWdtZW50LnJlZnJlc2goKTtcclxuICAgICAgICByZXR1cm4gdGhpcy5fcmVuZGVyKHRoaXMuX3NlZ21lbnQpO1xyXG4gICAgfVxyXG4gICAgcmVuZGVyKHJvb3QsIHVybCwgcGFyZW50KSB7XHJcbiAgICAgICAgaWYgKHR5cGVvZiB1cmwgPT09IFwic3RyaW5nXCIpIHtcclxuICAgICAgICAgICAgdXJsID0gbmV3IFJvdXRlKHVybCwgMCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuX3NlZ21lbnQgPSB1cmw7XHJcbiAgICAgICAgdGhpcy5fcGFyZW50ID0gcGFyZW50O1xyXG4gICAgICAgIHRoaXMuX2luaXRfdXJsX2RhdGEoKTtcclxuICAgICAgICByb290ID0gcm9vdCB8fCBkb2N1bWVudC5ib2R5O1xyXG4gICAgICAgIGNvbnN0IF9jb250YWluZXIgPSAodHlwZW9mIHJvb3QgPT09IFwic3RyaW5nXCIpID8gdGhpcy53ZWJpeC50b05vZGUocm9vdCkgOiByb290O1xyXG4gICAgICAgIGlmICh0aGlzLl9jb250YWluZXIgIT09IF9jb250YWluZXIpIHtcclxuICAgICAgICAgICAgdGhpcy5fY29udGFpbmVyID0gX2NvbnRhaW5lcjtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3JlbmRlcih1cmwpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3VybENoYW5nZSgpLnRoZW4oKCkgPT4gdGhpcy5nZXRSb290KCkpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIF9yZW5kZXIodXJsKSB7XHJcbiAgICAgICAgY29uc3QgY29uZmlnID0gdGhpcy5jb25maWcoKTtcclxuICAgICAgICBpZiAoY29uZmlnLnRoZW4pIHtcclxuICAgICAgICAgICAgcmV0dXJuIGNvbmZpZy50aGVuKGNmZyA9PiB0aGlzLl9yZW5kZXJfZmluYWwoY2ZnLCB1cmwpKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9yZW5kZXJfZmluYWwoY29uZmlnLCB1cmwpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIF9yZW5kZXJfZmluYWwoY29uZmlnLCB1cmwpIHtcclxuICAgICAgICAvLyBnZXQgcHJldmlvdXMgdmlldyBpbiB0aGUgc2FtZSBzbG90XHJcbiAgICAgICAgbGV0IHNsb3QgPSBudWxsO1xyXG4gICAgICAgIGxldCBjb250YWluZXIgPSBudWxsO1xyXG4gICAgICAgIGxldCBzaG93ID0gZmFsc2U7XHJcbiAgICAgICAgaWYgKCF0aGlzLl9jb250YWluZXIudGFnTmFtZSkge1xyXG4gICAgICAgICAgICBzbG90ID0gdGhpcy5fY29udGFpbmVyO1xyXG4gICAgICAgICAgICBpZiAoc2xvdC5wb3B1cCkge1xyXG4gICAgICAgICAgICAgICAgY29udGFpbmVyID0gZG9jdW1lbnQuYm9keTtcclxuICAgICAgICAgICAgICAgIHNob3cgPSB0cnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgY29udGFpbmVyID0gdGhpcy53ZWJpeC4kJChzbG90LmlkKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgY29udGFpbmVyID0gdGhpcy5fY29udGFpbmVyO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvLyB2aWV3IGFscmVhZHkgZGVzdHJveWVkXHJcbiAgICAgICAgaWYgKCF0aGlzLmFwcCB8fCAhY29udGFpbmVyKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdChudWxsKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IHJlc3BvbnNlO1xyXG4gICAgICAgIGNvbnN0IGN1cnJlbnQgPSB0aGlzLl9zZWdtZW50LmN1cnJlbnQoKTtcclxuICAgICAgICAvLyB1c2luZyB3cmFwcGVyIG9iamVjdCwgc28gdWkgY2FuIGJlIGNoYW5nZWQgZnJvbSBhcHA6cmVuZGVyIGV2ZW50XHJcbiAgICAgICAgY29uc3QgcmVzdWx0ID0geyB1aToge30gfTtcclxuICAgICAgICB0aGlzLmFwcC5jb3B5Q29uZmlnKGNvbmZpZywgcmVzdWx0LnVpLCB0aGlzLl9zdWJzKTtcclxuICAgICAgICB0aGlzLmFwcC5jYWxsRXZlbnQoXCJhcHA6cmVuZGVyXCIsIFt0aGlzLCB1cmwsIHJlc3VsdF0pO1xyXG4gICAgICAgIHJlc3VsdC51aS4kc2NvcGUgPSB0aGlzO1xyXG4gICAgICAgIC8qIGRlc3Ryb3kgb2xkIEhUTUwgYXR0YWNoZWQgdmlld3MgYmVmb3JlIGNyZWF0aW5nIG5ldyBvbmUgKi9cclxuICAgICAgICBpZiAoIXNsb3QgJiYgY3VycmVudC5pc05ldyAmJiBjdXJyZW50LnZpZXcpIHtcclxuICAgICAgICAgICAgY3VycmVudC52aWV3LmRlc3RydWN0b3IoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgLy8gc3BlY2lhbCBoYW5kbGluZyBmb3IgYWRkaW5nIGluc2lkZSBvZiBtdWx0aXZpZXcgLSBwcmVzZXJ2ZSBvbGQgaWRcclxuICAgICAgICAgICAgaWYgKHNsb3QgJiYgIXNob3cpIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IG9sZHVpID0gY29udGFpbmVyO1xyXG4gICAgICAgICAgICAgICAgY29uc3QgcGFyZW50ID0gb2xkdWkuZ2V0UGFyZW50VmlldygpO1xyXG4gICAgICAgICAgICAgICAgaWYgKHBhcmVudCAmJiBwYXJlbnQubmFtZSA9PT0gXCJtdWx0aXZpZXdcIiAmJiAhcmVzdWx0LnVpLmlkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0LnVpLmlkID0gb2xkdWkuY29uZmlnLmlkO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMuX3Jvb3QgPSB0aGlzLmFwcC53ZWJpeC51aShyZXN1bHQudWksIGNvbnRhaW5lcik7XHJcbiAgICAgICAgICAgIGNvbnN0IGFzV2luID0gdGhpcy5fcm9vdDtcclxuICAgICAgICAgICAgLy8gY2hlY2sgZm9yIHVybCBhZGRlZCB0byBpZ25vcmUgdGhpcy51aSBjYWxsc1xyXG4gICAgICAgICAgICBpZiAoc2hvdyAmJiBhc1dpbi5zZXRQb3NpdGlvbiAmJiAhYXNXaW4uaXNWaXNpYmxlKCkpIHtcclxuICAgICAgICAgICAgICAgIGFzV2luLnNob3coKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAvLyBjaGVjaywgaWYgd2UgYXJlIHJlcGxhY2luZyBzb21lIG9sZGVyIHZpZXdcclxuICAgICAgICAgICAgaWYgKHNsb3QpIHtcclxuICAgICAgICAgICAgICAgIGlmIChzbG90LnZpZXcgJiYgc2xvdC52aWV3ICE9PSB0aGlzICYmIHNsb3QudmlldyAhPT0gdGhpcy5hcHApIHtcclxuICAgICAgICAgICAgICAgICAgICBzbG90LnZpZXcuZGVzdHJ1Y3RvcigpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgc2xvdC5pZCA9IHRoaXMuX3Jvb3QuY29uZmlnLmlkO1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuZ2V0UGFyZW50VmlldygpIHx8ICF0aGlzLmFwcC5hcHApXHJcbiAgICAgICAgICAgICAgICAgICAgc2xvdC52aWV3ID0gdGhpcztcclxuICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIHdoZW4gd2UgaGF2ZSBzdWJhcHAsIHNldCB3aG9sZSBhcHAgYXMgYSB2aWV3XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gc28gb24gZGVzdHJ1Y3Rpb24sIHRoZSB3aG9sZSBhcHAgd2lsbCBiZSBkZXN0cm95ZWRcclxuICAgICAgICAgICAgICAgICAgICBzbG90LnZpZXcgPSB0aGlzLmFwcDtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoY3VycmVudC5pc05ldykge1xyXG4gICAgICAgICAgICAgICAgY3VycmVudC52aWV3ID0gdGhpcztcclxuICAgICAgICAgICAgICAgIGN1cnJlbnQuaXNOZXcgPSBmYWxzZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXNwb25zZSA9IFByb21pc2UucmVzb2x2ZSh0aGlzLl9pbml0KHRoaXMuX3Jvb3QsIHVybCkpLnRoZW4oKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3VybENoYW5nZSgpLnRoZW4oKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2luaXRVcmwgPSBudWxsO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLnJlYWR5KHRoaXMuX3Jvb3QsIHVybC5zdWJ1cmwoKSk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNhdGNoIChlKSB7XHJcbiAgICAgICAgICAgIHJlc3BvbnNlID0gUHJvbWlzZS5yZWplY3QoZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiByZXNwb25zZS5jYXRjaChlcnIgPT4gdGhpcy5faW5pdEVycm9yKHRoaXMsIGVycikpO1xyXG4gICAgfVxyXG4gICAgX2luaXQodmlldywgdXJsKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuaW5pdCh2aWV3LCB1cmwuc3VidXJsKCkpO1xyXG4gICAgfVxyXG4gICAgX3VybENoYW5nZSgpIHtcclxuICAgICAgICB0aGlzLmFwcC5jYWxsRXZlbnQoXCJhcHA6dXJsY2hhbmdlXCIsIFt0aGlzLCB0aGlzLl9zZWdtZW50XSk7XHJcbiAgICAgICAgY29uc3Qgd2FpdHMgPSBbXTtcclxuICAgICAgICBmb3IgKGNvbnN0IGtleSBpbiB0aGlzLl9zdWJzKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGZyYW1lID0gdGhpcy5fc3Vic1trZXldO1xyXG4gICAgICAgICAgICBjb25zdCB3YWl0ID0gdGhpcy5fcmVuZGVyRnJhbWVMb2NrKGtleSwgZnJhbWUsIG51bGwpO1xyXG4gICAgICAgICAgICBpZiAod2FpdCkge1xyXG4gICAgICAgICAgICAgICAgd2FpdHMucHVzaCh3YWl0KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gUHJvbWlzZS5hbGwod2FpdHMpLnRoZW4oKCkgPT4ge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy51cmxDaGFuZ2UodGhpcy5fcm9vdCwgdGhpcy5fc2VnbWVudC5zdWJ1cmwoKSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICBfcmVuZGVyRnJhbWVMb2NrKGtleSwgZnJhbWUsIHBhdGgpIHtcclxuICAgICAgICAvLyBpZiBzdWJ2aWV3IGlzIG5vdCBvY2N1cGllZCBieSBzb21lIHJlbmRlcmluZyB5ZXRcclxuICAgICAgICBpZiAoIWZyYW1lLmxvY2spIHtcclxuICAgICAgICAgICAgLy8gcmV0cmVpdmUgYW5kIHN0b3JlIHJlbmRlcmluZyBlbmQgcHJvbWlzZVxyXG4gICAgICAgICAgICBjb25zdCBsb2NrID0gdGhpcy5fcmVuZGVyRnJhbWUoa2V5LCBmcmFtZSwgcGF0aCk7XHJcbiAgICAgICAgICAgIGlmIChsb2NrKSB7XHJcbiAgICAgICAgICAgICAgICAvLyBjbGVhciBsb2NrIGFmdGVyIGZyYW1lIHJlbmRlcmluZ1xyXG4gICAgICAgICAgICAgICAgLy8gYXMgcHJvbWlzZS5maW5hbGx5IGlzIG5vdCBzdXBwb3J0ZWQgYnkgIFdlYml4IGxlc3NlciB0aGFuIDYuMlxyXG4gICAgICAgICAgICAgICAgLy8gdXNpbmcgYSBtb3JlIHZlcmJvc2Ugbm90YXRpb25cclxuICAgICAgICAgICAgICAgIGZyYW1lLmxvY2sgPSBsb2NrLnRoZW4oKCkgPT4gZnJhbWUubG9jayA9IG51bGwsICgpID0+IGZyYW1lLmxvY2sgPSBudWxsKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICAvLyByZXR1cm4gcmVuZGVyaW5nIGVuZCBwcm9taXNlXHJcbiAgICAgICAgcmV0dXJuIGZyYW1lLmxvY2s7XHJcbiAgICB9XHJcbiAgICBfcmVuZGVyRnJhbWUoa2V5LCBmcmFtZSwgcGF0aCkge1xyXG4gICAgICAgIC8vZGVmYXVsdCByb3V0ZVxyXG4gICAgICAgIGlmIChrZXkgPT09IFwiZGVmYXVsdFwiKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLl9zZWdtZW50Lm5leHQoKSkge1xyXG4gICAgICAgICAgICAgICAgLy8gd2UgaGF2ZSBhIG5leHQgc2VnbWVudCBpbiB1cmwsIHJlbmRlciBpdFxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2NyZWF0ZVN1YlZpZXcoZnJhbWUsIHRoaXMuX3NlZ21lbnQuc2hpZnQoKSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSBpZiAoZnJhbWUudmlldyAmJiBmcmFtZS5wb3B1cCkge1xyXG4gICAgICAgICAgICAgICAgLy8gdGhlcmUgaXMgbm8gbmV4dCBzZWdtZW50LCBkZWxldGUgdGhlIGV4aXN0aW5nIHN1Yi12aWV3XHJcbiAgICAgICAgICAgICAgICBmcmFtZS52aWV3LmRlc3RydWN0b3IoKTtcclxuICAgICAgICAgICAgICAgIGZyYW1lLnZpZXcgPSBudWxsO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vaWYgbmV3IHBhdGggcHJvdmlkZWQsIHNldCBpdCB0byB0aGUgZnJhbWVcclxuICAgICAgICBpZiAocGF0aCAhPT0gbnVsbCkge1xyXG4gICAgICAgICAgICBmcmFtZS51cmwgPSBwYXRoO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvLyBpbiBjYXNlIG9mIHJvdXRlZCBzdWItdmlld1xyXG4gICAgICAgIGlmIChmcmFtZS5yb3V0ZSkge1xyXG4gICAgICAgICAgICAvLyB3ZSBoYXZlIGEgbmV3IHBhdGggZm9yIHN1Yi12aWV3XHJcbiAgICAgICAgICAgIGlmIChwYXRoICE9PSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZnJhbWUucm91dGUuc2hvdyhwYXRoLCBmcmFtZS52aWV3KS50aGVuKCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fY3JlYXRlU3ViVmlldyhmcmFtZSwgZnJhbWUucm91dGUpO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgLy8gZG8gbm90IHRyaWdnZXIgb25DaGFuZ2UgZm9yIGlzb2xhdGVkIHN1Yi12aWV3c1xyXG4gICAgICAgICAgICBpZiAoZnJhbWUuYnJhbmNoKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IHZpZXcgPSBmcmFtZS52aWV3O1xyXG4gICAgICAgIC8vIGlmIHZpZXcgZG9lc24ndCBleGlzdHMgeWV0LCBpbml0IGl0XHJcbiAgICAgICAgaWYgKCF2aWV3ICYmIGZyYW1lLnVybCkge1xyXG4gICAgICAgICAgICBpZiAodHlwZW9mIGZyYW1lLnVybCA9PT0gXCJzdHJpbmdcIikge1xyXG4gICAgICAgICAgICAgICAgLy8gc3RyaW5nLCBzbyB3ZSBoYXZlIGlzb2xhdGVkIHN1YnZpZXcgdXJsXHJcbiAgICAgICAgICAgICAgICBmcmFtZS5yb3V0ZSA9IG5ldyBSb3V0ZShmcmFtZS51cmwsIDApO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2NyZWF0ZVN1YlZpZXcoZnJhbWUsIGZyYW1lLnJvdXRlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIC8vIG9iamVjdCwgc28gd2UgaGF2ZSBhbiBlbWJlZGVkIHN1YnZpZXdcclxuICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgZnJhbWUudXJsID09PSBcImZ1bmN0aW9uXCIgJiYgISh2aWV3IGluc3RhbmNlb2YgZnJhbWUudXJsKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHZpZXcgPSBuZXcgZnJhbWUudXJsKHRoaXMuYXBwLCBcIlwiKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmICghdmlldykge1xyXG4gICAgICAgICAgICAgICAgICAgIHZpZXcgPSBmcmFtZS51cmw7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gdHJpZ2dlciBvbkNoYW5nZSBmb3IgYWxyZWFkeSBleGlzdGVkIHZpZXdcclxuICAgICAgICBpZiAodmlldykge1xyXG4gICAgICAgICAgICByZXR1cm4gdmlldy5yZW5kZXIoZnJhbWUsIChmcmFtZS5yb3V0ZSB8fCB0aGlzLl9zZWdtZW50KSwgdGhpcyk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgX2luaXRFcnJvcih2aWV3LCBlcnIpIHtcclxuICAgICAgICAvKlxyXG4gICAgICAgICAgICBpZiB2aWV3IGlzIGRlc3Ryb3llZCwgaWdub3JlIGFueSB2aWV3IHJlbGF0ZWQgZXJyb3JzXHJcbiAgICAgICAgKi9cclxuICAgICAgICBpZiAodGhpcy5hcHApIHtcclxuICAgICAgICAgICAgdGhpcy5hcHAuZXJyb3IoXCJhcHA6ZXJyb3I6aW5pdHZpZXdcIiwgW2Vyciwgdmlld10pO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH1cclxuICAgIF9jcmVhdGVTdWJWaWV3KHN1Yiwgc3VidXJsKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuYXBwLmNyZWF0ZUZyb21VUkwoc3VidXJsLmN1cnJlbnQoKSkudGhlbih2aWV3ID0+IHtcclxuICAgICAgICAgICAgcmV0dXJuIHZpZXcucmVuZGVyKHN1Yiwgc3VidXJsLCB0aGlzKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuICAgIF9kZXN0cm95S2lkcygpIHtcclxuICAgICAgICAvLyBkZXN0cm95IGNoaWxkIHZpZXdzXHJcbiAgICAgICAgY29uc3QgdWlzID0gdGhpcy5fY2hpbGRyZW47XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IHVpcy5sZW5ndGggLSAxOyBpID49IDA7IGktLSkge1xyXG4gICAgICAgICAgICBpZiAodWlzW2ldICYmIHVpc1tpXS5kZXN0cnVjdG9yKSB7XHJcbiAgICAgICAgICAgICAgICB1aXNbaV0uZGVzdHJ1Y3RvcigpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIHJlc2V0IHZhcnMgZm9yIGJldHRlciBHQyBwcm9jZXNzaW5nXHJcbiAgICAgICAgdGhpcy5fY2hpbGRyZW4gPSBbXTtcclxuICAgIH1cclxufVxuXG4vLyB3cmFwcGVyIGZvciByYXcgb2JqZWN0cyBhbmQgSmV0IDEueCBzdHJ1Y3RzXHJcbmNsYXNzIEpldFZpZXdSYXcgZXh0ZW5kcyBKZXRWaWV3IHtcclxuICAgIGNvbnN0cnVjdG9yKGFwcCwgY29uZmlnKSB7XHJcbiAgICAgICAgc3VwZXIoYXBwLCBjb25maWcpO1xyXG4gICAgICAgIHRoaXMuX3VpID0gY29uZmlnLnVpO1xyXG4gICAgfVxyXG4gICAgY29uZmlnKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl91aTtcclxuICAgIH1cclxufVxuXG5jbGFzcyBTdWJSb3V0ZXIge1xyXG4gICAgY29uc3RydWN0b3IoY2IsIGNvbmZpZywgYXBwKSB7XHJcbiAgICAgICAgdGhpcy5wYXRoID0gXCJcIjtcclxuICAgICAgICB0aGlzLmFwcCA9IGFwcDtcclxuICAgIH1cclxuICAgIHNldChwYXRoLCBjb25maWcpIHtcclxuICAgICAgICB0aGlzLnBhdGggPSBwYXRoO1xyXG4gICAgICAgIGNvbnN0IGEgPSB0aGlzLmFwcDtcclxuICAgICAgICBhLmFwcC5nZXRSb3V0ZXIoKS5zZXQoYS5fc2VnbWVudC5hcHBlbmQodGhpcy5wYXRoKSwgeyBzaWxlbnQ6IHRydWUgfSk7XHJcbiAgICB9XHJcbiAgICBnZXQoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMucGF0aDtcclxuICAgIH1cclxufVxuXG5sZXQgX29uY2UgPSB0cnVlO1xyXG5jbGFzcyBKZXRBcHBCYXNlIGV4dGVuZHMgSmV0QmFzZSB7XHJcbiAgICBjb25zdHJ1Y3Rvcihjb25maWcpIHtcclxuICAgICAgICBjb25zdCB3ZWJpeCA9IChjb25maWcgfHwge30pLndlYml4IHx8IHdpbmRvdy53ZWJpeDtcclxuICAgICAgICBzdXBlcih3ZWJpeCk7XHJcbiAgICAgICAgLy8gaW5pdCBjb25maWdcclxuICAgICAgICB0aGlzLmNvbmZpZyA9IHRoaXMud2ViaXguZXh0ZW5kKHtcclxuICAgICAgICAgICAgbmFtZTogXCJBcHBcIixcclxuICAgICAgICAgICAgdmVyc2lvbjogXCIxLjBcIixcclxuICAgICAgICAgICAgc3RhcnQ6IFwiL2hvbWVcIlxyXG4gICAgICAgIH0sIGNvbmZpZywgdHJ1ZSk7XHJcbiAgICAgICAgdGhpcy5hcHAgPSB0aGlzLmNvbmZpZy5hcHA7XHJcbiAgICAgICAgdGhpcy5yZWFkeSA9IFByb21pc2UucmVzb2x2ZSgpO1xyXG4gICAgICAgIHRoaXMuX3NlcnZpY2VzID0ge307XHJcbiAgICAgICAgdGhpcy53ZWJpeC5leHRlbmQodGhpcywgdGhpcy53ZWJpeC5FdmVudFN5c3RlbSk7XHJcbiAgICB9XHJcbiAgICBnZXRVcmwoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX3N1YlNlZ21lbnQuc3VidXJsKCk7XHJcbiAgICB9XHJcbiAgICBnZXRVcmxTdHJpbmcoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX3N1YlNlZ21lbnQudG9TdHJpbmcoKTtcclxuICAgIH1cclxuICAgIGdldFNlcnZpY2UobmFtZSkge1xyXG4gICAgICAgIGxldCBvYmogPSB0aGlzLl9zZXJ2aWNlc1tuYW1lXTtcclxuICAgICAgICBpZiAodHlwZW9mIG9iaiA9PT0gXCJmdW5jdGlvblwiKSB7XHJcbiAgICAgICAgICAgIG9iaiA9IHRoaXMuX3NlcnZpY2VzW25hbWVdID0gb2JqKHRoaXMpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gb2JqO1xyXG4gICAgfVxyXG4gICAgc2V0U2VydmljZShuYW1lLCBoYW5kbGVyKSB7XHJcbiAgICAgICAgdGhpcy5fc2VydmljZXNbbmFtZV0gPSBoYW5kbGVyO1xyXG4gICAgfVxyXG4gICAgZGVzdHJ1Y3RvcigpIHtcclxuICAgICAgICB0aGlzLmdldFN1YlZpZXcoKS5kZXN0cnVjdG9yKCk7XHJcbiAgICAgICAgc3VwZXIuZGVzdHJ1Y3RvcigpO1xyXG4gICAgfVxyXG4gICAgLy8gY29weSBvYmplY3QgYW5kIGNvbGxlY3QgZXh0cmEgaGFuZGxlcnNcclxuICAgIGNvcHlDb25maWcob2JqLCB0YXJnZXQsIGNvbmZpZykge1xyXG4gICAgICAgIC8vIHJhdyB1aSBjb25maWdcclxuICAgICAgICBpZiAob2JqIGluc3RhbmNlb2YgSmV0QmFzZSB8fFxyXG4gICAgICAgICAgICAodHlwZW9mIG9iaiA9PT0gXCJmdW5jdGlvblwiICYmIG9iai5wcm90b3R5cGUgaW5zdGFuY2VvZiBKZXRCYXNlKSkge1xyXG4gICAgICAgICAgICBvYmogPSB7ICRzdWJ2aWV3OiBvYmogfTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gc3VidmlldyBwbGFjZWhvbGRlclxyXG4gICAgICAgIGlmICh0eXBlb2Ygb2JqLiRzdWJ2aWV3ICE9IFwidW5kZWZpbmVkXCIpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuYWRkU3ViVmlldyhvYmosIHRhcmdldCwgY29uZmlnKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gcHJvY2VzcyBzdWItcHJvcGVydGllc1xyXG4gICAgICAgIHRhcmdldCA9IHRhcmdldCB8fCAob2JqIGluc3RhbmNlb2YgQXJyYXkgPyBbXSA6IHt9KTtcclxuICAgICAgICBmb3IgKGNvbnN0IG1ldGhvZCBpbiBvYmopIHtcclxuICAgICAgICAgICAgbGV0IHBvaW50ID0gb2JqW21ldGhvZF07XHJcbiAgICAgICAgICAgIC8vIHZpZXcgY2xhc3NcclxuICAgICAgICAgICAgaWYgKHR5cGVvZiBwb2ludCA9PT0gXCJmdW5jdGlvblwiICYmIHBvaW50LnByb3RvdHlwZSBpbnN0YW5jZW9mIEpldEJhc2UpIHtcclxuICAgICAgICAgICAgICAgIHBvaW50ID0geyAkc3VidmlldzogcG9pbnQgfTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAocG9pbnQgJiYgdHlwZW9mIHBvaW50ID09PSBcIm9iamVjdFwiICYmXHJcbiAgICAgICAgICAgICAgICAhKHBvaW50IGluc3RhbmNlb2YgdGhpcy53ZWJpeC5EYXRhQ29sbGVjdGlvbikgJiYgIShwb2ludCBpbnN0YW5jZW9mIFJlZ0V4cCkpIHtcclxuICAgICAgICAgICAgICAgIGlmIChwb2ludCBpbnN0YW5jZW9mIERhdGUpIHtcclxuICAgICAgICAgICAgICAgICAgICB0YXJnZXRbbWV0aG9kXSA9IG5ldyBEYXRlKHBvaW50KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGNvcHkgPSB0aGlzLmNvcHlDb25maWcocG9pbnQsIChwb2ludCBpbnN0YW5jZW9mIEFycmF5ID8gW10gOiB7fSksIGNvbmZpZyk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGNvcHkgIT09IG51bGwpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGFyZ2V0W21ldGhvZF0gPSBjb3B5O1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHRhcmdldFttZXRob2RdID0gcG9pbnQ7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRhcmdldDtcclxuICAgIH1cclxuICAgIGdldFJvdXRlcigpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy4kcm91dGVyO1xyXG4gICAgfVxyXG4gICAgY2xpY2tIYW5kbGVyKGUsIHRhcmdldCkge1xyXG4gICAgICAgIGlmIChlKSB7XHJcbiAgICAgICAgICAgIHRhcmdldCA9IHRhcmdldCB8fCAoZS50YXJnZXQgfHwgZS5zcmNFbGVtZW50KTtcclxuICAgICAgICAgICAgaWYgKHRhcmdldCAmJiB0YXJnZXQuZ2V0QXR0cmlidXRlKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCB0cmlnZ2VyID0gdGFyZ2V0LmdldEF0dHJpYnV0ZShcInRyaWdnZXJcIik7XHJcbiAgICAgICAgICAgICAgICBpZiAodHJpZ2dlcikge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2ZvclZpZXcodGFyZ2V0LCB2aWV3ID0+IHZpZXcuYXBwLnRyaWdnZXIodHJpZ2dlcikpO1xyXG4gICAgICAgICAgICAgICAgICAgIGUuY2FuY2VsQnViYmxlID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgY29uc3Qgcm91dGUgPSB0YXJnZXQuZ2V0QXR0cmlidXRlKFwicm91dGVcIik7XHJcbiAgICAgICAgICAgICAgICBpZiAocm91dGUpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9mb3JWaWV3KHRhcmdldCwgdmlldyA9PiB2aWV3LnNob3cocm91dGUpKTtcclxuICAgICAgICAgICAgICAgICAgICBlLmNhbmNlbEJ1YmJsZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBjb25zdCBwYXJlbnQgPSB0YXJnZXQucGFyZW50Tm9kZTtcclxuICAgICAgICBpZiAocGFyZW50KSB7XHJcbiAgICAgICAgICAgIHRoaXMuY2xpY2tIYW5kbGVyKGUsIHBhcmVudCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgZ2V0Um9vdCgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5nZXRTdWJWaWV3KCkuZ2V0Um9vdCgpO1xyXG4gICAgfVxyXG4gICAgcmVmcmVzaCgpIHtcclxuICAgICAgICBpZiAoIXRoaXMuX3N1YlNlZ21lbnQpIHtcclxuICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZShudWxsKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0U3ViVmlldygpLnJlZnJlc2goKS50aGVuKHZpZXcgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLmNhbGxFdmVudChcImFwcDpyb3V0ZVwiLCBbdGhpcy5nZXRVcmwoKV0pO1xyXG4gICAgICAgICAgICByZXR1cm4gdmlldztcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuICAgIGxvYWRWaWV3KHVybCkge1xyXG4gICAgICAgIGNvbnN0IHZpZXdzID0gdGhpcy5jb25maWcudmlld3M7XHJcbiAgICAgICAgbGV0IHJlc3VsdCA9IG51bGw7XHJcbiAgICAgICAgaWYgKHVybCA9PT0gXCJcIikge1xyXG4gICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKHRoaXMuX2xvYWRFcnJvcihcIlwiLCBuZXcgRXJyb3IoXCJXZWJpeCBKZXQ6IEVtcHR5IHVybCBzZWdtZW50XCIpKSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIGlmICh2aWV3cykge1xyXG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZiB2aWV3cyA9PT0gXCJmdW5jdGlvblwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gY3VzdG9tIGxvYWRpbmcgc3RyYXRlZ3lcclxuICAgICAgICAgICAgICAgICAgICByZXN1bHQgPSB2aWV3cyh1cmwpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gcHJlZGVmaW5lZCBoYXNoXHJcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0ID0gdmlld3NbdXJsXTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgcmVzdWx0ID09PSBcInN0cmluZ1wiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdXJsID0gcmVzdWx0O1xyXG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdCA9IG51bGw7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKCFyZXN1bHQpIHtcclxuICAgICAgICAgICAgICAgIGlmICh1cmwgPT09IFwiX2JsYW5rXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXN1bHQgPSB7fTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdCA9IHRoaXMuX2xvYWRWaWV3RHluYW1pYyh1cmwpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNhdGNoIChlKSB7XHJcbiAgICAgICAgICAgIHJlc3VsdCA9IHRoaXMuX2xvYWRFcnJvcih1cmwsIGUpO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvLyBjdXN0b20gaGFuZGxlciBjYW4gcmV0dXJuIHZpZXcgb3IgaXRzIHByb21pc2VcclxuICAgICAgICBpZiAoIXJlc3VsdC50aGVuKSB7XHJcbiAgICAgICAgICAgIHJlc3VsdCA9IFByb21pc2UucmVzb2x2ZShyZXN1bHQpO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvLyBzZXQgZXJyb3IgaGFuZGxlclxyXG4gICAgICAgIHJlc3VsdCA9IHJlc3VsdFxyXG4gICAgICAgICAgICAudGhlbihtb2R1bGUgPT4gbW9kdWxlLl9fZXNNb2R1bGUgPyBtb2R1bGUuZGVmYXVsdCA6IG1vZHVsZSlcclxuICAgICAgICAgICAgLmNhdGNoKGVyciA9PiB0aGlzLl9sb2FkRXJyb3IodXJsLCBlcnIpKTtcclxuICAgICAgICByZXR1cm4gcmVzdWx0O1xyXG4gICAgfVxyXG4gICAgX2ZvclZpZXcodGFyZ2V0LCBoYW5kbGVyKSB7XHJcbiAgICAgICAgY29uc3QgdmlldyA9IHRoaXMud2ViaXguJCQodGFyZ2V0KTtcclxuICAgICAgICBpZiAodmlldykge1xyXG4gICAgICAgICAgICBoYW5kbGVyKHZpZXcuJHNjb3BlKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBfbG9hZFZpZXdEeW5hbWljKHVybCkge1xyXG4gICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgfVxyXG4gICAgY3JlYXRlRnJvbVVSTChjaHVuaykge1xyXG4gICAgICAgIGxldCB2aWV3O1xyXG4gICAgICAgIGlmIChjaHVuay5pc05ldyB8fCAhY2h1bmsudmlldykge1xyXG4gICAgICAgICAgICB2aWV3ID0gdGhpcy5sb2FkVmlldyhjaHVuay5wYWdlKVxyXG4gICAgICAgICAgICAgICAgLnRoZW4odWkgPT4gdGhpcy5jcmVhdGVWaWV3KHVpLCBuYW1lKSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICB2aWV3ID0gUHJvbWlzZS5yZXNvbHZlKGNodW5rLnZpZXcpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdmlldztcclxuICAgIH1cclxuICAgIGNyZWF0ZVZpZXcodWksIG5hbWUpIHtcclxuICAgICAgICBsZXQgb2JqO1xyXG4gICAgICAgIGlmICh0eXBlb2YgdWkgPT09IFwiZnVuY3Rpb25cIikge1xyXG4gICAgICAgICAgICBpZiAodWkucHJvdG90eXBlIGluc3RhbmNlb2YgSmV0QXBwQmFzZSkge1xyXG4gICAgICAgICAgICAgICAgLy8gVUkgY2xhc3NcclxuICAgICAgICAgICAgICAgIHJldHVybiBuZXcgdWkoeyBhcHA6IHRoaXMsIG5hbWUsIHJvdXRlcjogU3ViUm91dGVyIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2UgaWYgKHVpLnByb3RvdHlwZSBpbnN0YW5jZW9mIEpldEJhc2UpIHtcclxuICAgICAgICAgICAgICAgIC8vIFVJIGNsYXNzXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gbmV3IHVpKHRoaXMsIHsgbmFtZSB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIC8vIFVJIGZhY3RvcnkgZnVuY3Rpb25zXHJcbiAgICAgICAgICAgICAgICB1aSA9IHVpKHRoaXMpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh1aSBpbnN0YW5jZW9mIEpldEJhc2UpIHtcclxuICAgICAgICAgICAgb2JqID0gdWk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAvLyBVSSBvYmplY3RcclxuICAgICAgICAgICAgb2JqID0gbmV3IEpldFZpZXdSYXcodGhpcywgeyBuYW1lLCB1aSB9KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIG9iajtcclxuICAgIH1cclxuICAgIC8vIHNob3cgdmlldyBwYXRoXHJcbiAgICBzaG93KHVybCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnJlbmRlcih0aGlzLl9jb250YWluZXIsICh1cmwgfHwgdGhpcy5jb25maWcuc3RhcnQpKTtcclxuICAgIH1cclxuICAgIC8vIGV2ZW50IGhlbHBlcnNcclxuICAgIHRyaWdnZXIobmFtZSwgLi4ucmVzdCkge1xyXG4gICAgICAgIHRoaXMuYXBwbHkobmFtZSwgcmVzdCk7XHJcbiAgICB9XHJcbiAgICBhcHBseShuYW1lLCBkYXRhKSB7XHJcbiAgICAgICAgdGhpcy5jYWxsRXZlbnQobmFtZSwgZGF0YSk7XHJcbiAgICB9XHJcbiAgICBhY3Rpb24obmFtZSkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLndlYml4LmJpbmQoZnVuY3Rpb24gKC4uLnJlc3QpIHtcclxuICAgICAgICAgICAgdGhpcy5hcHBseShuYW1lLCByZXN0KTtcclxuICAgICAgICB9LCB0aGlzKTtcclxuICAgIH1cclxuICAgIG9uKG5hbWUsIGhhbmRsZXIpIHtcclxuICAgICAgICB0aGlzLmF0dGFjaEV2ZW50KG5hbWUsIGhhbmRsZXIpO1xyXG4gICAgfVxyXG4gICAgdXNlKHBsdWdpbiwgY29uZmlnKSB7XHJcbiAgICAgICAgcGx1Z2luKHRoaXMsIG51bGwsIGNvbmZpZyk7XHJcbiAgICB9XHJcbiAgICBlcnJvcihuYW1lLCBlcikge1xyXG4gICAgICAgIHRoaXMuY2FsbEV2ZW50KG5hbWUsIGVyKTtcclxuICAgICAgICB0aGlzLmNhbGxFdmVudChcImFwcDplcnJvclwiLCBlcik7XHJcbiAgICAgICAgLyogdHNsaW50OmRpc2FibGUgKi9cclxuICAgICAgICBpZiAodGhpcy5jb25maWcuZGVidWcpIHtcclxuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBlci5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihlcltpXSk7XHJcbiAgICAgICAgICAgICAgICBpZiAoZXJbaV0gaW5zdGFuY2VvZiBFcnJvcikge1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCB0ZXh0ID0gZXJbaV0ubWVzc2FnZTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAodGV4dC5pbmRleE9mKFwiTW9kdWxlIGJ1aWxkIGZhaWxlZFwiKSA9PT0gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0ZXh0ID0gdGV4dC5yZXBsYWNlKC9cXHgxYlxcW1swLTk7XSptL2csIFwiXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBkb2N1bWVudC5ib2R5LmlubmVySFRNTCA9IGA8cHJlIHN0eWxlPSdmb250LXNpemU6MTZweDsgYmFja2dyb3VuZC1jb2xvcjogI2VjNjg3MzsgY29sb3I6ICMwMDA7IHBhZGRpbmc6MTBweDsnPiR7dGV4dH08L3ByZT5gO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGV4dCArPSBcIjxicj48YnI+Q2hlY2sgY29uc29sZSBmb3IgbW9yZSBkZXRhaWxzXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMud2ViaXgubWVzc2FnZSh7IHR5cGU6IFwiZXJyb3JcIiwgdGV4dDogdGV4dCwgZXhwaXJlOiAtMSB9KTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZGVidWdnZXI7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8qIHRzbGludDplbmFibGUgKi9cclxuICAgIH1cclxuICAgIC8vIHJlbmRlcnMgdG9wIHZpZXdcclxuICAgIHJlbmRlcihyb290LCB1cmwsIHBhcmVudCkge1xyXG4gICAgICAgIHRoaXMuX2NvbnRhaW5lciA9ICh0eXBlb2Ygcm9vdCA9PT0gXCJzdHJpbmdcIikgP1xyXG4gICAgICAgICAgICB0aGlzLndlYml4LnRvTm9kZShyb290KSA6XHJcbiAgICAgICAgICAgIChyb290IHx8IGRvY3VtZW50LmJvZHkpO1xyXG4gICAgICAgIGNvbnN0IGZpcnN0SW5pdCA9ICF0aGlzLiRyb3V0ZXI7XHJcbiAgICAgICAgbGV0IHBhdGggPSBudWxsO1xyXG4gICAgICAgIGlmIChmaXJzdEluaXQpIHtcclxuICAgICAgICAgICAgaWYgKF9vbmNlICYmIFwidGFnTmFtZVwiIGluIHRoaXMuX2NvbnRhaW5lcikge1xyXG4gICAgICAgICAgICAgICAgdGhpcy53ZWJpeC5ldmVudChkb2N1bWVudC5ib2R5LCBcImNsaWNrXCIsIGUgPT4gdGhpcy5jbGlja0hhbmRsZXIoZSkpO1xyXG4gICAgICAgICAgICAgICAgX29uY2UgPSBmYWxzZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAodHlwZW9mIHVybCA9PT0gXCJzdHJpbmdcIikge1xyXG4gICAgICAgICAgICAgICAgdXJsID0gbmV3IFJvdXRlKHVybCwgMCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5fc3ViU2VnbWVudCA9IHRoaXMuX2ZpcnN0X3N0YXJ0KHVybCk7XHJcbiAgICAgICAgICAgIHRoaXMuX3N1YlNlZ21lbnQucm91dGUubGlua1JvdXRlciA9IHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICBpZiAodHlwZW9mIHVybCA9PT0gXCJzdHJpbmdcIikge1xyXG4gICAgICAgICAgICAgICAgcGF0aCA9IHVybDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmFwcCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHBhdGggPSB1cmwuc3BsaXQoKS5yb3V0ZS5wYXRoIHx8IHRoaXMuY29uZmlnLnN0YXJ0O1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcGF0aCA9IHVybC50b1N0cmluZygpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNvbnN0IHRvcCA9IHRoaXMuZ2V0U3ViVmlldygpO1xyXG4gICAgICAgIGNvbnN0IHNlZ21lbnQgPSB0aGlzLl9zdWJTZWdtZW50O1xyXG4gICAgICAgIGNvbnN0IHJlYWR5ID0gc2VnbWVudC5zaG93KHBhdGgsIHRvcClcclxuICAgICAgICAgICAgLnRoZW4oKCkgPT4gdGhpcy5jcmVhdGVGcm9tVVJMKHNlZ21lbnQuY3VycmVudCgpKSlcclxuICAgICAgICAgICAgLnRoZW4odmlldyA9PiB2aWV3LnJlbmRlcihyb290LCBzZWdtZW50KSlcclxuICAgICAgICAgICAgLnRoZW4oYmFzZSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuJHJvdXRlci5zZXQoc2VnbWVudC5yb3V0ZS5wYXRoLCB7IHNpbGVudDogdHJ1ZSB9KTtcclxuICAgICAgICAgICAgdGhpcy5jYWxsRXZlbnQoXCJhcHA6cm91dGVcIiwgW3RoaXMuZ2V0VXJsKCldKTtcclxuICAgICAgICAgICAgcmV0dXJuIGJhc2U7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgdGhpcy5yZWFkeSA9IHRoaXMucmVhZHkudGhlbigoKSA9PiByZWFkeSk7XHJcbiAgICAgICAgcmV0dXJuIHJlYWR5O1xyXG4gICAgfVxyXG4gICAgZ2V0U3ViVmlldygpIHtcclxuICAgICAgICBpZiAodGhpcy5fc3ViU2VnbWVudCkge1xyXG4gICAgICAgICAgICBjb25zdCB2aWV3ID0gdGhpcy5fc3ViU2VnbWVudC5jdXJyZW50KCkudmlldztcclxuICAgICAgICAgICAgaWYgKHZpZXcpXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdmlldztcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIG5ldyBKZXRWaWV3KHRoaXMsIHt9KTtcclxuICAgIH1cclxuICAgIF9maXJzdF9zdGFydChyb3V0ZSkge1xyXG4gICAgICAgIHRoaXMuX3NlZ21lbnQgPSByb3V0ZTtcclxuICAgICAgICBjb25zdCBjYiA9IChhKSA9PiBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5zaG93KGEpLmNhdGNoKGUgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKCEoZSBpbnN0YW5jZW9mIE5hdmlnYXRpb25CbG9ja2VkKSlcclxuICAgICAgICAgICAgICAgICAgICB0aHJvdyBlO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9LCAxKTtcclxuICAgICAgICB0aGlzLiRyb3V0ZXIgPSBuZXcgKHRoaXMuY29uZmlnLnJvdXRlcikoY2IsIHRoaXMuY29uZmlnLCB0aGlzKTtcclxuICAgICAgICAvLyBzdGFydCBhbmltYXRpb24gZm9yIHRvcC1sZXZlbCBhcHBcclxuICAgICAgICBpZiAodGhpcy5fY29udGFpbmVyID09PSBkb2N1bWVudC5ib2R5ICYmIHRoaXMuY29uZmlnLmFuaW1hdGlvbiAhPT0gZmFsc2UpIHtcclxuICAgICAgICAgICAgY29uc3Qgbm9kZSA9IHRoaXMuX2NvbnRhaW5lcjtcclxuICAgICAgICAgICAgdGhpcy53ZWJpeC5odG1sLmFkZENzcyhub2RlLCBcIndlYml4YXBwc3RhcnRcIik7XHJcbiAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy53ZWJpeC5odG1sLnJlbW92ZUNzcyhub2RlLCBcIndlYml4YXBwc3RhcnRcIik7XHJcbiAgICAgICAgICAgICAgICB0aGlzLndlYml4Lmh0bWwuYWRkQ3NzKG5vZGUsIFwid2ViaXhhcHBcIik7XHJcbiAgICAgICAgICAgIH0sIDEwKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKCFyb3V0ZSkge1xyXG4gICAgICAgICAgICAvLyBpZiBubyB1cmwgZGVmaW5lZCwgY2hlY2sgcm91dGVyIGZpcnN0XHJcbiAgICAgICAgICAgIGxldCB1cmxTdHJpbmcgPSB0aGlzLiRyb3V0ZXIuZ2V0KCk7XHJcbiAgICAgICAgICAgIGlmICghdXJsU3RyaW5nKSB7XHJcbiAgICAgICAgICAgICAgICB1cmxTdHJpbmcgPSB0aGlzLmNvbmZpZy5zdGFydDtcclxuICAgICAgICAgICAgICAgIHRoaXMuJHJvdXRlci5zZXQodXJsU3RyaW5nLCB7IHNpbGVudDogdHJ1ZSB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByb3V0ZSA9IG5ldyBSb3V0ZSh1cmxTdHJpbmcsIDApO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmICh0aGlzLmFwcCkge1xyXG4gICAgICAgICAgICByb3V0ZS5jdXJyZW50KCkudmlldyA9IHRoaXM7XHJcbiAgICAgICAgICAgIGlmIChyb3V0ZS5uZXh0KCkpIHtcclxuICAgICAgICAgICAgICAgIHJvdXRlLnJlZnJlc2goKTtcclxuICAgICAgICAgICAgICAgIHJvdXRlID0gcm91dGUuc3BsaXQoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHJvdXRlID0gbmV3IFJvdXRlKHRoaXMuY29uZmlnLnN0YXJ0LCAwKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gcm91dGU7XHJcbiAgICB9XHJcbiAgICAvLyBlcnJvciBkdXJpbmcgdmlldyByZXNvbHZpbmdcclxuICAgIF9sb2FkRXJyb3IodXJsLCBlcnIpIHtcclxuICAgICAgICB0aGlzLmVycm9yKFwiYXBwOmVycm9yOnJlc29sdmVcIiwgW2VyciwgdXJsXSk7XHJcbiAgICAgICAgcmV0dXJuIHsgdGVtcGxhdGU6IFwiIFwiIH07XHJcbiAgICB9XHJcbiAgICBhZGRTdWJWaWV3KG9iaiwgdGFyZ2V0LCBjb25maWcpIHtcclxuICAgICAgICBjb25zdCB1cmwgPSBvYmouJHN1YnZpZXcgIT09IHRydWUgPyBvYmouJHN1YnZpZXcgOiBudWxsO1xyXG4gICAgICAgIGNvbnN0IG5hbWUgPSBvYmoubmFtZSB8fCAodXJsID8gdGhpcy53ZWJpeC51aWQoKSA6IFwiZGVmYXVsdFwiKTtcclxuICAgICAgICB0YXJnZXQuaWQgPSBvYmouaWQgfHwgXCJzXCIgKyB0aGlzLndlYml4LnVpZCgpO1xyXG4gICAgICAgIGNvbnN0IHZpZXcgPSBjb25maWdbbmFtZV0gPSB7XHJcbiAgICAgICAgICAgIGlkOiB0YXJnZXQuaWQsXHJcbiAgICAgICAgICAgIHVybCxcclxuICAgICAgICAgICAgYnJhbmNoOiBvYmouYnJhbmNoLFxyXG4gICAgICAgICAgICBwb3B1cDogb2JqLnBvcHVwXHJcbiAgICAgICAgfTtcclxuICAgICAgICByZXR1cm4gdmlldy5wb3B1cCA/IG51bGwgOiB0YXJnZXQ7XHJcbiAgICB9XHJcbn1cblxuY2xhc3MgSGFzaFJvdXRlciB7XHJcbiAgICBjb25zdHJ1Y3RvcihjYiwgY29uZmlnKSB7XHJcbiAgICAgICAgdGhpcy5jb25maWcgPSBjb25maWcgfHwge307XHJcbiAgICAgICAgdGhpcy5fZGV0ZWN0UHJlZml4KCk7XHJcbiAgICAgICAgdGhpcy5jYiA9IGNiO1xyXG4gICAgICAgIHdpbmRvdy5vbnBvcHN0YXRlID0gKCkgPT4gdGhpcy5jYih0aGlzLmdldCgpKTtcclxuICAgIH1cclxuICAgIHNldChwYXRoLCBjb25maWcpIHtcclxuICAgICAgICBpZiAodGhpcy5jb25maWcucm91dGVzKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGNvbXBhcmUgPSBwYXRoLnNwbGl0KFwiP1wiLCAyKTtcclxuICAgICAgICAgICAgZm9yIChjb25zdCBrZXkgaW4gdGhpcy5jb25maWcucm91dGVzKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5jb25maWcucm91dGVzW2tleV0gPT09IGNvbXBhcmVbMF0pIHtcclxuICAgICAgICAgICAgICAgICAgICBwYXRoID0ga2V5ICsgKGNvbXBhcmUubGVuZ3RoID4gMSA/IFwiP1wiICsgY29tcGFyZVsxXSA6IFwiXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0aGlzLmdldCgpICE9PSBwYXRoKSB7XHJcbiAgICAgICAgICAgIHdpbmRvdy5oaXN0b3J5LnB1c2hTdGF0ZShudWxsLCBudWxsLCB0aGlzLnByZWZpeCArIHRoaXMuc3VmaXggKyBwYXRoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKCFjb25maWcgfHwgIWNvbmZpZy5zaWxlbnQpIHtcclxuICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB0aGlzLmNiKHBhdGgpLCAxKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBnZXQoKSB7XHJcbiAgICAgICAgbGV0IHBhdGggPSB0aGlzLl9nZXRSYXcoKS5yZXBsYWNlKHRoaXMucHJlZml4LCBcIlwiKS5yZXBsYWNlKHRoaXMuc3VmaXgsIFwiXCIpO1xyXG4gICAgICAgIHBhdGggPSAocGF0aCAhPT0gXCIvXCIgJiYgcGF0aCAhPT0gXCIjXCIpID8gcGF0aCA6IFwiXCI7XHJcbiAgICAgICAgaWYgKHRoaXMuY29uZmlnLnJvdXRlcykge1xyXG4gICAgICAgICAgICBjb25zdCBjb21wYXJlID0gcGF0aC5zcGxpdChcIj9cIiwgMik7XHJcbiAgICAgICAgICAgIGNvbnN0IGtleSA9IHRoaXMuY29uZmlnLnJvdXRlc1tjb21wYXJlWzBdXTtcclxuICAgICAgICAgICAgaWYgKGtleSkge1xyXG4gICAgICAgICAgICAgICAgcGF0aCA9IGtleSArIChjb21wYXJlLmxlbmd0aCA+IDEgPyBcIj9cIiArIGNvbXBhcmVbMV0gOiBcIlwiKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gcGF0aDtcclxuICAgIH1cclxuICAgIF9kZXRlY3RQcmVmaXgoKSB7XHJcbiAgICAgICAgLy8gdXNlIFwiIyFcIiBmb3IgYmFja3dhcmQgY29tcGF0aWJpbGl0eVxyXG4gICAgICAgIGNvbnN0IHN1Zml4ID0gdGhpcy5jb25maWcucm91dGVyUHJlZml4O1xyXG4gICAgICAgIHRoaXMuc3VmaXggPSBcIiNcIiArICgodHlwZW9mIHN1Zml4ID09PSBcInVuZGVmaW5lZFwiKSA/IFwiIVwiIDogc3VmaXgpO1xyXG4gICAgICAgIHRoaXMucHJlZml4ID0gZG9jdW1lbnQubG9jYXRpb24uaHJlZi5zcGxpdChcIiNcIiwgMilbMF07XHJcbiAgICB9XHJcbiAgICBfZ2V0UmF3KCkge1xyXG4gICAgICAgIHJldHVybiBkb2N1bWVudC5sb2NhdGlvbi5ocmVmO1xyXG4gICAgfVxyXG59XG5cbmxldCBpc1BhdGNoZWQgPSBmYWxzZTtcclxuZnVuY3Rpb24gcGF0Y2godykge1xyXG4gICAgaWYgKGlzUGF0Y2hlZCB8fCAhdykge1xyXG4gICAgICAgIHJldHVybjtcclxuICAgIH1cclxuICAgIGlzUGF0Y2hlZCA9IHRydWU7XHJcbiAgICAvLyBjdXN0b20gcHJvbWlzZSBmb3IgSUU4XHJcbiAgICBjb25zdCB3aW4gPSB3aW5kb3c7XHJcbiAgICBpZiAoIXdpbi5Qcm9taXNlKSB7XHJcbiAgICAgICAgd2luLlByb21pc2UgPSB3LnByb21pc2U7XHJcbiAgICB9XHJcbiAgICBjb25zdCB2ZXJzaW9uID0gdy52ZXJzaW9uLnNwbGl0KFwiLlwiKTtcclxuICAgIC8vIHdpbGwgYmUgZml4ZWQgaW4gd2ViaXggNS4zXHJcbiAgICBpZiAodmVyc2lvblswXSAqIDEwICsgdmVyc2lvblsxXSAqIDEgPCA1Mykge1xyXG4gICAgICAgIHcudWkuZnJlZXplID0gZnVuY3Rpb24gKGhhbmRsZXIpIHtcclxuICAgICAgICAgICAgLy8gZGlzYWJsZWQgYmVjYXVzZSB3ZWJpeCBqZXQgNS4wIGNhbid0IGhhbmRsZSByZXNpemUgb2Ygc2Nyb2xsdmlldyBjb3JyZWN0bHlcclxuICAgICAgICAgICAgLy8gdy51aS4kZnJlZXplID0gdHJ1ZTtcclxuICAgICAgICAgICAgY29uc3QgcmVzID0gaGFuZGxlcigpO1xyXG4gICAgICAgICAgICBpZiAocmVzICYmIHJlcy50aGVuKSB7XHJcbiAgICAgICAgICAgICAgICByZXMudGhlbihmdW5jdGlvbiAoc29tZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHcudWkuJGZyZWV6ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgIHcudWkucmVzaXplKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHNvbWU7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHcudWkuJGZyZWV6ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgdy51aS5yZXNpemUoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gcmVzO1xyXG4gICAgICAgIH07XHJcbiAgICB9XHJcbiAgICAvLyBhZGRpbmcgdmlld3MgYXMgY2xhc3Nlc1xyXG4gICAgY29uc3QgYmFzZUFkZCA9IHcudWkuYmFzZWxheW91dC5wcm90b3R5cGUuYWRkVmlldztcclxuICAgIGNvbnN0IGJhc2VSZW1vdmUgPSB3LnVpLmJhc2VsYXlvdXQucHJvdG90eXBlLnJlbW92ZVZpZXc7XHJcbiAgICBjb25zdCBjb25maWcgPSB7XHJcbiAgICAgICAgYWRkVmlldyh2aWV3LCBpbmRleCkge1xyXG4gICAgICAgICAgICAvLyB0cmlnZ2VyIGxvZ2ljIG9ubHkgZm9yIHdpZGdldHMgaW5zaWRlIG9mIGpldC12aWV3XHJcbiAgICAgICAgICAgIC8vIGlnbm9yZSBjYXNlIHdoZW4gYWRkVmlldyB1c2VkIHdpdGggYWxyZWFkeSBpbml0aWFsaXplZCB3aWRnZXRcclxuICAgICAgICAgICAgaWYgKHRoaXMuJHNjb3BlICYmIHRoaXMuJHNjb3BlLndlYml4SmV0ICYmICF2aWV3LnF1ZXJ5Vmlldykge1xyXG4gICAgICAgICAgICAgICAgY29uc3QganZpZXcgPSB0aGlzLiRzY29wZTtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHN1YnMgPSB7fTtcclxuICAgICAgICAgICAgICAgIHZpZXcgPSBqdmlldy5hcHAuY29weUNvbmZpZyh2aWV3LCB7fSwgc3Vicyk7XHJcbiAgICAgICAgICAgICAgICBiYXNlQWRkLmFwcGx5KHRoaXMsIFt2aWV3LCBpbmRleF0pO1xyXG4gICAgICAgICAgICAgICAgZm9yIChjb25zdCBrZXkgaW4gc3Vicykge1xyXG4gICAgICAgICAgICAgICAgICAgIGp2aWV3Ll9yZW5kZXJGcmFtZShrZXksIHN1YnNba2V5XSwgbnVsbCkudGhlbigoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGp2aWV3Ll9zdWJzW2tleV0gPSBzdWJzW2tleV07XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdmlldy5pZDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBiYXNlQWRkLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LFxyXG4gICAgICAgIHJlbW92ZVZpZXcoKSB7XHJcbiAgICAgICAgICAgIGJhc2VSZW1vdmUuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcclxuICAgICAgICAgICAgaWYgKHRoaXMuJHNjb3BlICYmIHRoaXMuJHNjb3BlLndlYml4SmV0KSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBzdWJzID0gdGhpcy4kc2NvcGUuX3N1YnM7XHJcbiAgICAgICAgICAgICAgICAvLyBjaGVjayBhbGwgc3ViLXZpZXdzLCBkZXN0cm95IGFuZCBjbGVhbiB0aGUgcmVtb3ZlZCBvbmVcclxuICAgICAgICAgICAgICAgIGZvciAoY29uc3Qga2V5IGluIHN1YnMpIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCB0ZXN0ID0gc3Vic1trZXldO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICghdy4kJCh0ZXN0LmlkKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0ZXN0LnZpZXcuZGVzdHJ1Y3RvcigpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBkZWxldGUgc3Vic1trZXldO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH07XHJcbiAgICB3LmV4dGVuZCh3LnVpLmxheW91dC5wcm90b3R5cGUsIGNvbmZpZywgdHJ1ZSk7XHJcbiAgICB3LmV4dGVuZCh3LnVpLmJhc2VsYXlvdXQucHJvdG90eXBlLCBjb25maWcsIHRydWUpO1xyXG4gICAgLy8gd3JhcHBlciBmb3IgdXNpbmcgSmV0IEFwcHMgYXMgdmlld3NcclxuICAgIHcucHJvdG9VSSh7XHJcbiAgICAgICAgbmFtZTogXCJqZXRhcHBcIixcclxuICAgICAgICAkaW5pdChjZmcpIHtcclxuICAgICAgICAgICAgdGhpcy4kYXBwID0gbmV3IHRoaXMuYXBwKGNmZyk7XHJcbiAgICAgICAgICAgIGNvbnN0IGlkID0gdy51aWQoKS50b1N0cmluZygpO1xyXG4gICAgICAgICAgICBjZmcuYm9keSA9IHsgaWQgfTtcclxuICAgICAgICAgICAgdGhpcy4kcmVhZHkucHVzaChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLiRhcHAucmVuZGVyKHsgaWQgfSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICBmb3IgKHZhciBrZXkgaW4gdGhpcy4kYXBwKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgb3JpZ2luID0gdGhpcy4kYXBwW2tleV07XHJcbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mIG9yaWdpbiA9PT0gXCJmdW5jdGlvblwiICYmICF0aGlzW2tleV0pIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzW2tleV0gPSBvcmlnaW4uYmluZCh0aGlzLiRhcHApO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfSwgdy51aS5wcm94eSk7XHJcbn1cblxuY2xhc3MgSmV0QXBwIGV4dGVuZHMgSmV0QXBwQmFzZSB7XHJcbiAgICBjb25zdHJ1Y3Rvcihjb25maWcpIHtcclxuICAgICAgICBjb25maWcucm91dGVyID0gY29uZmlnLnJvdXRlciB8fCBIYXNoUm91dGVyO1xyXG4gICAgICAgIHN1cGVyKGNvbmZpZyk7XHJcbiAgICAgICAgcGF0Y2godGhpcy53ZWJpeCk7XHJcbiAgICB9XHJcbiAgICBfbG9hZFZpZXdEeW5hbWljKHVybCkge1xyXG4gICAgICAgIHVybCA9IHVybC5yZXBsYWNlKC9cXC4vZywgXCIvXCIpO1xyXG4gICAgICAgIHJldHVybiByZXF1aXJlKFwiamV0LXZpZXdzL1wiICsgdXJsKTtcclxuICAgIH1cclxufVxuXG5jbGFzcyBTdG9yZVJvdXRlciB7XHJcbiAgICBjb25zdHJ1Y3RvcihjYiwgY29uZmlnLCBhcHApIHtcclxuICAgICAgICB0aGlzLnN0b3JhZ2UgPSBjb25maWcuc3RvcmFnZSB8fCBhcHAud2ViaXguc3RvcmFnZS5zZXNzaW9uO1xyXG4gICAgICAgIHRoaXMubmFtZSA9IChjb25maWcuc3RvcmVOYW1lIHx8IGNvbmZpZy5pZCArIFwiOnJvdXRlXCIpO1xyXG4gICAgICAgIHRoaXMuY2IgPSBjYjtcclxuICAgIH1cclxuICAgIHNldChwYXRoLCBjb25maWcpIHtcclxuICAgICAgICB0aGlzLnN0b3JhZ2UucHV0KHRoaXMubmFtZSwgcGF0aCk7XHJcbiAgICAgICAgaWYgKCFjb25maWcgfHwgIWNvbmZpZy5zaWxlbnQpIHtcclxuICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB0aGlzLmNiKHBhdGgpLCAxKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBnZXQoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuc3RvcmFnZS5nZXQodGhpcy5uYW1lKTtcclxuICAgIH1cclxufVxuXG5jbGFzcyBVcmxSb3V0ZXIgZXh0ZW5kcyBIYXNoUm91dGVyIHtcclxuICAgIF9kZXRlY3RQcmVmaXgoKSB7XHJcbiAgICAgICAgdGhpcy5wcmVmaXggPSBcIlwiO1xyXG4gICAgICAgIHRoaXMuc3VmaXggPSB0aGlzLmNvbmZpZy5yb3V0ZXJQcmVmaXggfHwgXCJcIjtcclxuICAgIH1cclxuICAgIF9nZXRSYXcoKSB7XHJcbiAgICAgICAgcmV0dXJuIGRvY3VtZW50LmxvY2F0aW9uLnBhdGhuYW1lICsgKGRvY3VtZW50LmxvY2F0aW9uLnNlYXJjaCB8fCBcIlwiKTtcclxuICAgIH1cclxufVxuXG5jbGFzcyBFbXB0eVJvdXRlciB7XHJcbiAgICBjb25zdHJ1Y3RvcihjYiwgXyRjb25maWcpIHtcclxuICAgICAgICB0aGlzLnBhdGggPSBcIlwiO1xyXG4gICAgICAgIHRoaXMuY2IgPSBjYjtcclxuICAgIH1cclxuICAgIHNldChwYXRoLCBjb25maWcpIHtcclxuICAgICAgICB0aGlzLnBhdGggPSBwYXRoO1xyXG4gICAgICAgIGlmICghY29uZmlnIHx8ICFjb25maWcuc2lsZW50KSB7XHJcbiAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4gdGhpcy5jYihwYXRoKSwgMSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgZ2V0KCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnBhdGg7XHJcbiAgICB9XHJcbn1cblxuZnVuY3Rpb24gVW5sb2FkR3VhcmQoYXBwLCB2aWV3LCBjb25maWcpIHtcclxuICAgIHZpZXcub24oYXBwLCBgYXBwOmd1YXJkYCwgZnVuY3Rpb24gKF8kdXJsLCBwb2ludCwgcHJvbWlzZSkge1xyXG4gICAgICAgIGlmIChwb2ludCA9PT0gdmlldyB8fCBwb2ludC5jb250YWlucyh2aWV3KSkge1xyXG4gICAgICAgICAgICBjb25zdCByZXMgPSBjb25maWcoKTtcclxuICAgICAgICAgICAgaWYgKHJlcyA9PT0gZmFsc2UpIHtcclxuICAgICAgICAgICAgICAgIHByb21pc2UuY29uZmlybSA9IFByb21pc2UucmVqZWN0KG5ldyBOYXZpZ2F0aW9uQmxvY2tlZCgpKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHByb21pc2UuY29uZmlybSA9IHByb21pc2UuY29uZmlybS50aGVuKCgpID0+IHJlcyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9KTtcclxufVxuXG4vLyAgICAgKGMpIDIwMTItMjAxOCBBaXJibmIsIEluYy5cblxuLy8gdmFyIGhhcyA9IHJlcXVpcmUoJ2hhcycpO1xuZnVuY3Rpb24gaGFzKHN0b3JlLCBrZXkpIHtcbiAgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChzdG9yZSwga2V5KTtcbn1cbi8vIHZhciBmb3JFYWNoID0gcmVxdWlyZSgnZm9yLWVhY2gnKTtcbmZ1bmN0aW9uIGZvckVhY2gob2JqLCBoYW5kbGVyLCBjb250ZXh0KSB7XG4gIGZvciAodmFyIGtleSBpbiBvYmopIHtcbiAgICBpZiAoaGFzKG9iaiwga2V5KSkge1xuICAgICAgaGFuZGxlci5jYWxsKChjb250ZXh0IHx8IG9iaiksIG9ialtrZXldLCBrZXksIG9iaik7XG4gICAgfVxuICB9XG59XG4vLyB2YXIgdHJpbSA9IHJlcXVpcmUoJ3N0cmluZy5wcm90b3R5cGUudHJpbScpO1xuZnVuY3Rpb24gdHJpbShzdHIpIHtcbiAgcmV0dXJuIHN0ci5yZXBsYWNlKC9eW1xcc1xcdUZFRkZcXHhBMF0rfFtcXHNcXHVGRUZGXFx4QTBdKyQvZywgJycpO1xufVxuLy8gdmFyIHdhcm5pbmcgPSByZXF1aXJlKCd3YXJuaW5nJyk7XG5mdW5jdGlvbiB3YXJuKG1lc3NhZ2UpIHtcbiAgbWVzc2FnZSA9ICdXYXJuaW5nOiAnICsgbWVzc2FnZTtcbiAgaWYgKHR5cGVvZiBjb25zb2xlICE9PSAndW5kZWZpbmVkJykge1xuICAgIGNvbnNvbGUuZXJyb3IobWVzc2FnZSk7XG4gIH1cblxuICB0cnkgeyB0aHJvdyBuZXcgRXJyb3IobWVzc2FnZSk7IH0gY2F0Y2ggKHgpIHt9XG59XG5cbnZhciByZXBsYWNlID0gU3RyaW5nLnByb3RvdHlwZS5yZXBsYWNlO1xudmFyIHNwbGl0ID0gU3RyaW5nLnByb3RvdHlwZS5zcGxpdDtcblxuLy8gIyMjIyBQbHVyYWxpemF0aW9uIG1ldGhvZHNcbi8vIFRoZSBzdHJpbmcgdGhhdCBzZXBhcmF0ZXMgdGhlIGRpZmZlcmVudCBwaHJhc2UgcG9zc2liaWxpdGllcy5cbnZhciBkZWxpbWl0ZXIgPSAnfHx8fCc7XG5cbnZhciBydXNzaWFuUGx1cmFsR3JvdXBzID0gZnVuY3Rpb24gKG4pIHtcbiAgdmFyIGVuZCA9IG4gJSAxMDtcbiAgaWYgKG4gIT09IDExICYmIGVuZCA9PT0gMSkge1xuICAgIHJldHVybiAwO1xuICB9XG4gIGlmICgyIDw9IGVuZCAmJiBlbmQgPD0gNCAmJiAhKG4gPj0gMTIgJiYgbiA8PSAxNCkpIHtcbiAgICByZXR1cm4gMTtcbiAgfVxuICByZXR1cm4gMjtcbn07XG5cbi8vIE1hcHBpbmcgZnJvbSBwbHVyYWxpemF0aW9uIGdyb3VwIHBsdXJhbCBsb2dpYy5cbnZhciBwbHVyYWxUeXBlcyA9IHtcbiAgYXJhYmljOiBmdW5jdGlvbiAobikge1xuICAgIC8vIGh0dHA6Ly93d3cuYXJhYmV5ZXMub3JnL1BsdXJhbF9Gb3Jtc1xuICAgIGlmIChuIDwgMykgeyByZXR1cm4gbjsgfVxuICAgIHZhciBsYXN0VHdvID0gbiAlIDEwMDtcbiAgICBpZiAobGFzdFR3byA+PSAzICYmIGxhc3RUd28gPD0gMTApIHJldHVybiAzO1xuICAgIHJldHVybiBsYXN0VHdvID49IDExID8gNCA6IDU7XG4gIH0sXG4gIGJvc25pYW5fc2VyYmlhbjogcnVzc2lhblBsdXJhbEdyb3VwcyxcbiAgY2hpbmVzZTogZnVuY3Rpb24gKCkgeyByZXR1cm4gMDsgfSxcbiAgY3JvYXRpYW46IHJ1c3NpYW5QbHVyYWxHcm91cHMsXG4gIGZyZW5jaDogZnVuY3Rpb24gKG4pIHsgcmV0dXJuIG4gPiAxID8gMSA6IDA7IH0sXG4gIGdlcm1hbjogZnVuY3Rpb24gKG4pIHsgcmV0dXJuIG4gIT09IDEgPyAxIDogMDsgfSxcbiAgcnVzc2lhbjogcnVzc2lhblBsdXJhbEdyb3VwcyxcbiAgbGl0aHVhbmlhbjogZnVuY3Rpb24gKG4pIHtcbiAgICBpZiAobiAlIDEwID09PSAxICYmIG4gJSAxMDAgIT09IDExKSB7IHJldHVybiAwOyB9XG4gICAgcmV0dXJuIG4gJSAxMCA+PSAyICYmIG4gJSAxMCA8PSA5ICYmIChuICUgMTAwIDwgMTEgfHwgbiAlIDEwMCA+IDE5KSA/IDEgOiAyO1xuICB9LFxuICBjemVjaDogZnVuY3Rpb24gKG4pIHtcbiAgICBpZiAobiA9PT0gMSkgeyByZXR1cm4gMDsgfVxuICAgIHJldHVybiAobiA+PSAyICYmIG4gPD0gNCkgPyAxIDogMjtcbiAgfSxcbiAgcG9saXNoOiBmdW5jdGlvbiAobikge1xuICAgIGlmIChuID09PSAxKSB7IHJldHVybiAwOyB9XG4gICAgdmFyIGVuZCA9IG4gJSAxMDtcbiAgICByZXR1cm4gMiA8PSBlbmQgJiYgZW5kIDw9IDQgJiYgKG4gJSAxMDAgPCAxMCB8fCBuICUgMTAwID49IDIwKSA/IDEgOiAyO1xuICB9LFxuICBpY2VsYW5kaWM6IGZ1bmN0aW9uIChuKSB7IHJldHVybiAobiAlIDEwICE9PSAxIHx8IG4gJSAxMDAgPT09IDExKSA/IDEgOiAwOyB9LFxuICBzbG92ZW5pYW46IGZ1bmN0aW9uIChuKSB7XG4gICAgdmFyIGxhc3RUd28gPSBuICUgMTAwO1xuICAgIGlmIChsYXN0VHdvID09PSAxKSB7XG4gICAgICByZXR1cm4gMDtcbiAgICB9XG4gICAgaWYgKGxhc3RUd28gPT09IDIpIHtcbiAgICAgIHJldHVybiAxO1xuICAgIH1cbiAgICBpZiAobGFzdFR3byA9PT0gMyB8fCBsYXN0VHdvID09PSA0KSB7XG4gICAgICByZXR1cm4gMjtcbiAgICB9XG4gICAgcmV0dXJuIDM7XG4gIH1cbn07XG5cblxuLy8gTWFwcGluZyBmcm9tIHBsdXJhbGl6YXRpb24gZ3JvdXAgdG8gaW5kaXZpZHVhbCBsYW5ndWFnZSBjb2Rlcy9sb2NhbGVzLlxuLy8gV2lsbCBsb29rIHVwIGJhc2VkIG9uIGV4YWN0IG1hdGNoLCBpZiBub3QgZm91bmQgYW5kIGl0J3MgYSBsb2NhbGUgd2lsbCBwYXJzZSB0aGUgbG9jYWxlXG4vLyBmb3IgbGFuZ3VhZ2UgY29kZSwgYW5kIGlmIHRoYXQgZG9lcyBub3QgZXhpc3Qgd2lsbCBkZWZhdWx0IHRvICdlbidcbnZhciBwbHVyYWxUeXBlVG9MYW5ndWFnZXMgPSB7XG4gIGFyYWJpYzogWydhciddLFxuICBib3NuaWFuX3NlcmJpYW46IFsnYnMtTGF0bi1CQScsICdicy1DeXJsLUJBJywgJ3NybC1SUycsICdzci1SUyddLFxuICBjaGluZXNlOiBbJ2lkJywgJ2lkLUlEJywgJ2phJywgJ2tvJywgJ2tvLUtSJywgJ2xvJywgJ21zJywgJ3RoJywgJ3RoLVRIJywgJ3poJ10sXG4gIGNyb2F0aWFuOiBbJ2hyJywgJ2hyLUhSJ10sXG4gIGdlcm1hbjogWydmYScsICdkYScsICdkZScsICdlbicsICdlcycsICdmaScsICdlbCcsICdoZScsICdoaS1JTicsICdodScsICdodS1IVScsICdpdCcsICdubCcsICdubycsICdwdCcsICdzdicsICd0ciddLFxuICBmcmVuY2g6IFsnZnInLCAndGwnLCAncHQtYnInXSxcbiAgcnVzc2lhbjogWydydScsICdydS1SVSddLFxuICBsaXRodWFuaWFuOiBbJ2x0J10sXG4gIGN6ZWNoOiBbJ2NzJywgJ2NzLUNaJywgJ3NrJ10sXG4gIHBvbGlzaDogWydwbCddLFxuICBpY2VsYW5kaWM6IFsnaXMnXSxcbiAgc2xvdmVuaWFuOiBbJ3NsLVNMJ11cbn07XG5cbmZ1bmN0aW9uIGxhbmdUb1R5cGVNYXAobWFwcGluZykge1xuICB2YXIgcmV0ID0ge307XG4gIGZvckVhY2gobWFwcGluZywgZnVuY3Rpb24gKGxhbmdzLCB0eXBlKSB7XG4gICAgZm9yRWFjaChsYW5ncywgZnVuY3Rpb24gKGxhbmcpIHtcbiAgICAgIHJldFtsYW5nXSA9IHR5cGU7XG4gICAgfSk7XG4gIH0pO1xuICByZXR1cm4gcmV0O1xufVxuXG5mdW5jdGlvbiBwbHVyYWxUeXBlTmFtZShsb2NhbGUpIHtcbiAgdmFyIGxhbmdUb1BsdXJhbFR5cGUgPSBsYW5nVG9UeXBlTWFwKHBsdXJhbFR5cGVUb0xhbmd1YWdlcyk7XG4gIHJldHVybiBsYW5nVG9QbHVyYWxUeXBlW2xvY2FsZV1cbiAgICB8fCBsYW5nVG9QbHVyYWxUeXBlW3NwbGl0LmNhbGwobG9jYWxlLCAvLS8sIDEpWzBdXVxuICAgIHx8IGxhbmdUb1BsdXJhbFR5cGUuZW47XG59XG5cbmZ1bmN0aW9uIHBsdXJhbFR5cGVJbmRleChsb2NhbGUsIGNvdW50KSB7XG4gIHJldHVybiBwbHVyYWxUeXBlc1twbHVyYWxUeXBlTmFtZShsb2NhbGUpXShjb3VudCk7XG59XG5cbmZ1bmN0aW9uIGVzY2FwZSh0b2tlbikge1xuICByZXR1cm4gdG9rZW4ucmVwbGFjZSgvWy4qKz9eJHt9KCl8W1xcXVxcXFxdL2csICdcXFxcJCYnKTtcbn1cblxuZnVuY3Rpb24gY29uc3RydWN0VG9rZW5SZWdleChvcHRzKSB7XG4gIHZhciBwcmVmaXggPSAob3B0cyAmJiBvcHRzLnByZWZpeCkgfHwgJyV7JztcbiAgdmFyIHN1ZmZpeCA9IChvcHRzICYmIG9wdHMuc3VmZml4KSB8fCAnfSc7XG5cbiAgaWYgKHByZWZpeCA9PT0gZGVsaW1pdGVyIHx8IHN1ZmZpeCA9PT0gZGVsaW1pdGVyKSB7XG4gICAgdGhyb3cgbmV3IFJhbmdlRXJyb3IoJ1wiJyArIGRlbGltaXRlciArICdcIiB0b2tlbiBpcyByZXNlcnZlZCBmb3IgcGx1cmFsaXphdGlvbicpO1xuICB9XG5cbiAgcmV0dXJuIG5ldyBSZWdFeHAoZXNjYXBlKHByZWZpeCkgKyAnKC4qPyknICsgZXNjYXBlKHN1ZmZpeCksICdnJyk7XG59XG5cbnZhciBkb2xsYXJSZWdleCA9IC9cXCQvZztcbnZhciBkb2xsYXJCaWxsc1lhbGwgPSAnJCQnO1xudmFyIGRlZmF1bHRUb2tlblJlZ2V4ID0gLyVcXHsoLio/KVxcfS9nO1xuXG4vLyAjIyMgdHJhbnNmb3JtUGhyYXNlKHBocmFzZSwgc3Vic3RpdHV0aW9ucywgbG9jYWxlKVxuLy9cbi8vIFRha2VzIGEgcGhyYXNlIHN0cmluZyBhbmQgdHJhbnNmb3JtcyBpdCBieSBjaG9vc2luZyB0aGUgY29ycmVjdFxuLy8gcGx1cmFsIGZvcm0gYW5kIGludGVycG9sYXRpbmcgaXQuXG4vL1xuLy8gICAgIHRyYW5zZm9ybVBocmFzZSgnSGVsbG8sICV7bmFtZX0hJywge25hbWU6ICdTcGlrZSd9KTtcbi8vICAgICAvLyBcIkhlbGxvLCBTcGlrZSFcIlxuLy9cbi8vIFRoZSBjb3JyZWN0IHBsdXJhbCBmb3JtIGlzIHNlbGVjdGVkIGlmIHN1YnN0aXR1dGlvbnMuc21hcnRfY291bnRcbi8vIGlzIHNldC4gWW91IGNhbiBwYXNzIGluIGEgbnVtYmVyIGluc3RlYWQgb2YgYW4gT2JqZWN0IGFzIGBzdWJzdGl0dXRpb25zYFxuLy8gYXMgYSBzaG9ydGN1dCBmb3IgYHNtYXJ0X2NvdW50YC5cbi8vXG4vLyAgICAgdHJhbnNmb3JtUGhyYXNlKCcle3NtYXJ0X2NvdW50fSBuZXcgbWVzc2FnZXMgfHx8fCAxIG5ldyBtZXNzYWdlJywge3NtYXJ0X2NvdW50OiAxfSwgJ2VuJyk7XG4vLyAgICAgLy8gXCIxIG5ldyBtZXNzYWdlXCJcbi8vXG4vLyAgICAgdHJhbnNmb3JtUGhyYXNlKCcle3NtYXJ0X2NvdW50fSBuZXcgbWVzc2FnZXMgfHx8fCAxIG5ldyBtZXNzYWdlJywge3NtYXJ0X2NvdW50OiAyfSwgJ2VuJyk7XG4vLyAgICAgLy8gXCIyIG5ldyBtZXNzYWdlc1wiXG4vL1xuLy8gICAgIHRyYW5zZm9ybVBocmFzZSgnJXtzbWFydF9jb3VudH0gbmV3IG1lc3NhZ2VzIHx8fHwgMSBuZXcgbWVzc2FnZScsIDUsICdlbicpO1xuLy8gICAgIC8vIFwiNSBuZXcgbWVzc2FnZXNcIlxuLy9cbi8vIFlvdSBzaG91bGQgcGFzcyBpbiBhIHRoaXJkIGFyZ3VtZW50LCB0aGUgbG9jYWxlLCB0byBzcGVjaWZ5IHRoZSBjb3JyZWN0IHBsdXJhbCB0eXBlLlxuLy8gSXQgZGVmYXVsdHMgdG8gYCdlbidgIHdpdGggMiBwbHVyYWwgZm9ybXMuXG5mdW5jdGlvbiB0cmFuc2Zvcm1QaHJhc2UocGhyYXNlLCBzdWJzdGl0dXRpb25zLCBsb2NhbGUsIHRva2VuUmVnZXgpIHtcbiAgaWYgKHR5cGVvZiBwaHJhc2UgIT09ICdzdHJpbmcnKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcignUG9seWdsb3QudHJhbnNmb3JtUGhyYXNlIGV4cGVjdHMgYXJndW1lbnQgIzEgdG8gYmUgc3RyaW5nJyk7XG4gIH1cblxuICBpZiAoc3Vic3RpdHV0aW9ucyA9PSBudWxsKSB7XG4gICAgcmV0dXJuIHBocmFzZTtcbiAgfVxuXG4gIHZhciByZXN1bHQgPSBwaHJhc2U7XG4gIHZhciBpbnRlcnBvbGF0aW9uUmVnZXggPSB0b2tlblJlZ2V4IHx8IGRlZmF1bHRUb2tlblJlZ2V4O1xuXG4gIC8vIGFsbG93IG51bWJlciBhcyBhIHBsdXJhbGl6YXRpb24gc2hvcnRjdXRcbiAgdmFyIG9wdGlvbnMgPSB0eXBlb2Ygc3Vic3RpdHV0aW9ucyA9PT0gJ251bWJlcicgPyB7IHNtYXJ0X2NvdW50OiBzdWJzdGl0dXRpb25zIH0gOiBzdWJzdGl0dXRpb25zO1xuXG4gIC8vIFNlbGVjdCBwbHVyYWwgZm9ybTogYmFzZWQgb24gYSBwaHJhc2UgdGV4dCB0aGF0IGNvbnRhaW5zIGBuYFxuICAvLyBwbHVyYWwgZm9ybXMgc2VwYXJhdGVkIGJ5IGBkZWxpbWl0ZXJgLCBhIGBsb2NhbGVgLCBhbmQgYSBgc3Vic3RpdHV0aW9ucy5zbWFydF9jb3VudGAsXG4gIC8vIGNob29zZSB0aGUgY29ycmVjdCBwbHVyYWwgZm9ybS4gVGhpcyBpcyBvbmx5IGRvbmUgaWYgYGNvdW50YCBpcyBzZXQuXG4gIGlmIChvcHRpb25zLnNtYXJ0X2NvdW50ICE9IG51bGwgJiYgcmVzdWx0KSB7XG4gICAgdmFyIHRleHRzID0gc3BsaXQuY2FsbChyZXN1bHQsIGRlbGltaXRlcik7XG4gICAgcmVzdWx0ID0gdHJpbSh0ZXh0c1twbHVyYWxUeXBlSW5kZXgobG9jYWxlIHx8ICdlbicsIG9wdGlvbnMuc21hcnRfY291bnQpXSB8fCB0ZXh0c1swXSk7XG4gIH1cblxuICAvLyBJbnRlcnBvbGF0ZTogQ3JlYXRlcyBhIGBSZWdFeHBgIG9iamVjdCBmb3IgZWFjaCBpbnRlcnBvbGF0aW9uIHBsYWNlaG9sZGVyLlxuICByZXN1bHQgPSByZXBsYWNlLmNhbGwocmVzdWx0LCBpbnRlcnBvbGF0aW9uUmVnZXgsIGZ1bmN0aW9uIChleHByZXNzaW9uLCBhcmd1bWVudCkge1xuICAgIGlmICghaGFzKG9wdGlvbnMsIGFyZ3VtZW50KSB8fCBvcHRpb25zW2FyZ3VtZW50XSA9PSBudWxsKSB7IHJldHVybiBleHByZXNzaW9uOyB9XG4gICAgLy8gRW5zdXJlIHJlcGxhY2VtZW50IHZhbHVlIGlzIGVzY2FwZWQgdG8gcHJldmVudCBzcGVjaWFsICQtcHJlZml4ZWQgcmVnZXggcmVwbGFjZSB0b2tlbnMuXG4gICAgcmV0dXJuIHJlcGxhY2UuY2FsbChvcHRpb25zW2FyZ3VtZW50XSwgZG9sbGFyUmVnZXgsIGRvbGxhckJpbGxzWWFsbCk7XG4gIH0pO1xuXG4gIHJldHVybiByZXN1bHQ7XG59XG5cbi8vICMjIyBQb2x5Z2xvdCBjbGFzcyBjb25zdHJ1Y3RvclxuZnVuY3Rpb24gUG9seWdsb3Qob3B0aW9ucykge1xuICB2YXIgb3B0cyA9IG9wdGlvbnMgfHwge307XG4gIHRoaXMucGhyYXNlcyA9IHt9O1xuICB0aGlzLmV4dGVuZChvcHRzLnBocmFzZXMgfHwge30pO1xuICB0aGlzLmN1cnJlbnRMb2NhbGUgPSBvcHRzLmxvY2FsZSB8fCAnZW4nO1xuICB2YXIgYWxsb3dNaXNzaW5nID0gb3B0cy5hbGxvd01pc3NpbmcgPyB0cmFuc2Zvcm1QaHJhc2UgOiBudWxsO1xuICB0aGlzLm9uTWlzc2luZ0tleSA9IHR5cGVvZiBvcHRzLm9uTWlzc2luZ0tleSA9PT0gJ2Z1bmN0aW9uJyA/IG9wdHMub25NaXNzaW5nS2V5IDogYWxsb3dNaXNzaW5nO1xuICB0aGlzLndhcm4gPSBvcHRzLndhcm4gfHwgd2FybjtcbiAgdGhpcy50b2tlblJlZ2V4ID0gY29uc3RydWN0VG9rZW5SZWdleChvcHRzLmludGVycG9sYXRpb24pO1xufVxuXG4vLyAjIyMgcG9seWdsb3QubG9jYWxlKFtsb2NhbGVdKVxuLy9cbi8vIEdldCBvciBzZXQgbG9jYWxlLiBJbnRlcm5hbGx5LCBQb2x5Z2xvdCBvbmx5IHVzZXMgbG9jYWxlIGZvciBwbHVyYWxpemF0aW9uLlxuUG9seWdsb3QucHJvdG90eXBlLmxvY2FsZSA9IGZ1bmN0aW9uIChuZXdMb2NhbGUpIHtcbiAgaWYgKG5ld0xvY2FsZSkgdGhpcy5jdXJyZW50TG9jYWxlID0gbmV3TG9jYWxlO1xuICByZXR1cm4gdGhpcy5jdXJyZW50TG9jYWxlO1xufTtcblxuLy8gIyMjIHBvbHlnbG90LmV4dGVuZChwaHJhc2VzKVxuLy9cbi8vIFVzZSBgZXh0ZW5kYCB0byB0ZWxsIFBvbHlnbG90IGhvdyB0byB0cmFuc2xhdGUgYSBnaXZlbiBrZXkuXG4vL1xuLy8gICAgIHBvbHlnbG90LmV4dGVuZCh7XG4vLyAgICAgICBcImhlbGxvXCI6IFwiSGVsbG9cIixcbi8vICAgICAgIFwiaGVsbG9fbmFtZVwiOiBcIkhlbGxvLCAle25hbWV9XCJcbi8vICAgICB9KTtcbi8vXG4vLyBUaGUga2V5IGNhbiBiZSBhbnkgc3RyaW5nLiAgRmVlbCBmcmVlIHRvIGNhbGwgYGV4dGVuZGAgbXVsdGlwbGUgdGltZXM7XG4vLyBpdCB3aWxsIG92ZXJyaWRlIGFueSBwaHJhc2VzIHdpdGggdGhlIHNhbWUga2V5LCBidXQgbGVhdmUgZXhpc3RpbmcgcGhyYXNlc1xuLy8gdW50b3VjaGVkLlxuLy9cbi8vIEl0IGlzIGFsc28gcG9zc2libGUgdG8gcGFzcyBuZXN0ZWQgcGhyYXNlIG9iamVjdHMsIHdoaWNoIGdldCBmbGF0dGVuZWRcbi8vIGludG8gYW4gb2JqZWN0IHdpdGggdGhlIG5lc3RlZCBrZXlzIGNvbmNhdGVuYXRlZCB1c2luZyBkb3Qgbm90YXRpb24uXG4vL1xuLy8gICAgIHBvbHlnbG90LmV4dGVuZCh7XG4vLyAgICAgICBcIm5hdlwiOiB7XG4vLyAgICAgICAgIFwiaGVsbG9cIjogXCJIZWxsb1wiLFxuLy8gICAgICAgICBcImhlbGxvX25hbWVcIjogXCJIZWxsbywgJXtuYW1lfVwiLFxuLy8gICAgICAgICBcInNpZGViYXJcIjoge1xuLy8gICAgICAgICAgIFwid2VsY29tZVwiOiBcIldlbGNvbWVcIlxuLy8gICAgICAgICB9XG4vLyAgICAgICB9XG4vLyAgICAgfSk7XG4vL1xuLy8gICAgIGNvbnNvbGUubG9nKHBvbHlnbG90LnBocmFzZXMpO1xuLy8gICAgIC8vIHtcbi8vICAgICAvLyAgICduYXYuaGVsbG8nOiAnSGVsbG8nLFxuLy8gICAgIC8vICAgJ25hdi5oZWxsb19uYW1lJzogJ0hlbGxvLCAle25hbWV9Jyxcbi8vICAgICAvLyAgICduYXYuc2lkZWJhci53ZWxjb21lJzogJ1dlbGNvbWUnXG4vLyAgICAgLy8gfVxuLy9cbi8vIGBleHRlbmRgIGFjY2VwdHMgYW4gb3B0aW9uYWwgc2Vjb25kIGFyZ3VtZW50LCBgcHJlZml4YCwgd2hpY2ggY2FuIGJlIHVzZWRcbi8vIHRvIHByZWZpeCBldmVyeSBrZXkgaW4gdGhlIHBocmFzZXMgb2JqZWN0IHdpdGggc29tZSBzdHJpbmcsIHVzaW5nIGRvdFxuLy8gbm90YXRpb24uXG4vL1xuLy8gICAgIHBvbHlnbG90LmV4dGVuZCh7XG4vLyAgICAgICBcImhlbGxvXCI6IFwiSGVsbG9cIixcbi8vICAgICAgIFwiaGVsbG9fbmFtZVwiOiBcIkhlbGxvLCAle25hbWV9XCJcbi8vICAgICB9LCBcIm5hdlwiKTtcbi8vXG4vLyAgICAgY29uc29sZS5sb2cocG9seWdsb3QucGhyYXNlcyk7XG4vLyAgICAgLy8ge1xuLy8gICAgIC8vICAgJ25hdi5oZWxsbyc6ICdIZWxsbycsXG4vLyAgICAgLy8gICAnbmF2LmhlbGxvX25hbWUnOiAnSGVsbG8sICV7bmFtZX0nXG4vLyAgICAgLy8gfVxuLy9cbi8vIFRoaXMgZmVhdHVyZSBpcyB1c2VkIGludGVybmFsbHkgdG8gc3VwcG9ydCBuZXN0ZWQgcGhyYXNlIG9iamVjdHMuXG5Qb2x5Z2xvdC5wcm90b3R5cGUuZXh0ZW5kID0gZnVuY3Rpb24gKG1vcmVQaHJhc2VzLCBwcmVmaXgpIHtcbiAgZm9yRWFjaChtb3JlUGhyYXNlcywgZnVuY3Rpb24gKHBocmFzZSwga2V5KSB7XG4gICAgdmFyIHByZWZpeGVkS2V5ID0gcHJlZml4ID8gcHJlZml4ICsgJy4nICsga2V5IDoga2V5O1xuICAgIGlmICh0eXBlb2YgcGhyYXNlID09PSAnb2JqZWN0Jykge1xuICAgICAgdGhpcy5leHRlbmQocGhyYXNlLCBwcmVmaXhlZEtleSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMucGhyYXNlc1twcmVmaXhlZEtleV0gPSBwaHJhc2U7XG4gICAgfVxuICB9LCB0aGlzKTtcbn07XG5cbi8vICMjIyBwb2x5Z2xvdC51bnNldChwaHJhc2VzKVxuLy8gVXNlIGB1bnNldGAgdG8gc2VsZWN0aXZlbHkgcmVtb3ZlIGtleXMgZnJvbSBhIHBvbHlnbG90IGluc3RhbmNlLlxuLy9cbi8vICAgICBwb2x5Z2xvdC51bnNldChcInNvbWVfa2V5XCIpO1xuLy8gICAgIHBvbHlnbG90LnVuc2V0KHtcbi8vICAgICAgIFwiaGVsbG9cIjogXCJIZWxsb1wiLFxuLy8gICAgICAgXCJoZWxsb19uYW1lXCI6IFwiSGVsbG8sICV7bmFtZX1cIlxuLy8gICAgIH0pO1xuLy9cbi8vIFRoZSB1bnNldCBtZXRob2QgY2FuIHRha2UgZWl0aGVyIGEgc3RyaW5nIChmb3IgdGhlIGtleSksIG9yIGFuIG9iamVjdCBoYXNoIHdpdGhcbi8vIHRoZSBrZXlzIHRoYXQgeW91IHdvdWxkIGxpa2UgdG8gdW5zZXQuXG5Qb2x5Z2xvdC5wcm90b3R5cGUudW5zZXQgPSBmdW5jdGlvbiAobW9yZVBocmFzZXMsIHByZWZpeCkge1xuICBpZiAodHlwZW9mIG1vcmVQaHJhc2VzID09PSAnc3RyaW5nJykge1xuICAgIGRlbGV0ZSB0aGlzLnBocmFzZXNbbW9yZVBocmFzZXNdO1xuICB9IGVsc2Uge1xuICAgIGZvckVhY2gobW9yZVBocmFzZXMsIGZ1bmN0aW9uIChwaHJhc2UsIGtleSkge1xuICAgICAgdmFyIHByZWZpeGVkS2V5ID0gcHJlZml4ID8gcHJlZml4ICsgJy4nICsga2V5IDoga2V5O1xuICAgICAgaWYgKHR5cGVvZiBwaHJhc2UgPT09ICdvYmplY3QnKSB7XG4gICAgICAgIHRoaXMudW5zZXQocGhyYXNlLCBwcmVmaXhlZEtleSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBkZWxldGUgdGhpcy5waHJhc2VzW3ByZWZpeGVkS2V5XTtcbiAgICAgIH1cbiAgICB9LCB0aGlzKTtcbiAgfVxufTtcblxuLy8gIyMjIHBvbHlnbG90LmNsZWFyKClcbi8vXG4vLyBDbGVhcnMgYWxsIHBocmFzZXMuIFVzZWZ1bCBmb3Igc3BlY2lhbCBjYXNlcywgc3VjaCBhcyBmcmVlaW5nXG4vLyB1cCBtZW1vcnkgaWYgeW91IGhhdmUgbG90cyBvZiBwaHJhc2VzIGJ1dCBubyBsb25nZXIgbmVlZCB0b1xuLy8gcGVyZm9ybSBhbnkgdHJhbnNsYXRpb24uIEFsc28gdXNlZCBpbnRlcm5hbGx5IGJ5IGByZXBsYWNlYC5cblBvbHlnbG90LnByb3RvdHlwZS5jbGVhciA9IGZ1bmN0aW9uICgpIHtcbiAgdGhpcy5waHJhc2VzID0ge307XG59O1xuXG4vLyAjIyMgcG9seWdsb3QucmVwbGFjZShwaHJhc2VzKVxuLy9cbi8vIENvbXBsZXRlbHkgcmVwbGFjZSB0aGUgZXhpc3RpbmcgcGhyYXNlcyB3aXRoIGEgbmV3IHNldCBvZiBwaHJhc2VzLlxuLy8gTm9ybWFsbHksIGp1c3QgdXNlIGBleHRlbmRgIHRvIGFkZCBtb3JlIHBocmFzZXMsIGJ1dCB1bmRlciBjZXJ0YWluXG4vLyBjaXJjdW1zdGFuY2VzLCB5b3UgbWF5IHdhbnQgdG8gbWFrZSBzdXJlIG5vIG9sZCBwaHJhc2VzIGFyZSBseWluZyBhcm91bmQuXG5Qb2x5Z2xvdC5wcm90b3R5cGUucmVwbGFjZSA9IGZ1bmN0aW9uIChuZXdQaHJhc2VzKSB7XG4gIHRoaXMuY2xlYXIoKTtcbiAgdGhpcy5leHRlbmQobmV3UGhyYXNlcyk7XG59O1xuXG5cbi8vICMjIyBwb2x5Z2xvdC50KGtleSwgb3B0aW9ucylcbi8vXG4vLyBUaGUgbW9zdC11c2VkIG1ldGhvZC4gUHJvdmlkZSBhIGtleSwgYW5kIGB0YCB3aWxsIHJldHVybiB0aGVcbi8vIHBocmFzZS5cbi8vXG4vLyAgICAgcG9seWdsb3QudChcImhlbGxvXCIpO1xuLy8gICAgID0+IFwiSGVsbG9cIlxuLy9cbi8vIFRoZSBwaHJhc2UgdmFsdWUgaXMgcHJvdmlkZWQgZmlyc3QgYnkgYSBjYWxsIHRvIGBwb2x5Z2xvdC5leHRlbmQoKWAgb3Jcbi8vIGBwb2x5Z2xvdC5yZXBsYWNlKClgLlxuLy9cbi8vIFBhc3MgaW4gYW4gb2JqZWN0IGFzIHRoZSBzZWNvbmQgYXJndW1lbnQgdG8gcGVyZm9ybSBpbnRlcnBvbGF0aW9uLlxuLy9cbi8vICAgICBwb2x5Z2xvdC50KFwiaGVsbG9fbmFtZVwiLCB7bmFtZTogXCJTcGlrZVwifSk7XG4vLyAgICAgPT4gXCJIZWxsbywgU3Bpa2VcIlxuLy9cbi8vIElmIHlvdSBsaWtlLCB5b3UgY2FuIHByb3ZpZGUgYSBkZWZhdWx0IHZhbHVlIGluIGNhc2UgdGhlIHBocmFzZSBpcyBtaXNzaW5nLlxuLy8gVXNlIHRoZSBzcGVjaWFsIG9wdGlvbiBrZXkgXCJfXCIgdG8gc3BlY2lmeSBhIGRlZmF1bHQuXG4vL1xuLy8gICAgIHBvbHlnbG90LnQoXCJpX2xpa2VfdG9fd3JpdGVfaW5fbGFuZ3VhZ2VcIiwge1xuLy8gICAgICAgXzogXCJJIGxpa2UgdG8gd3JpdGUgaW4gJXtsYW5ndWFnZX0uXCIsXG4vLyAgICAgICBsYW5ndWFnZTogXCJKYXZhU2NyaXB0XCJcbi8vICAgICB9KTtcbi8vICAgICA9PiBcIkkgbGlrZSB0byB3cml0ZSBpbiBKYXZhU2NyaXB0LlwiXG4vL1xuUG9seWdsb3QucHJvdG90eXBlLnQgPSBmdW5jdGlvbiAoa2V5LCBvcHRpb25zKSB7XG4gIHZhciBwaHJhc2UsIHJlc3VsdDtcbiAgdmFyIG9wdHMgPSBvcHRpb25zID09IG51bGwgPyB7fSA6IG9wdGlvbnM7XG4gIGlmICh0eXBlb2YgdGhpcy5waHJhc2VzW2tleV0gPT09ICdzdHJpbmcnKSB7XG4gICAgcGhyYXNlID0gdGhpcy5waHJhc2VzW2tleV07XG4gIH0gZWxzZSBpZiAodHlwZW9mIG9wdHMuXyA9PT0gJ3N0cmluZycpIHtcbiAgICBwaHJhc2UgPSBvcHRzLl87XG4gIH0gZWxzZSBpZiAodGhpcy5vbk1pc3NpbmdLZXkpIHtcbiAgICB2YXIgb25NaXNzaW5nS2V5ID0gdGhpcy5vbk1pc3NpbmdLZXk7XG4gICAgcmVzdWx0ID0gb25NaXNzaW5nS2V5KGtleSwgb3B0cywgdGhpcy5jdXJyZW50TG9jYWxlLCB0aGlzLnRva2VuUmVnZXgpO1xuICB9IGVsc2Uge1xuICAgIHRoaXMud2FybignTWlzc2luZyB0cmFuc2xhdGlvbiBmb3Iga2V5OiBcIicgKyBrZXkgKyAnXCInKTtcbiAgICByZXN1bHQgPSBrZXk7XG4gIH1cbiAgaWYgKHR5cGVvZiBwaHJhc2UgPT09ICdzdHJpbmcnKSB7XG4gICAgcmVzdWx0ID0gdHJhbnNmb3JtUGhyYXNlKHBocmFzZSwgb3B0cywgdGhpcy5jdXJyZW50TG9jYWxlLCB0aGlzLnRva2VuUmVnZXgpO1xuICB9XG4gIHJldHVybiByZXN1bHQ7XG59O1xuXG5cbi8vICMjIyBwb2x5Z2xvdC5oYXMoa2V5KVxuLy9cbi8vIENoZWNrIGlmIHBvbHlnbG90IGhhcyBhIHRyYW5zbGF0aW9uIGZvciBnaXZlbiBrZXlcblBvbHlnbG90LnByb3RvdHlwZS5oYXMgPSBmdW5jdGlvbiAoa2V5KSB7XG4gIHJldHVybiBoYXModGhpcy5waHJhc2VzLCBrZXkpO1xufTtcblxuLy8gZXhwb3J0IHRyYW5zZm9ybVBocmFzZVxuUG9seWdsb3QudHJhbnNmb3JtUGhyYXNlID0gZnVuY3Rpb24gdHJhbnNmb3JtKHBocmFzZSwgc3Vic3RpdHV0aW9ucywgbG9jYWxlKSB7XG4gIHJldHVybiB0cmFuc2Zvcm1QaHJhc2UocGhyYXNlLCBzdWJzdGl0dXRpb25zLCBsb2NhbGUpO1xufTtcblxudmFyIHdlYml4UG9seWdsb3QgPSBQb2x5Z2xvdDtcblxuZnVuY3Rpb24gTG9jYWxlKGFwcCwgX3ZpZXcsIGNvbmZpZykge1xyXG4gICAgY29uZmlnID0gY29uZmlnIHx8IHt9O1xyXG4gICAgY29uc3Qgc3RvcmFnZSA9IGNvbmZpZy5zdG9yYWdlO1xyXG4gICAgbGV0IGxhbmcgPSBzdG9yYWdlID8gKHN0b3JhZ2UuZ2V0KFwibGFuZ1wiKSB8fCBcImVuXCIpIDogKGNvbmZpZy5sYW5nIHx8IFwiZW5cIik7XHJcbiAgICBmdW5jdGlvbiBzZXRMYW5nRGF0YShuYW1lLCBkYXRhLCBzaWxlbnQpIHtcclxuICAgICAgICBpZiAoZGF0YS5fX2VzTW9kdWxlKSB7XHJcbiAgICAgICAgICAgIGRhdGEgPSBkYXRhLmRlZmF1bHQ7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNvbnN0IHBjb25maWcgPSB7IHBocmFzZXM6IGRhdGEgfTtcclxuICAgICAgICBpZiAoY29uZmlnLnBvbHlnbG90KSB7XHJcbiAgICAgICAgICAgIGFwcC53ZWJpeC5leHRlbmQocGNvbmZpZywgY29uZmlnLnBvbHlnbG90KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgY29uc3QgcG9seSA9IHNlcnZpY2UucG9seWdsb3QgPSBuZXcgd2ViaXhQb2x5Z2xvdChwY29uZmlnKTtcclxuICAgICAgICBwb2x5LmxvY2FsZShuYW1lKTtcclxuICAgICAgICBzZXJ2aWNlLl8gPSBhcHAud2ViaXguYmluZChwb2x5LnQsIHBvbHkpO1xyXG4gICAgICAgIGxhbmcgPSBuYW1lO1xyXG4gICAgICAgIGlmIChzdG9yYWdlKSB7XHJcbiAgICAgICAgICAgIHN0b3JhZ2UucHV0KFwibGFuZ1wiLCBsYW5nKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKGNvbmZpZy53ZWJpeCkge1xyXG4gICAgICAgICAgICBjb25zdCBsb2NOYW1lID0gY29uZmlnLndlYml4W25hbWVdO1xyXG4gICAgICAgICAgICBpZiAobG9jTmFtZSkge1xyXG4gICAgICAgICAgICAgICAgYXBwLndlYml4LmkxOG4uc2V0TG9jYWxlKGxvY05hbWUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICghc2lsZW50KSB7XHJcbiAgICAgICAgICAgIHJldHVybiBhcHAucmVmcmVzaCgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKCk7XHJcbiAgICB9XHJcbiAgICBmdW5jdGlvbiBnZXRMYW5nKCkgeyByZXR1cm4gbGFuZzsgfVxyXG4gICAgZnVuY3Rpb24gc2V0TGFuZyhuYW1lLCBzaWxlbnQpIHtcclxuICAgICAgICAvLyBpZ25vcmUgc2V0TGFuZyBpZiBsb2FkaW5nIGJ5IHBhdGggaXMgZGlzYWJsZWRcclxuICAgICAgICBpZiAoY29uZmlnLnBhdGggPT09IGZhbHNlKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgY29uc3QgcGF0aCA9IChjb25maWcucGF0aCA/IGNvbmZpZy5wYXRoICsgXCIvXCIgOiBcIlwiKSArIG5hbWU7XHJcbiAgICAgICAgY29uc3QgZGF0YSA9IHJlcXVpcmUoXCJqZXQtbG9jYWxlcy9cIiArIHBhdGgpO1xyXG4gICAgICAgIHNldExhbmdEYXRhKG5hbWUsIGRhdGEsIHNpbGVudCk7XHJcbiAgICB9XHJcbiAgICBjb25zdCBzZXJ2aWNlID0ge1xyXG4gICAgICAgIGdldExhbmcsIHNldExhbmcsIHNldExhbmdEYXRhLCBfOiBudWxsLCBwb2x5Z2xvdDogbnVsbFxyXG4gICAgfTtcclxuICAgIGFwcC5zZXRTZXJ2aWNlKFwibG9jYWxlXCIsIHNlcnZpY2UpO1xyXG4gICAgc2V0TGFuZyhsYW5nLCB0cnVlKTtcclxufVxuXG5mdW5jdGlvbiBzaG93KHZpZXcsIGNvbmZpZywgdmFsdWUpIHtcclxuICAgIGlmIChjb25maWcudXJscykge1xyXG4gICAgICAgIHZhbHVlID0gY29uZmlnLnVybHNbdmFsdWVdIHx8IHZhbHVlO1xyXG4gICAgfVxyXG4gICAgZWxzZSBpZiAoY29uZmlnLnBhcmFtKSB7XHJcbiAgICAgICAgdmFsdWUgPSB7IFtjb25maWcucGFyYW1dOiB2YWx1ZSB9O1xyXG4gICAgfVxyXG4gICAgdmlldy5zaG93KHZhbHVlKTtcclxufVxyXG5mdW5jdGlvbiBNZW51KGFwcCwgdmlldywgY29uZmlnKSB7XHJcbiAgICBjb25zdCBmcmFtZSA9IHZpZXcuZ2V0U3ViVmlld0luZm8oKS5wYXJlbnQ7XHJcbiAgICBjb25zdCB1aSA9IHZpZXcuJCQoY29uZmlnLmlkIHx8IGNvbmZpZyk7XHJcbiAgICBsZXQgc2lsZW50ID0gZmFsc2U7XHJcbiAgICB1aS5hdHRhY2hFdmVudChcIm9uY2hhbmdlXCIsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBpZiAoIXNpbGVudCkge1xyXG4gICAgICAgICAgICBzaG93KGZyYW1lLCBjb25maWcsIHRoaXMuZ2V0VmFsdWUoKSk7XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcbiAgICB1aS5hdHRhY2hFdmVudChcIm9uYWZ0ZXJzZWxlY3RcIiwgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIGlmICghc2lsZW50KSB7XHJcbiAgICAgICAgICAgIGxldCBpZCA9IG51bGw7XHJcbiAgICAgICAgICAgIGlmICh1aS5zZXRWYWx1ZSkge1xyXG4gICAgICAgICAgICAgICAgaWQgPSB0aGlzLmdldFZhbHVlKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSBpZiAodWkuZ2V0U2VsZWN0ZWRJZCkge1xyXG4gICAgICAgICAgICAgICAgaWQgPSB1aS5nZXRTZWxlY3RlZElkKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgc2hvdyhmcmFtZSwgY29uZmlnLCBpZCk7XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcbiAgICB2aWV3Lm9uKGFwcCwgYGFwcDpyb3V0ZWAsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBsZXQgbmFtZSA9IFwiXCI7XHJcbiAgICAgICAgaWYgKGNvbmZpZy5wYXJhbSkge1xyXG4gICAgICAgICAgICBuYW1lID0gdmlldy5nZXRQYXJhbShjb25maWcucGFyYW0sIHRydWUpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgY29uc3Qgc2VnbWVudCA9IGZyYW1lLmdldFVybCgpWzFdO1xyXG4gICAgICAgICAgICBpZiAoc2VnbWVudCkge1xyXG4gICAgICAgICAgICAgICAgbmFtZSA9IHNlZ21lbnQucGFnZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAobmFtZSkge1xyXG4gICAgICAgICAgICBzaWxlbnQgPSB0cnVlO1xyXG4gICAgICAgICAgICBpZiAodWkuc2V0VmFsdWUgJiYgdWkuZ2V0VmFsdWUoKSAhPT0gbmFtZSkge1xyXG4gICAgICAgICAgICAgICAgdWkuc2V0VmFsdWUobmFtZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSBpZiAodWkuc2VsZWN0ICYmIHVpLmV4aXN0cyhuYW1lKSAmJiB1aS5nZXRTZWxlY3RlZElkKCkgIT09IG5hbWUpIHtcclxuICAgICAgICAgICAgICAgIHVpLnNlbGVjdChuYW1lKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBzaWxlbnQgPSBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxufVxuXG5jb25zdCBiYXNlaWNvbnMgPSB7XHJcbiAgICBnb29kOiBcImNoZWNrXCIsXHJcbiAgICBlcnJvcjogXCJ3YXJuaW5nXCIsXHJcbiAgICBzYXZpbmc6IFwicmVmcmVzaCBmYS1zcGluXCJcclxufTtcclxuY29uc3QgYmFzZXRleHQgPSB7XHJcbiAgICBnb29kOiBcIk9rXCIsXHJcbiAgICBlcnJvcjogXCJFcnJvclwiLFxyXG4gICAgc2F2aW5nOiBcIkNvbm5lY3RpbmcuLi5cIlxyXG59O1xyXG5mdW5jdGlvbiBTdGF0dXMoYXBwLCB2aWV3LCBjb25maWcpIHtcclxuICAgIGxldCBzdGF0dXMgPSBcImdvb2RcIjtcclxuICAgIGxldCBjb3VudCA9IDA7XHJcbiAgICBsZXQgaXNlcnJvciA9IGZhbHNlO1xyXG4gICAgbGV0IGV4cGlyZURlbGF5ID0gY29uZmlnLmV4cGlyZTtcclxuICAgIGlmICghZXhwaXJlRGVsYXkgJiYgZXhwaXJlRGVsYXkgIT09IGZhbHNlKSB7XHJcbiAgICAgICAgZXhwaXJlRGVsYXkgPSAyMDAwO1xyXG4gICAgfVxyXG4gICAgY29uc3QgdGV4dHMgPSBjb25maWcudGV4dHMgfHwgYmFzZXRleHQ7XHJcbiAgICBjb25zdCBpY29ucyA9IGNvbmZpZy5pY29ucyB8fCBiYXNlaWNvbnM7XHJcbiAgICBpZiAodHlwZW9mIGNvbmZpZyA9PT0gXCJzdHJpbmdcIikge1xyXG4gICAgICAgIGNvbmZpZyA9IHsgdGFyZ2V0OiBjb25maWcgfTtcclxuICAgIH1cclxuICAgIGZ1bmN0aW9uIHJlZnJlc2goY29udGVudCkge1xyXG4gICAgICAgIGNvbnN0IGFyZWEgPSB2aWV3LiQkKGNvbmZpZy50YXJnZXQpO1xyXG4gICAgICAgIGlmIChhcmVhKSB7XHJcbiAgICAgICAgICAgIGlmICghY29udGVudCkge1xyXG4gICAgICAgICAgICAgICAgY29udGVudCA9IFwiPGRpdiBjbGFzcz0nc3RhdHVzX1wiICtcclxuICAgICAgICAgICAgICAgICAgICBzdGF0dXMgK1xyXG4gICAgICAgICAgICAgICAgICAgIFwiJz48c3BhbiBjbGFzcz0nd2ViaXhfaWNvbiBmYS1cIiArXHJcbiAgICAgICAgICAgICAgICAgICAgaWNvbnNbc3RhdHVzXSArIFwiJz48L3NwYW4+IFwiICsgdGV4dHNbc3RhdHVzXSArIFwiPC9kaXY+XCI7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgYXJlYS5zZXRIVE1MKGNvbnRlbnQpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGZ1bmN0aW9uIHN1Y2Nlc3MoKSB7XHJcbiAgICAgICAgY291bnQtLTtcclxuICAgICAgICBzZXRTdGF0dXMoXCJnb29kXCIpO1xyXG4gICAgfVxyXG4gICAgZnVuY3Rpb24gZmFpbChlcnIpIHtcclxuICAgICAgICBjb3VudC0tO1xyXG4gICAgICAgIHNldFN0YXR1cyhcImVycm9yXCIsIGVycik7XHJcbiAgICB9XHJcbiAgICBmdW5jdGlvbiBzdGFydChwcm9taXNlKSB7XHJcbiAgICAgICAgY291bnQrKztcclxuICAgICAgICBzZXRTdGF0dXMoXCJzYXZpbmdcIik7XHJcbiAgICAgICAgaWYgKHByb21pc2UgJiYgcHJvbWlzZS50aGVuKSB7XHJcbiAgICAgICAgICAgIHByb21pc2UudGhlbihzdWNjZXNzLCBmYWlsKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBmdW5jdGlvbiBnZXRTdGF0dXMoKSB7XHJcbiAgICAgICAgcmV0dXJuIHN0YXR1cztcclxuICAgIH1cclxuICAgIGZ1bmN0aW9uIGhpZGVTdGF0dXMoKSB7XHJcbiAgICAgICAgaWYgKGNvdW50ID09PSAwKSB7XHJcbiAgICAgICAgICAgIHJlZnJlc2goXCIgXCIpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGZ1bmN0aW9uIHNldFN0YXR1cyhtb2RlLCBlcnIpIHtcclxuICAgICAgICBpZiAoY291bnQgPCAwKSB7XHJcbiAgICAgICAgICAgIGNvdW50ID0gMDtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKG1vZGUgPT09IFwic2F2aW5nXCIpIHtcclxuICAgICAgICAgICAgc3RhdHVzID0gXCJzYXZpbmdcIjtcclxuICAgICAgICAgICAgcmVmcmVzaCgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgaXNlcnJvciA9IChtb2RlID09PSBcImVycm9yXCIpO1xyXG4gICAgICAgICAgICBpZiAoY291bnQgPT09IDApIHtcclxuICAgICAgICAgICAgICAgIHN0YXR1cyA9IGlzZXJyb3IgPyBcImVycm9yXCIgOiBcImdvb2RcIjtcclxuICAgICAgICAgICAgICAgIGlmIChpc2Vycm9yKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgYXBwLmVycm9yKFwiYXBwOmVycm9yOnNlcnZlclwiLCBbZXJyLnJlc3BvbnNlVGV4dCB8fCBlcnJdKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChleHBpcmVEZWxheSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KGhpZGVTdGF0dXMsIGV4cGlyZURlbGF5KTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICByZWZyZXNoKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBmdW5jdGlvbiB0cmFjayhkYXRhKSB7XHJcbiAgICAgICAgY29uc3QgZHAgPSBhcHAud2ViaXguZHAoZGF0YSk7XHJcbiAgICAgICAgaWYgKGRwKSB7XHJcbiAgICAgICAgICAgIHZpZXcub24oZHAsIFwib25BZnRlckRhdGFTZW5kXCIsIHN0YXJ0KTtcclxuICAgICAgICAgICAgdmlldy5vbihkcCwgXCJvbkFmdGVyU2F2ZUVycm9yXCIsIChfaWQsIF9vYmosIHJlc3BvbnNlKSA9PiBmYWlsKHJlc3BvbnNlKSk7XHJcbiAgICAgICAgICAgIHZpZXcub24oZHAsIFwib25BZnRlclNhdmVcIiwgc3VjY2Vzcyk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgYXBwLnNldFNlcnZpY2UoXCJzdGF0dXNcIiwge1xyXG4gICAgICAgIGdldFN0YXR1cyxcclxuICAgICAgICBzZXRTdGF0dXMsXHJcbiAgICAgICAgdHJhY2tcclxuICAgIH0pO1xyXG4gICAgaWYgKGNvbmZpZy5yZW1vdGUpIHtcclxuICAgICAgICB2aWV3Lm9uKGFwcC53ZWJpeCwgXCJvblJlbW90ZUNhbGxcIiwgc3RhcnQpO1xyXG4gICAgfVxyXG4gICAgaWYgKGNvbmZpZy5hamF4KSB7XHJcbiAgICAgICAgdmlldy5vbihhcHAud2ViaXgsIFwib25CZWZvcmVBamF4XCIsIChfbW9kZSwgX3VybCwgX2RhdGEsIF9yZXF1ZXN0LCBfaGVhZGVycywgX2ZpbGVzLCBwcm9taXNlKSA9PiB7XHJcbiAgICAgICAgICAgIHN0YXJ0KHByb21pc2UpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgaWYgKGNvbmZpZy5kYXRhKSB7XHJcbiAgICAgICAgdHJhY2soY29uZmlnLmRhdGEpO1xyXG4gICAgfVxyXG59XG5cbmZ1bmN0aW9uIFRoZW1lKGFwcCwgX3ZpZXcsIGNvbmZpZykge1xyXG4gICAgY29uZmlnID0gY29uZmlnIHx8IHt9O1xyXG4gICAgY29uc3Qgc3RvcmFnZSA9IGNvbmZpZy5zdG9yYWdlO1xyXG4gICAgbGV0IHRoZW1lID0gc3RvcmFnZSA/XHJcbiAgICAgICAgKHN0b3JhZ2UuZ2V0KFwidGhlbWVcIikgfHwgXCJmbGF0LWRlZmF1bHRcIilcclxuICAgICAgICA6XHJcbiAgICAgICAgICAgIChjb25maWcudGhlbWUgfHwgXCJmbGF0LWRlZmF1bHRcIik7XHJcbiAgICBjb25zdCBzZXJ2aWNlID0ge1xyXG4gICAgICAgIGdldFRoZW1lKCkgeyByZXR1cm4gdGhlbWU7IH0sXHJcbiAgICAgICAgc2V0VGhlbWUobmFtZSwgc2lsZW50KSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHBhcnRzID0gbmFtZS5zcGxpdChcIi1cIik7XHJcbiAgICAgICAgICAgIGNvbnN0IGxpbmtzID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoXCJsaW5rXCIpO1xyXG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxpbmtzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBsbmFtZSA9IGxpbmtzW2ldLmdldEF0dHJpYnV0ZShcInRpdGxlXCIpO1xyXG4gICAgICAgICAgICAgICAgaWYgKGxuYW1lKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGxuYW1lID09PSBuYW1lIHx8IGxuYW1lID09PSBwYXJ0c1swXSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsaW5rc1tpXS5kaXNhYmxlZCA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGlua3NbaV0uZGlzYWJsZWQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBhcHAud2ViaXguc2tpbi5zZXQocGFydHNbMF0pO1xyXG4gICAgICAgICAgICAvLyByZW1vdmUgb2xkIGNzc1xyXG4gICAgICAgICAgICBhcHAud2ViaXguaHRtbC5yZW1vdmVDc3MoZG9jdW1lbnQuYm9keSwgXCJ0aGVtZS1cIiArIHRoZW1lKTtcclxuICAgICAgICAgICAgLy8gYWRkIG5ldyBjc3NcclxuICAgICAgICAgICAgYXBwLndlYml4Lmh0bWwuYWRkQ3NzKGRvY3VtZW50LmJvZHksIFwidGhlbWUtXCIgKyBuYW1lKTtcclxuICAgICAgICAgICAgdGhlbWUgPSBuYW1lO1xyXG4gICAgICAgICAgICBpZiAoc3RvcmFnZSkge1xyXG4gICAgICAgICAgICAgICAgc3RvcmFnZS5wdXQoXCJ0aGVtZVwiLCBuYW1lKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoIXNpbGVudCkge1xyXG4gICAgICAgICAgICAgICAgYXBwLnJlZnJlc2goKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH07XHJcbiAgICBhcHAuc2V0U2VydmljZShcInRoZW1lXCIsIHNlcnZpY2UpO1xyXG4gICAgc2VydmljZS5zZXRUaGVtZSh0aGVtZSwgdHJ1ZSk7XHJcbn1cblxuZnVuY3Rpb24gY29weVBhcmFtcyhkYXRhLCB1cmwsIHJvdXRlKSB7XHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHJvdXRlLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgZGF0YVtyb3V0ZVtpXV0gPSB1cmxbaSArIDFdID8gdXJsW2kgKyAxXS5wYWdlIDogXCJcIjtcclxuICAgIH1cclxufVxyXG5mdW5jdGlvbiBVcmxQYXJhbShhcHAsIHZpZXcsIGNvbmZpZykge1xyXG4gICAgY29uc3Qgcm91dGUgPSBjb25maWcucm91dGUgfHwgY29uZmlnO1xyXG4gICAgY29uc3QgZGF0YSA9IHt9O1xyXG4gICAgdmlldy5vbihhcHAsIFwiYXBwOnVybGNoYW5nZVwiLCBmdW5jdGlvbiAoc3Vidmlldywgc2VnbWVudCkge1xyXG4gICAgICAgIGlmICh2aWV3ID09PSBzdWJ2aWV3KSB7XHJcbiAgICAgICAgICAgIGNvcHlQYXJhbXMoZGF0YSwgc2VnbWVudC5zdWJ1cmwoKSwgcm91dGUpO1xyXG4gICAgICAgICAgICBzZWdtZW50LnNpemUocm91dGUubGVuZ3RoICsgMSk7XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcbiAgICBjb25zdCBvcyA9IHZpZXcuc2V0UGFyYW07XHJcbiAgICBjb25zdCBvZyA9IHZpZXcuZ2V0UGFyYW07XHJcbiAgICB2aWV3LnNldFBhcmFtID0gZnVuY3Rpb24gKG5hbWUsIHZhbHVlLCBzaG93KSB7XHJcbiAgICAgICAgY29uc3QgaW5kZXggPSByb3V0ZS5pbmRleE9mKG5hbWUpO1xyXG4gICAgICAgIGlmIChpbmRleCA+PSAwKSB7XHJcbiAgICAgICAgICAgIGRhdGFbbmFtZV0gPSB2YWx1ZTtcclxuICAgICAgICAgICAgdGhpcy5fc2VnbWVudC51cGRhdGUoXCJcIiwgdmFsdWUsIGluZGV4ICsgMSk7XHJcbiAgICAgICAgICAgIGlmIChzaG93KSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdmlldy5zaG93KG51bGwpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICByZXR1cm4gb3MuY2FsbCh0aGlzLCBuYW1lLCB2YWx1ZSwgc2hvdyk7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuICAgIHZpZXcuZ2V0UGFyYW0gPSBmdW5jdGlvbiAoa2V5LCBtb2RlKSB7XHJcbiAgICAgICAgY29uc3QgdmFsID0gZGF0YVtrZXldO1xyXG4gICAgICAgIGlmICh0eXBlb2YgdmFsICE9PSBcInVuZGVmaW5lZFwiKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB2YWw7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBvZy5jYWxsKHRoaXMsIGtleSwgbW9kZSk7XHJcbiAgICB9O1xyXG4gICAgY29weVBhcmFtcyhkYXRhLCB2aWV3LmdldFVybCgpLCByb3V0ZSk7XHJcbn1cblxuZnVuY3Rpb24gVXNlcihhcHAsIF92aWV3LCBjb25maWcpIHtcclxuICAgIGNvbmZpZyA9IGNvbmZpZyB8fCB7fTtcclxuICAgIGNvbnN0IGxvZ2luID0gY29uZmlnLmxvZ2luIHx8IFwiL2xvZ2luXCI7XHJcbiAgICBjb25zdCBsb2dvdXQgPSBjb25maWcubG9nb3V0IHx8IFwiL2xvZ291dFwiO1xyXG4gICAgY29uc3QgYWZ0ZXJMb2dpbiA9IGNvbmZpZy5hZnRlckxvZ2luIHx8IGFwcC5jb25maWcuc3RhcnQ7XHJcbiAgICBjb25zdCBhZnRlckxvZ291dCA9IGNvbmZpZy5hZnRlckxvZ291dCB8fCBcIi9sb2dpblwiO1xyXG4gICAgY29uc3QgcGluZyA9IGNvbmZpZy5waW5nIHx8IDUgKiA2MCAqIDEwMDA7XHJcbiAgICBjb25zdCBtb2RlbCA9IGNvbmZpZy5tb2RlbDtcclxuICAgIGxldCB1c2VyID0gY29uZmlnLnVzZXI7XHJcbiAgICBjb25zdCBzZXJ2aWNlID0ge1xyXG4gICAgICAgIGdldFVzZXIoKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB1c2VyO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgZ2V0U3RhdHVzKHNlcnZlcikge1xyXG4gICAgICAgICAgICBpZiAoIXNlcnZlcikge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHVzZXIgIT09IG51bGw7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIG1vZGVsLnN0YXR1cygpLmNhdGNoKCgpID0+IG51bGwpLnRoZW4oZGF0YSA9PiB7XHJcbiAgICAgICAgICAgICAgICB1c2VyID0gZGF0YTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBsb2dpbihuYW1lLCBwYXNzKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBtb2RlbC5sb2dpbihuYW1lLCBwYXNzKS50aGVuKGRhdGEgPT4ge1xyXG4gICAgICAgICAgICAgICAgdXNlciA9IGRhdGE7XHJcbiAgICAgICAgICAgICAgICBpZiAoIWRhdGEpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJBY2Nlc3MgZGVuaWVkXCIpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgYXBwLmNhbGxFdmVudChcImFwcDp1c2VyOmxvZ2luXCIsIFt1c2VyXSk7XHJcbiAgICAgICAgICAgICAgICBhcHAuc2hvdyhhZnRlckxvZ2luKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBsb2dvdXQoKSB7XHJcbiAgICAgICAgICAgIHVzZXIgPSBudWxsO1xyXG4gICAgICAgICAgICByZXR1cm4gbW9kZWwubG9nb3V0KCkudGhlbihyZXMgPT4ge1xyXG4gICAgICAgICAgICAgICAgYXBwLmNhbGxFdmVudChcImFwcDp1c2VyOmxvZ291dFwiLCBbXSk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVzO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG4gICAgZnVuY3Rpb24gY2FuTmF2aWdhdGUodXJsLCBvYmopIHtcclxuICAgICAgICBpZiAodXJsID09PSBsb2dvdXQpIHtcclxuICAgICAgICAgICAgc2VydmljZS5sb2dvdXQoKTtcclxuICAgICAgICAgICAgb2JqLnJlZGlyZWN0ID0gYWZ0ZXJMb2dvdXQ7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYgKHVybCAhPT0gbG9naW4gJiYgIXNlcnZpY2UuZ2V0U3RhdHVzKCkpIHtcclxuICAgICAgICAgICAgb2JqLnJlZGlyZWN0ID0gbG9naW47XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgYXBwLnNldFNlcnZpY2UoXCJ1c2VyXCIsIHNlcnZpY2UpO1xyXG4gICAgYXBwLmF0dGFjaEV2ZW50KGBhcHA6Z3VhcmRgLCBmdW5jdGlvbiAodXJsLCBfJHJvb3QsIG9iaikge1xyXG4gICAgICAgIGlmIChjb25maWcucHVibGljICYmIGNvbmZpZy5wdWJsaWModXJsKSkge1xyXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHR5cGVvZiB1c2VyID09PSBcInVuZGVmaW5lZFwiKSB7XHJcbiAgICAgICAgICAgIG9iai5jb25maXJtID0gc2VydmljZS5nZXRTdGF0dXModHJ1ZSkudGhlbigoKSA9PiBjYW5OYXZpZ2F0ZSh1cmwsIG9iaikpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gY2FuTmF2aWdhdGUodXJsLCBvYmopO1xyXG4gICAgfSk7XHJcbiAgICBpZiAocGluZykge1xyXG4gICAgICAgIHNldEludGVydmFsKCgpID0+IHNlcnZpY2UuZ2V0U3RhdHVzKHRydWUpLCBwaW5nKTtcclxuICAgIH1cclxufVxuXG4vKlxyXG5NSVQgTGljZW5zZVxyXG5Db3B5cmlnaHQgKGMpIDIwMTkgWEIgU29mdHdhcmVcclxuKi9cclxubGV0IHdlYml4ID0gd2luZG93LndlYml4O1xyXG5pZiAod2ViaXgpIHtcclxuICAgIHBhdGNoKHdlYml4KTtcclxufVxyXG5jb25zdCBwbHVnaW5zID0ge1xyXG4gICAgVW5sb2FkR3VhcmQsIExvY2FsZSwgTWVudSwgVGhlbWUsIFVzZXIsIFN0YXR1cywgVXJsUGFyYW1cclxufTtcclxuY29uc3QgZXJyb3JzID0geyBOYXZpZ2F0aW9uQmxvY2tlZCB9O1xyXG5jb25zdCB3ID0gd2luZG93O1xyXG5pZiAoIXcuUHJvbWlzZSkge1xyXG4gICAgdy5Qcm9taXNlID0gdy53ZWJpeC5wcm9taXNlO1xyXG59XG5cbmV4cG9ydCB7IHBsdWdpbnMsIGVycm9ycywgSmV0QXBwLCBKZXRWaWV3LCBIYXNoUm91dGVyLCBTdG9yZVJvdXRlciwgVXJsUm91dGVyLCBFbXB0eVJvdXRlciwgU3ViUm91dGVyIH07XG4vLyMgc291cmNlTWFwcGluZ1VSTD1qZXQuanMubWFwXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9ub2RlX21vZHVsZXMvd2ViaXgtamV0L2Rpc3QvZXM2L2pldC5qcyIsImltcG9ydCB7IFNlcnZpY2UgfSBmcm9tIFwiLi4vY29tbW9uL2FwaVwiO1xuXG5jb25zdCBCQVNFX1VSTCA9IFwiL3plcm9ib3QvYWRtaW4vYWN0b3JzL2hlYWx0aFwiO1xuXG5jbGFzcyBIZWFsdGhTZXJ2aWNlIGV4dGVuZHMgU2VydmljZSB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHN1cGVyKEJBU0VfVVJMKTtcbiAgICB9XG5cbiAgICBnZXREaXNrU3BhY2UoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmdldENhbGwoXCJnZXRfZGlza19zcGFjZVwiKTtcbiAgICB9XG5cbiAgICBnZXRIZWFsdGgoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmdldENhbGwoXCJoZWFsdGhcIik7XG4gICAgfVxuXG4gICAgZ2V0SWRlbnRpdHkoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmdldENhbGwoXCJnZXRfaWRlbnRpdHlcIik7XG4gICAgfVxuXG4gICAgZ2V0TmV0d29ya0luZm8oKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmdldENhbGwoXCJuZXR3b3JrX2luZm9cIik7XG4gICAgfVxuXG4gICAgZ2V0SnN4VmVyc2lvbigpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0Q2FsbChcImpzeF92ZXJzaW9uXCIpO1xuICAgIH1cblxuICAgIGdldFJ1bm5pbmdQcm9jZXNzZXMoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmdldENhbGwoXCJnZXRfcnVubmluZ19wcm9jZXNzZXNcIik7XG4gICAgfVxuXG4gICAgZ2V0UnVubmluZ1BvcnRzKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5nZXRDYWxsKFwiZ2V0X3J1bm5pbmdfcG9ydHNcIik7XG4gICAgfVxufVxuXG5leHBvcnQgY29uc3QgaGVhbHRoID0gbmV3IEhlYWx0aFNlcnZpY2UoKTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NvdXJjZXMvc2VydmljZXMvaGVhbHRoLmpzIiwiY29uc3QgYWpheCA9IHdlYml4LmFqYXgoKS5oZWFkZXJzKHsgXCJDb250ZW50LXR5cGVcIjogXCJhcHBsaWNhdGlvbi9qc29uXCIgfSk7XG5cbmV4cG9ydCBjbGFzcyBTZXJ2aWNlIHtcbiAgICBjb25zdHJ1Y3RvcihiYXNlVXJsKSB7XG4gICAgICAgIHRoaXMuYmFzZVVybCA9IGJhc2VVcmw7XG4gICAgfVxuXG4gICAgam9pblVybCh1cmwpIHtcbiAgICAgICAgaWYgKHRoaXMuYmFzZVVybCkge1xuICAgICAgICAgICAgcmV0dXJuIGAke3RoaXMuYmFzZVVybH0vJHt1cmx9YDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdXJsO1xuICAgIH1cblxuICAgIGNhbGwobWV0aG9kLCB1cmwsIGFyZ3MpIHtcbiAgICAgICAgbWV0aG9kID0gbWV0aG9kLnRvTG93ZXJDYXNlKCk7XG4gICAgICAgIHVybCA9IHRoaXMuam9pblVybCh1cmwpO1xuXG4gICAgICAgIGlmIChhcmdzKSB7XG4gICAgICAgICAgICBhcmdzID0geyBhcmdzOiBhcmdzIH07XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBhcmdzID0ge307XG4gICAgICAgIH1cblxuICAgICAgICBpZiAobWV0aG9kID09PSBcImdldFwiKSB7XG4gICAgICAgICAgICByZXR1cm4gYWpheC5nZXQodXJsLCBhcmdzKTtcbiAgICAgICAgfSBlbHNlIGlmIChtZXRob2QgPT0gXCJwb3N0XCIpIHtcbiAgICAgICAgICAgIHJldHVybiBhamF4LnBvc3QodXJsLCBhcmdzKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRocm93IFZhbHVlRXJyb3IoYCR7bWV0aG9kfSBpcyBub3Qgc3VwcG9ydGVkYCk7XG4gICAgfVxuXG4gICAgZ2V0Q2FsbCh1cmwsIGFyZ3MpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuY2FsbChcImdldFwiLCB1cmwsIGFyZ3MpO1xuICAgIH1cblxuICAgIHBvc3RDYWxsKHVybCwgYXJncykge1xuICAgICAgICByZXR1cm4gdGhpcy5jYWxsKFwicG9zdFwiLCB1cmwsIGFyZ3MpO1xuICAgIH1cbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NvdXJjZXMvY29tbW9uL2FwaS5qcyIsImltcG9ydCB7IEpldFZpZXcgfSBmcm9tIFwid2ViaXgtamV0XCI7XG5cbmltcG9ydCB7IGFuc2lVcCB9IGZyb20gXCIuLi8uLi9jb21tb24vY29sb3JzXCI7XG5pbXBvcnQgeyBkYXRlRm9ybWF0dGVyIH0gZnJvbSBcIi4uLy4uL2NvbW1vbi9mb3JtYXR0ZXJzXCI7XG5pbXBvcnQgeyBhbGVydHMgfSBmcm9tIFwiLi4vLi4vc2VydmljZXMvYWxlcnRzXCI7XG5cbmltcG9ydCBBbGVydFZpZXcgZnJvbSBcIi4vYWxlcnRcIjtcblxuY29uc3QgTUFYX01TR19MRU4gPSAxMDA7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEFsZXJ0c1ZpZXcgZXh0ZW5kcyBKZXRWaWV3IHtcbiAgICBjb25maWcoKSB7XG4gICAgICAgIGNvbnN0IHZpZXcgPSB7XG4gICAgICAgICAgICByb3dzOiBbXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICB2aWV3OiBcImRhdGF0YWJsZVwiLFxuICAgICAgICAgICAgICAgICAgICBpZDogXCJhbGVydHNfdGFibGVcIixcbiAgICAgICAgICAgICAgICAgICAgcmVzaXplQ29sdW1uOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICBzZWxlY3Q6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgIG11bHRpc2VsZWN0OiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICBjc3M6IFwid2ViaXhfaGVhZGVyX2JvcmRlciB3ZWJpeF9kYXRhX2JvcmRlclwiLFxuICAgICAgICAgICAgICAgICAgICBjb2x1bW5zOiBbe1xuICAgICAgICAgICAgICAgICAgICAgICAgaWQ6IFwiaW5kZXhcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIGhlYWRlcjogXCIjXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBzb3J0OiBcImludFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgYXV0b3dpZHRoOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZDogXCJhbGVydF90eXBlXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBoZWFkZXI6IFwiVHlwZVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgc29ydDogXCJzdHJpbmdcIlxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZDogXCJjb3VudFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgaGVhZGVyOiBcIkNvdW50XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBzb3J0OiBcImludFwiXG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlkOiBcInN0YXR1c1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgaGVhZGVyOiBcIlN0YXR1c1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgc29ydDogXCJzdHJpbmdcIlxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZDogXCJsZXZlbFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgaGVhZGVyOiBcIkxldmVsXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBzb3J0OiBcImludFwiXG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlkOiBcImNhdFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgaGVhZGVyOiBbXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJDYXRlZ29yeVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29udGVudDogXCJ0ZXh0RmlsdGVyXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgICAgICAgICAgc29ydDogXCJzdHJpbmdcIlxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZDogXCJ0aW1lX2ZpcnN0XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBoZWFkZXI6IFwiRmlyc3QgdGltZVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgc29ydDogXCJkYXRlXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBmb3JtYXQ6IGRhdGVGb3JtYXR0ZXIsXG4gICAgICAgICAgICAgICAgICAgICAgICB3aWR0aDogMjAwXG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlkOiBcInRpbWVfbGFzdFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgaGVhZGVyOiBcIkxhc3QgdGltZVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgc29ydDogXCJkYXRlXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBmb3JtYXQ6IGRhdGVGb3JtYXR0ZXIsXG4gICAgICAgICAgICAgICAgICAgICAgICB3aWR0aDogMjAwXG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlkOiBcIm1lc3NhZ2VcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIGhlYWRlcjogW1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiTWVzc2FnZVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29udGVudDogXCJ0ZXh0RmlsdGVyXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHNvcnQ6IFwic3RyXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBmaWxsc3BhY2U6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICBmb3JtYXQ6IGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh2YWx1ZS5sZW5ndGggPiBNQVhfTVNHX0xFTikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZSA9IHZhbHVlLnN1YnN0cigwLCBNQVhfTVNHX0xFTikgKyAnLi4uJztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGFuc2lVcC5hbnNpX3RvX2h0bWwodmFsdWUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgICAgICBhdXRvQ29uZmlnOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAvLyB1cmw6e1xuICAgICAgICAgICAgICAgICAgICAvLyAgICAgJHByb3h5OnRydWUsXG4gICAgICAgICAgICAgICAgICAgIC8vICAgICBsb2FkOiBmdW5jdGlvbih2aWV3LCBwYXJhbXMpe1xuICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgIGxldCBkYXRhID0gd2ViaXguYWpheChcIi96ZXJvYm90L2FsZXJ0YS9hY3RvcnMvYWxlcnRhL2xpc3RfYWxlcnRzXCIpO1xuICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgIHJldHVybiBkYXRhO1xuICAgICAgICAgICAgICAgICAgICAvLyAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgLy8gfVxuICAgICAgICAgICAgICAgICAgICBzY2hlbWU6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICRpbml0OiBmdW5jdGlvbiAob2JqKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb2JqLmluZGV4ID0gdGhpcy5jb3VudCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAkc3VidmlldzogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgcG9wdXA6IHRydWVcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICBdXG4gICAgICAgIH07XG5cbiAgICAgICAgcmV0dXJuIHZpZXc7XG4gICAgfVxuXG4gICAgZGVsZXRlSXRlbShvYmplY3RzKSB7XG4gICAgICAgIHZhciBzZWxmID0gdGhpcztcblxuICAgICAgICBsZXQgaXRlbXMgPSBbXSxcbiAgICAgICAgICAgIGlkcyA9IFtdLFxuICAgICAgICAgICAgaW5kZXhlcyA9IFtdO1xuXG4gICAgICAgIGZvciAobGV0IG9iaiBvZiBvYmplY3RzKSB7XG4gICAgICAgICAgICBpZHMucHVzaChvYmouaWQpO1xuICAgICAgICAgICAgbGV0IGl0ZW0gPSBzZWxmLnRhYmxlLmdldEl0ZW0ob2JqLmlkKTtcbiAgICAgICAgICAgIGl0ZW1zLnB1c2goaXRlbSlcbiAgICAgICAgICAgIGluZGV4ZXMucHVzaChpdGVtLmluZGV4KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHdlYml4LmNvbmZpcm0oe1xuICAgICAgICAgICAgdGl0bGU6IFwiRGVsZXRlIGFsZXJ0c1wiLFxuICAgICAgICAgICAgb2s6IFwiWWVzXCIsXG4gICAgICAgICAgICBjYW5jZWw6IFwiTm9cIixcbiAgICAgICAgICAgIHRleHQ6IGBEZWxldGUgYWxlcnQgaXRlbShzKSBvZiAke2luZGV4ZXMuam9pbihcIiwgXCIpfWBcbiAgICAgICAgfSkudGhlbigoKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBpZGVudGlmaWVycyA9IGl0ZW1zLm1hcCgoaXRlbSkgPT4gaXRlbS5pZGVudGlmaWVyKTtcbiAgICAgICAgICAgIHNlbGYudGFibGUuc2hvd1Byb2dyZXNzKHtcbiAgICAgICAgICAgICAgICBoaWRlOiBmYWxzZVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIGFsZXJ0cy5kZWxldGUoaWRlbnRpZmllcikudGhlbigoKSA9PiB7XG4gICAgICAgICAgICAgICAgc2VsZi50YWJsZS5yZW1vdmUoaWRzKVxuICAgICAgICAgICAgICAgIHNlbGYudGFibGUuc2hvd1Byb2dyZXNzKHtcbiAgICAgICAgICAgICAgICAgICAgaGlkZTogdHJ1ZVxuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgdmlld0l0ZW0oaWQpIHtcbiAgICAgICAgdGhpcy5hbGVydFZpZXcuc2hvd0Zvcih0aGlzLnRhYmxlLmdldEl0ZW0oaWQpKTtcbiAgICB9XG5cbiAgICBpbml0KHZpZXcpIHtcbiAgICAgICAgLy8gdGhpcy51c2UocGx1Z2lucy5Qcm9ncmVzc0JhciwgXCJwcm9ncmVzc1wiKTtcbiAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgICAgICBzZWxmLnRhYmxlID0gJCQoXCJhbGVydHNfdGFibGVcIik7XG4gICAgICAgIHNlbGYuYWxlcnRWaWV3ID0gc2VsZi51aShBbGVydFZpZXcpO1xuXG4gICAgICAgIHdlYml4LmV4dGVuZChzZWxmLnRhYmxlLCB3ZWJpeC5Qcm9ncmVzc0Jhcik7XG4gICAgICAgIHdlYml4LnJlYWR5KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHNlbGYudGFibGUuY2xlYXJBbGwoKTtcbiAgICAgICAgICAgIHNlbGYudGFibGUuc2hvd1Byb2dyZXNzKHtcbiAgICAgICAgICAgICAgICBoaWRlOiBmYWxzZVxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBhbGVydHMubGlzdCgpLnRoZW4oZGF0YSA9PiB7XG4gICAgICAgICAgICAgICAgbGV0IGFsZXJ0cyA9IGRhdGEuanNvbigpLmFsZXJ0cztcbiAgICAgICAgICAgICAgICBzZWxmLnRhYmxlLnBhcnNlKGFsZXJ0cyk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgd2ViaXgudWkoe1xuICAgICAgICAgICAgdmlldzogXCJjb250ZXh0bWVudVwiLFxuICAgICAgICAgICAgaWQ6IFwiYWxlcnRzX2NtXCIsXG4gICAgICAgICAgICBkYXRhOiBbXCJWaWV3XCIsIFwiRGVsZXRlXCJdXG4gICAgICAgIH0pLmF0dGFjaFRvKHNlbGYudGFibGUpO1xuXG5cbiAgICAgICAgc2VsZi50YWJsZS5hdHRhY2hFdmVudChcIm9uSXRlbURibENsaWNrXCIsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHNlbGYudmlld0l0ZW0oc2VsZi50YWJsZS5nZXRTZWxlY3RlZElkKCkpO1xuICAgICAgICB9KTtcblxuICAgICAgICAkJChcImFsZXJ0c19jbVwiKS5hdHRhY2hFdmVudChcIm9uTWVudUl0ZW1DbGlja1wiLCBmdW5jdGlvbiAoaWQpIHtcbiAgICAgICAgICAgIGlmIChpZCA9PSBcIkRlbGV0ZVwiKSB7XG4gICAgICAgICAgICAgICAgc2VsZi5kZWxldGVJdGVtKHNlbGYudGFibGUuZ2V0U2VsZWN0ZWRJZCh0cnVlKSk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKGlkID09IFwiVmlld1wiKSB7XG4gICAgICAgICAgICAgICAgc2VsZi52aWV3SXRlbShzZWxmLnRhYmxlLmdldFNlbGVjdGVkSWQoKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NvdXJjZXMvdmlld3MvYWxlcnRzL2luZGV4LmpzIiwiZXhwb3J0IGNvbnN0IGRhdGVGb3JtYXQgPSBcIiVZLSVtLSVkICVHOiVpOiVzXCI7XG5cbmV4cG9ydCBjb25zdCB3ZWJpeERhdGVGb3JtYXR0ZXIgPSB3ZWJpeC5EYXRlLmRhdGVUb1N0cihkYXRlRm9ybWF0KTtcblxuZXhwb3J0IGNvbnN0IGRhdGVGb3JtYXR0ZXIgPSBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAvLyBmb3JtYXQgZXBvY2ggdGltZXN0YW1wc1xuICAgIGlmICh2YWx1ZSBpbnN0YW5jZW9mIFN0cmluZykge1xuICAgICAgICB2YWx1ZSA9IHBhcnNlSW50KHZhbHVlKTtcbiAgICB9XG5cbiAgICByZXR1cm4gd2ViaXhEYXRlRm9ybWF0dGVyKG5ldyBEYXRlKHZhbHVlICogMTAwMCkpO1xufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc291cmNlcy9jb21tb24vZm9ybWF0dGVycy5qcyIsImltcG9ydCB7IEpldFZpZXcgfSBmcm9tIFwid2ViaXgtamV0XCI7XG5pbXBvcnQgeyBoZWFsdGggfSBmcm9tIFwiLi4vLi4vc2VydmljZXMvaGVhbHRoXCI7XG5pbXBvcnQgeyBwYWNrYWdlcyB9IGZyb20gXCIuLi8uLi9zZXJ2aWNlcy9wYWNrYWdlc1wiO1xuXG5jb25zdCBDT0RFX1VSTCA9IFwiL2NvZGVzZXJ2ZXImZm9sZGVyPS9zYW5kYm94L2NvZGVcIjtcbmNvbnN0IFBBQ0tBR0VfUEFUSCA9IFwiL3NhbmRib3gvY29kZS9naXRodWIvdGhyZWVmb2xkdGVjaC9qdW1wc2NhbGVYX3RocmVlYm90L1RocmVlQm90UGFja2FnZXMvemVyb2JvdC9jb2Rlc2VydmVyXCJcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ29kZXNlcnZlclZpZXcgZXh0ZW5kcyBKZXRWaWV3IHtcbiAgICBjb25maWcoKSB7XG4gICAgICAgIGNvbnN0IGlmcmFtZSA9IHtcbiAgICAgICAgICAgIHZpZXc6IFwiaWZyYW1lXCIsXG4gICAgICAgICAgICBpZDogXCJpZnJhbWUtY29kZXNlcnZlclwiLFxuICAgICAgICAgICAgb246IHtcbiAgICAgICAgICAgICAgICBvbkFmdGVyTG9hZDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5oaWRlUHJvZ3Jlc3MpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuaGlkZVByb2dyZXNzKCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgdGhpcy5lbmFibGUoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG5cbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHR5cGU6IFwic3BhY2VcIixcbiAgICAgICAgICAgIHJvd3M6IFt7XG4gICAgICAgICAgICAgICAgaWQ6IFwiaW5zdGFsbC1wYWNrYWdlXCIsXG4gICAgICAgICAgICAgICAgY29sczogW1xuICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0ZW1wbGF0ZTogXCI8ZGl2IHN0eWxlPSd3aWR0aDphdXRvO3RleHQtYWxpZ246Y2VudGVyJz48aDM+WW91IG5lZWQgdG8gaW5zdGFsbCBDb2Rlc2VydmVyIHBhY2thZ2U8aDMvPjwvZGl2PlwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgaGVpZ2h0OiA1MCxcbiAgICAgICAgICAgICAgICAgICAgICAgIGlkOiBcImluZm8tbWVzc2FnZVwiXG4gICAgICAgICAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZpZXc6IFwiYnV0dG9uXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBpZDogXCJpbnN0YWxsX2J0blwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU6IFwiSW5zdGFsbCBQYWNrYWdlXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBjc3M6IFwid2ViaXhfcHJpbWFyeVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgaW5wdXRXaWR0aDogMTQwLFxuICAgICAgICAgICAgICAgICAgICAgICAgaGVpZ2h0OiA1MFxuICAgICAgICAgICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0ZW1wbGF0ZTogXCI8ZGl2IHN0eWxlPSd3aWR0aDphdXRvO3RleHQtYWxpZ246Y2VudGVyJz48aDM+Q29kZXNlcnZlcjxoMy8+PC9kaXY+XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBoZWlnaHQ6IDUwLFxuICAgICAgICAgICAgICAgICAgICAgICAgaWQ6IFwiY29kZXNlcnZlcl90aXRsZVwiLFxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgfSwgaWZyYW1lXVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgaW5zdGFsbENvZGVzZXJ2ZXJQYWNrYWdlKCkge1xuICAgICAgICBwYWNrYWdlcy5hZGQoUEFDS0FHRV9QQVRIKTtcbiAgICB9XG5cbiAgICBpbml0KHZpZXcpIHtcbiAgICAgICAgdmlldy5jb2Rlc2VydmVySWZyYW1lID0gJCQoXCJpZnJhbWUtY29kZXNlcnZlclwiKTtcbiAgICAgICAgdmlldy5pbnN0YWxsUGFja2FnZUNvbnRhaW5lciA9ICQkKFwiaW5zdGFsbC1wYWNrYWdlXCIpO1xuXG4gICAgICAgIHdlYml4LmV4dGVuZCh2aWV3LmNvZGVzZXJ2ZXJJZnJhbWUsIHdlYml4LlByb2dyZXNzQmFyKTtcblxuICAgICAgICB2aWV3LmNvZGVzZXJ2ZXJJZnJhbWUuZGlzYWJsZSgpO1xuICAgICAgICB2aWV3LmNvZGVzZXJ2ZXJJZnJhbWUuc2hvd1Byb2dyZXNzKHsgdHlwZTogXCJpY29uXCIgfSk7XG4gICAgICAgIHZpZXcuY29kZXNlcnZlcklmcmFtZS5sb2FkKENPREVfVVJMKTtcblxuICAgICAgICAkJChcImluc3RhbGxfYnRuXCIpLmF0dGFjaEV2ZW50KFwib25JdGVtQ2xpY2tcIiwgZnVuY3Rpb24gKGlkKSB7XG4gICAgICAgICAgICB2aWV3Lmluc3RhbGxDb2Rlc2VydmVyUGFja2FnZSgpO1xuICAgICAgICB9KTtcblxuICAgICAgICBoZWFsdGguZ2V0SGVhbHRoKCkudGhlbihkYXRhID0+IHtcbiAgICAgICAgICAgIGxldCBjb2RlU2VydmVyU3RhdHVzID0gZGF0YS5qc29uKCkuY29kZXNlcnZlclxuICAgICAgICAgICAgaWYgKGNvZGVTZXJ2ZXJTdGF0dXMgPT0gXCJPS1wiKSB7XG4gICAgICAgICAgICAgICAgdmlldy5jb2Rlc2VydmVySWZyYW1lLnNob3coKTtcbiAgICAgICAgICAgICAgICB2aWV3Lmluc3RhbGxQYWNrYWdlQ29udGFpbmVyLmhpZGUoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHZpZXcuY29kZXNlcnZlcklmcmFtZS5zaG93KCk7XG4gICAgICAgICAgICAgICAgdmlldy5pbnN0YWxsUGFja2FnZUNvbnRhaW5lci5oaWRlKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cblxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc291cmNlcy92aWV3cy9jb2Rlc2VydmVyL2luZGV4LmpzIiwiaW1wb3J0IHsgSmV0VmlldyB9IGZyb20gXCJ3ZWJpeC1qZXRcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVG9wVmlldyBleHRlbmRzIEpldFZpZXcge1xuXHRjb25maWcoKSB7XG5cdFx0cmV0dXJuIHtcblx0XHRcdHR5cGU6IFwic3BhY2VcIixcblx0XHRcdHJlc3BvbnNpdmU6IHRydWUsXG5cdFx0XHRyb3dzOiBbXG5cdFx0XHRcdHtcblx0XHRcdFx0XHRjb2xzOiBbe1xuXHRcdFx0XHRcdFx0JHN1YnZpZXc6IFwiZGFzaC5qc3hJbmZvXCJcblx0XHRcdFx0XHR9LFxuXHRcdFx0XHRcdHtcblx0XHRcdFx0XHRcdCRzdWJ2aWV3OiBcImRhc2guaGVhbHRoXCJcblx0XHRcdFx0XHR9LFxuXHRcdFx0XHRcdHtcblx0XHRcdFx0XHRcdCRzdWJ2aWV3OiBcImRhc2guZGlza1NwYWNlXCJcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XVxuXHRcdFx0XHR9LFxuXHRcdFx0XHR7XG5cdFx0XHRcdFx0Y29sczogW3tcblx0XHRcdFx0XHRcdCRzdWJ2aWV3OiBcImRhc2gucHJvY2Vzc2VzXCJcblx0XHRcdFx0XHR9LFxuXHRcdFx0XHRcdHsgJHN1YnZpZXc6IFwiZGFzaC5ydW5uaW5nUG9ydHNcIiB9XVxuXHRcdFx0XHR9LFxuXHRcdFx0XVxuXHRcdH07XG5cdH1cbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NvdXJjZXMvdmlld3MvZGFzaC9pbmRleC5qcyIsImltcG9ydCB7XG4gICAgSmV0Vmlld1xufSBmcm9tIFwid2ViaXgtamV0XCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEp1cHl0ZXJWaWV3IGV4dGVuZHMgSmV0VmlldyB7XG4gICAgY29uZmlnKCkge1xuICAgICAgICBjb25zdCB2aWV3ID0ge1xuICAgICAgICAgICAgcm93czogW3tcbiAgICAgICAgICAgICAgICB2aWV3OiBcInRlbXBsYXRlXCIsXG4gICAgICAgICAgICAgICAgdHlwZTogXCJoZWFkZXJcIixcbiAgICAgICAgICAgICAgICB0ZW1wbGF0ZTogXCJKdXB5dGVyXCIsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHZpZXc6IFwidGVtcGxhdGVcIixcbiAgICAgICAgICAgICAgICB0ZW1wbGF0ZTogXCIybmQgcm93XCIsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGNvbHM6IFt7XG4gICAgICAgICAgICAgICAgICAgIHZpZXc6IFwidGVtcGxhdGVcIixcbiAgICAgICAgICAgICAgICAgICAgdGVtcGxhdGU6IFwiMXN0IGNvbFwiLFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICB2aWV3OiBcInRlbXBsYXRlXCIsXG4gICAgICAgICAgICAgICAgICAgIHRlbXBsYXRlOiBcIjJuZCBjb2xcIixcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgcm93czogW3tcbiAgICAgICAgICAgICAgICAgICAgICAgIHZpZXc6IFwibGlzdFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgaWQ6IFwibXlsaXN0XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICB0ZW1wbGF0ZTogXCIjaWQjIC0gI3RpdGxlI1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgZGF0YTogW3tcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZDogMSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aXRsZTogXCJJdGVtIDFcIlxuICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZDogMixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aXRsZTogXCJJdGVtIDJcIlxuICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZDogMyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aXRsZTogXCJJdGVtIDNcIlxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICB2aWV3OiBcImJ1dHRvblwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU6IFwiYWRkXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBjbGljazogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuJHNjb3BlLmFkZFRvTGlzdCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgXVxuICAgICAgICB9O1xuXG4gICAgICAgIHJldHVybiB2aWV3O1xuICAgIH1cblxuICAgIGFkZFRvTGlzdCgpIHtcbiAgICAgICAgdGhpcy5teWxpc3QuYWRkKHtcbiAgICAgICAgICAgIGlkOiA1LFxuICAgICAgICAgICAgdGl0bGU6IFwiaGFtYWRhXCJcbiAgICAgICAgfSwgMCk7XG4gICAgfVxuXG4gICAgaW5pdCh2aWV3KSB7XG4gICAgICAgIHRoaXMubXlsaXN0ID0gJCQoXCJteWxpc3RcIik7XG4gICAgfVxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc291cmNlcy92aWV3cy9qdXB5dGVyL2luZGV4LmpzIiwiaW1wb3J0IHsgSmV0VmlldyB9IGZyb20gXCJ3ZWJpeC1qZXRcIjtcblxuaW1wb3J0IEFwcExvZ3NWaWV3IGZyb20gXCIuL2FwcExvZ3NcIjtcbmltcG9ydCB7IGxvZ3MgfSBmcm9tIFwiLi4vLi4vc2VydmljZXMvbG9nc1wiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBMb2dzVmlldyBleHRlbmRzIEpldFZpZXcge1xuICAgIGNvbmZpZygpIHtcblxuICAgICAgICBjb25zdCB2aWV3ID0ge1xuICAgICAgICAgICAgcm93czogW3tcbiAgICAgICAgICAgICAgICBjb2xzOiBbXG4gICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZpZXc6IFwidGVtcGxhdGVcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU6IFwiaGVhZGVyXCIsIHRlbXBsYXRlOiBcIkxvZ3NcIixcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmlldzogXCJjb21ib1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgaWQ6IFwibG9nc19hcHBzXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBwbGFjZWhvbGRlcjogXCJDaG9vc2UgeW91ciBhcHBsaWNhdGlvblwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgb246IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbkNoYW5nZTogZnVuY3Rpb24gKGFwcE5hbWUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy4kc2NvcGUuc2hvd0ZvcihhcHBOYW1lKVxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgQXBwTG9nc1ZpZXdcbiAgICAgICAgICAgIF1cbiAgICAgICAgfTtcblxuICAgICAgICByZXR1cm4gdmlldztcbiAgICB9XG5cbiAgICBpbml0KHZpZXcpIHtcblxuICAgICAgICBzZWxmLmFwcHNDb21vYiA9ICQkKFwiYXBwc19jb21ib1wiKTtcbiAgICB9XG5cbiAgICB1cmxDaGFuZ2UodmlldywgdXJsKSB7XG4gICAgICAgIGNvbnN0IGFwcE5hbWUgPSB1cmxbMF0ucGFyYW1zLmFwcG5hbWUsIGxvZ0lkID0gdXJsWzBdLnBhcmFtcy5sb2dpZDtcbiAgICAgICAgaWYgKGFwcE5hbWUpIHtcbiAgICAgICAgICAgIHRoaXMuc2hvd0ZvcihhcHBOYW1lLCBsb2dJZCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBzaG93Rm9yKGFwcE5hbWUsIGxvZ0lkKSB7XG4gICAgICAgIHZhciBzZWxmID0gdGhpcztcbiAgICAgICAgc2VsZi5hcHBMb2dzID0gJCQoXCJhcHBsb2dzX3RhYmxlXCIpO1xuXG4gICAgICAgIGxvZ3MubGlzdEFwcHMoKS50aGVuKGRhdGEgPT4ge1xuICAgICAgICAgICAgdGhpcy5hcHBzQ29tb2IuY29uZmlnLm9wdGlvbnMgPSBkYXRhO1xuICAgICAgICAgICAgdGhpcy5hcHBzQ29tb2IucmVmcmVzaCgpO1xuICAgICAgICB9KTtcblxuICAgICAgICB3ZWJpeC5leHRlbmQoc2VsZi5hcHBMb2dzLCB3ZWJpeC5Qcm9ncmVzc0Jhcik7XG4gICAgICAgIHNlbGYuYXBwTG9ncy5zaG93UHJvZ3Jlc3MoeyBoaWRlOiBmYWxzZSB9KTtcblxuICAgICAgICBsb2dzLmxpc3QoYXBwTmFtZSwgbG9nSWQpLnRoZW4oZGF0YSA9PiB7XG4gICAgICAgICAgICBzZWxmLmFwcExvZ3MuY2xlYXJBbGwoKVxuICAgICAgICAgICAgc2VsZi5hcHBMb2dzLnBhcnNlKGRhdGEuanNvbigpWzBdKVxuICAgICAgICAgICAgc2VsZi5hcHBMb2dzLnNob3dQcm9ncmVzcyh7IGhpZGU6IHRydWUgfSk7XG4gICAgICAgIH0pO1xuICAgIH1cbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NvdXJjZXMvdmlld3MvbG9ncy9pbmRleC5qcyIsImltcG9ydCB7IEpldFZpZXcgfSBmcm9tIFwid2ViaXgtamV0XCI7XG5cbmltcG9ydCB7IGRhdGVGb3JtYXR0ZXIgfSBmcm9tIFwiLi4vLi4vY29tbW9uL2Zvcm1hdHRlcnNcIjtcbmltcG9ydCB7IG15am9icyB9IGZyb20gXCIuLi8uLi9zZXJ2aWNlcy9teWpvYnNcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgSm9ic1ZpZXcgZXh0ZW5kcyBKZXRWaWV3IHtcbiAgICBjb25maWcoKSB7XG4gICAgICAgIGNvbnN0IHZpZXcgPSB7XG4gICAgICAgICAgICB2aWV3OiBcImRhdGF0YWJsZVwiLFxuICAgICAgICAgICAgaWQ6IFwiam9ic190YWJsZVwiLFxuICAgICAgICAgICAgcmVzaXplQ29sdW1uOiB0cnVlLFxuICAgICAgICAgICAgc2VsZWN0OiB0cnVlLFxuICAgICAgICAgICAgbXVsdGlzZWxlY3Q6IHRydWUsXG4gICAgICAgICAgICBjc3M6IFwid2ViaXhfaGVhZGVyX2JvcmRlciB3ZWJpeF9kYXRhX2JvcmRlclwiLFxuICAgICAgICAgICAgY29sdW1uczogW3tcbiAgICAgICAgICAgICAgICBpZDogXCJpbmRleFwiLFxuICAgICAgICAgICAgICAgIGhlYWRlcjogXCIjXCIsXG4gICAgICAgICAgICAgICAgc29ydDogXCJpbnRcIixcbiAgICAgICAgICAgICAgICBhdXRvd2lkdGg6IHRydWUsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGlkOiBcImNhdGVnb3J5XCIsXG4gICAgICAgICAgICAgICAgaGVhZGVyOiBcIkNhdGVnb3J5XCIsXG4gICAgICAgICAgICAgICAgc29ydDogXCJzdHJpbmdcIlxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBpZDogXCJ0aW1lX3N0YXJ0XCIsXG4gICAgICAgICAgICAgICAgaGVhZGVyOiBcIlN0YXJ0IHRpbWVcIixcbiAgICAgICAgICAgICAgICBzb3J0OiBcImRhdGVcIixcbiAgICAgICAgICAgICAgICBmb3JtYXQ6IGRhdGVGb3JtYXR0ZXIsXG4gICAgICAgICAgICAgICAgd2lkdGg6IDIwMFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBpZDogXCJ0aW1lX3N0b3BcIixcbiAgICAgICAgICAgICAgICBoZWFkZXI6IFwiU3RvcCB0aW1lXCIsXG4gICAgICAgICAgICAgICAgc29ydDogXCJkYXRlXCIsXG4gICAgICAgICAgICAgICAgZm9ybWF0OiBkYXRlRm9ybWF0dGVyLFxuICAgICAgICAgICAgICAgIHdpZHRoOiAyMDBcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgaWQ6IFwidGltZW91dFwiLFxuICAgICAgICAgICAgICAgIGhlYWRlcjogXCJUaW1lb3V0XCIsXG4gICAgICAgICAgICAgICAgc29ydDogXCJpbnRcIlxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBpZDogXCJhY3Rpb25faWRcIixcbiAgICAgICAgICAgICAgICBoZWFkZXI6IFwiQWN0aW9uXCIsXG4gICAgICAgICAgICAgICAgc29ydDogXCJzdHJpbmdcIlxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBpZDogXCJrd2FyZ3NcIixcbiAgICAgICAgICAgICAgICBoZWFkZXI6IFwiQXJndW1lbnRzXCIsXG4gICAgICAgICAgICAgICAgc29ydDogXCJzdHJpbmdcIixcbiAgICAgICAgICAgICAgICBmb3JtYXQ6IEpTT04uc3RyaW5naWZ5XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGlkOiBcInJlc3VsdFwiLFxuICAgICAgICAgICAgICAgIGhlYWRlcjogW1xuICAgICAgICAgICAgICAgICAgICBcIlJlc3VsdFwiLFxuICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb250ZW50OiBcInRleHRGaWx0ZXJcIlxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICBzb3J0OiBcInN0cmluZ1wiLFxuICAgICAgICAgICAgICAgIGZvcm1hdDogSlNPTi5zdHJpbmdpZnksXG4gICAgICAgICAgICB9XSxcbiAgICAgICAgICAgIHNjaGVtZToge1xuICAgICAgICAgICAgICAgICRpbml0OiBmdW5jdGlvbiAob2JqKSB7XG4gICAgICAgICAgICAgICAgICAgIG9iai5pbmRleCA9IHRoaXMuY291bnQoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICB9O1xuXG4gICAgICAgIHJldHVybiB2aWV3O1xuICAgIH1cblxuICAgIGluaXQodmlldykge1xuICAgICAgICBteWpvYnMubGlzdEpvYnMoKS50aGVuKGRhdGEgPT4ge1xuICAgICAgICAgICAgdmlldy5wYXJzZShkYXRhKTtcbiAgICAgICAgfSk7XG4gICAgfVxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc291cmNlcy92aWV3cy9teWpvYnMvaW5kZXguanMiLCJpbXBvcnQgeyBKZXRWaWV3IH0gZnJvbSBcIndlYml4LWpldFwiO1xuaW1wb3J0IHsgcGFja2FnZXMgfSBmcm9tIFwiLi4vLi4vc2VydmljZXMvcGFja2FnZXNcIjtcblxuY29uc3QgcGtnU3RhdHVzID0gW1xuICAgIHtcbiAgICAgICAgbmFtZTogXCJJbml0XCIsXG4gICAgICAgIGFjdGlvbnM6IFtcImRlbGV0ZVwiXVxuICAgIH0sXG4gICAge1xuICAgICAgICBuYW1lOiBcIkluc3RhbGxlZFwiLFxuICAgICAgICBhY3Rpb25zOiBbJ2RlbGV0ZScsIFwic3RhcnRcIl1cbiAgICB9LFxuICAgIHtcbiAgICAgICAgbmFtZTogXCJSdW5uaW5nXCIsXG4gICAgICAgIGFjdGlvbnM6IFsnZGVsZXRlJywgXCJzdG9wXCJdXG4gICAgfSxcbiAgICB7XG4gICAgICAgIG5hbWU6IFwiSGFsdGVkXCIsXG4gICAgICAgIGFjdGlvbnM6IFsnZGVsZXRlJywgXCJzdGFydFwiLCBcImRpc2FibGVcIl1cbiAgICB9LFxuICAgIHtcbiAgICAgICAgbmFtZTogXCJEaXNhYmxlZFwiLFxuICAgICAgICBhY3Rpb25zOiBbJ2RlbGV0ZScsIFwiZW5hYmxlXCJdXG4gICAgfSxcbiAgICB7XG4gICAgICAgIG5hbWU6IFwiRXJyb3JcIixcbiAgICAgICAgYWN0aW9uczogW1wiZGVsZXRlXCJdXG4gICAgfVxuXVxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBQYWNrYWdlc1ZpZXcgZXh0ZW5kcyBKZXRWaWV3IHtcbiAgICBjb25maWcoKSB7XG4gICAgICAgIGNvbnN0IGdyaWQgPSB7XG4gICAgICAgICAgICByb3dzOiBbe1xuICAgICAgICAgICAgICAgIC8vSGVhZGVyXG4gICAgICAgICAgICAgICAgdmlldzogXCJ0ZW1wbGF0ZVwiLFxuICAgICAgICAgICAgICAgIHR5cGU6IFwiaGVhZGVyXCIsXG4gICAgICAgICAgICAgICAgdGVtcGxhdGU6IFwiUGFja2FnZXNcIixcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7IC8vYWRkaW5nIFBhY2thZ2VcbiAgICAgICAgICAgICAgICBjb2xzOiBbe1xuICAgICAgICAgICAgICAgICAgICAvL3NlbGVjdG9yXG4gICAgICAgICAgICAgICAgICAgIHZpZXc6IFwic2VsZWN0XCIsXG4gICAgICAgICAgICAgICAgICAgIGlkOiAnbWV0aG9kX3NlbGVjdG9yJyxcbiAgICAgICAgICAgICAgICAgICAgb3B0aW9uczogW1wiUGF0aFwiLCBcIkdpdHVybFwiXSxcbiAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDEwMFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgLy90ZXh0IGFyZWFcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIHZpZXc6IFwidGV4dFwiLFxuICAgICAgICAgICAgICAgICAgICBpZDogJ3BhY2thZ2VfcGF0aCcsXG4gICAgICAgICAgICAgICAgICAgIGlucHV0QWxpZ246IFwibGVmdFwiLFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgLy9zdWJtaXQgYnV0dG9uXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICB2aWV3OiBcImJ1dHRvblwiLFxuICAgICAgICAgICAgICAgICAgICBpZDogXCJhZGRfcGFja2FnZV9idXR0b25cIixcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU6IFwiQWRkIHBhY2thZ2VcIixcbiAgICAgICAgICAgICAgICAgICAgYXV0b3dpZHRoOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICB0eXBlOiBcIlwiLFxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgeyAvL0RhdGFUYWJsZVxuICAgICAgICAgICAgICAgIHZpZXc6IFwiZGF0YXRhYmxlXCIsXG4gICAgICAgICAgICAgICAgaWQ6IFwicGFja2FnZXNfdGFibGVcIixcbiAgICAgICAgICAgICAgICByZXNpemVDb2x1bW46IHRydWUsXG4gICAgICAgICAgICAgICAgdHlwZToge1xuICAgICAgICAgICAgICAgICAgICBoZWlnaHQ6IDIwMCxcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHNjcm9sbDogdHJ1ZSxcbiAgICAgICAgICAgICAgICBhdXRvQ29uZmlnOiB0cnVlLFxuICAgICAgICAgICAgICAgIHZpZXc6IFwiZGF0YXRhYmxlXCIsXG4gICAgICAgICAgICAgICAgc2VsZWN0OiB0cnVlLFxuICAgICAgICAgICAgICAgIGNzczogXCJ3ZWJpeF9oZWFkZXJfYm9yZGVyIHdlYml4X2RhdGFfYm9yZGVyXCIsXG4gICAgICAgICAgICAgICAgb25Db250ZXh0OiB7fSxcbiAgICAgICAgICAgICAgICBjb2x1bW5zOiBbe1xuICAgICAgICAgICAgICAgICAgICBpZDogXCJpbmRleFwiLFxuICAgICAgICAgICAgICAgICAgICBoZWFkZXI6IFwiI1wiLFxuICAgICAgICAgICAgICAgICAgICBzb3J0OiBcImludFwiLFxuICAgICAgICAgICAgICAgICAgICBhdXRvd2lkdGg6IHRydWUsXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIGlkOiBcImF1dGhvclwiLFxuICAgICAgICAgICAgICAgICAgICBoZWFkZXI6IFtcIkF1dGhvclwiLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb250ZW50OiBcInRleHRGaWx0ZXJcIlxuICAgICAgICAgICAgICAgICAgICB9XSxcbiAgICAgICAgICAgICAgICAgICAgc29ydDogXCJzdHJpbmdcIixcbiAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDIwMFxuICAgICAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICAgICAgaWQ6IFwibmFtZVwiLFxuICAgICAgICAgICAgICAgICAgICBoZWFkZXI6IFtcIk5hbWVcIiwge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29udGVudDogXCJ0ZXh0RmlsdGVyXCJcbiAgICAgICAgICAgICAgICAgICAgfV0sXG4gICAgICAgICAgICAgICAgICAgIHNvcnQ6IFwic3RyaW5nXCIsXG4gICAgICAgICAgICAgICAgICAgIHdpZHRoOiAyMDBcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgaWQ6IFwic3RhdHVzXCIsXG4gICAgICAgICAgICAgICAgICAgIGhlYWRlcjogXCJTdGF0dXNcIixcbiAgICAgICAgICAgICAgICAgICAgc29ydDogXCJzdHJpbmdcIlxuICAgICAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICAgICAgaWQ6IFwicGF0aFwiLFxuICAgICAgICAgICAgICAgICAgICBoZWFkZXI6IFwiUGF0aFwiLFxuICAgICAgICAgICAgICAgICAgICBzb3J0OiBcInN0cmluZ1wiLFxuICAgICAgICAgICAgICAgICAgICB3aWR0aDogNzAwXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgc2NoZW1lOiB7XG4gICAgICAgICAgICAgICAgICAgICRpbml0OiBmdW5jdGlvbiAob2JqKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBvYmouaW5kZXggPSB0aGlzLmNvdW50KCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBdXG4gICAgICAgIH07XG4gICAgICAgIHJldHVybiBncmlkO1xuICAgIH1cblxuICAgIGhhbmRsZVJlc3VsdChwcm9taXNlLCBjYWxsYmFjaykge1xuICAgICAgICBwcm9taXNlLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgY2FsbGJhY2soKTtcbiAgICAgICAgICAgIHdlYml4Lm1lc3NhZ2Uoe1xuICAgICAgICAgICAgICAgIHR5cGU6IFwic3VjY2Vzc1wiLFxuICAgICAgICAgICAgICAgIHRleHQ6IFwiVGhlIG9wZXJhdGlvbiBoYXMgYmVlZCBkb25lIHN1Y2Nlc3NmdWxseVwiXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSkuY2F0Y2goZXJyb3IgPT4ge1xuICAgICAgICAgICAgd2ViaXgubWVzc2FnZSh7XG4gICAgICAgICAgICAgICAgdHlwZTogXCJlcnJvclwiLFxuICAgICAgICAgICAgICAgIHRleHQ6IFwiZXJyb3IgaGFzIGhhcHBlbmVkIFwiICsgZXJyb3IucmVzcG9uc2VcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KVxuICAgIH1cblxuICAgIGFkZFBhY2thZ2UocGF0aCwgZ2l0VXJsKSB7XG4gICAgICAgIHRoaXMuaGFuZGxlUmVzdWx0KHBhY2thZ2VzLmFkZChwYXRoLCBnaXRVcmwpKTtcbiAgICB9XG5cblxuICAgIGRlbGV0ZVBhY2thZ2UocGFja2FnZU5hbWUsIGVsZW1lbnRJRCkge1xuICAgICAgICB0aGlzLmhhbmRsZVJlc3VsdChwYWNrYWdlcy5kZWxldGUocGFja2FnZU5hbWUpLCAoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLnBhY2thZ2VUYWJsZS5yZW1vdmUoZWxlbWVudElEKVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBzdGFydFBhY2thZ2UocGFja2FnZU5hbWUpIHtcbiAgICAgICAgdGhpcy5oYW5kbGVSZXN1bHQocGFja2FnZXMuc3RhcnQocGFja2FnZU5hbWUpKTtcbiAgICB9XG5cbiAgICBzdG9wUGFja2FnZShwYWNrYWdlTmFtZSkge1xuICAgICAgICB0aGlzLmhhbmRsZVJlc3VsdChwYWNrYWdlcy5zdG9wKHBhY2thZ2VOYW1lKSk7XG5cbiAgICB9XG5cbiAgICBlbmFibGVQYWNrYWdlKHBhY2thZ2VOYW1lKSB7XG4gICAgICAgIHRoaXMuaGFuZGxlUmVzdWx0KHBhY2thZ2VzLmVuYWJsZVBhY2thZ2UocGFja2FnZU5hbWUpKTtcbiAgICB9XG5cbiAgICBkaXNhYmxlUGFja2FnZShwYWNrYWdlTmFtZSkge1xuICAgICAgICB0aGlzLmhhbmRsZVJlc3VsdChwYWNrYWdlcy5kaXNhYmxlKHBhY2thZ2VOYW1lKSk7XG5cbiAgICB9XG5cbiAgICBpbml0KHZpZXcpIHtcbiAgICAgICAgY29uc3Qgc2VsZiA9IHRoaXM7XG4gICAgICAgIGNvbnN0IG1lbnUgPSB3ZWJpeC51aSh7XG4gICAgICAgICAgICB2aWV3OiBcImNvbnRleHRtZW51XCIsXG4gICAgICAgICAgICBpZDogXCJwYWNrYWdlc19jbVwiXG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLnBhY2thZ2VUYWJsZSA9IHRoaXMuJCQoXCJwYWNrYWdlc190YWJsZVwiKTtcblxuXG4gICAgICAgIGZ1bmN0aW9uIGNoZWNrQWN0aW9uKGFjdGlvbiwgc2VsZWN0ZWRJdGVtSWQpIHtcbiAgICAgICAgICAgIGlmIChzZWxmLnBhY2thZ2VUYWJsZS5nZXRJdGVtKHNlbGVjdGVkSXRlbUlkKSkge1xuICAgICAgICAgICAgICAgIGxldCBuYW1lID0gc2VsZi5wYWNrYWdlVGFibGUuZ2V0SXRlbShzZWxlY3RlZEl0ZW1JZCkubmFtZVxuICAgICAgICAgICAgICAgIGxldCBhdXRob3IgPSBzZWxmLnBhY2thZ2VUYWJsZS5nZXRJdGVtKHNlbGVjdGVkSXRlbUlkKS5hdXRob3JcbiAgICAgICAgICAgICAgICBsZXQgZWxlbWVudElEID0gc2VsZi5wYWNrYWdlVGFibGUuZ2V0SXRlbShzZWxlY3RlZEl0ZW1JZCkuaWRcbiAgICAgICAgICAgICAgICBsZXQgcGFja2FnZU5hbWUgPSBhdXRob3IgKyBcIi5cIiArIG5hbWVcbiAgICAgICAgICAgICAgICBpZiAoYWN0aW9uID09ICdkZWxldGUnKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vZGVsZXRlUGFja2FnZShwYWNrYWdlTmFtZSlcbiAgICAgICAgICAgICAgICAgICAgLy8gc2VsZi5wYWNrYWdlVGFibGUucmVtb3ZlKGVsZW1lbnRJRClcbiAgICAgICAgICAgICAgICAgICAgLy9cbiAgICAgICAgICAgICAgICAgICAgd2ViaXguY29uZmlybSh7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aXRsZTogXCJEZWxldGUgUGFja2FnZVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgb2s6IFwiWWVzXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICB0ZXh0OiBgQXJlIHlvdSBzdXJlIHlvdSB3YW50IHRvIGRlbGV0ZSAke2F1dGhvcn0uJHtuYW1lfT9gLFxuICAgICAgICAgICAgICAgICAgICAgICAgY2FuY2VsOiBcIk5vXCIsXG4gICAgICAgICAgICAgICAgICAgIH0pLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgZGVsZXRlUGFja2FnZShwYWNrYWdlTmFtZSwgZWxlbWVudElEKVxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgLy9cbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGFjdGlvbiA9PSAnc3RhcnQnKSB7XG4gICAgICAgICAgICAgICAgICAgIHNlbGYuc3RhcnRQYWNrYWdlKHBhY2thZ2VOYW1lKVxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoYWN0aW9uID09ICdzdG9wJykge1xuICAgICAgICAgICAgICAgICAgICBzZWxmLnN0b3BQYWNrYWdlKHBhY2thZ2VOYW1lKVxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoYWN0aW9uID09ICdkaXNhYmxlJykge1xuICAgICAgICAgICAgICAgICAgICBzZWxmLmRpc2FibGVQYWNrYWdlKHBhY2thZ2VOYW1lKVxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoYWN0aW9uID09ICdlbmFibGUnKSB7XG4gICAgICAgICAgICAgICAgICAgIHNlbGYuZW5hYmxlUGFja2FnZShwYWNrYWdlTmFtZSlcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHdlYml4Lm1lc3NhZ2UoXCJ5b3UgaGF2ZSB0byBzZWxlY3QgYSBwYWNrYWdlXCIpXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICAkJChcImFkZF9wYWNrYWdlX2J1dHRvblwiKS5hdHRhY2hFdmVudChcIm9uSXRlbUNsaWNrXCIsIGZ1bmN0aW9uIChpZCkge1xuICAgICAgICAgICAgbGV0IHBhY2FrZ2VMb2NhdGlvbiA9ICQkKFwicGFja2FnZV9wYXRoXCIpLmdldFZhbHVlKClcbiAgICAgICAgICAgIGlmIChwYWNha2dlTG9jYXRpb24gPT0gXCJcIikge1xuICAgICAgICAgICAgICAgIGFsZXJ0KFwicGxlYXNlIGVudGVyIHBhY2thZ2UgbG9jYXRpb25cIilcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgbGV0IHBhY2thZ2VNZXRob2QgPSAkJChcIm1ldGhvZF9zZWxlY3RvclwiKS5nZXRWYWx1ZSgpXG4gICAgICAgICAgICAgICAgbGV0IGdpdFVybCA9IG51bGw7XG4gICAgICAgICAgICAgICAgbGV0IHBhdGggPSBudWxsO1xuICAgICAgICAgICAgICAgIGlmIChwYWNrYWdlTWV0aG9kID09IFwiR2l0dXJsXCIpIHtcbiAgICAgICAgICAgICAgICAgICAgZ2l0VXJsID0gcGFjYWtnZUxvY2F0aW9uXG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChwYWNrYWdlTWV0aG9kID09IFwiUGF0aFwiKSB7XG4gICAgICAgICAgICAgICAgICAgIHBhdGggPSBwYWNha2dlTG9jYXRpb25cbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBhbGVydChcInNvbWV0aGluZyB3ZW50IHdyb25nIGR1cmluZyBzZWxlY3RpbmcgdGhlIHBhY2thZ2UgbWV0aG9kXCIpXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHNlbGYuYWRkUGFja2FnZShwYXRoLCBnaXRVcmwpXG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgICQkKFwicGFja2FnZXNfY21cIikuYXR0YWNoRXZlbnQoXCJvbk1lbnVJdGVtQ2xpY2tcIiwgZnVuY3Rpb24gKGlkKSB7XG4gICAgICAgICAgICBjaGVja0FjdGlvbihpZCwgc2VsZi5wYWNrYWdlVGFibGUuZ2V0U2VsZWN0ZWRJZCgpKTtcbiAgICAgICAgfSk7XG5cblxuICAgICAgICB3ZWJpeC5ldmVudChzZWxmLnBhY2thZ2VUYWJsZS4kdmlldywgXCJjb250ZXh0bWVudVwiLCBmdW5jdGlvbiAoZSAvKk1vdXNlRXZlbnQqLykge1xuICAgICAgICAgICAgdmFyIHBvcyA9IHNlbGYucGFja2FnZVRhYmxlLmxvY2F0ZShlKTtcbiAgICAgICAgICAgIHZhciBtZW51ZGF0YSA9IFtdO1xuICAgICAgICAgICAgaWYgKHBvcykge1xuICAgICAgICAgICAgICAgIHZhciBpdGVtID0gc2VsZi5wYWNrYWdlVGFibGUuZ2V0SXRlbShwb3Mucm93KTtcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHBrZ1N0YXR1cy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgICAgICBpZiAocGtnU3RhdHVzW2ldLm5hbWUgPT0gaXRlbS5zdGF0dXMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG1lbnVkYXRhID0gYWRkQWN0aW9ucyhtZW51ZGF0YSwgaSlcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgbWVudS5jbGVhckFsbCgpO1xuICAgICAgICAgICAgbWVudS5wYXJzZShtZW51ZGF0YSk7XG4gICAgICAgICAgICBtZW51LnNob3coZSk7XG4gICAgICAgICAgICByZXR1cm4gd2ViaXguaHRtbC5wcmV2ZW50RXZlbnQoZSk7XG4gICAgICAgIH0pXG5cbiAgICAgICAgLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cblxuXG4gICAgICAgIC8vIEhlbHBlciBmdW5jdGlvbnNcblxuICAgICAgICAvLyBNYXBwaW5nIHRoZSBkYXRhIHRvIHRoZSByaWdodCBmb3JtYXQgdG8gYmUgYWJsZSB0byBkaXBsYXkgdGhlIGFjdHVhbCBzdGF0dXNcbiAgICAgICAgZnVuY3Rpb24gbWFwRGF0YShhbGxpdGVtcykge1xuICAgICAgICAgICAgcmV0dXJuIGFsbGl0ZW1zLm1hcChpdGVtID0+IHtcbiAgICAgICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgICAgICBcIm5hbWVcIjogaXRlbS5zb3VyY2UubmFtZSxcbiAgICAgICAgICAgICAgICAgICAgXCJhdXRob3JcIjogaXRlbS5zb3VyY2UudGhyZWVib3QsXG4gICAgICAgICAgICAgICAgICAgIFwicGF0aFwiOiBpdGVtLnBhdGgsXG4gICAgICAgICAgICAgICAgICAgIFwic3RhdHVzXCI6IHBrZ1N0YXR1c1tpdGVtLnN0YXR1c10ubmFtZVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgZnVuY3Rpb24gYWRkQWN0aW9ucyhtZW51ZGF0YSwgcGtnSW5kZXgpIHtcbiAgICAgICAgICAgIGZvciAodmFyIGogPSAwOyBqIDwgcGtnU3RhdHVzW3BrZ0luZGV4XS5hY3Rpb25zLmxlbmd0aDsgaisrKVxuICAgICAgICAgICAgICAgIG1lbnVkYXRhLnB1c2gocGtnU3RhdHVzW3BrZ0luZGV4XS5hY3Rpb25zW2pdKTtcbiAgICAgICAgICAgIHJldHVybiBtZW51ZGF0YVxuXG4gICAgICAgIH1cblxuICAgICAgICBwYWNrYWdlcy5saXN0KCkudGhlbihkYXRhID0+IHtcbiAgICAgICAgICAgIHNlbGYucGFja2FnZVRhYmxlLnBhcnNlKG1hcERhdGEoZGF0YS5qc29uKCkpKTtcbiAgICAgICAgfSk7XG5cblxuICAgIH1cbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NvdXJjZXMvdmlld3MvcGFja2FnZXMvaW5kZXguanMiLCJpbXBvcnQgeyBKZXRWaWV3IH0gZnJvbSBcIndlYml4LWpldFwiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBXaWtpc1ZpZXcgZXh0ZW5kcyBKZXRWaWV3IHtcbiAgICBjb25maWcoKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICB2aWV3OiBcImlmcmFtZVwiLFxuICAgICAgICAgICAgaWQ6IFwiaWZyYW1lLXdpa2lzXCIsXG4gICAgICAgICAgICBzcmM6IFwiL3dpa2lcIlxuICAgICAgICB9O1xuICAgIH1cbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NvdXJjZXMvdmlld3Mvd2lraXMvaW5kZXguanMiLCJpbXBvcnQgeyBKZXRWaWV3IH0gZnJvbSBcIndlYml4LWpldFwiO1xuXG5pbXBvcnQgeyBkYXRlRm9ybWF0dGVyIH0gZnJvbSBcIi4uLy4uL2NvbW1vbi9mb3JtYXR0ZXJzXCI7XG5pbXBvcnQgeyBteWpvYnMgfSBmcm9tIFwiLi4vLi4vc2VydmljZXMvbXlqb2JzXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEpvYnNWaWV3IGV4dGVuZHMgSmV0VmlldyB7XG4gICAgY29uZmlnKCkge1xuICAgICAgICBjb25zdCB2aWV3ID0ge1xuICAgICAgICAgICAgdmlldzogXCJkYXRhdGFibGVcIixcbiAgICAgICAgICAgIGlkOiBcIndvcmtlcnNfdGFibGVcIixcbiAgICAgICAgICAgIHJlc2l6ZUNvbHVtbjogdHJ1ZSxcbiAgICAgICAgICAgIHNlbGVjdDogdHJ1ZSxcbiAgICAgICAgICAgIG11bHRpc2VsZWN0OiB0cnVlLFxuICAgICAgICAgICAgY3NzOiBcIndlYml4X2hlYWRlcl9ib3JkZXIgd2ViaXhfZGF0YV9ib3JkZXJcIixcbiAgICAgICAgICAgIGNvbHVtbnM6IFt7XG4gICAgICAgICAgICAgICAgaWQ6IFwiaW5kZXhcIixcbiAgICAgICAgICAgICAgICBoZWFkZXI6IFwiI1wiLFxuICAgICAgICAgICAgICAgIHNvcnQ6IFwiaW50XCIsXG4gICAgICAgICAgICAgICAgYXV0b3dpZHRoOiB0cnVlLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBpZDogXCJzdGF0ZVwiLFxuICAgICAgICAgICAgICAgIGhlYWRlcjogXCJTdGF0ZVwiLFxuICAgICAgICAgICAgICAgIHNvcnQ6IFwic3RyaW5nXCJcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgaWQ6IFwiaGFsdFwiLFxuICAgICAgICAgICAgICAgIGhlYWRlcjogXCJIYWx0ZWRcIixcbiAgICAgICAgICAgICAgICBzb3J0OiBcInN0cmluZ1wiLFxuICAgICAgICAgICAgICAgIGZvcm1hdDogZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB2YWx1ZSA/ICdZZXMnIDogJ05vJztcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBpZDogXCJwaWRcIixcbiAgICAgICAgICAgICAgICBoZWFkZXI6IFwiUElEXCIsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGlkOiBcImN1cnJlbnRfam9iXCIsXG4gICAgICAgICAgICAgICAgaGVhZGVyOiBcIkN1cnJlbnQgam9iXCIsXG4gICAgICAgICAgICAgICAgZm9ybWF0OiBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHZhbHVlID09IDIxNDc0ODM2NDcgPyAnTi9BJyA6IHZhbHVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgaWQ6IFwibGFzdF91cGRhdGVcIixcbiAgICAgICAgICAgICAgICBoZWFkZXI6IFwiTGFzdCB1cGRhdGVcIixcbiAgICAgICAgICAgICAgICBzb3J0OiBcImRhdGVcIixcbiAgICAgICAgICAgICAgICBmb3JtYXQ6IGRhdGVGb3JtYXR0ZXIsXG4gICAgICAgICAgICAgICAgd2lkdGg6IDIwMFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBpZDogXCJ0aW1lX3N0YXJ0XCIsXG4gICAgICAgICAgICAgICAgaGVhZGVyOiBcIlN0YXJ0IHRpbWVcIixcbiAgICAgICAgICAgICAgICBzb3J0OiBcImRhdGVcIixcbiAgICAgICAgICAgICAgICBmb3JtYXQ6IGRhdGVGb3JtYXR0ZXIsXG4gICAgICAgICAgICAgICAgd2lkdGg6IDIwMFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBpZDogXCJ0aW1lb3V0XCIsXG4gICAgICAgICAgICAgICAgaGVhZGVyOiBcIlRpbWVvdXRcIixcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgaWQ6IFwidHlwZVwiLFxuICAgICAgICAgICAgICAgIGhlYWRlcjogXCJUeXBlXCIsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGlkOiBcImVycm9yXCIsXG4gICAgICAgICAgICAgICAgaGVhZGVyOiBcIkVycm9yXCIsXG4gICAgICAgICAgICB9XSxcbiAgICAgICAgICAgIGF1dG9Db25maWc6IHRydWUsXG4gICAgICAgICAgICBzY2hlbWU6IHtcbiAgICAgICAgICAgICAgICAkaW5pdDogZnVuY3Rpb24gKG9iaikge1xuICAgICAgICAgICAgICAgICAgICBvYmouaW5kZXggPSB0aGlzLmNvdW50KCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgfTtcblxuICAgICAgICByZXR1cm4gdmlldztcbiAgICB9XG5cbiAgICBpbml0KHZpZXcpIHtcbiAgICAgICAgbXlqb2JzLmxpc3RXb3JrZXJzKCkudGhlbihkYXRhID0+IHtcbiAgICAgICAgICAgIHZpZXcucGFyc2UoZGF0YSk7XG4gICAgICAgIH0pO1xuXG4gICAgfVxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc291cmNlcy92aWV3cy93b3JrZXJzL2luZGV4LmpzIiwiaW1wb3J0IHsgSmV0VmlldyB9IGZyb20gXCJ3ZWJpeC1qZXRcIjtcblxuaW1wb3J0IHsgYW5zaVVwIH0gZnJvbSBcIi4uLy4uL2NvbW1vbi9jb2xvcnNcIjtcblxuY29uc3QgTUFYX01TR19MRU4gPSAxMDA7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEFsZXJ0VmlldyBleHRlbmRzIEpldFZpZXcge1xuICAgIGNvbmZpZygpIHtcbiAgICAgICAgY29uc3QgaW5mbyA9IHtcbiAgICAgICAgICAgIHZpZXc6IFwiZm9ybVwiLFxuICAgICAgICAgICAgaWQ6IFwiZm9ybVwiLFxuICAgICAgICAgICAgZWxlbWVudHNDb25maWc6IHsgbGFiZWxXaWR0aDogMTQwIH0sXG4gICAgICAgICAgICBlbGVtZW50czogW1xuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgdmlldzogXCJ0ZXh0XCIsXG4gICAgICAgICAgICAgICAgICAgIGxhYmVsOiBcIklEXCIsXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiaWRlbnRpZmllclwiLFxuICAgICAgICAgICAgICAgICAgICByZWFkb25seTogdHJ1ZVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICB2aWV3OiBcInRleHRcIixcbiAgICAgICAgICAgICAgICAgICAgbGFiZWw6IFwiVHlwZVwiLFxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImFsZXJ0X3R5cGVcIixcbiAgICAgICAgICAgICAgICAgICAgcmVhZG9ubHk6IHRydWVcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgdmlldzogXCJ0ZXh0XCIsXG4gICAgICAgICAgICAgICAgICAgIGxhYmVsOiBcIlN0YXR1c1wiLFxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcInN0YXR1c1wiLFxuICAgICAgICAgICAgICAgICAgICByZWFkb25seTogdHJ1ZVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICB2aWV3OiBcInRleHRcIixcbiAgICAgICAgICAgICAgICAgICAgbGFiZWw6IFwiTGV2ZWxcIixcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJsZXZlbFwiLFxuICAgICAgICAgICAgICAgICAgICByZWFkb25seTogdHJ1ZVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICB2aWV3OiBcInRleHRcIixcbiAgICAgICAgICAgICAgICAgICAgbGFiZWw6IFwiQ291bnRcIixcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJjb3VudFwiLFxuICAgICAgICAgICAgICAgICAgICByZWFkb25seTogdHJ1ZVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICB2aWV3OiBcInRleHRcIixcbiAgICAgICAgICAgICAgICAgICAgbGFiZWw6IFwiQ2F0ZWdvcnlcIixcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJjYXRcIixcbiAgICAgICAgICAgICAgICAgICAgcmVhZG9ubHk6IHRydWVcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgdmlldzogXCJ0ZXh0XCIsXG4gICAgICAgICAgICAgICAgICAgIGxhYmVsOiBcIkZpcnN0IHRpbWVcIixcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJ0aW1lX2ZpcnN0XCIsXG4gICAgICAgICAgICAgICAgICAgIHJlYWRvbmx5OiB0cnVlXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIHZpZXc6IFwidGV4dFwiLFxuICAgICAgICAgICAgICAgICAgICBsYWJlbDogXCJMYXN0IHRpbWVcIixcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJ0aW1lX2xhc3RcIixcbiAgICAgICAgICAgICAgICAgICAgcmVhZG9ubHk6IHRydWVcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgdmlldzogXCJ0ZXh0XCIsXG4gICAgICAgICAgICAgICAgICAgIGxhYmVsOiBcIk1lc3NhZ2UgKHB1YilcIixcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJwdWJsaWNcIixcbiAgICAgICAgICAgICAgICAgICAgcmVhZG9ubHk6IHRydWUsXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIF1cbiAgICAgICAgfTtcblxuICAgICAgICBjb25zdCB0YWIgPSB7XG4gICAgICAgICAgICB2aWV3OiBcInRhYnZpZXdcIixcbiAgICAgICAgICAgIGNlbGxzOiBbXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBoZWFkZXI6IFwiSW5mb3JtYXRpb25cIixcbiAgICAgICAgICAgICAgICAgICAgYm9keTogaW5mbyxcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgaGVhZGVyOiBcIk1lc3NhZ2VcIixcbiAgICAgICAgICAgICAgICAgICAgYm9keToge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWQ6IFwibWVzc2FnZVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgdmlldzogXCJ0ZW1wbGF0ZVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgdGVtcGxhdGU6IFwiXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBzY3JvbGw6IFwiYXV0b1wiLFxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIGhlYWRlcjogXCJUcmFjZWJhY2tzXCIsXG4gICAgICAgICAgICAgICAgICAgIGJvZHk6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJvd3M6IFtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZpZXc6IFwidGFiYmFyXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlkOiBcInRiX3RhYnNcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbXVsdGl2aWV3OiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvcHRpb25zOiBbXVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2aWV3OiBcIm11bHRpdmlld1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZDogXCJ0Yl92aWV3c1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjZWxsczogW1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRlbXBsYXRlOiBcIlwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgaWQ6IFwibG9nc1wiLFxuICAgICAgICAgICAgICAgICAgICB2aWV3OiBcImRhdGF0YWJsZVwiLFxuICAgICAgICAgICAgICAgICAgICByZXNpemVDb2x1bW46IHRydWUsXG4gICAgICAgICAgICAgICAgICAgIHNlbGVjdDogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgbXVsdGlzZWxlY3Q6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgIGNzczogXCJ3ZWJpeF9oZWFkZXJfYm9yZGVyIHdlYml4X2RhdGFfYm9yZGVyXCIsXG4gICAgICAgICAgICAgICAgICAgIHNjcm9sbDogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgYXV0b0NvbmZpZzogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgY29sdW1uczogW1xuICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlkOiBcImluZGV4XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaGVhZGVyOiBcIiNcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzb3J0OiBcImludFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGF1dG93aWR0aDogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aWR0aDogNjBcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWQ6IFwidGhyZWVib3RfbmFtZVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhlYWRlcjogXCJUaHJlZWJvdCBOYW1lXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc29ydDogXCJzdHJpbmdcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aWR0aDogMTgwXG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlkOiBcImFwcF9uYW1lXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaGVhZGVyOiBcIkFwcCBOYW1lXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc29ydDogXCJzdHJpbmdcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aWR0aDogMTgwXG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlkOiBcImxhdGVzdF9sb2dpZFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhlYWRlcjogXCJMYXRlc3QgTG9nI1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNvcnQ6IFwiaW50XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDE4MFxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgICAgICBzY2hlbWU6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICRpbml0OiBmdW5jdGlvbiAob2JqKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb2JqLmluZGV4ID0gdGhpcy5jb3VudCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIF1cbiAgICAgICAgfTtcblxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgdmlldzogXCJ3aW5kb3dcIixcbiAgICAgICAgICAgIGhlYWQ6IFwiQWxlcnRcIixcbiAgICAgICAgICAgIG1vZGFsOiB0cnVlLFxuICAgICAgICAgICAgd2lkdGg6IDYwMCxcbiAgICAgICAgICAgIGhlaWdodDogODAwLFxuICAgICAgICAgICAgcG9zaXRpb246IFwiY2VudGVyXCIsXG4gICAgICAgICAgICBib2R5OiB7XG4gICAgICAgICAgICAgICAgcm93czogW1xuICAgICAgICAgICAgICAgICAgICB0YWIsXG4gICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZpZXc6IFwiYnV0dG9uXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZTogXCJPS1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgY3NzOiBcIndlYml4X3ByaW1hcnlcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIGNsaWNrOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5nZXRUb3BQYXJlbnRWaWV3KCkuaGlkZSgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG5cbiAgICBpbml0KCkge1xuICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgICAgIHRoaXMuZm9ybSA9ICQkKFwiZm9ybVwiKTtcbiAgICAgICAgdGhpcy5tZXNzYWdlID0gJCQoXCJtZXNzYWdlXCIpO1xuICAgICAgICB0aGlzLmxvZ3MgPSAkJChcImxvZ3NcIik7XG5cbiAgICAgICAgdGhpcy50YlZpZXdzID0gJCQoXCJ0Yl92aWV3c1wiKTtcbiAgICAgICAgdGhpcy50YlRhYnMgPSAkJChcInRiX3RhYnNcIik7XG5cbiAgICAgICAgdGhpcy5sb2dzLmF0dGFjaEV2ZW50KFwib25JdGVtRGJsQ2xpY2tcIiwgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgbGV0IGxvZ0RhdGEgPSBzZWxmLmxvZ3MuZ2V0U2VsZWN0ZWRJdGVtKClcbiAgICAgICAgICAgIHRoaXMuJHNjb3BlLnNob3coYC9tYWluL2xvZ3M/YXBwbmFtZT0ke2xvZ0RhdGEuYXBwX25hbWV9JmxvZ2lkPSR7bG9nRGF0YS5sYXRlc3RfbG9naWR9YClcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgYWRkVHJhY2ViYWNrKHRiKSB7XG4gICAgICAgIGNvbnN0IHRiSWQgPSBgJHt0Yi50aHJlZWJvdF9uYW1lfV8ke3RiLnByb2Nlc3NfaWR9YDtcbiAgICAgICAgY29uc3QgdGJUaXRsZSA9IGAke3RiLnRocmVlYm90X25hbWV9IC0gUElEOiAoJHt0Yi5wcm9jZXNzX2lkfSlgO1xuXG4gICAgICAgIHRoaXMudGJWaWV3cy5hZGRWaWV3KHtcbiAgICAgICAgICAgIHZpZXc6IFwidGVtcGxhdGVcIixcbiAgICAgICAgICAgIGlkOiB0YklkLFxuICAgICAgICAgICAgc2Nyb2xsOiBcInh5XCIsXG4gICAgICAgICAgICB0ZW1wbGF0ZTogYDxwPiR7YW5zaVVwLmFuc2lfdG9faHRtbCh0Yi5mb3JtYXR0ZWQpfTwvcD5gXG4gICAgICAgIH0pO1xuXG4gICAgICAgIHRoaXMudGJUYWJzLmFkZE9wdGlvbih0YklkLCB0YlRpdGxlLCB0cnVlKTtcbiAgICB9XG5cbiAgICBjbGVhclRyYWNlQmFja3MoKSB7XG4gICAgICAgIGxldCBpZCA9IHRoaXMudGJUYWJzLmdldFZhbHVlKCk7XG5cbiAgICAgICAgd2hpbGUgKGlkKSB7XG4gICAgICAgICAgICB0aGlzLnRiVGFicy5yZW1vdmVPcHRpb24oaWQpO1xuICAgICAgICAgICAgdGhpcy50YlZpZXdzLnJlbW92ZVZpZXcoaWQpO1xuXG4gICAgICAgICAgICBpZCA9IHRoaXMudGJUYWJzLmdldFZhbHVlKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBzaG93Rm9yKGl0ZW0pIHtcbiAgICAgICAgdGhpcy5mb3JtLnNldFZhbHVlcyhpdGVtKTtcbiAgICAgICAgdGhpcy5tZXNzYWdlLnNldEhUTUwoYDxwPiR7YW5zaVVwLmFuc2lfdG9faHRtbChpdGVtLm1lc3NhZ2UpfTwvcD5gKTtcblxuICAgICAgICB0aGlzLmNsZWFyVHJhY2VCYWNrcygpO1xuXG4gICAgICAgIGZvciAobGV0IHRiIG9mIGl0ZW0udHJhY2ViYWNrcykge1xuICAgICAgICAgICAgdGhpcy5hZGRUcmFjZWJhY2sodGIpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5sb2dzLmNsZWFyQWxsKClcbiAgICAgICAgdGhpcy5sb2dzLnBhcnNlKGl0ZW0ubG9ncyk7XG5cbiAgICAgICAgdGhpcy5nZXRSb290KCkuc2hvdygpO1xuICAgIH1cbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NvdXJjZXMvdmlld3MvYWxlcnRzL2FsZXJ0LmpzIiwiaW1wb3J0IHsgSmV0VmlldyB9IGZyb20gXCJ3ZWJpeC1qZXRcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUHJvY2Vzc2VzQ2hpbGRWaWV3IGV4dGVuZHMgSmV0VmlldyB7XG5cbiAgICBjb25maWcoKSB7XG4gICAgICAgIGNvbnN0IHZpZXcgPSB7XG4gICAgICAgICAgICB2aWV3OiBcImRhdGF0YWJsZVwiLFxuICAgICAgICAgICAgaWQ6IFwicHJvY2Vzc190YWJsZVwiLFxuICAgICAgICAgICAgcmVzaXplQ29sdW1uOiB0cnVlLFxuICAgICAgICAgICAgc2VsZWN0OiB0cnVlLFxuICAgICAgICAgICAgbXVsdGlzZWxlY3Q6IHRydWUsXG4gICAgICAgICAgICBjc3M6IFwid2ViaXhfaGVhZGVyX2JvcmRlciB3ZWJpeF9kYXRhX2JvcmRlclwiLFxuICAgICAgICAgICAgc2Nyb2xsOiB0cnVlLFxuICAgICAgICAgICAgYXV0b0NvbmZpZzogdHJ1ZSxcbiAgICAgICAgICAgIGNvbHVtbnM6IFtcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIGlkOiBcImluZGV4XCIsXG4gICAgICAgICAgICAgICAgICAgIGhlYWRlcjogXCIjXCIsXG4gICAgICAgICAgICAgICAgICAgIHNvcnQ6IFwiaW50XCIsXG4gICAgICAgICAgICAgICAgICAgIGF1dG93aWR0aDogdHJ1ZSxcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgaWQ6IFwibmFtZVwiLFxuICAgICAgICAgICAgICAgICAgICBoZWFkZXI6IFtcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiUHJvY2Nlc3NcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb250ZW50OiBcInRleHRGaWx0ZXJcIlxuICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICAgICAgc29ydDogXCJzdHJpbmdcIixcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgaWQ6IFwicGlkXCIsXG4gICAgICAgICAgICAgICAgICAgIGhlYWRlcjogXCJQSURcIixcbiAgICAgICAgICAgICAgICAgICAgc29ydDogXCJpbnRcIlxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBpZDogXCJ1c2VybmFtZVwiLFxuICAgICAgICAgICAgICAgICAgICBoZWFkZXI6IFwiVXNlcm5hbWVcIixcbiAgICAgICAgICAgICAgICAgICAgc29ydDogXCJzdHJpbmdcIlxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBpZDogXCJ2bXNcIixcbiAgICAgICAgICAgICAgICAgICAgaGVhZGVyOiBcIk1lbW9yeSBVc2FnZVwiLFxuICAgICAgICAgICAgICAgICAgICBzb3J0OiBcImludFwiLFxuICAgICAgICAgICAgICAgICAgICBmb3JtYXQ6IGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIE1hdGguY2VpbCh2YWx1ZSlcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBdLFxuICAgICAgICAgICAgc2NoZW1lOiB7XG4gICAgICAgICAgICAgICAgJGluaXQ6IGZ1bmN0aW9uIChvYmopIHtcbiAgICAgICAgICAgICAgICAgICAgb2JqLmluZGV4ID0gdGhpcy5jb3VudCgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgdmlldzogXCJ3aW5kb3dcIixcbiAgICAgICAgICAgIGhlYWQ6IFwiUnVubmluZyBQcm9jZXNzZXMsIE1lbW9yeSB1c2FnZSBpbiBNQlwiLFxuICAgICAgICAgICAgbW9kYWw6IHRydWUsXG4gICAgICAgICAgICB3aWR0aDogNTUwLFxuICAgICAgICAgICAgaGVpZ2h0OiA2MDAsXG4gICAgICAgICAgICBwb3NpdGlvbjogXCJjZW50ZXJcIixcbiAgICAgICAgICAgIGJvZHk6IHtcbiAgICAgICAgICAgICAgICByb3dzOiBbXG4gICAgICAgICAgICAgICAgICAgIHZpZXcsXG4gICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZpZXc6IFwiYnV0dG9uXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZTogXCJPS1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgY3NzOiBcIndlYml4X3ByaW1hcnlcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIGNsaWNrOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5nZXRUb3BQYXJlbnRWaWV3KCkuaGlkZSgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgfVxuXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBzaG93Rm9yKGRhdGEpIHtcbiAgICAgICAgdGhpcy50YWJsZS5wYXJzZShkYXRhKVxuICAgICAgICB0aGlzLmdldFJvb3QoKS5zaG93KCk7XG4gICAgfVxuXG4gICAgaW5pdCgpIHtcbiAgICAgICAgdGhpcy50YWJsZSA9ICQkKFwicHJvY2Vzc190YWJsZVwiKTtcbiAgICB9XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zb3VyY2VzL3ZpZXdzL2Rhc2gvcHJvY2Vzc2VzQ2hpbGRWaWV3LmpzIiwiaW1wb3J0IHsgSmV0VmlldyB9IGZyb20gXCJ3ZWJpeC1qZXRcIjtcblxuaW1wb3J0IHsgZGF0ZUZvcm1hdHRlciB9IGZyb20gXCIuLi8uLi9jb21tb24vZm9ybWF0dGVyc1wiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBBcHBMb2dzVmlldyBleHRlbmRzIEpldFZpZXcge1xuICAgIGNvbmZpZygpIHtcbiAgICAgICAgdmFyIHBhZ2VyID0ge1xuICAgICAgICAgICAgdmlldzogXCJwYWdlclwiLFxuICAgICAgICAgICAgaWQ6IFwicGFnZXJcIixcbiAgICAgICAgICAgIHNpemU6IDEwMCxcbiAgICAgICAgICAgIGdyb3VwOiAyMFxuICAgICAgICB9O1xuICAgICAgICBjb25zdCBhcHBsb2dzID0ge1xuICAgICAgICAgICAgdmlldzogXCJkYXRhdGFibGVcIixcbiAgICAgICAgICAgIGlkOiBcImFwcGxvZ3NfdGFibGVcIixcbiAgICAgICAgICAgIHBhZ2VyOiBcInBhZ2VyXCIsXG4gICAgICAgICAgICByZXNpemVDb2x1bW46IHRydWUsXG4gICAgICAgICAgICBzZWxlY3Q6IHRydWUsXG4gICAgICAgICAgICBtdWx0aXNlbGVjdDogdHJ1ZSxcbiAgICAgICAgICAgIGNzczogXCJ3ZWJpeF9oZWFkZXJfYm9yZGVyIHdlYml4X2RhdGFfYm9yZGVyXCIsXG4gICAgICAgICAgICBzY3JvbGw6IHRydWUsXG4gICAgICAgICAgICBhdXRvQ29uZmlnOiB0cnVlLFxuICAgICAgICAgICAgb246IHtcbiAgICAgICAgICAgICAgICBvbkFmdGVyTG9hZDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnNvcnQoXCJlcG9jaFwiLCBcImRlc1wiKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5tYXJrU29ydGluZyhcImVwb2NoXCIsIFwiZGVzXCIpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG5cbiAgICAgICAgICAgIGNvbHVtbnM6IFt7XG4gICAgICAgICAgICAgICAgaWQ6IFwiaWRcIixcbiAgICAgICAgICAgICAgICBoZWFkZXI6IFtcbiAgICAgICAgICAgICAgICAgICAgXCJMb2cjXCIsXG4gICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRlbnQ6IFwidGV4dEZpbHRlclwiXG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICBzb3J0OiBcImludFwiLFxuICAgICAgICAgICAgICAgIHdpZHRoOiA1MCxcbiAgICAgICAgICAgICAgICBhdXRvd2lkdGg6IHRydWUsXG4gICAgICAgICAgICB9LFxuXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgaWQ6IFwiZmlsZXBhdGhcIixcbiAgICAgICAgICAgICAgICBoZWFkZXI6IFtcbiAgICAgICAgICAgICAgICAgICAgXCJQYXRoXCIsXG4gICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRlbnQ6IFwidGV4dEZpbHRlclwiXG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICBzb3J0OiBcInN0cmluZ1wiLFxuICAgICAgICAgICAgICAgIGF1dG93aWR0aDogdHJ1ZSxcbiAgICAgICAgICAgICAgICB3aWR0aDogMTQwXG4gICAgICAgICAgICB9LFxuXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgaWQ6IFwibGluZW5yXCIsXG4gICAgICAgICAgICAgICAgaGVhZGVyOiBbXG4gICAgICAgICAgICAgICAgICAgIFwiTGluZS5uclwiLFxuICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb250ZW50OiBcInRleHRGaWx0ZXJcIlxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgc29ydDogXCJpbnRcIixcbiAgICAgICAgICAgICAgICBhdXRvd2lkdGg6IHRydWUsXG4gICAgICAgICAgICAgICAgd2lkdGg6IDYwXG4gICAgICAgICAgICB9LFxuXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgaWQ6IFwiY29udGV4dFwiLFxuICAgICAgICAgICAgICAgIGhlYWRlcjogW1xuICAgICAgICAgICAgICAgICAgICBcIkNvbnRleHRcIixcbiAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29udGVudDogXCJ0ZXh0RmlsdGVyXCJcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgIHNvcnQ6IFwic3RyaW5nXCJcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgaWQ6IFwibWVzc2FnZVwiLFxuICAgICAgICAgICAgICAgIGhlYWRlcjogW1xuICAgICAgICAgICAgICAgICAgICBcIk1lc3NhZ2VcIixcbiAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29udGVudDogXCJ0ZXh0RmlsdGVyXCJcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgIHNvcnQ6IFwic3RyaW5nXCIsXG4gICAgICAgICAgICAgICAgd2lkdGg6IDUwMCxcbiAgICAgICAgICAgICAgICBhdXRvd2lkdGg6IHRydWVcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgaWQ6IFwibGV2ZWxcIixcbiAgICAgICAgICAgICAgICBoZWFkZXI6IFtcbiAgICAgICAgICAgICAgICAgICAgXCJMZXZlbFwiLFxuICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb250ZW50OiBcInRleHRGaWx0ZXJcIlxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgc29ydDogXCJpbnRcIixcbiAgICAgICAgICAgICAgICB3aWR0aDogNTBcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgaWQ6IFwiZXBvY2hcIixcbiAgICAgICAgICAgICAgICBoZWFkZXI6IFtcbiAgICAgICAgICAgICAgICAgICAgXCJUaW1lXCIsXG4gICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRlbnQ6IFwidGV4dEZpbHRlclwiXG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICBzb3J0OiBcImRhdGVcIixcbiAgICAgICAgICAgICAgICBmb3JtYXQ6IGRhdGVGb3JtYXR0ZXIsXG4gICAgICAgICAgICAgICAgd2lkdGg6IDEzMFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBpZDogXCJwcm9jZXNzaWRcIixcbiAgICAgICAgICAgICAgICBoZWFkZXI6IFtcbiAgICAgICAgICAgICAgICAgICAgXCJQSURcIixcbiAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29udGVudDogXCJ0ZXh0RmlsdGVyXCJcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgIHNvcnQ6IFwiaW50XCIsXG4gICAgICAgICAgICAgICAgd2lkdGg6IDYwXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGlkOiBcImNhdFwiLFxuICAgICAgICAgICAgICAgIGhlYWRlcjogW1xuICAgICAgICAgICAgICAgICAgICBcIkNhdGVnb3J5XCIsXG4gICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRlbnQ6IFwidGV4dEZpbHRlclwiXG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICBzb3J0OiBcInN0cmluZ1wiLFxuICAgICAgICAgICAgICAgIHdpZHRoOiA4MFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBpZDogXCJkYXRhXCIsXG4gICAgICAgICAgICAgICAgaGVhZGVyOiBbXG4gICAgICAgICAgICAgICAgICAgIFwiRGF0YVwiLFxuICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb250ZW50OiBcInRleHRGaWx0ZXJcIlxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgc29ydDogXCJzdHJpbmdcIlxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBdLFxuXG4gICAgICAgIH1cblxuXG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICByb3dzOiBbXG4gICAgICAgICAgICAgICAgYXBwbG9ncyxcbiAgICAgICAgICAgICAgICBwYWdlclxuICAgICAgICAgICAgXVxuICAgICAgICB9XG4gICAgfVxuXG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zb3VyY2VzL3ZpZXdzL2xvZ3MvYXBwTG9ncy5qcyIsImltcG9ydCBBbnNpVXAgZnJvbSBcImFuc2lfdXBcIjtcblxuZXhwb3J0IGNvbnN0IGFuc2lVcCA9IG5ldyBBbnNpVXAoKTtcblxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc291cmNlcy9jb21tb24vY29sb3JzLmpzIiwiaW1wb3J0IHsgU2VydmljZSB9IGZyb20gXCIuLi9jb21tb24vYXBpXCI7XG5cbmNvbnN0IEJBU0VfVVJMID0gXCIvemVyb2JvdC9wYWNrYWdlbWFuYWdlci9hY3RvcnMvcGFja2FnZV9tYW5hZ2VyXCI7XG5cblxuY2xhc3MgUGFja2FnZXNTZXJ2aWNlIGV4dGVuZHMgU2VydmljZSB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHN1cGVyKEJBU0VfVVJMKTtcbiAgICB9XG5cbiAgICBsaXN0KCkge1xuICAgICAgICByZXR1cm4gdGhpcy5nZXRDYWxsKFwicGFja2FnZXNfbGlzdFwiKTtcbiAgICB9XG5cbiAgICBhZGQocGF0aCwgZ2l0VXJsKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnBvc3RDYWxsKFwicGFja2FnZV9hZGRcIiwge1xuICAgICAgICAgICAgcGF0aDogcGF0aCxcbiAgICAgICAgICAgIGdpdF91cmw6IGdpdFVybFxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBkZWxldGUocGFja2FnZU5hbWUpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucG9zdENhbGwoXCJwYWNrYWdlX2RlbGV0ZVwiLCB7IG5hbWU6IHBhY2thZ2VOYW1lIH0pO1xuXG4gICAgfVxuXG4gICAgc3RhcnQocGFja2FnZU5hbWUpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucG9zdENhbGwoXCJwYWNrYWdlX3N0YXJ0XCIsIHsgbmFtZTogcGFja2FnZU5hbWUgfSk7XG4gICAgfVxuXG4gICAgc3RvcChwYWNrYWdlTmFtZSkge1xuICAgICAgICByZXR1cm4gdGhpcy5wb3N0Q2FsbChcInBhY2thZ2Vfc3RvcFwiLCB7IG5hbWU6IHBhY2thZ2VOYW1lIH0pO1xuXG4gICAgfVxuXG4gICAgZGlzYWJsZShwYWNrYWdlTmFtZSkge1xuICAgICAgICByZXR1cm4gdGhpcy5wb3N0Q2FsbChcInBhY2thZ2VfZGlzYWJsZVwiLCB7IG5hbWU6IHBhY2thZ2VOYW1lIH0pO1xuXG4gICAgfVxuXG4gICAgZW5hYmxlKHBhY2thZ2VOYW1lKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnBvc3RDYWxsKFwicGFja2FnZV9lbmFibGVcIiwgeyBuYW1lOiBwYWNrYWdlTmFtZSB9KTtcbiAgICB9XG59XG5cblxuZXhwb3J0IGNvbnN0IHBhY2thZ2VzID0gbmV3IFBhY2thZ2VzU2VydmljZSgpO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc291cmNlcy9zZXJ2aWNlcy9wYWNrYWdlcy5qcyIsImltcG9ydCB7IEpldFZpZXcgfSBmcm9tIFwid2ViaXgtamV0XCI7XG5pbXBvcnQgeyBoZWFsdGggfSBmcm9tIFwiLi4vLi4vc2VydmljZXMvaGVhbHRoXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIERpc2tTcGFjZVZpZXcgZXh0ZW5kcyBKZXRWaWV3IHtcbiAgICBjb25maWcoKSB7XG4gICAgICAgIGNvbnN0IGRpc2tTcGFjZSA9IHtcbiAgICAgICAgICAgIGlkOiBcImRpc2tTcGFjZVwiLFxuICAgICAgICAgICAgcmVzcG9uc2l2ZTogdHJ1ZSxcbiAgICAgICAgICAgIHZpZXc6IFwibGlzdFwiLFxuICAgICAgICAgICAgdHlwZToge1xuICAgICAgICAgICAgICAgIGhlaWdodDogNjAsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgdGVtcGxhdGU6IGBcbiAgICAgICAgICAgIDxwPjxmb250IHNpemU9XCIzXCI+PGI+I2tleSM6IDwvYj48L2ZvbnQ+IDxmb250IHNpemU9XCIzXCI+I3ZhbHVlIzwvZm9udD48L3A+XG4gICAgICAgICAgICBgXG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgdHlwZTogXCJzcGFjZVwiLFxuICAgICAgICAgICAgcm93czogW3tcbiAgICAgICAgICAgICAgICB0ZW1wbGF0ZTogXCI8ZGl2IHN0eWxlPSd3aWR0aDphdXRvO3RleHQtYWxpZ246Y2VudGVyJz48aDM+RGlzayBTcGFjZTxoMy8+PC9kaXY+XCIsXG4gICAgICAgICAgICAgICAgaGVpZ2h0OiA1MFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBkaXNrU3BhY2VcbiAgICAgICAgICAgIF1cbiAgICAgICAgfVxuICAgIH1cblxuXG4gICAgaW5pdCgpIHtcbiAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xuXG4gICAgICAgIHRoaXMuZGlza0luZm8gPSB0aGlzLiQkKFwiZGlza1NwYWNlXCIpO1xuXG4gICAgICAgIGhlYWx0aC5nZXREaXNrU3BhY2UoKS50aGVuKGRhdGEgPT4ge1xuICAgICAgICAgICAgZGF0YSA9IGRhdGEuanNvbigpO1xuXG4gICAgICAgICAgICBzZWxmLmRpc2tJbmZvLmFkZCh7XG4gICAgICAgICAgICAgICAga2V5OiBcIlVzZWRcIixcbiAgICAgICAgICAgICAgICB2YWx1ZTogZGF0YS51c2VkICsgXCIgR0JcIlxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBzZWxmLmRpc2tJbmZvLmFkZCh7XG4gICAgICAgICAgICAgICAga2V5OiBcIkZyZWVcIixcbiAgICAgICAgICAgICAgICB2YWx1ZTogZGF0YS5mcmVlICsgXCIgR0JcIlxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBzZWxmLmRpc2tJbmZvLmFkZCh7XG4gICAgICAgICAgICAgICAga2V5OiBcIlRvdGFsXCIsXG4gICAgICAgICAgICAgICAgdmFsdWU6IGRhdGEudG90YWwgKyBcIiBHQlwiXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHNlbGYuZGlza0luZm8uYWRkKHtcbiAgICAgICAgICAgICAgICBrZXk6IFwiUGVyY2VudFwiLFxuICAgICAgICAgICAgICAgIHZhbHVlOiBkYXRhLnBlcmNlbnQgKyBcIiAlXCJcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9XG5cbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NvdXJjZXMvdmlld3MvZGFzaC9kaXNrU3BhY2UuanMiLCJpbXBvcnQgeyBKZXRWaWV3IH0gZnJvbSBcIndlYml4LWpldFwiO1xuaW1wb3J0IHsgaGVhbHRoIH0gZnJvbSBcIi4uLy4uL3NlcnZpY2VzL2hlYWx0aFwiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBoZWFsdGhJbmZvVmlldyBleHRlbmRzIEpldFZpZXcge1xuICAgIGNvbmZpZygpIHtcbiAgICAgICAgY29uc3QgaGVhbHRoSW5mbyA9IHtcbiAgICAgICAgICAgIGlkOiBcImhlYWx0aEluZm9cIixcbiAgICAgICAgICAgIHJlc3BvbnNpdmU6IHRydWUsXG4gICAgICAgICAgICB2aWV3OiBcImxpc3RcIixcbiAgICAgICAgICAgIHJlc3BvbnNpdmU6IHRydWUsXG4gICAgICAgICAgICB0eXBlOiB7XG4gICAgICAgICAgICAgICAgaGVpZ2h0OiA2MCxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB0ZW1wbGF0ZTogYFxuICAgICAgICAgICAgPHA+PGZvbnQgc2l6ZT1cIjNcIj48Yj4ja2V5IzogPC9iPjwvZm9udD4gI3ZhbHVlIzwvcD5cbiAgICAgICAgICAgIGBcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICB0eXBlOiBcInNwYWNlXCIsXG4gICAgICAgICAgICByb3dzOiBbe1xuICAgICAgICAgICAgICAgIHRlbXBsYXRlOiBcIjxkaXYgc3R5bGU9J3dpZHRoOmF1dG87dGV4dC1hbGlnbjpjZW50ZXInPjxoMz5IZWFsdGggQ2hlY2tzPGgzLz48L2Rpdj5cIixcbiAgICAgICAgICAgICAgICBoZWlnaHQ6IDUwXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIGhlYWx0aEluZm9dXG4gICAgICAgIH1cbiAgICB9XG4gICAgaW5pdCh2aWV3KSB7XG4gICAgICAgIHZhciBzZWxmID0gdGhpcztcblxuICAgICAgICB0aGlzLmhlYWx0aEluZm8gPSB0aGlzLiQkKFwiaGVhbHRoSW5mb1wiKTtcblxuICAgICAgICBoZWFsdGguZ2V0SGVhbHRoKCkudGhlbihkYXRhID0+IHtcbiAgICAgICAgICAgIGRhdGEgPSBkYXRhLmpzb24oKTtcblxuICAgICAgICAgICAgaWYgKGRhdGEuYmNkYiA9PT0gXCJPS1wiKSB7XG4gICAgICAgICAgICAgICAgc2VsZi5oZWFsdGhJbmZvLmFkZCh7XG4gICAgICAgICAgICAgICAgICAgIGtleTogXCJCQ0RCIFN0YXR1c1wiLFxuICAgICAgICAgICAgICAgICAgICB2YWx1ZTogYDxzcGFuIGNsYXNzPSd3ZWJpeF9pY29uIHd4aS1jaGVja2JveC1tYXJrZWQnIHN0eWxlPVwiY29sb3I6Z3JlZW5cIj5PSzwvc3Bhbj5gXG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChkYXRhLmJjZGIgPT09IFwiRXJyb3JcIikge1xuICAgICAgICAgICAgICAgIHNlbGYuaGVhbHRoSW5mby5hZGQoe1xuICAgICAgICAgICAgICAgICAgICBrZXk6IFwiQkNEQlwiLFxuICAgICAgICAgICAgICAgICAgICB2YWx1ZTogYDxzcGFuIGNsYXNzPSd3ZWJpeF9pY29uIHd4aS1jbG9zZS1jaXJjbGUnIHN0eWxlPVwiY29sb3I6cmVkXCI+RXJyb3I8L3NwYW4+YFxuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoZGF0YS53aWtpcyA9PT0gXCJPS1wiKSB7XG4gICAgICAgICAgICAgICAgc2VsZi5oZWFsdGhJbmZvLmFkZCh7XG4gICAgICAgICAgICAgICAgICAgIGtleTogXCJXaWtpc1wiLFxuICAgICAgICAgICAgICAgICAgICB2YWx1ZTogYDxzcGFuIGNsYXNzPSd3ZWJpeF9pY29uIHd4aS1jaGVja2JveC1tYXJrZWQnIHN0eWxlPVwiY29sb3I6Z3JlZW5cIj5PSzwvc3Bhbj5gXG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChkYXRhLndpa2lzID09PSBcIkVycm9yXCIpIHtcbiAgICAgICAgICAgICAgICBzZWxmLmhlYWx0aEluZm8uYWRkKHtcbiAgICAgICAgICAgICAgICAgICAga2V5OiBcIldpa2lzXCIsXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlOiBgPHNwYW4gY2xhc3M9J3dlYml4X2ljb24gd3hpLWNsb3NlLWNpcmNsZScgc3R5bGU9XCJjb2xvcjpyZWRcIj5FcnJvcjwvc3Bhbj5gXG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChkYXRhLmNvZGVzZXJ2ZXIgPT09IFwiT0tcIikge1xuICAgICAgICAgICAgICAgIHNlbGYuaGVhbHRoSW5mby5hZGQoe1xuICAgICAgICAgICAgICAgICAgICBrZXk6IFwiQ29kZXNlcnZlclwiLFxuICAgICAgICAgICAgICAgICAgICB2YWx1ZTogYDxzcGFuIGNsYXNzPSd3ZWJpeF9pY29uIHd4aS1jaGVja2JveC1tYXJrZWQnIHN0eWxlPVwiY29sb3I6Z3JlZW5cIj5PSzwvc3Bhbj5gXG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChkYXRhLmNvZGVzZXJ2ZXIgPT09IFwiRXJyb3JcIikge1xuICAgICAgICAgICAgICAgIHNlbGYuaGVhbHRoSW5mby5hZGQoe1xuICAgICAgICAgICAgICAgICAgICBrZXk6IFwiQ29kZXNlcnZlclwiLFxuICAgICAgICAgICAgICAgICAgICB2YWx1ZTogYDxzcGFuIGNsYXNzPSd3ZWJpeF9pY29uIHd4aS1jbG9zZS1jaXJjbGUnIHN0eWxlPVwiY29sb3I6cmVkXCI+RXJyb3I8L3NwYW4+YFxuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoZGF0YS5qdXB5dGVyID09PSBcIk9LXCIpIHtcbiAgICAgICAgICAgICAgICBzZWxmLmhlYWx0aEluZm8uYWRkKHtcbiAgICAgICAgICAgICAgICAgICAga2V5OiBcIkp1cHl0ZXJcIixcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU6IGA8c3BhbiBjbGFzcz0nd2ViaXhfaWNvbiB3eGktY2hlY2tib3gtbWFya2VkJyBzdHlsZT1cImNvbG9yOmdyZWVuXCI+T0s8L3NwYW4+YFxuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoZGF0YS5qdXB5dGVyID09PSBcIkVycm9yXCIpIHtcbiAgICAgICAgICAgICAgICBzZWxmLmhlYWx0aEluZm8uYWRkKHtcbiAgICAgICAgICAgICAgICAgICAga2V5OiBcIkp1cHl0ZXJcIixcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU6IGA8c3BhbiBjbGFzcz0nd2ViaXhfaWNvbiB3eGktY2xvc2UtY2lyY2xlJyBzdHlsZT1cImNvbG9yOnJlZFwiPkVycm9yPC9zcGFuPmBcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgIH1cblxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc291cmNlcy92aWV3cy9kYXNoL2hlYWx0aC5qcyIsImltcG9ydCB7IEpldFZpZXcgfSBmcm9tIFwid2ViaXgtamV0XCI7XG5pbXBvcnQgeyBoZWFsdGggfSBmcm9tIFwiLi4vLi4vc2VydmljZXMvaGVhbHRoXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEpTWEluZm9WaWV3IGV4dGVuZHMgSmV0VmlldyB7XG4gICAgY29uZmlnKCkge1xuICAgICAgICBjb25zdCBpbmZvID0ge1xuICAgICAgICAgICAgaWQ6IFwianN4SW5mb1wiLFxuICAgICAgICAgICAgcmVzcG9uc2l2ZTogdHJ1ZSxcbiAgICAgICAgICAgIHZpZXc6IFwibGlzdFwiLFxuICAgICAgICAgICAgcmVzcG9uc2l2ZTogdHJ1ZSxcbiAgICAgICAgICAgIHR5cGU6IHtcbiAgICAgICAgICAgICAgICBoZWlnaHQ6IDYwLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHRlbXBsYXRlOiBgXG4gICAgICAgICAgICAgICAgPHA+PGZvbnQgc2l6ZT1cIjNcIj48Yj4ja2V5IzogPC9iPjwvZm9udD4gPGZvbnQgc2l6ZT1cIjNcIj4jdmFsdWUjPC9mb250PjwvcD5cbiAgICAgICAgICAgIGBcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICB0eXBlOiBcInNwYWNlXCIsXG4gICAgICAgICAgICByb3dzOiBbe1xuICAgICAgICAgICAgICAgIHRlbXBsYXRlOiBcIjxkaXYgc3R5bGU9J3dpZHRoOmF1dG87dGV4dC1hbGlnbjpjZW50ZXInPjxoMz5KU1ggSW5mbzxoMy8+PC9kaXY+XCIsXG4gICAgICAgICAgICAgICAgaGVpZ2h0OiA1MFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBpbmZvXG4gICAgICAgICAgICBdXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBpbml0KCkge1xuICAgICAgICBjb25zdCBzZWxmID0gdGhpcztcblxuICAgICAgICB0aGlzLmluZm8gPSB0aGlzLiQkKFwianN4SW5mb1wiKTtcblxuICAgICAgICBoZWFsdGguZ2V0SWRlbnRpdHkoKS50aGVuKGRhdGEgPT4ge1xuICAgICAgICAgICAgc2VsZi5pbmZvLmFkZCh7XG4gICAgICAgICAgICAgICAga2V5OiBcIjNib3RcIixcbiAgICAgICAgICAgICAgICB2YWx1ZTogZGF0YS50ZXh0KClcbiAgICAgICAgICAgIH0pXG4gICAgICAgIH0pXG5cbiAgICAgICAgaGVhbHRoLmdldE5ldHdvcmtJbmZvKCkudGhlbihkYXRhID0+IHtcbiAgICAgICAgICAgIGRhdGEgPSBkYXRhLmpzb24oKTtcbiAgICAgICAgICAgIHNlbGYuaW5mby5hZGQoe1xuICAgICAgICAgICAgICAgIGtleTogXCJJUFwiLFxuICAgICAgICAgICAgICAgIHZhbHVlOiBkYXRhLmlwLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBpZiAoZGF0YS5pcDYubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgc2VsZi5pbmZvLmFkZCh7XG4gICAgICAgICAgICAgICAgICAgIGtleTogXCJJUHY2XCIsXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlOiBkYXRhLmlwNlxuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHNlbGYuaW5mby5hZGQoe1xuICAgICAgICAgICAgICAgICAgICBrZXk6IFwiSVB2NlwiLFxuICAgICAgICAgICAgICAgICAgICB2YWx1ZTogXCJOb3Qgc2V0XCJcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICBoZWFsdGguZ2V0SnN4VmVyc2lvbigpLnRoZW4oZGF0YSA9PiB7XG4gICAgICAgICAgICBzZWxmLmluZm8uYWRkKHtcbiAgICAgICAgICAgICAgICBrZXk6IFwiSlNYIFZlcnNpb25cIixcbiAgICAgICAgICAgICAgICB2YWx1ZTogZGF0YS50ZXh0KClcbiAgICAgICAgICAgIH0pXG4gICAgICAgIH0pXG5cbiAgICB9XG5cbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NvdXJjZXMvdmlld3MvZGFzaC9qc3hJbmZvLmpzIiwiaW1wb3J0IHsgSmV0VmlldyB9IGZyb20gXCJ3ZWJpeC1qZXRcIjtcblxuaW1wb3J0IFByb2Nlc3Nlc0NoaWxkVmlldyBmcm9tIFwiLi9wcm9jZXNzZXNDaGlsZFZpZXdcIjtcbmltcG9ydCB7IGhlYWx0aCB9IGZyb20gXCIuLi8uLi9zZXJ2aWNlcy9oZWFsdGhcIjtcblxuY29uc3QgY29sb3JzRGF0YXNldCA9IFtcbiAgICB7XG4gICAgICAgIGNvbG9yOiBcIiNlZTM2MzlcIlxuICAgIH0sXG4gICAge1xuICAgICAgICBjb2xvcjogXCIjZWU5ZTM2XCJcbiAgICB9LFxuICAgIHtcbiAgICAgICAgY29sb3I6IFwiI2VlZWEzNlwiXG4gICAgfSxcbiAgICB7XG4gICAgICAgIGNvbG9yOiBcIiNhOWVlMzZcIlxuICAgIH0sXG4gICAge1xuICAgICAgICBjb2xvcjogXCIjMzZkM2VlXCJcbiAgICB9LFxuICAgIHtcbiAgICAgICAgY29sb3I6IFwiIzM2N2ZlZVwiXG4gICAgfSxcbiAgICB7XG4gICAgICAgIGNvbG9yOiBcIiM5YjM2ZWVcIlxuICAgIH1cbl07XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFByb2Nlc3Nlc1ZpZXcgZXh0ZW5kcyBKZXRWaWV3IHtcblxuICAgIGNvbmZpZygpIHtcbiAgICAgICAgY29uc3QgcHJvY2Vzc2VzSW5mbyA9IHtcbiAgICAgICAgICAgIGlkOiBcInByb2Nlc3NcIixcbiAgICAgICAgICAgIHZpZXc6IFwiY2hhcnRcIixcbiAgICAgICAgICAgIHJlc3BvbnNpdmU6IHRydWUsXG4gICAgICAgICAgICB0eXBlOiBcInBpZVwiLFxuICAgICAgICAgICAgd2lkdGg6IDUwMCxcbiAgICAgICAgICAgIGhlaWdodDogNDAwLFxuICAgICAgICAgICAgY29sb3I6IFwiI2NvbG9yI1wiLFxuICAgICAgICAgICAgdmFsdWU6IFwiI3ZtcyNcIixcbiAgICAgICAgICAgIGxhYmVsOiBcIjxoND4jbmFtZSM8L2g0PlwiLFxuICAgICAgICAgICAgcGllSW5uZXJUZXh0OiBcIjxoND4jdm1zIzwvaDQ+XCIsXG4gICAgICAgICAgICBkYXRhOiBcIiNjaGFydHNEYXRhI1wiLFxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHR5cGU6IFwic3BhY2VcIixcbiAgICAgICAgICAgIHJvd3M6IFtcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIHRlbXBsYXRlOiBcIjxkaXYgc3R5bGU9J3dpZHRoOmF1dG87dGV4dC1hbGlnbjpjZW50ZXInPjxoMz5SdW5uaW5nIHByb2Nlc3NlcyBtZW1vcnkgdXNhZ2UgKE1CKTxoMy8+PC9kaXY+XCIsXG4gICAgICAgICAgICAgICAgICAgIGhlaWdodDogNTBcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHByb2Nlc3Nlc0luZm8sXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICB2aWV3OiBcImJ1dHRvblwiLFxuICAgICAgICAgICAgICAgICAgICBpZDogXCJzaG93X2FsbFwiLFxuICAgICAgICAgICAgICAgICAgICB2YWx1ZTogXCJTaG93IEFsbFwiLFxuICAgICAgICAgICAgICAgICAgICBhbGlnbjogXCJjZW50ZXJcIixcbiAgICAgICAgICAgICAgICAgICAgY3NzOiBcIndlYml4X3ByaW1hcnlcIixcbiAgICAgICAgICAgICAgICAgICAgaW5wdXRXaWR0aDogMTAwLFxuICAgICAgICAgICAgICAgICAgICBjbGljazogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy4kc2NvcGUuY2hpbGR2aWV3LnNob3dGb3IodGhpcy4kc2NvcGUucHJvY2Vzc2VzTGlzdClcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgXVxuICAgICAgICB9XG4gICAgfVxuXG5cbiAgICBpbml0KHZpZXcpIHtcbiAgICAgICAgY29uc3Qgc2VsZiA9IHRoaXM7XG5cbiAgICAgICAgdGhpcy5wcm9jZXNzZXNMaXN0ID0gW11cblxuICAgICAgICB0aGlzLnJ1blByb2Nlc3NJbmZvID0gdGhpcy4kJChcInByb2Nlc3NcIik7XG5cbiAgICAgICAgc2VsZi5jaGlsZHZpZXcgPSBzZWxmLnVpKFByb2Nlc3Nlc0NoaWxkVmlldyk7XG5cbiAgICAgICAgaGVhbHRoLmdldFJ1bm5pbmdQcm9jZXNzZXMoKS50aGVuKGRhdGEgPT4ge1xuICAgICAgICAgICAgdmFyIGNoYXJ0c0RhdGEgPSBbXVxuXG4gICAgICAgICAgICBkYXRhID0gZGF0YS5qc29uKCk7XG4gICAgICAgICAgICBzZWxmLnByb2Nlc3Nlc0xpc3QgPSBkYXRhLnByb2Nlc3Nlc0xpc3RcblxuICAgICAgICAgICAgLy8gbWVtb3J5IHVzYWdlXG4gICAgICAgICAgICBzZWxmLm1lbW9yeVVzYWdlID0gZGF0YS5tZW1vcnlVc2FnZVxuICAgICAgICAgICAgc2VsZi50b3RhbE1lbW9yeSA9IHNlbGYubWVtb3J5VXNhZ2UudG90YWxfbWVtXG4gICAgICAgICAgICBzZWxmLnBlcmNlbnQgPSBzZWxmLm1lbW9yeVVzYWdlLnVzYWdlX3BlcmNlbnRcblxuXG4gICAgICAgICAgICBzZWxmLnJ1blByb2Nlc3NJbmZvLmRlZmluZShcImxlZ2VuZFwiLCB7XG4gICAgICAgICAgICAgICAgbGF5b3V0OiBcInhcIixcbiAgICAgICAgICAgICAgICB3aWR0aDogMTEwLFxuICAgICAgICAgICAgICAgIHZhbHVlczogW1xuICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0ZXh0OiBgPGI+VG90YWwgbWVtb3J5OiA8L2I+JHtzZWxmLnRvdGFsTWVtb3J5fUdCYFxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0ZXh0OiBgPGI+VXNhZ2U6IDwvYj4ke3NlbGYucGVyY2VudH0lYFxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIHNlbGYucnVuUHJvY2Vzc0luZm8ucmVmcmVzaCgpXG5cbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc2VsZi5wcm9jZXNzZXNMaXN0Lmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgLy9CcmVhayB3aGVuIHRoZXJlIGlzIG5vIG1vcmUgY29sb3JzXG4gICAgICAgICAgICAgICAgaWYgKGkgPT0gY29sb3JzRGF0YXNldC5sZW5ndGgpXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICAgICAgdmFyIHRlbXAgPSB7XG4gICAgICAgICAgICAgICAgICAgIFwiY29sb3JcIjogY29sb3JzRGF0YXNldFtpXS5jb2xvcixcbiAgICAgICAgICAgICAgICAgICAgXCJuYW1lXCI6IHNlbGYucHJvY2Vzc2VzTGlzdFtpXS5uYW1lLFxuICAgICAgICAgICAgICAgICAgICBcInZtc1wiOiBNYXRoLmNlaWwoc2VsZi5wcm9jZXNzZXNMaXN0W2ldLnZtcyksXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGNoYXJ0c0RhdGEucHVzaCh0ZW1wKVxuICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKG15QXJyYXlbaV0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgc2VsZi5ydW5Qcm9jZXNzSW5mby5wYXJzZSh7XG4gICAgICAgICAgICAgICAgZGF0YTogY2hhcnRzRGF0YSxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9XG5cbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NvdXJjZXMvdmlld3MvZGFzaC9wcm9jZXNzZXMuanMiLCJpbXBvcnQgeyBKZXRWaWV3IH0gZnJvbSBcIndlYml4LWpldFwiO1xuXG5pbXBvcnQgeyBoZWFsdGggfSBmcm9tIFwiLi4vLi4vc2VydmljZXMvaGVhbHRoXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIHJ1bm5pbmdQb3J0c1ZpZXcgZXh0ZW5kcyBKZXRWaWV3IHtcbiAgICBjb25maWcoKSB7XG4gICAgICAgIGNvbnN0IHBvcnRzID0ge1xuICAgICAgICAgICAgaWQ6IFwicnVubmluZ1BvcnRzXCIsXG4gICAgICAgICAgICB2aWV3OiBcImRhdGF0YWJsZVwiLFxuICAgICAgICAgICAgcmVzcG9uc2l2ZTogdHJ1ZSxcbiAgICAgICAgICAgIGF1dG9Db25maWc6IHRydWUsXG4gICAgICAgICAgICB0eXBlOiB7XG4gICAgICAgICAgICAgICAgaGVpZ2h0OiAyMDAsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgdGVtcGxhdGU6IFwiUnVubmluZyBQb3J0c1wiLFxuICAgICAgICAgICAgcmVzaXplQ29sdW1uOiB0cnVlLFxuICAgICAgICAgICAgc2VsZWN0OiB0cnVlLFxuICAgICAgICAgICAgbXVsdGlzZWxlY3Q6IHRydWUsXG4gICAgICAgICAgICBjc3M6IFwid2ViaXhfaGVhZGVyX2JvcmRlciB3ZWJpeF9kYXRhX2JvcmRlclwiLFxuICAgICAgICAgICAgY29sdW1uczogW3tcbiAgICAgICAgICAgICAgICBpZDogXCJpbmRleFwiLFxuICAgICAgICAgICAgICAgIGhlYWRlcjogXCIjXCIsXG4gICAgICAgICAgICAgICAgc29ydDogXCJpbnRcIixcbiAgICAgICAgICAgICAgICBhdXRvd2lkdGg6IHRydWUsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGlkOiBcInBvcnRfbnVtYmVyXCIsXG4gICAgICAgICAgICAgICAgaGVhZGVyOiBbXCJQb3J0IE51bWJlclwiLCB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnRlbnQ6IFwidGV4dEZpbHRlclwiXG4gICAgICAgICAgICAgICAgfSxdLFxuICAgICAgICAgICAgICAgIHNvcnQ6IFwic3RyaW5nXCJcbiAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICBpZDogXCJwcm9jZXNzXCIsXG4gICAgICAgICAgICAgICAgaGVhZGVyOiBbXCJQcm9jZXNzXCIsIHtcbiAgICAgICAgICAgICAgICAgICAgY29udGVudDogXCJ0ZXh0RmlsdGVyXCJcbiAgICAgICAgICAgICAgICB9XSxcbiAgICAgICAgICAgICAgICBzb3J0OiBcInN0cmluZ1wiXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBdLFxuICAgICAgICAgICAgc2NoZW1lOiB7XG4gICAgICAgICAgICAgICAgJGluaXQ6IGZ1bmN0aW9uIChvYmopIHtcbiAgICAgICAgICAgICAgICAgICAgb2JqLmluZGV4ID0gdGhpcy5jb3VudCgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgdHlwZTogXCJzcGFjZVwiLFxuICAgICAgICAgICAgcm93czogW1xuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgdGVtcGxhdGU6IFwiPGRpdiBzdHlsZT0nd2lkdGg6YXV0bzt0ZXh0LWFsaWduOmNlbnRlcic+PGgzPlBvcnRzPGgzLz48L2Rpdj5cIixcbiAgICAgICAgICAgICAgICAgICAgaGVpZ2h0OiA1MFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgcG9ydHNcbiAgICAgICAgICAgIF1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIGluaXQoKSB7XG4gICAgICAgIGNvbnN0IHNlbGYgPSB0aGlzO1xuXG4gICAgICAgIHNlbGYucG9ydHNUYWJsZSA9IHRoaXMuJCQoXCJydW5uaW5nUG9ydHNcIik7XG4gICAgICAgIGhlYWx0aC5nZXRSdW5uaW5nUHJvY2Vzc2VzKCkudGhlbihkYXRhID0+IHtcbiAgICAgICAgICAgIHNlbGYucG9ydHNUYWJsZS5wYXJzZShkYXRhLmpzb24oKSk7XG4gICAgICAgIH0pO1xuICAgIH1cblxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc291cmNlcy92aWV3cy9kYXNoL3J1bm5pbmdQb3J0cy5qcyIsImltcG9ydCB7XG4gICAgSmV0VmlldyxcbiAgICBwbHVnaW5zXG59IGZyb20gXCJ3ZWJpeC1qZXRcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVG9wVmlldyBleHRlbmRzIEpldFZpZXcge1xuICAgIGNvbmZpZygpIHtcbiAgICAgICAgY29uc3QgaGVhZGVyID0ge1xuICAgICAgICAgICAgY29sczogW1xuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgaWQ6IFwiYnV0dG9uX2hpZGVfbWVudVwiLFxuICAgICAgICAgICAgICAgICAgICB2aWV3OiBcImljb25cIiwgaWNvbjogXCJtZGkgbWRpLW1lbnVcIixcbiAgICAgICAgICAgICAgICAgICAgY3NzOiBcImN1c3RvbV9kYXJrXCIsIGhlaWdodDogNTgsXG4gICAgICAgICAgICAgICAgICAgIGNsaWNrOiB0aGlzLmhpZGVNZW51LFxuICAgICAgICAgICAgICAgICAgICB0b29sdGlwOiBcIkhpZGUgbWVudVwiLFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBpZDogXCJoZWFkZXJcIixcbiAgICAgICAgICAgICAgICAgICAgdHlwZTogXCJoZWFkZXJcIixcbiAgICAgICAgICAgICAgICAgICAgY3NzOiBcImN1c3RvbV9kYXJrXCIsIGhlaWdodDogNTgsXG4gICAgICAgICAgICAgICAgICAgIHRlbXBsYXRlOiBcIkFETUlOXCIsXG4gICAgICAgICAgICAgICAgICAgIGJvcmRlcmxlc3M6IHRydWUsXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIF1cbiAgICAgICAgfTtcblxuICAgICAgICBjb25zdCBzaWRlYmFyID0ge1xuICAgICAgICAgICAgbG9jYWxJZDogXCJtZW51XCIsXG4gICAgICAgICAgICB2aWV3OiBcInNpZGViYXJcIixcbiAgICAgICAgICAgIGNzczogXCJ3ZWJpeF9kYXJrXCIsXG4gICAgICAgICAgICB3aWR0aDogMjAwLFxuICAgICAgICAgICAgZGF0YTogW3tcbiAgICAgICAgICAgICAgICBpZDogXCJkYXNoXCIsXG4gICAgICAgICAgICAgICAgdmFsdWU6IFwiRGFzaGJvYXJkXCIsXG4gICAgICAgICAgICAgICAgaWNvbjogXCJtZGkgbWRpLXZpZXctZGFzaGJvYXJkXCJcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgaWQ6IFwid2lraXNcIixcbiAgICAgICAgICAgICAgICB2YWx1ZTogXCJXaWtpc1wiLFxuICAgICAgICAgICAgICAgIGljb246IFwibWRpIG1kaS1uZXdzcGFwZXJcIlxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBpZDogXCJhbGVydHNcIixcbiAgICAgICAgICAgICAgICB2YWx1ZTogXCJBbGVydHNcIixcbiAgICAgICAgICAgICAgICBpY29uOiBcIm1kaSBtZGktYmVsbC1hbGVydFwiXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGlkOiBcImxvZ3NcIixcbiAgICAgICAgICAgICAgICB2YWx1ZTogXCJMb2dzXCIsXG4gICAgICAgICAgICAgICAgaWNvbjogXCJtZGkgbWRpLWhpc3RvcnlcIlxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBpZDogXCJteWpvYnNfbWFpblwiLFxuICAgICAgICAgICAgICAgIHZhbHVlOiBcIk15IGpvYnNcIixcbiAgICAgICAgICAgICAgICBpY29uOiBcIm1kaSBtZGktYW5pbWF0aW9uLXBsYXlcIixcbiAgICAgICAgICAgICAgICBkYXRhOiBbe1xuICAgICAgICAgICAgICAgICAgICBpZDogXCJteWpvYnNcIixcbiAgICAgICAgICAgICAgICAgICAgaWNvbjogXCJtZGkgbWRpLWJvb2stb3BlblwiLFxuICAgICAgICAgICAgICAgICAgICB2YWx1ZTogXCJKb2JzXCJcbiAgICAgICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgICAgIGlkOiBcIndvcmtlcnNcIixcbiAgICAgICAgICAgICAgICAgICAgaWNvbjogXCJtZGkgbWRpLXdvcmtlclwiLFxuICAgICAgICAgICAgICAgICAgICB2YWx1ZTogXCJXb3JrZXJzXCJcbiAgICAgICAgICAgICAgICB9XVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBpZDogXCJwYWNrYWdlc1wiLFxuICAgICAgICAgICAgICAgIHZhbHVlOiBcIlBhY2thZ2VzXCIsXG4gICAgICAgICAgICAgICAgaWNvbjogXCJtZGkgbWRpLXBhY2thZ2VcIlxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBpZDogXCJjb2Rlc2VydmVyXCIsXG4gICAgICAgICAgICAgICAgdmFsdWU6IFwiQ29kZXNlcnZlclwiLFxuICAgICAgICAgICAgICAgIGljb246IFwibWRpIG1kaS1jb2RlLXRhZ3NcIlxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBpZDogXCJqdXB5dGVyXCIsXG4gICAgICAgICAgICAgICAgdmFsdWU6IFwiSnVweXRlclwiLFxuICAgICAgICAgICAgICAgIGljb246IFwibWRpIG1kaS1wbGF5XCJcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBdXG4gICAgICAgIH07XG5cbiAgICAgICAgY29uc3QgdG9vbGJhciA9IHtcbiAgICAgICAgICAgIHZpZXc6IFwidG9vbGJhclwiLFxuICAgICAgICAgICAgcGFkZGluZzogOSxcbiAgICAgICAgICAgIGhlaWdodDogNTgsXG4gICAgICAgICAgICBjb2xzOiBbe1xuICAgICAgICAgICAgICAgIGlkOiBcImJ1dHRvbl9zaG93X21lbnVcIixcbiAgICAgICAgICAgICAgICB2aWV3OiBcImljb25cIixcbiAgICAgICAgICAgICAgICBpY29uOiBcIm1kaSBtZGktbWVudVwiLFxuICAgICAgICAgICAgICAgIGNsaWNrOiB0aGlzLnNob3dNZW51LFxuICAgICAgICAgICAgICAgIGhpZGRlbjogdHJ1ZSwgLy8gaGlkZGVuIGJ5IGRlZmF1bHRcbiAgICAgICAgICAgICAgICB0b29sdGlwOiBcIlNob3cgbWVudVwiLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICB2aWV3OiBcInRlbXBsYXRlXCIsXG4gICAgICAgICAgICAgICAgdGVtcGxhdGU6IGA8aW1nIGNsYXNzPVwid2ViaXhfaWNvblwiIHNyYz1cInN0YXRpYy9pbWcvM2JvdC5wbmdcIi8+YCxcbiAgICAgICAgICAgICAgICBib3JkZXJsZXNzOiB0cnVlLFxuICAgICAgICAgICAgICAgIGhlaWdodDogNDAsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGlkOiBcInVzZXJuYW1lX2xhYmVsXCIsXG4gICAgICAgICAgICAgICAgdmlldzogXCJsYWJlbFwiLFxuICAgICAgICAgICAgICAgIGxhYmVsOiBcInVzZXJuYW1lXCIsXG4gICAgICAgICAgICAgICAgYm9yZGVybGVzczogdHJ1ZSxcbiAgICAgICAgICAgICAgICBhbGlnbjogXCJyaWdodFwiLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBpZDogXCJ1c2VyX2ljb25cIixcbiAgICAgICAgICAgICAgICB2aWV3OiBcImljb25cIixcbiAgICAgICAgICAgICAgICBpY29uOiBcIm1kaSBtZGktYWNjb3VudC1jaXJjbGVcIixcbiAgICAgICAgICAgICAgICBib3JkZXJsZXNzOiB0cnVlLFxuICAgICAgICAgICAgICAgIHBvcHVwOiBcInVzZXJfbWVudVwiXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBdXG4gICAgICAgIH07XG5cbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHR5cGU6IFwiY2xlYW5cIixcbiAgICAgICAgICAgIGNvbHM6IFt7XG4gICAgICAgICAgICAgICAgcm93czogW2hlYWRlciwgc2lkZWJhcl1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgcm93czogW1xuICAgICAgICAgICAgICAgICAgICB0b29sYmFyLFxuICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAkc3VidmlldzogdHJ1ZVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgXVxuICAgICAgICB9O1xuICAgIH1cblxuICAgIHNob3dNZW51KCkge1xuICAgICAgICB0aGlzLiRzY29wZS5tZW51LnNob3coKTtcbiAgICAgICAgdGhpcy4kc2NvcGUuaGVhZGVyLnNob3coKTtcbiAgICAgICAgdGhpcy4kc2NvcGUuYnV0dG9uSGlkZU1lbnUuc2hvdygpO1xuXG4gICAgICAgIHRoaXMuJHNjb3BlLmJ1dHRvblNob3dNZW51LmhpZGUoKTtcbiAgICB9XG5cbiAgICBoaWRlTWVudSgpIHtcbiAgICAgICAgdGhpcy4kc2NvcGUubWVudS5oaWRlKCk7XG4gICAgICAgIHRoaXMuJHNjb3BlLmhlYWRlci5oaWRlKCk7XG4gICAgICAgIHRoaXMuJHNjb3BlLmJ1dHRvbkhpZGVNZW51LmhpZGUoKTtcblxuICAgICAgICB0aGlzLiRzY29wZS5idXR0b25TaG93TWVudS5zaG93KCk7XG4gICAgfVxuXG4gICAgaW5pdCgpIHtcbiAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xuXG4gICAgICAgIHRoaXMudXNlKHBsdWdpbnMuTWVudSwgXCJtZW51XCIpO1xuICAgICAgICB0aGlzLm1lbnUgPSB0aGlzLiQkKFwibWVudVwiKTtcbiAgICAgICAgdGhpcy5oZWFkZXIgPSB0aGlzLiQkKFwiaGVhZGVyXCIpO1xuXG4gICAgICAgIHRoaXMuYnV0dG9uU2hvd01lbnUgPSB0aGlzLiQkKFwiYnV0dG9uX3Nob3dfbWVudVwiKTtcbiAgICAgICAgdGhpcy5idXR0b25IaWRlTWVudSA9IHRoaXMuJCQoXCJidXR0b25faGlkZV9tZW51XCIpO1xuXG5cbiAgICAgICAgdGhpcy53ZWJpeC51aSh7XG4gICAgICAgICAgICB2aWV3OiBcInN1Ym1lbnVcIixcbiAgICAgICAgICAgIGlkOiBcInVzZXJfbWVudVwiLFxuICAgICAgICAgICAgYXV0b3dpZHRoOiB0cnVlLFxuICAgICAgICAgICAgZGF0YTogW11cbiAgICAgICAgfSk7XG5cbiAgICAgICAgdGhpcy51c2VyTWVudSA9ICQkKFwidXNlcl9tZW51XCIpO1xuICAgICAgICB0aGlzLnVzZXJNZW51LmF0dGFjaEV2ZW50KFwib25JdGVtQ2xpY2tcIiwgZnVuY3Rpb24gKGlkLCBlLCBub2RlKSB7XG4gICAgICAgICAgICBpZiAoaWQgPT0gXCJsb2dvdXRcIikge1xuICAgICAgICAgICAgICAgIHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gXCIvYXV0aC9sb2dvdXQ/bmV4dF91cmw9L2FkbWluXCI7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHRoaXMudXNlcm5hbWVMYWJlbCA9ICQkKFwidXNlcm5hbWVfbGFiZWxcIik7XG5cbiAgICAgICAgd2ViaXguYWpheCgpLmdldChcIi9hdXRoL2F1dGhlbnRpY2F0ZWRcIiwgZnVuY3Rpb24gKGRhdGEpIHtcbiAgICAgICAgICAgIGNvbnN0IGluZm8gPSBKU09OLnBhcnNlKGRhdGEpO1xuICAgICAgICAgICAgc2VsZi51c2VybmFtZUxhYmVsLmNvbmZpZy5sYWJlbCA9IGluZm8udXNlcm5hbWU7XG4gICAgICAgICAgICBzZWxmLnVzZXJuYW1lTGFiZWwuY29uZmlnLndpZHRoID0gd2ViaXguaHRtbC5nZXRUZXh0U2l6ZShpbmZvLnVzZXJuYW1lKSArIDEwO1xuICAgICAgICAgICAgc2VsZi51c2VybmFtZUxhYmVsLnJlZnJlc2goKTtcblxuICAgICAgICAgICAgc2VsZi51c2VyTWVudS5hZGQoeyBpZDogJ2VtYWlsJywgdmFsdWU6IGluZm8uZW1haWwgfSlcbiAgICAgICAgICAgIHNlbGYudXNlck1lbnUuYWRkKHsgaWQ6ICdsb2dvdXQnLCB2YWx1ZTogXCJMb2dvdXRcIiB9KVxuICAgICAgICB9KTtcbiAgICB9XG5cbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NvdXJjZXMvdmlld3MvbWFpbi5qcyIsImltcG9ydCB7IFNlcnZpY2UgfSBmcm9tIFwiLi4vY29tbW9uL2FwaVwiO1xuXG5jb25zdCBCQVNFX1VSTCA9IFwiL3plcm9ib3QvbXlqb2JzX3VpL2FjdG9ycy9teWpvYnNcIjtcblxuY2xhc3MgTXlqb2JzU2VydmljZSBleHRlbmRzIFNlcnZpY2Uge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICBzdXBlcihCQVNFX1VSTCk7XG4gICAgfVxuXG4gICAgbGlzdEpvYnMoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmdldENhbGwoXCJsaXN0X2pvYnNcIik7XG4gICAgfVxuXG4gICAgbGlzdFdvcmtlcnMoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmdldENhbGwoXCJsaXN0X3dvcmtlcnNcIik7XG4gICAgfVxufVxuXG5leHBvcnQgY29uc3QgbXlqb2JzID0gbmV3IE15am9ic1NlcnZpY2UoKTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NvdXJjZXMvc2VydmljZXMvbXlqb2JzLmpzIiwiaW1wb3J0IFwiLi9zdHlsZXMvYXBwLmNzc1wiO1xuaW1wb3J0IHtKZXRBcHB9IGZyb20gXCJ3ZWJpeC1qZXRcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgSW52ZW50b3J5QXBwIGV4dGVuZHMgSmV0QXBwIHtcblx0Y29uc3RydWN0b3IoY29uZmlnKXtcblx0XHRzdXBlcih3ZWJpeC5leHRlbmQoe1xuXHRcdFx0aWQ6XHRcdFx0QVBQTkFNRSxcblx0XHRcdHZlcnNpb246XHRWRVJTSU9OLFxuXHRcdFx0c3RhcnQ6XHRcdFwiL21haW4vZGFzaFwiLFxuXHRcdFx0ZGVidWc6XHRcdCFQUk9EVUNUSU9OXG5cdFx0fSwgY29uZmlnLCB0cnVlKSk7XG5cblx0XHQvKiBlcnJvciB0cmFja2luZyAqL1xuXHRcdHRoaXMuYXR0YWNoRXZlbnQoXCJhcHA6ZXJyb3I6cmVzb2x2ZVwiLCBmdW5jdGlvbihuYW1lLCBlcnJvcil7XG5cdFx0XHR3aW5kb3cuY29uc29sZS5lcnJvcihlcnJvcik7XG5cdFx0fSk7XG5cdH1cbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NvdXJjZXMvYXBwLmpzIiwiLy8gcmVtb3ZlZCBieSBleHRyYWN0LXRleHQtd2VicGFjay1wbHVnaW5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3NvdXJjZXMvc3R5bGVzL2FwcC5jc3Ncbi8vIG1vZHVsZSBpZCA9IDI3XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsInZhciBtYXAgPSB7XG5cdFwiLi9hbGVydHNcIjogMyxcblx0XCIuL2FsZXJ0cy9cIjogMyxcblx0XCIuL2FsZXJ0cy9hbGVydFwiOiAxMyxcblx0XCIuL2FsZXJ0cy9hbGVydC5qc1wiOiAxMyxcblx0XCIuL2FsZXJ0cy9pbmRleFwiOiAzLFxuXHRcIi4vYWxlcnRzL2luZGV4LmpzXCI6IDMsXG5cdFwiLi9jb2Rlc2VydmVyXCI6IDUsXG5cdFwiLi9jb2Rlc2VydmVyL1wiOiA1LFxuXHRcIi4vY29kZXNlcnZlci9pbmRleFwiOiA1LFxuXHRcIi4vY29kZXNlcnZlci9pbmRleC5qc1wiOiA1LFxuXHRcIi4vZGFzaFwiOiA2LFxuXHRcIi4vZGFzaC9cIjogNixcblx0XCIuL2Rhc2gvZGlza1NwYWNlXCI6IDE4LFxuXHRcIi4vZGFzaC9kaXNrU3BhY2UuanNcIjogMTgsXG5cdFwiLi9kYXNoL2hlYWx0aFwiOiAxOSxcblx0XCIuL2Rhc2gvaGVhbHRoLmpzXCI6IDE5LFxuXHRcIi4vZGFzaC9pbmRleFwiOiA2LFxuXHRcIi4vZGFzaC9pbmRleC5qc1wiOiA2LFxuXHRcIi4vZGFzaC9qc3hJbmZvXCI6IDIwLFxuXHRcIi4vZGFzaC9qc3hJbmZvLmpzXCI6IDIwLFxuXHRcIi4vZGFzaC9wcm9jZXNzZXNcIjogMjEsXG5cdFwiLi9kYXNoL3Byb2Nlc3Nlcy5qc1wiOiAyMSxcblx0XCIuL2Rhc2gvcHJvY2Vzc2VzQ2hpbGRWaWV3XCI6IDE0LFxuXHRcIi4vZGFzaC9wcm9jZXNzZXNDaGlsZFZpZXcuanNcIjogMTQsXG5cdFwiLi9kYXNoL3J1bm5pbmdQb3J0c1wiOiAyMixcblx0XCIuL2Rhc2gvcnVubmluZ1BvcnRzLmpzXCI6IDIyLFxuXHRcIi4vanVweXRlclwiOiA3LFxuXHRcIi4vanVweXRlci9cIjogNyxcblx0XCIuL2p1cHl0ZXIvaW5kZXhcIjogNyxcblx0XCIuL2p1cHl0ZXIvaW5kZXguanNcIjogNyxcblx0XCIuL2xvZ3NcIjogOCxcblx0XCIuL2xvZ3MvXCI6IDgsXG5cdFwiLi9sb2dzL2FwcExvZ3NcIjogMTUsXG5cdFwiLi9sb2dzL2FwcExvZ3MuanNcIjogMTUsXG5cdFwiLi9sb2dzL2luZGV4XCI6IDgsXG5cdFwiLi9sb2dzL2luZGV4LmpzXCI6IDgsXG5cdFwiLi9tYWluXCI6IDIzLFxuXHRcIi4vbWFpbi5qc1wiOiAyMyxcblx0XCIuL215am9ic1wiOiA5LFxuXHRcIi4vbXlqb2JzL1wiOiA5LFxuXHRcIi4vbXlqb2JzL2luZGV4XCI6IDksXG5cdFwiLi9teWpvYnMvaW5kZXguanNcIjogOSxcblx0XCIuL3BhY2thZ2VzXCI6IDEwLFxuXHRcIi4vcGFja2FnZXMvXCI6IDEwLFxuXHRcIi4vcGFja2FnZXMvaW5kZXhcIjogMTAsXG5cdFwiLi9wYWNrYWdlcy9pbmRleC5qc1wiOiAxMCxcblx0XCIuL3dpa2lzXCI6IDExLFxuXHRcIi4vd2lraXMvXCI6IDExLFxuXHRcIi4vd2lraXMvaW5kZXhcIjogMTEsXG5cdFwiLi93aWtpcy9pbmRleC5qc1wiOiAxMSxcblx0XCIuL3dvcmtlcnNcIjogMTIsXG5cdFwiLi93b3JrZXJzL1wiOiAxMixcblx0XCIuL3dvcmtlcnMvaW5kZXhcIjogMTIsXG5cdFwiLi93b3JrZXJzL2luZGV4LmpzXCI6IDEyXG59O1xuZnVuY3Rpb24gd2VicGFja0NvbnRleHQocmVxKSB7XG5cdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKHdlYnBhY2tDb250ZXh0UmVzb2x2ZShyZXEpKTtcbn07XG5mdW5jdGlvbiB3ZWJwYWNrQ29udGV4dFJlc29sdmUocmVxKSB7XG5cdHZhciBpZCA9IG1hcFtyZXFdO1xuXHRpZighKGlkICsgMSkpIC8vIGNoZWNrIGZvciBudW1iZXIgb3Igc3RyaW5nXG5cdFx0dGhyb3cgbmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIiArIHJlcSArIFwiJy5cIik7XG5cdHJldHVybiBpZDtcbn07XG53ZWJwYWNrQ29udGV4dC5rZXlzID0gZnVuY3Rpb24gd2VicGFja0NvbnRleHRLZXlzKCkge1xuXHRyZXR1cm4gT2JqZWN0LmtleXMobWFwKTtcbn07XG53ZWJwYWNrQ29udGV4dC5yZXNvbHZlID0gd2VicGFja0NvbnRleHRSZXNvbHZlO1xubW9kdWxlLmV4cG9ydHMgPSB3ZWJwYWNrQ29udGV4dDtcbndlYnBhY2tDb250ZXh0LmlkID0gMjg7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9zb3VyY2VzL3ZpZXdzIF5cXC5cXC8uKiRcbi8vIG1vZHVsZSBpZCA9IDI4XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8qICBhbnNpX3VwLmpzXG4gKiAgYXV0aG9yIDogRHJ1IE5lbHNvblxuICogIGxpY2Vuc2UgOiBNSVRcbiAqICBodHRwOi8vZ2l0aHViLmNvbS9kcnVkcnUvYW5zaV91cFxuICovXG4oZnVuY3Rpb24gKHJvb3QsIGZhY3RvcnkpIHtcbiAgICBpZiAodHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kKSB7XG4gICAgICAgIC8vIEFNRC4gUmVnaXN0ZXIgYXMgYW4gYW5vbnltb3VzIG1vZHVsZS5cbiAgICAgICAgZGVmaW5lKFsnZXhwb3J0cyddLCBmYWN0b3J5KTtcbiAgICB9IGVsc2UgaWYgKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0JyAmJiB0eXBlb2YgZXhwb3J0cy5ub2RlTmFtZSAhPT0gJ3N0cmluZycpIHtcbiAgICAgICAgLy8gQ29tbW9uSlNcbiAgICAgICAgZmFjdG9yeShleHBvcnRzKTtcbiAgICB9IGVsc2Uge1xuICAgICAgICAvLyBCcm93c2VyIGdsb2JhbHNcbiAgICAgICAgdmFyIGV4cCA9IHt9O1xuICAgICAgICBmYWN0b3J5KGV4cCk7XG4gICAgICAgIHJvb3QuQW5zaVVwID0gZXhwLmRlZmF1bHQ7XG4gICAgfVxufSh0aGlzLCBmdW5jdGlvbiAoZXhwb3J0cykge1xuXCJ1c2Ugc3RyaWN0XCI7XG52YXIgX19tYWtlVGVtcGxhdGVPYmplY3QgPSAodGhpcyAmJiB0aGlzLl9fbWFrZVRlbXBsYXRlT2JqZWN0KSB8fCBmdW5jdGlvbiAoY29va2VkLCByYXcpIHtcbiAgICBpZiAoT2JqZWN0LmRlZmluZVByb3BlcnR5KSB7IE9iamVjdC5kZWZpbmVQcm9wZXJ0eShjb29rZWQsIFwicmF3XCIsIHsgdmFsdWU6IHJhdyB9KTsgfSBlbHNlIHsgY29va2VkLnJhdyA9IHJhdzsgfVxuICAgIHJldHVybiBjb29rZWQ7XG59O1xudmFyIFBhY2tldEtpbmQ7XG4oZnVuY3Rpb24gKFBhY2tldEtpbmQpIHtcbiAgICBQYWNrZXRLaW5kW1BhY2tldEtpbmRbXCJFT1NcIl0gPSAwXSA9IFwiRU9TXCI7XG4gICAgUGFja2V0S2luZFtQYWNrZXRLaW5kW1wiVGV4dFwiXSA9IDFdID0gXCJUZXh0XCI7XG4gICAgUGFja2V0S2luZFtQYWNrZXRLaW5kW1wiSW5jb21wbGV0ZVwiXSA9IDJdID0gXCJJbmNvbXBsZXRlXCI7XG4gICAgUGFja2V0S2luZFtQYWNrZXRLaW5kW1wiRVNDXCJdID0gM10gPSBcIkVTQ1wiO1xuICAgIFBhY2tldEtpbmRbUGFja2V0S2luZFtcIlVua25vd25cIl0gPSA0XSA9IFwiVW5rbm93blwiO1xuICAgIFBhY2tldEtpbmRbUGFja2V0S2luZFtcIlNHUlwiXSA9IDVdID0gXCJTR1JcIjtcbiAgICBQYWNrZXRLaW5kW1BhY2tldEtpbmRbXCJPU0NVUkxcIl0gPSA2XSA9IFwiT1NDVVJMXCI7XG59KShQYWNrZXRLaW5kIHx8IChQYWNrZXRLaW5kID0ge30pKTtcbnZhciBBbnNpVXAgPSAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIEFuc2lVcCgpIHtcbiAgICAgICAgdGhpcy5WRVJTSU9OID0gXCI0LjAuNFwiO1xuICAgICAgICB0aGlzLnNldHVwX3BhbGV0dGVzKCk7XG4gICAgICAgIHRoaXMuX3VzZV9jbGFzc2VzID0gZmFsc2U7XG4gICAgICAgIHRoaXMuX2VzY2FwZV9mb3JfaHRtbCA9IHRydWU7XG4gICAgICAgIHRoaXMuYm9sZCA9IGZhbHNlO1xuICAgICAgICB0aGlzLmZnID0gdGhpcy5iZyA9IG51bGw7XG4gICAgICAgIHRoaXMuX2J1ZmZlciA9ICcnO1xuICAgICAgICB0aGlzLl91cmxfd2hpdGVsaXN0ID0geyAnaHR0cCc6IDEsICdodHRwcyc6IDEgfTtcbiAgICB9XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KEFuc2lVcC5wcm90b3R5cGUsIFwidXNlX2NsYXNzZXNcIiwge1xuICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl91c2VfY2xhc3NlcztcbiAgICAgICAgfSxcbiAgICAgICAgc2V0OiBmdW5jdGlvbiAoYXJnKSB7XG4gICAgICAgICAgICB0aGlzLl91c2VfY2xhc3NlcyA9IGFyZztcbiAgICAgICAgfSxcbiAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlXG4gICAgfSk7XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KEFuc2lVcC5wcm90b3R5cGUsIFwiZXNjYXBlX2Zvcl9odG1sXCIsIHtcbiAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fZXNjYXBlX2Zvcl9odG1sO1xuICAgICAgICB9LFxuICAgICAgICBzZXQ6IGZ1bmN0aW9uIChhcmcpIHtcbiAgICAgICAgICAgIHRoaXMuX2VzY2FwZV9mb3JfaHRtbCA9IGFyZztcbiAgICAgICAgfSxcbiAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlXG4gICAgfSk7XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KEFuc2lVcC5wcm90b3R5cGUsIFwidXJsX3doaXRlbGlzdFwiLCB7XG4gICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3VybF93aGl0ZWxpc3Q7XG4gICAgICAgIH0sXG4gICAgICAgIHNldDogZnVuY3Rpb24gKGFyZykge1xuICAgICAgICAgICAgdGhpcy5fdXJsX3doaXRlbGlzdCA9IGFyZztcbiAgICAgICAgfSxcbiAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlXG4gICAgfSk7XG4gICAgQW5zaVVwLnByb3RvdHlwZS5zZXR1cF9wYWxldHRlcyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAgICAgdGhpcy5hbnNpX2NvbG9ycyA9XG4gICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAgICAgICB7IHJnYjogWzAsIDAsIDBdLCBjbGFzc19uYW1lOiBcImFuc2ktYmxhY2tcIiB9LFxuICAgICAgICAgICAgICAgICAgICB7IHJnYjogWzE4NywgMCwgMF0sIGNsYXNzX25hbWU6IFwiYW5zaS1yZWRcIiB9LFxuICAgICAgICAgICAgICAgICAgICB7IHJnYjogWzAsIDE4NywgMF0sIGNsYXNzX25hbWU6IFwiYW5zaS1ncmVlblwiIH0sXG4gICAgICAgICAgICAgICAgICAgIHsgcmdiOiBbMTg3LCAxODcsIDBdLCBjbGFzc19uYW1lOiBcImFuc2kteWVsbG93XCIgfSxcbiAgICAgICAgICAgICAgICAgICAgeyByZ2I6IFswLCAwLCAxODddLCBjbGFzc19uYW1lOiBcImFuc2ktYmx1ZVwiIH0sXG4gICAgICAgICAgICAgICAgICAgIHsgcmdiOiBbMTg3LCAwLCAxODddLCBjbGFzc19uYW1lOiBcImFuc2ktbWFnZW50YVwiIH0sXG4gICAgICAgICAgICAgICAgICAgIHsgcmdiOiBbMCwgMTg3LCAxODddLCBjbGFzc19uYW1lOiBcImFuc2ktY3lhblwiIH0sXG4gICAgICAgICAgICAgICAgICAgIHsgcmdiOiBbMjU1LCAyNTUsIDI1NV0sIGNsYXNzX25hbWU6IFwiYW5zaS13aGl0ZVwiIH1cbiAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgICAgICAgeyByZ2I6IFs4NSwgODUsIDg1XSwgY2xhc3NfbmFtZTogXCJhbnNpLWJyaWdodC1ibGFja1wiIH0sXG4gICAgICAgICAgICAgICAgICAgIHsgcmdiOiBbMjU1LCA4NSwgODVdLCBjbGFzc19uYW1lOiBcImFuc2ktYnJpZ2h0LXJlZFwiIH0sXG4gICAgICAgICAgICAgICAgICAgIHsgcmdiOiBbMCwgMjU1LCAwXSwgY2xhc3NfbmFtZTogXCJhbnNpLWJyaWdodC1ncmVlblwiIH0sXG4gICAgICAgICAgICAgICAgICAgIHsgcmdiOiBbMjU1LCAyNTUsIDg1XSwgY2xhc3NfbmFtZTogXCJhbnNpLWJyaWdodC15ZWxsb3dcIiB9LFxuICAgICAgICAgICAgICAgICAgICB7IHJnYjogWzg1LCA4NSwgMjU1XSwgY2xhc3NfbmFtZTogXCJhbnNpLWJyaWdodC1ibHVlXCIgfSxcbiAgICAgICAgICAgICAgICAgICAgeyByZ2I6IFsyNTUsIDg1LCAyNTVdLCBjbGFzc19uYW1lOiBcImFuc2ktYnJpZ2h0LW1hZ2VudGFcIiB9LFxuICAgICAgICAgICAgICAgICAgICB7IHJnYjogWzg1LCAyNTUsIDI1NV0sIGNsYXNzX25hbWU6IFwiYW5zaS1icmlnaHQtY3lhblwiIH0sXG4gICAgICAgICAgICAgICAgICAgIHsgcmdiOiBbMjU1LCAyNTUsIDI1NV0sIGNsYXNzX25hbWU6IFwiYW5zaS1icmlnaHQtd2hpdGVcIiB9XG4gICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgXTtcbiAgICAgICAgdGhpcy5wYWxldHRlXzI1NiA9IFtdO1xuICAgICAgICB0aGlzLmFuc2lfY29sb3JzLmZvckVhY2goZnVuY3Rpb24gKHBhbGV0dGUpIHtcbiAgICAgICAgICAgIHBhbGV0dGUuZm9yRWFjaChmdW5jdGlvbiAocmVjKSB7XG4gICAgICAgICAgICAgICAgX3RoaXMucGFsZXR0ZV8yNTYucHVzaChyZWMpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgICAgICB2YXIgbGV2ZWxzID0gWzAsIDk1LCAxMzUsIDE3NSwgMjE1LCAyNTVdO1xuICAgICAgICBmb3IgKHZhciByID0gMDsgciA8IDY7ICsrcikge1xuICAgICAgICAgICAgZm9yICh2YXIgZyA9IDA7IGcgPCA2OyArK2cpIHtcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBiID0gMDsgYiA8IDY7ICsrYikge1xuICAgICAgICAgICAgICAgICAgICB2YXIgY29sID0geyByZ2I6IFtsZXZlbHNbcl0sIGxldmVsc1tnXSwgbGV2ZWxzW2JdXSwgY2xhc3NfbmFtZTogJ3RydWVjb2xvcicgfTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wYWxldHRlXzI1Ni5wdXNoKGNvbCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHZhciBncmV5X2xldmVsID0gODtcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCAyNDsgKytpLCBncmV5X2xldmVsICs9IDEwKSB7XG4gICAgICAgICAgICB2YXIgZ3J5ID0geyByZ2I6IFtncmV5X2xldmVsLCBncmV5X2xldmVsLCBncmV5X2xldmVsXSwgY2xhc3NfbmFtZTogJ3RydWVjb2xvcicgfTtcbiAgICAgICAgICAgIHRoaXMucGFsZXR0ZV8yNTYucHVzaChncnkpO1xuICAgICAgICB9XG4gICAgfTtcbiAgICBBbnNpVXAucHJvdG90eXBlLmVzY2FwZV90eHRfZm9yX2h0bWwgPSBmdW5jdGlvbiAodHh0KSB7XG4gICAgICAgIHJldHVybiB0eHQucmVwbGFjZSgvWyY8Pl0vZ20sIGZ1bmN0aW9uIChzdHIpIHtcbiAgICAgICAgICAgIGlmIChzdHIgPT09IFwiJlwiKVxuICAgICAgICAgICAgICAgIHJldHVybiBcIiZhbXA7XCI7XG4gICAgICAgICAgICBpZiAoc3RyID09PSBcIjxcIilcbiAgICAgICAgICAgICAgICByZXR1cm4gXCImbHQ7XCI7XG4gICAgICAgICAgICBpZiAoc3RyID09PSBcIj5cIilcbiAgICAgICAgICAgICAgICByZXR1cm4gXCImZ3Q7XCI7XG4gICAgICAgIH0pO1xuICAgIH07XG4gICAgQW5zaVVwLnByb3RvdHlwZS5hcHBlbmRfYnVmZmVyID0gZnVuY3Rpb24gKHR4dCkge1xuICAgICAgICB2YXIgc3RyID0gdGhpcy5fYnVmZmVyICsgdHh0O1xuICAgICAgICB0aGlzLl9idWZmZXIgPSBzdHI7XG4gICAgfTtcbiAgICBBbnNpVXAucHJvdG90eXBlLmdldF9uZXh0X3BhY2tldCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIHBrdCA9IHtcbiAgICAgICAgICAgIGtpbmQ6IFBhY2tldEtpbmQuRU9TLFxuICAgICAgICAgICAgdGV4dDogJycsXG4gICAgICAgICAgICB1cmw6ICcnXG4gICAgICAgIH07XG4gICAgICAgIHZhciBsZW4gPSB0aGlzLl9idWZmZXIubGVuZ3RoO1xuICAgICAgICBpZiAobGVuID09IDApXG4gICAgICAgICAgICByZXR1cm4gcGt0O1xuICAgICAgICB2YXIgcG9zID0gdGhpcy5fYnVmZmVyLmluZGV4T2YoXCJcXHgxQlwiKTtcbiAgICAgICAgaWYgKHBvcyA9PSAtMSkge1xuICAgICAgICAgICAgcGt0LmtpbmQgPSBQYWNrZXRLaW5kLlRleHQ7XG4gICAgICAgICAgICBwa3QudGV4dCA9IHRoaXMuX2J1ZmZlcjtcbiAgICAgICAgICAgIHRoaXMuX2J1ZmZlciA9ICcnO1xuICAgICAgICAgICAgcmV0dXJuIHBrdDtcbiAgICAgICAgfVxuICAgICAgICBpZiAocG9zID4gMCkge1xuICAgICAgICAgICAgcGt0LmtpbmQgPSBQYWNrZXRLaW5kLlRleHQ7XG4gICAgICAgICAgICBwa3QudGV4dCA9IHRoaXMuX2J1ZmZlci5zbGljZSgwLCBwb3MpO1xuICAgICAgICAgICAgdGhpcy5fYnVmZmVyID0gdGhpcy5fYnVmZmVyLnNsaWNlKHBvcyk7XG4gICAgICAgICAgICByZXR1cm4gcGt0O1xuICAgICAgICB9XG4gICAgICAgIGlmIChwb3MgPT0gMCkge1xuICAgICAgICAgICAgaWYgKGxlbiA9PSAxKSB7XG4gICAgICAgICAgICAgICAgcGt0LmtpbmQgPSBQYWNrZXRLaW5kLkluY29tcGxldGU7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHBrdDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHZhciBuZXh0X2NoYXIgPSB0aGlzLl9idWZmZXIuY2hhckF0KDEpO1xuICAgICAgICAgICAgaWYgKChuZXh0X2NoYXIgIT0gJ1snKSAmJiAobmV4dF9jaGFyICE9ICddJykpIHtcbiAgICAgICAgICAgICAgICBwa3Qua2luZCA9IFBhY2tldEtpbmQuRVNDO1xuICAgICAgICAgICAgICAgIHBrdC50ZXh0ID0gdGhpcy5fYnVmZmVyLnNsaWNlKDAsIDEpO1xuICAgICAgICAgICAgICAgIHRoaXMuX2J1ZmZlciA9IHRoaXMuX2J1ZmZlci5zbGljZSgxKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gcGt0O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKG5leHRfY2hhciA9PSAnWycpIHtcbiAgICAgICAgICAgICAgICBpZiAoIXRoaXMuX2NzaV9yZWdleCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9jc2lfcmVnZXggPSByZ3goX19tYWtlVGVtcGxhdGVPYmplY3QoW1wiXFxuICAgICAgICAgICAgICAgICAgICAgICAgXiAgICAgICAgICAgICAgICAgICAgICAgICAgICMgYmVnaW5uaW5nIG9mIGxpbmVcXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgI1xcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAjIEZpcnN0IGF0dGVtcHRcXG4gICAgICAgICAgICAgICAgICAgICAgICAoPzogICAgICAgICAgICAgICAgICAgICAgICAgIyBsZWdhbCBzZXF1ZW5jZVxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgXFx1MDAxQlsgICAgICAgICAgICAgICAgICAgICAgIyBDU0lcXG4gICAgICAgICAgICAgICAgICAgICAgICAgIChbPC0/XT8pICAgICAgICAgICAgICAjIHByaXZhdGUtbW9kZSBjaGFyXFxuICAgICAgICAgICAgICAgICAgICAgICAgICAoW2Q7XSopICAgICAgICAgICAgICAgICAgICAjIGFueSBkaWdpdHMgb3Igc2VtaWNvbG9uc1xcbiAgICAgICAgICAgICAgICAgICAgICAgICAgKFsgLS9dPyAgICAgICAgICAgICAgICMgYW4gaW50ZXJtZWRpYXRlIG1vZGlmaWVyXFxuICAgICAgICAgICAgICAgICAgICAgICAgICBbQC1+XSkgICAgICAgICAgICAgICAgIyB0aGUgY29tbWFuZFxcbiAgICAgICAgICAgICAgICAgICAgICAgIClcXG4gICAgICAgICAgICAgICAgICAgICAgICB8ICAgICAgICAgICAgICAgICAgICAgICAgICAgIyBhbHRlcm5hdGUgKHNlY29uZCBhdHRlbXB0KVxcbiAgICAgICAgICAgICAgICAgICAgICAgICg/OiAgICAgICAgICAgICAgICAgICAgICAgICAjIGlsbGVnYWwgc2VxdWVuY2VcXG4gICAgICAgICAgICAgICAgICAgICAgICAgIFxcdTAwMUJbICAgICAgICAgICAgICAgICAgICAgICMgQ1NJXFxuICAgICAgICAgICAgICAgICAgICAgICAgICBbIC1+XSogICAgICAgICAgICAgICAgIyBhbnl0aGluZyBsZWdhbFxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgKFtcXDAtXFx1MDAxRjpdKSAgICAgICAgICAgICAgIyBhbnl0aGluZyBpbGxlZ2FsXFxuICAgICAgICAgICAgICAgICAgICAgICAgKVxcbiAgICAgICAgICAgICAgICAgICAgXCJdLCBbXCJcXG4gICAgICAgICAgICAgICAgICAgICAgICBeICAgICAgICAgICAgICAgICAgICAgICAgICAgIyBiZWdpbm5pbmcgb2YgbGluZVxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAjXFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICMgRmlyc3QgYXR0ZW1wdFxcbiAgICAgICAgICAgICAgICAgICAgICAgICg/OiAgICAgICAgICAgICAgICAgICAgICAgICAjIGxlZ2FsIHNlcXVlbmNlXFxuICAgICAgICAgICAgICAgICAgICAgICAgICBcXFxceDFiXFxcXFsgICAgICAgICAgICAgICAgICAgICAgIyBDU0lcXG4gICAgICAgICAgICAgICAgICAgICAgICAgIChbXFxcXHgzYy1cXFxceDNmXT8pICAgICAgICAgICAgICAjIHByaXZhdGUtbW9kZSBjaGFyXFxuICAgICAgICAgICAgICAgICAgICAgICAgICAoW1xcXFxkO10qKSAgICAgICAgICAgICAgICAgICAgIyBhbnkgZGlnaXRzIG9yIHNlbWljb2xvbnNcXG4gICAgICAgICAgICAgICAgICAgICAgICAgIChbXFxcXHgyMC1cXFxceDJmXT8gICAgICAgICAgICAgICAjIGFuIGludGVybWVkaWF0ZSBtb2RpZmllclxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgW1xcXFx4NDAtXFxcXHg3ZV0pICAgICAgICAgICAgICAgICMgdGhlIGNvbW1hbmRcXG4gICAgICAgICAgICAgICAgICAgICAgICApXFxuICAgICAgICAgICAgICAgICAgICAgICAgfCAgICAgICAgICAgICAgICAgICAgICAgICAgICMgYWx0ZXJuYXRlIChzZWNvbmQgYXR0ZW1wdClcXG4gICAgICAgICAgICAgICAgICAgICAgICAoPzogICAgICAgICAgICAgICAgICAgICAgICAgIyBpbGxlZ2FsIHNlcXVlbmNlXFxuICAgICAgICAgICAgICAgICAgICAgICAgICBcXFxceDFiXFxcXFsgICAgICAgICAgICAgICAgICAgICAgIyBDU0lcXG4gICAgICAgICAgICAgICAgICAgICAgICAgIFtcXFxceDIwLVxcXFx4N2VdKiAgICAgICAgICAgICAgICAjIGFueXRoaW5nIGxlZ2FsXFxuICAgICAgICAgICAgICAgICAgICAgICAgICAoW1xcXFx4MDAtXFxcXHgxZjpdKSAgICAgICAgICAgICAgIyBhbnl0aGluZyBpbGxlZ2FsXFxuICAgICAgICAgICAgICAgICAgICAgICAgKVxcbiAgICAgICAgICAgICAgICAgICAgXCJdKSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHZhciBtYXRjaCA9IHRoaXMuX2J1ZmZlci5tYXRjaCh0aGlzLl9jc2lfcmVnZXgpO1xuICAgICAgICAgICAgICAgIGlmIChtYXRjaCA9PT0gbnVsbCkge1xuICAgICAgICAgICAgICAgICAgICBwa3Qua2luZCA9IFBhY2tldEtpbmQuSW5jb21wbGV0ZTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHBrdDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKG1hdGNoWzRdKSB7XG4gICAgICAgICAgICAgICAgICAgIHBrdC5raW5kID0gUGFja2V0S2luZC5FU0M7XG4gICAgICAgICAgICAgICAgICAgIHBrdC50ZXh0ID0gdGhpcy5fYnVmZmVyLnNsaWNlKDAsIDEpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9idWZmZXIgPSB0aGlzLl9idWZmZXIuc2xpY2UoMSk7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBwa3Q7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmICgobWF0Y2hbMV0gIT0gJycpIHx8IChtYXRjaFszXSAhPSAnbScpKVxuICAgICAgICAgICAgICAgICAgICBwa3Qua2luZCA9IFBhY2tldEtpbmQuVW5rbm93bjtcbiAgICAgICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgICAgIHBrdC5raW5kID0gUGFja2V0S2luZC5TR1I7XG4gICAgICAgICAgICAgICAgcGt0LnRleHQgPSBtYXRjaFsyXTtcbiAgICAgICAgICAgICAgICB2YXIgcnBvcyA9IG1hdGNoWzBdLmxlbmd0aDtcbiAgICAgICAgICAgICAgICB0aGlzLl9idWZmZXIgPSB0aGlzLl9idWZmZXIuc2xpY2UocnBvcyk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHBrdDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChuZXh0X2NoYXIgPT0gJ10nKSB7XG4gICAgICAgICAgICAgICAgaWYgKGxlbiA8IDQpIHtcbiAgICAgICAgICAgICAgICAgICAgcGt0LmtpbmQgPSBQYWNrZXRLaW5kLkluY29tcGxldGU7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBwa3Q7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmICgodGhpcy5fYnVmZmVyLmNoYXJBdCgyKSAhPSAnOCcpXG4gICAgICAgICAgICAgICAgICAgIHx8ICh0aGlzLl9idWZmZXIuY2hhckF0KDMpICE9ICc7JykpIHtcbiAgICAgICAgICAgICAgICAgICAgcGt0LmtpbmQgPSBQYWNrZXRLaW5kLkVTQztcbiAgICAgICAgICAgICAgICAgICAgcGt0LnRleHQgPSB0aGlzLl9idWZmZXIuc2xpY2UoMCwgMSk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2J1ZmZlciA9IHRoaXMuX2J1ZmZlci5zbGljZSgxKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHBrdDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKCF0aGlzLl9vc2Nfc3QpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fb3NjX3N0ID0gcmd4RyhfX21ha2VUZW1wbGF0ZU9iamVjdChbXCJcXG4gICAgICAgICAgICAgICAgICAgICAgICAoPzogICAgICAgICAgICAgICAgICAgICAgICAgIyBsZWdhbCBzZXF1ZW5jZVxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgKFxcdTAwMUJcXFxcKSAgICAgICAgICAgICAgICAgICAgIyBFU0MgICAgICAgICAgICAgICAgICAgICAgICAgICB8ICAgICAgICAgICAgICAgICAgICAgICAgICAgIyBhbHRlcm5hdGVcXG4gICAgICAgICAgICAgICAgICAgICAgICAgIChcXHUwMDA3KSAgICAgICAgICAgICAgICAgICAgICAjIEJFTCAod2hhdCB4dGVybSBkaWQpXFxuICAgICAgICAgICAgICAgICAgICAgICAgKVxcbiAgICAgICAgICAgICAgICAgICAgICAgIHwgICAgICAgICAgICAgICAgICAgICAgICAgICAjIGFsdGVybmF0ZSAoc2Vjb25kIGF0dGVtcHQpXFxuICAgICAgICAgICAgICAgICAgICAgICAgKCAgICAgICAgICAgICAgICAgICAgICAgICAgICMgaWxsZWdhbCBzZXF1ZW5jZVxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgW1xcMC1cXHUwMDA2XSAgICAgICAgICAgICAgICAgIyBhbnl0aGluZyBpbGxlZ2FsXFxuICAgICAgICAgICAgICAgICAgICAgICAgICB8ICAgICAgICAgICAgICAgICAgICAgICAgICAgIyBhbHRlcm5hdGVcXG4gICAgICAgICAgICAgICAgICAgICAgICAgIFtcXGItXFx1MDAxQV0gICAgICAgICAgICAgICAgICMgYW55dGhpbmcgaWxsZWdhbFxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgfCAgICAgICAgICAgICAgICAgICAgICAgICAgICMgYWx0ZXJuYXRlXFxuICAgICAgICAgICAgICAgICAgICAgICAgICBbXFx1MDAxQy1cXHUwMDFGXSAgICAgICAgICAgICAgICAgIyBhbnl0aGluZyBpbGxlZ2FsXFxuICAgICAgICAgICAgICAgICAgICAgICAgKVxcbiAgICAgICAgICAgICAgICAgICAgXCJdLCBbXCJcXG4gICAgICAgICAgICAgICAgICAgICAgICAoPzogICAgICAgICAgICAgICAgICAgICAgICAgIyBsZWdhbCBzZXF1ZW5jZVxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgKFxcXFx4MWJcXFxcXFxcXCkgICAgICAgICAgICAgICAgICAgICMgRVNDIFxcXFxcXG4gICAgICAgICAgICAgICAgICAgICAgICAgIHwgICAgICAgICAgICAgICAgICAgICAgICAgICAjIGFsdGVybmF0ZVxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgKFxcXFx4MDcpICAgICAgICAgICAgICAgICAgICAgICMgQkVMICh3aGF0IHh0ZXJtIGRpZClcXG4gICAgICAgICAgICAgICAgICAgICAgICApXFxuICAgICAgICAgICAgICAgICAgICAgICAgfCAgICAgICAgICAgICAgICAgICAgICAgICAgICMgYWx0ZXJuYXRlIChzZWNvbmQgYXR0ZW1wdClcXG4gICAgICAgICAgICAgICAgICAgICAgICAoICAgICAgICAgICAgICAgICAgICAgICAgICAgIyBpbGxlZ2FsIHNlcXVlbmNlXFxuICAgICAgICAgICAgICAgICAgICAgICAgICBbXFxcXHgwMC1cXFxceDA2XSAgICAgICAgICAgICAgICAgIyBhbnl0aGluZyBpbGxlZ2FsXFxuICAgICAgICAgICAgICAgICAgICAgICAgICB8ICAgICAgICAgICAgICAgICAgICAgICAgICAgIyBhbHRlcm5hdGVcXG4gICAgICAgICAgICAgICAgICAgICAgICAgIFtcXFxceDA4LVxcXFx4MWFdICAgICAgICAgICAgICAgICAjIGFueXRoaW5nIGlsbGVnYWxcXG4gICAgICAgICAgICAgICAgICAgICAgICAgIHwgICAgICAgICAgICAgICAgICAgICAgICAgICAjIGFsdGVybmF0ZVxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgW1xcXFx4MWMtXFxcXHgxZl0gICAgICAgICAgICAgICAgICMgYW55dGhpbmcgaWxsZWdhbFxcbiAgICAgICAgICAgICAgICAgICAgICAgIClcXG4gICAgICAgICAgICAgICAgICAgIFwiXSkpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB0aGlzLl9vc2Nfc3QubGFzdEluZGV4ID0gMDtcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBtYXRjaF8xID0gdGhpcy5fb3NjX3N0LmV4ZWModGhpcy5fYnVmZmVyKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKG1hdGNoXzEgPT09IG51bGwpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHBrdC5raW5kID0gUGFja2V0S2luZC5JbmNvbXBsZXRlO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHBrdDtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBpZiAobWF0Y2hfMVszXSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcGt0LmtpbmQgPSBQYWNrZXRLaW5kLkVTQztcbiAgICAgICAgICAgICAgICAgICAgICAgIHBrdC50ZXh0ID0gdGhpcy5fYnVmZmVyLnNsaWNlKDAsIDEpO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fYnVmZmVyID0gdGhpcy5fYnVmZmVyLnNsaWNlKDEpO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHBrdDtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBtYXRjaF8yID0gdGhpcy5fb3NjX3N0LmV4ZWModGhpcy5fYnVmZmVyKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKG1hdGNoXzIgPT09IG51bGwpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHBrdC5raW5kID0gUGFja2V0S2luZC5JbmNvbXBsZXRlO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHBrdDtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBpZiAobWF0Y2hfMlszXSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcGt0LmtpbmQgPSBQYWNrZXRLaW5kLkVTQztcbiAgICAgICAgICAgICAgICAgICAgICAgIHBrdC50ZXh0ID0gdGhpcy5fYnVmZmVyLnNsaWNlKDAsIDEpO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fYnVmZmVyID0gdGhpcy5fYnVmZmVyLnNsaWNlKDEpO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHBrdDtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAoIXRoaXMuX29zY19yZWdleCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9vc2NfcmVnZXggPSByZ3goX19tYWtlVGVtcGxhdGVPYmplY3QoW1wiXFxuICAgICAgICAgICAgICAgICAgICAgICAgXiAgICAgICAgICAgICAgICAgICAgICAgICAgICMgYmVnaW5uaW5nIG9mIGxpbmVcXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgI1xcbiAgICAgICAgICAgICAgICAgICAgICAgIFxcdTAwMUJdODsgICAgICAgICAgICAgICAgICAgICMgT1NDIEh5cGVybGlua1xcbiAgICAgICAgICAgICAgICAgICAgICAgIFsgLTo8LX5dKiAgICAgICAjIHBhcmFtcyAoZXhjbHVkaW5nIDspXFxuICAgICAgICAgICAgICAgICAgICAgICAgOyAgICAgICAgICAgICAgICAgICAgICAgICAgICMgZW5kIG9mIHBhcmFtc1xcbiAgICAgICAgICAgICAgICAgICAgICAgIChbIS1+XXswLDUxMn0pICAgICAgICAjIFVSTCBjYXB0dXJlXFxuICAgICAgICAgICAgICAgICAgICAgICAgKD86ICAgICAgICAgICAgICAgICAgICAgICAgICMgU1RcXG4gICAgICAgICAgICAgICAgICAgICAgICAgICg/OlxcdTAwMUJcXFxcKSAgICAgICAgICAgICAgICAgICMgRVNDICAgICAgICAgICAgICAgICAgICAgICAgICAgfCAgICAgICAgICAgICAgICAgICAgICAgICAgICMgYWx0ZXJuYXRlXFxuICAgICAgICAgICAgICAgICAgICAgICAgICAoPzpcXHUwMDA3KSAgICAgICAgICAgICAgICAgICAgIyBCRUwgKHdoYXQgeHRlcm0gZGlkKVxcbiAgICAgICAgICAgICAgICAgICAgICAgIClcXG4gICAgICAgICAgICAgICAgICAgICAgICAoWyEtfl0rKSAgICAgICAgICAgICAgIyBURVhUIGNhcHR1cmVcXG4gICAgICAgICAgICAgICAgICAgICAgICBcXHUwMDFCXTg7OyAgICAgICAgICAgICAgICAgICAjIE9TQyBIeXBlcmxpbmsgRW5kXFxuICAgICAgICAgICAgICAgICAgICAgICAgKD86ICAgICAgICAgICAgICAgICAgICAgICAgICMgU1RcXG4gICAgICAgICAgICAgICAgICAgICAgICAgICg/OlxcdTAwMUJcXFxcKSAgICAgICAgICAgICAgICAgICMgRVNDICAgICAgICAgICAgICAgICAgICAgICAgICAgfCAgICAgICAgICAgICAgICAgICAgICAgICAgICMgYWx0ZXJuYXRlXFxuICAgICAgICAgICAgICAgICAgICAgICAgICAoPzpcXHUwMDA3KSAgICAgICAgICAgICAgICAgICAgIyBCRUwgKHdoYXQgeHRlcm0gZGlkKVxcbiAgICAgICAgICAgICAgICAgICAgICAgIClcXG4gICAgICAgICAgICAgICAgICAgIFwiXSwgW1wiXFxuICAgICAgICAgICAgICAgICAgICAgICAgXiAgICAgICAgICAgICAgICAgICAgICAgICAgICMgYmVnaW5uaW5nIG9mIGxpbmVcXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgI1xcbiAgICAgICAgICAgICAgICAgICAgICAgIFxcXFx4MWJcXFxcXTg7ICAgICAgICAgICAgICAgICAgICAjIE9TQyBIeXBlcmxpbmtcXG4gICAgICAgICAgICAgICAgICAgICAgICBbXFxcXHgyMC1cXFxceDNhXFxcXHgzYy1cXFxceDdlXSogICAgICAgIyBwYXJhbXMgKGV4Y2x1ZGluZyA7KVxcbiAgICAgICAgICAgICAgICAgICAgICAgIDsgICAgICAgICAgICAgICAgICAgICAgICAgICAjIGVuZCBvZiBwYXJhbXNcXG4gICAgICAgICAgICAgICAgICAgICAgICAoW1xcXFx4MjEtXFxcXHg3ZV17MCw1MTJ9KSAgICAgICAgIyBVUkwgY2FwdHVyZVxcbiAgICAgICAgICAgICAgICAgICAgICAgICg/OiAgICAgICAgICAgICAgICAgICAgICAgICAjIFNUXFxuICAgICAgICAgICAgICAgICAgICAgICAgICAoPzpcXFxceDFiXFxcXFxcXFwpICAgICAgICAgICAgICAgICAgIyBFU0MgXFxcXFxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgfCAgICAgICAgICAgICAgICAgICAgICAgICAgICMgYWx0ZXJuYXRlXFxuICAgICAgICAgICAgICAgICAgICAgICAgICAoPzpcXFxceDA3KSAgICAgICAgICAgICAgICAgICAgIyBCRUwgKHdoYXQgeHRlcm0gZGlkKVxcbiAgICAgICAgICAgICAgICAgICAgICAgIClcXG4gICAgICAgICAgICAgICAgICAgICAgICAoW1xcXFx4MjEtXFxcXHg3ZV0rKSAgICAgICAgICAgICAgIyBURVhUIGNhcHR1cmVcXG4gICAgICAgICAgICAgICAgICAgICAgICBcXFxceDFiXFxcXF04OzsgICAgICAgICAgICAgICAgICAgIyBPU0MgSHlwZXJsaW5rIEVuZFxcbiAgICAgICAgICAgICAgICAgICAgICAgICg/OiAgICAgICAgICAgICAgICAgICAgICAgICAjIFNUXFxuICAgICAgICAgICAgICAgICAgICAgICAgICAoPzpcXFxceDFiXFxcXFxcXFwpICAgICAgICAgICAgICAgICAgIyBFU0MgXFxcXFxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgfCAgICAgICAgICAgICAgICAgICAgICAgICAgICMgYWx0ZXJuYXRlXFxuICAgICAgICAgICAgICAgICAgICAgICAgICAoPzpcXFxceDA3KSAgICAgICAgICAgICAgICAgICAgIyBCRUwgKHdoYXQgeHRlcm0gZGlkKVxcbiAgICAgICAgICAgICAgICAgICAgICAgIClcXG4gICAgICAgICAgICAgICAgICAgIFwiXSkpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB2YXIgbWF0Y2ggPSB0aGlzLl9idWZmZXIubWF0Y2godGhpcy5fb3NjX3JlZ2V4KTtcbiAgICAgICAgICAgICAgICBpZiAobWF0Y2ggPT09IG51bGwpIHtcbiAgICAgICAgICAgICAgICAgICAgcGt0LmtpbmQgPSBQYWNrZXRLaW5kLkVTQztcbiAgICAgICAgICAgICAgICAgICAgcGt0LnRleHQgPSB0aGlzLl9idWZmZXIuc2xpY2UoMCwgMSk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2J1ZmZlciA9IHRoaXMuX2J1ZmZlci5zbGljZSgxKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHBrdDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcGt0LmtpbmQgPSBQYWNrZXRLaW5kLk9TQ1VSTDtcbiAgICAgICAgICAgICAgICBwa3QudXJsID0gbWF0Y2hbMV07XG4gICAgICAgICAgICAgICAgcGt0LnRleHQgPSBtYXRjaFsyXTtcbiAgICAgICAgICAgICAgICB2YXIgcnBvcyA9IG1hdGNoWzBdLmxlbmd0aDtcbiAgICAgICAgICAgICAgICB0aGlzLl9idWZmZXIgPSB0aGlzLl9idWZmZXIuc2xpY2UocnBvcyk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHBrdDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH07XG4gICAgQW5zaVVwLnByb3RvdHlwZS5hbnNpX3RvX2h0bWwgPSBmdW5jdGlvbiAodHh0KSB7XG4gICAgICAgIHRoaXMuYXBwZW5kX2J1ZmZlcih0eHQpO1xuICAgICAgICB2YXIgYmxvY2tzID0gW107XG4gICAgICAgIHdoaWxlICh0cnVlKSB7XG4gICAgICAgICAgICB2YXIgcGFja2V0ID0gdGhpcy5nZXRfbmV4dF9wYWNrZXQoKTtcbiAgICAgICAgICAgIGlmICgocGFja2V0LmtpbmQgPT0gUGFja2V0S2luZC5FT1MpXG4gICAgICAgICAgICAgICAgfHwgKHBhY2tldC5raW5kID09IFBhY2tldEtpbmQuSW5jb21wbGV0ZSkpXG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBpZiAoKHBhY2tldC5raW5kID09IFBhY2tldEtpbmQuRVNDKVxuICAgICAgICAgICAgICAgIHx8IChwYWNrZXQua2luZCA9PSBQYWNrZXRLaW5kLlVua25vd24pKVxuICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgaWYgKHBhY2tldC5raW5kID09IFBhY2tldEtpbmQuVGV4dClcbiAgICAgICAgICAgICAgICBibG9ja3MucHVzaCh0aGlzLnRyYW5zZm9ybV90b19odG1sKHRoaXMud2l0aF9zdGF0ZShwYWNrZXQpKSk7XG4gICAgICAgICAgICBlbHNlIGlmIChwYWNrZXQua2luZCA9PSBQYWNrZXRLaW5kLlNHUilcbiAgICAgICAgICAgICAgICB0aGlzLnByb2Nlc3NfYW5zaShwYWNrZXQpO1xuICAgICAgICAgICAgZWxzZSBpZiAocGFja2V0LmtpbmQgPT0gUGFja2V0S2luZC5PU0NVUkwpXG4gICAgICAgICAgICAgICAgYmxvY2tzLnB1c2godGhpcy5wcm9jZXNzX2h5cGVybGluayhwYWNrZXQpKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gYmxvY2tzLmpvaW4oXCJcIik7XG4gICAgfTtcbiAgICBBbnNpVXAucHJvdG90eXBlLndpdGhfc3RhdGUgPSBmdW5jdGlvbiAocGt0KSB7XG4gICAgICAgIHJldHVybiB7IGJvbGQ6IHRoaXMuYm9sZCwgZmc6IHRoaXMuZmcsIGJnOiB0aGlzLmJnLCB0ZXh0OiBwa3QudGV4dCB9O1xuICAgIH07XG4gICAgQW5zaVVwLnByb3RvdHlwZS5wcm9jZXNzX2Fuc2kgPSBmdW5jdGlvbiAocGt0KSB7XG4gICAgICAgIHZhciBzZ3JfY21kcyA9IHBrdC50ZXh0LnNwbGl0KCc7Jyk7XG4gICAgICAgIHdoaWxlIChzZ3JfY21kcy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICB2YXIgc2dyX2NtZF9zdHIgPSBzZ3JfY21kcy5zaGlmdCgpO1xuICAgICAgICAgICAgdmFyIG51bSA9IHBhcnNlSW50KHNncl9jbWRfc3RyLCAxMCk7XG4gICAgICAgICAgICBpZiAoaXNOYU4obnVtKSB8fCBudW0gPT09IDApIHtcbiAgICAgICAgICAgICAgICB0aGlzLmZnID0gdGhpcy5iZyA9IG51bGw7XG4gICAgICAgICAgICAgICAgdGhpcy5ib2xkID0gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmIChudW0gPT09IDEpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmJvbGQgPSB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAobnVtID09PSAyMikge1xuICAgICAgICAgICAgICAgIHRoaXMuYm9sZCA9IGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAobnVtID09PSAzOSkge1xuICAgICAgICAgICAgICAgIHRoaXMuZmcgPSBudWxsO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAobnVtID09PSA0OSkge1xuICAgICAgICAgICAgICAgIHRoaXMuYmcgPSBudWxsO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAoKG51bSA+PSAzMCkgJiYgKG51bSA8IDM4KSkge1xuICAgICAgICAgICAgICAgIHRoaXMuZmcgPSB0aGlzLmFuc2lfY29sb3JzWzBdWyhudW0gLSAzMCldO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAoKG51bSA+PSA0MCkgJiYgKG51bSA8IDQ4KSkge1xuICAgICAgICAgICAgICAgIHRoaXMuYmcgPSB0aGlzLmFuc2lfY29sb3JzWzBdWyhudW0gLSA0MCldO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAoKG51bSA+PSA5MCkgJiYgKG51bSA8IDk4KSkge1xuICAgICAgICAgICAgICAgIHRoaXMuZmcgPSB0aGlzLmFuc2lfY29sb3JzWzFdWyhudW0gLSA5MCldO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAoKG51bSA+PSAxMDApICYmIChudW0gPCAxMDgpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5iZyA9IHRoaXMuYW5zaV9jb2xvcnNbMV1bKG51bSAtIDEwMCldO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAobnVtID09PSAzOCB8fCBudW0gPT09IDQ4KSB7XG4gICAgICAgICAgICAgICAgaWYgKHNncl9jbWRzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGlzX2ZvcmVncm91bmQgPSAobnVtID09PSAzOCk7XG4gICAgICAgICAgICAgICAgICAgIHZhciBtb2RlX2NtZCA9IHNncl9jbWRzLnNoaWZ0KCk7XG4gICAgICAgICAgICAgICAgICAgIGlmIChtb2RlX2NtZCA9PT0gJzUnICYmIHNncl9jbWRzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBwYWxldHRlX2luZGV4ID0gcGFyc2VJbnQoc2dyX2NtZHMuc2hpZnQoKSwgMTApO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHBhbGV0dGVfaW5kZXggPj0gMCAmJiBwYWxldHRlX2luZGV4IDw9IDI1NSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpc19mb3JlZ3JvdW5kKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmZnID0gdGhpcy5wYWxldHRlXzI1NltwYWxldHRlX2luZGV4XTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuYmcgPSB0aGlzLnBhbGV0dGVfMjU2W3BhbGV0dGVfaW5kZXhdO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGlmIChtb2RlX2NtZCA9PT0gJzInICYmIHNncl9jbWRzLmxlbmd0aCA+IDIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciByID0gcGFyc2VJbnQoc2dyX2NtZHMuc2hpZnQoKSwgMTApO1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGcgPSBwYXJzZUludChzZ3JfY21kcy5zaGlmdCgpLCAxMCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgYiA9IHBhcnNlSW50KHNncl9jbWRzLnNoaWZ0KCksIDEwKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICgociA+PSAwICYmIHIgPD0gMjU1KSAmJiAoZyA+PSAwICYmIGcgPD0gMjU1KSAmJiAoYiA+PSAwICYmIGIgPD0gMjU1KSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBjID0geyByZ2I6IFtyLCBnLCBiXSwgY2xhc3NfbmFtZTogJ3RydWVjb2xvcicgfTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoaXNfZm9yZWdyb3VuZClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5mZyA9IGM7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmJnID0gYztcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH07XG4gICAgQW5zaVVwLnByb3RvdHlwZS50cmFuc2Zvcm1fdG9faHRtbCA9IGZ1bmN0aW9uIChmcmFnbWVudCkge1xuICAgICAgICB2YXIgdHh0ID0gZnJhZ21lbnQudGV4dDtcbiAgICAgICAgaWYgKHR4dC5sZW5ndGggPT09IDApXG4gICAgICAgICAgICByZXR1cm4gdHh0O1xuICAgICAgICBpZiAodGhpcy5fZXNjYXBlX2Zvcl9odG1sKVxuICAgICAgICAgICAgdHh0ID0gdGhpcy5lc2NhcGVfdHh0X2Zvcl9odG1sKHR4dCk7XG4gICAgICAgIGlmICghZnJhZ21lbnQuYm9sZCAmJiBmcmFnbWVudC5mZyA9PT0gbnVsbCAmJiBmcmFnbWVudC5iZyA9PT0gbnVsbClcbiAgICAgICAgICAgIHJldHVybiB0eHQ7XG4gICAgICAgIHZhciBzdHlsZXMgPSBbXTtcbiAgICAgICAgdmFyIGNsYXNzZXMgPSBbXTtcbiAgICAgICAgdmFyIGZnID0gZnJhZ21lbnQuZmc7XG4gICAgICAgIHZhciBiZyA9IGZyYWdtZW50LmJnO1xuICAgICAgICBpZiAoZnJhZ21lbnQuYm9sZClcbiAgICAgICAgICAgIHN0eWxlcy5wdXNoKCdmb250LXdlaWdodDpib2xkJyk7XG4gICAgICAgIGlmICghdGhpcy5fdXNlX2NsYXNzZXMpIHtcbiAgICAgICAgICAgIGlmIChmZylcbiAgICAgICAgICAgICAgICBzdHlsZXMucHVzaChcImNvbG9yOnJnYihcIiArIGZnLnJnYi5qb2luKCcsJykgKyBcIilcIik7XG4gICAgICAgICAgICBpZiAoYmcpXG4gICAgICAgICAgICAgICAgc3R5bGVzLnB1c2goXCJiYWNrZ3JvdW5kLWNvbG9yOnJnYihcIiArIGJnLnJnYiArIFwiKVwiKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGlmIChmZykge1xuICAgICAgICAgICAgICAgIGlmIChmZy5jbGFzc19uYW1lICE9PSAndHJ1ZWNvbG9yJykge1xuICAgICAgICAgICAgICAgICAgICBjbGFzc2VzLnB1c2goZmcuY2xhc3NfbmFtZSArIFwiLWZnXCIpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgc3R5bGVzLnB1c2goXCJjb2xvcjpyZ2IoXCIgKyBmZy5yZ2Iuam9pbignLCcpICsgXCIpXCIpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChiZykge1xuICAgICAgICAgICAgICAgIGlmIChiZy5jbGFzc19uYW1lICE9PSAndHJ1ZWNvbG9yJykge1xuICAgICAgICAgICAgICAgICAgICBjbGFzc2VzLnB1c2goYmcuY2xhc3NfbmFtZSArIFwiLWJnXCIpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgc3R5bGVzLnB1c2goXCJiYWNrZ3JvdW5kLWNvbG9yOnJnYihcIiArIGJnLnJnYi5qb2luKCcsJykgKyBcIilcIik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHZhciBjbGFzc19zdHJpbmcgPSAnJztcbiAgICAgICAgdmFyIHN0eWxlX3N0cmluZyA9ICcnO1xuICAgICAgICBpZiAoY2xhc3Nlcy5sZW5ndGgpXG4gICAgICAgICAgICBjbGFzc19zdHJpbmcgPSBcIiBjbGFzcz1cXFwiXCIgKyBjbGFzc2VzLmpvaW4oJyAnKSArIFwiXFxcIlwiO1xuICAgICAgICBpZiAoc3R5bGVzLmxlbmd0aClcbiAgICAgICAgICAgIHN0eWxlX3N0cmluZyA9IFwiIHN0eWxlPVxcXCJcIiArIHN0eWxlcy5qb2luKCc7JykgKyBcIlxcXCJcIjtcbiAgICAgICAgcmV0dXJuIFwiPHNwYW5cIiArIHN0eWxlX3N0cmluZyArIGNsYXNzX3N0cmluZyArIFwiPlwiICsgdHh0ICsgXCI8L3NwYW4+XCI7XG4gICAgfTtcbiAgICA7XG4gICAgQW5zaVVwLnByb3RvdHlwZS5wcm9jZXNzX2h5cGVybGluayA9IGZ1bmN0aW9uIChwa3QpIHtcbiAgICAgICAgdmFyIHBhcnRzID0gcGt0LnVybC5zcGxpdCgnOicpO1xuICAgICAgICBpZiAocGFydHMubGVuZ3RoIDwgMSlcbiAgICAgICAgICAgIHJldHVybiAnJztcbiAgICAgICAgaWYgKCF0aGlzLl91cmxfd2hpdGVsaXN0W3BhcnRzWzBdXSlcbiAgICAgICAgICAgIHJldHVybiAnJztcbiAgICAgICAgdmFyIHJlc3VsdCA9IFwiPGEgaHJlZj1cXFwiXCIgKyB0aGlzLmVzY2FwZV90eHRfZm9yX2h0bWwocGt0LnVybCkgKyBcIlxcXCI+XCIgKyB0aGlzLmVzY2FwZV90eHRfZm9yX2h0bWwocGt0LnRleHQpICsgXCI8L2E+XCI7XG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfTtcbiAgICByZXR1cm4gQW5zaVVwO1xufSgpKTtcbmZ1bmN0aW9uIHJneCh0bXBsT2JqKSB7XG4gICAgdmFyIHN1YnN0ID0gW107XG4gICAgZm9yICh2YXIgX2kgPSAxOyBfaSA8IGFyZ3VtZW50cy5sZW5ndGg7IF9pKyspIHtcbiAgICAgICAgc3Vic3RbX2kgLSAxXSA9IGFyZ3VtZW50c1tfaV07XG4gICAgfVxuICAgIHZhciByZWdleFRleHQgPSB0bXBsT2JqLnJhd1swXTtcbiAgICB2YXIgd3NyZ3ggPSAvXlxccyt8XFxzK1xcbnxcXHMqI1tcXHNcXFNdKj9cXG58XFxuL2dtO1xuICAgIHZhciB0eHQyID0gcmVnZXhUZXh0LnJlcGxhY2Uod3NyZ3gsICcnKTtcbiAgICByZXR1cm4gbmV3IFJlZ0V4cCh0eHQyKTtcbn1cbmZ1bmN0aW9uIHJneEcodG1wbE9iaikge1xuICAgIHZhciBzdWJzdCA9IFtdO1xuICAgIGZvciAodmFyIF9pID0gMTsgX2kgPCBhcmd1bWVudHMubGVuZ3RoOyBfaSsrKSB7XG4gICAgICAgIHN1YnN0W19pIC0gMV0gPSBhcmd1bWVudHNbX2ldO1xuICAgIH1cbiAgICB2YXIgcmVnZXhUZXh0ID0gdG1wbE9iai5yYXdbMF07XG4gICAgdmFyIHdzcmd4ID0gL15cXHMrfFxccytcXG58XFxzKiNbXFxzXFxTXSo/XFxufFxcbi9nbTtcbiAgICB2YXIgdHh0MiA9IHJlZ2V4VGV4dC5yZXBsYWNlKHdzcmd4LCAnJyk7XG4gICAgcmV0dXJuIG5ldyBSZWdFeHAodHh0MiwgJ2cnKTtcbn1cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWFuc2lfdXAuanMubWFwXG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuICAgIGV4cG9ydHMuZGVmYXVsdCA9IEFuc2lVcDtcbn0pKTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL25vZGVfbW9kdWxlcy9hbnNpX3VwL2Fuc2lfdXAuanMiLCJpbXBvcnQgeyBTZXJ2aWNlIH0gZnJvbSBcIi4uL2NvbW1vbi9hcGlcIjtcblxuY29uc3QgQkFTRV9VUkwgPSBcIi96ZXJvYm90L2FsZXJ0YS9hY3RvcnMvYWxlcnRhXCI7XG5cbmNsYXNzIEFsZXJ0c1NlcnZpY2UgZXh0ZW5kcyBTZXJ2aWNlIHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgc3VwZXIoQkFTRV9VUkwpO1xuICAgIH1cblxuICAgIGxpc3QoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmdldENhbGwoXCJsaXN0X2FsZXJ0c1wiKTtcbiAgICB9XG5cbiAgICBkZWxldGUoaWRlbnRpZmllcnMpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucG9zdENhbGwoXCJkZWxldGVfYWxlcnRzXCIsIHtcbiAgICAgICAgICAgIGlkZW50aWZpZXJzOiBpZGVudGlmaWVyc1xuICAgICAgICB9KTtcbiAgICB9XG59XG5cbmV4cG9ydCBjb25zdCBhbGVydHMgPSBuZXcgQWxlcnRzU2VydmljZSgpO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc291cmNlcy9zZXJ2aWNlcy9hbGVydHMuanMiLCJpbXBvcnQgeyBTZXJ2aWNlIH0gZnJvbSBcIi4uL2NvbW1vbi9hcGlcIjtcblxuY29uc3QgQkFTRV9VUkwgPSBcIi96ZXJvYm90L2FkbWluL2FjdG9ycy9sb2dzXCI7XG5cbmNsYXNzIExvZ3NTZXJ2aWNlIGV4dGVuZHMgU2VydmljZSB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHN1cGVyKEJBU0VfVVJMKTtcbiAgICB9XG5cbiAgICBsaXN0QXBwcygpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0Q2FsbChcImxpc3RfYXBwc1wiKTtcbiAgICB9XG5cbiAgICBsaXN0KGFwcE5hbWUsIGxvZ0lkKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnBvc3RDYWxsKFwibGlzdFwiLCB7XG4gICAgICAgICAgICBhcHBuYW1lOiBhcHBOYW1lLFxuICAgICAgICAgICAgaWRfZnJvbTogbG9nSWRcbiAgICAgICAgfSk7XG4gICAgfVxufVxuXG5leHBvcnQgY29uc3QgbG9ncyA9IG5ldyBMb2dzU2VydmljZSgpO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc291cmNlcy9zZXJ2aWNlcy9sb2dzLmpzIiwidmFyIG1hcCA9IHtcblx0XCIuL2VuXCI6IDI1LFxuXHRcIi4vZW4uanNcIjogMjVcbn07XG5mdW5jdGlvbiB3ZWJwYWNrQ29udGV4dChyZXEpIHtcblx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18od2VicGFja0NvbnRleHRSZXNvbHZlKHJlcSkpO1xufTtcbmZ1bmN0aW9uIHdlYnBhY2tDb250ZXh0UmVzb2x2ZShyZXEpIHtcblx0dmFyIGlkID0gbWFwW3JlcV07XG5cdGlmKCEoaWQgKyAxKSkgLy8gY2hlY2sgZm9yIG51bWJlciBvciBzdHJpbmdcblx0XHR0aHJvdyBuZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiICsgcmVxICsgXCInLlwiKTtcblx0cmV0dXJuIGlkO1xufTtcbndlYnBhY2tDb250ZXh0LmtleXMgPSBmdW5jdGlvbiB3ZWJwYWNrQ29udGV4dEtleXMoKSB7XG5cdHJldHVybiBPYmplY3Qua2V5cyhtYXApO1xufTtcbndlYnBhY2tDb250ZXh0LnJlc29sdmUgPSB3ZWJwYWNrQ29udGV4dFJlc29sdmU7XG5tb2R1bGUuZXhwb3J0cyA9IHdlYnBhY2tDb250ZXh0O1xud2VicGFja0NvbnRleHQuaWQgPSAzMjtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3NvdXJjZXMvbG9jYWxlcyBeXFwuXFwvLiokXG4vLyBtb2R1bGUgaWQgPSAzMlxuLy8gbW9kdWxlIGNodW5rcyA9IDAiXSwic291cmNlUm9vdCI6IiJ9
