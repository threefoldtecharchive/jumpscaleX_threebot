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
/******/ 	return __webpack_require__(__webpack_require__.s = 38);
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
        return __webpack_require__(40)("./" + url);
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
        var data = __webpack_require__(45)("./" + path);
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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_packages__ = __webpack_require__(26);
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
        }).catch(function () {
            webix.message({ type: "error", text: "An error occurred, please try installing from packages for more details" });
        });
    };

    ExternalView.prototype.init = function init(view) {
        var _this3 = this;

        this.requiredPackagesDiv = this.$$("required_packages_div");
        view.installPackageContainer = this.$$("install-packages");
        this.installButton = this.$$("install_btn");

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

                var names = Object.keys(_this3.requiredPackages).join(", ");
                _this3.requiredPackagesDiv.setHTML("<div style='width:auto;text-align:center'><h3>You need to install the following required packages: " + names + "<h3/></div>");
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
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ErrorView", function() { return ErrorView; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_webix_jet__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__common_colors__ = __webpack_require__(19);
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
/* 4 */
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
/* 5 */
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
/* 6 */
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
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_webix_jet__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__common_colors__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__data__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__common_formatters__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__services_alerts__ = __webpack_require__(42);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__alert__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__common_filters__ = __webpack_require__(25);
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
/* 8 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_webix_jet__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__errors_dialog__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_taiga__ = __webpack_require__(21);
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
/* 9 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_webix_jet__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__errors_dialog__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_taiga__ = __webpack_require__(21);
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
/* 10 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_webix_jet__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__errors_dialog__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_taiga__ = __webpack_require__(21);
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
/* 11 */
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
/* 12 */
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
/* 13 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__external__ = __webpack_require__(1);
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }



var URL = "/#/farmmanagement";
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
/* 14 */
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
/* 15 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_webix_jet__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__appLogs__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_logs__ = __webpack_require__(43);
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
/* 16 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_webix_jet__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__errors_dialog__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_packages__ = __webpack_require__(26);
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
/* 17 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_webix_jet__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__admins__ = __webpack_require__(24);
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
/* 18 */
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
/* 19 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ansiUp; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_ansi_up__ = __webpack_require__(41);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_ansi_up___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_ansi_up__);


var ansiUp = new __WEBPACK_IMPORTED_MODULE_0_ansi_up___default.a();

/***/ }),
/* 20 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_webix_jet__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__common_colors__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__data__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__common_formatters__ = __webpack_require__(5);
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
/* 21 */
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
/* 22 */
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
/* 23 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_webix_jet__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__common_formatters__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__alerts_data__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__common_filters__ = __webpack_require__(25);
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
/* 24 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_webix_jet__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__common_dialogs__ = __webpack_require__(44);
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
/* 25 */
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
/* 26 */
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
/* 27 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_webix_jet__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_health__ = __webpack_require__(6);
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
/* 28 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_webix_jet__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_health__ = __webpack_require__(6);
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
/* 29 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_webix_jet__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_health__ = __webpack_require__(6);
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
/* 30 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_webix_jet__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__processesChildView__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_health__ = __webpack_require__(6);
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
/* 31 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_webix_jet__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_health__ = __webpack_require__(6);
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
/* 32 */
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

        var sidebarData = [{
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
            id: "solutions",
            value: "Solutions",
            icon: "mdi mdi-animation-play",
            data: [{
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
                value: '<span><img class="solutions-icon" src="static/img/k8s.png"/>Kubernetes cluster</span>' //, {
                //     id: "threebot",
                //     value: '<span><img class="solutions-icon" src="static/img/3bot.ico"/>Threebot</span>'
                // }
            }]
        }, {
            id: "farmmanagement",
            value: "Farm Management",
            icon: "mdi mdi-server"
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
        }];

        var response = webix.ajax().sync().get("/zerobot/packagemanager/actors/package_manager/packages_list", { has_frontend_args: true, status: "installed" });

        var packages = JSON.parse(response.responseText).packages;
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
                ubuntu: "solutions.chatflow?author=tfgrid_solutions&package=ubuntu&chat=ubuntu_deploy",
                flist: "solutions.chatflow?author=tfgrid_solutions&package=any_flist&chat=your_flist",
                minio: "solutions.chatflow?author=tfgrid_solutions&package=minio&chat=minio_deploy",
                k8s_cluster: "solutions.chatflow?author=tfgrid_solutions&package=kubernetes_cluster&chat=kubernetes_cluster_deploy",
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
/* 33 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_webix_jet__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__common_formatters__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_myjobs__ = __webpack_require__(34);
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
/* 34 */
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
/* 35 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_webix_jet__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__common_formatters__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_myjobs__ = __webpack_require__(34);
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
/* 36 */
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
/* 37 */
/***/ (function(module, exports) {



/***/ }),
/* 38 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__styles_app_css__ = __webpack_require__(39);
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
/* 39 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./alerts": 7,
	"./alerts/": 7,
	"./alerts/alert": 20,
	"./alerts/alert.js": 20,
	"./alerts/data": 4,
	"./alerts/data.js": 4,
	"./alerts/index": 7,
	"./alerts/index.js": 7,
	"./circles": 8,
	"./circles/": 8,
	"./circles/index": 8,
	"./circles/index.js": 8,
	"./circlestories": 9,
	"./circlestories/": 9,
	"./circlestories/index": 9,
	"./circlestories/index.js": 9,
	"./circletasks": 10,
	"./circletasks/": 10,
	"./circletasks/index": 10,
	"./circletasks/index.js": 10,
	"./codeserver": 11,
	"./codeserver/": 11,
	"./codeserver/index": 11,
	"./codeserver/index.js": 11,
	"./dash": 12,
	"./dash/": 12,
	"./dash/diskSpace": 27,
	"./dash/diskSpace.js": 27,
	"./dash/health": 28,
	"./dash/health.js": 28,
	"./dash/index": 12,
	"./dash/index.js": 12,
	"./dash/jsxInfo": 29,
	"./dash/jsxInfo.js": 29,
	"./dash/processes": 30,
	"./dash/processes.js": 30,
	"./dash/processesChildView": 22,
	"./dash/processesChildView.js": 22,
	"./dash/runningPorts": 31,
	"./dash/runningPorts.js": 31,
	"./errors/dialog": 3,
	"./errors/dialog.js": 3,
	"./external": 1,
	"./external/": 1,
	"./external/index": 1,
	"./external/index.js": 1,
	"./farmmanagement": 13,
	"./farmmanagement/": 13,
	"./farmmanagement/index": 13,
	"./farmmanagement/index.js": 13,
	"./jupyter": 14,
	"./jupyter/": 14,
	"./jupyter/index": 14,
	"./jupyter/index.js": 14,
	"./logs": 15,
	"./logs/": 15,
	"./logs/appLogs": 23,
	"./logs/appLogs.js": 23,
	"./logs/index": 15,
	"./logs/index.js": 15,
	"./main": 32,
	"./main.js": 32,
	"./myjobs/jobs": 33,
	"./myjobs/jobs.js": 33,
	"./myjobs/workers": 35,
	"./myjobs/workers.js": 35,
	"./packages": 16,
	"./packages/": 16,
	"./packages/index": 16,
	"./packages/index.js": 16,
	"./settings": 17,
	"./settings/": 17,
	"./settings/admins": 24,
	"./settings/admins.js": 24,
	"./settings/index": 17,
	"./settings/index.js": 17,
	"./solutions/chatflow": 36,
	"./solutions/chatflow.js": 36,
	"./wikis": 18,
	"./wikis/": 18,
	"./wikis/index": 18,
	"./wikis/index.js": 18
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
webpackContext.id = 40;

/***/ }),
/* 41 */
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
/* 42 */
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
/* 43 */
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
/* 44 */
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
/* 45 */
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./en": 37,
	"./en.js": 37
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
webpackContext.id = 45;

/***/ })
/******/ ])["default"];
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgYjEyMWE5OGIxM2YxOTExNDk2ZjEiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3dlYml4LWpldC9kaXN0L2VzNi9qZXQuanMiLCJ3ZWJwYWNrOi8vLy4vc291cmNlcy92aWV3cy9leHRlcm5hbC9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9zb3VyY2VzL2NvbW1vbi9hcGkuanMiLCJ3ZWJwYWNrOi8vLy4vc291cmNlcy92aWV3cy9lcnJvcnMvZGlhbG9nLmpzIiwid2VicGFjazovLy8uL3NvdXJjZXMvdmlld3MvYWxlcnRzL2RhdGEuanMiLCJ3ZWJwYWNrOi8vLy4vc291cmNlcy9jb21tb24vZm9ybWF0dGVycy5qcyIsIndlYnBhY2s6Ly8vLi9zb3VyY2VzL3NlcnZpY2VzL2hlYWx0aC5qcyIsIndlYnBhY2s6Ly8vLi9zb3VyY2VzL3ZpZXdzL2FsZXJ0cy9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9zb3VyY2VzL3ZpZXdzL2NpcmNsZXMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vc291cmNlcy92aWV3cy9jaXJjbGVzdG9yaWVzL2luZGV4LmpzIiwid2VicGFjazovLy8uL3NvdXJjZXMvdmlld3MvY2lyY2xldGFza3MvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vc291cmNlcy92aWV3cy9jb2Rlc2VydmVyL2luZGV4LmpzIiwid2VicGFjazovLy8uL3NvdXJjZXMvdmlld3MvZGFzaC9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9zb3VyY2VzL3ZpZXdzL2Zhcm1tYW5hZ2VtZW50L2luZGV4LmpzIiwid2VicGFjazovLy8uL3NvdXJjZXMvdmlld3MvanVweXRlci9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9zb3VyY2VzL3ZpZXdzL2xvZ3MvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vc291cmNlcy92aWV3cy9wYWNrYWdlcy9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9zb3VyY2VzL3ZpZXdzL3NldHRpbmdzL2luZGV4LmpzIiwid2VicGFjazovLy8uL3NvdXJjZXMvdmlld3Mvd2lraXMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vc291cmNlcy9jb21tb24vY29sb3JzLmpzIiwid2VicGFjazovLy8uL3NvdXJjZXMvdmlld3MvYWxlcnRzL2FsZXJ0LmpzIiwid2VicGFjazovLy8uL3NvdXJjZXMvc2VydmljZXMvdGFpZ2EuanMiLCJ3ZWJwYWNrOi8vLy4vc291cmNlcy92aWV3cy9kYXNoL3Byb2Nlc3Nlc0NoaWxkVmlldy5qcyIsIndlYnBhY2s6Ly8vLi9zb3VyY2VzL3ZpZXdzL2xvZ3MvYXBwTG9ncy5qcyIsIndlYnBhY2s6Ly8vLi9zb3VyY2VzL3ZpZXdzL3NldHRpbmdzL2FkbWlucy5qcyIsIndlYnBhY2s6Ly8vLi9zb3VyY2VzL2NvbW1vbi9maWx0ZXJzLmpzIiwid2VicGFjazovLy8uL3NvdXJjZXMvc2VydmljZXMvcGFja2FnZXMuanMiLCJ3ZWJwYWNrOi8vLy4vc291cmNlcy92aWV3cy9kYXNoL2Rpc2tTcGFjZS5qcyIsIndlYnBhY2s6Ly8vLi9zb3VyY2VzL3ZpZXdzL2Rhc2gvaGVhbHRoLmpzIiwid2VicGFjazovLy8uL3NvdXJjZXMvdmlld3MvZGFzaC9qc3hJbmZvLmpzIiwid2VicGFjazovLy8uL3NvdXJjZXMvdmlld3MvZGFzaC9wcm9jZXNzZXMuanMiLCJ3ZWJwYWNrOi8vLy4vc291cmNlcy92aWV3cy9kYXNoL3J1bm5pbmdQb3J0cy5qcyIsIndlYnBhY2s6Ly8vLi9zb3VyY2VzL3ZpZXdzL21haW4uanMiLCJ3ZWJwYWNrOi8vLy4vc291cmNlcy92aWV3cy9teWpvYnMvam9icy5qcyIsIndlYnBhY2s6Ly8vLi9zb3VyY2VzL3NlcnZpY2VzL215am9icy5qcyIsIndlYnBhY2s6Ly8vLi9zb3VyY2VzL3ZpZXdzL215am9icy93b3JrZXJzLmpzIiwid2VicGFjazovLy8uL3NvdXJjZXMvdmlld3Mvc29sdXRpb25zL2NoYXRmbG93LmpzIiwid2VicGFjazovLy8uL3NvdXJjZXMvYXBwLmpzIiwid2VicGFjazovLy8uL3NvdXJjZXMvc3R5bGVzL2FwcC5jc3MiLCJ3ZWJwYWNrOi8vLy4vc291cmNlcy92aWV3cyBeXFwuXFwvLiokIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9hbnNpX3VwL2Fuc2lfdXAuanMiLCJ3ZWJwYWNrOi8vLy4vc291cmNlcy9zZXJ2aWNlcy9hbGVydHMuanMiLCJ3ZWJwYWNrOi8vLy4vc291cmNlcy9zZXJ2aWNlcy9sb2dzLmpzIiwid2VicGFjazovLy8uL3NvdXJjZXMvY29tbW9uL2RpYWxvZ3MuanMiLCJ3ZWJwYWNrOi8vLy4vc291cmNlcy9sb2NhbGVzIF5cXC5cXC8uKiQiXSwibmFtZXMiOlsiTmF2aWdhdGlvbkJsb2NrZWQiLCJKZXRCYXNlIiwid2ViaXgiLCJ3ZWJpeEpldCIsIl9ldmVudHMiLCJfc3VicyIsIl9kYXRhIiwiZ2V0Um9vdCIsIl9yb290IiwiZGVzdHJ1Y3RvciIsIl9kZXRhY2hFdmVudHMiLCJfZGVzdHJveVN1YnMiLCJfY29udGFpbmVyIiwiYXBwIiwiX3BhcmVudCIsInNldFBhcmFtIiwiaWQiLCJ2YWx1ZSIsInVybCIsIl9zZWdtZW50IiwidXBkYXRlIiwic2hvdyIsImdldFBhcmFtIiwicGFyZW50IiwidmlldyIsImdldFBhcmVudFZpZXciLCJnZXRVcmwiLCJzdWJ1cmwiLCJnZXRVcmxTdHJpbmciLCJ0b1N0cmluZyIsIiQkIiwicm9vdCIsInF1ZXJ5VmlldyIsIm9iaiIsImNvbmZpZyIsImxvY2FsSWQiLCIkc2NvcGUiLCJvbiIsIm5hbWUiLCJjb2RlIiwiYXR0YWNoRXZlbnQiLCJwdXNoIiwiY29udGFpbnMiLCJrZXkiLCJraWQiLCJnZXRTdWJWaWV3Iiwic3ViIiwiZ2V0U3ViVmlld0luZm8iLCJzdWJ2aWV3IiwicG9wdXAiLCJldmVudHMiLCJpIiwibGVuZ3RoIiwiZGV0YWNoRXZlbnQiLCJzdWJWaWV3IiwiX2luaXRfdXJsX2RhdGEiLCJjdXJyZW50IiwiZXh0ZW5kIiwicGFyYW1zIiwiX2dldERlZmF1bHRTdWIiLCJkZWZhdWx0IiwiYnJhbmNoIiwiY2hpbGQiLCJfcm91dGVkX3ZpZXciLCJwYXJzZSIsInN1YnN0ciIsInBhcnRzIiwic3BsaXQiLCJjaHVua3MiLCJ0ZXN0IiwicmVzdWx0IiwicG9zIiwiaW5kZXhPZiIsInBhcmFtIiwiZGNodW5rIiwiZGVjb2RlVVJJQ29tcG9uZW50IiwicGFnZSIsImlzTmV3IiwidXJsMnN0ciIsInN0YWNrIiwiY2h1bmsiLCJvYmoyc3RyIiwiam9pbiIsInN0ciIsImVuY29kZVVSSUNvbXBvbmVudCIsIlJvdXRlIiwicm91dGUiLCJpbmRleCIsIl9uZXh0IiwicGF0aCIsIm5leHQiLCJzbGljZSIsInNoaWZ0IiwicmVmcmVzaCIsIl9qb2luIiwia2lkcyIsIm9sZCIsImNvbmNhdCIsImFwcGVuZCIsIlByb21pc2UiLCJyZXMiLCJyZWoiLCJyZWRpcmVjdCIsImNvbmZpcm0iLCJyZXNvbHZlIiwiY2FsbEV2ZW50IiwiY2F0Y2giLCJlcnIiLCJ0aGVuIiwic2l6ZSIsIm4iLCJKZXRWaWV3IiwiX2NoaWxkcmVuIiwidWkiLCJjb250YWluZXIiLCJqZXR2aWV3IiwiY3JlYXRlVmlldyIsInJlbmRlciIsInRhcmdldCIsIl9yZW5kZXJGcmFtZUxvY2siLCJfc2hvdyIsInNlZ21lbnQiLCJfdXJsQ2hhbmdlIiwibGlua1JvdXRlciIsImdldFJvdXRlciIsInNldCIsInNpbGVudCIsImluaXQiLCJfJHZpZXciLCJfJCIsInJlYWR5IiwiXyR1cmwiLCJtZXNzYWdlIiwidXJsQ2hhbmdlIiwiZGVzdHJveSIsIl9kZXN0cm95S2lkcyIsInVzZSIsInBsdWdpbiIsInRhZ05hbWUiLCJfcmVuZGVyIiwiZG9jdW1lbnQiLCJib2R5IiwidG9Ob2RlIiwiX3JlbmRlcl9maW5hbCIsImNmZyIsInNsb3QiLCJyZWplY3QiLCJyZXNwb25zZSIsImNvcHlDb25maWciLCJvbGR1aSIsImFzV2luIiwic2V0UG9zaXRpb24iLCJpc1Zpc2libGUiLCJfaW5pdCIsIl9pbml0VXJsIiwiZSIsIl9pbml0RXJyb3IiLCJ3YWl0cyIsImZyYW1lIiwid2FpdCIsImFsbCIsImxvY2siLCJfcmVuZGVyRnJhbWUiLCJfY3JlYXRlU3ViVmlldyIsImVycm9yIiwiY3JlYXRlRnJvbVVSTCIsInVpcyIsIkpldFZpZXdSYXciLCJfdWkiLCJTdWJSb3V0ZXIiLCJjYiIsImEiLCJnZXQiLCJfb25jZSIsIkpldEFwcEJhc2UiLCJ3aW5kb3ciLCJ2ZXJzaW9uIiwic3RhcnQiLCJfc2VydmljZXMiLCJFdmVudFN5c3RlbSIsIl9zdWJTZWdtZW50IiwiZ2V0U2VydmljZSIsInNldFNlcnZpY2UiLCJoYW5kbGVyIiwicHJvdG90eXBlIiwiJHN1YnZpZXciLCJhZGRTdWJWaWV3IiwiQXJyYXkiLCJtZXRob2QiLCJwb2ludCIsIkRhdGFDb2xsZWN0aW9uIiwiUmVnRXhwIiwiRGF0ZSIsImNvcHkiLCIkcm91dGVyIiwiY2xpY2tIYW5kbGVyIiwic3JjRWxlbWVudCIsImdldEF0dHJpYnV0ZSIsInRyaWdnZXIiLCJfZm9yVmlldyIsImNhbmNlbEJ1YmJsZSIsInByZXZlbnREZWZhdWx0IiwicGFyZW50Tm9kZSIsImxvYWRWaWV3Iiwidmlld3MiLCJfbG9hZEVycm9yIiwiRXJyb3IiLCJfbG9hZFZpZXdEeW5hbWljIiwibW9kdWxlIiwiX19lc01vZHVsZSIsInJvdXRlciIsInJlc3QiLCJhcHBseSIsImRhdGEiLCJhY3Rpb24iLCJiaW5kIiwiZXIiLCJkZWJ1ZyIsImNvbnNvbGUiLCJ0ZXh0IiwicmVwbGFjZSIsImlubmVySFRNTCIsInR5cGUiLCJleHBpcmUiLCJmaXJzdEluaXQiLCJldmVudCIsIl9maXJzdF9zdGFydCIsInRvcCIsImJhc2UiLCJzZXRUaW1lb3V0IiwiYW5pbWF0aW9uIiwibm9kZSIsImh0bWwiLCJhZGRDc3MiLCJyZW1vdmVDc3MiLCJ1cmxTdHJpbmciLCJ0ZW1wbGF0ZSIsInVpZCIsIkhhc2hSb3V0ZXIiLCJfZGV0ZWN0UHJlZml4Iiwib25wb3BzdGF0ZSIsInJvdXRlcyIsImNvbXBhcmUiLCJoaXN0b3J5IiwicHVzaFN0YXRlIiwicHJlZml4Iiwic3VmaXgiLCJfZ2V0UmF3Iiwicm91dGVyUHJlZml4IiwibG9jYXRpb24iLCJocmVmIiwiaXNQYXRjaGVkIiwicGF0Y2giLCJ3Iiwid2luIiwicHJvbWlzZSIsImZyZWV6ZSIsInNvbWUiLCIkZnJlZXplIiwicmVzaXplIiwiYmFzZUFkZCIsImJhc2VsYXlvdXQiLCJhZGRWaWV3IiwiYmFzZVJlbW92ZSIsInJlbW92ZVZpZXciLCJqdmlldyIsInN1YnMiLCJhcmd1bWVudHMiLCJsYXlvdXQiLCJwcm90b1VJIiwiJGluaXQiLCIkYXBwIiwiJHJlYWR5Iiwib3JpZ2luIiwicHJveHkiLCJKZXRBcHAiLCJyZXF1aXJlIiwiU3RvcmVSb3V0ZXIiLCJzdG9yYWdlIiwic2Vzc2lvbiIsInN0b3JlTmFtZSIsInB1dCIsIlVybFJvdXRlciIsInBhdGhuYW1lIiwic2VhcmNoIiwiRW1wdHlSb3V0ZXIiLCJfJGNvbmZpZyIsIlVubG9hZEd1YXJkIiwiaGFzIiwic3RvcmUiLCJPYmplY3QiLCJoYXNPd25Qcm9wZXJ0eSIsImNhbGwiLCJmb3JFYWNoIiwiY29udGV4dCIsInRyaW0iLCJ3YXJuIiwieCIsIlN0cmluZyIsImRlbGltaXRlciIsInJ1c3NpYW5QbHVyYWxHcm91cHMiLCJlbmQiLCJwbHVyYWxUeXBlcyIsImFyYWJpYyIsImxhc3RUd28iLCJib3NuaWFuX3NlcmJpYW4iLCJjaGluZXNlIiwiY3JvYXRpYW4iLCJmcmVuY2giLCJnZXJtYW4iLCJydXNzaWFuIiwibGl0aHVhbmlhbiIsImN6ZWNoIiwicG9saXNoIiwiaWNlbGFuZGljIiwic2xvdmVuaWFuIiwicGx1cmFsVHlwZVRvTGFuZ3VhZ2VzIiwibGFuZ1RvVHlwZU1hcCIsIm1hcHBpbmciLCJyZXQiLCJsYW5ncyIsImxhbmciLCJwbHVyYWxUeXBlTmFtZSIsImxvY2FsZSIsImxhbmdUb1BsdXJhbFR5cGUiLCJlbiIsInBsdXJhbFR5cGVJbmRleCIsImNvdW50IiwiZXNjYXBlIiwidG9rZW4iLCJjb25zdHJ1Y3RUb2tlblJlZ2V4Iiwib3B0cyIsInN1ZmZpeCIsIlJhbmdlRXJyb3IiLCJkb2xsYXJSZWdleCIsImRvbGxhckJpbGxzWWFsbCIsImRlZmF1bHRUb2tlblJlZ2V4IiwidHJhbnNmb3JtUGhyYXNlIiwicGhyYXNlIiwic3Vic3RpdHV0aW9ucyIsInRva2VuUmVnZXgiLCJUeXBlRXJyb3IiLCJpbnRlcnBvbGF0aW9uUmVnZXgiLCJvcHRpb25zIiwic21hcnRfY291bnQiLCJ0ZXh0cyIsImV4cHJlc3Npb24iLCJhcmd1bWVudCIsIlBvbHlnbG90IiwicGhyYXNlcyIsImN1cnJlbnRMb2NhbGUiLCJhbGxvd01pc3NpbmciLCJvbk1pc3NpbmdLZXkiLCJpbnRlcnBvbGF0aW9uIiwibmV3TG9jYWxlIiwibW9yZVBocmFzZXMiLCJwcmVmaXhlZEtleSIsInVuc2V0IiwiY2xlYXIiLCJuZXdQaHJhc2VzIiwidCIsIl8iLCJ0cmFuc2Zvcm0iLCJ3ZWJpeFBvbHlnbG90IiwiTG9jYWxlIiwiX3ZpZXciLCJzZXRMYW5nRGF0YSIsInBjb25maWciLCJwb2x5Z2xvdCIsInBvbHkiLCJzZXJ2aWNlIiwibG9jTmFtZSIsImkxOG4iLCJzZXRMb2NhbGUiLCJnZXRMYW5nIiwic2V0TGFuZyIsInVybHMiLCJNZW51IiwiZ2V0VmFsdWUiLCJzZXRWYWx1ZSIsImdldFNlbGVjdGVkSWQiLCJzZWxlY3QiLCJleGlzdHMiLCJiYXNlaWNvbnMiLCJnb29kIiwic2F2aW5nIiwiYmFzZXRleHQiLCJTdGF0dXMiLCJzdGF0dXMiLCJpc2Vycm9yIiwiZXhwaXJlRGVsYXkiLCJpY29ucyIsImNvbnRlbnQiLCJhcmVhIiwic2V0SFRNTCIsInN1Y2Nlc3MiLCJzZXRTdGF0dXMiLCJmYWlsIiwiZ2V0U3RhdHVzIiwiaGlkZVN0YXR1cyIsIm1vZGUiLCJyZXNwb25zZVRleHQiLCJ0cmFjayIsImRwIiwiX2lkIiwiX29iaiIsInJlbW90ZSIsImFqYXgiLCJfbW9kZSIsIl91cmwiLCJfcmVxdWVzdCIsIl9oZWFkZXJzIiwiX2ZpbGVzIiwiVGhlbWUiLCJ0aGVtZSIsImdldFRoZW1lIiwic2V0VGhlbWUiLCJsaW5rcyIsImdldEVsZW1lbnRzQnlUYWdOYW1lIiwibG5hbWUiLCJkaXNhYmxlZCIsInNraW4iLCJjb3B5UGFyYW1zIiwiVXJsUGFyYW0iLCJvcyIsIm9nIiwidmFsIiwiVXNlciIsImxvZ2luIiwibG9nb3V0IiwiYWZ0ZXJMb2dpbiIsImFmdGVyTG9nb3V0IiwicGluZyIsIm1vZGVsIiwidXNlciIsImdldFVzZXIiLCJzZXJ2ZXIiLCJwYXNzIiwiY2FuTmF2aWdhdGUiLCJfJHJvb3QiLCJwdWJsaWMiLCJzZXRJbnRlcnZhbCIsInBsdWdpbnMiLCJlcnJvcnMiLCJTVEFUVVNfSU5TVEFMTEVEIiwiRXh0ZXJuYWxWaWV3IiwidGFyZ2V0VXJsIiwicmVxdWlyZWRQYWNrYWdlcyIsInNlbGYiLCJpZnJhbWUiLCJvbkFmdGVyTG9hZCIsImhpZGVQcm9ncmVzcyIsImVuYWJsZSIsInJvd3MiLCJoaWRkZW4iLCJjb2xzIiwiYXV0b2hlaWdodCIsImNzcyIsImhlaWdodCIsImNsaWNrIiwiaW5zdGFsbFJlcXVpcmVkUGFja2FnZXMiLCJwcm9taXNlcyIsImtleXMiLCJtYXAiLCJwYWNrYWdlcyIsImFkZCIsImluc3RhbGxCdXR0b24iLCJkaXNhYmxlIiwicmVsb2FkIiwicmVxdWlyZWRQYWNrYWdlc0RpdiIsImluc3RhbGxQYWNrYWdlQ29udGFpbmVyIiwiZXh0ZXJuYWxJZnJhbWUiLCJQcm9ncmVzc0JhciIsInNob3dQcm9ncmVzcyIsImxvYWQiLCJsaXN0IiwiYWxsUGFja2FnZXMiLCJqc29uIiwicCIsInJlcXVpcmVkUGFja2FnZSIsImhpZGUiLCJuYW1lcyIsImhlYWRlcnMiLCJTZXJ2aWNlIiwiYmFzZVVybCIsImpvaW5VcmwiLCJhcmdzIiwidG9Mb3dlckNhc2UiLCJwb3N0IiwiVmFsdWVFcnJvciIsImdldENhbGwiLCJwb3N0Q2FsbCIsIkVycm9yVmlldyIsInNjcm9sbCIsImhlYWQiLCJtb2RhbCIsIndpZHRoIiwicG9zaXRpb24iLCJnZXRUb3BQYXJlbnRWaWV3Iiwic2hvd0Vycm9yIiwiYW5zaVVwIiwiYW5zaV90b19odG1sIiwiZ2V0SGVhZCIsIk1BWF9NU0dfTEVOIiwiTEVWRUxTIiwiU1RBVEVTIiwiVFlQRVMiLCJkYXRlRm9ybWF0Iiwid2ViaXhEYXRlRm9ybWF0dGVyIiwiZGF0ZVRvU3RyIiwiZGF0ZUZvcm1hdHRlciIsInBhcnNlSW50IiwiQkFTRV9VUkwiLCJIZWFsdGhTZXJ2aWNlIiwiZ2V0RGlza1NwYWNlIiwiZ2V0SGVhbHRoIiwiZ2V0SWRlbnRpdHkiLCJnZXROZXR3b3JrSW5mbyIsImdldEpzeFZlcnNpb24iLCJnZXRSdW5uaW5nUHJvY2Vzc2VzIiwiZ2V0UnVubmluZ1BvcnRzIiwiaGVhbHRoIiwiQWxlcnRzVmlldyIsInJlc2l6ZUNvbHVtbiIsIm11bHRpc2VsZWN0IiwiY29sdW1ucyIsImhlYWRlciIsInNvcnQiLCJhdXRvd2lkdGgiLCJmb3JtYXQiLCJjcmVhdGVGaWx0ZXJPcHRpb25zIiwiZmlsbHNwYWNlIiwiYXV0b0NvbmZpZyIsInNjaGVtZSIsImRlbGV0ZUl0ZW0iLCJvYmplY3RzIiwiaXRlbXMiLCJpZHMiLCJpbmRleGVzIiwiaXRlbSIsInRhYmxlIiwiZ2V0SXRlbSIsInRpdGxlIiwib2siLCJjYW5jZWwiLCJpZGVudGlmaWVycyIsImlkZW50aWZpZXIiLCJhbGVydHMiLCJkZWxldGUiLCJyZW1vdmUiLCJ2aWV3SXRlbSIsImFsZXJ0VmlldyIsInNob3dGb3IiLCJBbGVydFZpZXciLCJjbGVhckFsbCIsImF0dGFjaFRvIiwiQ2lyY2xlc1ZpZXciLCJncmlkIiwib25Db250ZXh0IiwiZXJyb3JWaWV3IiwibWVudSIsImNpcmNsZVRhYmxlIiwiaW5mbyIsIkpTT04iLCJ1c2VybmFtZSIsInRhaWdhIiwidXNlckNpcmNsZXMiLCJjaXJjbGVzIiwiQ2lyY2xlc3Rvcmllc1ZpZXciLCJzdG9yaWVzVGFibGUiLCJ1c2VyU3RvcmllcyIsInN0b3JpZXMiLCJDaXJjbGVzVGFza3NWaWV3IiwidGFza3NUYWJsZSIsInVzZXJUYXNrcyIsInRhc2tzIiwiQ09ERV9VUkwiLCJSRVFVSVJFRF9QQUNLQUdFUyIsIkNvZGVzZXJ2ZXJWaWV3IiwiVG9wVmlldyIsInJlc3BvbnNpdmUiLCJVUkwiLCJGYXJtbWFuYWdlbWVudFZpZXciLCJKdXB5dGVyVmlldyIsIkxvZ3NWaWV3IiwicGxhY2Vob2xkZXIiLCJvbkNoYW5nZSIsImFwcE5hbWUiLCJBcHBMb2dzVmlldyIsImFwcHNDb21ibyIsImxvZ3MiLCJsaXN0QXBwcyIsImRlZmluZSIsImFwcG5hbWUiLCJsb2dJZCIsImxvZ2lkIiwiYXBwTG9ncyIsIlVOS05PV05fU1RBVFVTIiwiUEFDS0FHRV9TVEFURVMiLCJhY3Rpb25zIiwiUGFja2FnZXNWaWV3IiwiaW5wdXRBbGlnbiIsImhhbmRsZVJlc3VsdCIsImNhbGxiYWNrIiwicGFja2FnZVRhYmxlIiwiRnVuY3Rpb24iLCJhZGRQYWNrYWdlIiwiZ2l0VXJsIiwiZGVsZXRlUGFja2FnZSIsInBhY2thZ2VOYW1lIiwiZWxlbWVudElEIiwic3RhcnRQYWNrYWdlIiwic3RvcFBhY2thZ2UiLCJzdG9wIiwiZW5hYmxlUGFja2FnZSIsImRpc2FibGVQYWNrYWdlIiwiY2hlY2tBY3Rpb24iLCJzZWxlY3RlZEl0ZW1JZCIsImF1dGhvciIsInBhY2FrZ2VMb2NhdGlvbiIsImFsZXJ0IiwicGFja2FnZU1ldGhvZCIsIiR2aWV3IiwibG9jYXRlIiwibWVudWRhdGEiLCJyb3ciLCJhZGRBY3Rpb25zIiwicHJldmVudEV2ZW50IiwibWFwRGF0YSIsImFsbEl0ZW1zIiwic291cmNlIiwidGhyZWVib3QiLCJwa2dJbmRleCIsImoiLCJTZXR0aW5nc1ZpZXciLCJjZWxscyIsIkFkbWluc1ZpZXciLCJXSUtJU19VUkwiLCJXaWtpc1ZpZXciLCJBbnNpVXAiLCJlbGVtZW50c0NvbmZpZyIsImxhYmVsV2lkdGgiLCJlbGVtZW50cyIsImxhYmVsIiwicmVhZG9ubHkiLCJ0YWIiLCJtdWx0aXZpZXciLCJmb3JtIiwidGJWaWV3cyIsInRiVGFicyIsImxvZ0RhdGEiLCJnZXRTZWxlY3RlZEl0ZW0iLCJhcHBfbmFtZSIsImxhdGVzdF9sb2dpZCIsImFkZFRyYWNlYmFjayIsInRiIiwidGJJZCIsInRocmVlYm90X25hbWUiLCJwcm9jZXNzX2lkIiwidGJUaXRsZSIsImZvcm1hdHRlZCIsImFkZE9wdGlvbiIsImNsZWFyVHJhY2VCYWNrcyIsInJlbW92ZU9wdGlvbiIsInZhbHVlcyIsImFzc2lnbiIsImFsZXJ0X3R5cGUiLCJsZXZlbCIsInRpbWVfZmlyc3QiLCJ0aW1lX2xhc3QiLCJzZXRWYWx1ZXMiLCJ0cmFjZWJhY2tzIiwiVGFpZ2FTZXJ2aWNlIiwib3V0cHV0X3R5cGUiLCJQcm9jZXNzZXNDaGlsZFZpZXciLCJNYXRoIiwiY2VpbCIsInBhZ2VyIiwiZ3JvdXAiLCJhcHBsb2dzIiwibWFya1NvcnRpbmciLCJhZGRBZG1pbiIsIm9uQ2xpY2siLCJkZWxldGVfYWRtaW4iLCJkZWxldGVBZG1pbiIsImlucHV0RGlhbG9nIiwiaW5wdXQiLCJpdGVtSWQiLCJQYWNrYWdlc1NlcnZpY2UiLCJnaXRfdXJsIiwiRGlza1NwYWNlVmlldyIsImRpc2tTcGFjZSIsImRpc2tJbmZvIiwidXNlZCIsImZyZWUiLCJ0b3RhbCIsInBlcmNlbnQiLCJoZWFsdGhJbmZvVmlldyIsImhlYWx0aEluZm8iLCJiY2RiIiwid2lraXMiLCJjb2Rlc2VydmVyIiwianVweXRlciIsIkpTWEluZm9WaWV3IiwiaXAiLCJpcDYiLCJjb2xvcnNEYXRhc2V0IiwiY29sb3IiLCJQcm9jZXNzZXNWaWV3IiwicHJvY2Vzc2VzSW5mbyIsInBpZUlubmVyVGV4dCIsImFsaWduIiwiaW5wdXRXaWR0aCIsImNoaWxkdmlldyIsInByb2Nlc3Nlc0xpc3QiLCJydW5Qcm9jZXNzSW5mbyIsImNoYXJ0c0RhdGEiLCJwcm9jZXNzZXNfbGlzdCIsIm1lbW9yeVVzYWdlIiwibWVtb3J5X3VzYWdlIiwidG90YWxNZW1vcnkiLCJ0b3RhbF9tZW0iLCJ1c2FnZV9wZXJjZW50IiwidGVtcCIsInZtcyIsInJ1bm5pbmdQb3J0c1ZpZXciLCJwb3J0cyIsInBvcnRzVGFibGUiLCJpY29uIiwiaGlkZU1lbnUiLCJ0b29sdGlwIiwiYm9yZGVybGVzcyIsInNpZGViYXJEYXRhIiwic3luYyIsImhhc19mcm9udGVuZF9hcmdzIiwiZnJvbnRlbmRfYXJncyIsInNpZGViYXIiLCJ0b29sYmFyIiwicGFkZGluZyIsInNob3dNZW51IiwiYnV0dG9uSGlkZU1lbnUiLCJidXR0b25TaG93TWVudSIsIm15am9icyIsIndvcmtlcnMiLCJ1YnVudHUiLCJmbGlzdCIsIm1pbmlvIiwiazhzX2NsdXN0ZXIiLCJ1c2VyTWVudSIsInVzZXJuYW1lTGFiZWwiLCJnZXRUZXh0U2l6ZSIsImVtYWlsIiwiSm9ic1ZpZXciLCJzdHJpbmdpZnkiLCJsaXN0Sm9icyIsIk15am9ic1NlcnZpY2UiLCJsaXN0V29ya2VycyIsIkNoYXRmbG93VmlldyIsImJhc2VHaXRVcmwiLCJwYWNrYWdlIiwicGFja2FnZVVybCIsImNoYXQiLCJJbnZlbnRvcnlBcHAiLCJBUFBOQU1FIiwiVkVSU0lPTiIsIlBST0RVQ1RJT04iLCJmYWN0b3J5IiwiZXhwb3J0cyIsIm5vZGVOYW1lIiwiZXhwIiwiX19tYWtlVGVtcGxhdGVPYmplY3QiLCJjb29rZWQiLCJyYXciLCJkZWZpbmVQcm9wZXJ0eSIsIlBhY2tldEtpbmQiLCJzZXR1cF9wYWxldHRlcyIsIl91c2VfY2xhc3NlcyIsIl9lc2NhcGVfZm9yX2h0bWwiLCJib2xkIiwiZmciLCJiZyIsIl9idWZmZXIiLCJfdXJsX3doaXRlbGlzdCIsImFyZyIsImVudW1lcmFibGUiLCJjb25maWd1cmFibGUiLCJfdGhpcyIsImFuc2lfY29sb3JzIiwicmdiIiwiY2xhc3NfbmFtZSIsInBhbGV0dGVfMjU2IiwicGFsZXR0ZSIsInJlYyIsImxldmVscyIsInIiLCJnIiwiYiIsImNvbCIsImdyZXlfbGV2ZWwiLCJncnkiLCJlc2NhcGVfdHh0X2Zvcl9odG1sIiwidHh0IiwiYXBwZW5kX2J1ZmZlciIsImdldF9uZXh0X3BhY2tldCIsInBrdCIsImtpbmQiLCJFT1MiLCJsZW4iLCJUZXh0IiwiSW5jb21wbGV0ZSIsIm5leHRfY2hhciIsImNoYXJBdCIsIkVTQyIsIl9jc2lfcmVnZXgiLCJyZ3giLCJtYXRjaCIsIlVua25vd24iLCJTR1IiLCJycG9zIiwiX29zY19zdCIsInJneEciLCJsYXN0SW5kZXgiLCJtYXRjaF8xIiwiZXhlYyIsIm1hdGNoXzIiLCJfb3NjX3JlZ2V4IiwiT1NDVVJMIiwiYmxvY2tzIiwicGFja2V0IiwidHJhbnNmb3JtX3RvX2h0bWwiLCJ3aXRoX3N0YXRlIiwicHJvY2Vzc19hbnNpIiwicHJvY2Vzc19oeXBlcmxpbmsiLCJzZ3JfY21kcyIsInNncl9jbWRfc3RyIiwibnVtIiwiaXNOYU4iLCJpc19mb3JlZ3JvdW5kIiwibW9kZV9jbWQiLCJwYWxldHRlX2luZGV4IiwiYyIsImZyYWdtZW50Iiwic3R5bGVzIiwiY2xhc3NlcyIsImNsYXNzX3N0cmluZyIsInN0eWxlX3N0cmluZyIsInRtcGxPYmoiLCJzdWJzdCIsIl9pIiwicmVnZXhUZXh0Iiwid3NyZ3giLCJ0eHQyIiwiQWxlcnRzU2VydmljZSIsIkxvZ3NTZXJ2aWNlIiwiaWRfZnJvbSIsImJ1dHRvbkxhYmVsIiwiaGFuZGxlSW5wdXQiLCJnZXRGb3JtVmlldyIsInRleHRJbnB1dCIsIlVJTWFuYWdlciIsInNldEZvY3VzIl0sIm1hcHBpbmdzIjoiOztRQUFBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBOzs7UUFHQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQSxLQUFLO1FBQ0w7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwyQkFBMkIsMEJBQTBCLEVBQUU7UUFDdkQsaUNBQWlDLGVBQWU7UUFDaEQ7UUFDQTtRQUNBOztRQUVBO1FBQ0Esc0RBQXNELCtEQUErRDs7UUFFckg7UUFDQTs7UUFFQTtRQUNB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O0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsdUIiLCJmaWxlIjoiYXBwLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7XG4gXHRcdFx0XHRjb25maWd1cmFibGU6IGZhbHNlLFxuIFx0XHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcbiBcdFx0XHRcdGdldDogZ2V0dGVyXG4gXHRcdFx0fSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiL2NvZGViYXNlL1wiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IDM4KTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyB3ZWJwYWNrL2Jvb3RzdHJhcCBiMTIxYTk4YjEzZjE5MTE0OTZmMSIsImNsYXNzIE5hdmlnYXRpb25CbG9ja2VkIHsgfVxuXG5jbGFzcyBKZXRCYXNlIHtcclxuICAgIGNvbnN0cnVjdG9yKHdlYml4KSB7XHJcbiAgICAgICAgdGhpcy53ZWJpeEpldCA9IHRydWU7XHJcbiAgICAgICAgdGhpcy53ZWJpeCA9IHdlYml4O1xyXG4gICAgICAgIHRoaXMuX2V2ZW50cyA9IFtdO1xyXG4gICAgICAgIHRoaXMuX3N1YnMgPSB7fTtcclxuICAgICAgICB0aGlzLl9kYXRhID0ge307XHJcbiAgICB9XHJcbiAgICBnZXRSb290KCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9yb290O1xyXG4gICAgfVxyXG4gICAgZGVzdHJ1Y3RvcigpIHtcclxuICAgICAgICB0aGlzLl9kZXRhY2hFdmVudHMoKTtcclxuICAgICAgICB0aGlzLl9kZXN0cm95U3VicygpO1xyXG4gICAgICAgIHRoaXMuX2V2ZW50cyA9IHRoaXMuX2NvbnRhaW5lciA9IHRoaXMuYXBwID0gdGhpcy5fcGFyZW50ID0gdGhpcy5fcm9vdCA9IG51bGw7XHJcbiAgICB9XHJcbiAgICBzZXRQYXJhbShpZCwgdmFsdWUsIHVybCkge1xyXG4gICAgICAgIGlmICh0aGlzLl9kYXRhW2lkXSAhPT0gdmFsdWUpIHtcclxuICAgICAgICAgICAgdGhpcy5fZGF0YVtpZF0gPSB2YWx1ZTtcclxuICAgICAgICAgICAgdGhpcy5fc2VnbWVudC51cGRhdGUoaWQsIHZhbHVlLCAwKTtcclxuICAgICAgICAgICAgaWYgKHVybCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuc2hvdyhudWxsKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGdldFBhcmFtKGlkLCBwYXJlbnQpIHtcclxuICAgICAgICBjb25zdCB2YWx1ZSA9IHRoaXMuX2RhdGFbaWRdO1xyXG4gICAgICAgIGlmICh0eXBlb2YgdmFsdWUgIT09IFwidW5kZWZpbmVkXCIgfHwgIXBhcmVudCkge1xyXG4gICAgICAgICAgICByZXR1cm4gdmFsdWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNvbnN0IHZpZXcgPSB0aGlzLmdldFBhcmVudFZpZXcoKTtcclxuICAgICAgICBpZiAodmlldykge1xyXG4gICAgICAgICAgICByZXR1cm4gdmlldy5nZXRQYXJhbShpZCwgcGFyZW50KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBnZXRVcmwoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX3NlZ21lbnQuc3VidXJsKCk7XHJcbiAgICB9XHJcbiAgICBnZXRVcmxTdHJpbmcoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX3NlZ21lbnQudG9TdHJpbmcoKTtcclxuICAgIH1cclxuICAgIGdldFBhcmVudFZpZXcoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX3BhcmVudDtcclxuICAgIH1cclxuICAgICQkKGlkKSB7XHJcbiAgICAgICAgaWYgKHR5cGVvZiBpZCA9PT0gXCJzdHJpbmdcIikge1xyXG4gICAgICAgICAgICBjb25zdCByb290ID0gdGhpcy5nZXRSb290KCk7XHJcbiAgICAgICAgICAgIHJldHVybiByb290LnF1ZXJ5Vmlldygob2JqID0+IChvYmouY29uZmlnLmlkID09PSBpZCB8fCBvYmouY29uZmlnLmxvY2FsSWQgPT09IGlkKSAmJlxyXG4gICAgICAgICAgICAgICAgKG9iai4kc2NvcGUgPT09IHJvb3QuJHNjb3BlKSksIFwic2VsZlwiKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIHJldHVybiBpZDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBvbihvYmosIG5hbWUsIGNvZGUpIHtcclxuICAgICAgICBjb25zdCBpZCA9IG9iai5hdHRhY2hFdmVudChuYW1lLCBjb2RlKTtcclxuICAgICAgICB0aGlzLl9ldmVudHMucHVzaCh7IG9iaiwgaWQgfSk7XHJcbiAgICAgICAgcmV0dXJuIGlkO1xyXG4gICAgfVxyXG4gICAgY29udGFpbnModmlldykge1xyXG4gICAgICAgIGZvciAoY29uc3Qga2V5IGluIHRoaXMuX3N1YnMpIHtcclxuICAgICAgICAgICAgY29uc3Qga2lkID0gdGhpcy5fc3Vic1trZXldLnZpZXc7XHJcbiAgICAgICAgICAgIGlmIChraWQgPT09IHZpZXcgfHwga2lkLmNvbnRhaW5zKHZpZXcpKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcbiAgICBnZXRTdWJWaWV3KG5hbWUpIHtcclxuICAgICAgICBjb25zdCBzdWIgPSB0aGlzLmdldFN1YlZpZXdJbmZvKG5hbWUpO1xyXG4gICAgICAgIGlmIChzdWIpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHN1Yi5zdWJ2aWV3LnZpZXc7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgZ2V0U3ViVmlld0luZm8obmFtZSkge1xyXG4gICAgICAgIGNvbnN0IHN1YiA9IHRoaXMuX3N1YnNbbmFtZSB8fCBcImRlZmF1bHRcIl07XHJcbiAgICAgICAgaWYgKHN1Yikge1xyXG4gICAgICAgICAgICByZXR1cm4geyBzdWJ2aWV3OiBzdWIsIHBhcmVudDogdGhpcyB9O1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAobmFtZSA9PT0gXCJfdG9wXCIpIHtcclxuICAgICAgICAgICAgdGhpcy5fc3Vic1tuYW1lXSA9IHsgdXJsOiBcIlwiLCBpZDogbnVsbCwgcG9wdXA6IHRydWUgfTtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZ2V0U3ViVmlld0luZm8obmFtZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIHdoZW4gY2FsbGVkIGZyb20gYSBjaGlsZCB2aWV3LCBzZWFyY2hlcyBmb3IgbmVhcmVzdCBwYXJlbnQgd2l0aCBzdWJ2aWV3XHJcbiAgICAgICAgaWYgKHRoaXMuX3BhcmVudCkge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fcGFyZW50LmdldFN1YlZpZXdJbmZvKG5hbWUpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgIH1cclxuICAgIF9kZXRhY2hFdmVudHMoKSB7XHJcbiAgICAgICAgY29uc3QgZXZlbnRzID0gdGhpcy5fZXZlbnRzO1xyXG4gICAgICAgIGZvciAobGV0IGkgPSBldmVudHMubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIHtcclxuICAgICAgICAgICAgZXZlbnRzW2ldLm9iai5kZXRhY2hFdmVudChldmVudHNbaV0uaWQpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIF9kZXN0cm95U3VicygpIHtcclxuICAgICAgICAvLyBkZXN0cm95IHN1YiB2aWV3c1xyXG4gICAgICAgIGZvciAoY29uc3Qga2V5IGluIHRoaXMuX3N1YnMpIHtcclxuICAgICAgICAgICAgY29uc3Qgc3ViVmlldyA9IHRoaXMuX3N1YnNba2V5XS52aWV3O1xyXG4gICAgICAgICAgICAvLyBpdCBwb3NzaWJsZSB0aGF0IHN1YnZpZXcgd2FzIG5vdCBsb2FkZWQgd2l0aCBhbnkgY29udGVudCB5ZXRcclxuICAgICAgICAgICAgLy8gc28gY2hlY2sgb24gbnVsbFxyXG4gICAgICAgICAgICBpZiAoc3ViVmlldykge1xyXG4gICAgICAgICAgICAgICAgc3ViVmlldy5kZXN0cnVjdG9yKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gcmVzZXQgdG8gcHJldmVudCBtZW1vcnkgbGVha3NcclxuICAgICAgICB0aGlzLl9zdWJzID0ge307XHJcbiAgICB9XHJcbiAgICBfaW5pdF91cmxfZGF0YSgpIHtcclxuICAgICAgICBjb25zdCB1cmwgPSB0aGlzLl9zZWdtZW50LmN1cnJlbnQoKTtcclxuICAgICAgICB0aGlzLl9kYXRhID0ge307XHJcbiAgICAgICAgdGhpcy53ZWJpeC5leHRlbmQodGhpcy5fZGF0YSwgdXJsLnBhcmFtcywgdHJ1ZSk7XHJcbiAgICB9XHJcbiAgICBfZ2V0RGVmYXVsdFN1YigpIHtcclxuICAgICAgICBpZiAodGhpcy5fc3Vicy5kZWZhdWx0KSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9zdWJzLmRlZmF1bHQ7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGZvciAoY29uc3Qga2V5IGluIHRoaXMuX3N1YnMpIHtcclxuICAgICAgICAgICAgY29uc3Qgc3ViID0gdGhpcy5fc3Vic1trZXldO1xyXG4gICAgICAgICAgICBpZiAoIXN1Yi5icmFuY2ggJiYgc3ViLnZpZXcgJiYga2V5ICE9PSBcIl90b3BcIikge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgY2hpbGQgPSBzdWIudmlldy5fZ2V0RGVmYXVsdFN1YigpO1xyXG4gICAgICAgICAgICAgICAgaWYgKGNoaWxkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGNoaWxkO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgX3JvdXRlZF92aWV3KCkge1xyXG4gICAgICAgIGNvbnN0IHBhcmVudCA9IHRoaXMuZ2V0UGFyZW50VmlldygpO1xyXG4gICAgICAgIGlmICghcGFyZW50KSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjb25zdCBzdWIgPSBwYXJlbnQuX2dldERlZmF1bHRTdWIoKTtcclxuICAgICAgICBpZiAoIXN1YiAmJiBzdWIgIT09IHRoaXMpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gcGFyZW50Ll9yb3V0ZWRfdmlldygpO1xyXG4gICAgfVxyXG59XG5cbmZ1bmN0aW9uIHBhcnNlKHVybCkge1xyXG4gICAgLy8gcmVtb3ZlIHN0YXJ0aW5nIC9cclxuICAgIGlmICh1cmxbMF0gPT09IFwiL1wiKSB7XHJcbiAgICAgICAgdXJsID0gdXJsLnN1YnN0cigxKTtcclxuICAgIH1cclxuICAgIC8vIHNwbGl0IHVybCBieSBcIi9cIlxyXG4gICAgY29uc3QgcGFydHMgPSB1cmwuc3BsaXQoXCIvXCIpO1xyXG4gICAgY29uc3QgY2h1bmtzID0gW107XHJcbiAgICAvLyBmb3IgZWFjaCBwYWdlIGluIHVybFxyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBwYXJ0cy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgIGNvbnN0IHRlc3QgPSBwYXJ0c1tpXTtcclxuICAgICAgICBjb25zdCByZXN1bHQgPSB7fTtcclxuICAgICAgICAvLyBkZXRlY3QgcGFyYW1zXHJcbiAgICAgICAgLy8gc3VwcG9ydCBvbGQgXHRcdFx0c29tZTphPWI6Yz1kXHJcbiAgICAgICAgLy8gYW5kIG5ldyBub3RhdGlvblx0XHRzb21lP2E9YiZjPWRcclxuICAgICAgICBsZXQgcG9zID0gdGVzdC5pbmRleE9mKFwiOlwiKTtcclxuICAgICAgICBpZiAocG9zID09PSAtMSkge1xyXG4gICAgICAgICAgICBwb3MgPSB0ZXN0LmluZGV4T2YoXCI/XCIpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAocG9zICE9PSAtMSkge1xyXG4gICAgICAgICAgICBjb25zdCBwYXJhbXMgPSB0ZXN0LnN1YnN0cihwb3MgKyAxKS5zcGxpdCgvW1xcOlxcP1xcJl0vZyk7XHJcbiAgICAgICAgICAgIC8vIGNyZWF0ZSBoYXNoIG9mIG5hbWVkIHBhcmFtc1xyXG4gICAgICAgICAgICBmb3IgKGNvbnN0IHBhcmFtIG9mIHBhcmFtcykge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgZGNodW5rID0gcGFyYW0uc3BsaXQoXCI9XCIpO1xyXG4gICAgICAgICAgICAgICAgcmVzdWx0W2RjaHVua1swXV0gPSBkZWNvZGVVUklDb21wb25lbnQoZGNodW5rWzFdKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICAvLyBzdG9yZSBwYXJzZWQgdmFsdWVzXHJcbiAgICAgICAgY2h1bmtzW2ldID0ge1xyXG4gICAgICAgICAgICBwYWdlOiAocG9zID4gLTEgPyB0ZXN0LnN1YnN0cigwLCBwb3MpIDogdGVzdCksXHJcbiAgICAgICAgICAgIHBhcmFtczogcmVzdWx0LFxyXG4gICAgICAgICAgICBpc05ldzogdHJ1ZVxyXG4gICAgICAgIH07XHJcbiAgICB9XHJcbiAgICAvLyByZXR1cm4gYXJyYXkgb2YgcGFnZSBvYmplY3RzXHJcbiAgICByZXR1cm4gY2h1bmtzO1xyXG59XHJcbmZ1bmN0aW9uIHVybDJzdHIoc3RhY2spIHtcclxuICAgIGNvbnN0IHVybCA9IFtdO1xyXG4gICAgZm9yIChjb25zdCBjaHVuayBvZiBzdGFjaykge1xyXG4gICAgICAgIHVybC5wdXNoKFwiL1wiICsgY2h1bmsucGFnZSk7XHJcbiAgICAgICAgY29uc3QgcGFyYW1zID0gb2JqMnN0cihjaHVuay5wYXJhbXMpO1xyXG4gICAgICAgIGlmIChwYXJhbXMpIHtcclxuICAgICAgICAgICAgdXJsLnB1c2goXCI/XCIgKyBwYXJhbXMpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiB1cmwuam9pbihcIlwiKTtcclxufVxyXG5mdW5jdGlvbiBvYmoyc3RyKG9iaikge1xyXG4gICAgY29uc3Qgc3RyID0gW107XHJcbiAgICBmb3IgKGNvbnN0IGtleSBpbiBvYmopIHtcclxuICAgICAgICBpZiAoc3RyLmxlbmd0aCkge1xyXG4gICAgICAgICAgICBzdHIucHVzaChcIiZcIik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHN0ci5wdXNoKGtleSArIFwiPVwiICsgZW5jb2RlVVJJQ29tcG9uZW50KG9ialtrZXldKSk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gc3RyLmpvaW4oXCJcIik7XHJcbn1cblxuY2xhc3MgUm91dGUge1xyXG4gICAgY29uc3RydWN0b3Iocm91dGUsIGluZGV4KSB7XHJcbiAgICAgICAgdGhpcy5fbmV4dCA9IDE7XHJcbiAgICAgICAgaWYgKHR5cGVvZiByb3V0ZSA9PT0gXCJzdHJpbmdcIikge1xyXG4gICAgICAgICAgICB0aGlzLnJvdXRlID0ge1xyXG4gICAgICAgICAgICAgICAgdXJsOiBwYXJzZShyb3V0ZSksXHJcbiAgICAgICAgICAgICAgICBwYXRoOiByb3V0ZVxyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5yb3V0ZSA9IHJvdXRlO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmluZGV4ID0gaW5kZXg7XHJcbiAgICB9XHJcbiAgICBjdXJyZW50KCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnJvdXRlLnVybFt0aGlzLmluZGV4XTtcclxuICAgIH1cclxuICAgIG5leHQoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMucm91dGUudXJsW3RoaXMuaW5kZXggKyB0aGlzLl9uZXh0XTtcclxuICAgIH1cclxuICAgIHN1YnVybCgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5yb3V0ZS51cmwuc2xpY2UodGhpcy5pbmRleCk7XHJcbiAgICB9XHJcbiAgICBzaGlmdCgpIHtcclxuICAgICAgICByZXR1cm4gbmV3IFJvdXRlKHRoaXMucm91dGUsIHRoaXMuaW5kZXggKyB0aGlzLl9uZXh0KTtcclxuICAgIH1cclxuICAgIHJlZnJlc2goKSB7XHJcbiAgICAgICAgY29uc3QgdXJsID0gdGhpcy5yb3V0ZS51cmw7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IHRoaXMuaW5kZXggKyAxOyBpIDwgdXJsLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIHVybFtpXS5pc05ldyA9IHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgdG9TdHJpbmcoKSB7XHJcbiAgICAgICAgY29uc3Qgc3RyID0gdXJsMnN0cih0aGlzLnN1YnVybCgpKTtcclxuICAgICAgICByZXR1cm4gc3RyID8gc3RyLnN1YnN0cigxKSA6IFwiXCI7XHJcbiAgICB9XHJcbiAgICBfam9pbihwYXRoLCBraWRzKSB7XHJcbiAgICAgICAgbGV0IHVybCA9IHRoaXMucm91dGUudXJsO1xyXG4gICAgICAgIGlmIChwYXRoID09PSBudWxsKSB7IC8vIGNoYW5nZSBvZiBwYXJhbWV0ZXJzLCByb3V0ZSBlbGVtZW50cyBhcmUgbm90IGFmZmVjdGVkXHJcbiAgICAgICAgICAgIHJldHVybiB1cmw7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNvbnN0IG9sZCA9IHRoaXMucm91dGUudXJsO1xyXG4gICAgICAgIHVybCA9IG9sZC5zbGljZSgwLCB0aGlzLmluZGV4ICsgKGtpZHMgPyB0aGlzLl9uZXh0IDogMCkpO1xyXG4gICAgICAgIGlmIChwYXRoKSB7XHJcbiAgICAgICAgICAgIHVybCA9IHVybC5jb25jYXQocGFyc2UocGF0aCkpO1xyXG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHVybC5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgaWYgKG9sZFtpXSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHVybFtpXS52aWV3ID0gb2xkW2ldLnZpZXc7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZiAob2xkW2ldICYmIHVybFtpXS5wYWdlID09PSBvbGRbaV0ucGFnZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHVybFtpXS5pc05ldyA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB1cmw7XHJcbiAgICB9XHJcbiAgICBhcHBlbmQocGF0aCkge1xyXG4gICAgICAgIGNvbnN0IHVybCA9IHRoaXMuX2pvaW4ocGF0aCwgdHJ1ZSk7XHJcbiAgICAgICAgdGhpcy5yb3V0ZS5wYXRoID0gdXJsMnN0cih1cmwpO1xyXG4gICAgICAgIHRoaXMucm91dGUudXJsID0gdXJsO1xyXG4gICAgICAgIHJldHVybiB0aGlzLnJvdXRlLnBhdGg7XHJcbiAgICB9XHJcbiAgICBzaG93KHBhdGgsIHZpZXcsIGtpZHMpIHtcclxuICAgICAgICBjb25zdCB1cmwgPSB0aGlzLl9qb2luKHBhdGgsIGtpZHMpO1xyXG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzLCByZWopID0+IHtcclxuICAgICAgICAgICAgY29uc3QgcmVkaXJlY3QgPSB1cmwyc3RyKHVybCk7XHJcbiAgICAgICAgICAgIGNvbnN0IG9iaiA9IHtcclxuICAgICAgICAgICAgICAgIHVybCxcclxuICAgICAgICAgICAgICAgIHJlZGlyZWN0LFxyXG4gICAgICAgICAgICAgICAgY29uZmlybTogUHJvbWlzZS5yZXNvbHZlKClcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgY29uc3QgYXBwID0gdmlldyA/IHZpZXcuYXBwIDogbnVsbDtcclxuICAgICAgICAgICAgLy8gd2hlbiBjcmVhdGluZyBhIG5ldyByb3V0ZSwgaXQgcG9zc2libGUgdGhhdCBpdCB3aWxsIG5vdCBoYXZlIGFueSBjb250ZW50XHJcbiAgICAgICAgICAgIC8vIGd1YXJkIGlzIG5vdCBuZWNlc3NhcnkgaW4gc3VjaCBjYXNlXHJcbiAgICAgICAgICAgIGlmIChhcHApIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHJlc3VsdCA9IGFwcC5jYWxsRXZlbnQoXCJhcHA6Z3VhcmRcIiwgW29iai5yZWRpcmVjdCwgdmlldywgb2JqXSk7XHJcbiAgICAgICAgICAgICAgICBpZiAoIXJlc3VsdCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJlaihuZXcgTmF2aWdhdGlvbkJsb2NrZWQoKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIG9iai5jb25maXJtLmNhdGNoKGVyciA9PiByZWooZXJyKSkudGhlbigoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAob2JqLnJlZGlyZWN0ID09PSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVqKG5ldyBOYXZpZ2F0aW9uQmxvY2tlZCgpKTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZiAob2JqLnJlZGlyZWN0ICE9PSByZWRpcmVjdCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGFwcC5zaG93KG9iai5yZWRpcmVjdCk7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVqKG5ldyBOYXZpZ2F0aW9uQmxvY2tlZCgpKTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB0aGlzLnJvdXRlLnBhdGggPSByZWRpcmVjdDtcclxuICAgICAgICAgICAgICAgIHRoaXMucm91dGUudXJsID0gdXJsO1xyXG4gICAgICAgICAgICAgICAgcmVzKCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgc2l6ZShuKSB7XHJcbiAgICAgICAgdGhpcy5fbmV4dCA9IG47XHJcbiAgICB9XHJcbiAgICBzcGxpdCgpIHtcclxuICAgICAgICBjb25zdCByb3V0ZSA9IHtcclxuICAgICAgICAgICAgdXJsOiB0aGlzLnJvdXRlLnVybC5zbGljZSh0aGlzLmluZGV4ICsgMSksXHJcbiAgICAgICAgICAgIHBhdGg6IFwiXCJcclxuICAgICAgICB9O1xyXG4gICAgICAgIGlmIChyb3V0ZS51cmwubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgIHJvdXRlLnBhdGggPSB1cmwyc3RyKHJvdXRlLnVybCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBuZXcgUm91dGUocm91dGUsIDApO1xyXG4gICAgfVxyXG4gICAgdXBkYXRlKG5hbWUsIHZhbHVlLCBpbmRleCkge1xyXG4gICAgICAgIGNvbnN0IGNodW5rID0gdGhpcy5yb3V0ZS51cmxbdGhpcy5pbmRleCArIChpbmRleCB8fCAwKV07XHJcbiAgICAgICAgaWYgKCFjaHVuaykge1xyXG4gICAgICAgICAgICB0aGlzLnJvdXRlLnVybC5wdXNoKHsgcGFnZTogXCJcIiwgcGFyYW1zOiB7fSB9KTtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMudXBkYXRlKG5hbWUsIHZhbHVlLCBpbmRleCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChuYW1lID09PSBcIlwiKSB7XHJcbiAgICAgICAgICAgIGNodW5rLnBhZ2UgPSB2YWx1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIGNodW5rLnBhcmFtc1tuYW1lXSA9IHZhbHVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLnJvdXRlLnBhdGggPSB1cmwyc3RyKHRoaXMucm91dGUudXJsKTtcclxuICAgIH1cclxufVxuXG5jbGFzcyBKZXRWaWV3IGV4dGVuZHMgSmV0QmFzZSB7XHJcbiAgICBjb25zdHJ1Y3RvcihhcHAsIGNvbmZpZykge1xyXG4gICAgICAgIHN1cGVyKGFwcC53ZWJpeCk7XHJcbiAgICAgICAgdGhpcy5hcHAgPSBhcHA7XHJcbiAgICAgICAgLy90aGlzLiRjb25maWcgPSBjb25maWc7XHJcbiAgICAgICAgdGhpcy5fY2hpbGRyZW4gPSBbXTtcclxuICAgIH1cclxuICAgIHVpKHVpLCBjb25maWcpIHtcclxuICAgICAgICBjb25maWcgPSBjb25maWcgfHwge307XHJcbiAgICAgICAgY29uc3QgY29udGFpbmVyID0gY29uZmlnLmNvbnRhaW5lciB8fCB1aS5jb250YWluZXI7XHJcbiAgICAgICAgY29uc3QgamV0dmlldyA9IHRoaXMuYXBwLmNyZWF0ZVZpZXcodWkpO1xyXG4gICAgICAgIHRoaXMuX2NoaWxkcmVuLnB1c2goamV0dmlldyk7XHJcbiAgICAgICAgamV0dmlldy5yZW5kZXIoY29udGFpbmVyLCB0aGlzLl9zZWdtZW50LCB0aGlzKTtcclxuICAgICAgICBpZiAodHlwZW9mIHVpICE9PSBcIm9iamVjdFwiIHx8ICh1aSBpbnN0YW5jZW9mIEpldEJhc2UpKSB7XHJcbiAgICAgICAgICAgIC8vIHJhdyB3ZWJpeCBVSVxyXG4gICAgICAgICAgICByZXR1cm4gamV0dmlldztcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIHJldHVybiBqZXR2aWV3LmdldFJvb3QoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBzaG93KHBhdGgsIGNvbmZpZykge1xyXG4gICAgICAgIGNvbmZpZyA9IGNvbmZpZyB8fCB7fTtcclxuICAgICAgICAvLyBjb252ZXJ0IHBhcmFtZXRlcnMgb2JqZWN0IHRvIHVybFxyXG4gICAgICAgIGlmICh0eXBlb2YgcGF0aCA9PT0gXCJvYmplY3RcIikge1xyXG4gICAgICAgICAgICBmb3IgKGNvbnN0IGtleSBpbiBwYXRoKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNldFBhcmFtKGtleSwgcGF0aFtrZXldKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBwYXRoID0gbnVsbDtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIC8vIGRlbGlnYXRlIHRvIGFwcCBpbiBjYXNlIG9mIHJvb3QgcHJlZml4XHJcbiAgICAgICAgICAgIGlmIChwYXRoLnN1YnN0cigwLCAxKSA9PT0gXCIvXCIpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmFwcC5zaG93KHBhdGgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIC8vIGxvY2FsIHBhdGgsIGRvIG5vdGhpbmdcclxuICAgICAgICAgICAgaWYgKHBhdGguaW5kZXhPZihcIi4vXCIpID09PSAwKSB7XHJcbiAgICAgICAgICAgICAgICBwYXRoID0gcGF0aC5zdWJzdHIoMik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgLy8gcGFyZW50IHBhdGgsIGNhbGwgcGFyZW50IHZpZXdcclxuICAgICAgICAgICAgaWYgKHBhdGguaW5kZXhPZihcIi4uL1wiKSA9PT0gMCkge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgcGFyZW50ID0gdGhpcy5nZXRQYXJlbnRWaWV3KCk7XHJcbiAgICAgICAgICAgICAgICBpZiAocGFyZW50KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHBhcmVudC5zaG93KHBhdGguc3Vic3RyKDMpLCBjb25maWcpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuYXBwLnNob3coXCIvXCIgKyBwYXRoLnN1YnN0cigzKSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY29uc3Qgc3ViID0gdGhpcy5nZXRTdWJWaWV3SW5mbyhjb25maWcudGFyZ2V0KTtcclxuICAgICAgICAgICAgaWYgKHN1Yikge1xyXG4gICAgICAgICAgICAgICAgaWYgKHN1Yi5wYXJlbnQgIT09IHRoaXMpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gc3ViLnBhcmVudC5zaG93KHBhdGgsIGNvbmZpZyk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlIGlmIChjb25maWcudGFyZ2V0ICYmIGNvbmZpZy50YXJnZXQgIT09IFwiZGVmYXVsdFwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3JlbmRlckZyYW1lTG9jayhjb25maWcudGFyZ2V0LCBzdWIuc3VidmlldywgcGF0aCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBpZiAocGF0aCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmFwcC5zaG93KFwiL1wiICsgcGF0aCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX3Nob3codGhpcy5fc2VnbWVudCwgcGF0aCwgdGhpcyk7XHJcbiAgICB9XHJcbiAgICBfc2hvdyhzZWdtZW50LCBwYXRoLCB2aWV3KSB7XHJcbiAgICAgICAgcmV0dXJuIHNlZ21lbnQuc2hvdyhwYXRoLCB2aWV3LCB0cnVlKS50aGVuKCgpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5faW5pdF91cmxfZGF0YSgpO1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fdXJsQ2hhbmdlKCk7XHJcbiAgICAgICAgfSkudGhlbigoKSA9PiB7XHJcbiAgICAgICAgICAgIGlmIChzZWdtZW50LnJvdXRlLmxpbmtSb3V0ZXIpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuYXBwLmdldFJvdXRlcigpLnNldChzZWdtZW50LnJvdXRlLnBhdGgsIHsgc2lsZW50OiB0cnVlIH0pO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5hcHAuY2FsbEV2ZW50KFwiYXBwOnJvdXRlXCIsIFtzZWdtZW50LnJvdXRlLnBhdGhdKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgaW5pdChfJHZpZXcsIF8kKSB7XHJcbiAgICAgICAgLy8gc3R1YlxyXG4gICAgfVxyXG4gICAgcmVhZHkoXyR2aWV3LCBfJHVybCkge1xyXG4gICAgICAgIC8vIHN0dWJcclxuICAgIH1cclxuICAgIGNvbmZpZygpIHtcclxuICAgICAgICB0aGlzLmFwcC53ZWJpeC5tZXNzYWdlKFwiVmlldzpDb25maWcgaXMgbm90IGltcGxlbWVudGVkXCIpO1xyXG4gICAgfVxyXG4gICAgdXJsQ2hhbmdlKF8kdmlldywgXyR1cmwpIHtcclxuICAgICAgICAvLyBzdHViXHJcbiAgICB9XHJcbiAgICBkZXN0cm95KCkge1xyXG4gICAgICAgIC8vIHN0dWJcclxuICAgIH1cclxuICAgIGRlc3RydWN0b3IoKSB7XHJcbiAgICAgICAgdGhpcy5kZXN0cm95KCk7XHJcbiAgICAgICAgdGhpcy5fZGVzdHJveUtpZHMoKTtcclxuICAgICAgICAvLyBkZXN0cm95IGFjdHVhbCBVSVxyXG4gICAgICAgIHRoaXMuX3Jvb3QuZGVzdHJ1Y3RvcigpO1xyXG4gICAgICAgIHN1cGVyLmRlc3RydWN0b3IoKTtcclxuICAgIH1cclxuICAgIHVzZShwbHVnaW4sIGNvbmZpZykge1xyXG4gICAgICAgIHBsdWdpbih0aGlzLmFwcCwgdGhpcywgY29uZmlnKTtcclxuICAgIH1cclxuICAgIHJlZnJlc2goKSB7XHJcbiAgICAgICAgY29uc3QgdXJsID0gdGhpcy5nZXRVcmwoKTtcclxuICAgICAgICB0aGlzLmRlc3Ryb3koKTtcclxuICAgICAgICB0aGlzLl9kZXN0cm95S2lkcygpO1xyXG4gICAgICAgIHRoaXMuX2Rlc3Ryb3lTdWJzKCk7XHJcbiAgICAgICAgdGhpcy5fZGV0YWNoRXZlbnRzKCk7XHJcbiAgICAgICAgaWYgKHRoaXMuX2NvbnRhaW5lci50YWdOYW1lKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX3Jvb3QuZGVzdHJ1Y3RvcigpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLl9zZWdtZW50LnJlZnJlc2goKTtcclxuICAgICAgICByZXR1cm4gdGhpcy5fcmVuZGVyKHRoaXMuX3NlZ21lbnQpO1xyXG4gICAgfVxyXG4gICAgcmVuZGVyKHJvb3QsIHVybCwgcGFyZW50KSB7XHJcbiAgICAgICAgaWYgKHR5cGVvZiB1cmwgPT09IFwic3RyaW5nXCIpIHtcclxuICAgICAgICAgICAgdXJsID0gbmV3IFJvdXRlKHVybCwgMCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuX3NlZ21lbnQgPSB1cmw7XHJcbiAgICAgICAgdGhpcy5fcGFyZW50ID0gcGFyZW50O1xyXG4gICAgICAgIHRoaXMuX2luaXRfdXJsX2RhdGEoKTtcclxuICAgICAgICByb290ID0gcm9vdCB8fCBkb2N1bWVudC5ib2R5O1xyXG4gICAgICAgIGNvbnN0IF9jb250YWluZXIgPSAodHlwZW9mIHJvb3QgPT09IFwic3RyaW5nXCIpID8gdGhpcy53ZWJpeC50b05vZGUocm9vdCkgOiByb290O1xyXG4gICAgICAgIGlmICh0aGlzLl9jb250YWluZXIgIT09IF9jb250YWluZXIpIHtcclxuICAgICAgICAgICAgdGhpcy5fY29udGFpbmVyID0gX2NvbnRhaW5lcjtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3JlbmRlcih1cmwpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3VybENoYW5nZSgpLnRoZW4oKCkgPT4gdGhpcy5nZXRSb290KCkpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIF9yZW5kZXIodXJsKSB7XHJcbiAgICAgICAgY29uc3QgY29uZmlnID0gdGhpcy5jb25maWcoKTtcclxuICAgICAgICBpZiAoY29uZmlnLnRoZW4pIHtcclxuICAgICAgICAgICAgcmV0dXJuIGNvbmZpZy50aGVuKGNmZyA9PiB0aGlzLl9yZW5kZXJfZmluYWwoY2ZnLCB1cmwpKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9yZW5kZXJfZmluYWwoY29uZmlnLCB1cmwpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIF9yZW5kZXJfZmluYWwoY29uZmlnLCB1cmwpIHtcclxuICAgICAgICAvLyBnZXQgcHJldmlvdXMgdmlldyBpbiB0aGUgc2FtZSBzbG90XHJcbiAgICAgICAgbGV0IHNsb3QgPSBudWxsO1xyXG4gICAgICAgIGxldCBjb250YWluZXIgPSBudWxsO1xyXG4gICAgICAgIGxldCBzaG93ID0gZmFsc2U7XHJcbiAgICAgICAgaWYgKCF0aGlzLl9jb250YWluZXIudGFnTmFtZSkge1xyXG4gICAgICAgICAgICBzbG90ID0gdGhpcy5fY29udGFpbmVyO1xyXG4gICAgICAgICAgICBpZiAoc2xvdC5wb3B1cCkge1xyXG4gICAgICAgICAgICAgICAgY29udGFpbmVyID0gZG9jdW1lbnQuYm9keTtcclxuICAgICAgICAgICAgICAgIHNob3cgPSB0cnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgY29udGFpbmVyID0gdGhpcy53ZWJpeC4kJChzbG90LmlkKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgY29udGFpbmVyID0gdGhpcy5fY29udGFpbmVyO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvLyB2aWV3IGFscmVhZHkgZGVzdHJveWVkXHJcbiAgICAgICAgaWYgKCF0aGlzLmFwcCB8fCAhY29udGFpbmVyKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdChudWxsKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IHJlc3BvbnNlO1xyXG4gICAgICAgIGNvbnN0IGN1cnJlbnQgPSB0aGlzLl9zZWdtZW50LmN1cnJlbnQoKTtcclxuICAgICAgICAvLyB1c2luZyB3cmFwcGVyIG9iamVjdCwgc28gdWkgY2FuIGJlIGNoYW5nZWQgZnJvbSBhcHA6cmVuZGVyIGV2ZW50XHJcbiAgICAgICAgY29uc3QgcmVzdWx0ID0geyB1aToge30gfTtcclxuICAgICAgICB0aGlzLmFwcC5jb3B5Q29uZmlnKGNvbmZpZywgcmVzdWx0LnVpLCB0aGlzLl9zdWJzKTtcclxuICAgICAgICB0aGlzLmFwcC5jYWxsRXZlbnQoXCJhcHA6cmVuZGVyXCIsIFt0aGlzLCB1cmwsIHJlc3VsdF0pO1xyXG4gICAgICAgIHJlc3VsdC51aS4kc2NvcGUgPSB0aGlzO1xyXG4gICAgICAgIC8qIGRlc3Ryb3kgb2xkIEhUTUwgYXR0YWNoZWQgdmlld3MgYmVmb3JlIGNyZWF0aW5nIG5ldyBvbmUgKi9cclxuICAgICAgICBpZiAoIXNsb3QgJiYgY3VycmVudC5pc05ldyAmJiBjdXJyZW50LnZpZXcpIHtcclxuICAgICAgICAgICAgY3VycmVudC52aWV3LmRlc3RydWN0b3IoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgLy8gc3BlY2lhbCBoYW5kbGluZyBmb3IgYWRkaW5nIGluc2lkZSBvZiBtdWx0aXZpZXcgLSBwcmVzZXJ2ZSBvbGQgaWRcclxuICAgICAgICAgICAgaWYgKHNsb3QgJiYgIXNob3cpIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IG9sZHVpID0gY29udGFpbmVyO1xyXG4gICAgICAgICAgICAgICAgY29uc3QgcGFyZW50ID0gb2xkdWkuZ2V0UGFyZW50VmlldygpO1xyXG4gICAgICAgICAgICAgICAgaWYgKHBhcmVudCAmJiBwYXJlbnQubmFtZSA9PT0gXCJtdWx0aXZpZXdcIiAmJiAhcmVzdWx0LnVpLmlkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0LnVpLmlkID0gb2xkdWkuY29uZmlnLmlkO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMuX3Jvb3QgPSB0aGlzLmFwcC53ZWJpeC51aShyZXN1bHQudWksIGNvbnRhaW5lcik7XHJcbiAgICAgICAgICAgIGNvbnN0IGFzV2luID0gdGhpcy5fcm9vdDtcclxuICAgICAgICAgICAgLy8gY2hlY2sgZm9yIHVybCBhZGRlZCB0byBpZ25vcmUgdGhpcy51aSBjYWxsc1xyXG4gICAgICAgICAgICBpZiAoc2hvdyAmJiBhc1dpbi5zZXRQb3NpdGlvbiAmJiAhYXNXaW4uaXNWaXNpYmxlKCkpIHtcclxuICAgICAgICAgICAgICAgIGFzV2luLnNob3coKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAvLyBjaGVjaywgaWYgd2UgYXJlIHJlcGxhY2luZyBzb21lIG9sZGVyIHZpZXdcclxuICAgICAgICAgICAgaWYgKHNsb3QpIHtcclxuICAgICAgICAgICAgICAgIGlmIChzbG90LnZpZXcgJiYgc2xvdC52aWV3ICE9PSB0aGlzICYmIHNsb3QudmlldyAhPT0gdGhpcy5hcHApIHtcclxuICAgICAgICAgICAgICAgICAgICBzbG90LnZpZXcuZGVzdHJ1Y3RvcigpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgc2xvdC5pZCA9IHRoaXMuX3Jvb3QuY29uZmlnLmlkO1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuZ2V0UGFyZW50VmlldygpIHx8ICF0aGlzLmFwcC5hcHApXHJcbiAgICAgICAgICAgICAgICAgICAgc2xvdC52aWV3ID0gdGhpcztcclxuICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIHdoZW4gd2UgaGF2ZSBzdWJhcHAsIHNldCB3aG9sZSBhcHAgYXMgYSB2aWV3XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gc28gb24gZGVzdHJ1Y3Rpb24sIHRoZSB3aG9sZSBhcHAgd2lsbCBiZSBkZXN0cm95ZWRcclxuICAgICAgICAgICAgICAgICAgICBzbG90LnZpZXcgPSB0aGlzLmFwcDtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoY3VycmVudC5pc05ldykge1xyXG4gICAgICAgICAgICAgICAgY3VycmVudC52aWV3ID0gdGhpcztcclxuICAgICAgICAgICAgICAgIGN1cnJlbnQuaXNOZXcgPSBmYWxzZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXNwb25zZSA9IFByb21pc2UucmVzb2x2ZSh0aGlzLl9pbml0KHRoaXMuX3Jvb3QsIHVybCkpLnRoZW4oKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3VybENoYW5nZSgpLnRoZW4oKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2luaXRVcmwgPSBudWxsO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLnJlYWR5KHRoaXMuX3Jvb3QsIHVybC5zdWJ1cmwoKSk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNhdGNoIChlKSB7XHJcbiAgICAgICAgICAgIHJlc3BvbnNlID0gUHJvbWlzZS5yZWplY3QoZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiByZXNwb25zZS5jYXRjaChlcnIgPT4gdGhpcy5faW5pdEVycm9yKHRoaXMsIGVycikpO1xyXG4gICAgfVxyXG4gICAgX2luaXQodmlldywgdXJsKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuaW5pdCh2aWV3LCB1cmwuc3VidXJsKCkpO1xyXG4gICAgfVxyXG4gICAgX3VybENoYW5nZSgpIHtcclxuICAgICAgICB0aGlzLmFwcC5jYWxsRXZlbnQoXCJhcHA6dXJsY2hhbmdlXCIsIFt0aGlzLCB0aGlzLl9zZWdtZW50XSk7XHJcbiAgICAgICAgY29uc3Qgd2FpdHMgPSBbXTtcclxuICAgICAgICBmb3IgKGNvbnN0IGtleSBpbiB0aGlzLl9zdWJzKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGZyYW1lID0gdGhpcy5fc3Vic1trZXldO1xyXG4gICAgICAgICAgICBjb25zdCB3YWl0ID0gdGhpcy5fcmVuZGVyRnJhbWVMb2NrKGtleSwgZnJhbWUsIG51bGwpO1xyXG4gICAgICAgICAgICBpZiAod2FpdCkge1xyXG4gICAgICAgICAgICAgICAgd2FpdHMucHVzaCh3YWl0KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gUHJvbWlzZS5hbGwod2FpdHMpLnRoZW4oKCkgPT4ge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy51cmxDaGFuZ2UodGhpcy5fcm9vdCwgdGhpcy5fc2VnbWVudC5zdWJ1cmwoKSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICBfcmVuZGVyRnJhbWVMb2NrKGtleSwgZnJhbWUsIHBhdGgpIHtcclxuICAgICAgICAvLyBpZiBzdWJ2aWV3IGlzIG5vdCBvY2N1cGllZCBieSBzb21lIHJlbmRlcmluZyB5ZXRcclxuICAgICAgICBpZiAoIWZyYW1lLmxvY2spIHtcclxuICAgICAgICAgICAgLy8gcmV0cmVpdmUgYW5kIHN0b3JlIHJlbmRlcmluZyBlbmQgcHJvbWlzZVxyXG4gICAgICAgICAgICBjb25zdCBsb2NrID0gdGhpcy5fcmVuZGVyRnJhbWUoa2V5LCBmcmFtZSwgcGF0aCk7XHJcbiAgICAgICAgICAgIGlmIChsb2NrKSB7XHJcbiAgICAgICAgICAgICAgICAvLyBjbGVhciBsb2NrIGFmdGVyIGZyYW1lIHJlbmRlcmluZ1xyXG4gICAgICAgICAgICAgICAgLy8gYXMgcHJvbWlzZS5maW5hbGx5IGlzIG5vdCBzdXBwb3J0ZWQgYnkgIFdlYml4IGxlc3NlciB0aGFuIDYuMlxyXG4gICAgICAgICAgICAgICAgLy8gdXNpbmcgYSBtb3JlIHZlcmJvc2Ugbm90YXRpb25cclxuICAgICAgICAgICAgICAgIGZyYW1lLmxvY2sgPSBsb2NrLnRoZW4oKCkgPT4gZnJhbWUubG9jayA9IG51bGwsICgpID0+IGZyYW1lLmxvY2sgPSBudWxsKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICAvLyByZXR1cm4gcmVuZGVyaW5nIGVuZCBwcm9taXNlXHJcbiAgICAgICAgcmV0dXJuIGZyYW1lLmxvY2s7XHJcbiAgICB9XHJcbiAgICBfcmVuZGVyRnJhbWUoa2V5LCBmcmFtZSwgcGF0aCkge1xyXG4gICAgICAgIC8vZGVmYXVsdCByb3V0ZVxyXG4gICAgICAgIGlmIChrZXkgPT09IFwiZGVmYXVsdFwiKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLl9zZWdtZW50Lm5leHQoKSkge1xyXG4gICAgICAgICAgICAgICAgLy8gd2UgaGF2ZSBhIG5leHQgc2VnbWVudCBpbiB1cmwsIHJlbmRlciBpdFxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2NyZWF0ZVN1YlZpZXcoZnJhbWUsIHRoaXMuX3NlZ21lbnQuc2hpZnQoKSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSBpZiAoZnJhbWUudmlldyAmJiBmcmFtZS5wb3B1cCkge1xyXG4gICAgICAgICAgICAgICAgLy8gdGhlcmUgaXMgbm8gbmV4dCBzZWdtZW50LCBkZWxldGUgdGhlIGV4aXN0aW5nIHN1Yi12aWV3XHJcbiAgICAgICAgICAgICAgICBmcmFtZS52aWV3LmRlc3RydWN0b3IoKTtcclxuICAgICAgICAgICAgICAgIGZyYW1lLnZpZXcgPSBudWxsO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vaWYgbmV3IHBhdGggcHJvdmlkZWQsIHNldCBpdCB0byB0aGUgZnJhbWVcclxuICAgICAgICBpZiAocGF0aCAhPT0gbnVsbCkge1xyXG4gICAgICAgICAgICBmcmFtZS51cmwgPSBwYXRoO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvLyBpbiBjYXNlIG9mIHJvdXRlZCBzdWItdmlld1xyXG4gICAgICAgIGlmIChmcmFtZS5yb3V0ZSkge1xyXG4gICAgICAgICAgICAvLyB3ZSBoYXZlIGEgbmV3IHBhdGggZm9yIHN1Yi12aWV3XHJcbiAgICAgICAgICAgIGlmIChwYXRoICE9PSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZnJhbWUucm91dGUuc2hvdyhwYXRoLCBmcmFtZS52aWV3KS50aGVuKCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fY3JlYXRlU3ViVmlldyhmcmFtZSwgZnJhbWUucm91dGUpO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgLy8gZG8gbm90IHRyaWdnZXIgb25DaGFuZ2UgZm9yIGlzb2xhdGVkIHN1Yi12aWV3c1xyXG4gICAgICAgICAgICBpZiAoZnJhbWUuYnJhbmNoKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IHZpZXcgPSBmcmFtZS52aWV3O1xyXG4gICAgICAgIC8vIGlmIHZpZXcgZG9lc24ndCBleGlzdHMgeWV0LCBpbml0IGl0XHJcbiAgICAgICAgaWYgKCF2aWV3ICYmIGZyYW1lLnVybCkge1xyXG4gICAgICAgICAgICBpZiAodHlwZW9mIGZyYW1lLnVybCA9PT0gXCJzdHJpbmdcIikge1xyXG4gICAgICAgICAgICAgICAgLy8gc3RyaW5nLCBzbyB3ZSBoYXZlIGlzb2xhdGVkIHN1YnZpZXcgdXJsXHJcbiAgICAgICAgICAgICAgICBmcmFtZS5yb3V0ZSA9IG5ldyBSb3V0ZShmcmFtZS51cmwsIDApO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2NyZWF0ZVN1YlZpZXcoZnJhbWUsIGZyYW1lLnJvdXRlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIC8vIG9iamVjdCwgc28gd2UgaGF2ZSBhbiBlbWJlZGVkIHN1YnZpZXdcclxuICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgZnJhbWUudXJsID09PSBcImZ1bmN0aW9uXCIgJiYgISh2aWV3IGluc3RhbmNlb2YgZnJhbWUudXJsKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHZpZXcgPSBuZXcgZnJhbWUudXJsKHRoaXMuYXBwLCBcIlwiKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmICghdmlldykge1xyXG4gICAgICAgICAgICAgICAgICAgIHZpZXcgPSBmcmFtZS51cmw7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gdHJpZ2dlciBvbkNoYW5nZSBmb3IgYWxyZWFkeSBleGlzdGVkIHZpZXdcclxuICAgICAgICBpZiAodmlldykge1xyXG4gICAgICAgICAgICByZXR1cm4gdmlldy5yZW5kZXIoZnJhbWUsIChmcmFtZS5yb3V0ZSB8fCB0aGlzLl9zZWdtZW50KSwgdGhpcyk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgX2luaXRFcnJvcih2aWV3LCBlcnIpIHtcclxuICAgICAgICAvKlxyXG4gICAgICAgICAgICBpZiB2aWV3IGlzIGRlc3Ryb3llZCwgaWdub3JlIGFueSB2aWV3IHJlbGF0ZWQgZXJyb3JzXHJcbiAgICAgICAgKi9cclxuICAgICAgICBpZiAodGhpcy5hcHApIHtcclxuICAgICAgICAgICAgdGhpcy5hcHAuZXJyb3IoXCJhcHA6ZXJyb3I6aW5pdHZpZXdcIiwgW2Vyciwgdmlld10pO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH1cclxuICAgIF9jcmVhdGVTdWJWaWV3KHN1Yiwgc3VidXJsKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuYXBwLmNyZWF0ZUZyb21VUkwoc3VidXJsLmN1cnJlbnQoKSkudGhlbih2aWV3ID0+IHtcclxuICAgICAgICAgICAgcmV0dXJuIHZpZXcucmVuZGVyKHN1Yiwgc3VidXJsLCB0aGlzKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuICAgIF9kZXN0cm95S2lkcygpIHtcclxuICAgICAgICAvLyBkZXN0cm95IGNoaWxkIHZpZXdzXHJcbiAgICAgICAgY29uc3QgdWlzID0gdGhpcy5fY2hpbGRyZW47XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IHVpcy5sZW5ndGggLSAxOyBpID49IDA7IGktLSkge1xyXG4gICAgICAgICAgICBpZiAodWlzW2ldICYmIHVpc1tpXS5kZXN0cnVjdG9yKSB7XHJcbiAgICAgICAgICAgICAgICB1aXNbaV0uZGVzdHJ1Y3RvcigpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIHJlc2V0IHZhcnMgZm9yIGJldHRlciBHQyBwcm9jZXNzaW5nXHJcbiAgICAgICAgdGhpcy5fY2hpbGRyZW4gPSBbXTtcclxuICAgIH1cclxufVxuXG4vLyB3cmFwcGVyIGZvciByYXcgb2JqZWN0cyBhbmQgSmV0IDEueCBzdHJ1Y3RzXHJcbmNsYXNzIEpldFZpZXdSYXcgZXh0ZW5kcyBKZXRWaWV3IHtcclxuICAgIGNvbnN0cnVjdG9yKGFwcCwgY29uZmlnKSB7XHJcbiAgICAgICAgc3VwZXIoYXBwLCBjb25maWcpO1xyXG4gICAgICAgIHRoaXMuX3VpID0gY29uZmlnLnVpO1xyXG4gICAgfVxyXG4gICAgY29uZmlnKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl91aTtcclxuICAgIH1cclxufVxuXG5jbGFzcyBTdWJSb3V0ZXIge1xyXG4gICAgY29uc3RydWN0b3IoY2IsIGNvbmZpZywgYXBwKSB7XHJcbiAgICAgICAgdGhpcy5wYXRoID0gXCJcIjtcclxuICAgICAgICB0aGlzLmFwcCA9IGFwcDtcclxuICAgIH1cclxuICAgIHNldChwYXRoLCBjb25maWcpIHtcclxuICAgICAgICB0aGlzLnBhdGggPSBwYXRoO1xyXG4gICAgICAgIGNvbnN0IGEgPSB0aGlzLmFwcDtcclxuICAgICAgICBhLmFwcC5nZXRSb3V0ZXIoKS5zZXQoYS5fc2VnbWVudC5hcHBlbmQodGhpcy5wYXRoKSwgeyBzaWxlbnQ6IHRydWUgfSk7XHJcbiAgICB9XHJcbiAgICBnZXQoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMucGF0aDtcclxuICAgIH1cclxufVxuXG5sZXQgX29uY2UgPSB0cnVlO1xyXG5jbGFzcyBKZXRBcHBCYXNlIGV4dGVuZHMgSmV0QmFzZSB7XHJcbiAgICBjb25zdHJ1Y3Rvcihjb25maWcpIHtcclxuICAgICAgICBjb25zdCB3ZWJpeCA9IChjb25maWcgfHwge30pLndlYml4IHx8IHdpbmRvdy53ZWJpeDtcclxuICAgICAgICBzdXBlcih3ZWJpeCk7XHJcbiAgICAgICAgLy8gaW5pdCBjb25maWdcclxuICAgICAgICB0aGlzLmNvbmZpZyA9IHRoaXMud2ViaXguZXh0ZW5kKHtcclxuICAgICAgICAgICAgbmFtZTogXCJBcHBcIixcclxuICAgICAgICAgICAgdmVyc2lvbjogXCIxLjBcIixcclxuICAgICAgICAgICAgc3RhcnQ6IFwiL2hvbWVcIlxyXG4gICAgICAgIH0sIGNvbmZpZywgdHJ1ZSk7XHJcbiAgICAgICAgdGhpcy5hcHAgPSB0aGlzLmNvbmZpZy5hcHA7XHJcbiAgICAgICAgdGhpcy5yZWFkeSA9IFByb21pc2UucmVzb2x2ZSgpO1xyXG4gICAgICAgIHRoaXMuX3NlcnZpY2VzID0ge307XHJcbiAgICAgICAgdGhpcy53ZWJpeC5leHRlbmQodGhpcywgdGhpcy53ZWJpeC5FdmVudFN5c3RlbSk7XHJcbiAgICB9XHJcbiAgICBnZXRVcmwoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX3N1YlNlZ21lbnQuc3VidXJsKCk7XHJcbiAgICB9XHJcbiAgICBnZXRVcmxTdHJpbmcoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX3N1YlNlZ21lbnQudG9TdHJpbmcoKTtcclxuICAgIH1cclxuICAgIGdldFNlcnZpY2UobmFtZSkge1xyXG4gICAgICAgIGxldCBvYmogPSB0aGlzLl9zZXJ2aWNlc1tuYW1lXTtcclxuICAgICAgICBpZiAodHlwZW9mIG9iaiA9PT0gXCJmdW5jdGlvblwiKSB7XHJcbiAgICAgICAgICAgIG9iaiA9IHRoaXMuX3NlcnZpY2VzW25hbWVdID0gb2JqKHRoaXMpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gb2JqO1xyXG4gICAgfVxyXG4gICAgc2V0U2VydmljZShuYW1lLCBoYW5kbGVyKSB7XHJcbiAgICAgICAgdGhpcy5fc2VydmljZXNbbmFtZV0gPSBoYW5kbGVyO1xyXG4gICAgfVxyXG4gICAgZGVzdHJ1Y3RvcigpIHtcclxuICAgICAgICB0aGlzLmdldFN1YlZpZXcoKS5kZXN0cnVjdG9yKCk7XHJcbiAgICAgICAgc3VwZXIuZGVzdHJ1Y3RvcigpO1xyXG4gICAgfVxyXG4gICAgLy8gY29weSBvYmplY3QgYW5kIGNvbGxlY3QgZXh0cmEgaGFuZGxlcnNcclxuICAgIGNvcHlDb25maWcob2JqLCB0YXJnZXQsIGNvbmZpZykge1xyXG4gICAgICAgIC8vIHJhdyB1aSBjb25maWdcclxuICAgICAgICBpZiAob2JqIGluc3RhbmNlb2YgSmV0QmFzZSB8fFxyXG4gICAgICAgICAgICAodHlwZW9mIG9iaiA9PT0gXCJmdW5jdGlvblwiICYmIG9iai5wcm90b3R5cGUgaW5zdGFuY2VvZiBKZXRCYXNlKSkge1xyXG4gICAgICAgICAgICBvYmogPSB7ICRzdWJ2aWV3OiBvYmogfTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gc3VidmlldyBwbGFjZWhvbGRlclxyXG4gICAgICAgIGlmICh0eXBlb2Ygb2JqLiRzdWJ2aWV3ICE9IFwidW5kZWZpbmVkXCIpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuYWRkU3ViVmlldyhvYmosIHRhcmdldCwgY29uZmlnKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gcHJvY2VzcyBzdWItcHJvcGVydGllc1xyXG4gICAgICAgIHRhcmdldCA9IHRhcmdldCB8fCAob2JqIGluc3RhbmNlb2YgQXJyYXkgPyBbXSA6IHt9KTtcclxuICAgICAgICBmb3IgKGNvbnN0IG1ldGhvZCBpbiBvYmopIHtcclxuICAgICAgICAgICAgbGV0IHBvaW50ID0gb2JqW21ldGhvZF07XHJcbiAgICAgICAgICAgIC8vIHZpZXcgY2xhc3NcclxuICAgICAgICAgICAgaWYgKHR5cGVvZiBwb2ludCA9PT0gXCJmdW5jdGlvblwiICYmIHBvaW50LnByb3RvdHlwZSBpbnN0YW5jZW9mIEpldEJhc2UpIHtcclxuICAgICAgICAgICAgICAgIHBvaW50ID0geyAkc3VidmlldzogcG9pbnQgfTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAocG9pbnQgJiYgdHlwZW9mIHBvaW50ID09PSBcIm9iamVjdFwiICYmXHJcbiAgICAgICAgICAgICAgICAhKHBvaW50IGluc3RhbmNlb2YgdGhpcy53ZWJpeC5EYXRhQ29sbGVjdGlvbikgJiYgIShwb2ludCBpbnN0YW5jZW9mIFJlZ0V4cCkpIHtcclxuICAgICAgICAgICAgICAgIGlmIChwb2ludCBpbnN0YW5jZW9mIERhdGUpIHtcclxuICAgICAgICAgICAgICAgICAgICB0YXJnZXRbbWV0aG9kXSA9IG5ldyBEYXRlKHBvaW50KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGNvcHkgPSB0aGlzLmNvcHlDb25maWcocG9pbnQsIChwb2ludCBpbnN0YW5jZW9mIEFycmF5ID8gW10gOiB7fSksIGNvbmZpZyk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGNvcHkgIT09IG51bGwpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGFyZ2V0W21ldGhvZF0gPSBjb3B5O1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHRhcmdldFttZXRob2RdID0gcG9pbnQ7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRhcmdldDtcclxuICAgIH1cclxuICAgIGdldFJvdXRlcigpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy4kcm91dGVyO1xyXG4gICAgfVxyXG4gICAgY2xpY2tIYW5kbGVyKGUsIHRhcmdldCkge1xyXG4gICAgICAgIGlmIChlKSB7XHJcbiAgICAgICAgICAgIHRhcmdldCA9IHRhcmdldCB8fCAoZS50YXJnZXQgfHwgZS5zcmNFbGVtZW50KTtcclxuICAgICAgICAgICAgaWYgKHRhcmdldCAmJiB0YXJnZXQuZ2V0QXR0cmlidXRlKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCB0cmlnZ2VyID0gdGFyZ2V0LmdldEF0dHJpYnV0ZShcInRyaWdnZXJcIik7XHJcbiAgICAgICAgICAgICAgICBpZiAodHJpZ2dlcikge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2ZvclZpZXcodGFyZ2V0LCB2aWV3ID0+IHZpZXcuYXBwLnRyaWdnZXIodHJpZ2dlcikpO1xyXG4gICAgICAgICAgICAgICAgICAgIGUuY2FuY2VsQnViYmxlID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgY29uc3Qgcm91dGUgPSB0YXJnZXQuZ2V0QXR0cmlidXRlKFwicm91dGVcIik7XHJcbiAgICAgICAgICAgICAgICBpZiAocm91dGUpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9mb3JWaWV3KHRhcmdldCwgdmlldyA9PiB2aWV3LnNob3cocm91dGUpKTtcclxuICAgICAgICAgICAgICAgICAgICBlLmNhbmNlbEJ1YmJsZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBjb25zdCBwYXJlbnQgPSB0YXJnZXQucGFyZW50Tm9kZTtcclxuICAgICAgICBpZiAocGFyZW50KSB7XHJcbiAgICAgICAgICAgIHRoaXMuY2xpY2tIYW5kbGVyKGUsIHBhcmVudCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgZ2V0Um9vdCgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5nZXRTdWJWaWV3KCkuZ2V0Um9vdCgpO1xyXG4gICAgfVxyXG4gICAgcmVmcmVzaCgpIHtcclxuICAgICAgICBpZiAoIXRoaXMuX3N1YlNlZ21lbnQpIHtcclxuICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZShudWxsKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0U3ViVmlldygpLnJlZnJlc2goKS50aGVuKHZpZXcgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLmNhbGxFdmVudChcImFwcDpyb3V0ZVwiLCBbdGhpcy5nZXRVcmwoKV0pO1xyXG4gICAgICAgICAgICByZXR1cm4gdmlldztcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuICAgIGxvYWRWaWV3KHVybCkge1xyXG4gICAgICAgIGNvbnN0IHZpZXdzID0gdGhpcy5jb25maWcudmlld3M7XHJcbiAgICAgICAgbGV0IHJlc3VsdCA9IG51bGw7XHJcbiAgICAgICAgaWYgKHVybCA9PT0gXCJcIikge1xyXG4gICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKHRoaXMuX2xvYWRFcnJvcihcIlwiLCBuZXcgRXJyb3IoXCJXZWJpeCBKZXQ6IEVtcHR5IHVybCBzZWdtZW50XCIpKSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIGlmICh2aWV3cykge1xyXG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZiB2aWV3cyA9PT0gXCJmdW5jdGlvblwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gY3VzdG9tIGxvYWRpbmcgc3RyYXRlZ3lcclxuICAgICAgICAgICAgICAgICAgICByZXN1bHQgPSB2aWV3cyh1cmwpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gcHJlZGVmaW5lZCBoYXNoXHJcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0ID0gdmlld3NbdXJsXTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgcmVzdWx0ID09PSBcInN0cmluZ1wiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdXJsID0gcmVzdWx0O1xyXG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdCA9IG51bGw7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKCFyZXN1bHQpIHtcclxuICAgICAgICAgICAgICAgIGlmICh1cmwgPT09IFwiX2JsYW5rXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXN1bHQgPSB7fTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdCA9IHRoaXMuX2xvYWRWaWV3RHluYW1pYyh1cmwpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNhdGNoIChlKSB7XHJcbiAgICAgICAgICAgIHJlc3VsdCA9IHRoaXMuX2xvYWRFcnJvcih1cmwsIGUpO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvLyBjdXN0b20gaGFuZGxlciBjYW4gcmV0dXJuIHZpZXcgb3IgaXRzIHByb21pc2VcclxuICAgICAgICBpZiAoIXJlc3VsdC50aGVuKSB7XHJcbiAgICAgICAgICAgIHJlc3VsdCA9IFByb21pc2UucmVzb2x2ZShyZXN1bHQpO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvLyBzZXQgZXJyb3IgaGFuZGxlclxyXG4gICAgICAgIHJlc3VsdCA9IHJlc3VsdFxyXG4gICAgICAgICAgICAudGhlbihtb2R1bGUgPT4gbW9kdWxlLl9fZXNNb2R1bGUgPyBtb2R1bGUuZGVmYXVsdCA6IG1vZHVsZSlcclxuICAgICAgICAgICAgLmNhdGNoKGVyciA9PiB0aGlzLl9sb2FkRXJyb3IodXJsLCBlcnIpKTtcclxuICAgICAgICByZXR1cm4gcmVzdWx0O1xyXG4gICAgfVxyXG4gICAgX2ZvclZpZXcodGFyZ2V0LCBoYW5kbGVyKSB7XHJcbiAgICAgICAgY29uc3QgdmlldyA9IHRoaXMud2ViaXguJCQodGFyZ2V0KTtcclxuICAgICAgICBpZiAodmlldykge1xyXG4gICAgICAgICAgICBoYW5kbGVyKHZpZXcuJHNjb3BlKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBfbG9hZFZpZXdEeW5hbWljKHVybCkge1xyXG4gICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgfVxyXG4gICAgY3JlYXRlRnJvbVVSTChjaHVuaykge1xyXG4gICAgICAgIGxldCB2aWV3O1xyXG4gICAgICAgIGlmIChjaHVuay5pc05ldyB8fCAhY2h1bmsudmlldykge1xyXG4gICAgICAgICAgICB2aWV3ID0gdGhpcy5sb2FkVmlldyhjaHVuay5wYWdlKVxyXG4gICAgICAgICAgICAgICAgLnRoZW4odWkgPT4gdGhpcy5jcmVhdGVWaWV3KHVpLCBuYW1lKSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICB2aWV3ID0gUHJvbWlzZS5yZXNvbHZlKGNodW5rLnZpZXcpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdmlldztcclxuICAgIH1cclxuICAgIGNyZWF0ZVZpZXcodWksIG5hbWUpIHtcclxuICAgICAgICBsZXQgb2JqO1xyXG4gICAgICAgIGlmICh0eXBlb2YgdWkgPT09IFwiZnVuY3Rpb25cIikge1xyXG4gICAgICAgICAgICBpZiAodWkucHJvdG90eXBlIGluc3RhbmNlb2YgSmV0QXBwQmFzZSkge1xyXG4gICAgICAgICAgICAgICAgLy8gVUkgY2xhc3NcclxuICAgICAgICAgICAgICAgIHJldHVybiBuZXcgdWkoeyBhcHA6IHRoaXMsIG5hbWUsIHJvdXRlcjogU3ViUm91dGVyIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2UgaWYgKHVpLnByb3RvdHlwZSBpbnN0YW5jZW9mIEpldEJhc2UpIHtcclxuICAgICAgICAgICAgICAgIC8vIFVJIGNsYXNzXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gbmV3IHVpKHRoaXMsIHsgbmFtZSB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIC8vIFVJIGZhY3RvcnkgZnVuY3Rpb25zXHJcbiAgICAgICAgICAgICAgICB1aSA9IHVpKHRoaXMpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh1aSBpbnN0YW5jZW9mIEpldEJhc2UpIHtcclxuICAgICAgICAgICAgb2JqID0gdWk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAvLyBVSSBvYmplY3RcclxuICAgICAgICAgICAgb2JqID0gbmV3IEpldFZpZXdSYXcodGhpcywgeyBuYW1lLCB1aSB9KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIG9iajtcclxuICAgIH1cclxuICAgIC8vIHNob3cgdmlldyBwYXRoXHJcbiAgICBzaG93KHVybCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnJlbmRlcih0aGlzLl9jb250YWluZXIsICh1cmwgfHwgdGhpcy5jb25maWcuc3RhcnQpKTtcclxuICAgIH1cclxuICAgIC8vIGV2ZW50IGhlbHBlcnNcclxuICAgIHRyaWdnZXIobmFtZSwgLi4ucmVzdCkge1xyXG4gICAgICAgIHRoaXMuYXBwbHkobmFtZSwgcmVzdCk7XHJcbiAgICB9XHJcbiAgICBhcHBseShuYW1lLCBkYXRhKSB7XHJcbiAgICAgICAgdGhpcy5jYWxsRXZlbnQobmFtZSwgZGF0YSk7XHJcbiAgICB9XHJcbiAgICBhY3Rpb24obmFtZSkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLndlYml4LmJpbmQoZnVuY3Rpb24gKC4uLnJlc3QpIHtcclxuICAgICAgICAgICAgdGhpcy5hcHBseShuYW1lLCByZXN0KTtcclxuICAgICAgICB9LCB0aGlzKTtcclxuICAgIH1cclxuICAgIG9uKG5hbWUsIGhhbmRsZXIpIHtcclxuICAgICAgICB0aGlzLmF0dGFjaEV2ZW50KG5hbWUsIGhhbmRsZXIpO1xyXG4gICAgfVxyXG4gICAgdXNlKHBsdWdpbiwgY29uZmlnKSB7XHJcbiAgICAgICAgcGx1Z2luKHRoaXMsIG51bGwsIGNvbmZpZyk7XHJcbiAgICB9XHJcbiAgICBlcnJvcihuYW1lLCBlcikge1xyXG4gICAgICAgIHRoaXMuY2FsbEV2ZW50KG5hbWUsIGVyKTtcclxuICAgICAgICB0aGlzLmNhbGxFdmVudChcImFwcDplcnJvclwiLCBlcik7XHJcbiAgICAgICAgLyogdHNsaW50OmRpc2FibGUgKi9cclxuICAgICAgICBpZiAodGhpcy5jb25maWcuZGVidWcpIHtcclxuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBlci5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihlcltpXSk7XHJcbiAgICAgICAgICAgICAgICBpZiAoZXJbaV0gaW5zdGFuY2VvZiBFcnJvcikge1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCB0ZXh0ID0gZXJbaV0ubWVzc2FnZTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAodGV4dC5pbmRleE9mKFwiTW9kdWxlIGJ1aWxkIGZhaWxlZFwiKSA9PT0gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0ZXh0ID0gdGV4dC5yZXBsYWNlKC9cXHgxYlxcW1swLTk7XSptL2csIFwiXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBkb2N1bWVudC5ib2R5LmlubmVySFRNTCA9IGA8cHJlIHN0eWxlPSdmb250LXNpemU6MTZweDsgYmFja2dyb3VuZC1jb2xvcjogI2VjNjg3MzsgY29sb3I6ICMwMDA7IHBhZGRpbmc6MTBweDsnPiR7dGV4dH08L3ByZT5gO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGV4dCArPSBcIjxicj48YnI+Q2hlY2sgY29uc29sZSBmb3IgbW9yZSBkZXRhaWxzXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMud2ViaXgubWVzc2FnZSh7IHR5cGU6IFwiZXJyb3JcIiwgdGV4dDogdGV4dCwgZXhwaXJlOiAtMSB9KTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZGVidWdnZXI7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8qIHRzbGludDplbmFibGUgKi9cclxuICAgIH1cclxuICAgIC8vIHJlbmRlcnMgdG9wIHZpZXdcclxuICAgIHJlbmRlcihyb290LCB1cmwsIHBhcmVudCkge1xyXG4gICAgICAgIHRoaXMuX2NvbnRhaW5lciA9ICh0eXBlb2Ygcm9vdCA9PT0gXCJzdHJpbmdcIikgP1xyXG4gICAgICAgICAgICB0aGlzLndlYml4LnRvTm9kZShyb290KSA6XHJcbiAgICAgICAgICAgIChyb290IHx8IGRvY3VtZW50LmJvZHkpO1xyXG4gICAgICAgIGNvbnN0IGZpcnN0SW5pdCA9ICF0aGlzLiRyb3V0ZXI7XHJcbiAgICAgICAgbGV0IHBhdGggPSBudWxsO1xyXG4gICAgICAgIGlmIChmaXJzdEluaXQpIHtcclxuICAgICAgICAgICAgaWYgKF9vbmNlICYmIFwidGFnTmFtZVwiIGluIHRoaXMuX2NvbnRhaW5lcikge1xyXG4gICAgICAgICAgICAgICAgdGhpcy53ZWJpeC5ldmVudChkb2N1bWVudC5ib2R5LCBcImNsaWNrXCIsIGUgPT4gdGhpcy5jbGlja0hhbmRsZXIoZSkpO1xyXG4gICAgICAgICAgICAgICAgX29uY2UgPSBmYWxzZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAodHlwZW9mIHVybCA9PT0gXCJzdHJpbmdcIikge1xyXG4gICAgICAgICAgICAgICAgdXJsID0gbmV3IFJvdXRlKHVybCwgMCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5fc3ViU2VnbWVudCA9IHRoaXMuX2ZpcnN0X3N0YXJ0KHVybCk7XHJcbiAgICAgICAgICAgIHRoaXMuX3N1YlNlZ21lbnQucm91dGUubGlua1JvdXRlciA9IHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICBpZiAodHlwZW9mIHVybCA9PT0gXCJzdHJpbmdcIikge1xyXG4gICAgICAgICAgICAgICAgcGF0aCA9IHVybDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmFwcCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHBhdGggPSB1cmwuc3BsaXQoKS5yb3V0ZS5wYXRoIHx8IHRoaXMuY29uZmlnLnN0YXJ0O1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcGF0aCA9IHVybC50b1N0cmluZygpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNvbnN0IHRvcCA9IHRoaXMuZ2V0U3ViVmlldygpO1xyXG4gICAgICAgIGNvbnN0IHNlZ21lbnQgPSB0aGlzLl9zdWJTZWdtZW50O1xyXG4gICAgICAgIGNvbnN0IHJlYWR5ID0gc2VnbWVudC5zaG93KHBhdGgsIHRvcClcclxuICAgICAgICAgICAgLnRoZW4oKCkgPT4gdGhpcy5jcmVhdGVGcm9tVVJMKHNlZ21lbnQuY3VycmVudCgpKSlcclxuICAgICAgICAgICAgLnRoZW4odmlldyA9PiB2aWV3LnJlbmRlcihyb290LCBzZWdtZW50KSlcclxuICAgICAgICAgICAgLnRoZW4oYmFzZSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuJHJvdXRlci5zZXQoc2VnbWVudC5yb3V0ZS5wYXRoLCB7IHNpbGVudDogdHJ1ZSB9KTtcclxuICAgICAgICAgICAgdGhpcy5jYWxsRXZlbnQoXCJhcHA6cm91dGVcIiwgW3RoaXMuZ2V0VXJsKCldKTtcclxuICAgICAgICAgICAgcmV0dXJuIGJhc2U7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgdGhpcy5yZWFkeSA9IHRoaXMucmVhZHkudGhlbigoKSA9PiByZWFkeSk7XHJcbiAgICAgICAgcmV0dXJuIHJlYWR5O1xyXG4gICAgfVxyXG4gICAgZ2V0U3ViVmlldygpIHtcclxuICAgICAgICBpZiAodGhpcy5fc3ViU2VnbWVudCkge1xyXG4gICAgICAgICAgICBjb25zdCB2aWV3ID0gdGhpcy5fc3ViU2VnbWVudC5jdXJyZW50KCkudmlldztcclxuICAgICAgICAgICAgaWYgKHZpZXcpXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdmlldztcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIG5ldyBKZXRWaWV3KHRoaXMsIHt9KTtcclxuICAgIH1cclxuICAgIF9maXJzdF9zdGFydChyb3V0ZSkge1xyXG4gICAgICAgIHRoaXMuX3NlZ21lbnQgPSByb3V0ZTtcclxuICAgICAgICBjb25zdCBjYiA9IChhKSA9PiBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5zaG93KGEpLmNhdGNoKGUgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKCEoZSBpbnN0YW5jZW9mIE5hdmlnYXRpb25CbG9ja2VkKSlcclxuICAgICAgICAgICAgICAgICAgICB0aHJvdyBlO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9LCAxKTtcclxuICAgICAgICB0aGlzLiRyb3V0ZXIgPSBuZXcgKHRoaXMuY29uZmlnLnJvdXRlcikoY2IsIHRoaXMuY29uZmlnLCB0aGlzKTtcclxuICAgICAgICAvLyBzdGFydCBhbmltYXRpb24gZm9yIHRvcC1sZXZlbCBhcHBcclxuICAgICAgICBpZiAodGhpcy5fY29udGFpbmVyID09PSBkb2N1bWVudC5ib2R5ICYmIHRoaXMuY29uZmlnLmFuaW1hdGlvbiAhPT0gZmFsc2UpIHtcclxuICAgICAgICAgICAgY29uc3Qgbm9kZSA9IHRoaXMuX2NvbnRhaW5lcjtcclxuICAgICAgICAgICAgdGhpcy53ZWJpeC5odG1sLmFkZENzcyhub2RlLCBcIndlYml4YXBwc3RhcnRcIik7XHJcbiAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy53ZWJpeC5odG1sLnJlbW92ZUNzcyhub2RlLCBcIndlYml4YXBwc3RhcnRcIik7XHJcbiAgICAgICAgICAgICAgICB0aGlzLndlYml4Lmh0bWwuYWRkQ3NzKG5vZGUsIFwid2ViaXhhcHBcIik7XHJcbiAgICAgICAgICAgIH0sIDEwKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKCFyb3V0ZSkge1xyXG4gICAgICAgICAgICAvLyBpZiBubyB1cmwgZGVmaW5lZCwgY2hlY2sgcm91dGVyIGZpcnN0XHJcbiAgICAgICAgICAgIGxldCB1cmxTdHJpbmcgPSB0aGlzLiRyb3V0ZXIuZ2V0KCk7XHJcbiAgICAgICAgICAgIGlmICghdXJsU3RyaW5nKSB7XHJcbiAgICAgICAgICAgICAgICB1cmxTdHJpbmcgPSB0aGlzLmNvbmZpZy5zdGFydDtcclxuICAgICAgICAgICAgICAgIHRoaXMuJHJvdXRlci5zZXQodXJsU3RyaW5nLCB7IHNpbGVudDogdHJ1ZSB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByb3V0ZSA9IG5ldyBSb3V0ZSh1cmxTdHJpbmcsIDApO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmICh0aGlzLmFwcCkge1xyXG4gICAgICAgICAgICByb3V0ZS5jdXJyZW50KCkudmlldyA9IHRoaXM7XHJcbiAgICAgICAgICAgIGlmIChyb3V0ZS5uZXh0KCkpIHtcclxuICAgICAgICAgICAgICAgIHJvdXRlLnJlZnJlc2goKTtcclxuICAgICAgICAgICAgICAgIHJvdXRlID0gcm91dGUuc3BsaXQoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHJvdXRlID0gbmV3IFJvdXRlKHRoaXMuY29uZmlnLnN0YXJ0LCAwKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gcm91dGU7XHJcbiAgICB9XHJcbiAgICAvLyBlcnJvciBkdXJpbmcgdmlldyByZXNvbHZpbmdcclxuICAgIF9sb2FkRXJyb3IodXJsLCBlcnIpIHtcclxuICAgICAgICB0aGlzLmVycm9yKFwiYXBwOmVycm9yOnJlc29sdmVcIiwgW2VyciwgdXJsXSk7XHJcbiAgICAgICAgcmV0dXJuIHsgdGVtcGxhdGU6IFwiIFwiIH07XHJcbiAgICB9XHJcbiAgICBhZGRTdWJWaWV3KG9iaiwgdGFyZ2V0LCBjb25maWcpIHtcclxuICAgICAgICBjb25zdCB1cmwgPSBvYmouJHN1YnZpZXcgIT09IHRydWUgPyBvYmouJHN1YnZpZXcgOiBudWxsO1xyXG4gICAgICAgIGNvbnN0IG5hbWUgPSBvYmoubmFtZSB8fCAodXJsID8gdGhpcy53ZWJpeC51aWQoKSA6IFwiZGVmYXVsdFwiKTtcclxuICAgICAgICB0YXJnZXQuaWQgPSBvYmouaWQgfHwgXCJzXCIgKyB0aGlzLndlYml4LnVpZCgpO1xyXG4gICAgICAgIGNvbnN0IHZpZXcgPSBjb25maWdbbmFtZV0gPSB7XHJcbiAgICAgICAgICAgIGlkOiB0YXJnZXQuaWQsXHJcbiAgICAgICAgICAgIHVybCxcclxuICAgICAgICAgICAgYnJhbmNoOiBvYmouYnJhbmNoLFxyXG4gICAgICAgICAgICBwb3B1cDogb2JqLnBvcHVwXHJcbiAgICAgICAgfTtcclxuICAgICAgICByZXR1cm4gdmlldy5wb3B1cCA/IG51bGwgOiB0YXJnZXQ7XHJcbiAgICB9XHJcbn1cblxuY2xhc3MgSGFzaFJvdXRlciB7XHJcbiAgICBjb25zdHJ1Y3RvcihjYiwgY29uZmlnKSB7XHJcbiAgICAgICAgdGhpcy5jb25maWcgPSBjb25maWcgfHwge307XHJcbiAgICAgICAgdGhpcy5fZGV0ZWN0UHJlZml4KCk7XHJcbiAgICAgICAgdGhpcy5jYiA9IGNiO1xyXG4gICAgICAgIHdpbmRvdy5vbnBvcHN0YXRlID0gKCkgPT4gdGhpcy5jYih0aGlzLmdldCgpKTtcclxuICAgIH1cclxuICAgIHNldChwYXRoLCBjb25maWcpIHtcclxuICAgICAgICBpZiAodGhpcy5jb25maWcucm91dGVzKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGNvbXBhcmUgPSBwYXRoLnNwbGl0KFwiP1wiLCAyKTtcclxuICAgICAgICAgICAgZm9yIChjb25zdCBrZXkgaW4gdGhpcy5jb25maWcucm91dGVzKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5jb25maWcucm91dGVzW2tleV0gPT09IGNvbXBhcmVbMF0pIHtcclxuICAgICAgICAgICAgICAgICAgICBwYXRoID0ga2V5ICsgKGNvbXBhcmUubGVuZ3RoID4gMSA/IFwiP1wiICsgY29tcGFyZVsxXSA6IFwiXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0aGlzLmdldCgpICE9PSBwYXRoKSB7XHJcbiAgICAgICAgICAgIHdpbmRvdy5oaXN0b3J5LnB1c2hTdGF0ZShudWxsLCBudWxsLCB0aGlzLnByZWZpeCArIHRoaXMuc3VmaXggKyBwYXRoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKCFjb25maWcgfHwgIWNvbmZpZy5zaWxlbnQpIHtcclxuICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB0aGlzLmNiKHBhdGgpLCAxKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBnZXQoKSB7XHJcbiAgICAgICAgbGV0IHBhdGggPSB0aGlzLl9nZXRSYXcoKS5yZXBsYWNlKHRoaXMucHJlZml4LCBcIlwiKS5yZXBsYWNlKHRoaXMuc3VmaXgsIFwiXCIpO1xyXG4gICAgICAgIHBhdGggPSAocGF0aCAhPT0gXCIvXCIgJiYgcGF0aCAhPT0gXCIjXCIpID8gcGF0aCA6IFwiXCI7XHJcbiAgICAgICAgaWYgKHRoaXMuY29uZmlnLnJvdXRlcykge1xyXG4gICAgICAgICAgICBjb25zdCBjb21wYXJlID0gcGF0aC5zcGxpdChcIj9cIiwgMik7XHJcbiAgICAgICAgICAgIGNvbnN0IGtleSA9IHRoaXMuY29uZmlnLnJvdXRlc1tjb21wYXJlWzBdXTtcclxuICAgICAgICAgICAgaWYgKGtleSkge1xyXG4gICAgICAgICAgICAgICAgcGF0aCA9IGtleSArIChjb21wYXJlLmxlbmd0aCA+IDEgPyBcIj9cIiArIGNvbXBhcmVbMV0gOiBcIlwiKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gcGF0aDtcclxuICAgIH1cclxuICAgIF9kZXRlY3RQcmVmaXgoKSB7XHJcbiAgICAgICAgLy8gdXNlIFwiIyFcIiBmb3IgYmFja3dhcmQgY29tcGF0aWJpbGl0eVxyXG4gICAgICAgIGNvbnN0IHN1Zml4ID0gdGhpcy5jb25maWcucm91dGVyUHJlZml4O1xyXG4gICAgICAgIHRoaXMuc3VmaXggPSBcIiNcIiArICgodHlwZW9mIHN1Zml4ID09PSBcInVuZGVmaW5lZFwiKSA/IFwiIVwiIDogc3VmaXgpO1xyXG4gICAgICAgIHRoaXMucHJlZml4ID0gZG9jdW1lbnQubG9jYXRpb24uaHJlZi5zcGxpdChcIiNcIiwgMilbMF07XHJcbiAgICB9XHJcbiAgICBfZ2V0UmF3KCkge1xyXG4gICAgICAgIHJldHVybiBkb2N1bWVudC5sb2NhdGlvbi5ocmVmO1xyXG4gICAgfVxyXG59XG5cbmxldCBpc1BhdGNoZWQgPSBmYWxzZTtcclxuZnVuY3Rpb24gcGF0Y2godykge1xyXG4gICAgaWYgKGlzUGF0Y2hlZCB8fCAhdykge1xyXG4gICAgICAgIHJldHVybjtcclxuICAgIH1cclxuICAgIGlzUGF0Y2hlZCA9IHRydWU7XHJcbiAgICAvLyBjdXN0b20gcHJvbWlzZSBmb3IgSUU4XHJcbiAgICBjb25zdCB3aW4gPSB3aW5kb3c7XHJcbiAgICBpZiAoIXdpbi5Qcm9taXNlKSB7XHJcbiAgICAgICAgd2luLlByb21pc2UgPSB3LnByb21pc2U7XHJcbiAgICB9XHJcbiAgICBjb25zdCB2ZXJzaW9uID0gdy52ZXJzaW9uLnNwbGl0KFwiLlwiKTtcclxuICAgIC8vIHdpbGwgYmUgZml4ZWQgaW4gd2ViaXggNS4zXHJcbiAgICBpZiAodmVyc2lvblswXSAqIDEwICsgdmVyc2lvblsxXSAqIDEgPCA1Mykge1xyXG4gICAgICAgIHcudWkuZnJlZXplID0gZnVuY3Rpb24gKGhhbmRsZXIpIHtcclxuICAgICAgICAgICAgLy8gZGlzYWJsZWQgYmVjYXVzZSB3ZWJpeCBqZXQgNS4wIGNhbid0IGhhbmRsZSByZXNpemUgb2Ygc2Nyb2xsdmlldyBjb3JyZWN0bHlcclxuICAgICAgICAgICAgLy8gdy51aS4kZnJlZXplID0gdHJ1ZTtcclxuICAgICAgICAgICAgY29uc3QgcmVzID0gaGFuZGxlcigpO1xyXG4gICAgICAgICAgICBpZiAocmVzICYmIHJlcy50aGVuKSB7XHJcbiAgICAgICAgICAgICAgICByZXMudGhlbihmdW5jdGlvbiAoc29tZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHcudWkuJGZyZWV6ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgIHcudWkucmVzaXplKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHNvbWU7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHcudWkuJGZyZWV6ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgdy51aS5yZXNpemUoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gcmVzO1xyXG4gICAgICAgIH07XHJcbiAgICB9XHJcbiAgICAvLyBhZGRpbmcgdmlld3MgYXMgY2xhc3Nlc1xyXG4gICAgY29uc3QgYmFzZUFkZCA9IHcudWkuYmFzZWxheW91dC5wcm90b3R5cGUuYWRkVmlldztcclxuICAgIGNvbnN0IGJhc2VSZW1vdmUgPSB3LnVpLmJhc2VsYXlvdXQucHJvdG90eXBlLnJlbW92ZVZpZXc7XHJcbiAgICBjb25zdCBjb25maWcgPSB7XHJcbiAgICAgICAgYWRkVmlldyh2aWV3LCBpbmRleCkge1xyXG4gICAgICAgICAgICAvLyB0cmlnZ2VyIGxvZ2ljIG9ubHkgZm9yIHdpZGdldHMgaW5zaWRlIG9mIGpldC12aWV3XHJcbiAgICAgICAgICAgIC8vIGlnbm9yZSBjYXNlIHdoZW4gYWRkVmlldyB1c2VkIHdpdGggYWxyZWFkeSBpbml0aWFsaXplZCB3aWRnZXRcclxuICAgICAgICAgICAgaWYgKHRoaXMuJHNjb3BlICYmIHRoaXMuJHNjb3BlLndlYml4SmV0ICYmICF2aWV3LnF1ZXJ5Vmlldykge1xyXG4gICAgICAgICAgICAgICAgY29uc3QganZpZXcgPSB0aGlzLiRzY29wZTtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHN1YnMgPSB7fTtcclxuICAgICAgICAgICAgICAgIHZpZXcgPSBqdmlldy5hcHAuY29weUNvbmZpZyh2aWV3LCB7fSwgc3Vicyk7XHJcbiAgICAgICAgICAgICAgICBiYXNlQWRkLmFwcGx5KHRoaXMsIFt2aWV3LCBpbmRleF0pO1xyXG4gICAgICAgICAgICAgICAgZm9yIChjb25zdCBrZXkgaW4gc3Vicykge1xyXG4gICAgICAgICAgICAgICAgICAgIGp2aWV3Ll9yZW5kZXJGcmFtZShrZXksIHN1YnNba2V5XSwgbnVsbCkudGhlbigoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGp2aWV3Ll9zdWJzW2tleV0gPSBzdWJzW2tleV07XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdmlldy5pZDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBiYXNlQWRkLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LFxyXG4gICAgICAgIHJlbW92ZVZpZXcoKSB7XHJcbiAgICAgICAgICAgIGJhc2VSZW1vdmUuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcclxuICAgICAgICAgICAgaWYgKHRoaXMuJHNjb3BlICYmIHRoaXMuJHNjb3BlLndlYml4SmV0KSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBzdWJzID0gdGhpcy4kc2NvcGUuX3N1YnM7XHJcbiAgICAgICAgICAgICAgICAvLyBjaGVjayBhbGwgc3ViLXZpZXdzLCBkZXN0cm95IGFuZCBjbGVhbiB0aGUgcmVtb3ZlZCBvbmVcclxuICAgICAgICAgICAgICAgIGZvciAoY29uc3Qga2V5IGluIHN1YnMpIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCB0ZXN0ID0gc3Vic1trZXldO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICghdy4kJCh0ZXN0LmlkKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0ZXN0LnZpZXcuZGVzdHJ1Y3RvcigpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBkZWxldGUgc3Vic1trZXldO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH07XHJcbiAgICB3LmV4dGVuZCh3LnVpLmxheW91dC5wcm90b3R5cGUsIGNvbmZpZywgdHJ1ZSk7XHJcbiAgICB3LmV4dGVuZCh3LnVpLmJhc2VsYXlvdXQucHJvdG90eXBlLCBjb25maWcsIHRydWUpO1xyXG4gICAgLy8gd3JhcHBlciBmb3IgdXNpbmcgSmV0IEFwcHMgYXMgdmlld3NcclxuICAgIHcucHJvdG9VSSh7XHJcbiAgICAgICAgbmFtZTogXCJqZXRhcHBcIixcclxuICAgICAgICAkaW5pdChjZmcpIHtcclxuICAgICAgICAgICAgdGhpcy4kYXBwID0gbmV3IHRoaXMuYXBwKGNmZyk7XHJcbiAgICAgICAgICAgIGNvbnN0IGlkID0gdy51aWQoKS50b1N0cmluZygpO1xyXG4gICAgICAgICAgICBjZmcuYm9keSA9IHsgaWQgfTtcclxuICAgICAgICAgICAgdGhpcy4kcmVhZHkucHVzaChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLiRhcHAucmVuZGVyKHsgaWQgfSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICBmb3IgKHZhciBrZXkgaW4gdGhpcy4kYXBwKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgb3JpZ2luID0gdGhpcy4kYXBwW2tleV07XHJcbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mIG9yaWdpbiA9PT0gXCJmdW5jdGlvblwiICYmICF0aGlzW2tleV0pIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzW2tleV0gPSBvcmlnaW4uYmluZCh0aGlzLiRhcHApO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfSwgdy51aS5wcm94eSk7XHJcbn1cblxuY2xhc3MgSmV0QXBwIGV4dGVuZHMgSmV0QXBwQmFzZSB7XHJcbiAgICBjb25zdHJ1Y3Rvcihjb25maWcpIHtcclxuICAgICAgICBjb25maWcucm91dGVyID0gY29uZmlnLnJvdXRlciB8fCBIYXNoUm91dGVyO1xyXG4gICAgICAgIHN1cGVyKGNvbmZpZyk7XHJcbiAgICAgICAgcGF0Y2godGhpcy53ZWJpeCk7XHJcbiAgICB9XHJcbiAgICBfbG9hZFZpZXdEeW5hbWljKHVybCkge1xyXG4gICAgICAgIHVybCA9IHVybC5yZXBsYWNlKC9cXC4vZywgXCIvXCIpO1xyXG4gICAgICAgIHJldHVybiByZXF1aXJlKFwiamV0LXZpZXdzL1wiICsgdXJsKTtcclxuICAgIH1cclxufVxuXG5jbGFzcyBTdG9yZVJvdXRlciB7XHJcbiAgICBjb25zdHJ1Y3RvcihjYiwgY29uZmlnLCBhcHApIHtcclxuICAgICAgICB0aGlzLnN0b3JhZ2UgPSBjb25maWcuc3RvcmFnZSB8fCBhcHAud2ViaXguc3RvcmFnZS5zZXNzaW9uO1xyXG4gICAgICAgIHRoaXMubmFtZSA9IChjb25maWcuc3RvcmVOYW1lIHx8IGNvbmZpZy5pZCArIFwiOnJvdXRlXCIpO1xyXG4gICAgICAgIHRoaXMuY2IgPSBjYjtcclxuICAgIH1cclxuICAgIHNldChwYXRoLCBjb25maWcpIHtcclxuICAgICAgICB0aGlzLnN0b3JhZ2UucHV0KHRoaXMubmFtZSwgcGF0aCk7XHJcbiAgICAgICAgaWYgKCFjb25maWcgfHwgIWNvbmZpZy5zaWxlbnQpIHtcclxuICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB0aGlzLmNiKHBhdGgpLCAxKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBnZXQoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuc3RvcmFnZS5nZXQodGhpcy5uYW1lKTtcclxuICAgIH1cclxufVxuXG5jbGFzcyBVcmxSb3V0ZXIgZXh0ZW5kcyBIYXNoUm91dGVyIHtcclxuICAgIF9kZXRlY3RQcmVmaXgoKSB7XHJcbiAgICAgICAgdGhpcy5wcmVmaXggPSBcIlwiO1xyXG4gICAgICAgIHRoaXMuc3VmaXggPSB0aGlzLmNvbmZpZy5yb3V0ZXJQcmVmaXggfHwgXCJcIjtcclxuICAgIH1cclxuICAgIF9nZXRSYXcoKSB7XHJcbiAgICAgICAgcmV0dXJuIGRvY3VtZW50LmxvY2F0aW9uLnBhdGhuYW1lICsgKGRvY3VtZW50LmxvY2F0aW9uLnNlYXJjaCB8fCBcIlwiKTtcclxuICAgIH1cclxufVxuXG5jbGFzcyBFbXB0eVJvdXRlciB7XHJcbiAgICBjb25zdHJ1Y3RvcihjYiwgXyRjb25maWcpIHtcclxuICAgICAgICB0aGlzLnBhdGggPSBcIlwiO1xyXG4gICAgICAgIHRoaXMuY2IgPSBjYjtcclxuICAgIH1cclxuICAgIHNldChwYXRoLCBjb25maWcpIHtcclxuICAgICAgICB0aGlzLnBhdGggPSBwYXRoO1xyXG4gICAgICAgIGlmICghY29uZmlnIHx8ICFjb25maWcuc2lsZW50KSB7XHJcbiAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4gdGhpcy5jYihwYXRoKSwgMSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgZ2V0KCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnBhdGg7XHJcbiAgICB9XHJcbn1cblxuZnVuY3Rpb24gVW5sb2FkR3VhcmQoYXBwLCB2aWV3LCBjb25maWcpIHtcclxuICAgIHZpZXcub24oYXBwLCBgYXBwOmd1YXJkYCwgZnVuY3Rpb24gKF8kdXJsLCBwb2ludCwgcHJvbWlzZSkge1xyXG4gICAgICAgIGlmIChwb2ludCA9PT0gdmlldyB8fCBwb2ludC5jb250YWlucyh2aWV3KSkge1xyXG4gICAgICAgICAgICBjb25zdCByZXMgPSBjb25maWcoKTtcclxuICAgICAgICAgICAgaWYgKHJlcyA9PT0gZmFsc2UpIHtcclxuICAgICAgICAgICAgICAgIHByb21pc2UuY29uZmlybSA9IFByb21pc2UucmVqZWN0KG5ldyBOYXZpZ2F0aW9uQmxvY2tlZCgpKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHByb21pc2UuY29uZmlybSA9IHByb21pc2UuY29uZmlybS50aGVuKCgpID0+IHJlcyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9KTtcclxufVxuXG4vLyAgICAgKGMpIDIwMTItMjAxOCBBaXJibmIsIEluYy5cblxuLy8gdmFyIGhhcyA9IHJlcXVpcmUoJ2hhcycpO1xuZnVuY3Rpb24gaGFzKHN0b3JlLCBrZXkpIHtcbiAgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChzdG9yZSwga2V5KTtcbn1cbi8vIHZhciBmb3JFYWNoID0gcmVxdWlyZSgnZm9yLWVhY2gnKTtcbmZ1bmN0aW9uIGZvckVhY2gob2JqLCBoYW5kbGVyLCBjb250ZXh0KSB7XG4gIGZvciAodmFyIGtleSBpbiBvYmopIHtcbiAgICBpZiAoaGFzKG9iaiwga2V5KSkge1xuICAgICAgaGFuZGxlci5jYWxsKChjb250ZXh0IHx8IG9iaiksIG9ialtrZXldLCBrZXksIG9iaik7XG4gICAgfVxuICB9XG59XG4vLyB2YXIgdHJpbSA9IHJlcXVpcmUoJ3N0cmluZy5wcm90b3R5cGUudHJpbScpO1xuZnVuY3Rpb24gdHJpbShzdHIpIHtcbiAgcmV0dXJuIHN0ci5yZXBsYWNlKC9eW1xcc1xcdUZFRkZcXHhBMF0rfFtcXHNcXHVGRUZGXFx4QTBdKyQvZywgJycpO1xufVxuLy8gdmFyIHdhcm5pbmcgPSByZXF1aXJlKCd3YXJuaW5nJyk7XG5mdW5jdGlvbiB3YXJuKG1lc3NhZ2UpIHtcbiAgbWVzc2FnZSA9ICdXYXJuaW5nOiAnICsgbWVzc2FnZTtcbiAgaWYgKHR5cGVvZiBjb25zb2xlICE9PSAndW5kZWZpbmVkJykge1xuICAgIGNvbnNvbGUuZXJyb3IobWVzc2FnZSk7XG4gIH1cblxuICB0cnkgeyB0aHJvdyBuZXcgRXJyb3IobWVzc2FnZSk7IH0gY2F0Y2ggKHgpIHt9XG59XG5cbnZhciByZXBsYWNlID0gU3RyaW5nLnByb3RvdHlwZS5yZXBsYWNlO1xudmFyIHNwbGl0ID0gU3RyaW5nLnByb3RvdHlwZS5zcGxpdDtcblxuLy8gIyMjIyBQbHVyYWxpemF0aW9uIG1ldGhvZHNcbi8vIFRoZSBzdHJpbmcgdGhhdCBzZXBhcmF0ZXMgdGhlIGRpZmZlcmVudCBwaHJhc2UgcG9zc2liaWxpdGllcy5cbnZhciBkZWxpbWl0ZXIgPSAnfHx8fCc7XG5cbnZhciBydXNzaWFuUGx1cmFsR3JvdXBzID0gZnVuY3Rpb24gKG4pIHtcbiAgdmFyIGVuZCA9IG4gJSAxMDtcbiAgaWYgKG4gIT09IDExICYmIGVuZCA9PT0gMSkge1xuICAgIHJldHVybiAwO1xuICB9XG4gIGlmICgyIDw9IGVuZCAmJiBlbmQgPD0gNCAmJiAhKG4gPj0gMTIgJiYgbiA8PSAxNCkpIHtcbiAgICByZXR1cm4gMTtcbiAgfVxuICByZXR1cm4gMjtcbn07XG5cbi8vIE1hcHBpbmcgZnJvbSBwbHVyYWxpemF0aW9uIGdyb3VwIHBsdXJhbCBsb2dpYy5cbnZhciBwbHVyYWxUeXBlcyA9IHtcbiAgYXJhYmljOiBmdW5jdGlvbiAobikge1xuICAgIC8vIGh0dHA6Ly93d3cuYXJhYmV5ZXMub3JnL1BsdXJhbF9Gb3Jtc1xuICAgIGlmIChuIDwgMykgeyByZXR1cm4gbjsgfVxuICAgIHZhciBsYXN0VHdvID0gbiAlIDEwMDtcbiAgICBpZiAobGFzdFR3byA+PSAzICYmIGxhc3RUd28gPD0gMTApIHJldHVybiAzO1xuICAgIHJldHVybiBsYXN0VHdvID49IDExID8gNCA6IDU7XG4gIH0sXG4gIGJvc25pYW5fc2VyYmlhbjogcnVzc2lhblBsdXJhbEdyb3VwcyxcbiAgY2hpbmVzZTogZnVuY3Rpb24gKCkgeyByZXR1cm4gMDsgfSxcbiAgY3JvYXRpYW46IHJ1c3NpYW5QbHVyYWxHcm91cHMsXG4gIGZyZW5jaDogZnVuY3Rpb24gKG4pIHsgcmV0dXJuIG4gPiAxID8gMSA6IDA7IH0sXG4gIGdlcm1hbjogZnVuY3Rpb24gKG4pIHsgcmV0dXJuIG4gIT09IDEgPyAxIDogMDsgfSxcbiAgcnVzc2lhbjogcnVzc2lhblBsdXJhbEdyb3VwcyxcbiAgbGl0aHVhbmlhbjogZnVuY3Rpb24gKG4pIHtcbiAgICBpZiAobiAlIDEwID09PSAxICYmIG4gJSAxMDAgIT09IDExKSB7IHJldHVybiAwOyB9XG4gICAgcmV0dXJuIG4gJSAxMCA+PSAyICYmIG4gJSAxMCA8PSA5ICYmIChuICUgMTAwIDwgMTEgfHwgbiAlIDEwMCA+IDE5KSA/IDEgOiAyO1xuICB9LFxuICBjemVjaDogZnVuY3Rpb24gKG4pIHtcbiAgICBpZiAobiA9PT0gMSkgeyByZXR1cm4gMDsgfVxuICAgIHJldHVybiAobiA+PSAyICYmIG4gPD0gNCkgPyAxIDogMjtcbiAgfSxcbiAgcG9saXNoOiBmdW5jdGlvbiAobikge1xuICAgIGlmIChuID09PSAxKSB7IHJldHVybiAwOyB9XG4gICAgdmFyIGVuZCA9IG4gJSAxMDtcbiAgICByZXR1cm4gMiA8PSBlbmQgJiYgZW5kIDw9IDQgJiYgKG4gJSAxMDAgPCAxMCB8fCBuICUgMTAwID49IDIwKSA/IDEgOiAyO1xuICB9LFxuICBpY2VsYW5kaWM6IGZ1bmN0aW9uIChuKSB7IHJldHVybiAobiAlIDEwICE9PSAxIHx8IG4gJSAxMDAgPT09IDExKSA/IDEgOiAwOyB9LFxuICBzbG92ZW5pYW46IGZ1bmN0aW9uIChuKSB7XG4gICAgdmFyIGxhc3RUd28gPSBuICUgMTAwO1xuICAgIGlmIChsYXN0VHdvID09PSAxKSB7XG4gICAgICByZXR1cm4gMDtcbiAgICB9XG4gICAgaWYgKGxhc3RUd28gPT09IDIpIHtcbiAgICAgIHJldHVybiAxO1xuICAgIH1cbiAgICBpZiAobGFzdFR3byA9PT0gMyB8fCBsYXN0VHdvID09PSA0KSB7XG4gICAgICByZXR1cm4gMjtcbiAgICB9XG4gICAgcmV0dXJuIDM7XG4gIH1cbn07XG5cblxuLy8gTWFwcGluZyBmcm9tIHBsdXJhbGl6YXRpb24gZ3JvdXAgdG8gaW5kaXZpZHVhbCBsYW5ndWFnZSBjb2Rlcy9sb2NhbGVzLlxuLy8gV2lsbCBsb29rIHVwIGJhc2VkIG9uIGV4YWN0IG1hdGNoLCBpZiBub3QgZm91bmQgYW5kIGl0J3MgYSBsb2NhbGUgd2lsbCBwYXJzZSB0aGUgbG9jYWxlXG4vLyBmb3IgbGFuZ3VhZ2UgY29kZSwgYW5kIGlmIHRoYXQgZG9lcyBub3QgZXhpc3Qgd2lsbCBkZWZhdWx0IHRvICdlbidcbnZhciBwbHVyYWxUeXBlVG9MYW5ndWFnZXMgPSB7XG4gIGFyYWJpYzogWydhciddLFxuICBib3NuaWFuX3NlcmJpYW46IFsnYnMtTGF0bi1CQScsICdicy1DeXJsLUJBJywgJ3NybC1SUycsICdzci1SUyddLFxuICBjaGluZXNlOiBbJ2lkJywgJ2lkLUlEJywgJ2phJywgJ2tvJywgJ2tvLUtSJywgJ2xvJywgJ21zJywgJ3RoJywgJ3RoLVRIJywgJ3poJ10sXG4gIGNyb2F0aWFuOiBbJ2hyJywgJ2hyLUhSJ10sXG4gIGdlcm1hbjogWydmYScsICdkYScsICdkZScsICdlbicsICdlcycsICdmaScsICdlbCcsICdoZScsICdoaS1JTicsICdodScsICdodS1IVScsICdpdCcsICdubCcsICdubycsICdwdCcsICdzdicsICd0ciddLFxuICBmcmVuY2g6IFsnZnInLCAndGwnLCAncHQtYnInXSxcbiAgcnVzc2lhbjogWydydScsICdydS1SVSddLFxuICBsaXRodWFuaWFuOiBbJ2x0J10sXG4gIGN6ZWNoOiBbJ2NzJywgJ2NzLUNaJywgJ3NrJ10sXG4gIHBvbGlzaDogWydwbCddLFxuICBpY2VsYW5kaWM6IFsnaXMnXSxcbiAgc2xvdmVuaWFuOiBbJ3NsLVNMJ11cbn07XG5cbmZ1bmN0aW9uIGxhbmdUb1R5cGVNYXAobWFwcGluZykge1xuICB2YXIgcmV0ID0ge307XG4gIGZvckVhY2gobWFwcGluZywgZnVuY3Rpb24gKGxhbmdzLCB0eXBlKSB7XG4gICAgZm9yRWFjaChsYW5ncywgZnVuY3Rpb24gKGxhbmcpIHtcbiAgICAgIHJldFtsYW5nXSA9IHR5cGU7XG4gICAgfSk7XG4gIH0pO1xuICByZXR1cm4gcmV0O1xufVxuXG5mdW5jdGlvbiBwbHVyYWxUeXBlTmFtZShsb2NhbGUpIHtcbiAgdmFyIGxhbmdUb1BsdXJhbFR5cGUgPSBsYW5nVG9UeXBlTWFwKHBsdXJhbFR5cGVUb0xhbmd1YWdlcyk7XG4gIHJldHVybiBsYW5nVG9QbHVyYWxUeXBlW2xvY2FsZV1cbiAgICB8fCBsYW5nVG9QbHVyYWxUeXBlW3NwbGl0LmNhbGwobG9jYWxlLCAvLS8sIDEpWzBdXVxuICAgIHx8IGxhbmdUb1BsdXJhbFR5cGUuZW47XG59XG5cbmZ1bmN0aW9uIHBsdXJhbFR5cGVJbmRleChsb2NhbGUsIGNvdW50KSB7XG4gIHJldHVybiBwbHVyYWxUeXBlc1twbHVyYWxUeXBlTmFtZShsb2NhbGUpXShjb3VudCk7XG59XG5cbmZ1bmN0aW9uIGVzY2FwZSh0b2tlbikge1xuICByZXR1cm4gdG9rZW4ucmVwbGFjZSgvWy4qKz9eJHt9KCl8W1xcXVxcXFxdL2csICdcXFxcJCYnKTtcbn1cblxuZnVuY3Rpb24gY29uc3RydWN0VG9rZW5SZWdleChvcHRzKSB7XG4gIHZhciBwcmVmaXggPSAob3B0cyAmJiBvcHRzLnByZWZpeCkgfHwgJyV7JztcbiAgdmFyIHN1ZmZpeCA9IChvcHRzICYmIG9wdHMuc3VmZml4KSB8fCAnfSc7XG5cbiAgaWYgKHByZWZpeCA9PT0gZGVsaW1pdGVyIHx8IHN1ZmZpeCA9PT0gZGVsaW1pdGVyKSB7XG4gICAgdGhyb3cgbmV3IFJhbmdlRXJyb3IoJ1wiJyArIGRlbGltaXRlciArICdcIiB0b2tlbiBpcyByZXNlcnZlZCBmb3IgcGx1cmFsaXphdGlvbicpO1xuICB9XG5cbiAgcmV0dXJuIG5ldyBSZWdFeHAoZXNjYXBlKHByZWZpeCkgKyAnKC4qPyknICsgZXNjYXBlKHN1ZmZpeCksICdnJyk7XG59XG5cbnZhciBkb2xsYXJSZWdleCA9IC9cXCQvZztcbnZhciBkb2xsYXJCaWxsc1lhbGwgPSAnJCQnO1xudmFyIGRlZmF1bHRUb2tlblJlZ2V4ID0gLyVcXHsoLio/KVxcfS9nO1xuXG4vLyAjIyMgdHJhbnNmb3JtUGhyYXNlKHBocmFzZSwgc3Vic3RpdHV0aW9ucywgbG9jYWxlKVxuLy9cbi8vIFRha2VzIGEgcGhyYXNlIHN0cmluZyBhbmQgdHJhbnNmb3JtcyBpdCBieSBjaG9vc2luZyB0aGUgY29ycmVjdFxuLy8gcGx1cmFsIGZvcm0gYW5kIGludGVycG9sYXRpbmcgaXQuXG4vL1xuLy8gICAgIHRyYW5zZm9ybVBocmFzZSgnSGVsbG8sICV7bmFtZX0hJywge25hbWU6ICdTcGlrZSd9KTtcbi8vICAgICAvLyBcIkhlbGxvLCBTcGlrZSFcIlxuLy9cbi8vIFRoZSBjb3JyZWN0IHBsdXJhbCBmb3JtIGlzIHNlbGVjdGVkIGlmIHN1YnN0aXR1dGlvbnMuc21hcnRfY291bnRcbi8vIGlzIHNldC4gWW91IGNhbiBwYXNzIGluIGEgbnVtYmVyIGluc3RlYWQgb2YgYW4gT2JqZWN0IGFzIGBzdWJzdGl0dXRpb25zYFxuLy8gYXMgYSBzaG9ydGN1dCBmb3IgYHNtYXJ0X2NvdW50YC5cbi8vXG4vLyAgICAgdHJhbnNmb3JtUGhyYXNlKCcle3NtYXJ0X2NvdW50fSBuZXcgbWVzc2FnZXMgfHx8fCAxIG5ldyBtZXNzYWdlJywge3NtYXJ0X2NvdW50OiAxfSwgJ2VuJyk7XG4vLyAgICAgLy8gXCIxIG5ldyBtZXNzYWdlXCJcbi8vXG4vLyAgICAgdHJhbnNmb3JtUGhyYXNlKCcle3NtYXJ0X2NvdW50fSBuZXcgbWVzc2FnZXMgfHx8fCAxIG5ldyBtZXNzYWdlJywge3NtYXJ0X2NvdW50OiAyfSwgJ2VuJyk7XG4vLyAgICAgLy8gXCIyIG5ldyBtZXNzYWdlc1wiXG4vL1xuLy8gICAgIHRyYW5zZm9ybVBocmFzZSgnJXtzbWFydF9jb3VudH0gbmV3IG1lc3NhZ2VzIHx8fHwgMSBuZXcgbWVzc2FnZScsIDUsICdlbicpO1xuLy8gICAgIC8vIFwiNSBuZXcgbWVzc2FnZXNcIlxuLy9cbi8vIFlvdSBzaG91bGQgcGFzcyBpbiBhIHRoaXJkIGFyZ3VtZW50LCB0aGUgbG9jYWxlLCB0byBzcGVjaWZ5IHRoZSBjb3JyZWN0IHBsdXJhbCB0eXBlLlxuLy8gSXQgZGVmYXVsdHMgdG8gYCdlbidgIHdpdGggMiBwbHVyYWwgZm9ybXMuXG5mdW5jdGlvbiB0cmFuc2Zvcm1QaHJhc2UocGhyYXNlLCBzdWJzdGl0dXRpb25zLCBsb2NhbGUsIHRva2VuUmVnZXgpIHtcbiAgaWYgKHR5cGVvZiBwaHJhc2UgIT09ICdzdHJpbmcnKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcignUG9seWdsb3QudHJhbnNmb3JtUGhyYXNlIGV4cGVjdHMgYXJndW1lbnQgIzEgdG8gYmUgc3RyaW5nJyk7XG4gIH1cblxuICBpZiAoc3Vic3RpdHV0aW9ucyA9PSBudWxsKSB7XG4gICAgcmV0dXJuIHBocmFzZTtcbiAgfVxuXG4gIHZhciByZXN1bHQgPSBwaHJhc2U7XG4gIHZhciBpbnRlcnBvbGF0aW9uUmVnZXggPSB0b2tlblJlZ2V4IHx8IGRlZmF1bHRUb2tlblJlZ2V4O1xuXG4gIC8vIGFsbG93IG51bWJlciBhcyBhIHBsdXJhbGl6YXRpb24gc2hvcnRjdXRcbiAgdmFyIG9wdGlvbnMgPSB0eXBlb2Ygc3Vic3RpdHV0aW9ucyA9PT0gJ251bWJlcicgPyB7IHNtYXJ0X2NvdW50OiBzdWJzdGl0dXRpb25zIH0gOiBzdWJzdGl0dXRpb25zO1xuXG4gIC8vIFNlbGVjdCBwbHVyYWwgZm9ybTogYmFzZWQgb24gYSBwaHJhc2UgdGV4dCB0aGF0IGNvbnRhaW5zIGBuYFxuICAvLyBwbHVyYWwgZm9ybXMgc2VwYXJhdGVkIGJ5IGBkZWxpbWl0ZXJgLCBhIGBsb2NhbGVgLCBhbmQgYSBgc3Vic3RpdHV0aW9ucy5zbWFydF9jb3VudGAsXG4gIC8vIGNob29zZSB0aGUgY29ycmVjdCBwbHVyYWwgZm9ybS4gVGhpcyBpcyBvbmx5IGRvbmUgaWYgYGNvdW50YCBpcyBzZXQuXG4gIGlmIChvcHRpb25zLnNtYXJ0X2NvdW50ICE9IG51bGwgJiYgcmVzdWx0KSB7XG4gICAgdmFyIHRleHRzID0gc3BsaXQuY2FsbChyZXN1bHQsIGRlbGltaXRlcik7XG4gICAgcmVzdWx0ID0gdHJpbSh0ZXh0c1twbHVyYWxUeXBlSW5kZXgobG9jYWxlIHx8ICdlbicsIG9wdGlvbnMuc21hcnRfY291bnQpXSB8fCB0ZXh0c1swXSk7XG4gIH1cblxuICAvLyBJbnRlcnBvbGF0ZTogQ3JlYXRlcyBhIGBSZWdFeHBgIG9iamVjdCBmb3IgZWFjaCBpbnRlcnBvbGF0aW9uIHBsYWNlaG9sZGVyLlxuICByZXN1bHQgPSByZXBsYWNlLmNhbGwocmVzdWx0LCBpbnRlcnBvbGF0aW9uUmVnZXgsIGZ1bmN0aW9uIChleHByZXNzaW9uLCBhcmd1bWVudCkge1xuICAgIGlmICghaGFzKG9wdGlvbnMsIGFyZ3VtZW50KSB8fCBvcHRpb25zW2FyZ3VtZW50XSA9PSBudWxsKSB7IHJldHVybiBleHByZXNzaW9uOyB9XG4gICAgLy8gRW5zdXJlIHJlcGxhY2VtZW50IHZhbHVlIGlzIGVzY2FwZWQgdG8gcHJldmVudCBzcGVjaWFsICQtcHJlZml4ZWQgcmVnZXggcmVwbGFjZSB0b2tlbnMuXG4gICAgcmV0dXJuIHJlcGxhY2UuY2FsbChvcHRpb25zW2FyZ3VtZW50XSwgZG9sbGFyUmVnZXgsIGRvbGxhckJpbGxzWWFsbCk7XG4gIH0pO1xuXG4gIHJldHVybiByZXN1bHQ7XG59XG5cbi8vICMjIyBQb2x5Z2xvdCBjbGFzcyBjb25zdHJ1Y3RvclxuZnVuY3Rpb24gUG9seWdsb3Qob3B0aW9ucykge1xuICB2YXIgb3B0cyA9IG9wdGlvbnMgfHwge307XG4gIHRoaXMucGhyYXNlcyA9IHt9O1xuICB0aGlzLmV4dGVuZChvcHRzLnBocmFzZXMgfHwge30pO1xuICB0aGlzLmN1cnJlbnRMb2NhbGUgPSBvcHRzLmxvY2FsZSB8fCAnZW4nO1xuICB2YXIgYWxsb3dNaXNzaW5nID0gb3B0cy5hbGxvd01pc3NpbmcgPyB0cmFuc2Zvcm1QaHJhc2UgOiBudWxsO1xuICB0aGlzLm9uTWlzc2luZ0tleSA9IHR5cGVvZiBvcHRzLm9uTWlzc2luZ0tleSA9PT0gJ2Z1bmN0aW9uJyA/IG9wdHMub25NaXNzaW5nS2V5IDogYWxsb3dNaXNzaW5nO1xuICB0aGlzLndhcm4gPSBvcHRzLndhcm4gfHwgd2FybjtcbiAgdGhpcy50b2tlblJlZ2V4ID0gY29uc3RydWN0VG9rZW5SZWdleChvcHRzLmludGVycG9sYXRpb24pO1xufVxuXG4vLyAjIyMgcG9seWdsb3QubG9jYWxlKFtsb2NhbGVdKVxuLy9cbi8vIEdldCBvciBzZXQgbG9jYWxlLiBJbnRlcm5hbGx5LCBQb2x5Z2xvdCBvbmx5IHVzZXMgbG9jYWxlIGZvciBwbHVyYWxpemF0aW9uLlxuUG9seWdsb3QucHJvdG90eXBlLmxvY2FsZSA9IGZ1bmN0aW9uIChuZXdMb2NhbGUpIHtcbiAgaWYgKG5ld0xvY2FsZSkgdGhpcy5jdXJyZW50TG9jYWxlID0gbmV3TG9jYWxlO1xuICByZXR1cm4gdGhpcy5jdXJyZW50TG9jYWxlO1xufTtcblxuLy8gIyMjIHBvbHlnbG90LmV4dGVuZChwaHJhc2VzKVxuLy9cbi8vIFVzZSBgZXh0ZW5kYCB0byB0ZWxsIFBvbHlnbG90IGhvdyB0byB0cmFuc2xhdGUgYSBnaXZlbiBrZXkuXG4vL1xuLy8gICAgIHBvbHlnbG90LmV4dGVuZCh7XG4vLyAgICAgICBcImhlbGxvXCI6IFwiSGVsbG9cIixcbi8vICAgICAgIFwiaGVsbG9fbmFtZVwiOiBcIkhlbGxvLCAle25hbWV9XCJcbi8vICAgICB9KTtcbi8vXG4vLyBUaGUga2V5IGNhbiBiZSBhbnkgc3RyaW5nLiAgRmVlbCBmcmVlIHRvIGNhbGwgYGV4dGVuZGAgbXVsdGlwbGUgdGltZXM7XG4vLyBpdCB3aWxsIG92ZXJyaWRlIGFueSBwaHJhc2VzIHdpdGggdGhlIHNhbWUga2V5LCBidXQgbGVhdmUgZXhpc3RpbmcgcGhyYXNlc1xuLy8gdW50b3VjaGVkLlxuLy9cbi8vIEl0IGlzIGFsc28gcG9zc2libGUgdG8gcGFzcyBuZXN0ZWQgcGhyYXNlIG9iamVjdHMsIHdoaWNoIGdldCBmbGF0dGVuZWRcbi8vIGludG8gYW4gb2JqZWN0IHdpdGggdGhlIG5lc3RlZCBrZXlzIGNvbmNhdGVuYXRlZCB1c2luZyBkb3Qgbm90YXRpb24uXG4vL1xuLy8gICAgIHBvbHlnbG90LmV4dGVuZCh7XG4vLyAgICAgICBcIm5hdlwiOiB7XG4vLyAgICAgICAgIFwiaGVsbG9cIjogXCJIZWxsb1wiLFxuLy8gICAgICAgICBcImhlbGxvX25hbWVcIjogXCJIZWxsbywgJXtuYW1lfVwiLFxuLy8gICAgICAgICBcInNpZGViYXJcIjoge1xuLy8gICAgICAgICAgIFwid2VsY29tZVwiOiBcIldlbGNvbWVcIlxuLy8gICAgICAgICB9XG4vLyAgICAgICB9XG4vLyAgICAgfSk7XG4vL1xuLy8gICAgIGNvbnNvbGUubG9nKHBvbHlnbG90LnBocmFzZXMpO1xuLy8gICAgIC8vIHtcbi8vICAgICAvLyAgICduYXYuaGVsbG8nOiAnSGVsbG8nLFxuLy8gICAgIC8vICAgJ25hdi5oZWxsb19uYW1lJzogJ0hlbGxvLCAle25hbWV9Jyxcbi8vICAgICAvLyAgICduYXYuc2lkZWJhci53ZWxjb21lJzogJ1dlbGNvbWUnXG4vLyAgICAgLy8gfVxuLy9cbi8vIGBleHRlbmRgIGFjY2VwdHMgYW4gb3B0aW9uYWwgc2Vjb25kIGFyZ3VtZW50LCBgcHJlZml4YCwgd2hpY2ggY2FuIGJlIHVzZWRcbi8vIHRvIHByZWZpeCBldmVyeSBrZXkgaW4gdGhlIHBocmFzZXMgb2JqZWN0IHdpdGggc29tZSBzdHJpbmcsIHVzaW5nIGRvdFxuLy8gbm90YXRpb24uXG4vL1xuLy8gICAgIHBvbHlnbG90LmV4dGVuZCh7XG4vLyAgICAgICBcImhlbGxvXCI6IFwiSGVsbG9cIixcbi8vICAgICAgIFwiaGVsbG9fbmFtZVwiOiBcIkhlbGxvLCAle25hbWV9XCJcbi8vICAgICB9LCBcIm5hdlwiKTtcbi8vXG4vLyAgICAgY29uc29sZS5sb2cocG9seWdsb3QucGhyYXNlcyk7XG4vLyAgICAgLy8ge1xuLy8gICAgIC8vICAgJ25hdi5oZWxsbyc6ICdIZWxsbycsXG4vLyAgICAgLy8gICAnbmF2LmhlbGxvX25hbWUnOiAnSGVsbG8sICV7bmFtZX0nXG4vLyAgICAgLy8gfVxuLy9cbi8vIFRoaXMgZmVhdHVyZSBpcyB1c2VkIGludGVybmFsbHkgdG8gc3VwcG9ydCBuZXN0ZWQgcGhyYXNlIG9iamVjdHMuXG5Qb2x5Z2xvdC5wcm90b3R5cGUuZXh0ZW5kID0gZnVuY3Rpb24gKG1vcmVQaHJhc2VzLCBwcmVmaXgpIHtcbiAgZm9yRWFjaChtb3JlUGhyYXNlcywgZnVuY3Rpb24gKHBocmFzZSwga2V5KSB7XG4gICAgdmFyIHByZWZpeGVkS2V5ID0gcHJlZml4ID8gcHJlZml4ICsgJy4nICsga2V5IDoga2V5O1xuICAgIGlmICh0eXBlb2YgcGhyYXNlID09PSAnb2JqZWN0Jykge1xuICAgICAgdGhpcy5leHRlbmQocGhyYXNlLCBwcmVmaXhlZEtleSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMucGhyYXNlc1twcmVmaXhlZEtleV0gPSBwaHJhc2U7XG4gICAgfVxuICB9LCB0aGlzKTtcbn07XG5cbi8vICMjIyBwb2x5Z2xvdC51bnNldChwaHJhc2VzKVxuLy8gVXNlIGB1bnNldGAgdG8gc2VsZWN0aXZlbHkgcmVtb3ZlIGtleXMgZnJvbSBhIHBvbHlnbG90IGluc3RhbmNlLlxuLy9cbi8vICAgICBwb2x5Z2xvdC51bnNldChcInNvbWVfa2V5XCIpO1xuLy8gICAgIHBvbHlnbG90LnVuc2V0KHtcbi8vICAgICAgIFwiaGVsbG9cIjogXCJIZWxsb1wiLFxuLy8gICAgICAgXCJoZWxsb19uYW1lXCI6IFwiSGVsbG8sICV7bmFtZX1cIlxuLy8gICAgIH0pO1xuLy9cbi8vIFRoZSB1bnNldCBtZXRob2QgY2FuIHRha2UgZWl0aGVyIGEgc3RyaW5nIChmb3IgdGhlIGtleSksIG9yIGFuIG9iamVjdCBoYXNoIHdpdGhcbi8vIHRoZSBrZXlzIHRoYXQgeW91IHdvdWxkIGxpa2UgdG8gdW5zZXQuXG5Qb2x5Z2xvdC5wcm90b3R5cGUudW5zZXQgPSBmdW5jdGlvbiAobW9yZVBocmFzZXMsIHByZWZpeCkge1xuICBpZiAodHlwZW9mIG1vcmVQaHJhc2VzID09PSAnc3RyaW5nJykge1xuICAgIGRlbGV0ZSB0aGlzLnBocmFzZXNbbW9yZVBocmFzZXNdO1xuICB9IGVsc2Uge1xuICAgIGZvckVhY2gobW9yZVBocmFzZXMsIGZ1bmN0aW9uIChwaHJhc2UsIGtleSkge1xuICAgICAgdmFyIHByZWZpeGVkS2V5ID0gcHJlZml4ID8gcHJlZml4ICsgJy4nICsga2V5IDoga2V5O1xuICAgICAgaWYgKHR5cGVvZiBwaHJhc2UgPT09ICdvYmplY3QnKSB7XG4gICAgICAgIHRoaXMudW5zZXQocGhyYXNlLCBwcmVmaXhlZEtleSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBkZWxldGUgdGhpcy5waHJhc2VzW3ByZWZpeGVkS2V5XTtcbiAgICAgIH1cbiAgICB9LCB0aGlzKTtcbiAgfVxufTtcblxuLy8gIyMjIHBvbHlnbG90LmNsZWFyKClcbi8vXG4vLyBDbGVhcnMgYWxsIHBocmFzZXMuIFVzZWZ1bCBmb3Igc3BlY2lhbCBjYXNlcywgc3VjaCBhcyBmcmVlaW5nXG4vLyB1cCBtZW1vcnkgaWYgeW91IGhhdmUgbG90cyBvZiBwaHJhc2VzIGJ1dCBubyBsb25nZXIgbmVlZCB0b1xuLy8gcGVyZm9ybSBhbnkgdHJhbnNsYXRpb24uIEFsc28gdXNlZCBpbnRlcm5hbGx5IGJ5IGByZXBsYWNlYC5cblBvbHlnbG90LnByb3RvdHlwZS5jbGVhciA9IGZ1bmN0aW9uICgpIHtcbiAgdGhpcy5waHJhc2VzID0ge307XG59O1xuXG4vLyAjIyMgcG9seWdsb3QucmVwbGFjZShwaHJhc2VzKVxuLy9cbi8vIENvbXBsZXRlbHkgcmVwbGFjZSB0aGUgZXhpc3RpbmcgcGhyYXNlcyB3aXRoIGEgbmV3IHNldCBvZiBwaHJhc2VzLlxuLy8gTm9ybWFsbHksIGp1c3QgdXNlIGBleHRlbmRgIHRvIGFkZCBtb3JlIHBocmFzZXMsIGJ1dCB1bmRlciBjZXJ0YWluXG4vLyBjaXJjdW1zdGFuY2VzLCB5b3UgbWF5IHdhbnQgdG8gbWFrZSBzdXJlIG5vIG9sZCBwaHJhc2VzIGFyZSBseWluZyBhcm91bmQuXG5Qb2x5Z2xvdC5wcm90b3R5cGUucmVwbGFjZSA9IGZ1bmN0aW9uIChuZXdQaHJhc2VzKSB7XG4gIHRoaXMuY2xlYXIoKTtcbiAgdGhpcy5leHRlbmQobmV3UGhyYXNlcyk7XG59O1xuXG5cbi8vICMjIyBwb2x5Z2xvdC50KGtleSwgb3B0aW9ucylcbi8vXG4vLyBUaGUgbW9zdC11c2VkIG1ldGhvZC4gUHJvdmlkZSBhIGtleSwgYW5kIGB0YCB3aWxsIHJldHVybiB0aGVcbi8vIHBocmFzZS5cbi8vXG4vLyAgICAgcG9seWdsb3QudChcImhlbGxvXCIpO1xuLy8gICAgID0+IFwiSGVsbG9cIlxuLy9cbi8vIFRoZSBwaHJhc2UgdmFsdWUgaXMgcHJvdmlkZWQgZmlyc3QgYnkgYSBjYWxsIHRvIGBwb2x5Z2xvdC5leHRlbmQoKWAgb3Jcbi8vIGBwb2x5Z2xvdC5yZXBsYWNlKClgLlxuLy9cbi8vIFBhc3MgaW4gYW4gb2JqZWN0IGFzIHRoZSBzZWNvbmQgYXJndW1lbnQgdG8gcGVyZm9ybSBpbnRlcnBvbGF0aW9uLlxuLy9cbi8vICAgICBwb2x5Z2xvdC50KFwiaGVsbG9fbmFtZVwiLCB7bmFtZTogXCJTcGlrZVwifSk7XG4vLyAgICAgPT4gXCJIZWxsbywgU3Bpa2VcIlxuLy9cbi8vIElmIHlvdSBsaWtlLCB5b3UgY2FuIHByb3ZpZGUgYSBkZWZhdWx0IHZhbHVlIGluIGNhc2UgdGhlIHBocmFzZSBpcyBtaXNzaW5nLlxuLy8gVXNlIHRoZSBzcGVjaWFsIG9wdGlvbiBrZXkgXCJfXCIgdG8gc3BlY2lmeSBhIGRlZmF1bHQuXG4vL1xuLy8gICAgIHBvbHlnbG90LnQoXCJpX2xpa2VfdG9fd3JpdGVfaW5fbGFuZ3VhZ2VcIiwge1xuLy8gICAgICAgXzogXCJJIGxpa2UgdG8gd3JpdGUgaW4gJXtsYW5ndWFnZX0uXCIsXG4vLyAgICAgICBsYW5ndWFnZTogXCJKYXZhU2NyaXB0XCJcbi8vICAgICB9KTtcbi8vICAgICA9PiBcIkkgbGlrZSB0byB3cml0ZSBpbiBKYXZhU2NyaXB0LlwiXG4vL1xuUG9seWdsb3QucHJvdG90eXBlLnQgPSBmdW5jdGlvbiAoa2V5LCBvcHRpb25zKSB7XG4gIHZhciBwaHJhc2UsIHJlc3VsdDtcbiAgdmFyIG9wdHMgPSBvcHRpb25zID09IG51bGwgPyB7fSA6IG9wdGlvbnM7XG4gIGlmICh0eXBlb2YgdGhpcy5waHJhc2VzW2tleV0gPT09ICdzdHJpbmcnKSB7XG4gICAgcGhyYXNlID0gdGhpcy5waHJhc2VzW2tleV07XG4gIH0gZWxzZSBpZiAodHlwZW9mIG9wdHMuXyA9PT0gJ3N0cmluZycpIHtcbiAgICBwaHJhc2UgPSBvcHRzLl87XG4gIH0gZWxzZSBpZiAodGhpcy5vbk1pc3NpbmdLZXkpIHtcbiAgICB2YXIgb25NaXNzaW5nS2V5ID0gdGhpcy5vbk1pc3NpbmdLZXk7XG4gICAgcmVzdWx0ID0gb25NaXNzaW5nS2V5KGtleSwgb3B0cywgdGhpcy5jdXJyZW50TG9jYWxlLCB0aGlzLnRva2VuUmVnZXgpO1xuICB9IGVsc2Uge1xuICAgIHRoaXMud2FybignTWlzc2luZyB0cmFuc2xhdGlvbiBmb3Iga2V5OiBcIicgKyBrZXkgKyAnXCInKTtcbiAgICByZXN1bHQgPSBrZXk7XG4gIH1cbiAgaWYgKHR5cGVvZiBwaHJhc2UgPT09ICdzdHJpbmcnKSB7XG4gICAgcmVzdWx0ID0gdHJhbnNmb3JtUGhyYXNlKHBocmFzZSwgb3B0cywgdGhpcy5jdXJyZW50TG9jYWxlLCB0aGlzLnRva2VuUmVnZXgpO1xuICB9XG4gIHJldHVybiByZXN1bHQ7XG59O1xuXG5cbi8vICMjIyBwb2x5Z2xvdC5oYXMoa2V5KVxuLy9cbi8vIENoZWNrIGlmIHBvbHlnbG90IGhhcyBhIHRyYW5zbGF0aW9uIGZvciBnaXZlbiBrZXlcblBvbHlnbG90LnByb3RvdHlwZS5oYXMgPSBmdW5jdGlvbiAoa2V5KSB7XG4gIHJldHVybiBoYXModGhpcy5waHJhc2VzLCBrZXkpO1xufTtcblxuLy8gZXhwb3J0IHRyYW5zZm9ybVBocmFzZVxuUG9seWdsb3QudHJhbnNmb3JtUGhyYXNlID0gZnVuY3Rpb24gdHJhbnNmb3JtKHBocmFzZSwgc3Vic3RpdHV0aW9ucywgbG9jYWxlKSB7XG4gIHJldHVybiB0cmFuc2Zvcm1QaHJhc2UocGhyYXNlLCBzdWJzdGl0dXRpb25zLCBsb2NhbGUpO1xufTtcblxudmFyIHdlYml4UG9seWdsb3QgPSBQb2x5Z2xvdDtcblxuZnVuY3Rpb24gTG9jYWxlKGFwcCwgX3ZpZXcsIGNvbmZpZykge1xyXG4gICAgY29uZmlnID0gY29uZmlnIHx8IHt9O1xyXG4gICAgY29uc3Qgc3RvcmFnZSA9IGNvbmZpZy5zdG9yYWdlO1xyXG4gICAgbGV0IGxhbmcgPSBzdG9yYWdlID8gKHN0b3JhZ2UuZ2V0KFwibGFuZ1wiKSB8fCBcImVuXCIpIDogKGNvbmZpZy5sYW5nIHx8IFwiZW5cIik7XHJcbiAgICBmdW5jdGlvbiBzZXRMYW5nRGF0YShuYW1lLCBkYXRhLCBzaWxlbnQpIHtcclxuICAgICAgICBpZiAoZGF0YS5fX2VzTW9kdWxlKSB7XHJcbiAgICAgICAgICAgIGRhdGEgPSBkYXRhLmRlZmF1bHQ7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNvbnN0IHBjb25maWcgPSB7IHBocmFzZXM6IGRhdGEgfTtcclxuICAgICAgICBpZiAoY29uZmlnLnBvbHlnbG90KSB7XHJcbiAgICAgICAgICAgIGFwcC53ZWJpeC5leHRlbmQocGNvbmZpZywgY29uZmlnLnBvbHlnbG90KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgY29uc3QgcG9seSA9IHNlcnZpY2UucG9seWdsb3QgPSBuZXcgd2ViaXhQb2x5Z2xvdChwY29uZmlnKTtcclxuICAgICAgICBwb2x5LmxvY2FsZShuYW1lKTtcclxuICAgICAgICBzZXJ2aWNlLl8gPSBhcHAud2ViaXguYmluZChwb2x5LnQsIHBvbHkpO1xyXG4gICAgICAgIGxhbmcgPSBuYW1lO1xyXG4gICAgICAgIGlmIChzdG9yYWdlKSB7XHJcbiAgICAgICAgICAgIHN0b3JhZ2UucHV0KFwibGFuZ1wiLCBsYW5nKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKGNvbmZpZy53ZWJpeCkge1xyXG4gICAgICAgICAgICBjb25zdCBsb2NOYW1lID0gY29uZmlnLndlYml4W25hbWVdO1xyXG4gICAgICAgICAgICBpZiAobG9jTmFtZSkge1xyXG4gICAgICAgICAgICAgICAgYXBwLndlYml4LmkxOG4uc2V0TG9jYWxlKGxvY05hbWUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICghc2lsZW50KSB7XHJcbiAgICAgICAgICAgIHJldHVybiBhcHAucmVmcmVzaCgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKCk7XHJcbiAgICB9XHJcbiAgICBmdW5jdGlvbiBnZXRMYW5nKCkgeyByZXR1cm4gbGFuZzsgfVxyXG4gICAgZnVuY3Rpb24gc2V0TGFuZyhuYW1lLCBzaWxlbnQpIHtcclxuICAgICAgICAvLyBpZ25vcmUgc2V0TGFuZyBpZiBsb2FkaW5nIGJ5IHBhdGggaXMgZGlzYWJsZWRcclxuICAgICAgICBpZiAoY29uZmlnLnBhdGggPT09IGZhbHNlKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgY29uc3QgcGF0aCA9IChjb25maWcucGF0aCA/IGNvbmZpZy5wYXRoICsgXCIvXCIgOiBcIlwiKSArIG5hbWU7XHJcbiAgICAgICAgY29uc3QgZGF0YSA9IHJlcXVpcmUoXCJqZXQtbG9jYWxlcy9cIiArIHBhdGgpO1xyXG4gICAgICAgIHNldExhbmdEYXRhKG5hbWUsIGRhdGEsIHNpbGVudCk7XHJcbiAgICB9XHJcbiAgICBjb25zdCBzZXJ2aWNlID0ge1xyXG4gICAgICAgIGdldExhbmcsIHNldExhbmcsIHNldExhbmdEYXRhLCBfOiBudWxsLCBwb2x5Z2xvdDogbnVsbFxyXG4gICAgfTtcclxuICAgIGFwcC5zZXRTZXJ2aWNlKFwibG9jYWxlXCIsIHNlcnZpY2UpO1xyXG4gICAgc2V0TGFuZyhsYW5nLCB0cnVlKTtcclxufVxuXG5mdW5jdGlvbiBzaG93KHZpZXcsIGNvbmZpZywgdmFsdWUpIHtcclxuICAgIGlmIChjb25maWcudXJscykge1xyXG4gICAgICAgIHZhbHVlID0gY29uZmlnLnVybHNbdmFsdWVdIHx8IHZhbHVlO1xyXG4gICAgfVxyXG4gICAgZWxzZSBpZiAoY29uZmlnLnBhcmFtKSB7XHJcbiAgICAgICAgdmFsdWUgPSB7IFtjb25maWcucGFyYW1dOiB2YWx1ZSB9O1xyXG4gICAgfVxyXG4gICAgdmlldy5zaG93KHZhbHVlKTtcclxufVxyXG5mdW5jdGlvbiBNZW51KGFwcCwgdmlldywgY29uZmlnKSB7XHJcbiAgICBjb25zdCBmcmFtZSA9IHZpZXcuZ2V0U3ViVmlld0luZm8oKS5wYXJlbnQ7XHJcbiAgICBjb25zdCB1aSA9IHZpZXcuJCQoY29uZmlnLmlkIHx8IGNvbmZpZyk7XHJcbiAgICBsZXQgc2lsZW50ID0gZmFsc2U7XHJcbiAgICB1aS5hdHRhY2hFdmVudChcIm9uY2hhbmdlXCIsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBpZiAoIXNpbGVudCkge1xyXG4gICAgICAgICAgICBzaG93KGZyYW1lLCBjb25maWcsIHRoaXMuZ2V0VmFsdWUoKSk7XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcbiAgICB1aS5hdHRhY2hFdmVudChcIm9uYWZ0ZXJzZWxlY3RcIiwgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIGlmICghc2lsZW50KSB7XHJcbiAgICAgICAgICAgIGxldCBpZCA9IG51bGw7XHJcbiAgICAgICAgICAgIGlmICh1aS5zZXRWYWx1ZSkge1xyXG4gICAgICAgICAgICAgICAgaWQgPSB0aGlzLmdldFZhbHVlKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSBpZiAodWkuZ2V0U2VsZWN0ZWRJZCkge1xyXG4gICAgICAgICAgICAgICAgaWQgPSB1aS5nZXRTZWxlY3RlZElkKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgc2hvdyhmcmFtZSwgY29uZmlnLCBpZCk7XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcbiAgICB2aWV3Lm9uKGFwcCwgYGFwcDpyb3V0ZWAsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBsZXQgbmFtZSA9IFwiXCI7XHJcbiAgICAgICAgaWYgKGNvbmZpZy5wYXJhbSkge1xyXG4gICAgICAgICAgICBuYW1lID0gdmlldy5nZXRQYXJhbShjb25maWcucGFyYW0sIHRydWUpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgY29uc3Qgc2VnbWVudCA9IGZyYW1lLmdldFVybCgpWzFdO1xyXG4gICAgICAgICAgICBpZiAoc2VnbWVudCkge1xyXG4gICAgICAgICAgICAgICAgbmFtZSA9IHNlZ21lbnQucGFnZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAobmFtZSkge1xyXG4gICAgICAgICAgICBzaWxlbnQgPSB0cnVlO1xyXG4gICAgICAgICAgICBpZiAodWkuc2V0VmFsdWUgJiYgdWkuZ2V0VmFsdWUoKSAhPT0gbmFtZSkge1xyXG4gICAgICAgICAgICAgICAgdWkuc2V0VmFsdWUobmFtZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSBpZiAodWkuc2VsZWN0ICYmIHVpLmV4aXN0cyhuYW1lKSAmJiB1aS5nZXRTZWxlY3RlZElkKCkgIT09IG5hbWUpIHtcclxuICAgICAgICAgICAgICAgIHVpLnNlbGVjdChuYW1lKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBzaWxlbnQgPSBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxufVxuXG5jb25zdCBiYXNlaWNvbnMgPSB7XHJcbiAgICBnb29kOiBcImNoZWNrXCIsXHJcbiAgICBlcnJvcjogXCJ3YXJuaW5nXCIsXHJcbiAgICBzYXZpbmc6IFwicmVmcmVzaCBmYS1zcGluXCJcclxufTtcclxuY29uc3QgYmFzZXRleHQgPSB7XHJcbiAgICBnb29kOiBcIk9rXCIsXHJcbiAgICBlcnJvcjogXCJFcnJvclwiLFxyXG4gICAgc2F2aW5nOiBcIkNvbm5lY3RpbmcuLi5cIlxyXG59O1xyXG5mdW5jdGlvbiBTdGF0dXMoYXBwLCB2aWV3LCBjb25maWcpIHtcclxuICAgIGxldCBzdGF0dXMgPSBcImdvb2RcIjtcclxuICAgIGxldCBjb3VudCA9IDA7XHJcbiAgICBsZXQgaXNlcnJvciA9IGZhbHNlO1xyXG4gICAgbGV0IGV4cGlyZURlbGF5ID0gY29uZmlnLmV4cGlyZTtcclxuICAgIGlmICghZXhwaXJlRGVsYXkgJiYgZXhwaXJlRGVsYXkgIT09IGZhbHNlKSB7XHJcbiAgICAgICAgZXhwaXJlRGVsYXkgPSAyMDAwO1xyXG4gICAgfVxyXG4gICAgY29uc3QgdGV4dHMgPSBjb25maWcudGV4dHMgfHwgYmFzZXRleHQ7XHJcbiAgICBjb25zdCBpY29ucyA9IGNvbmZpZy5pY29ucyB8fCBiYXNlaWNvbnM7XHJcbiAgICBpZiAodHlwZW9mIGNvbmZpZyA9PT0gXCJzdHJpbmdcIikge1xyXG4gICAgICAgIGNvbmZpZyA9IHsgdGFyZ2V0OiBjb25maWcgfTtcclxuICAgIH1cclxuICAgIGZ1bmN0aW9uIHJlZnJlc2goY29udGVudCkge1xyXG4gICAgICAgIGNvbnN0IGFyZWEgPSB2aWV3LiQkKGNvbmZpZy50YXJnZXQpO1xyXG4gICAgICAgIGlmIChhcmVhKSB7XHJcbiAgICAgICAgICAgIGlmICghY29udGVudCkge1xyXG4gICAgICAgICAgICAgICAgY29udGVudCA9IFwiPGRpdiBjbGFzcz0nc3RhdHVzX1wiICtcclxuICAgICAgICAgICAgICAgICAgICBzdGF0dXMgK1xyXG4gICAgICAgICAgICAgICAgICAgIFwiJz48c3BhbiBjbGFzcz0nd2ViaXhfaWNvbiBmYS1cIiArXHJcbiAgICAgICAgICAgICAgICAgICAgaWNvbnNbc3RhdHVzXSArIFwiJz48L3NwYW4+IFwiICsgdGV4dHNbc3RhdHVzXSArIFwiPC9kaXY+XCI7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgYXJlYS5zZXRIVE1MKGNvbnRlbnQpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGZ1bmN0aW9uIHN1Y2Nlc3MoKSB7XHJcbiAgICAgICAgY291bnQtLTtcclxuICAgICAgICBzZXRTdGF0dXMoXCJnb29kXCIpO1xyXG4gICAgfVxyXG4gICAgZnVuY3Rpb24gZmFpbChlcnIpIHtcclxuICAgICAgICBjb3VudC0tO1xyXG4gICAgICAgIHNldFN0YXR1cyhcImVycm9yXCIsIGVycik7XHJcbiAgICB9XHJcbiAgICBmdW5jdGlvbiBzdGFydChwcm9taXNlKSB7XHJcbiAgICAgICAgY291bnQrKztcclxuICAgICAgICBzZXRTdGF0dXMoXCJzYXZpbmdcIik7XHJcbiAgICAgICAgaWYgKHByb21pc2UgJiYgcHJvbWlzZS50aGVuKSB7XHJcbiAgICAgICAgICAgIHByb21pc2UudGhlbihzdWNjZXNzLCBmYWlsKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBmdW5jdGlvbiBnZXRTdGF0dXMoKSB7XHJcbiAgICAgICAgcmV0dXJuIHN0YXR1cztcclxuICAgIH1cclxuICAgIGZ1bmN0aW9uIGhpZGVTdGF0dXMoKSB7XHJcbiAgICAgICAgaWYgKGNvdW50ID09PSAwKSB7XHJcbiAgICAgICAgICAgIHJlZnJlc2goXCIgXCIpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGZ1bmN0aW9uIHNldFN0YXR1cyhtb2RlLCBlcnIpIHtcclxuICAgICAgICBpZiAoY291bnQgPCAwKSB7XHJcbiAgICAgICAgICAgIGNvdW50ID0gMDtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKG1vZGUgPT09IFwic2F2aW5nXCIpIHtcclxuICAgICAgICAgICAgc3RhdHVzID0gXCJzYXZpbmdcIjtcclxuICAgICAgICAgICAgcmVmcmVzaCgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgaXNlcnJvciA9IChtb2RlID09PSBcImVycm9yXCIpO1xyXG4gICAgICAgICAgICBpZiAoY291bnQgPT09IDApIHtcclxuICAgICAgICAgICAgICAgIHN0YXR1cyA9IGlzZXJyb3IgPyBcImVycm9yXCIgOiBcImdvb2RcIjtcclxuICAgICAgICAgICAgICAgIGlmIChpc2Vycm9yKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgYXBwLmVycm9yKFwiYXBwOmVycm9yOnNlcnZlclwiLCBbZXJyLnJlc3BvbnNlVGV4dCB8fCBlcnJdKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChleHBpcmVEZWxheSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KGhpZGVTdGF0dXMsIGV4cGlyZURlbGF5KTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICByZWZyZXNoKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBmdW5jdGlvbiB0cmFjayhkYXRhKSB7XHJcbiAgICAgICAgY29uc3QgZHAgPSBhcHAud2ViaXguZHAoZGF0YSk7XHJcbiAgICAgICAgaWYgKGRwKSB7XHJcbiAgICAgICAgICAgIHZpZXcub24oZHAsIFwib25BZnRlckRhdGFTZW5kXCIsIHN0YXJ0KTtcclxuICAgICAgICAgICAgdmlldy5vbihkcCwgXCJvbkFmdGVyU2F2ZUVycm9yXCIsIChfaWQsIF9vYmosIHJlc3BvbnNlKSA9PiBmYWlsKHJlc3BvbnNlKSk7XHJcbiAgICAgICAgICAgIHZpZXcub24oZHAsIFwib25BZnRlclNhdmVcIiwgc3VjY2Vzcyk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgYXBwLnNldFNlcnZpY2UoXCJzdGF0dXNcIiwge1xyXG4gICAgICAgIGdldFN0YXR1cyxcclxuICAgICAgICBzZXRTdGF0dXMsXHJcbiAgICAgICAgdHJhY2tcclxuICAgIH0pO1xyXG4gICAgaWYgKGNvbmZpZy5yZW1vdGUpIHtcclxuICAgICAgICB2aWV3Lm9uKGFwcC53ZWJpeCwgXCJvblJlbW90ZUNhbGxcIiwgc3RhcnQpO1xyXG4gICAgfVxyXG4gICAgaWYgKGNvbmZpZy5hamF4KSB7XHJcbiAgICAgICAgdmlldy5vbihhcHAud2ViaXgsIFwib25CZWZvcmVBamF4XCIsIChfbW9kZSwgX3VybCwgX2RhdGEsIF9yZXF1ZXN0LCBfaGVhZGVycywgX2ZpbGVzLCBwcm9taXNlKSA9PiB7XHJcbiAgICAgICAgICAgIHN0YXJ0KHByb21pc2UpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgaWYgKGNvbmZpZy5kYXRhKSB7XHJcbiAgICAgICAgdHJhY2soY29uZmlnLmRhdGEpO1xyXG4gICAgfVxyXG59XG5cbmZ1bmN0aW9uIFRoZW1lKGFwcCwgX3ZpZXcsIGNvbmZpZykge1xyXG4gICAgY29uZmlnID0gY29uZmlnIHx8IHt9O1xyXG4gICAgY29uc3Qgc3RvcmFnZSA9IGNvbmZpZy5zdG9yYWdlO1xyXG4gICAgbGV0IHRoZW1lID0gc3RvcmFnZSA/XHJcbiAgICAgICAgKHN0b3JhZ2UuZ2V0KFwidGhlbWVcIikgfHwgXCJmbGF0LWRlZmF1bHRcIilcclxuICAgICAgICA6XHJcbiAgICAgICAgICAgIChjb25maWcudGhlbWUgfHwgXCJmbGF0LWRlZmF1bHRcIik7XHJcbiAgICBjb25zdCBzZXJ2aWNlID0ge1xyXG4gICAgICAgIGdldFRoZW1lKCkgeyByZXR1cm4gdGhlbWU7IH0sXHJcbiAgICAgICAgc2V0VGhlbWUobmFtZSwgc2lsZW50KSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHBhcnRzID0gbmFtZS5zcGxpdChcIi1cIik7XHJcbiAgICAgICAgICAgIGNvbnN0IGxpbmtzID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoXCJsaW5rXCIpO1xyXG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxpbmtzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBsbmFtZSA9IGxpbmtzW2ldLmdldEF0dHJpYnV0ZShcInRpdGxlXCIpO1xyXG4gICAgICAgICAgICAgICAgaWYgKGxuYW1lKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGxuYW1lID09PSBuYW1lIHx8IGxuYW1lID09PSBwYXJ0c1swXSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsaW5rc1tpXS5kaXNhYmxlZCA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGlua3NbaV0uZGlzYWJsZWQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBhcHAud2ViaXguc2tpbi5zZXQocGFydHNbMF0pO1xyXG4gICAgICAgICAgICAvLyByZW1vdmUgb2xkIGNzc1xyXG4gICAgICAgICAgICBhcHAud2ViaXguaHRtbC5yZW1vdmVDc3MoZG9jdW1lbnQuYm9keSwgXCJ0aGVtZS1cIiArIHRoZW1lKTtcclxuICAgICAgICAgICAgLy8gYWRkIG5ldyBjc3NcclxuICAgICAgICAgICAgYXBwLndlYml4Lmh0bWwuYWRkQ3NzKGRvY3VtZW50LmJvZHksIFwidGhlbWUtXCIgKyBuYW1lKTtcclxuICAgICAgICAgICAgdGhlbWUgPSBuYW1lO1xyXG4gICAgICAgICAgICBpZiAoc3RvcmFnZSkge1xyXG4gICAgICAgICAgICAgICAgc3RvcmFnZS5wdXQoXCJ0aGVtZVwiLCBuYW1lKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoIXNpbGVudCkge1xyXG4gICAgICAgICAgICAgICAgYXBwLnJlZnJlc2goKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH07XHJcbiAgICBhcHAuc2V0U2VydmljZShcInRoZW1lXCIsIHNlcnZpY2UpO1xyXG4gICAgc2VydmljZS5zZXRUaGVtZSh0aGVtZSwgdHJ1ZSk7XHJcbn1cblxuZnVuY3Rpb24gY29weVBhcmFtcyhkYXRhLCB1cmwsIHJvdXRlKSB7XHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHJvdXRlLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgZGF0YVtyb3V0ZVtpXV0gPSB1cmxbaSArIDFdID8gdXJsW2kgKyAxXS5wYWdlIDogXCJcIjtcclxuICAgIH1cclxufVxyXG5mdW5jdGlvbiBVcmxQYXJhbShhcHAsIHZpZXcsIGNvbmZpZykge1xyXG4gICAgY29uc3Qgcm91dGUgPSBjb25maWcucm91dGUgfHwgY29uZmlnO1xyXG4gICAgY29uc3QgZGF0YSA9IHt9O1xyXG4gICAgdmlldy5vbihhcHAsIFwiYXBwOnVybGNoYW5nZVwiLCBmdW5jdGlvbiAoc3Vidmlldywgc2VnbWVudCkge1xyXG4gICAgICAgIGlmICh2aWV3ID09PSBzdWJ2aWV3KSB7XHJcbiAgICAgICAgICAgIGNvcHlQYXJhbXMoZGF0YSwgc2VnbWVudC5zdWJ1cmwoKSwgcm91dGUpO1xyXG4gICAgICAgICAgICBzZWdtZW50LnNpemUocm91dGUubGVuZ3RoICsgMSk7XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcbiAgICBjb25zdCBvcyA9IHZpZXcuc2V0UGFyYW07XHJcbiAgICBjb25zdCBvZyA9IHZpZXcuZ2V0UGFyYW07XHJcbiAgICB2aWV3LnNldFBhcmFtID0gZnVuY3Rpb24gKG5hbWUsIHZhbHVlLCBzaG93KSB7XHJcbiAgICAgICAgY29uc3QgaW5kZXggPSByb3V0ZS5pbmRleE9mKG5hbWUpO1xyXG4gICAgICAgIGlmIChpbmRleCA+PSAwKSB7XHJcbiAgICAgICAgICAgIGRhdGFbbmFtZV0gPSB2YWx1ZTtcclxuICAgICAgICAgICAgdGhpcy5fc2VnbWVudC51cGRhdGUoXCJcIiwgdmFsdWUsIGluZGV4ICsgMSk7XHJcbiAgICAgICAgICAgIGlmIChzaG93KSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdmlldy5zaG93KG51bGwpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICByZXR1cm4gb3MuY2FsbCh0aGlzLCBuYW1lLCB2YWx1ZSwgc2hvdyk7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuICAgIHZpZXcuZ2V0UGFyYW0gPSBmdW5jdGlvbiAoa2V5LCBtb2RlKSB7XHJcbiAgICAgICAgY29uc3QgdmFsID0gZGF0YVtrZXldO1xyXG4gICAgICAgIGlmICh0eXBlb2YgdmFsICE9PSBcInVuZGVmaW5lZFwiKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB2YWw7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBvZy5jYWxsKHRoaXMsIGtleSwgbW9kZSk7XHJcbiAgICB9O1xyXG4gICAgY29weVBhcmFtcyhkYXRhLCB2aWV3LmdldFVybCgpLCByb3V0ZSk7XHJcbn1cblxuZnVuY3Rpb24gVXNlcihhcHAsIF92aWV3LCBjb25maWcpIHtcclxuICAgIGNvbmZpZyA9IGNvbmZpZyB8fCB7fTtcclxuICAgIGNvbnN0IGxvZ2luID0gY29uZmlnLmxvZ2luIHx8IFwiL2xvZ2luXCI7XHJcbiAgICBjb25zdCBsb2dvdXQgPSBjb25maWcubG9nb3V0IHx8IFwiL2xvZ291dFwiO1xyXG4gICAgY29uc3QgYWZ0ZXJMb2dpbiA9IGNvbmZpZy5hZnRlckxvZ2luIHx8IGFwcC5jb25maWcuc3RhcnQ7XHJcbiAgICBjb25zdCBhZnRlckxvZ291dCA9IGNvbmZpZy5hZnRlckxvZ291dCB8fCBcIi9sb2dpblwiO1xyXG4gICAgY29uc3QgcGluZyA9IGNvbmZpZy5waW5nIHx8IDUgKiA2MCAqIDEwMDA7XHJcbiAgICBjb25zdCBtb2RlbCA9IGNvbmZpZy5tb2RlbDtcclxuICAgIGxldCB1c2VyID0gY29uZmlnLnVzZXI7XHJcbiAgICBjb25zdCBzZXJ2aWNlID0ge1xyXG4gICAgICAgIGdldFVzZXIoKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB1c2VyO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgZ2V0U3RhdHVzKHNlcnZlcikge1xyXG4gICAgICAgICAgICBpZiAoIXNlcnZlcikge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHVzZXIgIT09IG51bGw7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIG1vZGVsLnN0YXR1cygpLmNhdGNoKCgpID0+IG51bGwpLnRoZW4oZGF0YSA9PiB7XHJcbiAgICAgICAgICAgICAgICB1c2VyID0gZGF0YTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBsb2dpbihuYW1lLCBwYXNzKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBtb2RlbC5sb2dpbihuYW1lLCBwYXNzKS50aGVuKGRhdGEgPT4ge1xyXG4gICAgICAgICAgICAgICAgdXNlciA9IGRhdGE7XHJcbiAgICAgICAgICAgICAgICBpZiAoIWRhdGEpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJBY2Nlc3MgZGVuaWVkXCIpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgYXBwLmNhbGxFdmVudChcImFwcDp1c2VyOmxvZ2luXCIsIFt1c2VyXSk7XHJcbiAgICAgICAgICAgICAgICBhcHAuc2hvdyhhZnRlckxvZ2luKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBsb2dvdXQoKSB7XHJcbiAgICAgICAgICAgIHVzZXIgPSBudWxsO1xyXG4gICAgICAgICAgICByZXR1cm4gbW9kZWwubG9nb3V0KCkudGhlbihyZXMgPT4ge1xyXG4gICAgICAgICAgICAgICAgYXBwLmNhbGxFdmVudChcImFwcDp1c2VyOmxvZ291dFwiLCBbXSk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVzO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG4gICAgZnVuY3Rpb24gY2FuTmF2aWdhdGUodXJsLCBvYmopIHtcclxuICAgICAgICBpZiAodXJsID09PSBsb2dvdXQpIHtcclxuICAgICAgICAgICAgc2VydmljZS5sb2dvdXQoKTtcclxuICAgICAgICAgICAgb2JqLnJlZGlyZWN0ID0gYWZ0ZXJMb2dvdXQ7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYgKHVybCAhPT0gbG9naW4gJiYgIXNlcnZpY2UuZ2V0U3RhdHVzKCkpIHtcclxuICAgICAgICAgICAgb2JqLnJlZGlyZWN0ID0gbG9naW47XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgYXBwLnNldFNlcnZpY2UoXCJ1c2VyXCIsIHNlcnZpY2UpO1xyXG4gICAgYXBwLmF0dGFjaEV2ZW50KGBhcHA6Z3VhcmRgLCBmdW5jdGlvbiAodXJsLCBfJHJvb3QsIG9iaikge1xyXG4gICAgICAgIGlmIChjb25maWcucHVibGljICYmIGNvbmZpZy5wdWJsaWModXJsKSkge1xyXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHR5cGVvZiB1c2VyID09PSBcInVuZGVmaW5lZFwiKSB7XHJcbiAgICAgICAgICAgIG9iai5jb25maXJtID0gc2VydmljZS5nZXRTdGF0dXModHJ1ZSkudGhlbigoKSA9PiBjYW5OYXZpZ2F0ZSh1cmwsIG9iaikpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gY2FuTmF2aWdhdGUodXJsLCBvYmopO1xyXG4gICAgfSk7XHJcbiAgICBpZiAocGluZykge1xyXG4gICAgICAgIHNldEludGVydmFsKCgpID0+IHNlcnZpY2UuZ2V0U3RhdHVzKHRydWUpLCBwaW5nKTtcclxuICAgIH1cclxufVxuXG4vKlxyXG5NSVQgTGljZW5zZVxyXG5Db3B5cmlnaHQgKGMpIDIwMTkgWEIgU29mdHdhcmVcclxuKi9cclxubGV0IHdlYml4ID0gd2luZG93LndlYml4O1xyXG5pZiAod2ViaXgpIHtcclxuICAgIHBhdGNoKHdlYml4KTtcclxufVxyXG5jb25zdCBwbHVnaW5zID0ge1xyXG4gICAgVW5sb2FkR3VhcmQsIExvY2FsZSwgTWVudSwgVGhlbWUsIFVzZXIsIFN0YXR1cywgVXJsUGFyYW1cclxufTtcclxuY29uc3QgZXJyb3JzID0geyBOYXZpZ2F0aW9uQmxvY2tlZCB9O1xyXG5jb25zdCB3ID0gd2luZG93O1xyXG5pZiAoIXcuUHJvbWlzZSkge1xyXG4gICAgdy5Qcm9taXNlID0gdy53ZWJpeC5wcm9taXNlO1xyXG59XG5cbmV4cG9ydCB7IHBsdWdpbnMsIGVycm9ycywgSmV0QXBwLCBKZXRWaWV3LCBIYXNoUm91dGVyLCBTdG9yZVJvdXRlciwgVXJsUm91dGVyLCBFbXB0eVJvdXRlciwgU3ViUm91dGVyIH07XG4vLyMgc291cmNlTWFwcGluZ1VSTD1qZXQuanMubWFwXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9ub2RlX21vZHVsZXMvd2ViaXgtamV0L2Rpc3QvZXM2L2pldC5qcyIsImltcG9ydCB7IEpldFZpZXcgfSBmcm9tIFwid2ViaXgtamV0XCI7XG5pbXBvcnQgeyBwYWNrYWdlcyB9IGZyb20gXCIuLi8uLi9zZXJ2aWNlcy9wYWNrYWdlc1wiO1xuXG5jb25zdCBTVEFUVVNfSU5TVEFMTEVEID0gMztcblxuZXhwb3J0IGNsYXNzIEV4dGVybmFsVmlldyBleHRlbmRzIEpldFZpZXcge1xuICAgIGNvbnN0cnVjdG9yKGFwcCwgbmFtZSwgdGFyZ2V0VXJsLCByZXF1aXJlZFBhY2thZ2VzKSB7XG4gICAgICAgIHN1cGVyKGFwcCwgbmFtZSk7XG5cbiAgICAgICAgdGhpcy50YXJnZXRVcmwgPSB0YXJnZXRVcmwgfHwgXCIvXCI7XG4gICAgICAgIHRoaXMucmVxdWlyZWRQYWNrYWdlcyA9IHJlcXVpcmVkUGFja2FnZXMgfHwge307IC8vIHJlcXVpcmVkIHBhY2thZ2VzIGFzIG5hbWU6IGdpdF91cmwgcGFpcnNcbiAgICB9XG5cbiAgICBjb25maWcoKSB7XG4gICAgICAgIGNvbnN0IHNlbGYgPSB0aGlzO1xuICAgICAgICBjb25zdCBpZnJhbWUgPSB7XG4gICAgICAgICAgICB2aWV3OiBcImlmcmFtZVwiLFxuICAgICAgICAgICAgbG9jYWxJZDogXCJpZnJhbWUtZXh0ZXJuYWxcIixcbiAgICAgICAgICAgIG9uOiB7XG4gICAgICAgICAgICAgICAgb25BZnRlckxvYWQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuaGlkZVByb2dyZXNzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmhpZGVQcm9ncmVzcygpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZW5hYmxlKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuXG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICByb3dzOiBbe1xuICAgICAgICAgICAgICAgIGxvY2FsSWQ6IFwiaW5zdGFsbC1wYWNrYWdlc1wiLFxuICAgICAgICAgICAgICAgIGhpZGRlbjogdHJ1ZSxcbiAgICAgICAgICAgICAgICBjb2xzOiBbXG4gICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxvY2FsSWQ6IFwicmVxdWlyZWRfcGFja2FnZXNfZGl2XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICB2aWV3OiBcInRlbXBsYXRlXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBhdXRvaGVpZ2h0OiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgICAgICAgICB2aWV3OiBcImJ1dHRvblwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgbG9jYWxJZDogXCJpbnN0YWxsX2J0blwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU6IFwiSW5zdGFsbCByZXF1aXJlZCBwYWNrYWdlc1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgY3NzOiBcIndlYml4X3ByaW1hcnlcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIGhlaWdodDogNTAsXG4gICAgICAgICAgICAgICAgICAgICAgICBjbGljazogc2VsZi5pbnN0YWxsUmVxdWlyZWRQYWNrYWdlcy5iaW5kKHNlbGYpXG4gICAgICAgICAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZpZXc6IFwiYnV0dG9uXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBsb2NhbElkOiBcImdvX3RvX3BhY2thZ2VzX2J0blwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU6IFwiR28gdG8gcGFja2FnZXMgYW5kIGluc3RhbGwgdGhlbSBtYW51YWxseVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgY3NzOiBcIndlYml4X3ByaW1hcnlcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIGhlaWdodDogNTAsXG4gICAgICAgICAgICAgICAgICAgICAgICBjbGljazogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuJHNjb3BlLnNob3coXCIvbWFpbi9wYWNrYWdlc1wiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgIH0sIGlmcmFtZV1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIGluc3RhbGxSZXF1aXJlZFBhY2thZ2VzKCkge1xuICAgICAgICBsZXQgcHJvbWlzZXMgPSBPYmplY3Qua2V5cyh0aGlzLnJlcXVpcmVkUGFja2FnZXMpLm1hcCgobmFtZSkgPT4ge1xuICAgICAgICAgICAgLy8gYWRkIGJ5IGdpdCB1cmxcbiAgICAgICAgICAgIHJldHVybiBwYWNrYWdlcy5hZGQobnVsbCwgdGhpcy5yZXF1aXJlZFBhY2thZ2VzW25hbWVdKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgdGhpcy5pbnN0YWxsQnV0dG9uLmRpc2FibGUoKTtcbiAgICAgICAgUHJvbWlzZS5hbGwocHJvbWlzZXMpLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgd2ViaXgubWVzc2FnZSh7IHR5cGU6IFwic3VjY2Vzc1wiLCB0ZXh0OiBcIkFsbCByZXF1aXJlZCBwYWNrYWdlcyBpbnN0YWxsZWQgc3VjY2Vzc2Z1bGx5LCBwYWdlIHdpbGwgYmUgcmVsb2FkZWQgaW4gMiBzZWNvbmRzXCIgfSk7XG4gICAgICAgICAgICBzZXRJbnRlcnZhbCgoKSA9PiB3aW5kb3cubG9jYXRpb24ucmVsb2FkKHRydWUpLCAyMDAwKTtcbiAgICAgICAgfSkuY2F0Y2goKCkgPT4ge1xuICAgICAgICAgICAgd2ViaXgubWVzc2FnZSh7IHR5cGU6IFwiZXJyb3JcIiwgdGV4dDogXCJBbiBlcnJvciBvY2N1cnJlZCwgcGxlYXNlIHRyeSBpbnN0YWxsaW5nIGZyb20gcGFja2FnZXMgZm9yIG1vcmUgZGV0YWlsc1wiIH0pO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBpbml0KHZpZXcpIHtcbiAgICAgICAgdGhpcy5yZXF1aXJlZFBhY2thZ2VzRGl2ID0gdGhpcy4kJChcInJlcXVpcmVkX3BhY2thZ2VzX2RpdlwiKTtcbiAgICAgICAgdmlldy5pbnN0YWxsUGFja2FnZUNvbnRhaW5lciA9IHRoaXMuJCQoXCJpbnN0YWxsLXBhY2thZ2VzXCIpO1xuICAgICAgICB0aGlzLmluc3RhbGxCdXR0b24gPSB0aGlzLiQkKFwiaW5zdGFsbF9idG5cIik7XG5cbiAgICAgICAgdmlldy5leHRlcm5hbElmcmFtZSA9IHRoaXMuJCQoXCJpZnJhbWUtZXh0ZXJuYWxcIik7XG4gICAgICAgIHdlYml4LmV4dGVuZCh2aWV3LmV4dGVybmFsSWZyYW1lLCB3ZWJpeC5Qcm9ncmVzc0Jhcik7XG4gICAgICAgIHZpZXcuZXh0ZXJuYWxJZnJhbWUuZGlzYWJsZSgpO1xuICAgICAgICB2aWV3LmV4dGVybmFsSWZyYW1lLnNob3dQcm9ncmVzcyh7IHR5cGU6IFwiaWNvblwiIH0pO1xuICAgICAgICB2aWV3LmV4dGVybmFsSWZyYW1lLmxvYWQodGhpcy50YXJnZXRVcmwpO1xuXG5cbiAgICAgICAgLy8gY2hlY2sgd2hpY2ggcGFja2FnZXMgdG8gaW5zdGFsbFxuICAgICAgICBwYWNrYWdlcy5saXN0KCkudGhlbihkYXRhID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGFsbFBhY2thZ2VzID0gZGF0YS5qc29uKCkucGFja2FnZXM7XG4gICAgICAgICAgICBmb3IgKGNvbnN0IHAgb2YgYWxsUGFja2FnZXMpIHtcbiAgICAgICAgICAgICAgICBjb25zdCByZXF1aXJlZFBhY2thZ2UgPSB0aGlzLnJlcXVpcmVkUGFja2FnZXNbcC5uYW1lXTtcbiAgICAgICAgICAgICAgICBpZiAocmVxdWlyZWRQYWNrYWdlICYmIHAuc3RhdHVzID09IFNUQVRVU19JTlNUQUxMRUQpIHtcbiAgICAgICAgICAgICAgICAgICAgZGVsZXRlIHRoaXMucmVxdWlyZWRQYWNrYWdlc1twLm5hbWVdO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKE9iamVjdC5rZXlzKHRoaXMucmVxdWlyZWRQYWNrYWdlcykubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgdmlldy5pbnN0YWxsUGFja2FnZUNvbnRhaW5lci5zaG93KCk7XG4gICAgICAgICAgICAgICAgdmlldy5leHRlcm5hbElmcmFtZS5oaWRlKCk7XG5cbiAgICAgICAgICAgICAgICBjb25zdCBuYW1lcyA9IE9iamVjdC5rZXlzKHRoaXMucmVxdWlyZWRQYWNrYWdlcykuam9pbihcIiwgXCIpO1xuICAgICAgICAgICAgICAgIHRoaXMucmVxdWlyZWRQYWNrYWdlc0Rpdi5zZXRIVE1MKFxuICAgICAgICAgICAgICAgICAgICBgPGRpdiBzdHlsZT0nd2lkdGg6YXV0bzt0ZXh0LWFsaWduOmNlbnRlcic+PGgzPllvdSBuZWVkIHRvIGluc3RhbGwgdGhlIGZvbGxvd2luZyByZXF1aXJlZCBwYWNrYWdlczogJHtuYW1lc308aDMvPjwvZGl2PmBcbiAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB2aWV3Lmluc3RhbGxQYWNrYWdlQ29udGFpbmVyLmhpZGUoKTtcbiAgICAgICAgICAgICAgICB2aWV3LmV4dGVybmFsSWZyYW1lLnNob3coKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuXG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zb3VyY2VzL3ZpZXdzL2V4dGVybmFsL2luZGV4LmpzIiwiY29uc3QgYWpheCA9IHdlYml4LmFqYXgoKS5oZWFkZXJzKHsgXCJDb250ZW50LXR5cGVcIjogXCJhcHBsaWNhdGlvbi9qc29uXCIgfSk7XG5cbmV4cG9ydCBjbGFzcyBTZXJ2aWNlIHtcbiAgICBjb25zdHJ1Y3RvcihiYXNlVXJsKSB7XG4gICAgICAgIHRoaXMuYmFzZVVybCA9IGJhc2VVcmw7XG4gICAgfVxuXG4gICAgam9pblVybCh1cmwpIHtcbiAgICAgICAgaWYgKHRoaXMuYmFzZVVybCkge1xuICAgICAgICAgICAgcmV0dXJuIGAke3RoaXMuYmFzZVVybH0vJHt1cmx9YDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdXJsO1xuICAgIH1cblxuICAgIGNhbGwobWV0aG9kLCB1cmwsIGFyZ3MpIHtcbiAgICAgICAgbWV0aG9kID0gbWV0aG9kLnRvTG93ZXJDYXNlKCk7XG4gICAgICAgIHVybCA9IHRoaXMuam9pblVybCh1cmwpO1xuXG4gICAgICAgIGlmIChhcmdzKSB7XG4gICAgICAgICAgICBhcmdzID0geyBhcmdzOiBhcmdzIH07XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBhcmdzID0ge307XG4gICAgICAgIH1cblxuICAgICAgICBpZiAobWV0aG9kID09PSBcImdldFwiKSB7XG4gICAgICAgICAgICByZXR1cm4gYWpheC5nZXQodXJsLCBhcmdzKTtcbiAgICAgICAgfSBlbHNlIGlmIChtZXRob2QgPT0gXCJwb3N0XCIpIHtcbiAgICAgICAgICAgIHJldHVybiBhamF4LnBvc3QodXJsLCBhcmdzKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRocm93IFZhbHVlRXJyb3IoYCR7bWV0aG9kfSBpcyBub3Qgc3VwcG9ydGVkYCk7XG4gICAgfVxuXG4gICAgZ2V0Q2FsbCh1cmwsIGFyZ3MpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuY2FsbChcImdldFwiLCB1cmwsIGFyZ3MpO1xuICAgIH1cblxuICAgIHBvc3RDYWxsKHVybCwgYXJncykge1xuICAgICAgICByZXR1cm4gdGhpcy5jYWxsKFwicG9zdFwiLCB1cmwsIGFyZ3MpO1xuICAgIH1cbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NvdXJjZXMvY29tbW9uL2FwaS5qcyIsImltcG9ydCB7IEpldFZpZXcgfSBmcm9tIFwid2ViaXgtamV0XCI7XG5cbmltcG9ydCB7IGFuc2lVcCB9IGZyb20gXCIuLi8uLi9jb21tb24vY29sb3JzXCI7XG5cbmV4cG9ydCBjbGFzcyBFcnJvclZpZXcgZXh0ZW5kcyBKZXRWaWV3IHtcbiAgICBjb25maWcoKSB7XG4gICAgICAgIGNvbnN0IG1lc3NhZ2UgPSB7XG4gICAgICAgICAgICB2aWV3OiBcInRlbXBsYXRlXCIsXG4gICAgICAgICAgICBpZDogXCJlcnJvcl90ZW1wbGF0ZVwiLFxuICAgICAgICAgICAgdGVtcGxhdGU6IFwiXCIsXG4gICAgICAgICAgICBzY3JvbGw6IFwieHlcIlxuICAgICAgICB9O1xuXG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICB2aWV3OiBcIndpbmRvd1wiLFxuICAgICAgICAgICAgaGVhZDogXCJFcnJvclwiLFxuICAgICAgICAgICAgbW9kYWw6IHRydWUsXG4gICAgICAgICAgICB3aWR0aDogNTAwLFxuICAgICAgICAgICAgaGVpZ2h0OiA2MDAsXG4gICAgICAgICAgICBwb3NpdGlvbjogXCJjZW50ZXJcIixcbiAgICAgICAgICAgIGJvZHk6IHtcbiAgICAgICAgICAgICAgICByb3dzOiBbXG4gICAgICAgICAgICAgICAgICAgIG1lc3NhZ2UsXG4gICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZpZXc6IFwiYnV0dG9uXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZTogXCJPS1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgY3NzOiBcIndlYml4X3ByaW1hcnlcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIGNsaWNrOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5nZXRUb3BQYXJlbnRWaWV3KCkuaGlkZSgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgaW5pdCgpIHtcbiAgICAgICAgdGhpcy5tZXNzYWdlID0gJCQoXCJlcnJvcl90ZW1wbGF0ZVwiKTtcbiAgICB9XG5cbiAgICBzaG93RXJyb3IobWVzc2FnZSwgaGVhZCkge1xuICAgICAgICB0aGlzLm1lc3NhZ2Uuc2V0SFRNTChgPHA+JHthbnNpVXAuYW5zaV90b19odG1sKG1lc3NhZ2UpfTwvcD5gKTtcbiAgICAgICAgaWYgKGhlYWQpIHtcbiAgICAgICAgICAgIHRoaXMubWVzc2FnZS5nZXRIZWFkKCkuc2V0SFRNTChoZWFkKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuZ2V0Um9vdCgpLnNob3coKTtcbiAgICB9XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zb3VyY2VzL3ZpZXdzL2Vycm9ycy9kaWFsb2cuanMiLCJcbmV4cG9ydCBjb25zdCBNQVhfTVNHX0xFTiA9IDEwMDtcbmV4cG9ydCBjb25zdCBMRVZFTFMgPSB7XG4gICAgNTA6IFwiQ1JJVElDQUxcIixcbiAgICA0MDogXCJFUlJPUlwiLFxuICAgIDMwOiBcIldBUk5JTkdcIixcbiAgICAyMDogXCJJTkZPXCIsXG4gICAgMTU6IFwiU1RET1VUXCIsXG4gICAgMTA6IFwiREVCVUdcIlxufTtcblxuZXhwb3J0IGNvbnN0IFNUQVRFUyA9IFtcbiAgICAnQ0xPU0VEJyxcbiAgICAnTkVXJyxcbiAgICAnT1BFTicsXG4gICAgJ1JFT1BFTidcbl1cblxuZXhwb3J0IGNvbnN0IFRZUEVTID0gW1xuICAgICdCVUcnLFxuICAgICdRVUVTVElPTicsXG4gICAgJ0VWRU5UX1NZU1RFTScsXG4gICAgJ0VWRU5UX01PTklUT1InLFxuICAgICdFVkVOVF9PUEVSQVRPUicsXG5dXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zb3VyY2VzL3ZpZXdzL2FsZXJ0cy9kYXRhLmpzIiwiZXhwb3J0IGNvbnN0IGRhdGVGb3JtYXQgPSBcIiVZLSVtLSVkICVHOiVpOiVzXCI7XG5cbmV4cG9ydCBjb25zdCB3ZWJpeERhdGVGb3JtYXR0ZXIgPSB3ZWJpeC5EYXRlLmRhdGVUb1N0cihkYXRlRm9ybWF0KTtcblxuZXhwb3J0IGNvbnN0IGRhdGVGb3JtYXR0ZXIgPSBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAvLyBmb3JtYXQgZXBvY2ggdGltZXN0YW1wc1xuICAgIGlmICh2YWx1ZSBpbnN0YW5jZW9mIFN0cmluZykge1xuICAgICAgICB2YWx1ZSA9IHBhcnNlSW50KHZhbHVlKTtcbiAgICB9XG5cbiAgICByZXR1cm4gd2ViaXhEYXRlRm9ybWF0dGVyKG5ldyBEYXRlKHZhbHVlICogMTAwMCkpO1xufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc291cmNlcy9jb21tb24vZm9ybWF0dGVycy5qcyIsImltcG9ydCB7IFNlcnZpY2UgfSBmcm9tIFwiLi4vY29tbW9uL2FwaVwiO1xuXG5jb25zdCBCQVNFX1VSTCA9IFwiL3plcm9ib3QvYWRtaW4vYWN0b3JzL2hlYWx0aFwiO1xuXG5jbGFzcyBIZWFsdGhTZXJ2aWNlIGV4dGVuZHMgU2VydmljZSB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHN1cGVyKEJBU0VfVVJMKTtcbiAgICB9XG5cbiAgICBnZXREaXNrU3BhY2UoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmdldENhbGwoXCJnZXRfZGlza19zcGFjZVwiKTtcbiAgICB9XG5cbiAgICBnZXRIZWFsdGgoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmdldENhbGwoXCJoZWFsdGhcIik7XG4gICAgfVxuXG4gICAgZ2V0SWRlbnRpdHkoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmdldENhbGwoXCJnZXRfaWRlbnRpdHlcIik7XG4gICAgfVxuXG4gICAgZ2V0TmV0d29ya0luZm8oKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmdldENhbGwoXCJuZXR3b3JrX2luZm9cIik7XG4gICAgfVxuXG4gICAgZ2V0SnN4VmVyc2lvbigpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0Q2FsbChcImpzeF92ZXJzaW9uXCIpO1xuICAgIH1cblxuICAgIGdldFJ1bm5pbmdQcm9jZXNzZXMoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmdldENhbGwoXCJnZXRfcnVubmluZ19wcm9jZXNzZXNcIik7XG4gICAgfVxuXG4gICAgZ2V0UnVubmluZ1BvcnRzKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5nZXRDYWxsKFwiZ2V0X3J1bm5pbmdfcG9ydHNcIik7XG4gICAgfVxufVxuXG5leHBvcnQgY29uc3QgaGVhbHRoID0gbmV3IEhlYWx0aFNlcnZpY2UoKTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NvdXJjZXMvc2VydmljZXMvaGVhbHRoLmpzIiwiaW1wb3J0IHsgSmV0VmlldyB9IGZyb20gXCJ3ZWJpeC1qZXRcIjtcblxuaW1wb3J0IHsgYW5zaVVwIH0gZnJvbSBcIi4uLy4uL2NvbW1vbi9jb2xvcnNcIjtcbmltcG9ydCB7IExFVkVMUywgTUFYX01TR19MRU4sIFNUQVRFUywgVFlQRVMgfSBmcm9tIFwiLi9kYXRhXCI7XG5pbXBvcnQgeyBkYXRlRm9ybWF0dGVyIH0gZnJvbSBcIi4uLy4uL2NvbW1vbi9mb3JtYXR0ZXJzXCI7XG5pbXBvcnQgeyBhbGVydHMgfSBmcm9tIFwiLi4vLi4vc2VydmljZXMvYWxlcnRzXCI7XG5cbmltcG9ydCBBbGVydFZpZXcgZnJvbSBcIi4vYWxlcnRcIjtcbmltcG9ydCB7IGNyZWF0ZUZpbHRlck9wdGlvbnMgfSBmcm9tIFwiLi4vLi4vY29tbW9uL2ZpbHRlcnNcIjtcblxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBBbGVydHNWaWV3IGV4dGVuZHMgSmV0VmlldyB7XG4gICAgY29uZmlnKCkge1xuICAgICAgICBjb25zdCB2aWV3ID0ge1xuICAgICAgICAgICAgcm93czogW1xuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgdmlldzogXCJkYXRhdGFibGVcIixcbiAgICAgICAgICAgICAgICAgICAgaWQ6IFwiYWxlcnRzX3RhYmxlXCIsXG4gICAgICAgICAgICAgICAgICAgIHJlc2l6ZUNvbHVtbjogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgc2VsZWN0OiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICBtdWx0aXNlbGVjdDogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgc2Nyb2xsOiBcInh5XCIsXG4gICAgICAgICAgICAgICAgICAgIGNzczogXCJ3ZWJpeF9oZWFkZXJfYm9yZGVyIHdlYml4X2RhdGFfYm9yZGVyXCIsXG4gICAgICAgICAgICAgICAgICAgIGNvbHVtbnM6IFt7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZDogXCJpbmRleFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgaGVhZGVyOiBcIiNcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIHNvcnQ6IFwiaW50XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBhdXRvd2lkdGg6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlkOiBcImFsZXJ0X3R5cGVcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIHNvcnQ6IFwiaW50XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBmb3JtYXQ6ICh2YWx1ZSkgPT4gVFlQRVNbdmFsdWVdLFxuICAgICAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDE1MCxcbiAgICAgICAgICAgICAgICAgICAgICAgIGhlYWRlcjogW1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiVHlwZVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29udGVudDogXCJzZWxlY3RGaWx0ZXJcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb3B0aW9uczogY3JlYXRlRmlsdGVyT3B0aW9ucyhUWVBFUylcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZDogXCJjb3VudFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgaGVhZGVyOiBcIkNvdW50XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBzb3J0OiBcImludFwiXG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlkOiBcInN0YXR1c1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgc29ydDogXCJpbnRcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvcm1hdDogKHZhbHVlKSA9PiBTVEFURVNbdmFsdWVdLFxuICAgICAgICAgICAgICAgICAgICAgICAgaGVhZGVyOiBbXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJTdGF0dXNcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRlbnQ6IFwic2VsZWN0RmlsdGVyXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9wdGlvbnM6IGNyZWF0ZUZpbHRlck9wdGlvbnMoU1RBVEVTKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlkOiBcImxldmVsXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBzb3J0OiBcImludFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgZm9ybWF0OiAodmFsdWUpID0+IExFVkVMU1t2YWx1ZV0sXG4gICAgICAgICAgICAgICAgICAgICAgICBoZWFkZXI6IFtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIkxldmVsXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb250ZW50OiBcInNlbGVjdEZpbHRlclwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvcHRpb25zOiBjcmVhdGVGaWx0ZXJPcHRpb25zKExFVkVMUylcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZDogXCJjYXRcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIGhlYWRlcjogW1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiQ2F0ZWdvcnlcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRlbnQ6IFwidGV4dEZpbHRlclwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHNvcnQ6IFwic3RyaW5nXCJcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWQ6IFwidGltZV9maXJzdFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgaGVhZGVyOiBcIkZpcnN0IHRpbWVcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIHNvcnQ6IFwiZGF0ZVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgZm9ybWF0OiBkYXRlRm9ybWF0dGVyLFxuICAgICAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDIwMFxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZDogXCJ0aW1lX2xhc3RcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIGhlYWRlcjogXCJMYXN0IHRpbWVcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIHNvcnQ6IFwiZGF0ZVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgZm9ybWF0OiBkYXRlRm9ybWF0dGVyLFxuICAgICAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDIwMFxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZDogXCJtZXNzYWdlXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBoZWFkZXI6IFtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIk1lc3NhZ2VcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRlbnQ6IFwidGV4dEZpbHRlclwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgICAgICAgICBzb3J0OiBcInN0clwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgZmlsbHNwYWNlOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgZm9ybWF0OiBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodmFsdWUubGVuZ3RoID4gTUFYX01TR19MRU4pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWUgPSB2YWx1ZS5zdWJzdHIoMCwgTUFYX01TR19MRU4pICsgJy4uLic7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBhbnNpVXAuYW5zaV90b19odG1sKHZhbHVlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICAgICAgYXV0b0NvbmZpZzogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgLy8gdXJsOntcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgICRwcm94eTp0cnVlLFxuICAgICAgICAgICAgICAgICAgICAvLyAgICAgbG9hZDogZnVuY3Rpb24odmlldywgcGFyYW1zKXtcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgICBsZXQgZGF0YSA9IHdlYml4LmFqYXgoXCIvemVyb2JvdC9hbGVydGEvYWN0b3JzL2FsZXJ0YS9saXN0X2FsZXJ0c1wiKTtcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgICByZXR1cm4gZGF0YTtcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIC8vIH1cbiAgICAgICAgICAgICAgICAgICAgc2NoZW1lOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAkaW5pdDogZnVuY3Rpb24gKG9iaikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9iai5pbmRleCA9IHRoaXMuY291bnQoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgJHN1YnZpZXc6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgIHBvcHVwOiB0cnVlXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgXVxuICAgICAgICB9O1xuXG4gICAgICAgIHJldHVybiB2aWV3O1xuICAgIH1cblxuICAgIGRlbGV0ZUl0ZW0ob2JqZWN0cykge1xuICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XG5cbiAgICAgICAgbGV0IGl0ZW1zID0gW10sXG4gICAgICAgICAgICBpZHMgPSBbXSxcbiAgICAgICAgICAgIGluZGV4ZXMgPSBbXTtcblxuICAgICAgICBmb3IgKGxldCBvYmogb2Ygb2JqZWN0cykge1xuICAgICAgICAgICAgaWRzLnB1c2gob2JqLmlkKTtcbiAgICAgICAgICAgIGxldCBpdGVtID0gc2VsZi50YWJsZS5nZXRJdGVtKG9iai5pZCk7XG4gICAgICAgICAgICBpdGVtcy5wdXNoKGl0ZW0pXG4gICAgICAgICAgICBpbmRleGVzLnB1c2goaXRlbS5pbmRleCk7XG4gICAgICAgIH1cblxuICAgICAgICB3ZWJpeC5jb25maXJtKHtcbiAgICAgICAgICAgIHRpdGxlOiBcIkRlbGV0ZSBhbGVydHNcIixcbiAgICAgICAgICAgIG9rOiBcIlllc1wiLFxuICAgICAgICAgICAgY2FuY2VsOiBcIk5vXCIsXG4gICAgICAgICAgICB0ZXh0OiBgRGVsZXRlIGFsZXJ0IGl0ZW0ocykgb2YgJHtpbmRleGVzLmpvaW4oXCIsIFwiKX1gXG4gICAgICAgIH0pLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgaWRlbnRpZmllcnMgPSBpdGVtcy5tYXAoKGl0ZW0pID0+IGl0ZW0uaWRlbnRpZmllcik7XG4gICAgICAgICAgICBzZWxmLnRhYmxlLnNob3dQcm9ncmVzcyh7XG4gICAgICAgICAgICAgICAgaGlkZTogZmFsc2VcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICBhbGVydHMuZGVsZXRlKGlkZW50aWZpZXIpLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgICAgIHNlbGYudGFibGUucmVtb3ZlKGlkcylcbiAgICAgICAgICAgICAgICBzZWxmLnRhYmxlLnNob3dQcm9ncmVzcyh7XG4gICAgICAgICAgICAgICAgICAgIGhpZGU6IHRydWVcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHZpZXdJdGVtKGlkKSB7XG4gICAgICAgIHRoaXMuYWxlcnRWaWV3LnNob3dGb3IodGhpcy50YWJsZS5nZXRJdGVtKGlkKSk7XG4gICAgfVxuXG4gICAgaW5pdCgpIHtcbiAgICAgICAgLy8gdGhpcy51c2UocGx1Z2lucy5Qcm9ncmVzc0JhciwgXCJwcm9ncmVzc1wiKTtcbiAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgICAgICBzZWxmLnRhYmxlID0gJCQoXCJhbGVydHNfdGFibGVcIik7XG4gICAgICAgIHNlbGYuYWxlcnRWaWV3ID0gc2VsZi51aShBbGVydFZpZXcpO1xuXG4gICAgICAgIHdlYml4LmV4dGVuZChzZWxmLnRhYmxlLCB3ZWJpeC5Qcm9ncmVzc0Jhcik7XG4gICAgICAgIHdlYml4LnJlYWR5KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHNlbGYudGFibGUuY2xlYXJBbGwoKTtcbiAgICAgICAgICAgIHNlbGYudGFibGUuc2hvd1Byb2dyZXNzKHtcbiAgICAgICAgICAgICAgICBoaWRlOiBmYWxzZVxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBhbGVydHMubGlzdCgpLnRoZW4oZGF0YSA9PiB7XG4gICAgICAgICAgICAgICAgbGV0IGFsZXJ0cyA9IGRhdGEuanNvbigpLmFsZXJ0cztcbiAgICAgICAgICAgICAgICBzZWxmLnRhYmxlLnBhcnNlKGFsZXJ0cyk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgd2ViaXgudWkoe1xuICAgICAgICAgICAgdmlldzogXCJjb250ZXh0bWVudVwiLFxuICAgICAgICAgICAgaWQ6IFwiYWxlcnRzX2NtXCIsXG4gICAgICAgICAgICBkYXRhOiBbXCJWaWV3XCIsIFwiRGVsZXRlXCJdXG4gICAgICAgIH0pLmF0dGFjaFRvKHNlbGYudGFibGUpO1xuXG5cbiAgICAgICAgc2VsZi50YWJsZS5hdHRhY2hFdmVudChcIm9uSXRlbURibENsaWNrXCIsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHNlbGYudmlld0l0ZW0oc2VsZi50YWJsZS5nZXRTZWxlY3RlZElkKCkpO1xuICAgICAgICB9KTtcblxuICAgICAgICAkJChcImFsZXJ0c19jbVwiKS5hdHRhY2hFdmVudChcIm9uTWVudUl0ZW1DbGlja1wiLCBmdW5jdGlvbiAoaWQpIHtcbiAgICAgICAgICAgIGlmIChpZCA9PSBcIkRlbGV0ZVwiKSB7XG4gICAgICAgICAgICAgICAgc2VsZi5kZWxldGVJdGVtKHNlbGYudGFibGUuZ2V0U2VsZWN0ZWRJZCh0cnVlKSk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKGlkID09IFwiVmlld1wiKSB7XG4gICAgICAgICAgICAgICAgc2VsZi52aWV3SXRlbShzZWxmLnRhYmxlLmdldFNlbGVjdGVkSWQoKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NvdXJjZXMvdmlld3MvYWxlcnRzL2luZGV4LmpzIiwiaW1wb3J0IHsgSmV0VmlldyB9IGZyb20gXCJ3ZWJpeC1qZXRcIjtcblxuaW1wb3J0IHsgRXJyb3JWaWV3IH0gZnJvbSBcIi4uL2Vycm9ycy9kaWFsb2dcIjtcbmltcG9ydCB7IHRhaWdhIH0gZnJvbSBcIi4uLy4uL3NlcnZpY2VzL3RhaWdhXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIENpcmNsZXNWaWV3IGV4dGVuZHMgSmV0VmlldyB7XG4gICAgY29uZmlnKCkge1xuICAgICAgICBjb25zdCBncmlkID0ge1xuICAgICAgICAgICAgcm93czogW3tcbiAgICAgICAgICAgICAgICAvL0hlYWRlclxuICAgICAgICAgICAgICAgIHZpZXc6IFwidGVtcGxhdGVcIixcbiAgICAgICAgICAgICAgICB0eXBlOiBcImhlYWRlclwiLFxuICAgICAgICAgICAgICAgIHRlbXBsYXRlOiBcIkNpcmNsZXNcIixcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7IC8vRGF0YVRhYmxlXG4gICAgICAgICAgICAgICAgdmlldzogXCJkYXRhdGFibGVcIixcbiAgICAgICAgICAgICAgICBpZDogXCJjaXJjbGVzX3RhYmxlXCIsXG4gICAgICAgICAgICAgICAgcmVzaXplQ29sdW1uOiB0cnVlLFxuICAgICAgICAgICAgICAgIHR5cGU6IHtcbiAgICAgICAgICAgICAgICAgICAgaGVpZ2h0OiAyMDAsXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBzY3JvbGw6IFwieHlcIixcbiAgICAgICAgICAgICAgICBhdXRvQ29uZmlnOiB0cnVlLFxuICAgICAgICAgICAgICAgIHZpZXc6IFwiZGF0YXRhYmxlXCIsXG4gICAgICAgICAgICAgICAgc2VsZWN0OiB0cnVlLFxuICAgICAgICAgICAgICAgIGNzczogXCJ3ZWJpeF9oZWFkZXJfYm9yZGVyIHdlYml4X2RhdGFfYm9yZGVyXCIsXG4gICAgICAgICAgICAgICAgb25Db250ZXh0OiB7fSxcbiAgICAgICAgICAgICAgICBjb2x1bW5zOiBbe1xuICAgICAgICAgICAgICAgICAgICBpZDogXCJJRFwiLFxuICAgICAgICAgICAgICAgICAgICBoZWFkZXI6IFwiSURcIixcbiAgICAgICAgICAgICAgICAgICAgc29ydDogXCJpbnRcIixcbiAgICAgICAgICAgICAgICAgICAgYXV0b3dpZHRoOiB0cnVlLFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBpZDogXCJOYW1lXCIsXG4gICAgICAgICAgICAgICAgICAgIGhlYWRlcjogXCJOYW1lXCIsXG4gICAgICAgICAgICAgICAgICAgIHNvcnQ6IFwic3RyaW5nXCIsXG4gICAgICAgICAgICAgICAgICAgIHdpZHRoOiAyMDBcbiAgICAgICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgICAgIGlkOiBcIk93bmVyXCIsXG4gICAgICAgICAgICAgICAgICAgIGhlYWRlcjogW1wiT3duZXJcIiwge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29udGVudDogXCJ0ZXh0RmlsdGVyXCJcbiAgICAgICAgICAgICAgICAgICAgfV0sXG4gICAgICAgICAgICAgICAgICAgIHNvcnQ6IFwic3RyaW5nXCIsXG4gICAgICAgICAgICAgICAgICAgIHdpZHRoOiAyMDBcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgaWQ6IFwiRGVzY3JpcHRpb25cIixcbiAgICAgICAgICAgICAgICAgICAgaGVhZGVyOiBcIkRlc2NyaXB0aW9uXCIsXG4gICAgICAgICAgICAgICAgICAgIHNvcnQ6IFwic3RyaW5nXCIsXG4gICAgICAgICAgICAgICAgICAgIHdpZHRoOiAxMzAwLFxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgIHNjaGVtZToge1xuICAgICAgICAgICAgICAgICAgICAkaW5pdDogZnVuY3Rpb24gKG9iaikge1xuICAgICAgICAgICAgICAgICAgICAgICAgb2JqLmluZGV4ID0gdGhpcy5jb3VudCgpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgXVxuICAgICAgICB9O1xuICAgICAgICByZXR1cm4gZ3JpZDtcbiAgICB9XG5cbiAgICBzaG93RXJyb3IobWVzc2FnZSkge1xuICAgICAgICB0aGlzLmVycm9yVmlldy5zaG93RXJyb3IobWVzc2FnZSk7XG4gICAgfVxuXG4gICAgaW5pdCh2aWV3KSB7XG4gICAgICAgIGNvbnN0IHNlbGYgPSB0aGlzO1xuXG4gICAgICAgIHNlbGYuZXJyb3JWaWV3ID0gdGhpcy51aShFcnJvclZpZXcpO1xuXG4gICAgICAgIGNvbnN0IG1lbnUgPSB3ZWJpeC51aSh7XG4gICAgICAgICAgICB2aWV3OiBcImNvbnRleHRtZW51XCIsXG4gICAgICAgICAgICBpZDogXCJjaXJjbGVzX2NtXCJcbiAgICAgICAgfSk7XG5cbiAgICAgICAgdGhpcy5jaXJjbGVUYWJsZSA9IHRoaXMuJCQoXCJjaXJjbGVzX3RhYmxlXCIpO1xuICAgICAgICB3ZWJpeC5leHRlbmQodGhpcy5jaXJjbGVUYWJsZSwgd2ViaXguUHJvZ3Jlc3NCYXIpO1xuXG5cbiAgICAgICAgd2ViaXguYWpheCgpLmdldChcIi9hdXRoL2F1dGhlbnRpY2F0ZWRcIiwgZnVuY3Rpb24gKGRhdGEpIHtcbiAgICAgICAgICAgIGNvbnN0IGluZm8gPSBKU09OLnBhcnNlKGRhdGEpO1xuICAgICAgICAgICAgY29uc3QgdXNlcm5hbWUgPSBpbmZvLnVzZXJuYW1lLnJlcGxhY2UoXCIuM2JvdFwiLCBcIlwiKVxuICAgICAgICAgICAgdGFpZ2EudXNlckNpcmNsZXModXNlcm5hbWUpLnRoZW4oZGF0YSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3QgY2lyY2xlcyA9IGRhdGEuanNvbigpO1xuICAgICAgICAgICAgICAgIHNlbGYuY2lyY2xlVGFibGUucGFyc2UoY2lyY2xlcyk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG5cblxuICAgIH1cbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NvdXJjZXMvdmlld3MvY2lyY2xlcy9pbmRleC5qcyIsImltcG9ydCB7IEpldFZpZXcgfSBmcm9tIFwid2ViaXgtamV0XCI7XG5cbmltcG9ydCB7IEVycm9yVmlldyB9IGZyb20gXCIuLi9lcnJvcnMvZGlhbG9nXCI7XG5pbXBvcnQgeyB0YWlnYSB9IGZyb20gXCIuLi8uLi9zZXJ2aWNlcy90YWlnYVwiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDaXJjbGVzdG9yaWVzVmlldyBleHRlbmRzIEpldFZpZXcge1xuICAgIGNvbmZpZygpIHtcbiAgICAgICAgY29uc3QgZ3JpZCA9IHtcbiAgICAgICAgICAgIHJvd3M6IFt7XG4gICAgICAgICAgICAgICAgLy9IZWFkZXJcbiAgICAgICAgICAgICAgICB2aWV3OiBcInRlbXBsYXRlXCIsXG4gICAgICAgICAgICAgICAgdHlwZTogXCJoZWFkZXJcIixcbiAgICAgICAgICAgICAgICB0ZW1wbGF0ZTogXCJDaXJjbGVzU3Rvcmllc1wiLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHsgLy9EYXRhVGFibGVcbiAgICAgICAgICAgICAgICB2aWV3OiBcImRhdGF0YWJsZVwiLFxuICAgICAgICAgICAgICAgIGlkOiBcImNpcmNsZXN0b3JpZXNfdGFibGVcIixcbiAgICAgICAgICAgICAgICByZXNpemVDb2x1bW46IHRydWUsXG4gICAgICAgICAgICAgICAgdHlwZToge1xuICAgICAgICAgICAgICAgICAgICBoZWlnaHQ6IDIwMCxcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHNjcm9sbDogXCJ4eVwiLFxuICAgICAgICAgICAgICAgIGF1dG9Db25maWc6IHRydWUsXG4gICAgICAgICAgICAgICAgdmlldzogXCJkYXRhdGFibGVcIixcbiAgICAgICAgICAgICAgICBzZWxlY3Q6IHRydWUsXG4gICAgICAgICAgICAgICAgY3NzOiBcIndlYml4X2hlYWRlcl9ib3JkZXIgd2ViaXhfZGF0YV9ib3JkZXJcIixcbiAgICAgICAgICAgICAgICBvbkNvbnRleHQ6IHt9LFxuICAgICAgICAgICAgICAgIGNvbHVtbnM6IFt7XG4gICAgICAgICAgICAgICAgICAgIGlkOiBcIklEXCIsXG4gICAgICAgICAgICAgICAgICAgIGhlYWRlcjogXCJJRFwiLFxuICAgICAgICAgICAgICAgICAgICBzb3J0OiBcImludFwiLFxuICAgICAgICAgICAgICAgICAgICBhdXRvd2lkdGg6IHRydWUsXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIGlkOiBcIlByb2plY3RcIixcbiAgICAgICAgICAgICAgICAgICAgaGVhZGVyOiBbXCJQcm9qZWN0XCIsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRlbnQ6IFwidGV4dEZpbHRlclwiXG4gICAgICAgICAgICAgICAgICAgIH1dLFxuICAgICAgICAgICAgICAgICAgICBzb3J0OiBcInN0cmluZ1wiLFxuICAgICAgICAgICAgICAgICAgICB3aWR0aDogMzAwXG4gICAgICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgICAgICBpZDogXCJTdWJqZWN0XCIsXG4gICAgICAgICAgICAgICAgICAgIGhlYWRlcjogXCJTdWJqZWN0XCIsXG4gICAgICAgICAgICAgICAgICAgIHNvcnQ6IFwic3RyaW5nXCIsXG4gICAgICAgICAgICAgICAgICAgIHdpZHRoOiA3MDBcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgaWQ6IFwiTWlsZXN0b25lXCIsXG4gICAgICAgICAgICAgICAgICAgIGhlYWRlcjogXCJNaWxlc3RvbmVcIixcbiAgICAgICAgICAgICAgICAgICAgc29ydDogXCJzdHJpbmdcIixcbiAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDIwMCxcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgaWQ6IFwiU3RhdHVzXCIsXG4gICAgICAgICAgICAgICAgICAgIGhlYWRlcjogXCJTdGF0dXNcIixcbiAgICAgICAgICAgICAgICAgICAgc29ydDogXCJzdHJpbmdcIixcbiAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDIwMCxcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgaWQ6IFwiRHVlIGRhdGVcIixcbiAgICAgICAgICAgICAgICAgICAgaGVhZGVyOiBcIkR1ZSBkYXRlXCIsXG4gICAgICAgICAgICAgICAgICAgIHNvcnQ6IFwic3RyaW5nXCIsXG4gICAgICAgICAgICAgICAgICAgIHdpZHRoOiAyMDAsXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgc2NoZW1lOiB7XG4gICAgICAgICAgICAgICAgICAgICRpbml0OiBmdW5jdGlvbiAob2JqKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBvYmouaW5kZXggPSB0aGlzLmNvdW50KCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBdXG4gICAgICAgIH07XG4gICAgICAgIHJldHVybiBncmlkO1xuICAgIH1cblxuICAgIHNob3dFcnJvcihtZXNzYWdlKSB7XG4gICAgICAgIHRoaXMuZXJyb3JWaWV3LnNob3dFcnJvcihtZXNzYWdlKTtcbiAgICB9XG5cbiAgICBpbml0KHZpZXcpIHtcbiAgICAgICAgY29uc3Qgc2VsZiA9IHRoaXM7XG5cbiAgICAgICAgc2VsZi5lcnJvclZpZXcgPSB0aGlzLnVpKEVycm9yVmlldyk7XG5cbiAgICAgICAgY29uc3QgbWVudSA9IHdlYml4LnVpKHtcbiAgICAgICAgICAgIHZpZXc6IFwiY29udGV4dG1lbnVcIixcbiAgICAgICAgICAgIGlkOiBcImNpcmNsZXN0b3JpZXNfY21cIlxuICAgICAgICB9KTtcblxuICAgICAgICB0aGlzLnN0b3JpZXNUYWJsZSA9IHRoaXMuJCQoXCJjaXJjbGVzdG9yaWVzX3RhYmxlXCIpO1xuICAgICAgICB3ZWJpeC5leHRlbmQodGhpcy5zdG9yaWVzVGFibGUsIHdlYml4LlByb2dyZXNzQmFyKTtcblxuICAgICAgICB3ZWJpeC5hamF4KCkuZ2V0KFwiL2F1dGgvYXV0aGVudGljYXRlZFwiLCBmdW5jdGlvbiAoZGF0YSkge1xuICAgICAgICAgICAgY29uc3QgaW5mbyA9IEpTT04ucGFyc2UoZGF0YSk7XG4gICAgICAgICAgICBjb25zdCB1c2VybmFtZSA9IGluZm8udXNlcm5hbWUucmVwbGFjZShcIi4zYm90XCIsIFwiXCIpXG4gICAgICAgICAgICB0YWlnYS51c2VyU3Rvcmllcyh1c2VybmFtZSkudGhlbihkYXRhID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCBzdG9yaWVzID0gZGF0YS5qc29uKCk7XG4gICAgICAgICAgICAgICAgc2VsZi5zdG9yaWVzVGFibGUucGFyc2Uoc3Rvcmllcyk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG5cblxuICAgIH1cbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NvdXJjZXMvdmlld3MvY2lyY2xlc3Rvcmllcy9pbmRleC5qcyIsImltcG9ydCB7IEpldFZpZXcgfSBmcm9tIFwid2ViaXgtamV0XCI7XG5cbmltcG9ydCB7IEVycm9yVmlldyB9IGZyb20gXCIuLi9lcnJvcnMvZGlhbG9nXCI7XG5pbXBvcnQgeyB0YWlnYSB9IGZyb20gXCIuLi8uLi9zZXJ2aWNlcy90YWlnYVwiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDaXJjbGVzVGFza3NWaWV3IGV4dGVuZHMgSmV0VmlldyB7XG4gICAgY29uZmlnKCkge1xuICAgICAgICBjb25zdCBncmlkID0ge1xuICAgICAgICAgICAgcm93czogW3tcbiAgICAgICAgICAgICAgICAvL0hlYWRlclxuICAgICAgICAgICAgICAgIHZpZXc6IFwidGVtcGxhdGVcIixcbiAgICAgICAgICAgICAgICB0eXBlOiBcImhlYWRlclwiLFxuICAgICAgICAgICAgICAgIHRlbXBsYXRlOiBcIkNpcmNsZXNUYXNrc1wiLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHsgLy9EYXRhVGFibGVcbiAgICAgICAgICAgICAgICB2aWV3OiBcImRhdGF0YWJsZVwiLFxuICAgICAgICAgICAgICAgIGlkOiBcImNpcmNsZXN0YXNrc190YWJsZVwiLFxuICAgICAgICAgICAgICAgIHJlc2l6ZUNvbHVtbjogdHJ1ZSxcbiAgICAgICAgICAgICAgICB0eXBlOiB7XG4gICAgICAgICAgICAgICAgICAgIGhlaWdodDogMjAwLFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgc2Nyb2xsOiBcInh5XCIsXG4gICAgICAgICAgICAgICAgYXV0b0NvbmZpZzogdHJ1ZSxcbiAgICAgICAgICAgICAgICB2aWV3OiBcImRhdGF0YWJsZVwiLFxuICAgICAgICAgICAgICAgIHNlbGVjdDogdHJ1ZSxcbiAgICAgICAgICAgICAgICBjc3M6IFwid2ViaXhfaGVhZGVyX2JvcmRlciB3ZWJpeF9kYXRhX2JvcmRlclwiLFxuICAgICAgICAgICAgICAgIG9uQ29udGV4dDoge30sXG4gICAgICAgICAgICAgICAgY29sdW1uczogW3tcbiAgICAgICAgICAgICAgICAgICAgaWQ6IFwiSURcIixcbiAgICAgICAgICAgICAgICAgICAgaGVhZGVyOiBcIklEXCIsXG4gICAgICAgICAgICAgICAgICAgIHNvcnQ6IFwiaW50XCIsXG4gICAgICAgICAgICAgICAgICAgIGF1dG93aWR0aDogdHJ1ZSxcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgaWQ6IFwiUHJvamVjdFwiLFxuICAgICAgICAgICAgICAgICAgICBoZWFkZXI6IFtcIlByb2plY3RcIiwge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29udGVudDogXCJ0ZXh0RmlsdGVyXCJcbiAgICAgICAgICAgICAgICAgICAgfV0sXG4gICAgICAgICAgICAgICAgICAgIHNvcnQ6IFwic3RyaW5nXCIsXG4gICAgICAgICAgICAgICAgICAgIHdpZHRoOiAzMDBcbiAgICAgICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgICAgIGlkOiBcIlN1YmplY3RcIixcbiAgICAgICAgICAgICAgICAgICAgaGVhZGVyOiBcIlN1YmplY3RcIixcbiAgICAgICAgICAgICAgICAgICAgc29ydDogXCJzdHJpbmdcIixcbiAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDgwMFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBpZDogXCJNaWxlc3RvbmVcIixcbiAgICAgICAgICAgICAgICAgICAgaGVhZGVyOiBcIk1pbGVzdG9uZVwiLFxuICAgICAgICAgICAgICAgICAgICBzb3J0OiBcInN0cmluZ1wiLFxuICAgICAgICAgICAgICAgICAgICB3aWR0aDogMjAwLFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBpZDogXCJTdGF0dXNcIixcbiAgICAgICAgICAgICAgICAgICAgaGVhZGVyOiBcIlN0YXR1c1wiLFxuICAgICAgICAgICAgICAgICAgICBzb3J0OiBcInN0cmluZ1wiLFxuICAgICAgICAgICAgICAgICAgICB3aWR0aDogMzAwLFxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgIHNjaGVtZToge1xuICAgICAgICAgICAgICAgICAgICAkaW5pdDogZnVuY3Rpb24gKG9iaikge1xuICAgICAgICAgICAgICAgICAgICAgICAgb2JqLmluZGV4ID0gdGhpcy5jb3VudCgpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgXVxuICAgICAgICB9O1xuICAgICAgICByZXR1cm4gZ3JpZDtcbiAgICB9XG5cbiAgICBzaG93RXJyb3IobWVzc2FnZSkge1xuICAgICAgICB0aGlzLmVycm9yVmlldy5zaG93RXJyb3IobWVzc2FnZSk7XG4gICAgfVxuXG4gICAgaW5pdCh2aWV3KSB7XG4gICAgICAgIGNvbnN0IHNlbGYgPSB0aGlzO1xuXG4gICAgICAgIHNlbGYuZXJyb3JWaWV3ID0gdGhpcy51aShFcnJvclZpZXcpO1xuXG4gICAgICAgIGNvbnN0IG1lbnUgPSB3ZWJpeC51aSh7XG4gICAgICAgICAgICB2aWV3OiBcImNvbnRleHRtZW51XCIsXG4gICAgICAgICAgICBpZDogXCJjaXJjbGVzdGFza3NfY21cIlxuICAgICAgICB9KTtcblxuICAgICAgICB0aGlzLnRhc2tzVGFibGUgPSB0aGlzLiQkKFwiY2lyY2xlc3Rhc2tzX3RhYmxlXCIpO1xuICAgICAgICB3ZWJpeC5leHRlbmQodGhpcy50YXNrc1RhYmxlLCB3ZWJpeC5Qcm9ncmVzc0Jhcik7XG5cbiAgICAgICAgdGFpZ2EudXNlclRhc2tzKDM2KS50aGVuKGRhdGEgPT4ge1xuICAgICAgICAgICAgY29uc3QgY2lyY2xlcyA9IGRhdGEuanNvbigpO1xuICAgICAgICAgICAgc2VsZi50YXNrc1RhYmxlLnBhcnNlKGNpcmNsZXMpO1xuICAgICAgICB9KTtcblxuICAgICAgICB3ZWJpeC5hamF4KCkuZ2V0KFwiL2F1dGgvYXV0aGVudGljYXRlZFwiLCBmdW5jdGlvbiAoZGF0YSkge1xuICAgICAgICAgICAgY29uc3QgaW5mbyA9IEpTT04ucGFyc2UoZGF0YSk7XG4gICAgICAgICAgICBjb25zdCB1c2VybmFtZSA9IGluZm8udXNlcm5hbWUucmVwbGFjZShcIi4zYm90XCIsIFwiXCIpXG4gICAgICAgICAgICB0YWlnYS51c2VyVGFza3ModXNlcm5hbWUpLnRoZW4oZGF0YSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3QgdGFza3MgPSBkYXRhLmpzb24oKTtcbiAgICAgICAgICAgICAgICBzZWxmLnRhc2tzVGFibGUucGFyc2UodGFza3MpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuXG5cbiAgICB9XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zb3VyY2VzL3ZpZXdzL2NpcmNsZXRhc2tzL2luZGV4LmpzIiwiaW1wb3J0IHsgRXh0ZXJuYWxWaWV3IH0gZnJvbSBcIi4uL2V4dGVybmFsXCI7XG5cbmNvbnN0IENPREVfVVJMID0gXCIvY29kZXNlcnZlci8/Zm9sZGVyPS9zYW5kYm94L2NvZGVcIjtcbmNvbnN0IFJFUVVJUkVEX1BBQ0tBR0VTID0ge1xuICAgIFwiemVyb2JvdC5jb2Rlc2VydmVyXCI6IFwiaHR0cHM6Ly9naXRodWIuY29tL3RocmVlZm9sZHRlY2gvanVtcHNjYWxlWF90aHJlZWJvdC90cmVlL2RldmVsb3BtZW50L1RocmVlQm90UGFja2FnZXMvemVyb2JvdC9jb2Rlc2VydmVyXCJcbn1cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ29kZXNlcnZlclZpZXcgZXh0ZW5kcyBFeHRlcm5hbFZpZXcge1xuICAgIGNvbnN0cnVjdG9yKGFwcCwgbmFtZSkge1xuICAgICAgICBzdXBlcihhcHAsIG5hbWUsIENPREVfVVJMLCBSRVFVSVJFRF9QQUNLQUdFUyk7XG4gICAgfVxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc291cmNlcy92aWV3cy9jb2Rlc2VydmVyL2luZGV4LmpzIiwiaW1wb3J0IHsgSmV0VmlldyB9IGZyb20gXCJ3ZWJpeC1qZXRcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVG9wVmlldyBleHRlbmRzIEpldFZpZXcge1xuXHRjb25maWcoKSB7XG5cdFx0cmV0dXJuIHtcblx0XHRcdHR5cGU6IFwic3BhY2VcIixcblx0XHRcdHJlc3BvbnNpdmU6IHRydWUsXG5cdFx0XHRyb3dzOiBbXG5cdFx0XHRcdHtcblx0XHRcdFx0XHRjb2xzOiBbe1xuXHRcdFx0XHRcdFx0JHN1YnZpZXc6IFwiZGFzaC5qc3hJbmZvXCJcblx0XHRcdFx0XHR9LFxuXHRcdFx0XHRcdHtcblx0XHRcdFx0XHRcdCRzdWJ2aWV3OiBcImRhc2guaGVhbHRoXCJcblx0XHRcdFx0XHR9LFxuXHRcdFx0XHRcdHtcblx0XHRcdFx0XHRcdCRzdWJ2aWV3OiBcImRhc2guZGlza1NwYWNlXCJcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XVxuXHRcdFx0XHR9LFxuXHRcdFx0XHR7XG5cdFx0XHRcdFx0Y29sczogW3tcblx0XHRcdFx0XHRcdCRzdWJ2aWV3OiBcImRhc2gucHJvY2Vzc2VzXCJcblx0XHRcdFx0XHR9LFxuXHRcdFx0XHRcdHsgJHN1YnZpZXc6IFwiZGFzaC5ydW5uaW5nUG9ydHNcIiB9XVxuXHRcdFx0XHR9LFxuXHRcdFx0XVxuXHRcdH07XG5cdH1cbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NvdXJjZXMvdmlld3MvZGFzaC9pbmRleC5qcyIsImltcG9ydCB7IEV4dGVybmFsVmlldyB9IGZyb20gXCIuLi9leHRlcm5hbFwiO1xuXG5jb25zdCBVUkwgPSBcIi8jL2Zhcm1tYW5hZ2VtZW50XCI7XG5jb25zdCBSRVFVSVJFRF9QQUNLQUdFUyA9IHtcbiAgICBcInRocmVlYm90LmZhcm1tYW5hZ2VtZW50XCI6IFwiaHR0cHM6Ly9naXRodWIuY29tL3RocmVlZm9sZHRlY2gvanVtcHNjYWxlWF90aHJlZWJvdC90cmVlL2RldmVsb3BtZW50L1RocmVlQm90UGFja2FnZXMvdGhyZWVib3QvZmFybW1hbmFnZW1lbnRcIlxufVxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBGYXJtbWFuYWdlbWVudFZpZXcgZXh0ZW5kcyBFeHRlcm5hbFZpZXcge1xuICAgIGNvbnN0cnVjdG9yKGFwcCwgbmFtZSkge1xuICAgICAgICBzdXBlcihhcHAsIG5hbWUsIFVSTCwgUkVRVUlSRURfUEFDS0FHRVMpO1xuICAgIH1cbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NvdXJjZXMvdmlld3MvZmFybW1hbmFnZW1lbnQvaW5kZXguanMiLCJpbXBvcnQgeyBFeHRlcm5hbFZpZXcgfSBmcm9tIFwiLi4vZXh0ZXJuYWxcIjtcblxuY29uc3QgVVJMID0gXCIvc2ltdWxhdG9yL3RocmVlZm9sZC9ub3RlYm9vay9cIjtcbmNvbnN0IFJFUVVJUkVEX1BBQ0tBR0VTID0ge1xuICAgIFwidGhyZWVmb2xkLnNpbXVsYXRvclwiOiBcImh0dHBzOi8vZ2l0aHViLmNvbS90aHJlZWZvbGR0ZWNoL2p1bXBzY2FsZVhfdGhyZWVib3QvdHJlZS9kZXZlbG9wbWVudC9UaHJlZUJvdFBhY2thZ2VzL3RocmVlZm9sZC9zaW11bGF0b3JcIlxufVxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBKdXB5dGVyVmlldyBleHRlbmRzIEV4dGVybmFsVmlldyB7XG4gICAgY29uc3RydWN0b3IoYXBwLCBuYW1lKSB7XG4gICAgICAgIHN1cGVyKGFwcCwgbmFtZSwgVVJMLCBSRVFVSVJFRF9QQUNLQUdFUyk7XG4gICAgfVxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc291cmNlcy92aWV3cy9qdXB5dGVyL2luZGV4LmpzIiwiaW1wb3J0IHsgSmV0VmlldyB9IGZyb20gXCJ3ZWJpeC1qZXRcIjtcblxuaW1wb3J0IEFwcExvZ3NWaWV3IGZyb20gXCIuL2FwcExvZ3NcIjtcbmltcG9ydCB7IGxvZ3MgfSBmcm9tIFwiLi4vLi4vc2VydmljZXMvbG9nc1wiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBMb2dzVmlldyBleHRlbmRzIEpldFZpZXcge1xuICAgIGNvbmZpZygpIHtcblxuICAgICAgICBjb25zdCB2aWV3ID0ge1xuICAgICAgICAgICAgcm93czogW3tcbiAgICAgICAgICAgICAgICBjb2xzOiBbXG4gICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZpZXc6IFwidGVtcGxhdGVcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU6IFwiaGVhZGVyXCIsIHRlbXBsYXRlOiBcIkxvZ3NcIixcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmlldzogXCJjb21ib1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgaWQ6IFwiYXBwc19jb21ib1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgcGxhY2Vob2xkZXI6IFwiQ2hvb3NlIHlvdXIgYXBwbGljYXRpb25cIixcbiAgICAgICAgICAgICAgICAgICAgICAgIG9uOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb25DaGFuZ2U6IGZ1bmN0aW9uIChhcHBOYW1lKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuJHNjb3BlLnNob3dGb3IoYXBwTmFtZSlcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIEFwcExvZ3NWaWV3XG4gICAgICAgICAgICBdXG4gICAgICAgIH07XG5cbiAgICAgICAgcmV0dXJuIHZpZXc7XG4gICAgfVxuXG4gICAgaW5pdCh2aWV3KSB7XG4gICAgICAgIHZpZXcuYXBwc0NvbWJvID0gJCQoXCJhcHBzX2NvbWJvXCIpO1xuICAgICAgICBsb2dzLmxpc3RBcHBzKCkudGhlbihkYXRhID0+IHtcbiAgICAgICAgICAgIHZpZXcuYXBwc0NvbWJvLmRlZmluZShcIm9wdGlvbnNcIiwgZGF0YS5qc29uKCkpO1xuICAgICAgICAgICAgdmlldy5hcHBzQ29tYm8ucmVuZGVyKCk7XG4gICAgICAgIH0pO1xuXG4gICAgfVxuXG4gICAgdXJsQ2hhbmdlKHZpZXcsIHVybCkge1xuICAgICAgICBjb25zdCBhcHBOYW1lID0gdXJsWzBdLnBhcmFtcy5hcHBuYW1lLCBsb2dJZCA9IHVybFswXS5wYXJhbXMubG9naWQ7XG4gICAgICAgIGlmIChhcHBOYW1lKSB7XG4gICAgICAgICAgICB0aGlzLnNob3dGb3IoYXBwTmFtZSwgbG9nSWQpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgc2hvd0ZvcihhcHBOYW1lLCBsb2dJZCkge1xuICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgICAgIHNlbGYuYXBwTG9ncyA9ICQkKFwiYXBwbG9nc190YWJsZVwiKTtcblxuICAgICAgICB3ZWJpeC5leHRlbmQoc2VsZi5hcHBMb2dzLCB3ZWJpeC5Qcm9ncmVzc0Jhcik7XG4gICAgICAgIHNlbGYuYXBwTG9ncy5zaG93UHJvZ3Jlc3MoeyBoaWRlOiBmYWxzZSB9KTtcblxuICAgICAgICBsb2dzLmxpc3QoYXBwTmFtZSwgbG9nSWQpLnRoZW4oZGF0YSA9PiB7XG4gICAgICAgICAgICBzZWxmLmFwcExvZ3MuY2xlYXJBbGwoKVxuICAgICAgICAgICAgc2VsZi5hcHBMb2dzLnBhcnNlKGRhdGEuanNvbigpWzBdKVxuICAgICAgICAgICAgc2VsZi5hcHBMb2dzLnNob3dQcm9ncmVzcyh7IGhpZGU6IHRydWUgfSk7XG4gICAgICAgIH0pO1xuICAgIH1cbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NvdXJjZXMvdmlld3MvbG9ncy9pbmRleC5qcyIsImltcG9ydCB7IEpldFZpZXcgfSBmcm9tIFwid2ViaXgtamV0XCI7XG5cbmltcG9ydCB7IEVycm9yVmlldyB9IGZyb20gXCIuLi9lcnJvcnMvZGlhbG9nXCI7XG5pbXBvcnQgeyBwYWNrYWdlcyB9IGZyb20gXCIuLi8uLi9zZXJ2aWNlcy9wYWNrYWdlc1wiO1xuXG5jb25zdCBVTktOT1dOX1NUQVRVUyA9ICdVbmtvd24nO1xuXG5jb25zdCBQQUNLQUdFX1NUQVRFUyA9IFtcbiAgICB7XG4gICAgICAgIG5hbWU6IFwiSW5pdFwiLFxuICAgICAgICBhY3Rpb25zOiBbXCJkZWxldGVcIl1cbiAgICB9LFxuICAgIHtcbiAgICAgICAgbmFtZTogXCJDb25maWdcIixcbiAgICAgICAgYWN0aW9uczogWydpbnN0YWxsJywgJ2RlbGV0ZSddLFxuICAgIH0sXG4gICAge1xuICAgICAgICBuYW1lOiBcIkluc3RhbGxlZFwiLFxuICAgICAgICBhY3Rpb25zOiBbJ2RlbGV0ZScsIFwic3RhcnRcIl1cbiAgICB9LFxuICAgIHtcbiAgICAgICAgbmFtZTogXCJSdW5uaW5nXCIsXG4gICAgICAgIGFjdGlvbnM6IFsnZGVsZXRlJywgXCJzdG9wXCJdXG4gICAgfSxcbiAgICB7XG4gICAgICAgIG5hbWU6IFwiSGFsdGVkXCIsXG4gICAgICAgIGFjdGlvbnM6IFsnZGVsZXRlJywgXCJzdGFydFwiLCBcImRpc2FibGVcIl1cbiAgICB9LFxuICAgIHtcbiAgICAgICAgbmFtZTogXCJEaXNhYmxlZFwiLFxuICAgICAgICBhY3Rpb25zOiBbJ2RlbGV0ZScsIFwiZW5hYmxlXCJdXG4gICAgfSxcbiAgICB7XG4gICAgICAgIG5hbWU6IFwiRXJyb3JcIixcbiAgICAgICAgYWN0aW9uczogW1wiZGVsZXRlXCJdXG4gICAgfVxuXVxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBQYWNrYWdlc1ZpZXcgZXh0ZW5kcyBKZXRWaWV3IHtcbiAgICBjb25maWcoKSB7XG4gICAgICAgIGNvbnN0IGdyaWQgPSB7XG4gICAgICAgICAgICByb3dzOiBbe1xuICAgICAgICAgICAgICAgIC8vSGVhZGVyXG4gICAgICAgICAgICAgICAgdmlldzogXCJ0ZW1wbGF0ZVwiLFxuICAgICAgICAgICAgICAgIHR5cGU6IFwiaGVhZGVyXCIsXG4gICAgICAgICAgICAgICAgdGVtcGxhdGU6IFwiUGFja2FnZXNcIixcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7IC8vYWRkaW5nIFBhY2thZ2VcbiAgICAgICAgICAgICAgICBjb2xzOiBbe1xuICAgICAgICAgICAgICAgICAgICAvL3NlbGVjdG9yXG4gICAgICAgICAgICAgICAgICAgIHZpZXc6IFwic2VsZWN0XCIsXG4gICAgICAgICAgICAgICAgICAgIGlkOiAnbWV0aG9kX3NlbGVjdG9yJyxcbiAgICAgICAgICAgICAgICAgICAgb3B0aW9uczogW1wiUGF0aFwiLCBcIkdpdHVybFwiXSxcbiAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDEwMFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgLy90ZXh0IGFyZWFcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIHZpZXc6IFwidGV4dFwiLFxuICAgICAgICAgICAgICAgICAgICBpZDogJ3BhY2thZ2VfcGF0aCcsXG4gICAgICAgICAgICAgICAgICAgIGlucHV0QWxpZ246IFwibGVmdFwiLFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgLy9zdWJtaXQgYnV0dG9uXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICB2aWV3OiBcImJ1dHRvblwiLFxuICAgICAgICAgICAgICAgICAgICBpZDogXCJhZGRfcGFja2FnZV9idXR0b25cIixcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU6IFwiQWRkIHBhY2thZ2VcIixcbiAgICAgICAgICAgICAgICAgICAgYXV0b3dpZHRoOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICB0eXBlOiBcIlwiLFxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgeyAvL0RhdGFUYWJsZVxuICAgICAgICAgICAgICAgIHZpZXc6IFwiZGF0YXRhYmxlXCIsXG4gICAgICAgICAgICAgICAgaWQ6IFwicGFja2FnZXNfdGFibGVcIixcbiAgICAgICAgICAgICAgICByZXNpemVDb2x1bW46IHRydWUsXG4gICAgICAgICAgICAgICAgdHlwZToge1xuICAgICAgICAgICAgICAgICAgICBoZWlnaHQ6IDIwMCxcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHNjcm9sbDogXCJ4eVwiLFxuICAgICAgICAgICAgICAgIGF1dG9Db25maWc6IHRydWUsXG4gICAgICAgICAgICAgICAgdmlldzogXCJkYXRhdGFibGVcIixcbiAgICAgICAgICAgICAgICBzZWxlY3Q6IHRydWUsXG4gICAgICAgICAgICAgICAgY3NzOiBcIndlYml4X2hlYWRlcl9ib3JkZXIgd2ViaXhfZGF0YV9ib3JkZXJcIixcbiAgICAgICAgICAgICAgICBvbkNvbnRleHQ6IHt9LFxuICAgICAgICAgICAgICAgIGNvbHVtbnM6IFt7XG4gICAgICAgICAgICAgICAgICAgIGlkOiBcImluZGV4XCIsXG4gICAgICAgICAgICAgICAgICAgIGhlYWRlcjogXCIjXCIsXG4gICAgICAgICAgICAgICAgICAgIHNvcnQ6IFwiaW50XCIsXG4gICAgICAgICAgICAgICAgICAgIGF1dG93aWR0aDogdHJ1ZSxcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgaWQ6IFwiYXV0aG9yXCIsXG4gICAgICAgICAgICAgICAgICAgIGhlYWRlcjogW1wiQXV0aG9yXCIsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRlbnQ6IFwic2VsZWN0RmlsdGVyXCJcbiAgICAgICAgICAgICAgICAgICAgfV0sXG4gICAgICAgICAgICAgICAgICAgIHNvcnQ6IFwic3RyaW5nXCIsXG4gICAgICAgICAgICAgICAgICAgIHdpZHRoOiAyMDBcbiAgICAgICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgICAgIGlkOiBcIm5hbWVcIixcbiAgICAgICAgICAgICAgICAgICAgaGVhZGVyOiBbXCJOYW1lXCIsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRlbnQ6IFwidGV4dEZpbHRlclwiXG4gICAgICAgICAgICAgICAgICAgIH1dLFxuICAgICAgICAgICAgICAgICAgICBzb3J0OiBcInN0cmluZ1wiLFxuICAgICAgICAgICAgICAgICAgICB3aWR0aDogMjAwXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIGlkOiBcInN0YXR1c1wiLFxuICAgICAgICAgICAgICAgICAgICBoZWFkZXI6IFwiU3RhdHVzXCIsXG4gICAgICAgICAgICAgICAgICAgIHNvcnQ6IFwic3RyaW5nXCJcbiAgICAgICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgICAgIGlkOiBcInBhdGhcIixcbiAgICAgICAgICAgICAgICAgICAgaGVhZGVyOiBcIlBhdGhcIixcbiAgICAgICAgICAgICAgICAgICAgc29ydDogXCJzdHJpbmdcIixcbiAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDcwMFxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgIHNjaGVtZToge1xuICAgICAgICAgICAgICAgICAgICAkaW5pdDogZnVuY3Rpb24gKG9iaikge1xuICAgICAgICAgICAgICAgICAgICAgICAgb2JqLmluZGV4ID0gdGhpcy5jb3VudCgpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgXVxuICAgICAgICB9O1xuICAgICAgICByZXR1cm4gZ3JpZDtcbiAgICB9XG5cbiAgICBzaG93RXJyb3IobWVzc2FnZSkge1xuICAgICAgICB0aGlzLmVycm9yVmlldy5zaG93RXJyb3IobWVzc2FnZSk7XG4gICAgfVxuXG4gICAgaGFuZGxlUmVzdWx0KHByb21pc2UsIGNhbGxiYWNrKSB7XG4gICAgICAgIHRoaXMucGFja2FnZVRhYmxlLnNob3dQcm9ncmVzcyh7IGhpZGU6IGZhbHNlIH0pO1xuXG4gICAgICAgIHByb21pc2UudGhlbigoZGF0YSkgPT4ge1xuICAgICAgICAgICAgaWYgKGNhbGxiYWNrIGluc3RhbmNlb2YgRnVuY3Rpb24pIHtcbiAgICAgICAgICAgICAgICBjYWxsYmFjayhkYXRhKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgd2ViaXgubWVzc2FnZSh7XG4gICAgICAgICAgICAgICAgdHlwZTogXCJzdWNjZXNzXCIsXG4gICAgICAgICAgICAgICAgdGV4dDogXCJUaGUgb3BlcmF0aW9uIGhhcyBiZWVkIGRvbmUgc3VjY2Vzc2Z1bGx5XCJcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgdGhpcy5wYWNrYWdlVGFibGUuc2hvd1Byb2dyZXNzKHsgaGlkZTogdHJ1ZSB9KTtcbiAgICAgICAgfSkuY2F0Y2goZXJyb3IgPT4ge1xuICAgICAgICAgICAgdGhpcy5zaG93RXJyb3IoXCJFcnJvciBoYXMgaGFwcGVuZWQgZHVyaW5nIHRoaXMgb3BlcmF0aW9uOiBcIiArIGVycm9yLnJlc3BvbnNlLCBcIkVycm9yXCIpO1xuICAgICAgICAgICAgdGhpcy5wYWNrYWdlVGFibGUuc2hvd1Byb2dyZXNzKHsgaGlkZTogdHJ1ZSB9KTtcbiAgICAgICAgfSlcbiAgICB9XG5cbiAgICBhZGRQYWNrYWdlKHBhdGgsIGdpdFVybCkge1xuICAgICAgICB0aGlzLmhhbmRsZVJlc3VsdChwYWNrYWdlcy5hZGQocGF0aCwgZ2l0VXJsKSk7XG4gICAgfVxuXG5cbiAgICBkZWxldGVQYWNrYWdlKHBhY2thZ2VOYW1lLCBlbGVtZW50SUQpIHtcbiAgICAgICAgdGhpcy5oYW5kbGVSZXN1bHQocGFja2FnZXMuZGVsZXRlKHBhY2thZ2VOYW1lKSwgKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5wYWNrYWdlVGFibGUucmVtb3ZlKGVsZW1lbnRJRClcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgc3RhcnRQYWNrYWdlKHBhY2thZ2VOYW1lKSB7XG4gICAgICAgIHRoaXMuaGFuZGxlUmVzdWx0KHBhY2thZ2VzLnN0YXJ0KHBhY2thZ2VOYW1lKSk7XG4gICAgfVxuXG4gICAgc3RvcFBhY2thZ2UocGFja2FnZU5hbWUpIHtcbiAgICAgICAgdGhpcy5oYW5kbGVSZXN1bHQocGFja2FnZXMuc3RvcChwYWNrYWdlTmFtZSkpO1xuXG4gICAgfVxuXG4gICAgZW5hYmxlUGFja2FnZShwYWNrYWdlTmFtZSkge1xuICAgICAgICB0aGlzLmhhbmRsZVJlc3VsdChwYWNrYWdlcy5lbmFibGVQYWNrYWdlKHBhY2thZ2VOYW1lKSk7XG4gICAgfVxuXG4gICAgZGlzYWJsZVBhY2thZ2UocGFja2FnZU5hbWUpIHtcbiAgICAgICAgdGhpcy5oYW5kbGVSZXN1bHQocGFja2FnZXMuZGlzYWJsZShwYWNrYWdlTmFtZSkpO1xuXG4gICAgfVxuXG4gICAgaW5pdCh2aWV3KSB7XG4gICAgICAgIGNvbnN0IHNlbGYgPSB0aGlzO1xuXG4gICAgICAgIHNlbGYuZXJyb3JWaWV3ID0gdGhpcy51aShFcnJvclZpZXcpO1xuXG4gICAgICAgIGNvbnN0IG1lbnUgPSB3ZWJpeC51aSh7XG4gICAgICAgICAgICB2aWV3OiBcImNvbnRleHRtZW51XCIsXG4gICAgICAgICAgICBpZDogXCJwYWNrYWdlc19jbVwiXG4gICAgICAgIH0pO1xuXG4gICAgICAgIHRoaXMucGFja2FnZVRhYmxlID0gdGhpcy4kJChcInBhY2thZ2VzX3RhYmxlXCIpO1xuICAgICAgICB3ZWJpeC5leHRlbmQodGhpcy5wYWNrYWdlVGFibGUsIHdlYml4LlByb2dyZXNzQmFyKTtcblxuICAgICAgICBmdW5jdGlvbiBjaGVja0FjdGlvbihhY3Rpb24sIHNlbGVjdGVkSXRlbUlkKSB7XG4gICAgICAgICAgICBpZiAoc2VsZi5wYWNrYWdlVGFibGUuZ2V0SXRlbShzZWxlY3RlZEl0ZW1JZCkpIHtcbiAgICAgICAgICAgICAgICBsZXQgbmFtZSA9IHNlbGYucGFja2FnZVRhYmxlLmdldEl0ZW0oc2VsZWN0ZWRJdGVtSWQpLm5hbWVcbiAgICAgICAgICAgICAgICBsZXQgYXV0aG9yID0gc2VsZi5wYWNrYWdlVGFibGUuZ2V0SXRlbShzZWxlY3RlZEl0ZW1JZCkuYXV0aG9yXG4gICAgICAgICAgICAgICAgbGV0IGVsZW1lbnRJRCA9IHNlbGYucGFja2FnZVRhYmxlLmdldEl0ZW0oc2VsZWN0ZWRJdGVtSWQpLmlkXG4gICAgICAgICAgICAgICAgbGV0IHBhY2thZ2VOYW1lID0gYXV0aG9yICsgXCIuXCIgKyBuYW1lXG4gICAgICAgICAgICAgICAgaWYgKGFjdGlvbiA9PSAnZGVsZXRlJykge1xuICAgICAgICAgICAgICAgICAgICAvL2RlbGV0ZVBhY2thZ2UocGFja2FnZU5hbWUpXG4gICAgICAgICAgICAgICAgICAgIC8vIHNlbGYucGFja2FnZVRhYmxlLnJlbW92ZShlbGVtZW50SUQpXG4gICAgICAgICAgICAgICAgICAgIC8vXG4gICAgICAgICAgICAgICAgICAgIHdlYml4LmNvbmZpcm0oe1xuICAgICAgICAgICAgICAgICAgICAgICAgdGl0bGU6IFwiRGVsZXRlIFBhY2thZ2VcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIG9rOiBcIlllc1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgdGV4dDogYEFyZSB5b3Ugc3VyZSB5b3Ugd2FudCB0byBkZWxldGUgJHthdXRob3J9LiR7bmFtZX0/YCxcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhbmNlbDogXCJOb1wiLFxuICAgICAgICAgICAgICAgICAgICB9KS50aGVuKCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuZGVsZXRlUGFja2FnZShwYWNrYWdlTmFtZSwgZWxlbWVudElEKVxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgLy9cbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGFjdGlvbiA9PSAnc3RhcnQnKSB7XG4gICAgICAgICAgICAgICAgICAgIHNlbGYuc3RhcnRQYWNrYWdlKHBhY2thZ2VOYW1lKVxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoYWN0aW9uID09ICdzdG9wJykge1xuICAgICAgICAgICAgICAgICAgICBzZWxmLnN0b3BQYWNrYWdlKHBhY2thZ2VOYW1lKVxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoYWN0aW9uID09ICdkaXNhYmxlJykge1xuICAgICAgICAgICAgICAgICAgICBzZWxmLmRpc2FibGVQYWNrYWdlKHBhY2thZ2VOYW1lKVxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoYWN0aW9uID09ICdlbmFibGUnKSB7XG4gICAgICAgICAgICAgICAgICAgIHNlbGYuZW5hYmxlUGFja2FnZShwYWNrYWdlTmFtZSlcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHdlYml4Lm1lc3NhZ2UoXCJ5b3UgaGF2ZSB0byBzZWxlY3QgYSBwYWNrYWdlXCIpXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICAkJChcImFkZF9wYWNrYWdlX2J1dHRvblwiKS5hdHRhY2hFdmVudChcIm9uSXRlbUNsaWNrXCIsIGZ1bmN0aW9uIChpZCkge1xuICAgICAgICAgICAgbGV0IHBhY2FrZ2VMb2NhdGlvbiA9ICQkKFwicGFja2FnZV9wYXRoXCIpLmdldFZhbHVlKClcbiAgICAgICAgICAgIGlmIChwYWNha2dlTG9jYXRpb24gPT0gXCJcIikge1xuICAgICAgICAgICAgICAgIGFsZXJ0KFwicGxlYXNlIGVudGVyIHBhY2thZ2UgbG9jYXRpb25cIilcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgbGV0IHBhY2thZ2VNZXRob2QgPSAkJChcIm1ldGhvZF9zZWxlY3RvclwiKS5nZXRWYWx1ZSgpXG4gICAgICAgICAgICAgICAgbGV0IGdpdFVybCA9IG51bGw7XG4gICAgICAgICAgICAgICAgbGV0IHBhdGggPSBudWxsO1xuICAgICAgICAgICAgICAgIGlmIChwYWNrYWdlTWV0aG9kID09IFwiR2l0dXJsXCIpIHtcbiAgICAgICAgICAgICAgICAgICAgZ2l0VXJsID0gcGFjYWtnZUxvY2F0aW9uXG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChwYWNrYWdlTWV0aG9kID09IFwiUGF0aFwiKSB7XG4gICAgICAgICAgICAgICAgICAgIHBhdGggPSBwYWNha2dlTG9jYXRpb25cbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBhbGVydChcInNvbWV0aGluZyB3ZW50IHdyb25nIGR1cmluZyBzZWxlY3RpbmcgdGhlIHBhY2thZ2UgbWV0aG9kXCIpXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHNlbGYuYWRkUGFja2FnZShwYXRoLCBnaXRVcmwpXG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgICQkKFwicGFja2FnZXNfY21cIikuYXR0YWNoRXZlbnQoXCJvbk1lbnVJdGVtQ2xpY2tcIiwgZnVuY3Rpb24gKGlkKSB7XG4gICAgICAgICAgICBjaGVja0FjdGlvbihpZCwgc2VsZi5wYWNrYWdlVGFibGUuZ2V0U2VsZWN0ZWRJZCgpKTtcbiAgICAgICAgfSk7XG5cblxuICAgICAgICB3ZWJpeC5ldmVudChzZWxmLnBhY2thZ2VUYWJsZS4kdmlldywgXCJjb250ZXh0bWVudVwiLCBmdW5jdGlvbiAoZSAvKk1vdXNlRXZlbnQqLykge1xuICAgICAgICAgICAgdmFyIHBvcyA9IHNlbGYucGFja2FnZVRhYmxlLmxvY2F0ZShlKTtcbiAgICAgICAgICAgIHZhciBtZW51ZGF0YSA9IFtdO1xuICAgICAgICAgICAgaWYgKHBvcykge1xuICAgICAgICAgICAgICAgIHZhciBpdGVtID0gc2VsZi5wYWNrYWdlVGFibGUuZ2V0SXRlbShwb3Mucm93KTtcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IFBBQ0tBR0VfU1RBVEVTLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChQQUNLQUdFX1NUQVRFU1tpXS5uYW1lID09IGl0ZW0uc3RhdHVzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBtZW51ZGF0YSA9IGFkZEFjdGlvbnMobWVudWRhdGEsIGkpXG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIG1lbnUuY2xlYXJBbGwoKTtcbiAgICAgICAgICAgIG1lbnUucGFyc2UobWVudWRhdGEpO1xuICAgICAgICAgICAgbWVudS5zaG93KGUpO1xuICAgICAgICAgICAgcmV0dXJuIHdlYml4Lmh0bWwucHJldmVudEV2ZW50KGUpO1xuICAgICAgICB9KVxuXG4gICAgICAgIC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG5cblxuICAgICAgICAvLyBIZWxwZXIgZnVuY3Rpb25zXG5cbiAgICAgICAgLy8gTWFwcGluZyB0aGUgZGF0YSB0byB0aGUgcmlnaHQgZm9ybWF0IHRvIGJlIGFibGUgdG8gZGlwbGF5IHRoZSBhY3R1YWwgc3RhdHVzXG4gICAgICAgIGZ1bmN0aW9uIG1hcERhdGEoYWxsSXRlbXMpIHtcbiAgICAgICAgICAgIHJldHVybiBhbGxJdGVtcy5tYXAoaXRlbSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3Qgc3RhdHVzID0gUEFDS0FHRV9TVEFURVNbaXRlbS5zdGF0dXNdO1xuICAgICAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgICAgIFwibmFtZVwiOiBpdGVtLnNvdXJjZS5uYW1lLFxuICAgICAgICAgICAgICAgICAgICBcImF1dGhvclwiOiBpdGVtLnNvdXJjZS50aHJlZWJvdCxcbiAgICAgICAgICAgICAgICAgICAgXCJwYXRoXCI6IGl0ZW0ucGF0aCxcbiAgICAgICAgICAgICAgICAgICAgXCJzdGF0dXNcIjogc3RhdHVzICYmIHN0YXR1cy5uYW1lIHx8IFVOS05PV05fU1RBVFVTXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICBmdW5jdGlvbiBhZGRBY3Rpb25zKG1lbnVkYXRhLCBwa2dJbmRleCkge1xuICAgICAgICAgICAgZm9yICh2YXIgaiA9IDA7IGogPCBQQUNLQUdFX1NUQVRFU1twa2dJbmRleF0uYWN0aW9ucy5sZW5ndGg7IGorKylcbiAgICAgICAgICAgICAgICBtZW51ZGF0YS5wdXNoKFBBQ0tBR0VfU1RBVEVTW3BrZ0luZGV4XS5hY3Rpb25zW2pdKTtcbiAgICAgICAgICAgIHJldHVybiBtZW51ZGF0YVxuXG4gICAgICAgIH1cblxuICAgICAgICBwYWNrYWdlcy5saXN0KCkudGhlbihkYXRhID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGFsbFBhY2thZ2VzID0gZGF0YS5qc29uKCkucGFja2FnZXM7XG4gICAgICAgICAgICBzZWxmLnBhY2thZ2VUYWJsZS5wYXJzZShtYXBEYXRhKGFsbFBhY2thZ2VzKSk7XG4gICAgICAgIH0pO1xuXG5cbiAgICB9XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zb3VyY2VzL3ZpZXdzL3BhY2thZ2VzL2luZGV4LmpzIiwiaW1wb3J0IHsgSmV0VmlldyB9IGZyb20gXCJ3ZWJpeC1qZXRcIjtcblxuaW1wb3J0IEFkbWluc1ZpZXcgZnJvbSBcIi4vYWRtaW5zXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFNldHRpbmdzVmlldyBleHRlbmRzIEpldFZpZXcge1xuICAgIGNvbmZpZygpIHtcbiAgICAgICAgY29uc3QgdmlldyA9IHtcbiAgICAgICAgICAgIHZpZXc6IFwidGFidmlld1wiLFxuICAgICAgICAgICAgY2VsbHM6IFt7XG4gICAgICAgICAgICAgICAgaGVhZGVyOiBcIkFkbWluaXN0cmF0b3JzXCIsXG4gICAgICAgICAgICAgICAgYm9keTogQWRtaW5zVmlld1xuICAgICAgICAgICAgfV1cbiAgICAgICAgfTtcblxuICAgICAgICByZXR1cm4gdmlldztcbiAgICB9XG5cbiAgICBpbml0KHZpZXcpIHtcbiAgICB9XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zb3VyY2VzL3ZpZXdzL3NldHRpbmdzL2luZGV4LmpzIiwiaW1wb3J0IHsgRXh0ZXJuYWxWaWV3IH0gZnJvbSBcIi4uL2V4dGVybmFsXCI7XG5cbmNvbnN0IFdJS0lTX1VSTCA9IFwiL3dpa2lcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgV2lraXNWaWV3IGV4dGVuZHMgRXh0ZXJuYWxWaWV3IHtcbiAgICBjb25zdHJ1Y3RvcihhcHAsIG5hbWUpIHtcbiAgICAgICAgc3VwZXIoYXBwLCBuYW1lLCBXSUtJU19VUkwpO1xuICAgIH1cbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NvdXJjZXMvdmlld3Mvd2lraXMvaW5kZXguanMiLCJpbXBvcnQgQW5zaVVwIGZyb20gXCJhbnNpX3VwXCI7XG5cbmV4cG9ydCBjb25zdCBhbnNpVXAgPSBuZXcgQW5zaVVwKCk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zb3VyY2VzL2NvbW1vbi9jb2xvcnMuanMiLCJpbXBvcnQgeyBKZXRWaWV3IH0gZnJvbSBcIndlYml4LWpldFwiO1xuXG5pbXBvcnQgeyBhbnNpVXAgfSBmcm9tIFwiLi4vLi4vY29tbW9uL2NvbG9yc1wiO1xuaW1wb3J0IHsgTEVWRUxTLCBTVEFURVMsIFRZUEVTIH0gZnJvbSBcIi4vZGF0YVwiO1xuaW1wb3J0IHsgZGF0ZUZvcm1hdHRlciB9IGZyb20gXCIuLi8uLi9jb21tb24vZm9ybWF0dGVyc1wiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBBbGVydFZpZXcgZXh0ZW5kcyBKZXRWaWV3IHtcbiAgICBjb25maWcoKSB7XG4gICAgICAgIGNvbnN0IGluZm8gPSB7XG4gICAgICAgICAgICB2aWV3OiBcImZvcm1cIixcbiAgICAgICAgICAgIGlkOiBcImZvcm1cIixcbiAgICAgICAgICAgIGVsZW1lbnRzQ29uZmlnOiB7IGxhYmVsV2lkdGg6IDE0MCB9LFxuICAgICAgICAgICAgZWxlbWVudHM6IFtcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIHZpZXc6IFwidGV4dFwiLFxuICAgICAgICAgICAgICAgICAgICBsYWJlbDogXCJJRFwiLFxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImlkZW50aWZpZXJcIixcbiAgICAgICAgICAgICAgICAgICAgcmVhZG9ubHk6IHRydWVcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgdmlldzogXCJ0ZXh0XCIsXG4gICAgICAgICAgICAgICAgICAgIGxhYmVsOiBcIlR5cGVcIixcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJhbGVydF90eXBlXCIsXG4gICAgICAgICAgICAgICAgICAgIHJlYWRvbmx5OiB0cnVlXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIHZpZXc6IFwidGV4dFwiLFxuICAgICAgICAgICAgICAgICAgICBsYWJlbDogXCJTdGF0dXNcIixcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJzdGF0dXNcIixcbiAgICAgICAgICAgICAgICAgICAgcmVhZG9ubHk6IHRydWVcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgdmlldzogXCJ0ZXh0XCIsXG4gICAgICAgICAgICAgICAgICAgIGxhYmVsOiBcIkxldmVsXCIsXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwibGV2ZWxcIixcbiAgICAgICAgICAgICAgICAgICAgcmVhZG9ubHk6IHRydWVcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgdmlldzogXCJ0ZXh0XCIsXG4gICAgICAgICAgICAgICAgICAgIGxhYmVsOiBcIkNvdW50XCIsXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiY291bnRcIixcbiAgICAgICAgICAgICAgICAgICAgcmVhZG9ubHk6IHRydWVcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgdmlldzogXCJ0ZXh0XCIsXG4gICAgICAgICAgICAgICAgICAgIGxhYmVsOiBcIkNhdGVnb3J5XCIsXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiY2F0XCIsXG4gICAgICAgICAgICAgICAgICAgIHJlYWRvbmx5OiB0cnVlXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIHZpZXc6IFwidGV4dFwiLFxuICAgICAgICAgICAgICAgICAgICBsYWJlbDogXCJGaXJzdCB0aW1lXCIsXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwidGltZV9maXJzdFwiLFxuICAgICAgICAgICAgICAgICAgICByZWFkb25seTogdHJ1ZVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICB2aWV3OiBcInRleHRcIixcbiAgICAgICAgICAgICAgICAgICAgbGFiZWw6IFwiTGFzdCB0aW1lXCIsXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwidGltZV9sYXN0XCIsXG4gICAgICAgICAgICAgICAgICAgIHJlYWRvbmx5OiB0cnVlXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIHZpZXc6IFwidGV4dFwiLFxuICAgICAgICAgICAgICAgICAgICBsYWJlbDogXCJNZXNzYWdlIChwdWIpXCIsXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwicHVibGljXCIsXG4gICAgICAgICAgICAgICAgICAgIHJlYWRvbmx5OiB0cnVlLFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBdXG4gICAgICAgIH07XG5cbiAgICAgICAgY29uc3QgdGFiID0ge1xuICAgICAgICAgICAgdmlldzogXCJ0YWJ2aWV3XCIsXG4gICAgICAgICAgICBjZWxsczogW1xuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgaGVhZGVyOiBcIkluZm9ybWF0aW9uXCIsXG4gICAgICAgICAgICAgICAgICAgIGJvZHk6IGluZm8sXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIGhlYWRlcjogXCJNZXNzYWdlXCIsXG4gICAgICAgICAgICAgICAgICAgIGJvZHk6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlkOiBcIm1lc3NhZ2VcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIHZpZXc6IFwidGVtcGxhdGVcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIHRlbXBsYXRlOiBcIlwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgc2Nyb2xsOiBcImF1dG9cIixcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBoZWFkZXI6IFwiVHJhY2ViYWNrc1wiLFxuICAgICAgICAgICAgICAgICAgICBib2R5OiB7XG4gICAgICAgICAgICAgICAgICAgICAgICByb3dzOiBbXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2aWV3OiBcInRhYmJhclwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZDogXCJ0Yl90YWJzXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG11bHRpdmlldzogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb3B0aW9uczogW11cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmlldzogXCJtdWx0aXZpZXdcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWQ6IFwidGJfdmlld3NcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2VsbHM6IFtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0ZW1wbGF0ZTogXCJcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIGlkOiBcImxvZ3NcIixcbiAgICAgICAgICAgICAgICAgICAgdmlldzogXCJkYXRhdGFibGVcIixcbiAgICAgICAgICAgICAgICAgICAgcmVzaXplQ29sdW1uOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICBzZWxlY3Q6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgIG11bHRpc2VsZWN0OiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICBjc3M6IFwid2ViaXhfaGVhZGVyX2JvcmRlciB3ZWJpeF9kYXRhX2JvcmRlclwiLFxuICAgICAgICAgICAgICAgICAgICBzY3JvbGw6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgIGF1dG9Db25maWc6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgIGNvbHVtbnM6IFtcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZDogXCJpbmRleFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhlYWRlcjogXCIjXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc29ydDogXCJpbnRcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhdXRvd2lkdGg6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDYwXG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlkOiBcInRocmVlYm90X25hbWVcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBoZWFkZXI6IFwiVGhyZWVib3QgTmFtZVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNvcnQ6IFwic3RyaW5nXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDE4MFxuICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZDogXCJhcHBfbmFtZVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhlYWRlcjogXCJBcHAgTmFtZVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNvcnQ6IFwic3RyaW5nXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDE4MFxuICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZDogXCJsYXRlc3RfbG9naWRcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBoZWFkZXI6IFwiTGF0ZXN0IExvZyNcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzb3J0OiBcImludFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdpZHRoOiAxODBcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICAgICAgc2NoZW1lOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAkaW5pdDogZnVuY3Rpb24gKG9iaikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9iai5pbmRleCA9IHRoaXMuY291bnQoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICBdXG4gICAgICAgIH07XG5cbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHZpZXc6IFwid2luZG93XCIsXG4gICAgICAgICAgICBoZWFkOiBcIkFsZXJ0XCIsXG4gICAgICAgICAgICBtb2RhbDogdHJ1ZSxcbiAgICAgICAgICAgIHdpZHRoOiA2MDAsXG4gICAgICAgICAgICBoZWlnaHQ6IDgwMCxcbiAgICAgICAgICAgIHBvc2l0aW9uOiBcImNlbnRlclwiLFxuICAgICAgICAgICAgYm9keToge1xuICAgICAgICAgICAgICAgIHJvd3M6IFtcbiAgICAgICAgICAgICAgICAgICAgdGFiLFxuICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICB2aWV3OiBcImJ1dHRvblwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU6IFwiT0tcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIGNzczogXCJ3ZWJpeF9wcmltYXJ5XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBjbGljazogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZ2V0VG9wUGFyZW50VmlldygpLmhpZGUoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuXG4gICAgaW5pdCgpIHtcbiAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgICAgICB0aGlzLmZvcm0gPSAkJChcImZvcm1cIik7XG4gICAgICAgIHRoaXMubWVzc2FnZSA9ICQkKFwibWVzc2FnZVwiKTtcbiAgICAgICAgdGhpcy5sb2dzID0gJCQoXCJsb2dzXCIpO1xuXG4gICAgICAgIHRoaXMudGJWaWV3cyA9ICQkKFwidGJfdmlld3NcIik7XG4gICAgICAgIHRoaXMudGJUYWJzID0gJCQoXCJ0Yl90YWJzXCIpO1xuXG4gICAgICAgIHRoaXMubG9ncy5hdHRhY2hFdmVudChcIm9uSXRlbURibENsaWNrXCIsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIGxldCBsb2dEYXRhID0gc2VsZi5sb2dzLmdldFNlbGVjdGVkSXRlbSgpXG4gICAgICAgICAgICB0aGlzLiRzY29wZS5zaG93KGAvbWFpbi9sb2dzP2FwcG5hbWU9JHtsb2dEYXRhLmFwcF9uYW1lfSZsb2dpZD0ke2xvZ0RhdGEubGF0ZXN0X2xvZ2lkfWApXG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGFkZFRyYWNlYmFjayh0Yikge1xuICAgICAgICBjb25zdCB0YklkID0gYCR7dGIudGhyZWVib3RfbmFtZX1fJHt0Yi5wcm9jZXNzX2lkfWA7XG4gICAgICAgIGNvbnN0IHRiVGl0bGUgPSBgJHt0Yi50aHJlZWJvdF9uYW1lfSAtIFBJRDogKCR7dGIucHJvY2Vzc19pZH0pYDtcblxuICAgICAgICB0aGlzLnRiVmlld3MuYWRkVmlldyh7XG4gICAgICAgICAgICB2aWV3OiBcInRlbXBsYXRlXCIsXG4gICAgICAgICAgICBpZDogdGJJZCxcbiAgICAgICAgICAgIHNjcm9sbDogXCJ4eVwiLFxuICAgICAgICAgICAgdGVtcGxhdGU6IGA8cD4ke2Fuc2lVcC5hbnNpX3RvX2h0bWwodGIuZm9ybWF0dGVkKX08L3A+YFxuICAgICAgICB9KTtcblxuICAgICAgICB0aGlzLnRiVGFicy5hZGRPcHRpb24odGJJZCwgdGJUaXRsZSwgdHJ1ZSk7XG4gICAgfVxuXG4gICAgY2xlYXJUcmFjZUJhY2tzKCkge1xuICAgICAgICBsZXQgaWQgPSB0aGlzLnRiVGFicy5nZXRWYWx1ZSgpO1xuXG4gICAgICAgIHdoaWxlIChpZCkge1xuICAgICAgICAgICAgdGhpcy50YlRhYnMucmVtb3ZlT3B0aW9uKGlkKTtcbiAgICAgICAgICAgIHRoaXMudGJWaWV3cy5yZW1vdmVWaWV3KGlkKTtcblxuICAgICAgICAgICAgaWQgPSB0aGlzLnRiVGFicy5nZXRWYWx1ZSgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgc2hvd0ZvcihpdGVtKSB7XG4gICAgICAgIGxldCB2YWx1ZXMgPSBPYmplY3QuYXNzaWduKHt9LCBpdGVtKTtcblxuICAgICAgICB2YWx1ZXMuYWxlcnRfdHlwZSA9IFRZUEVTW2l0ZW0uYWxlcnRfdHlwZV07XG4gICAgICAgIHZhbHVlcy5zdGF0dXMgPSBTVEFURVNbaXRlbS5zdGF0dXNdO1xuICAgICAgICB2YWx1ZXMubGV2ZWwgPSBMRVZFTFNbaXRlbS5sZXZlbF07XG4gICAgICAgIHZhbHVlcy50aW1lX2ZpcnN0ID0gZGF0ZUZvcm1hdHRlcihpdGVtLnRpbWVfZmlyc3QpO1xuICAgICAgICB2YWx1ZXMudGltZV9sYXN0ID0gZGF0ZUZvcm1hdHRlcihpdGVtLnRpbWVfbGFzdCk7XG4gICAgICAgIHRoaXMuZm9ybS5zZXRWYWx1ZXModmFsdWVzKTtcblxuICAgICAgICB0aGlzLm1lc3NhZ2Uuc2V0SFRNTChgPHA+JHthbnNpVXAuYW5zaV90b19odG1sKGl0ZW0ubWVzc2FnZSl9PC9wPmApO1xuXG4gICAgICAgIHRoaXMuY2xlYXJUcmFjZUJhY2tzKCk7XG5cbiAgICAgICAgZm9yIChsZXQgdGIgb2YgaXRlbS50cmFjZWJhY2tzKSB7XG4gICAgICAgICAgICB0aGlzLmFkZFRyYWNlYmFjayh0Yik7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmxvZ3MuY2xlYXJBbGwoKVxuICAgICAgICB0aGlzLmxvZ3MucGFyc2UoaXRlbS5sb2dzKTtcblxuICAgICAgICB0aGlzLmdldFJvb3QoKS5zaG93KCk7XG4gICAgfVxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc291cmNlcy92aWV3cy9hbGVydHMvYWxlcnQuanMiLCJpbXBvcnQgeyBTZXJ2aWNlIH0gZnJvbSBcIi4uL2NvbW1vbi9hcGlcIjtcblxuY29uc3QgQkFTRV9VUkwgPSBcIi90ZmdyaWQvdGFpZ2EvYWN0b3JzL3RhaWdhXCI7XG5cblxuY2xhc3MgVGFpZ2FTZXJ2aWNlIGV4dGVuZHMgU2VydmljZSB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHN1cGVyKEJBU0VfVVJMKTtcbiAgICB9XG5cbiAgICB1c2VyQ2lyY2xlcyh1c2VybmFtZSkge1xuICAgICAgICByZXR1cm4gdGhpcy5wb3N0Q2FsbChcImdldF91c2VyX2NpcmNsZXNcIiwgeyB1c2VybmFtZTogdXNlcm5hbWUsIG91dHB1dF90eXBlOiBcImpzb25cIiB9KTtcbiAgICB9XG5cbiAgICB1c2VyU3Rvcmllcyh1c2VybmFtZSkge1xuICAgICAgICByZXR1cm4gdGhpcy5wb3N0Q2FsbChcImdldF91c2VyX3N0b3JpZXNcIiwgeyB1c2VybmFtZTogdXNlcm5hbWUsIG91dHB1dF90eXBlOiBcImpzb25cIiB9KTtcbiAgICB9XG5cbiAgICB1c2VyVGFza3ModXNlcm5hbWUpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucG9zdENhbGwoXCJnZXRfdXNlcl90YXNrc1wiLCB7IHVzZXJuYW1lOiB1c2VybmFtZSwgb3V0cHV0X3R5cGU6IFwianNvblwiIH0pO1xuICAgIH1cblxufVxuXG5cbmV4cG9ydCBjb25zdCB0YWlnYSA9IG5ldyBUYWlnYVNlcnZpY2UoKTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NvdXJjZXMvc2VydmljZXMvdGFpZ2EuanMiLCJpbXBvcnQgeyBKZXRWaWV3IH0gZnJvbSBcIndlYml4LWpldFwiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBQcm9jZXNzZXNDaGlsZFZpZXcgZXh0ZW5kcyBKZXRWaWV3IHtcblxuICAgIGNvbmZpZygpIHtcbiAgICAgICAgY29uc3QgdmlldyA9IHtcbiAgICAgICAgICAgIHZpZXc6IFwiZGF0YXRhYmxlXCIsXG4gICAgICAgICAgICBpZDogXCJwcm9jZXNzX3RhYmxlXCIsXG4gICAgICAgICAgICByZXNpemVDb2x1bW46IHRydWUsXG4gICAgICAgICAgICBzZWxlY3Q6IHRydWUsXG4gICAgICAgICAgICBtdWx0aXNlbGVjdDogdHJ1ZSxcbiAgICAgICAgICAgIGNzczogXCJ3ZWJpeF9oZWFkZXJfYm9yZGVyIHdlYml4X2RhdGFfYm9yZGVyXCIsXG4gICAgICAgICAgICBzY3JvbGw6IHRydWUsXG4gICAgICAgICAgICBhdXRvQ29uZmlnOiB0cnVlLFxuICAgICAgICAgICAgY29sdW1uczogW1xuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgaWQ6IFwiaW5kZXhcIixcbiAgICAgICAgICAgICAgICAgICAgaGVhZGVyOiBcIiNcIixcbiAgICAgICAgICAgICAgICAgICAgc29ydDogXCJpbnRcIixcbiAgICAgICAgICAgICAgICAgICAgYXV0b3dpZHRoOiB0cnVlLFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBpZDogXCJuYW1lXCIsXG4gICAgICAgICAgICAgICAgICAgIGhlYWRlcjogW1xuICAgICAgICAgICAgICAgICAgICAgICAgXCJQcm9jY2Vzc1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRlbnQ6IFwidGV4dEZpbHRlclwiXG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgICAgICBzb3J0OiBcInN0cmluZ1wiLFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBpZDogXCJwaWRcIixcbiAgICAgICAgICAgICAgICAgICAgaGVhZGVyOiBcIlBJRFwiLFxuICAgICAgICAgICAgICAgICAgICBzb3J0OiBcImludFwiXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIGlkOiBcInVzZXJuYW1lXCIsXG4gICAgICAgICAgICAgICAgICAgIGhlYWRlcjogXCJVc2VybmFtZVwiLFxuICAgICAgICAgICAgICAgICAgICBzb3J0OiBcInN0cmluZ1wiXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIGlkOiBcInZtc1wiLFxuICAgICAgICAgICAgICAgICAgICBoZWFkZXI6IFwiTWVtb3J5IFVzYWdlXCIsXG4gICAgICAgICAgICAgICAgICAgIHNvcnQ6IFwiaW50XCIsXG4gICAgICAgICAgICAgICAgICAgIGZvcm1hdDogZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gTWF0aC5jZWlsKHZhbHVlKVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIF0sXG4gICAgICAgICAgICBzY2hlbWU6IHtcbiAgICAgICAgICAgICAgICAkaW5pdDogZnVuY3Rpb24gKG9iaikge1xuICAgICAgICAgICAgICAgICAgICBvYmouaW5kZXggPSB0aGlzLmNvdW50KCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICB2aWV3OiBcIndpbmRvd1wiLFxuICAgICAgICAgICAgaGVhZDogXCJSdW5uaW5nIFByb2Nlc3NlcywgTWVtb3J5IHVzYWdlIGluIE1CXCIsXG4gICAgICAgICAgICBtb2RhbDogdHJ1ZSxcbiAgICAgICAgICAgIHdpZHRoOiA1NTAsXG4gICAgICAgICAgICBoZWlnaHQ6IDYwMCxcbiAgICAgICAgICAgIHBvc2l0aW9uOiBcImNlbnRlclwiLFxuICAgICAgICAgICAgYm9keToge1xuICAgICAgICAgICAgICAgIHJvd3M6IFtcbiAgICAgICAgICAgICAgICAgICAgdmlldyxcbiAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmlldzogXCJidXR0b25cIixcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlOiBcIk9LXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBjc3M6IFwid2ViaXhfcHJpbWFyeVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgY2xpY2s6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmdldFRvcFBhcmVudFZpZXcoKS5oaWRlKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfVxuICAgIH1cblxuICAgIHNob3dGb3IoZGF0YSkge1xuICAgICAgICB0aGlzLnRhYmxlLnBhcnNlKGRhdGEpXG4gICAgICAgIHRoaXMuZ2V0Um9vdCgpLnNob3coKTtcbiAgICB9XG5cbiAgICBpbml0KCkge1xuICAgICAgICB0aGlzLnRhYmxlID0gJCQoXCJwcm9jZXNzX3RhYmxlXCIpO1xuICAgIH1cbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NvdXJjZXMvdmlld3MvZGFzaC9wcm9jZXNzZXNDaGlsZFZpZXcuanMiLCJpbXBvcnQgeyBKZXRWaWV3IH0gZnJvbSBcIndlYml4LWpldFwiO1xuXG5pbXBvcnQgeyBkYXRlRm9ybWF0dGVyIH0gZnJvbSBcIi4uLy4uL2NvbW1vbi9mb3JtYXR0ZXJzXCI7XG5pbXBvcnQgeyBMRVZFTFMgfSBmcm9tIFwiLi4vYWxlcnRzL2RhdGFcIjtcbmltcG9ydCB7IGNyZWF0ZUZpbHRlck9wdGlvbnMgfSBmcm9tIFwiLi4vLi4vY29tbW9uL2ZpbHRlcnNcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQXBwTG9nc1ZpZXcgZXh0ZW5kcyBKZXRWaWV3IHtcbiAgICBjb25maWcoKSB7XG4gICAgICAgIHZhciBwYWdlciA9IHtcbiAgICAgICAgICAgIHZpZXc6IFwicGFnZXJcIixcbiAgICAgICAgICAgIGlkOiBcInBhZ2VyXCIsXG4gICAgICAgICAgICBzaXplOiAxMDAsXG4gICAgICAgICAgICBncm91cDogMjBcbiAgICAgICAgfTtcbiAgICAgICAgY29uc3QgYXBwbG9ncyA9IHtcbiAgICAgICAgICAgIHZpZXc6IFwiZGF0YXRhYmxlXCIsXG4gICAgICAgICAgICBpZDogXCJhcHBsb2dzX3RhYmxlXCIsXG4gICAgICAgICAgICBwYWdlcjogXCJwYWdlclwiLFxuICAgICAgICAgICAgcmVzaXplQ29sdW1uOiB0cnVlLFxuICAgICAgICAgICAgc2VsZWN0OiB0cnVlLFxuICAgICAgICAgICAgbXVsdGlzZWxlY3Q6IHRydWUsXG4gICAgICAgICAgICBjc3M6IFwid2ViaXhfaGVhZGVyX2JvcmRlciB3ZWJpeF9kYXRhX2JvcmRlclwiLFxuICAgICAgICAgICAgc2Nyb2xsOiB0cnVlLFxuICAgICAgICAgICAgYXV0b0NvbmZpZzogdHJ1ZSxcbiAgICAgICAgICAgIG9uOiB7XG4gICAgICAgICAgICAgICAgb25BZnRlckxvYWQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zb3J0KFwiZXBvY2hcIiwgXCJkZXNcIik7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubWFya1NvcnRpbmcoXCJlcG9jaFwiLCBcImRlc1wiKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuXG4gICAgICAgICAgICBjb2x1bW5zOiBbe1xuICAgICAgICAgICAgICAgIGlkOiBcImlkXCIsXG4gICAgICAgICAgICAgICAgaGVhZGVyOiBbXG4gICAgICAgICAgICAgICAgICAgIFwiTG9nI1wiLFxuICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb250ZW50OiBcInRleHRGaWx0ZXJcIlxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgc29ydDogXCJpbnRcIixcbiAgICAgICAgICAgICAgICB3aWR0aDogNTAsXG4gICAgICAgICAgICAgICAgYXV0b3dpZHRoOiB0cnVlLFxuICAgICAgICAgICAgfSxcblxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGlkOiBcImZpbGVwYXRoXCIsXG4gICAgICAgICAgICAgICAgaGVhZGVyOiBbXG4gICAgICAgICAgICAgICAgICAgIFwiUGF0aFwiLFxuICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb250ZW50OiBcInRleHRGaWx0ZXJcIlxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgc29ydDogXCJzdHJpbmdcIixcbiAgICAgICAgICAgICAgICBhdXRvd2lkdGg6IHRydWUsXG4gICAgICAgICAgICAgICAgd2lkdGg6IDE0MFxuICAgICAgICAgICAgfSxcblxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGlkOiBcImxpbmVuclwiLFxuICAgICAgICAgICAgICAgIGhlYWRlcjogW1xuICAgICAgICAgICAgICAgICAgICBcIkxpbmUubnJcIixcbiAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29udGVudDogXCJ0ZXh0RmlsdGVyXCJcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgIHNvcnQ6IFwiaW50XCIsXG4gICAgICAgICAgICAgICAgYXV0b3dpZHRoOiB0cnVlLFxuICAgICAgICAgICAgICAgIHdpZHRoOiA2MFxuICAgICAgICAgICAgfSxcblxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGlkOiBcImNvbnRleHRcIixcbiAgICAgICAgICAgICAgICBoZWFkZXI6IFtcbiAgICAgICAgICAgICAgICAgICAgXCJDb250ZXh0XCIsXG4gICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRlbnQ6IFwidGV4dEZpbHRlclwiXG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICBzb3J0OiBcInN0cmluZ1wiXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGlkOiBcIm1lc3NhZ2VcIixcbiAgICAgICAgICAgICAgICBoZWFkZXI6IFtcbiAgICAgICAgICAgICAgICAgICAgXCJNZXNzYWdlXCIsXG4gICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRlbnQ6IFwidGV4dEZpbHRlclwiXG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICBzb3J0OiBcInN0cmluZ1wiLFxuICAgICAgICAgICAgICAgIHdpZHRoOiA1MDAsXG4gICAgICAgICAgICAgICAgYXV0b3dpZHRoOiB0cnVlXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGlkOiBcImxldmVsXCIsXG4gICAgICAgICAgICAgICAgaGVhZGVyOiBbXG4gICAgICAgICAgICAgICAgICAgIFwiTGV2ZWxcIixcbiAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29udGVudDogXCJzZWxlY3RGaWx0ZXJcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIG9wdGlvbnM6IGNyZWF0ZUZpbHRlck9wdGlvbnMoTEVWRUxTKVxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgc29ydDogXCJpbnRcIixcbiAgICAgICAgICAgICAgICBmb3JtYXQ6ICh2YWx1ZSkgPT4gTEVWRUxTW3ZhbHVlXSxcbiAgICAgICAgICAgICAgICB3aWR0aDogMTAwXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGlkOiBcImVwb2NoXCIsXG4gICAgICAgICAgICAgICAgaGVhZGVyOiBbXG4gICAgICAgICAgICAgICAgICAgIFwiVGltZVwiLFxuICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb250ZW50OiBcInRleHRGaWx0ZXJcIlxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgc29ydDogXCJkYXRlXCIsXG4gICAgICAgICAgICAgICAgZm9ybWF0OiBkYXRlRm9ybWF0dGVyLFxuICAgICAgICAgICAgICAgIHdpZHRoOiAxMzBcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgaWQ6IFwicHJvY2Vzc2lkXCIsXG4gICAgICAgICAgICAgICAgaGVhZGVyOiBbXG4gICAgICAgICAgICAgICAgICAgIFwiUElEXCIsXG4gICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRlbnQ6IFwidGV4dEZpbHRlclwiXG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICBzb3J0OiBcImludFwiLFxuICAgICAgICAgICAgICAgIHdpZHRoOiA2MFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBpZDogXCJjYXRcIixcbiAgICAgICAgICAgICAgICBoZWFkZXI6IFtcbiAgICAgICAgICAgICAgICAgICAgXCJDYXRlZ29yeVwiLFxuICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb250ZW50OiBcInRleHRGaWx0ZXJcIlxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgc29ydDogXCJzdHJpbmdcIixcbiAgICAgICAgICAgICAgICB3aWR0aDogODBcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgaWQ6IFwiZGF0YVwiLFxuICAgICAgICAgICAgICAgIGhlYWRlcjogW1xuICAgICAgICAgICAgICAgICAgICBcIkRhdGFcIixcbiAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29udGVudDogXCJ0ZXh0RmlsdGVyXCJcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgIHNvcnQ6IFwic3RyaW5nXCJcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgXSxcblxuICAgICAgICB9XG5cblxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgcm93czogW1xuICAgICAgICAgICAgICAgIGFwcGxvZ3MsXG4gICAgICAgICAgICAgICAgcGFnZXJcbiAgICAgICAgICAgIF1cbiAgICAgICAgfVxuICAgIH1cblxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc291cmNlcy92aWV3cy9sb2dzL2FwcExvZ3MuanMiLCJpbXBvcnQgeyBKZXRWaWV3IH0gZnJvbSBcIndlYml4LWpldFwiO1xuXG5pbXBvcnQgeyBpbnB1dERpYWxvZyB9IGZyb20gXCIuLi8uLi9jb21tb24vZGlhbG9nc1wiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBBZG1pbnNWaWV3IGV4dGVuZHMgSmV0VmlldyB7XG4gICAgY29uZmlnKCkge1xuICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XG5cbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGNvbHM6IFt7XG4gICAgICAgICAgICAgICAgcm93czogW3tcbiAgICAgICAgICAgICAgICAgICAgdmlldzogXCJ0ZW1wbGF0ZVwiLFxuICAgICAgICAgICAgICAgICAgICB0ZW1wbGF0ZTogXCJBbGwgb2YgdGhlIGZvbGxvd2luZyAzQm90IG5hbWVzIGNhbiBhY2Nlc3MgZGFzaGJvYXJkLCB5b3UgY2FuIGFkZCBvciByZW1vdmUgdGhlbSBmcm9tIGhlcmVcIixcbiAgICAgICAgICAgICAgICAgICAgYXV0b2hlaWdodDogdHJ1ZSxcbiAgICAgICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgICAgIGxvY2FsSWQ6IFwiYWRkLWFkbWluXCIsXG4gICAgICAgICAgICAgICAgICAgIHZpZXc6IFwiYnV0dG9uXCIsXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlOiBcIkFkZCBuZXcgYWRtaW5pc3RyYXRvclwiLFxuICAgICAgICAgICAgICAgICAgICBjbGljazogc2VsZi5hZGRBZG1pbi5iaW5kKHNlbGYpLFxuICAgICAgICAgICAgICAgIH1dXG4gICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgbG9jYWxJZDogXCJhZG1pbnMtdGFibGVcIixcbiAgICAgICAgICAgICAgICB2aWV3OiBcImRhdGF0YWJsZVwiLFxuICAgICAgICAgICAgICAgIGF1dG9oZWlnaHQ6IHRydWUsXG4gICAgICAgICAgICAgICAgY29sdW1uczogW3tcbiAgICAgICAgICAgICAgICAgICAgaWQ6IFwibmFtZVwiLFxuICAgICAgICAgICAgICAgICAgICBoZWFkZXI6IFtcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiTmFtZVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRlbnQ6IFwidGV4dEZpbHRlclwiXG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgICAgIHNvcnQ6IFwic3RyaW5nXCIsXG4gICAgICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgICAgICB0ZW1wbGF0ZTogZnVuY3Rpb24gKG9iaikge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFwiPHNwYW4gY2xhc3M9J3dlYml4X2ljb24gbWRpIG1kaS10cmFzaC1jYW4gd2ViaXhfZGFuZ2VyIGRlbGV0ZV9hZG1pbic+PC9zcGFuPlwiO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfV0sXG4gICAgICAgICAgICAgICAgb25DbGljazoge1xuICAgICAgICAgICAgICAgICAgICBkZWxldGVfYWRtaW46IGZ1bmN0aW9uIChlLCBpZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy4kc2NvcGUuZGVsZXRlQWRtaW4oaWQpO1xuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1dXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBoYW5kbGVSZXN1bHQoKSB7XG5cbiAgICB9XG5cbiAgICBhZGRBZG1pbigpIHtcbiAgICAgICAgY29uc3Qgc2VsZiA9IHRoaXM7XG5cbiAgICAgICAgaW5wdXREaWFsb2coXCJBZGQgYWRtaW5cIiwgXCIzQm90IG5hbWVcIiwgXCJBZGRcIiwgKGlucHV0KSA9PiB7XG4gICAgICAgICAgICAvLyBUT0RPOiBjYWxsIGFjdG9yLmFkZFxuICAgICAgICAgICAgLy8gVE9ETzogY2hlY2sgaWYgYWxyZWFkeSBleGlzdHMgKGNhbiBiZSBhY3RvciB0b28sIG90aGVyIHNlc3Npb24gbWF5IGhhdmUgYWRkZWQgb3IgcmVtb3ZlZCBpdClcbiAgICAgICAgICAgIHNlbGYudGFibGUuYWRkKHsgbmFtZTogaW5wdXQgfSk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGRlbGV0ZUFkbWluKGl0ZW1JZCkge1xuICAgICAgICBjb25zdCBzZWxmID0gdGhpcztcblxuICAgICAgICBjb25zdCBpdGVtID0gc2VsZi50YWJsZS5nZXRJdGVtKGl0ZW1JZCk7XG5cbiAgICAgICAgd2ViaXguY29uZmlybSh7XG4gICAgICAgICAgICB0aXRsZTogXCJEZWxldGUgYWRtaW5cIixcbiAgICAgICAgICAgIG9rOiBcIlllc1wiLFxuICAgICAgICAgICAgdGV4dDogYEFyZSB5b3Ugc3VyZSB5b3Ugd2FudCB0byBkZWxldGUgXCIke2l0ZW0ubmFtZX1cIj9gLFxuICAgICAgICAgICAgY2FuY2VsOiBcIk5vXCIsXG4gICAgICAgIH0pLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgLy8gVE9ETzogY2FsbCBhY3Rvci5kZWxldGVcbiAgICAgICAgICAgIHNlbGYudGFibGUucmVtb3ZlKGl0ZW1JZCk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGluaXQoKSB7XG4gICAgICAgIHRoaXMudGFibGUgPSB0aGlzLiQkKFwiYWRtaW5zLXRhYmxlXCIpO1xuXG4gICAgICAgIHdlYml4LmV4dGVuZCh0aGlzLnRhYmxlLCB3ZWJpeC5Qcm9ncmVzc0Jhcik7XG4gICAgfVxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc291cmNlcy92aWV3cy9zZXR0aW5ncy9hZG1pbnMuanMiLCJleHBvcnQgZnVuY3Rpb24gY3JlYXRlRmlsdGVyT3B0aW9ucyhvYmopIHtcbiAgICAvLyByZXR1cm5zIGEgbmV3IG9iamVjdCBhcyB7aWQ6IHZhbHVlfSwgdXNlZCBhcyBkYXRhIHRhYmxlIGZpbHRlciBvcHRpb25zXG4gICAgLy8gb2JqOiBjYW4gYmUgYW4gYXJyYXkgb3IgYSBtYXBwaW5nIG9iamVjdFxuXG4gICAgaWYgKG9iaiBpbnN0YW5jZW9mIEFycmF5KSB7XG4gICAgICAgIHJldHVybiBvYmoubWFwKCh2YWx1ZSwgaW5kZXgpID0+IHtcbiAgICAgICAgICAgIHJldHVybiB7IGlkOiBpbmRleCwgdmFsdWU6IHZhbHVlIH1cbiAgICAgICAgfSk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgLy8gYXNzdW1lIGl0J3MganVzdCBhIG1hcHBpbmcgb3RoZXJ3aXNlXG4gICAgICAgIHJldHVybiBPYmplY3Qua2V5cyhvYmopLm1hcChrZXkgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIHsgaWQ6IGtleSwgdmFsdWU6IG9ialtrZXldIH1cbiAgICAgICAgfSk7XG4gICAgfVxuXG5cbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NvdXJjZXMvY29tbW9uL2ZpbHRlcnMuanMiLCJpbXBvcnQgeyBTZXJ2aWNlIH0gZnJvbSBcIi4uL2NvbW1vbi9hcGlcIjtcblxuY29uc3QgQkFTRV9VUkwgPSBcIi96ZXJvYm90L3BhY2thZ2VtYW5hZ2VyL2FjdG9ycy9wYWNrYWdlX21hbmFnZXJcIjtcblxuXG5jbGFzcyBQYWNrYWdlc1NlcnZpY2UgZXh0ZW5kcyBTZXJ2aWNlIHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgc3VwZXIoQkFTRV9VUkwpO1xuICAgIH1cblxuICAgIGxpc3QoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmdldENhbGwoXCJwYWNrYWdlc19saXN0XCIpO1xuICAgIH1cblxuICAgIGFkZChwYXRoLCBnaXRVcmwpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucG9zdENhbGwoXCJwYWNrYWdlX2FkZFwiLCB7XG4gICAgICAgICAgICBwYXRoOiBwYXRoLFxuICAgICAgICAgICAgZ2l0X3VybDogZ2l0VXJsXG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGRlbGV0ZShwYWNrYWdlTmFtZSkge1xuICAgICAgICByZXR1cm4gdGhpcy5wb3N0Q2FsbChcInBhY2thZ2VfZGVsZXRlXCIsIHsgbmFtZTogcGFja2FnZU5hbWUgfSk7XG5cbiAgICB9XG5cbiAgICBzdGFydChwYWNrYWdlTmFtZSkge1xuICAgICAgICByZXR1cm4gdGhpcy5wb3N0Q2FsbChcInBhY2thZ2Vfc3RhcnRcIiwgeyBuYW1lOiBwYWNrYWdlTmFtZSB9KTtcbiAgICB9XG5cbiAgICBzdG9wKHBhY2thZ2VOYW1lKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnBvc3RDYWxsKFwicGFja2FnZV9zdG9wXCIsIHsgbmFtZTogcGFja2FnZU5hbWUgfSk7XG5cbiAgICB9XG5cbiAgICBkaXNhYmxlKHBhY2thZ2VOYW1lKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnBvc3RDYWxsKFwicGFja2FnZV9kaXNhYmxlXCIsIHsgbmFtZTogcGFja2FnZU5hbWUgfSk7XG5cbiAgICB9XG5cbiAgICBlbmFibGUocGFja2FnZU5hbWUpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucG9zdENhbGwoXCJwYWNrYWdlX2VuYWJsZVwiLCB7IG5hbWU6IHBhY2thZ2VOYW1lIH0pO1xuICAgIH1cbn1cblxuXG5leHBvcnQgY29uc3QgcGFja2FnZXMgPSBuZXcgUGFja2FnZXNTZXJ2aWNlKCk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zb3VyY2VzL3NlcnZpY2VzL3BhY2thZ2VzLmpzIiwiaW1wb3J0IHsgSmV0VmlldyB9IGZyb20gXCJ3ZWJpeC1qZXRcIjtcbmltcG9ydCB7IGhlYWx0aCB9IGZyb20gXCIuLi8uLi9zZXJ2aWNlcy9oZWFsdGhcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRGlza1NwYWNlVmlldyBleHRlbmRzIEpldFZpZXcge1xuICAgIGNvbmZpZygpIHtcbiAgICAgICAgY29uc3QgZGlza1NwYWNlID0ge1xuICAgICAgICAgICAgaWQ6IFwiZGlza1NwYWNlXCIsXG4gICAgICAgICAgICByZXNwb25zaXZlOiB0cnVlLFxuICAgICAgICAgICAgdmlldzogXCJsaXN0XCIsXG4gICAgICAgICAgICB0eXBlOiB7XG4gICAgICAgICAgICAgICAgaGVpZ2h0OiA2MCxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB0ZW1wbGF0ZTogYFxuICAgICAgICAgICAgPHA+PGZvbnQgc2l6ZT1cIjNcIj48Yj4ja2V5IzogPC9iPjwvZm9udD4gPGZvbnQgc2l6ZT1cIjNcIj4jdmFsdWUjPC9mb250PjwvcD5cbiAgICAgICAgICAgIGBcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICB0eXBlOiBcInNwYWNlXCIsXG4gICAgICAgICAgICByb3dzOiBbe1xuICAgICAgICAgICAgICAgIHRlbXBsYXRlOiBcIjxkaXYgc3R5bGU9J3dpZHRoOmF1dG87dGV4dC1hbGlnbjpjZW50ZXInPjxoMz5EaXNrIFNwYWNlPGgzLz48L2Rpdj5cIixcbiAgICAgICAgICAgICAgICBoZWlnaHQ6IDUwXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIGRpc2tTcGFjZVxuICAgICAgICAgICAgXVxuICAgICAgICB9XG4gICAgfVxuXG5cbiAgICBpbml0KCkge1xuICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XG5cbiAgICAgICAgdGhpcy5kaXNrSW5mbyA9IHRoaXMuJCQoXCJkaXNrU3BhY2VcIik7XG5cbiAgICAgICAgaGVhbHRoLmdldERpc2tTcGFjZSgpLnRoZW4oZGF0YSA9PiB7XG4gICAgICAgICAgICBkYXRhID0gZGF0YS5qc29uKCk7XG5cbiAgICAgICAgICAgIHNlbGYuZGlza0luZm8uYWRkKHtcbiAgICAgICAgICAgICAgICBrZXk6IFwiVXNlZFwiLFxuICAgICAgICAgICAgICAgIHZhbHVlOiBkYXRhLnVzZWQgKyBcIiBHQlwiXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHNlbGYuZGlza0luZm8uYWRkKHtcbiAgICAgICAgICAgICAgICBrZXk6IFwiRnJlZVwiLFxuICAgICAgICAgICAgICAgIHZhbHVlOiBkYXRhLmZyZWUgKyBcIiBHQlwiXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHNlbGYuZGlza0luZm8uYWRkKHtcbiAgICAgICAgICAgICAgICBrZXk6IFwiVG90YWxcIixcbiAgICAgICAgICAgICAgICB2YWx1ZTogZGF0YS50b3RhbCArIFwiIEdCXCJcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgc2VsZi5kaXNrSW5mby5hZGQoe1xuICAgICAgICAgICAgICAgIGtleTogXCJQZXJjZW50XCIsXG4gICAgICAgICAgICAgICAgdmFsdWU6IGRhdGEucGVyY2VudCArIFwiICVcIlxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH1cblxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc291cmNlcy92aWV3cy9kYXNoL2Rpc2tTcGFjZS5qcyIsImltcG9ydCB7IEpldFZpZXcgfSBmcm9tIFwid2ViaXgtamV0XCI7XG5pbXBvcnQgeyBoZWFsdGggfSBmcm9tIFwiLi4vLi4vc2VydmljZXMvaGVhbHRoXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIGhlYWx0aEluZm9WaWV3IGV4dGVuZHMgSmV0VmlldyB7XG4gICAgY29uZmlnKCkge1xuICAgICAgICBjb25zdCBoZWFsdGhJbmZvID0ge1xuICAgICAgICAgICAgaWQ6IFwiaGVhbHRoSW5mb1wiLFxuICAgICAgICAgICAgcmVzcG9uc2l2ZTogdHJ1ZSxcbiAgICAgICAgICAgIHZpZXc6IFwibGlzdFwiLFxuICAgICAgICAgICAgcmVzcG9uc2l2ZTogdHJ1ZSxcbiAgICAgICAgICAgIHR5cGU6IHtcbiAgICAgICAgICAgICAgICBoZWlnaHQ6IDYwLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHRlbXBsYXRlOiBgXG4gICAgICAgICAgICA8cD48Zm9udCBzaXplPVwiM1wiPjxiPiNrZXkjOiA8L2I+PC9mb250PiAjdmFsdWUjPC9wPlxuICAgICAgICAgICAgYFxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHR5cGU6IFwic3BhY2VcIixcbiAgICAgICAgICAgIHJvd3M6IFt7XG4gICAgICAgICAgICAgICAgdGVtcGxhdGU6IFwiPGRpdiBzdHlsZT0nd2lkdGg6YXV0bzt0ZXh0LWFsaWduOmNlbnRlcic+PGgzPkhlYWx0aCBDaGVja3M8aDMvPjwvZGl2PlwiLFxuICAgICAgICAgICAgICAgIGhlaWdodDogNTBcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgaGVhbHRoSW5mb11cbiAgICAgICAgfVxuICAgIH1cbiAgICBpbml0KHZpZXcpIHtcbiAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xuXG4gICAgICAgIHRoaXMuaGVhbHRoSW5mbyA9IHRoaXMuJCQoXCJoZWFsdGhJbmZvXCIpO1xuXG4gICAgICAgIGhlYWx0aC5nZXRIZWFsdGgoKS50aGVuKGRhdGEgPT4ge1xuICAgICAgICAgICAgZGF0YSA9IGRhdGEuanNvbigpO1xuXG4gICAgICAgICAgICBpZiAoZGF0YS5iY2RiID09PSBcIk9LXCIpIHtcbiAgICAgICAgICAgICAgICBzZWxmLmhlYWx0aEluZm8uYWRkKHtcbiAgICAgICAgICAgICAgICAgICAga2V5OiBcIkJDREIgU3RhdHVzXCIsXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlOiBgPHNwYW4gY2xhc3M9J3dlYml4X2ljb24gd3hpLWNoZWNrYm94LW1hcmtlZCcgc3R5bGU9XCJjb2xvcjpncmVlblwiPk9LPC9zcGFuPmBcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGRhdGEuYmNkYiA9PT0gXCJFcnJvclwiKSB7XG4gICAgICAgICAgICAgICAgc2VsZi5oZWFsdGhJbmZvLmFkZCh7XG4gICAgICAgICAgICAgICAgICAgIGtleTogXCJCQ0RCXCIsXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlOiBgPHNwYW4gY2xhc3M9J3dlYml4X2ljb24gd3hpLWNsb3NlLWNpcmNsZScgc3R5bGU9XCJjb2xvcjpyZWRcIj5FcnJvcjwvc3Bhbj5gXG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChkYXRhLndpa2lzID09PSBcIk9LXCIpIHtcbiAgICAgICAgICAgICAgICBzZWxmLmhlYWx0aEluZm8uYWRkKHtcbiAgICAgICAgICAgICAgICAgICAga2V5OiBcIldpa2lzXCIsXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlOiBgPHNwYW4gY2xhc3M9J3dlYml4X2ljb24gd3hpLWNoZWNrYm94LW1hcmtlZCcgc3R5bGU9XCJjb2xvcjpncmVlblwiPk9LPC9zcGFuPmBcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGRhdGEud2lraXMgPT09IFwiRXJyb3JcIikge1xuICAgICAgICAgICAgICAgIHNlbGYuaGVhbHRoSW5mby5hZGQoe1xuICAgICAgICAgICAgICAgICAgICBrZXk6IFwiV2lraXNcIixcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU6IGA8c3BhbiBjbGFzcz0nd2ViaXhfaWNvbiB3eGktY2xvc2UtY2lyY2xlJyBzdHlsZT1cImNvbG9yOnJlZFwiPkVycm9yPC9zcGFuPmBcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGRhdGEuY29kZXNlcnZlciA9PT0gXCJPS1wiKSB7XG4gICAgICAgICAgICAgICAgc2VsZi5oZWFsdGhJbmZvLmFkZCh7XG4gICAgICAgICAgICAgICAgICAgIGtleTogXCJDb2Rlc2VydmVyXCIsXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlOiBgPHNwYW4gY2xhc3M9J3dlYml4X2ljb24gd3hpLWNoZWNrYm94LW1hcmtlZCcgc3R5bGU9XCJjb2xvcjpncmVlblwiPk9LPC9zcGFuPmBcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGRhdGEuY29kZXNlcnZlciA9PT0gXCJFcnJvclwiKSB7XG4gICAgICAgICAgICAgICAgc2VsZi5oZWFsdGhJbmZvLmFkZCh7XG4gICAgICAgICAgICAgICAgICAgIGtleTogXCJDb2Rlc2VydmVyXCIsXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlOiBgPHNwYW4gY2xhc3M9J3dlYml4X2ljb24gd3hpLWNsb3NlLWNpcmNsZScgc3R5bGU9XCJjb2xvcjpyZWRcIj5FcnJvcjwvc3Bhbj5gXG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChkYXRhLmp1cHl0ZXIgPT09IFwiT0tcIikge1xuICAgICAgICAgICAgICAgIHNlbGYuaGVhbHRoSW5mby5hZGQoe1xuICAgICAgICAgICAgICAgICAgICBrZXk6IFwiSnVweXRlclwiLFxuICAgICAgICAgICAgICAgICAgICB2YWx1ZTogYDxzcGFuIGNsYXNzPSd3ZWJpeF9pY29uIHd4aS1jaGVja2JveC1tYXJrZWQnIHN0eWxlPVwiY29sb3I6Z3JlZW5cIj5PSzwvc3Bhbj5gXG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChkYXRhLmp1cHl0ZXIgPT09IFwiRXJyb3JcIikge1xuICAgICAgICAgICAgICAgIHNlbGYuaGVhbHRoSW5mby5hZGQoe1xuICAgICAgICAgICAgICAgICAgICBrZXk6IFwiSnVweXRlclwiLFxuICAgICAgICAgICAgICAgICAgICB2YWx1ZTogYDxzcGFuIGNsYXNzPSd3ZWJpeF9pY29uIHd4aS1jbG9zZS1jaXJjbGUnIHN0eWxlPVwiY29sb3I6cmVkXCI+RXJyb3I8L3NwYW4+YFxuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgfVxuXG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zb3VyY2VzL3ZpZXdzL2Rhc2gvaGVhbHRoLmpzIiwiaW1wb3J0IHsgSmV0VmlldyB9IGZyb20gXCJ3ZWJpeC1qZXRcIjtcbmltcG9ydCB7IGhlYWx0aCB9IGZyb20gXCIuLi8uLi9zZXJ2aWNlcy9oZWFsdGhcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgSlNYSW5mb1ZpZXcgZXh0ZW5kcyBKZXRWaWV3IHtcbiAgICBjb25maWcoKSB7XG4gICAgICAgIGNvbnN0IGluZm8gPSB7XG4gICAgICAgICAgICBpZDogXCJqc3hJbmZvXCIsXG4gICAgICAgICAgICByZXNwb25zaXZlOiB0cnVlLFxuICAgICAgICAgICAgdmlldzogXCJsaXN0XCIsXG4gICAgICAgICAgICByZXNwb25zaXZlOiB0cnVlLFxuICAgICAgICAgICAgdHlwZToge1xuICAgICAgICAgICAgICAgIGhlaWdodDogNjAsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgdGVtcGxhdGU6IGBcbiAgICAgICAgICAgICAgICA8cD48Zm9udCBzaXplPVwiM1wiPjxiPiNrZXkjOiA8L2I+PC9mb250PiA8Zm9udCBzaXplPVwiM1wiPiN2YWx1ZSM8L2ZvbnQ+PC9wPlxuICAgICAgICAgICAgYFxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHR5cGU6IFwic3BhY2VcIixcbiAgICAgICAgICAgIHJvd3M6IFt7XG4gICAgICAgICAgICAgICAgdGVtcGxhdGU6IFwiPGRpdiBzdHlsZT0nd2lkdGg6YXV0bzt0ZXh0LWFsaWduOmNlbnRlcic+PGgzPkpTWCBJbmZvPGgzLz48L2Rpdj5cIixcbiAgICAgICAgICAgICAgICBoZWlnaHQ6IDUwXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIGluZm9cbiAgICAgICAgICAgIF1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIGluaXQoKSB7XG4gICAgICAgIGNvbnN0IHNlbGYgPSB0aGlzO1xuXG4gICAgICAgIHRoaXMuaW5mbyA9IHRoaXMuJCQoXCJqc3hJbmZvXCIpO1xuXG4gICAgICAgIGhlYWx0aC5nZXRJZGVudGl0eSgpLnRoZW4oZGF0YSA9PiB7XG4gICAgICAgICAgICBzZWxmLmluZm8uYWRkKHtcbiAgICAgICAgICAgICAgICBrZXk6IFwiM2JvdFwiLFxuICAgICAgICAgICAgICAgIHZhbHVlOiBkYXRhLnRleHQoKVxuICAgICAgICAgICAgfSlcbiAgICAgICAgfSlcblxuICAgICAgICBoZWFsdGguZ2V0TmV0d29ya0luZm8oKS50aGVuKGRhdGEgPT4ge1xuICAgICAgICAgICAgZGF0YSA9IGRhdGEuanNvbigpO1xuICAgICAgICAgICAgc2VsZi5pbmZvLmFkZCh7XG4gICAgICAgICAgICAgICAga2V5OiBcIklQXCIsXG4gICAgICAgICAgICAgICAgdmFsdWU6IGRhdGEuaXAsXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGlmIChkYXRhLmlwNi5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICBzZWxmLmluZm8uYWRkKHtcbiAgICAgICAgICAgICAgICAgICAga2V5OiBcIklQdjZcIixcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU6IGRhdGEuaXA2XG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgc2VsZi5pbmZvLmFkZCh7XG4gICAgICAgICAgICAgICAgICAgIGtleTogXCJJUHY2XCIsXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlOiBcIk5vdCBzZXRcIlxuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGhlYWx0aC5nZXRKc3hWZXJzaW9uKCkudGhlbihkYXRhID0+IHtcbiAgICAgICAgICAgIHNlbGYuaW5mby5hZGQoe1xuICAgICAgICAgICAgICAgIGtleTogXCJKU1ggVmVyc2lvblwiLFxuICAgICAgICAgICAgICAgIHZhbHVlOiBkYXRhLnRleHQoKVxuICAgICAgICAgICAgfSlcbiAgICAgICAgfSlcblxuICAgIH1cblxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc291cmNlcy92aWV3cy9kYXNoL2pzeEluZm8uanMiLCJpbXBvcnQgeyBKZXRWaWV3IH0gZnJvbSBcIndlYml4LWpldFwiO1xuXG5pbXBvcnQgUHJvY2Vzc2VzQ2hpbGRWaWV3IGZyb20gXCIuL3Byb2Nlc3Nlc0NoaWxkVmlld1wiO1xuaW1wb3J0IHsgaGVhbHRoIH0gZnJvbSBcIi4uLy4uL3NlcnZpY2VzL2hlYWx0aFwiO1xuXG5jb25zdCBjb2xvcnNEYXRhc2V0ID0gW1xuICAgIHtcbiAgICAgICAgY29sb3I6IFwiI2VlMzYzOVwiXG4gICAgfSxcbiAgICB7XG4gICAgICAgIGNvbG9yOiBcIiNlZTllMzZcIlxuICAgIH0sXG4gICAge1xuICAgICAgICBjb2xvcjogXCIjZWVlYTM2XCJcbiAgICB9LFxuICAgIHtcbiAgICAgICAgY29sb3I6IFwiI2E5ZWUzNlwiXG4gICAgfSxcbiAgICB7XG4gICAgICAgIGNvbG9yOiBcIiMzNmQzZWVcIlxuICAgIH0sXG4gICAge1xuICAgICAgICBjb2xvcjogXCIjMzY3ZmVlXCJcbiAgICB9LFxuICAgIHtcbiAgICAgICAgY29sb3I6IFwiIzliMzZlZVwiXG4gICAgfVxuXTtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUHJvY2Vzc2VzVmlldyBleHRlbmRzIEpldFZpZXcge1xuXG4gICAgY29uZmlnKCkge1xuICAgICAgICBjb25zdCBwcm9jZXNzZXNJbmZvID0ge1xuICAgICAgICAgICAgaWQ6IFwicHJvY2Vzc1wiLFxuICAgICAgICAgICAgdmlldzogXCJjaGFydFwiLFxuICAgICAgICAgICAgcmVzcG9uc2l2ZTogdHJ1ZSxcbiAgICAgICAgICAgIHR5cGU6IFwicGllXCIsXG4gICAgICAgICAgICB3aWR0aDogNTAwLFxuICAgICAgICAgICAgaGVpZ2h0OiA0MDAsXG4gICAgICAgICAgICBjb2xvcjogXCIjY29sb3IjXCIsXG4gICAgICAgICAgICB2YWx1ZTogXCIjdm1zI1wiLFxuICAgICAgICAgICAgbGFiZWw6IFwiPGg0PiNuYW1lIzwvaDQ+XCIsXG4gICAgICAgICAgICBwaWVJbm5lclRleHQ6IFwiPGg0PiN2bXMjPC9oND5cIixcbiAgICAgICAgICAgIGRhdGE6IFwiI2NoYXJ0c0RhdGEjXCIsXG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgdHlwZTogXCJzcGFjZVwiLFxuICAgICAgICAgICAgcm93czogW1xuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgdGVtcGxhdGU6IFwiPGRpdiBzdHlsZT0nd2lkdGg6YXV0bzt0ZXh0LWFsaWduOmNlbnRlcic+PGgzPlJ1bm5pbmcgcHJvY2Vzc2VzIG1lbW9yeSB1c2FnZSAoTUIpPGgzLz48L2Rpdj5cIixcbiAgICAgICAgICAgICAgICAgICAgaGVpZ2h0OiA1MFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgcHJvY2Vzc2VzSW5mbyxcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIHZpZXc6IFwiYnV0dG9uXCIsXG4gICAgICAgICAgICAgICAgICAgIGlkOiBcInNob3dfYWxsXCIsXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlOiBcIlNob3cgQWxsXCIsXG4gICAgICAgICAgICAgICAgICAgIGFsaWduOiBcImNlbnRlclwiLFxuICAgICAgICAgICAgICAgICAgICBjc3M6IFwid2ViaXhfcHJpbWFyeVwiLFxuICAgICAgICAgICAgICAgICAgICBpbnB1dFdpZHRoOiAxMDAsXG4gICAgICAgICAgICAgICAgICAgIGNsaWNrOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLiRzY29wZS5jaGlsZHZpZXcuc2hvd0Zvcih0aGlzLiRzY29wZS5wcm9jZXNzZXNMaXN0KVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBdXG4gICAgICAgIH1cbiAgICB9XG5cblxuICAgIGluaXQodmlldykge1xuICAgICAgICBjb25zdCBzZWxmID0gdGhpcztcblxuICAgICAgICB0aGlzLnByb2Nlc3Nlc0xpc3QgPSBbXVxuXG4gICAgICAgIHRoaXMucnVuUHJvY2Vzc0luZm8gPSB0aGlzLiQkKFwicHJvY2Vzc1wiKTtcblxuICAgICAgICBzZWxmLmNoaWxkdmlldyA9IHNlbGYudWkoUHJvY2Vzc2VzQ2hpbGRWaWV3KTtcblxuICAgICAgICBoZWFsdGguZ2V0UnVubmluZ1Byb2Nlc3NlcygpLnRoZW4oZGF0YSA9PiB7XG4gICAgICAgICAgICB2YXIgY2hhcnRzRGF0YSA9IFtdXG5cbiAgICAgICAgICAgIGRhdGEgPSBkYXRhLmpzb24oKTtcbiAgICAgICAgICAgIHNlbGYucHJvY2Vzc2VzTGlzdCA9IGRhdGEucHJvY2Vzc2VzX2xpc3RcblxuICAgICAgICAgICAgLy8gbWVtb3J5IHVzYWdlXG4gICAgICAgICAgICBzZWxmLm1lbW9yeVVzYWdlID0gZGF0YS5tZW1vcnlfdXNhZ2VcbiAgICAgICAgICAgIHNlbGYudG90YWxNZW1vcnkgPSBzZWxmLm1lbW9yeVVzYWdlLnRvdGFsX21lbVxuICAgICAgICAgICAgc2VsZi5wZXJjZW50ID0gc2VsZi5tZW1vcnlVc2FnZS51c2FnZV9wZXJjZW50XG5cblxuICAgICAgICAgICAgc2VsZi5ydW5Qcm9jZXNzSW5mby5kZWZpbmUoXCJsZWdlbmRcIiwge1xuICAgICAgICAgICAgICAgIGxheW91dDogXCJ4XCIsXG4gICAgICAgICAgICAgICAgd2lkdGg6IDExMCxcbiAgICAgICAgICAgICAgICB2YWx1ZXM6IFtcbiAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGV4dDogYDxiPlRvdGFsIG1lbW9yeTogPC9iPiR7c2VsZi50b3RhbE1lbW9yeX1HQmBcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGV4dDogYDxiPlVzYWdlOiA8L2I+JHtzZWxmLnBlcmNlbnR9JWBcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICBzZWxmLnJ1blByb2Nlc3NJbmZvLnJlZnJlc2goKVxuXG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHNlbGYucHJvY2Vzc2VzTGlzdC5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIC8vQnJlYWsgd2hlbiB0aGVyZSBpcyBubyBtb3JlIGNvbG9yc1xuICAgICAgICAgICAgICAgIGlmIChpID09IGNvbG9yc0RhdGFzZXQubGVuZ3RoKVxuICAgICAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgICAgIHZhciB0ZW1wID0ge1xuICAgICAgICAgICAgICAgICAgICBcImNvbG9yXCI6IGNvbG9yc0RhdGFzZXRbaV0uY29sb3IsXG4gICAgICAgICAgICAgICAgICAgIFwibmFtZVwiOiBzZWxmLnByb2Nlc3Nlc0xpc3RbaV0ubmFtZSxcbiAgICAgICAgICAgICAgICAgICAgXCJ2bXNcIjogTWF0aC5jZWlsKHNlbGYucHJvY2Vzc2VzTGlzdFtpXS52bXMpLFxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBjaGFydHNEYXRhLnB1c2godGVtcClcbiAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhteUFycmF5W2ldKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgc2VsZi5ydW5Qcm9jZXNzSW5mby5wYXJzZSh7XG4gICAgICAgICAgICAgICAgZGF0YTogY2hhcnRzRGF0YSxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9XG5cbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NvdXJjZXMvdmlld3MvZGFzaC9wcm9jZXNzZXMuanMiLCJpbXBvcnQgeyBKZXRWaWV3IH0gZnJvbSBcIndlYml4LWpldFwiO1xuXG5pbXBvcnQgeyBoZWFsdGggfSBmcm9tIFwiLi4vLi4vc2VydmljZXMvaGVhbHRoXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIHJ1bm5pbmdQb3J0c1ZpZXcgZXh0ZW5kcyBKZXRWaWV3IHtcbiAgICBjb25maWcoKSB7XG4gICAgICAgIGNvbnN0IHBvcnRzID0ge1xuICAgICAgICAgICAgaWQ6IFwicnVubmluZ1BvcnRzXCIsXG4gICAgICAgICAgICB2aWV3OiBcImRhdGF0YWJsZVwiLFxuICAgICAgICAgICAgcmVzcG9uc2l2ZTogdHJ1ZSxcbiAgICAgICAgICAgIGF1dG9Db25maWc6IHRydWUsXG4gICAgICAgICAgICB0eXBlOiB7XG4gICAgICAgICAgICAgICAgaGVpZ2h0OiAyMDAsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgdGVtcGxhdGU6IFwiUnVubmluZyBQb3J0c1wiLFxuICAgICAgICAgICAgcmVzaXplQ29sdW1uOiB0cnVlLFxuICAgICAgICAgICAgc2VsZWN0OiB0cnVlLFxuICAgICAgICAgICAgbXVsdGlzZWxlY3Q6IHRydWUsXG4gICAgICAgICAgICBjc3M6IFwid2ViaXhfaGVhZGVyX2JvcmRlciB3ZWJpeF9kYXRhX2JvcmRlclwiLFxuICAgICAgICAgICAgY29sdW1uczogW3tcbiAgICAgICAgICAgICAgICBpZDogXCJpbmRleFwiLFxuICAgICAgICAgICAgICAgIGhlYWRlcjogXCIjXCIsXG4gICAgICAgICAgICAgICAgc29ydDogXCJpbnRcIixcbiAgICAgICAgICAgICAgICBhdXRvd2lkdGg6IHRydWUsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGlkOiBcInBvcnRfbnVtYmVyXCIsXG4gICAgICAgICAgICAgICAgaGVhZGVyOiBbXCJQb3J0IE51bWJlclwiLCB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnRlbnQ6IFwidGV4dEZpbHRlclwiXG4gICAgICAgICAgICAgICAgfSxdLFxuICAgICAgICAgICAgICAgIHNvcnQ6IFwic3RyaW5nXCJcbiAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICBpZDogXCJwcm9jZXNzXCIsXG4gICAgICAgICAgICAgICAgaGVhZGVyOiBbXCJQcm9jZXNzXCIsIHtcbiAgICAgICAgICAgICAgICAgICAgY29udGVudDogXCJ0ZXh0RmlsdGVyXCJcbiAgICAgICAgICAgICAgICB9XSxcbiAgICAgICAgICAgICAgICBzb3J0OiBcInN0cmluZ1wiXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBdLFxuICAgICAgICAgICAgc2NoZW1lOiB7XG4gICAgICAgICAgICAgICAgJGluaXQ6IGZ1bmN0aW9uIChvYmopIHtcbiAgICAgICAgICAgICAgICAgICAgb2JqLmluZGV4ID0gdGhpcy5jb3VudCgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgdHlwZTogXCJzcGFjZVwiLFxuICAgICAgICAgICAgcm93czogW1xuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgdGVtcGxhdGU6IFwiPGRpdiBzdHlsZT0nd2lkdGg6YXV0bzt0ZXh0LWFsaWduOmNlbnRlcic+PGgzPlBvcnRzPGgzLz48L2Rpdj5cIixcbiAgICAgICAgICAgICAgICAgICAgaGVpZ2h0OiA1MFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgcG9ydHNcbiAgICAgICAgICAgIF1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIGluaXQoKSB7XG4gICAgICAgIGNvbnN0IHNlbGYgPSB0aGlzO1xuXG4gICAgICAgIHNlbGYucG9ydHNUYWJsZSA9IHRoaXMuJCQoXCJydW5uaW5nUG9ydHNcIik7XG4gICAgICAgIGhlYWx0aC5nZXRSdW5uaW5nUG9ydHMoKS50aGVuKGRhdGEgPT4ge1xuICAgICAgICAgICAgc2VsZi5wb3J0c1RhYmxlLnBhcnNlKGRhdGEuanNvbigpKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zb3VyY2VzL3ZpZXdzL2Rhc2gvcnVubmluZ1BvcnRzLmpzIiwiaW1wb3J0IHsgSmV0VmlldywgcGx1Z2lucyB9IGZyb20gXCJ3ZWJpeC1qZXRcIjtcblxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBUb3BWaWV3IGV4dGVuZHMgSmV0VmlldyB7XG4gICAgY29uZmlnKCkge1xuICAgICAgICBjb25zdCBoZWFkZXIgPSB7XG4gICAgICAgICAgICBjb2xzOiBbXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBpZDogXCJidXR0b25faGlkZV9tZW51XCIsXG4gICAgICAgICAgICAgICAgICAgIHZpZXc6IFwiaWNvblwiLCBpY29uOiBcIm1kaSBtZGktbWVudVwiLFxuICAgICAgICAgICAgICAgICAgICBjc3M6IFwiY3VzdG9tX2RhcmtcIiwgaGVpZ2h0OiA1OCxcbiAgICAgICAgICAgICAgICAgICAgY2xpY2s6IHRoaXMuaGlkZU1lbnUsXG4gICAgICAgICAgICAgICAgICAgIHRvb2x0aXA6IFwiSGlkZSBtZW51XCIsXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIGlkOiBcImhlYWRlclwiLFxuICAgICAgICAgICAgICAgICAgICB0eXBlOiBcImhlYWRlclwiLFxuICAgICAgICAgICAgICAgICAgICBjc3M6IFwiY3VzdG9tX2RhcmtcIiwgaGVpZ2h0OiA1OCxcbiAgICAgICAgICAgICAgICAgICAgdGVtcGxhdGU6IFwiQURNSU5cIixcbiAgICAgICAgICAgICAgICAgICAgYm9yZGVybGVzczogdHJ1ZSxcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgXVxuICAgICAgICB9O1xuXG4gICAgICAgIGNvbnN0IHNpZGViYXJEYXRhID0gW3tcbiAgICAgICAgICAgIGlkOiBcImRhc2hcIixcbiAgICAgICAgICAgIHZhbHVlOiBcIkRhc2hib2FyZFwiLFxuICAgICAgICAgICAgaWNvbjogXCJtZGkgbWRpLXZpZXctZGFzaGJvYXJkXCJcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgICAgaWQ6IFwid2lraXNcIixcbiAgICAgICAgICAgIHZhbHVlOiBcIldpa2lzXCIsXG4gICAgICAgICAgICBpY29uOiBcIm1kaSBtZGktbmV3c3BhcGVyXCJcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgICAgaWQ6IFwiYWxlcnRzXCIsXG4gICAgICAgICAgICB2YWx1ZTogXCJBbGVydHNcIixcbiAgICAgICAgICAgIGljb246IFwibWRpIG1kaS1iZWxsLWFsZXJ0XCJcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgICAgaWQ6IFwibG9nc1wiLFxuICAgICAgICAgICAgdmFsdWU6IFwiTG9nc1wiLFxuICAgICAgICAgICAgaWNvbjogXCJtZGkgbWRpLWhpc3RvcnlcIlxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgICBpZDogXCJteWpvYnNfbWFpblwiLFxuICAgICAgICAgICAgdmFsdWU6IFwiTXkgam9ic1wiLFxuICAgICAgICAgICAgaWNvbjogXCJtZGkgbWRpLWFuaW1hdGlvbi1wbGF5XCIsXG4gICAgICAgICAgICBkYXRhOiBbe1xuICAgICAgICAgICAgICAgIGlkOiBcIm15am9ic1wiLFxuICAgICAgICAgICAgICAgIGljb246IFwibWRpIG1kaS1ib29rLW9wZW5cIixcbiAgICAgICAgICAgICAgICB2YWx1ZTogXCJKb2JzXCJcbiAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICBpZDogXCJ3b3JrZXJzXCIsXG4gICAgICAgICAgICAgICAgaWNvbjogXCJtZGkgbWRpLXdvcmtlclwiLFxuICAgICAgICAgICAgICAgIHZhbHVlOiBcIldvcmtlcnNcIlxuICAgICAgICAgICAgfV1cbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgICAgaWQ6IFwicGFja2FnZXNcIixcbiAgICAgICAgICAgIHZhbHVlOiBcIlBhY2thZ2VzXCIsXG4gICAgICAgICAgICBpY29uOiBcIm1kaSBtZGktcGFja2FnZVwiXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICAgIGlkOiBcInNvbHV0aW9uc1wiLFxuICAgICAgICAgICAgdmFsdWU6IFwiU29sdXRpb25zXCIsXG4gICAgICAgICAgICBpY29uOiBcIm1kaSBtZGktYW5pbWF0aW9uLXBsYXlcIixcbiAgICAgICAgICAgIGRhdGE6IFt7XG4gICAgICAgICAgICAgICAgaWQ6IFwidWJ1bnR1XCIsXG4gICAgICAgICAgICAgICAgdmFsdWU6ICc8c3Bhbj48aW1nIGNsYXNzPVwic29sdXRpb25zLWljb25cIiBzcmM9XCJzdGF0aWMvaW1nL3VidW50dS5wbmdcIi8+VWJ1bnR1PC9zcGFuPidcbiAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICBpZDogXCJmbGlzdFwiLFxuICAgICAgICAgICAgICAgIHZhbHVlOiAnPHNwYW4+PGltZyBjbGFzcz1cInNvbHV0aW9ucy1pY29uXCIgc3JjPVwic3RhdGljL2ltZy9mbGlzdC5wbmdcIi8+R2VuZXJpYyBmbGlzdDwvc3Bhbj4nXG4gICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgaWQ6IFwibWluaW9cIixcbiAgICAgICAgICAgICAgICB2YWx1ZTogJzxzcGFuPjxpbWcgY2xhc3M9XCJzb2x1dGlvbnMtaWNvblwiIHNyYz1cInN0YXRpYy9pbWcvbWluaW8ucG5nXCIvPk1pbmlvIC8gUzM8L3NwYW4+J1xuICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIGlkOiBcIms4c19jbHVzdGVyXCIsXG4gICAgICAgICAgICAgICAgdmFsdWU6ICc8c3Bhbj48aW1nIGNsYXNzPVwic29sdXRpb25zLWljb25cIiBzcmM9XCJzdGF0aWMvaW1nL2s4cy5wbmdcIi8+S3ViZXJuZXRlcyBjbHVzdGVyPC9zcGFuPidcbiAgICAgICAgICAgIH0gLy8sIHtcbiAgICAgICAgICAgICAgICAvLyAgICAgaWQ6IFwidGhyZWVib3RcIixcbiAgICAgICAgICAgICAgICAvLyAgICAgdmFsdWU6ICc8c3Bhbj48aW1nIGNsYXNzPVwic29sdXRpb25zLWljb25cIiBzcmM9XCJzdGF0aWMvaW1nLzNib3QuaWNvXCIvPlRocmVlYm90PC9zcGFuPidcbiAgICAgICAgICAgICAgICAvLyB9XG4gICAgICAgICAgICBdXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICAgIGlkOiBcImZhcm1tYW5hZ2VtZW50XCIsXG4gICAgICAgICAgICB2YWx1ZTogXCJGYXJtIE1hbmFnZW1lbnRcIixcbiAgICAgICAgICAgIGljb246IFwibWRpIG1kaS1zZXJ2ZXJcIlxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgICBpZDogXCJjb2Rlc2VydmVyXCIsXG4gICAgICAgICAgICB2YWx1ZTogXCJDb2Rlc2VydmVyXCIsXG4gICAgICAgICAgICBpY29uOiBcIm1kaSBtZGktY29kZS10YWdzXCJcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgICAgaWQ6IFwianVweXRlclwiLFxuICAgICAgICAgICAgdmFsdWU6IFwiSnVweXRlclwiLFxuICAgICAgICAgICAgaWNvbjogXCJtZGkgbWRpLXBsYXlcIlxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgICBpZDogXCJzZXR0aW5nc1wiLFxuICAgICAgICAgICAgdmFsdWU6IFwiU2V0dGluZ3NcIixcbiAgICAgICAgICAgIGljb246IFwibWRpIG1kaS1zZXR0aW5nc1wiXG4gICAgICAgIH0sXG4gICAgICAgIF1cblxuICAgICAgICBjb25zdCByZXNwb25zZSA9IHdlYml4LmFqYXgoKS5zeW5jKCkuZ2V0KFwiL3plcm9ib3QvcGFja2FnZW1hbmFnZXIvYWN0b3JzL3BhY2thZ2VfbWFuYWdlci9wYWNrYWdlc19saXN0XCIsIHsgaGFzX2Zyb250ZW5kX2FyZ3M6IHRydWUsIHN0YXR1czogXCJpbnN0YWxsZWRcIiB9KTtcblxuICAgICAgICBjb25zdCBwYWNrYWdlcyA9IEpTT04ucGFyc2UocmVzcG9uc2UucmVzcG9uc2VUZXh0KS5wYWNrYWdlcztcbiAgICAgICAgZm9yIChjb25zdCBwIG9mIHBhY2thZ2VzKSB7XG4gICAgICAgICAgICBzaWRlYmFyRGF0YS5wdXNoKHAuZnJvbnRlbmRfYXJncyk7XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBzaWRlYmFyID0ge1xuICAgICAgICAgICAgbG9jYWxJZDogXCJtZW51XCIsXG4gICAgICAgICAgICB2aWV3OiBcInNpZGViYXJcIixcbiAgICAgICAgICAgIGNzczogXCJ3ZWJpeF9kYXJrXCIsXG4gICAgICAgICAgICB3aWR0aDogMjAwLFxuICAgICAgICAgICAgZGF0YTogc2lkZWJhckRhdGEsXG4gICAgICAgIH07XG5cbiAgICAgICAgY29uc3QgdG9vbGJhciA9IHtcbiAgICAgICAgICAgIHZpZXc6IFwidG9vbGJhclwiLFxuICAgICAgICAgICAgcGFkZGluZzogOSxcbiAgICAgICAgICAgIGhlaWdodDogNTgsXG4gICAgICAgICAgICBjb2xzOiBbe1xuICAgICAgICAgICAgICAgIGlkOiBcImJ1dHRvbl9zaG93X21lbnVcIixcbiAgICAgICAgICAgICAgICB2aWV3OiBcImljb25cIixcbiAgICAgICAgICAgICAgICBpY29uOiBcIm1kaSBtZGktbWVudVwiLFxuICAgICAgICAgICAgICAgIGNsaWNrOiB0aGlzLnNob3dNZW51LFxuICAgICAgICAgICAgICAgIGhpZGRlbjogdHJ1ZSwgLy8gaGlkZGVuIGJ5IGRlZmF1bHRcbiAgICAgICAgICAgICAgICB0b29sdGlwOiBcIlNob3cgbWVudVwiLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICB2aWV3OiBcInRlbXBsYXRlXCIsXG4gICAgICAgICAgICAgICAgdGVtcGxhdGU6IGA8aW1nIGNsYXNzPVwid2ViaXhfaWNvblwiIHNyYz1cInN0YXRpYy9pbWcvM2JvdC5wbmdcIi8+YCxcbiAgICAgICAgICAgICAgICBib3JkZXJsZXNzOiB0cnVlLFxuICAgICAgICAgICAgICAgIGhlaWdodDogNDAsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGlkOiBcInVzZXJuYW1lX2xhYmVsXCIsXG4gICAgICAgICAgICAgICAgdmlldzogXCJsYWJlbFwiLFxuICAgICAgICAgICAgICAgIGxhYmVsOiBcInVzZXJuYW1lXCIsXG4gICAgICAgICAgICAgICAgYm9yZGVybGVzczogdHJ1ZSxcbiAgICAgICAgICAgICAgICBhbGlnbjogXCJyaWdodFwiLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBpZDogXCJ1c2VyX2ljb25cIixcbiAgICAgICAgICAgICAgICB2aWV3OiBcImljb25cIixcbiAgICAgICAgICAgICAgICBpY29uOiBcIm1kaSBtZGktYWNjb3VudC1jaXJjbGVcIixcbiAgICAgICAgICAgICAgICBib3JkZXJsZXNzOiB0cnVlLFxuICAgICAgICAgICAgICAgIHBvcHVwOiBcInVzZXJfbWVudVwiXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBdXG4gICAgICAgIH07XG5cbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHR5cGU6IFwiY2xlYW5cIixcbiAgICAgICAgICAgIGNvbHM6IFt7XG4gICAgICAgICAgICAgICAgcm93czogW2hlYWRlciwgc2lkZWJhcl1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgcm93czogW1xuICAgICAgICAgICAgICAgICAgICB0b29sYmFyLFxuICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAkc3VidmlldzogdHJ1ZVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgXVxuICAgICAgICB9O1xuICAgIH1cblxuICAgIHNob3dNZW51KCkge1xuICAgICAgICB0aGlzLiRzY29wZS5tZW51LnNob3coKTtcbiAgICAgICAgdGhpcy4kc2NvcGUuaGVhZGVyLnNob3coKTtcbiAgICAgICAgdGhpcy4kc2NvcGUuYnV0dG9uSGlkZU1lbnUuc2hvdygpO1xuXG4gICAgICAgIHRoaXMuJHNjb3BlLmJ1dHRvblNob3dNZW51LmhpZGUoKTtcbiAgICB9XG5cbiAgICBoaWRlTWVudSgpIHtcbiAgICAgICAgdGhpcy4kc2NvcGUubWVudS5oaWRlKCk7XG4gICAgICAgIHRoaXMuJHNjb3BlLmhlYWRlci5oaWRlKCk7XG4gICAgICAgIHRoaXMuJHNjb3BlLmJ1dHRvbkhpZGVNZW51LmhpZGUoKTtcblxuICAgICAgICB0aGlzLiRzY29wZS5idXR0b25TaG93TWVudS5zaG93KCk7XG4gICAgfVxuXG4gICAgaW5pdCgpIHtcbiAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xuXG4gICAgICAgIHRoaXMudXNlKHBsdWdpbnMuTWVudSwge1xuICAgICAgICAgICAgaWQ6IFwibWVudVwiLFxuICAgICAgICAgICAgdXJsczoge1xuICAgICAgICAgICAgICAgIG15am9iczogXCJteWpvYnMuam9ic1wiLFxuICAgICAgICAgICAgICAgIHdvcmtlcnM6IFwibXlqb2JzLndvcmtlcnNcIixcbiAgICAgICAgICAgICAgICB1YnVudHU6IFwic29sdXRpb25zLmNoYXRmbG93P2F1dGhvcj10ZmdyaWRfc29sdXRpb25zJnBhY2thZ2U9dWJ1bnR1JmNoYXQ9dWJ1bnR1X2RlcGxveVwiLFxuICAgICAgICAgICAgICAgIGZsaXN0OiBcInNvbHV0aW9ucy5jaGF0Zmxvdz9hdXRob3I9dGZncmlkX3NvbHV0aW9ucyZwYWNrYWdlPWFueV9mbGlzdCZjaGF0PXlvdXJfZmxpc3RcIixcbiAgICAgICAgICAgICAgICBtaW5pbzogXCJzb2x1dGlvbnMuY2hhdGZsb3c/YXV0aG9yPXRmZ3JpZF9zb2x1dGlvbnMmcGFja2FnZT1taW5pbyZjaGF0PW1pbmlvX2RlcGxveVwiLFxuICAgICAgICAgICAgICAgIGs4c19jbHVzdGVyOiBcInNvbHV0aW9ucy5jaGF0Zmxvdz9hdXRob3I9dGZncmlkX3NvbHV0aW9ucyZwYWNrYWdlPWt1YmVybmV0ZXNfY2x1c3RlciZjaGF0PWt1YmVybmV0ZXNfY2x1c3Rlcl9kZXBsb3lcIixcbiAgICAgICAgICAgICAgICB0aHJlZWJvdDogXCJzb2x1dGlvbnMuY2hhdGZsb3c/YXV0aG9yPXRmZ3JpZCZwYWNrYWdlPXRocmVlYm90X3Byb3Zpc2lvbmluZyZjaGF0PXRocmVlYm90X3Jlc2VydmF0aW9uXCIsXG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHRoaXMubWVudSA9IHRoaXMuJCQoXCJtZW51XCIpO1xuICAgICAgICB0aGlzLmhlYWRlciA9IHRoaXMuJCQoXCJoZWFkZXJcIik7XG5cbiAgICAgICAgdGhpcy5idXR0b25TaG93TWVudSA9IHRoaXMuJCQoXCJidXR0b25fc2hvd19tZW51XCIpO1xuICAgICAgICB0aGlzLmJ1dHRvbkhpZGVNZW51ID0gdGhpcy4kJChcImJ1dHRvbl9oaWRlX21lbnVcIik7XG5cblxuICAgICAgICB0aGlzLndlYml4LnVpKHtcbiAgICAgICAgICAgIHZpZXc6IFwic3VibWVudVwiLFxuICAgICAgICAgICAgaWQ6IFwidXNlcl9tZW51XCIsXG4gICAgICAgICAgICBhdXRvd2lkdGg6IHRydWUsXG4gICAgICAgICAgICBkYXRhOiBbXVxuICAgICAgICB9KTtcblxuICAgICAgICB0aGlzLnVzZXJNZW51ID0gJCQoXCJ1c2VyX21lbnVcIik7XG4gICAgICAgIHRoaXMudXNlck1lbnUuYXR0YWNoRXZlbnQoXCJvbkl0ZW1DbGlja1wiLCBmdW5jdGlvbiAoaWQsIGUsIG5vZGUpIHtcbiAgICAgICAgICAgIGlmIChpZCA9PSBcImxvZ291dFwiKSB7XG4gICAgICAgICAgICAgICAgd2luZG93LmxvY2F0aW9uLmhyZWYgPSBcIi9hdXRoL2xvZ291dD9uZXh0X3VybD0vYWRtaW5cIjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgdGhpcy51c2VybmFtZUxhYmVsID0gJCQoXCJ1c2VybmFtZV9sYWJlbFwiKTtcblxuICAgICAgICB3ZWJpeC5hamF4KCkuZ2V0KFwiL2F1dGgvYXV0aGVudGljYXRlZFwiLCBmdW5jdGlvbiAoZGF0YSkge1xuICAgICAgICAgICAgY29uc3QgaW5mbyA9IEpTT04ucGFyc2UoZGF0YSk7XG4gICAgICAgICAgICBzZWxmLnVzZXJuYW1lTGFiZWwuY29uZmlnLmxhYmVsID0gaW5mby51c2VybmFtZTtcbiAgICAgICAgICAgIHNlbGYudXNlcm5hbWVMYWJlbC5jb25maWcud2lkdGggPSB3ZWJpeC5odG1sLmdldFRleHRTaXplKGluZm8udXNlcm5hbWUpICsgMTA7XG4gICAgICAgICAgICBzZWxmLnVzZXJuYW1lTGFiZWwucmVmcmVzaCgpO1xuXG4gICAgICAgICAgICBzZWxmLnVzZXJNZW51LmFkZCh7IGlkOiAnZW1haWwnLCB2YWx1ZTogaW5mby5lbWFpbCB9KVxuICAgICAgICAgICAgc2VsZi51c2VyTWVudS5hZGQoeyBpZDogJ2xvZ291dCcsIHZhbHVlOiBcIkxvZ291dFwiIH0pXG4gICAgICAgIH0pO1xuICAgIH1cblxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc291cmNlcy92aWV3cy9tYWluLmpzIiwiaW1wb3J0IHsgSmV0VmlldyB9IGZyb20gXCJ3ZWJpeC1qZXRcIjtcblxuaW1wb3J0IHsgZGF0ZUZvcm1hdHRlciB9IGZyb20gXCIuLi8uLi9jb21tb24vZm9ybWF0dGVyc1wiO1xuaW1wb3J0IHsgbXlqb2JzIH0gZnJvbSBcIi4uLy4uL3NlcnZpY2VzL215am9ic1wiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBKb2JzVmlldyBleHRlbmRzIEpldFZpZXcge1xuICAgIGNvbmZpZygpIHtcbiAgICAgICAgY29uc3QgdmlldyA9IHtcbiAgICAgICAgICAgIHZpZXc6IFwiZGF0YXRhYmxlXCIsXG4gICAgICAgICAgICBpZDogXCJqb2JzX3RhYmxlXCIsXG4gICAgICAgICAgICByZXNpemVDb2x1bW46IHRydWUsXG4gICAgICAgICAgICBzZWxlY3Q6IHRydWUsXG4gICAgICAgICAgICBtdWx0aXNlbGVjdDogdHJ1ZSxcbiAgICAgICAgICAgIGNzczogXCJ3ZWJpeF9oZWFkZXJfYm9yZGVyIHdlYml4X2RhdGFfYm9yZGVyXCIsXG4gICAgICAgICAgICBjb2x1bW5zOiBbe1xuICAgICAgICAgICAgICAgIGlkOiBcImluZGV4XCIsXG4gICAgICAgICAgICAgICAgaGVhZGVyOiBcIiNcIixcbiAgICAgICAgICAgICAgICBzb3J0OiBcImludFwiLFxuICAgICAgICAgICAgICAgIGF1dG93aWR0aDogdHJ1ZSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgaWQ6IFwiY2F0ZWdvcnlcIixcbiAgICAgICAgICAgICAgICBoZWFkZXI6IFwiQ2F0ZWdvcnlcIixcbiAgICAgICAgICAgICAgICBzb3J0OiBcInN0cmluZ1wiXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGlkOiBcInRpbWVfc3RhcnRcIixcbiAgICAgICAgICAgICAgICBoZWFkZXI6IFwiU3RhcnQgdGltZVwiLFxuICAgICAgICAgICAgICAgIHNvcnQ6IFwiZGF0ZVwiLFxuICAgICAgICAgICAgICAgIGZvcm1hdDogZGF0ZUZvcm1hdHRlcixcbiAgICAgICAgICAgICAgICB3aWR0aDogMjAwXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGlkOiBcInRpbWVfc3RvcFwiLFxuICAgICAgICAgICAgICAgIGhlYWRlcjogXCJTdG9wIHRpbWVcIixcbiAgICAgICAgICAgICAgICBzb3J0OiBcImRhdGVcIixcbiAgICAgICAgICAgICAgICBmb3JtYXQ6IGRhdGVGb3JtYXR0ZXIsXG4gICAgICAgICAgICAgICAgd2lkdGg6IDIwMFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBpZDogXCJ0aW1lb3V0XCIsXG4gICAgICAgICAgICAgICAgaGVhZGVyOiBcIlRpbWVvdXRcIixcbiAgICAgICAgICAgICAgICBzb3J0OiBcImludFwiXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGlkOiBcImFjdGlvbl9pZFwiLFxuICAgICAgICAgICAgICAgIGhlYWRlcjogXCJBY3Rpb25cIixcbiAgICAgICAgICAgICAgICBzb3J0OiBcInN0cmluZ1wiXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGlkOiBcImt3YXJnc1wiLFxuICAgICAgICAgICAgICAgIGhlYWRlcjogXCJBcmd1bWVudHNcIixcbiAgICAgICAgICAgICAgICBzb3J0OiBcInN0cmluZ1wiLFxuICAgICAgICAgICAgICAgIGZvcm1hdDogSlNPTi5zdHJpbmdpZnlcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgaWQ6IFwicmVzdWx0XCIsXG4gICAgICAgICAgICAgICAgaGVhZGVyOiBbXG4gICAgICAgICAgICAgICAgICAgIFwiUmVzdWx0XCIsXG4gICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRlbnQ6IFwidGV4dEZpbHRlclwiXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgIHNvcnQ6IFwic3RyaW5nXCIsXG4gICAgICAgICAgICAgICAgZm9ybWF0OiBKU09OLnN0cmluZ2lmeSxcbiAgICAgICAgICAgIH1dLFxuICAgICAgICAgICAgc2NoZW1lOiB7XG4gICAgICAgICAgICAgICAgJGluaXQ6IGZ1bmN0aW9uIChvYmopIHtcbiAgICAgICAgICAgICAgICAgICAgb2JqLmluZGV4ID0gdGhpcy5jb3VudCgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgIH07XG5cbiAgICAgICAgcmV0dXJuIHZpZXc7XG4gICAgfVxuXG4gICAgaW5pdCh2aWV3KSB7XG4gICAgICAgIG15am9icy5saXN0Sm9icygpLnRoZW4oZGF0YSA9PiB7XG4gICAgICAgICAgICB2aWV3LnBhcnNlKGRhdGEpO1xuICAgICAgICB9KTtcbiAgICB9XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zb3VyY2VzL3ZpZXdzL215am9icy9qb2JzLmpzIiwiaW1wb3J0IHsgU2VydmljZSB9IGZyb20gXCIuLi9jb21tb24vYXBpXCI7XG5cbmNvbnN0IEJBU0VfVVJMID0gXCIvemVyb2JvdC9teWpvYnNfdWkvYWN0b3JzL215am9ic1wiO1xuXG5jbGFzcyBNeWpvYnNTZXJ2aWNlIGV4dGVuZHMgU2VydmljZSB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHN1cGVyKEJBU0VfVVJMKTtcbiAgICB9XG5cbiAgICBsaXN0Sm9icygpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0Q2FsbChcImxpc3Rfam9ic1wiKTtcbiAgICB9XG5cbiAgICBsaXN0V29ya2VycygpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0Q2FsbChcImxpc3Rfd29ya2Vyc1wiKTtcbiAgICB9XG59XG5cbmV4cG9ydCBjb25zdCBteWpvYnMgPSBuZXcgTXlqb2JzU2VydmljZSgpO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc291cmNlcy9zZXJ2aWNlcy9teWpvYnMuanMiLCJpbXBvcnQgeyBKZXRWaWV3IH0gZnJvbSBcIndlYml4LWpldFwiO1xuXG5pbXBvcnQgeyBkYXRlRm9ybWF0dGVyIH0gZnJvbSBcIi4uLy4uL2NvbW1vbi9mb3JtYXR0ZXJzXCI7XG5pbXBvcnQgeyBteWpvYnMgfSBmcm9tIFwiLi4vLi4vc2VydmljZXMvbXlqb2JzXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEpvYnNWaWV3IGV4dGVuZHMgSmV0VmlldyB7XG4gICAgY29uZmlnKCkge1xuICAgICAgICBjb25zdCB2aWV3ID0ge1xuICAgICAgICAgICAgdmlldzogXCJkYXRhdGFibGVcIixcbiAgICAgICAgICAgIGlkOiBcIndvcmtlcnNfdGFibGVcIixcbiAgICAgICAgICAgIHJlc2l6ZUNvbHVtbjogdHJ1ZSxcbiAgICAgICAgICAgIHNlbGVjdDogdHJ1ZSxcbiAgICAgICAgICAgIG11bHRpc2VsZWN0OiB0cnVlLFxuICAgICAgICAgICAgY3NzOiBcIndlYml4X2hlYWRlcl9ib3JkZXIgd2ViaXhfZGF0YV9ib3JkZXJcIixcbiAgICAgICAgICAgIGNvbHVtbnM6IFt7XG4gICAgICAgICAgICAgICAgaWQ6IFwiaW5kZXhcIixcbiAgICAgICAgICAgICAgICBoZWFkZXI6IFwiI1wiLFxuICAgICAgICAgICAgICAgIHNvcnQ6IFwiaW50XCIsXG4gICAgICAgICAgICAgICAgYXV0b3dpZHRoOiB0cnVlLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBpZDogXCJzdGF0ZVwiLFxuICAgICAgICAgICAgICAgIGhlYWRlcjogXCJTdGF0ZVwiLFxuICAgICAgICAgICAgICAgIHNvcnQ6IFwic3RyaW5nXCJcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgaWQ6IFwiaGFsdFwiLFxuICAgICAgICAgICAgICAgIGhlYWRlcjogXCJIYWx0ZWRcIixcbiAgICAgICAgICAgICAgICBzb3J0OiBcInN0cmluZ1wiLFxuICAgICAgICAgICAgICAgIGZvcm1hdDogZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB2YWx1ZSA/ICdZZXMnIDogJ05vJztcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBpZDogXCJwaWRcIixcbiAgICAgICAgICAgICAgICBoZWFkZXI6IFwiUElEXCIsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGlkOiBcImN1cnJlbnRfam9iXCIsXG4gICAgICAgICAgICAgICAgaGVhZGVyOiBcIkN1cnJlbnQgam9iXCIsXG4gICAgICAgICAgICAgICAgZm9ybWF0OiBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHZhbHVlID09IDIxNDc0ODM2NDcgPyAnTi9BJyA6IHZhbHVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgaWQ6IFwibGFzdF91cGRhdGVcIixcbiAgICAgICAgICAgICAgICBoZWFkZXI6IFwiTGFzdCB1cGRhdGVcIixcbiAgICAgICAgICAgICAgICBzb3J0OiBcImRhdGVcIixcbiAgICAgICAgICAgICAgICBmb3JtYXQ6IGRhdGVGb3JtYXR0ZXIsXG4gICAgICAgICAgICAgICAgd2lkdGg6IDIwMFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBpZDogXCJ0aW1lX3N0YXJ0XCIsXG4gICAgICAgICAgICAgICAgaGVhZGVyOiBcIlN0YXJ0IHRpbWVcIixcbiAgICAgICAgICAgICAgICBzb3J0OiBcImRhdGVcIixcbiAgICAgICAgICAgICAgICBmb3JtYXQ6IGRhdGVGb3JtYXR0ZXIsXG4gICAgICAgICAgICAgICAgd2lkdGg6IDIwMFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBpZDogXCJ0aW1lb3V0XCIsXG4gICAgICAgICAgICAgICAgaGVhZGVyOiBcIlRpbWVvdXRcIixcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgaWQ6IFwidHlwZVwiLFxuICAgICAgICAgICAgICAgIGhlYWRlcjogXCJUeXBlXCIsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGlkOiBcImVycm9yXCIsXG4gICAgICAgICAgICAgICAgaGVhZGVyOiBcIkVycm9yXCIsXG4gICAgICAgICAgICB9XSxcbiAgICAgICAgICAgIGF1dG9Db25maWc6IHRydWUsXG4gICAgICAgICAgICBzY2hlbWU6IHtcbiAgICAgICAgICAgICAgICAkaW5pdDogZnVuY3Rpb24gKG9iaikge1xuICAgICAgICAgICAgICAgICAgICBvYmouaW5kZXggPSB0aGlzLmNvdW50KCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgfTtcblxuICAgICAgICByZXR1cm4gdmlldztcbiAgICB9XG5cbiAgICBpbml0KHZpZXcpIHtcbiAgICAgICAgbXlqb2JzLmxpc3RXb3JrZXJzKCkudGhlbihkYXRhID0+IHtcbiAgICAgICAgICAgIHZpZXcucGFyc2UoZGF0YSk7XG4gICAgICAgIH0pO1xuXG4gICAgfVxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc291cmNlcy92aWV3cy9teWpvYnMvd29ya2Vycy5qcyIsImltcG9ydCB7IEV4dGVybmFsVmlldyB9IGZyb20gXCIuLi9leHRlcm5hbFwiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDaGF0Zmxvd1ZpZXcgZXh0ZW5kcyBFeHRlcm5hbFZpZXcge1xuICAgIGNvbnN0cnVjdG9yKGFwcCwgbmFtZSkge1xuICAgICAgICBzdXBlcihhcHAsIG5hbWUpO1xuXG4gICAgICAgIHRoaXMuYmFzZUdpdFVybCA9IFwiaHR0cHM6Ly9naXRodWIuY29tL3RocmVlZm9sZHRlY2gvanVtcHNjYWxlWF90aHJlZWJvdC90cmVlL2RldmVsb3BtZW50L1RocmVlQm90UGFja2FnZXNcIjtcblxuICAgIH1cblxuICAgIHVybENoYW5nZSh2aWV3LCB1cmwpIHtcbiAgICAgICAgY29uc3QgcGFyYW1zID0gdXJsWzBdLnBhcmFtcztcbiAgICAgICAgaWYgKE9iamVjdC5rZXlzKHBhcmFtcykubGVuZ3RoICE9PSAzKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBwYWNrYWdlTmFtZSA9IGAke3BhcmFtcy5hdXRob3J9LiR7cGFyYW1zLnBhY2thZ2V9YFxuICAgICAgICBjb25zdCBwYWNrYWdlVXJsID0gcGFja2FnZU5hbWUucmVwbGFjZShcIi5cIiwgXCIvXCIpO1xuXG4gICAgICAgIHRoaXMudGFyZ2V0VXJsID0gYC8ke3BhY2thZ2VVcmx9L2NoYXQvJHtwYXJhbXMuY2hhdH0/bm9oZWFkZXI9eWVzYDtcbiAgICAgICAgdGhpcy5yZXF1aXJlZFBhY2thZ2VzID0ge31cbiAgICAgICAgdGhpcy5yZXF1aXJlZFBhY2thZ2VzW3BhY2thZ2VOYW1lXSA9IGAke3RoaXMuYmFzZUdpdFVybH0vJHtwYWNrYWdlVXJsfWA7XG5cbiAgICAgICAgdGhpcy5pbml0KHZpZXcpO1xuICAgIH1cbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NvdXJjZXMvdmlld3Mvc29sdXRpb25zL2NoYXRmbG93LmpzIiwiaW1wb3J0IFwiLi9zdHlsZXMvYXBwLmNzc1wiO1xuaW1wb3J0IHtKZXRBcHB9IGZyb20gXCJ3ZWJpeC1qZXRcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgSW52ZW50b3J5QXBwIGV4dGVuZHMgSmV0QXBwIHtcblx0Y29uc3RydWN0b3IoY29uZmlnKXtcblx0XHRzdXBlcih3ZWJpeC5leHRlbmQoe1xuXHRcdFx0aWQ6XHRcdFx0QVBQTkFNRSxcblx0XHRcdHZlcnNpb246XHRWRVJTSU9OLFxuXHRcdFx0c3RhcnQ6XHRcdFwiL21haW4vZGFzaFwiLFxuXHRcdFx0ZGVidWc6XHRcdCFQUk9EVUNUSU9OXG5cdFx0fSwgY29uZmlnLCB0cnVlKSk7XG5cblx0XHQvKiBlcnJvciB0cmFja2luZyAqL1xuXHRcdHRoaXMuYXR0YWNoRXZlbnQoXCJhcHA6ZXJyb3I6cmVzb2x2ZVwiLCBmdW5jdGlvbihuYW1lLCBlcnJvcil7XG5cdFx0XHR3aW5kb3cuY29uc29sZS5lcnJvcihlcnJvcik7XG5cdFx0fSk7XG5cdH1cbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NvdXJjZXMvYXBwLmpzIiwiLy8gcmVtb3ZlZCBieSBleHRyYWN0LXRleHQtd2VicGFjay1wbHVnaW5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3NvdXJjZXMvc3R5bGVzL2FwcC5jc3Ncbi8vIG1vZHVsZSBpZCA9IDM5XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsInZhciBtYXAgPSB7XG5cdFwiLi9hbGVydHNcIjogNyxcblx0XCIuL2FsZXJ0cy9cIjogNyxcblx0XCIuL2FsZXJ0cy9hbGVydFwiOiAyMCxcblx0XCIuL2FsZXJ0cy9hbGVydC5qc1wiOiAyMCxcblx0XCIuL2FsZXJ0cy9kYXRhXCI6IDQsXG5cdFwiLi9hbGVydHMvZGF0YS5qc1wiOiA0LFxuXHRcIi4vYWxlcnRzL2luZGV4XCI6IDcsXG5cdFwiLi9hbGVydHMvaW5kZXguanNcIjogNyxcblx0XCIuL2NpcmNsZXNcIjogOCxcblx0XCIuL2NpcmNsZXMvXCI6IDgsXG5cdFwiLi9jaXJjbGVzL2luZGV4XCI6IDgsXG5cdFwiLi9jaXJjbGVzL2luZGV4LmpzXCI6IDgsXG5cdFwiLi9jaXJjbGVzdG9yaWVzXCI6IDksXG5cdFwiLi9jaXJjbGVzdG9yaWVzL1wiOiA5LFxuXHRcIi4vY2lyY2xlc3Rvcmllcy9pbmRleFwiOiA5LFxuXHRcIi4vY2lyY2xlc3Rvcmllcy9pbmRleC5qc1wiOiA5LFxuXHRcIi4vY2lyY2xldGFza3NcIjogMTAsXG5cdFwiLi9jaXJjbGV0YXNrcy9cIjogMTAsXG5cdFwiLi9jaXJjbGV0YXNrcy9pbmRleFwiOiAxMCxcblx0XCIuL2NpcmNsZXRhc2tzL2luZGV4LmpzXCI6IDEwLFxuXHRcIi4vY29kZXNlcnZlclwiOiAxMSxcblx0XCIuL2NvZGVzZXJ2ZXIvXCI6IDExLFxuXHRcIi4vY29kZXNlcnZlci9pbmRleFwiOiAxMSxcblx0XCIuL2NvZGVzZXJ2ZXIvaW5kZXguanNcIjogMTEsXG5cdFwiLi9kYXNoXCI6IDEyLFxuXHRcIi4vZGFzaC9cIjogMTIsXG5cdFwiLi9kYXNoL2Rpc2tTcGFjZVwiOiAyNyxcblx0XCIuL2Rhc2gvZGlza1NwYWNlLmpzXCI6IDI3LFxuXHRcIi4vZGFzaC9oZWFsdGhcIjogMjgsXG5cdFwiLi9kYXNoL2hlYWx0aC5qc1wiOiAyOCxcblx0XCIuL2Rhc2gvaW5kZXhcIjogMTIsXG5cdFwiLi9kYXNoL2luZGV4LmpzXCI6IDEyLFxuXHRcIi4vZGFzaC9qc3hJbmZvXCI6IDI5LFxuXHRcIi4vZGFzaC9qc3hJbmZvLmpzXCI6IDI5LFxuXHRcIi4vZGFzaC9wcm9jZXNzZXNcIjogMzAsXG5cdFwiLi9kYXNoL3Byb2Nlc3Nlcy5qc1wiOiAzMCxcblx0XCIuL2Rhc2gvcHJvY2Vzc2VzQ2hpbGRWaWV3XCI6IDIyLFxuXHRcIi4vZGFzaC9wcm9jZXNzZXNDaGlsZFZpZXcuanNcIjogMjIsXG5cdFwiLi9kYXNoL3J1bm5pbmdQb3J0c1wiOiAzMSxcblx0XCIuL2Rhc2gvcnVubmluZ1BvcnRzLmpzXCI6IDMxLFxuXHRcIi4vZXJyb3JzL2RpYWxvZ1wiOiAzLFxuXHRcIi4vZXJyb3JzL2RpYWxvZy5qc1wiOiAzLFxuXHRcIi4vZXh0ZXJuYWxcIjogMSxcblx0XCIuL2V4dGVybmFsL1wiOiAxLFxuXHRcIi4vZXh0ZXJuYWwvaW5kZXhcIjogMSxcblx0XCIuL2V4dGVybmFsL2luZGV4LmpzXCI6IDEsXG5cdFwiLi9mYXJtbWFuYWdlbWVudFwiOiAxMyxcblx0XCIuL2Zhcm1tYW5hZ2VtZW50L1wiOiAxMyxcblx0XCIuL2Zhcm1tYW5hZ2VtZW50L2luZGV4XCI6IDEzLFxuXHRcIi4vZmFybW1hbmFnZW1lbnQvaW5kZXguanNcIjogMTMsXG5cdFwiLi9qdXB5dGVyXCI6IDE0LFxuXHRcIi4vanVweXRlci9cIjogMTQsXG5cdFwiLi9qdXB5dGVyL2luZGV4XCI6IDE0LFxuXHRcIi4vanVweXRlci9pbmRleC5qc1wiOiAxNCxcblx0XCIuL2xvZ3NcIjogMTUsXG5cdFwiLi9sb2dzL1wiOiAxNSxcblx0XCIuL2xvZ3MvYXBwTG9nc1wiOiAyMyxcblx0XCIuL2xvZ3MvYXBwTG9ncy5qc1wiOiAyMyxcblx0XCIuL2xvZ3MvaW5kZXhcIjogMTUsXG5cdFwiLi9sb2dzL2luZGV4LmpzXCI6IDE1LFxuXHRcIi4vbWFpblwiOiAzMixcblx0XCIuL21haW4uanNcIjogMzIsXG5cdFwiLi9teWpvYnMvam9ic1wiOiAzMyxcblx0XCIuL215am9icy9qb2JzLmpzXCI6IDMzLFxuXHRcIi4vbXlqb2JzL3dvcmtlcnNcIjogMzUsXG5cdFwiLi9teWpvYnMvd29ya2Vycy5qc1wiOiAzNSxcblx0XCIuL3BhY2thZ2VzXCI6IDE2LFxuXHRcIi4vcGFja2FnZXMvXCI6IDE2LFxuXHRcIi4vcGFja2FnZXMvaW5kZXhcIjogMTYsXG5cdFwiLi9wYWNrYWdlcy9pbmRleC5qc1wiOiAxNixcblx0XCIuL3NldHRpbmdzXCI6IDE3LFxuXHRcIi4vc2V0dGluZ3MvXCI6IDE3LFxuXHRcIi4vc2V0dGluZ3MvYWRtaW5zXCI6IDI0LFxuXHRcIi4vc2V0dGluZ3MvYWRtaW5zLmpzXCI6IDI0LFxuXHRcIi4vc2V0dGluZ3MvaW5kZXhcIjogMTcsXG5cdFwiLi9zZXR0aW5ncy9pbmRleC5qc1wiOiAxNyxcblx0XCIuL3NvbHV0aW9ucy9jaGF0Zmxvd1wiOiAzNixcblx0XCIuL3NvbHV0aW9ucy9jaGF0Zmxvdy5qc1wiOiAzNixcblx0XCIuL3dpa2lzXCI6IDE4LFxuXHRcIi4vd2lraXMvXCI6IDE4LFxuXHRcIi4vd2lraXMvaW5kZXhcIjogMTgsXG5cdFwiLi93aWtpcy9pbmRleC5qc1wiOiAxOFxufTtcbmZ1bmN0aW9uIHdlYnBhY2tDb250ZXh0KHJlcSkge1xuXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyh3ZWJwYWNrQ29udGV4dFJlc29sdmUocmVxKSk7XG59O1xuZnVuY3Rpb24gd2VicGFja0NvbnRleHRSZXNvbHZlKHJlcSkge1xuXHR2YXIgaWQgPSBtYXBbcmVxXTtcblx0aWYoIShpZCArIDEpKSAvLyBjaGVjayBmb3IgbnVtYmVyIG9yIHN0cmluZ1xuXHRcdHRocm93IG5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIgKyByZXEgKyBcIicuXCIpO1xuXHRyZXR1cm4gaWQ7XG59O1xud2VicGFja0NvbnRleHQua2V5cyA9IGZ1bmN0aW9uIHdlYnBhY2tDb250ZXh0S2V5cygpIHtcblx0cmV0dXJuIE9iamVjdC5rZXlzKG1hcCk7XG59O1xud2VicGFja0NvbnRleHQucmVzb2x2ZSA9IHdlYnBhY2tDb250ZXh0UmVzb2x2ZTtcbm1vZHVsZS5leHBvcnRzID0gd2VicGFja0NvbnRleHQ7XG53ZWJwYWNrQ29udGV4dC5pZCA9IDQwO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vc291cmNlcy92aWV3cyBeXFwuXFwvLiokXG4vLyBtb2R1bGUgaWQgPSA0MFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvKiAgYW5zaV91cC5qc1xuICogIGF1dGhvciA6IERydSBOZWxzb25cbiAqICBsaWNlbnNlIDogTUlUXG4gKiAgaHR0cDovL2dpdGh1Yi5jb20vZHJ1ZHJ1L2Fuc2lfdXBcbiAqL1xuKGZ1bmN0aW9uIChyb290LCBmYWN0b3J5KSB7XG4gICAgaWYgKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZCkge1xuICAgICAgICAvLyBBTUQuIFJlZ2lzdGVyIGFzIGFuIGFub255bW91cyBtb2R1bGUuXG4gICAgICAgIGRlZmluZShbJ2V4cG9ydHMnXSwgZmFjdG9yeSk7XG4gICAgfSBlbHNlIGlmICh0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIGV4cG9ydHMubm9kZU5hbWUgIT09ICdzdHJpbmcnKSB7XG4gICAgICAgIC8vIENvbW1vbkpTXG4gICAgICAgIGZhY3RvcnkoZXhwb3J0cyk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgLy8gQnJvd3NlciBnbG9iYWxzXG4gICAgICAgIHZhciBleHAgPSB7fTtcbiAgICAgICAgZmFjdG9yeShleHApO1xuICAgICAgICByb290LkFuc2lVcCA9IGV4cC5kZWZhdWx0O1xuICAgIH1cbn0odGhpcywgZnVuY3Rpb24gKGV4cG9ydHMpIHtcblwidXNlIHN0cmljdFwiO1xudmFyIF9fbWFrZVRlbXBsYXRlT2JqZWN0ID0gKHRoaXMgJiYgdGhpcy5fX21ha2VUZW1wbGF0ZU9iamVjdCkgfHwgZnVuY3Rpb24gKGNvb2tlZCwgcmF3KSB7XG4gICAgaWYgKE9iamVjdC5kZWZpbmVQcm9wZXJ0eSkgeyBPYmplY3QuZGVmaW5lUHJvcGVydHkoY29va2VkLCBcInJhd1wiLCB7IHZhbHVlOiByYXcgfSk7IH0gZWxzZSB7IGNvb2tlZC5yYXcgPSByYXc7IH1cbiAgICByZXR1cm4gY29va2VkO1xufTtcbnZhciBQYWNrZXRLaW5kO1xuKGZ1bmN0aW9uIChQYWNrZXRLaW5kKSB7XG4gICAgUGFja2V0S2luZFtQYWNrZXRLaW5kW1wiRU9TXCJdID0gMF0gPSBcIkVPU1wiO1xuICAgIFBhY2tldEtpbmRbUGFja2V0S2luZFtcIlRleHRcIl0gPSAxXSA9IFwiVGV4dFwiO1xuICAgIFBhY2tldEtpbmRbUGFja2V0S2luZFtcIkluY29tcGxldGVcIl0gPSAyXSA9IFwiSW5jb21wbGV0ZVwiO1xuICAgIFBhY2tldEtpbmRbUGFja2V0S2luZFtcIkVTQ1wiXSA9IDNdID0gXCJFU0NcIjtcbiAgICBQYWNrZXRLaW5kW1BhY2tldEtpbmRbXCJVbmtub3duXCJdID0gNF0gPSBcIlVua25vd25cIjtcbiAgICBQYWNrZXRLaW5kW1BhY2tldEtpbmRbXCJTR1JcIl0gPSA1XSA9IFwiU0dSXCI7XG4gICAgUGFja2V0S2luZFtQYWNrZXRLaW5kW1wiT1NDVVJMXCJdID0gNl0gPSBcIk9TQ1VSTFwiO1xufSkoUGFja2V0S2luZCB8fCAoUGFja2V0S2luZCA9IHt9KSk7XG52YXIgQW5zaVVwID0gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBBbnNpVXAoKSB7XG4gICAgICAgIHRoaXMuVkVSU0lPTiA9IFwiNC4wLjRcIjtcbiAgICAgICAgdGhpcy5zZXR1cF9wYWxldHRlcygpO1xuICAgICAgICB0aGlzLl91c2VfY2xhc3NlcyA9IGZhbHNlO1xuICAgICAgICB0aGlzLl9lc2NhcGVfZm9yX2h0bWwgPSB0cnVlO1xuICAgICAgICB0aGlzLmJvbGQgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5mZyA9IHRoaXMuYmcgPSBudWxsO1xuICAgICAgICB0aGlzLl9idWZmZXIgPSAnJztcbiAgICAgICAgdGhpcy5fdXJsX3doaXRlbGlzdCA9IHsgJ2h0dHAnOiAxLCAnaHR0cHMnOiAxIH07XG4gICAgfVxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShBbnNpVXAucHJvdG90eXBlLCBcInVzZV9jbGFzc2VzXCIsIHtcbiAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fdXNlX2NsYXNzZXM7XG4gICAgICAgIH0sXG4gICAgICAgIHNldDogZnVuY3Rpb24gKGFyZykge1xuICAgICAgICAgICAgdGhpcy5fdXNlX2NsYXNzZXMgPSBhcmc7XG4gICAgICAgIH0sXG4gICAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxuICAgIH0pO1xuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShBbnNpVXAucHJvdG90eXBlLCBcImVzY2FwZV9mb3JfaHRtbFwiLCB7XG4gICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2VzY2FwZV9mb3JfaHRtbDtcbiAgICAgICAgfSxcbiAgICAgICAgc2V0OiBmdW5jdGlvbiAoYXJnKSB7XG4gICAgICAgICAgICB0aGlzLl9lc2NhcGVfZm9yX2h0bWwgPSBhcmc7XG4gICAgICAgIH0sXG4gICAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxuICAgIH0pO1xuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShBbnNpVXAucHJvdG90eXBlLCBcInVybF93aGl0ZWxpc3RcIiwge1xuICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl91cmxfd2hpdGVsaXN0O1xuICAgICAgICB9LFxuICAgICAgICBzZXQ6IGZ1bmN0aW9uIChhcmcpIHtcbiAgICAgICAgICAgIHRoaXMuX3VybF93aGl0ZWxpc3QgPSBhcmc7XG4gICAgICAgIH0sXG4gICAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxuICAgIH0pO1xuICAgIEFuc2lVcC5wcm90b3R5cGUuc2V0dXBfcGFsZXR0ZXMgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgICAgIHRoaXMuYW5zaV9jb2xvcnMgPVxuICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgICAgICAgeyByZ2I6IFswLCAwLCAwXSwgY2xhc3NfbmFtZTogXCJhbnNpLWJsYWNrXCIgfSxcbiAgICAgICAgICAgICAgICAgICAgeyByZ2I6IFsxODcsIDAsIDBdLCBjbGFzc19uYW1lOiBcImFuc2ktcmVkXCIgfSxcbiAgICAgICAgICAgICAgICAgICAgeyByZ2I6IFswLCAxODcsIDBdLCBjbGFzc19uYW1lOiBcImFuc2ktZ3JlZW5cIiB9LFxuICAgICAgICAgICAgICAgICAgICB7IHJnYjogWzE4NywgMTg3LCAwXSwgY2xhc3NfbmFtZTogXCJhbnNpLXllbGxvd1wiIH0sXG4gICAgICAgICAgICAgICAgICAgIHsgcmdiOiBbMCwgMCwgMTg3XSwgY2xhc3NfbmFtZTogXCJhbnNpLWJsdWVcIiB9LFxuICAgICAgICAgICAgICAgICAgICB7IHJnYjogWzE4NywgMCwgMTg3XSwgY2xhc3NfbmFtZTogXCJhbnNpLW1hZ2VudGFcIiB9LFxuICAgICAgICAgICAgICAgICAgICB7IHJnYjogWzAsIDE4NywgMTg3XSwgY2xhc3NfbmFtZTogXCJhbnNpLWN5YW5cIiB9LFxuICAgICAgICAgICAgICAgICAgICB7IHJnYjogWzI1NSwgMjU1LCAyNTVdLCBjbGFzc19uYW1lOiBcImFuc2ktd2hpdGVcIiB9XG4gICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgICAgIHsgcmdiOiBbODUsIDg1LCA4NV0sIGNsYXNzX25hbWU6IFwiYW5zaS1icmlnaHQtYmxhY2tcIiB9LFxuICAgICAgICAgICAgICAgICAgICB7IHJnYjogWzI1NSwgODUsIDg1XSwgY2xhc3NfbmFtZTogXCJhbnNpLWJyaWdodC1yZWRcIiB9LFxuICAgICAgICAgICAgICAgICAgICB7IHJnYjogWzAsIDI1NSwgMF0sIGNsYXNzX25hbWU6IFwiYW5zaS1icmlnaHQtZ3JlZW5cIiB9LFxuICAgICAgICAgICAgICAgICAgICB7IHJnYjogWzI1NSwgMjU1LCA4NV0sIGNsYXNzX25hbWU6IFwiYW5zaS1icmlnaHQteWVsbG93XCIgfSxcbiAgICAgICAgICAgICAgICAgICAgeyByZ2I6IFs4NSwgODUsIDI1NV0sIGNsYXNzX25hbWU6IFwiYW5zaS1icmlnaHQtYmx1ZVwiIH0sXG4gICAgICAgICAgICAgICAgICAgIHsgcmdiOiBbMjU1LCA4NSwgMjU1XSwgY2xhc3NfbmFtZTogXCJhbnNpLWJyaWdodC1tYWdlbnRhXCIgfSxcbiAgICAgICAgICAgICAgICAgICAgeyByZ2I6IFs4NSwgMjU1LCAyNTVdLCBjbGFzc19uYW1lOiBcImFuc2ktYnJpZ2h0LWN5YW5cIiB9LFxuICAgICAgICAgICAgICAgICAgICB7IHJnYjogWzI1NSwgMjU1LCAyNTVdLCBjbGFzc19uYW1lOiBcImFuc2ktYnJpZ2h0LXdoaXRlXCIgfVxuICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgIF07XG4gICAgICAgIHRoaXMucGFsZXR0ZV8yNTYgPSBbXTtcbiAgICAgICAgdGhpcy5hbnNpX2NvbG9ycy5mb3JFYWNoKGZ1bmN0aW9uIChwYWxldHRlKSB7XG4gICAgICAgICAgICBwYWxldHRlLmZvckVhY2goZnVuY3Rpb24gKHJlYykge1xuICAgICAgICAgICAgICAgIF90aGlzLnBhbGV0dGVfMjU2LnB1c2gocmVjKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICAgICAgdmFyIGxldmVscyA9IFswLCA5NSwgMTM1LCAxNzUsIDIxNSwgMjU1XTtcbiAgICAgICAgZm9yICh2YXIgciA9IDA7IHIgPCA2OyArK3IpIHtcbiAgICAgICAgICAgIGZvciAodmFyIGcgPSAwOyBnIDwgNjsgKytnKSB7XG4gICAgICAgICAgICAgICAgZm9yICh2YXIgYiA9IDA7IGIgPCA2OyArK2IpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGNvbCA9IHsgcmdiOiBbbGV2ZWxzW3JdLCBsZXZlbHNbZ10sIGxldmVsc1tiXV0sIGNsYXNzX25hbWU6ICd0cnVlY29sb3InIH07XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucGFsZXR0ZV8yNTYucHVzaChjb2wpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICB2YXIgZ3JleV9sZXZlbCA9IDg7XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgMjQ7ICsraSwgZ3JleV9sZXZlbCArPSAxMCkge1xuICAgICAgICAgICAgdmFyIGdyeSA9IHsgcmdiOiBbZ3JleV9sZXZlbCwgZ3JleV9sZXZlbCwgZ3JleV9sZXZlbF0sIGNsYXNzX25hbWU6ICd0cnVlY29sb3InIH07XG4gICAgICAgICAgICB0aGlzLnBhbGV0dGVfMjU2LnB1c2goZ3J5KTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgQW5zaVVwLnByb3RvdHlwZS5lc2NhcGVfdHh0X2Zvcl9odG1sID0gZnVuY3Rpb24gKHR4dCkge1xuICAgICAgICByZXR1cm4gdHh0LnJlcGxhY2UoL1smPD5dL2dtLCBmdW5jdGlvbiAoc3RyKSB7XG4gICAgICAgICAgICBpZiAoc3RyID09PSBcIiZcIilcbiAgICAgICAgICAgICAgICByZXR1cm4gXCImYW1wO1wiO1xuICAgICAgICAgICAgaWYgKHN0ciA9PT0gXCI8XCIpXG4gICAgICAgICAgICAgICAgcmV0dXJuIFwiJmx0O1wiO1xuICAgICAgICAgICAgaWYgKHN0ciA9PT0gXCI+XCIpXG4gICAgICAgICAgICAgICAgcmV0dXJuIFwiJmd0O1wiO1xuICAgICAgICB9KTtcbiAgICB9O1xuICAgIEFuc2lVcC5wcm90b3R5cGUuYXBwZW5kX2J1ZmZlciA9IGZ1bmN0aW9uICh0eHQpIHtcbiAgICAgICAgdmFyIHN0ciA9IHRoaXMuX2J1ZmZlciArIHR4dDtcbiAgICAgICAgdGhpcy5fYnVmZmVyID0gc3RyO1xuICAgIH07XG4gICAgQW5zaVVwLnByb3RvdHlwZS5nZXRfbmV4dF9wYWNrZXQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBwa3QgPSB7XG4gICAgICAgICAgICBraW5kOiBQYWNrZXRLaW5kLkVPUyxcbiAgICAgICAgICAgIHRleHQ6ICcnLFxuICAgICAgICAgICAgdXJsOiAnJ1xuICAgICAgICB9O1xuICAgICAgICB2YXIgbGVuID0gdGhpcy5fYnVmZmVyLmxlbmd0aDtcbiAgICAgICAgaWYgKGxlbiA9PSAwKVxuICAgICAgICAgICAgcmV0dXJuIHBrdDtcbiAgICAgICAgdmFyIHBvcyA9IHRoaXMuX2J1ZmZlci5pbmRleE9mKFwiXFx4MUJcIik7XG4gICAgICAgIGlmIChwb3MgPT0gLTEpIHtcbiAgICAgICAgICAgIHBrdC5raW5kID0gUGFja2V0S2luZC5UZXh0O1xuICAgICAgICAgICAgcGt0LnRleHQgPSB0aGlzLl9idWZmZXI7XG4gICAgICAgICAgICB0aGlzLl9idWZmZXIgPSAnJztcbiAgICAgICAgICAgIHJldHVybiBwa3Q7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHBvcyA+IDApIHtcbiAgICAgICAgICAgIHBrdC5raW5kID0gUGFja2V0S2luZC5UZXh0O1xuICAgICAgICAgICAgcGt0LnRleHQgPSB0aGlzLl9idWZmZXIuc2xpY2UoMCwgcG9zKTtcbiAgICAgICAgICAgIHRoaXMuX2J1ZmZlciA9IHRoaXMuX2J1ZmZlci5zbGljZShwb3MpO1xuICAgICAgICAgICAgcmV0dXJuIHBrdDtcbiAgICAgICAgfVxuICAgICAgICBpZiAocG9zID09IDApIHtcbiAgICAgICAgICAgIGlmIChsZW4gPT0gMSkge1xuICAgICAgICAgICAgICAgIHBrdC5raW5kID0gUGFja2V0S2luZC5JbmNvbXBsZXRlO1xuICAgICAgICAgICAgICAgIHJldHVybiBwa3Q7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB2YXIgbmV4dF9jaGFyID0gdGhpcy5fYnVmZmVyLmNoYXJBdCgxKTtcbiAgICAgICAgICAgIGlmICgobmV4dF9jaGFyICE9ICdbJykgJiYgKG5leHRfY2hhciAhPSAnXScpKSB7XG4gICAgICAgICAgICAgICAgcGt0LmtpbmQgPSBQYWNrZXRLaW5kLkVTQztcbiAgICAgICAgICAgICAgICBwa3QudGV4dCA9IHRoaXMuX2J1ZmZlci5zbGljZSgwLCAxKTtcbiAgICAgICAgICAgICAgICB0aGlzLl9idWZmZXIgPSB0aGlzLl9idWZmZXIuc2xpY2UoMSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHBrdDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChuZXh0X2NoYXIgPT0gJ1snKSB7XG4gICAgICAgICAgICAgICAgaWYgKCF0aGlzLl9jc2lfcmVnZXgpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fY3NpX3JlZ2V4ID0gcmd4KF9fbWFrZVRlbXBsYXRlT2JqZWN0KFtcIlxcbiAgICAgICAgICAgICAgICAgICAgICAgIF4gICAgICAgICAgICAgICAgICAgICAgICAgICAjIGJlZ2lubmluZyBvZiBsaW5lXFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICNcXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIyBGaXJzdCBhdHRlbXB0XFxuICAgICAgICAgICAgICAgICAgICAgICAgKD86ICAgICAgICAgICAgICAgICAgICAgICAgICMgbGVnYWwgc2VxdWVuY2VcXG4gICAgICAgICAgICAgICAgICAgICAgICAgIFxcdTAwMUJbICAgICAgICAgICAgICAgICAgICAgICMgQ1NJXFxuICAgICAgICAgICAgICAgICAgICAgICAgICAoWzwtP10/KSAgICAgICAgICAgICAgIyBwcml2YXRlLW1vZGUgY2hhclxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgKFtkO10qKSAgICAgICAgICAgICAgICAgICAgIyBhbnkgZGlnaXRzIG9yIHNlbWljb2xvbnNcXG4gICAgICAgICAgICAgICAgICAgICAgICAgIChbIC0vXT8gICAgICAgICAgICAgICAjIGFuIGludGVybWVkaWF0ZSBtb2RpZmllclxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgW0Atfl0pICAgICAgICAgICAgICAgICMgdGhlIGNvbW1hbmRcXG4gICAgICAgICAgICAgICAgICAgICAgICApXFxuICAgICAgICAgICAgICAgICAgICAgICAgfCAgICAgICAgICAgICAgICAgICAgICAgICAgICMgYWx0ZXJuYXRlIChzZWNvbmQgYXR0ZW1wdClcXG4gICAgICAgICAgICAgICAgICAgICAgICAoPzogICAgICAgICAgICAgICAgICAgICAgICAgIyBpbGxlZ2FsIHNlcXVlbmNlXFxuICAgICAgICAgICAgICAgICAgICAgICAgICBcXHUwMDFCWyAgICAgICAgICAgICAgICAgICAgICAjIENTSVxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgWyAtfl0qICAgICAgICAgICAgICAgICMgYW55dGhpbmcgbGVnYWxcXG4gICAgICAgICAgICAgICAgICAgICAgICAgIChbXFwwLVxcdTAwMUY6XSkgICAgICAgICAgICAgICMgYW55dGhpbmcgaWxsZWdhbFxcbiAgICAgICAgICAgICAgICAgICAgICAgIClcXG4gICAgICAgICAgICAgICAgICAgIFwiXSwgW1wiXFxuICAgICAgICAgICAgICAgICAgICAgICAgXiAgICAgICAgICAgICAgICAgICAgICAgICAgICMgYmVnaW5uaW5nIG9mIGxpbmVcXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgI1xcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAjIEZpcnN0IGF0dGVtcHRcXG4gICAgICAgICAgICAgICAgICAgICAgICAoPzogICAgICAgICAgICAgICAgICAgICAgICAgIyBsZWdhbCBzZXF1ZW5jZVxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgXFxcXHgxYlxcXFxbICAgICAgICAgICAgICAgICAgICAgICMgQ1NJXFxuICAgICAgICAgICAgICAgICAgICAgICAgICAoW1xcXFx4M2MtXFxcXHgzZl0/KSAgICAgICAgICAgICAgIyBwcml2YXRlLW1vZGUgY2hhclxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgKFtcXFxcZDtdKikgICAgICAgICAgICAgICAgICAgICMgYW55IGRpZ2l0cyBvciBzZW1pY29sb25zXFxuICAgICAgICAgICAgICAgICAgICAgICAgICAoW1xcXFx4MjAtXFxcXHgyZl0/ICAgICAgICAgICAgICAgIyBhbiBpbnRlcm1lZGlhdGUgbW9kaWZpZXJcXG4gICAgICAgICAgICAgICAgICAgICAgICAgIFtcXFxceDQwLVxcXFx4N2VdKSAgICAgICAgICAgICAgICAjIHRoZSBjb21tYW5kXFxuICAgICAgICAgICAgICAgICAgICAgICAgKVxcbiAgICAgICAgICAgICAgICAgICAgICAgIHwgICAgICAgICAgICAgICAgICAgICAgICAgICAjIGFsdGVybmF0ZSAoc2Vjb25kIGF0dGVtcHQpXFxuICAgICAgICAgICAgICAgICAgICAgICAgKD86ICAgICAgICAgICAgICAgICAgICAgICAgICMgaWxsZWdhbCBzZXF1ZW5jZVxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgXFxcXHgxYlxcXFxbICAgICAgICAgICAgICAgICAgICAgICMgQ1NJXFxuICAgICAgICAgICAgICAgICAgICAgICAgICBbXFxcXHgyMC1cXFxceDdlXSogICAgICAgICAgICAgICAgIyBhbnl0aGluZyBsZWdhbFxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgKFtcXFxceDAwLVxcXFx4MWY6XSkgICAgICAgICAgICAgICMgYW55dGhpbmcgaWxsZWdhbFxcbiAgICAgICAgICAgICAgICAgICAgICAgIClcXG4gICAgICAgICAgICAgICAgICAgIFwiXSkpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB2YXIgbWF0Y2ggPSB0aGlzLl9idWZmZXIubWF0Y2godGhpcy5fY3NpX3JlZ2V4KTtcbiAgICAgICAgICAgICAgICBpZiAobWF0Y2ggPT09IG51bGwpIHtcbiAgICAgICAgICAgICAgICAgICAgcGt0LmtpbmQgPSBQYWNrZXRLaW5kLkluY29tcGxldGU7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBwa3Q7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmIChtYXRjaFs0XSkge1xuICAgICAgICAgICAgICAgICAgICBwa3Qua2luZCA9IFBhY2tldEtpbmQuRVNDO1xuICAgICAgICAgICAgICAgICAgICBwa3QudGV4dCA9IHRoaXMuX2J1ZmZlci5zbGljZSgwLCAxKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fYnVmZmVyID0gdGhpcy5fYnVmZmVyLnNsaWNlKDEpO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcGt0O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAoKG1hdGNoWzFdICE9ICcnKSB8fCAobWF0Y2hbM10gIT0gJ20nKSlcbiAgICAgICAgICAgICAgICAgICAgcGt0LmtpbmQgPSBQYWNrZXRLaW5kLlVua25vd247XG4gICAgICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgICAgICBwa3Qua2luZCA9IFBhY2tldEtpbmQuU0dSO1xuICAgICAgICAgICAgICAgIHBrdC50ZXh0ID0gbWF0Y2hbMl07XG4gICAgICAgICAgICAgICAgdmFyIHJwb3MgPSBtYXRjaFswXS5sZW5ndGg7XG4gICAgICAgICAgICAgICAgdGhpcy5fYnVmZmVyID0gdGhpcy5fYnVmZmVyLnNsaWNlKHJwb3MpO1xuICAgICAgICAgICAgICAgIHJldHVybiBwa3Q7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAobmV4dF9jaGFyID09ICddJykge1xuICAgICAgICAgICAgICAgIGlmIChsZW4gPCA0KSB7XG4gICAgICAgICAgICAgICAgICAgIHBrdC5raW5kID0gUGFja2V0S2luZC5JbmNvbXBsZXRlO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcGt0O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAoKHRoaXMuX2J1ZmZlci5jaGFyQXQoMikgIT0gJzgnKVxuICAgICAgICAgICAgICAgICAgICB8fCAodGhpcy5fYnVmZmVyLmNoYXJBdCgzKSAhPSAnOycpKSB7XG4gICAgICAgICAgICAgICAgICAgIHBrdC5raW5kID0gUGFja2V0S2luZC5FU0M7XG4gICAgICAgICAgICAgICAgICAgIHBrdC50ZXh0ID0gdGhpcy5fYnVmZmVyLnNsaWNlKDAsIDEpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9idWZmZXIgPSB0aGlzLl9idWZmZXIuc2xpY2UoMSk7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBwa3Q7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmICghdGhpcy5fb3NjX3N0KSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX29zY19zdCA9IHJneEcoX19tYWtlVGVtcGxhdGVPYmplY3QoW1wiXFxuICAgICAgICAgICAgICAgICAgICAgICAgKD86ICAgICAgICAgICAgICAgICAgICAgICAgICMgbGVnYWwgc2VxdWVuY2VcXG4gICAgICAgICAgICAgICAgICAgICAgICAgIChcXHUwMDFCXFxcXCkgICAgICAgICAgICAgICAgICAgICMgRVNDICAgICAgICAgICAgICAgICAgICAgICAgICAgfCAgICAgICAgICAgICAgICAgICAgICAgICAgICMgYWx0ZXJuYXRlXFxuICAgICAgICAgICAgICAgICAgICAgICAgICAoXFx1MDAwNykgICAgICAgICAgICAgICAgICAgICAgIyBCRUwgKHdoYXQgeHRlcm0gZGlkKVxcbiAgICAgICAgICAgICAgICAgICAgICAgIClcXG4gICAgICAgICAgICAgICAgICAgICAgICB8ICAgICAgICAgICAgICAgICAgICAgICAgICAgIyBhbHRlcm5hdGUgKHNlY29uZCBhdHRlbXB0KVxcbiAgICAgICAgICAgICAgICAgICAgICAgICggICAgICAgICAgICAgICAgICAgICAgICAgICAjIGlsbGVnYWwgc2VxdWVuY2VcXG4gICAgICAgICAgICAgICAgICAgICAgICAgIFtcXDAtXFx1MDAwNl0gICAgICAgICAgICAgICAgICMgYW55dGhpbmcgaWxsZWdhbFxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgfCAgICAgICAgICAgICAgICAgICAgICAgICAgICMgYWx0ZXJuYXRlXFxuICAgICAgICAgICAgICAgICAgICAgICAgICBbXFxiLVxcdTAwMUFdICAgICAgICAgICAgICAgICAjIGFueXRoaW5nIGlsbGVnYWxcXG4gICAgICAgICAgICAgICAgICAgICAgICAgIHwgICAgICAgICAgICAgICAgICAgICAgICAgICAjIGFsdGVybmF0ZVxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgW1xcdTAwMUMtXFx1MDAxRl0gICAgICAgICAgICAgICAgICMgYW55dGhpbmcgaWxsZWdhbFxcbiAgICAgICAgICAgICAgICAgICAgICAgIClcXG4gICAgICAgICAgICAgICAgICAgIFwiXSwgW1wiXFxuICAgICAgICAgICAgICAgICAgICAgICAgKD86ICAgICAgICAgICAgICAgICAgICAgICAgICMgbGVnYWwgc2VxdWVuY2VcXG4gICAgICAgICAgICAgICAgICAgICAgICAgIChcXFxceDFiXFxcXFxcXFwpICAgICAgICAgICAgICAgICAgICAjIEVTQyBcXFxcXFxuICAgICAgICAgICAgICAgICAgICAgICAgICB8ICAgICAgICAgICAgICAgICAgICAgICAgICAgIyBhbHRlcm5hdGVcXG4gICAgICAgICAgICAgICAgICAgICAgICAgIChcXFxceDA3KSAgICAgICAgICAgICAgICAgICAgICAjIEJFTCAod2hhdCB4dGVybSBkaWQpXFxuICAgICAgICAgICAgICAgICAgICAgICAgKVxcbiAgICAgICAgICAgICAgICAgICAgICAgIHwgICAgICAgICAgICAgICAgICAgICAgICAgICAjIGFsdGVybmF0ZSAoc2Vjb25kIGF0dGVtcHQpXFxuICAgICAgICAgICAgICAgICAgICAgICAgKCAgICAgICAgICAgICAgICAgICAgICAgICAgICMgaWxsZWdhbCBzZXF1ZW5jZVxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgW1xcXFx4MDAtXFxcXHgwNl0gICAgICAgICAgICAgICAgICMgYW55dGhpbmcgaWxsZWdhbFxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgfCAgICAgICAgICAgICAgICAgICAgICAgICAgICMgYWx0ZXJuYXRlXFxuICAgICAgICAgICAgICAgICAgICAgICAgICBbXFxcXHgwOC1cXFxceDFhXSAgICAgICAgICAgICAgICAgIyBhbnl0aGluZyBpbGxlZ2FsXFxuICAgICAgICAgICAgICAgICAgICAgICAgICB8ICAgICAgICAgICAgICAgICAgICAgICAgICAgIyBhbHRlcm5hdGVcXG4gICAgICAgICAgICAgICAgICAgICAgICAgIFtcXFxceDFjLVxcXFx4MWZdICAgICAgICAgICAgICAgICAjIGFueXRoaW5nIGlsbGVnYWxcXG4gICAgICAgICAgICAgICAgICAgICAgICApXFxuICAgICAgICAgICAgICAgICAgICBcIl0pKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdGhpcy5fb3NjX3N0Lmxhc3RJbmRleCA9IDA7XG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICB2YXIgbWF0Y2hfMSA9IHRoaXMuX29zY19zdC5leGVjKHRoaXMuX2J1ZmZlcik7XG4gICAgICAgICAgICAgICAgICAgIGlmIChtYXRjaF8xID09PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBwa3Qua2luZCA9IFBhY2tldEtpbmQuSW5jb21wbGV0ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBwa3Q7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgaWYgKG1hdGNoXzFbM10pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHBrdC5raW5kID0gUGFja2V0S2luZC5FU0M7XG4gICAgICAgICAgICAgICAgICAgICAgICBwa3QudGV4dCA9IHRoaXMuX2J1ZmZlci5zbGljZSgwLCAxKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2J1ZmZlciA9IHRoaXMuX2J1ZmZlci5zbGljZSgxKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBwa3Q7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICB2YXIgbWF0Y2hfMiA9IHRoaXMuX29zY19zdC5leGVjKHRoaXMuX2J1ZmZlcik7XG4gICAgICAgICAgICAgICAgICAgIGlmIChtYXRjaF8yID09PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBwa3Qua2luZCA9IFBhY2tldEtpbmQuSW5jb21wbGV0ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBwa3Q7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgaWYgKG1hdGNoXzJbM10pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHBrdC5raW5kID0gUGFja2V0S2luZC5FU0M7XG4gICAgICAgICAgICAgICAgICAgICAgICBwa3QudGV4dCA9IHRoaXMuX2J1ZmZlci5zbGljZSgwLCAxKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2J1ZmZlciA9IHRoaXMuX2J1ZmZlci5zbGljZSgxKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBwa3Q7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKCF0aGlzLl9vc2NfcmVnZXgpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fb3NjX3JlZ2V4ID0gcmd4KF9fbWFrZVRlbXBsYXRlT2JqZWN0KFtcIlxcbiAgICAgICAgICAgICAgICAgICAgICAgIF4gICAgICAgICAgICAgICAgICAgICAgICAgICAjIGJlZ2lubmluZyBvZiBsaW5lXFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICNcXG4gICAgICAgICAgICAgICAgICAgICAgICBcXHUwMDFCXTg7ICAgICAgICAgICAgICAgICAgICAjIE9TQyBIeXBlcmxpbmtcXG4gICAgICAgICAgICAgICAgICAgICAgICBbIC06PC1+XSogICAgICAgIyBwYXJhbXMgKGV4Y2x1ZGluZyA7KVxcbiAgICAgICAgICAgICAgICAgICAgICAgIDsgICAgICAgICAgICAgICAgICAgICAgICAgICAjIGVuZCBvZiBwYXJhbXNcXG4gICAgICAgICAgICAgICAgICAgICAgICAoWyEtfl17MCw1MTJ9KSAgICAgICAgIyBVUkwgY2FwdHVyZVxcbiAgICAgICAgICAgICAgICAgICAgICAgICg/OiAgICAgICAgICAgICAgICAgICAgICAgICAjIFNUXFxuICAgICAgICAgICAgICAgICAgICAgICAgICAoPzpcXHUwMDFCXFxcXCkgICAgICAgICAgICAgICAgICAjIEVTQyAgICAgICAgICAgICAgICAgICAgICAgICAgIHwgICAgICAgICAgICAgICAgICAgICAgICAgICAjIGFsdGVybmF0ZVxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgKD86XFx1MDAwNykgICAgICAgICAgICAgICAgICAgICMgQkVMICh3aGF0IHh0ZXJtIGRpZClcXG4gICAgICAgICAgICAgICAgICAgICAgICApXFxuICAgICAgICAgICAgICAgICAgICAgICAgKFshLX5dKykgICAgICAgICAgICAgICMgVEVYVCBjYXB0dXJlXFxuICAgICAgICAgICAgICAgICAgICAgICAgXFx1MDAxQl04OzsgICAgICAgICAgICAgICAgICAgIyBPU0MgSHlwZXJsaW5rIEVuZFxcbiAgICAgICAgICAgICAgICAgICAgICAgICg/OiAgICAgICAgICAgICAgICAgICAgICAgICAjIFNUXFxuICAgICAgICAgICAgICAgICAgICAgICAgICAoPzpcXHUwMDFCXFxcXCkgICAgICAgICAgICAgICAgICAjIEVTQyAgICAgICAgICAgICAgICAgICAgICAgICAgIHwgICAgICAgICAgICAgICAgICAgICAgICAgICAjIGFsdGVybmF0ZVxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgKD86XFx1MDAwNykgICAgICAgICAgICAgICAgICAgICMgQkVMICh3aGF0IHh0ZXJtIGRpZClcXG4gICAgICAgICAgICAgICAgICAgICAgICApXFxuICAgICAgICAgICAgICAgICAgICBcIl0sIFtcIlxcbiAgICAgICAgICAgICAgICAgICAgICAgIF4gICAgICAgICAgICAgICAgICAgICAgICAgICAjIGJlZ2lubmluZyBvZiBsaW5lXFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICNcXG4gICAgICAgICAgICAgICAgICAgICAgICBcXFxceDFiXFxcXF04OyAgICAgICAgICAgICAgICAgICAgIyBPU0MgSHlwZXJsaW5rXFxuICAgICAgICAgICAgICAgICAgICAgICAgW1xcXFx4MjAtXFxcXHgzYVxcXFx4M2MtXFxcXHg3ZV0qICAgICAgICMgcGFyYW1zIChleGNsdWRpbmcgOylcXG4gICAgICAgICAgICAgICAgICAgICAgICA7ICAgICAgICAgICAgICAgICAgICAgICAgICAgIyBlbmQgb2YgcGFyYW1zXFxuICAgICAgICAgICAgICAgICAgICAgICAgKFtcXFxceDIxLVxcXFx4N2VdezAsNTEyfSkgICAgICAgICMgVVJMIGNhcHR1cmVcXG4gICAgICAgICAgICAgICAgICAgICAgICAoPzogICAgICAgICAgICAgICAgICAgICAgICAgIyBTVFxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgKD86XFxcXHgxYlxcXFxcXFxcKSAgICAgICAgICAgICAgICAgICMgRVNDIFxcXFxcXG4gICAgICAgICAgICAgICAgICAgICAgICAgIHwgICAgICAgICAgICAgICAgICAgICAgICAgICAjIGFsdGVybmF0ZVxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgKD86XFxcXHgwNykgICAgICAgICAgICAgICAgICAgICMgQkVMICh3aGF0IHh0ZXJtIGRpZClcXG4gICAgICAgICAgICAgICAgICAgICAgICApXFxuICAgICAgICAgICAgICAgICAgICAgICAgKFtcXFxceDIxLVxcXFx4N2VdKykgICAgICAgICAgICAgICMgVEVYVCBjYXB0dXJlXFxuICAgICAgICAgICAgICAgICAgICAgICAgXFxcXHgxYlxcXFxdODs7ICAgICAgICAgICAgICAgICAgICMgT1NDIEh5cGVybGluayBFbmRcXG4gICAgICAgICAgICAgICAgICAgICAgICAoPzogICAgICAgICAgICAgICAgICAgICAgICAgIyBTVFxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgKD86XFxcXHgxYlxcXFxcXFxcKSAgICAgICAgICAgICAgICAgICMgRVNDIFxcXFxcXG4gICAgICAgICAgICAgICAgICAgICAgICAgIHwgICAgICAgICAgICAgICAgICAgICAgICAgICAjIGFsdGVybmF0ZVxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgKD86XFxcXHgwNykgICAgICAgICAgICAgICAgICAgICMgQkVMICh3aGF0IHh0ZXJtIGRpZClcXG4gICAgICAgICAgICAgICAgICAgICAgICApXFxuICAgICAgICAgICAgICAgICAgICBcIl0pKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdmFyIG1hdGNoID0gdGhpcy5fYnVmZmVyLm1hdGNoKHRoaXMuX29zY19yZWdleCk7XG4gICAgICAgICAgICAgICAgaWYgKG1hdGNoID09PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgICAgIHBrdC5raW5kID0gUGFja2V0S2luZC5FU0M7XG4gICAgICAgICAgICAgICAgICAgIHBrdC50ZXh0ID0gdGhpcy5fYnVmZmVyLnNsaWNlKDAsIDEpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9idWZmZXIgPSB0aGlzLl9idWZmZXIuc2xpY2UoMSk7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBwa3Q7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHBrdC5raW5kID0gUGFja2V0S2luZC5PU0NVUkw7XG4gICAgICAgICAgICAgICAgcGt0LnVybCA9IG1hdGNoWzFdO1xuICAgICAgICAgICAgICAgIHBrdC50ZXh0ID0gbWF0Y2hbMl07XG4gICAgICAgICAgICAgICAgdmFyIHJwb3MgPSBtYXRjaFswXS5sZW5ndGg7XG4gICAgICAgICAgICAgICAgdGhpcy5fYnVmZmVyID0gdGhpcy5fYnVmZmVyLnNsaWNlKHJwb3MpO1xuICAgICAgICAgICAgICAgIHJldHVybiBwa3Q7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9O1xuICAgIEFuc2lVcC5wcm90b3R5cGUuYW5zaV90b19odG1sID0gZnVuY3Rpb24gKHR4dCkge1xuICAgICAgICB0aGlzLmFwcGVuZF9idWZmZXIodHh0KTtcbiAgICAgICAgdmFyIGJsb2NrcyA9IFtdO1xuICAgICAgICB3aGlsZSAodHJ1ZSkge1xuICAgICAgICAgICAgdmFyIHBhY2tldCA9IHRoaXMuZ2V0X25leHRfcGFja2V0KCk7XG4gICAgICAgICAgICBpZiAoKHBhY2tldC5raW5kID09IFBhY2tldEtpbmQuRU9TKVxuICAgICAgICAgICAgICAgIHx8IChwYWNrZXQua2luZCA9PSBQYWNrZXRLaW5kLkluY29tcGxldGUpKVxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgaWYgKChwYWNrZXQua2luZCA9PSBQYWNrZXRLaW5kLkVTQylcbiAgICAgICAgICAgICAgICB8fCAocGFja2V0LmtpbmQgPT0gUGFja2V0S2luZC5Vbmtub3duKSlcbiAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgIGlmIChwYWNrZXQua2luZCA9PSBQYWNrZXRLaW5kLlRleHQpXG4gICAgICAgICAgICAgICAgYmxvY2tzLnB1c2godGhpcy50cmFuc2Zvcm1fdG9faHRtbCh0aGlzLndpdGhfc3RhdGUocGFja2V0KSkpO1xuICAgICAgICAgICAgZWxzZSBpZiAocGFja2V0LmtpbmQgPT0gUGFja2V0S2luZC5TR1IpXG4gICAgICAgICAgICAgICAgdGhpcy5wcm9jZXNzX2Fuc2kocGFja2V0KTtcbiAgICAgICAgICAgIGVsc2UgaWYgKHBhY2tldC5raW5kID09IFBhY2tldEtpbmQuT1NDVVJMKVxuICAgICAgICAgICAgICAgIGJsb2Nrcy5wdXNoKHRoaXMucHJvY2Vzc19oeXBlcmxpbmsocGFja2V0KSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGJsb2Nrcy5qb2luKFwiXCIpO1xuICAgIH07XG4gICAgQW5zaVVwLnByb3RvdHlwZS53aXRoX3N0YXRlID0gZnVuY3Rpb24gKHBrdCkge1xuICAgICAgICByZXR1cm4geyBib2xkOiB0aGlzLmJvbGQsIGZnOiB0aGlzLmZnLCBiZzogdGhpcy5iZywgdGV4dDogcGt0LnRleHQgfTtcbiAgICB9O1xuICAgIEFuc2lVcC5wcm90b3R5cGUucHJvY2Vzc19hbnNpID0gZnVuY3Rpb24gKHBrdCkge1xuICAgICAgICB2YXIgc2dyX2NtZHMgPSBwa3QudGV4dC5zcGxpdCgnOycpO1xuICAgICAgICB3aGlsZSAoc2dyX2NtZHMubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgdmFyIHNncl9jbWRfc3RyID0gc2dyX2NtZHMuc2hpZnQoKTtcbiAgICAgICAgICAgIHZhciBudW0gPSBwYXJzZUludChzZ3JfY21kX3N0ciwgMTApO1xuICAgICAgICAgICAgaWYgKGlzTmFOKG51bSkgfHwgbnVtID09PSAwKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5mZyA9IHRoaXMuYmcgPSBudWxsO1xuICAgICAgICAgICAgICAgIHRoaXMuYm9sZCA9IGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAobnVtID09PSAxKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5ib2xkID0gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKG51bSA9PT0gMjIpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmJvbGQgPSBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKG51bSA9PT0gMzkpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmZnID0gbnVsbDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKG51bSA9PT0gNDkpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmJnID0gbnVsbDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKChudW0gPj0gMzApICYmIChudW0gPCAzOCkpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmZnID0gdGhpcy5hbnNpX2NvbG9yc1swXVsobnVtIC0gMzApXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKChudW0gPj0gNDApICYmIChudW0gPCA0OCkpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmJnID0gdGhpcy5hbnNpX2NvbG9yc1swXVsobnVtIC0gNDApXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKChudW0gPj0gOTApICYmIChudW0gPCA5OCkpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmZnID0gdGhpcy5hbnNpX2NvbG9yc1sxXVsobnVtIC0gOTApXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKChudW0gPj0gMTAwKSAmJiAobnVtIDwgMTA4KSkge1xuICAgICAgICAgICAgICAgIHRoaXMuYmcgPSB0aGlzLmFuc2lfY29sb3JzWzFdWyhudW0gLSAxMDApXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKG51bSA9PT0gMzggfHwgbnVtID09PSA0OCkge1xuICAgICAgICAgICAgICAgIGlmIChzZ3JfY21kcy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBpc19mb3JlZ3JvdW5kID0gKG51bSA9PT0gMzgpO1xuICAgICAgICAgICAgICAgICAgICB2YXIgbW9kZV9jbWQgPSBzZ3JfY21kcy5zaGlmdCgpO1xuICAgICAgICAgICAgICAgICAgICBpZiAobW9kZV9jbWQgPT09ICc1JyAmJiBzZ3JfY21kcy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgcGFsZXR0ZV9pbmRleCA9IHBhcnNlSW50KHNncl9jbWRzLnNoaWZ0KCksIDEwKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChwYWxldHRlX2luZGV4ID49IDAgJiYgcGFsZXR0ZV9pbmRleCA8PSAyNTUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoaXNfZm9yZWdyb3VuZClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5mZyA9IHRoaXMucGFsZXR0ZV8yNTZbcGFsZXR0ZV9pbmRleF07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmJnID0gdGhpcy5wYWxldHRlXzI1NltwYWxldHRlX2luZGV4XTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBpZiAobW9kZV9jbWQgPT09ICcyJyAmJiBzZ3JfY21kcy5sZW5ndGggPiAyKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgciA9IHBhcnNlSW50KHNncl9jbWRzLnNoaWZ0KCksIDEwKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBnID0gcGFyc2VJbnQoc2dyX2NtZHMuc2hpZnQoKSwgMTApO1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGIgPSBwYXJzZUludChzZ3JfY21kcy5zaGlmdCgpLCAxMCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoKHIgPj0gMCAmJiByIDw9IDI1NSkgJiYgKGcgPj0gMCAmJiBnIDw9IDI1NSkgJiYgKGIgPj0gMCAmJiBiIDw9IDI1NSkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgYyA9IHsgcmdiOiBbciwgZywgYl0sIGNsYXNzX25hbWU6ICd0cnVlY29sb3InIH07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGlzX2ZvcmVncm91bmQpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZmcgPSBjO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5iZyA9IGM7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9O1xuICAgIEFuc2lVcC5wcm90b3R5cGUudHJhbnNmb3JtX3RvX2h0bWwgPSBmdW5jdGlvbiAoZnJhZ21lbnQpIHtcbiAgICAgICAgdmFyIHR4dCA9IGZyYWdtZW50LnRleHQ7XG4gICAgICAgIGlmICh0eHQubGVuZ3RoID09PSAwKVxuICAgICAgICAgICAgcmV0dXJuIHR4dDtcbiAgICAgICAgaWYgKHRoaXMuX2VzY2FwZV9mb3JfaHRtbClcbiAgICAgICAgICAgIHR4dCA9IHRoaXMuZXNjYXBlX3R4dF9mb3JfaHRtbCh0eHQpO1xuICAgICAgICBpZiAoIWZyYWdtZW50LmJvbGQgJiYgZnJhZ21lbnQuZmcgPT09IG51bGwgJiYgZnJhZ21lbnQuYmcgPT09IG51bGwpXG4gICAgICAgICAgICByZXR1cm4gdHh0O1xuICAgICAgICB2YXIgc3R5bGVzID0gW107XG4gICAgICAgIHZhciBjbGFzc2VzID0gW107XG4gICAgICAgIHZhciBmZyA9IGZyYWdtZW50LmZnO1xuICAgICAgICB2YXIgYmcgPSBmcmFnbWVudC5iZztcbiAgICAgICAgaWYgKGZyYWdtZW50LmJvbGQpXG4gICAgICAgICAgICBzdHlsZXMucHVzaCgnZm9udC13ZWlnaHQ6Ym9sZCcpO1xuICAgICAgICBpZiAoIXRoaXMuX3VzZV9jbGFzc2VzKSB7XG4gICAgICAgICAgICBpZiAoZmcpXG4gICAgICAgICAgICAgICAgc3R5bGVzLnB1c2goXCJjb2xvcjpyZ2IoXCIgKyBmZy5yZ2Iuam9pbignLCcpICsgXCIpXCIpO1xuICAgICAgICAgICAgaWYgKGJnKVxuICAgICAgICAgICAgICAgIHN0eWxlcy5wdXNoKFwiYmFja2dyb3VuZC1jb2xvcjpyZ2IoXCIgKyBiZy5yZ2IgKyBcIilcIik7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBpZiAoZmcpIHtcbiAgICAgICAgICAgICAgICBpZiAoZmcuY2xhc3NfbmFtZSAhPT0gJ3RydWVjb2xvcicpIHtcbiAgICAgICAgICAgICAgICAgICAgY2xhc3Nlcy5wdXNoKGZnLmNsYXNzX25hbWUgKyBcIi1mZ1wiKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHN0eWxlcy5wdXNoKFwiY29sb3I6cmdiKFwiICsgZmcucmdiLmpvaW4oJywnKSArIFwiKVwiKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoYmcpIHtcbiAgICAgICAgICAgICAgICBpZiAoYmcuY2xhc3NfbmFtZSAhPT0gJ3RydWVjb2xvcicpIHtcbiAgICAgICAgICAgICAgICAgICAgY2xhc3Nlcy5wdXNoKGJnLmNsYXNzX25hbWUgKyBcIi1iZ1wiKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHN0eWxlcy5wdXNoKFwiYmFja2dyb3VuZC1jb2xvcjpyZ2IoXCIgKyBiZy5yZ2Iuam9pbignLCcpICsgXCIpXCIpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICB2YXIgY2xhc3Nfc3RyaW5nID0gJyc7XG4gICAgICAgIHZhciBzdHlsZV9zdHJpbmcgPSAnJztcbiAgICAgICAgaWYgKGNsYXNzZXMubGVuZ3RoKVxuICAgICAgICAgICAgY2xhc3Nfc3RyaW5nID0gXCIgY2xhc3M9XFxcIlwiICsgY2xhc3Nlcy5qb2luKCcgJykgKyBcIlxcXCJcIjtcbiAgICAgICAgaWYgKHN0eWxlcy5sZW5ndGgpXG4gICAgICAgICAgICBzdHlsZV9zdHJpbmcgPSBcIiBzdHlsZT1cXFwiXCIgKyBzdHlsZXMuam9pbignOycpICsgXCJcXFwiXCI7XG4gICAgICAgIHJldHVybiBcIjxzcGFuXCIgKyBzdHlsZV9zdHJpbmcgKyBjbGFzc19zdHJpbmcgKyBcIj5cIiArIHR4dCArIFwiPC9zcGFuPlwiO1xuICAgIH07XG4gICAgO1xuICAgIEFuc2lVcC5wcm90b3R5cGUucHJvY2Vzc19oeXBlcmxpbmsgPSBmdW5jdGlvbiAocGt0KSB7XG4gICAgICAgIHZhciBwYXJ0cyA9IHBrdC51cmwuc3BsaXQoJzonKTtcbiAgICAgICAgaWYgKHBhcnRzLmxlbmd0aCA8IDEpXG4gICAgICAgICAgICByZXR1cm4gJyc7XG4gICAgICAgIGlmICghdGhpcy5fdXJsX3doaXRlbGlzdFtwYXJ0c1swXV0pXG4gICAgICAgICAgICByZXR1cm4gJyc7XG4gICAgICAgIHZhciByZXN1bHQgPSBcIjxhIGhyZWY9XFxcIlwiICsgdGhpcy5lc2NhcGVfdHh0X2Zvcl9odG1sKHBrdC51cmwpICsgXCJcXFwiPlwiICsgdGhpcy5lc2NhcGVfdHh0X2Zvcl9odG1sKHBrdC50ZXh0KSArIFwiPC9hPlwiO1xuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH07XG4gICAgcmV0dXJuIEFuc2lVcDtcbn0oKSk7XG5mdW5jdGlvbiByZ3godG1wbE9iaikge1xuICAgIHZhciBzdWJzdCA9IFtdO1xuICAgIGZvciAodmFyIF9pID0gMTsgX2kgPCBhcmd1bWVudHMubGVuZ3RoOyBfaSsrKSB7XG4gICAgICAgIHN1YnN0W19pIC0gMV0gPSBhcmd1bWVudHNbX2ldO1xuICAgIH1cbiAgICB2YXIgcmVnZXhUZXh0ID0gdG1wbE9iai5yYXdbMF07XG4gICAgdmFyIHdzcmd4ID0gL15cXHMrfFxccytcXG58XFxzKiNbXFxzXFxTXSo/XFxufFxcbi9nbTtcbiAgICB2YXIgdHh0MiA9IHJlZ2V4VGV4dC5yZXBsYWNlKHdzcmd4LCAnJyk7XG4gICAgcmV0dXJuIG5ldyBSZWdFeHAodHh0Mik7XG59XG5mdW5jdGlvbiByZ3hHKHRtcGxPYmopIHtcbiAgICB2YXIgc3Vic3QgPSBbXTtcbiAgICBmb3IgKHZhciBfaSA9IDE7IF9pIDwgYXJndW1lbnRzLmxlbmd0aDsgX2krKykge1xuICAgICAgICBzdWJzdFtfaSAtIDFdID0gYXJndW1lbnRzW19pXTtcbiAgICB9XG4gICAgdmFyIHJlZ2V4VGV4dCA9IHRtcGxPYmoucmF3WzBdO1xuICAgIHZhciB3c3JneCA9IC9eXFxzK3xcXHMrXFxufFxccyojW1xcc1xcU10qP1xcbnxcXG4vZ207XG4gICAgdmFyIHR4dDIgPSByZWdleFRleHQucmVwbGFjZSh3c3JneCwgJycpO1xuICAgIHJldHVybiBuZXcgUmVnRXhwKHR4dDIsICdnJyk7XG59XG4vLyMgc291cmNlTWFwcGluZ1VSTD1hbnNpX3VwLmpzLm1hcFxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbiAgICBleHBvcnRzLmRlZmF1bHQgPSBBbnNpVXA7XG59KSk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9ub2RlX21vZHVsZXMvYW5zaV91cC9hbnNpX3VwLmpzIiwiaW1wb3J0IHsgU2VydmljZSB9IGZyb20gXCIuLi9jb21tb24vYXBpXCI7XG5cbmNvbnN0IEJBU0VfVVJMID0gXCIvemVyb2JvdC9hbGVydGEvYWN0b3JzL2FsZXJ0YVwiO1xuXG5jbGFzcyBBbGVydHNTZXJ2aWNlIGV4dGVuZHMgU2VydmljZSB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHN1cGVyKEJBU0VfVVJMKTtcbiAgICB9XG5cbiAgICBsaXN0KCkge1xuICAgICAgICByZXR1cm4gdGhpcy5nZXRDYWxsKFwibGlzdF9hbGVydHNcIik7XG4gICAgfVxuXG4gICAgZGVsZXRlKGlkZW50aWZpZXJzKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnBvc3RDYWxsKFwiZGVsZXRlX2FsZXJ0c1wiLCB7XG4gICAgICAgICAgICBpZGVudGlmaWVyczogaWRlbnRpZmllcnNcbiAgICAgICAgfSk7XG4gICAgfVxufVxuXG5leHBvcnQgY29uc3QgYWxlcnRzID0gbmV3IEFsZXJ0c1NlcnZpY2UoKTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NvdXJjZXMvc2VydmljZXMvYWxlcnRzLmpzIiwiaW1wb3J0IHsgU2VydmljZSB9IGZyb20gXCIuLi9jb21tb24vYXBpXCI7XG5cbmNvbnN0IEJBU0VfVVJMID0gXCIvemVyb2JvdC9hZG1pbi9hY3RvcnMvbG9nc1wiO1xuXG5jbGFzcyBMb2dzU2VydmljZSBleHRlbmRzIFNlcnZpY2Uge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICBzdXBlcihCQVNFX1VSTCk7XG4gICAgfVxuXG4gICAgbGlzdEFwcHMoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmdldENhbGwoXCJsaXN0X2FwcHNcIik7XG4gICAgfVxuXG4gICAgbGlzdChhcHBOYW1lLCBsb2dJZCkge1xuICAgICAgICByZXR1cm4gdGhpcy5wb3N0Q2FsbChcImxpc3RcIiwge1xuICAgICAgICAgICAgYXBwbmFtZTogYXBwTmFtZSxcbiAgICAgICAgICAgIGlkX2Zyb206IGxvZ0lkXG4gICAgICAgIH0pO1xuICAgIH1cbn1cblxuZXhwb3J0IGNvbnN0IGxvZ3MgPSBuZXcgTG9nc1NlcnZpY2UoKTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NvdXJjZXMvc2VydmljZXMvbG9ncy5qcyIsImV4cG9ydCBmdW5jdGlvbiBpbnB1dERpYWxvZyhoZWFkLCBsYWJlbCwgYnV0dG9uTGFiZWwsIGNhbGxiYWNrKSB7XG4gICAgY29uc3Qgd2luZG93ID0gd2ViaXgudWkoe1xuICAgICAgICB2aWV3OiBcIndpbmRvd1wiLFxuICAgICAgICBoZWlnaHQ6IDIwMCxcbiAgICAgICAgd2lkdGg6IDMwMCxcbiAgICAgICAgbW9kYWw6IHRydWUsXG4gICAgICAgIHBvc2l0aW9uOiBcImNlbnRlclwiLFxuICAgICAgICBoZWFkOiBoZWFkIHx8IFwiSW5wdXRcIixcbiAgICAgICAgYm9keToge1xuICAgICAgICAgICAgdmlldzogXCJmb3JtXCIsXG4gICAgICAgICAgICBlbGVtZW50czogW3tcbiAgICAgICAgICAgICAgICBpZDogXCJpbnB1dF9kaWFsb2dfdGV4dFwiLFxuICAgICAgICAgICAgICAgIHZpZXc6IFwidGV4dFwiLFxuICAgICAgICAgICAgICAgIG5hbWU6IFwiaW5wdXRcIixcbiAgICAgICAgICAgICAgICBsYWJlbDogbGFiZWwgfHwgXCJWYWx1ZVwiLFxuICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIGNvbHM6IFt7XG4gICAgICAgICAgICAgICAgICAgIHZpZXc6IFwiYnV0dG9uXCIsXG4gICAgICAgICAgICAgICAgICAgIGxhYmVsOiBcIkNhbmNlbFwiLFxuICAgICAgICAgICAgICAgICAgICBjbGljazogKCkgPT4gd2luZG93LmhpZGUoKSxcbiAgICAgICAgICAgICAgICAgICAgY3NzOiBcIndlYml4X2RhbmdlclwiXG4gICAgICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgICAgICB2aWV3OiBcImJ1dHRvblwiLFxuICAgICAgICAgICAgICAgICAgICBsYWJlbDogYnV0dG9uTGFiZWwgfHwgXCJPa1wiLFxuICAgICAgICAgICAgICAgICAgICBjbGljazogaGFuZGxlSW5wdXQsXG4gICAgICAgICAgICAgICAgICAgIGNzczogXCJ3ZWJpeF9wcmltYXJ5XCJcbiAgICAgICAgICAgICAgICB9XVxuICAgICAgICAgICAgfV1cbiAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgZnVuY3Rpb24gaGFuZGxlSW5wdXQoKSB7XG4gICAgICAgIGNvbnN0IHZhbHVlID0gdGhpcy5nZXRGb3JtVmlldygpLmVsZW1lbnRzLmlucHV0LmdldFZhbHVlKCkudHJpbSgpO1xuICAgICAgICBpZiAoIXZhbHVlKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoY2FsbGJhY2sgaW5zdGFuY2VvZiBGdW5jdGlvbikge1xuICAgICAgICAgICAgY2FsbGJhY2sodmFsdWUpO1xuICAgICAgICB9XG5cbiAgICAgICAgd2luZG93LmhpZGUoKTtcbiAgICB9XG5cblxuICAgIGNvbnN0IHRleHRJbnB1dCA9ICQkKFwiaW5wdXRfZGlhbG9nX3RleHRcIik7XG4gICAgdGV4dElucHV0LmF0dGFjaEV2ZW50KFwib25FbnRlclwiLCBoYW5kbGVJbnB1dC5iaW5kKHRleHRJbnB1dCkpO1xuXG4gICAgd2luZG93LnNob3coKTtcbiAgICB3ZWJpeC5VSU1hbmFnZXIuc2V0Rm9jdXModGV4dElucHV0KTtcbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NvdXJjZXMvY29tbW9uL2RpYWxvZ3MuanMiLCJ2YXIgbWFwID0ge1xuXHRcIi4vZW5cIjogMzcsXG5cdFwiLi9lbi5qc1wiOiAzN1xufTtcbmZ1bmN0aW9uIHdlYnBhY2tDb250ZXh0KHJlcSkge1xuXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyh3ZWJwYWNrQ29udGV4dFJlc29sdmUocmVxKSk7XG59O1xuZnVuY3Rpb24gd2VicGFja0NvbnRleHRSZXNvbHZlKHJlcSkge1xuXHR2YXIgaWQgPSBtYXBbcmVxXTtcblx0aWYoIShpZCArIDEpKSAvLyBjaGVjayBmb3IgbnVtYmVyIG9yIHN0cmluZ1xuXHRcdHRocm93IG5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIgKyByZXEgKyBcIicuXCIpO1xuXHRyZXR1cm4gaWQ7XG59O1xud2VicGFja0NvbnRleHQua2V5cyA9IGZ1bmN0aW9uIHdlYnBhY2tDb250ZXh0S2V5cygpIHtcblx0cmV0dXJuIE9iamVjdC5rZXlzKG1hcCk7XG59O1xud2VicGFja0NvbnRleHQucmVzb2x2ZSA9IHdlYnBhY2tDb250ZXh0UmVzb2x2ZTtcbm1vZHVsZS5leHBvcnRzID0gd2VicGFja0NvbnRleHQ7XG53ZWJwYWNrQ29udGV4dC5pZCA9IDQ1O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vc291cmNlcy9sb2NhbGVzIF5cXC5cXC8uKiRcbi8vIG1vZHVsZSBpZCA9IDQ1XG4vLyBtb2R1bGUgY2h1bmtzID0gMCJdLCJzb3VyY2VSb290IjoiIn0=