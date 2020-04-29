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
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_webix_jet__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__common_colors__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__data__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__common_formatters__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__services_alerts__ = __webpack_require__(60);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__alert__ = __webpack_require__(24);
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
/* 9 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__external__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_admin__ = __webpack_require__(25);
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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_taiga__ = __webpack_require__(26);
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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_taiga__ = __webpack_require__(26);
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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_taiga__ = __webpack_require__(26);
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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_deployedSolutions__ = __webpack_require__(62);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__reservation__ = __webpack_require__(28);
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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__appLogs__ = __webpack_require__(29);
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
/* 19 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_webix_jet__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__errors_dialog__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_packages__ = __webpack_require__(40);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__packageDetails__ = __webpack_require__(32);
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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__admins__ = __webpack_require__(33);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__general__ = __webpack_require__(34);
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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__walletForm__ = __webpack_require__(35);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__walletDetails__ = __webpack_require__(37);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__importForm__ = __webpack_require__(38);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__services_wallet__ = __webpack_require__(36);
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
                self.wallets_table.showProgress({ hide: true });
                self.WalletDetailsView.showInfo(info);
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
/* 23 */
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
/* 24 */
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
/* 25 */
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
/* 26 */
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
/* 27 */
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
/* 28 */
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
/* 29 */
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
/* 30 */
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
/* 31 */
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
/* 32 */
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
/* 33 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_webix_jet__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__common_dialogs__ = __webpack_require__(65);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_admin__ = __webpack_require__(25);
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
/* 34 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_webix_jet__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_admin__ = __webpack_require__(25);
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
/* 35 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_webix_jet__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_wallet__ = __webpack_require__(36);
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
            webix.message({ type: "error", text: "Could not create wallet" });
            _this2.form.showProgress({ hide: true });
            _this2.form.getTopParentView().hide();
            _this2.app.refresh();
        });
    };

    return WalletFormView;
}(__WEBPACK_IMPORTED_MODULE_0_webix_jet__["b" /* JetView */]);

/* harmony default export */ __webpack_exports__["default"] = (WalletFormView);

/***/ }),
/* 36 */
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

    WalletService.prototype.importWallet = function importWallet(name, secret, network) {
        return this.postCall("import_wallet", { name: name, secret: secret, network: network });
    };

    return WalletService;
}(__WEBPACK_IMPORTED_MODULE_0__common_api__["a" /* Service */]);

var wallet = new WalletService();

/***/ }),
/* 37 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_webix_jet__ = __webpack_require__(0);
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
                    view: "button",
                    id: "secret_btn",
                    value: "Show Secret",
                    css: "webix_primary",
                    click: function click() {
                        this.$scope.showSecret();
                    }
                }, {
                    view: "button",
                    value: "OK",
                    css: "webix_primary",
                    click: function click() {
                        $$("secret_btn").enable();
                        this.getTopParentView().hide();
                    }
                }]
            }
        };
    };

    WalletDetailsView.prototype.init = function init() {
        var self = this;
        self.info = this.$$("wallet_info");
        self.secret_btn = this.$$("secret_btn");
        self.secret = "";
    };

    WalletDetailsView.prototype.showSecret = function showSecret() {
        var self = this;

        self.info.add({
            key: 'Secret',
            value: self.secret
        });
        self.secret_btn.disable();
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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_wallet__ = __webpack_require__(36);
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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__processDetails__ = __webpack_require__(27);
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
                value: '<span><img class="solutions-icon" src="static/img/k8s.png"/>Kubernetes cluster</span>'
            }, {
                id: "domain_delegation",
                value: '<span><img class="solutions-icon" src="static/img/dns.png"/>Domain delagation</span>'
            }, {
                id: "solution_expose",
                value: 'Solution expose',
                icon: 'mdi mdi-network'
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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__jobDetails__ = __webpack_require__(30);
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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__workerDetails__ = __webpack_require__(31);
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
/* 53 */
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
	"./alerts": 8,
	"./alerts/": 8,
	"./alerts/alert": 24,
	"./alerts/alert.js": 24,
	"./alerts/data": 7,
	"./alerts/data.js": 7,
	"./alerts/index": 8,
	"./alerts/index.js": 8,
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
	"./dash/diskSpace": 41,
	"./dash/diskSpace.js": 41,
	"./dash/health": 42,
	"./dash/health.js": 42,
	"./dash/index": 14,
	"./dash/index.js": 14,
	"./dash/jsxInfo": 43,
	"./dash/jsxInfo.js": 43,
	"./dash/processDetails": 27,
	"./dash/processDetails.js": 27,
	"./dash/processes": 44,
	"./dash/processes.js": 44,
	"./dash/processesList": 45,
	"./dash/processesList.js": 45,
	"./dash/runningPorts": 46,
	"./dash/runningPorts.js": 46,
	"./deployedSolutions": 15,
	"./deployedSolutions/": 15,
	"./deployedSolutions/index": 15,
	"./deployedSolutions/index.js": 15,
	"./deployedSolutions/reservation": 28,
	"./deployedSolutions/reservation.js": 28,
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
	"./logs/appLogs": 29,
	"./logs/appLogs.js": 29,
	"./logs/index": 18,
	"./logs/index.js": 18,
	"./main": 47,
	"./main.js": 47,
	"./myjobs/jobDetails": 30,
	"./myjobs/jobDetails.js": 30,
	"./myjobs/jobs": 48,
	"./myjobs/jobs.js": 48,
	"./myjobs/workerDetails": 31,
	"./myjobs/workerDetails.js": 31,
	"./myjobs/workers": 50,
	"./myjobs/workers.js": 50,
	"./packages": 19,
	"./packages/": 19,
	"./packages/index": 19,
	"./packages/index.js": 19,
	"./packages/packageDetails": 32,
	"./packages/packageDetails.js": 32,
	"./sdkexamples": 20,
	"./sdkexamples/": 20,
	"./sdkexamples/index": 20,
	"./sdkexamples/index.js": 20,
	"./settings": 21,
	"./settings/": 21,
	"./settings/admins": 33,
	"./settings/admins.js": 33,
	"./settings/general": 34,
	"./settings/general.js": 34,
	"./settings/index": 21,
	"./settings/index.js": 21,
	"./solutions/chatflow": 51,
	"./solutions/chatflow.js": 51,
	"./tfwikis/tfgridsdk": 52,
	"./tfwikis/tfgridsdk.js": 52,
	"./tfwikis/threefold": 53,
	"./tfwikis/threefold.js": 53,
	"./walletsManager": 22,
	"./walletsManager/": 22,
	"./walletsManager/importForm": 38,
	"./walletsManager/importForm.js": 38,
	"./walletsManager/index": 22,
	"./walletsManager/index.js": 22,
	"./walletsManager/walletDetails": 37,
	"./walletsManager/walletDetails.js": 37,
	"./walletsManager/walletForm": 35,
	"./walletsManager/walletForm.js": 35,
	"./wikis": 23,
	"./wikis/": 23,
	"./wikis/index": 23,
	"./wikis/index.js": 23,
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgYjhiNzYyYjczODYxOWZjYjExOGEiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3dlYml4LWpldC9kaXN0L2VzNi9qZXQuanMiLCJ3ZWJwYWNrOi8vLy4vc291cmNlcy92aWV3cy9leHRlcm5hbC9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9zb3VyY2VzL2NvbW1vbi9hcGkuanMiLCJ3ZWJwYWNrOi8vLy4vc291cmNlcy92aWV3cy9lcnJvcnMvZGlhbG9nLmpzIiwid2VicGFjazovLy8uL3NvdXJjZXMvY29tbW9uL2Zvcm1hdHRlcnMuanMiLCJ3ZWJwYWNrOi8vLy4vc291cmNlcy9zZXJ2aWNlcy9oZWFsdGguanMiLCJ3ZWJwYWNrOi8vLy4vc291cmNlcy9jb21tb24vY29sb3JzLmpzIiwid2VicGFjazovLy8uL3NvdXJjZXMvdmlld3MvYWxlcnRzL2RhdGEuanMiLCJ3ZWJwYWNrOi8vLy4vc291cmNlcy92aWV3cy9hbGVydHMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vc291cmNlcy92aWV3cy9jYXBhY2l0eS9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9zb3VyY2VzL3ZpZXdzL2NpcmNsZXMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vc291cmNlcy92aWV3cy9jaXJjbGVzdG9yaWVzL2luZGV4LmpzIiwid2VicGFjazovLy8uL3NvdXJjZXMvdmlld3MvY2lyY2xldGFza3MvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vc291cmNlcy92aWV3cy9jb2Rlc2VydmVyL2luZGV4LmpzIiwid2VicGFjazovLy8uL3NvdXJjZXMvdmlld3MvZGFzaC9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9zb3VyY2VzL3ZpZXdzL2RlcGxveWVkU29sdXRpb25zL2luZGV4LmpzIiwid2VicGFjazovLy8uL3NvdXJjZXMvdmlld3MvZmFybW1hbmFnZW1lbnQvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vc291cmNlcy92aWV3cy9qdXB5dGVyL2luZGV4LmpzIiwid2VicGFjazovLy8uL3NvdXJjZXMvdmlld3MvbG9ncy9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9zb3VyY2VzL3ZpZXdzL3BhY2thZ2VzL2luZGV4LmpzIiwid2VicGFjazovLy8uL3NvdXJjZXMvdmlld3Mvc2RrZXhhbXBsZXMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vc291cmNlcy92aWV3cy9zZXR0aW5ncy9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9zb3VyY2VzL3ZpZXdzL3dhbGxldHNNYW5hZ2VyL2luZGV4LmpzIiwid2VicGFjazovLy8uL3NvdXJjZXMvdmlld3Mvd2lraXMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vc291cmNlcy92aWV3cy9hbGVydHMvYWxlcnQuanMiLCJ3ZWJwYWNrOi8vLy4vc291cmNlcy9zZXJ2aWNlcy9hZG1pbi5qcyIsIndlYnBhY2s6Ly8vLi9zb3VyY2VzL3NlcnZpY2VzL3RhaWdhLmpzIiwid2VicGFjazovLy8uL3NvdXJjZXMvdmlld3MvZGFzaC9wcm9jZXNzRGV0YWlscy5qcyIsIndlYnBhY2s6Ly8vLi9zb3VyY2VzL3ZpZXdzL2RlcGxveWVkU29sdXRpb25zL3Jlc2VydmF0aW9uLmpzIiwid2VicGFjazovLy8uL3NvdXJjZXMvdmlld3MvbG9ncy9hcHBMb2dzLmpzIiwid2VicGFjazovLy8uL3NvdXJjZXMvdmlld3MvbXlqb2JzL2pvYkRldGFpbHMuanMiLCJ3ZWJwYWNrOi8vLy4vc291cmNlcy92aWV3cy9teWpvYnMvd29ya2VyRGV0YWlscy5qcyIsIndlYnBhY2s6Ly8vLi9zb3VyY2VzL3ZpZXdzL3BhY2thZ2VzL3BhY2thZ2VEZXRhaWxzLmpzIiwid2VicGFjazovLy8uL3NvdXJjZXMvdmlld3Mvc2V0dGluZ3MvYWRtaW5zLmpzIiwid2VicGFjazovLy8uL3NvdXJjZXMvdmlld3Mvc2V0dGluZ3MvZ2VuZXJhbC5qcyIsIndlYnBhY2s6Ly8vLi9zb3VyY2VzL3ZpZXdzL3dhbGxldHNNYW5hZ2VyL3dhbGxldEZvcm0uanMiLCJ3ZWJwYWNrOi8vLy4vc291cmNlcy9zZXJ2aWNlcy93YWxsZXQuanMiLCJ3ZWJwYWNrOi8vLy4vc291cmNlcy92aWV3cy93YWxsZXRzTWFuYWdlci93YWxsZXREZXRhaWxzLmpzIiwid2VicGFjazovLy8uL3NvdXJjZXMvdmlld3Mvd2FsbGV0c01hbmFnZXIvaW1wb3J0Rm9ybS5qcyIsIndlYnBhY2s6Ly8vLi9zb3VyY2VzL2NvbW1vbi9maWx0ZXJzLmpzIiwid2VicGFjazovLy8uL3NvdXJjZXMvc2VydmljZXMvcGFja2FnZXMuanMiLCJ3ZWJwYWNrOi8vLy4vc291cmNlcy92aWV3cy9kYXNoL2Rpc2tTcGFjZS5qcyIsIndlYnBhY2s6Ly8vLi9zb3VyY2VzL3ZpZXdzL2Rhc2gvaGVhbHRoLmpzIiwid2VicGFjazovLy8uL3NvdXJjZXMvdmlld3MvZGFzaC9qc3hJbmZvLmpzIiwid2VicGFjazovLy8uL3NvdXJjZXMvdmlld3MvZGFzaC9wcm9jZXNzZXMuanMiLCJ3ZWJwYWNrOi8vLy4vc291cmNlcy92aWV3cy9kYXNoL3Byb2Nlc3Nlc0xpc3QuanMiLCJ3ZWJwYWNrOi8vLy4vc291cmNlcy92aWV3cy9kYXNoL3J1bm5pbmdQb3J0cy5qcyIsIndlYnBhY2s6Ly8vLi9zb3VyY2VzL3ZpZXdzL21haW4uanMiLCJ3ZWJwYWNrOi8vLy4vc291cmNlcy92aWV3cy9teWpvYnMvam9icy5qcyIsIndlYnBhY2s6Ly8vLi9zb3VyY2VzL3NlcnZpY2VzL215am9icy5qcyIsIndlYnBhY2s6Ly8vLi9zb3VyY2VzL3ZpZXdzL215am9icy93b3JrZXJzLmpzIiwid2VicGFjazovLy8uL3NvdXJjZXMvdmlld3Mvc29sdXRpb25zL2NoYXRmbG93LmpzIiwid2VicGFjazovLy8uL3NvdXJjZXMvdmlld3MvdGZ3aWtpcy90ZmdyaWRzZGsuanMiLCJ3ZWJwYWNrOi8vLy4vc291cmNlcy92aWV3cy90Zndpa2lzL3RocmVlZm9sZC5qcyIsIndlYnBhY2s6Ly8vLi9zb3VyY2VzL3ZpZXdzL3dpa2lzL3ZpZXcuanMiLCJ3ZWJwYWNrOi8vLy4vc291cmNlcy9hcHAuanMiLCJ3ZWJwYWNrOi8vLy4vc291cmNlcy9zdHlsZXMvYXBwLmNzcyIsIndlYnBhY2s6Ly8vLi9zb3VyY2VzL3ZpZXdzIF5cXC5cXC8uKiQiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2Fuc2lfdXAvYW5zaV91cC5qcyIsIndlYnBhY2s6Ly8vLi9zb3VyY2VzL3NlcnZpY2VzL2FsZXJ0cy5qcyIsIndlYnBhY2s6Ly8vLi9zb3VyY2VzL3NlcnZpY2VzL2lkZW50aXR5LmpzIiwid2VicGFjazovLy8uL3NvdXJjZXMvc2VydmljZXMvZGVwbG95ZWRTb2x1dGlvbnMuanMiLCJ3ZWJwYWNrOi8vLy4vc291cmNlcy9zZXJ2aWNlcy9sb2dzLmpzIiwid2VicGFjazovLy8uL3NvdXJjZXMvc2VydmljZXMvYXV0aC5qcyIsIndlYnBhY2s6Ly8vLi9zb3VyY2VzL2NvbW1vbi9kaWFsb2dzLmpzIiwid2VicGFjazovLy8uL3NvdXJjZXMvc2VydmljZXMvd2lraS5qcyIsIndlYnBhY2s6Ly8vLi9zb3VyY2VzL2xvY2FsZXMgXlxcLlxcLy4qJCJdLCJuYW1lcyI6WyJOYXZpZ2F0aW9uQmxvY2tlZCIsIkpldEJhc2UiLCJ3ZWJpeCIsIndlYml4SmV0IiwiX2V2ZW50cyIsIl9zdWJzIiwiX2RhdGEiLCJnZXRSb290IiwiX3Jvb3QiLCJkZXN0cnVjdG9yIiwiX2RldGFjaEV2ZW50cyIsIl9kZXN0cm95U3VicyIsIl9jb250YWluZXIiLCJhcHAiLCJfcGFyZW50Iiwic2V0UGFyYW0iLCJpZCIsInZhbHVlIiwidXJsIiwiX3NlZ21lbnQiLCJ1cGRhdGUiLCJzaG93IiwiZ2V0UGFyYW0iLCJwYXJlbnQiLCJ2aWV3IiwiZ2V0UGFyZW50VmlldyIsImdldFVybCIsInN1YnVybCIsImdldFVybFN0cmluZyIsInRvU3RyaW5nIiwiJCQiLCJyb290IiwicXVlcnlWaWV3Iiwib2JqIiwiY29uZmlnIiwibG9jYWxJZCIsIiRzY29wZSIsIm9uIiwibmFtZSIsImNvZGUiLCJhdHRhY2hFdmVudCIsInB1c2giLCJjb250YWlucyIsImtleSIsImtpZCIsImdldFN1YlZpZXciLCJzdWIiLCJnZXRTdWJWaWV3SW5mbyIsInN1YnZpZXciLCJwb3B1cCIsImV2ZW50cyIsImkiLCJsZW5ndGgiLCJkZXRhY2hFdmVudCIsInN1YlZpZXciLCJfaW5pdF91cmxfZGF0YSIsImN1cnJlbnQiLCJleHRlbmQiLCJwYXJhbXMiLCJfZ2V0RGVmYXVsdFN1YiIsImRlZmF1bHQiLCJicmFuY2giLCJjaGlsZCIsIl9yb3V0ZWRfdmlldyIsInBhcnNlIiwic3Vic3RyIiwicGFydHMiLCJzcGxpdCIsImNodW5rcyIsInRlc3QiLCJyZXN1bHQiLCJwb3MiLCJpbmRleE9mIiwicGFyYW0iLCJkY2h1bmsiLCJkZWNvZGVVUklDb21wb25lbnQiLCJwYWdlIiwiaXNOZXciLCJ1cmwyc3RyIiwic3RhY2siLCJjaHVuayIsIm9iajJzdHIiLCJqb2luIiwic3RyIiwiZW5jb2RlVVJJQ29tcG9uZW50IiwiUm91dGUiLCJyb3V0ZSIsImluZGV4IiwiX25leHQiLCJwYXRoIiwibmV4dCIsInNsaWNlIiwic2hpZnQiLCJyZWZyZXNoIiwiX2pvaW4iLCJraWRzIiwib2xkIiwiY29uY2F0IiwiYXBwZW5kIiwiUHJvbWlzZSIsInJlcyIsInJlaiIsInJlZGlyZWN0IiwiY29uZmlybSIsInJlc29sdmUiLCJjYWxsRXZlbnQiLCJjYXRjaCIsImVyciIsInRoZW4iLCJzaXplIiwibiIsIkpldFZpZXciLCJfY2hpbGRyZW4iLCJ1aSIsImNvbnRhaW5lciIsImpldHZpZXciLCJjcmVhdGVWaWV3IiwicmVuZGVyIiwidGFyZ2V0IiwiX3JlbmRlckZyYW1lTG9jayIsIl9zaG93Iiwic2VnbWVudCIsIl91cmxDaGFuZ2UiLCJsaW5rUm91dGVyIiwiZ2V0Um91dGVyIiwic2V0Iiwic2lsZW50IiwiaW5pdCIsIl8kdmlldyIsIl8kIiwicmVhZHkiLCJfJHVybCIsIm1lc3NhZ2UiLCJ1cmxDaGFuZ2UiLCJkZXN0cm95IiwiX2Rlc3Ryb3lLaWRzIiwidXNlIiwicGx1Z2luIiwidGFnTmFtZSIsIl9yZW5kZXIiLCJkb2N1bWVudCIsImJvZHkiLCJ0b05vZGUiLCJfcmVuZGVyX2ZpbmFsIiwiY2ZnIiwic2xvdCIsInJlamVjdCIsInJlc3BvbnNlIiwiY29weUNvbmZpZyIsIm9sZHVpIiwiYXNXaW4iLCJzZXRQb3NpdGlvbiIsImlzVmlzaWJsZSIsIl9pbml0IiwiX2luaXRVcmwiLCJlIiwiX2luaXRFcnJvciIsIndhaXRzIiwiZnJhbWUiLCJ3YWl0IiwiYWxsIiwibG9jayIsIl9yZW5kZXJGcmFtZSIsIl9jcmVhdGVTdWJWaWV3IiwiZXJyb3IiLCJjcmVhdGVGcm9tVVJMIiwidWlzIiwiSmV0Vmlld1JhdyIsIl91aSIsIlN1YlJvdXRlciIsImNiIiwiYSIsImdldCIsIl9vbmNlIiwiSmV0QXBwQmFzZSIsIndpbmRvdyIsInZlcnNpb24iLCJzdGFydCIsIl9zZXJ2aWNlcyIsIkV2ZW50U3lzdGVtIiwiX3N1YlNlZ21lbnQiLCJnZXRTZXJ2aWNlIiwic2V0U2VydmljZSIsImhhbmRsZXIiLCJwcm90b3R5cGUiLCIkc3VidmlldyIsImFkZFN1YlZpZXciLCJBcnJheSIsIm1ldGhvZCIsInBvaW50IiwiRGF0YUNvbGxlY3Rpb24iLCJSZWdFeHAiLCJEYXRlIiwiY29weSIsIiRyb3V0ZXIiLCJjbGlja0hhbmRsZXIiLCJzcmNFbGVtZW50IiwiZ2V0QXR0cmlidXRlIiwidHJpZ2dlciIsIl9mb3JWaWV3IiwiY2FuY2VsQnViYmxlIiwicHJldmVudERlZmF1bHQiLCJwYXJlbnROb2RlIiwibG9hZFZpZXciLCJ2aWV3cyIsIl9sb2FkRXJyb3IiLCJFcnJvciIsIl9sb2FkVmlld0R5bmFtaWMiLCJtb2R1bGUiLCJfX2VzTW9kdWxlIiwicm91dGVyIiwicmVzdCIsImFwcGx5IiwiZGF0YSIsImFjdGlvbiIsImJpbmQiLCJlciIsImRlYnVnIiwiY29uc29sZSIsInRleHQiLCJyZXBsYWNlIiwiaW5uZXJIVE1MIiwidHlwZSIsImV4cGlyZSIsImZpcnN0SW5pdCIsImV2ZW50IiwiX2ZpcnN0X3N0YXJ0IiwidG9wIiwiYmFzZSIsInNldFRpbWVvdXQiLCJhbmltYXRpb24iLCJub2RlIiwiaHRtbCIsImFkZENzcyIsInJlbW92ZUNzcyIsInVybFN0cmluZyIsInRlbXBsYXRlIiwidWlkIiwiSGFzaFJvdXRlciIsIl9kZXRlY3RQcmVmaXgiLCJvbnBvcHN0YXRlIiwicm91dGVzIiwiY29tcGFyZSIsImhpc3RvcnkiLCJwdXNoU3RhdGUiLCJwcmVmaXgiLCJzdWZpeCIsIl9nZXRSYXciLCJyb3V0ZXJQcmVmaXgiLCJsb2NhdGlvbiIsImhyZWYiLCJpc1BhdGNoZWQiLCJwYXRjaCIsInciLCJ3aW4iLCJwcm9taXNlIiwiZnJlZXplIiwic29tZSIsIiRmcmVlemUiLCJyZXNpemUiLCJiYXNlQWRkIiwiYmFzZWxheW91dCIsImFkZFZpZXciLCJiYXNlUmVtb3ZlIiwicmVtb3ZlVmlldyIsImp2aWV3Iiwic3VicyIsImFyZ3VtZW50cyIsImxheW91dCIsInByb3RvVUkiLCIkaW5pdCIsIiRhcHAiLCIkcmVhZHkiLCJvcmlnaW4iLCJwcm94eSIsIkpldEFwcCIsInJlcXVpcmUiLCJTdG9yZVJvdXRlciIsInN0b3JhZ2UiLCJzZXNzaW9uIiwic3RvcmVOYW1lIiwicHV0IiwiVXJsUm91dGVyIiwicGF0aG5hbWUiLCJzZWFyY2giLCJFbXB0eVJvdXRlciIsIl8kY29uZmlnIiwiVW5sb2FkR3VhcmQiLCJoYXMiLCJzdG9yZSIsIk9iamVjdCIsImhhc093blByb3BlcnR5IiwiY2FsbCIsImZvckVhY2giLCJjb250ZXh0IiwidHJpbSIsIndhcm4iLCJ4IiwiU3RyaW5nIiwiZGVsaW1pdGVyIiwicnVzc2lhblBsdXJhbEdyb3VwcyIsImVuZCIsInBsdXJhbFR5cGVzIiwiYXJhYmljIiwibGFzdFR3byIsImJvc25pYW5fc2VyYmlhbiIsImNoaW5lc2UiLCJjcm9hdGlhbiIsImZyZW5jaCIsImdlcm1hbiIsInJ1c3NpYW4iLCJsaXRodWFuaWFuIiwiY3plY2giLCJwb2xpc2giLCJpY2VsYW5kaWMiLCJzbG92ZW5pYW4iLCJwbHVyYWxUeXBlVG9MYW5ndWFnZXMiLCJsYW5nVG9UeXBlTWFwIiwibWFwcGluZyIsInJldCIsImxhbmdzIiwibGFuZyIsInBsdXJhbFR5cGVOYW1lIiwibG9jYWxlIiwibGFuZ1RvUGx1cmFsVHlwZSIsImVuIiwicGx1cmFsVHlwZUluZGV4IiwiY291bnQiLCJlc2NhcGUiLCJ0b2tlbiIsImNvbnN0cnVjdFRva2VuUmVnZXgiLCJvcHRzIiwic3VmZml4IiwiUmFuZ2VFcnJvciIsImRvbGxhclJlZ2V4IiwiZG9sbGFyQmlsbHNZYWxsIiwiZGVmYXVsdFRva2VuUmVnZXgiLCJ0cmFuc2Zvcm1QaHJhc2UiLCJwaHJhc2UiLCJzdWJzdGl0dXRpb25zIiwidG9rZW5SZWdleCIsIlR5cGVFcnJvciIsImludGVycG9sYXRpb25SZWdleCIsIm9wdGlvbnMiLCJzbWFydF9jb3VudCIsInRleHRzIiwiZXhwcmVzc2lvbiIsImFyZ3VtZW50IiwiUG9seWdsb3QiLCJwaHJhc2VzIiwiY3VycmVudExvY2FsZSIsImFsbG93TWlzc2luZyIsIm9uTWlzc2luZ0tleSIsImludGVycG9sYXRpb24iLCJuZXdMb2NhbGUiLCJtb3JlUGhyYXNlcyIsInByZWZpeGVkS2V5IiwidW5zZXQiLCJjbGVhciIsIm5ld1BocmFzZXMiLCJ0IiwiXyIsInRyYW5zZm9ybSIsIndlYml4UG9seWdsb3QiLCJMb2NhbGUiLCJfdmlldyIsInNldExhbmdEYXRhIiwicGNvbmZpZyIsInBvbHlnbG90IiwicG9seSIsInNlcnZpY2UiLCJsb2NOYW1lIiwiaTE4biIsInNldExvY2FsZSIsImdldExhbmciLCJzZXRMYW5nIiwidXJscyIsIk1lbnUiLCJnZXRWYWx1ZSIsInNldFZhbHVlIiwiZ2V0U2VsZWN0ZWRJZCIsInNlbGVjdCIsImV4aXN0cyIsImJhc2VpY29ucyIsImdvb2QiLCJzYXZpbmciLCJiYXNldGV4dCIsIlN0YXR1cyIsInN0YXR1cyIsImlzZXJyb3IiLCJleHBpcmVEZWxheSIsImljb25zIiwiY29udGVudCIsImFyZWEiLCJzZXRIVE1MIiwic3VjY2VzcyIsInNldFN0YXR1cyIsImZhaWwiLCJnZXRTdGF0dXMiLCJoaWRlU3RhdHVzIiwibW9kZSIsInJlc3BvbnNlVGV4dCIsInRyYWNrIiwiZHAiLCJfaWQiLCJfb2JqIiwicmVtb3RlIiwiYWpheCIsIl9tb2RlIiwiX3VybCIsIl9yZXF1ZXN0IiwiX2hlYWRlcnMiLCJfZmlsZXMiLCJUaGVtZSIsInRoZW1lIiwiZ2V0VGhlbWUiLCJzZXRUaGVtZSIsImxpbmtzIiwiZ2V0RWxlbWVudHNCeVRhZ05hbWUiLCJsbmFtZSIsImRpc2FibGVkIiwic2tpbiIsImNvcHlQYXJhbXMiLCJVcmxQYXJhbSIsIm9zIiwib2ciLCJ2YWwiLCJVc2VyIiwibG9naW4iLCJsb2dvdXQiLCJhZnRlckxvZ2luIiwiYWZ0ZXJMb2dvdXQiLCJwaW5nIiwibW9kZWwiLCJ1c2VyIiwiZ2V0VXNlciIsInNlcnZlciIsInBhc3MiLCJjYW5OYXZpZ2F0ZSIsIl8kcm9vdCIsInB1YmxpYyIsInNldEludGVydmFsIiwicGx1Z2lucyIsImVycm9ycyIsIlNUQVRVU19JTlNUQUxMRUQiLCJFeHRlcm5hbFZpZXciLCJ0YXJnZXRVcmwiLCJyZXF1aXJlZFBhY2thZ2VzIiwic2VsZiIsImlmcmFtZSIsIm9uQWZ0ZXJMb2FkIiwiaGlkZVByb2dyZXNzIiwiZW5hYmxlIiwicm93cyIsImhpZGRlbiIsImNvbHMiLCJhdXRvaGVpZ2h0IiwiY3NzIiwiaGVpZ2h0IiwiY2xpY2siLCJpbnN0YWxsUmVxdWlyZWRQYWNrYWdlcyIsInByb21pc2VzIiwidmFsdWVzIiwicGFja2FnZXNUb0luc3RhbGwiLCJtYXAiLCJwYWNrYWdlcyIsImFkZCIsImluc3RhbGxCdXR0b24iLCJkaXNhYmxlIiwicmVsb2FkIiwic2hvd0lmcmFtZSIsImV4dGVybmFsSWZyYW1lIiwic2hvd1Byb2dyZXNzIiwibG9hZCIsIlByb2dyZXNzQmFyIiwicGFja2FnZU5hbWVzIiwia2V5cyIsInJlcXVpcmVkUGFja2FnZXNEaXYiLCJpbnN0YWxsUGFja2FnZUNvbnRhaW5lciIsInBhY2thZ2VTdGF0ZXMiLCJqc29uIiwicGFja2FnZU5hbWVzVG9JbnN0YWxsIiwiaGlkZSIsIm5hbWVzIiwiaGVhZGVycyIsIlNlcnZpY2UiLCJiYXNlVXJsIiwiam9pblVybCIsImFyZ3MiLCJ0b0xvd2VyQ2FzZSIsInBvc3QiLCJWYWx1ZUVycm9yIiwiZ2V0Q2FsbCIsInBvc3RDYWxsIiwiRXJyb3JWaWV3Iiwic2Nyb2xsIiwiaGVhZCIsIm1vZGFsIiwid2lkdGgiLCJpbm5lcldpZHRoIiwiaW5uZXJIZWlnaHQiLCJwb3NpdGlvbiIsImdldFRvcFBhcmVudFZpZXciLCJzaG93RXJyb3IiLCJhbnNpVXAiLCJhbnNpX3RvX2h0bWwiLCJnZXRIZWFkIiwiZGF0ZUZvcm1hdCIsIndlYml4RGF0ZUZvcm1hdHRlciIsImRhdGVUb1N0ciIsImRhdGVGb3JtYXR0ZXIiLCJwYXJzZUludCIsIkJBU0VfVVJMIiwiSGVhbHRoU2VydmljZSIsImdldERpc2tTcGFjZSIsImdldEhlYWx0aCIsImdldElkZW50aXR5IiwiZ2V0TmV0d29ya0luZm8iLCJnZXRKc3hWZXJzaW9uIiwiZ2V0UnVubmluZ1Byb2Nlc3NlcyIsImdldFJ1bm5pbmdQb3J0cyIsImtpbGxQcm9jZXNzZXNCeVBpZCIsInBpZHMiLCJraWxsUHJvY2Vzc2VzQnlQb3J0IiwicG9ydHMiLCJnZXRQcm9jZXNzRGV0YWlscyIsInBpZCIsImhlYWx0aCIsIkFuc2lVcCIsIk1BWF9NU0dfTEVOIiwiTEVWRUxTIiwiU1RBVEVTIiwiVFlQRVMiLCJBbGVydHNWaWV3IiwicmVzaXplQ29sdW1uIiwibXVsdGlzZWxlY3QiLCJjb2x1bW5zIiwiaGVhZGVyIiwic29ydCIsImF1dG93aWR0aCIsImZvcm1hdCIsImNyZWF0ZUZpbHRlck9wdGlvbnMiLCJmaWxsc3BhY2UiLCJhdXRvQ29uZmlnIiwic2NoZW1lIiwiZGVsZXRlSXRlbSIsIm9iamVjdHMiLCJpdGVtcyIsImlkcyIsImluZGV4ZXMiLCJpdGVtIiwidGFibGUiLCJnZXRJdGVtIiwidGl0bGUiLCJvayIsImNhbmNlbCIsImlkZW50aWZpZXJzIiwiaWRlbnRpZmllciIsImFsZXJ0cyIsImRlbGV0ZSIsInJlbW92ZSIsInZpZXdJdGVtIiwiYWxlcnRWaWV3Iiwic2hvd0ZvciIsIkFsZXJ0VmlldyIsImNsZWFyQWxsIiwibGlzdCIsImF0dGFjaFRvIiwiQ2FwYWNpdHlWaWV3IiwiYWRtaW4iLCJnZXRfZXhwbG9yZXIiLCJleHBsb3JlciIsInN0YXJ0c1dpdGgiLCJDaXJjbGVzVmlldyIsImdyaWQiLCJvbkNvbnRleHQiLCJlcnJvclZpZXciLCJtZW51IiwiY2lyY2xlVGFibGUiLCJpbmZvIiwiSlNPTiIsInVzZXJuYW1lIiwidGFpZ2EiLCJ1c2VyQ2lyY2xlcyIsImNpcmNsZXMiLCJDaXJjbGVzdG9yaWVzVmlldyIsInN0b3JpZXNUYWJsZSIsInVzZXJTdG9yaWVzIiwic3RvcmllcyIsIkNpcmNsZXNUYXNrc1ZpZXciLCJ0YXNrc1RhYmxlIiwidXNlclRhc2tzIiwidGFza3MiLCJDT0RFX1VSTCIsIlJFUVVJUkVEX1BBQ0tBR0VTIiwiQ29kZXNlcnZlclZpZXciLCJUb3BWaWV3IiwicmVzcG9uc2l2ZSIsIlVOS05PV05fU1RBVFVTIiwiRGVwbG95ZWRTb2x1dGlvbnNWaWV3Iiwic29sdXRpb25OYW1lIiwicmVzdklkIiwicmVzZXJ2YXRpb24iLCJzb2x1dGlvblR5cGUiLCJuZXh0QWN0aW9uIiwibmV4dF9hY3Rpb24iLCJzaG93T3ZlcmxheSIsImhpZGVPdmVybGF5IiwiaGFuZGxlUmVzdWx0IiwiY2FsbGJhY2siLCJzb2x1dGlvbnNUYWJsZSIsInNvbHV0aW9uSXRlbSIsInNvbHV0aW9uIiwiRnVuY3Rpb24iLCJkZWxldGVTb2x1dGlvbiIsIml0ZW1JZCIsInNvbHV0aW9ucyIsImxvYWRTb2x1dGlvbnMiLCJmb3JtX2luZm8iLCJyZXNlcnZhdGlvblZpZXciLCJSZXNlcnZhdGlvblZpZXciLCJjaGVja0FjdGlvbiIsInNlbGVjdGVkSXRlbUlkIiwiJHZpZXciLCJsb2NhdGUiLCJyb3ciLCJhY3Rpb25zIiwicHJldmVudEV2ZW50IiwiVVJMIiwiRmFybW1hbmFnZW1lbnRWaWV3IiwiSnVweXRlclZpZXciLCJMb2dzVmlldyIsInBsYWNlaG9sZGVyIiwiYWxpZ24iLCJvbkNoYW5nZSIsImFwcE5hbWUiLCJpbnB1dFdpZHRoIiwiZGVsZXRlX2FsbCIsIkFwcExvZ3NWaWV3IiwiYXBwc0NvbWJvIiwibG9ncyIsImxpc3RBcHBzIiwiZGVmaW5lIiwiYXBwbmFtZSIsImxvZ0lkIiwibG9naWQiLCJhcHBMb2dzIiwiZGVsZXRlU2VsZWN0ZWQiLCJkZWxldGVBbGwiLCJQQUNLQUdFX1NUQVRFUyIsIlBhY2thZ2VzVmlldyIsImlucHV0QWxpZ24iLCJzb3VyY2VfbmFtZSIsInNvdXJjZSIsImF1dGhvciIsInRocmVlYm90IiwicGFja2FnZVRhYmxlIiwicGFja2FnZUl0ZW0iLCJwYWNrYWdlIiwiYWRkUGFja2FnZSIsImdpdFVybCIsInVwZGF0ZUl0ZW0iLCJkZWxldGVQYWNrYWdlIiwicGFja2FnZU5hbWUiLCJzdGFydFBhY2thZ2UiLCJzdG9wUGFja2FnZSIsInN0b3AiLCJlbmFibGVQYWNrYWdlIiwiZGlzYWJsZVBhY2thZ2UiLCJsb2FkUGFja2FnZXMiLCJwYWNrYWdlRGV0YWlsc1ZpZXciLCJQYWNrYWdlRGV0YWlsc1ZpZXciLCJfcmVxdWlyZWRwYWNrYWdlcyIsInBhY2FrZ2VMb2NhdGlvbiIsImFsZXJ0IiwicGFja2FnZU1ldGhvZCIsImluY2x1ZGVzIiwibG9nIiwicGFja2FnZURhdGEiLCJzdHJpbmdpZnkiLCJzaG93UGFja2FnZURldGFpbHMiLCJTZXR0aW5nc1ZpZXciLCJjZWxscyIsIkdlbmVyYWxWaWV3IiwiQWRtaW5zVmlldyIsIldhbGxldE1hbmFnZXJWaWV3Iiwid2FsbGV0cyIsIldhbGxldEZvcm1WaWV3Iiwic2hvd0Zvcm0iLCJXYWxsZXRJbXBvcnRWaWV3Iiwid2FsbGV0c190YWJsZSIsIldhbGxldERldGFpbHNWaWV3IiwiZ2V0U2VsZWN0ZWRJdGVtIiwid2FsbGV0IiwibWFuYWdlV2FsbGV0IiwiYWRkcmVzcyIsInNlY3JldCIsImJhbGFuY2VzIiwic2hvd0luZm8iLCJnZXRXYWxsZXRzIiwiV2lraXNWaWV3Iiwib25DbGljayIsImJ0bl92aWV3IiwiZXYiLCJlbGVtZW50c0NvbmZpZyIsImxhYmVsV2lkdGgiLCJlbGVtZW50cyIsImxhYmVsIiwicmVhZG9ubHkiLCJ0YWIiLCJtdWx0aXZpZXciLCJmb3JtIiwidGJWaWV3cyIsInRiVGFicyIsImxvZ0RhdGEiLCJhcHBfbmFtZSIsImxhdGVzdF9sb2dpZCIsImFkZFRyYWNlYmFjayIsInRiIiwidGJJZCIsInRocmVlYm90X25hbWUiLCJwcm9jZXNzX2lkIiwidGJUaXRsZSIsImZvcm1hdHRlZCIsImFkZE9wdGlvbiIsImNsZWFyVHJhY2VCYWNrcyIsInJlbW92ZU9wdGlvbiIsImFzc2lnbiIsImFsZXJ0X3R5cGUiLCJsZXZlbCIsInRpbWVfZmlyc3QiLCJ0aW1lX2xhc3QiLCJzZXRWYWx1ZXMiLCJ0cmFjZWJhY2tzIiwiQWRtaW5TZXJ2aWNlIiwic2V0X2V4cGxvcmVyIiwiZXhwbG9yZXJfdHlwZSIsIlRhaWdhU2VydmljZSIsIm91dHB1dF90eXBlIiwiUHJvY2Vzc0RldGFpbHNWaWV3Iiwic2hvd1Byb2Nlc3NEZXRhaWxzIiwib25BZnRlclJlbmRlciIsIndvcmtsb2FkcyIsInNlbGVjdG9yIiwicXVlcnlTZWxlY3RvciIsInN0eWxlIiwiZGlzcGxheSIsIm5ldHdvcmtfbmFtZSIsImlwX3JhbmdlIiwiaXByYW5nZSIsImZhcm1lcl90aWQiLCJub2RlX2lkIiwiZmxpc3QiLCJlbnRyeXBvaW50IiwiaHViX3VybCIsImludGVyYWN0aXZlIiwibWFzdGVyX2lwc19zdHIiLCJtYXN0ZXJfaXBzIiwicmVzZXJ2YXRpb25fdmlldyIsImN1c3RvbWVyX3RpZCIsInJlc3VsdHMiLCJleHBpcmF0aW9uIiwiZGF0YV9yZXNlcnZhdGlvbiIsImV4cGlyYXRpb25fcmVzZXJ2YXRpb24iLCJjb250YWluZXJzIiwidm9sdW1lcyIsInpkYnMiLCJuZXR3b3JrcyIsImt1YmVybmV0ZXMiLCJmb3JtX2xpc3QiLCJmb3JtX2tleXMiLCJmb3JtX3ZhbHVlcyIsImZvcm1fZGljdCIsInBhZ2VyIiwiZ3JvdXAiLCJhcHBsb2dzIiwibWFya1NvcnRpbmciLCJKb2JEZXRhaWxzVmlldyIsInNob3dKb2JEZXRhaWxzIiwiam9iRGF0YSIsIldvcmtlckRldGFpbHNWaWV3Iiwic2hvd1dvcmtlckRldGFpbHMiLCJhZGRBZG1pbiIsImRlbGV0ZV9hZG1pbiIsImRlbGV0ZUFkbWluIiwiaW5wdXREaWFsb2ciLCJpbnB1dCIsInlDb3VudCIsImRvQWN0aW9uIiwiZXhwbG9yZXJMaXN0IiwiZXhwbG9yZXJBZGRyZXNzIiwibmV3VmFsdWUiLCJ3YWxsZXRfbmFtZSIsImdldFZhbHVlcyIsImNyZWF0ZVdhbGxldCIsIldhbGxldFNlcnZpY2UiLCJpbXBvcnRXYWxsZXQiLCJuZXR3b3JrIiwic2hvd1NlY3JldCIsInNlY3JldF9idG4iLCJiYWxhbmNlIiwiYXNzZXRfY29kZSIsIlBhY2thZ2VzU2VydmljZSIsImdpdF91cmwiLCJEaXNrU3BhY2VWaWV3IiwiZGlza1NwYWNlIiwiZGlza0luZm8iLCJ1c2VkIiwiZnJlZSIsInRvdGFsIiwicGVyY2VudCIsImhlYWx0aEluZm9WaWV3IiwiaGVhbHRoSW5mbyIsImJjZGIiLCJ3aWtpcyIsImNvZGVzZXJ2ZXIiLCJqdXB5dGVyIiwiSlNYSW5mb1ZpZXciLCJib3RJbmZvIiwiYm90aW5mbyIsImlkZW50aXR5IiwiZ2V0X2lkZW50aXR5IiwidGlkIiwiaXAiLCJpcDYiLCJjb2xvcnNEYXRhc2V0IiwiY29sb3IiLCJQcm9jZXNzZXNWaWV3IiwicHJvY2Vzc2VzSW5mbyIsInBpZUlubmVyVGV4dCIsInByb2Nlc3Nlc0xpc3QiLCJydW5Qcm9jZXNzSW5mbyIsImNoYXJ0c0RhdGEiLCJwcm9jZXNzZXNfbGlzdCIsIm1lbW9yeVVzYWdlIiwibWVtb3J5X3VzYWdlIiwidG90YWxNZW1vcnkiLCJ0b3RhbF9tZW0iLCJ1c2FnZV9wZXJjZW50IiwidGVtcCIsIk1hdGgiLCJjZWlsIiwicnNzIiwicHJvY2Vzc2VzTGlzdFZpZXciLCJraWxsUHJvY2VzcyIsInByb2Nlc3NUYWJsZSIsInByb2Nlc3NEZXRhaWxzVmlldyIsInJ1bm5pbmdQb3J0c1ZpZXciLCJwb3J0c1RhYmxlIiwicG9ydF9udW1iZXIiLCJpY29uIiwiaGlkZU1lbnUiLCJ0b29sdGlwIiwiYm9yZGVybGVzcyIsInNpZGViYXJEYXRhIiwic3luYyIsImhhc19mcm9udGVuZF9hcmdzIiwicCIsImZyb250ZW5kX2FyZ3MiLCJzaWRlYmFyIiwidG9vbGJhciIsInBhZGRpbmciLCJzaG93TWVudSIsImJ1dHRvbkhpZGVNZW51IiwiYnV0dG9uU2hvd01lbnUiLCJteWpvYnMiLCJ3b3JrZXJzIiwidGZncmlkc2RrIiwidGhyZWVmb2xkIiwidWJ1bnR1IiwibWluaW8iLCJrOHNfY2x1c3RlciIsImRvbWFpbl9kZWxlZ2F0aW9uIiwic29sdXRpb25fZXhwb3NlIiwidXNlck1lbnUiLCJhdXRoIiwidXNlcm5hbWVMYWJlbCIsImdldEN1cnJlbnRVc2VyIiwiZGV2bW9kZSIsImdldFRleHRTaXplIiwiZW1haWwiLCJKb2JzVmlldyIsImpvYkRldGFpbHNWaWV3Iiwiam9iVGFibGUiLCJsaXN0Sm9icyIsIk15am9ic1NlcnZpY2UiLCJsaXN0V29ya2VycyIsIndvcmtlckRldGFpbHNWaWV3Iiwid29ya2VyVGFibGUiLCJXb3JrZXJEYXRhIiwiQ2hhdGZsb3dWaWV3IiwiYmFzZUdpdFVybCIsInBhY2thZ2VVcmwiLCJjaGF0IiwiVEZHUklEU0RLX1VSTCIsIlRGR3JpZFNES1dpa2kiLCJUSFJFRUZPTERfVVJMIiwiVGhyZWVmb2xkV2lraSIsIldpa2lFeHRlcm5hbFZpZXciLCJJbnZlbnRvcnlBcHAiLCJBUFBOQU1FIiwiVkVSU0lPTiIsIlBST0RVQ1RJT04iLCJmYWN0b3J5IiwiZXhwb3J0cyIsIm5vZGVOYW1lIiwiZXhwIiwiX19tYWtlVGVtcGxhdGVPYmplY3QiLCJjb29rZWQiLCJyYXciLCJkZWZpbmVQcm9wZXJ0eSIsIlBhY2tldEtpbmQiLCJzZXR1cF9wYWxldHRlcyIsIl91c2VfY2xhc3NlcyIsIl9lc2NhcGVfZm9yX2h0bWwiLCJib2xkIiwiZmciLCJiZyIsIl9idWZmZXIiLCJfdXJsX3doaXRlbGlzdCIsImFyZyIsImVudW1lcmFibGUiLCJjb25maWd1cmFibGUiLCJfdGhpcyIsImFuc2lfY29sb3JzIiwicmdiIiwiY2xhc3NfbmFtZSIsInBhbGV0dGVfMjU2IiwicGFsZXR0ZSIsInJlYyIsImxldmVscyIsInIiLCJnIiwiYiIsImNvbCIsImdyZXlfbGV2ZWwiLCJncnkiLCJlc2NhcGVfdHh0X2Zvcl9odG1sIiwidHh0IiwiYXBwZW5kX2J1ZmZlciIsImdldF9uZXh0X3BhY2tldCIsInBrdCIsImtpbmQiLCJFT1MiLCJsZW4iLCJUZXh0IiwiSW5jb21wbGV0ZSIsIm5leHRfY2hhciIsImNoYXJBdCIsIkVTQyIsIl9jc2lfcmVnZXgiLCJyZ3giLCJtYXRjaCIsIlVua25vd24iLCJTR1IiLCJycG9zIiwiX29zY19zdCIsInJneEciLCJsYXN0SW5kZXgiLCJtYXRjaF8xIiwiZXhlYyIsIm1hdGNoXzIiLCJfb3NjX3JlZ2V4IiwiT1NDVVJMIiwiYmxvY2tzIiwicGFja2V0IiwidHJhbnNmb3JtX3RvX2h0bWwiLCJ3aXRoX3N0YXRlIiwicHJvY2Vzc19hbnNpIiwicHJvY2Vzc19oeXBlcmxpbmsiLCJzZ3JfY21kcyIsInNncl9jbWRfc3RyIiwibnVtIiwiaXNOYU4iLCJpc19mb3JlZ3JvdW5kIiwibW9kZV9jbWQiLCJwYWxldHRlX2luZGV4IiwiYyIsImZyYWdtZW50Iiwic3R5bGVzIiwiY2xhc3NlcyIsImNsYXNzX3N0cmluZyIsInN0eWxlX3N0cmluZyIsInRtcGxPYmoiLCJzdWJzdCIsIl9pIiwicmVnZXhUZXh0Iiwid3NyZ3giLCJ0eHQyIiwiQWxlcnRzU2VydmljZSIsIklkZW50aXR5U2VydmljZSIsIlNvbHV0aW9uc1NlcnZpY2UiLCJzb2x1dGlvbl90eXBlIiwic29sdXRpb25fbmFtZSIsIkxvZ3NTZXJ2aWNlIiwiaWRfZnJvbSIsIkF1dGhTZXJ2aWNlIiwibmV4dFVybCIsImhhc2giLCJidXR0b25MYWJlbCIsImhhbmRsZUlucHV0IiwiZ2V0Rm9ybVZpZXciLCJ0ZXh0SW5wdXQiLCJVSU1hbmFnZXIiLCJzZXRGb2N1cyIsIldpa2lzU2VydmljZSJdLCJtYXBwaW5ncyI6Ijs7UUFBQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTs7O1FBR0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0EsS0FBSztRQUNMO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0EsMkJBQTJCLDBCQUEwQixFQUFFO1FBQ3ZELGlDQUFpQyxlQUFlO1FBQ2hEO1FBQ0E7UUFDQTs7UUFFQTtRQUNBLHNEQUFzRCwrREFBK0Q7O1FBRXJIO1FBQ0E7O1FBRUE7UUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztJQzdETUEsaUI7Ozs7SUFFQUMsTztBQUNGLHFCQUFZQyxLQUFaLEVBQW1CO0FBQUE7O0FBQ2YsYUFBS0MsUUFBTCxHQUFnQixJQUFoQjtBQUNBLGFBQUtELEtBQUwsR0FBYUEsS0FBYjtBQUNBLGFBQUtFLE9BQUwsR0FBZSxFQUFmO0FBQ0EsYUFBS0MsS0FBTCxHQUFhLEVBQWI7QUFDQSxhQUFLQyxLQUFMLEdBQWEsRUFBYjtBQUNIOztzQkFDREMsTyxzQkFBVTtBQUNOLGVBQU8sS0FBS0MsS0FBWjtBQUNILEs7O3NCQUNEQyxVLHlCQUFhO0FBQ1QsYUFBS0MsYUFBTDtBQUNBLGFBQUtDLFlBQUw7QUFDQSxhQUFLUCxPQUFMLEdBQWUsS0FBS1EsVUFBTCxHQUFrQixLQUFLQyxHQUFMLEdBQVcsS0FBS0MsT0FBTCxHQUFlLEtBQUtOLEtBQUwsR0FBYSxJQUF4RTtBQUNILEs7O3NCQUNETyxRLHFC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ZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwge1xuIFx0XHRcdFx0Y29uZmlndXJhYmxlOiBmYWxzZSxcbiBcdFx0XHRcdGVudW1lcmFibGU6IHRydWUsXG4gXHRcdFx0XHRnZXQ6IGdldHRlclxuIFx0XHRcdH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIi9jb2RlYmFzZS9cIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSA1Nik7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gd2VicGFjay9ib290c3RyYXAgYjhiNzYyYjczODYxOWZjYjExOGEiLCJjbGFzcyBOYXZpZ2F0aW9uQmxvY2tlZCB7IH1cblxuY2xhc3MgSmV0QmFzZSB7XHJcbiAgICBjb25zdHJ1Y3Rvcih3ZWJpeCkge1xyXG4gICAgICAgIHRoaXMud2ViaXhKZXQgPSB0cnVlO1xyXG4gICAgICAgIHRoaXMud2ViaXggPSB3ZWJpeDtcclxuICAgICAgICB0aGlzLl9ldmVudHMgPSBbXTtcclxuICAgICAgICB0aGlzLl9zdWJzID0ge307XHJcbiAgICAgICAgdGhpcy5fZGF0YSA9IHt9O1xyXG4gICAgfVxyXG4gICAgZ2V0Um9vdCgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fcm9vdDtcclxuICAgIH1cclxuICAgIGRlc3RydWN0b3IoKSB7XHJcbiAgICAgICAgdGhpcy5fZGV0YWNoRXZlbnRzKCk7XHJcbiAgICAgICAgdGhpcy5fZGVzdHJveVN1YnMoKTtcclxuICAgICAgICB0aGlzLl9ldmVudHMgPSB0aGlzLl9jb250YWluZXIgPSB0aGlzLmFwcCA9IHRoaXMuX3BhcmVudCA9IHRoaXMuX3Jvb3QgPSBudWxsO1xyXG4gICAgfVxyXG4gICAgc2V0UGFyYW0oaWQsIHZhbHVlLCB1cmwpIHtcclxuICAgICAgICBpZiAodGhpcy5fZGF0YVtpZF0gIT09IHZhbHVlKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2RhdGFbaWRdID0gdmFsdWU7XHJcbiAgICAgICAgICAgIHRoaXMuX3NlZ21lbnQudXBkYXRlKGlkLCB2YWx1ZSwgMCk7XHJcbiAgICAgICAgICAgIGlmICh1cmwpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLnNob3cobnVsbCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBnZXRQYXJhbShpZCwgcGFyZW50KSB7XHJcbiAgICAgICAgY29uc3QgdmFsdWUgPSB0aGlzLl9kYXRhW2lkXTtcclxuICAgICAgICBpZiAodHlwZW9mIHZhbHVlICE9PSBcInVuZGVmaW5lZFwiIHx8ICFwYXJlbnQpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHZhbHVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjb25zdCB2aWV3ID0gdGhpcy5nZXRQYXJlbnRWaWV3KCk7XHJcbiAgICAgICAgaWYgKHZpZXcpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHZpZXcuZ2V0UGFyYW0oaWQsIHBhcmVudCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgZ2V0VXJsKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9zZWdtZW50LnN1YnVybCgpO1xyXG4gICAgfVxyXG4gICAgZ2V0VXJsU3RyaW5nKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9zZWdtZW50LnRvU3RyaW5nKCk7XHJcbiAgICB9XHJcbiAgICBnZXRQYXJlbnRWaWV3KCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9wYXJlbnQ7XHJcbiAgICB9XHJcbiAgICAkJChpZCkge1xyXG4gICAgICAgIGlmICh0eXBlb2YgaWQgPT09IFwic3RyaW5nXCIpIHtcclxuICAgICAgICAgICAgY29uc3Qgcm9vdCA9IHRoaXMuZ2V0Um9vdCgpO1xyXG4gICAgICAgICAgICByZXR1cm4gcm9vdC5xdWVyeVZpZXcoKG9iaiA9PiAob2JqLmNvbmZpZy5pZCA9PT0gaWQgfHwgb2JqLmNvbmZpZy5sb2NhbElkID09PSBpZCkgJiZcclxuICAgICAgICAgICAgICAgIChvYmouJHNjb3BlID09PSByb290LiRzY29wZSkpLCBcInNlbGZcIik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICByZXR1cm4gaWQ7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgb24ob2JqLCBuYW1lLCBjb2RlKSB7XHJcbiAgICAgICAgY29uc3QgaWQgPSBvYmouYXR0YWNoRXZlbnQobmFtZSwgY29kZSk7XHJcbiAgICAgICAgdGhpcy5fZXZlbnRzLnB1c2goeyBvYmosIGlkIH0pO1xyXG4gICAgICAgIHJldHVybiBpZDtcclxuICAgIH1cclxuICAgIGNvbnRhaW5zKHZpZXcpIHtcclxuICAgICAgICBmb3IgKGNvbnN0IGtleSBpbiB0aGlzLl9zdWJzKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGtpZCA9IHRoaXMuX3N1YnNba2V5XS52aWV3O1xyXG4gICAgICAgICAgICBpZiAoa2lkID09PSB2aWV3IHx8IGtpZC5jb250YWlucyh2aWV3KSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG4gICAgZ2V0U3ViVmlldyhuYW1lKSB7XHJcbiAgICAgICAgY29uc3Qgc3ViID0gdGhpcy5nZXRTdWJWaWV3SW5mbyhuYW1lKTtcclxuICAgICAgICBpZiAoc3ViKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBzdWIuc3Vidmlldy52aWV3O1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGdldFN1YlZpZXdJbmZvKG5hbWUpIHtcclxuICAgICAgICBjb25zdCBzdWIgPSB0aGlzLl9zdWJzW25hbWUgfHwgXCJkZWZhdWx0XCJdO1xyXG4gICAgICAgIGlmIChzdWIpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHsgc3Vidmlldzogc3ViLCBwYXJlbnQ6IHRoaXMgfTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKG5hbWUgPT09IFwiX3RvcFwiKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX3N1YnNbbmFtZV0gPSB7IHVybDogXCJcIiwgaWQ6IG51bGwsIHBvcHVwOiB0cnVlIH07XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmdldFN1YlZpZXdJbmZvKG5hbWUpO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvLyB3aGVuIGNhbGxlZCBmcm9tIGEgY2hpbGQgdmlldywgc2VhcmNoZXMgZm9yIG5lYXJlc3QgcGFyZW50IHdpdGggc3Vidmlld1xyXG4gICAgICAgIGlmICh0aGlzLl9wYXJlbnQpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3BhcmVudC5nZXRTdWJWaWV3SW5mbyhuYW1lKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICB9XHJcbiAgICBfZGV0YWNoRXZlbnRzKCkge1xyXG4gICAgICAgIGNvbnN0IGV2ZW50cyA9IHRoaXMuX2V2ZW50cztcclxuICAgICAgICBmb3IgKGxldCBpID0gZXZlbnRzLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSB7XHJcbiAgICAgICAgICAgIGV2ZW50c1tpXS5vYmouZGV0YWNoRXZlbnQoZXZlbnRzW2ldLmlkKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBfZGVzdHJveVN1YnMoKSB7XHJcbiAgICAgICAgLy8gZGVzdHJveSBzdWIgdmlld3NcclxuICAgICAgICBmb3IgKGNvbnN0IGtleSBpbiB0aGlzLl9zdWJzKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHN1YlZpZXcgPSB0aGlzLl9zdWJzW2tleV0udmlldztcclxuICAgICAgICAgICAgLy8gaXQgcG9zc2libGUgdGhhdCBzdWJ2aWV3IHdhcyBub3QgbG9hZGVkIHdpdGggYW55IGNvbnRlbnQgeWV0XHJcbiAgICAgICAgICAgIC8vIHNvIGNoZWNrIG9uIG51bGxcclxuICAgICAgICAgICAgaWYgKHN1YlZpZXcpIHtcclxuICAgICAgICAgICAgICAgIHN1YlZpZXcuZGVzdHJ1Y3RvcigpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIHJlc2V0IHRvIHByZXZlbnQgbWVtb3J5IGxlYWtzXHJcbiAgICAgICAgdGhpcy5fc3VicyA9IHt9O1xyXG4gICAgfVxyXG4gICAgX2luaXRfdXJsX2RhdGEoKSB7XHJcbiAgICAgICAgY29uc3QgdXJsID0gdGhpcy5fc2VnbWVudC5jdXJyZW50KCk7XHJcbiAgICAgICAgdGhpcy5fZGF0YSA9IHt9O1xyXG4gICAgICAgIHRoaXMud2ViaXguZXh0ZW5kKHRoaXMuX2RhdGEsIHVybC5wYXJhbXMsIHRydWUpO1xyXG4gICAgfVxyXG4gICAgX2dldERlZmF1bHRTdWIoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuX3N1YnMuZGVmYXVsdCkge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fc3Vicy5kZWZhdWx0O1xyXG4gICAgICAgIH1cclxuICAgICAgICBmb3IgKGNvbnN0IGtleSBpbiB0aGlzLl9zdWJzKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHN1YiA9IHRoaXMuX3N1YnNba2V5XTtcclxuICAgICAgICAgICAgaWYgKCFzdWIuYnJhbmNoICYmIHN1Yi52aWV3ICYmIGtleSAhPT0gXCJfdG9wXCIpIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGNoaWxkID0gc3ViLnZpZXcuX2dldERlZmF1bHRTdWIoKTtcclxuICAgICAgICAgICAgICAgIGlmIChjaGlsZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBjaGlsZDtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIF9yb3V0ZWRfdmlldygpIHtcclxuICAgICAgICBjb25zdCBwYXJlbnQgPSB0aGlzLmdldFBhcmVudFZpZXcoKTtcclxuICAgICAgICBpZiAoIXBhcmVudCkge1xyXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgY29uc3Qgc3ViID0gcGFyZW50Ll9nZXREZWZhdWx0U3ViKCk7XHJcbiAgICAgICAgaWYgKCFzdWIgJiYgc3ViICE9PSB0aGlzKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHBhcmVudC5fcm91dGVkX3ZpZXcoKTtcclxuICAgIH1cclxufVxuXG5mdW5jdGlvbiBwYXJzZSh1cmwpIHtcclxuICAgIC8vIHJlbW92ZSBzdGFydGluZyAvXHJcbiAgICBpZiAodXJsWzBdID09PSBcIi9cIikge1xyXG4gICAgICAgIHVybCA9IHVybC5zdWJzdHIoMSk7XHJcbiAgICB9XHJcbiAgICAvLyBzcGxpdCB1cmwgYnkgXCIvXCJcclxuICAgIGNvbnN0IHBhcnRzID0gdXJsLnNwbGl0KFwiL1wiKTtcclxuICAgIGNvbnN0IGNodW5rcyA9IFtdO1xyXG4gICAgLy8gZm9yIGVhY2ggcGFnZSBpbiB1cmxcclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcGFydHMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICBjb25zdCB0ZXN0ID0gcGFydHNbaV07XHJcbiAgICAgICAgY29uc3QgcmVzdWx0ID0ge307XHJcbiAgICAgICAgLy8gZGV0ZWN0IHBhcmFtc1xyXG4gICAgICAgIC8vIHN1cHBvcnQgb2xkIFx0XHRcdHNvbWU6YT1iOmM9ZFxyXG4gICAgICAgIC8vIGFuZCBuZXcgbm90YXRpb25cdFx0c29tZT9hPWImYz1kXHJcbiAgICAgICAgbGV0IHBvcyA9IHRlc3QuaW5kZXhPZihcIjpcIik7XHJcbiAgICAgICAgaWYgKHBvcyA9PT0gLTEpIHtcclxuICAgICAgICAgICAgcG9zID0gdGVzdC5pbmRleE9mKFwiP1wiKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHBvcyAhPT0gLTEpIHtcclxuICAgICAgICAgICAgY29uc3QgcGFyYW1zID0gdGVzdC5zdWJzdHIocG9zICsgMSkuc3BsaXQoL1tcXDpcXD9cXCZdL2cpO1xyXG4gICAgICAgICAgICAvLyBjcmVhdGUgaGFzaCBvZiBuYW1lZCBwYXJhbXNcclxuICAgICAgICAgICAgZm9yIChjb25zdCBwYXJhbSBvZiBwYXJhbXMpIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGRjaHVuayA9IHBhcmFtLnNwbGl0KFwiPVwiKTtcclxuICAgICAgICAgICAgICAgIHJlc3VsdFtkY2h1bmtbMF1dID0gZGVjb2RlVVJJQ29tcG9uZW50KGRjaHVua1sxXSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gc3RvcmUgcGFyc2VkIHZhbHVlc1xyXG4gICAgICAgIGNodW5rc1tpXSA9IHtcclxuICAgICAgICAgICAgcGFnZTogKHBvcyA+IC0xID8gdGVzdC5zdWJzdHIoMCwgcG9zKSA6IHRlc3QpLFxyXG4gICAgICAgICAgICBwYXJhbXM6IHJlc3VsdCxcclxuICAgICAgICAgICAgaXNOZXc6IHRydWVcclxuICAgICAgICB9O1xyXG4gICAgfVxyXG4gICAgLy8gcmV0dXJuIGFycmF5IG9mIHBhZ2Ugb2JqZWN0c1xyXG4gICAgcmV0dXJuIGNodW5rcztcclxufVxyXG5mdW5jdGlvbiB1cmwyc3RyKHN0YWNrKSB7XHJcbiAgICBjb25zdCB1cmwgPSBbXTtcclxuICAgIGZvciAoY29uc3QgY2h1bmsgb2Ygc3RhY2spIHtcclxuICAgICAgICB1cmwucHVzaChcIi9cIiArIGNodW5rLnBhZ2UpO1xyXG4gICAgICAgIGNvbnN0IHBhcmFtcyA9IG9iajJzdHIoY2h1bmsucGFyYW1zKTtcclxuICAgICAgICBpZiAocGFyYW1zKSB7XHJcbiAgICAgICAgICAgIHVybC5wdXNoKFwiP1wiICsgcGFyYW1zKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gdXJsLmpvaW4oXCJcIik7XHJcbn1cclxuZnVuY3Rpb24gb2JqMnN0cihvYmopIHtcclxuICAgIGNvbnN0IHN0ciA9IFtdO1xyXG4gICAgZm9yIChjb25zdCBrZXkgaW4gb2JqKSB7XHJcbiAgICAgICAgaWYgKHN0ci5sZW5ndGgpIHtcclxuICAgICAgICAgICAgc3RyLnB1c2goXCImXCIpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBzdHIucHVzaChrZXkgKyBcIj1cIiArIGVuY29kZVVSSUNvbXBvbmVudChvYmpba2V5XSkpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHN0ci5qb2luKFwiXCIpO1xyXG59XG5cbmNsYXNzIFJvdXRlIHtcclxuICAgIGNvbnN0cnVjdG9yKHJvdXRlLCBpbmRleCkge1xyXG4gICAgICAgIHRoaXMuX25leHQgPSAxO1xyXG4gICAgICAgIGlmICh0eXBlb2Ygcm91dGUgPT09IFwic3RyaW5nXCIpIHtcclxuICAgICAgICAgICAgdGhpcy5yb3V0ZSA9IHtcclxuICAgICAgICAgICAgICAgIHVybDogcGFyc2Uocm91dGUpLFxyXG4gICAgICAgICAgICAgICAgcGF0aDogcm91dGVcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMucm91dGUgPSByb3V0ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5pbmRleCA9IGluZGV4O1xyXG4gICAgfVxyXG4gICAgY3VycmVudCgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5yb3V0ZS51cmxbdGhpcy5pbmRleF07XHJcbiAgICB9XHJcbiAgICBuZXh0KCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnJvdXRlLnVybFt0aGlzLmluZGV4ICsgdGhpcy5fbmV4dF07XHJcbiAgICB9XHJcbiAgICBzdWJ1cmwoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMucm91dGUudXJsLnNsaWNlKHRoaXMuaW5kZXgpO1xyXG4gICAgfVxyXG4gICAgc2hpZnQoKSB7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBSb3V0ZSh0aGlzLnJvdXRlLCB0aGlzLmluZGV4ICsgdGhpcy5fbmV4dCk7XHJcbiAgICB9XHJcbiAgICByZWZyZXNoKCkge1xyXG4gICAgICAgIGNvbnN0IHVybCA9IHRoaXMucm91dGUudXJsO1xyXG4gICAgICAgIGZvciAobGV0IGkgPSB0aGlzLmluZGV4ICsgMTsgaSA8IHVybC5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICB1cmxbaV0uaXNOZXcgPSB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHRvU3RyaW5nKCkge1xyXG4gICAgICAgIGNvbnN0IHN0ciA9IHVybDJzdHIodGhpcy5zdWJ1cmwoKSk7XHJcbiAgICAgICAgcmV0dXJuIHN0ciA/IHN0ci5zdWJzdHIoMSkgOiBcIlwiO1xyXG4gICAgfVxyXG4gICAgX2pvaW4ocGF0aCwga2lkcykge1xyXG4gICAgICAgIGxldCB1cmwgPSB0aGlzLnJvdXRlLnVybDtcclxuICAgICAgICBpZiAocGF0aCA9PT0gbnVsbCkgeyAvLyBjaGFuZ2Ugb2YgcGFyYW1ldGVycywgcm91dGUgZWxlbWVudHMgYXJlIG5vdCBhZmZlY3RlZFxyXG4gICAgICAgICAgICByZXR1cm4gdXJsO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjb25zdCBvbGQgPSB0aGlzLnJvdXRlLnVybDtcclxuICAgICAgICB1cmwgPSBvbGQuc2xpY2UoMCwgdGhpcy5pbmRleCArIChraWRzID8gdGhpcy5fbmV4dCA6IDApKTtcclxuICAgICAgICBpZiAocGF0aCkge1xyXG4gICAgICAgICAgICB1cmwgPSB1cmwuY29uY2F0KHBhcnNlKHBhdGgpKTtcclxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB1cmwubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgIGlmIChvbGRbaV0pIHtcclxuICAgICAgICAgICAgICAgICAgICB1cmxbaV0udmlldyA9IG9sZFtpXS52aWV3O1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYgKG9sZFtpXSAmJiB1cmxbaV0ucGFnZSA9PT0gb2xkW2ldLnBhZ2UpIHtcclxuICAgICAgICAgICAgICAgICAgICB1cmxbaV0uaXNOZXcgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdXJsO1xyXG4gICAgfVxyXG4gICAgYXBwZW5kKHBhdGgpIHtcclxuICAgICAgICBjb25zdCB1cmwgPSB0aGlzLl9qb2luKHBhdGgsIHRydWUpO1xyXG4gICAgICAgIHRoaXMucm91dGUucGF0aCA9IHVybDJzdHIodXJsKTtcclxuICAgICAgICB0aGlzLnJvdXRlLnVybCA9IHVybDtcclxuICAgICAgICByZXR1cm4gdGhpcy5yb3V0ZS5wYXRoO1xyXG4gICAgfVxyXG4gICAgc2hvdyhwYXRoLCB2aWV3LCBraWRzKSB7XHJcbiAgICAgICAgY29uc3QgdXJsID0gdGhpcy5fam9pbihwYXRoLCBraWRzKTtcclxuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlcywgcmVqKSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnN0IHJlZGlyZWN0ID0gdXJsMnN0cih1cmwpO1xyXG4gICAgICAgICAgICBjb25zdCBvYmogPSB7XHJcbiAgICAgICAgICAgICAgICB1cmwsXHJcbiAgICAgICAgICAgICAgICByZWRpcmVjdCxcclxuICAgICAgICAgICAgICAgIGNvbmZpcm06IFByb21pc2UucmVzb2x2ZSgpXHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIGNvbnN0IGFwcCA9IHZpZXcgPyB2aWV3LmFwcCA6IG51bGw7XHJcbiAgICAgICAgICAgIC8vIHdoZW4gY3JlYXRpbmcgYSBuZXcgcm91dGUsIGl0IHBvc3NpYmxlIHRoYXQgaXQgd2lsbCBub3QgaGF2ZSBhbnkgY29udGVudFxyXG4gICAgICAgICAgICAvLyBndWFyZCBpcyBub3QgbmVjZXNzYXJ5IGluIHN1Y2ggY2FzZVxyXG4gICAgICAgICAgICBpZiAoYXBwKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCByZXN1bHQgPSBhcHAuY2FsbEV2ZW50KFwiYXBwOmd1YXJkXCIsIFtvYmoucmVkaXJlY3QsIHZpZXcsIG9ial0pO1xyXG4gICAgICAgICAgICAgICAgaWYgKCFyZXN1bHQpIHtcclxuICAgICAgICAgICAgICAgICAgICByZWoobmV3IE5hdmlnYXRpb25CbG9ja2VkKCkpO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBvYmouY29uZmlybS5jYXRjaChlcnIgPT4gcmVqKGVycikpLnRoZW4oKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKG9iai5yZWRpcmVjdCA9PT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJlaihuZXcgTmF2aWdhdGlvbkJsb2NrZWQoKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYgKG9iai5yZWRpcmVjdCAhPT0gcmVkaXJlY3QpIHtcclxuICAgICAgICAgICAgICAgICAgICBhcHAuc2hvdyhvYmoucmVkaXJlY3QpO1xyXG4gICAgICAgICAgICAgICAgICAgIHJlaihuZXcgTmF2aWdhdGlvbkJsb2NrZWQoKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgdGhpcy5yb3V0ZS5wYXRoID0gcmVkaXJlY3Q7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnJvdXRlLnVybCA9IHVybDtcclxuICAgICAgICAgICAgICAgIHJlcygpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuICAgIHNpemUobikge1xyXG4gICAgICAgIHRoaXMuX25leHQgPSBuO1xyXG4gICAgfVxyXG4gICAgc3BsaXQoKSB7XHJcbiAgICAgICAgY29uc3Qgcm91dGUgPSB7XHJcbiAgICAgICAgICAgIHVybDogdGhpcy5yb3V0ZS51cmwuc2xpY2UodGhpcy5pbmRleCArIDEpLFxyXG4gICAgICAgICAgICBwYXRoOiBcIlwiXHJcbiAgICAgICAgfTtcclxuICAgICAgICBpZiAocm91dGUudXJsLmxlbmd0aCkge1xyXG4gICAgICAgICAgICByb3V0ZS5wYXRoID0gdXJsMnN0cihyb3V0ZS51cmwpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gbmV3IFJvdXRlKHJvdXRlLCAwKTtcclxuICAgIH1cclxuICAgIHVwZGF0ZShuYW1lLCB2YWx1ZSwgaW5kZXgpIHtcclxuICAgICAgICBjb25zdCBjaHVuayA9IHRoaXMucm91dGUudXJsW3RoaXMuaW5kZXggKyAoaW5kZXggfHwgMCldO1xyXG4gICAgICAgIGlmICghY2h1bmspIHtcclxuICAgICAgICAgICAgdGhpcy5yb3V0ZS51cmwucHVzaCh7IHBhZ2U6IFwiXCIsIHBhcmFtczoge30gfSk7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnVwZGF0ZShuYW1lLCB2YWx1ZSwgaW5kZXgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAobmFtZSA9PT0gXCJcIikge1xyXG4gICAgICAgICAgICBjaHVuay5wYWdlID0gdmFsdWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICBjaHVuay5wYXJhbXNbbmFtZV0gPSB2YWx1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5yb3V0ZS5wYXRoID0gdXJsMnN0cih0aGlzLnJvdXRlLnVybCk7XHJcbiAgICB9XHJcbn1cblxuY2xhc3MgSmV0VmlldyBleHRlbmRzIEpldEJhc2Uge1xyXG4gICAgY29uc3RydWN0b3IoYXBwLCBjb25maWcpIHtcclxuICAgICAgICBzdXBlcihhcHAud2ViaXgpO1xyXG4gICAgICAgIHRoaXMuYXBwID0gYXBwO1xyXG4gICAgICAgIC8vdGhpcy4kY29uZmlnID0gY29uZmlnO1xyXG4gICAgICAgIHRoaXMuX2NoaWxkcmVuID0gW107XHJcbiAgICB9XHJcbiAgICB1aSh1aSwgY29uZmlnKSB7XHJcbiAgICAgICAgY29uZmlnID0gY29uZmlnIHx8IHt9O1xyXG4gICAgICAgIGNvbnN0IGNvbnRhaW5lciA9IGNvbmZpZy5jb250YWluZXIgfHwgdWkuY29udGFpbmVyO1xyXG4gICAgICAgIGNvbnN0IGpldHZpZXcgPSB0aGlzLmFwcC5jcmVhdGVWaWV3KHVpKTtcclxuICAgICAgICB0aGlzLl9jaGlsZHJlbi5wdXNoKGpldHZpZXcpO1xyXG4gICAgICAgIGpldHZpZXcucmVuZGVyKGNvbnRhaW5lciwgdGhpcy5fc2VnbWVudCwgdGhpcyk7XHJcbiAgICAgICAgaWYgKHR5cGVvZiB1aSAhPT0gXCJvYmplY3RcIiB8fCAodWkgaW5zdGFuY2VvZiBKZXRCYXNlKSkge1xyXG4gICAgICAgICAgICAvLyByYXcgd2ViaXggVUlcclxuICAgICAgICAgICAgcmV0dXJuIGpldHZpZXc7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICByZXR1cm4gamV0dmlldy5nZXRSb290KCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgc2hvdyhwYXRoLCBjb25maWcpIHtcclxuICAgICAgICBjb25maWcgPSBjb25maWcgfHwge307XHJcbiAgICAgICAgLy8gY29udmVydCBwYXJhbWV0ZXJzIG9iamVjdCB0byB1cmxcclxuICAgICAgICBpZiAodHlwZW9mIHBhdGggPT09IFwib2JqZWN0XCIpIHtcclxuICAgICAgICAgICAgZm9yIChjb25zdCBrZXkgaW4gcGF0aCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zZXRQYXJhbShrZXksIHBhdGhba2V5XSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcGF0aCA9IG51bGw7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAvLyBkZWxpZ2F0ZSB0byBhcHAgaW4gY2FzZSBvZiByb290IHByZWZpeFxyXG4gICAgICAgICAgICBpZiAocGF0aC5zdWJzdHIoMCwgMSkgPT09IFwiL1wiKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5hcHAuc2hvdyhwYXRoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAvLyBsb2NhbCBwYXRoLCBkbyBub3RoaW5nXHJcbiAgICAgICAgICAgIGlmIChwYXRoLmluZGV4T2YoXCIuL1wiKSA9PT0gMCkge1xyXG4gICAgICAgICAgICAgICAgcGF0aCA9IHBhdGguc3Vic3RyKDIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIC8vIHBhcmVudCBwYXRoLCBjYWxsIHBhcmVudCB2aWV3XHJcbiAgICAgICAgICAgIGlmIChwYXRoLmluZGV4T2YoXCIuLi9cIikgPT09IDApIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHBhcmVudCA9IHRoaXMuZ2V0UGFyZW50VmlldygpO1xyXG4gICAgICAgICAgICAgICAgaWYgKHBhcmVudCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBwYXJlbnQuc2hvdyhwYXRoLnN1YnN0cigzKSwgY29uZmlnKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmFwcC5zaG93KFwiL1wiICsgcGF0aC5zdWJzdHIoMykpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGNvbnN0IHN1YiA9IHRoaXMuZ2V0U3ViVmlld0luZm8oY29uZmlnLnRhcmdldCk7XHJcbiAgICAgICAgICAgIGlmIChzdWIpIHtcclxuICAgICAgICAgICAgICAgIGlmIChzdWIucGFyZW50ICE9PSB0aGlzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHN1Yi5wYXJlbnQuc2hvdyhwYXRoLCBjb25maWcpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZSBpZiAoY29uZmlnLnRhcmdldCAmJiBjb25maWcudGFyZ2V0ICE9PSBcImRlZmF1bHRcIikge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl9yZW5kZXJGcmFtZUxvY2soY29uZmlnLnRhcmdldCwgc3ViLnN1YnZpZXcsIHBhdGgpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgaWYgKHBhdGgpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5hcHAuc2hvdyhcIi9cIiArIHBhdGgpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0aGlzLl9zaG93KHRoaXMuX3NlZ21lbnQsIHBhdGgsIHRoaXMpO1xyXG4gICAgfVxyXG4gICAgX3Nob3coc2VnbWVudCwgcGF0aCwgdmlldykge1xyXG4gICAgICAgIHJldHVybiBzZWdtZW50LnNob3cocGF0aCwgdmlldywgdHJ1ZSkudGhlbigoKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuX2luaXRfdXJsX2RhdGEoKTtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3VybENoYW5nZSgpO1xyXG4gICAgICAgIH0pLnRoZW4oKCkgPT4ge1xyXG4gICAgICAgICAgICBpZiAoc2VnbWVudC5yb3V0ZS5saW5rUm91dGVyKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmFwcC5nZXRSb3V0ZXIoKS5zZXQoc2VnbWVudC5yb3V0ZS5wYXRoLCB7IHNpbGVudDogdHJ1ZSB9KTtcclxuICAgICAgICAgICAgICAgIHRoaXMuYXBwLmNhbGxFdmVudChcImFwcDpyb3V0ZVwiLCBbc2VnbWVudC5yb3V0ZS5wYXRoXSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxuICAgIGluaXQoXyR2aWV3LCBfJCkge1xyXG4gICAgICAgIC8vIHN0dWJcclxuICAgIH1cclxuICAgIHJlYWR5KF8kdmlldywgXyR1cmwpIHtcclxuICAgICAgICAvLyBzdHViXHJcbiAgICB9XHJcbiAgICBjb25maWcoKSB7XHJcbiAgICAgICAgdGhpcy5hcHAud2ViaXgubWVzc2FnZShcIlZpZXc6Q29uZmlnIGlzIG5vdCBpbXBsZW1lbnRlZFwiKTtcclxuICAgIH1cclxuICAgIHVybENoYW5nZShfJHZpZXcsIF8kdXJsKSB7XHJcbiAgICAgICAgLy8gc3R1YlxyXG4gICAgfVxyXG4gICAgZGVzdHJveSgpIHtcclxuICAgICAgICAvLyBzdHViXHJcbiAgICB9XHJcbiAgICBkZXN0cnVjdG9yKCkge1xyXG4gICAgICAgIHRoaXMuZGVzdHJveSgpO1xyXG4gICAgICAgIHRoaXMuX2Rlc3Ryb3lLaWRzKCk7XHJcbiAgICAgICAgLy8gZGVzdHJveSBhY3R1YWwgVUlcclxuICAgICAgICB0aGlzLl9yb290LmRlc3RydWN0b3IoKTtcclxuICAgICAgICBzdXBlci5kZXN0cnVjdG9yKCk7XHJcbiAgICB9XHJcbiAgICB1c2UocGx1Z2luLCBjb25maWcpIHtcclxuICAgICAgICBwbHVnaW4odGhpcy5hcHAsIHRoaXMsIGNvbmZpZyk7XHJcbiAgICB9XHJcbiAgICByZWZyZXNoKCkge1xyXG4gICAgICAgIGNvbnN0IHVybCA9IHRoaXMuZ2V0VXJsKCk7XHJcbiAgICAgICAgdGhpcy5kZXN0cm95KCk7XHJcbiAgICAgICAgdGhpcy5fZGVzdHJveUtpZHMoKTtcclxuICAgICAgICB0aGlzLl9kZXN0cm95U3VicygpO1xyXG4gICAgICAgIHRoaXMuX2RldGFjaEV2ZW50cygpO1xyXG4gICAgICAgIGlmICh0aGlzLl9jb250YWluZXIudGFnTmFtZSkge1xyXG4gICAgICAgICAgICB0aGlzLl9yb290LmRlc3RydWN0b3IoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5fc2VnbWVudC5yZWZyZXNoKCk7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX3JlbmRlcih0aGlzLl9zZWdtZW50KTtcclxuICAgIH1cclxuICAgIHJlbmRlcihyb290LCB1cmwsIHBhcmVudCkge1xyXG4gICAgICAgIGlmICh0eXBlb2YgdXJsID09PSBcInN0cmluZ1wiKSB7XHJcbiAgICAgICAgICAgIHVybCA9IG5ldyBSb3V0ZSh1cmwsIDApO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLl9zZWdtZW50ID0gdXJsO1xyXG4gICAgICAgIHRoaXMuX3BhcmVudCA9IHBhcmVudDtcclxuICAgICAgICB0aGlzLl9pbml0X3VybF9kYXRhKCk7XHJcbiAgICAgICAgcm9vdCA9IHJvb3QgfHwgZG9jdW1lbnQuYm9keTtcclxuICAgICAgICBjb25zdCBfY29udGFpbmVyID0gKHR5cGVvZiByb290ID09PSBcInN0cmluZ1wiKSA/IHRoaXMud2ViaXgudG9Ob2RlKHJvb3QpIDogcm9vdDtcclxuICAgICAgICBpZiAodGhpcy5fY29udGFpbmVyICE9PSBfY29udGFpbmVyKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2NvbnRhaW5lciA9IF9jb250YWluZXI7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9yZW5kZXIodXJsKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl91cmxDaGFuZ2UoKS50aGVuKCgpID0+IHRoaXMuZ2V0Um9vdCgpKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBfcmVuZGVyKHVybCkge1xyXG4gICAgICAgIGNvbnN0IGNvbmZpZyA9IHRoaXMuY29uZmlnKCk7XHJcbiAgICAgICAgaWYgKGNvbmZpZy50aGVuKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBjb25maWcudGhlbihjZmcgPT4gdGhpcy5fcmVuZGVyX2ZpbmFsKGNmZywgdXJsKSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fcmVuZGVyX2ZpbmFsKGNvbmZpZywgdXJsKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBfcmVuZGVyX2ZpbmFsKGNvbmZpZywgdXJsKSB7XHJcbiAgICAgICAgLy8gZ2V0IHByZXZpb3VzIHZpZXcgaW4gdGhlIHNhbWUgc2xvdFxyXG4gICAgICAgIGxldCBzbG90ID0gbnVsbDtcclxuICAgICAgICBsZXQgY29udGFpbmVyID0gbnVsbDtcclxuICAgICAgICBsZXQgc2hvdyA9IGZhbHNlO1xyXG4gICAgICAgIGlmICghdGhpcy5fY29udGFpbmVyLnRhZ05hbWUpIHtcclxuICAgICAgICAgICAgc2xvdCA9IHRoaXMuX2NvbnRhaW5lcjtcclxuICAgICAgICAgICAgaWYgKHNsb3QucG9wdXApIHtcclxuICAgICAgICAgICAgICAgIGNvbnRhaW5lciA9IGRvY3VtZW50LmJvZHk7XHJcbiAgICAgICAgICAgICAgICBzaG93ID0gdHJ1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGNvbnRhaW5lciA9IHRoaXMud2ViaXguJCQoc2xvdC5pZCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIGNvbnRhaW5lciA9IHRoaXMuX2NvbnRhaW5lcjtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gdmlldyBhbHJlYWR5IGRlc3Ryb3llZFxyXG4gICAgICAgIGlmICghdGhpcy5hcHAgfHwgIWNvbnRhaW5lcikge1xyXG4gICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QobnVsbCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxldCByZXNwb25zZTtcclxuICAgICAgICBjb25zdCBjdXJyZW50ID0gdGhpcy5fc2VnbWVudC5jdXJyZW50KCk7XHJcbiAgICAgICAgLy8gdXNpbmcgd3JhcHBlciBvYmplY3QsIHNvIHVpIGNhbiBiZSBjaGFuZ2VkIGZyb20gYXBwOnJlbmRlciBldmVudFxyXG4gICAgICAgIGNvbnN0IHJlc3VsdCA9IHsgdWk6IHt9IH07XHJcbiAgICAgICAgdGhpcy5hcHAuY29weUNvbmZpZyhjb25maWcsIHJlc3VsdC51aSwgdGhpcy5fc3Vicyk7XHJcbiAgICAgICAgdGhpcy5hcHAuY2FsbEV2ZW50KFwiYXBwOnJlbmRlclwiLCBbdGhpcywgdXJsLCByZXN1bHRdKTtcclxuICAgICAgICByZXN1bHQudWkuJHNjb3BlID0gdGhpcztcclxuICAgICAgICAvKiBkZXN0cm95IG9sZCBIVE1MIGF0dGFjaGVkIHZpZXdzIGJlZm9yZSBjcmVhdGluZyBuZXcgb25lICovXHJcbiAgICAgICAgaWYgKCFzbG90ICYmIGN1cnJlbnQuaXNOZXcgJiYgY3VycmVudC52aWV3KSB7XHJcbiAgICAgICAgICAgIGN1cnJlbnQudmlldy5kZXN0cnVjdG9yKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIC8vIHNwZWNpYWwgaGFuZGxpbmcgZm9yIGFkZGluZyBpbnNpZGUgb2YgbXVsdGl2aWV3IC0gcHJlc2VydmUgb2xkIGlkXHJcbiAgICAgICAgICAgIGlmIChzbG90ICYmICFzaG93KSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBvbGR1aSA9IGNvbnRhaW5lcjtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHBhcmVudCA9IG9sZHVpLmdldFBhcmVudFZpZXcoKTtcclxuICAgICAgICAgICAgICAgIGlmIChwYXJlbnQgJiYgcGFyZW50Lm5hbWUgPT09IFwibXVsdGl2aWV3XCIgJiYgIXJlc3VsdC51aS5pZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdC51aS5pZCA9IG9sZHVpLmNvbmZpZy5pZDtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLl9yb290ID0gdGhpcy5hcHAud2ViaXgudWkocmVzdWx0LnVpLCBjb250YWluZXIpO1xyXG4gICAgICAgICAgICBjb25zdCBhc1dpbiA9IHRoaXMuX3Jvb3Q7XHJcbiAgICAgICAgICAgIC8vIGNoZWNrIGZvciB1cmwgYWRkZWQgdG8gaWdub3JlIHRoaXMudWkgY2FsbHNcclxuICAgICAgICAgICAgaWYgKHNob3cgJiYgYXNXaW4uc2V0UG9zaXRpb24gJiYgIWFzV2luLmlzVmlzaWJsZSgpKSB7XHJcbiAgICAgICAgICAgICAgICBhc1dpbi5zaG93KCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgLy8gY2hlY2ssIGlmIHdlIGFyZSByZXBsYWNpbmcgc29tZSBvbGRlciB2aWV3XHJcbiAgICAgICAgICAgIGlmIChzbG90KSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoc2xvdC52aWV3ICYmIHNsb3QudmlldyAhPT0gdGhpcyAmJiBzbG90LnZpZXcgIT09IHRoaXMuYXBwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgc2xvdC52aWV3LmRlc3RydWN0b3IoKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHNsb3QuaWQgPSB0aGlzLl9yb290LmNvbmZpZy5pZDtcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmdldFBhcmVudFZpZXcoKSB8fCAhdGhpcy5hcHAuYXBwKVxyXG4gICAgICAgICAgICAgICAgICAgIHNsb3QudmlldyA9IHRoaXM7XHJcbiAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAvLyB3aGVuIHdlIGhhdmUgc3ViYXBwLCBzZXQgd2hvbGUgYXBwIGFzIGEgdmlld1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIHNvIG9uIGRlc3RydWN0aW9uLCB0aGUgd2hvbGUgYXBwIHdpbGwgYmUgZGVzdHJveWVkXHJcbiAgICAgICAgICAgICAgICAgICAgc2xvdC52aWV3ID0gdGhpcy5hcHA7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKGN1cnJlbnQuaXNOZXcpIHtcclxuICAgICAgICAgICAgICAgIGN1cnJlbnQudmlldyA9IHRoaXM7XHJcbiAgICAgICAgICAgICAgICBjdXJyZW50LmlzTmV3ID0gZmFsc2U7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmVzcG9uc2UgPSBQcm9taXNlLnJlc29sdmUodGhpcy5faW5pdCh0aGlzLl9yb290LCB1cmwpKS50aGVuKCgpID0+IHtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl91cmxDaGFuZ2UoKS50aGVuKCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9pbml0VXJsID0gbnVsbDtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5yZWFkeSh0aGlzLl9yb290LCB1cmwuc3VidXJsKCkpO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjYXRjaCAoZSkge1xyXG4gICAgICAgICAgICByZXNwb25zZSA9IFByb21pc2UucmVqZWN0KGUpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gcmVzcG9uc2UuY2F0Y2goZXJyID0+IHRoaXMuX2luaXRFcnJvcih0aGlzLCBlcnIpKTtcclxuICAgIH1cclxuICAgIF9pbml0KHZpZXcsIHVybCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmluaXQodmlldywgdXJsLnN1YnVybCgpKTtcclxuICAgIH1cclxuICAgIF91cmxDaGFuZ2UoKSB7XHJcbiAgICAgICAgdGhpcy5hcHAuY2FsbEV2ZW50KFwiYXBwOnVybGNoYW5nZVwiLCBbdGhpcywgdGhpcy5fc2VnbWVudF0pO1xyXG4gICAgICAgIGNvbnN0IHdhaXRzID0gW107XHJcbiAgICAgICAgZm9yIChjb25zdCBrZXkgaW4gdGhpcy5fc3Vicykge1xyXG4gICAgICAgICAgICBjb25zdCBmcmFtZSA9IHRoaXMuX3N1YnNba2V5XTtcclxuICAgICAgICAgICAgY29uc3Qgd2FpdCA9IHRoaXMuX3JlbmRlckZyYW1lTG9jayhrZXksIGZyYW1lLCBudWxsKTtcclxuICAgICAgICAgICAgaWYgKHdhaXQpIHtcclxuICAgICAgICAgICAgICAgIHdhaXRzLnB1c2god2FpdCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIFByb21pc2UuYWxsKHdhaXRzKS50aGVuKCgpID0+IHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMudXJsQ2hhbmdlKHRoaXMuX3Jvb3QsIHRoaXMuX3NlZ21lbnQuc3VidXJsKCkpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgX3JlbmRlckZyYW1lTG9jayhrZXksIGZyYW1lLCBwYXRoKSB7XHJcbiAgICAgICAgLy8gaWYgc3VidmlldyBpcyBub3Qgb2NjdXBpZWQgYnkgc29tZSByZW5kZXJpbmcgeWV0XHJcbiAgICAgICAgaWYgKCFmcmFtZS5sb2NrKSB7XHJcbiAgICAgICAgICAgIC8vIHJldHJlaXZlIGFuZCBzdG9yZSByZW5kZXJpbmcgZW5kIHByb21pc2VcclxuICAgICAgICAgICAgY29uc3QgbG9jayA9IHRoaXMuX3JlbmRlckZyYW1lKGtleSwgZnJhbWUsIHBhdGgpO1xyXG4gICAgICAgICAgICBpZiAobG9jaykge1xyXG4gICAgICAgICAgICAgICAgLy8gY2xlYXIgbG9jayBhZnRlciBmcmFtZSByZW5kZXJpbmdcclxuICAgICAgICAgICAgICAgIC8vIGFzIHByb21pc2UuZmluYWxseSBpcyBub3Qgc3VwcG9ydGVkIGJ5ICBXZWJpeCBsZXNzZXIgdGhhbiA2LjJcclxuICAgICAgICAgICAgICAgIC8vIHVzaW5nIGEgbW9yZSB2ZXJib3NlIG5vdGF0aW9uXHJcbiAgICAgICAgICAgICAgICBmcmFtZS5sb2NrID0gbG9jay50aGVuKCgpID0+IGZyYW1lLmxvY2sgPSBudWxsLCAoKSA9PiBmcmFtZS5sb2NrID0gbnVsbCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gcmV0dXJuIHJlbmRlcmluZyBlbmQgcHJvbWlzZVxyXG4gICAgICAgIHJldHVybiBmcmFtZS5sb2NrO1xyXG4gICAgfVxyXG4gICAgX3JlbmRlckZyYW1lKGtleSwgZnJhbWUsIHBhdGgpIHtcclxuICAgICAgICAvL2RlZmF1bHQgcm91dGVcclxuICAgICAgICBpZiAoa2V5ID09PSBcImRlZmF1bHRcIikge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5fc2VnbWVudC5uZXh0KCkpIHtcclxuICAgICAgICAgICAgICAgIC8vIHdlIGhhdmUgYSBuZXh0IHNlZ21lbnQgaW4gdXJsLCByZW5kZXIgaXRcclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl9jcmVhdGVTdWJWaWV3KGZyYW1lLCB0aGlzLl9zZWdtZW50LnNoaWZ0KCkpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2UgaWYgKGZyYW1lLnZpZXcgJiYgZnJhbWUucG9wdXApIHtcclxuICAgICAgICAgICAgICAgIC8vIHRoZXJlIGlzIG5vIG5leHQgc2VnbWVudCwgZGVsZXRlIHRoZSBleGlzdGluZyBzdWItdmlld1xyXG4gICAgICAgICAgICAgICAgZnJhbWUudmlldy5kZXN0cnVjdG9yKCk7XHJcbiAgICAgICAgICAgICAgICBmcmFtZS52aWV3ID0gbnVsbDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICAvL2lmIG5ldyBwYXRoIHByb3ZpZGVkLCBzZXQgaXQgdG8gdGhlIGZyYW1lXHJcbiAgICAgICAgaWYgKHBhdGggIT09IG51bGwpIHtcclxuICAgICAgICAgICAgZnJhbWUudXJsID0gcGF0aDtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gaW4gY2FzZSBvZiByb3V0ZWQgc3ViLXZpZXdcclxuICAgICAgICBpZiAoZnJhbWUucm91dGUpIHtcclxuICAgICAgICAgICAgLy8gd2UgaGF2ZSBhIG5ldyBwYXRoIGZvciBzdWItdmlld1xyXG4gICAgICAgICAgICBpZiAocGF0aCAhPT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZyYW1lLnJvdXRlLnNob3cocGF0aCwgZnJhbWUudmlldykudGhlbigoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2NyZWF0ZVN1YlZpZXcoZnJhbWUsIGZyYW1lLnJvdXRlKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIC8vIGRvIG5vdCB0cmlnZ2VyIG9uQ2hhbmdlIGZvciBpc29sYXRlZCBzdWItdmlld3NcclxuICAgICAgICAgICAgaWYgKGZyYW1lLmJyYW5jaCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxldCB2aWV3ID0gZnJhbWUudmlldztcclxuICAgICAgICAvLyBpZiB2aWV3IGRvZXNuJ3QgZXhpc3RzIHlldCwgaW5pdCBpdFxyXG4gICAgICAgIGlmICghdmlldyAmJiBmcmFtZS51cmwpIHtcclxuICAgICAgICAgICAgaWYgKHR5cGVvZiBmcmFtZS51cmwgPT09IFwic3RyaW5nXCIpIHtcclxuICAgICAgICAgICAgICAgIC8vIHN0cmluZywgc28gd2UgaGF2ZSBpc29sYXRlZCBzdWJ2aWV3IHVybFxyXG4gICAgICAgICAgICAgICAgZnJhbWUucm91dGUgPSBuZXcgUm91dGUoZnJhbWUudXJsLCAwKTtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl9jcmVhdGVTdWJWaWV3KGZyYW1lLCBmcmFtZS5yb3V0ZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAvLyBvYmplY3QsIHNvIHdlIGhhdmUgYW4gZW1iZWRlZCBzdWJ2aWV3XHJcbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mIGZyYW1lLnVybCA9PT0gXCJmdW5jdGlvblwiICYmICEodmlldyBpbnN0YW5jZW9mIGZyYW1lLnVybCkpIHtcclxuICAgICAgICAgICAgICAgICAgICB2aWV3ID0gbmV3IGZyYW1lLnVybCh0aGlzLmFwcCwgXCJcIik7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZiAoIXZpZXcpIHtcclxuICAgICAgICAgICAgICAgICAgICB2aWV3ID0gZnJhbWUudXJsO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIHRyaWdnZXIgb25DaGFuZ2UgZm9yIGFscmVhZHkgZXhpc3RlZCB2aWV3XHJcbiAgICAgICAgaWYgKHZpZXcpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHZpZXcucmVuZGVyKGZyYW1lLCAoZnJhbWUucm91dGUgfHwgdGhpcy5fc2VnbWVudCksIHRoaXMpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIF9pbml0RXJyb3IodmlldywgZXJyKSB7XHJcbiAgICAgICAgLypcclxuICAgICAgICAgICAgaWYgdmlldyBpcyBkZXN0cm95ZWQsIGlnbm9yZSBhbnkgdmlldyByZWxhdGVkIGVycm9yc1xyXG4gICAgICAgICovXHJcbiAgICAgICAgaWYgKHRoaXMuYXBwKSB7XHJcbiAgICAgICAgICAgIHRoaXMuYXBwLmVycm9yKFwiYXBwOmVycm9yOmluaXR2aWV3XCIsIFtlcnIsIHZpZXddKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICB9XHJcbiAgICBfY3JlYXRlU3ViVmlldyhzdWIsIHN1YnVybCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmFwcC5jcmVhdGVGcm9tVVJMKHN1YnVybC5jdXJyZW50KCkpLnRoZW4odmlldyA9PiB7XHJcbiAgICAgICAgICAgIHJldHVybiB2aWV3LnJlbmRlcihzdWIsIHN1YnVybCwgdGhpcyk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICBfZGVzdHJveUtpZHMoKSB7XHJcbiAgICAgICAgLy8gZGVzdHJveSBjaGlsZCB2aWV3c1xyXG4gICAgICAgIGNvbnN0IHVpcyA9IHRoaXMuX2NoaWxkcmVuO1xyXG4gICAgICAgIGZvciAobGV0IGkgPSB1aXMubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIHtcclxuICAgICAgICAgICAgaWYgKHVpc1tpXSAmJiB1aXNbaV0uZGVzdHJ1Y3Rvcikge1xyXG4gICAgICAgICAgICAgICAgdWlzW2ldLmRlc3RydWN0b3IoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICAvLyByZXNldCB2YXJzIGZvciBiZXR0ZXIgR0MgcHJvY2Vzc2luZ1xyXG4gICAgICAgIHRoaXMuX2NoaWxkcmVuID0gW107XHJcbiAgICB9XHJcbn1cblxuLy8gd3JhcHBlciBmb3IgcmF3IG9iamVjdHMgYW5kIEpldCAxLnggc3RydWN0c1xyXG5jbGFzcyBKZXRWaWV3UmF3IGV4dGVuZHMgSmV0VmlldyB7XHJcbiAgICBjb25zdHJ1Y3RvcihhcHAsIGNvbmZpZykge1xyXG4gICAgICAgIHN1cGVyKGFwcCwgY29uZmlnKTtcclxuICAgICAgICB0aGlzLl91aSA9IGNvbmZpZy51aTtcclxuICAgIH1cclxuICAgIGNvbmZpZygpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fdWk7XHJcbiAgICB9XHJcbn1cblxuY2xhc3MgU3ViUm91dGVyIHtcclxuICAgIGNvbnN0cnVjdG9yKGNiLCBjb25maWcsIGFwcCkge1xyXG4gICAgICAgIHRoaXMucGF0aCA9IFwiXCI7XHJcbiAgICAgICAgdGhpcy5hcHAgPSBhcHA7XHJcbiAgICB9XHJcbiAgICBzZXQocGF0aCwgY29uZmlnKSB7XHJcbiAgICAgICAgdGhpcy5wYXRoID0gcGF0aDtcclxuICAgICAgICBjb25zdCBhID0gdGhpcy5hcHA7XHJcbiAgICAgICAgYS5hcHAuZ2V0Um91dGVyKCkuc2V0KGEuX3NlZ21lbnQuYXBwZW5kKHRoaXMucGF0aCksIHsgc2lsZW50OiB0cnVlIH0pO1xyXG4gICAgfVxyXG4gICAgZ2V0KCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnBhdGg7XHJcbiAgICB9XHJcbn1cblxubGV0IF9vbmNlID0gdHJ1ZTtcclxuY2xhc3MgSmV0QXBwQmFzZSBleHRlbmRzIEpldEJhc2Uge1xyXG4gICAgY29uc3RydWN0b3IoY29uZmlnKSB7XHJcbiAgICAgICAgY29uc3Qgd2ViaXggPSAoY29uZmlnIHx8IHt9KS53ZWJpeCB8fCB3aW5kb3cud2ViaXg7XHJcbiAgICAgICAgc3VwZXIod2ViaXgpO1xyXG4gICAgICAgIC8vIGluaXQgY29uZmlnXHJcbiAgICAgICAgdGhpcy5jb25maWcgPSB0aGlzLndlYml4LmV4dGVuZCh7XHJcbiAgICAgICAgICAgIG5hbWU6IFwiQXBwXCIsXHJcbiAgICAgICAgICAgIHZlcnNpb246IFwiMS4wXCIsXHJcbiAgICAgICAgICAgIHN0YXJ0OiBcIi9ob21lXCJcclxuICAgICAgICB9LCBjb25maWcsIHRydWUpO1xyXG4gICAgICAgIHRoaXMuYXBwID0gdGhpcy5jb25maWcuYXBwO1xyXG4gICAgICAgIHRoaXMucmVhZHkgPSBQcm9taXNlLnJlc29sdmUoKTtcclxuICAgICAgICB0aGlzLl9zZXJ2aWNlcyA9IHt9O1xyXG4gICAgICAgIHRoaXMud2ViaXguZXh0ZW5kKHRoaXMsIHRoaXMud2ViaXguRXZlbnRTeXN0ZW0pO1xyXG4gICAgfVxyXG4gICAgZ2V0VXJsKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9zdWJTZWdtZW50LnN1YnVybCgpO1xyXG4gICAgfVxyXG4gICAgZ2V0VXJsU3RyaW5nKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9zdWJTZWdtZW50LnRvU3RyaW5nKCk7XHJcbiAgICB9XHJcbiAgICBnZXRTZXJ2aWNlKG5hbWUpIHtcclxuICAgICAgICBsZXQgb2JqID0gdGhpcy5fc2VydmljZXNbbmFtZV07XHJcbiAgICAgICAgaWYgKHR5cGVvZiBvYmogPT09IFwiZnVuY3Rpb25cIikge1xyXG4gICAgICAgICAgICBvYmogPSB0aGlzLl9zZXJ2aWNlc1tuYW1lXSA9IG9iaih0aGlzKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIG9iajtcclxuICAgIH1cclxuICAgIHNldFNlcnZpY2UobmFtZSwgaGFuZGxlcikge1xyXG4gICAgICAgIHRoaXMuX3NlcnZpY2VzW25hbWVdID0gaGFuZGxlcjtcclxuICAgIH1cclxuICAgIGRlc3RydWN0b3IoKSB7XHJcbiAgICAgICAgdGhpcy5nZXRTdWJWaWV3KCkuZGVzdHJ1Y3RvcigpO1xyXG4gICAgICAgIHN1cGVyLmRlc3RydWN0b3IoKTtcclxuICAgIH1cclxuICAgIC8vIGNvcHkgb2JqZWN0IGFuZCBjb2xsZWN0IGV4dHJhIGhhbmRsZXJzXHJcbiAgICBjb3B5Q29uZmlnKG9iaiwgdGFyZ2V0LCBjb25maWcpIHtcclxuICAgICAgICAvLyByYXcgdWkgY29uZmlnXHJcbiAgICAgICAgaWYgKG9iaiBpbnN0YW5jZW9mIEpldEJhc2UgfHxcclxuICAgICAgICAgICAgKHR5cGVvZiBvYmogPT09IFwiZnVuY3Rpb25cIiAmJiBvYmoucHJvdG90eXBlIGluc3RhbmNlb2YgSmV0QmFzZSkpIHtcclxuICAgICAgICAgICAgb2JqID0geyAkc3Vidmlldzogb2JqIH07XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIHN1YnZpZXcgcGxhY2Vob2xkZXJcclxuICAgICAgICBpZiAodHlwZW9mIG9iai4kc3VidmlldyAhPSBcInVuZGVmaW5lZFwiKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmFkZFN1YlZpZXcob2JqLCB0YXJnZXQsIGNvbmZpZyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIHByb2Nlc3Mgc3ViLXByb3BlcnRpZXNcclxuICAgICAgICB0YXJnZXQgPSB0YXJnZXQgfHwgKG9iaiBpbnN0YW5jZW9mIEFycmF5ID8gW10gOiB7fSk7XHJcbiAgICAgICAgZm9yIChjb25zdCBtZXRob2QgaW4gb2JqKSB7XHJcbiAgICAgICAgICAgIGxldCBwb2ludCA9IG9ialttZXRob2RdO1xyXG4gICAgICAgICAgICAvLyB2aWV3IGNsYXNzXHJcbiAgICAgICAgICAgIGlmICh0eXBlb2YgcG9pbnQgPT09IFwiZnVuY3Rpb25cIiAmJiBwb2ludC5wcm90b3R5cGUgaW5zdGFuY2VvZiBKZXRCYXNlKSB7XHJcbiAgICAgICAgICAgICAgICBwb2ludCA9IHsgJHN1YnZpZXc6IHBvaW50IH07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKHBvaW50ICYmIHR5cGVvZiBwb2ludCA9PT0gXCJvYmplY3RcIiAmJlxyXG4gICAgICAgICAgICAgICAgIShwb2ludCBpbnN0YW5jZW9mIHRoaXMud2ViaXguRGF0YUNvbGxlY3Rpb24pICYmICEocG9pbnQgaW5zdGFuY2VvZiBSZWdFeHApKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAocG9pbnQgaW5zdGFuY2VvZiBEYXRlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGFyZ2V0W21ldGhvZF0gPSBuZXcgRGF0ZShwb2ludCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBjb3B5ID0gdGhpcy5jb3B5Q29uZmlnKHBvaW50LCAocG9pbnQgaW5zdGFuY2VvZiBBcnJheSA/IFtdIDoge30pLCBjb25maWcpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChjb3B5ICE9PSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRhcmdldFttZXRob2RdID0gY29weTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB0YXJnZXRbbWV0aG9kXSA9IHBvaW50O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0YXJnZXQ7XHJcbiAgICB9XHJcbiAgICBnZXRSb3V0ZXIoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuJHJvdXRlcjtcclxuICAgIH1cclxuICAgIGNsaWNrSGFuZGxlcihlLCB0YXJnZXQpIHtcclxuICAgICAgICBpZiAoZSkge1xyXG4gICAgICAgICAgICB0YXJnZXQgPSB0YXJnZXQgfHwgKGUudGFyZ2V0IHx8IGUuc3JjRWxlbWVudCk7XHJcbiAgICAgICAgICAgIGlmICh0YXJnZXQgJiYgdGFyZ2V0LmdldEF0dHJpYnV0ZSkge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgdHJpZ2dlciA9IHRhcmdldC5nZXRBdHRyaWJ1dGUoXCJ0cmlnZ2VyXCIpO1xyXG4gICAgICAgICAgICAgICAgaWYgKHRyaWdnZXIpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9mb3JWaWV3KHRhcmdldCwgdmlldyA9PiB2aWV3LmFwcC50cmlnZ2VyKHRyaWdnZXIpKTtcclxuICAgICAgICAgICAgICAgICAgICBlLmNhbmNlbEJ1YmJsZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGNvbnN0IHJvdXRlID0gdGFyZ2V0LmdldEF0dHJpYnV0ZShcInJvdXRlXCIpO1xyXG4gICAgICAgICAgICAgICAgaWYgKHJvdXRlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fZm9yVmlldyh0YXJnZXQsIHZpZXcgPT4gdmlldy5zaG93KHJvdXRlKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgZS5jYW5jZWxCdWJibGUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgY29uc3QgcGFyZW50ID0gdGFyZ2V0LnBhcmVudE5vZGU7XHJcbiAgICAgICAgaWYgKHBhcmVudCkge1xyXG4gICAgICAgICAgICB0aGlzLmNsaWNrSGFuZGxlcihlLCBwYXJlbnQpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGdldFJvb3QoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0U3ViVmlldygpLmdldFJvb3QoKTtcclxuICAgIH1cclxuICAgIHJlZnJlc2goKSB7XHJcbiAgICAgICAgaWYgKCF0aGlzLl9zdWJTZWdtZW50KSB7XHJcbiAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUobnVsbCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0aGlzLmdldFN1YlZpZXcoKS5yZWZyZXNoKCkudGhlbih2aWV3ID0+IHtcclxuICAgICAgICAgICAgdGhpcy5jYWxsRXZlbnQoXCJhcHA6cm91dGVcIiwgW3RoaXMuZ2V0VXJsKCldKTtcclxuICAgICAgICAgICAgcmV0dXJuIHZpZXc7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICBsb2FkVmlldyh1cmwpIHtcclxuICAgICAgICBjb25zdCB2aWV3cyA9IHRoaXMuY29uZmlnLnZpZXdzO1xyXG4gICAgICAgIGxldCByZXN1bHQgPSBudWxsO1xyXG4gICAgICAgIGlmICh1cmwgPT09IFwiXCIpIHtcclxuICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSh0aGlzLl9sb2FkRXJyb3IoXCJcIiwgbmV3IEVycm9yKFwiV2ViaXggSmV0OiBFbXB0eSB1cmwgc2VnbWVudFwiKSkpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICBpZiAodmlld3MpIHtcclxuICAgICAgICAgICAgICAgIGlmICh0eXBlb2Ygdmlld3MgPT09IFwiZnVuY3Rpb25cIikge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIGN1c3RvbSBsb2FkaW5nIHN0cmF0ZWd5XHJcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0ID0gdmlld3ModXJsKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIHByZWRlZmluZWQgaGFzaFxyXG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdCA9IHZpZXdzW3VybF07XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mIHJlc3VsdCA9PT0gXCJzdHJpbmdcIikge1xyXG4gICAgICAgICAgICAgICAgICAgIHVybCA9IHJlc3VsdDtcclxuICAgICAgICAgICAgICAgICAgICByZXN1bHQgPSBudWxsO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmICghcmVzdWx0KSB7XHJcbiAgICAgICAgICAgICAgICBpZiAodXJsID09PSBcIl9ibGFua1wiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0ID0ge307XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICByZXN1bHQgPSB0aGlzLl9sb2FkVmlld0R5bmFtaWModXJsKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBjYXRjaCAoZSkge1xyXG4gICAgICAgICAgICByZXN1bHQgPSB0aGlzLl9sb2FkRXJyb3IodXJsLCBlKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gY3VzdG9tIGhhbmRsZXIgY2FuIHJldHVybiB2aWV3IG9yIGl0cyBwcm9taXNlXHJcbiAgICAgICAgaWYgKCFyZXN1bHQudGhlbikge1xyXG4gICAgICAgICAgICByZXN1bHQgPSBQcm9taXNlLnJlc29sdmUocmVzdWx0KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gc2V0IGVycm9yIGhhbmRsZXJcclxuICAgICAgICByZXN1bHQgPSByZXN1bHRcclxuICAgICAgICAgICAgLnRoZW4obW9kdWxlID0+IG1vZHVsZS5fX2VzTW9kdWxlID8gbW9kdWxlLmRlZmF1bHQgOiBtb2R1bGUpXHJcbiAgICAgICAgICAgIC5jYXRjaChlcnIgPT4gdGhpcy5fbG9hZEVycm9yKHVybCwgZXJyKSk7XHJcbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcclxuICAgIH1cclxuICAgIF9mb3JWaWV3KHRhcmdldCwgaGFuZGxlcikge1xyXG4gICAgICAgIGNvbnN0IHZpZXcgPSB0aGlzLndlYml4LiQkKHRhcmdldCk7XHJcbiAgICAgICAgaWYgKHZpZXcpIHtcclxuICAgICAgICAgICAgaGFuZGxlcih2aWV3LiRzY29wZSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgX2xvYWRWaWV3RHluYW1pYyh1cmwpIHtcclxuICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgIH1cclxuICAgIGNyZWF0ZUZyb21VUkwoY2h1bmspIHtcclxuICAgICAgICBsZXQgdmlldztcclxuICAgICAgICBpZiAoY2h1bmsuaXNOZXcgfHwgIWNodW5rLnZpZXcpIHtcclxuICAgICAgICAgICAgdmlldyA9IHRoaXMubG9hZFZpZXcoY2h1bmsucGFnZSlcclxuICAgICAgICAgICAgICAgIC50aGVuKHVpID0+IHRoaXMuY3JlYXRlVmlldyh1aSwgbmFtZSkpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgdmlldyA9IFByb21pc2UucmVzb2x2ZShjaHVuay52aWV3KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHZpZXc7XHJcbiAgICB9XHJcbiAgICBjcmVhdGVWaWV3KHVpLCBuYW1lKSB7XHJcbiAgICAgICAgbGV0IG9iajtcclxuICAgICAgICBpZiAodHlwZW9mIHVpID09PSBcImZ1bmN0aW9uXCIpIHtcclxuICAgICAgICAgICAgaWYgKHVpLnByb3RvdHlwZSBpbnN0YW5jZW9mIEpldEFwcEJhc2UpIHtcclxuICAgICAgICAgICAgICAgIC8vIFVJIGNsYXNzXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gbmV3IHVpKHsgYXBwOiB0aGlzLCBuYW1lLCByb3V0ZXI6IFN1YlJvdXRlciB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIGlmICh1aS5wcm90b3R5cGUgaW5zdGFuY2VvZiBKZXRCYXNlKSB7XHJcbiAgICAgICAgICAgICAgICAvLyBVSSBjbGFzc1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIG5ldyB1aSh0aGlzLCB7IG5hbWUgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAvLyBVSSBmYWN0b3J5IGZ1bmN0aW9uc1xyXG4gICAgICAgICAgICAgICAgdWkgPSB1aSh0aGlzKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodWkgaW5zdGFuY2VvZiBKZXRCYXNlKSB7XHJcbiAgICAgICAgICAgIG9iaiA9IHVpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgLy8gVUkgb2JqZWN0XHJcbiAgICAgICAgICAgIG9iaiA9IG5ldyBKZXRWaWV3UmF3KHRoaXMsIHsgbmFtZSwgdWkgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBvYmo7XHJcbiAgICB9XHJcbiAgICAvLyBzaG93IHZpZXcgcGF0aFxyXG4gICAgc2hvdyh1cmwpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5yZW5kZXIodGhpcy5fY29udGFpbmVyLCAodXJsIHx8IHRoaXMuY29uZmlnLnN0YXJ0KSk7XHJcbiAgICB9XHJcbiAgICAvLyBldmVudCBoZWxwZXJzXHJcbiAgICB0cmlnZ2VyKG5hbWUsIC4uLnJlc3QpIHtcclxuICAgICAgICB0aGlzLmFwcGx5KG5hbWUsIHJlc3QpO1xyXG4gICAgfVxyXG4gICAgYXBwbHkobmFtZSwgZGF0YSkge1xyXG4gICAgICAgIHRoaXMuY2FsbEV2ZW50KG5hbWUsIGRhdGEpO1xyXG4gICAgfVxyXG4gICAgYWN0aW9uKG5hbWUpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy53ZWJpeC5iaW5kKGZ1bmN0aW9uICguLi5yZXN0KSB7XHJcbiAgICAgICAgICAgIHRoaXMuYXBwbHkobmFtZSwgcmVzdCk7XHJcbiAgICAgICAgfSwgdGhpcyk7XHJcbiAgICB9XHJcbiAgICBvbihuYW1lLCBoYW5kbGVyKSB7XHJcbiAgICAgICAgdGhpcy5hdHRhY2hFdmVudChuYW1lLCBoYW5kbGVyKTtcclxuICAgIH1cclxuICAgIHVzZShwbHVnaW4sIGNvbmZpZykge1xyXG4gICAgICAgIHBsdWdpbih0aGlzLCBudWxsLCBjb25maWcpO1xyXG4gICAgfVxyXG4gICAgZXJyb3IobmFtZSwgZXIpIHtcclxuICAgICAgICB0aGlzLmNhbGxFdmVudChuYW1lLCBlcik7XHJcbiAgICAgICAgdGhpcy5jYWxsRXZlbnQoXCJhcHA6ZXJyb3JcIiwgZXIpO1xyXG4gICAgICAgIC8qIHRzbGludDpkaXNhYmxlICovXHJcbiAgICAgICAgaWYgKHRoaXMuY29uZmlnLmRlYnVnKSB7XHJcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgZXIubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoZXJbaV0pO1xyXG4gICAgICAgICAgICAgICAgaWYgKGVyW2ldIGluc3RhbmNlb2YgRXJyb3IpIHtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgdGV4dCA9IGVyW2ldLm1lc3NhZ2U7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRleHQuaW5kZXhPZihcIk1vZHVsZSBidWlsZCBmYWlsZWRcIikgPT09IDApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGV4dCA9IHRleHQucmVwbGFjZSgvXFx4MWJcXFtbMC05O10qbS9nLCBcIlwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZG9jdW1lbnQuYm9keS5pbm5lckhUTUwgPSBgPHByZSBzdHlsZT0nZm9udC1zaXplOjE2cHg7IGJhY2tncm91bmQtY29sb3I6ICNlYzY4NzM7IGNvbG9yOiAjMDAwOyBwYWRkaW5nOjEwcHg7Jz4ke3RleHR9PC9wcmU+YDtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRleHQgKz0gXCI8YnI+PGJyPkNoZWNrIGNvbnNvbGUgZm9yIG1vcmUgZGV0YWlsc1wiO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLndlYml4Lm1lc3NhZ2UoeyB0eXBlOiBcImVycm9yXCIsIHRleHQ6IHRleHQsIGV4cGlyZTogLTEgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGRlYnVnZ2VyO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvKiB0c2xpbnQ6ZW5hYmxlICovXHJcbiAgICB9XHJcbiAgICAvLyByZW5kZXJzIHRvcCB2aWV3XHJcbiAgICByZW5kZXIocm9vdCwgdXJsLCBwYXJlbnQpIHtcclxuICAgICAgICB0aGlzLl9jb250YWluZXIgPSAodHlwZW9mIHJvb3QgPT09IFwic3RyaW5nXCIpID9cclxuICAgICAgICAgICAgdGhpcy53ZWJpeC50b05vZGUocm9vdCkgOlxyXG4gICAgICAgICAgICAocm9vdCB8fCBkb2N1bWVudC5ib2R5KTtcclxuICAgICAgICBjb25zdCBmaXJzdEluaXQgPSAhdGhpcy4kcm91dGVyO1xyXG4gICAgICAgIGxldCBwYXRoID0gbnVsbDtcclxuICAgICAgICBpZiAoZmlyc3RJbml0KSB7XHJcbiAgICAgICAgICAgIGlmIChfb25jZSAmJiBcInRhZ05hbWVcIiBpbiB0aGlzLl9jb250YWluZXIpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMud2ViaXguZXZlbnQoZG9jdW1lbnQuYm9keSwgXCJjbGlja1wiLCBlID0+IHRoaXMuY2xpY2tIYW5kbGVyKGUpKTtcclxuICAgICAgICAgICAgICAgIF9vbmNlID0gZmFsc2U7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKHR5cGVvZiB1cmwgPT09IFwic3RyaW5nXCIpIHtcclxuICAgICAgICAgICAgICAgIHVybCA9IG5ldyBSb3V0ZSh1cmwsIDApO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMuX3N1YlNlZ21lbnQgPSB0aGlzLl9maXJzdF9zdGFydCh1cmwpO1xyXG4gICAgICAgICAgICB0aGlzLl9zdWJTZWdtZW50LnJvdXRlLmxpbmtSb3V0ZXIgPSB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgaWYgKHR5cGVvZiB1cmwgPT09IFwic3RyaW5nXCIpIHtcclxuICAgICAgICAgICAgICAgIHBhdGggPSB1cmw7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5hcHApIHtcclxuICAgICAgICAgICAgICAgICAgICBwYXRoID0gdXJsLnNwbGl0KCkucm91dGUucGF0aCB8fCB0aGlzLmNvbmZpZy5zdGFydDtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHBhdGggPSB1cmwudG9TdHJpbmcoKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBjb25zdCB0b3AgPSB0aGlzLmdldFN1YlZpZXcoKTtcclxuICAgICAgICBjb25zdCBzZWdtZW50ID0gdGhpcy5fc3ViU2VnbWVudDtcclxuICAgICAgICBjb25zdCByZWFkeSA9IHNlZ21lbnQuc2hvdyhwYXRoLCB0b3ApXHJcbiAgICAgICAgICAgIC50aGVuKCgpID0+IHRoaXMuY3JlYXRlRnJvbVVSTChzZWdtZW50LmN1cnJlbnQoKSkpXHJcbiAgICAgICAgICAgIC50aGVuKHZpZXcgPT4gdmlldy5yZW5kZXIocm9vdCwgc2VnbWVudCkpXHJcbiAgICAgICAgICAgIC50aGVuKGJhc2UgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLiRyb3V0ZXIuc2V0KHNlZ21lbnQucm91dGUucGF0aCwgeyBzaWxlbnQ6IHRydWUgfSk7XHJcbiAgICAgICAgICAgIHRoaXMuY2FsbEV2ZW50KFwiYXBwOnJvdXRlXCIsIFt0aGlzLmdldFVybCgpXSk7XHJcbiAgICAgICAgICAgIHJldHVybiBiYXNlO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHRoaXMucmVhZHkgPSB0aGlzLnJlYWR5LnRoZW4oKCkgPT4gcmVhZHkpO1xyXG4gICAgICAgIHJldHVybiByZWFkeTtcclxuICAgIH1cclxuICAgIGdldFN1YlZpZXcoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuX3N1YlNlZ21lbnQpIHtcclxuICAgICAgICAgICAgY29uc3QgdmlldyA9IHRoaXMuX3N1YlNlZ21lbnQuY3VycmVudCgpLnZpZXc7XHJcbiAgICAgICAgICAgIGlmICh2aWV3KVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHZpZXc7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBuZXcgSmV0Vmlldyh0aGlzLCB7fSk7XHJcbiAgICB9XHJcbiAgICBfZmlyc3Rfc3RhcnQocm91dGUpIHtcclxuICAgICAgICB0aGlzLl9zZWdtZW50ID0gcm91dGU7XHJcbiAgICAgICAgY29uc3QgY2IgPSAoYSkgPT4gc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuc2hvdyhhKS5jYXRjaChlID0+IHtcclxuICAgICAgICAgICAgICAgIGlmICghKGUgaW5zdGFuY2VvZiBOYXZpZ2F0aW9uQmxvY2tlZCkpXHJcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgZTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSwgMSk7XHJcbiAgICAgICAgdGhpcy4kcm91dGVyID0gbmV3ICh0aGlzLmNvbmZpZy5yb3V0ZXIpKGNiLCB0aGlzLmNvbmZpZywgdGhpcyk7XHJcbiAgICAgICAgLy8gc3RhcnQgYW5pbWF0aW9uIGZvciB0b3AtbGV2ZWwgYXBwXHJcbiAgICAgICAgaWYgKHRoaXMuX2NvbnRhaW5lciA9PT0gZG9jdW1lbnQuYm9keSAmJiB0aGlzLmNvbmZpZy5hbmltYXRpb24gIT09IGZhbHNlKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IG5vZGUgPSB0aGlzLl9jb250YWluZXI7XHJcbiAgICAgICAgICAgIHRoaXMud2ViaXguaHRtbC5hZGRDc3Mobm9kZSwgXCJ3ZWJpeGFwcHN0YXJ0XCIpO1xyXG4gICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMud2ViaXguaHRtbC5yZW1vdmVDc3Mobm9kZSwgXCJ3ZWJpeGFwcHN0YXJ0XCIpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy53ZWJpeC5odG1sLmFkZENzcyhub2RlLCBcIndlYml4YXBwXCIpO1xyXG4gICAgICAgICAgICB9LCAxMCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICghcm91dGUpIHtcclxuICAgICAgICAgICAgLy8gaWYgbm8gdXJsIGRlZmluZWQsIGNoZWNrIHJvdXRlciBmaXJzdFxyXG4gICAgICAgICAgICBsZXQgdXJsU3RyaW5nID0gdGhpcy4kcm91dGVyLmdldCgpO1xyXG4gICAgICAgICAgICBpZiAoIXVybFN0cmluZykge1xyXG4gICAgICAgICAgICAgICAgdXJsU3RyaW5nID0gdGhpcy5jb25maWcuc3RhcnQ7XHJcbiAgICAgICAgICAgICAgICB0aGlzLiRyb3V0ZXIuc2V0KHVybFN0cmluZywgeyBzaWxlbnQ6IHRydWUgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcm91dGUgPSBuZXcgUm91dGUodXJsU3RyaW5nLCAwKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZiAodGhpcy5hcHApIHtcclxuICAgICAgICAgICAgcm91dGUuY3VycmVudCgpLnZpZXcgPSB0aGlzO1xyXG4gICAgICAgICAgICBpZiAocm91dGUubmV4dCgpKSB7XHJcbiAgICAgICAgICAgICAgICByb3V0ZS5yZWZyZXNoKCk7XHJcbiAgICAgICAgICAgICAgICByb3V0ZSA9IHJvdXRlLnNwbGl0KCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICByb3V0ZSA9IG5ldyBSb3V0ZSh0aGlzLmNvbmZpZy5zdGFydCwgMCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHJvdXRlO1xyXG4gICAgfVxyXG4gICAgLy8gZXJyb3IgZHVyaW5nIHZpZXcgcmVzb2x2aW5nXHJcbiAgICBfbG9hZEVycm9yKHVybCwgZXJyKSB7XHJcbiAgICAgICAgdGhpcy5lcnJvcihcImFwcDplcnJvcjpyZXNvbHZlXCIsIFtlcnIsIHVybF0pO1xyXG4gICAgICAgIHJldHVybiB7IHRlbXBsYXRlOiBcIiBcIiB9O1xyXG4gICAgfVxyXG4gICAgYWRkU3ViVmlldyhvYmosIHRhcmdldCwgY29uZmlnKSB7XHJcbiAgICAgICAgY29uc3QgdXJsID0gb2JqLiRzdWJ2aWV3ICE9PSB0cnVlID8gb2JqLiRzdWJ2aWV3IDogbnVsbDtcclxuICAgICAgICBjb25zdCBuYW1lID0gb2JqLm5hbWUgfHwgKHVybCA/IHRoaXMud2ViaXgudWlkKCkgOiBcImRlZmF1bHRcIik7XHJcbiAgICAgICAgdGFyZ2V0LmlkID0gb2JqLmlkIHx8IFwic1wiICsgdGhpcy53ZWJpeC51aWQoKTtcclxuICAgICAgICBjb25zdCB2aWV3ID0gY29uZmlnW25hbWVdID0ge1xyXG4gICAgICAgICAgICBpZDogdGFyZ2V0LmlkLFxyXG4gICAgICAgICAgICB1cmwsXHJcbiAgICAgICAgICAgIGJyYW5jaDogb2JqLmJyYW5jaCxcclxuICAgICAgICAgICAgcG9wdXA6IG9iai5wb3B1cFxyXG4gICAgICAgIH07XHJcbiAgICAgICAgcmV0dXJuIHZpZXcucG9wdXAgPyBudWxsIDogdGFyZ2V0O1xyXG4gICAgfVxyXG59XG5cbmNsYXNzIEhhc2hSb3V0ZXIge1xyXG4gICAgY29uc3RydWN0b3IoY2IsIGNvbmZpZykge1xyXG4gICAgICAgIHRoaXMuY29uZmlnID0gY29uZmlnIHx8IHt9O1xyXG4gICAgICAgIHRoaXMuX2RldGVjdFByZWZpeCgpO1xyXG4gICAgICAgIHRoaXMuY2IgPSBjYjtcclxuICAgICAgICB3aW5kb3cub25wb3BzdGF0ZSA9ICgpID0+IHRoaXMuY2IodGhpcy5nZXQoKSk7XHJcbiAgICB9XHJcbiAgICBzZXQocGF0aCwgY29uZmlnKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuY29uZmlnLnJvdXRlcykge1xyXG4gICAgICAgICAgICBjb25zdCBjb21wYXJlID0gcGF0aC5zcGxpdChcIj9cIiwgMik7XHJcbiAgICAgICAgICAgIGZvciAoY29uc3Qga2V5IGluIHRoaXMuY29uZmlnLnJvdXRlcykge1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuY29uZmlnLnJvdXRlc1trZXldID09PSBjb21wYXJlWzBdKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcGF0aCA9IGtleSArIChjb21wYXJlLmxlbmd0aCA+IDEgPyBcIj9cIiArIGNvbXBhcmVbMV0gOiBcIlwiKTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodGhpcy5nZXQoKSAhPT0gcGF0aCkge1xyXG4gICAgICAgICAgICB3aW5kb3cuaGlzdG9yeS5wdXNoU3RhdGUobnVsbCwgbnVsbCwgdGhpcy5wcmVmaXggKyB0aGlzLnN1Zml4ICsgcGF0aCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICghY29uZmlnIHx8ICFjb25maWcuc2lsZW50KSB7XHJcbiAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4gdGhpcy5jYihwYXRoKSwgMSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgZ2V0KCkge1xyXG4gICAgICAgIGxldCBwYXRoID0gdGhpcy5fZ2V0UmF3KCkucmVwbGFjZSh0aGlzLnByZWZpeCwgXCJcIikucmVwbGFjZSh0aGlzLnN1Zml4LCBcIlwiKTtcclxuICAgICAgICBwYXRoID0gKHBhdGggIT09IFwiL1wiICYmIHBhdGggIT09IFwiI1wiKSA/IHBhdGggOiBcIlwiO1xyXG4gICAgICAgIGlmICh0aGlzLmNvbmZpZy5yb3V0ZXMpIHtcclxuICAgICAgICAgICAgY29uc3QgY29tcGFyZSA9IHBhdGguc3BsaXQoXCI/XCIsIDIpO1xyXG4gICAgICAgICAgICBjb25zdCBrZXkgPSB0aGlzLmNvbmZpZy5yb3V0ZXNbY29tcGFyZVswXV07XHJcbiAgICAgICAgICAgIGlmIChrZXkpIHtcclxuICAgICAgICAgICAgICAgIHBhdGggPSBrZXkgKyAoY29tcGFyZS5sZW5ndGggPiAxID8gXCI/XCIgKyBjb21wYXJlWzFdIDogXCJcIik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHBhdGg7XHJcbiAgICB9XHJcbiAgICBfZGV0ZWN0UHJlZml4KCkge1xyXG4gICAgICAgIC8vIHVzZSBcIiMhXCIgZm9yIGJhY2t3YXJkIGNvbXBhdGliaWxpdHlcclxuICAgICAgICBjb25zdCBzdWZpeCA9IHRoaXMuY29uZmlnLnJvdXRlclByZWZpeDtcclxuICAgICAgICB0aGlzLnN1Zml4ID0gXCIjXCIgKyAoKHR5cGVvZiBzdWZpeCA9PT0gXCJ1bmRlZmluZWRcIikgPyBcIiFcIiA6IHN1Zml4KTtcclxuICAgICAgICB0aGlzLnByZWZpeCA9IGRvY3VtZW50LmxvY2F0aW9uLmhyZWYuc3BsaXQoXCIjXCIsIDIpWzBdO1xyXG4gICAgfVxyXG4gICAgX2dldFJhdygpIHtcclxuICAgICAgICByZXR1cm4gZG9jdW1lbnQubG9jYXRpb24uaHJlZjtcclxuICAgIH1cclxufVxuXG5sZXQgaXNQYXRjaGVkID0gZmFsc2U7XHJcbmZ1bmN0aW9uIHBhdGNoKHcpIHtcclxuICAgIGlmIChpc1BhdGNoZWQgfHwgIXcpIHtcclxuICAgICAgICByZXR1cm47XHJcbiAgICB9XHJcbiAgICBpc1BhdGNoZWQgPSB0cnVlO1xyXG4gICAgLy8gY3VzdG9tIHByb21pc2UgZm9yIElFOFxyXG4gICAgY29uc3Qgd2luID0gd2luZG93O1xyXG4gICAgaWYgKCF3aW4uUHJvbWlzZSkge1xyXG4gICAgICAgIHdpbi5Qcm9taXNlID0gdy5wcm9taXNlO1xyXG4gICAgfVxyXG4gICAgY29uc3QgdmVyc2lvbiA9IHcudmVyc2lvbi5zcGxpdChcIi5cIik7XHJcbiAgICAvLyB3aWxsIGJlIGZpeGVkIGluIHdlYml4IDUuM1xyXG4gICAgaWYgKHZlcnNpb25bMF0gKiAxMCArIHZlcnNpb25bMV0gKiAxIDwgNTMpIHtcclxuICAgICAgICB3LnVpLmZyZWV6ZSA9IGZ1bmN0aW9uIChoYW5kbGVyKSB7XHJcbiAgICAgICAgICAgIC8vIGRpc2FibGVkIGJlY2F1c2Ugd2ViaXggamV0IDUuMCBjYW4ndCBoYW5kbGUgcmVzaXplIG9mIHNjcm9sbHZpZXcgY29ycmVjdGx5XHJcbiAgICAgICAgICAgIC8vIHcudWkuJGZyZWV6ZSA9IHRydWU7XHJcbiAgICAgICAgICAgIGNvbnN0IHJlcyA9IGhhbmRsZXIoKTtcclxuICAgICAgICAgICAgaWYgKHJlcyAmJiByZXMudGhlbikge1xyXG4gICAgICAgICAgICAgICAgcmVzLnRoZW4oZnVuY3Rpb24gKHNvbWUpIHtcclxuICAgICAgICAgICAgICAgICAgICB3LnVpLiRmcmVlemUgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICB3LnVpLnJlc2l6ZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBzb21lO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB3LnVpLiRmcmVlemUgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIHcudWkucmVzaXplKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIHJlcztcclxuICAgICAgICB9O1xyXG4gICAgfVxyXG4gICAgLy8gYWRkaW5nIHZpZXdzIGFzIGNsYXNzZXNcclxuICAgIGNvbnN0IGJhc2VBZGQgPSB3LnVpLmJhc2VsYXlvdXQucHJvdG90eXBlLmFkZFZpZXc7XHJcbiAgICBjb25zdCBiYXNlUmVtb3ZlID0gdy51aS5iYXNlbGF5b3V0LnByb3RvdHlwZS5yZW1vdmVWaWV3O1xyXG4gICAgY29uc3QgY29uZmlnID0ge1xyXG4gICAgICAgIGFkZFZpZXcodmlldywgaW5kZXgpIHtcclxuICAgICAgICAgICAgLy8gdHJpZ2dlciBsb2dpYyBvbmx5IGZvciB3aWRnZXRzIGluc2lkZSBvZiBqZXQtdmlld1xyXG4gICAgICAgICAgICAvLyBpZ25vcmUgY2FzZSB3aGVuIGFkZFZpZXcgdXNlZCB3aXRoIGFscmVhZHkgaW5pdGlhbGl6ZWQgd2lkZ2V0XHJcbiAgICAgICAgICAgIGlmICh0aGlzLiRzY29wZSAmJiB0aGlzLiRzY29wZS53ZWJpeEpldCAmJiAhdmlldy5xdWVyeVZpZXcpIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGp2aWV3ID0gdGhpcy4kc2NvcGU7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBzdWJzID0ge307XHJcbiAgICAgICAgICAgICAgICB2aWV3ID0ganZpZXcuYXBwLmNvcHlDb25maWcodmlldywge30sIHN1YnMpO1xyXG4gICAgICAgICAgICAgICAgYmFzZUFkZC5hcHBseSh0aGlzLCBbdmlldywgaW5kZXhdKTtcclxuICAgICAgICAgICAgICAgIGZvciAoY29uc3Qga2V5IGluIHN1YnMpIHtcclxuICAgICAgICAgICAgICAgICAgICBqdmlldy5fcmVuZGVyRnJhbWUoa2V5LCBzdWJzW2tleV0sIG51bGwpLnRoZW4oKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBqdmlldy5fc3Vic1trZXldID0gc3Vic1trZXldO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHZpZXcuaWQ7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gYmFzZUFkZC5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuICAgICAgICByZW1vdmVWaWV3KCkge1xyXG4gICAgICAgICAgICBiYXNlUmVtb3ZlLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLiRzY29wZSAmJiB0aGlzLiRzY29wZS53ZWJpeEpldCkge1xyXG4gICAgICAgICAgICAgICAgY29uc3Qgc3VicyA9IHRoaXMuJHNjb3BlLl9zdWJzO1xyXG4gICAgICAgICAgICAgICAgLy8gY2hlY2sgYWxsIHN1Yi12aWV3cywgZGVzdHJveSBhbmQgY2xlYW4gdGhlIHJlbW92ZWQgb25lXHJcbiAgICAgICAgICAgICAgICBmb3IgKGNvbnN0IGtleSBpbiBzdWJzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgdGVzdCA9IHN1YnNba2V5XTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoIXcuJCQodGVzdC5pZCkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGVzdC52aWV3LmRlc3RydWN0b3IoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZGVsZXRlIHN1YnNba2V5XTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9O1xyXG4gICAgdy5leHRlbmQody51aS5sYXlvdXQucHJvdG90eXBlLCBjb25maWcsIHRydWUpO1xyXG4gICAgdy5leHRlbmQody51aS5iYXNlbGF5b3V0LnByb3RvdHlwZSwgY29uZmlnLCB0cnVlKTtcclxuICAgIC8vIHdyYXBwZXIgZm9yIHVzaW5nIEpldCBBcHBzIGFzIHZpZXdzXHJcbiAgICB3LnByb3RvVUkoe1xyXG4gICAgICAgIG5hbWU6IFwiamV0YXBwXCIsXHJcbiAgICAgICAgJGluaXQoY2ZnKSB7XHJcbiAgICAgICAgICAgIHRoaXMuJGFwcCA9IG5ldyB0aGlzLmFwcChjZmcpO1xyXG4gICAgICAgICAgICBjb25zdCBpZCA9IHcudWlkKCkudG9TdHJpbmcoKTtcclxuICAgICAgICAgICAgY2ZnLmJvZHkgPSB7IGlkIH07XHJcbiAgICAgICAgICAgIHRoaXMuJHJlYWR5LnB1c2goZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy4kYXBwLnJlbmRlcih7IGlkIH0pO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgZm9yICh2YXIga2V5IGluIHRoaXMuJGFwcCkge1xyXG4gICAgICAgICAgICAgICAgdmFyIG9yaWdpbiA9IHRoaXMuJGFwcFtrZXldO1xyXG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBvcmlnaW4gPT09IFwiZnVuY3Rpb25cIiAmJiAhdGhpc1trZXldKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpc1trZXldID0gb3JpZ2luLmJpbmQodGhpcy4kYXBwKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH0sIHcudWkucHJveHkpO1xyXG59XG5cbmNsYXNzIEpldEFwcCBleHRlbmRzIEpldEFwcEJhc2Uge1xyXG4gICAgY29uc3RydWN0b3IoY29uZmlnKSB7XHJcbiAgICAgICAgY29uZmlnLnJvdXRlciA9IGNvbmZpZy5yb3V0ZXIgfHwgSGFzaFJvdXRlcjtcclxuICAgICAgICBzdXBlcihjb25maWcpO1xyXG4gICAgICAgIHBhdGNoKHRoaXMud2ViaXgpO1xyXG4gICAgfVxyXG4gICAgX2xvYWRWaWV3RHluYW1pYyh1cmwpIHtcclxuICAgICAgICB1cmwgPSB1cmwucmVwbGFjZSgvXFwuL2csIFwiL1wiKTtcclxuICAgICAgICByZXR1cm4gcmVxdWlyZShcImpldC12aWV3cy9cIiArIHVybCk7XHJcbiAgICB9XHJcbn1cblxuY2xhc3MgU3RvcmVSb3V0ZXIge1xyXG4gICAgY29uc3RydWN0b3IoY2IsIGNvbmZpZywgYXBwKSB7XHJcbiAgICAgICAgdGhpcy5zdG9yYWdlID0gY29uZmlnLnN0b3JhZ2UgfHwgYXBwLndlYml4LnN0b3JhZ2Uuc2Vzc2lvbjtcclxuICAgICAgICB0aGlzLm5hbWUgPSAoY29uZmlnLnN0b3JlTmFtZSB8fCBjb25maWcuaWQgKyBcIjpyb3V0ZVwiKTtcclxuICAgICAgICB0aGlzLmNiID0gY2I7XHJcbiAgICB9XHJcbiAgICBzZXQocGF0aCwgY29uZmlnKSB7XHJcbiAgICAgICAgdGhpcy5zdG9yYWdlLnB1dCh0aGlzLm5hbWUsIHBhdGgpO1xyXG4gICAgICAgIGlmICghY29uZmlnIHx8ICFjb25maWcuc2lsZW50KSB7XHJcbiAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4gdGhpcy5jYihwYXRoKSwgMSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgZ2V0KCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnN0b3JhZ2UuZ2V0KHRoaXMubmFtZSk7XHJcbiAgICB9XHJcbn1cblxuY2xhc3MgVXJsUm91dGVyIGV4dGVuZHMgSGFzaFJvdXRlciB7XHJcbiAgICBfZGV0ZWN0UHJlZml4KCkge1xyXG4gICAgICAgIHRoaXMucHJlZml4ID0gXCJcIjtcclxuICAgICAgICB0aGlzLnN1Zml4ID0gdGhpcy5jb25maWcucm91dGVyUHJlZml4IHx8IFwiXCI7XHJcbiAgICB9XHJcbiAgICBfZ2V0UmF3KCkge1xyXG4gICAgICAgIHJldHVybiBkb2N1bWVudC5sb2NhdGlvbi5wYXRobmFtZSArIChkb2N1bWVudC5sb2NhdGlvbi5zZWFyY2ggfHwgXCJcIik7XHJcbiAgICB9XHJcbn1cblxuY2xhc3MgRW1wdHlSb3V0ZXIge1xyXG4gICAgY29uc3RydWN0b3IoY2IsIF8kY29uZmlnKSB7XHJcbiAgICAgICAgdGhpcy5wYXRoID0gXCJcIjtcclxuICAgICAgICB0aGlzLmNiID0gY2I7XHJcbiAgICB9XHJcbiAgICBzZXQocGF0aCwgY29uZmlnKSB7XHJcbiAgICAgICAgdGhpcy5wYXRoID0gcGF0aDtcclxuICAgICAgICBpZiAoIWNvbmZpZyB8fCAhY29uZmlnLnNpbGVudCkge1xyXG4gICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHRoaXMuY2IocGF0aCksIDEpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGdldCgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5wYXRoO1xyXG4gICAgfVxyXG59XG5cbmZ1bmN0aW9uIFVubG9hZEd1YXJkKGFwcCwgdmlldywgY29uZmlnKSB7XHJcbiAgICB2aWV3Lm9uKGFwcCwgYGFwcDpndWFyZGAsIGZ1bmN0aW9uIChfJHVybCwgcG9pbnQsIHByb21pc2UpIHtcclxuICAgICAgICBpZiAocG9pbnQgPT09IHZpZXcgfHwgcG9pbnQuY29udGFpbnModmlldykpIHtcclxuICAgICAgICAgICAgY29uc3QgcmVzID0gY29uZmlnKCk7XHJcbiAgICAgICAgICAgIGlmIChyZXMgPT09IGZhbHNlKSB7XHJcbiAgICAgICAgICAgICAgICBwcm9taXNlLmNvbmZpcm0gPSBQcm9taXNlLnJlamVjdChuZXcgTmF2aWdhdGlvbkJsb2NrZWQoKSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBwcm9taXNlLmNvbmZpcm0gPSBwcm9taXNlLmNvbmZpcm0udGhlbigoKSA9PiByZXMpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcbn1cblxuLy8gICAgIChjKSAyMDEyLTIwMTggQWlyYm5iLCBJbmMuXG5cbi8vIHZhciBoYXMgPSByZXF1aXJlKCdoYXMnKTtcbmZ1bmN0aW9uIGhhcyhzdG9yZSwga2V5KSB7XG4gIHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoc3RvcmUsIGtleSk7XG59XG4vLyB2YXIgZm9yRWFjaCA9IHJlcXVpcmUoJ2Zvci1lYWNoJyk7XG5mdW5jdGlvbiBmb3JFYWNoKG9iaiwgaGFuZGxlciwgY29udGV4dCkge1xuICBmb3IgKHZhciBrZXkgaW4gb2JqKSB7XG4gICAgaWYgKGhhcyhvYmosIGtleSkpIHtcbiAgICAgIGhhbmRsZXIuY2FsbCgoY29udGV4dCB8fCBvYmopLCBvYmpba2V5XSwga2V5LCBvYmopO1xuICAgIH1cbiAgfVxufVxuLy8gdmFyIHRyaW0gPSByZXF1aXJlKCdzdHJpbmcucHJvdG90eXBlLnRyaW0nKTtcbmZ1bmN0aW9uIHRyaW0oc3RyKSB7XG4gIHJldHVybiBzdHIucmVwbGFjZSgvXltcXHNcXHVGRUZGXFx4QTBdK3xbXFxzXFx1RkVGRlxceEEwXSskL2csICcnKTtcbn1cbi8vIHZhciB3YXJuaW5nID0gcmVxdWlyZSgnd2FybmluZycpO1xuZnVuY3Rpb24gd2FybihtZXNzYWdlKSB7XG4gIG1lc3NhZ2UgPSAnV2FybmluZzogJyArIG1lc3NhZ2U7XG4gIGlmICh0eXBlb2YgY29uc29sZSAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICBjb25zb2xlLmVycm9yKG1lc3NhZ2UpO1xuICB9XG5cbiAgdHJ5IHsgdGhyb3cgbmV3IEVycm9yKG1lc3NhZ2UpOyB9IGNhdGNoICh4KSB7fVxufVxuXG52YXIgcmVwbGFjZSA9IFN0cmluZy5wcm90b3R5cGUucmVwbGFjZTtcbnZhciBzcGxpdCA9IFN0cmluZy5wcm90b3R5cGUuc3BsaXQ7XG5cbi8vICMjIyMgUGx1cmFsaXphdGlvbiBtZXRob2RzXG4vLyBUaGUgc3RyaW5nIHRoYXQgc2VwYXJhdGVzIHRoZSBkaWZmZXJlbnQgcGhyYXNlIHBvc3NpYmlsaXRpZXMuXG52YXIgZGVsaW1pdGVyID0gJ3x8fHwnO1xuXG52YXIgcnVzc2lhblBsdXJhbEdyb3VwcyA9IGZ1bmN0aW9uIChuKSB7XG4gIHZhciBlbmQgPSBuICUgMTA7XG4gIGlmIChuICE9PSAxMSAmJiBlbmQgPT09IDEpIHtcbiAgICByZXR1cm4gMDtcbiAgfVxuICBpZiAoMiA8PSBlbmQgJiYgZW5kIDw9IDQgJiYgIShuID49IDEyICYmIG4gPD0gMTQpKSB7XG4gICAgcmV0dXJuIDE7XG4gIH1cbiAgcmV0dXJuIDI7XG59O1xuXG4vLyBNYXBwaW5nIGZyb20gcGx1cmFsaXphdGlvbiBncm91cCBwbHVyYWwgbG9naWMuXG52YXIgcGx1cmFsVHlwZXMgPSB7XG4gIGFyYWJpYzogZnVuY3Rpb24gKG4pIHtcbiAgICAvLyBodHRwOi8vd3d3LmFyYWJleWVzLm9yZy9QbHVyYWxfRm9ybXNcbiAgICBpZiAobiA8IDMpIHsgcmV0dXJuIG47IH1cbiAgICB2YXIgbGFzdFR3byA9IG4gJSAxMDA7XG4gICAgaWYgKGxhc3RUd28gPj0gMyAmJiBsYXN0VHdvIDw9IDEwKSByZXR1cm4gMztcbiAgICByZXR1cm4gbGFzdFR3byA+PSAxMSA/IDQgOiA1O1xuICB9LFxuICBib3NuaWFuX3NlcmJpYW46IHJ1c3NpYW5QbHVyYWxHcm91cHMsXG4gIGNoaW5lc2U6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIDA7IH0sXG4gIGNyb2F0aWFuOiBydXNzaWFuUGx1cmFsR3JvdXBzLFxuICBmcmVuY2g6IGZ1bmN0aW9uIChuKSB7IHJldHVybiBuID4gMSA/IDEgOiAwOyB9LFxuICBnZXJtYW46IGZ1bmN0aW9uIChuKSB7IHJldHVybiBuICE9PSAxID8gMSA6IDA7IH0sXG4gIHJ1c3NpYW46IHJ1c3NpYW5QbHVyYWxHcm91cHMsXG4gIGxpdGh1YW5pYW46IGZ1bmN0aW9uIChuKSB7XG4gICAgaWYgKG4gJSAxMCA9PT0gMSAmJiBuICUgMTAwICE9PSAxMSkgeyByZXR1cm4gMDsgfVxuICAgIHJldHVybiBuICUgMTAgPj0gMiAmJiBuICUgMTAgPD0gOSAmJiAobiAlIDEwMCA8IDExIHx8IG4gJSAxMDAgPiAxOSkgPyAxIDogMjtcbiAgfSxcbiAgY3plY2g6IGZ1bmN0aW9uIChuKSB7XG4gICAgaWYgKG4gPT09IDEpIHsgcmV0dXJuIDA7IH1cbiAgICByZXR1cm4gKG4gPj0gMiAmJiBuIDw9IDQpID8gMSA6IDI7XG4gIH0sXG4gIHBvbGlzaDogZnVuY3Rpb24gKG4pIHtcbiAgICBpZiAobiA9PT0gMSkgeyByZXR1cm4gMDsgfVxuICAgIHZhciBlbmQgPSBuICUgMTA7XG4gICAgcmV0dXJuIDIgPD0gZW5kICYmIGVuZCA8PSA0ICYmIChuICUgMTAwIDwgMTAgfHwgbiAlIDEwMCA+PSAyMCkgPyAxIDogMjtcbiAgfSxcbiAgaWNlbGFuZGljOiBmdW5jdGlvbiAobikgeyByZXR1cm4gKG4gJSAxMCAhPT0gMSB8fCBuICUgMTAwID09PSAxMSkgPyAxIDogMDsgfSxcbiAgc2xvdmVuaWFuOiBmdW5jdGlvbiAobikge1xuICAgIHZhciBsYXN0VHdvID0gbiAlIDEwMDtcbiAgICBpZiAobGFzdFR3byA9PT0gMSkge1xuICAgICAgcmV0dXJuIDA7XG4gICAgfVxuICAgIGlmIChsYXN0VHdvID09PSAyKSB7XG4gICAgICByZXR1cm4gMTtcbiAgICB9XG4gICAgaWYgKGxhc3RUd28gPT09IDMgfHwgbGFzdFR3byA9PT0gNCkge1xuICAgICAgcmV0dXJuIDI7XG4gICAgfVxuICAgIHJldHVybiAzO1xuICB9XG59O1xuXG5cbi8vIE1hcHBpbmcgZnJvbSBwbHVyYWxpemF0aW9uIGdyb3VwIHRvIGluZGl2aWR1YWwgbGFuZ3VhZ2UgY29kZXMvbG9jYWxlcy5cbi8vIFdpbGwgbG9vayB1cCBiYXNlZCBvbiBleGFjdCBtYXRjaCwgaWYgbm90IGZvdW5kIGFuZCBpdCdzIGEgbG9jYWxlIHdpbGwgcGFyc2UgdGhlIGxvY2FsZVxuLy8gZm9yIGxhbmd1YWdlIGNvZGUsIGFuZCBpZiB0aGF0IGRvZXMgbm90IGV4aXN0IHdpbGwgZGVmYXVsdCB0byAnZW4nXG52YXIgcGx1cmFsVHlwZVRvTGFuZ3VhZ2VzID0ge1xuICBhcmFiaWM6IFsnYXInXSxcbiAgYm9zbmlhbl9zZXJiaWFuOiBbJ2JzLUxhdG4tQkEnLCAnYnMtQ3lybC1CQScsICdzcmwtUlMnLCAnc3ItUlMnXSxcbiAgY2hpbmVzZTogWydpZCcsICdpZC1JRCcsICdqYScsICdrbycsICdrby1LUicsICdsbycsICdtcycsICd0aCcsICd0aC1USCcsICd6aCddLFxuICBjcm9hdGlhbjogWydocicsICdoci1IUiddLFxuICBnZXJtYW46IFsnZmEnLCAnZGEnLCAnZGUnLCAnZW4nLCAnZXMnLCAnZmknLCAnZWwnLCAnaGUnLCAnaGktSU4nLCAnaHUnLCAnaHUtSFUnLCAnaXQnLCAnbmwnLCAnbm8nLCAncHQnLCAnc3YnLCAndHInXSxcbiAgZnJlbmNoOiBbJ2ZyJywgJ3RsJywgJ3B0LWJyJ10sXG4gIHJ1c3NpYW46IFsncnUnLCAncnUtUlUnXSxcbiAgbGl0aHVhbmlhbjogWydsdCddLFxuICBjemVjaDogWydjcycsICdjcy1DWicsICdzayddLFxuICBwb2xpc2g6IFsncGwnXSxcbiAgaWNlbGFuZGljOiBbJ2lzJ10sXG4gIHNsb3ZlbmlhbjogWydzbC1TTCddXG59O1xuXG5mdW5jdGlvbiBsYW5nVG9UeXBlTWFwKG1hcHBpbmcpIHtcbiAgdmFyIHJldCA9IHt9O1xuICBmb3JFYWNoKG1hcHBpbmcsIGZ1bmN0aW9uIChsYW5ncywgdHlwZSkge1xuICAgIGZvckVhY2gobGFuZ3MsIGZ1bmN0aW9uIChsYW5nKSB7XG4gICAgICByZXRbbGFuZ10gPSB0eXBlO1xuICAgIH0pO1xuICB9KTtcbiAgcmV0dXJuIHJldDtcbn1cblxuZnVuY3Rpb24gcGx1cmFsVHlwZU5hbWUobG9jYWxlKSB7XG4gIHZhciBsYW5nVG9QbHVyYWxUeXBlID0gbGFuZ1RvVHlwZU1hcChwbHVyYWxUeXBlVG9MYW5ndWFnZXMpO1xuICByZXR1cm4gbGFuZ1RvUGx1cmFsVHlwZVtsb2NhbGVdXG4gICAgfHwgbGFuZ1RvUGx1cmFsVHlwZVtzcGxpdC5jYWxsKGxvY2FsZSwgLy0vLCAxKVswXV1cbiAgICB8fCBsYW5nVG9QbHVyYWxUeXBlLmVuO1xufVxuXG5mdW5jdGlvbiBwbHVyYWxUeXBlSW5kZXgobG9jYWxlLCBjb3VudCkge1xuICByZXR1cm4gcGx1cmFsVHlwZXNbcGx1cmFsVHlwZU5hbWUobG9jYWxlKV0oY291bnQpO1xufVxuXG5mdW5jdGlvbiBlc2NhcGUodG9rZW4pIHtcbiAgcmV0dXJuIHRva2VuLnJlcGxhY2UoL1suKis/XiR7fSgpfFtcXF1cXFxcXS9nLCAnXFxcXCQmJyk7XG59XG5cbmZ1bmN0aW9uIGNvbnN0cnVjdFRva2VuUmVnZXgob3B0cykge1xuICB2YXIgcHJlZml4ID0gKG9wdHMgJiYgb3B0cy5wcmVmaXgpIHx8ICcleyc7XG4gIHZhciBzdWZmaXggPSAob3B0cyAmJiBvcHRzLnN1ZmZpeCkgfHwgJ30nO1xuXG4gIGlmIChwcmVmaXggPT09IGRlbGltaXRlciB8fCBzdWZmaXggPT09IGRlbGltaXRlcikge1xuICAgIHRocm93IG5ldyBSYW5nZUVycm9yKCdcIicgKyBkZWxpbWl0ZXIgKyAnXCIgdG9rZW4gaXMgcmVzZXJ2ZWQgZm9yIHBsdXJhbGl6YXRpb24nKTtcbiAgfVxuXG4gIHJldHVybiBuZXcgUmVnRXhwKGVzY2FwZShwcmVmaXgpICsgJyguKj8pJyArIGVzY2FwZShzdWZmaXgpLCAnZycpO1xufVxuXG52YXIgZG9sbGFyUmVnZXggPSAvXFwkL2c7XG52YXIgZG9sbGFyQmlsbHNZYWxsID0gJyQkJztcbnZhciBkZWZhdWx0VG9rZW5SZWdleCA9IC8lXFx7KC4qPylcXH0vZztcblxuLy8gIyMjIHRyYW5zZm9ybVBocmFzZShwaHJhc2UsIHN1YnN0aXR1dGlvbnMsIGxvY2FsZSlcbi8vXG4vLyBUYWtlcyBhIHBocmFzZSBzdHJpbmcgYW5kIHRyYW5zZm9ybXMgaXQgYnkgY2hvb3NpbmcgdGhlIGNvcnJlY3Rcbi8vIHBsdXJhbCBmb3JtIGFuZCBpbnRlcnBvbGF0aW5nIGl0LlxuLy9cbi8vICAgICB0cmFuc2Zvcm1QaHJhc2UoJ0hlbGxvLCAle25hbWV9IScsIHtuYW1lOiAnU3Bpa2UnfSk7XG4vLyAgICAgLy8gXCJIZWxsbywgU3Bpa2UhXCJcbi8vXG4vLyBUaGUgY29ycmVjdCBwbHVyYWwgZm9ybSBpcyBzZWxlY3RlZCBpZiBzdWJzdGl0dXRpb25zLnNtYXJ0X2NvdW50XG4vLyBpcyBzZXQuIFlvdSBjYW4gcGFzcyBpbiBhIG51bWJlciBpbnN0ZWFkIG9mIGFuIE9iamVjdCBhcyBgc3Vic3RpdHV0aW9uc2Bcbi8vIGFzIGEgc2hvcnRjdXQgZm9yIGBzbWFydF9jb3VudGAuXG4vL1xuLy8gICAgIHRyYW5zZm9ybVBocmFzZSgnJXtzbWFydF9jb3VudH0gbmV3IG1lc3NhZ2VzIHx8fHwgMSBuZXcgbWVzc2FnZScsIHtzbWFydF9jb3VudDogMX0sICdlbicpO1xuLy8gICAgIC8vIFwiMSBuZXcgbWVzc2FnZVwiXG4vL1xuLy8gICAgIHRyYW5zZm9ybVBocmFzZSgnJXtzbWFydF9jb3VudH0gbmV3IG1lc3NhZ2VzIHx8fHwgMSBuZXcgbWVzc2FnZScsIHtzbWFydF9jb3VudDogMn0sICdlbicpO1xuLy8gICAgIC8vIFwiMiBuZXcgbWVzc2FnZXNcIlxuLy9cbi8vICAgICB0cmFuc2Zvcm1QaHJhc2UoJyV7c21hcnRfY291bnR9IG5ldyBtZXNzYWdlcyB8fHx8IDEgbmV3IG1lc3NhZ2UnLCA1LCAnZW4nKTtcbi8vICAgICAvLyBcIjUgbmV3IG1lc3NhZ2VzXCJcbi8vXG4vLyBZb3Ugc2hvdWxkIHBhc3MgaW4gYSB0aGlyZCBhcmd1bWVudCwgdGhlIGxvY2FsZSwgdG8gc3BlY2lmeSB0aGUgY29ycmVjdCBwbHVyYWwgdHlwZS5cbi8vIEl0IGRlZmF1bHRzIHRvIGAnZW4nYCB3aXRoIDIgcGx1cmFsIGZvcm1zLlxuZnVuY3Rpb24gdHJhbnNmb3JtUGhyYXNlKHBocmFzZSwgc3Vic3RpdHV0aW9ucywgbG9jYWxlLCB0b2tlblJlZ2V4KSB7XG4gIGlmICh0eXBlb2YgcGhyYXNlICE9PSAnc3RyaW5nJykge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ1BvbHlnbG90LnRyYW5zZm9ybVBocmFzZSBleHBlY3RzIGFyZ3VtZW50ICMxIHRvIGJlIHN0cmluZycpO1xuICB9XG5cbiAgaWYgKHN1YnN0aXR1dGlvbnMgPT0gbnVsbCkge1xuICAgIHJldHVybiBwaHJhc2U7XG4gIH1cblxuICB2YXIgcmVzdWx0ID0gcGhyYXNlO1xuICB2YXIgaW50ZXJwb2xhdGlvblJlZ2V4ID0gdG9rZW5SZWdleCB8fCBkZWZhdWx0VG9rZW5SZWdleDtcblxuICAvLyBhbGxvdyBudW1iZXIgYXMgYSBwbHVyYWxpemF0aW9uIHNob3J0Y3V0XG4gIHZhciBvcHRpb25zID0gdHlwZW9mIHN1YnN0aXR1dGlvbnMgPT09ICdudW1iZXInID8geyBzbWFydF9jb3VudDogc3Vic3RpdHV0aW9ucyB9IDogc3Vic3RpdHV0aW9ucztcblxuICAvLyBTZWxlY3QgcGx1cmFsIGZvcm06IGJhc2VkIG9uIGEgcGhyYXNlIHRleHQgdGhhdCBjb250YWlucyBgbmBcbiAgLy8gcGx1cmFsIGZvcm1zIHNlcGFyYXRlZCBieSBgZGVsaW1pdGVyYCwgYSBgbG9jYWxlYCwgYW5kIGEgYHN1YnN0aXR1dGlvbnMuc21hcnRfY291bnRgLFxuICAvLyBjaG9vc2UgdGhlIGNvcnJlY3QgcGx1cmFsIGZvcm0uIFRoaXMgaXMgb25seSBkb25lIGlmIGBjb3VudGAgaXMgc2V0LlxuICBpZiAob3B0aW9ucy5zbWFydF9jb3VudCAhPSBudWxsICYmIHJlc3VsdCkge1xuICAgIHZhciB0ZXh0cyA9IHNwbGl0LmNhbGwocmVzdWx0LCBkZWxpbWl0ZXIpO1xuICAgIHJlc3VsdCA9IHRyaW0odGV4dHNbcGx1cmFsVHlwZUluZGV4KGxvY2FsZSB8fCAnZW4nLCBvcHRpb25zLnNtYXJ0X2NvdW50KV0gfHwgdGV4dHNbMF0pO1xuICB9XG5cbiAgLy8gSW50ZXJwb2xhdGU6IENyZWF0ZXMgYSBgUmVnRXhwYCBvYmplY3QgZm9yIGVhY2ggaW50ZXJwb2xhdGlvbiBwbGFjZWhvbGRlci5cbiAgcmVzdWx0ID0gcmVwbGFjZS5jYWxsKHJlc3VsdCwgaW50ZXJwb2xhdGlvblJlZ2V4LCBmdW5jdGlvbiAoZXhwcmVzc2lvbiwgYXJndW1lbnQpIHtcbiAgICBpZiAoIWhhcyhvcHRpb25zLCBhcmd1bWVudCkgfHwgb3B0aW9uc1thcmd1bWVudF0gPT0gbnVsbCkgeyByZXR1cm4gZXhwcmVzc2lvbjsgfVxuICAgIC8vIEVuc3VyZSByZXBsYWNlbWVudCB2YWx1ZSBpcyBlc2NhcGVkIHRvIHByZXZlbnQgc3BlY2lhbCAkLXByZWZpeGVkIHJlZ2V4IHJlcGxhY2UgdG9rZW5zLlxuICAgIHJldHVybiByZXBsYWNlLmNhbGwob3B0aW9uc1thcmd1bWVudF0sIGRvbGxhclJlZ2V4LCBkb2xsYXJCaWxsc1lhbGwpO1xuICB9KTtcblxuICByZXR1cm4gcmVzdWx0O1xufVxuXG4vLyAjIyMgUG9seWdsb3QgY2xhc3MgY29uc3RydWN0b3JcbmZ1bmN0aW9uIFBvbHlnbG90KG9wdGlvbnMpIHtcbiAgdmFyIG9wdHMgPSBvcHRpb25zIHx8IHt9O1xuICB0aGlzLnBocmFzZXMgPSB7fTtcbiAgdGhpcy5leHRlbmQob3B0cy5waHJhc2VzIHx8IHt9KTtcbiAgdGhpcy5jdXJyZW50TG9jYWxlID0gb3B0cy5sb2NhbGUgfHwgJ2VuJztcbiAgdmFyIGFsbG93TWlzc2luZyA9IG9wdHMuYWxsb3dNaXNzaW5nID8gdHJhbnNmb3JtUGhyYXNlIDogbnVsbDtcbiAgdGhpcy5vbk1pc3NpbmdLZXkgPSB0eXBlb2Ygb3B0cy5vbk1pc3NpbmdLZXkgPT09ICdmdW5jdGlvbicgPyBvcHRzLm9uTWlzc2luZ0tleSA6IGFsbG93TWlzc2luZztcbiAgdGhpcy53YXJuID0gb3B0cy53YXJuIHx8IHdhcm47XG4gIHRoaXMudG9rZW5SZWdleCA9IGNvbnN0cnVjdFRva2VuUmVnZXgob3B0cy5pbnRlcnBvbGF0aW9uKTtcbn1cblxuLy8gIyMjIHBvbHlnbG90LmxvY2FsZShbbG9jYWxlXSlcbi8vXG4vLyBHZXQgb3Igc2V0IGxvY2FsZS4gSW50ZXJuYWxseSwgUG9seWdsb3Qgb25seSB1c2VzIGxvY2FsZSBmb3IgcGx1cmFsaXphdGlvbi5cblBvbHlnbG90LnByb3RvdHlwZS5sb2NhbGUgPSBmdW5jdGlvbiAobmV3TG9jYWxlKSB7XG4gIGlmIChuZXdMb2NhbGUpIHRoaXMuY3VycmVudExvY2FsZSA9IG5ld0xvY2FsZTtcbiAgcmV0dXJuIHRoaXMuY3VycmVudExvY2FsZTtcbn07XG5cbi8vICMjIyBwb2x5Z2xvdC5leHRlbmQocGhyYXNlcylcbi8vXG4vLyBVc2UgYGV4dGVuZGAgdG8gdGVsbCBQb2x5Z2xvdCBob3cgdG8gdHJhbnNsYXRlIGEgZ2l2ZW4ga2V5LlxuLy9cbi8vICAgICBwb2x5Z2xvdC5leHRlbmQoe1xuLy8gICAgICAgXCJoZWxsb1wiOiBcIkhlbGxvXCIsXG4vLyAgICAgICBcImhlbGxvX25hbWVcIjogXCJIZWxsbywgJXtuYW1lfVwiXG4vLyAgICAgfSk7XG4vL1xuLy8gVGhlIGtleSBjYW4gYmUgYW55IHN0cmluZy4gIEZlZWwgZnJlZSB0byBjYWxsIGBleHRlbmRgIG11bHRpcGxlIHRpbWVzO1xuLy8gaXQgd2lsbCBvdmVycmlkZSBhbnkgcGhyYXNlcyB3aXRoIHRoZSBzYW1lIGtleSwgYnV0IGxlYXZlIGV4aXN0aW5nIHBocmFzZXNcbi8vIHVudG91Y2hlZC5cbi8vXG4vLyBJdCBpcyBhbHNvIHBvc3NpYmxlIHRvIHBhc3MgbmVzdGVkIHBocmFzZSBvYmplY3RzLCB3aGljaCBnZXQgZmxhdHRlbmVkXG4vLyBpbnRvIGFuIG9iamVjdCB3aXRoIHRoZSBuZXN0ZWQga2V5cyBjb25jYXRlbmF0ZWQgdXNpbmcgZG90IG5vdGF0aW9uLlxuLy9cbi8vICAgICBwb2x5Z2xvdC5leHRlbmQoe1xuLy8gICAgICAgXCJuYXZcIjoge1xuLy8gICAgICAgICBcImhlbGxvXCI6IFwiSGVsbG9cIixcbi8vICAgICAgICAgXCJoZWxsb19uYW1lXCI6IFwiSGVsbG8sICV7bmFtZX1cIixcbi8vICAgICAgICAgXCJzaWRlYmFyXCI6IHtcbi8vICAgICAgICAgICBcIndlbGNvbWVcIjogXCJXZWxjb21lXCJcbi8vICAgICAgICAgfVxuLy8gICAgICAgfVxuLy8gICAgIH0pO1xuLy9cbi8vICAgICBjb25zb2xlLmxvZyhwb2x5Z2xvdC5waHJhc2VzKTtcbi8vICAgICAvLyB7XG4vLyAgICAgLy8gICAnbmF2LmhlbGxvJzogJ0hlbGxvJyxcbi8vICAgICAvLyAgICduYXYuaGVsbG9fbmFtZSc6ICdIZWxsbywgJXtuYW1lfScsXG4vLyAgICAgLy8gICAnbmF2LnNpZGViYXIud2VsY29tZSc6ICdXZWxjb21lJ1xuLy8gICAgIC8vIH1cbi8vXG4vLyBgZXh0ZW5kYCBhY2NlcHRzIGFuIG9wdGlvbmFsIHNlY29uZCBhcmd1bWVudCwgYHByZWZpeGAsIHdoaWNoIGNhbiBiZSB1c2VkXG4vLyB0byBwcmVmaXggZXZlcnkga2V5IGluIHRoZSBwaHJhc2VzIG9iamVjdCB3aXRoIHNvbWUgc3RyaW5nLCB1c2luZyBkb3Rcbi8vIG5vdGF0aW9uLlxuLy9cbi8vICAgICBwb2x5Z2xvdC5leHRlbmQoe1xuLy8gICAgICAgXCJoZWxsb1wiOiBcIkhlbGxvXCIsXG4vLyAgICAgICBcImhlbGxvX25hbWVcIjogXCJIZWxsbywgJXtuYW1lfVwiXG4vLyAgICAgfSwgXCJuYXZcIik7XG4vL1xuLy8gICAgIGNvbnNvbGUubG9nKHBvbHlnbG90LnBocmFzZXMpO1xuLy8gICAgIC8vIHtcbi8vICAgICAvLyAgICduYXYuaGVsbG8nOiAnSGVsbG8nLFxuLy8gICAgIC8vICAgJ25hdi5oZWxsb19uYW1lJzogJ0hlbGxvLCAle25hbWV9J1xuLy8gICAgIC8vIH1cbi8vXG4vLyBUaGlzIGZlYXR1cmUgaXMgdXNlZCBpbnRlcm5hbGx5IHRvIHN1cHBvcnQgbmVzdGVkIHBocmFzZSBvYmplY3RzLlxuUG9seWdsb3QucHJvdG90eXBlLmV4dGVuZCA9IGZ1bmN0aW9uIChtb3JlUGhyYXNlcywgcHJlZml4KSB7XG4gIGZvckVhY2gobW9yZVBocmFzZXMsIGZ1bmN0aW9uIChwaHJhc2UsIGtleSkge1xuICAgIHZhciBwcmVmaXhlZEtleSA9IHByZWZpeCA/IHByZWZpeCArICcuJyArIGtleSA6IGtleTtcbiAgICBpZiAodHlwZW9mIHBocmFzZSA9PT0gJ29iamVjdCcpIHtcbiAgICAgIHRoaXMuZXh0ZW5kKHBocmFzZSwgcHJlZml4ZWRLZXkpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnBocmFzZXNbcHJlZml4ZWRLZXldID0gcGhyYXNlO1xuICAgIH1cbiAgfSwgdGhpcyk7XG59O1xuXG4vLyAjIyMgcG9seWdsb3QudW5zZXQocGhyYXNlcylcbi8vIFVzZSBgdW5zZXRgIHRvIHNlbGVjdGl2ZWx5IHJlbW92ZSBrZXlzIGZyb20gYSBwb2x5Z2xvdCBpbnN0YW5jZS5cbi8vXG4vLyAgICAgcG9seWdsb3QudW5zZXQoXCJzb21lX2tleVwiKTtcbi8vICAgICBwb2x5Z2xvdC51bnNldCh7XG4vLyAgICAgICBcImhlbGxvXCI6IFwiSGVsbG9cIixcbi8vICAgICAgIFwiaGVsbG9fbmFtZVwiOiBcIkhlbGxvLCAle25hbWV9XCJcbi8vICAgICB9KTtcbi8vXG4vLyBUaGUgdW5zZXQgbWV0aG9kIGNhbiB0YWtlIGVpdGhlciBhIHN0cmluZyAoZm9yIHRoZSBrZXkpLCBvciBhbiBvYmplY3QgaGFzaCB3aXRoXG4vLyB0aGUga2V5cyB0aGF0IHlvdSB3b3VsZCBsaWtlIHRvIHVuc2V0LlxuUG9seWdsb3QucHJvdG90eXBlLnVuc2V0ID0gZnVuY3Rpb24gKG1vcmVQaHJhc2VzLCBwcmVmaXgpIHtcbiAgaWYgKHR5cGVvZiBtb3JlUGhyYXNlcyA9PT0gJ3N0cmluZycpIHtcbiAgICBkZWxldGUgdGhpcy5waHJhc2VzW21vcmVQaHJhc2VzXTtcbiAgfSBlbHNlIHtcbiAgICBmb3JFYWNoKG1vcmVQaHJhc2VzLCBmdW5jdGlvbiAocGhyYXNlLCBrZXkpIHtcbiAgICAgIHZhciBwcmVmaXhlZEtleSA9IHByZWZpeCA/IHByZWZpeCArICcuJyArIGtleSA6IGtleTtcbiAgICAgIGlmICh0eXBlb2YgcGhyYXNlID09PSAnb2JqZWN0Jykge1xuICAgICAgICB0aGlzLnVuc2V0KHBocmFzZSwgcHJlZml4ZWRLZXkpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgZGVsZXRlIHRoaXMucGhyYXNlc1twcmVmaXhlZEtleV07XG4gICAgICB9XG4gICAgfSwgdGhpcyk7XG4gIH1cbn07XG5cbi8vICMjIyBwb2x5Z2xvdC5jbGVhcigpXG4vL1xuLy8gQ2xlYXJzIGFsbCBwaHJhc2VzLiBVc2VmdWwgZm9yIHNwZWNpYWwgY2FzZXMsIHN1Y2ggYXMgZnJlZWluZ1xuLy8gdXAgbWVtb3J5IGlmIHlvdSBoYXZlIGxvdHMgb2YgcGhyYXNlcyBidXQgbm8gbG9uZ2VyIG5lZWQgdG9cbi8vIHBlcmZvcm0gYW55IHRyYW5zbGF0aW9uLiBBbHNvIHVzZWQgaW50ZXJuYWxseSBieSBgcmVwbGFjZWAuXG5Qb2x5Z2xvdC5wcm90b3R5cGUuY2xlYXIgPSBmdW5jdGlvbiAoKSB7XG4gIHRoaXMucGhyYXNlcyA9IHt9O1xufTtcblxuLy8gIyMjIHBvbHlnbG90LnJlcGxhY2UocGhyYXNlcylcbi8vXG4vLyBDb21wbGV0ZWx5IHJlcGxhY2UgdGhlIGV4aXN0aW5nIHBocmFzZXMgd2l0aCBhIG5ldyBzZXQgb2YgcGhyYXNlcy5cbi8vIE5vcm1hbGx5LCBqdXN0IHVzZSBgZXh0ZW5kYCB0byBhZGQgbW9yZSBwaHJhc2VzLCBidXQgdW5kZXIgY2VydGFpblxuLy8gY2lyY3Vtc3RhbmNlcywgeW91IG1heSB3YW50IHRvIG1ha2Ugc3VyZSBubyBvbGQgcGhyYXNlcyBhcmUgbHlpbmcgYXJvdW5kLlxuUG9seWdsb3QucHJvdG90eXBlLnJlcGxhY2UgPSBmdW5jdGlvbiAobmV3UGhyYXNlcykge1xuICB0aGlzLmNsZWFyKCk7XG4gIHRoaXMuZXh0ZW5kKG5ld1BocmFzZXMpO1xufTtcblxuXG4vLyAjIyMgcG9seWdsb3QudChrZXksIG9wdGlvbnMpXG4vL1xuLy8gVGhlIG1vc3QtdXNlZCBtZXRob2QuIFByb3ZpZGUgYSBrZXksIGFuZCBgdGAgd2lsbCByZXR1cm4gdGhlXG4vLyBwaHJhc2UuXG4vL1xuLy8gICAgIHBvbHlnbG90LnQoXCJoZWxsb1wiKTtcbi8vICAgICA9PiBcIkhlbGxvXCJcbi8vXG4vLyBUaGUgcGhyYXNlIHZhbHVlIGlzIHByb3ZpZGVkIGZpcnN0IGJ5IGEgY2FsbCB0byBgcG9seWdsb3QuZXh0ZW5kKClgIG9yXG4vLyBgcG9seWdsb3QucmVwbGFjZSgpYC5cbi8vXG4vLyBQYXNzIGluIGFuIG9iamVjdCBhcyB0aGUgc2Vjb25kIGFyZ3VtZW50IHRvIHBlcmZvcm0gaW50ZXJwb2xhdGlvbi5cbi8vXG4vLyAgICAgcG9seWdsb3QudChcImhlbGxvX25hbWVcIiwge25hbWU6IFwiU3Bpa2VcIn0pO1xuLy8gICAgID0+IFwiSGVsbG8sIFNwaWtlXCJcbi8vXG4vLyBJZiB5b3UgbGlrZSwgeW91IGNhbiBwcm92aWRlIGEgZGVmYXVsdCB2YWx1ZSBpbiBjYXNlIHRoZSBwaHJhc2UgaXMgbWlzc2luZy5cbi8vIFVzZSB0aGUgc3BlY2lhbCBvcHRpb24ga2V5IFwiX1wiIHRvIHNwZWNpZnkgYSBkZWZhdWx0LlxuLy9cbi8vICAgICBwb2x5Z2xvdC50KFwiaV9saWtlX3RvX3dyaXRlX2luX2xhbmd1YWdlXCIsIHtcbi8vICAgICAgIF86IFwiSSBsaWtlIHRvIHdyaXRlIGluICV7bGFuZ3VhZ2V9LlwiLFxuLy8gICAgICAgbGFuZ3VhZ2U6IFwiSmF2YVNjcmlwdFwiXG4vLyAgICAgfSk7XG4vLyAgICAgPT4gXCJJIGxpa2UgdG8gd3JpdGUgaW4gSmF2YVNjcmlwdC5cIlxuLy9cblBvbHlnbG90LnByb3RvdHlwZS50ID0gZnVuY3Rpb24gKGtleSwgb3B0aW9ucykge1xuICB2YXIgcGhyYXNlLCByZXN1bHQ7XG4gIHZhciBvcHRzID0gb3B0aW9ucyA9PSBudWxsID8ge30gOiBvcHRpb25zO1xuICBpZiAodHlwZW9mIHRoaXMucGhyYXNlc1trZXldID09PSAnc3RyaW5nJykge1xuICAgIHBocmFzZSA9IHRoaXMucGhyYXNlc1trZXldO1xuICB9IGVsc2UgaWYgKHR5cGVvZiBvcHRzLl8gPT09ICdzdHJpbmcnKSB7XG4gICAgcGhyYXNlID0gb3B0cy5fO1xuICB9IGVsc2UgaWYgKHRoaXMub25NaXNzaW5nS2V5KSB7XG4gICAgdmFyIG9uTWlzc2luZ0tleSA9IHRoaXMub25NaXNzaW5nS2V5O1xuICAgIHJlc3VsdCA9IG9uTWlzc2luZ0tleShrZXksIG9wdHMsIHRoaXMuY3VycmVudExvY2FsZSwgdGhpcy50b2tlblJlZ2V4KTtcbiAgfSBlbHNlIHtcbiAgICB0aGlzLndhcm4oJ01pc3NpbmcgdHJhbnNsYXRpb24gZm9yIGtleTogXCInICsga2V5ICsgJ1wiJyk7XG4gICAgcmVzdWx0ID0ga2V5O1xuICB9XG4gIGlmICh0eXBlb2YgcGhyYXNlID09PSAnc3RyaW5nJykge1xuICAgIHJlc3VsdCA9IHRyYW5zZm9ybVBocmFzZShwaHJhc2UsIG9wdHMsIHRoaXMuY3VycmVudExvY2FsZSwgdGhpcy50b2tlblJlZ2V4KTtcbiAgfVxuICByZXR1cm4gcmVzdWx0O1xufTtcblxuXG4vLyAjIyMgcG9seWdsb3QuaGFzKGtleSlcbi8vXG4vLyBDaGVjayBpZiBwb2x5Z2xvdCBoYXMgYSB0cmFuc2xhdGlvbiBmb3IgZ2l2ZW4ga2V5XG5Qb2x5Z2xvdC5wcm90b3R5cGUuaGFzID0gZnVuY3Rpb24gKGtleSkge1xuICByZXR1cm4gaGFzKHRoaXMucGhyYXNlcywga2V5KTtcbn07XG5cbi8vIGV4cG9ydCB0cmFuc2Zvcm1QaHJhc2VcblBvbHlnbG90LnRyYW5zZm9ybVBocmFzZSA9IGZ1bmN0aW9uIHRyYW5zZm9ybShwaHJhc2UsIHN1YnN0aXR1dGlvbnMsIGxvY2FsZSkge1xuICByZXR1cm4gdHJhbnNmb3JtUGhyYXNlKHBocmFzZSwgc3Vic3RpdHV0aW9ucywgbG9jYWxlKTtcbn07XG5cbnZhciB3ZWJpeFBvbHlnbG90ID0gUG9seWdsb3Q7XG5cbmZ1bmN0aW9uIExvY2FsZShhcHAsIF92aWV3LCBjb25maWcpIHtcclxuICAgIGNvbmZpZyA9IGNvbmZpZyB8fCB7fTtcclxuICAgIGNvbnN0IHN0b3JhZ2UgPSBjb25maWcuc3RvcmFnZTtcclxuICAgIGxldCBsYW5nID0gc3RvcmFnZSA/IChzdG9yYWdlLmdldChcImxhbmdcIikgfHwgXCJlblwiKSA6IChjb25maWcubGFuZyB8fCBcImVuXCIpO1xyXG4gICAgZnVuY3Rpb24gc2V0TGFuZ0RhdGEobmFtZSwgZGF0YSwgc2lsZW50KSB7XHJcbiAgICAgICAgaWYgKGRhdGEuX19lc01vZHVsZSkge1xyXG4gICAgICAgICAgICBkYXRhID0gZGF0YS5kZWZhdWx0O1xyXG4gICAgICAgIH1cclxuICAgICAgICBjb25zdCBwY29uZmlnID0geyBwaHJhc2VzOiBkYXRhIH07XHJcbiAgICAgICAgaWYgKGNvbmZpZy5wb2x5Z2xvdCkge1xyXG4gICAgICAgICAgICBhcHAud2ViaXguZXh0ZW5kKHBjb25maWcsIGNvbmZpZy5wb2x5Z2xvdCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNvbnN0IHBvbHkgPSBzZXJ2aWNlLnBvbHlnbG90ID0gbmV3IHdlYml4UG9seWdsb3QocGNvbmZpZyk7XHJcbiAgICAgICAgcG9seS5sb2NhbGUobmFtZSk7XHJcbiAgICAgICAgc2VydmljZS5fID0gYXBwLndlYml4LmJpbmQocG9seS50LCBwb2x5KTtcclxuICAgICAgICBsYW5nID0gbmFtZTtcclxuICAgICAgICBpZiAoc3RvcmFnZSkge1xyXG4gICAgICAgICAgICBzdG9yYWdlLnB1dChcImxhbmdcIiwgbGFuZyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChjb25maWcud2ViaXgpIHtcclxuICAgICAgICAgICAgY29uc3QgbG9jTmFtZSA9IGNvbmZpZy53ZWJpeFtuYW1lXTtcclxuICAgICAgICAgICAgaWYgKGxvY05hbWUpIHtcclxuICAgICAgICAgICAgICAgIGFwcC53ZWJpeC5pMThuLnNldExvY2FsZShsb2NOYW1lKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoIXNpbGVudCkge1xyXG4gICAgICAgICAgICByZXR1cm4gYXBwLnJlZnJlc2goKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSgpO1xyXG4gICAgfVxyXG4gICAgZnVuY3Rpb24gZ2V0TGFuZygpIHsgcmV0dXJuIGxhbmc7IH1cclxuICAgIGZ1bmN0aW9uIHNldExhbmcobmFtZSwgc2lsZW50KSB7XHJcbiAgICAgICAgLy8gaWdub3JlIHNldExhbmcgaWYgbG9hZGluZyBieSBwYXRoIGlzIGRpc2FibGVkXHJcbiAgICAgICAgaWYgKGNvbmZpZy5wYXRoID09PSBmYWxzZSkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNvbnN0IHBhdGggPSAoY29uZmlnLnBhdGggPyBjb25maWcucGF0aCArIFwiL1wiIDogXCJcIikgKyBuYW1lO1xyXG4gICAgICAgIGNvbnN0IGRhdGEgPSByZXF1aXJlKFwiamV0LWxvY2FsZXMvXCIgKyBwYXRoKTtcclxuICAgICAgICBzZXRMYW5nRGF0YShuYW1lLCBkYXRhLCBzaWxlbnQpO1xyXG4gICAgfVxyXG4gICAgY29uc3Qgc2VydmljZSA9IHtcclxuICAgICAgICBnZXRMYW5nLCBzZXRMYW5nLCBzZXRMYW5nRGF0YSwgXzogbnVsbCwgcG9seWdsb3Q6IG51bGxcclxuICAgIH07XHJcbiAgICBhcHAuc2V0U2VydmljZShcImxvY2FsZVwiLCBzZXJ2aWNlKTtcclxuICAgIHNldExhbmcobGFuZywgdHJ1ZSk7XHJcbn1cblxuZnVuY3Rpb24gc2hvdyh2aWV3LCBjb25maWcsIHZhbHVlKSB7XHJcbiAgICBpZiAoY29uZmlnLnVybHMpIHtcclxuICAgICAgICB2YWx1ZSA9IGNvbmZpZy51cmxzW3ZhbHVlXSB8fCB2YWx1ZTtcclxuICAgIH1cclxuICAgIGVsc2UgaWYgKGNvbmZpZy5wYXJhbSkge1xyXG4gICAgICAgIHZhbHVlID0geyBbY29uZmlnLnBhcmFtXTogdmFsdWUgfTtcclxuICAgIH1cclxuICAgIHZpZXcuc2hvdyh2YWx1ZSk7XHJcbn1cclxuZnVuY3Rpb24gTWVudShhcHAsIHZpZXcsIGNvbmZpZykge1xyXG4gICAgY29uc3QgZnJhbWUgPSB2aWV3LmdldFN1YlZpZXdJbmZvKCkucGFyZW50O1xyXG4gICAgY29uc3QgdWkgPSB2aWV3LiQkKGNvbmZpZy5pZCB8fCBjb25maWcpO1xyXG4gICAgbGV0IHNpbGVudCA9IGZhbHNlO1xyXG4gICAgdWkuYXR0YWNoRXZlbnQoXCJvbmNoYW5nZVwiLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgaWYgKCFzaWxlbnQpIHtcclxuICAgICAgICAgICAgc2hvdyhmcmFtZSwgY29uZmlnLCB0aGlzLmdldFZhbHVlKCkpO1xyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG4gICAgdWkuYXR0YWNoRXZlbnQoXCJvbmFmdGVyc2VsZWN0XCIsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBpZiAoIXNpbGVudCkge1xyXG4gICAgICAgICAgICBsZXQgaWQgPSBudWxsO1xyXG4gICAgICAgICAgICBpZiAodWkuc2V0VmFsdWUpIHtcclxuICAgICAgICAgICAgICAgIGlkID0gdGhpcy5nZXRWYWx1ZSgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2UgaWYgKHVpLmdldFNlbGVjdGVkSWQpIHtcclxuICAgICAgICAgICAgICAgIGlkID0gdWkuZ2V0U2VsZWN0ZWRJZCgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHNob3coZnJhbWUsIGNvbmZpZywgaWQpO1xyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG4gICAgdmlldy5vbihhcHAsIGBhcHA6cm91dGVgLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgbGV0IG5hbWUgPSBcIlwiO1xyXG4gICAgICAgIGlmIChjb25maWcucGFyYW0pIHtcclxuICAgICAgICAgICAgbmFtZSA9IHZpZXcuZ2V0UGFyYW0oY29uZmlnLnBhcmFtLCB0cnVlKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHNlZ21lbnQgPSBmcmFtZS5nZXRVcmwoKVsxXTtcclxuICAgICAgICAgICAgaWYgKHNlZ21lbnQpIHtcclxuICAgICAgICAgICAgICAgIG5hbWUgPSBzZWdtZW50LnBhZ2U7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKG5hbWUpIHtcclxuICAgICAgICAgICAgc2lsZW50ID0gdHJ1ZTtcclxuICAgICAgICAgICAgaWYgKHVpLnNldFZhbHVlICYmIHVpLmdldFZhbHVlKCkgIT09IG5hbWUpIHtcclxuICAgICAgICAgICAgICAgIHVpLnNldFZhbHVlKG5hbWUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2UgaWYgKHVpLnNlbGVjdCAmJiB1aS5leGlzdHMobmFtZSkgJiYgdWkuZ2V0U2VsZWN0ZWRJZCgpICE9PSBuYW1lKSB7XHJcbiAgICAgICAgICAgICAgICB1aS5zZWxlY3QobmFtZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgc2lsZW50ID0gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcbn1cblxuY29uc3QgYmFzZWljb25zID0ge1xyXG4gICAgZ29vZDogXCJjaGVja1wiLFxyXG4gICAgZXJyb3I6IFwid2FybmluZ1wiLFxyXG4gICAgc2F2aW5nOiBcInJlZnJlc2ggZmEtc3BpblwiXHJcbn07XHJcbmNvbnN0IGJhc2V0ZXh0ID0ge1xyXG4gICAgZ29vZDogXCJPa1wiLFxyXG4gICAgZXJyb3I6IFwiRXJyb3JcIixcclxuICAgIHNhdmluZzogXCJDb25uZWN0aW5nLi4uXCJcclxufTtcclxuZnVuY3Rpb24gU3RhdHVzKGFwcCwgdmlldywgY29uZmlnKSB7XHJcbiAgICBsZXQgc3RhdHVzID0gXCJnb29kXCI7XHJcbiAgICBsZXQgY291bnQgPSAwO1xyXG4gICAgbGV0IGlzZXJyb3IgPSBmYWxzZTtcclxuICAgIGxldCBleHBpcmVEZWxheSA9IGNvbmZpZy5leHBpcmU7XHJcbiAgICBpZiAoIWV4cGlyZURlbGF5ICYmIGV4cGlyZURlbGF5ICE9PSBmYWxzZSkge1xyXG4gICAgICAgIGV4cGlyZURlbGF5ID0gMjAwMDtcclxuICAgIH1cclxuICAgIGNvbnN0IHRleHRzID0gY29uZmlnLnRleHRzIHx8IGJhc2V0ZXh0O1xyXG4gICAgY29uc3QgaWNvbnMgPSBjb25maWcuaWNvbnMgfHwgYmFzZWljb25zO1xyXG4gICAgaWYgKHR5cGVvZiBjb25maWcgPT09IFwic3RyaW5nXCIpIHtcclxuICAgICAgICBjb25maWcgPSB7IHRhcmdldDogY29uZmlnIH07XHJcbiAgICB9XHJcbiAgICBmdW5jdGlvbiByZWZyZXNoKGNvbnRlbnQpIHtcclxuICAgICAgICBjb25zdCBhcmVhID0gdmlldy4kJChjb25maWcudGFyZ2V0KTtcclxuICAgICAgICBpZiAoYXJlYSkge1xyXG4gICAgICAgICAgICBpZiAoIWNvbnRlbnQpIHtcclxuICAgICAgICAgICAgICAgIGNvbnRlbnQgPSBcIjxkaXYgY2xhc3M9J3N0YXR1c19cIiArXHJcbiAgICAgICAgICAgICAgICAgICAgc3RhdHVzICtcclxuICAgICAgICAgICAgICAgICAgICBcIic+PHNwYW4gY2xhc3M9J3dlYml4X2ljb24gZmEtXCIgK1xyXG4gICAgICAgICAgICAgICAgICAgIGljb25zW3N0YXR1c10gKyBcIic+PC9zcGFuPiBcIiArIHRleHRzW3N0YXR1c10gKyBcIjwvZGl2PlwiO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGFyZWEuc2V0SFRNTChjb250ZW50KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBmdW5jdGlvbiBzdWNjZXNzKCkge1xyXG4gICAgICAgIGNvdW50LS07XHJcbiAgICAgICAgc2V0U3RhdHVzKFwiZ29vZFwiKTtcclxuICAgIH1cclxuICAgIGZ1bmN0aW9uIGZhaWwoZXJyKSB7XHJcbiAgICAgICAgY291bnQtLTtcclxuICAgICAgICBzZXRTdGF0dXMoXCJlcnJvclwiLCBlcnIpO1xyXG4gICAgfVxyXG4gICAgZnVuY3Rpb24gc3RhcnQocHJvbWlzZSkge1xyXG4gICAgICAgIGNvdW50Kys7XHJcbiAgICAgICAgc2V0U3RhdHVzKFwic2F2aW5nXCIpO1xyXG4gICAgICAgIGlmIChwcm9taXNlICYmIHByb21pc2UudGhlbikge1xyXG4gICAgICAgICAgICBwcm9taXNlLnRoZW4oc3VjY2VzcywgZmFpbCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgZnVuY3Rpb24gZ2V0U3RhdHVzKCkge1xyXG4gICAgICAgIHJldHVybiBzdGF0dXM7XHJcbiAgICB9XHJcbiAgICBmdW5jdGlvbiBoaWRlU3RhdHVzKCkge1xyXG4gICAgICAgIGlmIChjb3VudCA9PT0gMCkge1xyXG4gICAgICAgICAgICByZWZyZXNoKFwiIFwiKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBmdW5jdGlvbiBzZXRTdGF0dXMobW9kZSwgZXJyKSB7XHJcbiAgICAgICAgaWYgKGNvdW50IDwgMCkge1xyXG4gICAgICAgICAgICBjb3VudCA9IDA7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChtb2RlID09PSBcInNhdmluZ1wiKSB7XHJcbiAgICAgICAgICAgIHN0YXR1cyA9IFwic2F2aW5nXCI7XHJcbiAgICAgICAgICAgIHJlZnJlc2goKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIGlzZXJyb3IgPSAobW9kZSA9PT0gXCJlcnJvclwiKTtcclxuICAgICAgICAgICAgaWYgKGNvdW50ID09PSAwKSB7XHJcbiAgICAgICAgICAgICAgICBzdGF0dXMgPSBpc2Vycm9yID8gXCJlcnJvclwiIDogXCJnb29kXCI7XHJcbiAgICAgICAgICAgICAgICBpZiAoaXNlcnJvcikge1xyXG4gICAgICAgICAgICAgICAgICAgIGFwcC5lcnJvcihcImFwcDplcnJvcjpzZXJ2ZXJcIiwgW2Vyci5yZXNwb25zZVRleHQgfHwgZXJyXSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoZXhwaXJlRGVsYXkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2V0VGltZW91dChoaWRlU3RhdHVzLCBleHBpcmVEZWxheSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgcmVmcmVzaCgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgZnVuY3Rpb24gdHJhY2soZGF0YSkge1xyXG4gICAgICAgIGNvbnN0IGRwID0gYXBwLndlYml4LmRwKGRhdGEpO1xyXG4gICAgICAgIGlmIChkcCkge1xyXG4gICAgICAgICAgICB2aWV3Lm9uKGRwLCBcIm9uQWZ0ZXJEYXRhU2VuZFwiLCBzdGFydCk7XHJcbiAgICAgICAgICAgIHZpZXcub24oZHAsIFwib25BZnRlclNhdmVFcnJvclwiLCAoX2lkLCBfb2JqLCByZXNwb25zZSkgPT4gZmFpbChyZXNwb25zZSkpO1xyXG4gICAgICAgICAgICB2aWV3Lm9uKGRwLCBcIm9uQWZ0ZXJTYXZlXCIsIHN1Y2Nlc3MpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGFwcC5zZXRTZXJ2aWNlKFwic3RhdHVzXCIsIHtcclxuICAgICAgICBnZXRTdGF0dXMsXHJcbiAgICAgICAgc2V0U3RhdHVzLFxyXG4gICAgICAgIHRyYWNrXHJcbiAgICB9KTtcclxuICAgIGlmIChjb25maWcucmVtb3RlKSB7XHJcbiAgICAgICAgdmlldy5vbihhcHAud2ViaXgsIFwib25SZW1vdGVDYWxsXCIsIHN0YXJ0KTtcclxuICAgIH1cclxuICAgIGlmIChjb25maWcuYWpheCkge1xyXG4gICAgICAgIHZpZXcub24oYXBwLndlYml4LCBcIm9uQmVmb3JlQWpheFwiLCAoX21vZGUsIF91cmwsIF9kYXRhLCBfcmVxdWVzdCwgX2hlYWRlcnMsIF9maWxlcywgcHJvbWlzZSkgPT4ge1xyXG4gICAgICAgICAgICBzdGFydChwcm9taXNlKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuICAgIGlmIChjb25maWcuZGF0YSkge1xyXG4gICAgICAgIHRyYWNrKGNvbmZpZy5kYXRhKTtcclxuICAgIH1cclxufVxuXG5mdW5jdGlvbiBUaGVtZShhcHAsIF92aWV3LCBjb25maWcpIHtcclxuICAgIGNvbmZpZyA9IGNvbmZpZyB8fCB7fTtcclxuICAgIGNvbnN0IHN0b3JhZ2UgPSBjb25maWcuc3RvcmFnZTtcclxuICAgIGxldCB0aGVtZSA9IHN0b3JhZ2UgP1xyXG4gICAgICAgIChzdG9yYWdlLmdldChcInRoZW1lXCIpIHx8IFwiZmxhdC1kZWZhdWx0XCIpXHJcbiAgICAgICAgOlxyXG4gICAgICAgICAgICAoY29uZmlnLnRoZW1lIHx8IFwiZmxhdC1kZWZhdWx0XCIpO1xyXG4gICAgY29uc3Qgc2VydmljZSA9IHtcclxuICAgICAgICBnZXRUaGVtZSgpIHsgcmV0dXJuIHRoZW1lOyB9LFxyXG4gICAgICAgIHNldFRoZW1lKG5hbWUsIHNpbGVudCkge1xyXG4gICAgICAgICAgICBjb25zdCBwYXJ0cyA9IG5hbWUuc3BsaXQoXCItXCIpO1xyXG4gICAgICAgICAgICBjb25zdCBsaW5rcyA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKFwibGlua1wiKTtcclxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsaW5rcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgbG5hbWUgPSBsaW5rc1tpXS5nZXRBdHRyaWJ1dGUoXCJ0aXRsZVwiKTtcclxuICAgICAgICAgICAgICAgIGlmIChsbmFtZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChsbmFtZSA9PT0gbmFtZSB8fCBsbmFtZSA9PT0gcGFydHNbMF0pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGlua3NbaV0uZGlzYWJsZWQgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxpbmtzW2ldLmRpc2FibGVkID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgYXBwLndlYml4LnNraW4uc2V0KHBhcnRzWzBdKTtcclxuICAgICAgICAgICAgLy8gcmVtb3ZlIG9sZCBjc3NcclxuICAgICAgICAgICAgYXBwLndlYml4Lmh0bWwucmVtb3ZlQ3NzKGRvY3VtZW50LmJvZHksIFwidGhlbWUtXCIgKyB0aGVtZSk7XHJcbiAgICAgICAgICAgIC8vIGFkZCBuZXcgY3NzXHJcbiAgICAgICAgICAgIGFwcC53ZWJpeC5odG1sLmFkZENzcyhkb2N1bWVudC5ib2R5LCBcInRoZW1lLVwiICsgbmFtZSk7XHJcbiAgICAgICAgICAgIHRoZW1lID0gbmFtZTtcclxuICAgICAgICAgICAgaWYgKHN0b3JhZ2UpIHtcclxuICAgICAgICAgICAgICAgIHN0b3JhZ2UucHV0KFwidGhlbWVcIiwgbmFtZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKCFzaWxlbnQpIHtcclxuICAgICAgICAgICAgICAgIGFwcC5yZWZyZXNoKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9O1xyXG4gICAgYXBwLnNldFNlcnZpY2UoXCJ0aGVtZVwiLCBzZXJ2aWNlKTtcclxuICAgIHNlcnZpY2Uuc2V0VGhlbWUodGhlbWUsIHRydWUpO1xyXG59XG5cbmZ1bmN0aW9uIGNvcHlQYXJhbXMoZGF0YSwgdXJsLCByb3V0ZSkge1xyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCByb3V0ZS5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgIGRhdGFbcm91dGVbaV1dID0gdXJsW2kgKyAxXSA/IHVybFtpICsgMV0ucGFnZSA6IFwiXCI7XHJcbiAgICB9XHJcbn1cclxuZnVuY3Rpb24gVXJsUGFyYW0oYXBwLCB2aWV3LCBjb25maWcpIHtcclxuICAgIGNvbnN0IHJvdXRlID0gY29uZmlnLnJvdXRlIHx8IGNvbmZpZztcclxuICAgIGNvbnN0IGRhdGEgPSB7fTtcclxuICAgIHZpZXcub24oYXBwLCBcImFwcDp1cmxjaGFuZ2VcIiwgZnVuY3Rpb24gKHN1YnZpZXcsIHNlZ21lbnQpIHtcclxuICAgICAgICBpZiAodmlldyA9PT0gc3Vidmlldykge1xyXG4gICAgICAgICAgICBjb3B5UGFyYW1zKGRhdGEsIHNlZ21lbnQuc3VidXJsKCksIHJvdXRlKTtcclxuICAgICAgICAgICAgc2VnbWVudC5zaXplKHJvdXRlLmxlbmd0aCArIDEpO1xyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG4gICAgY29uc3Qgb3MgPSB2aWV3LnNldFBhcmFtO1xyXG4gICAgY29uc3Qgb2cgPSB2aWV3LmdldFBhcmFtO1xyXG4gICAgdmlldy5zZXRQYXJhbSA9IGZ1bmN0aW9uIChuYW1lLCB2YWx1ZSwgc2hvdykge1xyXG4gICAgICAgIGNvbnN0IGluZGV4ID0gcm91dGUuaW5kZXhPZihuYW1lKTtcclxuICAgICAgICBpZiAoaW5kZXggPj0gMCkge1xyXG4gICAgICAgICAgICBkYXRhW25hbWVdID0gdmFsdWU7XHJcbiAgICAgICAgICAgIHRoaXMuX3NlZ21lbnQudXBkYXRlKFwiXCIsIHZhbHVlLCBpbmRleCArIDEpO1xyXG4gICAgICAgICAgICBpZiAoc2hvdykge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHZpZXcuc2hvdyhudWxsKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgcmV0dXJuIG9zLmNhbGwodGhpcywgbmFtZSwgdmFsdWUsIHNob3cpO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcbiAgICB2aWV3LmdldFBhcmFtID0gZnVuY3Rpb24gKGtleSwgbW9kZSkge1xyXG4gICAgICAgIGNvbnN0IHZhbCA9IGRhdGFba2V5XTtcclxuICAgICAgICBpZiAodHlwZW9mIHZhbCAhPT0gXCJ1bmRlZmluZWRcIikge1xyXG4gICAgICAgICAgICByZXR1cm4gdmFsO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gb2cuY2FsbCh0aGlzLCBrZXksIG1vZGUpO1xyXG4gICAgfTtcclxuICAgIGNvcHlQYXJhbXMoZGF0YSwgdmlldy5nZXRVcmwoKSwgcm91dGUpO1xyXG59XG5cbmZ1bmN0aW9uIFVzZXIoYXBwLCBfdmlldywgY29uZmlnKSB7XHJcbiAgICBjb25maWcgPSBjb25maWcgfHwge307XHJcbiAgICBjb25zdCBsb2dpbiA9IGNvbmZpZy5sb2dpbiB8fCBcIi9sb2dpblwiO1xyXG4gICAgY29uc3QgbG9nb3V0ID0gY29uZmlnLmxvZ291dCB8fCBcIi9sb2dvdXRcIjtcclxuICAgIGNvbnN0IGFmdGVyTG9naW4gPSBjb25maWcuYWZ0ZXJMb2dpbiB8fCBhcHAuY29uZmlnLnN0YXJ0O1xyXG4gICAgY29uc3QgYWZ0ZXJMb2dvdXQgPSBjb25maWcuYWZ0ZXJMb2dvdXQgfHwgXCIvbG9naW5cIjtcclxuICAgIGNvbnN0IHBpbmcgPSBjb25maWcucGluZyB8fCA1ICogNjAgKiAxMDAwO1xyXG4gICAgY29uc3QgbW9kZWwgPSBjb25maWcubW9kZWw7XHJcbiAgICBsZXQgdXNlciA9IGNvbmZpZy51c2VyO1xyXG4gICAgY29uc3Qgc2VydmljZSA9IHtcclxuICAgICAgICBnZXRVc2VyKCkge1xyXG4gICAgICAgICAgICByZXR1cm4gdXNlcjtcclxuICAgICAgICB9LFxyXG4gICAgICAgIGdldFN0YXR1cyhzZXJ2ZXIpIHtcclxuICAgICAgICAgICAgaWYgKCFzZXJ2ZXIpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiB1c2VyICE9PSBudWxsO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiBtb2RlbC5zdGF0dXMoKS5jYXRjaCgoKSA9PiBudWxsKS50aGVuKGRhdGEgPT4ge1xyXG4gICAgICAgICAgICAgICAgdXNlciA9IGRhdGE7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgbG9naW4obmFtZSwgcGFzcykge1xyXG4gICAgICAgICAgICByZXR1cm4gbW9kZWwubG9naW4obmFtZSwgcGFzcykudGhlbihkYXRhID0+IHtcclxuICAgICAgICAgICAgICAgIHVzZXIgPSBkYXRhO1xyXG4gICAgICAgICAgICAgICAgaWYgKCFkYXRhKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiQWNjZXNzIGRlbmllZFwiKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGFwcC5jYWxsRXZlbnQoXCJhcHA6dXNlcjpsb2dpblwiLCBbdXNlcl0pO1xyXG4gICAgICAgICAgICAgICAgYXBwLnNob3coYWZ0ZXJMb2dpbik7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgbG9nb3V0KCkge1xyXG4gICAgICAgICAgICB1c2VyID0gbnVsbDtcclxuICAgICAgICAgICAgcmV0dXJuIG1vZGVsLmxvZ291dCgpLnRoZW4ocmVzID0+IHtcclxuICAgICAgICAgICAgICAgIGFwcC5jYWxsRXZlbnQoXCJhcHA6dXNlcjpsb2dvdXRcIiwgW10pO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlcztcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuICAgIGZ1bmN0aW9uIGNhbk5hdmlnYXRlKHVybCwgb2JqKSB7XHJcbiAgICAgICAgaWYgKHVybCA9PT0gbG9nb3V0KSB7XHJcbiAgICAgICAgICAgIHNlcnZpY2UubG9nb3V0KCk7XHJcbiAgICAgICAgICAgIG9iai5yZWRpcmVjdCA9IGFmdGVyTG9nb3V0O1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmICh1cmwgIT09IGxvZ2luICYmICFzZXJ2aWNlLmdldFN0YXR1cygpKSB7XHJcbiAgICAgICAgICAgIG9iai5yZWRpcmVjdCA9IGxvZ2luO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGFwcC5zZXRTZXJ2aWNlKFwidXNlclwiLCBzZXJ2aWNlKTtcclxuICAgIGFwcC5hdHRhY2hFdmVudChgYXBwOmd1YXJkYCwgZnVuY3Rpb24gKHVybCwgXyRyb290LCBvYmopIHtcclxuICAgICAgICBpZiAoY29uZmlnLnB1YmxpYyAmJiBjb25maWcucHVibGljKHVybCkpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0eXBlb2YgdXNlciA9PT0gXCJ1bmRlZmluZWRcIikge1xyXG4gICAgICAgICAgICBvYmouY29uZmlybSA9IHNlcnZpY2UuZ2V0U3RhdHVzKHRydWUpLnRoZW4oKCkgPT4gY2FuTmF2aWdhdGUodXJsLCBvYmopKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGNhbk5hdmlnYXRlKHVybCwgb2JqKTtcclxuICAgIH0pO1xyXG4gICAgaWYgKHBpbmcpIHtcclxuICAgICAgICBzZXRJbnRlcnZhbCgoKSA9PiBzZXJ2aWNlLmdldFN0YXR1cyh0cnVlKSwgcGluZyk7XHJcbiAgICB9XHJcbn1cblxuLypcclxuTUlUIExpY2Vuc2VcclxuQ29weXJpZ2h0IChjKSAyMDE5IFhCIFNvZnR3YXJlXHJcbiovXHJcbmxldCB3ZWJpeCA9IHdpbmRvdy53ZWJpeDtcclxuaWYgKHdlYml4KSB7XHJcbiAgICBwYXRjaCh3ZWJpeCk7XHJcbn1cclxuY29uc3QgcGx1Z2lucyA9IHtcclxuICAgIFVubG9hZEd1YXJkLCBMb2NhbGUsIE1lbnUsIFRoZW1lLCBVc2VyLCBTdGF0dXMsIFVybFBhcmFtXHJcbn07XHJcbmNvbnN0IGVycm9ycyA9IHsgTmF2aWdhdGlvbkJsb2NrZWQgfTtcclxuY29uc3QgdyA9IHdpbmRvdztcclxuaWYgKCF3LlByb21pc2UpIHtcclxuICAgIHcuUHJvbWlzZSA9IHcud2ViaXgucHJvbWlzZTtcclxufVxuXG5leHBvcnQgeyBwbHVnaW5zLCBlcnJvcnMsIEpldEFwcCwgSmV0VmlldywgSGFzaFJvdXRlciwgU3RvcmVSb3V0ZXIsIFVybFJvdXRlciwgRW1wdHlSb3V0ZXIsIFN1YlJvdXRlciB9O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9amV0LmpzLm1hcFxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vbm9kZV9tb2R1bGVzL3dlYml4LWpldC9kaXN0L2VzNi9qZXQuanMiLCJpbXBvcnQgeyBKZXRWaWV3IH0gZnJvbSBcIndlYml4LWpldFwiO1xuaW1wb3J0IHsgcGFja2FnZXMgfSBmcm9tIFwiLi4vLi4vc2VydmljZXMvcGFja2FnZXNcIjtcblxuY29uc3QgU1RBVFVTX0lOU1RBTExFRCA9IDM7XG5cbmV4cG9ydCBjbGFzcyBFeHRlcm5hbFZpZXcgZXh0ZW5kcyBKZXRWaWV3IHtcbiAgICBjb25zdHJ1Y3RvcihhcHAsIG5hbWUsIHRhcmdldFVybCwgcmVxdWlyZWRQYWNrYWdlcykge1xuICAgICAgICBzdXBlcihhcHAsIG5hbWUpO1xuXG4gICAgICAgIHRoaXMudGFyZ2V0VXJsID0gdGFyZ2V0VXJsIHx8IFwiL1wiO1xuICAgICAgICB0aGlzLnJlcXVpcmVkUGFja2FnZXMgPSByZXF1aXJlZFBhY2thZ2VzIHx8IHt9OyAvLyByZXF1aXJlZCBwYWNrYWdlcyBhcyBuYW1lOiBnaXRfdXJsIHBhaXJzXG4gICAgfVxuXG4gICAgY29uZmlnKCkge1xuICAgICAgICBjb25zdCBzZWxmID0gdGhpcztcbiAgICAgICAgY29uc3QgaWZyYW1lID0ge1xuICAgICAgICAgICAgdmlldzogXCJpZnJhbWVcIixcbiAgICAgICAgICAgIGxvY2FsSWQ6IFwiaWZyYW1lLWV4dGVybmFsXCIsXG4gICAgICAgICAgICBvbjoge1xuICAgICAgICAgICAgICAgIG9uQWZ0ZXJMb2FkOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmhpZGVQcm9ncmVzcykge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5oaWRlUHJvZ3Jlc3MoKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB0aGlzLmVuYWJsZSgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcblxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgcm93czogW3tcbiAgICAgICAgICAgICAgICBsb2NhbElkOiBcImluc3RhbGwtcGFja2FnZXNcIixcbiAgICAgICAgICAgICAgICBoaWRkZW46IHRydWUsXG4gICAgICAgICAgICAgICAgY29sczogW1xuICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICBsb2NhbElkOiBcInJlcXVpcmVkX3BhY2thZ2VzX2RpdlwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgdmlldzogXCJ0ZW1wbGF0ZVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgYXV0b2hlaWdodDogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmlldzogXCJidXR0b25cIixcbiAgICAgICAgICAgICAgICAgICAgICAgIGxvY2FsSWQ6IFwiaW5zdGFsbF9idG5cIixcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlOiBcIkluc3RhbGwgcmVxdWlyZWQgcGFja2FnZXNcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIGNzczogXCJ3ZWJpeF9wcmltYXJ5XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBoZWlnaHQ6IDUwLFxuICAgICAgICAgICAgICAgICAgICAgICAgY2xpY2s6IHNlbGYuaW5zdGFsbFJlcXVpcmVkUGFja2FnZXMuYmluZChzZWxmKVxuICAgICAgICAgICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgICAgICAgICB2aWV3OiBcImJ1dHRvblwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgbG9jYWxJZDogXCJnb190b19wYWNrYWdlc19idG5cIixcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlOiBcIkdvIHRvIHBhY2thZ2VzIGFuZCBpbnN0YWxsIHRoZW0gbWFudWFsbHlcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIGNzczogXCJ3ZWJpeF9wcmltYXJ5XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBoZWlnaHQ6IDUwLFxuICAgICAgICAgICAgICAgICAgICAgICAgY2xpY2s6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLiRzY29wZS5zaG93KFwiL21haW4vcGFja2FnZXNcIik7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICB9LCBpZnJhbWVdXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBpbnN0YWxsUmVxdWlyZWRQYWNrYWdlcygpIHtcbiAgICAgICAgbGV0IHByb21pc2VzID0gT2JqZWN0LnZhbHVlcyh0aGlzLnBhY2thZ2VzVG9JbnN0YWxsKS5tYXAoKHBhdGgpID0+IHtcbiAgICAgICAgICAgIC8vIGFkZCBieSBnaXQgdXJsXG4gICAgICAgICAgICByZXR1cm4gcGFja2FnZXMuYWRkKG51bGwsIHBhdGgpO1xuICAgICAgICB9KTtcblxuICAgICAgICB0aGlzLmluc3RhbGxCdXR0b24uZGlzYWJsZSgpO1xuICAgICAgICBQcm9taXNlLmFsbChwcm9taXNlcykudGhlbigoKSA9PiB7XG4gICAgICAgICAgICB3ZWJpeC5tZXNzYWdlKHsgdHlwZTogXCJzdWNjZXNzXCIsIHRleHQ6IFwiQWxsIHJlcXVpcmVkIHBhY2thZ2VzIGluc3RhbGxlZCBzdWNjZXNzZnVsbHksIHBhZ2Ugd2lsbCBiZSByZWxvYWRlZCBpbiAyIHNlY29uZHNcIiB9KTtcbiAgICAgICAgICAgIHNldEludGVydmFsKCgpID0+IHdpbmRvdy5sb2NhdGlvbi5yZWxvYWQodHJ1ZSksIDIwMDApO1xuICAgICAgICB9KS5jYXRjaCgoKSA9PiB7XG4gICAgICAgICAgICB3ZWJpeC5tZXNzYWdlKHsgdHlwZTogXCJlcnJvclwiLCB0ZXh0OiBcIkFuIGVycm9yIG9jY3VycmVkLCBwbGVhc2UgdHJ5IGluc3RhbGxpbmcgZnJvbSBwYWNrYWdlcyBmb3IgbW9yZSBkZXRhaWxzXCIgfSk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHNob3dJZnJhbWUoKSB7XG4gICAgICAgIHRoaXMuZXh0ZXJuYWxJZnJhbWUuc2hvdygpO1xuICAgICAgICB0aGlzLmV4dGVybmFsSWZyYW1lLnNob3dQcm9ncmVzcyh7IHR5cGU6IFwiaWNvblwiIH0pO1xuICAgICAgICB0aGlzLmV4dGVybmFsSWZyYW1lLmxvYWQodGhpcy50YXJnZXRVcmwpO1xuICAgIH1cblxuICAgIGluaXQodmlldykge1xuICAgICAgICB0aGlzLmV4dGVybmFsSWZyYW1lID0gdGhpcy4kJChcImlmcmFtZS1leHRlcm5hbFwiKTtcbiAgICAgICAgdGhpcy5leHRlcm5hbElmcmFtZS5kaXNhYmxlKCk7XG4gICAgICAgIHdlYml4LmV4dGVuZCh0aGlzLmV4dGVybmFsSWZyYW1lLCB3ZWJpeC5Qcm9ncmVzc0Jhcik7XG5cbiAgICAgICAgdGhpcy5wYWNrYWdlTmFtZXMgPSBPYmplY3Qua2V5cyh0aGlzLnJlcXVpcmVkUGFja2FnZXMpOyAvLyBvbmx5IG5hbWVzXG5cbiAgICAgICAgaWYgKCF0aGlzLnBhY2thZ2VOYW1lcy5sZW5ndGgpIHtcbiAgICAgICAgICAgIHRoaXMuc2hvd0lmcmFtZSgpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5yZXF1aXJlZFBhY2thZ2VzRGl2ID0gdGhpcy4kJChcInJlcXVpcmVkX3BhY2thZ2VzX2RpdlwiKTtcbiAgICAgICAgdGhpcy5pbnN0YWxsUGFja2FnZUNvbnRhaW5lciA9IHRoaXMuJCQoXCJpbnN0YWxsLXBhY2thZ2VzXCIpO1xuICAgICAgICB0aGlzLmluc3RhbGxCdXR0b24gPSB0aGlzLiQkKFwiaW5zdGFsbF9idG5cIik7XG5cbiAgICAgICAgLy8gY2hlY2sgd2hpY2ggcGFja2FnZXMgdG8gaW5zdGFsbFxuICAgICAgICB0aGlzLnBhY2thZ2VzVG9JbnN0YWxsID0ge307XG4gICAgICAgIC8vIHRyeSB0byBnZXQgaW5mbyBhYm91dCByZXF1aXJlZCBwYWNrYWdlc1xuICAgICAgICAvLyBpZiBhbnkgaXMgYWxyZWFkeSByZWdpc3RlcmVkIGFuZCBpbnN0YWxsZWQsIHRoZW4ganVzdCBpZ25vcmUgaXRcbiAgICAgICAgcGFja2FnZXMuZ2V0U3RhdHVzKHRoaXMucGFja2FnZU5hbWVzKS50aGVuKGRhdGEgPT4ge1xuICAgICAgICAgICAgY29uc3QgcGFja2FnZVN0YXRlcyA9IGRhdGEuanNvbigpO1xuXG4gICAgICAgICAgICAvLyBub3cgZ28gb3ZlciByZXF1aXJlZCBwYWNrYWdlc1xuICAgICAgICAgICAgZm9yIChsZXQgbmFtZSBvZiB0aGlzLnBhY2thZ2VOYW1lcykge1xuICAgICAgICAgICAgICAgIC8vIGNoZWNrIGlmIGEgcmVxdWlyZWQgcGFja2FnZSBpcyByZWdpc3RlcmVkIGFuZCBpbnN0YWxsZWRcbiAgICAgICAgICAgICAgICBpZiAocGFja2FnZVN0YXRlc1tuYW1lXSA9PSBTVEFUVVNfSU5TVEFMTEVEKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHRoaXMucGFja2FnZXNUb0luc3RhbGxbbmFtZV0gPSB0aGlzLnJlcXVpcmVkUGFja2FnZXNbbmFtZV07XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIGNoZWNrIHBhY2thZ2VzIHRvIGJlIGluc3RhbGxlZCBhZ2FpbiBpZiBzdGlsbCBuZWVkIHRvIGluc3RhbGwgYW55IG9mIHRoZW1cbiAgICAgICAgICAgIGNvbnN0IHBhY2thZ2VOYW1lc1RvSW5zdGFsbCA9IE9iamVjdC5rZXlzKHRoaXMucGFja2FnZXNUb0luc3RhbGwpO1xuICAgICAgICAgICAgaWYgKHBhY2thZ2VOYW1lc1RvSW5zdGFsbC5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmluc3RhbGxQYWNrYWdlQ29udGFpbmVyLnNob3coKTtcbiAgICAgICAgICAgICAgICB0aGlzLmV4dGVybmFsSWZyYW1lLmhpZGUoKTtcblxuICAgICAgICAgICAgICAgIGNvbnN0IG5hbWVzID0gcGFja2FnZU5hbWVzVG9JbnN0YWxsLmpvaW4oXCIsIFwiKTtcbiAgICAgICAgICAgICAgICB0aGlzLnJlcXVpcmVkUGFja2FnZXNEaXYuc2V0SFRNTChcbiAgICAgICAgICAgICAgICAgICAgYDxkaXYgc3R5bGU9J3dpZHRoOmF1dG87dGV4dC1hbGlnbjpjZW50ZXInPjxoMz5Zb3UgbmVlZCB0byBpbnN0YWxsIHRoZSBmb2xsb3dpbmcgcmVxdWlyZWQgcGFja2FnZXM6ICR7bmFtZXN9PGgzLz48L2Rpdj5gXG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5pbnN0YWxsUGFja2FnZUNvbnRhaW5lci5oaWRlKCk7XG4gICAgICAgICAgICAgICAgdGhpcy5zaG93SWZyYW1lKClcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuXG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zb3VyY2VzL3ZpZXdzL2V4dGVybmFsL2luZGV4LmpzIiwiY29uc3QgYWpheCA9IHdlYml4LmFqYXgoKS5oZWFkZXJzKHsgXCJDb250ZW50LVR5cGVcIjogXCJhcHBsaWNhdGlvbi9qc29uXCIgfSk7XG5cbmV4cG9ydCBjbGFzcyBTZXJ2aWNlIHtcbiAgICBjb25zdHJ1Y3RvcihiYXNlVXJsKSB7XG4gICAgICAgIHRoaXMuYmFzZVVybCA9IGJhc2VVcmw7XG4gICAgfVxuXG4gICAgam9pblVybCh1cmwpIHtcbiAgICAgICAgaWYgKHRoaXMuYmFzZVVybCkge1xuICAgICAgICAgICAgcmV0dXJuIGAke3RoaXMuYmFzZVVybH0vJHt1cmx9YDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdXJsO1xuICAgIH1cblxuICAgIGNhbGwobWV0aG9kLCB1cmwsIGFyZ3MpIHtcbiAgICAgICAgbWV0aG9kID0gbWV0aG9kLnRvTG93ZXJDYXNlKCk7XG4gICAgICAgIHVybCA9IHRoaXMuam9pblVybCh1cmwpO1xuXG4gICAgICAgIGlmIChhcmdzKSB7XG4gICAgICAgICAgICBhcmdzID0geyBhcmdzOiBhcmdzIH07XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBhcmdzID0ge307XG4gICAgICAgIH1cblxuICAgICAgICBpZiAobWV0aG9kID09PSBcImdldFwiKSB7XG4gICAgICAgICAgICByZXR1cm4gYWpheC5nZXQodXJsLCBhcmdzKTtcbiAgICAgICAgfSBlbHNlIGlmIChtZXRob2QgPT0gXCJwb3N0XCIpIHtcbiAgICAgICAgICAgIHJldHVybiBhamF4LnBvc3QodXJsLCBhcmdzKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRocm93IFZhbHVlRXJyb3IoYCR7bWV0aG9kfSBpcyBub3Qgc3VwcG9ydGVkYCk7XG4gICAgfVxuXG4gICAgZ2V0Q2FsbCh1cmwsIGFyZ3MpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuY2FsbChcImdldFwiLCB1cmwsIGFyZ3MpO1xuICAgIH1cblxuICAgIHBvc3RDYWxsKHVybCwgYXJncykge1xuICAgICAgICByZXR1cm4gdGhpcy5jYWxsKFwicG9zdFwiLCB1cmwsIGFyZ3MpO1xuICAgIH1cbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NvdXJjZXMvY29tbW9uL2FwaS5qcyIsImltcG9ydCB7IEpldFZpZXcgfSBmcm9tIFwid2ViaXgtamV0XCI7XG5cbmltcG9ydCB7IGFuc2lVcCB9IGZyb20gXCIuLi8uLi9jb21tb24vY29sb3JzXCI7XG5cbmV4cG9ydCBjbGFzcyBFcnJvclZpZXcgZXh0ZW5kcyBKZXRWaWV3IHtcbiAgICBjb25maWcoKSB7XG4gICAgICAgIGNvbnN0IG1lc3NhZ2UgPSB7XG4gICAgICAgICAgICB2aWV3OiBcInRlbXBsYXRlXCIsXG4gICAgICAgICAgICBpZDogXCJlcnJvcl90ZW1wbGF0ZVwiLFxuICAgICAgICAgICAgdGVtcGxhdGU6IFwiXCIsXG4gICAgICAgICAgICBzY3JvbGw6IFwieHlcIlxuICAgICAgICB9O1xuXG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICB2aWV3OiBcIndpbmRvd1wiLFxuICAgICAgICAgICAgaGVhZDogXCJFcnJvclwiLFxuICAgICAgICAgICAgbW9kYWw6IHRydWUsXG4gICAgICAgICAgICB3aWR0aDogd2luZG93LmlubmVyV2lkdGggKiAuOCxcbiAgICAgICAgICAgIGhlaWdodDogd2luZG93LmlubmVySGVpZ2h0ICogLjgsXG4gICAgICAgICAgICBwb3NpdGlvbjogXCJjZW50ZXJcIixcbiAgICAgICAgICAgIGJvZHk6IHtcbiAgICAgICAgICAgICAgICByb3dzOiBbXG4gICAgICAgICAgICAgICAgICAgIG1lc3NhZ2UsXG4gICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZpZXc6IFwiYnV0dG9uXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZTogXCJPS1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgY3NzOiBcIndlYml4X3ByaW1hcnlcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIGNsaWNrOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5nZXRUb3BQYXJlbnRWaWV3KCkuaGlkZSgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgaW5pdCgpIHtcbiAgICAgICAgdGhpcy5tZXNzYWdlID0gJCQoXCJlcnJvcl90ZW1wbGF0ZVwiKTtcbiAgICB9XG5cbiAgICBzaG93RXJyb3IobWVzc2FnZSwgaGVhZCkge1xuICAgICAgICB0aGlzLm1lc3NhZ2Uuc2V0SFRNTChgPHA+JHthbnNpVXAuYW5zaV90b19odG1sKG1lc3NhZ2UpfTwvcD5gKTtcbiAgICAgICAgaWYgKGhlYWQpIHtcbiAgICAgICAgICAgIHRoaXMubWVzc2FnZS5nZXRIZWFkKCkuc2V0SFRNTChoZWFkKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuZ2V0Um9vdCgpLnNob3coKTtcbiAgICB9XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zb3VyY2VzL3ZpZXdzL2Vycm9ycy9kaWFsb2cuanMiLCJleHBvcnQgY29uc3QgZGF0ZUZvcm1hdCA9IFwiJVktJW0tJWQgJUc6JWk6JXNcIjtcblxuZXhwb3J0IGNvbnN0IHdlYml4RGF0ZUZvcm1hdHRlciA9IHdlYml4LkRhdGUuZGF0ZVRvU3RyKGRhdGVGb3JtYXQpO1xuXG5leHBvcnQgY29uc3QgZGF0ZUZvcm1hdHRlciA9IGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgIC8vIGZvcm1hdCBlcG9jaCB0aW1lc3RhbXBzXG4gICAgaWYgKHZhbHVlIGluc3RhbmNlb2YgU3RyaW5nKSB7XG4gICAgICAgIHZhbHVlID0gcGFyc2VJbnQodmFsdWUpO1xuICAgIH1cblxuICAgIHJldHVybiB3ZWJpeERhdGVGb3JtYXR0ZXIobmV3IERhdGUodmFsdWUgKiAxMDAwKSk7XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zb3VyY2VzL2NvbW1vbi9mb3JtYXR0ZXJzLmpzIiwiaW1wb3J0IHsgU2VydmljZSB9IGZyb20gXCIuLi9jb21tb24vYXBpXCI7XG5cbmNvbnN0IEJBU0VfVVJMID0gXCIvemVyb2JvdC9hZG1pbi9hY3RvcnMvaGVhbHRoXCI7XG5cbmNsYXNzIEhlYWx0aFNlcnZpY2UgZXh0ZW5kcyBTZXJ2aWNlIHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgc3VwZXIoQkFTRV9VUkwpO1xuICAgIH1cblxuICAgIGdldERpc2tTcGFjZSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0Q2FsbChcImdldF9kaXNrX3NwYWNlXCIpO1xuICAgIH1cblxuICAgIGdldEhlYWx0aCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0Q2FsbChcImhlYWx0aFwiKTtcbiAgICB9XG5cbiAgICBnZXRJZGVudGl0eSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0Q2FsbChcImdldF9pZGVudGl0eVwiKTtcbiAgICB9XG5cbiAgICBnZXROZXR3b3JrSW5mbygpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0Q2FsbChcIm5ldHdvcmtfaW5mb1wiKTtcbiAgICB9XG5cbiAgICBnZXRKc3hWZXJzaW9uKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5nZXRDYWxsKFwianN4X3ZlcnNpb25cIik7XG4gICAgfVxuXG4gICAgZ2V0UnVubmluZ1Byb2Nlc3NlcygpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0Q2FsbChcImdldF9ydW5uaW5nX3Byb2Nlc3Nlc1wiKTtcbiAgICB9XG5cbiAgICBnZXRSdW5uaW5nUG9ydHMoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmdldENhbGwoXCJnZXRfcnVubmluZ19wb3J0c1wiKTtcbiAgICB9XG5cbiAgICBraWxsUHJvY2Vzc2VzQnlQaWQocGlkcykge1xuICAgICAgICByZXR1cm4gdGhpcy5wb3N0Q2FsbCgna2lsbF9wcm9jZXNzZXNfYnlfcGlkJywge3BpZHN9KVxuICAgIH1cblxuICAgIGtpbGxQcm9jZXNzZXNCeVBvcnQocG9ydHMpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucG9zdENhbGwoJ2tpbGxfcHJvY2Vzc2VzX2J5X3BvcnQnLCB7cG9ydHN9KVxuICAgIH1cblxuICAgIGdldFByb2Nlc3NEZXRhaWxzKHBpZCkge1xuICAgICAgICByZXR1cm4gdGhpcy5wb3N0Q2FsbCgnZ2V0X3Byb2Nlc3NfZGV0YWlscycsIHtwaWR9KVxuICAgIH1cbn1cblxuZXhwb3J0IGNvbnN0IGhlYWx0aCA9IG5ldyBIZWFsdGhTZXJ2aWNlKCk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zb3VyY2VzL3NlcnZpY2VzL2hlYWx0aC5qcyIsImltcG9ydCBBbnNpVXAgZnJvbSBcImFuc2lfdXBcIjtcblxuZXhwb3J0IGNvbnN0IGFuc2lVcCA9IG5ldyBBbnNpVXAoKTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NvdXJjZXMvY29tbW9uL2NvbG9ycy5qcyIsIlxuZXhwb3J0IGNvbnN0IE1BWF9NU0dfTEVOID0gMTAwO1xuZXhwb3J0IGNvbnN0IExFVkVMUyA9IHtcbiAgICA1MDogXCJDUklUSUNBTFwiLFxuICAgIDQwOiBcIkVSUk9SXCIsXG4gICAgMzA6IFwiV0FSTklOR1wiLFxuICAgIDIwOiBcIklORk9cIixcbiAgICAxNTogXCJTVERPVVRcIixcbiAgICAxMDogXCJERUJVR1wiXG59O1xuXG5leHBvcnQgY29uc3QgU1RBVEVTID0gW1xuICAgICdDTE9TRUQnLFxuICAgICdORVcnLFxuICAgICdPUEVOJyxcbiAgICAnUkVPUEVOJ1xuXVxuXG5leHBvcnQgY29uc3QgVFlQRVMgPSBbXG4gICAgJ0JVRycsXG4gICAgJ1FVRVNUSU9OJyxcbiAgICAnRVZFTlRfU1lTVEVNJyxcbiAgICAnRVZFTlRfTU9OSVRPUicsXG4gICAgJ0VWRU5UX09QRVJBVE9SJyxcbl1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NvdXJjZXMvdmlld3MvYWxlcnRzL2RhdGEuanMiLCJpbXBvcnQgeyBKZXRWaWV3IH0gZnJvbSBcIndlYml4LWpldFwiO1xuXG5pbXBvcnQgeyBhbnNpVXAgfSBmcm9tIFwiLi4vLi4vY29tbW9uL2NvbG9yc1wiO1xuaW1wb3J0IHsgTEVWRUxTLCBNQVhfTVNHX0xFTiwgU1RBVEVTLCBUWVBFUyB9IGZyb20gXCIuL2RhdGFcIjtcbmltcG9ydCB7IGRhdGVGb3JtYXR0ZXIgfSBmcm9tIFwiLi4vLi4vY29tbW9uL2Zvcm1hdHRlcnNcIjtcbmltcG9ydCB7IGFsZXJ0cyB9IGZyb20gXCIuLi8uLi9zZXJ2aWNlcy9hbGVydHNcIjtcblxuaW1wb3J0IEFsZXJ0VmlldyBmcm9tIFwiLi9hbGVydFwiO1xuaW1wb3J0IHsgY3JlYXRlRmlsdGVyT3B0aW9ucyB9IGZyb20gXCIuLi8uLi9jb21tb24vZmlsdGVyc1wiO1xuXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEFsZXJ0c1ZpZXcgZXh0ZW5kcyBKZXRWaWV3IHtcbiAgICBjb25maWcoKSB7XG4gICAgICAgIGNvbnN0IHZpZXcgPSB7XG4gICAgICAgICAgICByb3dzOiBbXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICB2aWV3OiBcImRhdGF0YWJsZVwiLFxuICAgICAgICAgICAgICAgICAgICBpZDogXCJhbGVydHNfdGFibGVcIixcbiAgICAgICAgICAgICAgICAgICAgcmVzaXplQ29sdW1uOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICBzZWxlY3Q6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgIG11bHRpc2VsZWN0OiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICBzY3JvbGw6IFwieHlcIixcbiAgICAgICAgICAgICAgICAgICAgY3NzOiBcIndlYml4X2hlYWRlcl9ib3JkZXIgd2ViaXhfZGF0YV9ib3JkZXJcIixcbiAgICAgICAgICAgICAgICAgICAgY29sdW1uczogW3tcbiAgICAgICAgICAgICAgICAgICAgICAgIGlkOiBcImluZGV4XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBoZWFkZXI6IFwiI1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgc29ydDogXCJpbnRcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIGF1dG93aWR0aDogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWQ6IFwiYWxlcnRfdHlwZVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgc29ydDogXCJpbnRcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvcm1hdDogKHZhbHVlKSA9PiBUWVBFU1t2YWx1ZV0sXG4gICAgICAgICAgICAgICAgICAgICAgICB3aWR0aDogMTUwLFxuICAgICAgICAgICAgICAgICAgICAgICAgaGVhZGVyOiBbXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJUeXBlXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb250ZW50OiBcInNlbGVjdEZpbHRlclwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvcHRpb25zOiBjcmVhdGVGaWx0ZXJPcHRpb25zKFRZUEVTKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlkOiBcImNvdW50XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBoZWFkZXI6IFwiQ291bnRcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIHNvcnQ6IFwiaW50XCJcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWQ6IFwic3RhdHVzXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBzb3J0OiBcImludFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgZm9ybWF0OiAodmFsdWUpID0+IFNUQVRFU1t2YWx1ZV0sXG4gICAgICAgICAgICAgICAgICAgICAgICBoZWFkZXI6IFtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIlN0YXR1c1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29udGVudDogXCJzZWxlY3RGaWx0ZXJcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb3B0aW9uczogY3JlYXRlRmlsdGVyT3B0aW9ucyhTVEFURVMpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWQ6IFwibGV2ZWxcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIHNvcnQ6IFwiaW50XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBmb3JtYXQ6ICh2YWx1ZSkgPT4gTEVWRUxTW3ZhbHVlXSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGhlYWRlcjogW1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiTGV2ZWxcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRlbnQ6IFwic2VsZWN0RmlsdGVyXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9wdGlvbnM6IGNyZWF0ZUZpbHRlck9wdGlvbnMoTEVWRUxTKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlkOiBcImNhdFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgaGVhZGVyOiBbXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJDYXRlZ29yeVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29udGVudDogXCJ0ZXh0RmlsdGVyXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgICAgICAgICAgc29ydDogXCJzdHJpbmdcIlxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZDogXCJ0aW1lX2ZpcnN0XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBoZWFkZXI6IFwiRmlyc3QgdGltZVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgc29ydDogXCJkYXRlXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBmb3JtYXQ6IGRhdGVGb3JtYXR0ZXIsXG4gICAgICAgICAgICAgICAgICAgICAgICB3aWR0aDogMjAwXG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlkOiBcInRpbWVfbGFzdFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgaGVhZGVyOiBcIkxhc3QgdGltZVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgc29ydDogXCJkYXRlXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBmb3JtYXQ6IGRhdGVGb3JtYXR0ZXIsXG4gICAgICAgICAgICAgICAgICAgICAgICB3aWR0aDogMjAwXG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlkOiBcIm1lc3NhZ2VcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIGhlYWRlcjogW1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiTWVzc2FnZVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29udGVudDogXCJ0ZXh0RmlsdGVyXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHNvcnQ6IFwic3RyXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBmaWxsc3BhY2U6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICBmb3JtYXQ6IGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh2YWx1ZS5sZW5ndGggPiBNQVhfTVNHX0xFTikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZSA9IHZhbHVlLnN1YnN0cigwLCBNQVhfTVNHX0xFTikgKyAnLi4uJztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGFuc2lVcC5hbnNpX3RvX2h0bWwodmFsdWUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgICAgICBhdXRvQ29uZmlnOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAvLyB1cmw6e1xuICAgICAgICAgICAgICAgICAgICAvLyAgICAgJHByb3h5OnRydWUsXG4gICAgICAgICAgICAgICAgICAgIC8vICAgICBsb2FkOiBmdW5jdGlvbih2aWV3LCBwYXJhbXMpe1xuICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgIGxldCBkYXRhID0gd2ViaXguYWpheChcIi96ZXJvYm90L2FsZXJ0YS9hY3RvcnMvYWxlcnRhL2xpc3RfYWxlcnRzXCIpO1xuICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgIHJldHVybiBkYXRhO1xuICAgICAgICAgICAgICAgICAgICAvLyAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgLy8gfVxuICAgICAgICAgICAgICAgICAgICBzY2hlbWU6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICRpbml0OiBmdW5jdGlvbiAob2JqKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb2JqLmluZGV4ID0gdGhpcy5jb3VudCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAkc3VidmlldzogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgcG9wdXA6IHRydWVcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICBdXG4gICAgICAgIH07XG5cbiAgICAgICAgcmV0dXJuIHZpZXc7XG4gICAgfVxuXG4gICAgZGVsZXRlSXRlbShvYmplY3RzKSB7XG4gICAgICAgIHZhciBzZWxmID0gdGhpcztcblxuICAgICAgICBsZXQgaXRlbXMgPSBbXSxcbiAgICAgICAgICAgIGlkcyA9IFtdLFxuICAgICAgICAgICAgaW5kZXhlcyA9IFtdO1xuXG4gICAgICAgIGZvciAobGV0IG9iaiBvZiBvYmplY3RzKSB7XG4gICAgICAgICAgICBpZHMucHVzaChvYmouaWQpO1xuICAgICAgICAgICAgbGV0IGl0ZW0gPSBzZWxmLnRhYmxlLmdldEl0ZW0ob2JqLmlkKTtcbiAgICAgICAgICAgIGl0ZW1zLnB1c2goaXRlbSlcbiAgICAgICAgICAgIGluZGV4ZXMucHVzaChpdGVtLmluZGV4KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHdlYml4LmNvbmZpcm0oe1xuICAgICAgICAgICAgdGl0bGU6IFwiRGVsZXRlIGFsZXJ0c1wiLFxuICAgICAgICAgICAgb2s6IFwiWWVzXCIsXG4gICAgICAgICAgICBjYW5jZWw6IFwiTm9cIixcbiAgICAgICAgICAgIHRleHQ6IGBEZWxldGUgYWxlcnQgaXRlbShzKSBvZiAke2luZGV4ZXMuam9pbihcIiwgXCIpfWBcbiAgICAgICAgfSkudGhlbigoKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBpZGVudGlmaWVycyA9IGl0ZW1zLm1hcCgoaXRlbSkgPT4gaXRlbS5pZGVudGlmaWVyKTtcbiAgICAgICAgICAgIHNlbGYudGFibGUuc2hvd1Byb2dyZXNzKHtcbiAgICAgICAgICAgICAgICBoaWRlOiBmYWxzZVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIGFsZXJ0cy5kZWxldGUoaWRlbnRpZmllcnMpLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgICAgIHNlbGYudGFibGUucmVtb3ZlKGlkcylcbiAgICAgICAgICAgICAgICBzZWxmLnRhYmxlLnNob3dQcm9ncmVzcyh7XG4gICAgICAgICAgICAgICAgICAgIGhpZGU6IHRydWVcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHZpZXdJdGVtKGlkKSB7XG4gICAgICAgIHRoaXMuYWxlcnRWaWV3LnNob3dGb3IodGhpcy50YWJsZS5nZXRJdGVtKGlkKSk7XG4gICAgfVxuXG4gICAgaW5pdCgpIHtcbiAgICAgICAgLy8gdGhpcy51c2UocGx1Z2lucy5Qcm9ncmVzc0JhciwgXCJwcm9ncmVzc1wiKTtcbiAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgICAgICBzZWxmLnRhYmxlID0gJCQoXCJhbGVydHNfdGFibGVcIik7XG4gICAgICAgIHNlbGYuYWxlcnRWaWV3ID0gc2VsZi51aShBbGVydFZpZXcpO1xuXG4gICAgICAgIHdlYml4LmV4dGVuZChzZWxmLnRhYmxlLCB3ZWJpeC5Qcm9ncmVzc0Jhcik7XG4gICAgICAgIHdlYml4LnJlYWR5KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHNlbGYudGFibGUuY2xlYXJBbGwoKTtcbiAgICAgICAgICAgIHNlbGYudGFibGUuc2hvd1Byb2dyZXNzKHtcbiAgICAgICAgICAgICAgICBoaWRlOiBmYWxzZVxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBhbGVydHMubGlzdCgpLnRoZW4oZGF0YSA9PiB7XG4gICAgICAgICAgICAgICAgbGV0IGFsZXJ0cyA9IGRhdGEuanNvbigpLmFsZXJ0cztcbiAgICAgICAgICAgICAgICBzZWxmLnRhYmxlLnBhcnNlKGFsZXJ0cyk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgd2ViaXgudWkoe1xuICAgICAgICAgICAgdmlldzogXCJjb250ZXh0bWVudVwiLFxuICAgICAgICAgICAgaWQ6IFwiYWxlcnRzX2NtXCIsXG4gICAgICAgICAgICBkYXRhOiBbXCJWaWV3XCIsIFwiRGVsZXRlXCJdXG4gICAgICAgIH0pLmF0dGFjaFRvKHNlbGYudGFibGUpO1xuXG5cbiAgICAgICAgc2VsZi50YWJsZS5hdHRhY2hFdmVudChcIm9uSXRlbURibENsaWNrXCIsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHNlbGYudmlld0l0ZW0oc2VsZi50YWJsZS5nZXRTZWxlY3RlZElkKCkpO1xuICAgICAgICB9KTtcblxuICAgICAgICAkJChcImFsZXJ0c19jbVwiKS5hdHRhY2hFdmVudChcIm9uTWVudUl0ZW1DbGlja1wiLCBmdW5jdGlvbiAoaWQpIHtcbiAgICAgICAgICAgIGlmIChpZCA9PSBcIkRlbGV0ZVwiKSB7XG4gICAgICAgICAgICAgICAgc2VsZi5kZWxldGVJdGVtKHNlbGYudGFibGUuZ2V0U2VsZWN0ZWRJZCh0cnVlKSk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKGlkID09IFwiVmlld1wiKSB7XG4gICAgICAgICAgICAgICAgc2VsZi52aWV3SXRlbShzZWxmLnRhYmxlLmdldFNlbGVjdGVkSWQoKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NvdXJjZXMvdmlld3MvYWxlcnRzL2luZGV4LmpzIiwiaW1wb3J0IHsgRXh0ZXJuYWxWaWV3IH0gZnJvbSBcIi4uL2V4dGVybmFsXCI7XG5pbXBvcnQgeyBhZG1pbiB9IGZyb20gXCIuLi8uLi9zZXJ2aWNlcy9hZG1pblwiO1xuXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIENhcGFjaXR5VmlldyBleHRlbmRzIEV4dGVybmFsVmlldyB7XG4gICAgY29uc3RydWN0b3IoYXBwLCBuYW1lKSB7XG4gICAgICAgIHN1cGVyKGFwcCwgbmFtZSk7XG4gICAgfVxuXG4gICAgc2hvd0lmcmFtZSgpIHtcbiAgICAgICAgYWRtaW4uZ2V0X2V4cGxvcmVyKCkudGhlbigoZGF0YSkgPT4ge1xuICAgICAgICAgICAgY29uc3QgZXhwbG9yZXIgPSBkYXRhLmpzb24oKTtcbiAgICAgICAgICAgIGxldCB1cmwgPSBleHBsb3Jlci51cmw7XG5cbiAgICAgICAgICAgIGlmICghdXJsLnN0YXJ0c1dpdGgoJ2h0dHAnKSkge1xuICAgICAgICAgICAgICAgIHVybCA9IGBodHRwczovLyR7dXJsfWA7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHRoaXMuZXh0ZXJuYWxJZnJhbWUuc2hvdygpO1xuICAgICAgICAgICAgdGhpcy5leHRlcm5hbElmcmFtZS5zaG93UHJvZ3Jlc3MoeyB0eXBlOiBcImljb25cIiB9KTtcbiAgICAgICAgICAgIHRoaXMuZXh0ZXJuYWxJZnJhbWUubG9hZCh1cmwpO1xuICAgICAgICB9KVxuICAgIH1cbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NvdXJjZXMvdmlld3MvY2FwYWNpdHkvaW5kZXguanMiLCJpbXBvcnQgeyBKZXRWaWV3IH0gZnJvbSBcIndlYml4LWpldFwiO1xuXG5pbXBvcnQgeyBFcnJvclZpZXcgfSBmcm9tIFwiLi4vZXJyb3JzL2RpYWxvZ1wiO1xuaW1wb3J0IHsgdGFpZ2EgfSBmcm9tIFwiLi4vLi4vc2VydmljZXMvdGFpZ2FcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ2lyY2xlc1ZpZXcgZXh0ZW5kcyBKZXRWaWV3IHtcbiAgICBjb25maWcoKSB7XG4gICAgICAgIGNvbnN0IGdyaWQgPSB7XG4gICAgICAgICAgICByb3dzOiBbe1xuICAgICAgICAgICAgICAgIC8vSGVhZGVyXG4gICAgICAgICAgICAgICAgdmlldzogXCJ0ZW1wbGF0ZVwiLFxuICAgICAgICAgICAgICAgIHR5cGU6IFwiaGVhZGVyXCIsXG4gICAgICAgICAgICAgICAgdGVtcGxhdGU6IFwiQ2lyY2xlc1wiLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHsgLy9EYXRhVGFibGVcbiAgICAgICAgICAgICAgICB2aWV3OiBcImRhdGF0YWJsZVwiLFxuICAgICAgICAgICAgICAgIGlkOiBcImNpcmNsZXNfdGFibGVcIixcbiAgICAgICAgICAgICAgICByZXNpemVDb2x1bW46IHRydWUsXG4gICAgICAgICAgICAgICAgdHlwZToge1xuICAgICAgICAgICAgICAgICAgICBoZWlnaHQ6IDIwMCxcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHNjcm9sbDogXCJ4eVwiLFxuICAgICAgICAgICAgICAgIGF1dG9Db25maWc6IHRydWUsXG4gICAgICAgICAgICAgICAgdmlldzogXCJkYXRhdGFibGVcIixcbiAgICAgICAgICAgICAgICBzZWxlY3Q6IHRydWUsXG4gICAgICAgICAgICAgICAgY3NzOiBcIndlYml4X2hlYWRlcl9ib3JkZXIgd2ViaXhfZGF0YV9ib3JkZXJcIixcbiAgICAgICAgICAgICAgICBvbkNvbnRleHQ6IHt9LFxuICAgICAgICAgICAgICAgIGNvbHVtbnM6IFt7XG4gICAgICAgICAgICAgICAgICAgIGlkOiBcIklEXCIsXG4gICAgICAgICAgICAgICAgICAgIGhlYWRlcjogXCJJRFwiLFxuICAgICAgICAgICAgICAgICAgICBzb3J0OiBcImludFwiLFxuICAgICAgICAgICAgICAgICAgICBhdXRvd2lkdGg6IHRydWUsXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIGlkOiBcIk5hbWVcIixcbiAgICAgICAgICAgICAgICAgICAgaGVhZGVyOiBcIk5hbWVcIixcbiAgICAgICAgICAgICAgICAgICAgc29ydDogXCJzdHJpbmdcIixcbiAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDIwMFxuICAgICAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICAgICAgaWQ6IFwiT3duZXJcIixcbiAgICAgICAgICAgICAgICAgICAgaGVhZGVyOiBbXCJPd25lclwiLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb250ZW50OiBcInRleHRGaWx0ZXJcIlxuICAgICAgICAgICAgICAgICAgICB9XSxcbiAgICAgICAgICAgICAgICAgICAgc29ydDogXCJzdHJpbmdcIixcbiAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDIwMFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBpZDogXCJEZXNjcmlwdGlvblwiLFxuICAgICAgICAgICAgICAgICAgICBoZWFkZXI6IFwiRGVzY3JpcHRpb25cIixcbiAgICAgICAgICAgICAgICAgICAgc29ydDogXCJzdHJpbmdcIixcbiAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDEzMDAsXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgc2NoZW1lOiB7XG4gICAgICAgICAgICAgICAgICAgICRpbml0OiBmdW5jdGlvbiAob2JqKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBvYmouaW5kZXggPSB0aGlzLmNvdW50KCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBdXG4gICAgICAgIH07XG4gICAgICAgIHJldHVybiBncmlkO1xuICAgIH1cblxuICAgIHNob3dFcnJvcihtZXNzYWdlKSB7XG4gICAgICAgIHRoaXMuZXJyb3JWaWV3LnNob3dFcnJvcihtZXNzYWdlKTtcbiAgICB9XG5cbiAgICBpbml0KHZpZXcpIHtcbiAgICAgICAgY29uc3Qgc2VsZiA9IHRoaXM7XG5cbiAgICAgICAgc2VsZi5lcnJvclZpZXcgPSB0aGlzLnVpKEVycm9yVmlldyk7XG5cbiAgICAgICAgY29uc3QgbWVudSA9IHdlYml4LnVpKHtcbiAgICAgICAgICAgIHZpZXc6IFwiY29udGV4dG1lbnVcIixcbiAgICAgICAgICAgIGlkOiBcImNpcmNsZXNfY21cIlxuICAgICAgICB9KTtcblxuICAgICAgICB0aGlzLmNpcmNsZVRhYmxlID0gdGhpcy4kJChcImNpcmNsZXNfdGFibGVcIik7XG4gICAgICAgIHdlYml4LmV4dGVuZCh0aGlzLmNpcmNsZVRhYmxlLCB3ZWJpeC5Qcm9ncmVzc0Jhcik7XG5cblxuICAgICAgICB3ZWJpeC5hamF4KCkuZ2V0KFwiL2F1dGgvYXV0aGVudGljYXRlZFwiLCBmdW5jdGlvbiAoZGF0YSkge1xuICAgICAgICAgICAgY29uc3QgaW5mbyA9IEpTT04ucGFyc2UoZGF0YSk7XG4gICAgICAgICAgICBjb25zdCB1c2VybmFtZSA9IGluZm8udXNlcm5hbWUucmVwbGFjZShcIi4zYm90XCIsIFwiXCIpXG4gICAgICAgICAgICB0YWlnYS51c2VyQ2lyY2xlcyh1c2VybmFtZSkudGhlbihkYXRhID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCBjaXJjbGVzID0gZGF0YS5qc29uKCk7XG4gICAgICAgICAgICAgICAgc2VsZi5jaXJjbGVUYWJsZS5wYXJzZShjaXJjbGVzKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcblxuXG4gICAgfVxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc291cmNlcy92aWV3cy9jaXJjbGVzL2luZGV4LmpzIiwiaW1wb3J0IHsgSmV0VmlldyB9IGZyb20gXCJ3ZWJpeC1qZXRcIjtcblxuaW1wb3J0IHsgRXJyb3JWaWV3IH0gZnJvbSBcIi4uL2Vycm9ycy9kaWFsb2dcIjtcbmltcG9ydCB7IHRhaWdhIH0gZnJvbSBcIi4uLy4uL3NlcnZpY2VzL3RhaWdhXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIENpcmNsZXN0b3JpZXNWaWV3IGV4dGVuZHMgSmV0VmlldyB7XG4gICAgY29uZmlnKCkge1xuICAgICAgICBjb25zdCBncmlkID0ge1xuICAgICAgICAgICAgcm93czogW3tcbiAgICAgICAgICAgICAgICAvL0hlYWRlclxuICAgICAgICAgICAgICAgIHZpZXc6IFwidGVtcGxhdGVcIixcbiAgICAgICAgICAgICAgICB0eXBlOiBcImhlYWRlclwiLFxuICAgICAgICAgICAgICAgIHRlbXBsYXRlOiBcIkNpcmNsZXNTdG9yaWVzXCIsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgeyAvL0RhdGFUYWJsZVxuICAgICAgICAgICAgICAgIHZpZXc6IFwiZGF0YXRhYmxlXCIsXG4gICAgICAgICAgICAgICAgaWQ6IFwiY2lyY2xlc3Rvcmllc190YWJsZVwiLFxuICAgICAgICAgICAgICAgIHJlc2l6ZUNvbHVtbjogdHJ1ZSxcbiAgICAgICAgICAgICAgICB0eXBlOiB7XG4gICAgICAgICAgICAgICAgICAgIGhlaWdodDogMjAwLFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgc2Nyb2xsOiBcInh5XCIsXG4gICAgICAgICAgICAgICAgYXV0b0NvbmZpZzogdHJ1ZSxcbiAgICAgICAgICAgICAgICB2aWV3OiBcImRhdGF0YWJsZVwiLFxuICAgICAgICAgICAgICAgIHNlbGVjdDogdHJ1ZSxcbiAgICAgICAgICAgICAgICBjc3M6IFwid2ViaXhfaGVhZGVyX2JvcmRlciB3ZWJpeF9kYXRhX2JvcmRlclwiLFxuICAgICAgICAgICAgICAgIG9uQ29udGV4dDoge30sXG4gICAgICAgICAgICAgICAgY29sdW1uczogW3tcbiAgICAgICAgICAgICAgICAgICAgaWQ6IFwiSURcIixcbiAgICAgICAgICAgICAgICAgICAgaGVhZGVyOiBcIklEXCIsXG4gICAgICAgICAgICAgICAgICAgIHNvcnQ6IFwiaW50XCIsXG4gICAgICAgICAgICAgICAgICAgIGF1dG93aWR0aDogdHJ1ZSxcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgaWQ6IFwiUHJvamVjdFwiLFxuICAgICAgICAgICAgICAgICAgICBoZWFkZXI6IFtcIlByb2plY3RcIiwge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29udGVudDogXCJ0ZXh0RmlsdGVyXCJcbiAgICAgICAgICAgICAgICAgICAgfV0sXG4gICAgICAgICAgICAgICAgICAgIHNvcnQ6IFwic3RyaW5nXCIsXG4gICAgICAgICAgICAgICAgICAgIHdpZHRoOiAzMDBcbiAgICAgICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgICAgIGlkOiBcIlN1YmplY3RcIixcbiAgICAgICAgICAgICAgICAgICAgaGVhZGVyOiBcIlN1YmplY3RcIixcbiAgICAgICAgICAgICAgICAgICAgc29ydDogXCJzdHJpbmdcIixcbiAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDcwMFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBpZDogXCJNaWxlc3RvbmVcIixcbiAgICAgICAgICAgICAgICAgICAgaGVhZGVyOiBcIk1pbGVzdG9uZVwiLFxuICAgICAgICAgICAgICAgICAgICBzb3J0OiBcInN0cmluZ1wiLFxuICAgICAgICAgICAgICAgICAgICB3aWR0aDogMjAwLFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBpZDogXCJTdGF0dXNcIixcbiAgICAgICAgICAgICAgICAgICAgaGVhZGVyOiBcIlN0YXR1c1wiLFxuICAgICAgICAgICAgICAgICAgICBzb3J0OiBcInN0cmluZ1wiLFxuICAgICAgICAgICAgICAgICAgICB3aWR0aDogMjAwLFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBpZDogXCJEdWUgZGF0ZVwiLFxuICAgICAgICAgICAgICAgICAgICBoZWFkZXI6IFwiRHVlIGRhdGVcIixcbiAgICAgICAgICAgICAgICAgICAgc29ydDogXCJzdHJpbmdcIixcbiAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDIwMCxcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICBzY2hlbWU6IHtcbiAgICAgICAgICAgICAgICAgICAgJGluaXQ6IGZ1bmN0aW9uIChvYmopIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG9iai5pbmRleCA9IHRoaXMuY291bnQoKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIF1cbiAgICAgICAgfTtcbiAgICAgICAgcmV0dXJuIGdyaWQ7XG4gICAgfVxuXG4gICAgc2hvd0Vycm9yKG1lc3NhZ2UpIHtcbiAgICAgICAgdGhpcy5lcnJvclZpZXcuc2hvd0Vycm9yKG1lc3NhZ2UpO1xuICAgIH1cblxuICAgIGluaXQodmlldykge1xuICAgICAgICBjb25zdCBzZWxmID0gdGhpcztcblxuICAgICAgICBzZWxmLmVycm9yVmlldyA9IHRoaXMudWkoRXJyb3JWaWV3KTtcblxuICAgICAgICBjb25zdCBtZW51ID0gd2ViaXgudWkoe1xuICAgICAgICAgICAgdmlldzogXCJjb250ZXh0bWVudVwiLFxuICAgICAgICAgICAgaWQ6IFwiY2lyY2xlc3Rvcmllc19jbVwiXG4gICAgICAgIH0pO1xuXG4gICAgICAgIHRoaXMuc3Rvcmllc1RhYmxlID0gdGhpcy4kJChcImNpcmNsZXN0b3JpZXNfdGFibGVcIik7XG4gICAgICAgIHdlYml4LmV4dGVuZCh0aGlzLnN0b3JpZXNUYWJsZSwgd2ViaXguUHJvZ3Jlc3NCYXIpO1xuXG4gICAgICAgIHdlYml4LmFqYXgoKS5nZXQoXCIvYXV0aC9hdXRoZW50aWNhdGVkXCIsIGZ1bmN0aW9uIChkYXRhKSB7XG4gICAgICAgICAgICBjb25zdCBpbmZvID0gSlNPTi5wYXJzZShkYXRhKTtcbiAgICAgICAgICAgIGNvbnN0IHVzZXJuYW1lID0gaW5mby51c2VybmFtZS5yZXBsYWNlKFwiLjNib3RcIiwgXCJcIilcbiAgICAgICAgICAgIHRhaWdhLnVzZXJTdG9yaWVzKHVzZXJuYW1lKS50aGVuKGRhdGEgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IHN0b3JpZXMgPSBkYXRhLmpzb24oKTtcbiAgICAgICAgICAgICAgICBzZWxmLnN0b3JpZXNUYWJsZS5wYXJzZShzdG9yaWVzKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcblxuXG4gICAgfVxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc291cmNlcy92aWV3cy9jaXJjbGVzdG9yaWVzL2luZGV4LmpzIiwiaW1wb3J0IHsgSmV0VmlldyB9IGZyb20gXCJ3ZWJpeC1qZXRcIjtcblxuaW1wb3J0IHsgRXJyb3JWaWV3IH0gZnJvbSBcIi4uL2Vycm9ycy9kaWFsb2dcIjtcbmltcG9ydCB7IHRhaWdhIH0gZnJvbSBcIi4uLy4uL3NlcnZpY2VzL3RhaWdhXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIENpcmNsZXNUYXNrc1ZpZXcgZXh0ZW5kcyBKZXRWaWV3IHtcbiAgICBjb25maWcoKSB7XG4gICAgICAgIGNvbnN0IGdyaWQgPSB7XG4gICAgICAgICAgICByb3dzOiBbe1xuICAgICAgICAgICAgICAgIC8vSGVhZGVyXG4gICAgICAgICAgICAgICAgdmlldzogXCJ0ZW1wbGF0ZVwiLFxuICAgICAgICAgICAgICAgIHR5cGU6IFwiaGVhZGVyXCIsXG4gICAgICAgICAgICAgICAgdGVtcGxhdGU6IFwiQ2lyY2xlc1Rhc2tzXCIsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgeyAvL0RhdGFUYWJsZVxuICAgICAgICAgICAgICAgIHZpZXc6IFwiZGF0YXRhYmxlXCIsXG4gICAgICAgICAgICAgICAgaWQ6IFwiY2lyY2xlc3Rhc2tzX3RhYmxlXCIsXG4gICAgICAgICAgICAgICAgcmVzaXplQ29sdW1uOiB0cnVlLFxuICAgICAgICAgICAgICAgIHR5cGU6IHtcbiAgICAgICAgICAgICAgICAgICAgaGVpZ2h0OiAyMDAsXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBzY3JvbGw6IFwieHlcIixcbiAgICAgICAgICAgICAgICBhdXRvQ29uZmlnOiB0cnVlLFxuICAgICAgICAgICAgICAgIHZpZXc6IFwiZGF0YXRhYmxlXCIsXG4gICAgICAgICAgICAgICAgc2VsZWN0OiB0cnVlLFxuICAgICAgICAgICAgICAgIGNzczogXCJ3ZWJpeF9oZWFkZXJfYm9yZGVyIHdlYml4X2RhdGFfYm9yZGVyXCIsXG4gICAgICAgICAgICAgICAgb25Db250ZXh0OiB7fSxcbiAgICAgICAgICAgICAgICBjb2x1bW5zOiBbe1xuICAgICAgICAgICAgICAgICAgICBpZDogXCJJRFwiLFxuICAgICAgICAgICAgICAgICAgICBoZWFkZXI6IFwiSURcIixcbiAgICAgICAgICAgICAgICAgICAgc29ydDogXCJpbnRcIixcbiAgICAgICAgICAgICAgICAgICAgYXV0b3dpZHRoOiB0cnVlLFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBpZDogXCJQcm9qZWN0XCIsXG4gICAgICAgICAgICAgICAgICAgIGhlYWRlcjogW1wiUHJvamVjdFwiLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb250ZW50OiBcInRleHRGaWx0ZXJcIlxuICAgICAgICAgICAgICAgICAgICB9XSxcbiAgICAgICAgICAgICAgICAgICAgc29ydDogXCJzdHJpbmdcIixcbiAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDMwMFxuICAgICAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICAgICAgaWQ6IFwiU3ViamVjdFwiLFxuICAgICAgICAgICAgICAgICAgICBoZWFkZXI6IFwiU3ViamVjdFwiLFxuICAgICAgICAgICAgICAgICAgICBzb3J0OiBcInN0cmluZ1wiLFxuICAgICAgICAgICAgICAgICAgICB3aWR0aDogODAwXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIGlkOiBcIk1pbGVzdG9uZVwiLFxuICAgICAgICAgICAgICAgICAgICBoZWFkZXI6IFwiTWlsZXN0b25lXCIsXG4gICAgICAgICAgICAgICAgICAgIHNvcnQ6IFwic3RyaW5nXCIsXG4gICAgICAgICAgICAgICAgICAgIHdpZHRoOiAyMDAsXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIGlkOiBcIlN0YXR1c1wiLFxuICAgICAgICAgICAgICAgICAgICBoZWFkZXI6IFwiU3RhdHVzXCIsXG4gICAgICAgICAgICAgICAgICAgIHNvcnQ6IFwic3RyaW5nXCIsXG4gICAgICAgICAgICAgICAgICAgIHdpZHRoOiAzMDAsXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgc2NoZW1lOiB7XG4gICAgICAgICAgICAgICAgICAgICRpbml0OiBmdW5jdGlvbiAob2JqKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBvYmouaW5kZXggPSB0aGlzLmNvdW50KCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBdXG4gICAgICAgIH07XG4gICAgICAgIHJldHVybiBncmlkO1xuICAgIH1cblxuICAgIHNob3dFcnJvcihtZXNzYWdlKSB7XG4gICAgICAgIHRoaXMuZXJyb3JWaWV3LnNob3dFcnJvcihtZXNzYWdlKTtcbiAgICB9XG5cbiAgICBpbml0KHZpZXcpIHtcbiAgICAgICAgY29uc3Qgc2VsZiA9IHRoaXM7XG5cbiAgICAgICAgc2VsZi5lcnJvclZpZXcgPSB0aGlzLnVpKEVycm9yVmlldyk7XG5cbiAgICAgICAgY29uc3QgbWVudSA9IHdlYml4LnVpKHtcbiAgICAgICAgICAgIHZpZXc6IFwiY29udGV4dG1lbnVcIixcbiAgICAgICAgICAgIGlkOiBcImNpcmNsZXN0YXNrc19jbVwiXG4gICAgICAgIH0pO1xuXG4gICAgICAgIHRoaXMudGFza3NUYWJsZSA9IHRoaXMuJCQoXCJjaXJjbGVzdGFza3NfdGFibGVcIik7XG4gICAgICAgIHdlYml4LmV4dGVuZCh0aGlzLnRhc2tzVGFibGUsIHdlYml4LlByb2dyZXNzQmFyKTtcblxuICAgICAgICB0YWlnYS51c2VyVGFza3MoMzYpLnRoZW4oZGF0YSA9PiB7XG4gICAgICAgICAgICBjb25zdCBjaXJjbGVzID0gZGF0YS5qc29uKCk7XG4gICAgICAgICAgICBzZWxmLnRhc2tzVGFibGUucGFyc2UoY2lyY2xlcyk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHdlYml4LmFqYXgoKS5nZXQoXCIvYXV0aC9hdXRoZW50aWNhdGVkXCIsIGZ1bmN0aW9uIChkYXRhKSB7XG4gICAgICAgICAgICBjb25zdCBpbmZvID0gSlNPTi5wYXJzZShkYXRhKTtcbiAgICAgICAgICAgIGNvbnN0IHVzZXJuYW1lID0gaW5mby51c2VybmFtZS5yZXBsYWNlKFwiLjNib3RcIiwgXCJcIilcbiAgICAgICAgICAgIHRhaWdhLnVzZXJUYXNrcyh1c2VybmFtZSkudGhlbihkYXRhID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCB0YXNrcyA9IGRhdGEuanNvbigpO1xuICAgICAgICAgICAgICAgIHNlbGYudGFza3NUYWJsZS5wYXJzZSh0YXNrcyk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG5cblxuICAgIH1cbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NvdXJjZXMvdmlld3MvY2lyY2xldGFza3MvaW5kZXguanMiLCJpbXBvcnQgeyBFeHRlcm5hbFZpZXcgfSBmcm9tIFwiLi4vZXh0ZXJuYWxcIjtcblxuY29uc3QgQ09ERV9VUkwgPSBcIi9jb2Rlc2VydmVyLz9mb2xkZXI9L3NhbmRib3gvY29kZVwiO1xuY29uc3QgUkVRVUlSRURfUEFDS0FHRVMgPSB7XG4gICAgXCJ6ZXJvYm90LmNvZGVzZXJ2ZXJcIjogXCJodHRwczovL2dpdGh1Yi5jb20vdGhyZWVmb2xkdGVjaC9qdW1wc2NhbGVYX3RocmVlYm90L3RyZWUvZGV2ZWxvcG1lbnQvVGhyZWVCb3RQYWNrYWdlcy96ZXJvYm90L2NvZGVzZXJ2ZXJcIlxufVxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDb2Rlc2VydmVyVmlldyBleHRlbmRzIEV4dGVybmFsVmlldyB7XG4gICAgY29uc3RydWN0b3IoYXBwLCBuYW1lKSB7XG4gICAgICAgIHN1cGVyKGFwcCwgbmFtZSwgQ09ERV9VUkwsIFJFUVVJUkVEX1BBQ0tBR0VTKTtcbiAgICB9XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zb3VyY2VzL3ZpZXdzL2NvZGVzZXJ2ZXIvaW5kZXguanMiLCJpbXBvcnQgeyBKZXRWaWV3IH0gZnJvbSBcIndlYml4LWpldFwiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBUb3BWaWV3IGV4dGVuZHMgSmV0VmlldyB7XG5cdGNvbmZpZygpIHtcblx0XHRyZXR1cm4ge1xuXHRcdFx0dHlwZTogXCJzcGFjZVwiLFxuXHRcdFx0cmVzcG9uc2l2ZTogdHJ1ZSxcblx0XHRcdHJvd3M6IFtcblx0XHRcdFx0e1xuXHRcdFx0XHRcdGNvbHM6IFt7XG5cdFx0XHRcdFx0XHQkc3VidmlldzogXCJkYXNoLmpzeEluZm9cIlxuXHRcdFx0XHRcdH0sXG5cdFx0XHRcdFx0e1xuXHRcdFx0XHRcdFx0JHN1YnZpZXc6IFwiZGFzaC5oZWFsdGhcIlxuXHRcdFx0XHRcdH0sXG5cdFx0XHRcdFx0e1xuXHRcdFx0XHRcdFx0JHN1YnZpZXc6IFwiZGFzaC5kaXNrU3BhY2VcIlxuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRdXG5cdFx0XHRcdH0sXG5cdFx0XHRcdHtcblx0XHRcdFx0XHRjb2xzOiBbe1xuXHRcdFx0XHRcdFx0JHN1YnZpZXc6IFwiZGFzaC5wcm9jZXNzZXNcIlxuXHRcdFx0XHRcdH0sXG5cdFx0XHRcdFx0eyAkc3VidmlldzogXCJkYXNoLnByb2Nlc3Nlc0xpc3RcIiB9LFxuXHRcdFx0XHRcdHsgJHN1YnZpZXc6IFwiZGFzaC5ydW5uaW5nUG9ydHNcIiB9XG5cdFx0XHRcdF1cblx0XHRcdFx0fSxcblx0XHRcdF1cblx0XHR9O1xuXHR9XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zb3VyY2VzL3ZpZXdzL2Rhc2gvaW5kZXguanMiLCJpbXBvcnQgeyBKZXRWaWV3IH0gZnJvbSBcIndlYml4LWpldFwiO1xuXG5pbXBvcnQgeyBFcnJvclZpZXcgfSBmcm9tIFwiLi4vZXJyb3JzL2RpYWxvZ1wiO1xuaW1wb3J0IHsgc29sdXRpb25zIH0gZnJvbSBcIi4uLy4uL3NlcnZpY2VzL2RlcGxveWVkU29sdXRpb25zXCI7XG5cbmltcG9ydCBSZXNlcnZhdGlvblZpZXcgZnJvbSBcIi4vcmVzZXJ2YXRpb25cIjtcblxuY29uc3QgVU5LTk9XTl9TVEFUVVMgPSAnVW5rbm93bic7XG5cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRGVwbG95ZWRTb2x1dGlvbnNWaWV3IGV4dGVuZHMgSmV0VmlldyB7XG4gICAgY29uZmlnKCkge1xuICAgICAgICBjb25zdCBncmlkID0ge1xuICAgICAgICAgICAgcm93czogW3tcbiAgICAgICAgICAgICAgICAvL0hlYWRlclxuICAgICAgICAgICAgICAgIHZpZXc6IFwidGVtcGxhdGVcIixcbiAgICAgICAgICAgICAgICB0eXBlOiBcImhlYWRlclwiLFxuICAgICAgICAgICAgICAgIHRlbXBsYXRlOiBcIkRlcGxveWVkIFNvbHV0aW9uc1wiLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHsgLy9EYXRhVGFibGVcbiAgICAgICAgICAgICAgICB2aWV3OiBcImRhdGF0YWJsZVwiLFxuICAgICAgICAgICAgICAgIGlkOiBcInNvbHV0aW9uc190YWJsZVwiLFxuICAgICAgICAgICAgICAgIHJlc2l6ZUNvbHVtbjogdHJ1ZSxcbiAgICAgICAgICAgICAgICB0eXBlOiB7XG4gICAgICAgICAgICAgICAgICAgIGhlaWdodDogMjAwLFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgc2Nyb2xsOiBcInh5XCIsXG4gICAgICAgICAgICAgICAgYXV0b0NvbmZpZzogdHJ1ZSxcbiAgICAgICAgICAgICAgICB2aWV3OiBcImRhdGF0YWJsZVwiLFxuICAgICAgICAgICAgICAgIHNlbGVjdDogdHJ1ZSxcbiAgICAgICAgICAgICAgICBjc3M6IFwid2ViaXhfaGVhZGVyX2JvcmRlciB3ZWJpeF9kYXRhX2JvcmRlclwiLFxuICAgICAgICAgICAgICAgIG9uQ29udGV4dDoge30sXG4gICAgICAgICAgICAgICAgY29sdW1uczogW3tcbiAgICAgICAgICAgICAgICAgICAgaWQ6IFwiaW5kZXhcIixcbiAgICAgICAgICAgICAgICAgICAgaGVhZGVyOiBcIiNcIixcbiAgICAgICAgICAgICAgICAgICAgc29ydDogXCJpbnRcIixcbiAgICAgICAgICAgICAgICAgICAgYXV0b3dpZHRoOiB0cnVlLFxuICAgICAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICAgICAgaWQ6IFwic29sdXRpb25OYW1lXCIsXG4gICAgICAgICAgICAgICAgICAgIGhlYWRlcjogW1wiU29sdXRpb24gTmFtZVwiLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb250ZW50OiBcInRleHRGaWx0ZXJcIlxuICAgICAgICAgICAgICAgICAgICB9XSxcbiAgICAgICAgICAgICAgICAgICAgc29ydDogXCJzdHJpbmdcIixcbiAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDIwMFxuICAgICAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICAgICAgaWQ6IFwicmVzdklkXCIsXG4gICAgICAgICAgICAgICAgICAgIGhlYWRlcjogW1wiUmVzZXJ2YXRpb24gSWRcIiwge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29udGVudDogXCJ0ZXh0RmlsdGVyXCJcbiAgICAgICAgICAgICAgICAgICAgfV0sXG4gICAgICAgICAgICAgICAgICAgIHNvcnQ6IFwic3RyaW5nXCIsXG4gICAgICAgICAgICAgICAgICAgIHdpZHRoOiAyMDBcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgaWQ6IFwic29sdXRpb25UeXBlXCIsXG4gICAgICAgICAgICAgICAgICAgIGhlYWRlcjogW1wiU29sdXRpb24gVHlwZVwiLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb250ZW50OiBcInNlbGVjdEZpbHRlclwiXG4gICAgICAgICAgICAgICAgICAgIH1dLFxuICAgICAgICAgICAgICAgICAgICBzb3J0OiBcInN0cmluZ1wiLFxuICAgICAgICAgICAgICAgICAgICB3aWR0aDogMjAwXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIGlkOiBcIm5leHRBY3Rpb25cIixcbiAgICAgICAgICAgICAgICAgICAgaGVhZGVyOiBbXCJOZXh0IGFjdGlvblwiLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb250ZW50OiBcInNlbGVjdEZpbHRlclwiXG4gICAgICAgICAgICAgICAgICAgIH1dLFxuICAgICAgICAgICAgICAgICAgICBzb3J0OiBcInN0cmluZ1wiLFxuICAgICAgICAgICAgICAgICAgICB3aWR0aDogMjAwXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgc2NoZW1lOiB7XG4gICAgICAgICAgICAgICAgICAgICRpbml0OiBmdW5jdGlvbiAob2JqKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBvYmouc29sdXRpb25OYW1lID0gb2JqLm5hbWU7XG4gICAgICAgICAgICAgICAgICAgICAgICBvYmoucmVzdklkID0gb2JqLnJlc2VydmF0aW9uLmlkO1xuICAgICAgICAgICAgICAgICAgICAgICAgb2JqLnNvbHV0aW9uVHlwZSA9IG9iai50eXBlO1xuICAgICAgICAgICAgICAgICAgICAgICAgb2JqLm5leHRBY3Rpb24gPSBvYmoucmVzZXJ2YXRpb24ubmV4dF9hY3Rpb247XG4gICAgICAgICAgICAgICAgICAgICAgICBvYmouaW5kZXggPSB0aGlzLmNvdW50KCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIG9uOiB7XG4gICAgICAgICAgICAgICAgICAgIG9uQWZ0ZXJMb2FkOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIXRoaXMuY291bnQoKSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNob3dPdmVybGF5KFwiU29ycnksIHRoZXJlIGlzIG5vIGRhdGFcIik7XG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5oaWRlT3ZlcmxheSgpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgXVxuICAgICAgICB9O1xuICAgICAgICByZXR1cm4gZ3JpZDtcbiAgICB9XG5cbiAgICBzaG93RXJyb3IobWVzc2FnZSkge1xuICAgICAgICB0aGlzLmVycm9yVmlldy5zaG93RXJyb3IobWVzc2FnZSk7XG4gICAgfVxuXG4gICAgaGFuZGxlUmVzdWx0KHByb21pc2UsIGNhbGxiYWNrKSB7XG4gICAgICAgIHRoaXMuc29sdXRpb25zVGFibGUuc2hvd1Byb2dyZXNzKHsgaGlkZTogZmFsc2UgfSk7XG5cbiAgICAgICAgcHJvbWlzZS50aGVuKChkYXRhKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBzb2x1dGlvbkl0ZW0gPSBkYXRhLmpzb24oKS5zb2x1dGlvbjtcbiAgICAgICAgICAgIGlmIChjYWxsYmFjayBpbnN0YW5jZW9mIEZ1bmN0aW9uKSB7XG4gICAgICAgICAgICAgICAgY2FsbGJhY2soc29sdXRpb25JdGVtKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgd2ViaXgubWVzc2FnZSh7XG4gICAgICAgICAgICAgICAgdHlwZTogXCJzdWNjZXNzXCIsXG4gICAgICAgICAgICAgICAgdGV4dDogXCJUaGUgb3BlcmF0aW9uIGhhcyBiZWVkIGRvbmUgc3VjY2Vzc2Z1bGx5XCJcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICB0aGlzLnNvbHV0aW9uc1RhYmxlLnNob3dQcm9ncmVzcyh7IGhpZGU6IHRydWUgfSk7XG4gICAgICAgIH0pLmNhdGNoKGVycm9yID0+IHtcbiAgICAgICAgICAgIHRoaXMuc2hvd0Vycm9yKFwiRXJyb3IgaGFzIGhhcHBlbmVkIGR1cmluZyB0aGlzIG9wZXJhdGlvbjogXCIgKyBlcnJvci5yZXNwb25zZSwgXCJFcnJvclwiKTtcbiAgICAgICAgICAgIHRoaXMuc29sdXRpb25zVGFibGUuc2hvd1Byb2dyZXNzKHsgaGlkZTogdHJ1ZSB9KTtcbiAgICAgICAgfSlcbiAgICB9XG5cbiAgICBkZWxldGVTb2x1dGlvbihzb2x1dGlvblR5cGUsIHNvbHV0aW9uTmFtZSwgaXRlbUlkKSB7XG4gICAgICAgIHRoaXMuaGFuZGxlUmVzdWx0KHNvbHV0aW9ucy5kZWxldGUoc29sdXRpb25UeXBlLCBzb2x1dGlvbk5hbWUpLCAoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLnNvbHV0aW9uc1RhYmxlLnJlbW92ZShpdGVtSWQpXG4gICAgICAgIH0pO1xuXG4gICAgfVxuXG4gICAgbG9hZFNvbHV0aW9ucygpIHtcbiAgICAgICAgc29sdXRpb25zLmxpc3QoKS50aGVuKGRhdGEgPT4ge1xuICAgICAgICAgICAgbGV0IHNvbHV0aW9ucyA9IGRhdGEuanNvbigpLnNvbHV0aW9uc1xuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzb2x1dGlvbnMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICBzb2x1dGlvbnNbaV0ucmVzZXJ2YXRpb24gPSBKU09OLnBhcnNlKHNvbHV0aW9uc1tpXS5yZXNlcnZhdGlvbilcbiAgICAgICAgICAgICAgICBzb2x1dGlvbnNbaV0uZm9ybV9pbmZvID0gSlNPTi5wYXJzZShzb2x1dGlvbnNbaV0uZm9ybV9pbmZvKVxuXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLnNvbHV0aW9uc1RhYmxlLnBhcnNlKHNvbHV0aW9ucyk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHZpZXdJdGVtKGlkKSB7XG4gICAgICAgIHRoaXMucmVzZXJ2YXRpb25WaWV3LnNob3dGb3IodGhpcy5zb2x1dGlvbnNUYWJsZS5nZXRJdGVtKGlkKSk7XG4gICAgfVxuXG4gICAgaW5pdCh2aWV3KSB7XG4gICAgICAgIGNvbnN0IHNlbGYgPSB0aGlzO1xuXG4gICAgICAgIHNlbGYuZXJyb3JWaWV3ID0gdGhpcy51aShFcnJvclZpZXcpO1xuICAgICAgICBzZWxmLnJlc2VydmF0aW9uVmlldyA9IHNlbGYudWkoUmVzZXJ2YXRpb25WaWV3KTtcblxuICAgICAgICBjb25zdCBtZW51ID0gd2ViaXgudWkoe1xuICAgICAgICAgICAgdmlldzogXCJjb250ZXh0bWVudVwiLFxuICAgICAgICAgICAgaWQ6IFwic29sdXRpb25zX2NtXCJcbiAgICAgICAgfSk7XG5cbiAgICAgICAgdGhpcy5zb2x1dGlvbnNUYWJsZSA9IHRoaXMuJCQoXCJzb2x1dGlvbnNfdGFibGVcIik7XG4gICAgICAgIHNlbGYubG9hZFNvbHV0aW9ucygpO1xuICAgICAgICB3ZWJpeC5leHRlbmQodGhpcy5zb2x1dGlvbnNUYWJsZSwgd2ViaXguUHJvZ3Jlc3NCYXIpO1xuXG4gICAgICAgIGZ1bmN0aW9uIGNoZWNrQWN0aW9uKGFjdGlvbiwgc2VsZWN0ZWRJdGVtSWQpIHtcbiAgICAgICAgICAgIGNvbnN0IGl0ZW0gPSBzZWxmLnNvbHV0aW9uc1RhYmxlLmdldEl0ZW0oc2VsZWN0ZWRJdGVtSWQpO1xuICAgICAgICAgICAgaWYgKGl0ZW0pIHtcbiAgICAgICAgICAgICAgICBsZXQgaXRlbUlkID0gaXRlbS5pZDtcbiAgICAgICAgICAgICAgICBsZXQgc29sdXRpb25OYW1lID0gaXRlbS5zb2x1dGlvbk5hbWU7XG4gICAgICAgICAgICAgICAgbGV0IHNvbHV0aW9uVHlwZSA9IGl0ZW0uc29sdXRpb25UeXBlO1xuICAgICAgICAgICAgICAgIGxldCBuZXh0QWN0aW9uID0gaXRlbS5yZXNlcnZhdGlvbi5uZXh0X2FjdGlvblxuXG4gICAgICAgICAgICAgICAgaWYgKGFjdGlvbiA9PSAnZGVsZXRlJykge1xuICAgICAgICAgICAgICAgICAgICB3ZWJpeC5jb25maXJtKHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRpdGxlOiBcIkNhbmNlbCBTb2x1dGlvblwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgb2s6IFwiWWVzXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICB0ZXh0OiBgQXJlIHlvdSBzdXJlIHlvdSB3YW50IHRvIGNhbmNlbCAke3NvbHV0aW9uTmFtZX0/YCxcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhbmNlbDogXCJOb1wiLFxuICAgICAgICAgICAgICAgICAgICB9KS50aGVuKCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuZGVsZXRlU29sdXRpb24oc29sdXRpb25UeXBlLCBzb2x1dGlvbk5hbWUsIGl0ZW1JZClcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB3ZWJpeC5tZXNzYWdlKFwiWW91IG5lZWQgdG8gc2VsZWN0IGEgc29sdXRpb25cIilcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgICQkKFwic29sdXRpb25zX2NtXCIpLmF0dGFjaEV2ZW50KFwib25NZW51SXRlbUNsaWNrXCIsIGZ1bmN0aW9uIChpZCkge1xuICAgICAgICAgICAgY2hlY2tBY3Rpb24oaWQsIHNlbGYuc29sdXRpb25zVGFibGUuZ2V0U2VsZWN0ZWRJZCgpKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgc2VsZi5zb2x1dGlvbnNUYWJsZS5hdHRhY2hFdmVudChcIm9uSXRlbURibENsaWNrXCIsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHNlbGYudmlld0l0ZW0oc2VsZi5zb2x1dGlvbnNUYWJsZS5nZXRTZWxlY3RlZElkKCkpO1xuICAgICAgICB9KTtcblxuICAgICAgICB3ZWJpeC5ldmVudChzZWxmLnNvbHV0aW9uc1RhYmxlLiR2aWV3LCBcImNvbnRleHRtZW51XCIsIGZ1bmN0aW9uIChlIC8qTW91c2VFdmVudCovKSB7XG4gICAgICAgICAgICBjb25zdCBwb3MgPSBzZWxmLnNvbHV0aW9uc1RhYmxlLmxvY2F0ZShlKTtcbiAgICAgICAgICAgIGlmIChwb3MpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBpdGVtID0gc2VsZi5zb2x1dGlvbnNUYWJsZS5nZXRJdGVtKHBvcy5yb3cpO1xuICAgICAgICAgICAgICAgIGNvbnN0IGFjdGlvbnMgPSBbJ2RlbGV0ZSddO1xuXG4gICAgICAgICAgICAgICAgbWVudS5jbGVhckFsbCgpO1xuICAgICAgICAgICAgICAgIG1lbnUucGFyc2UoYWN0aW9ucyk7XG4gICAgICAgICAgICAgICAgbWVudS5zaG93KGUpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHdlYml4Lmh0bWwucHJldmVudEV2ZW50KGUpO1xuICAgICAgICB9KVxuXG4gICAgfVxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc291cmNlcy92aWV3cy9kZXBsb3llZFNvbHV0aW9ucy9pbmRleC5qcyIsImltcG9ydCB7IEV4dGVybmFsVmlldyB9IGZyb20gXCIuLi9leHRlcm5hbFwiO1xuXG5jb25zdCBVUkwgPSBcIi90aHJlZWJvdC9mYXJtbWFuYWdlbWVudFwiO1xuY29uc3QgUkVRVUlSRURfUEFDS0FHRVMgPSB7XG4gICAgXCJ0aHJlZWJvdC5mYXJtbWFuYWdlbWVudFwiOiBcImh0dHBzOi8vZ2l0aHViLmNvbS90aHJlZWZvbGR0ZWNoL2p1bXBzY2FsZVhfdGhyZWVib3QvdHJlZS9kZXZlbG9wbWVudC9UaHJlZUJvdFBhY2thZ2VzL3RocmVlYm90L2Zhcm1tYW5hZ2VtZW50XCJcbn1cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRmFybW1hbmFnZW1lbnRWaWV3IGV4dGVuZHMgRXh0ZXJuYWxWaWV3IHtcbiAgICBjb25zdHJ1Y3RvcihhcHAsIG5hbWUpIHtcbiAgICAgICAgc3VwZXIoYXBwLCBuYW1lLCBVUkwsIFJFUVVJUkVEX1BBQ0tBR0VTKTtcbiAgICB9XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zb3VyY2VzL3ZpZXdzL2Zhcm1tYW5hZ2VtZW50L2luZGV4LmpzIiwiaW1wb3J0IHsgRXh0ZXJuYWxWaWV3IH0gZnJvbSBcIi4uL2V4dGVybmFsXCI7XG5cbmNvbnN0IFVSTCA9IFwiL3RocmVlZm9sZC9zaW11bGF0b3Ivbm90ZWJvb2svXCI7XG5jb25zdCBSRVFVSVJFRF9QQUNLQUdFUyA9IHtcbiAgICBcInRocmVlZm9sZC5zaW11bGF0b3JcIjogXCJodHRwczovL2dpdGh1Yi5jb20vdGhyZWVmb2xkdGVjaC9qdW1wc2NhbGVYX3RocmVlYm90L3RyZWUvZGV2ZWxvcG1lbnQvVGhyZWVCb3RQYWNrYWdlcy90aHJlZWZvbGQvc2ltdWxhdG9yXCJcbn1cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgSnVweXRlclZpZXcgZXh0ZW5kcyBFeHRlcm5hbFZpZXcge1xuICAgIGNvbnN0cnVjdG9yKGFwcCwgbmFtZSkge1xuICAgICAgICBzdXBlcihhcHAsIG5hbWUsIFVSTCwgUkVRVUlSRURfUEFDS0FHRVMpO1xuICAgIH1cbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NvdXJjZXMvdmlld3MvanVweXRlci9pbmRleC5qcyIsImltcG9ydCB7IEpldFZpZXcgfSBmcm9tIFwid2ViaXgtamV0XCI7XG5cbmltcG9ydCBBcHBMb2dzVmlldyBmcm9tIFwiLi9hcHBMb2dzXCI7XG5pbXBvcnQgeyBsb2dzIH0gZnJvbSBcIi4uLy4uL3NlcnZpY2VzL2xvZ3NcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTG9nc1ZpZXcgZXh0ZW5kcyBKZXRWaWV3IHtcbiAgICBjb25maWcoKSB7XG5cbiAgICAgICAgY29uc3QgdmlldyA9IHtcbiAgICAgICAgICAgIHJvd3M6IFt7XG4gICAgICAgICAgICAgICAgY29sczogW1xuICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICB2aWV3OiBcInRlbXBsYXRlXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICB0eXBlOiBcImhlYWRlclwiLCB0ZW1wbGF0ZTogXCJMb2dzXCIsXG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZpZXc6IFwiY29tYm9cIixcbiAgICAgICAgICAgICAgICAgICAgICAgIGlkOiBcImFwcHNfY29tYm9cIixcbiAgICAgICAgICAgICAgICAgICAgICAgIHBsYWNlaG9sZGVyOiBcIkNob29zZSB5b3VyIGFwcGxpY2F0aW9uXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBhbGlnbjpcInJpZ2h0XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBvbjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlOiBmdW5jdGlvbiAoYXBwTmFtZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLiRzY29wZS5zaG93KGAvbWFpbi9sb2dzYClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy4kc2NvcGUuc2hvd0ZvcihhcHBOYW1lKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmlldzpcImJ1dHRvblwiLCBcbiAgICAgICAgICAgICAgICAgICAgICAgIGlkOlwiYnRuX2RlbGV0ZVwiLCBcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlOlwiRGVsZXRlXCIsIFxuICAgICAgICAgICAgICAgICAgICAgICAgY3NzOlwid2ViaXhfZGFuZ2VyXCIsIFxuICAgICAgICAgICAgICAgICAgICAgICAgaW5wdXRXaWR0aDoxMjAsXG4gICAgICAgICAgICAgICAgICAgICAgICBjbGljazogZnVuY3Rpb24gKCl7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy4kc2NvcGUuZGVsZXRlKClcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmlldzpcImJ1dHRvblwiLCBcbiAgICAgICAgICAgICAgICAgICAgICAgIGlkOlwiYnRuX2RlbGV0ZV9hbGxcIiwgXG4gICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZTpcIkRlbGV0ZSBBbGxcIiwgXG4gICAgICAgICAgICAgICAgICAgICAgICBjc3M6XCJ3ZWJpeF9kYW5nZXJcIiwgXG4gICAgICAgICAgICAgICAgICAgICAgICBhbGlnbjoncmlnaHQnLFxuICAgICAgICAgICAgICAgICAgICAgICAgaW5wdXRXaWR0aDoxMDAsXG4gICAgICAgICAgICAgICAgICAgICAgICBjbGljazogZnVuY3Rpb24gKCl7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy4kc2NvcGUuZGVsZXRlX2FsbCgpXG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIHsgd2lkdGg6MjAgfVxuICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIEFwcExvZ3NWaWV3XG4gICAgICAgICAgICBdXG4gICAgICAgIH07XG5cbiAgICAgICAgcmV0dXJuIHZpZXc7XG4gICAgfVxuXG4gICAgaW5pdCh2aWV3KSB7XG4gICAgICAgIHZpZXcuYXBwc0NvbWJvID0gJCQoXCJhcHBzX2NvbWJvXCIpO1xuICAgICAgICBsb2dzLmxpc3RBcHBzKCkudGhlbihkYXRhID0+IHtcbiAgICAgICAgICAgIHZpZXcuYXBwc0NvbWJvLmRlZmluZShcIm9wdGlvbnNcIiwgZGF0YS5qc29uKCkpO1xuICAgICAgICAgICAgdmlldy5hcHBzQ29tYm8ucmVuZGVyKCk7XG4gICAgICAgIH0pO1xuXG4gICAgfVxuXG4gICAgdXJsQ2hhbmdlKHZpZXcsIHVybCkge1xuICAgICAgICBjb25zdCBhcHBOYW1lID0gdXJsWzBdLnBhcmFtcy5hcHBuYW1lLCBsb2dJZCA9IHVybFswXS5wYXJhbXMubG9naWQ7XG4gICAgICAgIGlmIChhcHBOYW1lKSB7XG4gICAgICAgICAgICB0aGlzLnNob3dGb3IoYXBwTmFtZSwgbG9nSWQpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgc2hvd0ZvcihhcHBOYW1lLCBsb2dJZCkge1xuICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgICAgIHNlbGYuYXBwTG9ncyA9ICQkKFwiYXBwbG9nc190YWJsZVwiKTtcblxuICAgICAgICB3ZWJpeC51aSh7XG4gICAgICAgICAgICB2aWV3OiBcImNvbnRleHRtZW51XCIsXG4gICAgICAgICAgICBpZDogXCJsb2dzX2NtXCIsXG4gICAgICAgICAgICBkYXRhOiBbXCJEZWxldGVcIl1cbiAgICAgICAgfSkuYXR0YWNoVG8oc2VsZi5hcHBMb2dzKTtcblxuICAgICAgICB3ZWJpeC5leHRlbmQoc2VsZi5hcHBMb2dzLCB3ZWJpeC5Qcm9ncmVzc0Jhcik7XG4gICAgICAgIHNlbGYuYXBwTG9ncy5zaG93UHJvZ3Jlc3MoeyBoaWRlOiBmYWxzZSB9KTtcblxuICAgICAgICBsb2dzLmxpc3QoYXBwTmFtZSwgbG9nSWQpLnRoZW4oZGF0YSA9PiB7XG4gICAgICAgICAgICBzZWxmLmFwcExvZ3MuY2xlYXJBbGwoKVxuICAgICAgICAgICAgc2VsZi5hcHBMb2dzLnBhcnNlKGRhdGEuanNvbigpWzBdKVxuICAgICAgICAgICAgc2VsZi5hcHBMb2dzLnNob3dQcm9ncmVzcyh7IGhpZGU6IHRydWUgfSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgICQkKFwibG9nc19jbVwiKS5hdHRhY2hFdmVudChcIm9uTWVudUl0ZW1DbGlja1wiLCBmdW5jdGlvbiAoaWQpIHtcbiAgICAgICAgICAgIGlmIChpZCA9PSBcIkRlbGV0ZVwiKSB7XG4gICAgICAgICAgICAgICAgc2VsZi5kZWxldGVTZWxlY3RlZChzZWxmLmFwcExvZ3MuZ2V0U2VsZWN0ZWRJZCh0cnVlKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGRlbGV0ZSgpe1xuICAgICAgICBsZXQgYXBwbmFtZSA9ICQkKFwiYXBwc19jb21ib1wiKS5nZXRWYWx1ZSgpO1xuICAgICAgICBpZihhcHBuYW1lKXtcbiAgICAgICAgICAgIHdlYml4LmNvbmZpcm0oe1xuICAgICAgICAgICAgICAgIHRpdGxlOiBcIkRlbGV0ZSBsb2dzXCIsXG4gICAgICAgICAgICAgICAgb2s6IFwiRGVsZXRlXCIsXG4gICAgICAgICAgICAgICAgY2FuY2VsOiBcIk5vXCIsXG4gICAgICAgICAgICAgICAgdGV4dDogYERlbGV0ZSAke2FwcG5hbWV9IGxvZ3M/YFxuICAgICAgICAgICAgfSkudGhlbigoKSA9PiB7XG4gICAgICAgICAgICAgICAgbG9ncy5kZWxldGUoYXBwbmFtZSkudGhlbigoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucmVmcmVzaCgpO1xuICAgICAgICAgICAgICAgICAgICB3ZWJpeC5tZXNzYWdlKHsgdHlwZTogXCJzdWNjZXNzXCIsIHRleHQ6IGAke2FwcG5hbWV9IGxvZ3MgZGVsZXRlZCBzdWNjZXNzZnVsbHlgIH0pO1xuICAgICAgICAgICAgICAgIH0pLmNhdGNoKGVycm9yID0+IHtcbiAgICAgICAgICAgICAgICAgICAgd2ViaXgubWVzc2FnZSh7IHR5cGU6IFwiZXJyb3JcIiwgdGV4dDogXCJDb3VsZCBub3QgZGVsZXRlIGxvZ3NcIiB9KTtcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1lbHNle1xuICAgICAgICAgICAgd2ViaXgubWVzc2FnZSh7IHR5cGU6IFwiZXJyb3JcIiwgdGV4dDogXCJQbGVhc2Ugc2VsZWN0IGFwcCBmb3IgZGVsZXRlXCIgfSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBkZWxldGVTZWxlY3RlZChvYmplY3RzKSB7XG4gICAgICAgIHZhciBzZWxmID0gdGhpcztcbiAgICAgICAgc2VsZi5hcHBMb2dzID0gJCQoXCJhcHBsb2dzX3RhYmxlXCIpO1xuXG4gICAgICAgIGxldCBpZHMgPSBbXVxuXG4gICAgICAgIGZvciAobGV0IG9iaiBvZiBvYmplY3RzKSB7XG4gICAgICAgICAgICBpZHMucHVzaChvYmouaWQpO1xuICAgICAgICB9XG5cbiAgICAgICAgd2ViaXguY29uZmlybSh7XG4gICAgICAgICAgICB0aXRsZTogXCJEZWxldGUgc2VsZWN0ZWQgbG9nc1wiLFxuICAgICAgICAgICAgb2s6IFwiWWVzXCIsXG4gICAgICAgICAgICBjYW5jZWw6IFwiTm9cIixcbiAgICAgICAgICAgIHRleHQ6IGBkZWxldGUgbG9ncyB3aXRoIGlkcyAke2lkcy5qb2luKFwiLCBcIil9YFxuICAgICAgICB9KS50aGVuKCgpID0+IHtcbiAgICAgICAgICAgIGxvZ3MuZGVsZXRlU2VsZWN0ZWQoaWRzKS50aGVuKCBkYXRhID0+IHtcbiAgICAgICAgICAgICAgICBzZWxmLmFwcC5yZWZyZXNoKClcbiAgICAgICAgICAgICAgICB3ZWJpeC5tZXNzYWdlKHsgdHlwZTogXCJzdWNjZXNzXCIsIHRleHQ6IFwiTG9ncyBkZWxldGVkXCIgfSk7XG4gICAgICAgICAgICB9KS5jYXRjaChlcnJvciA9PiB7XG4gICAgICAgICAgICAgICAgd2ViaXgubWVzc2FnZSh7IHR5cGU6IFwiZXJyb3JcIiwgdGV4dDogXCJDb3VsZCBub3QgZGVsZXRlIGxvZ3NcIiB9KTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGRlbGV0ZV9hbGwoKXtcbiAgICAgICAgd2ViaXguY29uZmlybSh7XG4gICAgICAgICAgICB0aXRsZTogXCJEZWxldGUgYWxsIGxvZ3NcIixcbiAgICAgICAgICAgIG9rOiBcIkRlbGV0ZVwiLFxuICAgICAgICAgICAgY2FuY2VsOiBcIk5vXCIsXG4gICAgICAgICAgICB0ZXh0OiBgRGVsZXRlIGFsbCBsb2dzP2BcbiAgICAgICAgfSkudGhlbigoKSA9PiB7XG4gICAgICAgICAgICBsb2dzLmRlbGV0ZUFsbCgpLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMucmVmcmVzaCgpO1xuICAgICAgICAgICAgICAgIHdlYml4Lm1lc3NhZ2UoeyB0eXBlOiBcInN1Y2Nlc3NcIiwgdGV4dDogYEFsbCBsb2dzIGRlbGV0ZWQgc3VjY2Vzc2Z1bGx5YCB9KTtcbiAgICAgICAgICAgIH0pLmNhdGNoKGVycm9yID0+IHtcbiAgICAgICAgICAgICAgICB3ZWJpeC5tZXNzYWdlKHsgdHlwZTogXCJlcnJvclwiLCB0ZXh0OiBcIkNvdWxkIG5vdCBkZWxldGUgbG9nc1wiIH0pO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgfSk7XG4gICAgfVxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc291cmNlcy92aWV3cy9sb2dzL2luZGV4LmpzIiwiaW1wb3J0IHsgSmV0VmlldyB9IGZyb20gXCJ3ZWJpeC1qZXRcIjtcblxuaW1wb3J0IHsgRXJyb3JWaWV3IH0gZnJvbSBcIi4uL2Vycm9ycy9kaWFsb2dcIjtcbmltcG9ydCB7IHBhY2thZ2VzIH0gZnJvbSBcIi4uLy4uL3NlcnZpY2VzL3BhY2thZ2VzXCI7XG5pbXBvcnQgUGFja2FnZURldGFpbHNWaWV3IGZyb20gXCIuL3BhY2thZ2VEZXRhaWxzXCJcblxuY29uc3QgVU5LTk9XTl9TVEFUVVMgPSAnVW5rbm93bic7XG5cbmNvbnN0IFBBQ0tBR0VfU1RBVEVTID0gW1xuICAgIHtcbiAgICAgICAgbmFtZTogXCJJbml0XCIsXG4gICAgICAgIGFjdGlvbnM6IFtdXG4gICAgfSxcbiAgICB7XG4gICAgICAgIG5hbWU6IFwiQ29uZmlnXCIsXG4gICAgICAgIGFjdGlvbnM6IFsnaW5zdGFsbCddLFxuICAgIH0sXG4gICAge1xuICAgICAgICBuYW1lOiBcIkluc3RhbGxlZFwiLFxuICAgICAgICBhY3Rpb25zOiBbJ3N0YXJ0J11cbiAgICB9LFxuICAgIHtcbiAgICAgICAgbmFtZTogXCJSdW5uaW5nXCIsXG4gICAgICAgIGFjdGlvbnM6IFtcInN0b3BcIl1cbiAgICB9LFxuICAgIHtcbiAgICAgICAgbmFtZTogXCJIYWx0ZWRcIixcbiAgICAgICAgYWN0aW9uczogW1wic3RhcnRcIiwgXCJkaXNhYmxlXCJdXG4gICAgfSxcbiAgICB7XG4gICAgICAgIG5hbWU6IFwiRGlzYWJsZWRcIixcbiAgICAgICAgYWN0aW9uczogW1wiZW5hYmxlXCJdXG4gICAgfSxcbiAgICB7XG4gICAgICAgIG5hbWU6IFwiRXJyb3JcIixcbiAgICAgICAgYWN0aW9uczogWydpbnN0YWxsJ11cbiAgICB9XG5dO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBQYWNrYWdlc1ZpZXcgZXh0ZW5kcyBKZXRWaWV3IHtcbiAgICBjb25maWcoKSB7XG4gICAgICAgIGNvbnN0IGdyaWQgPSB7XG4gICAgICAgICAgICByb3dzOiBbe1xuICAgICAgICAgICAgICAgIC8vSGVhZGVyXG4gICAgICAgICAgICAgICAgdmlldzogXCJ0ZW1wbGF0ZVwiLFxuICAgICAgICAgICAgICAgIHR5cGU6IFwiaGVhZGVyXCIsXG4gICAgICAgICAgICAgICAgdGVtcGxhdGU6IFwiUGFja2FnZXNcIixcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7IC8vYWRkaW5nIFBhY2thZ2VcbiAgICAgICAgICAgICAgICBjb2xzOiBbe1xuICAgICAgICAgICAgICAgICAgICAvL3NlbGVjdG9yXG4gICAgICAgICAgICAgICAgICAgIHZpZXc6IFwic2VsZWN0XCIsXG4gICAgICAgICAgICAgICAgICAgIGlkOiAnbWV0aG9kX3NlbGVjdG9yJyxcbiAgICAgICAgICAgICAgICAgICAgb3B0aW9uczogW1wiUGF0aFwiLCBcIkdpdHVybFwiXSxcbiAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDEwMFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgLy90ZXh0IGFyZWFcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIHZpZXc6IFwidGV4dFwiLFxuICAgICAgICAgICAgICAgICAgICBpZDogJ3BhY2thZ2VfcGF0aCcsXG4gICAgICAgICAgICAgICAgICAgIGlucHV0QWxpZ246IFwibGVmdFwiLFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgLy9zdWJtaXQgYnV0dG9uXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICB2aWV3OiBcImJ1dHRvblwiLFxuICAgICAgICAgICAgICAgICAgICBpZDogXCJhZGRfcGFja2FnZV9idXR0b25cIixcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU6IFwiQWRkIHBhY2thZ2VcIixcbiAgICAgICAgICAgICAgICAgICAgYXV0b3dpZHRoOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICB0eXBlOiBcIlwiLFxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgeyAvL0RhdGFUYWJsZVxuICAgICAgICAgICAgICAgIHZpZXc6IFwiZGF0YXRhYmxlXCIsXG4gICAgICAgICAgICAgICAgaWQ6IFwicGFja2FnZXNfdGFibGVcIixcbiAgICAgICAgICAgICAgICByZXNpemVDb2x1bW46IHRydWUsXG4gICAgICAgICAgICAgICAgdHlwZToge1xuICAgICAgICAgICAgICAgICAgICBoZWlnaHQ6IDIwMCxcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHNjcm9sbDogXCJ4eVwiLFxuICAgICAgICAgICAgICAgIGF1dG9Db25maWc6IHRydWUsXG4gICAgICAgICAgICAgICAgdmlldzogXCJkYXRhdGFibGVcIixcbiAgICAgICAgICAgICAgICBzZWxlY3Q6IHRydWUsXG4gICAgICAgICAgICAgICAgY3NzOiBcIndlYml4X2hlYWRlcl9ib3JkZXIgd2ViaXhfZGF0YV9ib3JkZXJcIixcbiAgICAgICAgICAgICAgICBvbkNvbnRleHQ6IHt9LFxuICAgICAgICAgICAgICAgIGNvbHVtbnM6IFt7XG4gICAgICAgICAgICAgICAgICAgIGlkOiBcImluZGV4XCIsXG4gICAgICAgICAgICAgICAgICAgIGhlYWRlcjogXCIjXCIsXG4gICAgICAgICAgICAgICAgICAgIHNvcnQ6IFwiaW50XCIsXG4gICAgICAgICAgICAgICAgICAgIGF1dG93aWR0aDogdHJ1ZSxcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgaWQ6IFwiYXV0aG9yXCIsXG4gICAgICAgICAgICAgICAgICAgIGhlYWRlcjogW1wiQXV0aG9yXCIsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRlbnQ6IFwic2VsZWN0RmlsdGVyXCJcbiAgICAgICAgICAgICAgICAgICAgfV0sXG4gICAgICAgICAgICAgICAgICAgIHNvcnQ6IFwic3RyaW5nXCIsXG4gICAgICAgICAgICAgICAgICAgIHdpZHRoOiAyMDBcbiAgICAgICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgICAgIGlkOiBcInNvdXJjZV9uYW1lXCIsXG4gICAgICAgICAgICAgICAgICAgIGhlYWRlcjogW1wiTmFtZVwiLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb250ZW50OiBcInRleHRGaWx0ZXJcIlxuICAgICAgICAgICAgICAgICAgICB9XSxcbiAgICAgICAgICAgICAgICAgICAgc29ydDogXCJzdHJpbmdcIixcbiAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDIwMFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBpZDogXCJzdGF0dXNcIixcbiAgICAgICAgICAgICAgICAgICAgaGVhZGVyOiBcIlN0YXR1c1wiLFxuICAgICAgICAgICAgICAgICAgICBzb3J0OiBcInN0cmluZ1wiLFxuICAgICAgICAgICAgICAgICAgICBmb3JtYXQ6ICh2YWx1ZSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3Qgc3RhdHVzID0gUEFDS0FHRV9TVEFURVNbdmFsdWVdO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHN0YXR1cyAmJiBzdGF0dXMubmFtZSB8fCBVTktOT1dOX1NUQVRVUztcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgICAgIGlkOiBcInBhdGhcIixcbiAgICAgICAgICAgICAgICAgICAgaGVhZGVyOiBcIlBhdGhcIixcbiAgICAgICAgICAgICAgICAgICAgc29ydDogXCJzdHJpbmdcIixcbiAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDcwMFxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgIHNjaGVtZToge1xuICAgICAgICAgICAgICAgICAgICAkaW5pdDogZnVuY3Rpb24gKG9iaikge1xuICAgICAgICAgICAgICAgICAgICAgICAgb2JqLnNvdXJjZV9uYW1lID0gb2JqLnNvdXJjZS5uYW1lO1xuICAgICAgICAgICAgICAgICAgICAgICAgb2JqLmF1dGhvciA9IG9iai5zb3VyY2UudGhyZWVib3Q7XG4gICAgICAgICAgICAgICAgICAgICAgICBvYmouaW5kZXggPSB0aGlzLmNvdW50KCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBdXG4gICAgICAgIH07XG4gICAgICAgIHJldHVybiBncmlkO1xuICAgIH1cblxuICAgIHNob3dFcnJvcihtZXNzYWdlKSB7XG4gICAgICAgIHRoaXMuZXJyb3JWaWV3LnNob3dFcnJvcihtZXNzYWdlKTtcbiAgICB9XG5cbiAgICBoYW5kbGVSZXN1bHQocHJvbWlzZSwgY2FsbGJhY2spIHtcbiAgICAgICAgdGhpcy5wYWNrYWdlVGFibGUuc2hvd1Byb2dyZXNzKHsgaGlkZTogZmFsc2UgfSk7XG5cbiAgICAgICAgcHJvbWlzZS50aGVuKChkYXRhKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBwYWNrYWdlSXRlbSA9IGRhdGEuanNvbigpLnBhY2thZ2U7XG4gICAgICAgICAgICBpZiAoY2FsbGJhY2sgaW5zdGFuY2VvZiBGdW5jdGlvbikge1xuICAgICAgICAgICAgICAgIGNhbGxiYWNrKHBhY2thZ2VJdGVtKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgd2ViaXgubWVzc2FnZSh7XG4gICAgICAgICAgICAgICAgdHlwZTogXCJzdWNjZXNzXCIsXG4gICAgICAgICAgICAgICAgdGV4dDogXCJUaGUgb3BlcmF0aW9uIGhhcyBiZWVkIGRvbmUgc3VjY2Vzc2Z1bGx5XCJcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICB0aGlzLnBhY2thZ2VUYWJsZS5zaG93UHJvZ3Jlc3MoeyBoaWRlOiB0cnVlIH0pO1xuICAgICAgICB9KS5jYXRjaChlcnJvciA9PiB7XG4gICAgICAgICAgICB0aGlzLnNob3dFcnJvcihcIkVycm9yIGhhcyBoYXBwZW5lZCBkdXJpbmcgdGhpcyBvcGVyYXRpb246IFwiICsgZXJyb3IucmVzcG9uc2UsIFwiRXJyb3JcIik7XG4gICAgICAgICAgICB0aGlzLnBhY2thZ2VUYWJsZS5zaG93UHJvZ3Jlc3MoeyBoaWRlOiB0cnVlIH0pO1xuICAgICAgICB9KVxuICAgIH1cblxuICAgIGFkZFBhY2thZ2UocGF0aCwgZ2l0VXJsLCBpdGVtSWQpIHtcbiAgICAgICAgdGhpcy5oYW5kbGVSZXN1bHQocGFja2FnZXMuYWRkKHBhdGgsIGdpdFVybCksIChpdGVtKSA9PiB7XG4gICAgICAgICAgICBpZiAoaXRlbUlkKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5wYWNrYWdlVGFibGUudXBkYXRlSXRlbShpdGVtSWQsIGl0ZW0pO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLnBhY2thZ2VUYWJsZS5hZGQoaXRlbSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGRlbGV0ZVBhY2thZ2UocGFja2FnZU5hbWUsIGl0ZW1JZCkge1xuICAgICAgICB0aGlzLmhhbmRsZVJlc3VsdChwYWNrYWdlcy5kZWxldGUocGFja2FnZU5hbWUpLCAoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLnBhY2thZ2VUYWJsZS5yZW1vdmUoaXRlbUlkKVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBzdGFydFBhY2thZ2UocGFja2FnZU5hbWUsIGl0ZW1JZCkge1xuICAgICAgICB0aGlzLmhhbmRsZVJlc3VsdChwYWNrYWdlcy5zdGFydChwYWNrYWdlTmFtZSksIChpdGVtKSA9PiB7XG4gICAgICAgICAgICB0aGlzLnBhY2thZ2VUYWJsZS51cGRhdGVJdGVtKGl0ZW1JZCwgaXRlbSk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHN0b3BQYWNrYWdlKHBhY2thZ2VOYW1lLCBpdGVtSWQpIHtcbiAgICAgICAgdGhpcy5oYW5kbGVSZXN1bHQocGFja2FnZXMuc3RvcChwYWNrYWdlTmFtZSksIChpdGVtKSA9PiB7XG4gICAgICAgICAgICB0aGlzLnBhY2thZ2VUYWJsZS51cGRhdGVJdGVtKGl0ZW1JZCwgaXRlbSk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGVuYWJsZVBhY2thZ2UocGFja2FnZU5hbWUsIGl0ZW1JZCkge1xuICAgICAgICB0aGlzLmhhbmRsZVJlc3VsdChwYWNrYWdlcy5lbmFibGUocGFja2FnZU5hbWUpLCAoaXRlbSkgPT4ge1xuICAgICAgICAgICAgdGhpcy5wYWNrYWdlVGFibGUudXBkYXRlSXRlbShpdGVtSWQsIGl0ZW0pO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBkaXNhYmxlUGFja2FnZShwYWNrYWdlTmFtZSwgaXRlbUlkKSB7XG4gICAgICAgIHRoaXMuaGFuZGxlUmVzdWx0KHBhY2thZ2VzLmRpc2FibGUocGFja2FnZU5hbWUpLCAoaXRlbSkgPT4ge1xuICAgICAgICAgICAgdGhpcy5wYWNrYWdlVGFibGUudXBkYXRlSXRlbShpdGVtSWQsIGl0ZW0pO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBsb2FkUGFja2FnZXMoKSB7XG4gICAgICAgIHBhY2thZ2VzLmxpc3QoKS50aGVuKGRhdGEgPT4ge1xuICAgICAgICAgICAgdGhpcy5wYWNrYWdlVGFibGUucGFyc2UoZGF0YS5qc29uKCkucGFja2FnZXMpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBpbml0KHZpZXcpIHtcbiAgICAgICAgY29uc3Qgc2VsZiA9IHRoaXM7XG5cbiAgICAgICAgc2VsZi5lcnJvclZpZXcgPSB0aGlzLnVpKEVycm9yVmlldyk7XG4gICAgICAgIHNlbGYucGFja2FnZURldGFpbHNWaWV3ID0gc2VsZi51aShQYWNrYWdlRGV0YWlsc1ZpZXcpO1xuICAgICAgICBzZWxmLl9yZXF1aXJlZHBhY2thZ2VzID0gW1wiemVyb2JvdC5iYXNlXCIsIFwiemVyb2JvdC53ZWJpbnRlcmZhY2VcIiwgXCJ6ZXJvYm90LmFkbWluXCJdXG5cbiAgICAgICAgY29uc3QgbWVudSA9IHdlYml4LnVpKHtcbiAgICAgICAgICAgIHZpZXc6IFwiY29udGV4dG1lbnVcIixcbiAgICAgICAgICAgIGlkOiBcInBhY2thZ2VzX2NtXCJcbiAgICAgICAgfSk7XG5cbiAgICAgICAgdGhpcy5wYWNrYWdlVGFibGUgPSB0aGlzLiQkKFwicGFja2FnZXNfdGFibGVcIik7XG4gICAgICAgIHdlYml4LmV4dGVuZCh0aGlzLnBhY2thZ2VUYWJsZSwgd2ViaXguUHJvZ3Jlc3NCYXIpO1xuXG4gICAgICAgIGZ1bmN0aW9uIGNoZWNrQWN0aW9uKGFjdGlvbiwgc2VsZWN0ZWRJdGVtSWQpIHtcbiAgICAgICAgICAgIGNvbnN0IGl0ZW0gPSBzZWxmLnBhY2thZ2VUYWJsZS5nZXRJdGVtKHNlbGVjdGVkSXRlbUlkKTtcbiAgICAgICAgICAgIGlmIChpdGVtKSB7XG4gICAgICAgICAgICAgICAgbGV0IGl0ZW1JZCA9IGl0ZW0uaWQ7XG4gICAgICAgICAgICAgICAgbGV0IHBhY2thZ2VOYW1lID0gaXRlbS5uYW1lO1xuXG4gICAgICAgICAgICAgICAgaWYgKGFjdGlvbiA9PSAnaW5zdGFsbCcpIHtcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5hZGRQYWNrYWdlKGl0ZW0ucGF0aCwgbnVsbCwgaXRlbUlkKTtcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGFjdGlvbiA9PSAnZGVsZXRlJykge1xuICAgICAgICAgICAgICAgICAgICB3ZWJpeC5jb25maXJtKHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRpdGxlOiBcIkRlbGV0ZSBQYWNrYWdlXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBvazogXCJZZXNcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIHRleHQ6IGBBcmUgeW91IHN1cmUgeW91IHdhbnQgdG8gZGVsZXRlICR7cGFja2FnZU5hbWV9P2AsXG4gICAgICAgICAgICAgICAgICAgICAgICBjYW5jZWw6IFwiTm9cIixcbiAgICAgICAgICAgICAgICAgICAgfSkudGhlbigoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxmLmRlbGV0ZVBhY2thZ2UocGFja2FnZU5hbWUsIGl0ZW1JZClcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIC8vXG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChhY3Rpb24gPT0gJ3N0YXJ0Jykge1xuICAgICAgICAgICAgICAgICAgICBzZWxmLnN0YXJ0UGFja2FnZShwYWNrYWdlTmFtZSwgaXRlbUlkKVxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoYWN0aW9uID09ICdzdG9wJykge1xuICAgICAgICAgICAgICAgICAgICBzZWxmLnN0b3BQYWNrYWdlKHBhY2thZ2VOYW1lLCBpdGVtSWQpXG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChhY3Rpb24gPT0gJ2Rpc2FibGUnKSB7XG4gICAgICAgICAgICAgICAgICAgIHNlbGYuZGlzYWJsZVBhY2thZ2UocGFja2FnZU5hbWUsIGl0ZW1JZClcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGFjdGlvbiA9PSAnZW5hYmxlJykge1xuICAgICAgICAgICAgICAgICAgICBzZWxmLmVuYWJsZVBhY2thZ2UocGFja2FnZU5hbWUsIGl0ZW1JZClcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHdlYml4Lm1lc3NhZ2UoXCJ5b3UgaGF2ZSB0byBzZWxlY3QgYSBwYWNrYWdlXCIpXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICAkJChcImFkZF9wYWNrYWdlX2J1dHRvblwiKS5hdHRhY2hFdmVudChcIm9uSXRlbUNsaWNrXCIsIGZ1bmN0aW9uIChpZCkge1xuICAgICAgICAgICAgbGV0IHBhY2FrZ2VMb2NhdGlvbiA9ICQkKFwicGFja2FnZV9wYXRoXCIpLmdldFZhbHVlKClcbiAgICAgICAgICAgIGlmIChwYWNha2dlTG9jYXRpb24gPT0gXCJcIikge1xuICAgICAgICAgICAgICAgIGFsZXJ0KFwicGxlYXNlIGVudGVyIHBhY2thZ2UgbG9jYXRpb25cIilcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgbGV0IHBhY2thZ2VNZXRob2QgPSAkJChcIm1ldGhvZF9zZWxlY3RvclwiKS5nZXRWYWx1ZSgpXG4gICAgICAgICAgICAgICAgbGV0IGdpdFVybCA9IG51bGw7XG4gICAgICAgICAgICAgICAgbGV0IHBhdGggPSBudWxsO1xuICAgICAgICAgICAgICAgIGlmIChwYWNrYWdlTWV0aG9kID09IFwiR2l0dXJsXCIpIHtcbiAgICAgICAgICAgICAgICAgICAgZ2l0VXJsID0gcGFjYWtnZUxvY2F0aW9uXG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChwYWNrYWdlTWV0aG9kID09IFwiUGF0aFwiKSB7XG4gICAgICAgICAgICAgICAgICAgIHBhdGggPSBwYWNha2dlTG9jYXRpb25cbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBhbGVydChcInNvbWV0aGluZyB3ZW50IHdyb25nIGR1cmluZyBzZWxlY3RpbmcgdGhlIHBhY2thZ2UgbWV0aG9kXCIpXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHNlbGYuYWRkUGFja2FnZShwYXRoLCBnaXRVcmwpXG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgICQkKFwicGFja2FnZXNfY21cIikuYXR0YWNoRXZlbnQoXCJvbk1lbnVJdGVtQ2xpY2tcIiwgZnVuY3Rpb24gKGlkKSB7XG4gICAgICAgICAgICBjaGVja0FjdGlvbihpZCwgc2VsZi5wYWNrYWdlVGFibGUuZ2V0U2VsZWN0ZWRJZCgpKTtcbiAgICAgICAgfSk7XG5cblxuICAgICAgICB3ZWJpeC5ldmVudChzZWxmLnBhY2thZ2VUYWJsZS4kdmlldywgXCJjb250ZXh0bWVudVwiLCBmdW5jdGlvbiAoZSAvKk1vdXNlRXZlbnQqLykge1xuICAgICAgICAgICAgY29uc3QgcG9zID0gc2VsZi5wYWNrYWdlVGFibGUubG9jYXRlKGUpO1xuICAgICAgICAgICAgaWYgKHBvcykge1xuICAgICAgICAgICAgICAgIGNvbnN0IGl0ZW0gPSBzZWxmLnBhY2thZ2VUYWJsZS5nZXRJdGVtKHBvcy5yb3cpO1xuICAgICAgICAgICAgICAgIGlmIChzZWxmLl9yZXF1aXJlZHBhY2thZ2VzLmluY2x1ZGVzKGl0ZW0ubmFtZSkpIHtcbiAgICAgICAgICAgICAgICAgICAgd2ViaXgubWVzc2FnZSh7IHR5cGU6IFwiZXJyb3JcIiwgdGV4dDogYCR7aXRlbS5uYW1lfSBpcyByZXF1aXJlZCBwYWNrYWdlYCB9KTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGNvbnN0IGFjdGlvbnMgPSBbLi4uUEFDS0FHRV9TVEFURVNbaXRlbS5zdGF0dXNdLmFjdGlvbnMsICdkZWxldGUnXTtcblxuICAgICAgICAgICAgICAgIG1lbnUuY2xlYXJBbGwoKTtcbiAgICAgICAgICAgICAgICBtZW51LnBhcnNlKGFjdGlvbnMpO1xuICAgICAgICAgICAgICAgIG1lbnUuc2hvdyhlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiB3ZWJpeC5odG1sLnByZXZlbnRFdmVudChlKTtcbiAgICAgICAgfSlcblxuICAgICAgICBzZWxmLmxvYWRQYWNrYWdlcygpO1xuXG4gICAgICAgIHNlbGYucGFja2FnZVRhYmxlLmF0dGFjaEV2ZW50KFwib25JdGVtRGJsQ2xpY2tcIiwgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgbGV0IGlkID0gc2VsZi5wYWNrYWdlVGFibGUuZ2V0U2VsZWN0ZWRJZCgpXG4gICAgICAgICAgICBsZXQgaXRlbSA9IHNlbGYucGFja2FnZVRhYmxlLmdldEl0ZW0oaWQpXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhpdGVtKVxuICAgICAgICAgICAgbGV0IHBhY2thZ2VEYXRhID0ge1xuICAgICAgICAgICAgICAgICdzb3VyY2VfbmFtZSc6IGl0ZW1bJ3NvdXJjZV9uYW1lJ10sXG4gICAgICAgICAgICAgICAgJ2lkJzogaXRlbVsnaWQnXSxcbiAgICAgICAgICAgICAgICAnc3RhdHVzJzogUEFDS0FHRV9TVEFURVNbaXRlbVsnc3RhdHVzJ11dID9cbiAgICAgICAgICAgICAgICAgICAgUEFDS0FHRV9TVEFURVNbaXRlbVsnc3RhdHVzJ11dLm5hbWUgOlxuICAgICAgICAgICAgICAgICAgICBVTktOT1dOX1NUQVRVUyxcbiAgICAgICAgICAgICAgICAnYXV0aG9yJzogaXRlbVsnc291cmNlJ11bJ3RocmVlYm90J10sXG4gICAgICAgICAgICAgICAgJ2Rlc2NyaXB0aW9uJzogaXRlbVsnc291cmNlJ11bJ2Rlc2NyaXB0aW9uJ10sXG4gICAgICAgICAgICAgICAgJ3ZlcnNpb24nOiBpdGVtWydzb3VyY2UnXVsndmVyc2lvbiddLFxuICAgICAgICAgICAgICAgICdpbnN0YWxsX2t3YXJncyc6IEpTT04uc3RyaW5naWZ5KGl0ZW1bJ2luc3RhbGxfa3dhcmdzJ10pLFxuICAgICAgICAgICAgICAgICdmcm9udGVuZF9hcmdzJzogSlNPTi5zdHJpbmdpZnkoaXRlbVsnZnJvbnRlbmRfYXJncyddKSxcbiAgICAgICAgICAgICAgICAncGF0aCc6IGl0ZW1bJ3BhdGgnXSxcbiAgICAgICAgICAgICAgICAnZ2l0dXJsJzogaXRlbVsnZ2l0dXJsJ11cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHNlbGYucGFja2FnZURldGFpbHNWaWV3LnNob3dQYWNrYWdlRGV0YWlscyhwYWNrYWdlRGF0YSk7XG4gICAgICAgIH0pO1xuICAgIH1cbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NvdXJjZXMvdmlld3MvcGFja2FnZXMvaW5kZXguanMiLCJpbXBvcnQgeyBFeHRlcm5hbFZpZXcgfSBmcm9tIFwiLi4vZXh0ZXJuYWxcIjtcblxuY29uc3QgVVJMID0gXCIvdGhyZWVmb2xkL3Nka2V4YW1wbGVzL25vdGVib29rL1wiO1xuY29uc3QgUkVRVUlSRURfUEFDS0FHRVMgPSB7XG4gICAgXCJ0aHJlZWZvbGQuc2RrZXhhbXBsZXNcIjogXCJodHRwczovL2dpdGh1Yi5jb20vdGhyZWVmb2xkdGVjaC9qdW1wc2NhbGVYX3RocmVlYm90L3RyZWUvZGV2ZWxvcG1lbnQvVGhyZWVCb3RQYWNrYWdlcy90aHJlZWZvbGQvc2RrZXhhbXBsZXNcIlxufVxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBKdXB5dGVyVmlldyBleHRlbmRzIEV4dGVybmFsVmlldyB7XG4gICAgY29uc3RydWN0b3IoYXBwLCBuYW1lKSB7XG4gICAgICAgIHN1cGVyKGFwcCwgbmFtZSwgVVJMLCBSRVFVSVJFRF9QQUNLQUdFUyk7XG4gICAgfVxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc291cmNlcy92aWV3cy9zZGtleGFtcGxlcy9pbmRleC5qcyIsImltcG9ydCB7IEpldFZpZXcgfSBmcm9tIFwid2ViaXgtamV0XCI7XG5cblxuaW1wb3J0IEFkbWluc1ZpZXcgZnJvbSBcIi4vYWRtaW5zXCI7XG5pbXBvcnQgR2VuZXJhbFZpZXcgZnJvbSBcIi4vZ2VuZXJhbFwiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTZXR0aW5nc1ZpZXcgZXh0ZW5kcyBKZXRWaWV3IHtcbiAgICBjb25maWcoKSB7XG4gICAgICAgIGNvbnN0IHZpZXcgPSB7XG4gICAgICAgICAgICB2aWV3OiBcInRhYnZpZXdcIixcbiAgICAgICAgICAgIGNlbGxzOiBbe1xuICAgICAgICAgICAgICAgIGhlYWRlcjogXCJHZW5lcmFsXCIsXG4gICAgICAgICAgICAgICAgYm9keTogR2VuZXJhbFZpZXcsXG4gICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgaGVhZGVyOiBcIkFkbWluaXN0cmF0b3JzXCIsXG4gICAgICAgICAgICAgICAgYm9keTogQWRtaW5zVmlld1xuICAgICAgICAgICAgfV1cbiAgICAgICAgfTtcblxuICAgICAgICByZXR1cm4gdmlldztcbiAgICB9XG5cbiAgICBpbml0KHZpZXcpIHtcbiAgICB9XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zb3VyY2VzL3ZpZXdzL3NldHRpbmdzL2luZGV4LmpzIiwiaW1wb3J0IHsgSmV0VmlldyB9IGZyb20gXCJ3ZWJpeC1qZXRcIjtcblxuaW1wb3J0IFdhbGxldEZvcm1WaWV3IGZyb20gXCIuL3dhbGxldEZvcm1cIjtcbmltcG9ydCBXYWxsZXREZXRhaWxzVmlldyBmcm9tIFwiLi93YWxsZXREZXRhaWxzXCI7XG5pbXBvcnQgV2FsbGV0SW1wb3J0VmlldyBmcm9tICBcIi4vaW1wb3J0Rm9ybVwiXG5pbXBvcnQgeyB3YWxsZXQgfSBmcm9tIFwiLi4vLi4vc2VydmljZXMvd2FsbGV0XCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFdhbGxldE1hbmFnZXJWaWV3IGV4dGVuZHMgSmV0VmlldyB7XG4gICAgY29uZmlnKCkge1xuICAgICAgICBjb25zdCB3YWxsZXRzID0ge1xuICAgICAgICAgICAgdmlldzogXCJkYXRhdGFibGVcIixcbiAgICAgICAgICAgIGlkOiBcIndhbGxldHNfdGFibGVcIixcbiAgICAgICAgICAgIHJlc2l6ZUNvbHVtbjogdHJ1ZSxcbiAgICAgICAgICAgIHNlbGVjdDogdHJ1ZSxcbiAgICAgICAgICAgIG11bHRpc2VsZWN0OiB0cnVlLFxuICAgICAgICAgICAgY3NzOiBcIndlYml4X2hlYWRlcl9ib3JkZXIgd2ViaXhfZGF0YV9ib3JkZXJcIixcbiAgICAgICAgICAgIHNjcm9sbDogdHJ1ZSxcbiAgICAgICAgICAgIGF1dG9Db25maWc6IHRydWUsXG4gICAgICAgICAgICBjb2x1bW5zOiBbe1xuICAgICAgICAgICAgICAgIGlkOiBcImluZGV4XCIsXG4gICAgICAgICAgICAgICAgaGVhZGVyOiBcIiNcIixcbiAgICAgICAgICAgICAgICBzb3J0OiBcImludFwiLFxuICAgICAgICAgICAgICAgIGF1dG93aWR0aDogdHJ1ZSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgaWQ6IFwibmFtZVwiLFxuICAgICAgICAgICAgICAgIGhlYWRlcjogW1wiTmFtZVwiXSxcbiAgICAgICAgICAgICAgICBzb3J0OiBcInN0cmluZ1wiLFxuICAgICAgICAgICAgICAgIGF1dG93aWR0aDogdHJ1ZSxcbiAgICAgICAgICAgICAgICB3aWR0aDogMTQwXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGlkOiBcImFkZHJlc3NcIixcbiAgICAgICAgICAgICAgICBoZWFkZXI6IFtcIkFkZHJlc3NcIl0sXG4gICAgICAgICAgICAgICAgc29ydDogXCJzdHJpbmdcIixcbiAgICAgICAgICAgICAgICBhdXRvd2lkdGg6IHRydWUsXG4gICAgICAgICAgICAgICAgd2lkdGg6ICdhdXRvJ1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgXSxcbiAgICAgICAgICAgIHNjaGVtZToge1xuICAgICAgICAgICAgICAgICRpbml0OiBmdW5jdGlvbiAob2JqKSB7XG4gICAgICAgICAgICAgICAgICAgIG9iai5pbmRleCA9IHRoaXMuY291bnQoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG5cbiAgICAgICAgY29uc3QgdmlldyA9IHtcbiAgICAgICAgICAgIGNvbHM6IFtcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIHZpZXc6IFwidGVtcGxhdGVcIixcbiAgICAgICAgICAgICAgICAgICAgdHlwZTogXCJoZWFkZXJcIiwgdGVtcGxhdGU6IFwiV2FsbGV0c1wiLFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICB2aWV3OlwiYnV0dG9uXCIsIFxuICAgICAgICAgICAgICAgICAgICBpZDpcImJ0bl9jcmVhdGVcIiwgXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlOlwiQ3JlYXRlIFdhbGxldFwiLCBcbiAgICAgICAgICAgICAgICAgICAgY3NzOlwid2ViaXhfc2Vjb25kYXJ5XCIsIFxuICAgICAgICAgICAgICAgICAgICBhdXRvd2lkdGg6dHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgY2xpY2s6IGZ1bmN0aW9uICgpe1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy4kc2NvcGUuV2FsbGV0Rm9ybVZpZXcuc2hvd0Zvcm0oKVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIHZpZXc6XCJidXR0b25cIiwgXG4gICAgICAgICAgICAgICAgICAgIGlkOlwiYnRuX2ltcG9ydFwiLCBcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU6XCJJbXBvcnQgV2FsbGV0XCIsIFxuICAgICAgICAgICAgICAgICAgICBjc3M6XCJ3ZWJpeF9zZWNvbmRhcnlcIiwgXG4gICAgICAgICAgICAgICAgICAgIGF1dG93aWR0aDp0cnVlLFxuICAgICAgICAgICAgICAgICAgICBjbGljazogZnVuY3Rpb24gKCl7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLiRzY29wZS5XYWxsZXRJbXBvcnRWaWV3LnNob3dGb3JtKClcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIF1cbiAgICAgICAgfTtcblxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgcm93czogW1xuICAgICAgICAgICAgICAgIHZpZXcsXG4gICAgICAgICAgICAgICAgd2FsbGV0c1xuICAgICAgICAgICAgXVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgaW5pdCh2aWV3KSB7XG4gICAgICAgIHZhciBzZWxmID0gdGhpcztcblxuICAgICAgICBzZWxmLndhbGxldHNfdGFibGUgPSAkJChcIndhbGxldHNfdGFibGVcIik7XG4gICAgICAgIHNlbGYuV2FsbGV0RGV0YWlsc1ZpZXcgPSBzZWxmLnVpKFdhbGxldERldGFpbHNWaWV3KVxuICAgICAgICBzZWxmLldhbGxldEZvcm1WaWV3ID0gc2VsZi51aShXYWxsZXRGb3JtVmlldyk7XG4gICAgICAgIHNlbGYuV2FsbGV0SW1wb3J0VmlldyA9IHNlbGYudWkoV2FsbGV0SW1wb3J0Vmlldyk7XG4gICAgICAgIFxuICAgICAgICBzZWxmLndhbGxldHNfdGFibGUuYXR0YWNoRXZlbnQoXCJvbkl0ZW1EYmxDbGlja1wiLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB3ZWJpeC5leHRlbmQoc2VsZi53YWxsZXRzX3RhYmxlLCB3ZWJpeC5Qcm9ncmVzc0Jhcik7XG4gICAgICAgICAgICBzZWxmLndhbGxldHNfdGFibGUuc2hvd1Byb2dyZXNzKHtcbiAgICAgICAgICAgICAgICB0eXBlOlwiaWNvblwiLFxuICAgICAgICAgICAgICAgIGhpZGU6IGZhbHNlXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgbGV0IGl0ZW0gPSBzZWxmLndhbGxldHNfdGFibGUuZ2V0U2VsZWN0ZWRJdGVtKClcbiAgICAgICAgICAgIHdhbGxldC5tYW5hZ2VXYWxsZXQoaXRlbS5uYW1lKS50aGVuKGRhdGEgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGRhdGEuanNvbigpKVxuICAgICAgICAgICAgICAgIGxldCByZXMgPSBkYXRhLmpzb24oKVxuICAgICAgICAgICAgICAgIHZhciBpbmZvID0ge1xuICAgICAgICAgICAgICAgICAgICAnbmFtZSc6IGl0ZW0ubmFtZSxcbiAgICAgICAgICAgICAgICAgICAgJ2FkZHJlc3MnOiByZXMuYWRkcmVzcyxcbiAgICAgICAgICAgICAgICAgICAgJ3NlY3JldCc6IHJlcy5zZWNyZXQsXG4gICAgICAgICAgICAgICAgICAgICdiYWxhbmNlcyc6IHJlcy5iYWxhbmNlc1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBzZWxmLndhbGxldHNfdGFibGUuc2hvd1Byb2dyZXNzKHtoaWRlOiB0cnVlfSk7XG4gICAgICAgICAgICAgICAgc2VsZi5XYWxsZXREZXRhaWxzVmlldy5zaG93SW5mbyhpbmZvKVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHVybENoYW5nZSh2aWV3LCB1cmwpIHtcbiAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgIFxuICAgICAgICBzZWxmLndhbGxldHNfdGFibGUgPSAgJCQoXCJ3YWxsZXRzX3RhYmxlXCIpO1xuICAgICAgICB3YWxsZXQuZ2V0V2FsbGV0cygpLnRoZW4oZGF0YSA9PiB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhkYXRhLmpzb24oKSlcbiAgICAgICAgICAgIHNlbGYud2FsbGV0c190YWJsZS5wYXJzZShkYXRhLmpzb24oKSlcbiAgICAgICAgfSk7XG4gICAgfVxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc291cmNlcy92aWV3cy93YWxsZXRzTWFuYWdlci9pbmRleC5qcyIsImltcG9ydCB7IEpldFZpZXcgfSBmcm9tIFwid2ViaXgtamV0XCI7XG5pbXBvcnQgeyBwYWNrYWdlcyB9IGZyb20gXCIuLi8uLi9zZXJ2aWNlcy93aWtpXCI7XG5cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgV2lraXNWaWV3IGV4dGVuZHMgSmV0VmlldyB7XG4gICAgY29uZmlnKCkge1xuICAgICAgICBjb25zdCB2aWV3ID0ge1xuICAgICAgICAgICAgdmlldzogXCJkYXRhdGFibGVcIixcbiAgICAgICAgICAgIGlkOiBcIndpa2lzX3RhYmxlXCIsXG4gICAgICAgICAgICByZXNpemVDb2x1bW46IHRydWUsXG4gICAgICAgICAgICBzZWxlY3Q6IHRydWUsXG4gICAgICAgICAgICBtdWx0aXNlbGVjdDogdHJ1ZSxcbiAgICAgICAgICAgIGNzczogXCJ3ZWJpeF9oZWFkZXJfYm9yZGVyIHdlYml4X2RhdGFfYm9yZGVyXCIsXG4gICAgICAgICAgICBjb2x1bW5zOiBbe1xuICAgICAgICAgICAgICAgIGlkOiBcImluZGV4XCIsXG4gICAgICAgICAgICAgICAgaGVhZGVyOiBcIiNcIixcbiAgICAgICAgICAgICAgICBzb3J0OiBcImludFwiLFxuICAgICAgICAgICAgICAgIGF1dG93aWR0aDogdHJ1ZSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgaWQ6IFwibmFtZVwiLFxuICAgICAgICAgICAgICAgIGhlYWRlcjogXCJQYWNrYWdlXCIsXG4gICAgICAgICAgICAgICAgc29ydDogXCJzdHJpbmdcIixcbiAgICAgICAgICAgICAgICB3aWR0aDogMzAwXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGlkOiBcImFjdGlvbnNcIixcbiAgICAgICAgICAgICAgICBoZWFkZXI6IFwiQWN0aW9uc1wiLFxuICAgICAgICAgICAgICAgIHNvcnQ6IFwic3RyaW5nXCIsXG4gICAgICAgICAgICAgICAgd2lkdGg6IDIwMCxcbiAgICAgICAgICAgICAgICB0ZW1wbGF0ZTpmdW5jdGlvbihvYmopeyBcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFwiPGRpdiBjbGFzcz0nd2ViaXhfZWxfYnV0dG9uJz48YnV0dG9uIGNsYXNzPSdidG5fdmlldyc+IFZpZXcgPC9idXR0b24+PC9kaXY+XCI7XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIH1dLFxuICAgICAgICAgICAgb25DbGljazp7XG4gICAgICAgICAgICAgICAgYnRuX3ZpZXc6ZnVuY3Rpb24oZXYsIGlkKXtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGl0ZW0gPSB0aGlzLmdldEl0ZW0oaWQpO1xuICAgICAgICAgICAgICAgICAgICB3aW5kb3cubG9jYXRpb24uaHJlZiA9IGAvYWRtaW4vIyEvbWFpbi93aWtpcy52aWV3P25hbWU9JHtpdGVtLm5hbWV9YFxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGF1dG9Db25maWc6IHRydWUsXG4gICAgICAgICAgICBzY2hlbWU6IHtcbiAgICAgICAgICAgICAgICAkaW5pdDogZnVuY3Rpb24gKG9iaikge1xuICAgICAgICAgICAgICAgICAgICBvYmouaW5kZXggPSB0aGlzLmNvdW50KCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgfTtcblxuICAgICAgICByZXR1cm4gdmlldztcbiAgICB9XG5cbiAgICBpbml0KHZpZXcpIHtcbiAgICAgICAgcGFja2FnZXMubGlzdCgpLnRoZW4oZGF0YSA9PiB7XG4gICAgICAgICAgICB2aWV3LnBhcnNlKGRhdGEuanNvbigpKVxuICAgICAgICB9KTtcbiAgICB9XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zb3VyY2VzL3ZpZXdzL3dpa2lzL2luZGV4LmpzIiwiaW1wb3J0IHsgSmV0VmlldyB9IGZyb20gXCJ3ZWJpeC1qZXRcIjtcblxuaW1wb3J0IHsgYW5zaVVwIH0gZnJvbSBcIi4uLy4uL2NvbW1vbi9jb2xvcnNcIjtcbmltcG9ydCB7IExFVkVMUywgU1RBVEVTLCBUWVBFUyB9IGZyb20gXCIuL2RhdGFcIjtcbmltcG9ydCB7IGRhdGVGb3JtYXR0ZXIgfSBmcm9tIFwiLi4vLi4vY29tbW9uL2Zvcm1hdHRlcnNcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQWxlcnRWaWV3IGV4dGVuZHMgSmV0VmlldyB7XG4gICAgY29uZmlnKCkge1xuICAgICAgICBjb25zdCBpbmZvID0ge1xuICAgICAgICAgICAgdmlldzogXCJmb3JtXCIsXG4gICAgICAgICAgICBpZDogXCJmb3JtXCIsXG4gICAgICAgICAgICBlbGVtZW50c0NvbmZpZzogeyBsYWJlbFdpZHRoOiAxNDAgfSxcbiAgICAgICAgICAgIGVsZW1lbnRzOiBbXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICB2aWV3OiBcInRleHRcIixcbiAgICAgICAgICAgICAgICAgICAgbGFiZWw6IFwiSURcIixcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJpZGVudGlmaWVyXCIsXG4gICAgICAgICAgICAgICAgICAgIHJlYWRvbmx5OiB0cnVlXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIHZpZXc6IFwidGV4dFwiLFxuICAgICAgICAgICAgICAgICAgICBsYWJlbDogXCJUeXBlXCIsXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiYWxlcnRfdHlwZVwiLFxuICAgICAgICAgICAgICAgICAgICByZWFkb25seTogdHJ1ZVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICB2aWV3OiBcInRleHRcIixcbiAgICAgICAgICAgICAgICAgICAgbGFiZWw6IFwiU3RhdHVzXCIsXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwic3RhdHVzXCIsXG4gICAgICAgICAgICAgICAgICAgIHJlYWRvbmx5OiB0cnVlXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIHZpZXc6IFwidGV4dFwiLFxuICAgICAgICAgICAgICAgICAgICBsYWJlbDogXCJMZXZlbFwiLFxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImxldmVsXCIsXG4gICAgICAgICAgICAgICAgICAgIHJlYWRvbmx5OiB0cnVlXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIHZpZXc6IFwidGV4dFwiLFxuICAgICAgICAgICAgICAgICAgICBsYWJlbDogXCJDb3VudFwiLFxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImNvdW50XCIsXG4gICAgICAgICAgICAgICAgICAgIHJlYWRvbmx5OiB0cnVlXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIHZpZXc6IFwidGV4dFwiLFxuICAgICAgICAgICAgICAgICAgICBsYWJlbDogXCJDYXRlZ29yeVwiLFxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImNhdFwiLFxuICAgICAgICAgICAgICAgICAgICByZWFkb25seTogdHJ1ZVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICB2aWV3OiBcInRleHRcIixcbiAgICAgICAgICAgICAgICAgICAgbGFiZWw6IFwiRmlyc3QgdGltZVwiLFxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcInRpbWVfZmlyc3RcIixcbiAgICAgICAgICAgICAgICAgICAgcmVhZG9ubHk6IHRydWVcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgdmlldzogXCJ0ZXh0XCIsXG4gICAgICAgICAgICAgICAgICAgIGxhYmVsOiBcIkxhc3QgdGltZVwiLFxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcInRpbWVfbGFzdFwiLFxuICAgICAgICAgICAgICAgICAgICByZWFkb25seTogdHJ1ZVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICB2aWV3OiBcInRleHRcIixcbiAgICAgICAgICAgICAgICAgICAgbGFiZWw6IFwiTWVzc2FnZSAocHViKVwiLFxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcInB1YmxpY1wiLFxuICAgICAgICAgICAgICAgICAgICByZWFkb25seTogdHJ1ZSxcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgXVxuICAgICAgICB9O1xuXG4gICAgICAgIGNvbnN0IHRhYiA9IHtcbiAgICAgICAgICAgIHZpZXc6IFwidGFidmlld1wiLFxuICAgICAgICAgICAgY2VsbHM6IFtcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIGhlYWRlcjogXCJJbmZvcm1hdGlvblwiLFxuICAgICAgICAgICAgICAgICAgICBib2R5OiBpbmZvLFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBoZWFkZXI6IFwiTWVzc2FnZVwiLFxuICAgICAgICAgICAgICAgICAgICBib2R5OiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZDogXCJtZXNzYWdlXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICB2aWV3OiBcInRlbXBsYXRlXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICB0ZW1wbGF0ZTogXCJcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIHNjcm9sbDogXCJhdXRvXCIsXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgaGVhZGVyOiBcIlRyYWNlYmFja3NcIixcbiAgICAgICAgICAgICAgICAgICAgYm9keToge1xuICAgICAgICAgICAgICAgICAgICAgICAgcm93czogW1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmlldzogXCJ0YWJiYXJcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWQ6IFwidGJfdGFic1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtdWx0aXZpZXc6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9wdGlvbnM6IFtdXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZpZXc6IFwibXVsdGl2aWV3XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlkOiBcInRiX3ZpZXdzXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNlbGxzOiBbXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGVtcGxhdGU6IFwiXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBpZDogXCJsb2dzXCIsXG4gICAgICAgICAgICAgICAgICAgIHZpZXc6IFwiZGF0YXRhYmxlXCIsXG4gICAgICAgICAgICAgICAgICAgIHJlc2l6ZUNvbHVtbjogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgc2VsZWN0OiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICBtdWx0aXNlbGVjdDogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgY3NzOiBcIndlYml4X2hlYWRlcl9ib3JkZXIgd2ViaXhfZGF0YV9ib3JkZXJcIixcbiAgICAgICAgICAgICAgICAgICAgc2Nyb2xsOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICBhdXRvQ29uZmlnOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICBjb2x1bW5zOiBbXG4gICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWQ6IFwiaW5kZXhcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBoZWFkZXI6IFwiI1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNvcnQ6IFwiaW50XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYXV0b3dpZHRoOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdpZHRoOiA2MFxuICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZDogXCJ0aHJlZWJvdF9uYW1lXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaGVhZGVyOiBcIlRocmVlYm90IE5hbWVcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzb3J0OiBcInN0cmluZ1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdpZHRoOiAxODBcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWQ6IFwiYXBwX25hbWVcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBoZWFkZXI6IFwiQXBwIE5hbWVcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzb3J0OiBcInN0cmluZ1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdpZHRoOiAxODBcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWQ6IFwibGF0ZXN0X2xvZ2lkXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaGVhZGVyOiBcIkxhdGVzdCBMb2cjXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc29ydDogXCJpbnRcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aWR0aDogMTgwXG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgICAgIHNjaGVtZToge1xuICAgICAgICAgICAgICAgICAgICAgICAgJGluaXQ6IGZ1bmN0aW9uIChvYmopIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvYmouaW5kZXggPSB0aGlzLmNvdW50KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgXVxuICAgICAgICB9O1xuXG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICB2aWV3OiBcIndpbmRvd1wiLFxuICAgICAgICAgICAgaGVhZDogXCJBbGVydFwiLFxuICAgICAgICAgICAgbW9kYWw6IHRydWUsXG4gICAgICAgICAgICB3aWR0aDogd2luZG93LmlubmVyV2lkdGggKiAuOCxcbiAgICAgICAgICAgIGhlaWdodDogd2luZG93LmlubmVySGVpZ2h0ICogLjgsXG4gICAgICAgICAgICBwb3NpdGlvbjogXCJjZW50ZXJcIixcbiAgICAgICAgICAgIGJvZHk6IHtcbiAgICAgICAgICAgICAgICByb3dzOiBbXG4gICAgICAgICAgICAgICAgICAgIHRhYixcbiAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmlldzogXCJidXR0b25cIixcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlOiBcIk9LXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBjc3M6IFwid2ViaXhfcHJpbWFyeVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgY2xpY2s6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmdldFRvcFBhcmVudFZpZXcoKS5oaWRlKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cblxuICAgIGluaXQoKSB7XG4gICAgICAgIHZhciBzZWxmID0gdGhpcztcbiAgICAgICAgdGhpcy5mb3JtID0gJCQoXCJmb3JtXCIpO1xuICAgICAgICB0aGlzLm1lc3NhZ2UgPSAkJChcIm1lc3NhZ2VcIik7XG4gICAgICAgIHRoaXMubG9ncyA9ICQkKFwibG9nc1wiKTtcblxuICAgICAgICB0aGlzLnRiVmlld3MgPSAkJChcInRiX3ZpZXdzXCIpO1xuICAgICAgICB0aGlzLnRiVGFicyA9ICQkKFwidGJfdGFic1wiKTtcblxuICAgICAgICB0aGlzLmxvZ3MuYXR0YWNoRXZlbnQoXCJvbkl0ZW1EYmxDbGlja1wiLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBsZXQgbG9nRGF0YSA9IHNlbGYubG9ncy5nZXRTZWxlY3RlZEl0ZW0oKVxuICAgICAgICAgICAgdGhpcy4kc2NvcGUuc2hvdyhgL21haW4vbG9ncz9hcHBuYW1lPSR7bG9nRGF0YS5hcHBfbmFtZX0mbG9naWQ9JHtsb2dEYXRhLmxhdGVzdF9sb2dpZH1gKVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBhZGRUcmFjZWJhY2sodGIpIHtcbiAgICAgICAgY29uc3QgdGJJZCA9IGAke3RiLnRocmVlYm90X25hbWV9XyR7dGIucHJvY2Vzc19pZH1gO1xuICAgICAgICBjb25zdCB0YlRpdGxlID0gYCR7dGIudGhyZWVib3RfbmFtZX0gLSBQSUQ6ICgke3RiLnByb2Nlc3NfaWR9KWA7XG5cbiAgICAgICAgdGhpcy50YlZpZXdzLmFkZFZpZXcoe1xuICAgICAgICAgICAgdmlldzogXCJ0ZW1wbGF0ZVwiLFxuICAgICAgICAgICAgaWQ6IHRiSWQsXG4gICAgICAgICAgICBzY3JvbGw6IFwieHlcIixcbiAgICAgICAgICAgIHRlbXBsYXRlOiBgPHA+JHthbnNpVXAuYW5zaV90b19odG1sKHRiLmZvcm1hdHRlZCl9PC9wPmBcbiAgICAgICAgfSk7XG5cbiAgICAgICAgdGhpcy50YlRhYnMuYWRkT3B0aW9uKHRiSWQsIHRiVGl0bGUsIHRydWUpO1xuICAgIH1cblxuICAgIGNsZWFyVHJhY2VCYWNrcygpIHtcbiAgICAgICAgbGV0IGlkID0gdGhpcy50YlRhYnMuZ2V0VmFsdWUoKTtcblxuICAgICAgICB3aGlsZSAoaWQpIHtcbiAgICAgICAgICAgIHRoaXMudGJUYWJzLnJlbW92ZU9wdGlvbihpZCk7XG4gICAgICAgICAgICB0aGlzLnRiVmlld3MucmVtb3ZlVmlldyhpZCk7XG5cbiAgICAgICAgICAgIGlkID0gdGhpcy50YlRhYnMuZ2V0VmFsdWUoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHNob3dGb3IoaXRlbSkge1xuICAgICAgICBsZXQgdmFsdWVzID0gT2JqZWN0LmFzc2lnbih7fSwgaXRlbSk7XG5cbiAgICAgICAgdmFsdWVzLmFsZXJ0X3R5cGUgPSBUWVBFU1tpdGVtLmFsZXJ0X3R5cGVdO1xuICAgICAgICB2YWx1ZXMuc3RhdHVzID0gU1RBVEVTW2l0ZW0uc3RhdHVzXTtcbiAgICAgICAgdmFsdWVzLmxldmVsID0gTEVWRUxTW2l0ZW0ubGV2ZWxdO1xuICAgICAgICB2YWx1ZXMudGltZV9maXJzdCA9IGRhdGVGb3JtYXR0ZXIoaXRlbS50aW1lX2ZpcnN0KTtcbiAgICAgICAgdmFsdWVzLnRpbWVfbGFzdCA9IGRhdGVGb3JtYXR0ZXIoaXRlbS50aW1lX2xhc3QpO1xuICAgICAgICB0aGlzLmZvcm0uc2V0VmFsdWVzKHZhbHVlcyk7XG5cbiAgICAgICAgdGhpcy5tZXNzYWdlLnNldEhUTUwoYDxwPiR7YW5zaVVwLmFuc2lfdG9faHRtbChpdGVtLm1lc3NhZ2UpfTwvcD5gKTtcblxuICAgICAgICB0aGlzLmNsZWFyVHJhY2VCYWNrcygpO1xuXG4gICAgICAgIGZvciAobGV0IHRiIG9mIGl0ZW0udHJhY2ViYWNrcykge1xuICAgICAgICAgICAgdGhpcy5hZGRUcmFjZWJhY2sodGIpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5sb2dzLmNsZWFyQWxsKClcbiAgICAgICAgdGhpcy5sb2dzLnBhcnNlKGl0ZW0ubG9ncyk7XG5cbiAgICAgICAgdGhpcy5nZXRSb290KCkuc2hvdygpO1xuICAgIH1cbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NvdXJjZXMvdmlld3MvYWxlcnRzL2FsZXJ0LmpzIiwiaW1wb3J0IHsgU2VydmljZSB9IGZyb20gXCIuLi9jb21tb24vYXBpXCI7XG5cbmNvbnN0IEJBU0VfVVJMID0gXCIvemVyb2JvdC9hZG1pbi9hY3RvcnMvYWRtaW5cIjtcblxuY2xhc3MgQWRtaW5TZXJ2aWNlIGV4dGVuZHMgU2VydmljZSB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHN1cGVyKEJBU0VfVVJMKTtcbiAgICB9XG5cbiAgICBsaXN0KCkge1xuICAgICAgICByZXR1cm4gdGhpcy5nZXRDYWxsKFwiYWRtaW5fbGlzdFwiKTtcbiAgICB9XG5cblxuICAgIGFkZChuYW1lKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnBvc3RDYWxsKFwiYWRtaW5fYWRkXCIsIHtcbiAgICAgICAgICAgIFwibmFtZVwiOiBuYW1lXG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGRlbGV0ZShuYW1lKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnBvc3RDYWxsKFwiYWRtaW5fZGVsZXRlXCIsIHtcbiAgICAgICAgICAgIFwibmFtZVwiOiBuYW1lXG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGdldF9leHBsb3JlcigpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0Q2FsbCgnZ2V0X2V4cGxvcmVyJyk7XG4gICAgfVxuXG4gICAgc2V0X2V4cGxvcmVyKHR5cGUpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucG9zdENhbGwoJ3NldF9leHBsb3JlcicsIHtcbiAgICAgICAgICAgIGV4cGxvcmVyX3R5cGU6IHR5cGVcbiAgICAgICAgfSlcbiAgICB9XG59XG5cbmV4cG9ydCBjb25zdCBhZG1pbiA9IG5ldyBBZG1pblNlcnZpY2UoKTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NvdXJjZXMvc2VydmljZXMvYWRtaW4uanMiLCJpbXBvcnQgeyBTZXJ2aWNlIH0gZnJvbSBcIi4uL2NvbW1vbi9hcGlcIjtcblxuY29uc3QgQkFTRV9VUkwgPSBcIi90ZmdyaWQvdGFpZ2EvYWN0b3JzL3RhaWdhXCI7XG5cblxuY2xhc3MgVGFpZ2FTZXJ2aWNlIGV4dGVuZHMgU2VydmljZSB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHN1cGVyKEJBU0VfVVJMKTtcbiAgICB9XG5cbiAgICB1c2VyQ2lyY2xlcyh1c2VybmFtZSkge1xuICAgICAgICByZXR1cm4gdGhpcy5wb3N0Q2FsbChcImdldF91c2VyX2NpcmNsZXNcIiwgeyB1c2VybmFtZTogdXNlcm5hbWUsIG91dHB1dF90eXBlOiBcImpzb25cIiB9KTtcbiAgICB9XG5cbiAgICB1c2VyU3Rvcmllcyh1c2VybmFtZSkge1xuICAgICAgICByZXR1cm4gdGhpcy5wb3N0Q2FsbChcImdldF91c2VyX3N0b3JpZXNcIiwgeyB1c2VybmFtZTogdXNlcm5hbWUsIG91dHB1dF90eXBlOiBcImpzb25cIiB9KTtcbiAgICB9XG5cbiAgICB1c2VyVGFza3ModXNlcm5hbWUpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucG9zdENhbGwoXCJnZXRfdXNlcl90YXNrc1wiLCB7IHVzZXJuYW1lOiB1c2VybmFtZSwgb3V0cHV0X3R5cGU6IFwianNvblwiIH0pO1xuICAgIH1cblxufVxuXG5cbmV4cG9ydCBjb25zdCB0YWlnYSA9IG5ldyBUYWlnYVNlcnZpY2UoKTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NvdXJjZXMvc2VydmljZXMvdGFpZ2EuanMiLCJpbXBvcnQgeyBKZXRWaWV3IH0gZnJvbSBcIndlYml4LWpldFwiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBQcm9jZXNzRGV0YWlsc1ZpZXcgZXh0ZW5kcyBKZXRWaWV3IHtcbiAgICBjb25maWcoKSB7XG4gICAgICAgIGNvbnN0IGluZm8gPSB7XG4gICAgICAgICAgICB2aWV3OiBcImZvcm1cIixcbiAgICAgICAgICAgIGlkOiBcImZvcm1cIixcbiAgICAgICAgICAgIGVsZW1lbnRzQ29uZmlnOiB7IGxhYmVsV2lkdGg6IDIwMCB9LFxuICAgICAgICAgICAgZWxlbWVudHM6IFtcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIHZpZXc6IFwidGV4dFwiLFxuICAgICAgICAgICAgICAgICAgICBsYWJlbDogXCJQcm9jZXNzXCIsXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwibmFtZVwiLFxuICAgICAgICAgICAgICAgICAgICByZWFkb25seTogdHJ1ZSxcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgdmlldzogXCJ0ZXh0XCIsXG4gICAgICAgICAgICAgICAgICAgIGxhYmVsOiBcIlBJRFwiLFxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcInBpZFwiLFxuICAgICAgICAgICAgICAgICAgICByZWFkb25seTogdHJ1ZVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICB2aWV3OiBcInRleHRcIixcbiAgICAgICAgICAgICAgICAgICAgbGFiZWw6IFwiQ21kIGxpbmVcIixcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJjbWRsaW5lXCIsXG4gICAgICAgICAgICAgICAgICAgIHJlYWRvbmx5OiB0cnVlXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICxcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIHZpZXc6IFwidGV4dFwiLFxuICAgICAgICAgICAgICAgICAgICBsYWJlbDogXCJVc2VybmFtZVwiLFxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcInVzZXJuYW1lXCIsXG4gICAgICAgICAgICAgICAgICAgIHJlYWRvbmx5OiB0cnVlXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIHZpZXc6IFwidGV4dFwiLFxuICAgICAgICAgICAgICAgICAgICBsYWJlbDogXCJNZW1vcnkgdXNhZ2UgaW4gTUJcIixcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJyc3NcIixcbiAgICAgICAgICAgICAgICAgICAgcmVhZG9ubHk6IHRydWVcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgdmlldzogXCJ0ZXh0XCIsXG4gICAgICAgICAgICAgICAgICAgIGxhYmVsOiBcIlN0YXR1c1wiLFxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcInN0YXR1c1wiLFxuICAgICAgICAgICAgICAgICAgICByZWFkb25seTogdHJ1ZVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICB2aWV3OiBcInRleHRcIixcbiAgICAgICAgICAgICAgICAgICAgbGFiZWw6IFwiQ3JlYXRpb24gdGltZVwiLFxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImNyZWF0ZV90aW1lXCIsXG4gICAgICAgICAgICAgICAgICAgIHJlYWRvbmx5OiB0cnVlXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIHZpZXc6IFwidGV4dFwiLFxuICAgICAgICAgICAgICAgICAgICBsYWJlbDogXCJDUFUgLSB1c2VyIG1vZGUgKHNlY29uZHMpXCIsXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiY3B1X3VzZXJcIixcbiAgICAgICAgICAgICAgICAgICAgcmVhZG9ubHk6IHRydWVcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgdmlldzogXCJ0ZXh0XCIsXG4gICAgICAgICAgICAgICAgICAgIGxhYmVsOiBcIkNQVSAtIGtlcm5lbCBtb2RlIChzZWNvbmRzKVwiLFxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImNwdV9zeXN0ZW1cIixcbiAgICAgICAgICAgICAgICAgICAgcmVhZG9ubHk6IHRydWVcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgdmlldzogXCJ0ZXh0XCIsXG4gICAgICAgICAgICAgICAgICAgIGxhYmVsOiBcIk51bWJlciBvZiB0aHJlYWRzXCIsXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwidGhyZWFkc1wiLFxuICAgICAgICAgICAgICAgICAgICByZWFkb25seTogdHJ1ZVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICB2aWV3OiBcInRleHRcIixcbiAgICAgICAgICAgICAgICAgICAgbGFiZWw6IFwiTnVtYmVyIG9mIGZkcyBvcGVuZWRcIixcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJmZHNcIixcbiAgICAgICAgICAgICAgICAgICAgcmVhZG9ubHk6IHRydWVcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgdmlldzogXCJ0ZXh0XCIsXG4gICAgICAgICAgICAgICAgICAgIGxhYmVsOiBcIlBhcmVudCBwcm9jZXNzIHBpZFwiLFxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcInBhcmVudF9waWRcIixcbiAgICAgICAgICAgICAgICAgICAgcmVhZG9ubHk6IHRydWVcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgdmlldzogXCJ0ZXh0XCIsXG4gICAgICAgICAgICAgICAgICAgIGxhYmVsOiBcIlBhcmVudCBwcm9jZXNzIG5hbWVcIixcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJwYXJlbnRfbmFtZVwiLFxuICAgICAgICAgICAgICAgICAgICByZWFkb25seTogdHJ1ZVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIF1cbiAgICAgICAgfTtcblxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgdmlldzogXCJ3aW5kb3dcIixcbiAgICAgICAgICAgIGhlYWQ6IFwiUHJvY2VzcyBEZXRhaWxzXCIsXG4gICAgICAgICAgICBtb2RhbDogdHJ1ZSxcbiAgICAgICAgICAgIHdpZHRoOiB3aW5kb3cuaW5uZXJXaWR0aCAqIC44LFxuICAgICAgICAgICAgaGVpZ2h0OiB3aW5kb3cuaW5uZXJIZWlnaHQgKiAuOCxcbiAgICAgICAgICAgIHBvc2l0aW9uOiBcImNlbnRlclwiLFxuICAgICAgICAgICAgYm9keToge1xuICAgICAgICAgICAgICAgIHJvd3M6IFtcbiAgICAgICAgICAgICAgICAgICAgaW5mbyxcbiAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmlldzogXCJidXR0b25cIixcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlOiBcIk9LXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBjc3M6IFwid2ViaXhfcHJpbWFyeVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgY2xpY2s6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmdldFRvcFBhcmVudFZpZXcoKS5oaWRlKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBzaG93UHJvY2Vzc0RldGFpbHMoZGF0YSkge1xuICAgICAgICB0aGlzLmZvcm0ucGFyc2UoZGF0YSlcbiAgICAgICAgdGhpcy5nZXRSb290KCkuc2hvdygpO1xuICAgIH1cblxuICAgIGluaXQoKSB7XG4gICAgICAgIHRoaXMuZm9ybSA9ICQkKFwiZm9ybVwiKTtcbiAgICB9XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zb3VyY2VzL3ZpZXdzL2Rhc2gvcHJvY2Vzc0RldGFpbHMuanMiLCJpbXBvcnQgeyBKZXRWaWV3IH0gZnJvbSBcIndlYml4LWpldFwiO1xuXG5pbXBvcnQgeyBhbnNpVXAgfSBmcm9tIFwiLi4vLi4vY29tbW9uL2NvbG9yc1wiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBSZXNlcnZhdGlvblZpZXcgZXh0ZW5kcyBKZXRWaWV3IHtcbiAgICBjb25maWcoKSB7XG4gICAgICAgIGNvbnN0IGluZm8gPSB7XG4gICAgICAgICAgICB2aWV3OiBcImZvcm1cIixcbiAgICAgICAgICAgIGlkOiBcImZvcm1cIixcbiAgICAgICAgICAgIGVsZW1lbnRzQ29uZmlnOiB7IGxhYmVsV2lkdGg6IDE0MCB9LFxuICAgICAgICAgICAgZWxlbWVudHM6IFtcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIHZpZXc6IFwidGV4dFwiLFxuICAgICAgICAgICAgICAgICAgICBsYWJlbDogXCJJRFwiLFxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImlkXCIsXG4gICAgICAgICAgICAgICAgICAgIHJlYWRvbmx5OiB0cnVlXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIHZpZXc6IFwidGV4dFwiLFxuICAgICAgICAgICAgICAgICAgICBsYWJlbDogXCJDdXN0b21lciB0aWRcIixcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJjdXN0b21lcl90aWRcIixcbiAgICAgICAgICAgICAgICAgICAgcmVhZG9ubHk6IHRydWVcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgdmlldzogXCJ0ZXh0XCIsXG4gICAgICAgICAgICAgICAgICAgIGxhYmVsOiBcIk5leHQgYWN0aW9uXCIsXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwibmV4dF9hY3Rpb25cIixcbiAgICAgICAgICAgICAgICAgICAgcmVhZG9ubHk6IHRydWVcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgdmlldzogXCJ0ZXh0XCIsXG4gICAgICAgICAgICAgICAgICAgIGxhYmVsOiBcImV4cGlyYXRpb25cIixcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJleHBpcmF0aW9uXCIsXG4gICAgICAgICAgICAgICAgICAgIHJlYWRvbmx5OiB0cnVlXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgXVxuICAgICAgICB9O1xuXG4gICAgICAgIGNvbnN0IHRhYiA9IHtcbiAgICAgICAgICAgIHZpZXc6IFwidGFidmlld1wiLFxuICAgICAgICAgICAgaWQ6IFwidGFidmlld1wiLFxuICAgICAgICAgICAgY2VsbHM6IFtcbiAgICAgICAgICAgICAgICB7XG5cbiAgICAgICAgICAgICAgICAgICAgaGVhZGVyOiBcIk92ZXJ2aWV3XCIsXG4gICAgICAgICAgICAgICAgICAgIGF1dG93aWR0aDp0cnVlLFxuICAgICAgICAgICAgICAgICAgICBzY3JvbGw6J3h5JyxcbiAgICAgICAgICAgICAgICAgICAgcm93czogW1xuICAgICAgICAgICAgICAgICAgICAgICAgaW5mbyxcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZDpcImZvcm1JbmZvXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmlldzpcImRhdGF0YWJsZVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uQWZ0ZXJSZW5kZXI6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHdvcmtsb2FkcyA9IFtcIm5ldHdvcmtzXCIsIFwiemRic1wiLCBcInZvbHVtZXNcIiwgXCJjb250YWluZXJzXCIsIFwia3ViZXJuZXRlc1wiXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvciAodmFyIGluZGV4ID0gMDsgaW5kZXggPCB3b3JrbG9hZHMubGVuZ3RoOyBpbmRleCsrKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGl0ZW0gPSB3b3JrbG9hZHNbaW5kZXhdO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBzZWxlY3RvciA9IFwiLndlYml4X2l0ZW1fdGFiW2J1dHRvbl9pZD0nXCIgKyBpdGVtICArIFwiJ11cIjtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgdGFiID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihzZWxlY3Rvcik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRhYikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgZGF0YSA9ICQkKGl0ZW0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoZGF0YSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGFiLnN0eWxlLmRpc3BsYXkgPSBkYXRhLmNvdW50KCkgPT0gMCA/IFwibm9uZVwiOiBcIlwiO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXNpemVDb2x1bW46IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2Nyb2xsOiBcInh5XCIsXG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb2x1bW5zOiBbe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZDogXCJrZXlcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaGVhZGVyOiBcIktleVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aWR0aDoxMzBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWQ6IFwidmFsdWVcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaGVhZGVyOiBcIlZhbHVlXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNjcm9sbDogXCJ4XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIHNzaCBpcyB0b28gbG9uZ1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aWR0aDonNDAwMCdcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBdXG5cblxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBpZDogXCJuZXR3b3Jrc1wiLFxuICAgICAgICAgICAgICAgICAgICBoZWFkZXI6IFwiTmV0d29ya3NcIixcbiAgICAgICAgICAgICAgICAgICAgdmlldzogXCJkYXRhdGFibGVcIixcbiAgICAgICAgICAgICAgICAgICAgcmVzaXplQ29sdW1uOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICBzZWxlY3Q6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgIG11bHRpc2VsZWN0OiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICBjc3M6IFwid2ViaXhfaGVhZGVyX2JvcmRlciB3ZWJpeF9kYXRhX2JvcmRlclwiLFxuICAgICAgICAgICAgICAgICAgICBzY3JvbGw6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgIGF1dG9Db25maWc6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgIGNvbHVtbnM6IFtcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZDogXCJpbmRleFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhlYWRlcjogXCIjXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc29ydDogXCJpbnRcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhdXRvd2lkdGg6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDYwXG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlkOiBcIm5ldHdvcmtfbmFtZVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhlYWRlcjogXCJOYW1lXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc29ydDogXCJzdHJpbmdcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aWR0aDogMTgwXG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlkOiBcImlwX3JhbmdlXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaGVhZGVyOiBcIklwIHJhbmdlXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc29ydDogXCJzdHJpbmdcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aWR0aDogMTgwXG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlkOiBcImZhcm1lcl90aWRcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBoZWFkZXI6IFwiRmFybWVyXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc29ydDogXCJzdHJpbmdcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aWR0aDogMTgwXG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgICAgIHNjaGVtZToge1xuICAgICAgICAgICAgICAgICAgICAgICAgJGluaXQ6IGZ1bmN0aW9uIChvYmopIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvYmoubmV0d29ya19uYW1lID0gb2JqLm5hbWU7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb2JqLmlwX3JhbmdlID0gb2JqLmlwcmFuZ2U7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb2JqLmZhcm1lcl90aWQgPSBvYmouZmFybWVyX3RpZDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvYmouaW5kZXggPSB0aGlzLmNvdW50KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0sIG9uOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBvbkFmdGVyTG9hZDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICghdGhpcy5jb3VudCgpKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNob3dPdmVybGF5KFwiTm8gbmV0d29ya3MgaW4gcmVzZXJ2YXRpb25cIik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmhpZGVPdmVybGF5KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgaWQ6IFwiY29udGFpbmVyc1wiLFxuICAgICAgICAgICAgICAgICAgICBoZWFkZXI6IFwiQ29udGFpbmVyc1wiLFxuICAgICAgICAgICAgICAgICAgICB2aWV3OiBcImRhdGF0YWJsZVwiLFxuICAgICAgICAgICAgICAgICAgICByZXNpemVDb2x1bW46IHRydWUsXG4gICAgICAgICAgICAgICAgICAgIHNlbGVjdDogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgbXVsdGlzZWxlY3Q6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgIGNzczogXCJ3ZWJpeF9oZWFkZXJfYm9yZGVyIHdlYml4X2RhdGFfYm9yZGVyXCIsXG4gICAgICAgICAgICAgICAgICAgIHNjcm9sbDogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgYXV0b0NvbmZpZzogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgY29sdW1uczogW1xuICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlkOiBcImluZGV4XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaGVhZGVyOiBcIiNcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzb3J0OiBcImludFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGF1dG93aWR0aDogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aWR0aDogNjBcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZDogXCJub2RlX2lkXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaGVhZGVyOiBcIk5vZGUgaWRcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzb3J0OiBcInN0cmluZ1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGF1dG93aWR0aDogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aWR0aDogMTgwXG4gICAgICAgICAgICAgICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWQ6IFwiZmxpc3RcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBoZWFkZXI6IFwiRmxpc3RcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzb3J0OiBcInN0cmluZ1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGF1dG93aWR0aDogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aWR0aDogMTgwXG4gICAgICAgICAgICAgICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWQ6IFwiZW50cnlwb2ludFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhlYWRlcjogXCJFbnRyeXBvaW50XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc29ydDogXCJzdHJpbmdcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhdXRvd2lkdGg6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDE4MFxuICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZDogXCJodWJfdXJsXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaGVhZGVyOiBcIkh1YiB1cmxcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzb3J0OiBcInN0cmluZ1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGF1dG93aWR0aDogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aWR0aDogMTgwXG4gICAgICAgICAgICAgICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWQ6IFwiaW50ZXJhY3RpdmVcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBoZWFkZXI6IFwiSW50ZXJhY3RpdmVcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzb3J0OiBcInN0cmluZ1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGF1dG93aWR0aDogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aWR0aDogMTgwXG4gICAgICAgICAgICAgICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWQ6IFwiZmFybWVyX3RpZFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhlYWRlcjogXCJGYXJtZXJfdGlkXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc29ydDogXCJzdHJpbmdcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhdXRvd2lkdGg6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDE4MFxuICAgICAgICAgICAgICAgICAgICAgICAgfSxcblxuICAgICAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgICAgICBzY2hlbWU6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICRpbml0OiBmdW5jdGlvbiAob2JqKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb2JqLm5vZGVfaWQgPSBvYmoubm9kZV9pZDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvYmouZmxpc3QgPSBvYmouZmxpc3Q7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb2JqLmVudHJ5cG9pbnQgPSBvYmouZW50cnlwb2ludDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvYmouaHViX3VybCA9IG9iai5odWJfdXJsO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9iai5pbnRlcmFjdGl2ZSA9IG9iai5pbnRlcmFjdGl2ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvYmouZmFybWVyX3RpZCA9IG9iai5mYXJtZXJfdGlkO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9iai5pbmRleCA9IHRoaXMuY291bnQoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSwgb246IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG9uQWZ0ZXJMb2FkOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCF0aGlzLmNvdW50KCkpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2hvd092ZXJsYXkoXCJObyBjb250YWluZXJzIGluIHJlc2VydmF0aW9uXCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5oaWRlT3ZlcmxheSgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIGlkOiBcInZvbHVtZXNcIixcbiAgICAgICAgICAgICAgICAgICAgaGVhZGVyOiBcIlZvbHVtZXNcIixcbiAgICAgICAgICAgICAgICAgICAgdmlldzogXCJkYXRhdGFibGVcIixcbiAgICAgICAgICAgICAgICAgICAgcmVzaXplQ29sdW1uOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICBzZWxlY3Q6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgIG11bHRpc2VsZWN0OiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICBjc3M6IFwid2ViaXhfaGVhZGVyX2JvcmRlciB3ZWJpeF9kYXRhX2JvcmRlclwiLFxuICAgICAgICAgICAgICAgICAgICBzY3JvbGw6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgIGF1dG9Db25maWc6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgIGNvbHVtbnM6IFtcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZDogXCJpbmRleFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhlYWRlcjogXCIjXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc29ydDogXCJpbnRcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhdXRvd2lkdGg6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDYwXG4gICAgICAgICAgICAgICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWQ6IFwibm9kZV9pZFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhlYWRlcjogXCJOb2RlIGlkXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc29ydDogXCJzdHJpbmdcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhdXRvd2lkdGg6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDE4MFxuICAgICAgICAgICAgICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlkOiBcInNpemVcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBoZWFkZXI6IFwiU2l6ZVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNvcnQ6IFwic3RyaW5nXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYXV0b3dpZHRoOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdpZHRoOiAxODBcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZDogXCJ0eXBlXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaGVhZGVyOiBcIlR5cGVcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzb3J0OiBcInN0cmluZ1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGF1dG93aWR0aDogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aWR0aDogMTgwXG4gICAgICAgICAgICAgICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWQ6IFwiZmFybWVyX3RpZFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhlYWRlcjogXCJGYXJtZXJfdGlkXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc29ydDogXCJzdHJpbmdcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhdXRvd2lkdGg6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDE4MFxuICAgICAgICAgICAgICAgICAgICAgICAgfSxcblxuICAgICAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgICAgICBzY2hlbWU6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICRpbml0OiBmdW5jdGlvbiAob2JqKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb2JqLm5vZGVfaWQgPSBvYmoubm9kZV9pZDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvYmouc2l6ZSA9IG9iai5zaXplO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9iai50eXBlID0gb2JqLnR5cGU7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb2JqLmZhcm1lcl90aWQgPSBvYmouZmFybWVyX3RpZDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvYmouaW5kZXggPSB0aGlzLmNvdW50KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0sIG9uOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBvbkFmdGVyTG9hZDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICghdGhpcy5jb3VudCgpKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNob3dPdmVybGF5KFwiTm8gdm9sdW1lcyBpbiByZXNlcnZhdGlvblwiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuaGlkZU92ZXJsYXkoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICAgICAgaWQ6IFwiemRic1wiLFxuICAgICAgICAgICAgICAgICAgICBoZWFkZXI6IFwiWmRic1wiLFxuICAgICAgICAgICAgICAgICAgICB2aWV3OiBcImRhdGF0YWJsZVwiLFxuICAgICAgICAgICAgICAgICAgICByZXNpemVDb2x1bW46IHRydWUsXG4gICAgICAgICAgICAgICAgICAgIHNlbGVjdDogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgbXVsdGlzZWxlY3Q6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgIGNzczogXCJ3ZWJpeF9oZWFkZXJfYm9yZGVyIHdlYml4X2RhdGFfYm9yZGVyXCIsXG4gICAgICAgICAgICAgICAgICAgIHNjcm9sbDogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgYXV0b0NvbmZpZzogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgY29sdW1uczogW1xuICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlkOiBcImluZGV4XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaGVhZGVyOiBcIiNcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzb3J0OiBcImludFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGF1dG93aWR0aDogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aWR0aDogNjBcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZDogXCJub2RlX2lkXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaGVhZGVyOiBcIk5vZGUgaWRcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzb3J0OiBcInN0cmluZ1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGF1dG93aWR0aDogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aWR0aDogMTgwXG4gICAgICAgICAgICAgICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWQ6IFwic2l6ZVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhlYWRlcjogXCJTaXplXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc29ydDogXCJzdHJpbmdcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhdXRvd2lkdGg6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDE4MFxuICAgICAgICAgICAgICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlkOiBcImRpc2tfdHlwZVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhlYWRlcjogXCJEaXNrIHR5cGVcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzb3J0OiBcInN0cmluZ1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGF1dG93aWR0aDogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aWR0aDogMTgwXG4gICAgICAgICAgICAgICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWQ6IFwibW9kZVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhlYWRlcjogXCJNb2RlXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc29ydDogXCJzdHJpbmdcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhdXRvd2lkdGg6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDE4MFxuICAgICAgICAgICAgICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlkOiBcInB1YmxpY1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhlYWRlcjogXCJwdWJsaWNcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzb3J0OiBcInN0cmluZ1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGF1dG93aWR0aDogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aWR0aDogMTgwXG4gICAgICAgICAgICAgICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWQ6IFwiZmFybWVyX3RpZFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhlYWRlcjogXCJGYXJtZXJfdGlkXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc29ydDogXCJzdHJpbmdcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhdXRvd2lkdGg6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDE4MFxuICAgICAgICAgICAgICAgICAgICAgICAgfSxcblxuICAgICAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgICAgICBzY2hlbWU6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICRpbml0OiBmdW5jdGlvbiAob2JqKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb2JqLmluZGV4ID0gdGhpcy5jb3VudCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9LCBvbjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgb25BZnRlckxvYWQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoIXRoaXMuY291bnQoKSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zaG93T3ZlcmxheShcIk5vIHpkYnMgaW4gcmVzZXJ2YXRpb25cIik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmhpZGVPdmVybGF5KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgICAgIGlkOiBcImt1YmVybmV0ZXNcIixcbiAgICAgICAgICAgICAgICAgICAgaGVhZGVyOiBcIkt1YmVybmV0ZXNcIixcbiAgICAgICAgICAgICAgICAgICAgdmlldzogXCJkYXRhdGFibGVcIixcbiAgICAgICAgICAgICAgICAgICAgcmVzaXplQ29sdW1uOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICBzZWxlY3Q6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgIG11bHRpc2VsZWN0OiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICBjc3M6IFwid2ViaXhfaGVhZGVyX2JvcmRlciB3ZWJpeF9kYXRhX2JvcmRlclwiLFxuICAgICAgICAgICAgICAgICAgICBzY3JvbGw6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgIGF1dG9Db25maWc6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgIGNvbHVtbnM6IFtcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZDogXCJpbmRleFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhlYWRlcjogXCIjXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc29ydDogXCJpbnRcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhdXRvd2lkdGg6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDYwXG4gICAgICAgICAgICAgICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWQ6IFwibm9kZV9pZFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhlYWRlcjogXCJOb2RlIGlkXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc29ydDogXCJzdHJpbmdcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhdXRvd2lkdGg6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDE4MFxuICAgICAgICAgICAgICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlkOiBcInNpemVcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBoZWFkZXI6IFwiU2l6ZVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNvcnQ6IFwic3RyaW5nXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYXV0b3dpZHRoOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdpZHRoOiAxODBcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZDogXCJuZXR3b3JrX2lkXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaGVhZGVyOiBcIk5ldHdvcmsgaWRcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzb3J0OiBcInN0cmluZ1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGF1dG93aWR0aDogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aWR0aDogMTgwXG4gICAgICAgICAgICAgICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWQ6IFwiaXBhZGRyZXNzXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaGVhZGVyOiBcIklwIGFkZHJlc3NcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzb3J0OiBcInN0cmluZ1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGF1dG93aWR0aDogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aWR0aDogMTgwXG4gICAgICAgICAgICAgICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWQ6IFwibWFzdGVyX2lwc19zdHJcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBoZWFkZXI6IFwiTWFzdGVyIGlwc1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNvcnQ6IFwic3RyaW5nXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYXV0b3dpZHRoOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdpZHRoOiAxODBcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZDogXCJmYXJtZXJfdGlkXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaGVhZGVyOiBcIkZhcm1lcl90aWRcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzb3J0OiBcInN0cmluZ1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGF1dG93aWR0aDogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aWR0aDogMTgwXG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxuXG4gICAgICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgICAgIHNjaGVtZToge1xuICAgICAgICAgICAgICAgICAgICAgICAgJGluaXQ6IGZ1bmN0aW9uIChvYmopIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvYmoubWFzdGVyX2lwc19zdHIgPSBvYmoubWFzdGVyX2lwcy50b1N0cmluZygpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb2JqLmluZGV4ID0gdGhpcy5jb3VudCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9LCBvbjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgb25BZnRlckxvYWQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoIXRoaXMuY291bnQoKSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zaG93T3ZlcmxheShcIk5vIGt1YmVybmV0ZXMgaW4gcmVzZXJ2YXRpb25cIik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmhpZGVPdmVybGF5KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9LFxuXG4gICAgICAgICAgICBdXG4gICAgICAgIH07XG5cbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHZpZXc6IFwid2luZG93XCIsXG4gICAgICAgICAgICBoZWFkOiBcIlJlc2VydmF0aW9uXCIsXG4gICAgICAgICAgICBpZDogXCJyZXNlcnZhdGlvbl92aWV3XCIsXG4gICAgICAgICAgICBtb2RhbDogdHJ1ZSxcbiAgICAgICAgICAgIHdpZHRoOiB3aW5kb3cuaW5uZXJXaWR0aCAqIC44LFxuICAgICAgICAgICAgaGVpZ2h0OiB3aW5kb3cuaW5uZXJIZWlnaHQgKiAuOCxcbiAgICAgICAgICAgIHBvc2l0aW9uOiBcImNlbnRlclwiLFxuICAgICAgICAgICAgYm9keToge1xuICAgICAgICAgICAgICAgIHJvd3M6IFtcbiAgICAgICAgICAgICAgICAgICAgdGFiLFxuICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICB2aWV3OiBcImJ1dHRvblwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU6IFwiT0tcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIGNzczogXCJ3ZWJpeF9wcmltYXJ5XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBjbGljazogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZ2V0VG9wUGFyZW50VmlldygpLmhpZGUoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuXG4gICAgaW5pdCgpIHtcbiAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgICAgICB0aGlzLmZvcm0gPSAkJChcImZvcm1cIik7XG5cbiAgICB9XG5cblxuICAgIHNob3dGb3IoaXRlbSkge1xuICAgICAgICBsZXQgdmFsdWVzID0gT2JqZWN0LmFzc2lnbih7fSwgaXRlbSk7XG4gICAgICAgIHRoaXMucmVzZXJ2YXRpb25fdmlldyA9ICQkKFwicmVzZXJ2YXRpb25fdmlld1wiKTtcbiAgICAgICAgdGhpcy5yZXNlcnZhdGlvbl92aWV3LmdldEhlYWQoKS5zZXRIVE1MKFwiUmVzZXJ2YXRpb246IFwiICsgaXRlbS5zb2x1dGlvbk5hbWUpO1xuXG4gICAgICAgIGxldCByZXNlcnZhdGlvbiA9IGl0ZW0ucmVzZXJ2YXRpb25cbiAgICAgICAgdmFsdWVzLmlkID0gcmVzZXJ2YXRpb24uaWRcbiAgICAgICAgdmFsdWVzLmN1c3RvbWVyX3RpZCA9IHJlc2VydmF0aW9uLmN1c3RvbWVyX3RpZFxuICAgICAgICB2YWx1ZXMubmV4dF9hY3Rpb24gPSByZXNlcnZhdGlvbi5uZXh0X2FjdGlvblxuICAgICAgICB2YWx1ZXMucmVzdWx0cyA9IHJlc2VydmF0aW9uLnJlc3VsdHNcbiAgICAgICAgdmFsdWVzLmV4cGlyYXRpb24gPSByZXNlcnZhdGlvbi5kYXRhX3Jlc2VydmF0aW9uLmV4cGlyYXRpb25fcmVzZXJ2YXRpb25cblxuICAgICAgICB2YWx1ZXMuY29udGFpbmVycyA9IHJlc2VydmF0aW9uLmRhdGFfcmVzZXJ2YXRpb24uY29udGFpbmVyc1xuICAgICAgICB2YWx1ZXMudm9sdW1lcyA9IHJlc2VydmF0aW9uLmRhdGFfcmVzZXJ2YXRpb24udm9sdW1lc1xuICAgICAgICB2YWx1ZXMuemRicyA9IHJlc2VydmF0aW9uLmRhdGFfcmVzZXJ2YXRpb24uemRic1xuICAgICAgICB2YWx1ZXMubmV0d29ya3MgPSByZXNlcnZhdGlvbi5kYXRhX3Jlc2VydmF0aW9uLm5ldHdvcmtzXG4gICAgICAgIHZhbHVlcy5rdWJlcm5ldGVzID0gcmVzZXJ2YXRpb24uZGF0YV9yZXNlcnZhdGlvbi5rdWJlcm5ldGVzXG4gICAgICAgIHZhbHVlcy5mb3JtX2luZm8gPSBpdGVtLmZvcm1faW5mb1xuXG4gICAgICAgIHRoaXMuZm9ybS5zZXRWYWx1ZXModmFsdWVzKTtcbiAgICAgICAgdGhpcy5mb3JtX2luZm8gPSAkJChcImZvcm1JbmZvXCIpO1xuICAgICAgICB0aGlzLmZvcm1faW5mby5jbGVhckFsbCgpO1xuXG4gICAgICAgIGxldCBmb3JtX2xpc3QgPSBbXTtcbiAgICAgICAgbGV0IGZvcm1fa2V5cyA9IE9iamVjdC5rZXlzKHZhbHVlcy5mb3JtX2luZm8pXG4gICAgICAgIGxldCBmb3JtX3ZhbHVlcyA9IE9iamVjdC52YWx1ZXModmFsdWVzLmZvcm1faW5mbylcbiAgICAgICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IGZvcm1fa2V5cy5sZW5ndGg7IGluZGV4KyspIHtcbiAgICAgICAgICAgIGxldCBmb3JtX2RpY3QgPSBuZXcgT2JqZWN0KCk7XG4gICAgICAgICAgICBmb3JtX2RpY3RbJ2tleSddID0gZm9ybV9rZXlzW2luZGV4XTtcbiAgICAgICAgICAgIGZvcm1fZGljdFsndmFsdWUnXSA9IGZvcm1fdmFsdWVzW2luZGV4XTtcbiAgICAgICAgICAgIGZvcm1fbGlzdC5wdXNoKGZvcm1fZGljdClcblxuICAgICAgICB9XG4gICAgICAgIHRoaXMuZm9ybV9pbmZvLnBhcnNlKGZvcm1fbGlzdCk7XG5cbiAgICAgICAgLy8gQWRkIG5ldHdvcmtzIHRhYiBjb250ZW50XG4gICAgICAgIHRoaXMubmV0d29ya3MgPSAkJChcIm5ldHdvcmtzXCIpO1xuICAgICAgICB0aGlzLm5ldHdvcmtzLmNsZWFyQWxsKClcbiAgICAgICAgdGhpcy5uZXR3b3Jrcy5wYXJzZSh2YWx1ZXMubmV0d29ya3MpO1xuXG4gICAgICAgIC8vIEFkZCBjb3RhaW5lciB0YWIgY29udGVudFxuICAgICAgICB0aGlzLmNvbnRhaW5lcnMgPSAkJChcImNvbnRhaW5lcnNcIik7XG4gICAgICAgIHRoaXMuY29udGFpbmVycy5jbGVhckFsbCgpXG4gICAgICAgIHRoaXMuY29udGFpbmVycy5wYXJzZSh2YWx1ZXMuY29udGFpbmVycyk7XG5cblxuICAgICAgICAvLyBBZGQgdm9sdW1lcyB0YWIgY29udGVudFxuICAgICAgICB0aGlzLnZvbHVtZXMgPSAkJChcInZvbHVtZXNcIik7XG4gICAgICAgIHRoaXMudm9sdW1lcy5jbGVhckFsbCgpXG4gICAgICAgIHRoaXMudm9sdW1lcy5wYXJzZSh2YWx1ZXMudm9sdW1lcyk7XG5cbiAgICAgICAgLy8gQWRkIHpkYiB0YWIgY29udGVudFxuICAgICAgICB0aGlzLnpkYnMgPSAkJChcInpkYnNcIik7XG4gICAgICAgIHRoaXMuemRicy5jbGVhckFsbCgpXG4gICAgICAgIHRoaXMuemRicy5wYXJzZSh2YWx1ZXMuemRicyk7XG5cblxuICAgICAgICAvLyBBZGQga3ViZXJuZXRlcyB0YWIgY29udGVudFxuICAgICAgICB0aGlzLmt1YmVybmV0ZXMgPSAkJChcImt1YmVybmV0ZXNcIik7XG4gICAgICAgIHRoaXMua3ViZXJuZXRlcy5jbGVhckFsbCgpXG4gICAgICAgIHRoaXMua3ViZXJuZXRlcy5wYXJzZSh2YWx1ZXMua3ViZXJuZXRlcyk7XG5cblxuICAgICAgICB0aGlzLmdldFJvb3QoKS5zaG93KCk7XG4gICAgfVxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc291cmNlcy92aWV3cy9kZXBsb3llZFNvbHV0aW9ucy9yZXNlcnZhdGlvbi5qcyIsImltcG9ydCB7IEpldFZpZXcgfSBmcm9tIFwid2ViaXgtamV0XCI7XG5cbmltcG9ydCB7IGRhdGVGb3JtYXR0ZXIgfSBmcm9tIFwiLi4vLi4vY29tbW9uL2Zvcm1hdHRlcnNcIjtcbmltcG9ydCB7IExFVkVMUyB9IGZyb20gXCIuLi9hbGVydHMvZGF0YVwiO1xuaW1wb3J0IHsgY3JlYXRlRmlsdGVyT3B0aW9ucyB9IGZyb20gXCIuLi8uLi9jb21tb24vZmlsdGVyc1wiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBBcHBMb2dzVmlldyBleHRlbmRzIEpldFZpZXcge1xuICAgIGNvbmZpZygpIHtcbiAgICAgICAgdmFyIHBhZ2VyID0ge1xuICAgICAgICAgICAgdmlldzogXCJwYWdlclwiLFxuICAgICAgICAgICAgaWQ6IFwicGFnZXJcIixcbiAgICAgICAgICAgIHNpemU6IDEwMCxcbiAgICAgICAgICAgIGdyb3VwOiAyMFxuICAgICAgICB9O1xuICAgICAgICBjb25zdCBhcHBsb2dzID0ge1xuICAgICAgICAgICAgdmlldzogXCJkYXRhdGFibGVcIixcbiAgICAgICAgICAgIGlkOiBcImFwcGxvZ3NfdGFibGVcIixcbiAgICAgICAgICAgIHBhZ2VyOiBcInBhZ2VyXCIsXG4gICAgICAgICAgICByZXNpemVDb2x1bW46IHRydWUsXG4gICAgICAgICAgICBzZWxlY3Q6IHRydWUsXG4gICAgICAgICAgICBtdWx0aXNlbGVjdDogdHJ1ZSxcbiAgICAgICAgICAgIGNzczogXCJ3ZWJpeF9oZWFkZXJfYm9yZGVyIHdlYml4X2RhdGFfYm9yZGVyXCIsXG4gICAgICAgICAgICBzY3JvbGw6IHRydWUsXG4gICAgICAgICAgICBhdXRvQ29uZmlnOiB0cnVlLFxuICAgICAgICAgICAgb246IHtcbiAgICAgICAgICAgICAgICBvbkFmdGVyTG9hZDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnNvcnQoXCJlcG9jaFwiLCBcImRlc1wiKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5tYXJrU29ydGluZyhcImVwb2NoXCIsIFwiZGVzXCIpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG5cbiAgICAgICAgICAgIGNvbHVtbnM6IFt7XG4gICAgICAgICAgICAgICAgaWQ6IFwiaWRcIixcbiAgICAgICAgICAgICAgICBoZWFkZXI6IFtcbiAgICAgICAgICAgICAgICAgICAgXCJMb2cjXCIsXG4gICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRlbnQ6IFwidGV4dEZpbHRlclwiXG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICBzb3J0OiBcImludFwiLFxuICAgICAgICAgICAgICAgIHdpZHRoOiA1MCxcbiAgICAgICAgICAgICAgICBhdXRvd2lkdGg6IHRydWUsXG4gICAgICAgICAgICB9LFxuXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgaWQ6IFwiZmlsZXBhdGhcIixcbiAgICAgICAgICAgICAgICBoZWFkZXI6IFtcbiAgICAgICAgICAgICAgICAgICAgXCJQYXRoXCIsXG4gICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRlbnQ6IFwidGV4dEZpbHRlclwiXG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICBzb3J0OiBcInN0cmluZ1wiLFxuICAgICAgICAgICAgICAgIGF1dG93aWR0aDogdHJ1ZSxcbiAgICAgICAgICAgICAgICB3aWR0aDogMTQwXG4gICAgICAgICAgICB9LFxuXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgaWQ6IFwibGluZW5yXCIsXG4gICAgICAgICAgICAgICAgaGVhZGVyOiBbXG4gICAgICAgICAgICAgICAgICAgIFwiTGluZS5uclwiLFxuICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb250ZW50OiBcInRleHRGaWx0ZXJcIlxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgc29ydDogXCJpbnRcIixcbiAgICAgICAgICAgICAgICBhdXRvd2lkdGg6IHRydWUsXG4gICAgICAgICAgICAgICAgd2lkdGg6IDYwXG4gICAgICAgICAgICB9LFxuXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgaWQ6IFwiY29udGV4dFwiLFxuICAgICAgICAgICAgICAgIGhlYWRlcjogW1xuICAgICAgICAgICAgICAgICAgICBcIkNvbnRleHRcIixcbiAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29udGVudDogXCJ0ZXh0RmlsdGVyXCJcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgIHNvcnQ6IFwic3RyaW5nXCJcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgaWQ6IFwibWVzc2FnZVwiLFxuICAgICAgICAgICAgICAgIGhlYWRlcjogW1xuICAgICAgICAgICAgICAgICAgICBcIk1lc3NhZ2VcIixcbiAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29udGVudDogXCJ0ZXh0RmlsdGVyXCJcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgIHNvcnQ6IFwic3RyaW5nXCIsXG4gICAgICAgICAgICAgICAgd2lkdGg6IDUwMCxcbiAgICAgICAgICAgICAgICBhdXRvd2lkdGg6IHRydWVcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgaWQ6IFwibGV2ZWxcIixcbiAgICAgICAgICAgICAgICBoZWFkZXI6IFtcbiAgICAgICAgICAgICAgICAgICAgXCJMZXZlbFwiLFxuICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb250ZW50OiBcInNlbGVjdEZpbHRlclwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgb3B0aW9uczogY3JlYXRlRmlsdGVyT3B0aW9ucyhMRVZFTFMpXG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICBzb3J0OiBcImludFwiLFxuICAgICAgICAgICAgICAgIGZvcm1hdDogKHZhbHVlKSA9PiBMRVZFTFNbdmFsdWVdLFxuICAgICAgICAgICAgICAgIHdpZHRoOiAxMDBcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgaWQ6IFwiZXBvY2hcIixcbiAgICAgICAgICAgICAgICBoZWFkZXI6IFtcbiAgICAgICAgICAgICAgICAgICAgXCJUaW1lXCIsXG4gICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRlbnQ6IFwidGV4dEZpbHRlclwiXG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICBzb3J0OiBcImRhdGVcIixcbiAgICAgICAgICAgICAgICBmb3JtYXQ6IGRhdGVGb3JtYXR0ZXIsXG4gICAgICAgICAgICAgICAgd2lkdGg6IDEzMFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBpZDogXCJwcm9jZXNzaWRcIixcbiAgICAgICAgICAgICAgICBoZWFkZXI6IFtcbiAgICAgICAgICAgICAgICAgICAgXCJQSURcIixcbiAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29udGVudDogXCJ0ZXh0RmlsdGVyXCJcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgIHNvcnQ6IFwiaW50XCIsXG4gICAgICAgICAgICAgICAgd2lkdGg6IDYwXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGlkOiBcImNhdFwiLFxuICAgICAgICAgICAgICAgIGhlYWRlcjogW1xuICAgICAgICAgICAgICAgICAgICBcIkNhdGVnb3J5XCIsXG4gICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRlbnQ6IFwidGV4dEZpbHRlclwiXG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICBzb3J0OiBcInN0cmluZ1wiLFxuICAgICAgICAgICAgICAgIHdpZHRoOiA4MFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBpZDogXCJkYXRhXCIsXG4gICAgICAgICAgICAgICAgaGVhZGVyOiBbXG4gICAgICAgICAgICAgICAgICAgIFwiRGF0YVwiLFxuICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb250ZW50OiBcInRleHRGaWx0ZXJcIlxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgc29ydDogXCJzdHJpbmdcIlxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBdLFxuXG4gICAgICAgIH1cblxuXG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICByb3dzOiBbXG4gICAgICAgICAgICAgICAgYXBwbG9ncyxcbiAgICAgICAgICAgICAgICBwYWdlclxuICAgICAgICAgICAgXVxuICAgICAgICB9XG4gICAgfVxuXG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zb3VyY2VzL3ZpZXdzL2xvZ3MvYXBwTG9ncy5qcyIsImltcG9ydCB7IEpldFZpZXcgfSBmcm9tIFwid2ViaXgtamV0XCI7XG5cbmltcG9ydCB7IGRhdGVGb3JtYXR0ZXIgfSBmcm9tIFwiLi4vLi4vY29tbW9uL2Zvcm1hdHRlcnNcIjtcbmltcG9ydCB7IGFuc2lVcCB9IGZyb20gXCIuLi8uLi9jb21tb24vY29sb3JzXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEpvYkRldGFpbHNWaWV3IGV4dGVuZHMgSmV0VmlldyB7XG4gICAgY29uZmlnKCkge1xuICAgICAgICBjb25zdCBpbmZvID0ge1xuICAgICAgICAgICAgdmlldzogXCJmb3JtXCIsXG4gICAgICAgICAgICBpZDogXCJmb3JtXCIsXG4gICAgICAgICAgICBlbGVtZW50c0NvbmZpZzogeyBsYWJlbFdpZHRoOiAyMDAgfSxcbiAgICAgICAgICAgIGVsZW1lbnRzOiBbXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICB2aWV3OiBcInRleHRcIixcbiAgICAgICAgICAgICAgICAgICAgbGFiZWw6IFwiQWN0aW9uIElEXCIsXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiYWN0aW9uX2lkXCIsXG4gICAgICAgICAgICAgICAgICAgIHJlYWRvbmx5OiB0cnVlLFxuICAgICAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICAgICAgdmlldzogXCJ0ZXh0XCIsXG4gICAgICAgICAgICAgICAgICAgIGxhYmVsOiBcIlN0YXRlXCIsXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwic3RhdGVcIixcbiAgICAgICAgICAgICAgICAgICAgcmVhZG9ubHk6IHRydWUsXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIHZpZXc6IFwidGV4dFwiLFxuICAgICAgICAgICAgICAgICAgICBsYWJlbDogXCJOYW1lXCIsXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwibmFtZVwiLFxuICAgICAgICAgICAgICAgICAgICByZWFkb25seTogdHJ1ZSxcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgdmlldzogXCJ0ZXh0XCIsXG4gICAgICAgICAgICAgICAgICAgIGxhYmVsOiBcIkNhdGVnb3J5XCIsXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiY2F0ZWdvcnlcIixcbiAgICAgICAgICAgICAgICAgICAgcmVhZG9ubHk6IHRydWVcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgLFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgdmlldzogXCJ0ZXh0XCIsXG4gICAgICAgICAgICAgICAgICAgIGxhYmVsOiBcImt3YXJnc1wiLFxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImt3YXJnc1wiLFxuICAgICAgICAgICAgICAgICAgICByZWFkb25seTogdHJ1ZVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICB2aWV3OiBcInRleHRcIixcbiAgICAgICAgICAgICAgICAgICAgbGFiZWw6IFwiRGllXCIsXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiZGllXCIsXG4gICAgICAgICAgICAgICAgICAgIHJlYWRvbmx5OiB0cnVlXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIHZpZXc6IFwidGV4dFwiLFxuICAgICAgICAgICAgICAgICAgICBsYWJlbDogXCJTdGFydCB0aW1lXCIsXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwidGltZV9zdGFydFwiLFxuICAgICAgICAgICAgICAgICAgICByZWFkb25seTogdHJ1ZSxcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgdmlldzogXCJ0ZXh0XCIsXG4gICAgICAgICAgICAgICAgICAgIGxhYmVsOiBcIlN0b3AgdGltZVwiLFxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcInRpbWVfc3RvcFwiLFxuICAgICAgICAgICAgICAgICAgICByZWFkb25seTogdHJ1ZSxcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgdmlldzogXCJ0ZXh0XCIsXG4gICAgICAgICAgICAgICAgICAgIGxhYmVsOiBcIlRpbWVvdXRcIixcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJ0aW1lb3V0XCIsXG4gICAgICAgICAgICAgICAgICAgIHJlYWRvbmx5OiB0cnVlXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIHZpZXc6IFwidGV4dFwiLFxuICAgICAgICAgICAgICAgICAgICBsYWJlbDogXCJSZXN1bHRcIixcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJyZXN1bHRcIixcbiAgICAgICAgICAgICAgICAgICAgcmVhZG9ubHk6IHRydWVcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgdmlldzogXCJ0ZXh0XCIsXG4gICAgICAgICAgICAgICAgICAgIGxhYmVsOiBcIkRlcGVuZGVuY2llc1wiLFxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImRlcGVuZGVuY2llc1wiLFxuICAgICAgICAgICAgICAgICAgICByZWFkb25seTogdHJ1ZVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICB2aWV3OiBcInRleHRcIixcbiAgICAgICAgICAgICAgICAgICAgbGFiZWw6IFwiRGVidWdcIixcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJkZWJ1Z1wiLFxuICAgICAgICAgICAgICAgICAgICByZWFkb25seTogdHJ1ZVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIF1cbiAgICAgICAgfTtcblxuICAgICAgICBjb25zdCB0YWIgPSB7XG4gICAgICAgICAgICB2aWV3OiBcInRhYnZpZXdcIixcbiAgICAgICAgICAgIGNlbGxzOiBbXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBoZWFkZXI6IFwiSW5mb3JtYXRpb25cIixcbiAgICAgICAgICAgICAgICAgICAgYm9keTogaW5mbyxcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgaGVhZGVyOiBcIkVycm9yXCIsXG4gICAgICAgICAgICAgICAgICAgIGJvZHk6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlkOiBcIm1lc3NhZ2VcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIHZpZXc6IFwidGVtcGxhdGVcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIHRlbXBsYXRlOiBcIlwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgc2Nyb2xsOiBcImF1dG9cIixcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBoZWFkZXI6IFwiVHJhY2ViYWNrc1wiLFxuICAgICAgICAgICAgICAgICAgICBib2R5OiB7XG4gICAgICAgICAgICAgICAgICAgICAgICByb3dzOiBbXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZDogJ3BpZCcsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZpZXc6IFwidGVtcGxhdGVcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGVtcGxhdGU6IGA8Yj5QSUQgI3BpZCM8L2I+YCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2Nyb2xsOiBcImF1dG9cIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaGVpZ2h0OiAzMCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYWxpZ246ICdjZW50ZXInXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZDogXCJ0cmFjZWJhY2tzXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZpZXc6IFwidGVtcGxhdGVcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGVtcGxhdGU6IFwiXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNjcm9sbDogXCJhdXRvXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICBdXG4gICAgICAgIH07XG5cbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHZpZXc6IFwid2luZG93XCIsXG4gICAgICAgICAgICBoZWFkOiBcIkpvYiBEZXRhaWxzXCIsXG4gICAgICAgICAgICBtb2RhbDogdHJ1ZSxcbiAgICAgICAgICAgIHdpZHRoOiB3aW5kb3cuaW5uZXJXaWR0aCAqIC44LFxuICAgICAgICAgICAgaGVpZ2h0OiB3aW5kb3cuaW5uZXJIZWlnaHQgKiAuOCxcbiAgICAgICAgICAgIHBvc2l0aW9uOiBcImNlbnRlclwiLFxuICAgICAgICAgICAgYm9keToge1xuICAgICAgICAgICAgICAgIHJvd3M6IFtcbiAgICAgICAgICAgICAgICAgICAgdGFiLFxuICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICB2aWV3OiBcImJ1dHRvblwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU6IFwiT0tcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIGNzczogXCJ3ZWJpeF9wcmltYXJ5XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBjbGljazogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZ2V0VG9wUGFyZW50VmlldygpLmhpZGUoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIHNob3dKb2JEZXRhaWxzKGRhdGEpIHtcbiAgICAgICAgbGV0IGl0ZW0gPSBPYmplY3QuYXNzaWduKHt9LCBkYXRhKTtcbiAgICAgICAgbGV0IGpvYkRhdGEgPSB7XG4gICAgICAgICAgICAnYWN0aW9uX2lkJzogaXRlbVsnYWN0aW9uX2lkJ10sXG4gICAgICAgICAgICAnZGVidWcnOiBpdGVtWydkZWJ1ZyddLnRvU3RyaW5nKCksXG4gICAgICAgICAgICAnZGllJzogaXRlbVsnZGllJ10udG9TdHJpbmcoKSxcbiAgICAgICAgICAgICdlcnJvcl9jYXQnOiBpdGVtWydlcnJvcl9jYXQnXSxcbiAgICAgICAgICAgICdjYXRlZ29yeSc6IGl0ZW1bJ2NhdGVnb3J5J10gPyBpdGVtWydjYXRlZ29yeSddIDogJ05vIENhdGVnb3J5JyxcbiAgICAgICAgICAgICdyZXN1bHQnOiBKU09OLnN0cmluZ2lmeShpdGVtWydyZXN1bHQnXSksXG4gICAgICAgICAgICAnbmFtZSc6IGl0ZW1bJ25hbWUnXSxcbiAgICAgICAgICAgICdzdGF0ZSc6IGl0ZW1bJ3N0YXRlJ10sXG4gICAgICAgICAgICAna3dhcmdzJzogSlNPTi5zdHJpbmdpZnkoaXRlbVsna3dhcmdzJ10pLFxuICAgICAgICAgICAgJ3RpbWVfc3RvcCc6IGRhdGVGb3JtYXR0ZXIoaXRlbVsndGltZV9zdG9wJ10pLFxuICAgICAgICAgICAgJ3RpbWVfc3RhcnQnOiBkYXRlRm9ybWF0dGVyKGl0ZW1bJ3RpbWVfc3RhcnQnXSksXG4gICAgICAgICAgICAndGltZW91dCc6IGl0ZW1bJ3RpbWVvdXQnXSxcbiAgICAgICAgICAgICdkZXBlbmRlbmNpZXMnOiBpdGVtWydkZXBlbmRlbmNpZXMnXVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKE9iamVjdC5rZXlzKGl0ZW1bJ2Vycm9yJ10pLmxlbmd0aCAhPT0gMCkge1xuICAgICAgICAgICAgam9iRGF0YVsncGlkJ10gPSBpdGVtWydlcnJvciddWydwcm9jZXNzaWQnXVxuICAgICAgICAgICAgJCQoJ3BpZCcpLnNldFZhbHVlcyh7IHBpZDogaXRlbVsnZXJyb3InXVsncHJvY2Vzc2lkJ10gfSwgdHJ1ZSk7XG4gICAgICAgICAgICAkJCgncGlkJykuc2hvdygpXG4gICAgICAgICAgICB0aGlzLm1lc3NhZ2Uuc2V0SFRNTChgPHA+JHthbnNpVXAuYW5zaV90b19odG1sKGl0ZW1bJ2Vycm9yJ11bJ21lc3NhZ2UnXSl9PC9wPmApO1xuICAgICAgICAgICAgdGhpcy50cmFjZWJhY2tzLnNldEhUTUwoYDxwPiR7YW5zaVVwLmFuc2lfdG9faHRtbChpdGVtWydlcnJvciddWydmb3JtYXR0ZWQnXSl9PC9wPmApO1xuXG4gICAgICAgIH1lbHNle1xuICAgICAgICAgICAgJCQoJ3BpZCcpLmhpZGUoKTtcbiAgICAgICAgICAgIHRoaXMubWVzc2FnZS5zZXRIVE1MKGA8cD5cIk5vIG1lc3NhZ2VcIjwvcD5gKTtcbiAgICAgICAgICAgIHRoaXMudHJhY2ViYWNrcy5zZXRIVE1MKGA8cD5cIkFsbCBpcyBmaW5lXCI8L3A+YClcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmZvcm0ucGFyc2Uoam9iRGF0YSlcbiAgICAgICAgdGhpcy5nZXRSb290KCkuc2hvdygpO1xuICAgIH1cblxuICAgIGluaXQoKSB7XG4gICAgICAgIHRoaXMuZm9ybSA9ICQkKFwiZm9ybVwiKTtcbiAgICAgICAgdGhpcy5tZXNzYWdlID0gJCQoXCJtZXNzYWdlXCIpOyAgIFxuXG4gICAgICAgIHRoaXMudHJhY2ViYWNrcyA9ICQkKFwidHJhY2ViYWNrc1wiKTtcbiAgICAgICAgdGhpcy50YlRhYnMgPSAkJChcInRiX3RhYnNcIik7XG4gICAgfVxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc291cmNlcy92aWV3cy9teWpvYnMvam9iRGV0YWlscy5qcyIsImltcG9ydCB7IEpldFZpZXcgfSBmcm9tIFwid2ViaXgtamV0XCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFdvcmtlckRldGFpbHNWaWV3IGV4dGVuZHMgSmV0VmlldyB7XG4gICAgY29uZmlnKCkge1xuICAgICAgICBjb25zdCBpbmZvID0ge1xuICAgICAgICAgICAgdmlldzogXCJmb3JtXCIsXG4gICAgICAgICAgICBpZDogXCJmb3JtXCIsXG4gICAgICAgICAgICBlbGVtZW50c0NvbmZpZzogeyBsYWJlbFdpZHRoOiAyMDAgfSxcbiAgICAgICAgICAgIGVsZW1lbnRzOiBbXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICB2aWV3OiBcInRleHRcIixcbiAgICAgICAgICAgICAgICAgICAgbGFiZWw6IFwiTmFtZVwiLFxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcIm5hbWVcIixcbiAgICAgICAgICAgICAgICAgICAgcmVhZG9ubHk6IHRydWUsXG4gICAgICAgICAgICAgICAgfSx7XG4gICAgICAgICAgICAgICAgICAgIHZpZXc6IFwidGV4dFwiLFxuICAgICAgICAgICAgICAgICAgICBsYWJlbDogXCJTdGF0ZVwiLFxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcInN0YXRlXCIsXG4gICAgICAgICAgICAgICAgICAgIHJlYWRvbmx5OiB0cnVlLFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICB2aWV3OiBcInRleHRcIixcbiAgICAgICAgICAgICAgICAgICAgbGFiZWw6IFwiSGFsdGVkXCIsXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiaGFsdFwiLFxuICAgICAgICAgICAgICAgICAgICByZWFkb25seTogdHJ1ZSxcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgdmlldzogXCJ0ZXh0XCIsXG4gICAgICAgICAgICAgICAgICAgIGxhYmVsOiBcIlBJRFwiLFxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcInBpZFwiLFxuICAgICAgICAgICAgICAgICAgICByZWFkb25seTogdHJ1ZVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAsXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICB2aWV3OiBcInRleHRcIixcbiAgICAgICAgICAgICAgICAgICAgbGFiZWw6IFwiQ3VycmVudCBqb2JcIixcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJjdXJyZW50X2pvYlwiLFxuICAgICAgICAgICAgICAgICAgICByZWFkb25seTogdHJ1ZVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICB2aWV3OiBcInRleHRcIixcbiAgICAgICAgICAgICAgICAgICAgbGFiZWw6IFwiTGFzdCB1cGRhdGVcIixcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJsYXN0X3VwZGF0ZVwiLFxuICAgICAgICAgICAgICAgICAgICByZWFkb25seTogdHJ1ZVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICB2aWV3OiBcInRleHRcIixcbiAgICAgICAgICAgICAgICAgICAgbGFiZWw6IFwiU3RhcnQgdGltZVwiLFxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcInRpbWVfc3RhcnRcIixcbiAgICAgICAgICAgICAgICAgICAgcmVhZG9ubHk6IHRydWUsXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIHZpZXc6IFwidGV4dFwiLFxuICAgICAgICAgICAgICAgICAgICBsYWJlbDogXCJUaW1lb3V0XCIsXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwidGltZW91dFwiLFxuICAgICAgICAgICAgICAgICAgICByZWFkb25seTogdHJ1ZVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICB2aWV3OiBcInRleHRcIixcbiAgICAgICAgICAgICAgICAgICAgbGFiZWw6IFwiVHlwZVwiLFxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcInR5cGVcIixcbiAgICAgICAgICAgICAgICAgICAgcmVhZG9ubHk6IHRydWVcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgdmlldzogXCJ0ZXh0XCIsXG4gICAgICAgICAgICAgICAgICAgIGxhYmVsOiBcIkVycm9yXCIsXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiZXJyb3JcIixcbiAgICAgICAgICAgICAgICAgICAgcmVhZG9ubHk6IHRydWVcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgdmlldzogXCJ0ZXh0XCIsXG4gICAgICAgICAgICAgICAgICAgIGxhYmVsOiBcIkRlYnVnXCIsXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiZGVidWdcIixcbiAgICAgICAgICAgICAgICAgICAgcmVhZG9ubHk6IHRydWVcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICBdXG4gICAgICAgIH07XG5cbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHZpZXc6IFwid2luZG93XCIsXG4gICAgICAgICAgICBoZWFkOiBcIldvcmtlciBEZXRhaWxzXCIsXG4gICAgICAgICAgICBtb2RhbDogdHJ1ZSxcbiAgICAgICAgICAgIHdpZHRoOiB3aW5kb3cuaW5uZXJXaWR0aCAqIC44LFxuICAgICAgICAgICAgaGVpZ2h0OiB3aW5kb3cuaW5uZXJIZWlnaHQgKiAuOCxcbiAgICAgICAgICAgIHBvc2l0aW9uOiBcImNlbnRlclwiLFxuICAgICAgICAgICAgYm9keToge1xuICAgICAgICAgICAgICAgIHJvd3M6IFtcbiAgICAgICAgICAgICAgICAgICAgaW5mbyxcbiAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmlldzogXCJidXR0b25cIixcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlOiBcIk9LXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBjc3M6IFwid2ViaXhfcHJpbWFyeVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgY2xpY2s6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmdldFRvcFBhcmVudFZpZXcoKS5oaWRlKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBzaG93V29ya2VyRGV0YWlscyhkYXRhKSB7XG4gICAgICAgIHRoaXMuZm9ybS5wYXJzZShkYXRhKVxuICAgICAgICB0aGlzLmdldFJvb3QoKS5zaG93KCk7XG4gICAgfVxuXG4gICAgaW5pdCgpIHtcbiAgICAgICAgdGhpcy5mb3JtID0gJCQoXCJmb3JtXCIpO1xuICAgIH1cbn1cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zb3VyY2VzL3ZpZXdzL215am9icy93b3JrZXJEZXRhaWxzLmpzIiwiaW1wb3J0IHsgSmV0VmlldyB9IGZyb20gXCJ3ZWJpeC1qZXRcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUGFja2FnZURldGFpbHNWaWV3IGV4dGVuZHMgSmV0VmlldyB7XG4gICAgY29uZmlnKCkge1xuICAgICAgICBjb25zdCBpbmZvID0ge1xuICAgICAgICAgICAgdmlldzogXCJmb3JtXCIsXG4gICAgICAgICAgICBpZDogXCJmb3JtXCIsXG4gICAgICAgICAgICBlbGVtZW50c0NvbmZpZzogeyBsYWJlbFdpZHRoOiAxMjAgfSxcbiAgICAgICAgICAgIGVsZW1lbnRzOiBbXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICB2aWV3OiBcInRleHRcIixcbiAgICAgICAgICAgICAgICAgICAgbGFiZWw6IFwiSURcIixcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJpZFwiLFxuICAgICAgICAgICAgICAgICAgICByZWFkb25seTogdHJ1ZSxcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgdmlldzogXCJ0ZXh0XCIsXG4gICAgICAgICAgICAgICAgICAgIGxhYmVsOiBcIk5hbWVcIixcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJzb3VyY2VfbmFtZVwiLFxuICAgICAgICAgICAgICAgICAgICByZWFkb25seTogdHJ1ZSxcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgdmlldzogXCJ0ZXh0XCIsXG4gICAgICAgICAgICAgICAgICAgIGxhYmVsOiBcIkF1dGhvclwiLFxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImF1dGhvclwiLFxuICAgICAgICAgICAgICAgICAgICByZWFkb25seTogdHJ1ZSxcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgdmlldzogXCJ0ZXh0XCIsXG4gICAgICAgICAgICAgICAgICAgIGxhYmVsOiBcIlN0YXR1c1wiLFxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcInN0YXR1c1wiLFxuICAgICAgICAgICAgICAgICAgICByZWFkb25seTogdHJ1ZSxcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgdmlldzogXCJ0ZXh0YXJlYVwiLFxuICAgICAgICAgICAgICAgICAgICBsYWJlbDogXCJEZXNjcmlwdGlvblwiLFxuICAgICAgICAgICAgICAgICAgICBoZWlnaHQ6IDEwMCxcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJkZXNjcmlwdGlvblwiLFxuICAgICAgICAgICAgICAgICAgICByZWFkb25seTogdHJ1ZVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICB2aWV3OiBcInRleHRcIixcbiAgICAgICAgICAgICAgICAgICAgbGFiZWw6IFwiVmVyc2lvblwiLFxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcInZlcnNpb25cIixcbiAgICAgICAgICAgICAgICAgICAgcmVhZG9ubHk6IHRydWVcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgdmlldzogXCJ0ZXh0XCIsXG4gICAgICAgICAgICAgICAgICAgIGxhYmVsOiBcImluc3RhbGxfa3dhcmdzXCIsXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiaW5zdGFsbF9rd2FyZ3NcIixcbiAgICAgICAgICAgICAgICAgICAgcmVhZG9ubHk6IHRydWVcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgdmlldzogXCJ0ZXh0XCIsXG4gICAgICAgICAgICAgICAgICAgIGxhYmVsOiBcImZyb250ZW5kX2FyZ3NcIixcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJmcm9udGVuZF9hcmdzXCIsXG4gICAgICAgICAgICAgICAgICAgIHJlYWRvbmx5OiB0cnVlXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIHZpZXc6IFwidGV4dFwiLFxuICAgICAgICAgICAgICAgICAgICBsYWJlbDogXCJQYXRoXCIsXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwicGF0aFwiLFxuICAgICAgICAgICAgICAgICAgICByZWFkb25seTogdHJ1ZVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICB2aWV3OiBcInRleHRcIixcbiAgICAgICAgICAgICAgICAgICAgbGFiZWw6IFwiZ2l0dXJsXCIsXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiZ2l0dXJsXCIsXG4gICAgICAgICAgICAgICAgICAgIHJlYWRvbmx5OiB0cnVlLFxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIF1cbiAgICAgICAgfTtcblxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgdmlldzogXCJ3aW5kb3dcIixcbiAgICAgICAgICAgIGhlYWQ6IFwiUGFja2FnZSBEZXRhaWxzXCIsXG4gICAgICAgICAgICBtb2RhbDogdHJ1ZSxcbiAgICAgICAgICAgIHdpZHRoOiB3aW5kb3cuaW5uZXJXaWR0aCAqIC44LFxuICAgICAgICAgICAgaGVpZ2h0OiB3aW5kb3cuaW5uZXJIZWlnaHQgKiAuOCxcbiAgICAgICAgICAgIHBvc2l0aW9uOiBcImNlbnRlclwiLFxuICAgICAgICAgICAgYm9keToge1xuICAgICAgICAgICAgICAgIHJvd3M6IFtcbiAgICAgICAgICAgICAgICAgICAgaW5mbyxcbiAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmlldzogXCJidXR0b25cIixcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlOiBcIk9LXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBjc3M6IFwid2ViaXhfcHJpbWFyeVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgY2xpY2s6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmdldFRvcFBhcmVudFZpZXcoKS5oaWRlKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBzaG93UGFja2FnZURldGFpbHMoZGF0YSkge1xuICAgICAgICB0aGlzLmZvcm0ucGFyc2UoZGF0YSlcbiAgICAgICAgdGhpcy5nZXRSb290KCkuc2hvdygpO1xuICAgIH1cblxuICAgIGluaXQoKSB7XG4gICAgICAgIHRoaXMuZm9ybSA9ICQkKFwiZm9ybVwiKTtcbiAgICB9XG59XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc291cmNlcy92aWV3cy9wYWNrYWdlcy9wYWNrYWdlRGV0YWlscy5qcyIsImltcG9ydCB7IEpldFZpZXcgfSBmcm9tIFwid2ViaXgtamV0XCI7XG5cbmltcG9ydCB7IGlucHV0RGlhbG9nIH0gZnJvbSBcIi4uLy4uL2NvbW1vbi9kaWFsb2dzXCI7XG5pbXBvcnQgeyBhZG1pbiB9IGZyb20gXCIuLi8uLi9zZXJ2aWNlcy9hZG1pblwiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBBZG1pbnNWaWV3IGV4dGVuZHMgSmV0VmlldyB7XG4gICAgY29uZmlnKCkge1xuICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XG5cbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHJvd3M6IFt7XG4gICAgICAgICAgICAgICAgY29sczogW3tcbiAgICAgICAgICAgICAgICAgICAgdmlldzogXCJ0ZW1wbGF0ZVwiLFxuICAgICAgICAgICAgICAgICAgICB0ZW1wbGF0ZTogXCJBbGwgb2YgdGhlIGZvbGxvd2luZyAzQm90IG5hbWVzIGNhbiBhY2Nlc3MgZGFzaGJvYXJkLCB5b3UgY2FuIGFkZCBvciByZW1vdmUgdGhlbSBmcm9tIGhlcmVcIixcbiAgICAgICAgICAgICAgICAgICAgYXV0b2hlaWdodDogdHJ1ZSxcbiAgICAgICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgICAgIGxvY2FsSWQ6IFwiYWRkLWFkbWluXCIsXG4gICAgICAgICAgICAgICAgICAgIHZpZXc6IFwiYnV0dG9uXCIsXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlOiBcIkFkZCBuZXcgYWRtaW5pc3RyYXRvclwiLFxuICAgICAgICAgICAgICAgICAgICBjbGljazogc2VsZi5hZGRBZG1pbi5iaW5kKHNlbGYpLFxuICAgICAgICAgICAgICAgIH1dXG4gICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgbG9jYWxJZDogXCJhZG1pbnMtdGFibGVcIixcbiAgICAgICAgICAgICAgICB2aWV3OiBcImRhdGF0YWJsZVwiLFxuICAgICAgICAgICAgICAgIGF1dG9oZWlnaHQ6IHRydWUsXG4gICAgICAgICAgICAgICAgY29sdW1uczogW3tcbiAgICAgICAgICAgICAgICAgICAgaWQ6IFwibmFtZVwiLFxuICAgICAgICAgICAgICAgICAgICB3aWR0aDogNTAwLFxuICAgICAgICAgICAgICAgICAgICBoZWFkZXI6IFtcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiTmFtZVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRlbnQ6IFwidGV4dEZpbHRlclwiXG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgICAgIHNvcnQ6IFwic3RyaW5nXCIsXG4gICAgICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgICAgICBoZWFkZXI6IFwiRGVsZXRlXCIsXG4gICAgICAgICAgICAgICAgICAgIHRlbXBsYXRlOiBmdW5jdGlvbiAob2JqKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gXCI8c3BhbiBjbGFzcz0nd2ViaXhfaWNvbiBtZGkgbWRpLXRyYXNoLWNhbiB3ZWJpeF9kYW5nZXIgZGVsZXRlX2FkbWluJz48L3NwYW4+XCI7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XSxcbiAgICAgICAgICAgICAgICBvbkNsaWNrOiB7XG4gICAgICAgICAgICAgICAgICAgIGRlbGV0ZV9hZG1pbjogZnVuY3Rpb24gKGUsIGlkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLiRzY29wZS5kZWxldGVBZG1pbihpZCk7XG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfV1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIGhhbmRsZVJlc3VsdCgpIHtcblxuICAgIH1cblxuICAgIGFkZEFkbWluKCkge1xuICAgICAgICBjb25zdCBzZWxmID0gdGhpcztcblxuICAgICAgICBpbnB1dERpYWxvZyhcIkFkZCBhZG1pblwiLCBcIjNCb3QgbmFtZVwiLCBcIkFkZFwiLCAoaW5wdXQpID0+IHtcbiAgICAgICAgICAgIGlmIChhZG1pbi5hZGQoaW5wdXQpKSB7XG4gICAgICAgICAgICAgICAgc2VsZi50YWJsZS5hZGQoeyBuYW1lOiBpbnB1dCB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgZGVsZXRlQWRtaW4oaXRlbUlkKSB7XG4gICAgICAgIGNvbnN0IHNlbGYgPSB0aGlzO1xuXG4gICAgICAgIGNvbnN0IGl0ZW0gPSBzZWxmLnRhYmxlLmdldEl0ZW0oaXRlbUlkKTtcblxuICAgICAgICB3ZWJpeC5jb25maXJtKHtcbiAgICAgICAgICAgIHRpdGxlOiBcIkRlbGV0ZSBhZG1pblwiLFxuICAgICAgICAgICAgb2s6IFwiWWVzXCIsXG4gICAgICAgICAgICB0ZXh0OiBgQXJlIHlvdSBzdXJlIHlvdSB3YW50IHRvIGRlbGV0ZSBcIiR7aXRlbS5uYW1lfVwiP2AsXG4gICAgICAgICAgICBjYW5jZWw6IFwiTm9cIixcbiAgICAgICAgfSkudGhlbigoKSA9PiB7XG4gICAgICAgICAgICBpZiAoYWRtaW4uZGVsZXRlKGl0ZW0ubmFtZSkpIHtcbiAgICAgICAgICAgICAgICBzZWxmLnRhYmxlLnJlbW92ZShpdGVtSWQpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBpbml0KCkge1xuICAgICAgICB0aGlzLnRhYmxlID0gdGhpcy4kJChcImFkbWlucy10YWJsZVwiKTtcblxuICAgICAgICBhZG1pbi5saXN0KCkudGhlbihkYXRhID0+IHtcbiAgICAgICAgICAgIHRoaXMudGFibGUucGFyc2UoZGF0YS5qc29uKCkpO1xuICAgICAgICB9KTtcblxuICAgICAgICAvL3dlYml4LmV4dGVuZCh0aGlzLnRhYmxlLCB3ZWJpeC5Qcm9ncmVzc0Jhcik7XG4gICAgfVxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc291cmNlcy92aWV3cy9zZXR0aW5ncy9hZG1pbnMuanMiLCJpbXBvcnQgeyBKZXRWaWV3IH0gZnJvbSBcIndlYml4LWpldFwiO1xuXG5pbXBvcnQgeyBhZG1pbiB9IGZyb20gXCIuLi8uLi9zZXJ2aWNlcy9hZG1pblwiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBHZW5lcmFsVmlldyBleHRlbmRzIEpldFZpZXcge1xuICAgIGNvbmZpZygpIHtcblxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgbG9jYWxJZDogXCJnZW5lcmFsX2Zvcm1cIixcbiAgICAgICAgICAgIHZpZXc6IFwiZm9ybVwiLFxuICAgICAgICAgICAgZWxlbWVudHM6IFtcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIHZpZXc6IFwicmljaHNlbGVjdFwiLFxuICAgICAgICAgICAgICAgICAgICBpZDogXCJleHBsb3Jlcl9saXN0XCIsXG4gICAgICAgICAgICAgICAgICAgIGxhYmVsOiBcIkV4cGxvcmVyXCIsXG4gICAgICAgICAgICAgICAgICAgIGxhYmVsV2lkdGg6IDE1MCxcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU6IFwidGVzdG5ldFwiLFxuICAgICAgICAgICAgICAgICAgICB5Q291bnQ6IDIsXG4gICAgICAgICAgICAgICAgICAgIG9wdGlvbnM6IFtcbiAgICAgICAgICAgICAgICAgICAgICAgIHsgaWQ6IFwidGVzdG5ldFwiLCB2YWx1ZTogXCJUZXN0IE5ldFwiIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICB7IGlkOiBcIm1haW5cIiwgdmFsdWU6IFwiTWFpblwiIH0sXG4gICAgICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgbG9jYWxJZDogXCJleHBsb3Jlcl9hZGRyZXNzXCIsXG4gICAgICAgICAgICAgICAgICAgIHZpZXc6IFwidGV4dFwiLFxuICAgICAgICAgICAgICAgICAgICB0eXBlOiBcInRleHRcIixcbiAgICAgICAgICAgICAgICAgICAgcmVhZG9ubHk6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgIGxhYmVsOiBcIkV4cGxvcmVyIGFkZHJlc3NcIixcbiAgICAgICAgICAgICAgICAgICAgbGFiZWxXaWR0aDogMTUwLFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBdXG4gICAgICAgIH1cblxuICAgIH1cblxuICAgIGRvQWN0aW9uKHByb21pc2UsIGNhbGxiYWNrKSB7XG4gICAgICAgIHRoaXMuZm9ybS5zaG93UHJvZ3Jlc3MoKVxuICAgICAgICBwcm9taXNlLnRoZW4oKGRhdGEpID0+IHtcbiAgICAgICAgICAgIGlmIChjYWxsYmFjaykge1xuICAgICAgICAgICAgICAgIGNhbGxiYWNrKGRhdGEpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY29uc29sZS5sb2coZGF0YSk7XG4gICAgICAgICAgICB0aGlzLmZvcm0uc2hvd1Byb2dyZXNzKHsgaGlkZTogdHJ1ZSB9KTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgaW5pdCgpIHtcbiAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xuXG4gICAgICAgIHNlbGYuZm9ybSA9IHNlbGYuJCQoJ2dlbmVyYWxfZm9ybScpO1xuICAgICAgICB3ZWJpeC5leHRlbmQoc2VsZi5mb3JtLCB3ZWJpeC5Qcm9ncmVzc0Jhcik7XG5cbiAgICAgICAgc2VsZi5leHBsb3Jlckxpc3QgPSBzZWxmLiQkKCdleHBsb3Jlcl9saXN0Jyk7XG4gICAgICAgIHNlbGYuZXhwbG9yZXJBZGRyZXNzID0gc2VsZi4kJCgnZXhwbG9yZXJfYWRkcmVzcycpO1xuXG5cbiAgICAgICAgc2VsZi5kb0FjdGlvbihhZG1pbi5nZXRfZXhwbG9yZXIoKSwgKGRhdGEpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGV4cGxvcmVyID0gZGF0YS5qc29uKCk7XG4gICAgICAgICAgICBzZWxmLmV4cGxvcmVyTGlzdC5zZXRWYWx1ZShleHBsb3Jlci50eXBlKTtcbiAgICAgICAgICAgIHNlbGYuZXhwbG9yZXJBZGRyZXNzLnNldFZhbHVlKGV4cGxvcmVyLnVybCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHNlbGYuZXhwbG9yZXJMaXN0LmF0dGFjaEV2ZW50KFwib25DaGFuZ2VcIiwgKG5ld1ZhbHVlKSA9PiB7XG4gICAgICAgICAgICBzZWxmLmRvQWN0aW9uKGFkbWluLnNldF9leHBsb3JlcihuZXdWYWx1ZS50b0xvd2VyQ2FzZSgpKSwgKGRhdGEpID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCBleHBsb3JlciA9IGRhdGEuanNvbigpO1xuICAgICAgICAgICAgICAgIHNlbGYuZXhwbG9yZXJBZGRyZXNzLnNldFZhbHVlKGV4cGxvcmVyLnVybCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG5cblxuICAgIH1cbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NvdXJjZXMvdmlld3Mvc2V0dGluZ3MvZ2VuZXJhbC5qcyIsImltcG9ydCB7IEpldFZpZXcgfSBmcm9tIFwid2ViaXgtamV0XCI7XG5pbXBvcnQgeyB3YWxsZXQgfSBmcm9tIFwiLi4vLi4vc2VydmljZXMvd2FsbGV0XCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFdhbGxldEZvcm1WaWV3IGV4dGVuZHMgSmV0VmlldyB7XG4gICAgY29uZmlnKCkge1xuICAgICAgICBjb25zdCBpbmZvID0ge1xuICAgICAgICAgICAgdmlldzogXCJmb3JtXCIsXG4gICAgICAgICAgICBpZDogXCJmb3JtXCIsXG4gICAgICAgICAgICBlbGVtZW50c0NvbmZpZzogeyBsYWJlbFdpZHRoOiAyMDAgfSxcbiAgICAgICAgICAgIGVsZW1lbnRzOiBbXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICB2aWV3OiBcInRleHRcIixcbiAgICAgICAgICAgICAgICAgICAgbGFiZWw6IFwiTmFtZVwiLFxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcIm5hbWVcIixcbiAgICAgICAgICAgICAgICAgICAgcGxhY2Vob2xkZXI6IFwiV2FsbGV0IG5hbWVcIlxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIF1cbiAgICAgICAgfTtcblxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgdmlldzogXCJ3aW5kb3dcIixcbiAgICAgICAgICAgIGhlYWQ6IFwiQ3JlYXRlIG5ldyB3YWxsZXRcIixcbiAgICAgICAgICAgIG1vZGFsOiB0cnVlLFxuICAgICAgICAgICAgd2lkdGg6IHdpbmRvdy5pbm5lcldpZHRoICogLjgsXG4gICAgICAgICAgICBoZWlnaHQ6IHdpbmRvdy5pbm5lckhlaWdodCAqIC44LFxuICAgICAgICAgICAgcG9zaXRpb246IFwiY2VudGVyXCIsXG4gICAgICAgICAgICBib2R5OiB7XG4gICAgICAgICAgICAgICAgcm93czogW1xuICAgICAgICAgICAgICAgICAgICBpbmZvLFxuICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICB2aWV3OiBcImJ1dHRvblwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU6IFwiT0tcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIGNzczogXCJ3ZWJpeF9wcmltYXJ5XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBjbGljazogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciB3YWxsZXRfbmFtZSA9ICQkKCdmb3JtJykuZ2V0VmFsdWVzKCkubmFtZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuJHNjb3BlLmNyZWF0ZVdhbGxldCh3YWxsZXRfbmFtZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBpbml0KCkge1xuICAgICAgICB0aGlzLmZvcm0gPSAkJChcImZvcm1cIik7XG4gICAgfVxuXG4gICAgc2hvd0Zvcm0oKSB7XG4gICAgICAgIHRoaXMuZ2V0Um9vdCgpLnNob3coKTtcbiAgICB9XG5cbiAgICBjcmVhdGVXYWxsZXQobmFtZSl7XG5cbiAgICAgICAgd2ViaXguZXh0ZW5kKHRoaXMuZm9ybSwgd2ViaXguUHJvZ3Jlc3NCYXIpO1xuICAgICAgICB0aGlzLmZvcm0uc2hvd1Byb2dyZXNzKHtcbiAgICAgICAgICAgIHR5cGU6XCJpY29uXCIsXG4gICAgICAgICAgICBoaWRlOiBmYWxzZVxuICAgICAgICB9KTtcbiAgICAgICAgd2FsbGV0LmNyZWF0ZVdhbGxldChuYW1lKS50aGVuKGRhdGEgPT4ge1xuICAgICAgICAgICAgd2ViaXgubWVzc2FnZSh7IHR5cGU6IFwic3VjY2Vzc1wiLCB0ZXh0OiBcIldhbGxldCBjcmVhdGVkIHN1Y2Nlc3NmdWxseVwiIH0pO1xuICAgICAgICAgICAgdGhpcy5mb3JtLnNob3dQcm9ncmVzcyh7aGlkZTogdHJ1ZX0pO1xuICAgICAgICAgICAgdGhpcy5mb3JtLmdldFRvcFBhcmVudFZpZXcoKS5oaWRlKCk7XG4gICAgICAgICAgICB0aGlzLmFwcC5yZWZyZXNoKClcbiAgICAgICAgfSkuY2F0Y2goZXJyb3IgPT4ge1xuICAgICAgICAgICAgd2ViaXgubWVzc2FnZSh7IHR5cGU6IFwiZXJyb3JcIiwgdGV4dDogXCJDb3VsZCBub3QgY3JlYXRlIHdhbGxldFwiIH0pO1xuICAgICAgICAgICAgdGhpcy5mb3JtLnNob3dQcm9ncmVzcyh7aGlkZTogdHJ1ZX0pO1xuICAgICAgICAgICAgdGhpcy5mb3JtLmdldFRvcFBhcmVudFZpZXcoKS5oaWRlKCk7XG4gICAgICAgICAgICB0aGlzLmFwcC5yZWZyZXNoKClcbiAgICAgICAgfSk7XG4gICAgfVxufVxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NvdXJjZXMvdmlld3Mvd2FsbGV0c01hbmFnZXIvd2FsbGV0Rm9ybS5qcyIsImltcG9ydCB7IFNlcnZpY2UgfSBmcm9tIFwiLi4vY29tbW9uL2FwaVwiO1xuXG5jb25zdCBCQVNFX1VSTCA9IFwiL3plcm9ib3QvYWRtaW4vYWN0b3JzL3dhbGxldFwiO1xuXG5jbGFzcyBXYWxsZXRTZXJ2aWNlIGV4dGVuZHMgU2VydmljZSB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHN1cGVyKEJBU0VfVVJMKTtcbiAgICB9XG5cbiAgICBjcmVhdGVXYWxsZXQobmFtZSkge1xuICAgICAgICByZXR1cm4gdGhpcy5nZXRDYWxsKFwiY3JlYXRlX3dhbGxldFwiLCBuYW1lKTtcbiAgICB9XG5cbiAgICBtYW5hZ2VXYWxsZXQobmFtZSkge1xuICAgICAgICByZXR1cm4gdGhpcy5nZXRDYWxsKFwibWFuYWdlX3dhbGxldFwiLCBuYW1lKTtcbiAgICB9XG5cbiAgICBnZXRXYWxsZXRzKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5nZXRDYWxsKFwiZ2V0X3dhbGxldHNcIik7XG4gICAgfVxuXG4gICAgaW1wb3J0V2FsbGV0KG5hbWUsIHNlY3JldCwgbmV0d29yaykge1xuICAgICAgICByZXR1cm4gdGhpcy5wb3N0Q2FsbChcImltcG9ydF93YWxsZXRcIiwge25hbWUsIHNlY3JldCwgbmV0d29ya30pO1xuICAgIH1cbn1cblxuZXhwb3J0IGNvbnN0IHdhbGxldCA9IG5ldyBXYWxsZXRTZXJ2aWNlKCk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zb3VyY2VzL3NlcnZpY2VzL3dhbGxldC5qcyIsImltcG9ydCB7IEpldFZpZXcgfSBmcm9tIFwid2ViaXgtamV0XCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFdhbGxldERldGFpbHNWaWV3IGV4dGVuZHMgSmV0VmlldyB7XG4gICAgY29uZmlnKCkge1xuICAgICAgICBjb25zdCBpbmZvID0ge1xuICAgICAgICAgICAgaWQ6IFwid2FsbGV0X2luZm9cIixcbiAgICAgICAgICAgIHZpZXc6IFwibGlzdFwiLFxuICAgICAgICAgICAgcmVzcG9uc2l2ZTogdHJ1ZSxcbiAgICAgICAgICAgIHR5cGU6IHtcbiAgICAgICAgICAgICAgICBoZWlnaHQ6ICdhdXRvJyxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB0ZW1wbGF0ZTogYFxuICAgICAgICAgICAgICAgIDxwPjwvZm9udD48Zm9udCBzaXplPVwiM1wiPjxiPiNrZXkjOiA8L2I+I3ZhbHVlIzwvZm9udD48YnI+PC9wPlxuICAgICAgICAgICAgYFxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHZpZXc6IFwid2luZG93XCIsXG4gICAgICAgICAgICBoZWFkOiBcIldhbGxldCBEZXRhaWxzXCIsXG4gICAgICAgICAgICBtb2RhbDogdHJ1ZSxcbiAgICAgICAgICAgIHdpZHRoOiB3aW5kb3cuaW5uZXJXaWR0aCAqIC44LFxuICAgICAgICAgICAgaGVpZ2h0OiB3aW5kb3cuaW5uZXJIZWlnaHQgKiAuOCxcbiAgICAgICAgICAgIHBvc2l0aW9uOiBcImNlbnRlclwiLFxuICAgICAgICAgICAgYm9keToge1xuICAgICAgICAgICAgICAgIHJvd3M6IFtcbiAgICAgICAgICAgICAgICAgICAgaW5mbyxcbiAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmlldzogXCJidXR0b25cIixcbiAgICAgICAgICAgICAgICAgICAgICAgIGlkOiBcInNlY3JldF9idG5cIixcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlOiBcIlNob3cgU2VjcmV0XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBjc3M6IFwid2ViaXhfcHJpbWFyeVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgY2xpY2s6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLiRzY29wZS5zaG93U2VjcmV0KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZpZXc6IFwiYnV0dG9uXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZTogXCJPS1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgY3NzOiBcIndlYml4X3ByaW1hcnlcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIGNsaWNrOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJCQoXCJzZWNyZXRfYnRuXCIpLmVuYWJsZSgpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5nZXRUb3BQYXJlbnRWaWV3KCkuaGlkZSgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgaW5pdCgpIHtcbiAgICAgICAgY29uc3Qgc2VsZiA9IHRoaXM7XG4gICAgICAgIHNlbGYuaW5mbyA9IHRoaXMuJCQoXCJ3YWxsZXRfaW5mb1wiKTtcbiAgICAgICAgc2VsZi5zZWNyZXRfYnRuID0gdGhpcy4kJChcInNlY3JldF9idG5cIik7XG4gICAgICAgIHNlbGYuc2VjcmV0ID0gXCJcIjtcbiAgICB9XG5cbiAgICBzaG93U2VjcmV0KCkge1xuICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XG5cbiAgICAgICAgc2VsZi5pbmZvLmFkZCh7XG4gICAgICAgICAgICBrZXk6ICdTZWNyZXQnLFxuICAgICAgICAgICAgdmFsdWU6IHNlbGYuc2VjcmV0XG4gICAgICAgIH0pO1xuICAgICAgICBzZWxmLnNlY3JldF9idG4uZGlzYWJsZSgpXG4gICAgfVxuICAgIFxuICAgIHNob3dJbmZvKGRhdGEpe1xuICAgICAgICB2YXIgc2VsZiA9IHRoaXNcblxuICAgICAgICB2YXIgYmFsYW5jZXMgPSBcIlwiO1xuICAgICAgICBmb3IgKHZhciBpIGluIGRhdGEuYmFsYW5jZXMpIHtcbiAgICAgICAgICAgIGJhbGFuY2VzICs9IGA8YnI+JHtkYXRhLmJhbGFuY2VzW2ldLmJhbGFuY2V9IDxiPiR7ZGF0YS5iYWxhbmNlc1tpXS5hc3NldF9jb2RlfTwvYj5gXG4gICAgICAgIH1cbiAgICAgICAgc2VsZi5pbmZvLmNsZWFyQWxsKClcbiAgICAgICAgc2VsZi5pbmZvLmFkZCh7XG4gICAgICAgICAgICBrZXk6ICdOYW1lJyxcbiAgICAgICAgICAgIHZhbHVlOiBkYXRhLm5hbWVcbiAgICAgICAgfSk7XG4gICAgICAgIHNlbGYuaW5mby5hZGQoe1xuICAgICAgICAgICAga2V5OiAnQWRkcmVzcycsXG4gICAgICAgICAgICB2YWx1ZTogZGF0YS5hZGRyZXNzXG4gICAgICAgIH0pO1xuICAgICAgICBzZWxmLmluZm8uYWRkKHtcbiAgICAgICAgICAgIGtleTogJ0JhbGFuY2VzJyxcbiAgICAgICAgICAgIHZhbHVlOiBiYWxhbmNlc1xuICAgICAgICB9KTtcbiAgICAgICAgc2VsZi5zZWNyZXQgPSBkYXRhLnNlY3JldDtcblxuICAgICAgICB0aGlzLmdldFJvb3QoKS5zaG93KCk7XG4gICAgfVxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc291cmNlcy92aWV3cy93YWxsZXRzTWFuYWdlci93YWxsZXREZXRhaWxzLmpzIiwiaW1wb3J0IHsgSmV0VmlldyB9IGZyb20gXCJ3ZWJpeC1qZXRcIjtcblxuaW1wb3J0IHsgd2FsbGV0IH0gZnJvbSBcIi4uLy4uL3NlcnZpY2VzL3dhbGxldFwiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBXYWxsZXRJbXBvcnRWaWV3IGV4dGVuZHMgSmV0VmlldyB7XG4gICAgY29uZmlnKCkge1xuICAgICAgICBjb25zdCBpbmZvID0ge1xuICAgICAgICAgICAgdmlldzogXCJmb3JtXCIsXG4gICAgICAgICAgICBpZDogXCJpbXBvcnRfZm9ybVwiLFxuICAgICAgICAgICAgZWxlbWVudHNDb25maWc6IHsgbGFiZWxXaWR0aDogMjAwIH0sXG4gICAgICAgICAgICBlbGVtZW50czogW1xuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgdmlldzogXCJ0ZXh0XCIsXG4gICAgICAgICAgICAgICAgICAgIGxhYmVsOiBcIk5hbWVcIixcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJuYW1lXCIsXG4gICAgICAgICAgICAgICAgICAgIHBsYWNlaG9sZGVyOiBcIldhbGxldCBuYW1lXCJcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgdmlldzogXCJ0ZXh0XCIsXG4gICAgICAgICAgICAgICAgICAgIGxhYmVsOiBcIlNlY3JldFwiLFxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcInNlY3JldFwiLFxuICAgICAgICAgICAgICAgICAgICBwbGFjZWhvbGRlcjogXCJXYWxsZXQgc2VjcmV0XCJcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICB2aWV3Olwic2VsZWN0XCIsIFxuICAgICAgICAgICAgICAgIGxhYmVsOlwiTmV0d29yayBUeXBlXCIsIFxuICAgICAgICAgICAgICAgIHZhbHVlOiBcIm5ldHdvcmtcIixcbiAgICAgICAgICAgICAgICBuYW1lOiBcIm5ldHdvcmtcIixcbiAgICAgICAgICAgICAgICBvcHRpb25zOltcbiAgICAgICAgICAgICAgICAgICAgeyBcImlkXCI6XCJTVERcIiwgXCJ2YWx1ZVwiOlwiU1REXCIgfSxcbiAgICAgICAgICAgICAgICAgICAgeyBcImlkXCI6XCJURVNUXCIsIFwidmFsdWVcIjpcIlRFU1RcIiB9XG4gICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgXVxuICAgICAgICB9O1xuXG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICB2aWV3OiBcIndpbmRvd1wiLFxuICAgICAgICAgICAgaGVhZDogXCJJbXBvcnQgd2FsbGV0XCIsXG4gICAgICAgICAgICBtb2RhbDogdHJ1ZSxcbiAgICAgICAgICAgIHdpZHRoOiB3aW5kb3cuaW5uZXJXaWR0aCAqIC44LFxuICAgICAgICAgICAgaGVpZ2h0OiB3aW5kb3cuaW5uZXJIZWlnaHQgKiAuOCxcbiAgICAgICAgICAgIHBvc2l0aW9uOiBcImNlbnRlclwiLFxuICAgICAgICAgICAgYm9keToge1xuICAgICAgICAgICAgICAgIHJvd3M6IFtcbiAgICAgICAgICAgICAgICAgICAgaW5mbyxcbiAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmlldzogXCJidXR0b25cIixcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlOiBcIk9LXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBjc3M6IFwid2ViaXhfcHJpbWFyeVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgY2xpY2s6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgbmFtZSA9ICQkKCdpbXBvcnRfZm9ybScpLmdldFZhbHVlcygpLm5hbWVcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgc2VjcmV0ID0gJCQoJ2ltcG9ydF9mb3JtJykuZ2V0VmFsdWVzKCkuc2VjcmV0XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIG5ldHdvcmsgPSAkJCgnaW1wb3J0X2Zvcm0nKS5nZXRWYWx1ZXMoKS5uZXR3b3JrXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2cobmFtZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coc2VjcmV0KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhuZXR3b3JrKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLiRzY29wZS5pbXBvcnRXYWxsZXQobmFtZSwgc2VjcmV0LCBuZXR3b3JrKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIGluaXQoKSB7XG4gICAgICAgIHRoaXMuZm9ybSA9ICQkKFwiaW1wb3J0X2Zvcm1cIik7XG4gICAgfVxuXG4gICAgc2hvd0Zvcm0oKSB7XG4gICAgICAgIHRoaXMuZ2V0Um9vdCgpLnNob3coKTtcbiAgICB9XG5cbiAgICBpbXBvcnRXYWxsZXQobmFtZSwgc2VjcmV0LCBuZXR3b3JrKSB7XG4gICAgICAgIFxuICAgICAgICB3ZWJpeC5leHRlbmQodGhpcy5mb3JtLCB3ZWJpeC5Qcm9ncmVzc0Jhcik7XG4gICAgICAgIHRoaXMuZm9ybS5zaG93UHJvZ3Jlc3Moe1xuICAgICAgICAgICAgdHlwZTpcImljb25cIixcbiAgICAgICAgICAgIGhpZGU6IGZhbHNlXG4gICAgICAgIH0pO1xuICAgICAgICB3YWxsZXQuaW1wb3J0V2FsbGV0KG5hbWUsIHNlY3JldCwgbmV0d29yaykudGhlbihkYXRhID0+IHtcbiAgICAgICAgICAgIHdlYml4Lm1lc3NhZ2UoeyB0eXBlOiBcInN1Y2Nlc3NcIiwgdGV4dDogXCJXYWxsZXQgaW1wb3J0ZWQgc3VjY2Vzc2Z1bGx5XCIgfSk7XG4gICAgICAgICAgICB0aGlzLmZvcm0uc2hvd1Byb2dyZXNzKHtoaWRlOiB0cnVlfSk7XG4gICAgICAgICAgICB0aGlzLmZvcm0uY2xlYXIoKTsgXG4gICAgICAgICAgICB0aGlzLmZvcm0uZ2V0VG9wUGFyZW50VmlldygpLmhpZGUoKTtcbiAgICAgICAgICAgIHRoaXMuYXBwLnJlZnJlc2goKVxuICAgICAgICB9KS5jYXRjaChlcnJvciA9PiB7XG4gICAgICAgICAgICB3ZWJpeC5tZXNzYWdlKHsgdHlwZTogXCJlcnJvclwiLCB0ZXh0OiBcIkNvdWxkIG5vdCBpbXBvcnQgd2FsbGV0XCIgfSk7XG4gICAgICAgICAgICB0aGlzLmZvcm0uc2hvd1Byb2dyZXNzKHtoaWRlOiB0cnVlfSk7XG4gICAgICAgICAgICB0aGlzLmZvcm0uY2xlYXIoKTsgXG4gICAgICAgICAgICB0aGlzLmZvcm0uZ2V0VG9wUGFyZW50VmlldygpLmhpZGUoKTtcbiAgICAgICAgICAgIHRoaXMuYXBwLnJlZnJlc2goKVxuICAgICAgICB9KTtcbiAgICB9XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zb3VyY2VzL3ZpZXdzL3dhbGxldHNNYW5hZ2VyL2ltcG9ydEZvcm0uanMiLCJleHBvcnQgZnVuY3Rpb24gY3JlYXRlRmlsdGVyT3B0aW9ucyhvYmopIHtcbiAgICAvLyByZXR1cm5zIGEgbmV3IG9iamVjdCBhcyB7aWQ6IHZhbHVlfSwgdXNlZCBhcyBkYXRhIHRhYmxlIGZpbHRlciBvcHRpb25zXG4gICAgLy8gb2JqOiBjYW4gYmUgYW4gYXJyYXkgb3IgYSBtYXBwaW5nIG9iamVjdFxuXG4gICAgaWYgKG9iaiBpbnN0YW5jZW9mIEFycmF5KSB7XG4gICAgICAgIHJldHVybiBvYmoubWFwKCh2YWx1ZSwgaW5kZXgpID0+IHtcbiAgICAgICAgICAgIHJldHVybiB7IGlkOiBpbmRleCwgdmFsdWU6IHZhbHVlIH1cbiAgICAgICAgfSk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgLy8gYXNzdW1lIGl0J3MganVzdCBhIG1hcHBpbmcgb3RoZXJ3aXNlXG4gICAgICAgIHJldHVybiBPYmplY3Qua2V5cyhvYmopLm1hcChrZXkgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIHsgaWQ6IGtleSwgdmFsdWU6IG9ialtrZXldIH1cbiAgICAgICAgfSk7XG4gICAgfVxuXG5cbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NvdXJjZXMvY29tbW9uL2ZpbHRlcnMuanMiLCJpbXBvcnQgeyBTZXJ2aWNlIH0gZnJvbSBcIi4uL2NvbW1vbi9hcGlcIjtcblxuY29uc3QgQkFTRV9VUkwgPSBcIi96ZXJvYm90L2FkbWluL2FjdG9ycy9wYWNrYWdlX21hbmFnZXJcIjtcblxuXG5jbGFzcyBQYWNrYWdlc1NlcnZpY2UgZXh0ZW5kcyBTZXJ2aWNlIHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgc3VwZXIoQkFTRV9VUkwpO1xuICAgIH1cblxuICAgIGdldFN0YXR1cyhuYW1lcykge1xuICAgICAgICAvLyBwb3N0IGNhbGwgdG8gc2VuZCBhcmdzIGFzIGpzb25cbiAgICAgICAgcmV0dXJuIHRoaXMucG9zdENhbGwoXCJwYWNrYWdlc19nZXRfc3RhdHVzXCIsIHtcbiAgICAgICAgICAgIG5hbWVzOiBuYW1lc1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBsaXN0KG9wdHMpIHtcbiAgICAgICAgb3B0cyA9IG9wdHMgfHwge307XG4gICAgICAgIHJldHVybiB0aGlzLmdldENhbGwoXCJwYWNrYWdlc19saXN0XCIpO1xuICAgIH1cblxuICAgIGFkZChwYXRoLCBnaXRVcmwpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucG9zdENhbGwoXCJwYWNrYWdlX2FkZFwiLCB7XG4gICAgICAgICAgICBwYXRoOiBwYXRoLFxuICAgICAgICAgICAgZ2l0X3VybDogZ2l0VXJsXG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGRlbGV0ZShwYWNrYWdlTmFtZSkge1xuICAgICAgICByZXR1cm4gdGhpcy5wb3N0Q2FsbChcInBhY2thZ2VfZGVsZXRlXCIsIHsgbmFtZTogcGFja2FnZU5hbWUgfSk7XG5cbiAgICB9XG5cbiAgICBzdGFydChwYWNrYWdlTmFtZSkge1xuICAgICAgICByZXR1cm4gdGhpcy5wb3N0Q2FsbChcInBhY2thZ2Vfc3RhcnRcIiwgeyBuYW1lOiBwYWNrYWdlTmFtZSB9KTtcbiAgICB9XG5cbiAgICBzdG9wKHBhY2thZ2VOYW1lKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnBvc3RDYWxsKFwicGFja2FnZV9zdG9wXCIsIHsgbmFtZTogcGFja2FnZU5hbWUgfSk7XG5cbiAgICB9XG5cbiAgICBkaXNhYmxlKHBhY2thZ2VOYW1lKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnBvc3RDYWxsKFwicGFja2FnZV9kaXNhYmxlXCIsIHsgbmFtZTogcGFja2FnZU5hbWUgfSk7XG5cbiAgICB9XG5cbiAgICBlbmFibGUocGFja2FnZU5hbWUpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucG9zdENhbGwoXCJwYWNrYWdlX2VuYWJsZVwiLCB7IG5hbWU6IHBhY2thZ2VOYW1lIH0pO1xuICAgIH1cbn1cblxuXG5leHBvcnQgY29uc3QgcGFja2FnZXMgPSBuZXcgUGFja2FnZXNTZXJ2aWNlKCk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zb3VyY2VzL3NlcnZpY2VzL3BhY2thZ2VzLmpzIiwiaW1wb3J0IHsgSmV0VmlldyB9IGZyb20gXCJ3ZWJpeC1qZXRcIjtcbmltcG9ydCB7IGhlYWx0aCB9IGZyb20gXCIuLi8uLi9zZXJ2aWNlcy9oZWFsdGhcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRGlza1NwYWNlVmlldyBleHRlbmRzIEpldFZpZXcge1xuICAgIGNvbmZpZygpIHtcbiAgICAgICAgY29uc3QgZGlza1NwYWNlID0ge1xuICAgICAgICAgICAgaWQ6IFwiZGlza1NwYWNlXCIsXG4gICAgICAgICAgICByZXNwb25zaXZlOiB0cnVlLFxuICAgICAgICAgICAgdmlldzogXCJsaXN0XCIsXG4gICAgICAgICAgICB0eXBlOiB7XG4gICAgICAgICAgICAgICAgaGVpZ2h0OiA2MCxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB0ZW1wbGF0ZTogYFxuICAgICAgICAgICAgPHA+PGZvbnQgc2l6ZT1cIjNcIj48Yj4ja2V5IzogPC9iPjwvZm9udD4gPGZvbnQgc2l6ZT1cIjNcIj4jdmFsdWUjPC9mb250PjwvcD5cbiAgICAgICAgICAgIGBcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICB0eXBlOiBcInNwYWNlXCIsXG4gICAgICAgICAgICByb3dzOiBbe1xuICAgICAgICAgICAgICAgIHRlbXBsYXRlOiBcIjxkaXYgc3R5bGU9J3dpZHRoOmF1dG87dGV4dC1hbGlnbjpjZW50ZXInPjxoMz5EaXNrIFNwYWNlPGgzLz48L2Rpdj5cIixcbiAgICAgICAgICAgICAgICBoZWlnaHQ6IDUwXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIGRpc2tTcGFjZVxuICAgICAgICAgICAgXVxuICAgICAgICB9XG4gICAgfVxuXG5cbiAgICBpbml0KCkge1xuICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XG5cbiAgICAgICAgdGhpcy5kaXNrSW5mbyA9IHRoaXMuJCQoXCJkaXNrU3BhY2VcIik7XG5cbiAgICAgICAgaGVhbHRoLmdldERpc2tTcGFjZSgpLnRoZW4oZGF0YSA9PiB7XG4gICAgICAgICAgICBkYXRhID0gZGF0YS5qc29uKCk7XG5cbiAgICAgICAgICAgIHNlbGYuZGlza0luZm8uYWRkKHtcbiAgICAgICAgICAgICAgICBrZXk6IFwiVXNlZFwiLFxuICAgICAgICAgICAgICAgIHZhbHVlOiBkYXRhLnVzZWQgKyBcIiBHQlwiXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHNlbGYuZGlza0luZm8uYWRkKHtcbiAgICAgICAgICAgICAgICBrZXk6IFwiRnJlZVwiLFxuICAgICAgICAgICAgICAgIHZhbHVlOiBkYXRhLmZyZWUgKyBcIiBHQlwiXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHNlbGYuZGlza0luZm8uYWRkKHtcbiAgICAgICAgICAgICAgICBrZXk6IFwiVG90YWxcIixcbiAgICAgICAgICAgICAgICB2YWx1ZTogZGF0YS50b3RhbCArIFwiIEdCXCJcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgc2VsZi5kaXNrSW5mby5hZGQoe1xuICAgICAgICAgICAgICAgIGtleTogXCJQZXJjZW50XCIsXG4gICAgICAgICAgICAgICAgdmFsdWU6IGRhdGEucGVyY2VudCArIFwiICVcIlxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH1cblxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc291cmNlcy92aWV3cy9kYXNoL2Rpc2tTcGFjZS5qcyIsImltcG9ydCB7IEpldFZpZXcgfSBmcm9tIFwid2ViaXgtamV0XCI7XG5pbXBvcnQgeyBoZWFsdGggfSBmcm9tIFwiLi4vLi4vc2VydmljZXMvaGVhbHRoXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIGhlYWx0aEluZm9WaWV3IGV4dGVuZHMgSmV0VmlldyB7XG4gICAgY29uZmlnKCkge1xuICAgICAgICBjb25zdCBoZWFsdGhJbmZvID0ge1xuICAgICAgICAgICAgaWQ6IFwiaGVhbHRoSW5mb1wiLFxuICAgICAgICAgICAgcmVzcG9uc2l2ZTogdHJ1ZSxcbiAgICAgICAgICAgIHZpZXc6IFwibGlzdFwiLFxuICAgICAgICAgICAgcmVzcG9uc2l2ZTogdHJ1ZSxcbiAgICAgICAgICAgIHR5cGU6IHtcbiAgICAgICAgICAgICAgICBoZWlnaHQ6IDYwLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHRlbXBsYXRlOiBgXG4gICAgICAgICAgICA8cD48Zm9udCBzaXplPVwiM1wiPjxiPiNrZXkjOiA8L2I+PC9mb250PiAjdmFsdWUjPC9wPlxuICAgICAgICAgICAgYFxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHR5cGU6IFwic3BhY2VcIixcbiAgICAgICAgICAgIHJvd3M6IFt7XG4gICAgICAgICAgICAgICAgdGVtcGxhdGU6IFwiPGRpdiBzdHlsZT0nd2lkdGg6YXV0bzt0ZXh0LWFsaWduOmNlbnRlcic+PGgzPkhlYWx0aCBDaGVja3M8aDMvPjwvZGl2PlwiLFxuICAgICAgICAgICAgICAgIGhlaWdodDogNTBcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgaGVhbHRoSW5mb11cbiAgICAgICAgfVxuICAgIH1cbiAgICBpbml0KHZpZXcpIHtcbiAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xuXG4gICAgICAgIHRoaXMuaGVhbHRoSW5mbyA9IHRoaXMuJCQoXCJoZWFsdGhJbmZvXCIpO1xuXG4gICAgICAgIGhlYWx0aC5nZXRIZWFsdGgoKS50aGVuKGRhdGEgPT4ge1xuICAgICAgICAgICAgZGF0YSA9IGRhdGEuanNvbigpO1xuXG4gICAgICAgICAgICBpZiAoZGF0YS5iY2RiID09PSBcIk9LXCIpIHtcbiAgICAgICAgICAgICAgICBzZWxmLmhlYWx0aEluZm8uYWRkKHtcbiAgICAgICAgICAgICAgICAgICAga2V5OiBcIkJDREIgU3RhdHVzXCIsXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlOiBgPHNwYW4gY2xhc3M9J3dlYml4X2ljb24gd3hpLWNoZWNrYm94LW1hcmtlZCcgc3R5bGU9XCJjb2xvcjpncmVlblwiPk9LPC9zcGFuPmBcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGRhdGEuYmNkYiA9PT0gXCJFcnJvclwiKSB7XG4gICAgICAgICAgICAgICAgc2VsZi5oZWFsdGhJbmZvLmFkZCh7XG4gICAgICAgICAgICAgICAgICAgIGtleTogXCJCQ0RCXCIsXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlOiBgPHNwYW4gY2xhc3M9J3dlYml4X2ljb24gd3hpLWNsb3NlLWNpcmNsZScgc3R5bGU9XCJjb2xvcjpyZWRcIj5FcnJvcjwvc3Bhbj5gXG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChkYXRhLndpa2lzID09PSBcIk9LXCIpIHtcbiAgICAgICAgICAgICAgICBzZWxmLmhlYWx0aEluZm8uYWRkKHtcbiAgICAgICAgICAgICAgICAgICAga2V5OiBcIldpa2lzXCIsXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlOiBgPHNwYW4gY2xhc3M9J3dlYml4X2ljb24gd3hpLWNoZWNrYm94LW1hcmtlZCcgc3R5bGU9XCJjb2xvcjpncmVlblwiPk9LPC9zcGFuPmBcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGRhdGEud2lraXMgPT09IFwiRXJyb3JcIikge1xuICAgICAgICAgICAgICAgIHNlbGYuaGVhbHRoSW5mby5hZGQoe1xuICAgICAgICAgICAgICAgICAgICBrZXk6IFwiV2lraXNcIixcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU6IGA8c3BhbiBjbGFzcz0nd2ViaXhfaWNvbiB3eGktY2xvc2UtY2lyY2xlJyBzdHlsZT1cImNvbG9yOnJlZFwiPkVycm9yPC9zcGFuPmBcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGRhdGEuY29kZXNlcnZlciA9PT0gXCJPS1wiKSB7XG4gICAgICAgICAgICAgICAgc2VsZi5oZWFsdGhJbmZvLmFkZCh7XG4gICAgICAgICAgICAgICAgICAgIGtleTogXCJDb2Rlc2VydmVyXCIsXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlOiBgPHNwYW4gY2xhc3M9J3dlYml4X2ljb24gd3hpLWNoZWNrYm94LW1hcmtlZCcgc3R5bGU9XCJjb2xvcjpncmVlblwiPk9LPC9zcGFuPmBcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGRhdGEuY29kZXNlcnZlciA9PT0gXCJFcnJvclwiKSB7XG4gICAgICAgICAgICAgICAgc2VsZi5oZWFsdGhJbmZvLmFkZCh7XG4gICAgICAgICAgICAgICAgICAgIGtleTogXCJDb2Rlc2VydmVyXCIsXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlOiBgPHNwYW4gY2xhc3M9J3dlYml4X2ljb24gd3hpLWNsb3NlLWNpcmNsZScgc3R5bGU9XCJjb2xvcjpyZWRcIj5FcnJvcjwvc3Bhbj5gXG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChkYXRhLmp1cHl0ZXIgPT09IFwiT0tcIikge1xuICAgICAgICAgICAgICAgIHNlbGYuaGVhbHRoSW5mby5hZGQoe1xuICAgICAgICAgICAgICAgICAgICBrZXk6IFwiSnVweXRlclwiLFxuICAgICAgICAgICAgICAgICAgICB2YWx1ZTogYDxzcGFuIGNsYXNzPSd3ZWJpeF9pY29uIHd4aS1jaGVja2JveC1tYXJrZWQnIHN0eWxlPVwiY29sb3I6Z3JlZW5cIj5PSzwvc3Bhbj5gXG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChkYXRhLmp1cHl0ZXIgPT09IFwiRXJyb3JcIikge1xuICAgICAgICAgICAgICAgIHNlbGYuaGVhbHRoSW5mby5hZGQoe1xuICAgICAgICAgICAgICAgICAgICBrZXk6IFwiSnVweXRlclwiLFxuICAgICAgICAgICAgICAgICAgICB2YWx1ZTogYDxzcGFuIGNsYXNzPSd3ZWJpeF9pY29uIHd4aS1jbG9zZS1jaXJjbGUnIHN0eWxlPVwiY29sb3I6cmVkXCI+RXJyb3I8L3NwYW4+YFxuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgfVxuXG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zb3VyY2VzL3ZpZXdzL2Rhc2gvaGVhbHRoLmpzIiwiaW1wb3J0IHsgSmV0VmlldyB9IGZyb20gXCJ3ZWJpeC1qZXRcIjtcbmltcG9ydCB7IGhlYWx0aCB9IGZyb20gXCIuLi8uLi9zZXJ2aWNlcy9oZWFsdGhcIjtcbmltcG9ydCB7IGlkZW50aXR5IH0gZnJvbSBcIi4uLy4uL3NlcnZpY2VzL2lkZW50aXR5XCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEpTWEluZm9WaWV3IGV4dGVuZHMgSmV0VmlldyB7XG4gICAgY29uZmlnKCkge1xuICAgICAgICBjb25zdCBpbmZvID0ge1xuICAgICAgICAgICAgaWQ6IFwianN4SW5mb1wiLFxuICAgICAgICAgICAgcmVzcG9uc2l2ZTogdHJ1ZSxcbiAgICAgICAgICAgIHZpZXc6IFwibGlzdFwiLFxuICAgICAgICAgICAgcmVzcG9uc2l2ZTogdHJ1ZSxcbiAgICAgICAgICAgIHR5cGU6IHtcbiAgICAgICAgICAgICAgICBoZWlnaHQ6ICdhdXRvJyxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB0ZW1wbGF0ZTogYFxuICAgICAgICAgICAgICAgIDxwPjxmb250IHNpemU9XCIzXCI+PGI+I2tleSM6IDwvYj48L2ZvbnQ+IDxmb250IHNpemU9XCIzXCI+I3ZhbHVlIzwvZm9udD48L3A+XG4gICAgICAgICAgICBgXG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgYm90SW5mbyA9IHtcbiAgICAgICAgICAgIGlkOiBcImJvdEluZm9cIixcbiAgICAgICAgICAgIHJlc3BvbnNpdmU6IHRydWUsXG4gICAgICAgICAgICB2aWV3OiBcImxpc3RcIixcbiAgICAgICAgICAgIHJlc3BvbnNpdmU6IHRydWUsXG4gICAgICAgICAgICBoZWlnaHQ6IDEwMCxcbiAgICAgICAgICAgIHR5cGU6IHtcbiAgICAgICAgICAgICAgICBoZWlnaHQ6IDUwLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHRlbXBsYXRlOiBgXG4gICAgICAgICAgICAgICAgPHA+PGZvbnQgc2l6ZT1cIjNcIj48Yj4ja2V5IzogPC9iPjwvZm9udD4gPGZvbnQgc2l6ZT1cIjNcIj4jdmFsdWUjPC9mb250PjwvcD5cbiAgICAgICAgICAgIGBcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICB0eXBlOiBcInNwYWNlXCIsXG4gICAgICAgICAgICByb3dzOiBbe1xuICAgICAgICAgICAgICAgIHRlbXBsYXRlOiBcIjxkaXYgc3R5bGU9J3dpZHRoOmF1dG87dGV4dC1hbGlnbjpjZW50ZXInPjxoMz5KU1ggSW5mbzxoMy8+PC9kaXY+XCIsXG4gICAgICAgICAgICAgICAgaGVpZ2h0OiA1MFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBib3RJbmZvLFxuICAgICAgICAgICAgICAgIGluZm9cbiAgICAgICAgICAgIF1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIGluaXQoKSB7XG4gICAgICAgIGNvbnN0IHNlbGYgPSB0aGlzO1xuXG4gICAgICAgIHRoaXMuaW5mbyA9IHRoaXMuJCQoXCJqc3hJbmZvXCIpO1xuICAgICAgICB0aGlzLmJvdGluZm8gPSB0aGlzLiQkKFwiYm90SW5mb1wiKTtcbiAgICAgICAgaGVhbHRoLmdldElkZW50aXR5KCkudGhlbihkYXRhID0+IHtcbiAgICAgICAgICAgIHNlbGYuYm90aW5mby5hZGQoe1xuICAgICAgICAgICAgICAgIGtleTogXCIzYm90IG5hbWVcIixcbiAgICAgICAgICAgICAgICB2YWx1ZTogZGF0YS50ZXh0KClcbiAgICAgICAgICAgIH0pXG4gICAgICAgIH0pXG4gICAgICAgIGlkZW50aXR5LmdldF9pZGVudGl0eSgpLnRoZW4oZGF0YSA9PiB7XG4gICAgICAgICAgICBzZWxmLmJvdGluZm8uYWRkKHtcbiAgICAgICAgICAgICAgICBrZXk6IFwiM2JvdCBpZFwiLFxuICAgICAgICAgICAgICAgIHZhbHVlOiBkYXRhLmpzb24oKS50aWRcbiAgICAgICAgICAgIH0pXG4gICAgICAgIH0pXG5cbiAgICAgICAgaGVhbHRoLmdldE5ldHdvcmtJbmZvKCkudGhlbihkYXRhID0+IHtcbiAgICAgICAgICAgIGRhdGEgPSBkYXRhLmpzb24oKTtcbiAgICAgICAgICAgIGZvciAodmFyIGkgaW4gZGF0YSkge1xuICAgICAgICAgICAgICAgIHZhciBpcCA9IGRhdGFbaV0uaXA7XG4gICAgICAgICAgICAgICAgdmFyIGlwNiA9IGRhdGFbaV0uaXA2Lmxlbmd0aCA/IGRhdGFbaV0uaXA2IDogXCJOb3Qgc2V0XCI7XG5cbiAgICAgICAgICAgICAgICBzZWxmLmluZm8uYWRkKHtcbiAgICAgICAgICAgICAgICAgICAga2V5OiBkYXRhW2ldLm5hbWUsXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlOiBgPGJyPjxiPklQOiA8L2I+JHtpcH08YnI+PGI+SVB2NjogPC9iPiR7aXA2fWBcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICBoZWFsdGguZ2V0SnN4VmVyc2lvbigpLnRoZW4oZGF0YSA9PiB7XG4gICAgICAgICAgICBzZWxmLmluZm8uYWRkKHtcbiAgICAgICAgICAgICAgICBrZXk6IFwiSlNYIFZlcnNpb25cIixcbiAgICAgICAgICAgICAgICB2YWx1ZTogZGF0YS50ZXh0KClcbiAgICAgICAgICAgIH0pXG4gICAgICAgIH0pXG5cbiAgICB9XG5cbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NvdXJjZXMvdmlld3MvZGFzaC9qc3hJbmZvLmpzIiwiaW1wb3J0IHtcbiAgICBKZXRWaWV3XG59IGZyb20gXCJ3ZWJpeC1qZXRcIjtcblxuaW1wb3J0IHtcbiAgICBoZWFsdGhcbn0gZnJvbSBcIi4uLy4uL3NlcnZpY2VzL2hlYWx0aFwiO1xuXG5jb25zdCBjb2xvcnNEYXRhc2V0ID0gW3tcbiAgICAgICAgY29sb3I6IFwiI2VlMzYzOVwiXG4gICAgfSxcbiAgICB7XG4gICAgICAgIGNvbG9yOiBcIiNlZTllMzZcIlxuICAgIH0sXG4gICAge1xuICAgICAgICBjb2xvcjogXCIjZWVlYTM2XCJcbiAgICB9LFxuICAgIHtcbiAgICAgICAgY29sb3I6IFwiI2E5ZWUzNlwiXG4gICAgfSxcbiAgICB7XG4gICAgICAgIGNvbG9yOiBcIiMzNmQzZWVcIlxuICAgIH0sXG4gICAge1xuICAgICAgICBjb2xvcjogXCIjMzY3ZmVlXCJcbiAgICB9LFxuICAgIHtcbiAgICAgICAgY29sb3I6IFwiIzliMzZlZVwiXG4gICAgfVxuXTtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUHJvY2Vzc2VzVmlldyBleHRlbmRzIEpldFZpZXcge1xuXG4gICAgY29uZmlnKCkge1xuICAgICAgICBjb25zdCBwcm9jZXNzZXNJbmZvID0ge1xuICAgICAgICAgICAgaWQ6IFwicHJvY2Vzc1wiLFxuICAgICAgICAgICAgdmlldzogXCJjaGFydFwiLFxuICAgICAgICAgICAgcmVzcG9uc2l2ZTogdHJ1ZSxcbiAgICAgICAgICAgIHR5cGU6IFwicGllXCIsXG4gICAgICAgICAgICBoZWlnaHQ6IDQwMCxcbiAgICAgICAgICAgIGNvbG9yOiBcIiNjb2xvciNcIixcbiAgICAgICAgICAgIHZhbHVlOiBcIiNyc3MjXCIsXG4gICAgICAgICAgICBsYWJlbDogXCI8aDQ+I25hbWUjPC9oND5cIixcbiAgICAgICAgICAgIHBpZUlubmVyVGV4dDogXCI8aDQ+I3JzcyM8L2g0PlwiLFxuICAgICAgICAgICAgZGF0YTogXCIjY2hhcnRzRGF0YSNcIixcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICB0eXBlOiBcInNwYWNlXCIsXG4gICAgICAgICAgICByb3dzOiBbe1xuICAgICAgICAgICAgICAgICAgICB0ZW1wbGF0ZTogXCI8ZGl2IHN0eWxlPSd3aWR0aDphdXRvO3RleHQtYWxpZ246Y2VudGVyJz48aDM+UnVubmluZyBwcm9jZXNzZXMgbWVtb3J5IHVzYWdlIChSU1MpIChNQik8aDMvPjwvZGl2PlwiLFxuICAgICAgICAgICAgICAgICAgICBoZWlnaHQ6IDUwXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBwcm9jZXNzZXNJbmZvXG5cbiAgICAgICAgICAgIF1cbiAgICAgICAgfVxuICAgIH1cblxuXG4gICAgaW5pdCh2aWV3KSB7XG4gICAgICAgIGNvbnN0IHNlbGYgPSB0aGlzO1xuXG4gICAgICAgIHRoaXMucHJvY2Vzc2VzTGlzdCA9IFtdXG5cbiAgICAgICAgdGhpcy5ydW5Qcm9jZXNzSW5mbyA9IHRoaXMuJCQoXCJwcm9jZXNzXCIpO1xuXG4gICAgICAgIGhlYWx0aC5nZXRSdW5uaW5nUHJvY2Vzc2VzKCkudGhlbihkYXRhID0+IHtcbiAgICAgICAgICAgIHZhciBjaGFydHNEYXRhID0gW11cblxuICAgICAgICAgICAgZGF0YSA9IGRhdGEuanNvbigpO1xuICAgICAgICAgICAgc2VsZi5wcm9jZXNzZXNMaXN0ID0gZGF0YS5wcm9jZXNzZXNfbGlzdFxuXG4gICAgICAgICAgICAvLyBtZW1vcnkgdXNhZ2VcbiAgICAgICAgICAgIHNlbGYubWVtb3J5VXNhZ2UgPSBkYXRhLm1lbW9yeV91c2FnZVxuICAgICAgICAgICAgc2VsZi50b3RhbE1lbW9yeSA9IHNlbGYubWVtb3J5VXNhZ2UudG90YWxfbWVtXG4gICAgICAgICAgICBzZWxmLnBlcmNlbnQgPSBzZWxmLm1lbW9yeVVzYWdlLnVzYWdlX3BlcmNlbnRcblxuXG4gICAgICAgICAgICBzZWxmLnJ1blByb2Nlc3NJbmZvLmRlZmluZShcImxlZ2VuZFwiLCB7XG4gICAgICAgICAgICAgICAgbGF5b3V0OiBcInhcIixcbiAgICAgICAgICAgICAgICB3aWR0aDogMTEwLFxuICAgICAgICAgICAgICAgIHZhbHVlczogW3tcbiAgICAgICAgICAgICAgICAgICAgICAgIHRleHQ6IGA8Yj5Ub3RhbCBtZW1vcnk6IDwvYj4ke3NlbGYudG90YWxNZW1vcnl9R0JgXG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRleHQ6IGA8Yj5Vc2FnZTogPC9iPiR7c2VsZi5wZXJjZW50fSVgXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgc2VsZi5ydW5Qcm9jZXNzSW5mby5yZWZyZXNoKClcblxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzZWxmLnByb2Nlc3Nlc0xpc3QubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICAvL0JyZWFrIHdoZW4gdGhlcmUgaXMgbm8gbW9yZSBjb2xvcnNcbiAgICAgICAgICAgICAgICBpZiAoaSA9PSBjb2xvcnNEYXRhc2V0Lmxlbmd0aClcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgICAgICB2YXIgdGVtcCA9IHtcbiAgICAgICAgICAgICAgICAgICAgXCJjb2xvclwiOiBjb2xvcnNEYXRhc2V0W2ldLmNvbG9yLFxuICAgICAgICAgICAgICAgICAgICBcIm5hbWVcIjogc2VsZi5wcm9jZXNzZXNMaXN0W2ldLm5hbWUsXG4gICAgICAgICAgICAgICAgICAgIFwicnNzXCI6IE1hdGguY2VpbChzZWxmLnByb2Nlc3Nlc0xpc3RbaV0ucnNzKSxcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgY2hhcnRzRGF0YS5wdXNoKHRlbXApXG4gICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2cobXlBcnJheVtpXSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHNlbGYucnVuUHJvY2Vzc0luZm8ucGFyc2Uoe1xuICAgICAgICAgICAgICAgIGRhdGE6IGNoYXJ0c0RhdGEsXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG59XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc291cmNlcy92aWV3cy9kYXNoL3Byb2Nlc3Nlcy5qcyIsImltcG9ydCB7IEpldFZpZXcgfSBmcm9tIFwid2ViaXgtamV0XCI7XG5cbmltcG9ydCB7IGhlYWx0aCB9IGZyb20gXCIuLi8uLi9zZXJ2aWNlcy9oZWFsdGhcIjtcbmltcG9ydCBQcm9jZXNzRGV0YWlsc1ZpZXcgZnJvbSBcIi4vcHJvY2Vzc0RldGFpbHNcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgcHJvY2Vzc2VzTGlzdFZpZXcgZXh0ZW5kcyBKZXRWaWV3IHtcbiAgICBjb25maWcoKSB7XG4gICAgICAgIGNvbnN0IHZpZXcgPSB7XG4gICAgICAgICAgICB2aWV3OiBcImRhdGF0YWJsZVwiLFxuICAgICAgICAgICAgaWQ6IFwicHJvY2Vzc190YWJsZVwiLFxuICAgICAgICAgICAgcmVzaXplQ29sdW1uOiB0cnVlLFxuICAgICAgICAgICAgc2VsZWN0OiB0cnVlLFxuICAgICAgICAgICAgbXVsdGlzZWxlY3Q6IHRydWUsXG4gICAgICAgICAgICBjc3M6IFwid2ViaXhfaGVhZGVyX2JvcmRlciB3ZWJpeF9kYXRhX2JvcmRlclwiLFxuICAgICAgICAgICAgc2Nyb2xsOiB0cnVlLFxuICAgICAgICAgICAgYXV0b0NvbmZpZzogdHJ1ZSxcbiAgICAgICAgICAgIGNvbHVtbnM6IFt7XG4gICAgICAgICAgICAgICAgICAgIGlkOiBcImluZGV4XCIsXG4gICAgICAgICAgICAgICAgICAgIGhlYWRlcjogXCIjXCIsXG4gICAgICAgICAgICAgICAgICAgIHNvcnQ6IFwiaW50XCIsXG4gICAgICAgICAgICAgICAgICAgIGF1dG93aWR0aDogdHJ1ZSxcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgaWQ6IFwibmFtZVwiLFxuICAgICAgICAgICAgICAgICAgICBoZWFkZXI6IFtcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiUHJvY2Vzc1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRlbnQ6IFwidGV4dEZpbHRlclwiXG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgICAgICBzb3J0OiBcInN0cmluZ1wiLFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBpZDogXCJwaWRcIixcbiAgICAgICAgICAgICAgICAgICAgaGVhZGVyOiBcIlBJRFwiLFxuICAgICAgICAgICAgICAgICAgICBzb3J0OiBcImludFwiXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIGlkOiBcInVzZXJuYW1lXCIsXG4gICAgICAgICAgICAgICAgICAgIGhlYWRlcjogXCJVc2VybmFtZVwiLFxuICAgICAgICAgICAgICAgICAgICBzb3J0OiBcInN0cmluZ1wiXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIGlkOiBcInJzc1wiLFxuICAgICAgICAgICAgICAgICAgICBoZWFkZXI6IFwiTWVtb3J5IFVzYWdlXCIsXG4gICAgICAgICAgICAgICAgICAgIHNvcnQ6IFwiaW50XCIsXG4gICAgICAgICAgICAgICAgICAgIGZvcm1hdDogZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gTWF0aC5jZWlsKHZhbHVlKVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIF0sXG4gICAgICAgICAgICBzY2hlbWU6IHtcbiAgICAgICAgICAgICAgICAkaW5pdDogZnVuY3Rpb24gKG9iaikge1xuICAgICAgICAgICAgICAgICAgICBvYmouaW5kZXggPSB0aGlzLmNvdW50KCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICB0eXBlOiBcInNwYWNlXCIsXG4gICAgICAgICAgICByb3dzOiBbXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICB0ZW1wbGF0ZTogXCI8ZGl2IHN0eWxlPSd3aWR0aDphdXRvO3RleHQtYWxpZ246Y2VudGVyJz48aDM+UHJvY2Vzc2VzPGgzLz48L2Rpdj5cIixcbiAgICAgICAgICAgICAgICAgICAgaGVpZ2h0OiA1MFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgdmlld1xuICAgICAgICAgICAgXVxuICAgICAgICB9XG4gICAgfVxuXG4gICAga2lsbFByb2Nlc3Mob2JqZWN0cykge1xuICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XG5cbiAgICAgICAgbGV0IGl0ZW1zID0gW10sXG4gICAgICAgICAgICBpZHMgPSBbXSxcbiAgICAgICAgICAgIGluZGV4ZXMgPSBbXTtcblxuICAgICAgICBmb3IgKGxldCBvYmogb2Ygb2JqZWN0cykge1xuICAgICAgICAgICAgaWRzLnB1c2gob2JqLmlkKTtcbiAgICAgICAgICAgIGxldCBpdGVtID0gc2VsZi5wcm9jZXNzVGFibGUuZ2V0SXRlbShvYmouaWQpO1xuICAgICAgICAgICAgaXRlbXMucHVzaChpdGVtKVxuICAgICAgICAgICAgaW5kZXhlcy5wdXNoKGl0ZW0uaW5kZXgpO1xuICAgICAgICB9XG5cbiAgICAgICAgd2ViaXguY29uZmlybSh7XG4gICAgICAgICAgICB0aXRsZTogXCJLaWxsIHByb2Nlc3Nlc1wiLFxuICAgICAgICAgICAgb2s6IFwiWWVzXCIsXG4gICAgICAgICAgICBjYW5jZWw6IFwiTm9cIixcbiAgICAgICAgICAgIHRleHQ6IGBLaWxsIHByb2Nlc3NlcyB3aXRoIHJvdyBpZHMgJHtpbmRleGVzLmpvaW4oXCIsIFwiKX1gXG4gICAgICAgIH0pLnRoZW4oKCkgPT4ge1xuXG4gICAgICAgICAgICBjb25zdCBwaWRzID0gaXRlbXMubWFwKChpdGVtKSA9PiBpdGVtLnBpZCk7XG5cbiAgICAgICAgICAgIGhlYWx0aC5raWxsUHJvY2Vzc2VzQnlQaWQocGlkcykudGhlbigoKSA9PiB7XG4gICAgICAgICAgICAgICAgc2VsZi5wcm9jZXNzVGFibGUucmVtb3ZlKGlkcylcbiAgICAgICAgICAgICAgICB3ZWJpeC5tZXNzYWdlKHsgdHlwZTogXCJzdWNjZXNzXCIsIHRleHQ6IFwiUHJvY2Vzc2VzIGtpbGxlZCBzdWNjZXNzZnVsbHlcIiB9KTtcbiAgICAgICAgICAgIH0pLmNhdGNoKGVycm9yID0+IHtcbiAgICAgICAgICAgICAgICB3ZWJpeC5tZXNzYWdlKHsgdHlwZTogXCJlcnJvclwiLCB0ZXh0OiBcIkNvdWxkIG5vdCBraWxsIHByb2Nlc3NcIiB9KTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGluaXQoKSB7XG4gICAgICAgIGNvbnN0IHNlbGYgPSB0aGlzO1xuICAgICAgICBzZWxmLnByb2Nlc3NEZXRhaWxzVmlldyA9IHNlbGYudWkoUHJvY2Vzc0RldGFpbHNWaWV3KTtcblxuICAgICAgICBzZWxmLnByb2Nlc3NUYWJsZSA9IHRoaXMuJCQoXCJwcm9jZXNzX3RhYmxlXCIpO1xuICAgICAgICBoZWFsdGguZ2V0UnVubmluZ1Byb2Nlc3NlcygpLnRoZW4oZGF0YSA9PiB7XG4gICAgICAgICAgICBzZWxmLnByb2Nlc3NUYWJsZS5wYXJzZShkYXRhLmpzb24oKS5wcm9jZXNzZXNfbGlzdCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHdlYml4LnVpKHtcbiAgICAgICAgICAgIHZpZXc6IFwiY29udGV4dG1lbnVcIixcbiAgICAgICAgICAgIGlkOiBcInByb2Nlc3NfY21cIixcbiAgICAgICAgICAgIGRhdGE6IFtcIktpbGxcIl1cbiAgICAgICAgfSkuYXR0YWNoVG8oc2VsZi5wcm9jZXNzVGFibGUpO1xuXG4gICAgICAgIHNlbGYucHJvY2Vzc1RhYmxlLmF0dGFjaEV2ZW50KFwib25JdGVtRGJsQ2xpY2tcIiwgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgbGV0IHBpZCA9IHNlbGYucHJvY2Vzc1RhYmxlLmdldFNlbGVjdGVkSXRlbSgpW1wicGlkXCJdXG4gICAgICAgICAgICBoZWFsdGguZ2V0UHJvY2Vzc0RldGFpbHMocGlkKS50aGVuKChkYXRhKSA9PntcbiAgICAgICAgICAgICAgICBzZWxmLnByb2Nlc3NEZXRhaWxzVmlldy5zaG93UHJvY2Vzc0RldGFpbHMoZGF0YS5qc29uKCkpXG4gICAgICAgICAgICB9KS5jYXRjaChlcnIgPT4ge1xuICAgICAgICAgICAgICAgIHdlYml4Lm1lc3NhZ2UoeyB0eXBlOiBcImVycm9yXCIsIHRleHQ6IFwiQ291bGQgbm90IGdldCBwcm9jZXNzIGRldGFpbHNcIiB9KTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgIH0pO1xuXG4gICAgICAgICQkKFwicHJvY2Vzc19jbVwiKS5hdHRhY2hFdmVudChcIm9uTWVudUl0ZW1DbGlja1wiLCBmdW5jdGlvbiAoaWQpIHtcbiAgICAgICAgICAgIGlmIChpZCA9PSBcIktpbGxcIikge1xuICAgICAgICAgICAgICAgIHNlbGYua2lsbFByb2Nlc3Moc2VsZi5wcm9jZXNzVGFibGUuZ2V0U2VsZWN0ZWRJZCh0cnVlKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cblxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc291cmNlcy92aWV3cy9kYXNoL3Byb2Nlc3Nlc0xpc3QuanMiLCJpbXBvcnQgeyBKZXRWaWV3IH0gZnJvbSBcIndlYml4LWpldFwiO1xuXG5pbXBvcnQgeyBoZWFsdGggfSBmcm9tIFwiLi4vLi4vc2VydmljZXMvaGVhbHRoXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIHJ1bm5pbmdQb3J0c1ZpZXcgZXh0ZW5kcyBKZXRWaWV3IHtcbiAgICBjb25maWcoKSB7XG4gICAgICAgIGNvbnN0IHBvcnRzID0ge1xuICAgICAgICAgICAgaWQ6IFwicnVubmluZ1BvcnRzXCIsXG4gICAgICAgICAgICB2aWV3OiBcImRhdGF0YWJsZVwiLFxuICAgICAgICAgICAgcmVzcG9uc2l2ZTogdHJ1ZSxcbiAgICAgICAgICAgIGF1dG9Db25maWc6IHRydWUsXG4gICAgICAgICAgICB0eXBlOiB7XG4gICAgICAgICAgICAgICAgaGVpZ2h0OiAyMDAsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgdGVtcGxhdGU6IFwiUnVubmluZyBQb3J0c1wiLFxuICAgICAgICAgICAgcmVzaXplQ29sdW1uOiB0cnVlLFxuICAgICAgICAgICAgc2VsZWN0OiB0cnVlLFxuICAgICAgICAgICAgbXVsdGlzZWxlY3Q6IHRydWUsXG4gICAgICAgICAgICBjc3M6IFwid2ViaXhfaGVhZGVyX2JvcmRlciB3ZWJpeF9kYXRhX2JvcmRlclwiLFxuICAgICAgICAgICAgY29sdW1uczogW3tcbiAgICAgICAgICAgICAgICBpZDogXCJpbmRleFwiLFxuICAgICAgICAgICAgICAgIGhlYWRlcjogXCIjXCIsXG4gICAgICAgICAgICAgICAgc29ydDogXCJpbnRcIixcbiAgICAgICAgICAgICAgICBhdXRvd2lkdGg6IHRydWUsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGlkOiBcInBvcnRfbnVtYmVyXCIsXG4gICAgICAgICAgICAgICAgaGVhZGVyOiBbXCJQb3J0IE51bWJlclwiLCB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnRlbnQ6IFwidGV4dEZpbHRlclwiXG4gICAgICAgICAgICAgICAgfSxdLFxuICAgICAgICAgICAgICAgIHNvcnQ6IFwic3RyaW5nXCJcbiAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICBpZDogXCJwcm9jZXNzXCIsXG4gICAgICAgICAgICAgICAgaGVhZGVyOiBbXCJQcm9jZXNzXCIsIHtcbiAgICAgICAgICAgICAgICAgICAgY29udGVudDogXCJ0ZXh0RmlsdGVyXCJcbiAgICAgICAgICAgICAgICB9XSxcbiAgICAgICAgICAgICAgICBzb3J0OiBcInN0cmluZ1wiXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBdLFxuICAgICAgICAgICAgc2NoZW1lOiB7XG4gICAgICAgICAgICAgICAgJGluaXQ6IGZ1bmN0aW9uIChvYmopIHtcbiAgICAgICAgICAgICAgICAgICAgb2JqLmluZGV4ID0gdGhpcy5jb3VudCgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgdHlwZTogXCJzcGFjZVwiLFxuICAgICAgICAgICAgcm93czogW1xuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgdGVtcGxhdGU6IFwiPGRpdiBzdHlsZT0nd2lkdGg6YXV0bzt0ZXh0LWFsaWduOmNlbnRlcic+PGgzPlBvcnRzPGgzLz48L2Rpdj5cIixcbiAgICAgICAgICAgICAgICAgICAgaGVpZ2h0OiA1MFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgcG9ydHNcbiAgICAgICAgICAgIF1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIGtpbGxQcm9jZXNzKG9iamVjdHMpIHtcbiAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xuXG4gICAgICAgIGxldCBpdGVtcyA9IFtdLFxuICAgICAgICAgICAgaWRzID0gW10sXG4gICAgICAgICAgICBpbmRleGVzID0gW107XG5cbiAgICAgICAgZm9yIChsZXQgb2JqIG9mIG9iamVjdHMpIHtcbiAgICAgICAgICAgIGlkcy5wdXNoKG9iai5pZCk7XG4gICAgICAgICAgICBsZXQgaXRlbSA9IHNlbGYucG9ydHNUYWJsZS5nZXRJdGVtKG9iai5pZCk7XG4gICAgICAgICAgICBpdGVtcy5wdXNoKGl0ZW0pXG4gICAgICAgICAgICBpbmRleGVzLnB1c2goaXRlbS5pbmRleCk7XG4gICAgICAgIH1cblxuICAgICAgICB3ZWJpeC5jb25maXJtKHtcbiAgICAgICAgICAgIHRpdGxlOiBcIktpbGwgcHJvY2Vzc2VzXCIsXG4gICAgICAgICAgICBvazogXCJZZXNcIixcbiAgICAgICAgICAgIGNhbmNlbDogXCJOb1wiLFxuICAgICAgICAgICAgdGV4dDogYEtpbGwgcHJvY2Vzc2VzIHdpdGggcm93IGlkcyAke2luZGV4ZXMuam9pbihcIiwgXCIpfWBcbiAgICAgICAgfSkudGhlbigoKSA9PiB7XG5cbiAgICAgICAgICAgIGNvbnN0IHBvcnRzID0gaXRlbXMubWFwKChpdGVtKSA9PiBpdGVtLnBvcnRfbnVtYmVyKTtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgaGVhbHRoLmtpbGxQcm9jZXNzZXNCeVBvcnQocG9ydHMpLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgICAgIHNlbGYucG9ydHNUYWJsZS5yZW1vdmUoaWRzKVxuICAgICAgICAgICAgICAgIHdlYml4Lm1lc3NhZ2UoeyB0eXBlOiBcInN1Y2Nlc3NcIiwgdGV4dDogXCJQcm9jZXNzZXMga2lsbGVkIHN1Y2Nlc3NmdWxseVwiIH0pO1xuICAgICAgICAgICAgfSkuY2F0Y2goZXJyb3IgPT4ge1xuICAgICAgICAgICAgICAgIHdlYml4Lm1lc3NhZ2UoeyB0eXBlOiBcImVycm9yXCIsIHRleHQ6IFwiQ291bGQgbm90IGtpbGwgcHJvY2Vzc1wiIH0pO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgaW5pdCgpIHtcbiAgICAgICAgY29uc3Qgc2VsZiA9IHRoaXM7XG5cbiAgICAgICAgc2VsZi5wb3J0c1RhYmxlID0gdGhpcy4kJChcInJ1bm5pbmdQb3J0c1wiKTtcbiAgICAgICAgaGVhbHRoLmdldFJ1bm5pbmdQb3J0cygpLnRoZW4oZGF0YSA9PiB7XG4gICAgICAgICAgICBzZWxmLnBvcnRzVGFibGUucGFyc2UoZGF0YS5qc29uKCkpO1xuICAgICAgICB9KTtcblxuICAgICAgICB3ZWJpeC51aSh7XG4gICAgICAgICAgICB2aWV3OiBcImNvbnRleHRtZW51XCIsXG4gICAgICAgICAgICBpZDogXCJwb3J0X2NtXCIsXG4gICAgICAgICAgICBkYXRhOiBbXCJLaWxsXCJdXG4gICAgICAgIH0pLmF0dGFjaFRvKHNlbGYucG9ydHNUYWJsZSk7XG5cbiAgICAgICAgJCQoXCJwb3J0X2NtXCIpLmF0dGFjaEV2ZW50KFwib25NZW51SXRlbUNsaWNrXCIsIGZ1bmN0aW9uIChpZCkge1xuICAgICAgICAgICAgaWYgKGlkID09IFwiS2lsbFwiKSB7XG4gICAgICAgICAgICAgICAgc2VsZi5raWxsUHJvY2VzcyhzZWxmLnBvcnRzVGFibGUuZ2V0U2VsZWN0ZWRJZCh0cnVlKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cblxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc291cmNlcy92aWV3cy9kYXNoL3J1bm5pbmdQb3J0cy5qcyIsImltcG9ydCB7IEpldFZpZXcsIHBsdWdpbnMgfSBmcm9tIFwid2ViaXgtamV0XCI7XG5pbXBvcnQgeyBhdXRoIH0gZnJvbSBcIi4uL3NlcnZpY2VzL2F1dGhcIjtcblxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBUb3BWaWV3IGV4dGVuZHMgSmV0VmlldyB7XG4gICAgY29uZmlnKCkge1xuICAgICAgICBjb25zdCBoZWFkZXIgPSB7XG4gICAgICAgICAgICBjb2xzOiBbXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBpZDogXCJidXR0b25faGlkZV9tZW51XCIsXG4gICAgICAgICAgICAgICAgICAgIHZpZXc6IFwiaWNvblwiLCBpY29uOiBcIm1kaSBtZGktbWVudVwiLFxuICAgICAgICAgICAgICAgICAgICBjc3M6IFwiY3VzdG9tX2RhcmtcIiwgaGVpZ2h0OiA1OCxcbiAgICAgICAgICAgICAgICAgICAgY2xpY2s6IHRoaXMuaGlkZU1lbnUsXG4gICAgICAgICAgICAgICAgICAgIHRvb2x0aXA6IFwiSGlkZSBtZW51XCIsXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIGlkOiBcImhlYWRlclwiLFxuICAgICAgICAgICAgICAgICAgICB0eXBlOiBcImhlYWRlclwiLFxuICAgICAgICAgICAgICAgICAgICBjc3M6IFwiY3VzdG9tX2RhcmtcIiwgaGVpZ2h0OiA1OCxcbiAgICAgICAgICAgICAgICAgICAgdGVtcGxhdGU6IFwiQURNSU5cIixcbiAgICAgICAgICAgICAgICAgICAgYm9yZGVybGVzczogdHJ1ZSxcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgXVxuICAgICAgICB9O1xuXG4gICAgICAgIGNvbnN0IHNpZGViYXJEYXRhID0gW3tcbiAgICAgICAgICAgIGlkOiBcImRhc2hcIixcbiAgICAgICAgICAgIHZhbHVlOiBcIkRhc2hib2FyZFwiLFxuICAgICAgICAgICAgaWNvbjogXCJtZGkgbWRpLXZpZXctZGFzaGJvYXJkXCJcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgICAgaWQ6IFwid2lraXNcIixcbiAgICAgICAgICAgIHZhbHVlOiBcIlBhY2thZ2VzIERvY3NcIixcbiAgICAgICAgICAgIGljb246IFwibWRpIG1kaS1uZXdzcGFwZXJcIlxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgICBpZDogXCJhbGVydHNcIixcbiAgICAgICAgICAgIHZhbHVlOiBcIkFsZXJ0c1wiLFxuICAgICAgICAgICAgaWNvbjogXCJtZGkgbWRpLWJlbGwtYWxlcnRcIlxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgICBpZDogXCJsb2dzXCIsXG4gICAgICAgICAgICB2YWx1ZTogXCJMb2dzXCIsXG4gICAgICAgICAgICBpY29uOiBcIm1kaSBtZGktaGlzdG9yeVwiXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICAgIGlkOiBcIm15am9ic19tYWluXCIsXG4gICAgICAgICAgICB2YWx1ZTogXCJNeSBqb2JzXCIsXG4gICAgICAgICAgICBpY29uOiBcIm1kaSBtZGktYW5pbWF0aW9uLXBsYXlcIixcbiAgICAgICAgICAgIGRhdGE6IFt7XG4gICAgICAgICAgICAgICAgaWQ6IFwibXlqb2JzXCIsXG4gICAgICAgICAgICAgICAgaWNvbjogXCJtZGkgbWRpLWJvb2stb3BlblwiLFxuICAgICAgICAgICAgICAgIHZhbHVlOiBcIkpvYnNcIlxuICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIGlkOiBcIndvcmtlcnNcIixcbiAgICAgICAgICAgICAgICBpY29uOiBcIm1kaSBtZGktd29ya2VyXCIsXG4gICAgICAgICAgICAgICAgdmFsdWU6IFwiV29ya2Vyc1wiXG4gICAgICAgICAgICB9XVxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgICBpZDogXCJ0Zndpa2lzX21haW5cIixcbiAgICAgICAgICAgIHZhbHVlOiBcIlRGIFdpa2lzXCIsXG4gICAgICAgICAgICBpY29uOiBcIm1kaSBtZGktYW5pbWF0aW9uLXBsYXlcIixcbiAgICAgICAgICAgIGRhdGE6IFt7XG4gICAgICAgICAgICAgICAgaWQ6IFwidGZncmlkc2RrXCIsXG4gICAgICAgICAgICAgICAgaWNvbjogXCJtZGkgbWRpLWJvb2stb3BlblwiLFxuICAgICAgICAgICAgICAgIHZhbHVlOiBcIlRGR3JpZFNES1wiXG4gICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgaWQ6IFwidGhyZWVmb2xkXCIsXG4gICAgICAgICAgICAgICAgaWNvbjogXCJtZGkgbWRpLXdvcmtlclwiLFxuICAgICAgICAgICAgICAgIHZhbHVlOiBcIlRocmVlZm9sZFwiXG4gICAgICAgICAgICB9XVxuICAgICAgICB9LFxuXG4gICAgICAgIHtcbiAgICAgICAgICAgIGlkOiBcInBhY2thZ2VzXCIsXG4gICAgICAgICAgICB2YWx1ZTogXCJQYWNrYWdlc1wiLFxuICAgICAgICAgICAgaWNvbjogXCJtZGkgbWRpLXBhY2thZ2VcIlxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgICBpZDogXCJkZXBsb3llZFNvbHV0aW9uc1wiLFxuICAgICAgICAgICAgdmFsdWU6IFwiRGVwbG95ZWQgU29sdXRpb25zXCIsXG4gICAgICAgICAgICBpY29uOiBcIm1kaSBtZGktYW5pbWF0aW9uLXBsYXlcIlxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgICBpZDogXCJzb2x1dGlvbnNcIixcbiAgICAgICAgICAgIHZhbHVlOiBcIlNvbHV0aW9uc1wiLFxuICAgICAgICAgICAgaWNvbjogXCJtZGkgbWRpLWFuaW1hdGlvbi1wbGF5XCIsXG4gICAgICAgICAgICBkYXRhOiBbe1xuICAgICAgICAgICAgICAgIGlkOiBcIm5ldHdvcmtcIixcbiAgICAgICAgICAgICAgICB2YWx1ZTogJzxzcGFuPjxpbWcgY2xhc3M9XCJzb2x1dGlvbnMtaWNvblwiIHNyYz1cInN0YXRpYy9pbWcvbmV0d29yay5wbmdcIi8+TmV0d29yazwvc3Bhbj4nXG4gICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgaWQ6IFwidWJ1bnR1XCIsXG4gICAgICAgICAgICAgICAgdmFsdWU6ICc8c3Bhbj48aW1nIGNsYXNzPVwic29sdXRpb25zLWljb25cIiBzcmM9XCJzdGF0aWMvaW1nL3VidW50dS5wbmdcIi8+VWJ1bnR1PC9zcGFuPidcbiAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICBpZDogXCJmbGlzdFwiLFxuICAgICAgICAgICAgICAgIHZhbHVlOiAnPHNwYW4+PGltZyBjbGFzcz1cInNvbHV0aW9ucy1pY29uXCIgc3JjPVwic3RhdGljL2ltZy9mbGlzdC5wbmdcIi8+R2VuZXJpYyBmbGlzdDwvc3Bhbj4nXG4gICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgaWQ6IFwibWluaW9cIixcbiAgICAgICAgICAgICAgICB2YWx1ZTogJzxzcGFuPjxpbWcgY2xhc3M9XCJzb2x1dGlvbnMtaWNvblwiIHNyYz1cInN0YXRpYy9pbWcvbWluaW8ucG5nXCIvPk1pbmlvIC8gUzM8L3NwYW4+J1xuICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIGlkOiBcIms4c19jbHVzdGVyXCIsXG4gICAgICAgICAgICAgICAgdmFsdWU6ICc8c3Bhbj48aW1nIGNsYXNzPVwic29sdXRpb25zLWljb25cIiBzcmM9XCJzdGF0aWMvaW1nL2s4cy5wbmdcIi8+S3ViZXJuZXRlcyBjbHVzdGVyPC9zcGFuPidcbiAgICAgICAgICAgIH0gLCB7XG4gICAgICAgICAgICAgICAgaWQ6IFwiZG9tYWluX2RlbGVnYXRpb25cIixcbiAgICAgICAgICAgICAgICB2YWx1ZTogJzxzcGFuPjxpbWcgY2xhc3M9XCJzb2x1dGlvbnMtaWNvblwiIHNyYz1cInN0YXRpYy9pbWcvZG5zLnBuZ1wiLz5Eb21haW4gZGVsYWdhdGlvbjwvc3Bhbj4nXG4gICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgaWQ6IFwic29sdXRpb25fZXhwb3NlXCIsXG4gICAgICAgICAgICAgICAgdmFsdWU6ICdTb2x1dGlvbiBleHBvc2UnLFxuICAgICAgICAgICAgICAgIGljb246ICdtZGkgbWRpLW5ldHdvcmsnXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBdXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICAgIGlkOiBcIndhbGxldHNNYW5hZ2VyXCIsXG4gICAgICAgICAgICB2YWx1ZTogXCJXYWxsZXRzIE1hbmFnZXJcIixcbiAgICAgICAgICAgIGljb246IFwibWRpIG1kaS13YWxsZXRcIlxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgICBpZDogXCJjYXBhY2l0eVwiLFxuICAgICAgICAgICAgdmFsdWU6IFwiQ2FwYWNpdHlcIixcbiAgICAgICAgICAgIGljb246IFwibWRpIG1kaS1zZXJ2ZXJcIlxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgICBpZDogXCJmYXJtbWFuYWdlbWVudFwiLFxuICAgICAgICAgICAgdmFsdWU6IFwiRmFybSBNYW5hZ2VtZW50XCIsXG4gICAgICAgICAgICBpY29uOiBcIm1kaSBtZGktc2VydmVyXCJcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgICAgaWQ6IFwic2RrZXhhbXBsZXNcIixcbiAgICAgICAgICAgIHZhbHVlOiBcIlNESyBFeGFtcGxlc1wiLFxuICAgICAgICAgICAgaWNvbjogXCJtZGkgbWRpLWZpbGVcIlxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgICBpZDogXCJjb2Rlc2VydmVyXCIsXG4gICAgICAgICAgICB2YWx1ZTogXCJDb2Rlc2VydmVyXCIsXG4gICAgICAgICAgICBpY29uOiBcIm1kaSBtZGktY29kZS10YWdzXCJcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgICAgaWQ6IFwianVweXRlclwiLFxuICAgICAgICAgICAgdmFsdWU6IFwiVEYgU2ltdWxhdG9yXCIsXG4gICAgICAgICAgICBpY29uOiBcIm1kaSBtZGktcGxheVwiXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICAgIGlkOiBcInNldHRpbmdzXCIsXG4gICAgICAgICAgICB2YWx1ZTogXCJTZXR0aW5nc1wiLFxuICAgICAgICAgICAgaWNvbjogXCJtZGkgbWRpLXNldHRpbmdzXCJcbiAgICAgICAgfSxcbiAgICAgICAgXVxuXG4gICAgICAgIGNvbnN0IHJlc3BvbnNlID0gd2ViaXguYWpheCgpLnN5bmMoKS5nZXQoXCIvemVyb2JvdC9hZG1pbi9hY3RvcnMvcGFja2FnZV9tYW5hZ2VyL3BhY2thZ2VzX2xpc3RcIiwgeyBoYXNfZnJvbnRlbmRfYXJnczogdHJ1ZSwgc3RhdHVzOiBcImluc3RhbGxlZFwiIH0pO1xuICAgICAgICBsZXQgcGFja2FnZXM7XG5cbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIHBhY2thZ2VzID0gSlNPTi5wYXJzZShyZXNwb25zZS5yZXNwb25zZVRleHQpLnBhY2thZ2VzO1xuICAgICAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICAgICAgcGFja2FnZXMgPSBbXTtcbiAgICAgICAgfVxuXG4gICAgICAgIGZvciAoY29uc3QgcCBvZiBwYWNrYWdlcykge1xuICAgICAgICAgICAgc2lkZWJhckRhdGEucHVzaChwLmZyb250ZW5kX2FyZ3MpO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3Qgc2lkZWJhciA9IHtcbiAgICAgICAgICAgIGxvY2FsSWQ6IFwibWVudVwiLFxuICAgICAgICAgICAgdmlldzogXCJzaWRlYmFyXCIsXG4gICAgICAgICAgICBjc3M6IFwid2ViaXhfZGFya1wiLFxuICAgICAgICAgICAgd2lkdGg6IDIwMCxcbiAgICAgICAgICAgIGRhdGE6IHNpZGViYXJEYXRhLFxuICAgICAgICB9O1xuXG4gICAgICAgIGNvbnN0IHRvb2xiYXIgPSB7XG4gICAgICAgICAgICB2aWV3OiBcInRvb2xiYXJcIixcbiAgICAgICAgICAgIHBhZGRpbmc6IDksXG4gICAgICAgICAgICBoZWlnaHQ6IDU4LFxuICAgICAgICAgICAgY29sczogW3tcbiAgICAgICAgICAgICAgICBpZDogXCJidXR0b25fc2hvd19tZW51XCIsXG4gICAgICAgICAgICAgICAgdmlldzogXCJpY29uXCIsXG4gICAgICAgICAgICAgICAgaWNvbjogXCJtZGkgbWRpLW1lbnVcIixcbiAgICAgICAgICAgICAgICBjbGljazogdGhpcy5zaG93TWVudSxcbiAgICAgICAgICAgICAgICBoaWRkZW46IHRydWUsIC8vIGhpZGRlbiBieSBkZWZhdWx0XG4gICAgICAgICAgICAgICAgdG9vbHRpcDogXCJTaG93IG1lbnVcIixcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgdmlldzogXCJ0ZW1wbGF0ZVwiLFxuICAgICAgICAgICAgICAgIHRlbXBsYXRlOiBgPGltZyBjbGFzcz1cIndlYml4X2ljb25cIiBzcmM9XCJzdGF0aWMvaW1nLzNib3QucG5nXCIvPmAsXG4gICAgICAgICAgICAgICAgYm9yZGVybGVzczogdHJ1ZSxcbiAgICAgICAgICAgICAgICBoZWlnaHQ6IDQwLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBpZDogXCJ1c2VybmFtZV9sYWJlbFwiLFxuICAgICAgICAgICAgICAgIHZpZXc6IFwibGFiZWxcIixcbiAgICAgICAgICAgICAgICBsYWJlbDogXCJ1c2VybmFtZVwiLFxuICAgICAgICAgICAgICAgIGJvcmRlcmxlc3M6IHRydWUsXG4gICAgICAgICAgICAgICAgYWxpZ246IFwicmlnaHRcIixcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgaWQ6IFwidXNlcl9pY29uXCIsXG4gICAgICAgICAgICAgICAgdmlldzogXCJpY29uXCIsXG4gICAgICAgICAgICAgICAgaWNvbjogXCJtZGkgbWRpLWFjY291bnQtY2lyY2xlXCIsXG4gICAgICAgICAgICAgICAgYm9yZGVybGVzczogdHJ1ZSxcbiAgICAgICAgICAgICAgICBwb3B1cDogXCJ1c2VyX21lbnVcIlxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgXVxuICAgICAgICB9O1xuXG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICB0eXBlOiBcImNsZWFuXCIsXG4gICAgICAgICAgICBjb2xzOiBbe1xuICAgICAgICAgICAgICAgIHJvd3M6IFtoZWFkZXIsIHNpZGViYXJdXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHJvd3M6IFtcbiAgICAgICAgICAgICAgICAgICAgdG9vbGJhcixcbiAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgJHN1YnZpZXc6IHRydWVcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIF1cbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICBzaG93TWVudSgpIHtcbiAgICAgICAgdGhpcy4kc2NvcGUubWVudS5zaG93KCk7XG4gICAgICAgIHRoaXMuJHNjb3BlLmhlYWRlci5zaG93KCk7XG4gICAgICAgIHRoaXMuJHNjb3BlLmJ1dHRvbkhpZGVNZW51LnNob3coKTtcblxuICAgICAgICB0aGlzLiRzY29wZS5idXR0b25TaG93TWVudS5oaWRlKCk7XG4gICAgfVxuXG4gICAgaGlkZU1lbnUoKSB7XG4gICAgICAgIHRoaXMuJHNjb3BlLm1lbnUuaGlkZSgpO1xuICAgICAgICB0aGlzLiRzY29wZS5oZWFkZXIuaGlkZSgpO1xuICAgICAgICB0aGlzLiRzY29wZS5idXR0b25IaWRlTWVudS5oaWRlKCk7XG5cbiAgICAgICAgdGhpcy4kc2NvcGUuYnV0dG9uU2hvd01lbnUuc2hvdygpO1xuICAgIH1cblxuICAgIGluaXQoKSB7XG4gICAgICAgIHZhciBzZWxmID0gdGhpcztcblxuICAgICAgICB0aGlzLnVzZShwbHVnaW5zLk1lbnUsIHtcbiAgICAgICAgICAgIGlkOiBcIm1lbnVcIixcbiAgICAgICAgICAgIHVybHM6IHtcbiAgICAgICAgICAgICAgICBteWpvYnM6IFwibXlqb2JzLmpvYnNcIixcbiAgICAgICAgICAgICAgICB3b3JrZXJzOiBcIm15am9icy53b3JrZXJzXCIsXG4gICAgICAgICAgICAgICAgdGZncmlkc2RrOiBcInRmd2lraXMudGZncmlkc2RrXCIsXG4gICAgICAgICAgICAgICAgdGhyZWVmb2xkOiBcInRmd2lraXMudGhyZWVmb2xkXCIsXG4gICAgICAgICAgICAgICAgdWJ1bnR1OiBcInNvbHV0aW9ucy5jaGF0Zmxvdz9hdXRob3I9dGZncmlkX3NvbHV0aW9ucyZwYWNrYWdlPXRmZ3JpZF9zb2x1dGlvbnMmY2hhdD11YnVudHVfZGVwbG95XCIsXG4gICAgICAgICAgICAgICAgbmV0d29yazogXCJzb2x1dGlvbnMuY2hhdGZsb3c/YXV0aG9yPXRmZ3JpZF9zb2x1dGlvbnMmcGFja2FnZT10ZmdyaWRfc29sdXRpb25zJmNoYXQ9bmV0d29ya19kZXBsb3lcIixcbiAgICAgICAgICAgICAgICBmbGlzdDogXCJzb2x1dGlvbnMuY2hhdGZsb3c/YXV0aG9yPXRmZ3JpZF9zb2x1dGlvbnMmcGFja2FnZT10ZmdyaWRfc29sdXRpb25zJmNoYXQ9eW91cl9mbGlzdFwiLFxuICAgICAgICAgICAgICAgIG1pbmlvOiBcInNvbHV0aW9ucy5jaGF0Zmxvdz9hdXRob3I9dGZncmlkX3NvbHV0aW9ucyZwYWNrYWdlPXRmZ3JpZF9zb2x1dGlvbnMmY2hhdD1taW5pb19kZXBsb3lcIixcbiAgICAgICAgICAgICAgICBrOHNfY2x1c3RlcjogXCJzb2x1dGlvbnMuY2hhdGZsb3c/YXV0aG9yPXRmZ3JpZF9zb2x1dGlvbnMmcGFja2FnZT10ZmdyaWRfc29sdXRpb25zJmNoYXQ9a3ViZXJuZXRlc19jbHVzdGVyX2RlcGxveVwiLFxuICAgICAgICAgICAgICAgIHRocmVlYm90OiBcInNvbHV0aW9ucy5jaGF0Zmxvdz9hdXRob3I9dGZncmlkJnBhY2thZ2U9dGhyZWVib3RfcHJvdmlzaW9uaW5nJmNoYXQ9dGhyZWVib3RfcmVzZXJ2YXRpb25cIixcbiAgICAgICAgICAgICAgICBkb21haW5fZGVsZWdhdGlvbjogXCJzb2x1dGlvbnMuY2hhdGZsb3c/YXV0aG9yPXRmZ3JpZF9zb2x1dGlvbnMmcGFja2FnZT10ZmdyaWRfc29sdXRpb25zJmNoYXQ9ZG9tYWluX2RlbGVnYXRpb25cIixcbiAgICAgICAgICAgICAgICBzb2x1dGlvbl9leHBvc2U6IFwic29sdXRpb25zLmNoYXRmbG93P2F1dGhvcj10ZmdyaWRfc29sdXRpb25zJnBhY2thZ2U9dGZncmlkX3NvbHV0aW9ucyZjaGF0PXNvbHV0aW9uX2V4cG9zZVwiLFxuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICB0aGlzLm1lbnUgPSB0aGlzLiQkKFwibWVudVwiKTtcbiAgICAgICAgdGhpcy5oZWFkZXIgPSB0aGlzLiQkKFwiaGVhZGVyXCIpO1xuXG4gICAgICAgIHRoaXMuYnV0dG9uU2hvd01lbnUgPSB0aGlzLiQkKFwiYnV0dG9uX3Nob3dfbWVudVwiKTtcbiAgICAgICAgdGhpcy5idXR0b25IaWRlTWVudSA9IHRoaXMuJCQoXCJidXR0b25faGlkZV9tZW51XCIpO1xuXG5cbiAgICAgICAgdGhpcy53ZWJpeC51aSh7XG4gICAgICAgICAgICB2aWV3OiBcInN1Ym1lbnVcIixcbiAgICAgICAgICAgIGlkOiBcInVzZXJfbWVudVwiLFxuICAgICAgICAgICAgYXV0b3dpZHRoOiB0cnVlLFxuICAgICAgICAgICAgZGF0YTogW11cbiAgICAgICAgfSk7XG5cbiAgICAgICAgdGhpcy51c2VyTWVudSA9ICQkKFwidXNlcl9tZW51XCIpO1xuICAgICAgICB0aGlzLnVzZXJNZW51LmF0dGFjaEV2ZW50KFwib25JdGVtQ2xpY2tcIiwgZnVuY3Rpb24gKGlkLCBlLCBub2RlKSB7XG4gICAgICAgICAgICBpZiAoaWQgPT0gXCJsb2dvdXRcIikge1xuICAgICAgICAgICAgICAgIGF1dGgubG9nb3V0KCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHRoaXMudXNlcm5hbWVMYWJlbCA9ICQkKFwidXNlcm5hbWVfbGFiZWxcIik7XG5cbiAgICAgICAgYXV0aC5nZXRDdXJyZW50VXNlcigpLnRoZW4oZGF0YSA9PiB7XG4gICAgICAgICAgICBjb25zdCBpbmZvID0gZGF0YS5qc29uKClcbiAgICAgICAgICAgIGxldCB1c2VybmFtZSA9IGluZm8udXNlcm5hbWU7XG5cbiAgICAgICAgICAgIGlmIChpbmZvLmRldm1vZGUpIHtcbiAgICAgICAgICAgICAgICB1c2VybmFtZSArPSBcIiBbZGV2ZWxvcG1lbnRdXCJcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgc2VsZi51c2VybmFtZUxhYmVsLmNvbmZpZy5sYWJlbCA9IHVzZXJuYW1lO1xuICAgICAgICAgICAgc2VsZi51c2VybmFtZUxhYmVsLmNvbmZpZy53aWR0aCA9IHdlYml4Lmh0bWwuZ2V0VGV4dFNpemUodXNlcm5hbWUpICsgMTA7XG4gICAgICAgICAgICBzZWxmLnVzZXJuYW1lTGFiZWwucmVmcmVzaCgpO1xuXG4gICAgICAgICAgICBzZWxmLnVzZXJNZW51LmFkZCh7IGlkOiAnZW1haWwnLCB2YWx1ZTogaW5mby5lbWFpbCB9KVxuICAgICAgICAgICAgc2VsZi51c2VyTWVudS5hZGQoeyBpZDogJ2xvZ291dCcsIHZhbHVlOiBcIkxvZ291dFwiIH0pXG4gICAgICAgIH0pLmNhdGNoKCgpID0+IHtcbiAgICAgICAgICAgIGF1dGgubG9nb3V0KCk7XG4gICAgICAgIH0pO1xuICAgIH1cblxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc291cmNlcy92aWV3cy9tYWluLmpzIiwiaW1wb3J0IHsgSmV0VmlldyB9IGZyb20gXCJ3ZWJpeC1qZXRcIjtcblxuaW1wb3J0IHsgZGF0ZUZvcm1hdHRlciB9IGZyb20gXCIuLi8uLi9jb21tb24vZm9ybWF0dGVyc1wiO1xuaW1wb3J0IHsgbXlqb2JzIH0gZnJvbSBcIi4uLy4uL3NlcnZpY2VzL215am9ic1wiO1xuaW1wb3J0IEpvYkRldGFpbHNWaWV3IGZyb20gXCIuL2pvYkRldGFpbHNcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgSm9ic1ZpZXcgZXh0ZW5kcyBKZXRWaWV3IHtcbiAgICBjb25maWcoKSB7XG4gICAgICAgIGNvbnN0IHZpZXcgPSB7XG4gICAgICAgICAgICB2aWV3OiBcImRhdGF0YWJsZVwiLFxuICAgICAgICAgICAgaWQ6IFwiam9ic190YWJsZVwiLFxuICAgICAgICAgICAgcmVzaXplQ29sdW1uOiB0cnVlLFxuICAgICAgICAgICAgc2VsZWN0OiB0cnVlLFxuICAgICAgICAgICAgbXVsdGlzZWxlY3Q6IHRydWUsXG4gICAgICAgICAgICBjc3M6IFwid2ViaXhfaGVhZGVyX2JvcmRlciB3ZWJpeF9kYXRhX2JvcmRlclwiLFxuICAgICAgICAgICAgY29sdW1uczogW3tcbiAgICAgICAgICAgICAgICBpZDogXCJpbmRleFwiLFxuICAgICAgICAgICAgICAgIGhlYWRlcjogXCIjXCIsXG4gICAgICAgICAgICAgICAgc29ydDogXCJpbnRcIixcbiAgICAgICAgICAgICAgICBhdXRvd2lkdGg6IHRydWUsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGlkOiBcImNhdGVnb3J5XCIsXG4gICAgICAgICAgICAgICAgaGVhZGVyOiBcIkNhdGVnb3J5XCIsXG4gICAgICAgICAgICAgICAgc29ydDogXCJzdHJpbmdcIlxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBpZDogXCJ0aW1lX3N0YXJ0XCIsXG4gICAgICAgICAgICAgICAgaGVhZGVyOiBcIlN0YXJ0IHRpbWVcIixcbiAgICAgICAgICAgICAgICBzb3J0OiBcImRhdGVcIixcbiAgICAgICAgICAgICAgICBmb3JtYXQ6IGRhdGVGb3JtYXR0ZXIsXG4gICAgICAgICAgICAgICAgd2lkdGg6IDIwMFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBpZDogXCJ0aW1lX3N0b3BcIixcbiAgICAgICAgICAgICAgICBoZWFkZXI6IFwiU3RvcCB0aW1lXCIsXG4gICAgICAgICAgICAgICAgc29ydDogXCJkYXRlXCIsXG4gICAgICAgICAgICAgICAgZm9ybWF0OiBkYXRlRm9ybWF0dGVyLFxuICAgICAgICAgICAgICAgIHdpZHRoOiAyMDBcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgaWQ6IFwidGltZW91dFwiLFxuICAgICAgICAgICAgICAgIGhlYWRlcjogXCJUaW1lb3V0XCIsXG4gICAgICAgICAgICAgICAgc29ydDogXCJpbnRcIlxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBpZDogXCJhY3Rpb25faWRcIixcbiAgICAgICAgICAgICAgICBoZWFkZXI6IFwiQWN0aW9uXCIsXG4gICAgICAgICAgICAgICAgc29ydDogXCJzdHJpbmdcIlxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBpZDogXCJrd2FyZ3NcIixcbiAgICAgICAgICAgICAgICBoZWFkZXI6IFwiQXJndW1lbnRzXCIsXG4gICAgICAgICAgICAgICAgc29ydDogXCJzdHJpbmdcIixcbiAgICAgICAgICAgICAgICBmb3JtYXQ6IEpTT04uc3RyaW5naWZ5XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGlkOiBcInJlc3VsdFwiLFxuICAgICAgICAgICAgICAgIGhlYWRlcjogW1xuICAgICAgICAgICAgICAgICAgICBcIlJlc3VsdFwiLFxuICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb250ZW50OiBcInRleHRGaWx0ZXJcIlxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICBzb3J0OiBcInN0cmluZ1wiLFxuICAgICAgICAgICAgICAgIGZvcm1hdDogSlNPTi5zdHJpbmdpZnksXG4gICAgICAgICAgICB9XSxcbiAgICAgICAgICAgIHNjaGVtZToge1xuICAgICAgICAgICAgICAgICRpbml0OiBmdW5jdGlvbiAob2JqKSB7XG4gICAgICAgICAgICAgICAgICAgIG9iai5pbmRleCA9IHRoaXMuY291bnQoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICB9O1xuXG4gICAgICAgIHJldHVybiB2aWV3O1xuICAgIH1cblxuICAgIGluaXQodmlldykge1xuICAgICAgICBjb25zdCBzZWxmID0gdGhpc1xuICAgICAgICBzZWxmLmpvYkRldGFpbHNWaWV3ID0gc2VsZi51aShKb2JEZXRhaWxzVmlldyk7XG4gICAgICAgIHNlbGYuam9iVGFibGUgPSB0aGlzLiQkKFwiam9ic190YWJsZVwiKTtcbiAgICAgICAgXG4gICAgICAgIG15am9icy5saXN0Sm9icygpLnRoZW4oZGF0YSA9PiB7XG4gICAgICAgICAgICB2aWV3LnBhcnNlKGRhdGEpO1xuICAgICAgICB9KTtcbiAgICAgICAgc2VsZi5qb2JUYWJsZS5hdHRhY2hFdmVudChcIm9uSXRlbURibENsaWNrXCIsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIGxldCBpZCA9IHNlbGYuam9iVGFibGUuZ2V0U2VsZWN0ZWRJZCgpXG4gICAgICAgICAgICBsZXQgaXRlbSA9IHNlbGYuam9iVGFibGUuZ2V0SXRlbShpZClcbiAgICAgICAgICAgIHNlbGYuam9iRGV0YWlsc1ZpZXcuc2hvd0pvYkRldGFpbHMoaXRlbSk7XG4gICAgICAgIH0pO1xuICAgIH1cbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NvdXJjZXMvdmlld3MvbXlqb2JzL2pvYnMuanMiLCJpbXBvcnQgeyBTZXJ2aWNlIH0gZnJvbSBcIi4uL2NvbW1vbi9hcGlcIjtcblxuY29uc3QgQkFTRV9VUkwgPSBcIi96ZXJvYm90L2FkbWluL2FjdG9ycy9teWpvYnNcIjtcblxuY2xhc3MgTXlqb2JzU2VydmljZSBleHRlbmRzIFNlcnZpY2Uge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICBzdXBlcihCQVNFX1VSTCk7XG4gICAgfVxuXG4gICAgbGlzdEpvYnMoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmdldENhbGwoXCJsaXN0X2pvYnNcIik7XG4gICAgfVxuXG4gICAgbGlzdFdvcmtlcnMoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmdldENhbGwoXCJsaXN0X3dvcmtlcnNcIik7XG4gICAgfVxufVxuXG5leHBvcnQgY29uc3QgbXlqb2JzID0gbmV3IE15am9ic1NlcnZpY2UoKTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NvdXJjZXMvc2VydmljZXMvbXlqb2JzLmpzIiwiaW1wb3J0IHsgSmV0VmlldyB9IGZyb20gXCJ3ZWJpeC1qZXRcIjtcblxuaW1wb3J0IHsgZGF0ZUZvcm1hdHRlciB9IGZyb20gXCIuLi8uLi9jb21tb24vZm9ybWF0dGVyc1wiO1xuaW1wb3J0IHsgbXlqb2JzIH0gZnJvbSBcIi4uLy4uL3NlcnZpY2VzL215am9ic1wiO1xuaW1wb3J0IFdvcmtlckRldGFpbHNWaWV3IGZyb20gXCIuL3dvcmtlckRldGFpbHNcIlxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBKb2JzVmlldyBleHRlbmRzIEpldFZpZXcge1xuICAgIGNvbmZpZygpIHtcbiAgICAgICAgY29uc3QgdmlldyA9IHtcbiAgICAgICAgICAgIHZpZXc6IFwiZGF0YXRhYmxlXCIsXG4gICAgICAgICAgICBpZDogXCJ3b3JrZXJzX3RhYmxlXCIsXG4gICAgICAgICAgICByZXNpemVDb2x1bW46IHRydWUsXG4gICAgICAgICAgICBzZWxlY3Q6IHRydWUsXG4gICAgICAgICAgICBtdWx0aXNlbGVjdDogdHJ1ZSxcbiAgICAgICAgICAgIGNzczogXCJ3ZWJpeF9oZWFkZXJfYm9yZGVyIHdlYml4X2RhdGFfYm9yZGVyXCIsXG4gICAgICAgICAgICBjb2x1bW5zOiBbe1xuICAgICAgICAgICAgICAgIGlkOiBcImluZGV4XCIsXG4gICAgICAgICAgICAgICAgaGVhZGVyOiBcIiNcIixcbiAgICAgICAgICAgICAgICBzb3J0OiBcImludFwiLFxuICAgICAgICAgICAgICAgIGF1dG93aWR0aDogdHJ1ZSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgaWQ6IFwic3RhdGVcIixcbiAgICAgICAgICAgICAgICBoZWFkZXI6IFwiU3RhdGVcIixcbiAgICAgICAgICAgICAgICBzb3J0OiBcInN0cmluZ1wiXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGlkOiBcImhhbHRcIixcbiAgICAgICAgICAgICAgICBoZWFkZXI6IFwiSGFsdGVkXCIsXG4gICAgICAgICAgICAgICAgc29ydDogXCJzdHJpbmdcIixcbiAgICAgICAgICAgICAgICBmb3JtYXQ6IGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdmFsdWUgPyAnWWVzJyA6ICdObyc7XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgaWQ6IFwicGlkXCIsXG4gICAgICAgICAgICAgICAgaGVhZGVyOiBcIlBJRFwiLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBpZDogXCJjdXJyZW50X2pvYlwiLFxuICAgICAgICAgICAgICAgIGhlYWRlcjogXCJDdXJyZW50IGpvYlwiLFxuICAgICAgICAgICAgICAgIGZvcm1hdDogZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB2YWx1ZSA9PSAyMTQ3NDgzNjQ3ID8gJ04vQScgOiB2YWx1ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGlkOiBcImxhc3RfdXBkYXRlXCIsXG4gICAgICAgICAgICAgICAgaGVhZGVyOiBcIkxhc3QgdXBkYXRlXCIsXG4gICAgICAgICAgICAgICAgc29ydDogXCJkYXRlXCIsXG4gICAgICAgICAgICAgICAgZm9ybWF0OiBkYXRlRm9ybWF0dGVyLFxuICAgICAgICAgICAgICAgIHdpZHRoOiAyMDBcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgaWQ6IFwidGltZV9zdGFydFwiLFxuICAgICAgICAgICAgICAgIGhlYWRlcjogXCJTdGFydCB0aW1lXCIsXG4gICAgICAgICAgICAgICAgc29ydDogXCJkYXRlXCIsXG4gICAgICAgICAgICAgICAgZm9ybWF0OiBkYXRlRm9ybWF0dGVyLFxuICAgICAgICAgICAgICAgIHdpZHRoOiAyMDBcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgaWQ6IFwidGltZW91dFwiLFxuICAgICAgICAgICAgICAgIGhlYWRlcjogXCJUaW1lb3V0XCIsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGlkOiBcInR5cGVcIixcbiAgICAgICAgICAgICAgICBoZWFkZXI6IFwiVHlwZVwiLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBpZDogXCJlcnJvclwiLFxuICAgICAgICAgICAgICAgIGhlYWRlcjogXCJFcnJvclwiLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBpZDogXCJsb2dzXCIsXG4gICAgICAgICAgICAgICAgaGVhZGVyOiBcIkxvZ3NcIixcbiAgICAgICAgICAgICAgICBzb3J0OiBcInN0cmluZ1wiLFxuICAgICAgICAgICAgICAgIHdpZHRoOiAyMDAsXG4gICAgICAgICAgICAgICAgdGVtcGxhdGU6ZnVuY3Rpb24ob2JqKXsgXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBcIjxkaXYgY2xhc3M9J3dlYml4X2VsX2J1dHRvbic+PGJ1dHRvbiBjbGFzcz0nYnRuX3ZpZXcnPiBMb2dzIDwvYnV0dG9uPjwvZGl2PlwiO1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB9XSxcbiAgICAgICAgICAgIG9uQ2xpY2s6e1xuICAgICAgICAgICAgICAgIGJ0bl92aWV3OmZ1bmN0aW9uKGV2LCBpZCl7XG4gICAgICAgICAgICAgICAgICAgIHZhciBpdGVtID0gdGhpcy5nZXRJdGVtKGlkKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy4kc2NvcGUuc2hvdyhgL21haW4vbG9ncz9hcHBuYW1lPSR7aXRlbS5uYW1lfWApXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGF1dG9Db25maWc6IHRydWUsXG4gICAgICAgICAgICBzY2hlbWU6IHtcbiAgICAgICAgICAgICAgICAkaW5pdDogZnVuY3Rpb24gKG9iaikge1xuICAgICAgICAgICAgICAgICAgICBvYmouaW5kZXggPSB0aGlzLmNvdW50KCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgfTtcblxuICAgICAgICByZXR1cm4gdmlldztcbiAgICB9XG5cbiAgICBpbml0KHZpZXcpIHtcbiAgICAgICAgY29uc3Qgc2VsZiA9IHRoaXNcbiAgICAgICAgc2VsZi53b3JrZXJEZXRhaWxzVmlldyA9IHNlbGYudWkoV29ya2VyRGV0YWlsc1ZpZXcpO1xuXG4gICAgICAgIG15am9icy5saXN0V29ya2VycygpLnRoZW4oZGF0YSA9PiB7XG4gICAgICAgICAgICBsZXQgd29ya2VycyA9IGRhdGEuanNvbigpXG4gICAgICAgICAgICAvLyBtYXAgd29ya2VyIG5hbWUgZnJvbSB3MSB0byB3ZW9ya2Vyc18xIGZvciByZWRpcmVjdGlvbiB0byBsb2dzXG4gICAgICAgICAgICBmb3IgKGxldCBpIGluIHdvcmtlcnMpe1xuICAgICAgICAgICAgICAgIHdvcmtlcnNbaV1bJ25hbWUnXSA9IHdvcmtlcnNbaV1bJ25hbWUnXS5yZXBsYWNlKCd3Jywnd29ya2Vyc18nKVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdmlldy5wYXJzZSh3b3JrZXJzKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgc2VsZi53b3JrZXJUYWJsZSA9IHRoaXMuJCQoXCJ3b3JrZXJzX3RhYmxlXCIpO1xuXG4gICAgICAgIHNlbGYud29ya2VyVGFibGUuYXR0YWNoRXZlbnQoXCJvbkl0ZW1EYmxDbGlja1wiLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBsZXQgaWQgPSBzZWxmLndvcmtlclRhYmxlLmdldFNlbGVjdGVkSWQoKVxuICAgICAgICAgICAgbGV0IGl0ZW0gPSBzZWxmLndvcmtlclRhYmxlLmdldEl0ZW0oaWQpXG4gICAgICAgICAgICBsZXQgV29ya2VyRGF0YSA9IHtcbiAgICAgICAgICAgICAgICAnZGVidWcnOml0ZW1bJ2RlYnVnJ10udG9TdHJpbmcoKSxcbiAgICAgICAgICAgICAgICAnaGFsdCc6aXRlbVsnaGFsdCddLnRvU3RyaW5nKCksXG4gICAgICAgICAgICAgICAgJ2Vycm9yJzppdGVtWydlcnJvciddWydtZXNzYWdlJ10sXG4gICAgICAgICAgICAgICAgJ3BpZCc6aXRlbVsncGlkJ10sXG4gICAgICAgICAgICAgICAgJ2N1cnJlbnRfam9iJzppdGVtWydjdXJyZW50X2pvYiddID09IDIxNDc0ODM2NDcgPyAnTi9BJyA6IGl0ZW1bJ2N1cnJlbnRfam9iJ10sXG4gICAgICAgICAgICAgICAgJ25hbWUnOml0ZW1bJ25hbWUnXSxcbiAgICAgICAgICAgICAgICAnc3RhdGUnOml0ZW1bJ3N0YXRlJ10sXG4gICAgICAgICAgICAgICAgJ2xhc3RfdXBkYXRlJzpkYXRlRm9ybWF0dGVyKGl0ZW1bJ2xhc3RfdXBkYXRlJ10pLFxuICAgICAgICAgICAgICAgICd0aW1lX3N0YXJ0JzpkYXRlRm9ybWF0dGVyKGl0ZW1bJ3RpbWVfc3RhcnQnXSksXG4gICAgICAgICAgICAgICAgJ3RpbWVvdXQnOml0ZW1bJ3RpbWVvdXQnXSxcbiAgICAgICAgICAgICAgICAndHlwZSc6aXRlbVsndHlwZSddXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBzZWxmLndvcmtlckRldGFpbHNWaWV3LnNob3dXb3JrZXJEZXRhaWxzKFdvcmtlckRhdGEpO1xuICAgICAgICB9KTtcbiAgICB9XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zb3VyY2VzL3ZpZXdzL215am9icy93b3JrZXJzLmpzIiwiaW1wb3J0IHsgRXh0ZXJuYWxWaWV3IH0gZnJvbSBcIi4uL2V4dGVybmFsXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIENoYXRmbG93VmlldyBleHRlbmRzIEV4dGVybmFsVmlldyB7XG4gICAgY29uc3RydWN0b3IoYXBwLCBuYW1lKSB7XG4gICAgICAgIHN1cGVyKGFwcCwgbmFtZSk7XG5cbiAgICAgICAgdGhpcy5iYXNlR2l0VXJsID0gXCJodHRwczovL2dpdGh1Yi5jb20vdGhyZWVmb2xkdGVjaC9qdW1wc2NhbGVYX3RocmVlYm90L3RyZWUvZGV2ZWxvcG1lbnQvVGhyZWVCb3RQYWNrYWdlc1wiO1xuXG4gICAgfVxuXG4gICAgdXJsQ2hhbmdlKHZpZXcsIHVybCkge1xuICAgICAgICBjb25zdCBwYXJhbXMgPSB1cmxbMF0ucGFyYW1zO1xuICAgICAgICBpZiAoT2JqZWN0LmtleXMocGFyYW1zKS5sZW5ndGggIT09IDMpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IHBhY2thZ2VOYW1lID0gYCR7cGFyYW1zLmF1dGhvcn0uJHtwYXJhbXMucGFja2FnZX1gXG4gICAgICAgIGNvbnN0IHBhY2thZ2VVcmwgPSBwYWNrYWdlTmFtZS5yZXBsYWNlKFwiLlwiLCBcIi9cIik7XG5cbiAgICAgICAgdGhpcy50YXJnZXRVcmwgPSBgLyR7cGFja2FnZVVybH0vY2hhdC8ke3BhcmFtcy5jaGF0fT9ub2hlYWRlcj15ZXNgO1xuICAgICAgICB0aGlzLnJlcXVpcmVkUGFja2FnZXMgPSB7fVxuICAgICAgICB0aGlzLnJlcXVpcmVkUGFja2FnZXNbcGFja2FnZU5hbWVdID0gYCR7dGhpcy5iYXNlR2l0VXJsfS8ke3BhY2thZ2VVcmx9YDtcblxuICAgICAgICB0aGlzLmluaXQodmlldyk7XG4gICAgfVxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc291cmNlcy92aWV3cy9zb2x1dGlvbnMvY2hhdGZsb3cuanMiLCJpbXBvcnQgeyBFeHRlcm5hbFZpZXcgfSBmcm9tIFwiLi4vZXh0ZXJuYWxcIjtcblxuY29uc3QgVEZHUklEU0RLX1VSTCA9IFwiL3RocmVlZm9sZC9pbmZvX3RmZ3JpZHNkay9cIjtcbmNvbnN0IFJFUVVJUkVEX1BBQ0tBR0VTID0ge1xuICAgIFwidGhyZWVmb2xkLndpa2lzXCI6IFwiaHR0cHM6Ly9naXRodWIuY29tL3RocmVlZm9sZHRlY2gvanVtcHNjYWxlWF90aHJlZWJvdC90cmVlL2RldmVsb3BtZW50L1RocmVlQm90UGFja2FnZXMvdGhyZWVmb2xkL3dpa2lzXCJcbn1cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVEZHcmlkU0RLV2lraSBleHRlbmRzIEV4dGVybmFsVmlldyB7XG4gICAgY29uc3RydWN0b3IoYXBwLCBuYW1lKSB7XG4gICAgICAgIHN1cGVyKGFwcCwgbmFtZSwgVEZHUklEU0RLX1VSTCwgUkVRVUlSRURfUEFDS0FHRVMpO1xuICAgIH1cbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NvdXJjZXMvdmlld3MvdGZ3aWtpcy90ZmdyaWRzZGsuanMiLCJpbXBvcnQgeyBFeHRlcm5hbFZpZXcgfSBmcm9tIFwiLi4vZXh0ZXJuYWxcIjtcblxuY29uc3QgVEhSRUVGT0xEX1VSTCA9IFwiL3RocmVlZm9sZC9pbmZvX3RocmVlZm9sZC9cIjtcbmNvbnN0IFJFUVVJUkVEX1BBQ0tBR0VTID0ge1xuICAgIFwidGhyZWVmb2xkLndpa2lzXCI6IFwiaHR0cHM6Ly9naXRodWIuY29tL3RocmVlZm9sZHRlY2gvanVtcHNjYWxlWF90aHJlZWJvdC90cmVlL2RldmVsb3BtZW50L1RocmVlQm90UGFja2FnZXMvdGhyZWVmb2xkL3dpa2lzXCJcbn1cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVGhyZWVmb2xkV2lraSBleHRlbmRzIEV4dGVybmFsVmlldyB7XG4gICAgY29uc3RydWN0b3IoYXBwLCBuYW1lKSB7XG4gICAgICAgIHN1cGVyKGFwcCwgbmFtZSwgVEhSRUVGT0xEX1VSTCwgUkVRVUlSRURfUEFDS0FHRVMpO1xuICAgIH1cbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NvdXJjZXMvdmlld3MvdGZ3aWtpcy90aHJlZWZvbGQuanMiLCJpbXBvcnQgeyBFeHRlcm5hbFZpZXcgfSBmcm9tIFwiLi4vZXh0ZXJuYWxcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgV2lraUV4dGVybmFsVmlldyBleHRlbmRzIEV4dGVybmFsVmlldyB7XG4gICAgY29uc3RydWN0b3IoYXBwLCBuYW1lKSB7XG4gICAgICAgIHN1cGVyKGFwcCwgbmFtZSk7XG5cbiAgICB9XG5cbiAgICB1cmxDaGFuZ2UodmlldywgdXJsKSB7XG4gICAgICAgIGNvbnN0IHBhcmFtcyA9IHVybFswXS5wYXJhbXM7XG4gICAgICAgIGlmIChPYmplY3Qua2V5cyhwYXJhbXMpLmxlbmd0aCAhPT0gMSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy50YXJnZXRVcmwgPSBgL3dpa2kvJHtwYXJhbXMubmFtZX1gO1xuICAgICAgICBcbiAgICAgICAgdGhpcy5pbml0KHZpZXcpO1xuICAgIH1cbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NvdXJjZXMvdmlld3Mvd2lraXMvdmlldy5qcyIsImltcG9ydCBcIi4vc3R5bGVzL2FwcC5jc3NcIjtcbmltcG9ydCB7SmV0QXBwfSBmcm9tIFwid2ViaXgtamV0XCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEludmVudG9yeUFwcCBleHRlbmRzIEpldEFwcCB7XG5cdGNvbnN0cnVjdG9yKGNvbmZpZyl7XG5cdFx0c3VwZXIod2ViaXguZXh0ZW5kKHtcblx0XHRcdGlkOlx0XHRcdEFQUE5BTUUsXG5cdFx0XHR2ZXJzaW9uOlx0VkVSU0lPTixcblx0XHRcdHN0YXJ0Olx0XHRcIi9tYWluL2Rhc2hcIixcblx0XHRcdGRlYnVnOlx0XHQhUFJPRFVDVElPTlxuXHRcdH0sIGNvbmZpZywgdHJ1ZSkpO1xuXG5cdFx0LyogZXJyb3IgdHJhY2tpbmcgKi9cblx0XHR0aGlzLmF0dGFjaEV2ZW50KFwiYXBwOmVycm9yOnJlc29sdmVcIiwgZnVuY3Rpb24obmFtZSwgZXJyb3Ipe1xuXHRcdFx0d2luZG93LmNvbnNvbGUuZXJyb3IoZXJyb3IpO1xuXHRcdH0pO1xuXHR9XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zb3VyY2VzL2FwcC5qcyIsIi8vIHJlbW92ZWQgYnkgZXh0cmFjdC10ZXh0LXdlYnBhY2stcGx1Z2luXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9zb3VyY2VzL3N0eWxlcy9hcHAuY3NzXG4vLyBtb2R1bGUgaWQgPSA1N1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJ2YXIgbWFwID0ge1xuXHRcIi4vYWxlcnRzXCI6IDgsXG5cdFwiLi9hbGVydHMvXCI6IDgsXG5cdFwiLi9hbGVydHMvYWxlcnRcIjogMjQsXG5cdFwiLi9hbGVydHMvYWxlcnQuanNcIjogMjQsXG5cdFwiLi9hbGVydHMvZGF0YVwiOiA3LFxuXHRcIi4vYWxlcnRzL2RhdGEuanNcIjogNyxcblx0XCIuL2FsZXJ0cy9pbmRleFwiOiA4LFxuXHRcIi4vYWxlcnRzL2luZGV4LmpzXCI6IDgsXG5cdFwiLi9jYXBhY2l0eVwiOiA5LFxuXHRcIi4vY2FwYWNpdHkvXCI6IDksXG5cdFwiLi9jYXBhY2l0eS9pbmRleFwiOiA5LFxuXHRcIi4vY2FwYWNpdHkvaW5kZXguanNcIjogOSxcblx0XCIuL2NpcmNsZXNcIjogMTAsXG5cdFwiLi9jaXJjbGVzL1wiOiAxMCxcblx0XCIuL2NpcmNsZXMvaW5kZXhcIjogMTAsXG5cdFwiLi9jaXJjbGVzL2luZGV4LmpzXCI6IDEwLFxuXHRcIi4vY2lyY2xlc3Rvcmllc1wiOiAxMSxcblx0XCIuL2NpcmNsZXN0b3JpZXMvXCI6IDExLFxuXHRcIi4vY2lyY2xlc3Rvcmllcy9pbmRleFwiOiAxMSxcblx0XCIuL2NpcmNsZXN0b3JpZXMvaW5kZXguanNcIjogMTEsXG5cdFwiLi9jaXJjbGV0YXNrc1wiOiAxMixcblx0XCIuL2NpcmNsZXRhc2tzL1wiOiAxMixcblx0XCIuL2NpcmNsZXRhc2tzL2luZGV4XCI6IDEyLFxuXHRcIi4vY2lyY2xldGFza3MvaW5kZXguanNcIjogMTIsXG5cdFwiLi9jb2Rlc2VydmVyXCI6IDEzLFxuXHRcIi4vY29kZXNlcnZlci9cIjogMTMsXG5cdFwiLi9jb2Rlc2VydmVyL2luZGV4XCI6IDEzLFxuXHRcIi4vY29kZXNlcnZlci9pbmRleC5qc1wiOiAxMyxcblx0XCIuL2Rhc2hcIjogMTQsXG5cdFwiLi9kYXNoL1wiOiAxNCxcblx0XCIuL2Rhc2gvZGlza1NwYWNlXCI6IDQxLFxuXHRcIi4vZGFzaC9kaXNrU3BhY2UuanNcIjogNDEsXG5cdFwiLi9kYXNoL2hlYWx0aFwiOiA0Mixcblx0XCIuL2Rhc2gvaGVhbHRoLmpzXCI6IDQyLFxuXHRcIi4vZGFzaC9pbmRleFwiOiAxNCxcblx0XCIuL2Rhc2gvaW5kZXguanNcIjogMTQsXG5cdFwiLi9kYXNoL2pzeEluZm9cIjogNDMsXG5cdFwiLi9kYXNoL2pzeEluZm8uanNcIjogNDMsXG5cdFwiLi9kYXNoL3Byb2Nlc3NEZXRhaWxzXCI6IDI3LFxuXHRcIi4vZGFzaC9wcm9jZXNzRGV0YWlscy5qc1wiOiAyNyxcblx0XCIuL2Rhc2gvcHJvY2Vzc2VzXCI6IDQ0LFxuXHRcIi4vZGFzaC9wcm9jZXNzZXMuanNcIjogNDQsXG5cdFwiLi9kYXNoL3Byb2Nlc3Nlc0xpc3RcIjogNDUsXG5cdFwiLi9kYXNoL3Byb2Nlc3Nlc0xpc3QuanNcIjogNDUsXG5cdFwiLi9kYXNoL3J1bm5pbmdQb3J0c1wiOiA0Nixcblx0XCIuL2Rhc2gvcnVubmluZ1BvcnRzLmpzXCI6IDQ2LFxuXHRcIi4vZGVwbG95ZWRTb2x1dGlvbnNcIjogMTUsXG5cdFwiLi9kZXBsb3llZFNvbHV0aW9ucy9cIjogMTUsXG5cdFwiLi9kZXBsb3llZFNvbHV0aW9ucy9pbmRleFwiOiAxNSxcblx0XCIuL2RlcGxveWVkU29sdXRpb25zL2luZGV4LmpzXCI6IDE1LFxuXHRcIi4vZGVwbG95ZWRTb2x1dGlvbnMvcmVzZXJ2YXRpb25cIjogMjgsXG5cdFwiLi9kZXBsb3llZFNvbHV0aW9ucy9yZXNlcnZhdGlvbi5qc1wiOiAyOCxcblx0XCIuL2Vycm9ycy9kaWFsb2dcIjogMyxcblx0XCIuL2Vycm9ycy9kaWFsb2cuanNcIjogMyxcblx0XCIuL2V4dGVybmFsXCI6IDEsXG5cdFwiLi9leHRlcm5hbC9cIjogMSxcblx0XCIuL2V4dGVybmFsL2luZGV4XCI6IDEsXG5cdFwiLi9leHRlcm5hbC9pbmRleC5qc1wiOiAxLFxuXHRcIi4vZmFybW1hbmFnZW1lbnRcIjogMTYsXG5cdFwiLi9mYXJtbWFuYWdlbWVudC9cIjogMTYsXG5cdFwiLi9mYXJtbWFuYWdlbWVudC9pbmRleFwiOiAxNixcblx0XCIuL2Zhcm1tYW5hZ2VtZW50L2luZGV4LmpzXCI6IDE2LFxuXHRcIi4vanVweXRlclwiOiAxNyxcblx0XCIuL2p1cHl0ZXIvXCI6IDE3LFxuXHRcIi4vanVweXRlci9pbmRleFwiOiAxNyxcblx0XCIuL2p1cHl0ZXIvaW5kZXguanNcIjogMTcsXG5cdFwiLi9sb2dzXCI6IDE4LFxuXHRcIi4vbG9ncy9cIjogMTgsXG5cdFwiLi9sb2dzL2FwcExvZ3NcIjogMjksXG5cdFwiLi9sb2dzL2FwcExvZ3MuanNcIjogMjksXG5cdFwiLi9sb2dzL2luZGV4XCI6IDE4LFxuXHRcIi4vbG9ncy9pbmRleC5qc1wiOiAxOCxcblx0XCIuL21haW5cIjogNDcsXG5cdFwiLi9tYWluLmpzXCI6IDQ3LFxuXHRcIi4vbXlqb2JzL2pvYkRldGFpbHNcIjogMzAsXG5cdFwiLi9teWpvYnMvam9iRGV0YWlscy5qc1wiOiAzMCxcblx0XCIuL215am9icy9qb2JzXCI6IDQ4LFxuXHRcIi4vbXlqb2JzL2pvYnMuanNcIjogNDgsXG5cdFwiLi9teWpvYnMvd29ya2VyRGV0YWlsc1wiOiAzMSxcblx0XCIuL215am9icy93b3JrZXJEZXRhaWxzLmpzXCI6IDMxLFxuXHRcIi4vbXlqb2JzL3dvcmtlcnNcIjogNTAsXG5cdFwiLi9teWpvYnMvd29ya2Vycy5qc1wiOiA1MCxcblx0XCIuL3BhY2thZ2VzXCI6IDE5LFxuXHRcIi4vcGFja2FnZXMvXCI6IDE5LFxuXHRcIi4vcGFja2FnZXMvaW5kZXhcIjogMTksXG5cdFwiLi9wYWNrYWdlcy9pbmRleC5qc1wiOiAxOSxcblx0XCIuL3BhY2thZ2VzL3BhY2thZ2VEZXRhaWxzXCI6IDMyLFxuXHRcIi4vcGFja2FnZXMvcGFja2FnZURldGFpbHMuanNcIjogMzIsXG5cdFwiLi9zZGtleGFtcGxlc1wiOiAyMCxcblx0XCIuL3Nka2V4YW1wbGVzL1wiOiAyMCxcblx0XCIuL3Nka2V4YW1wbGVzL2luZGV4XCI6IDIwLFxuXHRcIi4vc2RrZXhhbXBsZXMvaW5kZXguanNcIjogMjAsXG5cdFwiLi9zZXR0aW5nc1wiOiAyMSxcblx0XCIuL3NldHRpbmdzL1wiOiAyMSxcblx0XCIuL3NldHRpbmdzL2FkbWluc1wiOiAzMyxcblx0XCIuL3NldHRpbmdzL2FkbWlucy5qc1wiOiAzMyxcblx0XCIuL3NldHRpbmdzL2dlbmVyYWxcIjogMzQsXG5cdFwiLi9zZXR0aW5ncy9nZW5lcmFsLmpzXCI6IDM0LFxuXHRcIi4vc2V0dGluZ3MvaW5kZXhcIjogMjEsXG5cdFwiLi9zZXR0aW5ncy9pbmRleC5qc1wiOiAyMSxcblx0XCIuL3NvbHV0aW9ucy9jaGF0Zmxvd1wiOiA1MSxcblx0XCIuL3NvbHV0aW9ucy9jaGF0Zmxvdy5qc1wiOiA1MSxcblx0XCIuL3Rmd2lraXMvdGZncmlkc2RrXCI6IDUyLFxuXHRcIi4vdGZ3aWtpcy90ZmdyaWRzZGsuanNcIjogNTIsXG5cdFwiLi90Zndpa2lzL3RocmVlZm9sZFwiOiA1Myxcblx0XCIuL3Rmd2lraXMvdGhyZWVmb2xkLmpzXCI6IDUzLFxuXHRcIi4vd2FsbGV0c01hbmFnZXJcIjogMjIsXG5cdFwiLi93YWxsZXRzTWFuYWdlci9cIjogMjIsXG5cdFwiLi93YWxsZXRzTWFuYWdlci9pbXBvcnRGb3JtXCI6IDM4LFxuXHRcIi4vd2FsbGV0c01hbmFnZXIvaW1wb3J0Rm9ybS5qc1wiOiAzOCxcblx0XCIuL3dhbGxldHNNYW5hZ2VyL2luZGV4XCI6IDIyLFxuXHRcIi4vd2FsbGV0c01hbmFnZXIvaW5kZXguanNcIjogMjIsXG5cdFwiLi93YWxsZXRzTWFuYWdlci93YWxsZXREZXRhaWxzXCI6IDM3LFxuXHRcIi4vd2FsbGV0c01hbmFnZXIvd2FsbGV0RGV0YWlscy5qc1wiOiAzNyxcblx0XCIuL3dhbGxldHNNYW5hZ2VyL3dhbGxldEZvcm1cIjogMzUsXG5cdFwiLi93YWxsZXRzTWFuYWdlci93YWxsZXRGb3JtLmpzXCI6IDM1LFxuXHRcIi4vd2lraXNcIjogMjMsXG5cdFwiLi93aWtpcy9cIjogMjMsXG5cdFwiLi93aWtpcy9pbmRleFwiOiAyMyxcblx0XCIuL3dpa2lzL2luZGV4LmpzXCI6IDIzLFxuXHRcIi4vd2lraXMvdmlld1wiOiA1NCxcblx0XCIuL3dpa2lzL3ZpZXcuanNcIjogNTRcbn07XG5mdW5jdGlvbiB3ZWJwYWNrQ29udGV4dChyZXEpIHtcblx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18od2VicGFja0NvbnRleHRSZXNvbHZlKHJlcSkpO1xufTtcbmZ1bmN0aW9uIHdlYnBhY2tDb250ZXh0UmVzb2x2ZShyZXEpIHtcblx0dmFyIGlkID0gbWFwW3JlcV07XG5cdGlmKCEoaWQgKyAxKSkgLy8gY2hlY2sgZm9yIG51bWJlciBvciBzdHJpbmdcblx0XHR0aHJvdyBuZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiICsgcmVxICsgXCInLlwiKTtcblx0cmV0dXJuIGlkO1xufTtcbndlYnBhY2tDb250ZXh0LmtleXMgPSBmdW5jdGlvbiB3ZWJwYWNrQ29udGV4dEtleXMoKSB7XG5cdHJldHVybiBPYmplY3Qua2V5cyhtYXApO1xufTtcbndlYnBhY2tDb250ZXh0LnJlc29sdmUgPSB3ZWJwYWNrQ29udGV4dFJlc29sdmU7XG5tb2R1bGUuZXhwb3J0cyA9IHdlYnBhY2tDb250ZXh0O1xud2VicGFja0NvbnRleHQuaWQgPSA1ODtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3NvdXJjZXMvdmlld3MgXlxcLlxcLy4qJFxuLy8gbW9kdWxlIGlkID0gNThcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLyogIGFuc2lfdXAuanNcbiAqICBhdXRob3IgOiBEcnUgTmVsc29uXG4gKiAgbGljZW5zZSA6IE1JVFxuICogIGh0dHA6Ly9naXRodWIuY29tL2RydWRydS9hbnNpX3VwXG4gKi9cbihmdW5jdGlvbiAocm9vdCwgZmFjdG9yeSkge1xuICAgIGlmICh0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQpIHtcbiAgICAgICAgLy8gQU1ELiBSZWdpc3RlciBhcyBhbiBhbm9ueW1vdXMgbW9kdWxlLlxuICAgICAgICBkZWZpbmUoWydleHBvcnRzJ10sIGZhY3RvcnkpO1xuICAgIH0gZWxzZSBpZiAodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnICYmIHR5cGVvZiBleHBvcnRzLm5vZGVOYW1lICE9PSAnc3RyaW5nJykge1xuICAgICAgICAvLyBDb21tb25KU1xuICAgICAgICBmYWN0b3J5KGV4cG9ydHMpO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIC8vIEJyb3dzZXIgZ2xvYmFsc1xuICAgICAgICB2YXIgZXhwID0ge307XG4gICAgICAgIGZhY3RvcnkoZXhwKTtcbiAgICAgICAgcm9vdC5BbnNpVXAgPSBleHAuZGVmYXVsdDtcbiAgICB9XG59KHRoaXMsIGZ1bmN0aW9uIChleHBvcnRzKSB7XG5cInVzZSBzdHJpY3RcIjtcbnZhciBfX21ha2VUZW1wbGF0ZU9iamVjdCA9ICh0aGlzICYmIHRoaXMuX19tYWtlVGVtcGxhdGVPYmplY3QpIHx8IGZ1bmN0aW9uIChjb29rZWQsIHJhdykge1xuICAgIGlmIChPYmplY3QuZGVmaW5lUHJvcGVydHkpIHsgT2JqZWN0LmRlZmluZVByb3BlcnR5KGNvb2tlZCwgXCJyYXdcIiwgeyB2YWx1ZTogcmF3IH0pOyB9IGVsc2UgeyBjb29rZWQucmF3ID0gcmF3OyB9XG4gICAgcmV0dXJuIGNvb2tlZDtcbn07XG52YXIgUGFja2V0S2luZDtcbihmdW5jdGlvbiAoUGFja2V0S2luZCkge1xuICAgIFBhY2tldEtpbmRbUGFja2V0S2luZFtcIkVPU1wiXSA9IDBdID0gXCJFT1NcIjtcbiAgICBQYWNrZXRLaW5kW1BhY2tldEtpbmRbXCJUZXh0XCJdID0gMV0gPSBcIlRleHRcIjtcbiAgICBQYWNrZXRLaW5kW1BhY2tldEtpbmRbXCJJbmNvbXBsZXRlXCJdID0gMl0gPSBcIkluY29tcGxldGVcIjtcbiAgICBQYWNrZXRLaW5kW1BhY2tldEtpbmRbXCJFU0NcIl0gPSAzXSA9IFwiRVNDXCI7XG4gICAgUGFja2V0S2luZFtQYWNrZXRLaW5kW1wiVW5rbm93blwiXSA9IDRdID0gXCJVbmtub3duXCI7XG4gICAgUGFja2V0S2luZFtQYWNrZXRLaW5kW1wiU0dSXCJdID0gNV0gPSBcIlNHUlwiO1xuICAgIFBhY2tldEtpbmRbUGFja2V0S2luZFtcIk9TQ1VSTFwiXSA9IDZdID0gXCJPU0NVUkxcIjtcbn0pKFBhY2tldEtpbmQgfHwgKFBhY2tldEtpbmQgPSB7fSkpO1xudmFyIEFuc2lVcCA9IChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gQW5zaVVwKCkge1xuICAgICAgICB0aGlzLlZFUlNJT04gPSBcIjQuMC40XCI7XG4gICAgICAgIHRoaXMuc2V0dXBfcGFsZXR0ZXMoKTtcbiAgICAgICAgdGhpcy5fdXNlX2NsYXNzZXMgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5fZXNjYXBlX2Zvcl9odG1sID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5ib2xkID0gZmFsc2U7XG4gICAgICAgIHRoaXMuZmcgPSB0aGlzLmJnID0gbnVsbDtcbiAgICAgICAgdGhpcy5fYnVmZmVyID0gJyc7XG4gICAgICAgIHRoaXMuX3VybF93aGl0ZWxpc3QgPSB7ICdodHRwJzogMSwgJ2h0dHBzJzogMSB9O1xuICAgIH1cbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoQW5zaVVwLnByb3RvdHlwZSwgXCJ1c2VfY2xhc3Nlc1wiLCB7XG4gICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3VzZV9jbGFzc2VzO1xuICAgICAgICB9LFxuICAgICAgICBzZXQ6IGZ1bmN0aW9uIChhcmcpIHtcbiAgICAgICAgICAgIHRoaXMuX3VzZV9jbGFzc2VzID0gYXJnO1xuICAgICAgICB9LFxuICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgICAgICBjb25maWd1cmFibGU6IHRydWVcbiAgICB9KTtcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoQW5zaVVwLnByb3RvdHlwZSwgXCJlc2NhcGVfZm9yX2h0bWxcIiwge1xuICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9lc2NhcGVfZm9yX2h0bWw7XG4gICAgICAgIH0sXG4gICAgICAgIHNldDogZnVuY3Rpb24gKGFyZykge1xuICAgICAgICAgICAgdGhpcy5fZXNjYXBlX2Zvcl9odG1sID0gYXJnO1xuICAgICAgICB9LFxuICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgICAgICBjb25maWd1cmFibGU6IHRydWVcbiAgICB9KTtcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoQW5zaVVwLnByb3RvdHlwZSwgXCJ1cmxfd2hpdGVsaXN0XCIsIHtcbiAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fdXJsX3doaXRlbGlzdDtcbiAgICAgICAgfSxcbiAgICAgICAgc2V0OiBmdW5jdGlvbiAoYXJnKSB7XG4gICAgICAgICAgICB0aGlzLl91cmxfd2hpdGVsaXN0ID0gYXJnO1xuICAgICAgICB9LFxuICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgICAgICBjb25maWd1cmFibGU6IHRydWVcbiAgICB9KTtcbiAgICBBbnNpVXAucHJvdG90eXBlLnNldHVwX3BhbGV0dGVzID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgICB0aGlzLmFuc2lfY29sb3JzID1cbiAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgICAgIHsgcmdiOiBbMCwgMCwgMF0sIGNsYXNzX25hbWU6IFwiYW5zaS1ibGFja1wiIH0sXG4gICAgICAgICAgICAgICAgICAgIHsgcmdiOiBbMTg3LCAwLCAwXSwgY2xhc3NfbmFtZTogXCJhbnNpLXJlZFwiIH0sXG4gICAgICAgICAgICAgICAgICAgIHsgcmdiOiBbMCwgMTg3LCAwXSwgY2xhc3NfbmFtZTogXCJhbnNpLWdyZWVuXCIgfSxcbiAgICAgICAgICAgICAgICAgICAgeyByZ2I6IFsxODcsIDE4NywgMF0sIGNsYXNzX25hbWU6IFwiYW5zaS15ZWxsb3dcIiB9LFxuICAgICAgICAgICAgICAgICAgICB7IHJnYjogWzAsIDAsIDE4N10sIGNsYXNzX25hbWU6IFwiYW5zaS1ibHVlXCIgfSxcbiAgICAgICAgICAgICAgICAgICAgeyByZ2I6IFsxODcsIDAsIDE4N10sIGNsYXNzX25hbWU6IFwiYW5zaS1tYWdlbnRhXCIgfSxcbiAgICAgICAgICAgICAgICAgICAgeyByZ2I6IFswLCAxODcsIDE4N10sIGNsYXNzX25hbWU6IFwiYW5zaS1jeWFuXCIgfSxcbiAgICAgICAgICAgICAgICAgICAgeyByZ2I6IFsyNTUsIDI1NSwgMjU1XSwgY2xhc3NfbmFtZTogXCJhbnNpLXdoaXRlXCIgfVxuICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAgICAgICB7IHJnYjogWzg1LCA4NSwgODVdLCBjbGFzc19uYW1lOiBcImFuc2ktYnJpZ2h0LWJsYWNrXCIgfSxcbiAgICAgICAgICAgICAgICAgICAgeyByZ2I6IFsyNTUsIDg1LCA4NV0sIGNsYXNzX25hbWU6IFwiYW5zaS1icmlnaHQtcmVkXCIgfSxcbiAgICAgICAgICAgICAgICAgICAgeyByZ2I6IFswLCAyNTUsIDBdLCBjbGFzc19uYW1lOiBcImFuc2ktYnJpZ2h0LWdyZWVuXCIgfSxcbiAgICAgICAgICAgICAgICAgICAgeyByZ2I6IFsyNTUsIDI1NSwgODVdLCBjbGFzc19uYW1lOiBcImFuc2ktYnJpZ2h0LXllbGxvd1wiIH0sXG4gICAgICAgICAgICAgICAgICAgIHsgcmdiOiBbODUsIDg1LCAyNTVdLCBjbGFzc19uYW1lOiBcImFuc2ktYnJpZ2h0LWJsdWVcIiB9LFxuICAgICAgICAgICAgICAgICAgICB7IHJnYjogWzI1NSwgODUsIDI1NV0sIGNsYXNzX25hbWU6IFwiYW5zaS1icmlnaHQtbWFnZW50YVwiIH0sXG4gICAgICAgICAgICAgICAgICAgIHsgcmdiOiBbODUsIDI1NSwgMjU1XSwgY2xhc3NfbmFtZTogXCJhbnNpLWJyaWdodC1jeWFuXCIgfSxcbiAgICAgICAgICAgICAgICAgICAgeyByZ2I6IFsyNTUsIDI1NSwgMjU1XSwgY2xhc3NfbmFtZTogXCJhbnNpLWJyaWdodC13aGl0ZVwiIH1cbiAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICBdO1xuICAgICAgICB0aGlzLnBhbGV0dGVfMjU2ID0gW107XG4gICAgICAgIHRoaXMuYW5zaV9jb2xvcnMuZm9yRWFjaChmdW5jdGlvbiAocGFsZXR0ZSkge1xuICAgICAgICAgICAgcGFsZXR0ZS5mb3JFYWNoKGZ1bmN0aW9uIChyZWMpIHtcbiAgICAgICAgICAgICAgICBfdGhpcy5wYWxldHRlXzI1Ni5wdXNoKHJlYyk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgICAgIHZhciBsZXZlbHMgPSBbMCwgOTUsIDEzNSwgMTc1LCAyMTUsIDI1NV07XG4gICAgICAgIGZvciAodmFyIHIgPSAwOyByIDwgNjsgKytyKSB7XG4gICAgICAgICAgICBmb3IgKHZhciBnID0gMDsgZyA8IDY7ICsrZykge1xuICAgICAgICAgICAgICAgIGZvciAodmFyIGIgPSAwOyBiIDwgNjsgKytiKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBjb2wgPSB7IHJnYjogW2xldmVsc1tyXSwgbGV2ZWxzW2ddLCBsZXZlbHNbYl1dLCBjbGFzc19uYW1lOiAndHJ1ZWNvbG9yJyB9O1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnBhbGV0dGVfMjU2LnB1c2goY29sKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgdmFyIGdyZXlfbGV2ZWwgPSA4O1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IDI0OyArK2ksIGdyZXlfbGV2ZWwgKz0gMTApIHtcbiAgICAgICAgICAgIHZhciBncnkgPSB7IHJnYjogW2dyZXlfbGV2ZWwsIGdyZXlfbGV2ZWwsIGdyZXlfbGV2ZWxdLCBjbGFzc19uYW1lOiAndHJ1ZWNvbG9yJyB9O1xuICAgICAgICAgICAgdGhpcy5wYWxldHRlXzI1Ni5wdXNoKGdyeSk7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIEFuc2lVcC5wcm90b3R5cGUuZXNjYXBlX3R4dF9mb3JfaHRtbCA9IGZ1bmN0aW9uICh0eHQpIHtcbiAgICAgICAgcmV0dXJuIHR4dC5yZXBsYWNlKC9bJjw+XS9nbSwgZnVuY3Rpb24gKHN0cikge1xuICAgICAgICAgICAgaWYgKHN0ciA9PT0gXCImXCIpXG4gICAgICAgICAgICAgICAgcmV0dXJuIFwiJmFtcDtcIjtcbiAgICAgICAgICAgIGlmIChzdHIgPT09IFwiPFwiKVxuICAgICAgICAgICAgICAgIHJldHVybiBcIiZsdDtcIjtcbiAgICAgICAgICAgIGlmIChzdHIgPT09IFwiPlwiKVxuICAgICAgICAgICAgICAgIHJldHVybiBcIiZndDtcIjtcbiAgICAgICAgfSk7XG4gICAgfTtcbiAgICBBbnNpVXAucHJvdG90eXBlLmFwcGVuZF9idWZmZXIgPSBmdW5jdGlvbiAodHh0KSB7XG4gICAgICAgIHZhciBzdHIgPSB0aGlzLl9idWZmZXIgKyB0eHQ7XG4gICAgICAgIHRoaXMuX2J1ZmZlciA9IHN0cjtcbiAgICB9O1xuICAgIEFuc2lVcC5wcm90b3R5cGUuZ2V0X25leHRfcGFja2V0ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgcGt0ID0ge1xuICAgICAgICAgICAga2luZDogUGFja2V0S2luZC5FT1MsXG4gICAgICAgICAgICB0ZXh0OiAnJyxcbiAgICAgICAgICAgIHVybDogJydcbiAgICAgICAgfTtcbiAgICAgICAgdmFyIGxlbiA9IHRoaXMuX2J1ZmZlci5sZW5ndGg7XG4gICAgICAgIGlmIChsZW4gPT0gMClcbiAgICAgICAgICAgIHJldHVybiBwa3Q7XG4gICAgICAgIHZhciBwb3MgPSB0aGlzLl9idWZmZXIuaW5kZXhPZihcIlxceDFCXCIpO1xuICAgICAgICBpZiAocG9zID09IC0xKSB7XG4gICAgICAgICAgICBwa3Qua2luZCA9IFBhY2tldEtpbmQuVGV4dDtcbiAgICAgICAgICAgIHBrdC50ZXh0ID0gdGhpcy5fYnVmZmVyO1xuICAgICAgICAgICAgdGhpcy5fYnVmZmVyID0gJyc7XG4gICAgICAgICAgICByZXR1cm4gcGt0O1xuICAgICAgICB9XG4gICAgICAgIGlmIChwb3MgPiAwKSB7XG4gICAgICAgICAgICBwa3Qua2luZCA9IFBhY2tldEtpbmQuVGV4dDtcbiAgICAgICAgICAgIHBrdC50ZXh0ID0gdGhpcy5fYnVmZmVyLnNsaWNlKDAsIHBvcyk7XG4gICAgICAgICAgICB0aGlzLl9idWZmZXIgPSB0aGlzLl9idWZmZXIuc2xpY2UocG9zKTtcbiAgICAgICAgICAgIHJldHVybiBwa3Q7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHBvcyA9PSAwKSB7XG4gICAgICAgICAgICBpZiAobGVuID09IDEpIHtcbiAgICAgICAgICAgICAgICBwa3Qua2luZCA9IFBhY2tldEtpbmQuSW5jb21wbGV0ZTtcbiAgICAgICAgICAgICAgICByZXR1cm4gcGt0O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdmFyIG5leHRfY2hhciA9IHRoaXMuX2J1ZmZlci5jaGFyQXQoMSk7XG4gICAgICAgICAgICBpZiAoKG5leHRfY2hhciAhPSAnWycpICYmIChuZXh0X2NoYXIgIT0gJ10nKSkge1xuICAgICAgICAgICAgICAgIHBrdC5raW5kID0gUGFja2V0S2luZC5FU0M7XG4gICAgICAgICAgICAgICAgcGt0LnRleHQgPSB0aGlzLl9idWZmZXIuc2xpY2UoMCwgMSk7XG4gICAgICAgICAgICAgICAgdGhpcy5fYnVmZmVyID0gdGhpcy5fYnVmZmVyLnNsaWNlKDEpO1xuICAgICAgICAgICAgICAgIHJldHVybiBwa3Q7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAobmV4dF9jaGFyID09ICdbJykge1xuICAgICAgICAgICAgICAgIGlmICghdGhpcy5fY3NpX3JlZ2V4KSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2NzaV9yZWdleCA9IHJneChfX21ha2VUZW1wbGF0ZU9iamVjdChbXCJcXG4gICAgICAgICAgICAgICAgICAgICAgICBeICAgICAgICAgICAgICAgICAgICAgICAgICAgIyBiZWdpbm5pbmcgb2YgbGluZVxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAjXFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICMgRmlyc3QgYXR0ZW1wdFxcbiAgICAgICAgICAgICAgICAgICAgICAgICg/OiAgICAgICAgICAgICAgICAgICAgICAgICAjIGxlZ2FsIHNlcXVlbmNlXFxuICAgICAgICAgICAgICAgICAgICAgICAgICBcXHUwMDFCWyAgICAgICAgICAgICAgICAgICAgICAjIENTSVxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgKFs8LT9dPykgICAgICAgICAgICAgICMgcHJpdmF0ZS1tb2RlIGNoYXJcXG4gICAgICAgICAgICAgICAgICAgICAgICAgIChbZDtdKikgICAgICAgICAgICAgICAgICAgICMgYW55IGRpZ2l0cyBvciBzZW1pY29sb25zXFxuICAgICAgICAgICAgICAgICAgICAgICAgICAoWyAtL10/ICAgICAgICAgICAgICAgIyBhbiBpbnRlcm1lZGlhdGUgbW9kaWZpZXJcXG4gICAgICAgICAgICAgICAgICAgICAgICAgIFtALX5dKSAgICAgICAgICAgICAgICAjIHRoZSBjb21tYW5kXFxuICAgICAgICAgICAgICAgICAgICAgICAgKVxcbiAgICAgICAgICAgICAgICAgICAgICAgIHwgICAgICAgICAgICAgICAgICAgICAgICAgICAjIGFsdGVybmF0ZSAoc2Vjb25kIGF0dGVtcHQpXFxuICAgICAgICAgICAgICAgICAgICAgICAgKD86ICAgICAgICAgICAgICAgICAgICAgICAgICMgaWxsZWdhbCBzZXF1ZW5jZVxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgXFx1MDAxQlsgICAgICAgICAgICAgICAgICAgICAgIyBDU0lcXG4gICAgICAgICAgICAgICAgICAgICAgICAgIFsgLX5dKiAgICAgICAgICAgICAgICAjIGFueXRoaW5nIGxlZ2FsXFxuICAgICAgICAgICAgICAgICAgICAgICAgICAoW1xcMC1cXHUwMDFGOl0pICAgICAgICAgICAgICAjIGFueXRoaW5nIGlsbGVnYWxcXG4gICAgICAgICAgICAgICAgICAgICAgICApXFxuICAgICAgICAgICAgICAgICAgICBcIl0sIFtcIlxcbiAgICAgICAgICAgICAgICAgICAgICAgIF4gICAgICAgICAgICAgICAgICAgICAgICAgICAjIGJlZ2lubmluZyBvZiBsaW5lXFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICNcXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIyBGaXJzdCBhdHRlbXB0XFxuICAgICAgICAgICAgICAgICAgICAgICAgKD86ICAgICAgICAgICAgICAgICAgICAgICAgICMgbGVnYWwgc2VxdWVuY2VcXG4gICAgICAgICAgICAgICAgICAgICAgICAgIFxcXFx4MWJcXFxcWyAgICAgICAgICAgICAgICAgICAgICAjIENTSVxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgKFtcXFxceDNjLVxcXFx4M2ZdPykgICAgICAgICAgICAgICMgcHJpdmF0ZS1tb2RlIGNoYXJcXG4gICAgICAgICAgICAgICAgICAgICAgICAgIChbXFxcXGQ7XSopICAgICAgICAgICAgICAgICAgICAjIGFueSBkaWdpdHMgb3Igc2VtaWNvbG9uc1xcbiAgICAgICAgICAgICAgICAgICAgICAgICAgKFtcXFxceDIwLVxcXFx4MmZdPyAgICAgICAgICAgICAgICMgYW4gaW50ZXJtZWRpYXRlIG1vZGlmaWVyXFxuICAgICAgICAgICAgICAgICAgICAgICAgICBbXFxcXHg0MC1cXFxceDdlXSkgICAgICAgICAgICAgICAgIyB0aGUgY29tbWFuZFxcbiAgICAgICAgICAgICAgICAgICAgICAgIClcXG4gICAgICAgICAgICAgICAgICAgICAgICB8ICAgICAgICAgICAgICAgICAgICAgICAgICAgIyBhbHRlcm5hdGUgKHNlY29uZCBhdHRlbXB0KVxcbiAgICAgICAgICAgICAgICAgICAgICAgICg/OiAgICAgICAgICAgICAgICAgICAgICAgICAjIGlsbGVnYWwgc2VxdWVuY2VcXG4gICAgICAgICAgICAgICAgICAgICAgICAgIFxcXFx4MWJcXFxcWyAgICAgICAgICAgICAgICAgICAgICAjIENTSVxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgW1xcXFx4MjAtXFxcXHg3ZV0qICAgICAgICAgICAgICAgICMgYW55dGhpbmcgbGVnYWxcXG4gICAgICAgICAgICAgICAgICAgICAgICAgIChbXFxcXHgwMC1cXFxceDFmOl0pICAgICAgICAgICAgICAjIGFueXRoaW5nIGlsbGVnYWxcXG4gICAgICAgICAgICAgICAgICAgICAgICApXFxuICAgICAgICAgICAgICAgICAgICBcIl0pKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdmFyIG1hdGNoID0gdGhpcy5fYnVmZmVyLm1hdGNoKHRoaXMuX2NzaV9yZWdleCk7XG4gICAgICAgICAgICAgICAgaWYgKG1hdGNoID09PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgICAgIHBrdC5raW5kID0gUGFja2V0S2luZC5JbmNvbXBsZXRlO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcGt0O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAobWF0Y2hbNF0pIHtcbiAgICAgICAgICAgICAgICAgICAgcGt0LmtpbmQgPSBQYWNrZXRLaW5kLkVTQztcbiAgICAgICAgICAgICAgICAgICAgcGt0LnRleHQgPSB0aGlzLl9idWZmZXIuc2xpY2UoMCwgMSk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2J1ZmZlciA9IHRoaXMuX2J1ZmZlci5zbGljZSgxKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHBrdDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKChtYXRjaFsxXSAhPSAnJykgfHwgKG1hdGNoWzNdICE9ICdtJykpXG4gICAgICAgICAgICAgICAgICAgIHBrdC5raW5kID0gUGFja2V0S2luZC5Vbmtub3duO1xuICAgICAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICAgICAgcGt0LmtpbmQgPSBQYWNrZXRLaW5kLlNHUjtcbiAgICAgICAgICAgICAgICBwa3QudGV4dCA9IG1hdGNoWzJdO1xuICAgICAgICAgICAgICAgIHZhciBycG9zID0gbWF0Y2hbMF0ubGVuZ3RoO1xuICAgICAgICAgICAgICAgIHRoaXMuX2J1ZmZlciA9IHRoaXMuX2J1ZmZlci5zbGljZShycG9zKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gcGt0O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKG5leHRfY2hhciA9PSAnXScpIHtcbiAgICAgICAgICAgICAgICBpZiAobGVuIDwgNCkge1xuICAgICAgICAgICAgICAgICAgICBwa3Qua2luZCA9IFBhY2tldEtpbmQuSW5jb21wbGV0ZTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHBrdDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKCh0aGlzLl9idWZmZXIuY2hhckF0KDIpICE9ICc4JylcbiAgICAgICAgICAgICAgICAgICAgfHwgKHRoaXMuX2J1ZmZlci5jaGFyQXQoMykgIT0gJzsnKSkge1xuICAgICAgICAgICAgICAgICAgICBwa3Qua2luZCA9IFBhY2tldEtpbmQuRVNDO1xuICAgICAgICAgICAgICAgICAgICBwa3QudGV4dCA9IHRoaXMuX2J1ZmZlci5zbGljZSgwLCAxKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fYnVmZmVyID0gdGhpcy5fYnVmZmVyLnNsaWNlKDEpO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcGt0O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAoIXRoaXMuX29zY19zdCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9vc2Nfc3QgPSByZ3hHKF9fbWFrZVRlbXBsYXRlT2JqZWN0KFtcIlxcbiAgICAgICAgICAgICAgICAgICAgICAgICg/OiAgICAgICAgICAgICAgICAgICAgICAgICAjIGxlZ2FsIHNlcXVlbmNlXFxuICAgICAgICAgICAgICAgICAgICAgICAgICAoXFx1MDAxQlxcXFwpICAgICAgICAgICAgICAgICAgICAjIEVTQyAgICAgICAgICAgICAgICAgICAgICAgICAgIHwgICAgICAgICAgICAgICAgICAgICAgICAgICAjIGFsdGVybmF0ZVxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgKFxcdTAwMDcpICAgICAgICAgICAgICAgICAgICAgICMgQkVMICh3aGF0IHh0ZXJtIGRpZClcXG4gICAgICAgICAgICAgICAgICAgICAgICApXFxuICAgICAgICAgICAgICAgICAgICAgICAgfCAgICAgICAgICAgICAgICAgICAgICAgICAgICMgYWx0ZXJuYXRlIChzZWNvbmQgYXR0ZW1wdClcXG4gICAgICAgICAgICAgICAgICAgICAgICAoICAgICAgICAgICAgICAgICAgICAgICAgICAgIyBpbGxlZ2FsIHNlcXVlbmNlXFxuICAgICAgICAgICAgICAgICAgICAgICAgICBbXFwwLVxcdTAwMDZdICAgICAgICAgICAgICAgICAjIGFueXRoaW5nIGlsbGVnYWxcXG4gICAgICAgICAgICAgICAgICAgICAgICAgIHwgICAgICAgICAgICAgICAgICAgICAgICAgICAjIGFsdGVybmF0ZVxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgW1xcYi1cXHUwMDFBXSAgICAgICAgICAgICAgICAgIyBhbnl0aGluZyBpbGxlZ2FsXFxuICAgICAgICAgICAgICAgICAgICAgICAgICB8ICAgICAgICAgICAgICAgICAgICAgICAgICAgIyBhbHRlcm5hdGVcXG4gICAgICAgICAgICAgICAgICAgICAgICAgIFtcXHUwMDFDLVxcdTAwMUZdICAgICAgICAgICAgICAgICAjIGFueXRoaW5nIGlsbGVnYWxcXG4gICAgICAgICAgICAgICAgICAgICAgICApXFxuICAgICAgICAgICAgICAgICAgICBcIl0sIFtcIlxcbiAgICAgICAgICAgICAgICAgICAgICAgICg/OiAgICAgICAgICAgICAgICAgICAgICAgICAjIGxlZ2FsIHNlcXVlbmNlXFxuICAgICAgICAgICAgICAgICAgICAgICAgICAoXFxcXHgxYlxcXFxcXFxcKSAgICAgICAgICAgICAgICAgICAgIyBFU0MgXFxcXFxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgfCAgICAgICAgICAgICAgICAgICAgICAgICAgICMgYWx0ZXJuYXRlXFxuICAgICAgICAgICAgICAgICAgICAgICAgICAoXFxcXHgwNykgICAgICAgICAgICAgICAgICAgICAgIyBCRUwgKHdoYXQgeHRlcm0gZGlkKVxcbiAgICAgICAgICAgICAgICAgICAgICAgIClcXG4gICAgICAgICAgICAgICAgICAgICAgICB8ICAgICAgICAgICAgICAgICAgICAgICAgICAgIyBhbHRlcm5hdGUgKHNlY29uZCBhdHRlbXB0KVxcbiAgICAgICAgICAgICAgICAgICAgICAgICggICAgICAgICAgICAgICAgICAgICAgICAgICAjIGlsbGVnYWwgc2VxdWVuY2VcXG4gICAgICAgICAgICAgICAgICAgICAgICAgIFtcXFxceDAwLVxcXFx4MDZdICAgICAgICAgICAgICAgICAjIGFueXRoaW5nIGlsbGVnYWxcXG4gICAgICAgICAgICAgICAgICAgICAgICAgIHwgICAgICAgICAgICAgICAgICAgICAgICAgICAjIGFsdGVybmF0ZVxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgW1xcXFx4MDgtXFxcXHgxYV0gICAgICAgICAgICAgICAgICMgYW55dGhpbmcgaWxsZWdhbFxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgfCAgICAgICAgICAgICAgICAgICAgICAgICAgICMgYWx0ZXJuYXRlXFxuICAgICAgICAgICAgICAgICAgICAgICAgICBbXFxcXHgxYy1cXFxceDFmXSAgICAgICAgICAgICAgICAgIyBhbnl0aGluZyBpbGxlZ2FsXFxuICAgICAgICAgICAgICAgICAgICAgICAgKVxcbiAgICAgICAgICAgICAgICAgICAgXCJdKSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHRoaXMuX29zY19zdC5sYXN0SW5kZXggPSAwO1xuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIG1hdGNoXzEgPSB0aGlzLl9vc2Nfc3QuZXhlYyh0aGlzLl9idWZmZXIpO1xuICAgICAgICAgICAgICAgICAgICBpZiAobWF0Y2hfMSA9PT0gbnVsbCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcGt0LmtpbmQgPSBQYWNrZXRLaW5kLkluY29tcGxldGU7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gcGt0O1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGlmIChtYXRjaF8xWzNdKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBwa3Qua2luZCA9IFBhY2tldEtpbmQuRVNDO1xuICAgICAgICAgICAgICAgICAgICAgICAgcGt0LnRleHQgPSB0aGlzLl9idWZmZXIuc2xpY2UoMCwgMSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9idWZmZXIgPSB0aGlzLl9idWZmZXIuc2xpY2UoMSk7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gcGt0O1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIG1hdGNoXzIgPSB0aGlzLl9vc2Nfc3QuZXhlYyh0aGlzLl9idWZmZXIpO1xuICAgICAgICAgICAgICAgICAgICBpZiAobWF0Y2hfMiA9PT0gbnVsbCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcGt0LmtpbmQgPSBQYWNrZXRLaW5kLkluY29tcGxldGU7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gcGt0O1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGlmIChtYXRjaF8yWzNdKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBwa3Qua2luZCA9IFBhY2tldEtpbmQuRVNDO1xuICAgICAgICAgICAgICAgICAgICAgICAgcGt0LnRleHQgPSB0aGlzLl9idWZmZXIuc2xpY2UoMCwgMSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9idWZmZXIgPSB0aGlzLl9idWZmZXIuc2xpY2UoMSk7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gcGt0O1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmICghdGhpcy5fb3NjX3JlZ2V4KSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX29zY19yZWdleCA9IHJneChfX21ha2VUZW1wbGF0ZU9iamVjdChbXCJcXG4gICAgICAgICAgICAgICAgICAgICAgICBeICAgICAgICAgICAgICAgICAgICAgICAgICAgIyBiZWdpbm5pbmcgb2YgbGluZVxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAjXFxuICAgICAgICAgICAgICAgICAgICAgICAgXFx1MDAxQl04OyAgICAgICAgICAgICAgICAgICAgIyBPU0MgSHlwZXJsaW5rXFxuICAgICAgICAgICAgICAgICAgICAgICAgWyAtOjwtfl0qICAgICAgICMgcGFyYW1zIChleGNsdWRpbmcgOylcXG4gICAgICAgICAgICAgICAgICAgICAgICA7ICAgICAgICAgICAgICAgICAgICAgICAgICAgIyBlbmQgb2YgcGFyYW1zXFxuICAgICAgICAgICAgICAgICAgICAgICAgKFshLX5dezAsNTEyfSkgICAgICAgICMgVVJMIGNhcHR1cmVcXG4gICAgICAgICAgICAgICAgICAgICAgICAoPzogICAgICAgICAgICAgICAgICAgICAgICAgIyBTVFxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgKD86XFx1MDAxQlxcXFwpICAgICAgICAgICAgICAgICAgIyBFU0MgICAgICAgICAgICAgICAgICAgICAgICAgICB8ICAgICAgICAgICAgICAgICAgICAgICAgICAgIyBhbHRlcm5hdGVcXG4gICAgICAgICAgICAgICAgICAgICAgICAgICg/OlxcdTAwMDcpICAgICAgICAgICAgICAgICAgICAjIEJFTCAod2hhdCB4dGVybSBkaWQpXFxuICAgICAgICAgICAgICAgICAgICAgICAgKVxcbiAgICAgICAgICAgICAgICAgICAgICAgIChbIS1+XSspICAgICAgICAgICAgICAjIFRFWFQgY2FwdHVyZVxcbiAgICAgICAgICAgICAgICAgICAgICAgIFxcdTAwMUJdODs7ICAgICAgICAgICAgICAgICAgICMgT1NDIEh5cGVybGluayBFbmRcXG4gICAgICAgICAgICAgICAgICAgICAgICAoPzogICAgICAgICAgICAgICAgICAgICAgICAgIyBTVFxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgKD86XFx1MDAxQlxcXFwpICAgICAgICAgICAgICAgICAgIyBFU0MgICAgICAgICAgICAgICAgICAgICAgICAgICB8ICAgICAgICAgICAgICAgICAgICAgICAgICAgIyBhbHRlcm5hdGVcXG4gICAgICAgICAgICAgICAgICAgICAgICAgICg/OlxcdTAwMDcpICAgICAgICAgICAgICAgICAgICAjIEJFTCAod2hhdCB4dGVybSBkaWQpXFxuICAgICAgICAgICAgICAgICAgICAgICAgKVxcbiAgICAgICAgICAgICAgICAgICAgXCJdLCBbXCJcXG4gICAgICAgICAgICAgICAgICAgICAgICBeICAgICAgICAgICAgICAgICAgICAgICAgICAgIyBiZWdpbm5pbmcgb2YgbGluZVxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAjXFxuICAgICAgICAgICAgICAgICAgICAgICAgXFxcXHgxYlxcXFxdODsgICAgICAgICAgICAgICAgICAgICMgT1NDIEh5cGVybGlua1xcbiAgICAgICAgICAgICAgICAgICAgICAgIFtcXFxceDIwLVxcXFx4M2FcXFxceDNjLVxcXFx4N2VdKiAgICAgICAjIHBhcmFtcyAoZXhjbHVkaW5nIDspXFxuICAgICAgICAgICAgICAgICAgICAgICAgOyAgICAgICAgICAgICAgICAgICAgICAgICAgICMgZW5kIG9mIHBhcmFtc1xcbiAgICAgICAgICAgICAgICAgICAgICAgIChbXFxcXHgyMS1cXFxceDdlXXswLDUxMn0pICAgICAgICAjIFVSTCBjYXB0dXJlXFxuICAgICAgICAgICAgICAgICAgICAgICAgKD86ICAgICAgICAgICAgICAgICAgICAgICAgICMgU1RcXG4gICAgICAgICAgICAgICAgICAgICAgICAgICg/OlxcXFx4MWJcXFxcXFxcXCkgICAgICAgICAgICAgICAgICAjIEVTQyBcXFxcXFxuICAgICAgICAgICAgICAgICAgICAgICAgICB8ICAgICAgICAgICAgICAgICAgICAgICAgICAgIyBhbHRlcm5hdGVcXG4gICAgICAgICAgICAgICAgICAgICAgICAgICg/OlxcXFx4MDcpICAgICAgICAgICAgICAgICAgICAjIEJFTCAod2hhdCB4dGVybSBkaWQpXFxuICAgICAgICAgICAgICAgICAgICAgICAgKVxcbiAgICAgICAgICAgICAgICAgICAgICAgIChbXFxcXHgyMS1cXFxceDdlXSspICAgICAgICAgICAgICAjIFRFWFQgY2FwdHVyZVxcbiAgICAgICAgICAgICAgICAgICAgICAgIFxcXFx4MWJcXFxcXTg7OyAgICAgICAgICAgICAgICAgICAjIE9TQyBIeXBlcmxpbmsgRW5kXFxuICAgICAgICAgICAgICAgICAgICAgICAgKD86ICAgICAgICAgICAgICAgICAgICAgICAgICMgU1RcXG4gICAgICAgICAgICAgICAgICAgICAgICAgICg/OlxcXFx4MWJcXFxcXFxcXCkgICAgICAgICAgICAgICAgICAjIEVTQyBcXFxcXFxuICAgICAgICAgICAgICAgICAgICAgICAgICB8ICAgICAgICAgICAgICAgICAgICAgICAgICAgIyBhbHRlcm5hdGVcXG4gICAgICAgICAgICAgICAgICAgICAgICAgICg/OlxcXFx4MDcpICAgICAgICAgICAgICAgICAgICAjIEJFTCAod2hhdCB4dGVybSBkaWQpXFxuICAgICAgICAgICAgICAgICAgICAgICAgKVxcbiAgICAgICAgICAgICAgICAgICAgXCJdKSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHZhciBtYXRjaCA9IHRoaXMuX2J1ZmZlci5tYXRjaCh0aGlzLl9vc2NfcmVnZXgpO1xuICAgICAgICAgICAgICAgIGlmIChtYXRjaCA9PT0gbnVsbCkge1xuICAgICAgICAgICAgICAgICAgICBwa3Qua2luZCA9IFBhY2tldEtpbmQuRVNDO1xuICAgICAgICAgICAgICAgICAgICBwa3QudGV4dCA9IHRoaXMuX2J1ZmZlci5zbGljZSgwLCAxKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fYnVmZmVyID0gdGhpcy5fYnVmZmVyLnNsaWNlKDEpO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcGt0O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBwa3Qua2luZCA9IFBhY2tldEtpbmQuT1NDVVJMO1xuICAgICAgICAgICAgICAgIHBrdC51cmwgPSBtYXRjaFsxXTtcbiAgICAgICAgICAgICAgICBwa3QudGV4dCA9IG1hdGNoWzJdO1xuICAgICAgICAgICAgICAgIHZhciBycG9zID0gbWF0Y2hbMF0ubGVuZ3RoO1xuICAgICAgICAgICAgICAgIHRoaXMuX2J1ZmZlciA9IHRoaXMuX2J1ZmZlci5zbGljZShycG9zKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gcGt0O1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfTtcbiAgICBBbnNpVXAucHJvdG90eXBlLmFuc2lfdG9faHRtbCA9IGZ1bmN0aW9uICh0eHQpIHtcbiAgICAgICAgdGhpcy5hcHBlbmRfYnVmZmVyKHR4dCk7XG4gICAgICAgIHZhciBibG9ja3MgPSBbXTtcbiAgICAgICAgd2hpbGUgKHRydWUpIHtcbiAgICAgICAgICAgIHZhciBwYWNrZXQgPSB0aGlzLmdldF9uZXh0X3BhY2tldCgpO1xuICAgICAgICAgICAgaWYgKChwYWNrZXQua2luZCA9PSBQYWNrZXRLaW5kLkVPUylcbiAgICAgICAgICAgICAgICB8fCAocGFja2V0LmtpbmQgPT0gUGFja2V0S2luZC5JbmNvbXBsZXRlKSlcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGlmICgocGFja2V0LmtpbmQgPT0gUGFja2V0S2luZC5FU0MpXG4gICAgICAgICAgICAgICAgfHwgKHBhY2tldC5raW5kID09IFBhY2tldEtpbmQuVW5rbm93bikpXG4gICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICBpZiAocGFja2V0LmtpbmQgPT0gUGFja2V0S2luZC5UZXh0KVxuICAgICAgICAgICAgICAgIGJsb2Nrcy5wdXNoKHRoaXMudHJhbnNmb3JtX3RvX2h0bWwodGhpcy53aXRoX3N0YXRlKHBhY2tldCkpKTtcbiAgICAgICAgICAgIGVsc2UgaWYgKHBhY2tldC5raW5kID09IFBhY2tldEtpbmQuU0dSKVxuICAgICAgICAgICAgICAgIHRoaXMucHJvY2Vzc19hbnNpKHBhY2tldCk7XG4gICAgICAgICAgICBlbHNlIGlmIChwYWNrZXQua2luZCA9PSBQYWNrZXRLaW5kLk9TQ1VSTClcbiAgICAgICAgICAgICAgICBibG9ja3MucHVzaCh0aGlzLnByb2Nlc3NfaHlwZXJsaW5rKHBhY2tldCkpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBibG9ja3Muam9pbihcIlwiKTtcbiAgICB9O1xuICAgIEFuc2lVcC5wcm90b3R5cGUud2l0aF9zdGF0ZSA9IGZ1bmN0aW9uIChwa3QpIHtcbiAgICAgICAgcmV0dXJuIHsgYm9sZDogdGhpcy5ib2xkLCBmZzogdGhpcy5mZywgYmc6IHRoaXMuYmcsIHRleHQ6IHBrdC50ZXh0IH07XG4gICAgfTtcbiAgICBBbnNpVXAucHJvdG90eXBlLnByb2Nlc3NfYW5zaSA9IGZ1bmN0aW9uIChwa3QpIHtcbiAgICAgICAgdmFyIHNncl9jbWRzID0gcGt0LnRleHQuc3BsaXQoJzsnKTtcbiAgICAgICAgd2hpbGUgKHNncl9jbWRzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIHZhciBzZ3JfY21kX3N0ciA9IHNncl9jbWRzLnNoaWZ0KCk7XG4gICAgICAgICAgICB2YXIgbnVtID0gcGFyc2VJbnQoc2dyX2NtZF9zdHIsIDEwKTtcbiAgICAgICAgICAgIGlmIChpc05hTihudW0pIHx8IG51bSA9PT0gMCkge1xuICAgICAgICAgICAgICAgIHRoaXMuZmcgPSB0aGlzLmJnID0gbnVsbDtcbiAgICAgICAgICAgICAgICB0aGlzLmJvbGQgPSBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKG51bSA9PT0gMSkge1xuICAgICAgICAgICAgICAgIHRoaXMuYm9sZCA9IHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmIChudW0gPT09IDIyKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5ib2xkID0gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmIChudW0gPT09IDM5KSB7XG4gICAgICAgICAgICAgICAgdGhpcy5mZyA9IG51bGw7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmIChudW0gPT09IDQ5KSB7XG4gICAgICAgICAgICAgICAgdGhpcy5iZyA9IG51bGw7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmICgobnVtID49IDMwKSAmJiAobnVtIDwgMzgpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5mZyA9IHRoaXMuYW5zaV9jb2xvcnNbMF1bKG51bSAtIDMwKV07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmICgobnVtID49IDQwKSAmJiAobnVtIDwgNDgpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5iZyA9IHRoaXMuYW5zaV9jb2xvcnNbMF1bKG51bSAtIDQwKV07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmICgobnVtID49IDkwKSAmJiAobnVtIDwgOTgpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5mZyA9IHRoaXMuYW5zaV9jb2xvcnNbMV1bKG51bSAtIDkwKV07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmICgobnVtID49IDEwMCkgJiYgKG51bSA8IDEwOCkpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmJnID0gdGhpcy5hbnNpX2NvbG9yc1sxXVsobnVtIC0gMTAwKV07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmIChudW0gPT09IDM4IHx8IG51bSA9PT0gNDgpIHtcbiAgICAgICAgICAgICAgICBpZiAoc2dyX2NtZHMubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgaXNfZm9yZWdyb3VuZCA9IChudW0gPT09IDM4KTtcbiAgICAgICAgICAgICAgICAgICAgdmFyIG1vZGVfY21kID0gc2dyX2NtZHMuc2hpZnQoKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKG1vZGVfY21kID09PSAnNScgJiYgc2dyX2NtZHMubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHBhbGV0dGVfaW5kZXggPSBwYXJzZUludChzZ3JfY21kcy5zaGlmdCgpLCAxMCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAocGFsZXR0ZV9pbmRleCA+PSAwICYmIHBhbGV0dGVfaW5kZXggPD0gMjU1KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGlzX2ZvcmVncm91bmQpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZmcgPSB0aGlzLnBhbGV0dGVfMjU2W3BhbGV0dGVfaW5kZXhdO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5iZyA9IHRoaXMucGFsZXR0ZV8yNTZbcGFsZXR0ZV9pbmRleF07XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgaWYgKG1vZGVfY21kID09PSAnMicgJiYgc2dyX2NtZHMubGVuZ3RoID4gMikge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHIgPSBwYXJzZUludChzZ3JfY21kcy5zaGlmdCgpLCAxMCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgZyA9IHBhcnNlSW50KHNncl9jbWRzLnNoaWZ0KCksIDEwKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBiID0gcGFyc2VJbnQoc2dyX2NtZHMuc2hpZnQoKSwgMTApO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKChyID49IDAgJiYgciA8PSAyNTUpICYmIChnID49IDAgJiYgZyA8PSAyNTUpICYmIChiID49IDAgJiYgYiA8PSAyNTUpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGMgPSB7IHJnYjogW3IsIGcsIGJdLCBjbGFzc19uYW1lOiAndHJ1ZWNvbG9yJyB9O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpc19mb3JlZ3JvdW5kKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmZnID0gYztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuYmcgPSBjO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfTtcbiAgICBBbnNpVXAucHJvdG90eXBlLnRyYW5zZm9ybV90b19odG1sID0gZnVuY3Rpb24gKGZyYWdtZW50KSB7XG4gICAgICAgIHZhciB0eHQgPSBmcmFnbWVudC50ZXh0O1xuICAgICAgICBpZiAodHh0Lmxlbmd0aCA9PT0gMClcbiAgICAgICAgICAgIHJldHVybiB0eHQ7XG4gICAgICAgIGlmICh0aGlzLl9lc2NhcGVfZm9yX2h0bWwpXG4gICAgICAgICAgICB0eHQgPSB0aGlzLmVzY2FwZV90eHRfZm9yX2h0bWwodHh0KTtcbiAgICAgICAgaWYgKCFmcmFnbWVudC5ib2xkICYmIGZyYWdtZW50LmZnID09PSBudWxsICYmIGZyYWdtZW50LmJnID09PSBudWxsKVxuICAgICAgICAgICAgcmV0dXJuIHR4dDtcbiAgICAgICAgdmFyIHN0eWxlcyA9IFtdO1xuICAgICAgICB2YXIgY2xhc3NlcyA9IFtdO1xuICAgICAgICB2YXIgZmcgPSBmcmFnbWVudC5mZztcbiAgICAgICAgdmFyIGJnID0gZnJhZ21lbnQuYmc7XG4gICAgICAgIGlmIChmcmFnbWVudC5ib2xkKVxuICAgICAgICAgICAgc3R5bGVzLnB1c2goJ2ZvbnQtd2VpZ2h0OmJvbGQnKTtcbiAgICAgICAgaWYgKCF0aGlzLl91c2VfY2xhc3Nlcykge1xuICAgICAgICAgICAgaWYgKGZnKVxuICAgICAgICAgICAgICAgIHN0eWxlcy5wdXNoKFwiY29sb3I6cmdiKFwiICsgZmcucmdiLmpvaW4oJywnKSArIFwiKVwiKTtcbiAgICAgICAgICAgIGlmIChiZylcbiAgICAgICAgICAgICAgICBzdHlsZXMucHVzaChcImJhY2tncm91bmQtY29sb3I6cmdiKFwiICsgYmcucmdiICsgXCIpXCIpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgaWYgKGZnKSB7XG4gICAgICAgICAgICAgICAgaWYgKGZnLmNsYXNzX25hbWUgIT09ICd0cnVlY29sb3InKSB7XG4gICAgICAgICAgICAgICAgICAgIGNsYXNzZXMucHVzaChmZy5jbGFzc19uYW1lICsgXCItZmdcIik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBzdHlsZXMucHVzaChcImNvbG9yOnJnYihcIiArIGZnLnJnYi5qb2luKCcsJykgKyBcIilcIik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGJnKSB7XG4gICAgICAgICAgICAgICAgaWYgKGJnLmNsYXNzX25hbWUgIT09ICd0cnVlY29sb3InKSB7XG4gICAgICAgICAgICAgICAgICAgIGNsYXNzZXMucHVzaChiZy5jbGFzc19uYW1lICsgXCItYmdcIik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBzdHlsZXMucHVzaChcImJhY2tncm91bmQtY29sb3I6cmdiKFwiICsgYmcucmdiLmpvaW4oJywnKSArIFwiKVwiKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgdmFyIGNsYXNzX3N0cmluZyA9ICcnO1xuICAgICAgICB2YXIgc3R5bGVfc3RyaW5nID0gJyc7XG4gICAgICAgIGlmIChjbGFzc2VzLmxlbmd0aClcbiAgICAgICAgICAgIGNsYXNzX3N0cmluZyA9IFwiIGNsYXNzPVxcXCJcIiArIGNsYXNzZXMuam9pbignICcpICsgXCJcXFwiXCI7XG4gICAgICAgIGlmIChzdHlsZXMubGVuZ3RoKVxuICAgICAgICAgICAgc3R5bGVfc3RyaW5nID0gXCIgc3R5bGU9XFxcIlwiICsgc3R5bGVzLmpvaW4oJzsnKSArIFwiXFxcIlwiO1xuICAgICAgICByZXR1cm4gXCI8c3BhblwiICsgc3R5bGVfc3RyaW5nICsgY2xhc3Nfc3RyaW5nICsgXCI+XCIgKyB0eHQgKyBcIjwvc3Bhbj5cIjtcbiAgICB9O1xuICAgIDtcbiAgICBBbnNpVXAucHJvdG90eXBlLnByb2Nlc3NfaHlwZXJsaW5rID0gZnVuY3Rpb24gKHBrdCkge1xuICAgICAgICB2YXIgcGFydHMgPSBwa3QudXJsLnNwbGl0KCc6Jyk7XG4gICAgICAgIGlmIChwYXJ0cy5sZW5ndGggPCAxKVxuICAgICAgICAgICAgcmV0dXJuICcnO1xuICAgICAgICBpZiAoIXRoaXMuX3VybF93aGl0ZWxpc3RbcGFydHNbMF1dKVxuICAgICAgICAgICAgcmV0dXJuICcnO1xuICAgICAgICB2YXIgcmVzdWx0ID0gXCI8YSBocmVmPVxcXCJcIiArIHRoaXMuZXNjYXBlX3R4dF9mb3JfaHRtbChwa3QudXJsKSArIFwiXFxcIj5cIiArIHRoaXMuZXNjYXBlX3R4dF9mb3JfaHRtbChwa3QudGV4dCkgKyBcIjwvYT5cIjtcbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9O1xuICAgIHJldHVybiBBbnNpVXA7XG59KCkpO1xuZnVuY3Rpb24gcmd4KHRtcGxPYmopIHtcbiAgICB2YXIgc3Vic3QgPSBbXTtcbiAgICBmb3IgKHZhciBfaSA9IDE7IF9pIDwgYXJndW1lbnRzLmxlbmd0aDsgX2krKykge1xuICAgICAgICBzdWJzdFtfaSAtIDFdID0gYXJndW1lbnRzW19pXTtcbiAgICB9XG4gICAgdmFyIHJlZ2V4VGV4dCA9IHRtcGxPYmoucmF3WzBdO1xuICAgIHZhciB3c3JneCA9IC9eXFxzK3xcXHMrXFxufFxccyojW1xcc1xcU10qP1xcbnxcXG4vZ207XG4gICAgdmFyIHR4dDIgPSByZWdleFRleHQucmVwbGFjZSh3c3JneCwgJycpO1xuICAgIHJldHVybiBuZXcgUmVnRXhwKHR4dDIpO1xufVxuZnVuY3Rpb24gcmd4Ryh0bXBsT2JqKSB7XG4gICAgdmFyIHN1YnN0ID0gW107XG4gICAgZm9yICh2YXIgX2kgPSAxOyBfaSA8IGFyZ3VtZW50cy5sZW5ndGg7IF9pKyspIHtcbiAgICAgICAgc3Vic3RbX2kgLSAxXSA9IGFyZ3VtZW50c1tfaV07XG4gICAgfVxuICAgIHZhciByZWdleFRleHQgPSB0bXBsT2JqLnJhd1swXTtcbiAgICB2YXIgd3NyZ3ggPSAvXlxccyt8XFxzK1xcbnxcXHMqI1tcXHNcXFNdKj9cXG58XFxuL2dtO1xuICAgIHZhciB0eHQyID0gcmVnZXhUZXh0LnJlcGxhY2Uod3NyZ3gsICcnKTtcbiAgICByZXR1cm4gbmV3IFJlZ0V4cCh0eHQyLCAnZycpO1xufVxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9YW5zaV91cC5qcy5tYXBcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG4gICAgZXhwb3J0cy5kZWZhdWx0ID0gQW5zaVVwO1xufSkpO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vbm9kZV9tb2R1bGVzL2Fuc2lfdXAvYW5zaV91cC5qcyIsImltcG9ydCB7IFNlcnZpY2UgfSBmcm9tIFwiLi4vY29tbW9uL2FwaVwiO1xuXG5jb25zdCBCQVNFX1VSTCA9IFwiL3plcm9ib3QvYWRtaW4vYWN0b3JzL2FsZXJ0YVwiO1xuXG5jbGFzcyBBbGVydHNTZXJ2aWNlIGV4dGVuZHMgU2VydmljZSB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHN1cGVyKEJBU0VfVVJMKTtcbiAgICB9XG5cbiAgICBsaXN0KCkge1xuICAgICAgICByZXR1cm4gdGhpcy5nZXRDYWxsKFwibGlzdF9hbGVydHNcIik7XG4gICAgfVxuXG4gICAgZGVsZXRlKGlkZW50aWZpZXJzKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnBvc3RDYWxsKFwiZGVsZXRlX2FsZXJ0c1wiLCB7XG4gICAgICAgICAgICBpZGVudGlmaWVyczogaWRlbnRpZmllcnNcbiAgICAgICAgfSk7XG4gICAgfVxufVxuXG5leHBvcnQgY29uc3QgYWxlcnRzID0gbmV3IEFsZXJ0c1NlcnZpY2UoKTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NvdXJjZXMvc2VydmljZXMvYWxlcnRzLmpzIiwiaW1wb3J0IHsgU2VydmljZSB9IGZyb20gXCIuLi9jb21tb24vYXBpXCI7XG5cbmNvbnN0IEJBU0VfVVJMID0gXCIvemVyb2JvdC93ZWJpbnRlcmZhY2UvYWN0b3JzL2lkZW50aXR5XCI7XG5cblxuY2xhc3MgSWRlbnRpdHlTZXJ2aWNlIGV4dGVuZHMgU2VydmljZSB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHN1cGVyKEJBU0VfVVJMKTtcbiAgICB9XG5cblxuICAgIGdldF9pZGVudGl0eSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0Q2FsbChcInRocmVlYm90X25hbWVcIik7XG4gICAgfVxuXG5cbn1cblxuZXhwb3J0IGNvbnN0IGlkZW50aXR5ID0gbmV3IElkZW50aXR5U2VydmljZSgpO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc291cmNlcy9zZXJ2aWNlcy9pZGVudGl0eS5qcyIsImltcG9ydCB7IFNlcnZpY2UgfSBmcm9tIFwiLi4vY29tbW9uL2FwaVwiO1xuXG5jb25zdCBCQVNFX1VSTCA9IFwiL3RmZ3JpZF9zb2x1dGlvbnMvdGZncmlkX3NvbHV0aW9ucy9hY3RvcnMvdGZncmlkX3NvbHV0aW9uc1wiO1xuXG5cbmNsYXNzIFNvbHV0aW9uc1NlcnZpY2UgZXh0ZW5kcyBTZXJ2aWNlIHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgc3VwZXIoQkFTRV9VUkwpO1xuICAgIH1cblxuXG4gICAgbGlzdChvcHRzKSB7XG4gICAgICAgIG9wdHMgPSBvcHRzIHx8IHt9O1xuICAgICAgICByZXR1cm4gdGhpcy5nZXRDYWxsKFwic29sdXRpb25zX2xpc3RcIik7XG4gICAgfVxuXG5cbiAgICBkZWxldGUoc29sdXRpb25UeXBlLCBzb2x1dGlvbk5hbWUpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucG9zdENhbGwoXCJzb2x1dGlvbl9kZWxldGVcIiwgeyBzb2x1dGlvbl90eXBlOiBzb2x1dGlvblR5cGUsIHNvbHV0aW9uX25hbWU6IHNvbHV0aW9uTmFtZSB9KTtcblxuICAgIH1cblxufVxuXG5leHBvcnQgY29uc3Qgc29sdXRpb25zID0gbmV3IFNvbHV0aW9uc1NlcnZpY2UoKTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NvdXJjZXMvc2VydmljZXMvZGVwbG95ZWRTb2x1dGlvbnMuanMiLCJpbXBvcnQgeyBTZXJ2aWNlIH0gZnJvbSBcIi4uL2NvbW1vbi9hcGlcIjtcblxuY29uc3QgQkFTRV9VUkwgPSBcIi96ZXJvYm90L2FkbWluL2FjdG9ycy9sb2dzXCI7XG5cbmNsYXNzIExvZ3NTZXJ2aWNlIGV4dGVuZHMgU2VydmljZSB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHN1cGVyKEJBU0VfVVJMKTtcbiAgICB9XG5cbiAgICBsaXN0QXBwcygpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0Q2FsbChcImxpc3RfYXBwc1wiKTtcbiAgICB9XG5cbiAgICBsaXN0KGFwcE5hbWUsIGxvZ0lkKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnBvc3RDYWxsKFwibGlzdFwiLCB7XG4gICAgICAgICAgICBhcHBuYW1lOiBhcHBOYW1lLFxuICAgICAgICAgICAgaWRfZnJvbTogbG9nSWRcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgZGVsZXRlKGFwcG5hbWUpe1xuICAgICAgICByZXR1cm4gdGhpcy5wb3N0Q2FsbChcImRlbGV0ZVwiLHtcbiAgICAgICAgICAgIGFwcG5hbWU6IGFwcG5hbWVcbiAgICAgICAgfSlcbiAgICB9XG5cbiAgICBkZWxldGVBbGwoKXtcbiAgICAgICAgcmV0dXJuIHRoaXMucG9zdENhbGwoXCJkZWxldGVcIilcbiAgICB9XG5cbiAgICBkZWxldGVTZWxlY3RlZChpZHMpe1xuICAgICAgICByZXR1cm4gdGhpcy5wb3N0Q2FsbChcImRlbGV0ZV9zZWxlY3RlZFwiLHtpZHN9KVxuICAgIH1cbn1cblxuZXhwb3J0IGNvbnN0IGxvZ3MgPSBuZXcgTG9nc1NlcnZpY2UoKTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NvdXJjZXMvc2VydmljZXMvbG9ncy5qcyIsImltcG9ydCB7IFNlcnZpY2UgfSBmcm9tIFwiLi4vY29tbW9uL2FwaVwiO1xuXG5jb25zdCBCQVNFX1VSTCA9IFwiL2F1dGhcIjtcblxuY2xhc3MgQXV0aFNlcnZpY2UgZXh0ZW5kcyBTZXJ2aWNlIHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgc3VwZXIoQkFTRV9VUkwpO1xuICAgIH1cblxuICAgIGdldEN1cnJlbnRVc2VyKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5nZXRDYWxsKFwiYXV0aG9yaXplZFwiKTtcbiAgICB9XG5cbiAgICBsb2dvdXQoKSB7XG4gICAgICAgIGNvbnN0IG5leHRVcmwgPSB3aW5kb3cubG9jYXRpb24ucGF0aG5hbWUgKyB3aW5kb3cubG9jYXRpb24uaGFzaDtcbiAgICAgICAgd2luZG93LmxvY2F0aW9uLmhyZWYgPSBgL2F1dGgvbG9nb3V0P25leHRfdXJsPSR7bmV4dFVybH1gO1xuICAgIH1cbn1cblxuZXhwb3J0IGNvbnN0IGF1dGggPSBuZXcgQXV0aFNlcnZpY2UoKTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NvdXJjZXMvc2VydmljZXMvYXV0aC5qcyIsImV4cG9ydCBmdW5jdGlvbiBpbnB1dERpYWxvZyhoZWFkLCBsYWJlbCwgYnV0dG9uTGFiZWwsIGNhbGxiYWNrKSB7XG4gICAgY29uc3Qgd2luZG93ID0gd2ViaXgudWkoe1xuICAgICAgICB2aWV3OiBcIndpbmRvd1wiLFxuICAgICAgICB3aWR0aDogd2luZG93LmlubmVyV2lkdGggKiAuOCxcbiAgICAgICAgaGVpZ2h0OiB3aW5kb3cuaW5uZXJIZWlnaHQgKiAuOCxcbiAgICAgICAgbW9kYWw6IHRydWUsXG4gICAgICAgIHBvc2l0aW9uOiBcImNlbnRlclwiLFxuICAgICAgICBoZWFkOiBoZWFkIHx8IFwiSW5wdXRcIixcbiAgICAgICAgYm9keToge1xuICAgICAgICAgICAgdmlldzogXCJmb3JtXCIsXG4gICAgICAgICAgICBlbGVtZW50czogW3tcbiAgICAgICAgICAgICAgICBpZDogXCJpbnB1dF9kaWFsb2dfdGV4dFwiLFxuICAgICAgICAgICAgICAgIHZpZXc6IFwidGV4dFwiLFxuICAgICAgICAgICAgICAgIG5hbWU6IFwiaW5wdXRcIixcbiAgICAgICAgICAgICAgICBsYWJlbDogbGFiZWwgfHwgXCJWYWx1ZVwiLFxuICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIGNvbHM6IFt7XG4gICAgICAgICAgICAgICAgICAgIHZpZXc6IFwiYnV0dG9uXCIsXG4gICAgICAgICAgICAgICAgICAgIGxhYmVsOiBcIkNhbmNlbFwiLFxuICAgICAgICAgICAgICAgICAgICBjbGljazogKCkgPT4gd2luZG93LmhpZGUoKSxcbiAgICAgICAgICAgICAgICAgICAgY3NzOiBcIndlYml4X2RhbmdlclwiXG4gICAgICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgICAgICB2aWV3OiBcImJ1dHRvblwiLFxuICAgICAgICAgICAgICAgICAgICBsYWJlbDogYnV0dG9uTGFiZWwgfHwgXCJPa1wiLFxuICAgICAgICAgICAgICAgICAgICBjbGljazogaGFuZGxlSW5wdXQsXG4gICAgICAgICAgICAgICAgICAgIGNzczogXCJ3ZWJpeF9wcmltYXJ5XCJcbiAgICAgICAgICAgICAgICB9XVxuICAgICAgICAgICAgfV1cbiAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgZnVuY3Rpb24gaGFuZGxlSW5wdXQoKSB7XG4gICAgICAgIGNvbnN0IHZhbHVlID0gdGhpcy5nZXRGb3JtVmlldygpLmVsZW1lbnRzLmlucHV0LmdldFZhbHVlKCkudHJpbSgpO1xuICAgICAgICBpZiAoIXZhbHVlKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoY2FsbGJhY2sgaW5zdGFuY2VvZiBGdW5jdGlvbikge1xuICAgICAgICAgICAgY2FsbGJhY2sodmFsdWUpO1xuICAgICAgICB9XG5cbiAgICAgICAgd2luZG93LmhpZGUoKTtcbiAgICB9XG5cblxuICAgIGNvbnN0IHRleHRJbnB1dCA9ICQkKFwiaW5wdXRfZGlhbG9nX3RleHRcIik7XG4gICAgdGV4dElucHV0LmF0dGFjaEV2ZW50KFwib25FbnRlclwiLCBoYW5kbGVJbnB1dC5iaW5kKHRleHRJbnB1dCkpO1xuXG4gICAgd2luZG93LnNob3coKTtcbiAgICB3ZWJpeC5VSU1hbmFnZXIuc2V0Rm9jdXModGV4dElucHV0KTtcbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NvdXJjZXMvY29tbW9uL2RpYWxvZ3MuanMiLCJpbXBvcnQgeyBTZXJ2aWNlIH0gZnJvbSBcIi4uL2NvbW1vbi9hcGlcIjtcblxuY29uc3QgQkFTRV9VUkwgPSBcIi96ZXJvYm90L3dlYmludGVyZmFjZS9hY3RvcnMvbWRib29rXCI7XG5cbmNsYXNzIFdpa2lzU2VydmljZSBleHRlbmRzIFNlcnZpY2Uge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICBzdXBlcihCQVNFX1VSTCk7XG4gICAgfVxuXG4gICAgbGlzdChvcHRzKSB7XG4gICAgICAgIG9wdHMgPSBvcHRzIHx8IHt9O1xuICAgICAgICByZXR1cm4gdGhpcy5nZXRDYWxsKFwiYm9va3NfbGlzdFwiKTtcbiAgICB9XG59XG5cblxuZXhwb3J0IGNvbnN0IHBhY2thZ2VzID0gbmV3IFdpa2lzU2VydmljZSgpO1xuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NvdXJjZXMvc2VydmljZXMvd2lraS5qcyIsInZhciBtYXAgPSB7XG5cdFwiLi9lblwiOiA1NSxcblx0XCIuL2VuLmpzXCI6IDU1XG59O1xuZnVuY3Rpb24gd2VicGFja0NvbnRleHQocmVxKSB7XG5cdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKHdlYnBhY2tDb250ZXh0UmVzb2x2ZShyZXEpKTtcbn07XG5mdW5jdGlvbiB3ZWJwYWNrQ29udGV4dFJlc29sdmUocmVxKSB7XG5cdHZhciBpZCA9IG1hcFtyZXFdO1xuXHRpZighKGlkICsgMSkpIC8vIGNoZWNrIGZvciBudW1iZXIgb3Igc3RyaW5nXG5cdFx0dGhyb3cgbmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIiArIHJlcSArIFwiJy5cIik7XG5cdHJldHVybiBpZDtcbn07XG53ZWJwYWNrQ29udGV4dC5rZXlzID0gZnVuY3Rpb24gd2VicGFja0NvbnRleHRLZXlzKCkge1xuXHRyZXR1cm4gT2JqZWN0LmtleXMobWFwKTtcbn07XG53ZWJwYWNrQ29udGV4dC5yZXNvbHZlID0gd2VicGFja0NvbnRleHRSZXNvbHZlO1xubW9kdWxlLmV4cG9ydHMgPSB3ZWJwYWNrQ29udGV4dDtcbndlYnBhY2tDb250ZXh0LmlkID0gNjc7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9zb3VyY2VzL2xvY2FsZXMgXlxcLlxcLy4qJFxuLy8gbW9kdWxlIGlkID0gNjdcbi8vIG1vZHVsZSBjaHVua3MgPSAwIl0sInNvdXJjZVJvb3QiOiIifQ==
