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
/******/ 	return __webpack_require__(__webpack_require__.s = 56);
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
        return __webpack_require__(58)("./" + url);
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
        var data = __webpack_require__(67)("./" + path);
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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_packages__ = __webpack_require__(40);
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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__common_colors__ = __webpack_require__(6);
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
            width: window.innerWidth * .8,
            height: window.innerHeight * .8,
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

    HealthService.prototype.killProcessesByPid = function killProcessesByPid(pids) {
        return this.postCall('kill_processes_by_pid', { pids: pids });
    };

    HealthService.prototype.killProcessesByPort = function killProcessesByPort(ports) {
        return this.postCall('kill_processes_by_port', { ports: ports });
    };

    HealthService.prototype.getProcessDetails = function getProcessDetails(pid) {
        return this.postCall('get_process_details', { pid: pid });
    };

    return HealthService;
}(__WEBPACK_IMPORTED_MODULE_0__common_api__["a" /* Service */]);

var health = new HealthService();

/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ansiUp; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_ansi_up__ = __webpack_require__(59);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_ansi_up___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_ansi_up__);


var ansiUp = new __WEBPACK_IMPORTED_MODULE_0_ansi_up___default.a();

/***/ }),
/* 7 */
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
/* 8 */
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
/* 9 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_webix_jet__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__common_colors__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__data__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__common_formatters__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__services_alerts__ = __webpack_require__(60);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__alert__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__common_filters__ = __webpack_require__(39);
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
/* 10 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__external__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_admin__ = __webpack_require__(8);
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
/* 11 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_webix_jet__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__errors_dialog__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_taiga__ = __webpack_require__(27);
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
/* 12 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_webix_jet__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__errors_dialog__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_taiga__ = __webpack_require__(27);
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
/* 13 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_webix_jet__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__errors_dialog__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_taiga__ = __webpack_require__(27);
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
/* 14 */
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
/* 15 */
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
/* 16 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_webix_jet__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__errors_dialog__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_deployedSolutions__ = __webpack_require__(62);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__reservation__ = __webpack_require__(29);
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
/* 17 */
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
/* 18 */
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
/* 19 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_webix_jet__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__appLogs__ = __webpack_require__(30);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_logs__ = __webpack_require__(63);
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
            data: ["Delete"]
        }).attachTo(self.appLogs);

        webix.extend(self.appLogs, webix.ProgressBar);
        self.appLogs.showProgress({ hide: false });

        __WEBPACK_IMPORTED_MODULE_2__services_logs__["a" /* logs */].list(appName, logId).then(function (data) {
            self.appLogs.clearAll();
            self.appLogs.parse(data.json()[0]);
            self.appLogs.showProgress({ hide: true });
        });

        $$("logs_cm").attachEvent("onMenuItemClick", function (id) {
            if (id == "Delete") {
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
/* 20 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_webix_jet__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__errors_dialog__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_packages__ = __webpack_require__(40);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__packageDetails__ = __webpack_require__(33);
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
        self.packageDetailsView = self.ui(__WEBPACK_IMPORTED_MODULE_3__packageDetails__["default"]);
        self._requiredpackages = ["zerobot.base", "zerobot.webinterface", "zerobot.admin"];

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
                if (self._requiredpackages.includes(item.name)) {
                    webix.message({ type: "error", text: item.name + " is required package" });
                    return;
                }
                var actions = [].concat(PACKAGE_STATES[item.status].actions, ['delete']);

                menu.clearAll();
                menu.parse(actions);
                menu.show(e);
            }
            return webix.html.preventEvent(e);
        });

        self.loadPackages();

        self.packageTable.attachEvent("onItemDblClick", function () {
            var id = self.packageTable.getSelectedId();
            var item = self.packageTable.getItem(id);
            console.log(item);
            var packageData = {
                'source_name': item['source_name'],
                'id': item['id'],
                'status': PACKAGE_STATES[item['status']] ? PACKAGE_STATES[item['status']].name : UNKNOWN_STATUS,
                'author': item['source']['threebot'],
                'description': item['source']['description'],
                'version': item['source']['version'],
                'install_kwargs': JSON.stringify(item['install_kwargs']),
                'frontend_args': JSON.stringify(item['frontend_args']),
                'path': item['path'],
                'giturl': item['giturl']
            };
            self.packageDetailsView.showPackageDetails(packageData);
        });
    };

    return PackagesView;
}(__WEBPACK_IMPORTED_MODULE_0_webix_jet__["b" /* JetView */]);

/* harmony default export */ __webpack_exports__["default"] = (PackagesView);

/***/ }),
/* 21 */
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
/* 22 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_webix_jet__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__admins__ = __webpack_require__(34);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__general__ = __webpack_require__(35);
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
/* 23 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_webix_jet__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__walletForm__ = __webpack_require__(36);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__walletDetails__ = __webpack_require__(37);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__importForm__ = __webpack_require__(38);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__services_wallet__ = __webpack_require__(24);
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }








var WalletManagerView = function (_JetView) {
    _inherits(WalletManagerView, _JetView);

    function WalletManagerView() {
        _classCallCheck(this, WalletManagerView);

        return _possibleConstructorReturn(this, _JetView.apply(this, arguments));
    }

    WalletManagerView.prototype.config = function config() {
        var wallets = {
            view: "datatable",
            id: "wallets_table",
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
                header: ["Name"],
                sort: "string",
                autowidth: true,
                width: 140
            }, {
                id: "address",
                header: ["Address"],
                sort: "string",
                autowidth: true,
                width: 'auto'
            }],
            scheme: {
                $init: function $init(obj) {
                    obj.index = this.count();
                }
            }
        };

        var view = {
            cols: [{
                view: "template",
                type: "header", template: "Wallets"
            }, {
                view: "button",
                id: "btn_create",
                value: "Create Wallet",
                css: "webix_secondary",
                autowidth: true,
                click: function click() {
                    this.$scope.WalletFormView.showForm();
                }
            }, {
                view: "button",
                id: "btn_import",
                value: "Import Wallet",
                css: "webix_secondary",
                autowidth: true,
                click: function click() {
                    this.$scope.WalletImportView.showForm();
                }
            }]
        };

        return {
            rows: [view, wallets]
        };
    };

    WalletManagerView.prototype.init = function init(view) {
        var self = this;

        self.wallets_table = $$("wallets_table");
        self.WalletDetailsView = self.ui(__WEBPACK_IMPORTED_MODULE_2__walletDetails__["default"]);
        self.WalletFormView = self.ui(__WEBPACK_IMPORTED_MODULE_1__walletForm__["default"]);
        self.WalletImportView = self.ui(__WEBPACK_IMPORTED_MODULE_3__importForm__["default"]);

        self.wallets_table.attachEvent("onItemDblClick", function () {
            webix.extend(self.wallets_table, webix.ProgressBar);
            self.wallets_table.showProgress({
                type: "icon",
                hide: false
            });

            var item = self.wallets_table.getSelectedItem();
            __WEBPACK_IMPORTED_MODULE_4__services_wallet__["a" /* wallet */].manageWallet(item.name).then(function (data) {
                console.log(data.json());
                var res = data.json();
                var info = {
                    'name': item.name,
                    'address': res.address,
                    'secret': res.secret,
                    'balances': res.balances
                };
                self.WalletDetailsView.showInfo(info);
                self.wallets_table.showProgress({ hide: true });
            }).catch(function (data) {
                console.log(data);
                self.wallets_table.showProgress({ hide: true });
                webix.message({ type: "error", text: "Failed to load wallet" });
            });
        });
    };

    WalletManagerView.prototype.urlChange = function urlChange(view, url) {
        var self = this;

        self.wallets_table = $$("wallets_table");
        __WEBPACK_IMPORTED_MODULE_4__services_wallet__["a" /* wallet */].getWallets().then(function (data) {
            console.log(data.json());
            self.wallets_table.parse(data.json());
        });
    };

    return WalletManagerView;
}(__WEBPACK_IMPORTED_MODULE_0_webix_jet__["b" /* JetView */]);

/* harmony default export */ __webpack_exports__["default"] = (WalletManagerView);

/***/ }),
/* 24 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return wallet; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__common_api__ = __webpack_require__(2);
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }



var BASE_URL = "/zerobot/admin/actors/wallet";

var WalletService = function (_Service) {
    _inherits(WalletService, _Service);

    function WalletService() {
        _classCallCheck(this, WalletService);

        return _possibleConstructorReturn(this, _Service.call(this, BASE_URL));
    }

    WalletService.prototype.createWallet = function createWallet(name) {
        return this.getCall("create_wallet", name);
    };

    WalletService.prototype.manageWallet = function manageWallet(name) {
        return this.getCall("manage_wallet", name);
    };

    WalletService.prototype.getWallets = function getWallets() {
        return this.getCall("get_wallets");
    };

    WalletService.prototype.updateTrustLines = function updateTrustLines(name) {
        return this.postCall("updateTrustLines", { name: name });
    };

    WalletService.prototype.importWallet = function importWallet(name, secret, network) {
        return this.postCall("import_wallet", { name: name, secret: secret, network: network });
    };

    return WalletService;
}(__WEBPACK_IMPORTED_MODULE_0__common_api__["a" /* Service */]);

var wallet = new WalletService();

/***/ }),
/* 25 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_webix_jet__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_wiki__ = __webpack_require__(66);
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
/* 26 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_webix_jet__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__common_colors__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__data__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__common_formatters__ = __webpack_require__(4);
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
            width: window.innerWidth * .8,
            height: window.innerHeight * .8,
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
/* 27 */
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
/* 28 */
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
            width: window.innerWidth * .8,
            height: window.innerHeight * .8,
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
/* 29 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_webix_jet__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__common_colors__ = __webpack_require__(6);
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
                autowidth: true,
                scroll: 'xy',
                rows: [info, {
                    id: "formInfo",
                    view: "datatable",
                    on: {
                        onAfterRender: function onAfterRender() {
                            var workloads = ["networks", "zdbs", "volumes", "containers", "kubernetes"];
                            for (var index = 0; index < workloads.length; index++) {
                                var item = workloads[index];
                                var selector = ".webix_item_tab[button_id='" + item + "']";
                                var tab = document.querySelector(selector);
                                if (tab) {
                                    var data = $$(item);
                                    if (data) {
                                        tab.style.display = data.count() == 0 ? "none" : "";
                                    }
                                }
                            }
                        }
                    },
                    resizeColumn: true,
                    scroll: "xy",

                    columns: [{
                        id: "key",
                        header: "Key",
                        width: 130
                    }, {
                        id: "value",
                        header: "Value",
                        scroll: "x",
                        // ssh is too long
                        width: '4000'
                    }]
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
            width: window.innerWidth * .8,
            height: window.innerHeight * .8,
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
/* 30 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_webix_jet__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__common_formatters__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__alerts_data__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__common_filters__ = __webpack_require__(39);
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
/* 31 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_webix_jet__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__common_formatters__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__common_colors__ = __webpack_require__(6);
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
                label: "Action ID",
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

        var tab = {
            view: "tabview",
            cells: [{
                header: "Information",
                body: info
            }, {
                header: "Error",
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

                        id: 'pid',
                        view: "template",
                        template: "<b>PID #pid#</b>",
                        scroll: "auto",
                        height: 30,
                        align: 'center'

                    }, {
                        id: "tracebacks",
                        view: "template",
                        template: "",
                        scroll: "auto"
                    }]
                }
            }]
        };

        return {
            view: "window",
            head: "Job Details",
            modal: true,
            width: window.innerWidth * .8,
            height: window.innerHeight * .8,
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

    JobDetailsView.prototype.showJobDetails = function showJobDetails(data) {
        var item = Object.assign({}, data);
        var jobData = {
            'action_id': item['action_id'],
            'debug': item['debug'].toString(),
            'die': item['die'].toString(),
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

        if (Object.keys(item['error']).length !== 0) {
            jobData['pid'] = item['error']['processid'];
            $$('pid').setValues({ pid: item['error']['processid'] }, true);
            $$('pid').show();
            this.message.setHTML("<p>" + __WEBPACK_IMPORTED_MODULE_2__common_colors__["a" /* ansiUp */].ansi_to_html(item['error']['message']) + "</p>");
            this.tracebacks.setHTML("<p>" + __WEBPACK_IMPORTED_MODULE_2__common_colors__["a" /* ansiUp */].ansi_to_html(item['error']['formatted']) + "</p>");
        } else {
            $$('pid').hide();
            this.message.setHTML("<p>\"No message\"</p>");
            this.tracebacks.setHTML("<p>\"All is fine\"</p>");
        }
        this.form.parse(jobData);
        this.getRoot().show();
    };

    JobDetailsView.prototype.init = function init() {
        this.form = $$("form");
        this.message = $$("message");

        this.tracebacks = $$("tracebacks");
        this.tbTabs = $$("tb_tabs");
    };

    return JobDetailsView;
}(__WEBPACK_IMPORTED_MODULE_0_webix_jet__["b" /* JetView */]);

/* harmony default export */ __webpack_exports__["default"] = (JobDetailsView);

/***/ }),
/* 32 */
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
            width: window.innerWidth * .8,
            height: window.innerHeight * .8,
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
/* 33 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_webix_jet__ = __webpack_require__(0);
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }



var PackageDetailsView = function (_JetView) {
    _inherits(PackageDetailsView, _JetView);

    function PackageDetailsView() {
        _classCallCheck(this, PackageDetailsView);

        return _possibleConstructorReturn(this, _JetView.apply(this, arguments));
    }

    PackageDetailsView.prototype.config = function config() {
        var info = {
            view: "form",
            id: "form",
            elementsConfig: { labelWidth: 120 },
            elements: [{
                view: "text",
                label: "ID",
                name: "id",
                readonly: true
            }, {
                view: "text",
                label: "Name",
                name: "source_name",
                readonly: true
            }, {
                view: "text",
                label: "Author",
                name: "author",
                readonly: true
            }, {
                view: "text",
                label: "Status",
                name: "status",
                readonly: true
            }, {
                view: "textarea",
                label: "Description",
                height: 100,
                name: "description",
                readonly: true
            }, {
                view: "text",
                label: "Version",
                name: "version",
                readonly: true
            }, {
                view: "text",
                label: "install_kwargs",
                name: "install_kwargs",
                readonly: true
            }, {
                view: "text",
                label: "frontend_args",
                name: "frontend_args",
                readonly: true
            }, {
                view: "text",
                label: "Path",
                name: "path",
                readonly: true
            }, {
                view: "text",
                label: "giturl",
                name: "giturl",
                readonly: true
            }]
        };

        return {
            view: "window",
            head: "Package Details",
            modal: true,
            width: window.innerWidth * .8,
            height: window.innerHeight * .8,
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

    PackageDetailsView.prototype.showPackageDetails = function showPackageDetails(data) {
        this.form.parse(data);
        this.getRoot().show();
    };

    PackageDetailsView.prototype.init = function init() {
        this.form = $$("form");
    };

    return PackageDetailsView;
}(__WEBPACK_IMPORTED_MODULE_0_webix_jet__["b" /* JetView */]);

/* harmony default export */ __webpack_exports__["default"] = (PackageDetailsView);

/***/ }),
/* 34 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_webix_jet__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__common_dialogs__ = __webpack_require__(65);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_admin__ = __webpack_require__(8);
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
/* 35 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_webix_jet__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_admin__ = __webpack_require__(8);
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
        }).catch(function (data) {
            _this2.form.showProgress({ hide: true });
            var msg = "Could not switch explorers";
            try {
                msg = JSON.parse(data.responseText).error;
            } catch (e) {
                console.log(e);
            }
            webix.message({ type: "error", text: msg, expire: -1 });
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
/* 36 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_webix_jet__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_wallet__ = __webpack_require__(24);
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }




var WalletFormView = function (_JetView) {
    _inherits(WalletFormView, _JetView);

    function WalletFormView() {
        _classCallCheck(this, WalletFormView);

        return _possibleConstructorReturn(this, _JetView.apply(this, arguments));
    }

    WalletFormView.prototype.config = function config() {
        var info = {
            view: "form",
            id: "form",
            elementsConfig: { labelWidth: 200 },
            elements: [{
                view: "text",
                label: "Name",
                name: "name",
                placeholder: "Wallet name"
            }]
        };

        return {
            view: "window",
            head: "Create new wallet",
            modal: true,
            width: window.innerWidth * .8,
            height: window.innerHeight * .8,
            position: "center",
            body: {
                rows: [info, {
                    view: "button",
                    value: "OK",
                    css: "webix_primary",
                    click: function click() {
                        var wallet_name = $$('form').getValues().name;
                        this.$scope.createWallet(wallet_name);
                    }
                }]
            }
        };
    };

    WalletFormView.prototype.init = function init() {
        this.form = $$("form");
    };

    WalletFormView.prototype.showForm = function showForm() {
        this.getRoot().show();
    };

    WalletFormView.prototype.createWallet = function createWallet(name) {
        var _this2 = this;

        webix.extend(this.form, webix.ProgressBar);
        this.form.showProgress({
            type: "icon",
            hide: false
        });
        __WEBPACK_IMPORTED_MODULE_1__services_wallet__["a" /* wallet */].createWallet(name).then(function (data) {
            webix.message({ type: "success", text: "Wallet created successfully" });
            _this2.form.showProgress({ hide: true });
            _this2.form.getTopParentView().hide();
            _this2.app.refresh();
        }).catch(function (error) {
            webix.message({ type: "error", text: "Could not create wallet", expire: -1 });
            _this2.form.showProgress({ hide: true });
            _this2.form.getTopParentView().hide();
            _this2.app.refresh();
        });
    };

    return WalletFormView;
}(__WEBPACK_IMPORTED_MODULE_0_webix_jet__["b" /* JetView */]);

/* harmony default export */ __webpack_exports__["default"] = (WalletFormView);

/***/ }),
/* 37 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_webix_jet__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_wallet__ = __webpack_require__(24);
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }




var WalletDetailsView = function (_JetView) {
    _inherits(WalletDetailsView, _JetView);

    function WalletDetailsView() {
        _classCallCheck(this, WalletDetailsView);

        return _possibleConstructorReturn(this, _JetView.apply(this, arguments));
    }

    WalletDetailsView.prototype.config = function config() {
        var info = {
            id: "wallet_info",
            view: "list",
            responsive: true,
            type: {
                height: 'auto'
            },
            template: "\n                <p></font><font size=\"3\"><b>#key#: </b>#value#</font><br></p>\n            "
        };

        return {
            view: "window",
            head: "Wallet Details",
            modal: true,
            width: window.innerWidth * .8,
            height: window.innerHeight * .8,
            position: "center",
            body: {
                rows: [info, {
                    cols: [{
                        view: "button",
                        id: "secret_btn",
                        value: "Show Secret",
                        css: "webix_primary",
                        click: function click() {
                            this.$scope.showSecret();
                        }
                    }, {
                        view: "button",
                        value: "Update trustlines",
                        css: "webix_primary",
                        click: function click() {
                            this.$scope.updateTrustLines();
                        }
                    }, {
                        view: "button",
                        value: "Close",
                        css: "webix_primary",
                        click: function click() {
                            $$("secret_btn").enable();
                            this.getTopParentView().hide();
                        }
                    }]
                }]
            }
        };
    };

    WalletDetailsView.prototype.init = function init() {
        var self = this;
        self.info = this.$$("wallet_info");
        self.secret_btn = this.$$("secret_btn");
        self.secret = "";
        self.name = "";
        webix.extend(self.info, webix.ProgressBar);
    };

    WalletDetailsView.prototype.showSecret = function showSecret() {
        var self = this;

        self.info.add({
            key: 'Secret',
            value: self.secret
        });
        self.secret_btn.disable();
    };

    WalletDetailsView.prototype.updateTrustLines = function updateTrustLines() {
        var self = this;
        self.info.showProgress({
            hide: false
        });
        __WEBPACK_IMPORTED_MODULE_1__services_wallet__["a" /* wallet */].updateTrustLines(self.name).then(function (data) {
            __WEBPACK_IMPORTED_MODULE_1__services_wallet__["a" /* wallet */].manageWallet(self.name).then(function (data) {
                var walletInfo = data.json();
                walletInfo.name = self.name;
                self.showInfo(walletInfo);
                self.secret_btn.enable();
            });
        }).catch(function (error) {
            webix.message({ type: "error", text: "Failed to update trustlines" });
        });
    };

    WalletDetailsView.prototype.showInfo = function showInfo(data) {
        var self = this;

        var balances = "";
        for (var i in data.balances) {
            balances += "<br>" + data.balances[i].balance + " <b>" + data.balances[i].asset_code + "</b>";
        }
        self.info.clearAll();
        self.info.add({
            key: 'Name',
            value: data.name
        });
        self.info.add({
            key: 'Address',
            value: data.address
        });
        self.info.add({
            key: 'Balances',
            value: balances
        });
        self.secret = data.secret;
        self.name = data.name;
        self.info.showProgress({
            hide: true
        });
        this.getRoot().show();
    };

    return WalletDetailsView;
}(__WEBPACK_IMPORTED_MODULE_0_webix_jet__["b" /* JetView */]);

/* harmony default export */ __webpack_exports__["default"] = (WalletDetailsView);

/***/ }),
/* 38 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_webix_jet__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_wallet__ = __webpack_require__(24);
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }





var WalletImportView = function (_JetView) {
    _inherits(WalletImportView, _JetView);

    function WalletImportView() {
        _classCallCheck(this, WalletImportView);

        return _possibleConstructorReturn(this, _JetView.apply(this, arguments));
    }

    WalletImportView.prototype.config = function config() {
        var info = {
            view: "form",
            id: "import_form",
            elementsConfig: { labelWidth: 200 },
            elements: [{
                view: "text",
                label: "Name",
                name: "name",
                placeholder: "Wallet name"
            }, {
                view: "text",
                label: "Secret",
                name: "secret",
                placeholder: "Wallet secret"
            }, {
                view: "select",
                label: "Network Type",
                value: "network",
                name: "network",
                options: [{ "id": "STD", "value": "STD" }, { "id": "TEST", "value": "TEST" }]
            }]
        };

        return {
            view: "window",
            head: "Import wallet",
            modal: true,
            width: window.innerWidth * .8,
            height: window.innerHeight * .8,
            position: "center",
            body: {
                rows: [info, {
                    view: "button",
                    value: "OK",
                    css: "webix_primary",
                    click: function click() {
                        var name = $$('import_form').getValues().name;
                        var secret = $$('import_form').getValues().secret;
                        var network = $$('import_form').getValues().network;
                        console.log(name);
                        console.log(secret);
                        console.log(network);
                        this.$scope.importWallet(name, secret, network);
                    }
                }]
            }
        };
    };

    WalletImportView.prototype.init = function init() {
        this.form = $$("import_form");
    };

    WalletImportView.prototype.showForm = function showForm() {
        this.getRoot().show();
    };

    WalletImportView.prototype.importWallet = function importWallet(name, secret, network) {
        var _this2 = this;

        webix.extend(this.form, webix.ProgressBar);
        this.form.showProgress({
            type: "icon",
            hide: false
        });
        __WEBPACK_IMPORTED_MODULE_1__services_wallet__["a" /* wallet */].importWallet(name, secret, network).then(function (data) {
            webix.message({ type: "success", text: "Wallet imported successfully" });
            _this2.form.showProgress({ hide: true });
            _this2.form.clear();
            _this2.form.getTopParentView().hide();
            _this2.app.refresh();
        }).catch(function (error) {
            webix.message({ type: "error", text: "Could not import wallet" });
            _this2.form.showProgress({ hide: true });
            _this2.form.clear();
            _this2.form.getTopParentView().hide();
            _this2.app.refresh();
        });
    };

    return WalletImportView;
}(__WEBPACK_IMPORTED_MODULE_0_webix_jet__["b" /* JetView */]);

/* harmony default export */ __webpack_exports__["default"] = (WalletImportView);

/***/ }),
/* 39 */
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
/* 40 */
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
/* 41 */
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
/* 42 */
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
/* 43 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_webix_jet__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_health__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_identity__ = __webpack_require__(61);
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
        var _info, _botInfo;

        var info = (_info = {
            id: "jsxInfo",
            responsive: true,
            view: "list"
        }, _info["responsive"] = true, _info.type = {
            height: 'auto'
        }, _info.template = "\n                <p><font size=\"3\"><b>#key#: </b></font> <font size=\"3\">#value#</font></p>\n            ", _info);
        var botInfo = (_botInfo = {
            id: "botInfo",
            responsive: true,
            view: "list"
        }, _botInfo["responsive"] = true, _botInfo.height = 100, _botInfo.type = {
            height: 50
        }, _botInfo.template = "\n                <p><font size=\"3\"><b>#key#: </b></font> <font size=\"3\">#value#</font></p>\n            ", _botInfo);

        return {
            type: "space",
            rows: [{
                template: "<div style='width:auto;text-align:center'><h3>JSX Info<h3/></div>",
                height: 50
            }, botInfo, info]
        };
    };

    JSXInfoView.prototype.init = function init() {
        var self = this;

        this.info = this.$$("jsxInfo");
        this.botinfo = this.$$("botInfo");
        __WEBPACK_IMPORTED_MODULE_1__services_health__["a" /* health */].getIdentity().then(function (data) {
            self.botinfo.add({
                key: "3bot name",
                value: data.text()
            });
        });
        __WEBPACK_IMPORTED_MODULE_2__services_identity__["a" /* identity */].get_identity().then(function (data) {
            self.botinfo.add({
                key: "3bot id",
                value: data.json().tid
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
/* 44 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_webix_jet__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_health__ = __webpack_require__(5);
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
/* 45 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_webix_jet__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_health__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__processDetails__ = __webpack_require__(28);
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
/* 46 */
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
/* 47 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_webix_jet__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_auth__ = __webpack_require__(64);
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
                value: '<span><img class="solutions-icon" src="static/img/k8s.png"/>Kubernetes Cluster</span>'
            }, {
                id: "domain_delegation",
                value: 'Domain Delagation',
                icon: 'mdi mdi-dns'
            }, {
                id: "solution_expose",
                value: 'Solution expose',
                icon: 'mdi mdi-wan'
            }, {
                id: "gateway_4to6",
                value: '4 to 6 Gateway',
                icon: 'mdi mdi-ip-network'
            }]
        }, {
            id: "walletsManager",
            value: "Wallets Manager",
            icon: "mdi mdi-wallet"
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
                k8s_cluster: "solutions.chatflow?author=tfgrid_solutions&package=tfgrid_solutions&chat=kubernetes_cluster_deploy",
                threebot: "solutions.chatflow?author=tfgrid&package=threebot_provisioning&chat=threebot_reservation",
                domain_delegation: "solutions.chatflow?author=tfgrid_solutions&package=tfgrid_solutions&chat=domain_delegation",
                gateway_4to6: "solutions.chatflow?author=tfgrid_solutions&package=tfgrid_solutions&chat=four_to_six_gateway",
                solution_expose: "solutions.chatflow?author=tfgrid_solutions&package=tfgrid_solutions&chat=solution_expose"
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
/* 48 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_webix_jet__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__common_formatters__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_myjobs__ = __webpack_require__(49);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__jobDetails__ = __webpack_require__(31);
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
            self.jobDetailsView.showJobDetails(item);
        });
    };

    return JobsView;
}(__WEBPACK_IMPORTED_MODULE_0_webix_jet__["b" /* JetView */]);

/* harmony default export */ __webpack_exports__["default"] = (JobsView);

/***/ }),
/* 49 */
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
/* 50 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_webix_jet__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__common_formatters__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_myjobs__ = __webpack_require__(49);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__workerDetails__ = __webpack_require__(32);
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
            }, {
                id: "logs",
                header: "Logs",
                sort: "string",
                width: 200,
                template: function template(obj) {
                    return "<div class='webix_el_button'><button class='btn_view'> Logs </button></div>";
                }
            }],
            onClick: {
                btn_view: function btn_view(ev, id) {
                    var item = this.getItem(id);
                    this.$scope.show("/main/logs?appname=" + item.name);
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

    JobsView.prototype.init = function init(view) {
        var self = this;
        self.workerDetailsView = self.ui(__WEBPACK_IMPORTED_MODULE_3__workerDetails__["default"]);

        __WEBPACK_IMPORTED_MODULE_2__services_myjobs__["a" /* myjobs */].listWorkers().then(function (data) {
            var workers = data.json();
            // map worker name from w1 to weorkers_1 for redirection to logs
            for (var i in workers) {
                workers[i]['name'] = workers[i]['name'].replace('w', 'workers_');
            }
            view.parse(workers);
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
                'current_job': item['current_job'] == 2147483647 ? 'N/A' : item['current_job'],
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
/* 51 */
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
/* 52 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__external__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_admin__ = __webpack_require__(8);
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }




var TFGridSDKWiki = function (_ExternalView) {
    _inherits(TFGridSDKWiki, _ExternalView);

    function TFGridSDKWiki(app, name) {
        _classCallCheck(this, TFGridSDKWiki);

        return _possibleConstructorReturn(this, _ExternalView.call(this, app, name));
    }

    TFGridSDKWiki.prototype.showIframe = function showIframe() {
        this.externalIframe.show();
        this.externalIframe.showProgress({ type: "icon" });
        this.externalIframe.load("https://sdk.threefold.io");
    };

    return TFGridSDKWiki;
}(__WEBPACK_IMPORTED_MODULE_0__external__["ExternalView"]);

/* harmony default export */ __webpack_exports__["default"] = (TFGridSDKWiki);

/***/ }),
/* 53 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__external__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_admin__ = __webpack_require__(8);
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }




var ThreefoldWiki = function (_ExternalView) {
    _inherits(ThreefoldWiki, _ExternalView);

    function ThreefoldWiki(app, name) {
        _classCallCheck(this, ThreefoldWiki);

        return _possibleConstructorReturn(this, _ExternalView.call(this, app, name));
    }

    ThreefoldWiki.prototype.showIframe = function showIframe() {
        this.externalIframe.show();
        this.externalIframe.showProgress({ type: "icon" });
        this.externalIframe.load("https://wiki.threefold.io");
    };

    return ThreefoldWiki;
}(__WEBPACK_IMPORTED_MODULE_0__external__["ExternalView"]);

/* harmony default export */ __webpack_exports__["default"] = (ThreefoldWiki);

/***/ }),
/* 54 */
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
/* 55 */
/***/ (function(module, exports) {



/***/ }),
/* 56 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__styles_app_css__ = __webpack_require__(57);
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
/* 57 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 58 */
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./alerts": 9,
	"./alerts/": 9,
	"./alerts/alert": 26,
	"./alerts/alert.js": 26,
	"./alerts/data": 7,
	"./alerts/data.js": 7,
	"./alerts/index": 9,
	"./alerts/index.js": 9,
	"./capacity": 10,
	"./capacity/": 10,
	"./capacity/index": 10,
	"./capacity/index.js": 10,
	"./circles": 11,
	"./circles/": 11,
	"./circles/index": 11,
	"./circles/index.js": 11,
	"./circlestories": 12,
	"./circlestories/": 12,
	"./circlestories/index": 12,
	"./circlestories/index.js": 12,
	"./circletasks": 13,
	"./circletasks/": 13,
	"./circletasks/index": 13,
	"./circletasks/index.js": 13,
	"./codeserver": 14,
	"./codeserver/": 14,
	"./codeserver/index": 14,
	"./codeserver/index.js": 14,
	"./dash": 15,
	"./dash/": 15,
	"./dash/diskSpace": 41,
	"./dash/diskSpace.js": 41,
	"./dash/health": 42,
	"./dash/health.js": 42,
	"./dash/index": 15,
	"./dash/index.js": 15,
	"./dash/jsxInfo": 43,
	"./dash/jsxInfo.js": 43,
	"./dash/processDetails": 28,
	"./dash/processDetails.js": 28,
	"./dash/processes": 44,
	"./dash/processes.js": 44,
	"./dash/processesList": 45,
	"./dash/processesList.js": 45,
	"./dash/runningPorts": 46,
	"./dash/runningPorts.js": 46,
	"./deployedSolutions": 16,
	"./deployedSolutions/": 16,
	"./deployedSolutions/index": 16,
	"./deployedSolutions/index.js": 16,
	"./deployedSolutions/reservation": 29,
	"./deployedSolutions/reservation.js": 29,
	"./errors/dialog": 3,
	"./errors/dialog.js": 3,
	"./external": 1,
	"./external/": 1,
	"./external/index": 1,
	"./external/index.js": 1,
	"./farmmanagement": 17,
	"./farmmanagement/": 17,
	"./farmmanagement/index": 17,
	"./farmmanagement/index.js": 17,
	"./jupyter": 18,
	"./jupyter/": 18,
	"./jupyter/index": 18,
	"./jupyter/index.js": 18,
	"./logs": 19,
	"./logs/": 19,
	"./logs/appLogs": 30,
	"./logs/appLogs.js": 30,
	"./logs/index": 19,
	"./logs/index.js": 19,
	"./main": 47,
	"./main.js": 47,
	"./myjobs/jobDetails": 31,
	"./myjobs/jobDetails.js": 31,
	"./myjobs/jobs": 48,
	"./myjobs/jobs.js": 48,
	"./myjobs/workerDetails": 32,
	"./myjobs/workerDetails.js": 32,
	"./myjobs/workers": 50,
	"./myjobs/workers.js": 50,
	"./packages": 20,
	"./packages/": 20,
	"./packages/index": 20,
	"./packages/index.js": 20,
	"./packages/packageDetails": 33,
	"./packages/packageDetails.js": 33,
	"./sdkexamples": 21,
	"./sdkexamples/": 21,
	"./sdkexamples/index": 21,
	"./sdkexamples/index.js": 21,
	"./settings": 22,
	"./settings/": 22,
	"./settings/admins": 34,
	"./settings/admins.js": 34,
	"./settings/general": 35,
	"./settings/general.js": 35,
	"./settings/index": 22,
	"./settings/index.js": 22,
	"./solutions/chatflow": 51,
	"./solutions/chatflow.js": 51,
	"./tfwikis/tfgridsdk": 52,
	"./tfwikis/tfgridsdk.js": 52,
	"./tfwikis/threefold": 53,
	"./tfwikis/threefold.js": 53,
	"./walletsManager": 23,
	"./walletsManager/": 23,
	"./walletsManager/importForm": 38,
	"./walletsManager/importForm.js": 38,
	"./walletsManager/index": 23,
	"./walletsManager/index.js": 23,
	"./walletsManager/walletDetails": 37,
	"./walletsManager/walletDetails.js": 37,
	"./walletsManager/walletForm": 36,
	"./walletsManager/walletForm.js": 36,
	"./wikis": 25,
	"./wikis/": 25,
	"./wikis/index": 25,
	"./wikis/index.js": 25,
	"./wikis/view": 54,
	"./wikis/view.js": 54
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
webpackContext.id = 58;

/***/ }),
/* 59 */
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
/* 60 */
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
/* 61 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return identity; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__common_api__ = __webpack_require__(2);
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }



var BASE_URL = "/zerobot/webinterface/actors/identity";

var IdentityService = function (_Service) {
    _inherits(IdentityService, _Service);

    function IdentityService() {
        _classCallCheck(this, IdentityService);

        return _possibleConstructorReturn(this, _Service.call(this, BASE_URL));
    }

    IdentityService.prototype.get_identity = function get_identity() {
        return this.getCall("threebot_name");
    };

    return IdentityService;
}(__WEBPACK_IMPORTED_MODULE_0__common_api__["a" /* Service */]);

var identity = new IdentityService();

/***/ }),
/* 62 */
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
/* 63 */
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
        return this.postCall("delete_selected", { ids: ids });
    };

    return LogsService;
}(__WEBPACK_IMPORTED_MODULE_0__common_api__["a" /* Service */]);

var logs = new LogsService();

/***/ }),
/* 64 */
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
/* 65 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = inputDialog;
function inputDialog(head, label, buttonLabel, callback) {
    var window = webix.ui({
        view: "window",
        width: window.innerWidth * .8,
        height: window.innerHeight * .8,
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
/* 66 */
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
/* 67 */
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./en": 55,
	"./en.js": 55
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
webpackContext.id = 67;

/***/ })
/******/ ])["default"];
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgZmIyNmNmYWI3ODU4NGIwZjI5MDYiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3dlYml4LWpldC9kaXN0L2VzNi9qZXQuanMiLCJ3ZWJwYWNrOi8vLy4vc291cmNlcy92aWV3cy9leHRlcm5hbC9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9zb3VyY2VzL2NvbW1vbi9hcGkuanMiLCJ3ZWJwYWNrOi8vLy4vc291cmNlcy92aWV3cy9lcnJvcnMvZGlhbG9nLmpzIiwid2VicGFjazovLy8uL3NvdXJjZXMvY29tbW9uL2Zvcm1hdHRlcnMuanMiLCJ3ZWJwYWNrOi8vLy4vc291cmNlcy9zZXJ2aWNlcy9oZWFsdGguanMiLCJ3ZWJwYWNrOi8vLy4vc291cmNlcy9jb21tb24vY29sb3JzLmpzIiwid2VicGFjazovLy8uL3NvdXJjZXMvdmlld3MvYWxlcnRzL2RhdGEuanMiLCJ3ZWJwYWNrOi8vLy4vc291cmNlcy9zZXJ2aWNlcy9hZG1pbi5qcyIsIndlYnBhY2s6Ly8vLi9zb3VyY2VzL3ZpZXdzL2FsZXJ0cy9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9zb3VyY2VzL3ZpZXdzL2NhcGFjaXR5L2luZGV4LmpzIiwid2VicGFjazovLy8uL3NvdXJjZXMvdmlld3MvY2lyY2xlcy9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9zb3VyY2VzL3ZpZXdzL2NpcmNsZXN0b3JpZXMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vc291cmNlcy92aWV3cy9jaXJjbGV0YXNrcy9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9zb3VyY2VzL3ZpZXdzL2NvZGVzZXJ2ZXIvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vc291cmNlcy92aWV3cy9kYXNoL2luZGV4LmpzIiwid2VicGFjazovLy8uL3NvdXJjZXMvdmlld3MvZGVwbG95ZWRTb2x1dGlvbnMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vc291cmNlcy92aWV3cy9mYXJtbWFuYWdlbWVudC9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9zb3VyY2VzL3ZpZXdzL2p1cHl0ZXIvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vc291cmNlcy92aWV3cy9sb2dzL2luZGV4LmpzIiwid2VicGFjazovLy8uL3NvdXJjZXMvdmlld3MvcGFja2FnZXMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vc291cmNlcy92aWV3cy9zZGtleGFtcGxlcy9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9zb3VyY2VzL3ZpZXdzL3NldHRpbmdzL2luZGV4LmpzIiwid2VicGFjazovLy8uL3NvdXJjZXMvdmlld3Mvd2FsbGV0c01hbmFnZXIvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vc291cmNlcy9zZXJ2aWNlcy93YWxsZXQuanMiLCJ3ZWJwYWNrOi8vLy4vc291cmNlcy92aWV3cy93aWtpcy9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9zb3VyY2VzL3ZpZXdzL2FsZXJ0cy9hbGVydC5qcyIsIndlYnBhY2s6Ly8vLi9zb3VyY2VzL3NlcnZpY2VzL3RhaWdhLmpzIiwid2VicGFjazovLy8uL3NvdXJjZXMvdmlld3MvZGFzaC9wcm9jZXNzRGV0YWlscy5qcyIsIndlYnBhY2s6Ly8vLi9zb3VyY2VzL3ZpZXdzL2RlcGxveWVkU29sdXRpb25zL3Jlc2VydmF0aW9uLmpzIiwid2VicGFjazovLy8uL3NvdXJjZXMvdmlld3MvbG9ncy9hcHBMb2dzLmpzIiwid2VicGFjazovLy8uL3NvdXJjZXMvdmlld3MvbXlqb2JzL2pvYkRldGFpbHMuanMiLCJ3ZWJwYWNrOi8vLy4vc291cmNlcy92aWV3cy9teWpvYnMvd29ya2VyRGV0YWlscy5qcyIsIndlYnBhY2s6Ly8vLi9zb3VyY2VzL3ZpZXdzL3BhY2thZ2VzL3BhY2thZ2VEZXRhaWxzLmpzIiwid2VicGFjazovLy8uL3NvdXJjZXMvdmlld3Mvc2V0dGluZ3MvYWRtaW5zLmpzIiwid2VicGFjazovLy8uL3NvdXJjZXMvdmlld3Mvc2V0dGluZ3MvZ2VuZXJhbC5qcyIsIndlYnBhY2s6Ly8vLi9zb3VyY2VzL3ZpZXdzL3dhbGxldHNNYW5hZ2VyL3dhbGxldEZvcm0uanMiLCJ3ZWJwYWNrOi8vLy4vc291cmNlcy92aWV3cy93YWxsZXRzTWFuYWdlci93YWxsZXREZXRhaWxzLmpzIiwid2VicGFjazovLy8uL3NvdXJjZXMvdmlld3Mvd2FsbGV0c01hbmFnZXIvaW1wb3J0Rm9ybS5qcyIsIndlYnBhY2s6Ly8vLi9zb3VyY2VzL2NvbW1vbi9maWx0ZXJzLmpzIiwid2VicGFjazovLy8uL3NvdXJjZXMvc2VydmljZXMvcGFja2FnZXMuanMiLCJ3ZWJwYWNrOi8vLy4vc291cmNlcy92aWV3cy9kYXNoL2Rpc2tTcGFjZS5qcyIsIndlYnBhY2s6Ly8vLi9zb3VyY2VzL3ZpZXdzL2Rhc2gvaGVhbHRoLmpzIiwid2VicGFjazovLy8uL3NvdXJjZXMvdmlld3MvZGFzaC9qc3hJbmZvLmpzIiwid2VicGFjazovLy8uL3NvdXJjZXMvdmlld3MvZGFzaC9wcm9jZXNzZXMuanMiLCJ3ZWJwYWNrOi8vLy4vc291cmNlcy92aWV3cy9kYXNoL3Byb2Nlc3Nlc0xpc3QuanMiLCJ3ZWJwYWNrOi8vLy4vc291cmNlcy92aWV3cy9kYXNoL3J1bm5pbmdQb3J0cy5qcyIsIndlYnBhY2s6Ly8vLi9zb3VyY2VzL3ZpZXdzL21haW4uanMiLCJ3ZWJwYWNrOi8vLy4vc291cmNlcy92aWV3cy9teWpvYnMvam9icy5qcyIsIndlYnBhY2s6Ly8vLi9zb3VyY2VzL3NlcnZpY2VzL215am9icy5qcyIsIndlYnBhY2s6Ly8vLi9zb3VyY2VzL3ZpZXdzL215am9icy93b3JrZXJzLmpzIiwid2VicGFjazovLy8uL3NvdXJjZXMvdmlld3Mvc29sdXRpb25zL2NoYXRmbG93LmpzIiwid2VicGFjazovLy8uL3NvdXJjZXMvdmlld3MvdGZ3aWtpcy90ZmdyaWRzZGsuanMiLCJ3ZWJwYWNrOi8vLy4vc291cmNlcy92aWV3cy90Zndpa2lzL3RocmVlZm9sZC5qcyIsIndlYnBhY2s6Ly8vLi9zb3VyY2VzL3ZpZXdzL3dpa2lzL3ZpZXcuanMiLCJ3ZWJwYWNrOi8vLy4vc291cmNlcy9hcHAuanMiLCJ3ZWJwYWNrOi8vLy4vc291cmNlcy9zdHlsZXMvYXBwLmNzcyIsIndlYnBhY2s6Ly8vLi9zb3VyY2VzL3ZpZXdzIF5cXC5cXC8uKiQiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2Fuc2lfdXAvYW5zaV91cC5qcyIsIndlYnBhY2s6Ly8vLi9zb3VyY2VzL3NlcnZpY2VzL2FsZXJ0cy5qcyIsIndlYnBhY2s6Ly8vLi9zb3VyY2VzL3NlcnZpY2VzL2lkZW50aXR5LmpzIiwid2VicGFjazovLy8uL3NvdXJjZXMvc2VydmljZXMvZGVwbG95ZWRTb2x1dGlvbnMuanMiLCJ3ZWJwYWNrOi8vLy4vc291cmNlcy9zZXJ2aWNlcy9sb2dzLmpzIiwid2VicGFjazovLy8uL3NvdXJjZXMvc2VydmljZXMvYXV0aC5qcyIsIndlYnBhY2s6Ly8vLi9zb3VyY2VzL2NvbW1vbi9kaWFsb2dzLmpzIiwid2VicGFjazovLy8uL3NvdXJjZXMvc2VydmljZXMvd2lraS5qcyIsIndlYnBhY2s6Ly8vLi9zb3VyY2VzL2xvY2FsZXMgXlxcLlxcLy4qJCJdLCJuYW1lcyI6WyJOYXZpZ2F0aW9uQmxvY2tlZCIsIkpldEJhc2UiLCJ3ZWJpeCIsIndlYml4SmV0IiwiX2V2ZW50cyIsIl9zdWJzIiwiX2RhdGEiLCJnZXRSb290IiwiX3Jvb3QiLCJkZXN0cnVjdG9yIiwiX2RldGFjaEV2ZW50cyIsIl9kZXN0cm95U3VicyIsIl9jb250YWluZXIiLCJhcHAiLCJfcGFyZW50Iiwic2V0UGFyYW0iLCJpZCIsInZhbHVlIiwidXJsIiwiX3NlZ21lbnQiLCJ1cGRhdGUiLCJzaG93IiwiZ2V0UGFyYW0iLCJwYXJlbnQiLCJ2aWV3IiwiZ2V0UGFyZW50VmlldyIsImdldFVybCIsInN1YnVybCIsImdldFVybFN0cmluZyIsInRvU3RyaW5nIiwiJCQiLCJyb290IiwicXVlcnlWaWV3Iiwib2JqIiwiY29uZmlnIiwibG9jYWxJZCIsIiRzY29wZSIsIm9uIiwibmFtZSIsImNvZGUiLCJhdHRhY2hFdmVudCIsInB1c2giLCJjb250YWlucyIsImtleSIsImtpZCIsImdldFN1YlZpZXciLCJzdWIiLCJnZXRTdWJWaWV3SW5mbyIsInN1YnZpZXciLCJwb3B1cCIsImV2ZW50cyIsImkiLCJsZW5ndGgiLCJkZXRhY2hFdmVudCIsInN1YlZpZXciLCJfaW5pdF91cmxfZGF0YSIsImN1cnJlbnQiLCJleHRlbmQiLCJwYXJhbXMiLCJfZ2V0RGVmYXVsdFN1YiIsImRlZmF1bHQiLCJicmFuY2giLCJjaGlsZCIsIl9yb3V0ZWRfdmlldyIsInBhcnNlIiwic3Vic3RyIiwicGFydHMiLCJzcGxpdCIsImNodW5rcyIsInRlc3QiLCJyZXN1bHQiLCJwb3MiLCJpbmRleE9mIiwicGFyYW0iLCJkY2h1bmsiLCJkZWNvZGVVUklDb21wb25lbnQiLCJwYWdlIiwiaXNOZXciLCJ1cmwyc3RyIiwic3RhY2siLCJjaHVuayIsIm9iajJzdHIiLCJqb2luIiwic3RyIiwiZW5jb2RlVVJJQ29tcG9uZW50IiwiUm91dGUiLCJyb3V0ZSIsImluZGV4IiwiX25leHQiLCJwYXRoIiwibmV4dCIsInNsaWNlIiwic2hpZnQiLCJyZWZyZXNoIiwiX2pvaW4iLCJraWRzIiwib2xkIiwiY29uY2F0IiwiYXBwZW5kIiwiUHJvbWlzZSIsInJlcyIsInJlaiIsInJlZGlyZWN0IiwiY29uZmlybSIsInJlc29sdmUiLCJjYWxsRXZlbnQiLCJjYXRjaCIsImVyciIsInRoZW4iLCJzaXplIiwibiIsIkpldFZpZXciLCJfY2hpbGRyZW4iLCJ1aSIsImNvbnRhaW5lciIsImpldHZpZXciLCJjcmVhdGVWaWV3IiwicmVuZGVyIiwidGFyZ2V0IiwiX3JlbmRlckZyYW1lTG9jayIsIl9zaG93Iiwic2VnbWVudCIsIl91cmxDaGFuZ2UiLCJsaW5rUm91dGVyIiwiZ2V0Um91dGVyIiwic2V0Iiwic2lsZW50IiwiaW5pdCIsIl8kdmlldyIsIl8kIiwicmVhZHkiLCJfJHVybCIsIm1lc3NhZ2UiLCJ1cmxDaGFuZ2UiLCJkZXN0cm95IiwiX2Rlc3Ryb3lLaWRzIiwidXNlIiwicGx1Z2luIiwidGFnTmFtZSIsIl9yZW5kZXIiLCJkb2N1bWVudCIsImJvZHkiLCJ0b05vZGUiLCJfcmVuZGVyX2ZpbmFsIiwiY2ZnIiwic2xvdCIsInJlamVjdCIsInJlc3BvbnNlIiwiY29weUNvbmZpZyIsIm9sZHVpIiwiYXNXaW4iLCJzZXRQb3NpdGlvbiIsImlzVmlzaWJsZSIsIl9pbml0IiwiX2luaXRVcmwiLCJlIiwiX2luaXRFcnJvciIsIndhaXRzIiwiZnJhbWUiLCJ3YWl0IiwiYWxsIiwibG9jayIsIl9yZW5kZXJGcmFtZSIsIl9jcmVhdGVTdWJWaWV3IiwiZXJyb3IiLCJjcmVhdGVGcm9tVVJMIiwidWlzIiwiSmV0Vmlld1JhdyIsIl91aSIsIlN1YlJvdXRlciIsImNiIiwiYSIsImdldCIsIl9vbmNlIiwiSmV0QXBwQmFzZSIsIndpbmRvdyIsInZlcnNpb24iLCJzdGFydCIsIl9zZXJ2aWNlcyIsIkV2ZW50U3lzdGVtIiwiX3N1YlNlZ21lbnQiLCJnZXRTZXJ2aWNlIiwic2V0U2VydmljZSIsImhhbmRsZXIiLCJwcm90b3R5cGUiLCIkc3VidmlldyIsImFkZFN1YlZpZXciLCJBcnJheSIsIm1ldGhvZCIsInBvaW50IiwiRGF0YUNvbGxlY3Rpb24iLCJSZWdFeHAiLCJEYXRlIiwiY29weSIsIiRyb3V0ZXIiLCJjbGlja0hhbmRsZXIiLCJzcmNFbGVtZW50IiwiZ2V0QXR0cmlidXRlIiwidHJpZ2dlciIsIl9mb3JWaWV3IiwiY2FuY2VsQnViYmxlIiwicHJldmVudERlZmF1bHQiLCJwYXJlbnROb2RlIiwibG9hZFZpZXciLCJ2aWV3cyIsIl9sb2FkRXJyb3IiLCJFcnJvciIsIl9sb2FkVmlld0R5bmFtaWMiLCJtb2R1bGUiLCJfX2VzTW9kdWxlIiwicm91dGVyIiwicmVzdCIsImFwcGx5IiwiZGF0YSIsImFjdGlvbiIsImJpbmQiLCJlciIsImRlYnVnIiwiY29uc29sZSIsInRleHQiLCJyZXBsYWNlIiwiaW5uZXJIVE1MIiwidHlwZSIsImV4cGlyZSIsImZpcnN0SW5pdCIsImV2ZW50IiwiX2ZpcnN0X3N0YXJ0IiwidG9wIiwiYmFzZSIsInNldFRpbWVvdXQiLCJhbmltYXRpb24iLCJub2RlIiwiaHRtbCIsImFkZENzcyIsInJlbW92ZUNzcyIsInVybFN0cmluZyIsInRlbXBsYXRlIiwidWlkIiwiSGFzaFJvdXRlciIsIl9kZXRlY3RQcmVmaXgiLCJvbnBvcHN0YXRlIiwicm91dGVzIiwiY29tcGFyZSIsImhpc3RvcnkiLCJwdXNoU3RhdGUiLCJwcmVmaXgiLCJzdWZpeCIsIl9nZXRSYXciLCJyb3V0ZXJQcmVmaXgiLCJsb2NhdGlvbiIsImhyZWYiLCJpc1BhdGNoZWQiLCJwYXRjaCIsInciLCJ3aW4iLCJwcm9taXNlIiwiZnJlZXplIiwic29tZSIsIiRmcmVlemUiLCJyZXNpemUiLCJiYXNlQWRkIiwiYmFzZWxheW91dCIsImFkZFZpZXciLCJiYXNlUmVtb3ZlIiwicmVtb3ZlVmlldyIsImp2aWV3Iiwic3VicyIsImFyZ3VtZW50cyIsImxheW91dCIsInByb3RvVUkiLCIkaW5pdCIsIiRhcHAiLCIkcmVhZHkiLCJvcmlnaW4iLCJwcm94eSIsIkpldEFwcCIsInJlcXVpcmUiLCJTdG9yZVJvdXRlciIsInN0b3JhZ2UiLCJzZXNzaW9uIiwic3RvcmVOYW1lIiwicHV0IiwiVXJsUm91dGVyIiwicGF0aG5hbWUiLCJzZWFyY2giLCJFbXB0eVJvdXRlciIsIl8kY29uZmlnIiwiVW5sb2FkR3VhcmQiLCJoYXMiLCJzdG9yZSIsIk9iamVjdCIsImhhc093blByb3BlcnR5IiwiY2FsbCIsImZvckVhY2giLCJjb250ZXh0IiwidHJpbSIsIndhcm4iLCJ4IiwiU3RyaW5nIiwiZGVsaW1pdGVyIiwicnVzc2lhblBsdXJhbEdyb3VwcyIsImVuZCIsInBsdXJhbFR5cGVzIiwiYXJhYmljIiwibGFzdFR3byIsImJvc25pYW5fc2VyYmlhbiIsImNoaW5lc2UiLCJjcm9hdGlhbiIsImZyZW5jaCIsImdlcm1hbiIsInJ1c3NpYW4iLCJsaXRodWFuaWFuIiwiY3plY2giLCJwb2xpc2giLCJpY2VsYW5kaWMiLCJzbG92ZW5pYW4iLCJwbHVyYWxUeXBlVG9MYW5ndWFnZXMiLCJsYW5nVG9UeXBlTWFwIiwibWFwcGluZyIsInJldCIsImxhbmdzIiwibGFuZyIsInBsdXJhbFR5cGVOYW1lIiwibG9jYWxlIiwibGFuZ1RvUGx1cmFsVHlwZSIsImVuIiwicGx1cmFsVHlwZUluZGV4IiwiY291bnQiLCJlc2NhcGUiLCJ0b2tlbiIsImNvbnN0cnVjdFRva2VuUmVnZXgiLCJvcHRzIiwic3VmZml4IiwiUmFuZ2VFcnJvciIsImRvbGxhclJlZ2V4IiwiZG9sbGFyQmlsbHNZYWxsIiwiZGVmYXVsdFRva2VuUmVnZXgiLCJ0cmFuc2Zvcm1QaHJhc2UiLCJwaHJhc2UiLCJzdWJzdGl0dXRpb25zIiwidG9rZW5SZWdleCIsIlR5cGVFcnJvciIsImludGVycG9sYXRpb25SZWdleCIsIm9wdGlvbnMiLCJzbWFydF9jb3VudCIsInRleHRzIiwiZXhwcmVzc2lvbiIsImFyZ3VtZW50IiwiUG9seWdsb3QiLCJwaHJhc2VzIiwiY3VycmVudExvY2FsZSIsImFsbG93TWlzc2luZyIsIm9uTWlzc2luZ0tleSIsImludGVycG9sYXRpb24iLCJuZXdMb2NhbGUiLCJtb3JlUGhyYXNlcyIsInByZWZpeGVkS2V5IiwidW5zZXQiLCJjbGVhciIsIm5ld1BocmFzZXMiLCJ0IiwiXyIsInRyYW5zZm9ybSIsIndlYml4UG9seWdsb3QiLCJMb2NhbGUiLCJfdmlldyIsInNldExhbmdEYXRhIiwicGNvbmZpZyIsInBvbHlnbG90IiwicG9seSIsInNlcnZpY2UiLCJsb2NOYW1lIiwiaTE4biIsInNldExvY2FsZSIsImdldExhbmciLCJzZXRMYW5nIiwidXJscyIsIk1lbnUiLCJnZXRWYWx1ZSIsInNldFZhbHVlIiwiZ2V0U2VsZWN0ZWRJZCIsInNlbGVjdCIsImV4aXN0cyIsImJhc2VpY29ucyIsImdvb2QiLCJzYXZpbmciLCJiYXNldGV4dCIsIlN0YXR1cyIsInN0YXR1cyIsImlzZXJyb3IiLCJleHBpcmVEZWxheSIsImljb25zIiwiY29udGVudCIsImFyZWEiLCJzZXRIVE1MIiwic3VjY2VzcyIsInNldFN0YXR1cyIsImZhaWwiLCJnZXRTdGF0dXMiLCJoaWRlU3RhdHVzIiwibW9kZSIsInJlc3BvbnNlVGV4dCIsInRyYWNrIiwiZHAiLCJfaWQiLCJfb2JqIiwicmVtb3RlIiwiYWpheCIsIl9tb2RlIiwiX3VybCIsIl9yZXF1ZXN0IiwiX2hlYWRlcnMiLCJfZmlsZXMiLCJUaGVtZSIsInRoZW1lIiwiZ2V0VGhlbWUiLCJzZXRUaGVtZSIsImxpbmtzIiwiZ2V0RWxlbWVudHNCeVRhZ05hbWUiLCJsbmFtZSIsImRpc2FibGVkIiwic2tpbiIsImNvcHlQYXJhbXMiLCJVcmxQYXJhbSIsIm9zIiwib2ciLCJ2YWwiLCJVc2VyIiwibG9naW4iLCJsb2dvdXQiLCJhZnRlckxvZ2luIiwiYWZ0ZXJMb2dvdXQiLCJwaW5nIiwibW9kZWwiLCJ1c2VyIiwiZ2V0VXNlciIsInNlcnZlciIsInBhc3MiLCJjYW5OYXZpZ2F0ZSIsIl8kcm9vdCIsInB1YmxpYyIsInNldEludGVydmFsIiwicGx1Z2lucyIsImVycm9ycyIsIlNUQVRVU19JTlNUQUxMRUQiLCJFeHRlcm5hbFZpZXciLCJ0YXJnZXRVcmwiLCJyZXF1aXJlZFBhY2thZ2VzIiwic2VsZiIsImlmcmFtZSIsIm9uQWZ0ZXJMb2FkIiwiaGlkZVByb2dyZXNzIiwiZW5hYmxlIiwicm93cyIsImhpZGRlbiIsImNvbHMiLCJhdXRvaGVpZ2h0IiwiY3NzIiwiaGVpZ2h0IiwiY2xpY2siLCJpbnN0YWxsUmVxdWlyZWRQYWNrYWdlcyIsInByb21pc2VzIiwidmFsdWVzIiwicGFja2FnZXNUb0luc3RhbGwiLCJtYXAiLCJwYWNrYWdlcyIsImFkZCIsImluc3RhbGxCdXR0b24iLCJkaXNhYmxlIiwicmVsb2FkIiwic2hvd0lmcmFtZSIsImV4dGVybmFsSWZyYW1lIiwic2hvd1Byb2dyZXNzIiwibG9hZCIsIlByb2dyZXNzQmFyIiwicGFja2FnZU5hbWVzIiwia2V5cyIsInJlcXVpcmVkUGFja2FnZXNEaXYiLCJpbnN0YWxsUGFja2FnZUNvbnRhaW5lciIsInBhY2thZ2VTdGF0ZXMiLCJqc29uIiwicGFja2FnZU5hbWVzVG9JbnN0YWxsIiwiaGlkZSIsIm5hbWVzIiwiaGVhZGVycyIsIlNlcnZpY2UiLCJiYXNlVXJsIiwiam9pblVybCIsImFyZ3MiLCJ0b0xvd2VyQ2FzZSIsInBvc3QiLCJWYWx1ZUVycm9yIiwiZ2V0Q2FsbCIsInBvc3RDYWxsIiwiRXJyb3JWaWV3Iiwic2Nyb2xsIiwiaGVhZCIsIm1vZGFsIiwid2lkdGgiLCJpbm5lcldpZHRoIiwiaW5uZXJIZWlnaHQiLCJwb3NpdGlvbiIsImdldFRvcFBhcmVudFZpZXciLCJzaG93RXJyb3IiLCJhbnNpVXAiLCJhbnNpX3RvX2h0bWwiLCJnZXRIZWFkIiwiZGF0ZUZvcm1hdCIsIndlYml4RGF0ZUZvcm1hdHRlciIsImRhdGVUb1N0ciIsImRhdGVGb3JtYXR0ZXIiLCJwYXJzZUludCIsIkJBU0VfVVJMIiwiSGVhbHRoU2VydmljZSIsImdldERpc2tTcGFjZSIsImdldEhlYWx0aCIsImdldElkZW50aXR5IiwiZ2V0TmV0d29ya0luZm8iLCJnZXRKc3hWZXJzaW9uIiwiZ2V0UnVubmluZ1Byb2Nlc3NlcyIsImdldFJ1bm5pbmdQb3J0cyIsImtpbGxQcm9jZXNzZXNCeVBpZCIsInBpZHMiLCJraWxsUHJvY2Vzc2VzQnlQb3J0IiwicG9ydHMiLCJnZXRQcm9jZXNzRGV0YWlscyIsInBpZCIsImhlYWx0aCIsIkFuc2lVcCIsIk1BWF9NU0dfTEVOIiwiTEVWRUxTIiwiU1RBVEVTIiwiVFlQRVMiLCJBZG1pblNlcnZpY2UiLCJsaXN0IiwiZGVsZXRlIiwiZ2V0X2V4cGxvcmVyIiwic2V0X2V4cGxvcmVyIiwiZXhwbG9yZXJfdHlwZSIsImFkbWluIiwiQWxlcnRzVmlldyIsInJlc2l6ZUNvbHVtbiIsIm11bHRpc2VsZWN0IiwiY29sdW1ucyIsImhlYWRlciIsInNvcnQiLCJhdXRvd2lkdGgiLCJmb3JtYXQiLCJjcmVhdGVGaWx0ZXJPcHRpb25zIiwiZmlsbHNwYWNlIiwiYXV0b0NvbmZpZyIsInNjaGVtZSIsImRlbGV0ZUl0ZW0iLCJvYmplY3RzIiwiaXRlbXMiLCJpZHMiLCJpbmRleGVzIiwiaXRlbSIsInRhYmxlIiwiZ2V0SXRlbSIsInRpdGxlIiwib2siLCJjYW5jZWwiLCJpZGVudGlmaWVycyIsImlkZW50aWZpZXIiLCJhbGVydHMiLCJyZW1vdmUiLCJ2aWV3SXRlbSIsImFsZXJ0VmlldyIsInNob3dGb3IiLCJBbGVydFZpZXciLCJjbGVhckFsbCIsImF0dGFjaFRvIiwiQ2FwYWNpdHlWaWV3IiwiZXhwbG9yZXIiLCJzdGFydHNXaXRoIiwiQ2lyY2xlc1ZpZXciLCJncmlkIiwib25Db250ZXh0IiwiZXJyb3JWaWV3IiwibWVudSIsImNpcmNsZVRhYmxlIiwiaW5mbyIsIkpTT04iLCJ1c2VybmFtZSIsInRhaWdhIiwidXNlckNpcmNsZXMiLCJjaXJjbGVzIiwiQ2lyY2xlc3Rvcmllc1ZpZXciLCJzdG9yaWVzVGFibGUiLCJ1c2VyU3RvcmllcyIsInN0b3JpZXMiLCJDaXJjbGVzVGFza3NWaWV3IiwidGFza3NUYWJsZSIsInVzZXJUYXNrcyIsInRhc2tzIiwiQ09ERV9VUkwiLCJSRVFVSVJFRF9QQUNLQUdFUyIsIkNvZGVzZXJ2ZXJWaWV3IiwiVG9wVmlldyIsInJlc3BvbnNpdmUiLCJVTktOT1dOX1NUQVRVUyIsIkRlcGxveWVkU29sdXRpb25zVmlldyIsInNvbHV0aW9uTmFtZSIsInJlc3ZJZCIsInJlc2VydmF0aW9uIiwic29sdXRpb25UeXBlIiwibmV4dEFjdGlvbiIsIm5leHRfYWN0aW9uIiwic2hvd092ZXJsYXkiLCJoaWRlT3ZlcmxheSIsImhhbmRsZVJlc3VsdCIsImNhbGxiYWNrIiwic29sdXRpb25zVGFibGUiLCJzb2x1dGlvbkl0ZW0iLCJzb2x1dGlvbiIsIkZ1bmN0aW9uIiwiZGVsZXRlU29sdXRpb24iLCJpdGVtSWQiLCJzb2x1dGlvbnMiLCJsb2FkU29sdXRpb25zIiwiZm9ybV9pbmZvIiwicmVzZXJ2YXRpb25WaWV3IiwiUmVzZXJ2YXRpb25WaWV3IiwiY2hlY2tBY3Rpb24iLCJzZWxlY3RlZEl0ZW1JZCIsIiR2aWV3IiwibG9jYXRlIiwicm93IiwiYWN0aW9ucyIsInByZXZlbnRFdmVudCIsIlVSTCIsIkZhcm1tYW5hZ2VtZW50VmlldyIsIkp1cHl0ZXJWaWV3IiwiTG9nc1ZpZXciLCJwbGFjZWhvbGRlciIsImFsaWduIiwib25DaGFuZ2UiLCJhcHBOYW1lIiwiaW5wdXRXaWR0aCIsImRlbGV0ZV9hbGwiLCJBcHBMb2dzVmlldyIsImFwcHNDb21ibyIsImxvZ3MiLCJsaXN0QXBwcyIsImRlZmluZSIsImFwcG5hbWUiLCJsb2dJZCIsImxvZ2lkIiwiYXBwTG9ncyIsImRlbGV0ZVNlbGVjdGVkIiwiZGVsZXRlQWxsIiwiUEFDS0FHRV9TVEFURVMiLCJQYWNrYWdlc1ZpZXciLCJpbnB1dEFsaWduIiwic291cmNlX25hbWUiLCJzb3VyY2UiLCJhdXRob3IiLCJ0aHJlZWJvdCIsInBhY2thZ2VUYWJsZSIsInBhY2thZ2VJdGVtIiwicGFja2FnZSIsImFkZFBhY2thZ2UiLCJnaXRVcmwiLCJ1cGRhdGVJdGVtIiwiZGVsZXRlUGFja2FnZSIsInBhY2thZ2VOYW1lIiwic3RhcnRQYWNrYWdlIiwic3RvcFBhY2thZ2UiLCJzdG9wIiwiZW5hYmxlUGFja2FnZSIsImRpc2FibGVQYWNrYWdlIiwibG9hZFBhY2thZ2VzIiwicGFja2FnZURldGFpbHNWaWV3IiwiUGFja2FnZURldGFpbHNWaWV3IiwiX3JlcXVpcmVkcGFja2FnZXMiLCJwYWNha2dlTG9jYXRpb24iLCJhbGVydCIsInBhY2thZ2VNZXRob2QiLCJpbmNsdWRlcyIsImxvZyIsInBhY2thZ2VEYXRhIiwic3RyaW5naWZ5Iiwic2hvd1BhY2thZ2VEZXRhaWxzIiwiU2V0dGluZ3NWaWV3IiwiY2VsbHMiLCJHZW5lcmFsVmlldyIsIkFkbWluc1ZpZXciLCJXYWxsZXRNYW5hZ2VyVmlldyIsIndhbGxldHMiLCJXYWxsZXRGb3JtVmlldyIsInNob3dGb3JtIiwiV2FsbGV0SW1wb3J0VmlldyIsIndhbGxldHNfdGFibGUiLCJXYWxsZXREZXRhaWxzVmlldyIsImdldFNlbGVjdGVkSXRlbSIsIndhbGxldCIsIm1hbmFnZVdhbGxldCIsImFkZHJlc3MiLCJzZWNyZXQiLCJiYWxhbmNlcyIsInNob3dJbmZvIiwiZ2V0V2FsbGV0cyIsIldhbGxldFNlcnZpY2UiLCJjcmVhdGVXYWxsZXQiLCJ1cGRhdGVUcnVzdExpbmVzIiwiaW1wb3J0V2FsbGV0IiwibmV0d29yayIsIldpa2lzVmlldyIsIm9uQ2xpY2siLCJidG5fdmlldyIsImV2IiwiZWxlbWVudHNDb25maWciLCJsYWJlbFdpZHRoIiwiZWxlbWVudHMiLCJsYWJlbCIsInJlYWRvbmx5IiwidGFiIiwibXVsdGl2aWV3IiwiZm9ybSIsInRiVmlld3MiLCJ0YlRhYnMiLCJsb2dEYXRhIiwiYXBwX25hbWUiLCJsYXRlc3RfbG9naWQiLCJhZGRUcmFjZWJhY2siLCJ0YiIsInRiSWQiLCJ0aHJlZWJvdF9uYW1lIiwicHJvY2Vzc19pZCIsInRiVGl0bGUiLCJmb3JtYXR0ZWQiLCJhZGRPcHRpb24iLCJjbGVhclRyYWNlQmFja3MiLCJyZW1vdmVPcHRpb24iLCJhc3NpZ24iLCJhbGVydF90eXBlIiwibGV2ZWwiLCJ0aW1lX2ZpcnN0IiwidGltZV9sYXN0Iiwic2V0VmFsdWVzIiwidHJhY2ViYWNrcyIsIlRhaWdhU2VydmljZSIsIm91dHB1dF90eXBlIiwiUHJvY2Vzc0RldGFpbHNWaWV3Iiwic2hvd1Byb2Nlc3NEZXRhaWxzIiwib25BZnRlclJlbmRlciIsIndvcmtsb2FkcyIsInNlbGVjdG9yIiwicXVlcnlTZWxlY3RvciIsInN0eWxlIiwiZGlzcGxheSIsIm5ldHdvcmtfbmFtZSIsImlwX3JhbmdlIiwiaXByYW5nZSIsImZhcm1lcl90aWQiLCJub2RlX2lkIiwiZmxpc3QiLCJlbnRyeXBvaW50IiwiaHViX3VybCIsImludGVyYWN0aXZlIiwibWFzdGVyX2lwc19zdHIiLCJtYXN0ZXJfaXBzIiwicmVzZXJ2YXRpb25fdmlldyIsImN1c3RvbWVyX3RpZCIsInJlc3VsdHMiLCJleHBpcmF0aW9uIiwiZGF0YV9yZXNlcnZhdGlvbiIsImV4cGlyYXRpb25fcmVzZXJ2YXRpb24iLCJjb250YWluZXJzIiwidm9sdW1lcyIsInpkYnMiLCJuZXR3b3JrcyIsImt1YmVybmV0ZXMiLCJmb3JtX2xpc3QiLCJmb3JtX2tleXMiLCJmb3JtX3ZhbHVlcyIsImZvcm1fZGljdCIsInBhZ2VyIiwiZ3JvdXAiLCJhcHBsb2dzIiwibWFya1NvcnRpbmciLCJKb2JEZXRhaWxzVmlldyIsInNob3dKb2JEZXRhaWxzIiwiam9iRGF0YSIsIldvcmtlckRldGFpbHNWaWV3Iiwic2hvd1dvcmtlckRldGFpbHMiLCJhZGRBZG1pbiIsImRlbGV0ZV9hZG1pbiIsImRlbGV0ZUFkbWluIiwiaW5wdXREaWFsb2ciLCJpbnB1dCIsInlDb3VudCIsImRvQWN0aW9uIiwibXNnIiwiZXhwbG9yZXJMaXN0IiwiZXhwbG9yZXJBZGRyZXNzIiwibmV3VmFsdWUiLCJ3YWxsZXRfbmFtZSIsImdldFZhbHVlcyIsInNob3dTZWNyZXQiLCJzZWNyZXRfYnRuIiwid2FsbGV0SW5mbyIsImJhbGFuY2UiLCJhc3NldF9jb2RlIiwiUGFja2FnZXNTZXJ2aWNlIiwiZ2l0X3VybCIsIkRpc2tTcGFjZVZpZXciLCJkaXNrU3BhY2UiLCJkaXNrSW5mbyIsInVzZWQiLCJmcmVlIiwidG90YWwiLCJwZXJjZW50IiwiaGVhbHRoSW5mb1ZpZXciLCJoZWFsdGhJbmZvIiwiYmNkYiIsIndpa2lzIiwiY29kZXNlcnZlciIsImp1cHl0ZXIiLCJKU1hJbmZvVmlldyIsImJvdEluZm8iLCJib3RpbmZvIiwiaWRlbnRpdHkiLCJnZXRfaWRlbnRpdHkiLCJ0aWQiLCJpcCIsImlwNiIsImNvbG9yc0RhdGFzZXQiLCJjb2xvciIsIlByb2Nlc3Nlc1ZpZXciLCJwcm9jZXNzZXNJbmZvIiwicGllSW5uZXJUZXh0IiwicHJvY2Vzc2VzTGlzdCIsInJ1blByb2Nlc3NJbmZvIiwiY2hhcnRzRGF0YSIsInByb2Nlc3Nlc19saXN0IiwibWVtb3J5VXNhZ2UiLCJtZW1vcnlfdXNhZ2UiLCJ0b3RhbE1lbW9yeSIsInRvdGFsX21lbSIsInVzYWdlX3BlcmNlbnQiLCJ0ZW1wIiwiTWF0aCIsImNlaWwiLCJyc3MiLCJwcm9jZXNzZXNMaXN0VmlldyIsImtpbGxQcm9jZXNzIiwicHJvY2Vzc1RhYmxlIiwicHJvY2Vzc0RldGFpbHNWaWV3IiwicnVubmluZ1BvcnRzVmlldyIsInBvcnRzVGFibGUiLCJwb3J0X251bWJlciIsImljb24iLCJoaWRlTWVudSIsInRvb2x0aXAiLCJib3JkZXJsZXNzIiwic2lkZWJhckRhdGEiLCJzeW5jIiwiaGFzX2Zyb250ZW5kX2FyZ3MiLCJwIiwiZnJvbnRlbmRfYXJncyIsInNpZGViYXIiLCJ0b29sYmFyIiwicGFkZGluZyIsInNob3dNZW51IiwiYnV0dG9uSGlkZU1lbnUiLCJidXR0b25TaG93TWVudSIsIm15am9icyIsIndvcmtlcnMiLCJ0ZmdyaWRzZGsiLCJ0aHJlZWZvbGQiLCJ1YnVudHUiLCJtaW5pbyIsIms4c19jbHVzdGVyIiwiZG9tYWluX2RlbGVnYXRpb24iLCJnYXRld2F5XzR0bzYiLCJzb2x1dGlvbl9leHBvc2UiLCJ1c2VyTWVudSIsImF1dGgiLCJ1c2VybmFtZUxhYmVsIiwiZ2V0Q3VycmVudFVzZXIiLCJkZXZtb2RlIiwiZ2V0VGV4dFNpemUiLCJlbWFpbCIsIkpvYnNWaWV3Iiwiam9iRGV0YWlsc1ZpZXciLCJqb2JUYWJsZSIsImxpc3RKb2JzIiwiTXlqb2JzU2VydmljZSIsImxpc3RXb3JrZXJzIiwid29ya2VyRGV0YWlsc1ZpZXciLCJ3b3JrZXJUYWJsZSIsIldvcmtlckRhdGEiLCJDaGF0Zmxvd1ZpZXciLCJiYXNlR2l0VXJsIiwicGFja2FnZVVybCIsImNoYXQiLCJURkdyaWRTREtXaWtpIiwiVGhyZWVmb2xkV2lraSIsIldpa2lFeHRlcm5hbFZpZXciLCJJbnZlbnRvcnlBcHAiLCJBUFBOQU1FIiwiVkVSU0lPTiIsIlBST0RVQ1RJT04iLCJmYWN0b3J5IiwiZXhwb3J0cyIsIm5vZGVOYW1lIiwiZXhwIiwiX19tYWtlVGVtcGxhdGVPYmplY3QiLCJjb29rZWQiLCJyYXciLCJkZWZpbmVQcm9wZXJ0eSIsIlBhY2tldEtpbmQiLCJzZXR1cF9wYWxldHRlcyIsIl91c2VfY2xhc3NlcyIsIl9lc2NhcGVfZm9yX2h0bWwiLCJib2xkIiwiZmciLCJiZyIsIl9idWZmZXIiLCJfdXJsX3doaXRlbGlzdCIsImFyZyIsImVudW1lcmFibGUiLCJjb25maWd1cmFibGUiLCJfdGhpcyIsImFuc2lfY29sb3JzIiwicmdiIiwiY2xhc3NfbmFtZSIsInBhbGV0dGVfMjU2IiwicGFsZXR0ZSIsInJlYyIsImxldmVscyIsInIiLCJnIiwiYiIsImNvbCIsImdyZXlfbGV2ZWwiLCJncnkiLCJlc2NhcGVfdHh0X2Zvcl9odG1sIiwidHh0IiwiYXBwZW5kX2J1ZmZlciIsImdldF9uZXh0X3BhY2tldCIsInBrdCIsImtpbmQiLCJFT1MiLCJsZW4iLCJUZXh0IiwiSW5jb21wbGV0ZSIsIm5leHRfY2hhciIsImNoYXJBdCIsIkVTQyIsIl9jc2lfcmVnZXgiLCJyZ3giLCJtYXRjaCIsIlVua25vd24iLCJTR1IiLCJycG9zIiwiX29zY19zdCIsInJneEciLCJsYXN0SW5kZXgiLCJtYXRjaF8xIiwiZXhlYyIsIm1hdGNoXzIiLCJfb3NjX3JlZ2V4IiwiT1NDVVJMIiwiYmxvY2tzIiwicGFja2V0IiwidHJhbnNmb3JtX3RvX2h0bWwiLCJ3aXRoX3N0YXRlIiwicHJvY2Vzc19hbnNpIiwicHJvY2Vzc19oeXBlcmxpbmsiLCJzZ3JfY21kcyIsInNncl9jbWRfc3RyIiwibnVtIiwiaXNOYU4iLCJpc19mb3JlZ3JvdW5kIiwibW9kZV9jbWQiLCJwYWxldHRlX2luZGV4IiwiYyIsImZyYWdtZW50Iiwic3R5bGVzIiwiY2xhc3NlcyIsImNsYXNzX3N0cmluZyIsInN0eWxlX3N0cmluZyIsInRtcGxPYmoiLCJzdWJzdCIsIl9pIiwicmVnZXhUZXh0Iiwid3NyZ3giLCJ0eHQyIiwiQWxlcnRzU2VydmljZSIsIklkZW50aXR5U2VydmljZSIsIlNvbHV0aW9uc1NlcnZpY2UiLCJzb2x1dGlvbl90eXBlIiwic29sdXRpb25fbmFtZSIsIkxvZ3NTZXJ2aWNlIiwiaWRfZnJvbSIsIkF1dGhTZXJ2aWNlIiwibmV4dFVybCIsImhhc2giLCJidXR0b25MYWJlbCIsImhhbmRsZUlucHV0IiwiZ2V0Rm9ybVZpZXciLCJ0ZXh0SW5wdXQiLCJVSU1hbmFnZXIiLCJzZXRGb2N1cyIsIldpa2lzU2VydmljZSJdLCJtYXBwaW5ncyI6Ijs7UUFBQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTs7O1FBR0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0EsS0FBSztRQUNMO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0EsMkJBQTJCLDBCQUEwQixFQUFFO1FBQ3ZELGlDQUFpQyxlQUFlO1FBQ2hEO1FBQ0E7UUFDQTs7UUFFQTtRQUNBLHNEQUFzRCwrREFBK0Q7O1FBRXJIO1FBQ0E7O1FBRUE7UUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztJQzdETUEsaUI7Ozs7SUFFQUMsTztBQUNGLHFCQUFZQyxLQUFaLEVBQW1CO0FBQUE7O0FBQ2YsYUFBS0MsUUFBTCxHQUFnQixJQUFoQjtBQUNBLGFBQUtELEtBQUwsR0FBYUEsS0FBYjtBQUNBLGFBQUtFLE9BQUwsR0FBZSxFQUFmO0FBQ0EsYUFBS0MsS0FBTCxHQUFhLEVBQWI7QUFDQSxhQUFLQyxLQUFMLEdBQWEsRUFBYjtBQUNIOztzQkFDREMsTyxzQkFBVTtBQUNOLGVBQU8sS0FBS0MsS0FBWjtBQUNILEs7O3NCQUNEQyxVLHlCQUFhO0FBQ1QsYUFBS0MsYUFBTDtBQUNBLGFBQUtDLFlBQUw7QUFDQSxhQUFLUCxPQUFMLEdBQWUsS0FBS1EsVUFBTCxHQUFrQixLQUFLQyxHQUFMLEdBQVcsS0FBS0MsT0FBTCxHQUFlLEtBQUtOLEtBQUwsR0FBYSxJQUF4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QUFDQSx1QiIsImZpbGUiOiJhcHAuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHtcbiBcdFx0XHRcdGNvbmZpZ3VyYWJsZTogZmFsc2UsXG4gXHRcdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuIFx0XHRcdFx0Z2V0OiBnZXR0ZXJcbiBcdFx0XHR9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCIvY29kZWJhc2UvXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gNTYpO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHdlYnBhY2svYm9vdHN0cmFwIGZiMjZjZmFiNzg1ODRiMGYyOTA2IiwiY2xhc3MgTmF2aWdhdGlvbkJsb2NrZWQgeyB9XG5cbmNsYXNzIEpldEJhc2Uge1xyXG4gICAgY29uc3RydWN0b3Iod2ViaXgpIHtcclxuICAgICAgICB0aGlzLndlYml4SmV0ID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLndlYml4ID0gd2ViaXg7XHJcbiAgICAgICAgdGhpcy5fZXZlbnRzID0gW107XHJcbiAgICAgICAgdGhpcy5fc3VicyA9IHt9O1xyXG4gICAgICAgIHRoaXMuX2RhdGEgPSB7fTtcclxuICAgIH1cclxuICAgIGdldFJvb3QoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX3Jvb3Q7XHJcbiAgICB9XHJcbiAgICBkZXN0cnVjdG9yKCkge1xyXG4gICAgICAgIHRoaXMuX2RldGFjaEV2ZW50cygpO1xyXG4gICAgICAgIHRoaXMuX2Rlc3Ryb3lTdWJzKCk7XHJcbiAgICAgICAgdGhpcy5fZXZlbnRzID0gdGhpcy5fY29udGFpbmVyID0gdGhpcy5hcHAgPSB0aGlzLl9wYXJlbnQgPSB0aGlzLl9yb290ID0gbnVsbDtcclxuICAgIH1cclxuICAgIHNldFBhcmFtKGlkLCB2YWx1ZSwgdXJsKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuX2RhdGFbaWRdICE9PSB2YWx1ZSkge1xyXG4gICAgICAgICAgICB0aGlzLl9kYXRhW2lkXSA9IHZhbHVlO1xyXG4gICAgICAgICAgICB0aGlzLl9zZWdtZW50LnVwZGF0ZShpZCwgdmFsdWUsIDApO1xyXG4gICAgICAgICAgICBpZiAodXJsKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5zaG93KG51bGwpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgZ2V0UGFyYW0oaWQsIHBhcmVudCkge1xyXG4gICAgICAgIGNvbnN0IHZhbHVlID0gdGhpcy5fZGF0YVtpZF07XHJcbiAgICAgICAgaWYgKHR5cGVvZiB2YWx1ZSAhPT0gXCJ1bmRlZmluZWRcIiB8fCAhcGFyZW50KSB7XHJcbiAgICAgICAgICAgIHJldHVybiB2YWx1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgY29uc3QgdmlldyA9IHRoaXMuZ2V0UGFyZW50VmlldygpO1xyXG4gICAgICAgIGlmICh2aWV3KSB7XHJcbiAgICAgICAgICAgIHJldHVybiB2aWV3LmdldFBhcmFtKGlkLCBwYXJlbnQpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGdldFVybCgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fc2VnbWVudC5zdWJ1cmwoKTtcclxuICAgIH1cclxuICAgIGdldFVybFN0cmluZygpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fc2VnbWVudC50b1N0cmluZygpO1xyXG4gICAgfVxyXG4gICAgZ2V0UGFyZW50VmlldygpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fcGFyZW50O1xyXG4gICAgfVxyXG4gICAgJCQoaWQpIHtcclxuICAgICAgICBpZiAodHlwZW9mIGlkID09PSBcInN0cmluZ1wiKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHJvb3QgPSB0aGlzLmdldFJvb3QoKTtcclxuICAgICAgICAgICAgcmV0dXJuIHJvb3QucXVlcnlWaWV3KChvYmogPT4gKG9iai5jb25maWcuaWQgPT09IGlkIHx8IG9iai5jb25maWcubG9jYWxJZCA9PT0gaWQpICYmXHJcbiAgICAgICAgICAgICAgICAob2JqLiRzY29wZSA9PT0gcm9vdC4kc2NvcGUpKSwgXCJzZWxmXCIpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgcmV0dXJuIGlkO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIG9uKG9iaiwgbmFtZSwgY29kZSkge1xyXG4gICAgICAgIGNvbnN0IGlkID0gb2JqLmF0dGFjaEV2ZW50KG5hbWUsIGNvZGUpO1xyXG4gICAgICAgIHRoaXMuX2V2ZW50cy5wdXNoKHsgb2JqLCBpZCB9KTtcclxuICAgICAgICByZXR1cm4gaWQ7XHJcbiAgICB9XHJcbiAgICBjb250YWlucyh2aWV3KSB7XHJcbiAgICAgICAgZm9yIChjb25zdCBrZXkgaW4gdGhpcy5fc3Vicykge1xyXG4gICAgICAgICAgICBjb25zdCBraWQgPSB0aGlzLl9zdWJzW2tleV0udmlldztcclxuICAgICAgICAgICAgaWYgKGtpZCA9PT0gdmlldyB8fCBraWQuY29udGFpbnModmlldykpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuICAgIGdldFN1YlZpZXcobmFtZSkge1xyXG4gICAgICAgIGNvbnN0IHN1YiA9IHRoaXMuZ2V0U3ViVmlld0luZm8obmFtZSk7XHJcbiAgICAgICAgaWYgKHN1Yikge1xyXG4gICAgICAgICAgICByZXR1cm4gc3ViLnN1YnZpZXcudmlldztcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBnZXRTdWJWaWV3SW5mbyhuYW1lKSB7XHJcbiAgICAgICAgY29uc3Qgc3ViID0gdGhpcy5fc3Vic1tuYW1lIHx8IFwiZGVmYXVsdFwiXTtcclxuICAgICAgICBpZiAoc3ViKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB7IHN1YnZpZXc6IHN1YiwgcGFyZW50OiB0aGlzIH07XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChuYW1lID09PSBcIl90b3BcIikge1xyXG4gICAgICAgICAgICB0aGlzLl9zdWJzW25hbWVdID0geyB1cmw6IFwiXCIsIGlkOiBudWxsLCBwb3B1cDogdHJ1ZSB9O1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5nZXRTdWJWaWV3SW5mbyhuYW1lKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gd2hlbiBjYWxsZWQgZnJvbSBhIGNoaWxkIHZpZXcsIHNlYXJjaGVzIGZvciBuZWFyZXN0IHBhcmVudCB3aXRoIHN1YnZpZXdcclxuICAgICAgICBpZiAodGhpcy5fcGFyZW50KSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9wYXJlbnQuZ2V0U3ViVmlld0luZm8obmFtZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgfVxyXG4gICAgX2RldGFjaEV2ZW50cygpIHtcclxuICAgICAgICBjb25zdCBldmVudHMgPSB0aGlzLl9ldmVudHM7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IGV2ZW50cy5sZW5ndGggLSAxOyBpID49IDA7IGktLSkge1xyXG4gICAgICAgICAgICBldmVudHNbaV0ub2JqLmRldGFjaEV2ZW50KGV2ZW50c1tpXS5pZCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgX2Rlc3Ryb3lTdWJzKCkge1xyXG4gICAgICAgIC8vIGRlc3Ryb3kgc3ViIHZpZXdzXHJcbiAgICAgICAgZm9yIChjb25zdCBrZXkgaW4gdGhpcy5fc3Vicykge1xyXG4gICAgICAgICAgICBjb25zdCBzdWJWaWV3ID0gdGhpcy5fc3Vic1trZXldLnZpZXc7XHJcbiAgICAgICAgICAgIC8vIGl0IHBvc3NpYmxlIHRoYXQgc3VidmlldyB3YXMgbm90IGxvYWRlZCB3aXRoIGFueSBjb250ZW50IHlldFxyXG4gICAgICAgICAgICAvLyBzbyBjaGVjayBvbiBudWxsXHJcbiAgICAgICAgICAgIGlmIChzdWJWaWV3KSB7XHJcbiAgICAgICAgICAgICAgICBzdWJWaWV3LmRlc3RydWN0b3IoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICAvLyByZXNldCB0byBwcmV2ZW50IG1lbW9yeSBsZWFrc1xyXG4gICAgICAgIHRoaXMuX3N1YnMgPSB7fTtcclxuICAgIH1cclxuICAgIF9pbml0X3VybF9kYXRhKCkge1xyXG4gICAgICAgIGNvbnN0IHVybCA9IHRoaXMuX3NlZ21lbnQuY3VycmVudCgpO1xyXG4gICAgICAgIHRoaXMuX2RhdGEgPSB7fTtcclxuICAgICAgICB0aGlzLndlYml4LmV4dGVuZCh0aGlzLl9kYXRhLCB1cmwucGFyYW1zLCB0cnVlKTtcclxuICAgIH1cclxuICAgIF9nZXREZWZhdWx0U3ViKCkge1xyXG4gICAgICAgIGlmICh0aGlzLl9zdWJzLmRlZmF1bHQpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3N1YnMuZGVmYXVsdDtcclxuICAgICAgICB9XHJcbiAgICAgICAgZm9yIChjb25zdCBrZXkgaW4gdGhpcy5fc3Vicykge1xyXG4gICAgICAgICAgICBjb25zdCBzdWIgPSB0aGlzLl9zdWJzW2tleV07XHJcbiAgICAgICAgICAgIGlmICghc3ViLmJyYW5jaCAmJiBzdWIudmlldyAmJiBrZXkgIT09IFwiX3RvcFwiKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBjaGlsZCA9IHN1Yi52aWV3Ll9nZXREZWZhdWx0U3ViKCk7XHJcbiAgICAgICAgICAgICAgICBpZiAoY2hpbGQpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gY2hpbGQ7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBfcm91dGVkX3ZpZXcoKSB7XHJcbiAgICAgICAgY29uc3QgcGFyZW50ID0gdGhpcy5nZXRQYXJlbnRWaWV3KCk7XHJcbiAgICAgICAgaWYgKCFwYXJlbnQpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNvbnN0IHN1YiA9IHBhcmVudC5fZ2V0RGVmYXVsdFN1YigpO1xyXG4gICAgICAgIGlmICghc3ViICYmIHN1YiAhPT0gdGhpcykge1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBwYXJlbnQuX3JvdXRlZF92aWV3KCk7XHJcbiAgICB9XHJcbn1cblxuZnVuY3Rpb24gcGFyc2UodXJsKSB7XHJcbiAgICAvLyByZW1vdmUgc3RhcnRpbmcgL1xyXG4gICAgaWYgKHVybFswXSA9PT0gXCIvXCIpIHtcclxuICAgICAgICB1cmwgPSB1cmwuc3Vic3RyKDEpO1xyXG4gICAgfVxyXG4gICAgLy8gc3BsaXQgdXJsIGJ5IFwiL1wiXHJcbiAgICBjb25zdCBwYXJ0cyA9IHVybC5zcGxpdChcIi9cIik7XHJcbiAgICBjb25zdCBjaHVua3MgPSBbXTtcclxuICAgIC8vIGZvciBlYWNoIHBhZ2UgaW4gdXJsXHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHBhcnRzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgY29uc3QgdGVzdCA9IHBhcnRzW2ldO1xyXG4gICAgICAgIGNvbnN0IHJlc3VsdCA9IHt9O1xyXG4gICAgICAgIC8vIGRldGVjdCBwYXJhbXNcclxuICAgICAgICAvLyBzdXBwb3J0IG9sZCBcdFx0XHRzb21lOmE9YjpjPWRcclxuICAgICAgICAvLyBhbmQgbmV3IG5vdGF0aW9uXHRcdHNvbWU/YT1iJmM9ZFxyXG4gICAgICAgIGxldCBwb3MgPSB0ZXN0LmluZGV4T2YoXCI6XCIpO1xyXG4gICAgICAgIGlmIChwb3MgPT09IC0xKSB7XHJcbiAgICAgICAgICAgIHBvcyA9IHRlc3QuaW5kZXhPZihcIj9cIik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChwb3MgIT09IC0xKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHBhcmFtcyA9IHRlc3Quc3Vic3RyKHBvcyArIDEpLnNwbGl0KC9bXFw6XFw/XFwmXS9nKTtcclxuICAgICAgICAgICAgLy8gY3JlYXRlIGhhc2ggb2YgbmFtZWQgcGFyYW1zXHJcbiAgICAgICAgICAgIGZvciAoY29uc3QgcGFyYW0gb2YgcGFyYW1zKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBkY2h1bmsgPSBwYXJhbS5zcGxpdChcIj1cIik7XHJcbiAgICAgICAgICAgICAgICByZXN1bHRbZGNodW5rWzBdXSA9IGRlY29kZVVSSUNvbXBvbmVudChkY2h1bmtbMV0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIHN0b3JlIHBhcnNlZCB2YWx1ZXNcclxuICAgICAgICBjaHVua3NbaV0gPSB7XHJcbiAgICAgICAgICAgIHBhZ2U6IChwb3MgPiAtMSA/IHRlc3Quc3Vic3RyKDAsIHBvcykgOiB0ZXN0KSxcclxuICAgICAgICAgICAgcGFyYW1zOiByZXN1bHQsXHJcbiAgICAgICAgICAgIGlzTmV3OiB0cnVlXHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuICAgIC8vIHJldHVybiBhcnJheSBvZiBwYWdlIG9iamVjdHNcclxuICAgIHJldHVybiBjaHVua3M7XHJcbn1cclxuZnVuY3Rpb24gdXJsMnN0cihzdGFjaykge1xyXG4gICAgY29uc3QgdXJsID0gW107XHJcbiAgICBmb3IgKGNvbnN0IGNodW5rIG9mIHN0YWNrKSB7XHJcbiAgICAgICAgdXJsLnB1c2goXCIvXCIgKyBjaHVuay5wYWdlKTtcclxuICAgICAgICBjb25zdCBwYXJhbXMgPSBvYmoyc3RyKGNodW5rLnBhcmFtcyk7XHJcbiAgICAgICAgaWYgKHBhcmFtcykge1xyXG4gICAgICAgICAgICB1cmwucHVzaChcIj9cIiArIHBhcmFtcyk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIHVybC5qb2luKFwiXCIpO1xyXG59XHJcbmZ1bmN0aW9uIG9iajJzdHIob2JqKSB7XHJcbiAgICBjb25zdCBzdHIgPSBbXTtcclxuICAgIGZvciAoY29uc3Qga2V5IGluIG9iaikge1xyXG4gICAgICAgIGlmIChzdHIubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgIHN0ci5wdXNoKFwiJlwiKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgc3RyLnB1c2goa2V5ICsgXCI9XCIgKyBlbmNvZGVVUklDb21wb25lbnQob2JqW2tleV0pKTtcclxuICAgIH1cclxuICAgIHJldHVybiBzdHIuam9pbihcIlwiKTtcclxufVxuXG5jbGFzcyBSb3V0ZSB7XHJcbiAgICBjb25zdHJ1Y3Rvcihyb3V0ZSwgaW5kZXgpIHtcclxuICAgICAgICB0aGlzLl9uZXh0ID0gMTtcclxuICAgICAgICBpZiAodHlwZW9mIHJvdXRlID09PSBcInN0cmluZ1wiKSB7XHJcbiAgICAgICAgICAgIHRoaXMucm91dGUgPSB7XHJcbiAgICAgICAgICAgICAgICB1cmw6IHBhcnNlKHJvdXRlKSxcclxuICAgICAgICAgICAgICAgIHBhdGg6IHJvdXRlXHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLnJvdXRlID0gcm91dGU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuaW5kZXggPSBpbmRleDtcclxuICAgIH1cclxuICAgIGN1cnJlbnQoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMucm91dGUudXJsW3RoaXMuaW5kZXhdO1xyXG4gICAgfVxyXG4gICAgbmV4dCgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5yb3V0ZS51cmxbdGhpcy5pbmRleCArIHRoaXMuX25leHRdO1xyXG4gICAgfVxyXG4gICAgc3VidXJsKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnJvdXRlLnVybC5zbGljZSh0aGlzLmluZGV4KTtcclxuICAgIH1cclxuICAgIHNoaWZ0KCkge1xyXG4gICAgICAgIHJldHVybiBuZXcgUm91dGUodGhpcy5yb3V0ZSwgdGhpcy5pbmRleCArIHRoaXMuX25leHQpO1xyXG4gICAgfVxyXG4gICAgcmVmcmVzaCgpIHtcclxuICAgICAgICBjb25zdCB1cmwgPSB0aGlzLnJvdXRlLnVybDtcclxuICAgICAgICBmb3IgKGxldCBpID0gdGhpcy5pbmRleCArIDE7IGkgPCB1cmwubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgdXJsW2ldLmlzTmV3ID0gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICB0b1N0cmluZygpIHtcclxuICAgICAgICBjb25zdCBzdHIgPSB1cmwyc3RyKHRoaXMuc3VidXJsKCkpO1xyXG4gICAgICAgIHJldHVybiBzdHIgPyBzdHIuc3Vic3RyKDEpIDogXCJcIjtcclxuICAgIH1cclxuICAgIF9qb2luKHBhdGgsIGtpZHMpIHtcclxuICAgICAgICBsZXQgdXJsID0gdGhpcy5yb3V0ZS51cmw7XHJcbiAgICAgICAgaWYgKHBhdGggPT09IG51bGwpIHsgLy8gY2hhbmdlIG9mIHBhcmFtZXRlcnMsIHJvdXRlIGVsZW1lbnRzIGFyZSBub3QgYWZmZWN0ZWRcclxuICAgICAgICAgICAgcmV0dXJuIHVybDtcclxuICAgICAgICB9XHJcbiAgICAgICAgY29uc3Qgb2xkID0gdGhpcy5yb3V0ZS51cmw7XHJcbiAgICAgICAgdXJsID0gb2xkLnNsaWNlKDAsIHRoaXMuaW5kZXggKyAoa2lkcyA/IHRoaXMuX25leHQgOiAwKSk7XHJcbiAgICAgICAgaWYgKHBhdGgpIHtcclxuICAgICAgICAgICAgdXJsID0gdXJsLmNvbmNhdChwYXJzZShwYXRoKSk7XHJcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdXJsLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAob2xkW2ldKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdXJsW2ldLnZpZXcgPSBvbGRbaV0udmlldztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmIChvbGRbaV0gJiYgdXJsW2ldLnBhZ2UgPT09IG9sZFtpXS5wYWdlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdXJsW2ldLmlzTmV3ID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHVybDtcclxuICAgIH1cclxuICAgIGFwcGVuZChwYXRoKSB7XHJcbiAgICAgICAgY29uc3QgdXJsID0gdGhpcy5fam9pbihwYXRoLCB0cnVlKTtcclxuICAgICAgICB0aGlzLnJvdXRlLnBhdGggPSB1cmwyc3RyKHVybCk7XHJcbiAgICAgICAgdGhpcy5yb3V0ZS51cmwgPSB1cmw7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMucm91dGUucGF0aDtcclxuICAgIH1cclxuICAgIHNob3cocGF0aCwgdmlldywga2lkcykge1xyXG4gICAgICAgIGNvbnN0IHVybCA9IHRoaXMuX2pvaW4ocGF0aCwga2lkcyk7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXMsIHJlaikgPT4ge1xyXG4gICAgICAgICAgICBjb25zdCByZWRpcmVjdCA9IHVybDJzdHIodXJsKTtcclxuICAgICAgICAgICAgY29uc3Qgb2JqID0ge1xyXG4gICAgICAgICAgICAgICAgdXJsLFxyXG4gICAgICAgICAgICAgICAgcmVkaXJlY3QsXHJcbiAgICAgICAgICAgICAgICBjb25maXJtOiBQcm9taXNlLnJlc29sdmUoKVxyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICBjb25zdCBhcHAgPSB2aWV3ID8gdmlldy5hcHAgOiBudWxsO1xyXG4gICAgICAgICAgICAvLyB3aGVuIGNyZWF0aW5nIGEgbmV3IHJvdXRlLCBpdCBwb3NzaWJsZSB0aGF0IGl0IHdpbGwgbm90IGhhdmUgYW55IGNvbnRlbnRcclxuICAgICAgICAgICAgLy8gZ3VhcmQgaXMgbm90IG5lY2Vzc2FyeSBpbiBzdWNoIGNhc2VcclxuICAgICAgICAgICAgaWYgKGFwcCkge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgcmVzdWx0ID0gYXBwLmNhbGxFdmVudChcImFwcDpndWFyZFwiLCBbb2JqLnJlZGlyZWN0LCB2aWV3LCBvYmpdKTtcclxuICAgICAgICAgICAgICAgIGlmICghcmVzdWx0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVqKG5ldyBOYXZpZ2F0aW9uQmxvY2tlZCgpKTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgb2JqLmNvbmZpcm0uY2F0Y2goZXJyID0+IHJlaihlcnIpKS50aGVuKCgpID0+IHtcclxuICAgICAgICAgICAgICAgIGlmIChvYmoucmVkaXJlY3QgPT09IG51bGwpIHtcclxuICAgICAgICAgICAgICAgICAgICByZWoobmV3IE5hdmlnYXRpb25CbG9ja2VkKCkpO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmIChvYmoucmVkaXJlY3QgIT09IHJlZGlyZWN0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgYXBwLnNob3cob2JqLnJlZGlyZWN0KTtcclxuICAgICAgICAgICAgICAgICAgICByZWoobmV3IE5hdmlnYXRpb25CbG9ja2VkKCkpO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHRoaXMucm91dGUucGF0aCA9IHJlZGlyZWN0O1xyXG4gICAgICAgICAgICAgICAgdGhpcy5yb3V0ZS51cmwgPSB1cmw7XHJcbiAgICAgICAgICAgICAgICByZXMoKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICBzaXplKG4pIHtcclxuICAgICAgICB0aGlzLl9uZXh0ID0gbjtcclxuICAgIH1cclxuICAgIHNwbGl0KCkge1xyXG4gICAgICAgIGNvbnN0IHJvdXRlID0ge1xyXG4gICAgICAgICAgICB1cmw6IHRoaXMucm91dGUudXJsLnNsaWNlKHRoaXMuaW5kZXggKyAxKSxcclxuICAgICAgICAgICAgcGF0aDogXCJcIlxyXG4gICAgICAgIH07XHJcbiAgICAgICAgaWYgKHJvdXRlLnVybC5sZW5ndGgpIHtcclxuICAgICAgICAgICAgcm91dGUucGF0aCA9IHVybDJzdHIocm91dGUudXJsKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIG5ldyBSb3V0ZShyb3V0ZSwgMCk7XHJcbiAgICB9XHJcbiAgICB1cGRhdGUobmFtZSwgdmFsdWUsIGluZGV4KSB7XHJcbiAgICAgICAgY29uc3QgY2h1bmsgPSB0aGlzLnJvdXRlLnVybFt0aGlzLmluZGV4ICsgKGluZGV4IHx8IDApXTtcclxuICAgICAgICBpZiAoIWNodW5rKSB7XHJcbiAgICAgICAgICAgIHRoaXMucm91dGUudXJsLnB1c2goeyBwYWdlOiBcIlwiLCBwYXJhbXM6IHt9IH0pO1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy51cGRhdGUobmFtZSwgdmFsdWUsIGluZGV4KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKG5hbWUgPT09IFwiXCIpIHtcclxuICAgICAgICAgICAgY2h1bmsucGFnZSA9IHZhbHVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgY2h1bmsucGFyYW1zW25hbWVdID0gdmFsdWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMucm91dGUucGF0aCA9IHVybDJzdHIodGhpcy5yb3V0ZS51cmwpO1xyXG4gICAgfVxyXG59XG5cbmNsYXNzIEpldFZpZXcgZXh0ZW5kcyBKZXRCYXNlIHtcclxuICAgIGNvbnN0cnVjdG9yKGFwcCwgY29uZmlnKSB7XHJcbiAgICAgICAgc3VwZXIoYXBwLndlYml4KTtcclxuICAgICAgICB0aGlzLmFwcCA9IGFwcDtcclxuICAgICAgICAvL3RoaXMuJGNvbmZpZyA9IGNvbmZpZztcclxuICAgICAgICB0aGlzLl9jaGlsZHJlbiA9IFtdO1xyXG4gICAgfVxyXG4gICAgdWkodWksIGNvbmZpZykge1xyXG4gICAgICAgIGNvbmZpZyA9IGNvbmZpZyB8fCB7fTtcclxuICAgICAgICBjb25zdCBjb250YWluZXIgPSBjb25maWcuY29udGFpbmVyIHx8IHVpLmNvbnRhaW5lcjtcclxuICAgICAgICBjb25zdCBqZXR2aWV3ID0gdGhpcy5hcHAuY3JlYXRlVmlldyh1aSk7XHJcbiAgICAgICAgdGhpcy5fY2hpbGRyZW4ucHVzaChqZXR2aWV3KTtcclxuICAgICAgICBqZXR2aWV3LnJlbmRlcihjb250YWluZXIsIHRoaXMuX3NlZ21lbnQsIHRoaXMpO1xyXG4gICAgICAgIGlmICh0eXBlb2YgdWkgIT09IFwib2JqZWN0XCIgfHwgKHVpIGluc3RhbmNlb2YgSmV0QmFzZSkpIHtcclxuICAgICAgICAgICAgLy8gcmF3IHdlYml4IFVJXHJcbiAgICAgICAgICAgIHJldHVybiBqZXR2aWV3O1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgcmV0dXJuIGpldHZpZXcuZ2V0Um9vdCgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHNob3cocGF0aCwgY29uZmlnKSB7XHJcbiAgICAgICAgY29uZmlnID0gY29uZmlnIHx8IHt9O1xyXG4gICAgICAgIC8vIGNvbnZlcnQgcGFyYW1ldGVycyBvYmplY3QgdG8gdXJsXHJcbiAgICAgICAgaWYgKHR5cGVvZiBwYXRoID09PSBcIm9iamVjdFwiKSB7XHJcbiAgICAgICAgICAgIGZvciAoY29uc3Qga2V5IGluIHBhdGgpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2V0UGFyYW0oa2V5LCBwYXRoW2tleV0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHBhdGggPSBudWxsO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgLy8gZGVsaWdhdGUgdG8gYXBwIGluIGNhc2Ugb2Ygcm9vdCBwcmVmaXhcclxuICAgICAgICAgICAgaWYgKHBhdGguc3Vic3RyKDAsIDEpID09PSBcIi9cIikge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuYXBwLnNob3cocGF0aCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgLy8gbG9jYWwgcGF0aCwgZG8gbm90aGluZ1xyXG4gICAgICAgICAgICBpZiAocGF0aC5pbmRleE9mKFwiLi9cIikgPT09IDApIHtcclxuICAgICAgICAgICAgICAgIHBhdGggPSBwYXRoLnN1YnN0cigyKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAvLyBwYXJlbnQgcGF0aCwgY2FsbCBwYXJlbnQgdmlld1xyXG4gICAgICAgICAgICBpZiAocGF0aC5pbmRleE9mKFwiLi4vXCIpID09PSAwKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBwYXJlbnQgPSB0aGlzLmdldFBhcmVudFZpZXcoKTtcclxuICAgICAgICAgICAgICAgIGlmIChwYXJlbnQpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcGFyZW50LnNob3cocGF0aC5zdWJzdHIoMyksIGNvbmZpZyk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5hcHAuc2hvdyhcIi9cIiArIHBhdGguc3Vic3RyKDMpKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjb25zdCBzdWIgPSB0aGlzLmdldFN1YlZpZXdJbmZvKGNvbmZpZy50YXJnZXQpO1xyXG4gICAgICAgICAgICBpZiAoc3ViKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoc3ViLnBhcmVudCAhPT0gdGhpcykge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBzdWIucGFyZW50LnNob3cocGF0aCwgY29uZmlnKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKGNvbmZpZy50YXJnZXQgJiYgY29uZmlnLnRhcmdldCAhPT0gXCJkZWZhdWx0XCIpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fcmVuZGVyRnJhbWVMb2NrKGNvbmZpZy50YXJnZXQsIHN1Yi5zdWJ2aWV3LCBwYXRoKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGlmIChwYXRoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuYXBwLnNob3coXCIvXCIgKyBwYXRoKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdGhpcy5fc2hvdyh0aGlzLl9zZWdtZW50LCBwYXRoLCB0aGlzKTtcclxuICAgIH1cclxuICAgIF9zaG93KHNlZ21lbnQsIHBhdGgsIHZpZXcpIHtcclxuICAgICAgICByZXR1cm4gc2VnbWVudC5zaG93KHBhdGgsIHZpZXcsIHRydWUpLnRoZW4oKCkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLl9pbml0X3VybF9kYXRhKCk7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl91cmxDaGFuZ2UoKTtcclxuICAgICAgICB9KS50aGVuKCgpID0+IHtcclxuICAgICAgICAgICAgaWYgKHNlZ21lbnQucm91dGUubGlua1JvdXRlcikge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5hcHAuZ2V0Um91dGVyKCkuc2V0KHNlZ21lbnQucm91dGUucGF0aCwgeyBzaWxlbnQ6IHRydWUgfSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmFwcC5jYWxsRXZlbnQoXCJhcHA6cm91dGVcIiwgW3NlZ21lbnQucm91dGUucGF0aF0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICBpbml0KF8kdmlldywgXyQpIHtcclxuICAgICAgICAvLyBzdHViXHJcbiAgICB9XHJcbiAgICByZWFkeShfJHZpZXcsIF8kdXJsKSB7XHJcbiAgICAgICAgLy8gc3R1YlxyXG4gICAgfVxyXG4gICAgY29uZmlnKCkge1xyXG4gICAgICAgIHRoaXMuYXBwLndlYml4Lm1lc3NhZ2UoXCJWaWV3OkNvbmZpZyBpcyBub3QgaW1wbGVtZW50ZWRcIik7XHJcbiAgICB9XHJcbiAgICB1cmxDaGFuZ2UoXyR2aWV3LCBfJHVybCkge1xyXG4gICAgICAgIC8vIHN0dWJcclxuICAgIH1cclxuICAgIGRlc3Ryb3koKSB7XHJcbiAgICAgICAgLy8gc3R1YlxyXG4gICAgfVxyXG4gICAgZGVzdHJ1Y3RvcigpIHtcclxuICAgICAgICB0aGlzLmRlc3Ryb3koKTtcclxuICAgICAgICB0aGlzLl9kZXN0cm95S2lkcygpO1xyXG4gICAgICAgIC8vIGRlc3Ryb3kgYWN0dWFsIFVJXHJcbiAgICAgICAgdGhpcy5fcm9vdC5kZXN0cnVjdG9yKCk7XHJcbiAgICAgICAgc3VwZXIuZGVzdHJ1Y3RvcigpO1xyXG4gICAgfVxyXG4gICAgdXNlKHBsdWdpbiwgY29uZmlnKSB7XHJcbiAgICAgICAgcGx1Z2luKHRoaXMuYXBwLCB0aGlzLCBjb25maWcpO1xyXG4gICAgfVxyXG4gICAgcmVmcmVzaCgpIHtcclxuICAgICAgICBjb25zdCB1cmwgPSB0aGlzLmdldFVybCgpO1xyXG4gICAgICAgIHRoaXMuZGVzdHJveSgpO1xyXG4gICAgICAgIHRoaXMuX2Rlc3Ryb3lLaWRzKCk7XHJcbiAgICAgICAgdGhpcy5fZGVzdHJveVN1YnMoKTtcclxuICAgICAgICB0aGlzLl9kZXRhY2hFdmVudHMoKTtcclxuICAgICAgICBpZiAodGhpcy5fY29udGFpbmVyLnRhZ05hbWUpIHtcclxuICAgICAgICAgICAgdGhpcy5fcm9vdC5kZXN0cnVjdG9yKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuX3NlZ21lbnQucmVmcmVzaCgpO1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9yZW5kZXIodGhpcy5fc2VnbWVudCk7XHJcbiAgICB9XHJcbiAgICByZW5kZXIocm9vdCwgdXJsLCBwYXJlbnQpIHtcclxuICAgICAgICBpZiAodHlwZW9mIHVybCA9PT0gXCJzdHJpbmdcIikge1xyXG4gICAgICAgICAgICB1cmwgPSBuZXcgUm91dGUodXJsLCAwKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5fc2VnbWVudCA9IHVybDtcclxuICAgICAgICB0aGlzLl9wYXJlbnQgPSBwYXJlbnQ7XHJcbiAgICAgICAgdGhpcy5faW5pdF91cmxfZGF0YSgpO1xyXG4gICAgICAgIHJvb3QgPSByb290IHx8IGRvY3VtZW50LmJvZHk7XHJcbiAgICAgICAgY29uc3QgX2NvbnRhaW5lciA9ICh0eXBlb2Ygcm9vdCA9PT0gXCJzdHJpbmdcIikgPyB0aGlzLndlYml4LnRvTm9kZShyb290KSA6IHJvb3Q7XHJcbiAgICAgICAgaWYgKHRoaXMuX2NvbnRhaW5lciAhPT0gX2NvbnRhaW5lcikge1xyXG4gICAgICAgICAgICB0aGlzLl9jb250YWluZXIgPSBfY29udGFpbmVyO1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fcmVuZGVyKHVybCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fdXJsQ2hhbmdlKCkudGhlbigoKSA9PiB0aGlzLmdldFJvb3QoKSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgX3JlbmRlcih1cmwpIHtcclxuICAgICAgICBjb25zdCBjb25maWcgPSB0aGlzLmNvbmZpZygpO1xyXG4gICAgICAgIGlmIChjb25maWcudGhlbikge1xyXG4gICAgICAgICAgICByZXR1cm4gY29uZmlnLnRoZW4oY2ZnID0+IHRoaXMuX3JlbmRlcl9maW5hbChjZmcsIHVybCkpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3JlbmRlcl9maW5hbChjb25maWcsIHVybCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgX3JlbmRlcl9maW5hbChjb25maWcsIHVybCkge1xyXG4gICAgICAgIC8vIGdldCBwcmV2aW91cyB2aWV3IGluIHRoZSBzYW1lIHNsb3RcclxuICAgICAgICBsZXQgc2xvdCA9IG51bGw7XHJcbiAgICAgICAgbGV0IGNvbnRhaW5lciA9IG51bGw7XHJcbiAgICAgICAgbGV0IHNob3cgPSBmYWxzZTtcclxuICAgICAgICBpZiAoIXRoaXMuX2NvbnRhaW5lci50YWdOYW1lKSB7XHJcbiAgICAgICAgICAgIHNsb3QgPSB0aGlzLl9jb250YWluZXI7XHJcbiAgICAgICAgICAgIGlmIChzbG90LnBvcHVwKSB7XHJcbiAgICAgICAgICAgICAgICBjb250YWluZXIgPSBkb2N1bWVudC5ib2R5O1xyXG4gICAgICAgICAgICAgICAgc2hvdyA9IHRydWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBjb250YWluZXIgPSB0aGlzLndlYml4LiQkKHNsb3QuaWQpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICBjb250YWluZXIgPSB0aGlzLl9jb250YWluZXI7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIHZpZXcgYWxyZWFkeSBkZXN0cm95ZWRcclxuICAgICAgICBpZiAoIXRoaXMuYXBwIHx8ICFjb250YWluZXIpIHtcclxuICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KG51bGwpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQgcmVzcG9uc2U7XHJcbiAgICAgICAgY29uc3QgY3VycmVudCA9IHRoaXMuX3NlZ21lbnQuY3VycmVudCgpO1xyXG4gICAgICAgIC8vIHVzaW5nIHdyYXBwZXIgb2JqZWN0LCBzbyB1aSBjYW4gYmUgY2hhbmdlZCBmcm9tIGFwcDpyZW5kZXIgZXZlbnRcclxuICAgICAgICBjb25zdCByZXN1bHQgPSB7IHVpOiB7fSB9O1xyXG4gICAgICAgIHRoaXMuYXBwLmNvcHlDb25maWcoY29uZmlnLCByZXN1bHQudWksIHRoaXMuX3N1YnMpO1xyXG4gICAgICAgIHRoaXMuYXBwLmNhbGxFdmVudChcImFwcDpyZW5kZXJcIiwgW3RoaXMsIHVybCwgcmVzdWx0XSk7XHJcbiAgICAgICAgcmVzdWx0LnVpLiRzY29wZSA9IHRoaXM7XHJcbiAgICAgICAgLyogZGVzdHJveSBvbGQgSFRNTCBhdHRhY2hlZCB2aWV3cyBiZWZvcmUgY3JlYXRpbmcgbmV3IG9uZSAqL1xyXG4gICAgICAgIGlmICghc2xvdCAmJiBjdXJyZW50LmlzTmV3ICYmIGN1cnJlbnQudmlldykge1xyXG4gICAgICAgICAgICBjdXJyZW50LnZpZXcuZGVzdHJ1Y3RvcigpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICAvLyBzcGVjaWFsIGhhbmRsaW5nIGZvciBhZGRpbmcgaW5zaWRlIG9mIG11bHRpdmlldyAtIHByZXNlcnZlIG9sZCBpZFxyXG4gICAgICAgICAgICBpZiAoc2xvdCAmJiAhc2hvdykge1xyXG4gICAgICAgICAgICAgICAgY29uc3Qgb2xkdWkgPSBjb250YWluZXI7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBwYXJlbnQgPSBvbGR1aS5nZXRQYXJlbnRWaWV3KCk7XHJcbiAgICAgICAgICAgICAgICBpZiAocGFyZW50ICYmIHBhcmVudC5uYW1lID09PSBcIm11bHRpdmlld1wiICYmICFyZXN1bHQudWkuaWQpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXN1bHQudWkuaWQgPSBvbGR1aS5jb25maWcuaWQ7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5fcm9vdCA9IHRoaXMuYXBwLndlYml4LnVpKHJlc3VsdC51aSwgY29udGFpbmVyKTtcclxuICAgICAgICAgICAgY29uc3QgYXNXaW4gPSB0aGlzLl9yb290O1xyXG4gICAgICAgICAgICAvLyBjaGVjayBmb3IgdXJsIGFkZGVkIHRvIGlnbm9yZSB0aGlzLnVpIGNhbGxzXHJcbiAgICAgICAgICAgIGlmIChzaG93ICYmIGFzV2luLnNldFBvc2l0aW9uICYmICFhc1dpbi5pc1Zpc2libGUoKSkge1xyXG4gICAgICAgICAgICAgICAgYXNXaW4uc2hvdygpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIC8vIGNoZWNrLCBpZiB3ZSBhcmUgcmVwbGFjaW5nIHNvbWUgb2xkZXIgdmlld1xyXG4gICAgICAgICAgICBpZiAoc2xvdCkge1xyXG4gICAgICAgICAgICAgICAgaWYgKHNsb3QudmlldyAmJiBzbG90LnZpZXcgIT09IHRoaXMgJiYgc2xvdC52aWV3ICE9PSB0aGlzLmFwcCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHNsb3Qudmlldy5kZXN0cnVjdG9yKCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBzbG90LmlkID0gdGhpcy5fcm9vdC5jb25maWcuaWQ7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5nZXRQYXJlbnRWaWV3KCkgfHwgIXRoaXMuYXBwLmFwcClcclxuICAgICAgICAgICAgICAgICAgICBzbG90LnZpZXcgPSB0aGlzO1xyXG4gICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gd2hlbiB3ZSBoYXZlIHN1YmFwcCwgc2V0IHdob2xlIGFwcCBhcyBhIHZpZXdcclxuICAgICAgICAgICAgICAgICAgICAvLyBzbyBvbiBkZXN0cnVjdGlvbiwgdGhlIHdob2xlIGFwcCB3aWxsIGJlIGRlc3Ryb3llZFxyXG4gICAgICAgICAgICAgICAgICAgIHNsb3QudmlldyA9IHRoaXMuYXBwO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChjdXJyZW50LmlzTmV3KSB7XHJcbiAgICAgICAgICAgICAgICBjdXJyZW50LnZpZXcgPSB0aGlzO1xyXG4gICAgICAgICAgICAgICAgY3VycmVudC5pc05ldyA9IGZhbHNlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJlc3BvbnNlID0gUHJvbWlzZS5yZXNvbHZlKHRoaXMuX2luaXQodGhpcy5fcm9vdCwgdXJsKSkudGhlbigoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fdXJsQ2hhbmdlKCkudGhlbigoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5faW5pdFVybCA9IG51bGw7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMucmVhZHkodGhpcy5fcm9vdCwgdXJsLnN1YnVybCgpKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgY2F0Y2ggKGUpIHtcclxuICAgICAgICAgICAgcmVzcG9uc2UgPSBQcm9taXNlLnJlamVjdChlKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHJlc3BvbnNlLmNhdGNoKGVyciA9PiB0aGlzLl9pbml0RXJyb3IodGhpcywgZXJyKSk7XHJcbiAgICB9XHJcbiAgICBfaW5pdCh2aWV3LCB1cmwpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5pbml0KHZpZXcsIHVybC5zdWJ1cmwoKSk7XHJcbiAgICB9XHJcbiAgICBfdXJsQ2hhbmdlKCkge1xyXG4gICAgICAgIHRoaXMuYXBwLmNhbGxFdmVudChcImFwcDp1cmxjaGFuZ2VcIiwgW3RoaXMsIHRoaXMuX3NlZ21lbnRdKTtcclxuICAgICAgICBjb25zdCB3YWl0cyA9IFtdO1xyXG4gICAgICAgIGZvciAoY29uc3Qga2V5IGluIHRoaXMuX3N1YnMpIHtcclxuICAgICAgICAgICAgY29uc3QgZnJhbWUgPSB0aGlzLl9zdWJzW2tleV07XHJcbiAgICAgICAgICAgIGNvbnN0IHdhaXQgPSB0aGlzLl9yZW5kZXJGcmFtZUxvY2soa2V5LCBmcmFtZSwgbnVsbCk7XHJcbiAgICAgICAgICAgIGlmICh3YWl0KSB7XHJcbiAgICAgICAgICAgICAgICB3YWl0cy5wdXNoKHdhaXQpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBQcm9taXNlLmFsbCh3YWl0cykudGhlbigoKSA9PiB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnVybENoYW5nZSh0aGlzLl9yb290LCB0aGlzLl9zZWdtZW50LnN1YnVybCgpKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuICAgIF9yZW5kZXJGcmFtZUxvY2soa2V5LCBmcmFtZSwgcGF0aCkge1xyXG4gICAgICAgIC8vIGlmIHN1YnZpZXcgaXMgbm90IG9jY3VwaWVkIGJ5IHNvbWUgcmVuZGVyaW5nIHlldFxyXG4gICAgICAgIGlmICghZnJhbWUubG9jaykge1xyXG4gICAgICAgICAgICAvLyByZXRyZWl2ZSBhbmQgc3RvcmUgcmVuZGVyaW5nIGVuZCBwcm9taXNlXHJcbiAgICAgICAgICAgIGNvbnN0IGxvY2sgPSB0aGlzLl9yZW5kZXJGcmFtZShrZXksIGZyYW1lLCBwYXRoKTtcclxuICAgICAgICAgICAgaWYgKGxvY2spIHtcclxuICAgICAgICAgICAgICAgIC8vIGNsZWFyIGxvY2sgYWZ0ZXIgZnJhbWUgcmVuZGVyaW5nXHJcbiAgICAgICAgICAgICAgICAvLyBhcyBwcm9taXNlLmZpbmFsbHkgaXMgbm90IHN1cHBvcnRlZCBieSAgV2ViaXggbGVzc2VyIHRoYW4gNi4yXHJcbiAgICAgICAgICAgICAgICAvLyB1c2luZyBhIG1vcmUgdmVyYm9zZSBub3RhdGlvblxyXG4gICAgICAgICAgICAgICAgZnJhbWUubG9jayA9IGxvY2sudGhlbigoKSA9PiBmcmFtZS5sb2NrID0gbnVsbCwgKCkgPT4gZnJhbWUubG9jayA9IG51bGwpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIHJldHVybiByZW5kZXJpbmcgZW5kIHByb21pc2VcclxuICAgICAgICByZXR1cm4gZnJhbWUubG9jaztcclxuICAgIH1cclxuICAgIF9yZW5kZXJGcmFtZShrZXksIGZyYW1lLCBwYXRoKSB7XHJcbiAgICAgICAgLy9kZWZhdWx0IHJvdXRlXHJcbiAgICAgICAgaWYgKGtleSA9PT0gXCJkZWZhdWx0XCIpIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuX3NlZ21lbnQubmV4dCgpKSB7XHJcbiAgICAgICAgICAgICAgICAvLyB3ZSBoYXZlIGEgbmV4dCBzZWdtZW50IGluIHVybCwgcmVuZGVyIGl0XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fY3JlYXRlU3ViVmlldyhmcmFtZSwgdGhpcy5fc2VnbWVudC5zaGlmdCgpKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIGlmIChmcmFtZS52aWV3ICYmIGZyYW1lLnBvcHVwKSB7XHJcbiAgICAgICAgICAgICAgICAvLyB0aGVyZSBpcyBubyBuZXh0IHNlZ21lbnQsIGRlbGV0ZSB0aGUgZXhpc3Rpbmcgc3ViLXZpZXdcclxuICAgICAgICAgICAgICAgIGZyYW1lLnZpZXcuZGVzdHJ1Y3RvcigpO1xyXG4gICAgICAgICAgICAgICAgZnJhbWUudmlldyA9IG51bGw7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgLy9pZiBuZXcgcGF0aCBwcm92aWRlZCwgc2V0IGl0IHRvIHRoZSBmcmFtZVxyXG4gICAgICAgIGlmIChwYXRoICE9PSBudWxsKSB7XHJcbiAgICAgICAgICAgIGZyYW1lLnVybCA9IHBhdGg7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIGluIGNhc2Ugb2Ygcm91dGVkIHN1Yi12aWV3XHJcbiAgICAgICAgaWYgKGZyYW1lLnJvdXRlKSB7XHJcbiAgICAgICAgICAgIC8vIHdlIGhhdmUgYSBuZXcgcGF0aCBmb3Igc3ViLXZpZXdcclxuICAgICAgICAgICAgaWYgKHBhdGggIT09IG51bGwpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBmcmFtZS5yb3V0ZS5zaG93KHBhdGgsIGZyYW1lLnZpZXcpLnRoZW4oKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl9jcmVhdGVTdWJWaWV3KGZyYW1lLCBmcmFtZS5yb3V0ZSk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAvLyBkbyBub3QgdHJpZ2dlciBvbkNoYW5nZSBmb3IgaXNvbGF0ZWQgc3ViLXZpZXdzXHJcbiAgICAgICAgICAgIGlmIChmcmFtZS5icmFuY2gpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQgdmlldyA9IGZyYW1lLnZpZXc7XHJcbiAgICAgICAgLy8gaWYgdmlldyBkb2Vzbid0IGV4aXN0cyB5ZXQsIGluaXQgaXRcclxuICAgICAgICBpZiAoIXZpZXcgJiYgZnJhbWUudXJsKSB7XHJcbiAgICAgICAgICAgIGlmICh0eXBlb2YgZnJhbWUudXJsID09PSBcInN0cmluZ1wiKSB7XHJcbiAgICAgICAgICAgICAgICAvLyBzdHJpbmcsIHNvIHdlIGhhdmUgaXNvbGF0ZWQgc3VidmlldyB1cmxcclxuICAgICAgICAgICAgICAgIGZyYW1lLnJvdXRlID0gbmV3IFJvdXRlKGZyYW1lLnVybCwgMCk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fY3JlYXRlU3ViVmlldyhmcmFtZSwgZnJhbWUucm91dGUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgLy8gb2JqZWN0LCBzbyB3ZSBoYXZlIGFuIGVtYmVkZWQgc3Vidmlld1xyXG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBmcmFtZS51cmwgPT09IFwiZnVuY3Rpb25cIiAmJiAhKHZpZXcgaW5zdGFuY2VvZiBmcmFtZS51cmwpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmlldyA9IG5ldyBmcmFtZS51cmwodGhpcy5hcHAsIFwiXCIpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYgKCF2aWV3KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmlldyA9IGZyYW1lLnVybDtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICAvLyB0cmlnZ2VyIG9uQ2hhbmdlIGZvciBhbHJlYWR5IGV4aXN0ZWQgdmlld1xyXG4gICAgICAgIGlmICh2aWV3KSB7XHJcbiAgICAgICAgICAgIHJldHVybiB2aWV3LnJlbmRlcihmcmFtZSwgKGZyYW1lLnJvdXRlIHx8IHRoaXMuX3NlZ21lbnQpLCB0aGlzKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBfaW5pdEVycm9yKHZpZXcsIGVycikge1xyXG4gICAgICAgIC8qXHJcbiAgICAgICAgICAgIGlmIHZpZXcgaXMgZGVzdHJveWVkLCBpZ25vcmUgYW55IHZpZXcgcmVsYXRlZCBlcnJvcnNcclxuICAgICAgICAqL1xyXG4gICAgICAgIGlmICh0aGlzLmFwcCkge1xyXG4gICAgICAgICAgICB0aGlzLmFwcC5lcnJvcihcImFwcDplcnJvcjppbml0dmlld1wiLCBbZXJyLCB2aWV3XSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgfVxyXG4gICAgX2NyZWF0ZVN1YlZpZXcoc3ViLCBzdWJ1cmwpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5hcHAuY3JlYXRlRnJvbVVSTChzdWJ1cmwuY3VycmVudCgpKS50aGVuKHZpZXcgPT4ge1xyXG4gICAgICAgICAgICByZXR1cm4gdmlldy5yZW5kZXIoc3ViLCBzdWJ1cmwsIHRoaXMpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgX2Rlc3Ryb3lLaWRzKCkge1xyXG4gICAgICAgIC8vIGRlc3Ryb3kgY2hpbGQgdmlld3NcclxuICAgICAgICBjb25zdCB1aXMgPSB0aGlzLl9jaGlsZHJlbjtcclxuICAgICAgICBmb3IgKGxldCBpID0gdWlzLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSB7XHJcbiAgICAgICAgICAgIGlmICh1aXNbaV0gJiYgdWlzW2ldLmRlc3RydWN0b3IpIHtcclxuICAgICAgICAgICAgICAgIHVpc1tpXS5kZXN0cnVjdG9yKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gcmVzZXQgdmFycyBmb3IgYmV0dGVyIEdDIHByb2Nlc3NpbmdcclxuICAgICAgICB0aGlzLl9jaGlsZHJlbiA9IFtdO1xyXG4gICAgfVxyXG59XG5cbi8vIHdyYXBwZXIgZm9yIHJhdyBvYmplY3RzIGFuZCBKZXQgMS54IHN0cnVjdHNcclxuY2xhc3MgSmV0Vmlld1JhdyBleHRlbmRzIEpldFZpZXcge1xyXG4gICAgY29uc3RydWN0b3IoYXBwLCBjb25maWcpIHtcclxuICAgICAgICBzdXBlcihhcHAsIGNvbmZpZyk7XHJcbiAgICAgICAgdGhpcy5fdWkgPSBjb25maWcudWk7XHJcbiAgICB9XHJcbiAgICBjb25maWcoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX3VpO1xyXG4gICAgfVxyXG59XG5cbmNsYXNzIFN1YlJvdXRlciB7XHJcbiAgICBjb25zdHJ1Y3RvcihjYiwgY29uZmlnLCBhcHApIHtcclxuICAgICAgICB0aGlzLnBhdGggPSBcIlwiO1xyXG4gICAgICAgIHRoaXMuYXBwID0gYXBwO1xyXG4gICAgfVxyXG4gICAgc2V0KHBhdGgsIGNvbmZpZykge1xyXG4gICAgICAgIHRoaXMucGF0aCA9IHBhdGg7XHJcbiAgICAgICAgY29uc3QgYSA9IHRoaXMuYXBwO1xyXG4gICAgICAgIGEuYXBwLmdldFJvdXRlcigpLnNldChhLl9zZWdtZW50LmFwcGVuZCh0aGlzLnBhdGgpLCB7IHNpbGVudDogdHJ1ZSB9KTtcclxuICAgIH1cclxuICAgIGdldCgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5wYXRoO1xyXG4gICAgfVxyXG59XG5cbmxldCBfb25jZSA9IHRydWU7XHJcbmNsYXNzIEpldEFwcEJhc2UgZXh0ZW5kcyBKZXRCYXNlIHtcclxuICAgIGNvbnN0cnVjdG9yKGNvbmZpZykge1xyXG4gICAgICAgIGNvbnN0IHdlYml4ID0gKGNvbmZpZyB8fCB7fSkud2ViaXggfHwgd2luZG93LndlYml4O1xyXG4gICAgICAgIHN1cGVyKHdlYml4KTtcclxuICAgICAgICAvLyBpbml0IGNvbmZpZ1xyXG4gICAgICAgIHRoaXMuY29uZmlnID0gdGhpcy53ZWJpeC5leHRlbmQoe1xyXG4gICAgICAgICAgICBuYW1lOiBcIkFwcFwiLFxyXG4gICAgICAgICAgICB2ZXJzaW9uOiBcIjEuMFwiLFxyXG4gICAgICAgICAgICBzdGFydDogXCIvaG9tZVwiXHJcbiAgICAgICAgfSwgY29uZmlnLCB0cnVlKTtcclxuICAgICAgICB0aGlzLmFwcCA9IHRoaXMuY29uZmlnLmFwcDtcclxuICAgICAgICB0aGlzLnJlYWR5ID0gUHJvbWlzZS5yZXNvbHZlKCk7XHJcbiAgICAgICAgdGhpcy5fc2VydmljZXMgPSB7fTtcclxuICAgICAgICB0aGlzLndlYml4LmV4dGVuZCh0aGlzLCB0aGlzLndlYml4LkV2ZW50U3lzdGVtKTtcclxuICAgIH1cclxuICAgIGdldFVybCgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fc3ViU2VnbWVudC5zdWJ1cmwoKTtcclxuICAgIH1cclxuICAgIGdldFVybFN0cmluZygpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fc3ViU2VnbWVudC50b1N0cmluZygpO1xyXG4gICAgfVxyXG4gICAgZ2V0U2VydmljZShuYW1lKSB7XHJcbiAgICAgICAgbGV0IG9iaiA9IHRoaXMuX3NlcnZpY2VzW25hbWVdO1xyXG4gICAgICAgIGlmICh0eXBlb2Ygb2JqID09PSBcImZ1bmN0aW9uXCIpIHtcclxuICAgICAgICAgICAgb2JqID0gdGhpcy5fc2VydmljZXNbbmFtZV0gPSBvYmoodGhpcyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBvYmo7XHJcbiAgICB9XHJcbiAgICBzZXRTZXJ2aWNlKG5hbWUsIGhhbmRsZXIpIHtcclxuICAgICAgICB0aGlzLl9zZXJ2aWNlc1tuYW1lXSA9IGhhbmRsZXI7XHJcbiAgICB9XHJcbiAgICBkZXN0cnVjdG9yKCkge1xyXG4gICAgICAgIHRoaXMuZ2V0U3ViVmlldygpLmRlc3RydWN0b3IoKTtcclxuICAgICAgICBzdXBlci5kZXN0cnVjdG9yKCk7XHJcbiAgICB9XHJcbiAgICAvLyBjb3B5IG9iamVjdCBhbmQgY29sbGVjdCBleHRyYSBoYW5kbGVyc1xyXG4gICAgY29weUNvbmZpZyhvYmosIHRhcmdldCwgY29uZmlnKSB7XHJcbiAgICAgICAgLy8gcmF3IHVpIGNvbmZpZ1xyXG4gICAgICAgIGlmIChvYmogaW5zdGFuY2VvZiBKZXRCYXNlIHx8XHJcbiAgICAgICAgICAgICh0eXBlb2Ygb2JqID09PSBcImZ1bmN0aW9uXCIgJiYgb2JqLnByb3RvdHlwZSBpbnN0YW5jZW9mIEpldEJhc2UpKSB7XHJcbiAgICAgICAgICAgIG9iaiA9IHsgJHN1YnZpZXc6IG9iaiB9O1xyXG4gICAgICAgIH1cclxuICAgICAgICAvLyBzdWJ2aWV3IHBsYWNlaG9sZGVyXHJcbiAgICAgICAgaWYgKHR5cGVvZiBvYmouJHN1YnZpZXcgIT0gXCJ1bmRlZmluZWRcIikge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5hZGRTdWJWaWV3KG9iaiwgdGFyZ2V0LCBjb25maWcpO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvLyBwcm9jZXNzIHN1Yi1wcm9wZXJ0aWVzXHJcbiAgICAgICAgdGFyZ2V0ID0gdGFyZ2V0IHx8IChvYmogaW5zdGFuY2VvZiBBcnJheSA/IFtdIDoge30pO1xyXG4gICAgICAgIGZvciAoY29uc3QgbWV0aG9kIGluIG9iaikge1xyXG4gICAgICAgICAgICBsZXQgcG9pbnQgPSBvYmpbbWV0aG9kXTtcclxuICAgICAgICAgICAgLy8gdmlldyBjbGFzc1xyXG4gICAgICAgICAgICBpZiAodHlwZW9mIHBvaW50ID09PSBcImZ1bmN0aW9uXCIgJiYgcG9pbnQucHJvdG90eXBlIGluc3RhbmNlb2YgSmV0QmFzZSkge1xyXG4gICAgICAgICAgICAgICAgcG9pbnQgPSB7ICRzdWJ2aWV3OiBwb2ludCB9O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChwb2ludCAmJiB0eXBlb2YgcG9pbnQgPT09IFwib2JqZWN0XCIgJiZcclxuICAgICAgICAgICAgICAgICEocG9pbnQgaW5zdGFuY2VvZiB0aGlzLndlYml4LkRhdGFDb2xsZWN0aW9uKSAmJiAhKHBvaW50IGluc3RhbmNlb2YgUmVnRXhwKSkge1xyXG4gICAgICAgICAgICAgICAgaWYgKHBvaW50IGluc3RhbmNlb2YgRGF0ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRhcmdldFttZXRob2RdID0gbmV3IERhdGUocG9pbnQpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgY29weSA9IHRoaXMuY29weUNvbmZpZyhwb2ludCwgKHBvaW50IGluc3RhbmNlb2YgQXJyYXkgPyBbXSA6IHt9KSwgY29uZmlnKTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoY29weSAhPT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0YXJnZXRbbWV0aG9kXSA9IGNvcHk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdGFyZ2V0W21ldGhvZF0gPSBwb2ludDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdGFyZ2V0O1xyXG4gICAgfVxyXG4gICAgZ2V0Um91dGVyKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLiRyb3V0ZXI7XHJcbiAgICB9XHJcbiAgICBjbGlja0hhbmRsZXIoZSwgdGFyZ2V0KSB7XHJcbiAgICAgICAgaWYgKGUpIHtcclxuICAgICAgICAgICAgdGFyZ2V0ID0gdGFyZ2V0IHx8IChlLnRhcmdldCB8fCBlLnNyY0VsZW1lbnQpO1xyXG4gICAgICAgICAgICBpZiAodGFyZ2V0ICYmIHRhcmdldC5nZXRBdHRyaWJ1dGUpIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHRyaWdnZXIgPSB0YXJnZXQuZ2V0QXR0cmlidXRlKFwidHJpZ2dlclwiKTtcclxuICAgICAgICAgICAgICAgIGlmICh0cmlnZ2VyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fZm9yVmlldyh0YXJnZXQsIHZpZXcgPT4gdmlldy5hcHAudHJpZ2dlcih0cmlnZ2VyKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgZS5jYW5jZWxCdWJibGUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBjb25zdCByb3V0ZSA9IHRhcmdldC5nZXRBdHRyaWJ1dGUoXCJyb3V0ZVwiKTtcclxuICAgICAgICAgICAgICAgIGlmIChyb3V0ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2ZvclZpZXcodGFyZ2V0LCB2aWV3ID0+IHZpZXcuc2hvdyhyb3V0ZSkpO1xyXG4gICAgICAgICAgICAgICAgICAgIGUuY2FuY2VsQnViYmxlID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNvbnN0IHBhcmVudCA9IHRhcmdldC5wYXJlbnROb2RlO1xyXG4gICAgICAgIGlmIChwYXJlbnQpIHtcclxuICAgICAgICAgICAgdGhpcy5jbGlja0hhbmRsZXIoZSwgcGFyZW50KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBnZXRSb290KCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmdldFN1YlZpZXcoKS5nZXRSb290KCk7XHJcbiAgICB9XHJcbiAgICByZWZyZXNoKCkge1xyXG4gICAgICAgIGlmICghdGhpcy5fc3ViU2VnbWVudCkge1xyXG4gICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKG51bGwpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdGhpcy5nZXRTdWJWaWV3KCkucmVmcmVzaCgpLnRoZW4odmlldyA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuY2FsbEV2ZW50KFwiYXBwOnJvdXRlXCIsIFt0aGlzLmdldFVybCgpXSk7XHJcbiAgICAgICAgICAgIHJldHVybiB2aWV3O1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgbG9hZFZpZXcodXJsKSB7XHJcbiAgICAgICAgY29uc3Qgdmlld3MgPSB0aGlzLmNvbmZpZy52aWV3cztcclxuICAgICAgICBsZXQgcmVzdWx0ID0gbnVsbDtcclxuICAgICAgICBpZiAodXJsID09PSBcIlwiKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUodGhpcy5fbG9hZEVycm9yKFwiXCIsIG5ldyBFcnJvcihcIldlYml4IEpldDogRW1wdHkgdXJsIHNlZ21lbnRcIikpKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgaWYgKHZpZXdzKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mIHZpZXdzID09PSBcImZ1bmN0aW9uXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICAvLyBjdXN0b20gbG9hZGluZyBzdHJhdGVneVxyXG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdCA9IHZpZXdzKHVybCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAvLyBwcmVkZWZpbmVkIGhhc2hcclxuICAgICAgICAgICAgICAgICAgICByZXN1bHQgPSB2aWV3c1t1cmxdO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZiByZXN1bHQgPT09IFwic3RyaW5nXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICB1cmwgPSByZXN1bHQ7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0ID0gbnVsbDtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoIXJlc3VsdCkge1xyXG4gICAgICAgICAgICAgICAgaWYgKHVybCA9PT0gXCJfYmxhbmtcIikge1xyXG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdCA9IHt9O1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0ID0gdGhpcy5fbG9hZFZpZXdEeW5hbWljKHVybCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgY2F0Y2ggKGUpIHtcclxuICAgICAgICAgICAgcmVzdWx0ID0gdGhpcy5fbG9hZEVycm9yKHVybCwgZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIGN1c3RvbSBoYW5kbGVyIGNhbiByZXR1cm4gdmlldyBvciBpdHMgcHJvbWlzZVxyXG4gICAgICAgIGlmICghcmVzdWx0LnRoZW4pIHtcclxuICAgICAgICAgICAgcmVzdWx0ID0gUHJvbWlzZS5yZXNvbHZlKHJlc3VsdCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIHNldCBlcnJvciBoYW5kbGVyXHJcbiAgICAgICAgcmVzdWx0ID0gcmVzdWx0XHJcbiAgICAgICAgICAgIC50aGVuKG1vZHVsZSA9PiBtb2R1bGUuX19lc01vZHVsZSA/IG1vZHVsZS5kZWZhdWx0IDogbW9kdWxlKVxyXG4gICAgICAgICAgICAuY2F0Y2goZXJyID0+IHRoaXMuX2xvYWRFcnJvcih1cmwsIGVycikpO1xyXG4gICAgICAgIHJldHVybiByZXN1bHQ7XHJcbiAgICB9XHJcbiAgICBfZm9yVmlldyh0YXJnZXQsIGhhbmRsZXIpIHtcclxuICAgICAgICBjb25zdCB2aWV3ID0gdGhpcy53ZWJpeC4kJCh0YXJnZXQpO1xyXG4gICAgICAgIGlmICh2aWV3KSB7XHJcbiAgICAgICAgICAgIGhhbmRsZXIodmlldy4kc2NvcGUpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIF9sb2FkVmlld0R5bmFtaWModXJsKSB7XHJcbiAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICB9XHJcbiAgICBjcmVhdGVGcm9tVVJMKGNodW5rKSB7XHJcbiAgICAgICAgbGV0IHZpZXc7XHJcbiAgICAgICAgaWYgKGNodW5rLmlzTmV3IHx8ICFjaHVuay52aWV3KSB7XHJcbiAgICAgICAgICAgIHZpZXcgPSB0aGlzLmxvYWRWaWV3KGNodW5rLnBhZ2UpXHJcbiAgICAgICAgICAgICAgICAudGhlbih1aSA9PiB0aGlzLmNyZWF0ZVZpZXcodWksIG5hbWUpKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIHZpZXcgPSBQcm9taXNlLnJlc29sdmUoY2h1bmsudmlldyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB2aWV3O1xyXG4gICAgfVxyXG4gICAgY3JlYXRlVmlldyh1aSwgbmFtZSkge1xyXG4gICAgICAgIGxldCBvYmo7XHJcbiAgICAgICAgaWYgKHR5cGVvZiB1aSA9PT0gXCJmdW5jdGlvblwiKSB7XHJcbiAgICAgICAgICAgIGlmICh1aS5wcm90b3R5cGUgaW5zdGFuY2VvZiBKZXRBcHBCYXNlKSB7XHJcbiAgICAgICAgICAgICAgICAvLyBVSSBjbGFzc1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIG5ldyB1aSh7IGFwcDogdGhpcywgbmFtZSwgcm91dGVyOiBTdWJSb3V0ZXIgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSBpZiAodWkucHJvdG90eXBlIGluc3RhbmNlb2YgSmV0QmFzZSkge1xyXG4gICAgICAgICAgICAgICAgLy8gVUkgY2xhc3NcclxuICAgICAgICAgICAgICAgIHJldHVybiBuZXcgdWkodGhpcywgeyBuYW1lIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgLy8gVUkgZmFjdG9yeSBmdW5jdGlvbnNcclxuICAgICAgICAgICAgICAgIHVpID0gdWkodGhpcyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHVpIGluc3RhbmNlb2YgSmV0QmFzZSkge1xyXG4gICAgICAgICAgICBvYmogPSB1aTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIC8vIFVJIG9iamVjdFxyXG4gICAgICAgICAgICBvYmogPSBuZXcgSmV0Vmlld1Jhdyh0aGlzLCB7IG5hbWUsIHVpIH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gb2JqO1xyXG4gICAgfVxyXG4gICAgLy8gc2hvdyB2aWV3IHBhdGhcclxuICAgIHNob3codXJsKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMucmVuZGVyKHRoaXMuX2NvbnRhaW5lciwgKHVybCB8fCB0aGlzLmNvbmZpZy5zdGFydCkpO1xyXG4gICAgfVxyXG4gICAgLy8gZXZlbnQgaGVscGVyc1xyXG4gICAgdHJpZ2dlcihuYW1lLCAuLi5yZXN0KSB7XHJcbiAgICAgICAgdGhpcy5hcHBseShuYW1lLCByZXN0KTtcclxuICAgIH1cclxuICAgIGFwcGx5KG5hbWUsIGRhdGEpIHtcclxuICAgICAgICB0aGlzLmNhbGxFdmVudChuYW1lLCBkYXRhKTtcclxuICAgIH1cclxuICAgIGFjdGlvbihuYW1lKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMud2ViaXguYmluZChmdW5jdGlvbiAoLi4ucmVzdCkge1xyXG4gICAgICAgICAgICB0aGlzLmFwcGx5KG5hbWUsIHJlc3QpO1xyXG4gICAgICAgIH0sIHRoaXMpO1xyXG4gICAgfVxyXG4gICAgb24obmFtZSwgaGFuZGxlcikge1xyXG4gICAgICAgIHRoaXMuYXR0YWNoRXZlbnQobmFtZSwgaGFuZGxlcik7XHJcbiAgICB9XHJcbiAgICB1c2UocGx1Z2luLCBjb25maWcpIHtcclxuICAgICAgICBwbHVnaW4odGhpcywgbnVsbCwgY29uZmlnKTtcclxuICAgIH1cclxuICAgIGVycm9yKG5hbWUsIGVyKSB7XHJcbiAgICAgICAgdGhpcy5jYWxsRXZlbnQobmFtZSwgZXIpO1xyXG4gICAgICAgIHRoaXMuY2FsbEV2ZW50KFwiYXBwOmVycm9yXCIsIGVyKTtcclxuICAgICAgICAvKiB0c2xpbnQ6ZGlzYWJsZSAqL1xyXG4gICAgICAgIGlmICh0aGlzLmNvbmZpZy5kZWJ1Zykge1xyXG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGVyLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKGVyW2ldKTtcclxuICAgICAgICAgICAgICAgIGlmIChlcltpXSBpbnN0YW5jZW9mIEVycm9yKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IHRleHQgPSBlcltpXS5tZXNzYWdlO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0ZXh0LmluZGV4T2YoXCJNb2R1bGUgYnVpbGQgZmFpbGVkXCIpID09PSAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRleHQgPSB0ZXh0LnJlcGxhY2UoL1xceDFiXFxbWzAtOTtdKm0vZywgXCJcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRvY3VtZW50LmJvZHkuaW5uZXJIVE1MID0gYDxwcmUgc3R5bGU9J2ZvbnQtc2l6ZToxNnB4OyBiYWNrZ3JvdW5kLWNvbG9yOiAjZWM2ODczOyBjb2xvcjogIzAwMDsgcGFkZGluZzoxMHB4Oyc+JHt0ZXh0fTwvcHJlPmA7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0ZXh0ICs9IFwiPGJyPjxicj5DaGVjayBjb25zb2xlIGZvciBtb3JlIGRldGFpbHNcIjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy53ZWJpeC5tZXNzYWdlKHsgdHlwZTogXCJlcnJvclwiLCB0ZXh0OiB0ZXh0LCBleHBpcmU6IC0xIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBkZWJ1Z2dlcjtcclxuICAgICAgICB9XHJcbiAgICAgICAgLyogdHNsaW50OmVuYWJsZSAqL1xyXG4gICAgfVxyXG4gICAgLy8gcmVuZGVycyB0b3Agdmlld1xyXG4gICAgcmVuZGVyKHJvb3QsIHVybCwgcGFyZW50KSB7XHJcbiAgICAgICAgdGhpcy5fY29udGFpbmVyID0gKHR5cGVvZiByb290ID09PSBcInN0cmluZ1wiKSA/XHJcbiAgICAgICAgICAgIHRoaXMud2ViaXgudG9Ob2RlKHJvb3QpIDpcclxuICAgICAgICAgICAgKHJvb3QgfHwgZG9jdW1lbnQuYm9keSk7XHJcbiAgICAgICAgY29uc3QgZmlyc3RJbml0ID0gIXRoaXMuJHJvdXRlcjtcclxuICAgICAgICBsZXQgcGF0aCA9IG51bGw7XHJcbiAgICAgICAgaWYgKGZpcnN0SW5pdCkge1xyXG4gICAgICAgICAgICBpZiAoX29uY2UgJiYgXCJ0YWdOYW1lXCIgaW4gdGhpcy5fY29udGFpbmVyKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLndlYml4LmV2ZW50KGRvY3VtZW50LmJvZHksIFwiY2xpY2tcIiwgZSA9PiB0aGlzLmNsaWNrSGFuZGxlcihlKSk7XHJcbiAgICAgICAgICAgICAgICBfb25jZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmICh0eXBlb2YgdXJsID09PSBcInN0cmluZ1wiKSB7XHJcbiAgICAgICAgICAgICAgICB1cmwgPSBuZXcgUm91dGUodXJsLCAwKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLl9zdWJTZWdtZW50ID0gdGhpcy5fZmlyc3Rfc3RhcnQodXJsKTtcclxuICAgICAgICAgICAgdGhpcy5fc3ViU2VnbWVudC5yb3V0ZS5saW5rUm91dGVyID0gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIGlmICh0eXBlb2YgdXJsID09PSBcInN0cmluZ1wiKSB7XHJcbiAgICAgICAgICAgICAgICBwYXRoID0gdXJsO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuYXBwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcGF0aCA9IHVybC5zcGxpdCgpLnJvdXRlLnBhdGggfHwgdGhpcy5jb25maWcuc3RhcnQ7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBwYXRoID0gdXJsLnRvU3RyaW5nKCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgY29uc3QgdG9wID0gdGhpcy5nZXRTdWJWaWV3KCk7XHJcbiAgICAgICAgY29uc3Qgc2VnbWVudCA9IHRoaXMuX3N1YlNlZ21lbnQ7XHJcbiAgICAgICAgY29uc3QgcmVhZHkgPSBzZWdtZW50LnNob3cocGF0aCwgdG9wKVxyXG4gICAgICAgICAgICAudGhlbigoKSA9PiB0aGlzLmNyZWF0ZUZyb21VUkwoc2VnbWVudC5jdXJyZW50KCkpKVxyXG4gICAgICAgICAgICAudGhlbih2aWV3ID0+IHZpZXcucmVuZGVyKHJvb3QsIHNlZ21lbnQpKVxyXG4gICAgICAgICAgICAudGhlbihiYXNlID0+IHtcclxuICAgICAgICAgICAgdGhpcy4kcm91dGVyLnNldChzZWdtZW50LnJvdXRlLnBhdGgsIHsgc2lsZW50OiB0cnVlIH0pO1xyXG4gICAgICAgICAgICB0aGlzLmNhbGxFdmVudChcImFwcDpyb3V0ZVwiLCBbdGhpcy5nZXRVcmwoKV0pO1xyXG4gICAgICAgICAgICByZXR1cm4gYmFzZTtcclxuICAgICAgICB9KTtcclxuICAgICAgICB0aGlzLnJlYWR5ID0gdGhpcy5yZWFkeS50aGVuKCgpID0+IHJlYWR5KTtcclxuICAgICAgICByZXR1cm4gcmVhZHk7XHJcbiAgICB9XHJcbiAgICBnZXRTdWJWaWV3KCkge1xyXG4gICAgICAgIGlmICh0aGlzLl9zdWJTZWdtZW50KSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHZpZXcgPSB0aGlzLl9zdWJTZWdtZW50LmN1cnJlbnQoKS52aWV3O1xyXG4gICAgICAgICAgICBpZiAodmlldylcclxuICAgICAgICAgICAgICAgIHJldHVybiB2aWV3O1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gbmV3IEpldFZpZXcodGhpcywge30pO1xyXG4gICAgfVxyXG4gICAgX2ZpcnN0X3N0YXJ0KHJvdXRlKSB7XHJcbiAgICAgICAgdGhpcy5fc2VnbWVudCA9IHJvdXRlO1xyXG4gICAgICAgIGNvbnN0IGNiID0gKGEpID0+IHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLnNob3coYSkuY2F0Y2goZSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAoIShlIGluc3RhbmNlb2YgTmF2aWdhdGlvbkJsb2NrZWQpKVxyXG4gICAgICAgICAgICAgICAgICAgIHRocm93IGU7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0sIDEpO1xyXG4gICAgICAgIHRoaXMuJHJvdXRlciA9IG5ldyAodGhpcy5jb25maWcucm91dGVyKShjYiwgdGhpcy5jb25maWcsIHRoaXMpO1xyXG4gICAgICAgIC8vIHN0YXJ0IGFuaW1hdGlvbiBmb3IgdG9wLWxldmVsIGFwcFxyXG4gICAgICAgIGlmICh0aGlzLl9jb250YWluZXIgPT09IGRvY3VtZW50LmJvZHkgJiYgdGhpcy5jb25maWcuYW5pbWF0aW9uICE9PSBmYWxzZSkge1xyXG4gICAgICAgICAgICBjb25zdCBub2RlID0gdGhpcy5fY29udGFpbmVyO1xyXG4gICAgICAgICAgICB0aGlzLndlYml4Lmh0bWwuYWRkQ3NzKG5vZGUsIFwid2ViaXhhcHBzdGFydFwiKTtcclxuICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLndlYml4Lmh0bWwucmVtb3ZlQ3NzKG5vZGUsIFwid2ViaXhhcHBzdGFydFwiKTtcclxuICAgICAgICAgICAgICAgIHRoaXMud2ViaXguaHRtbC5hZGRDc3Mobm9kZSwgXCJ3ZWJpeGFwcFwiKTtcclxuICAgICAgICAgICAgfSwgMTApO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoIXJvdXRlKSB7XHJcbiAgICAgICAgICAgIC8vIGlmIG5vIHVybCBkZWZpbmVkLCBjaGVjayByb3V0ZXIgZmlyc3RcclxuICAgICAgICAgICAgbGV0IHVybFN0cmluZyA9IHRoaXMuJHJvdXRlci5nZXQoKTtcclxuICAgICAgICAgICAgaWYgKCF1cmxTdHJpbmcpIHtcclxuICAgICAgICAgICAgICAgIHVybFN0cmluZyA9IHRoaXMuY29uZmlnLnN0YXJ0O1xyXG4gICAgICAgICAgICAgICAgdGhpcy4kcm91dGVyLnNldCh1cmxTdHJpbmcsIHsgc2lsZW50OiB0cnVlIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJvdXRlID0gbmV3IFJvdXRlKHVybFN0cmluZywgMCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYgKHRoaXMuYXBwKSB7XHJcbiAgICAgICAgICAgIHJvdXRlLmN1cnJlbnQoKS52aWV3ID0gdGhpcztcclxuICAgICAgICAgICAgaWYgKHJvdXRlLm5leHQoKSkge1xyXG4gICAgICAgICAgICAgICAgcm91dGUucmVmcmVzaCgpO1xyXG4gICAgICAgICAgICAgICAgcm91dGUgPSByb3V0ZS5zcGxpdCgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgcm91dGUgPSBuZXcgUm91dGUodGhpcy5jb25maWcuc3RhcnQsIDApO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiByb3V0ZTtcclxuICAgIH1cclxuICAgIC8vIGVycm9yIGR1cmluZyB2aWV3IHJlc29sdmluZ1xyXG4gICAgX2xvYWRFcnJvcih1cmwsIGVycikge1xyXG4gICAgICAgIHRoaXMuZXJyb3IoXCJhcHA6ZXJyb3I6cmVzb2x2ZVwiLCBbZXJyLCB1cmxdKTtcclxuICAgICAgICByZXR1cm4geyB0ZW1wbGF0ZTogXCIgXCIgfTtcclxuICAgIH1cclxuICAgIGFkZFN1YlZpZXcob2JqLCB0YXJnZXQsIGNvbmZpZykge1xyXG4gICAgICAgIGNvbnN0IHVybCA9IG9iai4kc3VidmlldyAhPT0gdHJ1ZSA/IG9iai4kc3VidmlldyA6IG51bGw7XHJcbiAgICAgICAgY29uc3QgbmFtZSA9IG9iai5uYW1lIHx8ICh1cmwgPyB0aGlzLndlYml4LnVpZCgpIDogXCJkZWZhdWx0XCIpO1xyXG4gICAgICAgIHRhcmdldC5pZCA9IG9iai5pZCB8fCBcInNcIiArIHRoaXMud2ViaXgudWlkKCk7XHJcbiAgICAgICAgY29uc3QgdmlldyA9IGNvbmZpZ1tuYW1lXSA9IHtcclxuICAgICAgICAgICAgaWQ6IHRhcmdldC5pZCxcclxuICAgICAgICAgICAgdXJsLFxyXG4gICAgICAgICAgICBicmFuY2g6IG9iai5icmFuY2gsXHJcbiAgICAgICAgICAgIHBvcHVwOiBvYmoucG9wdXBcclxuICAgICAgICB9O1xyXG4gICAgICAgIHJldHVybiB2aWV3LnBvcHVwID8gbnVsbCA6IHRhcmdldDtcclxuICAgIH1cclxufVxuXG5jbGFzcyBIYXNoUm91dGVyIHtcclxuICAgIGNvbnN0cnVjdG9yKGNiLCBjb25maWcpIHtcclxuICAgICAgICB0aGlzLmNvbmZpZyA9IGNvbmZpZyB8fCB7fTtcclxuICAgICAgICB0aGlzLl9kZXRlY3RQcmVmaXgoKTtcclxuICAgICAgICB0aGlzLmNiID0gY2I7XHJcbiAgICAgICAgd2luZG93Lm9ucG9wc3RhdGUgPSAoKSA9PiB0aGlzLmNiKHRoaXMuZ2V0KCkpO1xyXG4gICAgfVxyXG4gICAgc2V0KHBhdGgsIGNvbmZpZykge1xyXG4gICAgICAgIGlmICh0aGlzLmNvbmZpZy5yb3V0ZXMpIHtcclxuICAgICAgICAgICAgY29uc3QgY29tcGFyZSA9IHBhdGguc3BsaXQoXCI/XCIsIDIpO1xyXG4gICAgICAgICAgICBmb3IgKGNvbnN0IGtleSBpbiB0aGlzLmNvbmZpZy5yb3V0ZXMpIHtcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmNvbmZpZy5yb3V0ZXNba2V5XSA9PT0gY29tcGFyZVswXSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHBhdGggPSBrZXkgKyAoY29tcGFyZS5sZW5ndGggPiAxID8gXCI/XCIgKyBjb21wYXJlWzFdIDogXCJcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHRoaXMuZ2V0KCkgIT09IHBhdGgpIHtcclxuICAgICAgICAgICAgd2luZG93Lmhpc3RvcnkucHVzaFN0YXRlKG51bGwsIG51bGwsIHRoaXMucHJlZml4ICsgdGhpcy5zdWZpeCArIHBhdGgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoIWNvbmZpZyB8fCAhY29uZmlnLnNpbGVudCkge1xyXG4gICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHRoaXMuY2IocGF0aCksIDEpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGdldCgpIHtcclxuICAgICAgICBsZXQgcGF0aCA9IHRoaXMuX2dldFJhdygpLnJlcGxhY2UodGhpcy5wcmVmaXgsIFwiXCIpLnJlcGxhY2UodGhpcy5zdWZpeCwgXCJcIik7XHJcbiAgICAgICAgcGF0aCA9IChwYXRoICE9PSBcIi9cIiAmJiBwYXRoICE9PSBcIiNcIikgPyBwYXRoIDogXCJcIjtcclxuICAgICAgICBpZiAodGhpcy5jb25maWcucm91dGVzKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGNvbXBhcmUgPSBwYXRoLnNwbGl0KFwiP1wiLCAyKTtcclxuICAgICAgICAgICAgY29uc3Qga2V5ID0gdGhpcy5jb25maWcucm91dGVzW2NvbXBhcmVbMF1dO1xyXG4gICAgICAgICAgICBpZiAoa2V5KSB7XHJcbiAgICAgICAgICAgICAgICBwYXRoID0ga2V5ICsgKGNvbXBhcmUubGVuZ3RoID4gMSA/IFwiP1wiICsgY29tcGFyZVsxXSA6IFwiXCIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBwYXRoO1xyXG4gICAgfVxyXG4gICAgX2RldGVjdFByZWZpeCgpIHtcclxuICAgICAgICAvLyB1c2UgXCIjIVwiIGZvciBiYWNrd2FyZCBjb21wYXRpYmlsaXR5XHJcbiAgICAgICAgY29uc3Qgc3VmaXggPSB0aGlzLmNvbmZpZy5yb3V0ZXJQcmVmaXg7XHJcbiAgICAgICAgdGhpcy5zdWZpeCA9IFwiI1wiICsgKCh0eXBlb2Ygc3VmaXggPT09IFwidW5kZWZpbmVkXCIpID8gXCIhXCIgOiBzdWZpeCk7XHJcbiAgICAgICAgdGhpcy5wcmVmaXggPSBkb2N1bWVudC5sb2NhdGlvbi5ocmVmLnNwbGl0KFwiI1wiLCAyKVswXTtcclxuICAgIH1cclxuICAgIF9nZXRSYXcoKSB7XHJcbiAgICAgICAgcmV0dXJuIGRvY3VtZW50LmxvY2F0aW9uLmhyZWY7XHJcbiAgICB9XHJcbn1cblxubGV0IGlzUGF0Y2hlZCA9IGZhbHNlO1xyXG5mdW5jdGlvbiBwYXRjaCh3KSB7XHJcbiAgICBpZiAoaXNQYXRjaGVkIHx8ICF3KSB7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG4gICAgaXNQYXRjaGVkID0gdHJ1ZTtcclxuICAgIC8vIGN1c3RvbSBwcm9taXNlIGZvciBJRThcclxuICAgIGNvbnN0IHdpbiA9IHdpbmRvdztcclxuICAgIGlmICghd2luLlByb21pc2UpIHtcclxuICAgICAgICB3aW4uUHJvbWlzZSA9IHcucHJvbWlzZTtcclxuICAgIH1cclxuICAgIGNvbnN0IHZlcnNpb24gPSB3LnZlcnNpb24uc3BsaXQoXCIuXCIpO1xyXG4gICAgLy8gd2lsbCBiZSBmaXhlZCBpbiB3ZWJpeCA1LjNcclxuICAgIGlmICh2ZXJzaW9uWzBdICogMTAgKyB2ZXJzaW9uWzFdICogMSA8IDUzKSB7XHJcbiAgICAgICAgdy51aS5mcmVlemUgPSBmdW5jdGlvbiAoaGFuZGxlcikge1xyXG4gICAgICAgICAgICAvLyBkaXNhYmxlZCBiZWNhdXNlIHdlYml4IGpldCA1LjAgY2FuJ3QgaGFuZGxlIHJlc2l6ZSBvZiBzY3JvbGx2aWV3IGNvcnJlY3RseVxyXG4gICAgICAgICAgICAvLyB3LnVpLiRmcmVlemUgPSB0cnVlO1xyXG4gICAgICAgICAgICBjb25zdCByZXMgPSBoYW5kbGVyKCk7XHJcbiAgICAgICAgICAgIGlmIChyZXMgJiYgcmVzLnRoZW4pIHtcclxuICAgICAgICAgICAgICAgIHJlcy50aGVuKGZ1bmN0aW9uIChzb21lKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdy51aS4kZnJlZXplID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgdy51aS5yZXNpemUoKTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gc29tZTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdy51aS4kZnJlZXplID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB3LnVpLnJlc2l6ZSgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiByZXM7XHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuICAgIC8vIGFkZGluZyB2aWV3cyBhcyBjbGFzc2VzXHJcbiAgICBjb25zdCBiYXNlQWRkID0gdy51aS5iYXNlbGF5b3V0LnByb3RvdHlwZS5hZGRWaWV3O1xyXG4gICAgY29uc3QgYmFzZVJlbW92ZSA9IHcudWkuYmFzZWxheW91dC5wcm90b3R5cGUucmVtb3ZlVmlldztcclxuICAgIGNvbnN0IGNvbmZpZyA9IHtcclxuICAgICAgICBhZGRWaWV3KHZpZXcsIGluZGV4KSB7XHJcbiAgICAgICAgICAgIC8vIHRyaWdnZXIgbG9naWMgb25seSBmb3Igd2lkZ2V0cyBpbnNpZGUgb2YgamV0LXZpZXdcclxuICAgICAgICAgICAgLy8gaWdub3JlIGNhc2Ugd2hlbiBhZGRWaWV3IHVzZWQgd2l0aCBhbHJlYWR5IGluaXRpYWxpemVkIHdpZGdldFxyXG4gICAgICAgICAgICBpZiAodGhpcy4kc2NvcGUgJiYgdGhpcy4kc2NvcGUud2ViaXhKZXQgJiYgIXZpZXcucXVlcnlWaWV3KSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBqdmlldyA9IHRoaXMuJHNjb3BlO1xyXG4gICAgICAgICAgICAgICAgY29uc3Qgc3VicyA9IHt9O1xyXG4gICAgICAgICAgICAgICAgdmlldyA9IGp2aWV3LmFwcC5jb3B5Q29uZmlnKHZpZXcsIHt9LCBzdWJzKTtcclxuICAgICAgICAgICAgICAgIGJhc2VBZGQuYXBwbHkodGhpcywgW3ZpZXcsIGluZGV4XSk7XHJcbiAgICAgICAgICAgICAgICBmb3IgKGNvbnN0IGtleSBpbiBzdWJzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAganZpZXcuX3JlbmRlckZyYW1lKGtleSwgc3Vic1trZXldLCBudWxsKS50aGVuKCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAganZpZXcuX3N1YnNba2V5XSA9IHN1YnNba2V5XTtcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHJldHVybiB2aWV3LmlkO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGJhc2VBZGQuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgcmVtb3ZlVmlldygpIHtcclxuICAgICAgICAgICAgYmFzZVJlbW92ZS5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xyXG4gICAgICAgICAgICBpZiAodGhpcy4kc2NvcGUgJiYgdGhpcy4kc2NvcGUud2ViaXhKZXQpIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHN1YnMgPSB0aGlzLiRzY29wZS5fc3VicztcclxuICAgICAgICAgICAgICAgIC8vIGNoZWNrIGFsbCBzdWItdmlld3MsIGRlc3Ryb3kgYW5kIGNsZWFuIHRoZSByZW1vdmVkIG9uZVxyXG4gICAgICAgICAgICAgICAgZm9yIChjb25zdCBrZXkgaW4gc3Vicykge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHRlc3QgPSBzdWJzW2tleV07XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCF3LiQkKHRlc3QuaWQpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRlc3Qudmlldy5kZXN0cnVjdG9yKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRlbGV0ZSBzdWJzW2tleV07XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuICAgIHcuZXh0ZW5kKHcudWkubGF5b3V0LnByb3RvdHlwZSwgY29uZmlnLCB0cnVlKTtcclxuICAgIHcuZXh0ZW5kKHcudWkuYmFzZWxheW91dC5wcm90b3R5cGUsIGNvbmZpZywgdHJ1ZSk7XHJcbiAgICAvLyB3cmFwcGVyIGZvciB1c2luZyBKZXQgQXBwcyBhcyB2aWV3c1xyXG4gICAgdy5wcm90b1VJKHtcclxuICAgICAgICBuYW1lOiBcImpldGFwcFwiLFxyXG4gICAgICAgICRpbml0KGNmZykge1xyXG4gICAgICAgICAgICB0aGlzLiRhcHAgPSBuZXcgdGhpcy5hcHAoY2ZnKTtcclxuICAgICAgICAgICAgY29uc3QgaWQgPSB3LnVpZCgpLnRvU3RyaW5nKCk7XHJcbiAgICAgICAgICAgIGNmZy5ib2R5ID0geyBpZCB9O1xyXG4gICAgICAgICAgICB0aGlzLiRyZWFkeS5wdXNoKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuJGFwcC5yZW5kZXIoeyBpZCB9KTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIGZvciAodmFyIGtleSBpbiB0aGlzLiRhcHApIHtcclxuICAgICAgICAgICAgICAgIHZhciBvcmlnaW4gPSB0aGlzLiRhcHBba2V5XTtcclxuICAgICAgICAgICAgICAgIGlmICh0eXBlb2Ygb3JpZ2luID09PSBcImZ1bmN0aW9uXCIgJiYgIXRoaXNba2V5XSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXNba2V5XSA9IG9yaWdpbi5iaW5kKHRoaXMuJGFwcCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9LCB3LnVpLnByb3h5KTtcclxufVxuXG5jbGFzcyBKZXRBcHAgZXh0ZW5kcyBKZXRBcHBCYXNlIHtcclxuICAgIGNvbnN0cnVjdG9yKGNvbmZpZykge1xyXG4gICAgICAgIGNvbmZpZy5yb3V0ZXIgPSBjb25maWcucm91dGVyIHx8IEhhc2hSb3V0ZXI7XHJcbiAgICAgICAgc3VwZXIoY29uZmlnKTtcclxuICAgICAgICBwYXRjaCh0aGlzLndlYml4KTtcclxuICAgIH1cclxuICAgIF9sb2FkVmlld0R5bmFtaWModXJsKSB7XHJcbiAgICAgICAgdXJsID0gdXJsLnJlcGxhY2UoL1xcLi9nLCBcIi9cIik7XHJcbiAgICAgICAgcmV0dXJuIHJlcXVpcmUoXCJqZXQtdmlld3MvXCIgKyB1cmwpO1xyXG4gICAgfVxyXG59XG5cbmNsYXNzIFN0b3JlUm91dGVyIHtcclxuICAgIGNvbnN0cnVjdG9yKGNiLCBjb25maWcsIGFwcCkge1xyXG4gICAgICAgIHRoaXMuc3RvcmFnZSA9IGNvbmZpZy5zdG9yYWdlIHx8IGFwcC53ZWJpeC5zdG9yYWdlLnNlc3Npb247XHJcbiAgICAgICAgdGhpcy5uYW1lID0gKGNvbmZpZy5zdG9yZU5hbWUgfHwgY29uZmlnLmlkICsgXCI6cm91dGVcIik7XHJcbiAgICAgICAgdGhpcy5jYiA9IGNiO1xyXG4gICAgfVxyXG4gICAgc2V0KHBhdGgsIGNvbmZpZykge1xyXG4gICAgICAgIHRoaXMuc3RvcmFnZS5wdXQodGhpcy5uYW1lLCBwYXRoKTtcclxuICAgICAgICBpZiAoIWNvbmZpZyB8fCAhY29uZmlnLnNpbGVudCkge1xyXG4gICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHRoaXMuY2IocGF0aCksIDEpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGdldCgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5zdG9yYWdlLmdldCh0aGlzLm5hbWUpO1xyXG4gICAgfVxyXG59XG5cbmNsYXNzIFVybFJvdXRlciBleHRlbmRzIEhhc2hSb3V0ZXIge1xyXG4gICAgX2RldGVjdFByZWZpeCgpIHtcclxuICAgICAgICB0aGlzLnByZWZpeCA9IFwiXCI7XHJcbiAgICAgICAgdGhpcy5zdWZpeCA9IHRoaXMuY29uZmlnLnJvdXRlclByZWZpeCB8fCBcIlwiO1xyXG4gICAgfVxyXG4gICAgX2dldFJhdygpIHtcclxuICAgICAgICByZXR1cm4gZG9jdW1lbnQubG9jYXRpb24ucGF0aG5hbWUgKyAoZG9jdW1lbnQubG9jYXRpb24uc2VhcmNoIHx8IFwiXCIpO1xyXG4gICAgfVxyXG59XG5cbmNsYXNzIEVtcHR5Um91dGVyIHtcclxuICAgIGNvbnN0cnVjdG9yKGNiLCBfJGNvbmZpZykge1xyXG4gICAgICAgIHRoaXMucGF0aCA9IFwiXCI7XHJcbiAgICAgICAgdGhpcy5jYiA9IGNiO1xyXG4gICAgfVxyXG4gICAgc2V0KHBhdGgsIGNvbmZpZykge1xyXG4gICAgICAgIHRoaXMucGF0aCA9IHBhdGg7XHJcbiAgICAgICAgaWYgKCFjb25maWcgfHwgIWNvbmZpZy5zaWxlbnQpIHtcclxuICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB0aGlzLmNiKHBhdGgpLCAxKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBnZXQoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMucGF0aDtcclxuICAgIH1cclxufVxuXG5mdW5jdGlvbiBVbmxvYWRHdWFyZChhcHAsIHZpZXcsIGNvbmZpZykge1xyXG4gICAgdmlldy5vbihhcHAsIGBhcHA6Z3VhcmRgLCBmdW5jdGlvbiAoXyR1cmwsIHBvaW50LCBwcm9taXNlKSB7XHJcbiAgICAgICAgaWYgKHBvaW50ID09PSB2aWV3IHx8IHBvaW50LmNvbnRhaW5zKHZpZXcpKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHJlcyA9IGNvbmZpZygpO1xyXG4gICAgICAgICAgICBpZiAocmVzID09PSBmYWxzZSkge1xyXG4gICAgICAgICAgICAgICAgcHJvbWlzZS5jb25maXJtID0gUHJvbWlzZS5yZWplY3QobmV3IE5hdmlnYXRpb25CbG9ja2VkKCkpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgcHJvbWlzZS5jb25maXJtID0gcHJvbWlzZS5jb25maXJtLnRoZW4oKCkgPT4gcmVzKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG59XG5cbi8vICAgICAoYykgMjAxMi0yMDE4IEFpcmJuYiwgSW5jLlxuXG4vLyB2YXIgaGFzID0gcmVxdWlyZSgnaGFzJyk7XG5mdW5jdGlvbiBoYXMoc3RvcmUsIGtleSkge1xuICByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHN0b3JlLCBrZXkpO1xufVxuLy8gdmFyIGZvckVhY2ggPSByZXF1aXJlKCdmb3ItZWFjaCcpO1xuZnVuY3Rpb24gZm9yRWFjaChvYmosIGhhbmRsZXIsIGNvbnRleHQpIHtcbiAgZm9yICh2YXIga2V5IGluIG9iaikge1xuICAgIGlmIChoYXMob2JqLCBrZXkpKSB7XG4gICAgICBoYW5kbGVyLmNhbGwoKGNvbnRleHQgfHwgb2JqKSwgb2JqW2tleV0sIGtleSwgb2JqKTtcbiAgICB9XG4gIH1cbn1cbi8vIHZhciB0cmltID0gcmVxdWlyZSgnc3RyaW5nLnByb3RvdHlwZS50cmltJyk7XG5mdW5jdGlvbiB0cmltKHN0cikge1xuICByZXR1cm4gc3RyLnJlcGxhY2UoL15bXFxzXFx1RkVGRlxceEEwXSt8W1xcc1xcdUZFRkZcXHhBMF0rJC9nLCAnJyk7XG59XG4vLyB2YXIgd2FybmluZyA9IHJlcXVpcmUoJ3dhcm5pbmcnKTtcbmZ1bmN0aW9uIHdhcm4obWVzc2FnZSkge1xuICBtZXNzYWdlID0gJ1dhcm5pbmc6ICcgKyBtZXNzYWdlO1xuICBpZiAodHlwZW9mIGNvbnNvbGUgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgY29uc29sZS5lcnJvcihtZXNzYWdlKTtcbiAgfVxuXG4gIHRyeSB7IHRocm93IG5ldyBFcnJvcihtZXNzYWdlKTsgfSBjYXRjaCAoeCkge31cbn1cblxudmFyIHJlcGxhY2UgPSBTdHJpbmcucHJvdG90eXBlLnJlcGxhY2U7XG52YXIgc3BsaXQgPSBTdHJpbmcucHJvdG90eXBlLnNwbGl0O1xuXG4vLyAjIyMjIFBsdXJhbGl6YXRpb24gbWV0aG9kc1xuLy8gVGhlIHN0cmluZyB0aGF0IHNlcGFyYXRlcyB0aGUgZGlmZmVyZW50IHBocmFzZSBwb3NzaWJpbGl0aWVzLlxudmFyIGRlbGltaXRlciA9ICd8fHx8JztcblxudmFyIHJ1c3NpYW5QbHVyYWxHcm91cHMgPSBmdW5jdGlvbiAobikge1xuICB2YXIgZW5kID0gbiAlIDEwO1xuICBpZiAobiAhPT0gMTEgJiYgZW5kID09PSAxKSB7XG4gICAgcmV0dXJuIDA7XG4gIH1cbiAgaWYgKDIgPD0gZW5kICYmIGVuZCA8PSA0ICYmICEobiA+PSAxMiAmJiBuIDw9IDE0KSkge1xuICAgIHJldHVybiAxO1xuICB9XG4gIHJldHVybiAyO1xufTtcblxuLy8gTWFwcGluZyBmcm9tIHBsdXJhbGl6YXRpb24gZ3JvdXAgcGx1cmFsIGxvZ2ljLlxudmFyIHBsdXJhbFR5cGVzID0ge1xuICBhcmFiaWM6IGZ1bmN0aW9uIChuKSB7XG4gICAgLy8gaHR0cDovL3d3dy5hcmFiZXllcy5vcmcvUGx1cmFsX0Zvcm1zXG4gICAgaWYgKG4gPCAzKSB7IHJldHVybiBuOyB9XG4gICAgdmFyIGxhc3RUd28gPSBuICUgMTAwO1xuICAgIGlmIChsYXN0VHdvID49IDMgJiYgbGFzdFR3byA8PSAxMCkgcmV0dXJuIDM7XG4gICAgcmV0dXJuIGxhc3RUd28gPj0gMTEgPyA0IDogNTtcbiAgfSxcbiAgYm9zbmlhbl9zZXJiaWFuOiBydXNzaWFuUGx1cmFsR3JvdXBzLFxuICBjaGluZXNlOiBmdW5jdGlvbiAoKSB7IHJldHVybiAwOyB9LFxuICBjcm9hdGlhbjogcnVzc2lhblBsdXJhbEdyb3VwcyxcbiAgZnJlbmNoOiBmdW5jdGlvbiAobikgeyByZXR1cm4gbiA+IDEgPyAxIDogMDsgfSxcbiAgZ2VybWFuOiBmdW5jdGlvbiAobikgeyByZXR1cm4gbiAhPT0gMSA/IDEgOiAwOyB9LFxuICBydXNzaWFuOiBydXNzaWFuUGx1cmFsR3JvdXBzLFxuICBsaXRodWFuaWFuOiBmdW5jdGlvbiAobikge1xuICAgIGlmIChuICUgMTAgPT09IDEgJiYgbiAlIDEwMCAhPT0gMTEpIHsgcmV0dXJuIDA7IH1cbiAgICByZXR1cm4gbiAlIDEwID49IDIgJiYgbiAlIDEwIDw9IDkgJiYgKG4gJSAxMDAgPCAxMSB8fCBuICUgMTAwID4gMTkpID8gMSA6IDI7XG4gIH0sXG4gIGN6ZWNoOiBmdW5jdGlvbiAobikge1xuICAgIGlmIChuID09PSAxKSB7IHJldHVybiAwOyB9XG4gICAgcmV0dXJuIChuID49IDIgJiYgbiA8PSA0KSA/IDEgOiAyO1xuICB9LFxuICBwb2xpc2g6IGZ1bmN0aW9uIChuKSB7XG4gICAgaWYgKG4gPT09IDEpIHsgcmV0dXJuIDA7IH1cbiAgICB2YXIgZW5kID0gbiAlIDEwO1xuICAgIHJldHVybiAyIDw9IGVuZCAmJiBlbmQgPD0gNCAmJiAobiAlIDEwMCA8IDEwIHx8IG4gJSAxMDAgPj0gMjApID8gMSA6IDI7XG4gIH0sXG4gIGljZWxhbmRpYzogZnVuY3Rpb24gKG4pIHsgcmV0dXJuIChuICUgMTAgIT09IDEgfHwgbiAlIDEwMCA9PT0gMTEpID8gMSA6IDA7IH0sXG4gIHNsb3ZlbmlhbjogZnVuY3Rpb24gKG4pIHtcbiAgICB2YXIgbGFzdFR3byA9IG4gJSAxMDA7XG4gICAgaWYgKGxhc3RUd28gPT09IDEpIHtcbiAgICAgIHJldHVybiAwO1xuICAgIH1cbiAgICBpZiAobGFzdFR3byA9PT0gMikge1xuICAgICAgcmV0dXJuIDE7XG4gICAgfVxuICAgIGlmIChsYXN0VHdvID09PSAzIHx8IGxhc3RUd28gPT09IDQpIHtcbiAgICAgIHJldHVybiAyO1xuICAgIH1cbiAgICByZXR1cm4gMztcbiAgfVxufTtcblxuXG4vLyBNYXBwaW5nIGZyb20gcGx1cmFsaXphdGlvbiBncm91cCB0byBpbmRpdmlkdWFsIGxhbmd1YWdlIGNvZGVzL2xvY2FsZXMuXG4vLyBXaWxsIGxvb2sgdXAgYmFzZWQgb24gZXhhY3QgbWF0Y2gsIGlmIG5vdCBmb3VuZCBhbmQgaXQncyBhIGxvY2FsZSB3aWxsIHBhcnNlIHRoZSBsb2NhbGVcbi8vIGZvciBsYW5ndWFnZSBjb2RlLCBhbmQgaWYgdGhhdCBkb2VzIG5vdCBleGlzdCB3aWxsIGRlZmF1bHQgdG8gJ2VuJ1xudmFyIHBsdXJhbFR5cGVUb0xhbmd1YWdlcyA9IHtcbiAgYXJhYmljOiBbJ2FyJ10sXG4gIGJvc25pYW5fc2VyYmlhbjogWydicy1MYXRuLUJBJywgJ2JzLUN5cmwtQkEnLCAnc3JsLVJTJywgJ3NyLVJTJ10sXG4gIGNoaW5lc2U6IFsnaWQnLCAnaWQtSUQnLCAnamEnLCAna28nLCAna28tS1InLCAnbG8nLCAnbXMnLCAndGgnLCAndGgtVEgnLCAnemgnXSxcbiAgY3JvYXRpYW46IFsnaHInLCAnaHItSFInXSxcbiAgZ2VybWFuOiBbJ2ZhJywgJ2RhJywgJ2RlJywgJ2VuJywgJ2VzJywgJ2ZpJywgJ2VsJywgJ2hlJywgJ2hpLUlOJywgJ2h1JywgJ2h1LUhVJywgJ2l0JywgJ25sJywgJ25vJywgJ3B0JywgJ3N2JywgJ3RyJ10sXG4gIGZyZW5jaDogWydmcicsICd0bCcsICdwdC1iciddLFxuICBydXNzaWFuOiBbJ3J1JywgJ3J1LVJVJ10sXG4gIGxpdGh1YW5pYW46IFsnbHQnXSxcbiAgY3plY2g6IFsnY3MnLCAnY3MtQ1onLCAnc2snXSxcbiAgcG9saXNoOiBbJ3BsJ10sXG4gIGljZWxhbmRpYzogWydpcyddLFxuICBzbG92ZW5pYW46IFsnc2wtU0wnXVxufTtcblxuZnVuY3Rpb24gbGFuZ1RvVHlwZU1hcChtYXBwaW5nKSB7XG4gIHZhciByZXQgPSB7fTtcbiAgZm9yRWFjaChtYXBwaW5nLCBmdW5jdGlvbiAobGFuZ3MsIHR5cGUpIHtcbiAgICBmb3JFYWNoKGxhbmdzLCBmdW5jdGlvbiAobGFuZykge1xuICAgICAgcmV0W2xhbmddID0gdHlwZTtcbiAgICB9KTtcbiAgfSk7XG4gIHJldHVybiByZXQ7XG59XG5cbmZ1bmN0aW9uIHBsdXJhbFR5cGVOYW1lKGxvY2FsZSkge1xuICB2YXIgbGFuZ1RvUGx1cmFsVHlwZSA9IGxhbmdUb1R5cGVNYXAocGx1cmFsVHlwZVRvTGFuZ3VhZ2VzKTtcbiAgcmV0dXJuIGxhbmdUb1BsdXJhbFR5cGVbbG9jYWxlXVxuICAgIHx8IGxhbmdUb1BsdXJhbFR5cGVbc3BsaXQuY2FsbChsb2NhbGUsIC8tLywgMSlbMF1dXG4gICAgfHwgbGFuZ1RvUGx1cmFsVHlwZS5lbjtcbn1cblxuZnVuY3Rpb24gcGx1cmFsVHlwZUluZGV4KGxvY2FsZSwgY291bnQpIHtcbiAgcmV0dXJuIHBsdXJhbFR5cGVzW3BsdXJhbFR5cGVOYW1lKGxvY2FsZSldKGNvdW50KTtcbn1cblxuZnVuY3Rpb24gZXNjYXBlKHRva2VuKSB7XG4gIHJldHVybiB0b2tlbi5yZXBsYWNlKC9bLiorP14ke30oKXxbXFxdXFxcXF0vZywgJ1xcXFwkJicpO1xufVxuXG5mdW5jdGlvbiBjb25zdHJ1Y3RUb2tlblJlZ2V4KG9wdHMpIHtcbiAgdmFyIHByZWZpeCA9IChvcHRzICYmIG9wdHMucHJlZml4KSB8fCAnJXsnO1xuICB2YXIgc3VmZml4ID0gKG9wdHMgJiYgb3B0cy5zdWZmaXgpIHx8ICd9JztcblxuICBpZiAocHJlZml4ID09PSBkZWxpbWl0ZXIgfHwgc3VmZml4ID09PSBkZWxpbWl0ZXIpIHtcbiAgICB0aHJvdyBuZXcgUmFuZ2VFcnJvcignXCInICsgZGVsaW1pdGVyICsgJ1wiIHRva2VuIGlzIHJlc2VydmVkIGZvciBwbHVyYWxpemF0aW9uJyk7XG4gIH1cblxuICByZXR1cm4gbmV3IFJlZ0V4cChlc2NhcGUocHJlZml4KSArICcoLio/KScgKyBlc2NhcGUoc3VmZml4KSwgJ2cnKTtcbn1cblxudmFyIGRvbGxhclJlZ2V4ID0gL1xcJC9nO1xudmFyIGRvbGxhckJpbGxzWWFsbCA9ICckJCc7XG52YXIgZGVmYXVsdFRva2VuUmVnZXggPSAvJVxceyguKj8pXFx9L2c7XG5cbi8vICMjIyB0cmFuc2Zvcm1QaHJhc2UocGhyYXNlLCBzdWJzdGl0dXRpb25zLCBsb2NhbGUpXG4vL1xuLy8gVGFrZXMgYSBwaHJhc2Ugc3RyaW5nIGFuZCB0cmFuc2Zvcm1zIGl0IGJ5IGNob29zaW5nIHRoZSBjb3JyZWN0XG4vLyBwbHVyYWwgZm9ybSBhbmQgaW50ZXJwb2xhdGluZyBpdC5cbi8vXG4vLyAgICAgdHJhbnNmb3JtUGhyYXNlKCdIZWxsbywgJXtuYW1lfSEnLCB7bmFtZTogJ1NwaWtlJ30pO1xuLy8gICAgIC8vIFwiSGVsbG8sIFNwaWtlIVwiXG4vL1xuLy8gVGhlIGNvcnJlY3QgcGx1cmFsIGZvcm0gaXMgc2VsZWN0ZWQgaWYgc3Vic3RpdHV0aW9ucy5zbWFydF9jb3VudFxuLy8gaXMgc2V0LiBZb3UgY2FuIHBhc3MgaW4gYSBudW1iZXIgaW5zdGVhZCBvZiBhbiBPYmplY3QgYXMgYHN1YnN0aXR1dGlvbnNgXG4vLyBhcyBhIHNob3J0Y3V0IGZvciBgc21hcnRfY291bnRgLlxuLy9cbi8vICAgICB0cmFuc2Zvcm1QaHJhc2UoJyV7c21hcnRfY291bnR9IG5ldyBtZXNzYWdlcyB8fHx8IDEgbmV3IG1lc3NhZ2UnLCB7c21hcnRfY291bnQ6IDF9LCAnZW4nKTtcbi8vICAgICAvLyBcIjEgbmV3IG1lc3NhZ2VcIlxuLy9cbi8vICAgICB0cmFuc2Zvcm1QaHJhc2UoJyV7c21hcnRfY291bnR9IG5ldyBtZXNzYWdlcyB8fHx8IDEgbmV3IG1lc3NhZ2UnLCB7c21hcnRfY291bnQ6IDJ9LCAnZW4nKTtcbi8vICAgICAvLyBcIjIgbmV3IG1lc3NhZ2VzXCJcbi8vXG4vLyAgICAgdHJhbnNmb3JtUGhyYXNlKCcle3NtYXJ0X2NvdW50fSBuZXcgbWVzc2FnZXMgfHx8fCAxIG5ldyBtZXNzYWdlJywgNSwgJ2VuJyk7XG4vLyAgICAgLy8gXCI1IG5ldyBtZXNzYWdlc1wiXG4vL1xuLy8gWW91IHNob3VsZCBwYXNzIGluIGEgdGhpcmQgYXJndW1lbnQsIHRoZSBsb2NhbGUsIHRvIHNwZWNpZnkgdGhlIGNvcnJlY3QgcGx1cmFsIHR5cGUuXG4vLyBJdCBkZWZhdWx0cyB0byBgJ2VuJ2Agd2l0aCAyIHBsdXJhbCBmb3Jtcy5cbmZ1bmN0aW9uIHRyYW5zZm9ybVBocmFzZShwaHJhc2UsIHN1YnN0aXR1dGlvbnMsIGxvY2FsZSwgdG9rZW5SZWdleCkge1xuICBpZiAodHlwZW9mIHBocmFzZSAhPT0gJ3N0cmluZycpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdQb2x5Z2xvdC50cmFuc2Zvcm1QaHJhc2UgZXhwZWN0cyBhcmd1bWVudCAjMSB0byBiZSBzdHJpbmcnKTtcbiAgfVxuXG4gIGlmIChzdWJzdGl0dXRpb25zID09IG51bGwpIHtcbiAgICByZXR1cm4gcGhyYXNlO1xuICB9XG5cbiAgdmFyIHJlc3VsdCA9IHBocmFzZTtcbiAgdmFyIGludGVycG9sYXRpb25SZWdleCA9IHRva2VuUmVnZXggfHwgZGVmYXVsdFRva2VuUmVnZXg7XG5cbiAgLy8gYWxsb3cgbnVtYmVyIGFzIGEgcGx1cmFsaXphdGlvbiBzaG9ydGN1dFxuICB2YXIgb3B0aW9ucyA9IHR5cGVvZiBzdWJzdGl0dXRpb25zID09PSAnbnVtYmVyJyA/IHsgc21hcnRfY291bnQ6IHN1YnN0aXR1dGlvbnMgfSA6IHN1YnN0aXR1dGlvbnM7XG5cbiAgLy8gU2VsZWN0IHBsdXJhbCBmb3JtOiBiYXNlZCBvbiBhIHBocmFzZSB0ZXh0IHRoYXQgY29udGFpbnMgYG5gXG4gIC8vIHBsdXJhbCBmb3JtcyBzZXBhcmF0ZWQgYnkgYGRlbGltaXRlcmAsIGEgYGxvY2FsZWAsIGFuZCBhIGBzdWJzdGl0dXRpb25zLnNtYXJ0X2NvdW50YCxcbiAgLy8gY2hvb3NlIHRoZSBjb3JyZWN0IHBsdXJhbCBmb3JtLiBUaGlzIGlzIG9ubHkgZG9uZSBpZiBgY291bnRgIGlzIHNldC5cbiAgaWYgKG9wdGlvbnMuc21hcnRfY291bnQgIT0gbnVsbCAmJiByZXN1bHQpIHtcbiAgICB2YXIgdGV4dHMgPSBzcGxpdC5jYWxsKHJlc3VsdCwgZGVsaW1pdGVyKTtcbiAgICByZXN1bHQgPSB0cmltKHRleHRzW3BsdXJhbFR5cGVJbmRleChsb2NhbGUgfHwgJ2VuJywgb3B0aW9ucy5zbWFydF9jb3VudCldIHx8IHRleHRzWzBdKTtcbiAgfVxuXG4gIC8vIEludGVycG9sYXRlOiBDcmVhdGVzIGEgYFJlZ0V4cGAgb2JqZWN0IGZvciBlYWNoIGludGVycG9sYXRpb24gcGxhY2Vob2xkZXIuXG4gIHJlc3VsdCA9IHJlcGxhY2UuY2FsbChyZXN1bHQsIGludGVycG9sYXRpb25SZWdleCwgZnVuY3Rpb24gKGV4cHJlc3Npb24sIGFyZ3VtZW50KSB7XG4gICAgaWYgKCFoYXMob3B0aW9ucywgYXJndW1lbnQpIHx8IG9wdGlvbnNbYXJndW1lbnRdID09IG51bGwpIHsgcmV0dXJuIGV4cHJlc3Npb247IH1cbiAgICAvLyBFbnN1cmUgcmVwbGFjZW1lbnQgdmFsdWUgaXMgZXNjYXBlZCB0byBwcmV2ZW50IHNwZWNpYWwgJC1wcmVmaXhlZCByZWdleCByZXBsYWNlIHRva2Vucy5cbiAgICByZXR1cm4gcmVwbGFjZS5jYWxsKG9wdGlvbnNbYXJndW1lbnRdLCBkb2xsYXJSZWdleCwgZG9sbGFyQmlsbHNZYWxsKTtcbiAgfSk7XG5cbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxuLy8gIyMjIFBvbHlnbG90IGNsYXNzIGNvbnN0cnVjdG9yXG5mdW5jdGlvbiBQb2x5Z2xvdChvcHRpb25zKSB7XG4gIHZhciBvcHRzID0gb3B0aW9ucyB8fCB7fTtcbiAgdGhpcy5waHJhc2VzID0ge307XG4gIHRoaXMuZXh0ZW5kKG9wdHMucGhyYXNlcyB8fCB7fSk7XG4gIHRoaXMuY3VycmVudExvY2FsZSA9IG9wdHMubG9jYWxlIHx8ICdlbic7XG4gIHZhciBhbGxvd01pc3NpbmcgPSBvcHRzLmFsbG93TWlzc2luZyA/IHRyYW5zZm9ybVBocmFzZSA6IG51bGw7XG4gIHRoaXMub25NaXNzaW5nS2V5ID0gdHlwZW9mIG9wdHMub25NaXNzaW5nS2V5ID09PSAnZnVuY3Rpb24nID8gb3B0cy5vbk1pc3NpbmdLZXkgOiBhbGxvd01pc3Npbmc7XG4gIHRoaXMud2FybiA9IG9wdHMud2FybiB8fCB3YXJuO1xuICB0aGlzLnRva2VuUmVnZXggPSBjb25zdHJ1Y3RUb2tlblJlZ2V4KG9wdHMuaW50ZXJwb2xhdGlvbik7XG59XG5cbi8vICMjIyBwb2x5Z2xvdC5sb2NhbGUoW2xvY2FsZV0pXG4vL1xuLy8gR2V0IG9yIHNldCBsb2NhbGUuIEludGVybmFsbHksIFBvbHlnbG90IG9ubHkgdXNlcyBsb2NhbGUgZm9yIHBsdXJhbGl6YXRpb24uXG5Qb2x5Z2xvdC5wcm90b3R5cGUubG9jYWxlID0gZnVuY3Rpb24gKG5ld0xvY2FsZSkge1xuICBpZiAobmV3TG9jYWxlKSB0aGlzLmN1cnJlbnRMb2NhbGUgPSBuZXdMb2NhbGU7XG4gIHJldHVybiB0aGlzLmN1cnJlbnRMb2NhbGU7XG59O1xuXG4vLyAjIyMgcG9seWdsb3QuZXh0ZW5kKHBocmFzZXMpXG4vL1xuLy8gVXNlIGBleHRlbmRgIHRvIHRlbGwgUG9seWdsb3QgaG93IHRvIHRyYW5zbGF0ZSBhIGdpdmVuIGtleS5cbi8vXG4vLyAgICAgcG9seWdsb3QuZXh0ZW5kKHtcbi8vICAgICAgIFwiaGVsbG9cIjogXCJIZWxsb1wiLFxuLy8gICAgICAgXCJoZWxsb19uYW1lXCI6IFwiSGVsbG8sICV7bmFtZX1cIlxuLy8gICAgIH0pO1xuLy9cbi8vIFRoZSBrZXkgY2FuIGJlIGFueSBzdHJpbmcuICBGZWVsIGZyZWUgdG8gY2FsbCBgZXh0ZW5kYCBtdWx0aXBsZSB0aW1lcztcbi8vIGl0IHdpbGwgb3ZlcnJpZGUgYW55IHBocmFzZXMgd2l0aCB0aGUgc2FtZSBrZXksIGJ1dCBsZWF2ZSBleGlzdGluZyBwaHJhc2VzXG4vLyB1bnRvdWNoZWQuXG4vL1xuLy8gSXQgaXMgYWxzbyBwb3NzaWJsZSB0byBwYXNzIG5lc3RlZCBwaHJhc2Ugb2JqZWN0cywgd2hpY2ggZ2V0IGZsYXR0ZW5lZFxuLy8gaW50byBhbiBvYmplY3Qgd2l0aCB0aGUgbmVzdGVkIGtleXMgY29uY2F0ZW5hdGVkIHVzaW5nIGRvdCBub3RhdGlvbi5cbi8vXG4vLyAgICAgcG9seWdsb3QuZXh0ZW5kKHtcbi8vICAgICAgIFwibmF2XCI6IHtcbi8vICAgICAgICAgXCJoZWxsb1wiOiBcIkhlbGxvXCIsXG4vLyAgICAgICAgIFwiaGVsbG9fbmFtZVwiOiBcIkhlbGxvLCAle25hbWV9XCIsXG4vLyAgICAgICAgIFwic2lkZWJhclwiOiB7XG4vLyAgICAgICAgICAgXCJ3ZWxjb21lXCI6IFwiV2VsY29tZVwiXG4vLyAgICAgICAgIH1cbi8vICAgICAgIH1cbi8vICAgICB9KTtcbi8vXG4vLyAgICAgY29uc29sZS5sb2cocG9seWdsb3QucGhyYXNlcyk7XG4vLyAgICAgLy8ge1xuLy8gICAgIC8vICAgJ25hdi5oZWxsbyc6ICdIZWxsbycsXG4vLyAgICAgLy8gICAnbmF2LmhlbGxvX25hbWUnOiAnSGVsbG8sICV7bmFtZX0nLFxuLy8gICAgIC8vICAgJ25hdi5zaWRlYmFyLndlbGNvbWUnOiAnV2VsY29tZSdcbi8vICAgICAvLyB9XG4vL1xuLy8gYGV4dGVuZGAgYWNjZXB0cyBhbiBvcHRpb25hbCBzZWNvbmQgYXJndW1lbnQsIGBwcmVmaXhgLCB3aGljaCBjYW4gYmUgdXNlZFxuLy8gdG8gcHJlZml4IGV2ZXJ5IGtleSBpbiB0aGUgcGhyYXNlcyBvYmplY3Qgd2l0aCBzb21lIHN0cmluZywgdXNpbmcgZG90XG4vLyBub3RhdGlvbi5cbi8vXG4vLyAgICAgcG9seWdsb3QuZXh0ZW5kKHtcbi8vICAgICAgIFwiaGVsbG9cIjogXCJIZWxsb1wiLFxuLy8gICAgICAgXCJoZWxsb19uYW1lXCI6IFwiSGVsbG8sICV7bmFtZX1cIlxuLy8gICAgIH0sIFwibmF2XCIpO1xuLy9cbi8vICAgICBjb25zb2xlLmxvZyhwb2x5Z2xvdC5waHJhc2VzKTtcbi8vICAgICAvLyB7XG4vLyAgICAgLy8gICAnbmF2LmhlbGxvJzogJ0hlbGxvJyxcbi8vICAgICAvLyAgICduYXYuaGVsbG9fbmFtZSc6ICdIZWxsbywgJXtuYW1lfSdcbi8vICAgICAvLyB9XG4vL1xuLy8gVGhpcyBmZWF0dXJlIGlzIHVzZWQgaW50ZXJuYWxseSB0byBzdXBwb3J0IG5lc3RlZCBwaHJhc2Ugb2JqZWN0cy5cblBvbHlnbG90LnByb3RvdHlwZS5leHRlbmQgPSBmdW5jdGlvbiAobW9yZVBocmFzZXMsIHByZWZpeCkge1xuICBmb3JFYWNoKG1vcmVQaHJhc2VzLCBmdW5jdGlvbiAocGhyYXNlLCBrZXkpIHtcbiAgICB2YXIgcHJlZml4ZWRLZXkgPSBwcmVmaXggPyBwcmVmaXggKyAnLicgKyBrZXkgOiBrZXk7XG4gICAgaWYgKHR5cGVvZiBwaHJhc2UgPT09ICdvYmplY3QnKSB7XG4gICAgICB0aGlzLmV4dGVuZChwaHJhc2UsIHByZWZpeGVkS2V5KTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5waHJhc2VzW3ByZWZpeGVkS2V5XSA9IHBocmFzZTtcbiAgICB9XG4gIH0sIHRoaXMpO1xufTtcblxuLy8gIyMjIHBvbHlnbG90LnVuc2V0KHBocmFzZXMpXG4vLyBVc2UgYHVuc2V0YCB0byBzZWxlY3RpdmVseSByZW1vdmUga2V5cyBmcm9tIGEgcG9seWdsb3QgaW5zdGFuY2UuXG4vL1xuLy8gICAgIHBvbHlnbG90LnVuc2V0KFwic29tZV9rZXlcIik7XG4vLyAgICAgcG9seWdsb3QudW5zZXQoe1xuLy8gICAgICAgXCJoZWxsb1wiOiBcIkhlbGxvXCIsXG4vLyAgICAgICBcImhlbGxvX25hbWVcIjogXCJIZWxsbywgJXtuYW1lfVwiXG4vLyAgICAgfSk7XG4vL1xuLy8gVGhlIHVuc2V0IG1ldGhvZCBjYW4gdGFrZSBlaXRoZXIgYSBzdHJpbmcgKGZvciB0aGUga2V5KSwgb3IgYW4gb2JqZWN0IGhhc2ggd2l0aFxuLy8gdGhlIGtleXMgdGhhdCB5b3Ugd291bGQgbGlrZSB0byB1bnNldC5cblBvbHlnbG90LnByb3RvdHlwZS51bnNldCA9IGZ1bmN0aW9uIChtb3JlUGhyYXNlcywgcHJlZml4KSB7XG4gIGlmICh0eXBlb2YgbW9yZVBocmFzZXMgPT09ICdzdHJpbmcnKSB7XG4gICAgZGVsZXRlIHRoaXMucGhyYXNlc1ttb3JlUGhyYXNlc107XG4gIH0gZWxzZSB7XG4gICAgZm9yRWFjaChtb3JlUGhyYXNlcywgZnVuY3Rpb24gKHBocmFzZSwga2V5KSB7XG4gICAgICB2YXIgcHJlZml4ZWRLZXkgPSBwcmVmaXggPyBwcmVmaXggKyAnLicgKyBrZXkgOiBrZXk7XG4gICAgICBpZiAodHlwZW9mIHBocmFzZSA9PT0gJ29iamVjdCcpIHtcbiAgICAgICAgdGhpcy51bnNldChwaHJhc2UsIHByZWZpeGVkS2V5KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGRlbGV0ZSB0aGlzLnBocmFzZXNbcHJlZml4ZWRLZXldO1xuICAgICAgfVxuICAgIH0sIHRoaXMpO1xuICB9XG59O1xuXG4vLyAjIyMgcG9seWdsb3QuY2xlYXIoKVxuLy9cbi8vIENsZWFycyBhbGwgcGhyYXNlcy4gVXNlZnVsIGZvciBzcGVjaWFsIGNhc2VzLCBzdWNoIGFzIGZyZWVpbmdcbi8vIHVwIG1lbW9yeSBpZiB5b3UgaGF2ZSBsb3RzIG9mIHBocmFzZXMgYnV0IG5vIGxvbmdlciBuZWVkIHRvXG4vLyBwZXJmb3JtIGFueSB0cmFuc2xhdGlvbi4gQWxzbyB1c2VkIGludGVybmFsbHkgYnkgYHJlcGxhY2VgLlxuUG9seWdsb3QucHJvdG90eXBlLmNsZWFyID0gZnVuY3Rpb24gKCkge1xuICB0aGlzLnBocmFzZXMgPSB7fTtcbn07XG5cbi8vICMjIyBwb2x5Z2xvdC5yZXBsYWNlKHBocmFzZXMpXG4vL1xuLy8gQ29tcGxldGVseSByZXBsYWNlIHRoZSBleGlzdGluZyBwaHJhc2VzIHdpdGggYSBuZXcgc2V0IG9mIHBocmFzZXMuXG4vLyBOb3JtYWxseSwganVzdCB1c2UgYGV4dGVuZGAgdG8gYWRkIG1vcmUgcGhyYXNlcywgYnV0IHVuZGVyIGNlcnRhaW5cbi8vIGNpcmN1bXN0YW5jZXMsIHlvdSBtYXkgd2FudCB0byBtYWtlIHN1cmUgbm8gb2xkIHBocmFzZXMgYXJlIGx5aW5nIGFyb3VuZC5cblBvbHlnbG90LnByb3RvdHlwZS5yZXBsYWNlID0gZnVuY3Rpb24gKG5ld1BocmFzZXMpIHtcbiAgdGhpcy5jbGVhcigpO1xuICB0aGlzLmV4dGVuZChuZXdQaHJhc2VzKTtcbn07XG5cblxuLy8gIyMjIHBvbHlnbG90LnQoa2V5LCBvcHRpb25zKVxuLy9cbi8vIFRoZSBtb3N0LXVzZWQgbWV0aG9kLiBQcm92aWRlIGEga2V5LCBhbmQgYHRgIHdpbGwgcmV0dXJuIHRoZVxuLy8gcGhyYXNlLlxuLy9cbi8vICAgICBwb2x5Z2xvdC50KFwiaGVsbG9cIik7XG4vLyAgICAgPT4gXCJIZWxsb1wiXG4vL1xuLy8gVGhlIHBocmFzZSB2YWx1ZSBpcyBwcm92aWRlZCBmaXJzdCBieSBhIGNhbGwgdG8gYHBvbHlnbG90LmV4dGVuZCgpYCBvclxuLy8gYHBvbHlnbG90LnJlcGxhY2UoKWAuXG4vL1xuLy8gUGFzcyBpbiBhbiBvYmplY3QgYXMgdGhlIHNlY29uZCBhcmd1bWVudCB0byBwZXJmb3JtIGludGVycG9sYXRpb24uXG4vL1xuLy8gICAgIHBvbHlnbG90LnQoXCJoZWxsb19uYW1lXCIsIHtuYW1lOiBcIlNwaWtlXCJ9KTtcbi8vICAgICA9PiBcIkhlbGxvLCBTcGlrZVwiXG4vL1xuLy8gSWYgeW91IGxpa2UsIHlvdSBjYW4gcHJvdmlkZSBhIGRlZmF1bHQgdmFsdWUgaW4gY2FzZSB0aGUgcGhyYXNlIGlzIG1pc3NpbmcuXG4vLyBVc2UgdGhlIHNwZWNpYWwgb3B0aW9uIGtleSBcIl9cIiB0byBzcGVjaWZ5IGEgZGVmYXVsdC5cbi8vXG4vLyAgICAgcG9seWdsb3QudChcImlfbGlrZV90b193cml0ZV9pbl9sYW5ndWFnZVwiLCB7XG4vLyAgICAgICBfOiBcIkkgbGlrZSB0byB3cml0ZSBpbiAle2xhbmd1YWdlfS5cIixcbi8vICAgICAgIGxhbmd1YWdlOiBcIkphdmFTY3JpcHRcIlxuLy8gICAgIH0pO1xuLy8gICAgID0+IFwiSSBsaWtlIHRvIHdyaXRlIGluIEphdmFTY3JpcHQuXCJcbi8vXG5Qb2x5Z2xvdC5wcm90b3R5cGUudCA9IGZ1bmN0aW9uIChrZXksIG9wdGlvbnMpIHtcbiAgdmFyIHBocmFzZSwgcmVzdWx0O1xuICB2YXIgb3B0cyA9IG9wdGlvbnMgPT0gbnVsbCA/IHt9IDogb3B0aW9ucztcbiAgaWYgKHR5cGVvZiB0aGlzLnBocmFzZXNba2V5XSA9PT0gJ3N0cmluZycpIHtcbiAgICBwaHJhc2UgPSB0aGlzLnBocmFzZXNba2V5XTtcbiAgfSBlbHNlIGlmICh0eXBlb2Ygb3B0cy5fID09PSAnc3RyaW5nJykge1xuICAgIHBocmFzZSA9IG9wdHMuXztcbiAgfSBlbHNlIGlmICh0aGlzLm9uTWlzc2luZ0tleSkge1xuICAgIHZhciBvbk1pc3NpbmdLZXkgPSB0aGlzLm9uTWlzc2luZ0tleTtcbiAgICByZXN1bHQgPSBvbk1pc3NpbmdLZXkoa2V5LCBvcHRzLCB0aGlzLmN1cnJlbnRMb2NhbGUsIHRoaXMudG9rZW5SZWdleCk7XG4gIH0gZWxzZSB7XG4gICAgdGhpcy53YXJuKCdNaXNzaW5nIHRyYW5zbGF0aW9uIGZvciBrZXk6IFwiJyArIGtleSArICdcIicpO1xuICAgIHJlc3VsdCA9IGtleTtcbiAgfVxuICBpZiAodHlwZW9mIHBocmFzZSA9PT0gJ3N0cmluZycpIHtcbiAgICByZXN1bHQgPSB0cmFuc2Zvcm1QaHJhc2UocGhyYXNlLCBvcHRzLCB0aGlzLmN1cnJlbnRMb2NhbGUsIHRoaXMudG9rZW5SZWdleCk7XG4gIH1cbiAgcmV0dXJuIHJlc3VsdDtcbn07XG5cblxuLy8gIyMjIHBvbHlnbG90LmhhcyhrZXkpXG4vL1xuLy8gQ2hlY2sgaWYgcG9seWdsb3QgaGFzIGEgdHJhbnNsYXRpb24gZm9yIGdpdmVuIGtleVxuUG9seWdsb3QucHJvdG90eXBlLmhhcyA9IGZ1bmN0aW9uIChrZXkpIHtcbiAgcmV0dXJuIGhhcyh0aGlzLnBocmFzZXMsIGtleSk7XG59O1xuXG4vLyBleHBvcnQgdHJhbnNmb3JtUGhyYXNlXG5Qb2x5Z2xvdC50cmFuc2Zvcm1QaHJhc2UgPSBmdW5jdGlvbiB0cmFuc2Zvcm0ocGhyYXNlLCBzdWJzdGl0dXRpb25zLCBsb2NhbGUpIHtcbiAgcmV0dXJuIHRyYW5zZm9ybVBocmFzZShwaHJhc2UsIHN1YnN0aXR1dGlvbnMsIGxvY2FsZSk7XG59O1xuXG52YXIgd2ViaXhQb2x5Z2xvdCA9IFBvbHlnbG90O1xuXG5mdW5jdGlvbiBMb2NhbGUoYXBwLCBfdmlldywgY29uZmlnKSB7XHJcbiAgICBjb25maWcgPSBjb25maWcgfHwge307XHJcbiAgICBjb25zdCBzdG9yYWdlID0gY29uZmlnLnN0b3JhZ2U7XHJcbiAgICBsZXQgbGFuZyA9IHN0b3JhZ2UgPyAoc3RvcmFnZS5nZXQoXCJsYW5nXCIpIHx8IFwiZW5cIikgOiAoY29uZmlnLmxhbmcgfHwgXCJlblwiKTtcclxuICAgIGZ1bmN0aW9uIHNldExhbmdEYXRhKG5hbWUsIGRhdGEsIHNpbGVudCkge1xyXG4gICAgICAgIGlmIChkYXRhLl9fZXNNb2R1bGUpIHtcclxuICAgICAgICAgICAgZGF0YSA9IGRhdGEuZGVmYXVsdDtcclxuICAgICAgICB9XHJcbiAgICAgICAgY29uc3QgcGNvbmZpZyA9IHsgcGhyYXNlczogZGF0YSB9O1xyXG4gICAgICAgIGlmIChjb25maWcucG9seWdsb3QpIHtcclxuICAgICAgICAgICAgYXBwLndlYml4LmV4dGVuZChwY29uZmlnLCBjb25maWcucG9seWdsb3QpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjb25zdCBwb2x5ID0gc2VydmljZS5wb2x5Z2xvdCA9IG5ldyB3ZWJpeFBvbHlnbG90KHBjb25maWcpO1xyXG4gICAgICAgIHBvbHkubG9jYWxlKG5hbWUpO1xyXG4gICAgICAgIHNlcnZpY2UuXyA9IGFwcC53ZWJpeC5iaW5kKHBvbHkudCwgcG9seSk7XHJcbiAgICAgICAgbGFuZyA9IG5hbWU7XHJcbiAgICAgICAgaWYgKHN0b3JhZ2UpIHtcclxuICAgICAgICAgICAgc3RvcmFnZS5wdXQoXCJsYW5nXCIsIGxhbmcpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoY29uZmlnLndlYml4KSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGxvY05hbWUgPSBjb25maWcud2ViaXhbbmFtZV07XHJcbiAgICAgICAgICAgIGlmIChsb2NOYW1lKSB7XHJcbiAgICAgICAgICAgICAgICBhcHAud2ViaXguaTE4bi5zZXRMb2NhbGUobG9jTmFtZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKCFzaWxlbnQpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGFwcC5yZWZyZXNoKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoKTtcclxuICAgIH1cclxuICAgIGZ1bmN0aW9uIGdldExhbmcoKSB7IHJldHVybiBsYW5nOyB9XHJcbiAgICBmdW5jdGlvbiBzZXRMYW5nKG5hbWUsIHNpbGVudCkge1xyXG4gICAgICAgIC8vIGlnbm9yZSBzZXRMYW5nIGlmIGxvYWRpbmcgYnkgcGF0aCBpcyBkaXNhYmxlZFxyXG4gICAgICAgIGlmIChjb25maWcucGF0aCA9PT0gZmFsc2UpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjb25zdCBwYXRoID0gKGNvbmZpZy5wYXRoID8gY29uZmlnLnBhdGggKyBcIi9cIiA6IFwiXCIpICsgbmFtZTtcclxuICAgICAgICBjb25zdCBkYXRhID0gcmVxdWlyZShcImpldC1sb2NhbGVzL1wiICsgcGF0aCk7XHJcbiAgICAgICAgc2V0TGFuZ0RhdGEobmFtZSwgZGF0YSwgc2lsZW50KTtcclxuICAgIH1cclxuICAgIGNvbnN0IHNlcnZpY2UgPSB7XHJcbiAgICAgICAgZ2V0TGFuZywgc2V0TGFuZywgc2V0TGFuZ0RhdGEsIF86IG51bGwsIHBvbHlnbG90OiBudWxsXHJcbiAgICB9O1xyXG4gICAgYXBwLnNldFNlcnZpY2UoXCJsb2NhbGVcIiwgc2VydmljZSk7XHJcbiAgICBzZXRMYW5nKGxhbmcsIHRydWUpO1xyXG59XG5cbmZ1bmN0aW9uIHNob3codmlldywgY29uZmlnLCB2YWx1ZSkge1xyXG4gICAgaWYgKGNvbmZpZy51cmxzKSB7XHJcbiAgICAgICAgdmFsdWUgPSBjb25maWcudXJsc1t2YWx1ZV0gfHwgdmFsdWU7XHJcbiAgICB9XHJcbiAgICBlbHNlIGlmIChjb25maWcucGFyYW0pIHtcclxuICAgICAgICB2YWx1ZSA9IHsgW2NvbmZpZy5wYXJhbV06IHZhbHVlIH07XHJcbiAgICB9XHJcbiAgICB2aWV3LnNob3codmFsdWUpO1xyXG59XHJcbmZ1bmN0aW9uIE1lbnUoYXBwLCB2aWV3LCBjb25maWcpIHtcclxuICAgIGNvbnN0IGZyYW1lID0gdmlldy5nZXRTdWJWaWV3SW5mbygpLnBhcmVudDtcclxuICAgIGNvbnN0IHVpID0gdmlldy4kJChjb25maWcuaWQgfHwgY29uZmlnKTtcclxuICAgIGxldCBzaWxlbnQgPSBmYWxzZTtcclxuICAgIHVpLmF0dGFjaEV2ZW50KFwib25jaGFuZ2VcIiwgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIGlmICghc2lsZW50KSB7XHJcbiAgICAgICAgICAgIHNob3coZnJhbWUsIGNvbmZpZywgdGhpcy5nZXRWYWx1ZSgpKTtcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxuICAgIHVpLmF0dGFjaEV2ZW50KFwib25hZnRlcnNlbGVjdFwiLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgaWYgKCFzaWxlbnQpIHtcclxuICAgICAgICAgICAgbGV0IGlkID0gbnVsbDtcclxuICAgICAgICAgICAgaWYgKHVpLnNldFZhbHVlKSB7XHJcbiAgICAgICAgICAgICAgICBpZCA9IHRoaXMuZ2V0VmFsdWUoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIGlmICh1aS5nZXRTZWxlY3RlZElkKSB7XHJcbiAgICAgICAgICAgICAgICBpZCA9IHVpLmdldFNlbGVjdGVkSWQoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBzaG93KGZyYW1lLCBjb25maWcsIGlkKTtcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxuICAgIHZpZXcub24oYXBwLCBgYXBwOnJvdXRlYCwgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIGxldCBuYW1lID0gXCJcIjtcclxuICAgICAgICBpZiAoY29uZmlnLnBhcmFtKSB7XHJcbiAgICAgICAgICAgIG5hbWUgPSB2aWV3LmdldFBhcmFtKGNvbmZpZy5wYXJhbSwgdHJ1ZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICBjb25zdCBzZWdtZW50ID0gZnJhbWUuZ2V0VXJsKClbMV07XHJcbiAgICAgICAgICAgIGlmIChzZWdtZW50KSB7XHJcbiAgICAgICAgICAgICAgICBuYW1lID0gc2VnbWVudC5wYWdlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChuYW1lKSB7XHJcbiAgICAgICAgICAgIHNpbGVudCA9IHRydWU7XHJcbiAgICAgICAgICAgIGlmICh1aS5zZXRWYWx1ZSAmJiB1aS5nZXRWYWx1ZSgpICE9PSBuYW1lKSB7XHJcbiAgICAgICAgICAgICAgICB1aS5zZXRWYWx1ZShuYW1lKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIGlmICh1aS5zZWxlY3QgJiYgdWkuZXhpc3RzKG5hbWUpICYmIHVpLmdldFNlbGVjdGVkSWQoKSAhPT0gbmFtZSkge1xyXG4gICAgICAgICAgICAgICAgdWkuc2VsZWN0KG5hbWUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHNpbGVudCA9IGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG59XG5cbmNvbnN0IGJhc2VpY29ucyA9IHtcclxuICAgIGdvb2Q6IFwiY2hlY2tcIixcclxuICAgIGVycm9yOiBcIndhcm5pbmdcIixcclxuICAgIHNhdmluZzogXCJyZWZyZXNoIGZhLXNwaW5cIlxyXG59O1xyXG5jb25zdCBiYXNldGV4dCA9IHtcclxuICAgIGdvb2Q6IFwiT2tcIixcclxuICAgIGVycm9yOiBcIkVycm9yXCIsXHJcbiAgICBzYXZpbmc6IFwiQ29ubmVjdGluZy4uLlwiXHJcbn07XHJcbmZ1bmN0aW9uIFN0YXR1cyhhcHAsIHZpZXcsIGNvbmZpZykge1xyXG4gICAgbGV0IHN0YXR1cyA9IFwiZ29vZFwiO1xyXG4gICAgbGV0IGNvdW50ID0gMDtcclxuICAgIGxldCBpc2Vycm9yID0gZmFsc2U7XHJcbiAgICBsZXQgZXhwaXJlRGVsYXkgPSBjb25maWcuZXhwaXJlO1xyXG4gICAgaWYgKCFleHBpcmVEZWxheSAmJiBleHBpcmVEZWxheSAhPT0gZmFsc2UpIHtcclxuICAgICAgICBleHBpcmVEZWxheSA9IDIwMDA7XHJcbiAgICB9XHJcbiAgICBjb25zdCB0ZXh0cyA9IGNvbmZpZy50ZXh0cyB8fCBiYXNldGV4dDtcclxuICAgIGNvbnN0IGljb25zID0gY29uZmlnLmljb25zIHx8IGJhc2VpY29ucztcclxuICAgIGlmICh0eXBlb2YgY29uZmlnID09PSBcInN0cmluZ1wiKSB7XHJcbiAgICAgICAgY29uZmlnID0geyB0YXJnZXQ6IGNvbmZpZyB9O1xyXG4gICAgfVxyXG4gICAgZnVuY3Rpb24gcmVmcmVzaChjb250ZW50KSB7XHJcbiAgICAgICAgY29uc3QgYXJlYSA9IHZpZXcuJCQoY29uZmlnLnRhcmdldCk7XHJcbiAgICAgICAgaWYgKGFyZWEpIHtcclxuICAgICAgICAgICAgaWYgKCFjb250ZW50KSB7XHJcbiAgICAgICAgICAgICAgICBjb250ZW50ID0gXCI8ZGl2IGNsYXNzPSdzdGF0dXNfXCIgK1xyXG4gICAgICAgICAgICAgICAgICAgIHN0YXR1cyArXHJcbiAgICAgICAgICAgICAgICAgICAgXCInPjxzcGFuIGNsYXNzPSd3ZWJpeF9pY29uIGZhLVwiICtcclxuICAgICAgICAgICAgICAgICAgICBpY29uc1tzdGF0dXNdICsgXCInPjwvc3Bhbj4gXCIgKyB0ZXh0c1tzdGF0dXNdICsgXCI8L2Rpdj5cIjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBhcmVhLnNldEhUTUwoY29udGVudCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgZnVuY3Rpb24gc3VjY2VzcygpIHtcclxuICAgICAgICBjb3VudC0tO1xyXG4gICAgICAgIHNldFN0YXR1cyhcImdvb2RcIik7XHJcbiAgICB9XHJcbiAgICBmdW5jdGlvbiBmYWlsKGVycikge1xyXG4gICAgICAgIGNvdW50LS07XHJcbiAgICAgICAgc2V0U3RhdHVzKFwiZXJyb3JcIiwgZXJyKTtcclxuICAgIH1cclxuICAgIGZ1bmN0aW9uIHN0YXJ0KHByb21pc2UpIHtcclxuICAgICAgICBjb3VudCsrO1xyXG4gICAgICAgIHNldFN0YXR1cyhcInNhdmluZ1wiKTtcclxuICAgICAgICBpZiAocHJvbWlzZSAmJiBwcm9taXNlLnRoZW4pIHtcclxuICAgICAgICAgICAgcHJvbWlzZS50aGVuKHN1Y2Nlc3MsIGZhaWwpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGZ1bmN0aW9uIGdldFN0YXR1cygpIHtcclxuICAgICAgICByZXR1cm4gc3RhdHVzO1xyXG4gICAgfVxyXG4gICAgZnVuY3Rpb24gaGlkZVN0YXR1cygpIHtcclxuICAgICAgICBpZiAoY291bnQgPT09IDApIHtcclxuICAgICAgICAgICAgcmVmcmVzaChcIiBcIik7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgZnVuY3Rpb24gc2V0U3RhdHVzKG1vZGUsIGVycikge1xyXG4gICAgICAgIGlmIChjb3VudCA8IDApIHtcclxuICAgICAgICAgICAgY291bnQgPSAwO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAobW9kZSA9PT0gXCJzYXZpbmdcIikge1xyXG4gICAgICAgICAgICBzdGF0dXMgPSBcInNhdmluZ1wiO1xyXG4gICAgICAgICAgICByZWZyZXNoKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICBpc2Vycm9yID0gKG1vZGUgPT09IFwiZXJyb3JcIik7XHJcbiAgICAgICAgICAgIGlmIChjb3VudCA9PT0gMCkge1xyXG4gICAgICAgICAgICAgICAgc3RhdHVzID0gaXNlcnJvciA/IFwiZXJyb3JcIiA6IFwiZ29vZFwiO1xyXG4gICAgICAgICAgICAgICAgaWYgKGlzZXJyb3IpIHtcclxuICAgICAgICAgICAgICAgICAgICBhcHAuZXJyb3IoXCJhcHA6ZXJyb3I6c2VydmVyXCIsIFtlcnIucmVzcG9uc2VUZXh0IHx8IGVycl0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGV4cGlyZURlbGF5KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoaGlkZVN0YXR1cywgZXhwaXJlRGVsYXkpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHJlZnJlc2goKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGZ1bmN0aW9uIHRyYWNrKGRhdGEpIHtcclxuICAgICAgICBjb25zdCBkcCA9IGFwcC53ZWJpeC5kcChkYXRhKTtcclxuICAgICAgICBpZiAoZHApIHtcclxuICAgICAgICAgICAgdmlldy5vbihkcCwgXCJvbkFmdGVyRGF0YVNlbmRcIiwgc3RhcnQpO1xyXG4gICAgICAgICAgICB2aWV3Lm9uKGRwLCBcIm9uQWZ0ZXJTYXZlRXJyb3JcIiwgKF9pZCwgX29iaiwgcmVzcG9uc2UpID0+IGZhaWwocmVzcG9uc2UpKTtcclxuICAgICAgICAgICAgdmlldy5vbihkcCwgXCJvbkFmdGVyU2F2ZVwiLCBzdWNjZXNzKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBhcHAuc2V0U2VydmljZShcInN0YXR1c1wiLCB7XHJcbiAgICAgICAgZ2V0U3RhdHVzLFxyXG4gICAgICAgIHNldFN0YXR1cyxcclxuICAgICAgICB0cmFja1xyXG4gICAgfSk7XHJcbiAgICBpZiAoY29uZmlnLnJlbW90ZSkge1xyXG4gICAgICAgIHZpZXcub24oYXBwLndlYml4LCBcIm9uUmVtb3RlQ2FsbFwiLCBzdGFydCk7XHJcbiAgICB9XHJcbiAgICBpZiAoY29uZmlnLmFqYXgpIHtcclxuICAgICAgICB2aWV3Lm9uKGFwcC53ZWJpeCwgXCJvbkJlZm9yZUFqYXhcIiwgKF9tb2RlLCBfdXJsLCBfZGF0YSwgX3JlcXVlc3QsIF9oZWFkZXJzLCBfZmlsZXMsIHByb21pc2UpID0+IHtcclxuICAgICAgICAgICAgc3RhcnQocHJvbWlzZSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICBpZiAoY29uZmlnLmRhdGEpIHtcclxuICAgICAgICB0cmFjayhjb25maWcuZGF0YSk7XHJcbiAgICB9XHJcbn1cblxuZnVuY3Rpb24gVGhlbWUoYXBwLCBfdmlldywgY29uZmlnKSB7XHJcbiAgICBjb25maWcgPSBjb25maWcgfHwge307XHJcbiAgICBjb25zdCBzdG9yYWdlID0gY29uZmlnLnN0b3JhZ2U7XHJcbiAgICBsZXQgdGhlbWUgPSBzdG9yYWdlID9cclxuICAgICAgICAoc3RvcmFnZS5nZXQoXCJ0aGVtZVwiKSB8fCBcImZsYXQtZGVmYXVsdFwiKVxyXG4gICAgICAgIDpcclxuICAgICAgICAgICAgKGNvbmZpZy50aGVtZSB8fCBcImZsYXQtZGVmYXVsdFwiKTtcclxuICAgIGNvbnN0IHNlcnZpY2UgPSB7XHJcbiAgICAgICAgZ2V0VGhlbWUoKSB7IHJldHVybiB0aGVtZTsgfSxcclxuICAgICAgICBzZXRUaGVtZShuYW1lLCBzaWxlbnQpIHtcclxuICAgICAgICAgICAgY29uc3QgcGFydHMgPSBuYW1lLnNwbGl0KFwiLVwiKTtcclxuICAgICAgICAgICAgY29uc3QgbGlua3MgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZShcImxpbmtcIik7XHJcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbGlua3MubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGxuYW1lID0gbGlua3NbaV0uZ2V0QXR0cmlidXRlKFwidGl0bGVcIik7XHJcbiAgICAgICAgICAgICAgICBpZiAobG5hbWUpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAobG5hbWUgPT09IG5hbWUgfHwgbG5hbWUgPT09IHBhcnRzWzBdKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxpbmtzW2ldLmRpc2FibGVkID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsaW5rc1tpXS5kaXNhYmxlZCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGFwcC53ZWJpeC5za2luLnNldChwYXJ0c1swXSk7XHJcbiAgICAgICAgICAgIC8vIHJlbW92ZSBvbGQgY3NzXHJcbiAgICAgICAgICAgIGFwcC53ZWJpeC5odG1sLnJlbW92ZUNzcyhkb2N1bWVudC5ib2R5LCBcInRoZW1lLVwiICsgdGhlbWUpO1xyXG4gICAgICAgICAgICAvLyBhZGQgbmV3IGNzc1xyXG4gICAgICAgICAgICBhcHAud2ViaXguaHRtbC5hZGRDc3MoZG9jdW1lbnQuYm9keSwgXCJ0aGVtZS1cIiArIG5hbWUpO1xyXG4gICAgICAgICAgICB0aGVtZSA9IG5hbWU7XHJcbiAgICAgICAgICAgIGlmIChzdG9yYWdlKSB7XHJcbiAgICAgICAgICAgICAgICBzdG9yYWdlLnB1dChcInRoZW1lXCIsIG5hbWUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmICghc2lsZW50KSB7XHJcbiAgICAgICAgICAgICAgICBhcHAucmVmcmVzaCgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuICAgIGFwcC5zZXRTZXJ2aWNlKFwidGhlbWVcIiwgc2VydmljZSk7XHJcbiAgICBzZXJ2aWNlLnNldFRoZW1lKHRoZW1lLCB0cnVlKTtcclxufVxuXG5mdW5jdGlvbiBjb3B5UGFyYW1zKGRhdGEsIHVybCwgcm91dGUpIHtcclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcm91dGUubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICBkYXRhW3JvdXRlW2ldXSA9IHVybFtpICsgMV0gPyB1cmxbaSArIDFdLnBhZ2UgOiBcIlwiO1xyXG4gICAgfVxyXG59XHJcbmZ1bmN0aW9uIFVybFBhcmFtKGFwcCwgdmlldywgY29uZmlnKSB7XHJcbiAgICBjb25zdCByb3V0ZSA9IGNvbmZpZy5yb3V0ZSB8fCBjb25maWc7XHJcbiAgICBjb25zdCBkYXRhID0ge307XHJcbiAgICB2aWV3Lm9uKGFwcCwgXCJhcHA6dXJsY2hhbmdlXCIsIGZ1bmN0aW9uIChzdWJ2aWV3LCBzZWdtZW50KSB7XHJcbiAgICAgICAgaWYgKHZpZXcgPT09IHN1YnZpZXcpIHtcclxuICAgICAgICAgICAgY29weVBhcmFtcyhkYXRhLCBzZWdtZW50LnN1YnVybCgpLCByb3V0ZSk7XHJcbiAgICAgICAgICAgIHNlZ21lbnQuc2l6ZShyb3V0ZS5sZW5ndGggKyAxKTtcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxuICAgIGNvbnN0IG9zID0gdmlldy5zZXRQYXJhbTtcclxuICAgIGNvbnN0IG9nID0gdmlldy5nZXRQYXJhbTtcclxuICAgIHZpZXcuc2V0UGFyYW0gPSBmdW5jdGlvbiAobmFtZSwgdmFsdWUsIHNob3cpIHtcclxuICAgICAgICBjb25zdCBpbmRleCA9IHJvdXRlLmluZGV4T2YobmFtZSk7XHJcbiAgICAgICAgaWYgKGluZGV4ID49IDApIHtcclxuICAgICAgICAgICAgZGF0YVtuYW1lXSA9IHZhbHVlO1xyXG4gICAgICAgICAgICB0aGlzLl9zZWdtZW50LnVwZGF0ZShcIlwiLCB2YWx1ZSwgaW5kZXggKyAxKTtcclxuICAgICAgICAgICAgaWYgKHNob3cpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiB2aWV3LnNob3cobnVsbCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIHJldHVybiBvcy5jYWxsKHRoaXMsIG5hbWUsIHZhbHVlLCBzaG93KTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG4gICAgdmlldy5nZXRQYXJhbSA9IGZ1bmN0aW9uIChrZXksIG1vZGUpIHtcclxuICAgICAgICBjb25zdCB2YWwgPSBkYXRhW2tleV07XHJcbiAgICAgICAgaWYgKHR5cGVvZiB2YWwgIT09IFwidW5kZWZpbmVkXCIpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHZhbDtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIG9nLmNhbGwodGhpcywga2V5LCBtb2RlKTtcclxuICAgIH07XHJcbiAgICBjb3B5UGFyYW1zKGRhdGEsIHZpZXcuZ2V0VXJsKCksIHJvdXRlKTtcclxufVxuXG5mdW5jdGlvbiBVc2VyKGFwcCwgX3ZpZXcsIGNvbmZpZykge1xyXG4gICAgY29uZmlnID0gY29uZmlnIHx8IHt9O1xyXG4gICAgY29uc3QgbG9naW4gPSBjb25maWcubG9naW4gfHwgXCIvbG9naW5cIjtcclxuICAgIGNvbnN0IGxvZ291dCA9IGNvbmZpZy5sb2dvdXQgfHwgXCIvbG9nb3V0XCI7XHJcbiAgICBjb25zdCBhZnRlckxvZ2luID0gY29uZmlnLmFmdGVyTG9naW4gfHwgYXBwLmNvbmZpZy5zdGFydDtcclxuICAgIGNvbnN0IGFmdGVyTG9nb3V0ID0gY29uZmlnLmFmdGVyTG9nb3V0IHx8IFwiL2xvZ2luXCI7XHJcbiAgICBjb25zdCBwaW5nID0gY29uZmlnLnBpbmcgfHwgNSAqIDYwICogMTAwMDtcclxuICAgIGNvbnN0IG1vZGVsID0gY29uZmlnLm1vZGVsO1xyXG4gICAgbGV0IHVzZXIgPSBjb25maWcudXNlcjtcclxuICAgIGNvbnN0IHNlcnZpY2UgPSB7XHJcbiAgICAgICAgZ2V0VXNlcigpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHVzZXI7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBnZXRTdGF0dXMoc2VydmVyKSB7XHJcbiAgICAgICAgICAgIGlmICghc2VydmVyKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdXNlciAhPT0gbnVsbDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gbW9kZWwuc3RhdHVzKCkuY2F0Y2goKCkgPT4gbnVsbCkudGhlbihkYXRhID0+IHtcclxuICAgICAgICAgICAgICAgIHVzZXIgPSBkYXRhO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIGxvZ2luKG5hbWUsIHBhc3MpIHtcclxuICAgICAgICAgICAgcmV0dXJuIG1vZGVsLmxvZ2luKG5hbWUsIHBhc3MpLnRoZW4oZGF0YSA9PiB7XHJcbiAgICAgICAgICAgICAgICB1c2VyID0gZGF0YTtcclxuICAgICAgICAgICAgICAgIGlmICghZGF0YSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIkFjY2VzcyBkZW5pZWRcIik7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBhcHAuY2FsbEV2ZW50KFwiYXBwOnVzZXI6bG9naW5cIiwgW3VzZXJdKTtcclxuICAgICAgICAgICAgICAgIGFwcC5zaG93KGFmdGVyTG9naW4pO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIGxvZ291dCgpIHtcclxuICAgICAgICAgICAgdXNlciA9IG51bGw7XHJcbiAgICAgICAgICAgIHJldHVybiBtb2RlbC5sb2dvdXQoKS50aGVuKHJlcyA9PiB7XHJcbiAgICAgICAgICAgICAgICBhcHAuY2FsbEV2ZW50KFwiYXBwOnVzZXI6bG9nb3V0XCIsIFtdKTtcclxuICAgICAgICAgICAgICAgIHJldHVybiByZXM7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcbiAgICBmdW5jdGlvbiBjYW5OYXZpZ2F0ZSh1cmwsIG9iaikge1xyXG4gICAgICAgIGlmICh1cmwgPT09IGxvZ291dCkge1xyXG4gICAgICAgICAgICBzZXJ2aWNlLmxvZ291dCgpO1xyXG4gICAgICAgICAgICBvYmoucmVkaXJlY3QgPSBhZnRlckxvZ291dDtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZiAodXJsICE9PSBsb2dpbiAmJiAhc2VydmljZS5nZXRTdGF0dXMoKSkge1xyXG4gICAgICAgICAgICBvYmoucmVkaXJlY3QgPSBsb2dpbjtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBhcHAuc2V0U2VydmljZShcInVzZXJcIiwgc2VydmljZSk7XHJcbiAgICBhcHAuYXR0YWNoRXZlbnQoYGFwcDpndWFyZGAsIGZ1bmN0aW9uICh1cmwsIF8kcm9vdCwgb2JqKSB7XHJcbiAgICAgICAgaWYgKGNvbmZpZy5wdWJsaWMgJiYgY29uZmlnLnB1YmxpYyh1cmwpKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodHlwZW9mIHVzZXIgPT09IFwidW5kZWZpbmVkXCIpIHtcclxuICAgICAgICAgICAgb2JqLmNvbmZpcm0gPSBzZXJ2aWNlLmdldFN0YXR1cyh0cnVlKS50aGVuKCgpID0+IGNhbk5hdmlnYXRlKHVybCwgb2JqKSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBjYW5OYXZpZ2F0ZSh1cmwsIG9iaik7XHJcbiAgICB9KTtcclxuICAgIGlmIChwaW5nKSB7XHJcbiAgICAgICAgc2V0SW50ZXJ2YWwoKCkgPT4gc2VydmljZS5nZXRTdGF0dXModHJ1ZSksIHBpbmcpO1xyXG4gICAgfVxyXG59XG5cbi8qXHJcbk1JVCBMaWNlbnNlXHJcbkNvcHlyaWdodCAoYykgMjAxOSBYQiBTb2Z0d2FyZVxyXG4qL1xyXG5sZXQgd2ViaXggPSB3aW5kb3cud2ViaXg7XHJcbmlmICh3ZWJpeCkge1xyXG4gICAgcGF0Y2god2ViaXgpO1xyXG59XHJcbmNvbnN0IHBsdWdpbnMgPSB7XHJcbiAgICBVbmxvYWRHdWFyZCwgTG9jYWxlLCBNZW51LCBUaGVtZSwgVXNlciwgU3RhdHVzLCBVcmxQYXJhbVxyXG59O1xyXG5jb25zdCBlcnJvcnMgPSB7IE5hdmlnYXRpb25CbG9ja2VkIH07XHJcbmNvbnN0IHcgPSB3aW5kb3c7XHJcbmlmICghdy5Qcm9taXNlKSB7XHJcbiAgICB3LlByb21pc2UgPSB3LndlYml4LnByb21pc2U7XHJcbn1cblxuZXhwb3J0IHsgcGx1Z2lucywgZXJyb3JzLCBKZXRBcHAsIEpldFZpZXcsIEhhc2hSb3V0ZXIsIFN0b3JlUm91dGVyLCBVcmxSb3V0ZXIsIEVtcHR5Um91dGVyLCBTdWJSb3V0ZXIgfTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWpldC5qcy5tYXBcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL25vZGVfbW9kdWxlcy93ZWJpeC1qZXQvZGlzdC9lczYvamV0LmpzIiwiaW1wb3J0IHsgSmV0VmlldyB9IGZyb20gXCJ3ZWJpeC1qZXRcIjtcbmltcG9ydCB7IHBhY2thZ2VzIH0gZnJvbSBcIi4uLy4uL3NlcnZpY2VzL3BhY2thZ2VzXCI7XG5cbmNvbnN0IFNUQVRVU19JTlNUQUxMRUQgPSAzO1xuXG5leHBvcnQgY2xhc3MgRXh0ZXJuYWxWaWV3IGV4dGVuZHMgSmV0VmlldyB7XG4gICAgY29uc3RydWN0b3IoYXBwLCBuYW1lLCB0YXJnZXRVcmwsIHJlcXVpcmVkUGFja2FnZXMpIHtcbiAgICAgICAgc3VwZXIoYXBwLCBuYW1lKTtcblxuICAgICAgICB0aGlzLnRhcmdldFVybCA9IHRhcmdldFVybCB8fCBcIi9cIjtcbiAgICAgICAgdGhpcy5yZXF1aXJlZFBhY2thZ2VzID0gcmVxdWlyZWRQYWNrYWdlcyB8fCB7fTsgLy8gcmVxdWlyZWQgcGFja2FnZXMgYXMgbmFtZTogZ2l0X3VybCBwYWlyc1xuICAgIH1cblxuICAgIGNvbmZpZygpIHtcbiAgICAgICAgY29uc3Qgc2VsZiA9IHRoaXM7XG4gICAgICAgIGNvbnN0IGlmcmFtZSA9IHtcbiAgICAgICAgICAgIHZpZXc6IFwiaWZyYW1lXCIsXG4gICAgICAgICAgICBsb2NhbElkOiBcImlmcmFtZS1leHRlcm5hbFwiLFxuICAgICAgICAgICAgb246IHtcbiAgICAgICAgICAgICAgICBvbkFmdGVyTG9hZDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5oaWRlUHJvZ3Jlc3MpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuaGlkZVByb2dyZXNzKCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgdGhpcy5lbmFibGUoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG5cbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHJvd3M6IFt7XG4gICAgICAgICAgICAgICAgbG9jYWxJZDogXCJpbnN0YWxsLXBhY2thZ2VzXCIsXG4gICAgICAgICAgICAgICAgaGlkZGVuOiB0cnVlLFxuICAgICAgICAgICAgICAgIGNvbHM6IFtcbiAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgbG9jYWxJZDogXCJyZXF1aXJlZF9wYWNrYWdlc19kaXZcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIHZpZXc6IFwidGVtcGxhdGVcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIGF1dG9oZWlnaHQ6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZpZXc6IFwiYnV0dG9uXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBsb2NhbElkOiBcImluc3RhbGxfYnRuXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZTogXCJJbnN0YWxsIHJlcXVpcmVkIHBhY2thZ2VzXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBjc3M6IFwid2ViaXhfcHJpbWFyeVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgaGVpZ2h0OiA1MCxcbiAgICAgICAgICAgICAgICAgICAgICAgIGNsaWNrOiBzZWxmLmluc3RhbGxSZXF1aXJlZFBhY2thZ2VzLmJpbmQoc2VsZilcbiAgICAgICAgICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmlldzogXCJidXR0b25cIixcbiAgICAgICAgICAgICAgICAgICAgICAgIGxvY2FsSWQ6IFwiZ29fdG9fcGFja2FnZXNfYnRuXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZTogXCJHbyB0byBwYWNrYWdlcyBhbmQgaW5zdGFsbCB0aGVtIG1hbnVhbGx5XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBjc3M6IFwid2ViaXhfcHJpbWFyeVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgaGVpZ2h0OiA1MCxcbiAgICAgICAgICAgICAgICAgICAgICAgIGNsaWNrOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy4kc2NvcGUuc2hvdyhcIi9tYWluL3BhY2thZ2VzXCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgfSwgaWZyYW1lXVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgaW5zdGFsbFJlcXVpcmVkUGFja2FnZXMoKSB7XG4gICAgICAgIGxldCBwcm9taXNlcyA9IE9iamVjdC52YWx1ZXModGhpcy5wYWNrYWdlc1RvSW5zdGFsbCkubWFwKChwYXRoKSA9PiB7XG4gICAgICAgICAgICAvLyBhZGQgYnkgZ2l0IHVybFxuICAgICAgICAgICAgcmV0dXJuIHBhY2thZ2VzLmFkZChudWxsLCBwYXRoKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgdGhpcy5pbnN0YWxsQnV0dG9uLmRpc2FibGUoKTtcbiAgICAgICAgUHJvbWlzZS5hbGwocHJvbWlzZXMpLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgd2ViaXgubWVzc2FnZSh7IHR5cGU6IFwic3VjY2Vzc1wiLCB0ZXh0OiBcIkFsbCByZXF1aXJlZCBwYWNrYWdlcyBpbnN0YWxsZWQgc3VjY2Vzc2Z1bGx5LCBwYWdlIHdpbGwgYmUgcmVsb2FkZWQgaW4gMiBzZWNvbmRzXCIgfSk7XG4gICAgICAgICAgICBzZXRJbnRlcnZhbCgoKSA9PiB3aW5kb3cubG9jYXRpb24ucmVsb2FkKHRydWUpLCAyMDAwKTtcbiAgICAgICAgfSkuY2F0Y2goKCkgPT4ge1xuICAgICAgICAgICAgd2ViaXgubWVzc2FnZSh7IHR5cGU6IFwiZXJyb3JcIiwgdGV4dDogXCJBbiBlcnJvciBvY2N1cnJlZCwgcGxlYXNlIHRyeSBpbnN0YWxsaW5nIGZyb20gcGFja2FnZXMgZm9yIG1vcmUgZGV0YWlsc1wiIH0pO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBzaG93SWZyYW1lKCkge1xuICAgICAgICB0aGlzLmV4dGVybmFsSWZyYW1lLnNob3coKTtcbiAgICAgICAgdGhpcy5leHRlcm5hbElmcmFtZS5zaG93UHJvZ3Jlc3MoeyB0eXBlOiBcImljb25cIiB9KTtcbiAgICAgICAgdGhpcy5leHRlcm5hbElmcmFtZS5sb2FkKHRoaXMudGFyZ2V0VXJsKTtcbiAgICB9XG5cbiAgICBpbml0KHZpZXcpIHtcbiAgICAgICAgdGhpcy5leHRlcm5hbElmcmFtZSA9IHRoaXMuJCQoXCJpZnJhbWUtZXh0ZXJuYWxcIik7XG4gICAgICAgIHRoaXMuZXh0ZXJuYWxJZnJhbWUuZGlzYWJsZSgpO1xuICAgICAgICB3ZWJpeC5leHRlbmQodGhpcy5leHRlcm5hbElmcmFtZSwgd2ViaXguUHJvZ3Jlc3NCYXIpO1xuXG4gICAgICAgIHRoaXMucGFja2FnZU5hbWVzID0gT2JqZWN0LmtleXModGhpcy5yZXF1aXJlZFBhY2thZ2VzKTsgLy8gb25seSBuYW1lc1xuXG4gICAgICAgIGlmICghdGhpcy5wYWNrYWdlTmFtZXMubGVuZ3RoKSB7XG4gICAgICAgICAgICB0aGlzLnNob3dJZnJhbWUoKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMucmVxdWlyZWRQYWNrYWdlc0RpdiA9IHRoaXMuJCQoXCJyZXF1aXJlZF9wYWNrYWdlc19kaXZcIik7XG4gICAgICAgIHRoaXMuaW5zdGFsbFBhY2thZ2VDb250YWluZXIgPSB0aGlzLiQkKFwiaW5zdGFsbC1wYWNrYWdlc1wiKTtcbiAgICAgICAgdGhpcy5pbnN0YWxsQnV0dG9uID0gdGhpcy4kJChcImluc3RhbGxfYnRuXCIpO1xuXG4gICAgICAgIC8vIGNoZWNrIHdoaWNoIHBhY2thZ2VzIHRvIGluc3RhbGxcbiAgICAgICAgdGhpcy5wYWNrYWdlc1RvSW5zdGFsbCA9IHt9O1xuICAgICAgICAvLyB0cnkgdG8gZ2V0IGluZm8gYWJvdXQgcmVxdWlyZWQgcGFja2FnZXNcbiAgICAgICAgLy8gaWYgYW55IGlzIGFscmVhZHkgcmVnaXN0ZXJlZCBhbmQgaW5zdGFsbGVkLCB0aGVuIGp1c3QgaWdub3JlIGl0XG4gICAgICAgIHBhY2thZ2VzLmdldFN0YXR1cyh0aGlzLnBhY2thZ2VOYW1lcykudGhlbihkYXRhID0+IHtcbiAgICAgICAgICAgIGNvbnN0IHBhY2thZ2VTdGF0ZXMgPSBkYXRhLmpzb24oKTtcblxuICAgICAgICAgICAgLy8gbm93IGdvIG92ZXIgcmVxdWlyZWQgcGFja2FnZXNcbiAgICAgICAgICAgIGZvciAobGV0IG5hbWUgb2YgdGhpcy5wYWNrYWdlTmFtZXMpIHtcbiAgICAgICAgICAgICAgICAvLyBjaGVjayBpZiBhIHJlcXVpcmVkIHBhY2thZ2UgaXMgcmVnaXN0ZXJlZCBhbmQgaW5zdGFsbGVkXG4gICAgICAgICAgICAgICAgaWYgKHBhY2thZ2VTdGF0ZXNbbmFtZV0gPT0gU1RBVFVTX0lOU1RBTExFRCkge1xuICAgICAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICB0aGlzLnBhY2thZ2VzVG9JbnN0YWxsW25hbWVdID0gdGhpcy5yZXF1aXJlZFBhY2thZ2VzW25hbWVdO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyBjaGVjayBwYWNrYWdlcyB0byBiZSBpbnN0YWxsZWQgYWdhaW4gaWYgc3RpbGwgbmVlZCB0byBpbnN0YWxsIGFueSBvZiB0aGVtXG4gICAgICAgICAgICBjb25zdCBwYWNrYWdlTmFtZXNUb0luc3RhbGwgPSBPYmplY3Qua2V5cyh0aGlzLnBhY2thZ2VzVG9JbnN0YWxsKTtcbiAgICAgICAgICAgIGlmIChwYWNrYWdlTmFtZXNUb0luc3RhbGwubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5pbnN0YWxsUGFja2FnZUNvbnRhaW5lci5zaG93KCk7XG4gICAgICAgICAgICAgICAgdGhpcy5leHRlcm5hbElmcmFtZS5oaWRlKCk7XG5cbiAgICAgICAgICAgICAgICBjb25zdCBuYW1lcyA9IHBhY2thZ2VOYW1lc1RvSW5zdGFsbC5qb2luKFwiLCBcIik7XG4gICAgICAgICAgICAgICAgdGhpcy5yZXF1aXJlZFBhY2thZ2VzRGl2LnNldEhUTUwoXG4gICAgICAgICAgICAgICAgICAgIGA8ZGl2IHN0eWxlPSd3aWR0aDphdXRvO3RleHQtYWxpZ246Y2VudGVyJz48aDM+WW91IG5lZWQgdG8gaW5zdGFsbCB0aGUgZm9sbG93aW5nIHJlcXVpcmVkIHBhY2thZ2VzOiAke25hbWVzfTxoMy8+PC9kaXY+YFxuICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMuaW5zdGFsbFBhY2thZ2VDb250YWluZXIuaGlkZSgpO1xuICAgICAgICAgICAgICAgIHRoaXMuc2hvd0lmcmFtZSgpXG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cblxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc291cmNlcy92aWV3cy9leHRlcm5hbC9pbmRleC5qcyIsImNvbnN0IGFqYXggPSB3ZWJpeC5hamF4KCkuaGVhZGVycyh7IFwiQ29udGVudC1UeXBlXCI6IFwiYXBwbGljYXRpb24vanNvblwiIH0pO1xuXG5leHBvcnQgY2xhc3MgU2VydmljZSB7XG4gICAgY29uc3RydWN0b3IoYmFzZVVybCkge1xuICAgICAgICB0aGlzLmJhc2VVcmwgPSBiYXNlVXJsO1xuICAgIH1cblxuICAgIGpvaW5VcmwodXJsKSB7XG4gICAgICAgIGlmICh0aGlzLmJhc2VVcmwpIHtcbiAgICAgICAgICAgIHJldHVybiBgJHt0aGlzLmJhc2VVcmx9LyR7dXJsfWA7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHVybDtcbiAgICB9XG5cbiAgICBjYWxsKG1ldGhvZCwgdXJsLCBhcmdzKSB7XG4gICAgICAgIG1ldGhvZCA9IG1ldGhvZC50b0xvd2VyQ2FzZSgpO1xuICAgICAgICB1cmwgPSB0aGlzLmpvaW5VcmwodXJsKTtcblxuICAgICAgICBpZiAoYXJncykge1xuICAgICAgICAgICAgYXJncyA9IHsgYXJnczogYXJncyB9O1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgYXJncyA9IHt9O1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKG1ldGhvZCA9PT0gXCJnZXRcIikge1xuICAgICAgICAgICAgcmV0dXJuIGFqYXguZ2V0KHVybCwgYXJncyk7XG4gICAgICAgIH0gZWxzZSBpZiAobWV0aG9kID09IFwicG9zdFwiKSB7XG4gICAgICAgICAgICByZXR1cm4gYWpheC5wb3N0KHVybCwgYXJncyk7XG4gICAgICAgIH1cblxuICAgICAgICB0aHJvdyBWYWx1ZUVycm9yKGAke21ldGhvZH0gaXMgbm90IHN1cHBvcnRlZGApO1xuICAgIH1cblxuICAgIGdldENhbGwodXJsLCBhcmdzKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmNhbGwoXCJnZXRcIiwgdXJsLCBhcmdzKTtcbiAgICB9XG5cbiAgICBwb3N0Q2FsbCh1cmwsIGFyZ3MpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuY2FsbChcInBvc3RcIiwgdXJsLCBhcmdzKTtcbiAgICB9XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zb3VyY2VzL2NvbW1vbi9hcGkuanMiLCJpbXBvcnQgeyBKZXRWaWV3IH0gZnJvbSBcIndlYml4LWpldFwiO1xuXG5pbXBvcnQgeyBhbnNpVXAgfSBmcm9tIFwiLi4vLi4vY29tbW9uL2NvbG9yc1wiO1xuXG5leHBvcnQgY2xhc3MgRXJyb3JWaWV3IGV4dGVuZHMgSmV0VmlldyB7XG4gICAgY29uZmlnKCkge1xuICAgICAgICBjb25zdCBtZXNzYWdlID0ge1xuICAgICAgICAgICAgdmlldzogXCJ0ZW1wbGF0ZVwiLFxuICAgICAgICAgICAgaWQ6IFwiZXJyb3JfdGVtcGxhdGVcIixcbiAgICAgICAgICAgIHRlbXBsYXRlOiBcIlwiLFxuICAgICAgICAgICAgc2Nyb2xsOiBcInh5XCJcbiAgICAgICAgfTtcblxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgdmlldzogXCJ3aW5kb3dcIixcbiAgICAgICAgICAgIGhlYWQ6IFwiRXJyb3JcIixcbiAgICAgICAgICAgIG1vZGFsOiB0cnVlLFxuICAgICAgICAgICAgd2lkdGg6IHdpbmRvdy5pbm5lcldpZHRoICogLjgsXG4gICAgICAgICAgICBoZWlnaHQ6IHdpbmRvdy5pbm5lckhlaWdodCAqIC44LFxuICAgICAgICAgICAgcG9zaXRpb246IFwiY2VudGVyXCIsXG4gICAgICAgICAgICBib2R5OiB7XG4gICAgICAgICAgICAgICAgcm93czogW1xuICAgICAgICAgICAgICAgICAgICBtZXNzYWdlLFxuICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICB2aWV3OiBcImJ1dHRvblwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU6IFwiT0tcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIGNzczogXCJ3ZWJpeF9wcmltYXJ5XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBjbGljazogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZ2V0VG9wUGFyZW50VmlldygpLmhpZGUoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIGluaXQoKSB7XG4gICAgICAgIHRoaXMubWVzc2FnZSA9ICQkKFwiZXJyb3JfdGVtcGxhdGVcIik7XG4gICAgfVxuXG4gICAgc2hvd0Vycm9yKG1lc3NhZ2UsIGhlYWQpIHtcbiAgICAgICAgdGhpcy5tZXNzYWdlLnNldEhUTUwoYDxwPiR7YW5zaVVwLmFuc2lfdG9faHRtbChtZXNzYWdlKX08L3A+YCk7XG4gICAgICAgIGlmIChoZWFkKSB7XG4gICAgICAgICAgICB0aGlzLm1lc3NhZ2UuZ2V0SGVhZCgpLnNldEhUTUwoaGVhZCk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmdldFJvb3QoKS5zaG93KCk7XG4gICAgfVxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc291cmNlcy92aWV3cy9lcnJvcnMvZGlhbG9nLmpzIiwiZXhwb3J0IGNvbnN0IGRhdGVGb3JtYXQgPSBcIiVZLSVtLSVkICVHOiVpOiVzXCI7XG5cbmV4cG9ydCBjb25zdCB3ZWJpeERhdGVGb3JtYXR0ZXIgPSB3ZWJpeC5EYXRlLmRhdGVUb1N0cihkYXRlRm9ybWF0KTtcblxuZXhwb3J0IGNvbnN0IGRhdGVGb3JtYXR0ZXIgPSBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAvLyBmb3JtYXQgZXBvY2ggdGltZXN0YW1wc1xuICAgIGlmICh2YWx1ZSBpbnN0YW5jZW9mIFN0cmluZykge1xuICAgICAgICB2YWx1ZSA9IHBhcnNlSW50KHZhbHVlKTtcbiAgICB9XG5cbiAgICByZXR1cm4gd2ViaXhEYXRlRm9ybWF0dGVyKG5ldyBEYXRlKHZhbHVlICogMTAwMCkpO1xufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc291cmNlcy9jb21tb24vZm9ybWF0dGVycy5qcyIsImltcG9ydCB7IFNlcnZpY2UgfSBmcm9tIFwiLi4vY29tbW9uL2FwaVwiO1xuXG5jb25zdCBCQVNFX1VSTCA9IFwiL3plcm9ib3QvYWRtaW4vYWN0b3JzL2hlYWx0aFwiO1xuXG5jbGFzcyBIZWFsdGhTZXJ2aWNlIGV4dGVuZHMgU2VydmljZSB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHN1cGVyKEJBU0VfVVJMKTtcbiAgICB9XG5cbiAgICBnZXREaXNrU3BhY2UoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmdldENhbGwoXCJnZXRfZGlza19zcGFjZVwiKTtcbiAgICB9XG5cbiAgICBnZXRIZWFsdGgoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmdldENhbGwoXCJoZWFsdGhcIik7XG4gICAgfVxuXG4gICAgZ2V0SWRlbnRpdHkoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmdldENhbGwoXCJnZXRfaWRlbnRpdHlcIik7XG4gICAgfVxuXG4gICAgZ2V0TmV0d29ya0luZm8oKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmdldENhbGwoXCJuZXR3b3JrX2luZm9cIik7XG4gICAgfVxuXG4gICAgZ2V0SnN4VmVyc2lvbigpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0Q2FsbChcImpzeF92ZXJzaW9uXCIpO1xuICAgIH1cblxuICAgIGdldFJ1bm5pbmdQcm9jZXNzZXMoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmdldENhbGwoXCJnZXRfcnVubmluZ19wcm9jZXNzZXNcIik7XG4gICAgfVxuXG4gICAgZ2V0UnVubmluZ1BvcnRzKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5nZXRDYWxsKFwiZ2V0X3J1bm5pbmdfcG9ydHNcIik7XG4gICAgfVxuXG4gICAga2lsbFByb2Nlc3Nlc0J5UGlkKHBpZHMpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucG9zdENhbGwoJ2tpbGxfcHJvY2Vzc2VzX2J5X3BpZCcsIHtwaWRzfSlcbiAgICB9XG5cbiAgICBraWxsUHJvY2Vzc2VzQnlQb3J0KHBvcnRzKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnBvc3RDYWxsKCdraWxsX3Byb2Nlc3Nlc19ieV9wb3J0Jywge3BvcnRzfSlcbiAgICB9XG5cbiAgICBnZXRQcm9jZXNzRGV0YWlscyhwaWQpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucG9zdENhbGwoJ2dldF9wcm9jZXNzX2RldGFpbHMnLCB7cGlkfSlcbiAgICB9XG59XG5cbmV4cG9ydCBjb25zdCBoZWFsdGggPSBuZXcgSGVhbHRoU2VydmljZSgpO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc291cmNlcy9zZXJ2aWNlcy9oZWFsdGguanMiLCJpbXBvcnQgQW5zaVVwIGZyb20gXCJhbnNpX3VwXCI7XG5cbmV4cG9ydCBjb25zdCBhbnNpVXAgPSBuZXcgQW5zaVVwKCk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zb3VyY2VzL2NvbW1vbi9jb2xvcnMuanMiLCJcbmV4cG9ydCBjb25zdCBNQVhfTVNHX0xFTiA9IDEwMDtcbmV4cG9ydCBjb25zdCBMRVZFTFMgPSB7XG4gICAgNTA6IFwiQ1JJVElDQUxcIixcbiAgICA0MDogXCJFUlJPUlwiLFxuICAgIDMwOiBcIldBUk5JTkdcIixcbiAgICAyMDogXCJJTkZPXCIsXG4gICAgMTU6IFwiU1RET1VUXCIsXG4gICAgMTA6IFwiREVCVUdcIlxufTtcblxuZXhwb3J0IGNvbnN0IFNUQVRFUyA9IFtcbiAgICAnQ0xPU0VEJyxcbiAgICAnTkVXJyxcbiAgICAnT1BFTicsXG4gICAgJ1JFT1BFTidcbl1cblxuZXhwb3J0IGNvbnN0IFRZUEVTID0gW1xuICAgICdCVUcnLFxuICAgICdRVUVTVElPTicsXG4gICAgJ0VWRU5UX1NZU1RFTScsXG4gICAgJ0VWRU5UX01PTklUT1InLFxuICAgICdFVkVOVF9PUEVSQVRPUicsXG5dXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zb3VyY2VzL3ZpZXdzL2FsZXJ0cy9kYXRhLmpzIiwiaW1wb3J0IHsgU2VydmljZSB9IGZyb20gXCIuLi9jb21tb24vYXBpXCI7XG5cbmNvbnN0IEJBU0VfVVJMID0gXCIvemVyb2JvdC9hZG1pbi9hY3RvcnMvYWRtaW5cIjtcblxuY2xhc3MgQWRtaW5TZXJ2aWNlIGV4dGVuZHMgU2VydmljZSB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHN1cGVyKEJBU0VfVVJMKTtcbiAgICB9XG5cbiAgICBsaXN0KCkge1xuICAgICAgICByZXR1cm4gdGhpcy5nZXRDYWxsKFwiYWRtaW5fbGlzdFwiKTtcbiAgICB9XG5cblxuICAgIGFkZChuYW1lKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnBvc3RDYWxsKFwiYWRtaW5fYWRkXCIsIHtcbiAgICAgICAgICAgIFwibmFtZVwiOiBuYW1lXG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGRlbGV0ZShuYW1lKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnBvc3RDYWxsKFwiYWRtaW5fZGVsZXRlXCIsIHtcbiAgICAgICAgICAgIFwibmFtZVwiOiBuYW1lXG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGdldF9leHBsb3JlcigpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0Q2FsbCgnZ2V0X2V4cGxvcmVyJyk7XG4gICAgfVxuXG4gICAgc2V0X2V4cGxvcmVyKHR5cGUpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucG9zdENhbGwoJ3NldF9leHBsb3JlcicsIHtcbiAgICAgICAgICAgIGV4cGxvcmVyX3R5cGU6IHR5cGVcbiAgICAgICAgfSlcbiAgICB9XG59XG5cbmV4cG9ydCBjb25zdCBhZG1pbiA9IG5ldyBBZG1pblNlcnZpY2UoKTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NvdXJjZXMvc2VydmljZXMvYWRtaW4uanMiLCJpbXBvcnQgeyBKZXRWaWV3IH0gZnJvbSBcIndlYml4LWpldFwiO1xuXG5pbXBvcnQgeyBhbnNpVXAgfSBmcm9tIFwiLi4vLi4vY29tbW9uL2NvbG9yc1wiO1xuaW1wb3J0IHsgTEVWRUxTLCBNQVhfTVNHX0xFTiwgU1RBVEVTLCBUWVBFUyB9IGZyb20gXCIuL2RhdGFcIjtcbmltcG9ydCB7IGRhdGVGb3JtYXR0ZXIgfSBmcm9tIFwiLi4vLi4vY29tbW9uL2Zvcm1hdHRlcnNcIjtcbmltcG9ydCB7IGFsZXJ0cyB9IGZyb20gXCIuLi8uLi9zZXJ2aWNlcy9hbGVydHNcIjtcblxuaW1wb3J0IEFsZXJ0VmlldyBmcm9tIFwiLi9hbGVydFwiO1xuaW1wb3J0IHsgY3JlYXRlRmlsdGVyT3B0aW9ucyB9IGZyb20gXCIuLi8uLi9jb21tb24vZmlsdGVyc1wiO1xuXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEFsZXJ0c1ZpZXcgZXh0ZW5kcyBKZXRWaWV3IHtcbiAgICBjb25maWcoKSB7XG4gICAgICAgIGNvbnN0IHZpZXcgPSB7XG4gICAgICAgICAgICByb3dzOiBbXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICB2aWV3OiBcImRhdGF0YWJsZVwiLFxuICAgICAgICAgICAgICAgICAgICBpZDogXCJhbGVydHNfdGFibGVcIixcbiAgICAgICAgICAgICAgICAgICAgcmVzaXplQ29sdW1uOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICBzZWxlY3Q6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgIG11bHRpc2VsZWN0OiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICBzY3JvbGw6IFwieHlcIixcbiAgICAgICAgICAgICAgICAgICAgY3NzOiBcIndlYml4X2hlYWRlcl9ib3JkZXIgd2ViaXhfZGF0YV9ib3JkZXJcIixcbiAgICAgICAgICAgICAgICAgICAgY29sdW1uczogW3tcbiAgICAgICAgICAgICAgICAgICAgICAgIGlkOiBcImluZGV4XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBoZWFkZXI6IFwiI1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgc29ydDogXCJpbnRcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIGF1dG93aWR0aDogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWQ6IFwiYWxlcnRfdHlwZVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgc29ydDogXCJpbnRcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvcm1hdDogKHZhbHVlKSA9PiBUWVBFU1t2YWx1ZV0sXG4gICAgICAgICAgICAgICAgICAgICAgICB3aWR0aDogMTUwLFxuICAgICAgICAgICAgICAgICAgICAgICAgaGVhZGVyOiBbXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJUeXBlXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb250ZW50OiBcInNlbGVjdEZpbHRlclwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvcHRpb25zOiBjcmVhdGVGaWx0ZXJPcHRpb25zKFRZUEVTKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlkOiBcImNvdW50XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBoZWFkZXI6IFwiQ291bnRcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIHNvcnQ6IFwiaW50XCJcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWQ6IFwic3RhdHVzXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBzb3J0OiBcImludFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgZm9ybWF0OiAodmFsdWUpID0+IFNUQVRFU1t2YWx1ZV0sXG4gICAgICAgICAgICAgICAgICAgICAgICBoZWFkZXI6IFtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIlN0YXR1c1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29udGVudDogXCJzZWxlY3RGaWx0ZXJcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb3B0aW9uczogY3JlYXRlRmlsdGVyT3B0aW9ucyhTVEFURVMpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWQ6IFwibGV2ZWxcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIHNvcnQ6IFwiaW50XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBmb3JtYXQ6ICh2YWx1ZSkgPT4gTEVWRUxTW3ZhbHVlXSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGhlYWRlcjogW1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiTGV2ZWxcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRlbnQ6IFwic2VsZWN0RmlsdGVyXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9wdGlvbnM6IGNyZWF0ZUZpbHRlck9wdGlvbnMoTEVWRUxTKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlkOiBcImNhdFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgaGVhZGVyOiBbXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJDYXRlZ29yeVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29udGVudDogXCJ0ZXh0RmlsdGVyXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgICAgICAgICAgc29ydDogXCJzdHJpbmdcIlxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZDogXCJ0aW1lX2ZpcnN0XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBoZWFkZXI6IFwiRmlyc3QgdGltZVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgc29ydDogXCJkYXRlXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBmb3JtYXQ6IGRhdGVGb3JtYXR0ZXIsXG4gICAgICAgICAgICAgICAgICAgICAgICB3aWR0aDogMjAwXG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlkOiBcInRpbWVfbGFzdFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgaGVhZGVyOiBcIkxhc3QgdGltZVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgc29ydDogXCJkYXRlXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBmb3JtYXQ6IGRhdGVGb3JtYXR0ZXIsXG4gICAgICAgICAgICAgICAgICAgICAgICB3aWR0aDogMjAwXG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlkOiBcIm1lc3NhZ2VcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIGhlYWRlcjogW1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiTWVzc2FnZVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29udGVudDogXCJ0ZXh0RmlsdGVyXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHNvcnQ6IFwic3RyXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBmaWxsc3BhY2U6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICBmb3JtYXQ6IGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh2YWx1ZS5sZW5ndGggPiBNQVhfTVNHX0xFTikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZSA9IHZhbHVlLnN1YnN0cigwLCBNQVhfTVNHX0xFTikgKyAnLi4uJztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGFuc2lVcC5hbnNpX3RvX2h0bWwodmFsdWUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgICAgICBhdXRvQ29uZmlnOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAvLyB1cmw6e1xuICAgICAgICAgICAgICAgICAgICAvLyAgICAgJHByb3h5OnRydWUsXG4gICAgICAgICAgICAgICAgICAgIC8vICAgICBsb2FkOiBmdW5jdGlvbih2aWV3LCBwYXJhbXMpe1xuICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgIGxldCBkYXRhID0gd2ViaXguYWpheChcIi96ZXJvYm90L2FsZXJ0YS9hY3RvcnMvYWxlcnRhL2xpc3RfYWxlcnRzXCIpO1xuICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgIHJldHVybiBkYXRhO1xuICAgICAgICAgICAgICAgICAgICAvLyAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgLy8gfVxuICAgICAgICAgICAgICAgICAgICBzY2hlbWU6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICRpbml0OiBmdW5jdGlvbiAob2JqKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb2JqLmluZGV4ID0gdGhpcy5jb3VudCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAkc3VidmlldzogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgcG9wdXA6IHRydWVcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICBdXG4gICAgICAgIH07XG5cbiAgICAgICAgcmV0dXJuIHZpZXc7XG4gICAgfVxuXG4gICAgZGVsZXRlSXRlbShvYmplY3RzKSB7XG4gICAgICAgIHZhciBzZWxmID0gdGhpcztcblxuICAgICAgICBsZXQgaXRlbXMgPSBbXSxcbiAgICAgICAgICAgIGlkcyA9IFtdLFxuICAgICAgICAgICAgaW5kZXhlcyA9IFtdO1xuXG4gICAgICAgIGZvciAobGV0IG9iaiBvZiBvYmplY3RzKSB7XG4gICAgICAgICAgICBpZHMucHVzaChvYmouaWQpO1xuICAgICAgICAgICAgbGV0IGl0ZW0gPSBzZWxmLnRhYmxlLmdldEl0ZW0ob2JqLmlkKTtcbiAgICAgICAgICAgIGl0ZW1zLnB1c2goaXRlbSlcbiAgICAgICAgICAgIGluZGV4ZXMucHVzaChpdGVtLmluZGV4KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHdlYml4LmNvbmZpcm0oe1xuICAgICAgICAgICAgdGl0bGU6IFwiRGVsZXRlIGFsZXJ0c1wiLFxuICAgICAgICAgICAgb2s6IFwiWWVzXCIsXG4gICAgICAgICAgICBjYW5jZWw6IFwiTm9cIixcbiAgICAgICAgICAgIHRleHQ6IGBEZWxldGUgYWxlcnQgaXRlbShzKSBvZiAke2luZGV4ZXMuam9pbihcIiwgXCIpfWBcbiAgICAgICAgfSkudGhlbigoKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBpZGVudGlmaWVycyA9IGl0ZW1zLm1hcCgoaXRlbSkgPT4gaXRlbS5pZGVudGlmaWVyKTtcbiAgICAgICAgICAgIHNlbGYudGFibGUuc2hvd1Byb2dyZXNzKHtcbiAgICAgICAgICAgICAgICBoaWRlOiBmYWxzZVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIGFsZXJ0cy5kZWxldGUoaWRlbnRpZmllcnMpLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgICAgIHNlbGYudGFibGUucmVtb3ZlKGlkcylcbiAgICAgICAgICAgICAgICBzZWxmLnRhYmxlLnNob3dQcm9ncmVzcyh7XG4gICAgICAgICAgICAgICAgICAgIGhpZGU6IHRydWVcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHZpZXdJdGVtKGlkKSB7XG4gICAgICAgIHRoaXMuYWxlcnRWaWV3LnNob3dGb3IodGhpcy50YWJsZS5nZXRJdGVtKGlkKSk7XG4gICAgfVxuXG4gICAgaW5pdCgpIHtcbiAgICAgICAgLy8gdGhpcy51c2UocGx1Z2lucy5Qcm9ncmVzc0JhciwgXCJwcm9ncmVzc1wiKTtcbiAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgICAgICBzZWxmLnRhYmxlID0gJCQoXCJhbGVydHNfdGFibGVcIik7XG4gICAgICAgIHNlbGYuYWxlcnRWaWV3ID0gc2VsZi51aShBbGVydFZpZXcpO1xuXG4gICAgICAgIHdlYml4LmV4dGVuZChzZWxmLnRhYmxlLCB3ZWJpeC5Qcm9ncmVzc0Jhcik7XG4gICAgICAgIHdlYml4LnJlYWR5KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHNlbGYudGFibGUuY2xlYXJBbGwoKTtcbiAgICAgICAgICAgIHNlbGYudGFibGUuc2hvd1Byb2dyZXNzKHtcbiAgICAgICAgICAgICAgICBoaWRlOiBmYWxzZVxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBhbGVydHMubGlzdCgpLnRoZW4oZGF0YSA9PiB7XG4gICAgICAgICAgICAgICAgbGV0IGFsZXJ0cyA9IGRhdGEuanNvbigpLmFsZXJ0cztcbiAgICAgICAgICAgICAgICBzZWxmLnRhYmxlLnBhcnNlKGFsZXJ0cyk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgd2ViaXgudWkoe1xuICAgICAgICAgICAgdmlldzogXCJjb250ZXh0bWVudVwiLFxuICAgICAgICAgICAgaWQ6IFwiYWxlcnRzX2NtXCIsXG4gICAgICAgICAgICBkYXRhOiBbXCJWaWV3XCIsIFwiRGVsZXRlXCJdXG4gICAgICAgIH0pLmF0dGFjaFRvKHNlbGYudGFibGUpO1xuXG5cbiAgICAgICAgc2VsZi50YWJsZS5hdHRhY2hFdmVudChcIm9uSXRlbURibENsaWNrXCIsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHNlbGYudmlld0l0ZW0oc2VsZi50YWJsZS5nZXRTZWxlY3RlZElkKCkpO1xuICAgICAgICB9KTtcblxuICAgICAgICAkJChcImFsZXJ0c19jbVwiKS5hdHRhY2hFdmVudChcIm9uTWVudUl0ZW1DbGlja1wiLCBmdW5jdGlvbiAoaWQpIHtcbiAgICAgICAgICAgIGlmIChpZCA9PSBcIkRlbGV0ZVwiKSB7XG4gICAgICAgICAgICAgICAgc2VsZi5kZWxldGVJdGVtKHNlbGYudGFibGUuZ2V0U2VsZWN0ZWRJZCh0cnVlKSk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKGlkID09IFwiVmlld1wiKSB7XG4gICAgICAgICAgICAgICAgc2VsZi52aWV3SXRlbShzZWxmLnRhYmxlLmdldFNlbGVjdGVkSWQoKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NvdXJjZXMvdmlld3MvYWxlcnRzL2luZGV4LmpzIiwiaW1wb3J0IHsgRXh0ZXJuYWxWaWV3IH0gZnJvbSBcIi4uL2V4dGVybmFsXCI7XG5pbXBvcnQgeyBhZG1pbiB9IGZyb20gXCIuLi8uLi9zZXJ2aWNlcy9hZG1pblwiO1xuXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIENhcGFjaXR5VmlldyBleHRlbmRzIEV4dGVybmFsVmlldyB7XG4gICAgY29uc3RydWN0b3IoYXBwLCBuYW1lKSB7XG4gICAgICAgIHN1cGVyKGFwcCwgbmFtZSk7XG4gICAgfVxuXG4gICAgc2hvd0lmcmFtZSgpIHtcbiAgICAgICAgYWRtaW4uZ2V0X2V4cGxvcmVyKCkudGhlbigoZGF0YSkgPT4ge1xuICAgICAgICAgICAgY29uc3QgZXhwbG9yZXIgPSBkYXRhLmpzb24oKTtcbiAgICAgICAgICAgIGxldCB1cmwgPSBleHBsb3Jlci51cmw7XG5cbiAgICAgICAgICAgIGlmICghdXJsLnN0YXJ0c1dpdGgoJ2h0dHAnKSkge1xuICAgICAgICAgICAgICAgIHVybCA9IGBodHRwczovLyR7dXJsfWA7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHRoaXMuZXh0ZXJuYWxJZnJhbWUuc2hvdygpO1xuICAgICAgICAgICAgdGhpcy5leHRlcm5hbElmcmFtZS5zaG93UHJvZ3Jlc3MoeyB0eXBlOiBcImljb25cIiB9KTtcbiAgICAgICAgICAgIHRoaXMuZXh0ZXJuYWxJZnJhbWUubG9hZCh1cmwpO1xuICAgICAgICB9KVxuICAgIH1cbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NvdXJjZXMvdmlld3MvY2FwYWNpdHkvaW5kZXguanMiLCJpbXBvcnQgeyBKZXRWaWV3IH0gZnJvbSBcIndlYml4LWpldFwiO1xuXG5pbXBvcnQgeyBFcnJvclZpZXcgfSBmcm9tIFwiLi4vZXJyb3JzL2RpYWxvZ1wiO1xuaW1wb3J0IHsgdGFpZ2EgfSBmcm9tIFwiLi4vLi4vc2VydmljZXMvdGFpZ2FcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ2lyY2xlc1ZpZXcgZXh0ZW5kcyBKZXRWaWV3IHtcbiAgICBjb25maWcoKSB7XG4gICAgICAgIGNvbnN0IGdyaWQgPSB7XG4gICAgICAgICAgICByb3dzOiBbe1xuICAgICAgICAgICAgICAgIC8vSGVhZGVyXG4gICAgICAgICAgICAgICAgdmlldzogXCJ0ZW1wbGF0ZVwiLFxuICAgICAgICAgICAgICAgIHR5cGU6IFwiaGVhZGVyXCIsXG4gICAgICAgICAgICAgICAgdGVtcGxhdGU6IFwiQ2lyY2xlc1wiLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHsgLy9EYXRhVGFibGVcbiAgICAgICAgICAgICAgICB2aWV3OiBcImRhdGF0YWJsZVwiLFxuICAgICAgICAgICAgICAgIGlkOiBcImNpcmNsZXNfdGFibGVcIixcbiAgICAgICAgICAgICAgICByZXNpemVDb2x1bW46IHRydWUsXG4gICAgICAgICAgICAgICAgdHlwZToge1xuICAgICAgICAgICAgICAgICAgICBoZWlnaHQ6IDIwMCxcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHNjcm9sbDogXCJ4eVwiLFxuICAgICAgICAgICAgICAgIGF1dG9Db25maWc6IHRydWUsXG4gICAgICAgICAgICAgICAgdmlldzogXCJkYXRhdGFibGVcIixcbiAgICAgICAgICAgICAgICBzZWxlY3Q6IHRydWUsXG4gICAgICAgICAgICAgICAgY3NzOiBcIndlYml4X2hlYWRlcl9ib3JkZXIgd2ViaXhfZGF0YV9ib3JkZXJcIixcbiAgICAgICAgICAgICAgICBvbkNvbnRleHQ6IHt9LFxuICAgICAgICAgICAgICAgIGNvbHVtbnM6IFt7XG4gICAgICAgICAgICAgICAgICAgIGlkOiBcIklEXCIsXG4gICAgICAgICAgICAgICAgICAgIGhlYWRlcjogXCJJRFwiLFxuICAgICAgICAgICAgICAgICAgICBzb3J0OiBcImludFwiLFxuICAgICAgICAgICAgICAgICAgICBhdXRvd2lkdGg6IHRydWUsXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIGlkOiBcIk5hbWVcIixcbiAgICAgICAgICAgICAgICAgICAgaGVhZGVyOiBcIk5hbWVcIixcbiAgICAgICAgICAgICAgICAgICAgc29ydDogXCJzdHJpbmdcIixcbiAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDIwMFxuICAgICAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICAgICAgaWQ6IFwiT3duZXJcIixcbiAgICAgICAgICAgICAgICAgICAgaGVhZGVyOiBbXCJPd25lclwiLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb250ZW50OiBcInRleHRGaWx0ZXJcIlxuICAgICAgICAgICAgICAgICAgICB9XSxcbiAgICAgICAgICAgICAgICAgICAgc29ydDogXCJzdHJpbmdcIixcbiAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDIwMFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBpZDogXCJEZXNjcmlwdGlvblwiLFxuICAgICAgICAgICAgICAgICAgICBoZWFkZXI6IFwiRGVzY3JpcHRpb25cIixcbiAgICAgICAgICAgICAgICAgICAgc29ydDogXCJzdHJpbmdcIixcbiAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDEzMDAsXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgc2NoZW1lOiB7XG4gICAgICAgICAgICAgICAgICAgICRpbml0OiBmdW5jdGlvbiAob2JqKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBvYmouaW5kZXggPSB0aGlzLmNvdW50KCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBdXG4gICAgICAgIH07XG4gICAgICAgIHJldHVybiBncmlkO1xuICAgIH1cblxuICAgIHNob3dFcnJvcihtZXNzYWdlKSB7XG4gICAgICAgIHRoaXMuZXJyb3JWaWV3LnNob3dFcnJvcihtZXNzYWdlKTtcbiAgICB9XG5cbiAgICBpbml0KHZpZXcpIHtcbiAgICAgICAgY29uc3Qgc2VsZiA9IHRoaXM7XG5cbiAgICAgICAgc2VsZi5lcnJvclZpZXcgPSB0aGlzLnVpKEVycm9yVmlldyk7XG5cbiAgICAgICAgY29uc3QgbWVudSA9IHdlYml4LnVpKHtcbiAgICAgICAgICAgIHZpZXc6IFwiY29udGV4dG1lbnVcIixcbiAgICAgICAgICAgIGlkOiBcImNpcmNsZXNfY21cIlxuICAgICAgICB9KTtcblxuICAgICAgICB0aGlzLmNpcmNsZVRhYmxlID0gdGhpcy4kJChcImNpcmNsZXNfdGFibGVcIik7XG4gICAgICAgIHdlYml4LmV4dGVuZCh0aGlzLmNpcmNsZVRhYmxlLCB3ZWJpeC5Qcm9ncmVzc0Jhcik7XG5cblxuICAgICAgICB3ZWJpeC5hamF4KCkuZ2V0KFwiL2F1dGgvYXV0aGVudGljYXRlZFwiLCBmdW5jdGlvbiAoZGF0YSkge1xuICAgICAgICAgICAgY29uc3QgaW5mbyA9IEpTT04ucGFyc2UoZGF0YSk7XG4gICAgICAgICAgICBjb25zdCB1c2VybmFtZSA9IGluZm8udXNlcm5hbWUucmVwbGFjZShcIi4zYm90XCIsIFwiXCIpXG4gICAgICAgICAgICB0YWlnYS51c2VyQ2lyY2xlcyh1c2VybmFtZSkudGhlbihkYXRhID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCBjaXJjbGVzID0gZGF0YS5qc29uKCk7XG4gICAgICAgICAgICAgICAgc2VsZi5jaXJjbGVUYWJsZS5wYXJzZShjaXJjbGVzKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcblxuXG4gICAgfVxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc291cmNlcy92aWV3cy9jaXJjbGVzL2luZGV4LmpzIiwiaW1wb3J0IHsgSmV0VmlldyB9IGZyb20gXCJ3ZWJpeC1qZXRcIjtcblxuaW1wb3J0IHsgRXJyb3JWaWV3IH0gZnJvbSBcIi4uL2Vycm9ycy9kaWFsb2dcIjtcbmltcG9ydCB7IHRhaWdhIH0gZnJvbSBcIi4uLy4uL3NlcnZpY2VzL3RhaWdhXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIENpcmNsZXN0b3JpZXNWaWV3IGV4dGVuZHMgSmV0VmlldyB7XG4gICAgY29uZmlnKCkge1xuICAgICAgICBjb25zdCBncmlkID0ge1xuICAgICAgICAgICAgcm93czogW3tcbiAgICAgICAgICAgICAgICAvL0hlYWRlclxuICAgICAgICAgICAgICAgIHZpZXc6IFwidGVtcGxhdGVcIixcbiAgICAgICAgICAgICAgICB0eXBlOiBcImhlYWRlclwiLFxuICAgICAgICAgICAgICAgIHRlbXBsYXRlOiBcIkNpcmNsZXNTdG9yaWVzXCIsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgeyAvL0RhdGFUYWJsZVxuICAgICAgICAgICAgICAgIHZpZXc6IFwiZGF0YXRhYmxlXCIsXG4gICAgICAgICAgICAgICAgaWQ6IFwiY2lyY2xlc3Rvcmllc190YWJsZVwiLFxuICAgICAgICAgICAgICAgIHJlc2l6ZUNvbHVtbjogdHJ1ZSxcbiAgICAgICAgICAgICAgICB0eXBlOiB7XG4gICAgICAgICAgICAgICAgICAgIGhlaWdodDogMjAwLFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgc2Nyb2xsOiBcInh5XCIsXG4gICAgICAgICAgICAgICAgYXV0b0NvbmZpZzogdHJ1ZSxcbiAgICAgICAgICAgICAgICB2aWV3OiBcImRhdGF0YWJsZVwiLFxuICAgICAgICAgICAgICAgIHNlbGVjdDogdHJ1ZSxcbiAgICAgICAgICAgICAgICBjc3M6IFwid2ViaXhfaGVhZGVyX2JvcmRlciB3ZWJpeF9kYXRhX2JvcmRlclwiLFxuICAgICAgICAgICAgICAgIG9uQ29udGV4dDoge30sXG4gICAgICAgICAgICAgICAgY29sdW1uczogW3tcbiAgICAgICAgICAgICAgICAgICAgaWQ6IFwiSURcIixcbiAgICAgICAgICAgICAgICAgICAgaGVhZGVyOiBcIklEXCIsXG4gICAgICAgICAgICAgICAgICAgIHNvcnQ6IFwiaW50XCIsXG4gICAgICAgICAgICAgICAgICAgIGF1dG93aWR0aDogdHJ1ZSxcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgaWQ6IFwiUHJvamVjdFwiLFxuICAgICAgICAgICAgICAgICAgICBoZWFkZXI6IFtcIlByb2plY3RcIiwge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29udGVudDogXCJ0ZXh0RmlsdGVyXCJcbiAgICAgICAgICAgICAgICAgICAgfV0sXG4gICAgICAgICAgICAgICAgICAgIHNvcnQ6IFwic3RyaW5nXCIsXG4gICAgICAgICAgICAgICAgICAgIHdpZHRoOiAzMDBcbiAgICAgICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgICAgIGlkOiBcIlN1YmplY3RcIixcbiAgICAgICAgICAgICAgICAgICAgaGVhZGVyOiBcIlN1YmplY3RcIixcbiAgICAgICAgICAgICAgICAgICAgc29ydDogXCJzdHJpbmdcIixcbiAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDcwMFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBpZDogXCJNaWxlc3RvbmVcIixcbiAgICAgICAgICAgICAgICAgICAgaGVhZGVyOiBcIk1pbGVzdG9uZVwiLFxuICAgICAgICAgICAgICAgICAgICBzb3J0OiBcInN0cmluZ1wiLFxuICAgICAgICAgICAgICAgICAgICB3aWR0aDogMjAwLFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBpZDogXCJTdGF0dXNcIixcbiAgICAgICAgICAgICAgICAgICAgaGVhZGVyOiBcIlN0YXR1c1wiLFxuICAgICAgICAgICAgICAgICAgICBzb3J0OiBcInN0cmluZ1wiLFxuICAgICAgICAgICAgICAgICAgICB3aWR0aDogMjAwLFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBpZDogXCJEdWUgZGF0ZVwiLFxuICAgICAgICAgICAgICAgICAgICBoZWFkZXI6IFwiRHVlIGRhdGVcIixcbiAgICAgICAgICAgICAgICAgICAgc29ydDogXCJzdHJpbmdcIixcbiAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDIwMCxcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICBzY2hlbWU6IHtcbiAgICAgICAgICAgICAgICAgICAgJGluaXQ6IGZ1bmN0aW9uIChvYmopIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG9iai5pbmRleCA9IHRoaXMuY291bnQoKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIF1cbiAgICAgICAgfTtcbiAgICAgICAgcmV0dXJuIGdyaWQ7XG4gICAgfVxuXG4gICAgc2hvd0Vycm9yKG1lc3NhZ2UpIHtcbiAgICAgICAgdGhpcy5lcnJvclZpZXcuc2hvd0Vycm9yKG1lc3NhZ2UpO1xuICAgIH1cblxuICAgIGluaXQodmlldykge1xuICAgICAgICBjb25zdCBzZWxmID0gdGhpcztcblxuICAgICAgICBzZWxmLmVycm9yVmlldyA9IHRoaXMudWkoRXJyb3JWaWV3KTtcblxuICAgICAgICBjb25zdCBtZW51ID0gd2ViaXgudWkoe1xuICAgICAgICAgICAgdmlldzogXCJjb250ZXh0bWVudVwiLFxuICAgICAgICAgICAgaWQ6IFwiY2lyY2xlc3Rvcmllc19jbVwiXG4gICAgICAgIH0pO1xuXG4gICAgICAgIHRoaXMuc3Rvcmllc1RhYmxlID0gdGhpcy4kJChcImNpcmNsZXN0b3JpZXNfdGFibGVcIik7XG4gICAgICAgIHdlYml4LmV4dGVuZCh0aGlzLnN0b3JpZXNUYWJsZSwgd2ViaXguUHJvZ3Jlc3NCYXIpO1xuXG4gICAgICAgIHdlYml4LmFqYXgoKS5nZXQoXCIvYXV0aC9hdXRoZW50aWNhdGVkXCIsIGZ1bmN0aW9uIChkYXRhKSB7XG4gICAgICAgICAgICBjb25zdCBpbmZvID0gSlNPTi5wYXJzZShkYXRhKTtcbiAgICAgICAgICAgIGNvbnN0IHVzZXJuYW1lID0gaW5mby51c2VybmFtZS5yZXBsYWNlKFwiLjNib3RcIiwgXCJcIilcbiAgICAgICAgICAgIHRhaWdhLnVzZXJTdG9yaWVzKHVzZXJuYW1lKS50aGVuKGRhdGEgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IHN0b3JpZXMgPSBkYXRhLmpzb24oKTtcbiAgICAgICAgICAgICAgICBzZWxmLnN0b3JpZXNUYWJsZS5wYXJzZShzdG9yaWVzKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcblxuXG4gICAgfVxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc291cmNlcy92aWV3cy9jaXJjbGVzdG9yaWVzL2luZGV4LmpzIiwiaW1wb3J0IHsgSmV0VmlldyB9IGZyb20gXCJ3ZWJpeC1qZXRcIjtcblxuaW1wb3J0IHsgRXJyb3JWaWV3IH0gZnJvbSBcIi4uL2Vycm9ycy9kaWFsb2dcIjtcbmltcG9ydCB7IHRhaWdhIH0gZnJvbSBcIi4uLy4uL3NlcnZpY2VzL3RhaWdhXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIENpcmNsZXNUYXNrc1ZpZXcgZXh0ZW5kcyBKZXRWaWV3IHtcbiAgICBjb25maWcoKSB7XG4gICAgICAgIGNvbnN0IGdyaWQgPSB7XG4gICAgICAgICAgICByb3dzOiBbe1xuICAgICAgICAgICAgICAgIC8vSGVhZGVyXG4gICAgICAgICAgICAgICAgdmlldzogXCJ0ZW1wbGF0ZVwiLFxuICAgICAgICAgICAgICAgIHR5cGU6IFwiaGVhZGVyXCIsXG4gICAgICAgICAgICAgICAgdGVtcGxhdGU6IFwiQ2lyY2xlc1Rhc2tzXCIsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgeyAvL0RhdGFUYWJsZVxuICAgICAgICAgICAgICAgIHZpZXc6IFwiZGF0YXRhYmxlXCIsXG4gICAgICAgICAgICAgICAgaWQ6IFwiY2lyY2xlc3Rhc2tzX3RhYmxlXCIsXG4gICAgICAgICAgICAgICAgcmVzaXplQ29sdW1uOiB0cnVlLFxuICAgICAgICAgICAgICAgIHR5cGU6IHtcbiAgICAgICAgICAgICAgICAgICAgaGVpZ2h0OiAyMDAsXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBzY3JvbGw6IFwieHlcIixcbiAgICAgICAgICAgICAgICBhdXRvQ29uZmlnOiB0cnVlLFxuICAgICAgICAgICAgICAgIHZpZXc6IFwiZGF0YXRhYmxlXCIsXG4gICAgICAgICAgICAgICAgc2VsZWN0OiB0cnVlLFxuICAgICAgICAgICAgICAgIGNzczogXCJ3ZWJpeF9oZWFkZXJfYm9yZGVyIHdlYml4X2RhdGFfYm9yZGVyXCIsXG4gICAgICAgICAgICAgICAgb25Db250ZXh0OiB7fSxcbiAgICAgICAgICAgICAgICBjb2x1bW5zOiBbe1xuICAgICAgICAgICAgICAgICAgICBpZDogXCJJRFwiLFxuICAgICAgICAgICAgICAgICAgICBoZWFkZXI6IFwiSURcIixcbiAgICAgICAgICAgICAgICAgICAgc29ydDogXCJpbnRcIixcbiAgICAgICAgICAgICAgICAgICAgYXV0b3dpZHRoOiB0cnVlLFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBpZDogXCJQcm9qZWN0XCIsXG4gICAgICAgICAgICAgICAgICAgIGhlYWRlcjogW1wiUHJvamVjdFwiLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb250ZW50OiBcInRleHRGaWx0ZXJcIlxuICAgICAgICAgICAgICAgICAgICB9XSxcbiAgICAgICAgICAgICAgICAgICAgc29ydDogXCJzdHJpbmdcIixcbiAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDMwMFxuICAgICAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICAgICAgaWQ6IFwiU3ViamVjdFwiLFxuICAgICAgICAgICAgICAgICAgICBoZWFkZXI6IFwiU3ViamVjdFwiLFxuICAgICAgICAgICAgICAgICAgICBzb3J0OiBcInN0cmluZ1wiLFxuICAgICAgICAgICAgICAgICAgICB3aWR0aDogODAwXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIGlkOiBcIk1pbGVzdG9uZVwiLFxuICAgICAgICAgICAgICAgICAgICBoZWFkZXI6IFwiTWlsZXN0b25lXCIsXG4gICAgICAgICAgICAgICAgICAgIHNvcnQ6IFwic3RyaW5nXCIsXG4gICAgICAgICAgICAgICAgICAgIHdpZHRoOiAyMDAsXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIGlkOiBcIlN0YXR1c1wiLFxuICAgICAgICAgICAgICAgICAgICBoZWFkZXI6IFwiU3RhdHVzXCIsXG4gICAgICAgICAgICAgICAgICAgIHNvcnQ6IFwic3RyaW5nXCIsXG4gICAgICAgICAgICAgICAgICAgIHdpZHRoOiAzMDAsXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgc2NoZW1lOiB7XG4gICAgICAgICAgICAgICAgICAgICRpbml0OiBmdW5jdGlvbiAob2JqKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBvYmouaW5kZXggPSB0aGlzLmNvdW50KCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBdXG4gICAgICAgIH07XG4gICAgICAgIHJldHVybiBncmlkO1xuICAgIH1cblxuICAgIHNob3dFcnJvcihtZXNzYWdlKSB7XG4gICAgICAgIHRoaXMuZXJyb3JWaWV3LnNob3dFcnJvcihtZXNzYWdlKTtcbiAgICB9XG5cbiAgICBpbml0KHZpZXcpIHtcbiAgICAgICAgY29uc3Qgc2VsZiA9IHRoaXM7XG5cbiAgICAgICAgc2VsZi5lcnJvclZpZXcgPSB0aGlzLnVpKEVycm9yVmlldyk7XG5cbiAgICAgICAgY29uc3QgbWVudSA9IHdlYml4LnVpKHtcbiAgICAgICAgICAgIHZpZXc6IFwiY29udGV4dG1lbnVcIixcbiAgICAgICAgICAgIGlkOiBcImNpcmNsZXN0YXNrc19jbVwiXG4gICAgICAgIH0pO1xuXG4gICAgICAgIHRoaXMudGFza3NUYWJsZSA9IHRoaXMuJCQoXCJjaXJjbGVzdGFza3NfdGFibGVcIik7XG4gICAgICAgIHdlYml4LmV4dGVuZCh0aGlzLnRhc2tzVGFibGUsIHdlYml4LlByb2dyZXNzQmFyKTtcblxuICAgICAgICB0YWlnYS51c2VyVGFza3MoMzYpLnRoZW4oZGF0YSA9PiB7XG4gICAgICAgICAgICBjb25zdCBjaXJjbGVzID0gZGF0YS5qc29uKCk7XG4gICAgICAgICAgICBzZWxmLnRhc2tzVGFibGUucGFyc2UoY2lyY2xlcyk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHdlYml4LmFqYXgoKS5nZXQoXCIvYXV0aC9hdXRoZW50aWNhdGVkXCIsIGZ1bmN0aW9uIChkYXRhKSB7XG4gICAgICAgICAgICBjb25zdCBpbmZvID0gSlNPTi5wYXJzZShkYXRhKTtcbiAgICAgICAgICAgIGNvbnN0IHVzZXJuYW1lID0gaW5mby51c2VybmFtZS5yZXBsYWNlKFwiLjNib3RcIiwgXCJcIilcbiAgICAgICAgICAgIHRhaWdhLnVzZXJUYXNrcyh1c2VybmFtZSkudGhlbihkYXRhID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCB0YXNrcyA9IGRhdGEuanNvbigpO1xuICAgICAgICAgICAgICAgIHNlbGYudGFza3NUYWJsZS5wYXJzZSh0YXNrcyk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG5cblxuICAgIH1cbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NvdXJjZXMvdmlld3MvY2lyY2xldGFza3MvaW5kZXguanMiLCJpbXBvcnQgeyBFeHRlcm5hbFZpZXcgfSBmcm9tIFwiLi4vZXh0ZXJuYWxcIjtcblxuY29uc3QgQ09ERV9VUkwgPSBcIi9jb2Rlc2VydmVyLz9mb2xkZXI9L3NhbmRib3gvY29kZVwiO1xuY29uc3QgUkVRVUlSRURfUEFDS0FHRVMgPSB7XG4gICAgXCJ6ZXJvYm90LmNvZGVzZXJ2ZXJcIjogXCJodHRwczovL2dpdGh1Yi5jb20vdGhyZWVmb2xkdGVjaC9qdW1wc2NhbGVYX3RocmVlYm90L3RyZWUvZGV2ZWxvcG1lbnQvVGhyZWVCb3RQYWNrYWdlcy96ZXJvYm90L2NvZGVzZXJ2ZXJcIlxufVxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDb2Rlc2VydmVyVmlldyBleHRlbmRzIEV4dGVybmFsVmlldyB7XG4gICAgY29uc3RydWN0b3IoYXBwLCBuYW1lKSB7XG4gICAgICAgIHN1cGVyKGFwcCwgbmFtZSwgQ09ERV9VUkwsIFJFUVVJUkVEX1BBQ0tBR0VTKTtcbiAgICB9XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zb3VyY2VzL3ZpZXdzL2NvZGVzZXJ2ZXIvaW5kZXguanMiLCJpbXBvcnQgeyBKZXRWaWV3IH0gZnJvbSBcIndlYml4LWpldFwiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBUb3BWaWV3IGV4dGVuZHMgSmV0VmlldyB7XG5cdGNvbmZpZygpIHtcblx0XHRyZXR1cm4ge1xuXHRcdFx0dHlwZTogXCJzcGFjZVwiLFxuXHRcdFx0cmVzcG9uc2l2ZTogdHJ1ZSxcblx0XHRcdHJvd3M6IFtcblx0XHRcdFx0e1xuXHRcdFx0XHRcdGNvbHM6IFt7XG5cdFx0XHRcdFx0XHQkc3VidmlldzogXCJkYXNoLmpzeEluZm9cIlxuXHRcdFx0XHRcdH0sXG5cdFx0XHRcdFx0e1xuXHRcdFx0XHRcdFx0JHN1YnZpZXc6IFwiZGFzaC5oZWFsdGhcIlxuXHRcdFx0XHRcdH0sXG5cdFx0XHRcdFx0e1xuXHRcdFx0XHRcdFx0JHN1YnZpZXc6IFwiZGFzaC5kaXNrU3BhY2VcIlxuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRdXG5cdFx0XHRcdH0sXG5cdFx0XHRcdHtcblx0XHRcdFx0XHRjb2xzOiBbe1xuXHRcdFx0XHRcdFx0JHN1YnZpZXc6IFwiZGFzaC5wcm9jZXNzZXNcIlxuXHRcdFx0XHRcdH0sXG5cdFx0XHRcdFx0eyAkc3VidmlldzogXCJkYXNoLnByb2Nlc3Nlc0xpc3RcIiB9LFxuXHRcdFx0XHRcdHsgJHN1YnZpZXc6IFwiZGFzaC5ydW5uaW5nUG9ydHNcIiB9XG5cdFx0XHRcdF1cblx0XHRcdFx0fSxcblx0XHRcdF1cblx0XHR9O1xuXHR9XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zb3VyY2VzL3ZpZXdzL2Rhc2gvaW5kZXguanMiLCJpbXBvcnQgeyBKZXRWaWV3IH0gZnJvbSBcIndlYml4LWpldFwiO1xuXG5pbXBvcnQgeyBFcnJvclZpZXcgfSBmcm9tIFwiLi4vZXJyb3JzL2RpYWxvZ1wiO1xuaW1wb3J0IHsgc29sdXRpb25zIH0gZnJvbSBcIi4uLy4uL3NlcnZpY2VzL2RlcGxveWVkU29sdXRpb25zXCI7XG5cbmltcG9ydCBSZXNlcnZhdGlvblZpZXcgZnJvbSBcIi4vcmVzZXJ2YXRpb25cIjtcblxuY29uc3QgVU5LTk9XTl9TVEFUVVMgPSAnVW5rbm93bic7XG5cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRGVwbG95ZWRTb2x1dGlvbnNWaWV3IGV4dGVuZHMgSmV0VmlldyB7XG4gICAgY29uZmlnKCkge1xuICAgICAgICBjb25zdCBncmlkID0ge1xuICAgICAgICAgICAgcm93czogW3tcbiAgICAgICAgICAgICAgICAvL0hlYWRlclxuICAgICAgICAgICAgICAgIHZpZXc6IFwidGVtcGxhdGVcIixcbiAgICAgICAgICAgICAgICB0eXBlOiBcImhlYWRlclwiLFxuICAgICAgICAgICAgICAgIHRlbXBsYXRlOiBcIkRlcGxveWVkIFNvbHV0aW9uc1wiLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHsgLy9EYXRhVGFibGVcbiAgICAgICAgICAgICAgICB2aWV3OiBcImRhdGF0YWJsZVwiLFxuICAgICAgICAgICAgICAgIGlkOiBcInNvbHV0aW9uc190YWJsZVwiLFxuICAgICAgICAgICAgICAgIHJlc2l6ZUNvbHVtbjogdHJ1ZSxcbiAgICAgICAgICAgICAgICB0eXBlOiB7XG4gICAgICAgICAgICAgICAgICAgIGhlaWdodDogMjAwLFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgc2Nyb2xsOiBcInh5XCIsXG4gICAgICAgICAgICAgICAgYXV0b0NvbmZpZzogdHJ1ZSxcbiAgICAgICAgICAgICAgICB2aWV3OiBcImRhdGF0YWJsZVwiLFxuICAgICAgICAgICAgICAgIHNlbGVjdDogdHJ1ZSxcbiAgICAgICAgICAgICAgICBjc3M6IFwid2ViaXhfaGVhZGVyX2JvcmRlciB3ZWJpeF9kYXRhX2JvcmRlclwiLFxuICAgICAgICAgICAgICAgIG9uQ29udGV4dDoge30sXG4gICAgICAgICAgICAgICAgY29sdW1uczogW3tcbiAgICAgICAgICAgICAgICAgICAgaWQ6IFwiaW5kZXhcIixcbiAgICAgICAgICAgICAgICAgICAgaGVhZGVyOiBcIiNcIixcbiAgICAgICAgICAgICAgICAgICAgc29ydDogXCJpbnRcIixcbiAgICAgICAgICAgICAgICAgICAgYXV0b3dpZHRoOiB0cnVlLFxuICAgICAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICAgICAgaWQ6IFwic29sdXRpb25OYW1lXCIsXG4gICAgICAgICAgICAgICAgICAgIGhlYWRlcjogW1wiU29sdXRpb24gTmFtZVwiLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb250ZW50OiBcInRleHRGaWx0ZXJcIlxuICAgICAgICAgICAgICAgICAgICB9XSxcbiAgICAgICAgICAgICAgICAgICAgc29ydDogXCJzdHJpbmdcIixcbiAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDIwMFxuICAgICAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICAgICAgaWQ6IFwicmVzdklkXCIsXG4gICAgICAgICAgICAgICAgICAgIGhlYWRlcjogW1wiUmVzZXJ2YXRpb24gSWRcIiwge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29udGVudDogXCJ0ZXh0RmlsdGVyXCJcbiAgICAgICAgICAgICAgICAgICAgfV0sXG4gICAgICAgICAgICAgICAgICAgIHNvcnQ6IFwic3RyaW5nXCIsXG4gICAgICAgICAgICAgICAgICAgIHdpZHRoOiAyMDBcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgaWQ6IFwic29sdXRpb25UeXBlXCIsXG4gICAgICAgICAgICAgICAgICAgIGhlYWRlcjogW1wiU29sdXRpb24gVHlwZVwiLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb250ZW50OiBcInNlbGVjdEZpbHRlclwiXG4gICAgICAgICAgICAgICAgICAgIH1dLFxuICAgICAgICAgICAgICAgICAgICBzb3J0OiBcInN0cmluZ1wiLFxuICAgICAgICAgICAgICAgICAgICB3aWR0aDogMjAwXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIGlkOiBcIm5leHRBY3Rpb25cIixcbiAgICAgICAgICAgICAgICAgICAgaGVhZGVyOiBbXCJOZXh0IGFjdGlvblwiLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb250ZW50OiBcInNlbGVjdEZpbHRlclwiXG4gICAgICAgICAgICAgICAgICAgIH1dLFxuICAgICAgICAgICAgICAgICAgICBzb3J0OiBcInN0cmluZ1wiLFxuICAgICAgICAgICAgICAgICAgICB3aWR0aDogMjAwXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgc2NoZW1lOiB7XG4gICAgICAgICAgICAgICAgICAgICRpbml0OiBmdW5jdGlvbiAob2JqKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBvYmouc29sdXRpb25OYW1lID0gb2JqLm5hbWU7XG4gICAgICAgICAgICAgICAgICAgICAgICBvYmoucmVzdklkID0gb2JqLnJlc2VydmF0aW9uLmlkO1xuICAgICAgICAgICAgICAgICAgICAgICAgb2JqLnNvbHV0aW9uVHlwZSA9IG9iai50eXBlO1xuICAgICAgICAgICAgICAgICAgICAgICAgb2JqLm5leHRBY3Rpb24gPSBvYmoucmVzZXJ2YXRpb24ubmV4dF9hY3Rpb247XG4gICAgICAgICAgICAgICAgICAgICAgICBvYmouaW5kZXggPSB0aGlzLmNvdW50KCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIG9uOiB7XG4gICAgICAgICAgICAgICAgICAgIG9uQWZ0ZXJMb2FkOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIXRoaXMuY291bnQoKSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNob3dPdmVybGF5KFwiU29ycnksIHRoZXJlIGlzIG5vIGRhdGFcIik7XG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5oaWRlT3ZlcmxheSgpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgXVxuICAgICAgICB9O1xuICAgICAgICByZXR1cm4gZ3JpZDtcbiAgICB9XG5cbiAgICBzaG93RXJyb3IobWVzc2FnZSkge1xuICAgICAgICB0aGlzLmVycm9yVmlldy5zaG93RXJyb3IobWVzc2FnZSk7XG4gICAgfVxuXG4gICAgaGFuZGxlUmVzdWx0KHByb21pc2UsIGNhbGxiYWNrKSB7XG4gICAgICAgIHRoaXMuc29sdXRpb25zVGFibGUuc2hvd1Byb2dyZXNzKHsgaGlkZTogZmFsc2UgfSk7XG5cbiAgICAgICAgcHJvbWlzZS50aGVuKChkYXRhKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBzb2x1dGlvbkl0ZW0gPSBkYXRhLmpzb24oKS5zb2x1dGlvbjtcbiAgICAgICAgICAgIGlmIChjYWxsYmFjayBpbnN0YW5jZW9mIEZ1bmN0aW9uKSB7XG4gICAgICAgICAgICAgICAgY2FsbGJhY2soc29sdXRpb25JdGVtKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgd2ViaXgubWVzc2FnZSh7XG4gICAgICAgICAgICAgICAgdHlwZTogXCJzdWNjZXNzXCIsXG4gICAgICAgICAgICAgICAgdGV4dDogXCJUaGUgb3BlcmF0aW9uIGhhcyBiZWVkIGRvbmUgc3VjY2Vzc2Z1bGx5XCJcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICB0aGlzLnNvbHV0aW9uc1RhYmxlLnNob3dQcm9ncmVzcyh7IGhpZGU6IHRydWUgfSk7XG4gICAgICAgIH0pLmNhdGNoKGVycm9yID0+IHtcbiAgICAgICAgICAgIHRoaXMuc2hvd0Vycm9yKFwiRXJyb3IgaGFzIGhhcHBlbmVkIGR1cmluZyB0aGlzIG9wZXJhdGlvbjogXCIgKyBlcnJvci5yZXNwb25zZSwgXCJFcnJvclwiKTtcbiAgICAgICAgICAgIHRoaXMuc29sdXRpb25zVGFibGUuc2hvd1Byb2dyZXNzKHsgaGlkZTogdHJ1ZSB9KTtcbiAgICAgICAgfSlcbiAgICB9XG5cbiAgICBkZWxldGVTb2x1dGlvbihzb2x1dGlvblR5cGUsIHNvbHV0aW9uTmFtZSwgaXRlbUlkKSB7XG4gICAgICAgIHRoaXMuaGFuZGxlUmVzdWx0KHNvbHV0aW9ucy5kZWxldGUoc29sdXRpb25UeXBlLCBzb2x1dGlvbk5hbWUpLCAoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLnNvbHV0aW9uc1RhYmxlLnJlbW92ZShpdGVtSWQpXG4gICAgICAgIH0pO1xuXG4gICAgfVxuXG4gICAgbG9hZFNvbHV0aW9ucygpIHtcbiAgICAgICAgc29sdXRpb25zLmxpc3QoKS50aGVuKGRhdGEgPT4ge1xuICAgICAgICAgICAgbGV0IHNvbHV0aW9ucyA9IGRhdGEuanNvbigpLnNvbHV0aW9uc1xuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzb2x1dGlvbnMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICBzb2x1dGlvbnNbaV0ucmVzZXJ2YXRpb24gPSBKU09OLnBhcnNlKHNvbHV0aW9uc1tpXS5yZXNlcnZhdGlvbilcbiAgICAgICAgICAgICAgICBzb2x1dGlvbnNbaV0uZm9ybV9pbmZvID0gSlNPTi5wYXJzZShzb2x1dGlvbnNbaV0uZm9ybV9pbmZvKVxuXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLnNvbHV0aW9uc1RhYmxlLnBhcnNlKHNvbHV0aW9ucyk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHZpZXdJdGVtKGlkKSB7XG4gICAgICAgIHRoaXMucmVzZXJ2YXRpb25WaWV3LnNob3dGb3IodGhpcy5zb2x1dGlvbnNUYWJsZS5nZXRJdGVtKGlkKSk7XG4gICAgfVxuXG4gICAgaW5pdCh2aWV3KSB7XG4gICAgICAgIGNvbnN0IHNlbGYgPSB0aGlzO1xuXG4gICAgICAgIHNlbGYuZXJyb3JWaWV3ID0gdGhpcy51aShFcnJvclZpZXcpO1xuICAgICAgICBzZWxmLnJlc2VydmF0aW9uVmlldyA9IHNlbGYudWkoUmVzZXJ2YXRpb25WaWV3KTtcblxuICAgICAgICBjb25zdCBtZW51ID0gd2ViaXgudWkoe1xuICAgICAgICAgICAgdmlldzogXCJjb250ZXh0bWVudVwiLFxuICAgICAgICAgICAgaWQ6IFwic29sdXRpb25zX2NtXCJcbiAgICAgICAgfSk7XG5cbiAgICAgICAgdGhpcy5zb2x1dGlvbnNUYWJsZSA9IHRoaXMuJCQoXCJzb2x1dGlvbnNfdGFibGVcIik7XG4gICAgICAgIHNlbGYubG9hZFNvbHV0aW9ucygpO1xuICAgICAgICB3ZWJpeC5leHRlbmQodGhpcy5zb2x1dGlvbnNUYWJsZSwgd2ViaXguUHJvZ3Jlc3NCYXIpO1xuXG4gICAgICAgIGZ1bmN0aW9uIGNoZWNrQWN0aW9uKGFjdGlvbiwgc2VsZWN0ZWRJdGVtSWQpIHtcbiAgICAgICAgICAgIGNvbnN0IGl0ZW0gPSBzZWxmLnNvbHV0aW9uc1RhYmxlLmdldEl0ZW0oc2VsZWN0ZWRJdGVtSWQpO1xuICAgICAgICAgICAgaWYgKGl0ZW0pIHtcbiAgICAgICAgICAgICAgICBsZXQgaXRlbUlkID0gaXRlbS5pZDtcbiAgICAgICAgICAgICAgICBsZXQgc29sdXRpb25OYW1lID0gaXRlbS5zb2x1dGlvbk5hbWU7XG4gICAgICAgICAgICAgICAgbGV0IHNvbHV0aW9uVHlwZSA9IGl0ZW0uc29sdXRpb25UeXBlO1xuICAgICAgICAgICAgICAgIGxldCBuZXh0QWN0aW9uID0gaXRlbS5yZXNlcnZhdGlvbi5uZXh0X2FjdGlvblxuXG4gICAgICAgICAgICAgICAgaWYgKGFjdGlvbiA9PSAnZGVsZXRlJykge1xuICAgICAgICAgICAgICAgICAgICB3ZWJpeC5jb25maXJtKHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRpdGxlOiBcIkNhbmNlbCBTb2x1dGlvblwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgb2s6IFwiWWVzXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICB0ZXh0OiBgQXJlIHlvdSBzdXJlIHlvdSB3YW50IHRvIGNhbmNlbCAke3NvbHV0aW9uTmFtZX0/YCxcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhbmNlbDogXCJOb1wiLFxuICAgICAgICAgICAgICAgICAgICB9KS50aGVuKCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuZGVsZXRlU29sdXRpb24oc29sdXRpb25UeXBlLCBzb2x1dGlvbk5hbWUsIGl0ZW1JZClcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB3ZWJpeC5tZXNzYWdlKFwiWW91IG5lZWQgdG8gc2VsZWN0IGEgc29sdXRpb25cIilcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgICQkKFwic29sdXRpb25zX2NtXCIpLmF0dGFjaEV2ZW50KFwib25NZW51SXRlbUNsaWNrXCIsIGZ1bmN0aW9uIChpZCkge1xuICAgICAgICAgICAgY2hlY2tBY3Rpb24oaWQsIHNlbGYuc29sdXRpb25zVGFibGUuZ2V0U2VsZWN0ZWRJZCgpKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgc2VsZi5zb2x1dGlvbnNUYWJsZS5hdHRhY2hFdmVudChcIm9uSXRlbURibENsaWNrXCIsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHNlbGYudmlld0l0ZW0oc2VsZi5zb2x1dGlvbnNUYWJsZS5nZXRTZWxlY3RlZElkKCkpO1xuICAgICAgICB9KTtcblxuICAgICAgICB3ZWJpeC5ldmVudChzZWxmLnNvbHV0aW9uc1RhYmxlLiR2aWV3LCBcImNvbnRleHRtZW51XCIsIGZ1bmN0aW9uIChlIC8qTW91c2VFdmVudCovKSB7XG4gICAgICAgICAgICBjb25zdCBwb3MgPSBzZWxmLnNvbHV0aW9uc1RhYmxlLmxvY2F0ZShlKTtcbiAgICAgICAgICAgIGlmIChwb3MpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBpdGVtID0gc2VsZi5zb2x1dGlvbnNUYWJsZS5nZXRJdGVtKHBvcy5yb3cpO1xuICAgICAgICAgICAgICAgIGNvbnN0IGFjdGlvbnMgPSBbJ2RlbGV0ZSddO1xuXG4gICAgICAgICAgICAgICAgbWVudS5jbGVhckFsbCgpO1xuICAgICAgICAgICAgICAgIG1lbnUucGFyc2UoYWN0aW9ucyk7XG4gICAgICAgICAgICAgICAgbWVudS5zaG93KGUpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHdlYml4Lmh0bWwucHJldmVudEV2ZW50KGUpO1xuICAgICAgICB9KVxuXG4gICAgfVxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc291cmNlcy92aWV3cy9kZXBsb3llZFNvbHV0aW9ucy9pbmRleC5qcyIsImltcG9ydCB7IEV4dGVybmFsVmlldyB9IGZyb20gXCIuLi9leHRlcm5hbFwiO1xuXG5jb25zdCBVUkwgPSBcIi90aHJlZWJvdC9mYXJtbWFuYWdlbWVudFwiO1xuY29uc3QgUkVRVUlSRURfUEFDS0FHRVMgPSB7XG4gICAgXCJ0aHJlZWJvdC5mYXJtbWFuYWdlbWVudFwiOiBcImh0dHBzOi8vZ2l0aHViLmNvbS90aHJlZWZvbGR0ZWNoL2p1bXBzY2FsZVhfdGhyZWVib3QvdHJlZS9kZXZlbG9wbWVudC9UaHJlZUJvdFBhY2thZ2VzL3RocmVlYm90L2Zhcm1tYW5hZ2VtZW50XCJcbn1cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRmFybW1hbmFnZW1lbnRWaWV3IGV4dGVuZHMgRXh0ZXJuYWxWaWV3IHtcbiAgICBjb25zdHJ1Y3RvcihhcHAsIG5hbWUpIHtcbiAgICAgICAgc3VwZXIoYXBwLCBuYW1lLCBVUkwsIFJFUVVJUkVEX1BBQ0tBR0VTKTtcbiAgICB9XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zb3VyY2VzL3ZpZXdzL2Zhcm1tYW5hZ2VtZW50L2luZGV4LmpzIiwiaW1wb3J0IHsgRXh0ZXJuYWxWaWV3IH0gZnJvbSBcIi4uL2V4dGVybmFsXCI7XG5cbmNvbnN0IFVSTCA9IFwiL3RocmVlZm9sZC9zaW11bGF0b3Ivbm90ZWJvb2svXCI7XG5jb25zdCBSRVFVSVJFRF9QQUNLQUdFUyA9IHtcbiAgICBcInRocmVlZm9sZC5zaW11bGF0b3JcIjogXCJodHRwczovL2dpdGh1Yi5jb20vdGhyZWVmb2xkdGVjaC9qdW1wc2NhbGVYX3RocmVlYm90L3RyZWUvZGV2ZWxvcG1lbnQvVGhyZWVCb3RQYWNrYWdlcy90aHJlZWZvbGQvc2ltdWxhdG9yXCJcbn1cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgSnVweXRlclZpZXcgZXh0ZW5kcyBFeHRlcm5hbFZpZXcge1xuICAgIGNvbnN0cnVjdG9yKGFwcCwgbmFtZSkge1xuICAgICAgICBzdXBlcihhcHAsIG5hbWUsIFVSTCwgUkVRVUlSRURfUEFDS0FHRVMpO1xuICAgIH1cbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NvdXJjZXMvdmlld3MvanVweXRlci9pbmRleC5qcyIsImltcG9ydCB7IEpldFZpZXcgfSBmcm9tIFwid2ViaXgtamV0XCI7XG5cbmltcG9ydCBBcHBMb2dzVmlldyBmcm9tIFwiLi9hcHBMb2dzXCI7XG5pbXBvcnQgeyBsb2dzIH0gZnJvbSBcIi4uLy4uL3NlcnZpY2VzL2xvZ3NcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTG9nc1ZpZXcgZXh0ZW5kcyBKZXRWaWV3IHtcbiAgICBjb25maWcoKSB7XG5cbiAgICAgICAgY29uc3QgdmlldyA9IHtcbiAgICAgICAgICAgIHJvd3M6IFt7XG4gICAgICAgICAgICAgICAgY29sczogW1xuICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICB2aWV3OiBcInRlbXBsYXRlXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICB0eXBlOiBcImhlYWRlclwiLCB0ZW1wbGF0ZTogXCJMb2dzXCIsXG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZpZXc6IFwiY29tYm9cIixcbiAgICAgICAgICAgICAgICAgICAgICAgIGlkOiBcImFwcHNfY29tYm9cIixcbiAgICAgICAgICAgICAgICAgICAgICAgIHBsYWNlaG9sZGVyOiBcIkNob29zZSB5b3VyIGFwcGxpY2F0aW9uXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBhbGlnbjpcInJpZ2h0XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBvbjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlOiBmdW5jdGlvbiAoYXBwTmFtZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLiRzY29wZS5zaG93KGAvbWFpbi9sb2dzYClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy4kc2NvcGUuc2hvd0ZvcihhcHBOYW1lKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmlldzpcImJ1dHRvblwiLCBcbiAgICAgICAgICAgICAgICAgICAgICAgIGlkOlwiYnRuX2RlbGV0ZVwiLCBcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlOlwiRGVsZXRlXCIsIFxuICAgICAgICAgICAgICAgICAgICAgICAgY3NzOlwid2ViaXhfZGFuZ2VyXCIsIFxuICAgICAgICAgICAgICAgICAgICAgICAgaW5wdXRXaWR0aDoxMjAsXG4gICAgICAgICAgICAgICAgICAgICAgICBjbGljazogZnVuY3Rpb24gKCl7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy4kc2NvcGUuZGVsZXRlKClcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmlldzpcImJ1dHRvblwiLCBcbiAgICAgICAgICAgICAgICAgICAgICAgIGlkOlwiYnRuX2RlbGV0ZV9hbGxcIiwgXG4gICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZTpcIkRlbGV0ZSBBbGxcIiwgXG4gICAgICAgICAgICAgICAgICAgICAgICBjc3M6XCJ3ZWJpeF9kYW5nZXJcIiwgXG4gICAgICAgICAgICAgICAgICAgICAgICBhbGlnbjoncmlnaHQnLFxuICAgICAgICAgICAgICAgICAgICAgICAgaW5wdXRXaWR0aDoxMDAsXG4gICAgICAgICAgICAgICAgICAgICAgICBjbGljazogZnVuY3Rpb24gKCl7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy4kc2NvcGUuZGVsZXRlX2FsbCgpXG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIHsgd2lkdGg6MjAgfVxuICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIEFwcExvZ3NWaWV3XG4gICAgICAgICAgICBdXG4gICAgICAgIH07XG5cbiAgICAgICAgcmV0dXJuIHZpZXc7XG4gICAgfVxuXG4gICAgaW5pdCh2aWV3KSB7XG4gICAgICAgIHZpZXcuYXBwc0NvbWJvID0gJCQoXCJhcHBzX2NvbWJvXCIpO1xuICAgICAgICBsb2dzLmxpc3RBcHBzKCkudGhlbihkYXRhID0+IHtcbiAgICAgICAgICAgIHZpZXcuYXBwc0NvbWJvLmRlZmluZShcIm9wdGlvbnNcIiwgZGF0YS5qc29uKCkpO1xuICAgICAgICAgICAgdmlldy5hcHBzQ29tYm8ucmVuZGVyKCk7XG4gICAgICAgIH0pO1xuXG4gICAgfVxuXG4gICAgdXJsQ2hhbmdlKHZpZXcsIHVybCkge1xuICAgICAgICBjb25zdCBhcHBOYW1lID0gdXJsWzBdLnBhcmFtcy5hcHBuYW1lLCBsb2dJZCA9IHVybFswXS5wYXJhbXMubG9naWQ7XG4gICAgICAgIGlmIChhcHBOYW1lKSB7XG4gICAgICAgICAgICB0aGlzLnNob3dGb3IoYXBwTmFtZSwgbG9nSWQpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgc2hvd0ZvcihhcHBOYW1lLCBsb2dJZCkge1xuICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgICAgIHNlbGYuYXBwTG9ncyA9ICQkKFwiYXBwbG9nc190YWJsZVwiKTtcblxuICAgICAgICB3ZWJpeC51aSh7XG4gICAgICAgICAgICB2aWV3OiBcImNvbnRleHRtZW51XCIsXG4gICAgICAgICAgICBpZDogXCJsb2dzX2NtXCIsXG4gICAgICAgICAgICBkYXRhOiBbXCJEZWxldGVcIl1cbiAgICAgICAgfSkuYXR0YWNoVG8oc2VsZi5hcHBMb2dzKTtcblxuICAgICAgICB3ZWJpeC5leHRlbmQoc2VsZi5hcHBMb2dzLCB3ZWJpeC5Qcm9ncmVzc0Jhcik7XG4gICAgICAgIHNlbGYuYXBwTG9ncy5zaG93UHJvZ3Jlc3MoeyBoaWRlOiBmYWxzZSB9KTtcblxuICAgICAgICBsb2dzLmxpc3QoYXBwTmFtZSwgbG9nSWQpLnRoZW4oZGF0YSA9PiB7XG4gICAgICAgICAgICBzZWxmLmFwcExvZ3MuY2xlYXJBbGwoKVxuICAgICAgICAgICAgc2VsZi5hcHBMb2dzLnBhcnNlKGRhdGEuanNvbigpWzBdKVxuICAgICAgICAgICAgc2VsZi5hcHBMb2dzLnNob3dQcm9ncmVzcyh7IGhpZGU6IHRydWUgfSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgICQkKFwibG9nc19jbVwiKS5hdHRhY2hFdmVudChcIm9uTWVudUl0ZW1DbGlja1wiLCBmdW5jdGlvbiAoaWQpIHtcbiAgICAgICAgICAgIGlmIChpZCA9PSBcIkRlbGV0ZVwiKSB7XG4gICAgICAgICAgICAgICAgc2VsZi5kZWxldGVTZWxlY3RlZChzZWxmLmFwcExvZ3MuZ2V0U2VsZWN0ZWRJZCh0cnVlKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGRlbGV0ZSgpe1xuICAgICAgICBsZXQgYXBwbmFtZSA9ICQkKFwiYXBwc19jb21ib1wiKS5nZXRWYWx1ZSgpO1xuICAgICAgICBpZihhcHBuYW1lKXtcbiAgICAgICAgICAgIHdlYml4LmNvbmZpcm0oe1xuICAgICAgICAgICAgICAgIHRpdGxlOiBcIkRlbGV0ZSBsb2dzXCIsXG4gICAgICAgICAgICAgICAgb2s6IFwiRGVsZXRlXCIsXG4gICAgICAgICAgICAgICAgY2FuY2VsOiBcIk5vXCIsXG4gICAgICAgICAgICAgICAgdGV4dDogYERlbGV0ZSAke2FwcG5hbWV9IGxvZ3M/YFxuICAgICAgICAgICAgfSkudGhlbigoKSA9PiB7XG4gICAgICAgICAgICAgICAgbG9ncy5kZWxldGUoYXBwbmFtZSkudGhlbigoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucmVmcmVzaCgpO1xuICAgICAgICAgICAgICAgICAgICB3ZWJpeC5tZXNzYWdlKHsgdHlwZTogXCJzdWNjZXNzXCIsIHRleHQ6IGAke2FwcG5hbWV9IGxvZ3MgZGVsZXRlZCBzdWNjZXNzZnVsbHlgIH0pO1xuICAgICAgICAgICAgICAgIH0pLmNhdGNoKGVycm9yID0+IHtcbiAgICAgICAgICAgICAgICAgICAgd2ViaXgubWVzc2FnZSh7IHR5cGU6IFwiZXJyb3JcIiwgdGV4dDogXCJDb3VsZCBub3QgZGVsZXRlIGxvZ3NcIiB9KTtcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1lbHNle1xuICAgICAgICAgICAgd2ViaXgubWVzc2FnZSh7IHR5cGU6IFwiZXJyb3JcIiwgdGV4dDogXCJQbGVhc2Ugc2VsZWN0IGFwcCBmb3IgZGVsZXRlXCIgfSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBkZWxldGVTZWxlY3RlZChvYmplY3RzKSB7XG4gICAgICAgIHZhciBzZWxmID0gdGhpcztcbiAgICAgICAgc2VsZi5hcHBMb2dzID0gJCQoXCJhcHBsb2dzX3RhYmxlXCIpO1xuXG4gICAgICAgIGxldCBpZHMgPSBbXVxuXG4gICAgICAgIGZvciAobGV0IG9iaiBvZiBvYmplY3RzKSB7XG4gICAgICAgICAgICBpZHMucHVzaChvYmouaWQpO1xuICAgICAgICB9XG5cbiAgICAgICAgd2ViaXguY29uZmlybSh7XG4gICAgICAgICAgICB0aXRsZTogXCJEZWxldGUgc2VsZWN0ZWQgbG9nc1wiLFxuICAgICAgICAgICAgb2s6IFwiWWVzXCIsXG4gICAgICAgICAgICBjYW5jZWw6IFwiTm9cIixcbiAgICAgICAgICAgIHRleHQ6IGBkZWxldGUgbG9ncyB3aXRoIGlkcyAke2lkcy5qb2luKFwiLCBcIil9YFxuICAgICAgICB9KS50aGVuKCgpID0+IHtcbiAgICAgICAgICAgIGxvZ3MuZGVsZXRlU2VsZWN0ZWQoaWRzKS50aGVuKCBkYXRhID0+IHtcbiAgICAgICAgICAgICAgICBzZWxmLmFwcC5yZWZyZXNoKClcbiAgICAgICAgICAgICAgICB3ZWJpeC5tZXNzYWdlKHsgdHlwZTogXCJzdWNjZXNzXCIsIHRleHQ6IFwiTG9ncyBkZWxldGVkXCIgfSk7XG4gICAgICAgICAgICB9KS5jYXRjaChlcnJvciA9PiB7XG4gICAgICAgICAgICAgICAgd2ViaXgubWVzc2FnZSh7IHR5cGU6IFwiZXJyb3JcIiwgdGV4dDogXCJDb3VsZCBub3QgZGVsZXRlIGxvZ3NcIiB9KTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGRlbGV0ZV9hbGwoKXtcbiAgICAgICAgd2ViaXguY29uZmlybSh7XG4gICAgICAgICAgICB0aXRsZTogXCJEZWxldGUgYWxsIGxvZ3NcIixcbiAgICAgICAgICAgIG9rOiBcIkRlbGV0ZVwiLFxuICAgICAgICAgICAgY2FuY2VsOiBcIk5vXCIsXG4gICAgICAgICAgICB0ZXh0OiBgRGVsZXRlIGFsbCBsb2dzP2BcbiAgICAgICAgfSkudGhlbigoKSA9PiB7XG4gICAgICAgICAgICBsb2dzLmRlbGV0ZUFsbCgpLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMucmVmcmVzaCgpO1xuICAgICAgICAgICAgICAgIHdlYml4Lm1lc3NhZ2UoeyB0eXBlOiBcInN1Y2Nlc3NcIiwgdGV4dDogYEFsbCBsb2dzIGRlbGV0ZWQgc3VjY2Vzc2Z1bGx5YCB9KTtcbiAgICAgICAgICAgIH0pLmNhdGNoKGVycm9yID0+IHtcbiAgICAgICAgICAgICAgICB3ZWJpeC5tZXNzYWdlKHsgdHlwZTogXCJlcnJvclwiLCB0ZXh0OiBcIkNvdWxkIG5vdCBkZWxldGUgbG9nc1wiIH0pO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgfSk7XG4gICAgfVxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc291cmNlcy92aWV3cy9sb2dzL2luZGV4LmpzIiwiaW1wb3J0IHsgSmV0VmlldyB9IGZyb20gXCJ3ZWJpeC1qZXRcIjtcblxuaW1wb3J0IHsgRXJyb3JWaWV3IH0gZnJvbSBcIi4uL2Vycm9ycy9kaWFsb2dcIjtcbmltcG9ydCB7IHBhY2thZ2VzIH0gZnJvbSBcIi4uLy4uL3NlcnZpY2VzL3BhY2thZ2VzXCI7XG5pbXBvcnQgUGFja2FnZURldGFpbHNWaWV3IGZyb20gXCIuL3BhY2thZ2VEZXRhaWxzXCJcblxuY29uc3QgVU5LTk9XTl9TVEFUVVMgPSAnVW5rbm93bic7XG5cbmNvbnN0IFBBQ0tBR0VfU1RBVEVTID0gW1xuICAgIHtcbiAgICAgICAgbmFtZTogXCJJbml0XCIsXG4gICAgICAgIGFjdGlvbnM6IFtdXG4gICAgfSxcbiAgICB7XG4gICAgICAgIG5hbWU6IFwiQ29uZmlnXCIsXG4gICAgICAgIGFjdGlvbnM6IFsnaW5zdGFsbCddLFxuICAgIH0sXG4gICAge1xuICAgICAgICBuYW1lOiBcIkluc3RhbGxlZFwiLFxuICAgICAgICBhY3Rpb25zOiBbJ3N0YXJ0J11cbiAgICB9LFxuICAgIHtcbiAgICAgICAgbmFtZTogXCJSdW5uaW5nXCIsXG4gICAgICAgIGFjdGlvbnM6IFtcInN0b3BcIl1cbiAgICB9LFxuICAgIHtcbiAgICAgICAgbmFtZTogXCJIYWx0ZWRcIixcbiAgICAgICAgYWN0aW9uczogW1wic3RhcnRcIiwgXCJkaXNhYmxlXCJdXG4gICAgfSxcbiAgICB7XG4gICAgICAgIG5hbWU6IFwiRGlzYWJsZWRcIixcbiAgICAgICAgYWN0aW9uczogW1wiZW5hYmxlXCJdXG4gICAgfSxcbiAgICB7XG4gICAgICAgIG5hbWU6IFwiRXJyb3JcIixcbiAgICAgICAgYWN0aW9uczogWydpbnN0YWxsJ11cbiAgICB9XG5dO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBQYWNrYWdlc1ZpZXcgZXh0ZW5kcyBKZXRWaWV3IHtcbiAgICBjb25maWcoKSB7XG4gICAgICAgIGNvbnN0IGdyaWQgPSB7XG4gICAgICAgICAgICByb3dzOiBbe1xuICAgICAgICAgICAgICAgIC8vSGVhZGVyXG4gICAgICAgICAgICAgICAgdmlldzogXCJ0ZW1wbGF0ZVwiLFxuICAgICAgICAgICAgICAgIHR5cGU6IFwiaGVhZGVyXCIsXG4gICAgICAgICAgICAgICAgdGVtcGxhdGU6IFwiUGFja2FnZXNcIixcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7IC8vYWRkaW5nIFBhY2thZ2VcbiAgICAgICAgICAgICAgICBjb2xzOiBbe1xuICAgICAgICAgICAgICAgICAgICAvL3NlbGVjdG9yXG4gICAgICAgICAgICAgICAgICAgIHZpZXc6IFwic2VsZWN0XCIsXG4gICAgICAgICAgICAgICAgICAgIGlkOiAnbWV0aG9kX3NlbGVjdG9yJyxcbiAgICAgICAgICAgICAgICAgICAgb3B0aW9uczogW1wiUGF0aFwiLCBcIkdpdHVybFwiXSxcbiAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDEwMFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgLy90ZXh0IGFyZWFcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIHZpZXc6IFwidGV4dFwiLFxuICAgICAgICAgICAgICAgICAgICBpZDogJ3BhY2thZ2VfcGF0aCcsXG4gICAgICAgICAgICAgICAgICAgIGlucHV0QWxpZ246IFwibGVmdFwiLFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgLy9zdWJtaXQgYnV0dG9uXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICB2aWV3OiBcImJ1dHRvblwiLFxuICAgICAgICAgICAgICAgICAgICBpZDogXCJhZGRfcGFja2FnZV9idXR0b25cIixcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU6IFwiQWRkIHBhY2thZ2VcIixcbiAgICAgICAgICAgICAgICAgICAgYXV0b3dpZHRoOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICB0eXBlOiBcIlwiLFxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgeyAvL0RhdGFUYWJsZVxuICAgICAgICAgICAgICAgIHZpZXc6IFwiZGF0YXRhYmxlXCIsXG4gICAgICAgICAgICAgICAgaWQ6IFwicGFja2FnZXNfdGFibGVcIixcbiAgICAgICAgICAgICAgICByZXNpemVDb2x1bW46IHRydWUsXG4gICAgICAgICAgICAgICAgdHlwZToge1xuICAgICAgICAgICAgICAgICAgICBoZWlnaHQ6IDIwMCxcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHNjcm9sbDogXCJ4eVwiLFxuICAgICAgICAgICAgICAgIGF1dG9Db25maWc6IHRydWUsXG4gICAgICAgICAgICAgICAgdmlldzogXCJkYXRhdGFibGVcIixcbiAgICAgICAgICAgICAgICBzZWxlY3Q6IHRydWUsXG4gICAgICAgICAgICAgICAgY3NzOiBcIndlYml4X2hlYWRlcl9ib3JkZXIgd2ViaXhfZGF0YV9ib3JkZXJcIixcbiAgICAgICAgICAgICAgICBvbkNvbnRleHQ6IHt9LFxuICAgICAgICAgICAgICAgIGNvbHVtbnM6IFt7XG4gICAgICAgICAgICAgICAgICAgIGlkOiBcImluZGV4XCIsXG4gICAgICAgICAgICAgICAgICAgIGhlYWRlcjogXCIjXCIsXG4gICAgICAgICAgICAgICAgICAgIHNvcnQ6IFwiaW50XCIsXG4gICAgICAgICAgICAgICAgICAgIGF1dG93aWR0aDogdHJ1ZSxcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgaWQ6IFwiYXV0aG9yXCIsXG4gICAgICAgICAgICAgICAgICAgIGhlYWRlcjogW1wiQXV0aG9yXCIsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRlbnQ6IFwic2VsZWN0RmlsdGVyXCJcbiAgICAgICAgICAgICAgICAgICAgfV0sXG4gICAgICAgICAgICAgICAgICAgIHNvcnQ6IFwic3RyaW5nXCIsXG4gICAgICAgICAgICAgICAgICAgIHdpZHRoOiAyMDBcbiAgICAgICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgICAgIGlkOiBcInNvdXJjZV9uYW1lXCIsXG4gICAgICAgICAgICAgICAgICAgIGhlYWRlcjogW1wiTmFtZVwiLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb250ZW50OiBcInRleHRGaWx0ZXJcIlxuICAgICAgICAgICAgICAgICAgICB9XSxcbiAgICAgICAgICAgICAgICAgICAgc29ydDogXCJzdHJpbmdcIixcbiAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDIwMFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBpZDogXCJzdGF0dXNcIixcbiAgICAgICAgICAgICAgICAgICAgaGVhZGVyOiBcIlN0YXR1c1wiLFxuICAgICAgICAgICAgICAgICAgICBzb3J0OiBcInN0cmluZ1wiLFxuICAgICAgICAgICAgICAgICAgICBmb3JtYXQ6ICh2YWx1ZSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3Qgc3RhdHVzID0gUEFDS0FHRV9TVEFURVNbdmFsdWVdO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHN0YXR1cyAmJiBzdGF0dXMubmFtZSB8fCBVTktOT1dOX1NUQVRVUztcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgICAgIGlkOiBcInBhdGhcIixcbiAgICAgICAgICAgICAgICAgICAgaGVhZGVyOiBcIlBhdGhcIixcbiAgICAgICAgICAgICAgICAgICAgc29ydDogXCJzdHJpbmdcIixcbiAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDcwMFxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgIHNjaGVtZToge1xuICAgICAgICAgICAgICAgICAgICAkaW5pdDogZnVuY3Rpb24gKG9iaikge1xuICAgICAgICAgICAgICAgICAgICAgICAgb2JqLnNvdXJjZV9uYW1lID0gb2JqLnNvdXJjZS5uYW1lO1xuICAgICAgICAgICAgICAgICAgICAgICAgb2JqLmF1dGhvciA9IG9iai5zb3VyY2UudGhyZWVib3Q7XG4gICAgICAgICAgICAgICAgICAgICAgICBvYmouaW5kZXggPSB0aGlzLmNvdW50KCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBdXG4gICAgICAgIH07XG4gICAgICAgIHJldHVybiBncmlkO1xuICAgIH1cblxuICAgIHNob3dFcnJvcihtZXNzYWdlKSB7XG4gICAgICAgIHRoaXMuZXJyb3JWaWV3LnNob3dFcnJvcihtZXNzYWdlKTtcbiAgICB9XG5cbiAgICBoYW5kbGVSZXN1bHQocHJvbWlzZSwgY2FsbGJhY2spIHtcbiAgICAgICAgdGhpcy5wYWNrYWdlVGFibGUuc2hvd1Byb2dyZXNzKHsgaGlkZTogZmFsc2UgfSk7XG5cbiAgICAgICAgcHJvbWlzZS50aGVuKChkYXRhKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBwYWNrYWdlSXRlbSA9IGRhdGEuanNvbigpLnBhY2thZ2U7XG4gICAgICAgICAgICBpZiAoY2FsbGJhY2sgaW5zdGFuY2VvZiBGdW5jdGlvbikge1xuICAgICAgICAgICAgICAgIGNhbGxiYWNrKHBhY2thZ2VJdGVtKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgd2ViaXgubWVzc2FnZSh7XG4gICAgICAgICAgICAgICAgdHlwZTogXCJzdWNjZXNzXCIsXG4gICAgICAgICAgICAgICAgdGV4dDogXCJUaGUgb3BlcmF0aW9uIGhhcyBiZWVkIGRvbmUgc3VjY2Vzc2Z1bGx5XCJcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICB0aGlzLnBhY2thZ2VUYWJsZS5zaG93UHJvZ3Jlc3MoeyBoaWRlOiB0cnVlIH0pO1xuICAgICAgICB9KS5jYXRjaChlcnJvciA9PiB7XG4gICAgICAgICAgICB0aGlzLnNob3dFcnJvcihcIkVycm9yIGhhcyBoYXBwZW5lZCBkdXJpbmcgdGhpcyBvcGVyYXRpb246IFwiICsgZXJyb3IucmVzcG9uc2UsIFwiRXJyb3JcIik7XG4gICAgICAgICAgICB0aGlzLnBhY2thZ2VUYWJsZS5zaG93UHJvZ3Jlc3MoeyBoaWRlOiB0cnVlIH0pO1xuICAgICAgICB9KVxuICAgIH1cblxuICAgIGFkZFBhY2thZ2UocGF0aCwgZ2l0VXJsLCBpdGVtSWQpIHtcbiAgICAgICAgdGhpcy5oYW5kbGVSZXN1bHQocGFja2FnZXMuYWRkKHBhdGgsIGdpdFVybCksIChpdGVtKSA9PiB7XG4gICAgICAgICAgICBpZiAoaXRlbUlkKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5wYWNrYWdlVGFibGUudXBkYXRlSXRlbShpdGVtSWQsIGl0ZW0pO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLnBhY2thZ2VUYWJsZS5hZGQoaXRlbSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGRlbGV0ZVBhY2thZ2UocGFja2FnZU5hbWUsIGl0ZW1JZCkge1xuICAgICAgICB0aGlzLmhhbmRsZVJlc3VsdChwYWNrYWdlcy5kZWxldGUocGFja2FnZU5hbWUpLCAoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLnBhY2thZ2VUYWJsZS5yZW1vdmUoaXRlbUlkKVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBzdGFydFBhY2thZ2UocGFja2FnZU5hbWUsIGl0ZW1JZCkge1xuICAgICAgICB0aGlzLmhhbmRsZVJlc3VsdChwYWNrYWdlcy5zdGFydChwYWNrYWdlTmFtZSksIChpdGVtKSA9PiB7XG4gICAgICAgICAgICB0aGlzLnBhY2thZ2VUYWJsZS51cGRhdGVJdGVtKGl0ZW1JZCwgaXRlbSk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHN0b3BQYWNrYWdlKHBhY2thZ2VOYW1lLCBpdGVtSWQpIHtcbiAgICAgICAgdGhpcy5oYW5kbGVSZXN1bHQocGFja2FnZXMuc3RvcChwYWNrYWdlTmFtZSksIChpdGVtKSA9PiB7XG4gICAgICAgICAgICB0aGlzLnBhY2thZ2VUYWJsZS51cGRhdGVJdGVtKGl0ZW1JZCwgaXRlbSk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGVuYWJsZVBhY2thZ2UocGFja2FnZU5hbWUsIGl0ZW1JZCkge1xuICAgICAgICB0aGlzLmhhbmRsZVJlc3VsdChwYWNrYWdlcy5lbmFibGUocGFja2FnZU5hbWUpLCAoaXRlbSkgPT4ge1xuICAgICAgICAgICAgdGhpcy5wYWNrYWdlVGFibGUudXBkYXRlSXRlbShpdGVtSWQsIGl0ZW0pO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBkaXNhYmxlUGFja2FnZShwYWNrYWdlTmFtZSwgaXRlbUlkKSB7XG4gICAgICAgIHRoaXMuaGFuZGxlUmVzdWx0KHBhY2thZ2VzLmRpc2FibGUocGFja2FnZU5hbWUpLCAoaXRlbSkgPT4ge1xuICAgICAgICAgICAgdGhpcy5wYWNrYWdlVGFibGUudXBkYXRlSXRlbShpdGVtSWQsIGl0ZW0pO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBsb2FkUGFja2FnZXMoKSB7XG4gICAgICAgIHBhY2thZ2VzLmxpc3QoKS50aGVuKGRhdGEgPT4ge1xuICAgICAgICAgICAgdGhpcy5wYWNrYWdlVGFibGUucGFyc2UoZGF0YS5qc29uKCkucGFja2FnZXMpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBpbml0KHZpZXcpIHtcbiAgICAgICAgY29uc3Qgc2VsZiA9IHRoaXM7XG5cbiAgICAgICAgc2VsZi5lcnJvclZpZXcgPSB0aGlzLnVpKEVycm9yVmlldyk7XG4gICAgICAgIHNlbGYucGFja2FnZURldGFpbHNWaWV3ID0gc2VsZi51aShQYWNrYWdlRGV0YWlsc1ZpZXcpO1xuICAgICAgICBzZWxmLl9yZXF1aXJlZHBhY2thZ2VzID0gW1wiemVyb2JvdC5iYXNlXCIsIFwiemVyb2JvdC53ZWJpbnRlcmZhY2VcIiwgXCJ6ZXJvYm90LmFkbWluXCJdXG5cbiAgICAgICAgY29uc3QgbWVudSA9IHdlYml4LnVpKHtcbiAgICAgICAgICAgIHZpZXc6IFwiY29udGV4dG1lbnVcIixcbiAgICAgICAgICAgIGlkOiBcInBhY2thZ2VzX2NtXCJcbiAgICAgICAgfSk7XG5cbiAgICAgICAgdGhpcy5wYWNrYWdlVGFibGUgPSB0aGlzLiQkKFwicGFja2FnZXNfdGFibGVcIik7XG4gICAgICAgIHdlYml4LmV4dGVuZCh0aGlzLnBhY2thZ2VUYWJsZSwgd2ViaXguUHJvZ3Jlc3NCYXIpO1xuXG4gICAgICAgIGZ1bmN0aW9uIGNoZWNrQWN0aW9uKGFjdGlvbiwgc2VsZWN0ZWRJdGVtSWQpIHtcbiAgICAgICAgICAgIGNvbnN0IGl0ZW0gPSBzZWxmLnBhY2thZ2VUYWJsZS5nZXRJdGVtKHNlbGVjdGVkSXRlbUlkKTtcbiAgICAgICAgICAgIGlmIChpdGVtKSB7XG4gICAgICAgICAgICAgICAgbGV0IGl0ZW1JZCA9IGl0ZW0uaWQ7XG4gICAgICAgICAgICAgICAgbGV0IHBhY2thZ2VOYW1lID0gaXRlbS5uYW1lO1xuXG4gICAgICAgICAgICAgICAgaWYgKGFjdGlvbiA9PSAnaW5zdGFsbCcpIHtcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5hZGRQYWNrYWdlKGl0ZW0ucGF0aCwgbnVsbCwgaXRlbUlkKTtcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGFjdGlvbiA9PSAnZGVsZXRlJykge1xuICAgICAgICAgICAgICAgICAgICB3ZWJpeC5jb25maXJtKHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRpdGxlOiBcIkRlbGV0ZSBQYWNrYWdlXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBvazogXCJZZXNcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIHRleHQ6IGBBcmUgeW91IHN1cmUgeW91IHdhbnQgdG8gZGVsZXRlICR7cGFja2FnZU5hbWV9P2AsXG4gICAgICAgICAgICAgICAgICAgICAgICBjYW5jZWw6IFwiTm9cIixcbiAgICAgICAgICAgICAgICAgICAgfSkudGhlbigoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxmLmRlbGV0ZVBhY2thZ2UocGFja2FnZU5hbWUsIGl0ZW1JZClcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIC8vXG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChhY3Rpb24gPT0gJ3N0YXJ0Jykge1xuICAgICAgICAgICAgICAgICAgICBzZWxmLnN0YXJ0UGFja2FnZShwYWNrYWdlTmFtZSwgaXRlbUlkKVxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoYWN0aW9uID09ICdzdG9wJykge1xuICAgICAgICAgICAgICAgICAgICBzZWxmLnN0b3BQYWNrYWdlKHBhY2thZ2VOYW1lLCBpdGVtSWQpXG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChhY3Rpb24gPT0gJ2Rpc2FibGUnKSB7XG4gICAgICAgICAgICAgICAgICAgIHNlbGYuZGlzYWJsZVBhY2thZ2UocGFja2FnZU5hbWUsIGl0ZW1JZClcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGFjdGlvbiA9PSAnZW5hYmxlJykge1xuICAgICAgICAgICAgICAgICAgICBzZWxmLmVuYWJsZVBhY2thZ2UocGFja2FnZU5hbWUsIGl0ZW1JZClcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHdlYml4Lm1lc3NhZ2UoXCJ5b3UgaGF2ZSB0byBzZWxlY3QgYSBwYWNrYWdlXCIpXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICAkJChcImFkZF9wYWNrYWdlX2J1dHRvblwiKS5hdHRhY2hFdmVudChcIm9uSXRlbUNsaWNrXCIsIGZ1bmN0aW9uIChpZCkge1xuICAgICAgICAgICAgbGV0IHBhY2FrZ2VMb2NhdGlvbiA9ICQkKFwicGFja2FnZV9wYXRoXCIpLmdldFZhbHVlKClcbiAgICAgICAgICAgIGlmIChwYWNha2dlTG9jYXRpb24gPT0gXCJcIikge1xuICAgICAgICAgICAgICAgIGFsZXJ0KFwicGxlYXNlIGVudGVyIHBhY2thZ2UgbG9jYXRpb25cIilcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgbGV0IHBhY2thZ2VNZXRob2QgPSAkJChcIm1ldGhvZF9zZWxlY3RvclwiKS5nZXRWYWx1ZSgpXG4gICAgICAgICAgICAgICAgbGV0IGdpdFVybCA9IG51bGw7XG4gICAgICAgICAgICAgICAgbGV0IHBhdGggPSBudWxsO1xuICAgICAgICAgICAgICAgIGlmIChwYWNrYWdlTWV0aG9kID09IFwiR2l0dXJsXCIpIHtcbiAgICAgICAgICAgICAgICAgICAgZ2l0VXJsID0gcGFjYWtnZUxvY2F0aW9uXG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChwYWNrYWdlTWV0aG9kID09IFwiUGF0aFwiKSB7XG4gICAgICAgICAgICAgICAgICAgIHBhdGggPSBwYWNha2dlTG9jYXRpb25cbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBhbGVydChcInNvbWV0aGluZyB3ZW50IHdyb25nIGR1cmluZyBzZWxlY3RpbmcgdGhlIHBhY2thZ2UgbWV0aG9kXCIpXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHNlbGYuYWRkUGFja2FnZShwYXRoLCBnaXRVcmwpXG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgICQkKFwicGFja2FnZXNfY21cIikuYXR0YWNoRXZlbnQoXCJvbk1lbnVJdGVtQ2xpY2tcIiwgZnVuY3Rpb24gKGlkKSB7XG4gICAgICAgICAgICBjaGVja0FjdGlvbihpZCwgc2VsZi5wYWNrYWdlVGFibGUuZ2V0U2VsZWN0ZWRJZCgpKTtcbiAgICAgICAgfSk7XG5cblxuICAgICAgICB3ZWJpeC5ldmVudChzZWxmLnBhY2thZ2VUYWJsZS4kdmlldywgXCJjb250ZXh0bWVudVwiLCBmdW5jdGlvbiAoZSAvKk1vdXNlRXZlbnQqLykge1xuICAgICAgICAgICAgY29uc3QgcG9zID0gc2VsZi5wYWNrYWdlVGFibGUubG9jYXRlKGUpO1xuICAgICAgICAgICAgaWYgKHBvcykge1xuICAgICAgICAgICAgICAgIGNvbnN0IGl0ZW0gPSBzZWxmLnBhY2thZ2VUYWJsZS5nZXRJdGVtKHBvcy5yb3cpO1xuICAgICAgICAgICAgICAgIGlmIChzZWxmLl9yZXF1aXJlZHBhY2thZ2VzLmluY2x1ZGVzKGl0ZW0ubmFtZSkpIHtcbiAgICAgICAgICAgICAgICAgICAgd2ViaXgubWVzc2FnZSh7IHR5cGU6IFwiZXJyb3JcIiwgdGV4dDogYCR7aXRlbS5uYW1lfSBpcyByZXF1aXJlZCBwYWNrYWdlYCB9KTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGNvbnN0IGFjdGlvbnMgPSBbLi4uUEFDS0FHRV9TVEFURVNbaXRlbS5zdGF0dXNdLmFjdGlvbnMsICdkZWxldGUnXTtcblxuICAgICAgICAgICAgICAgIG1lbnUuY2xlYXJBbGwoKTtcbiAgICAgICAgICAgICAgICBtZW51LnBhcnNlKGFjdGlvbnMpO1xuICAgICAgICAgICAgICAgIG1lbnUuc2hvdyhlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiB3ZWJpeC5odG1sLnByZXZlbnRFdmVudChlKTtcbiAgICAgICAgfSlcblxuICAgICAgICBzZWxmLmxvYWRQYWNrYWdlcygpO1xuXG4gICAgICAgIHNlbGYucGFja2FnZVRhYmxlLmF0dGFjaEV2ZW50KFwib25JdGVtRGJsQ2xpY2tcIiwgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgbGV0IGlkID0gc2VsZi5wYWNrYWdlVGFibGUuZ2V0U2VsZWN0ZWRJZCgpXG4gICAgICAgICAgICBsZXQgaXRlbSA9IHNlbGYucGFja2FnZVRhYmxlLmdldEl0ZW0oaWQpXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhpdGVtKVxuICAgICAgICAgICAgbGV0IHBhY2thZ2VEYXRhID0ge1xuICAgICAgICAgICAgICAgICdzb3VyY2VfbmFtZSc6IGl0ZW1bJ3NvdXJjZV9uYW1lJ10sXG4gICAgICAgICAgICAgICAgJ2lkJzogaXRlbVsnaWQnXSxcbiAgICAgICAgICAgICAgICAnc3RhdHVzJzogUEFDS0FHRV9TVEFURVNbaXRlbVsnc3RhdHVzJ11dID9cbiAgICAgICAgICAgICAgICAgICAgUEFDS0FHRV9TVEFURVNbaXRlbVsnc3RhdHVzJ11dLm5hbWUgOlxuICAgICAgICAgICAgICAgICAgICBVTktOT1dOX1NUQVRVUyxcbiAgICAgICAgICAgICAgICAnYXV0aG9yJzogaXRlbVsnc291cmNlJ11bJ3RocmVlYm90J10sXG4gICAgICAgICAgICAgICAgJ2Rlc2NyaXB0aW9uJzogaXRlbVsnc291cmNlJ11bJ2Rlc2NyaXB0aW9uJ10sXG4gICAgICAgICAgICAgICAgJ3ZlcnNpb24nOiBpdGVtWydzb3VyY2UnXVsndmVyc2lvbiddLFxuICAgICAgICAgICAgICAgICdpbnN0YWxsX2t3YXJncyc6IEpTT04uc3RyaW5naWZ5KGl0ZW1bJ2luc3RhbGxfa3dhcmdzJ10pLFxuICAgICAgICAgICAgICAgICdmcm9udGVuZF9hcmdzJzogSlNPTi5zdHJpbmdpZnkoaXRlbVsnZnJvbnRlbmRfYXJncyddKSxcbiAgICAgICAgICAgICAgICAncGF0aCc6IGl0ZW1bJ3BhdGgnXSxcbiAgICAgICAgICAgICAgICAnZ2l0dXJsJzogaXRlbVsnZ2l0dXJsJ11cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHNlbGYucGFja2FnZURldGFpbHNWaWV3LnNob3dQYWNrYWdlRGV0YWlscyhwYWNrYWdlRGF0YSk7XG4gICAgICAgIH0pO1xuICAgIH1cbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NvdXJjZXMvdmlld3MvcGFja2FnZXMvaW5kZXguanMiLCJpbXBvcnQgeyBFeHRlcm5hbFZpZXcgfSBmcm9tIFwiLi4vZXh0ZXJuYWxcIjtcblxuY29uc3QgVVJMID0gXCIvdGhyZWVmb2xkL3Nka2V4YW1wbGVzL25vdGVib29rL1wiO1xuY29uc3QgUkVRVUlSRURfUEFDS0FHRVMgPSB7XG4gICAgXCJ0aHJlZWZvbGQuc2RrZXhhbXBsZXNcIjogXCJodHRwczovL2dpdGh1Yi5jb20vdGhyZWVmb2xkdGVjaC9qdW1wc2NhbGVYX3RocmVlYm90L3RyZWUvZGV2ZWxvcG1lbnQvVGhyZWVCb3RQYWNrYWdlcy90aHJlZWZvbGQvc2RrZXhhbXBsZXNcIlxufVxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBKdXB5dGVyVmlldyBleHRlbmRzIEV4dGVybmFsVmlldyB7XG4gICAgY29uc3RydWN0b3IoYXBwLCBuYW1lKSB7XG4gICAgICAgIHN1cGVyKGFwcCwgbmFtZSwgVVJMLCBSRVFVSVJFRF9QQUNLQUdFUyk7XG4gICAgfVxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc291cmNlcy92aWV3cy9zZGtleGFtcGxlcy9pbmRleC5qcyIsImltcG9ydCB7IEpldFZpZXcgfSBmcm9tIFwid2ViaXgtamV0XCI7XG5cblxuaW1wb3J0IEFkbWluc1ZpZXcgZnJvbSBcIi4vYWRtaW5zXCI7XG5pbXBvcnQgR2VuZXJhbFZpZXcgZnJvbSBcIi4vZ2VuZXJhbFwiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTZXR0aW5nc1ZpZXcgZXh0ZW5kcyBKZXRWaWV3IHtcbiAgICBjb25maWcoKSB7XG4gICAgICAgIGNvbnN0IHZpZXcgPSB7XG4gICAgICAgICAgICB2aWV3OiBcInRhYnZpZXdcIixcbiAgICAgICAgICAgIGNlbGxzOiBbe1xuICAgICAgICAgICAgICAgIGhlYWRlcjogXCJHZW5lcmFsXCIsXG4gICAgICAgICAgICAgICAgYm9keTogR2VuZXJhbFZpZXcsXG4gICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgaGVhZGVyOiBcIkFkbWluaXN0cmF0b3JzXCIsXG4gICAgICAgICAgICAgICAgYm9keTogQWRtaW5zVmlld1xuICAgICAgICAgICAgfV1cbiAgICAgICAgfTtcblxuICAgICAgICByZXR1cm4gdmlldztcbiAgICB9XG5cbiAgICBpbml0KHZpZXcpIHtcbiAgICB9XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zb3VyY2VzL3ZpZXdzL3NldHRpbmdzL2luZGV4LmpzIiwiaW1wb3J0IHsgSmV0VmlldyB9IGZyb20gXCJ3ZWJpeC1qZXRcIjtcblxuaW1wb3J0IFdhbGxldEZvcm1WaWV3IGZyb20gXCIuL3dhbGxldEZvcm1cIjtcbmltcG9ydCBXYWxsZXREZXRhaWxzVmlldyBmcm9tIFwiLi93YWxsZXREZXRhaWxzXCI7XG5pbXBvcnQgV2FsbGV0SW1wb3J0VmlldyBmcm9tICBcIi4vaW1wb3J0Rm9ybVwiXG5pbXBvcnQgeyB3YWxsZXQgfSBmcm9tIFwiLi4vLi4vc2VydmljZXMvd2FsbGV0XCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFdhbGxldE1hbmFnZXJWaWV3IGV4dGVuZHMgSmV0VmlldyB7XG4gICAgY29uZmlnKCkge1xuICAgICAgICBjb25zdCB3YWxsZXRzID0ge1xuICAgICAgICAgICAgdmlldzogXCJkYXRhdGFibGVcIixcbiAgICAgICAgICAgIGlkOiBcIndhbGxldHNfdGFibGVcIixcbiAgICAgICAgICAgIHJlc2l6ZUNvbHVtbjogdHJ1ZSxcbiAgICAgICAgICAgIHNlbGVjdDogdHJ1ZSxcbiAgICAgICAgICAgIG11bHRpc2VsZWN0OiB0cnVlLFxuICAgICAgICAgICAgY3NzOiBcIndlYml4X2hlYWRlcl9ib3JkZXIgd2ViaXhfZGF0YV9ib3JkZXJcIixcbiAgICAgICAgICAgIHNjcm9sbDogdHJ1ZSxcbiAgICAgICAgICAgIGF1dG9Db25maWc6IHRydWUsXG4gICAgICAgICAgICBjb2x1bW5zOiBbe1xuICAgICAgICAgICAgICAgIGlkOiBcImluZGV4XCIsXG4gICAgICAgICAgICAgICAgaGVhZGVyOiBcIiNcIixcbiAgICAgICAgICAgICAgICBzb3J0OiBcImludFwiLFxuICAgICAgICAgICAgICAgIGF1dG93aWR0aDogdHJ1ZSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgaWQ6IFwibmFtZVwiLFxuICAgICAgICAgICAgICAgIGhlYWRlcjogW1wiTmFtZVwiXSxcbiAgICAgICAgICAgICAgICBzb3J0OiBcInN0cmluZ1wiLFxuICAgICAgICAgICAgICAgIGF1dG93aWR0aDogdHJ1ZSxcbiAgICAgICAgICAgICAgICB3aWR0aDogMTQwXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGlkOiBcImFkZHJlc3NcIixcbiAgICAgICAgICAgICAgICBoZWFkZXI6IFtcIkFkZHJlc3NcIl0sXG4gICAgICAgICAgICAgICAgc29ydDogXCJzdHJpbmdcIixcbiAgICAgICAgICAgICAgICBhdXRvd2lkdGg6IHRydWUsXG4gICAgICAgICAgICAgICAgd2lkdGg6ICdhdXRvJ1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgXSxcbiAgICAgICAgICAgIHNjaGVtZToge1xuICAgICAgICAgICAgICAgICRpbml0OiBmdW5jdGlvbiAob2JqKSB7XG4gICAgICAgICAgICAgICAgICAgIG9iai5pbmRleCA9IHRoaXMuY291bnQoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG5cbiAgICAgICAgY29uc3QgdmlldyA9IHtcbiAgICAgICAgICAgIGNvbHM6IFtcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIHZpZXc6IFwidGVtcGxhdGVcIixcbiAgICAgICAgICAgICAgICAgICAgdHlwZTogXCJoZWFkZXJcIiwgdGVtcGxhdGU6IFwiV2FsbGV0c1wiLFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICB2aWV3OlwiYnV0dG9uXCIsIFxuICAgICAgICAgICAgICAgICAgICBpZDpcImJ0bl9jcmVhdGVcIiwgXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlOlwiQ3JlYXRlIFdhbGxldFwiLCBcbiAgICAgICAgICAgICAgICAgICAgY3NzOlwid2ViaXhfc2Vjb25kYXJ5XCIsIFxuICAgICAgICAgICAgICAgICAgICBhdXRvd2lkdGg6dHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgY2xpY2s6IGZ1bmN0aW9uICgpe1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy4kc2NvcGUuV2FsbGV0Rm9ybVZpZXcuc2hvd0Zvcm0oKVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIHZpZXc6XCJidXR0b25cIiwgXG4gICAgICAgICAgICAgICAgICAgIGlkOlwiYnRuX2ltcG9ydFwiLCBcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU6XCJJbXBvcnQgV2FsbGV0XCIsIFxuICAgICAgICAgICAgICAgICAgICBjc3M6XCJ3ZWJpeF9zZWNvbmRhcnlcIiwgXG4gICAgICAgICAgICAgICAgICAgIGF1dG93aWR0aDp0cnVlLFxuICAgICAgICAgICAgICAgICAgICBjbGljazogZnVuY3Rpb24gKCl7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLiRzY29wZS5XYWxsZXRJbXBvcnRWaWV3LnNob3dGb3JtKClcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIF1cbiAgICAgICAgfTtcblxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgcm93czogW1xuICAgICAgICAgICAgICAgIHZpZXcsXG4gICAgICAgICAgICAgICAgd2FsbGV0c1xuICAgICAgICAgICAgXVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgaW5pdCh2aWV3KSB7XG4gICAgICAgIHZhciBzZWxmID0gdGhpcztcblxuICAgICAgICBzZWxmLndhbGxldHNfdGFibGUgPSAkJChcIndhbGxldHNfdGFibGVcIik7XG4gICAgICAgIHNlbGYuV2FsbGV0RGV0YWlsc1ZpZXcgPSBzZWxmLnVpKFdhbGxldERldGFpbHNWaWV3KVxuICAgICAgICBzZWxmLldhbGxldEZvcm1WaWV3ID0gc2VsZi51aShXYWxsZXRGb3JtVmlldyk7XG4gICAgICAgIHNlbGYuV2FsbGV0SW1wb3J0VmlldyA9IHNlbGYudWkoV2FsbGV0SW1wb3J0Vmlldyk7XG4gICAgICAgIFxuICAgICAgICBzZWxmLndhbGxldHNfdGFibGUuYXR0YWNoRXZlbnQoXCJvbkl0ZW1EYmxDbGlja1wiLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB3ZWJpeC5leHRlbmQoc2VsZi53YWxsZXRzX3RhYmxlLCB3ZWJpeC5Qcm9ncmVzc0Jhcik7XG4gICAgICAgICAgICBzZWxmLndhbGxldHNfdGFibGUuc2hvd1Byb2dyZXNzKHtcbiAgICAgICAgICAgICAgICB0eXBlOlwiaWNvblwiLFxuICAgICAgICAgICAgICAgIGhpZGU6IGZhbHNlXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgbGV0IGl0ZW0gPSBzZWxmLndhbGxldHNfdGFibGUuZ2V0U2VsZWN0ZWRJdGVtKClcbiAgICAgICAgICAgIHdhbGxldC5tYW5hZ2VXYWxsZXQoaXRlbS5uYW1lKS50aGVuKGRhdGEgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGRhdGEuanNvbigpKVxuICAgICAgICAgICAgICAgIGxldCByZXMgPSBkYXRhLmpzb24oKVxuICAgICAgICAgICAgICAgIHZhciBpbmZvID0ge1xuICAgICAgICAgICAgICAgICAgICAnbmFtZSc6IGl0ZW0ubmFtZSxcbiAgICAgICAgICAgICAgICAgICAgJ2FkZHJlc3MnOiByZXMuYWRkcmVzcyxcbiAgICAgICAgICAgICAgICAgICAgJ3NlY3JldCc6IHJlcy5zZWNyZXQsXG4gICAgICAgICAgICAgICAgICAgICdiYWxhbmNlcyc6IHJlcy5iYWxhbmNlc1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBzZWxmLldhbGxldERldGFpbHNWaWV3LnNob3dJbmZvKGluZm8pXG4gICAgICAgICAgICAgICAgc2VsZi53YWxsZXRzX3RhYmxlLnNob3dQcm9ncmVzcyh7aGlkZTogdHJ1ZX0pO1xuICAgICAgICAgICAgfSkuY2F0Y2goZGF0YSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coZGF0YSk7XG4gICAgICAgICAgICAgICAgc2VsZi53YWxsZXRzX3RhYmxlLnNob3dQcm9ncmVzcyh7aGlkZTogdHJ1ZX0pO1xuICAgICAgICAgICAgICAgIHdlYml4Lm1lc3NhZ2UoeyB0eXBlOiBcImVycm9yXCIsIHRleHQ6IFwiRmFpbGVkIHRvIGxvYWQgd2FsbGV0XCIgfSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgdXJsQ2hhbmdlKHZpZXcsIHVybCkge1xuICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgXG4gICAgICAgIHNlbGYud2FsbGV0c190YWJsZSA9ICAkJChcIndhbGxldHNfdGFibGVcIik7XG4gICAgICAgIHdhbGxldC5nZXRXYWxsZXRzKCkudGhlbihkYXRhID0+IHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGRhdGEuanNvbigpKVxuICAgICAgICAgICAgc2VsZi53YWxsZXRzX3RhYmxlLnBhcnNlKGRhdGEuanNvbigpKVxuICAgICAgICB9KTtcbiAgICB9XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zb3VyY2VzL3ZpZXdzL3dhbGxldHNNYW5hZ2VyL2luZGV4LmpzIiwiaW1wb3J0IHsgU2VydmljZSB9IGZyb20gXCIuLi9jb21tb24vYXBpXCI7XG5cbmNvbnN0IEJBU0VfVVJMID0gXCIvemVyb2JvdC9hZG1pbi9hY3RvcnMvd2FsbGV0XCI7XG5cbmNsYXNzIFdhbGxldFNlcnZpY2UgZXh0ZW5kcyBTZXJ2aWNlIHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgc3VwZXIoQkFTRV9VUkwpO1xuICAgIH1cblxuICAgIGNyZWF0ZVdhbGxldChuYW1lKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmdldENhbGwoXCJjcmVhdGVfd2FsbGV0XCIsIG5hbWUpO1xuICAgIH1cblxuICAgIG1hbmFnZVdhbGxldChuYW1lKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmdldENhbGwoXCJtYW5hZ2Vfd2FsbGV0XCIsIG5hbWUpO1xuICAgIH1cblxuICAgIGdldFdhbGxldHMoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmdldENhbGwoXCJnZXRfd2FsbGV0c1wiKTtcbiAgICB9XG5cbiAgICB1cGRhdGVUcnVzdExpbmVzKG5hbWUpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucG9zdENhbGwoXCJ1cGRhdGVUcnVzdExpbmVzXCIsIHtuYW1lOiBuYW1lfSk7XG4gICAgfVxuXG4gICAgaW1wb3J0V2FsbGV0KG5hbWUsIHNlY3JldCwgbmV0d29yaykge1xuICAgICAgICByZXR1cm4gdGhpcy5wb3N0Q2FsbChcImltcG9ydF93YWxsZXRcIiwge25hbWUsIHNlY3JldCwgbmV0d29ya30pO1xuICAgIH1cbn1cblxuZXhwb3J0IGNvbnN0IHdhbGxldCA9IG5ldyBXYWxsZXRTZXJ2aWNlKCk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zb3VyY2VzL3NlcnZpY2VzL3dhbGxldC5qcyIsImltcG9ydCB7IEpldFZpZXcgfSBmcm9tIFwid2ViaXgtamV0XCI7XG5pbXBvcnQgeyBwYWNrYWdlcyB9IGZyb20gXCIuLi8uLi9zZXJ2aWNlcy93aWtpXCI7XG5cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgV2lraXNWaWV3IGV4dGVuZHMgSmV0VmlldyB7XG4gICAgY29uZmlnKCkge1xuICAgICAgICBjb25zdCB2aWV3ID0ge1xuICAgICAgICAgICAgdmlldzogXCJkYXRhdGFibGVcIixcbiAgICAgICAgICAgIGlkOiBcIndpa2lzX3RhYmxlXCIsXG4gICAgICAgICAgICByZXNpemVDb2x1bW46IHRydWUsXG4gICAgICAgICAgICBzZWxlY3Q6IHRydWUsXG4gICAgICAgICAgICBtdWx0aXNlbGVjdDogdHJ1ZSxcbiAgICAgICAgICAgIGNzczogXCJ3ZWJpeF9oZWFkZXJfYm9yZGVyIHdlYml4X2RhdGFfYm9yZGVyXCIsXG4gICAgICAgICAgICBjb2x1bW5zOiBbe1xuICAgICAgICAgICAgICAgIGlkOiBcImluZGV4XCIsXG4gICAgICAgICAgICAgICAgaGVhZGVyOiBcIiNcIixcbiAgICAgICAgICAgICAgICBzb3J0OiBcImludFwiLFxuICAgICAgICAgICAgICAgIGF1dG93aWR0aDogdHJ1ZSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgaWQ6IFwibmFtZVwiLFxuICAgICAgICAgICAgICAgIGhlYWRlcjogXCJQYWNrYWdlXCIsXG4gICAgICAgICAgICAgICAgc29ydDogXCJzdHJpbmdcIixcbiAgICAgICAgICAgICAgICB3aWR0aDogMzAwXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGlkOiBcImFjdGlvbnNcIixcbiAgICAgICAgICAgICAgICBoZWFkZXI6IFwiQWN0aW9uc1wiLFxuICAgICAgICAgICAgICAgIHNvcnQ6IFwic3RyaW5nXCIsXG4gICAgICAgICAgICAgICAgd2lkdGg6IDIwMCxcbiAgICAgICAgICAgICAgICB0ZW1wbGF0ZTpmdW5jdGlvbihvYmopeyBcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFwiPGRpdiBjbGFzcz0nd2ViaXhfZWxfYnV0dG9uJz48YnV0dG9uIGNsYXNzPSdidG5fdmlldyc+IFZpZXcgPC9idXR0b24+PC9kaXY+XCI7XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIH1dLFxuICAgICAgICAgICAgb25DbGljazp7XG4gICAgICAgICAgICAgICAgYnRuX3ZpZXc6ZnVuY3Rpb24oZXYsIGlkKXtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGl0ZW0gPSB0aGlzLmdldEl0ZW0oaWQpO1xuICAgICAgICAgICAgICAgICAgICB3aW5kb3cubG9jYXRpb24uaHJlZiA9IGAvYWRtaW4vIyEvbWFpbi93aWtpcy52aWV3P25hbWU9JHtpdGVtLm5hbWV9YFxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGF1dG9Db25maWc6IHRydWUsXG4gICAgICAgICAgICBzY2hlbWU6IHtcbiAgICAgICAgICAgICAgICAkaW5pdDogZnVuY3Rpb24gKG9iaikge1xuICAgICAgICAgICAgICAgICAgICBvYmouaW5kZXggPSB0aGlzLmNvdW50KCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgfTtcblxuICAgICAgICByZXR1cm4gdmlldztcbiAgICB9XG5cbiAgICBpbml0KHZpZXcpIHtcbiAgICAgICAgcGFja2FnZXMubGlzdCgpLnRoZW4oZGF0YSA9PiB7XG4gICAgICAgICAgICB2aWV3LnBhcnNlKGRhdGEuanNvbigpKVxuICAgICAgICB9KTtcbiAgICB9XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zb3VyY2VzL3ZpZXdzL3dpa2lzL2luZGV4LmpzIiwiaW1wb3J0IHsgSmV0VmlldyB9IGZyb20gXCJ3ZWJpeC1qZXRcIjtcblxuaW1wb3J0IHsgYW5zaVVwIH0gZnJvbSBcIi4uLy4uL2NvbW1vbi9jb2xvcnNcIjtcbmltcG9ydCB7IExFVkVMUywgU1RBVEVTLCBUWVBFUyB9IGZyb20gXCIuL2RhdGFcIjtcbmltcG9ydCB7IGRhdGVGb3JtYXR0ZXIgfSBmcm9tIFwiLi4vLi4vY29tbW9uL2Zvcm1hdHRlcnNcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQWxlcnRWaWV3IGV4dGVuZHMgSmV0VmlldyB7XG4gICAgY29uZmlnKCkge1xuICAgICAgICBjb25zdCBpbmZvID0ge1xuICAgICAgICAgICAgdmlldzogXCJmb3JtXCIsXG4gICAgICAgICAgICBpZDogXCJmb3JtXCIsXG4gICAgICAgICAgICBlbGVtZW50c0NvbmZpZzogeyBsYWJlbFdpZHRoOiAxNDAgfSxcbiAgICAgICAgICAgIGVsZW1lbnRzOiBbXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICB2aWV3OiBcInRleHRcIixcbiAgICAgICAgICAgICAgICAgICAgbGFiZWw6IFwiSURcIixcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJpZGVudGlmaWVyXCIsXG4gICAgICAgICAgICAgICAgICAgIHJlYWRvbmx5OiB0cnVlXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIHZpZXc6IFwidGV4dFwiLFxuICAgICAgICAgICAgICAgICAgICBsYWJlbDogXCJUeXBlXCIsXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiYWxlcnRfdHlwZVwiLFxuICAgICAgICAgICAgICAgICAgICByZWFkb25seTogdHJ1ZVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICB2aWV3OiBcInRleHRcIixcbiAgICAgICAgICAgICAgICAgICAgbGFiZWw6IFwiU3RhdHVzXCIsXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwic3RhdHVzXCIsXG4gICAgICAgICAgICAgICAgICAgIHJlYWRvbmx5OiB0cnVlXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIHZpZXc6IFwidGV4dFwiLFxuICAgICAgICAgICAgICAgICAgICBsYWJlbDogXCJMZXZlbFwiLFxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImxldmVsXCIsXG4gICAgICAgICAgICAgICAgICAgIHJlYWRvbmx5OiB0cnVlXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIHZpZXc6IFwidGV4dFwiLFxuICAgICAgICAgICAgICAgICAgICBsYWJlbDogXCJDb3VudFwiLFxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImNvdW50XCIsXG4gICAgICAgICAgICAgICAgICAgIHJlYWRvbmx5OiB0cnVlXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIHZpZXc6IFwidGV4dFwiLFxuICAgICAgICAgICAgICAgICAgICBsYWJlbDogXCJDYXRlZ29yeVwiLFxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImNhdFwiLFxuICAgICAgICAgICAgICAgICAgICByZWFkb25seTogdHJ1ZVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICB2aWV3OiBcInRleHRcIixcbiAgICAgICAgICAgICAgICAgICAgbGFiZWw6IFwiRmlyc3QgdGltZVwiLFxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcInRpbWVfZmlyc3RcIixcbiAgICAgICAgICAgICAgICAgICAgcmVhZG9ubHk6IHRydWVcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgdmlldzogXCJ0ZXh0XCIsXG4gICAgICAgICAgICAgICAgICAgIGxhYmVsOiBcIkxhc3QgdGltZVwiLFxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcInRpbWVfbGFzdFwiLFxuICAgICAgICAgICAgICAgICAgICByZWFkb25seTogdHJ1ZVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICB2aWV3OiBcInRleHRcIixcbiAgICAgICAgICAgICAgICAgICAgbGFiZWw6IFwiTWVzc2FnZSAocHViKVwiLFxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcInB1YmxpY1wiLFxuICAgICAgICAgICAgICAgICAgICByZWFkb25seTogdHJ1ZSxcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgXVxuICAgICAgICB9O1xuXG4gICAgICAgIGNvbnN0IHRhYiA9IHtcbiAgICAgICAgICAgIHZpZXc6IFwidGFidmlld1wiLFxuICAgICAgICAgICAgY2VsbHM6IFtcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIGhlYWRlcjogXCJJbmZvcm1hdGlvblwiLFxuICAgICAgICAgICAgICAgICAgICBib2R5OiBpbmZvLFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBoZWFkZXI6IFwiTWVzc2FnZVwiLFxuICAgICAgICAgICAgICAgICAgICBib2R5OiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZDogXCJtZXNzYWdlXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICB2aWV3OiBcInRlbXBsYXRlXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICB0ZW1wbGF0ZTogXCJcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIHNjcm9sbDogXCJhdXRvXCIsXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgaGVhZGVyOiBcIlRyYWNlYmFja3NcIixcbiAgICAgICAgICAgICAgICAgICAgYm9keToge1xuICAgICAgICAgICAgICAgICAgICAgICAgcm93czogW1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmlldzogXCJ0YWJiYXJcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWQ6IFwidGJfdGFic1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtdWx0aXZpZXc6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9wdGlvbnM6IFtdXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZpZXc6IFwibXVsdGl2aWV3XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlkOiBcInRiX3ZpZXdzXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNlbGxzOiBbXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGVtcGxhdGU6IFwiXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBpZDogXCJsb2dzXCIsXG4gICAgICAgICAgICAgICAgICAgIHZpZXc6IFwiZGF0YXRhYmxlXCIsXG4gICAgICAgICAgICAgICAgICAgIHJlc2l6ZUNvbHVtbjogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgc2VsZWN0OiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICBtdWx0aXNlbGVjdDogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgY3NzOiBcIndlYml4X2hlYWRlcl9ib3JkZXIgd2ViaXhfZGF0YV9ib3JkZXJcIixcbiAgICAgICAgICAgICAgICAgICAgc2Nyb2xsOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICBhdXRvQ29uZmlnOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICBjb2x1bW5zOiBbXG4gICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWQ6IFwiaW5kZXhcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBoZWFkZXI6IFwiI1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNvcnQ6IFwiaW50XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYXV0b3dpZHRoOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdpZHRoOiA2MFxuICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZDogXCJ0aHJlZWJvdF9uYW1lXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaGVhZGVyOiBcIlRocmVlYm90IE5hbWVcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzb3J0OiBcInN0cmluZ1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdpZHRoOiAxODBcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWQ6IFwiYXBwX25hbWVcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBoZWFkZXI6IFwiQXBwIE5hbWVcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzb3J0OiBcInN0cmluZ1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdpZHRoOiAxODBcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWQ6IFwibGF0ZXN0X2xvZ2lkXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaGVhZGVyOiBcIkxhdGVzdCBMb2cjXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc29ydDogXCJpbnRcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aWR0aDogMTgwXG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgICAgIHNjaGVtZToge1xuICAgICAgICAgICAgICAgICAgICAgICAgJGluaXQ6IGZ1bmN0aW9uIChvYmopIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvYmouaW5kZXggPSB0aGlzLmNvdW50KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgXVxuICAgICAgICB9O1xuXG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICB2aWV3OiBcIndpbmRvd1wiLFxuICAgICAgICAgICAgaGVhZDogXCJBbGVydFwiLFxuICAgICAgICAgICAgbW9kYWw6IHRydWUsXG4gICAgICAgICAgICB3aWR0aDogd2luZG93LmlubmVyV2lkdGggKiAuOCxcbiAgICAgICAgICAgIGhlaWdodDogd2luZG93LmlubmVySGVpZ2h0ICogLjgsXG4gICAgICAgICAgICBwb3NpdGlvbjogXCJjZW50ZXJcIixcbiAgICAgICAgICAgIGJvZHk6IHtcbiAgICAgICAgICAgICAgICByb3dzOiBbXG4gICAgICAgICAgICAgICAgICAgIHRhYixcbiAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmlldzogXCJidXR0b25cIixcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlOiBcIk9LXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBjc3M6IFwid2ViaXhfcHJpbWFyeVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgY2xpY2s6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmdldFRvcFBhcmVudFZpZXcoKS5oaWRlKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cblxuICAgIGluaXQoKSB7XG4gICAgICAgIHZhciBzZWxmID0gdGhpcztcbiAgICAgICAgdGhpcy5mb3JtID0gJCQoXCJmb3JtXCIpO1xuICAgICAgICB0aGlzLm1lc3NhZ2UgPSAkJChcIm1lc3NhZ2VcIik7XG4gICAgICAgIHRoaXMubG9ncyA9ICQkKFwibG9nc1wiKTtcblxuICAgICAgICB0aGlzLnRiVmlld3MgPSAkJChcInRiX3ZpZXdzXCIpO1xuICAgICAgICB0aGlzLnRiVGFicyA9ICQkKFwidGJfdGFic1wiKTtcblxuICAgICAgICB0aGlzLmxvZ3MuYXR0YWNoRXZlbnQoXCJvbkl0ZW1EYmxDbGlja1wiLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBsZXQgbG9nRGF0YSA9IHNlbGYubG9ncy5nZXRTZWxlY3RlZEl0ZW0oKVxuICAgICAgICAgICAgdGhpcy4kc2NvcGUuc2hvdyhgL21haW4vbG9ncz9hcHBuYW1lPSR7bG9nRGF0YS5hcHBfbmFtZX0mbG9naWQ9JHtsb2dEYXRhLmxhdGVzdF9sb2dpZH1gKVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBhZGRUcmFjZWJhY2sodGIpIHtcbiAgICAgICAgY29uc3QgdGJJZCA9IGAke3RiLnRocmVlYm90X25hbWV9XyR7dGIucHJvY2Vzc19pZH1gO1xuICAgICAgICBjb25zdCB0YlRpdGxlID0gYCR7dGIudGhyZWVib3RfbmFtZX0gLSBQSUQ6ICgke3RiLnByb2Nlc3NfaWR9KWA7XG5cbiAgICAgICAgdGhpcy50YlZpZXdzLmFkZFZpZXcoe1xuICAgICAgICAgICAgdmlldzogXCJ0ZW1wbGF0ZVwiLFxuICAgICAgICAgICAgaWQ6IHRiSWQsXG4gICAgICAgICAgICBzY3JvbGw6IFwieHlcIixcbiAgICAgICAgICAgIHRlbXBsYXRlOiBgPHA+JHthbnNpVXAuYW5zaV90b19odG1sKHRiLmZvcm1hdHRlZCl9PC9wPmBcbiAgICAgICAgfSk7XG5cbiAgICAgICAgdGhpcy50YlRhYnMuYWRkT3B0aW9uKHRiSWQsIHRiVGl0bGUsIHRydWUpO1xuICAgIH1cblxuICAgIGNsZWFyVHJhY2VCYWNrcygpIHtcbiAgICAgICAgbGV0IGlkID0gdGhpcy50YlRhYnMuZ2V0VmFsdWUoKTtcblxuICAgICAgICB3aGlsZSAoaWQpIHtcbiAgICAgICAgICAgIHRoaXMudGJUYWJzLnJlbW92ZU9wdGlvbihpZCk7XG4gICAgICAgICAgICB0aGlzLnRiVmlld3MucmVtb3ZlVmlldyhpZCk7XG5cbiAgICAgICAgICAgIGlkID0gdGhpcy50YlRhYnMuZ2V0VmFsdWUoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHNob3dGb3IoaXRlbSkge1xuICAgICAgICBsZXQgdmFsdWVzID0gT2JqZWN0LmFzc2lnbih7fSwgaXRlbSk7XG5cbiAgICAgICAgdmFsdWVzLmFsZXJ0X3R5cGUgPSBUWVBFU1tpdGVtLmFsZXJ0X3R5cGVdO1xuICAgICAgICB2YWx1ZXMuc3RhdHVzID0gU1RBVEVTW2l0ZW0uc3RhdHVzXTtcbiAgICAgICAgdmFsdWVzLmxldmVsID0gTEVWRUxTW2l0ZW0ubGV2ZWxdO1xuICAgICAgICB2YWx1ZXMudGltZV9maXJzdCA9IGRhdGVGb3JtYXR0ZXIoaXRlbS50aW1lX2ZpcnN0KTtcbiAgICAgICAgdmFsdWVzLnRpbWVfbGFzdCA9IGRhdGVGb3JtYXR0ZXIoaXRlbS50aW1lX2xhc3QpO1xuICAgICAgICB0aGlzLmZvcm0uc2V0VmFsdWVzKHZhbHVlcyk7XG5cbiAgICAgICAgdGhpcy5tZXNzYWdlLnNldEhUTUwoYDxwPiR7YW5zaVVwLmFuc2lfdG9faHRtbChpdGVtLm1lc3NhZ2UpfTwvcD5gKTtcblxuICAgICAgICB0aGlzLmNsZWFyVHJhY2VCYWNrcygpO1xuXG4gICAgICAgIGZvciAobGV0IHRiIG9mIGl0ZW0udHJhY2ViYWNrcykge1xuICAgICAgICAgICAgdGhpcy5hZGRUcmFjZWJhY2sodGIpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5sb2dzLmNsZWFyQWxsKClcbiAgICAgICAgdGhpcy5sb2dzLnBhcnNlKGl0ZW0ubG9ncyk7XG5cbiAgICAgICAgdGhpcy5nZXRSb290KCkuc2hvdygpO1xuICAgIH1cbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NvdXJjZXMvdmlld3MvYWxlcnRzL2FsZXJ0LmpzIiwiaW1wb3J0IHsgU2VydmljZSB9IGZyb20gXCIuLi9jb21tb24vYXBpXCI7XG5cbmNvbnN0IEJBU0VfVVJMID0gXCIvdGZncmlkL3RhaWdhL2FjdG9ycy90YWlnYVwiO1xuXG5cbmNsYXNzIFRhaWdhU2VydmljZSBleHRlbmRzIFNlcnZpY2Uge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICBzdXBlcihCQVNFX1VSTCk7XG4gICAgfVxuXG4gICAgdXNlckNpcmNsZXModXNlcm5hbWUpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucG9zdENhbGwoXCJnZXRfdXNlcl9jaXJjbGVzXCIsIHsgdXNlcm5hbWU6IHVzZXJuYW1lLCBvdXRwdXRfdHlwZTogXCJqc29uXCIgfSk7XG4gICAgfVxuXG4gICAgdXNlclN0b3JpZXModXNlcm5hbWUpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucG9zdENhbGwoXCJnZXRfdXNlcl9zdG9yaWVzXCIsIHsgdXNlcm5hbWU6IHVzZXJuYW1lLCBvdXRwdXRfdHlwZTogXCJqc29uXCIgfSk7XG4gICAgfVxuXG4gICAgdXNlclRhc2tzKHVzZXJuYW1lKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnBvc3RDYWxsKFwiZ2V0X3VzZXJfdGFza3NcIiwgeyB1c2VybmFtZTogdXNlcm5hbWUsIG91dHB1dF90eXBlOiBcImpzb25cIiB9KTtcbiAgICB9XG5cbn1cblxuXG5leHBvcnQgY29uc3QgdGFpZ2EgPSBuZXcgVGFpZ2FTZXJ2aWNlKCk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zb3VyY2VzL3NlcnZpY2VzL3RhaWdhLmpzIiwiaW1wb3J0IHsgSmV0VmlldyB9IGZyb20gXCJ3ZWJpeC1qZXRcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUHJvY2Vzc0RldGFpbHNWaWV3IGV4dGVuZHMgSmV0VmlldyB7XG4gICAgY29uZmlnKCkge1xuICAgICAgICBjb25zdCBpbmZvID0ge1xuICAgICAgICAgICAgdmlldzogXCJmb3JtXCIsXG4gICAgICAgICAgICBpZDogXCJmb3JtXCIsXG4gICAgICAgICAgICBlbGVtZW50c0NvbmZpZzogeyBsYWJlbFdpZHRoOiAyMDAgfSxcbiAgICAgICAgICAgIGVsZW1lbnRzOiBbXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICB2aWV3OiBcInRleHRcIixcbiAgICAgICAgICAgICAgICAgICAgbGFiZWw6IFwiUHJvY2Vzc1wiLFxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcIm5hbWVcIixcbiAgICAgICAgICAgICAgICAgICAgcmVhZG9ubHk6IHRydWUsXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIHZpZXc6IFwidGV4dFwiLFxuICAgICAgICAgICAgICAgICAgICBsYWJlbDogXCJQSURcIixcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJwaWRcIixcbiAgICAgICAgICAgICAgICAgICAgcmVhZG9ubHk6IHRydWVcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgdmlldzogXCJ0ZXh0XCIsXG4gICAgICAgICAgICAgICAgICAgIGxhYmVsOiBcIkNtZCBsaW5lXCIsXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiY21kbGluZVwiLFxuICAgICAgICAgICAgICAgICAgICByZWFkb25seTogdHJ1ZVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAsXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICB2aWV3OiBcInRleHRcIixcbiAgICAgICAgICAgICAgICAgICAgbGFiZWw6IFwiVXNlcm5hbWVcIixcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJ1c2VybmFtZVwiLFxuICAgICAgICAgICAgICAgICAgICByZWFkb25seTogdHJ1ZVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICB2aWV3OiBcInRleHRcIixcbiAgICAgICAgICAgICAgICAgICAgbGFiZWw6IFwiTWVtb3J5IHVzYWdlIGluIE1CXCIsXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwicnNzXCIsXG4gICAgICAgICAgICAgICAgICAgIHJlYWRvbmx5OiB0cnVlXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIHZpZXc6IFwidGV4dFwiLFxuICAgICAgICAgICAgICAgICAgICBsYWJlbDogXCJTdGF0dXNcIixcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJzdGF0dXNcIixcbiAgICAgICAgICAgICAgICAgICAgcmVhZG9ubHk6IHRydWVcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgdmlldzogXCJ0ZXh0XCIsXG4gICAgICAgICAgICAgICAgICAgIGxhYmVsOiBcIkNyZWF0aW9uIHRpbWVcIixcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJjcmVhdGVfdGltZVwiLFxuICAgICAgICAgICAgICAgICAgICByZWFkb25seTogdHJ1ZVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICB2aWV3OiBcInRleHRcIixcbiAgICAgICAgICAgICAgICAgICAgbGFiZWw6IFwiQ1BVIC0gdXNlciBtb2RlIChzZWNvbmRzKVwiLFxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImNwdV91c2VyXCIsXG4gICAgICAgICAgICAgICAgICAgIHJlYWRvbmx5OiB0cnVlXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIHZpZXc6IFwidGV4dFwiLFxuICAgICAgICAgICAgICAgICAgICBsYWJlbDogXCJDUFUgLSBrZXJuZWwgbW9kZSAoc2Vjb25kcylcIixcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJjcHVfc3lzdGVtXCIsXG4gICAgICAgICAgICAgICAgICAgIHJlYWRvbmx5OiB0cnVlXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIHZpZXc6IFwidGV4dFwiLFxuICAgICAgICAgICAgICAgICAgICBsYWJlbDogXCJOdW1iZXIgb2YgdGhyZWFkc1wiLFxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcInRocmVhZHNcIixcbiAgICAgICAgICAgICAgICAgICAgcmVhZG9ubHk6IHRydWVcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgdmlldzogXCJ0ZXh0XCIsXG4gICAgICAgICAgICAgICAgICAgIGxhYmVsOiBcIk51bWJlciBvZiBmZHMgb3BlbmVkXCIsXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiZmRzXCIsXG4gICAgICAgICAgICAgICAgICAgIHJlYWRvbmx5OiB0cnVlXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIHZpZXc6IFwidGV4dFwiLFxuICAgICAgICAgICAgICAgICAgICBsYWJlbDogXCJQYXJlbnQgcHJvY2VzcyBwaWRcIixcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJwYXJlbnRfcGlkXCIsXG4gICAgICAgICAgICAgICAgICAgIHJlYWRvbmx5OiB0cnVlXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIHZpZXc6IFwidGV4dFwiLFxuICAgICAgICAgICAgICAgICAgICBsYWJlbDogXCJQYXJlbnQgcHJvY2VzcyBuYW1lXCIsXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwicGFyZW50X25hbWVcIixcbiAgICAgICAgICAgICAgICAgICAgcmVhZG9ubHk6IHRydWVcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICBdXG4gICAgICAgIH07XG5cbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHZpZXc6IFwid2luZG93XCIsXG4gICAgICAgICAgICBoZWFkOiBcIlByb2Nlc3MgRGV0YWlsc1wiLFxuICAgICAgICAgICAgbW9kYWw6IHRydWUsXG4gICAgICAgICAgICB3aWR0aDogd2luZG93LmlubmVyV2lkdGggKiAuOCxcbiAgICAgICAgICAgIGhlaWdodDogd2luZG93LmlubmVySGVpZ2h0ICogLjgsXG4gICAgICAgICAgICBwb3NpdGlvbjogXCJjZW50ZXJcIixcbiAgICAgICAgICAgIGJvZHk6IHtcbiAgICAgICAgICAgICAgICByb3dzOiBbXG4gICAgICAgICAgICAgICAgICAgIGluZm8sXG4gICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZpZXc6IFwiYnV0dG9uXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZTogXCJPS1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgY3NzOiBcIndlYml4X3ByaW1hcnlcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIGNsaWNrOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5nZXRUb3BQYXJlbnRWaWV3KCkuaGlkZSgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgc2hvd1Byb2Nlc3NEZXRhaWxzKGRhdGEpIHtcbiAgICAgICAgdGhpcy5mb3JtLnBhcnNlKGRhdGEpXG4gICAgICAgIHRoaXMuZ2V0Um9vdCgpLnNob3coKTtcbiAgICB9XG5cbiAgICBpbml0KCkge1xuICAgICAgICB0aGlzLmZvcm0gPSAkJChcImZvcm1cIik7XG4gICAgfVxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc291cmNlcy92aWV3cy9kYXNoL3Byb2Nlc3NEZXRhaWxzLmpzIiwiaW1wb3J0IHsgSmV0VmlldyB9IGZyb20gXCJ3ZWJpeC1qZXRcIjtcblxuaW1wb3J0IHsgYW5zaVVwIH0gZnJvbSBcIi4uLy4uL2NvbW1vbi9jb2xvcnNcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUmVzZXJ2YXRpb25WaWV3IGV4dGVuZHMgSmV0VmlldyB7XG4gICAgY29uZmlnKCkge1xuICAgICAgICBjb25zdCBpbmZvID0ge1xuICAgICAgICAgICAgdmlldzogXCJmb3JtXCIsXG4gICAgICAgICAgICBpZDogXCJmb3JtXCIsXG4gICAgICAgICAgICBlbGVtZW50c0NvbmZpZzogeyBsYWJlbFdpZHRoOiAxNDAgfSxcbiAgICAgICAgICAgIGVsZW1lbnRzOiBbXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICB2aWV3OiBcInRleHRcIixcbiAgICAgICAgICAgICAgICAgICAgbGFiZWw6IFwiSURcIixcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJpZFwiLFxuICAgICAgICAgICAgICAgICAgICByZWFkb25seTogdHJ1ZVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICB2aWV3OiBcInRleHRcIixcbiAgICAgICAgICAgICAgICAgICAgbGFiZWw6IFwiQ3VzdG9tZXIgdGlkXCIsXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiY3VzdG9tZXJfdGlkXCIsXG4gICAgICAgICAgICAgICAgICAgIHJlYWRvbmx5OiB0cnVlXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIHZpZXc6IFwidGV4dFwiLFxuICAgICAgICAgICAgICAgICAgICBsYWJlbDogXCJOZXh0IGFjdGlvblwiLFxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcIm5leHRfYWN0aW9uXCIsXG4gICAgICAgICAgICAgICAgICAgIHJlYWRvbmx5OiB0cnVlXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIHZpZXc6IFwidGV4dFwiLFxuICAgICAgICAgICAgICAgICAgICBsYWJlbDogXCJleHBpcmF0aW9uXCIsXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiZXhwaXJhdGlvblwiLFxuICAgICAgICAgICAgICAgICAgICByZWFkb25seTogdHJ1ZVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIF1cbiAgICAgICAgfTtcblxuICAgICAgICBjb25zdCB0YWIgPSB7XG4gICAgICAgICAgICB2aWV3OiBcInRhYnZpZXdcIixcbiAgICAgICAgICAgIGlkOiBcInRhYnZpZXdcIixcbiAgICAgICAgICAgIGNlbGxzOiBbXG4gICAgICAgICAgICAgICAge1xuXG4gICAgICAgICAgICAgICAgICAgIGhlYWRlcjogXCJPdmVydmlld1wiLFxuICAgICAgICAgICAgICAgICAgICBhdXRvd2lkdGg6dHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgc2Nyb2xsOid4eScsXG4gICAgICAgICAgICAgICAgICAgIHJvd3M6IFtcbiAgICAgICAgICAgICAgICAgICAgICAgIGluZm8sXG4gICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWQ6XCJmb3JtSW5mb1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZpZXc6XCJkYXRhdGFibGVcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbkFmdGVyUmVuZGVyOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciB3b3JrbG9hZHMgPSBbXCJuZXR3b3Jrc1wiLCBcInpkYnNcIiwgXCJ2b2x1bWVzXCIsIFwiY29udGFpbmVyc1wiLCBcImt1YmVybmV0ZXNcIl07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciBpbmRleCA9IDA7IGluZGV4IDwgd29ya2xvYWRzLmxlbmd0aDsgaW5kZXgrKykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBpdGVtID0gd29ya2xvYWRzW2luZGV4XTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgc2VsZWN0b3IgPSBcIi53ZWJpeF9pdGVtX3RhYltidXR0b25faWQ9J1wiICsgaXRlbSAgKyBcIiddXCI7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHRhYiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3Ioc2VsZWN0b3IpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0YWIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGRhdGEgPSAkJChpdGVtKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGRhdGEpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRhYi5zdHlsZS5kaXNwbGF5ID0gZGF0YS5jb3VudCgpID09IDAgPyBcIm5vbmVcIjogXCJcIjtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzaXplQ29sdW1uOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNjcm9sbDogXCJ4eVwiLFxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29sdW1uczogW3tcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWQ6IFwia2V5XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhlYWRlcjogXCJLZXlcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgd2lkdGg6MTMwXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlkOiBcInZhbHVlXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhlYWRlcjogXCJWYWx1ZVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzY3JvbGw6IFwieFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBzc2ggaXMgdG9vIGxvbmdcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgd2lkdGg6JzQwMDAnXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfV1cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgXVxuXG5cbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgaWQ6IFwibmV0d29ya3NcIixcbiAgICAgICAgICAgICAgICAgICAgaGVhZGVyOiBcIk5ldHdvcmtzXCIsXG4gICAgICAgICAgICAgICAgICAgIHZpZXc6IFwiZGF0YXRhYmxlXCIsXG4gICAgICAgICAgICAgICAgICAgIHJlc2l6ZUNvbHVtbjogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgc2VsZWN0OiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICBtdWx0aXNlbGVjdDogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgY3NzOiBcIndlYml4X2hlYWRlcl9ib3JkZXIgd2ViaXhfZGF0YV9ib3JkZXJcIixcbiAgICAgICAgICAgICAgICAgICAgc2Nyb2xsOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICBhdXRvQ29uZmlnOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICBjb2x1bW5zOiBbXG4gICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWQ6IFwiaW5kZXhcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBoZWFkZXI6IFwiI1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNvcnQ6IFwiaW50XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYXV0b3dpZHRoOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdpZHRoOiA2MFxuICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZDogXCJuZXR3b3JrX25hbWVcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBoZWFkZXI6IFwiTmFtZVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNvcnQ6IFwic3RyaW5nXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDE4MFxuICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZDogXCJpcF9yYW5nZVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhlYWRlcjogXCJJcCByYW5nZVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNvcnQ6IFwic3RyaW5nXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDE4MFxuICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZDogXCJmYXJtZXJfdGlkXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaGVhZGVyOiBcIkZhcm1lclwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNvcnQ6IFwic3RyaW5nXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDE4MFxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgICAgICBzY2hlbWU6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICRpbml0OiBmdW5jdGlvbiAob2JqKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb2JqLm5ldHdvcmtfbmFtZSA9IG9iai5uYW1lO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9iai5pcF9yYW5nZSA9IG9iai5pcHJhbmdlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9iai5mYXJtZXJfdGlkID0gb2JqLmZhcm1lcl90aWQ7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb2JqLmluZGV4ID0gdGhpcy5jb3VudCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9LCBvbjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgb25BZnRlckxvYWQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoIXRoaXMuY291bnQoKSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zaG93T3ZlcmxheShcIk5vIG5ldHdvcmtzIGluIHJlc2VydmF0aW9uXCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5oaWRlT3ZlcmxheSgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIGlkOiBcImNvbnRhaW5lcnNcIixcbiAgICAgICAgICAgICAgICAgICAgaGVhZGVyOiBcIkNvbnRhaW5lcnNcIixcbiAgICAgICAgICAgICAgICAgICAgdmlldzogXCJkYXRhdGFibGVcIixcbiAgICAgICAgICAgICAgICAgICAgcmVzaXplQ29sdW1uOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICBzZWxlY3Q6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgIG11bHRpc2VsZWN0OiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICBjc3M6IFwid2ViaXhfaGVhZGVyX2JvcmRlciB3ZWJpeF9kYXRhX2JvcmRlclwiLFxuICAgICAgICAgICAgICAgICAgICBzY3JvbGw6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgIGF1dG9Db25maWc6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgIGNvbHVtbnM6IFtcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZDogXCJpbmRleFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhlYWRlcjogXCIjXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc29ydDogXCJpbnRcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhdXRvd2lkdGg6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDYwXG4gICAgICAgICAgICAgICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWQ6IFwibm9kZV9pZFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhlYWRlcjogXCJOb2RlIGlkXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc29ydDogXCJzdHJpbmdcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhdXRvd2lkdGg6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDE4MFxuICAgICAgICAgICAgICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlkOiBcImZsaXN0XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaGVhZGVyOiBcIkZsaXN0XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc29ydDogXCJzdHJpbmdcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhdXRvd2lkdGg6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDE4MFxuICAgICAgICAgICAgICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlkOiBcImVudHJ5cG9pbnRcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBoZWFkZXI6IFwiRW50cnlwb2ludFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNvcnQ6IFwic3RyaW5nXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYXV0b3dpZHRoOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdpZHRoOiAxODBcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWQ6IFwiaHViX3VybFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhlYWRlcjogXCJIdWIgdXJsXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc29ydDogXCJzdHJpbmdcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhdXRvd2lkdGg6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDE4MFxuICAgICAgICAgICAgICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlkOiBcImludGVyYWN0aXZlXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaGVhZGVyOiBcIkludGVyYWN0aXZlXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc29ydDogXCJzdHJpbmdcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhdXRvd2lkdGg6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDE4MFxuICAgICAgICAgICAgICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlkOiBcImZhcm1lcl90aWRcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBoZWFkZXI6IFwiRmFybWVyX3RpZFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNvcnQ6IFwic3RyaW5nXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYXV0b3dpZHRoOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdpZHRoOiAxODBcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sXG5cbiAgICAgICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICAgICAgc2NoZW1lOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAkaW5pdDogZnVuY3Rpb24gKG9iaikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9iai5ub2RlX2lkID0gb2JqLm5vZGVfaWQ7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb2JqLmZsaXN0ID0gb2JqLmZsaXN0O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9iai5lbnRyeXBvaW50ID0gb2JqLmVudHJ5cG9pbnQ7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb2JqLmh1Yl91cmwgPSBvYmouaHViX3VybDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvYmouaW50ZXJhY3RpdmUgPSBvYmouaW50ZXJhY3RpdmU7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb2JqLmZhcm1lcl90aWQgPSBvYmouZmFybWVyX3RpZDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvYmouaW5kZXggPSB0aGlzLmNvdW50KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0sIG9uOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBvbkFmdGVyTG9hZDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICghdGhpcy5jb3VudCgpKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNob3dPdmVybGF5KFwiTm8gY29udGFpbmVycyBpbiByZXNlcnZhdGlvblwiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuaGlkZU92ZXJsYXkoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBpZDogXCJ2b2x1bWVzXCIsXG4gICAgICAgICAgICAgICAgICAgIGhlYWRlcjogXCJWb2x1bWVzXCIsXG4gICAgICAgICAgICAgICAgICAgIHZpZXc6IFwiZGF0YXRhYmxlXCIsXG4gICAgICAgICAgICAgICAgICAgIHJlc2l6ZUNvbHVtbjogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgc2VsZWN0OiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICBtdWx0aXNlbGVjdDogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgY3NzOiBcIndlYml4X2hlYWRlcl9ib3JkZXIgd2ViaXhfZGF0YV9ib3JkZXJcIixcbiAgICAgICAgICAgICAgICAgICAgc2Nyb2xsOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICBhdXRvQ29uZmlnOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICBjb2x1bW5zOiBbXG4gICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWQ6IFwiaW5kZXhcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBoZWFkZXI6IFwiI1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNvcnQ6IFwiaW50XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYXV0b3dpZHRoOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdpZHRoOiA2MFxuICAgICAgICAgICAgICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlkOiBcIm5vZGVfaWRcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBoZWFkZXI6IFwiTm9kZSBpZFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNvcnQ6IFwic3RyaW5nXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYXV0b3dpZHRoOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdpZHRoOiAxODBcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZDogXCJzaXplXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaGVhZGVyOiBcIlNpemVcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzb3J0OiBcInN0cmluZ1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGF1dG93aWR0aDogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aWR0aDogMTgwXG4gICAgICAgICAgICAgICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWQ6IFwidHlwZVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhlYWRlcjogXCJUeXBlXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc29ydDogXCJzdHJpbmdcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhdXRvd2lkdGg6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDE4MFxuICAgICAgICAgICAgICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlkOiBcImZhcm1lcl90aWRcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBoZWFkZXI6IFwiRmFybWVyX3RpZFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNvcnQ6IFwic3RyaW5nXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYXV0b3dpZHRoOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdpZHRoOiAxODBcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sXG5cbiAgICAgICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICAgICAgc2NoZW1lOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAkaW5pdDogZnVuY3Rpb24gKG9iaikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9iai5ub2RlX2lkID0gb2JqLm5vZGVfaWQ7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb2JqLnNpemUgPSBvYmouc2l6ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvYmoudHlwZSA9IG9iai50eXBlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9iai5mYXJtZXJfdGlkID0gb2JqLmZhcm1lcl90aWQ7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb2JqLmluZGV4ID0gdGhpcy5jb3VudCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9LCBvbjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgb25BZnRlckxvYWQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoIXRoaXMuY291bnQoKSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zaG93T3ZlcmxheShcIk5vIHZvbHVtZXMgaW4gcmVzZXJ2YXRpb25cIik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmhpZGVPdmVybGF5KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgICAgIGlkOiBcInpkYnNcIixcbiAgICAgICAgICAgICAgICAgICAgaGVhZGVyOiBcIlpkYnNcIixcbiAgICAgICAgICAgICAgICAgICAgdmlldzogXCJkYXRhdGFibGVcIixcbiAgICAgICAgICAgICAgICAgICAgcmVzaXplQ29sdW1uOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICBzZWxlY3Q6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgIG11bHRpc2VsZWN0OiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICBjc3M6IFwid2ViaXhfaGVhZGVyX2JvcmRlciB3ZWJpeF9kYXRhX2JvcmRlclwiLFxuICAgICAgICAgICAgICAgICAgICBzY3JvbGw6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgIGF1dG9Db25maWc6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgIGNvbHVtbnM6IFtcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZDogXCJpbmRleFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhlYWRlcjogXCIjXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc29ydDogXCJpbnRcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhdXRvd2lkdGg6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDYwXG4gICAgICAgICAgICAgICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWQ6IFwibm9kZV9pZFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhlYWRlcjogXCJOb2RlIGlkXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc29ydDogXCJzdHJpbmdcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhdXRvd2lkdGg6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDE4MFxuICAgICAgICAgICAgICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlkOiBcInNpemVcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBoZWFkZXI6IFwiU2l6ZVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNvcnQ6IFwic3RyaW5nXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYXV0b3dpZHRoOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdpZHRoOiAxODBcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZDogXCJkaXNrX3R5cGVcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBoZWFkZXI6IFwiRGlzayB0eXBlXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc29ydDogXCJzdHJpbmdcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhdXRvd2lkdGg6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDE4MFxuICAgICAgICAgICAgICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlkOiBcIm1vZGVcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBoZWFkZXI6IFwiTW9kZVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNvcnQ6IFwic3RyaW5nXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYXV0b3dpZHRoOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdpZHRoOiAxODBcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZDogXCJwdWJsaWNcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBoZWFkZXI6IFwicHVibGljXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc29ydDogXCJzdHJpbmdcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhdXRvd2lkdGg6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDE4MFxuICAgICAgICAgICAgICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlkOiBcImZhcm1lcl90aWRcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBoZWFkZXI6IFwiRmFybWVyX3RpZFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNvcnQ6IFwic3RyaW5nXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYXV0b3dpZHRoOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdpZHRoOiAxODBcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sXG5cbiAgICAgICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICAgICAgc2NoZW1lOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAkaW5pdDogZnVuY3Rpb24gKG9iaikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9iai5pbmRleCA9IHRoaXMuY291bnQoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSwgb246IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG9uQWZ0ZXJMb2FkOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCF0aGlzLmNvdW50KCkpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2hvd092ZXJsYXkoXCJObyB6ZGJzIGluIHJlc2VydmF0aW9uXCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5oaWRlT3ZlcmxheSgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgICAgICBpZDogXCJrdWJlcm5ldGVzXCIsXG4gICAgICAgICAgICAgICAgICAgIGhlYWRlcjogXCJLdWJlcm5ldGVzXCIsXG4gICAgICAgICAgICAgICAgICAgIHZpZXc6IFwiZGF0YXRhYmxlXCIsXG4gICAgICAgICAgICAgICAgICAgIHJlc2l6ZUNvbHVtbjogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgc2VsZWN0OiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICBtdWx0aXNlbGVjdDogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgY3NzOiBcIndlYml4X2hlYWRlcl9ib3JkZXIgd2ViaXhfZGF0YV9ib3JkZXJcIixcbiAgICAgICAgICAgICAgICAgICAgc2Nyb2xsOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICBhdXRvQ29uZmlnOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICBjb2x1bW5zOiBbXG4gICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWQ6IFwiaW5kZXhcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBoZWFkZXI6IFwiI1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNvcnQ6IFwiaW50XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYXV0b3dpZHRoOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdpZHRoOiA2MFxuICAgICAgICAgICAgICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlkOiBcIm5vZGVfaWRcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBoZWFkZXI6IFwiTm9kZSBpZFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNvcnQ6IFwic3RyaW5nXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYXV0b3dpZHRoOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdpZHRoOiAxODBcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZDogXCJzaXplXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaGVhZGVyOiBcIlNpemVcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzb3J0OiBcInN0cmluZ1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGF1dG93aWR0aDogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aWR0aDogMTgwXG4gICAgICAgICAgICAgICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWQ6IFwibmV0d29ya19pZFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhlYWRlcjogXCJOZXR3b3JrIGlkXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc29ydDogXCJzdHJpbmdcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhdXRvd2lkdGg6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDE4MFxuICAgICAgICAgICAgICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlkOiBcImlwYWRkcmVzc1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhlYWRlcjogXCJJcCBhZGRyZXNzXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc29ydDogXCJzdHJpbmdcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhdXRvd2lkdGg6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDE4MFxuICAgICAgICAgICAgICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlkOiBcIm1hc3Rlcl9pcHNfc3RyXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaGVhZGVyOiBcIk1hc3RlciBpcHNcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzb3J0OiBcInN0cmluZ1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGF1dG93aWR0aDogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aWR0aDogMTgwXG4gICAgICAgICAgICAgICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWQ6IFwiZmFybWVyX3RpZFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhlYWRlcjogXCJGYXJtZXJfdGlkXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc29ydDogXCJzdHJpbmdcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhdXRvd2lkdGg6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDE4MFxuICAgICAgICAgICAgICAgICAgICAgICAgfSxcblxuICAgICAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgICAgICBzY2hlbWU6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICRpbml0OiBmdW5jdGlvbiAob2JqKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb2JqLm1hc3Rlcl9pcHNfc3RyID0gb2JqLm1hc3Rlcl9pcHMudG9TdHJpbmcoKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9iai5pbmRleCA9IHRoaXMuY291bnQoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSwgb246IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG9uQWZ0ZXJMb2FkOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCF0aGlzLmNvdW50KCkpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2hvd092ZXJsYXkoXCJObyBrdWJlcm5ldGVzIGluIHJlc2VydmF0aW9uXCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5oaWRlT3ZlcmxheSgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSxcblxuICAgICAgICAgICAgXVxuICAgICAgICB9O1xuXG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICB2aWV3OiBcIndpbmRvd1wiLFxuICAgICAgICAgICAgaGVhZDogXCJSZXNlcnZhdGlvblwiLFxuICAgICAgICAgICAgaWQ6IFwicmVzZXJ2YXRpb25fdmlld1wiLFxuICAgICAgICAgICAgbW9kYWw6IHRydWUsXG4gICAgICAgICAgICB3aWR0aDogd2luZG93LmlubmVyV2lkdGggKiAuOCxcbiAgICAgICAgICAgIGhlaWdodDogd2luZG93LmlubmVySGVpZ2h0ICogLjgsXG4gICAgICAgICAgICBwb3NpdGlvbjogXCJjZW50ZXJcIixcbiAgICAgICAgICAgIGJvZHk6IHtcbiAgICAgICAgICAgICAgICByb3dzOiBbXG4gICAgICAgICAgICAgICAgICAgIHRhYixcbiAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmlldzogXCJidXR0b25cIixcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlOiBcIk9LXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBjc3M6IFwid2ViaXhfcHJpbWFyeVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgY2xpY2s6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmdldFRvcFBhcmVudFZpZXcoKS5oaWRlKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cblxuICAgIGluaXQoKSB7XG4gICAgICAgIHZhciBzZWxmID0gdGhpcztcbiAgICAgICAgdGhpcy5mb3JtID0gJCQoXCJmb3JtXCIpO1xuXG4gICAgfVxuXG5cbiAgICBzaG93Rm9yKGl0ZW0pIHtcbiAgICAgICAgbGV0IHZhbHVlcyA9IE9iamVjdC5hc3NpZ24oe30sIGl0ZW0pO1xuICAgICAgICB0aGlzLnJlc2VydmF0aW9uX3ZpZXcgPSAkJChcInJlc2VydmF0aW9uX3ZpZXdcIik7XG4gICAgICAgIHRoaXMucmVzZXJ2YXRpb25fdmlldy5nZXRIZWFkKCkuc2V0SFRNTChcIlJlc2VydmF0aW9uOiBcIiArIGl0ZW0uc29sdXRpb25OYW1lKTtcblxuICAgICAgICBsZXQgcmVzZXJ2YXRpb24gPSBpdGVtLnJlc2VydmF0aW9uXG4gICAgICAgIHZhbHVlcy5pZCA9IHJlc2VydmF0aW9uLmlkXG4gICAgICAgIHZhbHVlcy5jdXN0b21lcl90aWQgPSByZXNlcnZhdGlvbi5jdXN0b21lcl90aWRcbiAgICAgICAgdmFsdWVzLm5leHRfYWN0aW9uID0gcmVzZXJ2YXRpb24ubmV4dF9hY3Rpb25cbiAgICAgICAgdmFsdWVzLnJlc3VsdHMgPSByZXNlcnZhdGlvbi5yZXN1bHRzXG4gICAgICAgIHZhbHVlcy5leHBpcmF0aW9uID0gcmVzZXJ2YXRpb24uZGF0YV9yZXNlcnZhdGlvbi5leHBpcmF0aW9uX3Jlc2VydmF0aW9uXG5cbiAgICAgICAgdmFsdWVzLmNvbnRhaW5lcnMgPSByZXNlcnZhdGlvbi5kYXRhX3Jlc2VydmF0aW9uLmNvbnRhaW5lcnNcbiAgICAgICAgdmFsdWVzLnZvbHVtZXMgPSByZXNlcnZhdGlvbi5kYXRhX3Jlc2VydmF0aW9uLnZvbHVtZXNcbiAgICAgICAgdmFsdWVzLnpkYnMgPSByZXNlcnZhdGlvbi5kYXRhX3Jlc2VydmF0aW9uLnpkYnNcbiAgICAgICAgdmFsdWVzLm5ldHdvcmtzID0gcmVzZXJ2YXRpb24uZGF0YV9yZXNlcnZhdGlvbi5uZXR3b3Jrc1xuICAgICAgICB2YWx1ZXMua3ViZXJuZXRlcyA9IHJlc2VydmF0aW9uLmRhdGFfcmVzZXJ2YXRpb24ua3ViZXJuZXRlc1xuICAgICAgICB2YWx1ZXMuZm9ybV9pbmZvID0gaXRlbS5mb3JtX2luZm9cblxuICAgICAgICB0aGlzLmZvcm0uc2V0VmFsdWVzKHZhbHVlcyk7XG4gICAgICAgIHRoaXMuZm9ybV9pbmZvID0gJCQoXCJmb3JtSW5mb1wiKTtcbiAgICAgICAgdGhpcy5mb3JtX2luZm8uY2xlYXJBbGwoKTtcblxuICAgICAgICBsZXQgZm9ybV9saXN0ID0gW107XG4gICAgICAgIGxldCBmb3JtX2tleXMgPSBPYmplY3Qua2V5cyh2YWx1ZXMuZm9ybV9pbmZvKVxuICAgICAgICBsZXQgZm9ybV92YWx1ZXMgPSBPYmplY3QudmFsdWVzKHZhbHVlcy5mb3JtX2luZm8pXG4gICAgICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCBmb3JtX2tleXMubGVuZ3RoOyBpbmRleCsrKSB7XG4gICAgICAgICAgICBsZXQgZm9ybV9kaWN0ID0gbmV3IE9iamVjdCgpO1xuICAgICAgICAgICAgZm9ybV9kaWN0WydrZXknXSA9IGZvcm1fa2V5c1tpbmRleF07XG4gICAgICAgICAgICBmb3JtX2RpY3RbJ3ZhbHVlJ10gPSBmb3JtX3ZhbHVlc1tpbmRleF07XG4gICAgICAgICAgICBmb3JtX2xpc3QucHVzaChmb3JtX2RpY3QpXG5cbiAgICAgICAgfVxuICAgICAgICB0aGlzLmZvcm1faW5mby5wYXJzZShmb3JtX2xpc3QpO1xuXG4gICAgICAgIC8vIEFkZCBuZXR3b3JrcyB0YWIgY29udGVudFxuICAgICAgICB0aGlzLm5ldHdvcmtzID0gJCQoXCJuZXR3b3Jrc1wiKTtcbiAgICAgICAgdGhpcy5uZXR3b3Jrcy5jbGVhckFsbCgpXG4gICAgICAgIHRoaXMubmV0d29ya3MucGFyc2UodmFsdWVzLm5ldHdvcmtzKTtcblxuICAgICAgICAvLyBBZGQgY290YWluZXIgdGFiIGNvbnRlbnRcbiAgICAgICAgdGhpcy5jb250YWluZXJzID0gJCQoXCJjb250YWluZXJzXCIpO1xuICAgICAgICB0aGlzLmNvbnRhaW5lcnMuY2xlYXJBbGwoKVxuICAgICAgICB0aGlzLmNvbnRhaW5lcnMucGFyc2UodmFsdWVzLmNvbnRhaW5lcnMpO1xuXG5cbiAgICAgICAgLy8gQWRkIHZvbHVtZXMgdGFiIGNvbnRlbnRcbiAgICAgICAgdGhpcy52b2x1bWVzID0gJCQoXCJ2b2x1bWVzXCIpO1xuICAgICAgICB0aGlzLnZvbHVtZXMuY2xlYXJBbGwoKVxuICAgICAgICB0aGlzLnZvbHVtZXMucGFyc2UodmFsdWVzLnZvbHVtZXMpO1xuXG4gICAgICAgIC8vIEFkZCB6ZGIgdGFiIGNvbnRlbnRcbiAgICAgICAgdGhpcy56ZGJzID0gJCQoXCJ6ZGJzXCIpO1xuICAgICAgICB0aGlzLnpkYnMuY2xlYXJBbGwoKVxuICAgICAgICB0aGlzLnpkYnMucGFyc2UodmFsdWVzLnpkYnMpO1xuXG5cbiAgICAgICAgLy8gQWRkIGt1YmVybmV0ZXMgdGFiIGNvbnRlbnRcbiAgICAgICAgdGhpcy5rdWJlcm5ldGVzID0gJCQoXCJrdWJlcm5ldGVzXCIpO1xuICAgICAgICB0aGlzLmt1YmVybmV0ZXMuY2xlYXJBbGwoKVxuICAgICAgICB0aGlzLmt1YmVybmV0ZXMucGFyc2UodmFsdWVzLmt1YmVybmV0ZXMpO1xuXG5cbiAgICAgICAgdGhpcy5nZXRSb290KCkuc2hvdygpO1xuICAgIH1cbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NvdXJjZXMvdmlld3MvZGVwbG95ZWRTb2x1dGlvbnMvcmVzZXJ2YXRpb24uanMiLCJpbXBvcnQgeyBKZXRWaWV3IH0gZnJvbSBcIndlYml4LWpldFwiO1xuXG5pbXBvcnQgeyBkYXRlRm9ybWF0dGVyIH0gZnJvbSBcIi4uLy4uL2NvbW1vbi9mb3JtYXR0ZXJzXCI7XG5pbXBvcnQgeyBMRVZFTFMgfSBmcm9tIFwiLi4vYWxlcnRzL2RhdGFcIjtcbmltcG9ydCB7IGNyZWF0ZUZpbHRlck9wdGlvbnMgfSBmcm9tIFwiLi4vLi4vY29tbW9uL2ZpbHRlcnNcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQXBwTG9nc1ZpZXcgZXh0ZW5kcyBKZXRWaWV3IHtcbiAgICBjb25maWcoKSB7XG4gICAgICAgIHZhciBwYWdlciA9IHtcbiAgICAgICAgICAgIHZpZXc6IFwicGFnZXJcIixcbiAgICAgICAgICAgIGlkOiBcInBhZ2VyXCIsXG4gICAgICAgICAgICBzaXplOiAxMDAsXG4gICAgICAgICAgICBncm91cDogMjBcbiAgICAgICAgfTtcbiAgICAgICAgY29uc3QgYXBwbG9ncyA9IHtcbiAgICAgICAgICAgIHZpZXc6IFwiZGF0YXRhYmxlXCIsXG4gICAgICAgICAgICBpZDogXCJhcHBsb2dzX3RhYmxlXCIsXG4gICAgICAgICAgICBwYWdlcjogXCJwYWdlclwiLFxuICAgICAgICAgICAgcmVzaXplQ29sdW1uOiB0cnVlLFxuICAgICAgICAgICAgc2VsZWN0OiB0cnVlLFxuICAgICAgICAgICAgbXVsdGlzZWxlY3Q6IHRydWUsXG4gICAgICAgICAgICBjc3M6IFwid2ViaXhfaGVhZGVyX2JvcmRlciB3ZWJpeF9kYXRhX2JvcmRlclwiLFxuICAgICAgICAgICAgc2Nyb2xsOiB0cnVlLFxuICAgICAgICAgICAgYXV0b0NvbmZpZzogdHJ1ZSxcbiAgICAgICAgICAgIG9uOiB7XG4gICAgICAgICAgICAgICAgb25BZnRlckxvYWQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zb3J0KFwiZXBvY2hcIiwgXCJkZXNcIik7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubWFya1NvcnRpbmcoXCJlcG9jaFwiLCBcImRlc1wiKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuXG4gICAgICAgICAgICBjb2x1bW5zOiBbe1xuICAgICAgICAgICAgICAgIGlkOiBcImlkXCIsXG4gICAgICAgICAgICAgICAgaGVhZGVyOiBbXG4gICAgICAgICAgICAgICAgICAgIFwiTG9nI1wiLFxuICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb250ZW50OiBcInRleHRGaWx0ZXJcIlxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgc29ydDogXCJpbnRcIixcbiAgICAgICAgICAgICAgICB3aWR0aDogNTAsXG4gICAgICAgICAgICAgICAgYXV0b3dpZHRoOiB0cnVlLFxuICAgICAgICAgICAgfSxcblxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGlkOiBcImZpbGVwYXRoXCIsXG4gICAgICAgICAgICAgICAgaGVhZGVyOiBbXG4gICAgICAgICAgICAgICAgICAgIFwiUGF0aFwiLFxuICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb250ZW50OiBcInRleHRGaWx0ZXJcIlxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgc29ydDogXCJzdHJpbmdcIixcbiAgICAgICAgICAgICAgICBhdXRvd2lkdGg6IHRydWUsXG4gICAgICAgICAgICAgICAgd2lkdGg6IDE0MFxuICAgICAgICAgICAgfSxcblxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGlkOiBcImxpbmVuclwiLFxuICAgICAgICAgICAgICAgIGhlYWRlcjogW1xuICAgICAgICAgICAgICAgICAgICBcIkxpbmUubnJcIixcbiAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29udGVudDogXCJ0ZXh0RmlsdGVyXCJcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgIHNvcnQ6IFwiaW50XCIsXG4gICAgICAgICAgICAgICAgYXV0b3dpZHRoOiB0cnVlLFxuICAgICAgICAgICAgICAgIHdpZHRoOiA2MFxuICAgICAgICAgICAgfSxcblxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGlkOiBcImNvbnRleHRcIixcbiAgICAgICAgICAgICAgICBoZWFkZXI6IFtcbiAgICAgICAgICAgICAgICAgICAgXCJDb250ZXh0XCIsXG4gICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRlbnQ6IFwidGV4dEZpbHRlclwiXG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICBzb3J0OiBcInN0cmluZ1wiXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGlkOiBcIm1lc3NhZ2VcIixcbiAgICAgICAgICAgICAgICBoZWFkZXI6IFtcbiAgICAgICAgICAgICAgICAgICAgXCJNZXNzYWdlXCIsXG4gICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRlbnQ6IFwidGV4dEZpbHRlclwiXG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICBzb3J0OiBcInN0cmluZ1wiLFxuICAgICAgICAgICAgICAgIHdpZHRoOiA1MDAsXG4gICAgICAgICAgICAgICAgYXV0b3dpZHRoOiB0cnVlXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGlkOiBcImxldmVsXCIsXG4gICAgICAgICAgICAgICAgaGVhZGVyOiBbXG4gICAgICAgICAgICAgICAgICAgIFwiTGV2ZWxcIixcbiAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29udGVudDogXCJzZWxlY3RGaWx0ZXJcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIG9wdGlvbnM6IGNyZWF0ZUZpbHRlck9wdGlvbnMoTEVWRUxTKVxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgc29ydDogXCJpbnRcIixcbiAgICAgICAgICAgICAgICBmb3JtYXQ6ICh2YWx1ZSkgPT4gTEVWRUxTW3ZhbHVlXSxcbiAgICAgICAgICAgICAgICB3aWR0aDogMTAwXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGlkOiBcImVwb2NoXCIsXG4gICAgICAgICAgICAgICAgaGVhZGVyOiBbXG4gICAgICAgICAgICAgICAgICAgIFwiVGltZVwiLFxuICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb250ZW50OiBcInRleHRGaWx0ZXJcIlxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgc29ydDogXCJkYXRlXCIsXG4gICAgICAgICAgICAgICAgZm9ybWF0OiBkYXRlRm9ybWF0dGVyLFxuICAgICAgICAgICAgICAgIHdpZHRoOiAxMzBcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgaWQ6IFwicHJvY2Vzc2lkXCIsXG4gICAgICAgICAgICAgICAgaGVhZGVyOiBbXG4gICAgICAgICAgICAgICAgICAgIFwiUElEXCIsXG4gICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRlbnQ6IFwidGV4dEZpbHRlclwiXG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICBzb3J0OiBcImludFwiLFxuICAgICAgICAgICAgICAgIHdpZHRoOiA2MFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBpZDogXCJjYXRcIixcbiAgICAgICAgICAgICAgICBoZWFkZXI6IFtcbiAgICAgICAgICAgICAgICAgICAgXCJDYXRlZ29yeVwiLFxuICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb250ZW50OiBcInRleHRGaWx0ZXJcIlxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgc29ydDogXCJzdHJpbmdcIixcbiAgICAgICAgICAgICAgICB3aWR0aDogODBcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgaWQ6IFwiZGF0YVwiLFxuICAgICAgICAgICAgICAgIGhlYWRlcjogW1xuICAgICAgICAgICAgICAgICAgICBcIkRhdGFcIixcbiAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29udGVudDogXCJ0ZXh0RmlsdGVyXCJcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgIHNvcnQ6IFwic3RyaW5nXCJcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgXSxcblxuICAgICAgICB9XG5cblxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgcm93czogW1xuICAgICAgICAgICAgICAgIGFwcGxvZ3MsXG4gICAgICAgICAgICAgICAgcGFnZXJcbiAgICAgICAgICAgIF1cbiAgICAgICAgfVxuICAgIH1cblxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc291cmNlcy92aWV3cy9sb2dzL2FwcExvZ3MuanMiLCJpbXBvcnQgeyBKZXRWaWV3IH0gZnJvbSBcIndlYml4LWpldFwiO1xuXG5pbXBvcnQgeyBkYXRlRm9ybWF0dGVyIH0gZnJvbSBcIi4uLy4uL2NvbW1vbi9mb3JtYXR0ZXJzXCI7XG5pbXBvcnQgeyBhbnNpVXAgfSBmcm9tIFwiLi4vLi4vY29tbW9uL2NvbG9yc1wiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBKb2JEZXRhaWxzVmlldyBleHRlbmRzIEpldFZpZXcge1xuICAgIGNvbmZpZygpIHtcbiAgICAgICAgY29uc3QgaW5mbyA9IHtcbiAgICAgICAgICAgIHZpZXc6IFwiZm9ybVwiLFxuICAgICAgICAgICAgaWQ6IFwiZm9ybVwiLFxuICAgICAgICAgICAgZWxlbWVudHNDb25maWc6IHsgbGFiZWxXaWR0aDogMjAwIH0sXG4gICAgICAgICAgICBlbGVtZW50czogW1xuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgdmlldzogXCJ0ZXh0XCIsXG4gICAgICAgICAgICAgICAgICAgIGxhYmVsOiBcIkFjdGlvbiBJRFwiLFxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImFjdGlvbl9pZFwiLFxuICAgICAgICAgICAgICAgICAgICByZWFkb25seTogdHJ1ZSxcbiAgICAgICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgICAgIHZpZXc6IFwidGV4dFwiLFxuICAgICAgICAgICAgICAgICAgICBsYWJlbDogXCJTdGF0ZVwiLFxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcInN0YXRlXCIsXG4gICAgICAgICAgICAgICAgICAgIHJlYWRvbmx5OiB0cnVlLFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICB2aWV3OiBcInRleHRcIixcbiAgICAgICAgICAgICAgICAgICAgbGFiZWw6IFwiTmFtZVwiLFxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcIm5hbWVcIixcbiAgICAgICAgICAgICAgICAgICAgcmVhZG9ubHk6IHRydWUsXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIHZpZXc6IFwidGV4dFwiLFxuICAgICAgICAgICAgICAgICAgICBsYWJlbDogXCJDYXRlZ29yeVwiLFxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImNhdGVnb3J5XCIsXG4gICAgICAgICAgICAgICAgICAgIHJlYWRvbmx5OiB0cnVlXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICxcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIHZpZXc6IFwidGV4dFwiLFxuICAgICAgICAgICAgICAgICAgICBsYWJlbDogXCJrd2FyZ3NcIixcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJrd2FyZ3NcIixcbiAgICAgICAgICAgICAgICAgICAgcmVhZG9ubHk6IHRydWVcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgdmlldzogXCJ0ZXh0XCIsXG4gICAgICAgICAgICAgICAgICAgIGxhYmVsOiBcIkRpZVwiLFxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImRpZVwiLFxuICAgICAgICAgICAgICAgICAgICByZWFkb25seTogdHJ1ZVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICB2aWV3OiBcInRleHRcIixcbiAgICAgICAgICAgICAgICAgICAgbGFiZWw6IFwiU3RhcnQgdGltZVwiLFxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcInRpbWVfc3RhcnRcIixcbiAgICAgICAgICAgICAgICAgICAgcmVhZG9ubHk6IHRydWUsXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIHZpZXc6IFwidGV4dFwiLFxuICAgICAgICAgICAgICAgICAgICBsYWJlbDogXCJTdG9wIHRpbWVcIixcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJ0aW1lX3N0b3BcIixcbiAgICAgICAgICAgICAgICAgICAgcmVhZG9ubHk6IHRydWUsXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIHZpZXc6IFwidGV4dFwiLFxuICAgICAgICAgICAgICAgICAgICBsYWJlbDogXCJUaW1lb3V0XCIsXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwidGltZW91dFwiLFxuICAgICAgICAgICAgICAgICAgICByZWFkb25seTogdHJ1ZVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICB2aWV3OiBcInRleHRcIixcbiAgICAgICAgICAgICAgICAgICAgbGFiZWw6IFwiUmVzdWx0XCIsXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwicmVzdWx0XCIsXG4gICAgICAgICAgICAgICAgICAgIHJlYWRvbmx5OiB0cnVlXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIHZpZXc6IFwidGV4dFwiLFxuICAgICAgICAgICAgICAgICAgICBsYWJlbDogXCJEZXBlbmRlbmNpZXNcIixcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJkZXBlbmRlbmNpZXNcIixcbiAgICAgICAgICAgICAgICAgICAgcmVhZG9ubHk6IHRydWVcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgdmlldzogXCJ0ZXh0XCIsXG4gICAgICAgICAgICAgICAgICAgIGxhYmVsOiBcIkRlYnVnXCIsXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiZGVidWdcIixcbiAgICAgICAgICAgICAgICAgICAgcmVhZG9ubHk6IHRydWVcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICBdXG4gICAgICAgIH07XG5cbiAgICAgICAgY29uc3QgdGFiID0ge1xuICAgICAgICAgICAgdmlldzogXCJ0YWJ2aWV3XCIsXG4gICAgICAgICAgICBjZWxsczogW1xuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgaGVhZGVyOiBcIkluZm9ybWF0aW9uXCIsXG4gICAgICAgICAgICAgICAgICAgIGJvZHk6IGluZm8sXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIGhlYWRlcjogXCJFcnJvclwiLFxuICAgICAgICAgICAgICAgICAgICBib2R5OiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZDogXCJtZXNzYWdlXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICB2aWV3OiBcInRlbXBsYXRlXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICB0ZW1wbGF0ZTogXCJcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIHNjcm9sbDogXCJhdXRvXCIsXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgaGVhZGVyOiBcIlRyYWNlYmFja3NcIixcbiAgICAgICAgICAgICAgICAgICAgYm9keToge1xuICAgICAgICAgICAgICAgICAgICAgICAgcm93czogW1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWQ6ICdwaWQnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2aWV3OiBcInRlbXBsYXRlXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRlbXBsYXRlOiBgPGI+UElEICNwaWQjPC9iPmAsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNjcm9sbDogXCJhdXRvXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhlaWdodDogMzAsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFsaWduOiAnY2VudGVyJ1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWQ6IFwidHJhY2ViYWNrc1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2aWV3OiBcInRlbXBsYXRlXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRlbXBsYXRlOiBcIlwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzY3JvbGw6IFwiYXV0b1wiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgXVxuICAgICAgICB9O1xuXG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICB2aWV3OiBcIndpbmRvd1wiLFxuICAgICAgICAgICAgaGVhZDogXCJKb2IgRGV0YWlsc1wiLFxuICAgICAgICAgICAgbW9kYWw6IHRydWUsXG4gICAgICAgICAgICB3aWR0aDogd2luZG93LmlubmVyV2lkdGggKiAuOCxcbiAgICAgICAgICAgIGhlaWdodDogd2luZG93LmlubmVySGVpZ2h0ICogLjgsXG4gICAgICAgICAgICBwb3NpdGlvbjogXCJjZW50ZXJcIixcbiAgICAgICAgICAgIGJvZHk6IHtcbiAgICAgICAgICAgICAgICByb3dzOiBbXG4gICAgICAgICAgICAgICAgICAgIHRhYixcbiAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmlldzogXCJidXR0b25cIixcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlOiBcIk9LXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBjc3M6IFwid2ViaXhfcHJpbWFyeVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgY2xpY2s6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmdldFRvcFBhcmVudFZpZXcoKS5oaWRlKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBzaG93Sm9iRGV0YWlscyhkYXRhKSB7XG4gICAgICAgIGxldCBpdGVtID0gT2JqZWN0LmFzc2lnbih7fSwgZGF0YSk7XG4gICAgICAgIGxldCBqb2JEYXRhID0ge1xuICAgICAgICAgICAgJ2FjdGlvbl9pZCc6IGl0ZW1bJ2FjdGlvbl9pZCddLFxuICAgICAgICAgICAgJ2RlYnVnJzogaXRlbVsnZGVidWcnXS50b1N0cmluZygpLFxuICAgICAgICAgICAgJ2RpZSc6IGl0ZW1bJ2RpZSddLnRvU3RyaW5nKCksXG4gICAgICAgICAgICAnZXJyb3JfY2F0JzogaXRlbVsnZXJyb3JfY2F0J10sXG4gICAgICAgICAgICAnY2F0ZWdvcnknOiBpdGVtWydjYXRlZ29yeSddID8gaXRlbVsnY2F0ZWdvcnknXSA6ICdObyBDYXRlZ29yeScsXG4gICAgICAgICAgICAncmVzdWx0JzogSlNPTi5zdHJpbmdpZnkoaXRlbVsncmVzdWx0J10pLFxuICAgICAgICAgICAgJ25hbWUnOiBpdGVtWyduYW1lJ10sXG4gICAgICAgICAgICAnc3RhdGUnOiBpdGVtWydzdGF0ZSddLFxuICAgICAgICAgICAgJ2t3YXJncyc6IEpTT04uc3RyaW5naWZ5KGl0ZW1bJ2t3YXJncyddKSxcbiAgICAgICAgICAgICd0aW1lX3N0b3AnOiBkYXRlRm9ybWF0dGVyKGl0ZW1bJ3RpbWVfc3RvcCddKSxcbiAgICAgICAgICAgICd0aW1lX3N0YXJ0JzogZGF0ZUZvcm1hdHRlcihpdGVtWyd0aW1lX3N0YXJ0J10pLFxuICAgICAgICAgICAgJ3RpbWVvdXQnOiBpdGVtWyd0aW1lb3V0J10sXG4gICAgICAgICAgICAnZGVwZW5kZW5jaWVzJzogaXRlbVsnZGVwZW5kZW5jaWVzJ11cbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChPYmplY3Qua2V5cyhpdGVtWydlcnJvciddKS5sZW5ndGggIT09IDApIHtcbiAgICAgICAgICAgIGpvYkRhdGFbJ3BpZCddID0gaXRlbVsnZXJyb3InXVsncHJvY2Vzc2lkJ11cbiAgICAgICAgICAgICQkKCdwaWQnKS5zZXRWYWx1ZXMoeyBwaWQ6IGl0ZW1bJ2Vycm9yJ11bJ3Byb2Nlc3NpZCddIH0sIHRydWUpO1xuICAgICAgICAgICAgJCQoJ3BpZCcpLnNob3coKVxuICAgICAgICAgICAgdGhpcy5tZXNzYWdlLnNldEhUTUwoYDxwPiR7YW5zaVVwLmFuc2lfdG9faHRtbChpdGVtWydlcnJvciddWydtZXNzYWdlJ10pfTwvcD5gKTtcbiAgICAgICAgICAgIHRoaXMudHJhY2ViYWNrcy5zZXRIVE1MKGA8cD4ke2Fuc2lVcC5hbnNpX3RvX2h0bWwoaXRlbVsnZXJyb3InXVsnZm9ybWF0dGVkJ10pfTwvcD5gKTtcblxuICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICQkKCdwaWQnKS5oaWRlKCk7XG4gICAgICAgICAgICB0aGlzLm1lc3NhZ2Uuc2V0SFRNTChgPHA+XCJObyBtZXNzYWdlXCI8L3A+YCk7XG4gICAgICAgICAgICB0aGlzLnRyYWNlYmFja3Muc2V0SFRNTChgPHA+XCJBbGwgaXMgZmluZVwiPC9wPmApXG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5mb3JtLnBhcnNlKGpvYkRhdGEpXG4gICAgICAgIHRoaXMuZ2V0Um9vdCgpLnNob3coKTtcbiAgICB9XG5cbiAgICBpbml0KCkge1xuICAgICAgICB0aGlzLmZvcm0gPSAkJChcImZvcm1cIik7XG4gICAgICAgIHRoaXMubWVzc2FnZSA9ICQkKFwibWVzc2FnZVwiKTsgICBcblxuICAgICAgICB0aGlzLnRyYWNlYmFja3MgPSAkJChcInRyYWNlYmFja3NcIik7XG4gICAgICAgIHRoaXMudGJUYWJzID0gJCQoXCJ0Yl90YWJzXCIpO1xuICAgIH1cbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NvdXJjZXMvdmlld3MvbXlqb2JzL2pvYkRldGFpbHMuanMiLCJpbXBvcnQgeyBKZXRWaWV3IH0gZnJvbSBcIndlYml4LWpldFwiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBXb3JrZXJEZXRhaWxzVmlldyBleHRlbmRzIEpldFZpZXcge1xuICAgIGNvbmZpZygpIHtcbiAgICAgICAgY29uc3QgaW5mbyA9IHtcbiAgICAgICAgICAgIHZpZXc6IFwiZm9ybVwiLFxuICAgICAgICAgICAgaWQ6IFwiZm9ybVwiLFxuICAgICAgICAgICAgZWxlbWVudHNDb25maWc6IHsgbGFiZWxXaWR0aDogMjAwIH0sXG4gICAgICAgICAgICBlbGVtZW50czogW1xuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgdmlldzogXCJ0ZXh0XCIsXG4gICAgICAgICAgICAgICAgICAgIGxhYmVsOiBcIk5hbWVcIixcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJuYW1lXCIsXG4gICAgICAgICAgICAgICAgICAgIHJlYWRvbmx5OiB0cnVlLFxuICAgICAgICAgICAgICAgIH0se1xuICAgICAgICAgICAgICAgICAgICB2aWV3OiBcInRleHRcIixcbiAgICAgICAgICAgICAgICAgICAgbGFiZWw6IFwiU3RhdGVcIixcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJzdGF0ZVwiLFxuICAgICAgICAgICAgICAgICAgICByZWFkb25seTogdHJ1ZSxcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgdmlldzogXCJ0ZXh0XCIsXG4gICAgICAgICAgICAgICAgICAgIGxhYmVsOiBcIkhhbHRlZFwiLFxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImhhbHRcIixcbiAgICAgICAgICAgICAgICAgICAgcmVhZG9ubHk6IHRydWUsXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIHZpZXc6IFwidGV4dFwiLFxuICAgICAgICAgICAgICAgICAgICBsYWJlbDogXCJQSURcIixcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJwaWRcIixcbiAgICAgICAgICAgICAgICAgICAgcmVhZG9ubHk6IHRydWVcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgLFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgdmlldzogXCJ0ZXh0XCIsXG4gICAgICAgICAgICAgICAgICAgIGxhYmVsOiBcIkN1cnJlbnQgam9iXCIsXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiY3VycmVudF9qb2JcIixcbiAgICAgICAgICAgICAgICAgICAgcmVhZG9ubHk6IHRydWVcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgdmlldzogXCJ0ZXh0XCIsXG4gICAgICAgICAgICAgICAgICAgIGxhYmVsOiBcIkxhc3QgdXBkYXRlXCIsXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwibGFzdF91cGRhdGVcIixcbiAgICAgICAgICAgICAgICAgICAgcmVhZG9ubHk6IHRydWVcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgdmlldzogXCJ0ZXh0XCIsXG4gICAgICAgICAgICAgICAgICAgIGxhYmVsOiBcIlN0YXJ0IHRpbWVcIixcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJ0aW1lX3N0YXJ0XCIsXG4gICAgICAgICAgICAgICAgICAgIHJlYWRvbmx5OiB0cnVlLFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICB2aWV3OiBcInRleHRcIixcbiAgICAgICAgICAgICAgICAgICAgbGFiZWw6IFwiVGltZW91dFwiLFxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcInRpbWVvdXRcIixcbiAgICAgICAgICAgICAgICAgICAgcmVhZG9ubHk6IHRydWVcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgdmlldzogXCJ0ZXh0XCIsXG4gICAgICAgICAgICAgICAgICAgIGxhYmVsOiBcIlR5cGVcIixcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJ0eXBlXCIsXG4gICAgICAgICAgICAgICAgICAgIHJlYWRvbmx5OiB0cnVlXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIHZpZXc6IFwidGV4dFwiLFxuICAgICAgICAgICAgICAgICAgICBsYWJlbDogXCJFcnJvclwiLFxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImVycm9yXCIsXG4gICAgICAgICAgICAgICAgICAgIHJlYWRvbmx5OiB0cnVlXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIHZpZXc6IFwidGV4dFwiLFxuICAgICAgICAgICAgICAgICAgICBsYWJlbDogXCJEZWJ1Z1wiLFxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImRlYnVnXCIsXG4gICAgICAgICAgICAgICAgICAgIHJlYWRvbmx5OiB0cnVlXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgXVxuICAgICAgICB9O1xuXG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICB2aWV3OiBcIndpbmRvd1wiLFxuICAgICAgICAgICAgaGVhZDogXCJXb3JrZXIgRGV0YWlsc1wiLFxuICAgICAgICAgICAgbW9kYWw6IHRydWUsXG4gICAgICAgICAgICB3aWR0aDogd2luZG93LmlubmVyV2lkdGggKiAuOCxcbiAgICAgICAgICAgIGhlaWdodDogd2luZG93LmlubmVySGVpZ2h0ICogLjgsXG4gICAgICAgICAgICBwb3NpdGlvbjogXCJjZW50ZXJcIixcbiAgICAgICAgICAgIGJvZHk6IHtcbiAgICAgICAgICAgICAgICByb3dzOiBbXG4gICAgICAgICAgICAgICAgICAgIGluZm8sXG4gICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZpZXc6IFwiYnV0dG9uXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZTogXCJPS1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgY3NzOiBcIndlYml4X3ByaW1hcnlcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIGNsaWNrOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5nZXRUb3BQYXJlbnRWaWV3KCkuaGlkZSgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgc2hvd1dvcmtlckRldGFpbHMoZGF0YSkge1xuICAgICAgICB0aGlzLmZvcm0ucGFyc2UoZGF0YSlcbiAgICAgICAgdGhpcy5nZXRSb290KCkuc2hvdygpO1xuICAgIH1cblxuICAgIGluaXQoKSB7XG4gICAgICAgIHRoaXMuZm9ybSA9ICQkKFwiZm9ybVwiKTtcbiAgICB9XG59XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc291cmNlcy92aWV3cy9teWpvYnMvd29ya2VyRGV0YWlscy5qcyIsImltcG9ydCB7IEpldFZpZXcgfSBmcm9tIFwid2ViaXgtamV0XCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFBhY2thZ2VEZXRhaWxzVmlldyBleHRlbmRzIEpldFZpZXcge1xuICAgIGNvbmZpZygpIHtcbiAgICAgICAgY29uc3QgaW5mbyA9IHtcbiAgICAgICAgICAgIHZpZXc6IFwiZm9ybVwiLFxuICAgICAgICAgICAgaWQ6IFwiZm9ybVwiLFxuICAgICAgICAgICAgZWxlbWVudHNDb25maWc6IHsgbGFiZWxXaWR0aDogMTIwIH0sXG4gICAgICAgICAgICBlbGVtZW50czogW1xuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgdmlldzogXCJ0ZXh0XCIsXG4gICAgICAgICAgICAgICAgICAgIGxhYmVsOiBcIklEXCIsXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiaWRcIixcbiAgICAgICAgICAgICAgICAgICAgcmVhZG9ubHk6IHRydWUsXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIHZpZXc6IFwidGV4dFwiLFxuICAgICAgICAgICAgICAgICAgICBsYWJlbDogXCJOYW1lXCIsXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwic291cmNlX25hbWVcIixcbiAgICAgICAgICAgICAgICAgICAgcmVhZG9ubHk6IHRydWUsXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIHZpZXc6IFwidGV4dFwiLFxuICAgICAgICAgICAgICAgICAgICBsYWJlbDogXCJBdXRob3JcIixcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJhdXRob3JcIixcbiAgICAgICAgICAgICAgICAgICAgcmVhZG9ubHk6IHRydWUsXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIHZpZXc6IFwidGV4dFwiLFxuICAgICAgICAgICAgICAgICAgICBsYWJlbDogXCJTdGF0dXNcIixcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJzdGF0dXNcIixcbiAgICAgICAgICAgICAgICAgICAgcmVhZG9ubHk6IHRydWUsXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIHZpZXc6IFwidGV4dGFyZWFcIixcbiAgICAgICAgICAgICAgICAgICAgbGFiZWw6IFwiRGVzY3JpcHRpb25cIixcbiAgICAgICAgICAgICAgICAgICAgaGVpZ2h0OiAxMDAsXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiZGVzY3JpcHRpb25cIixcbiAgICAgICAgICAgICAgICAgICAgcmVhZG9ubHk6IHRydWVcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgdmlldzogXCJ0ZXh0XCIsXG4gICAgICAgICAgICAgICAgICAgIGxhYmVsOiBcIlZlcnNpb25cIixcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJ2ZXJzaW9uXCIsXG4gICAgICAgICAgICAgICAgICAgIHJlYWRvbmx5OiB0cnVlXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIHZpZXc6IFwidGV4dFwiLFxuICAgICAgICAgICAgICAgICAgICBsYWJlbDogXCJpbnN0YWxsX2t3YXJnc1wiLFxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImluc3RhbGxfa3dhcmdzXCIsXG4gICAgICAgICAgICAgICAgICAgIHJlYWRvbmx5OiB0cnVlXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIHZpZXc6IFwidGV4dFwiLFxuICAgICAgICAgICAgICAgICAgICBsYWJlbDogXCJmcm9udGVuZF9hcmdzXCIsXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiZnJvbnRlbmRfYXJnc1wiLFxuICAgICAgICAgICAgICAgICAgICByZWFkb25seTogdHJ1ZVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICB2aWV3OiBcInRleHRcIixcbiAgICAgICAgICAgICAgICAgICAgbGFiZWw6IFwiUGF0aFwiLFxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcInBhdGhcIixcbiAgICAgICAgICAgICAgICAgICAgcmVhZG9ubHk6IHRydWVcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgdmlldzogXCJ0ZXh0XCIsXG4gICAgICAgICAgICAgICAgICAgIGxhYmVsOiBcImdpdHVybFwiLFxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImdpdHVybFwiLFxuICAgICAgICAgICAgICAgICAgICByZWFkb25seTogdHJ1ZSxcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICBdXG4gICAgICAgIH07XG5cbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHZpZXc6IFwid2luZG93XCIsXG4gICAgICAgICAgICBoZWFkOiBcIlBhY2thZ2UgRGV0YWlsc1wiLFxuICAgICAgICAgICAgbW9kYWw6IHRydWUsXG4gICAgICAgICAgICB3aWR0aDogd2luZG93LmlubmVyV2lkdGggKiAuOCxcbiAgICAgICAgICAgIGhlaWdodDogd2luZG93LmlubmVySGVpZ2h0ICogLjgsXG4gICAgICAgICAgICBwb3NpdGlvbjogXCJjZW50ZXJcIixcbiAgICAgICAgICAgIGJvZHk6IHtcbiAgICAgICAgICAgICAgICByb3dzOiBbXG4gICAgICAgICAgICAgICAgICAgIGluZm8sXG4gICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZpZXc6IFwiYnV0dG9uXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZTogXCJPS1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgY3NzOiBcIndlYml4X3ByaW1hcnlcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIGNsaWNrOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5nZXRUb3BQYXJlbnRWaWV3KCkuaGlkZSgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgc2hvd1BhY2thZ2VEZXRhaWxzKGRhdGEpIHtcbiAgICAgICAgdGhpcy5mb3JtLnBhcnNlKGRhdGEpXG4gICAgICAgIHRoaXMuZ2V0Um9vdCgpLnNob3coKTtcbiAgICB9XG5cbiAgICBpbml0KCkge1xuICAgICAgICB0aGlzLmZvcm0gPSAkJChcImZvcm1cIik7XG4gICAgfVxufVxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NvdXJjZXMvdmlld3MvcGFja2FnZXMvcGFja2FnZURldGFpbHMuanMiLCJpbXBvcnQgeyBKZXRWaWV3IH0gZnJvbSBcIndlYml4LWpldFwiO1xuXG5pbXBvcnQgeyBpbnB1dERpYWxvZyB9IGZyb20gXCIuLi8uLi9jb21tb24vZGlhbG9nc1wiO1xuaW1wb3J0IHsgYWRtaW4gfSBmcm9tIFwiLi4vLi4vc2VydmljZXMvYWRtaW5cIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQWRtaW5zVmlldyBleHRlbmRzIEpldFZpZXcge1xuICAgIGNvbmZpZygpIHtcbiAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xuXG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICByb3dzOiBbe1xuICAgICAgICAgICAgICAgIGNvbHM6IFt7XG4gICAgICAgICAgICAgICAgICAgIHZpZXc6IFwidGVtcGxhdGVcIixcbiAgICAgICAgICAgICAgICAgICAgdGVtcGxhdGU6IFwiQWxsIG9mIHRoZSBmb2xsb3dpbmcgM0JvdCBuYW1lcyBjYW4gYWNjZXNzIGRhc2hib2FyZCwgeW91IGNhbiBhZGQgb3IgcmVtb3ZlIHRoZW0gZnJvbSBoZXJlXCIsXG4gICAgICAgICAgICAgICAgICAgIGF1dG9oZWlnaHQ6IHRydWUsXG4gICAgICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgICAgICBsb2NhbElkOiBcImFkZC1hZG1pblwiLFxuICAgICAgICAgICAgICAgICAgICB2aWV3OiBcImJ1dHRvblwiLFxuICAgICAgICAgICAgICAgICAgICB2YWx1ZTogXCJBZGQgbmV3IGFkbWluaXN0cmF0b3JcIixcbiAgICAgICAgICAgICAgICAgICAgY2xpY2s6IHNlbGYuYWRkQWRtaW4uYmluZChzZWxmKSxcbiAgICAgICAgICAgICAgICB9XVxuICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIGxvY2FsSWQ6IFwiYWRtaW5zLXRhYmxlXCIsXG4gICAgICAgICAgICAgICAgdmlldzogXCJkYXRhdGFibGVcIixcbiAgICAgICAgICAgICAgICBhdXRvaGVpZ2h0OiB0cnVlLFxuICAgICAgICAgICAgICAgIGNvbHVtbnM6IFt7XG4gICAgICAgICAgICAgICAgICAgIGlkOiBcIm5hbWVcIixcbiAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDUwMCxcbiAgICAgICAgICAgICAgICAgICAgaGVhZGVyOiBbXG4gICAgICAgICAgICAgICAgICAgICAgICBcIk5hbWVcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb250ZW50OiBcInRleHRGaWx0ZXJcIlxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgICAgICBzb3J0OiBcInN0cmluZ1wiLFxuICAgICAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICAgICAgaGVhZGVyOiBcIkRlbGV0ZVwiLFxuICAgICAgICAgICAgICAgICAgICB0ZW1wbGF0ZTogZnVuY3Rpb24gKG9iaikge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFwiPHNwYW4gY2xhc3M9J3dlYml4X2ljb24gbWRpIG1kaS10cmFzaC1jYW4gd2ViaXhfZGFuZ2VyIGRlbGV0ZV9hZG1pbic+PC9zcGFuPlwiO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfV0sXG4gICAgICAgICAgICAgICAgb25DbGljazoge1xuICAgICAgICAgICAgICAgICAgICBkZWxldGVfYWRtaW46IGZ1bmN0aW9uIChlLCBpZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy4kc2NvcGUuZGVsZXRlQWRtaW4oaWQpO1xuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1dXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBoYW5kbGVSZXN1bHQoKSB7XG5cbiAgICB9XG5cbiAgICBhZGRBZG1pbigpIHtcbiAgICAgICAgY29uc3Qgc2VsZiA9IHRoaXM7XG5cbiAgICAgICAgaW5wdXREaWFsb2coXCJBZGQgYWRtaW5cIiwgXCIzQm90IG5hbWVcIiwgXCJBZGRcIiwgKGlucHV0KSA9PiB7XG4gICAgICAgICAgICBpZiAoYWRtaW4uYWRkKGlucHV0KSkge1xuICAgICAgICAgICAgICAgIHNlbGYudGFibGUuYWRkKHsgbmFtZTogaW5wdXQgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGRlbGV0ZUFkbWluKGl0ZW1JZCkge1xuICAgICAgICBjb25zdCBzZWxmID0gdGhpcztcblxuICAgICAgICBjb25zdCBpdGVtID0gc2VsZi50YWJsZS5nZXRJdGVtKGl0ZW1JZCk7XG5cbiAgICAgICAgd2ViaXguY29uZmlybSh7XG4gICAgICAgICAgICB0aXRsZTogXCJEZWxldGUgYWRtaW5cIixcbiAgICAgICAgICAgIG9rOiBcIlllc1wiLFxuICAgICAgICAgICAgdGV4dDogYEFyZSB5b3Ugc3VyZSB5b3Ugd2FudCB0byBkZWxldGUgXCIke2l0ZW0ubmFtZX1cIj9gLFxuICAgICAgICAgICAgY2FuY2VsOiBcIk5vXCIsXG4gICAgICAgIH0pLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgaWYgKGFkbWluLmRlbGV0ZShpdGVtLm5hbWUpKSB7XG4gICAgICAgICAgICAgICAgc2VsZi50YWJsZS5yZW1vdmUoaXRlbUlkKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgaW5pdCgpIHtcbiAgICAgICAgdGhpcy50YWJsZSA9IHRoaXMuJCQoXCJhZG1pbnMtdGFibGVcIik7XG5cbiAgICAgICAgYWRtaW4ubGlzdCgpLnRoZW4oZGF0YSA9PiB7XG4gICAgICAgICAgICB0aGlzLnRhYmxlLnBhcnNlKGRhdGEuanNvbigpKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgLy93ZWJpeC5leHRlbmQodGhpcy50YWJsZSwgd2ViaXguUHJvZ3Jlc3NCYXIpO1xuICAgIH1cbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NvdXJjZXMvdmlld3Mvc2V0dGluZ3MvYWRtaW5zLmpzIiwiaW1wb3J0IHsgSmV0VmlldyB9IGZyb20gXCJ3ZWJpeC1qZXRcIjtcblxuaW1wb3J0IHsgYWRtaW4gfSBmcm9tIFwiLi4vLi4vc2VydmljZXMvYWRtaW5cIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgR2VuZXJhbFZpZXcgZXh0ZW5kcyBKZXRWaWV3IHtcbiAgICBjb25maWcoKSB7XG5cbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGxvY2FsSWQ6IFwiZ2VuZXJhbF9mb3JtXCIsXG4gICAgICAgICAgICB2aWV3OiBcImZvcm1cIixcbiAgICAgICAgICAgIGVsZW1lbnRzOiBbXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICB2aWV3OiBcInJpY2hzZWxlY3RcIixcbiAgICAgICAgICAgICAgICAgICAgaWQ6IFwiZXhwbG9yZXJfbGlzdFwiLFxuICAgICAgICAgICAgICAgICAgICBsYWJlbDogXCJFeHBsb3JlclwiLFxuICAgICAgICAgICAgICAgICAgICBsYWJlbFdpZHRoOiAxNTAsXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlOiBcInRlc3RuZXRcIixcbiAgICAgICAgICAgICAgICAgICAgeUNvdW50OiAyLFxuICAgICAgICAgICAgICAgICAgICBvcHRpb25zOiBbXG4gICAgICAgICAgICAgICAgICAgICAgICB7IGlkOiBcInRlc3RuZXRcIiwgdmFsdWU6IFwiVGVzdCBOZXRcIiB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgeyBpZDogXCJtYWluXCIsIHZhbHVlOiBcIk1haW5cIiB9LFxuICAgICAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIGxvY2FsSWQ6IFwiZXhwbG9yZXJfYWRkcmVzc1wiLFxuICAgICAgICAgICAgICAgICAgICB2aWV3OiBcInRleHRcIixcbiAgICAgICAgICAgICAgICAgICAgdHlwZTogXCJ0ZXh0XCIsXG4gICAgICAgICAgICAgICAgICAgIHJlYWRvbmx5OiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICBsYWJlbDogXCJFeHBsb3JlciBhZGRyZXNzXCIsXG4gICAgICAgICAgICAgICAgICAgIGxhYmVsV2lkdGg6IDE1MCxcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgXVxuICAgICAgICB9XG5cbiAgICB9XG5cbiAgICBkb0FjdGlvbihwcm9taXNlLCBjYWxsYmFjaykge1xuICAgICAgICB0aGlzLmZvcm0uc2hvd1Byb2dyZXNzKClcbiAgICAgICAgcHJvbWlzZS50aGVuKChkYXRhKSA9PiB7XG4gICAgICAgICAgICBpZiAoY2FsbGJhY2spIHtcbiAgICAgICAgICAgICAgICBjYWxsYmFjayhkYXRhKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGRhdGEpO1xuICAgICAgICAgICAgdGhpcy5mb3JtLnNob3dQcm9ncmVzcyh7IGhpZGU6IHRydWUgfSk7XG4gICAgICAgIH0pLmNhdGNoKChkYXRhKSA9PiB7XG4gICAgICAgICAgICB0aGlzLmZvcm0uc2hvd1Byb2dyZXNzKHsgaGlkZTogdHJ1ZSB9KTtcbiAgICAgICAgICAgIHZhciBtc2cgPSBcIkNvdWxkIG5vdCBzd2l0Y2ggZXhwbG9yZXJzXCI7XG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIG1zZyA9IEpTT04ucGFyc2UoZGF0YS5yZXNwb25zZVRleHQpLmVycm9yO1xuICAgICAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGUpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgd2ViaXgubWVzc2FnZSh7IHR5cGU6IFwiZXJyb3JcIiwgdGV4dDogbXNnLCBleHBpcmU6IC0xfSk7XG5cbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgaW5pdCgpIHtcbiAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xuXG4gICAgICAgIHNlbGYuZm9ybSA9IHNlbGYuJCQoJ2dlbmVyYWxfZm9ybScpO1xuICAgICAgICB3ZWJpeC5leHRlbmQoc2VsZi5mb3JtLCB3ZWJpeC5Qcm9ncmVzc0Jhcik7XG5cbiAgICAgICAgc2VsZi5leHBsb3Jlckxpc3QgPSBzZWxmLiQkKCdleHBsb3Jlcl9saXN0Jyk7XG4gICAgICAgIHNlbGYuZXhwbG9yZXJBZGRyZXNzID0gc2VsZi4kJCgnZXhwbG9yZXJfYWRkcmVzcycpO1xuXG5cbiAgICAgICAgc2VsZi5kb0FjdGlvbihhZG1pbi5nZXRfZXhwbG9yZXIoKSwgKGRhdGEpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGV4cGxvcmVyID0gZGF0YS5qc29uKCk7XG4gICAgICAgICAgICBzZWxmLmV4cGxvcmVyTGlzdC5zZXRWYWx1ZShleHBsb3Jlci50eXBlKTtcbiAgICAgICAgICAgIHNlbGYuZXhwbG9yZXJBZGRyZXNzLnNldFZhbHVlKGV4cGxvcmVyLnVybCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHNlbGYuZXhwbG9yZXJMaXN0LmF0dGFjaEV2ZW50KFwib25DaGFuZ2VcIiwgKG5ld1ZhbHVlKSA9PiB7XG4gICAgICAgICAgICBzZWxmLmRvQWN0aW9uKGFkbWluLnNldF9leHBsb3JlcihuZXdWYWx1ZS50b0xvd2VyQ2FzZSgpKSwgKGRhdGEpID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCBleHBsb3JlciA9IGRhdGEuanNvbigpO1xuICAgICAgICAgICAgICAgIHNlbGYuZXhwbG9yZXJBZGRyZXNzLnNldFZhbHVlKGV4cGxvcmVyLnVybCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG5cblxuICAgIH1cbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NvdXJjZXMvdmlld3Mvc2V0dGluZ3MvZ2VuZXJhbC5qcyIsImltcG9ydCB7IEpldFZpZXcgfSBmcm9tIFwid2ViaXgtamV0XCI7XG5pbXBvcnQgeyB3YWxsZXQgfSBmcm9tIFwiLi4vLi4vc2VydmljZXMvd2FsbGV0XCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFdhbGxldEZvcm1WaWV3IGV4dGVuZHMgSmV0VmlldyB7XG4gICAgY29uZmlnKCkge1xuICAgICAgICBjb25zdCBpbmZvID0ge1xuICAgICAgICAgICAgdmlldzogXCJmb3JtXCIsXG4gICAgICAgICAgICBpZDogXCJmb3JtXCIsXG4gICAgICAgICAgICBlbGVtZW50c0NvbmZpZzogeyBsYWJlbFdpZHRoOiAyMDAgfSxcbiAgICAgICAgICAgIGVsZW1lbnRzOiBbXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICB2aWV3OiBcInRleHRcIixcbiAgICAgICAgICAgICAgICAgICAgbGFiZWw6IFwiTmFtZVwiLFxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcIm5hbWVcIixcbiAgICAgICAgICAgICAgICAgICAgcGxhY2Vob2xkZXI6IFwiV2FsbGV0IG5hbWVcIlxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIF1cbiAgICAgICAgfTtcblxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgdmlldzogXCJ3aW5kb3dcIixcbiAgICAgICAgICAgIGhlYWQ6IFwiQ3JlYXRlIG5ldyB3YWxsZXRcIixcbiAgICAgICAgICAgIG1vZGFsOiB0cnVlLFxuICAgICAgICAgICAgd2lkdGg6IHdpbmRvdy5pbm5lcldpZHRoICogLjgsXG4gICAgICAgICAgICBoZWlnaHQ6IHdpbmRvdy5pbm5lckhlaWdodCAqIC44LFxuICAgICAgICAgICAgcG9zaXRpb246IFwiY2VudGVyXCIsXG4gICAgICAgICAgICBib2R5OiB7XG4gICAgICAgICAgICAgICAgcm93czogW1xuICAgICAgICAgICAgICAgICAgICBpbmZvLFxuICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICB2aWV3OiBcImJ1dHRvblwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU6IFwiT0tcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIGNzczogXCJ3ZWJpeF9wcmltYXJ5XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBjbGljazogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciB3YWxsZXRfbmFtZSA9ICQkKCdmb3JtJykuZ2V0VmFsdWVzKCkubmFtZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuJHNjb3BlLmNyZWF0ZVdhbGxldCh3YWxsZXRfbmFtZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBpbml0KCkge1xuICAgICAgICB0aGlzLmZvcm0gPSAkJChcImZvcm1cIik7XG4gICAgfVxuXG4gICAgc2hvd0Zvcm0oKSB7XG4gICAgICAgIHRoaXMuZ2V0Um9vdCgpLnNob3coKTtcbiAgICB9XG5cbiAgICBjcmVhdGVXYWxsZXQobmFtZSl7XG5cbiAgICAgICAgd2ViaXguZXh0ZW5kKHRoaXMuZm9ybSwgd2ViaXguUHJvZ3Jlc3NCYXIpO1xuICAgICAgICB0aGlzLmZvcm0uc2hvd1Byb2dyZXNzKHtcbiAgICAgICAgICAgIHR5cGU6XCJpY29uXCIsXG4gICAgICAgICAgICBoaWRlOiBmYWxzZVxuICAgICAgICB9KTtcbiAgICAgICAgd2FsbGV0LmNyZWF0ZVdhbGxldChuYW1lKS50aGVuKGRhdGEgPT4ge1xuICAgICAgICAgICAgd2ViaXgubWVzc2FnZSh7IHR5cGU6IFwic3VjY2Vzc1wiLCB0ZXh0OiBcIldhbGxldCBjcmVhdGVkIHN1Y2Nlc3NmdWxseVwiIH0pO1xuICAgICAgICAgICAgdGhpcy5mb3JtLnNob3dQcm9ncmVzcyh7aGlkZTogdHJ1ZX0pO1xuICAgICAgICAgICAgdGhpcy5mb3JtLmdldFRvcFBhcmVudFZpZXcoKS5oaWRlKCk7XG4gICAgICAgICAgICB0aGlzLmFwcC5yZWZyZXNoKClcbiAgICAgICAgfSkuY2F0Y2goZXJyb3IgPT4ge1xuICAgICAgICAgICAgd2ViaXgubWVzc2FnZSh7IHR5cGU6IFwiZXJyb3JcIiwgdGV4dDogXCJDb3VsZCBub3QgY3JlYXRlIHdhbGxldFwiLCBleHBpcmU6IC0xfSk7XG4gICAgICAgICAgICB0aGlzLmZvcm0uc2hvd1Byb2dyZXNzKHtoaWRlOiB0cnVlfSk7XG4gICAgICAgICAgICB0aGlzLmZvcm0uZ2V0VG9wUGFyZW50VmlldygpLmhpZGUoKTtcbiAgICAgICAgICAgIHRoaXMuYXBwLnJlZnJlc2goKVxuICAgICAgICB9KTtcbiAgICB9XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zb3VyY2VzL3ZpZXdzL3dhbGxldHNNYW5hZ2VyL3dhbGxldEZvcm0uanMiLCJpbXBvcnQgeyBKZXRWaWV3IH0gZnJvbSBcIndlYml4LWpldFwiO1xuaW1wb3J0IHsgd2FsbGV0IH0gZnJvbSBcIi4uLy4uL3NlcnZpY2VzL3dhbGxldFwiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBXYWxsZXREZXRhaWxzVmlldyBleHRlbmRzIEpldFZpZXcge1xuICAgIGNvbmZpZygpIHtcbiAgICAgICAgY29uc3QgaW5mbyA9IHtcbiAgICAgICAgICAgIGlkOiBcIndhbGxldF9pbmZvXCIsXG4gICAgICAgICAgICB2aWV3OiBcImxpc3RcIixcbiAgICAgICAgICAgIHJlc3BvbnNpdmU6IHRydWUsXG4gICAgICAgICAgICB0eXBlOiB7XG4gICAgICAgICAgICAgICAgaGVpZ2h0OiAnYXV0bycsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgdGVtcGxhdGU6IGBcbiAgICAgICAgICAgICAgICA8cD48L2ZvbnQ+PGZvbnQgc2l6ZT1cIjNcIj48Yj4ja2V5IzogPC9iPiN2YWx1ZSM8L2ZvbnQ+PGJyPjwvcD5cbiAgICAgICAgICAgIGBcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICB2aWV3OiBcIndpbmRvd1wiLFxuICAgICAgICAgICAgaGVhZDogXCJXYWxsZXQgRGV0YWlsc1wiLFxuICAgICAgICAgICAgbW9kYWw6IHRydWUsXG4gICAgICAgICAgICB3aWR0aDogd2luZG93LmlubmVyV2lkdGggKiAuOCxcbiAgICAgICAgICAgIGhlaWdodDogd2luZG93LmlubmVySGVpZ2h0ICogLjgsXG4gICAgICAgICAgICBwb3NpdGlvbjogXCJjZW50ZXJcIixcbiAgICAgICAgICAgIGJvZHk6IHtcbiAgICAgICAgICAgICAgICByb3dzOiBbXG4gICAgICAgICAgICAgICAgICAgIGluZm8sXG4gICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbHM6IFt7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmlldzogXCJidXR0b25cIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZDogXCJzZWNyZXRfYnRuXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU6IFwiU2hvdyBTZWNyZXRcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjc3M6IFwid2ViaXhfcHJpbWFyeVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsaWNrOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuJHNjb3BlLnNob3dTZWNyZXQoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmlldzogXCJidXR0b25cIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZTogXCJVcGRhdGUgdHJ1c3RsaW5lc1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNzczogXCJ3ZWJpeF9wcmltYXJ5XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xpY2s6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy4kc2NvcGUudXBkYXRlVHJ1c3RMaW5lcygpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2aWV3OiBcImJ1dHRvblwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlOiBcIkNsb3NlXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY3NzOiBcIndlYml4X3ByaW1hcnlcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGljazogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAkJChcInNlY3JldF9idG5cIikuZW5hYmxlKClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5nZXRUb3BQYXJlbnRWaWV3KCkuaGlkZSgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH1dXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBpbml0KCkge1xuICAgICAgICBjb25zdCBzZWxmID0gdGhpcztcbiAgICAgICAgc2VsZi5pbmZvID0gdGhpcy4kJChcIndhbGxldF9pbmZvXCIpO1xuICAgICAgICBzZWxmLnNlY3JldF9idG4gPSB0aGlzLiQkKFwic2VjcmV0X2J0blwiKTtcbiAgICAgICAgc2VsZi5zZWNyZXQgPSBcIlwiO1xuICAgICAgICBzZWxmLm5hbWUgPSBcIlwiO1xuICAgICAgICB3ZWJpeC5leHRlbmQoc2VsZi5pbmZvLCB3ZWJpeC5Qcm9ncmVzc0Jhcik7XG4gICAgfVxuXG4gICAgc2hvd1NlY3JldCgpIHtcbiAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xuXG4gICAgICAgIHNlbGYuaW5mby5hZGQoe1xuICAgICAgICAgICAga2V5OiAnU2VjcmV0JyxcbiAgICAgICAgICAgIHZhbHVlOiBzZWxmLnNlY3JldFxuICAgICAgICB9KTtcbiAgICAgICAgc2VsZi5zZWNyZXRfYnRuLmRpc2FibGUoKVxuICAgIH1cblxuICAgIHVwZGF0ZVRydXN0TGluZXMoKSB7XG4gICAgICAgIHZhciBzZWxmID0gdGhpcztcbiAgICAgICAgc2VsZi5pbmZvLnNob3dQcm9ncmVzcyh7XG4gICAgICAgICAgICBoaWRlOiBmYWxzZVxuICAgICAgICB9KVxuICAgICAgICB3YWxsZXQudXBkYXRlVHJ1c3RMaW5lcyhzZWxmLm5hbWUpLnRoZW4oZGF0YSA9PiB7XG4gICAgICAgICAgICB3YWxsZXQubWFuYWdlV2FsbGV0KHNlbGYubmFtZSkudGhlbihkYXRhID0+IHtcbiAgICAgICAgICAgICAgICBsZXQgd2FsbGV0SW5mbyA9IGRhdGEuanNvbigpO1xuICAgICAgICAgICAgICAgIHdhbGxldEluZm8ubmFtZSA9IHNlbGYubmFtZTtcbiAgICAgICAgICAgICAgICBzZWxmLnNob3dJbmZvKHdhbGxldEluZm8pO1xuICAgICAgICAgICAgICAgIHNlbGYuc2VjcmV0X2J0bi5lbmFibGUoKVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pLmNhdGNoKGVycm9yID0+IHtcbiAgICAgICAgICAgIHdlYml4Lm1lc3NhZ2UoeyB0eXBlOiBcImVycm9yXCIsIHRleHQ6IFwiRmFpbGVkIHRvIHVwZGF0ZSB0cnVzdGxpbmVzXCIgfSk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHNob3dJbmZvKGRhdGEpIHtcbiAgICAgICAgdmFyIHNlbGYgPSB0aGlzXG5cbiAgICAgICAgdmFyIGJhbGFuY2VzID0gXCJcIjtcbiAgICAgICAgZm9yICh2YXIgaSBpbiBkYXRhLmJhbGFuY2VzKSB7XG4gICAgICAgICAgICBiYWxhbmNlcyArPSBgPGJyPiR7ZGF0YS5iYWxhbmNlc1tpXS5iYWxhbmNlfSA8Yj4ke2RhdGEuYmFsYW5jZXNbaV0uYXNzZXRfY29kZX08L2I+YFxuICAgICAgICB9XG4gICAgICAgIHNlbGYuaW5mby5jbGVhckFsbCgpXG4gICAgICAgIHNlbGYuaW5mby5hZGQoe1xuICAgICAgICAgICAga2V5OiAnTmFtZScsXG4gICAgICAgICAgICB2YWx1ZTogZGF0YS5uYW1lXG4gICAgICAgIH0pO1xuICAgICAgICBzZWxmLmluZm8uYWRkKHtcbiAgICAgICAgICAgIGtleTogJ0FkZHJlc3MnLFxuICAgICAgICAgICAgdmFsdWU6IGRhdGEuYWRkcmVzc1xuICAgICAgICB9KTtcbiAgICAgICAgc2VsZi5pbmZvLmFkZCh7XG4gICAgICAgICAgICBrZXk6ICdCYWxhbmNlcycsXG4gICAgICAgICAgICB2YWx1ZTogYmFsYW5jZXNcbiAgICAgICAgfSk7XG4gICAgICAgIHNlbGYuc2VjcmV0ID0gZGF0YS5zZWNyZXQ7XG4gICAgICAgIHNlbGYubmFtZSA9IGRhdGEubmFtZTtcbiAgICAgICAgc2VsZi5pbmZvLnNob3dQcm9ncmVzcyh7XG4gICAgICAgICAgICBoaWRlOiB0cnVlXG4gICAgICAgIH0pXG4gICAgICAgIHRoaXMuZ2V0Um9vdCgpLnNob3coKTtcbiAgICB9XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zb3VyY2VzL3ZpZXdzL3dhbGxldHNNYW5hZ2VyL3dhbGxldERldGFpbHMuanMiLCJpbXBvcnQgeyBKZXRWaWV3IH0gZnJvbSBcIndlYml4LWpldFwiO1xuXG5pbXBvcnQgeyB3YWxsZXQgfSBmcm9tIFwiLi4vLi4vc2VydmljZXMvd2FsbGV0XCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFdhbGxldEltcG9ydFZpZXcgZXh0ZW5kcyBKZXRWaWV3IHtcbiAgICBjb25maWcoKSB7XG4gICAgICAgIGNvbnN0IGluZm8gPSB7XG4gICAgICAgICAgICB2aWV3OiBcImZvcm1cIixcbiAgICAgICAgICAgIGlkOiBcImltcG9ydF9mb3JtXCIsXG4gICAgICAgICAgICBlbGVtZW50c0NvbmZpZzogeyBsYWJlbFdpZHRoOiAyMDAgfSxcbiAgICAgICAgICAgIGVsZW1lbnRzOiBbXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICB2aWV3OiBcInRleHRcIixcbiAgICAgICAgICAgICAgICAgICAgbGFiZWw6IFwiTmFtZVwiLFxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcIm5hbWVcIixcbiAgICAgICAgICAgICAgICAgICAgcGxhY2Vob2xkZXI6IFwiV2FsbGV0IG5hbWVcIlxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICB2aWV3OiBcInRleHRcIixcbiAgICAgICAgICAgICAgICAgICAgbGFiZWw6IFwiU2VjcmV0XCIsXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwic2VjcmV0XCIsXG4gICAgICAgICAgICAgICAgICAgIHBsYWNlaG9sZGVyOiBcIldhbGxldCBzZWNyZXRcIlxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHZpZXc6XCJzZWxlY3RcIiwgXG4gICAgICAgICAgICAgICAgbGFiZWw6XCJOZXR3b3JrIFR5cGVcIiwgXG4gICAgICAgICAgICAgICAgdmFsdWU6IFwibmV0d29ya1wiLFxuICAgICAgICAgICAgICAgIG5hbWU6IFwibmV0d29ya1wiLFxuICAgICAgICAgICAgICAgIG9wdGlvbnM6W1xuICAgICAgICAgICAgICAgICAgICB7IFwiaWRcIjpcIlNURFwiLCBcInZhbHVlXCI6XCJTVERcIiB9LFxuICAgICAgICAgICAgICAgICAgICB7IFwiaWRcIjpcIlRFU1RcIiwgXCJ2YWx1ZVwiOlwiVEVTVFwiIH1cbiAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBdXG4gICAgICAgIH07XG5cbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHZpZXc6IFwid2luZG93XCIsXG4gICAgICAgICAgICBoZWFkOiBcIkltcG9ydCB3YWxsZXRcIixcbiAgICAgICAgICAgIG1vZGFsOiB0cnVlLFxuICAgICAgICAgICAgd2lkdGg6IHdpbmRvdy5pbm5lcldpZHRoICogLjgsXG4gICAgICAgICAgICBoZWlnaHQ6IHdpbmRvdy5pbm5lckhlaWdodCAqIC44LFxuICAgICAgICAgICAgcG9zaXRpb246IFwiY2VudGVyXCIsXG4gICAgICAgICAgICBib2R5OiB7XG4gICAgICAgICAgICAgICAgcm93czogW1xuICAgICAgICAgICAgICAgICAgICBpbmZvLFxuICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICB2aWV3OiBcImJ1dHRvblwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU6IFwiT0tcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIGNzczogXCJ3ZWJpeF9wcmltYXJ5XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBjbGljazogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBuYW1lID0gJCQoJ2ltcG9ydF9mb3JtJykuZ2V0VmFsdWVzKCkubmFtZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBzZWNyZXQgPSAkJCgnaW1wb3J0X2Zvcm0nKS5nZXRWYWx1ZXMoKS5zZWNyZXRcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgbmV0d29yayA9ICQkKCdpbXBvcnRfZm9ybScpLmdldFZhbHVlcygpLm5ldHdvcmtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhuYW1lKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhzZWNyZXQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKG5ldHdvcmspO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuJHNjb3BlLmltcG9ydFdhbGxldChuYW1lLCBzZWNyZXQsIG5ldHdvcmspO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgaW5pdCgpIHtcbiAgICAgICAgdGhpcy5mb3JtID0gJCQoXCJpbXBvcnRfZm9ybVwiKTtcbiAgICB9XG5cbiAgICBzaG93Rm9ybSgpIHtcbiAgICAgICAgdGhpcy5nZXRSb290KCkuc2hvdygpO1xuICAgIH1cblxuICAgIGltcG9ydFdhbGxldChuYW1lLCBzZWNyZXQsIG5ldHdvcmspIHtcbiAgICAgICAgXG4gICAgICAgIHdlYml4LmV4dGVuZCh0aGlzLmZvcm0sIHdlYml4LlByb2dyZXNzQmFyKTtcbiAgICAgICAgdGhpcy5mb3JtLnNob3dQcm9ncmVzcyh7XG4gICAgICAgICAgICB0eXBlOlwiaWNvblwiLFxuICAgICAgICAgICAgaGlkZTogZmFsc2VcbiAgICAgICAgfSk7XG4gICAgICAgIHdhbGxldC5pbXBvcnRXYWxsZXQobmFtZSwgc2VjcmV0LCBuZXR3b3JrKS50aGVuKGRhdGEgPT4ge1xuICAgICAgICAgICAgd2ViaXgubWVzc2FnZSh7IHR5cGU6IFwic3VjY2Vzc1wiLCB0ZXh0OiBcIldhbGxldCBpbXBvcnRlZCBzdWNjZXNzZnVsbHlcIiB9KTtcbiAgICAgICAgICAgIHRoaXMuZm9ybS5zaG93UHJvZ3Jlc3Moe2hpZGU6IHRydWV9KTtcbiAgICAgICAgICAgIHRoaXMuZm9ybS5jbGVhcigpOyBcbiAgICAgICAgICAgIHRoaXMuZm9ybS5nZXRUb3BQYXJlbnRWaWV3KCkuaGlkZSgpO1xuICAgICAgICAgICAgdGhpcy5hcHAucmVmcmVzaCgpXG4gICAgICAgIH0pLmNhdGNoKGVycm9yID0+IHtcbiAgICAgICAgICAgIHdlYml4Lm1lc3NhZ2UoeyB0eXBlOiBcImVycm9yXCIsIHRleHQ6IFwiQ291bGQgbm90IGltcG9ydCB3YWxsZXRcIiB9KTtcbiAgICAgICAgICAgIHRoaXMuZm9ybS5zaG93UHJvZ3Jlc3Moe2hpZGU6IHRydWV9KTtcbiAgICAgICAgICAgIHRoaXMuZm9ybS5jbGVhcigpOyBcbiAgICAgICAgICAgIHRoaXMuZm9ybS5nZXRUb3BQYXJlbnRWaWV3KCkuaGlkZSgpO1xuICAgICAgICAgICAgdGhpcy5hcHAucmVmcmVzaCgpXG4gICAgICAgIH0pO1xuICAgIH1cbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NvdXJjZXMvdmlld3Mvd2FsbGV0c01hbmFnZXIvaW1wb3J0Rm9ybS5qcyIsImV4cG9ydCBmdW5jdGlvbiBjcmVhdGVGaWx0ZXJPcHRpb25zKG9iaikge1xuICAgIC8vIHJldHVybnMgYSBuZXcgb2JqZWN0IGFzIHtpZDogdmFsdWV9LCB1c2VkIGFzIGRhdGEgdGFibGUgZmlsdGVyIG9wdGlvbnNcbiAgICAvLyBvYmo6IGNhbiBiZSBhbiBhcnJheSBvciBhIG1hcHBpbmcgb2JqZWN0XG5cbiAgICBpZiAob2JqIGluc3RhbmNlb2YgQXJyYXkpIHtcbiAgICAgICAgcmV0dXJuIG9iai5tYXAoKHZhbHVlLCBpbmRleCkgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIHsgaWQ6IGluZGV4LCB2YWx1ZTogdmFsdWUgfVxuICAgICAgICB9KTtcbiAgICB9IGVsc2Uge1xuICAgICAgICAvLyBhc3N1bWUgaXQncyBqdXN0IGEgbWFwcGluZyBvdGhlcndpc2VcbiAgICAgICAgcmV0dXJuIE9iamVjdC5rZXlzKG9iaikubWFwKGtleSA9PiB7XG4gICAgICAgICAgICByZXR1cm4geyBpZDoga2V5LCB2YWx1ZTogb2JqW2tleV0gfVxuICAgICAgICB9KTtcbiAgICB9XG5cblxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc291cmNlcy9jb21tb24vZmlsdGVycy5qcyIsImltcG9ydCB7IFNlcnZpY2UgfSBmcm9tIFwiLi4vY29tbW9uL2FwaVwiO1xuXG5jb25zdCBCQVNFX1VSTCA9IFwiL3plcm9ib3QvYWRtaW4vYWN0b3JzL3BhY2thZ2VfbWFuYWdlclwiO1xuXG5cbmNsYXNzIFBhY2thZ2VzU2VydmljZSBleHRlbmRzIFNlcnZpY2Uge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICBzdXBlcihCQVNFX1VSTCk7XG4gICAgfVxuXG4gICAgZ2V0U3RhdHVzKG5hbWVzKSB7XG4gICAgICAgIC8vIHBvc3QgY2FsbCB0byBzZW5kIGFyZ3MgYXMganNvblxuICAgICAgICByZXR1cm4gdGhpcy5wb3N0Q2FsbChcInBhY2thZ2VzX2dldF9zdGF0dXNcIiwge1xuICAgICAgICAgICAgbmFtZXM6IG5hbWVzXG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGxpc3Qob3B0cykge1xuICAgICAgICBvcHRzID0gb3B0cyB8fCB7fTtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0Q2FsbChcInBhY2thZ2VzX2xpc3RcIik7XG4gICAgfVxuXG4gICAgYWRkKHBhdGgsIGdpdFVybCkge1xuICAgICAgICByZXR1cm4gdGhpcy5wb3N0Q2FsbChcInBhY2thZ2VfYWRkXCIsIHtcbiAgICAgICAgICAgIHBhdGg6IHBhdGgsXG4gICAgICAgICAgICBnaXRfdXJsOiBnaXRVcmxcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgZGVsZXRlKHBhY2thZ2VOYW1lKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnBvc3RDYWxsKFwicGFja2FnZV9kZWxldGVcIiwgeyBuYW1lOiBwYWNrYWdlTmFtZSB9KTtcblxuICAgIH1cblxuICAgIHN0YXJ0KHBhY2thZ2VOYW1lKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnBvc3RDYWxsKFwicGFja2FnZV9zdGFydFwiLCB7IG5hbWU6IHBhY2thZ2VOYW1lIH0pO1xuICAgIH1cblxuICAgIHN0b3AocGFja2FnZU5hbWUpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucG9zdENhbGwoXCJwYWNrYWdlX3N0b3BcIiwgeyBuYW1lOiBwYWNrYWdlTmFtZSB9KTtcblxuICAgIH1cblxuICAgIGRpc2FibGUocGFja2FnZU5hbWUpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucG9zdENhbGwoXCJwYWNrYWdlX2Rpc2FibGVcIiwgeyBuYW1lOiBwYWNrYWdlTmFtZSB9KTtcblxuICAgIH1cblxuICAgIGVuYWJsZShwYWNrYWdlTmFtZSkge1xuICAgICAgICByZXR1cm4gdGhpcy5wb3N0Q2FsbChcInBhY2thZ2VfZW5hYmxlXCIsIHsgbmFtZTogcGFja2FnZU5hbWUgfSk7XG4gICAgfVxufVxuXG5cbmV4cG9ydCBjb25zdCBwYWNrYWdlcyA9IG5ldyBQYWNrYWdlc1NlcnZpY2UoKTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NvdXJjZXMvc2VydmljZXMvcGFja2FnZXMuanMiLCJpbXBvcnQgeyBKZXRWaWV3IH0gZnJvbSBcIndlYml4LWpldFwiO1xuaW1wb3J0IHsgaGVhbHRoIH0gZnJvbSBcIi4uLy4uL3NlcnZpY2VzL2hlYWx0aFwiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBEaXNrU3BhY2VWaWV3IGV4dGVuZHMgSmV0VmlldyB7XG4gICAgY29uZmlnKCkge1xuICAgICAgICBjb25zdCBkaXNrU3BhY2UgPSB7XG4gICAgICAgICAgICBpZDogXCJkaXNrU3BhY2VcIixcbiAgICAgICAgICAgIHJlc3BvbnNpdmU6IHRydWUsXG4gICAgICAgICAgICB2aWV3OiBcImxpc3RcIixcbiAgICAgICAgICAgIHR5cGU6IHtcbiAgICAgICAgICAgICAgICBoZWlnaHQ6IDYwLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHRlbXBsYXRlOiBgXG4gICAgICAgICAgICA8cD48Zm9udCBzaXplPVwiM1wiPjxiPiNrZXkjOiA8L2I+PC9mb250PiA8Zm9udCBzaXplPVwiM1wiPiN2YWx1ZSM8L2ZvbnQ+PC9wPlxuICAgICAgICAgICAgYFxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHR5cGU6IFwic3BhY2VcIixcbiAgICAgICAgICAgIHJvd3M6IFt7XG4gICAgICAgICAgICAgICAgdGVtcGxhdGU6IFwiPGRpdiBzdHlsZT0nd2lkdGg6YXV0bzt0ZXh0LWFsaWduOmNlbnRlcic+PGgzPkRpc2sgU3BhY2U8aDMvPjwvZGl2PlwiLFxuICAgICAgICAgICAgICAgIGhlaWdodDogNTBcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgZGlza1NwYWNlXG4gICAgICAgICAgICBdXG4gICAgICAgIH1cbiAgICB9XG5cblxuICAgIGluaXQoKSB7XG4gICAgICAgIHZhciBzZWxmID0gdGhpcztcblxuICAgICAgICB0aGlzLmRpc2tJbmZvID0gdGhpcy4kJChcImRpc2tTcGFjZVwiKTtcblxuICAgICAgICBoZWFsdGguZ2V0RGlza1NwYWNlKCkudGhlbihkYXRhID0+IHtcbiAgICAgICAgICAgIGRhdGEgPSBkYXRhLmpzb24oKTtcblxuICAgICAgICAgICAgc2VsZi5kaXNrSW5mby5hZGQoe1xuICAgICAgICAgICAgICAgIGtleTogXCJVc2VkXCIsXG4gICAgICAgICAgICAgICAgdmFsdWU6IGRhdGEudXNlZCArIFwiIEdCXCJcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgc2VsZi5kaXNrSW5mby5hZGQoe1xuICAgICAgICAgICAgICAgIGtleTogXCJGcmVlXCIsXG4gICAgICAgICAgICAgICAgdmFsdWU6IGRhdGEuZnJlZSArIFwiIEdCXCJcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgc2VsZi5kaXNrSW5mby5hZGQoe1xuICAgICAgICAgICAgICAgIGtleTogXCJUb3RhbFwiLFxuICAgICAgICAgICAgICAgIHZhbHVlOiBkYXRhLnRvdGFsICsgXCIgR0JcIlxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBzZWxmLmRpc2tJbmZvLmFkZCh7XG4gICAgICAgICAgICAgICAga2V5OiBcIlBlcmNlbnRcIixcbiAgICAgICAgICAgICAgICB2YWx1ZTogZGF0YS5wZXJjZW50ICsgXCIgJVwiXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zb3VyY2VzL3ZpZXdzL2Rhc2gvZGlza1NwYWNlLmpzIiwiaW1wb3J0IHsgSmV0VmlldyB9IGZyb20gXCJ3ZWJpeC1qZXRcIjtcbmltcG9ydCB7IGhlYWx0aCB9IGZyb20gXCIuLi8uLi9zZXJ2aWNlcy9oZWFsdGhcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgaGVhbHRoSW5mb1ZpZXcgZXh0ZW5kcyBKZXRWaWV3IHtcbiAgICBjb25maWcoKSB7XG4gICAgICAgIGNvbnN0IGhlYWx0aEluZm8gPSB7XG4gICAgICAgICAgICBpZDogXCJoZWFsdGhJbmZvXCIsXG4gICAgICAgICAgICByZXNwb25zaXZlOiB0cnVlLFxuICAgICAgICAgICAgdmlldzogXCJsaXN0XCIsXG4gICAgICAgICAgICByZXNwb25zaXZlOiB0cnVlLFxuICAgICAgICAgICAgdHlwZToge1xuICAgICAgICAgICAgICAgIGhlaWdodDogNjAsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgdGVtcGxhdGU6IGBcbiAgICAgICAgICAgIDxwPjxmb250IHNpemU9XCIzXCI+PGI+I2tleSM6IDwvYj48L2ZvbnQ+ICN2YWx1ZSM8L3A+XG4gICAgICAgICAgICBgXG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgdHlwZTogXCJzcGFjZVwiLFxuICAgICAgICAgICAgcm93czogW3tcbiAgICAgICAgICAgICAgICB0ZW1wbGF0ZTogXCI8ZGl2IHN0eWxlPSd3aWR0aDphdXRvO3RleHQtYWxpZ246Y2VudGVyJz48aDM+SGVhbHRoIENoZWNrczxoMy8+PC9kaXY+XCIsXG4gICAgICAgICAgICAgICAgaGVpZ2h0OiA1MFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBoZWFsdGhJbmZvXVxuICAgICAgICB9XG4gICAgfVxuICAgIGluaXQodmlldykge1xuICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XG5cbiAgICAgICAgdGhpcy5oZWFsdGhJbmZvID0gdGhpcy4kJChcImhlYWx0aEluZm9cIik7XG5cbiAgICAgICAgaGVhbHRoLmdldEhlYWx0aCgpLnRoZW4oZGF0YSA9PiB7XG4gICAgICAgICAgICBkYXRhID0gZGF0YS5qc29uKCk7XG5cbiAgICAgICAgICAgIGlmIChkYXRhLmJjZGIgPT09IFwiT0tcIikge1xuICAgICAgICAgICAgICAgIHNlbGYuaGVhbHRoSW5mby5hZGQoe1xuICAgICAgICAgICAgICAgICAgICBrZXk6IFwiQkNEQiBTdGF0dXNcIixcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU6IGA8c3BhbiBjbGFzcz0nd2ViaXhfaWNvbiB3eGktY2hlY2tib3gtbWFya2VkJyBzdHlsZT1cImNvbG9yOmdyZWVuXCI+T0s8L3NwYW4+YFxuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoZGF0YS5iY2RiID09PSBcIkVycm9yXCIpIHtcbiAgICAgICAgICAgICAgICBzZWxmLmhlYWx0aEluZm8uYWRkKHtcbiAgICAgICAgICAgICAgICAgICAga2V5OiBcIkJDREJcIixcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU6IGA8c3BhbiBjbGFzcz0nd2ViaXhfaWNvbiB3eGktY2xvc2UtY2lyY2xlJyBzdHlsZT1cImNvbG9yOnJlZFwiPkVycm9yPC9zcGFuPmBcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGRhdGEud2lraXMgPT09IFwiT0tcIikge1xuICAgICAgICAgICAgICAgIHNlbGYuaGVhbHRoSW5mby5hZGQoe1xuICAgICAgICAgICAgICAgICAgICBrZXk6IFwiV2lraXNcIixcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU6IGA8c3BhbiBjbGFzcz0nd2ViaXhfaWNvbiB3eGktY2hlY2tib3gtbWFya2VkJyBzdHlsZT1cImNvbG9yOmdyZWVuXCI+T0s8L3NwYW4+YFxuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoZGF0YS53aWtpcyA9PT0gXCJFcnJvclwiKSB7XG4gICAgICAgICAgICAgICAgc2VsZi5oZWFsdGhJbmZvLmFkZCh7XG4gICAgICAgICAgICAgICAgICAgIGtleTogXCJXaWtpc1wiLFxuICAgICAgICAgICAgICAgICAgICB2YWx1ZTogYDxzcGFuIGNsYXNzPSd3ZWJpeF9pY29uIHd4aS1jbG9zZS1jaXJjbGUnIHN0eWxlPVwiY29sb3I6cmVkXCI+RXJyb3I8L3NwYW4+YFxuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoZGF0YS5jb2Rlc2VydmVyID09PSBcIk9LXCIpIHtcbiAgICAgICAgICAgICAgICBzZWxmLmhlYWx0aEluZm8uYWRkKHtcbiAgICAgICAgICAgICAgICAgICAga2V5OiBcIkNvZGVzZXJ2ZXJcIixcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU6IGA8c3BhbiBjbGFzcz0nd2ViaXhfaWNvbiB3eGktY2hlY2tib3gtbWFya2VkJyBzdHlsZT1cImNvbG9yOmdyZWVuXCI+T0s8L3NwYW4+YFxuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoZGF0YS5jb2Rlc2VydmVyID09PSBcIkVycm9yXCIpIHtcbiAgICAgICAgICAgICAgICBzZWxmLmhlYWx0aEluZm8uYWRkKHtcbiAgICAgICAgICAgICAgICAgICAga2V5OiBcIkNvZGVzZXJ2ZXJcIixcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU6IGA8c3BhbiBjbGFzcz0nd2ViaXhfaWNvbiB3eGktY2xvc2UtY2lyY2xlJyBzdHlsZT1cImNvbG9yOnJlZFwiPkVycm9yPC9zcGFuPmBcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGRhdGEuanVweXRlciA9PT0gXCJPS1wiKSB7XG4gICAgICAgICAgICAgICAgc2VsZi5oZWFsdGhJbmZvLmFkZCh7XG4gICAgICAgICAgICAgICAgICAgIGtleTogXCJKdXB5dGVyXCIsXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlOiBgPHNwYW4gY2xhc3M9J3dlYml4X2ljb24gd3hpLWNoZWNrYm94LW1hcmtlZCcgc3R5bGU9XCJjb2xvcjpncmVlblwiPk9LPC9zcGFuPmBcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGRhdGEuanVweXRlciA9PT0gXCJFcnJvclwiKSB7XG4gICAgICAgICAgICAgICAgc2VsZi5oZWFsdGhJbmZvLmFkZCh7XG4gICAgICAgICAgICAgICAgICAgIGtleTogXCJKdXB5dGVyXCIsXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlOiBgPHNwYW4gY2xhc3M9J3dlYml4X2ljb24gd3hpLWNsb3NlLWNpcmNsZScgc3R5bGU9XCJjb2xvcjpyZWRcIj5FcnJvcjwvc3Bhbj5gXG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICB9XG5cbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NvdXJjZXMvdmlld3MvZGFzaC9oZWFsdGguanMiLCJpbXBvcnQgeyBKZXRWaWV3IH0gZnJvbSBcIndlYml4LWpldFwiO1xuaW1wb3J0IHsgaGVhbHRoIH0gZnJvbSBcIi4uLy4uL3NlcnZpY2VzL2hlYWx0aFwiO1xuaW1wb3J0IHsgaWRlbnRpdHkgfSBmcm9tIFwiLi4vLi4vc2VydmljZXMvaWRlbnRpdHlcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgSlNYSW5mb1ZpZXcgZXh0ZW5kcyBKZXRWaWV3IHtcbiAgICBjb25maWcoKSB7XG4gICAgICAgIGNvbnN0IGluZm8gPSB7XG4gICAgICAgICAgICBpZDogXCJqc3hJbmZvXCIsXG4gICAgICAgICAgICByZXNwb25zaXZlOiB0cnVlLFxuICAgICAgICAgICAgdmlldzogXCJsaXN0XCIsXG4gICAgICAgICAgICByZXNwb25zaXZlOiB0cnVlLFxuICAgICAgICAgICAgdHlwZToge1xuICAgICAgICAgICAgICAgIGhlaWdodDogJ2F1dG8nLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHRlbXBsYXRlOiBgXG4gICAgICAgICAgICAgICAgPHA+PGZvbnQgc2l6ZT1cIjNcIj48Yj4ja2V5IzogPC9iPjwvZm9udD4gPGZvbnQgc2l6ZT1cIjNcIj4jdmFsdWUjPC9mb250PjwvcD5cbiAgICAgICAgICAgIGBcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBib3RJbmZvID0ge1xuICAgICAgICAgICAgaWQ6IFwiYm90SW5mb1wiLFxuICAgICAgICAgICAgcmVzcG9uc2l2ZTogdHJ1ZSxcbiAgICAgICAgICAgIHZpZXc6IFwibGlzdFwiLFxuICAgICAgICAgICAgcmVzcG9uc2l2ZTogdHJ1ZSxcbiAgICAgICAgICAgIGhlaWdodDogMTAwLFxuICAgICAgICAgICAgdHlwZToge1xuICAgICAgICAgICAgICAgIGhlaWdodDogNTAsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgdGVtcGxhdGU6IGBcbiAgICAgICAgICAgICAgICA8cD48Zm9udCBzaXplPVwiM1wiPjxiPiNrZXkjOiA8L2I+PC9mb250PiA8Zm9udCBzaXplPVwiM1wiPiN2YWx1ZSM8L2ZvbnQ+PC9wPlxuICAgICAgICAgICAgYFxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHR5cGU6IFwic3BhY2VcIixcbiAgICAgICAgICAgIHJvd3M6IFt7XG4gICAgICAgICAgICAgICAgdGVtcGxhdGU6IFwiPGRpdiBzdHlsZT0nd2lkdGg6YXV0bzt0ZXh0LWFsaWduOmNlbnRlcic+PGgzPkpTWCBJbmZvPGgzLz48L2Rpdj5cIixcbiAgICAgICAgICAgICAgICBoZWlnaHQ6IDUwXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIGJvdEluZm8sXG4gICAgICAgICAgICAgICAgaW5mb1xuICAgICAgICAgICAgXVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgaW5pdCgpIHtcbiAgICAgICAgY29uc3Qgc2VsZiA9IHRoaXM7XG5cbiAgICAgICAgdGhpcy5pbmZvID0gdGhpcy4kJChcImpzeEluZm9cIik7XG4gICAgICAgIHRoaXMuYm90aW5mbyA9IHRoaXMuJCQoXCJib3RJbmZvXCIpO1xuICAgICAgICBoZWFsdGguZ2V0SWRlbnRpdHkoKS50aGVuKGRhdGEgPT4ge1xuICAgICAgICAgICAgc2VsZi5ib3RpbmZvLmFkZCh7XG4gICAgICAgICAgICAgICAga2V5OiBcIjNib3QgbmFtZVwiLFxuICAgICAgICAgICAgICAgIHZhbHVlOiBkYXRhLnRleHQoKVxuICAgICAgICAgICAgfSlcbiAgICAgICAgfSlcbiAgICAgICAgaWRlbnRpdHkuZ2V0X2lkZW50aXR5KCkudGhlbihkYXRhID0+IHtcbiAgICAgICAgICAgIHNlbGYuYm90aW5mby5hZGQoe1xuICAgICAgICAgICAgICAgIGtleTogXCIzYm90IGlkXCIsXG4gICAgICAgICAgICAgICAgdmFsdWU6IGRhdGEuanNvbigpLnRpZFxuICAgICAgICAgICAgfSlcbiAgICAgICAgfSlcblxuICAgICAgICBoZWFsdGguZ2V0TmV0d29ya0luZm8oKS50aGVuKGRhdGEgPT4ge1xuICAgICAgICAgICAgZGF0YSA9IGRhdGEuanNvbigpO1xuICAgICAgICAgICAgZm9yICh2YXIgaSBpbiBkYXRhKSB7XG4gICAgICAgICAgICAgICAgdmFyIGlwID0gZGF0YVtpXS5pcDtcbiAgICAgICAgICAgICAgICB2YXIgaXA2ID0gZGF0YVtpXS5pcDYubGVuZ3RoID8gZGF0YVtpXS5pcDYgOiBcIk5vdCBzZXRcIjtcblxuICAgICAgICAgICAgICAgIHNlbGYuaW5mby5hZGQoe1xuICAgICAgICAgICAgICAgICAgICBrZXk6IGRhdGFbaV0ubmFtZSxcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU6IGA8YnI+PGI+SVA6IDwvYj4ke2lwfTxicj48Yj5JUHY2OiA8L2I+JHtpcDZ9YFxuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGhlYWx0aC5nZXRKc3hWZXJzaW9uKCkudGhlbihkYXRhID0+IHtcbiAgICAgICAgICAgIHNlbGYuaW5mby5hZGQoe1xuICAgICAgICAgICAgICAgIGtleTogXCJKU1ggVmVyc2lvblwiLFxuICAgICAgICAgICAgICAgIHZhbHVlOiBkYXRhLnRleHQoKVxuICAgICAgICAgICAgfSlcbiAgICAgICAgfSlcblxuICAgIH1cblxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc291cmNlcy92aWV3cy9kYXNoL2pzeEluZm8uanMiLCJpbXBvcnQge1xuICAgIEpldFZpZXdcbn0gZnJvbSBcIndlYml4LWpldFwiO1xuXG5pbXBvcnQge1xuICAgIGhlYWx0aFxufSBmcm9tIFwiLi4vLi4vc2VydmljZXMvaGVhbHRoXCI7XG5cbmNvbnN0IGNvbG9yc0RhdGFzZXQgPSBbe1xuICAgICAgICBjb2xvcjogXCIjZWUzNjM5XCJcbiAgICB9LFxuICAgIHtcbiAgICAgICAgY29sb3I6IFwiI2VlOWUzNlwiXG4gICAgfSxcbiAgICB7XG4gICAgICAgIGNvbG9yOiBcIiNlZWVhMzZcIlxuICAgIH0sXG4gICAge1xuICAgICAgICBjb2xvcjogXCIjYTllZTM2XCJcbiAgICB9LFxuICAgIHtcbiAgICAgICAgY29sb3I6IFwiIzM2ZDNlZVwiXG4gICAgfSxcbiAgICB7XG4gICAgICAgIGNvbG9yOiBcIiMzNjdmZWVcIlxuICAgIH0sXG4gICAge1xuICAgICAgICBjb2xvcjogXCIjOWIzNmVlXCJcbiAgICB9XG5dO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBQcm9jZXNzZXNWaWV3IGV4dGVuZHMgSmV0VmlldyB7XG5cbiAgICBjb25maWcoKSB7XG4gICAgICAgIGNvbnN0IHByb2Nlc3Nlc0luZm8gPSB7XG4gICAgICAgICAgICBpZDogXCJwcm9jZXNzXCIsXG4gICAgICAgICAgICB2aWV3OiBcImNoYXJ0XCIsXG4gICAgICAgICAgICByZXNwb25zaXZlOiB0cnVlLFxuICAgICAgICAgICAgdHlwZTogXCJwaWVcIixcbiAgICAgICAgICAgIGhlaWdodDogNDAwLFxuICAgICAgICAgICAgY29sb3I6IFwiI2NvbG9yI1wiLFxuICAgICAgICAgICAgdmFsdWU6IFwiI3JzcyNcIixcbiAgICAgICAgICAgIGxhYmVsOiBcIjxoND4jbmFtZSM8L2g0PlwiLFxuICAgICAgICAgICAgcGllSW5uZXJUZXh0OiBcIjxoND4jcnNzIzwvaDQ+XCIsXG4gICAgICAgICAgICBkYXRhOiBcIiNjaGFydHNEYXRhI1wiLFxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHR5cGU6IFwic3BhY2VcIixcbiAgICAgICAgICAgIHJvd3M6IFt7XG4gICAgICAgICAgICAgICAgICAgIHRlbXBsYXRlOiBcIjxkaXYgc3R5bGU9J3dpZHRoOmF1dG87dGV4dC1hbGlnbjpjZW50ZXInPjxoMz5SdW5uaW5nIHByb2Nlc3NlcyBtZW1vcnkgdXNhZ2UgKFJTUykgKE1CKTxoMy8+PC9kaXY+XCIsXG4gICAgICAgICAgICAgICAgICAgIGhlaWdodDogNTBcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHByb2Nlc3Nlc0luZm9cblxuICAgICAgICAgICAgXVxuICAgICAgICB9XG4gICAgfVxuXG5cbiAgICBpbml0KHZpZXcpIHtcbiAgICAgICAgY29uc3Qgc2VsZiA9IHRoaXM7XG5cbiAgICAgICAgdGhpcy5wcm9jZXNzZXNMaXN0ID0gW11cblxuICAgICAgICB0aGlzLnJ1blByb2Nlc3NJbmZvID0gdGhpcy4kJChcInByb2Nlc3NcIik7XG5cbiAgICAgICAgaGVhbHRoLmdldFJ1bm5pbmdQcm9jZXNzZXMoKS50aGVuKGRhdGEgPT4ge1xuICAgICAgICAgICAgdmFyIGNoYXJ0c0RhdGEgPSBbXVxuXG4gICAgICAgICAgICBkYXRhID0gZGF0YS5qc29uKCk7XG4gICAgICAgICAgICBzZWxmLnByb2Nlc3Nlc0xpc3QgPSBkYXRhLnByb2Nlc3Nlc19saXN0XG5cbiAgICAgICAgICAgIC8vIG1lbW9yeSB1c2FnZVxuICAgICAgICAgICAgc2VsZi5tZW1vcnlVc2FnZSA9IGRhdGEubWVtb3J5X3VzYWdlXG4gICAgICAgICAgICBzZWxmLnRvdGFsTWVtb3J5ID0gc2VsZi5tZW1vcnlVc2FnZS50b3RhbF9tZW1cbiAgICAgICAgICAgIHNlbGYucGVyY2VudCA9IHNlbGYubWVtb3J5VXNhZ2UudXNhZ2VfcGVyY2VudFxuXG5cbiAgICAgICAgICAgIHNlbGYucnVuUHJvY2Vzc0luZm8uZGVmaW5lKFwibGVnZW5kXCIsIHtcbiAgICAgICAgICAgICAgICBsYXlvdXQ6IFwieFwiLFxuICAgICAgICAgICAgICAgIHdpZHRoOiAxMTAsXG4gICAgICAgICAgICAgICAgdmFsdWVzOiBbe1xuICAgICAgICAgICAgICAgICAgICAgICAgdGV4dDogYDxiPlRvdGFsIG1lbW9yeTogPC9iPiR7c2VsZi50b3RhbE1lbW9yeX1HQmBcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGV4dDogYDxiPlVzYWdlOiA8L2I+JHtzZWxmLnBlcmNlbnR9JWBcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICBzZWxmLnJ1blByb2Nlc3NJbmZvLnJlZnJlc2goKVxuXG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHNlbGYucHJvY2Vzc2VzTGlzdC5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIC8vQnJlYWsgd2hlbiB0aGVyZSBpcyBubyBtb3JlIGNvbG9yc1xuICAgICAgICAgICAgICAgIGlmIChpID09IGNvbG9yc0RhdGFzZXQubGVuZ3RoKVxuICAgICAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgICAgIHZhciB0ZW1wID0ge1xuICAgICAgICAgICAgICAgICAgICBcImNvbG9yXCI6IGNvbG9yc0RhdGFzZXRbaV0uY29sb3IsXG4gICAgICAgICAgICAgICAgICAgIFwibmFtZVwiOiBzZWxmLnByb2Nlc3Nlc0xpc3RbaV0ubmFtZSxcbiAgICAgICAgICAgICAgICAgICAgXCJyc3NcIjogTWF0aC5jZWlsKHNlbGYucHJvY2Vzc2VzTGlzdFtpXS5yc3MpLFxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBjaGFydHNEYXRhLnB1c2godGVtcClcbiAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhteUFycmF5W2ldKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgc2VsZi5ydW5Qcm9jZXNzSW5mby5wYXJzZSh7XG4gICAgICAgICAgICAgICAgZGF0YTogY2hhcnRzRGF0YSxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9XG5cbn1cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zb3VyY2VzL3ZpZXdzL2Rhc2gvcHJvY2Vzc2VzLmpzIiwiaW1wb3J0IHsgSmV0VmlldyB9IGZyb20gXCJ3ZWJpeC1qZXRcIjtcblxuaW1wb3J0IHsgaGVhbHRoIH0gZnJvbSBcIi4uLy4uL3NlcnZpY2VzL2hlYWx0aFwiO1xuaW1wb3J0IFByb2Nlc3NEZXRhaWxzVmlldyBmcm9tIFwiLi9wcm9jZXNzRGV0YWlsc1wiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBwcm9jZXNzZXNMaXN0VmlldyBleHRlbmRzIEpldFZpZXcge1xuICAgIGNvbmZpZygpIHtcbiAgICAgICAgY29uc3QgdmlldyA9IHtcbiAgICAgICAgICAgIHZpZXc6IFwiZGF0YXRhYmxlXCIsXG4gICAgICAgICAgICBpZDogXCJwcm9jZXNzX3RhYmxlXCIsXG4gICAgICAgICAgICByZXNpemVDb2x1bW46IHRydWUsXG4gICAgICAgICAgICBzZWxlY3Q6IHRydWUsXG4gICAgICAgICAgICBtdWx0aXNlbGVjdDogdHJ1ZSxcbiAgICAgICAgICAgIGNzczogXCJ3ZWJpeF9oZWFkZXJfYm9yZGVyIHdlYml4X2RhdGFfYm9yZGVyXCIsXG4gICAgICAgICAgICBzY3JvbGw6IHRydWUsXG4gICAgICAgICAgICBhdXRvQ29uZmlnOiB0cnVlLFxuICAgICAgICAgICAgY29sdW1uczogW3tcbiAgICAgICAgICAgICAgICAgICAgaWQ6IFwiaW5kZXhcIixcbiAgICAgICAgICAgICAgICAgICAgaGVhZGVyOiBcIiNcIixcbiAgICAgICAgICAgICAgICAgICAgc29ydDogXCJpbnRcIixcbiAgICAgICAgICAgICAgICAgICAgYXV0b3dpZHRoOiB0cnVlLFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBpZDogXCJuYW1lXCIsXG4gICAgICAgICAgICAgICAgICAgIGhlYWRlcjogW1xuICAgICAgICAgICAgICAgICAgICAgICAgXCJQcm9jZXNzXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29udGVudDogXCJ0ZXh0RmlsdGVyXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgICAgIHNvcnQ6IFwic3RyaW5nXCIsXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIGlkOiBcInBpZFwiLFxuICAgICAgICAgICAgICAgICAgICBoZWFkZXI6IFwiUElEXCIsXG4gICAgICAgICAgICAgICAgICAgIHNvcnQ6IFwiaW50XCJcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgaWQ6IFwidXNlcm5hbWVcIixcbiAgICAgICAgICAgICAgICAgICAgaGVhZGVyOiBcIlVzZXJuYW1lXCIsXG4gICAgICAgICAgICAgICAgICAgIHNvcnQ6IFwic3RyaW5nXCJcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgaWQ6IFwicnNzXCIsXG4gICAgICAgICAgICAgICAgICAgIGhlYWRlcjogXCJNZW1vcnkgVXNhZ2VcIixcbiAgICAgICAgICAgICAgICAgICAgc29ydDogXCJpbnRcIixcbiAgICAgICAgICAgICAgICAgICAgZm9ybWF0OiBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBNYXRoLmNlaWwodmFsdWUpXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgXSxcbiAgICAgICAgICAgIHNjaGVtZToge1xuICAgICAgICAgICAgICAgICRpbml0OiBmdW5jdGlvbiAob2JqKSB7XG4gICAgICAgICAgICAgICAgICAgIG9iai5pbmRleCA9IHRoaXMuY291bnQoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHR5cGU6IFwic3BhY2VcIixcbiAgICAgICAgICAgIHJvd3M6IFtcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIHRlbXBsYXRlOiBcIjxkaXYgc3R5bGU9J3dpZHRoOmF1dG87dGV4dC1hbGlnbjpjZW50ZXInPjxoMz5Qcm9jZXNzZXM8aDMvPjwvZGl2PlwiLFxuICAgICAgICAgICAgICAgICAgICBoZWlnaHQ6IDUwXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB2aWV3XG4gICAgICAgICAgICBdXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBraWxsUHJvY2VzcyhvYmplY3RzKSB7XG4gICAgICAgIHZhciBzZWxmID0gdGhpcztcblxuICAgICAgICBsZXQgaXRlbXMgPSBbXSxcbiAgICAgICAgICAgIGlkcyA9IFtdLFxuICAgICAgICAgICAgaW5kZXhlcyA9IFtdO1xuXG4gICAgICAgIGZvciAobGV0IG9iaiBvZiBvYmplY3RzKSB7XG4gICAgICAgICAgICBpZHMucHVzaChvYmouaWQpO1xuICAgICAgICAgICAgbGV0IGl0ZW0gPSBzZWxmLnByb2Nlc3NUYWJsZS5nZXRJdGVtKG9iai5pZCk7XG4gICAgICAgICAgICBpdGVtcy5wdXNoKGl0ZW0pXG4gICAgICAgICAgICBpbmRleGVzLnB1c2goaXRlbS5pbmRleCk7XG4gICAgICAgIH1cblxuICAgICAgICB3ZWJpeC5jb25maXJtKHtcbiAgICAgICAgICAgIHRpdGxlOiBcIktpbGwgcHJvY2Vzc2VzXCIsXG4gICAgICAgICAgICBvazogXCJZZXNcIixcbiAgICAgICAgICAgIGNhbmNlbDogXCJOb1wiLFxuICAgICAgICAgICAgdGV4dDogYEtpbGwgcHJvY2Vzc2VzIHdpdGggcm93IGlkcyAke2luZGV4ZXMuam9pbihcIiwgXCIpfWBcbiAgICAgICAgfSkudGhlbigoKSA9PiB7XG5cbiAgICAgICAgICAgIGNvbnN0IHBpZHMgPSBpdGVtcy5tYXAoKGl0ZW0pID0+IGl0ZW0ucGlkKTtcblxuICAgICAgICAgICAgaGVhbHRoLmtpbGxQcm9jZXNzZXNCeVBpZChwaWRzKS50aGVuKCgpID0+IHtcbiAgICAgICAgICAgICAgICBzZWxmLnByb2Nlc3NUYWJsZS5yZW1vdmUoaWRzKVxuICAgICAgICAgICAgICAgIHdlYml4Lm1lc3NhZ2UoeyB0eXBlOiBcInN1Y2Nlc3NcIiwgdGV4dDogXCJQcm9jZXNzZXMga2lsbGVkIHN1Y2Nlc3NmdWxseVwiIH0pO1xuICAgICAgICAgICAgfSkuY2F0Y2goZXJyb3IgPT4ge1xuICAgICAgICAgICAgICAgIHdlYml4Lm1lc3NhZ2UoeyB0eXBlOiBcImVycm9yXCIsIHRleHQ6IFwiQ291bGQgbm90IGtpbGwgcHJvY2Vzc1wiIH0pO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgaW5pdCgpIHtcbiAgICAgICAgY29uc3Qgc2VsZiA9IHRoaXM7XG4gICAgICAgIHNlbGYucHJvY2Vzc0RldGFpbHNWaWV3ID0gc2VsZi51aShQcm9jZXNzRGV0YWlsc1ZpZXcpO1xuXG4gICAgICAgIHNlbGYucHJvY2Vzc1RhYmxlID0gdGhpcy4kJChcInByb2Nlc3NfdGFibGVcIik7XG4gICAgICAgIGhlYWx0aC5nZXRSdW5uaW5nUHJvY2Vzc2VzKCkudGhlbihkYXRhID0+IHtcbiAgICAgICAgICAgIHNlbGYucHJvY2Vzc1RhYmxlLnBhcnNlKGRhdGEuanNvbigpLnByb2Nlc3Nlc19saXN0KTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgd2ViaXgudWkoe1xuICAgICAgICAgICAgdmlldzogXCJjb250ZXh0bWVudVwiLFxuICAgICAgICAgICAgaWQ6IFwicHJvY2Vzc19jbVwiLFxuICAgICAgICAgICAgZGF0YTogW1wiS2lsbFwiXVxuICAgICAgICB9KS5hdHRhY2hUbyhzZWxmLnByb2Nlc3NUYWJsZSk7XG5cbiAgICAgICAgc2VsZi5wcm9jZXNzVGFibGUuYXR0YWNoRXZlbnQoXCJvbkl0ZW1EYmxDbGlja1wiLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBsZXQgcGlkID0gc2VsZi5wcm9jZXNzVGFibGUuZ2V0U2VsZWN0ZWRJdGVtKClbXCJwaWRcIl1cbiAgICAgICAgICAgIGhlYWx0aC5nZXRQcm9jZXNzRGV0YWlscyhwaWQpLnRoZW4oKGRhdGEpID0+e1xuICAgICAgICAgICAgICAgIHNlbGYucHJvY2Vzc0RldGFpbHNWaWV3LnNob3dQcm9jZXNzRGV0YWlscyhkYXRhLmpzb24oKSlcbiAgICAgICAgICAgIH0pLmNhdGNoKGVyciA9PiB7XG4gICAgICAgICAgICAgICAgd2ViaXgubWVzc2FnZSh7IHR5cGU6IFwiZXJyb3JcIiwgdGV4dDogXCJDb3VsZCBub3QgZ2V0IHByb2Nlc3MgZGV0YWlsc1wiIH0pO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgfSk7XG5cbiAgICAgICAgJCQoXCJwcm9jZXNzX2NtXCIpLmF0dGFjaEV2ZW50KFwib25NZW51SXRlbUNsaWNrXCIsIGZ1bmN0aW9uIChpZCkge1xuICAgICAgICAgICAgaWYgKGlkID09IFwiS2lsbFwiKSB7XG4gICAgICAgICAgICAgICAgc2VsZi5raWxsUHJvY2VzcyhzZWxmLnByb2Nlc3NUYWJsZS5nZXRTZWxlY3RlZElkKHRydWUpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuXG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zb3VyY2VzL3ZpZXdzL2Rhc2gvcHJvY2Vzc2VzTGlzdC5qcyIsImltcG9ydCB7IEpldFZpZXcgfSBmcm9tIFwid2ViaXgtamV0XCI7XG5cbmltcG9ydCB7IGhlYWx0aCB9IGZyb20gXCIuLi8uLi9zZXJ2aWNlcy9oZWFsdGhcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgcnVubmluZ1BvcnRzVmlldyBleHRlbmRzIEpldFZpZXcge1xuICAgIGNvbmZpZygpIHtcbiAgICAgICAgY29uc3QgcG9ydHMgPSB7XG4gICAgICAgICAgICBpZDogXCJydW5uaW5nUG9ydHNcIixcbiAgICAgICAgICAgIHZpZXc6IFwiZGF0YXRhYmxlXCIsXG4gICAgICAgICAgICByZXNwb25zaXZlOiB0cnVlLFxuICAgICAgICAgICAgYXV0b0NvbmZpZzogdHJ1ZSxcbiAgICAgICAgICAgIHR5cGU6IHtcbiAgICAgICAgICAgICAgICBoZWlnaHQ6IDIwMCxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB0ZW1wbGF0ZTogXCJSdW5uaW5nIFBvcnRzXCIsXG4gICAgICAgICAgICByZXNpemVDb2x1bW46IHRydWUsXG4gICAgICAgICAgICBzZWxlY3Q6IHRydWUsXG4gICAgICAgICAgICBtdWx0aXNlbGVjdDogdHJ1ZSxcbiAgICAgICAgICAgIGNzczogXCJ3ZWJpeF9oZWFkZXJfYm9yZGVyIHdlYml4X2RhdGFfYm9yZGVyXCIsXG4gICAgICAgICAgICBjb2x1bW5zOiBbe1xuICAgICAgICAgICAgICAgIGlkOiBcImluZGV4XCIsXG4gICAgICAgICAgICAgICAgaGVhZGVyOiBcIiNcIixcbiAgICAgICAgICAgICAgICBzb3J0OiBcImludFwiLFxuICAgICAgICAgICAgICAgIGF1dG93aWR0aDogdHJ1ZSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgaWQ6IFwicG9ydF9udW1iZXJcIixcbiAgICAgICAgICAgICAgICBoZWFkZXI6IFtcIlBvcnQgTnVtYmVyXCIsIHtcbiAgICAgICAgICAgICAgICAgICAgY29udGVudDogXCJ0ZXh0RmlsdGVyXCJcbiAgICAgICAgICAgICAgICB9LF0sXG4gICAgICAgICAgICAgICAgc29ydDogXCJzdHJpbmdcIlxuICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIGlkOiBcInByb2Nlc3NcIixcbiAgICAgICAgICAgICAgICBoZWFkZXI6IFtcIlByb2Nlc3NcIiwge1xuICAgICAgICAgICAgICAgICAgICBjb250ZW50OiBcInRleHRGaWx0ZXJcIlxuICAgICAgICAgICAgICAgIH1dLFxuICAgICAgICAgICAgICAgIHNvcnQ6IFwic3RyaW5nXCJcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIF0sXG4gICAgICAgICAgICBzY2hlbWU6IHtcbiAgICAgICAgICAgICAgICAkaW5pdDogZnVuY3Rpb24gKG9iaikge1xuICAgICAgICAgICAgICAgICAgICBvYmouaW5kZXggPSB0aGlzLmNvdW50KCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICB0eXBlOiBcInNwYWNlXCIsXG4gICAgICAgICAgICByb3dzOiBbXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICB0ZW1wbGF0ZTogXCI8ZGl2IHN0eWxlPSd3aWR0aDphdXRvO3RleHQtYWxpZ246Y2VudGVyJz48aDM+UG9ydHM8aDMvPjwvZGl2PlwiLFxuICAgICAgICAgICAgICAgICAgICBoZWlnaHQ6IDUwXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBwb3J0c1xuICAgICAgICAgICAgXVxuICAgICAgICB9XG4gICAgfVxuXG4gICAga2lsbFByb2Nlc3Mob2JqZWN0cykge1xuICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XG5cbiAgICAgICAgbGV0IGl0ZW1zID0gW10sXG4gICAgICAgICAgICBpZHMgPSBbXSxcbiAgICAgICAgICAgIGluZGV4ZXMgPSBbXTtcblxuICAgICAgICBmb3IgKGxldCBvYmogb2Ygb2JqZWN0cykge1xuICAgICAgICAgICAgaWRzLnB1c2gob2JqLmlkKTtcbiAgICAgICAgICAgIGxldCBpdGVtID0gc2VsZi5wb3J0c1RhYmxlLmdldEl0ZW0ob2JqLmlkKTtcbiAgICAgICAgICAgIGl0ZW1zLnB1c2goaXRlbSlcbiAgICAgICAgICAgIGluZGV4ZXMucHVzaChpdGVtLmluZGV4KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHdlYml4LmNvbmZpcm0oe1xuICAgICAgICAgICAgdGl0bGU6IFwiS2lsbCBwcm9jZXNzZXNcIixcbiAgICAgICAgICAgIG9rOiBcIlllc1wiLFxuICAgICAgICAgICAgY2FuY2VsOiBcIk5vXCIsXG4gICAgICAgICAgICB0ZXh0OiBgS2lsbCBwcm9jZXNzZXMgd2l0aCByb3cgaWRzICR7aW5kZXhlcy5qb2luKFwiLCBcIil9YFxuICAgICAgICB9KS50aGVuKCgpID0+IHtcblxuICAgICAgICAgICAgY29uc3QgcG9ydHMgPSBpdGVtcy5tYXAoKGl0ZW0pID0+IGl0ZW0ucG9ydF9udW1iZXIpO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICBoZWFsdGgua2lsbFByb2Nlc3Nlc0J5UG9ydChwb3J0cykudGhlbigoKSA9PiB7XG4gICAgICAgICAgICAgICAgc2VsZi5wb3J0c1RhYmxlLnJlbW92ZShpZHMpXG4gICAgICAgICAgICAgICAgd2ViaXgubWVzc2FnZSh7IHR5cGU6IFwic3VjY2Vzc1wiLCB0ZXh0OiBcIlByb2Nlc3NlcyBraWxsZWQgc3VjY2Vzc2Z1bGx5XCIgfSk7XG4gICAgICAgICAgICB9KS5jYXRjaChlcnJvciA9PiB7XG4gICAgICAgICAgICAgICAgd2ViaXgubWVzc2FnZSh7IHR5cGU6IFwiZXJyb3JcIiwgdGV4dDogXCJDb3VsZCBub3Qga2lsbCBwcm9jZXNzXCIgfSk7XG4gICAgICAgICAgICB9KVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBpbml0KCkge1xuICAgICAgICBjb25zdCBzZWxmID0gdGhpcztcblxuICAgICAgICBzZWxmLnBvcnRzVGFibGUgPSB0aGlzLiQkKFwicnVubmluZ1BvcnRzXCIpO1xuICAgICAgICBoZWFsdGguZ2V0UnVubmluZ1BvcnRzKCkudGhlbihkYXRhID0+IHtcbiAgICAgICAgICAgIHNlbGYucG9ydHNUYWJsZS5wYXJzZShkYXRhLmpzb24oKSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHdlYml4LnVpKHtcbiAgICAgICAgICAgIHZpZXc6IFwiY29udGV4dG1lbnVcIixcbiAgICAgICAgICAgIGlkOiBcInBvcnRfY21cIixcbiAgICAgICAgICAgIGRhdGE6IFtcIktpbGxcIl1cbiAgICAgICAgfSkuYXR0YWNoVG8oc2VsZi5wb3J0c1RhYmxlKTtcblxuICAgICAgICAkJChcInBvcnRfY21cIikuYXR0YWNoRXZlbnQoXCJvbk1lbnVJdGVtQ2xpY2tcIiwgZnVuY3Rpb24gKGlkKSB7XG4gICAgICAgICAgICBpZiAoaWQgPT0gXCJLaWxsXCIpIHtcbiAgICAgICAgICAgICAgICBzZWxmLmtpbGxQcm9jZXNzKHNlbGYucG9ydHNUYWJsZS5nZXRTZWxlY3RlZElkKHRydWUpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuXG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zb3VyY2VzL3ZpZXdzL2Rhc2gvcnVubmluZ1BvcnRzLmpzIiwiaW1wb3J0IHsgSmV0VmlldywgcGx1Z2lucyB9IGZyb20gXCJ3ZWJpeC1qZXRcIjtcbmltcG9ydCB7IGF1dGggfSBmcm9tIFwiLi4vc2VydmljZXMvYXV0aFwiO1xuXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFRvcFZpZXcgZXh0ZW5kcyBKZXRWaWV3IHtcbiAgICBjb25maWcoKSB7XG4gICAgICAgIGNvbnN0IGhlYWRlciA9IHtcbiAgICAgICAgICAgIGNvbHM6IFtcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIGlkOiBcImJ1dHRvbl9oaWRlX21lbnVcIixcbiAgICAgICAgICAgICAgICAgICAgdmlldzogXCJpY29uXCIsIGljb246IFwibWRpIG1kaS1tZW51XCIsXG4gICAgICAgICAgICAgICAgICAgIGNzczogXCJjdXN0b21fZGFya1wiLCBoZWlnaHQ6IDU4LFxuICAgICAgICAgICAgICAgICAgICBjbGljazogdGhpcy5oaWRlTWVudSxcbiAgICAgICAgICAgICAgICAgICAgdG9vbHRpcDogXCJIaWRlIG1lbnVcIixcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgaWQ6IFwiaGVhZGVyXCIsXG4gICAgICAgICAgICAgICAgICAgIHR5cGU6IFwiaGVhZGVyXCIsXG4gICAgICAgICAgICAgICAgICAgIGNzczogXCJjdXN0b21fZGFya1wiLCBoZWlnaHQ6IDU4LFxuICAgICAgICAgICAgICAgICAgICB0ZW1wbGF0ZTogXCJBRE1JTlwiLFxuICAgICAgICAgICAgICAgICAgICBib3JkZXJsZXNzOiB0cnVlLFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBdXG4gICAgICAgIH07XG5cbiAgICAgICAgY29uc3Qgc2lkZWJhckRhdGEgPSBbe1xuICAgICAgICAgICAgaWQ6IFwiZGFzaFwiLFxuICAgICAgICAgICAgdmFsdWU6IFwiRGFzaGJvYXJkXCIsXG4gICAgICAgICAgICBpY29uOiBcIm1kaSBtZGktdmlldy1kYXNoYm9hcmRcIlxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgICBpZDogXCJ3aWtpc1wiLFxuICAgICAgICAgICAgdmFsdWU6IFwiUGFja2FnZXMgRG9jc1wiLFxuICAgICAgICAgICAgaWNvbjogXCJtZGkgbWRpLW5ld3NwYXBlclwiXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICAgIGlkOiBcImFsZXJ0c1wiLFxuICAgICAgICAgICAgdmFsdWU6IFwiQWxlcnRzXCIsXG4gICAgICAgICAgICBpY29uOiBcIm1kaSBtZGktYmVsbC1hbGVydFwiXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICAgIGlkOiBcImxvZ3NcIixcbiAgICAgICAgICAgIHZhbHVlOiBcIkxvZ3NcIixcbiAgICAgICAgICAgIGljb246IFwibWRpIG1kaS1oaXN0b3J5XCJcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgICAgaWQ6IFwibXlqb2JzX21haW5cIixcbiAgICAgICAgICAgIHZhbHVlOiBcIk15IGpvYnNcIixcbiAgICAgICAgICAgIGljb246IFwibWRpIG1kaS1hbmltYXRpb24tcGxheVwiLFxuICAgICAgICAgICAgZGF0YTogW3tcbiAgICAgICAgICAgICAgICBpZDogXCJteWpvYnNcIixcbiAgICAgICAgICAgICAgICBpY29uOiBcIm1kaSBtZGktYm9vay1vcGVuXCIsXG4gICAgICAgICAgICAgICAgdmFsdWU6IFwiSm9ic1wiXG4gICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgaWQ6IFwid29ya2Vyc1wiLFxuICAgICAgICAgICAgICAgIGljb246IFwibWRpIG1kaS13b3JrZXJcIixcbiAgICAgICAgICAgICAgICB2YWx1ZTogXCJXb3JrZXJzXCJcbiAgICAgICAgICAgIH1dXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICAgIGlkOiBcInRmd2lraXNfbWFpblwiLFxuICAgICAgICAgICAgdmFsdWU6IFwiVEYgV2lraXNcIixcbiAgICAgICAgICAgIGljb246IFwibWRpIG1kaS1hbmltYXRpb24tcGxheVwiLFxuICAgICAgICAgICAgZGF0YTogW3tcbiAgICAgICAgICAgICAgICBpZDogXCJ0ZmdyaWRzZGtcIixcbiAgICAgICAgICAgICAgICBpY29uOiBcIm1kaSBtZGktYm9vay1vcGVuXCIsXG4gICAgICAgICAgICAgICAgdmFsdWU6IFwiVEZHcmlkU0RLXCJcbiAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICBpZDogXCJ0aHJlZWZvbGRcIixcbiAgICAgICAgICAgICAgICBpY29uOiBcIm1kaSBtZGktd29ya2VyXCIsXG4gICAgICAgICAgICAgICAgdmFsdWU6IFwiVGhyZWVmb2xkXCJcbiAgICAgICAgICAgIH1dXG4gICAgICAgIH0sXG5cbiAgICAgICAge1xuICAgICAgICAgICAgaWQ6IFwicGFja2FnZXNcIixcbiAgICAgICAgICAgIHZhbHVlOiBcIlBhY2thZ2VzXCIsXG4gICAgICAgICAgICBpY29uOiBcIm1kaSBtZGktcGFja2FnZVwiXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICAgIGlkOiBcImRlcGxveWVkU29sdXRpb25zXCIsXG4gICAgICAgICAgICB2YWx1ZTogXCJEZXBsb3llZCBTb2x1dGlvbnNcIixcbiAgICAgICAgICAgIGljb246IFwibWRpIG1kaS1hbmltYXRpb24tcGxheVwiXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICAgIGlkOiBcInNvbHV0aW9uc1wiLFxuICAgICAgICAgICAgdmFsdWU6IFwiU29sdXRpb25zXCIsXG4gICAgICAgICAgICBpY29uOiBcIm1kaSBtZGktYW5pbWF0aW9uLXBsYXlcIixcbiAgICAgICAgICAgIGRhdGE6IFt7XG4gICAgICAgICAgICAgICAgaWQ6IFwibmV0d29ya1wiLFxuICAgICAgICAgICAgICAgIHZhbHVlOiAnPHNwYW4+PGltZyBjbGFzcz1cInNvbHV0aW9ucy1pY29uXCIgc3JjPVwic3RhdGljL2ltZy9uZXR3b3JrLnBuZ1wiLz5OZXR3b3JrPC9zcGFuPidcbiAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICBpZDogXCJ1YnVudHVcIixcbiAgICAgICAgICAgICAgICB2YWx1ZTogJzxzcGFuPjxpbWcgY2xhc3M9XCJzb2x1dGlvbnMtaWNvblwiIHNyYz1cInN0YXRpYy9pbWcvdWJ1bnR1LnBuZ1wiLz5VYnVudHU8L3NwYW4+J1xuICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIGlkOiBcImZsaXN0XCIsXG4gICAgICAgICAgICAgICAgdmFsdWU6ICc8c3Bhbj48aW1nIGNsYXNzPVwic29sdXRpb25zLWljb25cIiBzcmM9XCJzdGF0aWMvaW1nL2ZsaXN0LnBuZ1wiLz5HZW5lcmljIGZsaXN0PC9zcGFuPidcbiAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICBpZDogXCJtaW5pb1wiLFxuICAgICAgICAgICAgICAgIHZhbHVlOiAnPHNwYW4+PGltZyBjbGFzcz1cInNvbHV0aW9ucy1pY29uXCIgc3JjPVwic3RhdGljL2ltZy9taW5pby5wbmdcIi8+TWluaW8gLyBTMzwvc3Bhbj4nXG4gICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgaWQ6IFwiazhzX2NsdXN0ZXJcIixcbiAgICAgICAgICAgICAgICB2YWx1ZTogJzxzcGFuPjxpbWcgY2xhc3M9XCJzb2x1dGlvbnMtaWNvblwiIHNyYz1cInN0YXRpYy9pbWcvazhzLnBuZ1wiLz5LdWJlcm5ldGVzIENsdXN0ZXI8L3NwYW4+J1xuICAgICAgICAgICAgfSAsIHtcbiAgICAgICAgICAgICAgICBpZDogXCJkb21haW5fZGVsZWdhdGlvblwiLFxuICAgICAgICAgICAgICAgIHZhbHVlOiAnRG9tYWluIERlbGFnYXRpb24nLFxuICAgICAgICAgICAgICAgIGljb246ICdtZGkgbWRpLWRucydcbiAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICBpZDogXCJzb2x1dGlvbl9leHBvc2VcIixcbiAgICAgICAgICAgICAgICB2YWx1ZTogJ1NvbHV0aW9uIGV4cG9zZScsXG4gICAgICAgICAgICAgICAgaWNvbjogJ21kaSBtZGktd2FuJ1xuICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIGlkOiBcImdhdGV3YXlfNHRvNlwiLFxuICAgICAgICAgICAgICAgIHZhbHVlOiAnNCB0byA2IEdhdGV3YXknLFxuICAgICAgICAgICAgICAgIGljb246ICdtZGkgbWRpLWlwLW5ldHdvcmsnXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBdXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICAgIGlkOiBcIndhbGxldHNNYW5hZ2VyXCIsXG4gICAgICAgICAgICB2YWx1ZTogXCJXYWxsZXRzIE1hbmFnZXJcIixcbiAgICAgICAgICAgIGljb246IFwibWRpIG1kaS13YWxsZXRcIlxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgICBpZDogXCJjYXBhY2l0eVwiLFxuICAgICAgICAgICAgdmFsdWU6IFwiQ2FwYWNpdHlcIixcbiAgICAgICAgICAgIGljb246IFwibWRpIG1kaS1zZXJ2ZXJcIlxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgICBpZDogXCJmYXJtbWFuYWdlbWVudFwiLFxuICAgICAgICAgICAgdmFsdWU6IFwiRmFybSBNYW5hZ2VtZW50XCIsXG4gICAgICAgICAgICBpY29uOiBcIm1kaSBtZGktc2VydmVyXCJcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgICAgaWQ6IFwic2RrZXhhbXBsZXNcIixcbiAgICAgICAgICAgIHZhbHVlOiBcIlNESyBFeGFtcGxlc1wiLFxuICAgICAgICAgICAgaWNvbjogXCJtZGkgbWRpLWZpbGVcIlxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgICBpZDogXCJjb2Rlc2VydmVyXCIsXG4gICAgICAgICAgICB2YWx1ZTogXCJDb2Rlc2VydmVyXCIsXG4gICAgICAgICAgICBpY29uOiBcIm1kaSBtZGktY29kZS10YWdzXCJcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgICAgaWQ6IFwianVweXRlclwiLFxuICAgICAgICAgICAgdmFsdWU6IFwiVEYgU2ltdWxhdG9yXCIsXG4gICAgICAgICAgICBpY29uOiBcIm1kaSBtZGktcGxheVwiXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICAgIGlkOiBcInNldHRpbmdzXCIsXG4gICAgICAgICAgICB2YWx1ZTogXCJTZXR0aW5nc1wiLFxuICAgICAgICAgICAgaWNvbjogXCJtZGkgbWRpLXNldHRpbmdzXCJcbiAgICAgICAgfSxcbiAgICAgICAgXVxuXG4gICAgICAgIGNvbnN0IHJlc3BvbnNlID0gd2ViaXguYWpheCgpLnN5bmMoKS5nZXQoXCIvemVyb2JvdC9hZG1pbi9hY3RvcnMvcGFja2FnZV9tYW5hZ2VyL3BhY2thZ2VzX2xpc3RcIiwgeyBoYXNfZnJvbnRlbmRfYXJnczogdHJ1ZSwgc3RhdHVzOiBcImluc3RhbGxlZFwiIH0pO1xuICAgICAgICBsZXQgcGFja2FnZXM7XG5cbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIHBhY2thZ2VzID0gSlNPTi5wYXJzZShyZXNwb25zZS5yZXNwb25zZVRleHQpLnBhY2thZ2VzO1xuICAgICAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICAgICAgcGFja2FnZXMgPSBbXTtcbiAgICAgICAgfVxuXG4gICAgICAgIGZvciAoY29uc3QgcCBvZiBwYWNrYWdlcykge1xuICAgICAgICAgICAgc2lkZWJhckRhdGEucHVzaChwLmZyb250ZW5kX2FyZ3MpO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3Qgc2lkZWJhciA9IHtcbiAgICAgICAgICAgIGxvY2FsSWQ6IFwibWVudVwiLFxuICAgICAgICAgICAgdmlldzogXCJzaWRlYmFyXCIsXG4gICAgICAgICAgICBjc3M6IFwid2ViaXhfZGFya1wiLFxuICAgICAgICAgICAgd2lkdGg6IDIwMCxcbiAgICAgICAgICAgIGRhdGE6IHNpZGViYXJEYXRhLFxuICAgICAgICB9O1xuXG4gICAgICAgIGNvbnN0IHRvb2xiYXIgPSB7XG4gICAgICAgICAgICB2aWV3OiBcInRvb2xiYXJcIixcbiAgICAgICAgICAgIHBhZGRpbmc6IDksXG4gICAgICAgICAgICBoZWlnaHQ6IDU4LFxuICAgICAgICAgICAgY29sczogW3tcbiAgICAgICAgICAgICAgICBpZDogXCJidXR0b25fc2hvd19tZW51XCIsXG4gICAgICAgICAgICAgICAgdmlldzogXCJpY29uXCIsXG4gICAgICAgICAgICAgICAgaWNvbjogXCJtZGkgbWRpLW1lbnVcIixcbiAgICAgICAgICAgICAgICBjbGljazogdGhpcy5zaG93TWVudSxcbiAgICAgICAgICAgICAgICBoaWRkZW46IHRydWUsIC8vIGhpZGRlbiBieSBkZWZhdWx0XG4gICAgICAgICAgICAgICAgdG9vbHRpcDogXCJTaG93IG1lbnVcIixcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgdmlldzogXCJ0ZW1wbGF0ZVwiLFxuICAgICAgICAgICAgICAgIHRlbXBsYXRlOiBgPGltZyBjbGFzcz1cIndlYml4X2ljb25cIiBzcmM9XCJzdGF0aWMvaW1nLzNib3QucG5nXCIvPmAsXG4gICAgICAgICAgICAgICAgYm9yZGVybGVzczogdHJ1ZSxcbiAgICAgICAgICAgICAgICBoZWlnaHQ6IDQwLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBpZDogXCJ1c2VybmFtZV9sYWJlbFwiLFxuICAgICAgICAgICAgICAgIHZpZXc6IFwibGFiZWxcIixcbiAgICAgICAgICAgICAgICBsYWJlbDogXCJ1c2VybmFtZVwiLFxuICAgICAgICAgICAgICAgIGJvcmRlcmxlc3M6IHRydWUsXG4gICAgICAgICAgICAgICAgYWxpZ246IFwicmlnaHRcIixcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgaWQ6IFwidXNlcl9pY29uXCIsXG4gICAgICAgICAgICAgICAgdmlldzogXCJpY29uXCIsXG4gICAgICAgICAgICAgICAgaWNvbjogXCJtZGkgbWRpLWFjY291bnQtY2lyY2xlXCIsXG4gICAgICAgICAgICAgICAgYm9yZGVybGVzczogdHJ1ZSxcbiAgICAgICAgICAgICAgICBwb3B1cDogXCJ1c2VyX21lbnVcIlxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgXVxuICAgICAgICB9O1xuXG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICB0eXBlOiBcImNsZWFuXCIsXG4gICAgICAgICAgICBjb2xzOiBbe1xuICAgICAgICAgICAgICAgIHJvd3M6IFtoZWFkZXIsIHNpZGViYXJdXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHJvd3M6IFtcbiAgICAgICAgICAgICAgICAgICAgdG9vbGJhcixcbiAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgJHN1YnZpZXc6IHRydWVcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIF1cbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICBzaG93TWVudSgpIHtcbiAgICAgICAgdGhpcy4kc2NvcGUubWVudS5zaG93KCk7XG4gICAgICAgIHRoaXMuJHNjb3BlLmhlYWRlci5zaG93KCk7XG4gICAgICAgIHRoaXMuJHNjb3BlLmJ1dHRvbkhpZGVNZW51LnNob3coKTtcblxuICAgICAgICB0aGlzLiRzY29wZS5idXR0b25TaG93TWVudS5oaWRlKCk7XG4gICAgfVxuXG4gICAgaGlkZU1lbnUoKSB7XG4gICAgICAgIHRoaXMuJHNjb3BlLm1lbnUuaGlkZSgpO1xuICAgICAgICB0aGlzLiRzY29wZS5oZWFkZXIuaGlkZSgpO1xuICAgICAgICB0aGlzLiRzY29wZS5idXR0b25IaWRlTWVudS5oaWRlKCk7XG5cbiAgICAgICAgdGhpcy4kc2NvcGUuYnV0dG9uU2hvd01lbnUuc2hvdygpO1xuICAgIH1cblxuICAgIGluaXQoKSB7XG4gICAgICAgIHZhciBzZWxmID0gdGhpcztcblxuICAgICAgICB0aGlzLnVzZShwbHVnaW5zLk1lbnUsIHtcbiAgICAgICAgICAgIGlkOiBcIm1lbnVcIixcbiAgICAgICAgICAgIHVybHM6IHtcbiAgICAgICAgICAgICAgICBteWpvYnM6IFwibXlqb2JzLmpvYnNcIixcbiAgICAgICAgICAgICAgICB3b3JrZXJzOiBcIm15am9icy53b3JrZXJzXCIsXG4gICAgICAgICAgICAgICAgdGZncmlkc2RrOiBcInRmd2lraXMudGZncmlkc2RrXCIsXG4gICAgICAgICAgICAgICAgdGhyZWVmb2xkOiBcInRmd2lraXMudGhyZWVmb2xkXCIsXG4gICAgICAgICAgICAgICAgdWJ1bnR1OiBcInNvbHV0aW9ucy5jaGF0Zmxvdz9hdXRob3I9dGZncmlkX3NvbHV0aW9ucyZwYWNrYWdlPXRmZ3JpZF9zb2x1dGlvbnMmY2hhdD11YnVudHVfZGVwbG95XCIsXG4gICAgICAgICAgICAgICAgbmV0d29yazogXCJzb2x1dGlvbnMuY2hhdGZsb3c/YXV0aG9yPXRmZ3JpZF9zb2x1dGlvbnMmcGFja2FnZT10ZmdyaWRfc29sdXRpb25zJmNoYXQ9bmV0d29ya19kZXBsb3lcIixcbiAgICAgICAgICAgICAgICBmbGlzdDogXCJzb2x1dGlvbnMuY2hhdGZsb3c/YXV0aG9yPXRmZ3JpZF9zb2x1dGlvbnMmcGFja2FnZT10ZmdyaWRfc29sdXRpb25zJmNoYXQ9eW91cl9mbGlzdFwiLFxuICAgICAgICAgICAgICAgIG1pbmlvOiBcInNvbHV0aW9ucy5jaGF0Zmxvdz9hdXRob3I9dGZncmlkX3NvbHV0aW9ucyZwYWNrYWdlPXRmZ3JpZF9zb2x1dGlvbnMmY2hhdD1taW5pb19kZXBsb3lcIixcbiAgICAgICAgICAgICAgICBrOHNfY2x1c3RlcjogXCJzb2x1dGlvbnMuY2hhdGZsb3c/YXV0aG9yPXRmZ3JpZF9zb2x1dGlvbnMmcGFja2FnZT10ZmdyaWRfc29sdXRpb25zJmNoYXQ9a3ViZXJuZXRlc19jbHVzdGVyX2RlcGxveVwiLFxuICAgICAgICAgICAgICAgIHRocmVlYm90OiBcInNvbHV0aW9ucy5jaGF0Zmxvdz9hdXRob3I9dGZncmlkJnBhY2thZ2U9dGhyZWVib3RfcHJvdmlzaW9uaW5nJmNoYXQ9dGhyZWVib3RfcmVzZXJ2YXRpb25cIixcbiAgICAgICAgICAgICAgICBkb21haW5fZGVsZWdhdGlvbjogXCJzb2x1dGlvbnMuY2hhdGZsb3c/YXV0aG9yPXRmZ3JpZF9zb2x1dGlvbnMmcGFja2FnZT10ZmdyaWRfc29sdXRpb25zJmNoYXQ9ZG9tYWluX2RlbGVnYXRpb25cIixcbiAgICAgICAgICAgICAgICBnYXRld2F5XzR0bzY6IFwic29sdXRpb25zLmNoYXRmbG93P2F1dGhvcj10ZmdyaWRfc29sdXRpb25zJnBhY2thZ2U9dGZncmlkX3NvbHV0aW9ucyZjaGF0PWZvdXJfdG9fc2l4X2dhdGV3YXlcIixcbiAgICAgICAgICAgICAgICBzb2x1dGlvbl9leHBvc2U6IFwic29sdXRpb25zLmNoYXRmbG93P2F1dGhvcj10ZmdyaWRfc29sdXRpb25zJnBhY2thZ2U9dGZncmlkX3NvbHV0aW9ucyZjaGF0PXNvbHV0aW9uX2V4cG9zZVwiLFxuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICB0aGlzLm1lbnUgPSB0aGlzLiQkKFwibWVudVwiKTtcbiAgICAgICAgdGhpcy5oZWFkZXIgPSB0aGlzLiQkKFwiaGVhZGVyXCIpO1xuXG4gICAgICAgIHRoaXMuYnV0dG9uU2hvd01lbnUgPSB0aGlzLiQkKFwiYnV0dG9uX3Nob3dfbWVudVwiKTtcbiAgICAgICAgdGhpcy5idXR0b25IaWRlTWVudSA9IHRoaXMuJCQoXCJidXR0b25faGlkZV9tZW51XCIpO1xuXG5cbiAgICAgICAgdGhpcy53ZWJpeC51aSh7XG4gICAgICAgICAgICB2aWV3OiBcInN1Ym1lbnVcIixcbiAgICAgICAgICAgIGlkOiBcInVzZXJfbWVudVwiLFxuICAgICAgICAgICAgYXV0b3dpZHRoOiB0cnVlLFxuICAgICAgICAgICAgZGF0YTogW11cbiAgICAgICAgfSk7XG5cbiAgICAgICAgdGhpcy51c2VyTWVudSA9ICQkKFwidXNlcl9tZW51XCIpO1xuICAgICAgICB0aGlzLnVzZXJNZW51LmF0dGFjaEV2ZW50KFwib25JdGVtQ2xpY2tcIiwgZnVuY3Rpb24gKGlkLCBlLCBub2RlKSB7XG4gICAgICAgICAgICBpZiAoaWQgPT0gXCJsb2dvdXRcIikge1xuICAgICAgICAgICAgICAgIGF1dGgubG9nb3V0KCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHRoaXMudXNlcm5hbWVMYWJlbCA9ICQkKFwidXNlcm5hbWVfbGFiZWxcIik7XG5cbiAgICAgICAgYXV0aC5nZXRDdXJyZW50VXNlcigpLnRoZW4oZGF0YSA9PiB7XG4gICAgICAgICAgICBjb25zdCBpbmZvID0gZGF0YS5qc29uKClcbiAgICAgICAgICAgIGxldCB1c2VybmFtZSA9IGluZm8udXNlcm5hbWU7XG5cbiAgICAgICAgICAgIGlmIChpbmZvLmRldm1vZGUpIHtcbiAgICAgICAgICAgICAgICB1c2VybmFtZSArPSBcIiBbZGV2ZWxvcG1lbnRdXCJcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgc2VsZi51c2VybmFtZUxhYmVsLmNvbmZpZy5sYWJlbCA9IHVzZXJuYW1lO1xuICAgICAgICAgICAgc2VsZi51c2VybmFtZUxhYmVsLmNvbmZpZy53aWR0aCA9IHdlYml4Lmh0bWwuZ2V0VGV4dFNpemUodXNlcm5hbWUpICsgMTA7XG4gICAgICAgICAgICBzZWxmLnVzZXJuYW1lTGFiZWwucmVmcmVzaCgpO1xuXG4gICAgICAgICAgICBzZWxmLnVzZXJNZW51LmFkZCh7IGlkOiAnZW1haWwnLCB2YWx1ZTogaW5mby5lbWFpbCB9KVxuICAgICAgICAgICAgc2VsZi51c2VyTWVudS5hZGQoeyBpZDogJ2xvZ291dCcsIHZhbHVlOiBcIkxvZ291dFwiIH0pXG4gICAgICAgIH0pLmNhdGNoKCgpID0+IHtcbiAgICAgICAgICAgIGF1dGgubG9nb3V0KCk7XG4gICAgICAgIH0pO1xuICAgIH1cblxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc291cmNlcy92aWV3cy9tYWluLmpzIiwiaW1wb3J0IHsgSmV0VmlldyB9IGZyb20gXCJ3ZWJpeC1qZXRcIjtcblxuaW1wb3J0IHsgZGF0ZUZvcm1hdHRlciB9IGZyb20gXCIuLi8uLi9jb21tb24vZm9ybWF0dGVyc1wiO1xuaW1wb3J0IHsgbXlqb2JzIH0gZnJvbSBcIi4uLy4uL3NlcnZpY2VzL215am9ic1wiO1xuaW1wb3J0IEpvYkRldGFpbHNWaWV3IGZyb20gXCIuL2pvYkRldGFpbHNcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgSm9ic1ZpZXcgZXh0ZW5kcyBKZXRWaWV3IHtcbiAgICBjb25maWcoKSB7XG4gICAgICAgIGNvbnN0IHZpZXcgPSB7XG4gICAgICAgICAgICB2aWV3OiBcImRhdGF0YWJsZVwiLFxuICAgICAgICAgICAgaWQ6IFwiam9ic190YWJsZVwiLFxuICAgICAgICAgICAgcmVzaXplQ29sdW1uOiB0cnVlLFxuICAgICAgICAgICAgc2VsZWN0OiB0cnVlLFxuICAgICAgICAgICAgbXVsdGlzZWxlY3Q6IHRydWUsXG4gICAgICAgICAgICBjc3M6IFwid2ViaXhfaGVhZGVyX2JvcmRlciB3ZWJpeF9kYXRhX2JvcmRlclwiLFxuICAgICAgICAgICAgY29sdW1uczogW3tcbiAgICAgICAgICAgICAgICBpZDogXCJpbmRleFwiLFxuICAgICAgICAgICAgICAgIGhlYWRlcjogXCIjXCIsXG4gICAgICAgICAgICAgICAgc29ydDogXCJpbnRcIixcbiAgICAgICAgICAgICAgICBhdXRvd2lkdGg6IHRydWUsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGlkOiBcImNhdGVnb3J5XCIsXG4gICAgICAgICAgICAgICAgaGVhZGVyOiBcIkNhdGVnb3J5XCIsXG4gICAgICAgICAgICAgICAgc29ydDogXCJzdHJpbmdcIlxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBpZDogXCJ0aW1lX3N0YXJ0XCIsXG4gICAgICAgICAgICAgICAgaGVhZGVyOiBcIlN0YXJ0IHRpbWVcIixcbiAgICAgICAgICAgICAgICBzb3J0OiBcImRhdGVcIixcbiAgICAgICAgICAgICAgICBmb3JtYXQ6IGRhdGVGb3JtYXR0ZXIsXG4gICAgICAgICAgICAgICAgd2lkdGg6IDIwMFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBpZDogXCJ0aW1lX3N0b3BcIixcbiAgICAgICAgICAgICAgICBoZWFkZXI6IFwiU3RvcCB0aW1lXCIsXG4gICAgICAgICAgICAgICAgc29ydDogXCJkYXRlXCIsXG4gICAgICAgICAgICAgICAgZm9ybWF0OiBkYXRlRm9ybWF0dGVyLFxuICAgICAgICAgICAgICAgIHdpZHRoOiAyMDBcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgaWQ6IFwidGltZW91dFwiLFxuICAgICAgICAgICAgICAgIGhlYWRlcjogXCJUaW1lb3V0XCIsXG4gICAgICAgICAgICAgICAgc29ydDogXCJpbnRcIlxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBpZDogXCJhY3Rpb25faWRcIixcbiAgICAgICAgICAgICAgICBoZWFkZXI6IFwiQWN0aW9uXCIsXG4gICAgICAgICAgICAgICAgc29ydDogXCJzdHJpbmdcIlxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBpZDogXCJrd2FyZ3NcIixcbiAgICAgICAgICAgICAgICBoZWFkZXI6IFwiQXJndW1lbnRzXCIsXG4gICAgICAgICAgICAgICAgc29ydDogXCJzdHJpbmdcIixcbiAgICAgICAgICAgICAgICBmb3JtYXQ6IEpTT04uc3RyaW5naWZ5XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGlkOiBcInJlc3VsdFwiLFxuICAgICAgICAgICAgICAgIGhlYWRlcjogW1xuICAgICAgICAgICAgICAgICAgICBcIlJlc3VsdFwiLFxuICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb250ZW50OiBcInRleHRGaWx0ZXJcIlxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICBzb3J0OiBcInN0cmluZ1wiLFxuICAgICAgICAgICAgICAgIGZvcm1hdDogSlNPTi5zdHJpbmdpZnksXG4gICAgICAgICAgICB9XSxcbiAgICAgICAgICAgIHNjaGVtZToge1xuICAgICAgICAgICAgICAgICRpbml0OiBmdW5jdGlvbiAob2JqKSB7XG4gICAgICAgICAgICAgICAgICAgIG9iai5pbmRleCA9IHRoaXMuY291bnQoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICB9O1xuXG4gICAgICAgIHJldHVybiB2aWV3O1xuICAgIH1cblxuICAgIGluaXQodmlldykge1xuICAgICAgICBjb25zdCBzZWxmID0gdGhpc1xuICAgICAgICBzZWxmLmpvYkRldGFpbHNWaWV3ID0gc2VsZi51aShKb2JEZXRhaWxzVmlldyk7XG4gICAgICAgIHNlbGYuam9iVGFibGUgPSB0aGlzLiQkKFwiam9ic190YWJsZVwiKTtcbiAgICAgICAgXG4gICAgICAgIG15am9icy5saXN0Sm9icygpLnRoZW4oZGF0YSA9PiB7XG4gICAgICAgICAgICB2aWV3LnBhcnNlKGRhdGEpO1xuICAgICAgICB9KTtcbiAgICAgICAgc2VsZi5qb2JUYWJsZS5hdHRhY2hFdmVudChcIm9uSXRlbURibENsaWNrXCIsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIGxldCBpZCA9IHNlbGYuam9iVGFibGUuZ2V0U2VsZWN0ZWRJZCgpXG4gICAgICAgICAgICBsZXQgaXRlbSA9IHNlbGYuam9iVGFibGUuZ2V0SXRlbShpZClcbiAgICAgICAgICAgIHNlbGYuam9iRGV0YWlsc1ZpZXcuc2hvd0pvYkRldGFpbHMoaXRlbSk7XG4gICAgICAgIH0pO1xuICAgIH1cbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NvdXJjZXMvdmlld3MvbXlqb2JzL2pvYnMuanMiLCJpbXBvcnQgeyBTZXJ2aWNlIH0gZnJvbSBcIi4uL2NvbW1vbi9hcGlcIjtcblxuY29uc3QgQkFTRV9VUkwgPSBcIi96ZXJvYm90L2FkbWluL2FjdG9ycy9teWpvYnNcIjtcblxuY2xhc3MgTXlqb2JzU2VydmljZSBleHRlbmRzIFNlcnZpY2Uge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICBzdXBlcihCQVNFX1VSTCk7XG4gICAgfVxuXG4gICAgbGlzdEpvYnMoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmdldENhbGwoXCJsaXN0X2pvYnNcIik7XG4gICAgfVxuXG4gICAgbGlzdFdvcmtlcnMoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmdldENhbGwoXCJsaXN0X3dvcmtlcnNcIik7XG4gICAgfVxufVxuXG5leHBvcnQgY29uc3QgbXlqb2JzID0gbmV3IE15am9ic1NlcnZpY2UoKTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NvdXJjZXMvc2VydmljZXMvbXlqb2JzLmpzIiwiaW1wb3J0IHsgSmV0VmlldyB9IGZyb20gXCJ3ZWJpeC1qZXRcIjtcblxuaW1wb3J0IHsgZGF0ZUZvcm1hdHRlciB9IGZyb20gXCIuLi8uLi9jb21tb24vZm9ybWF0dGVyc1wiO1xuaW1wb3J0IHsgbXlqb2JzIH0gZnJvbSBcIi4uLy4uL3NlcnZpY2VzL215am9ic1wiO1xuaW1wb3J0IFdvcmtlckRldGFpbHNWaWV3IGZyb20gXCIuL3dvcmtlckRldGFpbHNcIlxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBKb2JzVmlldyBleHRlbmRzIEpldFZpZXcge1xuICAgIGNvbmZpZygpIHtcbiAgICAgICAgY29uc3QgdmlldyA9IHtcbiAgICAgICAgICAgIHZpZXc6IFwiZGF0YXRhYmxlXCIsXG4gICAgICAgICAgICBpZDogXCJ3b3JrZXJzX3RhYmxlXCIsXG4gICAgICAgICAgICByZXNpemVDb2x1bW46IHRydWUsXG4gICAgICAgICAgICBzZWxlY3Q6IHRydWUsXG4gICAgICAgICAgICBtdWx0aXNlbGVjdDogdHJ1ZSxcbiAgICAgICAgICAgIGNzczogXCJ3ZWJpeF9oZWFkZXJfYm9yZGVyIHdlYml4X2RhdGFfYm9yZGVyXCIsXG4gICAgICAgICAgICBjb2x1bW5zOiBbe1xuICAgICAgICAgICAgICAgIGlkOiBcImluZGV4XCIsXG4gICAgICAgICAgICAgICAgaGVhZGVyOiBcIiNcIixcbiAgICAgICAgICAgICAgICBzb3J0OiBcImludFwiLFxuICAgICAgICAgICAgICAgIGF1dG93aWR0aDogdHJ1ZSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgaWQ6IFwic3RhdGVcIixcbiAgICAgICAgICAgICAgICBoZWFkZXI6IFwiU3RhdGVcIixcbiAgICAgICAgICAgICAgICBzb3J0OiBcInN0cmluZ1wiXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGlkOiBcImhhbHRcIixcbiAgICAgICAgICAgICAgICBoZWFkZXI6IFwiSGFsdGVkXCIsXG4gICAgICAgICAgICAgICAgc29ydDogXCJzdHJpbmdcIixcbiAgICAgICAgICAgICAgICBmb3JtYXQ6IGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdmFsdWUgPyAnWWVzJyA6ICdObyc7XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgaWQ6IFwicGlkXCIsXG4gICAgICAgICAgICAgICAgaGVhZGVyOiBcIlBJRFwiLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBpZDogXCJjdXJyZW50X2pvYlwiLFxuICAgICAgICAgICAgICAgIGhlYWRlcjogXCJDdXJyZW50IGpvYlwiLFxuICAgICAgICAgICAgICAgIGZvcm1hdDogZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB2YWx1ZSA9PSAyMTQ3NDgzNjQ3ID8gJ04vQScgOiB2YWx1ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGlkOiBcImxhc3RfdXBkYXRlXCIsXG4gICAgICAgICAgICAgICAgaGVhZGVyOiBcIkxhc3QgdXBkYXRlXCIsXG4gICAgICAgICAgICAgICAgc29ydDogXCJkYXRlXCIsXG4gICAgICAgICAgICAgICAgZm9ybWF0OiBkYXRlRm9ybWF0dGVyLFxuICAgICAgICAgICAgICAgIHdpZHRoOiAyMDBcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgaWQ6IFwidGltZV9zdGFydFwiLFxuICAgICAgICAgICAgICAgIGhlYWRlcjogXCJTdGFydCB0aW1lXCIsXG4gICAgICAgICAgICAgICAgc29ydDogXCJkYXRlXCIsXG4gICAgICAgICAgICAgICAgZm9ybWF0OiBkYXRlRm9ybWF0dGVyLFxuICAgICAgICAgICAgICAgIHdpZHRoOiAyMDBcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgaWQ6IFwidGltZW91dFwiLFxuICAgICAgICAgICAgICAgIGhlYWRlcjogXCJUaW1lb3V0XCIsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGlkOiBcInR5cGVcIixcbiAgICAgICAgICAgICAgICBoZWFkZXI6IFwiVHlwZVwiLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBpZDogXCJlcnJvclwiLFxuICAgICAgICAgICAgICAgIGhlYWRlcjogXCJFcnJvclwiLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBpZDogXCJsb2dzXCIsXG4gICAgICAgICAgICAgICAgaGVhZGVyOiBcIkxvZ3NcIixcbiAgICAgICAgICAgICAgICBzb3J0OiBcInN0cmluZ1wiLFxuICAgICAgICAgICAgICAgIHdpZHRoOiAyMDAsXG4gICAgICAgICAgICAgICAgdGVtcGxhdGU6ZnVuY3Rpb24ob2JqKXsgXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBcIjxkaXYgY2xhc3M9J3dlYml4X2VsX2J1dHRvbic+PGJ1dHRvbiBjbGFzcz0nYnRuX3ZpZXcnPiBMb2dzIDwvYnV0dG9uPjwvZGl2PlwiO1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB9XSxcbiAgICAgICAgICAgIG9uQ2xpY2s6e1xuICAgICAgICAgICAgICAgIGJ0bl92aWV3OmZ1bmN0aW9uKGV2LCBpZCl7XG4gICAgICAgICAgICAgICAgICAgIHZhciBpdGVtID0gdGhpcy5nZXRJdGVtKGlkKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy4kc2NvcGUuc2hvdyhgL21haW4vbG9ncz9hcHBuYW1lPSR7aXRlbS5uYW1lfWApXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGF1dG9Db25maWc6IHRydWUsXG4gICAgICAgICAgICBzY2hlbWU6IHtcbiAgICAgICAgICAgICAgICAkaW5pdDogZnVuY3Rpb24gKG9iaikge1xuICAgICAgICAgICAgICAgICAgICBvYmouaW5kZXggPSB0aGlzLmNvdW50KCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgfTtcblxuICAgICAgICByZXR1cm4gdmlldztcbiAgICB9XG5cbiAgICBpbml0KHZpZXcpIHtcbiAgICAgICAgY29uc3Qgc2VsZiA9IHRoaXNcbiAgICAgICAgc2VsZi53b3JrZXJEZXRhaWxzVmlldyA9IHNlbGYudWkoV29ya2VyRGV0YWlsc1ZpZXcpO1xuXG4gICAgICAgIG15am9icy5saXN0V29ya2VycygpLnRoZW4oZGF0YSA9PiB7XG4gICAgICAgICAgICBsZXQgd29ya2VycyA9IGRhdGEuanNvbigpXG4gICAgICAgICAgICAvLyBtYXAgd29ya2VyIG5hbWUgZnJvbSB3MSB0byB3ZW9ya2Vyc18xIGZvciByZWRpcmVjdGlvbiB0byBsb2dzXG4gICAgICAgICAgICBmb3IgKGxldCBpIGluIHdvcmtlcnMpe1xuICAgICAgICAgICAgICAgIHdvcmtlcnNbaV1bJ25hbWUnXSA9IHdvcmtlcnNbaV1bJ25hbWUnXS5yZXBsYWNlKCd3Jywnd29ya2Vyc18nKVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdmlldy5wYXJzZSh3b3JrZXJzKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgc2VsZi53b3JrZXJUYWJsZSA9IHRoaXMuJCQoXCJ3b3JrZXJzX3RhYmxlXCIpO1xuXG4gICAgICAgIHNlbGYud29ya2VyVGFibGUuYXR0YWNoRXZlbnQoXCJvbkl0ZW1EYmxDbGlja1wiLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBsZXQgaWQgPSBzZWxmLndvcmtlclRhYmxlLmdldFNlbGVjdGVkSWQoKVxuICAgICAgICAgICAgbGV0IGl0ZW0gPSBzZWxmLndvcmtlclRhYmxlLmdldEl0ZW0oaWQpXG4gICAgICAgICAgICBsZXQgV29ya2VyRGF0YSA9IHtcbiAgICAgICAgICAgICAgICAnZGVidWcnOml0ZW1bJ2RlYnVnJ10udG9TdHJpbmcoKSxcbiAgICAgICAgICAgICAgICAnaGFsdCc6aXRlbVsnaGFsdCddLnRvU3RyaW5nKCksXG4gICAgICAgICAgICAgICAgJ2Vycm9yJzppdGVtWydlcnJvciddWydtZXNzYWdlJ10sXG4gICAgICAgICAgICAgICAgJ3BpZCc6aXRlbVsncGlkJ10sXG4gICAgICAgICAgICAgICAgJ2N1cnJlbnRfam9iJzppdGVtWydjdXJyZW50X2pvYiddID09IDIxNDc0ODM2NDcgPyAnTi9BJyA6IGl0ZW1bJ2N1cnJlbnRfam9iJ10sXG4gICAgICAgICAgICAgICAgJ25hbWUnOml0ZW1bJ25hbWUnXSxcbiAgICAgICAgICAgICAgICAnc3RhdGUnOml0ZW1bJ3N0YXRlJ10sXG4gICAgICAgICAgICAgICAgJ2xhc3RfdXBkYXRlJzpkYXRlRm9ybWF0dGVyKGl0ZW1bJ2xhc3RfdXBkYXRlJ10pLFxuICAgICAgICAgICAgICAgICd0aW1lX3N0YXJ0JzpkYXRlRm9ybWF0dGVyKGl0ZW1bJ3RpbWVfc3RhcnQnXSksXG4gICAgICAgICAgICAgICAgJ3RpbWVvdXQnOml0ZW1bJ3RpbWVvdXQnXSxcbiAgICAgICAgICAgICAgICAndHlwZSc6aXRlbVsndHlwZSddXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBzZWxmLndvcmtlckRldGFpbHNWaWV3LnNob3dXb3JrZXJEZXRhaWxzKFdvcmtlckRhdGEpO1xuICAgICAgICB9KTtcbiAgICB9XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zb3VyY2VzL3ZpZXdzL215am9icy93b3JrZXJzLmpzIiwiaW1wb3J0IHsgRXh0ZXJuYWxWaWV3IH0gZnJvbSBcIi4uL2V4dGVybmFsXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIENoYXRmbG93VmlldyBleHRlbmRzIEV4dGVybmFsVmlldyB7XG4gICAgY29uc3RydWN0b3IoYXBwLCBuYW1lKSB7XG4gICAgICAgIHN1cGVyKGFwcCwgbmFtZSk7XG5cbiAgICAgICAgdGhpcy5iYXNlR2l0VXJsID0gXCJodHRwczovL2dpdGh1Yi5jb20vdGhyZWVmb2xkdGVjaC9qdW1wc2NhbGVYX3RocmVlYm90L3RyZWUvZGV2ZWxvcG1lbnQvVGhyZWVCb3RQYWNrYWdlc1wiO1xuXG4gICAgfVxuXG4gICAgdXJsQ2hhbmdlKHZpZXcsIHVybCkge1xuICAgICAgICBjb25zdCBwYXJhbXMgPSB1cmxbMF0ucGFyYW1zO1xuICAgICAgICBpZiAoT2JqZWN0LmtleXMocGFyYW1zKS5sZW5ndGggIT09IDMpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IHBhY2thZ2VOYW1lID0gYCR7cGFyYW1zLmF1dGhvcn0uJHtwYXJhbXMucGFja2FnZX1gXG4gICAgICAgIGNvbnN0IHBhY2thZ2VVcmwgPSBwYWNrYWdlTmFtZS5yZXBsYWNlKFwiLlwiLCBcIi9cIik7XG5cbiAgICAgICAgdGhpcy50YXJnZXRVcmwgPSBgLyR7cGFja2FnZVVybH0vY2hhdC8ke3BhcmFtcy5jaGF0fT9ub2hlYWRlcj15ZXNgO1xuICAgICAgICB0aGlzLnJlcXVpcmVkUGFja2FnZXMgPSB7fVxuICAgICAgICB0aGlzLnJlcXVpcmVkUGFja2FnZXNbcGFja2FnZU5hbWVdID0gYCR7dGhpcy5iYXNlR2l0VXJsfS8ke3BhY2thZ2VVcmx9YDtcblxuICAgICAgICB0aGlzLmluaXQodmlldyk7XG4gICAgfVxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc291cmNlcy92aWV3cy9zb2x1dGlvbnMvY2hhdGZsb3cuanMiLCJpbXBvcnQgeyBFeHRlcm5hbFZpZXcgfSBmcm9tIFwiLi4vZXh0ZXJuYWxcIjtcbmltcG9ydCB7IGFkbWluIH0gZnJvbSBcIi4uLy4uL3NlcnZpY2VzL2FkbWluXCI7XG5cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVEZHcmlkU0RLV2lraSBleHRlbmRzIEV4dGVybmFsVmlldyB7XG4gICAgY29uc3RydWN0b3IoYXBwLCBuYW1lKSB7XG4gICAgICAgIHN1cGVyKGFwcCwgbmFtZSk7XG4gICAgfVxuXG4gICAgc2hvd0lmcmFtZSgpIHtcbiAgICAgICAgdGhpcy5leHRlcm5hbElmcmFtZS5zaG93KCk7XG4gICAgICAgIHRoaXMuZXh0ZXJuYWxJZnJhbWUuc2hvd1Byb2dyZXNzKHsgdHlwZTogXCJpY29uXCIgfSk7XG4gICAgICAgIHRoaXMuZXh0ZXJuYWxJZnJhbWUubG9hZChcImh0dHBzOi8vc2RrLnRocmVlZm9sZC5pb1wiKTtcbiAgICB9XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zb3VyY2VzL3ZpZXdzL3Rmd2lraXMvdGZncmlkc2RrLmpzIiwiaW1wb3J0IHsgRXh0ZXJuYWxWaWV3IH0gZnJvbSBcIi4uL2V4dGVybmFsXCI7XG5pbXBvcnQgeyBhZG1pbiB9IGZyb20gXCIuLi8uLi9zZXJ2aWNlcy9hZG1pblwiO1xuXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFRocmVlZm9sZFdpa2kgZXh0ZW5kcyBFeHRlcm5hbFZpZXcge1xuICAgIGNvbnN0cnVjdG9yKGFwcCwgbmFtZSkge1xuICAgICAgICBzdXBlcihhcHAsIG5hbWUpO1xuICAgIH1cblxuICAgIHNob3dJZnJhbWUoKSB7XG4gICAgICAgIHRoaXMuZXh0ZXJuYWxJZnJhbWUuc2hvdygpO1xuICAgICAgICB0aGlzLmV4dGVybmFsSWZyYW1lLnNob3dQcm9ncmVzcyh7IHR5cGU6IFwiaWNvblwiIH0pO1xuICAgICAgICB0aGlzLmV4dGVybmFsSWZyYW1lLmxvYWQoXCJodHRwczovL3dpa2kudGhyZWVmb2xkLmlvXCIpO1xuICAgIH1cbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NvdXJjZXMvdmlld3MvdGZ3aWtpcy90aHJlZWZvbGQuanMiLCJpbXBvcnQgeyBFeHRlcm5hbFZpZXcgfSBmcm9tIFwiLi4vZXh0ZXJuYWxcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgV2lraUV4dGVybmFsVmlldyBleHRlbmRzIEV4dGVybmFsVmlldyB7XG4gICAgY29uc3RydWN0b3IoYXBwLCBuYW1lKSB7XG4gICAgICAgIHN1cGVyKGFwcCwgbmFtZSk7XG5cbiAgICB9XG5cbiAgICB1cmxDaGFuZ2UodmlldywgdXJsKSB7XG4gICAgICAgIGNvbnN0IHBhcmFtcyA9IHVybFswXS5wYXJhbXM7XG4gICAgICAgIGlmIChPYmplY3Qua2V5cyhwYXJhbXMpLmxlbmd0aCAhPT0gMSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy50YXJnZXRVcmwgPSBgL3dpa2kvJHtwYXJhbXMubmFtZX1gO1xuICAgICAgICBcbiAgICAgICAgdGhpcy5pbml0KHZpZXcpO1xuICAgIH1cbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NvdXJjZXMvdmlld3Mvd2lraXMvdmlldy5qcyIsImltcG9ydCBcIi4vc3R5bGVzL2FwcC5jc3NcIjtcbmltcG9ydCB7SmV0QXBwfSBmcm9tIFwid2ViaXgtamV0XCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEludmVudG9yeUFwcCBleHRlbmRzIEpldEFwcCB7XG5cdGNvbnN0cnVjdG9yKGNvbmZpZyl7XG5cdFx0c3VwZXIod2ViaXguZXh0ZW5kKHtcblx0XHRcdGlkOlx0XHRcdEFQUE5BTUUsXG5cdFx0XHR2ZXJzaW9uOlx0VkVSU0lPTixcblx0XHRcdHN0YXJ0Olx0XHRcIi9tYWluL2Rhc2hcIixcblx0XHRcdGRlYnVnOlx0XHQhUFJPRFVDVElPTlxuXHRcdH0sIGNvbmZpZywgdHJ1ZSkpO1xuXG5cdFx0LyogZXJyb3IgdHJhY2tpbmcgKi9cblx0XHR0aGlzLmF0dGFjaEV2ZW50KFwiYXBwOmVycm9yOnJlc29sdmVcIiwgZnVuY3Rpb24obmFtZSwgZXJyb3Ipe1xuXHRcdFx0d2luZG93LmNvbnNvbGUuZXJyb3IoZXJyb3IpO1xuXHRcdH0pO1xuXHR9XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zb3VyY2VzL2FwcC5qcyIsIi8vIHJlbW92ZWQgYnkgZXh0cmFjdC10ZXh0LXdlYnBhY2stcGx1Z2luXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9zb3VyY2VzL3N0eWxlcy9hcHAuY3NzXG4vLyBtb2R1bGUgaWQgPSA1N1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJ2YXIgbWFwID0ge1xuXHRcIi4vYWxlcnRzXCI6IDksXG5cdFwiLi9hbGVydHMvXCI6IDksXG5cdFwiLi9hbGVydHMvYWxlcnRcIjogMjYsXG5cdFwiLi9hbGVydHMvYWxlcnQuanNcIjogMjYsXG5cdFwiLi9hbGVydHMvZGF0YVwiOiA3LFxuXHRcIi4vYWxlcnRzL2RhdGEuanNcIjogNyxcblx0XCIuL2FsZXJ0cy9pbmRleFwiOiA5LFxuXHRcIi4vYWxlcnRzL2luZGV4LmpzXCI6IDksXG5cdFwiLi9jYXBhY2l0eVwiOiAxMCxcblx0XCIuL2NhcGFjaXR5L1wiOiAxMCxcblx0XCIuL2NhcGFjaXR5L2luZGV4XCI6IDEwLFxuXHRcIi4vY2FwYWNpdHkvaW5kZXguanNcIjogMTAsXG5cdFwiLi9jaXJjbGVzXCI6IDExLFxuXHRcIi4vY2lyY2xlcy9cIjogMTEsXG5cdFwiLi9jaXJjbGVzL2luZGV4XCI6IDExLFxuXHRcIi4vY2lyY2xlcy9pbmRleC5qc1wiOiAxMSxcblx0XCIuL2NpcmNsZXN0b3JpZXNcIjogMTIsXG5cdFwiLi9jaXJjbGVzdG9yaWVzL1wiOiAxMixcblx0XCIuL2NpcmNsZXN0b3JpZXMvaW5kZXhcIjogMTIsXG5cdFwiLi9jaXJjbGVzdG9yaWVzL2luZGV4LmpzXCI6IDEyLFxuXHRcIi4vY2lyY2xldGFza3NcIjogMTMsXG5cdFwiLi9jaXJjbGV0YXNrcy9cIjogMTMsXG5cdFwiLi9jaXJjbGV0YXNrcy9pbmRleFwiOiAxMyxcblx0XCIuL2NpcmNsZXRhc2tzL2luZGV4LmpzXCI6IDEzLFxuXHRcIi4vY29kZXNlcnZlclwiOiAxNCxcblx0XCIuL2NvZGVzZXJ2ZXIvXCI6IDE0LFxuXHRcIi4vY29kZXNlcnZlci9pbmRleFwiOiAxNCxcblx0XCIuL2NvZGVzZXJ2ZXIvaW5kZXguanNcIjogMTQsXG5cdFwiLi9kYXNoXCI6IDE1LFxuXHRcIi4vZGFzaC9cIjogMTUsXG5cdFwiLi9kYXNoL2Rpc2tTcGFjZVwiOiA0MSxcblx0XCIuL2Rhc2gvZGlza1NwYWNlLmpzXCI6IDQxLFxuXHRcIi4vZGFzaC9oZWFsdGhcIjogNDIsXG5cdFwiLi9kYXNoL2hlYWx0aC5qc1wiOiA0Mixcblx0XCIuL2Rhc2gvaW5kZXhcIjogMTUsXG5cdFwiLi9kYXNoL2luZGV4LmpzXCI6IDE1LFxuXHRcIi4vZGFzaC9qc3hJbmZvXCI6IDQzLFxuXHRcIi4vZGFzaC9qc3hJbmZvLmpzXCI6IDQzLFxuXHRcIi4vZGFzaC9wcm9jZXNzRGV0YWlsc1wiOiAyOCxcblx0XCIuL2Rhc2gvcHJvY2Vzc0RldGFpbHMuanNcIjogMjgsXG5cdFwiLi9kYXNoL3Byb2Nlc3Nlc1wiOiA0NCxcblx0XCIuL2Rhc2gvcHJvY2Vzc2VzLmpzXCI6IDQ0LFxuXHRcIi4vZGFzaC9wcm9jZXNzZXNMaXN0XCI6IDQ1LFxuXHRcIi4vZGFzaC9wcm9jZXNzZXNMaXN0LmpzXCI6IDQ1LFxuXHRcIi4vZGFzaC9ydW5uaW5nUG9ydHNcIjogNDYsXG5cdFwiLi9kYXNoL3J1bm5pbmdQb3J0cy5qc1wiOiA0Nixcblx0XCIuL2RlcGxveWVkU29sdXRpb25zXCI6IDE2LFxuXHRcIi4vZGVwbG95ZWRTb2x1dGlvbnMvXCI6IDE2LFxuXHRcIi4vZGVwbG95ZWRTb2x1dGlvbnMvaW5kZXhcIjogMTYsXG5cdFwiLi9kZXBsb3llZFNvbHV0aW9ucy9pbmRleC5qc1wiOiAxNixcblx0XCIuL2RlcGxveWVkU29sdXRpb25zL3Jlc2VydmF0aW9uXCI6IDI5LFxuXHRcIi4vZGVwbG95ZWRTb2x1dGlvbnMvcmVzZXJ2YXRpb24uanNcIjogMjksXG5cdFwiLi9lcnJvcnMvZGlhbG9nXCI6IDMsXG5cdFwiLi9lcnJvcnMvZGlhbG9nLmpzXCI6IDMsXG5cdFwiLi9leHRlcm5hbFwiOiAxLFxuXHRcIi4vZXh0ZXJuYWwvXCI6IDEsXG5cdFwiLi9leHRlcm5hbC9pbmRleFwiOiAxLFxuXHRcIi4vZXh0ZXJuYWwvaW5kZXguanNcIjogMSxcblx0XCIuL2Zhcm1tYW5hZ2VtZW50XCI6IDE3LFxuXHRcIi4vZmFybW1hbmFnZW1lbnQvXCI6IDE3LFxuXHRcIi4vZmFybW1hbmFnZW1lbnQvaW5kZXhcIjogMTcsXG5cdFwiLi9mYXJtbWFuYWdlbWVudC9pbmRleC5qc1wiOiAxNyxcblx0XCIuL2p1cHl0ZXJcIjogMTgsXG5cdFwiLi9qdXB5dGVyL1wiOiAxOCxcblx0XCIuL2p1cHl0ZXIvaW5kZXhcIjogMTgsXG5cdFwiLi9qdXB5dGVyL2luZGV4LmpzXCI6IDE4LFxuXHRcIi4vbG9nc1wiOiAxOSxcblx0XCIuL2xvZ3MvXCI6IDE5LFxuXHRcIi4vbG9ncy9hcHBMb2dzXCI6IDMwLFxuXHRcIi4vbG9ncy9hcHBMb2dzLmpzXCI6IDMwLFxuXHRcIi4vbG9ncy9pbmRleFwiOiAxOSxcblx0XCIuL2xvZ3MvaW5kZXguanNcIjogMTksXG5cdFwiLi9tYWluXCI6IDQ3LFxuXHRcIi4vbWFpbi5qc1wiOiA0Nyxcblx0XCIuL215am9icy9qb2JEZXRhaWxzXCI6IDMxLFxuXHRcIi4vbXlqb2JzL2pvYkRldGFpbHMuanNcIjogMzEsXG5cdFwiLi9teWpvYnMvam9ic1wiOiA0OCxcblx0XCIuL215am9icy9qb2JzLmpzXCI6IDQ4LFxuXHRcIi4vbXlqb2JzL3dvcmtlckRldGFpbHNcIjogMzIsXG5cdFwiLi9teWpvYnMvd29ya2VyRGV0YWlscy5qc1wiOiAzMixcblx0XCIuL215am9icy93b3JrZXJzXCI6IDUwLFxuXHRcIi4vbXlqb2JzL3dvcmtlcnMuanNcIjogNTAsXG5cdFwiLi9wYWNrYWdlc1wiOiAyMCxcblx0XCIuL3BhY2thZ2VzL1wiOiAyMCxcblx0XCIuL3BhY2thZ2VzL2luZGV4XCI6IDIwLFxuXHRcIi4vcGFja2FnZXMvaW5kZXguanNcIjogMjAsXG5cdFwiLi9wYWNrYWdlcy9wYWNrYWdlRGV0YWlsc1wiOiAzMyxcblx0XCIuL3BhY2thZ2VzL3BhY2thZ2VEZXRhaWxzLmpzXCI6IDMzLFxuXHRcIi4vc2RrZXhhbXBsZXNcIjogMjEsXG5cdFwiLi9zZGtleGFtcGxlcy9cIjogMjEsXG5cdFwiLi9zZGtleGFtcGxlcy9pbmRleFwiOiAyMSxcblx0XCIuL3Nka2V4YW1wbGVzL2luZGV4LmpzXCI6IDIxLFxuXHRcIi4vc2V0dGluZ3NcIjogMjIsXG5cdFwiLi9zZXR0aW5ncy9cIjogMjIsXG5cdFwiLi9zZXR0aW5ncy9hZG1pbnNcIjogMzQsXG5cdFwiLi9zZXR0aW5ncy9hZG1pbnMuanNcIjogMzQsXG5cdFwiLi9zZXR0aW5ncy9nZW5lcmFsXCI6IDM1LFxuXHRcIi4vc2V0dGluZ3MvZ2VuZXJhbC5qc1wiOiAzNSxcblx0XCIuL3NldHRpbmdzL2luZGV4XCI6IDIyLFxuXHRcIi4vc2V0dGluZ3MvaW5kZXguanNcIjogMjIsXG5cdFwiLi9zb2x1dGlvbnMvY2hhdGZsb3dcIjogNTEsXG5cdFwiLi9zb2x1dGlvbnMvY2hhdGZsb3cuanNcIjogNTEsXG5cdFwiLi90Zndpa2lzL3RmZ3JpZHNka1wiOiA1Mixcblx0XCIuL3Rmd2lraXMvdGZncmlkc2RrLmpzXCI6IDUyLFxuXHRcIi4vdGZ3aWtpcy90aHJlZWZvbGRcIjogNTMsXG5cdFwiLi90Zndpa2lzL3RocmVlZm9sZC5qc1wiOiA1Myxcblx0XCIuL3dhbGxldHNNYW5hZ2VyXCI6IDIzLFxuXHRcIi4vd2FsbGV0c01hbmFnZXIvXCI6IDIzLFxuXHRcIi4vd2FsbGV0c01hbmFnZXIvaW1wb3J0Rm9ybVwiOiAzOCxcblx0XCIuL3dhbGxldHNNYW5hZ2VyL2ltcG9ydEZvcm0uanNcIjogMzgsXG5cdFwiLi93YWxsZXRzTWFuYWdlci9pbmRleFwiOiAyMyxcblx0XCIuL3dhbGxldHNNYW5hZ2VyL2luZGV4LmpzXCI6IDIzLFxuXHRcIi4vd2FsbGV0c01hbmFnZXIvd2FsbGV0RGV0YWlsc1wiOiAzNyxcblx0XCIuL3dhbGxldHNNYW5hZ2VyL3dhbGxldERldGFpbHMuanNcIjogMzcsXG5cdFwiLi93YWxsZXRzTWFuYWdlci93YWxsZXRGb3JtXCI6IDM2LFxuXHRcIi4vd2FsbGV0c01hbmFnZXIvd2FsbGV0Rm9ybS5qc1wiOiAzNixcblx0XCIuL3dpa2lzXCI6IDI1LFxuXHRcIi4vd2lraXMvXCI6IDI1LFxuXHRcIi4vd2lraXMvaW5kZXhcIjogMjUsXG5cdFwiLi93aWtpcy9pbmRleC5qc1wiOiAyNSxcblx0XCIuL3dpa2lzL3ZpZXdcIjogNTQsXG5cdFwiLi93aWtpcy92aWV3LmpzXCI6IDU0XG59O1xuZnVuY3Rpb24gd2VicGFja0NvbnRleHQocmVxKSB7XG5cdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKHdlYnBhY2tDb250ZXh0UmVzb2x2ZShyZXEpKTtcbn07XG5mdW5jdGlvbiB3ZWJwYWNrQ29udGV4dFJlc29sdmUocmVxKSB7XG5cdHZhciBpZCA9IG1hcFtyZXFdO1xuXHRpZighKGlkICsgMSkpIC8vIGNoZWNrIGZvciBudW1iZXIgb3Igc3RyaW5nXG5cdFx0dGhyb3cgbmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIiArIHJlcSArIFwiJy5cIik7XG5cdHJldHVybiBpZDtcbn07XG53ZWJwYWNrQ29udGV4dC5rZXlzID0gZnVuY3Rpb24gd2VicGFja0NvbnRleHRLZXlzKCkge1xuXHRyZXR1cm4gT2JqZWN0LmtleXMobWFwKTtcbn07XG53ZWJwYWNrQ29udGV4dC5yZXNvbHZlID0gd2VicGFja0NvbnRleHRSZXNvbHZlO1xubW9kdWxlLmV4cG9ydHMgPSB3ZWJwYWNrQ29udGV4dDtcbndlYnBhY2tDb250ZXh0LmlkID0gNTg7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9zb3VyY2VzL3ZpZXdzIF5cXC5cXC8uKiRcbi8vIG1vZHVsZSBpZCA9IDU4XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8qICBhbnNpX3VwLmpzXG4gKiAgYXV0aG9yIDogRHJ1IE5lbHNvblxuICogIGxpY2Vuc2UgOiBNSVRcbiAqICBodHRwOi8vZ2l0aHViLmNvbS9kcnVkcnUvYW5zaV91cFxuICovXG4oZnVuY3Rpb24gKHJvb3QsIGZhY3RvcnkpIHtcbiAgICBpZiAodHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kKSB7XG4gICAgICAgIC8vIEFNRC4gUmVnaXN0ZXIgYXMgYW4gYW5vbnltb3VzIG1vZHVsZS5cbiAgICAgICAgZGVmaW5lKFsnZXhwb3J0cyddLCBmYWN0b3J5KTtcbiAgICB9IGVsc2UgaWYgKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0JyAmJiB0eXBlb2YgZXhwb3J0cy5ub2RlTmFtZSAhPT0gJ3N0cmluZycpIHtcbiAgICAgICAgLy8gQ29tbW9uSlNcbiAgICAgICAgZmFjdG9yeShleHBvcnRzKTtcbiAgICB9IGVsc2Uge1xuICAgICAgICAvLyBCcm93c2VyIGdsb2JhbHNcbiAgICAgICAgdmFyIGV4cCA9IHt9O1xuICAgICAgICBmYWN0b3J5KGV4cCk7XG4gICAgICAgIHJvb3QuQW5zaVVwID0gZXhwLmRlZmF1bHQ7XG4gICAgfVxufSh0aGlzLCBmdW5jdGlvbiAoZXhwb3J0cykge1xuXCJ1c2Ugc3RyaWN0XCI7XG52YXIgX19tYWtlVGVtcGxhdGVPYmplY3QgPSAodGhpcyAmJiB0aGlzLl9fbWFrZVRlbXBsYXRlT2JqZWN0KSB8fCBmdW5jdGlvbiAoY29va2VkLCByYXcpIHtcbiAgICBpZiAoT2JqZWN0LmRlZmluZVByb3BlcnR5KSB7IE9iamVjdC5kZWZpbmVQcm9wZXJ0eShjb29rZWQsIFwicmF3XCIsIHsgdmFsdWU6IHJhdyB9KTsgfSBlbHNlIHsgY29va2VkLnJhdyA9IHJhdzsgfVxuICAgIHJldHVybiBjb29rZWQ7XG59O1xudmFyIFBhY2tldEtpbmQ7XG4oZnVuY3Rpb24gKFBhY2tldEtpbmQpIHtcbiAgICBQYWNrZXRLaW5kW1BhY2tldEtpbmRbXCJFT1NcIl0gPSAwXSA9IFwiRU9TXCI7XG4gICAgUGFja2V0S2luZFtQYWNrZXRLaW5kW1wiVGV4dFwiXSA9IDFdID0gXCJUZXh0XCI7XG4gICAgUGFja2V0S2luZFtQYWNrZXRLaW5kW1wiSW5jb21wbGV0ZVwiXSA9IDJdID0gXCJJbmNvbXBsZXRlXCI7XG4gICAgUGFja2V0S2luZFtQYWNrZXRLaW5kW1wiRVNDXCJdID0gM10gPSBcIkVTQ1wiO1xuICAgIFBhY2tldEtpbmRbUGFja2V0S2luZFtcIlVua25vd25cIl0gPSA0XSA9IFwiVW5rbm93blwiO1xuICAgIFBhY2tldEtpbmRbUGFja2V0S2luZFtcIlNHUlwiXSA9IDVdID0gXCJTR1JcIjtcbiAgICBQYWNrZXRLaW5kW1BhY2tldEtpbmRbXCJPU0NVUkxcIl0gPSA2XSA9IFwiT1NDVVJMXCI7XG59KShQYWNrZXRLaW5kIHx8IChQYWNrZXRLaW5kID0ge30pKTtcbnZhciBBbnNpVXAgPSAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIEFuc2lVcCgpIHtcbiAgICAgICAgdGhpcy5WRVJTSU9OID0gXCI0LjAuNFwiO1xuICAgICAgICB0aGlzLnNldHVwX3BhbGV0dGVzKCk7XG4gICAgICAgIHRoaXMuX3VzZV9jbGFzc2VzID0gZmFsc2U7XG4gICAgICAgIHRoaXMuX2VzY2FwZV9mb3JfaHRtbCA9IHRydWU7XG4gICAgICAgIHRoaXMuYm9sZCA9IGZhbHNlO1xuICAgICAgICB0aGlzLmZnID0gdGhpcy5iZyA9IG51bGw7XG4gICAgICAgIHRoaXMuX2J1ZmZlciA9ICcnO1xuICAgICAgICB0aGlzLl91cmxfd2hpdGVsaXN0ID0geyAnaHR0cCc6IDEsICdodHRwcyc6IDEgfTtcbiAgICB9XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KEFuc2lVcC5wcm90b3R5cGUsIFwidXNlX2NsYXNzZXNcIiwge1xuICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl91c2VfY2xhc3NlcztcbiAgICAgICAgfSxcbiAgICAgICAgc2V0OiBmdW5jdGlvbiAoYXJnKSB7XG4gICAgICAgICAgICB0aGlzLl91c2VfY2xhc3NlcyA9IGFyZztcbiAgICAgICAgfSxcbiAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlXG4gICAgfSk7XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KEFuc2lVcC5wcm90b3R5cGUsIFwiZXNjYXBlX2Zvcl9odG1sXCIsIHtcbiAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fZXNjYXBlX2Zvcl9odG1sO1xuICAgICAgICB9LFxuICAgICAgICBzZXQ6IGZ1bmN0aW9uIChhcmcpIHtcbiAgICAgICAgICAgIHRoaXMuX2VzY2FwZV9mb3JfaHRtbCA9IGFyZztcbiAgICAgICAgfSxcbiAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlXG4gICAgfSk7XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KEFuc2lVcC5wcm90b3R5cGUsIFwidXJsX3doaXRlbGlzdFwiLCB7XG4gICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3VybF93aGl0ZWxpc3Q7XG4gICAgICAgIH0sXG4gICAgICAgIHNldDogZnVuY3Rpb24gKGFyZykge1xuICAgICAgICAgICAgdGhpcy5fdXJsX3doaXRlbGlzdCA9IGFyZztcbiAgICAgICAgfSxcbiAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlXG4gICAgfSk7XG4gICAgQW5zaVVwLnByb3RvdHlwZS5zZXR1cF9wYWxldHRlcyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAgICAgdGhpcy5hbnNpX2NvbG9ycyA9XG4gICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAgICAgICB7IHJnYjogWzAsIDAsIDBdLCBjbGFzc19uYW1lOiBcImFuc2ktYmxhY2tcIiB9LFxuICAgICAgICAgICAgICAgICAgICB7IHJnYjogWzE4NywgMCwgMF0sIGNsYXNzX25hbWU6IFwiYW5zaS1yZWRcIiB9LFxuICAgICAgICAgICAgICAgICAgICB7IHJnYjogWzAsIDE4NywgMF0sIGNsYXNzX25hbWU6IFwiYW5zaS1ncmVlblwiIH0sXG4gICAgICAgICAgICAgICAgICAgIHsgcmdiOiBbMTg3LCAxODcsIDBdLCBjbGFzc19uYW1lOiBcImFuc2kteWVsbG93XCIgfSxcbiAgICAgICAgICAgICAgICAgICAgeyByZ2I6IFswLCAwLCAxODddLCBjbGFzc19uYW1lOiBcImFuc2ktYmx1ZVwiIH0sXG4gICAgICAgICAgICAgICAgICAgIHsgcmdiOiBbMTg3LCAwLCAxODddLCBjbGFzc19uYW1lOiBcImFuc2ktbWFnZW50YVwiIH0sXG4gICAgICAgICAgICAgICAgICAgIHsgcmdiOiBbMCwgMTg3LCAxODddLCBjbGFzc19uYW1lOiBcImFuc2ktY3lhblwiIH0sXG4gICAgICAgICAgICAgICAgICAgIHsgcmdiOiBbMjU1LCAyNTUsIDI1NV0sIGNsYXNzX25hbWU6IFwiYW5zaS13aGl0ZVwiIH1cbiAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgICAgICAgeyByZ2I6IFs4NSwgODUsIDg1XSwgY2xhc3NfbmFtZTogXCJhbnNpLWJyaWdodC1ibGFja1wiIH0sXG4gICAgICAgICAgICAgICAgICAgIHsgcmdiOiBbMjU1LCA4NSwgODVdLCBjbGFzc19uYW1lOiBcImFuc2ktYnJpZ2h0LXJlZFwiIH0sXG4gICAgICAgICAgICAgICAgICAgIHsgcmdiOiBbMCwgMjU1LCAwXSwgY2xhc3NfbmFtZTogXCJhbnNpLWJyaWdodC1ncmVlblwiIH0sXG4gICAgICAgICAgICAgICAgICAgIHsgcmdiOiBbMjU1LCAyNTUsIDg1XSwgY2xhc3NfbmFtZTogXCJhbnNpLWJyaWdodC15ZWxsb3dcIiB9LFxuICAgICAgICAgICAgICAgICAgICB7IHJnYjogWzg1LCA4NSwgMjU1XSwgY2xhc3NfbmFtZTogXCJhbnNpLWJyaWdodC1ibHVlXCIgfSxcbiAgICAgICAgICAgICAgICAgICAgeyByZ2I6IFsyNTUsIDg1LCAyNTVdLCBjbGFzc19uYW1lOiBcImFuc2ktYnJpZ2h0LW1hZ2VudGFcIiB9LFxuICAgICAgICAgICAgICAgICAgICB7IHJnYjogWzg1LCAyNTUsIDI1NV0sIGNsYXNzX25hbWU6IFwiYW5zaS1icmlnaHQtY3lhblwiIH0sXG4gICAgICAgICAgICAgICAgICAgIHsgcmdiOiBbMjU1LCAyNTUsIDI1NV0sIGNsYXNzX25hbWU6IFwiYW5zaS1icmlnaHQtd2hpdGVcIiB9XG4gICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgXTtcbiAgICAgICAgdGhpcy5wYWxldHRlXzI1NiA9IFtdO1xuICAgICAgICB0aGlzLmFuc2lfY29sb3JzLmZvckVhY2goZnVuY3Rpb24gKHBhbGV0dGUpIHtcbiAgICAgICAgICAgIHBhbGV0dGUuZm9yRWFjaChmdW5jdGlvbiAocmVjKSB7XG4gICAgICAgICAgICAgICAgX3RoaXMucGFsZXR0ZV8yNTYucHVzaChyZWMpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgICAgICB2YXIgbGV2ZWxzID0gWzAsIDk1LCAxMzUsIDE3NSwgMjE1LCAyNTVdO1xuICAgICAgICBmb3IgKHZhciByID0gMDsgciA8IDY7ICsrcikge1xuICAgICAgICAgICAgZm9yICh2YXIgZyA9IDA7IGcgPCA2OyArK2cpIHtcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBiID0gMDsgYiA8IDY7ICsrYikge1xuICAgICAgICAgICAgICAgICAgICB2YXIgY29sID0geyByZ2I6IFtsZXZlbHNbcl0sIGxldmVsc1tnXSwgbGV2ZWxzW2JdXSwgY2xhc3NfbmFtZTogJ3RydWVjb2xvcicgfTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wYWxldHRlXzI1Ni5wdXNoKGNvbCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHZhciBncmV5X2xldmVsID0gODtcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCAyNDsgKytpLCBncmV5X2xldmVsICs9IDEwKSB7XG4gICAgICAgICAgICB2YXIgZ3J5ID0geyByZ2I6IFtncmV5X2xldmVsLCBncmV5X2xldmVsLCBncmV5X2xldmVsXSwgY2xhc3NfbmFtZTogJ3RydWVjb2xvcicgfTtcbiAgICAgICAgICAgIHRoaXMucGFsZXR0ZV8yNTYucHVzaChncnkpO1xuICAgICAgICB9XG4gICAgfTtcbiAgICBBbnNpVXAucHJvdG90eXBlLmVzY2FwZV90eHRfZm9yX2h0bWwgPSBmdW5jdGlvbiAodHh0KSB7XG4gICAgICAgIHJldHVybiB0eHQucmVwbGFjZSgvWyY8Pl0vZ20sIGZ1bmN0aW9uIChzdHIpIHtcbiAgICAgICAgICAgIGlmIChzdHIgPT09IFwiJlwiKVxuICAgICAgICAgICAgICAgIHJldHVybiBcIiZhbXA7XCI7XG4gICAgICAgICAgICBpZiAoc3RyID09PSBcIjxcIilcbiAgICAgICAgICAgICAgICByZXR1cm4gXCImbHQ7XCI7XG4gICAgICAgICAgICBpZiAoc3RyID09PSBcIj5cIilcbiAgICAgICAgICAgICAgICByZXR1cm4gXCImZ3Q7XCI7XG4gICAgICAgIH0pO1xuICAgIH07XG4gICAgQW5zaVVwLnByb3RvdHlwZS5hcHBlbmRfYnVmZmVyID0gZnVuY3Rpb24gKHR4dCkge1xuICAgICAgICB2YXIgc3RyID0gdGhpcy5fYnVmZmVyICsgdHh0O1xuICAgICAgICB0aGlzLl9idWZmZXIgPSBzdHI7XG4gICAgfTtcbiAgICBBbnNpVXAucHJvdG90eXBlLmdldF9uZXh0X3BhY2tldCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIHBrdCA9IHtcbiAgICAgICAgICAgIGtpbmQ6IFBhY2tldEtpbmQuRU9TLFxuICAgICAgICAgICAgdGV4dDogJycsXG4gICAgICAgICAgICB1cmw6ICcnXG4gICAgICAgIH07XG4gICAgICAgIHZhciBsZW4gPSB0aGlzLl9idWZmZXIubGVuZ3RoO1xuICAgICAgICBpZiAobGVuID09IDApXG4gICAgICAgICAgICByZXR1cm4gcGt0O1xuICAgICAgICB2YXIgcG9zID0gdGhpcy5fYnVmZmVyLmluZGV4T2YoXCJcXHgxQlwiKTtcbiAgICAgICAgaWYgKHBvcyA9PSAtMSkge1xuICAgICAgICAgICAgcGt0LmtpbmQgPSBQYWNrZXRLaW5kLlRleHQ7XG4gICAgICAgICAgICBwa3QudGV4dCA9IHRoaXMuX2J1ZmZlcjtcbiAgICAgICAgICAgIHRoaXMuX2J1ZmZlciA9ICcnO1xuICAgICAgICAgICAgcmV0dXJuIHBrdDtcbiAgICAgICAgfVxuICAgICAgICBpZiAocG9zID4gMCkge1xuICAgICAgICAgICAgcGt0LmtpbmQgPSBQYWNrZXRLaW5kLlRleHQ7XG4gICAgICAgICAgICBwa3QudGV4dCA9IHRoaXMuX2J1ZmZlci5zbGljZSgwLCBwb3MpO1xuICAgICAgICAgICAgdGhpcy5fYnVmZmVyID0gdGhpcy5fYnVmZmVyLnNsaWNlKHBvcyk7XG4gICAgICAgICAgICByZXR1cm4gcGt0O1xuICAgICAgICB9XG4gICAgICAgIGlmIChwb3MgPT0gMCkge1xuICAgICAgICAgICAgaWYgKGxlbiA9PSAxKSB7XG4gICAgICAgICAgICAgICAgcGt0LmtpbmQgPSBQYWNrZXRLaW5kLkluY29tcGxldGU7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHBrdDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHZhciBuZXh0X2NoYXIgPSB0aGlzLl9idWZmZXIuY2hhckF0KDEpO1xuICAgICAgICAgICAgaWYgKChuZXh0X2NoYXIgIT0gJ1snKSAmJiAobmV4dF9jaGFyICE9ICddJykpIHtcbiAgICAgICAgICAgICAgICBwa3Qua2luZCA9IFBhY2tldEtpbmQuRVNDO1xuICAgICAgICAgICAgICAgIHBrdC50ZXh0ID0gdGhpcy5fYnVmZmVyLnNsaWNlKDAsIDEpO1xuICAgICAgICAgICAgICAgIHRoaXMuX2J1ZmZlciA9IHRoaXMuX2J1ZmZlci5zbGljZSgxKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gcGt0O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKG5leHRfY2hhciA9PSAnWycpIHtcbiAgICAgICAgICAgICAgICBpZiAoIXRoaXMuX2NzaV9yZWdleCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9jc2lfcmVnZXggPSByZ3goX19tYWtlVGVtcGxhdGVPYmplY3QoW1wiXFxuICAgICAgICAgICAgICAgICAgICAgICAgXiAgICAgICAgICAgICAgICAgICAgICAgICAgICMgYmVnaW5uaW5nIG9mIGxpbmVcXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgI1xcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAjIEZpcnN0IGF0dGVtcHRcXG4gICAgICAgICAgICAgICAgICAgICAgICAoPzogICAgICAgICAgICAgICAgICAgICAgICAgIyBsZWdhbCBzZXF1ZW5jZVxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgXFx1MDAxQlsgICAgICAgICAgICAgICAgICAgICAgIyBDU0lcXG4gICAgICAgICAgICAgICAgICAgICAgICAgIChbPC0/XT8pICAgICAgICAgICAgICAjIHByaXZhdGUtbW9kZSBjaGFyXFxuICAgICAgICAgICAgICAgICAgICAgICAgICAoW2Q7XSopICAgICAgICAgICAgICAgICAgICAjIGFueSBkaWdpdHMgb3Igc2VtaWNvbG9uc1xcbiAgICAgICAgICAgICAgICAgICAgICAgICAgKFsgLS9dPyAgICAgICAgICAgICAgICMgYW4gaW50ZXJtZWRpYXRlIG1vZGlmaWVyXFxuICAgICAgICAgICAgICAgICAgICAgICAgICBbQC1+XSkgICAgICAgICAgICAgICAgIyB0aGUgY29tbWFuZFxcbiAgICAgICAgICAgICAgICAgICAgICAgIClcXG4gICAgICAgICAgICAgICAgICAgICAgICB8ICAgICAgICAgICAgICAgICAgICAgICAgICAgIyBhbHRlcm5hdGUgKHNlY29uZCBhdHRlbXB0KVxcbiAgICAgICAgICAgICAgICAgICAgICAgICg/OiAgICAgICAgICAgICAgICAgICAgICAgICAjIGlsbGVnYWwgc2VxdWVuY2VcXG4gICAgICAgICAgICAgICAgICAgICAgICAgIFxcdTAwMUJbICAgICAgICAgICAgICAgICAgICAgICMgQ1NJXFxuICAgICAgICAgICAgICAgICAgICAgICAgICBbIC1+XSogICAgICAgICAgICAgICAgIyBhbnl0aGluZyBsZWdhbFxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgKFtcXDAtXFx1MDAxRjpdKSAgICAgICAgICAgICAgIyBhbnl0aGluZyBpbGxlZ2FsXFxuICAgICAgICAgICAgICAgICAgICAgICAgKVxcbiAgICAgICAgICAgICAgICAgICAgXCJdLCBbXCJcXG4gICAgICAgICAgICAgICAgICAgICAgICBeICAgICAgICAgICAgICAgICAgICAgICAgICAgIyBiZWdpbm5pbmcgb2YgbGluZVxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAjXFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICMgRmlyc3QgYXR0ZW1wdFxcbiAgICAgICAgICAgICAgICAgICAgICAgICg/OiAgICAgICAgICAgICAgICAgICAgICAgICAjIGxlZ2FsIHNlcXVlbmNlXFxuICAgICAgICAgICAgICAgICAgICAgICAgICBcXFxceDFiXFxcXFsgICAgICAgICAgICAgICAgICAgICAgIyBDU0lcXG4gICAgICAgICAgICAgICAgICAgICAgICAgIChbXFxcXHgzYy1cXFxceDNmXT8pICAgICAgICAgICAgICAjIHByaXZhdGUtbW9kZSBjaGFyXFxuICAgICAgICAgICAgICAgICAgICAgICAgICAoW1xcXFxkO10qKSAgICAgICAgICAgICAgICAgICAgIyBhbnkgZGlnaXRzIG9yIHNlbWljb2xvbnNcXG4gICAgICAgICAgICAgICAgICAgICAgICAgIChbXFxcXHgyMC1cXFxceDJmXT8gICAgICAgICAgICAgICAjIGFuIGludGVybWVkaWF0ZSBtb2RpZmllclxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgW1xcXFx4NDAtXFxcXHg3ZV0pICAgICAgICAgICAgICAgICMgdGhlIGNvbW1hbmRcXG4gICAgICAgICAgICAgICAgICAgICAgICApXFxuICAgICAgICAgICAgICAgICAgICAgICAgfCAgICAgICAgICAgICAgICAgICAgICAgICAgICMgYWx0ZXJuYXRlIChzZWNvbmQgYXR0ZW1wdClcXG4gICAgICAgICAgICAgICAgICAgICAgICAoPzogICAgICAgICAgICAgICAgICAgICAgICAgIyBpbGxlZ2FsIHNlcXVlbmNlXFxuICAgICAgICAgICAgICAgICAgICAgICAgICBcXFxceDFiXFxcXFsgICAgICAgICAgICAgICAgICAgICAgIyBDU0lcXG4gICAgICAgICAgICAgICAgICAgICAgICAgIFtcXFxceDIwLVxcXFx4N2VdKiAgICAgICAgICAgICAgICAjIGFueXRoaW5nIGxlZ2FsXFxuICAgICAgICAgICAgICAgICAgICAgICAgICAoW1xcXFx4MDAtXFxcXHgxZjpdKSAgICAgICAgICAgICAgIyBhbnl0aGluZyBpbGxlZ2FsXFxuICAgICAgICAgICAgICAgICAgICAgICAgKVxcbiAgICAgICAgICAgICAgICAgICAgXCJdKSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHZhciBtYXRjaCA9IHRoaXMuX2J1ZmZlci5tYXRjaCh0aGlzLl9jc2lfcmVnZXgpO1xuICAgICAgICAgICAgICAgIGlmIChtYXRjaCA9PT0gbnVsbCkge1xuICAgICAgICAgICAgICAgICAgICBwa3Qua2luZCA9IFBhY2tldEtpbmQuSW5jb21wbGV0ZTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHBrdDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKG1hdGNoWzRdKSB7XG4gICAgICAgICAgICAgICAgICAgIHBrdC5raW5kID0gUGFja2V0S2luZC5FU0M7XG4gICAgICAgICAgICAgICAgICAgIHBrdC50ZXh0ID0gdGhpcy5fYnVmZmVyLnNsaWNlKDAsIDEpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9idWZmZXIgPSB0aGlzLl9idWZmZXIuc2xpY2UoMSk7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBwa3Q7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmICgobWF0Y2hbMV0gIT0gJycpIHx8IChtYXRjaFszXSAhPSAnbScpKVxuICAgICAgICAgICAgICAgICAgICBwa3Qua2luZCA9IFBhY2tldEtpbmQuVW5rbm93bjtcbiAgICAgICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgICAgIHBrdC5raW5kID0gUGFja2V0S2luZC5TR1I7XG4gICAgICAgICAgICAgICAgcGt0LnRleHQgPSBtYXRjaFsyXTtcbiAgICAgICAgICAgICAgICB2YXIgcnBvcyA9IG1hdGNoWzBdLmxlbmd0aDtcbiAgICAgICAgICAgICAgICB0aGlzLl9idWZmZXIgPSB0aGlzLl9idWZmZXIuc2xpY2UocnBvcyk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHBrdDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChuZXh0X2NoYXIgPT0gJ10nKSB7XG4gICAgICAgICAgICAgICAgaWYgKGxlbiA8IDQpIHtcbiAgICAgICAgICAgICAgICAgICAgcGt0LmtpbmQgPSBQYWNrZXRLaW5kLkluY29tcGxldGU7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBwa3Q7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmICgodGhpcy5fYnVmZmVyLmNoYXJBdCgyKSAhPSAnOCcpXG4gICAgICAgICAgICAgICAgICAgIHx8ICh0aGlzLl9idWZmZXIuY2hhckF0KDMpICE9ICc7JykpIHtcbiAgICAgICAgICAgICAgICAgICAgcGt0LmtpbmQgPSBQYWNrZXRLaW5kLkVTQztcbiAgICAgICAgICAgICAgICAgICAgcGt0LnRleHQgPSB0aGlzLl9idWZmZXIuc2xpY2UoMCwgMSk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2J1ZmZlciA9IHRoaXMuX2J1ZmZlci5zbGljZSgxKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHBrdDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKCF0aGlzLl9vc2Nfc3QpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fb3NjX3N0ID0gcmd4RyhfX21ha2VUZW1wbGF0ZU9iamVjdChbXCJcXG4gICAgICAgICAgICAgICAgICAgICAgICAoPzogICAgICAgICAgICAgICAgICAgICAgICAgIyBsZWdhbCBzZXF1ZW5jZVxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgKFxcdTAwMUJcXFxcKSAgICAgICAgICAgICAgICAgICAgIyBFU0MgICAgICAgICAgICAgICAgICAgICAgICAgICB8ICAgICAgICAgICAgICAgICAgICAgICAgICAgIyBhbHRlcm5hdGVcXG4gICAgICAgICAgICAgICAgICAgICAgICAgIChcXHUwMDA3KSAgICAgICAgICAgICAgICAgICAgICAjIEJFTCAod2hhdCB4dGVybSBkaWQpXFxuICAgICAgICAgICAgICAgICAgICAgICAgKVxcbiAgICAgICAgICAgICAgICAgICAgICAgIHwgICAgICAgICAgICAgICAgICAgICAgICAgICAjIGFsdGVybmF0ZSAoc2Vjb25kIGF0dGVtcHQpXFxuICAgICAgICAgICAgICAgICAgICAgICAgKCAgICAgICAgICAgICAgICAgICAgICAgICAgICMgaWxsZWdhbCBzZXF1ZW5jZVxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgW1xcMC1cXHUwMDA2XSAgICAgICAgICAgICAgICAgIyBhbnl0aGluZyBpbGxlZ2FsXFxuICAgICAgICAgICAgICAgICAgICAgICAgICB8ICAgICAgICAgICAgICAgICAgICAgICAgICAgIyBhbHRlcm5hdGVcXG4gICAgICAgICAgICAgICAgICAgICAgICAgIFtcXGItXFx1MDAxQV0gICAgICAgICAgICAgICAgICMgYW55dGhpbmcgaWxsZWdhbFxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgfCAgICAgICAgICAgICAgICAgICAgICAgICAgICMgYWx0ZXJuYXRlXFxuICAgICAgICAgICAgICAgICAgICAgICAgICBbXFx1MDAxQy1cXHUwMDFGXSAgICAgICAgICAgICAgICAgIyBhbnl0aGluZyBpbGxlZ2FsXFxuICAgICAgICAgICAgICAgICAgICAgICAgKVxcbiAgICAgICAgICAgICAgICAgICAgXCJdLCBbXCJcXG4gICAgICAgICAgICAgICAgICAgICAgICAoPzogICAgICAgICAgICAgICAgICAgICAgICAgIyBsZWdhbCBzZXF1ZW5jZVxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgKFxcXFx4MWJcXFxcXFxcXCkgICAgICAgICAgICAgICAgICAgICMgRVNDIFxcXFxcXG4gICAgICAgICAgICAgICAgICAgICAgICAgIHwgICAgICAgICAgICAgICAgICAgICAgICAgICAjIGFsdGVybmF0ZVxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgKFxcXFx4MDcpICAgICAgICAgICAgICAgICAgICAgICMgQkVMICh3aGF0IHh0ZXJtIGRpZClcXG4gICAgICAgICAgICAgICAgICAgICAgICApXFxuICAgICAgICAgICAgICAgICAgICAgICAgfCAgICAgICAgICAgICAgICAgICAgICAgICAgICMgYWx0ZXJuYXRlIChzZWNvbmQgYXR0ZW1wdClcXG4gICAgICAgICAgICAgICAgICAgICAgICAoICAgICAgICAgICAgICAgICAgICAgICAgICAgIyBpbGxlZ2FsIHNlcXVlbmNlXFxuICAgICAgICAgICAgICAgICAgICAgICAgICBbXFxcXHgwMC1cXFxceDA2XSAgICAgICAgICAgICAgICAgIyBhbnl0aGluZyBpbGxlZ2FsXFxuICAgICAgICAgICAgICAgICAgICAgICAgICB8ICAgICAgICAgICAgICAgICAgICAgICAgICAgIyBhbHRlcm5hdGVcXG4gICAgICAgICAgICAgICAgICAgICAgICAgIFtcXFxceDA4LVxcXFx4MWFdICAgICAgICAgICAgICAgICAjIGFueXRoaW5nIGlsbGVnYWxcXG4gICAgICAgICAgICAgICAgICAgICAgICAgIHwgICAgICAgICAgICAgICAgICAgICAgICAgICAjIGFsdGVybmF0ZVxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgW1xcXFx4MWMtXFxcXHgxZl0gICAgICAgICAgICAgICAgICMgYW55dGhpbmcgaWxsZWdhbFxcbiAgICAgICAgICAgICAgICAgICAgICAgIClcXG4gICAgICAgICAgICAgICAgICAgIFwiXSkpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB0aGlzLl9vc2Nfc3QubGFzdEluZGV4ID0gMDtcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBtYXRjaF8xID0gdGhpcy5fb3NjX3N0LmV4ZWModGhpcy5fYnVmZmVyKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKG1hdGNoXzEgPT09IG51bGwpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHBrdC5raW5kID0gUGFja2V0S2luZC5JbmNvbXBsZXRlO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHBrdDtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBpZiAobWF0Y2hfMVszXSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcGt0LmtpbmQgPSBQYWNrZXRLaW5kLkVTQztcbiAgICAgICAgICAgICAgICAgICAgICAgIHBrdC50ZXh0ID0gdGhpcy5fYnVmZmVyLnNsaWNlKDAsIDEpO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fYnVmZmVyID0gdGhpcy5fYnVmZmVyLnNsaWNlKDEpO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHBrdDtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBtYXRjaF8yID0gdGhpcy5fb3NjX3N0LmV4ZWModGhpcy5fYnVmZmVyKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKG1hdGNoXzIgPT09IG51bGwpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHBrdC5raW5kID0gUGFja2V0S2luZC5JbmNvbXBsZXRlO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHBrdDtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBpZiAobWF0Y2hfMlszXSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcGt0LmtpbmQgPSBQYWNrZXRLaW5kLkVTQztcbiAgICAgICAgICAgICAgICAgICAgICAgIHBrdC50ZXh0ID0gdGhpcy5fYnVmZmVyLnNsaWNlKDAsIDEpO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fYnVmZmVyID0gdGhpcy5fYnVmZmVyLnNsaWNlKDEpO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHBrdDtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAoIXRoaXMuX29zY19yZWdleCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9vc2NfcmVnZXggPSByZ3goX19tYWtlVGVtcGxhdGVPYmplY3QoW1wiXFxuICAgICAgICAgICAgICAgICAgICAgICAgXiAgICAgICAgICAgICAgICAgICAgICAgICAgICMgYmVnaW5uaW5nIG9mIGxpbmVcXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgI1xcbiAgICAgICAgICAgICAgICAgICAgICAgIFxcdTAwMUJdODsgICAgICAgICAgICAgICAgICAgICMgT1NDIEh5cGVybGlua1xcbiAgICAgICAgICAgICAgICAgICAgICAgIFsgLTo8LX5dKiAgICAgICAjIHBhcmFtcyAoZXhjbHVkaW5nIDspXFxuICAgICAgICAgICAgICAgICAgICAgICAgOyAgICAgICAgICAgICAgICAgICAgICAgICAgICMgZW5kIG9mIHBhcmFtc1xcbiAgICAgICAgICAgICAgICAgICAgICAgIChbIS1+XXswLDUxMn0pICAgICAgICAjIFVSTCBjYXB0dXJlXFxuICAgICAgICAgICAgICAgICAgICAgICAgKD86ICAgICAgICAgICAgICAgICAgICAgICAgICMgU1RcXG4gICAgICAgICAgICAgICAgICAgICAgICAgICg/OlxcdTAwMUJcXFxcKSAgICAgICAgICAgICAgICAgICMgRVNDICAgICAgICAgICAgICAgICAgICAgICAgICAgfCAgICAgICAgICAgICAgICAgICAgICAgICAgICMgYWx0ZXJuYXRlXFxuICAgICAgICAgICAgICAgICAgICAgICAgICAoPzpcXHUwMDA3KSAgICAgICAgICAgICAgICAgICAgIyBCRUwgKHdoYXQgeHRlcm0gZGlkKVxcbiAgICAgICAgICAgICAgICAgICAgICAgIClcXG4gICAgICAgICAgICAgICAgICAgICAgICAoWyEtfl0rKSAgICAgICAgICAgICAgIyBURVhUIGNhcHR1cmVcXG4gICAgICAgICAgICAgICAgICAgICAgICBcXHUwMDFCXTg7OyAgICAgICAgICAgICAgICAgICAjIE9TQyBIeXBlcmxpbmsgRW5kXFxuICAgICAgICAgICAgICAgICAgICAgICAgKD86ICAgICAgICAgICAgICAgICAgICAgICAgICMgU1RcXG4gICAgICAgICAgICAgICAgICAgICAgICAgICg/OlxcdTAwMUJcXFxcKSAgICAgICAgICAgICAgICAgICMgRVNDICAgICAgICAgICAgICAgICAgICAgICAgICAgfCAgICAgICAgICAgICAgICAgICAgICAgICAgICMgYWx0ZXJuYXRlXFxuICAgICAgICAgICAgICAgICAgICAgICAgICAoPzpcXHUwMDA3KSAgICAgICAgICAgICAgICAgICAgIyBCRUwgKHdoYXQgeHRlcm0gZGlkKVxcbiAgICAgICAgICAgICAgICAgICAgICAgIClcXG4gICAgICAgICAgICAgICAgICAgIFwiXSwgW1wiXFxuICAgICAgICAgICAgICAgICAgICAgICAgXiAgICAgICAgICAgICAgICAgICAgICAgICAgICMgYmVnaW5uaW5nIG9mIGxpbmVcXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgI1xcbiAgICAgICAgICAgICAgICAgICAgICAgIFxcXFx4MWJcXFxcXTg7ICAgICAgICAgICAgICAgICAgICAjIE9TQyBIeXBlcmxpbmtcXG4gICAgICAgICAgICAgICAgICAgICAgICBbXFxcXHgyMC1cXFxceDNhXFxcXHgzYy1cXFxceDdlXSogICAgICAgIyBwYXJhbXMgKGV4Y2x1ZGluZyA7KVxcbiAgICAgICAgICAgICAgICAgICAgICAgIDsgICAgICAgICAgICAgICAgICAgICAgICAgICAjIGVuZCBvZiBwYXJhbXNcXG4gICAgICAgICAgICAgICAgICAgICAgICAoW1xcXFx4MjEtXFxcXHg3ZV17MCw1MTJ9KSAgICAgICAgIyBVUkwgY2FwdHVyZVxcbiAgICAgICAgICAgICAgICAgICAgICAgICg/OiAgICAgICAgICAgICAgICAgICAgICAgICAjIFNUXFxuICAgICAgICAgICAgICAgICAgICAgICAgICAoPzpcXFxceDFiXFxcXFxcXFwpICAgICAgICAgICAgICAgICAgIyBFU0MgXFxcXFxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgfCAgICAgICAgICAgICAgICAgICAgICAgICAgICMgYWx0ZXJuYXRlXFxuICAgICAgICAgICAgICAgICAgICAgICAgICAoPzpcXFxceDA3KSAgICAgICAgICAgICAgICAgICAgIyBCRUwgKHdoYXQgeHRlcm0gZGlkKVxcbiAgICAgICAgICAgICAgICAgICAgICAgIClcXG4gICAgICAgICAgICAgICAgICAgICAgICAoW1xcXFx4MjEtXFxcXHg3ZV0rKSAgICAgICAgICAgICAgIyBURVhUIGNhcHR1cmVcXG4gICAgICAgICAgICAgICAgICAgICAgICBcXFxceDFiXFxcXF04OzsgICAgICAgICAgICAgICAgICAgIyBPU0MgSHlwZXJsaW5rIEVuZFxcbiAgICAgICAgICAgICAgICAgICAgICAgICg/OiAgICAgICAgICAgICAgICAgICAgICAgICAjIFNUXFxuICAgICAgICAgICAgICAgICAgICAgICAgICAoPzpcXFxceDFiXFxcXFxcXFwpICAgICAgICAgICAgICAgICAgIyBFU0MgXFxcXFxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgfCAgICAgICAgICAgICAgICAgICAgICAgICAgICMgYWx0ZXJuYXRlXFxuICAgICAgICAgICAgICAgICAgICAgICAgICAoPzpcXFxceDA3KSAgICAgICAgICAgICAgICAgICAgIyBCRUwgKHdoYXQgeHRlcm0gZGlkKVxcbiAgICAgICAgICAgICAgICAgICAgICAgIClcXG4gICAgICAgICAgICAgICAgICAgIFwiXSkpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB2YXIgbWF0Y2ggPSB0aGlzLl9idWZmZXIubWF0Y2godGhpcy5fb3NjX3JlZ2V4KTtcbiAgICAgICAgICAgICAgICBpZiAobWF0Y2ggPT09IG51bGwpIHtcbiAgICAgICAgICAgICAgICAgICAgcGt0LmtpbmQgPSBQYWNrZXRLaW5kLkVTQztcbiAgICAgICAgICAgICAgICAgICAgcGt0LnRleHQgPSB0aGlzLl9idWZmZXIuc2xpY2UoMCwgMSk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2J1ZmZlciA9IHRoaXMuX2J1ZmZlci5zbGljZSgxKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHBrdDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcGt0LmtpbmQgPSBQYWNrZXRLaW5kLk9TQ1VSTDtcbiAgICAgICAgICAgICAgICBwa3QudXJsID0gbWF0Y2hbMV07XG4gICAgICAgICAgICAgICAgcGt0LnRleHQgPSBtYXRjaFsyXTtcbiAgICAgICAgICAgICAgICB2YXIgcnBvcyA9IG1hdGNoWzBdLmxlbmd0aDtcbiAgICAgICAgICAgICAgICB0aGlzLl9idWZmZXIgPSB0aGlzLl9idWZmZXIuc2xpY2UocnBvcyk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHBrdDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH07XG4gICAgQW5zaVVwLnByb3RvdHlwZS5hbnNpX3RvX2h0bWwgPSBmdW5jdGlvbiAodHh0KSB7XG4gICAgICAgIHRoaXMuYXBwZW5kX2J1ZmZlcih0eHQpO1xuICAgICAgICB2YXIgYmxvY2tzID0gW107XG4gICAgICAgIHdoaWxlICh0cnVlKSB7XG4gICAgICAgICAgICB2YXIgcGFja2V0ID0gdGhpcy5nZXRfbmV4dF9wYWNrZXQoKTtcbiAgICAgICAgICAgIGlmICgocGFja2V0LmtpbmQgPT0gUGFja2V0S2luZC5FT1MpXG4gICAgICAgICAgICAgICAgfHwgKHBhY2tldC5raW5kID09IFBhY2tldEtpbmQuSW5jb21wbGV0ZSkpXG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBpZiAoKHBhY2tldC5raW5kID09IFBhY2tldEtpbmQuRVNDKVxuICAgICAgICAgICAgICAgIHx8IChwYWNrZXQua2luZCA9PSBQYWNrZXRLaW5kLlVua25vd24pKVxuICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgaWYgKHBhY2tldC5raW5kID09IFBhY2tldEtpbmQuVGV4dClcbiAgICAgICAgICAgICAgICBibG9ja3MucHVzaCh0aGlzLnRyYW5zZm9ybV90b19odG1sKHRoaXMud2l0aF9zdGF0ZShwYWNrZXQpKSk7XG4gICAgICAgICAgICBlbHNlIGlmIChwYWNrZXQua2luZCA9PSBQYWNrZXRLaW5kLlNHUilcbiAgICAgICAgICAgICAgICB0aGlzLnByb2Nlc3NfYW5zaShwYWNrZXQpO1xuICAgICAgICAgICAgZWxzZSBpZiAocGFja2V0LmtpbmQgPT0gUGFja2V0S2luZC5PU0NVUkwpXG4gICAgICAgICAgICAgICAgYmxvY2tzLnB1c2godGhpcy5wcm9jZXNzX2h5cGVybGluayhwYWNrZXQpKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gYmxvY2tzLmpvaW4oXCJcIik7XG4gICAgfTtcbiAgICBBbnNpVXAucHJvdG90eXBlLndpdGhfc3RhdGUgPSBmdW5jdGlvbiAocGt0KSB7XG4gICAgICAgIHJldHVybiB7IGJvbGQ6IHRoaXMuYm9sZCwgZmc6IHRoaXMuZmcsIGJnOiB0aGlzLmJnLCB0ZXh0OiBwa3QudGV4dCB9O1xuICAgIH07XG4gICAgQW5zaVVwLnByb3RvdHlwZS5wcm9jZXNzX2Fuc2kgPSBmdW5jdGlvbiAocGt0KSB7XG4gICAgICAgIHZhciBzZ3JfY21kcyA9IHBrdC50ZXh0LnNwbGl0KCc7Jyk7XG4gICAgICAgIHdoaWxlIChzZ3JfY21kcy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICB2YXIgc2dyX2NtZF9zdHIgPSBzZ3JfY21kcy5zaGlmdCgpO1xuICAgICAgICAgICAgdmFyIG51bSA9IHBhcnNlSW50KHNncl9jbWRfc3RyLCAxMCk7XG4gICAgICAgICAgICBpZiAoaXNOYU4obnVtKSB8fCBudW0gPT09IDApIHtcbiAgICAgICAgICAgICAgICB0aGlzLmZnID0gdGhpcy5iZyA9IG51bGw7XG4gICAgICAgICAgICAgICAgdGhpcy5ib2xkID0gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmIChudW0gPT09IDEpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmJvbGQgPSB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAobnVtID09PSAyMikge1xuICAgICAgICAgICAgICAgIHRoaXMuYm9sZCA9IGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAobnVtID09PSAzOSkge1xuICAgICAgICAgICAgICAgIHRoaXMuZmcgPSBudWxsO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAobnVtID09PSA0OSkge1xuICAgICAgICAgICAgICAgIHRoaXMuYmcgPSBudWxsO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAoKG51bSA+PSAzMCkgJiYgKG51bSA8IDM4KSkge1xuICAgICAgICAgICAgICAgIHRoaXMuZmcgPSB0aGlzLmFuc2lfY29sb3JzWzBdWyhudW0gLSAzMCldO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAoKG51bSA+PSA0MCkgJiYgKG51bSA8IDQ4KSkge1xuICAgICAgICAgICAgICAgIHRoaXMuYmcgPSB0aGlzLmFuc2lfY29sb3JzWzBdWyhudW0gLSA0MCldO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAoKG51bSA+PSA5MCkgJiYgKG51bSA8IDk4KSkge1xuICAgICAgICAgICAgICAgIHRoaXMuZmcgPSB0aGlzLmFuc2lfY29sb3JzWzFdWyhudW0gLSA5MCldO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAoKG51bSA+PSAxMDApICYmIChudW0gPCAxMDgpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5iZyA9IHRoaXMuYW5zaV9jb2xvcnNbMV1bKG51bSAtIDEwMCldO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAobnVtID09PSAzOCB8fCBudW0gPT09IDQ4KSB7XG4gICAgICAgICAgICAgICAgaWYgKHNncl9jbWRzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGlzX2ZvcmVncm91bmQgPSAobnVtID09PSAzOCk7XG4gICAgICAgICAgICAgICAgICAgIHZhciBtb2RlX2NtZCA9IHNncl9jbWRzLnNoaWZ0KCk7XG4gICAgICAgICAgICAgICAgICAgIGlmIChtb2RlX2NtZCA9PT0gJzUnICYmIHNncl9jbWRzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBwYWxldHRlX2luZGV4ID0gcGFyc2VJbnQoc2dyX2NtZHMuc2hpZnQoKSwgMTApO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHBhbGV0dGVfaW5kZXggPj0gMCAmJiBwYWxldHRlX2luZGV4IDw9IDI1NSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpc19mb3JlZ3JvdW5kKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmZnID0gdGhpcy5wYWxldHRlXzI1NltwYWxldHRlX2luZGV4XTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuYmcgPSB0aGlzLnBhbGV0dGVfMjU2W3BhbGV0dGVfaW5kZXhdO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGlmIChtb2RlX2NtZCA9PT0gJzInICYmIHNncl9jbWRzLmxlbmd0aCA+IDIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciByID0gcGFyc2VJbnQoc2dyX2NtZHMuc2hpZnQoKSwgMTApO1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGcgPSBwYXJzZUludChzZ3JfY21kcy5zaGlmdCgpLCAxMCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgYiA9IHBhcnNlSW50KHNncl9jbWRzLnNoaWZ0KCksIDEwKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICgociA+PSAwICYmIHIgPD0gMjU1KSAmJiAoZyA+PSAwICYmIGcgPD0gMjU1KSAmJiAoYiA+PSAwICYmIGIgPD0gMjU1KSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBjID0geyByZ2I6IFtyLCBnLCBiXSwgY2xhc3NfbmFtZTogJ3RydWVjb2xvcicgfTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoaXNfZm9yZWdyb3VuZClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5mZyA9IGM7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmJnID0gYztcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH07XG4gICAgQW5zaVVwLnByb3RvdHlwZS50cmFuc2Zvcm1fdG9faHRtbCA9IGZ1bmN0aW9uIChmcmFnbWVudCkge1xuICAgICAgICB2YXIgdHh0ID0gZnJhZ21lbnQudGV4dDtcbiAgICAgICAgaWYgKHR4dC5sZW5ndGggPT09IDApXG4gICAgICAgICAgICByZXR1cm4gdHh0O1xuICAgICAgICBpZiAodGhpcy5fZXNjYXBlX2Zvcl9odG1sKVxuICAgICAgICAgICAgdHh0ID0gdGhpcy5lc2NhcGVfdHh0X2Zvcl9odG1sKHR4dCk7XG4gICAgICAgIGlmICghZnJhZ21lbnQuYm9sZCAmJiBmcmFnbWVudC5mZyA9PT0gbnVsbCAmJiBmcmFnbWVudC5iZyA9PT0gbnVsbClcbiAgICAgICAgICAgIHJldHVybiB0eHQ7XG4gICAgICAgIHZhciBzdHlsZXMgPSBbXTtcbiAgICAgICAgdmFyIGNsYXNzZXMgPSBbXTtcbiAgICAgICAgdmFyIGZnID0gZnJhZ21lbnQuZmc7XG4gICAgICAgIHZhciBiZyA9IGZyYWdtZW50LmJnO1xuICAgICAgICBpZiAoZnJhZ21lbnQuYm9sZClcbiAgICAgICAgICAgIHN0eWxlcy5wdXNoKCdmb250LXdlaWdodDpib2xkJyk7XG4gICAgICAgIGlmICghdGhpcy5fdXNlX2NsYXNzZXMpIHtcbiAgICAgICAgICAgIGlmIChmZylcbiAgICAgICAgICAgICAgICBzdHlsZXMucHVzaChcImNvbG9yOnJnYihcIiArIGZnLnJnYi5qb2luKCcsJykgKyBcIilcIik7XG4gICAgICAgICAgICBpZiAoYmcpXG4gICAgICAgICAgICAgICAgc3R5bGVzLnB1c2goXCJiYWNrZ3JvdW5kLWNvbG9yOnJnYihcIiArIGJnLnJnYiArIFwiKVwiKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGlmIChmZykge1xuICAgICAgICAgICAgICAgIGlmIChmZy5jbGFzc19uYW1lICE9PSAndHJ1ZWNvbG9yJykge1xuICAgICAgICAgICAgICAgICAgICBjbGFzc2VzLnB1c2goZmcuY2xhc3NfbmFtZSArIFwiLWZnXCIpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgc3R5bGVzLnB1c2goXCJjb2xvcjpyZ2IoXCIgKyBmZy5yZ2Iuam9pbignLCcpICsgXCIpXCIpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChiZykge1xuICAgICAgICAgICAgICAgIGlmIChiZy5jbGFzc19uYW1lICE9PSAndHJ1ZWNvbG9yJykge1xuICAgICAgICAgICAgICAgICAgICBjbGFzc2VzLnB1c2goYmcuY2xhc3NfbmFtZSArIFwiLWJnXCIpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgc3R5bGVzLnB1c2goXCJiYWNrZ3JvdW5kLWNvbG9yOnJnYihcIiArIGJnLnJnYi5qb2luKCcsJykgKyBcIilcIik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHZhciBjbGFzc19zdHJpbmcgPSAnJztcbiAgICAgICAgdmFyIHN0eWxlX3N0cmluZyA9ICcnO1xuICAgICAgICBpZiAoY2xhc3Nlcy5sZW5ndGgpXG4gICAgICAgICAgICBjbGFzc19zdHJpbmcgPSBcIiBjbGFzcz1cXFwiXCIgKyBjbGFzc2VzLmpvaW4oJyAnKSArIFwiXFxcIlwiO1xuICAgICAgICBpZiAoc3R5bGVzLmxlbmd0aClcbiAgICAgICAgICAgIHN0eWxlX3N0cmluZyA9IFwiIHN0eWxlPVxcXCJcIiArIHN0eWxlcy5qb2luKCc7JykgKyBcIlxcXCJcIjtcbiAgICAgICAgcmV0dXJuIFwiPHNwYW5cIiArIHN0eWxlX3N0cmluZyArIGNsYXNzX3N0cmluZyArIFwiPlwiICsgdHh0ICsgXCI8L3NwYW4+XCI7XG4gICAgfTtcbiAgICA7XG4gICAgQW5zaVVwLnByb3RvdHlwZS5wcm9jZXNzX2h5cGVybGluayA9IGZ1bmN0aW9uIChwa3QpIHtcbiAgICAgICAgdmFyIHBhcnRzID0gcGt0LnVybC5zcGxpdCgnOicpO1xuICAgICAgICBpZiAocGFydHMubGVuZ3RoIDwgMSlcbiAgICAgICAgICAgIHJldHVybiAnJztcbiAgICAgICAgaWYgKCF0aGlzLl91cmxfd2hpdGVsaXN0W3BhcnRzWzBdXSlcbiAgICAgICAgICAgIHJldHVybiAnJztcbiAgICAgICAgdmFyIHJlc3VsdCA9IFwiPGEgaHJlZj1cXFwiXCIgKyB0aGlzLmVzY2FwZV90eHRfZm9yX2h0bWwocGt0LnVybCkgKyBcIlxcXCI+XCIgKyB0aGlzLmVzY2FwZV90eHRfZm9yX2h0bWwocGt0LnRleHQpICsgXCI8L2E+XCI7XG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfTtcbiAgICByZXR1cm4gQW5zaVVwO1xufSgpKTtcbmZ1bmN0aW9uIHJneCh0bXBsT2JqKSB7XG4gICAgdmFyIHN1YnN0ID0gW107XG4gICAgZm9yICh2YXIgX2kgPSAxOyBfaSA8IGFyZ3VtZW50cy5sZW5ndGg7IF9pKyspIHtcbiAgICAgICAgc3Vic3RbX2kgLSAxXSA9IGFyZ3VtZW50c1tfaV07XG4gICAgfVxuICAgIHZhciByZWdleFRleHQgPSB0bXBsT2JqLnJhd1swXTtcbiAgICB2YXIgd3NyZ3ggPSAvXlxccyt8XFxzK1xcbnxcXHMqI1tcXHNcXFNdKj9cXG58XFxuL2dtO1xuICAgIHZhciB0eHQyID0gcmVnZXhUZXh0LnJlcGxhY2Uod3NyZ3gsICcnKTtcbiAgICByZXR1cm4gbmV3IFJlZ0V4cCh0eHQyKTtcbn1cbmZ1bmN0aW9uIHJneEcodG1wbE9iaikge1xuICAgIHZhciBzdWJzdCA9IFtdO1xuICAgIGZvciAodmFyIF9pID0gMTsgX2kgPCBhcmd1bWVudHMubGVuZ3RoOyBfaSsrKSB7XG4gICAgICAgIHN1YnN0W19pIC0gMV0gPSBhcmd1bWVudHNbX2ldO1xuICAgIH1cbiAgICB2YXIgcmVnZXhUZXh0ID0gdG1wbE9iai5yYXdbMF07XG4gICAgdmFyIHdzcmd4ID0gL15cXHMrfFxccytcXG58XFxzKiNbXFxzXFxTXSo/XFxufFxcbi9nbTtcbiAgICB2YXIgdHh0MiA9IHJlZ2V4VGV4dC5yZXBsYWNlKHdzcmd4LCAnJyk7XG4gICAgcmV0dXJuIG5ldyBSZWdFeHAodHh0MiwgJ2cnKTtcbn1cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWFuc2lfdXAuanMubWFwXG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuICAgIGV4cG9ydHMuZGVmYXVsdCA9IEFuc2lVcDtcbn0pKTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL25vZGVfbW9kdWxlcy9hbnNpX3VwL2Fuc2lfdXAuanMiLCJpbXBvcnQgeyBTZXJ2aWNlIH0gZnJvbSBcIi4uL2NvbW1vbi9hcGlcIjtcblxuY29uc3QgQkFTRV9VUkwgPSBcIi96ZXJvYm90L2FkbWluL2FjdG9ycy9hbGVydGFcIjtcblxuY2xhc3MgQWxlcnRzU2VydmljZSBleHRlbmRzIFNlcnZpY2Uge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICBzdXBlcihCQVNFX1VSTCk7XG4gICAgfVxuXG4gICAgbGlzdCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0Q2FsbChcImxpc3RfYWxlcnRzXCIpO1xuICAgIH1cblxuICAgIGRlbGV0ZShpZGVudGlmaWVycykge1xuICAgICAgICByZXR1cm4gdGhpcy5wb3N0Q2FsbChcImRlbGV0ZV9hbGVydHNcIiwge1xuICAgICAgICAgICAgaWRlbnRpZmllcnM6IGlkZW50aWZpZXJzXG4gICAgICAgIH0pO1xuICAgIH1cbn1cblxuZXhwb3J0IGNvbnN0IGFsZXJ0cyA9IG5ldyBBbGVydHNTZXJ2aWNlKCk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zb3VyY2VzL3NlcnZpY2VzL2FsZXJ0cy5qcyIsImltcG9ydCB7IFNlcnZpY2UgfSBmcm9tIFwiLi4vY29tbW9uL2FwaVwiO1xuXG5jb25zdCBCQVNFX1VSTCA9IFwiL3plcm9ib3Qvd2ViaW50ZXJmYWNlL2FjdG9ycy9pZGVudGl0eVwiO1xuXG5cbmNsYXNzIElkZW50aXR5U2VydmljZSBleHRlbmRzIFNlcnZpY2Uge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICBzdXBlcihCQVNFX1VSTCk7XG4gICAgfVxuXG5cbiAgICBnZXRfaWRlbnRpdHkoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmdldENhbGwoXCJ0aHJlZWJvdF9uYW1lXCIpO1xuICAgIH1cblxuXG59XG5cbmV4cG9ydCBjb25zdCBpZGVudGl0eSA9IG5ldyBJZGVudGl0eVNlcnZpY2UoKTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NvdXJjZXMvc2VydmljZXMvaWRlbnRpdHkuanMiLCJpbXBvcnQgeyBTZXJ2aWNlIH0gZnJvbSBcIi4uL2NvbW1vbi9hcGlcIjtcblxuY29uc3QgQkFTRV9VUkwgPSBcIi90ZmdyaWRfc29sdXRpb25zL3RmZ3JpZF9zb2x1dGlvbnMvYWN0b3JzL3RmZ3JpZF9zb2x1dGlvbnNcIjtcblxuXG5jbGFzcyBTb2x1dGlvbnNTZXJ2aWNlIGV4dGVuZHMgU2VydmljZSB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHN1cGVyKEJBU0VfVVJMKTtcbiAgICB9XG5cblxuICAgIGxpc3Qob3B0cykge1xuICAgICAgICBvcHRzID0gb3B0cyB8fCB7fTtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0Q2FsbChcInNvbHV0aW9uc19saXN0XCIpO1xuICAgIH1cblxuXG4gICAgZGVsZXRlKHNvbHV0aW9uVHlwZSwgc29sdXRpb25OYW1lKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnBvc3RDYWxsKFwic29sdXRpb25fZGVsZXRlXCIsIHsgc29sdXRpb25fdHlwZTogc29sdXRpb25UeXBlLCBzb2x1dGlvbl9uYW1lOiBzb2x1dGlvbk5hbWUgfSk7XG5cbiAgICB9XG5cbn1cblxuZXhwb3J0IGNvbnN0IHNvbHV0aW9ucyA9IG5ldyBTb2x1dGlvbnNTZXJ2aWNlKCk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zb3VyY2VzL3NlcnZpY2VzL2RlcGxveWVkU29sdXRpb25zLmpzIiwiaW1wb3J0IHsgU2VydmljZSB9IGZyb20gXCIuLi9jb21tb24vYXBpXCI7XG5cbmNvbnN0IEJBU0VfVVJMID0gXCIvemVyb2JvdC9hZG1pbi9hY3RvcnMvbG9nc1wiO1xuXG5jbGFzcyBMb2dzU2VydmljZSBleHRlbmRzIFNlcnZpY2Uge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICBzdXBlcihCQVNFX1VSTCk7XG4gICAgfVxuXG4gICAgbGlzdEFwcHMoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmdldENhbGwoXCJsaXN0X2FwcHNcIik7XG4gICAgfVxuXG4gICAgbGlzdChhcHBOYW1lLCBsb2dJZCkge1xuICAgICAgICByZXR1cm4gdGhpcy5wb3N0Q2FsbChcImxpc3RcIiwge1xuICAgICAgICAgICAgYXBwbmFtZTogYXBwTmFtZSxcbiAgICAgICAgICAgIGlkX2Zyb206IGxvZ0lkXG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGRlbGV0ZShhcHBuYW1lKXtcbiAgICAgICAgcmV0dXJuIHRoaXMucG9zdENhbGwoXCJkZWxldGVcIix7XG4gICAgICAgICAgICBhcHBuYW1lOiBhcHBuYW1lXG4gICAgICAgIH0pXG4gICAgfVxuXG4gICAgZGVsZXRlQWxsKCl7XG4gICAgICAgIHJldHVybiB0aGlzLnBvc3RDYWxsKFwiZGVsZXRlXCIpXG4gICAgfVxuXG4gICAgZGVsZXRlU2VsZWN0ZWQoaWRzKXtcbiAgICAgICAgcmV0dXJuIHRoaXMucG9zdENhbGwoXCJkZWxldGVfc2VsZWN0ZWRcIix7aWRzfSlcbiAgICB9XG59XG5cbmV4cG9ydCBjb25zdCBsb2dzID0gbmV3IExvZ3NTZXJ2aWNlKCk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zb3VyY2VzL3NlcnZpY2VzL2xvZ3MuanMiLCJpbXBvcnQgeyBTZXJ2aWNlIH0gZnJvbSBcIi4uL2NvbW1vbi9hcGlcIjtcblxuY29uc3QgQkFTRV9VUkwgPSBcIi9hdXRoXCI7XG5cbmNsYXNzIEF1dGhTZXJ2aWNlIGV4dGVuZHMgU2VydmljZSB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHN1cGVyKEJBU0VfVVJMKTtcbiAgICB9XG5cbiAgICBnZXRDdXJyZW50VXNlcigpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0Q2FsbChcImF1dGhvcml6ZWRcIik7XG4gICAgfVxuXG4gICAgbG9nb3V0KCkge1xuICAgICAgICBjb25zdCBuZXh0VXJsID0gd2luZG93LmxvY2F0aW9uLnBhdGhuYW1lICsgd2luZG93LmxvY2F0aW9uLmhhc2g7XG4gICAgICAgIHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gYC9hdXRoL2xvZ291dD9uZXh0X3VybD0ke25leHRVcmx9YDtcbiAgICB9XG59XG5cbmV4cG9ydCBjb25zdCBhdXRoID0gbmV3IEF1dGhTZXJ2aWNlKCk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zb3VyY2VzL3NlcnZpY2VzL2F1dGguanMiLCJleHBvcnQgZnVuY3Rpb24gaW5wdXREaWFsb2coaGVhZCwgbGFiZWwsIGJ1dHRvbkxhYmVsLCBjYWxsYmFjaykge1xuICAgIGNvbnN0IHdpbmRvdyA9IHdlYml4LnVpKHtcbiAgICAgICAgdmlldzogXCJ3aW5kb3dcIixcbiAgICAgICAgd2lkdGg6IHdpbmRvdy5pbm5lcldpZHRoICogLjgsXG4gICAgICAgIGhlaWdodDogd2luZG93LmlubmVySGVpZ2h0ICogLjgsXG4gICAgICAgIG1vZGFsOiB0cnVlLFxuICAgICAgICBwb3NpdGlvbjogXCJjZW50ZXJcIixcbiAgICAgICAgaGVhZDogaGVhZCB8fCBcIklucHV0XCIsXG4gICAgICAgIGJvZHk6IHtcbiAgICAgICAgICAgIHZpZXc6IFwiZm9ybVwiLFxuICAgICAgICAgICAgZWxlbWVudHM6IFt7XG4gICAgICAgICAgICAgICAgaWQ6IFwiaW5wdXRfZGlhbG9nX3RleHRcIixcbiAgICAgICAgICAgICAgICB2aWV3OiBcInRleHRcIixcbiAgICAgICAgICAgICAgICBuYW1lOiBcImlucHV0XCIsXG4gICAgICAgICAgICAgICAgbGFiZWw6IGxhYmVsIHx8IFwiVmFsdWVcIixcbiAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICBjb2xzOiBbe1xuICAgICAgICAgICAgICAgICAgICB2aWV3OiBcImJ1dHRvblwiLFxuICAgICAgICAgICAgICAgICAgICBsYWJlbDogXCJDYW5jZWxcIixcbiAgICAgICAgICAgICAgICAgICAgY2xpY2s6ICgpID0+IHdpbmRvdy5oaWRlKCksXG4gICAgICAgICAgICAgICAgICAgIGNzczogXCJ3ZWJpeF9kYW5nZXJcIlxuICAgICAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICAgICAgdmlldzogXCJidXR0b25cIixcbiAgICAgICAgICAgICAgICAgICAgbGFiZWw6IGJ1dHRvbkxhYmVsIHx8IFwiT2tcIixcbiAgICAgICAgICAgICAgICAgICAgY2xpY2s6IGhhbmRsZUlucHV0LFxuICAgICAgICAgICAgICAgICAgICBjc3M6IFwid2ViaXhfcHJpbWFyeVwiXG4gICAgICAgICAgICAgICAgfV1cbiAgICAgICAgICAgIH1dXG4gICAgICAgIH1cbiAgICB9KTtcblxuICAgIGZ1bmN0aW9uIGhhbmRsZUlucHV0KCkge1xuICAgICAgICBjb25zdCB2YWx1ZSA9IHRoaXMuZ2V0Rm9ybVZpZXcoKS5lbGVtZW50cy5pbnB1dC5nZXRWYWx1ZSgpLnRyaW0oKTtcbiAgICAgICAgaWYgKCF2YWx1ZSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGNhbGxiYWNrIGluc3RhbmNlb2YgRnVuY3Rpb24pIHtcbiAgICAgICAgICAgIGNhbGxiYWNrKHZhbHVlKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHdpbmRvdy5oaWRlKCk7XG4gICAgfVxuXG5cbiAgICBjb25zdCB0ZXh0SW5wdXQgPSAkJChcImlucHV0X2RpYWxvZ190ZXh0XCIpO1xuICAgIHRleHRJbnB1dC5hdHRhY2hFdmVudChcIm9uRW50ZXJcIiwgaGFuZGxlSW5wdXQuYmluZCh0ZXh0SW5wdXQpKTtcblxuICAgIHdpbmRvdy5zaG93KCk7XG4gICAgd2ViaXguVUlNYW5hZ2VyLnNldEZvY3VzKHRleHRJbnB1dCk7XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zb3VyY2VzL2NvbW1vbi9kaWFsb2dzLmpzIiwiaW1wb3J0IHsgU2VydmljZSB9IGZyb20gXCIuLi9jb21tb24vYXBpXCI7XG5cbmNvbnN0IEJBU0VfVVJMID0gXCIvemVyb2JvdC93ZWJpbnRlcmZhY2UvYWN0b3JzL21kYm9va1wiO1xuXG5jbGFzcyBXaWtpc1NlcnZpY2UgZXh0ZW5kcyBTZXJ2aWNlIHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgc3VwZXIoQkFTRV9VUkwpO1xuICAgIH1cblxuICAgIGxpc3Qob3B0cykge1xuICAgICAgICBvcHRzID0gb3B0cyB8fCB7fTtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0Q2FsbChcImJvb2tzX2xpc3RcIik7XG4gICAgfVxufVxuXG5cbmV4cG9ydCBjb25zdCBwYWNrYWdlcyA9IG5ldyBXaWtpc1NlcnZpY2UoKTtcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zb3VyY2VzL3NlcnZpY2VzL3dpa2kuanMiLCJ2YXIgbWFwID0ge1xuXHRcIi4vZW5cIjogNTUsXG5cdFwiLi9lbi5qc1wiOiA1NVxufTtcbmZ1bmN0aW9uIHdlYnBhY2tDb250ZXh0KHJlcSkge1xuXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyh3ZWJwYWNrQ29udGV4dFJlc29sdmUocmVxKSk7XG59O1xuZnVuY3Rpb24gd2VicGFja0NvbnRleHRSZXNvbHZlKHJlcSkge1xuXHR2YXIgaWQgPSBtYXBbcmVxXTtcblx0aWYoIShpZCArIDEpKSAvLyBjaGVjayBmb3IgbnVtYmVyIG9yIHN0cmluZ1xuXHRcdHRocm93IG5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIgKyByZXEgKyBcIicuXCIpO1xuXHRyZXR1cm4gaWQ7XG59O1xud2VicGFja0NvbnRleHQua2V5cyA9IGZ1bmN0aW9uIHdlYnBhY2tDb250ZXh0S2V5cygpIHtcblx0cmV0dXJuIE9iamVjdC5rZXlzKG1hcCk7XG59O1xud2VicGFja0NvbnRleHQucmVzb2x2ZSA9IHdlYnBhY2tDb250ZXh0UmVzb2x2ZTtcbm1vZHVsZS5leHBvcnRzID0gd2VicGFja0NvbnRleHQ7XG53ZWJwYWNrQ29udGV4dC5pZCA9IDY3O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vc291cmNlcy9sb2NhbGVzIF5cXC5cXC8uKiRcbi8vIG1vZHVsZSBpZCA9IDY3XG4vLyBtb2R1bGUgY2h1bmtzID0gMCJdLCJzb3VyY2VSb290IjoiIn0=