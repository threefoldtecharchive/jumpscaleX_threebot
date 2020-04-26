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
/******/ 	return __webpack_require__(__webpack_require__.s = 50);
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
            if (point && (typeof point === "undefined" ? "undefined" : _typeof(point)) === "object" && !(point instanceof this.webix.DataCollection) && !(point instanceof RegExp) && !(point instanceof Map)) {
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
        return __webpack_require__(52)("./" + url);
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
        var data = __webpack_require__(60)("./" + path);
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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_packages__ = __webpack_require__(34);
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
        var self = this;
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

        return {
            rows: [{
                localId: "install-packages",
                hidden: true,
                cols: [{
                    localId: "required_packages_div",
                    view: "template",
                    autoheight: true
                }, {
                    view: "button",
                    localId: "install_btn",
                    value: "Install required packages",
                    css: "webix_primary",
                    height: 50,
                    click: self.installRequiredPackages.bind(self)
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
        var promises = Object.values(this.packagesToInstall).map(function (path) {
            // add by git url
            return __WEBPACK_IMPORTED_MODULE_1__services_packages__["a" /* packages */].add(null, path);
        });

        this.installButton.disable();
        Promise.all(promises).then(function () {
            webix.message({ type: "success", text: "All required packages installed successfully, page will be reloaded in 2 seconds" });
            setInterval(function () {
                return window.location.reload(true);
            }, 2000);
        }).catch(function () {
            webix.message({ type: "error", text: "An error occurred, please try installing from packages for more details" });
        });
    };

    ExternalView.prototype.showIframe = function showIframe() {
        this.externalIframe.show();
        this.externalIframe.showProgress({ type: "icon" });
        this.externalIframe.load(this.targetUrl);
    };

    ExternalView.prototype.init = function init(view) {
        var _this2 = this;

        this.externalIframe = this.$$("iframe-external");
        this.externalIframe.disable();
        webix.extend(this.externalIframe, webix.ProgressBar);

        this.packageNames = Object.keys(this.requiredPackages); // only names

        if (!this.packageNames.length) {
            this.showIframe();
            return;
        }

        this.requiredPackagesDiv = this.$$("required_packages_div");
        this.installPackageContainer = this.$$("install-packages");
        this.installButton = this.$$("install_btn");

        // check which packages to install
        this.packagesToInstall = {};
        // try to get info about required packages
        // if any is already registered and installed, then just ignore it
        __WEBPACK_IMPORTED_MODULE_1__services_packages__["a" /* packages */].getStatus(this.packageNames).then(function (data) {
            var packageStates = data.json();

            // now go over required packages
            for (var _iterator = _this2.packageNames, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
                var _ref;

                if (_isArray) {
                    if (_i >= _iterator.length) break;
                    _ref = _iterator[_i++];
                } else {
                    _i = _iterator.next();
                    if (_i.done) break;
                    _ref = _i.value;
                }

                var name = _ref;

                // check if a required package is registered and installed
                if (packageStates[name] == STATUS_INSTALLED) {
                    continue;
                }

                _this2.packagesToInstall[name] = _this2.requiredPackages[name];
            }

            // check packages to be installed again if still need to install any of them
            var packageNamesToInstall = Object.keys(_this2.packagesToInstall);
            if (packageNamesToInstall.length) {
                _this2.installPackageContainer.show();
                _this2.externalIframe.hide();

                var names = packageNamesToInstall.join(", ");
                _this2.requiredPackagesDiv.setHTML("<div style='width:auto;text-align:center'><h3>You need to install the following required packages: " + names + "<h3/></div>");
            } else {
                _this2.installPackageContainer.hide();
                _this2.showIframe();
            }
        });
    };

    return ExternalView;
}(__WEBPACK_IMPORTED_MODULE_0_webix_jet__["b" /* JetView */]);

/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Service; });
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ajax = webix.ajax().headers({ "Content-Type": "application/json" });

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
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ErrorView", function() { return ErrorView; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_webix_jet__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__common_colors__ = __webpack_require__(8);
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
            width: 1100,
            height: 700,
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
/* 4 */
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

    HealthService.prototype.killProcessesByPid = function killProcessesByPid(ids) {
        return this.getCall('kill_processes_by_pid', ids);
    };

    HealthService.prototype.killProcessesByPort = function killProcessesByPort(ports) {
        return this.getCall('kill_processes_by_port', ports);
    };

    HealthService.prototype.getProcessDetails = function getProcessDetails(pid) {
        return this.getCall('get_process_details', pid);
    };

    return HealthService;
}(__WEBPACK_IMPORTED_MODULE_0__common_api__["a" /* Service */]);

var health = new HealthService();

/***/ }),
/* 5 */
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
/* 6 */
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
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_webix_jet__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__common_colors__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__data__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__common_formatters__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__services_alerts__ = __webpack_require__(54);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__alert__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__common_filters__ = __webpack_require__(33);
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
            __WEBPACK_IMPORTED_MODULE_4__services_alerts__["a" /* alerts */].delete(identifiers).then(function () {
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
/* 8 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ansiUp; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_ansi_up__ = __webpack_require__(53);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_ansi_up___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_ansi_up__);


var ansiUp = new __WEBPACK_IMPORTED_MODULE_0_ansi_up___default.a();

/***/ }),
/* 9 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__external__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_admin__ = __webpack_require__(24);
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }




var CapacityView = function (_ExternalView) {
    _inherits(CapacityView, _ExternalView);

    function CapacityView(app, name) {
        _classCallCheck(this, CapacityView);

        return _possibleConstructorReturn(this, _ExternalView.call(this, app, name));
    }

    CapacityView.prototype.showIframe = function showIframe() {
        var _this2 = this;

        __WEBPACK_IMPORTED_MODULE_1__services_admin__["a" /* admin */].get_explorer().then(function (data) {
            var explorer = data.json();
            var url = explorer.url;

            if (!url.startsWith('http')) {
                url = "https://" + url;
            }

            _this2.externalIframe.show();
            _this2.externalIframe.showProgress({ type: "icon" });
            _this2.externalIframe.load(url);
        });
    };

    return CapacityView;
}(__WEBPACK_IMPORTED_MODULE_0__external__["ExternalView"]);

/* harmony default export */ __webpack_exports__["default"] = (CapacityView);

/***/ }),
/* 10 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_webix_jet__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__errors_dialog__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_taiga__ = __webpack_require__(25);
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }






var CirclesView = function (_JetView) {
    _inherits(CirclesView, _JetView);

    function CirclesView() {
        _classCallCheck(this, CirclesView);

        return _possibleConstructorReturn(this, _JetView.apply(this, arguments));
    }

    CirclesView.prototype.config = function config() {
        var _ref;

        var grid = {
            rows: [{
                //Header
                view: "template",
                type: "header",
                template: "Circles"
            }, (_ref = { //DataTable
                view: "datatable",
                id: "circles_table",
                resizeColumn: true,
                type: {
                    height: 200
                },
                scroll: "xy",
                autoConfig: true
            }, _ref["view"] = "datatable", _ref.select = true, _ref.css = "webix_header_border webix_data_border", _ref.onContext = {}, _ref.columns = [{
                id: "ID",
                header: "ID",
                sort: "int",
                autowidth: true
            }, {
                id: "Name",
                header: "Name",
                sort: "string",
                width: 200
            }, {
                id: "Owner",
                header: ["Owner", {
                    content: "textFilter"
                }],
                sort: "string",
                width: 200
            }, {
                id: "Description",
                header: "Description",
                sort: "string",
                width: 1300
            }], _ref.scheme = {
                $init: function $init(obj) {
                    obj.index = this.count();
                }
            }, _ref)]
        };
        return grid;
    };

    CirclesView.prototype.showError = function showError(message) {
        this.errorView.showError(message);
    };

    CirclesView.prototype.init = function init(view) {
        var self = this;

        self.errorView = this.ui(__WEBPACK_IMPORTED_MODULE_1__errors_dialog__["ErrorView"]);

        var menu = webix.ui({
            view: "contextmenu",
            id: "circles_cm"
        });

        this.circleTable = this.$$("circles_table");
        webix.extend(this.circleTable, webix.ProgressBar);

        webix.ajax().get("/auth/authenticated", function (data) {
            var info = JSON.parse(data);
            var username = info.username.replace(".3bot", "");
            __WEBPACK_IMPORTED_MODULE_2__services_taiga__["a" /* taiga */].userCircles(username).then(function (data) {
                var circles = data.json();
                self.circleTable.parse(circles);
            });
        });
    };

    return CirclesView;
}(__WEBPACK_IMPORTED_MODULE_0_webix_jet__["b" /* JetView */]);

/* harmony default export */ __webpack_exports__["default"] = (CirclesView);

/***/ }),
/* 11 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_webix_jet__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__errors_dialog__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_taiga__ = __webpack_require__(25);
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }






var CirclestoriesView = function (_JetView) {
    _inherits(CirclestoriesView, _JetView);

    function CirclestoriesView() {
        _classCallCheck(this, CirclestoriesView);

        return _possibleConstructorReturn(this, _JetView.apply(this, arguments));
    }

    CirclestoriesView.prototype.config = function config() {
        var _ref;

        var grid = {
            rows: [{
                //Header
                view: "template",
                type: "header",
                template: "CirclesStories"
            }, (_ref = { //DataTable
                view: "datatable",
                id: "circlestories_table",
                resizeColumn: true,
                type: {
                    height: 200
                },
                scroll: "xy",
                autoConfig: true
            }, _ref["view"] = "datatable", _ref.select = true, _ref.css = "webix_header_border webix_data_border", _ref.onContext = {}, _ref.columns = [{
                id: "ID",
                header: "ID",
                sort: "int",
                autowidth: true
            }, {
                id: "Project",
                header: ["Project", {
                    content: "textFilter"
                }],
                sort: "string",
                width: 300
            }, {
                id: "Subject",
                header: "Subject",
                sort: "string",
                width: 700
            }, {
                id: "Milestone",
                header: "Milestone",
                sort: "string",
                width: 200
            }, {
                id: "Status",
                header: "Status",
                sort: "string",
                width: 200
            }, {
                id: "Due date",
                header: "Due date",
                sort: "string",
                width: 200
            }], _ref.scheme = {
                $init: function $init(obj) {
                    obj.index = this.count();
                }
            }, _ref)]
        };
        return grid;
    };

    CirclestoriesView.prototype.showError = function showError(message) {
        this.errorView.showError(message);
    };

    CirclestoriesView.prototype.init = function init(view) {
        var self = this;

        self.errorView = this.ui(__WEBPACK_IMPORTED_MODULE_1__errors_dialog__["ErrorView"]);

        var menu = webix.ui({
            view: "contextmenu",
            id: "circlestories_cm"
        });

        this.storiesTable = this.$$("circlestories_table");
        webix.extend(this.storiesTable, webix.ProgressBar);

        webix.ajax().get("/auth/authenticated", function (data) {
            var info = JSON.parse(data);
            var username = info.username.replace(".3bot", "");
            __WEBPACK_IMPORTED_MODULE_2__services_taiga__["a" /* taiga */].userStories(username).then(function (data) {
                var stories = data.json();
                self.storiesTable.parse(stories);
            });
        });
    };

    return CirclestoriesView;
}(__WEBPACK_IMPORTED_MODULE_0_webix_jet__["b" /* JetView */]);

/* harmony default export */ __webpack_exports__["default"] = (CirclestoriesView);

/***/ }),
/* 12 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_webix_jet__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__errors_dialog__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_taiga__ = __webpack_require__(25);
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }






var CirclesTasksView = function (_JetView) {
    _inherits(CirclesTasksView, _JetView);

    function CirclesTasksView() {
        _classCallCheck(this, CirclesTasksView);

        return _possibleConstructorReturn(this, _JetView.apply(this, arguments));
    }

    CirclesTasksView.prototype.config = function config() {
        var _ref;

        var grid = {
            rows: [{
                //Header
                view: "template",
                type: "header",
                template: "CirclesTasks"
            }, (_ref = { //DataTable
                view: "datatable",
                id: "circlestasks_table",
                resizeColumn: true,
                type: {
                    height: 200
                },
                scroll: "xy",
                autoConfig: true
            }, _ref["view"] = "datatable", _ref.select = true, _ref.css = "webix_header_border webix_data_border", _ref.onContext = {}, _ref.columns = [{
                id: "ID",
                header: "ID",
                sort: "int",
                autowidth: true
            }, {
                id: "Project",
                header: ["Project", {
                    content: "textFilter"
                }],
                sort: "string",
                width: 300
            }, {
                id: "Subject",
                header: "Subject",
                sort: "string",
                width: 800
            }, {
                id: "Milestone",
                header: "Milestone",
                sort: "string",
                width: 200
            }, {
                id: "Status",
                header: "Status",
                sort: "string",
                width: 300
            }], _ref.scheme = {
                $init: function $init(obj) {
                    obj.index = this.count();
                }
            }, _ref)]
        };
        return grid;
    };

    CirclesTasksView.prototype.showError = function showError(message) {
        this.errorView.showError(message);
    };

    CirclesTasksView.prototype.init = function init(view) {
        var self = this;

        self.errorView = this.ui(__WEBPACK_IMPORTED_MODULE_1__errors_dialog__["ErrorView"]);

        var menu = webix.ui({
            view: "contextmenu",
            id: "circlestasks_cm"
        });

        this.tasksTable = this.$$("circlestasks_table");
        webix.extend(this.tasksTable, webix.ProgressBar);

        __WEBPACK_IMPORTED_MODULE_2__services_taiga__["a" /* taiga */].userTasks(36).then(function (data) {
            var circles = data.json();
            self.tasksTable.parse(circles);
        });

        webix.ajax().get("/auth/authenticated", function (data) {
            var info = JSON.parse(data);
            var username = info.username.replace(".3bot", "");
            __WEBPACK_IMPORTED_MODULE_2__services_taiga__["a" /* taiga */].userTasks(username).then(function (data) {
                var tasks = data.json();
                self.tasksTable.parse(tasks);
            });
        });
    };

    return CirclesTasksView;
}(__WEBPACK_IMPORTED_MODULE_0_webix_jet__["b" /* JetView */]);

/* harmony default export */ __webpack_exports__["default"] = (CirclesTasksView);

/***/ }),
/* 13 */
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
/* 14 */
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
				}, { $subview: "dash.processesList" }, { $subview: "dash.runningPorts" }]
			}]
		};
	};

	return TopView;
}(__WEBPACK_IMPORTED_MODULE_0_webix_jet__["b" /* JetView */]);

/* harmony default export */ __webpack_exports__["default"] = (TopView);

/***/ }),
/* 15 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_webix_jet__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__errors_dialog__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_deployedSolutions__ = __webpack_require__(55);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__reservation__ = __webpack_require__(27);
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }








var UNKNOWN_STATUS = 'Unknown';

var DeployedSolutionsView = function (_JetView) {
    _inherits(DeployedSolutionsView, _JetView);

    function DeployedSolutionsView() {
        _classCallCheck(this, DeployedSolutionsView);

        return _possibleConstructorReturn(this, _JetView.apply(this, arguments));
    }

    DeployedSolutionsView.prototype.config = function config() {
        var _ref;

        var grid = {
            rows: [{
                //Header
                view: "template",
                type: "header",
                template: "Deployed Solutions"
            }, (_ref = { //DataTable
                view: "datatable",
                id: "solutions_table",
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
                id: "solutionName",
                header: ["Solution Name", {
                    content: "textFilter"
                }],
                sort: "string",
                width: 200
            }, {
                id: "resvId",
                header: ["Reservation Id", {
                    content: "textFilter"
                }],
                sort: "string",
                width: 200
            }, {
                id: "solutionType",
                header: ["Solution Type", {
                    content: "selectFilter"
                }],
                sort: "string",
                width: 200
            }, {
                id: "nextAction",
                header: ["Next action", {
                    content: "selectFilter"
                }],
                sort: "string",
                width: 200
            }], _ref.scheme = {
                $init: function $init(obj) {
                    obj.solutionName = obj.name;
                    obj.resvId = obj.reservation.id;
                    obj.solutionType = obj.type;
                    obj.nextAction = obj.reservation.next_action;
                    obj.index = this.count();
                }
            }, _ref.on = {
                onAfterLoad: function onAfterLoad() {
                    if (!this.count()) this.showOverlay("Sorry, there is no data");else this.hideOverlay();
                }
            }, _ref)]
        };
        return grid;
    };

    DeployedSolutionsView.prototype.showError = function showError(message) {
        this.errorView.showError(message);
    };

    DeployedSolutionsView.prototype.handleResult = function handleResult(promise, callback) {
        var _this2 = this;

        this.solutionsTable.showProgress({ hide: false });

        promise.then(function (data) {
            var solutionItem = data.json().solution;
            if (callback instanceof Function) {
                callback(solutionItem);
            }

            webix.message({
                type: "success",
                text: "The operation has beed done successfully"
            });

            _this2.solutionsTable.showProgress({ hide: true });
        }).catch(function (error) {
            _this2.showError("Error has happened during this operation: " + error.response, "Error");
            _this2.solutionsTable.showProgress({ hide: true });
        });
    };

    DeployedSolutionsView.prototype.deleteSolution = function deleteSolution(solutionType, solutionName, itemId) {
        var _this3 = this;

        this.handleResult(__WEBPACK_IMPORTED_MODULE_2__services_deployedSolutions__["a" /* solutions */].delete(solutionType, solutionName), function () {
            _this3.solutionsTable.remove(itemId);
        });
    };

    DeployedSolutionsView.prototype.loadSolutions = function loadSolutions() {
        var _this4 = this;

        __WEBPACK_IMPORTED_MODULE_2__services_deployedSolutions__["a" /* solutions */].list().then(function (data) {
            var solutions = data.json().solutions;
            for (var i = 0; i < solutions.length; i++) {
                solutions[i].reservation = JSON.parse(solutions[i].reservation);
                solutions[i].form_info = JSON.parse(solutions[i].form_info);
            }
            _this4.solutionsTable.parse(solutions);
        });
    };

    DeployedSolutionsView.prototype.viewItem = function viewItem(id) {
        this.reservationView.showFor(this.solutionsTable.getItem(id));
    };

    DeployedSolutionsView.prototype.init = function init(view) {
        var self = this;

        self.errorView = this.ui(__WEBPACK_IMPORTED_MODULE_1__errors_dialog__["ErrorView"]);
        self.reservationView = self.ui(__WEBPACK_IMPORTED_MODULE_3__reservation__["default"]);

        var menu = webix.ui({
            view: "contextmenu",
            id: "solutions_cm"
        });

        this.solutionsTable = this.$$("solutions_table");
        self.loadSolutions();
        webix.extend(this.solutionsTable, webix.ProgressBar);

        function checkAction(action, selectedItemId) {
            var item = self.solutionsTable.getItem(selectedItemId);
            if (item) {
                var itemId = item.id;
                var solutionName = item.solutionName;
                var solutionType = item.solutionType;
                var nextAction = item.reservation.next_action;

                if (action == 'delete') {
                    webix.confirm({
                        title: "Cancel Solution",
                        ok: "Yes",
                        text: "Are you sure you want to cancel " + solutionName + "?",
                        cancel: "No"
                    }).then(function () {
                        self.deleteSolution(solutionType, solutionName, itemId);
                    });
                }
            } else {
                webix.message("You need to select a solution");
            }
        }

        $$("solutions_cm").attachEvent("onMenuItemClick", function (id) {
            checkAction(id, self.solutionsTable.getSelectedId());
        });

        self.solutionsTable.attachEvent("onItemDblClick", function () {
            self.viewItem(self.solutionsTable.getSelectedId());
        });

        webix.event(self.solutionsTable.$view, "contextmenu", function (e /*MouseEvent*/) {
            var pos = self.solutionsTable.locate(e);
            if (pos) {
                var item = self.solutionsTable.getItem(pos.row);
                var actions = ['delete'];

                menu.clearAll();
                menu.parse(actions);
                menu.show(e);
            }
            return webix.html.preventEvent(e);
        });
    };

    return DeployedSolutionsView;
}(__WEBPACK_IMPORTED_MODULE_0_webix_jet__["b" /* JetView */]);

/* harmony default export */ __webpack_exports__["default"] = (DeployedSolutionsView);

/***/ }),
/* 16 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__external__ = __webpack_require__(1);
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }



var URL = "/threebot/farmmanagement";
var REQUIRED_PACKAGES = {
    "threebot.farmmanagement": "https://github.com/threefoldtech/jumpscaleX_threebot/tree/development/ThreeBotPackages/threebot/farmmanagement"
};

var FarmmanagementView = function (_ExternalView) {
    _inherits(FarmmanagementView, _ExternalView);

    function FarmmanagementView(app, name) {
        _classCallCheck(this, FarmmanagementView);

        return _possibleConstructorReturn(this, _ExternalView.call(this, app, name, URL, REQUIRED_PACKAGES));
    }

    return FarmmanagementView;
}(__WEBPACK_IMPORTED_MODULE_0__external__["ExternalView"]);

/* harmony default export */ __webpack_exports__["default"] = (FarmmanagementView);

/***/ }),
/* 17 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__external__ = __webpack_require__(1);
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }



var URL = "/threefold/simulator/notebook/";
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
/* 18 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_webix_jet__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__appLogs__ = __webpack_require__(28);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_logs__ = __webpack_require__(56);
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
                    align: "right",
                    on: {
                        onChange: function onChange(appName) {
                            this.$scope.show("/main/logs");
                            this.$scope.showFor(appName);
                        }
                    }
                }, {
                    view: "button",
                    id: "btn_delete",
                    value: "Delete",
                    css: "webix_danger",
                    inputWidth: 120,
                    click: function click() {
                        this.$scope.delete();
                    }
                }, {
                    view: "button",
                    id: "btn_delete_all",
                    value: "Delete All",
                    css: "webix_danger",
                    align: 'right',
                    inputWidth: 100,
                    click: function click() {
                        this.$scope.delete_all();
                    }
                }, { width: 20 }]
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

        webix.ui({
            view: "contextmenu",
            id: "logs_cm",
            data: ["Kill"]
        }).attachTo(self.appLogs);

        webix.extend(self.appLogs, webix.ProgressBar);
        self.appLogs.showProgress({ hide: false });

        __WEBPACK_IMPORTED_MODULE_2__services_logs__["a" /* logs */].list(appName, logId).then(function (data) {
            self.appLogs.clearAll();
            self.appLogs.parse(data.json()[0]);
            self.appLogs.showProgress({ hide: true });
        });

        $$("logs_cm").attachEvent("onMenuItemClick", function (id) {
            if (id == "Kill") {
                self.deleteSelected(self.appLogs.getSelectedId(true));
            }
        });
    };

    LogsView.prototype.delete = function _delete() {
        var _this2 = this;

        var appname = $$("apps_combo").getValue();
        if (appname) {
            webix.confirm({
                title: "Delete logs",
                ok: "Delete",
                cancel: "No",
                text: "Delete " + appname + " logs?"
            }).then(function () {
                __WEBPACK_IMPORTED_MODULE_2__services_logs__["a" /* logs */].delete(appname).then(function () {
                    _this2.refresh();
                    webix.message({ type: "success", text: appname + " logs deleted successfully" });
                }).catch(function (error) {
                    webix.message({ type: "error", text: "Could not delete logs" });
                });
            });
        } else {
            webix.message({ type: "error", text: "Please select app for delete" });
        }
    };

    LogsView.prototype.deleteSelected = function deleteSelected(objects) {
        var self = this;
        self.appLogs = $$("applogs_table");

        var ids = [];

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
        }

        webix.confirm({
            title: "Delete selected logs",
            ok: "Yes",
            cancel: "No",
            text: "delete logs with ids " + ids.join(", ")
        }).then(function () {
            __WEBPACK_IMPORTED_MODULE_2__services_logs__["a" /* logs */].deleteSelected(ids).then(function (data) {
                self.app.refresh();
                webix.message({ type: "success", text: "Logs deleted" });
            }).catch(function (error) {
                webix.message({ type: "error", text: "Could not delete logs" });
            });
        });
    };

    LogsView.prototype.delete_all = function delete_all() {
        var _this3 = this;

        webix.confirm({
            title: "Delete all logs",
            ok: "Delete",
            cancel: "No",
            text: "Delete all logs?"
        }).then(function () {
            __WEBPACK_IMPORTED_MODULE_2__services_logs__["a" /* logs */].deleteAll().then(function () {
                _this3.refresh();
                webix.message({ type: "success", text: "All logs deleted successfully" });
            }).catch(function (error) {
                webix.message({ type: "error", text: "Could not delete logs" });
            });
        });
    };

    return LogsView;
}(__WEBPACK_IMPORTED_MODULE_0_webix_jet__["b" /* JetView */]);

/* harmony default export */ __webpack_exports__["default"] = (LogsView);

/***/ }),
/* 19 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_webix_jet__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__errors_dialog__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_packages__ = __webpack_require__(34);
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }






var UNKNOWN_STATUS = 'Unknown';

var PACKAGE_STATES = [{
    name: "Init",
    actions: []
}, {
    name: "Config",
    actions: ['install']
}, {
    name: "Installed",
    actions: ['start']
}, {
    name: "Running",
    actions: ["stop"]
}, {
    name: "Halted",
    actions: ["start", "disable"]
}, {
    name: "Disabled",
    actions: ["enable"]
}, {
    name: "Error",
    actions: ['install']
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
                id: "source_name",
                header: ["Name", {
                    content: "textFilter"
                }],
                sort: "string",
                width: 200
            }, {
                id: "status",
                header: "Status",
                sort: "string",
                format: function format(value) {
                    var status = PACKAGE_STATES[value];
                    return status && status.name || UNKNOWN_STATUS;
                }
            }, {
                id: "path",
                header: "Path",
                sort: "string",
                width: 700
            }], _ref.scheme = {
                $init: function $init(obj) {
                    obj.source_name = obj.source.name;
                    obj.author = obj.source.threebot;
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
            var packageItem = data.json().package;
            if (callback instanceof Function) {
                callback(packageItem);
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

    PackagesView.prototype.addPackage = function addPackage(path, gitUrl, itemId) {
        var _this3 = this;

        this.handleResult(__WEBPACK_IMPORTED_MODULE_2__services_packages__["a" /* packages */].add(path, gitUrl), function (item) {
            if (itemId) {
                _this3.packageTable.updateItem(itemId, item);
            } else {
                _this3.packageTable.add(item);
            }
        });
    };

    PackagesView.prototype.deletePackage = function deletePackage(packageName, itemId) {
        var _this4 = this;

        this.handleResult(__WEBPACK_IMPORTED_MODULE_2__services_packages__["a" /* packages */].delete(packageName), function () {
            _this4.packageTable.remove(itemId);
        });
    };

    PackagesView.prototype.startPackage = function startPackage(packageName, itemId) {
        var _this5 = this;

        this.handleResult(__WEBPACK_IMPORTED_MODULE_2__services_packages__["a" /* packages */].start(packageName), function (item) {
            _this5.packageTable.updateItem(itemId, item);
        });
    };

    PackagesView.prototype.stopPackage = function stopPackage(packageName, itemId) {
        var _this6 = this;

        this.handleResult(__WEBPACK_IMPORTED_MODULE_2__services_packages__["a" /* packages */].stop(packageName), function (item) {
            _this6.packageTable.updateItem(itemId, item);
        });
    };

    PackagesView.prototype.enablePackage = function enablePackage(packageName, itemId) {
        var _this7 = this;

        this.handleResult(__WEBPACK_IMPORTED_MODULE_2__services_packages__["a" /* packages */].enable(packageName), function (item) {
            _this7.packageTable.updateItem(itemId, item);
        });
    };

    PackagesView.prototype.disablePackage = function disablePackage(packageName, itemId) {
        var _this8 = this;

        this.handleResult(__WEBPACK_IMPORTED_MODULE_2__services_packages__["a" /* packages */].disable(packageName), function (item) {
            _this8.packageTable.updateItem(itemId, item);
        });
    };

    PackagesView.prototype.loadPackages = function loadPackages() {
        var _this9 = this;

        __WEBPACK_IMPORTED_MODULE_2__services_packages__["a" /* packages */].list().then(function (data) {
            _this9.packageTable.parse(data.json().packages);
        });
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
            var item = self.packageTable.getItem(selectedItemId);
            if (item) {
                var itemId = item.id;
                var packageName = item.name;

                if (action == 'install') {
                    self.addPackage(item.path, null, itemId);
                } else if (action == 'delete') {
                    webix.confirm({
                        title: "Delete Package",
                        ok: "Yes",
                        text: "Are you sure you want to delete " + packageName + "?",
                        cancel: "No"
                    }).then(function () {
                        self.deletePackage(packageName, itemId);
                    });
                    //
                } else if (action == 'start') {
                    self.startPackage(packageName, itemId);
                } else if (action == 'stop') {
                    self.stopPackage(packageName, itemId);
                } else if (action == 'disable') {
                    self.disablePackage(packageName, itemId);
                } else if (action == 'enable') {
                    self.enablePackage(packageName, itemId);
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
            if (pos) {
                var item = self.packageTable.getItem(pos.row);
                var actions = [].concat(PACKAGE_STATES[item.status].actions, ['delete']);

                menu.clearAll();
                menu.parse(actions);
                menu.show(e);
            }
            return webix.html.preventEvent(e);
        });

        self.loadPackages();
    };

    return PackagesView;
}(__WEBPACK_IMPORTED_MODULE_0_webix_jet__["b" /* JetView */]);

/* harmony default export */ __webpack_exports__["default"] = (PackagesView);

/***/ }),
/* 20 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__external__ = __webpack_require__(1);
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }



var URL = "/threefold/sdkexamples/notebook/";
var REQUIRED_PACKAGES = {
    "threefold.sdkexamples": "https://github.com/threefoldtech/jumpscaleX_threebot/tree/development/ThreeBotPackages/threefold/sdkexamples"
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
/* 21 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_webix_jet__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__admins__ = __webpack_require__(31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__general__ = __webpack_require__(32);
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
                header: "General",
                body: __WEBPACK_IMPORTED_MODULE_2__general__["default"]
            }, {
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
/* 22 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_webix_jet__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_wiki__ = __webpack_require__(59);
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
        var view = {
            view: "datatable",
            id: "wikis_table",
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
                id: "name",
                header: "Package",
                sort: "string",
                width: 300
            }, {
                id: "actions",
                header: "Actions",
                sort: "string",
                width: 200,
                template: function template(obj) {
                    return "<div class='webix_el_button'><button class='btn_view'> View </button></div>";
                }
            }],
            onClick: {
                btn_view: function btn_view(ev, id) {
                    var item = this.getItem(id);
                    window.location.href = "/admin/#!/main/wikis.view?name=" + item.name;
                }
            },
            autoConfig: true,
            scheme: {
                $init: function $init(obj) {
                    obj.index = this.count();
                }
            }
        };

        return view;
    };

    WikisView.prototype.init = function init(view) {
        __WEBPACK_IMPORTED_MODULE_1__services_wiki__["a" /* packages */].list().then(function (data) {
            view.parse(data.json());
        });
    };

    return WikisView;
}(__WEBPACK_IMPORTED_MODULE_0_webix_jet__["b" /* JetView */]);

/* harmony default export */ __webpack_exports__["default"] = (WikisView);

/***/ }),
/* 23 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_webix_jet__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__common_colors__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__data__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__common_formatters__ = __webpack_require__(6);
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
/* 24 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return admin; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__common_api__ = __webpack_require__(2);
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }



var BASE_URL = "/zerobot/admin/actors/admin";

var AdminService = function (_Service) {
    _inherits(AdminService, _Service);

    function AdminService() {
        _classCallCheck(this, AdminService);

        return _possibleConstructorReturn(this, _Service.call(this, BASE_URL));
    }

    AdminService.prototype.list = function list() {
        return this.getCall("admin_list");
    };

    AdminService.prototype.add = function add(name) {
        return this.postCall("admin_add", {
            "name": name
        });
    };

    AdminService.prototype.delete = function _delete(name) {
        return this.postCall("admin_delete", {
            "name": name
        });
    };

    AdminService.prototype.get_explorer = function get_explorer() {
        return this.getCall('get_explorer');
    };

    AdminService.prototype.set_explorer = function set_explorer(type) {
        return this.postCall('set_explorer', {
            explorer_type: type
        });
    };

    return AdminService;
}(__WEBPACK_IMPORTED_MODULE_0__common_api__["a" /* Service */]);

var admin = new AdminService();

/***/ }),
/* 25 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return taiga; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__common_api__ = __webpack_require__(2);
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }



var BASE_URL = "/tfgrid/taiga/actors/taiga";

var TaigaService = function (_Service) {
    _inherits(TaigaService, _Service);

    function TaigaService() {
        _classCallCheck(this, TaigaService);

        return _possibleConstructorReturn(this, _Service.call(this, BASE_URL));
    }

    TaigaService.prototype.userCircles = function userCircles(username) {
        return this.postCall("get_user_circles", { username: username, output_type: "json" });
    };

    TaigaService.prototype.userStories = function userStories(username) {
        return this.postCall("get_user_stories", { username: username, output_type: "json" });
    };

    TaigaService.prototype.userTasks = function userTasks(username) {
        return this.postCall("get_user_tasks", { username: username, output_type: "json" });
    };

    return TaigaService;
}(__WEBPACK_IMPORTED_MODULE_0__common_api__["a" /* Service */]);

var taiga = new TaigaService();

/***/ }),
/* 26 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_webix_jet__ = __webpack_require__(0);
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }



var ProcessDetailsView = function (_JetView) {
    _inherits(ProcessDetailsView, _JetView);

    function ProcessDetailsView() {
        _classCallCheck(this, ProcessDetailsView);

        return _possibleConstructorReturn(this, _JetView.apply(this, arguments));
    }

    ProcessDetailsView.prototype.config = function config() {
        var info = {
            view: "form",
            id: "form",
            elementsConfig: { labelWidth: 200 },
            elements: [{
                view: "text",
                label: "Process",
                name: "name",
                readonly: true
            }, {
                view: "text",
                label: "PID",
                name: "pid",
                readonly: true
            }, {
                view: "text",
                label: "Cmd line",
                name: "cmdline",
                readonly: true
            }, {
                view: "text",
                label: "Username",
                name: "username",
                readonly: true
            }, {
                view: "text",
                label: "Memory usage in MB",
                name: "rss",
                readonly: true
            }, {
                view: "text",
                label: "Status",
                name: "status",
                readonly: true
            }, {
                view: "text",
                label: "Creation time",
                name: "create_time",
                readonly: true
            }, {
                view: "text",
                label: "CPU - user mode (seconds)",
                name: "cpu_user",
                readonly: true
            }, {
                view: "text",
                label: "CPU - kernel mode (seconds)",
                name: "cpu_system",
                readonly: true
            }, {
                view: "text",
                label: "Number of threads",
                name: "threads",
                readonly: true
            }, {
                view: "text",
                label: "Number of fds opened",
                name: "fds",
                readonly: true
            }, {
                view: "text",
                label: "Parent process pid",
                name: "parent_pid",
                readonly: true
            }, {
                view: "text",
                label: "Parent process name",
                name: "parent_name",
                readonly: true
            }]
        };

        return {
            view: "window",
            head: "Process Details",
            modal: true,
            width: 600,
            height: 800,
            position: "center",
            body: {
                rows: [info, {
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

    ProcessDetailsView.prototype.showProcessDetails = function showProcessDetails(data) {
        this.form.parse(data);
        this.getRoot().show();
    };

    ProcessDetailsView.prototype.init = function init() {
        this.form = $$("form");
    };

    return ProcessDetailsView;
}(__WEBPACK_IMPORTED_MODULE_0_webix_jet__["b" /* JetView */]);

/* harmony default export */ __webpack_exports__["default"] = (ProcessDetailsView);

/***/ }),
/* 27 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_webix_jet__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__common_colors__ = __webpack_require__(8);
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }





var ReservationView = function (_JetView) {
    _inherits(ReservationView, _JetView);

    function ReservationView() {
        _classCallCheck(this, ReservationView);

        return _possibleConstructorReturn(this, _JetView.apply(this, arguments));
    }

    ReservationView.prototype.config = function config() {
        var info = {
            view: "form",
            id: "form",
            elementsConfig: { labelWidth: 140 },
            elements: [{
                view: "text",
                label: "ID",
                name: "id",
                readonly: true
            }, {
                view: "text",
                label: "Customer tid",
                name: "customer_tid",
                readonly: true
            }, {
                view: "text",
                label: "Next action",
                name: "next_action",
                readonly: true
            }, {
                view: "text",
                label: "expiration",
                name: "expiration",
                readonly: true
            }]
        };

        var tab = {
            view: "tabview",
            id: "tabview",
            cells: [{

                header: "Overview",
                rows: [info, {
                    view: "list",
                    label: "Form inputs",
                    name: "Form inputs",
                    data: [{ "title": "Form inputs" }],
                    template: "<b> #title# <b>",
                    autoheight: true,
                    readonly: true
                }, {
                    id: "formInfo",
                    view: "list",
                    template: "<b>#key# </b>  :   #value#",
                    scroll: "auto"
                }]

            }, {
                id: "networks",
                header: "Networks",
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
                    id: "network_name",
                    header: "Name",
                    sort: "string",
                    width: 180
                }, {
                    id: "ip_range",
                    header: "Ip range",
                    sort: "string",
                    width: 180
                }, {
                    id: "farmer_tid",
                    header: "Farmer",
                    sort: "string",
                    width: 180
                }],
                scheme: {
                    $init: function $init(obj) {
                        obj.network_name = obj.name;
                        obj.ip_range = obj.iprange;
                        obj.farmer_tid = obj.farmer_tid;
                        obj.index = this.count();
                    }
                }, on: {
                    onAfterLoad: function onAfterLoad() {
                        if (!this.count()) this.showOverlay("No networks in reservation");else this.hideOverlay();
                    }
                }
            }, {
                id: "containers",
                header: "Containers",
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
                    id: "node_id",
                    header: "Node id",
                    sort: "string",
                    autowidth: true,
                    width: 180
                }, {
                    id: "flist",
                    header: "Flist",
                    sort: "string",
                    autowidth: true,
                    width: 180
                }, {
                    id: "entrypoint",
                    header: "Entrypoint",
                    sort: "string",
                    autowidth: true,
                    width: 180
                }, {
                    id: "hub_url",
                    header: "Hub url",
                    sort: "string",
                    autowidth: true,
                    width: 180
                }, {
                    id: "interactive",
                    header: "Interactive",
                    sort: "string",
                    autowidth: true,
                    width: 180
                }, {
                    id: "farmer_tid",
                    header: "Farmer_tid",
                    sort: "string",
                    autowidth: true,
                    width: 180
                }],
                scheme: {
                    $init: function $init(obj) {
                        obj.node_id = obj.node_id;
                        obj.flist = obj.flist;
                        obj.entrypoint = obj.entrypoint;
                        obj.hub_url = obj.hub_url;
                        obj.interactive = obj.interactive;
                        obj.farmer_tid = obj.farmer_tid;
                        obj.index = this.count();
                    }
                }, on: {
                    onAfterLoad: function onAfterLoad() {
                        if (!this.count()) this.showOverlay("No containers in reservation");else this.hideOverlay();
                    }
                }
            }, {
                id: "volumes",
                header: "Volumes",
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
                    id: "node_id",
                    header: "Node id",
                    sort: "string",
                    autowidth: true,
                    width: 180
                }, {
                    id: "size",
                    header: "Size",
                    sort: "string",
                    autowidth: true,
                    width: 180
                }, {
                    id: "type",
                    header: "Type",
                    sort: "string",
                    autowidth: true,
                    width: 180
                }, {
                    id: "farmer_tid",
                    header: "Farmer_tid",
                    sort: "string",
                    autowidth: true,
                    width: 180
                }],
                scheme: {
                    $init: function $init(obj) {
                        obj.node_id = obj.node_id;
                        obj.size = obj.size;
                        obj.type = obj.type;
                        obj.farmer_tid = obj.farmer_tid;
                        obj.index = this.count();
                    }
                }, on: {
                    onAfterLoad: function onAfterLoad() {
                        if (!this.count()) this.showOverlay("No volumes in reservation");else this.hideOverlay();
                    }
                }
            }, {
                id: "zdbs",
                header: "Zdbs",
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
                    id: "node_id",
                    header: "Node id",
                    sort: "string",
                    autowidth: true,
                    width: 180
                }, {
                    id: "size",
                    header: "Size",
                    sort: "string",
                    autowidth: true,
                    width: 180
                }, {
                    id: "disk_type",
                    header: "Disk type",
                    sort: "string",
                    autowidth: true,
                    width: 180
                }, {
                    id: "mode",
                    header: "Mode",
                    sort: "string",
                    autowidth: true,
                    width: 180
                }, {
                    id: "public",
                    header: "public",
                    sort: "string",
                    autowidth: true,
                    width: 180
                }, {
                    id: "farmer_tid",
                    header: "Farmer_tid",
                    sort: "string",
                    autowidth: true,
                    width: 180
                }],
                scheme: {
                    $init: function $init(obj) {
                        obj.index = this.count();
                    }
                }, on: {
                    onAfterLoad: function onAfterLoad() {
                        if (!this.count()) this.showOverlay("No zdbs in reservation");else this.hideOverlay();
                    }
                }
            }, {
                id: "kubernetes",
                header: "Kubernetes",
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
                    id: "node_id",
                    header: "Node id",
                    sort: "string",
                    autowidth: true,
                    width: 180
                }, {
                    id: "size",
                    header: "Size",
                    sort: "string",
                    autowidth: true,
                    width: 180
                }, {
                    id: "network_id",
                    header: "Network id",
                    sort: "string",
                    autowidth: true,
                    width: 180
                }, {
                    id: "ipaddress",
                    header: "Ip address",
                    sort: "string",
                    autowidth: true,
                    width: 180
                }, {
                    id: "master_ips_str",
                    header: "Master ips",
                    sort: "string",
                    autowidth: true,
                    width: 180
                }, {
                    id: "farmer_tid",
                    header: "Farmer_tid",
                    sort: "string",
                    autowidth: true,
                    width: 180
                }],
                scheme: {
                    $init: function $init(obj) {
                        obj.master_ips_str = obj.master_ips.toString();
                        obj.index = this.count();
                    }
                }, on: {
                    onAfterLoad: function onAfterLoad() {
                        if (!this.count()) this.showOverlay("No kubernetes in reservation");else this.hideOverlay();
                    }
                }
            }]
        };

        return {
            view: "window",
            head: "Reservation",
            id: "reservation_view",
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

    ReservationView.prototype.init = function init() {
        var self = this;
        this.form = $$("form");
    };

    ReservationView.prototype.showFor = function showFor(item) {
        var values = Object.assign({}, item);
        this.reservation_view = $$("reservation_view");
        this.reservation_view.getHead().setHTML("Reservation: " + item.solutionName);

        var reservation = item.reservation;
        values.id = reservation.id;
        values.customer_tid = reservation.customer_tid;
        values.next_action = reservation.next_action;
        values.results = reservation.results;
        values.expiration = reservation.data_reservation.expiration_reservation;

        values.containers = reservation.data_reservation.containers;
        values.volumes = reservation.data_reservation.volumes;
        values.zdbs = reservation.data_reservation.zdbs;
        values.networks = reservation.data_reservation.networks;
        values.kubernetes = reservation.data_reservation.kubernetes;
        values.form_info = item.form_info;

        this.form.setValues(values);
        this.form_info = $$("formInfo");
        this.form_info.clearAll();

        var form_list = [];
        var form_keys = Object.keys(values.form_info);
        var form_values = Object.values(values.form_info);
        for (var index = 0; index < form_keys.length; index++) {
            var form_dict = new Object();
            form_dict['key'] = form_keys[index];
            form_dict['value'] = form_values[index];
            form_list.push(form_dict);
        }
        this.form_info.parse(form_list);

        // Add networks tab content
        this.networks = $$("networks");
        this.networks.clearAll();
        this.networks.parse(values.networks);

        // Add cotainer tab content
        this.containers = $$("containers");
        this.containers.clearAll();
        this.containers.parse(values.containers);

        // Add volumes tab content
        this.volumes = $$("volumes");
        this.volumes.clearAll();
        this.volumes.parse(values.volumes);

        // Add zdb tab content
        this.zdbs = $$("zdbs");
        this.zdbs.clearAll();
        this.zdbs.parse(values.zdbs);

        // Add kubernetes tab content
        this.kubernetes = $$("kubernetes");
        this.kubernetes.clearAll();
        this.kubernetes.parse(values.kubernetes);

        this.getRoot().show();
    };

    return ReservationView;
}(__WEBPACK_IMPORTED_MODULE_0_webix_jet__["b" /* JetView */]);

/* harmony default export */ __webpack_exports__["default"] = (ReservationView);

/***/ }),
/* 28 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_webix_jet__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__common_formatters__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__alerts_data__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__common_filters__ = __webpack_require__(33);
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
/* 29 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_webix_jet__ = __webpack_require__(0);
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }



var JobDetailsView = function (_JetView) {
    _inherits(JobDetailsView, _JetView);

    function JobDetailsView() {
        _classCallCheck(this, JobDetailsView);

        return _possibleConstructorReturn(this, _JetView.apply(this, arguments));
    }

    JobDetailsView.prototype.config = function config() {
        var info = {
            view: "form",
            id: "form",
            elementsConfig: { labelWidth: 200 },
            elements: [{
                view: "text",
                label: "ID",
                name: "action_id",
                readonly: true
            }, {
                view: "text",
                label: "State",
                name: "state",
                readonly: true
            }, {
                view: "text",
                label: "Name",
                name: "name",
                readonly: true
            }, {
                view: "text",
                label: "Category",
                name: "category",
                readonly: true
            }, {
                view: "text",
                label: "kwargs",
                name: "kwargs",
                readonly: true
            }, {
                view: "text",
                label: "Die",
                name: "die",
                readonly: true
            }, {
                view: "textarea",
                label: "Error",
                name: "error",
                readonly: true
            }, {
                view: "text",
                label: "Start time",
                name: "time_start",
                readonly: true
            }, {
                view: "text",
                label: "Stop time",
                name: "time_stop",
                readonly: true
            }, {
                view: "text",
                label: "Timeout",
                name: "timeout",
                readonly: true
            }, {
                view: "text",
                label: "Result",
                name: "result",
                readonly: true
            }, {
                view: "text",
                label: "Dependencies",
                name: "dependencies",
                readonly: true
            }, {
                view: "text",
                label: "Debug",
                name: "debug",
                readonly: true
            }]
        };

        return {
            view: "window",
            head: "Worker Details",
            modal: true,
            width: 600,
            height: 800,
            position: "center",
            body: {
                rows: [info, {
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

    JobDetailsView.prototype.showJobDetails = function showJobDetails(data) {
        this.form.parse(data);
        this.getRoot().show();
    };

    JobDetailsView.prototype.init = function init() {
        this.form = $$("form");
    };

    return JobDetailsView;
}(__WEBPACK_IMPORTED_MODULE_0_webix_jet__["b" /* JetView */]);

/* harmony default export */ __webpack_exports__["default"] = (JobDetailsView);

/***/ }),
/* 30 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_webix_jet__ = __webpack_require__(0);
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }



var WorkerDetailsView = function (_JetView) {
    _inherits(WorkerDetailsView, _JetView);

    function WorkerDetailsView() {
        _classCallCheck(this, WorkerDetailsView);

        return _possibleConstructorReturn(this, _JetView.apply(this, arguments));
    }

    WorkerDetailsView.prototype.config = function config() {
        var info = {
            view: "form",
            id: "form",
            elementsConfig: { labelWidth: 200 },
            elements: [{
                view: "text",
                label: "Name",
                name: "name",
                readonly: true
            }, {
                view: "text",
                label: "State",
                name: "state",
                readonly: true
            }, {
                view: "text",
                label: "Halted",
                name: "halt",
                readonly: true
            }, {
                view: "text",
                label: "PID",
                name: "pid",
                readonly: true
            }, {
                view: "text",
                label: "Current job",
                name: "current_job",
                readonly: true
            }, {
                view: "text",
                label: "Last update",
                name: "last_update",
                readonly: true
            }, {
                view: "text",
                label: "Start time",
                name: "time_start",
                readonly: true
            }, {
                view: "text",
                label: "Timeout",
                name: "timeout",
                readonly: true
            }, {
                view: "text",
                label: "Type",
                name: "type",
                readonly: true
            }, {
                view: "text",
                label: "Error",
                name: "error",
                readonly: true
            }, {
                view: "text",
                label: "Debug",
                name: "debug",
                readonly: true
            }]
        };

        return {
            view: "window",
            head: "Worker Details",
            modal: true,
            width: 600,
            height: 800,
            position: "center",
            body: {
                rows: [info, {
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

    WorkerDetailsView.prototype.showWorkerDetails = function showWorkerDetails(data) {
        this.form.parse(data);
        this.getRoot().show();
    };

    WorkerDetailsView.prototype.init = function init() {
        this.form = $$("form");
    };

    return WorkerDetailsView;
}(__WEBPACK_IMPORTED_MODULE_0_webix_jet__["b" /* JetView */]);

/* harmony default export */ __webpack_exports__["default"] = (WorkerDetailsView);

/***/ }),
/* 31 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_webix_jet__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__common_dialogs__ = __webpack_require__(58);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_admin__ = __webpack_require__(24);
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
            rows: [{
                cols: [{
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
                    width: 500,
                    header: ["Name", {
                        content: "textFilter"
                    }],
                    sort: "string"
                }, {
                    header: "Delete",
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
            if (__WEBPACK_IMPORTED_MODULE_2__services_admin__["a" /* admin */].add(input)) {
                self.table.add({ name: input });
            }
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
            if (__WEBPACK_IMPORTED_MODULE_2__services_admin__["a" /* admin */].delete(item.name)) {
                self.table.remove(itemId);
            }
        });
    };

    AdminsView.prototype.init = function init() {
        var _this2 = this;

        this.table = this.$$("admins-table");

        __WEBPACK_IMPORTED_MODULE_2__services_admin__["a" /* admin */].list().then(function (data) {
            _this2.table.parse(data.json());
        });

        //webix.extend(this.table, webix.ProgressBar);
    };

    return AdminsView;
}(__WEBPACK_IMPORTED_MODULE_0_webix_jet__["b" /* JetView */]);

/* harmony default export */ __webpack_exports__["default"] = (AdminsView);

/***/ }),
/* 32 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_webix_jet__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_admin__ = __webpack_require__(24);
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }





var GeneralView = function (_JetView) {
    _inherits(GeneralView, _JetView);

    function GeneralView() {
        _classCallCheck(this, GeneralView);

        return _possibleConstructorReturn(this, _JetView.apply(this, arguments));
    }

    GeneralView.prototype.config = function config() {

        return {
            localId: "general_form",
            view: "form",
            elements: [{
                view: "richselect",
                id: "explorer_list",
                label: "Explorer",
                labelWidth: 150,
                value: "testnet",
                yCount: 2,
                options: [{ id: "testnet", value: "Test Net" }, { id: "main", value: "Main" }]
            }, {
                localId: "explorer_address",
                view: "text",
                type: "text",
                readonly: true,
                label: "Explorer address",
                labelWidth: 150
            }]
        };
    };

    GeneralView.prototype.doAction = function doAction(promise, callback) {
        var _this2 = this;

        this.form.showProgress();
        promise.then(function (data) {
            if (callback) {
                callback(data);
            }
            console.log(data);
            _this2.form.showProgress({ hide: true });
        });
    };

    GeneralView.prototype.init = function init() {
        var self = this;

        self.form = self.$$('general_form');
        webix.extend(self.form, webix.ProgressBar);

        self.explorerList = self.$$('explorer_list');
        self.explorerAddress = self.$$('explorer_address');

        self.doAction(__WEBPACK_IMPORTED_MODULE_1__services_admin__["a" /* admin */].get_explorer(), function (data) {
            var explorer = data.json();
            self.explorerList.setValue(explorer.type);
            self.explorerAddress.setValue(explorer.url);
        });

        self.explorerList.attachEvent("onChange", function (newValue) {
            self.doAction(__WEBPACK_IMPORTED_MODULE_1__services_admin__["a" /* admin */].set_explorer(newValue.toLowerCase()), function (data) {
                var explorer = data.json();
                self.explorerAddress.setValue(explorer.url);
            });
        });
    };

    return GeneralView;
}(__WEBPACK_IMPORTED_MODULE_0_webix_jet__["b" /* JetView */]);

/* harmony default export */ __webpack_exports__["default"] = (GeneralView);

/***/ }),
/* 33 */
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
/* 34 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return packages; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__common_api__ = __webpack_require__(2);
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }



var BASE_URL = "/zerobot/admin/actors/package_manager";

var PackagesService = function (_Service) {
    _inherits(PackagesService, _Service);

    function PackagesService() {
        _classCallCheck(this, PackagesService);

        return _possibleConstructorReturn(this, _Service.call(this, BASE_URL));
    }

    PackagesService.prototype.getStatus = function getStatus(names) {
        // post call to send args as json
        return this.postCall("packages_get_status", {
            names: names
        });
    };

    PackagesService.prototype.list = function list(opts) {
        opts = opts || {};
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
/* 35 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_webix_jet__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_health__ = __webpack_require__(4);
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
/* 36 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_webix_jet__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_health__ = __webpack_require__(4);
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
/* 37 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_webix_jet__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_health__ = __webpack_require__(4);
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
            height: 'auto'
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
            for (var i in data) {
                var ip = data[i].ip;
                var ip6 = data[i].ip6.length ? data[i].ip6 : "Not set";

                self.info.add({
                    key: data[i].name,
                    value: "<br><b>IP: </b>" + ip + "<br><b>IPv6: </b>" + ip6
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
/* 38 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_webix_jet__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_health__ = __webpack_require__(4);
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
            height: 400,
            color: "#color#",
            value: "#rss#",
            label: "<h4>#name#</h4>",
            pieInnerText: "<h4>#rss#</h4>",
            data: "#chartsData#"
        };

        return {
            type: "space",
            rows: [{
                template: "<div style='width:auto;text-align:center'><h3>Running processes memory usage (RSS) (MB)<h3/></div>",
                height: 50
            }, processesInfo]
        };
    };

    ProcessesView.prototype.init = function init(view) {
        var self = this;

        this.processesList = [];

        this.runProcessInfo = this.$$("process");

        __WEBPACK_IMPORTED_MODULE_1__services_health__["a" /* health */].getRunningProcesses().then(function (data) {
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
                    "rss": Math.ceil(self.processesList[i].rss)
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
/* 39 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_webix_jet__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_health__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__processDetails__ = __webpack_require__(26);
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }






var processesListView = function (_JetView) {
    _inherits(processesListView, _JetView);

    function processesListView() {
        _classCallCheck(this, processesListView);

        return _possibleConstructorReturn(this, _JetView.apply(this, arguments));
    }

    processesListView.prototype.config = function config() {
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
                header: ["Process", {
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
                id: "rss",
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
            type: "space",
            rows: [{
                template: "<div style='width:auto;text-align:center'><h3>Processes<h3/></div>",
                height: 50
            }, view]
        };
    };

    processesListView.prototype.killProcess = function killProcess(objects) {
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
            var item = self.processTable.getItem(obj.id);
            items.push(item);
            indexes.push(item.index);
        }

        webix.confirm({
            title: "Kill processes",
            ok: "Yes",
            cancel: "No",
            text: "Kill processes with row ids " + indexes.join(", ")
        }).then(function () {

            var pids = items.map(function (item) {
                return item.pid;
            });

            __WEBPACK_IMPORTED_MODULE_1__services_health__["a" /* health */].killProcessesByPid(pids).then(function () {
                self.processTable.remove(ids);
                webix.message({ type: "success", text: "Processes killed successfully" });
            }).catch(function (error) {
                webix.message({ type: "error", text: "Could not kill process" });
            });
        });
    };

    processesListView.prototype.init = function init() {
        var self = this;
        self.processDetailsView = self.ui(__WEBPACK_IMPORTED_MODULE_2__processDetails__["default"]);

        self.processTable = this.$$("process_table");
        __WEBPACK_IMPORTED_MODULE_1__services_health__["a" /* health */].getRunningProcesses().then(function (data) {
            self.processTable.parse(data.json().processes_list);
        });

        webix.ui({
            view: "contextmenu",
            id: "process_cm",
            data: ["Kill"]
        }).attachTo(self.processTable);

        self.processTable.attachEvent("onItemDblClick", function () {
            var pid = self.processTable.getSelectedItem()["pid"];
            __WEBPACK_IMPORTED_MODULE_1__services_health__["a" /* health */].getProcessDetails(pid).then(function (data) {
                self.processDetailsView.showProcessDetails(data.json());
            }).catch(function (err) {
                webix.message({ type: "error", text: "Could not get process details" });
            });
        });

        $$("process_cm").attachEvent("onMenuItemClick", function (id) {
            if (id == "Kill") {
                self.killProcess(self.processTable.getSelectedId(true));
            }
        });
    };

    return processesListView;
}(__WEBPACK_IMPORTED_MODULE_0_webix_jet__["b" /* JetView */]);

/* harmony default export */ __webpack_exports__["default"] = (processesListView);

/***/ }),
/* 40 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_webix_jet__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_health__ = __webpack_require__(4);
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

    runningPortsView.prototype.killProcess = function killProcess(objects) {
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
            var item = self.portsTable.getItem(obj.id);
            items.push(item);
            indexes.push(item.index);
        }

        webix.confirm({
            title: "Kill processes",
            ok: "Yes",
            cancel: "No",
            text: "Kill processes with row ids " + indexes.join(", ")
        }).then(function () {

            var ports = items.map(function (item) {
                return item.port_number;
            });

            __WEBPACK_IMPORTED_MODULE_1__services_health__["a" /* health */].killProcessesByPort(ports).then(function () {
                self.portsTable.remove(ids);
                webix.message({ type: "success", text: "Processes killed successfully" });
            }).catch(function (error) {
                webix.message({ type: "error", text: "Could not kill process" });
            });
        });
    };

    runningPortsView.prototype.init = function init() {
        var self = this;

        self.portsTable = this.$$("runningPorts");
        __WEBPACK_IMPORTED_MODULE_1__services_health__["a" /* health */].getRunningPorts().then(function (data) {
            self.portsTable.parse(data.json());
        });

        webix.ui({
            view: "contextmenu",
            id: "port_cm",
            data: ["Kill"]
        }).attachTo(self.portsTable);

        $$("port_cm").attachEvent("onMenuItemClick", function (id) {
            if (id == "Kill") {
                self.killProcess(self.portsTable.getSelectedId(true));
            }
        });
    };

    return runningPortsView;
}(__WEBPACK_IMPORTED_MODULE_0_webix_jet__["b" /* JetView */]);

/* harmony default export */ __webpack_exports__["default"] = (runningPortsView);

/***/ }),
/* 41 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_webix_jet__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_auth__ = __webpack_require__(57);
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

        var sidebarData = [{
            id: "dash",
            value: "Dashboard",
            icon: "mdi mdi-view-dashboard"
        }, {
            id: "wikis",
            value: "Packages Docs",
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
            id: "tfwikis_main",
            value: "TF Wikis",
            icon: "mdi mdi-animation-play",
            data: [{
                id: "tfgridsdk",
                icon: "mdi mdi-book-open",
                value: "TFGridSDK"
            }, {
                id: "threefold",
                icon: "mdi mdi-worker",
                value: "Threefold"
            }]
        }, {
            id: "packages",
            value: "Packages",
            icon: "mdi mdi-package"
        }, {
            id: "deployedSolutions",
            value: "Deployed Solutions",
            icon: "mdi mdi-animation-play"
        }, {
            id: "solutions",
            value: "Solutions",
            icon: "mdi mdi-animation-play",
            data: [{
                id: "network",
                value: '<span><img class="solutions-icon" src="static/img/network.png"/>Network</span>'
            }, {
                id: "ubuntu",
                value: '<span><img class="solutions-icon" src="static/img/ubuntu.png"/>Ubuntu</span>'
            }, {
                id: "flist",
                value: '<span><img class="solutions-icon" src="static/img/flist.png"/>Generic flist</span>'
            }, {
                id: "minio",
                value: '<span><img class="solutions-icon" src="static/img/minio.png"/>Minio / S3</span>'
            }, {
                id: "k8s_cluster",
                value: '<span><img class="solutions-icon" src="static/img/k8s.png"/>Kubernetes cluster</span>'
            }, {
                id: "webgateway",
                value: 'Web Gateway',
                icon: "mdi mdi-network"
            }]
        }, {
            id: "capacity",
            value: "Capacity",
            icon: "mdi mdi-server"
        }, {
            id: "farmmanagement",
            value: "Farm Management",
            icon: "mdi mdi-server"
        }, {
            id: "sdkexamples",
            value: "SDK Examples",
            icon: "mdi mdi-file"
        }, {
            id: "codeserver",
            value: "Codeserver",
            icon: "mdi mdi-code-tags"
        }, {
            id: "jupyter",
            value: "TF Simulator",
            icon: "mdi mdi-play"
        }, {
            id: "settings",
            value: "Settings",
            icon: "mdi mdi-settings"
        }];

        var response = webix.ajax().sync().get("/zerobot/admin/actors/package_manager/packages_list", { has_frontend_args: true, status: "installed" });
        var packages = void 0;

        try {
            packages = JSON.parse(response.responseText).packages;
        } catch (error) {
            packages = [];
        }

        for (var _iterator = packages, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
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

            sidebarData.push(p.frontend_args);
        }

        var sidebar = {
            localId: "menu",
            view: "sidebar",
            css: "webix_dark",
            width: 200,
            data: sidebarData
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

        this.use(__WEBPACK_IMPORTED_MODULE_0_webix_jet__["c" /* plugins */].Menu, {
            id: "menu",
            urls: {
                myjobs: "myjobs.jobs",
                workers: "myjobs.workers",
                tfgridsdk: "tfwikis.tfgridsdk",
                threefold: "tfwikis.threefold",
                ubuntu: "solutions.chatflow?author=tfgrid_solutions&package=tfgrid_solutions&chat=ubuntu_deploy",
                network: "solutions.chatflow?author=tfgrid_solutions&package=tfgrid_solutions&chat=network_deploy",
                flist: "solutions.chatflow?author=tfgrid_solutions&package=tfgrid_solutions&chat=your_flist",
                minio: "solutions.chatflow?author=tfgrid_solutions&package=tfgrid_solutions&chat=minio_deploy",
                webgateway: "solutions.chatflow?author=tfgrid_solutions&package=tfgrid_solutions&chat=webgateway_deploy",
                k8s_cluster: "solutions.chatflow?author=tfgrid_solutions&package=tfgrid_solutions&chat=kubernetes_cluster_deploy",
                threebot: "solutions.chatflow?author=tfgrid&package=threebot_provisioning&chat=threebot_reservation"
            }
        });

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
                __WEBPACK_IMPORTED_MODULE_1__services_auth__["a" /* auth */].logout();
            }
        });

        this.usernameLabel = $$("username_label");

        __WEBPACK_IMPORTED_MODULE_1__services_auth__["a" /* auth */].getCurrentUser().then(function (data) {
            var info = data.json();
            var username = info.username;

            if (info.devmode) {
                username += " [development]";
            }

            self.usernameLabel.config.label = username;
            self.usernameLabel.config.width = webix.html.getTextSize(username) + 10;
            self.usernameLabel.refresh();

            self.userMenu.add({ id: 'email', value: info.email });
            self.userMenu.add({ id: 'logout', value: "Logout" });
        }).catch(function () {
            __WEBPACK_IMPORTED_MODULE_1__services_auth__["a" /* auth */].logout();
        });
    };

    return TopView;
}(__WEBPACK_IMPORTED_MODULE_0_webix_jet__["b" /* JetView */]);

/* harmony default export */ __webpack_exports__["default"] = (TopView);

/***/ }),
/* 42 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_webix_jet__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__common_formatters__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_myjobs__ = __webpack_require__(43);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__jobDetails__ = __webpack_require__(29);
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
        var self = this;
        self.jobDetailsView = self.ui(__WEBPACK_IMPORTED_MODULE_3__jobDetails__["default"]);
        self.jobTable = this.$$("jobs_table");

        __WEBPACK_IMPORTED_MODULE_2__services_myjobs__["a" /* myjobs */].listJobs().then(function (data) {
            view.parse(data);
        });
        self.jobTable.attachEvent("onItemDblClick", function () {
            var id = self.jobTable.getSelectedId();
            var item = self.jobTable.getItem(id);
            var jobData = {
                'action_id': item['action_id'],
                'debug': item['debug'].toString(),
                'die': item['die'].toString(),
                'error': item['error']['message'],
                'error_cat': item['error_cat'],
                'category': item['category'] ? item['category'] : 'No Category',
                'result': JSON.stringify(item['result']),
                'name': item['name'],
                'state': item['state'],
                'kwargs': JSON.stringify(item['kwargs']),
                'time_stop': Object(__WEBPACK_IMPORTED_MODULE_1__common_formatters__["a" /* dateFormatter */])(item['time_stop']),
                'time_start': Object(__WEBPACK_IMPORTED_MODULE_1__common_formatters__["a" /* dateFormatter */])(item['time_start']),
                'timeout': item['timeout'],
                'dependencies': item['dependencies']
            };
            self.jobDetailsView.showJobDetails(jobData);
        });
    };

    return JobsView;
}(__WEBPACK_IMPORTED_MODULE_0_webix_jet__["b" /* JetView */]);

/* harmony default export */ __webpack_exports__["default"] = (JobsView);

/***/ }),
/* 43 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return myjobs; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__common_api__ = __webpack_require__(2);
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }



var BASE_URL = "/zerobot/admin/actors/myjobs";

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
/* 44 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_webix_jet__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__common_formatters__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_myjobs__ = __webpack_require__(43);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__workerDetails__ = __webpack_require__(30);
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
        var self = this;
        self.workerDetailsView = self.ui(__WEBPACK_IMPORTED_MODULE_3__workerDetails__["default"]);

        __WEBPACK_IMPORTED_MODULE_2__services_myjobs__["a" /* myjobs */].listWorkers().then(function (data) {
            view.parse(data);
        });

        self.workerTable = this.$$("workers_table");

        self.workerTable.attachEvent("onItemDblClick", function () {
            var id = self.workerTable.getSelectedId();
            var item = self.workerTable.getItem(id);
            var WorkerData = {
                'debug': item['debug'].toString(),
                'halt': item['halt'].toString(),
                'error': item['error']['message'],
                'pid': item['pid'],
                'current_job': item['current_job'],
                'name': item['name'],
                'state': item['state'],
                'last_update': Object(__WEBPACK_IMPORTED_MODULE_1__common_formatters__["a" /* dateFormatter */])(item['last_update']),
                'time_start': Object(__WEBPACK_IMPORTED_MODULE_1__common_formatters__["a" /* dateFormatter */])(item['time_start']),
                'timeout': item['timeout'],
                'type': item['type']
            };
            self.workerDetailsView.showWorkerDetails(WorkerData);
        });
    };

    return JobsView;
}(__WEBPACK_IMPORTED_MODULE_0_webix_jet__["b" /* JetView */]);

/* harmony default export */ __webpack_exports__["default"] = (JobsView);

/***/ }),
/* 45 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__external__ = __webpack_require__(1);
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }



var ChatflowView = function (_ExternalView) {
    _inherits(ChatflowView, _ExternalView);

    function ChatflowView(app, name) {
        _classCallCheck(this, ChatflowView);

        var _this = _possibleConstructorReturn(this, _ExternalView.call(this, app, name));

        _this.baseGitUrl = "https://github.com/threefoldtech/jumpscaleX_threebot/tree/development/ThreeBotPackages";

        return _this;
    }

    ChatflowView.prototype.urlChange = function urlChange(view, url) {
        var params = url[0].params;
        if (Object.keys(params).length !== 3) {
            return;
        }

        var packageName = params.author + "." + params.package;
        var packageUrl = packageName.replace(".", "/");

        this.targetUrl = "/" + packageUrl + "/chat/" + params.chat + "?noheader=yes";
        this.requiredPackages = {};
        this.requiredPackages[packageName] = this.baseGitUrl + "/" + packageUrl;

        this.init(view);
    };

    return ChatflowView;
}(__WEBPACK_IMPORTED_MODULE_0__external__["ExternalView"]);

/* harmony default export */ __webpack_exports__["default"] = (ChatflowView);

/***/ }),
/* 46 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__external__ = __webpack_require__(1);
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }



var TFGRIDSDK_URL = "/threefold/info_tfgridsdk/";
var REQUIRED_PACKAGES = {
    "threefold.wikis": "https://github.com/threefoldtech/jumpscaleX_threebot/tree/development/ThreeBotPackages/threefold/wikis"
};

var TFGridSDKWiki = function (_ExternalView) {
    _inherits(TFGridSDKWiki, _ExternalView);

    function TFGridSDKWiki(app, name) {
        _classCallCheck(this, TFGridSDKWiki);

        return _possibleConstructorReturn(this, _ExternalView.call(this, app, name, TFGRIDSDK_URL, REQUIRED_PACKAGES));
    }

    return TFGridSDKWiki;
}(__WEBPACK_IMPORTED_MODULE_0__external__["ExternalView"]);

/* harmony default export */ __webpack_exports__["default"] = (TFGridSDKWiki);

/***/ }),
/* 47 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__external__ = __webpack_require__(1);
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }



var THREEFOLD_URL = "/threefold/info_threefold/";
var REQUIRED_PACKAGES = {
    "threefold.wikis": "https://github.com/threefoldtech/jumpscaleX_threebot/tree/development/ThreeBotPackages/threefold/wikis"
};

var ThreefoldWiki = function (_ExternalView) {
    _inherits(ThreefoldWiki, _ExternalView);

    function ThreefoldWiki(app, name) {
        _classCallCheck(this, ThreefoldWiki);

        return _possibleConstructorReturn(this, _ExternalView.call(this, app, name, THREEFOLD_URL, REQUIRED_PACKAGES));
    }

    return ThreefoldWiki;
}(__WEBPACK_IMPORTED_MODULE_0__external__["ExternalView"]);

/* harmony default export */ __webpack_exports__["default"] = (ThreefoldWiki);

/***/ }),
/* 48 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__external__ = __webpack_require__(1);
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }



var WikiExternalView = function (_ExternalView) {
    _inherits(WikiExternalView, _ExternalView);

    function WikiExternalView(app, name) {
        _classCallCheck(this, WikiExternalView);

        return _possibleConstructorReturn(this, _ExternalView.call(this, app, name));
    }

    WikiExternalView.prototype.urlChange = function urlChange(view, url) {
        var params = url[0].params;
        if (Object.keys(params).length !== 1) {
            return;
        }

        this.targetUrl = "/wiki/" + params.name;

        this.init(view);
    };

    return WikiExternalView;
}(__WEBPACK_IMPORTED_MODULE_0__external__["ExternalView"]);

/* harmony default export */ __webpack_exports__["default"] = (WikiExternalView);

/***/ }),
/* 49 */
/***/ (function(module, exports) {



/***/ }),
/* 50 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__styles_app_css__ = __webpack_require__(51);
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
/* 51 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 52 */
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./alerts": 7,
	"./alerts/": 7,
	"./alerts/alert": 23,
	"./alerts/alert.js": 23,
	"./alerts/data": 5,
	"./alerts/data.js": 5,
	"./alerts/index": 7,
	"./alerts/index.js": 7,
	"./capacity": 9,
	"./capacity/": 9,
	"./capacity/index": 9,
	"./capacity/index.js": 9,
	"./circles": 10,
	"./circles/": 10,
	"./circles/index": 10,
	"./circles/index.js": 10,
	"./circlestories": 11,
	"./circlestories/": 11,
	"./circlestories/index": 11,
	"./circlestories/index.js": 11,
	"./circletasks": 12,
	"./circletasks/": 12,
	"./circletasks/index": 12,
	"./circletasks/index.js": 12,
	"./codeserver": 13,
	"./codeserver/": 13,
	"./codeserver/index": 13,
	"./codeserver/index.js": 13,
	"./dash": 14,
	"./dash/": 14,
	"./dash/diskSpace": 35,
	"./dash/diskSpace.js": 35,
	"./dash/health": 36,
	"./dash/health.js": 36,
	"./dash/index": 14,
	"./dash/index.js": 14,
	"./dash/jsxInfo": 37,
	"./dash/jsxInfo.js": 37,
	"./dash/processDetails": 26,
	"./dash/processDetails.js": 26,
	"./dash/processes": 38,
	"./dash/processes.js": 38,
	"./dash/processesList": 39,
	"./dash/processesList.js": 39,
	"./dash/runningPorts": 40,
	"./dash/runningPorts.js": 40,
	"./deployedSolutions": 15,
	"./deployedSolutions/": 15,
	"./deployedSolutions/index": 15,
	"./deployedSolutions/index.js": 15,
	"./deployedSolutions/reservation": 27,
	"./deployedSolutions/reservation.js": 27,
	"./errors/dialog": 3,
	"./errors/dialog.js": 3,
	"./external": 1,
	"./external/": 1,
	"./external/index": 1,
	"./external/index.js": 1,
	"./farmmanagement": 16,
	"./farmmanagement/": 16,
	"./farmmanagement/index": 16,
	"./farmmanagement/index.js": 16,
	"./jupyter": 17,
	"./jupyter/": 17,
	"./jupyter/index": 17,
	"./jupyter/index.js": 17,
	"./logs": 18,
	"./logs/": 18,
	"./logs/appLogs": 28,
	"./logs/appLogs.js": 28,
	"./logs/index": 18,
	"./logs/index.js": 18,
	"./main": 41,
	"./main.js": 41,
	"./myjobs/jobDetails": 29,
	"./myjobs/jobDetails.js": 29,
	"./myjobs/jobs": 42,
	"./myjobs/jobs.js": 42,
	"./myjobs/workerDetails": 30,
	"./myjobs/workerDetails.js": 30,
	"./myjobs/workers": 44,
	"./myjobs/workers.js": 44,
	"./packages": 19,
	"./packages/": 19,
	"./packages/index": 19,
	"./packages/index.js": 19,
	"./sdkexamples": 20,
	"./sdkexamples/": 20,
	"./sdkexamples/index": 20,
	"./sdkexamples/index.js": 20,
	"./settings": 21,
	"./settings/": 21,
	"./settings/admins": 31,
	"./settings/admins.js": 31,
	"./settings/general": 32,
	"./settings/general.js": 32,
	"./settings/index": 21,
	"./settings/index.js": 21,
	"./solutions/chatflow": 45,
	"./solutions/chatflow.js": 45,
	"./tfwikis/tfgridsdk": 46,
	"./tfwikis/tfgridsdk.js": 46,
	"./tfwikis/threefold": 47,
	"./tfwikis/threefold.js": 47,
	"./wikis": 22,
	"./wikis/": 22,
	"./wikis/index": 22,
	"./wikis/index.js": 22,
	"./wikis/view": 48,
	"./wikis/view.js": 48
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
webpackContext.id = 52;

/***/ }),
/* 53 */
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
/* 54 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return alerts; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__common_api__ = __webpack_require__(2);
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }



var BASE_URL = "/zerobot/admin/actors/alerta";

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
/* 55 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return solutions; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__common_api__ = __webpack_require__(2);
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }



var BASE_URL = "/tfgrid_solutions/tfgrid_solutions/actors/tfgrid_solutions";

var SolutionsService = function (_Service) {
    _inherits(SolutionsService, _Service);

    function SolutionsService() {
        _classCallCheck(this, SolutionsService);

        return _possibleConstructorReturn(this, _Service.call(this, BASE_URL));
    }

    SolutionsService.prototype.list = function list(opts) {
        opts = opts || {};
        return this.getCall("solutions_list");
    };

    SolutionsService.prototype.delete = function _delete(solutionType, solutionName) {
        return this.postCall("solution_delete", { solution_type: solutionType, solution_name: solutionName });
    };

    return SolutionsService;
}(__WEBPACK_IMPORTED_MODULE_0__common_api__["a" /* Service */]);

var solutions = new SolutionsService();

/***/ }),
/* 56 */
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

    LogsService.prototype.delete = function _delete(appname) {
        return this.postCall("delete", {
            appname: appname
        });
    };

    LogsService.prototype.deleteAll = function deleteAll() {
        return this.postCall("delete");
    };

    LogsService.prototype.deleteSelected = function deleteSelected(ids) {
        return this.getCall("delete_selected", ids);
    };

    return LogsService;
}(__WEBPACK_IMPORTED_MODULE_0__common_api__["a" /* Service */]);

var logs = new LogsService();

/***/ }),
/* 57 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return auth; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__common_api__ = __webpack_require__(2);
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }



var BASE_URL = "/auth";

var AuthService = function (_Service) {
    _inherits(AuthService, _Service);

    function AuthService() {
        _classCallCheck(this, AuthService);

        return _possibleConstructorReturn(this, _Service.call(this, BASE_URL));
    }

    AuthService.prototype.getCurrentUser = function getCurrentUser() {
        return this.getCall("authorized");
    };

    AuthService.prototype.logout = function logout() {
        var nextUrl = window.location.pathname + window.location.hash;
        window.location.href = "/auth/logout?next_url=" + nextUrl;
    };

    return AuthService;
}(__WEBPACK_IMPORTED_MODULE_0__common_api__["a" /* Service */]);

var auth = new AuthService();

/***/ }),
/* 58 */
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
/* 59 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return packages; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__common_api__ = __webpack_require__(2);
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }



var BASE_URL = "/zerobot/webinterface/actors/mdbook";

var WikisService = function (_Service) {
    _inherits(WikisService, _Service);

    function WikisService() {
        _classCallCheck(this, WikisService);

        return _possibleConstructorReturn(this, _Service.call(this, BASE_URL));
    }

    WikisService.prototype.list = function list(opts) {
        opts = opts || {};
        return this.getCall("books_list");
    };

    return WikisService;
}(__WEBPACK_IMPORTED_MODULE_0__common_api__["a" /* Service */]);

var packages = new WikisService();

/***/ }),
/* 60 */
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./en": 49,
	"./en.js": 49
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
webpackContext.id = 60;

/***/ })
/******/ ])["default"];
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgNmQ3OWZhZDViNTUxZGJjNTAzMjYiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3dlYml4LWpldC9kaXN0L2VzNi9qZXQuanMiLCJ3ZWJwYWNrOi8vLy4vc291cmNlcy92aWV3cy9leHRlcm5hbC9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9zb3VyY2VzL2NvbW1vbi9hcGkuanMiLCJ3ZWJwYWNrOi8vLy4vc291cmNlcy92aWV3cy9lcnJvcnMvZGlhbG9nLmpzIiwid2VicGFjazovLy8uL3NvdXJjZXMvc2VydmljZXMvaGVhbHRoLmpzIiwid2VicGFjazovLy8uL3NvdXJjZXMvdmlld3MvYWxlcnRzL2RhdGEuanMiLCJ3ZWJwYWNrOi8vLy4vc291cmNlcy9jb21tb24vZm9ybWF0dGVycy5qcyIsIndlYnBhY2s6Ly8vLi9zb3VyY2VzL3ZpZXdzL2FsZXJ0cy9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9zb3VyY2VzL2NvbW1vbi9jb2xvcnMuanMiLCJ3ZWJwYWNrOi8vLy4vc291cmNlcy92aWV3cy9jYXBhY2l0eS9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9zb3VyY2VzL3ZpZXdzL2NpcmNsZXMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vc291cmNlcy92aWV3cy9jaXJjbGVzdG9yaWVzL2luZGV4LmpzIiwid2VicGFjazovLy8uL3NvdXJjZXMvdmlld3MvY2lyY2xldGFza3MvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vc291cmNlcy92aWV3cy9jb2Rlc2VydmVyL2luZGV4LmpzIiwid2VicGFjazovLy8uL3NvdXJjZXMvdmlld3MvZGFzaC9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9zb3VyY2VzL3ZpZXdzL2RlcGxveWVkU29sdXRpb25zL2luZGV4LmpzIiwid2VicGFjazovLy8uL3NvdXJjZXMvdmlld3MvZmFybW1hbmFnZW1lbnQvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vc291cmNlcy92aWV3cy9qdXB5dGVyL2luZGV4LmpzIiwid2VicGFjazovLy8uL3NvdXJjZXMvdmlld3MvbG9ncy9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9zb3VyY2VzL3ZpZXdzL3BhY2thZ2VzL2luZGV4LmpzIiwid2VicGFjazovLy8uL3NvdXJjZXMvdmlld3Mvc2RrZXhhbXBsZXMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vc291cmNlcy92aWV3cy9zZXR0aW5ncy9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9zb3VyY2VzL3ZpZXdzL3dpa2lzL2luZGV4LmpzIiwid2VicGFjazovLy8uL3NvdXJjZXMvdmlld3MvYWxlcnRzL2FsZXJ0LmpzIiwid2VicGFjazovLy8uL3NvdXJjZXMvc2VydmljZXMvYWRtaW4uanMiLCJ3ZWJwYWNrOi8vLy4vc291cmNlcy9zZXJ2aWNlcy90YWlnYS5qcyIsIndlYnBhY2s6Ly8vLi9zb3VyY2VzL3ZpZXdzL2Rhc2gvcHJvY2Vzc0RldGFpbHMuanMiLCJ3ZWJwYWNrOi8vLy4vc291cmNlcy92aWV3cy9kZXBsb3llZFNvbHV0aW9ucy9yZXNlcnZhdGlvbi5qcyIsIndlYnBhY2s6Ly8vLi9zb3VyY2VzL3ZpZXdzL2xvZ3MvYXBwTG9ncy5qcyIsIndlYnBhY2s6Ly8vLi9zb3VyY2VzL3ZpZXdzL215am9icy9qb2JEZXRhaWxzLmpzIiwid2VicGFjazovLy8uL3NvdXJjZXMvdmlld3MvbXlqb2JzL3dvcmtlckRldGFpbHMuanMiLCJ3ZWJwYWNrOi8vLy4vc291cmNlcy92aWV3cy9zZXR0aW5ncy9hZG1pbnMuanMiLCJ3ZWJwYWNrOi8vLy4vc291cmNlcy92aWV3cy9zZXR0aW5ncy9nZW5lcmFsLmpzIiwid2VicGFjazovLy8uL3NvdXJjZXMvY29tbW9uL2ZpbHRlcnMuanMiLCJ3ZWJwYWNrOi8vLy4vc291cmNlcy9zZXJ2aWNlcy9wYWNrYWdlcy5qcyIsIndlYnBhY2s6Ly8vLi9zb3VyY2VzL3ZpZXdzL2Rhc2gvZGlza1NwYWNlLmpzIiwid2VicGFjazovLy8uL3NvdXJjZXMvdmlld3MvZGFzaC9oZWFsdGguanMiLCJ3ZWJwYWNrOi8vLy4vc291cmNlcy92aWV3cy9kYXNoL2pzeEluZm8uanMiLCJ3ZWJwYWNrOi8vLy4vc291cmNlcy92aWV3cy9kYXNoL3Byb2Nlc3Nlcy5qcyIsIndlYnBhY2s6Ly8vLi9zb3VyY2VzL3ZpZXdzL2Rhc2gvcHJvY2Vzc2VzTGlzdC5qcyIsIndlYnBhY2s6Ly8vLi9zb3VyY2VzL3ZpZXdzL2Rhc2gvcnVubmluZ1BvcnRzLmpzIiwid2VicGFjazovLy8uL3NvdXJjZXMvdmlld3MvbWFpbi5qcyIsIndlYnBhY2s6Ly8vLi9zb3VyY2VzL3ZpZXdzL215am9icy9qb2JzLmpzIiwid2VicGFjazovLy8uL3NvdXJjZXMvc2VydmljZXMvbXlqb2JzLmpzIiwid2VicGFjazovLy8uL3NvdXJjZXMvdmlld3MvbXlqb2JzL3dvcmtlcnMuanMiLCJ3ZWJwYWNrOi8vLy4vc291cmNlcy92aWV3cy9zb2x1dGlvbnMvY2hhdGZsb3cuanMiLCJ3ZWJwYWNrOi8vLy4vc291cmNlcy92aWV3cy90Zndpa2lzL3RmZ3JpZHNkay5qcyIsIndlYnBhY2s6Ly8vLi9zb3VyY2VzL3ZpZXdzL3Rmd2lraXMvdGhyZWVmb2xkLmpzIiwid2VicGFjazovLy8uL3NvdXJjZXMvdmlld3Mvd2lraXMvdmlldy5qcyIsIndlYnBhY2s6Ly8vLi9zb3VyY2VzL2FwcC5qcyIsIndlYnBhY2s6Ly8vLi9zb3VyY2VzL3N0eWxlcy9hcHAuY3NzIiwid2VicGFjazovLy8uL3NvdXJjZXMvdmlld3MgXlxcLlxcLy4qJCIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvYW5zaV91cC9hbnNpX3VwLmpzIiwid2VicGFjazovLy8uL3NvdXJjZXMvc2VydmljZXMvYWxlcnRzLmpzIiwid2VicGFjazovLy8uL3NvdXJjZXMvc2VydmljZXMvZGVwbG95ZWRTb2x1dGlvbnMuanMiLCJ3ZWJwYWNrOi8vLy4vc291cmNlcy9zZXJ2aWNlcy9sb2dzLmpzIiwid2VicGFjazovLy8uL3NvdXJjZXMvc2VydmljZXMvYXV0aC5qcyIsIndlYnBhY2s6Ly8vLi9zb3VyY2VzL2NvbW1vbi9kaWFsb2dzLmpzIiwid2VicGFjazovLy8uL3NvdXJjZXMvc2VydmljZXMvd2lraS5qcyIsIndlYnBhY2s6Ly8vLi9zb3VyY2VzL2xvY2FsZXMgXlxcLlxcLy4qJCJdLCJuYW1lcyI6WyJOYXZpZ2F0aW9uQmxvY2tlZCIsIkpldEJhc2UiLCJ3ZWJpeCIsIndlYml4SmV0IiwiX2V2ZW50cyIsIl9zdWJzIiwiX2RhdGEiLCJnZXRSb290IiwiX3Jvb3QiLCJkZXN0cnVjdG9yIiwiX2RldGFjaEV2ZW50cyIsIl9kZXN0cm95U3VicyIsIl9jb250YWluZXIiLCJhcHAiLCJfcGFyZW50Iiwic2V0UGFyYW0iLCJpZCIsInZhbHVlIiwidXJsIiwiX3NlZ21lbnQiLCJ1cGRhdGUiLCJzaG93IiwiZ2V0UGFyYW0iLCJwYXJlbnQiLCJ2aWV3IiwiZ2V0UGFyZW50VmlldyIsImdldFVybCIsInN1YnVybCIsImdldFVybFN0cmluZyIsInRvU3RyaW5nIiwiJCQiLCJyb290IiwicXVlcnlWaWV3Iiwib2JqIiwiY29uZmlnIiwibG9jYWxJZCIsIiRzY29wZSIsIm9uIiwibmFtZSIsImNvZGUiLCJhdHRhY2hFdmVudCIsInB1c2giLCJjb250YWlucyIsImtleSIsImtpZCIsImdldFN1YlZpZXciLCJzdWIiLCJnZXRTdWJWaWV3SW5mbyIsInN1YnZpZXciLCJwb3B1cCIsImV2ZW50cyIsImkiLCJsZW5ndGgiLCJkZXRhY2hFdmVudCIsInN1YlZpZXciLCJfaW5pdF91cmxfZGF0YSIsImN1cnJlbnQiLCJleHRlbmQiLCJwYXJhbXMiLCJfZ2V0RGVmYXVsdFN1YiIsImRlZmF1bHQiLCJicmFuY2giLCJjaGlsZCIsIl9yb3V0ZWRfdmlldyIsInBhcnNlIiwic3Vic3RyIiwicGFydHMiLCJzcGxpdCIsImNodW5rcyIsInRlc3QiLCJyZXN1bHQiLCJwb3MiLCJpbmRleE9mIiwicGFyYW0iLCJkY2h1bmsiLCJkZWNvZGVVUklDb21wb25lbnQiLCJwYWdlIiwiaXNOZXciLCJ1cmwyc3RyIiwic3RhY2siLCJjaHVuayIsIm9iajJzdHIiLCJqb2luIiwic3RyIiwiZW5jb2RlVVJJQ29tcG9uZW50IiwiUm91dGUiLCJyb3V0ZSIsImluZGV4IiwiX25leHQiLCJwYXRoIiwibmV4dCIsInNsaWNlIiwic2hpZnQiLCJyZWZyZXNoIiwiX2pvaW4iLCJraWRzIiwib2xkIiwiY29uY2F0IiwiYXBwZW5kIiwiUHJvbWlzZSIsInJlcyIsInJlaiIsInJlZGlyZWN0IiwiY29uZmlybSIsInJlc29sdmUiLCJjYWxsRXZlbnQiLCJjYXRjaCIsImVyciIsInRoZW4iLCJzaXplIiwibiIsIkpldFZpZXciLCJfY2hpbGRyZW4iLCJ1aSIsImNvbnRhaW5lciIsImpldHZpZXciLCJjcmVhdGVWaWV3IiwicmVuZGVyIiwidGFyZ2V0IiwiX3JlbmRlckZyYW1lTG9jayIsIl9zaG93Iiwic2VnbWVudCIsIl91cmxDaGFuZ2UiLCJsaW5rUm91dGVyIiwiZ2V0Um91dGVyIiwic2V0Iiwic2lsZW50IiwiaW5pdCIsIl8kdmlldyIsIl8kIiwicmVhZHkiLCJfJHVybCIsIm1lc3NhZ2UiLCJ1cmxDaGFuZ2UiLCJkZXN0cm95IiwiX2Rlc3Ryb3lLaWRzIiwidXNlIiwicGx1Z2luIiwidGFnTmFtZSIsIl9yZW5kZXIiLCJkb2N1bWVudCIsImJvZHkiLCJ0b05vZGUiLCJfcmVuZGVyX2ZpbmFsIiwiY2ZnIiwic2xvdCIsInJlamVjdCIsInJlc3BvbnNlIiwiY29weUNvbmZpZyIsIm9sZHVpIiwiYXNXaW4iLCJzZXRQb3NpdGlvbiIsImlzVmlzaWJsZSIsIl9pbml0IiwiX2luaXRVcmwiLCJlIiwiX2luaXRFcnJvciIsIndhaXRzIiwiZnJhbWUiLCJ3YWl0IiwiYWxsIiwibG9jayIsIl9yZW5kZXJGcmFtZSIsIl9jcmVhdGVTdWJWaWV3IiwiZXJyb3IiLCJjcmVhdGVGcm9tVVJMIiwidWlzIiwiSmV0Vmlld1JhdyIsIl91aSIsIlN1YlJvdXRlciIsImNiIiwiYSIsImdldCIsIl9vbmNlIiwiSmV0QXBwQmFzZSIsIndpbmRvdyIsInZlcnNpb24iLCJzdGFydCIsIl9zZXJ2aWNlcyIsIkV2ZW50U3lzdGVtIiwiX3N1YlNlZ21lbnQiLCJnZXRTZXJ2aWNlIiwic2V0U2VydmljZSIsImhhbmRsZXIiLCJwcm90b3R5cGUiLCIkc3VidmlldyIsImFkZFN1YlZpZXciLCJBcnJheSIsIm1ldGhvZCIsInBvaW50IiwiRGF0YUNvbGxlY3Rpb24iLCJSZWdFeHAiLCJNYXAiLCJEYXRlIiwiY29weSIsIiRyb3V0ZXIiLCJjbGlja0hhbmRsZXIiLCJzcmNFbGVtZW50IiwiZ2V0QXR0cmlidXRlIiwidHJpZ2dlciIsIl9mb3JWaWV3IiwiY2FuY2VsQnViYmxlIiwicHJldmVudERlZmF1bHQiLCJwYXJlbnROb2RlIiwibG9hZFZpZXciLCJ2aWV3cyIsIl9sb2FkRXJyb3IiLCJFcnJvciIsIl9sb2FkVmlld0R5bmFtaWMiLCJtb2R1bGUiLCJfX2VzTW9kdWxlIiwicm91dGVyIiwicmVzdCIsImFwcGx5IiwiZGF0YSIsImFjdGlvbiIsImJpbmQiLCJlciIsImRlYnVnIiwiY29uc29sZSIsInRleHQiLCJyZXBsYWNlIiwiaW5uZXJIVE1MIiwidHlwZSIsImV4cGlyZSIsImZpcnN0SW5pdCIsImV2ZW50IiwiX2ZpcnN0X3N0YXJ0IiwidG9wIiwiYmFzZSIsInNldFRpbWVvdXQiLCJhbmltYXRpb24iLCJub2RlIiwiaHRtbCIsImFkZENzcyIsInJlbW92ZUNzcyIsInVybFN0cmluZyIsInRlbXBsYXRlIiwidWlkIiwiSGFzaFJvdXRlciIsIl9kZXRlY3RQcmVmaXgiLCJvbnBvcHN0YXRlIiwicm91dGVzIiwiY29tcGFyZSIsImhpc3RvcnkiLCJwdXNoU3RhdGUiLCJwcmVmaXgiLCJzdWZpeCIsIl9nZXRSYXciLCJyb3V0ZXJQcmVmaXgiLCJsb2NhdGlvbiIsImhyZWYiLCJpc1BhdGNoZWQiLCJwYXRjaCIsInciLCJ3aW4iLCJwcm9taXNlIiwiZnJlZXplIiwic29tZSIsIiRmcmVlemUiLCJyZXNpemUiLCJiYXNlQWRkIiwiYmFzZWxheW91dCIsImFkZFZpZXciLCJiYXNlUmVtb3ZlIiwicmVtb3ZlVmlldyIsImp2aWV3Iiwic3VicyIsImFyZ3VtZW50cyIsImxheW91dCIsInByb3RvVUkiLCIkaW5pdCIsIiRhcHAiLCIkcmVhZHkiLCJvcmlnaW4iLCJwcm94eSIsIkpldEFwcCIsInJlcXVpcmUiLCJTdG9yZVJvdXRlciIsInN0b3JhZ2UiLCJzZXNzaW9uIiwic3RvcmVOYW1lIiwicHV0IiwiVXJsUm91dGVyIiwicGF0aG5hbWUiLCJzZWFyY2giLCJFbXB0eVJvdXRlciIsIl8kY29uZmlnIiwiVW5sb2FkR3VhcmQiLCJoYXMiLCJzdG9yZSIsIk9iamVjdCIsImhhc093blByb3BlcnR5IiwiY2FsbCIsImZvckVhY2giLCJjb250ZXh0IiwidHJpbSIsIndhcm4iLCJ4IiwiU3RyaW5nIiwiZGVsaW1pdGVyIiwicnVzc2lhblBsdXJhbEdyb3VwcyIsImVuZCIsInBsdXJhbFR5cGVzIiwiYXJhYmljIiwibGFzdFR3byIsImJvc25pYW5fc2VyYmlhbiIsImNoaW5lc2UiLCJjcm9hdGlhbiIsImZyZW5jaCIsImdlcm1hbiIsInJ1c3NpYW4iLCJsaXRodWFuaWFuIiwiY3plY2giLCJwb2xpc2giLCJpY2VsYW5kaWMiLCJzbG92ZW5pYW4iLCJwbHVyYWxUeXBlVG9MYW5ndWFnZXMiLCJsYW5nVG9UeXBlTWFwIiwibWFwcGluZyIsInJldCIsImxhbmdzIiwibGFuZyIsInBsdXJhbFR5cGVOYW1lIiwibG9jYWxlIiwibGFuZ1RvUGx1cmFsVHlwZSIsImVuIiwicGx1cmFsVHlwZUluZGV4IiwiY291bnQiLCJlc2NhcGUiLCJ0b2tlbiIsImNvbnN0cnVjdFRva2VuUmVnZXgiLCJvcHRzIiwic3VmZml4IiwiUmFuZ2VFcnJvciIsImRvbGxhclJlZ2V4IiwiZG9sbGFyQmlsbHNZYWxsIiwiZGVmYXVsdFRva2VuUmVnZXgiLCJ0cmFuc2Zvcm1QaHJhc2UiLCJwaHJhc2UiLCJzdWJzdGl0dXRpb25zIiwidG9rZW5SZWdleCIsIlR5cGVFcnJvciIsImludGVycG9sYXRpb25SZWdleCIsIm9wdGlvbnMiLCJzbWFydF9jb3VudCIsInRleHRzIiwiZXhwcmVzc2lvbiIsImFyZ3VtZW50IiwiUG9seWdsb3QiLCJwaHJhc2VzIiwiY3VycmVudExvY2FsZSIsImFsbG93TWlzc2luZyIsIm9uTWlzc2luZ0tleSIsImludGVycG9sYXRpb24iLCJuZXdMb2NhbGUiLCJtb3JlUGhyYXNlcyIsInByZWZpeGVkS2V5IiwidW5zZXQiLCJjbGVhciIsIm5ld1BocmFzZXMiLCJ0IiwiXyIsInRyYW5zZm9ybSIsIndlYml4UG9seWdsb3QiLCJMb2NhbGUiLCJfdmlldyIsInNldExhbmdEYXRhIiwicGNvbmZpZyIsInBvbHlnbG90IiwicG9seSIsInNlcnZpY2UiLCJsb2NOYW1lIiwiaTE4biIsInNldExvY2FsZSIsImdldExhbmciLCJzZXRMYW5nIiwidXJscyIsIk1lbnUiLCJnZXRWYWx1ZSIsInNldFZhbHVlIiwiZ2V0U2VsZWN0ZWRJZCIsInNlbGVjdCIsImV4aXN0cyIsImJhc2VpY29ucyIsImdvb2QiLCJzYXZpbmciLCJiYXNldGV4dCIsIlN0YXR1cyIsInN0YXR1cyIsImlzZXJyb3IiLCJleHBpcmVEZWxheSIsImljb25zIiwiY29udGVudCIsImFyZWEiLCJzZXRIVE1MIiwic3VjY2VzcyIsInNldFN0YXR1cyIsImZhaWwiLCJnZXRTdGF0dXMiLCJoaWRlU3RhdHVzIiwibW9kZSIsInJlc3BvbnNlVGV4dCIsInRyYWNrIiwiZHAiLCJfaWQiLCJfb2JqIiwicmVtb3RlIiwiYWpheCIsIl9tb2RlIiwiX3VybCIsIl9yZXF1ZXN0IiwiX2hlYWRlcnMiLCJfZmlsZXMiLCJUaGVtZSIsInRoZW1lIiwiZ2V0VGhlbWUiLCJzZXRUaGVtZSIsImxpbmtzIiwiZ2V0RWxlbWVudHNCeVRhZ05hbWUiLCJsbmFtZSIsImRpc2FibGVkIiwic2tpbiIsImNvcHlQYXJhbXMiLCJVcmxQYXJhbSIsIm9zIiwib2ciLCJ2YWwiLCJVc2VyIiwibG9naW4iLCJsb2dvdXQiLCJhZnRlckxvZ2luIiwiYWZ0ZXJMb2dvdXQiLCJwaW5nIiwibW9kZWwiLCJ1c2VyIiwiZ2V0VXNlciIsInNlcnZlciIsInBhc3MiLCJjYW5OYXZpZ2F0ZSIsIl8kcm9vdCIsInB1YmxpYyIsInNldEludGVydmFsIiwicGx1Z2lucyIsImVycm9ycyIsIlNUQVRVU19JTlNUQUxMRUQiLCJFeHRlcm5hbFZpZXciLCJ0YXJnZXRVcmwiLCJyZXF1aXJlZFBhY2thZ2VzIiwic2VsZiIsImlmcmFtZSIsIm9uQWZ0ZXJMb2FkIiwiaGlkZVByb2dyZXNzIiwiZW5hYmxlIiwicm93cyIsImhpZGRlbiIsImNvbHMiLCJhdXRvaGVpZ2h0IiwiY3NzIiwiaGVpZ2h0IiwiY2xpY2siLCJpbnN0YWxsUmVxdWlyZWRQYWNrYWdlcyIsInByb21pc2VzIiwidmFsdWVzIiwicGFja2FnZXNUb0luc3RhbGwiLCJtYXAiLCJwYWNrYWdlcyIsImFkZCIsImluc3RhbGxCdXR0b24iLCJkaXNhYmxlIiwicmVsb2FkIiwic2hvd0lmcmFtZSIsImV4dGVybmFsSWZyYW1lIiwic2hvd1Byb2dyZXNzIiwibG9hZCIsIlByb2dyZXNzQmFyIiwicGFja2FnZU5hbWVzIiwia2V5cyIsInJlcXVpcmVkUGFja2FnZXNEaXYiLCJpbnN0YWxsUGFja2FnZUNvbnRhaW5lciIsInBhY2thZ2VTdGF0ZXMiLCJqc29uIiwicGFja2FnZU5hbWVzVG9JbnN0YWxsIiwiaGlkZSIsIm5hbWVzIiwiaGVhZGVycyIsIlNlcnZpY2UiLCJiYXNlVXJsIiwiam9pblVybCIsImFyZ3MiLCJ0b0xvd2VyQ2FzZSIsInBvc3QiLCJWYWx1ZUVycm9yIiwiZ2V0Q2FsbCIsInBvc3RDYWxsIiwiRXJyb3JWaWV3Iiwic2Nyb2xsIiwiaGVhZCIsIm1vZGFsIiwid2lkdGgiLCJwb3NpdGlvbiIsImdldFRvcFBhcmVudFZpZXciLCJzaG93RXJyb3IiLCJhbnNpVXAiLCJhbnNpX3RvX2h0bWwiLCJnZXRIZWFkIiwiQkFTRV9VUkwiLCJIZWFsdGhTZXJ2aWNlIiwiZ2V0RGlza1NwYWNlIiwiZ2V0SGVhbHRoIiwiZ2V0SWRlbnRpdHkiLCJnZXROZXR3b3JrSW5mbyIsImdldEpzeFZlcnNpb24iLCJnZXRSdW5uaW5nUHJvY2Vzc2VzIiwiZ2V0UnVubmluZ1BvcnRzIiwia2lsbFByb2Nlc3Nlc0J5UGlkIiwiaWRzIiwia2lsbFByb2Nlc3Nlc0J5UG9ydCIsInBvcnRzIiwiZ2V0UHJvY2Vzc0RldGFpbHMiLCJwaWQiLCJoZWFsdGgiLCJNQVhfTVNHX0xFTiIsIkxFVkVMUyIsIlNUQVRFUyIsIlRZUEVTIiwiZGF0ZUZvcm1hdCIsIndlYml4RGF0ZUZvcm1hdHRlciIsImRhdGVUb1N0ciIsImRhdGVGb3JtYXR0ZXIiLCJwYXJzZUludCIsIkFsZXJ0c1ZpZXciLCJyZXNpemVDb2x1bW4iLCJtdWx0aXNlbGVjdCIsImNvbHVtbnMiLCJoZWFkZXIiLCJzb3J0IiwiYXV0b3dpZHRoIiwiZm9ybWF0IiwiY3JlYXRlRmlsdGVyT3B0aW9ucyIsImZpbGxzcGFjZSIsImF1dG9Db25maWciLCJzY2hlbWUiLCJkZWxldGVJdGVtIiwib2JqZWN0cyIsIml0ZW1zIiwiaW5kZXhlcyIsIml0ZW0iLCJ0YWJsZSIsImdldEl0ZW0iLCJ0aXRsZSIsIm9rIiwiY2FuY2VsIiwiaWRlbnRpZmllcnMiLCJpZGVudGlmaWVyIiwiYWxlcnRzIiwiZGVsZXRlIiwicmVtb3ZlIiwidmlld0l0ZW0iLCJhbGVydFZpZXciLCJzaG93Rm9yIiwiQWxlcnRWaWV3IiwiY2xlYXJBbGwiLCJsaXN0IiwiYXR0YWNoVG8iLCJBbnNpVXAiLCJDYXBhY2l0eVZpZXciLCJhZG1pbiIsImdldF9leHBsb3JlciIsImV4cGxvcmVyIiwic3RhcnRzV2l0aCIsIkNpcmNsZXNWaWV3IiwiZ3JpZCIsIm9uQ29udGV4dCIsImVycm9yVmlldyIsIm1lbnUiLCJjaXJjbGVUYWJsZSIsImluZm8iLCJKU09OIiwidXNlcm5hbWUiLCJ0YWlnYSIsInVzZXJDaXJjbGVzIiwiY2lyY2xlcyIsIkNpcmNsZXN0b3JpZXNWaWV3Iiwic3Rvcmllc1RhYmxlIiwidXNlclN0b3JpZXMiLCJzdG9yaWVzIiwiQ2lyY2xlc1Rhc2tzVmlldyIsInRhc2tzVGFibGUiLCJ1c2VyVGFza3MiLCJ0YXNrcyIsIkNPREVfVVJMIiwiUkVRVUlSRURfUEFDS0FHRVMiLCJDb2Rlc2VydmVyVmlldyIsIlRvcFZpZXciLCJyZXNwb25zaXZlIiwiVU5LTk9XTl9TVEFUVVMiLCJEZXBsb3llZFNvbHV0aW9uc1ZpZXciLCJzb2x1dGlvbk5hbWUiLCJyZXN2SWQiLCJyZXNlcnZhdGlvbiIsInNvbHV0aW9uVHlwZSIsIm5leHRBY3Rpb24iLCJuZXh0X2FjdGlvbiIsInNob3dPdmVybGF5IiwiaGlkZU92ZXJsYXkiLCJoYW5kbGVSZXN1bHQiLCJjYWxsYmFjayIsInNvbHV0aW9uc1RhYmxlIiwic29sdXRpb25JdGVtIiwic29sdXRpb24iLCJGdW5jdGlvbiIsImRlbGV0ZVNvbHV0aW9uIiwiaXRlbUlkIiwic29sdXRpb25zIiwibG9hZFNvbHV0aW9ucyIsImZvcm1faW5mbyIsInJlc2VydmF0aW9uVmlldyIsIlJlc2VydmF0aW9uVmlldyIsImNoZWNrQWN0aW9uIiwic2VsZWN0ZWRJdGVtSWQiLCIkdmlldyIsImxvY2F0ZSIsInJvdyIsImFjdGlvbnMiLCJwcmV2ZW50RXZlbnQiLCJVUkwiLCJGYXJtbWFuYWdlbWVudFZpZXciLCJKdXB5dGVyVmlldyIsIkxvZ3NWaWV3IiwicGxhY2Vob2xkZXIiLCJhbGlnbiIsIm9uQ2hhbmdlIiwiYXBwTmFtZSIsImlucHV0V2lkdGgiLCJkZWxldGVfYWxsIiwiQXBwTG9nc1ZpZXciLCJhcHBzQ29tYm8iLCJsb2dzIiwibGlzdEFwcHMiLCJkZWZpbmUiLCJhcHBuYW1lIiwibG9nSWQiLCJsb2dpZCIsImFwcExvZ3MiLCJkZWxldGVTZWxlY3RlZCIsImRlbGV0ZUFsbCIsIlBBQ0tBR0VfU1RBVEVTIiwiUGFja2FnZXNWaWV3IiwiaW5wdXRBbGlnbiIsInNvdXJjZV9uYW1lIiwic291cmNlIiwiYXV0aG9yIiwidGhyZWVib3QiLCJwYWNrYWdlVGFibGUiLCJwYWNrYWdlSXRlbSIsInBhY2thZ2UiLCJhZGRQYWNrYWdlIiwiZ2l0VXJsIiwidXBkYXRlSXRlbSIsImRlbGV0ZVBhY2thZ2UiLCJwYWNrYWdlTmFtZSIsInN0YXJ0UGFja2FnZSIsInN0b3BQYWNrYWdlIiwic3RvcCIsImVuYWJsZVBhY2thZ2UiLCJkaXNhYmxlUGFja2FnZSIsImxvYWRQYWNrYWdlcyIsInBhY2FrZ2VMb2NhdGlvbiIsImFsZXJ0IiwicGFja2FnZU1ldGhvZCIsIlNldHRpbmdzVmlldyIsImNlbGxzIiwiR2VuZXJhbFZpZXciLCJBZG1pbnNWaWV3IiwiV2lraXNWaWV3Iiwib25DbGljayIsImJ0bl92aWV3IiwiZXYiLCJlbGVtZW50c0NvbmZpZyIsImxhYmVsV2lkdGgiLCJlbGVtZW50cyIsImxhYmVsIiwicmVhZG9ubHkiLCJ0YWIiLCJtdWx0aXZpZXciLCJmb3JtIiwidGJWaWV3cyIsInRiVGFicyIsImxvZ0RhdGEiLCJnZXRTZWxlY3RlZEl0ZW0iLCJhcHBfbmFtZSIsImxhdGVzdF9sb2dpZCIsImFkZFRyYWNlYmFjayIsInRiIiwidGJJZCIsInRocmVlYm90X25hbWUiLCJwcm9jZXNzX2lkIiwidGJUaXRsZSIsImZvcm1hdHRlZCIsImFkZE9wdGlvbiIsImNsZWFyVHJhY2VCYWNrcyIsInJlbW92ZU9wdGlvbiIsImFzc2lnbiIsImFsZXJ0X3R5cGUiLCJsZXZlbCIsInRpbWVfZmlyc3QiLCJ0aW1lX2xhc3QiLCJzZXRWYWx1ZXMiLCJ0cmFjZWJhY2tzIiwiQWRtaW5TZXJ2aWNlIiwic2V0X2V4cGxvcmVyIiwiZXhwbG9yZXJfdHlwZSIsIlRhaWdhU2VydmljZSIsIm91dHB1dF90eXBlIiwiUHJvY2Vzc0RldGFpbHNWaWV3Iiwic2hvd1Byb2Nlc3NEZXRhaWxzIiwibmV0d29ya19uYW1lIiwiaXBfcmFuZ2UiLCJpcHJhbmdlIiwiZmFybWVyX3RpZCIsIm5vZGVfaWQiLCJmbGlzdCIsImVudHJ5cG9pbnQiLCJodWJfdXJsIiwiaW50ZXJhY3RpdmUiLCJtYXN0ZXJfaXBzX3N0ciIsIm1hc3Rlcl9pcHMiLCJyZXNlcnZhdGlvbl92aWV3IiwiY3VzdG9tZXJfdGlkIiwicmVzdWx0cyIsImV4cGlyYXRpb24iLCJkYXRhX3Jlc2VydmF0aW9uIiwiZXhwaXJhdGlvbl9yZXNlcnZhdGlvbiIsImNvbnRhaW5lcnMiLCJ2b2x1bWVzIiwiemRicyIsIm5ldHdvcmtzIiwia3ViZXJuZXRlcyIsImZvcm1fbGlzdCIsImZvcm1fa2V5cyIsImZvcm1fdmFsdWVzIiwiZm9ybV9kaWN0IiwicGFnZXIiLCJncm91cCIsImFwcGxvZ3MiLCJtYXJrU29ydGluZyIsIkpvYkRldGFpbHNWaWV3Iiwic2hvd0pvYkRldGFpbHMiLCJXb3JrZXJEZXRhaWxzVmlldyIsInNob3dXb3JrZXJEZXRhaWxzIiwiYWRkQWRtaW4iLCJkZWxldGVfYWRtaW4iLCJkZWxldGVBZG1pbiIsImlucHV0RGlhbG9nIiwiaW5wdXQiLCJ5Q291bnQiLCJkb0FjdGlvbiIsImxvZyIsImV4cGxvcmVyTGlzdCIsImV4cGxvcmVyQWRkcmVzcyIsIm5ld1ZhbHVlIiwiUGFja2FnZXNTZXJ2aWNlIiwiZ2l0X3VybCIsIkRpc2tTcGFjZVZpZXciLCJkaXNrU3BhY2UiLCJkaXNrSW5mbyIsInVzZWQiLCJmcmVlIiwidG90YWwiLCJwZXJjZW50IiwiaGVhbHRoSW5mb1ZpZXciLCJoZWFsdGhJbmZvIiwiYmNkYiIsIndpa2lzIiwiY29kZXNlcnZlciIsImp1cHl0ZXIiLCJKU1hJbmZvVmlldyIsImlwIiwiaXA2IiwiY29sb3JzRGF0YXNldCIsImNvbG9yIiwiUHJvY2Vzc2VzVmlldyIsInByb2Nlc3Nlc0luZm8iLCJwaWVJbm5lclRleHQiLCJwcm9jZXNzZXNMaXN0IiwicnVuUHJvY2Vzc0luZm8iLCJjaGFydHNEYXRhIiwicHJvY2Vzc2VzX2xpc3QiLCJtZW1vcnlVc2FnZSIsIm1lbW9yeV91c2FnZSIsInRvdGFsTWVtb3J5IiwidG90YWxfbWVtIiwidXNhZ2VfcGVyY2VudCIsInRlbXAiLCJNYXRoIiwiY2VpbCIsInJzcyIsInByb2Nlc3Nlc0xpc3RWaWV3Iiwia2lsbFByb2Nlc3MiLCJwcm9jZXNzVGFibGUiLCJwaWRzIiwicHJvY2Vzc0RldGFpbHNWaWV3IiwicnVubmluZ1BvcnRzVmlldyIsInBvcnRzVGFibGUiLCJwb3J0X251bWJlciIsImljb24iLCJoaWRlTWVudSIsInRvb2x0aXAiLCJib3JkZXJsZXNzIiwic2lkZWJhckRhdGEiLCJzeW5jIiwiaGFzX2Zyb250ZW5kX2FyZ3MiLCJwIiwiZnJvbnRlbmRfYXJncyIsInNpZGViYXIiLCJ0b29sYmFyIiwicGFkZGluZyIsInNob3dNZW51IiwiYnV0dG9uSGlkZU1lbnUiLCJidXR0b25TaG93TWVudSIsIm15am9icyIsIndvcmtlcnMiLCJ0ZmdyaWRzZGsiLCJ0aHJlZWZvbGQiLCJ1YnVudHUiLCJuZXR3b3JrIiwibWluaW8iLCJ3ZWJnYXRld2F5IiwiazhzX2NsdXN0ZXIiLCJ1c2VyTWVudSIsImF1dGgiLCJ1c2VybmFtZUxhYmVsIiwiZ2V0Q3VycmVudFVzZXIiLCJkZXZtb2RlIiwiZ2V0VGV4dFNpemUiLCJlbWFpbCIsIkpvYnNWaWV3Iiwic3RyaW5naWZ5Iiwiam9iRGV0YWlsc1ZpZXciLCJqb2JUYWJsZSIsImxpc3RKb2JzIiwiam9iRGF0YSIsIk15am9ic1NlcnZpY2UiLCJsaXN0V29ya2VycyIsIndvcmtlckRldGFpbHNWaWV3Iiwid29ya2VyVGFibGUiLCJXb3JrZXJEYXRhIiwiQ2hhdGZsb3dWaWV3IiwiYmFzZUdpdFVybCIsInBhY2thZ2VVcmwiLCJjaGF0IiwiVEZHUklEU0RLX1VSTCIsIlRGR3JpZFNES1dpa2kiLCJUSFJFRUZPTERfVVJMIiwiVGhyZWVmb2xkV2lraSIsIldpa2lFeHRlcm5hbFZpZXciLCJJbnZlbnRvcnlBcHAiLCJBUFBOQU1FIiwiVkVSU0lPTiIsIlBST0RVQ1RJT04iLCJmYWN0b3J5IiwiZXhwb3J0cyIsIm5vZGVOYW1lIiwiZXhwIiwiX19tYWtlVGVtcGxhdGVPYmplY3QiLCJjb29rZWQiLCJyYXciLCJkZWZpbmVQcm9wZXJ0eSIsIlBhY2tldEtpbmQiLCJzZXR1cF9wYWxldHRlcyIsIl91c2VfY2xhc3NlcyIsIl9lc2NhcGVfZm9yX2h0bWwiLCJib2xkIiwiZmciLCJiZyIsIl9idWZmZXIiLCJfdXJsX3doaXRlbGlzdCIsImFyZyIsImVudW1lcmFibGUiLCJjb25maWd1cmFibGUiLCJfdGhpcyIsImFuc2lfY29sb3JzIiwicmdiIiwiY2xhc3NfbmFtZSIsInBhbGV0dGVfMjU2IiwicGFsZXR0ZSIsInJlYyIsImxldmVscyIsInIiLCJnIiwiYiIsImNvbCIsImdyZXlfbGV2ZWwiLCJncnkiLCJlc2NhcGVfdHh0X2Zvcl9odG1sIiwidHh0IiwiYXBwZW5kX2J1ZmZlciIsImdldF9uZXh0X3BhY2tldCIsInBrdCIsImtpbmQiLCJFT1MiLCJsZW4iLCJUZXh0IiwiSW5jb21wbGV0ZSIsIm5leHRfY2hhciIsImNoYXJBdCIsIkVTQyIsIl9jc2lfcmVnZXgiLCJyZ3giLCJtYXRjaCIsIlVua25vd24iLCJTR1IiLCJycG9zIiwiX29zY19zdCIsInJneEciLCJsYXN0SW5kZXgiLCJtYXRjaF8xIiwiZXhlYyIsIm1hdGNoXzIiLCJfb3NjX3JlZ2V4IiwiT1NDVVJMIiwiYmxvY2tzIiwicGFja2V0IiwidHJhbnNmb3JtX3RvX2h0bWwiLCJ3aXRoX3N0YXRlIiwicHJvY2Vzc19hbnNpIiwicHJvY2Vzc19oeXBlcmxpbmsiLCJzZ3JfY21kcyIsInNncl9jbWRfc3RyIiwibnVtIiwiaXNOYU4iLCJpc19mb3JlZ3JvdW5kIiwibW9kZV9jbWQiLCJwYWxldHRlX2luZGV4IiwiYyIsImZyYWdtZW50Iiwic3R5bGVzIiwiY2xhc3NlcyIsImNsYXNzX3N0cmluZyIsInN0eWxlX3N0cmluZyIsInRtcGxPYmoiLCJzdWJzdCIsIl9pIiwicmVnZXhUZXh0Iiwid3NyZ3giLCJ0eHQyIiwiQWxlcnRzU2VydmljZSIsIlNvbHV0aW9uc1NlcnZpY2UiLCJzb2x1dGlvbl90eXBlIiwic29sdXRpb25fbmFtZSIsIkxvZ3NTZXJ2aWNlIiwiaWRfZnJvbSIsIkF1dGhTZXJ2aWNlIiwibmV4dFVybCIsImhhc2giLCJidXR0b25MYWJlbCIsImhhbmRsZUlucHV0IiwiZ2V0Rm9ybVZpZXciLCJ0ZXh0SW5wdXQiLCJVSU1hbmFnZXIiLCJzZXRGb2N1cyIsIldpa2lzU2VydmljZSJdLCJtYXBwaW5ncyI6Ijs7UUFBQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTs7O1FBR0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0EsS0FBSztRQUNMO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0EsMkJBQTJCLDBCQUEwQixFQUFFO1FBQ3ZELGlDQUFpQyxlQUFlO1FBQ2hEO1FBQ0E7UUFDQTs7UUFFQTtRQUNBLHNEQUFzRCwrREFBK0Q7O1FBRXJIO1FBQ0E7O1FBRUE7UUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztJQzdETUEsaUI7Ozs7SUFHQUMsTztBQUNGLHFCQUFZQyxLQUFaLEVBQW1CO0FBQUE7O0FBQ2YsYUFBS0MsUUFBTCxHQUFnQixJQUFoQjtBQUNBLGFBQUtELEtBQUwsR0FBYUEsS0FBYjtBQUNBLGFBQUtFLE9BQUwsR0FBZSxFQUFmO0FBQ0EsYUFBS0MsS0FBTCxHQUFhLEVBQWI7QUFDQSxhQUFLQyxLQUFMLEdBQWEsRUFBYjtBQUNIOztzQkFDREMsTyxzQkFBVTtBQUNOLGVBQU8sS0FBS0MsS0FBWjtBQUNILEs7O3NCQUNEQyxVLHlCQUFhO0FBQ1QsYUFBS0MsYUFBTDtBQUNBLGFBQUtDLFlBQUw7QUFDQSxhQUFLUCxPQUFMLEdBQWUsS0FBS1EsVUFBTCxHQUFrQixLQUFLQyxHQUFMLEdBQVcsS0FBS0MsT0FBTCxHQUFlLEtBQUtOLEtBQUwsR0FBYSxJQUF4RTtBQUNILEs7O3NCQUNETyxRLHFCQUFTQyxFLEVBQUlDLEssRUFBT0MsRyxFQUFLO0FBQ3JCLFlBQUksS0FBS1osS0FBTCxDQUFXVSxFQUFYLE1BQW1CQyxLQUF2QixFQUE4QjtB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bnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7XG4gXHRcdFx0XHRjb25maWd1cmFibGU6IGZhbHNlLFxuIFx0XHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcbiBcdFx0XHRcdGdldDogZ2V0dGVyXG4gXHRcdFx0fSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiL2NvZGViYXNlL1wiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IDUwKTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyB3ZWJwYWNrL2Jvb3RzdHJhcCA2ZDc5ZmFkNWI1NTFkYmM1MDMyNiIsImNsYXNzIE5hdmlnYXRpb25CbG9ja2VkIHtcclxufVxuXG5jbGFzcyBKZXRCYXNlIHtcclxuICAgIGNvbnN0cnVjdG9yKHdlYml4KSB7XHJcbiAgICAgICAgdGhpcy53ZWJpeEpldCA9IHRydWU7XHJcbiAgICAgICAgdGhpcy53ZWJpeCA9IHdlYml4O1xyXG4gICAgICAgIHRoaXMuX2V2ZW50cyA9IFtdO1xyXG4gICAgICAgIHRoaXMuX3N1YnMgPSB7fTtcclxuICAgICAgICB0aGlzLl9kYXRhID0ge307XHJcbiAgICB9XHJcbiAgICBnZXRSb290KCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9yb290O1xyXG4gICAgfVxyXG4gICAgZGVzdHJ1Y3RvcigpIHtcclxuICAgICAgICB0aGlzLl9kZXRhY2hFdmVudHMoKTtcclxuICAgICAgICB0aGlzLl9kZXN0cm95U3VicygpO1xyXG4gICAgICAgIHRoaXMuX2V2ZW50cyA9IHRoaXMuX2NvbnRhaW5lciA9IHRoaXMuYXBwID0gdGhpcy5fcGFyZW50ID0gdGhpcy5fcm9vdCA9IG51bGw7XHJcbiAgICB9XHJcbiAgICBzZXRQYXJhbShpZCwgdmFsdWUsIHVybCkge1xyXG4gICAgICAgIGlmICh0aGlzLl9kYXRhW2lkXSAhPT0gdmFsdWUpIHtcclxuICAgICAgICAgICAgdGhpcy5fZGF0YVtpZF0gPSB2YWx1ZTtcclxuICAgICAgICAgICAgdGhpcy5fc2VnbWVudC51cGRhdGUoaWQsIHZhbHVlLCAwKTtcclxuICAgICAgICAgICAgaWYgKHVybCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuc2hvdyhudWxsKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGdldFBhcmFtKGlkLCBwYXJlbnQpIHtcclxuICAgICAgICBjb25zdCB2YWx1ZSA9IHRoaXMuX2RhdGFbaWRdO1xyXG4gICAgICAgIGlmICh0eXBlb2YgdmFsdWUgIT09IFwidW5kZWZpbmVkXCIgfHwgIXBhcmVudCkge1xyXG4gICAgICAgICAgICByZXR1cm4gdmFsdWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNvbnN0IHZpZXcgPSB0aGlzLmdldFBhcmVudFZpZXcoKTtcclxuICAgICAgICBpZiAodmlldykge1xyXG4gICAgICAgICAgICByZXR1cm4gdmlldy5nZXRQYXJhbShpZCwgcGFyZW50KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBnZXRVcmwoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX3NlZ21lbnQuc3VidXJsKCk7XHJcbiAgICB9XHJcbiAgICBnZXRVcmxTdHJpbmcoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX3NlZ21lbnQudG9TdHJpbmcoKTtcclxuICAgIH1cclxuICAgIGdldFBhcmVudFZpZXcoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX3BhcmVudDtcclxuICAgIH1cclxuICAgICQkKGlkKSB7XHJcbiAgICAgICAgaWYgKHR5cGVvZiBpZCA9PT0gXCJzdHJpbmdcIikge1xyXG4gICAgICAgICAgICBjb25zdCByb290ID0gdGhpcy5nZXRSb290KCk7XHJcbiAgICAgICAgICAgIHJldHVybiByb290LnF1ZXJ5Vmlldygob2JqID0+IChvYmouY29uZmlnLmlkID09PSBpZCB8fCBvYmouY29uZmlnLmxvY2FsSWQgPT09IGlkKSAmJlxyXG4gICAgICAgICAgICAgICAgKG9iai4kc2NvcGUgPT09IHJvb3QuJHNjb3BlKSksIFwic2VsZlwiKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIHJldHVybiBpZDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBvbihvYmosIG5hbWUsIGNvZGUpIHtcclxuICAgICAgICBjb25zdCBpZCA9IG9iai5hdHRhY2hFdmVudChuYW1lLCBjb2RlKTtcclxuICAgICAgICB0aGlzLl9ldmVudHMucHVzaCh7IG9iaiwgaWQgfSk7XHJcbiAgICAgICAgcmV0dXJuIGlkO1xyXG4gICAgfVxyXG4gICAgY29udGFpbnModmlldykge1xyXG4gICAgICAgIGZvciAoY29uc3Qga2V5IGluIHRoaXMuX3N1YnMpIHtcclxuICAgICAgICAgICAgY29uc3Qga2lkID0gdGhpcy5fc3Vic1trZXldLnZpZXc7XHJcbiAgICAgICAgICAgIGlmIChraWQgPT09IHZpZXcgfHwga2lkLmNvbnRhaW5zKHZpZXcpKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcbiAgICBnZXRTdWJWaWV3KG5hbWUpIHtcclxuICAgICAgICBjb25zdCBzdWIgPSB0aGlzLmdldFN1YlZpZXdJbmZvKG5hbWUpO1xyXG4gICAgICAgIGlmIChzdWIpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHN1Yi5zdWJ2aWV3LnZpZXc7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgZ2V0U3ViVmlld0luZm8obmFtZSkge1xyXG4gICAgICAgIGNvbnN0IHN1YiA9IHRoaXMuX3N1YnNbbmFtZSB8fCBcImRlZmF1bHRcIl07XHJcbiAgICAgICAgaWYgKHN1Yikge1xyXG4gICAgICAgICAgICByZXR1cm4geyBzdWJ2aWV3OiBzdWIsIHBhcmVudDogdGhpcyB9O1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAobmFtZSA9PT0gXCJfdG9wXCIpIHtcclxuICAgICAgICAgICAgdGhpcy5fc3Vic1tuYW1lXSA9IHsgdXJsOiBcIlwiLCBpZDogbnVsbCwgcG9wdXA6IHRydWUgfTtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZ2V0U3ViVmlld0luZm8obmFtZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIHdoZW4gY2FsbGVkIGZyb20gYSBjaGlsZCB2aWV3LCBzZWFyY2hlcyBmb3IgbmVhcmVzdCBwYXJlbnQgd2l0aCBzdWJ2aWV3XHJcbiAgICAgICAgaWYgKHRoaXMuX3BhcmVudCkge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fcGFyZW50LmdldFN1YlZpZXdJbmZvKG5hbWUpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgIH1cclxuICAgIF9kZXRhY2hFdmVudHMoKSB7XHJcbiAgICAgICAgY29uc3QgZXZlbnRzID0gdGhpcy5fZXZlbnRzO1xyXG4gICAgICAgIGZvciAobGV0IGkgPSBldmVudHMubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIHtcclxuICAgICAgICAgICAgZXZlbnRzW2ldLm9iai5kZXRhY2hFdmVudChldmVudHNbaV0uaWQpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIF9kZXN0cm95U3VicygpIHtcclxuICAgICAgICAvLyBkZXN0cm95IHN1YiB2aWV3c1xyXG4gICAgICAgIGZvciAoY29uc3Qga2V5IGluIHRoaXMuX3N1YnMpIHtcclxuICAgICAgICAgICAgY29uc3Qgc3ViVmlldyA9IHRoaXMuX3N1YnNba2V5XS52aWV3O1xyXG4gICAgICAgICAgICAvLyBpdCBwb3NzaWJsZSB0aGF0IHN1YnZpZXcgd2FzIG5vdCBsb2FkZWQgd2l0aCBhbnkgY29udGVudCB5ZXRcclxuICAgICAgICAgICAgLy8gc28gY2hlY2sgb24gbnVsbFxyXG4gICAgICAgICAgICBpZiAoc3ViVmlldykge1xyXG4gICAgICAgICAgICAgICAgc3ViVmlldy5kZXN0cnVjdG9yKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gcmVzZXQgdG8gcHJldmVudCBtZW1vcnkgbGVha3NcclxuICAgICAgICB0aGlzLl9zdWJzID0ge307XHJcbiAgICB9XHJcbiAgICBfaW5pdF91cmxfZGF0YSgpIHtcclxuICAgICAgICBjb25zdCB1cmwgPSB0aGlzLl9zZWdtZW50LmN1cnJlbnQoKTtcclxuICAgICAgICB0aGlzLl9kYXRhID0ge307XHJcbiAgICAgICAgdGhpcy53ZWJpeC5leHRlbmQodGhpcy5fZGF0YSwgdXJsLnBhcmFtcywgdHJ1ZSk7XHJcbiAgICB9XHJcbiAgICBfZ2V0RGVmYXVsdFN1YigpIHtcclxuICAgICAgICBpZiAodGhpcy5fc3Vicy5kZWZhdWx0KSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9zdWJzLmRlZmF1bHQ7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGZvciAoY29uc3Qga2V5IGluIHRoaXMuX3N1YnMpIHtcclxuICAgICAgICAgICAgY29uc3Qgc3ViID0gdGhpcy5fc3Vic1trZXldO1xyXG4gICAgICAgICAgICBpZiAoIXN1Yi5icmFuY2ggJiYgc3ViLnZpZXcgJiYga2V5ICE9PSBcIl90b3BcIikge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgY2hpbGQgPSBzdWIudmlldy5fZ2V0RGVmYXVsdFN1YigpO1xyXG4gICAgICAgICAgICAgICAgaWYgKGNoaWxkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGNoaWxkO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgX3JvdXRlZF92aWV3KCkge1xyXG4gICAgICAgIGNvbnN0IHBhcmVudCA9IHRoaXMuZ2V0UGFyZW50VmlldygpO1xyXG4gICAgICAgIGlmICghcGFyZW50KSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjb25zdCBzdWIgPSBwYXJlbnQuX2dldERlZmF1bHRTdWIoKTtcclxuICAgICAgICBpZiAoIXN1YiAmJiBzdWIgIT09IHRoaXMpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gcGFyZW50Ll9yb3V0ZWRfdmlldygpO1xyXG4gICAgfVxyXG59XG5cbmZ1bmN0aW9uIHBhcnNlKHVybCkge1xyXG4gICAgLy8gcmVtb3ZlIHN0YXJ0aW5nIC9cclxuICAgIGlmICh1cmxbMF0gPT09IFwiL1wiKSB7XHJcbiAgICAgICAgdXJsID0gdXJsLnN1YnN0cigxKTtcclxuICAgIH1cclxuICAgIC8vIHNwbGl0IHVybCBieSBcIi9cIlxyXG4gICAgY29uc3QgcGFydHMgPSB1cmwuc3BsaXQoXCIvXCIpO1xyXG4gICAgY29uc3QgY2h1bmtzID0gW107XHJcbiAgICAvLyBmb3IgZWFjaCBwYWdlIGluIHVybFxyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBwYXJ0cy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgIGNvbnN0IHRlc3QgPSBwYXJ0c1tpXTtcclxuICAgICAgICBjb25zdCByZXN1bHQgPSB7fTtcclxuICAgICAgICAvLyBkZXRlY3QgcGFyYW1zXHJcbiAgICAgICAgLy8gc3VwcG9ydCBvbGQgXHRcdFx0c29tZTphPWI6Yz1kXHJcbiAgICAgICAgLy8gYW5kIG5ldyBub3RhdGlvblx0XHRzb21lP2E9YiZjPWRcclxuICAgICAgICBsZXQgcG9zID0gdGVzdC5pbmRleE9mKFwiOlwiKTtcclxuICAgICAgICBpZiAocG9zID09PSAtMSkge1xyXG4gICAgICAgICAgICBwb3MgPSB0ZXN0LmluZGV4T2YoXCI/XCIpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAocG9zICE9PSAtMSkge1xyXG4gICAgICAgICAgICBjb25zdCBwYXJhbXMgPSB0ZXN0LnN1YnN0cihwb3MgKyAxKS5zcGxpdCgvW1xcOlxcP1xcJl0vZyk7XHJcbiAgICAgICAgICAgIC8vIGNyZWF0ZSBoYXNoIG9mIG5hbWVkIHBhcmFtc1xyXG4gICAgICAgICAgICBmb3IgKGNvbnN0IHBhcmFtIG9mIHBhcmFtcykge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgZGNodW5rID0gcGFyYW0uc3BsaXQoXCI9XCIpO1xyXG4gICAgICAgICAgICAgICAgcmVzdWx0W2RjaHVua1swXV0gPSBkZWNvZGVVUklDb21wb25lbnQoZGNodW5rWzFdKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICAvLyBzdG9yZSBwYXJzZWQgdmFsdWVzXHJcbiAgICAgICAgY2h1bmtzW2ldID0ge1xyXG4gICAgICAgICAgICBwYWdlOiAocG9zID4gLTEgPyB0ZXN0LnN1YnN0cigwLCBwb3MpIDogdGVzdCksXHJcbiAgICAgICAgICAgIHBhcmFtczogcmVzdWx0LFxyXG4gICAgICAgICAgICBpc05ldzogdHJ1ZVxyXG4gICAgICAgIH07XHJcbiAgICB9XHJcbiAgICAvLyByZXR1cm4gYXJyYXkgb2YgcGFnZSBvYmplY3RzXHJcbiAgICByZXR1cm4gY2h1bmtzO1xyXG59XHJcbmZ1bmN0aW9uIHVybDJzdHIoc3RhY2spIHtcclxuICAgIGNvbnN0IHVybCA9IFtdO1xyXG4gICAgZm9yIChjb25zdCBjaHVuayBvZiBzdGFjaykge1xyXG4gICAgICAgIHVybC5wdXNoKFwiL1wiICsgY2h1bmsucGFnZSk7XHJcbiAgICAgICAgY29uc3QgcGFyYW1zID0gb2JqMnN0cihjaHVuay5wYXJhbXMpO1xyXG4gICAgICAgIGlmIChwYXJhbXMpIHtcclxuICAgICAgICAgICAgdXJsLnB1c2goXCI/XCIgKyBwYXJhbXMpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiB1cmwuam9pbihcIlwiKTtcclxufVxyXG5mdW5jdGlvbiBvYmoyc3RyKG9iaikge1xyXG4gICAgY29uc3Qgc3RyID0gW107XHJcbiAgICBmb3IgKGNvbnN0IGtleSBpbiBvYmopIHtcclxuICAgICAgICBpZiAoc3RyLmxlbmd0aCkge1xyXG4gICAgICAgICAgICBzdHIucHVzaChcIiZcIik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHN0ci5wdXNoKGtleSArIFwiPVwiICsgZW5jb2RlVVJJQ29tcG9uZW50KG9ialtrZXldKSk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gc3RyLmpvaW4oXCJcIik7XHJcbn1cblxuY2xhc3MgUm91dGUge1xyXG4gICAgY29uc3RydWN0b3Iocm91dGUsIGluZGV4KSB7XHJcbiAgICAgICAgdGhpcy5fbmV4dCA9IDE7XHJcbiAgICAgICAgaWYgKHR5cGVvZiByb3V0ZSA9PT0gXCJzdHJpbmdcIikge1xyXG4gICAgICAgICAgICB0aGlzLnJvdXRlID0ge1xyXG4gICAgICAgICAgICAgICAgdXJsOiBwYXJzZShyb3V0ZSksXHJcbiAgICAgICAgICAgICAgICBwYXRoOiByb3V0ZVxyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5yb3V0ZSA9IHJvdXRlO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmluZGV4ID0gaW5kZXg7XHJcbiAgICB9XHJcbiAgICBjdXJyZW50KCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnJvdXRlLnVybFt0aGlzLmluZGV4XTtcclxuICAgIH1cclxuICAgIG5leHQoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMucm91dGUudXJsW3RoaXMuaW5kZXggKyB0aGlzLl9uZXh0XTtcclxuICAgIH1cclxuICAgIHN1YnVybCgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5yb3V0ZS51cmwuc2xpY2UodGhpcy5pbmRleCk7XHJcbiAgICB9XHJcbiAgICBzaGlmdCgpIHtcclxuICAgICAgICByZXR1cm4gbmV3IFJvdXRlKHRoaXMucm91dGUsIHRoaXMuaW5kZXggKyB0aGlzLl9uZXh0KTtcclxuICAgIH1cclxuICAgIHJlZnJlc2goKSB7XHJcbiAgICAgICAgY29uc3QgdXJsID0gdGhpcy5yb3V0ZS51cmw7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IHRoaXMuaW5kZXggKyAxOyBpIDwgdXJsLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIHVybFtpXS5pc05ldyA9IHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgdG9TdHJpbmcoKSB7XHJcbiAgICAgICAgY29uc3Qgc3RyID0gdXJsMnN0cih0aGlzLnN1YnVybCgpKTtcclxuICAgICAgICByZXR1cm4gc3RyID8gc3RyLnN1YnN0cigxKSA6IFwiXCI7XHJcbiAgICB9XHJcbiAgICBfam9pbihwYXRoLCBraWRzKSB7XHJcbiAgICAgICAgbGV0IHVybCA9IHRoaXMucm91dGUudXJsO1xyXG4gICAgICAgIGlmIChwYXRoID09PSBudWxsKSB7IC8vIGNoYW5nZSBvZiBwYXJhbWV0ZXJzLCByb3V0ZSBlbGVtZW50cyBhcmUgbm90IGFmZmVjdGVkXHJcbiAgICAgICAgICAgIHJldHVybiB1cmw7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNvbnN0IG9sZCA9IHRoaXMucm91dGUudXJsO1xyXG4gICAgICAgIHVybCA9IG9sZC5zbGljZSgwLCB0aGlzLmluZGV4ICsgKGtpZHMgPyB0aGlzLl9uZXh0IDogMCkpO1xyXG4gICAgICAgIGlmIChwYXRoKSB7XHJcbiAgICAgICAgICAgIHVybCA9IHVybC5jb25jYXQocGFyc2UocGF0aCkpO1xyXG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHVybC5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgaWYgKG9sZFtpXSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHVybFtpXS52aWV3ID0gb2xkW2ldLnZpZXc7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZiAob2xkW2ldICYmIHVybFtpXS5wYWdlID09PSBvbGRbaV0ucGFnZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHVybFtpXS5pc05ldyA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB1cmw7XHJcbiAgICB9XHJcbiAgICBhcHBlbmQocGF0aCkge1xyXG4gICAgICAgIGNvbnN0IHVybCA9IHRoaXMuX2pvaW4ocGF0aCwgdHJ1ZSk7XHJcbiAgICAgICAgdGhpcy5yb3V0ZS5wYXRoID0gdXJsMnN0cih1cmwpO1xyXG4gICAgICAgIHRoaXMucm91dGUudXJsID0gdXJsO1xyXG4gICAgICAgIHJldHVybiB0aGlzLnJvdXRlLnBhdGg7XHJcbiAgICB9XHJcbiAgICBzaG93KHBhdGgsIHZpZXcsIGtpZHMpIHtcclxuICAgICAgICBjb25zdCB1cmwgPSB0aGlzLl9qb2luKHBhdGgsIGtpZHMpO1xyXG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzLCByZWopID0+IHtcclxuICAgICAgICAgICAgY29uc3QgcmVkaXJlY3QgPSB1cmwyc3RyKHVybCk7XHJcbiAgICAgICAgICAgIGNvbnN0IG9iaiA9IHtcclxuICAgICAgICAgICAgICAgIHVybCxcclxuICAgICAgICAgICAgICAgIHJlZGlyZWN0LFxyXG4gICAgICAgICAgICAgICAgY29uZmlybTogUHJvbWlzZS5yZXNvbHZlKClcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgY29uc3QgYXBwID0gdmlldyA/IHZpZXcuYXBwIDogbnVsbDtcclxuICAgICAgICAgICAgLy8gd2hlbiBjcmVhdGluZyBhIG5ldyByb3V0ZSwgaXQgcG9zc2libGUgdGhhdCBpdCB3aWxsIG5vdCBoYXZlIGFueSBjb250ZW50XHJcbiAgICAgICAgICAgIC8vIGd1YXJkIGlzIG5vdCBuZWNlc3NhcnkgaW4gc3VjaCBjYXNlXHJcbiAgICAgICAgICAgIGlmIChhcHApIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHJlc3VsdCA9IGFwcC5jYWxsRXZlbnQoXCJhcHA6Z3VhcmRcIiwgW29iai5yZWRpcmVjdCwgdmlldywgb2JqXSk7XHJcbiAgICAgICAgICAgICAgICBpZiAoIXJlc3VsdCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJlaihuZXcgTmF2aWdhdGlvbkJsb2NrZWQoKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIG9iai5jb25maXJtLmNhdGNoKGVyciA9PiByZWooZXJyKSkudGhlbigoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAob2JqLnJlZGlyZWN0ID09PSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVqKG5ldyBOYXZpZ2F0aW9uQmxvY2tlZCgpKTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZiAob2JqLnJlZGlyZWN0ICE9PSByZWRpcmVjdCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGFwcC5zaG93KG9iai5yZWRpcmVjdCk7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVqKG5ldyBOYXZpZ2F0aW9uQmxvY2tlZCgpKTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB0aGlzLnJvdXRlLnBhdGggPSByZWRpcmVjdDtcclxuICAgICAgICAgICAgICAgIHRoaXMucm91dGUudXJsID0gdXJsO1xyXG4gICAgICAgICAgICAgICAgcmVzKCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgc2l6ZShuKSB7XHJcbiAgICAgICAgdGhpcy5fbmV4dCA9IG47XHJcbiAgICB9XHJcbiAgICBzcGxpdCgpIHtcclxuICAgICAgICBjb25zdCByb3V0ZSA9IHtcclxuICAgICAgICAgICAgdXJsOiB0aGlzLnJvdXRlLnVybC5zbGljZSh0aGlzLmluZGV4ICsgMSksXHJcbiAgICAgICAgICAgIHBhdGg6IFwiXCJcclxuICAgICAgICB9O1xyXG4gICAgICAgIGlmIChyb3V0ZS51cmwubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgIHJvdXRlLnBhdGggPSB1cmwyc3RyKHJvdXRlLnVybCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBuZXcgUm91dGUocm91dGUsIDApO1xyXG4gICAgfVxyXG4gICAgdXBkYXRlKG5hbWUsIHZhbHVlLCBpbmRleCkge1xyXG4gICAgICAgIGNvbnN0IGNodW5rID0gdGhpcy5yb3V0ZS51cmxbdGhpcy5pbmRleCArIChpbmRleCB8fCAwKV07XHJcbiAgICAgICAgaWYgKCFjaHVuaykge1xyXG4gICAgICAgICAgICB0aGlzLnJvdXRlLnVybC5wdXNoKHsgcGFnZTogXCJcIiwgcGFyYW1zOiB7fSB9KTtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMudXBkYXRlKG5hbWUsIHZhbHVlLCBpbmRleCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChuYW1lID09PSBcIlwiKSB7XHJcbiAgICAgICAgICAgIGNodW5rLnBhZ2UgPSB2YWx1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIGNodW5rLnBhcmFtc1tuYW1lXSA9IHZhbHVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLnJvdXRlLnBhdGggPSB1cmwyc3RyKHRoaXMucm91dGUudXJsKTtcclxuICAgIH1cclxufVxuXG5jbGFzcyBKZXRWaWV3IGV4dGVuZHMgSmV0QmFzZSB7XHJcbiAgICBjb25zdHJ1Y3RvcihhcHAsIGNvbmZpZykge1xyXG4gICAgICAgIHN1cGVyKGFwcC53ZWJpeCk7XHJcbiAgICAgICAgdGhpcy5hcHAgPSBhcHA7XHJcbiAgICAgICAgLy90aGlzLiRjb25maWcgPSBjb25maWc7XHJcbiAgICAgICAgdGhpcy5fY2hpbGRyZW4gPSBbXTtcclxuICAgIH1cclxuICAgIHVpKHVpLCBjb25maWcpIHtcclxuICAgICAgICBjb25maWcgPSBjb25maWcgfHwge307XHJcbiAgICAgICAgY29uc3QgY29udGFpbmVyID0gY29uZmlnLmNvbnRhaW5lciB8fCB1aS5jb250YWluZXI7XHJcbiAgICAgICAgY29uc3QgamV0dmlldyA9IHRoaXMuYXBwLmNyZWF0ZVZpZXcodWkpO1xyXG4gICAgICAgIHRoaXMuX2NoaWxkcmVuLnB1c2goamV0dmlldyk7XHJcbiAgICAgICAgamV0dmlldy5yZW5kZXIoY29udGFpbmVyLCB0aGlzLl9zZWdtZW50LCB0aGlzKTtcclxuICAgICAgICBpZiAodHlwZW9mIHVpICE9PSBcIm9iamVjdFwiIHx8ICh1aSBpbnN0YW5jZW9mIEpldEJhc2UpKSB7XHJcbiAgICAgICAgICAgIC8vIHJhdyB3ZWJpeCBVSVxyXG4gICAgICAgICAgICByZXR1cm4gamV0dmlldztcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIHJldHVybiBqZXR2aWV3LmdldFJvb3QoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBzaG93KHBhdGgsIGNvbmZpZykge1xyXG4gICAgICAgIGNvbmZpZyA9IGNvbmZpZyB8fCB7fTtcclxuICAgICAgICAvLyBjb252ZXJ0IHBhcmFtZXRlcnMgb2JqZWN0IHRvIHVybFxyXG4gICAgICAgIGlmICh0eXBlb2YgcGF0aCA9PT0gXCJvYmplY3RcIikge1xyXG4gICAgICAgICAgICBmb3IgKGNvbnN0IGtleSBpbiBwYXRoKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNldFBhcmFtKGtleSwgcGF0aFtrZXldKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBwYXRoID0gbnVsbDtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIC8vIGRlbGlnYXRlIHRvIGFwcCBpbiBjYXNlIG9mIHJvb3QgcHJlZml4XHJcbiAgICAgICAgICAgIGlmIChwYXRoLnN1YnN0cigwLCAxKSA9PT0gXCIvXCIpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmFwcC5zaG93KHBhdGgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIC8vIGxvY2FsIHBhdGgsIGRvIG5vdGhpbmdcclxuICAgICAgICAgICAgaWYgKHBhdGguaW5kZXhPZihcIi4vXCIpID09PSAwKSB7XHJcbiAgICAgICAgICAgICAgICBwYXRoID0gcGF0aC5zdWJzdHIoMik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgLy8gcGFyZW50IHBhdGgsIGNhbGwgcGFyZW50IHZpZXdcclxuICAgICAgICAgICAgaWYgKHBhdGguaW5kZXhPZihcIi4uL1wiKSA9PT0gMCkge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgcGFyZW50ID0gdGhpcy5nZXRQYXJlbnRWaWV3KCk7XHJcbiAgICAgICAgICAgICAgICBpZiAocGFyZW50KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHBhcmVudC5zaG93KHBhdGguc3Vic3RyKDMpLCBjb25maWcpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuYXBwLnNob3coXCIvXCIgKyBwYXRoLnN1YnN0cigzKSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY29uc3Qgc3ViID0gdGhpcy5nZXRTdWJWaWV3SW5mbyhjb25maWcudGFyZ2V0KTtcclxuICAgICAgICAgICAgaWYgKHN1Yikge1xyXG4gICAgICAgICAgICAgICAgaWYgKHN1Yi5wYXJlbnQgIT09IHRoaXMpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gc3ViLnBhcmVudC5zaG93KHBhdGgsIGNvbmZpZyk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlIGlmIChjb25maWcudGFyZ2V0ICYmIGNvbmZpZy50YXJnZXQgIT09IFwiZGVmYXVsdFwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3JlbmRlckZyYW1lTG9jayhjb25maWcudGFyZ2V0LCBzdWIuc3VidmlldywgcGF0aCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBpZiAocGF0aCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmFwcC5zaG93KFwiL1wiICsgcGF0aCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX3Nob3codGhpcy5fc2VnbWVudCwgcGF0aCwgdGhpcyk7XHJcbiAgICB9XHJcbiAgICBfc2hvdyhzZWdtZW50LCBwYXRoLCB2aWV3KSB7XHJcbiAgICAgICAgcmV0dXJuIHNlZ21lbnQuc2hvdyhwYXRoLCB2aWV3LCB0cnVlKS50aGVuKCgpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5faW5pdF91cmxfZGF0YSgpO1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fdXJsQ2hhbmdlKCk7XHJcbiAgICAgICAgfSkudGhlbigoKSA9PiB7XHJcbiAgICAgICAgICAgIGlmIChzZWdtZW50LnJvdXRlLmxpbmtSb3V0ZXIpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuYXBwLmdldFJvdXRlcigpLnNldChzZWdtZW50LnJvdXRlLnBhdGgsIHsgc2lsZW50OiB0cnVlIH0pO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5hcHAuY2FsbEV2ZW50KFwiYXBwOnJvdXRlXCIsIFtzZWdtZW50LnJvdXRlLnBhdGhdKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgaW5pdChfJHZpZXcsIF8kKSB7XHJcbiAgICAgICAgLy8gc3R1YlxyXG4gICAgfVxyXG4gICAgcmVhZHkoXyR2aWV3LCBfJHVybCkge1xyXG4gICAgICAgIC8vIHN0dWJcclxuICAgIH1cclxuICAgIGNvbmZpZygpIHtcclxuICAgICAgICB0aGlzLmFwcC53ZWJpeC5tZXNzYWdlKFwiVmlldzpDb25maWcgaXMgbm90IGltcGxlbWVudGVkXCIpO1xyXG4gICAgfVxyXG4gICAgdXJsQ2hhbmdlKF8kdmlldywgXyR1cmwpIHtcclxuICAgICAgICAvLyBzdHViXHJcbiAgICB9XHJcbiAgICBkZXN0cm95KCkge1xyXG4gICAgICAgIC8vIHN0dWJcclxuICAgIH1cclxuICAgIGRlc3RydWN0b3IoKSB7XHJcbiAgICAgICAgdGhpcy5kZXN0cm95KCk7XHJcbiAgICAgICAgdGhpcy5fZGVzdHJveUtpZHMoKTtcclxuICAgICAgICAvLyBkZXN0cm95IGFjdHVhbCBVSVxyXG4gICAgICAgIHRoaXMuX3Jvb3QuZGVzdHJ1Y3RvcigpO1xyXG4gICAgICAgIHN1cGVyLmRlc3RydWN0b3IoKTtcclxuICAgIH1cclxuICAgIHVzZShwbHVnaW4sIGNvbmZpZykge1xyXG4gICAgICAgIHBsdWdpbih0aGlzLmFwcCwgdGhpcywgY29uZmlnKTtcclxuICAgIH1cclxuICAgIHJlZnJlc2goKSB7XHJcbiAgICAgICAgY29uc3QgdXJsID0gdGhpcy5nZXRVcmwoKTtcclxuICAgICAgICB0aGlzLmRlc3Ryb3koKTtcclxuICAgICAgICB0aGlzLl9kZXN0cm95S2lkcygpO1xyXG4gICAgICAgIHRoaXMuX2Rlc3Ryb3lTdWJzKCk7XHJcbiAgICAgICAgdGhpcy5fZGV0YWNoRXZlbnRzKCk7XHJcbiAgICAgICAgaWYgKHRoaXMuX2NvbnRhaW5lci50YWdOYW1lKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX3Jvb3QuZGVzdHJ1Y3RvcigpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLl9zZWdtZW50LnJlZnJlc2goKTtcclxuICAgICAgICByZXR1cm4gdGhpcy5fcmVuZGVyKHRoaXMuX3NlZ21lbnQpO1xyXG4gICAgfVxyXG4gICAgcmVuZGVyKHJvb3QsIHVybCwgcGFyZW50KSB7XHJcbiAgICAgICAgaWYgKHR5cGVvZiB1cmwgPT09IFwic3RyaW5nXCIpIHtcclxuICAgICAgICAgICAgdXJsID0gbmV3IFJvdXRlKHVybCwgMCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuX3NlZ21lbnQgPSB1cmw7XHJcbiAgICAgICAgdGhpcy5fcGFyZW50ID0gcGFyZW50O1xyXG4gICAgICAgIHRoaXMuX2luaXRfdXJsX2RhdGEoKTtcclxuICAgICAgICByb290ID0gcm9vdCB8fCBkb2N1bWVudC5ib2R5O1xyXG4gICAgICAgIGNvbnN0IF9jb250YWluZXIgPSAodHlwZW9mIHJvb3QgPT09IFwic3RyaW5nXCIpID8gdGhpcy53ZWJpeC50b05vZGUocm9vdCkgOiByb290O1xyXG4gICAgICAgIGlmICh0aGlzLl9jb250YWluZXIgIT09IF9jb250YWluZXIpIHtcclxuICAgICAgICAgICAgdGhpcy5fY29udGFpbmVyID0gX2NvbnRhaW5lcjtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3JlbmRlcih1cmwpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3VybENoYW5nZSgpLnRoZW4oKCkgPT4gdGhpcy5nZXRSb290KCkpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIF9yZW5kZXIodXJsKSB7XHJcbiAgICAgICAgY29uc3QgY29uZmlnID0gdGhpcy5jb25maWcoKTtcclxuICAgICAgICBpZiAoY29uZmlnLnRoZW4pIHtcclxuICAgICAgICAgICAgcmV0dXJuIGNvbmZpZy50aGVuKGNmZyA9PiB0aGlzLl9yZW5kZXJfZmluYWwoY2ZnLCB1cmwpKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9yZW5kZXJfZmluYWwoY29uZmlnLCB1cmwpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIF9yZW5kZXJfZmluYWwoY29uZmlnLCB1cmwpIHtcclxuICAgICAgICAvLyBnZXQgcHJldmlvdXMgdmlldyBpbiB0aGUgc2FtZSBzbG90XHJcbiAgICAgICAgbGV0IHNsb3QgPSBudWxsO1xyXG4gICAgICAgIGxldCBjb250YWluZXIgPSBudWxsO1xyXG4gICAgICAgIGxldCBzaG93ID0gZmFsc2U7XHJcbiAgICAgICAgaWYgKCF0aGlzLl9jb250YWluZXIudGFnTmFtZSkge1xyXG4gICAgICAgICAgICBzbG90ID0gdGhpcy5fY29udGFpbmVyO1xyXG4gICAgICAgICAgICBpZiAoc2xvdC5wb3B1cCkge1xyXG4gICAgICAgICAgICAgICAgY29udGFpbmVyID0gZG9jdW1lbnQuYm9keTtcclxuICAgICAgICAgICAgICAgIHNob3cgPSB0cnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgY29udGFpbmVyID0gdGhpcy53ZWJpeC4kJChzbG90LmlkKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgY29udGFpbmVyID0gdGhpcy5fY29udGFpbmVyO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvLyB2aWV3IGFscmVhZHkgZGVzdHJveWVkXHJcbiAgICAgICAgaWYgKCF0aGlzLmFwcCB8fCAhY29udGFpbmVyKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdChudWxsKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IHJlc3BvbnNlO1xyXG4gICAgICAgIGNvbnN0IGN1cnJlbnQgPSB0aGlzLl9zZWdtZW50LmN1cnJlbnQoKTtcclxuICAgICAgICAvLyB1c2luZyB3cmFwcGVyIG9iamVjdCwgc28gdWkgY2FuIGJlIGNoYW5nZWQgZnJvbSBhcHA6cmVuZGVyIGV2ZW50XHJcbiAgICAgICAgY29uc3QgcmVzdWx0ID0geyB1aToge30gfTtcclxuICAgICAgICB0aGlzLmFwcC5jb3B5Q29uZmlnKGNvbmZpZywgcmVzdWx0LnVpLCB0aGlzLl9zdWJzKTtcclxuICAgICAgICB0aGlzLmFwcC5jYWxsRXZlbnQoXCJhcHA6cmVuZGVyXCIsIFt0aGlzLCB1cmwsIHJlc3VsdF0pO1xyXG4gICAgICAgIHJlc3VsdC51aS4kc2NvcGUgPSB0aGlzO1xyXG4gICAgICAgIC8qIGRlc3Ryb3kgb2xkIEhUTUwgYXR0YWNoZWQgdmlld3MgYmVmb3JlIGNyZWF0aW5nIG5ldyBvbmUgKi9cclxuICAgICAgICBpZiAoIXNsb3QgJiYgY3VycmVudC5pc05ldyAmJiBjdXJyZW50LnZpZXcpIHtcclxuICAgICAgICAgICAgY3VycmVudC52aWV3LmRlc3RydWN0b3IoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgLy8gc3BlY2lhbCBoYW5kbGluZyBmb3IgYWRkaW5nIGluc2lkZSBvZiBtdWx0aXZpZXcgLSBwcmVzZXJ2ZSBvbGQgaWRcclxuICAgICAgICAgICAgaWYgKHNsb3QgJiYgIXNob3cpIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IG9sZHVpID0gY29udGFpbmVyO1xyXG4gICAgICAgICAgICAgICAgY29uc3QgcGFyZW50ID0gb2xkdWkuZ2V0UGFyZW50VmlldygpO1xyXG4gICAgICAgICAgICAgICAgaWYgKHBhcmVudCAmJiBwYXJlbnQubmFtZSA9PT0gXCJtdWx0aXZpZXdcIiAmJiAhcmVzdWx0LnVpLmlkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0LnVpLmlkID0gb2xkdWkuY29uZmlnLmlkO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMuX3Jvb3QgPSB0aGlzLmFwcC53ZWJpeC51aShyZXN1bHQudWksIGNvbnRhaW5lcik7XHJcbiAgICAgICAgICAgIGNvbnN0IGFzV2luID0gdGhpcy5fcm9vdDtcclxuICAgICAgICAgICAgLy8gY2hlY2sgZm9yIHVybCBhZGRlZCB0byBpZ25vcmUgdGhpcy51aSBjYWxsc1xyXG4gICAgICAgICAgICBpZiAoc2hvdyAmJiBhc1dpbi5zZXRQb3NpdGlvbiAmJiAhYXNXaW4uaXNWaXNpYmxlKCkpIHtcclxuICAgICAgICAgICAgICAgIGFzV2luLnNob3coKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAvLyBjaGVjaywgaWYgd2UgYXJlIHJlcGxhY2luZyBzb21lIG9sZGVyIHZpZXdcclxuICAgICAgICAgICAgaWYgKHNsb3QpIHtcclxuICAgICAgICAgICAgICAgIGlmIChzbG90LnZpZXcgJiYgc2xvdC52aWV3ICE9PSB0aGlzICYmIHNsb3QudmlldyAhPT0gdGhpcy5hcHApIHtcclxuICAgICAgICAgICAgICAgICAgICBzbG90LnZpZXcuZGVzdHJ1Y3RvcigpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgc2xvdC5pZCA9IHRoaXMuX3Jvb3QuY29uZmlnLmlkO1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuZ2V0UGFyZW50VmlldygpIHx8ICF0aGlzLmFwcC5hcHApXHJcbiAgICAgICAgICAgICAgICAgICAgc2xvdC52aWV3ID0gdGhpcztcclxuICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIHdoZW4gd2UgaGF2ZSBzdWJhcHAsIHNldCB3aG9sZSBhcHAgYXMgYSB2aWV3XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gc28gb24gZGVzdHJ1Y3Rpb24sIHRoZSB3aG9sZSBhcHAgd2lsbCBiZSBkZXN0cm95ZWRcclxuICAgICAgICAgICAgICAgICAgICBzbG90LnZpZXcgPSB0aGlzLmFwcDtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoY3VycmVudC5pc05ldykge1xyXG4gICAgICAgICAgICAgICAgY3VycmVudC52aWV3ID0gdGhpcztcclxuICAgICAgICAgICAgICAgIGN1cnJlbnQuaXNOZXcgPSBmYWxzZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXNwb25zZSA9IFByb21pc2UucmVzb2x2ZSh0aGlzLl9pbml0KHRoaXMuX3Jvb3QsIHVybCkpLnRoZW4oKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3VybENoYW5nZSgpLnRoZW4oKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2luaXRVcmwgPSBudWxsO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLnJlYWR5KHRoaXMuX3Jvb3QsIHVybC5zdWJ1cmwoKSk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNhdGNoIChlKSB7XHJcbiAgICAgICAgICAgIHJlc3BvbnNlID0gUHJvbWlzZS5yZWplY3QoZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiByZXNwb25zZS5jYXRjaChlcnIgPT4gdGhpcy5faW5pdEVycm9yKHRoaXMsIGVycikpO1xyXG4gICAgfVxyXG4gICAgX2luaXQodmlldywgdXJsKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuaW5pdCh2aWV3LCB1cmwuc3VidXJsKCkpO1xyXG4gICAgfVxyXG4gICAgX3VybENoYW5nZSgpIHtcclxuICAgICAgICB0aGlzLmFwcC5jYWxsRXZlbnQoXCJhcHA6dXJsY2hhbmdlXCIsIFt0aGlzLCB0aGlzLl9zZWdtZW50XSk7XHJcbiAgICAgICAgY29uc3Qgd2FpdHMgPSBbXTtcclxuICAgICAgICBmb3IgKGNvbnN0IGtleSBpbiB0aGlzLl9zdWJzKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGZyYW1lID0gdGhpcy5fc3Vic1trZXldO1xyXG4gICAgICAgICAgICBjb25zdCB3YWl0ID0gdGhpcy5fcmVuZGVyRnJhbWVMb2NrKGtleSwgZnJhbWUsIG51bGwpO1xyXG4gICAgICAgICAgICBpZiAod2FpdCkge1xyXG4gICAgICAgICAgICAgICAgd2FpdHMucHVzaCh3YWl0KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gUHJvbWlzZS5hbGwod2FpdHMpLnRoZW4oKCkgPT4ge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy51cmxDaGFuZ2UodGhpcy5fcm9vdCwgdGhpcy5fc2VnbWVudC5zdWJ1cmwoKSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICBfcmVuZGVyRnJhbWVMb2NrKGtleSwgZnJhbWUsIHBhdGgpIHtcclxuICAgICAgICAvLyBpZiBzdWJ2aWV3IGlzIG5vdCBvY2N1cGllZCBieSBzb21lIHJlbmRlcmluZyB5ZXRcclxuICAgICAgICBpZiAoIWZyYW1lLmxvY2spIHtcclxuICAgICAgICAgICAgLy8gcmV0cmVpdmUgYW5kIHN0b3JlIHJlbmRlcmluZyBlbmQgcHJvbWlzZVxyXG4gICAgICAgICAgICBjb25zdCBsb2NrID0gdGhpcy5fcmVuZGVyRnJhbWUoa2V5LCBmcmFtZSwgcGF0aCk7XHJcbiAgICAgICAgICAgIGlmIChsb2NrKSB7XHJcbiAgICAgICAgICAgICAgICAvLyBjbGVhciBsb2NrIGFmdGVyIGZyYW1lIHJlbmRlcmluZ1xyXG4gICAgICAgICAgICAgICAgLy8gYXMgcHJvbWlzZS5maW5hbGx5IGlzIG5vdCBzdXBwb3J0ZWQgYnkgIFdlYml4IGxlc3NlciB0aGFuIDYuMlxyXG4gICAgICAgICAgICAgICAgLy8gdXNpbmcgYSBtb3JlIHZlcmJvc2Ugbm90YXRpb25cclxuICAgICAgICAgICAgICAgIGZyYW1lLmxvY2sgPSBsb2NrLnRoZW4oKCkgPT4gZnJhbWUubG9jayA9IG51bGwsICgpID0+IGZyYW1lLmxvY2sgPSBudWxsKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICAvLyByZXR1cm4gcmVuZGVyaW5nIGVuZCBwcm9taXNlXHJcbiAgICAgICAgcmV0dXJuIGZyYW1lLmxvY2s7XHJcbiAgICB9XHJcbiAgICBfcmVuZGVyRnJhbWUoa2V5LCBmcmFtZSwgcGF0aCkge1xyXG4gICAgICAgIC8vZGVmYXVsdCByb3V0ZVxyXG4gICAgICAgIGlmIChrZXkgPT09IFwiZGVmYXVsdFwiKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLl9zZWdtZW50Lm5leHQoKSkge1xyXG4gICAgICAgICAgICAgICAgLy8gd2UgaGF2ZSBhIG5leHQgc2VnbWVudCBpbiB1cmwsIHJlbmRlciBpdFxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2NyZWF0ZVN1YlZpZXcoZnJhbWUsIHRoaXMuX3NlZ21lbnQuc2hpZnQoKSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSBpZiAoZnJhbWUudmlldyAmJiBmcmFtZS5wb3B1cCkge1xyXG4gICAgICAgICAgICAgICAgLy8gdGhlcmUgaXMgbm8gbmV4dCBzZWdtZW50LCBkZWxldGUgdGhlIGV4aXN0aW5nIHN1Yi12aWV3XHJcbiAgICAgICAgICAgICAgICBmcmFtZS52aWV3LmRlc3RydWN0b3IoKTtcclxuICAgICAgICAgICAgICAgIGZyYW1lLnZpZXcgPSBudWxsO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vaWYgbmV3IHBhdGggcHJvdmlkZWQsIHNldCBpdCB0byB0aGUgZnJhbWVcclxuICAgICAgICBpZiAocGF0aCAhPT0gbnVsbCkge1xyXG4gICAgICAgICAgICBmcmFtZS51cmwgPSBwYXRoO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvLyBpbiBjYXNlIG9mIHJvdXRlZCBzdWItdmlld1xyXG4gICAgICAgIGlmIChmcmFtZS5yb3V0ZSkge1xyXG4gICAgICAgICAgICAvLyB3ZSBoYXZlIGEgbmV3IHBhdGggZm9yIHN1Yi12aWV3XHJcbiAgICAgICAgICAgIGlmIChwYXRoICE9PSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZnJhbWUucm91dGUuc2hvdyhwYXRoLCBmcmFtZS52aWV3KS50aGVuKCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fY3JlYXRlU3ViVmlldyhmcmFtZSwgZnJhbWUucm91dGUpO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgLy8gZG8gbm90IHRyaWdnZXIgb25DaGFuZ2UgZm9yIGlzb2xhdGVkIHN1Yi12aWV3c1xyXG4gICAgICAgICAgICBpZiAoZnJhbWUuYnJhbmNoKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IHZpZXcgPSBmcmFtZS52aWV3O1xyXG4gICAgICAgIC8vIGlmIHZpZXcgZG9lc24ndCBleGlzdHMgeWV0LCBpbml0IGl0XHJcbiAgICAgICAgaWYgKCF2aWV3ICYmIGZyYW1lLnVybCkge1xyXG4gICAgICAgICAgICBpZiAodHlwZW9mIGZyYW1lLnVybCA9PT0gXCJzdHJpbmdcIikge1xyXG4gICAgICAgICAgICAgICAgLy8gc3RyaW5nLCBzbyB3ZSBoYXZlIGlzb2xhdGVkIHN1YnZpZXcgdXJsXHJcbiAgICAgICAgICAgICAgICBmcmFtZS5yb3V0ZSA9IG5ldyBSb3V0ZShmcmFtZS51cmwsIDApO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2NyZWF0ZVN1YlZpZXcoZnJhbWUsIGZyYW1lLnJvdXRlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIC8vIG9iamVjdCwgc28gd2UgaGF2ZSBhbiBlbWJlZGVkIHN1YnZpZXdcclxuICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgZnJhbWUudXJsID09PSBcImZ1bmN0aW9uXCIgJiYgISh2aWV3IGluc3RhbmNlb2YgZnJhbWUudXJsKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHZpZXcgPSBuZXcgZnJhbWUudXJsKHRoaXMuYXBwLCBcIlwiKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmICghdmlldykge1xyXG4gICAgICAgICAgICAgICAgICAgIHZpZXcgPSBmcmFtZS51cmw7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gdHJpZ2dlciBvbkNoYW5nZSBmb3IgYWxyZWFkeSBleGlzdGVkIHZpZXdcclxuICAgICAgICBpZiAodmlldykge1xyXG4gICAgICAgICAgICByZXR1cm4gdmlldy5yZW5kZXIoZnJhbWUsIChmcmFtZS5yb3V0ZSB8fCB0aGlzLl9zZWdtZW50KSwgdGhpcyk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgX2luaXRFcnJvcih2aWV3LCBlcnIpIHtcclxuICAgICAgICAvKlxyXG4gICAgICAgICAgICBpZiB2aWV3IGlzIGRlc3Ryb3llZCwgaWdub3JlIGFueSB2aWV3IHJlbGF0ZWQgZXJyb3JzXHJcbiAgICAgICAgKi9cclxuICAgICAgICBpZiAodGhpcy5hcHApIHtcclxuICAgICAgICAgICAgdGhpcy5hcHAuZXJyb3IoXCJhcHA6ZXJyb3I6aW5pdHZpZXdcIiwgW2Vyciwgdmlld10pO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH1cclxuICAgIF9jcmVhdGVTdWJWaWV3KHN1Yiwgc3VidXJsKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuYXBwLmNyZWF0ZUZyb21VUkwoc3VidXJsLmN1cnJlbnQoKSkudGhlbih2aWV3ID0+IHtcclxuICAgICAgICAgICAgcmV0dXJuIHZpZXcucmVuZGVyKHN1Yiwgc3VidXJsLCB0aGlzKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuICAgIF9kZXN0cm95S2lkcygpIHtcclxuICAgICAgICAvLyBkZXN0cm95IGNoaWxkIHZpZXdzXHJcbiAgICAgICAgY29uc3QgdWlzID0gdGhpcy5fY2hpbGRyZW47XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IHVpcy5sZW5ndGggLSAxOyBpID49IDA7IGktLSkge1xyXG4gICAgICAgICAgICBpZiAodWlzW2ldICYmIHVpc1tpXS5kZXN0cnVjdG9yKSB7XHJcbiAgICAgICAgICAgICAgICB1aXNbaV0uZGVzdHJ1Y3RvcigpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIHJlc2V0IHZhcnMgZm9yIGJldHRlciBHQyBwcm9jZXNzaW5nXHJcbiAgICAgICAgdGhpcy5fY2hpbGRyZW4gPSBbXTtcclxuICAgIH1cclxufVxuXG4vLyB3cmFwcGVyIGZvciByYXcgb2JqZWN0cyBhbmQgSmV0IDEueCBzdHJ1Y3RzXHJcbmNsYXNzIEpldFZpZXdSYXcgZXh0ZW5kcyBKZXRWaWV3IHtcclxuICAgIGNvbnN0cnVjdG9yKGFwcCwgY29uZmlnKSB7XHJcbiAgICAgICAgc3VwZXIoYXBwLCBjb25maWcpO1xyXG4gICAgICAgIHRoaXMuX3VpID0gY29uZmlnLnVpO1xyXG4gICAgfVxyXG4gICAgY29uZmlnKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl91aTtcclxuICAgIH1cclxufVxuXG5jbGFzcyBTdWJSb3V0ZXIge1xyXG4gICAgY29uc3RydWN0b3IoY2IsIGNvbmZpZywgYXBwKSB7XHJcbiAgICAgICAgdGhpcy5wYXRoID0gXCJcIjtcclxuICAgICAgICB0aGlzLmFwcCA9IGFwcDtcclxuICAgIH1cclxuICAgIHNldChwYXRoLCBjb25maWcpIHtcclxuICAgICAgICB0aGlzLnBhdGggPSBwYXRoO1xyXG4gICAgICAgIGNvbnN0IGEgPSB0aGlzLmFwcDtcclxuICAgICAgICBhLmFwcC5nZXRSb3V0ZXIoKS5zZXQoYS5fc2VnbWVudC5hcHBlbmQodGhpcy5wYXRoKSwgeyBzaWxlbnQ6IHRydWUgfSk7XHJcbiAgICB9XHJcbiAgICBnZXQoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMucGF0aDtcclxuICAgIH1cclxufVxuXG5sZXQgX29uY2UgPSB0cnVlO1xyXG5jbGFzcyBKZXRBcHBCYXNlIGV4dGVuZHMgSmV0QmFzZSB7XHJcbiAgICBjb25zdHJ1Y3Rvcihjb25maWcpIHtcclxuICAgICAgICBjb25zdCB3ZWJpeCA9IChjb25maWcgfHwge30pLndlYml4IHx8IHdpbmRvdy53ZWJpeDtcclxuICAgICAgICBzdXBlcih3ZWJpeCk7XHJcbiAgICAgICAgLy8gaW5pdCBjb25maWdcclxuICAgICAgICB0aGlzLmNvbmZpZyA9IHRoaXMud2ViaXguZXh0ZW5kKHtcclxuICAgICAgICAgICAgbmFtZTogXCJBcHBcIixcclxuICAgICAgICAgICAgdmVyc2lvbjogXCIxLjBcIixcclxuICAgICAgICAgICAgc3RhcnQ6IFwiL2hvbWVcIlxyXG4gICAgICAgIH0sIGNvbmZpZywgdHJ1ZSk7XHJcbiAgICAgICAgdGhpcy5hcHAgPSB0aGlzLmNvbmZpZy5hcHA7XHJcbiAgICAgICAgdGhpcy5yZWFkeSA9IFByb21pc2UucmVzb2x2ZSgpO1xyXG4gICAgICAgIHRoaXMuX3NlcnZpY2VzID0ge307XHJcbiAgICAgICAgdGhpcy53ZWJpeC5leHRlbmQodGhpcywgdGhpcy53ZWJpeC5FdmVudFN5c3RlbSk7XHJcbiAgICB9XHJcbiAgICBnZXRVcmwoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX3N1YlNlZ21lbnQuc3VidXJsKCk7XHJcbiAgICB9XHJcbiAgICBnZXRVcmxTdHJpbmcoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX3N1YlNlZ21lbnQudG9TdHJpbmcoKTtcclxuICAgIH1cclxuICAgIGdldFNlcnZpY2UobmFtZSkge1xyXG4gICAgICAgIGxldCBvYmogPSB0aGlzLl9zZXJ2aWNlc1tuYW1lXTtcclxuICAgICAgICBpZiAodHlwZW9mIG9iaiA9PT0gXCJmdW5jdGlvblwiKSB7XHJcbiAgICAgICAgICAgIG9iaiA9IHRoaXMuX3NlcnZpY2VzW25hbWVdID0gb2JqKHRoaXMpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gb2JqO1xyXG4gICAgfVxyXG4gICAgc2V0U2VydmljZShuYW1lLCBoYW5kbGVyKSB7XHJcbiAgICAgICAgdGhpcy5fc2VydmljZXNbbmFtZV0gPSBoYW5kbGVyO1xyXG4gICAgfVxyXG4gICAgZGVzdHJ1Y3RvcigpIHtcclxuICAgICAgICB0aGlzLmdldFN1YlZpZXcoKS5kZXN0cnVjdG9yKCk7XHJcbiAgICAgICAgc3VwZXIuZGVzdHJ1Y3RvcigpO1xyXG4gICAgfVxyXG4gICAgLy8gY29weSBvYmplY3QgYW5kIGNvbGxlY3QgZXh0cmEgaGFuZGxlcnNcclxuICAgIGNvcHlDb25maWcob2JqLCB0YXJnZXQsIGNvbmZpZykge1xyXG4gICAgICAgIC8vIHJhdyB1aSBjb25maWdcclxuICAgICAgICBpZiAob2JqIGluc3RhbmNlb2YgSmV0QmFzZSB8fFxyXG4gICAgICAgICAgICAodHlwZW9mIG9iaiA9PT0gXCJmdW5jdGlvblwiICYmIG9iai5wcm90b3R5cGUgaW5zdGFuY2VvZiBKZXRCYXNlKSkge1xyXG4gICAgICAgICAgICBvYmogPSB7ICRzdWJ2aWV3OiBvYmogfTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gc3VidmlldyBwbGFjZWhvbGRlclxyXG4gICAgICAgIGlmICh0eXBlb2Ygb2JqLiRzdWJ2aWV3ICE9IFwidW5kZWZpbmVkXCIpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuYWRkU3ViVmlldyhvYmosIHRhcmdldCwgY29uZmlnKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gcHJvY2VzcyBzdWItcHJvcGVydGllc1xyXG4gICAgICAgIHRhcmdldCA9IHRhcmdldCB8fCAob2JqIGluc3RhbmNlb2YgQXJyYXkgPyBbXSA6IHt9KTtcclxuICAgICAgICBmb3IgKGNvbnN0IG1ldGhvZCBpbiBvYmopIHtcclxuICAgICAgICAgICAgbGV0IHBvaW50ID0gb2JqW21ldGhvZF07XHJcbiAgICAgICAgICAgIC8vIHZpZXcgY2xhc3NcclxuICAgICAgICAgICAgaWYgKHR5cGVvZiBwb2ludCA9PT0gXCJmdW5jdGlvblwiICYmIHBvaW50LnByb3RvdHlwZSBpbnN0YW5jZW9mIEpldEJhc2UpIHtcclxuICAgICAgICAgICAgICAgIHBvaW50ID0geyAkc3VidmlldzogcG9pbnQgfTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAocG9pbnQgJiYgdHlwZW9mIHBvaW50ID09PSBcIm9iamVjdFwiICYmXHJcbiAgICAgICAgICAgICAgICAhKHBvaW50IGluc3RhbmNlb2YgdGhpcy53ZWJpeC5EYXRhQ29sbGVjdGlvbikgJiYgIShwb2ludCBpbnN0YW5jZW9mIFJlZ0V4cCkgJiYgIShwb2ludCBpbnN0YW5jZW9mIE1hcCkpIHtcclxuICAgICAgICAgICAgICAgIGlmIChwb2ludCBpbnN0YW5jZW9mIERhdGUpIHtcclxuICAgICAgICAgICAgICAgICAgICB0YXJnZXRbbWV0aG9kXSA9IG5ldyBEYXRlKHBvaW50KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGNvcHkgPSB0aGlzLmNvcHlDb25maWcocG9pbnQsIChwb2ludCBpbnN0YW5jZW9mIEFycmF5ID8gW10gOiB7fSksIGNvbmZpZyk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGNvcHkgIT09IG51bGwpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGFyZ2V0W21ldGhvZF0gPSBjb3B5O1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHRhcmdldFttZXRob2RdID0gcG9pbnQ7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRhcmdldDtcclxuICAgIH1cclxuICAgIGdldFJvdXRlcigpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy4kcm91dGVyO1xyXG4gICAgfVxyXG4gICAgY2xpY2tIYW5kbGVyKGUsIHRhcmdldCkge1xyXG4gICAgICAgIGlmIChlKSB7XHJcbiAgICAgICAgICAgIHRhcmdldCA9IHRhcmdldCB8fCAoZS50YXJnZXQgfHwgZS5zcmNFbGVtZW50KTtcclxuICAgICAgICAgICAgaWYgKHRhcmdldCAmJiB0YXJnZXQuZ2V0QXR0cmlidXRlKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCB0cmlnZ2VyID0gdGFyZ2V0LmdldEF0dHJpYnV0ZShcInRyaWdnZXJcIik7XHJcbiAgICAgICAgICAgICAgICBpZiAodHJpZ2dlcikge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2ZvclZpZXcodGFyZ2V0LCB2aWV3ID0+IHZpZXcuYXBwLnRyaWdnZXIodHJpZ2dlcikpO1xyXG4gICAgICAgICAgICAgICAgICAgIGUuY2FuY2VsQnViYmxlID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgY29uc3Qgcm91dGUgPSB0YXJnZXQuZ2V0QXR0cmlidXRlKFwicm91dGVcIik7XHJcbiAgICAgICAgICAgICAgICBpZiAocm91dGUpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9mb3JWaWV3KHRhcmdldCwgdmlldyA9PiB2aWV3LnNob3cocm91dGUpKTtcclxuICAgICAgICAgICAgICAgICAgICBlLmNhbmNlbEJ1YmJsZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBjb25zdCBwYXJlbnQgPSB0YXJnZXQucGFyZW50Tm9kZTtcclxuICAgICAgICBpZiAocGFyZW50KSB7XHJcbiAgICAgICAgICAgIHRoaXMuY2xpY2tIYW5kbGVyKGUsIHBhcmVudCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgZ2V0Um9vdCgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5nZXRTdWJWaWV3KCkuZ2V0Um9vdCgpO1xyXG4gICAgfVxyXG4gICAgcmVmcmVzaCgpIHtcclxuICAgICAgICBpZiAoIXRoaXMuX3N1YlNlZ21lbnQpIHtcclxuICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZShudWxsKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0U3ViVmlldygpLnJlZnJlc2goKS50aGVuKHZpZXcgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLmNhbGxFdmVudChcImFwcDpyb3V0ZVwiLCBbdGhpcy5nZXRVcmwoKV0pO1xyXG4gICAgICAgICAgICByZXR1cm4gdmlldztcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuICAgIGxvYWRWaWV3KHVybCkge1xyXG4gICAgICAgIGNvbnN0IHZpZXdzID0gdGhpcy5jb25maWcudmlld3M7XHJcbiAgICAgICAgbGV0IHJlc3VsdCA9IG51bGw7XHJcbiAgICAgICAgaWYgKHVybCA9PT0gXCJcIikge1xyXG4gICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKHRoaXMuX2xvYWRFcnJvcihcIlwiLCBuZXcgRXJyb3IoXCJXZWJpeCBKZXQ6IEVtcHR5IHVybCBzZWdtZW50XCIpKSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIGlmICh2aWV3cykge1xyXG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZiB2aWV3cyA9PT0gXCJmdW5jdGlvblwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gY3VzdG9tIGxvYWRpbmcgc3RyYXRlZ3lcclxuICAgICAgICAgICAgICAgICAgICByZXN1bHQgPSB2aWV3cyh1cmwpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gcHJlZGVmaW5lZCBoYXNoXHJcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0ID0gdmlld3NbdXJsXTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgcmVzdWx0ID09PSBcInN0cmluZ1wiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdXJsID0gcmVzdWx0O1xyXG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdCA9IG51bGw7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKCFyZXN1bHQpIHtcclxuICAgICAgICAgICAgICAgIGlmICh1cmwgPT09IFwiX2JsYW5rXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXN1bHQgPSB7fTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdCA9IHRoaXMuX2xvYWRWaWV3RHluYW1pYyh1cmwpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNhdGNoIChlKSB7XHJcbiAgICAgICAgICAgIHJlc3VsdCA9IHRoaXMuX2xvYWRFcnJvcih1cmwsIGUpO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvLyBjdXN0b20gaGFuZGxlciBjYW4gcmV0dXJuIHZpZXcgb3IgaXRzIHByb21pc2VcclxuICAgICAgICBpZiAoIXJlc3VsdC50aGVuKSB7XHJcbiAgICAgICAgICAgIHJlc3VsdCA9IFByb21pc2UucmVzb2x2ZShyZXN1bHQpO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvLyBzZXQgZXJyb3IgaGFuZGxlclxyXG4gICAgICAgIHJlc3VsdCA9IHJlc3VsdFxyXG4gICAgICAgICAgICAudGhlbihtb2R1bGUgPT4gbW9kdWxlLl9fZXNNb2R1bGUgPyBtb2R1bGUuZGVmYXVsdCA6IG1vZHVsZSlcclxuICAgICAgICAgICAgLmNhdGNoKGVyciA9PiB0aGlzLl9sb2FkRXJyb3IodXJsLCBlcnIpKTtcclxuICAgICAgICByZXR1cm4gcmVzdWx0O1xyXG4gICAgfVxyXG4gICAgX2ZvclZpZXcodGFyZ2V0LCBoYW5kbGVyKSB7XHJcbiAgICAgICAgY29uc3QgdmlldyA9IHRoaXMud2ViaXguJCQodGFyZ2V0KTtcclxuICAgICAgICBpZiAodmlldykge1xyXG4gICAgICAgICAgICBoYW5kbGVyKHZpZXcuJHNjb3BlKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBfbG9hZFZpZXdEeW5hbWljKHVybCkge1xyXG4gICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgfVxyXG4gICAgY3JlYXRlRnJvbVVSTChjaHVuaykge1xyXG4gICAgICAgIGxldCB2aWV3O1xyXG4gICAgICAgIGlmIChjaHVuay5pc05ldyB8fCAhY2h1bmsudmlldykge1xyXG4gICAgICAgICAgICB2aWV3ID0gdGhpcy5sb2FkVmlldyhjaHVuay5wYWdlKVxyXG4gICAgICAgICAgICAgICAgLnRoZW4odWkgPT4gdGhpcy5jcmVhdGVWaWV3KHVpLCBuYW1lKSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICB2aWV3ID0gUHJvbWlzZS5yZXNvbHZlKGNodW5rLnZpZXcpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdmlldztcclxuICAgIH1cclxuICAgIGNyZWF0ZVZpZXcodWksIG5hbWUpIHtcclxuICAgICAgICBsZXQgb2JqO1xyXG4gICAgICAgIGlmICh0eXBlb2YgdWkgPT09IFwiZnVuY3Rpb25cIikge1xyXG4gICAgICAgICAgICBpZiAodWkucHJvdG90eXBlIGluc3RhbmNlb2YgSmV0QXBwQmFzZSkge1xyXG4gICAgICAgICAgICAgICAgLy8gVUkgY2xhc3NcclxuICAgICAgICAgICAgICAgIHJldHVybiBuZXcgdWkoeyBhcHA6IHRoaXMsIG5hbWUsIHJvdXRlcjogU3ViUm91dGVyIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2UgaWYgKHVpLnByb3RvdHlwZSBpbnN0YW5jZW9mIEpldEJhc2UpIHtcclxuICAgICAgICAgICAgICAgIC8vIFVJIGNsYXNzXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gbmV3IHVpKHRoaXMsIHsgbmFtZSB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIC8vIFVJIGZhY3RvcnkgZnVuY3Rpb25zXHJcbiAgICAgICAgICAgICAgICB1aSA9IHVpKHRoaXMpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh1aSBpbnN0YW5jZW9mIEpldEJhc2UpIHtcclxuICAgICAgICAgICAgb2JqID0gdWk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAvLyBVSSBvYmplY3RcclxuICAgICAgICAgICAgb2JqID0gbmV3IEpldFZpZXdSYXcodGhpcywgeyBuYW1lLCB1aSB9KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIG9iajtcclxuICAgIH1cclxuICAgIC8vIHNob3cgdmlldyBwYXRoXHJcbiAgICBzaG93KHVybCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnJlbmRlcih0aGlzLl9jb250YWluZXIsICh1cmwgfHwgdGhpcy5jb25maWcuc3RhcnQpKTtcclxuICAgIH1cclxuICAgIC8vIGV2ZW50IGhlbHBlcnNcclxuICAgIHRyaWdnZXIobmFtZSwgLi4ucmVzdCkge1xyXG4gICAgICAgIHRoaXMuYXBwbHkobmFtZSwgcmVzdCk7XHJcbiAgICB9XHJcbiAgICBhcHBseShuYW1lLCBkYXRhKSB7XHJcbiAgICAgICAgdGhpcy5jYWxsRXZlbnQobmFtZSwgZGF0YSk7XHJcbiAgICB9XHJcbiAgICBhY3Rpb24obmFtZSkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLndlYml4LmJpbmQoZnVuY3Rpb24gKC4uLnJlc3QpIHtcclxuICAgICAgICAgICAgdGhpcy5hcHBseShuYW1lLCByZXN0KTtcclxuICAgICAgICB9LCB0aGlzKTtcclxuICAgIH1cclxuICAgIG9uKG5hbWUsIGhhbmRsZXIpIHtcclxuICAgICAgICB0aGlzLmF0dGFjaEV2ZW50KG5hbWUsIGhhbmRsZXIpO1xyXG4gICAgfVxyXG4gICAgdXNlKHBsdWdpbiwgY29uZmlnKSB7XHJcbiAgICAgICAgcGx1Z2luKHRoaXMsIG51bGwsIGNvbmZpZyk7XHJcbiAgICB9XHJcbiAgICBlcnJvcihuYW1lLCBlcikge1xyXG4gICAgICAgIHRoaXMuY2FsbEV2ZW50KG5hbWUsIGVyKTtcclxuICAgICAgICB0aGlzLmNhbGxFdmVudChcImFwcDplcnJvclwiLCBlcik7XHJcbiAgICAgICAgLyogdHNsaW50OmRpc2FibGUgKi9cclxuICAgICAgICBpZiAodGhpcy5jb25maWcuZGVidWcpIHtcclxuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBlci5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihlcltpXSk7XHJcbiAgICAgICAgICAgICAgICBpZiAoZXJbaV0gaW5zdGFuY2VvZiBFcnJvcikge1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCB0ZXh0ID0gZXJbaV0ubWVzc2FnZTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAodGV4dC5pbmRleE9mKFwiTW9kdWxlIGJ1aWxkIGZhaWxlZFwiKSA9PT0gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0ZXh0ID0gdGV4dC5yZXBsYWNlKC9cXHgxYlxcW1swLTk7XSptL2csIFwiXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBkb2N1bWVudC5ib2R5LmlubmVySFRNTCA9IGA8cHJlIHN0eWxlPSdmb250LXNpemU6MTZweDsgYmFja2dyb3VuZC1jb2xvcjogI2VjNjg3MzsgY29sb3I6ICMwMDA7IHBhZGRpbmc6MTBweDsnPiR7dGV4dH08L3ByZT5gO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGV4dCArPSBcIjxicj48YnI+Q2hlY2sgY29uc29sZSBmb3IgbW9yZSBkZXRhaWxzXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMud2ViaXgubWVzc2FnZSh7IHR5cGU6IFwiZXJyb3JcIiwgdGV4dDogdGV4dCwgZXhwaXJlOiAtMSB9KTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZGVidWdnZXI7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8qIHRzbGludDplbmFibGUgKi9cclxuICAgIH1cclxuICAgIC8vIHJlbmRlcnMgdG9wIHZpZXdcclxuICAgIHJlbmRlcihyb290LCB1cmwsIHBhcmVudCkge1xyXG4gICAgICAgIHRoaXMuX2NvbnRhaW5lciA9ICh0eXBlb2Ygcm9vdCA9PT0gXCJzdHJpbmdcIikgP1xyXG4gICAgICAgICAgICB0aGlzLndlYml4LnRvTm9kZShyb290KSA6XHJcbiAgICAgICAgICAgIChyb290IHx8IGRvY3VtZW50LmJvZHkpO1xyXG4gICAgICAgIGNvbnN0IGZpcnN0SW5pdCA9ICF0aGlzLiRyb3V0ZXI7XHJcbiAgICAgICAgbGV0IHBhdGggPSBudWxsO1xyXG4gICAgICAgIGlmIChmaXJzdEluaXQpIHtcclxuICAgICAgICAgICAgaWYgKF9vbmNlICYmIFwidGFnTmFtZVwiIGluIHRoaXMuX2NvbnRhaW5lcikge1xyXG4gICAgICAgICAgICAgICAgdGhpcy53ZWJpeC5ldmVudChkb2N1bWVudC5ib2R5LCBcImNsaWNrXCIsIGUgPT4gdGhpcy5jbGlja0hhbmRsZXIoZSkpO1xyXG4gICAgICAgICAgICAgICAgX29uY2UgPSBmYWxzZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAodHlwZW9mIHVybCA9PT0gXCJzdHJpbmdcIikge1xyXG4gICAgICAgICAgICAgICAgdXJsID0gbmV3IFJvdXRlKHVybCwgMCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5fc3ViU2VnbWVudCA9IHRoaXMuX2ZpcnN0X3N0YXJ0KHVybCk7XHJcbiAgICAgICAgICAgIHRoaXMuX3N1YlNlZ21lbnQucm91dGUubGlua1JvdXRlciA9IHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICBpZiAodHlwZW9mIHVybCA9PT0gXCJzdHJpbmdcIikge1xyXG4gICAgICAgICAgICAgICAgcGF0aCA9IHVybDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmFwcCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHBhdGggPSB1cmwuc3BsaXQoKS5yb3V0ZS5wYXRoIHx8IHRoaXMuY29uZmlnLnN0YXJ0O1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcGF0aCA9IHVybC50b1N0cmluZygpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNvbnN0IHRvcCA9IHRoaXMuZ2V0U3ViVmlldygpO1xyXG4gICAgICAgIGNvbnN0IHNlZ21lbnQgPSB0aGlzLl9zdWJTZWdtZW50O1xyXG4gICAgICAgIGNvbnN0IHJlYWR5ID0gc2VnbWVudC5zaG93KHBhdGgsIHRvcClcclxuICAgICAgICAgICAgLnRoZW4oKCkgPT4gdGhpcy5jcmVhdGVGcm9tVVJMKHNlZ21lbnQuY3VycmVudCgpKSlcclxuICAgICAgICAgICAgLnRoZW4odmlldyA9PiB2aWV3LnJlbmRlcihyb290LCBzZWdtZW50KSlcclxuICAgICAgICAgICAgLnRoZW4oYmFzZSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuJHJvdXRlci5zZXQoc2VnbWVudC5yb3V0ZS5wYXRoLCB7IHNpbGVudDogdHJ1ZSB9KTtcclxuICAgICAgICAgICAgdGhpcy5jYWxsRXZlbnQoXCJhcHA6cm91dGVcIiwgW3RoaXMuZ2V0VXJsKCldKTtcclxuICAgICAgICAgICAgcmV0dXJuIGJhc2U7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgdGhpcy5yZWFkeSA9IHRoaXMucmVhZHkudGhlbigoKSA9PiByZWFkeSk7XHJcbiAgICAgICAgcmV0dXJuIHJlYWR5O1xyXG4gICAgfVxyXG4gICAgZ2V0U3ViVmlldygpIHtcclxuICAgICAgICBpZiAodGhpcy5fc3ViU2VnbWVudCkge1xyXG4gICAgICAgICAgICBjb25zdCB2aWV3ID0gdGhpcy5fc3ViU2VnbWVudC5jdXJyZW50KCkudmlldztcclxuICAgICAgICAgICAgaWYgKHZpZXcpXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdmlldztcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIG5ldyBKZXRWaWV3KHRoaXMsIHt9KTtcclxuICAgIH1cclxuICAgIF9maXJzdF9zdGFydChyb3V0ZSkge1xyXG4gICAgICAgIHRoaXMuX3NlZ21lbnQgPSByb3V0ZTtcclxuICAgICAgICBjb25zdCBjYiA9IChhKSA9PiBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5zaG93KGEpLmNhdGNoKGUgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKCEoZSBpbnN0YW5jZW9mIE5hdmlnYXRpb25CbG9ja2VkKSlcclxuICAgICAgICAgICAgICAgICAgICB0aHJvdyBlO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9LCAxKTtcclxuICAgICAgICB0aGlzLiRyb3V0ZXIgPSBuZXcgKHRoaXMuY29uZmlnLnJvdXRlcikoY2IsIHRoaXMuY29uZmlnLCB0aGlzKTtcclxuICAgICAgICAvLyBzdGFydCBhbmltYXRpb24gZm9yIHRvcC1sZXZlbCBhcHBcclxuICAgICAgICBpZiAodGhpcy5fY29udGFpbmVyID09PSBkb2N1bWVudC5ib2R5ICYmIHRoaXMuY29uZmlnLmFuaW1hdGlvbiAhPT0gZmFsc2UpIHtcclxuICAgICAgICAgICAgY29uc3Qgbm9kZSA9IHRoaXMuX2NvbnRhaW5lcjtcclxuICAgICAgICAgICAgdGhpcy53ZWJpeC5odG1sLmFkZENzcyhub2RlLCBcIndlYml4YXBwc3RhcnRcIik7XHJcbiAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy53ZWJpeC5odG1sLnJlbW92ZUNzcyhub2RlLCBcIndlYml4YXBwc3RhcnRcIik7XHJcbiAgICAgICAgICAgICAgICB0aGlzLndlYml4Lmh0bWwuYWRkQ3NzKG5vZGUsIFwid2ViaXhhcHBcIik7XHJcbiAgICAgICAgICAgIH0sIDEwKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKCFyb3V0ZSkge1xyXG4gICAgICAgICAgICAvLyBpZiBubyB1cmwgZGVmaW5lZCwgY2hlY2sgcm91dGVyIGZpcnN0XHJcbiAgICAgICAgICAgIGxldCB1cmxTdHJpbmcgPSB0aGlzLiRyb3V0ZXIuZ2V0KCk7XHJcbiAgICAgICAgICAgIGlmICghdXJsU3RyaW5nKSB7XHJcbiAgICAgICAgICAgICAgICB1cmxTdHJpbmcgPSB0aGlzLmNvbmZpZy5zdGFydDtcclxuICAgICAgICAgICAgICAgIHRoaXMuJHJvdXRlci5zZXQodXJsU3RyaW5nLCB7IHNpbGVudDogdHJ1ZSB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByb3V0ZSA9IG5ldyBSb3V0ZSh1cmxTdHJpbmcsIDApO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmICh0aGlzLmFwcCkge1xyXG4gICAgICAgICAgICByb3V0ZS5jdXJyZW50KCkudmlldyA9IHRoaXM7XHJcbiAgICAgICAgICAgIGlmIChyb3V0ZS5uZXh0KCkpIHtcclxuICAgICAgICAgICAgICAgIHJvdXRlLnJlZnJlc2goKTtcclxuICAgICAgICAgICAgICAgIHJvdXRlID0gcm91dGUuc3BsaXQoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHJvdXRlID0gbmV3IFJvdXRlKHRoaXMuY29uZmlnLnN0YXJ0LCAwKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gcm91dGU7XHJcbiAgICB9XHJcbiAgICAvLyBlcnJvciBkdXJpbmcgdmlldyByZXNvbHZpbmdcclxuICAgIF9sb2FkRXJyb3IodXJsLCBlcnIpIHtcclxuICAgICAgICB0aGlzLmVycm9yKFwiYXBwOmVycm9yOnJlc29sdmVcIiwgW2VyciwgdXJsXSk7XHJcbiAgICAgICAgcmV0dXJuIHsgdGVtcGxhdGU6IFwiIFwiIH07XHJcbiAgICB9XHJcbiAgICBhZGRTdWJWaWV3KG9iaiwgdGFyZ2V0LCBjb25maWcpIHtcclxuICAgICAgICBjb25zdCB1cmwgPSBvYmouJHN1YnZpZXcgIT09IHRydWUgPyBvYmouJHN1YnZpZXcgOiBudWxsO1xyXG4gICAgICAgIGNvbnN0IG5hbWUgPSBvYmoubmFtZSB8fCAodXJsID8gdGhpcy53ZWJpeC51aWQoKSA6IFwiZGVmYXVsdFwiKTtcclxuICAgICAgICB0YXJnZXQuaWQgPSBvYmouaWQgfHwgXCJzXCIgKyB0aGlzLndlYml4LnVpZCgpO1xyXG4gICAgICAgIGNvbnN0IHZpZXcgPSBjb25maWdbbmFtZV0gPSB7XHJcbiAgICAgICAgICAgIGlkOiB0YXJnZXQuaWQsXHJcbiAgICAgICAgICAgIHVybCxcclxuICAgICAgICAgICAgYnJhbmNoOiBvYmouYnJhbmNoLFxyXG4gICAgICAgICAgICBwb3B1cDogb2JqLnBvcHVwXHJcbiAgICAgICAgfTtcclxuICAgICAgICByZXR1cm4gdmlldy5wb3B1cCA/IG51bGwgOiB0YXJnZXQ7XHJcbiAgICB9XHJcbn1cblxuY2xhc3MgSGFzaFJvdXRlciB7XHJcbiAgICBjb25zdHJ1Y3RvcihjYiwgY29uZmlnKSB7XHJcbiAgICAgICAgdGhpcy5jb25maWcgPSBjb25maWcgfHwge307XHJcbiAgICAgICAgdGhpcy5fZGV0ZWN0UHJlZml4KCk7XHJcbiAgICAgICAgdGhpcy5jYiA9IGNiO1xyXG4gICAgICAgIHdpbmRvdy5vbnBvcHN0YXRlID0gKCkgPT4gdGhpcy5jYih0aGlzLmdldCgpKTtcclxuICAgIH1cclxuICAgIHNldChwYXRoLCBjb25maWcpIHtcclxuICAgICAgICBpZiAodGhpcy5jb25maWcucm91dGVzKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGNvbXBhcmUgPSBwYXRoLnNwbGl0KFwiP1wiLCAyKTtcclxuICAgICAgICAgICAgZm9yIChjb25zdCBrZXkgaW4gdGhpcy5jb25maWcucm91dGVzKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5jb25maWcucm91dGVzW2tleV0gPT09IGNvbXBhcmVbMF0pIHtcclxuICAgICAgICAgICAgICAgICAgICBwYXRoID0ga2V5ICsgKGNvbXBhcmUubGVuZ3RoID4gMSA/IFwiP1wiICsgY29tcGFyZVsxXSA6IFwiXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0aGlzLmdldCgpICE9PSBwYXRoKSB7XHJcbiAgICAgICAgICAgIHdpbmRvdy5oaXN0b3J5LnB1c2hTdGF0ZShudWxsLCBudWxsLCB0aGlzLnByZWZpeCArIHRoaXMuc3VmaXggKyBwYXRoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKCFjb25maWcgfHwgIWNvbmZpZy5zaWxlbnQpIHtcclxuICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB0aGlzLmNiKHBhdGgpLCAxKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBnZXQoKSB7XHJcbiAgICAgICAgbGV0IHBhdGggPSB0aGlzLl9nZXRSYXcoKS5yZXBsYWNlKHRoaXMucHJlZml4LCBcIlwiKS5yZXBsYWNlKHRoaXMuc3VmaXgsIFwiXCIpO1xyXG4gICAgICAgIHBhdGggPSAocGF0aCAhPT0gXCIvXCIgJiYgcGF0aCAhPT0gXCIjXCIpID8gcGF0aCA6IFwiXCI7XHJcbiAgICAgICAgaWYgKHRoaXMuY29uZmlnLnJvdXRlcykge1xyXG4gICAgICAgICAgICBjb25zdCBjb21wYXJlID0gcGF0aC5zcGxpdChcIj9cIiwgMik7XHJcbiAgICAgICAgICAgIGNvbnN0IGtleSA9IHRoaXMuY29uZmlnLnJvdXRlc1tjb21wYXJlWzBdXTtcclxuICAgICAgICAgICAgaWYgKGtleSkge1xyXG4gICAgICAgICAgICAgICAgcGF0aCA9IGtleSArIChjb21wYXJlLmxlbmd0aCA+IDEgPyBcIj9cIiArIGNvbXBhcmVbMV0gOiBcIlwiKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gcGF0aDtcclxuICAgIH1cclxuICAgIF9kZXRlY3RQcmVmaXgoKSB7XHJcbiAgICAgICAgLy8gdXNlIFwiIyFcIiBmb3IgYmFja3dhcmQgY29tcGF0aWJpbGl0eVxyXG4gICAgICAgIGNvbnN0IHN1Zml4ID0gdGhpcy5jb25maWcucm91dGVyUHJlZml4O1xyXG4gICAgICAgIHRoaXMuc3VmaXggPSBcIiNcIiArICgodHlwZW9mIHN1Zml4ID09PSBcInVuZGVmaW5lZFwiKSA/IFwiIVwiIDogc3VmaXgpO1xyXG4gICAgICAgIHRoaXMucHJlZml4ID0gZG9jdW1lbnQubG9jYXRpb24uaHJlZi5zcGxpdChcIiNcIiwgMilbMF07XHJcbiAgICB9XHJcbiAgICBfZ2V0UmF3KCkge1xyXG4gICAgICAgIHJldHVybiBkb2N1bWVudC5sb2NhdGlvbi5ocmVmO1xyXG4gICAgfVxyXG59XG5cbmxldCBpc1BhdGNoZWQgPSBmYWxzZTtcclxuZnVuY3Rpb24gcGF0Y2godykge1xyXG4gICAgaWYgKGlzUGF0Y2hlZCB8fCAhdykge1xyXG4gICAgICAgIHJldHVybjtcclxuICAgIH1cclxuICAgIGlzUGF0Y2hlZCA9IHRydWU7XHJcbiAgICAvLyBjdXN0b20gcHJvbWlzZSBmb3IgSUU4XHJcbiAgICBjb25zdCB3aW4gPSB3aW5kb3c7XHJcbiAgICBpZiAoIXdpbi5Qcm9taXNlKSB7XHJcbiAgICAgICAgd2luLlByb21pc2UgPSB3LnByb21pc2U7XHJcbiAgICB9XHJcbiAgICBjb25zdCB2ZXJzaW9uID0gdy52ZXJzaW9uLnNwbGl0KFwiLlwiKTtcclxuICAgIC8vIHdpbGwgYmUgZml4ZWQgaW4gd2ViaXggNS4zXHJcbiAgICBpZiAodmVyc2lvblswXSAqIDEwICsgdmVyc2lvblsxXSAqIDEgPCA1Mykge1xyXG4gICAgICAgIHcudWkuZnJlZXplID0gZnVuY3Rpb24gKGhhbmRsZXIpIHtcclxuICAgICAgICAgICAgLy8gZGlzYWJsZWQgYmVjYXVzZSB3ZWJpeCBqZXQgNS4wIGNhbid0IGhhbmRsZSByZXNpemUgb2Ygc2Nyb2xsdmlldyBjb3JyZWN0bHlcclxuICAgICAgICAgICAgLy8gdy51aS4kZnJlZXplID0gdHJ1ZTtcclxuICAgICAgICAgICAgY29uc3QgcmVzID0gaGFuZGxlcigpO1xyXG4gICAgICAgICAgICBpZiAocmVzICYmIHJlcy50aGVuKSB7XHJcbiAgICAgICAgICAgICAgICByZXMudGhlbihmdW5jdGlvbiAoc29tZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHcudWkuJGZyZWV6ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgIHcudWkucmVzaXplKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHNvbWU7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHcudWkuJGZyZWV6ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgdy51aS5yZXNpemUoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gcmVzO1xyXG4gICAgICAgIH07XHJcbiAgICB9XHJcbiAgICAvLyBhZGRpbmcgdmlld3MgYXMgY2xhc3Nlc1xyXG4gICAgY29uc3QgYmFzZUFkZCA9IHcudWkuYmFzZWxheW91dC5wcm90b3R5cGUuYWRkVmlldztcclxuICAgIGNvbnN0IGJhc2VSZW1vdmUgPSB3LnVpLmJhc2VsYXlvdXQucHJvdG90eXBlLnJlbW92ZVZpZXc7XHJcbiAgICBjb25zdCBjb25maWcgPSB7XHJcbiAgICAgICAgYWRkVmlldyh2aWV3LCBpbmRleCkge1xyXG4gICAgICAgICAgICAvLyB0cmlnZ2VyIGxvZ2ljIG9ubHkgZm9yIHdpZGdldHMgaW5zaWRlIG9mIGpldC12aWV3XHJcbiAgICAgICAgICAgIC8vIGlnbm9yZSBjYXNlIHdoZW4gYWRkVmlldyB1c2VkIHdpdGggYWxyZWFkeSBpbml0aWFsaXplZCB3aWRnZXRcclxuICAgICAgICAgICAgaWYgKHRoaXMuJHNjb3BlICYmIHRoaXMuJHNjb3BlLndlYml4SmV0ICYmICF2aWV3LnF1ZXJ5Vmlldykge1xyXG4gICAgICAgICAgICAgICAgY29uc3QganZpZXcgPSB0aGlzLiRzY29wZTtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHN1YnMgPSB7fTtcclxuICAgICAgICAgICAgICAgIHZpZXcgPSBqdmlldy5hcHAuY29weUNvbmZpZyh2aWV3LCB7fSwgc3Vicyk7XHJcbiAgICAgICAgICAgICAgICBiYXNlQWRkLmFwcGx5KHRoaXMsIFt2aWV3LCBpbmRleF0pO1xyXG4gICAgICAgICAgICAgICAgZm9yIChjb25zdCBrZXkgaW4gc3Vicykge1xyXG4gICAgICAgICAgICAgICAgICAgIGp2aWV3Ll9yZW5kZXJGcmFtZShrZXksIHN1YnNba2V5XSwgbnVsbCkudGhlbigoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGp2aWV3Ll9zdWJzW2tleV0gPSBzdWJzW2tleV07XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdmlldy5pZDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBiYXNlQWRkLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LFxyXG4gICAgICAgIHJlbW92ZVZpZXcoKSB7XHJcbiAgICAgICAgICAgIGJhc2VSZW1vdmUuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcclxuICAgICAgICAgICAgaWYgKHRoaXMuJHNjb3BlICYmIHRoaXMuJHNjb3BlLndlYml4SmV0KSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBzdWJzID0gdGhpcy4kc2NvcGUuX3N1YnM7XHJcbiAgICAgICAgICAgICAgICAvLyBjaGVjayBhbGwgc3ViLXZpZXdzLCBkZXN0cm95IGFuZCBjbGVhbiB0aGUgcmVtb3ZlZCBvbmVcclxuICAgICAgICAgICAgICAgIGZvciAoY29uc3Qga2V5IGluIHN1YnMpIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCB0ZXN0ID0gc3Vic1trZXldO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICghdy4kJCh0ZXN0LmlkKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0ZXN0LnZpZXcuZGVzdHJ1Y3RvcigpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBkZWxldGUgc3Vic1trZXldO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH07XHJcbiAgICB3LmV4dGVuZCh3LnVpLmxheW91dC5wcm90b3R5cGUsIGNvbmZpZywgdHJ1ZSk7XHJcbiAgICB3LmV4dGVuZCh3LnVpLmJhc2VsYXlvdXQucHJvdG90eXBlLCBjb25maWcsIHRydWUpO1xyXG4gICAgLy8gd3JhcHBlciBmb3IgdXNpbmcgSmV0IEFwcHMgYXMgdmlld3NcclxuICAgIHcucHJvdG9VSSh7XHJcbiAgICAgICAgbmFtZTogXCJqZXRhcHBcIixcclxuICAgICAgICAkaW5pdChjZmcpIHtcclxuICAgICAgICAgICAgdGhpcy4kYXBwID0gbmV3IHRoaXMuYXBwKGNmZyk7XHJcbiAgICAgICAgICAgIGNvbnN0IGlkID0gdy51aWQoKS50b1N0cmluZygpO1xyXG4gICAgICAgICAgICBjZmcuYm9keSA9IHsgaWQgfTtcclxuICAgICAgICAgICAgdGhpcy4kcmVhZHkucHVzaChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLiRhcHAucmVuZGVyKHsgaWQgfSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICBmb3IgKHZhciBrZXkgaW4gdGhpcy4kYXBwKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgb3JpZ2luID0gdGhpcy4kYXBwW2tleV07XHJcbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mIG9yaWdpbiA9PT0gXCJmdW5jdGlvblwiICYmICF0aGlzW2tleV0pIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzW2tleV0gPSBvcmlnaW4uYmluZCh0aGlzLiRhcHApO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfSwgdy51aS5wcm94eSk7XHJcbn1cblxuY2xhc3MgSmV0QXBwIGV4dGVuZHMgSmV0QXBwQmFzZSB7XHJcbiAgICBjb25zdHJ1Y3Rvcihjb25maWcpIHtcclxuICAgICAgICBjb25maWcucm91dGVyID0gY29uZmlnLnJvdXRlciB8fCBIYXNoUm91dGVyO1xyXG4gICAgICAgIHN1cGVyKGNvbmZpZyk7XHJcbiAgICAgICAgcGF0Y2godGhpcy53ZWJpeCk7XHJcbiAgICB9XHJcbiAgICBfbG9hZFZpZXdEeW5hbWljKHVybCkge1xyXG4gICAgICAgIHVybCA9IHVybC5yZXBsYWNlKC9cXC4vZywgXCIvXCIpO1xyXG4gICAgICAgIHJldHVybiByZXF1aXJlKFwiamV0LXZpZXdzL1wiICsgdXJsKTtcclxuICAgIH1cclxufVxuXG5jbGFzcyBTdG9yZVJvdXRlciB7XHJcbiAgICBjb25zdHJ1Y3RvcihjYiwgY29uZmlnLCBhcHApIHtcclxuICAgICAgICB0aGlzLnN0b3JhZ2UgPSBjb25maWcuc3RvcmFnZSB8fCBhcHAud2ViaXguc3RvcmFnZS5zZXNzaW9uO1xyXG4gICAgICAgIHRoaXMubmFtZSA9IChjb25maWcuc3RvcmVOYW1lIHx8IGNvbmZpZy5pZCArIFwiOnJvdXRlXCIpO1xyXG4gICAgICAgIHRoaXMuY2IgPSBjYjtcclxuICAgIH1cclxuICAgIHNldChwYXRoLCBjb25maWcpIHtcclxuICAgICAgICB0aGlzLnN0b3JhZ2UucHV0KHRoaXMubmFtZSwgcGF0aCk7XHJcbiAgICAgICAgaWYgKCFjb25maWcgfHwgIWNvbmZpZy5zaWxlbnQpIHtcclxuICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB0aGlzLmNiKHBhdGgpLCAxKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBnZXQoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuc3RvcmFnZS5nZXQodGhpcy5uYW1lKTtcclxuICAgIH1cclxufVxuXG5jbGFzcyBVcmxSb3V0ZXIgZXh0ZW5kcyBIYXNoUm91dGVyIHtcclxuICAgIF9kZXRlY3RQcmVmaXgoKSB7XHJcbiAgICAgICAgdGhpcy5wcmVmaXggPSBcIlwiO1xyXG4gICAgICAgIHRoaXMuc3VmaXggPSB0aGlzLmNvbmZpZy5yb3V0ZXJQcmVmaXggfHwgXCJcIjtcclxuICAgIH1cclxuICAgIF9nZXRSYXcoKSB7XHJcbiAgICAgICAgcmV0dXJuIGRvY3VtZW50LmxvY2F0aW9uLnBhdGhuYW1lICsgKGRvY3VtZW50LmxvY2F0aW9uLnNlYXJjaCB8fCBcIlwiKTtcclxuICAgIH1cclxufVxuXG5jbGFzcyBFbXB0eVJvdXRlciB7XHJcbiAgICBjb25zdHJ1Y3RvcihjYiwgXyRjb25maWcpIHtcclxuICAgICAgICB0aGlzLnBhdGggPSBcIlwiO1xyXG4gICAgICAgIHRoaXMuY2IgPSBjYjtcclxuICAgIH1cclxuICAgIHNldChwYXRoLCBjb25maWcpIHtcclxuICAgICAgICB0aGlzLnBhdGggPSBwYXRoO1xyXG4gICAgICAgIGlmICghY29uZmlnIHx8ICFjb25maWcuc2lsZW50KSB7XHJcbiAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4gdGhpcy5jYihwYXRoKSwgMSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgZ2V0KCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnBhdGg7XHJcbiAgICB9XHJcbn1cblxuZnVuY3Rpb24gVW5sb2FkR3VhcmQoYXBwLCB2aWV3LCBjb25maWcpIHtcclxuICAgIHZpZXcub24oYXBwLCBgYXBwOmd1YXJkYCwgZnVuY3Rpb24gKF8kdXJsLCBwb2ludCwgcHJvbWlzZSkge1xyXG4gICAgICAgIGlmIChwb2ludCA9PT0gdmlldyB8fCBwb2ludC5jb250YWlucyh2aWV3KSkge1xyXG4gICAgICAgICAgICBjb25zdCByZXMgPSBjb25maWcoKTtcclxuICAgICAgICAgICAgaWYgKHJlcyA9PT0gZmFsc2UpIHtcclxuICAgICAgICAgICAgICAgIHByb21pc2UuY29uZmlybSA9IFByb21pc2UucmVqZWN0KG5ldyBOYXZpZ2F0aW9uQmxvY2tlZCgpKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHByb21pc2UuY29uZmlybSA9IHByb21pc2UuY29uZmlybS50aGVuKCgpID0+IHJlcyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9KTtcclxufVxuXG4vLyAgICAgKGMpIDIwMTItMjAxOCBBaXJibmIsIEluYy5cblxuLy8gdmFyIGhhcyA9IHJlcXVpcmUoJ2hhcycpO1xuZnVuY3Rpb24gaGFzKHN0b3JlLCBrZXkpIHtcbiAgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChzdG9yZSwga2V5KTtcbn1cbi8vIHZhciBmb3JFYWNoID0gcmVxdWlyZSgnZm9yLWVhY2gnKTtcbmZ1bmN0aW9uIGZvckVhY2gob2JqLCBoYW5kbGVyLCBjb250ZXh0KSB7XG4gIGZvciAodmFyIGtleSBpbiBvYmopIHtcbiAgICBpZiAoaGFzKG9iaiwga2V5KSkge1xuICAgICAgaGFuZGxlci5jYWxsKChjb250ZXh0IHx8IG9iaiksIG9ialtrZXldLCBrZXksIG9iaik7XG4gICAgfVxuICB9XG59XG4vLyB2YXIgdHJpbSA9IHJlcXVpcmUoJ3N0cmluZy5wcm90b3R5cGUudHJpbScpO1xuZnVuY3Rpb24gdHJpbShzdHIpIHtcbiAgcmV0dXJuIHN0ci5yZXBsYWNlKC9eW1xcc1xcdUZFRkZcXHhBMF0rfFtcXHNcXHVGRUZGXFx4QTBdKyQvZywgJycpO1xufVxuLy8gdmFyIHdhcm5pbmcgPSByZXF1aXJlKCd3YXJuaW5nJyk7XG5mdW5jdGlvbiB3YXJuKG1lc3NhZ2UpIHtcbiAgbWVzc2FnZSA9ICdXYXJuaW5nOiAnICsgbWVzc2FnZTtcbiAgaWYgKHR5cGVvZiBjb25zb2xlICE9PSAndW5kZWZpbmVkJykge1xuICAgIGNvbnNvbGUuZXJyb3IobWVzc2FnZSk7XG4gIH1cblxuICB0cnkgeyB0aHJvdyBuZXcgRXJyb3IobWVzc2FnZSk7IH0gY2F0Y2ggKHgpIHt9XG59XG5cbnZhciByZXBsYWNlID0gU3RyaW5nLnByb3RvdHlwZS5yZXBsYWNlO1xudmFyIHNwbGl0ID0gU3RyaW5nLnByb3RvdHlwZS5zcGxpdDtcblxuLy8gIyMjIyBQbHVyYWxpemF0aW9uIG1ldGhvZHNcbi8vIFRoZSBzdHJpbmcgdGhhdCBzZXBhcmF0ZXMgdGhlIGRpZmZlcmVudCBwaHJhc2UgcG9zc2liaWxpdGllcy5cbnZhciBkZWxpbWl0ZXIgPSAnfHx8fCc7XG5cbnZhciBydXNzaWFuUGx1cmFsR3JvdXBzID0gZnVuY3Rpb24gKG4pIHtcbiAgdmFyIGVuZCA9IG4gJSAxMDtcbiAgaWYgKG4gIT09IDExICYmIGVuZCA9PT0gMSkge1xuICAgIHJldHVybiAwO1xuICB9XG4gIGlmICgyIDw9IGVuZCAmJiBlbmQgPD0gNCAmJiAhKG4gPj0gMTIgJiYgbiA8PSAxNCkpIHtcbiAgICByZXR1cm4gMTtcbiAgfVxuICByZXR1cm4gMjtcbn07XG5cbi8vIE1hcHBpbmcgZnJvbSBwbHVyYWxpemF0aW9uIGdyb3VwIHBsdXJhbCBsb2dpYy5cbnZhciBwbHVyYWxUeXBlcyA9IHtcbiAgYXJhYmljOiBmdW5jdGlvbiAobikge1xuICAgIC8vIGh0dHA6Ly93d3cuYXJhYmV5ZXMub3JnL1BsdXJhbF9Gb3Jtc1xuICAgIGlmIChuIDwgMykgeyByZXR1cm4gbjsgfVxuICAgIHZhciBsYXN0VHdvID0gbiAlIDEwMDtcbiAgICBpZiAobGFzdFR3byA+PSAzICYmIGxhc3RUd28gPD0gMTApIHJldHVybiAzO1xuICAgIHJldHVybiBsYXN0VHdvID49IDExID8gNCA6IDU7XG4gIH0sXG4gIGJvc25pYW5fc2VyYmlhbjogcnVzc2lhblBsdXJhbEdyb3VwcyxcbiAgY2hpbmVzZTogZnVuY3Rpb24gKCkgeyByZXR1cm4gMDsgfSxcbiAgY3JvYXRpYW46IHJ1c3NpYW5QbHVyYWxHcm91cHMsXG4gIGZyZW5jaDogZnVuY3Rpb24gKG4pIHsgcmV0dXJuIG4gPiAxID8gMSA6IDA7IH0sXG4gIGdlcm1hbjogZnVuY3Rpb24gKG4pIHsgcmV0dXJuIG4gIT09IDEgPyAxIDogMDsgfSxcbiAgcnVzc2lhbjogcnVzc2lhblBsdXJhbEdyb3VwcyxcbiAgbGl0aHVhbmlhbjogZnVuY3Rpb24gKG4pIHtcbiAgICBpZiAobiAlIDEwID09PSAxICYmIG4gJSAxMDAgIT09IDExKSB7IHJldHVybiAwOyB9XG4gICAgcmV0dXJuIG4gJSAxMCA+PSAyICYmIG4gJSAxMCA8PSA5ICYmIChuICUgMTAwIDwgMTEgfHwgbiAlIDEwMCA+IDE5KSA/IDEgOiAyO1xuICB9LFxuICBjemVjaDogZnVuY3Rpb24gKG4pIHtcbiAgICBpZiAobiA9PT0gMSkgeyByZXR1cm4gMDsgfVxuICAgIHJldHVybiAobiA+PSAyICYmIG4gPD0gNCkgPyAxIDogMjtcbiAgfSxcbiAgcG9saXNoOiBmdW5jdGlvbiAobikge1xuICAgIGlmIChuID09PSAxKSB7IHJldHVybiAwOyB9XG4gICAgdmFyIGVuZCA9IG4gJSAxMDtcbiAgICByZXR1cm4gMiA8PSBlbmQgJiYgZW5kIDw9IDQgJiYgKG4gJSAxMDAgPCAxMCB8fCBuICUgMTAwID49IDIwKSA/IDEgOiAyO1xuICB9LFxuICBpY2VsYW5kaWM6IGZ1bmN0aW9uIChuKSB7IHJldHVybiAobiAlIDEwICE9PSAxIHx8IG4gJSAxMDAgPT09IDExKSA/IDEgOiAwOyB9LFxuICBzbG92ZW5pYW46IGZ1bmN0aW9uIChuKSB7XG4gICAgdmFyIGxhc3RUd28gPSBuICUgMTAwO1xuICAgIGlmIChsYXN0VHdvID09PSAxKSB7XG4gICAgICByZXR1cm4gMDtcbiAgICB9XG4gICAgaWYgKGxhc3RUd28gPT09IDIpIHtcbiAgICAgIHJldHVybiAxO1xuICAgIH1cbiAgICBpZiAobGFzdFR3byA9PT0gMyB8fCBsYXN0VHdvID09PSA0KSB7XG4gICAgICByZXR1cm4gMjtcbiAgICB9XG4gICAgcmV0dXJuIDM7XG4gIH1cbn07XG5cblxuLy8gTWFwcGluZyBmcm9tIHBsdXJhbGl6YXRpb24gZ3JvdXAgdG8gaW5kaXZpZHVhbCBsYW5ndWFnZSBjb2Rlcy9sb2NhbGVzLlxuLy8gV2lsbCBsb29rIHVwIGJhc2VkIG9uIGV4YWN0IG1hdGNoLCBpZiBub3QgZm91bmQgYW5kIGl0J3MgYSBsb2NhbGUgd2lsbCBwYXJzZSB0aGUgbG9jYWxlXG4vLyBmb3IgbGFuZ3VhZ2UgY29kZSwgYW5kIGlmIHRoYXQgZG9lcyBub3QgZXhpc3Qgd2lsbCBkZWZhdWx0IHRvICdlbidcbnZhciBwbHVyYWxUeXBlVG9MYW5ndWFnZXMgPSB7XG4gIGFyYWJpYzogWydhciddLFxuICBib3NuaWFuX3NlcmJpYW46IFsnYnMtTGF0bi1CQScsICdicy1DeXJsLUJBJywgJ3NybC1SUycsICdzci1SUyddLFxuICBjaGluZXNlOiBbJ2lkJywgJ2lkLUlEJywgJ2phJywgJ2tvJywgJ2tvLUtSJywgJ2xvJywgJ21zJywgJ3RoJywgJ3RoLVRIJywgJ3poJ10sXG4gIGNyb2F0aWFuOiBbJ2hyJywgJ2hyLUhSJ10sXG4gIGdlcm1hbjogWydmYScsICdkYScsICdkZScsICdlbicsICdlcycsICdmaScsICdlbCcsICdoZScsICdoaS1JTicsICdodScsICdodS1IVScsICdpdCcsICdubCcsICdubycsICdwdCcsICdzdicsICd0ciddLFxuICBmcmVuY2g6IFsnZnInLCAndGwnLCAncHQtYnInXSxcbiAgcnVzc2lhbjogWydydScsICdydS1SVSddLFxuICBsaXRodWFuaWFuOiBbJ2x0J10sXG4gIGN6ZWNoOiBbJ2NzJywgJ2NzLUNaJywgJ3NrJ10sXG4gIHBvbGlzaDogWydwbCddLFxuICBpY2VsYW5kaWM6IFsnaXMnXSxcbiAgc2xvdmVuaWFuOiBbJ3NsLVNMJ11cbn07XG5cbmZ1bmN0aW9uIGxhbmdUb1R5cGVNYXAobWFwcGluZykge1xuICB2YXIgcmV0ID0ge307XG4gIGZvckVhY2gobWFwcGluZywgZnVuY3Rpb24gKGxhbmdzLCB0eXBlKSB7XG4gICAgZm9yRWFjaChsYW5ncywgZnVuY3Rpb24gKGxhbmcpIHtcbiAgICAgIHJldFtsYW5nXSA9IHR5cGU7XG4gICAgfSk7XG4gIH0pO1xuICByZXR1cm4gcmV0O1xufVxuXG5mdW5jdGlvbiBwbHVyYWxUeXBlTmFtZShsb2NhbGUpIHtcbiAgdmFyIGxhbmdUb1BsdXJhbFR5cGUgPSBsYW5nVG9UeXBlTWFwKHBsdXJhbFR5cGVUb0xhbmd1YWdlcyk7XG4gIHJldHVybiBsYW5nVG9QbHVyYWxUeXBlW2xvY2FsZV1cbiAgICB8fCBsYW5nVG9QbHVyYWxUeXBlW3NwbGl0LmNhbGwobG9jYWxlLCAvLS8sIDEpWzBdXVxuICAgIHx8IGxhbmdUb1BsdXJhbFR5cGUuZW47XG59XG5cbmZ1bmN0aW9uIHBsdXJhbFR5cGVJbmRleChsb2NhbGUsIGNvdW50KSB7XG4gIHJldHVybiBwbHVyYWxUeXBlc1twbHVyYWxUeXBlTmFtZShsb2NhbGUpXShjb3VudCk7XG59XG5cbmZ1bmN0aW9uIGVzY2FwZSh0b2tlbikge1xuICByZXR1cm4gdG9rZW4ucmVwbGFjZSgvWy4qKz9eJHt9KCl8W1xcXVxcXFxdL2csICdcXFxcJCYnKTtcbn1cblxuZnVuY3Rpb24gY29uc3RydWN0VG9rZW5SZWdleChvcHRzKSB7XG4gIHZhciBwcmVmaXggPSAob3B0cyAmJiBvcHRzLnByZWZpeCkgfHwgJyV7JztcbiAgdmFyIHN1ZmZpeCA9IChvcHRzICYmIG9wdHMuc3VmZml4KSB8fCAnfSc7XG5cbiAgaWYgKHByZWZpeCA9PT0gZGVsaW1pdGVyIHx8IHN1ZmZpeCA9PT0gZGVsaW1pdGVyKSB7XG4gICAgdGhyb3cgbmV3IFJhbmdlRXJyb3IoJ1wiJyArIGRlbGltaXRlciArICdcIiB0b2tlbiBpcyByZXNlcnZlZCBmb3IgcGx1cmFsaXphdGlvbicpO1xuICB9XG5cbiAgcmV0dXJuIG5ldyBSZWdFeHAoZXNjYXBlKHByZWZpeCkgKyAnKC4qPyknICsgZXNjYXBlKHN1ZmZpeCksICdnJyk7XG59XG5cbnZhciBkb2xsYXJSZWdleCA9IC9cXCQvZztcbnZhciBkb2xsYXJCaWxsc1lhbGwgPSAnJCQnO1xudmFyIGRlZmF1bHRUb2tlblJlZ2V4ID0gLyVcXHsoLio/KVxcfS9nO1xuXG4vLyAjIyMgdHJhbnNmb3JtUGhyYXNlKHBocmFzZSwgc3Vic3RpdHV0aW9ucywgbG9jYWxlKVxuLy9cbi8vIFRha2VzIGEgcGhyYXNlIHN0cmluZyBhbmQgdHJhbnNmb3JtcyBpdCBieSBjaG9vc2luZyB0aGUgY29ycmVjdFxuLy8gcGx1cmFsIGZvcm0gYW5kIGludGVycG9sYXRpbmcgaXQuXG4vL1xuLy8gICAgIHRyYW5zZm9ybVBocmFzZSgnSGVsbG8sICV7bmFtZX0hJywge25hbWU6ICdTcGlrZSd9KTtcbi8vICAgICAvLyBcIkhlbGxvLCBTcGlrZSFcIlxuLy9cbi8vIFRoZSBjb3JyZWN0IHBsdXJhbCBmb3JtIGlzIHNlbGVjdGVkIGlmIHN1YnN0aXR1dGlvbnMuc21hcnRfY291bnRcbi8vIGlzIHNldC4gWW91IGNhbiBwYXNzIGluIGEgbnVtYmVyIGluc3RlYWQgb2YgYW4gT2JqZWN0IGFzIGBzdWJzdGl0dXRpb25zYFxuLy8gYXMgYSBzaG9ydGN1dCBmb3IgYHNtYXJ0X2NvdW50YC5cbi8vXG4vLyAgICAgdHJhbnNmb3JtUGhyYXNlKCcle3NtYXJ0X2NvdW50fSBuZXcgbWVzc2FnZXMgfHx8fCAxIG5ldyBtZXNzYWdlJywge3NtYXJ0X2NvdW50OiAxfSwgJ2VuJyk7XG4vLyAgICAgLy8gXCIxIG5ldyBtZXNzYWdlXCJcbi8vXG4vLyAgICAgdHJhbnNmb3JtUGhyYXNlKCcle3NtYXJ0X2NvdW50fSBuZXcgbWVzc2FnZXMgfHx8fCAxIG5ldyBtZXNzYWdlJywge3NtYXJ0X2NvdW50OiAyfSwgJ2VuJyk7XG4vLyAgICAgLy8gXCIyIG5ldyBtZXNzYWdlc1wiXG4vL1xuLy8gICAgIHRyYW5zZm9ybVBocmFzZSgnJXtzbWFydF9jb3VudH0gbmV3IG1lc3NhZ2VzIHx8fHwgMSBuZXcgbWVzc2FnZScsIDUsICdlbicpO1xuLy8gICAgIC8vIFwiNSBuZXcgbWVzc2FnZXNcIlxuLy9cbi8vIFlvdSBzaG91bGQgcGFzcyBpbiBhIHRoaXJkIGFyZ3VtZW50LCB0aGUgbG9jYWxlLCB0byBzcGVjaWZ5IHRoZSBjb3JyZWN0IHBsdXJhbCB0eXBlLlxuLy8gSXQgZGVmYXVsdHMgdG8gYCdlbidgIHdpdGggMiBwbHVyYWwgZm9ybXMuXG5mdW5jdGlvbiB0cmFuc2Zvcm1QaHJhc2UocGhyYXNlLCBzdWJzdGl0dXRpb25zLCBsb2NhbGUsIHRva2VuUmVnZXgpIHtcbiAgaWYgKHR5cGVvZiBwaHJhc2UgIT09ICdzdHJpbmcnKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcignUG9seWdsb3QudHJhbnNmb3JtUGhyYXNlIGV4cGVjdHMgYXJndW1lbnQgIzEgdG8gYmUgc3RyaW5nJyk7XG4gIH1cblxuICBpZiAoc3Vic3RpdHV0aW9ucyA9PSBudWxsKSB7XG4gICAgcmV0dXJuIHBocmFzZTtcbiAgfVxuXG4gIHZhciByZXN1bHQgPSBwaHJhc2U7XG4gIHZhciBpbnRlcnBvbGF0aW9uUmVnZXggPSB0b2tlblJlZ2V4IHx8IGRlZmF1bHRUb2tlblJlZ2V4O1xuXG4gIC8vIGFsbG93IG51bWJlciBhcyBhIHBsdXJhbGl6YXRpb24gc2hvcnRjdXRcbiAgdmFyIG9wdGlvbnMgPSB0eXBlb2Ygc3Vic3RpdHV0aW9ucyA9PT0gJ251bWJlcicgPyB7IHNtYXJ0X2NvdW50OiBzdWJzdGl0dXRpb25zIH0gOiBzdWJzdGl0dXRpb25zO1xuXG4gIC8vIFNlbGVjdCBwbHVyYWwgZm9ybTogYmFzZWQgb24gYSBwaHJhc2UgdGV4dCB0aGF0IGNvbnRhaW5zIGBuYFxuICAvLyBwbHVyYWwgZm9ybXMgc2VwYXJhdGVkIGJ5IGBkZWxpbWl0ZXJgLCBhIGBsb2NhbGVgLCBhbmQgYSBgc3Vic3RpdHV0aW9ucy5zbWFydF9jb3VudGAsXG4gIC8vIGNob29zZSB0aGUgY29ycmVjdCBwbHVyYWwgZm9ybS4gVGhpcyBpcyBvbmx5IGRvbmUgaWYgYGNvdW50YCBpcyBzZXQuXG4gIGlmIChvcHRpb25zLnNtYXJ0X2NvdW50ICE9IG51bGwgJiYgcmVzdWx0KSB7XG4gICAgdmFyIHRleHRzID0gc3BsaXQuY2FsbChyZXN1bHQsIGRlbGltaXRlcik7XG4gICAgcmVzdWx0ID0gdHJpbSh0ZXh0c1twbHVyYWxUeXBlSW5kZXgobG9jYWxlIHx8ICdlbicsIG9wdGlvbnMuc21hcnRfY291bnQpXSB8fCB0ZXh0c1swXSk7XG4gIH1cblxuICAvLyBJbnRlcnBvbGF0ZTogQ3JlYXRlcyBhIGBSZWdFeHBgIG9iamVjdCBmb3IgZWFjaCBpbnRlcnBvbGF0aW9uIHBsYWNlaG9sZGVyLlxuICByZXN1bHQgPSByZXBsYWNlLmNhbGwocmVzdWx0LCBpbnRlcnBvbGF0aW9uUmVnZXgsIGZ1bmN0aW9uIChleHByZXNzaW9uLCBhcmd1bWVudCkge1xuICAgIGlmICghaGFzKG9wdGlvbnMsIGFyZ3VtZW50KSB8fCBvcHRpb25zW2FyZ3VtZW50XSA9PSBudWxsKSB7IHJldHVybiBleHByZXNzaW9uOyB9XG4gICAgLy8gRW5zdXJlIHJlcGxhY2VtZW50IHZhbHVlIGlzIGVzY2FwZWQgdG8gcHJldmVudCBzcGVjaWFsICQtcHJlZml4ZWQgcmVnZXggcmVwbGFjZSB0b2tlbnMuXG4gICAgcmV0dXJuIHJlcGxhY2UuY2FsbChvcHRpb25zW2FyZ3VtZW50XSwgZG9sbGFyUmVnZXgsIGRvbGxhckJpbGxzWWFsbCk7XG4gIH0pO1xuXG4gIHJldHVybiByZXN1bHQ7XG59XG5cbi8vICMjIyBQb2x5Z2xvdCBjbGFzcyBjb25zdHJ1Y3RvclxuZnVuY3Rpb24gUG9seWdsb3Qob3B0aW9ucykge1xuICB2YXIgb3B0cyA9IG9wdGlvbnMgfHwge307XG4gIHRoaXMucGhyYXNlcyA9IHt9O1xuICB0aGlzLmV4dGVuZChvcHRzLnBocmFzZXMgfHwge30pO1xuICB0aGlzLmN1cnJlbnRMb2NhbGUgPSBvcHRzLmxvY2FsZSB8fCAnZW4nO1xuICB2YXIgYWxsb3dNaXNzaW5nID0gb3B0cy5hbGxvd01pc3NpbmcgPyB0cmFuc2Zvcm1QaHJhc2UgOiBudWxsO1xuICB0aGlzLm9uTWlzc2luZ0tleSA9IHR5cGVvZiBvcHRzLm9uTWlzc2luZ0tleSA9PT0gJ2Z1bmN0aW9uJyA/IG9wdHMub25NaXNzaW5nS2V5IDogYWxsb3dNaXNzaW5nO1xuICB0aGlzLndhcm4gPSBvcHRzLndhcm4gfHwgd2FybjtcbiAgdGhpcy50b2tlblJlZ2V4ID0gY29uc3RydWN0VG9rZW5SZWdleChvcHRzLmludGVycG9sYXRpb24pO1xufVxuXG4vLyAjIyMgcG9seWdsb3QubG9jYWxlKFtsb2NhbGVdKVxuLy9cbi8vIEdldCBvciBzZXQgbG9jYWxlLiBJbnRlcm5hbGx5LCBQb2x5Z2xvdCBvbmx5IHVzZXMgbG9jYWxlIGZvciBwbHVyYWxpemF0aW9uLlxuUG9seWdsb3QucHJvdG90eXBlLmxvY2FsZSA9IGZ1bmN0aW9uIChuZXdMb2NhbGUpIHtcbiAgaWYgKG5ld0xvY2FsZSkgdGhpcy5jdXJyZW50TG9jYWxlID0gbmV3TG9jYWxlO1xuICByZXR1cm4gdGhpcy5jdXJyZW50TG9jYWxlO1xufTtcblxuLy8gIyMjIHBvbHlnbG90LmV4dGVuZChwaHJhc2VzKVxuLy9cbi8vIFVzZSBgZXh0ZW5kYCB0byB0ZWxsIFBvbHlnbG90IGhvdyB0byB0cmFuc2xhdGUgYSBnaXZlbiBrZXkuXG4vL1xuLy8gICAgIHBvbHlnbG90LmV4dGVuZCh7XG4vLyAgICAgICBcImhlbGxvXCI6IFwiSGVsbG9cIixcbi8vICAgICAgIFwiaGVsbG9fbmFtZVwiOiBcIkhlbGxvLCAle25hbWV9XCJcbi8vICAgICB9KTtcbi8vXG4vLyBUaGUga2V5IGNhbiBiZSBhbnkgc3RyaW5nLiAgRmVlbCBmcmVlIHRvIGNhbGwgYGV4dGVuZGAgbXVsdGlwbGUgdGltZXM7XG4vLyBpdCB3aWxsIG92ZXJyaWRlIGFueSBwaHJhc2VzIHdpdGggdGhlIHNhbWUga2V5LCBidXQgbGVhdmUgZXhpc3RpbmcgcGhyYXNlc1xuLy8gdW50b3VjaGVkLlxuLy9cbi8vIEl0IGlzIGFsc28gcG9zc2libGUgdG8gcGFzcyBuZXN0ZWQgcGhyYXNlIG9iamVjdHMsIHdoaWNoIGdldCBmbGF0dGVuZWRcbi8vIGludG8gYW4gb2JqZWN0IHdpdGggdGhlIG5lc3RlZCBrZXlzIGNvbmNhdGVuYXRlZCB1c2luZyBkb3Qgbm90YXRpb24uXG4vL1xuLy8gICAgIHBvbHlnbG90LmV4dGVuZCh7XG4vLyAgICAgICBcIm5hdlwiOiB7XG4vLyAgICAgICAgIFwiaGVsbG9cIjogXCJIZWxsb1wiLFxuLy8gICAgICAgICBcImhlbGxvX25hbWVcIjogXCJIZWxsbywgJXtuYW1lfVwiLFxuLy8gICAgICAgICBcInNpZGViYXJcIjoge1xuLy8gICAgICAgICAgIFwid2VsY29tZVwiOiBcIldlbGNvbWVcIlxuLy8gICAgICAgICB9XG4vLyAgICAgICB9XG4vLyAgICAgfSk7XG4vL1xuLy8gICAgIGNvbnNvbGUubG9nKHBvbHlnbG90LnBocmFzZXMpO1xuLy8gICAgIC8vIHtcbi8vICAgICAvLyAgICduYXYuaGVsbG8nOiAnSGVsbG8nLFxuLy8gICAgIC8vICAgJ25hdi5oZWxsb19uYW1lJzogJ0hlbGxvLCAle25hbWV9Jyxcbi8vICAgICAvLyAgICduYXYuc2lkZWJhci53ZWxjb21lJzogJ1dlbGNvbWUnXG4vLyAgICAgLy8gfVxuLy9cbi8vIGBleHRlbmRgIGFjY2VwdHMgYW4gb3B0aW9uYWwgc2Vjb25kIGFyZ3VtZW50LCBgcHJlZml4YCwgd2hpY2ggY2FuIGJlIHVzZWRcbi8vIHRvIHByZWZpeCBldmVyeSBrZXkgaW4gdGhlIHBocmFzZXMgb2JqZWN0IHdpdGggc29tZSBzdHJpbmcsIHVzaW5nIGRvdFxuLy8gbm90YXRpb24uXG4vL1xuLy8gICAgIHBvbHlnbG90LmV4dGVuZCh7XG4vLyAgICAgICBcImhlbGxvXCI6IFwiSGVsbG9cIixcbi8vICAgICAgIFwiaGVsbG9fbmFtZVwiOiBcIkhlbGxvLCAle25hbWV9XCJcbi8vICAgICB9LCBcIm5hdlwiKTtcbi8vXG4vLyAgICAgY29uc29sZS5sb2cocG9seWdsb3QucGhyYXNlcyk7XG4vLyAgICAgLy8ge1xuLy8gICAgIC8vICAgJ25hdi5oZWxsbyc6ICdIZWxsbycsXG4vLyAgICAgLy8gICAnbmF2LmhlbGxvX25hbWUnOiAnSGVsbG8sICV7bmFtZX0nXG4vLyAgICAgLy8gfVxuLy9cbi8vIFRoaXMgZmVhdHVyZSBpcyB1c2VkIGludGVybmFsbHkgdG8gc3VwcG9ydCBuZXN0ZWQgcGhyYXNlIG9iamVjdHMuXG5Qb2x5Z2xvdC5wcm90b3R5cGUuZXh0ZW5kID0gZnVuY3Rpb24gKG1vcmVQaHJhc2VzLCBwcmVmaXgpIHtcbiAgZm9yRWFjaChtb3JlUGhyYXNlcywgZnVuY3Rpb24gKHBocmFzZSwga2V5KSB7XG4gICAgdmFyIHByZWZpeGVkS2V5ID0gcHJlZml4ID8gcHJlZml4ICsgJy4nICsga2V5IDoga2V5O1xuICAgIGlmICh0eXBlb2YgcGhyYXNlID09PSAnb2JqZWN0Jykge1xuICAgICAgdGhpcy5leHRlbmQocGhyYXNlLCBwcmVmaXhlZEtleSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMucGhyYXNlc1twcmVmaXhlZEtleV0gPSBwaHJhc2U7XG4gICAgfVxuICB9LCB0aGlzKTtcbn07XG5cbi8vICMjIyBwb2x5Z2xvdC51bnNldChwaHJhc2VzKVxuLy8gVXNlIGB1bnNldGAgdG8gc2VsZWN0aXZlbHkgcmVtb3ZlIGtleXMgZnJvbSBhIHBvbHlnbG90IGluc3RhbmNlLlxuLy9cbi8vICAgICBwb2x5Z2xvdC51bnNldChcInNvbWVfa2V5XCIpO1xuLy8gICAgIHBvbHlnbG90LnVuc2V0KHtcbi8vICAgICAgIFwiaGVsbG9cIjogXCJIZWxsb1wiLFxuLy8gICAgICAgXCJoZWxsb19uYW1lXCI6IFwiSGVsbG8sICV7bmFtZX1cIlxuLy8gICAgIH0pO1xuLy9cbi8vIFRoZSB1bnNldCBtZXRob2QgY2FuIHRha2UgZWl0aGVyIGEgc3RyaW5nIChmb3IgdGhlIGtleSksIG9yIGFuIG9iamVjdCBoYXNoIHdpdGhcbi8vIHRoZSBrZXlzIHRoYXQgeW91IHdvdWxkIGxpa2UgdG8gdW5zZXQuXG5Qb2x5Z2xvdC5wcm90b3R5cGUudW5zZXQgPSBmdW5jdGlvbiAobW9yZVBocmFzZXMsIHByZWZpeCkge1xuICBpZiAodHlwZW9mIG1vcmVQaHJhc2VzID09PSAnc3RyaW5nJykge1xuICAgIGRlbGV0ZSB0aGlzLnBocmFzZXNbbW9yZVBocmFzZXNdO1xuICB9IGVsc2Uge1xuICAgIGZvckVhY2gobW9yZVBocmFzZXMsIGZ1bmN0aW9uIChwaHJhc2UsIGtleSkge1xuICAgICAgdmFyIHByZWZpeGVkS2V5ID0gcHJlZml4ID8gcHJlZml4ICsgJy4nICsga2V5IDoga2V5O1xuICAgICAgaWYgKHR5cGVvZiBwaHJhc2UgPT09ICdvYmplY3QnKSB7XG4gICAgICAgIHRoaXMudW5zZXQocGhyYXNlLCBwcmVmaXhlZEtleSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBkZWxldGUgdGhpcy5waHJhc2VzW3ByZWZpeGVkS2V5XTtcbiAgICAgIH1cbiAgICB9LCB0aGlzKTtcbiAgfVxufTtcblxuLy8gIyMjIHBvbHlnbG90LmNsZWFyKClcbi8vXG4vLyBDbGVhcnMgYWxsIHBocmFzZXMuIFVzZWZ1bCBmb3Igc3BlY2lhbCBjYXNlcywgc3VjaCBhcyBmcmVlaW5nXG4vLyB1cCBtZW1vcnkgaWYgeW91IGhhdmUgbG90cyBvZiBwaHJhc2VzIGJ1dCBubyBsb25nZXIgbmVlZCB0b1xuLy8gcGVyZm9ybSBhbnkgdHJhbnNsYXRpb24uIEFsc28gdXNlZCBpbnRlcm5hbGx5IGJ5IGByZXBsYWNlYC5cblBvbHlnbG90LnByb3RvdHlwZS5jbGVhciA9IGZ1bmN0aW9uICgpIHtcbiAgdGhpcy5waHJhc2VzID0ge307XG59O1xuXG4vLyAjIyMgcG9seWdsb3QucmVwbGFjZShwaHJhc2VzKVxuLy9cbi8vIENvbXBsZXRlbHkgcmVwbGFjZSB0aGUgZXhpc3RpbmcgcGhyYXNlcyB3aXRoIGEgbmV3IHNldCBvZiBwaHJhc2VzLlxuLy8gTm9ybWFsbHksIGp1c3QgdXNlIGBleHRlbmRgIHRvIGFkZCBtb3JlIHBocmFzZXMsIGJ1dCB1bmRlciBjZXJ0YWluXG4vLyBjaXJjdW1zdGFuY2VzLCB5b3UgbWF5IHdhbnQgdG8gbWFrZSBzdXJlIG5vIG9sZCBwaHJhc2VzIGFyZSBseWluZyBhcm91bmQuXG5Qb2x5Z2xvdC5wcm90b3R5cGUucmVwbGFjZSA9IGZ1bmN0aW9uIChuZXdQaHJhc2VzKSB7XG4gIHRoaXMuY2xlYXIoKTtcbiAgdGhpcy5leHRlbmQobmV3UGhyYXNlcyk7XG59O1xuXG5cbi8vICMjIyBwb2x5Z2xvdC50KGtleSwgb3B0aW9ucylcbi8vXG4vLyBUaGUgbW9zdC11c2VkIG1ldGhvZC4gUHJvdmlkZSBhIGtleSwgYW5kIGB0YCB3aWxsIHJldHVybiB0aGVcbi8vIHBocmFzZS5cbi8vXG4vLyAgICAgcG9seWdsb3QudChcImhlbGxvXCIpO1xuLy8gICAgID0+IFwiSGVsbG9cIlxuLy9cbi8vIFRoZSBwaHJhc2UgdmFsdWUgaXMgcHJvdmlkZWQgZmlyc3QgYnkgYSBjYWxsIHRvIGBwb2x5Z2xvdC5leHRlbmQoKWAgb3Jcbi8vIGBwb2x5Z2xvdC5yZXBsYWNlKClgLlxuLy9cbi8vIFBhc3MgaW4gYW4gb2JqZWN0IGFzIHRoZSBzZWNvbmQgYXJndW1lbnQgdG8gcGVyZm9ybSBpbnRlcnBvbGF0aW9uLlxuLy9cbi8vICAgICBwb2x5Z2xvdC50KFwiaGVsbG9fbmFtZVwiLCB7bmFtZTogXCJTcGlrZVwifSk7XG4vLyAgICAgPT4gXCJIZWxsbywgU3Bpa2VcIlxuLy9cbi8vIElmIHlvdSBsaWtlLCB5b3UgY2FuIHByb3ZpZGUgYSBkZWZhdWx0IHZhbHVlIGluIGNhc2UgdGhlIHBocmFzZSBpcyBtaXNzaW5nLlxuLy8gVXNlIHRoZSBzcGVjaWFsIG9wdGlvbiBrZXkgXCJfXCIgdG8gc3BlY2lmeSBhIGRlZmF1bHQuXG4vL1xuLy8gICAgIHBvbHlnbG90LnQoXCJpX2xpa2VfdG9fd3JpdGVfaW5fbGFuZ3VhZ2VcIiwge1xuLy8gICAgICAgXzogXCJJIGxpa2UgdG8gd3JpdGUgaW4gJXtsYW5ndWFnZX0uXCIsXG4vLyAgICAgICBsYW5ndWFnZTogXCJKYXZhU2NyaXB0XCJcbi8vICAgICB9KTtcbi8vICAgICA9PiBcIkkgbGlrZSB0byB3cml0ZSBpbiBKYXZhU2NyaXB0LlwiXG4vL1xuUG9seWdsb3QucHJvdG90eXBlLnQgPSBmdW5jdGlvbiAoa2V5LCBvcHRpb25zKSB7XG4gIHZhciBwaHJhc2UsIHJlc3VsdDtcbiAgdmFyIG9wdHMgPSBvcHRpb25zID09IG51bGwgPyB7fSA6IG9wdGlvbnM7XG4gIGlmICh0eXBlb2YgdGhpcy5waHJhc2VzW2tleV0gPT09ICdzdHJpbmcnKSB7XG4gICAgcGhyYXNlID0gdGhpcy5waHJhc2VzW2tleV07XG4gIH0gZWxzZSBpZiAodHlwZW9mIG9wdHMuXyA9PT0gJ3N0cmluZycpIHtcbiAgICBwaHJhc2UgPSBvcHRzLl87XG4gIH0gZWxzZSBpZiAodGhpcy5vbk1pc3NpbmdLZXkpIHtcbiAgICB2YXIgb25NaXNzaW5nS2V5ID0gdGhpcy5vbk1pc3NpbmdLZXk7XG4gICAgcmVzdWx0ID0gb25NaXNzaW5nS2V5KGtleSwgb3B0cywgdGhpcy5jdXJyZW50TG9jYWxlLCB0aGlzLnRva2VuUmVnZXgpO1xuICB9IGVsc2Uge1xuICAgIHRoaXMud2FybignTWlzc2luZyB0cmFuc2xhdGlvbiBmb3Iga2V5OiBcIicgKyBrZXkgKyAnXCInKTtcbiAgICByZXN1bHQgPSBrZXk7XG4gIH1cbiAgaWYgKHR5cGVvZiBwaHJhc2UgPT09ICdzdHJpbmcnKSB7XG4gICAgcmVzdWx0ID0gdHJhbnNmb3JtUGhyYXNlKHBocmFzZSwgb3B0cywgdGhpcy5jdXJyZW50TG9jYWxlLCB0aGlzLnRva2VuUmVnZXgpO1xuICB9XG4gIHJldHVybiByZXN1bHQ7XG59O1xuXG5cbi8vICMjIyBwb2x5Z2xvdC5oYXMoa2V5KVxuLy9cbi8vIENoZWNrIGlmIHBvbHlnbG90IGhhcyBhIHRyYW5zbGF0aW9uIGZvciBnaXZlbiBrZXlcblBvbHlnbG90LnByb3RvdHlwZS5oYXMgPSBmdW5jdGlvbiAoa2V5KSB7XG4gIHJldHVybiBoYXModGhpcy5waHJhc2VzLCBrZXkpO1xufTtcblxuLy8gZXhwb3J0IHRyYW5zZm9ybVBocmFzZVxuUG9seWdsb3QudHJhbnNmb3JtUGhyYXNlID0gZnVuY3Rpb24gdHJhbnNmb3JtKHBocmFzZSwgc3Vic3RpdHV0aW9ucywgbG9jYWxlKSB7XG4gIHJldHVybiB0cmFuc2Zvcm1QaHJhc2UocGhyYXNlLCBzdWJzdGl0dXRpb25zLCBsb2NhbGUpO1xufTtcblxudmFyIHdlYml4UG9seWdsb3QgPSBQb2x5Z2xvdDtcblxuZnVuY3Rpb24gTG9jYWxlKGFwcCwgX3ZpZXcsIGNvbmZpZykge1xyXG4gICAgY29uZmlnID0gY29uZmlnIHx8IHt9O1xyXG4gICAgY29uc3Qgc3RvcmFnZSA9IGNvbmZpZy5zdG9yYWdlO1xyXG4gICAgbGV0IGxhbmcgPSBzdG9yYWdlID8gKHN0b3JhZ2UuZ2V0KFwibGFuZ1wiKSB8fCBcImVuXCIpIDogKGNvbmZpZy5sYW5nIHx8IFwiZW5cIik7XHJcbiAgICBmdW5jdGlvbiBzZXRMYW5nRGF0YShuYW1lLCBkYXRhLCBzaWxlbnQpIHtcclxuICAgICAgICBpZiAoZGF0YS5fX2VzTW9kdWxlKSB7XHJcbiAgICAgICAgICAgIGRhdGEgPSBkYXRhLmRlZmF1bHQ7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNvbnN0IHBjb25maWcgPSB7IHBocmFzZXM6IGRhdGEgfTtcclxuICAgICAgICBpZiAoY29uZmlnLnBvbHlnbG90KSB7XHJcbiAgICAgICAgICAgIGFwcC53ZWJpeC5leHRlbmQocGNvbmZpZywgY29uZmlnLnBvbHlnbG90KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgY29uc3QgcG9seSA9IHNlcnZpY2UucG9seWdsb3QgPSBuZXcgd2ViaXhQb2x5Z2xvdChwY29uZmlnKTtcclxuICAgICAgICBwb2x5LmxvY2FsZShuYW1lKTtcclxuICAgICAgICBzZXJ2aWNlLl8gPSBhcHAud2ViaXguYmluZChwb2x5LnQsIHBvbHkpO1xyXG4gICAgICAgIGxhbmcgPSBuYW1lO1xyXG4gICAgICAgIGlmIChzdG9yYWdlKSB7XHJcbiAgICAgICAgICAgIHN0b3JhZ2UucHV0KFwibGFuZ1wiLCBsYW5nKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKGNvbmZpZy53ZWJpeCkge1xyXG4gICAgICAgICAgICBjb25zdCBsb2NOYW1lID0gY29uZmlnLndlYml4W25hbWVdO1xyXG4gICAgICAgICAgICBpZiAobG9jTmFtZSkge1xyXG4gICAgICAgICAgICAgICAgYXBwLndlYml4LmkxOG4uc2V0TG9jYWxlKGxvY05hbWUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICghc2lsZW50KSB7XHJcbiAgICAgICAgICAgIHJldHVybiBhcHAucmVmcmVzaCgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKCk7XHJcbiAgICB9XHJcbiAgICBmdW5jdGlvbiBnZXRMYW5nKCkgeyByZXR1cm4gbGFuZzsgfVxyXG4gICAgZnVuY3Rpb24gc2V0TGFuZyhuYW1lLCBzaWxlbnQpIHtcclxuICAgICAgICAvLyBpZ25vcmUgc2V0TGFuZyBpZiBsb2FkaW5nIGJ5IHBhdGggaXMgZGlzYWJsZWRcclxuICAgICAgICBpZiAoY29uZmlnLnBhdGggPT09IGZhbHNlKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgY29uc3QgcGF0aCA9IChjb25maWcucGF0aCA/IGNvbmZpZy5wYXRoICsgXCIvXCIgOiBcIlwiKSArIG5hbWU7XHJcbiAgICAgICAgY29uc3QgZGF0YSA9IHJlcXVpcmUoXCJqZXQtbG9jYWxlcy9cIiArIHBhdGgpO1xyXG4gICAgICAgIHNldExhbmdEYXRhKG5hbWUsIGRhdGEsIHNpbGVudCk7XHJcbiAgICB9XHJcbiAgICBjb25zdCBzZXJ2aWNlID0ge1xyXG4gICAgICAgIGdldExhbmcsIHNldExhbmcsIHNldExhbmdEYXRhLCBfOiBudWxsLCBwb2x5Z2xvdDogbnVsbFxyXG4gICAgfTtcclxuICAgIGFwcC5zZXRTZXJ2aWNlKFwibG9jYWxlXCIsIHNlcnZpY2UpO1xyXG4gICAgc2V0TGFuZyhsYW5nLCB0cnVlKTtcclxufVxuXG5mdW5jdGlvbiBzaG93KHZpZXcsIGNvbmZpZywgdmFsdWUpIHtcclxuICAgIGlmIChjb25maWcudXJscykge1xyXG4gICAgICAgIHZhbHVlID0gY29uZmlnLnVybHNbdmFsdWVdIHx8IHZhbHVlO1xyXG4gICAgfVxyXG4gICAgZWxzZSBpZiAoY29uZmlnLnBhcmFtKSB7XHJcbiAgICAgICAgdmFsdWUgPSB7IFtjb25maWcucGFyYW1dOiB2YWx1ZSB9O1xyXG4gICAgfVxyXG4gICAgdmlldy5zaG93KHZhbHVlKTtcclxufVxyXG5mdW5jdGlvbiBNZW51KGFwcCwgdmlldywgY29uZmlnKSB7XHJcbiAgICBjb25zdCBmcmFtZSA9IHZpZXcuZ2V0U3ViVmlld0luZm8oKS5wYXJlbnQ7XHJcbiAgICBjb25zdCB1aSA9IHZpZXcuJCQoY29uZmlnLmlkIHx8IGNvbmZpZyk7XHJcbiAgICBsZXQgc2lsZW50ID0gZmFsc2U7XHJcbiAgICB1aS5hdHRhY2hFdmVudChcIm9uY2hhbmdlXCIsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBpZiAoIXNpbGVudCkge1xyXG4gICAgICAgICAgICBzaG93KGZyYW1lLCBjb25maWcsIHRoaXMuZ2V0VmFsdWUoKSk7XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcbiAgICB1aS5hdHRhY2hFdmVudChcIm9uYWZ0ZXJzZWxlY3RcIiwgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIGlmICghc2lsZW50KSB7XHJcbiAgICAgICAgICAgIGxldCBpZCA9IG51bGw7XHJcbiAgICAgICAgICAgIGlmICh1aS5zZXRWYWx1ZSkge1xyXG4gICAgICAgICAgICAgICAgaWQgPSB0aGlzLmdldFZhbHVlKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSBpZiAodWkuZ2V0U2VsZWN0ZWRJZCkge1xyXG4gICAgICAgICAgICAgICAgaWQgPSB1aS5nZXRTZWxlY3RlZElkKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgc2hvdyhmcmFtZSwgY29uZmlnLCBpZCk7XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcbiAgICB2aWV3Lm9uKGFwcCwgYGFwcDpyb3V0ZWAsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBsZXQgbmFtZSA9IFwiXCI7XHJcbiAgICAgICAgaWYgKGNvbmZpZy5wYXJhbSkge1xyXG4gICAgICAgICAgICBuYW1lID0gdmlldy5nZXRQYXJhbShjb25maWcucGFyYW0sIHRydWUpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgY29uc3Qgc2VnbWVudCA9IGZyYW1lLmdldFVybCgpWzFdO1xyXG4gICAgICAgICAgICBpZiAoc2VnbWVudCkge1xyXG4gICAgICAgICAgICAgICAgbmFtZSA9IHNlZ21lbnQucGFnZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAobmFtZSkge1xyXG4gICAgICAgICAgICBzaWxlbnQgPSB0cnVlO1xyXG4gICAgICAgICAgICBpZiAodWkuc2V0VmFsdWUgJiYgdWkuZ2V0VmFsdWUoKSAhPT0gbmFtZSkge1xyXG4gICAgICAgICAgICAgICAgdWkuc2V0VmFsdWUobmFtZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSBpZiAodWkuc2VsZWN0ICYmIHVpLmV4aXN0cyhuYW1lKSAmJiB1aS5nZXRTZWxlY3RlZElkKCkgIT09IG5hbWUpIHtcclxuICAgICAgICAgICAgICAgIHVpLnNlbGVjdChuYW1lKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBzaWxlbnQgPSBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxufVxuXG5jb25zdCBiYXNlaWNvbnMgPSB7XHJcbiAgICBnb29kOiBcImNoZWNrXCIsXHJcbiAgICBlcnJvcjogXCJ3YXJuaW5nXCIsXHJcbiAgICBzYXZpbmc6IFwicmVmcmVzaCBmYS1zcGluXCJcclxufTtcclxuY29uc3QgYmFzZXRleHQgPSB7XHJcbiAgICBnb29kOiBcIk9rXCIsXHJcbiAgICBlcnJvcjogXCJFcnJvclwiLFxyXG4gICAgc2F2aW5nOiBcIkNvbm5lY3RpbmcuLi5cIlxyXG59O1xyXG5mdW5jdGlvbiBTdGF0dXMoYXBwLCB2aWV3LCBjb25maWcpIHtcclxuICAgIGxldCBzdGF0dXMgPSBcImdvb2RcIjtcclxuICAgIGxldCBjb3VudCA9IDA7XHJcbiAgICBsZXQgaXNlcnJvciA9IGZhbHNlO1xyXG4gICAgbGV0IGV4cGlyZURlbGF5ID0gY29uZmlnLmV4cGlyZTtcclxuICAgIGlmICghZXhwaXJlRGVsYXkgJiYgZXhwaXJlRGVsYXkgIT09IGZhbHNlKSB7XHJcbiAgICAgICAgZXhwaXJlRGVsYXkgPSAyMDAwO1xyXG4gICAgfVxyXG4gICAgY29uc3QgdGV4dHMgPSBjb25maWcudGV4dHMgfHwgYmFzZXRleHQ7XHJcbiAgICBjb25zdCBpY29ucyA9IGNvbmZpZy5pY29ucyB8fCBiYXNlaWNvbnM7XHJcbiAgICBpZiAodHlwZW9mIGNvbmZpZyA9PT0gXCJzdHJpbmdcIikge1xyXG4gICAgICAgIGNvbmZpZyA9IHsgdGFyZ2V0OiBjb25maWcgfTtcclxuICAgIH1cclxuICAgIGZ1bmN0aW9uIHJlZnJlc2goY29udGVudCkge1xyXG4gICAgICAgIGNvbnN0IGFyZWEgPSB2aWV3LiQkKGNvbmZpZy50YXJnZXQpO1xyXG4gICAgICAgIGlmIChhcmVhKSB7XHJcbiAgICAgICAgICAgIGlmICghY29udGVudCkge1xyXG4gICAgICAgICAgICAgICAgY29udGVudCA9IFwiPGRpdiBjbGFzcz0nc3RhdHVzX1wiICtcclxuICAgICAgICAgICAgICAgICAgICBzdGF0dXMgK1xyXG4gICAgICAgICAgICAgICAgICAgIFwiJz48c3BhbiBjbGFzcz0nd2ViaXhfaWNvbiBmYS1cIiArXHJcbiAgICAgICAgICAgICAgICAgICAgaWNvbnNbc3RhdHVzXSArIFwiJz48L3NwYW4+IFwiICsgdGV4dHNbc3RhdHVzXSArIFwiPC9kaXY+XCI7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgYXJlYS5zZXRIVE1MKGNvbnRlbnQpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGZ1bmN0aW9uIHN1Y2Nlc3MoKSB7XHJcbiAgICAgICAgY291bnQtLTtcclxuICAgICAgICBzZXRTdGF0dXMoXCJnb29kXCIpO1xyXG4gICAgfVxyXG4gICAgZnVuY3Rpb24gZmFpbChlcnIpIHtcclxuICAgICAgICBjb3VudC0tO1xyXG4gICAgICAgIHNldFN0YXR1cyhcImVycm9yXCIsIGVycik7XHJcbiAgICB9XHJcbiAgICBmdW5jdGlvbiBzdGFydChwcm9taXNlKSB7XHJcbiAgICAgICAgY291bnQrKztcclxuICAgICAgICBzZXRTdGF0dXMoXCJzYXZpbmdcIik7XHJcbiAgICAgICAgaWYgKHByb21pc2UgJiYgcHJvbWlzZS50aGVuKSB7XHJcbiAgICAgICAgICAgIHByb21pc2UudGhlbihzdWNjZXNzLCBmYWlsKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBmdW5jdGlvbiBnZXRTdGF0dXMoKSB7XHJcbiAgICAgICAgcmV0dXJuIHN0YXR1cztcclxuICAgIH1cclxuICAgIGZ1bmN0aW9uIGhpZGVTdGF0dXMoKSB7XHJcbiAgICAgICAgaWYgKGNvdW50ID09PSAwKSB7XHJcbiAgICAgICAgICAgIHJlZnJlc2goXCIgXCIpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGZ1bmN0aW9uIHNldFN0YXR1cyhtb2RlLCBlcnIpIHtcclxuICAgICAgICBpZiAoY291bnQgPCAwKSB7XHJcbiAgICAgICAgICAgIGNvdW50ID0gMDtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKG1vZGUgPT09IFwic2F2aW5nXCIpIHtcclxuICAgICAgICAgICAgc3RhdHVzID0gXCJzYXZpbmdcIjtcclxuICAgICAgICAgICAgcmVmcmVzaCgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgaXNlcnJvciA9IChtb2RlID09PSBcImVycm9yXCIpO1xyXG4gICAgICAgICAgICBpZiAoY291bnQgPT09IDApIHtcclxuICAgICAgICAgICAgICAgIHN0YXR1cyA9IGlzZXJyb3IgPyBcImVycm9yXCIgOiBcImdvb2RcIjtcclxuICAgICAgICAgICAgICAgIGlmIChpc2Vycm9yKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgYXBwLmVycm9yKFwiYXBwOmVycm9yOnNlcnZlclwiLCBbZXJyLnJlc3BvbnNlVGV4dCB8fCBlcnJdKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChleHBpcmVEZWxheSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KGhpZGVTdGF0dXMsIGV4cGlyZURlbGF5KTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICByZWZyZXNoKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBmdW5jdGlvbiB0cmFjayhkYXRhKSB7XHJcbiAgICAgICAgY29uc3QgZHAgPSBhcHAud2ViaXguZHAoZGF0YSk7XHJcbiAgICAgICAgaWYgKGRwKSB7XHJcbiAgICAgICAgICAgIHZpZXcub24oZHAsIFwib25BZnRlckRhdGFTZW5kXCIsIHN0YXJ0KTtcclxuICAgICAgICAgICAgdmlldy5vbihkcCwgXCJvbkFmdGVyU2F2ZUVycm9yXCIsIChfaWQsIF9vYmosIHJlc3BvbnNlKSA9PiBmYWlsKHJlc3BvbnNlKSk7XHJcbiAgICAgICAgICAgIHZpZXcub24oZHAsIFwib25BZnRlclNhdmVcIiwgc3VjY2Vzcyk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgYXBwLnNldFNlcnZpY2UoXCJzdGF0dXNcIiwge1xyXG4gICAgICAgIGdldFN0YXR1cyxcclxuICAgICAgICBzZXRTdGF0dXMsXHJcbiAgICAgICAgdHJhY2tcclxuICAgIH0pO1xyXG4gICAgaWYgKGNvbmZpZy5yZW1vdGUpIHtcclxuICAgICAgICB2aWV3Lm9uKGFwcC53ZWJpeCwgXCJvblJlbW90ZUNhbGxcIiwgc3RhcnQpO1xyXG4gICAgfVxyXG4gICAgaWYgKGNvbmZpZy5hamF4KSB7XHJcbiAgICAgICAgdmlldy5vbihhcHAud2ViaXgsIFwib25CZWZvcmVBamF4XCIsIChfbW9kZSwgX3VybCwgX2RhdGEsIF9yZXF1ZXN0LCBfaGVhZGVycywgX2ZpbGVzLCBwcm9taXNlKSA9PiB7XHJcbiAgICAgICAgICAgIHN0YXJ0KHByb21pc2UpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgaWYgKGNvbmZpZy5kYXRhKSB7XHJcbiAgICAgICAgdHJhY2soY29uZmlnLmRhdGEpO1xyXG4gICAgfVxyXG59XG5cbmZ1bmN0aW9uIFRoZW1lKGFwcCwgX3ZpZXcsIGNvbmZpZykge1xyXG4gICAgY29uZmlnID0gY29uZmlnIHx8IHt9O1xyXG4gICAgY29uc3Qgc3RvcmFnZSA9IGNvbmZpZy5zdG9yYWdlO1xyXG4gICAgbGV0IHRoZW1lID0gc3RvcmFnZSA/XHJcbiAgICAgICAgKHN0b3JhZ2UuZ2V0KFwidGhlbWVcIikgfHwgXCJmbGF0LWRlZmF1bHRcIilcclxuICAgICAgICA6XHJcbiAgICAgICAgICAgIChjb25maWcudGhlbWUgfHwgXCJmbGF0LWRlZmF1bHRcIik7XHJcbiAgICBjb25zdCBzZXJ2aWNlID0ge1xyXG4gICAgICAgIGdldFRoZW1lKCkgeyByZXR1cm4gdGhlbWU7IH0sXHJcbiAgICAgICAgc2V0VGhlbWUobmFtZSwgc2lsZW50KSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHBhcnRzID0gbmFtZS5zcGxpdChcIi1cIik7XHJcbiAgICAgICAgICAgIGNvbnN0IGxpbmtzID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoXCJsaW5rXCIpO1xyXG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxpbmtzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBsbmFtZSA9IGxpbmtzW2ldLmdldEF0dHJpYnV0ZShcInRpdGxlXCIpO1xyXG4gICAgICAgICAgICAgICAgaWYgKGxuYW1lKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGxuYW1lID09PSBuYW1lIHx8IGxuYW1lID09PSBwYXJ0c1swXSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsaW5rc1tpXS5kaXNhYmxlZCA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGlua3NbaV0uZGlzYWJsZWQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBhcHAud2ViaXguc2tpbi5zZXQocGFydHNbMF0pO1xyXG4gICAgICAgICAgICAvLyByZW1vdmUgb2xkIGNzc1xyXG4gICAgICAgICAgICBhcHAud2ViaXguaHRtbC5yZW1vdmVDc3MoZG9jdW1lbnQuYm9keSwgXCJ0aGVtZS1cIiArIHRoZW1lKTtcclxuICAgICAgICAgICAgLy8gYWRkIG5ldyBjc3NcclxuICAgICAgICAgICAgYXBwLndlYml4Lmh0bWwuYWRkQ3NzKGRvY3VtZW50LmJvZHksIFwidGhlbWUtXCIgKyBuYW1lKTtcclxuICAgICAgICAgICAgdGhlbWUgPSBuYW1lO1xyXG4gICAgICAgICAgICBpZiAoc3RvcmFnZSkge1xyXG4gICAgICAgICAgICAgICAgc3RvcmFnZS5wdXQoXCJ0aGVtZVwiLCBuYW1lKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoIXNpbGVudCkge1xyXG4gICAgICAgICAgICAgICAgYXBwLnJlZnJlc2goKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH07XHJcbiAgICBhcHAuc2V0U2VydmljZShcInRoZW1lXCIsIHNlcnZpY2UpO1xyXG4gICAgc2VydmljZS5zZXRUaGVtZSh0aGVtZSwgdHJ1ZSk7XHJcbn1cblxuZnVuY3Rpb24gY29weVBhcmFtcyhkYXRhLCB1cmwsIHJvdXRlKSB7XHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHJvdXRlLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgZGF0YVtyb3V0ZVtpXV0gPSB1cmxbaSArIDFdID8gdXJsW2kgKyAxXS5wYWdlIDogXCJcIjtcclxuICAgIH1cclxufVxyXG5mdW5jdGlvbiBVcmxQYXJhbShhcHAsIHZpZXcsIGNvbmZpZykge1xyXG4gICAgY29uc3Qgcm91dGUgPSBjb25maWcucm91dGUgfHwgY29uZmlnO1xyXG4gICAgY29uc3QgZGF0YSA9IHt9O1xyXG4gICAgdmlldy5vbihhcHAsIFwiYXBwOnVybGNoYW5nZVwiLCBmdW5jdGlvbiAoc3Vidmlldywgc2VnbWVudCkge1xyXG4gICAgICAgIGlmICh2aWV3ID09PSBzdWJ2aWV3KSB7XHJcbiAgICAgICAgICAgIGNvcHlQYXJhbXMoZGF0YSwgc2VnbWVudC5zdWJ1cmwoKSwgcm91dGUpO1xyXG4gICAgICAgICAgICBzZWdtZW50LnNpemUocm91dGUubGVuZ3RoICsgMSk7XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcbiAgICBjb25zdCBvcyA9IHZpZXcuc2V0UGFyYW07XHJcbiAgICBjb25zdCBvZyA9IHZpZXcuZ2V0UGFyYW07XHJcbiAgICB2aWV3LnNldFBhcmFtID0gZnVuY3Rpb24gKG5hbWUsIHZhbHVlLCBzaG93KSB7XHJcbiAgICAgICAgY29uc3QgaW5kZXggPSByb3V0ZS5pbmRleE9mKG5hbWUpO1xyXG4gICAgICAgIGlmIChpbmRleCA+PSAwKSB7XHJcbiAgICAgICAgICAgIGRhdGFbbmFtZV0gPSB2YWx1ZTtcclxuICAgICAgICAgICAgdGhpcy5fc2VnbWVudC51cGRhdGUoXCJcIiwgdmFsdWUsIGluZGV4ICsgMSk7XHJcbiAgICAgICAgICAgIGlmIChzaG93KSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdmlldy5zaG93KG51bGwpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICByZXR1cm4gb3MuY2FsbCh0aGlzLCBuYW1lLCB2YWx1ZSwgc2hvdyk7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuICAgIHZpZXcuZ2V0UGFyYW0gPSBmdW5jdGlvbiAoa2V5LCBtb2RlKSB7XHJcbiAgICAgICAgY29uc3QgdmFsID0gZGF0YVtrZXldO1xyXG4gICAgICAgIGlmICh0eXBlb2YgdmFsICE9PSBcInVuZGVmaW5lZFwiKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB2YWw7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBvZy5jYWxsKHRoaXMsIGtleSwgbW9kZSk7XHJcbiAgICB9O1xyXG4gICAgY29weVBhcmFtcyhkYXRhLCB2aWV3LmdldFVybCgpLCByb3V0ZSk7XHJcbn1cblxuZnVuY3Rpb24gVXNlcihhcHAsIF92aWV3LCBjb25maWcpIHtcclxuICAgIGNvbmZpZyA9IGNvbmZpZyB8fCB7fTtcclxuICAgIGNvbnN0IGxvZ2luID0gY29uZmlnLmxvZ2luIHx8IFwiL2xvZ2luXCI7XHJcbiAgICBjb25zdCBsb2dvdXQgPSBjb25maWcubG9nb3V0IHx8IFwiL2xvZ291dFwiO1xyXG4gICAgY29uc3QgYWZ0ZXJMb2dpbiA9IGNvbmZpZy5hZnRlckxvZ2luIHx8IGFwcC5jb25maWcuc3RhcnQ7XHJcbiAgICBjb25zdCBhZnRlckxvZ291dCA9IGNvbmZpZy5hZnRlckxvZ291dCB8fCBcIi9sb2dpblwiO1xyXG4gICAgY29uc3QgcGluZyA9IGNvbmZpZy5waW5nIHx8IDUgKiA2MCAqIDEwMDA7XHJcbiAgICBjb25zdCBtb2RlbCA9IGNvbmZpZy5tb2RlbDtcclxuICAgIGxldCB1c2VyID0gY29uZmlnLnVzZXI7XHJcbiAgICBjb25zdCBzZXJ2aWNlID0ge1xyXG4gICAgICAgIGdldFVzZXIoKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB1c2VyO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgZ2V0U3RhdHVzKHNlcnZlcikge1xyXG4gICAgICAgICAgICBpZiAoIXNlcnZlcikge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHVzZXIgIT09IG51bGw7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIG1vZGVsLnN0YXR1cygpLmNhdGNoKCgpID0+IG51bGwpLnRoZW4oZGF0YSA9PiB7XHJcbiAgICAgICAgICAgICAgICB1c2VyID0gZGF0YTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBsb2dpbihuYW1lLCBwYXNzKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBtb2RlbC5sb2dpbihuYW1lLCBwYXNzKS50aGVuKGRhdGEgPT4ge1xyXG4gICAgICAgICAgICAgICAgdXNlciA9IGRhdGE7XHJcbiAgICAgICAgICAgICAgICBpZiAoIWRhdGEpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJBY2Nlc3MgZGVuaWVkXCIpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgYXBwLmNhbGxFdmVudChcImFwcDp1c2VyOmxvZ2luXCIsIFt1c2VyXSk7XHJcbiAgICAgICAgICAgICAgICBhcHAuc2hvdyhhZnRlckxvZ2luKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBsb2dvdXQoKSB7XHJcbiAgICAgICAgICAgIHVzZXIgPSBudWxsO1xyXG4gICAgICAgICAgICByZXR1cm4gbW9kZWwubG9nb3V0KCkudGhlbihyZXMgPT4ge1xyXG4gICAgICAgICAgICAgICAgYXBwLmNhbGxFdmVudChcImFwcDp1c2VyOmxvZ291dFwiLCBbXSk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVzO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG4gICAgZnVuY3Rpb24gY2FuTmF2aWdhdGUodXJsLCBvYmopIHtcclxuICAgICAgICBpZiAodXJsID09PSBsb2dvdXQpIHtcclxuICAgICAgICAgICAgc2VydmljZS5sb2dvdXQoKTtcclxuICAgICAgICAgICAgb2JqLnJlZGlyZWN0ID0gYWZ0ZXJMb2dvdXQ7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYgKHVybCAhPT0gbG9naW4gJiYgIXNlcnZpY2UuZ2V0U3RhdHVzKCkpIHtcclxuICAgICAgICAgICAgb2JqLnJlZGlyZWN0ID0gbG9naW47XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgYXBwLnNldFNlcnZpY2UoXCJ1c2VyXCIsIHNlcnZpY2UpO1xyXG4gICAgYXBwLmF0dGFjaEV2ZW50KGBhcHA6Z3VhcmRgLCBmdW5jdGlvbiAodXJsLCBfJHJvb3QsIG9iaikge1xyXG4gICAgICAgIGlmIChjb25maWcucHVibGljICYmIGNvbmZpZy5wdWJsaWModXJsKSkge1xyXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHR5cGVvZiB1c2VyID09PSBcInVuZGVmaW5lZFwiKSB7XHJcbiAgICAgICAgICAgIG9iai5jb25maXJtID0gc2VydmljZS5nZXRTdGF0dXModHJ1ZSkudGhlbigoKSA9PiBjYW5OYXZpZ2F0ZSh1cmwsIG9iaikpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gY2FuTmF2aWdhdGUodXJsLCBvYmopO1xyXG4gICAgfSk7XHJcbiAgICBpZiAocGluZykge1xyXG4gICAgICAgIHNldEludGVydmFsKCgpID0+IHNlcnZpY2UuZ2V0U3RhdHVzKHRydWUpLCBwaW5nKTtcclxuICAgIH1cclxufVxuXG4vKlxyXG5NSVQgTGljZW5zZVxyXG5Db3B5cmlnaHQgKGMpIDIwMTkgWEIgU29mdHdhcmVcclxuKi9cclxubGV0IHdlYml4ID0gd2luZG93LndlYml4O1xyXG5pZiAod2ViaXgpIHtcclxuICAgIHBhdGNoKHdlYml4KTtcclxufVxyXG5jb25zdCBwbHVnaW5zID0ge1xyXG4gICAgVW5sb2FkR3VhcmQsIExvY2FsZSwgTWVudSwgVGhlbWUsIFVzZXIsIFN0YXR1cywgVXJsUGFyYW1cclxufTtcclxuY29uc3QgZXJyb3JzID0geyBOYXZpZ2F0aW9uQmxvY2tlZCB9O1xyXG5jb25zdCB3ID0gd2luZG93O1xyXG5pZiAoIXcuUHJvbWlzZSkge1xyXG4gICAgdy5Qcm9taXNlID0gdy53ZWJpeC5wcm9taXNlO1xyXG59XG5cbmV4cG9ydCB7IHBsdWdpbnMsIGVycm9ycywgSmV0QXBwLCBKZXRWaWV3LCBIYXNoUm91dGVyLCBTdG9yZVJvdXRlciwgVXJsUm91dGVyLCBFbXB0eVJvdXRlciwgU3ViUm91dGVyIH07XG4vLyMgc291cmNlTWFwcGluZ1VSTD1qZXQuanMubWFwXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9ub2RlX21vZHVsZXMvd2ViaXgtamV0L2Rpc3QvZXM2L2pldC5qcyIsImltcG9ydCB7IEpldFZpZXcgfSBmcm9tIFwid2ViaXgtamV0XCI7XG5pbXBvcnQgeyBwYWNrYWdlcyB9IGZyb20gXCIuLi8uLi9zZXJ2aWNlcy9wYWNrYWdlc1wiO1xuXG5jb25zdCBTVEFUVVNfSU5TVEFMTEVEID0gMztcblxuZXhwb3J0IGNsYXNzIEV4dGVybmFsVmlldyBleHRlbmRzIEpldFZpZXcge1xuICAgIGNvbnN0cnVjdG9yKGFwcCwgbmFtZSwgdGFyZ2V0VXJsLCByZXF1aXJlZFBhY2thZ2VzKSB7XG4gICAgICAgIHN1cGVyKGFwcCwgbmFtZSk7XG5cbiAgICAgICAgdGhpcy50YXJnZXRVcmwgPSB0YXJnZXRVcmwgfHwgXCIvXCI7XG4gICAgICAgIHRoaXMucmVxdWlyZWRQYWNrYWdlcyA9IHJlcXVpcmVkUGFja2FnZXMgfHwge307IC8vIHJlcXVpcmVkIHBhY2thZ2VzIGFzIG5hbWU6IGdpdF91cmwgcGFpcnNcbiAgICB9XG5cbiAgICBjb25maWcoKSB7XG4gICAgICAgIGNvbnN0IHNlbGYgPSB0aGlzO1xuICAgICAgICBjb25zdCBpZnJhbWUgPSB7XG4gICAgICAgICAgICB2aWV3OiBcImlmcmFtZVwiLFxuICAgICAgICAgICAgbG9jYWxJZDogXCJpZnJhbWUtZXh0ZXJuYWxcIixcbiAgICAgICAgICAgIG9uOiB7XG4gICAgICAgICAgICAgICAgb25BZnRlckxvYWQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuaGlkZVByb2dyZXNzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmhpZGVQcm9ncmVzcygpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZW5hYmxlKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuXG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICByb3dzOiBbe1xuICAgICAgICAgICAgICAgIGxvY2FsSWQ6IFwiaW5zdGFsbC1wYWNrYWdlc1wiLFxuICAgICAgICAgICAgICAgIGhpZGRlbjogdHJ1ZSxcbiAgICAgICAgICAgICAgICBjb2xzOiBbXG4gICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxvY2FsSWQ6IFwicmVxdWlyZWRfcGFja2FnZXNfZGl2XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICB2aWV3OiBcInRlbXBsYXRlXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBhdXRvaGVpZ2h0OiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgICAgICAgICB2aWV3OiBcImJ1dHRvblwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgbG9jYWxJZDogXCJpbnN0YWxsX2J0blwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU6IFwiSW5zdGFsbCByZXF1aXJlZCBwYWNrYWdlc1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgY3NzOiBcIndlYml4X3ByaW1hcnlcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIGhlaWdodDogNTAsXG4gICAgICAgICAgICAgICAgICAgICAgICBjbGljazogc2VsZi5pbnN0YWxsUmVxdWlyZWRQYWNrYWdlcy5iaW5kKHNlbGYpXG4gICAgICAgICAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZpZXc6IFwiYnV0dG9uXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBsb2NhbElkOiBcImdvX3RvX3BhY2thZ2VzX2J0blwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU6IFwiR28gdG8gcGFja2FnZXMgYW5kIGluc3RhbGwgdGhlbSBtYW51YWxseVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgY3NzOiBcIndlYml4X3ByaW1hcnlcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIGhlaWdodDogNTAsXG4gICAgICAgICAgICAgICAgICAgICAgICBjbGljazogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuJHNjb3BlLnNob3coXCIvbWFpbi9wYWNrYWdlc1wiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgIH0sIGlmcmFtZV1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIGluc3RhbGxSZXF1aXJlZFBhY2thZ2VzKCkge1xuICAgICAgICBsZXQgcHJvbWlzZXMgPSBPYmplY3QudmFsdWVzKHRoaXMucGFja2FnZXNUb0luc3RhbGwpLm1hcCgocGF0aCkgPT4ge1xuICAgICAgICAgICAgLy8gYWRkIGJ5IGdpdCB1cmxcbiAgICAgICAgICAgIHJldHVybiBwYWNrYWdlcy5hZGQobnVsbCwgcGF0aCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHRoaXMuaW5zdGFsbEJ1dHRvbi5kaXNhYmxlKCk7XG4gICAgICAgIFByb21pc2UuYWxsKHByb21pc2VzKS50aGVuKCgpID0+IHtcbiAgICAgICAgICAgIHdlYml4Lm1lc3NhZ2UoeyB0eXBlOiBcInN1Y2Nlc3NcIiwgdGV4dDogXCJBbGwgcmVxdWlyZWQgcGFja2FnZXMgaW5zdGFsbGVkIHN1Y2Nlc3NmdWxseSwgcGFnZSB3aWxsIGJlIHJlbG9hZGVkIGluIDIgc2Vjb25kc1wiIH0pO1xuICAgICAgICAgICAgc2V0SW50ZXJ2YWwoKCkgPT4gd2luZG93LmxvY2F0aW9uLnJlbG9hZCh0cnVlKSwgMjAwMCk7XG4gICAgICAgIH0pLmNhdGNoKCgpID0+IHtcbiAgICAgICAgICAgIHdlYml4Lm1lc3NhZ2UoeyB0eXBlOiBcImVycm9yXCIsIHRleHQ6IFwiQW4gZXJyb3Igb2NjdXJyZWQsIHBsZWFzZSB0cnkgaW5zdGFsbGluZyBmcm9tIHBhY2thZ2VzIGZvciBtb3JlIGRldGFpbHNcIiB9KTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgc2hvd0lmcmFtZSgpIHtcbiAgICAgICAgdGhpcy5leHRlcm5hbElmcmFtZS5zaG93KCk7XG4gICAgICAgIHRoaXMuZXh0ZXJuYWxJZnJhbWUuc2hvd1Byb2dyZXNzKHsgdHlwZTogXCJpY29uXCIgfSk7XG4gICAgICAgIHRoaXMuZXh0ZXJuYWxJZnJhbWUubG9hZCh0aGlzLnRhcmdldFVybCk7XG4gICAgfVxuXG4gICAgaW5pdCh2aWV3KSB7XG4gICAgICAgIHRoaXMuZXh0ZXJuYWxJZnJhbWUgPSB0aGlzLiQkKFwiaWZyYW1lLWV4dGVybmFsXCIpO1xuICAgICAgICB0aGlzLmV4dGVybmFsSWZyYW1lLmRpc2FibGUoKTtcbiAgICAgICAgd2ViaXguZXh0ZW5kKHRoaXMuZXh0ZXJuYWxJZnJhbWUsIHdlYml4LlByb2dyZXNzQmFyKTtcblxuICAgICAgICB0aGlzLnBhY2thZ2VOYW1lcyA9IE9iamVjdC5rZXlzKHRoaXMucmVxdWlyZWRQYWNrYWdlcyk7IC8vIG9ubHkgbmFtZXNcblxuICAgICAgICBpZiAoIXRoaXMucGFja2FnZU5hbWVzLmxlbmd0aCkge1xuICAgICAgICAgICAgdGhpcy5zaG93SWZyYW1lKCk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnJlcXVpcmVkUGFja2FnZXNEaXYgPSB0aGlzLiQkKFwicmVxdWlyZWRfcGFja2FnZXNfZGl2XCIpO1xuICAgICAgICB0aGlzLmluc3RhbGxQYWNrYWdlQ29udGFpbmVyID0gdGhpcy4kJChcImluc3RhbGwtcGFja2FnZXNcIik7XG4gICAgICAgIHRoaXMuaW5zdGFsbEJ1dHRvbiA9IHRoaXMuJCQoXCJpbnN0YWxsX2J0blwiKTtcblxuICAgICAgICAvLyBjaGVjayB3aGljaCBwYWNrYWdlcyB0byBpbnN0YWxsXG4gICAgICAgIHRoaXMucGFja2FnZXNUb0luc3RhbGwgPSB7fTtcbiAgICAgICAgLy8gdHJ5IHRvIGdldCBpbmZvIGFib3V0IHJlcXVpcmVkIHBhY2thZ2VzXG4gICAgICAgIC8vIGlmIGFueSBpcyBhbHJlYWR5IHJlZ2lzdGVyZWQgYW5kIGluc3RhbGxlZCwgdGhlbiBqdXN0IGlnbm9yZSBpdFxuICAgICAgICBwYWNrYWdlcy5nZXRTdGF0dXModGhpcy5wYWNrYWdlTmFtZXMpLnRoZW4oZGF0YSA9PiB7XG4gICAgICAgICAgICBjb25zdCBwYWNrYWdlU3RhdGVzID0gZGF0YS5qc29uKCk7XG5cbiAgICAgICAgICAgIC8vIG5vdyBnbyBvdmVyIHJlcXVpcmVkIHBhY2thZ2VzXG4gICAgICAgICAgICBmb3IgKGxldCBuYW1lIG9mIHRoaXMucGFja2FnZU5hbWVzKSB7XG4gICAgICAgICAgICAgICAgLy8gY2hlY2sgaWYgYSByZXF1aXJlZCBwYWNrYWdlIGlzIHJlZ2lzdGVyZWQgYW5kIGluc3RhbGxlZFxuICAgICAgICAgICAgICAgIGlmIChwYWNrYWdlU3RhdGVzW25hbWVdID09IFNUQVRVU19JTlNUQUxMRUQpIHtcbiAgICAgICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgdGhpcy5wYWNrYWdlc1RvSW5zdGFsbFtuYW1lXSA9IHRoaXMucmVxdWlyZWRQYWNrYWdlc1tuYW1lXTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy8gY2hlY2sgcGFja2FnZXMgdG8gYmUgaW5zdGFsbGVkIGFnYWluIGlmIHN0aWxsIG5lZWQgdG8gaW5zdGFsbCBhbnkgb2YgdGhlbVxuICAgICAgICAgICAgY29uc3QgcGFja2FnZU5hbWVzVG9JbnN0YWxsID0gT2JqZWN0LmtleXModGhpcy5wYWNrYWdlc1RvSW5zdGFsbCk7XG4gICAgICAgICAgICBpZiAocGFja2FnZU5hbWVzVG9JbnN0YWxsLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgIHRoaXMuaW5zdGFsbFBhY2thZ2VDb250YWluZXIuc2hvdygpO1xuICAgICAgICAgICAgICAgIHRoaXMuZXh0ZXJuYWxJZnJhbWUuaGlkZSgpO1xuXG4gICAgICAgICAgICAgICAgY29uc3QgbmFtZXMgPSBwYWNrYWdlTmFtZXNUb0luc3RhbGwuam9pbihcIiwgXCIpO1xuICAgICAgICAgICAgICAgIHRoaXMucmVxdWlyZWRQYWNrYWdlc0Rpdi5zZXRIVE1MKFxuICAgICAgICAgICAgICAgICAgICBgPGRpdiBzdHlsZT0nd2lkdGg6YXV0bzt0ZXh0LWFsaWduOmNlbnRlcic+PGgzPllvdSBuZWVkIHRvIGluc3RhbGwgdGhlIGZvbGxvd2luZyByZXF1aXJlZCBwYWNrYWdlczogJHtuYW1lc308aDMvPjwvZGl2PmBcbiAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLmluc3RhbGxQYWNrYWdlQ29udGFpbmVyLmhpZGUoKTtcbiAgICAgICAgICAgICAgICB0aGlzLnNob3dJZnJhbWUoKVxuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG5cbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NvdXJjZXMvdmlld3MvZXh0ZXJuYWwvaW5kZXguanMiLCJjb25zdCBhamF4ID0gd2ViaXguYWpheCgpLmhlYWRlcnMoeyBcIkNvbnRlbnQtVHlwZVwiOiBcImFwcGxpY2F0aW9uL2pzb25cIiB9KTtcblxuZXhwb3J0IGNsYXNzIFNlcnZpY2Uge1xuICAgIGNvbnN0cnVjdG9yKGJhc2VVcmwpIHtcbiAgICAgICAgdGhpcy5iYXNlVXJsID0gYmFzZVVybDtcbiAgICB9XG5cbiAgICBqb2luVXJsKHVybCkge1xuICAgICAgICBpZiAodGhpcy5iYXNlVXJsKSB7XG4gICAgICAgICAgICByZXR1cm4gYCR7dGhpcy5iYXNlVXJsfS8ke3VybH1gO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB1cmw7XG4gICAgfVxuXG4gICAgY2FsbChtZXRob2QsIHVybCwgYXJncykge1xuICAgICAgICBtZXRob2QgPSBtZXRob2QudG9Mb3dlckNhc2UoKTtcbiAgICAgICAgdXJsID0gdGhpcy5qb2luVXJsKHVybCk7XG5cbiAgICAgICAgaWYgKGFyZ3MpIHtcbiAgICAgICAgICAgIGFyZ3MgPSB7IGFyZ3M6IGFyZ3MgfTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGFyZ3MgPSB7fTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChtZXRob2QgPT09IFwiZ2V0XCIpIHtcbiAgICAgICAgICAgIHJldHVybiBhamF4LmdldCh1cmwsIGFyZ3MpO1xuICAgICAgICB9IGVsc2UgaWYgKG1ldGhvZCA9PSBcInBvc3RcIikge1xuICAgICAgICAgICAgcmV0dXJuIGFqYXgucG9zdCh1cmwsIGFyZ3MpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhyb3cgVmFsdWVFcnJvcihgJHttZXRob2R9IGlzIG5vdCBzdXBwb3J0ZWRgKTtcbiAgICB9XG5cbiAgICBnZXRDYWxsKHVybCwgYXJncykge1xuICAgICAgICByZXR1cm4gdGhpcy5jYWxsKFwiZ2V0XCIsIHVybCwgYXJncyk7XG4gICAgfVxuXG4gICAgcG9zdENhbGwodXJsLCBhcmdzKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmNhbGwoXCJwb3N0XCIsIHVybCwgYXJncyk7XG4gICAgfVxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc291cmNlcy9jb21tb24vYXBpLmpzIiwiaW1wb3J0IHsgSmV0VmlldyB9IGZyb20gXCJ3ZWJpeC1qZXRcIjtcblxuaW1wb3J0IHsgYW5zaVVwIH0gZnJvbSBcIi4uLy4uL2NvbW1vbi9jb2xvcnNcIjtcblxuZXhwb3J0IGNsYXNzIEVycm9yVmlldyBleHRlbmRzIEpldFZpZXcge1xuICAgIGNvbmZpZygpIHtcbiAgICAgICAgY29uc3QgbWVzc2FnZSA9IHtcbiAgICAgICAgICAgIHZpZXc6IFwidGVtcGxhdGVcIixcbiAgICAgICAgICAgIGlkOiBcImVycm9yX3RlbXBsYXRlXCIsXG4gICAgICAgICAgICB0ZW1wbGF0ZTogXCJcIixcbiAgICAgICAgICAgIHNjcm9sbDogXCJ4eVwiXG4gICAgICAgIH07XG5cbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHZpZXc6IFwid2luZG93XCIsXG4gICAgICAgICAgICBoZWFkOiBcIkVycm9yXCIsXG4gICAgICAgICAgICBtb2RhbDogdHJ1ZSxcbiAgICAgICAgICAgIHdpZHRoOiAxMTAwLFxuICAgICAgICAgICAgaGVpZ2h0OiA3MDAsXG4gICAgICAgICAgICBwb3NpdGlvbjogXCJjZW50ZXJcIixcbiAgICAgICAgICAgIGJvZHk6IHtcbiAgICAgICAgICAgICAgICByb3dzOiBbXG4gICAgICAgICAgICAgICAgICAgIG1lc3NhZ2UsXG4gICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZpZXc6IFwiYnV0dG9uXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZTogXCJPS1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgY3NzOiBcIndlYml4X3ByaW1hcnlcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIGNsaWNrOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5nZXRUb3BQYXJlbnRWaWV3KCkuaGlkZSgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgaW5pdCgpIHtcbiAgICAgICAgdGhpcy5tZXNzYWdlID0gJCQoXCJlcnJvcl90ZW1wbGF0ZVwiKTtcbiAgICB9XG5cbiAgICBzaG93RXJyb3IobWVzc2FnZSwgaGVhZCkge1xuICAgICAgICB0aGlzLm1lc3NhZ2Uuc2V0SFRNTChgPHA+JHthbnNpVXAuYW5zaV90b19odG1sKG1lc3NhZ2UpfTwvcD5gKTtcbiAgICAgICAgaWYgKGhlYWQpIHtcbiAgICAgICAgICAgIHRoaXMubWVzc2FnZS5nZXRIZWFkKCkuc2V0SFRNTChoZWFkKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuZ2V0Um9vdCgpLnNob3coKTtcbiAgICB9XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zb3VyY2VzL3ZpZXdzL2Vycm9ycy9kaWFsb2cuanMiLCJpbXBvcnQgeyBTZXJ2aWNlIH0gZnJvbSBcIi4uL2NvbW1vbi9hcGlcIjtcblxuY29uc3QgQkFTRV9VUkwgPSBcIi96ZXJvYm90L2FkbWluL2FjdG9ycy9oZWFsdGhcIjtcblxuY2xhc3MgSGVhbHRoU2VydmljZSBleHRlbmRzIFNlcnZpY2Uge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICBzdXBlcihCQVNFX1VSTCk7XG4gICAgfVxuXG4gICAgZ2V0RGlza1NwYWNlKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5nZXRDYWxsKFwiZ2V0X2Rpc2tfc3BhY2VcIik7XG4gICAgfVxuXG4gICAgZ2V0SGVhbHRoKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5nZXRDYWxsKFwiaGVhbHRoXCIpO1xuICAgIH1cblxuICAgIGdldElkZW50aXR5KCkge1xuICAgICAgICByZXR1cm4gdGhpcy5nZXRDYWxsKFwiZ2V0X2lkZW50aXR5XCIpO1xuICAgIH1cblxuICAgIGdldE5ldHdvcmtJbmZvKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5nZXRDYWxsKFwibmV0d29ya19pbmZvXCIpO1xuICAgIH1cblxuICAgIGdldEpzeFZlcnNpb24oKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmdldENhbGwoXCJqc3hfdmVyc2lvblwiKTtcbiAgICB9XG5cbiAgICBnZXRSdW5uaW5nUHJvY2Vzc2VzKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5nZXRDYWxsKFwiZ2V0X3J1bm5pbmdfcHJvY2Vzc2VzXCIpO1xuICAgIH1cblxuICAgIGdldFJ1bm5pbmdQb3J0cygpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0Q2FsbChcImdldF9ydW5uaW5nX3BvcnRzXCIpO1xuICAgIH1cblxuICAgIGtpbGxQcm9jZXNzZXNCeVBpZChpZHMpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0Q2FsbCgna2lsbF9wcm9jZXNzZXNfYnlfcGlkJywgaWRzKVxuICAgIH1cblxuICAgIGtpbGxQcm9jZXNzZXNCeVBvcnQocG9ydHMpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0Q2FsbCgna2lsbF9wcm9jZXNzZXNfYnlfcG9ydCcsIHBvcnRzKVxuICAgIH1cblxuICAgIGdldFByb2Nlc3NEZXRhaWxzKHBpZCkge1xuICAgICAgICByZXR1cm4gdGhpcy5nZXRDYWxsKCdnZXRfcHJvY2Vzc19kZXRhaWxzJywgcGlkKVxuICAgIH1cbn1cblxuZXhwb3J0IGNvbnN0IGhlYWx0aCA9IG5ldyBIZWFsdGhTZXJ2aWNlKCk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zb3VyY2VzL3NlcnZpY2VzL2hlYWx0aC5qcyIsIlxuZXhwb3J0IGNvbnN0IE1BWF9NU0dfTEVOID0gMTAwO1xuZXhwb3J0IGNvbnN0IExFVkVMUyA9IHtcbiAgICA1MDogXCJDUklUSUNBTFwiLFxuICAgIDQwOiBcIkVSUk9SXCIsXG4gICAgMzA6IFwiV0FSTklOR1wiLFxuICAgIDIwOiBcIklORk9cIixcbiAgICAxNTogXCJTVERPVVRcIixcbiAgICAxMDogXCJERUJVR1wiXG59O1xuXG5leHBvcnQgY29uc3QgU1RBVEVTID0gW1xuICAgICdDTE9TRUQnLFxuICAgICdORVcnLFxuICAgICdPUEVOJyxcbiAgICAnUkVPUEVOJ1xuXVxuXG5leHBvcnQgY29uc3QgVFlQRVMgPSBbXG4gICAgJ0JVRycsXG4gICAgJ1FVRVNUSU9OJyxcbiAgICAnRVZFTlRfU1lTVEVNJyxcbiAgICAnRVZFTlRfTU9OSVRPUicsXG4gICAgJ0VWRU5UX09QRVJBVE9SJyxcbl1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NvdXJjZXMvdmlld3MvYWxlcnRzL2RhdGEuanMiLCJleHBvcnQgY29uc3QgZGF0ZUZvcm1hdCA9IFwiJVktJW0tJWQgJUc6JWk6JXNcIjtcblxuZXhwb3J0IGNvbnN0IHdlYml4RGF0ZUZvcm1hdHRlciA9IHdlYml4LkRhdGUuZGF0ZVRvU3RyKGRhdGVGb3JtYXQpO1xuXG5leHBvcnQgY29uc3QgZGF0ZUZvcm1hdHRlciA9IGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgIC8vIGZvcm1hdCBlcG9jaCB0aW1lc3RhbXBzXG4gICAgaWYgKHZhbHVlIGluc3RhbmNlb2YgU3RyaW5nKSB7XG4gICAgICAgIHZhbHVlID0gcGFyc2VJbnQodmFsdWUpO1xuICAgIH1cblxuICAgIHJldHVybiB3ZWJpeERhdGVGb3JtYXR0ZXIobmV3IERhdGUodmFsdWUgKiAxMDAwKSk7XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zb3VyY2VzL2NvbW1vbi9mb3JtYXR0ZXJzLmpzIiwiaW1wb3J0IHsgSmV0VmlldyB9IGZyb20gXCJ3ZWJpeC1qZXRcIjtcblxuaW1wb3J0IHsgYW5zaVVwIH0gZnJvbSBcIi4uLy4uL2NvbW1vbi9jb2xvcnNcIjtcbmltcG9ydCB7IExFVkVMUywgTUFYX01TR19MRU4sIFNUQVRFUywgVFlQRVMgfSBmcm9tIFwiLi9kYXRhXCI7XG5pbXBvcnQgeyBkYXRlRm9ybWF0dGVyIH0gZnJvbSBcIi4uLy4uL2NvbW1vbi9mb3JtYXR0ZXJzXCI7XG5pbXBvcnQgeyBhbGVydHMgfSBmcm9tIFwiLi4vLi4vc2VydmljZXMvYWxlcnRzXCI7XG5cbmltcG9ydCBBbGVydFZpZXcgZnJvbSBcIi4vYWxlcnRcIjtcbmltcG9ydCB7IGNyZWF0ZUZpbHRlck9wdGlvbnMgfSBmcm9tIFwiLi4vLi4vY29tbW9uL2ZpbHRlcnNcIjtcblxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBBbGVydHNWaWV3IGV4dGVuZHMgSmV0VmlldyB7XG4gICAgY29uZmlnKCkge1xuICAgICAgICBjb25zdCB2aWV3ID0ge1xuICAgICAgICAgICAgcm93czogW1xuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgdmlldzogXCJkYXRhdGFibGVcIixcbiAgICAgICAgICAgICAgICAgICAgaWQ6IFwiYWxlcnRzX3RhYmxlXCIsXG4gICAgICAgICAgICAgICAgICAgIHJlc2l6ZUNvbHVtbjogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgc2VsZWN0OiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICBtdWx0aXNlbGVjdDogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgc2Nyb2xsOiBcInh5XCIsXG4gICAgICAgICAgICAgICAgICAgIGNzczogXCJ3ZWJpeF9oZWFkZXJfYm9yZGVyIHdlYml4X2RhdGFfYm9yZGVyXCIsXG4gICAgICAgICAgICAgICAgICAgIGNvbHVtbnM6IFt7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZDogXCJpbmRleFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgaGVhZGVyOiBcIiNcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIHNvcnQ6IFwiaW50XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBhdXRvd2lkdGg6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlkOiBcImFsZXJ0X3R5cGVcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIHNvcnQ6IFwiaW50XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBmb3JtYXQ6ICh2YWx1ZSkgPT4gVFlQRVNbdmFsdWVdLFxuICAgICAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDE1MCxcbiAgICAgICAgICAgICAgICAgICAgICAgIGhlYWRlcjogW1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiVHlwZVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29udGVudDogXCJzZWxlY3RGaWx0ZXJcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb3B0aW9uczogY3JlYXRlRmlsdGVyT3B0aW9ucyhUWVBFUylcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZDogXCJjb3VudFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgaGVhZGVyOiBcIkNvdW50XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBzb3J0OiBcImludFwiXG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlkOiBcInN0YXR1c1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgc29ydDogXCJpbnRcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvcm1hdDogKHZhbHVlKSA9PiBTVEFURVNbdmFsdWVdLFxuICAgICAgICAgICAgICAgICAgICAgICAgaGVhZGVyOiBbXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJTdGF0dXNcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRlbnQ6IFwic2VsZWN0RmlsdGVyXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9wdGlvbnM6IGNyZWF0ZUZpbHRlck9wdGlvbnMoU1RBVEVTKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlkOiBcImxldmVsXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBzb3J0OiBcImludFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgZm9ybWF0OiAodmFsdWUpID0+IExFVkVMU1t2YWx1ZV0sXG4gICAgICAgICAgICAgICAgICAgICAgICBoZWFkZXI6IFtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIkxldmVsXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb250ZW50OiBcInNlbGVjdEZpbHRlclwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvcHRpb25zOiBjcmVhdGVGaWx0ZXJPcHRpb25zKExFVkVMUylcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZDogXCJjYXRcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIGhlYWRlcjogW1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiQ2F0ZWdvcnlcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRlbnQ6IFwidGV4dEZpbHRlclwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHNvcnQ6IFwic3RyaW5nXCJcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWQ6IFwidGltZV9maXJzdFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgaGVhZGVyOiBcIkZpcnN0IHRpbWVcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIHNvcnQ6IFwiZGF0ZVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgZm9ybWF0OiBkYXRlRm9ybWF0dGVyLFxuICAgICAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDIwMFxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZDogXCJ0aW1lX2xhc3RcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIGhlYWRlcjogXCJMYXN0IHRpbWVcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIHNvcnQ6IFwiZGF0ZVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgZm9ybWF0OiBkYXRlRm9ybWF0dGVyLFxuICAgICAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDIwMFxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZDogXCJtZXNzYWdlXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBoZWFkZXI6IFtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIk1lc3NhZ2VcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRlbnQ6IFwidGV4dEZpbHRlclwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgICAgICAgICBzb3J0OiBcInN0clwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgZmlsbHNwYWNlOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgZm9ybWF0OiBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodmFsdWUubGVuZ3RoID4gTUFYX01TR19MRU4pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWUgPSB2YWx1ZS5zdWJzdHIoMCwgTUFYX01TR19MRU4pICsgJy4uLic7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBhbnNpVXAuYW5zaV90b19odG1sKHZhbHVlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICAgICAgYXV0b0NvbmZpZzogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgLy8gdXJsOntcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgICRwcm94eTp0cnVlLFxuICAgICAgICAgICAgICAgICAgICAvLyAgICAgbG9hZDogZnVuY3Rpb24odmlldywgcGFyYW1zKXtcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgICBsZXQgZGF0YSA9IHdlYml4LmFqYXgoXCIvemVyb2JvdC9hbGVydGEvYWN0b3JzL2FsZXJ0YS9saXN0X2FsZXJ0c1wiKTtcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgICByZXR1cm4gZGF0YTtcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIC8vIH1cbiAgICAgICAgICAgICAgICAgICAgc2NoZW1lOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAkaW5pdDogZnVuY3Rpb24gKG9iaikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9iai5pbmRleCA9IHRoaXMuY291bnQoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgJHN1YnZpZXc6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgIHBvcHVwOiB0cnVlXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgXVxuICAgICAgICB9O1xuXG4gICAgICAgIHJldHVybiB2aWV3O1xuICAgIH1cblxuICAgIGRlbGV0ZUl0ZW0ob2JqZWN0cykge1xuICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XG5cbiAgICAgICAgbGV0IGl0ZW1zID0gW10sXG4gICAgICAgICAgICBpZHMgPSBbXSxcbiAgICAgICAgICAgIGluZGV4ZXMgPSBbXTtcblxuICAgICAgICBmb3IgKGxldCBvYmogb2Ygb2JqZWN0cykge1xuICAgICAgICAgICAgaWRzLnB1c2gob2JqLmlkKTtcbiAgICAgICAgICAgIGxldCBpdGVtID0gc2VsZi50YWJsZS5nZXRJdGVtKG9iai5pZCk7XG4gICAgICAgICAgICBpdGVtcy5wdXNoKGl0ZW0pXG4gICAgICAgICAgICBpbmRleGVzLnB1c2goaXRlbS5pbmRleCk7XG4gICAgICAgIH1cblxuICAgICAgICB3ZWJpeC5jb25maXJtKHtcbiAgICAgICAgICAgIHRpdGxlOiBcIkRlbGV0ZSBhbGVydHNcIixcbiAgICAgICAgICAgIG9rOiBcIlllc1wiLFxuICAgICAgICAgICAgY2FuY2VsOiBcIk5vXCIsXG4gICAgICAgICAgICB0ZXh0OiBgRGVsZXRlIGFsZXJ0IGl0ZW0ocykgb2YgJHtpbmRleGVzLmpvaW4oXCIsIFwiKX1gXG4gICAgICAgIH0pLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgaWRlbnRpZmllcnMgPSBpdGVtcy5tYXAoKGl0ZW0pID0+IGl0ZW0uaWRlbnRpZmllcik7XG4gICAgICAgICAgICBzZWxmLnRhYmxlLnNob3dQcm9ncmVzcyh7XG4gICAgICAgICAgICAgICAgaGlkZTogZmFsc2VcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICBhbGVydHMuZGVsZXRlKGlkZW50aWZpZXJzKS50aGVuKCgpID0+IHtcbiAgICAgICAgICAgICAgICBzZWxmLnRhYmxlLnJlbW92ZShpZHMpXG4gICAgICAgICAgICAgICAgc2VsZi50YWJsZS5zaG93UHJvZ3Jlc3Moe1xuICAgICAgICAgICAgICAgICAgICBoaWRlOiB0cnVlXG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICB2aWV3SXRlbShpZCkge1xuICAgICAgICB0aGlzLmFsZXJ0Vmlldy5zaG93Rm9yKHRoaXMudGFibGUuZ2V0SXRlbShpZCkpO1xuICAgIH1cblxuICAgIGluaXQoKSB7XG4gICAgICAgIC8vIHRoaXMudXNlKHBsdWdpbnMuUHJvZ3Jlc3NCYXIsIFwicHJvZ3Jlc3NcIik7XG4gICAgICAgIHZhciBzZWxmID0gdGhpcztcbiAgICAgICAgc2VsZi50YWJsZSA9ICQkKFwiYWxlcnRzX3RhYmxlXCIpO1xuICAgICAgICBzZWxmLmFsZXJ0VmlldyA9IHNlbGYudWkoQWxlcnRWaWV3KTtcblxuICAgICAgICB3ZWJpeC5leHRlbmQoc2VsZi50YWJsZSwgd2ViaXguUHJvZ3Jlc3NCYXIpO1xuICAgICAgICB3ZWJpeC5yZWFkeShmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBzZWxmLnRhYmxlLmNsZWFyQWxsKCk7XG4gICAgICAgICAgICBzZWxmLnRhYmxlLnNob3dQcm9ncmVzcyh7XG4gICAgICAgICAgICAgICAgaGlkZTogZmFsc2VcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgYWxlcnRzLmxpc3QoKS50aGVuKGRhdGEgPT4ge1xuICAgICAgICAgICAgICAgIGxldCBhbGVydHMgPSBkYXRhLmpzb24oKS5hbGVydHM7XG4gICAgICAgICAgICAgICAgc2VsZi50YWJsZS5wYXJzZShhbGVydHMpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHdlYml4LnVpKHtcbiAgICAgICAgICAgIHZpZXc6IFwiY29udGV4dG1lbnVcIixcbiAgICAgICAgICAgIGlkOiBcImFsZXJ0c19jbVwiLFxuICAgICAgICAgICAgZGF0YTogW1wiVmlld1wiLCBcIkRlbGV0ZVwiXVxuICAgICAgICB9KS5hdHRhY2hUbyhzZWxmLnRhYmxlKTtcblxuXG4gICAgICAgIHNlbGYudGFibGUuYXR0YWNoRXZlbnQoXCJvbkl0ZW1EYmxDbGlja1wiLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBzZWxmLnZpZXdJdGVtKHNlbGYudGFibGUuZ2V0U2VsZWN0ZWRJZCgpKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgJCQoXCJhbGVydHNfY21cIikuYXR0YWNoRXZlbnQoXCJvbk1lbnVJdGVtQ2xpY2tcIiwgZnVuY3Rpb24gKGlkKSB7XG4gICAgICAgICAgICBpZiAoaWQgPT0gXCJEZWxldGVcIikge1xuICAgICAgICAgICAgICAgIHNlbGYuZGVsZXRlSXRlbShzZWxmLnRhYmxlLmdldFNlbGVjdGVkSWQodHJ1ZSkpO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChpZCA9PSBcIlZpZXdcIikge1xuICAgICAgICAgICAgICAgIHNlbGYudmlld0l0ZW0oc2VsZi50YWJsZS5nZXRTZWxlY3RlZElkKCkpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zb3VyY2VzL3ZpZXdzL2FsZXJ0cy9pbmRleC5qcyIsImltcG9ydCBBbnNpVXAgZnJvbSBcImFuc2lfdXBcIjtcblxuZXhwb3J0IGNvbnN0IGFuc2lVcCA9IG5ldyBBbnNpVXAoKTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NvdXJjZXMvY29tbW9uL2NvbG9ycy5qcyIsImltcG9ydCB7IEV4dGVybmFsVmlldyB9IGZyb20gXCIuLi9leHRlcm5hbFwiO1xuaW1wb3J0IHsgYWRtaW4gfSBmcm9tIFwiLi4vLi4vc2VydmljZXMvYWRtaW5cIjtcblxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDYXBhY2l0eVZpZXcgZXh0ZW5kcyBFeHRlcm5hbFZpZXcge1xuICAgIGNvbnN0cnVjdG9yKGFwcCwgbmFtZSkge1xuICAgICAgICBzdXBlcihhcHAsIG5hbWUpO1xuICAgIH1cblxuICAgIHNob3dJZnJhbWUoKSB7XG4gICAgICAgIGFkbWluLmdldF9leHBsb3JlcigpLnRoZW4oKGRhdGEpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGV4cGxvcmVyID0gZGF0YS5qc29uKCk7XG4gICAgICAgICAgICBsZXQgdXJsID0gZXhwbG9yZXIudXJsO1xuXG4gICAgICAgICAgICBpZiAoIXVybC5zdGFydHNXaXRoKCdodHRwJykpIHtcbiAgICAgICAgICAgICAgICB1cmwgPSBgaHR0cHM6Ly8ke3VybH1gO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB0aGlzLmV4dGVybmFsSWZyYW1lLnNob3coKTtcbiAgICAgICAgICAgIHRoaXMuZXh0ZXJuYWxJZnJhbWUuc2hvd1Byb2dyZXNzKHsgdHlwZTogXCJpY29uXCIgfSk7XG4gICAgICAgICAgICB0aGlzLmV4dGVybmFsSWZyYW1lLmxvYWQodXJsKTtcbiAgICAgICAgfSlcbiAgICB9XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zb3VyY2VzL3ZpZXdzL2NhcGFjaXR5L2luZGV4LmpzIiwiaW1wb3J0IHsgSmV0VmlldyB9IGZyb20gXCJ3ZWJpeC1qZXRcIjtcblxuaW1wb3J0IHsgRXJyb3JWaWV3IH0gZnJvbSBcIi4uL2Vycm9ycy9kaWFsb2dcIjtcbmltcG9ydCB7IHRhaWdhIH0gZnJvbSBcIi4uLy4uL3NlcnZpY2VzL3RhaWdhXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIENpcmNsZXNWaWV3IGV4dGVuZHMgSmV0VmlldyB7XG4gICAgY29uZmlnKCkge1xuICAgICAgICBjb25zdCBncmlkID0ge1xuICAgICAgICAgICAgcm93czogW3tcbiAgICAgICAgICAgICAgICAvL0hlYWRlclxuICAgICAgICAgICAgICAgIHZpZXc6IFwidGVtcGxhdGVcIixcbiAgICAgICAgICAgICAgICB0eXBlOiBcImhlYWRlclwiLFxuICAgICAgICAgICAgICAgIHRlbXBsYXRlOiBcIkNpcmNsZXNcIixcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7IC8vRGF0YVRhYmxlXG4gICAgICAgICAgICAgICAgdmlldzogXCJkYXRhdGFibGVcIixcbiAgICAgICAgICAgICAgICBpZDogXCJjaXJjbGVzX3RhYmxlXCIsXG4gICAgICAgICAgICAgICAgcmVzaXplQ29sdW1uOiB0cnVlLFxuICAgICAgICAgICAgICAgIHR5cGU6IHtcbiAgICAgICAgICAgICAgICAgICAgaGVpZ2h0OiAyMDAsXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBzY3JvbGw6IFwieHlcIixcbiAgICAgICAgICAgICAgICBhdXRvQ29uZmlnOiB0cnVlLFxuICAgICAgICAgICAgICAgIHZpZXc6IFwiZGF0YXRhYmxlXCIsXG4gICAgICAgICAgICAgICAgc2VsZWN0OiB0cnVlLFxuICAgICAgICAgICAgICAgIGNzczogXCJ3ZWJpeF9oZWFkZXJfYm9yZGVyIHdlYml4X2RhdGFfYm9yZGVyXCIsXG4gICAgICAgICAgICAgICAgb25Db250ZXh0OiB7fSxcbiAgICAgICAgICAgICAgICBjb2x1bW5zOiBbe1xuICAgICAgICAgICAgICAgICAgICBpZDogXCJJRFwiLFxuICAgICAgICAgICAgICAgICAgICBoZWFkZXI6IFwiSURcIixcbiAgICAgICAgICAgICAgICAgICAgc29ydDogXCJpbnRcIixcbiAgICAgICAgICAgICAgICAgICAgYXV0b3dpZHRoOiB0cnVlLFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBpZDogXCJOYW1lXCIsXG4gICAgICAgICAgICAgICAgICAgIGhlYWRlcjogXCJOYW1lXCIsXG4gICAgICAgICAgICAgICAgICAgIHNvcnQ6IFwic3RyaW5nXCIsXG4gICAgICAgICAgICAgICAgICAgIHdpZHRoOiAyMDBcbiAgICAgICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgICAgIGlkOiBcIk93bmVyXCIsXG4gICAgICAgICAgICAgICAgICAgIGhlYWRlcjogW1wiT3duZXJcIiwge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29udGVudDogXCJ0ZXh0RmlsdGVyXCJcbiAgICAgICAgICAgICAgICAgICAgfV0sXG4gICAgICAgICAgICAgICAgICAgIHNvcnQ6IFwic3RyaW5nXCIsXG4gICAgICAgICAgICAgICAgICAgIHdpZHRoOiAyMDBcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgaWQ6IFwiRGVzY3JpcHRpb25cIixcbiAgICAgICAgICAgICAgICAgICAgaGVhZGVyOiBcIkRlc2NyaXB0aW9uXCIsXG4gICAgICAgICAgICAgICAgICAgIHNvcnQ6IFwic3RyaW5nXCIsXG4gICAgICAgICAgICAgICAgICAgIHdpZHRoOiAxMzAwLFxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgIHNjaGVtZToge1xuICAgICAgICAgICAgICAgICAgICAkaW5pdDogZnVuY3Rpb24gKG9iaikge1xuICAgICAgICAgICAgICAgICAgICAgICAgb2JqLmluZGV4ID0gdGhpcy5jb3VudCgpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgXVxuICAgICAgICB9O1xuICAgICAgICByZXR1cm4gZ3JpZDtcbiAgICB9XG5cbiAgICBzaG93RXJyb3IobWVzc2FnZSkge1xuICAgICAgICB0aGlzLmVycm9yVmlldy5zaG93RXJyb3IobWVzc2FnZSk7XG4gICAgfVxuXG4gICAgaW5pdCh2aWV3KSB7XG4gICAgICAgIGNvbnN0IHNlbGYgPSB0aGlzO1xuXG4gICAgICAgIHNlbGYuZXJyb3JWaWV3ID0gdGhpcy51aShFcnJvclZpZXcpO1xuXG4gICAgICAgIGNvbnN0IG1lbnUgPSB3ZWJpeC51aSh7XG4gICAgICAgICAgICB2aWV3OiBcImNvbnRleHRtZW51XCIsXG4gICAgICAgICAgICBpZDogXCJjaXJjbGVzX2NtXCJcbiAgICAgICAgfSk7XG5cbiAgICAgICAgdGhpcy5jaXJjbGVUYWJsZSA9IHRoaXMuJCQoXCJjaXJjbGVzX3RhYmxlXCIpO1xuICAgICAgICB3ZWJpeC5leHRlbmQodGhpcy5jaXJjbGVUYWJsZSwgd2ViaXguUHJvZ3Jlc3NCYXIpO1xuXG5cbiAgICAgICAgd2ViaXguYWpheCgpLmdldChcIi9hdXRoL2F1dGhlbnRpY2F0ZWRcIiwgZnVuY3Rpb24gKGRhdGEpIHtcbiAgICAgICAgICAgIGNvbnN0IGluZm8gPSBKU09OLnBhcnNlKGRhdGEpO1xuICAgICAgICAgICAgY29uc3QgdXNlcm5hbWUgPSBpbmZvLnVzZXJuYW1lLnJlcGxhY2UoXCIuM2JvdFwiLCBcIlwiKVxuICAgICAgICAgICAgdGFpZ2EudXNlckNpcmNsZXModXNlcm5hbWUpLnRoZW4oZGF0YSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3QgY2lyY2xlcyA9IGRhdGEuanNvbigpO1xuICAgICAgICAgICAgICAgIHNlbGYuY2lyY2xlVGFibGUucGFyc2UoY2lyY2xlcyk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG5cblxuICAgIH1cbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NvdXJjZXMvdmlld3MvY2lyY2xlcy9pbmRleC5qcyIsImltcG9ydCB7IEpldFZpZXcgfSBmcm9tIFwid2ViaXgtamV0XCI7XG5cbmltcG9ydCB7IEVycm9yVmlldyB9IGZyb20gXCIuLi9lcnJvcnMvZGlhbG9nXCI7XG5pbXBvcnQgeyB0YWlnYSB9IGZyb20gXCIuLi8uLi9zZXJ2aWNlcy90YWlnYVwiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDaXJjbGVzdG9yaWVzVmlldyBleHRlbmRzIEpldFZpZXcge1xuICAgIGNvbmZpZygpIHtcbiAgICAgICAgY29uc3QgZ3JpZCA9IHtcbiAgICAgICAgICAgIHJvd3M6IFt7XG4gICAgICAgICAgICAgICAgLy9IZWFkZXJcbiAgICAgICAgICAgICAgICB2aWV3OiBcInRlbXBsYXRlXCIsXG4gICAgICAgICAgICAgICAgdHlwZTogXCJoZWFkZXJcIixcbiAgICAgICAgICAgICAgICB0ZW1wbGF0ZTogXCJDaXJjbGVzU3Rvcmllc1wiLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHsgLy9EYXRhVGFibGVcbiAgICAgICAgICAgICAgICB2aWV3OiBcImRhdGF0YWJsZVwiLFxuICAgICAgICAgICAgICAgIGlkOiBcImNpcmNsZXN0b3JpZXNfdGFibGVcIixcbiAgICAgICAgICAgICAgICByZXNpemVDb2x1bW46IHRydWUsXG4gICAgICAgICAgICAgICAgdHlwZToge1xuICAgICAgICAgICAgICAgICAgICBoZWlnaHQ6IDIwMCxcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHNjcm9sbDogXCJ4eVwiLFxuICAgICAgICAgICAgICAgIGF1dG9Db25maWc6IHRydWUsXG4gICAgICAgICAgICAgICAgdmlldzogXCJkYXRhdGFibGVcIixcbiAgICAgICAgICAgICAgICBzZWxlY3Q6IHRydWUsXG4gICAgICAgICAgICAgICAgY3NzOiBcIndlYml4X2hlYWRlcl9ib3JkZXIgd2ViaXhfZGF0YV9ib3JkZXJcIixcbiAgICAgICAgICAgICAgICBvbkNvbnRleHQ6IHt9LFxuICAgICAgICAgICAgICAgIGNvbHVtbnM6IFt7XG4gICAgICAgICAgICAgICAgICAgIGlkOiBcIklEXCIsXG4gICAgICAgICAgICAgICAgICAgIGhlYWRlcjogXCJJRFwiLFxuICAgICAgICAgICAgICAgICAgICBzb3J0OiBcImludFwiLFxuICAgICAgICAgICAgICAgICAgICBhdXRvd2lkdGg6IHRydWUsXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIGlkOiBcIlByb2plY3RcIixcbiAgICAgICAgICAgICAgICAgICAgaGVhZGVyOiBbXCJQcm9qZWN0XCIsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRlbnQ6IFwidGV4dEZpbHRlclwiXG4gICAgICAgICAgICAgICAgICAgIH1dLFxuICAgICAgICAgICAgICAgICAgICBzb3J0OiBcInN0cmluZ1wiLFxuICAgICAgICAgICAgICAgICAgICB3aWR0aDogMzAwXG4gICAgICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgICAgICBpZDogXCJTdWJqZWN0XCIsXG4gICAgICAgICAgICAgICAgICAgIGhlYWRlcjogXCJTdWJqZWN0XCIsXG4gICAgICAgICAgICAgICAgICAgIHNvcnQ6IFwic3RyaW5nXCIsXG4gICAgICAgICAgICAgICAgICAgIHdpZHRoOiA3MDBcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgaWQ6IFwiTWlsZXN0b25lXCIsXG4gICAgICAgICAgICAgICAgICAgIGhlYWRlcjogXCJNaWxlc3RvbmVcIixcbiAgICAgICAgICAgICAgICAgICAgc29ydDogXCJzdHJpbmdcIixcbiAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDIwMCxcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgaWQ6IFwiU3RhdHVzXCIsXG4gICAgICAgICAgICAgICAgICAgIGhlYWRlcjogXCJTdGF0dXNcIixcbiAgICAgICAgICAgICAgICAgICAgc29ydDogXCJzdHJpbmdcIixcbiAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDIwMCxcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgaWQ6IFwiRHVlIGRhdGVcIixcbiAgICAgICAgICAgICAgICAgICAgaGVhZGVyOiBcIkR1ZSBkYXRlXCIsXG4gICAgICAgICAgICAgICAgICAgIHNvcnQ6IFwic3RyaW5nXCIsXG4gICAgICAgICAgICAgICAgICAgIHdpZHRoOiAyMDAsXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgc2NoZW1lOiB7XG4gICAgICAgICAgICAgICAgICAgICRpbml0OiBmdW5jdGlvbiAob2JqKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBvYmouaW5kZXggPSB0aGlzLmNvdW50KCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBdXG4gICAgICAgIH07XG4gICAgICAgIHJldHVybiBncmlkO1xuICAgIH1cblxuICAgIHNob3dFcnJvcihtZXNzYWdlKSB7XG4gICAgICAgIHRoaXMuZXJyb3JWaWV3LnNob3dFcnJvcihtZXNzYWdlKTtcbiAgICB9XG5cbiAgICBpbml0KHZpZXcpIHtcbiAgICAgICAgY29uc3Qgc2VsZiA9IHRoaXM7XG5cbiAgICAgICAgc2VsZi5lcnJvclZpZXcgPSB0aGlzLnVpKEVycm9yVmlldyk7XG5cbiAgICAgICAgY29uc3QgbWVudSA9IHdlYml4LnVpKHtcbiAgICAgICAgICAgIHZpZXc6IFwiY29udGV4dG1lbnVcIixcbiAgICAgICAgICAgIGlkOiBcImNpcmNsZXN0b3JpZXNfY21cIlxuICAgICAgICB9KTtcblxuICAgICAgICB0aGlzLnN0b3JpZXNUYWJsZSA9IHRoaXMuJCQoXCJjaXJjbGVzdG9yaWVzX3RhYmxlXCIpO1xuICAgICAgICB3ZWJpeC5leHRlbmQodGhpcy5zdG9yaWVzVGFibGUsIHdlYml4LlByb2dyZXNzQmFyKTtcblxuICAgICAgICB3ZWJpeC5hamF4KCkuZ2V0KFwiL2F1dGgvYXV0aGVudGljYXRlZFwiLCBmdW5jdGlvbiAoZGF0YSkge1xuICAgICAgICAgICAgY29uc3QgaW5mbyA9IEpTT04ucGFyc2UoZGF0YSk7XG4gICAgICAgICAgICBjb25zdCB1c2VybmFtZSA9IGluZm8udXNlcm5hbWUucmVwbGFjZShcIi4zYm90XCIsIFwiXCIpXG4gICAgICAgICAgICB0YWlnYS51c2VyU3Rvcmllcyh1c2VybmFtZSkudGhlbihkYXRhID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCBzdG9yaWVzID0gZGF0YS5qc29uKCk7XG4gICAgICAgICAgICAgICAgc2VsZi5zdG9yaWVzVGFibGUucGFyc2Uoc3Rvcmllcyk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG5cblxuICAgIH1cbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NvdXJjZXMvdmlld3MvY2lyY2xlc3Rvcmllcy9pbmRleC5qcyIsImltcG9ydCB7IEpldFZpZXcgfSBmcm9tIFwid2ViaXgtamV0XCI7XG5cbmltcG9ydCB7IEVycm9yVmlldyB9IGZyb20gXCIuLi9lcnJvcnMvZGlhbG9nXCI7XG5pbXBvcnQgeyB0YWlnYSB9IGZyb20gXCIuLi8uLi9zZXJ2aWNlcy90YWlnYVwiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDaXJjbGVzVGFza3NWaWV3IGV4dGVuZHMgSmV0VmlldyB7XG4gICAgY29uZmlnKCkge1xuICAgICAgICBjb25zdCBncmlkID0ge1xuICAgICAgICAgICAgcm93czogW3tcbiAgICAgICAgICAgICAgICAvL0hlYWRlclxuICAgICAgICAgICAgICAgIHZpZXc6IFwidGVtcGxhdGVcIixcbiAgICAgICAgICAgICAgICB0eXBlOiBcImhlYWRlclwiLFxuICAgICAgICAgICAgICAgIHRlbXBsYXRlOiBcIkNpcmNsZXNUYXNrc1wiLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHsgLy9EYXRhVGFibGVcbiAgICAgICAgICAgICAgICB2aWV3OiBcImRhdGF0YWJsZVwiLFxuICAgICAgICAgICAgICAgIGlkOiBcImNpcmNsZXN0YXNrc190YWJsZVwiLFxuICAgICAgICAgICAgICAgIHJlc2l6ZUNvbHVtbjogdHJ1ZSxcbiAgICAgICAgICAgICAgICB0eXBlOiB7XG4gICAgICAgICAgICAgICAgICAgIGhlaWdodDogMjAwLFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgc2Nyb2xsOiBcInh5XCIsXG4gICAgICAgICAgICAgICAgYXV0b0NvbmZpZzogdHJ1ZSxcbiAgICAgICAgICAgICAgICB2aWV3OiBcImRhdGF0YWJsZVwiLFxuICAgICAgICAgICAgICAgIHNlbGVjdDogdHJ1ZSxcbiAgICAgICAgICAgICAgICBjc3M6IFwid2ViaXhfaGVhZGVyX2JvcmRlciB3ZWJpeF9kYXRhX2JvcmRlclwiLFxuICAgICAgICAgICAgICAgIG9uQ29udGV4dDoge30sXG4gICAgICAgICAgICAgICAgY29sdW1uczogW3tcbiAgICAgICAgICAgICAgICAgICAgaWQ6IFwiSURcIixcbiAgICAgICAgICAgICAgICAgICAgaGVhZGVyOiBcIklEXCIsXG4gICAgICAgICAgICAgICAgICAgIHNvcnQ6IFwiaW50XCIsXG4gICAgICAgICAgICAgICAgICAgIGF1dG93aWR0aDogdHJ1ZSxcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgaWQ6IFwiUHJvamVjdFwiLFxuICAgICAgICAgICAgICAgICAgICBoZWFkZXI6IFtcIlByb2plY3RcIiwge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29udGVudDogXCJ0ZXh0RmlsdGVyXCJcbiAgICAgICAgICAgICAgICAgICAgfV0sXG4gICAgICAgICAgICAgICAgICAgIHNvcnQ6IFwic3RyaW5nXCIsXG4gICAgICAgICAgICAgICAgICAgIHdpZHRoOiAzMDBcbiAgICAgICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgICAgIGlkOiBcIlN1YmplY3RcIixcbiAgICAgICAgICAgICAgICAgICAgaGVhZGVyOiBcIlN1YmplY3RcIixcbiAgICAgICAgICAgICAgICAgICAgc29ydDogXCJzdHJpbmdcIixcbiAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDgwMFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBpZDogXCJNaWxlc3RvbmVcIixcbiAgICAgICAgICAgICAgICAgICAgaGVhZGVyOiBcIk1pbGVzdG9uZVwiLFxuICAgICAgICAgICAgICAgICAgICBzb3J0OiBcInN0cmluZ1wiLFxuICAgICAgICAgICAgICAgICAgICB3aWR0aDogMjAwLFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBpZDogXCJTdGF0dXNcIixcbiAgICAgICAgICAgICAgICAgICAgaGVhZGVyOiBcIlN0YXR1c1wiLFxuICAgICAgICAgICAgICAgICAgICBzb3J0OiBcInN0cmluZ1wiLFxuICAgICAgICAgICAgICAgICAgICB3aWR0aDogMzAwLFxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgIHNjaGVtZToge1xuICAgICAgICAgICAgICAgICAgICAkaW5pdDogZnVuY3Rpb24gKG9iaikge1xuICAgICAgICAgICAgICAgICAgICAgICAgb2JqLmluZGV4ID0gdGhpcy5jb3VudCgpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgXVxuICAgICAgICB9O1xuICAgICAgICByZXR1cm4gZ3JpZDtcbiAgICB9XG5cbiAgICBzaG93RXJyb3IobWVzc2FnZSkge1xuICAgICAgICB0aGlzLmVycm9yVmlldy5zaG93RXJyb3IobWVzc2FnZSk7XG4gICAgfVxuXG4gICAgaW5pdCh2aWV3KSB7XG4gICAgICAgIGNvbnN0IHNlbGYgPSB0aGlzO1xuXG4gICAgICAgIHNlbGYuZXJyb3JWaWV3ID0gdGhpcy51aShFcnJvclZpZXcpO1xuXG4gICAgICAgIGNvbnN0IG1lbnUgPSB3ZWJpeC51aSh7XG4gICAgICAgICAgICB2aWV3OiBcImNvbnRleHRtZW51XCIsXG4gICAgICAgICAgICBpZDogXCJjaXJjbGVzdGFza3NfY21cIlxuICAgICAgICB9KTtcblxuICAgICAgICB0aGlzLnRhc2tzVGFibGUgPSB0aGlzLiQkKFwiY2lyY2xlc3Rhc2tzX3RhYmxlXCIpO1xuICAgICAgICB3ZWJpeC5leHRlbmQodGhpcy50YXNrc1RhYmxlLCB3ZWJpeC5Qcm9ncmVzc0Jhcik7XG5cbiAgICAgICAgdGFpZ2EudXNlclRhc2tzKDM2KS50aGVuKGRhdGEgPT4ge1xuICAgICAgICAgICAgY29uc3QgY2lyY2xlcyA9IGRhdGEuanNvbigpO1xuICAgICAgICAgICAgc2VsZi50YXNrc1RhYmxlLnBhcnNlKGNpcmNsZXMpO1xuICAgICAgICB9KTtcblxuICAgICAgICB3ZWJpeC5hamF4KCkuZ2V0KFwiL2F1dGgvYXV0aGVudGljYXRlZFwiLCBmdW5jdGlvbiAoZGF0YSkge1xuICAgICAgICAgICAgY29uc3QgaW5mbyA9IEpTT04ucGFyc2UoZGF0YSk7XG4gICAgICAgICAgICBjb25zdCB1c2VybmFtZSA9IGluZm8udXNlcm5hbWUucmVwbGFjZShcIi4zYm90XCIsIFwiXCIpXG4gICAgICAgICAgICB0YWlnYS51c2VyVGFza3ModXNlcm5hbWUpLnRoZW4oZGF0YSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3QgdGFza3MgPSBkYXRhLmpzb24oKTtcbiAgICAgICAgICAgICAgICBzZWxmLnRhc2tzVGFibGUucGFyc2UodGFza3MpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuXG5cbiAgICB9XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zb3VyY2VzL3ZpZXdzL2NpcmNsZXRhc2tzL2luZGV4LmpzIiwiaW1wb3J0IHsgRXh0ZXJuYWxWaWV3IH0gZnJvbSBcIi4uL2V4dGVybmFsXCI7XG5cbmNvbnN0IENPREVfVVJMID0gXCIvY29kZXNlcnZlci8/Zm9sZGVyPS9zYW5kYm94L2NvZGVcIjtcbmNvbnN0IFJFUVVJUkVEX1BBQ0tBR0VTID0ge1xuICAgIFwiemVyb2JvdC5jb2Rlc2VydmVyXCI6IFwiaHR0cHM6Ly9naXRodWIuY29tL3RocmVlZm9sZHRlY2gvanVtcHNjYWxlWF90aHJlZWJvdC90cmVlL2RldmVsb3BtZW50L1RocmVlQm90UGFja2FnZXMvemVyb2JvdC9jb2Rlc2VydmVyXCJcbn1cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ29kZXNlcnZlclZpZXcgZXh0ZW5kcyBFeHRlcm5hbFZpZXcge1xuICAgIGNvbnN0cnVjdG9yKGFwcCwgbmFtZSkge1xuICAgICAgICBzdXBlcihhcHAsIG5hbWUsIENPREVfVVJMLCBSRVFVSVJFRF9QQUNLQUdFUyk7XG4gICAgfVxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc291cmNlcy92aWV3cy9jb2Rlc2VydmVyL2luZGV4LmpzIiwiaW1wb3J0IHsgSmV0VmlldyB9IGZyb20gXCJ3ZWJpeC1qZXRcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVG9wVmlldyBleHRlbmRzIEpldFZpZXcge1xuXHRjb25maWcoKSB7XG5cdFx0cmV0dXJuIHtcblx0XHRcdHR5cGU6IFwic3BhY2VcIixcblx0XHRcdHJlc3BvbnNpdmU6IHRydWUsXG5cdFx0XHRyb3dzOiBbXG5cdFx0XHRcdHtcblx0XHRcdFx0XHRjb2xzOiBbe1xuXHRcdFx0XHRcdFx0JHN1YnZpZXc6IFwiZGFzaC5qc3hJbmZvXCJcblx0XHRcdFx0XHR9LFxuXHRcdFx0XHRcdHtcblx0XHRcdFx0XHRcdCRzdWJ2aWV3OiBcImRhc2guaGVhbHRoXCJcblx0XHRcdFx0XHR9LFxuXHRcdFx0XHRcdHtcblx0XHRcdFx0XHRcdCRzdWJ2aWV3OiBcImRhc2guZGlza1NwYWNlXCJcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XVxuXHRcdFx0XHR9LFxuXHRcdFx0XHR7XG5cdFx0XHRcdFx0Y29sczogW3tcblx0XHRcdFx0XHRcdCRzdWJ2aWV3OiBcImRhc2gucHJvY2Vzc2VzXCJcblx0XHRcdFx0XHR9LFxuXHRcdFx0XHRcdHsgJHN1YnZpZXc6IFwiZGFzaC5wcm9jZXNzZXNMaXN0XCIgfSxcblx0XHRcdFx0XHR7ICRzdWJ2aWV3OiBcImRhc2gucnVubmluZ1BvcnRzXCIgfVxuXHRcdFx0XHRdXG5cdFx0XHRcdH0sXG5cdFx0XHRdXG5cdFx0fTtcblx0fVxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc291cmNlcy92aWV3cy9kYXNoL2luZGV4LmpzIiwiaW1wb3J0IHsgSmV0VmlldyB9IGZyb20gXCJ3ZWJpeC1qZXRcIjtcblxuaW1wb3J0IHsgRXJyb3JWaWV3IH0gZnJvbSBcIi4uL2Vycm9ycy9kaWFsb2dcIjtcbmltcG9ydCB7IHNvbHV0aW9ucyB9IGZyb20gXCIuLi8uLi9zZXJ2aWNlcy9kZXBsb3llZFNvbHV0aW9uc1wiO1xuXG5pbXBvcnQgUmVzZXJ2YXRpb25WaWV3IGZyb20gXCIuL3Jlc2VydmF0aW9uXCI7XG5cbmNvbnN0IFVOS05PV05fU1RBVFVTID0gJ1Vua25vd24nO1xuXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIERlcGxveWVkU29sdXRpb25zVmlldyBleHRlbmRzIEpldFZpZXcge1xuICAgIGNvbmZpZygpIHtcbiAgICAgICAgY29uc3QgZ3JpZCA9IHtcbiAgICAgICAgICAgIHJvd3M6IFt7XG4gICAgICAgICAgICAgICAgLy9IZWFkZXJcbiAgICAgICAgICAgICAgICB2aWV3OiBcInRlbXBsYXRlXCIsXG4gICAgICAgICAgICAgICAgdHlwZTogXCJoZWFkZXJcIixcbiAgICAgICAgICAgICAgICB0ZW1wbGF0ZTogXCJEZXBsb3llZCBTb2x1dGlvbnNcIixcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7IC8vRGF0YVRhYmxlXG4gICAgICAgICAgICAgICAgdmlldzogXCJkYXRhdGFibGVcIixcbiAgICAgICAgICAgICAgICBpZDogXCJzb2x1dGlvbnNfdGFibGVcIixcbiAgICAgICAgICAgICAgICByZXNpemVDb2x1bW46IHRydWUsXG4gICAgICAgICAgICAgICAgdHlwZToge1xuICAgICAgICAgICAgICAgICAgICBoZWlnaHQ6IDIwMCxcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHNjcm9sbDogXCJ4eVwiLFxuICAgICAgICAgICAgICAgIGF1dG9Db25maWc6IHRydWUsXG4gICAgICAgICAgICAgICAgdmlldzogXCJkYXRhdGFibGVcIixcbiAgICAgICAgICAgICAgICBzZWxlY3Q6IHRydWUsXG4gICAgICAgICAgICAgICAgY3NzOiBcIndlYml4X2hlYWRlcl9ib3JkZXIgd2ViaXhfZGF0YV9ib3JkZXJcIixcbiAgICAgICAgICAgICAgICBvbkNvbnRleHQ6IHt9LFxuICAgICAgICAgICAgICAgIGNvbHVtbnM6IFt7XG4gICAgICAgICAgICAgICAgICAgIGlkOiBcImluZGV4XCIsXG4gICAgICAgICAgICAgICAgICAgIGhlYWRlcjogXCIjXCIsXG4gICAgICAgICAgICAgICAgICAgIHNvcnQ6IFwiaW50XCIsXG4gICAgICAgICAgICAgICAgICAgIGF1dG93aWR0aDogdHJ1ZSxcbiAgICAgICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgICAgIGlkOiBcInNvbHV0aW9uTmFtZVwiLFxuICAgICAgICAgICAgICAgICAgICBoZWFkZXI6IFtcIlNvbHV0aW9uIE5hbWVcIiwge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29udGVudDogXCJ0ZXh0RmlsdGVyXCJcbiAgICAgICAgICAgICAgICAgICAgfV0sXG4gICAgICAgICAgICAgICAgICAgIHNvcnQ6IFwic3RyaW5nXCIsXG4gICAgICAgICAgICAgICAgICAgIHdpZHRoOiAyMDBcbiAgICAgICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgICAgIGlkOiBcInJlc3ZJZFwiLFxuICAgICAgICAgICAgICAgICAgICBoZWFkZXI6IFtcIlJlc2VydmF0aW9uIElkXCIsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRlbnQ6IFwidGV4dEZpbHRlclwiXG4gICAgICAgICAgICAgICAgICAgIH1dLFxuICAgICAgICAgICAgICAgICAgICBzb3J0OiBcInN0cmluZ1wiLFxuICAgICAgICAgICAgICAgICAgICB3aWR0aDogMjAwXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIGlkOiBcInNvbHV0aW9uVHlwZVwiLFxuICAgICAgICAgICAgICAgICAgICBoZWFkZXI6IFtcIlNvbHV0aW9uIFR5cGVcIiwge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29udGVudDogXCJzZWxlY3RGaWx0ZXJcIlxuICAgICAgICAgICAgICAgICAgICB9XSxcbiAgICAgICAgICAgICAgICAgICAgc29ydDogXCJzdHJpbmdcIixcbiAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDIwMFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBpZDogXCJuZXh0QWN0aW9uXCIsXG4gICAgICAgICAgICAgICAgICAgIGhlYWRlcjogW1wiTmV4dCBhY3Rpb25cIiwge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29udGVudDogXCJzZWxlY3RGaWx0ZXJcIlxuICAgICAgICAgICAgICAgICAgICB9XSxcbiAgICAgICAgICAgICAgICAgICAgc29ydDogXCJzdHJpbmdcIixcbiAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDIwMFxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgIHNjaGVtZToge1xuICAgICAgICAgICAgICAgICAgICAkaW5pdDogZnVuY3Rpb24gKG9iaikge1xuICAgICAgICAgICAgICAgICAgICAgICAgb2JqLnNvbHV0aW9uTmFtZSA9IG9iai5uYW1lO1xuICAgICAgICAgICAgICAgICAgICAgICAgb2JqLnJlc3ZJZCA9IG9iai5yZXNlcnZhdGlvbi5pZDtcbiAgICAgICAgICAgICAgICAgICAgICAgIG9iai5zb2x1dGlvblR5cGUgPSBvYmoudHlwZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIG9iai5uZXh0QWN0aW9uID0gb2JqLnJlc2VydmF0aW9uLm5leHRfYWN0aW9uO1xuICAgICAgICAgICAgICAgICAgICAgICAgb2JqLmluZGV4ID0gdGhpcy5jb3VudCgpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBvbjoge1xuICAgICAgICAgICAgICAgICAgICBvbkFmdGVyTG9hZDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCF0aGlzLmNvdW50KCkpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zaG93T3ZlcmxheShcIlNvcnJ5LCB0aGVyZSBpcyBubyBkYXRhXCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuaGlkZU92ZXJsYXkoKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIF1cbiAgICAgICAgfTtcbiAgICAgICAgcmV0dXJuIGdyaWQ7XG4gICAgfVxuXG4gICAgc2hvd0Vycm9yKG1lc3NhZ2UpIHtcbiAgICAgICAgdGhpcy5lcnJvclZpZXcuc2hvd0Vycm9yKG1lc3NhZ2UpO1xuICAgIH1cblxuICAgIGhhbmRsZVJlc3VsdChwcm9taXNlLCBjYWxsYmFjaykge1xuICAgICAgICB0aGlzLnNvbHV0aW9uc1RhYmxlLnNob3dQcm9ncmVzcyh7IGhpZGU6IGZhbHNlIH0pO1xuXG4gICAgICAgIHByb21pc2UudGhlbigoZGF0YSkgPT4ge1xuICAgICAgICAgICAgY29uc3Qgc29sdXRpb25JdGVtID0gZGF0YS5qc29uKCkuc29sdXRpb247XG4gICAgICAgICAgICBpZiAoY2FsbGJhY2sgaW5zdGFuY2VvZiBGdW5jdGlvbikge1xuICAgICAgICAgICAgICAgIGNhbGxiYWNrKHNvbHV0aW9uSXRlbSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHdlYml4Lm1lc3NhZ2Uoe1xuICAgICAgICAgICAgICAgIHR5cGU6IFwic3VjY2Vzc1wiLFxuICAgICAgICAgICAgICAgIHRleHQ6IFwiVGhlIG9wZXJhdGlvbiBoYXMgYmVlZCBkb25lIHN1Y2Nlc3NmdWxseVwiXG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgdGhpcy5zb2x1dGlvbnNUYWJsZS5zaG93UHJvZ3Jlc3MoeyBoaWRlOiB0cnVlIH0pO1xuICAgICAgICB9KS5jYXRjaChlcnJvciA9PiB7XG4gICAgICAgICAgICB0aGlzLnNob3dFcnJvcihcIkVycm9yIGhhcyBoYXBwZW5lZCBkdXJpbmcgdGhpcyBvcGVyYXRpb246IFwiICsgZXJyb3IucmVzcG9uc2UsIFwiRXJyb3JcIik7XG4gICAgICAgICAgICB0aGlzLnNvbHV0aW9uc1RhYmxlLnNob3dQcm9ncmVzcyh7IGhpZGU6IHRydWUgfSk7XG4gICAgICAgIH0pXG4gICAgfVxuXG4gICAgZGVsZXRlU29sdXRpb24oc29sdXRpb25UeXBlLCBzb2x1dGlvbk5hbWUsIGl0ZW1JZCkge1xuICAgICAgICB0aGlzLmhhbmRsZVJlc3VsdChzb2x1dGlvbnMuZGVsZXRlKHNvbHV0aW9uVHlwZSwgc29sdXRpb25OYW1lKSwgKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5zb2x1dGlvbnNUYWJsZS5yZW1vdmUoaXRlbUlkKVxuICAgICAgICB9KTtcblxuICAgIH1cblxuICAgIGxvYWRTb2x1dGlvbnMoKSB7XG4gICAgICAgIHNvbHV0aW9ucy5saXN0KCkudGhlbihkYXRhID0+IHtcbiAgICAgICAgICAgIGxldCBzb2x1dGlvbnMgPSBkYXRhLmpzb24oKS5zb2x1dGlvbnNcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc29sdXRpb25zLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgc29sdXRpb25zW2ldLnJlc2VydmF0aW9uID0gSlNPTi5wYXJzZShzb2x1dGlvbnNbaV0ucmVzZXJ2YXRpb24pXG4gICAgICAgICAgICAgICAgc29sdXRpb25zW2ldLmZvcm1faW5mbyA9IEpTT04ucGFyc2Uoc29sdXRpb25zW2ldLmZvcm1faW5mbylcblxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5zb2x1dGlvbnNUYWJsZS5wYXJzZShzb2x1dGlvbnMpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICB2aWV3SXRlbShpZCkge1xuICAgICAgICB0aGlzLnJlc2VydmF0aW9uVmlldy5zaG93Rm9yKHRoaXMuc29sdXRpb25zVGFibGUuZ2V0SXRlbShpZCkpO1xuICAgIH1cblxuICAgIGluaXQodmlldykge1xuICAgICAgICBjb25zdCBzZWxmID0gdGhpcztcblxuICAgICAgICBzZWxmLmVycm9yVmlldyA9IHRoaXMudWkoRXJyb3JWaWV3KTtcbiAgICAgICAgc2VsZi5yZXNlcnZhdGlvblZpZXcgPSBzZWxmLnVpKFJlc2VydmF0aW9uVmlldyk7XG5cbiAgICAgICAgY29uc3QgbWVudSA9IHdlYml4LnVpKHtcbiAgICAgICAgICAgIHZpZXc6IFwiY29udGV4dG1lbnVcIixcbiAgICAgICAgICAgIGlkOiBcInNvbHV0aW9uc19jbVwiXG4gICAgICAgIH0pO1xuXG4gICAgICAgIHRoaXMuc29sdXRpb25zVGFibGUgPSB0aGlzLiQkKFwic29sdXRpb25zX3RhYmxlXCIpO1xuICAgICAgICBzZWxmLmxvYWRTb2x1dGlvbnMoKTtcbiAgICAgICAgd2ViaXguZXh0ZW5kKHRoaXMuc29sdXRpb25zVGFibGUsIHdlYml4LlByb2dyZXNzQmFyKTtcblxuICAgICAgICBmdW5jdGlvbiBjaGVja0FjdGlvbihhY3Rpb24sIHNlbGVjdGVkSXRlbUlkKSB7XG4gICAgICAgICAgICBjb25zdCBpdGVtID0gc2VsZi5zb2x1dGlvbnNUYWJsZS5nZXRJdGVtKHNlbGVjdGVkSXRlbUlkKTtcbiAgICAgICAgICAgIGlmIChpdGVtKSB7XG4gICAgICAgICAgICAgICAgbGV0IGl0ZW1JZCA9IGl0ZW0uaWQ7XG4gICAgICAgICAgICAgICAgbGV0IHNvbHV0aW9uTmFtZSA9IGl0ZW0uc29sdXRpb25OYW1lO1xuICAgICAgICAgICAgICAgIGxldCBzb2x1dGlvblR5cGUgPSBpdGVtLnNvbHV0aW9uVHlwZTtcbiAgICAgICAgICAgICAgICBsZXQgbmV4dEFjdGlvbiA9IGl0ZW0ucmVzZXJ2YXRpb24ubmV4dF9hY3Rpb25cblxuICAgICAgICAgICAgICAgIGlmIChhY3Rpb24gPT0gJ2RlbGV0ZScpIHtcbiAgICAgICAgICAgICAgICAgICAgd2ViaXguY29uZmlybSh7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aXRsZTogXCJDYW5jZWwgU29sdXRpb25cIixcbiAgICAgICAgICAgICAgICAgICAgICAgIG9rOiBcIlllc1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgdGV4dDogYEFyZSB5b3Ugc3VyZSB5b3Ugd2FudCB0byBjYW5jZWwgJHtzb2x1dGlvbk5hbWV9P2AsXG4gICAgICAgICAgICAgICAgICAgICAgICBjYW5jZWw6IFwiTm9cIixcbiAgICAgICAgICAgICAgICAgICAgfSkudGhlbigoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxmLmRlbGV0ZVNvbHV0aW9uKHNvbHV0aW9uVHlwZSwgc29sdXRpb25OYW1lLCBpdGVtSWQpXG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgd2ViaXgubWVzc2FnZShcIllvdSBuZWVkIHRvIHNlbGVjdCBhIHNvbHV0aW9uXCIpXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICAkJChcInNvbHV0aW9uc19jbVwiKS5hdHRhY2hFdmVudChcIm9uTWVudUl0ZW1DbGlja1wiLCBmdW5jdGlvbiAoaWQpIHtcbiAgICAgICAgICAgIGNoZWNrQWN0aW9uKGlkLCBzZWxmLnNvbHV0aW9uc1RhYmxlLmdldFNlbGVjdGVkSWQoKSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHNlbGYuc29sdXRpb25zVGFibGUuYXR0YWNoRXZlbnQoXCJvbkl0ZW1EYmxDbGlja1wiLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBzZWxmLnZpZXdJdGVtKHNlbGYuc29sdXRpb25zVGFibGUuZ2V0U2VsZWN0ZWRJZCgpKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgd2ViaXguZXZlbnQoc2VsZi5zb2x1dGlvbnNUYWJsZS4kdmlldywgXCJjb250ZXh0bWVudVwiLCBmdW5jdGlvbiAoZSAvKk1vdXNlRXZlbnQqLykge1xuICAgICAgICAgICAgY29uc3QgcG9zID0gc2VsZi5zb2x1dGlvbnNUYWJsZS5sb2NhdGUoZSk7XG4gICAgICAgICAgICBpZiAocG9zKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgaXRlbSA9IHNlbGYuc29sdXRpb25zVGFibGUuZ2V0SXRlbShwb3Mucm93KTtcbiAgICAgICAgICAgICAgICBjb25zdCBhY3Rpb25zID0gWydkZWxldGUnXTtcblxuICAgICAgICAgICAgICAgIG1lbnUuY2xlYXJBbGwoKTtcbiAgICAgICAgICAgICAgICBtZW51LnBhcnNlKGFjdGlvbnMpO1xuICAgICAgICAgICAgICAgIG1lbnUuc2hvdyhlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiB3ZWJpeC5odG1sLnByZXZlbnRFdmVudChlKTtcbiAgICAgICAgfSlcblxuICAgIH1cbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NvdXJjZXMvdmlld3MvZGVwbG95ZWRTb2x1dGlvbnMvaW5kZXguanMiLCJpbXBvcnQgeyBFeHRlcm5hbFZpZXcgfSBmcm9tIFwiLi4vZXh0ZXJuYWxcIjtcblxuY29uc3QgVVJMID0gXCIvdGhyZWVib3QvZmFybW1hbmFnZW1lbnRcIjtcbmNvbnN0IFJFUVVJUkVEX1BBQ0tBR0VTID0ge1xuICAgIFwidGhyZWVib3QuZmFybW1hbmFnZW1lbnRcIjogXCJodHRwczovL2dpdGh1Yi5jb20vdGhyZWVmb2xkdGVjaC9qdW1wc2NhbGVYX3RocmVlYm90L3RyZWUvZGV2ZWxvcG1lbnQvVGhyZWVCb3RQYWNrYWdlcy90aHJlZWJvdC9mYXJtbWFuYWdlbWVudFwiXG59XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEZhcm1tYW5hZ2VtZW50VmlldyBleHRlbmRzIEV4dGVybmFsVmlldyB7XG4gICAgY29uc3RydWN0b3IoYXBwLCBuYW1lKSB7XG4gICAgICAgIHN1cGVyKGFwcCwgbmFtZSwgVVJMLCBSRVFVSVJFRF9QQUNLQUdFUyk7XG4gICAgfVxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc291cmNlcy92aWV3cy9mYXJtbWFuYWdlbWVudC9pbmRleC5qcyIsImltcG9ydCB7IEV4dGVybmFsVmlldyB9IGZyb20gXCIuLi9leHRlcm5hbFwiO1xuXG5jb25zdCBVUkwgPSBcIi90aHJlZWZvbGQvc2ltdWxhdG9yL25vdGVib29rL1wiO1xuY29uc3QgUkVRVUlSRURfUEFDS0FHRVMgPSB7XG4gICAgXCJ0aHJlZWZvbGQuc2ltdWxhdG9yXCI6IFwiaHR0cHM6Ly9naXRodWIuY29tL3RocmVlZm9sZHRlY2gvanVtcHNjYWxlWF90aHJlZWJvdC90cmVlL2RldmVsb3BtZW50L1RocmVlQm90UGFja2FnZXMvdGhyZWVmb2xkL3NpbXVsYXRvclwiXG59XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEp1cHl0ZXJWaWV3IGV4dGVuZHMgRXh0ZXJuYWxWaWV3IHtcbiAgICBjb25zdHJ1Y3RvcihhcHAsIG5hbWUpIHtcbiAgICAgICAgc3VwZXIoYXBwLCBuYW1lLCBVUkwsIFJFUVVJUkVEX1BBQ0tBR0VTKTtcbiAgICB9XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zb3VyY2VzL3ZpZXdzL2p1cHl0ZXIvaW5kZXguanMiLCJpbXBvcnQgeyBKZXRWaWV3IH0gZnJvbSBcIndlYml4LWpldFwiO1xuXG5pbXBvcnQgQXBwTG9nc1ZpZXcgZnJvbSBcIi4vYXBwTG9nc1wiO1xuaW1wb3J0IHsgbG9ncyB9IGZyb20gXCIuLi8uLi9zZXJ2aWNlcy9sb2dzXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIExvZ3NWaWV3IGV4dGVuZHMgSmV0VmlldyB7XG4gICAgY29uZmlnKCkge1xuXG4gICAgICAgIGNvbnN0IHZpZXcgPSB7XG4gICAgICAgICAgICByb3dzOiBbe1xuICAgICAgICAgICAgICAgIGNvbHM6IFtcbiAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmlldzogXCJ0ZW1wbGF0ZVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgdHlwZTogXCJoZWFkZXJcIiwgdGVtcGxhdGU6IFwiTG9nc1wiLFxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICB2aWV3OiBcImNvbWJvXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBpZDogXCJhcHBzX2NvbWJvXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBwbGFjZWhvbGRlcjogXCJDaG9vc2UgeW91ciBhcHBsaWNhdGlvblwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgYWxpZ246XCJyaWdodFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgb246IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbkNoYW5nZTogZnVuY3Rpb24gKGFwcE5hbWUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy4kc2NvcGUuc2hvdyhgL21haW4vbG9nc2ApXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuJHNjb3BlLnNob3dGb3IoYXBwTmFtZSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZpZXc6XCJidXR0b25cIiwgXG4gICAgICAgICAgICAgICAgICAgICAgICBpZDpcImJ0bl9kZWxldGVcIiwgXG4gICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZTpcIkRlbGV0ZVwiLCBcbiAgICAgICAgICAgICAgICAgICAgICAgIGNzczpcIndlYml4X2RhbmdlclwiLCBcbiAgICAgICAgICAgICAgICAgICAgICAgIGlucHV0V2lkdGg6MTIwLFxuICAgICAgICAgICAgICAgICAgICAgICAgY2xpY2s6IGZ1bmN0aW9uICgpe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuJHNjb3BlLmRlbGV0ZSgpXG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZpZXc6XCJidXR0b25cIiwgXG4gICAgICAgICAgICAgICAgICAgICAgICBpZDpcImJ0bl9kZWxldGVfYWxsXCIsIFxuICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU6XCJEZWxldGUgQWxsXCIsIFxuICAgICAgICAgICAgICAgICAgICAgICAgY3NzOlwid2ViaXhfZGFuZ2VyXCIsIFxuICAgICAgICAgICAgICAgICAgICAgICAgYWxpZ246J3JpZ2h0JyxcbiAgICAgICAgICAgICAgICAgICAgICAgIGlucHV0V2lkdGg6MTAwLFxuICAgICAgICAgICAgICAgICAgICAgICAgY2xpY2s6IGZ1bmN0aW9uICgpe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuJHNjb3BlLmRlbGV0ZV9hbGwoKVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICB7IHdpZHRoOjIwIH1cbiAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBBcHBMb2dzVmlld1xuICAgICAgICAgICAgXVxuICAgICAgICB9O1xuXG4gICAgICAgIHJldHVybiB2aWV3O1xuICAgIH1cblxuICAgIGluaXQodmlldykge1xuICAgICAgICB2aWV3LmFwcHNDb21ibyA9ICQkKFwiYXBwc19jb21ib1wiKTtcbiAgICAgICAgbG9ncy5saXN0QXBwcygpLnRoZW4oZGF0YSA9PiB7XG4gICAgICAgICAgICB2aWV3LmFwcHNDb21iby5kZWZpbmUoXCJvcHRpb25zXCIsIGRhdGEuanNvbigpKTtcbiAgICAgICAgICAgIHZpZXcuYXBwc0NvbWJvLnJlbmRlcigpO1xuICAgICAgICB9KTtcblxuICAgIH1cblxuICAgIHVybENoYW5nZSh2aWV3LCB1cmwpIHtcbiAgICAgICAgY29uc3QgYXBwTmFtZSA9IHVybFswXS5wYXJhbXMuYXBwbmFtZSwgbG9nSWQgPSB1cmxbMF0ucGFyYW1zLmxvZ2lkO1xuICAgICAgICBpZiAoYXBwTmFtZSkge1xuICAgICAgICAgICAgdGhpcy5zaG93Rm9yKGFwcE5hbWUsIGxvZ0lkKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHNob3dGb3IoYXBwTmFtZSwgbG9nSWQpIHtcbiAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgICAgICBzZWxmLmFwcExvZ3MgPSAkJChcImFwcGxvZ3NfdGFibGVcIik7XG5cbiAgICAgICAgd2ViaXgudWkoe1xuICAgICAgICAgICAgdmlldzogXCJjb250ZXh0bWVudVwiLFxuICAgICAgICAgICAgaWQ6IFwibG9nc19jbVwiLFxuICAgICAgICAgICAgZGF0YTogW1wiS2lsbFwiXVxuICAgICAgICB9KS5hdHRhY2hUbyhzZWxmLmFwcExvZ3MpO1xuXG4gICAgICAgIHdlYml4LmV4dGVuZChzZWxmLmFwcExvZ3MsIHdlYml4LlByb2dyZXNzQmFyKTtcbiAgICAgICAgc2VsZi5hcHBMb2dzLnNob3dQcm9ncmVzcyh7IGhpZGU6IGZhbHNlIH0pO1xuXG4gICAgICAgIGxvZ3MubGlzdChhcHBOYW1lLCBsb2dJZCkudGhlbihkYXRhID0+IHtcbiAgICAgICAgICAgIHNlbGYuYXBwTG9ncy5jbGVhckFsbCgpXG4gICAgICAgICAgICBzZWxmLmFwcExvZ3MucGFyc2UoZGF0YS5qc29uKClbMF0pXG4gICAgICAgICAgICBzZWxmLmFwcExvZ3Muc2hvd1Byb2dyZXNzKHsgaGlkZTogdHJ1ZSB9KTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgJCQoXCJsb2dzX2NtXCIpLmF0dGFjaEV2ZW50KFwib25NZW51SXRlbUNsaWNrXCIsIGZ1bmN0aW9uIChpZCkge1xuICAgICAgICAgICAgaWYgKGlkID09IFwiS2lsbFwiKSB7XG4gICAgICAgICAgICAgICAgc2VsZi5kZWxldGVTZWxlY3RlZChzZWxmLmFwcExvZ3MuZ2V0U2VsZWN0ZWRJZCh0cnVlKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGRlbGV0ZSgpe1xuICAgICAgICBsZXQgYXBwbmFtZSA9ICQkKFwiYXBwc19jb21ib1wiKS5nZXRWYWx1ZSgpO1xuICAgICAgICBpZihhcHBuYW1lKXtcbiAgICAgICAgICAgIHdlYml4LmNvbmZpcm0oe1xuICAgICAgICAgICAgICAgIHRpdGxlOiBcIkRlbGV0ZSBsb2dzXCIsXG4gICAgICAgICAgICAgICAgb2s6IFwiRGVsZXRlXCIsXG4gICAgICAgICAgICAgICAgY2FuY2VsOiBcIk5vXCIsXG4gICAgICAgICAgICAgICAgdGV4dDogYERlbGV0ZSAke2FwcG5hbWV9IGxvZ3M/YFxuICAgICAgICAgICAgfSkudGhlbigoKSA9PiB7XG4gICAgICAgICAgICAgICAgbG9ncy5kZWxldGUoYXBwbmFtZSkudGhlbigoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucmVmcmVzaCgpO1xuICAgICAgICAgICAgICAgICAgICB3ZWJpeC5tZXNzYWdlKHsgdHlwZTogXCJzdWNjZXNzXCIsIHRleHQ6IGAke2FwcG5hbWV9IGxvZ3MgZGVsZXRlZCBzdWNjZXNzZnVsbHlgIH0pO1xuICAgICAgICAgICAgICAgIH0pLmNhdGNoKGVycm9yID0+IHtcbiAgICAgICAgICAgICAgICAgICAgd2ViaXgubWVzc2FnZSh7IHR5cGU6IFwiZXJyb3JcIiwgdGV4dDogXCJDb3VsZCBub3QgZGVsZXRlIGxvZ3NcIiB9KTtcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1lbHNle1xuICAgICAgICAgICAgd2ViaXgubWVzc2FnZSh7IHR5cGU6IFwiZXJyb3JcIiwgdGV4dDogXCJQbGVhc2Ugc2VsZWN0IGFwcCBmb3IgZGVsZXRlXCIgfSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBkZWxldGVTZWxlY3RlZChvYmplY3RzKSB7XG4gICAgICAgIHZhciBzZWxmID0gdGhpcztcbiAgICAgICAgc2VsZi5hcHBMb2dzID0gJCQoXCJhcHBsb2dzX3RhYmxlXCIpO1xuXG4gICAgICAgIGxldCBpZHMgPSBbXVxuXG4gICAgICAgIGZvciAobGV0IG9iaiBvZiBvYmplY3RzKSB7XG4gICAgICAgICAgICBpZHMucHVzaChvYmouaWQpO1xuICAgICAgICB9XG5cbiAgICAgICAgd2ViaXguY29uZmlybSh7XG4gICAgICAgICAgICB0aXRsZTogXCJEZWxldGUgc2VsZWN0ZWQgbG9nc1wiLFxuICAgICAgICAgICAgb2s6IFwiWWVzXCIsXG4gICAgICAgICAgICBjYW5jZWw6IFwiTm9cIixcbiAgICAgICAgICAgIHRleHQ6IGBkZWxldGUgbG9ncyB3aXRoIGlkcyAke2lkcy5qb2luKFwiLCBcIil9YFxuICAgICAgICB9KS50aGVuKCgpID0+IHtcbiAgICAgICAgICAgIGxvZ3MuZGVsZXRlU2VsZWN0ZWQoaWRzKS50aGVuKCBkYXRhID0+IHtcbiAgICAgICAgICAgICAgICBzZWxmLmFwcC5yZWZyZXNoKClcbiAgICAgICAgICAgICAgICB3ZWJpeC5tZXNzYWdlKHsgdHlwZTogXCJzdWNjZXNzXCIsIHRleHQ6IFwiTG9ncyBkZWxldGVkXCIgfSk7XG4gICAgICAgICAgICB9KS5jYXRjaChlcnJvciA9PiB7XG4gICAgICAgICAgICAgICAgd2ViaXgubWVzc2FnZSh7IHR5cGU6IFwiZXJyb3JcIiwgdGV4dDogXCJDb3VsZCBub3QgZGVsZXRlIGxvZ3NcIiB9KTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGRlbGV0ZV9hbGwoKXtcbiAgICAgICAgd2ViaXguY29uZmlybSh7XG4gICAgICAgICAgICB0aXRsZTogXCJEZWxldGUgYWxsIGxvZ3NcIixcbiAgICAgICAgICAgIG9rOiBcIkRlbGV0ZVwiLFxuICAgICAgICAgICAgY2FuY2VsOiBcIk5vXCIsXG4gICAgICAgICAgICB0ZXh0OiBgRGVsZXRlIGFsbCBsb2dzP2BcbiAgICAgICAgfSkudGhlbigoKSA9PiB7XG4gICAgICAgICAgICBsb2dzLmRlbGV0ZUFsbCgpLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMucmVmcmVzaCgpO1xuICAgICAgICAgICAgICAgIHdlYml4Lm1lc3NhZ2UoeyB0eXBlOiBcInN1Y2Nlc3NcIiwgdGV4dDogYEFsbCBsb2dzIGRlbGV0ZWQgc3VjY2Vzc2Z1bGx5YCB9KTtcbiAgICAgICAgICAgIH0pLmNhdGNoKGVycm9yID0+IHtcbiAgICAgICAgICAgICAgICB3ZWJpeC5tZXNzYWdlKHsgdHlwZTogXCJlcnJvclwiLCB0ZXh0OiBcIkNvdWxkIG5vdCBkZWxldGUgbG9nc1wiIH0pO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgfSk7XG4gICAgfVxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc291cmNlcy92aWV3cy9sb2dzL2luZGV4LmpzIiwiaW1wb3J0IHsgSmV0VmlldyB9IGZyb20gXCJ3ZWJpeC1qZXRcIjtcblxuaW1wb3J0IHsgRXJyb3JWaWV3IH0gZnJvbSBcIi4uL2Vycm9ycy9kaWFsb2dcIjtcbmltcG9ydCB7IHBhY2thZ2VzIH0gZnJvbSBcIi4uLy4uL3NlcnZpY2VzL3BhY2thZ2VzXCI7XG5cbmNvbnN0IFVOS05PV05fU1RBVFVTID0gJ1Vua25vd24nO1xuXG5jb25zdCBQQUNLQUdFX1NUQVRFUyA9IFtcbiAgICB7XG4gICAgICAgIG5hbWU6IFwiSW5pdFwiLFxuICAgICAgICBhY3Rpb25zOiBbXVxuICAgIH0sXG4gICAge1xuICAgICAgICBuYW1lOiBcIkNvbmZpZ1wiLFxuICAgICAgICBhY3Rpb25zOiBbJ2luc3RhbGwnXSxcbiAgICB9LFxuICAgIHtcbiAgICAgICAgbmFtZTogXCJJbnN0YWxsZWRcIixcbiAgICAgICAgYWN0aW9uczogWydzdGFydCddXG4gICAgfSxcbiAgICB7XG4gICAgICAgIG5hbWU6IFwiUnVubmluZ1wiLFxuICAgICAgICBhY3Rpb25zOiBbXCJzdG9wXCJdXG4gICAgfSxcbiAgICB7XG4gICAgICAgIG5hbWU6IFwiSGFsdGVkXCIsXG4gICAgICAgIGFjdGlvbnM6IFtcInN0YXJ0XCIsIFwiZGlzYWJsZVwiXVxuICAgIH0sXG4gICAge1xuICAgICAgICBuYW1lOiBcIkRpc2FibGVkXCIsXG4gICAgICAgIGFjdGlvbnM6IFtcImVuYWJsZVwiXVxuICAgIH0sXG4gICAge1xuICAgICAgICBuYW1lOiBcIkVycm9yXCIsXG4gICAgICAgIGFjdGlvbnM6IFsnaW5zdGFsbCddXG4gICAgfVxuXTtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUGFja2FnZXNWaWV3IGV4dGVuZHMgSmV0VmlldyB7XG4gICAgY29uZmlnKCkge1xuICAgICAgICBjb25zdCBncmlkID0ge1xuICAgICAgICAgICAgcm93czogW3tcbiAgICAgICAgICAgICAgICAvL0hlYWRlclxuICAgICAgICAgICAgICAgIHZpZXc6IFwidGVtcGxhdGVcIixcbiAgICAgICAgICAgICAgICB0eXBlOiBcImhlYWRlclwiLFxuICAgICAgICAgICAgICAgIHRlbXBsYXRlOiBcIlBhY2thZ2VzXCIsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgeyAvL2FkZGluZyBQYWNrYWdlXG4gICAgICAgICAgICAgICAgY29sczogW3tcbiAgICAgICAgICAgICAgICAgICAgLy9zZWxlY3RvclxuICAgICAgICAgICAgICAgICAgICB2aWV3OiBcInNlbGVjdFwiLFxuICAgICAgICAgICAgICAgICAgICBpZDogJ21ldGhvZF9zZWxlY3RvcicsXG4gICAgICAgICAgICAgICAgICAgIG9wdGlvbnM6IFtcIlBhdGhcIiwgXCJHaXR1cmxcIl0sXG4gICAgICAgICAgICAgICAgICAgIHdpZHRoOiAxMDBcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIC8vdGV4dCBhcmVhXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICB2aWV3OiBcInRleHRcIixcbiAgICAgICAgICAgICAgICAgICAgaWQ6ICdwYWNrYWdlX3BhdGgnLFxuICAgICAgICAgICAgICAgICAgICBpbnB1dEFsaWduOiBcImxlZnRcIixcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIC8vc3VibWl0IGJ1dHRvblxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgdmlldzogXCJidXR0b25cIixcbiAgICAgICAgICAgICAgICAgICAgaWQ6IFwiYWRkX3BhY2thZ2VfYnV0dG9uXCIsXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlOiBcIkFkZCBwYWNrYWdlXCIsXG4gICAgICAgICAgICAgICAgICAgIGF1dG93aWR0aDogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgdHlwZTogXCJcIixcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHsgLy9EYXRhVGFibGVcbiAgICAgICAgICAgICAgICB2aWV3OiBcImRhdGF0YWJsZVwiLFxuICAgICAgICAgICAgICAgIGlkOiBcInBhY2thZ2VzX3RhYmxlXCIsXG4gICAgICAgICAgICAgICAgcmVzaXplQ29sdW1uOiB0cnVlLFxuICAgICAgICAgICAgICAgIHR5cGU6IHtcbiAgICAgICAgICAgICAgICAgICAgaGVpZ2h0OiAyMDAsXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBzY3JvbGw6IFwieHlcIixcbiAgICAgICAgICAgICAgICBhdXRvQ29uZmlnOiB0cnVlLFxuICAgICAgICAgICAgICAgIHZpZXc6IFwiZGF0YXRhYmxlXCIsXG4gICAgICAgICAgICAgICAgc2VsZWN0OiB0cnVlLFxuICAgICAgICAgICAgICAgIGNzczogXCJ3ZWJpeF9oZWFkZXJfYm9yZGVyIHdlYml4X2RhdGFfYm9yZGVyXCIsXG4gICAgICAgICAgICAgICAgb25Db250ZXh0OiB7fSxcbiAgICAgICAgICAgICAgICBjb2x1bW5zOiBbe1xuICAgICAgICAgICAgICAgICAgICBpZDogXCJpbmRleFwiLFxuICAgICAgICAgICAgICAgICAgICBoZWFkZXI6IFwiI1wiLFxuICAgICAgICAgICAgICAgICAgICBzb3J0OiBcImludFwiLFxuICAgICAgICAgICAgICAgICAgICBhdXRvd2lkdGg6IHRydWUsXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIGlkOiBcImF1dGhvclwiLFxuICAgICAgICAgICAgICAgICAgICBoZWFkZXI6IFtcIkF1dGhvclwiLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb250ZW50OiBcInNlbGVjdEZpbHRlclwiXG4gICAgICAgICAgICAgICAgICAgIH1dLFxuICAgICAgICAgICAgICAgICAgICBzb3J0OiBcInN0cmluZ1wiLFxuICAgICAgICAgICAgICAgICAgICB3aWR0aDogMjAwXG4gICAgICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgICAgICBpZDogXCJzb3VyY2VfbmFtZVwiLFxuICAgICAgICAgICAgICAgICAgICBoZWFkZXI6IFtcIk5hbWVcIiwge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29udGVudDogXCJ0ZXh0RmlsdGVyXCJcbiAgICAgICAgICAgICAgICAgICAgfV0sXG4gICAgICAgICAgICAgICAgICAgIHNvcnQ6IFwic3RyaW5nXCIsXG4gICAgICAgICAgICAgICAgICAgIHdpZHRoOiAyMDBcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgaWQ6IFwic3RhdHVzXCIsXG4gICAgICAgICAgICAgICAgICAgIGhlYWRlcjogXCJTdGF0dXNcIixcbiAgICAgICAgICAgICAgICAgICAgc29ydDogXCJzdHJpbmdcIixcbiAgICAgICAgICAgICAgICAgICAgZm9ybWF0OiAodmFsdWUpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHN0YXR1cyA9IFBBQ0tBR0VfU1RBVEVTW3ZhbHVlXTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBzdGF0dXMgJiYgc3RhdHVzLm5hbWUgfHwgVU5LTk9XTl9TVEFUVVM7XG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgICAgICBpZDogXCJwYXRoXCIsXG4gICAgICAgICAgICAgICAgICAgIGhlYWRlcjogXCJQYXRoXCIsXG4gICAgICAgICAgICAgICAgICAgIHNvcnQ6IFwic3RyaW5nXCIsXG4gICAgICAgICAgICAgICAgICAgIHdpZHRoOiA3MDBcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICBzY2hlbWU6IHtcbiAgICAgICAgICAgICAgICAgICAgJGluaXQ6IGZ1bmN0aW9uIChvYmopIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG9iai5zb3VyY2VfbmFtZSA9IG9iai5zb3VyY2UubmFtZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIG9iai5hdXRob3IgPSBvYmouc291cmNlLnRocmVlYm90O1xuICAgICAgICAgICAgICAgICAgICAgICAgb2JqLmluZGV4ID0gdGhpcy5jb3VudCgpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgXVxuICAgICAgICB9O1xuICAgICAgICByZXR1cm4gZ3JpZDtcbiAgICB9XG5cbiAgICBzaG93RXJyb3IobWVzc2FnZSkge1xuICAgICAgICB0aGlzLmVycm9yVmlldy5zaG93RXJyb3IobWVzc2FnZSk7XG4gICAgfVxuXG4gICAgaGFuZGxlUmVzdWx0KHByb21pc2UsIGNhbGxiYWNrKSB7XG4gICAgICAgIHRoaXMucGFja2FnZVRhYmxlLnNob3dQcm9ncmVzcyh7IGhpZGU6IGZhbHNlIH0pO1xuXG4gICAgICAgIHByb21pc2UudGhlbigoZGF0YSkgPT4ge1xuICAgICAgICAgICAgY29uc3QgcGFja2FnZUl0ZW0gPSBkYXRhLmpzb24oKS5wYWNrYWdlO1xuICAgICAgICAgICAgaWYgKGNhbGxiYWNrIGluc3RhbmNlb2YgRnVuY3Rpb24pIHtcbiAgICAgICAgICAgICAgICBjYWxsYmFjayhwYWNrYWdlSXRlbSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHdlYml4Lm1lc3NhZ2Uoe1xuICAgICAgICAgICAgICAgIHR5cGU6IFwic3VjY2Vzc1wiLFxuICAgICAgICAgICAgICAgIHRleHQ6IFwiVGhlIG9wZXJhdGlvbiBoYXMgYmVlZCBkb25lIHN1Y2Nlc3NmdWxseVwiXG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgdGhpcy5wYWNrYWdlVGFibGUuc2hvd1Byb2dyZXNzKHsgaGlkZTogdHJ1ZSB9KTtcbiAgICAgICAgfSkuY2F0Y2goZXJyb3IgPT4ge1xuICAgICAgICAgICAgdGhpcy5zaG93RXJyb3IoXCJFcnJvciBoYXMgaGFwcGVuZWQgZHVyaW5nIHRoaXMgb3BlcmF0aW9uOiBcIiArIGVycm9yLnJlc3BvbnNlLCBcIkVycm9yXCIpO1xuICAgICAgICAgICAgdGhpcy5wYWNrYWdlVGFibGUuc2hvd1Byb2dyZXNzKHsgaGlkZTogdHJ1ZSB9KTtcbiAgICAgICAgfSlcbiAgICB9XG5cbiAgICBhZGRQYWNrYWdlKHBhdGgsIGdpdFVybCwgaXRlbUlkKSB7XG4gICAgICAgIHRoaXMuaGFuZGxlUmVzdWx0KHBhY2thZ2VzLmFkZChwYXRoLCBnaXRVcmwpLCAoaXRlbSkgPT4ge1xuICAgICAgICAgICAgaWYgKGl0ZW1JZCkge1xuICAgICAgICAgICAgICAgIHRoaXMucGFja2FnZVRhYmxlLnVwZGF0ZUl0ZW0oaXRlbUlkLCBpdGVtKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5wYWNrYWdlVGFibGUuYWRkKGl0ZW0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBkZWxldGVQYWNrYWdlKHBhY2thZ2VOYW1lLCBpdGVtSWQpIHtcbiAgICAgICAgdGhpcy5oYW5kbGVSZXN1bHQocGFja2FnZXMuZGVsZXRlKHBhY2thZ2VOYW1lKSwgKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5wYWNrYWdlVGFibGUucmVtb3ZlKGl0ZW1JZClcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgc3RhcnRQYWNrYWdlKHBhY2thZ2VOYW1lLCBpdGVtSWQpIHtcbiAgICAgICAgdGhpcy5oYW5kbGVSZXN1bHQocGFja2FnZXMuc3RhcnQocGFja2FnZU5hbWUpLCAoaXRlbSkgPT4ge1xuICAgICAgICAgICAgdGhpcy5wYWNrYWdlVGFibGUudXBkYXRlSXRlbShpdGVtSWQsIGl0ZW0pO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBzdG9wUGFja2FnZShwYWNrYWdlTmFtZSwgaXRlbUlkKSB7XG4gICAgICAgIHRoaXMuaGFuZGxlUmVzdWx0KHBhY2thZ2VzLnN0b3AocGFja2FnZU5hbWUpLCAoaXRlbSkgPT4ge1xuICAgICAgICAgICAgdGhpcy5wYWNrYWdlVGFibGUudXBkYXRlSXRlbShpdGVtSWQsIGl0ZW0pO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBlbmFibGVQYWNrYWdlKHBhY2thZ2VOYW1lLCBpdGVtSWQpIHtcbiAgICAgICAgdGhpcy5oYW5kbGVSZXN1bHQocGFja2FnZXMuZW5hYmxlKHBhY2thZ2VOYW1lKSwgKGl0ZW0pID0+IHtcbiAgICAgICAgICAgIHRoaXMucGFja2FnZVRhYmxlLnVwZGF0ZUl0ZW0oaXRlbUlkLCBpdGVtKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgZGlzYWJsZVBhY2thZ2UocGFja2FnZU5hbWUsIGl0ZW1JZCkge1xuICAgICAgICB0aGlzLmhhbmRsZVJlc3VsdChwYWNrYWdlcy5kaXNhYmxlKHBhY2thZ2VOYW1lKSwgKGl0ZW0pID0+IHtcbiAgICAgICAgICAgIHRoaXMucGFja2FnZVRhYmxlLnVwZGF0ZUl0ZW0oaXRlbUlkLCBpdGVtKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgbG9hZFBhY2thZ2VzKCkge1xuICAgICAgICBwYWNrYWdlcy5saXN0KCkudGhlbihkYXRhID0+IHtcbiAgICAgICAgICAgIHRoaXMucGFja2FnZVRhYmxlLnBhcnNlKGRhdGEuanNvbigpLnBhY2thZ2VzKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgaW5pdCh2aWV3KSB7XG4gICAgICAgIGNvbnN0IHNlbGYgPSB0aGlzO1xuXG4gICAgICAgIHNlbGYuZXJyb3JWaWV3ID0gdGhpcy51aShFcnJvclZpZXcpO1xuXG4gICAgICAgIGNvbnN0IG1lbnUgPSB3ZWJpeC51aSh7XG4gICAgICAgICAgICB2aWV3OiBcImNvbnRleHRtZW51XCIsXG4gICAgICAgICAgICBpZDogXCJwYWNrYWdlc19jbVwiXG4gICAgICAgIH0pO1xuXG4gICAgICAgIHRoaXMucGFja2FnZVRhYmxlID0gdGhpcy4kJChcInBhY2thZ2VzX3RhYmxlXCIpO1xuICAgICAgICB3ZWJpeC5leHRlbmQodGhpcy5wYWNrYWdlVGFibGUsIHdlYml4LlByb2dyZXNzQmFyKTtcblxuICAgICAgICBmdW5jdGlvbiBjaGVja0FjdGlvbihhY3Rpb24sIHNlbGVjdGVkSXRlbUlkKSB7XG4gICAgICAgICAgICBjb25zdCBpdGVtID0gc2VsZi5wYWNrYWdlVGFibGUuZ2V0SXRlbShzZWxlY3RlZEl0ZW1JZCk7XG4gICAgICAgICAgICBpZiAoaXRlbSkge1xuICAgICAgICAgICAgICAgIGxldCBpdGVtSWQgPSBpdGVtLmlkO1xuICAgICAgICAgICAgICAgIGxldCBwYWNrYWdlTmFtZSA9IGl0ZW0ubmFtZTtcblxuICAgICAgICAgICAgICAgIGlmIChhY3Rpb24gPT0gJ2luc3RhbGwnKSB7XG4gICAgICAgICAgICAgICAgICAgIHNlbGYuYWRkUGFja2FnZShpdGVtLnBhdGgsIG51bGwsIGl0ZW1JZCk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChhY3Rpb24gPT0gJ2RlbGV0ZScpIHtcbiAgICAgICAgICAgICAgICAgICAgd2ViaXguY29uZmlybSh7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aXRsZTogXCJEZWxldGUgUGFja2FnZVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgb2s6IFwiWWVzXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICB0ZXh0OiBgQXJlIHlvdSBzdXJlIHlvdSB3YW50IHRvIGRlbGV0ZSAke3BhY2thZ2VOYW1lfT9gLFxuICAgICAgICAgICAgICAgICAgICAgICAgY2FuY2VsOiBcIk5vXCIsXG4gICAgICAgICAgICAgICAgICAgIH0pLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5kZWxldGVQYWNrYWdlKHBhY2thZ2VOYW1lLCBpdGVtSWQpXG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAvL1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoYWN0aW9uID09ICdzdGFydCcpIHtcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5zdGFydFBhY2thZ2UocGFja2FnZU5hbWUsIGl0ZW1JZClcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGFjdGlvbiA9PSAnc3RvcCcpIHtcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5zdG9wUGFja2FnZShwYWNrYWdlTmFtZSwgaXRlbUlkKVxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoYWN0aW9uID09ICdkaXNhYmxlJykge1xuICAgICAgICAgICAgICAgICAgICBzZWxmLmRpc2FibGVQYWNrYWdlKHBhY2thZ2VOYW1lLCBpdGVtSWQpXG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChhY3Rpb24gPT0gJ2VuYWJsZScpIHtcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5lbmFibGVQYWNrYWdlKHBhY2thZ2VOYW1lLCBpdGVtSWQpXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB3ZWJpeC5tZXNzYWdlKFwieW91IGhhdmUgdG8gc2VsZWN0IGEgcGFja2FnZVwiKVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgJCQoXCJhZGRfcGFja2FnZV9idXR0b25cIikuYXR0YWNoRXZlbnQoXCJvbkl0ZW1DbGlja1wiLCBmdW5jdGlvbiAoaWQpIHtcbiAgICAgICAgICAgIGxldCBwYWNha2dlTG9jYXRpb24gPSAkJChcInBhY2thZ2VfcGF0aFwiKS5nZXRWYWx1ZSgpXG4gICAgICAgICAgICBpZiAocGFjYWtnZUxvY2F0aW9uID09IFwiXCIpIHtcbiAgICAgICAgICAgICAgICBhbGVydChcInBsZWFzZSBlbnRlciBwYWNrYWdlIGxvY2F0aW9uXCIpXG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGxldCBwYWNrYWdlTWV0aG9kID0gJCQoXCJtZXRob2Rfc2VsZWN0b3JcIikuZ2V0VmFsdWUoKVxuICAgICAgICAgICAgICAgIGxldCBnaXRVcmwgPSBudWxsO1xuICAgICAgICAgICAgICAgIGxldCBwYXRoID0gbnVsbDtcbiAgICAgICAgICAgICAgICBpZiAocGFja2FnZU1ldGhvZCA9PSBcIkdpdHVybFwiKSB7XG4gICAgICAgICAgICAgICAgICAgIGdpdFVybCA9IHBhY2FrZ2VMb2NhdGlvblxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAocGFja2FnZU1ldGhvZCA9PSBcIlBhdGhcIikge1xuICAgICAgICAgICAgICAgICAgICBwYXRoID0gcGFjYWtnZUxvY2F0aW9uXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgYWxlcnQoXCJzb21ldGhpbmcgd2VudCB3cm9uZyBkdXJpbmcgc2VsZWN0aW5nIHRoZSBwYWNrYWdlIG1ldGhvZFwiKVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBzZWxmLmFkZFBhY2thZ2UocGF0aCwgZ2l0VXJsKVxuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICAkJChcInBhY2thZ2VzX2NtXCIpLmF0dGFjaEV2ZW50KFwib25NZW51SXRlbUNsaWNrXCIsIGZ1bmN0aW9uIChpZCkge1xuICAgICAgICAgICAgY2hlY2tBY3Rpb24oaWQsIHNlbGYucGFja2FnZVRhYmxlLmdldFNlbGVjdGVkSWQoKSk7XG4gICAgICAgIH0pO1xuXG5cbiAgICAgICAgd2ViaXguZXZlbnQoc2VsZi5wYWNrYWdlVGFibGUuJHZpZXcsIFwiY29udGV4dG1lbnVcIiwgZnVuY3Rpb24gKGUgLypNb3VzZUV2ZW50Ki8pIHtcbiAgICAgICAgICAgIGNvbnN0IHBvcyA9IHNlbGYucGFja2FnZVRhYmxlLmxvY2F0ZShlKTtcbiAgICAgICAgICAgIGlmIChwb3MpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBpdGVtID0gc2VsZi5wYWNrYWdlVGFibGUuZ2V0SXRlbShwb3Mucm93KTtcbiAgICAgICAgICAgICAgICBjb25zdCBhY3Rpb25zID0gWy4uLlBBQ0tBR0VfU1RBVEVTW2l0ZW0uc3RhdHVzXS5hY3Rpb25zLCAnZGVsZXRlJ107XG5cbiAgICAgICAgICAgICAgICBtZW51LmNsZWFyQWxsKCk7XG4gICAgICAgICAgICAgICAgbWVudS5wYXJzZShhY3Rpb25zKTtcbiAgICAgICAgICAgICAgICBtZW51LnNob3coZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gd2ViaXguaHRtbC5wcmV2ZW50RXZlbnQoZSk7XG4gICAgICAgIH0pXG5cbiAgICAgICAgc2VsZi5sb2FkUGFja2FnZXMoKTtcbiAgICB9XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zb3VyY2VzL3ZpZXdzL3BhY2thZ2VzL2luZGV4LmpzIiwiaW1wb3J0IHsgRXh0ZXJuYWxWaWV3IH0gZnJvbSBcIi4uL2V4dGVybmFsXCI7XG5cbmNvbnN0IFVSTCA9IFwiL3RocmVlZm9sZC9zZGtleGFtcGxlcy9ub3RlYm9vay9cIjtcbmNvbnN0IFJFUVVJUkVEX1BBQ0tBR0VTID0ge1xuICAgIFwidGhyZWVmb2xkLnNka2V4YW1wbGVzXCI6IFwiaHR0cHM6Ly9naXRodWIuY29tL3RocmVlZm9sZHRlY2gvanVtcHNjYWxlWF90aHJlZWJvdC90cmVlL2RldmVsb3BtZW50L1RocmVlQm90UGFja2FnZXMvdGhyZWVmb2xkL3Nka2V4YW1wbGVzXCJcbn1cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgSnVweXRlclZpZXcgZXh0ZW5kcyBFeHRlcm5hbFZpZXcge1xuICAgIGNvbnN0cnVjdG9yKGFwcCwgbmFtZSkge1xuICAgICAgICBzdXBlcihhcHAsIG5hbWUsIFVSTCwgUkVRVUlSRURfUEFDS0FHRVMpO1xuICAgIH1cbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NvdXJjZXMvdmlld3Mvc2RrZXhhbXBsZXMvaW5kZXguanMiLCJpbXBvcnQgeyBKZXRWaWV3IH0gZnJvbSBcIndlYml4LWpldFwiO1xuXG5cbmltcG9ydCBBZG1pbnNWaWV3IGZyb20gXCIuL2FkbWluc1wiO1xuaW1wb3J0IEdlbmVyYWxWaWV3IGZyb20gXCIuL2dlbmVyYWxcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU2V0dGluZ3NWaWV3IGV4dGVuZHMgSmV0VmlldyB7XG4gICAgY29uZmlnKCkge1xuICAgICAgICBjb25zdCB2aWV3ID0ge1xuICAgICAgICAgICAgdmlldzogXCJ0YWJ2aWV3XCIsXG4gICAgICAgICAgICBjZWxsczogW3tcbiAgICAgICAgICAgICAgICBoZWFkZXI6IFwiR2VuZXJhbFwiLFxuICAgICAgICAgICAgICAgIGJvZHk6IEdlbmVyYWxWaWV3LFxuICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIGhlYWRlcjogXCJBZG1pbmlzdHJhdG9yc1wiLFxuICAgICAgICAgICAgICAgIGJvZHk6IEFkbWluc1ZpZXdcbiAgICAgICAgICAgIH1dXG4gICAgICAgIH07XG5cbiAgICAgICAgcmV0dXJuIHZpZXc7XG4gICAgfVxuXG4gICAgaW5pdCh2aWV3KSB7XG4gICAgfVxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc291cmNlcy92aWV3cy9zZXR0aW5ncy9pbmRleC5qcyIsImltcG9ydCB7IEpldFZpZXcgfSBmcm9tIFwid2ViaXgtamV0XCI7XG5pbXBvcnQgeyBwYWNrYWdlcyB9IGZyb20gXCIuLi8uLi9zZXJ2aWNlcy93aWtpXCI7XG5cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgV2lraXNWaWV3IGV4dGVuZHMgSmV0VmlldyB7XG4gICAgY29uZmlnKCkge1xuICAgICAgICBjb25zdCB2aWV3ID0ge1xuICAgICAgICAgICAgdmlldzogXCJkYXRhdGFibGVcIixcbiAgICAgICAgICAgIGlkOiBcIndpa2lzX3RhYmxlXCIsXG4gICAgICAgICAgICByZXNpemVDb2x1bW46IHRydWUsXG4gICAgICAgICAgICBzZWxlY3Q6IHRydWUsXG4gICAgICAgICAgICBtdWx0aXNlbGVjdDogdHJ1ZSxcbiAgICAgICAgICAgIGNzczogXCJ3ZWJpeF9oZWFkZXJfYm9yZGVyIHdlYml4X2RhdGFfYm9yZGVyXCIsXG4gICAgICAgICAgICBjb2x1bW5zOiBbe1xuICAgICAgICAgICAgICAgIGlkOiBcImluZGV4XCIsXG4gICAgICAgICAgICAgICAgaGVhZGVyOiBcIiNcIixcbiAgICAgICAgICAgICAgICBzb3J0OiBcImludFwiLFxuICAgICAgICAgICAgICAgIGF1dG93aWR0aDogdHJ1ZSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgaWQ6IFwibmFtZVwiLFxuICAgICAgICAgICAgICAgIGhlYWRlcjogXCJQYWNrYWdlXCIsXG4gICAgICAgICAgICAgICAgc29ydDogXCJzdHJpbmdcIixcbiAgICAgICAgICAgICAgICB3aWR0aDogMzAwXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGlkOiBcImFjdGlvbnNcIixcbiAgICAgICAgICAgICAgICBoZWFkZXI6IFwiQWN0aW9uc1wiLFxuICAgICAgICAgICAgICAgIHNvcnQ6IFwic3RyaW5nXCIsXG4gICAgICAgICAgICAgICAgd2lkdGg6IDIwMCxcbiAgICAgICAgICAgICAgICB0ZW1wbGF0ZTpmdW5jdGlvbihvYmopeyBcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFwiPGRpdiBjbGFzcz0nd2ViaXhfZWxfYnV0dG9uJz48YnV0dG9uIGNsYXNzPSdidG5fdmlldyc+IFZpZXcgPC9idXR0b24+PC9kaXY+XCI7XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIH1dLFxuICAgICAgICAgICAgb25DbGljazp7XG4gICAgICAgICAgICAgICAgYnRuX3ZpZXc6ZnVuY3Rpb24oZXYsIGlkKXtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGl0ZW0gPSB0aGlzLmdldEl0ZW0oaWQpO1xuICAgICAgICAgICAgICAgICAgICB3aW5kb3cubG9jYXRpb24uaHJlZiA9IGAvYWRtaW4vIyEvbWFpbi93aWtpcy52aWV3P25hbWU9JHtpdGVtLm5hbWV9YFxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGF1dG9Db25maWc6IHRydWUsXG4gICAgICAgICAgICBzY2hlbWU6IHtcbiAgICAgICAgICAgICAgICAkaW5pdDogZnVuY3Rpb24gKG9iaikge1xuICAgICAgICAgICAgICAgICAgICBvYmouaW5kZXggPSB0aGlzLmNvdW50KCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgfTtcblxuICAgICAgICByZXR1cm4gdmlldztcbiAgICB9XG5cbiAgICBpbml0KHZpZXcpIHtcbiAgICAgICAgcGFja2FnZXMubGlzdCgpLnRoZW4oZGF0YSA9PiB7XG4gICAgICAgICAgICB2aWV3LnBhcnNlKGRhdGEuanNvbigpKVxuICAgICAgICB9KTtcbiAgICB9XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zb3VyY2VzL3ZpZXdzL3dpa2lzL2luZGV4LmpzIiwiaW1wb3J0IHsgSmV0VmlldyB9IGZyb20gXCJ3ZWJpeC1qZXRcIjtcblxuaW1wb3J0IHsgYW5zaVVwIH0gZnJvbSBcIi4uLy4uL2NvbW1vbi9jb2xvcnNcIjtcbmltcG9ydCB7IExFVkVMUywgU1RBVEVTLCBUWVBFUyB9IGZyb20gXCIuL2RhdGFcIjtcbmltcG9ydCB7IGRhdGVGb3JtYXR0ZXIgfSBmcm9tIFwiLi4vLi4vY29tbW9uL2Zvcm1hdHRlcnNcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQWxlcnRWaWV3IGV4dGVuZHMgSmV0VmlldyB7XG4gICAgY29uZmlnKCkge1xuICAgICAgICBjb25zdCBpbmZvID0ge1xuICAgICAgICAgICAgdmlldzogXCJmb3JtXCIsXG4gICAgICAgICAgICBpZDogXCJmb3JtXCIsXG4gICAgICAgICAgICBlbGVtZW50c0NvbmZpZzogeyBsYWJlbFdpZHRoOiAxNDAgfSxcbiAgICAgICAgICAgIGVsZW1lbnRzOiBbXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICB2aWV3OiBcInRleHRcIixcbiAgICAgICAgICAgICAgICAgICAgbGFiZWw6IFwiSURcIixcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJpZGVudGlmaWVyXCIsXG4gICAgICAgICAgICAgICAgICAgIHJlYWRvbmx5OiB0cnVlXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIHZpZXc6IFwidGV4dFwiLFxuICAgICAgICAgICAgICAgICAgICBsYWJlbDogXCJUeXBlXCIsXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiYWxlcnRfdHlwZVwiLFxuICAgICAgICAgICAgICAgICAgICByZWFkb25seTogdHJ1ZVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICB2aWV3OiBcInRleHRcIixcbiAgICAgICAgICAgICAgICAgICAgbGFiZWw6IFwiU3RhdHVzXCIsXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwic3RhdHVzXCIsXG4gICAgICAgICAgICAgICAgICAgIHJlYWRvbmx5OiB0cnVlXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIHZpZXc6IFwidGV4dFwiLFxuICAgICAgICAgICAgICAgICAgICBsYWJlbDogXCJMZXZlbFwiLFxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImxldmVsXCIsXG4gICAgICAgICAgICAgICAgICAgIHJlYWRvbmx5OiB0cnVlXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIHZpZXc6IFwidGV4dFwiLFxuICAgICAgICAgICAgICAgICAgICBsYWJlbDogXCJDb3VudFwiLFxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImNvdW50XCIsXG4gICAgICAgICAgICAgICAgICAgIHJlYWRvbmx5OiB0cnVlXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIHZpZXc6IFwidGV4dFwiLFxuICAgICAgICAgICAgICAgICAgICBsYWJlbDogXCJDYXRlZ29yeVwiLFxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImNhdFwiLFxuICAgICAgICAgICAgICAgICAgICByZWFkb25seTogdHJ1ZVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICB2aWV3OiBcInRleHRcIixcbiAgICAgICAgICAgICAgICAgICAgbGFiZWw6IFwiRmlyc3QgdGltZVwiLFxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcInRpbWVfZmlyc3RcIixcbiAgICAgICAgICAgICAgICAgICAgcmVhZG9ubHk6IHRydWVcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgdmlldzogXCJ0ZXh0XCIsXG4gICAgICAgICAgICAgICAgICAgIGxhYmVsOiBcIkxhc3QgdGltZVwiLFxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcInRpbWVfbGFzdFwiLFxuICAgICAgICAgICAgICAgICAgICByZWFkb25seTogdHJ1ZVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICB2aWV3OiBcInRleHRcIixcbiAgICAgICAgICAgICAgICAgICAgbGFiZWw6IFwiTWVzc2FnZSAocHViKVwiLFxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcInB1YmxpY1wiLFxuICAgICAgICAgICAgICAgICAgICByZWFkb25seTogdHJ1ZSxcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgXVxuICAgICAgICB9O1xuXG4gICAgICAgIGNvbnN0IHRhYiA9IHtcbiAgICAgICAgICAgIHZpZXc6IFwidGFidmlld1wiLFxuICAgICAgICAgICAgY2VsbHM6IFtcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIGhlYWRlcjogXCJJbmZvcm1hdGlvblwiLFxuICAgICAgICAgICAgICAgICAgICBib2R5OiBpbmZvLFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBoZWFkZXI6IFwiTWVzc2FnZVwiLFxuICAgICAgICAgICAgICAgICAgICBib2R5OiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZDogXCJtZXNzYWdlXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICB2aWV3OiBcInRlbXBsYXRlXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICB0ZW1wbGF0ZTogXCJcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIHNjcm9sbDogXCJhdXRvXCIsXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgaGVhZGVyOiBcIlRyYWNlYmFja3NcIixcbiAgICAgICAgICAgICAgICAgICAgYm9keToge1xuICAgICAgICAgICAgICAgICAgICAgICAgcm93czogW1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmlldzogXCJ0YWJiYXJcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWQ6IFwidGJfdGFic1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtdWx0aXZpZXc6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9wdGlvbnM6IFtdXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZpZXc6IFwibXVsdGl2aWV3XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlkOiBcInRiX3ZpZXdzXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNlbGxzOiBbXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGVtcGxhdGU6IFwiXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBpZDogXCJsb2dzXCIsXG4gICAgICAgICAgICAgICAgICAgIHZpZXc6IFwiZGF0YXRhYmxlXCIsXG4gICAgICAgICAgICAgICAgICAgIHJlc2l6ZUNvbHVtbjogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgc2VsZWN0OiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICBtdWx0aXNlbGVjdDogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgY3NzOiBcIndlYml4X2hlYWRlcl9ib3JkZXIgd2ViaXhfZGF0YV9ib3JkZXJcIixcbiAgICAgICAgICAgICAgICAgICAgc2Nyb2xsOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICBhdXRvQ29uZmlnOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICBjb2x1bW5zOiBbXG4gICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWQ6IFwiaW5kZXhcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBoZWFkZXI6IFwiI1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNvcnQ6IFwiaW50XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYXV0b3dpZHRoOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdpZHRoOiA2MFxuICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZDogXCJ0aHJlZWJvdF9uYW1lXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaGVhZGVyOiBcIlRocmVlYm90IE5hbWVcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzb3J0OiBcInN0cmluZ1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdpZHRoOiAxODBcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWQ6IFwiYXBwX25hbWVcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBoZWFkZXI6IFwiQXBwIE5hbWVcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzb3J0OiBcInN0cmluZ1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdpZHRoOiAxODBcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWQ6IFwibGF0ZXN0X2xvZ2lkXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaGVhZGVyOiBcIkxhdGVzdCBMb2cjXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc29ydDogXCJpbnRcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aWR0aDogMTgwXG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgICAgIHNjaGVtZToge1xuICAgICAgICAgICAgICAgICAgICAgICAgJGluaXQ6IGZ1bmN0aW9uIChvYmopIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvYmouaW5kZXggPSB0aGlzLmNvdW50KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgXVxuICAgICAgICB9O1xuXG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICB2aWV3OiBcIndpbmRvd1wiLFxuICAgICAgICAgICAgaGVhZDogXCJBbGVydFwiLFxuICAgICAgICAgICAgbW9kYWw6IHRydWUsXG4gICAgICAgICAgICB3aWR0aDogNjAwLFxuICAgICAgICAgICAgaGVpZ2h0OiA4MDAsXG4gICAgICAgICAgICBwb3NpdGlvbjogXCJjZW50ZXJcIixcbiAgICAgICAgICAgIGJvZHk6IHtcbiAgICAgICAgICAgICAgICByb3dzOiBbXG4gICAgICAgICAgICAgICAgICAgIHRhYixcbiAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmlldzogXCJidXR0b25cIixcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlOiBcIk9LXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBjc3M6IFwid2ViaXhfcHJpbWFyeVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgY2xpY2s6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmdldFRvcFBhcmVudFZpZXcoKS5oaWRlKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cblxuICAgIGluaXQoKSB7XG4gICAgICAgIHZhciBzZWxmID0gdGhpcztcbiAgICAgICAgdGhpcy5mb3JtID0gJCQoXCJmb3JtXCIpO1xuICAgICAgICB0aGlzLm1lc3NhZ2UgPSAkJChcIm1lc3NhZ2VcIik7XG4gICAgICAgIHRoaXMubG9ncyA9ICQkKFwibG9nc1wiKTtcblxuICAgICAgICB0aGlzLnRiVmlld3MgPSAkJChcInRiX3ZpZXdzXCIpO1xuICAgICAgICB0aGlzLnRiVGFicyA9ICQkKFwidGJfdGFic1wiKTtcblxuICAgICAgICB0aGlzLmxvZ3MuYXR0YWNoRXZlbnQoXCJvbkl0ZW1EYmxDbGlja1wiLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBsZXQgbG9nRGF0YSA9IHNlbGYubG9ncy5nZXRTZWxlY3RlZEl0ZW0oKVxuICAgICAgICAgICAgdGhpcy4kc2NvcGUuc2hvdyhgL21haW4vbG9ncz9hcHBuYW1lPSR7bG9nRGF0YS5hcHBfbmFtZX0mbG9naWQ9JHtsb2dEYXRhLmxhdGVzdF9sb2dpZH1gKVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBhZGRUcmFjZWJhY2sodGIpIHtcbiAgICAgICAgY29uc3QgdGJJZCA9IGAke3RiLnRocmVlYm90X25hbWV9XyR7dGIucHJvY2Vzc19pZH1gO1xuICAgICAgICBjb25zdCB0YlRpdGxlID0gYCR7dGIudGhyZWVib3RfbmFtZX0gLSBQSUQ6ICgke3RiLnByb2Nlc3NfaWR9KWA7XG5cbiAgICAgICAgdGhpcy50YlZpZXdzLmFkZFZpZXcoe1xuICAgICAgICAgICAgdmlldzogXCJ0ZW1wbGF0ZVwiLFxuICAgICAgICAgICAgaWQ6IHRiSWQsXG4gICAgICAgICAgICBzY3JvbGw6IFwieHlcIixcbiAgICAgICAgICAgIHRlbXBsYXRlOiBgPHA+JHthbnNpVXAuYW5zaV90b19odG1sKHRiLmZvcm1hdHRlZCl9PC9wPmBcbiAgICAgICAgfSk7XG5cbiAgICAgICAgdGhpcy50YlRhYnMuYWRkT3B0aW9uKHRiSWQsIHRiVGl0bGUsIHRydWUpO1xuICAgIH1cblxuICAgIGNsZWFyVHJhY2VCYWNrcygpIHtcbiAgICAgICAgbGV0IGlkID0gdGhpcy50YlRhYnMuZ2V0VmFsdWUoKTtcblxuICAgICAgICB3aGlsZSAoaWQpIHtcbiAgICAgICAgICAgIHRoaXMudGJUYWJzLnJlbW92ZU9wdGlvbihpZCk7XG4gICAgICAgICAgICB0aGlzLnRiVmlld3MucmVtb3ZlVmlldyhpZCk7XG5cbiAgICAgICAgICAgIGlkID0gdGhpcy50YlRhYnMuZ2V0VmFsdWUoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHNob3dGb3IoaXRlbSkge1xuICAgICAgICBsZXQgdmFsdWVzID0gT2JqZWN0LmFzc2lnbih7fSwgaXRlbSk7XG5cbiAgICAgICAgdmFsdWVzLmFsZXJ0X3R5cGUgPSBUWVBFU1tpdGVtLmFsZXJ0X3R5cGVdO1xuICAgICAgICB2YWx1ZXMuc3RhdHVzID0gU1RBVEVTW2l0ZW0uc3RhdHVzXTtcbiAgICAgICAgdmFsdWVzLmxldmVsID0gTEVWRUxTW2l0ZW0ubGV2ZWxdO1xuICAgICAgICB2YWx1ZXMudGltZV9maXJzdCA9IGRhdGVGb3JtYXR0ZXIoaXRlbS50aW1lX2ZpcnN0KTtcbiAgICAgICAgdmFsdWVzLnRpbWVfbGFzdCA9IGRhdGVGb3JtYXR0ZXIoaXRlbS50aW1lX2xhc3QpO1xuICAgICAgICB0aGlzLmZvcm0uc2V0VmFsdWVzKHZhbHVlcyk7XG5cbiAgICAgICAgdGhpcy5tZXNzYWdlLnNldEhUTUwoYDxwPiR7YW5zaVVwLmFuc2lfdG9faHRtbChpdGVtLm1lc3NhZ2UpfTwvcD5gKTtcblxuICAgICAgICB0aGlzLmNsZWFyVHJhY2VCYWNrcygpO1xuXG4gICAgICAgIGZvciAobGV0IHRiIG9mIGl0ZW0udHJhY2ViYWNrcykge1xuICAgICAgICAgICAgdGhpcy5hZGRUcmFjZWJhY2sodGIpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5sb2dzLmNsZWFyQWxsKClcbiAgICAgICAgdGhpcy5sb2dzLnBhcnNlKGl0ZW0ubG9ncyk7XG5cbiAgICAgICAgdGhpcy5nZXRSb290KCkuc2hvdygpO1xuICAgIH1cbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NvdXJjZXMvdmlld3MvYWxlcnRzL2FsZXJ0LmpzIiwiaW1wb3J0IHsgU2VydmljZSB9IGZyb20gXCIuLi9jb21tb24vYXBpXCI7XG5cbmNvbnN0IEJBU0VfVVJMID0gXCIvemVyb2JvdC9hZG1pbi9hY3RvcnMvYWRtaW5cIjtcblxuY2xhc3MgQWRtaW5TZXJ2aWNlIGV4dGVuZHMgU2VydmljZSB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHN1cGVyKEJBU0VfVVJMKTtcbiAgICB9XG5cbiAgICBsaXN0KCkge1xuICAgICAgICByZXR1cm4gdGhpcy5nZXRDYWxsKFwiYWRtaW5fbGlzdFwiKTtcbiAgICB9XG5cblxuICAgIGFkZChuYW1lKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnBvc3RDYWxsKFwiYWRtaW5fYWRkXCIsIHtcbiAgICAgICAgICAgIFwibmFtZVwiOiBuYW1lXG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGRlbGV0ZShuYW1lKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnBvc3RDYWxsKFwiYWRtaW5fZGVsZXRlXCIsIHtcbiAgICAgICAgICAgIFwibmFtZVwiOiBuYW1lXG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGdldF9leHBsb3JlcigpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0Q2FsbCgnZ2V0X2V4cGxvcmVyJyk7XG4gICAgfVxuXG4gICAgc2V0X2V4cGxvcmVyKHR5cGUpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucG9zdENhbGwoJ3NldF9leHBsb3JlcicsIHtcbiAgICAgICAgICAgIGV4cGxvcmVyX3R5cGU6IHR5cGVcbiAgICAgICAgfSlcbiAgICB9XG59XG5cbmV4cG9ydCBjb25zdCBhZG1pbiA9IG5ldyBBZG1pblNlcnZpY2UoKTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NvdXJjZXMvc2VydmljZXMvYWRtaW4uanMiLCJpbXBvcnQgeyBTZXJ2aWNlIH0gZnJvbSBcIi4uL2NvbW1vbi9hcGlcIjtcblxuY29uc3QgQkFTRV9VUkwgPSBcIi90ZmdyaWQvdGFpZ2EvYWN0b3JzL3RhaWdhXCI7XG5cblxuY2xhc3MgVGFpZ2FTZXJ2aWNlIGV4dGVuZHMgU2VydmljZSB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHN1cGVyKEJBU0VfVVJMKTtcbiAgICB9XG5cbiAgICB1c2VyQ2lyY2xlcyh1c2VybmFtZSkge1xuICAgICAgICByZXR1cm4gdGhpcy5wb3N0Q2FsbChcImdldF91c2VyX2NpcmNsZXNcIiwgeyB1c2VybmFtZTogdXNlcm5hbWUsIG91dHB1dF90eXBlOiBcImpzb25cIiB9KTtcbiAgICB9XG5cbiAgICB1c2VyU3Rvcmllcyh1c2VybmFtZSkge1xuICAgICAgICByZXR1cm4gdGhpcy5wb3N0Q2FsbChcImdldF91c2VyX3N0b3JpZXNcIiwgeyB1c2VybmFtZTogdXNlcm5hbWUsIG91dHB1dF90eXBlOiBcImpzb25cIiB9KTtcbiAgICB9XG5cbiAgICB1c2VyVGFza3ModXNlcm5hbWUpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucG9zdENhbGwoXCJnZXRfdXNlcl90YXNrc1wiLCB7IHVzZXJuYW1lOiB1c2VybmFtZSwgb3V0cHV0X3R5cGU6IFwianNvblwiIH0pO1xuICAgIH1cblxufVxuXG5cbmV4cG9ydCBjb25zdCB0YWlnYSA9IG5ldyBUYWlnYVNlcnZpY2UoKTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NvdXJjZXMvc2VydmljZXMvdGFpZ2EuanMiLCJpbXBvcnQgeyBKZXRWaWV3IH0gZnJvbSBcIndlYml4LWpldFwiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBQcm9jZXNzRGV0YWlsc1ZpZXcgZXh0ZW5kcyBKZXRWaWV3IHtcbiAgICBjb25maWcoKSB7XG4gICAgICAgIGNvbnN0IGluZm8gPSB7XG4gICAgICAgICAgICB2aWV3OiBcImZvcm1cIixcbiAgICAgICAgICAgIGlkOiBcImZvcm1cIixcbiAgICAgICAgICAgIGVsZW1lbnRzQ29uZmlnOiB7IGxhYmVsV2lkdGg6IDIwMCB9LFxuICAgICAgICAgICAgZWxlbWVudHM6IFtcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIHZpZXc6IFwidGV4dFwiLFxuICAgICAgICAgICAgICAgICAgICBsYWJlbDogXCJQcm9jZXNzXCIsXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwibmFtZVwiLFxuICAgICAgICAgICAgICAgICAgICByZWFkb25seTogdHJ1ZSxcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgdmlldzogXCJ0ZXh0XCIsXG4gICAgICAgICAgICAgICAgICAgIGxhYmVsOiBcIlBJRFwiLFxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcInBpZFwiLFxuICAgICAgICAgICAgICAgICAgICByZWFkb25seTogdHJ1ZVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICB2aWV3OiBcInRleHRcIixcbiAgICAgICAgICAgICAgICAgICAgbGFiZWw6IFwiQ21kIGxpbmVcIixcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJjbWRsaW5lXCIsXG4gICAgICAgICAgICAgICAgICAgIHJlYWRvbmx5OiB0cnVlXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICxcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIHZpZXc6IFwidGV4dFwiLFxuICAgICAgICAgICAgICAgICAgICBsYWJlbDogXCJVc2VybmFtZVwiLFxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcInVzZXJuYW1lXCIsXG4gICAgICAgICAgICAgICAgICAgIHJlYWRvbmx5OiB0cnVlXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIHZpZXc6IFwidGV4dFwiLFxuICAgICAgICAgICAgICAgICAgICBsYWJlbDogXCJNZW1vcnkgdXNhZ2UgaW4gTUJcIixcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJyc3NcIixcbiAgICAgICAgICAgICAgICAgICAgcmVhZG9ubHk6IHRydWVcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgdmlldzogXCJ0ZXh0XCIsXG4gICAgICAgICAgICAgICAgICAgIGxhYmVsOiBcIlN0YXR1c1wiLFxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcInN0YXR1c1wiLFxuICAgICAgICAgICAgICAgICAgICByZWFkb25seTogdHJ1ZVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICB2aWV3OiBcInRleHRcIixcbiAgICAgICAgICAgICAgICAgICAgbGFiZWw6IFwiQ3JlYXRpb24gdGltZVwiLFxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImNyZWF0ZV90aW1lXCIsXG4gICAgICAgICAgICAgICAgICAgIHJlYWRvbmx5OiB0cnVlXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIHZpZXc6IFwidGV4dFwiLFxuICAgICAgICAgICAgICAgICAgICBsYWJlbDogXCJDUFUgLSB1c2VyIG1vZGUgKHNlY29uZHMpXCIsXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiY3B1X3VzZXJcIixcbiAgICAgICAgICAgICAgICAgICAgcmVhZG9ubHk6IHRydWVcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgdmlldzogXCJ0ZXh0XCIsXG4gICAgICAgICAgICAgICAgICAgIGxhYmVsOiBcIkNQVSAtIGtlcm5lbCBtb2RlIChzZWNvbmRzKVwiLFxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImNwdV9zeXN0ZW1cIixcbiAgICAgICAgICAgICAgICAgICAgcmVhZG9ubHk6IHRydWVcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgdmlldzogXCJ0ZXh0XCIsXG4gICAgICAgICAgICAgICAgICAgIGxhYmVsOiBcIk51bWJlciBvZiB0aHJlYWRzXCIsXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwidGhyZWFkc1wiLFxuICAgICAgICAgICAgICAgICAgICByZWFkb25seTogdHJ1ZVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICB2aWV3OiBcInRleHRcIixcbiAgICAgICAgICAgICAgICAgICAgbGFiZWw6IFwiTnVtYmVyIG9mIGZkcyBvcGVuZWRcIixcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJmZHNcIixcbiAgICAgICAgICAgICAgICAgICAgcmVhZG9ubHk6IHRydWVcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgdmlldzogXCJ0ZXh0XCIsXG4gICAgICAgICAgICAgICAgICAgIGxhYmVsOiBcIlBhcmVudCBwcm9jZXNzIHBpZFwiLFxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcInBhcmVudF9waWRcIixcbiAgICAgICAgICAgICAgICAgICAgcmVhZG9ubHk6IHRydWVcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgdmlldzogXCJ0ZXh0XCIsXG4gICAgICAgICAgICAgICAgICAgIGxhYmVsOiBcIlBhcmVudCBwcm9jZXNzIG5hbWVcIixcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJwYXJlbnRfbmFtZVwiLFxuICAgICAgICAgICAgICAgICAgICByZWFkb25seTogdHJ1ZVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIF1cbiAgICAgICAgfTtcblxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgdmlldzogXCJ3aW5kb3dcIixcbiAgICAgICAgICAgIGhlYWQ6IFwiUHJvY2VzcyBEZXRhaWxzXCIsXG4gICAgICAgICAgICBtb2RhbDogdHJ1ZSxcbiAgICAgICAgICAgIHdpZHRoOiA2MDAsXG4gICAgICAgICAgICBoZWlnaHQ6IDgwMCxcbiAgICAgICAgICAgIHBvc2l0aW9uOiBcImNlbnRlclwiLFxuICAgICAgICAgICAgYm9keToge1xuICAgICAgICAgICAgICAgIHJvd3M6IFtcbiAgICAgICAgICAgICAgICAgICAgaW5mbyxcbiAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmlldzogXCJidXR0b25cIixcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlOiBcIk9LXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBjc3M6IFwid2ViaXhfcHJpbWFyeVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgY2xpY2s6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmdldFRvcFBhcmVudFZpZXcoKS5oaWRlKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBzaG93UHJvY2Vzc0RldGFpbHMoZGF0YSkge1xuICAgICAgICB0aGlzLmZvcm0ucGFyc2UoZGF0YSlcbiAgICAgICAgdGhpcy5nZXRSb290KCkuc2hvdygpO1xuICAgIH1cblxuICAgIGluaXQoKSB7XG4gICAgICAgIHRoaXMuZm9ybSA9ICQkKFwiZm9ybVwiKTtcbiAgICB9XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zb3VyY2VzL3ZpZXdzL2Rhc2gvcHJvY2Vzc0RldGFpbHMuanMiLCJpbXBvcnQgeyBKZXRWaWV3IH0gZnJvbSBcIndlYml4LWpldFwiO1xuXG5pbXBvcnQgeyBhbnNpVXAgfSBmcm9tIFwiLi4vLi4vY29tbW9uL2NvbG9yc1wiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBSZXNlcnZhdGlvblZpZXcgZXh0ZW5kcyBKZXRWaWV3IHtcbiAgICBjb25maWcoKSB7XG4gICAgICAgIGNvbnN0IGluZm8gPSB7XG4gICAgICAgICAgICB2aWV3OiBcImZvcm1cIixcbiAgICAgICAgICAgIGlkOiBcImZvcm1cIixcbiAgICAgICAgICAgIGVsZW1lbnRzQ29uZmlnOiB7IGxhYmVsV2lkdGg6IDE0MCB9LFxuICAgICAgICAgICAgZWxlbWVudHM6IFtcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIHZpZXc6IFwidGV4dFwiLFxuICAgICAgICAgICAgICAgICAgICBsYWJlbDogXCJJRFwiLFxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImlkXCIsXG4gICAgICAgICAgICAgICAgICAgIHJlYWRvbmx5OiB0cnVlXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIHZpZXc6IFwidGV4dFwiLFxuICAgICAgICAgICAgICAgICAgICBsYWJlbDogXCJDdXN0b21lciB0aWRcIixcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJjdXN0b21lcl90aWRcIixcbiAgICAgICAgICAgICAgICAgICAgcmVhZG9ubHk6IHRydWVcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgdmlldzogXCJ0ZXh0XCIsXG4gICAgICAgICAgICAgICAgICAgIGxhYmVsOiBcIk5leHQgYWN0aW9uXCIsXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwibmV4dF9hY3Rpb25cIixcbiAgICAgICAgICAgICAgICAgICAgcmVhZG9ubHk6IHRydWVcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgdmlldzogXCJ0ZXh0XCIsXG4gICAgICAgICAgICAgICAgICAgIGxhYmVsOiBcImV4cGlyYXRpb25cIixcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJleHBpcmF0aW9uXCIsXG4gICAgICAgICAgICAgICAgICAgIHJlYWRvbmx5OiB0cnVlXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgXVxuICAgICAgICB9O1xuXG4gICAgICAgIGNvbnN0IHRhYiA9IHtcbiAgICAgICAgICAgIHZpZXc6IFwidGFidmlld1wiLFxuICAgICAgICAgICAgaWQ6IFwidGFidmlld1wiLFxuICAgICAgICAgICAgY2VsbHM6IFtcbiAgICAgICAgICAgICAgICB7XG5cbiAgICAgICAgICAgICAgICAgICAgaGVhZGVyOiBcIk92ZXJ2aWV3XCIsXG4gICAgICAgICAgICAgICAgICAgIHJvd3M6IFtcbiAgICAgICAgICAgICAgICAgICAgICAgIGluZm8sXG4gICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmlldzogXCJsaXN0XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGFiZWw6IFwiRm9ybSBpbnB1dHNcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcIkZvcm0gaW5wdXRzXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGF0YTogW3sgXCJ0aXRsZVwiOiBcIkZvcm0gaW5wdXRzXCIgfV0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGVtcGxhdGU6IFwiPGI+ICN0aXRsZSMgPGI+XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYXV0b2hlaWdodDogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWFkb25seTogdHJ1ZVxuICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZDogXCJmb3JtSW5mb1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZpZXc6IFwibGlzdFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRlbXBsYXRlOiBcIjxiPiNrZXkjIDwvYj4gIDogICAjdmFsdWUjXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2Nyb2xsOiBcImF1dG9cIixcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgXVxuXG5cbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgaWQ6IFwibmV0d29ya3NcIixcbiAgICAgICAgICAgICAgICAgICAgaGVhZGVyOiBcIk5ldHdvcmtzXCIsXG4gICAgICAgICAgICAgICAgICAgIHZpZXc6IFwiZGF0YXRhYmxlXCIsXG4gICAgICAgICAgICAgICAgICAgIHJlc2l6ZUNvbHVtbjogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgc2VsZWN0OiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICBtdWx0aXNlbGVjdDogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgY3NzOiBcIndlYml4X2hlYWRlcl9ib3JkZXIgd2ViaXhfZGF0YV9ib3JkZXJcIixcbiAgICAgICAgICAgICAgICAgICAgc2Nyb2xsOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICBhdXRvQ29uZmlnOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICBjb2x1bW5zOiBbXG4gICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWQ6IFwiaW5kZXhcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBoZWFkZXI6IFwiI1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNvcnQ6IFwiaW50XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYXV0b3dpZHRoOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdpZHRoOiA2MFxuICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZDogXCJuZXR3b3JrX25hbWVcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBoZWFkZXI6IFwiTmFtZVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNvcnQ6IFwic3RyaW5nXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDE4MFxuICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZDogXCJpcF9yYW5nZVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhlYWRlcjogXCJJcCByYW5nZVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNvcnQ6IFwic3RyaW5nXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDE4MFxuICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZDogXCJmYXJtZXJfdGlkXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaGVhZGVyOiBcIkZhcm1lclwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNvcnQ6IFwic3RyaW5nXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDE4MFxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgICAgICBzY2hlbWU6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICRpbml0OiBmdW5jdGlvbiAob2JqKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb2JqLm5ldHdvcmtfbmFtZSA9IG9iai5uYW1lO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9iai5pcF9yYW5nZSA9IG9iai5pcHJhbmdlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9iai5mYXJtZXJfdGlkID0gb2JqLmZhcm1lcl90aWQ7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb2JqLmluZGV4ID0gdGhpcy5jb3VudCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9LCBvbjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgb25BZnRlckxvYWQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoIXRoaXMuY291bnQoKSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zaG93T3ZlcmxheShcIk5vIG5ldHdvcmtzIGluIHJlc2VydmF0aW9uXCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5oaWRlT3ZlcmxheSgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIGlkOiBcImNvbnRhaW5lcnNcIixcbiAgICAgICAgICAgICAgICAgICAgaGVhZGVyOiBcIkNvbnRhaW5lcnNcIixcbiAgICAgICAgICAgICAgICAgICAgdmlldzogXCJkYXRhdGFibGVcIixcbiAgICAgICAgICAgICAgICAgICAgcmVzaXplQ29sdW1uOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICBzZWxlY3Q6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgIG11bHRpc2VsZWN0OiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICBjc3M6IFwid2ViaXhfaGVhZGVyX2JvcmRlciB3ZWJpeF9kYXRhX2JvcmRlclwiLFxuICAgICAgICAgICAgICAgICAgICBzY3JvbGw6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgIGF1dG9Db25maWc6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgIGNvbHVtbnM6IFtcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZDogXCJpbmRleFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhlYWRlcjogXCIjXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc29ydDogXCJpbnRcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhdXRvd2lkdGg6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDYwXG4gICAgICAgICAgICAgICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWQ6IFwibm9kZV9pZFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhlYWRlcjogXCJOb2RlIGlkXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc29ydDogXCJzdHJpbmdcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhdXRvd2lkdGg6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDE4MFxuICAgICAgICAgICAgICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlkOiBcImZsaXN0XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaGVhZGVyOiBcIkZsaXN0XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc29ydDogXCJzdHJpbmdcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhdXRvd2lkdGg6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDE4MFxuICAgICAgICAgICAgICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlkOiBcImVudHJ5cG9pbnRcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBoZWFkZXI6IFwiRW50cnlwb2ludFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNvcnQ6IFwic3RyaW5nXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYXV0b3dpZHRoOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdpZHRoOiAxODBcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWQ6IFwiaHViX3VybFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhlYWRlcjogXCJIdWIgdXJsXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc29ydDogXCJzdHJpbmdcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhdXRvd2lkdGg6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDE4MFxuICAgICAgICAgICAgICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlkOiBcImludGVyYWN0aXZlXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaGVhZGVyOiBcIkludGVyYWN0aXZlXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc29ydDogXCJzdHJpbmdcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhdXRvd2lkdGg6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDE4MFxuICAgICAgICAgICAgICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlkOiBcImZhcm1lcl90aWRcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBoZWFkZXI6IFwiRmFybWVyX3RpZFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNvcnQ6IFwic3RyaW5nXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYXV0b3dpZHRoOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdpZHRoOiAxODBcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sXG5cbiAgICAgICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICAgICAgc2NoZW1lOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAkaW5pdDogZnVuY3Rpb24gKG9iaikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9iai5ub2RlX2lkID0gb2JqLm5vZGVfaWQ7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb2JqLmZsaXN0ID0gb2JqLmZsaXN0O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9iai5lbnRyeXBvaW50ID0gb2JqLmVudHJ5cG9pbnQ7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb2JqLmh1Yl91cmwgPSBvYmouaHViX3VybDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvYmouaW50ZXJhY3RpdmUgPSBvYmouaW50ZXJhY3RpdmU7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb2JqLmZhcm1lcl90aWQgPSBvYmouZmFybWVyX3RpZDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvYmouaW5kZXggPSB0aGlzLmNvdW50KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0sIG9uOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBvbkFmdGVyTG9hZDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICghdGhpcy5jb3VudCgpKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNob3dPdmVybGF5KFwiTm8gY29udGFpbmVycyBpbiByZXNlcnZhdGlvblwiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuaGlkZU92ZXJsYXkoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBpZDogXCJ2b2x1bWVzXCIsXG4gICAgICAgICAgICAgICAgICAgIGhlYWRlcjogXCJWb2x1bWVzXCIsXG4gICAgICAgICAgICAgICAgICAgIHZpZXc6IFwiZGF0YXRhYmxlXCIsXG4gICAgICAgICAgICAgICAgICAgIHJlc2l6ZUNvbHVtbjogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgc2VsZWN0OiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICBtdWx0aXNlbGVjdDogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgY3NzOiBcIndlYml4X2hlYWRlcl9ib3JkZXIgd2ViaXhfZGF0YV9ib3JkZXJcIixcbiAgICAgICAgICAgICAgICAgICAgc2Nyb2xsOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICBhdXRvQ29uZmlnOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICBjb2x1bW5zOiBbXG4gICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWQ6IFwiaW5kZXhcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBoZWFkZXI6IFwiI1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNvcnQ6IFwiaW50XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYXV0b3dpZHRoOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdpZHRoOiA2MFxuICAgICAgICAgICAgICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlkOiBcIm5vZGVfaWRcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBoZWFkZXI6IFwiTm9kZSBpZFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNvcnQ6IFwic3RyaW5nXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYXV0b3dpZHRoOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdpZHRoOiAxODBcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZDogXCJzaXplXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaGVhZGVyOiBcIlNpemVcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzb3J0OiBcInN0cmluZ1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGF1dG93aWR0aDogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aWR0aDogMTgwXG4gICAgICAgICAgICAgICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWQ6IFwidHlwZVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhlYWRlcjogXCJUeXBlXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc29ydDogXCJzdHJpbmdcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhdXRvd2lkdGg6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDE4MFxuICAgICAgICAgICAgICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlkOiBcImZhcm1lcl90aWRcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBoZWFkZXI6IFwiRmFybWVyX3RpZFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNvcnQ6IFwic3RyaW5nXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYXV0b3dpZHRoOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdpZHRoOiAxODBcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sXG5cbiAgICAgICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICAgICAgc2NoZW1lOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAkaW5pdDogZnVuY3Rpb24gKG9iaikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9iai5ub2RlX2lkID0gb2JqLm5vZGVfaWQ7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb2JqLnNpemUgPSBvYmouc2l6ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvYmoudHlwZSA9IG9iai50eXBlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9iai5mYXJtZXJfdGlkID0gb2JqLmZhcm1lcl90aWQ7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb2JqLmluZGV4ID0gdGhpcy5jb3VudCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9LCBvbjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgb25BZnRlckxvYWQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoIXRoaXMuY291bnQoKSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zaG93T3ZlcmxheShcIk5vIHZvbHVtZXMgaW4gcmVzZXJ2YXRpb25cIik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmhpZGVPdmVybGF5KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgICAgIGlkOiBcInpkYnNcIixcbiAgICAgICAgICAgICAgICAgICAgaGVhZGVyOiBcIlpkYnNcIixcbiAgICAgICAgICAgICAgICAgICAgdmlldzogXCJkYXRhdGFibGVcIixcbiAgICAgICAgICAgICAgICAgICAgcmVzaXplQ29sdW1uOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICBzZWxlY3Q6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgIG11bHRpc2VsZWN0OiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICBjc3M6IFwid2ViaXhfaGVhZGVyX2JvcmRlciB3ZWJpeF9kYXRhX2JvcmRlclwiLFxuICAgICAgICAgICAgICAgICAgICBzY3JvbGw6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgIGF1dG9Db25maWc6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgIGNvbHVtbnM6IFtcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZDogXCJpbmRleFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhlYWRlcjogXCIjXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc29ydDogXCJpbnRcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhdXRvd2lkdGg6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDYwXG4gICAgICAgICAgICAgICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWQ6IFwibm9kZV9pZFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhlYWRlcjogXCJOb2RlIGlkXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc29ydDogXCJzdHJpbmdcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhdXRvd2lkdGg6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDE4MFxuICAgICAgICAgICAgICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlkOiBcInNpemVcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBoZWFkZXI6IFwiU2l6ZVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNvcnQ6IFwic3RyaW5nXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYXV0b3dpZHRoOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdpZHRoOiAxODBcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZDogXCJkaXNrX3R5cGVcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBoZWFkZXI6IFwiRGlzayB0eXBlXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc29ydDogXCJzdHJpbmdcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhdXRvd2lkdGg6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDE4MFxuICAgICAgICAgICAgICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlkOiBcIm1vZGVcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBoZWFkZXI6IFwiTW9kZVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNvcnQ6IFwic3RyaW5nXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYXV0b3dpZHRoOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdpZHRoOiAxODBcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZDogXCJwdWJsaWNcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBoZWFkZXI6IFwicHVibGljXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc29ydDogXCJzdHJpbmdcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhdXRvd2lkdGg6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDE4MFxuICAgICAgICAgICAgICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlkOiBcImZhcm1lcl90aWRcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBoZWFkZXI6IFwiRmFybWVyX3RpZFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNvcnQ6IFwic3RyaW5nXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYXV0b3dpZHRoOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdpZHRoOiAxODBcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sXG5cbiAgICAgICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICAgICAgc2NoZW1lOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAkaW5pdDogZnVuY3Rpb24gKG9iaikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9iai5pbmRleCA9IHRoaXMuY291bnQoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSwgb246IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG9uQWZ0ZXJMb2FkOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCF0aGlzLmNvdW50KCkpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2hvd092ZXJsYXkoXCJObyB6ZGJzIGluIHJlc2VydmF0aW9uXCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5oaWRlT3ZlcmxheSgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgICAgICBpZDogXCJrdWJlcm5ldGVzXCIsXG4gICAgICAgICAgICAgICAgICAgIGhlYWRlcjogXCJLdWJlcm5ldGVzXCIsXG4gICAgICAgICAgICAgICAgICAgIHZpZXc6IFwiZGF0YXRhYmxlXCIsXG4gICAgICAgICAgICAgICAgICAgIHJlc2l6ZUNvbHVtbjogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgc2VsZWN0OiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICBtdWx0aXNlbGVjdDogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgY3NzOiBcIndlYml4X2hlYWRlcl9ib3JkZXIgd2ViaXhfZGF0YV9ib3JkZXJcIixcbiAgICAgICAgICAgICAgICAgICAgc2Nyb2xsOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICBhdXRvQ29uZmlnOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICBjb2x1bW5zOiBbXG4gICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWQ6IFwiaW5kZXhcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBoZWFkZXI6IFwiI1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNvcnQ6IFwiaW50XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYXV0b3dpZHRoOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdpZHRoOiA2MFxuICAgICAgICAgICAgICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlkOiBcIm5vZGVfaWRcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBoZWFkZXI6IFwiTm9kZSBpZFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNvcnQ6IFwic3RyaW5nXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYXV0b3dpZHRoOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdpZHRoOiAxODBcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZDogXCJzaXplXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaGVhZGVyOiBcIlNpemVcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzb3J0OiBcInN0cmluZ1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGF1dG93aWR0aDogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aWR0aDogMTgwXG4gICAgICAgICAgICAgICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWQ6IFwibmV0d29ya19pZFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhlYWRlcjogXCJOZXR3b3JrIGlkXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc29ydDogXCJzdHJpbmdcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhdXRvd2lkdGg6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDE4MFxuICAgICAgICAgICAgICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlkOiBcImlwYWRkcmVzc1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhlYWRlcjogXCJJcCBhZGRyZXNzXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc29ydDogXCJzdHJpbmdcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhdXRvd2lkdGg6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDE4MFxuICAgICAgICAgICAgICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlkOiBcIm1hc3Rlcl9pcHNfc3RyXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaGVhZGVyOiBcIk1hc3RlciBpcHNcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzb3J0OiBcInN0cmluZ1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGF1dG93aWR0aDogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aWR0aDogMTgwXG4gICAgICAgICAgICAgICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWQ6IFwiZmFybWVyX3RpZFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhlYWRlcjogXCJGYXJtZXJfdGlkXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc29ydDogXCJzdHJpbmdcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhdXRvd2lkdGg6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDE4MFxuICAgICAgICAgICAgICAgICAgICAgICAgfSxcblxuICAgICAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgICAgICBzY2hlbWU6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICRpbml0OiBmdW5jdGlvbiAob2JqKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb2JqLm1hc3Rlcl9pcHNfc3RyID0gb2JqLm1hc3Rlcl9pcHMudG9TdHJpbmcoKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9iai5pbmRleCA9IHRoaXMuY291bnQoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSwgb246IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG9uQWZ0ZXJMb2FkOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCF0aGlzLmNvdW50KCkpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2hvd092ZXJsYXkoXCJObyBrdWJlcm5ldGVzIGluIHJlc2VydmF0aW9uXCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5oaWRlT3ZlcmxheSgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSxcblxuICAgICAgICAgICAgXVxuICAgICAgICB9O1xuXG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICB2aWV3OiBcIndpbmRvd1wiLFxuICAgICAgICAgICAgaGVhZDogXCJSZXNlcnZhdGlvblwiLFxuICAgICAgICAgICAgaWQ6IFwicmVzZXJ2YXRpb25fdmlld1wiLFxuICAgICAgICAgICAgbW9kYWw6IHRydWUsXG4gICAgICAgICAgICB3aWR0aDogNjAwLFxuICAgICAgICAgICAgaGVpZ2h0OiA4MDAsXG4gICAgICAgICAgICBwb3NpdGlvbjogXCJjZW50ZXJcIixcbiAgICAgICAgICAgIGJvZHk6IHtcbiAgICAgICAgICAgICAgICByb3dzOiBbXG4gICAgICAgICAgICAgICAgICAgIHRhYixcbiAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmlldzogXCJidXR0b25cIixcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlOiBcIk9LXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBjc3M6IFwid2ViaXhfcHJpbWFyeVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgY2xpY2s6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmdldFRvcFBhcmVudFZpZXcoKS5oaWRlKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cblxuICAgIGluaXQoKSB7XG4gICAgICAgIHZhciBzZWxmID0gdGhpcztcbiAgICAgICAgdGhpcy5mb3JtID0gJCQoXCJmb3JtXCIpO1xuXG4gICAgfVxuXG5cbiAgICBzaG93Rm9yKGl0ZW0pIHtcbiAgICAgICAgbGV0IHZhbHVlcyA9IE9iamVjdC5hc3NpZ24oe30sIGl0ZW0pO1xuICAgICAgICB0aGlzLnJlc2VydmF0aW9uX3ZpZXcgPSAkJChcInJlc2VydmF0aW9uX3ZpZXdcIik7XG4gICAgICAgIHRoaXMucmVzZXJ2YXRpb25fdmlldy5nZXRIZWFkKCkuc2V0SFRNTChcIlJlc2VydmF0aW9uOiBcIiArIGl0ZW0uc29sdXRpb25OYW1lKTtcblxuICAgICAgICBsZXQgcmVzZXJ2YXRpb24gPSBpdGVtLnJlc2VydmF0aW9uXG4gICAgICAgIHZhbHVlcy5pZCA9IHJlc2VydmF0aW9uLmlkXG4gICAgICAgIHZhbHVlcy5jdXN0b21lcl90aWQgPSByZXNlcnZhdGlvbi5jdXN0b21lcl90aWRcbiAgICAgICAgdmFsdWVzLm5leHRfYWN0aW9uID0gcmVzZXJ2YXRpb24ubmV4dF9hY3Rpb25cbiAgICAgICAgdmFsdWVzLnJlc3VsdHMgPSByZXNlcnZhdGlvbi5yZXN1bHRzXG4gICAgICAgIHZhbHVlcy5leHBpcmF0aW9uID0gcmVzZXJ2YXRpb24uZGF0YV9yZXNlcnZhdGlvbi5leHBpcmF0aW9uX3Jlc2VydmF0aW9uXG5cbiAgICAgICAgdmFsdWVzLmNvbnRhaW5lcnMgPSByZXNlcnZhdGlvbi5kYXRhX3Jlc2VydmF0aW9uLmNvbnRhaW5lcnNcbiAgICAgICAgdmFsdWVzLnZvbHVtZXMgPSByZXNlcnZhdGlvbi5kYXRhX3Jlc2VydmF0aW9uLnZvbHVtZXNcbiAgICAgICAgdmFsdWVzLnpkYnMgPSByZXNlcnZhdGlvbi5kYXRhX3Jlc2VydmF0aW9uLnpkYnNcbiAgICAgICAgdmFsdWVzLm5ldHdvcmtzID0gcmVzZXJ2YXRpb24uZGF0YV9yZXNlcnZhdGlvbi5uZXR3b3Jrc1xuICAgICAgICB2YWx1ZXMua3ViZXJuZXRlcyA9IHJlc2VydmF0aW9uLmRhdGFfcmVzZXJ2YXRpb24ua3ViZXJuZXRlc1xuICAgICAgICB2YWx1ZXMuZm9ybV9pbmZvID0gaXRlbS5mb3JtX2luZm9cblxuICAgICAgICB0aGlzLmZvcm0uc2V0VmFsdWVzKHZhbHVlcyk7XG4gICAgICAgIHRoaXMuZm9ybV9pbmZvID0gJCQoXCJmb3JtSW5mb1wiKTtcbiAgICAgICAgdGhpcy5mb3JtX2luZm8uY2xlYXJBbGwoKTtcblxuICAgICAgICBsZXQgZm9ybV9saXN0ID0gW107XG4gICAgICAgIGxldCBmb3JtX2tleXMgPSBPYmplY3Qua2V5cyh2YWx1ZXMuZm9ybV9pbmZvKVxuICAgICAgICBsZXQgZm9ybV92YWx1ZXMgPSBPYmplY3QudmFsdWVzKHZhbHVlcy5mb3JtX2luZm8pXG4gICAgICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCBmb3JtX2tleXMubGVuZ3RoOyBpbmRleCsrKSB7XG4gICAgICAgICAgICBsZXQgZm9ybV9kaWN0ID0gbmV3IE9iamVjdCgpO1xuICAgICAgICAgICAgZm9ybV9kaWN0WydrZXknXSA9IGZvcm1fa2V5c1tpbmRleF07XG4gICAgICAgICAgICBmb3JtX2RpY3RbJ3ZhbHVlJ10gPSBmb3JtX3ZhbHVlc1tpbmRleF07XG4gICAgICAgICAgICBmb3JtX2xpc3QucHVzaChmb3JtX2RpY3QpXG5cbiAgICAgICAgfVxuICAgICAgICB0aGlzLmZvcm1faW5mby5wYXJzZShmb3JtX2xpc3QpO1xuXG4gICAgICAgIC8vIEFkZCBuZXR3b3JrcyB0YWIgY29udGVudFxuICAgICAgICB0aGlzLm5ldHdvcmtzID0gJCQoXCJuZXR3b3Jrc1wiKTtcbiAgICAgICAgdGhpcy5uZXR3b3Jrcy5jbGVhckFsbCgpXG4gICAgICAgIHRoaXMubmV0d29ya3MucGFyc2UodmFsdWVzLm5ldHdvcmtzKTtcblxuICAgICAgICAvLyBBZGQgY290YWluZXIgdGFiIGNvbnRlbnRcbiAgICAgICAgdGhpcy5jb250YWluZXJzID0gJCQoXCJjb250YWluZXJzXCIpO1xuICAgICAgICB0aGlzLmNvbnRhaW5lcnMuY2xlYXJBbGwoKVxuICAgICAgICB0aGlzLmNvbnRhaW5lcnMucGFyc2UodmFsdWVzLmNvbnRhaW5lcnMpO1xuXG5cbiAgICAgICAgLy8gQWRkIHZvbHVtZXMgdGFiIGNvbnRlbnRcbiAgICAgICAgdGhpcy52b2x1bWVzID0gJCQoXCJ2b2x1bWVzXCIpO1xuICAgICAgICB0aGlzLnZvbHVtZXMuY2xlYXJBbGwoKVxuICAgICAgICB0aGlzLnZvbHVtZXMucGFyc2UodmFsdWVzLnZvbHVtZXMpO1xuXG4gICAgICAgIC8vIEFkZCB6ZGIgdGFiIGNvbnRlbnRcbiAgICAgICAgdGhpcy56ZGJzID0gJCQoXCJ6ZGJzXCIpO1xuICAgICAgICB0aGlzLnpkYnMuY2xlYXJBbGwoKVxuICAgICAgICB0aGlzLnpkYnMucGFyc2UodmFsdWVzLnpkYnMpO1xuXG5cbiAgICAgICAgLy8gQWRkIGt1YmVybmV0ZXMgdGFiIGNvbnRlbnRcbiAgICAgICAgdGhpcy5rdWJlcm5ldGVzID0gJCQoXCJrdWJlcm5ldGVzXCIpO1xuICAgICAgICB0aGlzLmt1YmVybmV0ZXMuY2xlYXJBbGwoKVxuICAgICAgICB0aGlzLmt1YmVybmV0ZXMucGFyc2UodmFsdWVzLmt1YmVybmV0ZXMpO1xuXG5cbiAgICAgICAgdGhpcy5nZXRSb290KCkuc2hvdygpO1xuICAgIH1cbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NvdXJjZXMvdmlld3MvZGVwbG95ZWRTb2x1dGlvbnMvcmVzZXJ2YXRpb24uanMiLCJpbXBvcnQgeyBKZXRWaWV3IH0gZnJvbSBcIndlYml4LWpldFwiO1xuXG5pbXBvcnQgeyBkYXRlRm9ybWF0dGVyIH0gZnJvbSBcIi4uLy4uL2NvbW1vbi9mb3JtYXR0ZXJzXCI7XG5pbXBvcnQgeyBMRVZFTFMgfSBmcm9tIFwiLi4vYWxlcnRzL2RhdGFcIjtcbmltcG9ydCB7IGNyZWF0ZUZpbHRlck9wdGlvbnMgfSBmcm9tIFwiLi4vLi4vY29tbW9uL2ZpbHRlcnNcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQXBwTG9nc1ZpZXcgZXh0ZW5kcyBKZXRWaWV3IHtcbiAgICBjb25maWcoKSB7XG4gICAgICAgIHZhciBwYWdlciA9IHtcbiAgICAgICAgICAgIHZpZXc6IFwicGFnZXJcIixcbiAgICAgICAgICAgIGlkOiBcInBhZ2VyXCIsXG4gICAgICAgICAgICBzaXplOiAxMDAsXG4gICAgICAgICAgICBncm91cDogMjBcbiAgICAgICAgfTtcbiAgICAgICAgY29uc3QgYXBwbG9ncyA9IHtcbiAgICAgICAgICAgIHZpZXc6IFwiZGF0YXRhYmxlXCIsXG4gICAgICAgICAgICBpZDogXCJhcHBsb2dzX3RhYmxlXCIsXG4gICAgICAgICAgICBwYWdlcjogXCJwYWdlclwiLFxuICAgICAgICAgICAgcmVzaXplQ29sdW1uOiB0cnVlLFxuICAgICAgICAgICAgc2VsZWN0OiB0cnVlLFxuICAgICAgICAgICAgbXVsdGlzZWxlY3Q6IHRydWUsXG4gICAgICAgICAgICBjc3M6IFwid2ViaXhfaGVhZGVyX2JvcmRlciB3ZWJpeF9kYXRhX2JvcmRlclwiLFxuICAgICAgICAgICAgc2Nyb2xsOiB0cnVlLFxuICAgICAgICAgICAgYXV0b0NvbmZpZzogdHJ1ZSxcbiAgICAgICAgICAgIG9uOiB7XG4gICAgICAgICAgICAgICAgb25BZnRlckxvYWQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zb3J0KFwiZXBvY2hcIiwgXCJkZXNcIik7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubWFya1NvcnRpbmcoXCJlcG9jaFwiLCBcImRlc1wiKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuXG4gICAgICAgICAgICBjb2x1bW5zOiBbe1xuICAgICAgICAgICAgICAgIGlkOiBcImlkXCIsXG4gICAgICAgICAgICAgICAgaGVhZGVyOiBbXG4gICAgICAgICAgICAgICAgICAgIFwiTG9nI1wiLFxuICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb250ZW50OiBcInRleHRGaWx0ZXJcIlxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgc29ydDogXCJpbnRcIixcbiAgICAgICAgICAgICAgICB3aWR0aDogNTAsXG4gICAgICAgICAgICAgICAgYXV0b3dpZHRoOiB0cnVlLFxuICAgICAgICAgICAgfSxcblxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGlkOiBcImZpbGVwYXRoXCIsXG4gICAgICAgICAgICAgICAgaGVhZGVyOiBbXG4gICAgICAgICAgICAgICAgICAgIFwiUGF0aFwiLFxuICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb250ZW50OiBcInRleHRGaWx0ZXJcIlxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgc29ydDogXCJzdHJpbmdcIixcbiAgICAgICAgICAgICAgICBhdXRvd2lkdGg6IHRydWUsXG4gICAgICAgICAgICAgICAgd2lkdGg6IDE0MFxuICAgICAgICAgICAgfSxcblxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGlkOiBcImxpbmVuclwiLFxuICAgICAgICAgICAgICAgIGhlYWRlcjogW1xuICAgICAgICAgICAgICAgICAgICBcIkxpbmUubnJcIixcbiAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29udGVudDogXCJ0ZXh0RmlsdGVyXCJcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgIHNvcnQ6IFwiaW50XCIsXG4gICAgICAgICAgICAgICAgYXV0b3dpZHRoOiB0cnVlLFxuICAgICAgICAgICAgICAgIHdpZHRoOiA2MFxuICAgICAgICAgICAgfSxcblxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGlkOiBcImNvbnRleHRcIixcbiAgICAgICAgICAgICAgICBoZWFkZXI6IFtcbiAgICAgICAgICAgICAgICAgICAgXCJDb250ZXh0XCIsXG4gICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRlbnQ6IFwidGV4dEZpbHRlclwiXG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICBzb3J0OiBcInN0cmluZ1wiXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGlkOiBcIm1lc3NhZ2VcIixcbiAgICAgICAgICAgICAgICBoZWFkZXI6IFtcbiAgICAgICAgICAgICAgICAgICAgXCJNZXNzYWdlXCIsXG4gICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRlbnQ6IFwidGV4dEZpbHRlclwiXG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICBzb3J0OiBcInN0cmluZ1wiLFxuICAgICAgICAgICAgICAgIHdpZHRoOiA1MDAsXG4gICAgICAgICAgICAgICAgYXV0b3dpZHRoOiB0cnVlXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGlkOiBcImxldmVsXCIsXG4gICAgICAgICAgICAgICAgaGVhZGVyOiBbXG4gICAgICAgICAgICAgICAgICAgIFwiTGV2ZWxcIixcbiAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29udGVudDogXCJzZWxlY3RGaWx0ZXJcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIG9wdGlvbnM6IGNyZWF0ZUZpbHRlck9wdGlvbnMoTEVWRUxTKVxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgc29ydDogXCJpbnRcIixcbiAgICAgICAgICAgICAgICBmb3JtYXQ6ICh2YWx1ZSkgPT4gTEVWRUxTW3ZhbHVlXSxcbiAgICAgICAgICAgICAgICB3aWR0aDogMTAwXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGlkOiBcImVwb2NoXCIsXG4gICAgICAgICAgICAgICAgaGVhZGVyOiBbXG4gICAgICAgICAgICAgICAgICAgIFwiVGltZVwiLFxuICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb250ZW50OiBcInRleHRGaWx0ZXJcIlxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgc29ydDogXCJkYXRlXCIsXG4gICAgICAgICAgICAgICAgZm9ybWF0OiBkYXRlRm9ybWF0dGVyLFxuICAgICAgICAgICAgICAgIHdpZHRoOiAxMzBcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgaWQ6IFwicHJvY2Vzc2lkXCIsXG4gICAgICAgICAgICAgICAgaGVhZGVyOiBbXG4gICAgICAgICAgICAgICAgICAgIFwiUElEXCIsXG4gICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRlbnQ6IFwidGV4dEZpbHRlclwiXG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICBzb3J0OiBcImludFwiLFxuICAgICAgICAgICAgICAgIHdpZHRoOiA2MFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBpZDogXCJjYXRcIixcbiAgICAgICAgICAgICAgICBoZWFkZXI6IFtcbiAgICAgICAgICAgICAgICAgICAgXCJDYXRlZ29yeVwiLFxuICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb250ZW50OiBcInRleHRGaWx0ZXJcIlxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgc29ydDogXCJzdHJpbmdcIixcbiAgICAgICAgICAgICAgICB3aWR0aDogODBcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgaWQ6IFwiZGF0YVwiLFxuICAgICAgICAgICAgICAgIGhlYWRlcjogW1xuICAgICAgICAgICAgICAgICAgICBcIkRhdGFcIixcbiAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29udGVudDogXCJ0ZXh0RmlsdGVyXCJcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgIHNvcnQ6IFwic3RyaW5nXCJcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgXSxcblxuICAgICAgICB9XG5cblxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgcm93czogW1xuICAgICAgICAgICAgICAgIGFwcGxvZ3MsXG4gICAgICAgICAgICAgICAgcGFnZXJcbiAgICAgICAgICAgIF1cbiAgICAgICAgfVxuICAgIH1cblxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc291cmNlcy92aWV3cy9sb2dzL2FwcExvZ3MuanMiLCJpbXBvcnQgeyBKZXRWaWV3IH0gZnJvbSBcIndlYml4LWpldFwiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBKb2JEZXRhaWxzVmlldyBleHRlbmRzIEpldFZpZXcge1xuICAgIGNvbmZpZygpIHtcbiAgICAgICAgY29uc3QgaW5mbyA9IHtcbiAgICAgICAgICAgIHZpZXc6IFwiZm9ybVwiLFxuICAgICAgICAgICAgaWQ6IFwiZm9ybVwiLFxuICAgICAgICAgICAgZWxlbWVudHNDb25maWc6IHsgbGFiZWxXaWR0aDogMjAwIH0sXG4gICAgICAgICAgICBlbGVtZW50czogW1xuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgdmlldzogXCJ0ZXh0XCIsXG4gICAgICAgICAgICAgICAgICAgIGxhYmVsOiBcIklEXCIsXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiYWN0aW9uX2lkXCIsXG4gICAgICAgICAgICAgICAgICAgIHJlYWRvbmx5OiB0cnVlLFxuICAgICAgICAgICAgICAgIH0se1xuICAgICAgICAgICAgICAgICAgICB2aWV3OiBcInRleHRcIixcbiAgICAgICAgICAgICAgICAgICAgbGFiZWw6IFwiU3RhdGVcIixcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJzdGF0ZVwiLFxuICAgICAgICAgICAgICAgICAgICByZWFkb25seTogdHJ1ZSxcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgdmlldzogXCJ0ZXh0XCIsXG4gICAgICAgICAgICAgICAgICAgIGxhYmVsOiBcIk5hbWVcIixcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJuYW1lXCIsXG4gICAgICAgICAgICAgICAgICAgIHJlYWRvbmx5OiB0cnVlLFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICB2aWV3OiBcInRleHRcIixcbiAgICAgICAgICAgICAgICAgICAgbGFiZWw6IFwiQ2F0ZWdvcnlcIixcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJjYXRlZ29yeVwiLFxuICAgICAgICAgICAgICAgICAgICByZWFkb25seTogdHJ1ZVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAsXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICB2aWV3OiBcInRleHRcIixcbiAgICAgICAgICAgICAgICAgICAgbGFiZWw6IFwia3dhcmdzXCIsXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwia3dhcmdzXCIsXG4gICAgICAgICAgICAgICAgICAgIHJlYWRvbmx5OiB0cnVlXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIHZpZXc6IFwidGV4dFwiLFxuICAgICAgICAgICAgICAgICAgICBsYWJlbDogXCJEaWVcIixcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJkaWVcIixcbiAgICAgICAgICAgICAgICAgICAgcmVhZG9ubHk6IHRydWVcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgdmlldzogXCJ0ZXh0YXJlYVwiLFxuICAgICAgICAgICAgICAgICAgICBsYWJlbDogXCJFcnJvclwiLFxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImVycm9yXCIsXG4gICAgICAgICAgICAgICAgICAgIHJlYWRvbmx5OiB0cnVlXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIHZpZXc6IFwidGV4dFwiLFxuICAgICAgICAgICAgICAgICAgICBsYWJlbDogXCJTdGFydCB0aW1lXCIsXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwidGltZV9zdGFydFwiLFxuICAgICAgICAgICAgICAgICAgICByZWFkb25seTogdHJ1ZSxcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgdmlldzogXCJ0ZXh0XCIsXG4gICAgICAgICAgICAgICAgICAgIGxhYmVsOiBcIlN0b3AgdGltZVwiLFxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcInRpbWVfc3RvcFwiLFxuICAgICAgICAgICAgICAgICAgICByZWFkb25seTogdHJ1ZSxcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgdmlldzogXCJ0ZXh0XCIsXG4gICAgICAgICAgICAgICAgICAgIGxhYmVsOiBcIlRpbWVvdXRcIixcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJ0aW1lb3V0XCIsXG4gICAgICAgICAgICAgICAgICAgIHJlYWRvbmx5OiB0cnVlXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIHZpZXc6IFwidGV4dFwiLFxuICAgICAgICAgICAgICAgICAgICBsYWJlbDogXCJSZXN1bHRcIixcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJyZXN1bHRcIixcbiAgICAgICAgICAgICAgICAgICAgcmVhZG9ubHk6IHRydWVcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgdmlldzogXCJ0ZXh0XCIsXG4gICAgICAgICAgICAgICAgICAgIGxhYmVsOiBcIkRlcGVuZGVuY2llc1wiLFxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImRlcGVuZGVuY2llc1wiLFxuICAgICAgICAgICAgICAgICAgICByZWFkb25seTogdHJ1ZVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICB2aWV3OiBcInRleHRcIixcbiAgICAgICAgICAgICAgICAgICAgbGFiZWw6IFwiRGVidWdcIixcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJkZWJ1Z1wiLFxuICAgICAgICAgICAgICAgICAgICByZWFkb25seTogdHJ1ZVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIF1cbiAgICAgICAgfTtcblxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgdmlldzogXCJ3aW5kb3dcIixcbiAgICAgICAgICAgIGhlYWQ6IFwiV29ya2VyIERldGFpbHNcIixcbiAgICAgICAgICAgIG1vZGFsOiB0cnVlLFxuICAgICAgICAgICAgd2lkdGg6IDYwMCxcbiAgICAgICAgICAgIGhlaWdodDogODAwLFxuICAgICAgICAgICAgcG9zaXRpb246IFwiY2VudGVyXCIsXG4gICAgICAgICAgICBib2R5OiB7XG4gICAgICAgICAgICAgICAgcm93czogW1xuICAgICAgICAgICAgICAgICAgICBpbmZvLFxuICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICB2aWV3OiBcImJ1dHRvblwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU6IFwiT0tcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIGNzczogXCJ3ZWJpeF9wcmltYXJ5XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBjbGljazogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZ2V0VG9wUGFyZW50VmlldygpLmhpZGUoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIHNob3dKb2JEZXRhaWxzKGRhdGEpIHtcbiAgICAgICAgdGhpcy5mb3JtLnBhcnNlKGRhdGEpXG4gICAgICAgIHRoaXMuZ2V0Um9vdCgpLnNob3coKTtcbiAgICB9XG5cbiAgICBpbml0KCkge1xuICAgICAgICB0aGlzLmZvcm0gPSAkJChcImZvcm1cIik7XG4gICAgfVxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc291cmNlcy92aWV3cy9teWpvYnMvam9iRGV0YWlscy5qcyIsImltcG9ydCB7IEpldFZpZXcgfSBmcm9tIFwid2ViaXgtamV0XCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFdvcmtlckRldGFpbHNWaWV3IGV4dGVuZHMgSmV0VmlldyB7XG4gICAgY29uZmlnKCkge1xuICAgICAgICBjb25zdCBpbmZvID0ge1xuICAgICAgICAgICAgdmlldzogXCJmb3JtXCIsXG4gICAgICAgICAgICBpZDogXCJmb3JtXCIsXG4gICAgICAgICAgICBlbGVtZW50c0NvbmZpZzogeyBsYWJlbFdpZHRoOiAyMDAgfSxcbiAgICAgICAgICAgIGVsZW1lbnRzOiBbXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICB2aWV3OiBcInRleHRcIixcbiAgICAgICAgICAgICAgICAgICAgbGFiZWw6IFwiTmFtZVwiLFxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcIm5hbWVcIixcbiAgICAgICAgICAgICAgICAgICAgcmVhZG9ubHk6IHRydWUsXG4gICAgICAgICAgICAgICAgfSx7XG4gICAgICAgICAgICAgICAgICAgIHZpZXc6IFwidGV4dFwiLFxuICAgICAgICAgICAgICAgICAgICBsYWJlbDogXCJTdGF0ZVwiLFxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcInN0YXRlXCIsXG4gICAgICAgICAgICAgICAgICAgIHJlYWRvbmx5OiB0cnVlLFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICB2aWV3OiBcInRleHRcIixcbiAgICAgICAgICAgICAgICAgICAgbGFiZWw6IFwiSGFsdGVkXCIsXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiaGFsdFwiLFxuICAgICAgICAgICAgICAgICAgICByZWFkb25seTogdHJ1ZSxcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgdmlldzogXCJ0ZXh0XCIsXG4gICAgICAgICAgICAgICAgICAgIGxhYmVsOiBcIlBJRFwiLFxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcInBpZFwiLFxuICAgICAgICAgICAgICAgICAgICByZWFkb25seTogdHJ1ZVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAsXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICB2aWV3OiBcInRleHRcIixcbiAgICAgICAgICAgICAgICAgICAgbGFiZWw6IFwiQ3VycmVudCBqb2JcIixcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJjdXJyZW50X2pvYlwiLFxuICAgICAgICAgICAgICAgICAgICByZWFkb25seTogdHJ1ZVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICB2aWV3OiBcInRleHRcIixcbiAgICAgICAgICAgICAgICAgICAgbGFiZWw6IFwiTGFzdCB1cGRhdGVcIixcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJsYXN0X3VwZGF0ZVwiLFxuICAgICAgICAgICAgICAgICAgICByZWFkb25seTogdHJ1ZVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICB2aWV3OiBcInRleHRcIixcbiAgICAgICAgICAgICAgICAgICAgbGFiZWw6IFwiU3RhcnQgdGltZVwiLFxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcInRpbWVfc3RhcnRcIixcbiAgICAgICAgICAgICAgICAgICAgcmVhZG9ubHk6IHRydWUsXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIHZpZXc6IFwidGV4dFwiLFxuICAgICAgICAgICAgICAgICAgICBsYWJlbDogXCJUaW1lb3V0XCIsXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwidGltZW91dFwiLFxuICAgICAgICAgICAgICAgICAgICByZWFkb25seTogdHJ1ZVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICB2aWV3OiBcInRleHRcIixcbiAgICAgICAgICAgICAgICAgICAgbGFiZWw6IFwiVHlwZVwiLFxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcInR5cGVcIixcbiAgICAgICAgICAgICAgICAgICAgcmVhZG9ubHk6IHRydWVcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgdmlldzogXCJ0ZXh0XCIsXG4gICAgICAgICAgICAgICAgICAgIGxhYmVsOiBcIkVycm9yXCIsXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiZXJyb3JcIixcbiAgICAgICAgICAgICAgICAgICAgcmVhZG9ubHk6IHRydWVcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgdmlldzogXCJ0ZXh0XCIsXG4gICAgICAgICAgICAgICAgICAgIGxhYmVsOiBcIkRlYnVnXCIsXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiZGVidWdcIixcbiAgICAgICAgICAgICAgICAgICAgcmVhZG9ubHk6IHRydWVcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICBdXG4gICAgICAgIH07XG5cbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHZpZXc6IFwid2luZG93XCIsXG4gICAgICAgICAgICBoZWFkOiBcIldvcmtlciBEZXRhaWxzXCIsXG4gICAgICAgICAgICBtb2RhbDogdHJ1ZSxcbiAgICAgICAgICAgIHdpZHRoOiA2MDAsXG4gICAgICAgICAgICBoZWlnaHQ6IDgwMCxcbiAgICAgICAgICAgIHBvc2l0aW9uOiBcImNlbnRlclwiLFxuICAgICAgICAgICAgYm9keToge1xuICAgICAgICAgICAgICAgIHJvd3M6IFtcbiAgICAgICAgICAgICAgICAgICAgaW5mbyxcbiAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmlldzogXCJidXR0b25cIixcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlOiBcIk9LXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBjc3M6IFwid2ViaXhfcHJpbWFyeVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgY2xpY2s6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmdldFRvcFBhcmVudFZpZXcoKS5oaWRlKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBzaG93V29ya2VyRGV0YWlscyhkYXRhKSB7XG4gICAgICAgIHRoaXMuZm9ybS5wYXJzZShkYXRhKVxuICAgICAgICB0aGlzLmdldFJvb3QoKS5zaG93KCk7XG4gICAgfVxuXG4gICAgaW5pdCgpIHtcbiAgICAgICAgdGhpcy5mb3JtID0gJCQoXCJmb3JtXCIpO1xuICAgIH1cbn1cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zb3VyY2VzL3ZpZXdzL215am9icy93b3JrZXJEZXRhaWxzLmpzIiwiaW1wb3J0IHsgSmV0VmlldyB9IGZyb20gXCJ3ZWJpeC1qZXRcIjtcblxuaW1wb3J0IHsgaW5wdXREaWFsb2cgfSBmcm9tIFwiLi4vLi4vY29tbW9uL2RpYWxvZ3NcIjtcbmltcG9ydCB7IGFkbWluIH0gZnJvbSBcIi4uLy4uL3NlcnZpY2VzL2FkbWluXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEFkbWluc1ZpZXcgZXh0ZW5kcyBKZXRWaWV3IHtcbiAgICBjb25maWcoKSB7XG4gICAgICAgIHZhciBzZWxmID0gdGhpcztcblxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgcm93czogW3tcbiAgICAgICAgICAgICAgICBjb2xzOiBbe1xuICAgICAgICAgICAgICAgICAgICB2aWV3OiBcInRlbXBsYXRlXCIsXG4gICAgICAgICAgICAgICAgICAgIHRlbXBsYXRlOiBcIkFsbCBvZiB0aGUgZm9sbG93aW5nIDNCb3QgbmFtZXMgY2FuIGFjY2VzcyBkYXNoYm9hcmQsIHlvdSBjYW4gYWRkIG9yIHJlbW92ZSB0aGVtIGZyb20gaGVyZVwiLFxuICAgICAgICAgICAgICAgICAgICBhdXRvaGVpZ2h0OiB0cnVlLFxuICAgICAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICAgICAgbG9jYWxJZDogXCJhZGQtYWRtaW5cIixcbiAgICAgICAgICAgICAgICAgICAgdmlldzogXCJidXR0b25cIixcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU6IFwiQWRkIG5ldyBhZG1pbmlzdHJhdG9yXCIsXG4gICAgICAgICAgICAgICAgICAgIGNsaWNrOiBzZWxmLmFkZEFkbWluLmJpbmQoc2VsZiksXG4gICAgICAgICAgICAgICAgfV1cbiAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICBsb2NhbElkOiBcImFkbWlucy10YWJsZVwiLFxuICAgICAgICAgICAgICAgIHZpZXc6IFwiZGF0YXRhYmxlXCIsXG4gICAgICAgICAgICAgICAgYXV0b2hlaWdodDogdHJ1ZSxcbiAgICAgICAgICAgICAgICBjb2x1bW5zOiBbe1xuICAgICAgICAgICAgICAgICAgICBpZDogXCJuYW1lXCIsXG4gICAgICAgICAgICAgICAgICAgIHdpZHRoOiA1MDAsXG4gICAgICAgICAgICAgICAgICAgIGhlYWRlcjogW1xuICAgICAgICAgICAgICAgICAgICAgICAgXCJOYW1lXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29udGVudDogXCJ0ZXh0RmlsdGVyXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICAgICAgc29ydDogXCJzdHJpbmdcIixcbiAgICAgICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgICAgIGhlYWRlcjogXCJEZWxldGVcIixcbiAgICAgICAgICAgICAgICAgICAgdGVtcGxhdGU6IGZ1bmN0aW9uIChvYmopIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBcIjxzcGFuIGNsYXNzPSd3ZWJpeF9pY29uIG1kaSBtZGktdHJhc2gtY2FuIHdlYml4X2RhbmdlciBkZWxldGVfYWRtaW4nPjwvc3Bhbj5cIjtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1dLFxuICAgICAgICAgICAgICAgIG9uQ2xpY2s6IHtcbiAgICAgICAgICAgICAgICAgICAgZGVsZXRlX2FkbWluOiBmdW5jdGlvbiAoZSwgaWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuJHNjb3BlLmRlbGV0ZUFkbWluKGlkKTtcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgaGFuZGxlUmVzdWx0KCkge1xuXG4gICAgfVxuXG4gICAgYWRkQWRtaW4oKSB7XG4gICAgICAgIGNvbnN0IHNlbGYgPSB0aGlzO1xuXG4gICAgICAgIGlucHV0RGlhbG9nKFwiQWRkIGFkbWluXCIsIFwiM0JvdCBuYW1lXCIsIFwiQWRkXCIsIChpbnB1dCkgPT4ge1xuICAgICAgICAgICAgaWYgKGFkbWluLmFkZChpbnB1dCkpIHtcbiAgICAgICAgICAgICAgICBzZWxmLnRhYmxlLmFkZCh7IG5hbWU6IGlucHV0IH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBkZWxldGVBZG1pbihpdGVtSWQpIHtcbiAgICAgICAgY29uc3Qgc2VsZiA9IHRoaXM7XG5cbiAgICAgICAgY29uc3QgaXRlbSA9IHNlbGYudGFibGUuZ2V0SXRlbShpdGVtSWQpO1xuXG4gICAgICAgIHdlYml4LmNvbmZpcm0oe1xuICAgICAgICAgICAgdGl0bGU6IFwiRGVsZXRlIGFkbWluXCIsXG4gICAgICAgICAgICBvazogXCJZZXNcIixcbiAgICAgICAgICAgIHRleHQ6IGBBcmUgeW91IHN1cmUgeW91IHdhbnQgdG8gZGVsZXRlIFwiJHtpdGVtLm5hbWV9XCI/YCxcbiAgICAgICAgICAgIGNhbmNlbDogXCJOb1wiLFxuICAgICAgICB9KS50aGVuKCgpID0+IHtcbiAgICAgICAgICAgIGlmIChhZG1pbi5kZWxldGUoaXRlbS5uYW1lKSkge1xuICAgICAgICAgICAgICAgIHNlbGYudGFibGUucmVtb3ZlKGl0ZW1JZCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGluaXQoKSB7XG4gICAgICAgIHRoaXMudGFibGUgPSB0aGlzLiQkKFwiYWRtaW5zLXRhYmxlXCIpO1xuXG4gICAgICAgIGFkbWluLmxpc3QoKS50aGVuKGRhdGEgPT4ge1xuICAgICAgICAgICAgdGhpcy50YWJsZS5wYXJzZShkYXRhLmpzb24oKSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIC8vd2ViaXguZXh0ZW5kKHRoaXMudGFibGUsIHdlYml4LlByb2dyZXNzQmFyKTtcbiAgICB9XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zb3VyY2VzL3ZpZXdzL3NldHRpbmdzL2FkbWlucy5qcyIsImltcG9ydCB7IEpldFZpZXcgfSBmcm9tIFwid2ViaXgtamV0XCI7XG5cbmltcG9ydCB7IGFkbWluIH0gZnJvbSBcIi4uLy4uL3NlcnZpY2VzL2FkbWluXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEdlbmVyYWxWaWV3IGV4dGVuZHMgSmV0VmlldyB7XG4gICAgY29uZmlnKCkge1xuXG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBsb2NhbElkOiBcImdlbmVyYWxfZm9ybVwiLFxuICAgICAgICAgICAgdmlldzogXCJmb3JtXCIsXG4gICAgICAgICAgICBlbGVtZW50czogW1xuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgdmlldzogXCJyaWNoc2VsZWN0XCIsXG4gICAgICAgICAgICAgICAgICAgIGlkOiBcImV4cGxvcmVyX2xpc3RcIixcbiAgICAgICAgICAgICAgICAgICAgbGFiZWw6IFwiRXhwbG9yZXJcIixcbiAgICAgICAgICAgICAgICAgICAgbGFiZWxXaWR0aDogMTUwLFxuICAgICAgICAgICAgICAgICAgICB2YWx1ZTogXCJ0ZXN0bmV0XCIsXG4gICAgICAgICAgICAgICAgICAgIHlDb3VudDogMixcbiAgICAgICAgICAgICAgICAgICAgb3B0aW9uczogW1xuICAgICAgICAgICAgICAgICAgICAgICAgeyBpZDogXCJ0ZXN0bmV0XCIsIHZhbHVlOiBcIlRlc3QgTmV0XCIgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHsgaWQ6IFwibWFpblwiLCB2YWx1ZTogXCJNYWluXCIgfSxcbiAgICAgICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBsb2NhbElkOiBcImV4cGxvcmVyX2FkZHJlc3NcIixcbiAgICAgICAgICAgICAgICAgICAgdmlldzogXCJ0ZXh0XCIsXG4gICAgICAgICAgICAgICAgICAgIHR5cGU6IFwidGV4dFwiLFxuICAgICAgICAgICAgICAgICAgICByZWFkb25seTogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgbGFiZWw6IFwiRXhwbG9yZXIgYWRkcmVzc1wiLFxuICAgICAgICAgICAgICAgICAgICBsYWJlbFdpZHRoOiAxNTAsXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIF1cbiAgICAgICAgfVxuXG4gICAgfVxuXG4gICAgZG9BY3Rpb24ocHJvbWlzZSwgY2FsbGJhY2spIHtcbiAgICAgICAgdGhpcy5mb3JtLnNob3dQcm9ncmVzcygpXG4gICAgICAgIHByb21pc2UudGhlbigoZGF0YSkgPT4ge1xuICAgICAgICAgICAgaWYgKGNhbGxiYWNrKSB7XG4gICAgICAgICAgICAgICAgY2FsbGJhY2soZGF0YSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhkYXRhKTtcbiAgICAgICAgICAgIHRoaXMuZm9ybS5zaG93UHJvZ3Jlc3MoeyBoaWRlOiB0cnVlIH0pO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBpbml0KCkge1xuICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XG5cbiAgICAgICAgc2VsZi5mb3JtID0gc2VsZi4kJCgnZ2VuZXJhbF9mb3JtJyk7XG4gICAgICAgIHdlYml4LmV4dGVuZChzZWxmLmZvcm0sIHdlYml4LlByb2dyZXNzQmFyKTtcblxuICAgICAgICBzZWxmLmV4cGxvcmVyTGlzdCA9IHNlbGYuJCQoJ2V4cGxvcmVyX2xpc3QnKTtcbiAgICAgICAgc2VsZi5leHBsb3JlckFkZHJlc3MgPSBzZWxmLiQkKCdleHBsb3Jlcl9hZGRyZXNzJyk7XG5cblxuICAgICAgICBzZWxmLmRvQWN0aW9uKGFkbWluLmdldF9leHBsb3JlcigpLCAoZGF0YSkgPT4ge1xuICAgICAgICAgICAgY29uc3QgZXhwbG9yZXIgPSBkYXRhLmpzb24oKTtcbiAgICAgICAgICAgIHNlbGYuZXhwbG9yZXJMaXN0LnNldFZhbHVlKGV4cGxvcmVyLnR5cGUpO1xuICAgICAgICAgICAgc2VsZi5leHBsb3JlckFkZHJlc3Muc2V0VmFsdWUoZXhwbG9yZXIudXJsKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgc2VsZi5leHBsb3Jlckxpc3QuYXR0YWNoRXZlbnQoXCJvbkNoYW5nZVwiLCAobmV3VmFsdWUpID0+IHtcbiAgICAgICAgICAgIHNlbGYuZG9BY3Rpb24oYWRtaW4uc2V0X2V4cGxvcmVyKG5ld1ZhbHVlLnRvTG93ZXJDYXNlKCkpLCAoZGF0YSkgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IGV4cGxvcmVyID0gZGF0YS5qc29uKCk7XG4gICAgICAgICAgICAgICAgc2VsZi5leHBsb3JlckFkZHJlc3Muc2V0VmFsdWUoZXhwbG9yZXIudXJsKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcblxuXG4gICAgfVxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc291cmNlcy92aWV3cy9zZXR0aW5ncy9nZW5lcmFsLmpzIiwiZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZUZpbHRlck9wdGlvbnMob2JqKSB7XG4gICAgLy8gcmV0dXJucyBhIG5ldyBvYmplY3QgYXMge2lkOiB2YWx1ZX0sIHVzZWQgYXMgZGF0YSB0YWJsZSBmaWx0ZXIgb3B0aW9uc1xuICAgIC8vIG9iajogY2FuIGJlIGFuIGFycmF5IG9yIGEgbWFwcGluZyBvYmplY3RcblxuICAgIGlmIChvYmogaW5zdGFuY2VvZiBBcnJheSkge1xuICAgICAgICByZXR1cm4gb2JqLm1hcCgodmFsdWUsIGluZGV4KSA9PiB7XG4gICAgICAgICAgICByZXR1cm4geyBpZDogaW5kZXgsIHZhbHVlOiB2YWx1ZSB9XG4gICAgICAgIH0pO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIC8vIGFzc3VtZSBpdCdzIGp1c3QgYSBtYXBwaW5nIG90aGVyd2lzZVxuICAgICAgICByZXR1cm4gT2JqZWN0LmtleXMob2JqKS5tYXAoa2V5ID0+IHtcbiAgICAgICAgICAgIHJldHVybiB7IGlkOiBrZXksIHZhbHVlOiBvYmpba2V5XSB9XG4gICAgICAgIH0pO1xuICAgIH1cblxuXG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zb3VyY2VzL2NvbW1vbi9maWx0ZXJzLmpzIiwiaW1wb3J0IHsgU2VydmljZSB9IGZyb20gXCIuLi9jb21tb24vYXBpXCI7XG5cbmNvbnN0IEJBU0VfVVJMID0gXCIvemVyb2JvdC9hZG1pbi9hY3RvcnMvcGFja2FnZV9tYW5hZ2VyXCI7XG5cblxuY2xhc3MgUGFja2FnZXNTZXJ2aWNlIGV4dGVuZHMgU2VydmljZSB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHN1cGVyKEJBU0VfVVJMKTtcbiAgICB9XG5cbiAgICBnZXRTdGF0dXMobmFtZXMpIHtcbiAgICAgICAgLy8gcG9zdCBjYWxsIHRvIHNlbmQgYXJncyBhcyBqc29uXG4gICAgICAgIHJldHVybiB0aGlzLnBvc3RDYWxsKFwicGFja2FnZXNfZ2V0X3N0YXR1c1wiLCB7XG4gICAgICAgICAgICBuYW1lczogbmFtZXNcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgbGlzdChvcHRzKSB7XG4gICAgICAgIG9wdHMgPSBvcHRzIHx8IHt9O1xuICAgICAgICByZXR1cm4gdGhpcy5nZXRDYWxsKFwicGFja2FnZXNfbGlzdFwiKTtcbiAgICB9XG5cbiAgICBhZGQocGF0aCwgZ2l0VXJsKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnBvc3RDYWxsKFwicGFja2FnZV9hZGRcIiwge1xuICAgICAgICAgICAgcGF0aDogcGF0aCxcbiAgICAgICAgICAgIGdpdF91cmw6IGdpdFVybFxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBkZWxldGUocGFja2FnZU5hbWUpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucG9zdENhbGwoXCJwYWNrYWdlX2RlbGV0ZVwiLCB7IG5hbWU6IHBhY2thZ2VOYW1lIH0pO1xuXG4gICAgfVxuXG4gICAgc3RhcnQocGFja2FnZU5hbWUpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucG9zdENhbGwoXCJwYWNrYWdlX3N0YXJ0XCIsIHsgbmFtZTogcGFja2FnZU5hbWUgfSk7XG4gICAgfVxuXG4gICAgc3RvcChwYWNrYWdlTmFtZSkge1xuICAgICAgICByZXR1cm4gdGhpcy5wb3N0Q2FsbChcInBhY2thZ2Vfc3RvcFwiLCB7IG5hbWU6IHBhY2thZ2VOYW1lIH0pO1xuXG4gICAgfVxuXG4gICAgZGlzYWJsZShwYWNrYWdlTmFtZSkge1xuICAgICAgICByZXR1cm4gdGhpcy5wb3N0Q2FsbChcInBhY2thZ2VfZGlzYWJsZVwiLCB7IG5hbWU6IHBhY2thZ2VOYW1lIH0pO1xuXG4gICAgfVxuXG4gICAgZW5hYmxlKHBhY2thZ2VOYW1lKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnBvc3RDYWxsKFwicGFja2FnZV9lbmFibGVcIiwgeyBuYW1lOiBwYWNrYWdlTmFtZSB9KTtcbiAgICB9XG59XG5cblxuZXhwb3J0IGNvbnN0IHBhY2thZ2VzID0gbmV3IFBhY2thZ2VzU2VydmljZSgpO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc291cmNlcy9zZXJ2aWNlcy9wYWNrYWdlcy5qcyIsImltcG9ydCB7IEpldFZpZXcgfSBmcm9tIFwid2ViaXgtamV0XCI7XG5pbXBvcnQgeyBoZWFsdGggfSBmcm9tIFwiLi4vLi4vc2VydmljZXMvaGVhbHRoXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIERpc2tTcGFjZVZpZXcgZXh0ZW5kcyBKZXRWaWV3IHtcbiAgICBjb25maWcoKSB7XG4gICAgICAgIGNvbnN0IGRpc2tTcGFjZSA9IHtcbiAgICAgICAgICAgIGlkOiBcImRpc2tTcGFjZVwiLFxuICAgICAgICAgICAgcmVzcG9uc2l2ZTogdHJ1ZSxcbiAgICAgICAgICAgIHZpZXc6IFwibGlzdFwiLFxuICAgICAgICAgICAgdHlwZToge1xuICAgICAgICAgICAgICAgIGhlaWdodDogNjAsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgdGVtcGxhdGU6IGBcbiAgICAgICAgICAgIDxwPjxmb250IHNpemU9XCIzXCI+PGI+I2tleSM6IDwvYj48L2ZvbnQ+IDxmb250IHNpemU9XCIzXCI+I3ZhbHVlIzwvZm9udD48L3A+XG4gICAgICAgICAgICBgXG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgdHlwZTogXCJzcGFjZVwiLFxuICAgICAgICAgICAgcm93czogW3tcbiAgICAgICAgICAgICAgICB0ZW1wbGF0ZTogXCI8ZGl2IHN0eWxlPSd3aWR0aDphdXRvO3RleHQtYWxpZ246Y2VudGVyJz48aDM+RGlzayBTcGFjZTxoMy8+PC9kaXY+XCIsXG4gICAgICAgICAgICAgICAgaGVpZ2h0OiA1MFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBkaXNrU3BhY2VcbiAgICAgICAgICAgIF1cbiAgICAgICAgfVxuICAgIH1cblxuXG4gICAgaW5pdCgpIHtcbiAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xuXG4gICAgICAgIHRoaXMuZGlza0luZm8gPSB0aGlzLiQkKFwiZGlza1NwYWNlXCIpO1xuXG4gICAgICAgIGhlYWx0aC5nZXREaXNrU3BhY2UoKS50aGVuKGRhdGEgPT4ge1xuICAgICAgICAgICAgZGF0YSA9IGRhdGEuanNvbigpO1xuXG4gICAgICAgICAgICBzZWxmLmRpc2tJbmZvLmFkZCh7XG4gICAgICAgICAgICAgICAga2V5OiBcIlVzZWRcIixcbiAgICAgICAgICAgICAgICB2YWx1ZTogZGF0YS51c2VkICsgXCIgR0JcIlxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBzZWxmLmRpc2tJbmZvLmFkZCh7XG4gICAgICAgICAgICAgICAga2V5OiBcIkZyZWVcIixcbiAgICAgICAgICAgICAgICB2YWx1ZTogZGF0YS5mcmVlICsgXCIgR0JcIlxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBzZWxmLmRpc2tJbmZvLmFkZCh7XG4gICAgICAgICAgICAgICAga2V5OiBcIlRvdGFsXCIsXG4gICAgICAgICAgICAgICAgdmFsdWU6IGRhdGEudG90YWwgKyBcIiBHQlwiXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHNlbGYuZGlza0luZm8uYWRkKHtcbiAgICAgICAgICAgICAgICBrZXk6IFwiUGVyY2VudFwiLFxuICAgICAgICAgICAgICAgIHZhbHVlOiBkYXRhLnBlcmNlbnQgKyBcIiAlXCJcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9XG5cbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NvdXJjZXMvdmlld3MvZGFzaC9kaXNrU3BhY2UuanMiLCJpbXBvcnQgeyBKZXRWaWV3IH0gZnJvbSBcIndlYml4LWpldFwiO1xuaW1wb3J0IHsgaGVhbHRoIH0gZnJvbSBcIi4uLy4uL3NlcnZpY2VzL2hlYWx0aFwiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBoZWFsdGhJbmZvVmlldyBleHRlbmRzIEpldFZpZXcge1xuICAgIGNvbmZpZygpIHtcbiAgICAgICAgY29uc3QgaGVhbHRoSW5mbyA9IHtcbiAgICAgICAgICAgIGlkOiBcImhlYWx0aEluZm9cIixcbiAgICAgICAgICAgIHJlc3BvbnNpdmU6IHRydWUsXG4gICAgICAgICAgICB2aWV3OiBcImxpc3RcIixcbiAgICAgICAgICAgIHJlc3BvbnNpdmU6IHRydWUsXG4gICAgICAgICAgICB0eXBlOiB7XG4gICAgICAgICAgICAgICAgaGVpZ2h0OiA2MCxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB0ZW1wbGF0ZTogYFxuICAgICAgICAgICAgPHA+PGZvbnQgc2l6ZT1cIjNcIj48Yj4ja2V5IzogPC9iPjwvZm9udD4gI3ZhbHVlIzwvcD5cbiAgICAgICAgICAgIGBcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICB0eXBlOiBcInNwYWNlXCIsXG4gICAgICAgICAgICByb3dzOiBbe1xuICAgICAgICAgICAgICAgIHRlbXBsYXRlOiBcIjxkaXYgc3R5bGU9J3dpZHRoOmF1dG87dGV4dC1hbGlnbjpjZW50ZXInPjxoMz5IZWFsdGggQ2hlY2tzPGgzLz48L2Rpdj5cIixcbiAgICAgICAgICAgICAgICBoZWlnaHQ6IDUwXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIGhlYWx0aEluZm9dXG4gICAgICAgIH1cbiAgICB9XG4gICAgaW5pdCh2aWV3KSB7XG4gICAgICAgIHZhciBzZWxmID0gdGhpcztcblxuICAgICAgICB0aGlzLmhlYWx0aEluZm8gPSB0aGlzLiQkKFwiaGVhbHRoSW5mb1wiKTtcblxuICAgICAgICBoZWFsdGguZ2V0SGVhbHRoKCkudGhlbihkYXRhID0+IHtcbiAgICAgICAgICAgIGRhdGEgPSBkYXRhLmpzb24oKTtcblxuICAgICAgICAgICAgaWYgKGRhdGEuYmNkYiA9PT0gXCJPS1wiKSB7XG4gICAgICAgICAgICAgICAgc2VsZi5oZWFsdGhJbmZvLmFkZCh7XG4gICAgICAgICAgICAgICAgICAgIGtleTogXCJCQ0RCIFN0YXR1c1wiLFxuICAgICAgICAgICAgICAgICAgICB2YWx1ZTogYDxzcGFuIGNsYXNzPSd3ZWJpeF9pY29uIHd4aS1jaGVja2JveC1tYXJrZWQnIHN0eWxlPVwiY29sb3I6Z3JlZW5cIj5PSzwvc3Bhbj5gXG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChkYXRhLmJjZGIgPT09IFwiRXJyb3JcIikge1xuICAgICAgICAgICAgICAgIHNlbGYuaGVhbHRoSW5mby5hZGQoe1xuICAgICAgICAgICAgICAgICAgICBrZXk6IFwiQkNEQlwiLFxuICAgICAgICAgICAgICAgICAgICB2YWx1ZTogYDxzcGFuIGNsYXNzPSd3ZWJpeF9pY29uIHd4aS1jbG9zZS1jaXJjbGUnIHN0eWxlPVwiY29sb3I6cmVkXCI+RXJyb3I8L3NwYW4+YFxuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoZGF0YS53aWtpcyA9PT0gXCJPS1wiKSB7XG4gICAgICAgICAgICAgICAgc2VsZi5oZWFsdGhJbmZvLmFkZCh7XG4gICAgICAgICAgICAgICAgICAgIGtleTogXCJXaWtpc1wiLFxuICAgICAgICAgICAgICAgICAgICB2YWx1ZTogYDxzcGFuIGNsYXNzPSd3ZWJpeF9pY29uIHd4aS1jaGVja2JveC1tYXJrZWQnIHN0eWxlPVwiY29sb3I6Z3JlZW5cIj5PSzwvc3Bhbj5gXG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChkYXRhLndpa2lzID09PSBcIkVycm9yXCIpIHtcbiAgICAgICAgICAgICAgICBzZWxmLmhlYWx0aEluZm8uYWRkKHtcbiAgICAgICAgICAgICAgICAgICAga2V5OiBcIldpa2lzXCIsXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlOiBgPHNwYW4gY2xhc3M9J3dlYml4X2ljb24gd3hpLWNsb3NlLWNpcmNsZScgc3R5bGU9XCJjb2xvcjpyZWRcIj5FcnJvcjwvc3Bhbj5gXG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChkYXRhLmNvZGVzZXJ2ZXIgPT09IFwiT0tcIikge1xuICAgICAgICAgICAgICAgIHNlbGYuaGVhbHRoSW5mby5hZGQoe1xuICAgICAgICAgICAgICAgICAgICBrZXk6IFwiQ29kZXNlcnZlclwiLFxuICAgICAgICAgICAgICAgICAgICB2YWx1ZTogYDxzcGFuIGNsYXNzPSd3ZWJpeF9pY29uIHd4aS1jaGVja2JveC1tYXJrZWQnIHN0eWxlPVwiY29sb3I6Z3JlZW5cIj5PSzwvc3Bhbj5gXG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChkYXRhLmNvZGVzZXJ2ZXIgPT09IFwiRXJyb3JcIikge1xuICAgICAgICAgICAgICAgIHNlbGYuaGVhbHRoSW5mby5hZGQoe1xuICAgICAgICAgICAgICAgICAgICBrZXk6IFwiQ29kZXNlcnZlclwiLFxuICAgICAgICAgICAgICAgICAgICB2YWx1ZTogYDxzcGFuIGNsYXNzPSd3ZWJpeF9pY29uIHd4aS1jbG9zZS1jaXJjbGUnIHN0eWxlPVwiY29sb3I6cmVkXCI+RXJyb3I8L3NwYW4+YFxuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoZGF0YS5qdXB5dGVyID09PSBcIk9LXCIpIHtcbiAgICAgICAgICAgICAgICBzZWxmLmhlYWx0aEluZm8uYWRkKHtcbiAgICAgICAgICAgICAgICAgICAga2V5OiBcIkp1cHl0ZXJcIixcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU6IGA8c3BhbiBjbGFzcz0nd2ViaXhfaWNvbiB3eGktY2hlY2tib3gtbWFya2VkJyBzdHlsZT1cImNvbG9yOmdyZWVuXCI+T0s8L3NwYW4+YFxuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoZGF0YS5qdXB5dGVyID09PSBcIkVycm9yXCIpIHtcbiAgICAgICAgICAgICAgICBzZWxmLmhlYWx0aEluZm8uYWRkKHtcbiAgICAgICAgICAgICAgICAgICAga2V5OiBcIkp1cHl0ZXJcIixcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU6IGA8c3BhbiBjbGFzcz0nd2ViaXhfaWNvbiB3eGktY2xvc2UtY2lyY2xlJyBzdHlsZT1cImNvbG9yOnJlZFwiPkVycm9yPC9zcGFuPmBcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgIH1cblxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc291cmNlcy92aWV3cy9kYXNoL2hlYWx0aC5qcyIsImltcG9ydCB7IEpldFZpZXcgfSBmcm9tIFwid2ViaXgtamV0XCI7XG5pbXBvcnQgeyBoZWFsdGggfSBmcm9tIFwiLi4vLi4vc2VydmljZXMvaGVhbHRoXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEpTWEluZm9WaWV3IGV4dGVuZHMgSmV0VmlldyB7XG4gICAgY29uZmlnKCkge1xuICAgICAgICBjb25zdCBpbmZvID0ge1xuICAgICAgICAgICAgaWQ6IFwianN4SW5mb1wiLFxuICAgICAgICAgICAgcmVzcG9uc2l2ZTogdHJ1ZSxcbiAgICAgICAgICAgIHZpZXc6IFwibGlzdFwiLFxuICAgICAgICAgICAgcmVzcG9uc2l2ZTogdHJ1ZSxcbiAgICAgICAgICAgIHR5cGU6IHtcbiAgICAgICAgICAgICAgICBoZWlnaHQ6ICdhdXRvJyxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB0ZW1wbGF0ZTogYFxuICAgICAgICAgICAgICAgIDxwPjxmb250IHNpemU9XCIzXCI+PGI+I2tleSM6IDwvYj48L2ZvbnQ+IDxmb250IHNpemU9XCIzXCI+I3ZhbHVlIzwvZm9udD48L3A+XG4gICAgICAgICAgICBgXG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgdHlwZTogXCJzcGFjZVwiLFxuICAgICAgICAgICAgcm93czogW3tcbiAgICAgICAgICAgICAgICB0ZW1wbGF0ZTogXCI8ZGl2IHN0eWxlPSd3aWR0aDphdXRvO3RleHQtYWxpZ246Y2VudGVyJz48aDM+SlNYIEluZm88aDMvPjwvZGl2PlwiLFxuICAgICAgICAgICAgICAgIGhlaWdodDogNTBcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgaW5mb1xuICAgICAgICAgICAgXVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgaW5pdCgpIHtcbiAgICAgICAgY29uc3Qgc2VsZiA9IHRoaXM7XG5cbiAgICAgICAgdGhpcy5pbmZvID0gdGhpcy4kJChcImpzeEluZm9cIik7XG5cbiAgICAgICAgaGVhbHRoLmdldElkZW50aXR5KCkudGhlbihkYXRhID0+IHtcbiAgICAgICAgICAgIHNlbGYuaW5mby5hZGQoe1xuICAgICAgICAgICAgICAgIGtleTogXCIzYm90XCIsXG4gICAgICAgICAgICAgICAgdmFsdWU6IGRhdGEudGV4dCgpXG4gICAgICAgICAgICB9KVxuICAgICAgICB9KVxuXG4gICAgICAgIGhlYWx0aC5nZXROZXR3b3JrSW5mbygpLnRoZW4oZGF0YSA9PiB7XG4gICAgICAgICAgICBkYXRhID0gZGF0YS5qc29uKCk7XG4gICAgICAgICAgICBmb3IgKHZhciBpIGluIGRhdGEpIHtcbiAgICAgICAgICAgICAgICB2YXIgaXAgPSBkYXRhW2ldLmlwO1xuICAgICAgICAgICAgICAgIHZhciBpcDYgPSBkYXRhW2ldLmlwNi5sZW5ndGggPyBkYXRhW2ldLmlwNiA6IFwiTm90IHNldFwiO1xuXG4gICAgICAgICAgICAgICAgc2VsZi5pbmZvLmFkZCh7IFxuICAgICAgICAgICAgICAgICAgICBrZXk6IGRhdGFbaV0ubmFtZSxcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU6IGA8YnI+PGI+SVA6IDwvYj4ke2lwfTxicj48Yj5JUHY2OiA8L2I+JHtpcDZ9YFxuICAgICAgICAgICAgICAgIH0pICAgIFxuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICBoZWFsdGguZ2V0SnN4VmVyc2lvbigpLnRoZW4oZGF0YSA9PiB7XG4gICAgICAgICAgICBzZWxmLmluZm8uYWRkKHtcbiAgICAgICAgICAgICAgICBrZXk6IFwiSlNYIFZlcnNpb25cIixcbiAgICAgICAgICAgICAgICB2YWx1ZTogZGF0YS50ZXh0KClcbiAgICAgICAgICAgIH0pXG4gICAgICAgIH0pXG5cbiAgICB9XG5cbn1cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zb3VyY2VzL3ZpZXdzL2Rhc2gvanN4SW5mby5qcyIsImltcG9ydCB7XG4gICAgSmV0Vmlld1xufSBmcm9tIFwid2ViaXgtamV0XCI7XG5cbmltcG9ydCB7XG4gICAgaGVhbHRoXG59IGZyb20gXCIuLi8uLi9zZXJ2aWNlcy9oZWFsdGhcIjtcblxuY29uc3QgY29sb3JzRGF0YXNldCA9IFt7XG4gICAgICAgIGNvbG9yOiBcIiNlZTM2MzlcIlxuICAgIH0sXG4gICAge1xuICAgICAgICBjb2xvcjogXCIjZWU5ZTM2XCJcbiAgICB9LFxuICAgIHtcbiAgICAgICAgY29sb3I6IFwiI2VlZWEzNlwiXG4gICAgfSxcbiAgICB7XG4gICAgICAgIGNvbG9yOiBcIiNhOWVlMzZcIlxuICAgIH0sXG4gICAge1xuICAgICAgICBjb2xvcjogXCIjMzZkM2VlXCJcbiAgICB9LFxuICAgIHtcbiAgICAgICAgY29sb3I6IFwiIzM2N2ZlZVwiXG4gICAgfSxcbiAgICB7XG4gICAgICAgIGNvbG9yOiBcIiM5YjM2ZWVcIlxuICAgIH1cbl07XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFByb2Nlc3Nlc1ZpZXcgZXh0ZW5kcyBKZXRWaWV3IHtcblxuICAgIGNvbmZpZygpIHtcbiAgICAgICAgY29uc3QgcHJvY2Vzc2VzSW5mbyA9IHtcbiAgICAgICAgICAgIGlkOiBcInByb2Nlc3NcIixcbiAgICAgICAgICAgIHZpZXc6IFwiY2hhcnRcIixcbiAgICAgICAgICAgIHJlc3BvbnNpdmU6IHRydWUsXG4gICAgICAgICAgICB0eXBlOiBcInBpZVwiLFxuICAgICAgICAgICAgaGVpZ2h0OiA0MDAsXG4gICAgICAgICAgICBjb2xvcjogXCIjY29sb3IjXCIsXG4gICAgICAgICAgICB2YWx1ZTogXCIjcnNzI1wiLFxuICAgICAgICAgICAgbGFiZWw6IFwiPGg0PiNuYW1lIzwvaDQ+XCIsXG4gICAgICAgICAgICBwaWVJbm5lclRleHQ6IFwiPGg0PiNyc3MjPC9oND5cIixcbiAgICAgICAgICAgIGRhdGE6IFwiI2NoYXJ0c0RhdGEjXCIsXG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgdHlwZTogXCJzcGFjZVwiLFxuICAgICAgICAgICAgcm93czogW3tcbiAgICAgICAgICAgICAgICAgICAgdGVtcGxhdGU6IFwiPGRpdiBzdHlsZT0nd2lkdGg6YXV0bzt0ZXh0LWFsaWduOmNlbnRlcic+PGgzPlJ1bm5pbmcgcHJvY2Vzc2VzIG1lbW9yeSB1c2FnZSAoUlNTKSAoTUIpPGgzLz48L2Rpdj5cIixcbiAgICAgICAgICAgICAgICAgICAgaGVpZ2h0OiA1MFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgcHJvY2Vzc2VzSW5mb1xuXG4gICAgICAgICAgICBdXG4gICAgICAgIH1cbiAgICB9XG5cblxuICAgIGluaXQodmlldykge1xuICAgICAgICBjb25zdCBzZWxmID0gdGhpcztcblxuICAgICAgICB0aGlzLnByb2Nlc3Nlc0xpc3QgPSBbXVxuXG4gICAgICAgIHRoaXMucnVuUHJvY2Vzc0luZm8gPSB0aGlzLiQkKFwicHJvY2Vzc1wiKTtcblxuICAgICAgICBoZWFsdGguZ2V0UnVubmluZ1Byb2Nlc3NlcygpLnRoZW4oZGF0YSA9PiB7XG4gICAgICAgICAgICB2YXIgY2hhcnRzRGF0YSA9IFtdXG5cbiAgICAgICAgICAgIGRhdGEgPSBkYXRhLmpzb24oKTtcbiAgICAgICAgICAgIHNlbGYucHJvY2Vzc2VzTGlzdCA9IGRhdGEucHJvY2Vzc2VzX2xpc3RcblxuICAgICAgICAgICAgLy8gbWVtb3J5IHVzYWdlXG4gICAgICAgICAgICBzZWxmLm1lbW9yeVVzYWdlID0gZGF0YS5tZW1vcnlfdXNhZ2VcbiAgICAgICAgICAgIHNlbGYudG90YWxNZW1vcnkgPSBzZWxmLm1lbW9yeVVzYWdlLnRvdGFsX21lbVxuICAgICAgICAgICAgc2VsZi5wZXJjZW50ID0gc2VsZi5tZW1vcnlVc2FnZS51c2FnZV9wZXJjZW50XG5cblxuICAgICAgICAgICAgc2VsZi5ydW5Qcm9jZXNzSW5mby5kZWZpbmUoXCJsZWdlbmRcIiwge1xuICAgICAgICAgICAgICAgIGxheW91dDogXCJ4XCIsXG4gICAgICAgICAgICAgICAgd2lkdGg6IDExMCxcbiAgICAgICAgICAgICAgICB2YWx1ZXM6IFt7XG4gICAgICAgICAgICAgICAgICAgICAgICB0ZXh0OiBgPGI+VG90YWwgbWVtb3J5OiA8L2I+JHtzZWxmLnRvdGFsTWVtb3J5fUdCYFxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0ZXh0OiBgPGI+VXNhZ2U6IDwvYj4ke3NlbGYucGVyY2VudH0lYFxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIHNlbGYucnVuUHJvY2Vzc0luZm8ucmVmcmVzaCgpXG5cbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc2VsZi5wcm9jZXNzZXNMaXN0Lmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgLy9CcmVhayB3aGVuIHRoZXJlIGlzIG5vIG1vcmUgY29sb3JzXG4gICAgICAgICAgICAgICAgaWYgKGkgPT0gY29sb3JzRGF0YXNldC5sZW5ndGgpXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICAgICAgdmFyIHRlbXAgPSB7XG4gICAgICAgICAgICAgICAgICAgIFwiY29sb3JcIjogY29sb3JzRGF0YXNldFtpXS5jb2xvcixcbiAgICAgICAgICAgICAgICAgICAgXCJuYW1lXCI6IHNlbGYucHJvY2Vzc2VzTGlzdFtpXS5uYW1lLFxuICAgICAgICAgICAgICAgICAgICBcInJzc1wiOiBNYXRoLmNlaWwoc2VsZi5wcm9jZXNzZXNMaXN0W2ldLnJzcyksXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGNoYXJ0c0RhdGEucHVzaCh0ZW1wKVxuICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKG15QXJyYXlbaV0pO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBzZWxmLnJ1blByb2Nlc3NJbmZvLnBhcnNlKHtcbiAgICAgICAgICAgICAgICBkYXRhOiBjaGFydHNEYXRhLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH1cblxufVxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NvdXJjZXMvdmlld3MvZGFzaC9wcm9jZXNzZXMuanMiLCJpbXBvcnQgeyBKZXRWaWV3IH0gZnJvbSBcIndlYml4LWpldFwiO1xuXG5pbXBvcnQgeyBoZWFsdGggfSBmcm9tIFwiLi4vLi4vc2VydmljZXMvaGVhbHRoXCI7XG5pbXBvcnQgUHJvY2Vzc0RldGFpbHNWaWV3IGZyb20gXCIuL3Byb2Nlc3NEZXRhaWxzXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIHByb2Nlc3Nlc0xpc3RWaWV3IGV4dGVuZHMgSmV0VmlldyB7XG4gICAgY29uZmlnKCkge1xuICAgICAgICBjb25zdCB2aWV3ID0ge1xuICAgICAgICAgICAgdmlldzogXCJkYXRhdGFibGVcIixcbiAgICAgICAgICAgIGlkOiBcInByb2Nlc3NfdGFibGVcIixcbiAgICAgICAgICAgIHJlc2l6ZUNvbHVtbjogdHJ1ZSxcbiAgICAgICAgICAgIHNlbGVjdDogdHJ1ZSxcbiAgICAgICAgICAgIG11bHRpc2VsZWN0OiB0cnVlLFxuICAgICAgICAgICAgY3NzOiBcIndlYml4X2hlYWRlcl9ib3JkZXIgd2ViaXhfZGF0YV9ib3JkZXJcIixcbiAgICAgICAgICAgIHNjcm9sbDogdHJ1ZSxcbiAgICAgICAgICAgIGF1dG9Db25maWc6IHRydWUsXG4gICAgICAgICAgICBjb2x1bW5zOiBbe1xuICAgICAgICAgICAgICAgICAgICBpZDogXCJpbmRleFwiLFxuICAgICAgICAgICAgICAgICAgICBoZWFkZXI6IFwiI1wiLFxuICAgICAgICAgICAgICAgICAgICBzb3J0OiBcImludFwiLFxuICAgICAgICAgICAgICAgICAgICBhdXRvd2lkdGg6IHRydWUsXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIGlkOiBcIm5hbWVcIixcbiAgICAgICAgICAgICAgICAgICAgaGVhZGVyOiBbXG4gICAgICAgICAgICAgICAgICAgICAgICBcIlByb2Nlc3NcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb250ZW50OiBcInRleHRGaWx0ZXJcIlxuICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICAgICAgc29ydDogXCJzdHJpbmdcIixcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgaWQ6IFwicGlkXCIsXG4gICAgICAgICAgICAgICAgICAgIGhlYWRlcjogXCJQSURcIixcbiAgICAgICAgICAgICAgICAgICAgc29ydDogXCJpbnRcIlxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBpZDogXCJ1c2VybmFtZVwiLFxuICAgICAgICAgICAgICAgICAgICBoZWFkZXI6IFwiVXNlcm5hbWVcIixcbiAgICAgICAgICAgICAgICAgICAgc29ydDogXCJzdHJpbmdcIlxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBpZDogXCJyc3NcIixcbiAgICAgICAgICAgICAgICAgICAgaGVhZGVyOiBcIk1lbW9yeSBVc2FnZVwiLFxuICAgICAgICAgICAgICAgICAgICBzb3J0OiBcImludFwiLFxuICAgICAgICAgICAgICAgICAgICBmb3JtYXQ6IGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIE1hdGguY2VpbCh2YWx1ZSlcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBdLFxuICAgICAgICAgICAgc2NoZW1lOiB7XG4gICAgICAgICAgICAgICAgJGluaXQ6IGZ1bmN0aW9uIChvYmopIHtcbiAgICAgICAgICAgICAgICAgICAgb2JqLmluZGV4ID0gdGhpcy5jb3VudCgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgdHlwZTogXCJzcGFjZVwiLFxuICAgICAgICAgICAgcm93czogW1xuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgdGVtcGxhdGU6IFwiPGRpdiBzdHlsZT0nd2lkdGg6YXV0bzt0ZXh0LWFsaWduOmNlbnRlcic+PGgzPlByb2Nlc3NlczxoMy8+PC9kaXY+XCIsXG4gICAgICAgICAgICAgICAgICAgIGhlaWdodDogNTBcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHZpZXdcbiAgICAgICAgICAgIF1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIGtpbGxQcm9jZXNzKG9iamVjdHMpIHtcbiAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xuXG4gICAgICAgIGxldCBpdGVtcyA9IFtdLFxuICAgICAgICAgICAgaWRzID0gW10sXG4gICAgICAgICAgICBpbmRleGVzID0gW107XG5cbiAgICAgICAgZm9yIChsZXQgb2JqIG9mIG9iamVjdHMpIHtcbiAgICAgICAgICAgIGlkcy5wdXNoKG9iai5pZCk7XG4gICAgICAgICAgICBsZXQgaXRlbSA9IHNlbGYucHJvY2Vzc1RhYmxlLmdldEl0ZW0ob2JqLmlkKTtcbiAgICAgICAgICAgIGl0ZW1zLnB1c2goaXRlbSlcbiAgICAgICAgICAgIGluZGV4ZXMucHVzaChpdGVtLmluZGV4KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHdlYml4LmNvbmZpcm0oe1xuICAgICAgICAgICAgdGl0bGU6IFwiS2lsbCBwcm9jZXNzZXNcIixcbiAgICAgICAgICAgIG9rOiBcIlllc1wiLFxuICAgICAgICAgICAgY2FuY2VsOiBcIk5vXCIsXG4gICAgICAgICAgICB0ZXh0OiBgS2lsbCBwcm9jZXNzZXMgd2l0aCByb3cgaWRzICR7aW5kZXhlcy5qb2luKFwiLCBcIil9YFxuICAgICAgICB9KS50aGVuKCgpID0+IHtcblxuICAgICAgICAgICAgY29uc3QgcGlkcyA9IGl0ZW1zLm1hcCgoaXRlbSkgPT4gaXRlbS5waWQpO1xuXG4gICAgICAgICAgICBoZWFsdGgua2lsbFByb2Nlc3Nlc0J5UGlkKHBpZHMpLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgICAgIHNlbGYucHJvY2Vzc1RhYmxlLnJlbW92ZShpZHMpXG4gICAgICAgICAgICAgICAgd2ViaXgubWVzc2FnZSh7IHR5cGU6IFwic3VjY2Vzc1wiLCB0ZXh0OiBcIlByb2Nlc3NlcyBraWxsZWQgc3VjY2Vzc2Z1bGx5XCIgfSk7XG4gICAgICAgICAgICB9KS5jYXRjaChlcnJvciA9PiB7XG4gICAgICAgICAgICAgICAgd2ViaXgubWVzc2FnZSh7IHR5cGU6IFwiZXJyb3JcIiwgdGV4dDogXCJDb3VsZCBub3Qga2lsbCBwcm9jZXNzXCIgfSk7XG4gICAgICAgICAgICB9KVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBpbml0KCkge1xuICAgICAgICBjb25zdCBzZWxmID0gdGhpcztcbiAgICAgICAgc2VsZi5wcm9jZXNzRGV0YWlsc1ZpZXcgPSBzZWxmLnVpKFByb2Nlc3NEZXRhaWxzVmlldyk7XG5cbiAgICAgICAgc2VsZi5wcm9jZXNzVGFibGUgPSB0aGlzLiQkKFwicHJvY2Vzc190YWJsZVwiKTtcbiAgICAgICAgaGVhbHRoLmdldFJ1bm5pbmdQcm9jZXNzZXMoKS50aGVuKGRhdGEgPT4ge1xuICAgICAgICAgICAgc2VsZi5wcm9jZXNzVGFibGUucGFyc2UoZGF0YS5qc29uKCkucHJvY2Vzc2VzX2xpc3QpO1xuICAgICAgICB9KTtcblxuICAgICAgICB3ZWJpeC51aSh7XG4gICAgICAgICAgICB2aWV3OiBcImNvbnRleHRtZW51XCIsXG4gICAgICAgICAgICBpZDogXCJwcm9jZXNzX2NtXCIsXG4gICAgICAgICAgICBkYXRhOiBbXCJLaWxsXCJdXG4gICAgICAgIH0pLmF0dGFjaFRvKHNlbGYucHJvY2Vzc1RhYmxlKTtcblxuICAgICAgICBzZWxmLnByb2Nlc3NUYWJsZS5hdHRhY2hFdmVudChcIm9uSXRlbURibENsaWNrXCIsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIGxldCBwaWQgPSBzZWxmLnByb2Nlc3NUYWJsZS5nZXRTZWxlY3RlZEl0ZW0oKVtcInBpZFwiXVxuICAgICAgICAgICAgaGVhbHRoLmdldFByb2Nlc3NEZXRhaWxzKHBpZCkudGhlbigoZGF0YSkgPT57XG4gICAgICAgICAgICAgICAgc2VsZi5wcm9jZXNzRGV0YWlsc1ZpZXcuc2hvd1Byb2Nlc3NEZXRhaWxzKGRhdGEuanNvbigpKVxuICAgICAgICAgICAgfSkuY2F0Y2goZXJyID0+IHtcbiAgICAgICAgICAgICAgICB3ZWJpeC5tZXNzYWdlKHsgdHlwZTogXCJlcnJvclwiLCB0ZXh0OiBcIkNvdWxkIG5vdCBnZXQgcHJvY2VzcyBkZXRhaWxzXCIgfSk7XG4gICAgICAgICAgICB9KVxuICAgICAgICB9KTtcblxuICAgICAgICAkJChcInByb2Nlc3NfY21cIikuYXR0YWNoRXZlbnQoXCJvbk1lbnVJdGVtQ2xpY2tcIiwgZnVuY3Rpb24gKGlkKSB7XG4gICAgICAgICAgICBpZiAoaWQgPT0gXCJLaWxsXCIpIHtcbiAgICAgICAgICAgICAgICBzZWxmLmtpbGxQcm9jZXNzKHNlbGYucHJvY2Vzc1RhYmxlLmdldFNlbGVjdGVkSWQodHJ1ZSkpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG5cbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NvdXJjZXMvdmlld3MvZGFzaC9wcm9jZXNzZXNMaXN0LmpzIiwiaW1wb3J0IHsgSmV0VmlldyB9IGZyb20gXCJ3ZWJpeC1qZXRcIjtcblxuaW1wb3J0IHsgaGVhbHRoIH0gZnJvbSBcIi4uLy4uL3NlcnZpY2VzL2hlYWx0aFwiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBydW5uaW5nUG9ydHNWaWV3IGV4dGVuZHMgSmV0VmlldyB7XG4gICAgY29uZmlnKCkge1xuICAgICAgICBjb25zdCBwb3J0cyA9IHtcbiAgICAgICAgICAgIGlkOiBcInJ1bm5pbmdQb3J0c1wiLFxuICAgICAgICAgICAgdmlldzogXCJkYXRhdGFibGVcIixcbiAgICAgICAgICAgIHJlc3BvbnNpdmU6IHRydWUsXG4gICAgICAgICAgICBhdXRvQ29uZmlnOiB0cnVlLFxuICAgICAgICAgICAgdHlwZToge1xuICAgICAgICAgICAgICAgIGhlaWdodDogMjAwLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHRlbXBsYXRlOiBcIlJ1bm5pbmcgUG9ydHNcIixcbiAgICAgICAgICAgIHJlc2l6ZUNvbHVtbjogdHJ1ZSxcbiAgICAgICAgICAgIHNlbGVjdDogdHJ1ZSxcbiAgICAgICAgICAgIG11bHRpc2VsZWN0OiB0cnVlLFxuICAgICAgICAgICAgY3NzOiBcIndlYml4X2hlYWRlcl9ib3JkZXIgd2ViaXhfZGF0YV9ib3JkZXJcIixcbiAgICAgICAgICAgIGNvbHVtbnM6IFt7XG4gICAgICAgICAgICAgICAgaWQ6IFwiaW5kZXhcIixcbiAgICAgICAgICAgICAgICBoZWFkZXI6IFwiI1wiLFxuICAgICAgICAgICAgICAgIHNvcnQ6IFwiaW50XCIsXG4gICAgICAgICAgICAgICAgYXV0b3dpZHRoOiB0cnVlLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBpZDogXCJwb3J0X251bWJlclwiLFxuICAgICAgICAgICAgICAgIGhlYWRlcjogW1wiUG9ydCBOdW1iZXJcIiwge1xuICAgICAgICAgICAgICAgICAgICBjb250ZW50OiBcInRleHRGaWx0ZXJcIlxuICAgICAgICAgICAgICAgIH0sXSxcbiAgICAgICAgICAgICAgICBzb3J0OiBcInN0cmluZ1wiXG4gICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgaWQ6IFwicHJvY2Vzc1wiLFxuICAgICAgICAgICAgICAgIGhlYWRlcjogW1wiUHJvY2Vzc1wiLCB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnRlbnQ6IFwidGV4dEZpbHRlclwiXG4gICAgICAgICAgICAgICAgfV0sXG4gICAgICAgICAgICAgICAgc29ydDogXCJzdHJpbmdcIlxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgXSxcbiAgICAgICAgICAgIHNjaGVtZToge1xuICAgICAgICAgICAgICAgICRpbml0OiBmdW5jdGlvbiAob2JqKSB7XG4gICAgICAgICAgICAgICAgICAgIG9iai5pbmRleCA9IHRoaXMuY291bnQoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHR5cGU6IFwic3BhY2VcIixcbiAgICAgICAgICAgIHJvd3M6IFtcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIHRlbXBsYXRlOiBcIjxkaXYgc3R5bGU9J3dpZHRoOmF1dG87dGV4dC1hbGlnbjpjZW50ZXInPjxoMz5Qb3J0czxoMy8+PC9kaXY+XCIsXG4gICAgICAgICAgICAgICAgICAgIGhlaWdodDogNTBcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHBvcnRzXG4gICAgICAgICAgICBdXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBraWxsUHJvY2VzcyhvYmplY3RzKSB7XG4gICAgICAgIHZhciBzZWxmID0gdGhpcztcblxuICAgICAgICBsZXQgaXRlbXMgPSBbXSxcbiAgICAgICAgICAgIGlkcyA9IFtdLFxuICAgICAgICAgICAgaW5kZXhlcyA9IFtdO1xuXG4gICAgICAgIGZvciAobGV0IG9iaiBvZiBvYmplY3RzKSB7XG4gICAgICAgICAgICBpZHMucHVzaChvYmouaWQpO1xuICAgICAgICAgICAgbGV0IGl0ZW0gPSBzZWxmLnBvcnRzVGFibGUuZ2V0SXRlbShvYmouaWQpO1xuICAgICAgICAgICAgaXRlbXMucHVzaChpdGVtKVxuICAgICAgICAgICAgaW5kZXhlcy5wdXNoKGl0ZW0uaW5kZXgpO1xuICAgICAgICB9XG5cbiAgICAgICAgd2ViaXguY29uZmlybSh7XG4gICAgICAgICAgICB0aXRsZTogXCJLaWxsIHByb2Nlc3Nlc1wiLFxuICAgICAgICAgICAgb2s6IFwiWWVzXCIsXG4gICAgICAgICAgICBjYW5jZWw6IFwiTm9cIixcbiAgICAgICAgICAgIHRleHQ6IGBLaWxsIHByb2Nlc3NlcyB3aXRoIHJvdyBpZHMgJHtpbmRleGVzLmpvaW4oXCIsIFwiKX1gXG4gICAgICAgIH0pLnRoZW4oKCkgPT4ge1xuXG4gICAgICAgICAgICBjb25zdCBwb3J0cyA9IGl0ZW1zLm1hcCgoaXRlbSkgPT4gaXRlbS5wb3J0X251bWJlcik7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIGhlYWx0aC5raWxsUHJvY2Vzc2VzQnlQb3J0KHBvcnRzKS50aGVuKCgpID0+IHtcbiAgICAgICAgICAgICAgICBzZWxmLnBvcnRzVGFibGUucmVtb3ZlKGlkcylcbiAgICAgICAgICAgICAgICB3ZWJpeC5tZXNzYWdlKHsgdHlwZTogXCJzdWNjZXNzXCIsIHRleHQ6IFwiUHJvY2Vzc2VzIGtpbGxlZCBzdWNjZXNzZnVsbHlcIiB9KTtcbiAgICAgICAgICAgIH0pLmNhdGNoKGVycm9yID0+IHtcbiAgICAgICAgICAgICAgICB3ZWJpeC5tZXNzYWdlKHsgdHlwZTogXCJlcnJvclwiLCB0ZXh0OiBcIkNvdWxkIG5vdCBraWxsIHByb2Nlc3NcIiB9KTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGluaXQoKSB7XG4gICAgICAgIGNvbnN0IHNlbGYgPSB0aGlzO1xuXG4gICAgICAgIHNlbGYucG9ydHNUYWJsZSA9IHRoaXMuJCQoXCJydW5uaW5nUG9ydHNcIik7XG4gICAgICAgIGhlYWx0aC5nZXRSdW5uaW5nUG9ydHMoKS50aGVuKGRhdGEgPT4ge1xuICAgICAgICAgICAgc2VsZi5wb3J0c1RhYmxlLnBhcnNlKGRhdGEuanNvbigpKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgd2ViaXgudWkoe1xuICAgICAgICAgICAgdmlldzogXCJjb250ZXh0bWVudVwiLFxuICAgICAgICAgICAgaWQ6IFwicG9ydF9jbVwiLFxuICAgICAgICAgICAgZGF0YTogW1wiS2lsbFwiXVxuICAgICAgICB9KS5hdHRhY2hUbyhzZWxmLnBvcnRzVGFibGUpO1xuXG4gICAgICAgICQkKFwicG9ydF9jbVwiKS5hdHRhY2hFdmVudChcIm9uTWVudUl0ZW1DbGlja1wiLCBmdW5jdGlvbiAoaWQpIHtcbiAgICAgICAgICAgIGlmIChpZCA9PSBcIktpbGxcIikge1xuICAgICAgICAgICAgICAgIHNlbGYua2lsbFByb2Nlc3Moc2VsZi5wb3J0c1RhYmxlLmdldFNlbGVjdGVkSWQodHJ1ZSkpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG5cbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NvdXJjZXMvdmlld3MvZGFzaC9ydW5uaW5nUG9ydHMuanMiLCJpbXBvcnQgeyBKZXRWaWV3LCBwbHVnaW5zIH0gZnJvbSBcIndlYml4LWpldFwiO1xuaW1wb3J0IHsgYXV0aCB9IGZyb20gXCIuLi9zZXJ2aWNlcy9hdXRoXCI7XG5cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVG9wVmlldyBleHRlbmRzIEpldFZpZXcge1xuICAgIGNvbmZpZygpIHtcbiAgICAgICAgY29uc3QgaGVhZGVyID0ge1xuICAgICAgICAgICAgY29sczogW1xuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgaWQ6IFwiYnV0dG9uX2hpZGVfbWVudVwiLFxuICAgICAgICAgICAgICAgICAgICB2aWV3OiBcImljb25cIiwgaWNvbjogXCJtZGkgbWRpLW1lbnVcIixcbiAgICAgICAgICAgICAgICAgICAgY3NzOiBcImN1c3RvbV9kYXJrXCIsIGhlaWdodDogNTgsXG4gICAgICAgICAgICAgICAgICAgIGNsaWNrOiB0aGlzLmhpZGVNZW51LFxuICAgICAgICAgICAgICAgICAgICB0b29sdGlwOiBcIkhpZGUgbWVudVwiLFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBpZDogXCJoZWFkZXJcIixcbiAgICAgICAgICAgICAgICAgICAgdHlwZTogXCJoZWFkZXJcIixcbiAgICAgICAgICAgICAgICAgICAgY3NzOiBcImN1c3RvbV9kYXJrXCIsIGhlaWdodDogNTgsXG4gICAgICAgICAgICAgICAgICAgIHRlbXBsYXRlOiBcIkFETUlOXCIsXG4gICAgICAgICAgICAgICAgICAgIGJvcmRlcmxlc3M6IHRydWUsXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIF1cbiAgICAgICAgfTtcblxuICAgICAgICBjb25zdCBzaWRlYmFyRGF0YSA9IFt7XG4gICAgICAgICAgICBpZDogXCJkYXNoXCIsXG4gICAgICAgICAgICB2YWx1ZTogXCJEYXNoYm9hcmRcIixcbiAgICAgICAgICAgIGljb246IFwibWRpIG1kaS12aWV3LWRhc2hib2FyZFwiXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICAgIGlkOiBcIndpa2lzXCIsXG4gICAgICAgICAgICB2YWx1ZTogXCJQYWNrYWdlcyBEb2NzXCIsXG4gICAgICAgICAgICBpY29uOiBcIm1kaSBtZGktbmV3c3BhcGVyXCJcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgICAgaWQ6IFwiYWxlcnRzXCIsXG4gICAgICAgICAgICB2YWx1ZTogXCJBbGVydHNcIixcbiAgICAgICAgICAgIGljb246IFwibWRpIG1kaS1iZWxsLWFsZXJ0XCJcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgICAgaWQ6IFwibG9nc1wiLFxuICAgICAgICAgICAgdmFsdWU6IFwiTG9nc1wiLFxuICAgICAgICAgICAgaWNvbjogXCJtZGkgbWRpLWhpc3RvcnlcIlxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgICBpZDogXCJteWpvYnNfbWFpblwiLFxuICAgICAgICAgICAgdmFsdWU6IFwiTXkgam9ic1wiLFxuICAgICAgICAgICAgaWNvbjogXCJtZGkgbWRpLWFuaW1hdGlvbi1wbGF5XCIsXG4gICAgICAgICAgICBkYXRhOiBbe1xuICAgICAgICAgICAgICAgIGlkOiBcIm15am9ic1wiLFxuICAgICAgICAgICAgICAgIGljb246IFwibWRpIG1kaS1ib29rLW9wZW5cIixcbiAgICAgICAgICAgICAgICB2YWx1ZTogXCJKb2JzXCJcbiAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICBpZDogXCJ3b3JrZXJzXCIsXG4gICAgICAgICAgICAgICAgaWNvbjogXCJtZGkgbWRpLXdvcmtlclwiLFxuICAgICAgICAgICAgICAgIHZhbHVlOiBcIldvcmtlcnNcIlxuICAgICAgICAgICAgfV1cbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgICAgaWQ6IFwidGZ3aWtpc19tYWluXCIsXG4gICAgICAgICAgICB2YWx1ZTogXCJURiBXaWtpc1wiLFxuICAgICAgICAgICAgaWNvbjogXCJtZGkgbWRpLWFuaW1hdGlvbi1wbGF5XCIsXG4gICAgICAgICAgICBkYXRhOiBbe1xuICAgICAgICAgICAgICAgIGlkOiBcInRmZ3JpZHNka1wiLFxuICAgICAgICAgICAgICAgIGljb246IFwibWRpIG1kaS1ib29rLW9wZW5cIixcbiAgICAgICAgICAgICAgICB2YWx1ZTogXCJURkdyaWRTREtcIlxuICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIGlkOiBcInRocmVlZm9sZFwiLFxuICAgICAgICAgICAgICAgIGljb246IFwibWRpIG1kaS13b3JrZXJcIixcbiAgICAgICAgICAgICAgICB2YWx1ZTogXCJUaHJlZWZvbGRcIlxuICAgICAgICAgICAgfV1cbiAgICAgICAgfSxcblxuICAgICAgICB7XG4gICAgICAgICAgICBpZDogXCJwYWNrYWdlc1wiLFxuICAgICAgICAgICAgdmFsdWU6IFwiUGFja2FnZXNcIixcbiAgICAgICAgICAgIGljb246IFwibWRpIG1kaS1wYWNrYWdlXCJcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgICAgaWQ6IFwiZGVwbG95ZWRTb2x1dGlvbnNcIixcbiAgICAgICAgICAgIHZhbHVlOiBcIkRlcGxveWVkIFNvbHV0aW9uc1wiLFxuICAgICAgICAgICAgaWNvbjogXCJtZGkgbWRpLWFuaW1hdGlvbi1wbGF5XCJcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgICAgaWQ6IFwic29sdXRpb25zXCIsXG4gICAgICAgICAgICB2YWx1ZTogXCJTb2x1dGlvbnNcIixcbiAgICAgICAgICAgIGljb246IFwibWRpIG1kaS1hbmltYXRpb24tcGxheVwiLFxuICAgICAgICAgICAgZGF0YTogW3tcbiAgICAgICAgICAgICAgICBpZDogXCJuZXR3b3JrXCIsXG4gICAgICAgICAgICAgICAgdmFsdWU6ICc8c3Bhbj48aW1nIGNsYXNzPVwic29sdXRpb25zLWljb25cIiBzcmM9XCJzdGF0aWMvaW1nL25ldHdvcmsucG5nXCIvPk5ldHdvcms8L3NwYW4+J1xuICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIGlkOiBcInVidW50dVwiLFxuICAgICAgICAgICAgICAgIHZhbHVlOiAnPHNwYW4+PGltZyBjbGFzcz1cInNvbHV0aW9ucy1pY29uXCIgc3JjPVwic3RhdGljL2ltZy91YnVudHUucG5nXCIvPlVidW50dTwvc3Bhbj4nXG4gICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgaWQ6IFwiZmxpc3RcIixcbiAgICAgICAgICAgICAgICB2YWx1ZTogJzxzcGFuPjxpbWcgY2xhc3M9XCJzb2x1dGlvbnMtaWNvblwiIHNyYz1cInN0YXRpYy9pbWcvZmxpc3QucG5nXCIvPkdlbmVyaWMgZmxpc3Q8L3NwYW4+J1xuICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIGlkOiBcIm1pbmlvXCIsXG4gICAgICAgICAgICAgICAgdmFsdWU6ICc8c3Bhbj48aW1nIGNsYXNzPVwic29sdXRpb25zLWljb25cIiBzcmM9XCJzdGF0aWMvaW1nL21pbmlvLnBuZ1wiLz5NaW5pbyAvIFMzPC9zcGFuPidcbiAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICBpZDogXCJrOHNfY2x1c3RlclwiLFxuICAgICAgICAgICAgICAgIHZhbHVlOiAnPHNwYW4+PGltZyBjbGFzcz1cInNvbHV0aW9ucy1pY29uXCIgc3JjPVwic3RhdGljL2ltZy9rOHMucG5nXCIvPkt1YmVybmV0ZXMgY2x1c3Rlcjwvc3Bhbj4nXG4gICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgaWQ6IFwid2ViZ2F0ZXdheVwiLFxuICAgICAgICAgICAgICAgIHZhbHVlOiAnV2ViIEdhdGV3YXknLFxuICAgICAgICAgICAgICAgIGljb246IFwibWRpIG1kaS1uZXR3b3JrXCJcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIF1cbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgICAgaWQ6IFwiY2FwYWNpdHlcIixcbiAgICAgICAgICAgIHZhbHVlOiBcIkNhcGFjaXR5XCIsXG4gICAgICAgICAgICBpY29uOiBcIm1kaSBtZGktc2VydmVyXCJcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgICAgaWQ6IFwiZmFybW1hbmFnZW1lbnRcIixcbiAgICAgICAgICAgIHZhbHVlOiBcIkZhcm0gTWFuYWdlbWVudFwiLFxuICAgICAgICAgICAgaWNvbjogXCJtZGkgbWRpLXNlcnZlclwiXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICAgIGlkOiBcInNka2V4YW1wbGVzXCIsXG4gICAgICAgICAgICB2YWx1ZTogXCJTREsgRXhhbXBsZXNcIixcbiAgICAgICAgICAgIGljb246IFwibWRpIG1kaS1maWxlXCJcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgICAgaWQ6IFwiY29kZXNlcnZlclwiLFxuICAgICAgICAgICAgdmFsdWU6IFwiQ29kZXNlcnZlclwiLFxuICAgICAgICAgICAgaWNvbjogXCJtZGkgbWRpLWNvZGUtdGFnc1wiXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICAgIGlkOiBcImp1cHl0ZXJcIixcbiAgICAgICAgICAgIHZhbHVlOiBcIlRGIFNpbXVsYXRvclwiLFxuICAgICAgICAgICAgaWNvbjogXCJtZGkgbWRpLXBsYXlcIlxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgICBpZDogXCJzZXR0aW5nc1wiLFxuICAgICAgICAgICAgdmFsdWU6IFwiU2V0dGluZ3NcIixcbiAgICAgICAgICAgIGljb246IFwibWRpIG1kaS1zZXR0aW5nc1wiXG4gICAgICAgIH0sXG4gICAgICAgIF1cblxuICAgICAgICBjb25zdCByZXNwb25zZSA9IHdlYml4LmFqYXgoKS5zeW5jKCkuZ2V0KFwiL3plcm9ib3QvYWRtaW4vYWN0b3JzL3BhY2thZ2VfbWFuYWdlci9wYWNrYWdlc19saXN0XCIsIHsgaGFzX2Zyb250ZW5kX2FyZ3M6IHRydWUsIHN0YXR1czogXCJpbnN0YWxsZWRcIiB9KTtcbiAgICAgICAgbGV0IHBhY2thZ2VzO1xuXG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBwYWNrYWdlcyA9IEpTT04ucGFyc2UocmVzcG9uc2UucmVzcG9uc2VUZXh0KS5wYWNrYWdlcztcbiAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICAgIHBhY2thZ2VzID0gW107XG4gICAgICAgIH1cblxuICAgICAgICBmb3IgKGNvbnN0IHAgb2YgcGFja2FnZXMpIHtcbiAgICAgICAgICAgIHNpZGViYXJEYXRhLnB1c2gocC5mcm9udGVuZF9hcmdzKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IHNpZGViYXIgPSB7XG4gICAgICAgICAgICBsb2NhbElkOiBcIm1lbnVcIixcbiAgICAgICAgICAgIHZpZXc6IFwic2lkZWJhclwiLFxuICAgICAgICAgICAgY3NzOiBcIndlYml4X2RhcmtcIixcbiAgICAgICAgICAgIHdpZHRoOiAyMDAsXG4gICAgICAgICAgICBkYXRhOiBzaWRlYmFyRGF0YSxcbiAgICAgICAgfTtcblxuICAgICAgICBjb25zdCB0b29sYmFyID0ge1xuICAgICAgICAgICAgdmlldzogXCJ0b29sYmFyXCIsXG4gICAgICAgICAgICBwYWRkaW5nOiA5LFxuICAgICAgICAgICAgaGVpZ2h0OiA1OCxcbiAgICAgICAgICAgIGNvbHM6IFt7XG4gICAgICAgICAgICAgICAgaWQ6IFwiYnV0dG9uX3Nob3dfbWVudVwiLFxuICAgICAgICAgICAgICAgIHZpZXc6IFwiaWNvblwiLFxuICAgICAgICAgICAgICAgIGljb246IFwibWRpIG1kaS1tZW51XCIsXG4gICAgICAgICAgICAgICAgY2xpY2s6IHRoaXMuc2hvd01lbnUsXG4gICAgICAgICAgICAgICAgaGlkZGVuOiB0cnVlLCAvLyBoaWRkZW4gYnkgZGVmYXVsdFxuICAgICAgICAgICAgICAgIHRvb2x0aXA6IFwiU2hvdyBtZW51XCIsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHZpZXc6IFwidGVtcGxhdGVcIixcbiAgICAgICAgICAgICAgICB0ZW1wbGF0ZTogYDxpbWcgY2xhc3M9XCJ3ZWJpeF9pY29uXCIgc3JjPVwic3RhdGljL2ltZy8zYm90LnBuZ1wiLz5gLFxuICAgICAgICAgICAgICAgIGJvcmRlcmxlc3M6IHRydWUsXG4gICAgICAgICAgICAgICAgaGVpZ2h0OiA0MCxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgaWQ6IFwidXNlcm5hbWVfbGFiZWxcIixcbiAgICAgICAgICAgICAgICB2aWV3OiBcImxhYmVsXCIsXG4gICAgICAgICAgICAgICAgbGFiZWw6IFwidXNlcm5hbWVcIixcbiAgICAgICAgICAgICAgICBib3JkZXJsZXNzOiB0cnVlLFxuICAgICAgICAgICAgICAgIGFsaWduOiBcInJpZ2h0XCIsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGlkOiBcInVzZXJfaWNvblwiLFxuICAgICAgICAgICAgICAgIHZpZXc6IFwiaWNvblwiLFxuICAgICAgICAgICAgICAgIGljb246IFwibWRpIG1kaS1hY2NvdW50LWNpcmNsZVwiLFxuICAgICAgICAgICAgICAgIGJvcmRlcmxlc3M6IHRydWUsXG4gICAgICAgICAgICAgICAgcG9wdXA6IFwidXNlcl9tZW51XCJcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIF1cbiAgICAgICAgfTtcblxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgdHlwZTogXCJjbGVhblwiLFxuICAgICAgICAgICAgY29sczogW3tcbiAgICAgICAgICAgICAgICByb3dzOiBbaGVhZGVyLCBzaWRlYmFyXVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICByb3dzOiBbXG4gICAgICAgICAgICAgICAgICAgIHRvb2xiYXIsXG4gICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICRzdWJ2aWV3OiB0cnVlXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBdXG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgc2hvd01lbnUoKSB7XG4gICAgICAgIHRoaXMuJHNjb3BlLm1lbnUuc2hvdygpO1xuICAgICAgICB0aGlzLiRzY29wZS5oZWFkZXIuc2hvdygpO1xuICAgICAgICB0aGlzLiRzY29wZS5idXR0b25IaWRlTWVudS5zaG93KCk7XG5cbiAgICAgICAgdGhpcy4kc2NvcGUuYnV0dG9uU2hvd01lbnUuaGlkZSgpO1xuICAgIH1cblxuICAgIGhpZGVNZW51KCkge1xuICAgICAgICB0aGlzLiRzY29wZS5tZW51LmhpZGUoKTtcbiAgICAgICAgdGhpcy4kc2NvcGUuaGVhZGVyLmhpZGUoKTtcbiAgICAgICAgdGhpcy4kc2NvcGUuYnV0dG9uSGlkZU1lbnUuaGlkZSgpO1xuXG4gICAgICAgIHRoaXMuJHNjb3BlLmJ1dHRvblNob3dNZW51LnNob3coKTtcbiAgICB9XG5cbiAgICBpbml0KCkge1xuICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XG5cbiAgICAgICAgdGhpcy51c2UocGx1Z2lucy5NZW51LCB7XG4gICAgICAgICAgICBpZDogXCJtZW51XCIsXG4gICAgICAgICAgICB1cmxzOiB7XG4gICAgICAgICAgICAgICAgbXlqb2JzOiBcIm15am9icy5qb2JzXCIsXG4gICAgICAgICAgICAgICAgd29ya2VyczogXCJteWpvYnMud29ya2Vyc1wiLFxuICAgICAgICAgICAgICAgIHRmZ3JpZHNkazogXCJ0Zndpa2lzLnRmZ3JpZHNka1wiLFxuICAgICAgICAgICAgICAgIHRocmVlZm9sZDogXCJ0Zndpa2lzLnRocmVlZm9sZFwiLFxuICAgICAgICAgICAgICAgIHVidW50dTogXCJzb2x1dGlvbnMuY2hhdGZsb3c/YXV0aG9yPXRmZ3JpZF9zb2x1dGlvbnMmcGFja2FnZT10ZmdyaWRfc29sdXRpb25zJmNoYXQ9dWJ1bnR1X2RlcGxveVwiLFxuICAgICAgICAgICAgICAgIG5ldHdvcms6IFwic29sdXRpb25zLmNoYXRmbG93P2F1dGhvcj10ZmdyaWRfc29sdXRpb25zJnBhY2thZ2U9dGZncmlkX3NvbHV0aW9ucyZjaGF0PW5ldHdvcmtfZGVwbG95XCIsXG4gICAgICAgICAgICAgICAgZmxpc3Q6IFwic29sdXRpb25zLmNoYXRmbG93P2F1dGhvcj10ZmdyaWRfc29sdXRpb25zJnBhY2thZ2U9dGZncmlkX3NvbHV0aW9ucyZjaGF0PXlvdXJfZmxpc3RcIixcbiAgICAgICAgICAgICAgICBtaW5pbzogXCJzb2x1dGlvbnMuY2hhdGZsb3c/YXV0aG9yPXRmZ3JpZF9zb2x1dGlvbnMmcGFja2FnZT10ZmdyaWRfc29sdXRpb25zJmNoYXQ9bWluaW9fZGVwbG95XCIsXG4gICAgICAgICAgICAgICAgd2ViZ2F0ZXdheTogXCJzb2x1dGlvbnMuY2hhdGZsb3c/YXV0aG9yPXRmZ3JpZF9zb2x1dGlvbnMmcGFja2FnZT10ZmdyaWRfc29sdXRpb25zJmNoYXQ9d2ViZ2F0ZXdheV9kZXBsb3lcIixcbiAgICAgICAgICAgICAgICBrOHNfY2x1c3RlcjogXCJzb2x1dGlvbnMuY2hhdGZsb3c/YXV0aG9yPXRmZ3JpZF9zb2x1dGlvbnMmcGFja2FnZT10ZmdyaWRfc29sdXRpb25zJmNoYXQ9a3ViZXJuZXRlc19jbHVzdGVyX2RlcGxveVwiLFxuICAgICAgICAgICAgICAgIHRocmVlYm90OiBcInNvbHV0aW9ucy5jaGF0Zmxvdz9hdXRob3I9dGZncmlkJnBhY2thZ2U9dGhyZWVib3RfcHJvdmlzaW9uaW5nJmNoYXQ9dGhyZWVib3RfcmVzZXJ2YXRpb25cIixcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgdGhpcy5tZW51ID0gdGhpcy4kJChcIm1lbnVcIik7XG4gICAgICAgIHRoaXMuaGVhZGVyID0gdGhpcy4kJChcImhlYWRlclwiKTtcblxuICAgICAgICB0aGlzLmJ1dHRvblNob3dNZW51ID0gdGhpcy4kJChcImJ1dHRvbl9zaG93X21lbnVcIik7XG4gICAgICAgIHRoaXMuYnV0dG9uSGlkZU1lbnUgPSB0aGlzLiQkKFwiYnV0dG9uX2hpZGVfbWVudVwiKTtcblxuXG4gICAgICAgIHRoaXMud2ViaXgudWkoe1xuICAgICAgICAgICAgdmlldzogXCJzdWJtZW51XCIsXG4gICAgICAgICAgICBpZDogXCJ1c2VyX21lbnVcIixcbiAgICAgICAgICAgIGF1dG93aWR0aDogdHJ1ZSxcbiAgICAgICAgICAgIGRhdGE6IFtdXG4gICAgICAgIH0pO1xuXG4gICAgICAgIHRoaXMudXNlck1lbnUgPSAkJChcInVzZXJfbWVudVwiKTtcbiAgICAgICAgdGhpcy51c2VyTWVudS5hdHRhY2hFdmVudChcIm9uSXRlbUNsaWNrXCIsIGZ1bmN0aW9uIChpZCwgZSwgbm9kZSkge1xuICAgICAgICAgICAgaWYgKGlkID09IFwibG9nb3V0XCIpIHtcbiAgICAgICAgICAgICAgICBhdXRoLmxvZ291dCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICB0aGlzLnVzZXJuYW1lTGFiZWwgPSAkJChcInVzZXJuYW1lX2xhYmVsXCIpO1xuXG4gICAgICAgIGF1dGguZ2V0Q3VycmVudFVzZXIoKS50aGVuKGRhdGEgPT4ge1xuICAgICAgICAgICAgY29uc3QgaW5mbyA9IGRhdGEuanNvbigpXG4gICAgICAgICAgICBsZXQgdXNlcm5hbWUgPSBpbmZvLnVzZXJuYW1lO1xuXG4gICAgICAgICAgICBpZiAoaW5mby5kZXZtb2RlKSB7XG4gICAgICAgICAgICAgICAgdXNlcm5hbWUgKz0gXCIgW2RldmVsb3BtZW50XVwiXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHNlbGYudXNlcm5hbWVMYWJlbC5jb25maWcubGFiZWwgPSB1c2VybmFtZTtcbiAgICAgICAgICAgIHNlbGYudXNlcm5hbWVMYWJlbC5jb25maWcud2lkdGggPSB3ZWJpeC5odG1sLmdldFRleHRTaXplKHVzZXJuYW1lKSArIDEwO1xuICAgICAgICAgICAgc2VsZi51c2VybmFtZUxhYmVsLnJlZnJlc2goKTtcblxuICAgICAgICAgICAgc2VsZi51c2VyTWVudS5hZGQoeyBpZDogJ2VtYWlsJywgdmFsdWU6IGluZm8uZW1haWwgfSlcbiAgICAgICAgICAgIHNlbGYudXNlck1lbnUuYWRkKHsgaWQ6ICdsb2dvdXQnLCB2YWx1ZTogXCJMb2dvdXRcIiB9KVxuICAgICAgICB9KS5jYXRjaCgoKSA9PiB7XG4gICAgICAgICAgICBhdXRoLmxvZ291dCgpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NvdXJjZXMvdmlld3MvbWFpbi5qcyIsImltcG9ydCB7IEpldFZpZXcgfSBmcm9tIFwid2ViaXgtamV0XCI7XG5cbmltcG9ydCB7IGRhdGVGb3JtYXR0ZXIgfSBmcm9tIFwiLi4vLi4vY29tbW9uL2Zvcm1hdHRlcnNcIjtcbmltcG9ydCB7IG15am9icyB9IGZyb20gXCIuLi8uLi9zZXJ2aWNlcy9teWpvYnNcIjtcbmltcG9ydCBKb2JEZXRhaWxzVmlldyBmcm9tIFwiLi9qb2JEZXRhaWxzXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEpvYnNWaWV3IGV4dGVuZHMgSmV0VmlldyB7XG4gICAgY29uZmlnKCkge1xuICAgICAgICBjb25zdCB2aWV3ID0ge1xuICAgICAgICAgICAgdmlldzogXCJkYXRhdGFibGVcIixcbiAgICAgICAgICAgIGlkOiBcImpvYnNfdGFibGVcIixcbiAgICAgICAgICAgIHJlc2l6ZUNvbHVtbjogdHJ1ZSxcbiAgICAgICAgICAgIHNlbGVjdDogdHJ1ZSxcbiAgICAgICAgICAgIG11bHRpc2VsZWN0OiB0cnVlLFxuICAgICAgICAgICAgY3NzOiBcIndlYml4X2hlYWRlcl9ib3JkZXIgd2ViaXhfZGF0YV9ib3JkZXJcIixcbiAgICAgICAgICAgIGNvbHVtbnM6IFt7XG4gICAgICAgICAgICAgICAgaWQ6IFwiaW5kZXhcIixcbiAgICAgICAgICAgICAgICBoZWFkZXI6IFwiI1wiLFxuICAgICAgICAgICAgICAgIHNvcnQ6IFwiaW50XCIsXG4gICAgICAgICAgICAgICAgYXV0b3dpZHRoOiB0cnVlLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBpZDogXCJjYXRlZ29yeVwiLFxuICAgICAgICAgICAgICAgIGhlYWRlcjogXCJDYXRlZ29yeVwiLFxuICAgICAgICAgICAgICAgIHNvcnQ6IFwic3RyaW5nXCJcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgaWQ6IFwidGltZV9zdGFydFwiLFxuICAgICAgICAgICAgICAgIGhlYWRlcjogXCJTdGFydCB0aW1lXCIsXG4gICAgICAgICAgICAgICAgc29ydDogXCJkYXRlXCIsXG4gICAgICAgICAgICAgICAgZm9ybWF0OiBkYXRlRm9ybWF0dGVyLFxuICAgICAgICAgICAgICAgIHdpZHRoOiAyMDBcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgaWQ6IFwidGltZV9zdG9wXCIsXG4gICAgICAgICAgICAgICAgaGVhZGVyOiBcIlN0b3AgdGltZVwiLFxuICAgICAgICAgICAgICAgIHNvcnQ6IFwiZGF0ZVwiLFxuICAgICAgICAgICAgICAgIGZvcm1hdDogZGF0ZUZvcm1hdHRlcixcbiAgICAgICAgICAgICAgICB3aWR0aDogMjAwXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGlkOiBcInRpbWVvdXRcIixcbiAgICAgICAgICAgICAgICBoZWFkZXI6IFwiVGltZW91dFwiLFxuICAgICAgICAgICAgICAgIHNvcnQ6IFwiaW50XCJcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgaWQ6IFwiYWN0aW9uX2lkXCIsXG4gICAgICAgICAgICAgICAgaGVhZGVyOiBcIkFjdGlvblwiLFxuICAgICAgICAgICAgICAgIHNvcnQ6IFwic3RyaW5nXCJcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgaWQ6IFwia3dhcmdzXCIsXG4gICAgICAgICAgICAgICAgaGVhZGVyOiBcIkFyZ3VtZW50c1wiLFxuICAgICAgICAgICAgICAgIHNvcnQ6IFwic3RyaW5nXCIsXG4gICAgICAgICAgICAgICAgZm9ybWF0OiBKU09OLnN0cmluZ2lmeVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBpZDogXCJyZXN1bHRcIixcbiAgICAgICAgICAgICAgICBoZWFkZXI6IFtcbiAgICAgICAgICAgICAgICAgICAgXCJSZXN1bHRcIixcbiAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29udGVudDogXCJ0ZXh0RmlsdGVyXCJcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgc29ydDogXCJzdHJpbmdcIixcbiAgICAgICAgICAgICAgICBmb3JtYXQ6IEpTT04uc3RyaW5naWZ5LFxuICAgICAgICAgICAgfV0sXG4gICAgICAgICAgICBzY2hlbWU6IHtcbiAgICAgICAgICAgICAgICAkaW5pdDogZnVuY3Rpb24gKG9iaikge1xuICAgICAgICAgICAgICAgICAgICBvYmouaW5kZXggPSB0aGlzLmNvdW50KCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgfTtcblxuICAgICAgICByZXR1cm4gdmlldztcbiAgICB9XG5cbiAgICBpbml0KHZpZXcpIHtcbiAgICAgICAgY29uc3Qgc2VsZiA9IHRoaXNcbiAgICAgICAgc2VsZi5qb2JEZXRhaWxzVmlldyA9IHNlbGYudWkoSm9iRGV0YWlsc1ZpZXcpO1xuICAgICAgICBzZWxmLmpvYlRhYmxlID0gdGhpcy4kJChcImpvYnNfdGFibGVcIik7XG4gICAgICAgIFxuICAgICAgICBteWpvYnMubGlzdEpvYnMoKS50aGVuKGRhdGEgPT4ge1xuICAgICAgICAgICAgdmlldy5wYXJzZShkYXRhKTtcbiAgICAgICAgfSk7XG4gICAgICAgIHNlbGYuam9iVGFibGUuYXR0YWNoRXZlbnQoXCJvbkl0ZW1EYmxDbGlja1wiLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBsZXQgaWQgPSBzZWxmLmpvYlRhYmxlLmdldFNlbGVjdGVkSWQoKVxuICAgICAgICAgICAgbGV0IGl0ZW0gPSBzZWxmLmpvYlRhYmxlLmdldEl0ZW0oaWQpXG4gICAgICAgICAgICBsZXQgam9iRGF0YSA9IHtcbiAgICAgICAgICAgICAgICAnYWN0aW9uX2lkJzppdGVtWydhY3Rpb25faWQnXSxcbiAgICAgICAgICAgICAgICAnZGVidWcnOml0ZW1bJ2RlYnVnJ10udG9TdHJpbmcoKSxcbiAgICAgICAgICAgICAgICAnZGllJzppdGVtWydkaWUnXS50b1N0cmluZygpLFxuICAgICAgICAgICAgICAgICdlcnJvcic6aXRlbVsnZXJyb3InXVsnbWVzc2FnZSddLFxuICAgICAgICAgICAgICAgICdlcnJvcl9jYXQnOml0ZW1bJ2Vycm9yX2NhdCddLFxuICAgICAgICAgICAgICAgICdjYXRlZ29yeSc6aXRlbVsnY2F0ZWdvcnknXSA/IGl0ZW1bJ2NhdGVnb3J5J106J05vIENhdGVnb3J5JyxcbiAgICAgICAgICAgICAgICAncmVzdWx0JzpKU09OLnN0cmluZ2lmeShpdGVtWydyZXN1bHQnXSksXG4gICAgICAgICAgICAgICAgJ25hbWUnOml0ZW1bJ25hbWUnXSxcbiAgICAgICAgICAgICAgICAnc3RhdGUnOml0ZW1bJ3N0YXRlJ10sXG4gICAgICAgICAgICAgICAgJ2t3YXJncyc6SlNPTi5zdHJpbmdpZnkoaXRlbVsna3dhcmdzJ10pLFxuICAgICAgICAgICAgICAgICd0aW1lX3N0b3AnOmRhdGVGb3JtYXR0ZXIoaXRlbVsndGltZV9zdG9wJ10pLFxuICAgICAgICAgICAgICAgICd0aW1lX3N0YXJ0JzpkYXRlRm9ybWF0dGVyKGl0ZW1bJ3RpbWVfc3RhcnQnXSksXG4gICAgICAgICAgICAgICAgJ3RpbWVvdXQnOml0ZW1bJ3RpbWVvdXQnXSxcbiAgICAgICAgICAgICAgICAnZGVwZW5kZW5jaWVzJzppdGVtWydkZXBlbmRlbmNpZXMnXVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgc2VsZi5qb2JEZXRhaWxzVmlldy5zaG93Sm9iRGV0YWlscyhqb2JEYXRhKTtcbiAgICAgICAgfSk7XG4gICAgfVxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc291cmNlcy92aWV3cy9teWpvYnMvam9icy5qcyIsImltcG9ydCB7IFNlcnZpY2UgfSBmcm9tIFwiLi4vY29tbW9uL2FwaVwiO1xuXG5jb25zdCBCQVNFX1VSTCA9IFwiL3plcm9ib3QvYWRtaW4vYWN0b3JzL215am9ic1wiO1xuXG5jbGFzcyBNeWpvYnNTZXJ2aWNlIGV4dGVuZHMgU2VydmljZSB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHN1cGVyKEJBU0VfVVJMKTtcbiAgICB9XG5cbiAgICBsaXN0Sm9icygpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0Q2FsbChcImxpc3Rfam9ic1wiKTtcbiAgICB9XG5cbiAgICBsaXN0V29ya2VycygpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0Q2FsbChcImxpc3Rfd29ya2Vyc1wiKTtcbiAgICB9XG59XG5cbmV4cG9ydCBjb25zdCBteWpvYnMgPSBuZXcgTXlqb2JzU2VydmljZSgpO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc291cmNlcy9zZXJ2aWNlcy9teWpvYnMuanMiLCJpbXBvcnQgeyBKZXRWaWV3IH0gZnJvbSBcIndlYml4LWpldFwiO1xuXG5pbXBvcnQgeyBkYXRlRm9ybWF0dGVyIH0gZnJvbSBcIi4uLy4uL2NvbW1vbi9mb3JtYXR0ZXJzXCI7XG5pbXBvcnQgeyBteWpvYnMgfSBmcm9tIFwiLi4vLi4vc2VydmljZXMvbXlqb2JzXCI7XG5pbXBvcnQgV29ya2VyRGV0YWlsc1ZpZXcgZnJvbSBcIi4vd29ya2VyRGV0YWlsc1wiXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEpvYnNWaWV3IGV4dGVuZHMgSmV0VmlldyB7XG4gICAgY29uZmlnKCkge1xuICAgICAgICBjb25zdCB2aWV3ID0ge1xuICAgICAgICAgICAgdmlldzogXCJkYXRhdGFibGVcIixcbiAgICAgICAgICAgIGlkOiBcIndvcmtlcnNfdGFibGVcIixcbiAgICAgICAgICAgIHJlc2l6ZUNvbHVtbjogdHJ1ZSxcbiAgICAgICAgICAgIHNlbGVjdDogdHJ1ZSxcbiAgICAgICAgICAgIG11bHRpc2VsZWN0OiB0cnVlLFxuICAgICAgICAgICAgY3NzOiBcIndlYml4X2hlYWRlcl9ib3JkZXIgd2ViaXhfZGF0YV9ib3JkZXJcIixcbiAgICAgICAgICAgIGNvbHVtbnM6IFt7XG4gICAgICAgICAgICAgICAgaWQ6IFwiaW5kZXhcIixcbiAgICAgICAgICAgICAgICBoZWFkZXI6IFwiI1wiLFxuICAgICAgICAgICAgICAgIHNvcnQ6IFwiaW50XCIsXG4gICAgICAgICAgICAgICAgYXV0b3dpZHRoOiB0cnVlLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBpZDogXCJzdGF0ZVwiLFxuICAgICAgICAgICAgICAgIGhlYWRlcjogXCJTdGF0ZVwiLFxuICAgICAgICAgICAgICAgIHNvcnQ6IFwic3RyaW5nXCJcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgaWQ6IFwiaGFsdFwiLFxuICAgICAgICAgICAgICAgIGhlYWRlcjogXCJIYWx0ZWRcIixcbiAgICAgICAgICAgICAgICBzb3J0OiBcInN0cmluZ1wiLFxuICAgICAgICAgICAgICAgIGZvcm1hdDogZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB2YWx1ZSA/ICdZZXMnIDogJ05vJztcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBpZDogXCJwaWRcIixcbiAgICAgICAgICAgICAgICBoZWFkZXI6IFwiUElEXCIsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGlkOiBcImN1cnJlbnRfam9iXCIsXG4gICAgICAgICAgICAgICAgaGVhZGVyOiBcIkN1cnJlbnQgam9iXCIsXG4gICAgICAgICAgICAgICAgZm9ybWF0OiBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHZhbHVlID09IDIxNDc0ODM2NDcgPyAnTi9BJyA6IHZhbHVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgaWQ6IFwibGFzdF91cGRhdGVcIixcbiAgICAgICAgICAgICAgICBoZWFkZXI6IFwiTGFzdCB1cGRhdGVcIixcbiAgICAgICAgICAgICAgICBzb3J0OiBcImRhdGVcIixcbiAgICAgICAgICAgICAgICBmb3JtYXQ6IGRhdGVGb3JtYXR0ZXIsXG4gICAgICAgICAgICAgICAgd2lkdGg6IDIwMFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBpZDogXCJ0aW1lX3N0YXJ0XCIsXG4gICAgICAgICAgICAgICAgaGVhZGVyOiBcIlN0YXJ0IHRpbWVcIixcbiAgICAgICAgICAgICAgICBzb3J0OiBcImRhdGVcIixcbiAgICAgICAgICAgICAgICBmb3JtYXQ6IGRhdGVGb3JtYXR0ZXIsXG4gICAgICAgICAgICAgICAgd2lkdGg6IDIwMFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBpZDogXCJ0aW1lb3V0XCIsXG4gICAgICAgICAgICAgICAgaGVhZGVyOiBcIlRpbWVvdXRcIixcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgaWQ6IFwidHlwZVwiLFxuICAgICAgICAgICAgICAgIGhlYWRlcjogXCJUeXBlXCIsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGlkOiBcImVycm9yXCIsXG4gICAgICAgICAgICAgICAgaGVhZGVyOiBcIkVycm9yXCIsXG4gICAgICAgICAgICB9XSxcbiAgICAgICAgICAgIGF1dG9Db25maWc6IHRydWUsXG4gICAgICAgICAgICBzY2hlbWU6IHtcbiAgICAgICAgICAgICAgICAkaW5pdDogZnVuY3Rpb24gKG9iaikge1xuICAgICAgICAgICAgICAgICAgICBvYmouaW5kZXggPSB0aGlzLmNvdW50KCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgfTtcblxuICAgICAgICByZXR1cm4gdmlldztcbiAgICB9XG5cbiAgICBpbml0KHZpZXcpIHtcbiAgICAgICAgY29uc3Qgc2VsZiA9IHRoaXNcbiAgICAgICAgc2VsZi53b3JrZXJEZXRhaWxzVmlldyA9IHNlbGYudWkoV29ya2VyRGV0YWlsc1ZpZXcpO1xuXG4gICAgICAgIG15am9icy5saXN0V29ya2VycygpLnRoZW4oZGF0YSA9PiB7XG4gICAgICAgICAgICB2aWV3LnBhcnNlKGRhdGEpO1xuICAgICAgICB9KTtcblxuICAgICAgICBzZWxmLndvcmtlclRhYmxlID0gdGhpcy4kJChcIndvcmtlcnNfdGFibGVcIik7XG5cbiAgICAgICAgc2VsZi53b3JrZXJUYWJsZS5hdHRhY2hFdmVudChcIm9uSXRlbURibENsaWNrXCIsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIGxldCBpZCA9IHNlbGYud29ya2VyVGFibGUuZ2V0U2VsZWN0ZWRJZCgpXG4gICAgICAgICAgICBsZXQgaXRlbSA9IHNlbGYud29ya2VyVGFibGUuZ2V0SXRlbShpZClcbiAgICAgICAgICAgIGxldCBXb3JrZXJEYXRhID0ge1xuICAgICAgICAgICAgICAgICdkZWJ1Zyc6aXRlbVsnZGVidWcnXS50b1N0cmluZygpLFxuICAgICAgICAgICAgICAgICdoYWx0JzppdGVtWydoYWx0J10udG9TdHJpbmcoKSxcbiAgICAgICAgICAgICAgICAnZXJyb3InOml0ZW1bJ2Vycm9yJ11bJ21lc3NhZ2UnXSxcbiAgICAgICAgICAgICAgICAncGlkJzppdGVtWydwaWQnXSxcbiAgICAgICAgICAgICAgICAnY3VycmVudF9qb2InOml0ZW1bJ2N1cnJlbnRfam9iJ10sXG4gICAgICAgICAgICAgICAgJ25hbWUnOml0ZW1bJ25hbWUnXSxcbiAgICAgICAgICAgICAgICAnc3RhdGUnOml0ZW1bJ3N0YXRlJ10sXG4gICAgICAgICAgICAgICAgJ2xhc3RfdXBkYXRlJzpkYXRlRm9ybWF0dGVyKGl0ZW1bJ2xhc3RfdXBkYXRlJ10pLFxuICAgICAgICAgICAgICAgICd0aW1lX3N0YXJ0JzpkYXRlRm9ybWF0dGVyKGl0ZW1bJ3RpbWVfc3RhcnQnXSksXG4gICAgICAgICAgICAgICAgJ3RpbWVvdXQnOml0ZW1bJ3RpbWVvdXQnXSxcbiAgICAgICAgICAgICAgICAndHlwZSc6aXRlbVsndHlwZSddXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBzZWxmLndvcmtlckRldGFpbHNWaWV3LnNob3dXb3JrZXJEZXRhaWxzKFdvcmtlckRhdGEpO1xuICAgICAgICB9KTtcbiAgICB9XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zb3VyY2VzL3ZpZXdzL215am9icy93b3JrZXJzLmpzIiwiaW1wb3J0IHsgRXh0ZXJuYWxWaWV3IH0gZnJvbSBcIi4uL2V4dGVybmFsXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIENoYXRmbG93VmlldyBleHRlbmRzIEV4dGVybmFsVmlldyB7XG4gICAgY29uc3RydWN0b3IoYXBwLCBuYW1lKSB7XG4gICAgICAgIHN1cGVyKGFwcCwgbmFtZSk7XG5cbiAgICAgICAgdGhpcy5iYXNlR2l0VXJsID0gXCJodHRwczovL2dpdGh1Yi5jb20vdGhyZWVmb2xkdGVjaC9qdW1wc2NhbGVYX3RocmVlYm90L3RyZWUvZGV2ZWxvcG1lbnQvVGhyZWVCb3RQYWNrYWdlc1wiO1xuXG4gICAgfVxuXG4gICAgdXJsQ2hhbmdlKHZpZXcsIHVybCkge1xuICAgICAgICBjb25zdCBwYXJhbXMgPSB1cmxbMF0ucGFyYW1zO1xuICAgICAgICBpZiAoT2JqZWN0LmtleXMocGFyYW1zKS5sZW5ndGggIT09IDMpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IHBhY2thZ2VOYW1lID0gYCR7cGFyYW1zLmF1dGhvcn0uJHtwYXJhbXMucGFja2FnZX1gXG4gICAgICAgIGNvbnN0IHBhY2thZ2VVcmwgPSBwYWNrYWdlTmFtZS5yZXBsYWNlKFwiLlwiLCBcIi9cIik7XG5cbiAgICAgICAgdGhpcy50YXJnZXRVcmwgPSBgLyR7cGFja2FnZVVybH0vY2hhdC8ke3BhcmFtcy5jaGF0fT9ub2hlYWRlcj15ZXNgO1xuICAgICAgICB0aGlzLnJlcXVpcmVkUGFja2FnZXMgPSB7fVxuICAgICAgICB0aGlzLnJlcXVpcmVkUGFja2FnZXNbcGFja2FnZU5hbWVdID0gYCR7dGhpcy5iYXNlR2l0VXJsfS8ke3BhY2thZ2VVcmx9YDtcblxuICAgICAgICB0aGlzLmluaXQodmlldyk7XG4gICAgfVxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc291cmNlcy92aWV3cy9zb2x1dGlvbnMvY2hhdGZsb3cuanMiLCJpbXBvcnQgeyBFeHRlcm5hbFZpZXcgfSBmcm9tIFwiLi4vZXh0ZXJuYWxcIjtcblxuY29uc3QgVEZHUklEU0RLX1VSTCA9IFwiL3RocmVlZm9sZC9pbmZvX3RmZ3JpZHNkay9cIjtcbmNvbnN0IFJFUVVJUkVEX1BBQ0tBR0VTID0ge1xuICAgIFwidGhyZWVmb2xkLndpa2lzXCI6IFwiaHR0cHM6Ly9naXRodWIuY29tL3RocmVlZm9sZHRlY2gvanVtcHNjYWxlWF90aHJlZWJvdC90cmVlL2RldmVsb3BtZW50L1RocmVlQm90UGFja2FnZXMvdGhyZWVmb2xkL3dpa2lzXCJcbn1cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVEZHcmlkU0RLV2lraSBleHRlbmRzIEV4dGVybmFsVmlldyB7XG4gICAgY29uc3RydWN0b3IoYXBwLCBuYW1lKSB7XG4gICAgICAgIHN1cGVyKGFwcCwgbmFtZSwgVEZHUklEU0RLX1VSTCwgUkVRVUlSRURfUEFDS0FHRVMpO1xuICAgIH1cbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NvdXJjZXMvdmlld3MvdGZ3aWtpcy90ZmdyaWRzZGsuanMiLCJpbXBvcnQgeyBFeHRlcm5hbFZpZXcgfSBmcm9tIFwiLi4vZXh0ZXJuYWxcIjtcblxuY29uc3QgVEhSRUVGT0xEX1VSTCA9IFwiL3RocmVlZm9sZC9pbmZvX3RocmVlZm9sZC9cIjtcbmNvbnN0IFJFUVVJUkVEX1BBQ0tBR0VTID0ge1xuICAgIFwidGhyZWVmb2xkLndpa2lzXCI6IFwiaHR0cHM6Ly9naXRodWIuY29tL3RocmVlZm9sZHRlY2gvanVtcHNjYWxlWF90aHJlZWJvdC90cmVlL2RldmVsb3BtZW50L1RocmVlQm90UGFja2FnZXMvdGhyZWVmb2xkL3dpa2lzXCJcbn1cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVGhyZWVmb2xkV2lraSBleHRlbmRzIEV4dGVybmFsVmlldyB7XG4gICAgY29uc3RydWN0b3IoYXBwLCBuYW1lKSB7XG4gICAgICAgIHN1cGVyKGFwcCwgbmFtZSwgVEhSRUVGT0xEX1VSTCwgUkVRVUlSRURfUEFDS0FHRVMpO1xuICAgIH1cbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NvdXJjZXMvdmlld3MvdGZ3aWtpcy90aHJlZWZvbGQuanMiLCJpbXBvcnQgeyBFeHRlcm5hbFZpZXcgfSBmcm9tIFwiLi4vZXh0ZXJuYWxcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgV2lraUV4dGVybmFsVmlldyBleHRlbmRzIEV4dGVybmFsVmlldyB7XG4gICAgY29uc3RydWN0b3IoYXBwLCBuYW1lKSB7XG4gICAgICAgIHN1cGVyKGFwcCwgbmFtZSk7XG5cbiAgICB9XG5cbiAgICB1cmxDaGFuZ2UodmlldywgdXJsKSB7XG4gICAgICAgIGNvbnN0IHBhcmFtcyA9IHVybFswXS5wYXJhbXM7XG4gICAgICAgIGlmIChPYmplY3Qua2V5cyhwYXJhbXMpLmxlbmd0aCAhPT0gMSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy50YXJnZXRVcmwgPSBgL3dpa2kvJHtwYXJhbXMubmFtZX1gO1xuICAgICAgICBcbiAgICAgICAgdGhpcy5pbml0KHZpZXcpO1xuICAgIH1cbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NvdXJjZXMvdmlld3Mvd2lraXMvdmlldy5qcyIsImltcG9ydCBcIi4vc3R5bGVzL2FwcC5jc3NcIjtcbmltcG9ydCB7SmV0QXBwfSBmcm9tIFwid2ViaXgtamV0XCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEludmVudG9yeUFwcCBleHRlbmRzIEpldEFwcCB7XG5cdGNvbnN0cnVjdG9yKGNvbmZpZyl7XG5cdFx0c3VwZXIod2ViaXguZXh0ZW5kKHtcblx0XHRcdGlkOlx0XHRcdEFQUE5BTUUsXG5cdFx0XHR2ZXJzaW9uOlx0VkVSU0lPTixcblx0XHRcdHN0YXJ0Olx0XHRcIi9tYWluL2Rhc2hcIixcblx0XHRcdGRlYnVnOlx0XHQhUFJPRFVDVElPTlxuXHRcdH0sIGNvbmZpZywgdHJ1ZSkpO1xuXG5cdFx0LyogZXJyb3IgdHJhY2tpbmcgKi9cblx0XHR0aGlzLmF0dGFjaEV2ZW50KFwiYXBwOmVycm9yOnJlc29sdmVcIiwgZnVuY3Rpb24obmFtZSwgZXJyb3Ipe1xuXHRcdFx0d2luZG93LmNvbnNvbGUuZXJyb3IoZXJyb3IpO1xuXHRcdH0pO1xuXHR9XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zb3VyY2VzL2FwcC5qcyIsIi8vIHJlbW92ZWQgYnkgZXh0cmFjdC10ZXh0LXdlYnBhY2stcGx1Z2luXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9zb3VyY2VzL3N0eWxlcy9hcHAuY3NzXG4vLyBtb2R1bGUgaWQgPSA1MVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJ2YXIgbWFwID0ge1xuXHRcIi4vYWxlcnRzXCI6IDcsXG5cdFwiLi9hbGVydHMvXCI6IDcsXG5cdFwiLi9hbGVydHMvYWxlcnRcIjogMjMsXG5cdFwiLi9hbGVydHMvYWxlcnQuanNcIjogMjMsXG5cdFwiLi9hbGVydHMvZGF0YVwiOiA1LFxuXHRcIi4vYWxlcnRzL2RhdGEuanNcIjogNSxcblx0XCIuL2FsZXJ0cy9pbmRleFwiOiA3LFxuXHRcIi4vYWxlcnRzL2luZGV4LmpzXCI6IDcsXG5cdFwiLi9jYXBhY2l0eVwiOiA5LFxuXHRcIi4vY2FwYWNpdHkvXCI6IDksXG5cdFwiLi9jYXBhY2l0eS9pbmRleFwiOiA5LFxuXHRcIi4vY2FwYWNpdHkvaW5kZXguanNcIjogOSxcblx0XCIuL2NpcmNsZXNcIjogMTAsXG5cdFwiLi9jaXJjbGVzL1wiOiAxMCxcblx0XCIuL2NpcmNsZXMvaW5kZXhcIjogMTAsXG5cdFwiLi9jaXJjbGVzL2luZGV4LmpzXCI6IDEwLFxuXHRcIi4vY2lyY2xlc3Rvcmllc1wiOiAxMSxcblx0XCIuL2NpcmNsZXN0b3JpZXMvXCI6IDExLFxuXHRcIi4vY2lyY2xlc3Rvcmllcy9pbmRleFwiOiAxMSxcblx0XCIuL2NpcmNsZXN0b3JpZXMvaW5kZXguanNcIjogMTEsXG5cdFwiLi9jaXJjbGV0YXNrc1wiOiAxMixcblx0XCIuL2NpcmNsZXRhc2tzL1wiOiAxMixcblx0XCIuL2NpcmNsZXRhc2tzL2luZGV4XCI6IDEyLFxuXHRcIi4vY2lyY2xldGFza3MvaW5kZXguanNcIjogMTIsXG5cdFwiLi9jb2Rlc2VydmVyXCI6IDEzLFxuXHRcIi4vY29kZXNlcnZlci9cIjogMTMsXG5cdFwiLi9jb2Rlc2VydmVyL2luZGV4XCI6IDEzLFxuXHRcIi4vY29kZXNlcnZlci9pbmRleC5qc1wiOiAxMyxcblx0XCIuL2Rhc2hcIjogMTQsXG5cdFwiLi9kYXNoL1wiOiAxNCxcblx0XCIuL2Rhc2gvZGlza1NwYWNlXCI6IDM1LFxuXHRcIi4vZGFzaC9kaXNrU3BhY2UuanNcIjogMzUsXG5cdFwiLi9kYXNoL2hlYWx0aFwiOiAzNixcblx0XCIuL2Rhc2gvaGVhbHRoLmpzXCI6IDM2LFxuXHRcIi4vZGFzaC9pbmRleFwiOiAxNCxcblx0XCIuL2Rhc2gvaW5kZXguanNcIjogMTQsXG5cdFwiLi9kYXNoL2pzeEluZm9cIjogMzcsXG5cdFwiLi9kYXNoL2pzeEluZm8uanNcIjogMzcsXG5cdFwiLi9kYXNoL3Byb2Nlc3NEZXRhaWxzXCI6IDI2LFxuXHRcIi4vZGFzaC9wcm9jZXNzRGV0YWlscy5qc1wiOiAyNixcblx0XCIuL2Rhc2gvcHJvY2Vzc2VzXCI6IDM4LFxuXHRcIi4vZGFzaC9wcm9jZXNzZXMuanNcIjogMzgsXG5cdFwiLi9kYXNoL3Byb2Nlc3Nlc0xpc3RcIjogMzksXG5cdFwiLi9kYXNoL3Byb2Nlc3Nlc0xpc3QuanNcIjogMzksXG5cdFwiLi9kYXNoL3J1bm5pbmdQb3J0c1wiOiA0MCxcblx0XCIuL2Rhc2gvcnVubmluZ1BvcnRzLmpzXCI6IDQwLFxuXHRcIi4vZGVwbG95ZWRTb2x1dGlvbnNcIjogMTUsXG5cdFwiLi9kZXBsb3llZFNvbHV0aW9ucy9cIjogMTUsXG5cdFwiLi9kZXBsb3llZFNvbHV0aW9ucy9pbmRleFwiOiAxNSxcblx0XCIuL2RlcGxveWVkU29sdXRpb25zL2luZGV4LmpzXCI6IDE1LFxuXHRcIi4vZGVwbG95ZWRTb2x1dGlvbnMvcmVzZXJ2YXRpb25cIjogMjcsXG5cdFwiLi9kZXBsb3llZFNvbHV0aW9ucy9yZXNlcnZhdGlvbi5qc1wiOiAyNyxcblx0XCIuL2Vycm9ycy9kaWFsb2dcIjogMyxcblx0XCIuL2Vycm9ycy9kaWFsb2cuanNcIjogMyxcblx0XCIuL2V4dGVybmFsXCI6IDEsXG5cdFwiLi9leHRlcm5hbC9cIjogMSxcblx0XCIuL2V4dGVybmFsL2luZGV4XCI6IDEsXG5cdFwiLi9leHRlcm5hbC9pbmRleC5qc1wiOiAxLFxuXHRcIi4vZmFybW1hbmFnZW1lbnRcIjogMTYsXG5cdFwiLi9mYXJtbWFuYWdlbWVudC9cIjogMTYsXG5cdFwiLi9mYXJtbWFuYWdlbWVudC9pbmRleFwiOiAxNixcblx0XCIuL2Zhcm1tYW5hZ2VtZW50L2luZGV4LmpzXCI6IDE2LFxuXHRcIi4vanVweXRlclwiOiAxNyxcblx0XCIuL2p1cHl0ZXIvXCI6IDE3LFxuXHRcIi4vanVweXRlci9pbmRleFwiOiAxNyxcblx0XCIuL2p1cHl0ZXIvaW5kZXguanNcIjogMTcsXG5cdFwiLi9sb2dzXCI6IDE4LFxuXHRcIi4vbG9ncy9cIjogMTgsXG5cdFwiLi9sb2dzL2FwcExvZ3NcIjogMjgsXG5cdFwiLi9sb2dzL2FwcExvZ3MuanNcIjogMjgsXG5cdFwiLi9sb2dzL2luZGV4XCI6IDE4LFxuXHRcIi4vbG9ncy9pbmRleC5qc1wiOiAxOCxcblx0XCIuL21haW5cIjogNDEsXG5cdFwiLi9tYWluLmpzXCI6IDQxLFxuXHRcIi4vbXlqb2JzL2pvYkRldGFpbHNcIjogMjksXG5cdFwiLi9teWpvYnMvam9iRGV0YWlscy5qc1wiOiAyOSxcblx0XCIuL215am9icy9qb2JzXCI6IDQyLFxuXHRcIi4vbXlqb2JzL2pvYnMuanNcIjogNDIsXG5cdFwiLi9teWpvYnMvd29ya2VyRGV0YWlsc1wiOiAzMCxcblx0XCIuL215am9icy93b3JrZXJEZXRhaWxzLmpzXCI6IDMwLFxuXHRcIi4vbXlqb2JzL3dvcmtlcnNcIjogNDQsXG5cdFwiLi9teWpvYnMvd29ya2Vycy5qc1wiOiA0NCxcblx0XCIuL3BhY2thZ2VzXCI6IDE5LFxuXHRcIi4vcGFja2FnZXMvXCI6IDE5LFxuXHRcIi4vcGFja2FnZXMvaW5kZXhcIjogMTksXG5cdFwiLi9wYWNrYWdlcy9pbmRleC5qc1wiOiAxOSxcblx0XCIuL3Nka2V4YW1wbGVzXCI6IDIwLFxuXHRcIi4vc2RrZXhhbXBsZXMvXCI6IDIwLFxuXHRcIi4vc2RrZXhhbXBsZXMvaW5kZXhcIjogMjAsXG5cdFwiLi9zZGtleGFtcGxlcy9pbmRleC5qc1wiOiAyMCxcblx0XCIuL3NldHRpbmdzXCI6IDIxLFxuXHRcIi4vc2V0dGluZ3MvXCI6IDIxLFxuXHRcIi4vc2V0dGluZ3MvYWRtaW5zXCI6IDMxLFxuXHRcIi4vc2V0dGluZ3MvYWRtaW5zLmpzXCI6IDMxLFxuXHRcIi4vc2V0dGluZ3MvZ2VuZXJhbFwiOiAzMixcblx0XCIuL3NldHRpbmdzL2dlbmVyYWwuanNcIjogMzIsXG5cdFwiLi9zZXR0aW5ncy9pbmRleFwiOiAyMSxcblx0XCIuL3NldHRpbmdzL2luZGV4LmpzXCI6IDIxLFxuXHRcIi4vc29sdXRpb25zL2NoYXRmbG93XCI6IDQ1LFxuXHRcIi4vc29sdXRpb25zL2NoYXRmbG93LmpzXCI6IDQ1LFxuXHRcIi4vdGZ3aWtpcy90ZmdyaWRzZGtcIjogNDYsXG5cdFwiLi90Zndpa2lzL3RmZ3JpZHNkay5qc1wiOiA0Nixcblx0XCIuL3Rmd2lraXMvdGhyZWVmb2xkXCI6IDQ3LFxuXHRcIi4vdGZ3aWtpcy90aHJlZWZvbGQuanNcIjogNDcsXG5cdFwiLi93aWtpc1wiOiAyMixcblx0XCIuL3dpa2lzL1wiOiAyMixcblx0XCIuL3dpa2lzL2luZGV4XCI6IDIyLFxuXHRcIi4vd2lraXMvaW5kZXguanNcIjogMjIsXG5cdFwiLi93aWtpcy92aWV3XCI6IDQ4LFxuXHRcIi4vd2lraXMvdmlldy5qc1wiOiA0OFxufTtcbmZ1bmN0aW9uIHdlYnBhY2tDb250ZXh0KHJlcSkge1xuXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyh3ZWJwYWNrQ29udGV4dFJlc29sdmUocmVxKSk7XG59O1xuZnVuY3Rpb24gd2VicGFja0NvbnRleHRSZXNvbHZlKHJlcSkge1xuXHR2YXIgaWQgPSBtYXBbcmVxXTtcblx0aWYoIShpZCArIDEpKSAvLyBjaGVjayBmb3IgbnVtYmVyIG9yIHN0cmluZ1xuXHRcdHRocm93IG5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIgKyByZXEgKyBcIicuXCIpO1xuXHRyZXR1cm4gaWQ7XG59O1xud2VicGFja0NvbnRleHQua2V5cyA9IGZ1bmN0aW9uIHdlYnBhY2tDb250ZXh0S2V5cygpIHtcblx0cmV0dXJuIE9iamVjdC5rZXlzKG1hcCk7XG59O1xud2VicGFja0NvbnRleHQucmVzb2x2ZSA9IHdlYnBhY2tDb250ZXh0UmVzb2x2ZTtcbm1vZHVsZS5leHBvcnRzID0gd2VicGFja0NvbnRleHQ7XG53ZWJwYWNrQ29udGV4dC5pZCA9IDUyO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vc291cmNlcy92aWV3cyBeXFwuXFwvLiokXG4vLyBtb2R1bGUgaWQgPSA1MlxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvKiAgYW5zaV91cC5qc1xuICogIGF1dGhvciA6IERydSBOZWxzb25cbiAqICBsaWNlbnNlIDogTUlUXG4gKiAgaHR0cDovL2dpdGh1Yi5jb20vZHJ1ZHJ1L2Fuc2lfdXBcbiAqL1xuKGZ1bmN0aW9uIChyb290LCBmYWN0b3J5KSB7XG4gICAgaWYgKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZCkge1xuICAgICAgICAvLyBBTUQuIFJlZ2lzdGVyIGFzIGFuIGFub255bW91cyBtb2R1bGUuXG4gICAgICAgIGRlZmluZShbJ2V4cG9ydHMnXSwgZmFjdG9yeSk7XG4gICAgfSBlbHNlIGlmICh0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIGV4cG9ydHMubm9kZU5hbWUgIT09ICdzdHJpbmcnKSB7XG4gICAgICAgIC8vIENvbW1vbkpTXG4gICAgICAgIGZhY3RvcnkoZXhwb3J0cyk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgLy8gQnJvd3NlciBnbG9iYWxzXG4gICAgICAgIHZhciBleHAgPSB7fTtcbiAgICAgICAgZmFjdG9yeShleHApO1xuICAgICAgICByb290LkFuc2lVcCA9IGV4cC5kZWZhdWx0O1xuICAgIH1cbn0odGhpcywgZnVuY3Rpb24gKGV4cG9ydHMpIHtcblwidXNlIHN0cmljdFwiO1xudmFyIF9fbWFrZVRlbXBsYXRlT2JqZWN0ID0gKHRoaXMgJiYgdGhpcy5fX21ha2VUZW1wbGF0ZU9iamVjdCkgfHwgZnVuY3Rpb24gKGNvb2tlZCwgcmF3KSB7XG4gICAgaWYgKE9iamVjdC5kZWZpbmVQcm9wZXJ0eSkgeyBPYmplY3QuZGVmaW5lUHJvcGVydHkoY29va2VkLCBcInJhd1wiLCB7IHZhbHVlOiByYXcgfSk7IH0gZWxzZSB7IGNvb2tlZC5yYXcgPSByYXc7IH1cbiAgICByZXR1cm4gY29va2VkO1xufTtcbnZhciBQYWNrZXRLaW5kO1xuKGZ1bmN0aW9uIChQYWNrZXRLaW5kKSB7XG4gICAgUGFja2V0S2luZFtQYWNrZXRLaW5kW1wiRU9TXCJdID0gMF0gPSBcIkVPU1wiO1xuICAgIFBhY2tldEtpbmRbUGFja2V0S2luZFtcIlRleHRcIl0gPSAxXSA9IFwiVGV4dFwiO1xuICAgIFBhY2tldEtpbmRbUGFja2V0S2luZFtcIkluY29tcGxldGVcIl0gPSAyXSA9IFwiSW5jb21wbGV0ZVwiO1xuICAgIFBhY2tldEtpbmRbUGFja2V0S2luZFtcIkVTQ1wiXSA9IDNdID0gXCJFU0NcIjtcbiAgICBQYWNrZXRLaW5kW1BhY2tldEtpbmRbXCJVbmtub3duXCJdID0gNF0gPSBcIlVua25vd25cIjtcbiAgICBQYWNrZXRLaW5kW1BhY2tldEtpbmRbXCJTR1JcIl0gPSA1XSA9IFwiU0dSXCI7XG4gICAgUGFja2V0S2luZFtQYWNrZXRLaW5kW1wiT1NDVVJMXCJdID0gNl0gPSBcIk9TQ1VSTFwiO1xufSkoUGFja2V0S2luZCB8fCAoUGFja2V0S2luZCA9IHt9KSk7XG52YXIgQW5zaVVwID0gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBBbnNpVXAoKSB7XG4gICAgICAgIHRoaXMuVkVSU0lPTiA9IFwiNC4wLjRcIjtcbiAgICAgICAgdGhpcy5zZXR1cF9wYWxldHRlcygpO1xuICAgICAgICB0aGlzLl91c2VfY2xhc3NlcyA9IGZhbHNlO1xuICAgICAgICB0aGlzLl9lc2NhcGVfZm9yX2h0bWwgPSB0cnVlO1xuICAgICAgICB0aGlzLmJvbGQgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5mZyA9IHRoaXMuYmcgPSBudWxsO1xuICAgICAgICB0aGlzLl9idWZmZXIgPSAnJztcbiAgICAgICAgdGhpcy5fdXJsX3doaXRlbGlzdCA9IHsgJ2h0dHAnOiAxLCAnaHR0cHMnOiAxIH07XG4gICAgfVxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShBbnNpVXAucHJvdG90eXBlLCBcInVzZV9jbGFzc2VzXCIsIHtcbiAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fdXNlX2NsYXNzZXM7XG4gICAgICAgIH0sXG4gICAgICAgIHNldDogZnVuY3Rpb24gKGFyZykge1xuICAgICAgICAgICAgdGhpcy5fdXNlX2NsYXNzZXMgPSBhcmc7XG4gICAgICAgIH0sXG4gICAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxuICAgIH0pO1xuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShBbnNpVXAucHJvdG90eXBlLCBcImVzY2FwZV9mb3JfaHRtbFwiLCB7XG4gICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2VzY2FwZV9mb3JfaHRtbDtcbiAgICAgICAgfSxcbiAgICAgICAgc2V0OiBmdW5jdGlvbiAoYXJnKSB7XG4gICAgICAgICAgICB0aGlzLl9lc2NhcGVfZm9yX2h0bWwgPSBhcmc7XG4gICAgICAgIH0sXG4gICAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxuICAgIH0pO1xuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShBbnNpVXAucHJvdG90eXBlLCBcInVybF93aGl0ZWxpc3RcIiwge1xuICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl91cmxfd2hpdGVsaXN0O1xuICAgICAgICB9LFxuICAgICAgICBzZXQ6IGZ1bmN0aW9uIChhcmcpIHtcbiAgICAgICAgICAgIHRoaXMuX3VybF93aGl0ZWxpc3QgPSBhcmc7XG4gICAgICAgIH0sXG4gICAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxuICAgIH0pO1xuICAgIEFuc2lVcC5wcm90b3R5cGUuc2V0dXBfcGFsZXR0ZXMgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgICAgIHRoaXMuYW5zaV9jb2xvcnMgPVxuICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgICAgICAgeyByZ2I6IFswLCAwLCAwXSwgY2xhc3NfbmFtZTogXCJhbnNpLWJsYWNrXCIgfSxcbiAgICAgICAgICAgICAgICAgICAgeyByZ2I6IFsxODcsIDAsIDBdLCBjbGFzc19uYW1lOiBcImFuc2ktcmVkXCIgfSxcbiAgICAgICAgICAgICAgICAgICAgeyByZ2I6IFswLCAxODcsIDBdLCBjbGFzc19uYW1lOiBcImFuc2ktZ3JlZW5cIiB9LFxuICAgICAgICAgICAgICAgICAgICB7IHJnYjogWzE4NywgMTg3LCAwXSwgY2xhc3NfbmFtZTogXCJhbnNpLXllbGxvd1wiIH0sXG4gICAgICAgICAgICAgICAgICAgIHsgcmdiOiBbMCwgMCwgMTg3XSwgY2xhc3NfbmFtZTogXCJhbnNpLWJsdWVcIiB9LFxuICAgICAgICAgICAgICAgICAgICB7IHJnYjogWzE4NywgMCwgMTg3XSwgY2xhc3NfbmFtZTogXCJhbnNpLW1hZ2VudGFcIiB9LFxuICAgICAgICAgICAgICAgICAgICB7IHJnYjogWzAsIDE4NywgMTg3XSwgY2xhc3NfbmFtZTogXCJhbnNpLWN5YW5cIiB9LFxuICAgICAgICAgICAgICAgICAgICB7IHJnYjogWzI1NSwgMjU1LCAyNTVdLCBjbGFzc19uYW1lOiBcImFuc2ktd2hpdGVcIiB9XG4gICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgICAgIHsgcmdiOiBbODUsIDg1LCA4NV0sIGNsYXNzX25hbWU6IFwiYW5zaS1icmlnaHQtYmxhY2tcIiB9LFxuICAgICAgICAgICAgICAgICAgICB7IHJnYjogWzI1NSwgODUsIDg1XSwgY2xhc3NfbmFtZTogXCJhbnNpLWJyaWdodC1yZWRcIiB9LFxuICAgICAgICAgICAgICAgICAgICB7IHJnYjogWzAsIDI1NSwgMF0sIGNsYXNzX25hbWU6IFwiYW5zaS1icmlnaHQtZ3JlZW5cIiB9LFxuICAgICAgICAgICAgICAgICAgICB7IHJnYjogWzI1NSwgMjU1LCA4NV0sIGNsYXNzX25hbWU6IFwiYW5zaS1icmlnaHQteWVsbG93XCIgfSxcbiAgICAgICAgICAgICAgICAgICAgeyByZ2I6IFs4NSwgODUsIDI1NV0sIGNsYXNzX25hbWU6IFwiYW5zaS1icmlnaHQtYmx1ZVwiIH0sXG4gICAgICAgICAgICAgICAgICAgIHsgcmdiOiBbMjU1LCA4NSwgMjU1XSwgY2xhc3NfbmFtZTogXCJhbnNpLWJyaWdodC1tYWdlbnRhXCIgfSxcbiAgICAgICAgICAgICAgICAgICAgeyByZ2I6IFs4NSwgMjU1LCAyNTVdLCBjbGFzc19uYW1lOiBcImFuc2ktYnJpZ2h0LWN5YW5cIiB9LFxuICAgICAgICAgICAgICAgICAgICB7IHJnYjogWzI1NSwgMjU1LCAyNTVdLCBjbGFzc19uYW1lOiBcImFuc2ktYnJpZ2h0LXdoaXRlXCIgfVxuICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgIF07XG4gICAgICAgIHRoaXMucGFsZXR0ZV8yNTYgPSBbXTtcbiAgICAgICAgdGhpcy5hbnNpX2NvbG9ycy5mb3JFYWNoKGZ1bmN0aW9uIChwYWxldHRlKSB7XG4gICAgICAgICAgICBwYWxldHRlLmZvckVhY2goZnVuY3Rpb24gKHJlYykge1xuICAgICAgICAgICAgICAgIF90aGlzLnBhbGV0dGVfMjU2LnB1c2gocmVjKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICAgICAgdmFyIGxldmVscyA9IFswLCA5NSwgMTM1LCAxNzUsIDIxNSwgMjU1XTtcbiAgICAgICAgZm9yICh2YXIgciA9IDA7IHIgPCA2OyArK3IpIHtcbiAgICAgICAgICAgIGZvciAodmFyIGcgPSAwOyBnIDwgNjsgKytnKSB7XG4gICAgICAgICAgICAgICAgZm9yICh2YXIgYiA9IDA7IGIgPCA2OyArK2IpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGNvbCA9IHsgcmdiOiBbbGV2ZWxzW3JdLCBsZXZlbHNbZ10sIGxldmVsc1tiXV0sIGNsYXNzX25hbWU6ICd0cnVlY29sb3InIH07XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucGFsZXR0ZV8yNTYucHVzaChjb2wpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICB2YXIgZ3JleV9sZXZlbCA9IDg7XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgMjQ7ICsraSwgZ3JleV9sZXZlbCArPSAxMCkge1xuICAgICAgICAgICAgdmFyIGdyeSA9IHsgcmdiOiBbZ3JleV9sZXZlbCwgZ3JleV9sZXZlbCwgZ3JleV9sZXZlbF0sIGNsYXNzX25hbWU6ICd0cnVlY29sb3InIH07XG4gICAgICAgICAgICB0aGlzLnBhbGV0dGVfMjU2LnB1c2goZ3J5KTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgQW5zaVVwLnByb3RvdHlwZS5lc2NhcGVfdHh0X2Zvcl9odG1sID0gZnVuY3Rpb24gKHR4dCkge1xuICAgICAgICByZXR1cm4gdHh0LnJlcGxhY2UoL1smPD5dL2dtLCBmdW5jdGlvbiAoc3RyKSB7XG4gICAgICAgICAgICBpZiAoc3RyID09PSBcIiZcIilcbiAgICAgICAgICAgICAgICByZXR1cm4gXCImYW1wO1wiO1xuICAgICAgICAgICAgaWYgKHN0ciA9PT0gXCI8XCIpXG4gICAgICAgICAgICAgICAgcmV0dXJuIFwiJmx0O1wiO1xuICAgICAgICAgICAgaWYgKHN0ciA9PT0gXCI+XCIpXG4gICAgICAgICAgICAgICAgcmV0dXJuIFwiJmd0O1wiO1xuICAgICAgICB9KTtcbiAgICB9O1xuICAgIEFuc2lVcC5wcm90b3R5cGUuYXBwZW5kX2J1ZmZlciA9IGZ1bmN0aW9uICh0eHQpIHtcbiAgICAgICAgdmFyIHN0ciA9IHRoaXMuX2J1ZmZlciArIHR4dDtcbiAgICAgICAgdGhpcy5fYnVmZmVyID0gc3RyO1xuICAgIH07XG4gICAgQW5zaVVwLnByb3RvdHlwZS5nZXRfbmV4dF9wYWNrZXQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBwa3QgPSB7XG4gICAgICAgICAgICBraW5kOiBQYWNrZXRLaW5kLkVPUyxcbiAgICAgICAgICAgIHRleHQ6ICcnLFxuICAgICAgICAgICAgdXJsOiAnJ1xuICAgICAgICB9O1xuICAgICAgICB2YXIgbGVuID0gdGhpcy5fYnVmZmVyLmxlbmd0aDtcbiAgICAgICAgaWYgKGxlbiA9PSAwKVxuICAgICAgICAgICAgcmV0dXJuIHBrdDtcbiAgICAgICAgdmFyIHBvcyA9IHRoaXMuX2J1ZmZlci5pbmRleE9mKFwiXFx4MUJcIik7XG4gICAgICAgIGlmIChwb3MgPT0gLTEpIHtcbiAgICAgICAgICAgIHBrdC5raW5kID0gUGFja2V0S2luZC5UZXh0O1xuICAgICAgICAgICAgcGt0LnRleHQgPSB0aGlzLl9idWZmZXI7XG4gICAgICAgICAgICB0aGlzLl9idWZmZXIgPSAnJztcbiAgICAgICAgICAgIHJldHVybiBwa3Q7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHBvcyA+IDApIHtcbiAgICAgICAgICAgIHBrdC5raW5kID0gUGFja2V0S2luZC5UZXh0O1xuICAgICAgICAgICAgcGt0LnRleHQgPSB0aGlzLl9idWZmZXIuc2xpY2UoMCwgcG9zKTtcbiAgICAgICAgICAgIHRoaXMuX2J1ZmZlciA9IHRoaXMuX2J1ZmZlci5zbGljZShwb3MpO1xuICAgICAgICAgICAgcmV0dXJuIHBrdDtcbiAgICAgICAgfVxuICAgICAgICBpZiAocG9zID09IDApIHtcbiAgICAgICAgICAgIGlmIChsZW4gPT0gMSkge1xuICAgICAgICAgICAgICAgIHBrdC5raW5kID0gUGFja2V0S2luZC5JbmNvbXBsZXRlO1xuICAgICAgICAgICAgICAgIHJldHVybiBwa3Q7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB2YXIgbmV4dF9jaGFyID0gdGhpcy5fYnVmZmVyLmNoYXJBdCgxKTtcbiAgICAgICAgICAgIGlmICgobmV4dF9jaGFyICE9ICdbJykgJiYgKG5leHRfY2hhciAhPSAnXScpKSB7XG4gICAgICAgICAgICAgICAgcGt0LmtpbmQgPSBQYWNrZXRLaW5kLkVTQztcbiAgICAgICAgICAgICAgICBwa3QudGV4dCA9IHRoaXMuX2J1ZmZlci5zbGljZSgwLCAxKTtcbiAgICAgICAgICAgICAgICB0aGlzLl9idWZmZXIgPSB0aGlzLl9idWZmZXIuc2xpY2UoMSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHBrdDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChuZXh0X2NoYXIgPT0gJ1snKSB7XG4gICAgICAgICAgICAgICAgaWYgKCF0aGlzLl9jc2lfcmVnZXgpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fY3NpX3JlZ2V4ID0gcmd4KF9fbWFrZVRlbXBsYXRlT2JqZWN0KFtcIlxcbiAgICAgICAgICAgICAgICAgICAgICAgIF4gICAgICAgICAgICAgICAgICAgICAgICAgICAjIGJlZ2lubmluZyBvZiBsaW5lXFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICNcXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIyBGaXJzdCBhdHRlbXB0XFxuICAgICAgICAgICAgICAgICAgICAgICAgKD86ICAgICAgICAgICAgICAgICAgICAgICAgICMgbGVnYWwgc2VxdWVuY2VcXG4gICAgICAgICAgICAgICAgICAgICAgICAgIFxcdTAwMUJbICAgICAgICAgICAgICAgICAgICAgICMgQ1NJXFxuICAgICAgICAgICAgICAgICAgICAgICAgICAoWzwtP10/KSAgICAgICAgICAgICAgIyBwcml2YXRlLW1vZGUgY2hhclxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgKFtkO10qKSAgICAgICAgICAgICAgICAgICAgIyBhbnkgZGlnaXRzIG9yIHNlbWljb2xvbnNcXG4gICAgICAgICAgICAgICAgICAgICAgICAgIChbIC0vXT8gICAgICAgICAgICAgICAjIGFuIGludGVybWVkaWF0ZSBtb2RpZmllclxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgW0Atfl0pICAgICAgICAgICAgICAgICMgdGhlIGNvbW1hbmRcXG4gICAgICAgICAgICAgICAgICAgICAgICApXFxuICAgICAgICAgICAgICAgICAgICAgICAgfCAgICAgICAgICAgICAgICAgICAgICAgICAgICMgYWx0ZXJuYXRlIChzZWNvbmQgYXR0ZW1wdClcXG4gICAgICAgICAgICAgICAgICAgICAgICAoPzogICAgICAgICAgICAgICAgICAgICAgICAgIyBpbGxlZ2FsIHNlcXVlbmNlXFxuICAgICAgICAgICAgICAgICAgICAgICAgICBcXHUwMDFCWyAgICAgICAgICAgICAgICAgICAgICAjIENTSVxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgWyAtfl0qICAgICAgICAgICAgICAgICMgYW55dGhpbmcgbGVnYWxcXG4gICAgICAgICAgICAgICAgICAgICAgICAgIChbXFwwLVxcdTAwMUY6XSkgICAgICAgICAgICAgICMgYW55dGhpbmcgaWxsZWdhbFxcbiAgICAgICAgICAgICAgICAgICAgICAgIClcXG4gICAgICAgICAgICAgICAgICAgIFwiXSwgW1wiXFxuICAgICAgICAgICAgICAgICAgICAgICAgXiAgICAgICAgICAgICAgICAgICAgICAgICAgICMgYmVnaW5uaW5nIG9mIGxpbmVcXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgI1xcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAjIEZpcnN0IGF0dGVtcHRcXG4gICAgICAgICAgICAgICAgICAgICAgICAoPzogICAgICAgICAgICAgICAgICAgICAgICAgIyBsZWdhbCBzZXF1ZW5jZVxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgXFxcXHgxYlxcXFxbICAgICAgICAgICAgICAgICAgICAgICMgQ1NJXFxuICAgICAgICAgICAgICAgICAgICAgICAgICAoW1xcXFx4M2MtXFxcXHgzZl0/KSAgICAgICAgICAgICAgIyBwcml2YXRlLW1vZGUgY2hhclxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgKFtcXFxcZDtdKikgICAgICAgICAgICAgICAgICAgICMgYW55IGRpZ2l0cyBvciBzZW1pY29sb25zXFxuICAgICAgICAgICAgICAgICAgICAgICAgICAoW1xcXFx4MjAtXFxcXHgyZl0/ICAgICAgICAgICAgICAgIyBhbiBpbnRlcm1lZGlhdGUgbW9kaWZpZXJcXG4gICAgICAgICAgICAgICAgICAgICAgICAgIFtcXFxceDQwLVxcXFx4N2VdKSAgICAgICAgICAgICAgICAjIHRoZSBjb21tYW5kXFxuICAgICAgICAgICAgICAgICAgICAgICAgKVxcbiAgICAgICAgICAgICAgICAgICAgICAgIHwgICAgICAgICAgICAgICAgICAgICAgICAgICAjIGFsdGVybmF0ZSAoc2Vjb25kIGF0dGVtcHQpXFxuICAgICAgICAgICAgICAgICAgICAgICAgKD86ICAgICAgICAgICAgICAgICAgICAgICAgICMgaWxsZWdhbCBzZXF1ZW5jZVxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgXFxcXHgxYlxcXFxbICAgICAgICAgICAgICAgICAgICAgICMgQ1NJXFxuICAgICAgICAgICAgICAgICAgICAgICAgICBbXFxcXHgyMC1cXFxceDdlXSogICAgICAgICAgICAgICAgIyBhbnl0aGluZyBsZWdhbFxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgKFtcXFxceDAwLVxcXFx4MWY6XSkgICAgICAgICAgICAgICMgYW55dGhpbmcgaWxsZWdhbFxcbiAgICAgICAgICAgICAgICAgICAgICAgIClcXG4gICAgICAgICAgICAgICAgICAgIFwiXSkpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB2YXIgbWF0Y2ggPSB0aGlzLl9idWZmZXIubWF0Y2godGhpcy5fY3NpX3JlZ2V4KTtcbiAgICAgICAgICAgICAgICBpZiAobWF0Y2ggPT09IG51bGwpIHtcbiAgICAgICAgICAgICAgICAgICAgcGt0LmtpbmQgPSBQYWNrZXRLaW5kLkluY29tcGxldGU7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBwa3Q7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmIChtYXRjaFs0XSkge1xuICAgICAgICAgICAgICAgICAgICBwa3Qua2luZCA9IFBhY2tldEtpbmQuRVNDO1xuICAgICAgICAgICAgICAgICAgICBwa3QudGV4dCA9IHRoaXMuX2J1ZmZlci5zbGljZSgwLCAxKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fYnVmZmVyID0gdGhpcy5fYnVmZmVyLnNsaWNlKDEpO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcGt0O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAoKG1hdGNoWzFdICE9ICcnKSB8fCAobWF0Y2hbM10gIT0gJ20nKSlcbiAgICAgICAgICAgICAgICAgICAgcGt0LmtpbmQgPSBQYWNrZXRLaW5kLlVua25vd247XG4gICAgICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgICAgICBwa3Qua2luZCA9IFBhY2tldEtpbmQuU0dSO1xuICAgICAgICAgICAgICAgIHBrdC50ZXh0ID0gbWF0Y2hbMl07XG4gICAgICAgICAgICAgICAgdmFyIHJwb3MgPSBtYXRjaFswXS5sZW5ndGg7XG4gICAgICAgICAgICAgICAgdGhpcy5fYnVmZmVyID0gdGhpcy5fYnVmZmVyLnNsaWNlKHJwb3MpO1xuICAgICAgICAgICAgICAgIHJldHVybiBwa3Q7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAobmV4dF9jaGFyID09ICddJykge1xuICAgICAgICAgICAgICAgIGlmIChsZW4gPCA0KSB7XG4gICAgICAgICAgICAgICAgICAgIHBrdC5raW5kID0gUGFja2V0S2luZC5JbmNvbXBsZXRlO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcGt0O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAoKHRoaXMuX2J1ZmZlci5jaGFyQXQoMikgIT0gJzgnKVxuICAgICAgICAgICAgICAgICAgICB8fCAodGhpcy5fYnVmZmVyLmNoYXJBdCgzKSAhPSAnOycpKSB7XG4gICAgICAgICAgICAgICAgICAgIHBrdC5raW5kID0gUGFja2V0S2luZC5FU0M7XG4gICAgICAgICAgICAgICAgICAgIHBrdC50ZXh0ID0gdGhpcy5fYnVmZmVyLnNsaWNlKDAsIDEpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9idWZmZXIgPSB0aGlzLl9idWZmZXIuc2xpY2UoMSk7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBwa3Q7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmICghdGhpcy5fb3NjX3N0KSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX29zY19zdCA9IHJneEcoX19tYWtlVGVtcGxhdGVPYmplY3QoW1wiXFxuICAgICAgICAgICAgICAgICAgICAgICAgKD86ICAgICAgICAgICAgICAgICAgICAgICAgICMgbGVnYWwgc2VxdWVuY2VcXG4gICAgICAgICAgICAgICAgICAgICAgICAgIChcXHUwMDFCXFxcXCkgICAgICAgICAgICAgICAgICAgICMgRVNDICAgICAgICAgICAgICAgICAgICAgICAgICAgfCAgICAgICAgICAgICAgICAgICAgICAgICAgICMgYWx0ZXJuYXRlXFxuICAgICAgICAgICAgICAgICAgICAgICAgICAoXFx1MDAwNykgICAgICAgICAgICAgICAgICAgICAgIyBCRUwgKHdoYXQgeHRlcm0gZGlkKVxcbiAgICAgICAgICAgICAgICAgICAgICAgIClcXG4gICAgICAgICAgICAgICAgICAgICAgICB8ICAgICAgICAgICAgICAgICAgICAgICAgICAgIyBhbHRlcm5hdGUgKHNlY29uZCBhdHRlbXB0KVxcbiAgICAgICAgICAgICAgICAgICAgICAgICggICAgICAgICAgICAgICAgICAgICAgICAgICAjIGlsbGVnYWwgc2VxdWVuY2VcXG4gICAgICAgICAgICAgICAgICAgICAgICAgIFtcXDAtXFx1MDAwNl0gICAgICAgICAgICAgICAgICMgYW55dGhpbmcgaWxsZWdhbFxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgfCAgICAgICAgICAgICAgICAgICAgICAgICAgICMgYWx0ZXJuYXRlXFxuICAgICAgICAgICAgICAgICAgICAgICAgICBbXFxiLVxcdTAwMUFdICAgICAgICAgICAgICAgICAjIGFueXRoaW5nIGlsbGVnYWxcXG4gICAgICAgICAgICAgICAgICAgICAgICAgIHwgICAgICAgICAgICAgICAgICAgICAgICAgICAjIGFsdGVybmF0ZVxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgW1xcdTAwMUMtXFx1MDAxRl0gICAgICAgICAgICAgICAgICMgYW55dGhpbmcgaWxsZWdhbFxcbiAgICAgICAgICAgICAgICAgICAgICAgIClcXG4gICAgICAgICAgICAgICAgICAgIFwiXSwgW1wiXFxuICAgICAgICAgICAgICAgICAgICAgICAgKD86ICAgICAgICAgICAgICAgICAgICAgICAgICMgbGVnYWwgc2VxdWVuY2VcXG4gICAgICAgICAgICAgICAgICAgICAgICAgIChcXFxceDFiXFxcXFxcXFwpICAgICAgICAgICAgICAgICAgICAjIEVTQyBcXFxcXFxuICAgICAgICAgICAgICAgICAgICAgICAgICB8ICAgICAgICAgICAgICAgICAgICAgICAgICAgIyBhbHRlcm5hdGVcXG4gICAgICAgICAgICAgICAgICAgICAgICAgIChcXFxceDA3KSAgICAgICAgICAgICAgICAgICAgICAjIEJFTCAod2hhdCB4dGVybSBkaWQpXFxuICAgICAgICAgICAgICAgICAgICAgICAgKVxcbiAgICAgICAgICAgICAgICAgICAgICAgIHwgICAgICAgICAgICAgICAgICAgICAgICAgICAjIGFsdGVybmF0ZSAoc2Vjb25kIGF0dGVtcHQpXFxuICAgICAgICAgICAgICAgICAgICAgICAgKCAgICAgICAgICAgICAgICAgICAgICAgICAgICMgaWxsZWdhbCBzZXF1ZW5jZVxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgW1xcXFx4MDAtXFxcXHgwNl0gICAgICAgICAgICAgICAgICMgYW55dGhpbmcgaWxsZWdhbFxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgfCAgICAgICAgICAgICAgICAgICAgICAgICAgICMgYWx0ZXJuYXRlXFxuICAgICAgICAgICAgICAgICAgICAgICAgICBbXFxcXHgwOC1cXFxceDFhXSAgICAgICAgICAgICAgICAgIyBhbnl0aGluZyBpbGxlZ2FsXFxuICAgICAgICAgICAgICAgICAgICAgICAgICB8ICAgICAgICAgICAgICAgICAgICAgICAgICAgIyBhbHRlcm5hdGVcXG4gICAgICAgICAgICAgICAgICAgICAgICAgIFtcXFxceDFjLVxcXFx4MWZdICAgICAgICAgICAgICAgICAjIGFueXRoaW5nIGlsbGVnYWxcXG4gICAgICAgICAgICAgICAgICAgICAgICApXFxuICAgICAgICAgICAgICAgICAgICBcIl0pKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdGhpcy5fb3NjX3N0Lmxhc3RJbmRleCA9IDA7XG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICB2YXIgbWF0Y2hfMSA9IHRoaXMuX29zY19zdC5leGVjKHRoaXMuX2J1ZmZlcik7XG4gICAgICAgICAgICAgICAgICAgIGlmIChtYXRjaF8xID09PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBwa3Qua2luZCA9IFBhY2tldEtpbmQuSW5jb21wbGV0ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBwa3Q7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgaWYgKG1hdGNoXzFbM10pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHBrdC5raW5kID0gUGFja2V0S2luZC5FU0M7XG4gICAgICAgICAgICAgICAgICAgICAgICBwa3QudGV4dCA9IHRoaXMuX2J1ZmZlci5zbGljZSgwLCAxKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2J1ZmZlciA9IHRoaXMuX2J1ZmZlci5zbGljZSgxKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBwa3Q7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICB2YXIgbWF0Y2hfMiA9IHRoaXMuX29zY19zdC5leGVjKHRoaXMuX2J1ZmZlcik7XG4gICAgICAgICAgICAgICAgICAgIGlmIChtYXRjaF8yID09PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBwa3Qua2luZCA9IFBhY2tldEtpbmQuSW5jb21wbGV0ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBwa3Q7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgaWYgKG1hdGNoXzJbM10pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHBrdC5raW5kID0gUGFja2V0S2luZC5FU0M7XG4gICAgICAgICAgICAgICAgICAgICAgICBwa3QudGV4dCA9IHRoaXMuX2J1ZmZlci5zbGljZSgwLCAxKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2J1ZmZlciA9IHRoaXMuX2J1ZmZlci5zbGljZSgxKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBwa3Q7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKCF0aGlzLl9vc2NfcmVnZXgpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fb3NjX3JlZ2V4ID0gcmd4KF9fbWFrZVRlbXBsYXRlT2JqZWN0KFtcIlxcbiAgICAgICAgICAgICAgICAgICAgICAgIF4gICAgICAgICAgICAgICAgICAgICAgICAgICAjIGJlZ2lubmluZyBvZiBsaW5lXFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICNcXG4gICAgICAgICAgICAgICAgICAgICAgICBcXHUwMDFCXTg7ICAgICAgICAgICAgICAgICAgICAjIE9TQyBIeXBlcmxpbmtcXG4gICAgICAgICAgICAgICAgICAgICAgICBbIC06PC1+XSogICAgICAgIyBwYXJhbXMgKGV4Y2x1ZGluZyA7KVxcbiAgICAgICAgICAgICAgICAgICAgICAgIDsgICAgICAgICAgICAgICAgICAgICAgICAgICAjIGVuZCBvZiBwYXJhbXNcXG4gICAgICAgICAgICAgICAgICAgICAgICAoWyEtfl17MCw1MTJ9KSAgICAgICAgIyBVUkwgY2FwdHVyZVxcbiAgICAgICAgICAgICAgICAgICAgICAgICg/OiAgICAgICAgICAgICAgICAgICAgICAgICAjIFNUXFxuICAgICAgICAgICAgICAgICAgICAgICAgICAoPzpcXHUwMDFCXFxcXCkgICAgICAgICAgICAgICAgICAjIEVTQyAgICAgICAgICAgICAgICAgICAgICAgICAgIHwgICAgICAgICAgICAgICAgICAgICAgICAgICAjIGFsdGVybmF0ZVxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgKD86XFx1MDAwNykgICAgICAgICAgICAgICAgICAgICMgQkVMICh3aGF0IHh0ZXJtIGRpZClcXG4gICAgICAgICAgICAgICAgICAgICAgICApXFxuICAgICAgICAgICAgICAgICAgICAgICAgKFshLX5dKykgICAgICAgICAgICAgICMgVEVYVCBjYXB0dXJlXFxuICAgICAgICAgICAgICAgICAgICAgICAgXFx1MDAxQl04OzsgICAgICAgICAgICAgICAgICAgIyBPU0MgSHlwZXJsaW5rIEVuZFxcbiAgICAgICAgICAgICAgICAgICAgICAgICg/OiAgICAgICAgICAgICAgICAgICAgICAgICAjIFNUXFxuICAgICAgICAgICAgICAgICAgICAgICAgICAoPzpcXHUwMDFCXFxcXCkgICAgICAgICAgICAgICAgICAjIEVTQyAgICAgICAgICAgICAgICAgICAgICAgICAgIHwgICAgICAgICAgICAgICAgICAgICAgICAgICAjIGFsdGVybmF0ZVxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgKD86XFx1MDAwNykgICAgICAgICAgICAgICAgICAgICMgQkVMICh3aGF0IHh0ZXJtIGRpZClcXG4gICAgICAgICAgICAgICAgICAgICAgICApXFxuICAgICAgICAgICAgICAgICAgICBcIl0sIFtcIlxcbiAgICAgICAgICAgICAgICAgICAgICAgIF4gICAgICAgICAgICAgICAgICAgICAgICAgICAjIGJlZ2lubmluZyBvZiBsaW5lXFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICNcXG4gICAgICAgICAgICAgICAgICAgICAgICBcXFxceDFiXFxcXF04OyAgICAgICAgICAgICAgICAgICAgIyBPU0MgSHlwZXJsaW5rXFxuICAgICAgICAgICAgICAgICAgICAgICAgW1xcXFx4MjAtXFxcXHgzYVxcXFx4M2MtXFxcXHg3ZV0qICAgICAgICMgcGFyYW1zIChleGNsdWRpbmcgOylcXG4gICAgICAgICAgICAgICAgICAgICAgICA7ICAgICAgICAgICAgICAgICAgICAgICAgICAgIyBlbmQgb2YgcGFyYW1zXFxuICAgICAgICAgICAgICAgICAgICAgICAgKFtcXFxceDIxLVxcXFx4N2VdezAsNTEyfSkgICAgICAgICMgVVJMIGNhcHR1cmVcXG4gICAgICAgICAgICAgICAgICAgICAgICAoPzogICAgICAgICAgICAgICAgICAgICAgICAgIyBTVFxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgKD86XFxcXHgxYlxcXFxcXFxcKSAgICAgICAgICAgICAgICAgICMgRVNDIFxcXFxcXG4gICAgICAgICAgICAgICAgICAgICAgICAgIHwgICAgICAgICAgICAgICAgICAgICAgICAgICAjIGFsdGVybmF0ZVxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgKD86XFxcXHgwNykgICAgICAgICAgICAgICAgICAgICMgQkVMICh3aGF0IHh0ZXJtIGRpZClcXG4gICAgICAgICAgICAgICAgICAgICAgICApXFxuICAgICAgICAgICAgICAgICAgICAgICAgKFtcXFxceDIxLVxcXFx4N2VdKykgICAgICAgICAgICAgICMgVEVYVCBjYXB0dXJlXFxuICAgICAgICAgICAgICAgICAgICAgICAgXFxcXHgxYlxcXFxdODs7ICAgICAgICAgICAgICAgICAgICMgT1NDIEh5cGVybGluayBFbmRcXG4gICAgICAgICAgICAgICAgICAgICAgICAoPzogICAgICAgICAgICAgICAgICAgICAgICAgIyBTVFxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgKD86XFxcXHgxYlxcXFxcXFxcKSAgICAgICAgICAgICAgICAgICMgRVNDIFxcXFxcXG4gICAgICAgICAgICAgICAgICAgICAgICAgIHwgICAgICAgICAgICAgICAgICAgICAgICAgICAjIGFsdGVybmF0ZVxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgKD86XFxcXHgwNykgICAgICAgICAgICAgICAgICAgICMgQkVMICh3aGF0IHh0ZXJtIGRpZClcXG4gICAgICAgICAgICAgICAgICAgICAgICApXFxuICAgICAgICAgICAgICAgICAgICBcIl0pKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdmFyIG1hdGNoID0gdGhpcy5fYnVmZmVyLm1hdGNoKHRoaXMuX29zY19yZWdleCk7XG4gICAgICAgICAgICAgICAgaWYgKG1hdGNoID09PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgICAgIHBrdC5raW5kID0gUGFja2V0S2luZC5FU0M7XG4gICAgICAgICAgICAgICAgICAgIHBrdC50ZXh0ID0gdGhpcy5fYnVmZmVyLnNsaWNlKDAsIDEpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9idWZmZXIgPSB0aGlzLl9idWZmZXIuc2xpY2UoMSk7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBwa3Q7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHBrdC5raW5kID0gUGFja2V0S2luZC5PU0NVUkw7XG4gICAgICAgICAgICAgICAgcGt0LnVybCA9IG1hdGNoWzFdO1xuICAgICAgICAgICAgICAgIHBrdC50ZXh0ID0gbWF0Y2hbMl07XG4gICAgICAgICAgICAgICAgdmFyIHJwb3MgPSBtYXRjaFswXS5sZW5ndGg7XG4gICAgICAgICAgICAgICAgdGhpcy5fYnVmZmVyID0gdGhpcy5fYnVmZmVyLnNsaWNlKHJwb3MpO1xuICAgICAgICAgICAgICAgIHJldHVybiBwa3Q7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9O1xuICAgIEFuc2lVcC5wcm90b3R5cGUuYW5zaV90b19odG1sID0gZnVuY3Rpb24gKHR4dCkge1xuICAgICAgICB0aGlzLmFwcGVuZF9idWZmZXIodHh0KTtcbiAgICAgICAgdmFyIGJsb2NrcyA9IFtdO1xuICAgICAgICB3aGlsZSAodHJ1ZSkge1xuICAgICAgICAgICAgdmFyIHBhY2tldCA9IHRoaXMuZ2V0X25leHRfcGFja2V0KCk7XG4gICAgICAgICAgICBpZiAoKHBhY2tldC5raW5kID09IFBhY2tldEtpbmQuRU9TKVxuICAgICAgICAgICAgICAgIHx8IChwYWNrZXQua2luZCA9PSBQYWNrZXRLaW5kLkluY29tcGxldGUpKVxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgaWYgKChwYWNrZXQua2luZCA9PSBQYWNrZXRLaW5kLkVTQylcbiAgICAgICAgICAgICAgICB8fCAocGFja2V0LmtpbmQgPT0gUGFja2V0S2luZC5Vbmtub3duKSlcbiAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgIGlmIChwYWNrZXQua2luZCA9PSBQYWNrZXRLaW5kLlRleHQpXG4gICAgICAgICAgICAgICAgYmxvY2tzLnB1c2godGhpcy50cmFuc2Zvcm1fdG9faHRtbCh0aGlzLndpdGhfc3RhdGUocGFja2V0KSkpO1xuICAgICAgICAgICAgZWxzZSBpZiAocGFja2V0LmtpbmQgPT0gUGFja2V0S2luZC5TR1IpXG4gICAgICAgICAgICAgICAgdGhpcy5wcm9jZXNzX2Fuc2kocGFja2V0KTtcbiAgICAgICAgICAgIGVsc2UgaWYgKHBhY2tldC5raW5kID09IFBhY2tldEtpbmQuT1NDVVJMKVxuICAgICAgICAgICAgICAgIGJsb2Nrcy5wdXNoKHRoaXMucHJvY2Vzc19oeXBlcmxpbmsocGFja2V0KSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGJsb2Nrcy5qb2luKFwiXCIpO1xuICAgIH07XG4gICAgQW5zaVVwLnByb3RvdHlwZS53aXRoX3N0YXRlID0gZnVuY3Rpb24gKHBrdCkge1xuICAgICAgICByZXR1cm4geyBib2xkOiB0aGlzLmJvbGQsIGZnOiB0aGlzLmZnLCBiZzogdGhpcy5iZywgdGV4dDogcGt0LnRleHQgfTtcbiAgICB9O1xuICAgIEFuc2lVcC5wcm90b3R5cGUucHJvY2Vzc19hbnNpID0gZnVuY3Rpb24gKHBrdCkge1xuICAgICAgICB2YXIgc2dyX2NtZHMgPSBwa3QudGV4dC5zcGxpdCgnOycpO1xuICAgICAgICB3aGlsZSAoc2dyX2NtZHMubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgdmFyIHNncl9jbWRfc3RyID0gc2dyX2NtZHMuc2hpZnQoKTtcbiAgICAgICAgICAgIHZhciBudW0gPSBwYXJzZUludChzZ3JfY21kX3N0ciwgMTApO1xuICAgICAgICAgICAgaWYgKGlzTmFOKG51bSkgfHwgbnVtID09PSAwKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5mZyA9IHRoaXMuYmcgPSBudWxsO1xuICAgICAgICAgICAgICAgIHRoaXMuYm9sZCA9IGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAobnVtID09PSAxKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5ib2xkID0gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKG51bSA9PT0gMjIpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmJvbGQgPSBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKG51bSA9PT0gMzkpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmZnID0gbnVsbDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKG51bSA9PT0gNDkpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmJnID0gbnVsbDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKChudW0gPj0gMzApICYmIChudW0gPCAzOCkpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmZnID0gdGhpcy5hbnNpX2NvbG9yc1swXVsobnVtIC0gMzApXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKChudW0gPj0gNDApICYmIChudW0gPCA0OCkpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmJnID0gdGhpcy5hbnNpX2NvbG9yc1swXVsobnVtIC0gNDApXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKChudW0gPj0gOTApICYmIChudW0gPCA5OCkpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmZnID0gdGhpcy5hbnNpX2NvbG9yc1sxXVsobnVtIC0gOTApXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKChudW0gPj0gMTAwKSAmJiAobnVtIDwgMTA4KSkge1xuICAgICAgICAgICAgICAgIHRoaXMuYmcgPSB0aGlzLmFuc2lfY29sb3JzWzFdWyhudW0gLSAxMDApXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKG51bSA9PT0gMzggfHwgbnVtID09PSA0OCkge1xuICAgICAgICAgICAgICAgIGlmIChzZ3JfY21kcy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBpc19mb3JlZ3JvdW5kID0gKG51bSA9PT0gMzgpO1xuICAgICAgICAgICAgICAgICAgICB2YXIgbW9kZV9jbWQgPSBzZ3JfY21kcy5zaGlmdCgpO1xuICAgICAgICAgICAgICAgICAgICBpZiAobW9kZV9jbWQgPT09ICc1JyAmJiBzZ3JfY21kcy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgcGFsZXR0ZV9pbmRleCA9IHBhcnNlSW50KHNncl9jbWRzLnNoaWZ0KCksIDEwKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChwYWxldHRlX2luZGV4ID49IDAgJiYgcGFsZXR0ZV9pbmRleCA8PSAyNTUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoaXNfZm9yZWdyb3VuZClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5mZyA9IHRoaXMucGFsZXR0ZV8yNTZbcGFsZXR0ZV9pbmRleF07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmJnID0gdGhpcy5wYWxldHRlXzI1NltwYWxldHRlX2luZGV4XTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBpZiAobW9kZV9jbWQgPT09ICcyJyAmJiBzZ3JfY21kcy5sZW5ndGggPiAyKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgciA9IHBhcnNlSW50KHNncl9jbWRzLnNoaWZ0KCksIDEwKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBnID0gcGFyc2VJbnQoc2dyX2NtZHMuc2hpZnQoKSwgMTApO1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGIgPSBwYXJzZUludChzZ3JfY21kcy5zaGlmdCgpLCAxMCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoKHIgPj0gMCAmJiByIDw9IDI1NSkgJiYgKGcgPj0gMCAmJiBnIDw9IDI1NSkgJiYgKGIgPj0gMCAmJiBiIDw9IDI1NSkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgYyA9IHsgcmdiOiBbciwgZywgYl0sIGNsYXNzX25hbWU6ICd0cnVlY29sb3InIH07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGlzX2ZvcmVncm91bmQpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZmcgPSBjO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5iZyA9IGM7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9O1xuICAgIEFuc2lVcC5wcm90b3R5cGUudHJhbnNmb3JtX3RvX2h0bWwgPSBmdW5jdGlvbiAoZnJhZ21lbnQpIHtcbiAgICAgICAgdmFyIHR4dCA9IGZyYWdtZW50LnRleHQ7XG4gICAgICAgIGlmICh0eHQubGVuZ3RoID09PSAwKVxuICAgICAgICAgICAgcmV0dXJuIHR4dDtcbiAgICAgICAgaWYgKHRoaXMuX2VzY2FwZV9mb3JfaHRtbClcbiAgICAgICAgICAgIHR4dCA9IHRoaXMuZXNjYXBlX3R4dF9mb3JfaHRtbCh0eHQpO1xuICAgICAgICBpZiAoIWZyYWdtZW50LmJvbGQgJiYgZnJhZ21lbnQuZmcgPT09IG51bGwgJiYgZnJhZ21lbnQuYmcgPT09IG51bGwpXG4gICAgICAgICAgICByZXR1cm4gdHh0O1xuICAgICAgICB2YXIgc3R5bGVzID0gW107XG4gICAgICAgIHZhciBjbGFzc2VzID0gW107XG4gICAgICAgIHZhciBmZyA9IGZyYWdtZW50LmZnO1xuICAgICAgICB2YXIgYmcgPSBmcmFnbWVudC5iZztcbiAgICAgICAgaWYgKGZyYWdtZW50LmJvbGQpXG4gICAgICAgICAgICBzdHlsZXMucHVzaCgnZm9udC13ZWlnaHQ6Ym9sZCcpO1xuICAgICAgICBpZiAoIXRoaXMuX3VzZV9jbGFzc2VzKSB7XG4gICAgICAgICAgICBpZiAoZmcpXG4gICAgICAgICAgICAgICAgc3R5bGVzLnB1c2goXCJjb2xvcjpyZ2IoXCIgKyBmZy5yZ2Iuam9pbignLCcpICsgXCIpXCIpO1xuICAgICAgICAgICAgaWYgKGJnKVxuICAgICAgICAgICAgICAgIHN0eWxlcy5wdXNoKFwiYmFja2dyb3VuZC1jb2xvcjpyZ2IoXCIgKyBiZy5yZ2IgKyBcIilcIik7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBpZiAoZmcpIHtcbiAgICAgICAgICAgICAgICBpZiAoZmcuY2xhc3NfbmFtZSAhPT0gJ3RydWVjb2xvcicpIHtcbiAgICAgICAgICAgICAgICAgICAgY2xhc3Nlcy5wdXNoKGZnLmNsYXNzX25hbWUgKyBcIi1mZ1wiKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHN0eWxlcy5wdXNoKFwiY29sb3I6cmdiKFwiICsgZmcucmdiLmpvaW4oJywnKSArIFwiKVwiKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoYmcpIHtcbiAgICAgICAgICAgICAgICBpZiAoYmcuY2xhc3NfbmFtZSAhPT0gJ3RydWVjb2xvcicpIHtcbiAgICAgICAgICAgICAgICAgICAgY2xhc3Nlcy5wdXNoKGJnLmNsYXNzX25hbWUgKyBcIi1iZ1wiKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHN0eWxlcy5wdXNoKFwiYmFja2dyb3VuZC1jb2xvcjpyZ2IoXCIgKyBiZy5yZ2Iuam9pbignLCcpICsgXCIpXCIpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICB2YXIgY2xhc3Nfc3RyaW5nID0gJyc7XG4gICAgICAgIHZhciBzdHlsZV9zdHJpbmcgPSAnJztcbiAgICAgICAgaWYgKGNsYXNzZXMubGVuZ3RoKVxuICAgICAgICAgICAgY2xhc3Nfc3RyaW5nID0gXCIgY2xhc3M9XFxcIlwiICsgY2xhc3Nlcy5qb2luKCcgJykgKyBcIlxcXCJcIjtcbiAgICAgICAgaWYgKHN0eWxlcy5sZW5ndGgpXG4gICAgICAgICAgICBzdHlsZV9zdHJpbmcgPSBcIiBzdHlsZT1cXFwiXCIgKyBzdHlsZXMuam9pbignOycpICsgXCJcXFwiXCI7XG4gICAgICAgIHJldHVybiBcIjxzcGFuXCIgKyBzdHlsZV9zdHJpbmcgKyBjbGFzc19zdHJpbmcgKyBcIj5cIiArIHR4dCArIFwiPC9zcGFuPlwiO1xuICAgIH07XG4gICAgO1xuICAgIEFuc2lVcC5wcm90b3R5cGUucHJvY2Vzc19oeXBlcmxpbmsgPSBmdW5jdGlvbiAocGt0KSB7XG4gICAgICAgIHZhciBwYXJ0cyA9IHBrdC51cmwuc3BsaXQoJzonKTtcbiAgICAgICAgaWYgKHBhcnRzLmxlbmd0aCA8IDEpXG4gICAgICAgICAgICByZXR1cm4gJyc7XG4gICAgICAgIGlmICghdGhpcy5fdXJsX3doaXRlbGlzdFtwYXJ0c1swXV0pXG4gICAgICAgICAgICByZXR1cm4gJyc7XG4gICAgICAgIHZhciByZXN1bHQgPSBcIjxhIGhyZWY9XFxcIlwiICsgdGhpcy5lc2NhcGVfdHh0X2Zvcl9odG1sKHBrdC51cmwpICsgXCJcXFwiPlwiICsgdGhpcy5lc2NhcGVfdHh0X2Zvcl9odG1sKHBrdC50ZXh0KSArIFwiPC9hPlwiO1xuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH07XG4gICAgcmV0dXJuIEFuc2lVcDtcbn0oKSk7XG5mdW5jdGlvbiByZ3godG1wbE9iaikge1xuICAgIHZhciBzdWJzdCA9IFtdO1xuICAgIGZvciAodmFyIF9pID0gMTsgX2kgPCBhcmd1bWVudHMubGVuZ3RoOyBfaSsrKSB7XG4gICAgICAgIHN1YnN0W19pIC0gMV0gPSBhcmd1bWVudHNbX2ldO1xuICAgIH1cbiAgICB2YXIgcmVnZXhUZXh0ID0gdG1wbE9iai5yYXdbMF07XG4gICAgdmFyIHdzcmd4ID0gL15cXHMrfFxccytcXG58XFxzKiNbXFxzXFxTXSo/XFxufFxcbi9nbTtcbiAgICB2YXIgdHh0MiA9IHJlZ2V4VGV4dC5yZXBsYWNlKHdzcmd4LCAnJyk7XG4gICAgcmV0dXJuIG5ldyBSZWdFeHAodHh0Mik7XG59XG5mdW5jdGlvbiByZ3hHKHRtcGxPYmopIHtcbiAgICB2YXIgc3Vic3QgPSBbXTtcbiAgICBmb3IgKHZhciBfaSA9IDE7IF9pIDwgYXJndW1lbnRzLmxlbmd0aDsgX2krKykge1xuICAgICAgICBzdWJzdFtfaSAtIDFdID0gYXJndW1lbnRzW19pXTtcbiAgICB9XG4gICAgdmFyIHJlZ2V4VGV4dCA9IHRtcGxPYmoucmF3WzBdO1xuICAgIHZhciB3c3JneCA9IC9eXFxzK3xcXHMrXFxufFxccyojW1xcc1xcU10qP1xcbnxcXG4vZ207XG4gICAgdmFyIHR4dDIgPSByZWdleFRleHQucmVwbGFjZSh3c3JneCwgJycpO1xuICAgIHJldHVybiBuZXcgUmVnRXhwKHR4dDIsICdnJyk7XG59XG4vLyMgc291cmNlTWFwcGluZ1VSTD1hbnNpX3VwLmpzLm1hcFxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbiAgICBleHBvcnRzLmRlZmF1bHQgPSBBbnNpVXA7XG59KSk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9ub2RlX21vZHVsZXMvYW5zaV91cC9hbnNpX3VwLmpzIiwiaW1wb3J0IHsgU2VydmljZSB9IGZyb20gXCIuLi9jb21tb24vYXBpXCI7XG5cbmNvbnN0IEJBU0VfVVJMID0gXCIvemVyb2JvdC9hZG1pbi9hY3RvcnMvYWxlcnRhXCI7XG5cbmNsYXNzIEFsZXJ0c1NlcnZpY2UgZXh0ZW5kcyBTZXJ2aWNlIHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgc3VwZXIoQkFTRV9VUkwpO1xuICAgIH1cblxuICAgIGxpc3QoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmdldENhbGwoXCJsaXN0X2FsZXJ0c1wiKTtcbiAgICB9XG5cbiAgICBkZWxldGUoaWRlbnRpZmllcnMpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucG9zdENhbGwoXCJkZWxldGVfYWxlcnRzXCIsIHtcbiAgICAgICAgICAgIGlkZW50aWZpZXJzOiBpZGVudGlmaWVyc1xuICAgICAgICB9KTtcbiAgICB9XG59XG5cbmV4cG9ydCBjb25zdCBhbGVydHMgPSBuZXcgQWxlcnRzU2VydmljZSgpO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc291cmNlcy9zZXJ2aWNlcy9hbGVydHMuanMiLCJpbXBvcnQgeyBTZXJ2aWNlIH0gZnJvbSBcIi4uL2NvbW1vbi9hcGlcIjtcblxuY29uc3QgQkFTRV9VUkwgPSBcIi90ZmdyaWRfc29sdXRpb25zL3RmZ3JpZF9zb2x1dGlvbnMvYWN0b3JzL3RmZ3JpZF9zb2x1dGlvbnNcIjtcblxuXG5jbGFzcyBTb2x1dGlvbnNTZXJ2aWNlIGV4dGVuZHMgU2VydmljZSB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHN1cGVyKEJBU0VfVVJMKTtcbiAgICB9XG5cblxuICAgIGxpc3Qob3B0cykge1xuICAgICAgICBvcHRzID0gb3B0cyB8fCB7fTtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0Q2FsbChcInNvbHV0aW9uc19saXN0XCIpO1xuICAgIH1cblxuXG4gICAgZGVsZXRlKHNvbHV0aW9uVHlwZSwgc29sdXRpb25OYW1lKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnBvc3RDYWxsKFwic29sdXRpb25fZGVsZXRlXCIsIHsgc29sdXRpb25fdHlwZTogc29sdXRpb25UeXBlLCBzb2x1dGlvbl9uYW1lOiBzb2x1dGlvbk5hbWUgfSk7XG5cbiAgICB9XG5cbn1cblxuZXhwb3J0IGNvbnN0IHNvbHV0aW9ucyA9IG5ldyBTb2x1dGlvbnNTZXJ2aWNlKCk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zb3VyY2VzL3NlcnZpY2VzL2RlcGxveWVkU29sdXRpb25zLmpzIiwiaW1wb3J0IHsgU2VydmljZSB9IGZyb20gXCIuLi9jb21tb24vYXBpXCI7XG5cbmNvbnN0IEJBU0VfVVJMID0gXCIvemVyb2JvdC9hZG1pbi9hY3RvcnMvbG9nc1wiO1xuXG5jbGFzcyBMb2dzU2VydmljZSBleHRlbmRzIFNlcnZpY2Uge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICBzdXBlcihCQVNFX1VSTCk7XG4gICAgfVxuXG4gICAgbGlzdEFwcHMoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmdldENhbGwoXCJsaXN0X2FwcHNcIik7XG4gICAgfVxuXG4gICAgbGlzdChhcHBOYW1lLCBsb2dJZCkge1xuICAgICAgICByZXR1cm4gdGhpcy5wb3N0Q2FsbChcImxpc3RcIiwge1xuICAgICAgICAgICAgYXBwbmFtZTogYXBwTmFtZSxcbiAgICAgICAgICAgIGlkX2Zyb206IGxvZ0lkXG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGRlbGV0ZShhcHBuYW1lKXtcbiAgICAgICAgcmV0dXJuIHRoaXMucG9zdENhbGwoXCJkZWxldGVcIix7XG4gICAgICAgICAgICBhcHBuYW1lOiBhcHBuYW1lXG4gICAgICAgIH0pXG4gICAgfVxuXG4gICAgZGVsZXRlQWxsKCl7XG4gICAgICAgIHJldHVybiB0aGlzLnBvc3RDYWxsKFwiZGVsZXRlXCIpXG4gICAgfVxuXG4gICAgZGVsZXRlU2VsZWN0ZWQoaWRzKXtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0Q2FsbChcImRlbGV0ZV9zZWxlY3RlZFwiLGlkcylcbiAgICB9XG59XG5cbmV4cG9ydCBjb25zdCBsb2dzID0gbmV3IExvZ3NTZXJ2aWNlKCk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zb3VyY2VzL3NlcnZpY2VzL2xvZ3MuanMiLCJpbXBvcnQgeyBTZXJ2aWNlIH0gZnJvbSBcIi4uL2NvbW1vbi9hcGlcIjtcblxuY29uc3QgQkFTRV9VUkwgPSBcIi9hdXRoXCI7XG5cbmNsYXNzIEF1dGhTZXJ2aWNlIGV4dGVuZHMgU2VydmljZSB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHN1cGVyKEJBU0VfVVJMKTtcbiAgICB9XG5cbiAgICBnZXRDdXJyZW50VXNlcigpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0Q2FsbChcImF1dGhvcml6ZWRcIik7XG4gICAgfVxuXG4gICAgbG9nb3V0KCkge1xuICAgICAgICBjb25zdCBuZXh0VXJsID0gd2luZG93LmxvY2F0aW9uLnBhdGhuYW1lICsgd2luZG93LmxvY2F0aW9uLmhhc2g7XG4gICAgICAgIHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gYC9hdXRoL2xvZ291dD9uZXh0X3VybD0ke25leHRVcmx9YDtcbiAgICB9XG59XG5cbmV4cG9ydCBjb25zdCBhdXRoID0gbmV3IEF1dGhTZXJ2aWNlKCk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zb3VyY2VzL3NlcnZpY2VzL2F1dGguanMiLCJleHBvcnQgZnVuY3Rpb24gaW5wdXREaWFsb2coaGVhZCwgbGFiZWwsIGJ1dHRvbkxhYmVsLCBjYWxsYmFjaykge1xuICAgIGNvbnN0IHdpbmRvdyA9IHdlYml4LnVpKHtcbiAgICAgICAgdmlldzogXCJ3aW5kb3dcIixcbiAgICAgICAgaGVpZ2h0OiAyMDAsXG4gICAgICAgIHdpZHRoOiAzMDAsXG4gICAgICAgIG1vZGFsOiB0cnVlLFxuICAgICAgICBwb3NpdGlvbjogXCJjZW50ZXJcIixcbiAgICAgICAgaGVhZDogaGVhZCB8fCBcIklucHV0XCIsXG4gICAgICAgIGJvZHk6IHtcbiAgICAgICAgICAgIHZpZXc6IFwiZm9ybVwiLFxuICAgICAgICAgICAgZWxlbWVudHM6IFt7XG4gICAgICAgICAgICAgICAgaWQ6IFwiaW5wdXRfZGlhbG9nX3RleHRcIixcbiAgICAgICAgICAgICAgICB2aWV3OiBcInRleHRcIixcbiAgICAgICAgICAgICAgICBuYW1lOiBcImlucHV0XCIsXG4gICAgICAgICAgICAgICAgbGFiZWw6IGxhYmVsIHx8IFwiVmFsdWVcIixcbiAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICBjb2xzOiBbe1xuICAgICAgICAgICAgICAgICAgICB2aWV3OiBcImJ1dHRvblwiLFxuICAgICAgICAgICAgICAgICAgICBsYWJlbDogXCJDYW5jZWxcIixcbiAgICAgICAgICAgICAgICAgICAgY2xpY2s6ICgpID0+IHdpbmRvdy5oaWRlKCksXG4gICAgICAgICAgICAgICAgICAgIGNzczogXCJ3ZWJpeF9kYW5nZXJcIlxuICAgICAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICAgICAgdmlldzogXCJidXR0b25cIixcbiAgICAgICAgICAgICAgICAgICAgbGFiZWw6IGJ1dHRvbkxhYmVsIHx8IFwiT2tcIixcbiAgICAgICAgICAgICAgICAgICAgY2xpY2s6IGhhbmRsZUlucHV0LFxuICAgICAgICAgICAgICAgICAgICBjc3M6IFwid2ViaXhfcHJpbWFyeVwiXG4gICAgICAgICAgICAgICAgfV1cbiAgICAgICAgICAgIH1dXG4gICAgICAgIH1cbiAgICB9KTtcblxuICAgIGZ1bmN0aW9uIGhhbmRsZUlucHV0KCkge1xuICAgICAgICBjb25zdCB2YWx1ZSA9IHRoaXMuZ2V0Rm9ybVZpZXcoKS5lbGVtZW50cy5pbnB1dC5nZXRWYWx1ZSgpLnRyaW0oKTtcbiAgICAgICAgaWYgKCF2YWx1ZSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGNhbGxiYWNrIGluc3RhbmNlb2YgRnVuY3Rpb24pIHtcbiAgICAgICAgICAgIGNhbGxiYWNrKHZhbHVlKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHdpbmRvdy5oaWRlKCk7XG4gICAgfVxuXG5cbiAgICBjb25zdCB0ZXh0SW5wdXQgPSAkJChcImlucHV0X2RpYWxvZ190ZXh0XCIpO1xuICAgIHRleHRJbnB1dC5hdHRhY2hFdmVudChcIm9uRW50ZXJcIiwgaGFuZGxlSW5wdXQuYmluZCh0ZXh0SW5wdXQpKTtcblxuICAgIHdpbmRvdy5zaG93KCk7XG4gICAgd2ViaXguVUlNYW5hZ2VyLnNldEZvY3VzKHRleHRJbnB1dCk7XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zb3VyY2VzL2NvbW1vbi9kaWFsb2dzLmpzIiwiaW1wb3J0IHsgU2VydmljZSB9IGZyb20gXCIuLi9jb21tb24vYXBpXCI7XG5cbmNvbnN0IEJBU0VfVVJMID0gXCIvemVyb2JvdC93ZWJpbnRlcmZhY2UvYWN0b3JzL21kYm9va1wiO1xuXG5jbGFzcyBXaWtpc1NlcnZpY2UgZXh0ZW5kcyBTZXJ2aWNlIHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgc3VwZXIoQkFTRV9VUkwpO1xuICAgIH1cblxuICAgIGxpc3Qob3B0cykge1xuICAgICAgICBvcHRzID0gb3B0cyB8fCB7fTtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0Q2FsbChcImJvb2tzX2xpc3RcIik7XG4gICAgfVxufVxuXG5cbmV4cG9ydCBjb25zdCBwYWNrYWdlcyA9IG5ldyBXaWtpc1NlcnZpY2UoKTtcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zb3VyY2VzL3NlcnZpY2VzL3dpa2kuanMiLCJ2YXIgbWFwID0ge1xuXHRcIi4vZW5cIjogNDksXG5cdFwiLi9lbi5qc1wiOiA0OVxufTtcbmZ1bmN0aW9uIHdlYnBhY2tDb250ZXh0KHJlcSkge1xuXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyh3ZWJwYWNrQ29udGV4dFJlc29sdmUocmVxKSk7XG59O1xuZnVuY3Rpb24gd2VicGFja0NvbnRleHRSZXNvbHZlKHJlcSkge1xuXHR2YXIgaWQgPSBtYXBbcmVxXTtcblx0aWYoIShpZCArIDEpKSAvLyBjaGVjayBmb3IgbnVtYmVyIG9yIHN0cmluZ1xuXHRcdHRocm93IG5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIgKyByZXEgKyBcIicuXCIpO1xuXHRyZXR1cm4gaWQ7XG59O1xud2VicGFja0NvbnRleHQua2V5cyA9IGZ1bmN0aW9uIHdlYnBhY2tDb250ZXh0S2V5cygpIHtcblx0cmV0dXJuIE9iamVjdC5rZXlzKG1hcCk7XG59O1xud2VicGFja0NvbnRleHQucmVzb2x2ZSA9IHdlYnBhY2tDb250ZXh0UmVzb2x2ZTtcbm1vZHVsZS5leHBvcnRzID0gd2VicGFja0NvbnRleHQ7XG53ZWJwYWNrQ29udGV4dC5pZCA9IDYwO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vc291cmNlcy9sb2NhbGVzIF5cXC5cXC8uKiRcbi8vIG1vZHVsZSBpZCA9IDYwXG4vLyBtb2R1bGUgY2h1bmtzID0gMCJdLCJzb3VyY2VSb290IjoiIn0=