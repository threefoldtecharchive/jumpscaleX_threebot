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
/******/ 	return __webpack_require__(__webpack_require__.s = 51);
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
        return __webpack_require__(53)("./" + url);
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
        var data = __webpack_require__(61)("./" + path);
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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_packages__ = __webpack_require__(35);
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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__common_colors__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__data__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__common_formatters__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__services_alerts__ = __webpack_require__(55);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__alert__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__common_filters__ = __webpack_require__(34);
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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_ansi_up__ = __webpack_require__(54);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_ansi_up___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_ansi_up__);


var ansiUp = new __WEBPACK_IMPORTED_MODULE_0_ansi_up___default.a();

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
				}, { $subview: "dash.runningPorts" }]
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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_deployedSolutions__ = __webpack_require__(56);
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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_logs__ = __webpack_require__(57);
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
/* 19 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_webix_jet__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__errors_dialog__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_packages__ = __webpack_require__(35);
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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__admins__ = __webpack_require__(30);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__general__ = __webpack_require__(31);
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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__walletForm__ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__walletDetails__ = __webpack_require__(33);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__services_wallet__ = __webpack_require__(48);
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
                inputWidth: 120,
                click: function click() {
                    this.$scope.WalletFormView.showForm();
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

        self.wallets_table.attachEvent("onItemDblClick", function () {
            var item = self.wallets_table.getSelectedItem();
            __WEBPACK_IMPORTED_MODULE_3__services_wallet__["a" /* wallet */].manageWallet(item.name).then(function (data) {
                console.log(data.json());
                var res = data.json();
                var info = {
                    'name': item.name,
                    'address': res.address,
                    'balances': res.balances
                };
                self.WalletDetailsView.showInfo(info);
            });
        });
    };

    WalletManagerView.prototype.urlChange = function urlChange(view, url) {
        var self = this;

        self.wallets_table = $$("wallets_table");
        __WEBPACK_IMPORTED_MODULE_3__services_wallet__["a" /* wallet */].getWallets().then(function (data) {
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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_wiki__ = __webpack_require__(60);
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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__common_colors__ = __webpack_require__(8);
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
/* 28 */
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
/* 29 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_webix_jet__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__common_formatters__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__alerts_data__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__common_filters__ = __webpack_require__(34);
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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__common_dialogs__ = __webpack_require__(59);
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
/* 31 */
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
/* 32 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_webix_jet__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_wallet__ = __webpack_require__(48);
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
            width: 600,
            height: 400,
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

    WalletFormView.prototype.showForm = function showForm() {
        this.getRoot().show();
    };

    WalletFormView.prototype.init = function init() {
        this.form = $$("form");
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
/* 33 */
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
        var _info;

        var info = (_info = {
            id: "wallet_info",
            responsive: true,
            view: "list"
        }, _info["responsive"] = true, _info.type = {
            height: 'auto'
        }, _info.template = "\n                <p>\n                </font><font size=\"3\"><b>Name: </b>#name#</font><br>\n                </font><font size=\"3\"><b>Address: </b>#address#</font><br>\n                </font><font size=\"3\"><b>Balances:</b></font><br>\n                </font><font size=\"3\">#balances#</font>\n                </p>\n            ", _info);

        return {
            view: "window",
            head: "Wallet Details",
            modal: true,
            width: 800,
            height: 500,
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

    WalletDetailsView.prototype.showInfo = function showInfo(data) {
        var self = this;

        var balances = "";
        for (var i in data.balances) {
            balances += data.balances[i].balance + " <b>" + data.balances[i].asset_code + "</b> " + data.balances[i].asset_issuer + "<br>";
        }
        self.info.clearAll();
        self.info.add({
            name: data.name,
            address: data.address,
            balances: balances
        });

        this.getRoot().show();
    };

    WalletDetailsView.prototype.init = function init() {
        var self = this;

        self.info = this.$$("wallet_info");
    };

    return WalletDetailsView;
}(__WEBPACK_IMPORTED_MODULE_0_webix_jet__["b" /* JetView */]);

/* harmony default export */ __webpack_exports__["default"] = (WalletDetailsView);

/***/ }),
/* 34 */
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
/* 35 */
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
/* 36 */
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
/* 37 */
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
/* 38 */
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
/* 39 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_webix_jet__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__processesChildView__ = __webpack_require__(27);
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
/* 40 */
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
/* 41 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_webix_jet__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_auth__ = __webpack_require__(58);
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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__common_formatters__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_myjobs__ = __webpack_require__(43);
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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__common_formatters__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_myjobs__ = __webpack_require__(43);
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

    WalletService.prototype.validateUser = function validateUser() {
        return this.getCall("validate_user");
    };

    WalletService.prototype.createWallet = function createWallet(name) {
        return this.getCall("create_wallet", name);
    };

    WalletService.prototype.manageWallet = function manageWallet(name) {
        return this.getCall("manage_wallet", name);
    };

    WalletService.prototype.getWallets = function getWallets() {
        return this.getCall("get_wallets");
    };

    return WalletService;
}(__WEBPACK_IMPORTED_MODULE_0__common_api__["a" /* Service */]);

var wallet = new WalletService();

/***/ }),
/* 49 */
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
/* 50 */
/***/ (function(module, exports) {



/***/ }),
/* 51 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__styles_app_css__ = __webpack_require__(52);
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
/* 52 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 53 */
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./alerts": 7,
	"./alerts/": 7,
	"./alerts/alert": 24,
	"./alerts/alert.js": 24,
	"./alerts/data": 4,
	"./alerts/data.js": 4,
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
	"./dash/diskSpace": 36,
	"./dash/diskSpace.js": 36,
	"./dash/health": 37,
	"./dash/health.js": 37,
	"./dash/index": 14,
	"./dash/index.js": 14,
	"./dash/jsxInfo": 38,
	"./dash/jsxInfo.js": 38,
	"./dash/processes": 39,
	"./dash/processes.js": 39,
	"./dash/processesChildView": 27,
	"./dash/processesChildView.js": 27,
	"./dash/runningPorts": 40,
	"./dash/runningPorts.js": 40,
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
	"./main": 41,
	"./main.js": 41,
	"./myjobs/jobs": 42,
	"./myjobs/jobs.js": 42,
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
	"./settings/admins": 30,
	"./settings/admins.js": 30,
	"./settings/general": 31,
	"./settings/general.js": 31,
	"./settings/index": 21,
	"./settings/index.js": 21,
	"./solutions/chatflow": 45,
	"./solutions/chatflow.js": 45,
	"./tfwikis/tfgridsdk": 46,
	"./tfwikis/tfgridsdk.js": 46,
	"./tfwikis/threefold": 47,
	"./tfwikis/threefold.js": 47,
	"./walletsManager": 22,
	"./walletsManager/": 22,
	"./walletsManager/index": 22,
	"./walletsManager/index.js": 22,
	"./walletsManager/walletDetails": 33,
	"./walletsManager/walletDetails.js": 33,
	"./walletsManager/walletForm": 32,
	"./walletsManager/walletForm.js": 32,
	"./wikis": 23,
	"./wikis/": 23,
	"./wikis/index": 23,
	"./wikis/index.js": 23,
	"./wikis/view": 49,
	"./wikis/view.js": 49
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
webpackContext.id = 53;

/***/ }),
/* 54 */
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
/* 55 */
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
/* 56 */
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
/* 57 */
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
/* 58 */
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
/* 59 */
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
/* 60 */
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
/* 61 */
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./en": 50,
	"./en.js": 50
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
webpackContext.id = 61;

/***/ })
/******/ ])["default"];
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgMmU0OWZmNGZmYTJlNzI0Y2EyNjQiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3dlYml4LWpldC9kaXN0L2VzNi9qZXQuanMiLCJ3ZWJwYWNrOi8vLy4vc291cmNlcy92aWV3cy9leHRlcm5hbC9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9zb3VyY2VzL2NvbW1vbi9hcGkuanMiLCJ3ZWJwYWNrOi8vLy4vc291cmNlcy92aWV3cy9lcnJvcnMvZGlhbG9nLmpzIiwid2VicGFjazovLy8uL3NvdXJjZXMvdmlld3MvYWxlcnRzL2RhdGEuanMiLCJ3ZWJwYWNrOi8vLy4vc291cmNlcy9jb21tb24vZm9ybWF0dGVycy5qcyIsIndlYnBhY2s6Ly8vLi9zb3VyY2VzL3NlcnZpY2VzL2hlYWx0aC5qcyIsIndlYnBhY2s6Ly8vLi9zb3VyY2VzL3ZpZXdzL2FsZXJ0cy9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9zb3VyY2VzL2NvbW1vbi9jb2xvcnMuanMiLCJ3ZWJwYWNrOi8vLy4vc291cmNlcy92aWV3cy9jYXBhY2l0eS9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9zb3VyY2VzL3ZpZXdzL2NpcmNsZXMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vc291cmNlcy92aWV3cy9jaXJjbGVzdG9yaWVzL2luZGV4LmpzIiwid2VicGFjazovLy8uL3NvdXJjZXMvdmlld3MvY2lyY2xldGFza3MvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vc291cmNlcy92aWV3cy9jb2Rlc2VydmVyL2luZGV4LmpzIiwid2VicGFjazovLy8uL3NvdXJjZXMvdmlld3MvZGFzaC9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9zb3VyY2VzL3ZpZXdzL2RlcGxveWVkU29sdXRpb25zL2luZGV4LmpzIiwid2VicGFjazovLy8uL3NvdXJjZXMvdmlld3MvZmFybW1hbmFnZW1lbnQvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vc291cmNlcy92aWV3cy9qdXB5dGVyL2luZGV4LmpzIiwid2VicGFjazovLy8uL3NvdXJjZXMvdmlld3MvbG9ncy9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9zb3VyY2VzL3ZpZXdzL3BhY2thZ2VzL2luZGV4LmpzIiwid2VicGFjazovLy8uL3NvdXJjZXMvdmlld3Mvc2RrZXhhbXBsZXMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vc291cmNlcy92aWV3cy9zZXR0aW5ncy9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9zb3VyY2VzL3ZpZXdzL3dhbGxldHNNYW5hZ2VyL2luZGV4LmpzIiwid2VicGFjazovLy8uL3NvdXJjZXMvdmlld3Mvd2lraXMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vc291cmNlcy92aWV3cy9hbGVydHMvYWxlcnQuanMiLCJ3ZWJwYWNrOi8vLy4vc291cmNlcy9zZXJ2aWNlcy9hZG1pbi5qcyIsIndlYnBhY2s6Ly8vLi9zb3VyY2VzL3NlcnZpY2VzL3RhaWdhLmpzIiwid2VicGFjazovLy8uL3NvdXJjZXMvdmlld3MvZGFzaC9wcm9jZXNzZXNDaGlsZFZpZXcuanMiLCJ3ZWJwYWNrOi8vLy4vc291cmNlcy92aWV3cy9kZXBsb3llZFNvbHV0aW9ucy9yZXNlcnZhdGlvbi5qcyIsIndlYnBhY2s6Ly8vLi9zb3VyY2VzL3ZpZXdzL2xvZ3MvYXBwTG9ncy5qcyIsIndlYnBhY2s6Ly8vLi9zb3VyY2VzL3ZpZXdzL3NldHRpbmdzL2FkbWlucy5qcyIsIndlYnBhY2s6Ly8vLi9zb3VyY2VzL3ZpZXdzL3NldHRpbmdzL2dlbmVyYWwuanMiLCJ3ZWJwYWNrOi8vLy4vc291cmNlcy92aWV3cy93YWxsZXRzTWFuYWdlci93YWxsZXRGb3JtLmpzIiwid2VicGFjazovLy8uL3NvdXJjZXMvdmlld3Mvd2FsbGV0c01hbmFnZXIvd2FsbGV0RGV0YWlscy5qcyIsIndlYnBhY2s6Ly8vLi9zb3VyY2VzL2NvbW1vbi9maWx0ZXJzLmpzIiwid2VicGFjazovLy8uL3NvdXJjZXMvc2VydmljZXMvcGFja2FnZXMuanMiLCJ3ZWJwYWNrOi8vLy4vc291cmNlcy92aWV3cy9kYXNoL2Rpc2tTcGFjZS5qcyIsIndlYnBhY2s6Ly8vLi9zb3VyY2VzL3ZpZXdzL2Rhc2gvaGVhbHRoLmpzIiwid2VicGFjazovLy8uL3NvdXJjZXMvdmlld3MvZGFzaC9qc3hJbmZvLmpzIiwid2VicGFjazovLy8uL3NvdXJjZXMvdmlld3MvZGFzaC9wcm9jZXNzZXMuanMiLCJ3ZWJwYWNrOi8vLy4vc291cmNlcy92aWV3cy9kYXNoL3J1bm5pbmdQb3J0cy5qcyIsIndlYnBhY2s6Ly8vLi9zb3VyY2VzL3ZpZXdzL21haW4uanMiLCJ3ZWJwYWNrOi8vLy4vc291cmNlcy92aWV3cy9teWpvYnMvam9icy5qcyIsIndlYnBhY2s6Ly8vLi9zb3VyY2VzL3NlcnZpY2VzL215am9icy5qcyIsIndlYnBhY2s6Ly8vLi9zb3VyY2VzL3ZpZXdzL215am9icy93b3JrZXJzLmpzIiwid2VicGFjazovLy8uL3NvdXJjZXMvdmlld3Mvc29sdXRpb25zL2NoYXRmbG93LmpzIiwid2VicGFjazovLy8uL3NvdXJjZXMvdmlld3MvdGZ3aWtpcy90ZmdyaWRzZGsuanMiLCJ3ZWJwYWNrOi8vLy4vc291cmNlcy92aWV3cy90Zndpa2lzL3RocmVlZm9sZC5qcyIsIndlYnBhY2s6Ly8vLi9zb3VyY2VzL3NlcnZpY2VzL3dhbGxldC5qcyIsIndlYnBhY2s6Ly8vLi9zb3VyY2VzL3ZpZXdzL3dpa2lzL3ZpZXcuanMiLCJ3ZWJwYWNrOi8vLy4vc291cmNlcy9hcHAuanMiLCJ3ZWJwYWNrOi8vLy4vc291cmNlcy9zdHlsZXMvYXBwLmNzcyIsIndlYnBhY2s6Ly8vLi9zb3VyY2VzL3ZpZXdzIF5cXC5cXC8uKiQiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2Fuc2lfdXAvYW5zaV91cC5qcyIsIndlYnBhY2s6Ly8vLi9zb3VyY2VzL3NlcnZpY2VzL2FsZXJ0cy5qcyIsIndlYnBhY2s6Ly8vLi9zb3VyY2VzL3NlcnZpY2VzL2RlcGxveWVkU29sdXRpb25zLmpzIiwid2VicGFjazovLy8uL3NvdXJjZXMvc2VydmljZXMvbG9ncy5qcyIsIndlYnBhY2s6Ly8vLi9zb3VyY2VzL3NlcnZpY2VzL2F1dGguanMiLCJ3ZWJwYWNrOi8vLy4vc291cmNlcy9jb21tb24vZGlhbG9ncy5qcyIsIndlYnBhY2s6Ly8vLi9zb3VyY2VzL3NlcnZpY2VzL3dpa2kuanMiLCJ3ZWJwYWNrOi8vLy4vc291cmNlcy9sb2NhbGVzIF5cXC5cXC8uKiQiXSwibmFtZXMiOlsiTmF2aWdhdGlvbkJsb2NrZWQiLCJKZXRCYXNlIiwid2ViaXgiLCJ3ZWJpeEpldCIsIl9ldmVudHMiLCJfc3VicyIsIl9kYXRhIiwiZ2V0Um9vdCIsIl9yb290IiwiZGVzdHJ1Y3RvciIsIl9kZXRhY2hFdmVudHMiLCJfZGVzdHJveVN1YnMiLCJfY29udGFpbmVyIiwiYXBwIiwiX3BhcmVudCIsInNldFBhcmFtIiwiaWQiLCJ2YWx1ZSIsInVybCIsIl9zZWdtZW50IiwidXBkYXRlIiwic2hvdyIsImdldFBhcmFtIiwicGFyZW50IiwidmlldyIsImdldFBhcmVudFZpZXciLCJnZXRVcmwiLCJzdWJ1cmwiLCJnZXRVcmxTdHJpbmciLCJ0b1N0cmluZyIsIiQkIiwicm9vdCIsInF1ZXJ5VmlldyIsIm9iaiIsImNvbmZpZyIsImxvY2FsSWQiLCIkc2NvcGUiLCJvbiIsIm5hbWUiLCJjb2RlIiwiYXR0YWNoRXZlbnQiLCJwdXNoIiwiY29udGFpbnMiLCJrZXkiLCJraWQiLCJnZXRTdWJWaWV3Iiwic3ViIiwiZ2V0U3ViVmlld0luZm8iLCJzdWJ2aWV3IiwicG9wdXAiLCJldmVudHMiLCJpIiwibGVuZ3RoIiwiZGV0YWNoRXZlbnQiLCJzdWJWaWV3IiwiX2luaXRfdXJsX2RhdGEiLCJjdXJyZW50IiwiZXh0ZW5kIiwicGFyYW1zIiwiX2dldERlZmF1bHRTdWIiLCJkZWZhdWx0IiwiYnJhbmNoIiwiY2hpbGQiLCJfcm91dGVkX3ZpZXciLCJwYXJzZSIsInN1YnN0ciIsInBhcnRzIiwic3BsaXQiLCJjaHVua3MiLCJ0ZXN0IiwicmVzdWx0IiwicG9zIiwiaW5kZXhPZiIsInBhcmFtIiwiZGNodW5rIiwiZGVjb2RlVVJJQ29tcG9uZW50IiwicGFnZSIsImlzTmV3IiwidXJsMnN0ciIsInN0YWNrIiwiY2h1bmsiLCJvYmoyc3RyIiwiam9pbiIsInN0ciIsImVuY29kZVVSSUNvbXBvbmVudCIsIlJvdXRlIiwicm91dGUiLCJpbmRleCIsIl9uZXh0IiwicGF0aCIsIm5leHQiLCJzbGljZSIsInNoaWZ0IiwicmVmcmVzaCIsIl9qb2luIiwia2lkcyIsIm9sZCIsImNvbmNhdCIsImFwcGVuZCIsIlByb21pc2UiLCJyZXMiLCJyZWoiLCJyZWRpcmVjdCIsImNvbmZpcm0iLCJyZXNvbHZlIiwiY2FsbEV2ZW50IiwiY2F0Y2giLCJlcnIiLCJ0aGVuIiwic2l6ZSIsIm4iLCJKZXRWaWV3IiwiX2NoaWxkcmVuIiwidWkiLCJjb250YWluZXIiLCJqZXR2aWV3IiwiY3JlYXRlVmlldyIsInJlbmRlciIsInRhcmdldCIsIl9yZW5kZXJGcmFtZUxvY2siLCJfc2hvdyIsInNlZ21lbnQiLCJfdXJsQ2hhbmdlIiwibGlua1JvdXRlciIsImdldFJvdXRlciIsInNldCIsInNpbGVudCIsImluaXQiLCJfJHZpZXciLCJfJCIsInJlYWR5IiwiXyR1cmwiLCJtZXNzYWdlIiwidXJsQ2hhbmdlIiwiZGVzdHJveSIsIl9kZXN0cm95S2lkcyIsInVzZSIsInBsdWdpbiIsInRhZ05hbWUiLCJfcmVuZGVyIiwiZG9jdW1lbnQiLCJib2R5IiwidG9Ob2RlIiwiX3JlbmRlcl9maW5hbCIsImNmZyIsInNsb3QiLCJyZWplY3QiLCJyZXNwb25zZSIsImNvcHlDb25maWciLCJvbGR1aSIsImFzV2luIiwic2V0UG9zaXRpb24iLCJpc1Zpc2libGUiLCJfaW5pdCIsIl9pbml0VXJsIiwiZSIsIl9pbml0RXJyb3IiLCJ3YWl0cyIsImZyYW1lIiwid2FpdCIsImFsbCIsImxvY2siLCJfcmVuZGVyRnJhbWUiLCJfY3JlYXRlU3ViVmlldyIsImVycm9yIiwiY3JlYXRlRnJvbVVSTCIsInVpcyIsIkpldFZpZXdSYXciLCJfdWkiLCJTdWJSb3V0ZXIiLCJjYiIsImEiLCJnZXQiLCJfb25jZSIsIkpldEFwcEJhc2UiLCJ3aW5kb3ciLCJ2ZXJzaW9uIiwic3RhcnQiLCJfc2VydmljZXMiLCJFdmVudFN5c3RlbSIsIl9zdWJTZWdtZW50IiwiZ2V0U2VydmljZSIsInNldFNlcnZpY2UiLCJoYW5kbGVyIiwicHJvdG90eXBlIiwiJHN1YnZpZXciLCJhZGRTdWJWaWV3IiwiQXJyYXkiLCJtZXRob2QiLCJwb2ludCIsIkRhdGFDb2xsZWN0aW9uIiwiUmVnRXhwIiwiRGF0ZSIsImNvcHkiLCIkcm91dGVyIiwiY2xpY2tIYW5kbGVyIiwic3JjRWxlbWVudCIsImdldEF0dHJpYnV0ZSIsInRyaWdnZXIiLCJfZm9yVmlldyIsImNhbmNlbEJ1YmJsZSIsInByZXZlbnREZWZhdWx0IiwicGFyZW50Tm9kZSIsImxvYWRWaWV3Iiwidmlld3MiLCJfbG9hZEVycm9yIiwiRXJyb3IiLCJfbG9hZFZpZXdEeW5hbWljIiwibW9kdWxlIiwiX19lc01vZHVsZSIsInJvdXRlciIsInJlc3QiLCJhcHBseSIsImRhdGEiLCJhY3Rpb24iLCJiaW5kIiwiZXIiLCJkZWJ1ZyIsImNvbnNvbGUiLCJ0ZXh0IiwicmVwbGFjZSIsImlubmVySFRNTCIsInR5cGUiLCJleHBpcmUiLCJmaXJzdEluaXQiLCJldmVudCIsIl9maXJzdF9zdGFydCIsInRvcCIsImJhc2UiLCJzZXRUaW1lb3V0IiwiYW5pbWF0aW9uIiwibm9kZSIsImh0bWwiLCJhZGRDc3MiLCJyZW1vdmVDc3MiLCJ1cmxTdHJpbmciLCJ0ZW1wbGF0ZSIsInVpZCIsIkhhc2hSb3V0ZXIiLCJfZGV0ZWN0UHJlZml4Iiwib25wb3BzdGF0ZSIsInJvdXRlcyIsImNvbXBhcmUiLCJoaXN0b3J5IiwicHVzaFN0YXRlIiwicHJlZml4Iiwic3VmaXgiLCJfZ2V0UmF3Iiwicm91dGVyUHJlZml4IiwibG9jYXRpb24iLCJocmVmIiwiaXNQYXRjaGVkIiwicGF0Y2giLCJ3Iiwid2luIiwicHJvbWlzZSIsImZyZWV6ZSIsInNvbWUiLCIkZnJlZXplIiwicmVzaXplIiwiYmFzZUFkZCIsImJhc2VsYXlvdXQiLCJhZGRWaWV3IiwiYmFzZVJlbW92ZSIsInJlbW92ZVZpZXciLCJqdmlldyIsInN1YnMiLCJhcmd1bWVudHMiLCJsYXlvdXQiLCJwcm90b1VJIiwiJGluaXQiLCIkYXBwIiwiJHJlYWR5Iiwib3JpZ2luIiwicHJveHkiLCJKZXRBcHAiLCJyZXF1aXJlIiwiU3RvcmVSb3V0ZXIiLCJzdG9yYWdlIiwic2Vzc2lvbiIsInN0b3JlTmFtZSIsInB1dCIsIlVybFJvdXRlciIsInBhdGhuYW1lIiwic2VhcmNoIiwiRW1wdHlSb3V0ZXIiLCJfJGNvbmZpZyIsIlVubG9hZEd1YXJkIiwiaGFzIiwic3RvcmUiLCJPYmplY3QiLCJoYXNPd25Qcm9wZXJ0eSIsImNhbGwiLCJmb3JFYWNoIiwiY29udGV4dCIsInRyaW0iLCJ3YXJuIiwieCIsIlN0cmluZyIsImRlbGltaXRlciIsInJ1c3NpYW5QbHVyYWxHcm91cHMiLCJlbmQiLCJwbHVyYWxUeXBlcyIsImFyYWJpYyIsImxhc3RUd28iLCJib3NuaWFuX3NlcmJpYW4iLCJjaGluZXNlIiwiY3JvYXRpYW4iLCJmcmVuY2giLCJnZXJtYW4iLCJydXNzaWFuIiwibGl0aHVhbmlhbiIsImN6ZWNoIiwicG9saXNoIiwiaWNlbGFuZGljIiwic2xvdmVuaWFuIiwicGx1cmFsVHlwZVRvTGFuZ3VhZ2VzIiwibGFuZ1RvVHlwZU1hcCIsIm1hcHBpbmciLCJyZXQiLCJsYW5ncyIsImxhbmciLCJwbHVyYWxUeXBlTmFtZSIsImxvY2FsZSIsImxhbmdUb1BsdXJhbFR5cGUiLCJlbiIsInBsdXJhbFR5cGVJbmRleCIsImNvdW50IiwiZXNjYXBlIiwidG9rZW4iLCJjb25zdHJ1Y3RUb2tlblJlZ2V4Iiwib3B0cyIsInN1ZmZpeCIsIlJhbmdlRXJyb3IiLCJkb2xsYXJSZWdleCIsImRvbGxhckJpbGxzWWFsbCIsImRlZmF1bHRUb2tlblJlZ2V4IiwidHJhbnNmb3JtUGhyYXNlIiwicGhyYXNlIiwic3Vic3RpdHV0aW9ucyIsInRva2VuUmVnZXgiLCJUeXBlRXJyb3IiLCJpbnRlcnBvbGF0aW9uUmVnZXgiLCJvcHRpb25zIiwic21hcnRfY291bnQiLCJ0ZXh0cyIsImV4cHJlc3Npb24iLCJhcmd1bWVudCIsIlBvbHlnbG90IiwicGhyYXNlcyIsImN1cnJlbnRMb2NhbGUiLCJhbGxvd01pc3NpbmciLCJvbk1pc3NpbmdLZXkiLCJpbnRlcnBvbGF0aW9uIiwibmV3TG9jYWxlIiwibW9yZVBocmFzZXMiLCJwcmVmaXhlZEtleSIsInVuc2V0IiwiY2xlYXIiLCJuZXdQaHJhc2VzIiwidCIsIl8iLCJ0cmFuc2Zvcm0iLCJ3ZWJpeFBvbHlnbG90IiwiTG9jYWxlIiwiX3ZpZXciLCJzZXRMYW5nRGF0YSIsInBjb25maWciLCJwb2x5Z2xvdCIsInBvbHkiLCJzZXJ2aWNlIiwibG9jTmFtZSIsImkxOG4iLCJzZXRMb2NhbGUiLCJnZXRMYW5nIiwic2V0TGFuZyIsInVybHMiLCJNZW51IiwiZ2V0VmFsdWUiLCJzZXRWYWx1ZSIsImdldFNlbGVjdGVkSWQiLCJzZWxlY3QiLCJleGlzdHMiLCJiYXNlaWNvbnMiLCJnb29kIiwic2F2aW5nIiwiYmFzZXRleHQiLCJTdGF0dXMiLCJzdGF0dXMiLCJpc2Vycm9yIiwiZXhwaXJlRGVsYXkiLCJpY29ucyIsImNvbnRlbnQiLCJhcmVhIiwic2V0SFRNTCIsInN1Y2Nlc3MiLCJzZXRTdGF0dXMiLCJmYWlsIiwiZ2V0U3RhdHVzIiwiaGlkZVN0YXR1cyIsIm1vZGUiLCJyZXNwb25zZVRleHQiLCJ0cmFjayIsImRwIiwiX2lkIiwiX29iaiIsInJlbW90ZSIsImFqYXgiLCJfbW9kZSIsIl91cmwiLCJfcmVxdWVzdCIsIl9oZWFkZXJzIiwiX2ZpbGVzIiwiVGhlbWUiLCJ0aGVtZSIsImdldFRoZW1lIiwic2V0VGhlbWUiLCJsaW5rcyIsImdldEVsZW1lbnRzQnlUYWdOYW1lIiwibG5hbWUiLCJkaXNhYmxlZCIsInNraW4iLCJjb3B5UGFyYW1zIiwiVXJsUGFyYW0iLCJvcyIsIm9nIiwidmFsIiwiVXNlciIsImxvZ2luIiwibG9nb3V0IiwiYWZ0ZXJMb2dpbiIsImFmdGVyTG9nb3V0IiwicGluZyIsIm1vZGVsIiwidXNlciIsImdldFVzZXIiLCJzZXJ2ZXIiLCJwYXNzIiwiY2FuTmF2aWdhdGUiLCJfJHJvb3QiLCJwdWJsaWMiLCJzZXRJbnRlcnZhbCIsInBsdWdpbnMiLCJlcnJvcnMiLCJTVEFUVVNfSU5TVEFMTEVEIiwiRXh0ZXJuYWxWaWV3IiwidGFyZ2V0VXJsIiwicmVxdWlyZWRQYWNrYWdlcyIsInNlbGYiLCJpZnJhbWUiLCJvbkFmdGVyTG9hZCIsImhpZGVQcm9ncmVzcyIsImVuYWJsZSIsInJvd3MiLCJoaWRkZW4iLCJjb2xzIiwiYXV0b2hlaWdodCIsImNzcyIsImhlaWdodCIsImNsaWNrIiwiaW5zdGFsbFJlcXVpcmVkUGFja2FnZXMiLCJwcm9taXNlcyIsInZhbHVlcyIsInBhY2thZ2VzVG9JbnN0YWxsIiwibWFwIiwicGFja2FnZXMiLCJhZGQiLCJpbnN0YWxsQnV0dG9uIiwiZGlzYWJsZSIsInJlbG9hZCIsInNob3dJZnJhbWUiLCJleHRlcm5hbElmcmFtZSIsInNob3dQcm9ncmVzcyIsImxvYWQiLCJQcm9ncmVzc0JhciIsInBhY2thZ2VOYW1lcyIsImtleXMiLCJyZXF1aXJlZFBhY2thZ2VzRGl2IiwiaW5zdGFsbFBhY2thZ2VDb250YWluZXIiLCJwYWNrYWdlU3RhdGVzIiwianNvbiIsInBhY2thZ2VOYW1lc1RvSW5zdGFsbCIsImhpZGUiLCJuYW1lcyIsImhlYWRlcnMiLCJTZXJ2aWNlIiwiYmFzZVVybCIsImpvaW5VcmwiLCJhcmdzIiwidG9Mb3dlckNhc2UiLCJwb3N0IiwiVmFsdWVFcnJvciIsImdldENhbGwiLCJwb3N0Q2FsbCIsIkVycm9yVmlldyIsInNjcm9sbCIsImhlYWQiLCJtb2RhbCIsIndpZHRoIiwicG9zaXRpb24iLCJnZXRUb3BQYXJlbnRWaWV3Iiwic2hvd0Vycm9yIiwiYW5zaVVwIiwiYW5zaV90b19odG1sIiwiZ2V0SGVhZCIsIk1BWF9NU0dfTEVOIiwiTEVWRUxTIiwiU1RBVEVTIiwiVFlQRVMiLCJkYXRlRm9ybWF0Iiwid2ViaXhEYXRlRm9ybWF0dGVyIiwiZGF0ZVRvU3RyIiwiZGF0ZUZvcm1hdHRlciIsInBhcnNlSW50IiwiQkFTRV9VUkwiLCJIZWFsdGhTZXJ2aWNlIiwiZ2V0RGlza1NwYWNlIiwiZ2V0SGVhbHRoIiwiZ2V0SWRlbnRpdHkiLCJnZXROZXR3b3JrSW5mbyIsImdldEpzeFZlcnNpb24iLCJnZXRSdW5uaW5nUHJvY2Vzc2VzIiwiZ2V0UnVubmluZ1BvcnRzIiwiaGVhbHRoIiwiQWxlcnRzVmlldyIsInJlc2l6ZUNvbHVtbiIsIm11bHRpc2VsZWN0IiwiY29sdW1ucyIsImhlYWRlciIsInNvcnQiLCJhdXRvd2lkdGgiLCJmb3JtYXQiLCJjcmVhdGVGaWx0ZXJPcHRpb25zIiwiZmlsbHNwYWNlIiwiYXV0b0NvbmZpZyIsInNjaGVtZSIsImRlbGV0ZUl0ZW0iLCJvYmplY3RzIiwiaXRlbXMiLCJpZHMiLCJpbmRleGVzIiwiaXRlbSIsInRhYmxlIiwiZ2V0SXRlbSIsInRpdGxlIiwib2siLCJjYW5jZWwiLCJpZGVudGlmaWVycyIsImlkZW50aWZpZXIiLCJhbGVydHMiLCJkZWxldGUiLCJyZW1vdmUiLCJ2aWV3SXRlbSIsImFsZXJ0VmlldyIsInNob3dGb3IiLCJBbGVydFZpZXciLCJjbGVhckFsbCIsImxpc3QiLCJhdHRhY2hUbyIsIkFuc2lVcCIsIkNhcGFjaXR5VmlldyIsImFkbWluIiwiZ2V0X2V4cGxvcmVyIiwiZXhwbG9yZXIiLCJzdGFydHNXaXRoIiwiQ2lyY2xlc1ZpZXciLCJncmlkIiwib25Db250ZXh0IiwiZXJyb3JWaWV3IiwibWVudSIsImNpcmNsZVRhYmxlIiwiaW5mbyIsIkpTT04iLCJ1c2VybmFtZSIsInRhaWdhIiwidXNlckNpcmNsZXMiLCJjaXJjbGVzIiwiQ2lyY2xlc3Rvcmllc1ZpZXciLCJzdG9yaWVzVGFibGUiLCJ1c2VyU3RvcmllcyIsInN0b3JpZXMiLCJDaXJjbGVzVGFza3NWaWV3IiwidGFza3NUYWJsZSIsInVzZXJUYXNrcyIsInRhc2tzIiwiQ09ERV9VUkwiLCJSRVFVSVJFRF9QQUNLQUdFUyIsIkNvZGVzZXJ2ZXJWaWV3IiwiVG9wVmlldyIsInJlc3BvbnNpdmUiLCJVTktOT1dOX1NUQVRVUyIsIkRlcGxveWVkU29sdXRpb25zVmlldyIsInNvbHV0aW9uTmFtZSIsInJlc3ZJZCIsInJlc2VydmF0aW9uIiwic29sdXRpb25UeXBlIiwibmV4dEFjdGlvbiIsIm5leHRfYWN0aW9uIiwic2hvd092ZXJsYXkiLCJoaWRlT3ZlcmxheSIsImhhbmRsZVJlc3VsdCIsImNhbGxiYWNrIiwic29sdXRpb25zVGFibGUiLCJzb2x1dGlvbkl0ZW0iLCJzb2x1dGlvbiIsIkZ1bmN0aW9uIiwiZGVsZXRlU29sdXRpb24iLCJpdGVtSWQiLCJzb2x1dGlvbnMiLCJsb2FkU29sdXRpb25zIiwiZm9ybV9pbmZvIiwicmVzZXJ2YXRpb25WaWV3IiwiUmVzZXJ2YXRpb25WaWV3IiwiY2hlY2tBY3Rpb24iLCJzZWxlY3RlZEl0ZW1JZCIsIiR2aWV3IiwibG9jYXRlIiwicm93IiwiYWN0aW9ucyIsInByZXZlbnRFdmVudCIsIlVSTCIsIkZhcm1tYW5hZ2VtZW50VmlldyIsIkp1cHl0ZXJWaWV3IiwiTG9nc1ZpZXciLCJwbGFjZWhvbGRlciIsIm9uQ2hhbmdlIiwiYXBwTmFtZSIsIkFwcExvZ3NWaWV3IiwiYXBwc0NvbWJvIiwibG9ncyIsImxpc3RBcHBzIiwiZGVmaW5lIiwiYXBwbmFtZSIsImxvZ0lkIiwibG9naWQiLCJhcHBMb2dzIiwiUEFDS0FHRV9TVEFURVMiLCJQYWNrYWdlc1ZpZXciLCJpbnB1dEFsaWduIiwic291cmNlX25hbWUiLCJzb3VyY2UiLCJhdXRob3IiLCJ0aHJlZWJvdCIsInBhY2thZ2VUYWJsZSIsInBhY2thZ2VJdGVtIiwicGFja2FnZSIsImFkZFBhY2thZ2UiLCJnaXRVcmwiLCJ1cGRhdGVJdGVtIiwiZGVsZXRlUGFja2FnZSIsInBhY2thZ2VOYW1lIiwic3RhcnRQYWNrYWdlIiwic3RvcFBhY2thZ2UiLCJzdG9wIiwiZW5hYmxlUGFja2FnZSIsImRpc2FibGVQYWNrYWdlIiwibG9hZFBhY2thZ2VzIiwicGFjYWtnZUxvY2F0aW9uIiwiYWxlcnQiLCJwYWNrYWdlTWV0aG9kIiwiU2V0dGluZ3NWaWV3IiwiY2VsbHMiLCJHZW5lcmFsVmlldyIsIkFkbWluc1ZpZXciLCJXYWxsZXRNYW5hZ2VyVmlldyIsIndhbGxldHMiLCJpbnB1dFdpZHRoIiwiV2FsbGV0Rm9ybVZpZXciLCJzaG93Rm9ybSIsIndhbGxldHNfdGFibGUiLCJXYWxsZXREZXRhaWxzVmlldyIsImdldFNlbGVjdGVkSXRlbSIsIndhbGxldCIsIm1hbmFnZVdhbGxldCIsImxvZyIsImFkZHJlc3MiLCJiYWxhbmNlcyIsInNob3dJbmZvIiwiZ2V0V2FsbGV0cyIsIldpa2lzVmlldyIsIm9uQ2xpY2siLCJidG5fdmlldyIsImV2IiwiZWxlbWVudHNDb25maWciLCJsYWJlbFdpZHRoIiwiZWxlbWVudHMiLCJsYWJlbCIsInJlYWRvbmx5IiwidGFiIiwibXVsdGl2aWV3IiwiZm9ybSIsInRiVmlld3MiLCJ0YlRhYnMiLCJsb2dEYXRhIiwiYXBwX25hbWUiLCJsYXRlc3RfbG9naWQiLCJhZGRUcmFjZWJhY2siLCJ0YiIsInRiSWQiLCJ0aHJlZWJvdF9uYW1lIiwicHJvY2Vzc19pZCIsInRiVGl0bGUiLCJmb3JtYXR0ZWQiLCJhZGRPcHRpb24iLCJjbGVhclRyYWNlQmFja3MiLCJyZW1vdmVPcHRpb24iLCJhc3NpZ24iLCJhbGVydF90eXBlIiwibGV2ZWwiLCJ0aW1lX2ZpcnN0IiwidGltZV9sYXN0Iiwic2V0VmFsdWVzIiwidHJhY2ViYWNrcyIsIkFkbWluU2VydmljZSIsInNldF9leHBsb3JlciIsImV4cGxvcmVyX3R5cGUiLCJUYWlnYVNlcnZpY2UiLCJvdXRwdXRfdHlwZSIsIlByb2Nlc3Nlc0NoaWxkVmlldyIsIk1hdGgiLCJjZWlsIiwibmV0d29ya19uYW1lIiwiaXBfcmFuZ2UiLCJpcHJhbmdlIiwiZmFybWVyX3RpZCIsIm5vZGVfaWQiLCJmbGlzdCIsImVudHJ5cG9pbnQiLCJodWJfdXJsIiwiaW50ZXJhY3RpdmUiLCJtYXN0ZXJfaXBzX3N0ciIsIm1hc3Rlcl9pcHMiLCJyZXNlcnZhdGlvbl92aWV3IiwiY3VzdG9tZXJfdGlkIiwicmVzdWx0cyIsImV4cGlyYXRpb24iLCJkYXRhX3Jlc2VydmF0aW9uIiwiZXhwaXJhdGlvbl9yZXNlcnZhdGlvbiIsImNvbnRhaW5lcnMiLCJ2b2x1bWVzIiwiemRicyIsIm5ldHdvcmtzIiwia3ViZXJuZXRlcyIsImZvcm1fbGlzdCIsImZvcm1fa2V5cyIsImZvcm1fdmFsdWVzIiwiZm9ybV9kaWN0IiwicGFnZXIiLCJncm91cCIsImFwcGxvZ3MiLCJtYXJrU29ydGluZyIsImFkZEFkbWluIiwiZGVsZXRlX2FkbWluIiwiZGVsZXRlQWRtaW4iLCJpbnB1dERpYWxvZyIsImlucHV0IiwieUNvdW50IiwiZG9BY3Rpb24iLCJleHBsb3Jlckxpc3QiLCJleHBsb3JlckFkZHJlc3MiLCJuZXdWYWx1ZSIsIndhbGxldF9uYW1lIiwiZ2V0VmFsdWVzIiwiY3JlYXRlV2FsbGV0IiwiYmFsYW5jZSIsImFzc2V0X2NvZGUiLCJhc3NldF9pc3N1ZXIiLCJQYWNrYWdlc1NlcnZpY2UiLCJnaXRfdXJsIiwiRGlza1NwYWNlVmlldyIsImRpc2tTcGFjZSIsImRpc2tJbmZvIiwidXNlZCIsImZyZWUiLCJ0b3RhbCIsInBlcmNlbnQiLCJoZWFsdGhJbmZvVmlldyIsImhlYWx0aEluZm8iLCJiY2RiIiwid2lraXMiLCJjb2Rlc2VydmVyIiwianVweXRlciIsIkpTWEluZm9WaWV3IiwiaXAiLCJpcDYiLCJjb2xvcnNEYXRhc2V0IiwiY29sb3IiLCJQcm9jZXNzZXNWaWV3IiwicHJvY2Vzc2VzSW5mbyIsInBpZUlubmVyVGV4dCIsImFsaWduIiwiY2hpbGR2aWV3IiwicHJvY2Vzc2VzTGlzdCIsInJ1blByb2Nlc3NJbmZvIiwiY2hhcnRzRGF0YSIsInByb2Nlc3Nlc19saXN0IiwibWVtb3J5VXNhZ2UiLCJtZW1vcnlfdXNhZ2UiLCJ0b3RhbE1lbW9yeSIsInRvdGFsX21lbSIsInVzYWdlX3BlcmNlbnQiLCJ0ZW1wIiwicnNzIiwicnVubmluZ1BvcnRzVmlldyIsInBvcnRzIiwicG9ydHNUYWJsZSIsImljb24iLCJoaWRlTWVudSIsInRvb2x0aXAiLCJib3JkZXJsZXNzIiwic2lkZWJhckRhdGEiLCJzeW5jIiwiaGFzX2Zyb250ZW5kX2FyZ3MiLCJwIiwiZnJvbnRlbmRfYXJncyIsInNpZGViYXIiLCJ0b29sYmFyIiwicGFkZGluZyIsInNob3dNZW51IiwiYnV0dG9uSGlkZU1lbnUiLCJidXR0b25TaG93TWVudSIsIm15am9icyIsIndvcmtlcnMiLCJ0ZmdyaWRzZGsiLCJ0aHJlZWZvbGQiLCJ1YnVudHUiLCJuZXR3b3JrIiwibWluaW8iLCJ3ZWJnYXRld2F5IiwiazhzX2NsdXN0ZXIiLCJ1c2VyTWVudSIsImF1dGgiLCJ1c2VybmFtZUxhYmVsIiwiZ2V0Q3VycmVudFVzZXIiLCJkZXZtb2RlIiwiZ2V0VGV4dFNpemUiLCJlbWFpbCIsIkpvYnNWaWV3Iiwic3RyaW5naWZ5IiwibGlzdEpvYnMiLCJNeWpvYnNTZXJ2aWNlIiwibGlzdFdvcmtlcnMiLCJDaGF0Zmxvd1ZpZXciLCJiYXNlR2l0VXJsIiwicGFja2FnZVVybCIsImNoYXQiLCJURkdSSURTREtfVVJMIiwiVEZHcmlkU0RLV2lraSIsIlRIUkVFRk9MRF9VUkwiLCJUaHJlZWZvbGRXaWtpIiwiV2FsbGV0U2VydmljZSIsInZhbGlkYXRlVXNlciIsIldpa2lFeHRlcm5hbFZpZXciLCJJbnZlbnRvcnlBcHAiLCJBUFBOQU1FIiwiVkVSU0lPTiIsIlBST0RVQ1RJT04iLCJmYWN0b3J5IiwiZXhwb3J0cyIsIm5vZGVOYW1lIiwiZXhwIiwiX19tYWtlVGVtcGxhdGVPYmplY3QiLCJjb29rZWQiLCJyYXciLCJkZWZpbmVQcm9wZXJ0eSIsIlBhY2tldEtpbmQiLCJzZXR1cF9wYWxldHRlcyIsIl91c2VfY2xhc3NlcyIsIl9lc2NhcGVfZm9yX2h0bWwiLCJib2xkIiwiZmciLCJiZyIsIl9idWZmZXIiLCJfdXJsX3doaXRlbGlzdCIsImFyZyIsImVudW1lcmFibGUiLCJjb25maWd1cmFibGUiLCJfdGhpcyIsImFuc2lfY29sb3JzIiwicmdiIiwiY2xhc3NfbmFtZSIsInBhbGV0dGVfMjU2IiwicGFsZXR0ZSIsInJlYyIsImxldmVscyIsInIiLCJnIiwiYiIsImNvbCIsImdyZXlfbGV2ZWwiLCJncnkiLCJlc2NhcGVfdHh0X2Zvcl9odG1sIiwidHh0IiwiYXBwZW5kX2J1ZmZlciIsImdldF9uZXh0X3BhY2tldCIsInBrdCIsImtpbmQiLCJFT1MiLCJsZW4iLCJUZXh0IiwiSW5jb21wbGV0ZSIsIm5leHRfY2hhciIsImNoYXJBdCIsIkVTQyIsIl9jc2lfcmVnZXgiLCJyZ3giLCJtYXRjaCIsIlVua25vd24iLCJTR1IiLCJycG9zIiwiX29zY19zdCIsInJneEciLCJsYXN0SW5kZXgiLCJtYXRjaF8xIiwiZXhlYyIsIm1hdGNoXzIiLCJfb3NjX3JlZ2V4IiwiT1NDVVJMIiwiYmxvY2tzIiwicGFja2V0IiwidHJhbnNmb3JtX3RvX2h0bWwiLCJ3aXRoX3N0YXRlIiwicHJvY2Vzc19hbnNpIiwicHJvY2Vzc19oeXBlcmxpbmsiLCJzZ3JfY21kcyIsInNncl9jbWRfc3RyIiwibnVtIiwiaXNOYU4iLCJpc19mb3JlZ3JvdW5kIiwibW9kZV9jbWQiLCJwYWxldHRlX2luZGV4IiwiYyIsImZyYWdtZW50Iiwic3R5bGVzIiwiY2xhc3NlcyIsImNsYXNzX3N0cmluZyIsInN0eWxlX3N0cmluZyIsInRtcGxPYmoiLCJzdWJzdCIsIl9pIiwicmVnZXhUZXh0Iiwid3NyZ3giLCJ0eHQyIiwiQWxlcnRzU2VydmljZSIsIlNvbHV0aW9uc1NlcnZpY2UiLCJzb2x1dGlvbl90eXBlIiwic29sdXRpb25fbmFtZSIsIkxvZ3NTZXJ2aWNlIiwiaWRfZnJvbSIsIkF1dGhTZXJ2aWNlIiwibmV4dFVybCIsImhhc2giLCJidXR0b25MYWJlbCIsImhhbmRsZUlucHV0IiwiZ2V0Rm9ybVZpZXciLCJ0ZXh0SW5wdXQi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QUFQO0FBQ0g7O0FBR0QsUUFBTXlkLFlBQVk3NUIsR0FBRyxtQkFBSCxDQUFsQjtBQUNBNjVCLGNBQVVuNUIsV0FBVixDQUFzQixTQUF0QixFQUFpQ2k1QixZQUFZbHVCLElBQVosQ0FBaUJvdUIsU0FBakIsQ0FBakM7O0FBRUE1d0IsV0FBTzFKLElBQVA7QUFDQW5CLFVBQU0wN0IsU0FBTixDQUFnQkMsUUFBaEIsQ0FBeUJGLFNBQXpCO0FBQ0gsQzs7Ozs7Ozs7Ozs7Ozs7O0FDbEREOztBQUVBLElBQU16YixXQUFXLHFDQUFqQjs7SUFFTTRiLFk7OztBQUNGLDRCQUFjO0FBQUE7O0FBQUEsZ0RBQ1Ysb0JBQU01YixRQUFOLENBRFU7QUFFYjs7MkJBRUQyQyxJLGlCQUFLbE8sSSxFQUFNO0FBQ1BBLGVBQU9BLFFBQVEsRUFBZjtBQUNBLGVBQU8sS0FBS2lLLE9BQUwsQ0FBYSxZQUFiLENBQVA7QUFDSCxLOzs7RUFSc0JQLDREOztBQVlwQixJQUFNcEIsV0FBVyxJQUFJNmUsWUFBSixFQUFqQixDOzs7Ozs7QUNoQlA7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsdUIiLCJmaWxlIjoiYXBwLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7XG4gXHRcdFx0XHRjb25maWd1cmFibGU6IGZhbHNlLFxuIFx0XHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcbiBcdFx0XHRcdGdldDogZ2V0dGVyXG4gXHRcdFx0fSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiL2NvZGViYXNlL1wiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IDUxKTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyB3ZWJwYWNrL2Jvb3RzdHJhcCAyZTQ5ZmY0ZmZhMmU3MjRjYTI2NCIsImNsYXNzIE5hdmlnYXRpb25CbG9ja2VkIHsgfVxuXG5jbGFzcyBKZXRCYXNlIHtcclxuICAgIGNvbnN0cnVjdG9yKHdlYml4KSB7XHJcbiAgICAgICAgdGhpcy53ZWJpeEpldCA9IHRydWU7XHJcbiAgICAgICAgdGhpcy53ZWJpeCA9IHdlYml4O1xyXG4gICAgICAgIHRoaXMuX2V2ZW50cyA9IFtdO1xyXG4gICAgICAgIHRoaXMuX3N1YnMgPSB7fTtcclxuICAgICAgICB0aGlzLl9kYXRhID0ge307XHJcbiAgICB9XHJcbiAgICBnZXRSb290KCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9yb290O1xyXG4gICAgfVxyXG4gICAgZGVzdHJ1Y3RvcigpIHtcclxuICAgICAgICB0aGlzLl9kZXRhY2hFdmVudHMoKTtcclxuICAgICAgICB0aGlzLl9kZXN0cm95U3VicygpO1xyXG4gICAgICAgIHRoaXMuX2V2ZW50cyA9IHRoaXMuX2NvbnRhaW5lciA9IHRoaXMuYXBwID0gdGhpcy5fcGFyZW50ID0gdGhpcy5fcm9vdCA9IG51bGw7XHJcbiAgICB9XHJcbiAgICBzZXRQYXJhbShpZCwgdmFsdWUsIHVybCkge1xyXG4gICAgICAgIGlmICh0aGlzLl9kYXRhW2lkXSAhPT0gdmFsdWUpIHtcclxuICAgICAgICAgICAgdGhpcy5fZGF0YVtpZF0gPSB2YWx1ZTtcclxuICAgICAgICAgICAgdGhpcy5fc2VnbWVudC51cGRhdGUoaWQsIHZhbHVlLCAwKTtcclxuICAgICAgICAgICAgaWYgKHVybCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuc2hvdyhudWxsKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGdldFBhcmFtKGlkLCBwYXJlbnQpIHtcclxuICAgICAgICBjb25zdCB2YWx1ZSA9IHRoaXMuX2RhdGFbaWRdO1xyXG4gICAgICAgIGlmICh0eXBlb2YgdmFsdWUgIT09IFwidW5kZWZpbmVkXCIgfHwgIXBhcmVudCkge1xyXG4gICAgICAgICAgICByZXR1cm4gdmFsdWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNvbnN0IHZpZXcgPSB0aGlzLmdldFBhcmVudFZpZXcoKTtcclxuICAgICAgICBpZiAodmlldykge1xyXG4gICAgICAgICAgICByZXR1cm4gdmlldy5nZXRQYXJhbShpZCwgcGFyZW50KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBnZXRVcmwoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX3NlZ21lbnQuc3VidXJsKCk7XHJcbiAgICB9XHJcbiAgICBnZXRVcmxTdHJpbmcoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX3NlZ21lbnQudG9TdHJpbmcoKTtcclxuICAgIH1cclxuICAgIGdldFBhcmVudFZpZXcoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX3BhcmVudDtcclxuICAgIH1cclxuICAgICQkKGlkKSB7XHJcbiAgICAgICAgaWYgKHR5cGVvZiBpZCA9PT0gXCJzdHJpbmdcIikge1xyXG4gICAgICAgICAgICBjb25zdCByb290ID0gdGhpcy5nZXRSb290KCk7XHJcbiAgICAgICAgICAgIHJldHVybiByb290LnF1ZXJ5Vmlldygob2JqID0+IChvYmouY29uZmlnLmlkID09PSBpZCB8fCBvYmouY29uZmlnLmxvY2FsSWQgPT09IGlkKSAmJlxyXG4gICAgICAgICAgICAgICAgKG9iai4kc2NvcGUgPT09IHJvb3QuJHNjb3BlKSksIFwic2VsZlwiKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIHJldHVybiBpZDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBvbihvYmosIG5hbWUsIGNvZGUpIHtcclxuICAgICAgICBjb25zdCBpZCA9IG9iai5hdHRhY2hFdmVudChuYW1lLCBjb2RlKTtcclxuICAgICAgICB0aGlzLl9ldmVudHMucHVzaCh7IG9iaiwgaWQgfSk7XHJcbiAgICAgICAgcmV0dXJuIGlkO1xyXG4gICAgfVxyXG4gICAgY29udGFpbnModmlldykge1xyXG4gICAgICAgIGZvciAoY29uc3Qga2V5IGluIHRoaXMuX3N1YnMpIHtcclxuICAgICAgICAgICAgY29uc3Qga2lkID0gdGhpcy5fc3Vic1trZXldLnZpZXc7XHJcbiAgICAgICAgICAgIGlmIChraWQgPT09IHZpZXcgfHwga2lkLmNvbnRhaW5zKHZpZXcpKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcbiAgICBnZXRTdWJWaWV3KG5hbWUpIHtcclxuICAgICAgICBjb25zdCBzdWIgPSB0aGlzLmdldFN1YlZpZXdJbmZvKG5hbWUpO1xyXG4gICAgICAgIGlmIChzdWIpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHN1Yi5zdWJ2aWV3LnZpZXc7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgZ2V0U3ViVmlld0luZm8obmFtZSkge1xyXG4gICAgICAgIGNvbnN0IHN1YiA9IHRoaXMuX3N1YnNbbmFtZSB8fCBcImRlZmF1bHRcIl07XHJcbiAgICAgICAgaWYgKHN1Yikge1xyXG4gICAgICAgICAgICByZXR1cm4geyBzdWJ2aWV3OiBzdWIsIHBhcmVudDogdGhpcyB9O1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAobmFtZSA9PT0gXCJfdG9wXCIpIHtcclxuICAgICAgICAgICAgdGhpcy5fc3Vic1tuYW1lXSA9IHsgdXJsOiBcIlwiLCBpZDogbnVsbCwgcG9wdXA6IHRydWUgfTtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZ2V0U3ViVmlld0luZm8obmFtZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIHdoZW4gY2FsbGVkIGZyb20gYSBjaGlsZCB2aWV3LCBzZWFyY2hlcyBmb3IgbmVhcmVzdCBwYXJlbnQgd2l0aCBzdWJ2aWV3XHJcbiAgICAgICAgaWYgKHRoaXMuX3BhcmVudCkge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fcGFyZW50LmdldFN1YlZpZXdJbmZvKG5hbWUpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgIH1cclxuICAgIF9kZXRhY2hFdmVudHMoKSB7XHJcbiAgICAgICAgY29uc3QgZXZlbnRzID0gdGhpcy5fZXZlbnRzO1xyXG4gICAgICAgIGZvciAobGV0IGkgPSBldmVudHMubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIHtcclxuICAgICAgICAgICAgZXZlbnRzW2ldLm9iai5kZXRhY2hFdmVudChldmVudHNbaV0uaWQpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIF9kZXN0cm95U3VicygpIHtcclxuICAgICAgICAvLyBkZXN0cm95IHN1YiB2aWV3c1xyXG4gICAgICAgIGZvciAoY29uc3Qga2V5IGluIHRoaXMuX3N1YnMpIHtcclxuICAgICAgICAgICAgY29uc3Qgc3ViVmlldyA9IHRoaXMuX3N1YnNba2V5XS52aWV3O1xyXG4gICAgICAgICAgICAvLyBpdCBwb3NzaWJsZSB0aGF0IHN1YnZpZXcgd2FzIG5vdCBsb2FkZWQgd2l0aCBhbnkgY29udGVudCB5ZXRcclxuICAgICAgICAgICAgLy8gc28gY2hlY2sgb24gbnVsbFxyXG4gICAgICAgICAgICBpZiAoc3ViVmlldykge1xyXG4gICAgICAgICAgICAgICAgc3ViVmlldy5kZXN0cnVjdG9yKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gcmVzZXQgdG8gcHJldmVudCBtZW1vcnkgbGVha3NcclxuICAgICAgICB0aGlzLl9zdWJzID0ge307XHJcbiAgICB9XHJcbiAgICBfaW5pdF91cmxfZGF0YSgpIHtcclxuICAgICAgICBjb25zdCB1cmwgPSB0aGlzLl9zZWdtZW50LmN1cnJlbnQoKTtcclxuICAgICAgICB0aGlzLl9kYXRhID0ge307XHJcbiAgICAgICAgdGhpcy53ZWJpeC5leHRlbmQodGhpcy5fZGF0YSwgdXJsLnBhcmFtcywgdHJ1ZSk7XHJcbiAgICB9XHJcbiAgICBfZ2V0RGVmYXVsdFN1YigpIHtcclxuICAgICAgICBpZiAodGhpcy5fc3Vicy5kZWZhdWx0KSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9zdWJzLmRlZmF1bHQ7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGZvciAoY29uc3Qga2V5IGluIHRoaXMuX3N1YnMpIHtcclxuICAgICAgICAgICAgY29uc3Qgc3ViID0gdGhpcy5fc3Vic1trZXldO1xyXG4gICAgICAgICAgICBpZiAoIXN1Yi5icmFuY2ggJiYgc3ViLnZpZXcgJiYga2V5ICE9PSBcIl90b3BcIikge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgY2hpbGQgPSBzdWIudmlldy5fZ2V0RGVmYXVsdFN1YigpO1xyXG4gICAgICAgICAgICAgICAgaWYgKGNoaWxkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGNoaWxkO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgX3JvdXRlZF92aWV3KCkge1xyXG4gICAgICAgIGNvbnN0IHBhcmVudCA9IHRoaXMuZ2V0UGFyZW50VmlldygpO1xyXG4gICAgICAgIGlmICghcGFyZW50KSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjb25zdCBzdWIgPSBwYXJlbnQuX2dldERlZmF1bHRTdWIoKTtcclxuICAgICAgICBpZiAoIXN1YiAmJiBzdWIgIT09IHRoaXMpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gcGFyZW50Ll9yb3V0ZWRfdmlldygpO1xyXG4gICAgfVxyXG59XG5cbmZ1bmN0aW9uIHBhcnNlKHVybCkge1xyXG4gICAgLy8gcmVtb3ZlIHN0YXJ0aW5nIC9cclxuICAgIGlmICh1cmxbMF0gPT09IFwiL1wiKSB7XHJcbiAgICAgICAgdXJsID0gdXJsLnN1YnN0cigxKTtcclxuICAgIH1cclxuICAgIC8vIHNwbGl0IHVybCBieSBcIi9cIlxyXG4gICAgY29uc3QgcGFydHMgPSB1cmwuc3BsaXQoXCIvXCIpO1xyXG4gICAgY29uc3QgY2h1bmtzID0gW107XHJcbiAgICAvLyBmb3IgZWFjaCBwYWdlIGluIHVybFxyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBwYXJ0cy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgIGNvbnN0IHRlc3QgPSBwYXJ0c1tpXTtcclxuICAgICAgICBjb25zdCByZXN1bHQgPSB7fTtcclxuICAgICAgICAvLyBkZXRlY3QgcGFyYW1zXHJcbiAgICAgICAgLy8gc3VwcG9ydCBvbGQgXHRcdFx0c29tZTphPWI6Yz1kXHJcbiAgICAgICAgLy8gYW5kIG5ldyBub3RhdGlvblx0XHRzb21lP2E9YiZjPWRcclxuICAgICAgICBsZXQgcG9zID0gdGVzdC5pbmRleE9mKFwiOlwiKTtcclxuICAgICAgICBpZiAocG9zID09PSAtMSkge1xyXG4gICAgICAgICAgICBwb3MgPSB0ZXN0LmluZGV4T2YoXCI/XCIpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAocG9zICE9PSAtMSkge1xyXG4gICAgICAgICAgICBjb25zdCBwYXJhbXMgPSB0ZXN0LnN1YnN0cihwb3MgKyAxKS5zcGxpdCgvW1xcOlxcP1xcJl0vZyk7XHJcbiAgICAgICAgICAgIC8vIGNyZWF0ZSBoYXNoIG9mIG5hbWVkIHBhcmFtc1xyXG4gICAgICAgICAgICBmb3IgKGNvbnN0IHBhcmFtIG9mIHBhcmFtcykge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgZGNodW5rID0gcGFyYW0uc3BsaXQoXCI9XCIpO1xyXG4gICAgICAgICAgICAgICAgcmVzdWx0W2RjaHVua1swXV0gPSBkZWNvZGVVUklDb21wb25lbnQoZGNodW5rWzFdKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICAvLyBzdG9yZSBwYXJzZWQgdmFsdWVzXHJcbiAgICAgICAgY2h1bmtzW2ldID0ge1xyXG4gICAgICAgICAgICBwYWdlOiAocG9zID4gLTEgPyB0ZXN0LnN1YnN0cigwLCBwb3MpIDogdGVzdCksXHJcbiAgICAgICAgICAgIHBhcmFtczogcmVzdWx0LFxyXG4gICAgICAgICAgICBpc05ldzogdHJ1ZVxyXG4gICAgICAgIH07XHJcbiAgICB9XHJcbiAgICAvLyByZXR1cm4gYXJyYXkgb2YgcGFnZSBvYmplY3RzXHJcbiAgICByZXR1cm4gY2h1bmtzO1xyXG59XHJcbmZ1bmN0aW9uIHVybDJzdHIoc3RhY2spIHtcclxuICAgIGNvbnN0IHVybCA9IFtdO1xyXG4gICAgZm9yIChjb25zdCBjaHVuayBvZiBzdGFjaykge1xyXG4gICAgICAgIHVybC5wdXNoKFwiL1wiICsgY2h1bmsucGFnZSk7XHJcbiAgICAgICAgY29uc3QgcGFyYW1zID0gb2JqMnN0cihjaHVuay5wYXJhbXMpO1xyXG4gICAgICAgIGlmIChwYXJhbXMpIHtcclxuICAgICAgICAgICAgdXJsLnB1c2goXCI/XCIgKyBwYXJhbXMpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiB1cmwuam9pbihcIlwiKTtcclxufVxyXG5mdW5jdGlvbiBvYmoyc3RyKG9iaikge1xyXG4gICAgY29uc3Qgc3RyID0gW107XHJcbiAgICBmb3IgKGNvbnN0IGtleSBpbiBvYmopIHtcclxuICAgICAgICBpZiAoc3RyLmxlbmd0aCkge1xyXG4gICAgICAgICAgICBzdHIucHVzaChcIiZcIik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHN0ci5wdXNoKGtleSArIFwiPVwiICsgZW5jb2RlVVJJQ29tcG9uZW50KG9ialtrZXldKSk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gc3RyLmpvaW4oXCJcIik7XHJcbn1cblxuY2xhc3MgUm91dGUge1xyXG4gICAgY29uc3RydWN0b3Iocm91dGUsIGluZGV4KSB7XHJcbiAgICAgICAgdGhpcy5fbmV4dCA9IDE7XHJcbiAgICAgICAgaWYgKHR5cGVvZiByb3V0ZSA9PT0gXCJzdHJpbmdcIikge1xyXG4gICAgICAgICAgICB0aGlzLnJvdXRlID0ge1xyXG4gICAgICAgICAgICAgICAgdXJsOiBwYXJzZShyb3V0ZSksXHJcbiAgICAgICAgICAgICAgICBwYXRoOiByb3V0ZVxyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5yb3V0ZSA9IHJvdXRlO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmluZGV4ID0gaW5kZXg7XHJcbiAgICB9XHJcbiAgICBjdXJyZW50KCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnJvdXRlLnVybFt0aGlzLmluZGV4XTtcclxuICAgIH1cclxuICAgIG5leHQoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMucm91dGUudXJsW3RoaXMuaW5kZXggKyB0aGlzLl9uZXh0XTtcclxuICAgIH1cclxuICAgIHN1YnVybCgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5yb3V0ZS51cmwuc2xpY2UodGhpcy5pbmRleCk7XHJcbiAgICB9XHJcbiAgICBzaGlmdCgpIHtcclxuICAgICAgICByZXR1cm4gbmV3IFJvdXRlKHRoaXMucm91dGUsIHRoaXMuaW5kZXggKyB0aGlzLl9uZXh0KTtcclxuICAgIH1cclxuICAgIHJlZnJlc2goKSB7XHJcbiAgICAgICAgY29uc3QgdXJsID0gdGhpcy5yb3V0ZS51cmw7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IHRoaXMuaW5kZXggKyAxOyBpIDwgdXJsLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIHVybFtpXS5pc05ldyA9IHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgdG9TdHJpbmcoKSB7XHJcbiAgICAgICAgY29uc3Qgc3RyID0gdXJsMnN0cih0aGlzLnN1YnVybCgpKTtcclxuICAgICAgICByZXR1cm4gc3RyID8gc3RyLnN1YnN0cigxKSA6IFwiXCI7XHJcbiAgICB9XHJcbiAgICBfam9pbihwYXRoLCBraWRzKSB7XHJcbiAgICAgICAgbGV0IHVybCA9IHRoaXMucm91dGUudXJsO1xyXG4gICAgICAgIGlmIChwYXRoID09PSBudWxsKSB7IC8vIGNoYW5nZSBvZiBwYXJhbWV0ZXJzLCByb3V0ZSBlbGVtZW50cyBhcmUgbm90IGFmZmVjdGVkXHJcbiAgICAgICAgICAgIHJldHVybiB1cmw7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNvbnN0IG9sZCA9IHRoaXMucm91dGUudXJsO1xyXG4gICAgICAgIHVybCA9IG9sZC5zbGljZSgwLCB0aGlzLmluZGV4ICsgKGtpZHMgPyB0aGlzLl9uZXh0IDogMCkpO1xyXG4gICAgICAgIGlmIChwYXRoKSB7XHJcbiAgICAgICAgICAgIHVybCA9IHVybC5jb25jYXQocGFyc2UocGF0aCkpO1xyXG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHVybC5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgaWYgKG9sZFtpXSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHVybFtpXS52aWV3ID0gb2xkW2ldLnZpZXc7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZiAob2xkW2ldICYmIHVybFtpXS5wYWdlID09PSBvbGRbaV0ucGFnZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHVybFtpXS5pc05ldyA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB1cmw7XHJcbiAgICB9XHJcbiAgICBhcHBlbmQocGF0aCkge1xyXG4gICAgICAgIGNvbnN0IHVybCA9IHRoaXMuX2pvaW4ocGF0aCwgdHJ1ZSk7XHJcbiAgICAgICAgdGhpcy5yb3V0ZS5wYXRoID0gdXJsMnN0cih1cmwpO1xyXG4gICAgICAgIHRoaXMucm91dGUudXJsID0gdXJsO1xyXG4gICAgICAgIHJldHVybiB0aGlzLnJvdXRlLnBhdGg7XHJcbiAgICB9XHJcbiAgICBzaG93KHBhdGgsIHZpZXcsIGtpZHMpIHtcclxuICAgICAgICBjb25zdCB1cmwgPSB0aGlzLl9qb2luKHBhdGgsIGtpZHMpO1xyXG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzLCByZWopID0+IHtcclxuICAgICAgICAgICAgY29uc3QgcmVkaXJlY3QgPSB1cmwyc3RyKHVybCk7XHJcbiAgICAgICAgICAgIGNvbnN0IG9iaiA9IHtcclxuICAgICAgICAgICAgICAgIHVybCxcclxuICAgICAgICAgICAgICAgIHJlZGlyZWN0LFxyXG4gICAgICAgICAgICAgICAgY29uZmlybTogUHJvbWlzZS5yZXNvbHZlKClcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgY29uc3QgYXBwID0gdmlldyA/IHZpZXcuYXBwIDogbnVsbDtcclxuICAgICAgICAgICAgLy8gd2hlbiBjcmVhdGluZyBhIG5ldyByb3V0ZSwgaXQgcG9zc2libGUgdGhhdCBpdCB3aWxsIG5vdCBoYXZlIGFueSBjb250ZW50XHJcbiAgICAgICAgICAgIC8vIGd1YXJkIGlzIG5vdCBuZWNlc3NhcnkgaW4gc3VjaCBjYXNlXHJcbiAgICAgICAgICAgIGlmIChhcHApIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHJlc3VsdCA9IGFwcC5jYWxsRXZlbnQoXCJhcHA6Z3VhcmRcIiwgW29iai5yZWRpcmVjdCwgdmlldywgb2JqXSk7XHJcbiAgICAgICAgICAgICAgICBpZiAoIXJlc3VsdCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJlaihuZXcgTmF2aWdhdGlvbkJsb2NrZWQoKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIG9iai5jb25maXJtLmNhdGNoKGVyciA9PiByZWooZXJyKSkudGhlbigoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAob2JqLnJlZGlyZWN0ID09PSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVqKG5ldyBOYXZpZ2F0aW9uQmxvY2tlZCgpKTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZiAob2JqLnJlZGlyZWN0ICE9PSByZWRpcmVjdCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGFwcC5zaG93KG9iai5yZWRpcmVjdCk7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVqKG5ldyBOYXZpZ2F0aW9uQmxvY2tlZCgpKTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB0aGlzLnJvdXRlLnBhdGggPSByZWRpcmVjdDtcclxuICAgICAgICAgICAgICAgIHRoaXMucm91dGUudXJsID0gdXJsO1xyXG4gICAgICAgICAgICAgICAgcmVzKCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgc2l6ZShuKSB7XHJcbiAgICAgICAgdGhpcy5fbmV4dCA9IG47XHJcbiAgICB9XHJcbiAgICBzcGxpdCgpIHtcclxuICAgICAgICBjb25zdCByb3V0ZSA9IHtcclxuICAgICAgICAgICAgdXJsOiB0aGlzLnJvdXRlLnVybC5zbGljZSh0aGlzLmluZGV4ICsgMSksXHJcbiAgICAgICAgICAgIHBhdGg6IFwiXCJcclxuICAgICAgICB9O1xyXG4gICAgICAgIGlmIChyb3V0ZS51cmwubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgIHJvdXRlLnBhdGggPSB1cmwyc3RyKHJvdXRlLnVybCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBuZXcgUm91dGUocm91dGUsIDApO1xyXG4gICAgfVxyXG4gICAgdXBkYXRlKG5hbWUsIHZhbHVlLCBpbmRleCkge1xyXG4gICAgICAgIGNvbnN0IGNodW5rID0gdGhpcy5yb3V0ZS51cmxbdGhpcy5pbmRleCArIChpbmRleCB8fCAwKV07XHJcbiAgICAgICAgaWYgKCFjaHVuaykge1xyXG4gICAgICAgICAgICB0aGlzLnJvdXRlLnVybC5wdXNoKHsgcGFnZTogXCJcIiwgcGFyYW1zOiB7fSB9KTtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMudXBkYXRlKG5hbWUsIHZhbHVlLCBpbmRleCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChuYW1lID09PSBcIlwiKSB7XHJcbiAgICAgICAgICAgIGNodW5rLnBhZ2UgPSB2YWx1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIGNodW5rLnBhcmFtc1tuYW1lXSA9IHZhbHVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLnJvdXRlLnBhdGggPSB1cmwyc3RyKHRoaXMucm91dGUudXJsKTtcclxuICAgIH1cclxufVxuXG5jbGFzcyBKZXRWaWV3IGV4dGVuZHMgSmV0QmFzZSB7XHJcbiAgICBjb25zdHJ1Y3RvcihhcHAsIGNvbmZpZykge1xyXG4gICAgICAgIHN1cGVyKGFwcC53ZWJpeCk7XHJcbiAgICAgICAgdGhpcy5hcHAgPSBhcHA7XHJcbiAgICAgICAgLy90aGlzLiRjb25maWcgPSBjb25maWc7XHJcbiAgICAgICAgdGhpcy5fY2hpbGRyZW4gPSBbXTtcclxuICAgIH1cclxuICAgIHVpKHVpLCBjb25maWcpIHtcclxuICAgICAgICBjb25maWcgPSBjb25maWcgfHwge307XHJcbiAgICAgICAgY29uc3QgY29udGFpbmVyID0gY29uZmlnLmNvbnRhaW5lciB8fCB1aS5jb250YWluZXI7XHJcbiAgICAgICAgY29uc3QgamV0dmlldyA9IHRoaXMuYXBwLmNyZWF0ZVZpZXcodWkpO1xyXG4gICAgICAgIHRoaXMuX2NoaWxkcmVuLnB1c2goamV0dmlldyk7XHJcbiAgICAgICAgamV0dmlldy5yZW5kZXIoY29udGFpbmVyLCB0aGlzLl9zZWdtZW50LCB0aGlzKTtcclxuICAgICAgICBpZiAodHlwZW9mIHVpICE9PSBcIm9iamVjdFwiIHx8ICh1aSBpbnN0YW5jZW9mIEpldEJhc2UpKSB7XHJcbiAgICAgICAgICAgIC8vIHJhdyB3ZWJpeCBVSVxyXG4gICAgICAgICAgICByZXR1cm4gamV0dmlldztcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIHJldHVybiBqZXR2aWV3LmdldFJvb3QoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBzaG93KHBhdGgsIGNvbmZpZykge1xyXG4gICAgICAgIGNvbmZpZyA9IGNvbmZpZyB8fCB7fTtcclxuICAgICAgICAvLyBjb252ZXJ0IHBhcmFtZXRlcnMgb2JqZWN0IHRvIHVybFxyXG4gICAgICAgIGlmICh0eXBlb2YgcGF0aCA9PT0gXCJvYmplY3RcIikge1xyXG4gICAgICAgICAgICBmb3IgKGNvbnN0IGtleSBpbiBwYXRoKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNldFBhcmFtKGtleSwgcGF0aFtrZXldKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBwYXRoID0gbnVsbDtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIC8vIGRlbGlnYXRlIHRvIGFwcCBpbiBjYXNlIG9mIHJvb3QgcHJlZml4XHJcbiAgICAgICAgICAgIGlmIChwYXRoLnN1YnN0cigwLCAxKSA9PT0gXCIvXCIpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmFwcC5zaG93KHBhdGgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIC8vIGxvY2FsIHBhdGgsIGRvIG5vdGhpbmdcclxuICAgICAgICAgICAgaWYgKHBhdGguaW5kZXhPZihcIi4vXCIpID09PSAwKSB7XHJcbiAgICAgICAgICAgICAgICBwYXRoID0gcGF0aC5zdWJzdHIoMik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgLy8gcGFyZW50IHBhdGgsIGNhbGwgcGFyZW50IHZpZXdcclxuICAgICAgICAgICAgaWYgKHBhdGguaW5kZXhPZihcIi4uL1wiKSA9PT0gMCkge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgcGFyZW50ID0gdGhpcy5nZXRQYXJlbnRWaWV3KCk7XHJcbiAgICAgICAgICAgICAgICBpZiAocGFyZW50KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHBhcmVudC5zaG93KHBhdGguc3Vic3RyKDMpLCBjb25maWcpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuYXBwLnNob3coXCIvXCIgKyBwYXRoLnN1YnN0cigzKSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY29uc3Qgc3ViID0gdGhpcy5nZXRTdWJWaWV3SW5mbyhjb25maWcudGFyZ2V0KTtcclxuICAgICAgICAgICAgaWYgKHN1Yikge1xyXG4gICAgICAgICAgICAgICAgaWYgKHN1Yi5wYXJlbnQgIT09IHRoaXMpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gc3ViLnBhcmVudC5zaG93KHBhdGgsIGNvbmZpZyk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlIGlmIChjb25maWcudGFyZ2V0ICYmIGNvbmZpZy50YXJnZXQgIT09IFwiZGVmYXVsdFwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3JlbmRlckZyYW1lTG9jayhjb25maWcudGFyZ2V0LCBzdWIuc3VidmlldywgcGF0aCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBpZiAocGF0aCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmFwcC5zaG93KFwiL1wiICsgcGF0aCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX3Nob3codGhpcy5fc2VnbWVudCwgcGF0aCwgdGhpcyk7XHJcbiAgICB9XHJcbiAgICBfc2hvdyhzZWdtZW50LCBwYXRoLCB2aWV3KSB7XHJcbiAgICAgICAgcmV0dXJuIHNlZ21lbnQuc2hvdyhwYXRoLCB2aWV3LCB0cnVlKS50aGVuKCgpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5faW5pdF91cmxfZGF0YSgpO1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fdXJsQ2hhbmdlKCk7XHJcbiAgICAgICAgfSkudGhlbigoKSA9PiB7XHJcbiAgICAgICAgICAgIGlmIChzZWdtZW50LnJvdXRlLmxpbmtSb3V0ZXIpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuYXBwLmdldFJvdXRlcigpLnNldChzZWdtZW50LnJvdXRlLnBhdGgsIHsgc2lsZW50OiB0cnVlIH0pO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5hcHAuY2FsbEV2ZW50KFwiYXBwOnJvdXRlXCIsIFtzZWdtZW50LnJvdXRlLnBhdGhdKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgaW5pdChfJHZpZXcsIF8kKSB7XHJcbiAgICAgICAgLy8gc3R1YlxyXG4gICAgfVxyXG4gICAgcmVhZHkoXyR2aWV3LCBfJHVybCkge1xyXG4gICAgICAgIC8vIHN0dWJcclxuICAgIH1cclxuICAgIGNvbmZpZygpIHtcclxuICAgICAgICB0aGlzLmFwcC53ZWJpeC5tZXNzYWdlKFwiVmlldzpDb25maWcgaXMgbm90IGltcGxlbWVudGVkXCIpO1xyXG4gICAgfVxyXG4gICAgdXJsQ2hhbmdlKF8kdmlldywgXyR1cmwpIHtcclxuICAgICAgICAvLyBzdHViXHJcbiAgICB9XHJcbiAgICBkZXN0cm95KCkge1xyXG4gICAgICAgIC8vIHN0dWJcclxuICAgIH1cclxuICAgIGRlc3RydWN0b3IoKSB7XHJcbiAgICAgICAgdGhpcy5kZXN0cm95KCk7XHJcbiAgICAgICAgdGhpcy5fZGVzdHJveUtpZHMoKTtcclxuICAgICAgICAvLyBkZXN0cm95IGFjdHVhbCBVSVxyXG4gICAgICAgIHRoaXMuX3Jvb3QuZGVzdHJ1Y3RvcigpO1xyXG4gICAgICAgIHN1cGVyLmRlc3RydWN0b3IoKTtcclxuICAgIH1cclxuICAgIHVzZShwbHVnaW4sIGNvbmZpZykge1xyXG4gICAgICAgIHBsdWdpbih0aGlzLmFwcCwgdGhpcywgY29uZmlnKTtcclxuICAgIH1cclxuICAgIHJlZnJlc2goKSB7XHJcbiAgICAgICAgY29uc3QgdXJsID0gdGhpcy5nZXRVcmwoKTtcclxuICAgICAgICB0aGlzLmRlc3Ryb3koKTtcclxuICAgICAgICB0aGlzLl9kZXN0cm95S2lkcygpO1xyXG4gICAgICAgIHRoaXMuX2Rlc3Ryb3lTdWJzKCk7XHJcbiAgICAgICAgdGhpcy5fZGV0YWNoRXZlbnRzKCk7XHJcbiAgICAgICAgaWYgKHRoaXMuX2NvbnRhaW5lci50YWdOYW1lKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX3Jvb3QuZGVzdHJ1Y3RvcigpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLl9zZWdtZW50LnJlZnJlc2goKTtcclxuICAgICAgICByZXR1cm4gdGhpcy5fcmVuZGVyKHRoaXMuX3NlZ21lbnQpO1xyXG4gICAgfVxyXG4gICAgcmVuZGVyKHJvb3QsIHVybCwgcGFyZW50KSB7XHJcbiAgICAgICAgaWYgKHR5cGVvZiB1cmwgPT09IFwic3RyaW5nXCIpIHtcclxuICAgICAgICAgICAgdXJsID0gbmV3IFJvdXRlKHVybCwgMCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuX3NlZ21lbnQgPSB1cmw7XHJcbiAgICAgICAgdGhpcy5fcGFyZW50ID0gcGFyZW50O1xyXG4gICAgICAgIHRoaXMuX2luaXRfdXJsX2RhdGEoKTtcclxuICAgICAgICByb290ID0gcm9vdCB8fCBkb2N1bWVudC5ib2R5O1xyXG4gICAgICAgIGNvbnN0IF9jb250YWluZXIgPSAodHlwZW9mIHJvb3QgPT09IFwic3RyaW5nXCIpID8gdGhpcy53ZWJpeC50b05vZGUocm9vdCkgOiByb290O1xyXG4gICAgICAgIGlmICh0aGlzLl9jb250YWluZXIgIT09IF9jb250YWluZXIpIHtcclxuICAgICAgICAgICAgdGhpcy5fY29udGFpbmVyID0gX2NvbnRhaW5lcjtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3JlbmRlcih1cmwpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3VybENoYW5nZSgpLnRoZW4oKCkgPT4gdGhpcy5nZXRSb290KCkpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIF9yZW5kZXIodXJsKSB7XHJcbiAgICAgICAgY29uc3QgY29uZmlnID0gdGhpcy5jb25maWcoKTtcclxuICAgICAgICBpZiAoY29uZmlnLnRoZW4pIHtcclxuICAgICAgICAgICAgcmV0dXJuIGNvbmZpZy50aGVuKGNmZyA9PiB0aGlzLl9yZW5kZXJfZmluYWwoY2ZnLCB1cmwpKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9yZW5kZXJfZmluYWwoY29uZmlnLCB1cmwpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIF9yZW5kZXJfZmluYWwoY29uZmlnLCB1cmwpIHtcclxuICAgICAgICAvLyBnZXQgcHJldmlvdXMgdmlldyBpbiB0aGUgc2FtZSBzbG90XHJcbiAgICAgICAgbGV0IHNsb3QgPSBudWxsO1xyXG4gICAgICAgIGxldCBjb250YWluZXIgPSBudWxsO1xyXG4gICAgICAgIGxldCBzaG93ID0gZmFsc2U7XHJcbiAgICAgICAgaWYgKCF0aGlzLl9jb250YWluZXIudGFnTmFtZSkge1xyXG4gICAgICAgICAgICBzbG90ID0gdGhpcy5fY29udGFpbmVyO1xyXG4gICAgICAgICAgICBpZiAoc2xvdC5wb3B1cCkge1xyXG4gICAgICAgICAgICAgICAgY29udGFpbmVyID0gZG9jdW1lbnQuYm9keTtcclxuICAgICAgICAgICAgICAgIHNob3cgPSB0cnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgY29udGFpbmVyID0gdGhpcy53ZWJpeC4kJChzbG90LmlkKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgY29udGFpbmVyID0gdGhpcy5fY29udGFpbmVyO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvLyB2aWV3IGFscmVhZHkgZGVzdHJveWVkXHJcbiAgICAgICAgaWYgKCF0aGlzLmFwcCB8fCAhY29udGFpbmVyKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdChudWxsKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IHJlc3BvbnNlO1xyXG4gICAgICAgIGNvbnN0IGN1cnJlbnQgPSB0aGlzLl9zZWdtZW50LmN1cnJlbnQoKTtcclxuICAgICAgICAvLyB1c2luZyB3cmFwcGVyIG9iamVjdCwgc28gdWkgY2FuIGJlIGNoYW5nZWQgZnJvbSBhcHA6cmVuZGVyIGV2ZW50XHJcbiAgICAgICAgY29uc3QgcmVzdWx0ID0geyB1aToge30gfTtcclxuICAgICAgICB0aGlzLmFwcC5jb3B5Q29uZmlnKGNvbmZpZywgcmVzdWx0LnVpLCB0aGlzLl9zdWJzKTtcclxuICAgICAgICB0aGlzLmFwcC5jYWxsRXZlbnQoXCJhcHA6cmVuZGVyXCIsIFt0aGlzLCB1cmwsIHJlc3VsdF0pO1xyXG4gICAgICAgIHJlc3VsdC51aS4kc2NvcGUgPSB0aGlzO1xyXG4gICAgICAgIC8qIGRlc3Ryb3kgb2xkIEhUTUwgYXR0YWNoZWQgdmlld3MgYmVmb3JlIGNyZWF0aW5nIG5ldyBvbmUgKi9cclxuICAgICAgICBpZiAoIXNsb3QgJiYgY3VycmVudC5pc05ldyAmJiBjdXJyZW50LnZpZXcpIHtcclxuICAgICAgICAgICAgY3VycmVudC52aWV3LmRlc3RydWN0b3IoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgLy8gc3BlY2lhbCBoYW5kbGluZyBmb3IgYWRkaW5nIGluc2lkZSBvZiBtdWx0aXZpZXcgLSBwcmVzZXJ2ZSBvbGQgaWRcclxuICAgICAgICAgICAgaWYgKHNsb3QgJiYgIXNob3cpIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IG9sZHVpID0gY29udGFpbmVyO1xyXG4gICAgICAgICAgICAgICAgY29uc3QgcGFyZW50ID0gb2xkdWkuZ2V0UGFyZW50VmlldygpO1xyXG4gICAgICAgICAgICAgICAgaWYgKHBhcmVudCAmJiBwYXJlbnQubmFtZSA9PT0gXCJtdWx0aXZpZXdcIiAmJiAhcmVzdWx0LnVpLmlkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0LnVpLmlkID0gb2xkdWkuY29uZmlnLmlkO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMuX3Jvb3QgPSB0aGlzLmFwcC53ZWJpeC51aShyZXN1bHQudWksIGNvbnRhaW5lcik7XHJcbiAgICAgICAgICAgIGNvbnN0IGFzV2luID0gdGhpcy5fcm9vdDtcclxuICAgICAgICAgICAgLy8gY2hlY2sgZm9yIHVybCBhZGRlZCB0byBpZ25vcmUgdGhpcy51aSBjYWxsc1xyXG4gICAgICAgICAgICBpZiAoc2hvdyAmJiBhc1dpbi5zZXRQb3NpdGlvbiAmJiAhYXNXaW4uaXNWaXNpYmxlKCkpIHtcclxuICAgICAgICAgICAgICAgIGFzV2luLnNob3coKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAvLyBjaGVjaywgaWYgd2UgYXJlIHJlcGxhY2luZyBzb21lIG9sZGVyIHZpZXdcclxuICAgICAgICAgICAgaWYgKHNsb3QpIHtcclxuICAgICAgICAgICAgICAgIGlmIChzbG90LnZpZXcgJiYgc2xvdC52aWV3ICE9PSB0aGlzICYmIHNsb3QudmlldyAhPT0gdGhpcy5hcHApIHtcclxuICAgICAgICAgICAgICAgICAgICBzbG90LnZpZXcuZGVzdHJ1Y3RvcigpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgc2xvdC5pZCA9IHRoaXMuX3Jvb3QuY29uZmlnLmlkO1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuZ2V0UGFyZW50VmlldygpIHx8ICF0aGlzLmFwcC5hcHApXHJcbiAgICAgICAgICAgICAgICAgICAgc2xvdC52aWV3ID0gdGhpcztcclxuICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIHdoZW4gd2UgaGF2ZSBzdWJhcHAsIHNldCB3aG9sZSBhcHAgYXMgYSB2aWV3XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gc28gb24gZGVzdHJ1Y3Rpb24sIHRoZSB3aG9sZSBhcHAgd2lsbCBiZSBkZXN0cm95ZWRcclxuICAgICAgICAgICAgICAgICAgICBzbG90LnZpZXcgPSB0aGlzLmFwcDtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoY3VycmVudC5pc05ldykge1xyXG4gICAgICAgICAgICAgICAgY3VycmVudC52aWV3ID0gdGhpcztcclxuICAgICAgICAgICAgICAgIGN1cnJlbnQuaXNOZXcgPSBmYWxzZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXNwb25zZSA9IFByb21pc2UucmVzb2x2ZSh0aGlzLl9pbml0KHRoaXMuX3Jvb3QsIHVybCkpLnRoZW4oKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3VybENoYW5nZSgpLnRoZW4oKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2luaXRVcmwgPSBudWxsO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLnJlYWR5KHRoaXMuX3Jvb3QsIHVybC5zdWJ1cmwoKSk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNhdGNoIChlKSB7XHJcbiAgICAgICAgICAgIHJlc3BvbnNlID0gUHJvbWlzZS5yZWplY3QoZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiByZXNwb25zZS5jYXRjaChlcnIgPT4gdGhpcy5faW5pdEVycm9yKHRoaXMsIGVycikpO1xyXG4gICAgfVxyXG4gICAgX2luaXQodmlldywgdXJsKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuaW5pdCh2aWV3LCB1cmwuc3VidXJsKCkpO1xyXG4gICAgfVxyXG4gICAgX3VybENoYW5nZSgpIHtcclxuICAgICAgICB0aGlzLmFwcC5jYWxsRXZlbnQoXCJhcHA6dXJsY2hhbmdlXCIsIFt0aGlzLCB0aGlzLl9zZWdtZW50XSk7XHJcbiAgICAgICAgY29uc3Qgd2FpdHMgPSBbXTtcclxuICAgICAgICBmb3IgKGNvbnN0IGtleSBpbiB0aGlzLl9zdWJzKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGZyYW1lID0gdGhpcy5fc3Vic1trZXldO1xyXG4gICAgICAgICAgICBjb25zdCB3YWl0ID0gdGhpcy5fcmVuZGVyRnJhbWVMb2NrKGtleSwgZnJhbWUsIG51bGwpO1xyXG4gICAgICAgICAgICBpZiAod2FpdCkge1xyXG4gICAgICAgICAgICAgICAgd2FpdHMucHVzaCh3YWl0KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gUHJvbWlzZS5hbGwod2FpdHMpLnRoZW4oKCkgPT4ge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy51cmxDaGFuZ2UodGhpcy5fcm9vdCwgdGhpcy5fc2VnbWVudC5zdWJ1cmwoKSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICBfcmVuZGVyRnJhbWVMb2NrKGtleSwgZnJhbWUsIHBhdGgpIHtcclxuICAgICAgICAvLyBpZiBzdWJ2aWV3IGlzIG5vdCBvY2N1cGllZCBieSBzb21lIHJlbmRlcmluZyB5ZXRcclxuICAgICAgICBpZiAoIWZyYW1lLmxvY2spIHtcclxuICAgICAgICAgICAgLy8gcmV0cmVpdmUgYW5kIHN0b3JlIHJlbmRlcmluZyBlbmQgcHJvbWlzZVxyXG4gICAgICAgICAgICBjb25zdCBsb2NrID0gdGhpcy5fcmVuZGVyRnJhbWUoa2V5LCBmcmFtZSwgcGF0aCk7XHJcbiAgICAgICAgICAgIGlmIChsb2NrKSB7XHJcbiAgICAgICAgICAgICAgICAvLyBjbGVhciBsb2NrIGFmdGVyIGZyYW1lIHJlbmRlcmluZ1xyXG4gICAgICAgICAgICAgICAgLy8gYXMgcHJvbWlzZS5maW5hbGx5IGlzIG5vdCBzdXBwb3J0ZWQgYnkgIFdlYml4IGxlc3NlciB0aGFuIDYuMlxyXG4gICAgICAgICAgICAgICAgLy8gdXNpbmcgYSBtb3JlIHZlcmJvc2Ugbm90YXRpb25cclxuICAgICAgICAgICAgICAgIGZyYW1lLmxvY2sgPSBsb2NrLnRoZW4oKCkgPT4gZnJhbWUubG9jayA9IG51bGwsICgpID0+IGZyYW1lLmxvY2sgPSBudWxsKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICAvLyByZXR1cm4gcmVuZGVyaW5nIGVuZCBwcm9taXNlXHJcbiAgICAgICAgcmV0dXJuIGZyYW1lLmxvY2s7XHJcbiAgICB9XHJcbiAgICBfcmVuZGVyRnJhbWUoa2V5LCBmcmFtZSwgcGF0aCkge1xyXG4gICAgICAgIC8vZGVmYXVsdCByb3V0ZVxyXG4gICAgICAgIGlmIChrZXkgPT09IFwiZGVmYXVsdFwiKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLl9zZWdtZW50Lm5leHQoKSkge1xyXG4gICAgICAgICAgICAgICAgLy8gd2UgaGF2ZSBhIG5leHQgc2VnbWVudCBpbiB1cmwsIHJlbmRlciBpdFxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2NyZWF0ZVN1YlZpZXcoZnJhbWUsIHRoaXMuX3NlZ21lbnQuc2hpZnQoKSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSBpZiAoZnJhbWUudmlldyAmJiBmcmFtZS5wb3B1cCkge1xyXG4gICAgICAgICAgICAgICAgLy8gdGhlcmUgaXMgbm8gbmV4dCBzZWdtZW50LCBkZWxldGUgdGhlIGV4aXN0aW5nIHN1Yi12aWV3XHJcbiAgICAgICAgICAgICAgICBmcmFtZS52aWV3LmRlc3RydWN0b3IoKTtcclxuICAgICAgICAgICAgICAgIGZyYW1lLnZpZXcgPSBudWxsO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vaWYgbmV3IHBhdGggcHJvdmlkZWQsIHNldCBpdCB0byB0aGUgZnJhbWVcclxuICAgICAgICBpZiAocGF0aCAhPT0gbnVsbCkge1xyXG4gICAgICAgICAgICBmcmFtZS51cmwgPSBwYXRoO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvLyBpbiBjYXNlIG9mIHJvdXRlZCBzdWItdmlld1xyXG4gICAgICAgIGlmIChmcmFtZS5yb3V0ZSkge1xyXG4gICAgICAgICAgICAvLyB3ZSBoYXZlIGEgbmV3IHBhdGggZm9yIHN1Yi12aWV3XHJcbiAgICAgICAgICAgIGlmIChwYXRoICE9PSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZnJhbWUucm91dGUuc2hvdyhwYXRoLCBmcmFtZS52aWV3KS50aGVuKCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fY3JlYXRlU3ViVmlldyhmcmFtZSwgZnJhbWUucm91dGUpO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgLy8gZG8gbm90IHRyaWdnZXIgb25DaGFuZ2UgZm9yIGlzb2xhdGVkIHN1Yi12aWV3c1xyXG4gICAgICAgICAgICBpZiAoZnJhbWUuYnJhbmNoKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IHZpZXcgPSBmcmFtZS52aWV3O1xyXG4gICAgICAgIC8vIGlmIHZpZXcgZG9lc24ndCBleGlzdHMgeWV0LCBpbml0IGl0XHJcbiAgICAgICAgaWYgKCF2aWV3ICYmIGZyYW1lLnVybCkge1xyXG4gICAgICAgICAgICBpZiAodHlwZW9mIGZyYW1lLnVybCA9PT0gXCJzdHJpbmdcIikge1xyXG4gICAgICAgICAgICAgICAgLy8gc3RyaW5nLCBzbyB3ZSBoYXZlIGlzb2xhdGVkIHN1YnZpZXcgdXJsXHJcbiAgICAgICAgICAgICAgICBmcmFtZS5yb3V0ZSA9IG5ldyBSb3V0ZShmcmFtZS51cmwsIDApO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2NyZWF0ZVN1YlZpZXcoZnJhbWUsIGZyYW1lLnJvdXRlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIC8vIG9iamVjdCwgc28gd2UgaGF2ZSBhbiBlbWJlZGVkIHN1YnZpZXdcclxuICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgZnJhbWUudXJsID09PSBcImZ1bmN0aW9uXCIgJiYgISh2aWV3IGluc3RhbmNlb2YgZnJhbWUudXJsKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHZpZXcgPSBuZXcgZnJhbWUudXJsKHRoaXMuYXBwLCBcIlwiKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmICghdmlldykge1xyXG4gICAgICAgICAgICAgICAgICAgIHZpZXcgPSBmcmFtZS51cmw7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gdHJpZ2dlciBvbkNoYW5nZSBmb3IgYWxyZWFkeSBleGlzdGVkIHZpZXdcclxuICAgICAgICBpZiAodmlldykge1xyXG4gICAgICAgICAgICByZXR1cm4gdmlldy5yZW5kZXIoZnJhbWUsIChmcmFtZS5yb3V0ZSB8fCB0aGlzLl9zZWdtZW50KSwgdGhpcyk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgX2luaXRFcnJvcih2aWV3LCBlcnIpIHtcclxuICAgICAgICAvKlxyXG4gICAgICAgICAgICBpZiB2aWV3IGlzIGRlc3Ryb3llZCwgaWdub3JlIGFueSB2aWV3IHJlbGF0ZWQgZXJyb3JzXHJcbiAgICAgICAgKi9cclxuICAgICAgICBpZiAodGhpcy5hcHApIHtcclxuICAgICAgICAgICAgdGhpcy5hcHAuZXJyb3IoXCJhcHA6ZXJyb3I6aW5pdHZpZXdcIiwgW2Vyciwgdmlld10pO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH1cclxuICAgIF9jcmVhdGVTdWJWaWV3KHN1Yiwgc3VidXJsKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuYXBwLmNyZWF0ZUZyb21VUkwoc3VidXJsLmN1cnJlbnQoKSkudGhlbih2aWV3ID0+IHtcclxuICAgICAgICAgICAgcmV0dXJuIHZpZXcucmVuZGVyKHN1Yiwgc3VidXJsLCB0aGlzKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuICAgIF9kZXN0cm95S2lkcygpIHtcclxuICAgICAgICAvLyBkZXN0cm95IGNoaWxkIHZpZXdzXHJcbiAgICAgICAgY29uc3QgdWlzID0gdGhpcy5fY2hpbGRyZW47XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IHVpcy5sZW5ndGggLSAxOyBpID49IDA7IGktLSkge1xyXG4gICAgICAgICAgICBpZiAodWlzW2ldICYmIHVpc1tpXS5kZXN0cnVjdG9yKSB7XHJcbiAgICAgICAgICAgICAgICB1aXNbaV0uZGVzdHJ1Y3RvcigpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIHJlc2V0IHZhcnMgZm9yIGJldHRlciBHQyBwcm9jZXNzaW5nXHJcbiAgICAgICAgdGhpcy5fY2hpbGRyZW4gPSBbXTtcclxuICAgIH1cclxufVxuXG4vLyB3cmFwcGVyIGZvciByYXcgb2JqZWN0cyBhbmQgSmV0IDEueCBzdHJ1Y3RzXHJcbmNsYXNzIEpldFZpZXdSYXcgZXh0ZW5kcyBKZXRWaWV3IHtcclxuICAgIGNvbnN0cnVjdG9yKGFwcCwgY29uZmlnKSB7XHJcbiAgICAgICAgc3VwZXIoYXBwLCBjb25maWcpO1xyXG4gICAgICAgIHRoaXMuX3VpID0gY29uZmlnLnVpO1xyXG4gICAgfVxyXG4gICAgY29uZmlnKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl91aTtcclxuICAgIH1cclxufVxuXG5jbGFzcyBTdWJSb3V0ZXIge1xyXG4gICAgY29uc3RydWN0b3IoY2IsIGNvbmZpZywgYXBwKSB7XHJcbiAgICAgICAgdGhpcy5wYXRoID0gXCJcIjtcclxuICAgICAgICB0aGlzLmFwcCA9IGFwcDtcclxuICAgIH1cclxuICAgIHNldChwYXRoLCBjb25maWcpIHtcclxuICAgICAgICB0aGlzLnBhdGggPSBwYXRoO1xyXG4gICAgICAgIGNvbnN0IGEgPSB0aGlzLmFwcDtcclxuICAgICAgICBhLmFwcC5nZXRSb3V0ZXIoKS5zZXQoYS5fc2VnbWVudC5hcHBlbmQodGhpcy5wYXRoKSwgeyBzaWxlbnQ6IHRydWUgfSk7XHJcbiAgICB9XHJcbiAgICBnZXQoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMucGF0aDtcclxuICAgIH1cclxufVxuXG5sZXQgX29uY2UgPSB0cnVlO1xyXG5jbGFzcyBKZXRBcHBCYXNlIGV4dGVuZHMgSmV0QmFzZSB7XHJcbiAgICBjb25zdHJ1Y3Rvcihjb25maWcpIHtcclxuICAgICAgICBjb25zdCB3ZWJpeCA9IChjb25maWcgfHwge30pLndlYml4IHx8IHdpbmRvdy53ZWJpeDtcclxuICAgICAgICBzdXBlcih3ZWJpeCk7XHJcbiAgICAgICAgLy8gaW5pdCBjb25maWdcclxuICAgICAgICB0aGlzLmNvbmZpZyA9IHRoaXMud2ViaXguZXh0ZW5kKHtcclxuICAgICAgICAgICAgbmFtZTogXCJBcHBcIixcclxuICAgICAgICAgICAgdmVyc2lvbjogXCIxLjBcIixcclxuICAgICAgICAgICAgc3RhcnQ6IFwiL2hvbWVcIlxyXG4gICAgICAgIH0sIGNvbmZpZywgdHJ1ZSk7XHJcbiAgICAgICAgdGhpcy5hcHAgPSB0aGlzLmNvbmZpZy5hcHA7XHJcbiAgICAgICAgdGhpcy5yZWFkeSA9IFByb21pc2UucmVzb2x2ZSgpO1xyXG4gICAgICAgIHRoaXMuX3NlcnZpY2VzID0ge307XHJcbiAgICAgICAgdGhpcy53ZWJpeC5leHRlbmQodGhpcywgdGhpcy53ZWJpeC5FdmVudFN5c3RlbSk7XHJcbiAgICB9XHJcbiAgICBnZXRVcmwoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX3N1YlNlZ21lbnQuc3VidXJsKCk7XHJcbiAgICB9XHJcbiAgICBnZXRVcmxTdHJpbmcoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX3N1YlNlZ21lbnQudG9TdHJpbmcoKTtcclxuICAgIH1cclxuICAgIGdldFNlcnZpY2UobmFtZSkge1xyXG4gICAgICAgIGxldCBvYmogPSB0aGlzLl9zZXJ2aWNlc1tuYW1lXTtcclxuICAgICAgICBpZiAodHlwZW9mIG9iaiA9PT0gXCJmdW5jdGlvblwiKSB7XHJcbiAgICAgICAgICAgIG9iaiA9IHRoaXMuX3NlcnZpY2VzW25hbWVdID0gb2JqKHRoaXMpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gb2JqO1xyXG4gICAgfVxyXG4gICAgc2V0U2VydmljZShuYW1lLCBoYW5kbGVyKSB7XHJcbiAgICAgICAgdGhpcy5fc2VydmljZXNbbmFtZV0gPSBoYW5kbGVyO1xyXG4gICAgfVxyXG4gICAgZGVzdHJ1Y3RvcigpIHtcclxuICAgICAgICB0aGlzLmdldFN1YlZpZXcoKS5kZXN0cnVjdG9yKCk7XHJcbiAgICAgICAgc3VwZXIuZGVzdHJ1Y3RvcigpO1xyXG4gICAgfVxyXG4gICAgLy8gY29weSBvYmplY3QgYW5kIGNvbGxlY3QgZXh0cmEgaGFuZGxlcnNcclxuICAgIGNvcHlDb25maWcob2JqLCB0YXJnZXQsIGNvbmZpZykge1xyXG4gICAgICAgIC8vIHJhdyB1aSBjb25maWdcclxuICAgICAgICBpZiAob2JqIGluc3RhbmNlb2YgSmV0QmFzZSB8fFxyXG4gICAgICAgICAgICAodHlwZW9mIG9iaiA9PT0gXCJmdW5jdGlvblwiICYmIG9iai5wcm90b3R5cGUgaW5zdGFuY2VvZiBKZXRCYXNlKSkge1xyXG4gICAgICAgICAgICBvYmogPSB7ICRzdWJ2aWV3OiBvYmogfTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gc3VidmlldyBwbGFjZWhvbGRlclxyXG4gICAgICAgIGlmICh0eXBlb2Ygb2JqLiRzdWJ2aWV3ICE9IFwidW5kZWZpbmVkXCIpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuYWRkU3ViVmlldyhvYmosIHRhcmdldCwgY29uZmlnKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gcHJvY2VzcyBzdWItcHJvcGVydGllc1xyXG4gICAgICAgIHRhcmdldCA9IHRhcmdldCB8fCAob2JqIGluc3RhbmNlb2YgQXJyYXkgPyBbXSA6IHt9KTtcclxuICAgICAgICBmb3IgKGNvbnN0IG1ldGhvZCBpbiBvYmopIHtcclxuICAgICAgICAgICAgbGV0IHBvaW50ID0gb2JqW21ldGhvZF07XHJcbiAgICAgICAgICAgIC8vIHZpZXcgY2xhc3NcclxuICAgICAgICAgICAgaWYgKHR5cGVvZiBwb2ludCA9PT0gXCJmdW5jdGlvblwiICYmIHBvaW50LnByb3RvdHlwZSBpbnN0YW5jZW9mIEpldEJhc2UpIHtcclxuICAgICAgICAgICAgICAgIHBvaW50ID0geyAkc3VidmlldzogcG9pbnQgfTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAocG9pbnQgJiYgdHlwZW9mIHBvaW50ID09PSBcIm9iamVjdFwiICYmXHJcbiAgICAgICAgICAgICAgICAhKHBvaW50IGluc3RhbmNlb2YgdGhpcy53ZWJpeC5EYXRhQ29sbGVjdGlvbikgJiYgIShwb2ludCBpbnN0YW5jZW9mIFJlZ0V4cCkpIHtcclxuICAgICAgICAgICAgICAgIGlmIChwb2ludCBpbnN0YW5jZW9mIERhdGUpIHtcclxuICAgICAgICAgICAgICAgICAgICB0YXJnZXRbbWV0aG9kXSA9IG5ldyBEYXRlKHBvaW50KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGNvcHkgPSB0aGlzLmNvcHlDb25maWcocG9pbnQsIChwb2ludCBpbnN0YW5jZW9mIEFycmF5ID8gW10gOiB7fSksIGNvbmZpZyk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGNvcHkgIT09IG51bGwpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGFyZ2V0W21ldGhvZF0gPSBjb3B5O1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHRhcmdldFttZXRob2RdID0gcG9pbnQ7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRhcmdldDtcclxuICAgIH1cclxuICAgIGdldFJvdXRlcigpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy4kcm91dGVyO1xyXG4gICAgfVxyXG4gICAgY2xpY2tIYW5kbGVyKGUsIHRhcmdldCkge1xyXG4gICAgICAgIGlmIChlKSB7XHJcbiAgICAgICAgICAgIHRhcmdldCA9IHRhcmdldCB8fCAoZS50YXJnZXQgfHwgZS5zcmNFbGVtZW50KTtcclxuICAgICAgICAgICAgaWYgKHRhcmdldCAmJiB0YXJnZXQuZ2V0QXR0cmlidXRlKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCB0cmlnZ2VyID0gdGFyZ2V0LmdldEF0dHJpYnV0ZShcInRyaWdnZXJcIik7XHJcbiAgICAgICAgICAgICAgICBpZiAodHJpZ2dlcikge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2ZvclZpZXcodGFyZ2V0LCB2aWV3ID0+IHZpZXcuYXBwLnRyaWdnZXIodHJpZ2dlcikpO1xyXG4gICAgICAgICAgICAgICAgICAgIGUuY2FuY2VsQnViYmxlID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgY29uc3Qgcm91dGUgPSB0YXJnZXQuZ2V0QXR0cmlidXRlKFwicm91dGVcIik7XHJcbiAgICAgICAgICAgICAgICBpZiAocm91dGUpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9mb3JWaWV3KHRhcmdldCwgdmlldyA9PiB2aWV3LnNob3cocm91dGUpKTtcclxuICAgICAgICAgICAgICAgICAgICBlLmNhbmNlbEJ1YmJsZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBjb25zdCBwYXJlbnQgPSB0YXJnZXQucGFyZW50Tm9kZTtcclxuICAgICAgICBpZiAocGFyZW50KSB7XHJcbiAgICAgICAgICAgIHRoaXMuY2xpY2tIYW5kbGVyKGUsIHBhcmVudCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgZ2V0Um9vdCgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5nZXRTdWJWaWV3KCkuZ2V0Um9vdCgpO1xyXG4gICAgfVxyXG4gICAgcmVmcmVzaCgpIHtcclxuICAgICAgICBpZiAoIXRoaXMuX3N1YlNlZ21lbnQpIHtcclxuICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZShudWxsKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0U3ViVmlldygpLnJlZnJlc2goKS50aGVuKHZpZXcgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLmNhbGxFdmVudChcImFwcDpyb3V0ZVwiLCBbdGhpcy5nZXRVcmwoKV0pO1xyXG4gICAgICAgICAgICByZXR1cm4gdmlldztcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuICAgIGxvYWRWaWV3KHVybCkge1xyXG4gICAgICAgIGNvbnN0IHZpZXdzID0gdGhpcy5jb25maWcudmlld3M7XHJcbiAgICAgICAgbGV0IHJlc3VsdCA9IG51bGw7XHJcbiAgICAgICAgaWYgKHVybCA9PT0gXCJcIikge1xyXG4gICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKHRoaXMuX2xvYWRFcnJvcihcIlwiLCBuZXcgRXJyb3IoXCJXZWJpeCBKZXQ6IEVtcHR5IHVybCBzZWdtZW50XCIpKSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIGlmICh2aWV3cykge1xyXG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZiB2aWV3cyA9PT0gXCJmdW5jdGlvblwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gY3VzdG9tIGxvYWRpbmcgc3RyYXRlZ3lcclxuICAgICAgICAgICAgICAgICAgICByZXN1bHQgPSB2aWV3cyh1cmwpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gcHJlZGVmaW5lZCBoYXNoXHJcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0ID0gdmlld3NbdXJsXTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgcmVzdWx0ID09PSBcInN0cmluZ1wiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdXJsID0gcmVzdWx0O1xyXG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdCA9IG51bGw7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKCFyZXN1bHQpIHtcclxuICAgICAgICAgICAgICAgIGlmICh1cmwgPT09IFwiX2JsYW5rXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXN1bHQgPSB7fTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdCA9IHRoaXMuX2xvYWRWaWV3RHluYW1pYyh1cmwpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNhdGNoIChlKSB7XHJcbiAgICAgICAgICAgIHJlc3VsdCA9IHRoaXMuX2xvYWRFcnJvcih1cmwsIGUpO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvLyBjdXN0b20gaGFuZGxlciBjYW4gcmV0dXJuIHZpZXcgb3IgaXRzIHByb21pc2VcclxuICAgICAgICBpZiAoIXJlc3VsdC50aGVuKSB7XHJcbiAgICAgICAgICAgIHJlc3VsdCA9IFByb21pc2UucmVzb2x2ZShyZXN1bHQpO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvLyBzZXQgZXJyb3IgaGFuZGxlclxyXG4gICAgICAgIHJlc3VsdCA9IHJlc3VsdFxyXG4gICAgICAgICAgICAudGhlbihtb2R1bGUgPT4gbW9kdWxlLl9fZXNNb2R1bGUgPyBtb2R1bGUuZGVmYXVsdCA6IG1vZHVsZSlcclxuICAgICAgICAgICAgLmNhdGNoKGVyciA9PiB0aGlzLl9sb2FkRXJyb3IodXJsLCBlcnIpKTtcclxuICAgICAgICByZXR1cm4gcmVzdWx0O1xyXG4gICAgfVxyXG4gICAgX2ZvclZpZXcodGFyZ2V0LCBoYW5kbGVyKSB7XHJcbiAgICAgICAgY29uc3QgdmlldyA9IHRoaXMud2ViaXguJCQodGFyZ2V0KTtcclxuICAgICAgICBpZiAodmlldykge1xyXG4gICAgICAgICAgICBoYW5kbGVyKHZpZXcuJHNjb3BlKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBfbG9hZFZpZXdEeW5hbWljKHVybCkge1xyXG4gICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgfVxyXG4gICAgY3JlYXRlRnJvbVVSTChjaHVuaykge1xyXG4gICAgICAgIGxldCB2aWV3O1xyXG4gICAgICAgIGlmIChjaHVuay5pc05ldyB8fCAhY2h1bmsudmlldykge1xyXG4gICAgICAgICAgICB2aWV3ID0gdGhpcy5sb2FkVmlldyhjaHVuay5wYWdlKVxyXG4gICAgICAgICAgICAgICAgLnRoZW4odWkgPT4gdGhpcy5jcmVhdGVWaWV3KHVpLCBuYW1lKSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICB2aWV3ID0gUHJvbWlzZS5yZXNvbHZlKGNodW5rLnZpZXcpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdmlldztcclxuICAgIH1cclxuICAgIGNyZWF0ZVZpZXcodWksIG5hbWUpIHtcclxuICAgICAgICBsZXQgb2JqO1xyXG4gICAgICAgIGlmICh0eXBlb2YgdWkgPT09IFwiZnVuY3Rpb25cIikge1xyXG4gICAgICAgICAgICBpZiAodWkucHJvdG90eXBlIGluc3RhbmNlb2YgSmV0QXBwQmFzZSkge1xyXG4gICAgICAgICAgICAgICAgLy8gVUkgY2xhc3NcclxuICAgICAgICAgICAgICAgIHJldHVybiBuZXcgdWkoeyBhcHA6IHRoaXMsIG5hbWUsIHJvdXRlcjogU3ViUm91dGVyIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2UgaWYgKHVpLnByb3RvdHlwZSBpbnN0YW5jZW9mIEpldEJhc2UpIHtcclxuICAgICAgICAgICAgICAgIC8vIFVJIGNsYXNzXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gbmV3IHVpKHRoaXMsIHsgbmFtZSB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIC8vIFVJIGZhY3RvcnkgZnVuY3Rpb25zXHJcbiAgICAgICAgICAgICAgICB1aSA9IHVpKHRoaXMpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh1aSBpbnN0YW5jZW9mIEpldEJhc2UpIHtcclxuICAgICAgICAgICAgb2JqID0gdWk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAvLyBVSSBvYmplY3RcclxuICAgICAgICAgICAgb2JqID0gbmV3IEpldFZpZXdSYXcodGhpcywgeyBuYW1lLCB1aSB9KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIG9iajtcclxuICAgIH1cclxuICAgIC8vIHNob3cgdmlldyBwYXRoXHJcbiAgICBzaG93KHVybCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnJlbmRlcih0aGlzLl9jb250YWluZXIsICh1cmwgfHwgdGhpcy5jb25maWcuc3RhcnQpKTtcclxuICAgIH1cclxuICAgIC8vIGV2ZW50IGhlbHBlcnNcclxuICAgIHRyaWdnZXIobmFtZSwgLi4ucmVzdCkge1xyXG4gICAgICAgIHRoaXMuYXBwbHkobmFtZSwgcmVzdCk7XHJcbiAgICB9XHJcbiAgICBhcHBseShuYW1lLCBkYXRhKSB7XHJcbiAgICAgICAgdGhpcy5jYWxsRXZlbnQobmFtZSwgZGF0YSk7XHJcbiAgICB9XHJcbiAgICBhY3Rpb24obmFtZSkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLndlYml4LmJpbmQoZnVuY3Rpb24gKC4uLnJlc3QpIHtcclxuICAgICAgICAgICAgdGhpcy5hcHBseShuYW1lLCByZXN0KTtcclxuICAgICAgICB9LCB0aGlzKTtcclxuICAgIH1cclxuICAgIG9uKG5hbWUsIGhhbmRsZXIpIHtcclxuICAgICAgICB0aGlzLmF0dGFjaEV2ZW50KG5hbWUsIGhhbmRsZXIpO1xyXG4gICAgfVxyXG4gICAgdXNlKHBsdWdpbiwgY29uZmlnKSB7XHJcbiAgICAgICAgcGx1Z2luKHRoaXMsIG51bGwsIGNvbmZpZyk7XHJcbiAgICB9XHJcbiAgICBlcnJvcihuYW1lLCBlcikge1xyXG4gICAgICAgIHRoaXMuY2FsbEV2ZW50KG5hbWUsIGVyKTtcclxuICAgICAgICB0aGlzLmNhbGxFdmVudChcImFwcDplcnJvclwiLCBlcik7XHJcbiAgICAgICAgLyogdHNsaW50OmRpc2FibGUgKi9cclxuICAgICAgICBpZiAodGhpcy5jb25maWcuZGVidWcpIHtcclxuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBlci5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihlcltpXSk7XHJcbiAgICAgICAgICAgICAgICBpZiAoZXJbaV0gaW5zdGFuY2VvZiBFcnJvcikge1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCB0ZXh0ID0gZXJbaV0ubWVzc2FnZTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAodGV4dC5pbmRleE9mKFwiTW9kdWxlIGJ1aWxkIGZhaWxlZFwiKSA9PT0gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0ZXh0ID0gdGV4dC5yZXBsYWNlKC9cXHgxYlxcW1swLTk7XSptL2csIFwiXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBkb2N1bWVudC5ib2R5LmlubmVySFRNTCA9IGA8cHJlIHN0eWxlPSdmb250LXNpemU6MTZweDsgYmFja2dyb3VuZC1jb2xvcjogI2VjNjg3MzsgY29sb3I6ICMwMDA7IHBhZGRpbmc6MTBweDsnPiR7dGV4dH08L3ByZT5gO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGV4dCArPSBcIjxicj48YnI+Q2hlY2sgY29uc29sZSBmb3IgbW9yZSBkZXRhaWxzXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMud2ViaXgubWVzc2FnZSh7IHR5cGU6IFwiZXJyb3JcIiwgdGV4dDogdGV4dCwgZXhwaXJlOiAtMSB9KTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZGVidWdnZXI7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8qIHRzbGludDplbmFibGUgKi9cclxuICAgIH1cclxuICAgIC8vIHJlbmRlcnMgdG9wIHZpZXdcclxuICAgIHJlbmRlcihyb290LCB1cmwsIHBhcmVudCkge1xyXG4gICAgICAgIHRoaXMuX2NvbnRhaW5lciA9ICh0eXBlb2Ygcm9vdCA9PT0gXCJzdHJpbmdcIikgP1xyXG4gICAgICAgICAgICB0aGlzLndlYml4LnRvTm9kZShyb290KSA6XHJcbiAgICAgICAgICAgIChyb290IHx8IGRvY3VtZW50LmJvZHkpO1xyXG4gICAgICAgIGNvbnN0IGZpcnN0SW5pdCA9ICF0aGlzLiRyb3V0ZXI7XHJcbiAgICAgICAgbGV0IHBhdGggPSBudWxsO1xyXG4gICAgICAgIGlmIChmaXJzdEluaXQpIHtcclxuICAgICAgICAgICAgaWYgKF9vbmNlICYmIFwidGFnTmFtZVwiIGluIHRoaXMuX2NvbnRhaW5lcikge1xyXG4gICAgICAgICAgICAgICAgdGhpcy53ZWJpeC5ldmVudChkb2N1bWVudC5ib2R5LCBcImNsaWNrXCIsIGUgPT4gdGhpcy5jbGlja0hhbmRsZXIoZSkpO1xyXG4gICAgICAgICAgICAgICAgX29uY2UgPSBmYWxzZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAodHlwZW9mIHVybCA9PT0gXCJzdHJpbmdcIikge1xyXG4gICAgICAgICAgICAgICAgdXJsID0gbmV3IFJvdXRlKHVybCwgMCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5fc3ViU2VnbWVudCA9IHRoaXMuX2ZpcnN0X3N0YXJ0KHVybCk7XHJcbiAgICAgICAgICAgIHRoaXMuX3N1YlNlZ21lbnQucm91dGUubGlua1JvdXRlciA9IHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICBpZiAodHlwZW9mIHVybCA9PT0gXCJzdHJpbmdcIikge1xyXG4gICAgICAgICAgICAgICAgcGF0aCA9IHVybDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmFwcCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHBhdGggPSB1cmwuc3BsaXQoKS5yb3V0ZS5wYXRoIHx8IHRoaXMuY29uZmlnLnN0YXJ0O1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcGF0aCA9IHVybC50b1N0cmluZygpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNvbnN0IHRvcCA9IHRoaXMuZ2V0U3ViVmlldygpO1xyXG4gICAgICAgIGNvbnN0IHNlZ21lbnQgPSB0aGlzLl9zdWJTZWdtZW50O1xyXG4gICAgICAgIGNvbnN0IHJlYWR5ID0gc2VnbWVudC5zaG93KHBhdGgsIHRvcClcclxuICAgICAgICAgICAgLnRoZW4oKCkgPT4gdGhpcy5jcmVhdGVGcm9tVVJMKHNlZ21lbnQuY3VycmVudCgpKSlcclxuICAgICAgICAgICAgLnRoZW4odmlldyA9PiB2aWV3LnJlbmRlcihyb290LCBzZWdtZW50KSlcclxuICAgICAgICAgICAgLnRoZW4oYmFzZSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuJHJvdXRlci5zZXQoc2VnbWVudC5yb3V0ZS5wYXRoLCB7IHNpbGVudDogdHJ1ZSB9KTtcclxuICAgICAgICAgICAgdGhpcy5jYWxsRXZlbnQoXCJhcHA6cm91dGVcIiwgW3RoaXMuZ2V0VXJsKCldKTtcclxuICAgICAgICAgICAgcmV0dXJuIGJhc2U7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgdGhpcy5yZWFkeSA9IHRoaXMucmVhZHkudGhlbigoKSA9PiByZWFkeSk7XHJcbiAgICAgICAgcmV0dXJuIHJlYWR5O1xyXG4gICAgfVxyXG4gICAgZ2V0U3ViVmlldygpIHtcclxuICAgICAgICBpZiAodGhpcy5fc3ViU2VnbWVudCkge1xyXG4gICAgICAgICAgICBjb25zdCB2aWV3ID0gdGhpcy5fc3ViU2VnbWVudC5jdXJyZW50KCkudmlldztcclxuICAgICAgICAgICAgaWYgKHZpZXcpXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdmlldztcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIG5ldyBKZXRWaWV3KHRoaXMsIHt9KTtcclxuICAgIH1cclxuICAgIF9maXJzdF9zdGFydChyb3V0ZSkge1xyXG4gICAgICAgIHRoaXMuX3NlZ21lbnQgPSByb3V0ZTtcclxuICAgICAgICBjb25zdCBjYiA9IChhKSA9PiBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5zaG93KGEpLmNhdGNoKGUgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKCEoZSBpbnN0YW5jZW9mIE5hdmlnYXRpb25CbG9ja2VkKSlcclxuICAgICAgICAgICAgICAgICAgICB0aHJvdyBlO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9LCAxKTtcclxuICAgICAgICB0aGlzLiRyb3V0ZXIgPSBuZXcgKHRoaXMuY29uZmlnLnJvdXRlcikoY2IsIHRoaXMuY29uZmlnLCB0aGlzKTtcclxuICAgICAgICAvLyBzdGFydCBhbmltYXRpb24gZm9yIHRvcC1sZXZlbCBhcHBcclxuICAgICAgICBpZiAodGhpcy5fY29udGFpbmVyID09PSBkb2N1bWVudC5ib2R5ICYmIHRoaXMuY29uZmlnLmFuaW1hdGlvbiAhPT0gZmFsc2UpIHtcclxuICAgICAgICAgICAgY29uc3Qgbm9kZSA9IHRoaXMuX2NvbnRhaW5lcjtcclxuICAgICAgICAgICAgdGhpcy53ZWJpeC5odG1sLmFkZENzcyhub2RlLCBcIndlYml4YXBwc3RhcnRcIik7XHJcbiAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy53ZWJpeC5odG1sLnJlbW92ZUNzcyhub2RlLCBcIndlYml4YXBwc3RhcnRcIik7XHJcbiAgICAgICAgICAgICAgICB0aGlzLndlYml4Lmh0bWwuYWRkQ3NzKG5vZGUsIFwid2ViaXhhcHBcIik7XHJcbiAgICAgICAgICAgIH0sIDEwKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKCFyb3V0ZSkge1xyXG4gICAgICAgICAgICAvLyBpZiBubyB1cmwgZGVmaW5lZCwgY2hlY2sgcm91dGVyIGZpcnN0XHJcbiAgICAgICAgICAgIGxldCB1cmxTdHJpbmcgPSB0aGlzLiRyb3V0ZXIuZ2V0KCk7XHJcbiAgICAgICAgICAgIGlmICghdXJsU3RyaW5nKSB7XHJcbiAgICAgICAgICAgICAgICB1cmxTdHJpbmcgPSB0aGlzLmNvbmZpZy5zdGFydDtcclxuICAgICAgICAgICAgICAgIHRoaXMuJHJvdXRlci5zZXQodXJsU3RyaW5nLCB7IHNpbGVudDogdHJ1ZSB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByb3V0ZSA9IG5ldyBSb3V0ZSh1cmxTdHJpbmcsIDApO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmICh0aGlzLmFwcCkge1xyXG4gICAgICAgICAgICByb3V0ZS5jdXJyZW50KCkudmlldyA9IHRoaXM7XHJcbiAgICAgICAgICAgIGlmIChyb3V0ZS5uZXh0KCkpIHtcclxuICAgICAgICAgICAgICAgIHJvdXRlLnJlZnJlc2goKTtcclxuICAgICAgICAgICAgICAgIHJvdXRlID0gcm91dGUuc3BsaXQoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHJvdXRlID0gbmV3IFJvdXRlKHRoaXMuY29uZmlnLnN0YXJ0LCAwKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gcm91dGU7XHJcbiAgICB9XHJcbiAgICAvLyBlcnJvciBkdXJpbmcgdmlldyByZXNvbHZpbmdcclxuICAgIF9sb2FkRXJyb3IodXJsLCBlcnIpIHtcclxuICAgICAgICB0aGlzLmVycm9yKFwiYXBwOmVycm9yOnJlc29sdmVcIiwgW2VyciwgdXJsXSk7XHJcbiAgICAgICAgcmV0dXJuIHsgdGVtcGxhdGU6IFwiIFwiIH07XHJcbiAgICB9XHJcbiAgICBhZGRTdWJWaWV3KG9iaiwgdGFyZ2V0LCBjb25maWcpIHtcclxuICAgICAgICBjb25zdCB1cmwgPSBvYmouJHN1YnZpZXcgIT09IHRydWUgPyBvYmouJHN1YnZpZXcgOiBudWxsO1xyXG4gICAgICAgIGNvbnN0IG5hbWUgPSBvYmoubmFtZSB8fCAodXJsID8gdGhpcy53ZWJpeC51aWQoKSA6IFwiZGVmYXVsdFwiKTtcclxuICAgICAgICB0YXJnZXQuaWQgPSBvYmouaWQgfHwgXCJzXCIgKyB0aGlzLndlYml4LnVpZCgpO1xyXG4gICAgICAgIGNvbnN0IHZpZXcgPSBjb25maWdbbmFtZV0gPSB7XHJcbiAgICAgICAgICAgIGlkOiB0YXJnZXQuaWQsXHJcbiAgICAgICAgICAgIHVybCxcclxuICAgICAgICAgICAgYnJhbmNoOiBvYmouYnJhbmNoLFxyXG4gICAgICAgICAgICBwb3B1cDogb2JqLnBvcHVwXHJcbiAgICAgICAgfTtcclxuICAgICAgICByZXR1cm4gdmlldy5wb3B1cCA/IG51bGwgOiB0YXJnZXQ7XHJcbiAgICB9XHJcbn1cblxuY2xhc3MgSGFzaFJvdXRlciB7XHJcbiAgICBjb25zdHJ1Y3RvcihjYiwgY29uZmlnKSB7XHJcbiAgICAgICAgdGhpcy5jb25maWcgPSBjb25maWcgfHwge307XHJcbiAgICAgICAgdGhpcy5fZGV0ZWN0UHJlZml4KCk7XHJcbiAgICAgICAgdGhpcy5jYiA9IGNiO1xyXG4gICAgICAgIHdpbmRvdy5vbnBvcHN0YXRlID0gKCkgPT4gdGhpcy5jYih0aGlzLmdldCgpKTtcclxuICAgIH1cclxuICAgIHNldChwYXRoLCBjb25maWcpIHtcclxuICAgICAgICBpZiAodGhpcy5jb25maWcucm91dGVzKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGNvbXBhcmUgPSBwYXRoLnNwbGl0KFwiP1wiLCAyKTtcclxuICAgICAgICAgICAgZm9yIChjb25zdCBrZXkgaW4gdGhpcy5jb25maWcucm91dGVzKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5jb25maWcucm91dGVzW2tleV0gPT09IGNvbXBhcmVbMF0pIHtcclxuICAgICAgICAgICAgICAgICAgICBwYXRoID0ga2V5ICsgKGNvbXBhcmUubGVuZ3RoID4gMSA/IFwiP1wiICsgY29tcGFyZVsxXSA6IFwiXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0aGlzLmdldCgpICE9PSBwYXRoKSB7XHJcbiAgICAgICAgICAgIHdpbmRvdy5oaXN0b3J5LnB1c2hTdGF0ZShudWxsLCBudWxsLCB0aGlzLnByZWZpeCArIHRoaXMuc3VmaXggKyBwYXRoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKCFjb25maWcgfHwgIWNvbmZpZy5zaWxlbnQpIHtcclxuICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB0aGlzLmNiKHBhdGgpLCAxKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBnZXQoKSB7XHJcbiAgICAgICAgbGV0IHBhdGggPSB0aGlzLl9nZXRSYXcoKS5yZXBsYWNlKHRoaXMucHJlZml4LCBcIlwiKS5yZXBsYWNlKHRoaXMuc3VmaXgsIFwiXCIpO1xyXG4gICAgICAgIHBhdGggPSAocGF0aCAhPT0gXCIvXCIgJiYgcGF0aCAhPT0gXCIjXCIpID8gcGF0aCA6IFwiXCI7XHJcbiAgICAgICAgaWYgKHRoaXMuY29uZmlnLnJvdXRlcykge1xyXG4gICAgICAgICAgICBjb25zdCBjb21wYXJlID0gcGF0aC5zcGxpdChcIj9cIiwgMik7XHJcbiAgICAgICAgICAgIGNvbnN0IGtleSA9IHRoaXMuY29uZmlnLnJvdXRlc1tjb21wYXJlWzBdXTtcclxuICAgICAgICAgICAgaWYgKGtleSkge1xyXG4gICAgICAgICAgICAgICAgcGF0aCA9IGtleSArIChjb21wYXJlLmxlbmd0aCA+IDEgPyBcIj9cIiArIGNvbXBhcmVbMV0gOiBcIlwiKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gcGF0aDtcclxuICAgIH1cclxuICAgIF9kZXRlY3RQcmVmaXgoKSB7XHJcbiAgICAgICAgLy8gdXNlIFwiIyFcIiBmb3IgYmFja3dhcmQgY29tcGF0aWJpbGl0eVxyXG4gICAgICAgIGNvbnN0IHN1Zml4ID0gdGhpcy5jb25maWcucm91dGVyUHJlZml4O1xyXG4gICAgICAgIHRoaXMuc3VmaXggPSBcIiNcIiArICgodHlwZW9mIHN1Zml4ID09PSBcInVuZGVmaW5lZFwiKSA/IFwiIVwiIDogc3VmaXgpO1xyXG4gICAgICAgIHRoaXMucHJlZml4ID0gZG9jdW1lbnQubG9jYXRpb24uaHJlZi5zcGxpdChcIiNcIiwgMilbMF07XHJcbiAgICB9XHJcbiAgICBfZ2V0UmF3KCkge1xyXG4gICAgICAgIHJldHVybiBkb2N1bWVudC5sb2NhdGlvbi5ocmVmO1xyXG4gICAgfVxyXG59XG5cbmxldCBpc1BhdGNoZWQgPSBmYWxzZTtcclxuZnVuY3Rpb24gcGF0Y2godykge1xyXG4gICAgaWYgKGlzUGF0Y2hlZCB8fCAhdykge1xyXG4gICAgICAgIHJldHVybjtcclxuICAgIH1cclxuICAgIGlzUGF0Y2hlZCA9IHRydWU7XHJcbiAgICAvLyBjdXN0b20gcHJvbWlzZSBmb3IgSUU4XHJcbiAgICBjb25zdCB3aW4gPSB3aW5kb3c7XHJcbiAgICBpZiAoIXdpbi5Qcm9taXNlKSB7XHJcbiAgICAgICAgd2luLlByb21pc2UgPSB3LnByb21pc2U7XHJcbiAgICB9XHJcbiAgICBjb25zdCB2ZXJzaW9uID0gdy52ZXJzaW9uLnNwbGl0KFwiLlwiKTtcclxuICAgIC8vIHdpbGwgYmUgZml4ZWQgaW4gd2ViaXggNS4zXHJcbiAgICBpZiAodmVyc2lvblswXSAqIDEwICsgdmVyc2lvblsxXSAqIDEgPCA1Mykge1xyXG4gICAgICAgIHcudWkuZnJlZXplID0gZnVuY3Rpb24gKGhhbmRsZXIpIHtcclxuICAgICAgICAgICAgLy8gZGlzYWJsZWQgYmVjYXVzZSB3ZWJpeCBqZXQgNS4wIGNhbid0IGhhbmRsZSByZXNpemUgb2Ygc2Nyb2xsdmlldyBjb3JyZWN0bHlcclxuICAgICAgICAgICAgLy8gdy51aS4kZnJlZXplID0gdHJ1ZTtcclxuICAgICAgICAgICAgY29uc3QgcmVzID0gaGFuZGxlcigpO1xyXG4gICAgICAgICAgICBpZiAocmVzICYmIHJlcy50aGVuKSB7XHJcbiAgICAgICAgICAgICAgICByZXMudGhlbihmdW5jdGlvbiAoc29tZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHcudWkuJGZyZWV6ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgIHcudWkucmVzaXplKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHNvbWU7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHcudWkuJGZyZWV6ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgdy51aS5yZXNpemUoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gcmVzO1xyXG4gICAgICAgIH07XHJcbiAgICB9XHJcbiAgICAvLyBhZGRpbmcgdmlld3MgYXMgY2xhc3Nlc1xyXG4gICAgY29uc3QgYmFzZUFkZCA9IHcudWkuYmFzZWxheW91dC5wcm90b3R5cGUuYWRkVmlldztcclxuICAgIGNvbnN0IGJhc2VSZW1vdmUgPSB3LnVpLmJhc2VsYXlvdXQucHJvdG90eXBlLnJlbW92ZVZpZXc7XHJcbiAgICBjb25zdCBjb25maWcgPSB7XHJcbiAgICAgICAgYWRkVmlldyh2aWV3LCBpbmRleCkge1xyXG4gICAgICAgICAgICAvLyB0cmlnZ2VyIGxvZ2ljIG9ubHkgZm9yIHdpZGdldHMgaW5zaWRlIG9mIGpldC12aWV3XHJcbiAgICAgICAgICAgIC8vIGlnbm9yZSBjYXNlIHdoZW4gYWRkVmlldyB1c2VkIHdpdGggYWxyZWFkeSBpbml0aWFsaXplZCB3aWRnZXRcclxuICAgICAgICAgICAgaWYgKHRoaXMuJHNjb3BlICYmIHRoaXMuJHNjb3BlLndlYml4SmV0ICYmICF2aWV3LnF1ZXJ5Vmlldykge1xyXG4gICAgICAgICAgICAgICAgY29uc3QganZpZXcgPSB0aGlzLiRzY29wZTtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHN1YnMgPSB7fTtcclxuICAgICAgICAgICAgICAgIHZpZXcgPSBqdmlldy5hcHAuY29weUNvbmZpZyh2aWV3LCB7fSwgc3Vicyk7XHJcbiAgICAgICAgICAgICAgICBiYXNlQWRkLmFwcGx5KHRoaXMsIFt2aWV3LCBpbmRleF0pO1xyXG4gICAgICAgICAgICAgICAgZm9yIChjb25zdCBrZXkgaW4gc3Vicykge1xyXG4gICAgICAgICAgICAgICAgICAgIGp2aWV3Ll9yZW5kZXJGcmFtZShrZXksIHN1YnNba2V5XSwgbnVsbCkudGhlbigoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGp2aWV3Ll9zdWJzW2tleV0gPSBzdWJzW2tleV07XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdmlldy5pZDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBiYXNlQWRkLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LFxyXG4gICAgICAgIHJlbW92ZVZpZXcoKSB7XHJcbiAgICAgICAgICAgIGJhc2VSZW1vdmUuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcclxuICAgICAgICAgICAgaWYgKHRoaXMuJHNjb3BlICYmIHRoaXMuJHNjb3BlLndlYml4SmV0KSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBzdWJzID0gdGhpcy4kc2NvcGUuX3N1YnM7XHJcbiAgICAgICAgICAgICAgICAvLyBjaGVjayBhbGwgc3ViLXZpZXdzLCBkZXN0cm95IGFuZCBjbGVhbiB0aGUgcmVtb3ZlZCBvbmVcclxuICAgICAgICAgICAgICAgIGZvciAoY29uc3Qga2V5IGluIHN1YnMpIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCB0ZXN0ID0gc3Vic1trZXldO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICghdy4kJCh0ZXN0LmlkKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0ZXN0LnZpZXcuZGVzdHJ1Y3RvcigpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBkZWxldGUgc3Vic1trZXldO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH07XHJcbiAgICB3LmV4dGVuZCh3LnVpLmxheW91dC5wcm90b3R5cGUsIGNvbmZpZywgdHJ1ZSk7XHJcbiAgICB3LmV4dGVuZCh3LnVpLmJhc2VsYXlvdXQucHJvdG90eXBlLCBjb25maWcsIHRydWUpO1xyXG4gICAgLy8gd3JhcHBlciBmb3IgdXNpbmcgSmV0IEFwcHMgYXMgdmlld3NcclxuICAgIHcucHJvdG9VSSh7XHJcbiAgICAgICAgbmFtZTogXCJqZXRhcHBcIixcclxuICAgICAgICAkaW5pdChjZmcpIHtcclxuICAgICAgICAgICAgdGhpcy4kYXBwID0gbmV3IHRoaXMuYXBwKGNmZyk7XHJcbiAgICAgICAgICAgIGNvbnN0IGlkID0gdy51aWQoKS50b1N0cmluZygpO1xyXG4gICAgICAgICAgICBjZmcuYm9keSA9IHsgaWQgfTtcclxuICAgICAgICAgICAgdGhpcy4kcmVhZHkucHVzaChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLiRhcHAucmVuZGVyKHsgaWQgfSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICBmb3IgKHZhciBrZXkgaW4gdGhpcy4kYXBwKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgb3JpZ2luID0gdGhpcy4kYXBwW2tleV07XHJcbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mIG9yaWdpbiA9PT0gXCJmdW5jdGlvblwiICYmICF0aGlzW2tleV0pIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzW2tleV0gPSBvcmlnaW4uYmluZCh0aGlzLiRhcHApO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfSwgdy51aS5wcm94eSk7XHJcbn1cblxuY2xhc3MgSmV0QXBwIGV4dGVuZHMgSmV0QXBwQmFzZSB7XHJcbiAgICBjb25zdHJ1Y3Rvcihjb25maWcpIHtcclxuICAgICAgICBjb25maWcucm91dGVyID0gY29uZmlnLnJvdXRlciB8fCBIYXNoUm91dGVyO1xyXG4gICAgICAgIHN1cGVyKGNvbmZpZyk7XHJcbiAgICAgICAgcGF0Y2godGhpcy53ZWJpeCk7XHJcbiAgICB9XHJcbiAgICBfbG9hZFZpZXdEeW5hbWljKHVybCkge1xyXG4gICAgICAgIHVybCA9IHVybC5yZXBsYWNlKC9cXC4vZywgXCIvXCIpO1xyXG4gICAgICAgIHJldHVybiByZXF1aXJlKFwiamV0LXZpZXdzL1wiICsgdXJsKTtcclxuICAgIH1cclxufVxuXG5jbGFzcyBTdG9yZVJvdXRlciB7XHJcbiAgICBjb25zdHJ1Y3RvcihjYiwgY29uZmlnLCBhcHApIHtcclxuICAgICAgICB0aGlzLnN0b3JhZ2UgPSBjb25maWcuc3RvcmFnZSB8fCBhcHAud2ViaXguc3RvcmFnZS5zZXNzaW9uO1xyXG4gICAgICAgIHRoaXMubmFtZSA9IChjb25maWcuc3RvcmVOYW1lIHx8IGNvbmZpZy5pZCArIFwiOnJvdXRlXCIpO1xyXG4gICAgICAgIHRoaXMuY2IgPSBjYjtcclxuICAgIH1cclxuICAgIHNldChwYXRoLCBjb25maWcpIHtcclxuICAgICAgICB0aGlzLnN0b3JhZ2UucHV0KHRoaXMubmFtZSwgcGF0aCk7XHJcbiAgICAgICAgaWYgKCFjb25maWcgfHwgIWNvbmZpZy5zaWxlbnQpIHtcclxuICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB0aGlzLmNiKHBhdGgpLCAxKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBnZXQoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuc3RvcmFnZS5nZXQodGhpcy5uYW1lKTtcclxuICAgIH1cclxufVxuXG5jbGFzcyBVcmxSb3V0ZXIgZXh0ZW5kcyBIYXNoUm91dGVyIHtcclxuICAgIF9kZXRlY3RQcmVmaXgoKSB7XHJcbiAgICAgICAgdGhpcy5wcmVmaXggPSBcIlwiO1xyXG4gICAgICAgIHRoaXMuc3VmaXggPSB0aGlzLmNvbmZpZy5yb3V0ZXJQcmVmaXggfHwgXCJcIjtcclxuICAgIH1cclxuICAgIF9nZXRSYXcoKSB7XHJcbiAgICAgICAgcmV0dXJuIGRvY3VtZW50LmxvY2F0aW9uLnBhdGhuYW1lICsgKGRvY3VtZW50LmxvY2F0aW9uLnNlYXJjaCB8fCBcIlwiKTtcclxuICAgIH1cclxufVxuXG5jbGFzcyBFbXB0eVJvdXRlciB7XHJcbiAgICBjb25zdHJ1Y3RvcihjYiwgXyRjb25maWcpIHtcclxuICAgICAgICB0aGlzLnBhdGggPSBcIlwiO1xyXG4gICAgICAgIHRoaXMuY2IgPSBjYjtcclxuICAgIH1cclxuICAgIHNldChwYXRoLCBjb25maWcpIHtcclxuICAgICAgICB0aGlzLnBhdGggPSBwYXRoO1xyXG4gICAgICAgIGlmICghY29uZmlnIHx8ICFjb25maWcuc2lsZW50KSB7XHJcbiAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4gdGhpcy5jYihwYXRoKSwgMSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgZ2V0KCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnBhdGg7XHJcbiAgICB9XHJcbn1cblxuZnVuY3Rpb24gVW5sb2FkR3VhcmQoYXBwLCB2aWV3LCBjb25maWcpIHtcclxuICAgIHZpZXcub24oYXBwLCBgYXBwOmd1YXJkYCwgZnVuY3Rpb24gKF8kdXJsLCBwb2ludCwgcHJvbWlzZSkge1xyXG4gICAgICAgIGlmIChwb2ludCA9PT0gdmlldyB8fCBwb2ludC5jb250YWlucyh2aWV3KSkge1xyXG4gICAgICAgICAgICBjb25zdCByZXMgPSBjb25maWcoKTtcclxuICAgICAgICAgICAgaWYgKHJlcyA9PT0gZmFsc2UpIHtcclxuICAgICAgICAgICAgICAgIHByb21pc2UuY29uZmlybSA9IFByb21pc2UucmVqZWN0KG5ldyBOYXZpZ2F0aW9uQmxvY2tlZCgpKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHByb21pc2UuY29uZmlybSA9IHByb21pc2UuY29uZmlybS50aGVuKCgpID0+IHJlcyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9KTtcclxufVxuXG4vLyAgICAgKGMpIDIwMTItMjAxOCBBaXJibmIsIEluYy5cblxuLy8gdmFyIGhhcyA9IHJlcXVpcmUoJ2hhcycpO1xuZnVuY3Rpb24gaGFzKHN0b3JlLCBrZXkpIHtcbiAgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChzdG9yZSwga2V5KTtcbn1cbi8vIHZhciBmb3JFYWNoID0gcmVxdWlyZSgnZm9yLWVhY2gnKTtcbmZ1bmN0aW9uIGZvckVhY2gob2JqLCBoYW5kbGVyLCBjb250ZXh0KSB7XG4gIGZvciAodmFyIGtleSBpbiBvYmopIHtcbiAgICBpZiAoaGFzKG9iaiwga2V5KSkge1xuICAgICAgaGFuZGxlci5jYWxsKChjb250ZXh0IHx8IG9iaiksIG9ialtrZXldLCBrZXksIG9iaik7XG4gICAgfVxuICB9XG59XG4vLyB2YXIgdHJpbSA9IHJlcXVpcmUoJ3N0cmluZy5wcm90b3R5cGUudHJpbScpO1xuZnVuY3Rpb24gdHJpbShzdHIpIHtcbiAgcmV0dXJuIHN0ci5yZXBsYWNlKC9eW1xcc1xcdUZFRkZcXHhBMF0rfFtcXHNcXHVGRUZGXFx4QTBdKyQvZywgJycpO1xufVxuLy8gdmFyIHdhcm5pbmcgPSByZXF1aXJlKCd3YXJuaW5nJyk7XG5mdW5jdGlvbiB3YXJuKG1lc3NhZ2UpIHtcbiAgbWVzc2FnZSA9ICdXYXJuaW5nOiAnICsgbWVzc2FnZTtcbiAgaWYgKHR5cGVvZiBjb25zb2xlICE9PSAndW5kZWZpbmVkJykge1xuICAgIGNvbnNvbGUuZXJyb3IobWVzc2FnZSk7XG4gIH1cblxuICB0cnkgeyB0aHJvdyBuZXcgRXJyb3IobWVzc2FnZSk7IH0gY2F0Y2ggKHgpIHt9XG59XG5cbnZhciByZXBsYWNlID0gU3RyaW5nLnByb3RvdHlwZS5yZXBsYWNlO1xudmFyIHNwbGl0ID0gU3RyaW5nLnByb3RvdHlwZS5zcGxpdDtcblxuLy8gIyMjIyBQbHVyYWxpemF0aW9uIG1ldGhvZHNcbi8vIFRoZSBzdHJpbmcgdGhhdCBzZXBhcmF0ZXMgdGhlIGRpZmZlcmVudCBwaHJhc2UgcG9zc2liaWxpdGllcy5cbnZhciBkZWxpbWl0ZXIgPSAnfHx8fCc7XG5cbnZhciBydXNzaWFuUGx1cmFsR3JvdXBzID0gZnVuY3Rpb24gKG4pIHtcbiAgdmFyIGVuZCA9IG4gJSAxMDtcbiAgaWYgKG4gIT09IDExICYmIGVuZCA9PT0gMSkge1xuICAgIHJldHVybiAwO1xuICB9XG4gIGlmICgyIDw9IGVuZCAmJiBlbmQgPD0gNCAmJiAhKG4gPj0gMTIgJiYgbiA8PSAxNCkpIHtcbiAgICByZXR1cm4gMTtcbiAgfVxuICByZXR1cm4gMjtcbn07XG5cbi8vIE1hcHBpbmcgZnJvbSBwbHVyYWxpemF0aW9uIGdyb3VwIHBsdXJhbCBsb2dpYy5cbnZhciBwbHVyYWxUeXBlcyA9IHtcbiAgYXJhYmljOiBmdW5jdGlvbiAobikge1xuICAgIC8vIGh0dHA6Ly93d3cuYXJhYmV5ZXMub3JnL1BsdXJhbF9Gb3Jtc1xuICAgIGlmIChuIDwgMykgeyByZXR1cm4gbjsgfVxuICAgIHZhciBsYXN0VHdvID0gbiAlIDEwMDtcbiAgICBpZiAobGFzdFR3byA+PSAzICYmIGxhc3RUd28gPD0gMTApIHJldHVybiAzO1xuICAgIHJldHVybiBsYXN0VHdvID49IDExID8gNCA6IDU7XG4gIH0sXG4gIGJvc25pYW5fc2VyYmlhbjogcnVzc2lhblBsdXJhbEdyb3VwcyxcbiAgY2hpbmVzZTogZnVuY3Rpb24gKCkgeyByZXR1cm4gMDsgfSxcbiAgY3JvYXRpYW46IHJ1c3NpYW5QbHVyYWxHcm91cHMsXG4gIGZyZW5jaDogZnVuY3Rpb24gKG4pIHsgcmV0dXJuIG4gPiAxID8gMSA6IDA7IH0sXG4gIGdlcm1hbjogZnVuY3Rpb24gKG4pIHsgcmV0dXJuIG4gIT09IDEgPyAxIDogMDsgfSxcbiAgcnVzc2lhbjogcnVzc2lhblBsdXJhbEdyb3VwcyxcbiAgbGl0aHVhbmlhbjogZnVuY3Rpb24gKG4pIHtcbiAgICBpZiAobiAlIDEwID09PSAxICYmIG4gJSAxMDAgIT09IDExKSB7IHJldHVybiAwOyB9XG4gICAgcmV0dXJuIG4gJSAxMCA+PSAyICYmIG4gJSAxMCA8PSA5ICYmIChuICUgMTAwIDwgMTEgfHwgbiAlIDEwMCA+IDE5KSA/IDEgOiAyO1xuICB9LFxuICBjemVjaDogZnVuY3Rpb24gKG4pIHtcbiAgICBpZiAobiA9PT0gMSkgeyByZXR1cm4gMDsgfVxuICAgIHJldHVybiAobiA+PSAyICYmIG4gPD0gNCkgPyAxIDogMjtcbiAgfSxcbiAgcG9saXNoOiBmdW5jdGlvbiAobikge1xuICAgIGlmIChuID09PSAxKSB7IHJldHVybiAwOyB9XG4gICAgdmFyIGVuZCA9IG4gJSAxMDtcbiAgICByZXR1cm4gMiA8PSBlbmQgJiYgZW5kIDw9IDQgJiYgKG4gJSAxMDAgPCAxMCB8fCBuICUgMTAwID49IDIwKSA/IDEgOiAyO1xuICB9LFxuICBpY2VsYW5kaWM6IGZ1bmN0aW9uIChuKSB7IHJldHVybiAobiAlIDEwICE9PSAxIHx8IG4gJSAxMDAgPT09IDExKSA/IDEgOiAwOyB9LFxuICBzbG92ZW5pYW46IGZ1bmN0aW9uIChuKSB7XG4gICAgdmFyIGxhc3RUd28gPSBuICUgMTAwO1xuICAgIGlmIChsYXN0VHdvID09PSAxKSB7XG4gICAgICByZXR1cm4gMDtcbiAgICB9XG4gICAgaWYgKGxhc3RUd28gPT09IDIpIHtcbiAgICAgIHJldHVybiAxO1xuICAgIH1cbiAgICBpZiAobGFzdFR3byA9PT0gMyB8fCBsYXN0VHdvID09PSA0KSB7XG4gICAgICByZXR1cm4gMjtcbiAgICB9XG4gICAgcmV0dXJuIDM7XG4gIH1cbn07XG5cblxuLy8gTWFwcGluZyBmcm9tIHBsdXJhbGl6YXRpb24gZ3JvdXAgdG8gaW5kaXZpZHVhbCBsYW5ndWFnZSBjb2Rlcy9sb2NhbGVzLlxuLy8gV2lsbCBsb29rIHVwIGJhc2VkIG9uIGV4YWN0IG1hdGNoLCBpZiBub3QgZm91bmQgYW5kIGl0J3MgYSBsb2NhbGUgd2lsbCBwYXJzZSB0aGUgbG9jYWxlXG4vLyBmb3IgbGFuZ3VhZ2UgY29kZSwgYW5kIGlmIHRoYXQgZG9lcyBub3QgZXhpc3Qgd2lsbCBkZWZhdWx0IHRvICdlbidcbnZhciBwbHVyYWxUeXBlVG9MYW5ndWFnZXMgPSB7XG4gIGFyYWJpYzogWydhciddLFxuICBib3NuaWFuX3NlcmJpYW46IFsnYnMtTGF0bi1CQScsICdicy1DeXJsLUJBJywgJ3NybC1SUycsICdzci1SUyddLFxuICBjaGluZXNlOiBbJ2lkJywgJ2lkLUlEJywgJ2phJywgJ2tvJywgJ2tvLUtSJywgJ2xvJywgJ21zJywgJ3RoJywgJ3RoLVRIJywgJ3poJ10sXG4gIGNyb2F0aWFuOiBbJ2hyJywgJ2hyLUhSJ10sXG4gIGdlcm1hbjogWydmYScsICdkYScsICdkZScsICdlbicsICdlcycsICdmaScsICdlbCcsICdoZScsICdoaS1JTicsICdodScsICdodS1IVScsICdpdCcsICdubCcsICdubycsICdwdCcsICdzdicsICd0ciddLFxuICBmcmVuY2g6IFsnZnInLCAndGwnLCAncHQtYnInXSxcbiAgcnVzc2lhbjogWydydScsICdydS1SVSddLFxuICBsaXRodWFuaWFuOiBbJ2x0J10sXG4gIGN6ZWNoOiBbJ2NzJywgJ2NzLUNaJywgJ3NrJ10sXG4gIHBvbGlzaDogWydwbCddLFxuICBpY2VsYW5kaWM6IFsnaXMnXSxcbiAgc2xvdmVuaWFuOiBbJ3NsLVNMJ11cbn07XG5cbmZ1bmN0aW9uIGxhbmdUb1R5cGVNYXAobWFwcGluZykge1xuICB2YXIgcmV0ID0ge307XG4gIGZvckVhY2gobWFwcGluZywgZnVuY3Rpb24gKGxhbmdzLCB0eXBlKSB7XG4gICAgZm9yRWFjaChsYW5ncywgZnVuY3Rpb24gKGxhbmcpIHtcbiAgICAgIHJldFtsYW5nXSA9IHR5cGU7XG4gICAgfSk7XG4gIH0pO1xuICByZXR1cm4gcmV0O1xufVxuXG5mdW5jdGlvbiBwbHVyYWxUeXBlTmFtZShsb2NhbGUpIHtcbiAgdmFyIGxhbmdUb1BsdXJhbFR5cGUgPSBsYW5nVG9UeXBlTWFwKHBsdXJhbFR5cGVUb0xhbmd1YWdlcyk7XG4gIHJldHVybiBsYW5nVG9QbHVyYWxUeXBlW2xvY2FsZV1cbiAgICB8fCBsYW5nVG9QbHVyYWxUeXBlW3NwbGl0LmNhbGwobG9jYWxlLCAvLS8sIDEpWzBdXVxuICAgIHx8IGxhbmdUb1BsdXJhbFR5cGUuZW47XG59XG5cbmZ1bmN0aW9uIHBsdXJhbFR5cGVJbmRleChsb2NhbGUsIGNvdW50KSB7XG4gIHJldHVybiBwbHVyYWxUeXBlc1twbHVyYWxUeXBlTmFtZShsb2NhbGUpXShjb3VudCk7XG59XG5cbmZ1bmN0aW9uIGVzY2FwZSh0b2tlbikge1xuICByZXR1cm4gdG9rZW4ucmVwbGFjZSgvWy4qKz9eJHt9KCl8W1xcXVxcXFxdL2csICdcXFxcJCYnKTtcbn1cblxuZnVuY3Rpb24gY29uc3RydWN0VG9rZW5SZWdleChvcHRzKSB7XG4gIHZhciBwcmVmaXggPSAob3B0cyAmJiBvcHRzLnByZWZpeCkgfHwgJyV7JztcbiAgdmFyIHN1ZmZpeCA9IChvcHRzICYmIG9wdHMuc3VmZml4KSB8fCAnfSc7XG5cbiAgaWYgKHByZWZpeCA9PT0gZGVsaW1pdGVyIHx8IHN1ZmZpeCA9PT0gZGVsaW1pdGVyKSB7XG4gICAgdGhyb3cgbmV3IFJhbmdlRXJyb3IoJ1wiJyArIGRlbGltaXRlciArICdcIiB0b2tlbiBpcyByZXNlcnZlZCBmb3IgcGx1cmFsaXphdGlvbicpO1xuICB9XG5cbiAgcmV0dXJuIG5ldyBSZWdFeHAoZXNjYXBlKHByZWZpeCkgKyAnKC4qPyknICsgZXNjYXBlKHN1ZmZpeCksICdnJyk7XG59XG5cbnZhciBkb2xsYXJSZWdleCA9IC9cXCQvZztcbnZhciBkb2xsYXJCaWxsc1lhbGwgPSAnJCQnO1xudmFyIGRlZmF1bHRUb2tlblJlZ2V4ID0gLyVcXHsoLio/KVxcfS9nO1xuXG4vLyAjIyMgdHJhbnNmb3JtUGhyYXNlKHBocmFzZSwgc3Vic3RpdHV0aW9ucywgbG9jYWxlKVxuLy9cbi8vIFRha2VzIGEgcGhyYXNlIHN0cmluZyBhbmQgdHJhbnNmb3JtcyBpdCBieSBjaG9vc2luZyB0aGUgY29ycmVjdFxuLy8gcGx1cmFsIGZvcm0gYW5kIGludGVycG9sYXRpbmcgaXQuXG4vL1xuLy8gICAgIHRyYW5zZm9ybVBocmFzZSgnSGVsbG8sICV7bmFtZX0hJywge25hbWU6ICdTcGlrZSd9KTtcbi8vICAgICAvLyBcIkhlbGxvLCBTcGlrZSFcIlxuLy9cbi8vIFRoZSBjb3JyZWN0IHBsdXJhbCBmb3JtIGlzIHNlbGVjdGVkIGlmIHN1YnN0aXR1dGlvbnMuc21hcnRfY291bnRcbi8vIGlzIHNldC4gWW91IGNhbiBwYXNzIGluIGEgbnVtYmVyIGluc3RlYWQgb2YgYW4gT2JqZWN0IGFzIGBzdWJzdGl0dXRpb25zYFxuLy8gYXMgYSBzaG9ydGN1dCBmb3IgYHNtYXJ0X2NvdW50YC5cbi8vXG4vLyAgICAgdHJhbnNmb3JtUGhyYXNlKCcle3NtYXJ0X2NvdW50fSBuZXcgbWVzc2FnZXMgfHx8fCAxIG5ldyBtZXNzYWdlJywge3NtYXJ0X2NvdW50OiAxfSwgJ2VuJyk7XG4vLyAgICAgLy8gXCIxIG5ldyBtZXNzYWdlXCJcbi8vXG4vLyAgICAgdHJhbnNmb3JtUGhyYXNlKCcle3NtYXJ0X2NvdW50fSBuZXcgbWVzc2FnZXMgfHx8fCAxIG5ldyBtZXNzYWdlJywge3NtYXJ0X2NvdW50OiAyfSwgJ2VuJyk7XG4vLyAgICAgLy8gXCIyIG5ldyBtZXNzYWdlc1wiXG4vL1xuLy8gICAgIHRyYW5zZm9ybVBocmFzZSgnJXtzbWFydF9jb3VudH0gbmV3IG1lc3NhZ2VzIHx8fHwgMSBuZXcgbWVzc2FnZScsIDUsICdlbicpO1xuLy8gICAgIC8vIFwiNSBuZXcgbWVzc2FnZXNcIlxuLy9cbi8vIFlvdSBzaG91bGQgcGFzcyBpbiBhIHRoaXJkIGFyZ3VtZW50LCB0aGUgbG9jYWxlLCB0byBzcGVjaWZ5IHRoZSBjb3JyZWN0IHBsdXJhbCB0eXBlLlxuLy8gSXQgZGVmYXVsdHMgdG8gYCdlbidgIHdpdGggMiBwbHVyYWwgZm9ybXMuXG5mdW5jdGlvbiB0cmFuc2Zvcm1QaHJhc2UocGhyYXNlLCBzdWJzdGl0dXRpb25zLCBsb2NhbGUsIHRva2VuUmVnZXgpIHtcbiAgaWYgKHR5cGVvZiBwaHJhc2UgIT09ICdzdHJpbmcnKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcignUG9seWdsb3QudHJhbnNmb3JtUGhyYXNlIGV4cGVjdHMgYXJndW1lbnQgIzEgdG8gYmUgc3RyaW5nJyk7XG4gIH1cblxuICBpZiAoc3Vic3RpdHV0aW9ucyA9PSBudWxsKSB7XG4gICAgcmV0dXJuIHBocmFzZTtcbiAgfVxuXG4gIHZhciByZXN1bHQgPSBwaHJhc2U7XG4gIHZhciBpbnRlcnBvbGF0aW9uUmVnZXggPSB0b2tlblJlZ2V4IHx8IGRlZmF1bHRUb2tlblJlZ2V4O1xuXG4gIC8vIGFsbG93IG51bWJlciBhcyBhIHBsdXJhbGl6YXRpb24gc2hvcnRjdXRcbiAgdmFyIG9wdGlvbnMgPSB0eXBlb2Ygc3Vic3RpdHV0aW9ucyA9PT0gJ251bWJlcicgPyB7IHNtYXJ0X2NvdW50OiBzdWJzdGl0dXRpb25zIH0gOiBzdWJzdGl0dXRpb25zO1xuXG4gIC8vIFNlbGVjdCBwbHVyYWwgZm9ybTogYmFzZWQgb24gYSBwaHJhc2UgdGV4dCB0aGF0IGNvbnRhaW5zIGBuYFxuICAvLyBwbHVyYWwgZm9ybXMgc2VwYXJhdGVkIGJ5IGBkZWxpbWl0ZXJgLCBhIGBsb2NhbGVgLCBhbmQgYSBgc3Vic3RpdHV0aW9ucy5zbWFydF9jb3VudGAsXG4gIC8vIGNob29zZSB0aGUgY29ycmVjdCBwbHVyYWwgZm9ybS4gVGhpcyBpcyBvbmx5IGRvbmUgaWYgYGNvdW50YCBpcyBzZXQuXG4gIGlmIChvcHRpb25zLnNtYXJ0X2NvdW50ICE9IG51bGwgJiYgcmVzdWx0KSB7XG4gICAgdmFyIHRleHRzID0gc3BsaXQuY2FsbChyZXN1bHQsIGRlbGltaXRlcik7XG4gICAgcmVzdWx0ID0gdHJpbSh0ZXh0c1twbHVyYWxUeXBlSW5kZXgobG9jYWxlIHx8ICdlbicsIG9wdGlvbnMuc21hcnRfY291bnQpXSB8fCB0ZXh0c1swXSk7XG4gIH1cblxuICAvLyBJbnRlcnBvbGF0ZTogQ3JlYXRlcyBhIGBSZWdFeHBgIG9iamVjdCBmb3IgZWFjaCBpbnRlcnBvbGF0aW9uIHBsYWNlaG9sZGVyLlxuICByZXN1bHQgPSByZXBsYWNlLmNhbGwocmVzdWx0LCBpbnRlcnBvbGF0aW9uUmVnZXgsIGZ1bmN0aW9uIChleHByZXNzaW9uLCBhcmd1bWVudCkge1xuICAgIGlmICghaGFzKG9wdGlvbnMsIGFyZ3VtZW50KSB8fCBvcHRpb25zW2FyZ3VtZW50XSA9PSBudWxsKSB7IHJldHVybiBleHByZXNzaW9uOyB9XG4gICAgLy8gRW5zdXJlIHJlcGxhY2VtZW50IHZhbHVlIGlzIGVzY2FwZWQgdG8gcHJldmVudCBzcGVjaWFsICQtcHJlZml4ZWQgcmVnZXggcmVwbGFjZSB0b2tlbnMuXG4gICAgcmV0dXJuIHJlcGxhY2UuY2FsbChvcHRpb25zW2FyZ3VtZW50XSwgZG9sbGFyUmVnZXgsIGRvbGxhckJpbGxzWWFsbCk7XG4gIH0pO1xuXG4gIHJldHVybiByZXN1bHQ7XG59XG5cbi8vICMjIyBQb2x5Z2xvdCBjbGFzcyBjb25zdHJ1Y3RvclxuZnVuY3Rpb24gUG9seWdsb3Qob3B0aW9ucykge1xuICB2YXIgb3B0cyA9IG9wdGlvbnMgfHwge307XG4gIHRoaXMucGhyYXNlcyA9IHt9O1xuICB0aGlzLmV4dGVuZChvcHRzLnBocmFzZXMgfHwge30pO1xuICB0aGlzLmN1cnJlbnRMb2NhbGUgPSBvcHRzLmxvY2FsZSB8fCAnZW4nO1xuICB2YXIgYWxsb3dNaXNzaW5nID0gb3B0cy5hbGxvd01pc3NpbmcgPyB0cmFuc2Zvcm1QaHJhc2UgOiBudWxsO1xuICB0aGlzLm9uTWlzc2luZ0tleSA9IHR5cGVvZiBvcHRzLm9uTWlzc2luZ0tleSA9PT0gJ2Z1bmN0aW9uJyA/IG9wdHMub25NaXNzaW5nS2V5IDogYWxsb3dNaXNzaW5nO1xuICB0aGlzLndhcm4gPSBvcHRzLndhcm4gfHwgd2FybjtcbiAgdGhpcy50b2tlblJlZ2V4ID0gY29uc3RydWN0VG9rZW5SZWdleChvcHRzLmludGVycG9sYXRpb24pO1xufVxuXG4vLyAjIyMgcG9seWdsb3QubG9jYWxlKFtsb2NhbGVdKVxuLy9cbi8vIEdldCBvciBzZXQgbG9jYWxlLiBJbnRlcm5hbGx5LCBQb2x5Z2xvdCBvbmx5IHVzZXMgbG9jYWxlIGZvciBwbHVyYWxpemF0aW9uLlxuUG9seWdsb3QucHJvdG90eXBlLmxvY2FsZSA9IGZ1bmN0aW9uIChuZXdMb2NhbGUpIHtcbiAgaWYgKG5ld0xvY2FsZSkgdGhpcy5jdXJyZW50TG9jYWxlID0gbmV3TG9jYWxlO1xuICByZXR1cm4gdGhpcy5jdXJyZW50TG9jYWxlO1xufTtcblxuLy8gIyMjIHBvbHlnbG90LmV4dGVuZChwaHJhc2VzKVxuLy9cbi8vIFVzZSBgZXh0ZW5kYCB0byB0ZWxsIFBvbHlnbG90IGhvdyB0byB0cmFuc2xhdGUgYSBnaXZlbiBrZXkuXG4vL1xuLy8gICAgIHBvbHlnbG90LmV4dGVuZCh7XG4vLyAgICAgICBcImhlbGxvXCI6IFwiSGVsbG9cIixcbi8vICAgICAgIFwiaGVsbG9fbmFtZVwiOiBcIkhlbGxvLCAle25hbWV9XCJcbi8vICAgICB9KTtcbi8vXG4vLyBUaGUga2V5IGNhbiBiZSBhbnkgc3RyaW5nLiAgRmVlbCBmcmVlIHRvIGNhbGwgYGV4dGVuZGAgbXVsdGlwbGUgdGltZXM7XG4vLyBpdCB3aWxsIG92ZXJyaWRlIGFueSBwaHJhc2VzIHdpdGggdGhlIHNhbWUga2V5LCBidXQgbGVhdmUgZXhpc3RpbmcgcGhyYXNlc1xuLy8gdW50b3VjaGVkLlxuLy9cbi8vIEl0IGlzIGFsc28gcG9zc2libGUgdG8gcGFzcyBuZXN0ZWQgcGhyYXNlIG9iamVjdHMsIHdoaWNoIGdldCBmbGF0dGVuZWRcbi8vIGludG8gYW4gb2JqZWN0IHdpdGggdGhlIG5lc3RlZCBrZXlzIGNvbmNhdGVuYXRlZCB1c2luZyBkb3Qgbm90YXRpb24uXG4vL1xuLy8gICAgIHBvbHlnbG90LmV4dGVuZCh7XG4vLyAgICAgICBcIm5hdlwiOiB7XG4vLyAgICAgICAgIFwiaGVsbG9cIjogXCJIZWxsb1wiLFxuLy8gICAgICAgICBcImhlbGxvX25hbWVcIjogXCJIZWxsbywgJXtuYW1lfVwiLFxuLy8gICAgICAgICBcInNpZGViYXJcIjoge1xuLy8gICAgICAgICAgIFwid2VsY29tZVwiOiBcIldlbGNvbWVcIlxuLy8gICAgICAgICB9XG4vLyAgICAgICB9XG4vLyAgICAgfSk7XG4vL1xuLy8gICAgIGNvbnNvbGUubG9nKHBvbHlnbG90LnBocmFzZXMpO1xuLy8gICAgIC8vIHtcbi8vICAgICAvLyAgICduYXYuaGVsbG8nOiAnSGVsbG8nLFxuLy8gICAgIC8vICAgJ25hdi5oZWxsb19uYW1lJzogJ0hlbGxvLCAle25hbWV9Jyxcbi8vICAgICAvLyAgICduYXYuc2lkZWJhci53ZWxjb21lJzogJ1dlbGNvbWUnXG4vLyAgICAgLy8gfVxuLy9cbi8vIGBleHRlbmRgIGFjY2VwdHMgYW4gb3B0aW9uYWwgc2Vjb25kIGFyZ3VtZW50LCBgcHJlZml4YCwgd2hpY2ggY2FuIGJlIHVzZWRcbi8vIHRvIHByZWZpeCBldmVyeSBrZXkgaW4gdGhlIHBocmFzZXMgb2JqZWN0IHdpdGggc29tZSBzdHJpbmcsIHVzaW5nIGRvdFxuLy8gbm90YXRpb24uXG4vL1xuLy8gICAgIHBvbHlnbG90LmV4dGVuZCh7XG4vLyAgICAgICBcImhlbGxvXCI6IFwiSGVsbG9cIixcbi8vICAgICAgIFwiaGVsbG9fbmFtZVwiOiBcIkhlbGxvLCAle25hbWV9XCJcbi8vICAgICB9LCBcIm5hdlwiKTtcbi8vXG4vLyAgICAgY29uc29sZS5sb2cocG9seWdsb3QucGhyYXNlcyk7XG4vLyAgICAgLy8ge1xuLy8gICAgIC8vICAgJ25hdi5oZWxsbyc6ICdIZWxsbycsXG4vLyAgICAgLy8gICAnbmF2LmhlbGxvX25hbWUnOiAnSGVsbG8sICV7bmFtZX0nXG4vLyAgICAgLy8gfVxuLy9cbi8vIFRoaXMgZmVhdHVyZSBpcyB1c2VkIGludGVybmFsbHkgdG8gc3VwcG9ydCBuZXN0ZWQgcGhyYXNlIG9iamVjdHMuXG5Qb2x5Z2xvdC5wcm90b3R5cGUuZXh0ZW5kID0gZnVuY3Rpb24gKG1vcmVQaHJhc2VzLCBwcmVmaXgpIHtcbiAgZm9yRWFjaChtb3JlUGhyYXNlcywgZnVuY3Rpb24gKHBocmFzZSwga2V5KSB7XG4gICAgdmFyIHByZWZpeGVkS2V5ID0gcHJlZml4ID8gcHJlZml4ICsgJy4nICsga2V5IDoga2V5O1xuICAgIGlmICh0eXBlb2YgcGhyYXNlID09PSAnb2JqZWN0Jykge1xuICAgICAgdGhpcy5leHRlbmQocGhyYXNlLCBwcmVmaXhlZEtleSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMucGhyYXNlc1twcmVmaXhlZEtleV0gPSBwaHJhc2U7XG4gICAgfVxuICB9LCB0aGlzKTtcbn07XG5cbi8vICMjIyBwb2x5Z2xvdC51bnNldChwaHJhc2VzKVxuLy8gVXNlIGB1bnNldGAgdG8gc2VsZWN0aXZlbHkgcmVtb3ZlIGtleXMgZnJvbSBhIHBvbHlnbG90IGluc3RhbmNlLlxuLy9cbi8vICAgICBwb2x5Z2xvdC51bnNldChcInNvbWVfa2V5XCIpO1xuLy8gICAgIHBvbHlnbG90LnVuc2V0KHtcbi8vICAgICAgIFwiaGVsbG9cIjogXCJIZWxsb1wiLFxuLy8gICAgICAgXCJoZWxsb19uYW1lXCI6IFwiSGVsbG8sICV7bmFtZX1cIlxuLy8gICAgIH0pO1xuLy9cbi8vIFRoZSB1bnNldCBtZXRob2QgY2FuIHRha2UgZWl0aGVyIGEgc3RyaW5nIChmb3IgdGhlIGtleSksIG9yIGFuIG9iamVjdCBoYXNoIHdpdGhcbi8vIHRoZSBrZXlzIHRoYXQgeW91IHdvdWxkIGxpa2UgdG8gdW5zZXQuXG5Qb2x5Z2xvdC5wcm90b3R5cGUudW5zZXQgPSBmdW5jdGlvbiAobW9yZVBocmFzZXMsIHByZWZpeCkge1xuICBpZiAodHlwZW9mIG1vcmVQaHJhc2VzID09PSAnc3RyaW5nJykge1xuICAgIGRlbGV0ZSB0aGlzLnBocmFzZXNbbW9yZVBocmFzZXNdO1xuICB9IGVsc2Uge1xuICAgIGZvckVhY2gobW9yZVBocmFzZXMsIGZ1bmN0aW9uIChwaHJhc2UsIGtleSkge1xuICAgICAgdmFyIHByZWZpeGVkS2V5ID0gcHJlZml4ID8gcHJlZml4ICsgJy4nICsga2V5IDoga2V5O1xuICAgICAgaWYgKHR5cGVvZiBwaHJhc2UgPT09ICdvYmplY3QnKSB7XG4gICAgICAgIHRoaXMudW5zZXQocGhyYXNlLCBwcmVmaXhlZEtleSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBkZWxldGUgdGhpcy5waHJhc2VzW3ByZWZpeGVkS2V5XTtcbiAgICAgIH1cbiAgICB9LCB0aGlzKTtcbiAgfVxufTtcblxuLy8gIyMjIHBvbHlnbG90LmNsZWFyKClcbi8vXG4vLyBDbGVhcnMgYWxsIHBocmFzZXMuIFVzZWZ1bCBmb3Igc3BlY2lhbCBjYXNlcywgc3VjaCBhcyBmcmVlaW5nXG4vLyB1cCBtZW1vcnkgaWYgeW91IGhhdmUgbG90cyBvZiBwaHJhc2VzIGJ1dCBubyBsb25nZXIgbmVlZCB0b1xuLy8gcGVyZm9ybSBhbnkgdHJhbnNsYXRpb24uIEFsc28gdXNlZCBpbnRlcm5hbGx5IGJ5IGByZXBsYWNlYC5cblBvbHlnbG90LnByb3RvdHlwZS5jbGVhciA9IGZ1bmN0aW9uICgpIHtcbiAgdGhpcy5waHJhc2VzID0ge307XG59O1xuXG4vLyAjIyMgcG9seWdsb3QucmVwbGFjZShwaHJhc2VzKVxuLy9cbi8vIENvbXBsZXRlbHkgcmVwbGFjZSB0aGUgZXhpc3RpbmcgcGhyYXNlcyB3aXRoIGEgbmV3IHNldCBvZiBwaHJhc2VzLlxuLy8gTm9ybWFsbHksIGp1c3QgdXNlIGBleHRlbmRgIHRvIGFkZCBtb3JlIHBocmFzZXMsIGJ1dCB1bmRlciBjZXJ0YWluXG4vLyBjaXJjdW1zdGFuY2VzLCB5b3UgbWF5IHdhbnQgdG8gbWFrZSBzdXJlIG5vIG9sZCBwaHJhc2VzIGFyZSBseWluZyBhcm91bmQuXG5Qb2x5Z2xvdC5wcm90b3R5cGUucmVwbGFjZSA9IGZ1bmN0aW9uIChuZXdQaHJhc2VzKSB7XG4gIHRoaXMuY2xlYXIoKTtcbiAgdGhpcy5leHRlbmQobmV3UGhyYXNlcyk7XG59O1xuXG5cbi8vICMjIyBwb2x5Z2xvdC50KGtleSwgb3B0aW9ucylcbi8vXG4vLyBUaGUgbW9zdC11c2VkIG1ldGhvZC4gUHJvdmlkZSBhIGtleSwgYW5kIGB0YCB3aWxsIHJldHVybiB0aGVcbi8vIHBocmFzZS5cbi8vXG4vLyAgICAgcG9seWdsb3QudChcImhlbGxvXCIpO1xuLy8gICAgID0+IFwiSGVsbG9cIlxuLy9cbi8vIFRoZSBwaHJhc2UgdmFsdWUgaXMgcHJvdmlkZWQgZmlyc3QgYnkgYSBjYWxsIHRvIGBwb2x5Z2xvdC5leHRlbmQoKWAgb3Jcbi8vIGBwb2x5Z2xvdC5yZXBsYWNlKClgLlxuLy9cbi8vIFBhc3MgaW4gYW4gb2JqZWN0IGFzIHRoZSBzZWNvbmQgYXJndW1lbnQgdG8gcGVyZm9ybSBpbnRlcnBvbGF0aW9uLlxuLy9cbi8vICAgICBwb2x5Z2xvdC50KFwiaGVsbG9fbmFtZVwiLCB7bmFtZTogXCJTcGlrZVwifSk7XG4vLyAgICAgPT4gXCJIZWxsbywgU3Bpa2VcIlxuLy9cbi8vIElmIHlvdSBsaWtlLCB5b3UgY2FuIHByb3ZpZGUgYSBkZWZhdWx0IHZhbHVlIGluIGNhc2UgdGhlIHBocmFzZSBpcyBtaXNzaW5nLlxuLy8gVXNlIHRoZSBzcGVjaWFsIG9wdGlvbiBrZXkgXCJfXCIgdG8gc3BlY2lmeSBhIGRlZmF1bHQuXG4vL1xuLy8gICAgIHBvbHlnbG90LnQoXCJpX2xpa2VfdG9fd3JpdGVfaW5fbGFuZ3VhZ2VcIiwge1xuLy8gICAgICAgXzogXCJJIGxpa2UgdG8gd3JpdGUgaW4gJXtsYW5ndWFnZX0uXCIsXG4vLyAgICAgICBsYW5ndWFnZTogXCJKYXZhU2NyaXB0XCJcbi8vICAgICB9KTtcbi8vICAgICA9PiBcIkkgbGlrZSB0byB3cml0ZSBpbiBKYXZhU2NyaXB0LlwiXG4vL1xuUG9seWdsb3QucHJvdG90eXBlLnQgPSBmdW5jdGlvbiAoa2V5LCBvcHRpb25zKSB7XG4gIHZhciBwaHJhc2UsIHJlc3VsdDtcbiAgdmFyIG9wdHMgPSBvcHRpb25zID09IG51bGwgPyB7fSA6IG9wdGlvbnM7XG4gIGlmICh0eXBlb2YgdGhpcy5waHJhc2VzW2tleV0gPT09ICdzdHJpbmcnKSB7XG4gICAgcGhyYXNlID0gdGhpcy5waHJhc2VzW2tleV07XG4gIH0gZWxzZSBpZiAodHlwZW9mIG9wdHMuXyA9PT0gJ3N0cmluZycpIHtcbiAgICBwaHJhc2UgPSBvcHRzLl87XG4gIH0gZWxzZSBpZiAodGhpcy5vbk1pc3NpbmdLZXkpIHtcbiAgICB2YXIgb25NaXNzaW5nS2V5ID0gdGhpcy5vbk1pc3NpbmdLZXk7XG4gICAgcmVzdWx0ID0gb25NaXNzaW5nS2V5KGtleSwgb3B0cywgdGhpcy5jdXJyZW50TG9jYWxlLCB0aGlzLnRva2VuUmVnZXgpO1xuICB9IGVsc2Uge1xuICAgIHRoaXMud2FybignTWlzc2luZyB0cmFuc2xhdGlvbiBmb3Iga2V5OiBcIicgKyBrZXkgKyAnXCInKTtcbiAgICByZXN1bHQgPSBrZXk7XG4gIH1cbiAgaWYgKHR5cGVvZiBwaHJhc2UgPT09ICdzdHJpbmcnKSB7XG4gICAgcmVzdWx0ID0gdHJhbnNmb3JtUGhyYXNlKHBocmFzZSwgb3B0cywgdGhpcy5jdXJyZW50TG9jYWxlLCB0aGlzLnRva2VuUmVnZXgpO1xuICB9XG4gIHJldHVybiByZXN1bHQ7XG59O1xuXG5cbi8vICMjIyBwb2x5Z2xvdC5oYXMoa2V5KVxuLy9cbi8vIENoZWNrIGlmIHBvbHlnbG90IGhhcyBhIHRyYW5zbGF0aW9uIGZvciBnaXZlbiBrZXlcblBvbHlnbG90LnByb3RvdHlwZS5oYXMgPSBmdW5jdGlvbiAoa2V5KSB7XG4gIHJldHVybiBoYXModGhpcy5waHJhc2VzLCBrZXkpO1xufTtcblxuLy8gZXhwb3J0IHRyYW5zZm9ybVBocmFzZVxuUG9seWdsb3QudHJhbnNmb3JtUGhyYXNlID0gZnVuY3Rpb24gdHJhbnNmb3JtKHBocmFzZSwgc3Vic3RpdHV0aW9ucywgbG9jYWxlKSB7XG4gIHJldHVybiB0cmFuc2Zvcm1QaHJhc2UocGhyYXNlLCBzdWJzdGl0dXRpb25zLCBsb2NhbGUpO1xufTtcblxudmFyIHdlYml4UG9seWdsb3QgPSBQb2x5Z2xvdDtcblxuZnVuY3Rpb24gTG9jYWxlKGFwcCwgX3ZpZXcsIGNvbmZpZykge1xyXG4gICAgY29uZmlnID0gY29uZmlnIHx8IHt9O1xyXG4gICAgY29uc3Qgc3RvcmFnZSA9IGNvbmZpZy5zdG9yYWdlO1xyXG4gICAgbGV0IGxhbmcgPSBzdG9yYWdlID8gKHN0b3JhZ2UuZ2V0KFwibGFuZ1wiKSB8fCBcImVuXCIpIDogKGNvbmZpZy5sYW5nIHx8IFwiZW5cIik7XHJcbiAgICBmdW5jdGlvbiBzZXRMYW5nRGF0YShuYW1lLCBkYXRhLCBzaWxlbnQpIHtcclxuICAgICAgICBpZiAoZGF0YS5fX2VzTW9kdWxlKSB7XHJcbiAgICAgICAgICAgIGRhdGEgPSBkYXRhLmRlZmF1bHQ7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNvbnN0IHBjb25maWcgPSB7IHBocmFzZXM6IGRhdGEgfTtcclxuICAgICAgICBpZiAoY29uZmlnLnBvbHlnbG90KSB7XHJcbiAgICAgICAgICAgIGFwcC53ZWJpeC5leHRlbmQocGNvbmZpZywgY29uZmlnLnBvbHlnbG90KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgY29uc3QgcG9seSA9IHNlcnZpY2UucG9seWdsb3QgPSBuZXcgd2ViaXhQb2x5Z2xvdChwY29uZmlnKTtcclxuICAgICAgICBwb2x5LmxvY2FsZShuYW1lKTtcclxuICAgICAgICBzZXJ2aWNlLl8gPSBhcHAud2ViaXguYmluZChwb2x5LnQsIHBvbHkpO1xyXG4gICAgICAgIGxhbmcgPSBuYW1lO1xyXG4gICAgICAgIGlmIChzdG9yYWdlKSB7XHJcbiAgICAgICAgICAgIHN0b3JhZ2UucHV0KFwibGFuZ1wiLCBsYW5nKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKGNvbmZpZy53ZWJpeCkge1xyXG4gICAgICAgICAgICBjb25zdCBsb2NOYW1lID0gY29uZmlnLndlYml4W25hbWVdO1xyXG4gICAgICAgICAgICBpZiAobG9jTmFtZSkge1xyXG4gICAgICAgICAgICAgICAgYXBwLndlYml4LmkxOG4uc2V0TG9jYWxlKGxvY05hbWUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICghc2lsZW50KSB7XHJcbiAgICAgICAgICAgIHJldHVybiBhcHAucmVmcmVzaCgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKCk7XHJcbiAgICB9XHJcbiAgICBmdW5jdGlvbiBnZXRMYW5nKCkgeyByZXR1cm4gbGFuZzsgfVxyXG4gICAgZnVuY3Rpb24gc2V0TGFuZyhuYW1lLCBzaWxlbnQpIHtcclxuICAgICAgICAvLyBpZ25vcmUgc2V0TGFuZyBpZiBsb2FkaW5nIGJ5IHBhdGggaXMgZGlzYWJsZWRcclxuICAgICAgICBpZiAoY29uZmlnLnBhdGggPT09IGZhbHNlKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgY29uc3QgcGF0aCA9IChjb25maWcucGF0aCA/IGNvbmZpZy5wYXRoICsgXCIvXCIgOiBcIlwiKSArIG5hbWU7XHJcbiAgICAgICAgY29uc3QgZGF0YSA9IHJlcXVpcmUoXCJqZXQtbG9jYWxlcy9cIiArIHBhdGgpO1xyXG4gICAgICAgIHNldExhbmdEYXRhKG5hbWUsIGRhdGEsIHNpbGVudCk7XHJcbiAgICB9XHJcbiAgICBjb25zdCBzZXJ2aWNlID0ge1xyXG4gICAgICAgIGdldExhbmcsIHNldExhbmcsIHNldExhbmdEYXRhLCBfOiBudWxsLCBwb2x5Z2xvdDogbnVsbFxyXG4gICAgfTtcclxuICAgIGFwcC5zZXRTZXJ2aWNlKFwibG9jYWxlXCIsIHNlcnZpY2UpO1xyXG4gICAgc2V0TGFuZyhsYW5nLCB0cnVlKTtcclxufVxuXG5mdW5jdGlvbiBzaG93KHZpZXcsIGNvbmZpZywgdmFsdWUpIHtcclxuICAgIGlmIChjb25maWcudXJscykge1xyXG4gICAgICAgIHZhbHVlID0gY29uZmlnLnVybHNbdmFsdWVdIHx8IHZhbHVlO1xyXG4gICAgfVxyXG4gICAgZWxzZSBpZiAoY29uZmlnLnBhcmFtKSB7XHJcbiAgICAgICAgdmFsdWUgPSB7IFtjb25maWcucGFyYW1dOiB2YWx1ZSB9O1xyXG4gICAgfVxyXG4gICAgdmlldy5zaG93KHZhbHVlKTtcclxufVxyXG5mdW5jdGlvbiBNZW51KGFwcCwgdmlldywgY29uZmlnKSB7XHJcbiAgICBjb25zdCBmcmFtZSA9IHZpZXcuZ2V0U3ViVmlld0luZm8oKS5wYXJlbnQ7XHJcbiAgICBjb25zdCB1aSA9IHZpZXcuJCQoY29uZmlnLmlkIHx8IGNvbmZpZyk7XHJcbiAgICBsZXQgc2lsZW50ID0gZmFsc2U7XHJcbiAgICB1aS5hdHRhY2hFdmVudChcIm9uY2hhbmdlXCIsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBpZiAoIXNpbGVudCkge1xyXG4gICAgICAgICAgICBzaG93KGZyYW1lLCBjb25maWcsIHRoaXMuZ2V0VmFsdWUoKSk7XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcbiAgICB1aS5hdHRhY2hFdmVudChcIm9uYWZ0ZXJzZWxlY3RcIiwgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIGlmICghc2lsZW50KSB7XHJcbiAgICAgICAgICAgIGxldCBpZCA9IG51bGw7XHJcbiAgICAgICAgICAgIGlmICh1aS5zZXRWYWx1ZSkge1xyXG4gICAgICAgICAgICAgICAgaWQgPSB0aGlzLmdldFZhbHVlKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSBpZiAodWkuZ2V0U2VsZWN0ZWRJZCkge1xyXG4gICAgICAgICAgICAgICAgaWQgPSB1aS5nZXRTZWxlY3RlZElkKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgc2hvdyhmcmFtZSwgY29uZmlnLCBpZCk7XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcbiAgICB2aWV3Lm9uKGFwcCwgYGFwcDpyb3V0ZWAsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBsZXQgbmFtZSA9IFwiXCI7XHJcbiAgICAgICAgaWYgKGNvbmZpZy5wYXJhbSkge1xyXG4gICAgICAgICAgICBuYW1lID0gdmlldy5nZXRQYXJhbShjb25maWcucGFyYW0sIHRydWUpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgY29uc3Qgc2VnbWVudCA9IGZyYW1lLmdldFVybCgpWzFdO1xyXG4gICAgICAgICAgICBpZiAoc2VnbWVudCkge1xyXG4gICAgICAgICAgICAgICAgbmFtZSA9IHNlZ21lbnQucGFnZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAobmFtZSkge1xyXG4gICAgICAgICAgICBzaWxlbnQgPSB0cnVlO1xyXG4gICAgICAgICAgICBpZiAodWkuc2V0VmFsdWUgJiYgdWkuZ2V0VmFsdWUoKSAhPT0gbmFtZSkge1xyXG4gICAgICAgICAgICAgICAgdWkuc2V0VmFsdWUobmFtZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSBpZiAodWkuc2VsZWN0ICYmIHVpLmV4aXN0cyhuYW1lKSAmJiB1aS5nZXRTZWxlY3RlZElkKCkgIT09IG5hbWUpIHtcclxuICAgICAgICAgICAgICAgIHVpLnNlbGVjdChuYW1lKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBzaWxlbnQgPSBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxufVxuXG5jb25zdCBiYXNlaWNvbnMgPSB7XHJcbiAgICBnb29kOiBcImNoZWNrXCIsXHJcbiAgICBlcnJvcjogXCJ3YXJuaW5nXCIsXHJcbiAgICBzYXZpbmc6IFwicmVmcmVzaCBmYS1zcGluXCJcclxufTtcclxuY29uc3QgYmFzZXRleHQgPSB7XHJcbiAgICBnb29kOiBcIk9rXCIsXHJcbiAgICBlcnJvcjogXCJFcnJvclwiLFxyXG4gICAgc2F2aW5nOiBcIkNvbm5lY3RpbmcuLi5cIlxyXG59O1xyXG5mdW5jdGlvbiBTdGF0dXMoYXBwLCB2aWV3LCBjb25maWcpIHtcclxuICAgIGxldCBzdGF0dXMgPSBcImdvb2RcIjtcclxuICAgIGxldCBjb3VudCA9IDA7XHJcbiAgICBsZXQgaXNlcnJvciA9IGZhbHNlO1xyXG4gICAgbGV0IGV4cGlyZURlbGF5ID0gY29uZmlnLmV4cGlyZTtcclxuICAgIGlmICghZXhwaXJlRGVsYXkgJiYgZXhwaXJlRGVsYXkgIT09IGZhbHNlKSB7XHJcbiAgICAgICAgZXhwaXJlRGVsYXkgPSAyMDAwO1xyXG4gICAgfVxyXG4gICAgY29uc3QgdGV4dHMgPSBjb25maWcudGV4dHMgfHwgYmFzZXRleHQ7XHJcbiAgICBjb25zdCBpY29ucyA9IGNvbmZpZy5pY29ucyB8fCBiYXNlaWNvbnM7XHJcbiAgICBpZiAodHlwZW9mIGNvbmZpZyA9PT0gXCJzdHJpbmdcIikge1xyXG4gICAgICAgIGNvbmZpZyA9IHsgdGFyZ2V0OiBjb25maWcgfTtcclxuICAgIH1cclxuICAgIGZ1bmN0aW9uIHJlZnJlc2goY29udGVudCkge1xyXG4gICAgICAgIGNvbnN0IGFyZWEgPSB2aWV3LiQkKGNvbmZpZy50YXJnZXQpO1xyXG4gICAgICAgIGlmIChhcmVhKSB7XHJcbiAgICAgICAgICAgIGlmICghY29udGVudCkge1xyXG4gICAgICAgICAgICAgICAgY29udGVudCA9IFwiPGRpdiBjbGFzcz0nc3RhdHVzX1wiICtcclxuICAgICAgICAgICAgICAgICAgICBzdGF0dXMgK1xyXG4gICAgICAgICAgICAgICAgICAgIFwiJz48c3BhbiBjbGFzcz0nd2ViaXhfaWNvbiBmYS1cIiArXHJcbiAgICAgICAgICAgICAgICAgICAgaWNvbnNbc3RhdHVzXSArIFwiJz48L3NwYW4+IFwiICsgdGV4dHNbc3RhdHVzXSArIFwiPC9kaXY+XCI7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgYXJlYS5zZXRIVE1MKGNvbnRlbnQpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGZ1bmN0aW9uIHN1Y2Nlc3MoKSB7XHJcbiAgICAgICAgY291bnQtLTtcclxuICAgICAgICBzZXRTdGF0dXMoXCJnb29kXCIpO1xyXG4gICAgfVxyXG4gICAgZnVuY3Rpb24gZmFpbChlcnIpIHtcclxuICAgICAgICBjb3VudC0tO1xyXG4gICAgICAgIHNldFN0YXR1cyhcImVycm9yXCIsIGVycik7XHJcbiAgICB9XHJcbiAgICBmdW5jdGlvbiBzdGFydChwcm9taXNlKSB7XHJcbiAgICAgICAgY291bnQrKztcclxuICAgICAgICBzZXRTdGF0dXMoXCJzYXZpbmdcIik7XHJcbiAgICAgICAgaWYgKHByb21pc2UgJiYgcHJvbWlzZS50aGVuKSB7XHJcbiAgICAgICAgICAgIHByb21pc2UudGhlbihzdWNjZXNzLCBmYWlsKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBmdW5jdGlvbiBnZXRTdGF0dXMoKSB7XHJcbiAgICAgICAgcmV0dXJuIHN0YXR1cztcclxuICAgIH1cclxuICAgIGZ1bmN0aW9uIGhpZGVTdGF0dXMoKSB7XHJcbiAgICAgICAgaWYgKGNvdW50ID09PSAwKSB7XHJcbiAgICAgICAgICAgIHJlZnJlc2goXCIgXCIpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGZ1bmN0aW9uIHNldFN0YXR1cyhtb2RlLCBlcnIpIHtcclxuICAgICAgICBpZiAoY291bnQgPCAwKSB7XHJcbiAgICAgICAgICAgIGNvdW50ID0gMDtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKG1vZGUgPT09IFwic2F2aW5nXCIpIHtcclxuICAgICAgICAgICAgc3RhdHVzID0gXCJzYXZpbmdcIjtcclxuICAgICAgICAgICAgcmVmcmVzaCgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgaXNlcnJvciA9IChtb2RlID09PSBcImVycm9yXCIpO1xyXG4gICAgICAgICAgICBpZiAoY291bnQgPT09IDApIHtcclxuICAgICAgICAgICAgICAgIHN0YXR1cyA9IGlzZXJyb3IgPyBcImVycm9yXCIgOiBcImdvb2RcIjtcclxuICAgICAgICAgICAgICAgIGlmIChpc2Vycm9yKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgYXBwLmVycm9yKFwiYXBwOmVycm9yOnNlcnZlclwiLCBbZXJyLnJlc3BvbnNlVGV4dCB8fCBlcnJdKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChleHBpcmVEZWxheSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KGhpZGVTdGF0dXMsIGV4cGlyZURlbGF5KTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICByZWZyZXNoKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBmdW5jdGlvbiB0cmFjayhkYXRhKSB7XHJcbiAgICAgICAgY29uc3QgZHAgPSBhcHAud2ViaXguZHAoZGF0YSk7XHJcbiAgICAgICAgaWYgKGRwKSB7XHJcbiAgICAgICAgICAgIHZpZXcub24oZHAsIFwib25BZnRlckRhdGFTZW5kXCIsIHN0YXJ0KTtcclxuICAgICAgICAgICAgdmlldy5vbihkcCwgXCJvbkFmdGVyU2F2ZUVycm9yXCIsIChfaWQsIF9vYmosIHJlc3BvbnNlKSA9PiBmYWlsKHJlc3BvbnNlKSk7XHJcbiAgICAgICAgICAgIHZpZXcub24oZHAsIFwib25BZnRlclNhdmVcIiwgc3VjY2Vzcyk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgYXBwLnNldFNlcnZpY2UoXCJzdGF0dXNcIiwge1xyXG4gICAgICAgIGdldFN0YXR1cyxcclxuICAgICAgICBzZXRTdGF0dXMsXHJcbiAgICAgICAgdHJhY2tcclxuICAgIH0pO1xyXG4gICAgaWYgKGNvbmZpZy5yZW1vdGUpIHtcclxuICAgICAgICB2aWV3Lm9uKGFwcC53ZWJpeCwgXCJvblJlbW90ZUNhbGxcIiwgc3RhcnQpO1xyXG4gICAgfVxyXG4gICAgaWYgKGNvbmZpZy5hamF4KSB7XHJcbiAgICAgICAgdmlldy5vbihhcHAud2ViaXgsIFwib25CZWZvcmVBamF4XCIsIChfbW9kZSwgX3VybCwgX2RhdGEsIF9yZXF1ZXN0LCBfaGVhZGVycywgX2ZpbGVzLCBwcm9taXNlKSA9PiB7XHJcbiAgICAgICAgICAgIHN0YXJ0KHByb21pc2UpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgaWYgKGNvbmZpZy5kYXRhKSB7XHJcbiAgICAgICAgdHJhY2soY29uZmlnLmRhdGEpO1xyXG4gICAgfVxyXG59XG5cbmZ1bmN0aW9uIFRoZW1lKGFwcCwgX3ZpZXcsIGNvbmZpZykge1xyXG4gICAgY29uZmlnID0gY29uZmlnIHx8IHt9O1xyXG4gICAgY29uc3Qgc3RvcmFnZSA9IGNvbmZpZy5zdG9yYWdlO1xyXG4gICAgbGV0IHRoZW1lID0gc3RvcmFnZSA/XHJcbiAgICAgICAgKHN0b3JhZ2UuZ2V0KFwidGhlbWVcIikgfHwgXCJmbGF0LWRlZmF1bHRcIilcclxuICAgICAgICA6XHJcbiAgICAgICAgICAgIChjb25maWcudGhlbWUgfHwgXCJmbGF0LWRlZmF1bHRcIik7XHJcbiAgICBjb25zdCBzZXJ2aWNlID0ge1xyXG4gICAgICAgIGdldFRoZW1lKCkgeyByZXR1cm4gdGhlbWU7IH0sXHJcbiAgICAgICAgc2V0VGhlbWUobmFtZSwgc2lsZW50KSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHBhcnRzID0gbmFtZS5zcGxpdChcIi1cIik7XHJcbiAgICAgICAgICAgIGNvbnN0IGxpbmtzID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoXCJsaW5rXCIpO1xyXG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxpbmtzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBsbmFtZSA9IGxpbmtzW2ldLmdldEF0dHJpYnV0ZShcInRpdGxlXCIpO1xyXG4gICAgICAgICAgICAgICAgaWYgKGxuYW1lKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGxuYW1lID09PSBuYW1lIHx8IGxuYW1lID09PSBwYXJ0c1swXSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsaW5rc1tpXS5kaXNhYmxlZCA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGlua3NbaV0uZGlzYWJsZWQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBhcHAud2ViaXguc2tpbi5zZXQocGFydHNbMF0pO1xyXG4gICAgICAgICAgICAvLyByZW1vdmUgb2xkIGNzc1xyXG4gICAgICAgICAgICBhcHAud2ViaXguaHRtbC5yZW1vdmVDc3MoZG9jdW1lbnQuYm9keSwgXCJ0aGVtZS1cIiArIHRoZW1lKTtcclxuICAgICAgICAgICAgLy8gYWRkIG5ldyBjc3NcclxuICAgICAgICAgICAgYXBwLndlYml4Lmh0bWwuYWRkQ3NzKGRvY3VtZW50LmJvZHksIFwidGhlbWUtXCIgKyBuYW1lKTtcclxuICAgICAgICAgICAgdGhlbWUgPSBuYW1lO1xyXG4gICAgICAgICAgICBpZiAoc3RvcmFnZSkge1xyXG4gICAgICAgICAgICAgICAgc3RvcmFnZS5wdXQoXCJ0aGVtZVwiLCBuYW1lKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoIXNpbGVudCkge1xyXG4gICAgICAgICAgICAgICAgYXBwLnJlZnJlc2goKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH07XHJcbiAgICBhcHAuc2V0U2VydmljZShcInRoZW1lXCIsIHNlcnZpY2UpO1xyXG4gICAgc2VydmljZS5zZXRUaGVtZSh0aGVtZSwgdHJ1ZSk7XHJcbn1cblxuZnVuY3Rpb24gY29weVBhcmFtcyhkYXRhLCB1cmwsIHJvdXRlKSB7XHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHJvdXRlLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgZGF0YVtyb3V0ZVtpXV0gPSB1cmxbaSArIDFdID8gdXJsW2kgKyAxXS5wYWdlIDogXCJcIjtcclxuICAgIH1cclxufVxyXG5mdW5jdGlvbiBVcmxQYXJhbShhcHAsIHZpZXcsIGNvbmZpZykge1xyXG4gICAgY29uc3Qgcm91dGUgPSBjb25maWcucm91dGUgfHwgY29uZmlnO1xyXG4gICAgY29uc3QgZGF0YSA9IHt9O1xyXG4gICAgdmlldy5vbihhcHAsIFwiYXBwOnVybGNoYW5nZVwiLCBmdW5jdGlvbiAoc3Vidmlldywgc2VnbWVudCkge1xyXG4gICAgICAgIGlmICh2aWV3ID09PSBzdWJ2aWV3KSB7XHJcbiAgICAgICAgICAgIGNvcHlQYXJhbXMoZGF0YSwgc2VnbWVudC5zdWJ1cmwoKSwgcm91dGUpO1xyXG4gICAgICAgICAgICBzZWdtZW50LnNpemUocm91dGUubGVuZ3RoICsgMSk7XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcbiAgICBjb25zdCBvcyA9IHZpZXcuc2V0UGFyYW07XHJcbiAgICBjb25zdCBvZyA9IHZpZXcuZ2V0UGFyYW07XHJcbiAgICB2aWV3LnNldFBhcmFtID0gZnVuY3Rpb24gKG5hbWUsIHZhbHVlLCBzaG93KSB7XHJcbiAgICAgICAgY29uc3QgaW5kZXggPSByb3V0ZS5pbmRleE9mKG5hbWUpO1xyXG4gICAgICAgIGlmIChpbmRleCA+PSAwKSB7XHJcbiAgICAgICAgICAgIGRhdGFbbmFtZV0gPSB2YWx1ZTtcclxuICAgICAgICAgICAgdGhpcy5fc2VnbWVudC51cGRhdGUoXCJcIiwgdmFsdWUsIGluZGV4ICsgMSk7XHJcbiAgICAgICAgICAgIGlmIChzaG93KSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdmlldy5zaG93KG51bGwpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICByZXR1cm4gb3MuY2FsbCh0aGlzLCBuYW1lLCB2YWx1ZSwgc2hvdyk7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuICAgIHZpZXcuZ2V0UGFyYW0gPSBmdW5jdGlvbiAoa2V5LCBtb2RlKSB7XHJcbiAgICAgICAgY29uc3QgdmFsID0gZGF0YVtrZXldO1xyXG4gICAgICAgIGlmICh0eXBlb2YgdmFsICE9PSBcInVuZGVmaW5lZFwiKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB2YWw7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBvZy5jYWxsKHRoaXMsIGtleSwgbW9kZSk7XHJcbiAgICB9O1xyXG4gICAgY29weVBhcmFtcyhkYXRhLCB2aWV3LmdldFVybCgpLCByb3V0ZSk7XHJcbn1cblxuZnVuY3Rpb24gVXNlcihhcHAsIF92aWV3LCBjb25maWcpIHtcclxuICAgIGNvbmZpZyA9IGNvbmZpZyB8fCB7fTtcclxuICAgIGNvbnN0IGxvZ2luID0gY29uZmlnLmxvZ2luIHx8IFwiL2xvZ2luXCI7XHJcbiAgICBjb25zdCBsb2dvdXQgPSBjb25maWcubG9nb3V0IHx8IFwiL2xvZ291dFwiO1xyXG4gICAgY29uc3QgYWZ0ZXJMb2dpbiA9IGNvbmZpZy5hZnRlckxvZ2luIHx8IGFwcC5jb25maWcuc3RhcnQ7XHJcbiAgICBjb25zdCBhZnRlckxvZ291dCA9IGNvbmZpZy5hZnRlckxvZ291dCB8fCBcIi9sb2dpblwiO1xyXG4gICAgY29uc3QgcGluZyA9IGNvbmZpZy5waW5nIHx8IDUgKiA2MCAqIDEwMDA7XHJcbiAgICBjb25zdCBtb2RlbCA9IGNvbmZpZy5tb2RlbDtcclxuICAgIGxldCB1c2VyID0gY29uZmlnLnVzZXI7XHJcbiAgICBjb25zdCBzZXJ2aWNlID0ge1xyXG4gICAgICAgIGdldFVzZXIoKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB1c2VyO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgZ2V0U3RhdHVzKHNlcnZlcikge1xyXG4gICAgICAgICAgICBpZiAoIXNlcnZlcikge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHVzZXIgIT09IG51bGw7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIG1vZGVsLnN0YXR1cygpLmNhdGNoKCgpID0+IG51bGwpLnRoZW4oZGF0YSA9PiB7XHJcbiAgICAgICAgICAgICAgICB1c2VyID0gZGF0YTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBsb2dpbihuYW1lLCBwYXNzKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBtb2RlbC5sb2dpbihuYW1lLCBwYXNzKS50aGVuKGRhdGEgPT4ge1xyXG4gICAgICAgICAgICAgICAgdXNlciA9IGRhdGE7XHJcbiAgICAgICAgICAgICAgICBpZiAoIWRhdGEpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJBY2Nlc3MgZGVuaWVkXCIpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgYXBwLmNhbGxFdmVudChcImFwcDp1c2VyOmxvZ2luXCIsIFt1c2VyXSk7XHJcbiAgICAgICAgICAgICAgICBhcHAuc2hvdyhhZnRlckxvZ2luKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBsb2dvdXQoKSB7XHJcbiAgICAgICAgICAgIHVzZXIgPSBudWxsO1xyXG4gICAgICAgICAgICByZXR1cm4gbW9kZWwubG9nb3V0KCkudGhlbihyZXMgPT4ge1xyXG4gICAgICAgICAgICAgICAgYXBwLmNhbGxFdmVudChcImFwcDp1c2VyOmxvZ291dFwiLCBbXSk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVzO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG4gICAgZnVuY3Rpb24gY2FuTmF2aWdhdGUodXJsLCBvYmopIHtcclxuICAgICAgICBpZiAodXJsID09PSBsb2dvdXQpIHtcclxuICAgICAgICAgICAgc2VydmljZS5sb2dvdXQoKTtcclxuICAgICAgICAgICAgb2JqLnJlZGlyZWN0ID0gYWZ0ZXJMb2dvdXQ7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYgKHVybCAhPT0gbG9naW4gJiYgIXNlcnZpY2UuZ2V0U3RhdHVzKCkpIHtcclxuICAgICAgICAgICAgb2JqLnJlZGlyZWN0ID0gbG9naW47XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgYXBwLnNldFNlcnZpY2UoXCJ1c2VyXCIsIHNlcnZpY2UpO1xyXG4gICAgYXBwLmF0dGFjaEV2ZW50KGBhcHA6Z3VhcmRgLCBmdW5jdGlvbiAodXJsLCBfJHJvb3QsIG9iaikge1xyXG4gICAgICAgIGlmIChjb25maWcucHVibGljICYmIGNvbmZpZy5wdWJsaWModXJsKSkge1xyXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHR5cGVvZiB1c2VyID09PSBcInVuZGVmaW5lZFwiKSB7XHJcbiAgICAgICAgICAgIG9iai5jb25maXJtID0gc2VydmljZS5nZXRTdGF0dXModHJ1ZSkudGhlbigoKSA9PiBjYW5OYXZpZ2F0ZSh1cmwsIG9iaikpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gY2FuTmF2aWdhdGUodXJsLCBvYmopO1xyXG4gICAgfSk7XHJcbiAgICBpZiAocGluZykge1xyXG4gICAgICAgIHNldEludGVydmFsKCgpID0+IHNlcnZpY2UuZ2V0U3RhdHVzKHRydWUpLCBwaW5nKTtcclxuICAgIH1cclxufVxuXG4vKlxyXG5NSVQgTGljZW5zZVxyXG5Db3B5cmlnaHQgKGMpIDIwMTkgWEIgU29mdHdhcmVcclxuKi9cclxubGV0IHdlYml4ID0gd2luZG93LndlYml4O1xyXG5pZiAod2ViaXgpIHtcclxuICAgIHBhdGNoKHdlYml4KTtcclxufVxyXG5jb25zdCBwbHVnaW5zID0ge1xyXG4gICAgVW5sb2FkR3VhcmQsIExvY2FsZSwgTWVudSwgVGhlbWUsIFVzZXIsIFN0YXR1cywgVXJsUGFyYW1cclxufTtcclxuY29uc3QgZXJyb3JzID0geyBOYXZpZ2F0aW9uQmxvY2tlZCB9O1xyXG5jb25zdCB3ID0gd2luZG93O1xyXG5pZiAoIXcuUHJvbWlzZSkge1xyXG4gICAgdy5Qcm9taXNlID0gdy53ZWJpeC5wcm9taXNlO1xyXG59XG5cbmV4cG9ydCB7IHBsdWdpbnMsIGVycm9ycywgSmV0QXBwLCBKZXRWaWV3LCBIYXNoUm91dGVyLCBTdG9yZVJvdXRlciwgVXJsUm91dGVyLCBFbXB0eVJvdXRlciwgU3ViUm91dGVyIH07XG4vLyMgc291cmNlTWFwcGluZ1VSTD1qZXQuanMubWFwXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9ub2RlX21vZHVsZXMvd2ViaXgtamV0L2Rpc3QvZXM2L2pldC5qcyIsImltcG9ydCB7IEpldFZpZXcgfSBmcm9tIFwid2ViaXgtamV0XCI7XG5pbXBvcnQgeyBwYWNrYWdlcyB9IGZyb20gXCIuLi8uLi9zZXJ2aWNlcy9wYWNrYWdlc1wiO1xuXG5jb25zdCBTVEFUVVNfSU5TVEFMTEVEID0gMztcblxuZXhwb3J0IGNsYXNzIEV4dGVybmFsVmlldyBleHRlbmRzIEpldFZpZXcge1xuICAgIGNvbnN0cnVjdG9yKGFwcCwgbmFtZSwgdGFyZ2V0VXJsLCByZXF1aXJlZFBhY2thZ2VzKSB7XG4gICAgICAgIHN1cGVyKGFwcCwgbmFtZSk7XG5cbiAgICAgICAgdGhpcy50YXJnZXRVcmwgPSB0YXJnZXRVcmwgfHwgXCIvXCI7XG4gICAgICAgIHRoaXMucmVxdWlyZWRQYWNrYWdlcyA9IHJlcXVpcmVkUGFja2FnZXMgfHwge307IC8vIHJlcXVpcmVkIHBhY2thZ2VzIGFzIG5hbWU6IGdpdF91cmwgcGFpcnNcbiAgICB9XG5cbiAgICBjb25maWcoKSB7XG4gICAgICAgIGNvbnN0IHNlbGYgPSB0aGlzO1xuICAgICAgICBjb25zdCBpZnJhbWUgPSB7XG4gICAgICAgICAgICB2aWV3OiBcImlmcmFtZVwiLFxuICAgICAgICAgICAgbG9jYWxJZDogXCJpZnJhbWUtZXh0ZXJuYWxcIixcbiAgICAgICAgICAgIG9uOiB7XG4gICAgICAgICAgICAgICAgb25BZnRlckxvYWQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuaGlkZVByb2dyZXNzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmhpZGVQcm9ncmVzcygpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZW5hYmxlKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuXG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICByb3dzOiBbe1xuICAgICAgICAgICAgICAgIGxvY2FsSWQ6IFwiaW5zdGFsbC1wYWNrYWdlc1wiLFxuICAgICAgICAgICAgICAgIGhpZGRlbjogdHJ1ZSxcbiAgICAgICAgICAgICAgICBjb2xzOiBbXG4gICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxvY2FsSWQ6IFwicmVxdWlyZWRfcGFja2FnZXNfZGl2XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICB2aWV3OiBcInRlbXBsYXRlXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBhdXRvaGVpZ2h0OiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgICAgICAgICB2aWV3OiBcImJ1dHRvblwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgbG9jYWxJZDogXCJpbnN0YWxsX2J0blwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU6IFwiSW5zdGFsbCByZXF1aXJlZCBwYWNrYWdlc1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgY3NzOiBcIndlYml4X3ByaW1hcnlcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIGhlaWdodDogNTAsXG4gICAgICAgICAgICAgICAgICAgICAgICBjbGljazogc2VsZi5pbnN0YWxsUmVxdWlyZWRQYWNrYWdlcy5iaW5kKHNlbGYpXG4gICAgICAgICAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZpZXc6IFwiYnV0dG9uXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBsb2NhbElkOiBcImdvX3RvX3BhY2thZ2VzX2J0blwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU6IFwiR28gdG8gcGFja2FnZXMgYW5kIGluc3RhbGwgdGhlbSBtYW51YWxseVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgY3NzOiBcIndlYml4X3ByaW1hcnlcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIGhlaWdodDogNTAsXG4gICAgICAgICAgICAgICAgICAgICAgICBjbGljazogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuJHNjb3BlLnNob3coXCIvbWFpbi9wYWNrYWdlc1wiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgIH0sIGlmcmFtZV1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIGluc3RhbGxSZXF1aXJlZFBhY2thZ2VzKCkge1xuICAgICAgICBsZXQgcHJvbWlzZXMgPSBPYmplY3QudmFsdWVzKHRoaXMucGFja2FnZXNUb0luc3RhbGwpLm1hcCgocGF0aCkgPT4ge1xuICAgICAgICAgICAgLy8gYWRkIGJ5IGdpdCB1cmxcbiAgICAgICAgICAgIHJldHVybiBwYWNrYWdlcy5hZGQobnVsbCwgcGF0aCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHRoaXMuaW5zdGFsbEJ1dHRvbi5kaXNhYmxlKCk7XG4gICAgICAgIFByb21pc2UuYWxsKHByb21pc2VzKS50aGVuKCgpID0+IHtcbiAgICAgICAgICAgIHdlYml4Lm1lc3NhZ2UoeyB0eXBlOiBcInN1Y2Nlc3NcIiwgdGV4dDogXCJBbGwgcmVxdWlyZWQgcGFja2FnZXMgaW5zdGFsbGVkIHN1Y2Nlc3NmdWxseSwgcGFnZSB3aWxsIGJlIHJlbG9hZGVkIGluIDIgc2Vjb25kc1wiIH0pO1xuICAgICAgICAgICAgc2V0SW50ZXJ2YWwoKCkgPT4gd2luZG93LmxvY2F0aW9uLnJlbG9hZCh0cnVlKSwgMjAwMCk7XG4gICAgICAgIH0pLmNhdGNoKCgpID0+IHtcbiAgICAgICAgICAgIHdlYml4Lm1lc3NhZ2UoeyB0eXBlOiBcImVycm9yXCIsIHRleHQ6IFwiQW4gZXJyb3Igb2NjdXJyZWQsIHBsZWFzZSB0cnkgaW5zdGFsbGluZyBmcm9tIHBhY2thZ2VzIGZvciBtb3JlIGRldGFpbHNcIiB9KTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgc2hvd0lmcmFtZSgpIHtcbiAgICAgICAgdGhpcy5leHRlcm5hbElmcmFtZS5zaG93KCk7XG4gICAgICAgIHRoaXMuZXh0ZXJuYWxJZnJhbWUuc2hvd1Byb2dyZXNzKHsgdHlwZTogXCJpY29uXCIgfSk7XG4gICAgICAgIHRoaXMuZXh0ZXJuYWxJZnJhbWUubG9hZCh0aGlzLnRhcmdldFVybCk7XG4gICAgfVxuXG4gICAgaW5pdCh2aWV3KSB7XG4gICAgICAgIHRoaXMuZXh0ZXJuYWxJZnJhbWUgPSB0aGlzLiQkKFwiaWZyYW1lLWV4dGVybmFsXCIpO1xuICAgICAgICB0aGlzLmV4dGVybmFsSWZyYW1lLmRpc2FibGUoKTtcbiAgICAgICAgd2ViaXguZXh0ZW5kKHRoaXMuZXh0ZXJuYWxJZnJhbWUsIHdlYml4LlByb2dyZXNzQmFyKTtcblxuICAgICAgICB0aGlzLnBhY2thZ2VOYW1lcyA9IE9iamVjdC5rZXlzKHRoaXMucmVxdWlyZWRQYWNrYWdlcyk7IC8vIG9ubHkgbmFtZXNcblxuICAgICAgICBpZiAoIXRoaXMucGFja2FnZU5hbWVzLmxlbmd0aCkge1xuICAgICAgICAgICAgdGhpcy5zaG93SWZyYW1lKCk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnJlcXVpcmVkUGFja2FnZXNEaXYgPSB0aGlzLiQkKFwicmVxdWlyZWRfcGFja2FnZXNfZGl2XCIpO1xuICAgICAgICB0aGlzLmluc3RhbGxQYWNrYWdlQ29udGFpbmVyID0gdGhpcy4kJChcImluc3RhbGwtcGFja2FnZXNcIik7XG4gICAgICAgIHRoaXMuaW5zdGFsbEJ1dHRvbiA9IHRoaXMuJCQoXCJpbnN0YWxsX2J0blwiKTtcblxuICAgICAgICAvLyBjaGVjayB3aGljaCBwYWNrYWdlcyB0byBpbnN0YWxsXG4gICAgICAgIHRoaXMucGFja2FnZXNUb0luc3RhbGwgPSB7fTtcbiAgICAgICAgLy8gdHJ5IHRvIGdldCBpbmZvIGFib3V0IHJlcXVpcmVkIHBhY2thZ2VzXG4gICAgICAgIC8vIGlmIGFueSBpcyBhbHJlYWR5IHJlZ2lzdGVyZWQgYW5kIGluc3RhbGxlZCwgdGhlbiBqdXN0IGlnbm9yZSBpdFxuICAgICAgICBwYWNrYWdlcy5nZXRTdGF0dXModGhpcy5wYWNrYWdlTmFtZXMpLnRoZW4oZGF0YSA9PiB7XG4gICAgICAgICAgICBjb25zdCBwYWNrYWdlU3RhdGVzID0gZGF0YS5qc29uKCk7XG5cbiAgICAgICAgICAgIC8vIG5vdyBnbyBvdmVyIHJlcXVpcmVkIHBhY2thZ2VzXG4gICAgICAgICAgICBmb3IgKGxldCBuYW1lIG9mIHRoaXMucGFja2FnZU5hbWVzKSB7XG4gICAgICAgICAgICAgICAgLy8gY2hlY2sgaWYgYSByZXF1aXJlZCBwYWNrYWdlIGlzIHJlZ2lzdGVyZWQgYW5kIGluc3RhbGxlZFxuICAgICAgICAgICAgICAgIGlmIChwYWNrYWdlU3RhdGVzW25hbWVdID09IFNUQVRVU19JTlNUQUxMRUQpIHtcbiAgICAgICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgdGhpcy5wYWNrYWdlc1RvSW5zdGFsbFtuYW1lXSA9IHRoaXMucmVxdWlyZWRQYWNrYWdlc1tuYW1lXTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy8gY2hlY2sgcGFja2FnZXMgdG8gYmUgaW5zdGFsbGVkIGFnYWluIGlmIHN0aWxsIG5lZWQgdG8gaW5zdGFsbCBhbnkgb2YgdGhlbVxuICAgICAgICAgICAgY29uc3QgcGFja2FnZU5hbWVzVG9JbnN0YWxsID0gT2JqZWN0LmtleXModGhpcy5wYWNrYWdlc1RvSW5zdGFsbCk7XG4gICAgICAgICAgICBpZiAocGFja2FnZU5hbWVzVG9JbnN0YWxsLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgIHRoaXMuaW5zdGFsbFBhY2thZ2VDb250YWluZXIuc2hvdygpO1xuICAgICAgICAgICAgICAgIHRoaXMuZXh0ZXJuYWxJZnJhbWUuaGlkZSgpO1xuXG4gICAgICAgICAgICAgICAgY29uc3QgbmFtZXMgPSBwYWNrYWdlTmFtZXNUb0luc3RhbGwuam9pbihcIiwgXCIpO1xuICAgICAgICAgICAgICAgIHRoaXMucmVxdWlyZWRQYWNrYWdlc0Rpdi5zZXRIVE1MKFxuICAgICAgICAgICAgICAgICAgICBgPGRpdiBzdHlsZT0nd2lkdGg6YXV0bzt0ZXh0LWFsaWduOmNlbnRlcic+PGgzPllvdSBuZWVkIHRvIGluc3RhbGwgdGhlIGZvbGxvd2luZyByZXF1aXJlZCBwYWNrYWdlczogJHtuYW1lc308aDMvPjwvZGl2PmBcbiAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLmluc3RhbGxQYWNrYWdlQ29udGFpbmVyLmhpZGUoKTtcbiAgICAgICAgICAgICAgICB0aGlzLnNob3dJZnJhbWUoKVxuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG5cbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NvdXJjZXMvdmlld3MvZXh0ZXJuYWwvaW5kZXguanMiLCJjb25zdCBhamF4ID0gd2ViaXguYWpheCgpLmhlYWRlcnMoeyBcIkNvbnRlbnQtVHlwZVwiOiBcImFwcGxpY2F0aW9uL2pzb25cIiB9KTtcblxuZXhwb3J0IGNsYXNzIFNlcnZpY2Uge1xuICAgIGNvbnN0cnVjdG9yKGJhc2VVcmwpIHtcbiAgICAgICAgdGhpcy5iYXNlVXJsID0gYmFzZVVybDtcbiAgICB9XG5cbiAgICBqb2luVXJsKHVybCkge1xuICAgICAgICBpZiAodGhpcy5iYXNlVXJsKSB7XG4gICAgICAgICAgICByZXR1cm4gYCR7dGhpcy5iYXNlVXJsfS8ke3VybH1gO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB1cmw7XG4gICAgfVxuXG4gICAgY2FsbChtZXRob2QsIHVybCwgYXJncykge1xuICAgICAgICBtZXRob2QgPSBtZXRob2QudG9Mb3dlckNhc2UoKTtcbiAgICAgICAgdXJsID0gdGhpcy5qb2luVXJsKHVybCk7XG5cbiAgICAgICAgaWYgKGFyZ3MpIHtcbiAgICAgICAgICAgIGFyZ3MgPSB7IGFyZ3M6IGFyZ3MgfTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGFyZ3MgPSB7fTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChtZXRob2QgPT09IFwiZ2V0XCIpIHtcbiAgICAgICAgICAgIHJldHVybiBhamF4LmdldCh1cmwsIGFyZ3MpO1xuICAgICAgICB9IGVsc2UgaWYgKG1ldGhvZCA9PSBcInBvc3RcIikge1xuICAgICAgICAgICAgcmV0dXJuIGFqYXgucG9zdCh1cmwsIGFyZ3MpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhyb3cgVmFsdWVFcnJvcihgJHttZXRob2R9IGlzIG5vdCBzdXBwb3J0ZWRgKTtcbiAgICB9XG5cbiAgICBnZXRDYWxsKHVybCwgYXJncykge1xuICAgICAgICByZXR1cm4gdGhpcy5jYWxsKFwiZ2V0XCIsIHVybCwgYXJncyk7XG4gICAgfVxuXG4gICAgcG9zdENhbGwodXJsLCBhcmdzKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmNhbGwoXCJwb3N0XCIsIHVybCwgYXJncyk7XG4gICAgfVxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc291cmNlcy9jb21tb24vYXBpLmpzIiwiaW1wb3J0IHsgSmV0VmlldyB9IGZyb20gXCJ3ZWJpeC1qZXRcIjtcblxuaW1wb3J0IHsgYW5zaVVwIH0gZnJvbSBcIi4uLy4uL2NvbW1vbi9jb2xvcnNcIjtcblxuZXhwb3J0IGNsYXNzIEVycm9yVmlldyBleHRlbmRzIEpldFZpZXcge1xuICAgIGNvbmZpZygpIHtcbiAgICAgICAgY29uc3QgbWVzc2FnZSA9IHtcbiAgICAgICAgICAgIHZpZXc6IFwidGVtcGxhdGVcIixcbiAgICAgICAgICAgIGlkOiBcImVycm9yX3RlbXBsYXRlXCIsXG4gICAgICAgICAgICB0ZW1wbGF0ZTogXCJcIixcbiAgICAgICAgICAgIHNjcm9sbDogXCJ4eVwiXG4gICAgICAgIH07XG5cbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHZpZXc6IFwid2luZG93XCIsXG4gICAgICAgICAgICBoZWFkOiBcIkVycm9yXCIsXG4gICAgICAgICAgICBtb2RhbDogdHJ1ZSxcbiAgICAgICAgICAgIHdpZHRoOiAxMTAwLFxuICAgICAgICAgICAgaGVpZ2h0OiA3MDAsXG4gICAgICAgICAgICBwb3NpdGlvbjogXCJjZW50ZXJcIixcbiAgICAgICAgICAgIGJvZHk6IHtcbiAgICAgICAgICAgICAgICByb3dzOiBbXG4gICAgICAgICAgICAgICAgICAgIG1lc3NhZ2UsXG4gICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZpZXc6IFwiYnV0dG9uXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZTogXCJPS1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgY3NzOiBcIndlYml4X3ByaW1hcnlcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIGNsaWNrOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5nZXRUb3BQYXJlbnRWaWV3KCkuaGlkZSgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgaW5pdCgpIHtcbiAgICAgICAgdGhpcy5tZXNzYWdlID0gJCQoXCJlcnJvcl90ZW1wbGF0ZVwiKTtcbiAgICB9XG5cbiAgICBzaG93RXJyb3IobWVzc2FnZSwgaGVhZCkge1xuICAgICAgICB0aGlzLm1lc3NhZ2Uuc2V0SFRNTChgPHA+JHthbnNpVXAuYW5zaV90b19odG1sKG1lc3NhZ2UpfTwvcD5gKTtcbiAgICAgICAgaWYgKGhlYWQpIHtcbiAgICAgICAgICAgIHRoaXMubWVzc2FnZS5nZXRIZWFkKCkuc2V0SFRNTChoZWFkKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuZ2V0Um9vdCgpLnNob3coKTtcbiAgICB9XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zb3VyY2VzL3ZpZXdzL2Vycm9ycy9kaWFsb2cuanMiLCJcbmV4cG9ydCBjb25zdCBNQVhfTVNHX0xFTiA9IDEwMDtcbmV4cG9ydCBjb25zdCBMRVZFTFMgPSB7XG4gICAgNTA6IFwiQ1JJVElDQUxcIixcbiAgICA0MDogXCJFUlJPUlwiLFxuICAgIDMwOiBcIldBUk5JTkdcIixcbiAgICAyMDogXCJJTkZPXCIsXG4gICAgMTU6IFwiU1RET1VUXCIsXG4gICAgMTA6IFwiREVCVUdcIlxufTtcblxuZXhwb3J0IGNvbnN0IFNUQVRFUyA9IFtcbiAgICAnQ0xPU0VEJyxcbiAgICAnTkVXJyxcbiAgICAnT1BFTicsXG4gICAgJ1JFT1BFTidcbl1cblxuZXhwb3J0IGNvbnN0IFRZUEVTID0gW1xuICAgICdCVUcnLFxuICAgICdRVUVTVElPTicsXG4gICAgJ0VWRU5UX1NZU1RFTScsXG4gICAgJ0VWRU5UX01PTklUT1InLFxuICAgICdFVkVOVF9PUEVSQVRPUicsXG5dXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zb3VyY2VzL3ZpZXdzL2FsZXJ0cy9kYXRhLmpzIiwiZXhwb3J0IGNvbnN0IGRhdGVGb3JtYXQgPSBcIiVZLSVtLSVkICVHOiVpOiVzXCI7XG5cbmV4cG9ydCBjb25zdCB3ZWJpeERhdGVGb3JtYXR0ZXIgPSB3ZWJpeC5EYXRlLmRhdGVUb1N0cihkYXRlRm9ybWF0KTtcblxuZXhwb3J0IGNvbnN0IGRhdGVGb3JtYXR0ZXIgPSBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAvLyBmb3JtYXQgZXBvY2ggdGltZXN0YW1wc1xuICAgIGlmICh2YWx1ZSBpbnN0YW5jZW9mIFN0cmluZykge1xuICAgICAgICB2YWx1ZSA9IHBhcnNlSW50KHZhbHVlKTtcbiAgICB9XG5cbiAgICByZXR1cm4gd2ViaXhEYXRlRm9ybWF0dGVyKG5ldyBEYXRlKHZhbHVlICogMTAwMCkpO1xufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc291cmNlcy9jb21tb24vZm9ybWF0dGVycy5qcyIsImltcG9ydCB7IFNlcnZpY2UgfSBmcm9tIFwiLi4vY29tbW9uL2FwaVwiO1xuXG5jb25zdCBCQVNFX1VSTCA9IFwiL3plcm9ib3QvYWRtaW4vYWN0b3JzL2hlYWx0aFwiO1xuXG5jbGFzcyBIZWFsdGhTZXJ2aWNlIGV4dGVuZHMgU2VydmljZSB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHN1cGVyKEJBU0VfVVJMKTtcbiAgICB9XG5cbiAgICBnZXREaXNrU3BhY2UoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmdldENhbGwoXCJnZXRfZGlza19zcGFjZVwiKTtcbiAgICB9XG5cbiAgICBnZXRIZWFsdGgoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmdldENhbGwoXCJoZWFsdGhcIik7XG4gICAgfVxuXG4gICAgZ2V0SWRlbnRpdHkoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmdldENhbGwoXCJnZXRfaWRlbnRpdHlcIik7XG4gICAgfVxuXG4gICAgZ2V0TmV0d29ya0luZm8oKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmdldENhbGwoXCJuZXR3b3JrX2luZm9cIik7XG4gICAgfVxuXG4gICAgZ2V0SnN4VmVyc2lvbigpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0Q2FsbChcImpzeF92ZXJzaW9uXCIpO1xuICAgIH1cblxuICAgIGdldFJ1bm5pbmdQcm9jZXNzZXMoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmdldENhbGwoXCJnZXRfcnVubmluZ19wcm9jZXNzZXNcIik7XG4gICAgfVxuXG4gICAgZ2V0UnVubmluZ1BvcnRzKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5nZXRDYWxsKFwiZ2V0X3J1bm5pbmdfcG9ydHNcIik7XG4gICAgfVxufVxuXG5leHBvcnQgY29uc3QgaGVhbHRoID0gbmV3IEhlYWx0aFNlcnZpY2UoKTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NvdXJjZXMvc2VydmljZXMvaGVhbHRoLmpzIiwiaW1wb3J0IHsgSmV0VmlldyB9IGZyb20gXCJ3ZWJpeC1qZXRcIjtcblxuaW1wb3J0IHsgYW5zaVVwIH0gZnJvbSBcIi4uLy4uL2NvbW1vbi9jb2xvcnNcIjtcbmltcG9ydCB7IExFVkVMUywgTUFYX01TR19MRU4sIFNUQVRFUywgVFlQRVMgfSBmcm9tIFwiLi9kYXRhXCI7XG5pbXBvcnQgeyBkYXRlRm9ybWF0dGVyIH0gZnJvbSBcIi4uLy4uL2NvbW1vbi9mb3JtYXR0ZXJzXCI7XG5pbXBvcnQgeyBhbGVydHMgfSBmcm9tIFwiLi4vLi4vc2VydmljZXMvYWxlcnRzXCI7XG5cbmltcG9ydCBBbGVydFZpZXcgZnJvbSBcIi4vYWxlcnRcIjtcbmltcG9ydCB7IGNyZWF0ZUZpbHRlck9wdGlvbnMgfSBmcm9tIFwiLi4vLi4vY29tbW9uL2ZpbHRlcnNcIjtcblxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBBbGVydHNWaWV3IGV4dGVuZHMgSmV0VmlldyB7XG4gICAgY29uZmlnKCkge1xuICAgICAgICBjb25zdCB2aWV3ID0ge1xuICAgICAgICAgICAgcm93czogW1xuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgdmlldzogXCJkYXRhdGFibGVcIixcbiAgICAgICAgICAgICAgICAgICAgaWQ6IFwiYWxlcnRzX3RhYmxlXCIsXG4gICAgICAgICAgICAgICAgICAgIHJlc2l6ZUNvbHVtbjogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgc2VsZWN0OiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICBtdWx0aXNlbGVjdDogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgc2Nyb2xsOiBcInh5XCIsXG4gICAgICAgICAgICAgICAgICAgIGNzczogXCJ3ZWJpeF9oZWFkZXJfYm9yZGVyIHdlYml4X2RhdGFfYm9yZGVyXCIsXG4gICAgICAgICAgICAgICAgICAgIGNvbHVtbnM6IFt7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZDogXCJpbmRleFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgaGVhZGVyOiBcIiNcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIHNvcnQ6IFwiaW50XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBhdXRvd2lkdGg6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlkOiBcImFsZXJ0X3R5cGVcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIHNvcnQ6IFwiaW50XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBmb3JtYXQ6ICh2YWx1ZSkgPT4gVFlQRVNbdmFsdWVdLFxuICAgICAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDE1MCxcbiAgICAgICAgICAgICAgICAgICAgICAgIGhlYWRlcjogW1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiVHlwZVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29udGVudDogXCJzZWxlY3RGaWx0ZXJcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb3B0aW9uczogY3JlYXRlRmlsdGVyT3B0aW9ucyhUWVBFUylcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZDogXCJjb3VudFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgaGVhZGVyOiBcIkNvdW50XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBzb3J0OiBcImludFwiXG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlkOiBcInN0YXR1c1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgc29ydDogXCJpbnRcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvcm1hdDogKHZhbHVlKSA9PiBTVEFURVNbdmFsdWVdLFxuICAgICAgICAgICAgICAgICAgICAgICAgaGVhZGVyOiBbXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJTdGF0dXNcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRlbnQ6IFwic2VsZWN0RmlsdGVyXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9wdGlvbnM6IGNyZWF0ZUZpbHRlck9wdGlvbnMoU1RBVEVTKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlkOiBcImxldmVsXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBzb3J0OiBcImludFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgZm9ybWF0OiAodmFsdWUpID0+IExFVkVMU1t2YWx1ZV0sXG4gICAgICAgICAgICAgICAgICAgICAgICBoZWFkZXI6IFtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIkxldmVsXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb250ZW50OiBcInNlbGVjdEZpbHRlclwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvcHRpb25zOiBjcmVhdGVGaWx0ZXJPcHRpb25zKExFVkVMUylcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZDogXCJjYXRcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIGhlYWRlcjogW1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiQ2F0ZWdvcnlcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRlbnQ6IFwidGV4dEZpbHRlclwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHNvcnQ6IFwic3RyaW5nXCJcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWQ6IFwidGltZV9maXJzdFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgaGVhZGVyOiBcIkZpcnN0IHRpbWVcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIHNvcnQ6IFwiZGF0ZVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgZm9ybWF0OiBkYXRlRm9ybWF0dGVyLFxuICAgICAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDIwMFxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZDogXCJ0aW1lX2xhc3RcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIGhlYWRlcjogXCJMYXN0IHRpbWVcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIHNvcnQ6IFwiZGF0ZVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgZm9ybWF0OiBkYXRlRm9ybWF0dGVyLFxuICAgICAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDIwMFxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZDogXCJtZXNzYWdlXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBoZWFkZXI6IFtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIk1lc3NhZ2VcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRlbnQ6IFwidGV4dEZpbHRlclwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgICAgICAgICBzb3J0OiBcInN0clwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgZmlsbHNwYWNlOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgZm9ybWF0OiBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodmFsdWUubGVuZ3RoID4gTUFYX01TR19MRU4pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWUgPSB2YWx1ZS5zdWJzdHIoMCwgTUFYX01TR19MRU4pICsgJy4uLic7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBhbnNpVXAuYW5zaV90b19odG1sKHZhbHVlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICAgICAgYXV0b0NvbmZpZzogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgLy8gdXJsOntcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgICRwcm94eTp0cnVlLFxuICAgICAgICAgICAgICAgICAgICAvLyAgICAgbG9hZDogZnVuY3Rpb24odmlldywgcGFyYW1zKXtcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgICBsZXQgZGF0YSA9IHdlYml4LmFqYXgoXCIvemVyb2JvdC9hbGVydGEvYWN0b3JzL2FsZXJ0YS9saXN0X2FsZXJ0c1wiKTtcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgICByZXR1cm4gZGF0YTtcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIC8vIH1cbiAgICAgICAgICAgICAgICAgICAgc2NoZW1lOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAkaW5pdDogZnVuY3Rpb24gKG9iaikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9iai5pbmRleCA9IHRoaXMuY291bnQoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgJHN1YnZpZXc6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgIHBvcHVwOiB0cnVlXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgXVxuICAgICAgICB9O1xuXG4gICAgICAgIHJldHVybiB2aWV3O1xuICAgIH1cblxuICAgIGRlbGV0ZUl0ZW0ob2JqZWN0cykge1xuICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XG5cbiAgICAgICAgbGV0IGl0ZW1zID0gW10sXG4gICAgICAgICAgICBpZHMgPSBbXSxcbiAgICAgICAgICAgIGluZGV4ZXMgPSBbXTtcblxuICAgICAgICBmb3IgKGxldCBvYmogb2Ygb2JqZWN0cykge1xuICAgICAgICAgICAgaWRzLnB1c2gob2JqLmlkKTtcbiAgICAgICAgICAgIGxldCBpdGVtID0gc2VsZi50YWJsZS5nZXRJdGVtKG9iai5pZCk7XG4gICAgICAgICAgICBpdGVtcy5wdXNoKGl0ZW0pXG4gICAgICAgICAgICBpbmRleGVzLnB1c2goaXRlbS5pbmRleCk7XG4gICAgICAgIH1cblxuICAgICAgICB3ZWJpeC5jb25maXJtKHtcbiAgICAgICAgICAgIHRpdGxlOiBcIkRlbGV0ZSBhbGVydHNcIixcbiAgICAgICAgICAgIG9rOiBcIlllc1wiLFxuICAgICAgICAgICAgY2FuY2VsOiBcIk5vXCIsXG4gICAgICAgICAgICB0ZXh0OiBgRGVsZXRlIGFsZXJ0IGl0ZW0ocykgb2YgJHtpbmRleGVzLmpvaW4oXCIsIFwiKX1gXG4gICAgICAgIH0pLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgaWRlbnRpZmllcnMgPSBpdGVtcy5tYXAoKGl0ZW0pID0+IGl0ZW0uaWRlbnRpZmllcik7XG4gICAgICAgICAgICBzZWxmLnRhYmxlLnNob3dQcm9ncmVzcyh7XG4gICAgICAgICAgICAgICAgaGlkZTogZmFsc2VcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICBhbGVydHMuZGVsZXRlKGlkZW50aWZpZXJzKS50aGVuKCgpID0+IHtcbiAgICAgICAgICAgICAgICBzZWxmLnRhYmxlLnJlbW92ZShpZHMpXG4gICAgICAgICAgICAgICAgc2VsZi50YWJsZS5zaG93UHJvZ3Jlc3Moe1xuICAgICAgICAgICAgICAgICAgICBoaWRlOiB0cnVlXG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICB2aWV3SXRlbShpZCkge1xuICAgICAgICB0aGlzLmFsZXJ0Vmlldy5zaG93Rm9yKHRoaXMudGFibGUuZ2V0SXRlbShpZCkpO1xuICAgIH1cblxuICAgIGluaXQoKSB7XG4gICAgICAgIC8vIHRoaXMudXNlKHBsdWdpbnMuUHJvZ3Jlc3NCYXIsIFwicHJvZ3Jlc3NcIik7XG4gICAgICAgIHZhciBzZWxmID0gdGhpcztcbiAgICAgICAgc2VsZi50YWJsZSA9ICQkKFwiYWxlcnRzX3RhYmxlXCIpO1xuICAgICAgICBzZWxmLmFsZXJ0VmlldyA9IHNlbGYudWkoQWxlcnRWaWV3KTtcblxuICAgICAgICB3ZWJpeC5leHRlbmQoc2VsZi50YWJsZSwgd2ViaXguUHJvZ3Jlc3NCYXIpO1xuICAgICAgICB3ZWJpeC5yZWFkeShmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBzZWxmLnRhYmxlLmNsZWFyQWxsKCk7XG4gICAgICAgICAgICBzZWxmLnRhYmxlLnNob3dQcm9ncmVzcyh7XG4gICAgICAgICAgICAgICAgaGlkZTogZmFsc2VcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgYWxlcnRzLmxpc3QoKS50aGVuKGRhdGEgPT4ge1xuICAgICAgICAgICAgICAgIGxldCBhbGVydHMgPSBkYXRhLmpzb24oKS5hbGVydHM7XG4gICAgICAgICAgICAgICAgc2VsZi50YWJsZS5wYXJzZShhbGVydHMpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHdlYml4LnVpKHtcbiAgICAgICAgICAgIHZpZXc6IFwiY29udGV4dG1lbnVcIixcbiAgICAgICAgICAgIGlkOiBcImFsZXJ0c19jbVwiLFxuICAgICAgICAgICAgZGF0YTogW1wiVmlld1wiLCBcIkRlbGV0ZVwiXVxuICAgICAgICB9KS5hdHRhY2hUbyhzZWxmLnRhYmxlKTtcblxuXG4gICAgICAgIHNlbGYudGFibGUuYXR0YWNoRXZlbnQoXCJvbkl0ZW1EYmxDbGlja1wiLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBzZWxmLnZpZXdJdGVtKHNlbGYudGFibGUuZ2V0U2VsZWN0ZWRJZCgpKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgJCQoXCJhbGVydHNfY21cIikuYXR0YWNoRXZlbnQoXCJvbk1lbnVJdGVtQ2xpY2tcIiwgZnVuY3Rpb24gKGlkKSB7XG4gICAgICAgICAgICBpZiAoaWQgPT0gXCJEZWxldGVcIikge1xuICAgICAgICAgICAgICAgIHNlbGYuZGVsZXRlSXRlbShzZWxmLnRhYmxlLmdldFNlbGVjdGVkSWQodHJ1ZSkpO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChpZCA9PSBcIlZpZXdcIikge1xuICAgICAgICAgICAgICAgIHNlbGYudmlld0l0ZW0oc2VsZi50YWJsZS5nZXRTZWxlY3RlZElkKCkpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zb3VyY2VzL3ZpZXdzL2FsZXJ0cy9pbmRleC5qcyIsImltcG9ydCBBbnNpVXAgZnJvbSBcImFuc2lfdXBcIjtcblxuZXhwb3J0IGNvbnN0IGFuc2lVcCA9IG5ldyBBbnNpVXAoKTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NvdXJjZXMvY29tbW9uL2NvbG9ycy5qcyIsImltcG9ydCB7IEV4dGVybmFsVmlldyB9IGZyb20gXCIuLi9leHRlcm5hbFwiO1xuaW1wb3J0IHsgYWRtaW4gfSBmcm9tIFwiLi4vLi4vc2VydmljZXMvYWRtaW5cIjtcblxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDYXBhY2l0eVZpZXcgZXh0ZW5kcyBFeHRlcm5hbFZpZXcge1xuICAgIGNvbnN0cnVjdG9yKGFwcCwgbmFtZSkge1xuICAgICAgICBzdXBlcihhcHAsIG5hbWUpO1xuICAgIH1cblxuICAgIHNob3dJZnJhbWUoKSB7XG4gICAgICAgIGFkbWluLmdldF9leHBsb3JlcigpLnRoZW4oKGRhdGEpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGV4cGxvcmVyID0gZGF0YS5qc29uKCk7XG4gICAgICAgICAgICBsZXQgdXJsID0gZXhwbG9yZXIudXJsO1xuXG4gICAgICAgICAgICBpZiAoIXVybC5zdGFydHNXaXRoKCdodHRwJykpIHtcbiAgICAgICAgICAgICAgICB1cmwgPSBgaHR0cHM6Ly8ke3VybH1gO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB0aGlzLmV4dGVybmFsSWZyYW1lLnNob3coKTtcbiAgICAgICAgICAgIHRoaXMuZXh0ZXJuYWxJZnJhbWUuc2hvd1Byb2dyZXNzKHsgdHlwZTogXCJpY29uXCIgfSk7XG4gICAgICAgICAgICB0aGlzLmV4dGVybmFsSWZyYW1lLmxvYWQodXJsKTtcbiAgICAgICAgfSlcbiAgICB9XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zb3VyY2VzL3ZpZXdzL2NhcGFjaXR5L2luZGV4LmpzIiwiaW1wb3J0IHsgSmV0VmlldyB9IGZyb20gXCJ3ZWJpeC1qZXRcIjtcblxuaW1wb3J0IHsgRXJyb3JWaWV3IH0gZnJvbSBcIi4uL2Vycm9ycy9kaWFsb2dcIjtcbmltcG9ydCB7IHRhaWdhIH0gZnJvbSBcIi4uLy4uL3NlcnZpY2VzL3RhaWdhXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIENpcmNsZXNWaWV3IGV4dGVuZHMgSmV0VmlldyB7XG4gICAgY29uZmlnKCkge1xuICAgICAgICBjb25zdCBncmlkID0ge1xuICAgICAgICAgICAgcm93czogW3tcbiAgICAgICAgICAgICAgICAvL0hlYWRlclxuICAgICAgICAgICAgICAgIHZpZXc6IFwidGVtcGxhdGVcIixcbiAgICAgICAgICAgICAgICB0eXBlOiBcImhlYWRlclwiLFxuICAgICAgICAgICAgICAgIHRlbXBsYXRlOiBcIkNpcmNsZXNcIixcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7IC8vRGF0YVRhYmxlXG4gICAgICAgICAgICAgICAgdmlldzogXCJkYXRhdGFibGVcIixcbiAgICAgICAgICAgICAgICBpZDogXCJjaXJjbGVzX3RhYmxlXCIsXG4gICAgICAgICAgICAgICAgcmVzaXplQ29sdW1uOiB0cnVlLFxuICAgICAgICAgICAgICAgIHR5cGU6IHtcbiAgICAgICAgICAgICAgICAgICAgaGVpZ2h0OiAyMDAsXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBzY3JvbGw6IFwieHlcIixcbiAgICAgICAgICAgICAgICBhdXRvQ29uZmlnOiB0cnVlLFxuICAgICAgICAgICAgICAgIHZpZXc6IFwiZGF0YXRhYmxlXCIsXG4gICAgICAgICAgICAgICAgc2VsZWN0OiB0cnVlLFxuICAgICAgICAgICAgICAgIGNzczogXCJ3ZWJpeF9oZWFkZXJfYm9yZGVyIHdlYml4X2RhdGFfYm9yZGVyXCIsXG4gICAgICAgICAgICAgICAgb25Db250ZXh0OiB7fSxcbiAgICAgICAgICAgICAgICBjb2x1bW5zOiBbe1xuICAgICAgICAgICAgICAgICAgICBpZDogXCJJRFwiLFxuICAgICAgICAgICAgICAgICAgICBoZWFkZXI6IFwiSURcIixcbiAgICAgICAgICAgICAgICAgICAgc29ydDogXCJpbnRcIixcbiAgICAgICAgICAgICAgICAgICAgYXV0b3dpZHRoOiB0cnVlLFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBpZDogXCJOYW1lXCIsXG4gICAgICAgICAgICAgICAgICAgIGhlYWRlcjogXCJOYW1lXCIsXG4gICAgICAgICAgICAgICAgICAgIHNvcnQ6IFwic3RyaW5nXCIsXG4gICAgICAgICAgICAgICAgICAgIHdpZHRoOiAyMDBcbiAgICAgICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgICAgIGlkOiBcIk93bmVyXCIsXG4gICAgICAgICAgICAgICAgICAgIGhlYWRlcjogW1wiT3duZXJcIiwge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29udGVudDogXCJ0ZXh0RmlsdGVyXCJcbiAgICAgICAgICAgICAgICAgICAgfV0sXG4gICAgICAgICAgICAgICAgICAgIHNvcnQ6IFwic3RyaW5nXCIsXG4gICAgICAgICAgICAgICAgICAgIHdpZHRoOiAyMDBcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgaWQ6IFwiRGVzY3JpcHRpb25cIixcbiAgICAgICAgICAgICAgICAgICAgaGVhZGVyOiBcIkRlc2NyaXB0aW9uXCIsXG4gICAgICAgICAgICAgICAgICAgIHNvcnQ6IFwic3RyaW5nXCIsXG4gICAgICAgICAgICAgICAgICAgIHdpZHRoOiAxMzAwLFxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgIHNjaGVtZToge1xuICAgICAgICAgICAgICAgICAgICAkaW5pdDogZnVuY3Rpb24gKG9iaikge1xuICAgICAgICAgICAgICAgICAgICAgICAgb2JqLmluZGV4ID0gdGhpcy5jb3VudCgpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgXVxuICAgICAgICB9O1xuICAgICAgICByZXR1cm4gZ3JpZDtcbiAgICB9XG5cbiAgICBzaG93RXJyb3IobWVzc2FnZSkge1xuICAgICAgICB0aGlzLmVycm9yVmlldy5zaG93RXJyb3IobWVzc2FnZSk7XG4gICAgfVxuXG4gICAgaW5pdCh2aWV3KSB7XG4gICAgICAgIGNvbnN0IHNlbGYgPSB0aGlzO1xuXG4gICAgICAgIHNlbGYuZXJyb3JWaWV3ID0gdGhpcy51aShFcnJvclZpZXcpO1xuXG4gICAgICAgIGNvbnN0IG1lbnUgPSB3ZWJpeC51aSh7XG4gICAgICAgICAgICB2aWV3OiBcImNvbnRleHRtZW51XCIsXG4gICAgICAgICAgICBpZDogXCJjaXJjbGVzX2NtXCJcbiAgICAgICAgfSk7XG5cbiAgICAgICAgdGhpcy5jaXJjbGVUYWJsZSA9IHRoaXMuJCQoXCJjaXJjbGVzX3RhYmxlXCIpO1xuICAgICAgICB3ZWJpeC5leHRlbmQodGhpcy5jaXJjbGVUYWJsZSwgd2ViaXguUHJvZ3Jlc3NCYXIpO1xuXG5cbiAgICAgICAgd2ViaXguYWpheCgpLmdldChcIi9hdXRoL2F1dGhlbnRpY2F0ZWRcIiwgZnVuY3Rpb24gKGRhdGEpIHtcbiAgICAgICAgICAgIGNvbnN0IGluZm8gPSBKU09OLnBhcnNlKGRhdGEpO1xuICAgICAgICAgICAgY29uc3QgdXNlcm5hbWUgPSBpbmZvLnVzZXJuYW1lLnJlcGxhY2UoXCIuM2JvdFwiLCBcIlwiKVxuICAgICAgICAgICAgdGFpZ2EudXNlckNpcmNsZXModXNlcm5hbWUpLnRoZW4oZGF0YSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3QgY2lyY2xlcyA9IGRhdGEuanNvbigpO1xuICAgICAgICAgICAgICAgIHNlbGYuY2lyY2xlVGFibGUucGFyc2UoY2lyY2xlcyk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG5cblxuICAgIH1cbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NvdXJjZXMvdmlld3MvY2lyY2xlcy9pbmRleC5qcyIsImltcG9ydCB7IEpldFZpZXcgfSBmcm9tIFwid2ViaXgtamV0XCI7XG5cbmltcG9ydCB7IEVycm9yVmlldyB9IGZyb20gXCIuLi9lcnJvcnMvZGlhbG9nXCI7XG5pbXBvcnQgeyB0YWlnYSB9IGZyb20gXCIuLi8uLi9zZXJ2aWNlcy90YWlnYVwiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDaXJjbGVzdG9yaWVzVmlldyBleHRlbmRzIEpldFZpZXcge1xuICAgIGNvbmZpZygpIHtcbiAgICAgICAgY29uc3QgZ3JpZCA9IHtcbiAgICAgICAgICAgIHJvd3M6IFt7XG4gICAgICAgICAgICAgICAgLy9IZWFkZXJcbiAgICAgICAgICAgICAgICB2aWV3OiBcInRlbXBsYXRlXCIsXG4gICAgICAgICAgICAgICAgdHlwZTogXCJoZWFkZXJcIixcbiAgICAgICAgICAgICAgICB0ZW1wbGF0ZTogXCJDaXJjbGVzU3Rvcmllc1wiLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHsgLy9EYXRhVGFibGVcbiAgICAgICAgICAgICAgICB2aWV3OiBcImRhdGF0YWJsZVwiLFxuICAgICAgICAgICAgICAgIGlkOiBcImNpcmNsZXN0b3JpZXNfdGFibGVcIixcbiAgICAgICAgICAgICAgICByZXNpemVDb2x1bW46IHRydWUsXG4gICAgICAgICAgICAgICAgdHlwZToge1xuICAgICAgICAgICAgICAgICAgICBoZWlnaHQ6IDIwMCxcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHNjcm9sbDogXCJ4eVwiLFxuICAgICAgICAgICAgICAgIGF1dG9Db25maWc6IHRydWUsXG4gICAgICAgICAgICAgICAgdmlldzogXCJkYXRhdGFibGVcIixcbiAgICAgICAgICAgICAgICBzZWxlY3Q6IHRydWUsXG4gICAgICAgICAgICAgICAgY3NzOiBcIndlYml4X2hlYWRlcl9ib3JkZXIgd2ViaXhfZGF0YV9ib3JkZXJcIixcbiAgICAgICAgICAgICAgICBvbkNvbnRleHQ6IHt9LFxuICAgICAgICAgICAgICAgIGNvbHVtbnM6IFt7XG4gICAgICAgICAgICAgICAgICAgIGlkOiBcIklEXCIsXG4gICAgICAgICAgICAgICAgICAgIGhlYWRlcjogXCJJRFwiLFxuICAgICAgICAgICAgICAgICAgICBzb3J0OiBcImludFwiLFxuICAgICAgICAgICAgICAgICAgICBhdXRvd2lkdGg6IHRydWUsXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIGlkOiBcIlByb2plY3RcIixcbiAgICAgICAgICAgICAgICAgICAgaGVhZGVyOiBbXCJQcm9qZWN0XCIsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRlbnQ6IFwidGV4dEZpbHRlclwiXG4gICAgICAgICAgICAgICAgICAgIH1dLFxuICAgICAgICAgICAgICAgICAgICBzb3J0OiBcInN0cmluZ1wiLFxuICAgICAgICAgICAgICAgICAgICB3aWR0aDogMzAwXG4gICAgICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgICAgICBpZDogXCJTdWJqZWN0XCIsXG4gICAgICAgICAgICAgICAgICAgIGhlYWRlcjogXCJTdWJqZWN0XCIsXG4gICAgICAgICAgICAgICAgICAgIHNvcnQ6IFwic3RyaW5nXCIsXG4gICAgICAgICAgICAgICAgICAgIHdpZHRoOiA3MDBcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgaWQ6IFwiTWlsZXN0b25lXCIsXG4gICAgICAgICAgICAgICAgICAgIGhlYWRlcjogXCJNaWxlc3RvbmVcIixcbiAgICAgICAgICAgICAgICAgICAgc29ydDogXCJzdHJpbmdcIixcbiAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDIwMCxcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgaWQ6IFwiU3RhdHVzXCIsXG4gICAgICAgICAgICAgICAgICAgIGhlYWRlcjogXCJTdGF0dXNcIixcbiAgICAgICAgICAgICAgICAgICAgc29ydDogXCJzdHJpbmdcIixcbiAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDIwMCxcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgaWQ6IFwiRHVlIGRhdGVcIixcbiAgICAgICAgICAgICAgICAgICAgaGVhZGVyOiBcIkR1ZSBkYXRlXCIsXG4gICAgICAgICAgICAgICAgICAgIHNvcnQ6IFwic3RyaW5nXCIsXG4gICAgICAgICAgICAgICAgICAgIHdpZHRoOiAyMDAsXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgc2NoZW1lOiB7XG4gICAgICAgICAgICAgICAgICAgICRpbml0OiBmdW5jdGlvbiAob2JqKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBvYmouaW5kZXggPSB0aGlzLmNvdW50KCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBdXG4gICAgICAgIH07XG4gICAgICAgIHJldHVybiBncmlkO1xuICAgIH1cblxuICAgIHNob3dFcnJvcihtZXNzYWdlKSB7XG4gICAgICAgIHRoaXMuZXJyb3JWaWV3LnNob3dFcnJvcihtZXNzYWdlKTtcbiAgICB9XG5cbiAgICBpbml0KHZpZXcpIHtcbiAgICAgICAgY29uc3Qgc2VsZiA9IHRoaXM7XG5cbiAgICAgICAgc2VsZi5lcnJvclZpZXcgPSB0aGlzLnVpKEVycm9yVmlldyk7XG5cbiAgICAgICAgY29uc3QgbWVudSA9IHdlYml4LnVpKHtcbiAgICAgICAgICAgIHZpZXc6IFwiY29udGV4dG1lbnVcIixcbiAgICAgICAgICAgIGlkOiBcImNpcmNsZXN0b3JpZXNfY21cIlxuICAgICAgICB9KTtcblxuICAgICAgICB0aGlzLnN0b3JpZXNUYWJsZSA9IHRoaXMuJCQoXCJjaXJjbGVzdG9yaWVzX3RhYmxlXCIpO1xuICAgICAgICB3ZWJpeC5leHRlbmQodGhpcy5zdG9yaWVzVGFibGUsIHdlYml4LlByb2dyZXNzQmFyKTtcblxuICAgICAgICB3ZWJpeC5hamF4KCkuZ2V0KFwiL2F1dGgvYXV0aGVudGljYXRlZFwiLCBmdW5jdGlvbiAoZGF0YSkge1xuICAgICAgICAgICAgY29uc3QgaW5mbyA9IEpTT04ucGFyc2UoZGF0YSk7XG4gICAgICAgICAgICBjb25zdCB1c2VybmFtZSA9IGluZm8udXNlcm5hbWUucmVwbGFjZShcIi4zYm90XCIsIFwiXCIpXG4gICAgICAgICAgICB0YWlnYS51c2VyU3Rvcmllcyh1c2VybmFtZSkudGhlbihkYXRhID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCBzdG9yaWVzID0gZGF0YS5qc29uKCk7XG4gICAgICAgICAgICAgICAgc2VsZi5zdG9yaWVzVGFibGUucGFyc2Uoc3Rvcmllcyk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG5cblxuICAgIH1cbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NvdXJjZXMvdmlld3MvY2lyY2xlc3Rvcmllcy9pbmRleC5qcyIsImltcG9ydCB7IEpldFZpZXcgfSBmcm9tIFwid2ViaXgtamV0XCI7XG5cbmltcG9ydCB7IEVycm9yVmlldyB9IGZyb20gXCIuLi9lcnJvcnMvZGlhbG9nXCI7XG5pbXBvcnQgeyB0YWlnYSB9IGZyb20gXCIuLi8uLi9zZXJ2aWNlcy90YWlnYVwiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDaXJjbGVzVGFza3NWaWV3IGV4dGVuZHMgSmV0VmlldyB7XG4gICAgY29uZmlnKCkge1xuICAgICAgICBjb25zdCBncmlkID0ge1xuICAgICAgICAgICAgcm93czogW3tcbiAgICAgICAgICAgICAgICAvL0hlYWRlclxuICAgICAgICAgICAgICAgIHZpZXc6IFwidGVtcGxhdGVcIixcbiAgICAgICAgICAgICAgICB0eXBlOiBcImhlYWRlclwiLFxuICAgICAgICAgICAgICAgIHRlbXBsYXRlOiBcIkNpcmNsZXNUYXNrc1wiLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHsgLy9EYXRhVGFibGVcbiAgICAgICAgICAgICAgICB2aWV3OiBcImRhdGF0YWJsZVwiLFxuICAgICAgICAgICAgICAgIGlkOiBcImNpcmNsZXN0YXNrc190YWJsZVwiLFxuICAgICAgICAgICAgICAgIHJlc2l6ZUNvbHVtbjogdHJ1ZSxcbiAgICAgICAgICAgICAgICB0eXBlOiB7XG4gICAgICAgICAgICAgICAgICAgIGhlaWdodDogMjAwLFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgc2Nyb2xsOiBcInh5XCIsXG4gICAgICAgICAgICAgICAgYXV0b0NvbmZpZzogdHJ1ZSxcbiAgICAgICAgICAgICAgICB2aWV3OiBcImRhdGF0YWJsZVwiLFxuICAgICAgICAgICAgICAgIHNlbGVjdDogdHJ1ZSxcbiAgICAgICAgICAgICAgICBjc3M6IFwid2ViaXhfaGVhZGVyX2JvcmRlciB3ZWJpeF9kYXRhX2JvcmRlclwiLFxuICAgICAgICAgICAgICAgIG9uQ29udGV4dDoge30sXG4gICAgICAgICAgICAgICAgY29sdW1uczogW3tcbiAgICAgICAgICAgICAgICAgICAgaWQ6IFwiSURcIixcbiAgICAgICAgICAgICAgICAgICAgaGVhZGVyOiBcIklEXCIsXG4gICAgICAgICAgICAgICAgICAgIHNvcnQ6IFwiaW50XCIsXG4gICAgICAgICAgICAgICAgICAgIGF1dG93aWR0aDogdHJ1ZSxcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgaWQ6IFwiUHJvamVjdFwiLFxuICAgICAgICAgICAgICAgICAgICBoZWFkZXI6IFtcIlByb2plY3RcIiwge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29udGVudDogXCJ0ZXh0RmlsdGVyXCJcbiAgICAgICAgICAgICAgICAgICAgfV0sXG4gICAgICAgICAgICAgICAgICAgIHNvcnQ6IFwic3RyaW5nXCIsXG4gICAgICAgICAgICAgICAgICAgIHdpZHRoOiAzMDBcbiAgICAgICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgICAgIGlkOiBcIlN1YmplY3RcIixcbiAgICAgICAgICAgICAgICAgICAgaGVhZGVyOiBcIlN1YmplY3RcIixcbiAgICAgICAgICAgICAgICAgICAgc29ydDogXCJzdHJpbmdcIixcbiAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDgwMFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBpZDogXCJNaWxlc3RvbmVcIixcbiAgICAgICAgICAgICAgICAgICAgaGVhZGVyOiBcIk1pbGVzdG9uZVwiLFxuICAgICAgICAgICAgICAgICAgICBzb3J0OiBcInN0cmluZ1wiLFxuICAgICAgICAgICAgICAgICAgICB3aWR0aDogMjAwLFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBpZDogXCJTdGF0dXNcIixcbiAgICAgICAgICAgICAgICAgICAgaGVhZGVyOiBcIlN0YXR1c1wiLFxuICAgICAgICAgICAgICAgICAgICBzb3J0OiBcInN0cmluZ1wiLFxuICAgICAgICAgICAgICAgICAgICB3aWR0aDogMzAwLFxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgIHNjaGVtZToge1xuICAgICAgICAgICAgICAgICAgICAkaW5pdDogZnVuY3Rpb24gKG9iaikge1xuICAgICAgICAgICAgICAgICAgICAgICAgb2JqLmluZGV4ID0gdGhpcy5jb3VudCgpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgXVxuICAgICAgICB9O1xuICAgICAgICByZXR1cm4gZ3JpZDtcbiAgICB9XG5cbiAgICBzaG93RXJyb3IobWVzc2FnZSkge1xuICAgICAgICB0aGlzLmVycm9yVmlldy5zaG93RXJyb3IobWVzc2FnZSk7XG4gICAgfVxuXG4gICAgaW5pdCh2aWV3KSB7XG4gICAgICAgIGNvbnN0IHNlbGYgPSB0aGlzO1xuXG4gICAgICAgIHNlbGYuZXJyb3JWaWV3ID0gdGhpcy51aShFcnJvclZpZXcpO1xuXG4gICAgICAgIGNvbnN0IG1lbnUgPSB3ZWJpeC51aSh7XG4gICAgICAgICAgICB2aWV3OiBcImNvbnRleHRtZW51XCIsXG4gICAgICAgICAgICBpZDogXCJjaXJjbGVzdGFza3NfY21cIlxuICAgICAgICB9KTtcblxuICAgICAgICB0aGlzLnRhc2tzVGFibGUgPSB0aGlzLiQkKFwiY2lyY2xlc3Rhc2tzX3RhYmxlXCIpO1xuICAgICAgICB3ZWJpeC5leHRlbmQodGhpcy50YXNrc1RhYmxlLCB3ZWJpeC5Qcm9ncmVzc0Jhcik7XG5cbiAgICAgICAgdGFpZ2EudXNlclRhc2tzKDM2KS50aGVuKGRhdGEgPT4ge1xuICAgICAgICAgICAgY29uc3QgY2lyY2xlcyA9IGRhdGEuanNvbigpO1xuICAgICAgICAgICAgc2VsZi50YXNrc1RhYmxlLnBhcnNlKGNpcmNsZXMpO1xuICAgICAgICB9KTtcblxuICAgICAgICB3ZWJpeC5hamF4KCkuZ2V0KFwiL2F1dGgvYXV0aGVudGljYXRlZFwiLCBmdW5jdGlvbiAoZGF0YSkge1xuICAgICAgICAgICAgY29uc3QgaW5mbyA9IEpTT04ucGFyc2UoZGF0YSk7XG4gICAgICAgICAgICBjb25zdCB1c2VybmFtZSA9IGluZm8udXNlcm5hbWUucmVwbGFjZShcIi4zYm90XCIsIFwiXCIpXG4gICAgICAgICAgICB0YWlnYS51c2VyVGFza3ModXNlcm5hbWUpLnRoZW4oZGF0YSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3QgdGFza3MgPSBkYXRhLmpzb24oKTtcbiAgICAgICAgICAgICAgICBzZWxmLnRhc2tzVGFibGUucGFyc2UodGFza3MpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuXG5cbiAgICB9XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zb3VyY2VzL3ZpZXdzL2NpcmNsZXRhc2tzL2luZGV4LmpzIiwiaW1wb3J0IHsgRXh0ZXJuYWxWaWV3IH0gZnJvbSBcIi4uL2V4dGVybmFsXCI7XG5cbmNvbnN0IENPREVfVVJMID0gXCIvY29kZXNlcnZlci8/Zm9sZGVyPS9zYW5kYm94L2NvZGVcIjtcbmNvbnN0IFJFUVVJUkVEX1BBQ0tBR0VTID0ge1xuICAgIFwiemVyb2JvdC5jb2Rlc2VydmVyXCI6IFwiaHR0cHM6Ly9naXRodWIuY29tL3RocmVlZm9sZHRlY2gvanVtcHNjYWxlWF90aHJlZWJvdC90cmVlL2RldmVsb3BtZW50L1RocmVlQm90UGFja2FnZXMvemVyb2JvdC9jb2Rlc2VydmVyXCJcbn1cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ29kZXNlcnZlclZpZXcgZXh0ZW5kcyBFeHRlcm5hbFZpZXcge1xuICAgIGNvbnN0cnVjdG9yKGFwcCwgbmFtZSkge1xuICAgICAgICBzdXBlcihhcHAsIG5hbWUsIENPREVfVVJMLCBSRVFVSVJFRF9QQUNLQUdFUyk7XG4gICAgfVxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc291cmNlcy92aWV3cy9jb2Rlc2VydmVyL2luZGV4LmpzIiwiaW1wb3J0IHsgSmV0VmlldyB9IGZyb20gXCJ3ZWJpeC1qZXRcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVG9wVmlldyBleHRlbmRzIEpldFZpZXcge1xuXHRjb25maWcoKSB7XG5cdFx0cmV0dXJuIHtcblx0XHRcdHR5cGU6IFwic3BhY2VcIixcblx0XHRcdHJlc3BvbnNpdmU6IHRydWUsXG5cdFx0XHRyb3dzOiBbXG5cdFx0XHRcdHtcblx0XHRcdFx0XHRjb2xzOiBbe1xuXHRcdFx0XHRcdFx0JHN1YnZpZXc6IFwiZGFzaC5qc3hJbmZvXCJcblx0XHRcdFx0XHR9LFxuXHRcdFx0XHRcdHtcblx0XHRcdFx0XHRcdCRzdWJ2aWV3OiBcImRhc2guaGVhbHRoXCJcblx0XHRcdFx0XHR9LFxuXHRcdFx0XHRcdHtcblx0XHRcdFx0XHRcdCRzdWJ2aWV3OiBcImRhc2guZGlza1NwYWNlXCJcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XVxuXHRcdFx0XHR9LFxuXHRcdFx0XHR7XG5cdFx0XHRcdFx0Y29sczogW3tcblx0XHRcdFx0XHRcdCRzdWJ2aWV3OiBcImRhc2gucHJvY2Vzc2VzXCJcblx0XHRcdFx0XHR9LFxuXHRcdFx0XHRcdHsgJHN1YnZpZXc6IFwiZGFzaC5ydW5uaW5nUG9ydHNcIiB9XVxuXHRcdFx0XHR9LFxuXHRcdFx0XVxuXHRcdH07XG5cdH1cbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NvdXJjZXMvdmlld3MvZGFzaC9pbmRleC5qcyIsImltcG9ydCB7IEpldFZpZXcgfSBmcm9tIFwid2ViaXgtamV0XCI7XG5cbmltcG9ydCB7IEVycm9yVmlldyB9IGZyb20gXCIuLi9lcnJvcnMvZGlhbG9nXCI7XG5pbXBvcnQgeyBzb2x1dGlvbnMgfSBmcm9tIFwiLi4vLi4vc2VydmljZXMvZGVwbG95ZWRTb2x1dGlvbnNcIjtcblxuaW1wb3J0IFJlc2VydmF0aW9uVmlldyBmcm9tIFwiLi9yZXNlcnZhdGlvblwiO1xuXG5jb25zdCBVTktOT1dOX1NUQVRVUyA9ICdVbmtub3duJztcblxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBEZXBsb3llZFNvbHV0aW9uc1ZpZXcgZXh0ZW5kcyBKZXRWaWV3IHtcbiAgICBjb25maWcoKSB7XG4gICAgICAgIGNvbnN0IGdyaWQgPSB7XG4gICAgICAgICAgICByb3dzOiBbe1xuICAgICAgICAgICAgICAgIC8vSGVhZGVyXG4gICAgICAgICAgICAgICAgdmlldzogXCJ0ZW1wbGF0ZVwiLFxuICAgICAgICAgICAgICAgIHR5cGU6IFwiaGVhZGVyXCIsXG4gICAgICAgICAgICAgICAgdGVtcGxhdGU6IFwiRGVwbG95ZWQgU29sdXRpb25zXCIsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgeyAvL0RhdGFUYWJsZVxuICAgICAgICAgICAgICAgIHZpZXc6IFwiZGF0YXRhYmxlXCIsXG4gICAgICAgICAgICAgICAgaWQ6IFwic29sdXRpb25zX3RhYmxlXCIsXG4gICAgICAgICAgICAgICAgcmVzaXplQ29sdW1uOiB0cnVlLFxuICAgICAgICAgICAgICAgIHR5cGU6IHtcbiAgICAgICAgICAgICAgICAgICAgaGVpZ2h0OiAyMDAsXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBzY3JvbGw6IFwieHlcIixcbiAgICAgICAgICAgICAgICBhdXRvQ29uZmlnOiB0cnVlLFxuICAgICAgICAgICAgICAgIHZpZXc6IFwiZGF0YXRhYmxlXCIsXG4gICAgICAgICAgICAgICAgc2VsZWN0OiB0cnVlLFxuICAgICAgICAgICAgICAgIGNzczogXCJ3ZWJpeF9oZWFkZXJfYm9yZGVyIHdlYml4X2RhdGFfYm9yZGVyXCIsXG4gICAgICAgICAgICAgICAgb25Db250ZXh0OiB7fSxcbiAgICAgICAgICAgICAgICBjb2x1bW5zOiBbe1xuICAgICAgICAgICAgICAgICAgICBpZDogXCJpbmRleFwiLFxuICAgICAgICAgICAgICAgICAgICBoZWFkZXI6IFwiI1wiLFxuICAgICAgICAgICAgICAgICAgICBzb3J0OiBcImludFwiLFxuICAgICAgICAgICAgICAgICAgICBhdXRvd2lkdGg6IHRydWUsXG4gICAgICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgICAgICBpZDogXCJzb2x1dGlvbk5hbWVcIixcbiAgICAgICAgICAgICAgICAgICAgaGVhZGVyOiBbXCJTb2x1dGlvbiBOYW1lXCIsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRlbnQ6IFwidGV4dEZpbHRlclwiXG4gICAgICAgICAgICAgICAgICAgIH1dLFxuICAgICAgICAgICAgICAgICAgICBzb3J0OiBcInN0cmluZ1wiLFxuICAgICAgICAgICAgICAgICAgICB3aWR0aDogMjAwXG4gICAgICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgICAgICBpZDogXCJyZXN2SWRcIixcbiAgICAgICAgICAgICAgICAgICAgaGVhZGVyOiBbXCJSZXNlcnZhdGlvbiBJZFwiLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb250ZW50OiBcInRleHRGaWx0ZXJcIlxuICAgICAgICAgICAgICAgICAgICB9XSxcbiAgICAgICAgICAgICAgICAgICAgc29ydDogXCJzdHJpbmdcIixcbiAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDIwMFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBpZDogXCJzb2x1dGlvblR5cGVcIixcbiAgICAgICAgICAgICAgICAgICAgaGVhZGVyOiBbXCJTb2x1dGlvbiBUeXBlXCIsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRlbnQ6IFwic2VsZWN0RmlsdGVyXCJcbiAgICAgICAgICAgICAgICAgICAgfV0sXG4gICAgICAgICAgICAgICAgICAgIHNvcnQ6IFwic3RyaW5nXCIsXG4gICAgICAgICAgICAgICAgICAgIHdpZHRoOiAyMDBcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgaWQ6IFwibmV4dEFjdGlvblwiLFxuICAgICAgICAgICAgICAgICAgICBoZWFkZXI6IFtcIk5leHQgYWN0aW9uXCIsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRlbnQ6IFwic2VsZWN0RmlsdGVyXCJcbiAgICAgICAgICAgICAgICAgICAgfV0sXG4gICAgICAgICAgICAgICAgICAgIHNvcnQ6IFwic3RyaW5nXCIsXG4gICAgICAgICAgICAgICAgICAgIHdpZHRoOiAyMDBcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICBzY2hlbWU6IHtcbiAgICAgICAgICAgICAgICAgICAgJGluaXQ6IGZ1bmN0aW9uIChvYmopIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG9iai5zb2x1dGlvbk5hbWUgPSBvYmoubmFtZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIG9iai5yZXN2SWQgPSBvYmoucmVzZXJ2YXRpb24uaWQ7XG4gICAgICAgICAgICAgICAgICAgICAgICBvYmouc29sdXRpb25UeXBlID0gb2JqLnR5cGU7XG4gICAgICAgICAgICAgICAgICAgICAgICBvYmoubmV4dEFjdGlvbiA9IG9iai5yZXNlcnZhdGlvbi5uZXh0X2FjdGlvbjtcbiAgICAgICAgICAgICAgICAgICAgICAgIG9iai5pbmRleCA9IHRoaXMuY291bnQoKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgb246IHtcbiAgICAgICAgICAgICAgICAgICAgb25BZnRlckxvYWQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghdGhpcy5jb3VudCgpKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2hvd092ZXJsYXkoXCJTb3JyeSwgdGhlcmUgaXMgbm8gZGF0YVwiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmhpZGVPdmVybGF5KCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBdXG4gICAgICAgIH07XG4gICAgICAgIHJldHVybiBncmlkO1xuICAgIH1cblxuICAgIHNob3dFcnJvcihtZXNzYWdlKSB7XG4gICAgICAgIHRoaXMuZXJyb3JWaWV3LnNob3dFcnJvcihtZXNzYWdlKTtcbiAgICB9XG5cbiAgICBoYW5kbGVSZXN1bHQocHJvbWlzZSwgY2FsbGJhY2spIHtcbiAgICAgICAgdGhpcy5zb2x1dGlvbnNUYWJsZS5zaG93UHJvZ3Jlc3MoeyBoaWRlOiBmYWxzZSB9KTtcblxuICAgICAgICBwcm9taXNlLnRoZW4oKGRhdGEpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IHNvbHV0aW9uSXRlbSA9IGRhdGEuanNvbigpLnNvbHV0aW9uO1xuICAgICAgICAgICAgaWYgKGNhbGxiYWNrIGluc3RhbmNlb2YgRnVuY3Rpb24pIHtcbiAgICAgICAgICAgICAgICBjYWxsYmFjayhzb2x1dGlvbkl0ZW0pO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB3ZWJpeC5tZXNzYWdlKHtcbiAgICAgICAgICAgICAgICB0eXBlOiBcInN1Y2Nlc3NcIixcbiAgICAgICAgICAgICAgICB0ZXh0OiBcIlRoZSBvcGVyYXRpb24gaGFzIGJlZWQgZG9uZSBzdWNjZXNzZnVsbHlcIlxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIHRoaXMuc29sdXRpb25zVGFibGUuc2hvd1Byb2dyZXNzKHsgaGlkZTogdHJ1ZSB9KTtcbiAgICAgICAgfSkuY2F0Y2goZXJyb3IgPT4ge1xuICAgICAgICAgICAgdGhpcy5zaG93RXJyb3IoXCJFcnJvciBoYXMgaGFwcGVuZWQgZHVyaW5nIHRoaXMgb3BlcmF0aW9uOiBcIiArIGVycm9yLnJlc3BvbnNlLCBcIkVycm9yXCIpO1xuICAgICAgICAgICAgdGhpcy5zb2x1dGlvbnNUYWJsZS5zaG93UHJvZ3Jlc3MoeyBoaWRlOiB0cnVlIH0pO1xuICAgICAgICB9KVxuICAgIH1cblxuICAgIGRlbGV0ZVNvbHV0aW9uKHNvbHV0aW9uVHlwZSwgc29sdXRpb25OYW1lLCBpdGVtSWQpIHtcbiAgICAgICAgdGhpcy5oYW5kbGVSZXN1bHQoc29sdXRpb25zLmRlbGV0ZShzb2x1dGlvblR5cGUsIHNvbHV0aW9uTmFtZSksICgpID0+IHtcbiAgICAgICAgICAgIHRoaXMuc29sdXRpb25zVGFibGUucmVtb3ZlKGl0ZW1JZClcbiAgICAgICAgfSk7XG5cbiAgICB9XG5cbiAgICBsb2FkU29sdXRpb25zKCkge1xuICAgICAgICBzb2x1dGlvbnMubGlzdCgpLnRoZW4oZGF0YSA9PiB7XG4gICAgICAgICAgICBsZXQgc29sdXRpb25zID0gZGF0YS5qc29uKCkuc29sdXRpb25zXG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHNvbHV0aW9ucy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIHNvbHV0aW9uc1tpXS5yZXNlcnZhdGlvbiA9IEpTT04ucGFyc2Uoc29sdXRpb25zW2ldLnJlc2VydmF0aW9uKVxuICAgICAgICAgICAgICAgIHNvbHV0aW9uc1tpXS5mb3JtX2luZm8gPSBKU09OLnBhcnNlKHNvbHV0aW9uc1tpXS5mb3JtX2luZm8pXG5cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuc29sdXRpb25zVGFibGUucGFyc2Uoc29sdXRpb25zKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgdmlld0l0ZW0oaWQpIHtcbiAgICAgICAgdGhpcy5yZXNlcnZhdGlvblZpZXcuc2hvd0Zvcih0aGlzLnNvbHV0aW9uc1RhYmxlLmdldEl0ZW0oaWQpKTtcbiAgICB9XG5cbiAgICBpbml0KHZpZXcpIHtcbiAgICAgICAgY29uc3Qgc2VsZiA9IHRoaXM7XG5cbiAgICAgICAgc2VsZi5lcnJvclZpZXcgPSB0aGlzLnVpKEVycm9yVmlldyk7XG4gICAgICAgIHNlbGYucmVzZXJ2YXRpb25WaWV3ID0gc2VsZi51aShSZXNlcnZhdGlvblZpZXcpO1xuXG4gICAgICAgIGNvbnN0IG1lbnUgPSB3ZWJpeC51aSh7XG4gICAgICAgICAgICB2aWV3OiBcImNvbnRleHRtZW51XCIsXG4gICAgICAgICAgICBpZDogXCJzb2x1dGlvbnNfY21cIlxuICAgICAgICB9KTtcblxuICAgICAgICB0aGlzLnNvbHV0aW9uc1RhYmxlID0gdGhpcy4kJChcInNvbHV0aW9uc190YWJsZVwiKTtcbiAgICAgICAgc2VsZi5sb2FkU29sdXRpb25zKCk7XG4gICAgICAgIHdlYml4LmV4dGVuZCh0aGlzLnNvbHV0aW9uc1RhYmxlLCB3ZWJpeC5Qcm9ncmVzc0Jhcik7XG5cbiAgICAgICAgZnVuY3Rpb24gY2hlY2tBY3Rpb24oYWN0aW9uLCBzZWxlY3RlZEl0ZW1JZCkge1xuICAgICAgICAgICAgY29uc3QgaXRlbSA9IHNlbGYuc29sdXRpb25zVGFibGUuZ2V0SXRlbShzZWxlY3RlZEl0ZW1JZCk7XG4gICAgICAgICAgICBpZiAoaXRlbSkge1xuICAgICAgICAgICAgICAgIGxldCBpdGVtSWQgPSBpdGVtLmlkO1xuICAgICAgICAgICAgICAgIGxldCBzb2x1dGlvbk5hbWUgPSBpdGVtLnNvbHV0aW9uTmFtZTtcbiAgICAgICAgICAgICAgICBsZXQgc29sdXRpb25UeXBlID0gaXRlbS5zb2x1dGlvblR5cGU7XG4gICAgICAgICAgICAgICAgbGV0IG5leHRBY3Rpb24gPSBpdGVtLnJlc2VydmF0aW9uLm5leHRfYWN0aW9uXG5cbiAgICAgICAgICAgICAgICBpZiAoYWN0aW9uID09ICdkZWxldGUnKSB7XG4gICAgICAgICAgICAgICAgICAgIHdlYml4LmNvbmZpcm0oe1xuICAgICAgICAgICAgICAgICAgICAgICAgdGl0bGU6IFwiQ2FuY2VsIFNvbHV0aW9uXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBvazogXCJZZXNcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIHRleHQ6IGBBcmUgeW91IHN1cmUgeW91IHdhbnQgdG8gY2FuY2VsICR7c29sdXRpb25OYW1lfT9gLFxuICAgICAgICAgICAgICAgICAgICAgICAgY2FuY2VsOiBcIk5vXCIsXG4gICAgICAgICAgICAgICAgICAgIH0pLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5kZWxldGVTb2x1dGlvbihzb2x1dGlvblR5cGUsIHNvbHV0aW9uTmFtZSwgaXRlbUlkKVxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHdlYml4Lm1lc3NhZ2UoXCJZb3UgbmVlZCB0byBzZWxlY3QgYSBzb2x1dGlvblwiKVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgJCQoXCJzb2x1dGlvbnNfY21cIikuYXR0YWNoRXZlbnQoXCJvbk1lbnVJdGVtQ2xpY2tcIiwgZnVuY3Rpb24gKGlkKSB7XG4gICAgICAgICAgICBjaGVja0FjdGlvbihpZCwgc2VsZi5zb2x1dGlvbnNUYWJsZS5nZXRTZWxlY3RlZElkKCkpO1xuICAgICAgICB9KTtcblxuICAgICAgICBzZWxmLnNvbHV0aW9uc1RhYmxlLmF0dGFjaEV2ZW50KFwib25JdGVtRGJsQ2xpY2tcIiwgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgc2VsZi52aWV3SXRlbShzZWxmLnNvbHV0aW9uc1RhYmxlLmdldFNlbGVjdGVkSWQoKSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHdlYml4LmV2ZW50KHNlbGYuc29sdXRpb25zVGFibGUuJHZpZXcsIFwiY29udGV4dG1lbnVcIiwgZnVuY3Rpb24gKGUgLypNb3VzZUV2ZW50Ki8pIHtcbiAgICAgICAgICAgIGNvbnN0IHBvcyA9IHNlbGYuc29sdXRpb25zVGFibGUubG9jYXRlKGUpO1xuICAgICAgICAgICAgaWYgKHBvcykge1xuICAgICAgICAgICAgICAgIGNvbnN0IGl0ZW0gPSBzZWxmLnNvbHV0aW9uc1RhYmxlLmdldEl0ZW0ocG9zLnJvdyk7XG4gICAgICAgICAgICAgICAgY29uc3QgYWN0aW9ucyA9IFsnZGVsZXRlJ107XG5cbiAgICAgICAgICAgICAgICBtZW51LmNsZWFyQWxsKCk7XG4gICAgICAgICAgICAgICAgbWVudS5wYXJzZShhY3Rpb25zKTtcbiAgICAgICAgICAgICAgICBtZW51LnNob3coZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gd2ViaXguaHRtbC5wcmV2ZW50RXZlbnQoZSk7XG4gICAgICAgIH0pXG5cbiAgICB9XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zb3VyY2VzL3ZpZXdzL2RlcGxveWVkU29sdXRpb25zL2luZGV4LmpzIiwiaW1wb3J0IHsgRXh0ZXJuYWxWaWV3IH0gZnJvbSBcIi4uL2V4dGVybmFsXCI7XG5cbmNvbnN0IFVSTCA9IFwiL3RocmVlYm90L2Zhcm1tYW5hZ2VtZW50XCI7XG5jb25zdCBSRVFVSVJFRF9QQUNLQUdFUyA9IHtcbiAgICBcInRocmVlYm90LmZhcm1tYW5hZ2VtZW50XCI6IFwiaHR0cHM6Ly9naXRodWIuY29tL3RocmVlZm9sZHRlY2gvanVtcHNjYWxlWF90aHJlZWJvdC90cmVlL2RldmVsb3BtZW50L1RocmVlQm90UGFja2FnZXMvdGhyZWVib3QvZmFybW1hbmFnZW1lbnRcIlxufVxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBGYXJtbWFuYWdlbWVudFZpZXcgZXh0ZW5kcyBFeHRlcm5hbFZpZXcge1xuICAgIGNvbnN0cnVjdG9yKGFwcCwgbmFtZSkge1xuICAgICAgICBzdXBlcihhcHAsIG5hbWUsIFVSTCwgUkVRVUlSRURfUEFDS0FHRVMpO1xuICAgIH1cbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NvdXJjZXMvdmlld3MvZmFybW1hbmFnZW1lbnQvaW5kZXguanMiLCJpbXBvcnQgeyBFeHRlcm5hbFZpZXcgfSBmcm9tIFwiLi4vZXh0ZXJuYWxcIjtcblxuY29uc3QgVVJMID0gXCIvdGhyZWVmb2xkL3NpbXVsYXRvci9ub3RlYm9vay9cIjtcbmNvbnN0IFJFUVVJUkVEX1BBQ0tBR0VTID0ge1xuICAgIFwidGhyZWVmb2xkLnNpbXVsYXRvclwiOiBcImh0dHBzOi8vZ2l0aHViLmNvbS90aHJlZWZvbGR0ZWNoL2p1bXBzY2FsZVhfdGhyZWVib3QvdHJlZS9kZXZlbG9wbWVudC9UaHJlZUJvdFBhY2thZ2VzL3RocmVlZm9sZC9zaW11bGF0b3JcIlxufVxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBKdXB5dGVyVmlldyBleHRlbmRzIEV4dGVybmFsVmlldyB7XG4gICAgY29uc3RydWN0b3IoYXBwLCBuYW1lKSB7XG4gICAgICAgIHN1cGVyKGFwcCwgbmFtZSwgVVJMLCBSRVFVSVJFRF9QQUNLQUdFUyk7XG4gICAgfVxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc291cmNlcy92aWV3cy9qdXB5dGVyL2luZGV4LmpzIiwiaW1wb3J0IHsgSmV0VmlldyB9IGZyb20gXCJ3ZWJpeC1qZXRcIjtcblxuaW1wb3J0IEFwcExvZ3NWaWV3IGZyb20gXCIuL2FwcExvZ3NcIjtcbmltcG9ydCB7IGxvZ3MgfSBmcm9tIFwiLi4vLi4vc2VydmljZXMvbG9nc1wiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBMb2dzVmlldyBleHRlbmRzIEpldFZpZXcge1xuICAgIGNvbmZpZygpIHtcblxuICAgICAgICBjb25zdCB2aWV3ID0ge1xuICAgICAgICAgICAgcm93czogW3tcbiAgICAgICAgICAgICAgICBjb2xzOiBbXG4gICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZpZXc6IFwidGVtcGxhdGVcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU6IFwiaGVhZGVyXCIsIHRlbXBsYXRlOiBcIkxvZ3NcIixcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmlldzogXCJjb21ib1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgaWQ6IFwiYXBwc19jb21ib1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgcGxhY2Vob2xkZXI6IFwiQ2hvb3NlIHlvdXIgYXBwbGljYXRpb25cIixcbiAgICAgICAgICAgICAgICAgICAgICAgIG9uOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb25DaGFuZ2U6IGZ1bmN0aW9uIChhcHBOYW1lKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuJHNjb3BlLnNob3dGb3IoYXBwTmFtZSlcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIEFwcExvZ3NWaWV3XG4gICAgICAgICAgICBdXG4gICAgICAgIH07XG5cbiAgICAgICAgcmV0dXJuIHZpZXc7XG4gICAgfVxuXG4gICAgaW5pdCh2aWV3KSB7XG4gICAgICAgIHZpZXcuYXBwc0NvbWJvID0gJCQoXCJhcHBzX2NvbWJvXCIpO1xuICAgICAgICBsb2dzLmxpc3RBcHBzKCkudGhlbihkYXRhID0+IHtcbiAgICAgICAgICAgIHZpZXcuYXBwc0NvbWJvLmRlZmluZShcIm9wdGlvbnNcIiwgZGF0YS5qc29uKCkpO1xuICAgICAgICAgICAgdmlldy5hcHBzQ29tYm8ucmVuZGVyKCk7XG4gICAgICAgIH0pO1xuXG4gICAgfVxuXG4gICAgdXJsQ2hhbmdlKHZpZXcsIHVybCkge1xuICAgICAgICBjb25zdCBhcHBOYW1lID0gdXJsWzBdLnBhcmFtcy5hcHBuYW1lLCBsb2dJZCA9IHVybFswXS5wYXJhbXMubG9naWQ7XG4gICAgICAgIGlmIChhcHBOYW1lKSB7XG4gICAgICAgICAgICB0aGlzLnNob3dGb3IoYXBwTmFtZSwgbG9nSWQpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgc2hvd0ZvcihhcHBOYW1lLCBsb2dJZCkge1xuICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgICAgIHNlbGYuYXBwTG9ncyA9ICQkKFwiYXBwbG9nc190YWJsZVwiKTtcblxuICAgICAgICB3ZWJpeC5leHRlbmQoc2VsZi5hcHBMb2dzLCB3ZWJpeC5Qcm9ncmVzc0Jhcik7XG4gICAgICAgIHNlbGYuYXBwTG9ncy5zaG93UHJvZ3Jlc3MoeyBoaWRlOiBmYWxzZSB9KTtcblxuICAgICAgICBsb2dzLmxpc3QoYXBwTmFtZSwgbG9nSWQpLnRoZW4oZGF0YSA9PiB7XG4gICAgICAgICAgICBzZWxmLmFwcExvZ3MuY2xlYXJBbGwoKVxuICAgICAgICAgICAgc2VsZi5hcHBMb2dzLnBhcnNlKGRhdGEuanNvbigpWzBdKVxuICAgICAgICAgICAgc2VsZi5hcHBMb2dzLnNob3dQcm9ncmVzcyh7IGhpZGU6IHRydWUgfSk7XG4gICAgICAgIH0pO1xuICAgIH1cbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NvdXJjZXMvdmlld3MvbG9ncy9pbmRleC5qcyIsImltcG9ydCB7IEpldFZpZXcgfSBmcm9tIFwid2ViaXgtamV0XCI7XG5cbmltcG9ydCB7IEVycm9yVmlldyB9IGZyb20gXCIuLi9lcnJvcnMvZGlhbG9nXCI7XG5pbXBvcnQgeyBwYWNrYWdlcyB9IGZyb20gXCIuLi8uLi9zZXJ2aWNlcy9wYWNrYWdlc1wiO1xuXG5jb25zdCBVTktOT1dOX1NUQVRVUyA9ICdVbmtub3duJztcblxuY29uc3QgUEFDS0FHRV9TVEFURVMgPSBbXG4gICAge1xuICAgICAgICBuYW1lOiBcIkluaXRcIixcbiAgICAgICAgYWN0aW9uczogW11cbiAgICB9LFxuICAgIHtcbiAgICAgICAgbmFtZTogXCJDb25maWdcIixcbiAgICAgICAgYWN0aW9uczogWydpbnN0YWxsJ10sXG4gICAgfSxcbiAgICB7XG4gICAgICAgIG5hbWU6IFwiSW5zdGFsbGVkXCIsXG4gICAgICAgIGFjdGlvbnM6IFsnc3RhcnQnXVxuICAgIH0sXG4gICAge1xuICAgICAgICBuYW1lOiBcIlJ1bm5pbmdcIixcbiAgICAgICAgYWN0aW9uczogW1wic3RvcFwiXVxuICAgIH0sXG4gICAge1xuICAgICAgICBuYW1lOiBcIkhhbHRlZFwiLFxuICAgICAgICBhY3Rpb25zOiBbXCJzdGFydFwiLCBcImRpc2FibGVcIl1cbiAgICB9LFxuICAgIHtcbiAgICAgICAgbmFtZTogXCJEaXNhYmxlZFwiLFxuICAgICAgICBhY3Rpb25zOiBbXCJlbmFibGVcIl1cbiAgICB9LFxuICAgIHtcbiAgICAgICAgbmFtZTogXCJFcnJvclwiLFxuICAgICAgICBhY3Rpb25zOiBbJ2luc3RhbGwnXVxuICAgIH1cbl07XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFBhY2thZ2VzVmlldyBleHRlbmRzIEpldFZpZXcge1xuICAgIGNvbmZpZygpIHtcbiAgICAgICAgY29uc3QgZ3JpZCA9IHtcbiAgICAgICAgICAgIHJvd3M6IFt7XG4gICAgICAgICAgICAgICAgLy9IZWFkZXJcbiAgICAgICAgICAgICAgICB2aWV3OiBcInRlbXBsYXRlXCIsXG4gICAgICAgICAgICAgICAgdHlwZTogXCJoZWFkZXJcIixcbiAgICAgICAgICAgICAgICB0ZW1wbGF0ZTogXCJQYWNrYWdlc1wiLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHsgLy9hZGRpbmcgUGFja2FnZVxuICAgICAgICAgICAgICAgIGNvbHM6IFt7XG4gICAgICAgICAgICAgICAgICAgIC8vc2VsZWN0b3JcbiAgICAgICAgICAgICAgICAgICAgdmlldzogXCJzZWxlY3RcIixcbiAgICAgICAgICAgICAgICAgICAgaWQ6ICdtZXRob2Rfc2VsZWN0b3InLFxuICAgICAgICAgICAgICAgICAgICBvcHRpb25zOiBbXCJQYXRoXCIsIFwiR2l0dXJsXCJdLFxuICAgICAgICAgICAgICAgICAgICB3aWR0aDogMTAwXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAvL3RleHQgYXJlYVxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgdmlldzogXCJ0ZXh0XCIsXG4gICAgICAgICAgICAgICAgICAgIGlkOiAncGFja2FnZV9wYXRoJyxcbiAgICAgICAgICAgICAgICAgICAgaW5wdXRBbGlnbjogXCJsZWZ0XCIsXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAvL3N1Ym1pdCBidXR0b25cbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIHZpZXc6IFwiYnV0dG9uXCIsXG4gICAgICAgICAgICAgICAgICAgIGlkOiBcImFkZF9wYWNrYWdlX2J1dHRvblwiLFxuICAgICAgICAgICAgICAgICAgICB2YWx1ZTogXCJBZGQgcGFja2FnZVwiLFxuICAgICAgICAgICAgICAgICAgICBhdXRvd2lkdGg6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgIHR5cGU6IFwiXCIsXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7IC8vRGF0YVRhYmxlXG4gICAgICAgICAgICAgICAgdmlldzogXCJkYXRhdGFibGVcIixcbiAgICAgICAgICAgICAgICBpZDogXCJwYWNrYWdlc190YWJsZVwiLFxuICAgICAgICAgICAgICAgIHJlc2l6ZUNvbHVtbjogdHJ1ZSxcbiAgICAgICAgICAgICAgICB0eXBlOiB7XG4gICAgICAgICAgICAgICAgICAgIGhlaWdodDogMjAwLFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgc2Nyb2xsOiBcInh5XCIsXG4gICAgICAgICAgICAgICAgYXV0b0NvbmZpZzogdHJ1ZSxcbiAgICAgICAgICAgICAgICB2aWV3OiBcImRhdGF0YWJsZVwiLFxuICAgICAgICAgICAgICAgIHNlbGVjdDogdHJ1ZSxcbiAgICAgICAgICAgICAgICBjc3M6IFwid2ViaXhfaGVhZGVyX2JvcmRlciB3ZWJpeF9kYXRhX2JvcmRlclwiLFxuICAgICAgICAgICAgICAgIG9uQ29udGV4dDoge30sXG4gICAgICAgICAgICAgICAgY29sdW1uczogW3tcbiAgICAgICAgICAgICAgICAgICAgaWQ6IFwiaW5kZXhcIixcbiAgICAgICAgICAgICAgICAgICAgaGVhZGVyOiBcIiNcIixcbiAgICAgICAgICAgICAgICAgICAgc29ydDogXCJpbnRcIixcbiAgICAgICAgICAgICAgICAgICAgYXV0b3dpZHRoOiB0cnVlLFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBpZDogXCJhdXRob3JcIixcbiAgICAgICAgICAgICAgICAgICAgaGVhZGVyOiBbXCJBdXRob3JcIiwge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29udGVudDogXCJzZWxlY3RGaWx0ZXJcIlxuICAgICAgICAgICAgICAgICAgICB9XSxcbiAgICAgICAgICAgICAgICAgICAgc29ydDogXCJzdHJpbmdcIixcbiAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDIwMFxuICAgICAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICAgICAgaWQ6IFwic291cmNlX25hbWVcIixcbiAgICAgICAgICAgICAgICAgICAgaGVhZGVyOiBbXCJOYW1lXCIsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRlbnQ6IFwidGV4dEZpbHRlclwiXG4gICAgICAgICAgICAgICAgICAgIH1dLFxuICAgICAgICAgICAgICAgICAgICBzb3J0OiBcInN0cmluZ1wiLFxuICAgICAgICAgICAgICAgICAgICB3aWR0aDogMjAwXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIGlkOiBcInN0YXR1c1wiLFxuICAgICAgICAgICAgICAgICAgICBoZWFkZXI6IFwiU3RhdHVzXCIsXG4gICAgICAgICAgICAgICAgICAgIHNvcnQ6IFwic3RyaW5nXCIsXG4gICAgICAgICAgICAgICAgICAgIGZvcm1hdDogKHZhbHVlKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBzdGF0dXMgPSBQQUNLQUdFX1NUQVRFU1t2YWx1ZV07XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gc3RhdHVzICYmIHN0YXR1cy5uYW1lIHx8IFVOS05PV05fU1RBVFVTO1xuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICAgICAgaWQ6IFwicGF0aFwiLFxuICAgICAgICAgICAgICAgICAgICBoZWFkZXI6IFwiUGF0aFwiLFxuICAgICAgICAgICAgICAgICAgICBzb3J0OiBcInN0cmluZ1wiLFxuICAgICAgICAgICAgICAgICAgICB3aWR0aDogNzAwXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgc2NoZW1lOiB7XG4gICAgICAgICAgICAgICAgICAgICRpbml0OiBmdW5jdGlvbiAob2JqKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBvYmouc291cmNlX25hbWUgPSBvYmouc291cmNlLm5hbWU7XG4gICAgICAgICAgICAgICAgICAgICAgICBvYmouYXV0aG9yID0gb2JqLnNvdXJjZS50aHJlZWJvdDtcbiAgICAgICAgICAgICAgICAgICAgICAgIG9iai5pbmRleCA9IHRoaXMuY291bnQoKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIF1cbiAgICAgICAgfTtcbiAgICAgICAgcmV0dXJuIGdyaWQ7XG4gICAgfVxuXG4gICAgc2hvd0Vycm9yKG1lc3NhZ2UpIHtcbiAgICAgICAgdGhpcy5lcnJvclZpZXcuc2hvd0Vycm9yKG1lc3NhZ2UpO1xuICAgIH1cblxuICAgIGhhbmRsZVJlc3VsdChwcm9taXNlLCBjYWxsYmFjaykge1xuICAgICAgICB0aGlzLnBhY2thZ2VUYWJsZS5zaG93UHJvZ3Jlc3MoeyBoaWRlOiBmYWxzZSB9KTtcblxuICAgICAgICBwcm9taXNlLnRoZW4oKGRhdGEpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IHBhY2thZ2VJdGVtID0gZGF0YS5qc29uKCkucGFja2FnZTtcbiAgICAgICAgICAgIGlmIChjYWxsYmFjayBpbnN0YW5jZW9mIEZ1bmN0aW9uKSB7XG4gICAgICAgICAgICAgICAgY2FsbGJhY2socGFja2FnZUl0ZW0pO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB3ZWJpeC5tZXNzYWdlKHtcbiAgICAgICAgICAgICAgICB0eXBlOiBcInN1Y2Nlc3NcIixcbiAgICAgICAgICAgICAgICB0ZXh0OiBcIlRoZSBvcGVyYXRpb24gaGFzIGJlZWQgZG9uZSBzdWNjZXNzZnVsbHlcIlxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIHRoaXMucGFja2FnZVRhYmxlLnNob3dQcm9ncmVzcyh7IGhpZGU6IHRydWUgfSk7XG4gICAgICAgIH0pLmNhdGNoKGVycm9yID0+IHtcbiAgICAgICAgICAgIHRoaXMuc2hvd0Vycm9yKFwiRXJyb3IgaGFzIGhhcHBlbmVkIGR1cmluZyB0aGlzIG9wZXJhdGlvbjogXCIgKyBlcnJvci5yZXNwb25zZSwgXCJFcnJvclwiKTtcbiAgICAgICAgICAgIHRoaXMucGFja2FnZVRhYmxlLnNob3dQcm9ncmVzcyh7IGhpZGU6IHRydWUgfSk7XG4gICAgICAgIH0pXG4gICAgfVxuXG4gICAgYWRkUGFja2FnZShwYXRoLCBnaXRVcmwsIGl0ZW1JZCkge1xuICAgICAgICB0aGlzLmhhbmRsZVJlc3VsdChwYWNrYWdlcy5hZGQocGF0aCwgZ2l0VXJsKSwgKGl0ZW0pID0+IHtcbiAgICAgICAgICAgIGlmIChpdGVtSWQpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnBhY2thZ2VUYWJsZS51cGRhdGVJdGVtKGl0ZW1JZCwgaXRlbSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMucGFja2FnZVRhYmxlLmFkZChpdGVtKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgZGVsZXRlUGFja2FnZShwYWNrYWdlTmFtZSwgaXRlbUlkKSB7XG4gICAgICAgIHRoaXMuaGFuZGxlUmVzdWx0KHBhY2thZ2VzLmRlbGV0ZShwYWNrYWdlTmFtZSksICgpID0+IHtcbiAgICAgICAgICAgIHRoaXMucGFja2FnZVRhYmxlLnJlbW92ZShpdGVtSWQpXG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHN0YXJ0UGFja2FnZShwYWNrYWdlTmFtZSwgaXRlbUlkKSB7XG4gICAgICAgIHRoaXMuaGFuZGxlUmVzdWx0KHBhY2thZ2VzLnN0YXJ0KHBhY2thZ2VOYW1lKSwgKGl0ZW0pID0+IHtcbiAgICAgICAgICAgIHRoaXMucGFja2FnZVRhYmxlLnVwZGF0ZUl0ZW0oaXRlbUlkLCBpdGVtKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgc3RvcFBhY2thZ2UocGFja2FnZU5hbWUsIGl0ZW1JZCkge1xuICAgICAgICB0aGlzLmhhbmRsZVJlc3VsdChwYWNrYWdlcy5zdG9wKHBhY2thZ2VOYW1lKSwgKGl0ZW0pID0+IHtcbiAgICAgICAgICAgIHRoaXMucGFja2FnZVRhYmxlLnVwZGF0ZUl0ZW0oaXRlbUlkLCBpdGVtKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgZW5hYmxlUGFja2FnZShwYWNrYWdlTmFtZSwgaXRlbUlkKSB7XG4gICAgICAgIHRoaXMuaGFuZGxlUmVzdWx0KHBhY2thZ2VzLmVuYWJsZShwYWNrYWdlTmFtZSksIChpdGVtKSA9PiB7XG4gICAgICAgICAgICB0aGlzLnBhY2thZ2VUYWJsZS51cGRhdGVJdGVtKGl0ZW1JZCwgaXRlbSk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGRpc2FibGVQYWNrYWdlKHBhY2thZ2VOYW1lLCBpdGVtSWQpIHtcbiAgICAgICAgdGhpcy5oYW5kbGVSZXN1bHQocGFja2FnZXMuZGlzYWJsZShwYWNrYWdlTmFtZSksIChpdGVtKSA9PiB7XG4gICAgICAgICAgICB0aGlzLnBhY2thZ2VUYWJsZS51cGRhdGVJdGVtKGl0ZW1JZCwgaXRlbSk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGxvYWRQYWNrYWdlcygpIHtcbiAgICAgICAgcGFja2FnZXMubGlzdCgpLnRoZW4oZGF0YSA9PiB7XG4gICAgICAgICAgICB0aGlzLnBhY2thZ2VUYWJsZS5wYXJzZShkYXRhLmpzb24oKS5wYWNrYWdlcyk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGluaXQodmlldykge1xuICAgICAgICBjb25zdCBzZWxmID0gdGhpcztcblxuICAgICAgICBzZWxmLmVycm9yVmlldyA9IHRoaXMudWkoRXJyb3JWaWV3KTtcblxuICAgICAgICBjb25zdCBtZW51ID0gd2ViaXgudWkoe1xuICAgICAgICAgICAgdmlldzogXCJjb250ZXh0bWVudVwiLFxuICAgICAgICAgICAgaWQ6IFwicGFja2FnZXNfY21cIlxuICAgICAgICB9KTtcblxuICAgICAgICB0aGlzLnBhY2thZ2VUYWJsZSA9IHRoaXMuJCQoXCJwYWNrYWdlc190YWJsZVwiKTtcbiAgICAgICAgd2ViaXguZXh0ZW5kKHRoaXMucGFja2FnZVRhYmxlLCB3ZWJpeC5Qcm9ncmVzc0Jhcik7XG5cbiAgICAgICAgZnVuY3Rpb24gY2hlY2tBY3Rpb24oYWN0aW9uLCBzZWxlY3RlZEl0ZW1JZCkge1xuICAgICAgICAgICAgY29uc3QgaXRlbSA9IHNlbGYucGFja2FnZVRhYmxlLmdldEl0ZW0oc2VsZWN0ZWRJdGVtSWQpO1xuICAgICAgICAgICAgaWYgKGl0ZW0pIHtcbiAgICAgICAgICAgICAgICBsZXQgaXRlbUlkID0gaXRlbS5pZDtcbiAgICAgICAgICAgICAgICBsZXQgcGFja2FnZU5hbWUgPSBpdGVtLm5hbWU7XG5cbiAgICAgICAgICAgICAgICBpZiAoYWN0aW9uID09ICdpbnN0YWxsJykge1xuICAgICAgICAgICAgICAgICAgICBzZWxmLmFkZFBhY2thZ2UoaXRlbS5wYXRoLCBudWxsLCBpdGVtSWQpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoYWN0aW9uID09ICdkZWxldGUnKSB7XG4gICAgICAgICAgICAgICAgICAgIHdlYml4LmNvbmZpcm0oe1xuICAgICAgICAgICAgICAgICAgICAgICAgdGl0bGU6IFwiRGVsZXRlIFBhY2thZ2VcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIG9rOiBcIlllc1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgdGV4dDogYEFyZSB5b3Ugc3VyZSB5b3Ugd2FudCB0byBkZWxldGUgJHtwYWNrYWdlTmFtZX0/YCxcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhbmNlbDogXCJOb1wiLFxuICAgICAgICAgICAgICAgICAgICB9KS50aGVuKCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuZGVsZXRlUGFja2FnZShwYWNrYWdlTmFtZSwgaXRlbUlkKVxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgLy9cbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGFjdGlvbiA9PSAnc3RhcnQnKSB7XG4gICAgICAgICAgICAgICAgICAgIHNlbGYuc3RhcnRQYWNrYWdlKHBhY2thZ2VOYW1lLCBpdGVtSWQpXG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChhY3Rpb24gPT0gJ3N0b3AnKSB7XG4gICAgICAgICAgICAgICAgICAgIHNlbGYuc3RvcFBhY2thZ2UocGFja2FnZU5hbWUsIGl0ZW1JZClcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGFjdGlvbiA9PSAnZGlzYWJsZScpIHtcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5kaXNhYmxlUGFja2FnZShwYWNrYWdlTmFtZSwgaXRlbUlkKVxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoYWN0aW9uID09ICdlbmFibGUnKSB7XG4gICAgICAgICAgICAgICAgICAgIHNlbGYuZW5hYmxlUGFja2FnZShwYWNrYWdlTmFtZSwgaXRlbUlkKVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgd2ViaXgubWVzc2FnZShcInlvdSBoYXZlIHRvIHNlbGVjdCBhIHBhY2thZ2VcIilcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgICQkKFwiYWRkX3BhY2thZ2VfYnV0dG9uXCIpLmF0dGFjaEV2ZW50KFwib25JdGVtQ2xpY2tcIiwgZnVuY3Rpb24gKGlkKSB7XG4gICAgICAgICAgICBsZXQgcGFjYWtnZUxvY2F0aW9uID0gJCQoXCJwYWNrYWdlX3BhdGhcIikuZ2V0VmFsdWUoKVxuICAgICAgICAgICAgaWYgKHBhY2FrZ2VMb2NhdGlvbiA9PSBcIlwiKSB7XG4gICAgICAgICAgICAgICAgYWxlcnQoXCJwbGVhc2UgZW50ZXIgcGFja2FnZSBsb2NhdGlvblwiKVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBsZXQgcGFja2FnZU1ldGhvZCA9ICQkKFwibWV0aG9kX3NlbGVjdG9yXCIpLmdldFZhbHVlKClcbiAgICAgICAgICAgICAgICBsZXQgZ2l0VXJsID0gbnVsbDtcbiAgICAgICAgICAgICAgICBsZXQgcGF0aCA9IG51bGw7XG4gICAgICAgICAgICAgICAgaWYgKHBhY2thZ2VNZXRob2QgPT0gXCJHaXR1cmxcIikge1xuICAgICAgICAgICAgICAgICAgICBnaXRVcmwgPSBwYWNha2dlTG9jYXRpb25cbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHBhY2thZ2VNZXRob2QgPT0gXCJQYXRoXCIpIHtcbiAgICAgICAgICAgICAgICAgICAgcGF0aCA9IHBhY2FrZ2VMb2NhdGlvblxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGFsZXJ0KFwic29tZXRoaW5nIHdlbnQgd3JvbmcgZHVyaW5nIHNlbGVjdGluZyB0aGUgcGFja2FnZSBtZXRob2RcIilcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgc2VsZi5hZGRQYWNrYWdlKHBhdGgsIGdpdFVybClcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgJCQoXCJwYWNrYWdlc19jbVwiKS5hdHRhY2hFdmVudChcIm9uTWVudUl0ZW1DbGlja1wiLCBmdW5jdGlvbiAoaWQpIHtcbiAgICAgICAgICAgIGNoZWNrQWN0aW9uKGlkLCBzZWxmLnBhY2thZ2VUYWJsZS5nZXRTZWxlY3RlZElkKCkpO1xuICAgICAgICB9KTtcblxuXG4gICAgICAgIHdlYml4LmV2ZW50KHNlbGYucGFja2FnZVRhYmxlLiR2aWV3LCBcImNvbnRleHRtZW51XCIsIGZ1bmN0aW9uIChlIC8qTW91c2VFdmVudCovKSB7XG4gICAgICAgICAgICBjb25zdCBwb3MgPSBzZWxmLnBhY2thZ2VUYWJsZS5sb2NhdGUoZSk7XG4gICAgICAgICAgICBpZiAocG9zKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgaXRlbSA9IHNlbGYucGFja2FnZVRhYmxlLmdldEl0ZW0ocG9zLnJvdyk7XG4gICAgICAgICAgICAgICAgY29uc3QgYWN0aW9ucyA9IFsuLi5QQUNLQUdFX1NUQVRFU1tpdGVtLnN0YXR1c10uYWN0aW9ucywgJ2RlbGV0ZSddO1xuXG4gICAgICAgICAgICAgICAgbWVudS5jbGVhckFsbCgpO1xuICAgICAgICAgICAgICAgIG1lbnUucGFyc2UoYWN0aW9ucyk7XG4gICAgICAgICAgICAgICAgbWVudS5zaG93KGUpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHdlYml4Lmh0bWwucHJldmVudEV2ZW50KGUpO1xuICAgICAgICB9KVxuXG4gICAgICAgIHNlbGYubG9hZFBhY2thZ2VzKCk7XG4gICAgfVxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc291cmNlcy92aWV3cy9wYWNrYWdlcy9pbmRleC5qcyIsImltcG9ydCB7IEV4dGVybmFsVmlldyB9IGZyb20gXCIuLi9leHRlcm5hbFwiO1xuXG5jb25zdCBVUkwgPSBcIi90aHJlZWZvbGQvc2RrZXhhbXBsZXMvbm90ZWJvb2svXCI7XG5jb25zdCBSRVFVSVJFRF9QQUNLQUdFUyA9IHtcbiAgICBcInRocmVlZm9sZC5zZGtleGFtcGxlc1wiOiBcImh0dHBzOi8vZ2l0aHViLmNvbS90aHJlZWZvbGR0ZWNoL2p1bXBzY2FsZVhfdGhyZWVib3QvdHJlZS9kZXZlbG9wbWVudC9UaHJlZUJvdFBhY2thZ2VzL3RocmVlZm9sZC9zZGtleGFtcGxlc1wiXG59XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEp1cHl0ZXJWaWV3IGV4dGVuZHMgRXh0ZXJuYWxWaWV3IHtcbiAgICBjb25zdHJ1Y3RvcihhcHAsIG5hbWUpIHtcbiAgICAgICAgc3VwZXIoYXBwLCBuYW1lLCBVUkwsIFJFUVVJUkVEX1BBQ0tBR0VTKTtcbiAgICB9XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zb3VyY2VzL3ZpZXdzL3Nka2V4YW1wbGVzL2luZGV4LmpzIiwiaW1wb3J0IHsgSmV0VmlldyB9IGZyb20gXCJ3ZWJpeC1qZXRcIjtcblxuXG5pbXBvcnQgQWRtaW5zVmlldyBmcm9tIFwiLi9hZG1pbnNcIjtcbmltcG9ydCBHZW5lcmFsVmlldyBmcm9tIFwiLi9nZW5lcmFsXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFNldHRpbmdzVmlldyBleHRlbmRzIEpldFZpZXcge1xuICAgIGNvbmZpZygpIHtcbiAgICAgICAgY29uc3QgdmlldyA9IHtcbiAgICAgICAgICAgIHZpZXc6IFwidGFidmlld1wiLFxuICAgICAgICAgICAgY2VsbHM6IFt7XG4gICAgICAgICAgICAgICAgaGVhZGVyOiBcIkdlbmVyYWxcIixcbiAgICAgICAgICAgICAgICBib2R5OiBHZW5lcmFsVmlldyxcbiAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICBoZWFkZXI6IFwiQWRtaW5pc3RyYXRvcnNcIixcbiAgICAgICAgICAgICAgICBib2R5OiBBZG1pbnNWaWV3XG4gICAgICAgICAgICB9XVxuICAgICAgICB9O1xuXG4gICAgICAgIHJldHVybiB2aWV3O1xuICAgIH1cblxuICAgIGluaXQodmlldykge1xuICAgIH1cbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NvdXJjZXMvdmlld3Mvc2V0dGluZ3MvaW5kZXguanMiLCJpbXBvcnQgeyBKZXRWaWV3IH0gZnJvbSBcIndlYml4LWpldFwiO1xuXG5pbXBvcnQgV2FsbGV0Rm9ybVZpZXcgZnJvbSBcIi4vd2FsbGV0Rm9ybVwiO1xuaW1wb3J0IFdhbGxldERldGFpbHNWaWV3IGZyb20gXCIuL3dhbGxldERldGFpbHNcIjtcbmltcG9ydCB7IHdhbGxldCB9IGZyb20gXCIuLi8uLi9zZXJ2aWNlcy93YWxsZXRcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgV2FsbGV0TWFuYWdlclZpZXcgZXh0ZW5kcyBKZXRWaWV3IHtcbiAgICBjb25maWcoKSB7XG4gICAgICAgIGNvbnN0IHdhbGxldHMgPSB7XG4gICAgICAgICAgICB2aWV3OiBcImRhdGF0YWJsZVwiLFxuICAgICAgICAgICAgaWQ6IFwid2FsbGV0c190YWJsZVwiLFxuICAgICAgICAgICAgcmVzaXplQ29sdW1uOiB0cnVlLFxuICAgICAgICAgICAgc2VsZWN0OiB0cnVlLFxuICAgICAgICAgICAgbXVsdGlzZWxlY3Q6IHRydWUsXG4gICAgICAgICAgICBjc3M6IFwid2ViaXhfaGVhZGVyX2JvcmRlciB3ZWJpeF9kYXRhX2JvcmRlclwiLFxuICAgICAgICAgICAgc2Nyb2xsOiB0cnVlLFxuICAgICAgICAgICAgYXV0b0NvbmZpZzogdHJ1ZSxcbiAgICAgICAgICAgIGNvbHVtbnM6IFt7XG4gICAgICAgICAgICAgICAgaWQ6IFwiaW5kZXhcIixcbiAgICAgICAgICAgICAgICBoZWFkZXI6IFwiI1wiLFxuICAgICAgICAgICAgICAgIHNvcnQ6IFwiaW50XCIsXG4gICAgICAgICAgICAgICAgYXV0b3dpZHRoOiB0cnVlLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBpZDogXCJuYW1lXCIsXG4gICAgICAgICAgICAgICAgaGVhZGVyOiBbXCJOYW1lXCJdLFxuICAgICAgICAgICAgICAgIHNvcnQ6IFwic3RyaW5nXCIsXG4gICAgICAgICAgICAgICAgYXV0b3dpZHRoOiB0cnVlLFxuICAgICAgICAgICAgICAgIHdpZHRoOiAxNDBcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgaWQ6IFwiYWRkcmVzc1wiLFxuICAgICAgICAgICAgICAgIGhlYWRlcjogW1wiQWRkcmVzc1wiXSxcbiAgICAgICAgICAgICAgICBzb3J0OiBcInN0cmluZ1wiLFxuICAgICAgICAgICAgICAgIGF1dG93aWR0aDogdHJ1ZSxcbiAgICAgICAgICAgICAgICB3aWR0aDogJ2F1dG8nXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBdLFxuICAgICAgICAgICAgc2NoZW1lOiB7XG4gICAgICAgICAgICAgICAgJGluaXQ6IGZ1bmN0aW9uIChvYmopIHtcbiAgICAgICAgICAgICAgICAgICAgb2JqLmluZGV4ID0gdGhpcy5jb3VudCgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgY29uc3QgdmlldyA9IHtcbiAgICAgICAgICAgIGNvbHM6IFtcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIHZpZXc6IFwidGVtcGxhdGVcIixcbiAgICAgICAgICAgICAgICAgICAgdHlwZTogXCJoZWFkZXJcIiwgdGVtcGxhdGU6IFwiV2FsbGV0c1wiLFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICB2aWV3OlwiYnV0dG9uXCIsIFxuICAgICAgICAgICAgICAgICAgICBpZDpcImJ0bl9jcmVhdGVcIiwgXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlOlwiQ3JlYXRlIFdhbGxldFwiLCBcbiAgICAgICAgICAgICAgICAgICAgY3NzOlwid2ViaXhfc2Vjb25kYXJ5XCIsIFxuICAgICAgICAgICAgICAgICAgICBpbnB1dFdpZHRoOjEyMCxcbiAgICAgICAgICAgICAgICAgICAgY2xpY2s6IGZ1bmN0aW9uICgpe1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy4kc2NvcGUuV2FsbGV0Rm9ybVZpZXcuc2hvd0Zvcm0oKVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgXVxuICAgICAgICB9O1xuXG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICByb3dzOiBbXG4gICAgICAgICAgICAgICAgdmlldyxcbiAgICAgICAgICAgICAgICB3YWxsZXRzXG4gICAgICAgICAgICBdXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBpbml0KHZpZXcpIHtcbiAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xuXG4gICAgICAgIHNlbGYud2FsbGV0c190YWJsZSA9ICQkKFwid2FsbGV0c190YWJsZVwiKTtcbiAgICAgICAgc2VsZi5XYWxsZXREZXRhaWxzVmlldyA9IHNlbGYudWkoV2FsbGV0RGV0YWlsc1ZpZXcpXG4gICAgICAgIHNlbGYuV2FsbGV0Rm9ybVZpZXcgPSBzZWxmLnVpKFdhbGxldEZvcm1WaWV3KTtcblxuICAgICAgICBzZWxmLndhbGxldHNfdGFibGUuYXR0YWNoRXZlbnQoXCJvbkl0ZW1EYmxDbGlja1wiLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBsZXQgaXRlbSA9IHNlbGYud2FsbGV0c190YWJsZS5nZXRTZWxlY3RlZEl0ZW0oKVxuICAgICAgICAgICAgd2FsbGV0Lm1hbmFnZVdhbGxldChpdGVtLm5hbWUpLnRoZW4oZGF0YSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coZGF0YS5qc29uKCkpXG4gICAgICAgICAgICAgICAgbGV0IHJlcyA9IGRhdGEuanNvbigpXG4gICAgICAgICAgICAgICAgdmFyIGluZm8gPSB7XG4gICAgICAgICAgICAgICAgICAgICduYW1lJzogaXRlbS5uYW1lLFxuICAgICAgICAgICAgICAgICAgICAnYWRkcmVzcyc6IHJlcy5hZGRyZXNzLFxuICAgICAgICAgICAgICAgICAgICAnYmFsYW5jZXMnOiByZXMuYmFsYW5jZXNcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgc2VsZi5XYWxsZXREZXRhaWxzVmlldy5zaG93SW5mbyhpbmZvKVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHVybENoYW5nZSh2aWV3LCB1cmwpIHtcbiAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgIFxuICAgICAgICBzZWxmLndhbGxldHNfdGFibGUgPSAgJCQoXCJ3YWxsZXRzX3RhYmxlXCIpO1xuICAgICAgICB3YWxsZXQuZ2V0V2FsbGV0cygpLnRoZW4oZGF0YSA9PiB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhkYXRhLmpzb24oKSlcbiAgICAgICAgICAgIHNlbGYud2FsbGV0c190YWJsZS5wYXJzZShkYXRhLmpzb24oKSlcbiAgICAgICAgfSk7XG4gICAgfVxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc291cmNlcy92aWV3cy93YWxsZXRzTWFuYWdlci9pbmRleC5qcyIsImltcG9ydCB7IEpldFZpZXcgfSBmcm9tIFwid2ViaXgtamV0XCI7XG5pbXBvcnQgeyBwYWNrYWdlcyB9IGZyb20gXCIuLi8uLi9zZXJ2aWNlcy93aWtpXCI7XG5cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgV2lraXNWaWV3IGV4dGVuZHMgSmV0VmlldyB7XG4gICAgY29uZmlnKCkge1xuICAgICAgICBjb25zdCB2aWV3ID0ge1xuICAgICAgICAgICAgdmlldzogXCJkYXRhdGFibGVcIixcbiAgICAgICAgICAgIGlkOiBcIndpa2lzX3RhYmxlXCIsXG4gICAgICAgICAgICByZXNpemVDb2x1bW46IHRydWUsXG4gICAgICAgICAgICBzZWxlY3Q6IHRydWUsXG4gICAgICAgICAgICBtdWx0aXNlbGVjdDogdHJ1ZSxcbiAgICAgICAgICAgIGNzczogXCJ3ZWJpeF9oZWFkZXJfYm9yZGVyIHdlYml4X2RhdGFfYm9yZGVyXCIsXG4gICAgICAgICAgICBjb2x1bW5zOiBbe1xuICAgICAgICAgICAgICAgIGlkOiBcImluZGV4XCIsXG4gICAgICAgICAgICAgICAgaGVhZGVyOiBcIiNcIixcbiAgICAgICAgICAgICAgICBzb3J0OiBcImludFwiLFxuICAgICAgICAgICAgICAgIGF1dG93aWR0aDogdHJ1ZSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgaWQ6IFwibmFtZVwiLFxuICAgICAgICAgICAgICAgIGhlYWRlcjogXCJQYWNrYWdlXCIsXG4gICAgICAgICAgICAgICAgc29ydDogXCJzdHJpbmdcIixcbiAgICAgICAgICAgICAgICB3aWR0aDogMzAwXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGlkOiBcImFjdGlvbnNcIixcbiAgICAgICAgICAgICAgICBoZWFkZXI6IFwiQWN0aW9uc1wiLFxuICAgICAgICAgICAgICAgIHNvcnQ6IFwic3RyaW5nXCIsXG4gICAgICAgICAgICAgICAgd2lkdGg6IDIwMCxcbiAgICAgICAgICAgICAgICB0ZW1wbGF0ZTpmdW5jdGlvbihvYmopeyBcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFwiPGRpdiBjbGFzcz0nd2ViaXhfZWxfYnV0dG9uJz48YnV0dG9uIGNsYXNzPSdidG5fdmlldyc+IFZpZXcgPC9idXR0b24+PC9kaXY+XCI7XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIH1dLFxuICAgICAgICAgICAgb25DbGljazp7XG4gICAgICAgICAgICAgICAgYnRuX3ZpZXc6ZnVuY3Rpb24oZXYsIGlkKXtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGl0ZW0gPSB0aGlzLmdldEl0ZW0oaWQpO1xuICAgICAgICAgICAgICAgICAgICB3aW5kb3cubG9jYXRpb24uaHJlZiA9IGAvYWRtaW4vIyEvbWFpbi93aWtpcy52aWV3P25hbWU9JHtpdGVtLm5hbWV9YFxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGF1dG9Db25maWc6IHRydWUsXG4gICAgICAgICAgICBzY2hlbWU6IHtcbiAgICAgICAgICAgICAgICAkaW5pdDogZnVuY3Rpb24gKG9iaikge1xuICAgICAgICAgICAgICAgICAgICBvYmouaW5kZXggPSB0aGlzLmNvdW50KCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgfTtcblxuICAgICAgICByZXR1cm4gdmlldztcbiAgICB9XG5cbiAgICBpbml0KHZpZXcpIHtcbiAgICAgICAgcGFja2FnZXMubGlzdCgpLnRoZW4oZGF0YSA9PiB7XG4gICAgICAgICAgICB2aWV3LnBhcnNlKGRhdGEuanNvbigpKVxuICAgICAgICB9KTtcbiAgICB9XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zb3VyY2VzL3ZpZXdzL3dpa2lzL2luZGV4LmpzIiwiaW1wb3J0IHsgSmV0VmlldyB9IGZyb20gXCJ3ZWJpeC1qZXRcIjtcblxuaW1wb3J0IHsgYW5zaVVwIH0gZnJvbSBcIi4uLy4uL2NvbW1vbi9jb2xvcnNcIjtcbmltcG9ydCB7IExFVkVMUywgU1RBVEVTLCBUWVBFUyB9IGZyb20gXCIuL2RhdGFcIjtcbmltcG9ydCB7IGRhdGVGb3JtYXR0ZXIgfSBmcm9tIFwiLi4vLi4vY29tbW9uL2Zvcm1hdHRlcnNcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQWxlcnRWaWV3IGV4dGVuZHMgSmV0VmlldyB7XG4gICAgY29uZmlnKCkge1xuICAgICAgICBjb25zdCBpbmZvID0ge1xuICAgICAgICAgICAgdmlldzogXCJmb3JtXCIsXG4gICAgICAgICAgICBpZDogXCJmb3JtXCIsXG4gICAgICAgICAgICBlbGVtZW50c0NvbmZpZzogeyBsYWJlbFdpZHRoOiAxNDAgfSxcbiAgICAgICAgICAgIGVsZW1lbnRzOiBbXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICB2aWV3OiBcInRleHRcIixcbiAgICAgICAgICAgICAgICAgICAgbGFiZWw6IFwiSURcIixcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJpZGVudGlmaWVyXCIsXG4gICAgICAgICAgICAgICAgICAgIHJlYWRvbmx5OiB0cnVlXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIHZpZXc6IFwidGV4dFwiLFxuICAgICAgICAgICAgICAgICAgICBsYWJlbDogXCJUeXBlXCIsXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiYWxlcnRfdHlwZVwiLFxuICAgICAgICAgICAgICAgICAgICByZWFkb25seTogdHJ1ZVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICB2aWV3OiBcInRleHRcIixcbiAgICAgICAgICAgICAgICAgICAgbGFiZWw6IFwiU3RhdHVzXCIsXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwic3RhdHVzXCIsXG4gICAgICAgICAgICAgICAgICAgIHJlYWRvbmx5OiB0cnVlXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIHZpZXc6IFwidGV4dFwiLFxuICAgICAgICAgICAgICAgICAgICBsYWJlbDogXCJMZXZlbFwiLFxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImxldmVsXCIsXG4gICAgICAgICAgICAgICAgICAgIHJlYWRvbmx5OiB0cnVlXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIHZpZXc6IFwidGV4dFwiLFxuICAgICAgICAgICAgICAgICAgICBsYWJlbDogXCJDb3VudFwiLFxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImNvdW50XCIsXG4gICAgICAgICAgICAgICAgICAgIHJlYWRvbmx5OiB0cnVlXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIHZpZXc6IFwidGV4dFwiLFxuICAgICAgICAgICAgICAgICAgICBsYWJlbDogXCJDYXRlZ29yeVwiLFxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImNhdFwiLFxuICAgICAgICAgICAgICAgICAgICByZWFkb25seTogdHJ1ZVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICB2aWV3OiBcInRleHRcIixcbiAgICAgICAgICAgICAgICAgICAgbGFiZWw6IFwiRmlyc3QgdGltZVwiLFxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcInRpbWVfZmlyc3RcIixcbiAgICAgICAgICAgICAgICAgICAgcmVhZG9ubHk6IHRydWVcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgdmlldzogXCJ0ZXh0XCIsXG4gICAgICAgICAgICAgICAgICAgIGxhYmVsOiBcIkxhc3QgdGltZVwiLFxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcInRpbWVfbGFzdFwiLFxuICAgICAgICAgICAgICAgICAgICByZWFkb25seTogdHJ1ZVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICB2aWV3OiBcInRleHRcIixcbiAgICAgICAgICAgICAgICAgICAgbGFiZWw6IFwiTWVzc2FnZSAocHViKVwiLFxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcInB1YmxpY1wiLFxuICAgICAgICAgICAgICAgICAgICByZWFkb25seTogdHJ1ZSxcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgXVxuICAgICAgICB9O1xuXG4gICAgICAgIGNvbnN0IHRhYiA9IHtcbiAgICAgICAgICAgIHZpZXc6IFwidGFidmlld1wiLFxuICAgICAgICAgICAgY2VsbHM6IFtcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIGhlYWRlcjogXCJJbmZvcm1hdGlvblwiLFxuICAgICAgICAgICAgICAgICAgICBib2R5OiBpbmZvLFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBoZWFkZXI6IFwiTWVzc2FnZVwiLFxuICAgICAgICAgICAgICAgICAgICBib2R5OiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZDogXCJtZXNzYWdlXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICB2aWV3OiBcInRlbXBsYXRlXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICB0ZW1wbGF0ZTogXCJcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIHNjcm9sbDogXCJhdXRvXCIsXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgaGVhZGVyOiBcIlRyYWNlYmFja3NcIixcbiAgICAgICAgICAgICAgICAgICAgYm9keToge1xuICAgICAgICAgICAgICAgICAgICAgICAgcm93czogW1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmlldzogXCJ0YWJiYXJcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWQ6IFwidGJfdGFic1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtdWx0aXZpZXc6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9wdGlvbnM6IFtdXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZpZXc6IFwibXVsdGl2aWV3XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlkOiBcInRiX3ZpZXdzXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNlbGxzOiBbXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGVtcGxhdGU6IFwiXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBpZDogXCJsb2dzXCIsXG4gICAgICAgICAgICAgICAgICAgIHZpZXc6IFwiZGF0YXRhYmxlXCIsXG4gICAgICAgICAgICAgICAgICAgIHJlc2l6ZUNvbHVtbjogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgc2VsZWN0OiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICBtdWx0aXNlbGVjdDogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgY3NzOiBcIndlYml4X2hlYWRlcl9ib3JkZXIgd2ViaXhfZGF0YV9ib3JkZXJcIixcbiAgICAgICAgICAgICAgICAgICAgc2Nyb2xsOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICBhdXRvQ29uZmlnOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICBjb2x1bW5zOiBbXG4gICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWQ6IFwiaW5kZXhcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBoZWFkZXI6IFwiI1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNvcnQ6IFwiaW50XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYXV0b3dpZHRoOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdpZHRoOiA2MFxuICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZDogXCJ0aHJlZWJvdF9uYW1lXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaGVhZGVyOiBcIlRocmVlYm90IE5hbWVcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzb3J0OiBcInN0cmluZ1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdpZHRoOiAxODBcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWQ6IFwiYXBwX25hbWVcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBoZWFkZXI6IFwiQXBwIE5hbWVcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzb3J0OiBcInN0cmluZ1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdpZHRoOiAxODBcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWQ6IFwibGF0ZXN0X2xvZ2lkXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaGVhZGVyOiBcIkxhdGVzdCBMb2cjXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc29ydDogXCJpbnRcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aWR0aDogMTgwXG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgICAgIHNjaGVtZToge1xuICAgICAgICAgICAgICAgICAgICAgICAgJGluaXQ6IGZ1bmN0aW9uIChvYmopIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvYmouaW5kZXggPSB0aGlzLmNvdW50KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgXVxuICAgICAgICB9O1xuXG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICB2aWV3OiBcIndpbmRvd1wiLFxuICAgICAgICAgICAgaGVhZDogXCJBbGVydFwiLFxuICAgICAgICAgICAgbW9kYWw6IHRydWUsXG4gICAgICAgICAgICB3aWR0aDogNjAwLFxuICAgICAgICAgICAgaGVpZ2h0OiA4MDAsXG4gICAgICAgICAgICBwb3NpdGlvbjogXCJjZW50ZXJcIixcbiAgICAgICAgICAgIGJvZHk6IHtcbiAgICAgICAgICAgICAgICByb3dzOiBbXG4gICAgICAgICAgICAgICAgICAgIHRhYixcbiAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmlldzogXCJidXR0b25cIixcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlOiBcIk9LXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBjc3M6IFwid2ViaXhfcHJpbWFyeVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgY2xpY2s6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmdldFRvcFBhcmVudFZpZXcoKS5oaWRlKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cblxuICAgIGluaXQoKSB7XG4gICAgICAgIHZhciBzZWxmID0gdGhpcztcbiAgICAgICAgdGhpcy5mb3JtID0gJCQoXCJmb3JtXCIpO1xuICAgICAgICB0aGlzLm1lc3NhZ2UgPSAkJChcIm1lc3NhZ2VcIik7XG4gICAgICAgIHRoaXMubG9ncyA9ICQkKFwibG9nc1wiKTtcblxuICAgICAgICB0aGlzLnRiVmlld3MgPSAkJChcInRiX3ZpZXdzXCIpO1xuICAgICAgICB0aGlzLnRiVGFicyA9ICQkKFwidGJfdGFic1wiKTtcblxuICAgICAgICB0aGlzLmxvZ3MuYXR0YWNoRXZlbnQoXCJvbkl0ZW1EYmxDbGlja1wiLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBsZXQgbG9nRGF0YSA9IHNlbGYubG9ncy5nZXRTZWxlY3RlZEl0ZW0oKVxuICAgICAgICAgICAgdGhpcy4kc2NvcGUuc2hvdyhgL21haW4vbG9ncz9hcHBuYW1lPSR7bG9nRGF0YS5hcHBfbmFtZX0mbG9naWQ9JHtsb2dEYXRhLmxhdGVzdF9sb2dpZH1gKVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBhZGRUcmFjZWJhY2sodGIpIHtcbiAgICAgICAgY29uc3QgdGJJZCA9IGAke3RiLnRocmVlYm90X25hbWV9XyR7dGIucHJvY2Vzc19pZH1gO1xuICAgICAgICBjb25zdCB0YlRpdGxlID0gYCR7dGIudGhyZWVib3RfbmFtZX0gLSBQSUQ6ICgke3RiLnByb2Nlc3NfaWR9KWA7XG5cbiAgICAgICAgdGhpcy50YlZpZXdzLmFkZFZpZXcoe1xuICAgICAgICAgICAgdmlldzogXCJ0ZW1wbGF0ZVwiLFxuICAgICAgICAgICAgaWQ6IHRiSWQsXG4gICAgICAgICAgICBzY3JvbGw6IFwieHlcIixcbiAgICAgICAgICAgIHRlbXBsYXRlOiBgPHA+JHthbnNpVXAuYW5zaV90b19odG1sKHRiLmZvcm1hdHRlZCl9PC9wPmBcbiAgICAgICAgfSk7XG5cbiAgICAgICAgdGhpcy50YlRhYnMuYWRkT3B0aW9uKHRiSWQsIHRiVGl0bGUsIHRydWUpO1xuICAgIH1cblxuICAgIGNsZWFyVHJhY2VCYWNrcygpIHtcbiAgICAgICAgbGV0IGlkID0gdGhpcy50YlRhYnMuZ2V0VmFsdWUoKTtcblxuICAgICAgICB3aGlsZSAoaWQpIHtcbiAgICAgICAgICAgIHRoaXMudGJUYWJzLnJlbW92ZU9wdGlvbihpZCk7XG4gICAgICAgICAgICB0aGlzLnRiVmlld3MucmVtb3ZlVmlldyhpZCk7XG5cbiAgICAgICAgICAgIGlkID0gdGhpcy50YlRhYnMuZ2V0VmFsdWUoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHNob3dGb3IoaXRlbSkge1xuICAgICAgICBsZXQgdmFsdWVzID0gT2JqZWN0LmFzc2lnbih7fSwgaXRlbSk7XG5cbiAgICAgICAgdmFsdWVzLmFsZXJ0X3R5cGUgPSBUWVBFU1tpdGVtLmFsZXJ0X3R5cGVdO1xuICAgICAgICB2YWx1ZXMuc3RhdHVzID0gU1RBVEVTW2l0ZW0uc3RhdHVzXTtcbiAgICAgICAgdmFsdWVzLmxldmVsID0gTEVWRUxTW2l0ZW0ubGV2ZWxdO1xuICAgICAgICB2YWx1ZXMudGltZV9maXJzdCA9IGRhdGVGb3JtYXR0ZXIoaXRlbS50aW1lX2ZpcnN0KTtcbiAgICAgICAgdmFsdWVzLnRpbWVfbGFzdCA9IGRhdGVGb3JtYXR0ZXIoaXRlbS50aW1lX2xhc3QpO1xuICAgICAgICB0aGlzLmZvcm0uc2V0VmFsdWVzKHZhbHVlcyk7XG5cbiAgICAgICAgdGhpcy5tZXNzYWdlLnNldEhUTUwoYDxwPiR7YW5zaVVwLmFuc2lfdG9faHRtbChpdGVtLm1lc3NhZ2UpfTwvcD5gKTtcblxuICAgICAgICB0aGlzLmNsZWFyVHJhY2VCYWNrcygpO1xuXG4gICAgICAgIGZvciAobGV0IHRiIG9mIGl0ZW0udHJhY2ViYWNrcykge1xuICAgICAgICAgICAgdGhpcy5hZGRUcmFjZWJhY2sodGIpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5sb2dzLmNsZWFyQWxsKClcbiAgICAgICAgdGhpcy5sb2dzLnBhcnNlKGl0ZW0ubG9ncyk7XG5cbiAgICAgICAgdGhpcy5nZXRSb290KCkuc2hvdygpO1xuICAgIH1cbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NvdXJjZXMvdmlld3MvYWxlcnRzL2FsZXJ0LmpzIiwiaW1wb3J0IHsgU2VydmljZSB9IGZyb20gXCIuLi9jb21tb24vYXBpXCI7XG5cbmNvbnN0IEJBU0VfVVJMID0gXCIvemVyb2JvdC9hZG1pbi9hY3RvcnMvYWRtaW5cIjtcblxuY2xhc3MgQWRtaW5TZXJ2aWNlIGV4dGVuZHMgU2VydmljZSB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHN1cGVyKEJBU0VfVVJMKTtcbiAgICB9XG5cbiAgICBsaXN0KCkge1xuICAgICAgICByZXR1cm4gdGhpcy5nZXRDYWxsKFwiYWRtaW5fbGlzdFwiKTtcbiAgICB9XG5cblxuICAgIGFkZChuYW1lKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnBvc3RDYWxsKFwiYWRtaW5fYWRkXCIsIHtcbiAgICAgICAgICAgIFwibmFtZVwiOiBuYW1lXG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGRlbGV0ZShuYW1lKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnBvc3RDYWxsKFwiYWRtaW5fZGVsZXRlXCIsIHtcbiAgICAgICAgICAgIFwibmFtZVwiOiBuYW1lXG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGdldF9leHBsb3JlcigpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0Q2FsbCgnZ2V0X2V4cGxvcmVyJyk7XG4gICAgfVxuXG4gICAgc2V0X2V4cGxvcmVyKHR5cGUpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucG9zdENhbGwoJ3NldF9leHBsb3JlcicsIHtcbiAgICAgICAgICAgIGV4cGxvcmVyX3R5cGU6IHR5cGVcbiAgICAgICAgfSlcbiAgICB9XG59XG5cbmV4cG9ydCBjb25zdCBhZG1pbiA9IG5ldyBBZG1pblNlcnZpY2UoKTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NvdXJjZXMvc2VydmljZXMvYWRtaW4uanMiLCJpbXBvcnQgeyBTZXJ2aWNlIH0gZnJvbSBcIi4uL2NvbW1vbi9hcGlcIjtcblxuY29uc3QgQkFTRV9VUkwgPSBcIi90ZmdyaWQvdGFpZ2EvYWN0b3JzL3RhaWdhXCI7XG5cblxuY2xhc3MgVGFpZ2FTZXJ2aWNlIGV4dGVuZHMgU2VydmljZSB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHN1cGVyKEJBU0VfVVJMKTtcbiAgICB9XG5cbiAgICB1c2VyQ2lyY2xlcyh1c2VybmFtZSkge1xuICAgICAgICByZXR1cm4gdGhpcy5wb3N0Q2FsbChcImdldF91c2VyX2NpcmNsZXNcIiwgeyB1c2VybmFtZTogdXNlcm5hbWUsIG91dHB1dF90eXBlOiBcImpzb25cIiB9KTtcbiAgICB9XG5cbiAgICB1c2VyU3Rvcmllcyh1c2VybmFtZSkge1xuICAgICAgICByZXR1cm4gdGhpcy5wb3N0Q2FsbChcImdldF91c2VyX3N0b3JpZXNcIiwgeyB1c2VybmFtZTogdXNlcm5hbWUsIG91dHB1dF90eXBlOiBcImpzb25cIiB9KTtcbiAgICB9XG5cbiAgICB1c2VyVGFza3ModXNlcm5hbWUpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucG9zdENhbGwoXCJnZXRfdXNlcl90YXNrc1wiLCB7IHVzZXJuYW1lOiB1c2VybmFtZSwgb3V0cHV0X3R5cGU6IFwianNvblwiIH0pO1xuICAgIH1cblxufVxuXG5cbmV4cG9ydCBjb25zdCB0YWlnYSA9IG5ldyBUYWlnYVNlcnZpY2UoKTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NvdXJjZXMvc2VydmljZXMvdGFpZ2EuanMiLCJpbXBvcnQge1xuICAgIEpldFZpZXdcbn0gZnJvbSBcIndlYml4LWpldFwiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBQcm9jZXNzZXNDaGlsZFZpZXcgZXh0ZW5kcyBKZXRWaWV3IHtcblxuICAgIGNvbmZpZygpIHtcbiAgICAgICAgY29uc3QgdmlldyA9IHtcbiAgICAgICAgICAgIHZpZXc6IFwiZGF0YXRhYmxlXCIsXG4gICAgICAgICAgICBpZDogXCJwcm9jZXNzX3RhYmxlXCIsXG4gICAgICAgICAgICByZXNpemVDb2x1bW46IHRydWUsXG4gICAgICAgICAgICBzZWxlY3Q6IHRydWUsXG4gICAgICAgICAgICBtdWx0aXNlbGVjdDogdHJ1ZSxcbiAgICAgICAgICAgIGNzczogXCJ3ZWJpeF9oZWFkZXJfYm9yZGVyIHdlYml4X2RhdGFfYm9yZGVyXCIsXG4gICAgICAgICAgICBzY3JvbGw6IHRydWUsXG4gICAgICAgICAgICBhdXRvQ29uZmlnOiB0cnVlLFxuICAgICAgICAgICAgY29sdW1uczogW3tcbiAgICAgICAgICAgICAgICAgICAgaWQ6IFwiaW5kZXhcIixcbiAgICAgICAgICAgICAgICAgICAgaGVhZGVyOiBcIiNcIixcbiAgICAgICAgICAgICAgICAgICAgc29ydDogXCJpbnRcIixcbiAgICAgICAgICAgICAgICAgICAgYXV0b3dpZHRoOiB0cnVlLFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBpZDogXCJuYW1lXCIsXG4gICAgICAgICAgICAgICAgICAgIGhlYWRlcjogW1xuICAgICAgICAgICAgICAgICAgICAgICAgXCJQcm9jY2Vzc1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRlbnQ6IFwidGV4dEZpbHRlclwiXG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgICAgICBzb3J0OiBcInN0cmluZ1wiLFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBpZDogXCJwaWRcIixcbiAgICAgICAgICAgICAgICAgICAgaGVhZGVyOiBcIlBJRFwiLFxuICAgICAgICAgICAgICAgICAgICBzb3J0OiBcImludFwiXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIGlkOiBcInVzZXJuYW1lXCIsXG4gICAgICAgICAgICAgICAgICAgIGhlYWRlcjogXCJVc2VybmFtZVwiLFxuICAgICAgICAgICAgICAgICAgICBzb3J0OiBcInN0cmluZ1wiXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIGlkOiBcInJzc1wiLFxuICAgICAgICAgICAgICAgICAgICBoZWFkZXI6IFwiTWVtb3J5IFVzYWdlXCIsXG4gICAgICAgICAgICAgICAgICAgIHNvcnQ6IFwiaW50XCIsXG4gICAgICAgICAgICAgICAgICAgIGZvcm1hdDogZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gTWF0aC5jZWlsKHZhbHVlKVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIF0sXG4gICAgICAgICAgICBzY2hlbWU6IHtcbiAgICAgICAgICAgICAgICAkaW5pdDogZnVuY3Rpb24gKG9iaikge1xuICAgICAgICAgICAgICAgICAgICBvYmouaW5kZXggPSB0aGlzLmNvdW50KCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICB2aWV3OiBcIndpbmRvd1wiLFxuICAgICAgICAgICAgaGVhZDogXCJSdW5uaW5nIFByb2Nlc3NlcywgTWVtb3J5IHVzYWdlIGluIE1CXCIsXG4gICAgICAgICAgICBtb2RhbDogdHJ1ZSxcbiAgICAgICAgICAgIHdpZHRoOiA1NTAsXG4gICAgICAgICAgICBoZWlnaHQ6IDYwMCxcbiAgICAgICAgICAgIHBvc2l0aW9uOiBcImNlbnRlclwiLFxuICAgICAgICAgICAgYm9keToge1xuICAgICAgICAgICAgICAgIHJvd3M6IFtcbiAgICAgICAgICAgICAgICAgICAgdmlldyxcbiAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmlldzogXCJidXR0b25cIixcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlOiBcIk9LXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBjc3M6IFwid2ViaXhfcHJpbWFyeVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgY2xpY2s6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmdldFRvcFBhcmVudFZpZXcoKS5oaWRlKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfVxuICAgIH1cblxuICAgIHNob3dGb3IoZGF0YSkge1xuICAgICAgICB0aGlzLnRhYmxlLnBhcnNlKGRhdGEpXG4gICAgICAgIHRoaXMuZ2V0Um9vdCgpLnNob3coKTtcbiAgICB9XG5cbiAgICBpbml0KCkge1xuICAgICAgICB0aGlzLnRhYmxlID0gJCQoXCJwcm9jZXNzX3RhYmxlXCIpO1xuICAgIH1cbn1cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zb3VyY2VzL3ZpZXdzL2Rhc2gvcHJvY2Vzc2VzQ2hpbGRWaWV3LmpzIiwiaW1wb3J0IHsgSmV0VmlldyB9IGZyb20gXCJ3ZWJpeC1qZXRcIjtcblxuaW1wb3J0IHsgYW5zaVVwIH0gZnJvbSBcIi4uLy4uL2NvbW1vbi9jb2xvcnNcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUmVzZXJ2YXRpb25WaWV3IGV4dGVuZHMgSmV0VmlldyB7XG4gICAgY29uZmlnKCkge1xuICAgICAgICBjb25zdCBpbmZvID0ge1xuICAgICAgICAgICAgdmlldzogXCJmb3JtXCIsXG4gICAgICAgICAgICBpZDogXCJmb3JtXCIsXG4gICAgICAgICAgICBlbGVtZW50c0NvbmZpZzogeyBsYWJlbFdpZHRoOiAxNDAgfSxcbiAgICAgICAgICAgIGVsZW1lbnRzOiBbXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICB2aWV3OiBcInRleHRcIixcbiAgICAgICAgICAgICAgICAgICAgbGFiZWw6IFwiSURcIixcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJpZFwiLFxuICAgICAgICAgICAgICAgICAgICByZWFkb25seTogdHJ1ZVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICB2aWV3OiBcInRleHRcIixcbiAgICAgICAgICAgICAgICAgICAgbGFiZWw6IFwiQ3VzdG9tZXIgdGlkXCIsXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiY3VzdG9tZXJfdGlkXCIsXG4gICAgICAgICAgICAgICAgICAgIHJlYWRvbmx5OiB0cnVlXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIHZpZXc6IFwidGV4dFwiLFxuICAgICAgICAgICAgICAgICAgICBsYWJlbDogXCJOZXh0IGFjdGlvblwiLFxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcIm5leHRfYWN0aW9uXCIsXG4gICAgICAgICAgICAgICAgICAgIHJlYWRvbmx5OiB0cnVlXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIHZpZXc6IFwidGV4dFwiLFxuICAgICAgICAgICAgICAgICAgICBsYWJlbDogXCJleHBpcmF0aW9uXCIsXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiZXhwaXJhdGlvblwiLFxuICAgICAgICAgICAgICAgICAgICByZWFkb25seTogdHJ1ZVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIF1cbiAgICAgICAgfTtcblxuICAgICAgICBjb25zdCB0YWIgPSB7XG4gICAgICAgICAgICB2aWV3OiBcInRhYnZpZXdcIixcbiAgICAgICAgICAgIGlkOiBcInRhYnZpZXdcIixcbiAgICAgICAgICAgIGNlbGxzOiBbXG4gICAgICAgICAgICAgICAge1xuXG4gICAgICAgICAgICAgICAgICAgIGhlYWRlcjogXCJPdmVydmlld1wiLFxuICAgICAgICAgICAgICAgICAgICByb3dzOiBbXG4gICAgICAgICAgICAgICAgICAgICAgICBpbmZvLFxuICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZpZXc6IFwibGlzdFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxhYmVsOiBcIkZvcm0gaW5wdXRzXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJGb3JtIGlucHV0c1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhdGE6IFt7IFwidGl0bGVcIjogXCJGb3JtIGlucHV0c1wiIH1dLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRlbXBsYXRlOiBcIjxiPiAjdGl0bGUjIDxiPlwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGF1dG9oZWlnaHQ6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVhZG9ubHk6IHRydWVcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWQ6IFwiZm9ybUluZm9cIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2aWV3OiBcImxpc3RcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0ZW1wbGF0ZTogXCI8Yj4ja2V5IyA8L2I+ICA6ICAgI3ZhbHVlI1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNjcm9sbDogXCJhdXRvXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIF1cblxuXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIGlkOiBcIm5ldHdvcmtzXCIsXG4gICAgICAgICAgICAgICAgICAgIGhlYWRlcjogXCJOZXR3b3Jrc1wiLFxuICAgICAgICAgICAgICAgICAgICB2aWV3OiBcImRhdGF0YWJsZVwiLFxuICAgICAgICAgICAgICAgICAgICByZXNpemVDb2x1bW46IHRydWUsXG4gICAgICAgICAgICAgICAgICAgIHNlbGVjdDogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgbXVsdGlzZWxlY3Q6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgIGNzczogXCJ3ZWJpeF9oZWFkZXJfYm9yZGVyIHdlYml4X2RhdGFfYm9yZGVyXCIsXG4gICAgICAgICAgICAgICAgICAgIHNjcm9sbDogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgYXV0b0NvbmZpZzogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgY29sdW1uczogW1xuICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlkOiBcImluZGV4XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaGVhZGVyOiBcIiNcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzb3J0OiBcImludFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGF1dG93aWR0aDogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aWR0aDogNjBcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWQ6IFwibmV0d29ya19uYW1lXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaGVhZGVyOiBcIk5hbWVcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzb3J0OiBcInN0cmluZ1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdpZHRoOiAxODBcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWQ6IFwiaXBfcmFuZ2VcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBoZWFkZXI6IFwiSXAgcmFuZ2VcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzb3J0OiBcInN0cmluZ1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdpZHRoOiAxODBcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWQ6IFwiZmFybWVyX3RpZFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhlYWRlcjogXCJGYXJtZXJcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzb3J0OiBcInN0cmluZ1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdpZHRoOiAxODBcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICAgICAgc2NoZW1lOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAkaW5pdDogZnVuY3Rpb24gKG9iaikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9iai5uZXR3b3JrX25hbWUgPSBvYmoubmFtZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvYmouaXBfcmFuZ2UgPSBvYmouaXByYW5nZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvYmouZmFybWVyX3RpZCA9IG9iai5mYXJtZXJfdGlkO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9iai5pbmRleCA9IHRoaXMuY291bnQoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSwgb246IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG9uQWZ0ZXJMb2FkOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCF0aGlzLmNvdW50KCkpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2hvd092ZXJsYXkoXCJObyBuZXR3b3JrcyBpbiByZXNlcnZhdGlvblwiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuaGlkZU92ZXJsYXkoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBpZDogXCJjb250YWluZXJzXCIsXG4gICAgICAgICAgICAgICAgICAgIGhlYWRlcjogXCJDb250YWluZXJzXCIsXG4gICAgICAgICAgICAgICAgICAgIHZpZXc6IFwiZGF0YXRhYmxlXCIsXG4gICAgICAgICAgICAgICAgICAgIHJlc2l6ZUNvbHVtbjogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgc2VsZWN0OiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICBtdWx0aXNlbGVjdDogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgY3NzOiBcIndlYml4X2hlYWRlcl9ib3JkZXIgd2ViaXhfZGF0YV9ib3JkZXJcIixcbiAgICAgICAgICAgICAgICAgICAgc2Nyb2xsOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICBhdXRvQ29uZmlnOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICBjb2x1bW5zOiBbXG4gICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWQ6IFwiaW5kZXhcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBoZWFkZXI6IFwiI1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNvcnQ6IFwiaW50XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYXV0b3dpZHRoOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdpZHRoOiA2MFxuICAgICAgICAgICAgICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlkOiBcIm5vZGVfaWRcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBoZWFkZXI6IFwiTm9kZSBpZFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNvcnQ6IFwic3RyaW5nXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYXV0b3dpZHRoOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdpZHRoOiAxODBcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZDogXCJmbGlzdFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhlYWRlcjogXCJGbGlzdFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNvcnQ6IFwic3RyaW5nXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYXV0b3dpZHRoOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdpZHRoOiAxODBcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZDogXCJlbnRyeXBvaW50XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaGVhZGVyOiBcIkVudHJ5cG9pbnRcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzb3J0OiBcInN0cmluZ1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGF1dG93aWR0aDogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aWR0aDogMTgwXG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlkOiBcImh1Yl91cmxcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBoZWFkZXI6IFwiSHViIHVybFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNvcnQ6IFwic3RyaW5nXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYXV0b3dpZHRoOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdpZHRoOiAxODBcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZDogXCJpbnRlcmFjdGl2ZVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhlYWRlcjogXCJJbnRlcmFjdGl2ZVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNvcnQ6IFwic3RyaW5nXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYXV0b3dpZHRoOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdpZHRoOiAxODBcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZDogXCJmYXJtZXJfdGlkXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaGVhZGVyOiBcIkZhcm1lcl90aWRcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzb3J0OiBcInN0cmluZ1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGF1dG93aWR0aDogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aWR0aDogMTgwXG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxuXG4gICAgICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgICAgIHNjaGVtZToge1xuICAgICAgICAgICAgICAgICAgICAgICAgJGluaXQ6IGZ1bmN0aW9uIChvYmopIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvYmoubm9kZV9pZCA9IG9iai5ub2RlX2lkO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9iai5mbGlzdCA9IG9iai5mbGlzdDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvYmouZW50cnlwb2ludCA9IG9iai5lbnRyeXBvaW50O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9iai5odWJfdXJsID0gb2JqLmh1Yl91cmw7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb2JqLmludGVyYWN0aXZlID0gb2JqLmludGVyYWN0aXZlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9iai5mYXJtZXJfdGlkID0gb2JqLmZhcm1lcl90aWQ7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb2JqLmluZGV4ID0gdGhpcy5jb3VudCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9LCBvbjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgb25BZnRlckxvYWQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoIXRoaXMuY291bnQoKSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zaG93T3ZlcmxheShcIk5vIGNvbnRhaW5lcnMgaW4gcmVzZXJ2YXRpb25cIik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmhpZGVPdmVybGF5KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgaWQ6IFwidm9sdW1lc1wiLFxuICAgICAgICAgICAgICAgICAgICBoZWFkZXI6IFwiVm9sdW1lc1wiLFxuICAgICAgICAgICAgICAgICAgICB2aWV3OiBcImRhdGF0YWJsZVwiLFxuICAgICAgICAgICAgICAgICAgICByZXNpemVDb2x1bW46IHRydWUsXG4gICAgICAgICAgICAgICAgICAgIHNlbGVjdDogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgbXVsdGlzZWxlY3Q6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgIGNzczogXCJ3ZWJpeF9oZWFkZXJfYm9yZGVyIHdlYml4X2RhdGFfYm9yZGVyXCIsXG4gICAgICAgICAgICAgICAgICAgIHNjcm9sbDogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgYXV0b0NvbmZpZzogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgY29sdW1uczogW1xuICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlkOiBcImluZGV4XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaGVhZGVyOiBcIiNcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzb3J0OiBcImludFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGF1dG93aWR0aDogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aWR0aDogNjBcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZDogXCJub2RlX2lkXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaGVhZGVyOiBcIk5vZGUgaWRcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzb3J0OiBcInN0cmluZ1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGF1dG93aWR0aDogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aWR0aDogMTgwXG4gICAgICAgICAgICAgICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWQ6IFwic2l6ZVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhlYWRlcjogXCJTaXplXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc29ydDogXCJzdHJpbmdcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhdXRvd2lkdGg6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDE4MFxuICAgICAgICAgICAgICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlkOiBcInR5cGVcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBoZWFkZXI6IFwiVHlwZVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNvcnQ6IFwic3RyaW5nXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYXV0b3dpZHRoOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdpZHRoOiAxODBcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZDogXCJmYXJtZXJfdGlkXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaGVhZGVyOiBcIkZhcm1lcl90aWRcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzb3J0OiBcInN0cmluZ1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGF1dG93aWR0aDogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aWR0aDogMTgwXG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxuXG4gICAgICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgICAgIHNjaGVtZToge1xuICAgICAgICAgICAgICAgICAgICAgICAgJGluaXQ6IGZ1bmN0aW9uIChvYmopIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvYmoubm9kZV9pZCA9IG9iai5ub2RlX2lkO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9iai5zaXplID0gb2JqLnNpemU7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb2JqLnR5cGUgPSBvYmoudHlwZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvYmouZmFybWVyX3RpZCA9IG9iai5mYXJtZXJfdGlkO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9iai5pbmRleCA9IHRoaXMuY291bnQoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSwgb246IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG9uQWZ0ZXJMb2FkOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCF0aGlzLmNvdW50KCkpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2hvd092ZXJsYXkoXCJObyB2b2x1bWVzIGluIHJlc2VydmF0aW9uXCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5oaWRlT3ZlcmxheSgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgICAgICBpZDogXCJ6ZGJzXCIsXG4gICAgICAgICAgICAgICAgICAgIGhlYWRlcjogXCJaZGJzXCIsXG4gICAgICAgICAgICAgICAgICAgIHZpZXc6IFwiZGF0YXRhYmxlXCIsXG4gICAgICAgICAgICAgICAgICAgIHJlc2l6ZUNvbHVtbjogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgc2VsZWN0OiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICBtdWx0aXNlbGVjdDogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgY3NzOiBcIndlYml4X2hlYWRlcl9ib3JkZXIgd2ViaXhfZGF0YV9ib3JkZXJcIixcbiAgICAgICAgICAgICAgICAgICAgc2Nyb2xsOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICBhdXRvQ29uZmlnOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICBjb2x1bW5zOiBbXG4gICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWQ6IFwiaW5kZXhcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBoZWFkZXI6IFwiI1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNvcnQ6IFwiaW50XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYXV0b3dpZHRoOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdpZHRoOiA2MFxuICAgICAgICAgICAgICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlkOiBcIm5vZGVfaWRcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBoZWFkZXI6IFwiTm9kZSBpZFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNvcnQ6IFwic3RyaW5nXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYXV0b3dpZHRoOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdpZHRoOiAxODBcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZDogXCJzaXplXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaGVhZGVyOiBcIlNpemVcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzb3J0OiBcInN0cmluZ1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGF1dG93aWR0aDogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aWR0aDogMTgwXG4gICAgICAgICAgICAgICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWQ6IFwiZGlza190eXBlXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaGVhZGVyOiBcIkRpc2sgdHlwZVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNvcnQ6IFwic3RyaW5nXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYXV0b3dpZHRoOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdpZHRoOiAxODBcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZDogXCJtb2RlXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaGVhZGVyOiBcIk1vZGVcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzb3J0OiBcInN0cmluZ1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGF1dG93aWR0aDogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aWR0aDogMTgwXG4gICAgICAgICAgICAgICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWQ6IFwicHVibGljXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaGVhZGVyOiBcInB1YmxpY1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNvcnQ6IFwic3RyaW5nXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYXV0b3dpZHRoOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdpZHRoOiAxODBcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZDogXCJmYXJtZXJfdGlkXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaGVhZGVyOiBcIkZhcm1lcl90aWRcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzb3J0OiBcInN0cmluZ1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGF1dG93aWR0aDogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aWR0aDogMTgwXG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxuXG4gICAgICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgICAgIHNjaGVtZToge1xuICAgICAgICAgICAgICAgICAgICAgICAgJGluaXQ6IGZ1bmN0aW9uIChvYmopIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvYmouaW5kZXggPSB0aGlzLmNvdW50KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0sIG9uOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBvbkFmdGVyTG9hZDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICghdGhpcy5jb3VudCgpKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNob3dPdmVybGF5KFwiTm8gemRicyBpbiByZXNlcnZhdGlvblwiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuaGlkZU92ZXJsYXkoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICAgICAgaWQ6IFwia3ViZXJuZXRlc1wiLFxuICAgICAgICAgICAgICAgICAgICBoZWFkZXI6IFwiS3ViZXJuZXRlc1wiLFxuICAgICAgICAgICAgICAgICAgICB2aWV3OiBcImRhdGF0YWJsZVwiLFxuICAgICAgICAgICAgICAgICAgICByZXNpemVDb2x1bW46IHRydWUsXG4gICAgICAgICAgICAgICAgICAgIHNlbGVjdDogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgbXVsdGlzZWxlY3Q6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgIGNzczogXCJ3ZWJpeF9oZWFkZXJfYm9yZGVyIHdlYml4X2RhdGFfYm9yZGVyXCIsXG4gICAgICAgICAgICAgICAgICAgIHNjcm9sbDogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgYXV0b0NvbmZpZzogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgY29sdW1uczogW1xuICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlkOiBcImluZGV4XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaGVhZGVyOiBcIiNcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzb3J0OiBcImludFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGF1dG93aWR0aDogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aWR0aDogNjBcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZDogXCJub2RlX2lkXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaGVhZGVyOiBcIk5vZGUgaWRcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzb3J0OiBcInN0cmluZ1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGF1dG93aWR0aDogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aWR0aDogMTgwXG4gICAgICAgICAgICAgICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWQ6IFwic2l6ZVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhlYWRlcjogXCJTaXplXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc29ydDogXCJzdHJpbmdcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhdXRvd2lkdGg6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDE4MFxuICAgICAgICAgICAgICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlkOiBcIm5ldHdvcmtfaWRcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBoZWFkZXI6IFwiTmV0d29yayBpZFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNvcnQ6IFwic3RyaW5nXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYXV0b3dpZHRoOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdpZHRoOiAxODBcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZDogXCJpcGFkZHJlc3NcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBoZWFkZXI6IFwiSXAgYWRkcmVzc1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNvcnQ6IFwic3RyaW5nXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYXV0b3dpZHRoOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdpZHRoOiAxODBcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZDogXCJtYXN0ZXJfaXBzX3N0clwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhlYWRlcjogXCJNYXN0ZXIgaXBzXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc29ydDogXCJzdHJpbmdcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhdXRvd2lkdGg6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDE4MFxuICAgICAgICAgICAgICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlkOiBcImZhcm1lcl90aWRcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBoZWFkZXI6IFwiRmFybWVyX3RpZFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNvcnQ6IFwic3RyaW5nXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYXV0b3dpZHRoOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdpZHRoOiAxODBcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sXG5cbiAgICAgICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICAgICAgc2NoZW1lOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAkaW5pdDogZnVuY3Rpb24gKG9iaikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9iai5tYXN0ZXJfaXBzX3N0ciA9IG9iai5tYXN0ZXJfaXBzLnRvU3RyaW5nKClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvYmouaW5kZXggPSB0aGlzLmNvdW50KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0sIG9uOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBvbkFmdGVyTG9hZDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICghdGhpcy5jb3VudCgpKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNob3dPdmVybGF5KFwiTm8ga3ViZXJuZXRlcyBpbiByZXNlcnZhdGlvblwiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuaGlkZU92ZXJsYXkoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0sXG5cbiAgICAgICAgICAgIF1cbiAgICAgICAgfTtcblxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgdmlldzogXCJ3aW5kb3dcIixcbiAgICAgICAgICAgIGhlYWQ6IFwiUmVzZXJ2YXRpb25cIixcbiAgICAgICAgICAgIGlkOiBcInJlc2VydmF0aW9uX3ZpZXdcIixcbiAgICAgICAgICAgIG1vZGFsOiB0cnVlLFxuICAgICAgICAgICAgd2lkdGg6IDYwMCxcbiAgICAgICAgICAgIGhlaWdodDogODAwLFxuICAgICAgICAgICAgcG9zaXRpb246IFwiY2VudGVyXCIsXG4gICAgICAgICAgICBib2R5OiB7XG4gICAgICAgICAgICAgICAgcm93czogW1xuICAgICAgICAgICAgICAgICAgICB0YWIsXG4gICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZpZXc6IFwiYnV0dG9uXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZTogXCJPS1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgY3NzOiBcIndlYml4X3ByaW1hcnlcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIGNsaWNrOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5nZXRUb3BQYXJlbnRWaWV3KCkuaGlkZSgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG5cbiAgICBpbml0KCkge1xuICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgICAgIHRoaXMuZm9ybSA9ICQkKFwiZm9ybVwiKTtcblxuICAgIH1cblxuXG4gICAgc2hvd0ZvcihpdGVtKSB7XG4gICAgICAgIGxldCB2YWx1ZXMgPSBPYmplY3QuYXNzaWduKHt9LCBpdGVtKTtcbiAgICAgICAgdGhpcy5yZXNlcnZhdGlvbl92aWV3ID0gJCQoXCJyZXNlcnZhdGlvbl92aWV3XCIpO1xuICAgICAgICB0aGlzLnJlc2VydmF0aW9uX3ZpZXcuZ2V0SGVhZCgpLnNldEhUTUwoXCJSZXNlcnZhdGlvbjogXCIgKyBpdGVtLnNvbHV0aW9uTmFtZSk7XG5cbiAgICAgICAgbGV0IHJlc2VydmF0aW9uID0gaXRlbS5yZXNlcnZhdGlvblxuICAgICAgICB2YWx1ZXMuaWQgPSByZXNlcnZhdGlvbi5pZFxuICAgICAgICB2YWx1ZXMuY3VzdG9tZXJfdGlkID0gcmVzZXJ2YXRpb24uY3VzdG9tZXJfdGlkXG4gICAgICAgIHZhbHVlcy5uZXh0X2FjdGlvbiA9IHJlc2VydmF0aW9uLm5leHRfYWN0aW9uXG4gICAgICAgIHZhbHVlcy5yZXN1bHRzID0gcmVzZXJ2YXRpb24ucmVzdWx0c1xuICAgICAgICB2YWx1ZXMuZXhwaXJhdGlvbiA9IHJlc2VydmF0aW9uLmRhdGFfcmVzZXJ2YXRpb24uZXhwaXJhdGlvbl9yZXNlcnZhdGlvblxuXG4gICAgICAgIHZhbHVlcy5jb250YWluZXJzID0gcmVzZXJ2YXRpb24uZGF0YV9yZXNlcnZhdGlvbi5jb250YWluZXJzXG4gICAgICAgIHZhbHVlcy52b2x1bWVzID0gcmVzZXJ2YXRpb24uZGF0YV9yZXNlcnZhdGlvbi52b2x1bWVzXG4gICAgICAgIHZhbHVlcy56ZGJzID0gcmVzZXJ2YXRpb24uZGF0YV9yZXNlcnZhdGlvbi56ZGJzXG4gICAgICAgIHZhbHVlcy5uZXR3b3JrcyA9IHJlc2VydmF0aW9uLmRhdGFfcmVzZXJ2YXRpb24ubmV0d29ya3NcbiAgICAgICAgdmFsdWVzLmt1YmVybmV0ZXMgPSByZXNlcnZhdGlvbi5kYXRhX3Jlc2VydmF0aW9uLmt1YmVybmV0ZXNcbiAgICAgICAgdmFsdWVzLmZvcm1faW5mbyA9IGl0ZW0uZm9ybV9pbmZvXG5cbiAgICAgICAgdGhpcy5mb3JtLnNldFZhbHVlcyh2YWx1ZXMpO1xuICAgICAgICB0aGlzLmZvcm1faW5mbyA9ICQkKFwiZm9ybUluZm9cIik7XG4gICAgICAgIHRoaXMuZm9ybV9pbmZvLmNsZWFyQWxsKCk7XG5cbiAgICAgICAgbGV0IGZvcm1fbGlzdCA9IFtdO1xuICAgICAgICBsZXQgZm9ybV9rZXlzID0gT2JqZWN0LmtleXModmFsdWVzLmZvcm1faW5mbylcbiAgICAgICAgbGV0IGZvcm1fdmFsdWVzID0gT2JqZWN0LnZhbHVlcyh2YWx1ZXMuZm9ybV9pbmZvKVxuICAgICAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgZm9ybV9rZXlzLmxlbmd0aDsgaW5kZXgrKykge1xuICAgICAgICAgICAgbGV0IGZvcm1fZGljdCA9IG5ldyBPYmplY3QoKTtcbiAgICAgICAgICAgIGZvcm1fZGljdFsna2V5J10gPSBmb3JtX2tleXNbaW5kZXhdO1xuICAgICAgICAgICAgZm9ybV9kaWN0Wyd2YWx1ZSddID0gZm9ybV92YWx1ZXNbaW5kZXhdO1xuICAgICAgICAgICAgZm9ybV9saXN0LnB1c2goZm9ybV9kaWN0KVxuXG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5mb3JtX2luZm8ucGFyc2UoZm9ybV9saXN0KTtcblxuICAgICAgICAvLyBBZGQgbmV0d29ya3MgdGFiIGNvbnRlbnRcbiAgICAgICAgdGhpcy5uZXR3b3JrcyA9ICQkKFwibmV0d29ya3NcIik7XG4gICAgICAgIHRoaXMubmV0d29ya3MuY2xlYXJBbGwoKVxuICAgICAgICB0aGlzLm5ldHdvcmtzLnBhcnNlKHZhbHVlcy5uZXR3b3Jrcyk7XG5cbiAgICAgICAgLy8gQWRkIGNvdGFpbmVyIHRhYiBjb250ZW50XG4gICAgICAgIHRoaXMuY29udGFpbmVycyA9ICQkKFwiY29udGFpbmVyc1wiKTtcbiAgICAgICAgdGhpcy5jb250YWluZXJzLmNsZWFyQWxsKClcbiAgICAgICAgdGhpcy5jb250YWluZXJzLnBhcnNlKHZhbHVlcy5jb250YWluZXJzKTtcblxuXG4gICAgICAgIC8vIEFkZCB2b2x1bWVzIHRhYiBjb250ZW50XG4gICAgICAgIHRoaXMudm9sdW1lcyA9ICQkKFwidm9sdW1lc1wiKTtcbiAgICAgICAgdGhpcy52b2x1bWVzLmNsZWFyQWxsKClcbiAgICAgICAgdGhpcy52b2x1bWVzLnBhcnNlKHZhbHVlcy52b2x1bWVzKTtcblxuICAgICAgICAvLyBBZGQgemRiIHRhYiBjb250ZW50XG4gICAgICAgIHRoaXMuemRicyA9ICQkKFwiemRic1wiKTtcbiAgICAgICAgdGhpcy56ZGJzLmNsZWFyQWxsKClcbiAgICAgICAgdGhpcy56ZGJzLnBhcnNlKHZhbHVlcy56ZGJzKTtcblxuXG4gICAgICAgIC8vIEFkZCBrdWJlcm5ldGVzIHRhYiBjb250ZW50XG4gICAgICAgIHRoaXMua3ViZXJuZXRlcyA9ICQkKFwia3ViZXJuZXRlc1wiKTtcbiAgICAgICAgdGhpcy5rdWJlcm5ldGVzLmNsZWFyQWxsKClcbiAgICAgICAgdGhpcy5rdWJlcm5ldGVzLnBhcnNlKHZhbHVlcy5rdWJlcm5ldGVzKTtcblxuXG4gICAgICAgIHRoaXMuZ2V0Um9vdCgpLnNob3coKTtcbiAgICB9XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zb3VyY2VzL3ZpZXdzL2RlcGxveWVkU29sdXRpb25zL3Jlc2VydmF0aW9uLmpzIiwiaW1wb3J0IHsgSmV0VmlldyB9IGZyb20gXCJ3ZWJpeC1qZXRcIjtcblxuaW1wb3J0IHsgZGF0ZUZvcm1hdHRlciB9IGZyb20gXCIuLi8uLi9jb21tb24vZm9ybWF0dGVyc1wiO1xuaW1wb3J0IHsgTEVWRUxTIH0gZnJvbSBcIi4uL2FsZXJ0cy9kYXRhXCI7XG5pbXBvcnQgeyBjcmVhdGVGaWx0ZXJPcHRpb25zIH0gZnJvbSBcIi4uLy4uL2NvbW1vbi9maWx0ZXJzXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEFwcExvZ3NWaWV3IGV4dGVuZHMgSmV0VmlldyB7XG4gICAgY29uZmlnKCkge1xuICAgICAgICB2YXIgcGFnZXIgPSB7XG4gICAgICAgICAgICB2aWV3OiBcInBhZ2VyXCIsXG4gICAgICAgICAgICBpZDogXCJwYWdlclwiLFxuICAgICAgICAgICAgc2l6ZTogMTAwLFxuICAgICAgICAgICAgZ3JvdXA6IDIwXG4gICAgICAgIH07XG4gICAgICAgIGNvbnN0IGFwcGxvZ3MgPSB7XG4gICAgICAgICAgICB2aWV3OiBcImRhdGF0YWJsZVwiLFxuICAgICAgICAgICAgaWQ6IFwiYXBwbG9nc190YWJsZVwiLFxuICAgICAgICAgICAgcGFnZXI6IFwicGFnZXJcIixcbiAgICAgICAgICAgIHJlc2l6ZUNvbHVtbjogdHJ1ZSxcbiAgICAgICAgICAgIHNlbGVjdDogdHJ1ZSxcbiAgICAgICAgICAgIG11bHRpc2VsZWN0OiB0cnVlLFxuICAgICAgICAgICAgY3NzOiBcIndlYml4X2hlYWRlcl9ib3JkZXIgd2ViaXhfZGF0YV9ib3JkZXJcIixcbiAgICAgICAgICAgIHNjcm9sbDogdHJ1ZSxcbiAgICAgICAgICAgIGF1dG9Db25maWc6IHRydWUsXG4gICAgICAgICAgICBvbjoge1xuICAgICAgICAgICAgICAgIG9uQWZ0ZXJMb2FkOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc29ydChcImVwb2NoXCIsIFwiZGVzXCIpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm1hcmtTb3J0aW5nKFwiZXBvY2hcIiwgXCJkZXNcIik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcblxuICAgICAgICAgICAgY29sdW1uczogW3tcbiAgICAgICAgICAgICAgICBpZDogXCJpZFwiLFxuICAgICAgICAgICAgICAgIGhlYWRlcjogW1xuICAgICAgICAgICAgICAgICAgICBcIkxvZyNcIixcbiAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29udGVudDogXCJ0ZXh0RmlsdGVyXCJcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgIHNvcnQ6IFwiaW50XCIsXG4gICAgICAgICAgICAgICAgd2lkdGg6IDUwLFxuICAgICAgICAgICAgICAgIGF1dG93aWR0aDogdHJ1ZSxcbiAgICAgICAgICAgIH0sXG5cbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBpZDogXCJmaWxlcGF0aFwiLFxuICAgICAgICAgICAgICAgIGhlYWRlcjogW1xuICAgICAgICAgICAgICAgICAgICBcIlBhdGhcIixcbiAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29udGVudDogXCJ0ZXh0RmlsdGVyXCJcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgIHNvcnQ6IFwic3RyaW5nXCIsXG4gICAgICAgICAgICAgICAgYXV0b3dpZHRoOiB0cnVlLFxuICAgICAgICAgICAgICAgIHdpZHRoOiAxNDBcbiAgICAgICAgICAgIH0sXG5cbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBpZDogXCJsaW5lbnJcIixcbiAgICAgICAgICAgICAgICBoZWFkZXI6IFtcbiAgICAgICAgICAgICAgICAgICAgXCJMaW5lLm5yXCIsXG4gICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRlbnQ6IFwidGV4dEZpbHRlclwiXG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICBzb3J0OiBcImludFwiLFxuICAgICAgICAgICAgICAgIGF1dG93aWR0aDogdHJ1ZSxcbiAgICAgICAgICAgICAgICB3aWR0aDogNjBcbiAgICAgICAgICAgIH0sXG5cbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBpZDogXCJjb250ZXh0XCIsXG4gICAgICAgICAgICAgICAgaGVhZGVyOiBbXG4gICAgICAgICAgICAgICAgICAgIFwiQ29udGV4dFwiLFxuICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb250ZW50OiBcInRleHRGaWx0ZXJcIlxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgc29ydDogXCJzdHJpbmdcIlxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBpZDogXCJtZXNzYWdlXCIsXG4gICAgICAgICAgICAgICAgaGVhZGVyOiBbXG4gICAgICAgICAgICAgICAgICAgIFwiTWVzc2FnZVwiLFxuICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb250ZW50OiBcInRleHRGaWx0ZXJcIlxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgc29ydDogXCJzdHJpbmdcIixcbiAgICAgICAgICAgICAgICB3aWR0aDogNTAwLFxuICAgICAgICAgICAgICAgIGF1dG93aWR0aDogdHJ1ZVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBpZDogXCJsZXZlbFwiLFxuICAgICAgICAgICAgICAgIGhlYWRlcjogW1xuICAgICAgICAgICAgICAgICAgICBcIkxldmVsXCIsXG4gICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRlbnQ6IFwic2VsZWN0RmlsdGVyXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBvcHRpb25zOiBjcmVhdGVGaWx0ZXJPcHRpb25zKExFVkVMUylcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgIHNvcnQ6IFwiaW50XCIsXG4gICAgICAgICAgICAgICAgZm9ybWF0OiAodmFsdWUpID0+IExFVkVMU1t2YWx1ZV0sXG4gICAgICAgICAgICAgICAgd2lkdGg6IDEwMFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBpZDogXCJlcG9jaFwiLFxuICAgICAgICAgICAgICAgIGhlYWRlcjogW1xuICAgICAgICAgICAgICAgICAgICBcIlRpbWVcIixcbiAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29udGVudDogXCJ0ZXh0RmlsdGVyXCJcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgIHNvcnQ6IFwiZGF0ZVwiLFxuICAgICAgICAgICAgICAgIGZvcm1hdDogZGF0ZUZvcm1hdHRlcixcbiAgICAgICAgICAgICAgICB3aWR0aDogMTMwXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGlkOiBcInByb2Nlc3NpZFwiLFxuICAgICAgICAgICAgICAgIGhlYWRlcjogW1xuICAgICAgICAgICAgICAgICAgICBcIlBJRFwiLFxuICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb250ZW50OiBcInRleHRGaWx0ZXJcIlxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgc29ydDogXCJpbnRcIixcbiAgICAgICAgICAgICAgICB3aWR0aDogNjBcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgaWQ6IFwiY2F0XCIsXG4gICAgICAgICAgICAgICAgaGVhZGVyOiBbXG4gICAgICAgICAgICAgICAgICAgIFwiQ2F0ZWdvcnlcIixcbiAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29udGVudDogXCJ0ZXh0RmlsdGVyXCJcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgIHNvcnQ6IFwic3RyaW5nXCIsXG4gICAgICAgICAgICAgICAgd2lkdGg6IDgwXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGlkOiBcImRhdGFcIixcbiAgICAgICAgICAgICAgICBoZWFkZXI6IFtcbiAgICAgICAgICAgICAgICAgICAgXCJEYXRhXCIsXG4gICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRlbnQ6IFwidGV4dEZpbHRlclwiXG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICBzb3J0OiBcInN0cmluZ1wiXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIF0sXG5cbiAgICAgICAgfVxuXG5cbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHJvd3M6IFtcbiAgICAgICAgICAgICAgICBhcHBsb2dzLFxuICAgICAgICAgICAgICAgIHBhZ2VyXG4gICAgICAgICAgICBdXG4gICAgICAgIH1cbiAgICB9XG5cbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NvdXJjZXMvdmlld3MvbG9ncy9hcHBMb2dzLmpzIiwiaW1wb3J0IHsgSmV0VmlldyB9IGZyb20gXCJ3ZWJpeC1qZXRcIjtcblxuaW1wb3J0IHsgaW5wdXREaWFsb2cgfSBmcm9tIFwiLi4vLi4vY29tbW9uL2RpYWxvZ3NcIjtcbmltcG9ydCB7IGFkbWluIH0gZnJvbSBcIi4uLy4uL3NlcnZpY2VzL2FkbWluXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEFkbWluc1ZpZXcgZXh0ZW5kcyBKZXRWaWV3IHtcbiAgICBjb25maWcoKSB7XG4gICAgICAgIHZhciBzZWxmID0gdGhpcztcblxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgcm93czogW3tcbiAgICAgICAgICAgICAgICBjb2xzOiBbe1xuICAgICAgICAgICAgICAgICAgICB2aWV3OiBcInRlbXBsYXRlXCIsXG4gICAgICAgICAgICAgICAgICAgIHRlbXBsYXRlOiBcIkFsbCBvZiB0aGUgZm9sbG93aW5nIDNCb3QgbmFtZXMgY2FuIGFjY2VzcyBkYXNoYm9hcmQsIHlvdSBjYW4gYWRkIG9yIHJlbW92ZSB0aGVtIGZyb20gaGVyZVwiLFxuICAgICAgICAgICAgICAgICAgICBhdXRvaGVpZ2h0OiB0cnVlLFxuICAgICAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICAgICAgbG9jYWxJZDogXCJhZGQtYWRtaW5cIixcbiAgICAgICAgICAgICAgICAgICAgdmlldzogXCJidXR0b25cIixcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU6IFwiQWRkIG5ldyBhZG1pbmlzdHJhdG9yXCIsXG4gICAgICAgICAgICAgICAgICAgIGNsaWNrOiBzZWxmLmFkZEFkbWluLmJpbmQoc2VsZiksXG4gICAgICAgICAgICAgICAgfV1cbiAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICBsb2NhbElkOiBcImFkbWlucy10YWJsZVwiLFxuICAgICAgICAgICAgICAgIHZpZXc6IFwiZGF0YXRhYmxlXCIsXG4gICAgICAgICAgICAgICAgYXV0b2hlaWdodDogdHJ1ZSxcbiAgICAgICAgICAgICAgICBjb2x1bW5zOiBbe1xuICAgICAgICAgICAgICAgICAgICBpZDogXCJuYW1lXCIsXG4gICAgICAgICAgICAgICAgICAgIHdpZHRoOiA1MDAsXG4gICAgICAgICAgICAgICAgICAgIGhlYWRlcjogW1xuICAgICAgICAgICAgICAgICAgICAgICAgXCJOYW1lXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29udGVudDogXCJ0ZXh0RmlsdGVyXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICAgICAgc29ydDogXCJzdHJpbmdcIixcbiAgICAgICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgICAgIGhlYWRlcjogXCJEZWxldGVcIixcbiAgICAgICAgICAgICAgICAgICAgdGVtcGxhdGU6IGZ1bmN0aW9uIChvYmopIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBcIjxzcGFuIGNsYXNzPSd3ZWJpeF9pY29uIG1kaSBtZGktdHJhc2gtY2FuIHdlYml4X2RhbmdlciBkZWxldGVfYWRtaW4nPjwvc3Bhbj5cIjtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1dLFxuICAgICAgICAgICAgICAgIG9uQ2xpY2s6IHtcbiAgICAgICAgICAgICAgICAgICAgZGVsZXRlX2FkbWluOiBmdW5jdGlvbiAoZSwgaWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuJHNjb3BlLmRlbGV0ZUFkbWluKGlkKTtcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgaGFuZGxlUmVzdWx0KCkge1xuXG4gICAgfVxuXG4gICAgYWRkQWRtaW4oKSB7XG4gICAgICAgIGNvbnN0IHNlbGYgPSB0aGlzO1xuXG4gICAgICAgIGlucHV0RGlhbG9nKFwiQWRkIGFkbWluXCIsIFwiM0JvdCBuYW1lXCIsIFwiQWRkXCIsIChpbnB1dCkgPT4ge1xuICAgICAgICAgICAgaWYgKGFkbWluLmFkZChpbnB1dCkpIHtcbiAgICAgICAgICAgICAgICBzZWxmLnRhYmxlLmFkZCh7IG5hbWU6IGlucHV0IH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBkZWxldGVBZG1pbihpdGVtSWQpIHtcbiAgICAgICAgY29uc3Qgc2VsZiA9IHRoaXM7XG5cbiAgICAgICAgY29uc3QgaXRlbSA9IHNlbGYudGFibGUuZ2V0SXRlbShpdGVtSWQpO1xuXG4gICAgICAgIHdlYml4LmNvbmZpcm0oe1xuICAgICAgICAgICAgdGl0bGU6IFwiRGVsZXRlIGFkbWluXCIsXG4gICAgICAgICAgICBvazogXCJZZXNcIixcbiAgICAgICAgICAgIHRleHQ6IGBBcmUgeW91IHN1cmUgeW91IHdhbnQgdG8gZGVsZXRlIFwiJHtpdGVtLm5hbWV9XCI/YCxcbiAgICAgICAgICAgIGNhbmNlbDogXCJOb1wiLFxuICAgICAgICB9KS50aGVuKCgpID0+IHtcbiAgICAgICAgICAgIGlmIChhZG1pbi5kZWxldGUoaXRlbS5uYW1lKSkge1xuICAgICAgICAgICAgICAgIHNlbGYudGFibGUucmVtb3ZlKGl0ZW1JZCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGluaXQoKSB7XG4gICAgICAgIHRoaXMudGFibGUgPSB0aGlzLiQkKFwiYWRtaW5zLXRhYmxlXCIpO1xuXG4gICAgICAgIGFkbWluLmxpc3QoKS50aGVuKGRhdGEgPT4ge1xuICAgICAgICAgICAgdGhpcy50YWJsZS5wYXJzZShkYXRhLmpzb24oKSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIC8vd2ViaXguZXh0ZW5kKHRoaXMudGFibGUsIHdlYml4LlByb2dyZXNzQmFyKTtcbiAgICB9XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zb3VyY2VzL3ZpZXdzL3NldHRpbmdzL2FkbWlucy5qcyIsImltcG9ydCB7IEpldFZpZXcgfSBmcm9tIFwid2ViaXgtamV0XCI7XG5cbmltcG9ydCB7IGFkbWluIH0gZnJvbSBcIi4uLy4uL3NlcnZpY2VzL2FkbWluXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEdlbmVyYWxWaWV3IGV4dGVuZHMgSmV0VmlldyB7XG4gICAgY29uZmlnKCkge1xuXG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBsb2NhbElkOiBcImdlbmVyYWxfZm9ybVwiLFxuICAgICAgICAgICAgdmlldzogXCJmb3JtXCIsXG4gICAgICAgICAgICBlbGVtZW50czogW1xuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgdmlldzogXCJyaWNoc2VsZWN0XCIsXG4gICAgICAgICAgICAgICAgICAgIGlkOiBcImV4cGxvcmVyX2xpc3RcIixcbiAgICAgICAgICAgICAgICAgICAgbGFiZWw6IFwiRXhwbG9yZXJcIixcbiAgICAgICAgICAgICAgICAgICAgbGFiZWxXaWR0aDogMTUwLFxuICAgICAgICAgICAgICAgICAgICB2YWx1ZTogXCJ0ZXN0bmV0XCIsXG4gICAgICAgICAgICAgICAgICAgIHlDb3VudDogMixcbiAgICAgICAgICAgICAgICAgICAgb3B0aW9uczogW1xuICAgICAgICAgICAgICAgICAgICAgICAgeyBpZDogXCJ0ZXN0bmV0XCIsIHZhbHVlOiBcIlRlc3QgTmV0XCIgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHsgaWQ6IFwibWFpblwiLCB2YWx1ZTogXCJNYWluXCIgfSxcbiAgICAgICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBsb2NhbElkOiBcImV4cGxvcmVyX2FkZHJlc3NcIixcbiAgICAgICAgICAgICAgICAgICAgdmlldzogXCJ0ZXh0XCIsXG4gICAgICAgICAgICAgICAgICAgIHR5cGU6IFwidGV4dFwiLFxuICAgICAgICAgICAgICAgICAgICByZWFkb25seTogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgbGFiZWw6IFwiRXhwbG9yZXIgYWRkcmVzc1wiLFxuICAgICAgICAgICAgICAgICAgICBsYWJlbFdpZHRoOiAxNTAsXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIF1cbiAgICAgICAgfVxuXG4gICAgfVxuXG4gICAgZG9BY3Rpb24ocHJvbWlzZSwgY2FsbGJhY2spIHtcbiAgICAgICAgdGhpcy5mb3JtLnNob3dQcm9ncmVzcygpXG4gICAgICAgIHByb21pc2UudGhlbigoZGF0YSkgPT4ge1xuICAgICAgICAgICAgaWYgKGNhbGxiYWNrKSB7XG4gICAgICAgICAgICAgICAgY2FsbGJhY2soZGF0YSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhkYXRhKTtcbiAgICAgICAgICAgIHRoaXMuZm9ybS5zaG93UHJvZ3Jlc3MoeyBoaWRlOiB0cnVlIH0pO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBpbml0KCkge1xuICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XG5cbiAgICAgICAgc2VsZi5mb3JtID0gc2VsZi4kJCgnZ2VuZXJhbF9mb3JtJyk7XG4gICAgICAgIHdlYml4LmV4dGVuZChzZWxmLmZvcm0sIHdlYml4LlByb2dyZXNzQmFyKTtcblxuICAgICAgICBzZWxmLmV4cGxvcmVyTGlzdCA9IHNlbGYuJCQoJ2V4cGxvcmVyX2xpc3QnKTtcbiAgICAgICAgc2VsZi5leHBsb3JlckFkZHJlc3MgPSBzZWxmLiQkKCdleHBsb3Jlcl9hZGRyZXNzJyk7XG5cblxuICAgICAgICBzZWxmLmRvQWN0aW9uKGFkbWluLmdldF9leHBsb3JlcigpLCAoZGF0YSkgPT4ge1xuICAgICAgICAgICAgY29uc3QgZXhwbG9yZXIgPSBkYXRhLmpzb24oKTtcbiAgICAgICAgICAgIHNlbGYuZXhwbG9yZXJMaXN0LnNldFZhbHVlKGV4cGxvcmVyLnR5cGUpO1xuICAgICAgICAgICAgc2VsZi5leHBsb3JlckFkZHJlc3Muc2V0VmFsdWUoZXhwbG9yZXIudXJsKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgc2VsZi5leHBsb3Jlckxpc3QuYXR0YWNoRXZlbnQoXCJvbkNoYW5nZVwiLCAobmV3VmFsdWUpID0+IHtcbiAgICAgICAgICAgIHNlbGYuZG9BY3Rpb24oYWRtaW4uc2V0X2V4cGxvcmVyKG5ld1ZhbHVlLnRvTG93ZXJDYXNlKCkpLCAoZGF0YSkgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IGV4cGxvcmVyID0gZGF0YS5qc29uKCk7XG4gICAgICAgICAgICAgICAgc2VsZi5leHBsb3JlckFkZHJlc3Muc2V0VmFsdWUoZXhwbG9yZXIudXJsKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcblxuXG4gICAgfVxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc291cmNlcy92aWV3cy9zZXR0aW5ncy9nZW5lcmFsLmpzIiwiaW1wb3J0IHsgSmV0VmlldyB9IGZyb20gXCJ3ZWJpeC1qZXRcIjtcbmltcG9ydCB7IHdhbGxldCB9IGZyb20gXCIuLi8uLi9zZXJ2aWNlcy93YWxsZXRcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgV2FsbGV0Rm9ybVZpZXcgZXh0ZW5kcyBKZXRWaWV3IHtcbiAgICBjb25maWcoKSB7XG4gICAgICAgIGNvbnN0IGluZm8gPSB7XG4gICAgICAgICAgICB2aWV3OiBcImZvcm1cIixcbiAgICAgICAgICAgIGlkOiBcImZvcm1cIixcbiAgICAgICAgICAgIGVsZW1lbnRzQ29uZmlnOiB7IGxhYmVsV2lkdGg6IDIwMCB9LFxuICAgICAgICAgICAgZWxlbWVudHM6IFtcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIHZpZXc6IFwidGV4dFwiLFxuICAgICAgICAgICAgICAgICAgICBsYWJlbDogXCJOYW1lXCIsXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwibmFtZVwiLFxuICAgICAgICAgICAgICAgICAgICBwbGFjZWhvbGRlcjogXCJXYWxsZXQgbmFtZVwiXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgXVxuICAgICAgICB9O1xuXG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICB2aWV3OiBcIndpbmRvd1wiLFxuICAgICAgICAgICAgaGVhZDogXCJDcmVhdGUgbmV3IHdhbGxldFwiLFxuICAgICAgICAgICAgbW9kYWw6IHRydWUsXG4gICAgICAgICAgICB3aWR0aDogNjAwLFxuICAgICAgICAgICAgaGVpZ2h0OiA0MDAsXG4gICAgICAgICAgICBwb3NpdGlvbjogXCJjZW50ZXJcIixcbiAgICAgICAgICAgIGJvZHk6IHtcbiAgICAgICAgICAgICAgICByb3dzOiBbXG4gICAgICAgICAgICAgICAgICAgIGluZm8sXG4gICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZpZXc6IFwiYnV0dG9uXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZTogXCJPS1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgY3NzOiBcIndlYml4X3ByaW1hcnlcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIGNsaWNrOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHdhbGxldF9uYW1lID0gJCQoJ2Zvcm0nKS5nZXRWYWx1ZXMoKS5uYW1lXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy4kc2NvcGUuY3JlYXRlV2FsbGV0KHdhbGxldF9uYW1lKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIHNob3dGb3JtKCkge1xuICAgICAgICB0aGlzLmdldFJvb3QoKS5zaG93KCk7XG4gICAgfVxuXG4gICAgaW5pdCgpIHtcbiAgICAgICAgdGhpcy5mb3JtID0gJCQoXCJmb3JtXCIpO1xuICAgIH1cblxuICAgIGNyZWF0ZVdhbGxldChuYW1lKXtcblxuICAgICAgICB3ZWJpeC5leHRlbmQodGhpcy5mb3JtLCB3ZWJpeC5Qcm9ncmVzc0Jhcik7XG4gICAgICAgIHRoaXMuZm9ybS5zaG93UHJvZ3Jlc3Moe1xuICAgICAgICAgICAgdHlwZTpcImljb25cIixcbiAgICAgICAgICAgIGhpZGU6IGZhbHNlXG4gICAgICAgIH0pO1xuICAgICAgICB3YWxsZXQuY3JlYXRlV2FsbGV0KG5hbWUpLnRoZW4oZGF0YSA9PiB7XG4gICAgICAgICAgICB3ZWJpeC5tZXNzYWdlKHsgdHlwZTogXCJzdWNjZXNzXCIsIHRleHQ6IFwiV2FsbGV0IGNyZWF0ZWQgc3VjY2Vzc2Z1bGx5XCIgfSk7XG4gICAgICAgICAgICB0aGlzLmZvcm0uc2hvd1Byb2dyZXNzKHtoaWRlOiB0cnVlfSk7XG4gICAgICAgICAgICB0aGlzLmZvcm0uZ2V0VG9wUGFyZW50VmlldygpLmhpZGUoKTtcbiAgICAgICAgICAgIHRoaXMuYXBwLnJlZnJlc2goKVxuICAgICAgICB9KS5jYXRjaChlcnJvciA9PiB7XG4gICAgICAgICAgICB3ZWJpeC5tZXNzYWdlKHsgdHlwZTogXCJlcnJvclwiLCB0ZXh0OiBcIkNvdWxkIG5vdCBjcmVhdGUgd2FsbGV0XCIgfSk7XG4gICAgICAgICAgICB0aGlzLmZvcm0uc2hvd1Byb2dyZXNzKHtoaWRlOiB0cnVlfSk7XG4gICAgICAgICAgICB0aGlzLmZvcm0uZ2V0VG9wUGFyZW50VmlldygpLmhpZGUoKTtcbiAgICAgICAgICAgIHRoaXMuYXBwLnJlZnJlc2goKVxuICAgICAgICB9KTtcbiAgICB9XG59XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc291cmNlcy92aWV3cy93YWxsZXRzTWFuYWdlci93YWxsZXRGb3JtLmpzIiwiaW1wb3J0IHsgSmV0VmlldyB9IGZyb20gXCJ3ZWJpeC1qZXRcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgV2FsbGV0RGV0YWlsc1ZpZXcgZXh0ZW5kcyBKZXRWaWV3IHtcbiAgICBjb25maWcoKSB7XG4gICAgICAgIGNvbnN0IGluZm8gPSB7XG4gICAgICAgICAgICBpZDogXCJ3YWxsZXRfaW5mb1wiLFxuICAgICAgICAgICAgcmVzcG9uc2l2ZTogdHJ1ZSxcbiAgICAgICAgICAgIHZpZXc6IFwibGlzdFwiLFxuICAgICAgICAgICAgcmVzcG9uc2l2ZTogdHJ1ZSxcbiAgICAgICAgICAgIHR5cGU6IHtcbiAgICAgICAgICAgICAgICBoZWlnaHQ6ICdhdXRvJyxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB0ZW1wbGF0ZTogYFxuICAgICAgICAgICAgICAgIDxwPlxuICAgICAgICAgICAgICAgIDwvZm9udD48Zm9udCBzaXplPVwiM1wiPjxiPk5hbWU6IDwvYj4jbmFtZSM8L2ZvbnQ+PGJyPlxuICAgICAgICAgICAgICAgIDwvZm9udD48Zm9udCBzaXplPVwiM1wiPjxiPkFkZHJlc3M6IDwvYj4jYWRkcmVzcyM8L2ZvbnQ+PGJyPlxuICAgICAgICAgICAgICAgIDwvZm9udD48Zm9udCBzaXplPVwiM1wiPjxiPkJhbGFuY2VzOjwvYj48L2ZvbnQ+PGJyPlxuICAgICAgICAgICAgICAgIDwvZm9udD48Zm9udCBzaXplPVwiM1wiPiNiYWxhbmNlcyM8L2ZvbnQ+XG4gICAgICAgICAgICAgICAgPC9wPlxuICAgICAgICAgICAgYFxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHZpZXc6IFwid2luZG93XCIsXG4gICAgICAgICAgICBoZWFkOiBcIldhbGxldCBEZXRhaWxzXCIsXG4gICAgICAgICAgICBtb2RhbDogdHJ1ZSxcbiAgICAgICAgICAgIHdpZHRoOiA4MDAsXG4gICAgICAgICAgICBoZWlnaHQ6IDUwMCxcbiAgICAgICAgICAgIHBvc2l0aW9uOiBcImNlbnRlclwiLFxuICAgICAgICAgICAgYm9keToge1xuICAgICAgICAgICAgICAgIHJvd3M6IFtcbiAgICAgICAgICAgICAgICAgICAgaW5mbyxcbiAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmlldzogXCJidXR0b25cIixcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlOiBcIk9LXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBjc3M6IFwid2ViaXhfcHJpbWFyeVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgY2xpY2s6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmdldFRvcFBhcmVudFZpZXcoKS5oaWRlKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBzaG93SW5mbyhkYXRhKXtcbiAgICAgICAgdmFyIHNlbGYgPSB0aGlzXG5cbiAgICAgICAgdmFyIGJhbGFuY2VzID0gXCJcIjtcbiAgICAgICAgZm9yICh2YXIgaSBpbiBkYXRhLmJhbGFuY2VzKSB7XG4gICAgICAgICAgICBiYWxhbmNlcyArPSBgJHtkYXRhLmJhbGFuY2VzW2ldLmJhbGFuY2V9IDxiPiR7ZGF0YS5iYWxhbmNlc1tpXS5hc3NldF9jb2RlfTwvYj4gJHtkYXRhLmJhbGFuY2VzW2ldLmFzc2V0X2lzc3Vlcn08YnI+YFxuICAgICAgICB9XG4gICAgICAgIHNlbGYuaW5mby5jbGVhckFsbCgpXG4gICAgICAgIHNlbGYuaW5mby5hZGQoe1xuICAgICAgICAgICAgbmFtZTogZGF0YS5uYW1lLFxuICAgICAgICAgICAgYWRkcmVzczogZGF0YS5hZGRyZXNzLFxuICAgICAgICAgICAgYmFsYW5jZXM6IGJhbGFuY2VzXG4gICAgICAgIH0pXG5cbiAgICAgICAgdGhpcy5nZXRSb290KCkuc2hvdygpO1xuICAgIH1cblxuICAgIGluaXQoKSB7XG4gICAgICAgIGNvbnN0IHNlbGYgPSB0aGlzO1xuXG4gICAgICAgIHNlbGYuaW5mbyA9IHRoaXMuJCQoXCJ3YWxsZXRfaW5mb1wiKTtcbiAgICB9XG59XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc291cmNlcy92aWV3cy93YWxsZXRzTWFuYWdlci93YWxsZXREZXRhaWxzLmpzIiwiZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZUZpbHRlck9wdGlvbnMob2JqKSB7XG4gICAgLy8gcmV0dXJucyBhIG5ldyBvYmplY3QgYXMge2lkOiB2YWx1ZX0sIHVzZWQgYXMgZGF0YSB0YWJsZSBmaWx0ZXIgb3B0aW9uc1xuICAgIC8vIG9iajogY2FuIGJlIGFuIGFycmF5IG9yIGEgbWFwcGluZyBvYmplY3RcblxuICAgIGlmIChvYmogaW5zdGFuY2VvZiBBcnJheSkge1xuICAgICAgICByZXR1cm4gb2JqLm1hcCgodmFsdWUsIGluZGV4KSA9PiB7XG4gICAgICAgICAgICByZXR1cm4geyBpZDogaW5kZXgsIHZhbHVlOiB2YWx1ZSB9XG4gICAgICAgIH0pO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIC8vIGFzc3VtZSBpdCdzIGp1c3QgYSBtYXBwaW5nIG90aGVyd2lzZVxuICAgICAgICByZXR1cm4gT2JqZWN0LmtleXMob2JqKS5tYXAoa2V5ID0+IHtcbiAgICAgICAgICAgIHJldHVybiB7IGlkOiBrZXksIHZhbHVlOiBvYmpba2V5XSB9XG4gICAgICAgIH0pO1xuICAgIH1cblxuXG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zb3VyY2VzL2NvbW1vbi9maWx0ZXJzLmpzIiwiaW1wb3J0IHsgU2VydmljZSB9IGZyb20gXCIuLi9jb21tb24vYXBpXCI7XG5cbmNvbnN0IEJBU0VfVVJMID0gXCIvemVyb2JvdC9hZG1pbi9hY3RvcnMvcGFja2FnZV9tYW5hZ2VyXCI7XG5cblxuY2xhc3MgUGFja2FnZXNTZXJ2aWNlIGV4dGVuZHMgU2VydmljZSB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHN1cGVyKEJBU0VfVVJMKTtcbiAgICB9XG5cbiAgICBnZXRTdGF0dXMobmFtZXMpIHtcbiAgICAgICAgLy8gcG9zdCBjYWxsIHRvIHNlbmQgYXJncyBhcyBqc29uXG4gICAgICAgIHJldHVybiB0aGlzLnBvc3RDYWxsKFwicGFja2FnZXNfZ2V0X3N0YXR1c1wiLCB7XG4gICAgICAgICAgICBuYW1lczogbmFtZXNcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgbGlzdChvcHRzKSB7XG4gICAgICAgIG9wdHMgPSBvcHRzIHx8IHt9O1xuICAgICAgICByZXR1cm4gdGhpcy5nZXRDYWxsKFwicGFja2FnZXNfbGlzdFwiKTtcbiAgICB9XG5cbiAgICBhZGQocGF0aCwgZ2l0VXJsKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnBvc3RDYWxsKFwicGFja2FnZV9hZGRcIiwge1xuICAgICAgICAgICAgcGF0aDogcGF0aCxcbiAgICAgICAgICAgIGdpdF91cmw6IGdpdFVybFxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBkZWxldGUocGFja2FnZU5hbWUpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucG9zdENhbGwoXCJwYWNrYWdlX2RlbGV0ZVwiLCB7IG5hbWU6IHBhY2thZ2VOYW1lIH0pO1xuXG4gICAgfVxuXG4gICAgc3RhcnQocGFja2FnZU5hbWUpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucG9zdENhbGwoXCJwYWNrYWdlX3N0YXJ0XCIsIHsgbmFtZTogcGFja2FnZU5hbWUgfSk7XG4gICAgfVxuXG4gICAgc3RvcChwYWNrYWdlTmFtZSkge1xuICAgICAgICByZXR1cm4gdGhpcy5wb3N0Q2FsbChcInBhY2thZ2Vfc3RvcFwiLCB7IG5hbWU6IHBhY2thZ2VOYW1lIH0pO1xuXG4gICAgfVxuXG4gICAgZGlzYWJsZShwYWNrYWdlTmFtZSkge1xuICAgICAgICByZXR1cm4gdGhpcy5wb3N0Q2FsbChcInBhY2thZ2VfZGlzYWJsZVwiLCB7IG5hbWU6IHBhY2thZ2VOYW1lIH0pO1xuXG4gICAgfVxuXG4gICAgZW5hYmxlKHBhY2thZ2VOYW1lKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnBvc3RDYWxsKFwicGFja2FnZV9lbmFibGVcIiwgeyBuYW1lOiBwYWNrYWdlTmFtZSB9KTtcbiAgICB9XG59XG5cblxuZXhwb3J0IGNvbnN0IHBhY2thZ2VzID0gbmV3IFBhY2thZ2VzU2VydmljZSgpO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc291cmNlcy9zZXJ2aWNlcy9wYWNrYWdlcy5qcyIsImltcG9ydCB7IEpldFZpZXcgfSBmcm9tIFwid2ViaXgtamV0XCI7XG5pbXBvcnQgeyBoZWFsdGggfSBmcm9tIFwiLi4vLi4vc2VydmljZXMvaGVhbHRoXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIERpc2tTcGFjZVZpZXcgZXh0ZW5kcyBKZXRWaWV3IHtcbiAgICBjb25maWcoKSB7XG4gICAgICAgIGNvbnN0IGRpc2tTcGFjZSA9IHtcbiAgICAgICAgICAgIGlkOiBcImRpc2tTcGFjZVwiLFxuICAgICAgICAgICAgcmVzcG9uc2l2ZTogdHJ1ZSxcbiAgICAgICAgICAgIHZpZXc6IFwibGlzdFwiLFxuICAgICAgICAgICAgdHlwZToge1xuICAgICAgICAgICAgICAgIGhlaWdodDogNjAsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgdGVtcGxhdGU6IGBcbiAgICAgICAgICAgIDxwPjxmb250IHNpemU9XCIzXCI+PGI+I2tleSM6IDwvYj48L2ZvbnQ+IDxmb250IHNpemU9XCIzXCI+I3ZhbHVlIzwvZm9udD48L3A+XG4gICAgICAgICAgICBgXG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgdHlwZTogXCJzcGFjZVwiLFxuICAgICAgICAgICAgcm93czogW3tcbiAgICAgICAgICAgICAgICB0ZW1wbGF0ZTogXCI8ZGl2IHN0eWxlPSd3aWR0aDphdXRvO3RleHQtYWxpZ246Y2VudGVyJz48aDM+RGlzayBTcGFjZTxoMy8+PC9kaXY+XCIsXG4gICAgICAgICAgICAgICAgaGVpZ2h0OiA1MFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBkaXNrU3BhY2VcbiAgICAgICAgICAgIF1cbiAgICAgICAgfVxuICAgIH1cblxuXG4gICAgaW5pdCgpIHtcbiAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xuXG4gICAgICAgIHRoaXMuZGlza0luZm8gPSB0aGlzLiQkKFwiZGlza1NwYWNlXCIpO1xuXG4gICAgICAgIGhlYWx0aC5nZXREaXNrU3BhY2UoKS50aGVuKGRhdGEgPT4ge1xuICAgICAgICAgICAgZGF0YSA9IGRhdGEuanNvbigpO1xuXG4gICAgICAgICAgICBzZWxmLmRpc2tJbmZvLmFkZCh7XG4gICAgICAgICAgICAgICAga2V5OiBcIlVzZWRcIixcbiAgICAgICAgICAgICAgICB2YWx1ZTogZGF0YS51c2VkICsgXCIgR0JcIlxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBzZWxmLmRpc2tJbmZvLmFkZCh7XG4gICAgICAgICAgICAgICAga2V5OiBcIkZyZWVcIixcbiAgICAgICAgICAgICAgICB2YWx1ZTogZGF0YS5mcmVlICsgXCIgR0JcIlxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBzZWxmLmRpc2tJbmZvLmFkZCh7XG4gICAgICAgICAgICAgICAga2V5OiBcIlRvdGFsXCIsXG4gICAgICAgICAgICAgICAgdmFsdWU6IGRhdGEudG90YWwgKyBcIiBHQlwiXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHNlbGYuZGlza0luZm8uYWRkKHtcbiAgICAgICAgICAgICAgICBrZXk6IFwiUGVyY2VudFwiLFxuICAgICAgICAgICAgICAgIHZhbHVlOiBkYXRhLnBlcmNlbnQgKyBcIiAlXCJcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9XG5cbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NvdXJjZXMvdmlld3MvZGFzaC9kaXNrU3BhY2UuanMiLCJpbXBvcnQgeyBKZXRWaWV3IH0gZnJvbSBcIndlYml4LWpldFwiO1xuaW1wb3J0IHsgaGVhbHRoIH0gZnJvbSBcIi4uLy4uL3NlcnZpY2VzL2hlYWx0aFwiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBoZWFsdGhJbmZvVmlldyBleHRlbmRzIEpldFZpZXcge1xuICAgIGNvbmZpZygpIHtcbiAgICAgICAgY29uc3QgaGVhbHRoSW5mbyA9IHtcbiAgICAgICAgICAgIGlkOiBcImhlYWx0aEluZm9cIixcbiAgICAgICAgICAgIHJlc3BvbnNpdmU6IHRydWUsXG4gICAgICAgICAgICB2aWV3OiBcImxpc3RcIixcbiAgICAgICAgICAgIHJlc3BvbnNpdmU6IHRydWUsXG4gICAgICAgICAgICB0eXBlOiB7XG4gICAgICAgICAgICAgICAgaGVpZ2h0OiA2MCxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB0ZW1wbGF0ZTogYFxuICAgICAgICAgICAgPHA+PGZvbnQgc2l6ZT1cIjNcIj48Yj4ja2V5IzogPC9iPjwvZm9udD4gI3ZhbHVlIzwvcD5cbiAgICAgICAgICAgIGBcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICB0eXBlOiBcInNwYWNlXCIsXG4gICAgICAgICAgICByb3dzOiBbe1xuICAgICAgICAgICAgICAgIHRlbXBsYXRlOiBcIjxkaXYgc3R5bGU9J3dpZHRoOmF1dG87dGV4dC1hbGlnbjpjZW50ZXInPjxoMz5IZWFsdGggQ2hlY2tzPGgzLz48L2Rpdj5cIixcbiAgICAgICAgICAgICAgICBoZWlnaHQ6IDUwXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIGhlYWx0aEluZm9dXG4gICAgICAgIH1cbiAgICB9XG4gICAgaW5pdCh2aWV3KSB7XG4gICAgICAgIHZhciBzZWxmID0gdGhpcztcblxuICAgICAgICB0aGlzLmhlYWx0aEluZm8gPSB0aGlzLiQkKFwiaGVhbHRoSW5mb1wiKTtcblxuICAgICAgICBoZWFsdGguZ2V0SGVhbHRoKCkudGhlbihkYXRhID0+IHtcbiAgICAgICAgICAgIGRhdGEgPSBkYXRhLmpzb24oKTtcblxuICAgICAgICAgICAgaWYgKGRhdGEuYmNkYiA9PT0gXCJPS1wiKSB7XG4gICAgICAgICAgICAgICAgc2VsZi5oZWFsdGhJbmZvLmFkZCh7XG4gICAgICAgICAgICAgICAgICAgIGtleTogXCJCQ0RCIFN0YXR1c1wiLFxuICAgICAgICAgICAgICAgICAgICB2YWx1ZTogYDxzcGFuIGNsYXNzPSd3ZWJpeF9pY29uIHd4aS1jaGVja2JveC1tYXJrZWQnIHN0eWxlPVwiY29sb3I6Z3JlZW5cIj5PSzwvc3Bhbj5gXG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChkYXRhLmJjZGIgPT09IFwiRXJyb3JcIikge1xuICAgICAgICAgICAgICAgIHNlbGYuaGVhbHRoSW5mby5hZGQoe1xuICAgICAgICAgICAgICAgICAgICBrZXk6IFwiQkNEQlwiLFxuICAgICAgICAgICAgICAgICAgICB2YWx1ZTogYDxzcGFuIGNsYXNzPSd3ZWJpeF9pY29uIHd4aS1jbG9zZS1jaXJjbGUnIHN0eWxlPVwiY29sb3I6cmVkXCI+RXJyb3I8L3NwYW4+YFxuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoZGF0YS53aWtpcyA9PT0gXCJPS1wiKSB7XG4gICAgICAgICAgICAgICAgc2VsZi5oZWFsdGhJbmZvLmFkZCh7XG4gICAgICAgICAgICAgICAgICAgIGtleTogXCJXaWtpc1wiLFxuICAgICAgICAgICAgICAgICAgICB2YWx1ZTogYDxzcGFuIGNsYXNzPSd3ZWJpeF9pY29uIHd4aS1jaGVja2JveC1tYXJrZWQnIHN0eWxlPVwiY29sb3I6Z3JlZW5cIj5PSzwvc3Bhbj5gXG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChkYXRhLndpa2lzID09PSBcIkVycm9yXCIpIHtcbiAgICAgICAgICAgICAgICBzZWxmLmhlYWx0aEluZm8uYWRkKHtcbiAgICAgICAgICAgICAgICAgICAga2V5OiBcIldpa2lzXCIsXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlOiBgPHNwYW4gY2xhc3M9J3dlYml4X2ljb24gd3hpLWNsb3NlLWNpcmNsZScgc3R5bGU9XCJjb2xvcjpyZWRcIj5FcnJvcjwvc3Bhbj5gXG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChkYXRhLmNvZGVzZXJ2ZXIgPT09IFwiT0tcIikge1xuICAgICAgICAgICAgICAgIHNlbGYuaGVhbHRoSW5mby5hZGQoe1xuICAgICAgICAgICAgICAgICAgICBrZXk6IFwiQ29kZXNlcnZlclwiLFxuICAgICAgICAgICAgICAgICAgICB2YWx1ZTogYDxzcGFuIGNsYXNzPSd3ZWJpeF9pY29uIHd4aS1jaGVja2JveC1tYXJrZWQnIHN0eWxlPVwiY29sb3I6Z3JlZW5cIj5PSzwvc3Bhbj5gXG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChkYXRhLmNvZGVzZXJ2ZXIgPT09IFwiRXJyb3JcIikge1xuICAgICAgICAgICAgICAgIHNlbGYuaGVhbHRoSW5mby5hZGQoe1xuICAgICAgICAgICAgICAgICAgICBrZXk6IFwiQ29kZXNlcnZlclwiLFxuICAgICAgICAgICAgICAgICAgICB2YWx1ZTogYDxzcGFuIGNsYXNzPSd3ZWJpeF9pY29uIHd4aS1jbG9zZS1jaXJjbGUnIHN0eWxlPVwiY29sb3I6cmVkXCI+RXJyb3I8L3NwYW4+YFxuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoZGF0YS5qdXB5dGVyID09PSBcIk9LXCIpIHtcbiAgICAgICAgICAgICAgICBzZWxmLmhlYWx0aEluZm8uYWRkKHtcbiAgICAgICAgICAgICAgICAgICAga2V5OiBcIkp1cHl0ZXJcIixcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU6IGA8c3BhbiBjbGFzcz0nd2ViaXhfaWNvbiB3eGktY2hlY2tib3gtbWFya2VkJyBzdHlsZT1cImNvbG9yOmdyZWVuXCI+T0s8L3NwYW4+YFxuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoZGF0YS5qdXB5dGVyID09PSBcIkVycm9yXCIpIHtcbiAgICAgICAgICAgICAgICBzZWxmLmhlYWx0aEluZm8uYWRkKHtcbiAgICAgICAgICAgICAgICAgICAga2V5OiBcIkp1cHl0ZXJcIixcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU6IGA8c3BhbiBjbGFzcz0nd2ViaXhfaWNvbiB3eGktY2xvc2UtY2lyY2xlJyBzdHlsZT1cImNvbG9yOnJlZFwiPkVycm9yPC9zcGFuPmBcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgIH1cblxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc291cmNlcy92aWV3cy9kYXNoL2hlYWx0aC5qcyIsImltcG9ydCB7IEpldFZpZXcgfSBmcm9tIFwid2ViaXgtamV0XCI7XG5pbXBvcnQgeyBoZWFsdGggfSBmcm9tIFwiLi4vLi4vc2VydmljZXMvaGVhbHRoXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEpTWEluZm9WaWV3IGV4dGVuZHMgSmV0VmlldyB7XG4gICAgY29uZmlnKCkge1xuICAgICAgICBjb25zdCBpbmZvID0ge1xuICAgICAgICAgICAgaWQ6IFwianN4SW5mb1wiLFxuICAgICAgICAgICAgcmVzcG9uc2l2ZTogdHJ1ZSxcbiAgICAgICAgICAgIHZpZXc6IFwibGlzdFwiLFxuICAgICAgICAgICAgcmVzcG9uc2l2ZTogdHJ1ZSxcbiAgICAgICAgICAgIHR5cGU6IHtcbiAgICAgICAgICAgICAgICBoZWlnaHQ6IDYwLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHRlbXBsYXRlOiBgXG4gICAgICAgICAgICAgICAgPHA+PGZvbnQgc2l6ZT1cIjNcIj48Yj4ja2V5IzogPC9iPjwvZm9udD4gPGZvbnQgc2l6ZT1cIjNcIj4jdmFsdWUjPC9mb250PjwvcD5cbiAgICAgICAgICAgIGBcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICB0eXBlOiBcInNwYWNlXCIsXG4gICAgICAgICAgICByb3dzOiBbe1xuICAgICAgICAgICAgICAgIHRlbXBsYXRlOiBcIjxkaXYgc3R5bGU9J3dpZHRoOmF1dG87dGV4dC1hbGlnbjpjZW50ZXInPjxoMz5KU1ggSW5mbzxoMy8+PC9kaXY+XCIsXG4gICAgICAgICAgICAgICAgaGVpZ2h0OiA1MFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBpbmZvXG4gICAgICAgICAgICBdXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBpbml0KCkge1xuICAgICAgICBjb25zdCBzZWxmID0gdGhpcztcblxuICAgICAgICB0aGlzLmluZm8gPSB0aGlzLiQkKFwianN4SW5mb1wiKTtcblxuICAgICAgICBoZWFsdGguZ2V0SWRlbnRpdHkoKS50aGVuKGRhdGEgPT4ge1xuICAgICAgICAgICAgc2VsZi5pbmZvLmFkZCh7XG4gICAgICAgICAgICAgICAga2V5OiBcIjNib3RcIixcbiAgICAgICAgICAgICAgICB2YWx1ZTogZGF0YS50ZXh0KClcbiAgICAgICAgICAgIH0pXG4gICAgICAgIH0pXG5cbiAgICAgICAgaGVhbHRoLmdldE5ldHdvcmtJbmZvKCkudGhlbihkYXRhID0+IHtcbiAgICAgICAgICAgIGRhdGEgPSBkYXRhLmpzb24oKTtcbiAgICAgICAgICAgIHNlbGYuaW5mby5hZGQoe1xuICAgICAgICAgICAgICAgIGtleTogXCJJUFwiLFxuICAgICAgICAgICAgICAgIHZhbHVlOiBkYXRhLmlwLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBpZiAoZGF0YS5pcDYubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgc2VsZi5pbmZvLmFkZCh7XG4gICAgICAgICAgICAgICAgICAgIGtleTogXCJJUHY2XCIsXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlOiBkYXRhLmlwNlxuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHNlbGYuaW5mby5hZGQoe1xuICAgICAgICAgICAgICAgICAgICBrZXk6IFwiSVB2NlwiLFxuICAgICAgICAgICAgICAgICAgICB2YWx1ZTogXCJOb3Qgc2V0XCJcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICBoZWFsdGguZ2V0SnN4VmVyc2lvbigpLnRoZW4oZGF0YSA9PiB7XG4gICAgICAgICAgICBzZWxmLmluZm8uYWRkKHtcbiAgICAgICAgICAgICAgICBrZXk6IFwiSlNYIFZlcnNpb25cIixcbiAgICAgICAgICAgICAgICB2YWx1ZTogZGF0YS50ZXh0KClcbiAgICAgICAgICAgIH0pXG4gICAgICAgIH0pXG5cbiAgICB9XG5cbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NvdXJjZXMvdmlld3MvZGFzaC9qc3hJbmZvLmpzIiwiaW1wb3J0IHtcbiAgICBKZXRWaWV3XG59IGZyb20gXCJ3ZWJpeC1qZXRcIjtcblxuaW1wb3J0IFByb2Nlc3Nlc0NoaWxkVmlldyBmcm9tIFwiLi9wcm9jZXNzZXNDaGlsZFZpZXdcIjtcbmltcG9ydCB7XG4gICAgaGVhbHRoXG59IGZyb20gXCIuLi8uLi9zZXJ2aWNlcy9oZWFsdGhcIjtcblxuY29uc3QgY29sb3JzRGF0YXNldCA9IFt7XG4gICAgICAgIGNvbG9yOiBcIiNlZTM2MzlcIlxuICAgIH0sXG4gICAge1xuICAgICAgICBjb2xvcjogXCIjZWU5ZTM2XCJcbiAgICB9LFxuICAgIHtcbiAgICAgICAgY29sb3I6IFwiI2VlZWEzNlwiXG4gICAgfSxcbiAgICB7XG4gICAgICAgIGNvbG9yOiBcIiNhOWVlMzZcIlxuICAgIH0sXG4gICAge1xuICAgICAgICBjb2xvcjogXCIjMzZkM2VlXCJcbiAgICB9LFxuICAgIHtcbiAgICAgICAgY29sb3I6IFwiIzM2N2ZlZVwiXG4gICAgfSxcbiAgICB7XG4gICAgICAgIGNvbG9yOiBcIiM5YjM2ZWVcIlxuICAgIH1cbl07XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFByb2Nlc3Nlc1ZpZXcgZXh0ZW5kcyBKZXRWaWV3IHtcblxuICAgIGNvbmZpZygpIHtcbiAgICAgICAgY29uc3QgcHJvY2Vzc2VzSW5mbyA9IHtcbiAgICAgICAgICAgIGlkOiBcInByb2Nlc3NcIixcbiAgICAgICAgICAgIHZpZXc6IFwiY2hhcnRcIixcbiAgICAgICAgICAgIHJlc3BvbnNpdmU6IHRydWUsXG4gICAgICAgICAgICB0eXBlOiBcInBpZVwiLFxuICAgICAgICAgICAgd2lkdGg6IDUwMCxcbiAgICAgICAgICAgIGhlaWdodDogNDAwLFxuICAgICAgICAgICAgY29sb3I6IFwiI2NvbG9yI1wiLFxuICAgICAgICAgICAgdmFsdWU6IFwiI3JzcyNcIixcbiAgICAgICAgICAgIGxhYmVsOiBcIjxoND4jbmFtZSM8L2g0PlwiLFxuICAgICAgICAgICAgcGllSW5uZXJUZXh0OiBcIjxoND4jcnNzIzwvaDQ+XCIsXG4gICAgICAgICAgICBkYXRhOiBcIiNjaGFydHNEYXRhI1wiLFxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHR5cGU6IFwic3BhY2VcIixcbiAgICAgICAgICAgIHJvd3M6IFt7XG4gICAgICAgICAgICAgICAgICAgIHRlbXBsYXRlOiBcIjxkaXYgc3R5bGU9J3dpZHRoOmF1dG87dGV4dC1hbGlnbjpjZW50ZXInPjxoMz5SdW5uaW5nIHByb2Nlc3NlcyBtZW1vcnkgdXNhZ2UgKFJTUykgKE1CKTxoMy8+PC9kaXY+XCIsXG4gICAgICAgICAgICAgICAgICAgIGhlaWdodDogNTBcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHByb2Nlc3Nlc0luZm8sXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICB2aWV3OiBcImJ1dHRvblwiLFxuICAgICAgICAgICAgICAgICAgICBpZDogXCJzaG93X2FsbFwiLFxuICAgICAgICAgICAgICAgICAgICB2YWx1ZTogXCJTaG93IEFsbFwiLFxuICAgICAgICAgICAgICAgICAgICBhbGlnbjogXCJjZW50ZXJcIixcbiAgICAgICAgICAgICAgICAgICAgY3NzOiBcIndlYml4X3ByaW1hcnlcIixcbiAgICAgICAgICAgICAgICAgICAgaW5wdXRXaWR0aDogMTAwLFxuICAgICAgICAgICAgICAgICAgICBjbGljazogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy4kc2NvcGUuY2hpbGR2aWV3LnNob3dGb3IodGhpcy4kc2NvcGUucHJvY2Vzc2VzTGlzdClcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgXVxuICAgICAgICB9XG4gICAgfVxuXG5cbiAgICBpbml0KHZpZXcpIHtcbiAgICAgICAgY29uc3Qgc2VsZiA9IHRoaXM7XG5cbiAgICAgICAgdGhpcy5wcm9jZXNzZXNMaXN0ID0gW11cblxuICAgICAgICB0aGlzLnJ1blByb2Nlc3NJbmZvID0gdGhpcy4kJChcInByb2Nlc3NcIik7XG5cbiAgICAgICAgc2VsZi5jaGlsZHZpZXcgPSBzZWxmLnVpKFByb2Nlc3Nlc0NoaWxkVmlldyk7XG5cbiAgICAgICAgaGVhbHRoLmdldFJ1bm5pbmdQcm9jZXNzZXMoKS50aGVuKGRhdGEgPT4ge1xuICAgICAgICAgICAgdmFyIGNoYXJ0c0RhdGEgPSBbXVxuXG4gICAgICAgICAgICBkYXRhID0gZGF0YS5qc29uKCk7XG4gICAgICAgICAgICBzZWxmLnByb2Nlc3Nlc0xpc3QgPSBkYXRhLnByb2Nlc3Nlc19saXN0XG5cbiAgICAgICAgICAgIC8vIG1lbW9yeSB1c2FnZVxuICAgICAgICAgICAgc2VsZi5tZW1vcnlVc2FnZSA9IGRhdGEubWVtb3J5X3VzYWdlXG4gICAgICAgICAgICBzZWxmLnRvdGFsTWVtb3J5ID0gc2VsZi5tZW1vcnlVc2FnZS50b3RhbF9tZW1cbiAgICAgICAgICAgIHNlbGYucGVyY2VudCA9IHNlbGYubWVtb3J5VXNhZ2UudXNhZ2VfcGVyY2VudFxuXG5cbiAgICAgICAgICAgIHNlbGYucnVuUHJvY2Vzc0luZm8uZGVmaW5lKFwibGVnZW5kXCIsIHtcbiAgICAgICAgICAgICAgICBsYXlvdXQ6IFwieFwiLFxuICAgICAgICAgICAgICAgIHdpZHRoOiAxMTAsXG4gICAgICAgICAgICAgICAgdmFsdWVzOiBbe1xuICAgICAgICAgICAgICAgICAgICAgICAgdGV4dDogYDxiPlRvdGFsIG1lbW9yeTogPC9iPiR7c2VsZi50b3RhbE1lbW9yeX1HQmBcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGV4dDogYDxiPlVzYWdlOiA8L2I+JHtzZWxmLnBlcmNlbnR9JWBcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICBzZWxmLnJ1blByb2Nlc3NJbmZvLnJlZnJlc2goKVxuXG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHNlbGYucHJvY2Vzc2VzTGlzdC5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIC8vQnJlYWsgd2hlbiB0aGVyZSBpcyBubyBtb3JlIGNvbG9yc1xuICAgICAgICAgICAgICAgIGlmIChpID09IGNvbG9yc0RhdGFzZXQubGVuZ3RoKVxuICAgICAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgICAgIHZhciB0ZW1wID0ge1xuICAgICAgICAgICAgICAgICAgICBcImNvbG9yXCI6IGNvbG9yc0RhdGFzZXRbaV0uY29sb3IsXG4gICAgICAgICAgICAgICAgICAgIFwibmFtZVwiOiBzZWxmLnByb2Nlc3Nlc0xpc3RbaV0ubmFtZSxcbiAgICAgICAgICAgICAgICAgICAgXCJyc3NcIjogTWF0aC5jZWlsKHNlbGYucHJvY2Vzc2VzTGlzdFtpXS5yc3MpLFxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBjaGFydHNEYXRhLnB1c2godGVtcClcbiAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhteUFycmF5W2ldKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgc2VsZi5ydW5Qcm9jZXNzSW5mby5wYXJzZSh7XG4gICAgICAgICAgICAgICAgZGF0YTogY2hhcnRzRGF0YSxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9XG5cbn1cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zb3VyY2VzL3ZpZXdzL2Rhc2gvcHJvY2Vzc2VzLmpzIiwiaW1wb3J0IHsgSmV0VmlldyB9IGZyb20gXCJ3ZWJpeC1qZXRcIjtcblxuaW1wb3J0IHsgaGVhbHRoIH0gZnJvbSBcIi4uLy4uL3NlcnZpY2VzL2hlYWx0aFwiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBydW5uaW5nUG9ydHNWaWV3IGV4dGVuZHMgSmV0VmlldyB7XG4gICAgY29uZmlnKCkge1xuICAgICAgICBjb25zdCBwb3J0cyA9IHtcbiAgICAgICAgICAgIGlkOiBcInJ1bm5pbmdQb3J0c1wiLFxuICAgICAgICAgICAgdmlldzogXCJkYXRhdGFibGVcIixcbiAgICAgICAgICAgIHJlc3BvbnNpdmU6IHRydWUsXG4gICAgICAgICAgICBhdXRvQ29uZmlnOiB0cnVlLFxuICAgICAgICAgICAgdHlwZToge1xuICAgICAgICAgICAgICAgIGhlaWdodDogMjAwLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHRlbXBsYXRlOiBcIlJ1bm5pbmcgUG9ydHNcIixcbiAgICAgICAgICAgIHJlc2l6ZUNvbHVtbjogdHJ1ZSxcbiAgICAgICAgICAgIHNlbGVjdDogdHJ1ZSxcbiAgICAgICAgICAgIG11bHRpc2VsZWN0OiB0cnVlLFxuICAgICAgICAgICAgY3NzOiBcIndlYml4X2hlYWRlcl9ib3JkZXIgd2ViaXhfZGF0YV9ib3JkZXJcIixcbiAgICAgICAgICAgIGNvbHVtbnM6IFt7XG4gICAgICAgICAgICAgICAgaWQ6IFwiaW5kZXhcIixcbiAgICAgICAgICAgICAgICBoZWFkZXI6IFwiI1wiLFxuICAgICAgICAgICAgICAgIHNvcnQ6IFwiaW50XCIsXG4gICAgICAgICAgICAgICAgYXV0b3dpZHRoOiB0cnVlLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBpZDogXCJwb3J0X251bWJlclwiLFxuICAgICAgICAgICAgICAgIGhlYWRlcjogW1wiUG9ydCBOdW1iZXJcIiwge1xuICAgICAgICAgICAgICAgICAgICBjb250ZW50OiBcInRleHRGaWx0ZXJcIlxuICAgICAgICAgICAgICAgIH0sXSxcbiAgICAgICAgICAgICAgICBzb3J0OiBcInN0cmluZ1wiXG4gICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgaWQ6IFwicHJvY2Vzc1wiLFxuICAgICAgICAgICAgICAgIGhlYWRlcjogW1wiUHJvY2Vzc1wiLCB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnRlbnQ6IFwidGV4dEZpbHRlclwiXG4gICAgICAgICAgICAgICAgfV0sXG4gICAgICAgICAgICAgICAgc29ydDogXCJzdHJpbmdcIlxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgXSxcbiAgICAgICAgICAgIHNjaGVtZToge1xuICAgICAgICAgICAgICAgICRpbml0OiBmdW5jdGlvbiAob2JqKSB7XG4gICAgICAgICAgICAgICAgICAgIG9iai5pbmRleCA9IHRoaXMuY291bnQoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHR5cGU6IFwic3BhY2VcIixcbiAgICAgICAgICAgIHJvd3M6IFtcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIHRlbXBsYXRlOiBcIjxkaXYgc3R5bGU9J3dpZHRoOmF1dG87dGV4dC1hbGlnbjpjZW50ZXInPjxoMz5Qb3J0czxoMy8+PC9kaXY+XCIsXG4gICAgICAgICAgICAgICAgICAgIGhlaWdodDogNTBcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHBvcnRzXG4gICAgICAgICAgICBdXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBpbml0KCkge1xuICAgICAgICBjb25zdCBzZWxmID0gdGhpcztcblxuICAgICAgICBzZWxmLnBvcnRzVGFibGUgPSB0aGlzLiQkKFwicnVubmluZ1BvcnRzXCIpO1xuICAgICAgICBoZWFsdGguZ2V0UnVubmluZ1BvcnRzKCkudGhlbihkYXRhID0+IHtcbiAgICAgICAgICAgIHNlbGYucG9ydHNUYWJsZS5wYXJzZShkYXRhLmpzb24oKSk7XG4gICAgICAgIH0pO1xuICAgIH1cblxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc291cmNlcy92aWV3cy9kYXNoL3J1bm5pbmdQb3J0cy5qcyIsImltcG9ydCB7IEpldFZpZXcsIHBsdWdpbnMgfSBmcm9tIFwid2ViaXgtamV0XCI7XG5pbXBvcnQgeyBhdXRoIH0gZnJvbSBcIi4uL3NlcnZpY2VzL2F1dGhcIjtcblxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBUb3BWaWV3IGV4dGVuZHMgSmV0VmlldyB7XG4gICAgY29uZmlnKCkge1xuICAgICAgICBjb25zdCBoZWFkZXIgPSB7XG4gICAgICAgICAgICBjb2xzOiBbXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBpZDogXCJidXR0b25faGlkZV9tZW51XCIsXG4gICAgICAgICAgICAgICAgICAgIHZpZXc6IFwiaWNvblwiLCBpY29uOiBcIm1kaSBtZGktbWVudVwiLFxuICAgICAgICAgICAgICAgICAgICBjc3M6IFwiY3VzdG9tX2RhcmtcIiwgaGVpZ2h0OiA1OCxcbiAgICAgICAgICAgICAgICAgICAgY2xpY2s6IHRoaXMuaGlkZU1lbnUsXG4gICAgICAgICAgICAgICAgICAgIHRvb2x0aXA6IFwiSGlkZSBtZW51XCIsXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIGlkOiBcImhlYWRlclwiLFxuICAgICAgICAgICAgICAgICAgICB0eXBlOiBcImhlYWRlclwiLFxuICAgICAgICAgICAgICAgICAgICBjc3M6IFwiY3VzdG9tX2RhcmtcIiwgaGVpZ2h0OiA1OCxcbiAgICAgICAgICAgICAgICAgICAgdGVtcGxhdGU6IFwiQURNSU5cIixcbiAgICAgICAgICAgICAgICAgICAgYm9yZGVybGVzczogdHJ1ZSxcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgXVxuICAgICAgICB9O1xuXG4gICAgICAgIGNvbnN0IHNpZGViYXJEYXRhID0gW3tcbiAgICAgICAgICAgIGlkOiBcImRhc2hcIixcbiAgICAgICAgICAgIHZhbHVlOiBcIkRhc2hib2FyZFwiLFxuICAgICAgICAgICAgaWNvbjogXCJtZGkgbWRpLXZpZXctZGFzaGJvYXJkXCJcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgICAgaWQ6IFwid2lraXNcIixcbiAgICAgICAgICAgIHZhbHVlOiBcIlBhY2thZ2VzIERvY3NcIixcbiAgICAgICAgICAgIGljb246IFwibWRpIG1kaS1uZXdzcGFwZXJcIlxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgICBpZDogXCJhbGVydHNcIixcbiAgICAgICAgICAgIHZhbHVlOiBcIkFsZXJ0c1wiLFxuICAgICAgICAgICAgaWNvbjogXCJtZGkgbWRpLWJlbGwtYWxlcnRcIlxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgICBpZDogXCJsb2dzXCIsXG4gICAgICAgICAgICB2YWx1ZTogXCJMb2dzXCIsXG4gICAgICAgICAgICBpY29uOiBcIm1kaSBtZGktaGlzdG9yeVwiXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICAgIGlkOiBcIm15am9ic19tYWluXCIsXG4gICAgICAgICAgICB2YWx1ZTogXCJNeSBqb2JzXCIsXG4gICAgICAgICAgICBpY29uOiBcIm1kaSBtZGktYW5pbWF0aW9uLXBsYXlcIixcbiAgICAgICAgICAgIGRhdGE6IFt7XG4gICAgICAgICAgICAgICAgaWQ6IFwibXlqb2JzXCIsXG4gICAgICAgICAgICAgICAgaWNvbjogXCJtZGkgbWRpLWJvb2stb3BlblwiLFxuICAgICAgICAgICAgICAgIHZhbHVlOiBcIkpvYnNcIlxuICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIGlkOiBcIndvcmtlcnNcIixcbiAgICAgICAgICAgICAgICBpY29uOiBcIm1kaSBtZGktd29ya2VyXCIsXG4gICAgICAgICAgICAgICAgdmFsdWU6IFwiV29ya2Vyc1wiXG4gICAgICAgICAgICB9XVxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgICBpZDogXCJ0Zndpa2lzX21haW5cIixcbiAgICAgICAgICAgIHZhbHVlOiBcIlRGIFdpa2lzXCIsXG4gICAgICAgICAgICBpY29uOiBcIm1kaSBtZGktYW5pbWF0aW9uLXBsYXlcIixcbiAgICAgICAgICAgIGRhdGE6IFt7XG4gICAgICAgICAgICAgICAgaWQ6IFwidGZncmlkc2RrXCIsXG4gICAgICAgICAgICAgICAgaWNvbjogXCJtZGkgbWRpLWJvb2stb3BlblwiLFxuICAgICAgICAgICAgICAgIHZhbHVlOiBcIlRGR3JpZFNES1wiXG4gICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgaWQ6IFwidGhyZWVmb2xkXCIsXG4gICAgICAgICAgICAgICAgaWNvbjogXCJtZGkgbWRpLXdvcmtlclwiLFxuICAgICAgICAgICAgICAgIHZhbHVlOiBcIlRocmVlZm9sZFwiXG4gICAgICAgICAgICB9XVxuICAgICAgICB9LFxuXG4gICAgICAgIHtcbiAgICAgICAgICAgIGlkOiBcInBhY2thZ2VzXCIsXG4gICAgICAgICAgICB2YWx1ZTogXCJQYWNrYWdlc1wiLFxuICAgICAgICAgICAgaWNvbjogXCJtZGkgbWRpLXBhY2thZ2VcIlxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgICBpZDogXCJkZXBsb3llZFNvbHV0aW9uc1wiLFxuICAgICAgICAgICAgdmFsdWU6IFwiRGVwbG95ZWQgU29sdXRpb25zXCIsXG4gICAgICAgICAgICBpY29uOiBcIm1kaSBtZGktYW5pbWF0aW9uLXBsYXlcIlxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgICBpZDogXCJzb2x1dGlvbnNcIixcbiAgICAgICAgICAgIHZhbHVlOiBcIlNvbHV0aW9uc1wiLFxuICAgICAgICAgICAgaWNvbjogXCJtZGkgbWRpLWFuaW1hdGlvbi1wbGF5XCIsXG4gICAgICAgICAgICBkYXRhOiBbe1xuICAgICAgICAgICAgICAgIGlkOiBcIm5ldHdvcmtcIixcbiAgICAgICAgICAgICAgICB2YWx1ZTogJzxzcGFuPjxpbWcgY2xhc3M9XCJzb2x1dGlvbnMtaWNvblwiIHNyYz1cInN0YXRpYy9pbWcvbmV0d29yay5wbmdcIi8+TmV0d29yazwvc3Bhbj4nXG4gICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgaWQ6IFwidWJ1bnR1XCIsXG4gICAgICAgICAgICAgICAgdmFsdWU6ICc8c3Bhbj48aW1nIGNsYXNzPVwic29sdXRpb25zLWljb25cIiBzcmM9XCJzdGF0aWMvaW1nL3VidW50dS5wbmdcIi8+VWJ1bnR1PC9zcGFuPidcbiAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICBpZDogXCJmbGlzdFwiLFxuICAgICAgICAgICAgICAgIHZhbHVlOiAnPHNwYW4+PGltZyBjbGFzcz1cInNvbHV0aW9ucy1pY29uXCIgc3JjPVwic3RhdGljL2ltZy9mbGlzdC5wbmdcIi8+R2VuZXJpYyBmbGlzdDwvc3Bhbj4nXG4gICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgaWQ6IFwibWluaW9cIixcbiAgICAgICAgICAgICAgICB2YWx1ZTogJzxzcGFuPjxpbWcgY2xhc3M9XCJzb2x1dGlvbnMtaWNvblwiIHNyYz1cInN0YXRpYy9pbWcvbWluaW8ucG5nXCIvPk1pbmlvIC8gUzM8L3NwYW4+J1xuICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIGlkOiBcIms4c19jbHVzdGVyXCIsXG4gICAgICAgICAgICAgICAgdmFsdWU6ICc8c3Bhbj48aW1nIGNsYXNzPVwic29sdXRpb25zLWljb25cIiBzcmM9XCJzdGF0aWMvaW1nL2s4cy5wbmdcIi8+S3ViZXJuZXRlcyBjbHVzdGVyPC9zcGFuPidcbiAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICBpZDogXCJ3ZWJnYXRld2F5XCIsXG4gICAgICAgICAgICAgICAgdmFsdWU6ICdXZWIgR2F0ZXdheScsXG4gICAgICAgICAgICAgICAgaWNvbjogXCJtZGkgbWRpLW5ldHdvcmtcIlxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgXVxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgICBpZDogXCJ3YWxsZXRzTWFuYWdlclwiLFxuICAgICAgICAgICAgdmFsdWU6IFwiV2FsbGV0cyBNYW5hZ2VyXCIsXG4gICAgICAgICAgICBpY29uOiBcIm1kaSBtZGktd2FsbGV0XCJcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgICAgaWQ6IFwiY2FwYWNpdHlcIixcbiAgICAgICAgICAgIHZhbHVlOiBcIkNhcGFjaXR5XCIsXG4gICAgICAgICAgICBpY29uOiBcIm1kaSBtZGktc2VydmVyXCJcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgICAgaWQ6IFwiZmFybW1hbmFnZW1lbnRcIixcbiAgICAgICAgICAgIHZhbHVlOiBcIkZhcm0gTWFuYWdlbWVudFwiLFxuICAgICAgICAgICAgaWNvbjogXCJtZGkgbWRpLXNlcnZlclwiXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICAgIGlkOiBcInNka2V4YW1wbGVzXCIsXG4gICAgICAgICAgICB2YWx1ZTogXCJTREsgRXhhbXBsZXNcIixcbiAgICAgICAgICAgIGljb246IFwibWRpIG1kaS1maWxlXCJcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgICAgaWQ6IFwiY29kZXNlcnZlclwiLFxuICAgICAgICAgICAgdmFsdWU6IFwiQ29kZXNlcnZlclwiLFxuICAgICAgICAgICAgaWNvbjogXCJtZGkgbWRpLWNvZGUtdGFnc1wiXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICAgIGlkOiBcImp1cHl0ZXJcIixcbiAgICAgICAgICAgIHZhbHVlOiBcIlRGIFNpbXVsYXRvclwiLFxuICAgICAgICAgICAgaWNvbjogXCJtZGkgbWRpLXBsYXlcIlxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgICBpZDogXCJzZXR0aW5nc1wiLFxuICAgICAgICAgICAgdmFsdWU6IFwiU2V0dGluZ3NcIixcbiAgICAgICAgICAgIGljb246IFwibWRpIG1kaS1zZXR0aW5nc1wiXG4gICAgICAgIH0sXG4gICAgICAgIF1cblxuICAgICAgICBjb25zdCByZXNwb25zZSA9IHdlYml4LmFqYXgoKS5zeW5jKCkuZ2V0KFwiL3plcm9ib3QvYWRtaW4vYWN0b3JzL3BhY2thZ2VfbWFuYWdlci9wYWNrYWdlc19saXN0XCIsIHsgaGFzX2Zyb250ZW5kX2FyZ3M6IHRydWUsIHN0YXR1czogXCJpbnN0YWxsZWRcIiB9KTtcbiAgICAgICAgbGV0IHBhY2thZ2VzO1xuXG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBwYWNrYWdlcyA9IEpTT04ucGFyc2UocmVzcG9uc2UucmVzcG9uc2VUZXh0KS5wYWNrYWdlcztcbiAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICAgIHBhY2thZ2VzID0gW107XG4gICAgICAgIH1cblxuICAgICAgICBmb3IgKGNvbnN0IHAgb2YgcGFja2FnZXMpIHtcbiAgICAgICAgICAgIHNpZGViYXJEYXRhLnB1c2gocC5mcm9udGVuZF9hcmdzKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IHNpZGViYXIgPSB7XG4gICAgICAgICAgICBsb2NhbElkOiBcIm1lbnVcIixcbiAgICAgICAgICAgIHZpZXc6IFwic2lkZWJhclwiLFxuICAgICAgICAgICAgY3NzOiBcIndlYml4X2RhcmtcIixcbiAgICAgICAgICAgIHdpZHRoOiAyMDAsXG4gICAgICAgICAgICBkYXRhOiBzaWRlYmFyRGF0YSxcbiAgICAgICAgfTtcblxuICAgICAgICBjb25zdCB0b29sYmFyID0ge1xuICAgICAgICAgICAgdmlldzogXCJ0b29sYmFyXCIsXG4gICAgICAgICAgICBwYWRkaW5nOiA5LFxuICAgICAgICAgICAgaGVpZ2h0OiA1OCxcbiAgICAgICAgICAgIGNvbHM6IFt7XG4gICAgICAgICAgICAgICAgaWQ6IFwiYnV0dG9uX3Nob3dfbWVudVwiLFxuICAgICAgICAgICAgICAgIHZpZXc6IFwiaWNvblwiLFxuICAgICAgICAgICAgICAgIGljb246IFwibWRpIG1kaS1tZW51XCIsXG4gICAgICAgICAgICAgICAgY2xpY2s6IHRoaXMuc2hvd01lbnUsXG4gICAgICAgICAgICAgICAgaGlkZGVuOiB0cnVlLCAvLyBoaWRkZW4gYnkgZGVmYXVsdFxuICAgICAgICAgICAgICAgIHRvb2x0aXA6IFwiU2hvdyBtZW51XCIsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHZpZXc6IFwidGVtcGxhdGVcIixcbiAgICAgICAgICAgICAgICB0ZW1wbGF0ZTogYDxpbWcgY2xhc3M9XCJ3ZWJpeF9pY29uXCIgc3JjPVwic3RhdGljL2ltZy8zYm90LnBuZ1wiLz5gLFxuICAgICAgICAgICAgICAgIGJvcmRlcmxlc3M6IHRydWUsXG4gICAgICAgICAgICAgICAgaGVpZ2h0OiA0MCxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgaWQ6IFwidXNlcm5hbWVfbGFiZWxcIixcbiAgICAgICAgICAgICAgICB2aWV3OiBcImxhYmVsXCIsXG4gICAgICAgICAgICAgICAgbGFiZWw6IFwidXNlcm5hbWVcIixcbiAgICAgICAgICAgICAgICBib3JkZXJsZXNzOiB0cnVlLFxuICAgICAgICAgICAgICAgIGFsaWduOiBcInJpZ2h0XCIsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGlkOiBcInVzZXJfaWNvblwiLFxuICAgICAgICAgICAgICAgIHZpZXc6IFwiaWNvblwiLFxuICAgICAgICAgICAgICAgIGljb246IFwibWRpIG1kaS1hY2NvdW50LWNpcmNsZVwiLFxuICAgICAgICAgICAgICAgIGJvcmRlcmxlc3M6IHRydWUsXG4gICAgICAgICAgICAgICAgcG9wdXA6IFwidXNlcl9tZW51XCJcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIF1cbiAgICAgICAgfTtcblxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgdHlwZTogXCJjbGVhblwiLFxuICAgICAgICAgICAgY29sczogW3tcbiAgICAgICAgICAgICAgICByb3dzOiBbaGVhZGVyLCBzaWRlYmFyXVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICByb3dzOiBbXG4gICAgICAgICAgICAgICAgICAgIHRvb2xiYXIsXG4gICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICRzdWJ2aWV3OiB0cnVlXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBdXG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgc2hvd01lbnUoKSB7XG4gICAgICAgIHRoaXMuJHNjb3BlLm1lbnUuc2hvdygpO1xuICAgICAgICB0aGlzLiRzY29wZS5oZWFkZXIuc2hvdygpO1xuICAgICAgICB0aGlzLiRzY29wZS5idXR0b25IaWRlTWVudS5zaG93KCk7XG5cbiAgICAgICAgdGhpcy4kc2NvcGUuYnV0dG9uU2hvd01lbnUuaGlkZSgpO1xuICAgIH1cblxuICAgIGhpZGVNZW51KCkge1xuICAgICAgICB0aGlzLiRzY29wZS5tZW51LmhpZGUoKTtcbiAgICAgICAgdGhpcy4kc2NvcGUuaGVhZGVyLmhpZGUoKTtcbiAgICAgICAgdGhpcy4kc2NvcGUuYnV0dG9uSGlkZU1lbnUuaGlkZSgpO1xuXG4gICAgICAgIHRoaXMuJHNjb3BlLmJ1dHRvblNob3dNZW51LnNob3coKTtcbiAgICB9XG5cbiAgICBpbml0KCkge1xuICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XG5cbiAgICAgICAgdGhpcy51c2UocGx1Z2lucy5NZW51LCB7XG4gICAgICAgICAgICBpZDogXCJtZW51XCIsXG4gICAgICAgICAgICB1cmxzOiB7XG4gICAgICAgICAgICAgICAgbXlqb2JzOiBcIm15am9icy5qb2JzXCIsXG4gICAgICAgICAgICAgICAgd29ya2VyczogXCJteWpvYnMud29ya2Vyc1wiLFxuICAgICAgICAgICAgICAgIHRmZ3JpZHNkazogXCJ0Zndpa2lzLnRmZ3JpZHNka1wiLFxuICAgICAgICAgICAgICAgIHRocmVlZm9sZDogXCJ0Zndpa2lzLnRocmVlZm9sZFwiLFxuICAgICAgICAgICAgICAgIHVidW50dTogXCJzb2x1dGlvbnMuY2hhdGZsb3c/YXV0aG9yPXRmZ3JpZF9zb2x1dGlvbnMmcGFja2FnZT10ZmdyaWRfc29sdXRpb25zJmNoYXQ9dWJ1bnR1X2RlcGxveVwiLFxuICAgICAgICAgICAgICAgIG5ldHdvcms6IFwic29sdXRpb25zLmNoYXRmbG93P2F1dGhvcj10ZmdyaWRfc29sdXRpb25zJnBhY2thZ2U9dGZncmlkX3NvbHV0aW9ucyZjaGF0PW5ldHdvcmtfZGVwbG95XCIsXG4gICAgICAgICAgICAgICAgZmxpc3Q6IFwic29sdXRpb25zLmNoYXRmbG93P2F1dGhvcj10ZmdyaWRfc29sdXRpb25zJnBhY2thZ2U9dGZncmlkX3NvbHV0aW9ucyZjaGF0PXlvdXJfZmxpc3RcIixcbiAgICAgICAgICAgICAgICBtaW5pbzogXCJzb2x1dGlvbnMuY2hhdGZsb3c/YXV0aG9yPXRmZ3JpZF9zb2x1dGlvbnMmcGFja2FnZT10ZmdyaWRfc29sdXRpb25zJmNoYXQ9bWluaW9fZGVwbG95XCIsXG4gICAgICAgICAgICAgICAgd2ViZ2F0ZXdheTogXCJzb2x1dGlvbnMuY2hhdGZsb3c/YXV0aG9yPXRmZ3JpZF9zb2x1dGlvbnMmcGFja2FnZT10ZmdyaWRfc29sdXRpb25zJmNoYXQ9d2ViZ2F0ZXdheV9kZXBsb3lcIixcbiAgICAgICAgICAgICAgICBrOHNfY2x1c3RlcjogXCJzb2x1dGlvbnMuY2hhdGZsb3c/YXV0aG9yPXRmZ3JpZF9zb2x1dGlvbnMmcGFja2FnZT10ZmdyaWRfc29sdXRpb25zJmNoYXQ9a3ViZXJuZXRlc19jbHVzdGVyX2RlcGxveVwiLFxuICAgICAgICAgICAgICAgIHRocmVlYm90OiBcInNvbHV0aW9ucy5jaGF0Zmxvdz9hdXRob3I9dGZncmlkJnBhY2thZ2U9dGhyZWVib3RfcHJvdmlzaW9uaW5nJmNoYXQ9dGhyZWVib3RfcmVzZXJ2YXRpb25cIixcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgdGhpcy5tZW51ID0gdGhpcy4kJChcIm1lbnVcIik7XG4gICAgICAgIHRoaXMuaGVhZGVyID0gdGhpcy4kJChcImhlYWRlclwiKTtcblxuICAgICAgICB0aGlzLmJ1dHRvblNob3dNZW51ID0gdGhpcy4kJChcImJ1dHRvbl9zaG93X21lbnVcIik7XG4gICAgICAgIHRoaXMuYnV0dG9uSGlkZU1lbnUgPSB0aGlzLiQkKFwiYnV0dG9uX2hpZGVfbWVudVwiKTtcblxuXG4gICAgICAgIHRoaXMud2ViaXgudWkoe1xuICAgICAgICAgICAgdmlldzogXCJzdWJtZW51XCIsXG4gICAgICAgICAgICBpZDogXCJ1c2VyX21lbnVcIixcbiAgICAgICAgICAgIGF1dG93aWR0aDogdHJ1ZSxcbiAgICAgICAgICAgIGRhdGE6IFtdXG4gICAgICAgIH0pO1xuXG4gICAgICAgIHRoaXMudXNlck1lbnUgPSAkJChcInVzZXJfbWVudVwiKTtcbiAgICAgICAgdGhpcy51c2VyTWVudS5hdHRhY2hFdmVudChcIm9uSXRlbUNsaWNrXCIsIGZ1bmN0aW9uIChpZCwgZSwgbm9kZSkge1xuICAgICAgICAgICAgaWYgKGlkID09IFwibG9nb3V0XCIpIHtcbiAgICAgICAgICAgICAgICBhdXRoLmxvZ291dCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICB0aGlzLnVzZXJuYW1lTGFiZWwgPSAkJChcInVzZXJuYW1lX2xhYmVsXCIpO1xuXG4gICAgICAgIGF1dGguZ2V0Q3VycmVudFVzZXIoKS50aGVuKGRhdGEgPT4ge1xuICAgICAgICAgICAgY29uc3QgaW5mbyA9IGRhdGEuanNvbigpXG4gICAgICAgICAgICBsZXQgdXNlcm5hbWUgPSBpbmZvLnVzZXJuYW1lO1xuXG4gICAgICAgICAgICBpZiAoaW5mby5kZXZtb2RlKSB7XG4gICAgICAgICAgICAgICAgdXNlcm5hbWUgKz0gXCIgW2RldmVsb3BtZW50XVwiXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHNlbGYudXNlcm5hbWVMYWJlbC5jb25maWcubGFiZWwgPSB1c2VybmFtZTtcbiAgICAgICAgICAgIHNlbGYudXNlcm5hbWVMYWJlbC5jb25maWcud2lkdGggPSB3ZWJpeC5odG1sLmdldFRleHRTaXplKHVzZXJuYW1lKSArIDEwO1xuICAgICAgICAgICAgc2VsZi51c2VybmFtZUxhYmVsLnJlZnJlc2goKTtcblxuICAgICAgICAgICAgc2VsZi51c2VyTWVudS5hZGQoeyBpZDogJ2VtYWlsJywgdmFsdWU6IGluZm8uZW1haWwgfSlcbiAgICAgICAgICAgIHNlbGYudXNlck1lbnUuYWRkKHsgaWQ6ICdsb2dvdXQnLCB2YWx1ZTogXCJMb2dvdXRcIiB9KVxuICAgICAgICB9KS5jYXRjaCgoKSA9PiB7XG4gICAgICAgICAgICBhdXRoLmxvZ291dCgpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NvdXJjZXMvdmlld3MvbWFpbi5qcyIsImltcG9ydCB7IEpldFZpZXcgfSBmcm9tIFwid2ViaXgtamV0XCI7XG5cbmltcG9ydCB7IGRhdGVGb3JtYXR0ZXIgfSBmcm9tIFwiLi4vLi4vY29tbW9uL2Zvcm1hdHRlcnNcIjtcbmltcG9ydCB7IG15am9icyB9IGZyb20gXCIuLi8uLi9zZXJ2aWNlcy9teWpvYnNcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgSm9ic1ZpZXcgZXh0ZW5kcyBKZXRWaWV3IHtcbiAgICBjb25maWcoKSB7XG4gICAgICAgIGNvbnN0IHZpZXcgPSB7XG4gICAgICAgICAgICB2aWV3OiBcImRhdGF0YWJsZVwiLFxuICAgICAgICAgICAgaWQ6IFwiam9ic190YWJsZVwiLFxuICAgICAgICAgICAgcmVzaXplQ29sdW1uOiB0cnVlLFxuICAgICAgICAgICAgc2VsZWN0OiB0cnVlLFxuICAgICAgICAgICAgbXVsdGlzZWxlY3Q6IHRydWUsXG4gICAgICAgICAgICBjc3M6IFwid2ViaXhfaGVhZGVyX2JvcmRlciB3ZWJpeF9kYXRhX2JvcmRlclwiLFxuICAgICAgICAgICAgY29sdW1uczogW3tcbiAgICAgICAgICAgICAgICBpZDogXCJpbmRleFwiLFxuICAgICAgICAgICAgICAgIGhlYWRlcjogXCIjXCIsXG4gICAgICAgICAgICAgICAgc29ydDogXCJpbnRcIixcbiAgICAgICAgICAgICAgICBhdXRvd2lkdGg6IHRydWUsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGlkOiBcImNhdGVnb3J5XCIsXG4gICAgICAgICAgICAgICAgaGVhZGVyOiBcIkNhdGVnb3J5XCIsXG4gICAgICAgICAgICAgICAgc29ydDogXCJzdHJpbmdcIlxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBpZDogXCJ0aW1lX3N0YXJ0XCIsXG4gICAgICAgICAgICAgICAgaGVhZGVyOiBcIlN0YXJ0IHRpbWVcIixcbiAgICAgICAgICAgICAgICBzb3J0OiBcImRhdGVcIixcbiAgICAgICAgICAgICAgICBmb3JtYXQ6IGRhdGVGb3JtYXR0ZXIsXG4gICAgICAgICAgICAgICAgd2lkdGg6IDIwMFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBpZDogXCJ0aW1lX3N0b3BcIixcbiAgICAgICAgICAgICAgICBoZWFkZXI6IFwiU3RvcCB0aW1lXCIsXG4gICAgICAgICAgICAgICAgc29ydDogXCJkYXRlXCIsXG4gICAgICAgICAgICAgICAgZm9ybWF0OiBkYXRlRm9ybWF0dGVyLFxuICAgICAgICAgICAgICAgIHdpZHRoOiAyMDBcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgaWQ6IFwidGltZW91dFwiLFxuICAgICAgICAgICAgICAgIGhlYWRlcjogXCJUaW1lb3V0XCIsXG4gICAgICAgICAgICAgICAgc29ydDogXCJpbnRcIlxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBpZDogXCJhY3Rpb25faWRcIixcbiAgICAgICAgICAgICAgICBoZWFkZXI6IFwiQWN0aW9uXCIsXG4gICAgICAgICAgICAgICAgc29ydDogXCJzdHJpbmdcIlxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBpZDogXCJrd2FyZ3NcIixcbiAgICAgICAgICAgICAgICBoZWFkZXI6IFwiQXJndW1lbnRzXCIsXG4gICAgICAgICAgICAgICAgc29ydDogXCJzdHJpbmdcIixcbiAgICAgICAgICAgICAgICBmb3JtYXQ6IEpTT04uc3RyaW5naWZ5XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGlkOiBcInJlc3VsdFwiLFxuICAgICAgICAgICAgICAgIGhlYWRlcjogW1xuICAgICAgICAgICAgICAgICAgICBcIlJlc3VsdFwiLFxuICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb250ZW50OiBcInRleHRGaWx0ZXJcIlxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICBzb3J0OiBcInN0cmluZ1wiLFxuICAgICAgICAgICAgICAgIGZvcm1hdDogSlNPTi5zdHJpbmdpZnksXG4gICAgICAgICAgICB9XSxcbiAgICAgICAgICAgIHNjaGVtZToge1xuICAgICAgICAgICAgICAgICRpbml0OiBmdW5jdGlvbiAob2JqKSB7XG4gICAgICAgICAgICAgICAgICAgIG9iai5pbmRleCA9IHRoaXMuY291bnQoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICB9O1xuXG4gICAgICAgIHJldHVybiB2aWV3O1xuICAgIH1cblxuICAgIGluaXQodmlldykge1xuICAgICAgICBteWpvYnMubGlzdEpvYnMoKS50aGVuKGRhdGEgPT4ge1xuICAgICAgICAgICAgdmlldy5wYXJzZShkYXRhKTtcbiAgICAgICAgfSk7XG4gICAgfVxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc291cmNlcy92aWV3cy9teWpvYnMvam9icy5qcyIsImltcG9ydCB7IFNlcnZpY2UgfSBmcm9tIFwiLi4vY29tbW9uL2FwaVwiO1xuXG5jb25zdCBCQVNFX1VSTCA9IFwiL3plcm9ib3QvYWRtaW4vYWN0b3JzL215am9ic1wiO1xuXG5jbGFzcyBNeWpvYnNTZXJ2aWNlIGV4dGVuZHMgU2VydmljZSB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHN1cGVyKEJBU0VfVVJMKTtcbiAgICB9XG5cbiAgICBsaXN0Sm9icygpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0Q2FsbChcImxpc3Rfam9ic1wiKTtcbiAgICB9XG5cbiAgICBsaXN0V29ya2VycygpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0Q2FsbChcImxpc3Rfd29ya2Vyc1wiKTtcbiAgICB9XG59XG5cbmV4cG9ydCBjb25zdCBteWpvYnMgPSBuZXcgTXlqb2JzU2VydmljZSgpO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc291cmNlcy9zZXJ2aWNlcy9teWpvYnMuanMiLCJpbXBvcnQgeyBKZXRWaWV3IH0gZnJvbSBcIndlYml4LWpldFwiO1xuXG5pbXBvcnQgeyBkYXRlRm9ybWF0dGVyIH0gZnJvbSBcIi4uLy4uL2NvbW1vbi9mb3JtYXR0ZXJzXCI7XG5pbXBvcnQgeyBteWpvYnMgfSBmcm9tIFwiLi4vLi4vc2VydmljZXMvbXlqb2JzXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEpvYnNWaWV3IGV4dGVuZHMgSmV0VmlldyB7XG4gICAgY29uZmlnKCkge1xuICAgICAgICBjb25zdCB2aWV3ID0ge1xuICAgICAgICAgICAgdmlldzogXCJkYXRhdGFibGVcIixcbiAgICAgICAgICAgIGlkOiBcIndvcmtlcnNfdGFibGVcIixcbiAgICAgICAgICAgIHJlc2l6ZUNvbHVtbjogdHJ1ZSxcbiAgICAgICAgICAgIHNlbGVjdDogdHJ1ZSxcbiAgICAgICAgICAgIG11bHRpc2VsZWN0OiB0cnVlLFxuICAgICAgICAgICAgY3NzOiBcIndlYml4X2hlYWRlcl9ib3JkZXIgd2ViaXhfZGF0YV9ib3JkZXJcIixcbiAgICAgICAgICAgIGNvbHVtbnM6IFt7XG4gICAgICAgICAgICAgICAgaWQ6IFwiaW5kZXhcIixcbiAgICAgICAgICAgICAgICBoZWFkZXI6IFwiI1wiLFxuICAgICAgICAgICAgICAgIHNvcnQ6IFwiaW50XCIsXG4gICAgICAgICAgICAgICAgYXV0b3dpZHRoOiB0cnVlLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBpZDogXCJzdGF0ZVwiLFxuICAgICAgICAgICAgICAgIGhlYWRlcjogXCJTdGF0ZVwiLFxuICAgICAgICAgICAgICAgIHNvcnQ6IFwic3RyaW5nXCJcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgaWQ6IFwiaGFsdFwiLFxuICAgICAgICAgICAgICAgIGhlYWRlcjogXCJIYWx0ZWRcIixcbiAgICAgICAgICAgICAgICBzb3J0OiBcInN0cmluZ1wiLFxuICAgICAgICAgICAgICAgIGZvcm1hdDogZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB2YWx1ZSA/ICdZZXMnIDogJ05vJztcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBpZDogXCJwaWRcIixcbiAgICAgICAgICAgICAgICBoZWFkZXI6IFwiUElEXCIsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGlkOiBcImN1cnJlbnRfam9iXCIsXG4gICAgICAgICAgICAgICAgaGVhZGVyOiBcIkN1cnJlbnQgam9iXCIsXG4gICAgICAgICAgICAgICAgZm9ybWF0OiBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHZhbHVlID09IDIxNDc0ODM2NDcgPyAnTi9BJyA6IHZhbHVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgaWQ6IFwibGFzdF91cGRhdGVcIixcbiAgICAgICAgICAgICAgICBoZWFkZXI6IFwiTGFzdCB1cGRhdGVcIixcbiAgICAgICAgICAgICAgICBzb3J0OiBcImRhdGVcIixcbiAgICAgICAgICAgICAgICBmb3JtYXQ6IGRhdGVGb3JtYXR0ZXIsXG4gICAgICAgICAgICAgICAgd2lkdGg6IDIwMFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBpZDogXCJ0aW1lX3N0YXJ0XCIsXG4gICAgICAgICAgICAgICAgaGVhZGVyOiBcIlN0YXJ0IHRpbWVcIixcbiAgICAgICAgICAgICAgICBzb3J0OiBcImRhdGVcIixcbiAgICAgICAgICAgICAgICBmb3JtYXQ6IGRhdGVGb3JtYXR0ZXIsXG4gICAgICAgICAgICAgICAgd2lkdGg6IDIwMFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBpZDogXCJ0aW1lb3V0XCIsXG4gICAgICAgICAgICAgICAgaGVhZGVyOiBcIlRpbWVvdXRcIixcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgaWQ6IFwidHlwZVwiLFxuICAgICAgICAgICAgICAgIGhlYWRlcjogXCJUeXBlXCIsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGlkOiBcImVycm9yXCIsXG4gICAgICAgICAgICAgICAgaGVhZGVyOiBcIkVycm9yXCIsXG4gICAgICAgICAgICB9XSxcbiAgICAgICAgICAgIGF1dG9Db25maWc6IHRydWUsXG4gICAgICAgICAgICBzY2hlbWU6IHtcbiAgICAgICAgICAgICAgICAkaW5pdDogZnVuY3Rpb24gKG9iaikge1xuICAgICAgICAgICAgICAgICAgICBvYmouaW5kZXggPSB0aGlzLmNvdW50KCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgfTtcblxuICAgICAgICByZXR1cm4gdmlldztcbiAgICB9XG5cbiAgICBpbml0KHZpZXcpIHtcbiAgICAgICAgbXlqb2JzLmxpc3RXb3JrZXJzKCkudGhlbihkYXRhID0+IHtcbiAgICAgICAgICAgIHZpZXcucGFyc2UoZGF0YSk7XG4gICAgICAgIH0pO1xuXG4gICAgfVxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc291cmNlcy92aWV3cy9teWpvYnMvd29ya2Vycy5qcyIsImltcG9ydCB7IEV4dGVybmFsVmlldyB9IGZyb20gXCIuLi9leHRlcm5hbFwiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDaGF0Zmxvd1ZpZXcgZXh0ZW5kcyBFeHRlcm5hbFZpZXcge1xuICAgIGNvbnN0cnVjdG9yKGFwcCwgbmFtZSkge1xuICAgICAgICBzdXBlcihhcHAsIG5hbWUpO1xuXG4gICAgICAgIHRoaXMuYmFzZUdpdFVybCA9IFwiaHR0cHM6Ly9naXRodWIuY29tL3RocmVlZm9sZHRlY2gvanVtcHNjYWxlWF90aHJlZWJvdC90cmVlL2RldmVsb3BtZW50L1RocmVlQm90UGFja2FnZXNcIjtcblxuICAgIH1cblxuICAgIHVybENoYW5nZSh2aWV3LCB1cmwpIHtcbiAgICAgICAgY29uc3QgcGFyYW1zID0gdXJsWzBdLnBhcmFtcztcbiAgICAgICAgaWYgKE9iamVjdC5rZXlzKHBhcmFtcykubGVuZ3RoICE9PSAzKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBwYWNrYWdlTmFtZSA9IGAke3BhcmFtcy5hdXRob3J9LiR7cGFyYW1zLnBhY2thZ2V9YFxuICAgICAgICBjb25zdCBwYWNrYWdlVXJsID0gcGFja2FnZU5hbWUucmVwbGFjZShcIi5cIiwgXCIvXCIpO1xuXG4gICAgICAgIHRoaXMudGFyZ2V0VXJsID0gYC8ke3BhY2thZ2VVcmx9L2NoYXQvJHtwYXJhbXMuY2hhdH0/bm9oZWFkZXI9eWVzYDtcbiAgICAgICAgdGhpcy5yZXF1aXJlZFBhY2thZ2VzID0ge31cbiAgICAgICAgdGhpcy5yZXF1aXJlZFBhY2thZ2VzW3BhY2thZ2VOYW1lXSA9IGAke3RoaXMuYmFzZUdpdFVybH0vJHtwYWNrYWdlVXJsfWA7XG5cbiAgICAgICAgdGhpcy5pbml0KHZpZXcpO1xuICAgIH1cbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NvdXJjZXMvdmlld3Mvc29sdXRpb25zL2NoYXRmbG93LmpzIiwiaW1wb3J0IHsgRXh0ZXJuYWxWaWV3IH0gZnJvbSBcIi4uL2V4dGVybmFsXCI7XG5cbmNvbnN0IFRGR1JJRFNES19VUkwgPSBcIi90aHJlZWZvbGQvaW5mb190ZmdyaWRzZGsvXCI7XG5jb25zdCBSRVFVSVJFRF9QQUNLQUdFUyA9IHtcbiAgICBcInRocmVlZm9sZC53aWtpc1wiOiBcImh0dHBzOi8vZ2l0aHViLmNvbS90aHJlZWZvbGR0ZWNoL2p1bXBzY2FsZVhfdGhyZWVib3QvdHJlZS9kZXZlbG9wbWVudC9UaHJlZUJvdFBhY2thZ2VzL3RocmVlZm9sZC93aWtpc1wiXG59XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFRGR3JpZFNES1dpa2kgZXh0ZW5kcyBFeHRlcm5hbFZpZXcge1xuICAgIGNvbnN0cnVjdG9yKGFwcCwgbmFtZSkge1xuICAgICAgICBzdXBlcihhcHAsIG5hbWUsIFRGR1JJRFNES19VUkwsIFJFUVVJUkVEX1BBQ0tBR0VTKTtcbiAgICB9XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zb3VyY2VzL3ZpZXdzL3Rmd2lraXMvdGZncmlkc2RrLmpzIiwiaW1wb3J0IHsgRXh0ZXJuYWxWaWV3IH0gZnJvbSBcIi4uL2V4dGVybmFsXCI7XG5cbmNvbnN0IFRIUkVFRk9MRF9VUkwgPSBcIi90aHJlZWZvbGQvaW5mb190aHJlZWZvbGQvXCI7XG5jb25zdCBSRVFVSVJFRF9QQUNLQUdFUyA9IHtcbiAgICBcInRocmVlZm9sZC53aWtpc1wiOiBcImh0dHBzOi8vZ2l0aHViLmNvbS90aHJlZWZvbGR0ZWNoL2p1bXBzY2FsZVhfdGhyZWVib3QvdHJlZS9kZXZlbG9wbWVudC9UaHJlZUJvdFBhY2thZ2VzL3RocmVlZm9sZC93aWtpc1wiXG59XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFRocmVlZm9sZFdpa2kgZXh0ZW5kcyBFeHRlcm5hbFZpZXcge1xuICAgIGNvbnN0cnVjdG9yKGFwcCwgbmFtZSkge1xuICAgICAgICBzdXBlcihhcHAsIG5hbWUsIFRIUkVFRk9MRF9VUkwsIFJFUVVJUkVEX1BBQ0tBR0VTKTtcbiAgICB9XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zb3VyY2VzL3ZpZXdzL3Rmd2lraXMvdGhyZWVmb2xkLmpzIiwiaW1wb3J0IHsgU2VydmljZSB9IGZyb20gXCIuLi9jb21tb24vYXBpXCI7XG5cbmNvbnN0IEJBU0VfVVJMID0gXCIvemVyb2JvdC9hZG1pbi9hY3RvcnMvd2FsbGV0XCI7XG5cbmNsYXNzIFdhbGxldFNlcnZpY2UgZXh0ZW5kcyBTZXJ2aWNlIHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgc3VwZXIoQkFTRV9VUkwpO1xuICAgIH1cblxuICAgIHZhbGlkYXRlVXNlcigpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0Q2FsbChcInZhbGlkYXRlX3VzZXJcIik7XG4gICAgfVxuXG4gICAgY3JlYXRlV2FsbGV0KG5hbWUpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0Q2FsbChcImNyZWF0ZV93YWxsZXRcIiwgbmFtZSk7XG4gICAgfVxuXG4gICAgbWFuYWdlV2FsbGV0KG5hbWUpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0Q2FsbChcIm1hbmFnZV93YWxsZXRcIiwgbmFtZSk7XG4gICAgfVxuXG4gICAgZ2V0V2FsbGV0cygpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0Q2FsbChcImdldF93YWxsZXRzXCIpO1xuICAgIH1cbn1cblxuZXhwb3J0IGNvbnN0IHdhbGxldCA9IG5ldyBXYWxsZXRTZXJ2aWNlKCk7XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc291cmNlcy9zZXJ2aWNlcy93YWxsZXQuanMiLCJpbXBvcnQgeyBFeHRlcm5hbFZpZXcgfSBmcm9tIFwiLi4vZXh0ZXJuYWxcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgV2lraUV4dGVybmFsVmlldyBleHRlbmRzIEV4dGVybmFsVmlldyB7XG4gICAgY29uc3RydWN0b3IoYXBwLCBuYW1lKSB7XG4gICAgICAgIHN1cGVyKGFwcCwgbmFtZSk7XG5cbiAgICB9XG5cbiAgICB1cmxDaGFuZ2UodmlldywgdXJsKSB7XG4gICAgICAgIGNvbnN0IHBhcmFtcyA9IHVybFswXS5wYXJhbXM7XG4gICAgICAgIGlmIChPYmplY3Qua2V5cyhwYXJhbXMpLmxlbmd0aCAhPT0gMSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy50YXJnZXRVcmwgPSBgL3dpa2kvJHtwYXJhbXMubmFtZX1gO1xuICAgICAgICBcbiAgICAgICAgdGhpcy5pbml0KHZpZXcpO1xuICAgIH1cbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NvdXJjZXMvdmlld3Mvd2lraXMvdmlldy5qcyIsImltcG9ydCBcIi4vc3R5bGVzL2FwcC5jc3NcIjtcbmltcG9ydCB7SmV0QXBwfSBmcm9tIFwid2ViaXgtamV0XCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEludmVudG9yeUFwcCBleHRlbmRzIEpldEFwcCB7XG5cdGNvbnN0cnVjdG9yKGNvbmZpZyl7XG5cdFx0c3VwZXIod2ViaXguZXh0ZW5kKHtcblx0XHRcdGlkOlx0XHRcdEFQUE5BTUUsXG5cdFx0XHR2ZXJzaW9uOlx0VkVSU0lPTixcblx0XHRcdHN0YXJ0Olx0XHRcIi9tYWluL2Rhc2hcIixcblx0XHRcdGRlYnVnOlx0XHQhUFJPRFVDVElPTlxuXHRcdH0sIGNvbmZpZywgdHJ1ZSkpO1xuXG5cdFx0LyogZXJyb3IgdHJhY2tpbmcgKi9cblx0XHR0aGlzLmF0dGFjaEV2ZW50KFwiYXBwOmVycm9yOnJlc29sdmVcIiwgZnVuY3Rpb24obmFtZSwgZXJyb3Ipe1xuXHRcdFx0d2luZG93LmNvbnNvbGUuZXJyb3IoZXJyb3IpO1xuXHRcdH0pO1xuXHR9XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zb3VyY2VzL2FwcC5qcyIsIi8vIHJlbW92ZWQgYnkgZXh0cmFjdC10ZXh0LXdlYnBhY2stcGx1Z2luXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9zb3VyY2VzL3N0eWxlcy9hcHAuY3NzXG4vLyBtb2R1bGUgaWQgPSA1MlxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJ2YXIgbWFwID0ge1xuXHRcIi4vYWxlcnRzXCI6IDcsXG5cdFwiLi9hbGVydHMvXCI6IDcsXG5cdFwiLi9hbGVydHMvYWxlcnRcIjogMjQsXG5cdFwiLi9hbGVydHMvYWxlcnQuanNcIjogMjQsXG5cdFwiLi9hbGVydHMvZGF0YVwiOiA0LFxuXHRcIi4vYWxlcnRzL2RhdGEuanNcIjogNCxcblx0XCIuL2FsZXJ0cy9pbmRleFwiOiA3LFxuXHRcIi4vYWxlcnRzL2luZGV4LmpzXCI6IDcsXG5cdFwiLi9jYXBhY2l0eVwiOiA5LFxuXHRcIi4vY2FwYWNpdHkvXCI6IDksXG5cdFwiLi9jYXBhY2l0eS9pbmRleFwiOiA5LFxuXHRcIi4vY2FwYWNpdHkvaW5kZXguanNcIjogOSxcblx0XCIuL2NpcmNsZXNcIjogMTAsXG5cdFwiLi9jaXJjbGVzL1wiOiAxMCxcblx0XCIuL2NpcmNsZXMvaW5kZXhcIjogMTAsXG5cdFwiLi9jaXJjbGVzL2luZGV4LmpzXCI6IDEwLFxuXHRcIi4vY2lyY2xlc3Rvcmllc1wiOiAxMSxcblx0XCIuL2NpcmNsZXN0b3JpZXMvXCI6IDExLFxuXHRcIi4vY2lyY2xlc3Rvcmllcy9pbmRleFwiOiAxMSxcblx0XCIuL2NpcmNsZXN0b3JpZXMvaW5kZXguanNcIjogMTEsXG5cdFwiLi9jaXJjbGV0YXNrc1wiOiAxMixcblx0XCIuL2NpcmNsZXRhc2tzL1wiOiAxMixcblx0XCIuL2NpcmNsZXRhc2tzL2luZGV4XCI6IDEyLFxuXHRcIi4vY2lyY2xldGFza3MvaW5kZXguanNcIjogMTIsXG5cdFwiLi9jb2Rlc2VydmVyXCI6IDEzLFxuXHRcIi4vY29kZXNlcnZlci9cIjogMTMsXG5cdFwiLi9jb2Rlc2VydmVyL2luZGV4XCI6IDEzLFxuXHRcIi4vY29kZXNlcnZlci9pbmRleC5qc1wiOiAxMyxcblx0XCIuL2Rhc2hcIjogMTQsXG5cdFwiLi9kYXNoL1wiOiAxNCxcblx0XCIuL2Rhc2gvZGlza1NwYWNlXCI6IDM2LFxuXHRcIi4vZGFzaC9kaXNrU3BhY2UuanNcIjogMzYsXG5cdFwiLi9kYXNoL2hlYWx0aFwiOiAzNyxcblx0XCIuL2Rhc2gvaGVhbHRoLmpzXCI6IDM3LFxuXHRcIi4vZGFzaC9pbmRleFwiOiAxNCxcblx0XCIuL2Rhc2gvaW5kZXguanNcIjogMTQsXG5cdFwiLi9kYXNoL2pzeEluZm9cIjogMzgsXG5cdFwiLi9kYXNoL2pzeEluZm8uanNcIjogMzgsXG5cdFwiLi9kYXNoL3Byb2Nlc3Nlc1wiOiAzOSxcblx0XCIuL2Rhc2gvcHJvY2Vzc2VzLmpzXCI6IDM5LFxuXHRcIi4vZGFzaC9wcm9jZXNzZXNDaGlsZFZpZXdcIjogMjcsXG5cdFwiLi9kYXNoL3Byb2Nlc3Nlc0NoaWxkVmlldy5qc1wiOiAyNyxcblx0XCIuL2Rhc2gvcnVubmluZ1BvcnRzXCI6IDQwLFxuXHRcIi4vZGFzaC9ydW5uaW5nUG9ydHMuanNcIjogNDAsXG5cdFwiLi9kZXBsb3llZFNvbHV0aW9uc1wiOiAxNSxcblx0XCIuL2RlcGxveWVkU29sdXRpb25zL1wiOiAxNSxcblx0XCIuL2RlcGxveWVkU29sdXRpb25zL2luZGV4XCI6IDE1LFxuXHRcIi4vZGVwbG95ZWRTb2x1dGlvbnMvaW5kZXguanNcIjogMTUsXG5cdFwiLi9kZXBsb3llZFNvbHV0aW9ucy9yZXNlcnZhdGlvblwiOiAyOCxcblx0XCIuL2RlcGxveWVkU29sdXRpb25zL3Jlc2VydmF0aW9uLmpzXCI6IDI4LFxuXHRcIi4vZXJyb3JzL2RpYWxvZ1wiOiAzLFxuXHRcIi4vZXJyb3JzL2RpYWxvZy5qc1wiOiAzLFxuXHRcIi4vZXh0ZXJuYWxcIjogMSxcblx0XCIuL2V4dGVybmFsL1wiOiAxLFxuXHRcIi4vZXh0ZXJuYWwvaW5kZXhcIjogMSxcblx0XCIuL2V4dGVybmFsL2luZGV4LmpzXCI6IDEsXG5cdFwiLi9mYXJtbWFuYWdlbWVudFwiOiAxNixcblx0XCIuL2Zhcm1tYW5hZ2VtZW50L1wiOiAxNixcblx0XCIuL2Zhcm1tYW5hZ2VtZW50L2luZGV4XCI6IDE2LFxuXHRcIi4vZmFybW1hbmFnZW1lbnQvaW5kZXguanNcIjogMTYsXG5cdFwiLi9qdXB5dGVyXCI6IDE3LFxuXHRcIi4vanVweXRlci9cIjogMTcsXG5cdFwiLi9qdXB5dGVyL2luZGV4XCI6IDE3LFxuXHRcIi4vanVweXRlci9pbmRleC5qc1wiOiAxNyxcblx0XCIuL2xvZ3NcIjogMTgsXG5cdFwiLi9sb2dzL1wiOiAxOCxcblx0XCIuL2xvZ3MvYXBwTG9nc1wiOiAyOSxcblx0XCIuL2xvZ3MvYXBwTG9ncy5qc1wiOiAyOSxcblx0XCIuL2xvZ3MvaW5kZXhcIjogMTgsXG5cdFwiLi9sb2dzL2luZGV4LmpzXCI6IDE4LFxuXHRcIi4vbWFpblwiOiA0MSxcblx0XCIuL21haW4uanNcIjogNDEsXG5cdFwiLi9teWpvYnMvam9ic1wiOiA0Mixcblx0XCIuL215am9icy9qb2JzLmpzXCI6IDQyLFxuXHRcIi4vbXlqb2JzL3dvcmtlcnNcIjogNDQsXG5cdFwiLi9teWpvYnMvd29ya2Vycy5qc1wiOiA0NCxcblx0XCIuL3BhY2thZ2VzXCI6IDE5LFxuXHRcIi4vcGFja2FnZXMvXCI6IDE5LFxuXHRcIi4vcGFja2FnZXMvaW5kZXhcIjogMTksXG5cdFwiLi9wYWNrYWdlcy9pbmRleC5qc1wiOiAxOSxcblx0XCIuL3Nka2V4YW1wbGVzXCI6IDIwLFxuXHRcIi4vc2RrZXhhbXBsZXMvXCI6IDIwLFxuXHRcIi4vc2RrZXhhbXBsZXMvaW5kZXhcIjogMjAsXG5cdFwiLi9zZGtleGFtcGxlcy9pbmRleC5qc1wiOiAyMCxcblx0XCIuL3NldHRpbmdzXCI6IDIxLFxuXHRcIi4vc2V0dGluZ3MvXCI6IDIxLFxuXHRcIi4vc2V0dGluZ3MvYWRtaW5zXCI6IDMwLFxuXHRcIi4vc2V0dGluZ3MvYWRtaW5zLmpzXCI6IDMwLFxuXHRcIi4vc2V0dGluZ3MvZ2VuZXJhbFwiOiAzMSxcblx0XCIuL3NldHRpbmdzL2dlbmVyYWwuanNcIjogMzEsXG5cdFwiLi9zZXR0aW5ncy9pbmRleFwiOiAyMSxcblx0XCIuL3NldHRpbmdzL2luZGV4LmpzXCI6IDIxLFxuXHRcIi4vc29sdXRpb25zL2NoYXRmbG93XCI6IDQ1LFxuXHRcIi4vc29sdXRpb25zL2NoYXRmbG93LmpzXCI6IDQ1LFxuXHRcIi4vdGZ3aWtpcy90ZmdyaWRzZGtcIjogNDYsXG5cdFwiLi90Zndpa2lzL3RmZ3JpZHNkay5qc1wiOiA0Nixcblx0XCIuL3Rmd2lraXMvdGhyZWVmb2xkXCI6IDQ3LFxuXHRcIi4vdGZ3aWtpcy90aHJlZWZvbGQuanNcIjogNDcsXG5cdFwiLi93YWxsZXRzTWFuYWdlclwiOiAyMixcblx0XCIuL3dhbGxldHNNYW5hZ2VyL1wiOiAyMixcblx0XCIuL3dhbGxldHNNYW5hZ2VyL2luZGV4XCI6IDIyLFxuXHRcIi4vd2FsbGV0c01hbmFnZXIvaW5kZXguanNcIjogMjIsXG5cdFwiLi93YWxsZXRzTWFuYWdlci93YWxsZXREZXRhaWxzXCI6IDMzLFxuXHRcIi4vd2FsbGV0c01hbmFnZXIvd2FsbGV0RGV0YWlscy5qc1wiOiAzMyxcblx0XCIuL3dhbGxldHNNYW5hZ2VyL3dhbGxldEZvcm1cIjogMzIsXG5cdFwiLi93YWxsZXRzTWFuYWdlci93YWxsZXRGb3JtLmpzXCI6IDMyLFxuXHRcIi4vd2lraXNcIjogMjMsXG5cdFwiLi93aWtpcy9cIjogMjMsXG5cdFwiLi93aWtpcy9pbmRleFwiOiAyMyxcblx0XCIuL3dpa2lzL2luZGV4LmpzXCI6IDIzLFxuXHRcIi4vd2lraXMvdmlld1wiOiA0OSxcblx0XCIuL3dpa2lzL3ZpZXcuanNcIjogNDlcbn07XG5mdW5jdGlvbiB3ZWJwYWNrQ29udGV4dChyZXEpIHtcblx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18od2VicGFja0NvbnRleHRSZXNvbHZlKHJlcSkpO1xufTtcbmZ1bmN0aW9uIHdlYnBhY2tDb250ZXh0UmVzb2x2ZShyZXEpIHtcblx0dmFyIGlkID0gbWFwW3JlcV07XG5cdGlmKCEoaWQgKyAxKSkgLy8gY2hlY2sgZm9yIG51bWJlciBvciBzdHJpbmdcblx0XHR0aHJvdyBuZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiICsgcmVxICsgXCInLlwiKTtcblx0cmV0dXJuIGlkO1xufTtcbndlYnBhY2tDb250ZXh0LmtleXMgPSBmdW5jdGlvbiB3ZWJwYWNrQ29udGV4dEtleXMoKSB7XG5cdHJldHVybiBPYmplY3Qua2V5cyhtYXApO1xufTtcbndlYnBhY2tDb250ZXh0LnJlc29sdmUgPSB3ZWJwYWNrQ29udGV4dFJlc29sdmU7XG5tb2R1bGUuZXhwb3J0cyA9IHdlYnBhY2tDb250ZXh0O1xud2VicGFja0NvbnRleHQuaWQgPSA1MztcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3NvdXJjZXMvdmlld3MgXlxcLlxcLy4qJFxuLy8gbW9kdWxlIGlkID0gNTNcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLyogIGFuc2lfdXAuanNcbiAqICBhdXRob3IgOiBEcnUgTmVsc29uXG4gKiAgbGljZW5zZSA6IE1JVFxuICogIGh0dHA6Ly9naXRodWIuY29tL2RydWRydS9hbnNpX3VwXG4gKi9cbihmdW5jdGlvbiAocm9vdCwgZmFjdG9yeSkge1xuICAgIGlmICh0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQpIHtcbiAgICAgICAgLy8gQU1ELiBSZWdpc3RlciBhcyBhbiBhbm9ueW1vdXMgbW9kdWxlLlxuICAgICAgICBkZWZpbmUoWydleHBvcnRzJ10sIGZhY3RvcnkpO1xuICAgIH0gZWxzZSBpZiAodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnICYmIHR5cGVvZiBleHBvcnRzLm5vZGVOYW1lICE9PSAnc3RyaW5nJykge1xuICAgICAgICAvLyBDb21tb25KU1xuICAgICAgICBmYWN0b3J5KGV4cG9ydHMpO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIC8vIEJyb3dzZXIgZ2xvYmFsc1xuICAgICAgICB2YXIgZXhwID0ge307XG4gICAgICAgIGZhY3RvcnkoZXhwKTtcbiAgICAgICAgcm9vdC5BbnNpVXAgPSBleHAuZGVmYXVsdDtcbiAgICB9XG59KHRoaXMsIGZ1bmN0aW9uIChleHBvcnRzKSB7XG5cInVzZSBzdHJpY3RcIjtcbnZhciBfX21ha2VUZW1wbGF0ZU9iamVjdCA9ICh0aGlzICYmIHRoaXMuX19tYWtlVGVtcGxhdGVPYmplY3QpIHx8IGZ1bmN0aW9uIChjb29rZWQsIHJhdykge1xuICAgIGlmIChPYmplY3QuZGVmaW5lUHJvcGVydHkpIHsgT2JqZWN0LmRlZmluZVByb3BlcnR5KGNvb2tlZCwgXCJyYXdcIiwgeyB2YWx1ZTogcmF3IH0pOyB9IGVsc2UgeyBjb29rZWQucmF3ID0gcmF3OyB9XG4gICAgcmV0dXJuIGNvb2tlZDtcbn07XG52YXIgUGFja2V0S2luZDtcbihmdW5jdGlvbiAoUGFja2V0S2luZCkge1xuICAgIFBhY2tldEtpbmRbUGFja2V0S2luZFtcIkVPU1wiXSA9IDBdID0gXCJFT1NcIjtcbiAgICBQYWNrZXRLaW5kW1BhY2tldEtpbmRbXCJUZXh0XCJdID0gMV0gPSBcIlRleHRcIjtcbiAgICBQYWNrZXRLaW5kW1BhY2tldEtpbmRbXCJJbmNvbXBsZXRlXCJdID0gMl0gPSBcIkluY29tcGxldGVcIjtcbiAgICBQYWNrZXRLaW5kW1BhY2tldEtpbmRbXCJFU0NcIl0gPSAzXSA9IFwiRVNDXCI7XG4gICAgUGFja2V0S2luZFtQYWNrZXRLaW5kW1wiVW5rbm93blwiXSA9IDRdID0gXCJVbmtub3duXCI7XG4gICAgUGFja2V0S2luZFtQYWNrZXRLaW5kW1wiU0dSXCJdID0gNV0gPSBcIlNHUlwiO1xuICAgIFBhY2tldEtpbmRbUGFja2V0S2luZFtcIk9TQ1VSTFwiXSA9IDZdID0gXCJPU0NVUkxcIjtcbn0pKFBhY2tldEtpbmQgfHwgKFBhY2tldEtpbmQgPSB7fSkpO1xudmFyIEFuc2lVcCA9IChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gQW5zaVVwKCkge1xuICAgICAgICB0aGlzLlZFUlNJT04gPSBcIjQuMC40XCI7XG4gICAgICAgIHRoaXMuc2V0dXBfcGFsZXR0ZXMoKTtcbiAgICAgICAgdGhpcy5fdXNlX2NsYXNzZXMgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5fZXNjYXBlX2Zvcl9odG1sID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5ib2xkID0gZmFsc2U7XG4gICAgICAgIHRoaXMuZmcgPSB0aGlzLmJnID0gbnVsbDtcbiAgICAgICAgdGhpcy5fYnVmZmVyID0gJyc7XG4gICAgICAgIHRoaXMuX3VybF93aGl0ZWxpc3QgPSB7ICdodHRwJzogMSwgJ2h0dHBzJzogMSB9O1xuICAgIH1cbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoQW5zaVVwLnByb3RvdHlwZSwgXCJ1c2VfY2xhc3Nlc1wiLCB7XG4gICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3VzZV9jbGFzc2VzO1xuICAgICAgICB9LFxuICAgICAgICBzZXQ6IGZ1bmN0aW9uIChhcmcpIHtcbiAgICAgICAgICAgIHRoaXMuX3VzZV9jbGFzc2VzID0gYXJnO1xuICAgICAgICB9LFxuICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgICAgICBjb25maWd1cmFibGU6IHRydWVcbiAgICB9KTtcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoQW5zaVVwLnByb3RvdHlwZSwgXCJlc2NhcGVfZm9yX2h0bWxcIiwge1xuICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9lc2NhcGVfZm9yX2h0bWw7XG4gICAgICAgIH0sXG4gICAgICAgIHNldDogZnVuY3Rpb24gKGFyZykge1xuICAgICAgICAgICAgdGhpcy5fZXNjYXBlX2Zvcl9odG1sID0gYXJnO1xuICAgICAgICB9LFxuICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgICAgICBjb25maWd1cmFibGU6IHRydWVcbiAgICB9KTtcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoQW5zaVVwLnByb3RvdHlwZSwgXCJ1cmxfd2hpdGVsaXN0XCIsIHtcbiAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fdXJsX3doaXRlbGlzdDtcbiAgICAgICAgfSxcbiAgICAgICAgc2V0OiBmdW5jdGlvbiAoYXJnKSB7XG4gICAgICAgICAgICB0aGlzLl91cmxfd2hpdGVsaXN0ID0gYXJnO1xuICAgICAgICB9LFxuICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgICAgICBjb25maWd1cmFibGU6IHRydWVcbiAgICB9KTtcbiAgICBBbnNpVXAucHJvdG90eXBlLnNldHVwX3BhbGV0dGVzID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgICB0aGlzLmFuc2lfY29sb3JzID1cbiAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgICAgIHsgcmdiOiBbMCwgMCwgMF0sIGNsYXNzX25hbWU6IFwiYW5zaS1ibGFja1wiIH0sXG4gICAgICAgICAgICAgICAgICAgIHsgcmdiOiBbMTg3LCAwLCAwXSwgY2xhc3NfbmFtZTogXCJhbnNpLXJlZFwiIH0sXG4gICAgICAgICAgICAgICAgICAgIHsgcmdiOiBbMCwgMTg3LCAwXSwgY2xhc3NfbmFtZTogXCJhbnNpLWdyZWVuXCIgfSxcbiAgICAgICAgICAgICAgICAgICAgeyByZ2I6IFsxODcsIDE4NywgMF0sIGNsYXNzX25hbWU6IFwiYW5zaS15ZWxsb3dcIiB9LFxuICAgICAgICAgICAgICAgICAgICB7IHJnYjogWzAsIDAsIDE4N10sIGNsYXNzX25hbWU6IFwiYW5zaS1ibHVlXCIgfSxcbiAgICAgICAgICAgICAgICAgICAgeyByZ2I6IFsxODcsIDAsIDE4N10sIGNsYXNzX25hbWU6IFwiYW5zaS1tYWdlbnRhXCIgfSxcbiAgICAgICAgICAgICAgICAgICAgeyByZ2I6IFswLCAxODcsIDE4N10sIGNsYXNzX25hbWU6IFwiYW5zaS1jeWFuXCIgfSxcbiAgICAgICAgICAgICAgICAgICAgeyByZ2I6IFsyNTUsIDI1NSwgMjU1XSwgY2xhc3NfbmFtZTogXCJhbnNpLXdoaXRlXCIgfVxuICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAgICAgICB7IHJnYjogWzg1LCA4NSwgODVdLCBjbGFzc19uYW1lOiBcImFuc2ktYnJpZ2h0LWJsYWNrXCIgfSxcbiAgICAgICAgICAgICAgICAgICAgeyByZ2I6IFsyNTUsIDg1LCA4NV0sIGNsYXNzX25hbWU6IFwiYW5zaS1icmlnaHQtcmVkXCIgfSxcbiAgICAgICAgICAgICAgICAgICAgeyByZ2I6IFswLCAyNTUsIDBdLCBjbGFzc19uYW1lOiBcImFuc2ktYnJpZ2h0LWdyZWVuXCIgfSxcbiAgICAgICAgICAgICAgICAgICAgeyByZ2I6IFsyNTUsIDI1NSwgODVdLCBjbGFzc19uYW1lOiBcImFuc2ktYnJpZ2h0LXllbGxvd1wiIH0sXG4gICAgICAgICAgICAgICAgICAgIHsgcmdiOiBbODUsIDg1LCAyNTVdLCBjbGFzc19uYW1lOiBcImFuc2ktYnJpZ2h0LWJsdWVcIiB9LFxuICAgICAgICAgICAgICAgICAgICB7IHJnYjogWzI1NSwgODUsIDI1NV0sIGNsYXNzX25hbWU6IFwiYW5zaS1icmlnaHQtbWFnZW50YVwiIH0sXG4gICAgICAgICAgICAgICAgICAgIHsgcmdiOiBbODUsIDI1NSwgMjU1XSwgY2xhc3NfbmFtZTogXCJhbnNpLWJyaWdodC1jeWFuXCIgfSxcbiAgICAgICAgICAgICAgICAgICAgeyByZ2I6IFsyNTUsIDI1NSwgMjU1XSwgY2xhc3NfbmFtZTogXCJhbnNpLWJyaWdodC13aGl0ZVwiIH1cbiAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICBdO1xuICAgICAgICB0aGlzLnBhbGV0dGVfMjU2ID0gW107XG4gICAgICAgIHRoaXMuYW5zaV9jb2xvcnMuZm9yRWFjaChmdW5jdGlvbiAocGFsZXR0ZSkge1xuICAgICAgICAgICAgcGFsZXR0ZS5mb3JFYWNoKGZ1bmN0aW9uIChyZWMpIHtcbiAgICAgICAgICAgICAgICBfdGhpcy5wYWxldHRlXzI1Ni5wdXNoKHJlYyk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgICAgIHZhciBsZXZlbHMgPSBbMCwgOTUsIDEzNSwgMTc1LCAyMTUsIDI1NV07XG4gICAgICAgIGZvciAodmFyIHIgPSAwOyByIDwgNjsgKytyKSB7XG4gICAgICAgICAgICBmb3IgKHZhciBnID0gMDsgZyA8IDY7ICsrZykge1xuICAgICAgICAgICAgICAgIGZvciAodmFyIGIgPSAwOyBiIDwgNjsgKytiKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBjb2wgPSB7IHJnYjogW2xldmVsc1tyXSwgbGV2ZWxzW2ddLCBsZXZlbHNbYl1dLCBjbGFzc19uYW1lOiAndHJ1ZWNvbG9yJyB9O1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnBhbGV0dGVfMjU2LnB1c2goY29sKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgdmFyIGdyZXlfbGV2ZWwgPSA4O1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IDI0OyArK2ksIGdyZXlfbGV2ZWwgKz0gMTApIHtcbiAgICAgICAgICAgIHZhciBncnkgPSB7IHJnYjogW2dyZXlfbGV2ZWwsIGdyZXlfbGV2ZWwsIGdyZXlfbGV2ZWxdLCBjbGFzc19uYW1lOiAndHJ1ZWNvbG9yJyB9O1xuICAgICAgICAgICAgdGhpcy5wYWxldHRlXzI1Ni5wdXNoKGdyeSk7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIEFuc2lVcC5wcm90b3R5cGUuZXNjYXBlX3R4dF9mb3JfaHRtbCA9IGZ1bmN0aW9uICh0eHQpIHtcbiAgICAgICAgcmV0dXJuIHR4dC5yZXBsYWNlKC9bJjw+XS9nbSwgZnVuY3Rpb24gKHN0cikge1xuICAgICAgICAgICAgaWYgKHN0ciA9PT0gXCImXCIpXG4gICAgICAgICAgICAgICAgcmV0dXJuIFwiJmFtcDtcIjtcbiAgICAgICAgICAgIGlmIChzdHIgPT09IFwiPFwiKVxuICAgICAgICAgICAgICAgIHJldHVybiBcIiZsdDtcIjtcbiAgICAgICAgICAgIGlmIChzdHIgPT09IFwiPlwiKVxuICAgICAgICAgICAgICAgIHJldHVybiBcIiZndDtcIjtcbiAgICAgICAgfSk7XG4gICAgfTtcbiAgICBBbnNpVXAucHJvdG90eXBlLmFwcGVuZF9idWZmZXIgPSBmdW5jdGlvbiAodHh0KSB7XG4gICAgICAgIHZhciBzdHIgPSB0aGlzLl9idWZmZXIgKyB0eHQ7XG4gICAgICAgIHRoaXMuX2J1ZmZlciA9IHN0cjtcbiAgICB9O1xuICAgIEFuc2lVcC5wcm90b3R5cGUuZ2V0X25leHRfcGFja2V0ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgcGt0ID0ge1xuICAgICAgICAgICAga2luZDogUGFja2V0S2luZC5FT1MsXG4gICAgICAgICAgICB0ZXh0OiAnJyxcbiAgICAgICAgICAgIHVybDogJydcbiAgICAgICAgfTtcbiAgICAgICAgdmFyIGxlbiA9IHRoaXMuX2J1ZmZlci5sZW5ndGg7XG4gICAgICAgIGlmIChsZW4gPT0gMClcbiAgICAgICAgICAgIHJldHVybiBwa3Q7XG4gICAgICAgIHZhciBwb3MgPSB0aGlzLl9idWZmZXIuaW5kZXhPZihcIlxceDFCXCIpO1xuICAgICAgICBpZiAocG9zID09IC0xKSB7XG4gICAgICAgICAgICBwa3Qua2luZCA9IFBhY2tldEtpbmQuVGV4dDtcbiAgICAgICAgICAgIHBrdC50ZXh0ID0gdGhpcy5fYnVmZmVyO1xuICAgICAgICAgICAgdGhpcy5fYnVmZmVyID0gJyc7XG4gICAgICAgICAgICByZXR1cm4gcGt0O1xuICAgICAgICB9XG4gICAgICAgIGlmIChwb3MgPiAwKSB7XG4gICAgICAgICAgICBwa3Qua2luZCA9IFBhY2tldEtpbmQuVGV4dDtcbiAgICAgICAgICAgIHBrdC50ZXh0ID0gdGhpcy5fYnVmZmVyLnNsaWNlKDAsIHBvcyk7XG4gICAgICAgICAgICB0aGlzLl9idWZmZXIgPSB0aGlzLl9idWZmZXIuc2xpY2UocG9zKTtcbiAgICAgICAgICAgIHJldHVybiBwa3Q7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHBvcyA9PSAwKSB7XG4gICAgICAgICAgICBpZiAobGVuID09IDEpIHtcbiAgICAgICAgICAgICAgICBwa3Qua2luZCA9IFBhY2tldEtpbmQuSW5jb21wbGV0ZTtcbiAgICAgICAgICAgICAgICByZXR1cm4gcGt0O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdmFyIG5leHRfY2hhciA9IHRoaXMuX2J1ZmZlci5jaGFyQXQoMSk7XG4gICAgICAgICAgICBpZiAoKG5leHRfY2hhciAhPSAnWycpICYmIChuZXh0X2NoYXIgIT0gJ10nKSkge1xuICAgICAgICAgICAgICAgIHBrdC5raW5kID0gUGFja2V0S2luZC5FU0M7XG4gICAgICAgICAgICAgICAgcGt0LnRleHQgPSB0aGlzLl9idWZmZXIuc2xpY2UoMCwgMSk7XG4gICAgICAgICAgICAgICAgdGhpcy5fYnVmZmVyID0gdGhpcy5fYnVmZmVyLnNsaWNlKDEpO1xuICAgICAgICAgICAgICAgIHJldHVybiBwa3Q7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAobmV4dF9jaGFyID09ICdbJykge1xuICAgICAgICAgICAgICAgIGlmICghdGhpcy5fY3NpX3JlZ2V4KSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2NzaV9yZWdleCA9IHJneChfX21ha2VUZW1wbGF0ZU9iamVjdChbXCJcXG4gICAgICAgICAgICAgICAgICAgICAgICBeICAgICAgICAgICAgICAgICAgICAgICAgICAgIyBiZWdpbm5pbmcgb2YgbGluZVxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAjXFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICMgRmlyc3QgYXR0ZW1wdFxcbiAgICAgICAgICAgICAgICAgICAgICAgICg/OiAgICAgICAgICAgICAgICAgICAgICAgICAjIGxlZ2FsIHNlcXVlbmNlXFxuICAgICAgICAgICAgICAgICAgICAgICAgICBcXHUwMDFCWyAgICAgICAgICAgICAgICAgICAgICAjIENTSVxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgKFs8LT9dPykgICAgICAgICAgICAgICMgcHJpdmF0ZS1tb2RlIGNoYXJcXG4gICAgICAgICAgICAgICAgICAgICAgICAgIChbZDtdKikgICAgICAgICAgICAgICAgICAgICMgYW55IGRpZ2l0cyBvciBzZW1pY29sb25zXFxuICAgICAgICAgICAgICAgICAgICAgICAgICAoWyAtL10/ICAgICAgICAgICAgICAgIyBhbiBpbnRlcm1lZGlhdGUgbW9kaWZpZXJcXG4gICAgICAgICAgICAgICAgICAgICAgICAgIFtALX5dKSAgICAgICAgICAgICAgICAjIHRoZSBjb21tYW5kXFxuICAgICAgICAgICAgICAgICAgICAgICAgKVxcbiAgICAgICAgICAgICAgICAgICAgICAgIHwgICAgICAgICAgICAgICAgICAgICAgICAgICAjIGFsdGVybmF0ZSAoc2Vjb25kIGF0dGVtcHQpXFxuICAgICAgICAgICAgICAgICAgICAgICAgKD86ICAgICAgICAgICAgICAgICAgICAgICAgICMgaWxsZWdhbCBzZXF1ZW5jZVxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgXFx1MDAxQlsgICAgICAgICAgICAgICAgICAgICAgIyBDU0lcXG4gICAgICAgICAgICAgICAgICAgICAgICAgIFsgLX5dKiAgICAgICAgICAgICAgICAjIGFueXRoaW5nIGxlZ2FsXFxuICAgICAgICAgICAgICAgICAgICAgICAgICAoW1xcMC1cXHUwMDFGOl0pICAgICAgICAgICAgICAjIGFueXRoaW5nIGlsbGVnYWxcXG4gICAgICAgICAgICAgICAgICAgICAgICApXFxuICAgICAgICAgICAgICAgICAgICBcIl0sIFtcIlxcbiAgICAgICAgICAgICAgICAgICAgICAgIF4gICAgICAgICAgICAgICAgICAgICAgICAgICAjIGJlZ2lubmluZyBvZiBsaW5lXFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICNcXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIyBGaXJzdCBhdHRlbXB0XFxuICAgICAgICAgICAgICAgICAgICAgICAgKD86ICAgICAgICAgICAgICAgICAgICAgICAgICMgbGVnYWwgc2VxdWVuY2VcXG4gICAgICAgICAgICAgICAgICAgICAgICAgIFxcXFx4MWJcXFxcWyAgICAgICAgICAgICAgICAgICAgICAjIENTSVxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgKFtcXFxceDNjLVxcXFx4M2ZdPykgICAgICAgICAgICAgICMgcHJpdmF0ZS1tb2RlIGNoYXJcXG4gICAgICAgICAgICAgICAgICAgICAgICAgIChbXFxcXGQ7XSopICAgICAgICAgICAgICAgICAgICAjIGFueSBkaWdpdHMgb3Igc2VtaWNvbG9uc1xcbiAgICAgICAgICAgICAgICAgICAgICAgICAgKFtcXFxceDIwLVxcXFx4MmZdPyAgICAgICAgICAgICAgICMgYW4gaW50ZXJtZWRpYXRlIG1vZGlmaWVyXFxuICAgICAgICAgICAgICAgICAgICAgICAgICBbXFxcXHg0MC1cXFxceDdlXSkgICAgICAgICAgICAgICAgIyB0aGUgY29tbWFuZFxcbiAgICAgICAgICAgICAgICAgICAgICAgIClcXG4gICAgICAgICAgICAgICAgICAgICAgICB8ICAgICAgICAgICAgICAgICAgICAgICAgICAgIyBhbHRlcm5hdGUgKHNlY29uZCBhdHRlbXB0KVxcbiAgICAgICAgICAgICAgICAgICAgICAgICg/OiAgICAgICAgICAgICAgICAgICAgICAgICAjIGlsbGVnYWwgc2VxdWVuY2VcXG4gICAgICAgICAgICAgICAgICAgICAgICAgIFxcXFx4MWJcXFxcWyAgICAgICAgICAgICAgICAgICAgICAjIENTSVxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgW1xcXFx4MjAtXFxcXHg3ZV0qICAgICAgICAgICAgICAgICMgYW55dGhpbmcgbGVnYWxcXG4gICAgICAgICAgICAgICAgICAgICAgICAgIChbXFxcXHgwMC1cXFxceDFmOl0pICAgICAgICAgICAgICAjIGFueXRoaW5nIGlsbGVnYWxcXG4gICAgICAgICAgICAgICAgICAgICAgICApXFxuICAgICAgICAgICAgICAgICAgICBcIl0pKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdmFyIG1hdGNoID0gdGhpcy5fYnVmZmVyLm1hdGNoKHRoaXMuX2NzaV9yZWdleCk7XG4gICAgICAgICAgICAgICAgaWYgKG1hdGNoID09PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgICAgIHBrdC5raW5kID0gUGFja2V0S2luZC5JbmNvbXBsZXRlO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcGt0O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAobWF0Y2hbNF0pIHtcbiAgICAgICAgICAgICAgICAgICAgcGt0LmtpbmQgPSBQYWNrZXRLaW5kLkVTQztcbiAgICAgICAgICAgICAgICAgICAgcGt0LnRleHQgPSB0aGlzLl9idWZmZXIuc2xpY2UoMCwgMSk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2J1ZmZlciA9IHRoaXMuX2J1ZmZlci5zbGljZSgxKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHBrdDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKChtYXRjaFsxXSAhPSAnJykgfHwgKG1hdGNoWzNdICE9ICdtJykpXG4gICAgICAgICAgICAgICAgICAgIHBrdC5raW5kID0gUGFja2V0S2luZC5Vbmtub3duO1xuICAgICAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICAgICAgcGt0LmtpbmQgPSBQYWNrZXRLaW5kLlNHUjtcbiAgICAgICAgICAgICAgICBwa3QudGV4dCA9IG1hdGNoWzJdO1xuICAgICAgICAgICAgICAgIHZhciBycG9zID0gbWF0Y2hbMF0ubGVuZ3RoO1xuICAgICAgICAgICAgICAgIHRoaXMuX2J1ZmZlciA9IHRoaXMuX2J1ZmZlci5zbGljZShycG9zKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gcGt0O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKG5leHRfY2hhciA9PSAnXScpIHtcbiAgICAgICAgICAgICAgICBpZiAobGVuIDwgNCkge1xuICAgICAgICAgICAgICAgICAgICBwa3Qua2luZCA9IFBhY2tldEtpbmQuSW5jb21wbGV0ZTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHBrdDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKCh0aGlzLl9idWZmZXIuY2hhckF0KDIpICE9ICc4JylcbiAgICAgICAgICAgICAgICAgICAgfHwgKHRoaXMuX2J1ZmZlci5jaGFyQXQoMykgIT0gJzsnKSkge1xuICAgICAgICAgICAgICAgICAgICBwa3Qua2luZCA9IFBhY2tldEtpbmQuRVNDO1xuICAgICAgICAgICAgICAgICAgICBwa3QudGV4dCA9IHRoaXMuX2J1ZmZlci5zbGljZSgwLCAxKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fYnVmZmVyID0gdGhpcy5fYnVmZmVyLnNsaWNlKDEpO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcGt0O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAoIXRoaXMuX29zY19zdCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9vc2Nfc3QgPSByZ3hHKF9fbWFrZVRlbXBsYXRlT2JqZWN0KFtcIlxcbiAgICAgICAgICAgICAgICAgICAgICAgICg/OiAgICAgICAgICAgICAgICAgICAgICAgICAjIGxlZ2FsIHNlcXVlbmNlXFxuICAgICAgICAgICAgICAgICAgICAgICAgICAoXFx1MDAxQlxcXFwpICAgICAgICAgICAgICAgICAgICAjIEVTQyAgICAgICAgICAgICAgICAgICAgICAgICAgIHwgICAgICAgICAgICAgICAgICAgICAgICAgICAjIGFsdGVybmF0ZVxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgKFxcdTAwMDcpICAgICAgICAgICAgICAgICAgICAgICMgQkVMICh3aGF0IHh0ZXJtIGRpZClcXG4gICAgICAgICAgICAgICAgICAgICAgICApXFxuICAgICAgICAgICAgICAgICAgICAgICAgfCAgICAgICAgICAgICAgICAgICAgICAgICAgICMgYWx0ZXJuYXRlIChzZWNvbmQgYXR0ZW1wdClcXG4gICAgICAgICAgICAgICAgICAgICAgICAoICAgICAgICAgICAgICAgICAgICAgICAgICAgIyBpbGxlZ2FsIHNlcXVlbmNlXFxuICAgICAgICAgICAgICAgICAgICAgICAgICBbXFwwLVxcdTAwMDZdICAgICAgICAgICAgICAgICAjIGFueXRoaW5nIGlsbGVnYWxcXG4gICAgICAgICAgICAgICAgICAgICAgICAgIHwgICAgICAgICAgICAgICAgICAgICAgICAgICAjIGFsdGVybmF0ZVxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgW1xcYi1cXHUwMDFBXSAgICAgICAgICAgICAgICAgIyBhbnl0aGluZyBpbGxlZ2FsXFxuICAgICAgICAgICAgICAgICAgICAgICAgICB8ICAgICAgICAgICAgICAgICAgICAgICAgICAgIyBhbHRlcm5hdGVcXG4gICAgICAgICAgICAgICAgICAgICAgICAgIFtcXHUwMDFDLVxcdTAwMUZdICAgICAgICAgICAgICAgICAjIGFueXRoaW5nIGlsbGVnYWxcXG4gICAgICAgICAgICAgICAgICAgICAgICApXFxuICAgICAgICAgICAgICAgICAgICBcIl0sIFtcIlxcbiAgICAgICAgICAgICAgICAgICAgICAgICg/OiAgICAgICAgICAgICAgICAgICAgICAgICAjIGxlZ2FsIHNlcXVlbmNlXFxuICAgICAgICAgICAgICAgICAgICAgICAgICAoXFxcXHgxYlxcXFxcXFxcKSAgICAgICAgICAgICAgICAgICAgIyBFU0MgXFxcXFxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgfCAgICAgICAgICAgICAgICAgICAgICAgICAgICMgYWx0ZXJuYXRlXFxuICAgICAgICAgICAgICAgICAgICAgICAgICAoXFxcXHgwNykgICAgICAgICAgICAgICAgICAgICAgIyBCRUwgKHdoYXQgeHRlcm0gZGlkKVxcbiAgICAgICAgICAgICAgICAgICAgICAgIClcXG4gICAgICAgICAgICAgICAgICAgICAgICB8ICAgICAgICAgICAgICAgICAgICAgICAgICAgIyBhbHRlcm5hdGUgKHNlY29uZCBhdHRlbXB0KVxcbiAgICAgICAgICAgICAgICAgICAgICAgICggICAgICAgICAgICAgICAgICAgICAgICAgICAjIGlsbGVnYWwgc2VxdWVuY2VcXG4gICAgICAgICAgICAgICAgICAgICAgICAgIFtcXFxceDAwLVxcXFx4MDZdICAgICAgICAgICAgICAgICAjIGFueXRoaW5nIGlsbGVnYWxcXG4gICAgICAgICAgICAgICAgICAgICAgICAgIHwgICAgICAgICAgICAgICAgICAgICAgICAgICAjIGFsdGVybmF0ZVxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgW1xcXFx4MDgtXFxcXHgxYV0gICAgICAgICAgICAgICAgICMgYW55dGhpbmcgaWxsZWdhbFxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgfCAgICAgICAgICAgICAgICAgICAgICAgICAgICMgYWx0ZXJuYXRlXFxuICAgICAgICAgICAgICAgICAgICAgICAgICBbXFxcXHgxYy1cXFxceDFmXSAgICAgICAgICAgICAgICAgIyBhbnl0aGluZyBpbGxlZ2FsXFxuICAgICAgICAgICAgICAgICAgICAgICAgKVxcbiAgICAgICAgICAgICAgICAgICAgXCJdKSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHRoaXMuX29zY19zdC5sYXN0SW5kZXggPSAwO1xuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIG1hdGNoXzEgPSB0aGlzLl9vc2Nfc3QuZXhlYyh0aGlzLl9idWZmZXIpO1xuICAgICAgICAgICAgICAgICAgICBpZiAobWF0Y2hfMSA9PT0gbnVsbCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcGt0LmtpbmQgPSBQYWNrZXRLaW5kLkluY29tcGxldGU7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gcGt0O1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGlmIChtYXRjaF8xWzNdKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBwa3Qua2luZCA9IFBhY2tldEtpbmQuRVNDO1xuICAgICAgICAgICAgICAgICAgICAgICAgcGt0LnRleHQgPSB0aGlzLl9idWZmZXIuc2xpY2UoMCwgMSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9idWZmZXIgPSB0aGlzLl9idWZmZXIuc2xpY2UoMSk7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gcGt0O1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIG1hdGNoXzIgPSB0aGlzLl9vc2Nfc3QuZXhlYyh0aGlzLl9idWZmZXIpO1xuICAgICAgICAgICAgICAgICAgICBpZiAobWF0Y2hfMiA9PT0gbnVsbCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcGt0LmtpbmQgPSBQYWNrZXRLaW5kLkluY29tcGxldGU7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gcGt0O1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGlmIChtYXRjaF8yWzNdKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBwa3Qua2luZCA9IFBhY2tldEtpbmQuRVNDO1xuICAgICAgICAgICAgICAgICAgICAgICAgcGt0LnRleHQgPSB0aGlzLl9idWZmZXIuc2xpY2UoMCwgMSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9idWZmZXIgPSB0aGlzLl9idWZmZXIuc2xpY2UoMSk7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gcGt0O1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmICghdGhpcy5fb3NjX3JlZ2V4KSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX29zY19yZWdleCA9IHJneChfX21ha2VUZW1wbGF0ZU9iamVjdChbXCJcXG4gICAgICAgICAgICAgICAgICAgICAgICBeICAgICAgICAgICAgICAgICAgICAgICAgICAgIyBiZWdpbm5pbmcgb2YgbGluZVxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAjXFxuICAgICAgICAgICAgICAgICAgICAgICAgXFx1MDAxQl04OyAgICAgICAgICAgICAgICAgICAgIyBPU0MgSHlwZXJsaW5rXFxuICAgICAgICAgICAgICAgICAgICAgICAgWyAtOjwtfl0qICAgICAgICMgcGFyYW1zIChleGNsdWRpbmcgOylcXG4gICAgICAgICAgICAgICAgICAgICAgICA7ICAgICAgICAgICAgICAgICAgICAgICAgICAgIyBlbmQgb2YgcGFyYW1zXFxuICAgICAgICAgICAgICAgICAgICAgICAgKFshLX5dezAsNTEyfSkgICAgICAgICMgVVJMIGNhcHR1cmVcXG4gICAgICAgICAgICAgICAgICAgICAgICAoPzogICAgICAgICAgICAgICAgICAgICAgICAgIyBTVFxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgKD86XFx1MDAxQlxcXFwpICAgICAgICAgICAgICAgICAgIyBFU0MgICAgICAgICAgICAgICAgICAgICAgICAgICB8ICAgICAgICAgICAgICAgICAgICAgICAgICAgIyBhbHRlcm5hdGVcXG4gICAgICAgICAgICAgICAgICAgICAgICAgICg/OlxcdTAwMDcpICAgICAgICAgICAgICAgICAgICAjIEJFTCAod2hhdCB4dGVybSBkaWQpXFxuICAgICAgICAgICAgICAgICAgICAgICAgKVxcbiAgICAgICAgICAgICAgICAgICAgICAgIChbIS1+XSspICAgICAgICAgICAgICAjIFRFWFQgY2FwdHVyZVxcbiAgICAgICAgICAgICAgICAgICAgICAgIFxcdTAwMUJdODs7ICAgICAgICAgICAgICAgICAgICMgT1NDIEh5cGVybGluayBFbmRcXG4gICAgICAgICAgICAgICAgICAgICAgICAoPzogICAgICAgICAgICAgICAgICAgICAgICAgIyBTVFxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgKD86XFx1MDAxQlxcXFwpICAgICAgICAgICAgICAgICAgIyBFU0MgICAgICAgICAgICAgICAgICAgICAgICAgICB8ICAgICAgICAgICAgICAgICAgICAgICAgICAgIyBhbHRlcm5hdGVcXG4gICAgICAgICAgICAgICAgICAgICAgICAgICg/OlxcdTAwMDcpICAgICAgICAgICAgICAgICAgICAjIEJFTCAod2hhdCB4dGVybSBkaWQpXFxuICAgICAgICAgICAgICAgICAgICAgICAgKVxcbiAgICAgICAgICAgICAgICAgICAgXCJdLCBbXCJcXG4gICAgICAgICAgICAgICAgICAgICAgICBeICAgICAgICAgICAgICAgICAgICAgICAgICAgIyBiZWdpbm5pbmcgb2YgbGluZVxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAjXFxuICAgICAgICAgICAgICAgICAgICAgICAgXFxcXHgxYlxcXFxdODsgICAgICAgICAgICAgICAgICAgICMgT1NDIEh5cGVybGlua1xcbiAgICAgICAgICAgICAgICAgICAgICAgIFtcXFxceDIwLVxcXFx4M2FcXFxceDNjLVxcXFx4N2VdKiAgICAgICAjIHBhcmFtcyAoZXhjbHVkaW5nIDspXFxuICAgICAgICAgICAgICAgICAgICAgICAgOyAgICAgICAgICAgICAgICAgICAgICAgICAgICMgZW5kIG9mIHBhcmFtc1xcbiAgICAgICAgICAgICAgICAgICAgICAgIChbXFxcXHgyMS1cXFxceDdlXXswLDUxMn0pICAgICAgICAjIFVSTCBjYXB0dXJlXFxuICAgICAgICAgICAgICAgICAgICAgICAgKD86ICAgICAgICAgICAgICAgICAgICAgICAgICMgU1RcXG4gICAgICAgICAgICAgICAgICAgICAgICAgICg/OlxcXFx4MWJcXFxcXFxcXCkgICAgICAgICAgICAgICAgICAjIEVTQyBcXFxcXFxuICAgICAgICAgICAgICAgICAgICAgICAgICB8ICAgICAgICAgICAgICAgICAgICAgICAgICAgIyBhbHRlcm5hdGVcXG4gICAgICAgICAgICAgICAgICAgICAgICAgICg/OlxcXFx4MDcpICAgICAgICAgICAgICAgICAgICAjIEJFTCAod2hhdCB4dGVybSBkaWQpXFxuICAgICAgICAgICAgICAgICAgICAgICAgKVxcbiAgICAgICAgICAgICAgICAgICAgICAgIChbXFxcXHgyMS1cXFxceDdlXSspICAgICAgICAgICAgICAjIFRFWFQgY2FwdHVyZVxcbiAgICAgICAgICAgICAgICAgICAgICAgIFxcXFx4MWJcXFxcXTg7OyAgICAgICAgICAgICAgICAgICAjIE9TQyBIeXBlcmxpbmsgRW5kXFxuICAgICAgICAgICAgICAgICAgICAgICAgKD86ICAgICAgICAgICAgICAgICAgICAgICAgICMgU1RcXG4gICAgICAgICAgICAgICAgICAgICAgICAgICg/OlxcXFx4MWJcXFxcXFxcXCkgICAgICAgICAgICAgICAgICAjIEVTQyBcXFxcXFxuICAgICAgICAgICAgICAgICAgICAgICAgICB8ICAgICAgICAgICAgICAgICAgICAgICAgICAgIyBhbHRlcm5hdGVcXG4gICAgICAgICAgICAgICAgICAgICAgICAgICg/OlxcXFx4MDcpICAgICAgICAgICAgICAgICAgICAjIEJFTCAod2hhdCB4dGVybSBkaWQpXFxuICAgICAgICAgICAgICAgICAgICAgICAgKVxcbiAgICAgICAgICAgICAgICAgICAgXCJdKSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHZhciBtYXRjaCA9IHRoaXMuX2J1ZmZlci5tYXRjaCh0aGlzLl9vc2NfcmVnZXgpO1xuICAgICAgICAgICAgICAgIGlmIChtYXRjaCA9PT0gbnVsbCkge1xuICAgICAgICAgICAgICAgICAgICBwa3Qua2luZCA9IFBhY2tldEtpbmQuRVNDO1xuICAgICAgICAgICAgICAgICAgICBwa3QudGV4dCA9IHRoaXMuX2J1ZmZlci5zbGljZSgwLCAxKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fYnVmZmVyID0gdGhpcy5fYnVmZmVyLnNsaWNlKDEpO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcGt0O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBwa3Qua2luZCA9IFBhY2tldEtpbmQuT1NDVVJMO1xuICAgICAgICAgICAgICAgIHBrdC51cmwgPSBtYXRjaFsxXTtcbiAgICAgICAgICAgICAgICBwa3QudGV4dCA9IG1hdGNoWzJdO1xuICAgICAgICAgICAgICAgIHZhciBycG9zID0gbWF0Y2hbMF0ubGVuZ3RoO1xuICAgICAgICAgICAgICAgIHRoaXMuX2J1ZmZlciA9IHRoaXMuX2J1ZmZlci5zbGljZShycG9zKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gcGt0O1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfTtcbiAgICBBbnNpVXAucHJvdG90eXBlLmFuc2lfdG9faHRtbCA9IGZ1bmN0aW9uICh0eHQpIHtcbiAgICAgICAgdGhpcy5hcHBlbmRfYnVmZmVyKHR4dCk7XG4gICAgICAgIHZhciBibG9ja3MgPSBbXTtcbiAgICAgICAgd2hpbGUgKHRydWUpIHtcbiAgICAgICAgICAgIHZhciBwYWNrZXQgPSB0aGlzLmdldF9uZXh0X3BhY2tldCgpO1xuICAgICAgICAgICAgaWYgKChwYWNrZXQua2luZCA9PSBQYWNrZXRLaW5kLkVPUylcbiAgICAgICAgICAgICAgICB8fCAocGFja2V0LmtpbmQgPT0gUGFja2V0S2luZC5JbmNvbXBsZXRlKSlcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGlmICgocGFja2V0LmtpbmQgPT0gUGFja2V0S2luZC5FU0MpXG4gICAgICAgICAgICAgICAgfHwgKHBhY2tldC5raW5kID09IFBhY2tldEtpbmQuVW5rbm93bikpXG4gICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICBpZiAocGFja2V0LmtpbmQgPT0gUGFja2V0S2luZC5UZXh0KVxuICAgICAgICAgICAgICAgIGJsb2Nrcy5wdXNoKHRoaXMudHJhbnNmb3JtX3RvX2h0bWwodGhpcy53aXRoX3N0YXRlKHBhY2tldCkpKTtcbiAgICAgICAgICAgIGVsc2UgaWYgKHBhY2tldC5raW5kID09IFBhY2tldEtpbmQuU0dSKVxuICAgICAgICAgICAgICAgIHRoaXMucHJvY2Vzc19hbnNpKHBhY2tldCk7XG4gICAgICAgICAgICBlbHNlIGlmIChwYWNrZXQua2luZCA9PSBQYWNrZXRLaW5kLk9TQ1VSTClcbiAgICAgICAgICAgICAgICBibG9ja3MucHVzaCh0aGlzLnByb2Nlc3NfaHlwZXJsaW5rKHBhY2tldCkpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBibG9ja3Muam9pbihcIlwiKTtcbiAgICB9O1xuICAgIEFuc2lVcC5wcm90b3R5cGUud2l0aF9zdGF0ZSA9IGZ1bmN0aW9uIChwa3QpIHtcbiAgICAgICAgcmV0dXJuIHsgYm9sZDogdGhpcy5ib2xkLCBmZzogdGhpcy5mZywgYmc6IHRoaXMuYmcsIHRleHQ6IHBrdC50ZXh0IH07XG4gICAgfTtcbiAgICBBbnNpVXAucHJvdG90eXBlLnByb2Nlc3NfYW5zaSA9IGZ1bmN0aW9uIChwa3QpIHtcbiAgICAgICAgdmFyIHNncl9jbWRzID0gcGt0LnRleHQuc3BsaXQoJzsnKTtcbiAgICAgICAgd2hpbGUgKHNncl9jbWRzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIHZhciBzZ3JfY21kX3N0ciA9IHNncl9jbWRzLnNoaWZ0KCk7XG4gICAgICAgICAgICB2YXIgbnVtID0gcGFyc2VJbnQoc2dyX2NtZF9zdHIsIDEwKTtcbiAgICAgICAgICAgIGlmIChpc05hTihudW0pIHx8IG51bSA9PT0gMCkge1xuICAgICAgICAgICAgICAgIHRoaXMuZmcgPSB0aGlzLmJnID0gbnVsbDtcbiAgICAgICAgICAgICAgICB0aGlzLmJvbGQgPSBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKG51bSA9PT0gMSkge1xuICAgICAgICAgICAgICAgIHRoaXMuYm9sZCA9IHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmIChudW0gPT09IDIyKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5ib2xkID0gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmIChudW0gPT09IDM5KSB7XG4gICAgICAgICAgICAgICAgdGhpcy5mZyA9IG51bGw7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmIChudW0gPT09IDQ5KSB7XG4gICAgICAgICAgICAgICAgdGhpcy5iZyA9IG51bGw7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmICgobnVtID49IDMwKSAmJiAobnVtIDwgMzgpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5mZyA9IHRoaXMuYW5zaV9jb2xvcnNbMF1bKG51bSAtIDMwKV07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmICgobnVtID49IDQwKSAmJiAobnVtIDwgNDgpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5iZyA9IHRoaXMuYW5zaV9jb2xvcnNbMF1bKG51bSAtIDQwKV07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmICgobnVtID49IDkwKSAmJiAobnVtIDwgOTgpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5mZyA9IHRoaXMuYW5zaV9jb2xvcnNbMV1bKG51bSAtIDkwKV07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmICgobnVtID49IDEwMCkgJiYgKG51bSA8IDEwOCkpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmJnID0gdGhpcy5hbnNpX2NvbG9yc1sxXVsobnVtIC0gMTAwKV07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmIChudW0gPT09IDM4IHx8IG51bSA9PT0gNDgpIHtcbiAgICAgICAgICAgICAgICBpZiAoc2dyX2NtZHMubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgaXNfZm9yZWdyb3VuZCA9IChudW0gPT09IDM4KTtcbiAgICAgICAgICAgICAgICAgICAgdmFyIG1vZGVfY21kID0gc2dyX2NtZHMuc2hpZnQoKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKG1vZGVfY21kID09PSAnNScgJiYgc2dyX2NtZHMubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHBhbGV0dGVfaW5kZXggPSBwYXJzZUludChzZ3JfY21kcy5zaGlmdCgpLCAxMCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAocGFsZXR0ZV9pbmRleCA+PSAwICYmIHBhbGV0dGVfaW5kZXggPD0gMjU1KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGlzX2ZvcmVncm91bmQpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZmcgPSB0aGlzLnBhbGV0dGVfMjU2W3BhbGV0dGVfaW5kZXhdO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5iZyA9IHRoaXMucGFsZXR0ZV8yNTZbcGFsZXR0ZV9pbmRleF07XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgaWYgKG1vZGVfY21kID09PSAnMicgJiYgc2dyX2NtZHMubGVuZ3RoID4gMikge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHIgPSBwYXJzZUludChzZ3JfY21kcy5zaGlmdCgpLCAxMCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgZyA9IHBhcnNlSW50KHNncl9jbWRzLnNoaWZ0KCksIDEwKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBiID0gcGFyc2VJbnQoc2dyX2NtZHMuc2hpZnQoKSwgMTApO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKChyID49IDAgJiYgciA8PSAyNTUpICYmIChnID49IDAgJiYgZyA8PSAyNTUpICYmIChiID49IDAgJiYgYiA8PSAyNTUpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGMgPSB7IHJnYjogW3IsIGcsIGJdLCBjbGFzc19uYW1lOiAndHJ1ZWNvbG9yJyB9O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpc19mb3JlZ3JvdW5kKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmZnID0gYztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuYmcgPSBjO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfTtcbiAgICBBbnNpVXAucHJvdG90eXBlLnRyYW5zZm9ybV90b19odG1sID0gZnVuY3Rpb24gKGZyYWdtZW50KSB7XG4gICAgICAgIHZhciB0eHQgPSBmcmFnbWVudC50ZXh0O1xuICAgICAgICBpZiAodHh0Lmxlbmd0aCA9PT0gMClcbiAgICAgICAgICAgIHJldHVybiB0eHQ7XG4gICAgICAgIGlmICh0aGlzLl9lc2NhcGVfZm9yX2h0bWwpXG4gICAgICAgICAgICB0eHQgPSB0aGlzLmVzY2FwZV90eHRfZm9yX2h0bWwodHh0KTtcbiAgICAgICAgaWYgKCFmcmFnbWVudC5ib2xkICYmIGZyYWdtZW50LmZnID09PSBudWxsICYmIGZyYWdtZW50LmJnID09PSBudWxsKVxuICAgICAgICAgICAgcmV0dXJuIHR4dDtcbiAgICAgICAgdmFyIHN0eWxlcyA9IFtdO1xuICAgICAgICB2YXIgY2xhc3NlcyA9IFtdO1xuICAgICAgICB2YXIgZmcgPSBmcmFnbWVudC5mZztcbiAgICAgICAgdmFyIGJnID0gZnJhZ21lbnQuYmc7XG4gICAgICAgIGlmIChmcmFnbWVudC5ib2xkKVxuICAgICAgICAgICAgc3R5bGVzLnB1c2goJ2ZvbnQtd2VpZ2h0OmJvbGQnKTtcbiAgICAgICAgaWYgKCF0aGlzLl91c2VfY2xhc3Nlcykge1xuICAgICAgICAgICAgaWYgKGZnKVxuICAgICAgICAgICAgICAgIHN0eWxlcy5wdXNoKFwiY29sb3I6cmdiKFwiICsgZmcucmdiLmpvaW4oJywnKSArIFwiKVwiKTtcbiAgICAgICAgICAgIGlmIChiZylcbiAgICAgICAgICAgICAgICBzdHlsZXMucHVzaChcImJhY2tncm91bmQtY29sb3I6cmdiKFwiICsgYmcucmdiICsgXCIpXCIpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgaWYgKGZnKSB7XG4gICAgICAgICAgICAgICAgaWYgKGZnLmNsYXNzX25hbWUgIT09ICd0cnVlY29sb3InKSB7XG4gICAgICAgICAgICAgICAgICAgIGNsYXNzZXMucHVzaChmZy5jbGFzc19uYW1lICsgXCItZmdcIik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBzdHlsZXMucHVzaChcImNvbG9yOnJnYihcIiArIGZnLnJnYi5qb2luKCcsJykgKyBcIilcIik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGJnKSB7XG4gICAgICAgICAgICAgICAgaWYgKGJnLmNsYXNzX25hbWUgIT09ICd0cnVlY29sb3InKSB7XG4gICAgICAgICAgICAgICAgICAgIGNsYXNzZXMucHVzaChiZy5jbGFzc19uYW1lICsgXCItYmdcIik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBzdHlsZXMucHVzaChcImJhY2tncm91bmQtY29sb3I6cmdiKFwiICsgYmcucmdiLmpvaW4oJywnKSArIFwiKVwiKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgdmFyIGNsYXNzX3N0cmluZyA9ICcnO1xuICAgICAgICB2YXIgc3R5bGVfc3RyaW5nID0gJyc7XG4gICAgICAgIGlmIChjbGFzc2VzLmxlbmd0aClcbiAgICAgICAgICAgIGNsYXNzX3N0cmluZyA9IFwiIGNsYXNzPVxcXCJcIiArIGNsYXNzZXMuam9pbignICcpICsgXCJcXFwiXCI7XG4gICAgICAgIGlmIChzdHlsZXMubGVuZ3RoKVxuICAgICAgICAgICAgc3R5bGVfc3RyaW5nID0gXCIgc3R5bGU9XFxcIlwiICsgc3R5bGVzLmpvaW4oJzsnKSArIFwiXFxcIlwiO1xuICAgICAgICByZXR1cm4gXCI8c3BhblwiICsgc3R5bGVfc3RyaW5nICsgY2xhc3Nfc3RyaW5nICsgXCI+XCIgKyB0eHQgKyBcIjwvc3Bhbj5cIjtcbiAgICB9O1xuICAgIDtcbiAgICBBbnNpVXAucHJvdG90eXBlLnByb2Nlc3NfaHlwZXJsaW5rID0gZnVuY3Rpb24gKHBrdCkge1xuICAgICAgICB2YXIgcGFydHMgPSBwa3QudXJsLnNwbGl0KCc6Jyk7XG4gICAgICAgIGlmIChwYXJ0cy5sZW5ndGggPCAxKVxuICAgICAgICAgICAgcmV0dXJuICcnO1xuICAgICAgICBpZiAoIXRoaXMuX3VybF93aGl0ZWxpc3RbcGFydHNbMF1dKVxuICAgICAgICAgICAgcmV0dXJuICcnO1xuICAgICAgICB2YXIgcmVzdWx0ID0gXCI8YSBocmVmPVxcXCJcIiArIHRoaXMuZXNjYXBlX3R4dF9mb3JfaHRtbChwa3QudXJsKSArIFwiXFxcIj5cIiArIHRoaXMuZXNjYXBlX3R4dF9mb3JfaHRtbChwa3QudGV4dCkgKyBcIjwvYT5cIjtcbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9O1xuICAgIHJldHVybiBBbnNpVXA7XG59KCkpO1xuZnVuY3Rpb24gcmd4KHRtcGxPYmopIHtcbiAgICB2YXIgc3Vic3QgPSBbXTtcbiAgICBmb3IgKHZhciBfaSA9IDE7IF9pIDwgYXJndW1lbnRzLmxlbmd0aDsgX2krKykge1xuICAgICAgICBzdWJzdFtfaSAtIDFdID0gYXJndW1lbnRzW19pXTtcbiAgICB9XG4gICAgdmFyIHJlZ2V4VGV4dCA9IHRtcGxPYmoucmF3WzBdO1xuICAgIHZhciB3c3JneCA9IC9eXFxzK3xcXHMrXFxufFxccyojW1xcc1xcU10qP1xcbnxcXG4vZ207XG4gICAgdmFyIHR4dDIgPSByZWdleFRleHQucmVwbGFjZSh3c3JneCwgJycpO1xuICAgIHJldHVybiBuZXcgUmVnRXhwKHR4dDIpO1xufVxuZnVuY3Rpb24gcmd4Ryh0bXBsT2JqKSB7XG4gICAgdmFyIHN1YnN0ID0gW107XG4gICAgZm9yICh2YXIgX2kgPSAxOyBfaSA8IGFyZ3VtZW50cy5sZW5ndGg7IF9pKyspIHtcbiAgICAgICAgc3Vic3RbX2kgLSAxXSA9IGFyZ3VtZW50c1tfaV07XG4gICAgfVxuICAgIHZhciByZWdleFRleHQgPSB0bXBsT2JqLnJhd1swXTtcbiAgICB2YXIgd3NyZ3ggPSAvXlxccyt8XFxzK1xcbnxcXHMqI1tcXHNcXFNdKj9cXG58XFxuL2dtO1xuICAgIHZhciB0eHQyID0gcmVnZXhUZXh0LnJlcGxhY2Uod3NyZ3gsICcnKTtcbiAgICByZXR1cm4gbmV3IFJlZ0V4cCh0eHQyLCAnZycpO1xufVxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9YW5zaV91cC5qcy5tYXBcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG4gICAgZXhwb3J0cy5kZWZhdWx0ID0gQW5zaVVwO1xufSkpO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vbm9kZV9tb2R1bGVzL2Fuc2lfdXAvYW5zaV91cC5qcyIsImltcG9ydCB7IFNlcnZpY2UgfSBmcm9tIFwiLi4vY29tbW9uL2FwaVwiO1xuXG5jb25zdCBCQVNFX1VSTCA9IFwiL3plcm9ib3QvYWRtaW4vYWN0b3JzL2FsZXJ0YVwiO1xuXG5jbGFzcyBBbGVydHNTZXJ2aWNlIGV4dGVuZHMgU2VydmljZSB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHN1cGVyKEJBU0VfVVJMKTtcbiAgICB9XG5cbiAgICBsaXN0KCkge1xuICAgICAgICByZXR1cm4gdGhpcy5nZXRDYWxsKFwibGlzdF9hbGVydHNcIik7XG4gICAgfVxuXG4gICAgZGVsZXRlKGlkZW50aWZpZXJzKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnBvc3RDYWxsKFwiZGVsZXRlX2FsZXJ0c1wiLCB7XG4gICAgICAgICAgICBpZGVudGlmaWVyczogaWRlbnRpZmllcnNcbiAgICAgICAgfSk7XG4gICAgfVxufVxuXG5leHBvcnQgY29uc3QgYWxlcnRzID0gbmV3IEFsZXJ0c1NlcnZpY2UoKTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NvdXJjZXMvc2VydmljZXMvYWxlcnRzLmpzIiwiaW1wb3J0IHsgU2VydmljZSB9IGZyb20gXCIuLi9jb21tb24vYXBpXCI7XG5cbmNvbnN0IEJBU0VfVVJMID0gXCIvdGZncmlkX3NvbHV0aW9ucy90ZmdyaWRfc29sdXRpb25zL2FjdG9ycy90ZmdyaWRfc29sdXRpb25zXCI7XG5cblxuY2xhc3MgU29sdXRpb25zU2VydmljZSBleHRlbmRzIFNlcnZpY2Uge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICBzdXBlcihCQVNFX1VSTCk7XG4gICAgfVxuXG5cbiAgICBsaXN0KG9wdHMpIHtcbiAgICAgICAgb3B0cyA9IG9wdHMgfHwge307XG4gICAgICAgIHJldHVybiB0aGlzLmdldENhbGwoXCJzb2x1dGlvbnNfbGlzdFwiKTtcbiAgICB9XG5cblxuICAgIGRlbGV0ZShzb2x1dGlvblR5cGUsIHNvbHV0aW9uTmFtZSkge1xuICAgICAgICByZXR1cm4gdGhpcy5wb3N0Q2FsbChcInNvbHV0aW9uX2RlbGV0ZVwiLCB7IHNvbHV0aW9uX3R5cGU6IHNvbHV0aW9uVHlwZSwgc29sdXRpb25fbmFtZTogc29sdXRpb25OYW1lIH0pO1xuXG4gICAgfVxuXG59XG5cbmV4cG9ydCBjb25zdCBzb2x1dGlvbnMgPSBuZXcgU29sdXRpb25zU2VydmljZSgpO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc291cmNlcy9zZXJ2aWNlcy9kZXBsb3llZFNvbHV0aW9ucy5qcyIsImltcG9ydCB7IFNlcnZpY2UgfSBmcm9tIFwiLi4vY29tbW9uL2FwaVwiO1xuXG5jb25zdCBCQVNFX1VSTCA9IFwiL3plcm9ib3QvYWRtaW4vYWN0b3JzL2xvZ3NcIjtcblxuY2xhc3MgTG9nc1NlcnZpY2UgZXh0ZW5kcyBTZXJ2aWNlIHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgc3VwZXIoQkFTRV9VUkwpO1xuICAgIH1cblxuICAgIGxpc3RBcHBzKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5nZXRDYWxsKFwibGlzdF9hcHBzXCIpO1xuICAgIH1cblxuICAgIGxpc3QoYXBwTmFtZSwgbG9nSWQpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucG9zdENhbGwoXCJsaXN0XCIsIHtcbiAgICAgICAgICAgIGFwcG5hbWU6IGFwcE5hbWUsXG4gICAgICAgICAgICBpZF9mcm9tOiBsb2dJZFxuICAgICAgICB9KTtcbiAgICB9XG59XG5cbmV4cG9ydCBjb25zdCBsb2dzID0gbmV3IExvZ3NTZXJ2aWNlKCk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zb3VyY2VzL3NlcnZpY2VzL2xvZ3MuanMiLCJpbXBvcnQgeyBTZXJ2aWNlIH0gZnJvbSBcIi4uL2NvbW1vbi9hcGlcIjtcblxuY29uc3QgQkFTRV9VUkwgPSBcIi9hdXRoXCI7XG5cbmNsYXNzIEF1dGhTZXJ2aWNlIGV4dGVuZHMgU2VydmljZSB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHN1cGVyKEJBU0VfVVJMKTtcbiAgICB9XG5cbiAgICBnZXRDdXJyZW50VXNlcigpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0Q2FsbChcImF1dGhvcml6ZWRcIik7XG4gICAgfVxuXG4gICAgbG9nb3V0KCkge1xuICAgICAgICBjb25zdCBuZXh0VXJsID0gd2luZG93LmxvY2F0aW9uLnBhdGhuYW1lICsgd2luZG93LmxvY2F0aW9uLmhhc2g7XG4gICAgICAgIHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gYC9hdXRoL2xvZ291dD9uZXh0X3VybD0ke25leHRVcmx9YDtcbiAgICB9XG59XG5cbmV4cG9ydCBjb25zdCBhdXRoID0gbmV3IEF1dGhTZXJ2aWNlKCk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zb3VyY2VzL3NlcnZpY2VzL2F1dGguanMiLCJleHBvcnQgZnVuY3Rpb24gaW5wdXREaWFsb2coaGVhZCwgbGFiZWwsIGJ1dHRvbkxhYmVsLCBjYWxsYmFjaykge1xuICAgIGNvbnN0IHdpbmRvdyA9IHdlYml4LnVpKHtcbiAgICAgICAgdmlldzogXCJ3aW5kb3dcIixcbiAgICAgICAgaGVpZ2h0OiAyMDAsXG4gICAgICAgIHdpZHRoOiAzMDAsXG4gICAgICAgIG1vZGFsOiB0cnVlLFxuICAgICAgICBwb3NpdGlvbjogXCJjZW50ZXJcIixcbiAgICAgICAgaGVhZDogaGVhZCB8fCBcIklucHV0XCIsXG4gICAgICAgIGJvZHk6IHtcbiAgICAgICAgICAgIHZpZXc6IFwiZm9ybVwiLFxuICAgICAgICAgICAgZWxlbWVudHM6IFt7XG4gICAgICAgICAgICAgICAgaWQ6IFwiaW5wdXRfZGlhbG9nX3RleHRcIixcbiAgICAgICAgICAgICAgICB2aWV3OiBcInRleHRcIixcbiAgICAgICAgICAgICAgICBuYW1lOiBcImlucHV0XCIsXG4gICAgICAgICAgICAgICAgbGFiZWw6IGxhYmVsIHx8IFwiVmFsdWVcIixcbiAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICBjb2xzOiBbe1xuICAgICAgICAgICAgICAgICAgICB2aWV3OiBcImJ1dHRvblwiLFxuICAgICAgICAgICAgICAgICAgICBsYWJlbDogXCJDYW5jZWxcIixcbiAgICAgICAgICAgICAgICAgICAgY2xpY2s6ICgpID0+IHdpbmRvdy5oaWRlKCksXG4gICAgICAgICAgICAgICAgICAgIGNzczogXCJ3ZWJpeF9kYW5nZXJcIlxuICAgICAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICAgICAgdmlldzogXCJidXR0b25cIixcbiAgICAgICAgICAgICAgICAgICAgbGFiZWw6IGJ1dHRvbkxhYmVsIHx8IFwiT2tcIixcbiAgICAgICAgICAgICAgICAgICAgY2xpY2s6IGhhbmRsZUlucHV0LFxuICAgICAgICAgICAgICAgICAgICBjc3M6IFwid2ViaXhfcHJpbWFyeVwiXG4gICAgICAgICAgICAgICAgfV1cbiAgICAgICAgICAgIH1dXG4gICAgICAgIH1cbiAgICB9KTtcblxuICAgIGZ1bmN0aW9uIGhhbmRsZUlucHV0KCkge1xuICAgICAgICBjb25zdCB2YWx1ZSA9IHRoaXMuZ2V0Rm9ybVZpZXcoKS5lbGVtZW50cy5pbnB1dC5nZXRWYWx1ZSgpLnRyaW0oKTtcbiAgICAgICAgaWYgKCF2YWx1ZSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGNhbGxiYWNrIGluc3RhbmNlb2YgRnVuY3Rpb24pIHtcbiAgICAgICAgICAgIGNhbGxiYWNrKHZhbHVlKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHdpbmRvdy5oaWRlKCk7XG4gICAgfVxuXG5cbiAgICBjb25zdCB0ZXh0SW5wdXQgPSAkJChcImlucHV0X2RpYWxvZ190ZXh0XCIpO1xuICAgIHRleHRJbnB1dC5hdHRhY2hFdmVudChcIm9uRW50ZXJcIiwgaGFuZGxlSW5wdXQuYmluZCh0ZXh0SW5wdXQpKTtcblxuICAgIHdpbmRvdy5zaG93KCk7XG4gICAgd2ViaXguVUlNYW5hZ2VyLnNldEZvY3VzKHRleHRJbnB1dCk7XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zb3VyY2VzL2NvbW1vbi9kaWFsb2dzLmpzIiwiaW1wb3J0IHsgU2VydmljZSB9IGZyb20gXCIuLi9jb21tb24vYXBpXCI7XG5cbmNvbnN0IEJBU0VfVVJMID0gXCIvemVyb2JvdC93ZWJpbnRlcmZhY2UvYWN0b3JzL21kYm9va1wiO1xuXG5jbGFzcyBXaWtpc1NlcnZpY2UgZXh0ZW5kcyBTZXJ2aWNlIHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgc3VwZXIoQkFTRV9VUkwpO1xuICAgIH1cblxuICAgIGxpc3Qob3B0cykge1xuICAgICAgICBvcHRzID0gb3B0cyB8fCB7fTtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0Q2FsbChcImJvb2tzX2xpc3RcIik7XG4gICAgfVxufVxuXG5cbmV4cG9ydCBjb25zdCBwYWNrYWdlcyA9IG5ldyBXaWtpc1NlcnZpY2UoKTtcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zb3VyY2VzL3NlcnZpY2VzL3dpa2kuanMiLCJ2YXIgbWFwID0ge1xuXHRcIi4vZW5cIjogNTAsXG5cdFwiLi9lbi5qc1wiOiA1MFxufTtcbmZ1bmN0aW9uIHdlYnBhY2tDb250ZXh0KHJlcSkge1xuXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyh3ZWJwYWNrQ29udGV4dFJlc29sdmUocmVxKSk7XG59O1xuZnVuY3Rpb24gd2VicGFja0NvbnRleHRSZXNvbHZlKHJlcSkge1xuXHR2YXIgaWQgPSBtYXBbcmVxXTtcblx0aWYoIShpZCArIDEpKSAvLyBjaGVjayBmb3IgbnVtYmVyIG9yIHN0cmluZ1xuXHRcdHRocm93IG5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIgKyByZXEgKyBcIicuXCIpO1xuXHRyZXR1cm4gaWQ7XG59O1xud2VicGFja0NvbnRleHQua2V5cyA9IGZ1bmN0aW9uIHdlYnBhY2tDb250ZXh0S2V5cygpIHtcblx0cmV0dXJuIE9iamVjdC5rZXlzKG1hcCk7XG59O1xud2VicGFja0NvbnRleHQucmVzb2x2ZSA9IHdlYnBhY2tDb250ZXh0UmVzb2x2ZTtcbm1vZHVsZS5leHBvcnRzID0gd2VicGFja0NvbnRleHQ7XG53ZWJwYWNrQ29udGV4dC5pZCA9IDYxO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vc291cmNlcy9sb2NhbGVzIF5cXC5cXC8uKiRcbi8vIG1vZHVsZSBpZCA9IDYxXG4vLyBtb2R1bGUgY2h1bmtzID0gMCJdLCJzb3VyY2VSb290IjoiIn0=