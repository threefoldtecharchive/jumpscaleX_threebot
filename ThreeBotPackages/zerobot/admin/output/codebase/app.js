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
/******/ 	return __webpack_require__(__webpack_require__.s = 52);
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
        return __webpack_require__(54)("./" + url);
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
        var data = __webpack_require__(62)("./" + path);
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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_packages__ = __webpack_require__(37);
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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__services_alerts__ = __webpack_require__(56);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__alert__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__common_filters__ = __webpack_require__(36);
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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_ansi_up__ = __webpack_require__(55);
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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_deployedSolutions__ = __webpack_require__(57);
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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_logs__ = __webpack_require__(58);
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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_packages__ = __webpack_require__(37);
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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__walletDetails__ = __webpack_require__(34);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__importForm__ = __webpack_require__(35);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__services_wallet__ = __webpack_require__(33);
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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_wiki__ = __webpack_require__(61);
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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__common_filters__ = __webpack_require__(36);
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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__common_dialogs__ = __webpack_require__(60);
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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_wallet__ = __webpack_require__(33);
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
/* 33 */
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

    WalletService.prototype.importWallet = function importWallet(name, secret) {
        return this.getCall("import_wallet", { name: name, secret: secret });
    };

    return WalletService;
}(__WEBPACK_IMPORTED_MODULE_0__common_api__["a" /* Service */]);

var wallet = new WalletService();

/***/ }),
/* 34 */
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
            width: 800,
            height: 500,
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
            balances += "<br>" + data.balances[i].balance + " <b>" + data.balances[i].asset_code + "</b> " + data.balances[i].asset_issuer;
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
/* 35 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_webix_jet__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_wallet__ = __webpack_require__(33);
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
                label: "Secret",
                name: "secret",
                placeholder: "Wallet secret"
            }, {
                view: "text",
                label: "Name",
                name: "name",
                placeholder: "Wallet name"
            }]
        };

        return {
            view: "window",
            head: "Import wallet",
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
                        var name = $$('import_form').getValues().name;
                        var secret = $$('import_form').getValues().secret;
                        console.log(name);
                        console.log(secret);
                        this.$scope.importWallet(name, secret);
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

    WalletImportView.prototype.importWallet = function importWallet(name, secret) {
        var _this2 = this;

        webix.extend(this.form, webix.ProgressBar);
        this.form.showProgress({
            type: "icon",
            hide: false
        });
        __WEBPACK_IMPORTED_MODULE_1__services_wallet__["a" /* wallet */].importWallet(name, secret).then(function (data) {
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
/* 36 */
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
/* 37 */
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
/* 38 */
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
/* 39 */
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
/* 40 */
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
/* 41 */
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
/* 42 */
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
/* 43 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_webix_jet__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_auth__ = __webpack_require__(59);
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
/* 44 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_webix_jet__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__common_formatters__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_myjobs__ = __webpack_require__(45);
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
/* 45 */
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
/* 46 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_webix_jet__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__common_formatters__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_myjobs__ = __webpack_require__(45);
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
/* 47 */
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
/* 48 */
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
/* 49 */
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
/* 50 */
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
/* 51 */
/***/ (function(module, exports) {



/***/ }),
/* 52 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__styles_app_css__ = __webpack_require__(53);
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
/* 53 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 54 */
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
	"./dash/diskSpace": 38,
	"./dash/diskSpace.js": 38,
	"./dash/health": 39,
	"./dash/health.js": 39,
	"./dash/index": 14,
	"./dash/index.js": 14,
	"./dash/jsxInfo": 40,
	"./dash/jsxInfo.js": 40,
	"./dash/processes": 41,
	"./dash/processes.js": 41,
	"./dash/processesChildView": 27,
	"./dash/processesChildView.js": 27,
	"./dash/runningPorts": 42,
	"./dash/runningPorts.js": 42,
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
	"./main": 43,
	"./main.js": 43,
	"./myjobs/jobs": 44,
	"./myjobs/jobs.js": 44,
	"./myjobs/workers": 46,
	"./myjobs/workers.js": 46,
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
	"./solutions/chatflow": 47,
	"./solutions/chatflow.js": 47,
	"./tfwikis/tfgridsdk": 48,
	"./tfwikis/tfgridsdk.js": 48,
	"./tfwikis/threefold": 49,
	"./tfwikis/threefold.js": 49,
	"./walletsManager": 22,
	"./walletsManager/": 22,
	"./walletsManager/importForm": 35,
	"./walletsManager/importForm.js": 35,
	"./walletsManager/index": 22,
	"./walletsManager/index.js": 22,
	"./walletsManager/walletDetails": 34,
	"./walletsManager/walletDetails.js": 34,
	"./walletsManager/walletForm": 32,
	"./walletsManager/walletForm.js": 32,
	"./wikis": 23,
	"./wikis/": 23,
	"./wikis/index": 23,
	"./wikis/index.js": 23,
	"./wikis/view": 50,
	"./wikis/view.js": 50
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
webpackContext.id = 54;

/***/ }),
/* 55 */
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
/* 56 */
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
/* 57 */
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
/* 58 */
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
/* 59 */
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
/* 60 */
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
/* 61 */
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
/* 62 */
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./en": 51,
	"./en.js": 51
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
webpackContext.id = 62;

/***/ })
/******/ ])["default"];
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgZGE1M2QzZmY0ZjFkMTc1YTc3NDQiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3dlYml4LWpldC9kaXN0L2VzNi9qZXQuanMiLCJ3ZWJwYWNrOi8vLy4vc291cmNlcy92aWV3cy9leHRlcm5hbC9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9zb3VyY2VzL2NvbW1vbi9hcGkuanMiLCJ3ZWJwYWNrOi8vLy4vc291cmNlcy92aWV3cy9lcnJvcnMvZGlhbG9nLmpzIiwid2VicGFjazovLy8uL3NvdXJjZXMvdmlld3MvYWxlcnRzL2RhdGEuanMiLCJ3ZWJwYWNrOi8vLy4vc291cmNlcy9jb21tb24vZm9ybWF0dGVycy5qcyIsIndlYnBhY2s6Ly8vLi9zb3VyY2VzL3NlcnZpY2VzL2hlYWx0aC5qcyIsIndlYnBhY2s6Ly8vLi9zb3VyY2VzL3ZpZXdzL2FsZXJ0cy9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9zb3VyY2VzL2NvbW1vbi9jb2xvcnMuanMiLCJ3ZWJwYWNrOi8vLy4vc291cmNlcy92aWV3cy9jYXBhY2l0eS9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9zb3VyY2VzL3ZpZXdzL2NpcmNsZXMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vc291cmNlcy92aWV3cy9jaXJjbGVzdG9yaWVzL2luZGV4LmpzIiwid2VicGFjazovLy8uL3NvdXJjZXMvdmlld3MvY2lyY2xldGFza3MvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vc291cmNlcy92aWV3cy9jb2Rlc2VydmVyL2luZGV4LmpzIiwid2VicGFjazovLy8uL3NvdXJjZXMvdmlld3MvZGFzaC9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9zb3VyY2VzL3ZpZXdzL2RlcGxveWVkU29sdXRpb25zL2luZGV4LmpzIiwid2VicGFjazovLy8uL3NvdXJjZXMvdmlld3MvZmFybW1hbmFnZW1lbnQvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vc291cmNlcy92aWV3cy9qdXB5dGVyL2luZGV4LmpzIiwid2VicGFjazovLy8uL3NvdXJjZXMvdmlld3MvbG9ncy9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9zb3VyY2VzL3ZpZXdzL3BhY2thZ2VzL2luZGV4LmpzIiwid2VicGFjazovLy8uL3NvdXJjZXMvdmlld3Mvc2RrZXhhbXBsZXMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vc291cmNlcy92aWV3cy9zZXR0aW5ncy9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9zb3VyY2VzL3ZpZXdzL3dhbGxldHNNYW5hZ2VyL2luZGV4LmpzIiwid2VicGFjazovLy8uL3NvdXJjZXMvdmlld3Mvd2lraXMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vc291cmNlcy92aWV3cy9hbGVydHMvYWxlcnQuanMiLCJ3ZWJwYWNrOi8vLy4vc291cmNlcy9zZXJ2aWNlcy9hZG1pbi5qcyIsIndlYnBhY2s6Ly8vLi9zb3VyY2VzL3NlcnZpY2VzL3RhaWdhLmpzIiwid2VicGFjazovLy8uL3NvdXJjZXMvdmlld3MvZGFzaC9wcm9jZXNzZXNDaGlsZFZpZXcuanMiLCJ3ZWJwYWNrOi8vLy4vc291cmNlcy92aWV3cy9kZXBsb3llZFNvbHV0aW9ucy9yZXNlcnZhdGlvbi5qcyIsIndlYnBhY2s6Ly8vLi9zb3VyY2VzL3ZpZXdzL2xvZ3MvYXBwTG9ncy5qcyIsIndlYnBhY2s6Ly8vLi9zb3VyY2VzL3ZpZXdzL3NldHRpbmdzL2FkbWlucy5qcyIsIndlYnBhY2s6Ly8vLi9zb3VyY2VzL3ZpZXdzL3NldHRpbmdzL2dlbmVyYWwuanMiLCJ3ZWJwYWNrOi8vLy4vc291cmNlcy92aWV3cy93YWxsZXRzTWFuYWdlci93YWxsZXRGb3JtLmpzIiwid2VicGFjazovLy8uL3NvdXJjZXMvc2VydmljZXMvd2FsbGV0LmpzIiwid2VicGFjazovLy8uL3NvdXJjZXMvdmlld3Mvd2FsbGV0c01hbmFnZXIvd2FsbGV0RGV0YWlscy5qcyIsIndlYnBhY2s6Ly8vLi9zb3VyY2VzL3ZpZXdzL3dhbGxldHNNYW5hZ2VyL2ltcG9ydEZvcm0uanMiLCJ3ZWJwYWNrOi8vLy4vc291cmNlcy9jb21tb24vZmlsdGVycy5qcyIsIndlYnBhY2s6Ly8vLi9zb3VyY2VzL3NlcnZpY2VzL3BhY2thZ2VzLmpzIiwid2VicGFjazovLy8uL3NvdXJjZXMvdmlld3MvZGFzaC9kaXNrU3BhY2UuanMiLCJ3ZWJwYWNrOi8vLy4vc291cmNlcy92aWV3cy9kYXNoL2hlYWx0aC5qcyIsIndlYnBhY2s6Ly8vLi9zb3VyY2VzL3ZpZXdzL2Rhc2gvanN4SW5mby5qcyIsIndlYnBhY2s6Ly8vLi9zb3VyY2VzL3ZpZXdzL2Rhc2gvcHJvY2Vzc2VzLmpzIiwid2VicGFjazovLy8uL3NvdXJjZXMvdmlld3MvZGFzaC9ydW5uaW5nUG9ydHMuanMiLCJ3ZWJwYWNrOi8vLy4vc291cmNlcy92aWV3cy9tYWluLmpzIiwid2VicGFjazovLy8uL3NvdXJjZXMvdmlld3MvbXlqb2JzL2pvYnMuanMiLCJ3ZWJwYWNrOi8vLy4vc291cmNlcy9zZXJ2aWNlcy9teWpvYnMuanMiLCJ3ZWJwYWNrOi8vLy4vc291cmNlcy92aWV3cy9teWpvYnMvd29ya2Vycy5qcyIsIndlYnBhY2s6Ly8vLi9zb3VyY2VzL3ZpZXdzL3NvbHV0aW9ucy9jaGF0Zmxvdy5qcyIsIndlYnBhY2s6Ly8vLi9zb3VyY2VzL3ZpZXdzL3Rmd2lraXMvdGZncmlkc2RrLmpzIiwid2VicGFjazovLy8uL3NvdXJjZXMvdmlld3MvdGZ3aWtpcy90aHJlZWZvbGQuanMiLCJ3ZWJwYWNrOi8vLy4vc291cmNlcy92aWV3cy93aWtpcy92aWV3LmpzIiwid2VicGFjazovLy8uL3NvdXJjZXMvYXBwLmpzIiwid2VicGFjazovLy8uL3NvdXJjZXMvc3R5bGVzL2FwcC5jc3MiLCJ3ZWJwYWNrOi8vLy4vc291cmNlcy92aWV3cyBeXFwuXFwvLiokIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9hbnNpX3VwL2Fuc2lfdXAuanMiLCJ3ZWJwYWNrOi8vLy4vc291cmNlcy9zZXJ2aWNlcy9hbGVydHMuanMiLCJ3ZWJwYWNrOi8vLy4vc291cmNlcy9zZXJ2aWNlcy9kZXBsb3llZFNvbHV0aW9ucy5qcyIsIndlYnBhY2s6Ly8vLi9zb3VyY2VzL3NlcnZpY2VzL2xvZ3MuanMiLCJ3ZWJwYWNrOi8vLy4vc291cmNlcy9zZXJ2aWNlcy9hdXRoLmpzIiwid2VicGFjazovLy8uL3NvdXJjZXMvY29tbW9uL2RpYWxvZ3MuanMiLCJ3ZWJwYWNrOi8vLy4vc291cmNlcy9zZXJ2aWNlcy93aWtpLmpzIiwid2VicGFjazovLy8uL3NvdXJjZXMvbG9jYWxlcyBeXFwuXFwvLiokIl0sIm5hbWVzIjpbIk5hdmlnYXRpb25CbG9ja2VkIiwiSmV0QmFzZSIsIndlYml4Iiwid2ViaXhKZXQiLCJfZXZlbnRzIiwiX3N1YnMiLCJfZGF0YSIsImdldFJvb3QiLCJfcm9vdCIsImRlc3RydWN0b3IiLCJfZGV0YWNoRXZlbnRzIiwiX2Rlc3Ryb3lTdWJzIiwiX2NvbnRhaW5lciIsImFwcCIsIl9wYXJlbnQiLCJzZXRQYXJhbSIsImlkIiwidmFsdWUiLCJ1cmwiLCJfc2VnbWVudCIsInVwZGF0ZSIsInNob3ciLCJnZXRQYXJhbSIsInBhcmVudCIsInZpZXciLCJnZXRQYXJlbnRWaWV3IiwiZ2V0VXJsIiwic3VidXJsIiwiZ2V0VXJsU3RyaW5nIiwidG9TdHJpbmciLCIkJCIsInJvb3QiLCJxdWVyeVZpZXciLCJvYmoiLCJjb25maWciLCJsb2NhbElkIiwiJHNjb3BlIiwib24iLCJuYW1lIiwiY29kZSIsImF0dGFjaEV2ZW50IiwicHVzaCIsImNvbnRhaW5zIiwia2V5Iiwia2lkIiwiZ2V0U3ViVmlldyIsInN1YiIsImdldFN1YlZpZXdJbmZvIiwic3VidmlldyIsInBvcHVwIiwiZXZlbnRzIiwiaSIsImxlbmd0aCIsImRldGFjaEV2ZW50Iiwic3ViVmlldyIsIl9pbml0X3VybF9kYXRhIiwiY3VycmVudCIsImV4dGVuZCIsInBhcmFtcyIsIl9nZXREZWZhdWx0U3ViIiwiZGVmYXVsdCIsImJyYW5jaCIsImNoaWxkIiwiX3JvdXRlZF92aWV3IiwicGFyc2UiLCJzdWJzdHIiLCJwYXJ0cyIsInNwbGl0IiwiY2h1bmtzIiwidGVzdCIsInJlc3VsdCIsInBvcyIsImluZGV4T2YiLCJwYXJhbSIsImRjaHVuayIsImRlY29kZVVSSUNvbXBvbmVudCIsInBhZ2UiLCJpc05ldyIsInVybDJzdHIiLCJzdGFjayIsImNodW5rIiwib2JqMnN0ciIsImpvaW4iLCJzdHIiLCJlbmNvZGVVUklDb21wb25lbnQiLCJSb3V0ZSIsInJvdXRlIiwiaW5kZXgiLCJfbmV4dCIsInBhdGgiLCJuZXh0Iiwic2xpY2UiLCJzaGlmdCIsInJlZnJlc2giLCJfam9pbiIsImtpZHMiLCJvbGQiLCJjb25jYXQiLCJhcHBlbmQiLCJQcm9taXNlIiwicmVzIiwicmVqIiwicmVkaXJlY3QiLCJjb25maXJtIiwicmVzb2x2ZSIsImNhbGxFdmVudCIsImNhdGNoIiwiZXJyIiwidGhlbiIsInNpemUiLCJuIiwiSmV0VmlldyIsIl9jaGlsZHJlbiIsInVpIiwiY29udGFpbmVyIiwiamV0dmlldyIsImNyZWF0ZVZpZXciLCJyZW5kZXIiLCJ0YXJnZXQiLCJfcmVuZGVyRnJhbWVMb2NrIiwiX3Nob3ciLCJzZWdtZW50IiwiX3VybENoYW5nZSIsImxpbmtSb3V0ZXIiLCJnZXRSb3V0ZXIiLCJzZXQiLCJzaWxlbnQiLCJpbml0IiwiXyR2aWV3IiwiXyQiLCJyZWFkeSIsIl8kdXJsIiwibWVzc2FnZSIsInVybENoYW5nZSIsImRlc3Ryb3kiLCJfZGVzdHJveUtpZHMiLCJ1c2UiLCJwbHVnaW4iLCJ0YWdOYW1lIiwiX3JlbmRlciIsImRvY3VtZW50IiwiYm9keSIsInRvTm9kZSIsIl9yZW5kZXJfZmluYWwiLCJjZmciLCJzbG90IiwicmVqZWN0IiwicmVzcG9uc2UiLCJjb3B5Q29uZmlnIiwib2xkdWkiLCJhc1dpbiIsInNldFBvc2l0aW9uIiwiaXNWaXNpYmxlIiwiX2luaXQiLCJfaW5pdFVybCIsImUiLCJfaW5pdEVycm9yIiwid2FpdHMiLCJmcmFtZSIsIndhaXQiLCJhbGwiLCJsb2NrIiwiX3JlbmRlckZyYW1lIiwiX2NyZWF0ZVN1YlZpZXciLCJlcnJvciIsImNyZWF0ZUZyb21VUkwiLCJ1aXMiLCJKZXRWaWV3UmF3IiwiX3VpIiwiU3ViUm91dGVyIiwiY2IiLCJhIiwiZ2V0IiwiX29uY2UiLCJKZXRBcHBCYXNlIiwid2luZG93IiwidmVyc2lvbiIsInN0YXJ0IiwiX3NlcnZpY2VzIiwiRXZlbnRTeXN0ZW0iLCJfc3ViU2VnbWVudCIsImdldFNlcnZpY2UiLCJzZXRTZXJ2aWNlIiwiaGFuZGxlciIsInByb3RvdHlwZSIsIiRzdWJ2aWV3IiwiYWRkU3ViVmlldyIsIkFycmF5IiwibWV0aG9kIiwicG9pbnQiLCJEYXRhQ29sbGVjdGlvbiIsIlJlZ0V4cCIsIkRhdGUiLCJjb3B5IiwiJHJvdXRlciIsImNsaWNrSGFuZGxlciIsInNyY0VsZW1lbnQiLCJnZXRBdHRyaWJ1dGUiLCJ0cmlnZ2VyIiwiX2ZvclZpZXciLCJjYW5jZWxCdWJibGUiLCJwcmV2ZW50RGVmYXVsdCIsInBhcmVudE5vZGUiLCJsb2FkVmlldyIsInZpZXdzIiwiX2xvYWRFcnJvciIsIkVycm9yIiwiX2xvYWRWaWV3RHluYW1pYyIsIm1vZHVsZSIsIl9fZXNNb2R1bGUiLCJyb3V0ZXIiLCJyZXN0IiwiYXBwbHkiLCJkYXRhIiwiYWN0aW9uIiwiYmluZCIsImVyIiwiZGVidWciLCJjb25zb2xlIiwidGV4dCIsInJlcGxhY2UiLCJpbm5lckhUTUwiLCJ0eXBlIiwiZXhwaXJlIiwiZmlyc3RJbml0IiwiZXZlbnQiLCJfZmlyc3Rfc3RhcnQiLCJ0b3AiLCJiYXNlIiwic2V0VGltZW91dCIsImFuaW1hdGlvbiIsIm5vZGUiLCJodG1sIiwiYWRkQ3NzIiwicmVtb3ZlQ3NzIiwidXJsU3RyaW5nIiwidGVtcGxhdGUiLCJ1aWQiLCJIYXNoUm91dGVyIiwiX2RldGVjdFByZWZpeCIsIm9ucG9wc3RhdGUiLCJyb3V0ZXMiLCJjb21wYXJlIiwiaGlzdG9yeSIsInB1c2hTdGF0ZSIsInByZWZpeCIsInN1Zml4IiwiX2dldFJhdyIsInJvdXRlclByZWZpeCIsImxvY2F0aW9uIiwiaHJlZiIsImlzUGF0Y2hlZCIsInBhdGNoIiwidyIsIndpbiIsInByb21pc2UiLCJmcmVlemUiLCJzb21lIiwiJGZyZWV6ZSIsInJlc2l6ZSIsImJhc2VBZGQiLCJiYXNlbGF5b3V0IiwiYWRkVmlldyIsImJhc2VSZW1vdmUiLCJyZW1vdmVWaWV3IiwianZpZXciLCJzdWJzIiwiYXJndW1lbnRzIiwibGF5b3V0IiwicHJvdG9VSSIsIiRpbml0IiwiJGFwcCIsIiRyZWFkeSIsIm9yaWdpbiIsInByb3h5IiwiSmV0QXBwIiwicmVxdWlyZSIsIlN0b3JlUm91dGVyIiwic3RvcmFnZSIsInNlc3Npb24iLCJzdG9yZU5hbWUiLCJwdXQiLCJVcmxSb3V0ZXIiLCJwYXRobmFtZSIsInNlYXJjaCIsIkVtcHR5Um91dGVyIiwiXyRjb25maWciLCJVbmxvYWRHdWFyZCIsImhhcyIsInN0b3JlIiwiT2JqZWN0IiwiaGFzT3duUHJvcGVydHkiLCJjYWxsIiwiZm9yRWFjaCIsImNvbnRleHQiLCJ0cmltIiwid2FybiIsIngiLCJTdHJpbmciLCJkZWxpbWl0ZXIiLCJydXNzaWFuUGx1cmFsR3JvdXBzIiwiZW5kIiwicGx1cmFsVHlwZXMiLCJhcmFiaWMiLCJsYXN0VHdvIiwiYm9zbmlhbl9zZXJiaWFuIiwiY2hpbmVzZSIsImNyb2F0aWFuIiwiZnJlbmNoIiwiZ2VybWFuIiwicnVzc2lhbiIsImxpdGh1YW5pYW4iLCJjemVjaCIsInBvbGlzaCIsImljZWxhbmRpYyIsInNsb3ZlbmlhbiIsInBsdXJhbFR5cGVUb0xhbmd1YWdlcyIsImxhbmdUb1R5cGVNYXAiLCJtYXBwaW5nIiwicmV0IiwibGFuZ3MiLCJsYW5nIiwicGx1cmFsVHlwZU5hbWUiLCJsb2NhbGUiLCJsYW5nVG9QbHVyYWxUeXBlIiwiZW4iLCJwbHVyYWxUeXBlSW5kZXgiLCJjb3VudCIsImVzY2FwZSIsInRva2VuIiwiY29uc3RydWN0VG9rZW5SZWdleCIsIm9wdHMiLCJzdWZmaXgiLCJSYW5nZUVycm9yIiwiZG9sbGFyUmVnZXgiLCJkb2xsYXJCaWxsc1lhbGwiLCJkZWZhdWx0VG9rZW5SZWdleCIsInRyYW5zZm9ybVBocmFzZSIsInBocmFzZSIsInN1YnN0aXR1dGlvbnMiLCJ0b2tlblJlZ2V4IiwiVHlwZUVycm9yIiwiaW50ZXJwb2xhdGlvblJlZ2V4Iiwib3B0aW9ucyIsInNtYXJ0X2NvdW50IiwidGV4dHMiLCJleHByZXNzaW9uIiwiYXJndW1lbnQiLCJQb2x5Z2xvdCIsInBocmFzZXMiLCJjdXJyZW50TG9jYWxlIiwiYWxsb3dNaXNzaW5nIiwib25NaXNzaW5nS2V5IiwiaW50ZXJwb2xhdGlvbiIsIm5ld0xvY2FsZSIsIm1vcmVQaHJhc2VzIiwicHJlZml4ZWRLZXkiLCJ1bnNldCIsImNsZWFyIiwibmV3UGhyYXNlcyIsInQiLCJfIiwidHJhbnNmb3JtIiwid2ViaXhQb2x5Z2xvdCIsIkxvY2FsZSIsIl92aWV3Iiwic2V0TGFuZ0RhdGEiLCJwY29uZmlnIiwicG9seWdsb3QiLCJwb2x5Iiwic2VydmljZSIsImxvY05hbWUiLCJpMThuIiwic2V0TG9jYWxlIiwiZ2V0TGFuZyIsInNldExhbmciLCJ1cmxzIiwiTWVudSIsImdldFZhbHVlIiwic2V0VmFsdWUiLCJnZXRTZWxlY3RlZElkIiwic2VsZWN0IiwiZXhpc3RzIiwiYmFzZWljb25zIiwiZ29vZCIsInNhdmluZyIsImJhc2V0ZXh0IiwiU3RhdHVzIiwic3RhdHVzIiwiaXNlcnJvciIsImV4cGlyZURlbGF5IiwiaWNvbnMiLCJjb250ZW50IiwiYXJlYSIsInNldEhUTUwiLCJzdWNjZXNzIiwic2V0U3RhdHVzIiwiZmFpbCIsImdldFN0YXR1cyIsImhpZGVTdGF0dXMiLCJtb2RlIiwicmVzcG9uc2VUZXh0IiwidHJhY2siLCJkcCIsIl9pZCIsIl9vYmoiLCJyZW1vdGUiLCJhamF4IiwiX21vZGUiLCJfdXJsIiwiX3JlcXVlc3QiLCJfaGVhZGVycyIsIl9maWxlcyIsIlRoZW1lIiwidGhlbWUiLCJnZXRUaGVtZSIsInNldFRoZW1lIiwibGlua3MiLCJnZXRFbGVtZW50c0J5VGFnTmFtZSIsImxuYW1lIiwiZGlzYWJsZWQiLCJza2luIiwiY29weVBhcmFtcyIsIlVybFBhcmFtIiwib3MiLCJvZyIsInZhbCIsIlVzZXIiLCJsb2dpbiIsImxvZ291dCIsImFmdGVyTG9naW4iLCJhZnRlckxvZ291dCIsInBpbmciLCJtb2RlbCIsInVzZXIiLCJnZXRVc2VyIiwic2VydmVyIiwicGFzcyIsImNhbk5hdmlnYXRlIiwiXyRyb290IiwicHVibGljIiwic2V0SW50ZXJ2YWwiLCJwbHVnaW5zIiwiZXJyb3JzIiwiU1RBVFVTX0lOU1RBTExFRCIsIkV4dGVybmFsVmlldyIsInRhcmdldFVybCIsInJlcXVpcmVkUGFja2FnZXMiLCJzZWxmIiwiaWZyYW1lIiwib25BZnRlckxvYWQiLCJoaWRlUHJvZ3Jlc3MiLCJlbmFibGUiLCJyb3dzIiwiaGlkZGVuIiwiY29scyIsImF1dG9oZWlnaHQiLCJjc3MiLCJoZWlnaHQiLCJjbGljayIsImluc3RhbGxSZXF1aXJlZFBhY2thZ2VzIiwicHJvbWlzZXMiLCJ2YWx1ZXMiLCJwYWNrYWdlc1RvSW5zdGFsbCIsIm1hcCIsInBhY2thZ2VzIiwiYWRkIiwiaW5zdGFsbEJ1dHRvbiIsImRpc2FibGUiLCJyZWxvYWQiLCJzaG93SWZyYW1lIiwiZXh0ZXJuYWxJZnJhbWUiLCJzaG93UHJvZ3Jlc3MiLCJsb2FkIiwiUHJvZ3Jlc3NCYXIiLCJwYWNrYWdlTmFtZXMiLCJrZXlzIiwicmVxdWlyZWRQYWNrYWdlc0RpdiIsImluc3RhbGxQYWNrYWdlQ29udGFpbmVyIiwicGFja2FnZVN0YXRlcyIsImpzb24iLCJwYWNrYWdlTmFtZXNUb0luc3RhbGwiLCJoaWRlIiwibmFtZXMiLCJoZWFkZXJzIiwiU2VydmljZSIsImJhc2VVcmwiLCJqb2luVXJsIiwiYXJncyIsInRvTG93ZXJDYXNlIiwicG9zdCIsIlZhbHVlRXJyb3IiLCJnZXRDYWxsIiwicG9zdENhbGwiLCJFcnJvclZpZXciLCJzY3JvbGwiLCJoZWFkIiwibW9kYWwiLCJ3aWR0aCIsInBvc2l0aW9uIiwiZ2V0VG9wUGFyZW50VmlldyIsInNob3dFcnJvciIsImFuc2lVcCIsImFuc2lfdG9faHRtbCIsImdldEhlYWQiLCJNQVhfTVNHX0xFTiIsIkxFVkVMUyIsIlNUQVRFUyIsIlRZUEVTIiwiZGF0ZUZvcm1hdCIsIndlYml4RGF0ZUZvcm1hdHRlciIsImRhdGVUb1N0ciIsImRhdGVGb3JtYXR0ZXIiLCJwYXJzZUludCIsIkJBU0VfVVJMIiwiSGVhbHRoU2VydmljZSIsImdldERpc2tTcGFjZSIsImdldEhlYWx0aCIsImdldElkZW50aXR5IiwiZ2V0TmV0d29ya0luZm8iLCJnZXRKc3hWZXJzaW9uIiwiZ2V0UnVubmluZ1Byb2Nlc3NlcyIsImdldFJ1bm5pbmdQb3J0cyIsImhlYWx0aCIsIkFsZXJ0c1ZpZXciLCJyZXNpemVDb2x1bW4iLCJtdWx0aXNlbGVjdCIsImNvbHVtbnMiLCJoZWFkZXIiLCJzb3J0IiwiYXV0b3dpZHRoIiwiZm9ybWF0IiwiY3JlYXRlRmlsdGVyT3B0aW9ucyIsImZpbGxzcGFjZSIsImF1dG9Db25maWciLCJzY2hlbWUiLCJkZWxldGVJdGVtIiwib2JqZWN0cyIsIml0ZW1zIiwiaWRzIiwiaW5kZXhlcyIsIml0ZW0iLCJ0YWJsZSIsImdldEl0ZW0iLCJ0aXRsZSIsIm9rIiwiY2FuY2VsIiwiaWRlbnRpZmllcnMiLCJpZGVudGlmaWVyIiwiYWxlcnRzIiwiZGVsZXRlIiwicmVtb3ZlIiwidmlld0l0ZW0iLCJhbGVydFZpZXciLCJzaG93Rm9yIiwiQWxlcnRWaWV3IiwiY2xlYXJBbGwiLCJsaXN0IiwiYXR0YWNoVG8iLCJBbnNpVXAiLCJDYXBhY2l0eVZpZXciLCJhZG1pbiIsImdldF9leHBsb3JlciIsImV4cGxvcmVyIiwic3RhcnRzV2l0aCIsIkNpcmNsZXNWaWV3IiwiZ3JpZCIsIm9uQ29udGV4dCIsImVycm9yVmlldyIsIm1lbnUiLCJjaXJjbGVUYWJsZSIsImluZm8iLCJKU09OIiwidXNlcm5hbWUiLCJ0YWlnYSIsInVzZXJDaXJjbGVzIiwiY2lyY2xlcyIsIkNpcmNsZXN0b3JpZXNWaWV3Iiwic3Rvcmllc1RhYmxlIiwidXNlclN0b3JpZXMiLCJzdG9yaWVzIiwiQ2lyY2xlc1Rhc2tzVmlldyIsInRhc2tzVGFibGUiLCJ1c2VyVGFza3MiLCJ0YXNrcyIsIkNPREVfVVJMIiwiUkVRVUlSRURfUEFDS0FHRVMiLCJDb2Rlc2VydmVyVmlldyIsIlRvcFZpZXciLCJyZXNwb25zaXZlIiwiVU5LTk9XTl9TVEFUVVMiLCJEZXBsb3llZFNvbHV0aW9uc1ZpZXciLCJzb2x1dGlvbk5hbWUiLCJyZXN2SWQiLCJyZXNlcnZhdGlvbiIsInNvbHV0aW9uVHlwZSIsIm5leHRBY3Rpb24iLCJuZXh0X2FjdGlvbiIsInNob3dPdmVybGF5IiwiaGlkZU92ZXJsYXkiLCJoYW5kbGVSZXN1bHQiLCJjYWxsYmFjayIsInNvbHV0aW9uc1RhYmxlIiwic29sdXRpb25JdGVtIiwic29sdXRpb24iLCJGdW5jdGlvbiIsImRlbGV0ZVNvbHV0aW9uIiwiaXRlbUlkIiwic29sdXRpb25zIiwibG9hZFNvbHV0aW9ucyIsImZvcm1faW5mbyIsInJlc2VydmF0aW9uVmlldyIsIlJlc2VydmF0aW9uVmlldyIsImNoZWNrQWN0aW9uIiwic2VsZWN0ZWRJdGVtSWQiLCIkdmlldyIsImxvY2F0ZSIsInJvdyIsImFjdGlvbnMiLCJwcmV2ZW50RXZlbnQiLCJVUkwiLCJGYXJtbWFuYWdlbWVudFZpZXciLCJKdXB5dGVyVmlldyIsIkxvZ3NWaWV3IiwicGxhY2Vob2xkZXIiLCJvbkNoYW5nZSIsImFwcE5hbWUiLCJBcHBMb2dzVmlldyIsImFwcHNDb21ibyIsImxvZ3MiLCJsaXN0QXBwcyIsImRlZmluZSIsImFwcG5hbWUiLCJsb2dJZCIsImxvZ2lkIiwiYXBwTG9ncyIsIlBBQ0tBR0VfU1RBVEVTIiwiUGFja2FnZXNWaWV3IiwiaW5wdXRBbGlnbiIsInNvdXJjZV9uYW1lIiwic291cmNlIiwiYXV0aG9yIiwidGhyZWVib3QiLCJwYWNrYWdlVGFibGUiLCJwYWNrYWdlSXRlbSIsInBhY2thZ2UiLCJhZGRQYWNrYWdlIiwiZ2l0VXJsIiwidXBkYXRlSXRlbSIsImRlbGV0ZVBhY2thZ2UiLCJwYWNrYWdlTmFtZSIsInN0YXJ0UGFja2FnZSIsInN0b3BQYWNrYWdlIiwic3RvcCIsImVuYWJsZVBhY2thZ2UiLCJkaXNhYmxlUGFja2FnZSIsImxvYWRQYWNrYWdlcyIsIl9yZXF1aXJlZHBhY2thZ2VzIiwicGFjYWtnZUxvY2F0aW9uIiwiYWxlcnQiLCJwYWNrYWdlTWV0aG9kIiwiaW5jbHVkZXMiLCJTZXR0aW5nc1ZpZXciLCJjZWxscyIsIkdlbmVyYWxWaWV3IiwiQWRtaW5zVmlldyIsIldhbGxldE1hbmFnZXJWaWV3Iiwid2FsbGV0cyIsIldhbGxldEZvcm1WaWV3Iiwic2hvd0Zvcm0iLCJXYWxsZXRJbXBvcnRWaWV3Iiwid2FsbGV0c190YWJsZSIsIldhbGxldERldGFpbHNWaWV3IiwiZ2V0U2VsZWN0ZWRJdGVtIiwid2FsbGV0IiwibWFuYWdlV2FsbGV0IiwibG9nIiwiYWRkcmVzcyIsInNlY3JldCIsImJhbGFuY2VzIiwic2hvd0luZm8iLCJnZXRXYWxsZXRzIiwiV2lraXNWaWV3Iiwib25DbGljayIsImJ0bl92aWV3IiwiZXYiLCJlbGVtZW50c0NvbmZpZyIsImxhYmVsV2lkdGgiLCJlbGVtZW50cyIsImxhYmVsIiwicmVhZG9ubHkiLCJ0YWIiLCJtdWx0aXZpZXciLCJmb3JtIiwidGJWaWV3cyIsInRiVGFicyIsImxvZ0RhdGEiLCJhcHBfbmFtZSIsImxhdGVzdF9sb2dpZCIsImFkZFRyYWNlYmFjayIsInRiIiwidGJJZCIsInRocmVlYm90X25hbWUiLCJwcm9jZXNzX2lkIiwidGJUaXRsZSIsImZvcm1hdHRlZCIsImFkZE9wdGlvbiIsImNsZWFyVHJhY2VCYWNrcyIsInJlbW92ZU9wdGlvbiIsImFzc2lnbiIsImFsZXJ0X3R5cGUiLCJsZXZlbCIsInRpbWVfZmlyc3QiLCJ0aW1lX2xhc3QiLCJzZXRWYWx1ZXMiLCJ0cmFjZWJhY2tzIiwiQWRtaW5TZXJ2aWNlIiwic2V0X2V4cGxvcmVyIiwiZXhwbG9yZXJfdHlwZSIsIlRhaWdhU2VydmljZSIsIm91dHB1dF90eXBlIiwiUHJvY2Vzc2VzQ2hpbGRWaWV3IiwiTWF0aCIsImNlaWwiLCJuZXR3b3JrX25hbWUiLCJpcF9yYW5nZSIsImlwcmFuZ2UiLCJmYXJtZXJfdGlkIiwibm9kZV9pZCIsImZsaXN0IiwiZW50cnlwb2ludCIsImh1Yl91cmwiLCJpbnRlcmFjdGl2ZSIsIm1hc3Rlcl9pcHNfc3RyIiwibWFzdGVyX2lwcyIsInJlc2VydmF0aW9uX3ZpZXciLCJjdXN0b21lcl90aWQiLCJyZXN1bHRzIiwiZXhwaXJhdGlvbiIsImRhdGFfcmVzZXJ2YXRpb24iLCJleHBpcmF0aW9uX3Jlc2VydmF0aW9uIiwiY29udGFpbmVycyIsInZvbHVtZXMiLCJ6ZGJzIiwibmV0d29ya3MiLCJrdWJlcm5ldGVzIiwiZm9ybV9saXN0IiwiZm9ybV9rZXlzIiwiZm9ybV92YWx1ZXMiLCJmb3JtX2RpY3QiLCJwYWdlciIsImdyb3VwIiwiYXBwbG9ncyIsIm1hcmtTb3J0aW5nIiwiYWRkQWRtaW4iLCJkZWxldGVfYWRtaW4iLCJkZWxldGVBZG1pbiIsImlucHV0RGlhbG9nIiwiaW5wdXQiLCJ5Q291bnQiLCJkb0FjdGlvbiIsImV4cGxvcmVyTGlzdCIsImV4cGxvcmVyQWRkcmVzcyIsIm5ld1ZhbHVlIiwid2FsbGV0X25hbWUiLCJnZXRWYWx1ZXMiLCJjcmVhdGVXYWxsZXQiLCJXYWxsZXRTZXJ2aWNlIiwiaW1wb3J0V2FsbGV0Iiwic2hvd1NlY3JldCIsInNlY3JldF9idG4iLCJiYWxhbmNlIiwiYXNzZXRfY29kZSIsImFzc2V0X2lzc3VlciIsIlBhY2thZ2VzU2VydmljZSIsImdpdF91cmwiLCJEaXNrU3BhY2VWaWV3IiwiZGlza1NwYWNlIiwiZGlza0luZm8iLCJ1c2VkIiwiZnJlZSIsInRvdGFsIiwicGVyY2VudCIsImhlYWx0aEluZm9WaWV3IiwiaGVhbHRoSW5mbyIsImJjZGIiLCJ3aWtpcyIsImNvZGVzZXJ2ZXIiLCJqdXB5dGVyIiwiSlNYSW5mb1ZpZXciLCJpcCIsImlwNiIsImNvbG9yc0RhdGFzZXQiLCJjb2xvciIsIlByb2Nlc3Nlc1ZpZXciLCJwcm9jZXNzZXNJbmZvIiwicGllSW5uZXJUZXh0IiwiYWxpZ24iLCJpbnB1dFdpZHRoIiwiY2hpbGR2aWV3IiwicHJvY2Vzc2VzTGlzdCIsInJ1blByb2Nlc3NJbmZvIiwiY2hhcnRzRGF0YSIsInByb2Nlc3Nlc19saXN0IiwibWVtb3J5VXNhZ2UiLCJtZW1vcnlfdXNhZ2UiLCJ0b3RhbE1lbW9yeSIsInRvdGFsX21lbSIsInVzYWdlX3BlcmNlbnQiLCJ0ZW1wIiwicnNzIiwicnVubmluZ1BvcnRzVmlldyIsInBvcnRzIiwicG9ydHNUYWJsZSIsImljb24iLCJoaWRlTWVudSIsInRvb2x0aXAiLCJib3JkZXJsZXNzIiwic2lkZWJhckRhdGEiLCJzeW5jIiwiaGFzX2Zyb250ZW5kX2FyZ3MiLCJwIiwiZnJvbnRlbmRfYXJncyIsInNpZGViYXIiLCJ0b29sYmFyIiwicGFkZGluZyIsInNob3dNZW51IiwiYnV0dG9uSGlkZU1lbnUiLCJidXR0b25TaG93TWVudSIsIm15am9icyIsIndvcmtlcnMiLCJ0ZmdyaWRzZGsiLCJ0aHJlZWZvbGQiLCJ1YnVudHUiLCJuZXR3b3JrIiwibWluaW8iLCJ3ZWJnYXRld2F5IiwiazhzX2NsdXN0ZXIiLCJ1c2VyTWVudSIsImF1dGgiLCJ1c2VybmFtZUxhYmVsIiwiZ2V0Q3VycmVudFVzZXIiLCJkZXZtb2RlIiwiZ2V0VGV4dFNpemUiLCJlbWFpbCIsIkpvYnNWaWV3Iiwic3RyaW5naWZ5IiwibGlzdEpvYnMiLCJNeWpvYnNTZXJ2aWNlIiwibGlzdFdvcmtlcnMiLCJDaGF0Zmxvd1ZpZXciLCJiYXNlR2l0VXJsIiwicGFja2FnZVVybCIsImNoYXQiLCJURkdSSURTREtfVVJMIiwiVEZHcmlkU0RLV2lraSIsIlRIUkVFRk9MRF9VUkwiLCJUaHJlZWZvbGRXaWtpIiwiV2lraUV4dGVybmFsVmlldyIsIkludmVudG9yeUFwcCIsIkFQUE5BTUUiLCJWRVJTSU9OIiwiUFJPRFVDVElPTiIsImZhY3RvcnkiLCJleHBvcnRzIiwibm9kZU5hbWUiLCJleHAiLCJfX21ha2VUZW1wbGF0ZU9iamVjdCIsImNvb2tlZCIsInJhdyIsImRlZmluZVByb3BlcnR5IiwiUGFja2V0S2luZCIsInNldHVwX3BhbGV0dGVzIiwiX3VzZV9jbGFzc2VzIiwiX2VzY2FwZV9mb3JfaHRtbCIsImJvbGQiLCJmZyIsImJnIiwiX2J1ZmZlciIsIl91cmxfd2hpdGVsaXN0IiwiYXJnIiwiZW51bWVyYWJsZSIsImNvbmZpZ3VyYWJsZSIsIl90aGlzIiwiYW5zaV9jb2xvcnMiLCJyZ2IiLCJjbGFzc19uYW1lIiwicGFsZXR0ZV8yNTYiLCJwYWxldHRlIiwicmVjIiwibGV2ZWxzIiwiciIsImciLCJiIiwiY29sIiwiZ3JleV9sZXZlbCIsImdyeSIsImVzY2FwZV90eHRfZm9yX2h0bWwiLCJ0eHQiLCJhcHBlbmRfYnVmZmVyIiwiZ2V0X25leHRfcGFja2V0IiwicGt0Iiwia2luZCIsIkVPUyIsImxlbiIsIlRleHQiLCJJbmNvbXBsZXRlIiwibmV4dF9jaGFyIiwiY2hhckF0IiwiRVNDIiwiX2NzaV9yZWdleCIsInJneCIsIm1hdGNoIiwiVW5rbm93biIsIlNHUiIsInJwb3MiLCJfb3NjX3N0Iiwicmd4RyIsImxhc3RJbmRleCIsIm1hdGNoXzEiLCJleGVjIiwibWF0Y2hfMiIsIl9vc2NfcmVnZXgiLCJPU0NVUkwiLCJibG9ja3MiLCJwYWNrZXQiLCJ0cmFuc2Zvcm1fdG9faHRtbCIsIndpdGhfc3RhdGUiLCJwcm9jZXNzX2Fuc2kiLCJwcm9jZXNzX2h5cGVybGluayIsInNncl9jbWRzIiwic2dyX2NtZF9zdHIiLCJudW0iLCJpc05hTiIsImlzX2ZvcmVncm91bmQiLCJtb2RlX2NtZCIsInBhbGV0dGVfaW5kZXgiLCJjIiwiZnJhZ21lbnQiLCJzdHlsZXMiLCJjbGFzc2VzIiwiY2xhc3Nfc3RyaW5nIiwic3R5bGVfc3RyaW5nIiwidG1wbE9iaiIsInN1YnN0IiwiX2kiLCJyZWdleFRleHQiLCJ3c3JneCIsInR4dDIiLCJBbGVydHNTZXJ2aWNlIiwiU29sdXRpb25zU2VydmljZSIsInNvbHV0aW9uX3R5cGUiLCJzb2x1dGlvbl9uYW1lIiwiTG9nc1NlcnZpY2UiLCJpZF9mcm9tIiwiQXV0aFNlcnZpY2UiLCJuZXh0VXJsIiwiaGFzaCIsImJ1dHRvbkxhYmVsIiwiaGFuZGxlSW5wdXQiLCJnZXRGb3JtVmlldyIsInRleHRJbnB1dCIsIlVJTWFuYWdlciIsInNldEZvY3VzIiwiV2lraXNTZXJ2aWNlIl0sIm1hcHBpbmdzIjoiOztRQUFBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBOzs7UUFHQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQSxLQUFLO1FBQ0w7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwyQkFBMkIsMEJBQTBCLEVBQUU7UUFDdkQsaUNBQWlDLGVBQWU7UUFDaEQ7UUFDQTtRQUNBOztRQUVBO1FBQ0Esc0RBQXNELCtEQUErRDs7UUFFckg7UUFDQTs7UUFFQTtRQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0lDN0RNQSxpQjs7OztJQUVBQyxPO0FBQ0YscUJBQVlDLEtBQVosRUFBbUI7QUFBQTs7QUFDZixhQUFLQyxRQUFMLEdBQWdCLElBQWhCO0FBQ0EsYUFBS0QsS0FBTCxHQUFhQSxLQUFiO0FBQ0EsYUFBS0UsT0FBTCxHQUFlLEVBQWY7QUFDQSxhQUFLQyxLQUFMLEdBQWEsRUFBYjtBQUNBLGFBQUtDLEtBQUwsR0FBYSxFQUFiO0FBQ0g7O3NCQUNEQyxPLHNCQUFVO0FBQ04sZUFBTyxLQUFLQyxLQUFaO0FBQ0gsSzs7c0JBQ0RDLFUseUJBQWE7QUFDVCxhQUFLQyxhQUFMO0FBQ0EsYUFBS0MsWUFBTDtBQUNBLGFBQUtQLE9BQUwsR0FBZSxLQUFLUSxVQUFMLEdBQWtCLEtBQUtDLEdBQUwsR0FBVyxLQUFLQyxPQUFMLEdBQWUsS0FBS04sS0FBTCxHQUFhLElB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QUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHVCIiwiZmlsZSI6ImFwcC5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwge1xuIFx0XHRcdFx0Y29uZmlndXJhYmxlOiBmYWxzZSxcbiBcdFx0XHRcdGVudW1lcmFibGU6IHRydWUsXG4gXHRcdFx0XHRnZXQ6IGdldHRlclxuIFx0XHRcdH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIi9jb2RlYmFzZS9cIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSA1Mik7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gd2VicGFjay9ib290c3RyYXAgZGE1M2QzZmY0ZjFkMTc1YTc3NDQiLCJjbGFzcyBOYXZpZ2F0aW9uQmxvY2tlZCB7IH1cblxuY2xhc3MgSmV0QmFzZSB7XHJcbiAgICBjb25zdHJ1Y3Rvcih3ZWJpeCkge1xyXG4gICAgICAgIHRoaXMud2ViaXhKZXQgPSB0cnVlO1xyXG4gICAgICAgIHRoaXMud2ViaXggPSB3ZWJpeDtcclxuICAgICAgICB0aGlzLl9ldmVudHMgPSBbXTtcclxuICAgICAgICB0aGlzLl9zdWJzID0ge307XHJcbiAgICAgICAgdGhpcy5fZGF0YSA9IHt9O1xyXG4gICAgfVxyXG4gICAgZ2V0Um9vdCgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fcm9vdDtcclxuICAgIH1cclxuICAgIGRlc3RydWN0b3IoKSB7XHJcbiAgICAgICAgdGhpcy5fZGV0YWNoRXZlbnRzKCk7XHJcbiAgICAgICAgdGhpcy5fZGVzdHJveVN1YnMoKTtcclxuICAgICAgICB0aGlzLl9ldmVudHMgPSB0aGlzLl9jb250YWluZXIgPSB0aGlzLmFwcCA9IHRoaXMuX3BhcmVudCA9IHRoaXMuX3Jvb3QgPSBudWxsO1xyXG4gICAgfVxyXG4gICAgc2V0UGFyYW0oaWQsIHZhbHVlLCB1cmwpIHtcclxuICAgICAgICBpZiAodGhpcy5fZGF0YVtpZF0gIT09IHZhbHVlKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2RhdGFbaWRdID0gdmFsdWU7XHJcbiAgICAgICAgICAgIHRoaXMuX3NlZ21lbnQudXBkYXRlKGlkLCB2YWx1ZSwgMCk7XHJcbiAgICAgICAgICAgIGlmICh1cmwpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLnNob3cobnVsbCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBnZXRQYXJhbShpZCwgcGFyZW50KSB7XHJcbiAgICAgICAgY29uc3QgdmFsdWUgPSB0aGlzLl9kYXRhW2lkXTtcclxuICAgICAgICBpZiAodHlwZW9mIHZhbHVlICE9PSBcInVuZGVmaW5lZFwiIHx8ICFwYXJlbnQpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHZhbHVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjb25zdCB2aWV3ID0gdGhpcy5nZXRQYXJlbnRWaWV3KCk7XHJcbiAgICAgICAgaWYgKHZpZXcpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHZpZXcuZ2V0UGFyYW0oaWQsIHBhcmVudCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgZ2V0VXJsKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9zZWdtZW50LnN1YnVybCgpO1xyXG4gICAgfVxyXG4gICAgZ2V0VXJsU3RyaW5nKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9zZWdtZW50LnRvU3RyaW5nKCk7XHJcbiAgICB9XHJcbiAgICBnZXRQYXJlbnRWaWV3KCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9wYXJlbnQ7XHJcbiAgICB9XHJcbiAgICAkJChpZCkge1xyXG4gICAgICAgIGlmICh0eXBlb2YgaWQgPT09IFwic3RyaW5nXCIpIHtcclxuICAgICAgICAgICAgY29uc3Qgcm9vdCA9IHRoaXMuZ2V0Um9vdCgpO1xyXG4gICAgICAgICAgICByZXR1cm4gcm9vdC5xdWVyeVZpZXcoKG9iaiA9PiAob2JqLmNvbmZpZy5pZCA9PT0gaWQgfHwgb2JqLmNvbmZpZy5sb2NhbElkID09PSBpZCkgJiZcclxuICAgICAgICAgICAgICAgIChvYmouJHNjb3BlID09PSByb290LiRzY29wZSkpLCBcInNlbGZcIik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICByZXR1cm4gaWQ7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgb24ob2JqLCBuYW1lLCBjb2RlKSB7XHJcbiAgICAgICAgY29uc3QgaWQgPSBvYmouYXR0YWNoRXZlbnQobmFtZSwgY29kZSk7XHJcbiAgICAgICAgdGhpcy5fZXZlbnRzLnB1c2goeyBvYmosIGlkIH0pO1xyXG4gICAgICAgIHJldHVybiBpZDtcclxuICAgIH1cclxuICAgIGNvbnRhaW5zKHZpZXcpIHtcclxuICAgICAgICBmb3IgKGNvbnN0IGtleSBpbiB0aGlzLl9zdWJzKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGtpZCA9IHRoaXMuX3N1YnNba2V5XS52aWV3O1xyXG4gICAgICAgICAgICBpZiAoa2lkID09PSB2aWV3IHx8IGtpZC5jb250YWlucyh2aWV3KSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG4gICAgZ2V0U3ViVmlldyhuYW1lKSB7XHJcbiAgICAgICAgY29uc3Qgc3ViID0gdGhpcy5nZXRTdWJWaWV3SW5mbyhuYW1lKTtcclxuICAgICAgICBpZiAoc3ViKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBzdWIuc3Vidmlldy52aWV3O1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGdldFN1YlZpZXdJbmZvKG5hbWUpIHtcclxuICAgICAgICBjb25zdCBzdWIgPSB0aGlzLl9zdWJzW25hbWUgfHwgXCJkZWZhdWx0XCJdO1xyXG4gICAgICAgIGlmIChzdWIpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHsgc3Vidmlldzogc3ViLCBwYXJlbnQ6IHRoaXMgfTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKG5hbWUgPT09IFwiX3RvcFwiKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX3N1YnNbbmFtZV0gPSB7IHVybDogXCJcIiwgaWQ6IG51bGwsIHBvcHVwOiB0cnVlIH07XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmdldFN1YlZpZXdJbmZvKG5hbWUpO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvLyB3aGVuIGNhbGxlZCBmcm9tIGEgY2hpbGQgdmlldywgc2VhcmNoZXMgZm9yIG5lYXJlc3QgcGFyZW50IHdpdGggc3Vidmlld1xyXG4gICAgICAgIGlmICh0aGlzLl9wYXJlbnQpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3BhcmVudC5nZXRTdWJWaWV3SW5mbyhuYW1lKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICB9XHJcbiAgICBfZGV0YWNoRXZlbnRzKCkge1xyXG4gICAgICAgIGNvbnN0IGV2ZW50cyA9IHRoaXMuX2V2ZW50cztcclxuICAgICAgICBmb3IgKGxldCBpID0gZXZlbnRzLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSB7XHJcbiAgICAgICAgICAgIGV2ZW50c1tpXS5vYmouZGV0YWNoRXZlbnQoZXZlbnRzW2ldLmlkKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBfZGVzdHJveVN1YnMoKSB7XHJcbiAgICAgICAgLy8gZGVzdHJveSBzdWIgdmlld3NcclxuICAgICAgICBmb3IgKGNvbnN0IGtleSBpbiB0aGlzLl9zdWJzKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHN1YlZpZXcgPSB0aGlzLl9zdWJzW2tleV0udmlldztcclxuICAgICAgICAgICAgLy8gaXQgcG9zc2libGUgdGhhdCBzdWJ2aWV3IHdhcyBub3QgbG9hZGVkIHdpdGggYW55IGNvbnRlbnQgeWV0XHJcbiAgICAgICAgICAgIC8vIHNvIGNoZWNrIG9uIG51bGxcclxuICAgICAgICAgICAgaWYgKHN1YlZpZXcpIHtcclxuICAgICAgICAgICAgICAgIHN1YlZpZXcuZGVzdHJ1Y3RvcigpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIHJlc2V0IHRvIHByZXZlbnQgbWVtb3J5IGxlYWtzXHJcbiAgICAgICAgdGhpcy5fc3VicyA9IHt9O1xyXG4gICAgfVxyXG4gICAgX2luaXRfdXJsX2RhdGEoKSB7XHJcbiAgICAgICAgY29uc3QgdXJsID0gdGhpcy5fc2VnbWVudC5jdXJyZW50KCk7XHJcbiAgICAgICAgdGhpcy5fZGF0YSA9IHt9O1xyXG4gICAgICAgIHRoaXMud2ViaXguZXh0ZW5kKHRoaXMuX2RhdGEsIHVybC5wYXJhbXMsIHRydWUpO1xyXG4gICAgfVxyXG4gICAgX2dldERlZmF1bHRTdWIoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuX3N1YnMuZGVmYXVsdCkge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fc3Vicy5kZWZhdWx0O1xyXG4gICAgICAgIH1cclxuICAgICAgICBmb3IgKGNvbnN0IGtleSBpbiB0aGlzLl9zdWJzKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHN1YiA9IHRoaXMuX3N1YnNba2V5XTtcclxuICAgICAgICAgICAgaWYgKCFzdWIuYnJhbmNoICYmIHN1Yi52aWV3ICYmIGtleSAhPT0gXCJfdG9wXCIpIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGNoaWxkID0gc3ViLnZpZXcuX2dldERlZmF1bHRTdWIoKTtcclxuICAgICAgICAgICAgICAgIGlmIChjaGlsZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBjaGlsZDtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIF9yb3V0ZWRfdmlldygpIHtcclxuICAgICAgICBjb25zdCBwYXJlbnQgPSB0aGlzLmdldFBhcmVudFZpZXcoKTtcclxuICAgICAgICBpZiAoIXBhcmVudCkge1xyXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgY29uc3Qgc3ViID0gcGFyZW50Ll9nZXREZWZhdWx0U3ViKCk7XHJcbiAgICAgICAgaWYgKCFzdWIgJiYgc3ViICE9PSB0aGlzKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHBhcmVudC5fcm91dGVkX3ZpZXcoKTtcclxuICAgIH1cclxufVxuXG5mdW5jdGlvbiBwYXJzZSh1cmwpIHtcclxuICAgIC8vIHJlbW92ZSBzdGFydGluZyAvXHJcbiAgICBpZiAodXJsWzBdID09PSBcIi9cIikge1xyXG4gICAgICAgIHVybCA9IHVybC5zdWJzdHIoMSk7XHJcbiAgICB9XHJcbiAgICAvLyBzcGxpdCB1cmwgYnkgXCIvXCJcclxuICAgIGNvbnN0IHBhcnRzID0gdXJsLnNwbGl0KFwiL1wiKTtcclxuICAgIGNvbnN0IGNodW5rcyA9IFtdO1xyXG4gICAgLy8gZm9yIGVhY2ggcGFnZSBpbiB1cmxcclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcGFydHMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICBjb25zdCB0ZXN0ID0gcGFydHNbaV07XHJcbiAgICAgICAgY29uc3QgcmVzdWx0ID0ge307XHJcbiAgICAgICAgLy8gZGV0ZWN0IHBhcmFtc1xyXG4gICAgICAgIC8vIHN1cHBvcnQgb2xkIFx0XHRcdHNvbWU6YT1iOmM9ZFxyXG4gICAgICAgIC8vIGFuZCBuZXcgbm90YXRpb25cdFx0c29tZT9hPWImYz1kXHJcbiAgICAgICAgbGV0IHBvcyA9IHRlc3QuaW5kZXhPZihcIjpcIik7XHJcbiAgICAgICAgaWYgKHBvcyA9PT0gLTEpIHtcclxuICAgICAgICAgICAgcG9zID0gdGVzdC5pbmRleE9mKFwiP1wiKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHBvcyAhPT0gLTEpIHtcclxuICAgICAgICAgICAgY29uc3QgcGFyYW1zID0gdGVzdC5zdWJzdHIocG9zICsgMSkuc3BsaXQoL1tcXDpcXD9cXCZdL2cpO1xyXG4gICAgICAgICAgICAvLyBjcmVhdGUgaGFzaCBvZiBuYW1lZCBwYXJhbXNcclxuICAgICAgICAgICAgZm9yIChjb25zdCBwYXJhbSBvZiBwYXJhbXMpIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGRjaHVuayA9IHBhcmFtLnNwbGl0KFwiPVwiKTtcclxuICAgICAgICAgICAgICAgIHJlc3VsdFtkY2h1bmtbMF1dID0gZGVjb2RlVVJJQ29tcG9uZW50KGRjaHVua1sxXSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gc3RvcmUgcGFyc2VkIHZhbHVlc1xyXG4gICAgICAgIGNodW5rc1tpXSA9IHtcclxuICAgICAgICAgICAgcGFnZTogKHBvcyA+IC0xID8gdGVzdC5zdWJzdHIoMCwgcG9zKSA6IHRlc3QpLFxyXG4gICAgICAgICAgICBwYXJhbXM6IHJlc3VsdCxcclxuICAgICAgICAgICAgaXNOZXc6IHRydWVcclxuICAgICAgICB9O1xyXG4gICAgfVxyXG4gICAgLy8gcmV0dXJuIGFycmF5IG9mIHBhZ2Ugb2JqZWN0c1xyXG4gICAgcmV0dXJuIGNodW5rcztcclxufVxyXG5mdW5jdGlvbiB1cmwyc3RyKHN0YWNrKSB7XHJcbiAgICBjb25zdCB1cmwgPSBbXTtcclxuICAgIGZvciAoY29uc3QgY2h1bmsgb2Ygc3RhY2spIHtcclxuICAgICAgICB1cmwucHVzaChcIi9cIiArIGNodW5rLnBhZ2UpO1xyXG4gICAgICAgIGNvbnN0IHBhcmFtcyA9IG9iajJzdHIoY2h1bmsucGFyYW1zKTtcclxuICAgICAgICBpZiAocGFyYW1zKSB7XHJcbiAgICAgICAgICAgIHVybC5wdXNoKFwiP1wiICsgcGFyYW1zKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gdXJsLmpvaW4oXCJcIik7XHJcbn1cclxuZnVuY3Rpb24gb2JqMnN0cihvYmopIHtcclxuICAgIGNvbnN0IHN0ciA9IFtdO1xyXG4gICAgZm9yIChjb25zdCBrZXkgaW4gb2JqKSB7XHJcbiAgICAgICAgaWYgKHN0ci5sZW5ndGgpIHtcclxuICAgICAgICAgICAgc3RyLnB1c2goXCImXCIpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBzdHIucHVzaChrZXkgKyBcIj1cIiArIGVuY29kZVVSSUNvbXBvbmVudChvYmpba2V5XSkpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHN0ci5qb2luKFwiXCIpO1xyXG59XG5cbmNsYXNzIFJvdXRlIHtcclxuICAgIGNvbnN0cnVjdG9yKHJvdXRlLCBpbmRleCkge1xyXG4gICAgICAgIHRoaXMuX25leHQgPSAxO1xyXG4gICAgICAgIGlmICh0eXBlb2Ygcm91dGUgPT09IFwic3RyaW5nXCIpIHtcclxuICAgICAgICAgICAgdGhpcy5yb3V0ZSA9IHtcclxuICAgICAgICAgICAgICAgIHVybDogcGFyc2Uocm91dGUpLFxyXG4gICAgICAgICAgICAgICAgcGF0aDogcm91dGVcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMucm91dGUgPSByb3V0ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5pbmRleCA9IGluZGV4O1xyXG4gICAgfVxyXG4gICAgY3VycmVudCgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5yb3V0ZS51cmxbdGhpcy5pbmRleF07XHJcbiAgICB9XHJcbiAgICBuZXh0KCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnJvdXRlLnVybFt0aGlzLmluZGV4ICsgdGhpcy5fbmV4dF07XHJcbiAgICB9XHJcbiAgICBzdWJ1cmwoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMucm91dGUudXJsLnNsaWNlKHRoaXMuaW5kZXgpO1xyXG4gICAgfVxyXG4gICAgc2hpZnQoKSB7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBSb3V0ZSh0aGlzLnJvdXRlLCB0aGlzLmluZGV4ICsgdGhpcy5fbmV4dCk7XHJcbiAgICB9XHJcbiAgICByZWZyZXNoKCkge1xyXG4gICAgICAgIGNvbnN0IHVybCA9IHRoaXMucm91dGUudXJsO1xyXG4gICAgICAgIGZvciAobGV0IGkgPSB0aGlzLmluZGV4ICsgMTsgaSA8IHVybC5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICB1cmxbaV0uaXNOZXcgPSB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHRvU3RyaW5nKCkge1xyXG4gICAgICAgIGNvbnN0IHN0ciA9IHVybDJzdHIodGhpcy5zdWJ1cmwoKSk7XHJcbiAgICAgICAgcmV0dXJuIHN0ciA/IHN0ci5zdWJzdHIoMSkgOiBcIlwiO1xyXG4gICAgfVxyXG4gICAgX2pvaW4ocGF0aCwga2lkcykge1xyXG4gICAgICAgIGxldCB1cmwgPSB0aGlzLnJvdXRlLnVybDtcclxuICAgICAgICBpZiAocGF0aCA9PT0gbnVsbCkgeyAvLyBjaGFuZ2Ugb2YgcGFyYW1ldGVycywgcm91dGUgZWxlbWVudHMgYXJlIG5vdCBhZmZlY3RlZFxyXG4gICAgICAgICAgICByZXR1cm4gdXJsO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjb25zdCBvbGQgPSB0aGlzLnJvdXRlLnVybDtcclxuICAgICAgICB1cmwgPSBvbGQuc2xpY2UoMCwgdGhpcy5pbmRleCArIChraWRzID8gdGhpcy5fbmV4dCA6IDApKTtcclxuICAgICAgICBpZiAocGF0aCkge1xyXG4gICAgICAgICAgICB1cmwgPSB1cmwuY29uY2F0KHBhcnNlKHBhdGgpKTtcclxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB1cmwubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgIGlmIChvbGRbaV0pIHtcclxuICAgICAgICAgICAgICAgICAgICB1cmxbaV0udmlldyA9IG9sZFtpXS52aWV3O1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYgKG9sZFtpXSAmJiB1cmxbaV0ucGFnZSA9PT0gb2xkW2ldLnBhZ2UpIHtcclxuICAgICAgICAgICAgICAgICAgICB1cmxbaV0uaXNOZXcgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdXJsO1xyXG4gICAgfVxyXG4gICAgYXBwZW5kKHBhdGgpIHtcclxuICAgICAgICBjb25zdCB1cmwgPSB0aGlzLl9qb2luKHBhdGgsIHRydWUpO1xyXG4gICAgICAgIHRoaXMucm91dGUucGF0aCA9IHVybDJzdHIodXJsKTtcclxuICAgICAgICB0aGlzLnJvdXRlLnVybCA9IHVybDtcclxuICAgICAgICByZXR1cm4gdGhpcy5yb3V0ZS5wYXRoO1xyXG4gICAgfVxyXG4gICAgc2hvdyhwYXRoLCB2aWV3LCBraWRzKSB7XHJcbiAgICAgICAgY29uc3QgdXJsID0gdGhpcy5fam9pbihwYXRoLCBraWRzKTtcclxuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlcywgcmVqKSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnN0IHJlZGlyZWN0ID0gdXJsMnN0cih1cmwpO1xyXG4gICAgICAgICAgICBjb25zdCBvYmogPSB7XHJcbiAgICAgICAgICAgICAgICB1cmwsXHJcbiAgICAgICAgICAgICAgICByZWRpcmVjdCxcclxuICAgICAgICAgICAgICAgIGNvbmZpcm06IFByb21pc2UucmVzb2x2ZSgpXHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIGNvbnN0IGFwcCA9IHZpZXcgPyB2aWV3LmFwcCA6IG51bGw7XHJcbiAgICAgICAgICAgIC8vIHdoZW4gY3JlYXRpbmcgYSBuZXcgcm91dGUsIGl0IHBvc3NpYmxlIHRoYXQgaXQgd2lsbCBub3QgaGF2ZSBhbnkgY29udGVudFxyXG4gICAgICAgICAgICAvLyBndWFyZCBpcyBub3QgbmVjZXNzYXJ5IGluIHN1Y2ggY2FzZVxyXG4gICAgICAgICAgICBpZiAoYXBwKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCByZXN1bHQgPSBhcHAuY2FsbEV2ZW50KFwiYXBwOmd1YXJkXCIsIFtvYmoucmVkaXJlY3QsIHZpZXcsIG9ial0pO1xyXG4gICAgICAgICAgICAgICAgaWYgKCFyZXN1bHQpIHtcclxuICAgICAgICAgICAgICAgICAgICByZWoobmV3IE5hdmlnYXRpb25CbG9ja2VkKCkpO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBvYmouY29uZmlybS5jYXRjaChlcnIgPT4gcmVqKGVycikpLnRoZW4oKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKG9iai5yZWRpcmVjdCA9PT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJlaihuZXcgTmF2aWdhdGlvbkJsb2NrZWQoKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYgKG9iai5yZWRpcmVjdCAhPT0gcmVkaXJlY3QpIHtcclxuICAgICAgICAgICAgICAgICAgICBhcHAuc2hvdyhvYmoucmVkaXJlY3QpO1xyXG4gICAgICAgICAgICAgICAgICAgIHJlaihuZXcgTmF2aWdhdGlvbkJsb2NrZWQoKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgdGhpcy5yb3V0ZS5wYXRoID0gcmVkaXJlY3Q7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnJvdXRlLnVybCA9IHVybDtcclxuICAgICAgICAgICAgICAgIHJlcygpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuICAgIHNpemUobikge1xyXG4gICAgICAgIHRoaXMuX25leHQgPSBuO1xyXG4gICAgfVxyXG4gICAgc3BsaXQoKSB7XHJcbiAgICAgICAgY29uc3Qgcm91dGUgPSB7XHJcbiAgICAgICAgICAgIHVybDogdGhpcy5yb3V0ZS51cmwuc2xpY2UodGhpcy5pbmRleCArIDEpLFxyXG4gICAgICAgICAgICBwYXRoOiBcIlwiXHJcbiAgICAgICAgfTtcclxuICAgICAgICBpZiAocm91dGUudXJsLmxlbmd0aCkge1xyXG4gICAgICAgICAgICByb3V0ZS5wYXRoID0gdXJsMnN0cihyb3V0ZS51cmwpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gbmV3IFJvdXRlKHJvdXRlLCAwKTtcclxuICAgIH1cclxuICAgIHVwZGF0ZShuYW1lLCB2YWx1ZSwgaW5kZXgpIHtcclxuICAgICAgICBjb25zdCBjaHVuayA9IHRoaXMucm91dGUudXJsW3RoaXMuaW5kZXggKyAoaW5kZXggfHwgMCldO1xyXG4gICAgICAgIGlmICghY2h1bmspIHtcclxuICAgICAgICAgICAgdGhpcy5yb3V0ZS51cmwucHVzaCh7IHBhZ2U6IFwiXCIsIHBhcmFtczoge30gfSk7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnVwZGF0ZShuYW1lLCB2YWx1ZSwgaW5kZXgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAobmFtZSA9PT0gXCJcIikge1xyXG4gICAgICAgICAgICBjaHVuay5wYWdlID0gdmFsdWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICBjaHVuay5wYXJhbXNbbmFtZV0gPSB2YWx1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5yb3V0ZS5wYXRoID0gdXJsMnN0cih0aGlzLnJvdXRlLnVybCk7XHJcbiAgICB9XHJcbn1cblxuY2xhc3MgSmV0VmlldyBleHRlbmRzIEpldEJhc2Uge1xyXG4gICAgY29uc3RydWN0b3IoYXBwLCBjb25maWcpIHtcclxuICAgICAgICBzdXBlcihhcHAud2ViaXgpO1xyXG4gICAgICAgIHRoaXMuYXBwID0gYXBwO1xyXG4gICAgICAgIC8vdGhpcy4kY29uZmlnID0gY29uZmlnO1xyXG4gICAgICAgIHRoaXMuX2NoaWxkcmVuID0gW107XHJcbiAgICB9XHJcbiAgICB1aSh1aSwgY29uZmlnKSB7XHJcbiAgICAgICAgY29uZmlnID0gY29uZmlnIHx8IHt9O1xyXG4gICAgICAgIGNvbnN0IGNvbnRhaW5lciA9IGNvbmZpZy5jb250YWluZXIgfHwgdWkuY29udGFpbmVyO1xyXG4gICAgICAgIGNvbnN0IGpldHZpZXcgPSB0aGlzLmFwcC5jcmVhdGVWaWV3KHVpKTtcclxuICAgICAgICB0aGlzLl9jaGlsZHJlbi5wdXNoKGpldHZpZXcpO1xyXG4gICAgICAgIGpldHZpZXcucmVuZGVyKGNvbnRhaW5lciwgdGhpcy5fc2VnbWVudCwgdGhpcyk7XHJcbiAgICAgICAgaWYgKHR5cGVvZiB1aSAhPT0gXCJvYmplY3RcIiB8fCAodWkgaW5zdGFuY2VvZiBKZXRCYXNlKSkge1xyXG4gICAgICAgICAgICAvLyByYXcgd2ViaXggVUlcclxuICAgICAgICAgICAgcmV0dXJuIGpldHZpZXc7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICByZXR1cm4gamV0dmlldy5nZXRSb290KCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgc2hvdyhwYXRoLCBjb25maWcpIHtcclxuICAgICAgICBjb25maWcgPSBjb25maWcgfHwge307XHJcbiAgICAgICAgLy8gY29udmVydCBwYXJhbWV0ZXJzIG9iamVjdCB0byB1cmxcclxuICAgICAgICBpZiAodHlwZW9mIHBhdGggPT09IFwib2JqZWN0XCIpIHtcclxuICAgICAgICAgICAgZm9yIChjb25zdCBrZXkgaW4gcGF0aCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zZXRQYXJhbShrZXksIHBhdGhba2V5XSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcGF0aCA9IG51bGw7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAvLyBkZWxpZ2F0ZSB0byBhcHAgaW4gY2FzZSBvZiByb290IHByZWZpeFxyXG4gICAgICAgICAgICBpZiAocGF0aC5zdWJzdHIoMCwgMSkgPT09IFwiL1wiKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5hcHAuc2hvdyhwYXRoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAvLyBsb2NhbCBwYXRoLCBkbyBub3RoaW5nXHJcbiAgICAgICAgICAgIGlmIChwYXRoLmluZGV4T2YoXCIuL1wiKSA9PT0gMCkge1xyXG4gICAgICAgICAgICAgICAgcGF0aCA9IHBhdGguc3Vic3RyKDIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIC8vIHBhcmVudCBwYXRoLCBjYWxsIHBhcmVudCB2aWV3XHJcbiAgICAgICAgICAgIGlmIChwYXRoLmluZGV4T2YoXCIuLi9cIikgPT09IDApIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHBhcmVudCA9IHRoaXMuZ2V0UGFyZW50VmlldygpO1xyXG4gICAgICAgICAgICAgICAgaWYgKHBhcmVudCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBwYXJlbnQuc2hvdyhwYXRoLnN1YnN0cigzKSwgY29uZmlnKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmFwcC5zaG93KFwiL1wiICsgcGF0aC5zdWJzdHIoMykpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGNvbnN0IHN1YiA9IHRoaXMuZ2V0U3ViVmlld0luZm8oY29uZmlnLnRhcmdldCk7XHJcbiAgICAgICAgICAgIGlmIChzdWIpIHtcclxuICAgICAgICAgICAgICAgIGlmIChzdWIucGFyZW50ICE9PSB0aGlzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHN1Yi5wYXJlbnQuc2hvdyhwYXRoLCBjb25maWcpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZSBpZiAoY29uZmlnLnRhcmdldCAmJiBjb25maWcudGFyZ2V0ICE9PSBcImRlZmF1bHRcIikge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl9yZW5kZXJGcmFtZUxvY2soY29uZmlnLnRhcmdldCwgc3ViLnN1YnZpZXcsIHBhdGgpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgaWYgKHBhdGgpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5hcHAuc2hvdyhcIi9cIiArIHBhdGgpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0aGlzLl9zaG93KHRoaXMuX3NlZ21lbnQsIHBhdGgsIHRoaXMpO1xyXG4gICAgfVxyXG4gICAgX3Nob3coc2VnbWVudCwgcGF0aCwgdmlldykge1xyXG4gICAgICAgIHJldHVybiBzZWdtZW50LnNob3cocGF0aCwgdmlldywgdHJ1ZSkudGhlbigoKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuX2luaXRfdXJsX2RhdGEoKTtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3VybENoYW5nZSgpO1xyXG4gICAgICAgIH0pLnRoZW4oKCkgPT4ge1xyXG4gICAgICAgICAgICBpZiAoc2VnbWVudC5yb3V0ZS5saW5rUm91dGVyKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmFwcC5nZXRSb3V0ZXIoKS5zZXQoc2VnbWVudC5yb3V0ZS5wYXRoLCB7IHNpbGVudDogdHJ1ZSB9KTtcclxuICAgICAgICAgICAgICAgIHRoaXMuYXBwLmNhbGxFdmVudChcImFwcDpyb3V0ZVwiLCBbc2VnbWVudC5yb3V0ZS5wYXRoXSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxuICAgIGluaXQoXyR2aWV3LCBfJCkge1xyXG4gICAgICAgIC8vIHN0dWJcclxuICAgIH1cclxuICAgIHJlYWR5KF8kdmlldywgXyR1cmwpIHtcclxuICAgICAgICAvLyBzdHViXHJcbiAgICB9XHJcbiAgICBjb25maWcoKSB7XHJcbiAgICAgICAgdGhpcy5hcHAud2ViaXgubWVzc2FnZShcIlZpZXc6Q29uZmlnIGlzIG5vdCBpbXBsZW1lbnRlZFwiKTtcclxuICAgIH1cclxuICAgIHVybENoYW5nZShfJHZpZXcsIF8kdXJsKSB7XHJcbiAgICAgICAgLy8gc3R1YlxyXG4gICAgfVxyXG4gICAgZGVzdHJveSgpIHtcclxuICAgICAgICAvLyBzdHViXHJcbiAgICB9XHJcbiAgICBkZXN0cnVjdG9yKCkge1xyXG4gICAgICAgIHRoaXMuZGVzdHJveSgpO1xyXG4gICAgICAgIHRoaXMuX2Rlc3Ryb3lLaWRzKCk7XHJcbiAgICAgICAgLy8gZGVzdHJveSBhY3R1YWwgVUlcclxuICAgICAgICB0aGlzLl9yb290LmRlc3RydWN0b3IoKTtcclxuICAgICAgICBzdXBlci5kZXN0cnVjdG9yKCk7XHJcbiAgICB9XHJcbiAgICB1c2UocGx1Z2luLCBjb25maWcpIHtcclxuICAgICAgICBwbHVnaW4odGhpcy5hcHAsIHRoaXMsIGNvbmZpZyk7XHJcbiAgICB9XHJcbiAgICByZWZyZXNoKCkge1xyXG4gICAgICAgIGNvbnN0IHVybCA9IHRoaXMuZ2V0VXJsKCk7XHJcbiAgICAgICAgdGhpcy5kZXN0cm95KCk7XHJcbiAgICAgICAgdGhpcy5fZGVzdHJveUtpZHMoKTtcclxuICAgICAgICB0aGlzLl9kZXN0cm95U3VicygpO1xyXG4gICAgICAgIHRoaXMuX2RldGFjaEV2ZW50cygpO1xyXG4gICAgICAgIGlmICh0aGlzLl9jb250YWluZXIudGFnTmFtZSkge1xyXG4gICAgICAgICAgICB0aGlzLl9yb290LmRlc3RydWN0b3IoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5fc2VnbWVudC5yZWZyZXNoKCk7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX3JlbmRlcih0aGlzLl9zZWdtZW50KTtcclxuICAgIH1cclxuICAgIHJlbmRlcihyb290LCB1cmwsIHBhcmVudCkge1xyXG4gICAgICAgIGlmICh0eXBlb2YgdXJsID09PSBcInN0cmluZ1wiKSB7XHJcbiAgICAgICAgICAgIHVybCA9IG5ldyBSb3V0ZSh1cmwsIDApO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLl9zZWdtZW50ID0gdXJsO1xyXG4gICAgICAgIHRoaXMuX3BhcmVudCA9IHBhcmVudDtcclxuICAgICAgICB0aGlzLl9pbml0X3VybF9kYXRhKCk7XHJcbiAgICAgICAgcm9vdCA9IHJvb3QgfHwgZG9jdW1lbnQuYm9keTtcclxuICAgICAgICBjb25zdCBfY29udGFpbmVyID0gKHR5cGVvZiByb290ID09PSBcInN0cmluZ1wiKSA/IHRoaXMud2ViaXgudG9Ob2RlKHJvb3QpIDogcm9vdDtcclxuICAgICAgICBpZiAodGhpcy5fY29udGFpbmVyICE9PSBfY29udGFpbmVyKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2NvbnRhaW5lciA9IF9jb250YWluZXI7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9yZW5kZXIodXJsKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl91cmxDaGFuZ2UoKS50aGVuKCgpID0+IHRoaXMuZ2V0Um9vdCgpKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBfcmVuZGVyKHVybCkge1xyXG4gICAgICAgIGNvbnN0IGNvbmZpZyA9IHRoaXMuY29uZmlnKCk7XHJcbiAgICAgICAgaWYgKGNvbmZpZy50aGVuKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBjb25maWcudGhlbihjZmcgPT4gdGhpcy5fcmVuZGVyX2ZpbmFsKGNmZywgdXJsKSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fcmVuZGVyX2ZpbmFsKGNvbmZpZywgdXJsKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBfcmVuZGVyX2ZpbmFsKGNvbmZpZywgdXJsKSB7XHJcbiAgICAgICAgLy8gZ2V0IHByZXZpb3VzIHZpZXcgaW4gdGhlIHNhbWUgc2xvdFxyXG4gICAgICAgIGxldCBzbG90ID0gbnVsbDtcclxuICAgICAgICBsZXQgY29udGFpbmVyID0gbnVsbDtcclxuICAgICAgICBsZXQgc2hvdyA9IGZhbHNlO1xyXG4gICAgICAgIGlmICghdGhpcy5fY29udGFpbmVyLnRhZ05hbWUpIHtcclxuICAgICAgICAgICAgc2xvdCA9IHRoaXMuX2NvbnRhaW5lcjtcclxuICAgICAgICAgICAgaWYgKHNsb3QucG9wdXApIHtcclxuICAgICAgICAgICAgICAgIGNvbnRhaW5lciA9IGRvY3VtZW50LmJvZHk7XHJcbiAgICAgICAgICAgICAgICBzaG93ID0gdHJ1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGNvbnRhaW5lciA9IHRoaXMud2ViaXguJCQoc2xvdC5pZCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIGNvbnRhaW5lciA9IHRoaXMuX2NvbnRhaW5lcjtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gdmlldyBhbHJlYWR5IGRlc3Ryb3llZFxyXG4gICAgICAgIGlmICghdGhpcy5hcHAgfHwgIWNvbnRhaW5lcikge1xyXG4gICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QobnVsbCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxldCByZXNwb25zZTtcclxuICAgICAgICBjb25zdCBjdXJyZW50ID0gdGhpcy5fc2VnbWVudC5jdXJyZW50KCk7XHJcbiAgICAgICAgLy8gdXNpbmcgd3JhcHBlciBvYmplY3QsIHNvIHVpIGNhbiBiZSBjaGFuZ2VkIGZyb20gYXBwOnJlbmRlciBldmVudFxyXG4gICAgICAgIGNvbnN0IHJlc3VsdCA9IHsgdWk6IHt9IH07XHJcbiAgICAgICAgdGhpcy5hcHAuY29weUNvbmZpZyhjb25maWcsIHJlc3VsdC51aSwgdGhpcy5fc3Vicyk7XHJcbiAgICAgICAgdGhpcy5hcHAuY2FsbEV2ZW50KFwiYXBwOnJlbmRlclwiLCBbdGhpcywgdXJsLCByZXN1bHRdKTtcclxuICAgICAgICByZXN1bHQudWkuJHNjb3BlID0gdGhpcztcclxuICAgICAgICAvKiBkZXN0cm95IG9sZCBIVE1MIGF0dGFjaGVkIHZpZXdzIGJlZm9yZSBjcmVhdGluZyBuZXcgb25lICovXHJcbiAgICAgICAgaWYgKCFzbG90ICYmIGN1cnJlbnQuaXNOZXcgJiYgY3VycmVudC52aWV3KSB7XHJcbiAgICAgICAgICAgIGN1cnJlbnQudmlldy5kZXN0cnVjdG9yKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIC8vIHNwZWNpYWwgaGFuZGxpbmcgZm9yIGFkZGluZyBpbnNpZGUgb2YgbXVsdGl2aWV3IC0gcHJlc2VydmUgb2xkIGlkXHJcbiAgICAgICAgICAgIGlmIChzbG90ICYmICFzaG93KSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBvbGR1aSA9IGNvbnRhaW5lcjtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHBhcmVudCA9IG9sZHVpLmdldFBhcmVudFZpZXcoKTtcclxuICAgICAgICAgICAgICAgIGlmIChwYXJlbnQgJiYgcGFyZW50Lm5hbWUgPT09IFwibXVsdGl2aWV3XCIgJiYgIXJlc3VsdC51aS5pZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdC51aS5pZCA9IG9sZHVpLmNvbmZpZy5pZDtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLl9yb290ID0gdGhpcy5hcHAud2ViaXgudWkocmVzdWx0LnVpLCBjb250YWluZXIpO1xyXG4gICAgICAgICAgICBjb25zdCBhc1dpbiA9IHRoaXMuX3Jvb3Q7XHJcbiAgICAgICAgICAgIC8vIGNoZWNrIGZvciB1cmwgYWRkZWQgdG8gaWdub3JlIHRoaXMudWkgY2FsbHNcclxuICAgICAgICAgICAgaWYgKHNob3cgJiYgYXNXaW4uc2V0UG9zaXRpb24gJiYgIWFzV2luLmlzVmlzaWJsZSgpKSB7XHJcbiAgICAgICAgICAgICAgICBhc1dpbi5zaG93KCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgLy8gY2hlY2ssIGlmIHdlIGFyZSByZXBsYWNpbmcgc29tZSBvbGRlciB2aWV3XHJcbiAgICAgICAgICAgIGlmIChzbG90KSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoc2xvdC52aWV3ICYmIHNsb3QudmlldyAhPT0gdGhpcyAmJiBzbG90LnZpZXcgIT09IHRoaXMuYXBwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgc2xvdC52aWV3LmRlc3RydWN0b3IoKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHNsb3QuaWQgPSB0aGlzLl9yb290LmNvbmZpZy5pZDtcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmdldFBhcmVudFZpZXcoKSB8fCAhdGhpcy5hcHAuYXBwKVxyXG4gICAgICAgICAgICAgICAgICAgIHNsb3QudmlldyA9IHRoaXM7XHJcbiAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAvLyB3aGVuIHdlIGhhdmUgc3ViYXBwLCBzZXQgd2hvbGUgYXBwIGFzIGEgdmlld1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIHNvIG9uIGRlc3RydWN0aW9uLCB0aGUgd2hvbGUgYXBwIHdpbGwgYmUgZGVzdHJveWVkXHJcbiAgICAgICAgICAgICAgICAgICAgc2xvdC52aWV3ID0gdGhpcy5hcHA7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKGN1cnJlbnQuaXNOZXcpIHtcclxuICAgICAgICAgICAgICAgIGN1cnJlbnQudmlldyA9IHRoaXM7XHJcbiAgICAgICAgICAgICAgICBjdXJyZW50LmlzTmV3ID0gZmFsc2U7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmVzcG9uc2UgPSBQcm9taXNlLnJlc29sdmUodGhpcy5faW5pdCh0aGlzLl9yb290LCB1cmwpKS50aGVuKCgpID0+IHtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl91cmxDaGFuZ2UoKS50aGVuKCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9pbml0VXJsID0gbnVsbDtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5yZWFkeSh0aGlzLl9yb290LCB1cmwuc3VidXJsKCkpO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjYXRjaCAoZSkge1xyXG4gICAgICAgICAgICByZXNwb25zZSA9IFByb21pc2UucmVqZWN0KGUpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gcmVzcG9uc2UuY2F0Y2goZXJyID0+IHRoaXMuX2luaXRFcnJvcih0aGlzLCBlcnIpKTtcclxuICAgIH1cclxuICAgIF9pbml0KHZpZXcsIHVybCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmluaXQodmlldywgdXJsLnN1YnVybCgpKTtcclxuICAgIH1cclxuICAgIF91cmxDaGFuZ2UoKSB7XHJcbiAgICAgICAgdGhpcy5hcHAuY2FsbEV2ZW50KFwiYXBwOnVybGNoYW5nZVwiLCBbdGhpcywgdGhpcy5fc2VnbWVudF0pO1xyXG4gICAgICAgIGNvbnN0IHdhaXRzID0gW107XHJcbiAgICAgICAgZm9yIChjb25zdCBrZXkgaW4gdGhpcy5fc3Vicykge1xyXG4gICAgICAgICAgICBjb25zdCBmcmFtZSA9IHRoaXMuX3N1YnNba2V5XTtcclxuICAgICAgICAgICAgY29uc3Qgd2FpdCA9IHRoaXMuX3JlbmRlckZyYW1lTG9jayhrZXksIGZyYW1lLCBudWxsKTtcclxuICAgICAgICAgICAgaWYgKHdhaXQpIHtcclxuICAgICAgICAgICAgICAgIHdhaXRzLnB1c2god2FpdCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIFByb21pc2UuYWxsKHdhaXRzKS50aGVuKCgpID0+IHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMudXJsQ2hhbmdlKHRoaXMuX3Jvb3QsIHRoaXMuX3NlZ21lbnQuc3VidXJsKCkpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgX3JlbmRlckZyYW1lTG9jayhrZXksIGZyYW1lLCBwYXRoKSB7XHJcbiAgICAgICAgLy8gaWYgc3VidmlldyBpcyBub3Qgb2NjdXBpZWQgYnkgc29tZSByZW5kZXJpbmcgeWV0XHJcbiAgICAgICAgaWYgKCFmcmFtZS5sb2NrKSB7XHJcbiAgICAgICAgICAgIC8vIHJldHJlaXZlIGFuZCBzdG9yZSByZW5kZXJpbmcgZW5kIHByb21pc2VcclxuICAgICAgICAgICAgY29uc3QgbG9jayA9IHRoaXMuX3JlbmRlckZyYW1lKGtleSwgZnJhbWUsIHBhdGgpO1xyXG4gICAgICAgICAgICBpZiAobG9jaykge1xyXG4gICAgICAgICAgICAgICAgLy8gY2xlYXIgbG9jayBhZnRlciBmcmFtZSByZW5kZXJpbmdcclxuICAgICAgICAgICAgICAgIC8vIGFzIHByb21pc2UuZmluYWxseSBpcyBub3Qgc3VwcG9ydGVkIGJ5ICBXZWJpeCBsZXNzZXIgdGhhbiA2LjJcclxuICAgICAgICAgICAgICAgIC8vIHVzaW5nIGEgbW9yZSB2ZXJib3NlIG5vdGF0aW9uXHJcbiAgICAgICAgICAgICAgICBmcmFtZS5sb2NrID0gbG9jay50aGVuKCgpID0+IGZyYW1lLmxvY2sgPSBudWxsLCAoKSA9PiBmcmFtZS5sb2NrID0gbnVsbCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gcmV0dXJuIHJlbmRlcmluZyBlbmQgcHJvbWlzZVxyXG4gICAgICAgIHJldHVybiBmcmFtZS5sb2NrO1xyXG4gICAgfVxyXG4gICAgX3JlbmRlckZyYW1lKGtleSwgZnJhbWUsIHBhdGgpIHtcclxuICAgICAgICAvL2RlZmF1bHQgcm91dGVcclxuICAgICAgICBpZiAoa2V5ID09PSBcImRlZmF1bHRcIikge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5fc2VnbWVudC5uZXh0KCkpIHtcclxuICAgICAgICAgICAgICAgIC8vIHdlIGhhdmUgYSBuZXh0IHNlZ21lbnQgaW4gdXJsLCByZW5kZXIgaXRcclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl9jcmVhdGVTdWJWaWV3KGZyYW1lLCB0aGlzLl9zZWdtZW50LnNoaWZ0KCkpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2UgaWYgKGZyYW1lLnZpZXcgJiYgZnJhbWUucG9wdXApIHtcclxuICAgICAgICAgICAgICAgIC8vIHRoZXJlIGlzIG5vIG5leHQgc2VnbWVudCwgZGVsZXRlIHRoZSBleGlzdGluZyBzdWItdmlld1xyXG4gICAgICAgICAgICAgICAgZnJhbWUudmlldy5kZXN0cnVjdG9yKCk7XHJcbiAgICAgICAgICAgICAgICBmcmFtZS52aWV3ID0gbnVsbDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICAvL2lmIG5ldyBwYXRoIHByb3ZpZGVkLCBzZXQgaXQgdG8gdGhlIGZyYW1lXHJcbiAgICAgICAgaWYgKHBhdGggIT09IG51bGwpIHtcclxuICAgICAgICAgICAgZnJhbWUudXJsID0gcGF0aDtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gaW4gY2FzZSBvZiByb3V0ZWQgc3ViLXZpZXdcclxuICAgICAgICBpZiAoZnJhbWUucm91dGUpIHtcclxuICAgICAgICAgICAgLy8gd2UgaGF2ZSBhIG5ldyBwYXRoIGZvciBzdWItdmlld1xyXG4gICAgICAgICAgICBpZiAocGF0aCAhPT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZyYW1lLnJvdXRlLnNob3cocGF0aCwgZnJhbWUudmlldykudGhlbigoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2NyZWF0ZVN1YlZpZXcoZnJhbWUsIGZyYW1lLnJvdXRlKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIC8vIGRvIG5vdCB0cmlnZ2VyIG9uQ2hhbmdlIGZvciBpc29sYXRlZCBzdWItdmlld3NcclxuICAgICAgICAgICAgaWYgKGZyYW1lLmJyYW5jaCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxldCB2aWV3ID0gZnJhbWUudmlldztcclxuICAgICAgICAvLyBpZiB2aWV3IGRvZXNuJ3QgZXhpc3RzIHlldCwgaW5pdCBpdFxyXG4gICAgICAgIGlmICghdmlldyAmJiBmcmFtZS51cmwpIHtcclxuICAgICAgICAgICAgaWYgKHR5cGVvZiBmcmFtZS51cmwgPT09IFwic3RyaW5nXCIpIHtcclxuICAgICAgICAgICAgICAgIC8vIHN0cmluZywgc28gd2UgaGF2ZSBpc29sYXRlZCBzdWJ2aWV3IHVybFxyXG4gICAgICAgICAgICAgICAgZnJhbWUucm91dGUgPSBuZXcgUm91dGUoZnJhbWUudXJsLCAwKTtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl9jcmVhdGVTdWJWaWV3KGZyYW1lLCBmcmFtZS5yb3V0ZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAvLyBvYmplY3QsIHNvIHdlIGhhdmUgYW4gZW1iZWRlZCBzdWJ2aWV3XHJcbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mIGZyYW1lLnVybCA9PT0gXCJmdW5jdGlvblwiICYmICEodmlldyBpbnN0YW5jZW9mIGZyYW1lLnVybCkpIHtcclxuICAgICAgICAgICAgICAgICAgICB2aWV3ID0gbmV3IGZyYW1lLnVybCh0aGlzLmFwcCwgXCJcIik7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZiAoIXZpZXcpIHtcclxuICAgICAgICAgICAgICAgICAgICB2aWV3ID0gZnJhbWUudXJsO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIHRyaWdnZXIgb25DaGFuZ2UgZm9yIGFscmVhZHkgZXhpc3RlZCB2aWV3XHJcbiAgICAgICAgaWYgKHZpZXcpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHZpZXcucmVuZGVyKGZyYW1lLCAoZnJhbWUucm91dGUgfHwgdGhpcy5fc2VnbWVudCksIHRoaXMpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIF9pbml0RXJyb3IodmlldywgZXJyKSB7XHJcbiAgICAgICAgLypcclxuICAgICAgICAgICAgaWYgdmlldyBpcyBkZXN0cm95ZWQsIGlnbm9yZSBhbnkgdmlldyByZWxhdGVkIGVycm9yc1xyXG4gICAgICAgICovXHJcbiAgICAgICAgaWYgKHRoaXMuYXBwKSB7XHJcbiAgICAgICAgICAgIHRoaXMuYXBwLmVycm9yKFwiYXBwOmVycm9yOmluaXR2aWV3XCIsIFtlcnIsIHZpZXddKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICB9XHJcbiAgICBfY3JlYXRlU3ViVmlldyhzdWIsIHN1YnVybCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmFwcC5jcmVhdGVGcm9tVVJMKHN1YnVybC5jdXJyZW50KCkpLnRoZW4odmlldyA9PiB7XHJcbiAgICAgICAgICAgIHJldHVybiB2aWV3LnJlbmRlcihzdWIsIHN1YnVybCwgdGhpcyk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICBfZGVzdHJveUtpZHMoKSB7XHJcbiAgICAgICAgLy8gZGVzdHJveSBjaGlsZCB2aWV3c1xyXG4gICAgICAgIGNvbnN0IHVpcyA9IHRoaXMuX2NoaWxkcmVuO1xyXG4gICAgICAgIGZvciAobGV0IGkgPSB1aXMubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIHtcclxuICAgICAgICAgICAgaWYgKHVpc1tpXSAmJiB1aXNbaV0uZGVzdHJ1Y3Rvcikge1xyXG4gICAgICAgICAgICAgICAgdWlzW2ldLmRlc3RydWN0b3IoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICAvLyByZXNldCB2YXJzIGZvciBiZXR0ZXIgR0MgcHJvY2Vzc2luZ1xyXG4gICAgICAgIHRoaXMuX2NoaWxkcmVuID0gW107XHJcbiAgICB9XHJcbn1cblxuLy8gd3JhcHBlciBmb3IgcmF3IG9iamVjdHMgYW5kIEpldCAxLnggc3RydWN0c1xyXG5jbGFzcyBKZXRWaWV3UmF3IGV4dGVuZHMgSmV0VmlldyB7XHJcbiAgICBjb25zdHJ1Y3RvcihhcHAsIGNvbmZpZykge1xyXG4gICAgICAgIHN1cGVyKGFwcCwgY29uZmlnKTtcclxuICAgICAgICB0aGlzLl91aSA9IGNvbmZpZy51aTtcclxuICAgIH1cclxuICAgIGNvbmZpZygpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fdWk7XHJcbiAgICB9XHJcbn1cblxuY2xhc3MgU3ViUm91dGVyIHtcclxuICAgIGNvbnN0cnVjdG9yKGNiLCBjb25maWcsIGFwcCkge1xyXG4gICAgICAgIHRoaXMucGF0aCA9IFwiXCI7XHJcbiAgICAgICAgdGhpcy5hcHAgPSBhcHA7XHJcbiAgICB9XHJcbiAgICBzZXQocGF0aCwgY29uZmlnKSB7XHJcbiAgICAgICAgdGhpcy5wYXRoID0gcGF0aDtcclxuICAgICAgICBjb25zdCBhID0gdGhpcy5hcHA7XHJcbiAgICAgICAgYS5hcHAuZ2V0Um91dGVyKCkuc2V0KGEuX3NlZ21lbnQuYXBwZW5kKHRoaXMucGF0aCksIHsgc2lsZW50OiB0cnVlIH0pO1xyXG4gICAgfVxyXG4gICAgZ2V0KCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnBhdGg7XHJcbiAgICB9XHJcbn1cblxubGV0IF9vbmNlID0gdHJ1ZTtcclxuY2xhc3MgSmV0QXBwQmFzZSBleHRlbmRzIEpldEJhc2Uge1xyXG4gICAgY29uc3RydWN0b3IoY29uZmlnKSB7XHJcbiAgICAgICAgY29uc3Qgd2ViaXggPSAoY29uZmlnIHx8IHt9KS53ZWJpeCB8fCB3aW5kb3cud2ViaXg7XHJcbiAgICAgICAgc3VwZXIod2ViaXgpO1xyXG4gICAgICAgIC8vIGluaXQgY29uZmlnXHJcbiAgICAgICAgdGhpcy5jb25maWcgPSB0aGlzLndlYml4LmV4dGVuZCh7XHJcbiAgICAgICAgICAgIG5hbWU6IFwiQXBwXCIsXHJcbiAgICAgICAgICAgIHZlcnNpb246IFwiMS4wXCIsXHJcbiAgICAgICAgICAgIHN0YXJ0OiBcIi9ob21lXCJcclxuICAgICAgICB9LCBjb25maWcsIHRydWUpO1xyXG4gICAgICAgIHRoaXMuYXBwID0gdGhpcy5jb25maWcuYXBwO1xyXG4gICAgICAgIHRoaXMucmVhZHkgPSBQcm9taXNlLnJlc29sdmUoKTtcclxuICAgICAgICB0aGlzLl9zZXJ2aWNlcyA9IHt9O1xyXG4gICAgICAgIHRoaXMud2ViaXguZXh0ZW5kKHRoaXMsIHRoaXMud2ViaXguRXZlbnRTeXN0ZW0pO1xyXG4gICAgfVxyXG4gICAgZ2V0VXJsKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9zdWJTZWdtZW50LnN1YnVybCgpO1xyXG4gICAgfVxyXG4gICAgZ2V0VXJsU3RyaW5nKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9zdWJTZWdtZW50LnRvU3RyaW5nKCk7XHJcbiAgICB9XHJcbiAgICBnZXRTZXJ2aWNlKG5hbWUpIHtcclxuICAgICAgICBsZXQgb2JqID0gdGhpcy5fc2VydmljZXNbbmFtZV07XHJcbiAgICAgICAgaWYgKHR5cGVvZiBvYmogPT09IFwiZnVuY3Rpb25cIikge1xyXG4gICAgICAgICAgICBvYmogPSB0aGlzLl9zZXJ2aWNlc1tuYW1lXSA9IG9iaih0aGlzKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIG9iajtcclxuICAgIH1cclxuICAgIHNldFNlcnZpY2UobmFtZSwgaGFuZGxlcikge1xyXG4gICAgICAgIHRoaXMuX3NlcnZpY2VzW25hbWVdID0gaGFuZGxlcjtcclxuICAgIH1cclxuICAgIGRlc3RydWN0b3IoKSB7XHJcbiAgICAgICAgdGhpcy5nZXRTdWJWaWV3KCkuZGVzdHJ1Y3RvcigpO1xyXG4gICAgICAgIHN1cGVyLmRlc3RydWN0b3IoKTtcclxuICAgIH1cclxuICAgIC8vIGNvcHkgb2JqZWN0IGFuZCBjb2xsZWN0IGV4dHJhIGhhbmRsZXJzXHJcbiAgICBjb3B5Q29uZmlnKG9iaiwgdGFyZ2V0LCBjb25maWcpIHtcclxuICAgICAgICAvLyByYXcgdWkgY29uZmlnXHJcbiAgICAgICAgaWYgKG9iaiBpbnN0YW5jZW9mIEpldEJhc2UgfHxcclxuICAgICAgICAgICAgKHR5cGVvZiBvYmogPT09IFwiZnVuY3Rpb25cIiAmJiBvYmoucHJvdG90eXBlIGluc3RhbmNlb2YgSmV0QmFzZSkpIHtcclxuICAgICAgICAgICAgb2JqID0geyAkc3Vidmlldzogb2JqIH07XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIHN1YnZpZXcgcGxhY2Vob2xkZXJcclxuICAgICAgICBpZiAodHlwZW9mIG9iai4kc3VidmlldyAhPSBcInVuZGVmaW5lZFwiKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmFkZFN1YlZpZXcob2JqLCB0YXJnZXQsIGNvbmZpZyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIHByb2Nlc3Mgc3ViLXByb3BlcnRpZXNcclxuICAgICAgICB0YXJnZXQgPSB0YXJnZXQgfHwgKG9iaiBpbnN0YW5jZW9mIEFycmF5ID8gW10gOiB7fSk7XHJcbiAgICAgICAgZm9yIChjb25zdCBtZXRob2QgaW4gb2JqKSB7XHJcbiAgICAgICAgICAgIGxldCBwb2ludCA9IG9ialttZXRob2RdO1xyXG4gICAgICAgICAgICAvLyB2aWV3IGNsYXNzXHJcbiAgICAgICAgICAgIGlmICh0eXBlb2YgcG9pbnQgPT09IFwiZnVuY3Rpb25cIiAmJiBwb2ludC5wcm90b3R5cGUgaW5zdGFuY2VvZiBKZXRCYXNlKSB7XHJcbiAgICAgICAgICAgICAgICBwb2ludCA9IHsgJHN1YnZpZXc6IHBvaW50IH07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKHBvaW50ICYmIHR5cGVvZiBwb2ludCA9PT0gXCJvYmplY3RcIiAmJlxyXG4gICAgICAgICAgICAgICAgIShwb2ludCBpbnN0YW5jZW9mIHRoaXMud2ViaXguRGF0YUNvbGxlY3Rpb24pICYmICEocG9pbnQgaW5zdGFuY2VvZiBSZWdFeHApKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAocG9pbnQgaW5zdGFuY2VvZiBEYXRlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGFyZ2V0W21ldGhvZF0gPSBuZXcgRGF0ZShwb2ludCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBjb3B5ID0gdGhpcy5jb3B5Q29uZmlnKHBvaW50LCAocG9pbnQgaW5zdGFuY2VvZiBBcnJheSA/IFtdIDoge30pLCBjb25maWcpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChjb3B5ICE9PSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRhcmdldFttZXRob2RdID0gY29weTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB0YXJnZXRbbWV0aG9kXSA9IHBvaW50O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0YXJnZXQ7XHJcbiAgICB9XHJcbiAgICBnZXRSb3V0ZXIoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuJHJvdXRlcjtcclxuICAgIH1cclxuICAgIGNsaWNrSGFuZGxlcihlLCB0YXJnZXQpIHtcclxuICAgICAgICBpZiAoZSkge1xyXG4gICAgICAgICAgICB0YXJnZXQgPSB0YXJnZXQgfHwgKGUudGFyZ2V0IHx8IGUuc3JjRWxlbWVudCk7XHJcbiAgICAgICAgICAgIGlmICh0YXJnZXQgJiYgdGFyZ2V0LmdldEF0dHJpYnV0ZSkge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgdHJpZ2dlciA9IHRhcmdldC5nZXRBdHRyaWJ1dGUoXCJ0cmlnZ2VyXCIpO1xyXG4gICAgICAgICAgICAgICAgaWYgKHRyaWdnZXIpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9mb3JWaWV3KHRhcmdldCwgdmlldyA9PiB2aWV3LmFwcC50cmlnZ2VyKHRyaWdnZXIpKTtcclxuICAgICAgICAgICAgICAgICAgICBlLmNhbmNlbEJ1YmJsZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGNvbnN0IHJvdXRlID0gdGFyZ2V0LmdldEF0dHJpYnV0ZShcInJvdXRlXCIpO1xyXG4gICAgICAgICAgICAgICAgaWYgKHJvdXRlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fZm9yVmlldyh0YXJnZXQsIHZpZXcgPT4gdmlldy5zaG93KHJvdXRlKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgZS5jYW5jZWxCdWJibGUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgY29uc3QgcGFyZW50ID0gdGFyZ2V0LnBhcmVudE5vZGU7XHJcbiAgICAgICAgaWYgKHBhcmVudCkge1xyXG4gICAgICAgICAgICB0aGlzLmNsaWNrSGFuZGxlcihlLCBwYXJlbnQpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGdldFJvb3QoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0U3ViVmlldygpLmdldFJvb3QoKTtcclxuICAgIH1cclxuICAgIHJlZnJlc2goKSB7XHJcbiAgICAgICAgaWYgKCF0aGlzLl9zdWJTZWdtZW50KSB7XHJcbiAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUobnVsbCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0aGlzLmdldFN1YlZpZXcoKS5yZWZyZXNoKCkudGhlbih2aWV3ID0+IHtcclxuICAgICAgICAgICAgdGhpcy5jYWxsRXZlbnQoXCJhcHA6cm91dGVcIiwgW3RoaXMuZ2V0VXJsKCldKTtcclxuICAgICAgICAgICAgcmV0dXJuIHZpZXc7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICBsb2FkVmlldyh1cmwpIHtcclxuICAgICAgICBjb25zdCB2aWV3cyA9IHRoaXMuY29uZmlnLnZpZXdzO1xyXG4gICAgICAgIGxldCByZXN1bHQgPSBudWxsO1xyXG4gICAgICAgIGlmICh1cmwgPT09IFwiXCIpIHtcclxuICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSh0aGlzLl9sb2FkRXJyb3IoXCJcIiwgbmV3IEVycm9yKFwiV2ViaXggSmV0OiBFbXB0eSB1cmwgc2VnbWVudFwiKSkpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICBpZiAodmlld3MpIHtcclxuICAgICAgICAgICAgICAgIGlmICh0eXBlb2Ygdmlld3MgPT09IFwiZnVuY3Rpb25cIikge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIGN1c3RvbSBsb2FkaW5nIHN0cmF0ZWd5XHJcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0ID0gdmlld3ModXJsKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIHByZWRlZmluZWQgaGFzaFxyXG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdCA9IHZpZXdzW3VybF07XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mIHJlc3VsdCA9PT0gXCJzdHJpbmdcIikge1xyXG4gICAgICAgICAgICAgICAgICAgIHVybCA9IHJlc3VsdDtcclxuICAgICAgICAgICAgICAgICAgICByZXN1bHQgPSBudWxsO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmICghcmVzdWx0KSB7XHJcbiAgICAgICAgICAgICAgICBpZiAodXJsID09PSBcIl9ibGFua1wiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0ID0ge307XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICByZXN1bHQgPSB0aGlzLl9sb2FkVmlld0R5bmFtaWModXJsKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBjYXRjaCAoZSkge1xyXG4gICAgICAgICAgICByZXN1bHQgPSB0aGlzLl9sb2FkRXJyb3IodXJsLCBlKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gY3VzdG9tIGhhbmRsZXIgY2FuIHJldHVybiB2aWV3IG9yIGl0cyBwcm9taXNlXHJcbiAgICAgICAgaWYgKCFyZXN1bHQudGhlbikge1xyXG4gICAgICAgICAgICByZXN1bHQgPSBQcm9taXNlLnJlc29sdmUocmVzdWx0KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gc2V0IGVycm9yIGhhbmRsZXJcclxuICAgICAgICByZXN1bHQgPSByZXN1bHRcclxuICAgICAgICAgICAgLnRoZW4obW9kdWxlID0+IG1vZHVsZS5fX2VzTW9kdWxlID8gbW9kdWxlLmRlZmF1bHQgOiBtb2R1bGUpXHJcbiAgICAgICAgICAgIC5jYXRjaChlcnIgPT4gdGhpcy5fbG9hZEVycm9yKHVybCwgZXJyKSk7XHJcbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcclxuICAgIH1cclxuICAgIF9mb3JWaWV3KHRhcmdldCwgaGFuZGxlcikge1xyXG4gICAgICAgIGNvbnN0IHZpZXcgPSB0aGlzLndlYml4LiQkKHRhcmdldCk7XHJcbiAgICAgICAgaWYgKHZpZXcpIHtcclxuICAgICAgICAgICAgaGFuZGxlcih2aWV3LiRzY29wZSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgX2xvYWRWaWV3RHluYW1pYyh1cmwpIHtcclxuICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgIH1cclxuICAgIGNyZWF0ZUZyb21VUkwoY2h1bmspIHtcclxuICAgICAgICBsZXQgdmlldztcclxuICAgICAgICBpZiAoY2h1bmsuaXNOZXcgfHwgIWNodW5rLnZpZXcpIHtcclxuICAgICAgICAgICAgdmlldyA9IHRoaXMubG9hZFZpZXcoY2h1bmsucGFnZSlcclxuICAgICAgICAgICAgICAgIC50aGVuKHVpID0+IHRoaXMuY3JlYXRlVmlldyh1aSwgbmFtZSkpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgdmlldyA9IFByb21pc2UucmVzb2x2ZShjaHVuay52aWV3KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHZpZXc7XHJcbiAgICB9XHJcbiAgICBjcmVhdGVWaWV3KHVpLCBuYW1lKSB7XHJcbiAgICAgICAgbGV0IG9iajtcclxuICAgICAgICBpZiAodHlwZW9mIHVpID09PSBcImZ1bmN0aW9uXCIpIHtcclxuICAgICAgICAgICAgaWYgKHVpLnByb3RvdHlwZSBpbnN0YW5jZW9mIEpldEFwcEJhc2UpIHtcclxuICAgICAgICAgICAgICAgIC8vIFVJIGNsYXNzXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gbmV3IHVpKHsgYXBwOiB0aGlzLCBuYW1lLCByb3V0ZXI6IFN1YlJvdXRlciB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIGlmICh1aS5wcm90b3R5cGUgaW5zdGFuY2VvZiBKZXRCYXNlKSB7XHJcbiAgICAgICAgICAgICAgICAvLyBVSSBjbGFzc1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIG5ldyB1aSh0aGlzLCB7IG5hbWUgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAvLyBVSSBmYWN0b3J5IGZ1bmN0aW9uc1xyXG4gICAgICAgICAgICAgICAgdWkgPSB1aSh0aGlzKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodWkgaW5zdGFuY2VvZiBKZXRCYXNlKSB7XHJcbiAgICAgICAgICAgIG9iaiA9IHVpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgLy8gVUkgb2JqZWN0XHJcbiAgICAgICAgICAgIG9iaiA9IG5ldyBKZXRWaWV3UmF3KHRoaXMsIHsgbmFtZSwgdWkgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBvYmo7XHJcbiAgICB9XHJcbiAgICAvLyBzaG93IHZpZXcgcGF0aFxyXG4gICAgc2hvdyh1cmwpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5yZW5kZXIodGhpcy5fY29udGFpbmVyLCAodXJsIHx8IHRoaXMuY29uZmlnLnN0YXJ0KSk7XHJcbiAgICB9XHJcbiAgICAvLyBldmVudCBoZWxwZXJzXHJcbiAgICB0cmlnZ2VyKG5hbWUsIC4uLnJlc3QpIHtcclxuICAgICAgICB0aGlzLmFwcGx5KG5hbWUsIHJlc3QpO1xyXG4gICAgfVxyXG4gICAgYXBwbHkobmFtZSwgZGF0YSkge1xyXG4gICAgICAgIHRoaXMuY2FsbEV2ZW50KG5hbWUsIGRhdGEpO1xyXG4gICAgfVxyXG4gICAgYWN0aW9uKG5hbWUpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy53ZWJpeC5iaW5kKGZ1bmN0aW9uICguLi5yZXN0KSB7XHJcbiAgICAgICAgICAgIHRoaXMuYXBwbHkobmFtZSwgcmVzdCk7XHJcbiAgICAgICAgfSwgdGhpcyk7XHJcbiAgICB9XHJcbiAgICBvbihuYW1lLCBoYW5kbGVyKSB7XHJcbiAgICAgICAgdGhpcy5hdHRhY2hFdmVudChuYW1lLCBoYW5kbGVyKTtcclxuICAgIH1cclxuICAgIHVzZShwbHVnaW4sIGNvbmZpZykge1xyXG4gICAgICAgIHBsdWdpbih0aGlzLCBudWxsLCBjb25maWcpO1xyXG4gICAgfVxyXG4gICAgZXJyb3IobmFtZSwgZXIpIHtcclxuICAgICAgICB0aGlzLmNhbGxFdmVudChuYW1lLCBlcik7XHJcbiAgICAgICAgdGhpcy5jYWxsRXZlbnQoXCJhcHA6ZXJyb3JcIiwgZXIpO1xyXG4gICAgICAgIC8qIHRzbGludDpkaXNhYmxlICovXHJcbiAgICAgICAgaWYgKHRoaXMuY29uZmlnLmRlYnVnKSB7XHJcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgZXIubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoZXJbaV0pO1xyXG4gICAgICAgICAgICAgICAgaWYgKGVyW2ldIGluc3RhbmNlb2YgRXJyb3IpIHtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgdGV4dCA9IGVyW2ldLm1lc3NhZ2U7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRleHQuaW5kZXhPZihcIk1vZHVsZSBidWlsZCBmYWlsZWRcIikgPT09IDApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGV4dCA9IHRleHQucmVwbGFjZSgvXFx4MWJcXFtbMC05O10qbS9nLCBcIlwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZG9jdW1lbnQuYm9keS5pbm5lckhUTUwgPSBgPHByZSBzdHlsZT0nZm9udC1zaXplOjE2cHg7IGJhY2tncm91bmQtY29sb3I6ICNlYzY4NzM7IGNvbG9yOiAjMDAwOyBwYWRkaW5nOjEwcHg7Jz4ke3RleHR9PC9wcmU+YDtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRleHQgKz0gXCI8YnI+PGJyPkNoZWNrIGNvbnNvbGUgZm9yIG1vcmUgZGV0YWlsc1wiO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLndlYml4Lm1lc3NhZ2UoeyB0eXBlOiBcImVycm9yXCIsIHRleHQ6IHRleHQsIGV4cGlyZTogLTEgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGRlYnVnZ2VyO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvKiB0c2xpbnQ6ZW5hYmxlICovXHJcbiAgICB9XHJcbiAgICAvLyByZW5kZXJzIHRvcCB2aWV3XHJcbiAgICByZW5kZXIocm9vdCwgdXJsLCBwYXJlbnQpIHtcclxuICAgICAgICB0aGlzLl9jb250YWluZXIgPSAodHlwZW9mIHJvb3QgPT09IFwic3RyaW5nXCIpID9cclxuICAgICAgICAgICAgdGhpcy53ZWJpeC50b05vZGUocm9vdCkgOlxyXG4gICAgICAgICAgICAocm9vdCB8fCBkb2N1bWVudC5ib2R5KTtcclxuICAgICAgICBjb25zdCBmaXJzdEluaXQgPSAhdGhpcy4kcm91dGVyO1xyXG4gICAgICAgIGxldCBwYXRoID0gbnVsbDtcclxuICAgICAgICBpZiAoZmlyc3RJbml0KSB7XHJcbiAgICAgICAgICAgIGlmIChfb25jZSAmJiBcInRhZ05hbWVcIiBpbiB0aGlzLl9jb250YWluZXIpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMud2ViaXguZXZlbnQoZG9jdW1lbnQuYm9keSwgXCJjbGlja1wiLCBlID0+IHRoaXMuY2xpY2tIYW5kbGVyKGUpKTtcclxuICAgICAgICAgICAgICAgIF9vbmNlID0gZmFsc2U7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKHR5cGVvZiB1cmwgPT09IFwic3RyaW5nXCIpIHtcclxuICAgICAgICAgICAgICAgIHVybCA9IG5ldyBSb3V0ZSh1cmwsIDApO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMuX3N1YlNlZ21lbnQgPSB0aGlzLl9maXJzdF9zdGFydCh1cmwpO1xyXG4gICAgICAgICAgICB0aGlzLl9zdWJTZWdtZW50LnJvdXRlLmxpbmtSb3V0ZXIgPSB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgaWYgKHR5cGVvZiB1cmwgPT09IFwic3RyaW5nXCIpIHtcclxuICAgICAgICAgICAgICAgIHBhdGggPSB1cmw7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5hcHApIHtcclxuICAgICAgICAgICAgICAgICAgICBwYXRoID0gdXJsLnNwbGl0KCkucm91dGUucGF0aCB8fCB0aGlzLmNvbmZpZy5zdGFydDtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHBhdGggPSB1cmwudG9TdHJpbmcoKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBjb25zdCB0b3AgPSB0aGlzLmdldFN1YlZpZXcoKTtcclxuICAgICAgICBjb25zdCBzZWdtZW50ID0gdGhpcy5fc3ViU2VnbWVudDtcclxuICAgICAgICBjb25zdCByZWFkeSA9IHNlZ21lbnQuc2hvdyhwYXRoLCB0b3ApXHJcbiAgICAgICAgICAgIC50aGVuKCgpID0+IHRoaXMuY3JlYXRlRnJvbVVSTChzZWdtZW50LmN1cnJlbnQoKSkpXHJcbiAgICAgICAgICAgIC50aGVuKHZpZXcgPT4gdmlldy5yZW5kZXIocm9vdCwgc2VnbWVudCkpXHJcbiAgICAgICAgICAgIC50aGVuKGJhc2UgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLiRyb3V0ZXIuc2V0KHNlZ21lbnQucm91dGUucGF0aCwgeyBzaWxlbnQ6IHRydWUgfSk7XHJcbiAgICAgICAgICAgIHRoaXMuY2FsbEV2ZW50KFwiYXBwOnJvdXRlXCIsIFt0aGlzLmdldFVybCgpXSk7XHJcbiAgICAgICAgICAgIHJldHVybiBiYXNlO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHRoaXMucmVhZHkgPSB0aGlzLnJlYWR5LnRoZW4oKCkgPT4gcmVhZHkpO1xyXG4gICAgICAgIHJldHVybiByZWFkeTtcclxuICAgIH1cclxuICAgIGdldFN1YlZpZXcoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuX3N1YlNlZ21lbnQpIHtcclxuICAgICAgICAgICAgY29uc3QgdmlldyA9IHRoaXMuX3N1YlNlZ21lbnQuY3VycmVudCgpLnZpZXc7XHJcbiAgICAgICAgICAgIGlmICh2aWV3KVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHZpZXc7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBuZXcgSmV0Vmlldyh0aGlzLCB7fSk7XHJcbiAgICB9XHJcbiAgICBfZmlyc3Rfc3RhcnQocm91dGUpIHtcclxuICAgICAgICB0aGlzLl9zZWdtZW50ID0gcm91dGU7XHJcbiAgICAgICAgY29uc3QgY2IgPSAoYSkgPT4gc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuc2hvdyhhKS5jYXRjaChlID0+IHtcclxuICAgICAgICAgICAgICAgIGlmICghKGUgaW5zdGFuY2VvZiBOYXZpZ2F0aW9uQmxvY2tlZCkpXHJcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgZTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSwgMSk7XHJcbiAgICAgICAgdGhpcy4kcm91dGVyID0gbmV3ICh0aGlzLmNvbmZpZy5yb3V0ZXIpKGNiLCB0aGlzLmNvbmZpZywgdGhpcyk7XHJcbiAgICAgICAgLy8gc3RhcnQgYW5pbWF0aW9uIGZvciB0b3AtbGV2ZWwgYXBwXHJcbiAgICAgICAgaWYgKHRoaXMuX2NvbnRhaW5lciA9PT0gZG9jdW1lbnQuYm9keSAmJiB0aGlzLmNvbmZpZy5hbmltYXRpb24gIT09IGZhbHNlKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IG5vZGUgPSB0aGlzLl9jb250YWluZXI7XHJcbiAgICAgICAgICAgIHRoaXMud2ViaXguaHRtbC5hZGRDc3Mobm9kZSwgXCJ3ZWJpeGFwcHN0YXJ0XCIpO1xyXG4gICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMud2ViaXguaHRtbC5yZW1vdmVDc3Mobm9kZSwgXCJ3ZWJpeGFwcHN0YXJ0XCIpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy53ZWJpeC5odG1sLmFkZENzcyhub2RlLCBcIndlYml4YXBwXCIpO1xyXG4gICAgICAgICAgICB9LCAxMCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICghcm91dGUpIHtcclxuICAgICAgICAgICAgLy8gaWYgbm8gdXJsIGRlZmluZWQsIGNoZWNrIHJvdXRlciBmaXJzdFxyXG4gICAgICAgICAgICBsZXQgdXJsU3RyaW5nID0gdGhpcy4kcm91dGVyLmdldCgpO1xyXG4gICAgICAgICAgICBpZiAoIXVybFN0cmluZykge1xyXG4gICAgICAgICAgICAgICAgdXJsU3RyaW5nID0gdGhpcy5jb25maWcuc3RhcnQ7XHJcbiAgICAgICAgICAgICAgICB0aGlzLiRyb3V0ZXIuc2V0KHVybFN0cmluZywgeyBzaWxlbnQ6IHRydWUgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcm91dGUgPSBuZXcgUm91dGUodXJsU3RyaW5nLCAwKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZiAodGhpcy5hcHApIHtcclxuICAgICAgICAgICAgcm91dGUuY3VycmVudCgpLnZpZXcgPSB0aGlzO1xyXG4gICAgICAgICAgICBpZiAocm91dGUubmV4dCgpKSB7XHJcbiAgICAgICAgICAgICAgICByb3V0ZS5yZWZyZXNoKCk7XHJcbiAgICAgICAgICAgICAgICByb3V0ZSA9IHJvdXRlLnNwbGl0KCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICByb3V0ZSA9IG5ldyBSb3V0ZSh0aGlzLmNvbmZpZy5zdGFydCwgMCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHJvdXRlO1xyXG4gICAgfVxyXG4gICAgLy8gZXJyb3IgZHVyaW5nIHZpZXcgcmVzb2x2aW5nXHJcbiAgICBfbG9hZEVycm9yKHVybCwgZXJyKSB7XHJcbiAgICAgICAgdGhpcy5lcnJvcihcImFwcDplcnJvcjpyZXNvbHZlXCIsIFtlcnIsIHVybF0pO1xyXG4gICAgICAgIHJldHVybiB7IHRlbXBsYXRlOiBcIiBcIiB9O1xyXG4gICAgfVxyXG4gICAgYWRkU3ViVmlldyhvYmosIHRhcmdldCwgY29uZmlnKSB7XHJcbiAgICAgICAgY29uc3QgdXJsID0gb2JqLiRzdWJ2aWV3ICE9PSB0cnVlID8gb2JqLiRzdWJ2aWV3IDogbnVsbDtcclxuICAgICAgICBjb25zdCBuYW1lID0gb2JqLm5hbWUgfHwgKHVybCA/IHRoaXMud2ViaXgudWlkKCkgOiBcImRlZmF1bHRcIik7XHJcbiAgICAgICAgdGFyZ2V0LmlkID0gb2JqLmlkIHx8IFwic1wiICsgdGhpcy53ZWJpeC51aWQoKTtcclxuICAgICAgICBjb25zdCB2aWV3ID0gY29uZmlnW25hbWVdID0ge1xyXG4gICAgICAgICAgICBpZDogdGFyZ2V0LmlkLFxyXG4gICAgICAgICAgICB1cmwsXHJcbiAgICAgICAgICAgIGJyYW5jaDogb2JqLmJyYW5jaCxcclxuICAgICAgICAgICAgcG9wdXA6IG9iai5wb3B1cFxyXG4gICAgICAgIH07XHJcbiAgICAgICAgcmV0dXJuIHZpZXcucG9wdXAgPyBudWxsIDogdGFyZ2V0O1xyXG4gICAgfVxyXG59XG5cbmNsYXNzIEhhc2hSb3V0ZXIge1xyXG4gICAgY29uc3RydWN0b3IoY2IsIGNvbmZpZykge1xyXG4gICAgICAgIHRoaXMuY29uZmlnID0gY29uZmlnIHx8IHt9O1xyXG4gICAgICAgIHRoaXMuX2RldGVjdFByZWZpeCgpO1xyXG4gICAgICAgIHRoaXMuY2IgPSBjYjtcclxuICAgICAgICB3aW5kb3cub25wb3BzdGF0ZSA9ICgpID0+IHRoaXMuY2IodGhpcy5nZXQoKSk7XHJcbiAgICB9XHJcbiAgICBzZXQocGF0aCwgY29uZmlnKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuY29uZmlnLnJvdXRlcykge1xyXG4gICAgICAgICAgICBjb25zdCBjb21wYXJlID0gcGF0aC5zcGxpdChcIj9cIiwgMik7XHJcbiAgICAgICAgICAgIGZvciAoY29uc3Qga2V5IGluIHRoaXMuY29uZmlnLnJvdXRlcykge1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuY29uZmlnLnJvdXRlc1trZXldID09PSBjb21wYXJlWzBdKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcGF0aCA9IGtleSArIChjb21wYXJlLmxlbmd0aCA+IDEgPyBcIj9cIiArIGNvbXBhcmVbMV0gOiBcIlwiKTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodGhpcy5nZXQoKSAhPT0gcGF0aCkge1xyXG4gICAgICAgICAgICB3aW5kb3cuaGlzdG9yeS5wdXNoU3RhdGUobnVsbCwgbnVsbCwgdGhpcy5wcmVmaXggKyB0aGlzLnN1Zml4ICsgcGF0aCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICghY29uZmlnIHx8ICFjb25maWcuc2lsZW50KSB7XHJcbiAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4gdGhpcy5jYihwYXRoKSwgMSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgZ2V0KCkge1xyXG4gICAgICAgIGxldCBwYXRoID0gdGhpcy5fZ2V0UmF3KCkucmVwbGFjZSh0aGlzLnByZWZpeCwgXCJcIikucmVwbGFjZSh0aGlzLnN1Zml4LCBcIlwiKTtcclxuICAgICAgICBwYXRoID0gKHBhdGggIT09IFwiL1wiICYmIHBhdGggIT09IFwiI1wiKSA/IHBhdGggOiBcIlwiO1xyXG4gICAgICAgIGlmICh0aGlzLmNvbmZpZy5yb3V0ZXMpIHtcclxuICAgICAgICAgICAgY29uc3QgY29tcGFyZSA9IHBhdGguc3BsaXQoXCI/XCIsIDIpO1xyXG4gICAgICAgICAgICBjb25zdCBrZXkgPSB0aGlzLmNvbmZpZy5yb3V0ZXNbY29tcGFyZVswXV07XHJcbiAgICAgICAgICAgIGlmIChrZXkpIHtcclxuICAgICAgICAgICAgICAgIHBhdGggPSBrZXkgKyAoY29tcGFyZS5sZW5ndGggPiAxID8gXCI/XCIgKyBjb21wYXJlWzFdIDogXCJcIik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHBhdGg7XHJcbiAgICB9XHJcbiAgICBfZGV0ZWN0UHJlZml4KCkge1xyXG4gICAgICAgIC8vIHVzZSBcIiMhXCIgZm9yIGJhY2t3YXJkIGNvbXBhdGliaWxpdHlcclxuICAgICAgICBjb25zdCBzdWZpeCA9IHRoaXMuY29uZmlnLnJvdXRlclByZWZpeDtcclxuICAgICAgICB0aGlzLnN1Zml4ID0gXCIjXCIgKyAoKHR5cGVvZiBzdWZpeCA9PT0gXCJ1bmRlZmluZWRcIikgPyBcIiFcIiA6IHN1Zml4KTtcclxuICAgICAgICB0aGlzLnByZWZpeCA9IGRvY3VtZW50LmxvY2F0aW9uLmhyZWYuc3BsaXQoXCIjXCIsIDIpWzBdO1xyXG4gICAgfVxyXG4gICAgX2dldFJhdygpIHtcclxuICAgICAgICByZXR1cm4gZG9jdW1lbnQubG9jYXRpb24uaHJlZjtcclxuICAgIH1cclxufVxuXG5sZXQgaXNQYXRjaGVkID0gZmFsc2U7XHJcbmZ1bmN0aW9uIHBhdGNoKHcpIHtcclxuICAgIGlmIChpc1BhdGNoZWQgfHwgIXcpIHtcclxuICAgICAgICByZXR1cm47XHJcbiAgICB9XHJcbiAgICBpc1BhdGNoZWQgPSB0cnVlO1xyXG4gICAgLy8gY3VzdG9tIHByb21pc2UgZm9yIElFOFxyXG4gICAgY29uc3Qgd2luID0gd2luZG93O1xyXG4gICAgaWYgKCF3aW4uUHJvbWlzZSkge1xyXG4gICAgICAgIHdpbi5Qcm9taXNlID0gdy5wcm9taXNlO1xyXG4gICAgfVxyXG4gICAgY29uc3QgdmVyc2lvbiA9IHcudmVyc2lvbi5zcGxpdChcIi5cIik7XHJcbiAgICAvLyB3aWxsIGJlIGZpeGVkIGluIHdlYml4IDUuM1xyXG4gICAgaWYgKHZlcnNpb25bMF0gKiAxMCArIHZlcnNpb25bMV0gKiAxIDwgNTMpIHtcclxuICAgICAgICB3LnVpLmZyZWV6ZSA9IGZ1bmN0aW9uIChoYW5kbGVyKSB7XHJcbiAgICAgICAgICAgIC8vIGRpc2FibGVkIGJlY2F1c2Ugd2ViaXggamV0IDUuMCBjYW4ndCBoYW5kbGUgcmVzaXplIG9mIHNjcm9sbHZpZXcgY29ycmVjdGx5XHJcbiAgICAgICAgICAgIC8vIHcudWkuJGZyZWV6ZSA9IHRydWU7XHJcbiAgICAgICAgICAgIGNvbnN0IHJlcyA9IGhhbmRsZXIoKTtcclxuICAgICAgICAgICAgaWYgKHJlcyAmJiByZXMudGhlbikge1xyXG4gICAgICAgICAgICAgICAgcmVzLnRoZW4oZnVuY3Rpb24gKHNvbWUpIHtcclxuICAgICAgICAgICAgICAgICAgICB3LnVpLiRmcmVlemUgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICB3LnVpLnJlc2l6ZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBzb21lO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB3LnVpLiRmcmVlemUgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIHcudWkucmVzaXplKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIHJlcztcclxuICAgICAgICB9O1xyXG4gICAgfVxyXG4gICAgLy8gYWRkaW5nIHZpZXdzIGFzIGNsYXNzZXNcclxuICAgIGNvbnN0IGJhc2VBZGQgPSB3LnVpLmJhc2VsYXlvdXQucHJvdG90eXBlLmFkZFZpZXc7XHJcbiAgICBjb25zdCBiYXNlUmVtb3ZlID0gdy51aS5iYXNlbGF5b3V0LnByb3RvdHlwZS5yZW1vdmVWaWV3O1xyXG4gICAgY29uc3QgY29uZmlnID0ge1xyXG4gICAgICAgIGFkZFZpZXcodmlldywgaW5kZXgpIHtcclxuICAgICAgICAgICAgLy8gdHJpZ2dlciBsb2dpYyBvbmx5IGZvciB3aWRnZXRzIGluc2lkZSBvZiBqZXQtdmlld1xyXG4gICAgICAgICAgICAvLyBpZ25vcmUgY2FzZSB3aGVuIGFkZFZpZXcgdXNlZCB3aXRoIGFscmVhZHkgaW5pdGlhbGl6ZWQgd2lkZ2V0XHJcbiAgICAgICAgICAgIGlmICh0aGlzLiRzY29wZSAmJiB0aGlzLiRzY29wZS53ZWJpeEpldCAmJiAhdmlldy5xdWVyeVZpZXcpIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGp2aWV3ID0gdGhpcy4kc2NvcGU7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBzdWJzID0ge307XHJcbiAgICAgICAgICAgICAgICB2aWV3ID0ganZpZXcuYXBwLmNvcHlDb25maWcodmlldywge30sIHN1YnMpO1xyXG4gICAgICAgICAgICAgICAgYmFzZUFkZC5hcHBseSh0aGlzLCBbdmlldywgaW5kZXhdKTtcclxuICAgICAgICAgICAgICAgIGZvciAoY29uc3Qga2V5IGluIHN1YnMpIHtcclxuICAgICAgICAgICAgICAgICAgICBqdmlldy5fcmVuZGVyRnJhbWUoa2V5LCBzdWJzW2tleV0sIG51bGwpLnRoZW4oKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBqdmlldy5fc3Vic1trZXldID0gc3Vic1trZXldO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHZpZXcuaWQ7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gYmFzZUFkZC5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuICAgICAgICByZW1vdmVWaWV3KCkge1xyXG4gICAgICAgICAgICBiYXNlUmVtb3ZlLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLiRzY29wZSAmJiB0aGlzLiRzY29wZS53ZWJpeEpldCkge1xyXG4gICAgICAgICAgICAgICAgY29uc3Qgc3VicyA9IHRoaXMuJHNjb3BlLl9zdWJzO1xyXG4gICAgICAgICAgICAgICAgLy8gY2hlY2sgYWxsIHN1Yi12aWV3cywgZGVzdHJveSBhbmQgY2xlYW4gdGhlIHJlbW92ZWQgb25lXHJcbiAgICAgICAgICAgICAgICBmb3IgKGNvbnN0IGtleSBpbiBzdWJzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgdGVzdCA9IHN1YnNba2V5XTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoIXcuJCQodGVzdC5pZCkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGVzdC52aWV3LmRlc3RydWN0b3IoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZGVsZXRlIHN1YnNba2V5XTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9O1xyXG4gICAgdy5leHRlbmQody51aS5sYXlvdXQucHJvdG90eXBlLCBjb25maWcsIHRydWUpO1xyXG4gICAgdy5leHRlbmQody51aS5iYXNlbGF5b3V0LnByb3RvdHlwZSwgY29uZmlnLCB0cnVlKTtcclxuICAgIC8vIHdyYXBwZXIgZm9yIHVzaW5nIEpldCBBcHBzIGFzIHZpZXdzXHJcbiAgICB3LnByb3RvVUkoe1xyXG4gICAgICAgIG5hbWU6IFwiamV0YXBwXCIsXHJcbiAgICAgICAgJGluaXQoY2ZnKSB7XHJcbiAgICAgICAgICAgIHRoaXMuJGFwcCA9IG5ldyB0aGlzLmFwcChjZmcpO1xyXG4gICAgICAgICAgICBjb25zdCBpZCA9IHcudWlkKCkudG9TdHJpbmcoKTtcclxuICAgICAgICAgICAgY2ZnLmJvZHkgPSB7IGlkIH07XHJcbiAgICAgICAgICAgIHRoaXMuJHJlYWR5LnB1c2goZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy4kYXBwLnJlbmRlcih7IGlkIH0pO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgZm9yICh2YXIga2V5IGluIHRoaXMuJGFwcCkge1xyXG4gICAgICAgICAgICAgICAgdmFyIG9yaWdpbiA9IHRoaXMuJGFwcFtrZXldO1xyXG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBvcmlnaW4gPT09IFwiZnVuY3Rpb25cIiAmJiAhdGhpc1trZXldKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpc1trZXldID0gb3JpZ2luLmJpbmQodGhpcy4kYXBwKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH0sIHcudWkucHJveHkpO1xyXG59XG5cbmNsYXNzIEpldEFwcCBleHRlbmRzIEpldEFwcEJhc2Uge1xyXG4gICAgY29uc3RydWN0b3IoY29uZmlnKSB7XHJcbiAgICAgICAgY29uZmlnLnJvdXRlciA9IGNvbmZpZy5yb3V0ZXIgfHwgSGFzaFJvdXRlcjtcclxuICAgICAgICBzdXBlcihjb25maWcpO1xyXG4gICAgICAgIHBhdGNoKHRoaXMud2ViaXgpO1xyXG4gICAgfVxyXG4gICAgX2xvYWRWaWV3RHluYW1pYyh1cmwpIHtcclxuICAgICAgICB1cmwgPSB1cmwucmVwbGFjZSgvXFwuL2csIFwiL1wiKTtcclxuICAgICAgICByZXR1cm4gcmVxdWlyZShcImpldC12aWV3cy9cIiArIHVybCk7XHJcbiAgICB9XHJcbn1cblxuY2xhc3MgU3RvcmVSb3V0ZXIge1xyXG4gICAgY29uc3RydWN0b3IoY2IsIGNvbmZpZywgYXBwKSB7XHJcbiAgICAgICAgdGhpcy5zdG9yYWdlID0gY29uZmlnLnN0b3JhZ2UgfHwgYXBwLndlYml4LnN0b3JhZ2Uuc2Vzc2lvbjtcclxuICAgICAgICB0aGlzLm5hbWUgPSAoY29uZmlnLnN0b3JlTmFtZSB8fCBjb25maWcuaWQgKyBcIjpyb3V0ZVwiKTtcclxuICAgICAgICB0aGlzLmNiID0gY2I7XHJcbiAgICB9XHJcbiAgICBzZXQocGF0aCwgY29uZmlnKSB7XHJcbiAgICAgICAgdGhpcy5zdG9yYWdlLnB1dCh0aGlzLm5hbWUsIHBhdGgpO1xyXG4gICAgICAgIGlmICghY29uZmlnIHx8ICFjb25maWcuc2lsZW50KSB7XHJcbiAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4gdGhpcy5jYihwYXRoKSwgMSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgZ2V0KCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnN0b3JhZ2UuZ2V0KHRoaXMubmFtZSk7XHJcbiAgICB9XHJcbn1cblxuY2xhc3MgVXJsUm91dGVyIGV4dGVuZHMgSGFzaFJvdXRlciB7XHJcbiAgICBfZGV0ZWN0UHJlZml4KCkge1xyXG4gICAgICAgIHRoaXMucHJlZml4ID0gXCJcIjtcclxuICAgICAgICB0aGlzLnN1Zml4ID0gdGhpcy5jb25maWcucm91dGVyUHJlZml4IHx8IFwiXCI7XHJcbiAgICB9XHJcbiAgICBfZ2V0UmF3KCkge1xyXG4gICAgICAgIHJldHVybiBkb2N1bWVudC5sb2NhdGlvbi5wYXRobmFtZSArIChkb2N1bWVudC5sb2NhdGlvbi5zZWFyY2ggfHwgXCJcIik7XHJcbiAgICB9XHJcbn1cblxuY2xhc3MgRW1wdHlSb3V0ZXIge1xyXG4gICAgY29uc3RydWN0b3IoY2IsIF8kY29uZmlnKSB7XHJcbiAgICAgICAgdGhpcy5wYXRoID0gXCJcIjtcclxuICAgICAgICB0aGlzLmNiID0gY2I7XHJcbiAgICB9XHJcbiAgICBzZXQocGF0aCwgY29uZmlnKSB7XHJcbiAgICAgICAgdGhpcy5wYXRoID0gcGF0aDtcclxuICAgICAgICBpZiAoIWNvbmZpZyB8fCAhY29uZmlnLnNpbGVudCkge1xyXG4gICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHRoaXMuY2IocGF0aCksIDEpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGdldCgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5wYXRoO1xyXG4gICAgfVxyXG59XG5cbmZ1bmN0aW9uIFVubG9hZEd1YXJkKGFwcCwgdmlldywgY29uZmlnKSB7XHJcbiAgICB2aWV3Lm9uKGFwcCwgYGFwcDpndWFyZGAsIGZ1bmN0aW9uIChfJHVybCwgcG9pbnQsIHByb21pc2UpIHtcclxuICAgICAgICBpZiAocG9pbnQgPT09IHZpZXcgfHwgcG9pbnQuY29udGFpbnModmlldykpIHtcclxuICAgICAgICAgICAgY29uc3QgcmVzID0gY29uZmlnKCk7XHJcbiAgICAgICAgICAgIGlmIChyZXMgPT09IGZhbHNlKSB7XHJcbiAgICAgICAgICAgICAgICBwcm9taXNlLmNvbmZpcm0gPSBQcm9taXNlLnJlamVjdChuZXcgTmF2aWdhdGlvbkJsb2NrZWQoKSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBwcm9taXNlLmNvbmZpcm0gPSBwcm9taXNlLmNvbmZpcm0udGhlbigoKSA9PiByZXMpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcbn1cblxuLy8gICAgIChjKSAyMDEyLTIwMTggQWlyYm5iLCBJbmMuXG5cbi8vIHZhciBoYXMgPSByZXF1aXJlKCdoYXMnKTtcbmZ1bmN0aW9uIGhhcyhzdG9yZSwga2V5KSB7XG4gIHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoc3RvcmUsIGtleSk7XG59XG4vLyB2YXIgZm9yRWFjaCA9IHJlcXVpcmUoJ2Zvci1lYWNoJyk7XG5mdW5jdGlvbiBmb3JFYWNoKG9iaiwgaGFuZGxlciwgY29udGV4dCkge1xuICBmb3IgKHZhciBrZXkgaW4gb2JqKSB7XG4gICAgaWYgKGhhcyhvYmosIGtleSkpIHtcbiAgICAgIGhhbmRsZXIuY2FsbCgoY29udGV4dCB8fCBvYmopLCBvYmpba2V5XSwga2V5LCBvYmopO1xuICAgIH1cbiAgfVxufVxuLy8gdmFyIHRyaW0gPSByZXF1aXJlKCdzdHJpbmcucHJvdG90eXBlLnRyaW0nKTtcbmZ1bmN0aW9uIHRyaW0oc3RyKSB7XG4gIHJldHVybiBzdHIucmVwbGFjZSgvXltcXHNcXHVGRUZGXFx4QTBdK3xbXFxzXFx1RkVGRlxceEEwXSskL2csICcnKTtcbn1cbi8vIHZhciB3YXJuaW5nID0gcmVxdWlyZSgnd2FybmluZycpO1xuZnVuY3Rpb24gd2FybihtZXNzYWdlKSB7XG4gIG1lc3NhZ2UgPSAnV2FybmluZzogJyArIG1lc3NhZ2U7XG4gIGlmICh0eXBlb2YgY29uc29sZSAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICBjb25zb2xlLmVycm9yKG1lc3NhZ2UpO1xuICB9XG5cbiAgdHJ5IHsgdGhyb3cgbmV3IEVycm9yKG1lc3NhZ2UpOyB9IGNhdGNoICh4KSB7fVxufVxuXG52YXIgcmVwbGFjZSA9IFN0cmluZy5wcm90b3R5cGUucmVwbGFjZTtcbnZhciBzcGxpdCA9IFN0cmluZy5wcm90b3R5cGUuc3BsaXQ7XG5cbi8vICMjIyMgUGx1cmFsaXphdGlvbiBtZXRob2RzXG4vLyBUaGUgc3RyaW5nIHRoYXQgc2VwYXJhdGVzIHRoZSBkaWZmZXJlbnQgcGhyYXNlIHBvc3NpYmlsaXRpZXMuXG52YXIgZGVsaW1pdGVyID0gJ3x8fHwnO1xuXG52YXIgcnVzc2lhblBsdXJhbEdyb3VwcyA9IGZ1bmN0aW9uIChuKSB7XG4gIHZhciBlbmQgPSBuICUgMTA7XG4gIGlmIChuICE9PSAxMSAmJiBlbmQgPT09IDEpIHtcbiAgICByZXR1cm4gMDtcbiAgfVxuICBpZiAoMiA8PSBlbmQgJiYgZW5kIDw9IDQgJiYgIShuID49IDEyICYmIG4gPD0gMTQpKSB7XG4gICAgcmV0dXJuIDE7XG4gIH1cbiAgcmV0dXJuIDI7XG59O1xuXG4vLyBNYXBwaW5nIGZyb20gcGx1cmFsaXphdGlvbiBncm91cCBwbHVyYWwgbG9naWMuXG52YXIgcGx1cmFsVHlwZXMgPSB7XG4gIGFyYWJpYzogZnVuY3Rpb24gKG4pIHtcbiAgICAvLyBodHRwOi8vd3d3LmFyYWJleWVzLm9yZy9QbHVyYWxfRm9ybXNcbiAgICBpZiAobiA8IDMpIHsgcmV0dXJuIG47IH1cbiAgICB2YXIgbGFzdFR3byA9IG4gJSAxMDA7XG4gICAgaWYgKGxhc3RUd28gPj0gMyAmJiBsYXN0VHdvIDw9IDEwKSByZXR1cm4gMztcbiAgICByZXR1cm4gbGFzdFR3byA+PSAxMSA/IDQgOiA1O1xuICB9LFxuICBib3NuaWFuX3NlcmJpYW46IHJ1c3NpYW5QbHVyYWxHcm91cHMsXG4gIGNoaW5lc2U6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIDA7IH0sXG4gIGNyb2F0aWFuOiBydXNzaWFuUGx1cmFsR3JvdXBzLFxuICBmcmVuY2g6IGZ1bmN0aW9uIChuKSB7IHJldHVybiBuID4gMSA/IDEgOiAwOyB9LFxuICBnZXJtYW46IGZ1bmN0aW9uIChuKSB7IHJldHVybiBuICE9PSAxID8gMSA6IDA7IH0sXG4gIHJ1c3NpYW46IHJ1c3NpYW5QbHVyYWxHcm91cHMsXG4gIGxpdGh1YW5pYW46IGZ1bmN0aW9uIChuKSB7XG4gICAgaWYgKG4gJSAxMCA9PT0gMSAmJiBuICUgMTAwICE9PSAxMSkgeyByZXR1cm4gMDsgfVxuICAgIHJldHVybiBuICUgMTAgPj0gMiAmJiBuICUgMTAgPD0gOSAmJiAobiAlIDEwMCA8IDExIHx8IG4gJSAxMDAgPiAxOSkgPyAxIDogMjtcbiAgfSxcbiAgY3plY2g6IGZ1bmN0aW9uIChuKSB7XG4gICAgaWYgKG4gPT09IDEpIHsgcmV0dXJuIDA7IH1cbiAgICByZXR1cm4gKG4gPj0gMiAmJiBuIDw9IDQpID8gMSA6IDI7XG4gIH0sXG4gIHBvbGlzaDogZnVuY3Rpb24gKG4pIHtcbiAgICBpZiAobiA9PT0gMSkgeyByZXR1cm4gMDsgfVxuICAgIHZhciBlbmQgPSBuICUgMTA7XG4gICAgcmV0dXJuIDIgPD0gZW5kICYmIGVuZCA8PSA0ICYmIChuICUgMTAwIDwgMTAgfHwgbiAlIDEwMCA+PSAyMCkgPyAxIDogMjtcbiAgfSxcbiAgaWNlbGFuZGljOiBmdW5jdGlvbiAobikgeyByZXR1cm4gKG4gJSAxMCAhPT0gMSB8fCBuICUgMTAwID09PSAxMSkgPyAxIDogMDsgfSxcbiAgc2xvdmVuaWFuOiBmdW5jdGlvbiAobikge1xuICAgIHZhciBsYXN0VHdvID0gbiAlIDEwMDtcbiAgICBpZiAobGFzdFR3byA9PT0gMSkge1xuICAgICAgcmV0dXJuIDA7XG4gICAgfVxuICAgIGlmIChsYXN0VHdvID09PSAyKSB7XG4gICAgICByZXR1cm4gMTtcbiAgICB9XG4gICAgaWYgKGxhc3RUd28gPT09IDMgfHwgbGFzdFR3byA9PT0gNCkge1xuICAgICAgcmV0dXJuIDI7XG4gICAgfVxuICAgIHJldHVybiAzO1xuICB9XG59O1xuXG5cbi8vIE1hcHBpbmcgZnJvbSBwbHVyYWxpemF0aW9uIGdyb3VwIHRvIGluZGl2aWR1YWwgbGFuZ3VhZ2UgY29kZXMvbG9jYWxlcy5cbi8vIFdpbGwgbG9vayB1cCBiYXNlZCBvbiBleGFjdCBtYXRjaCwgaWYgbm90IGZvdW5kIGFuZCBpdCdzIGEgbG9jYWxlIHdpbGwgcGFyc2UgdGhlIGxvY2FsZVxuLy8gZm9yIGxhbmd1YWdlIGNvZGUsIGFuZCBpZiB0aGF0IGRvZXMgbm90IGV4aXN0IHdpbGwgZGVmYXVsdCB0byAnZW4nXG52YXIgcGx1cmFsVHlwZVRvTGFuZ3VhZ2VzID0ge1xuICBhcmFiaWM6IFsnYXInXSxcbiAgYm9zbmlhbl9zZXJiaWFuOiBbJ2JzLUxhdG4tQkEnLCAnYnMtQ3lybC1CQScsICdzcmwtUlMnLCAnc3ItUlMnXSxcbiAgY2hpbmVzZTogWydpZCcsICdpZC1JRCcsICdqYScsICdrbycsICdrby1LUicsICdsbycsICdtcycsICd0aCcsICd0aC1USCcsICd6aCddLFxuICBjcm9hdGlhbjogWydocicsICdoci1IUiddLFxuICBnZXJtYW46IFsnZmEnLCAnZGEnLCAnZGUnLCAnZW4nLCAnZXMnLCAnZmknLCAnZWwnLCAnaGUnLCAnaGktSU4nLCAnaHUnLCAnaHUtSFUnLCAnaXQnLCAnbmwnLCAnbm8nLCAncHQnLCAnc3YnLCAndHInXSxcbiAgZnJlbmNoOiBbJ2ZyJywgJ3RsJywgJ3B0LWJyJ10sXG4gIHJ1c3NpYW46IFsncnUnLCAncnUtUlUnXSxcbiAgbGl0aHVhbmlhbjogWydsdCddLFxuICBjemVjaDogWydjcycsICdjcy1DWicsICdzayddLFxuICBwb2xpc2g6IFsncGwnXSxcbiAgaWNlbGFuZGljOiBbJ2lzJ10sXG4gIHNsb3ZlbmlhbjogWydzbC1TTCddXG59O1xuXG5mdW5jdGlvbiBsYW5nVG9UeXBlTWFwKG1hcHBpbmcpIHtcbiAgdmFyIHJldCA9IHt9O1xuICBmb3JFYWNoKG1hcHBpbmcsIGZ1bmN0aW9uIChsYW5ncywgdHlwZSkge1xuICAgIGZvckVhY2gobGFuZ3MsIGZ1bmN0aW9uIChsYW5nKSB7XG4gICAgICByZXRbbGFuZ10gPSB0eXBlO1xuICAgIH0pO1xuICB9KTtcbiAgcmV0dXJuIHJldDtcbn1cblxuZnVuY3Rpb24gcGx1cmFsVHlwZU5hbWUobG9jYWxlKSB7XG4gIHZhciBsYW5nVG9QbHVyYWxUeXBlID0gbGFuZ1RvVHlwZU1hcChwbHVyYWxUeXBlVG9MYW5ndWFnZXMpO1xuICByZXR1cm4gbGFuZ1RvUGx1cmFsVHlwZVtsb2NhbGVdXG4gICAgfHwgbGFuZ1RvUGx1cmFsVHlwZVtzcGxpdC5jYWxsKGxvY2FsZSwgLy0vLCAxKVswXV1cbiAgICB8fCBsYW5nVG9QbHVyYWxUeXBlLmVuO1xufVxuXG5mdW5jdGlvbiBwbHVyYWxUeXBlSW5kZXgobG9jYWxlLCBjb3VudCkge1xuICByZXR1cm4gcGx1cmFsVHlwZXNbcGx1cmFsVHlwZU5hbWUobG9jYWxlKV0oY291bnQpO1xufVxuXG5mdW5jdGlvbiBlc2NhcGUodG9rZW4pIHtcbiAgcmV0dXJuIHRva2VuLnJlcGxhY2UoL1suKis/XiR7fSgpfFtcXF1cXFxcXS9nLCAnXFxcXCQmJyk7XG59XG5cbmZ1bmN0aW9uIGNvbnN0cnVjdFRva2VuUmVnZXgob3B0cykge1xuICB2YXIgcHJlZml4ID0gKG9wdHMgJiYgb3B0cy5wcmVmaXgpIHx8ICcleyc7XG4gIHZhciBzdWZmaXggPSAob3B0cyAmJiBvcHRzLnN1ZmZpeCkgfHwgJ30nO1xuXG4gIGlmIChwcmVmaXggPT09IGRlbGltaXRlciB8fCBzdWZmaXggPT09IGRlbGltaXRlcikge1xuICAgIHRocm93IG5ldyBSYW5nZUVycm9yKCdcIicgKyBkZWxpbWl0ZXIgKyAnXCIgdG9rZW4gaXMgcmVzZXJ2ZWQgZm9yIHBsdXJhbGl6YXRpb24nKTtcbiAgfVxuXG4gIHJldHVybiBuZXcgUmVnRXhwKGVzY2FwZShwcmVmaXgpICsgJyguKj8pJyArIGVzY2FwZShzdWZmaXgpLCAnZycpO1xufVxuXG52YXIgZG9sbGFyUmVnZXggPSAvXFwkL2c7XG52YXIgZG9sbGFyQmlsbHNZYWxsID0gJyQkJztcbnZhciBkZWZhdWx0VG9rZW5SZWdleCA9IC8lXFx7KC4qPylcXH0vZztcblxuLy8gIyMjIHRyYW5zZm9ybVBocmFzZShwaHJhc2UsIHN1YnN0aXR1dGlvbnMsIGxvY2FsZSlcbi8vXG4vLyBUYWtlcyBhIHBocmFzZSBzdHJpbmcgYW5kIHRyYW5zZm9ybXMgaXQgYnkgY2hvb3NpbmcgdGhlIGNvcnJlY3Rcbi8vIHBsdXJhbCBmb3JtIGFuZCBpbnRlcnBvbGF0aW5nIGl0LlxuLy9cbi8vICAgICB0cmFuc2Zvcm1QaHJhc2UoJ0hlbGxvLCAle25hbWV9IScsIHtuYW1lOiAnU3Bpa2UnfSk7XG4vLyAgICAgLy8gXCJIZWxsbywgU3Bpa2UhXCJcbi8vXG4vLyBUaGUgY29ycmVjdCBwbHVyYWwgZm9ybSBpcyBzZWxlY3RlZCBpZiBzdWJzdGl0dXRpb25zLnNtYXJ0X2NvdW50XG4vLyBpcyBzZXQuIFlvdSBjYW4gcGFzcyBpbiBhIG51bWJlciBpbnN0ZWFkIG9mIGFuIE9iamVjdCBhcyBgc3Vic3RpdHV0aW9uc2Bcbi8vIGFzIGEgc2hvcnRjdXQgZm9yIGBzbWFydF9jb3VudGAuXG4vL1xuLy8gICAgIHRyYW5zZm9ybVBocmFzZSgnJXtzbWFydF9jb3VudH0gbmV3IG1lc3NhZ2VzIHx8fHwgMSBuZXcgbWVzc2FnZScsIHtzbWFydF9jb3VudDogMX0sICdlbicpO1xuLy8gICAgIC8vIFwiMSBuZXcgbWVzc2FnZVwiXG4vL1xuLy8gICAgIHRyYW5zZm9ybVBocmFzZSgnJXtzbWFydF9jb3VudH0gbmV3IG1lc3NhZ2VzIHx8fHwgMSBuZXcgbWVzc2FnZScsIHtzbWFydF9jb3VudDogMn0sICdlbicpO1xuLy8gICAgIC8vIFwiMiBuZXcgbWVzc2FnZXNcIlxuLy9cbi8vICAgICB0cmFuc2Zvcm1QaHJhc2UoJyV7c21hcnRfY291bnR9IG5ldyBtZXNzYWdlcyB8fHx8IDEgbmV3IG1lc3NhZ2UnLCA1LCAnZW4nKTtcbi8vICAgICAvLyBcIjUgbmV3IG1lc3NhZ2VzXCJcbi8vXG4vLyBZb3Ugc2hvdWxkIHBhc3MgaW4gYSB0aGlyZCBhcmd1bWVudCwgdGhlIGxvY2FsZSwgdG8gc3BlY2lmeSB0aGUgY29ycmVjdCBwbHVyYWwgdHlwZS5cbi8vIEl0IGRlZmF1bHRzIHRvIGAnZW4nYCB3aXRoIDIgcGx1cmFsIGZvcm1zLlxuZnVuY3Rpb24gdHJhbnNmb3JtUGhyYXNlKHBocmFzZSwgc3Vic3RpdHV0aW9ucywgbG9jYWxlLCB0b2tlblJlZ2V4KSB7XG4gIGlmICh0eXBlb2YgcGhyYXNlICE9PSAnc3RyaW5nJykge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ1BvbHlnbG90LnRyYW5zZm9ybVBocmFzZSBleHBlY3RzIGFyZ3VtZW50ICMxIHRvIGJlIHN0cmluZycpO1xuICB9XG5cbiAgaWYgKHN1YnN0aXR1dGlvbnMgPT0gbnVsbCkge1xuICAgIHJldHVybiBwaHJhc2U7XG4gIH1cblxuICB2YXIgcmVzdWx0ID0gcGhyYXNlO1xuICB2YXIgaW50ZXJwb2xhdGlvblJlZ2V4ID0gdG9rZW5SZWdleCB8fCBkZWZhdWx0VG9rZW5SZWdleDtcblxuICAvLyBhbGxvdyBudW1iZXIgYXMgYSBwbHVyYWxpemF0aW9uIHNob3J0Y3V0XG4gIHZhciBvcHRpb25zID0gdHlwZW9mIHN1YnN0aXR1dGlvbnMgPT09ICdudW1iZXInID8geyBzbWFydF9jb3VudDogc3Vic3RpdHV0aW9ucyB9IDogc3Vic3RpdHV0aW9ucztcblxuICAvLyBTZWxlY3QgcGx1cmFsIGZvcm06IGJhc2VkIG9uIGEgcGhyYXNlIHRleHQgdGhhdCBjb250YWlucyBgbmBcbiAgLy8gcGx1cmFsIGZvcm1zIHNlcGFyYXRlZCBieSBgZGVsaW1pdGVyYCwgYSBgbG9jYWxlYCwgYW5kIGEgYHN1YnN0aXR1dGlvbnMuc21hcnRfY291bnRgLFxuICAvLyBjaG9vc2UgdGhlIGNvcnJlY3QgcGx1cmFsIGZvcm0uIFRoaXMgaXMgb25seSBkb25lIGlmIGBjb3VudGAgaXMgc2V0LlxuICBpZiAob3B0aW9ucy5zbWFydF9jb3VudCAhPSBudWxsICYmIHJlc3VsdCkge1xuICAgIHZhciB0ZXh0cyA9IHNwbGl0LmNhbGwocmVzdWx0LCBkZWxpbWl0ZXIpO1xuICAgIHJlc3VsdCA9IHRyaW0odGV4dHNbcGx1cmFsVHlwZUluZGV4KGxvY2FsZSB8fCAnZW4nLCBvcHRpb25zLnNtYXJ0X2NvdW50KV0gfHwgdGV4dHNbMF0pO1xuICB9XG5cbiAgLy8gSW50ZXJwb2xhdGU6IENyZWF0ZXMgYSBgUmVnRXhwYCBvYmplY3QgZm9yIGVhY2ggaW50ZXJwb2xhdGlvbiBwbGFjZWhvbGRlci5cbiAgcmVzdWx0ID0gcmVwbGFjZS5jYWxsKHJlc3VsdCwgaW50ZXJwb2xhdGlvblJlZ2V4LCBmdW5jdGlvbiAoZXhwcmVzc2lvbiwgYXJndW1lbnQpIHtcbiAgICBpZiAoIWhhcyhvcHRpb25zLCBhcmd1bWVudCkgfHwgb3B0aW9uc1thcmd1bWVudF0gPT0gbnVsbCkgeyByZXR1cm4gZXhwcmVzc2lvbjsgfVxuICAgIC8vIEVuc3VyZSByZXBsYWNlbWVudCB2YWx1ZSBpcyBlc2NhcGVkIHRvIHByZXZlbnQgc3BlY2lhbCAkLXByZWZpeGVkIHJlZ2V4IHJlcGxhY2UgdG9rZW5zLlxuICAgIHJldHVybiByZXBsYWNlLmNhbGwob3B0aW9uc1thcmd1bWVudF0sIGRvbGxhclJlZ2V4LCBkb2xsYXJCaWxsc1lhbGwpO1xuICB9KTtcblxuICByZXR1cm4gcmVzdWx0O1xufVxuXG4vLyAjIyMgUG9seWdsb3QgY2xhc3MgY29uc3RydWN0b3JcbmZ1bmN0aW9uIFBvbHlnbG90KG9wdGlvbnMpIHtcbiAgdmFyIG9wdHMgPSBvcHRpb25zIHx8IHt9O1xuICB0aGlzLnBocmFzZXMgPSB7fTtcbiAgdGhpcy5leHRlbmQob3B0cy5waHJhc2VzIHx8IHt9KTtcbiAgdGhpcy5jdXJyZW50TG9jYWxlID0gb3B0cy5sb2NhbGUgfHwgJ2VuJztcbiAgdmFyIGFsbG93TWlzc2luZyA9IG9wdHMuYWxsb3dNaXNzaW5nID8gdHJhbnNmb3JtUGhyYXNlIDogbnVsbDtcbiAgdGhpcy5vbk1pc3NpbmdLZXkgPSB0eXBlb2Ygb3B0cy5vbk1pc3NpbmdLZXkgPT09ICdmdW5jdGlvbicgPyBvcHRzLm9uTWlzc2luZ0tleSA6IGFsbG93TWlzc2luZztcbiAgdGhpcy53YXJuID0gb3B0cy53YXJuIHx8IHdhcm47XG4gIHRoaXMudG9rZW5SZWdleCA9IGNvbnN0cnVjdFRva2VuUmVnZXgob3B0cy5pbnRlcnBvbGF0aW9uKTtcbn1cblxuLy8gIyMjIHBvbHlnbG90LmxvY2FsZShbbG9jYWxlXSlcbi8vXG4vLyBHZXQgb3Igc2V0IGxvY2FsZS4gSW50ZXJuYWxseSwgUG9seWdsb3Qgb25seSB1c2VzIGxvY2FsZSBmb3IgcGx1cmFsaXphdGlvbi5cblBvbHlnbG90LnByb3RvdHlwZS5sb2NhbGUgPSBmdW5jdGlvbiAobmV3TG9jYWxlKSB7XG4gIGlmIChuZXdMb2NhbGUpIHRoaXMuY3VycmVudExvY2FsZSA9IG5ld0xvY2FsZTtcbiAgcmV0dXJuIHRoaXMuY3VycmVudExvY2FsZTtcbn07XG5cbi8vICMjIyBwb2x5Z2xvdC5leHRlbmQocGhyYXNlcylcbi8vXG4vLyBVc2UgYGV4dGVuZGAgdG8gdGVsbCBQb2x5Z2xvdCBob3cgdG8gdHJhbnNsYXRlIGEgZ2l2ZW4ga2V5LlxuLy9cbi8vICAgICBwb2x5Z2xvdC5leHRlbmQoe1xuLy8gICAgICAgXCJoZWxsb1wiOiBcIkhlbGxvXCIsXG4vLyAgICAgICBcImhlbGxvX25hbWVcIjogXCJIZWxsbywgJXtuYW1lfVwiXG4vLyAgICAgfSk7XG4vL1xuLy8gVGhlIGtleSBjYW4gYmUgYW55IHN0cmluZy4gIEZlZWwgZnJlZSB0byBjYWxsIGBleHRlbmRgIG11bHRpcGxlIHRpbWVzO1xuLy8gaXQgd2lsbCBvdmVycmlkZSBhbnkgcGhyYXNlcyB3aXRoIHRoZSBzYW1lIGtleSwgYnV0IGxlYXZlIGV4aXN0aW5nIHBocmFzZXNcbi8vIHVudG91Y2hlZC5cbi8vXG4vLyBJdCBpcyBhbHNvIHBvc3NpYmxlIHRvIHBhc3MgbmVzdGVkIHBocmFzZSBvYmplY3RzLCB3aGljaCBnZXQgZmxhdHRlbmVkXG4vLyBpbnRvIGFuIG9iamVjdCB3aXRoIHRoZSBuZXN0ZWQga2V5cyBjb25jYXRlbmF0ZWQgdXNpbmcgZG90IG5vdGF0aW9uLlxuLy9cbi8vICAgICBwb2x5Z2xvdC5leHRlbmQoe1xuLy8gICAgICAgXCJuYXZcIjoge1xuLy8gICAgICAgICBcImhlbGxvXCI6IFwiSGVsbG9cIixcbi8vICAgICAgICAgXCJoZWxsb19uYW1lXCI6IFwiSGVsbG8sICV7bmFtZX1cIixcbi8vICAgICAgICAgXCJzaWRlYmFyXCI6IHtcbi8vICAgICAgICAgICBcIndlbGNvbWVcIjogXCJXZWxjb21lXCJcbi8vICAgICAgICAgfVxuLy8gICAgICAgfVxuLy8gICAgIH0pO1xuLy9cbi8vICAgICBjb25zb2xlLmxvZyhwb2x5Z2xvdC5waHJhc2VzKTtcbi8vICAgICAvLyB7XG4vLyAgICAgLy8gICAnbmF2LmhlbGxvJzogJ0hlbGxvJyxcbi8vICAgICAvLyAgICduYXYuaGVsbG9fbmFtZSc6ICdIZWxsbywgJXtuYW1lfScsXG4vLyAgICAgLy8gICAnbmF2LnNpZGViYXIud2VsY29tZSc6ICdXZWxjb21lJ1xuLy8gICAgIC8vIH1cbi8vXG4vLyBgZXh0ZW5kYCBhY2NlcHRzIGFuIG9wdGlvbmFsIHNlY29uZCBhcmd1bWVudCwgYHByZWZpeGAsIHdoaWNoIGNhbiBiZSB1c2VkXG4vLyB0byBwcmVmaXggZXZlcnkga2V5IGluIHRoZSBwaHJhc2VzIG9iamVjdCB3aXRoIHNvbWUgc3RyaW5nLCB1c2luZyBkb3Rcbi8vIG5vdGF0aW9uLlxuLy9cbi8vICAgICBwb2x5Z2xvdC5leHRlbmQoe1xuLy8gICAgICAgXCJoZWxsb1wiOiBcIkhlbGxvXCIsXG4vLyAgICAgICBcImhlbGxvX25hbWVcIjogXCJIZWxsbywgJXtuYW1lfVwiXG4vLyAgICAgfSwgXCJuYXZcIik7XG4vL1xuLy8gICAgIGNvbnNvbGUubG9nKHBvbHlnbG90LnBocmFzZXMpO1xuLy8gICAgIC8vIHtcbi8vICAgICAvLyAgICduYXYuaGVsbG8nOiAnSGVsbG8nLFxuLy8gICAgIC8vICAgJ25hdi5oZWxsb19uYW1lJzogJ0hlbGxvLCAle25hbWV9J1xuLy8gICAgIC8vIH1cbi8vXG4vLyBUaGlzIGZlYXR1cmUgaXMgdXNlZCBpbnRlcm5hbGx5IHRvIHN1cHBvcnQgbmVzdGVkIHBocmFzZSBvYmplY3RzLlxuUG9seWdsb3QucHJvdG90eXBlLmV4dGVuZCA9IGZ1bmN0aW9uIChtb3JlUGhyYXNlcywgcHJlZml4KSB7XG4gIGZvckVhY2gobW9yZVBocmFzZXMsIGZ1bmN0aW9uIChwaHJhc2UsIGtleSkge1xuICAgIHZhciBwcmVmaXhlZEtleSA9IHByZWZpeCA/IHByZWZpeCArICcuJyArIGtleSA6IGtleTtcbiAgICBpZiAodHlwZW9mIHBocmFzZSA9PT0gJ29iamVjdCcpIHtcbiAgICAgIHRoaXMuZXh0ZW5kKHBocmFzZSwgcHJlZml4ZWRLZXkpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnBocmFzZXNbcHJlZml4ZWRLZXldID0gcGhyYXNlO1xuICAgIH1cbiAgfSwgdGhpcyk7XG59O1xuXG4vLyAjIyMgcG9seWdsb3QudW5zZXQocGhyYXNlcylcbi8vIFVzZSBgdW5zZXRgIHRvIHNlbGVjdGl2ZWx5IHJlbW92ZSBrZXlzIGZyb20gYSBwb2x5Z2xvdCBpbnN0YW5jZS5cbi8vXG4vLyAgICAgcG9seWdsb3QudW5zZXQoXCJzb21lX2tleVwiKTtcbi8vICAgICBwb2x5Z2xvdC51bnNldCh7XG4vLyAgICAgICBcImhlbGxvXCI6IFwiSGVsbG9cIixcbi8vICAgICAgIFwiaGVsbG9fbmFtZVwiOiBcIkhlbGxvLCAle25hbWV9XCJcbi8vICAgICB9KTtcbi8vXG4vLyBUaGUgdW5zZXQgbWV0aG9kIGNhbiB0YWtlIGVpdGhlciBhIHN0cmluZyAoZm9yIHRoZSBrZXkpLCBvciBhbiBvYmplY3QgaGFzaCB3aXRoXG4vLyB0aGUga2V5cyB0aGF0IHlvdSB3b3VsZCBsaWtlIHRvIHVuc2V0LlxuUG9seWdsb3QucHJvdG90eXBlLnVuc2V0ID0gZnVuY3Rpb24gKG1vcmVQaHJhc2VzLCBwcmVmaXgpIHtcbiAgaWYgKHR5cGVvZiBtb3JlUGhyYXNlcyA9PT0gJ3N0cmluZycpIHtcbiAgICBkZWxldGUgdGhpcy5waHJhc2VzW21vcmVQaHJhc2VzXTtcbiAgfSBlbHNlIHtcbiAgICBmb3JFYWNoKG1vcmVQaHJhc2VzLCBmdW5jdGlvbiAocGhyYXNlLCBrZXkpIHtcbiAgICAgIHZhciBwcmVmaXhlZEtleSA9IHByZWZpeCA/IHByZWZpeCArICcuJyArIGtleSA6IGtleTtcbiAgICAgIGlmICh0eXBlb2YgcGhyYXNlID09PSAnb2JqZWN0Jykge1xuICAgICAgICB0aGlzLnVuc2V0KHBocmFzZSwgcHJlZml4ZWRLZXkpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgZGVsZXRlIHRoaXMucGhyYXNlc1twcmVmaXhlZEtleV07XG4gICAgICB9XG4gICAgfSwgdGhpcyk7XG4gIH1cbn07XG5cbi8vICMjIyBwb2x5Z2xvdC5jbGVhcigpXG4vL1xuLy8gQ2xlYXJzIGFsbCBwaHJhc2VzLiBVc2VmdWwgZm9yIHNwZWNpYWwgY2FzZXMsIHN1Y2ggYXMgZnJlZWluZ1xuLy8gdXAgbWVtb3J5IGlmIHlvdSBoYXZlIGxvdHMgb2YgcGhyYXNlcyBidXQgbm8gbG9uZ2VyIG5lZWQgdG9cbi8vIHBlcmZvcm0gYW55IHRyYW5zbGF0aW9uLiBBbHNvIHVzZWQgaW50ZXJuYWxseSBieSBgcmVwbGFjZWAuXG5Qb2x5Z2xvdC5wcm90b3R5cGUuY2xlYXIgPSBmdW5jdGlvbiAoKSB7XG4gIHRoaXMucGhyYXNlcyA9IHt9O1xufTtcblxuLy8gIyMjIHBvbHlnbG90LnJlcGxhY2UocGhyYXNlcylcbi8vXG4vLyBDb21wbGV0ZWx5IHJlcGxhY2UgdGhlIGV4aXN0aW5nIHBocmFzZXMgd2l0aCBhIG5ldyBzZXQgb2YgcGhyYXNlcy5cbi8vIE5vcm1hbGx5LCBqdXN0IHVzZSBgZXh0ZW5kYCB0byBhZGQgbW9yZSBwaHJhc2VzLCBidXQgdW5kZXIgY2VydGFpblxuLy8gY2lyY3Vtc3RhbmNlcywgeW91IG1heSB3YW50IHRvIG1ha2Ugc3VyZSBubyBvbGQgcGhyYXNlcyBhcmUgbHlpbmcgYXJvdW5kLlxuUG9seWdsb3QucHJvdG90eXBlLnJlcGxhY2UgPSBmdW5jdGlvbiAobmV3UGhyYXNlcykge1xuICB0aGlzLmNsZWFyKCk7XG4gIHRoaXMuZXh0ZW5kKG5ld1BocmFzZXMpO1xufTtcblxuXG4vLyAjIyMgcG9seWdsb3QudChrZXksIG9wdGlvbnMpXG4vL1xuLy8gVGhlIG1vc3QtdXNlZCBtZXRob2QuIFByb3ZpZGUgYSBrZXksIGFuZCBgdGAgd2lsbCByZXR1cm4gdGhlXG4vLyBwaHJhc2UuXG4vL1xuLy8gICAgIHBvbHlnbG90LnQoXCJoZWxsb1wiKTtcbi8vICAgICA9PiBcIkhlbGxvXCJcbi8vXG4vLyBUaGUgcGhyYXNlIHZhbHVlIGlzIHByb3ZpZGVkIGZpcnN0IGJ5IGEgY2FsbCB0byBgcG9seWdsb3QuZXh0ZW5kKClgIG9yXG4vLyBgcG9seWdsb3QucmVwbGFjZSgpYC5cbi8vXG4vLyBQYXNzIGluIGFuIG9iamVjdCBhcyB0aGUgc2Vjb25kIGFyZ3VtZW50IHRvIHBlcmZvcm0gaW50ZXJwb2xhdGlvbi5cbi8vXG4vLyAgICAgcG9seWdsb3QudChcImhlbGxvX25hbWVcIiwge25hbWU6IFwiU3Bpa2VcIn0pO1xuLy8gICAgID0+IFwiSGVsbG8sIFNwaWtlXCJcbi8vXG4vLyBJZiB5b3UgbGlrZSwgeW91IGNhbiBwcm92aWRlIGEgZGVmYXVsdCB2YWx1ZSBpbiBjYXNlIHRoZSBwaHJhc2UgaXMgbWlzc2luZy5cbi8vIFVzZSB0aGUgc3BlY2lhbCBvcHRpb24ga2V5IFwiX1wiIHRvIHNwZWNpZnkgYSBkZWZhdWx0LlxuLy9cbi8vICAgICBwb2x5Z2xvdC50KFwiaV9saWtlX3RvX3dyaXRlX2luX2xhbmd1YWdlXCIsIHtcbi8vICAgICAgIF86IFwiSSBsaWtlIHRvIHdyaXRlIGluICV7bGFuZ3VhZ2V9LlwiLFxuLy8gICAgICAgbGFuZ3VhZ2U6IFwiSmF2YVNjcmlwdFwiXG4vLyAgICAgfSk7XG4vLyAgICAgPT4gXCJJIGxpa2UgdG8gd3JpdGUgaW4gSmF2YVNjcmlwdC5cIlxuLy9cblBvbHlnbG90LnByb3RvdHlwZS50ID0gZnVuY3Rpb24gKGtleSwgb3B0aW9ucykge1xuICB2YXIgcGhyYXNlLCByZXN1bHQ7XG4gIHZhciBvcHRzID0gb3B0aW9ucyA9PSBudWxsID8ge30gOiBvcHRpb25zO1xuICBpZiAodHlwZW9mIHRoaXMucGhyYXNlc1trZXldID09PSAnc3RyaW5nJykge1xuICAgIHBocmFzZSA9IHRoaXMucGhyYXNlc1trZXldO1xuICB9IGVsc2UgaWYgKHR5cGVvZiBvcHRzLl8gPT09ICdzdHJpbmcnKSB7XG4gICAgcGhyYXNlID0gb3B0cy5fO1xuICB9IGVsc2UgaWYgKHRoaXMub25NaXNzaW5nS2V5KSB7XG4gICAgdmFyIG9uTWlzc2luZ0tleSA9IHRoaXMub25NaXNzaW5nS2V5O1xuICAgIHJlc3VsdCA9IG9uTWlzc2luZ0tleShrZXksIG9wdHMsIHRoaXMuY3VycmVudExvY2FsZSwgdGhpcy50b2tlblJlZ2V4KTtcbiAgfSBlbHNlIHtcbiAgICB0aGlzLndhcm4oJ01pc3NpbmcgdHJhbnNsYXRpb24gZm9yIGtleTogXCInICsga2V5ICsgJ1wiJyk7XG4gICAgcmVzdWx0ID0ga2V5O1xuICB9XG4gIGlmICh0eXBlb2YgcGhyYXNlID09PSAnc3RyaW5nJykge1xuICAgIHJlc3VsdCA9IHRyYW5zZm9ybVBocmFzZShwaHJhc2UsIG9wdHMsIHRoaXMuY3VycmVudExvY2FsZSwgdGhpcy50b2tlblJlZ2V4KTtcbiAgfVxuICByZXR1cm4gcmVzdWx0O1xufTtcblxuXG4vLyAjIyMgcG9seWdsb3QuaGFzKGtleSlcbi8vXG4vLyBDaGVjayBpZiBwb2x5Z2xvdCBoYXMgYSB0cmFuc2xhdGlvbiBmb3IgZ2l2ZW4ga2V5XG5Qb2x5Z2xvdC5wcm90b3R5cGUuaGFzID0gZnVuY3Rpb24gKGtleSkge1xuICByZXR1cm4gaGFzKHRoaXMucGhyYXNlcywga2V5KTtcbn07XG5cbi8vIGV4cG9ydCB0cmFuc2Zvcm1QaHJhc2VcblBvbHlnbG90LnRyYW5zZm9ybVBocmFzZSA9IGZ1bmN0aW9uIHRyYW5zZm9ybShwaHJhc2UsIHN1YnN0aXR1dGlvbnMsIGxvY2FsZSkge1xuICByZXR1cm4gdHJhbnNmb3JtUGhyYXNlKHBocmFzZSwgc3Vic3RpdHV0aW9ucywgbG9jYWxlKTtcbn07XG5cbnZhciB3ZWJpeFBvbHlnbG90ID0gUG9seWdsb3Q7XG5cbmZ1bmN0aW9uIExvY2FsZShhcHAsIF92aWV3LCBjb25maWcpIHtcclxuICAgIGNvbmZpZyA9IGNvbmZpZyB8fCB7fTtcclxuICAgIGNvbnN0IHN0b3JhZ2UgPSBjb25maWcuc3RvcmFnZTtcclxuICAgIGxldCBsYW5nID0gc3RvcmFnZSA/IChzdG9yYWdlLmdldChcImxhbmdcIikgfHwgXCJlblwiKSA6IChjb25maWcubGFuZyB8fCBcImVuXCIpO1xyXG4gICAgZnVuY3Rpb24gc2V0TGFuZ0RhdGEobmFtZSwgZGF0YSwgc2lsZW50KSB7XHJcbiAgICAgICAgaWYgKGRhdGEuX19lc01vZHVsZSkge1xyXG4gICAgICAgICAgICBkYXRhID0gZGF0YS5kZWZhdWx0O1xyXG4gICAgICAgIH1cclxuICAgICAgICBjb25zdCBwY29uZmlnID0geyBwaHJhc2VzOiBkYXRhIH07XHJcbiAgICAgICAgaWYgKGNvbmZpZy5wb2x5Z2xvdCkge1xyXG4gICAgICAgICAgICBhcHAud2ViaXguZXh0ZW5kKHBjb25maWcsIGNvbmZpZy5wb2x5Z2xvdCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNvbnN0IHBvbHkgPSBzZXJ2aWNlLnBvbHlnbG90ID0gbmV3IHdlYml4UG9seWdsb3QocGNvbmZpZyk7XHJcbiAgICAgICAgcG9seS5sb2NhbGUobmFtZSk7XHJcbiAgICAgICAgc2VydmljZS5fID0gYXBwLndlYml4LmJpbmQocG9seS50LCBwb2x5KTtcclxuICAgICAgICBsYW5nID0gbmFtZTtcclxuICAgICAgICBpZiAoc3RvcmFnZSkge1xyXG4gICAgICAgICAgICBzdG9yYWdlLnB1dChcImxhbmdcIiwgbGFuZyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChjb25maWcud2ViaXgpIHtcclxuICAgICAgICAgICAgY29uc3QgbG9jTmFtZSA9IGNvbmZpZy53ZWJpeFtuYW1lXTtcclxuICAgICAgICAgICAgaWYgKGxvY05hbWUpIHtcclxuICAgICAgICAgICAgICAgIGFwcC53ZWJpeC5pMThuLnNldExvY2FsZShsb2NOYW1lKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoIXNpbGVudCkge1xyXG4gICAgICAgICAgICByZXR1cm4gYXBwLnJlZnJlc2goKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSgpO1xyXG4gICAgfVxyXG4gICAgZnVuY3Rpb24gZ2V0TGFuZygpIHsgcmV0dXJuIGxhbmc7IH1cclxuICAgIGZ1bmN0aW9uIHNldExhbmcobmFtZSwgc2lsZW50KSB7XHJcbiAgICAgICAgLy8gaWdub3JlIHNldExhbmcgaWYgbG9hZGluZyBieSBwYXRoIGlzIGRpc2FibGVkXHJcbiAgICAgICAgaWYgKGNvbmZpZy5wYXRoID09PSBmYWxzZSkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNvbnN0IHBhdGggPSAoY29uZmlnLnBhdGggPyBjb25maWcucGF0aCArIFwiL1wiIDogXCJcIikgKyBuYW1lO1xyXG4gICAgICAgIGNvbnN0IGRhdGEgPSByZXF1aXJlKFwiamV0LWxvY2FsZXMvXCIgKyBwYXRoKTtcclxuICAgICAgICBzZXRMYW5nRGF0YShuYW1lLCBkYXRhLCBzaWxlbnQpO1xyXG4gICAgfVxyXG4gICAgY29uc3Qgc2VydmljZSA9IHtcclxuICAgICAgICBnZXRMYW5nLCBzZXRMYW5nLCBzZXRMYW5nRGF0YSwgXzogbnVsbCwgcG9seWdsb3Q6IG51bGxcclxuICAgIH07XHJcbiAgICBhcHAuc2V0U2VydmljZShcImxvY2FsZVwiLCBzZXJ2aWNlKTtcclxuICAgIHNldExhbmcobGFuZywgdHJ1ZSk7XHJcbn1cblxuZnVuY3Rpb24gc2hvdyh2aWV3LCBjb25maWcsIHZhbHVlKSB7XHJcbiAgICBpZiAoY29uZmlnLnVybHMpIHtcclxuICAgICAgICB2YWx1ZSA9IGNvbmZpZy51cmxzW3ZhbHVlXSB8fCB2YWx1ZTtcclxuICAgIH1cclxuICAgIGVsc2UgaWYgKGNvbmZpZy5wYXJhbSkge1xyXG4gICAgICAgIHZhbHVlID0geyBbY29uZmlnLnBhcmFtXTogdmFsdWUgfTtcclxuICAgIH1cclxuICAgIHZpZXcuc2hvdyh2YWx1ZSk7XHJcbn1cclxuZnVuY3Rpb24gTWVudShhcHAsIHZpZXcsIGNvbmZpZykge1xyXG4gICAgY29uc3QgZnJhbWUgPSB2aWV3LmdldFN1YlZpZXdJbmZvKCkucGFyZW50O1xyXG4gICAgY29uc3QgdWkgPSB2aWV3LiQkKGNvbmZpZy5pZCB8fCBjb25maWcpO1xyXG4gICAgbGV0IHNpbGVudCA9IGZhbHNlO1xyXG4gICAgdWkuYXR0YWNoRXZlbnQoXCJvbmNoYW5nZVwiLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgaWYgKCFzaWxlbnQpIHtcclxuICAgICAgICAgICAgc2hvdyhmcmFtZSwgY29uZmlnLCB0aGlzLmdldFZhbHVlKCkpO1xyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG4gICAgdWkuYXR0YWNoRXZlbnQoXCJvbmFmdGVyc2VsZWN0XCIsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBpZiAoIXNpbGVudCkge1xyXG4gICAgICAgICAgICBsZXQgaWQgPSBudWxsO1xyXG4gICAgICAgICAgICBpZiAodWkuc2V0VmFsdWUpIHtcclxuICAgICAgICAgICAgICAgIGlkID0gdGhpcy5nZXRWYWx1ZSgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2UgaWYgKHVpLmdldFNlbGVjdGVkSWQpIHtcclxuICAgICAgICAgICAgICAgIGlkID0gdWkuZ2V0U2VsZWN0ZWRJZCgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHNob3coZnJhbWUsIGNvbmZpZywgaWQpO1xyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG4gICAgdmlldy5vbihhcHAsIGBhcHA6cm91dGVgLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgbGV0IG5hbWUgPSBcIlwiO1xyXG4gICAgICAgIGlmIChjb25maWcucGFyYW0pIHtcclxuICAgICAgICAgICAgbmFtZSA9IHZpZXcuZ2V0UGFyYW0oY29uZmlnLnBhcmFtLCB0cnVlKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHNlZ21lbnQgPSBmcmFtZS5nZXRVcmwoKVsxXTtcclxuICAgICAgICAgICAgaWYgKHNlZ21lbnQpIHtcclxuICAgICAgICAgICAgICAgIG5hbWUgPSBzZWdtZW50LnBhZ2U7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKG5hbWUpIHtcclxuICAgICAgICAgICAgc2lsZW50ID0gdHJ1ZTtcclxuICAgICAgICAgICAgaWYgKHVpLnNldFZhbHVlICYmIHVpLmdldFZhbHVlKCkgIT09IG5hbWUpIHtcclxuICAgICAgICAgICAgICAgIHVpLnNldFZhbHVlKG5hbWUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2UgaWYgKHVpLnNlbGVjdCAmJiB1aS5leGlzdHMobmFtZSkgJiYgdWkuZ2V0U2VsZWN0ZWRJZCgpICE9PSBuYW1lKSB7XHJcbiAgICAgICAgICAgICAgICB1aS5zZWxlY3QobmFtZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgc2lsZW50ID0gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcbn1cblxuY29uc3QgYmFzZWljb25zID0ge1xyXG4gICAgZ29vZDogXCJjaGVja1wiLFxyXG4gICAgZXJyb3I6IFwid2FybmluZ1wiLFxyXG4gICAgc2F2aW5nOiBcInJlZnJlc2ggZmEtc3BpblwiXHJcbn07XHJcbmNvbnN0IGJhc2V0ZXh0ID0ge1xyXG4gICAgZ29vZDogXCJPa1wiLFxyXG4gICAgZXJyb3I6IFwiRXJyb3JcIixcclxuICAgIHNhdmluZzogXCJDb25uZWN0aW5nLi4uXCJcclxufTtcclxuZnVuY3Rpb24gU3RhdHVzKGFwcCwgdmlldywgY29uZmlnKSB7XHJcbiAgICBsZXQgc3RhdHVzID0gXCJnb29kXCI7XHJcbiAgICBsZXQgY291bnQgPSAwO1xyXG4gICAgbGV0IGlzZXJyb3IgPSBmYWxzZTtcclxuICAgIGxldCBleHBpcmVEZWxheSA9IGNvbmZpZy5leHBpcmU7XHJcbiAgICBpZiAoIWV4cGlyZURlbGF5ICYmIGV4cGlyZURlbGF5ICE9PSBmYWxzZSkge1xyXG4gICAgICAgIGV4cGlyZURlbGF5ID0gMjAwMDtcclxuICAgIH1cclxuICAgIGNvbnN0IHRleHRzID0gY29uZmlnLnRleHRzIHx8IGJhc2V0ZXh0O1xyXG4gICAgY29uc3QgaWNvbnMgPSBjb25maWcuaWNvbnMgfHwgYmFzZWljb25zO1xyXG4gICAgaWYgKHR5cGVvZiBjb25maWcgPT09IFwic3RyaW5nXCIpIHtcclxuICAgICAgICBjb25maWcgPSB7IHRhcmdldDogY29uZmlnIH07XHJcbiAgICB9XHJcbiAgICBmdW5jdGlvbiByZWZyZXNoKGNvbnRlbnQpIHtcclxuICAgICAgICBjb25zdCBhcmVhID0gdmlldy4kJChjb25maWcudGFyZ2V0KTtcclxuICAgICAgICBpZiAoYXJlYSkge1xyXG4gICAgICAgICAgICBpZiAoIWNvbnRlbnQpIHtcclxuICAgICAgICAgICAgICAgIGNvbnRlbnQgPSBcIjxkaXYgY2xhc3M9J3N0YXR1c19cIiArXHJcbiAgICAgICAgICAgICAgICAgICAgc3RhdHVzICtcclxuICAgICAgICAgICAgICAgICAgICBcIic+PHNwYW4gY2xhc3M9J3dlYml4X2ljb24gZmEtXCIgK1xyXG4gICAgICAgICAgICAgICAgICAgIGljb25zW3N0YXR1c10gKyBcIic+PC9zcGFuPiBcIiArIHRleHRzW3N0YXR1c10gKyBcIjwvZGl2PlwiO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGFyZWEuc2V0SFRNTChjb250ZW50KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBmdW5jdGlvbiBzdWNjZXNzKCkge1xyXG4gICAgICAgIGNvdW50LS07XHJcbiAgICAgICAgc2V0U3RhdHVzKFwiZ29vZFwiKTtcclxuICAgIH1cclxuICAgIGZ1bmN0aW9uIGZhaWwoZXJyKSB7XHJcbiAgICAgICAgY291bnQtLTtcclxuICAgICAgICBzZXRTdGF0dXMoXCJlcnJvclwiLCBlcnIpO1xyXG4gICAgfVxyXG4gICAgZnVuY3Rpb24gc3RhcnQocHJvbWlzZSkge1xyXG4gICAgICAgIGNvdW50Kys7XHJcbiAgICAgICAgc2V0U3RhdHVzKFwic2F2aW5nXCIpO1xyXG4gICAgICAgIGlmIChwcm9taXNlICYmIHByb21pc2UudGhlbikge1xyXG4gICAgICAgICAgICBwcm9taXNlLnRoZW4oc3VjY2VzcywgZmFpbCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgZnVuY3Rpb24gZ2V0U3RhdHVzKCkge1xyXG4gICAgICAgIHJldHVybiBzdGF0dXM7XHJcbiAgICB9XHJcbiAgICBmdW5jdGlvbiBoaWRlU3RhdHVzKCkge1xyXG4gICAgICAgIGlmIChjb3VudCA9PT0gMCkge1xyXG4gICAgICAgICAgICByZWZyZXNoKFwiIFwiKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBmdW5jdGlvbiBzZXRTdGF0dXMobW9kZSwgZXJyKSB7XHJcbiAgICAgICAgaWYgKGNvdW50IDwgMCkge1xyXG4gICAgICAgICAgICBjb3VudCA9IDA7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChtb2RlID09PSBcInNhdmluZ1wiKSB7XHJcbiAgICAgICAgICAgIHN0YXR1cyA9IFwic2F2aW5nXCI7XHJcbiAgICAgICAgICAgIHJlZnJlc2goKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIGlzZXJyb3IgPSAobW9kZSA9PT0gXCJlcnJvclwiKTtcclxuICAgICAgICAgICAgaWYgKGNvdW50ID09PSAwKSB7XHJcbiAgICAgICAgICAgICAgICBzdGF0dXMgPSBpc2Vycm9yID8gXCJlcnJvclwiIDogXCJnb29kXCI7XHJcbiAgICAgICAgICAgICAgICBpZiAoaXNlcnJvcikge1xyXG4gICAgICAgICAgICAgICAgICAgIGFwcC5lcnJvcihcImFwcDplcnJvcjpzZXJ2ZXJcIiwgW2Vyci5yZXNwb25zZVRleHQgfHwgZXJyXSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoZXhwaXJlRGVsYXkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2V0VGltZW91dChoaWRlU3RhdHVzLCBleHBpcmVEZWxheSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgcmVmcmVzaCgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgZnVuY3Rpb24gdHJhY2soZGF0YSkge1xyXG4gICAgICAgIGNvbnN0IGRwID0gYXBwLndlYml4LmRwKGRhdGEpO1xyXG4gICAgICAgIGlmIChkcCkge1xyXG4gICAgICAgICAgICB2aWV3Lm9uKGRwLCBcIm9uQWZ0ZXJEYXRhU2VuZFwiLCBzdGFydCk7XHJcbiAgICAgICAgICAgIHZpZXcub24oZHAsIFwib25BZnRlclNhdmVFcnJvclwiLCAoX2lkLCBfb2JqLCByZXNwb25zZSkgPT4gZmFpbChyZXNwb25zZSkpO1xyXG4gICAgICAgICAgICB2aWV3Lm9uKGRwLCBcIm9uQWZ0ZXJTYXZlXCIsIHN1Y2Nlc3MpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGFwcC5zZXRTZXJ2aWNlKFwic3RhdHVzXCIsIHtcclxuICAgICAgICBnZXRTdGF0dXMsXHJcbiAgICAgICAgc2V0U3RhdHVzLFxyXG4gICAgICAgIHRyYWNrXHJcbiAgICB9KTtcclxuICAgIGlmIChjb25maWcucmVtb3RlKSB7XHJcbiAgICAgICAgdmlldy5vbihhcHAud2ViaXgsIFwib25SZW1vdGVDYWxsXCIsIHN0YXJ0KTtcclxuICAgIH1cclxuICAgIGlmIChjb25maWcuYWpheCkge1xyXG4gICAgICAgIHZpZXcub24oYXBwLndlYml4LCBcIm9uQmVmb3JlQWpheFwiLCAoX21vZGUsIF91cmwsIF9kYXRhLCBfcmVxdWVzdCwgX2hlYWRlcnMsIF9maWxlcywgcHJvbWlzZSkgPT4ge1xyXG4gICAgICAgICAgICBzdGFydChwcm9taXNlKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuICAgIGlmIChjb25maWcuZGF0YSkge1xyXG4gICAgICAgIHRyYWNrKGNvbmZpZy5kYXRhKTtcclxuICAgIH1cclxufVxuXG5mdW5jdGlvbiBUaGVtZShhcHAsIF92aWV3LCBjb25maWcpIHtcclxuICAgIGNvbmZpZyA9IGNvbmZpZyB8fCB7fTtcclxuICAgIGNvbnN0IHN0b3JhZ2UgPSBjb25maWcuc3RvcmFnZTtcclxuICAgIGxldCB0aGVtZSA9IHN0b3JhZ2UgP1xyXG4gICAgICAgIChzdG9yYWdlLmdldChcInRoZW1lXCIpIHx8IFwiZmxhdC1kZWZhdWx0XCIpXHJcbiAgICAgICAgOlxyXG4gICAgICAgICAgICAoY29uZmlnLnRoZW1lIHx8IFwiZmxhdC1kZWZhdWx0XCIpO1xyXG4gICAgY29uc3Qgc2VydmljZSA9IHtcclxuICAgICAgICBnZXRUaGVtZSgpIHsgcmV0dXJuIHRoZW1lOyB9LFxyXG4gICAgICAgIHNldFRoZW1lKG5hbWUsIHNpbGVudCkge1xyXG4gICAgICAgICAgICBjb25zdCBwYXJ0cyA9IG5hbWUuc3BsaXQoXCItXCIpO1xyXG4gICAgICAgICAgICBjb25zdCBsaW5rcyA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKFwibGlua1wiKTtcclxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsaW5rcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgbG5hbWUgPSBsaW5rc1tpXS5nZXRBdHRyaWJ1dGUoXCJ0aXRsZVwiKTtcclxuICAgICAgICAgICAgICAgIGlmIChsbmFtZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChsbmFtZSA9PT0gbmFtZSB8fCBsbmFtZSA9PT0gcGFydHNbMF0pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGlua3NbaV0uZGlzYWJsZWQgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxpbmtzW2ldLmRpc2FibGVkID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgYXBwLndlYml4LnNraW4uc2V0KHBhcnRzWzBdKTtcclxuICAgICAgICAgICAgLy8gcmVtb3ZlIG9sZCBjc3NcclxuICAgICAgICAgICAgYXBwLndlYml4Lmh0bWwucmVtb3ZlQ3NzKGRvY3VtZW50LmJvZHksIFwidGhlbWUtXCIgKyB0aGVtZSk7XHJcbiAgICAgICAgICAgIC8vIGFkZCBuZXcgY3NzXHJcbiAgICAgICAgICAgIGFwcC53ZWJpeC5odG1sLmFkZENzcyhkb2N1bWVudC5ib2R5LCBcInRoZW1lLVwiICsgbmFtZSk7XHJcbiAgICAgICAgICAgIHRoZW1lID0gbmFtZTtcclxuICAgICAgICAgICAgaWYgKHN0b3JhZ2UpIHtcclxuICAgICAgICAgICAgICAgIHN0b3JhZ2UucHV0KFwidGhlbWVcIiwgbmFtZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKCFzaWxlbnQpIHtcclxuICAgICAgICAgICAgICAgIGFwcC5yZWZyZXNoKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9O1xyXG4gICAgYXBwLnNldFNlcnZpY2UoXCJ0aGVtZVwiLCBzZXJ2aWNlKTtcclxuICAgIHNlcnZpY2Uuc2V0VGhlbWUodGhlbWUsIHRydWUpO1xyXG59XG5cbmZ1bmN0aW9uIGNvcHlQYXJhbXMoZGF0YSwgdXJsLCByb3V0ZSkge1xyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCByb3V0ZS5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgIGRhdGFbcm91dGVbaV1dID0gdXJsW2kgKyAxXSA/IHVybFtpICsgMV0ucGFnZSA6IFwiXCI7XHJcbiAgICB9XHJcbn1cclxuZnVuY3Rpb24gVXJsUGFyYW0oYXBwLCB2aWV3LCBjb25maWcpIHtcclxuICAgIGNvbnN0IHJvdXRlID0gY29uZmlnLnJvdXRlIHx8IGNvbmZpZztcclxuICAgIGNvbnN0IGRhdGEgPSB7fTtcclxuICAgIHZpZXcub24oYXBwLCBcImFwcDp1cmxjaGFuZ2VcIiwgZnVuY3Rpb24gKHN1YnZpZXcsIHNlZ21lbnQpIHtcclxuICAgICAgICBpZiAodmlldyA9PT0gc3Vidmlldykge1xyXG4gICAgICAgICAgICBjb3B5UGFyYW1zKGRhdGEsIHNlZ21lbnQuc3VidXJsKCksIHJvdXRlKTtcclxuICAgICAgICAgICAgc2VnbWVudC5zaXplKHJvdXRlLmxlbmd0aCArIDEpO1xyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG4gICAgY29uc3Qgb3MgPSB2aWV3LnNldFBhcmFtO1xyXG4gICAgY29uc3Qgb2cgPSB2aWV3LmdldFBhcmFtO1xyXG4gICAgdmlldy5zZXRQYXJhbSA9IGZ1bmN0aW9uIChuYW1lLCB2YWx1ZSwgc2hvdykge1xyXG4gICAgICAgIGNvbnN0IGluZGV4ID0gcm91dGUuaW5kZXhPZihuYW1lKTtcclxuICAgICAgICBpZiAoaW5kZXggPj0gMCkge1xyXG4gICAgICAgICAgICBkYXRhW25hbWVdID0gdmFsdWU7XHJcbiAgICAgICAgICAgIHRoaXMuX3NlZ21lbnQudXBkYXRlKFwiXCIsIHZhbHVlLCBpbmRleCArIDEpO1xyXG4gICAgICAgICAgICBpZiAoc2hvdykge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHZpZXcuc2hvdyhudWxsKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgcmV0dXJuIG9zLmNhbGwodGhpcywgbmFtZSwgdmFsdWUsIHNob3cpO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcbiAgICB2aWV3LmdldFBhcmFtID0gZnVuY3Rpb24gKGtleSwgbW9kZSkge1xyXG4gICAgICAgIGNvbnN0IHZhbCA9IGRhdGFba2V5XTtcclxuICAgICAgICBpZiAodHlwZW9mIHZhbCAhPT0gXCJ1bmRlZmluZWRcIikge1xyXG4gICAgICAgICAgICByZXR1cm4gdmFsO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gb2cuY2FsbCh0aGlzLCBrZXksIG1vZGUpO1xyXG4gICAgfTtcclxuICAgIGNvcHlQYXJhbXMoZGF0YSwgdmlldy5nZXRVcmwoKSwgcm91dGUpO1xyXG59XG5cbmZ1bmN0aW9uIFVzZXIoYXBwLCBfdmlldywgY29uZmlnKSB7XHJcbiAgICBjb25maWcgPSBjb25maWcgfHwge307XHJcbiAgICBjb25zdCBsb2dpbiA9IGNvbmZpZy5sb2dpbiB8fCBcIi9sb2dpblwiO1xyXG4gICAgY29uc3QgbG9nb3V0ID0gY29uZmlnLmxvZ291dCB8fCBcIi9sb2dvdXRcIjtcclxuICAgIGNvbnN0IGFmdGVyTG9naW4gPSBjb25maWcuYWZ0ZXJMb2dpbiB8fCBhcHAuY29uZmlnLnN0YXJ0O1xyXG4gICAgY29uc3QgYWZ0ZXJMb2dvdXQgPSBjb25maWcuYWZ0ZXJMb2dvdXQgfHwgXCIvbG9naW5cIjtcclxuICAgIGNvbnN0IHBpbmcgPSBjb25maWcucGluZyB8fCA1ICogNjAgKiAxMDAwO1xyXG4gICAgY29uc3QgbW9kZWwgPSBjb25maWcubW9kZWw7XHJcbiAgICBsZXQgdXNlciA9IGNvbmZpZy51c2VyO1xyXG4gICAgY29uc3Qgc2VydmljZSA9IHtcclxuICAgICAgICBnZXRVc2VyKCkge1xyXG4gICAgICAgICAgICByZXR1cm4gdXNlcjtcclxuICAgICAgICB9LFxyXG4gICAgICAgIGdldFN0YXR1cyhzZXJ2ZXIpIHtcclxuICAgICAgICAgICAgaWYgKCFzZXJ2ZXIpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiB1c2VyICE9PSBudWxsO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiBtb2RlbC5zdGF0dXMoKS5jYXRjaCgoKSA9PiBudWxsKS50aGVuKGRhdGEgPT4ge1xyXG4gICAgICAgICAgICAgICAgdXNlciA9IGRhdGE7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgbG9naW4obmFtZSwgcGFzcykge1xyXG4gICAgICAgICAgICByZXR1cm4gbW9kZWwubG9naW4obmFtZSwgcGFzcykudGhlbihkYXRhID0+IHtcclxuICAgICAgICAgICAgICAgIHVzZXIgPSBkYXRhO1xyXG4gICAgICAgICAgICAgICAgaWYgKCFkYXRhKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiQWNjZXNzIGRlbmllZFwiKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGFwcC5jYWxsRXZlbnQoXCJhcHA6dXNlcjpsb2dpblwiLCBbdXNlcl0pO1xyXG4gICAgICAgICAgICAgICAgYXBwLnNob3coYWZ0ZXJMb2dpbik7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgbG9nb3V0KCkge1xyXG4gICAgICAgICAgICB1c2VyID0gbnVsbDtcclxuICAgICAgICAgICAgcmV0dXJuIG1vZGVsLmxvZ291dCgpLnRoZW4ocmVzID0+IHtcclxuICAgICAgICAgICAgICAgIGFwcC5jYWxsRXZlbnQoXCJhcHA6dXNlcjpsb2dvdXRcIiwgW10pO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlcztcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuICAgIGZ1bmN0aW9uIGNhbk5hdmlnYXRlKHVybCwgb2JqKSB7XHJcbiAgICAgICAgaWYgKHVybCA9PT0gbG9nb3V0KSB7XHJcbiAgICAgICAgICAgIHNlcnZpY2UubG9nb3V0KCk7XHJcbiAgICAgICAgICAgIG9iai5yZWRpcmVjdCA9IGFmdGVyTG9nb3V0O1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmICh1cmwgIT09IGxvZ2luICYmICFzZXJ2aWNlLmdldFN0YXR1cygpKSB7XHJcbiAgICAgICAgICAgIG9iai5yZWRpcmVjdCA9IGxvZ2luO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGFwcC5zZXRTZXJ2aWNlKFwidXNlclwiLCBzZXJ2aWNlKTtcclxuICAgIGFwcC5hdHRhY2hFdmVudChgYXBwOmd1YXJkYCwgZnVuY3Rpb24gKHVybCwgXyRyb290LCBvYmopIHtcclxuICAgICAgICBpZiAoY29uZmlnLnB1YmxpYyAmJiBjb25maWcucHVibGljKHVybCkpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0eXBlb2YgdXNlciA9PT0gXCJ1bmRlZmluZWRcIikge1xyXG4gICAgICAgICAgICBvYmouY29uZmlybSA9IHNlcnZpY2UuZ2V0U3RhdHVzKHRydWUpLnRoZW4oKCkgPT4gY2FuTmF2aWdhdGUodXJsLCBvYmopKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGNhbk5hdmlnYXRlKHVybCwgb2JqKTtcclxuICAgIH0pO1xyXG4gICAgaWYgKHBpbmcpIHtcclxuICAgICAgICBzZXRJbnRlcnZhbCgoKSA9PiBzZXJ2aWNlLmdldFN0YXR1cyh0cnVlKSwgcGluZyk7XHJcbiAgICB9XHJcbn1cblxuLypcclxuTUlUIExpY2Vuc2VcclxuQ29weXJpZ2h0IChjKSAyMDE5IFhCIFNvZnR3YXJlXHJcbiovXHJcbmxldCB3ZWJpeCA9IHdpbmRvdy53ZWJpeDtcclxuaWYgKHdlYml4KSB7XHJcbiAgICBwYXRjaCh3ZWJpeCk7XHJcbn1cclxuY29uc3QgcGx1Z2lucyA9IHtcclxuICAgIFVubG9hZEd1YXJkLCBMb2NhbGUsIE1lbnUsIFRoZW1lLCBVc2VyLCBTdGF0dXMsIFVybFBhcmFtXHJcbn07XHJcbmNvbnN0IGVycm9ycyA9IHsgTmF2aWdhdGlvbkJsb2NrZWQgfTtcclxuY29uc3QgdyA9IHdpbmRvdztcclxuaWYgKCF3LlByb21pc2UpIHtcclxuICAgIHcuUHJvbWlzZSA9IHcud2ViaXgucHJvbWlzZTtcclxufVxuXG5leHBvcnQgeyBwbHVnaW5zLCBlcnJvcnMsIEpldEFwcCwgSmV0VmlldywgSGFzaFJvdXRlciwgU3RvcmVSb3V0ZXIsIFVybFJvdXRlciwgRW1wdHlSb3V0ZXIsIFN1YlJvdXRlciB9O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9amV0LmpzLm1hcFxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vbm9kZV9tb2R1bGVzL3dlYml4LWpldC9kaXN0L2VzNi9qZXQuanMiLCJpbXBvcnQgeyBKZXRWaWV3IH0gZnJvbSBcIndlYml4LWpldFwiO1xuaW1wb3J0IHsgcGFja2FnZXMgfSBmcm9tIFwiLi4vLi4vc2VydmljZXMvcGFja2FnZXNcIjtcblxuY29uc3QgU1RBVFVTX0lOU1RBTExFRCA9IDM7XG5cbmV4cG9ydCBjbGFzcyBFeHRlcm5hbFZpZXcgZXh0ZW5kcyBKZXRWaWV3IHtcbiAgICBjb25zdHJ1Y3RvcihhcHAsIG5hbWUsIHRhcmdldFVybCwgcmVxdWlyZWRQYWNrYWdlcykge1xuICAgICAgICBzdXBlcihhcHAsIG5hbWUpO1xuXG4gICAgICAgIHRoaXMudGFyZ2V0VXJsID0gdGFyZ2V0VXJsIHx8IFwiL1wiO1xuICAgICAgICB0aGlzLnJlcXVpcmVkUGFja2FnZXMgPSByZXF1aXJlZFBhY2thZ2VzIHx8IHt9OyAvLyByZXF1aXJlZCBwYWNrYWdlcyBhcyBuYW1lOiBnaXRfdXJsIHBhaXJzXG4gICAgfVxuXG4gICAgY29uZmlnKCkge1xuICAgICAgICBjb25zdCBzZWxmID0gdGhpcztcbiAgICAgICAgY29uc3QgaWZyYW1lID0ge1xuICAgICAgICAgICAgdmlldzogXCJpZnJhbWVcIixcbiAgICAgICAgICAgIGxvY2FsSWQ6IFwiaWZyYW1lLWV4dGVybmFsXCIsXG4gICAgICAgICAgICBvbjoge1xuICAgICAgICAgICAgICAgIG9uQWZ0ZXJMb2FkOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmhpZGVQcm9ncmVzcykge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5oaWRlUHJvZ3Jlc3MoKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB0aGlzLmVuYWJsZSgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcblxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgcm93czogW3tcbiAgICAgICAgICAgICAgICBsb2NhbElkOiBcImluc3RhbGwtcGFja2FnZXNcIixcbiAgICAgICAgICAgICAgICBoaWRkZW46IHRydWUsXG4gICAgICAgICAgICAgICAgY29sczogW1xuICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICBsb2NhbElkOiBcInJlcXVpcmVkX3BhY2thZ2VzX2RpdlwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgdmlldzogXCJ0ZW1wbGF0ZVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgYXV0b2hlaWdodDogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmlldzogXCJidXR0b25cIixcbiAgICAgICAgICAgICAgICAgICAgICAgIGxvY2FsSWQ6IFwiaW5zdGFsbF9idG5cIixcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlOiBcIkluc3RhbGwgcmVxdWlyZWQgcGFja2FnZXNcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIGNzczogXCJ3ZWJpeF9wcmltYXJ5XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBoZWlnaHQ6IDUwLFxuICAgICAgICAgICAgICAgICAgICAgICAgY2xpY2s6IHNlbGYuaW5zdGFsbFJlcXVpcmVkUGFja2FnZXMuYmluZChzZWxmKVxuICAgICAgICAgICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgICAgICAgICB2aWV3OiBcImJ1dHRvblwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgbG9jYWxJZDogXCJnb190b19wYWNrYWdlc19idG5cIixcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlOiBcIkdvIHRvIHBhY2thZ2VzIGFuZCBpbnN0YWxsIHRoZW0gbWFudWFsbHlcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIGNzczogXCJ3ZWJpeF9wcmltYXJ5XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBoZWlnaHQ6IDUwLFxuICAgICAgICAgICAgICAgICAgICAgICAgY2xpY2s6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLiRzY29wZS5zaG93KFwiL21haW4vcGFja2FnZXNcIik7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICB9LCBpZnJhbWVdXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBpbnN0YWxsUmVxdWlyZWRQYWNrYWdlcygpIHtcbiAgICAgICAgbGV0IHByb21pc2VzID0gT2JqZWN0LnZhbHVlcyh0aGlzLnBhY2thZ2VzVG9JbnN0YWxsKS5tYXAoKHBhdGgpID0+IHtcbiAgICAgICAgICAgIC8vIGFkZCBieSBnaXQgdXJsXG4gICAgICAgICAgICByZXR1cm4gcGFja2FnZXMuYWRkKG51bGwsIHBhdGgpO1xuICAgICAgICB9KTtcblxuICAgICAgICB0aGlzLmluc3RhbGxCdXR0b24uZGlzYWJsZSgpO1xuICAgICAgICBQcm9taXNlLmFsbChwcm9taXNlcykudGhlbigoKSA9PiB7XG4gICAgICAgICAgICB3ZWJpeC5tZXNzYWdlKHsgdHlwZTogXCJzdWNjZXNzXCIsIHRleHQ6IFwiQWxsIHJlcXVpcmVkIHBhY2thZ2VzIGluc3RhbGxlZCBzdWNjZXNzZnVsbHksIHBhZ2Ugd2lsbCBiZSByZWxvYWRlZCBpbiAyIHNlY29uZHNcIiB9KTtcbiAgICAgICAgICAgIHNldEludGVydmFsKCgpID0+IHdpbmRvdy5sb2NhdGlvbi5yZWxvYWQodHJ1ZSksIDIwMDApO1xuICAgICAgICB9KS5jYXRjaCgoKSA9PiB7XG4gICAgICAgICAgICB3ZWJpeC5tZXNzYWdlKHsgdHlwZTogXCJlcnJvclwiLCB0ZXh0OiBcIkFuIGVycm9yIG9jY3VycmVkLCBwbGVhc2UgdHJ5IGluc3RhbGxpbmcgZnJvbSBwYWNrYWdlcyBmb3IgbW9yZSBkZXRhaWxzXCIgfSk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHNob3dJZnJhbWUoKSB7XG4gICAgICAgIHRoaXMuZXh0ZXJuYWxJZnJhbWUuc2hvdygpO1xuICAgICAgICB0aGlzLmV4dGVybmFsSWZyYW1lLnNob3dQcm9ncmVzcyh7IHR5cGU6IFwiaWNvblwiIH0pO1xuICAgICAgICB0aGlzLmV4dGVybmFsSWZyYW1lLmxvYWQodGhpcy50YXJnZXRVcmwpO1xuICAgIH1cblxuICAgIGluaXQodmlldykge1xuICAgICAgICB0aGlzLmV4dGVybmFsSWZyYW1lID0gdGhpcy4kJChcImlmcmFtZS1leHRlcm5hbFwiKTtcbiAgICAgICAgdGhpcy5leHRlcm5hbElmcmFtZS5kaXNhYmxlKCk7XG4gICAgICAgIHdlYml4LmV4dGVuZCh0aGlzLmV4dGVybmFsSWZyYW1lLCB3ZWJpeC5Qcm9ncmVzc0Jhcik7XG5cbiAgICAgICAgdGhpcy5wYWNrYWdlTmFtZXMgPSBPYmplY3Qua2V5cyh0aGlzLnJlcXVpcmVkUGFja2FnZXMpOyAvLyBvbmx5IG5hbWVzXG5cbiAgICAgICAgaWYgKCF0aGlzLnBhY2thZ2VOYW1lcy5sZW5ndGgpIHtcbiAgICAgICAgICAgIHRoaXMuc2hvd0lmcmFtZSgpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5yZXF1aXJlZFBhY2thZ2VzRGl2ID0gdGhpcy4kJChcInJlcXVpcmVkX3BhY2thZ2VzX2RpdlwiKTtcbiAgICAgICAgdGhpcy5pbnN0YWxsUGFja2FnZUNvbnRhaW5lciA9IHRoaXMuJCQoXCJpbnN0YWxsLXBhY2thZ2VzXCIpO1xuICAgICAgICB0aGlzLmluc3RhbGxCdXR0b24gPSB0aGlzLiQkKFwiaW5zdGFsbF9idG5cIik7XG5cbiAgICAgICAgLy8gY2hlY2sgd2hpY2ggcGFja2FnZXMgdG8gaW5zdGFsbFxuICAgICAgICB0aGlzLnBhY2thZ2VzVG9JbnN0YWxsID0ge307XG4gICAgICAgIC8vIHRyeSB0byBnZXQgaW5mbyBhYm91dCByZXF1aXJlZCBwYWNrYWdlc1xuICAgICAgICAvLyBpZiBhbnkgaXMgYWxyZWFkeSByZWdpc3RlcmVkIGFuZCBpbnN0YWxsZWQsIHRoZW4ganVzdCBpZ25vcmUgaXRcbiAgICAgICAgcGFja2FnZXMuZ2V0U3RhdHVzKHRoaXMucGFja2FnZU5hbWVzKS50aGVuKGRhdGEgPT4ge1xuICAgICAgICAgICAgY29uc3QgcGFja2FnZVN0YXRlcyA9IGRhdGEuanNvbigpO1xuXG4gICAgICAgICAgICAvLyBub3cgZ28gb3ZlciByZXF1aXJlZCBwYWNrYWdlc1xuICAgICAgICAgICAgZm9yIChsZXQgbmFtZSBvZiB0aGlzLnBhY2thZ2VOYW1lcykge1xuICAgICAgICAgICAgICAgIC8vIGNoZWNrIGlmIGEgcmVxdWlyZWQgcGFja2FnZSBpcyByZWdpc3RlcmVkIGFuZCBpbnN0YWxsZWRcbiAgICAgICAgICAgICAgICBpZiAocGFja2FnZVN0YXRlc1tuYW1lXSA9PSBTVEFUVVNfSU5TVEFMTEVEKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHRoaXMucGFja2FnZXNUb0luc3RhbGxbbmFtZV0gPSB0aGlzLnJlcXVpcmVkUGFja2FnZXNbbmFtZV07XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIGNoZWNrIHBhY2thZ2VzIHRvIGJlIGluc3RhbGxlZCBhZ2FpbiBpZiBzdGlsbCBuZWVkIHRvIGluc3RhbGwgYW55IG9mIHRoZW1cbiAgICAgICAgICAgIGNvbnN0IHBhY2thZ2VOYW1lc1RvSW5zdGFsbCA9IE9iamVjdC5rZXlzKHRoaXMucGFja2FnZXNUb0luc3RhbGwpO1xuICAgICAgICAgICAgaWYgKHBhY2thZ2VOYW1lc1RvSW5zdGFsbC5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmluc3RhbGxQYWNrYWdlQ29udGFpbmVyLnNob3coKTtcbiAgICAgICAgICAgICAgICB0aGlzLmV4dGVybmFsSWZyYW1lLmhpZGUoKTtcblxuICAgICAgICAgICAgICAgIGNvbnN0IG5hbWVzID0gcGFja2FnZU5hbWVzVG9JbnN0YWxsLmpvaW4oXCIsIFwiKTtcbiAgICAgICAgICAgICAgICB0aGlzLnJlcXVpcmVkUGFja2FnZXNEaXYuc2V0SFRNTChcbiAgICAgICAgICAgICAgICAgICAgYDxkaXYgc3R5bGU9J3dpZHRoOmF1dG87dGV4dC1hbGlnbjpjZW50ZXInPjxoMz5Zb3UgbmVlZCB0byBpbnN0YWxsIHRoZSBmb2xsb3dpbmcgcmVxdWlyZWQgcGFja2FnZXM6ICR7bmFtZXN9PGgzLz48L2Rpdj5gXG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5pbnN0YWxsUGFja2FnZUNvbnRhaW5lci5oaWRlKCk7XG4gICAgICAgICAgICAgICAgdGhpcy5zaG93SWZyYW1lKClcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuXG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zb3VyY2VzL3ZpZXdzL2V4dGVybmFsL2luZGV4LmpzIiwiY29uc3QgYWpheCA9IHdlYml4LmFqYXgoKS5oZWFkZXJzKHsgXCJDb250ZW50LVR5cGVcIjogXCJhcHBsaWNhdGlvbi9qc29uXCIgfSk7XG5cbmV4cG9ydCBjbGFzcyBTZXJ2aWNlIHtcbiAgICBjb25zdHJ1Y3RvcihiYXNlVXJsKSB7XG4gICAgICAgIHRoaXMuYmFzZVVybCA9IGJhc2VVcmw7XG4gICAgfVxuXG4gICAgam9pblVybCh1cmwpIHtcbiAgICAgICAgaWYgKHRoaXMuYmFzZVVybCkge1xuICAgICAgICAgICAgcmV0dXJuIGAke3RoaXMuYmFzZVVybH0vJHt1cmx9YDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdXJsO1xuICAgIH1cblxuICAgIGNhbGwobWV0aG9kLCB1cmwsIGFyZ3MpIHtcbiAgICAgICAgbWV0aG9kID0gbWV0aG9kLnRvTG93ZXJDYXNlKCk7XG4gICAgICAgIHVybCA9IHRoaXMuam9pblVybCh1cmwpO1xuXG4gICAgICAgIGlmIChhcmdzKSB7XG4gICAgICAgICAgICBhcmdzID0geyBhcmdzOiBhcmdzIH07XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBhcmdzID0ge307XG4gICAgICAgIH1cblxuICAgICAgICBpZiAobWV0aG9kID09PSBcImdldFwiKSB7XG4gICAgICAgICAgICByZXR1cm4gYWpheC5nZXQodXJsLCBhcmdzKTtcbiAgICAgICAgfSBlbHNlIGlmIChtZXRob2QgPT0gXCJwb3N0XCIpIHtcbiAgICAgICAgICAgIHJldHVybiBhamF4LnBvc3QodXJsLCBhcmdzKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRocm93IFZhbHVlRXJyb3IoYCR7bWV0aG9kfSBpcyBub3Qgc3VwcG9ydGVkYCk7XG4gICAgfVxuXG4gICAgZ2V0Q2FsbCh1cmwsIGFyZ3MpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuY2FsbChcImdldFwiLCB1cmwsIGFyZ3MpO1xuICAgIH1cblxuICAgIHBvc3RDYWxsKHVybCwgYXJncykge1xuICAgICAgICByZXR1cm4gdGhpcy5jYWxsKFwicG9zdFwiLCB1cmwsIGFyZ3MpO1xuICAgIH1cbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NvdXJjZXMvY29tbW9uL2FwaS5qcyIsImltcG9ydCB7IEpldFZpZXcgfSBmcm9tIFwid2ViaXgtamV0XCI7XG5cbmltcG9ydCB7IGFuc2lVcCB9IGZyb20gXCIuLi8uLi9jb21tb24vY29sb3JzXCI7XG5cbmV4cG9ydCBjbGFzcyBFcnJvclZpZXcgZXh0ZW5kcyBKZXRWaWV3IHtcbiAgICBjb25maWcoKSB7XG4gICAgICAgIGNvbnN0IG1lc3NhZ2UgPSB7XG4gICAgICAgICAgICB2aWV3OiBcInRlbXBsYXRlXCIsXG4gICAgICAgICAgICBpZDogXCJlcnJvcl90ZW1wbGF0ZVwiLFxuICAgICAgICAgICAgdGVtcGxhdGU6IFwiXCIsXG4gICAgICAgICAgICBzY3JvbGw6IFwieHlcIlxuICAgICAgICB9O1xuXG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICB2aWV3OiBcIndpbmRvd1wiLFxuICAgICAgICAgICAgaGVhZDogXCJFcnJvclwiLFxuICAgICAgICAgICAgbW9kYWw6IHRydWUsXG4gICAgICAgICAgICB3aWR0aDogMTEwMCxcbiAgICAgICAgICAgIGhlaWdodDogNzAwLFxuICAgICAgICAgICAgcG9zaXRpb246IFwiY2VudGVyXCIsXG4gICAgICAgICAgICBib2R5OiB7XG4gICAgICAgICAgICAgICAgcm93czogW1xuICAgICAgICAgICAgICAgICAgICBtZXNzYWdlLFxuICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICB2aWV3OiBcImJ1dHRvblwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU6IFwiT0tcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIGNzczogXCJ3ZWJpeF9wcmltYXJ5XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBjbGljazogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZ2V0VG9wUGFyZW50VmlldygpLmhpZGUoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIGluaXQoKSB7XG4gICAgICAgIHRoaXMubWVzc2FnZSA9ICQkKFwiZXJyb3JfdGVtcGxhdGVcIik7XG4gICAgfVxuXG4gICAgc2hvd0Vycm9yKG1lc3NhZ2UsIGhlYWQpIHtcbiAgICAgICAgdGhpcy5tZXNzYWdlLnNldEhUTUwoYDxwPiR7YW5zaVVwLmFuc2lfdG9faHRtbChtZXNzYWdlKX08L3A+YCk7XG4gICAgICAgIGlmIChoZWFkKSB7XG4gICAgICAgICAgICB0aGlzLm1lc3NhZ2UuZ2V0SGVhZCgpLnNldEhUTUwoaGVhZCk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmdldFJvb3QoKS5zaG93KCk7XG4gICAgfVxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc291cmNlcy92aWV3cy9lcnJvcnMvZGlhbG9nLmpzIiwiXG5leHBvcnQgY29uc3QgTUFYX01TR19MRU4gPSAxMDA7XG5leHBvcnQgY29uc3QgTEVWRUxTID0ge1xuICAgIDUwOiBcIkNSSVRJQ0FMXCIsXG4gICAgNDA6IFwiRVJST1JcIixcbiAgICAzMDogXCJXQVJOSU5HXCIsXG4gICAgMjA6IFwiSU5GT1wiLFxuICAgIDE1OiBcIlNURE9VVFwiLFxuICAgIDEwOiBcIkRFQlVHXCJcbn07XG5cbmV4cG9ydCBjb25zdCBTVEFURVMgPSBbXG4gICAgJ0NMT1NFRCcsXG4gICAgJ05FVycsXG4gICAgJ09QRU4nLFxuICAgICdSRU9QRU4nXG5dXG5cbmV4cG9ydCBjb25zdCBUWVBFUyA9IFtcbiAgICAnQlVHJyxcbiAgICAnUVVFU1RJT04nLFxuICAgICdFVkVOVF9TWVNURU0nLFxuICAgICdFVkVOVF9NT05JVE9SJyxcbiAgICAnRVZFTlRfT1BFUkFUT1InLFxuXVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc291cmNlcy92aWV3cy9hbGVydHMvZGF0YS5qcyIsImV4cG9ydCBjb25zdCBkYXRlRm9ybWF0ID0gXCIlWS0lbS0lZCAlRzolaTolc1wiO1xuXG5leHBvcnQgY29uc3Qgd2ViaXhEYXRlRm9ybWF0dGVyID0gd2ViaXguRGF0ZS5kYXRlVG9TdHIoZGF0ZUZvcm1hdCk7XG5cbmV4cG9ydCBjb25zdCBkYXRlRm9ybWF0dGVyID0gZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgLy8gZm9ybWF0IGVwb2NoIHRpbWVzdGFtcHNcbiAgICBpZiAodmFsdWUgaW5zdGFuY2VvZiBTdHJpbmcpIHtcbiAgICAgICAgdmFsdWUgPSBwYXJzZUludCh2YWx1ZSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHdlYml4RGF0ZUZvcm1hdHRlcihuZXcgRGF0ZSh2YWx1ZSAqIDEwMDApKTtcbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NvdXJjZXMvY29tbW9uL2Zvcm1hdHRlcnMuanMiLCJpbXBvcnQgeyBTZXJ2aWNlIH0gZnJvbSBcIi4uL2NvbW1vbi9hcGlcIjtcblxuY29uc3QgQkFTRV9VUkwgPSBcIi96ZXJvYm90L2FkbWluL2FjdG9ycy9oZWFsdGhcIjtcblxuY2xhc3MgSGVhbHRoU2VydmljZSBleHRlbmRzIFNlcnZpY2Uge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICBzdXBlcihCQVNFX1VSTCk7XG4gICAgfVxuXG4gICAgZ2V0RGlza1NwYWNlKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5nZXRDYWxsKFwiZ2V0X2Rpc2tfc3BhY2VcIik7XG4gICAgfVxuXG4gICAgZ2V0SGVhbHRoKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5nZXRDYWxsKFwiaGVhbHRoXCIpO1xuICAgIH1cblxuICAgIGdldElkZW50aXR5KCkge1xuICAgICAgICByZXR1cm4gdGhpcy5nZXRDYWxsKFwiZ2V0X2lkZW50aXR5XCIpO1xuICAgIH1cblxuICAgIGdldE5ldHdvcmtJbmZvKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5nZXRDYWxsKFwibmV0d29ya19pbmZvXCIpO1xuICAgIH1cblxuICAgIGdldEpzeFZlcnNpb24oKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmdldENhbGwoXCJqc3hfdmVyc2lvblwiKTtcbiAgICB9XG5cbiAgICBnZXRSdW5uaW5nUHJvY2Vzc2VzKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5nZXRDYWxsKFwiZ2V0X3J1bm5pbmdfcHJvY2Vzc2VzXCIpO1xuICAgIH1cblxuICAgIGdldFJ1bm5pbmdQb3J0cygpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0Q2FsbChcImdldF9ydW5uaW5nX3BvcnRzXCIpO1xuICAgIH1cbn1cblxuZXhwb3J0IGNvbnN0IGhlYWx0aCA9IG5ldyBIZWFsdGhTZXJ2aWNlKCk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zb3VyY2VzL3NlcnZpY2VzL2hlYWx0aC5qcyIsImltcG9ydCB7IEpldFZpZXcgfSBmcm9tIFwid2ViaXgtamV0XCI7XG5cbmltcG9ydCB7IGFuc2lVcCB9IGZyb20gXCIuLi8uLi9jb21tb24vY29sb3JzXCI7XG5pbXBvcnQgeyBMRVZFTFMsIE1BWF9NU0dfTEVOLCBTVEFURVMsIFRZUEVTIH0gZnJvbSBcIi4vZGF0YVwiO1xuaW1wb3J0IHsgZGF0ZUZvcm1hdHRlciB9IGZyb20gXCIuLi8uLi9jb21tb24vZm9ybWF0dGVyc1wiO1xuaW1wb3J0IHsgYWxlcnRzIH0gZnJvbSBcIi4uLy4uL3NlcnZpY2VzL2FsZXJ0c1wiO1xuXG5pbXBvcnQgQWxlcnRWaWV3IGZyb20gXCIuL2FsZXJ0XCI7XG5pbXBvcnQgeyBjcmVhdGVGaWx0ZXJPcHRpb25zIH0gZnJvbSBcIi4uLy4uL2NvbW1vbi9maWx0ZXJzXCI7XG5cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQWxlcnRzVmlldyBleHRlbmRzIEpldFZpZXcge1xuICAgIGNvbmZpZygpIHtcbiAgICAgICAgY29uc3QgdmlldyA9IHtcbiAgICAgICAgICAgIHJvd3M6IFtcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIHZpZXc6IFwiZGF0YXRhYmxlXCIsXG4gICAgICAgICAgICAgICAgICAgIGlkOiBcImFsZXJ0c190YWJsZVwiLFxuICAgICAgICAgICAgICAgICAgICByZXNpemVDb2x1bW46IHRydWUsXG4gICAgICAgICAgICAgICAgICAgIHNlbGVjdDogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgbXVsdGlzZWxlY3Q6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgIHNjcm9sbDogXCJ4eVwiLFxuICAgICAgICAgICAgICAgICAgICBjc3M6IFwid2ViaXhfaGVhZGVyX2JvcmRlciB3ZWJpeF9kYXRhX2JvcmRlclwiLFxuICAgICAgICAgICAgICAgICAgICBjb2x1bW5zOiBbe1xuICAgICAgICAgICAgICAgICAgICAgICAgaWQ6IFwiaW5kZXhcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIGhlYWRlcjogXCIjXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBzb3J0OiBcImludFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgYXV0b3dpZHRoOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZDogXCJhbGVydF90eXBlXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBzb3J0OiBcImludFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgZm9ybWF0OiAodmFsdWUpID0+IFRZUEVTW3ZhbHVlXSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHdpZHRoOiAxNTAsXG4gICAgICAgICAgICAgICAgICAgICAgICBoZWFkZXI6IFtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIlR5cGVcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRlbnQ6IFwic2VsZWN0RmlsdGVyXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9wdGlvbnM6IGNyZWF0ZUZpbHRlck9wdGlvbnMoVFlQRVMpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWQ6IFwiY291bnRcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIGhlYWRlcjogXCJDb3VudFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgc29ydDogXCJpbnRcIlxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZDogXCJzdGF0dXNcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIHNvcnQ6IFwiaW50XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBmb3JtYXQ6ICh2YWx1ZSkgPT4gU1RBVEVTW3ZhbHVlXSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGhlYWRlcjogW1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiU3RhdHVzXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb250ZW50OiBcInNlbGVjdEZpbHRlclwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvcHRpb25zOiBjcmVhdGVGaWx0ZXJPcHRpb25zKFNUQVRFUylcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZDogXCJsZXZlbFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgc29ydDogXCJpbnRcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvcm1hdDogKHZhbHVlKSA9PiBMRVZFTFNbdmFsdWVdLFxuICAgICAgICAgICAgICAgICAgICAgICAgaGVhZGVyOiBbXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJMZXZlbFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29udGVudDogXCJzZWxlY3RGaWx0ZXJcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb3B0aW9uczogY3JlYXRlRmlsdGVyT3B0aW9ucyhMRVZFTFMpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWQ6IFwiY2F0XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBoZWFkZXI6IFtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIkNhdGVnb3J5XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb250ZW50OiBcInRleHRGaWx0ZXJcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgICAgICAgICBzb3J0OiBcInN0cmluZ1wiXG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlkOiBcInRpbWVfZmlyc3RcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIGhlYWRlcjogXCJGaXJzdCB0aW1lXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBzb3J0OiBcImRhdGVcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvcm1hdDogZGF0ZUZvcm1hdHRlcixcbiAgICAgICAgICAgICAgICAgICAgICAgIHdpZHRoOiAyMDBcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWQ6IFwidGltZV9sYXN0XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBoZWFkZXI6IFwiTGFzdCB0aW1lXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBzb3J0OiBcImRhdGVcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvcm1hdDogZGF0ZUZvcm1hdHRlcixcbiAgICAgICAgICAgICAgICAgICAgICAgIHdpZHRoOiAyMDBcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWQ6IFwibWVzc2FnZVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgaGVhZGVyOiBbXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJNZXNzYWdlXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb250ZW50OiBcInRleHRGaWx0ZXJcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgICAgICAgICAgc29ydDogXCJzdHJcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIGZpbGxzcGFjZTogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvcm1hdDogZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHZhbHVlLmxlbmd0aCA+IE1BWF9NU0dfTEVOKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlID0gdmFsdWUuc3Vic3RyKDAsIE1BWF9NU0dfTEVOKSArICcuLi4nO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gYW5zaVVwLmFuc2lfdG9faHRtbCh2YWx1ZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgICAgIGF1dG9Db25maWc6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgIC8vIHVybDp7XG4gICAgICAgICAgICAgICAgICAgIC8vICAgICAkcHJveHk6dHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgIGxvYWQ6IGZ1bmN0aW9uKHZpZXcsIHBhcmFtcyl7XG4gICAgICAgICAgICAgICAgICAgIC8vICAgICAgICAgbGV0IGRhdGEgPSB3ZWJpeC5hamF4KFwiL3plcm9ib3QvYWxlcnRhL2FjdG9ycy9hbGVydGEvbGlzdF9hbGVydHNcIik7XG4gICAgICAgICAgICAgICAgICAgIC8vICAgICAgICAgcmV0dXJuIGRhdGE7XG4gICAgICAgICAgICAgICAgICAgIC8vICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAvLyB9XG4gICAgICAgICAgICAgICAgICAgIHNjaGVtZToge1xuICAgICAgICAgICAgICAgICAgICAgICAgJGluaXQ6IGZ1bmN0aW9uIChvYmopIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvYmouaW5kZXggPSB0aGlzLmNvdW50KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICRzdWJ2aWV3OiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICBwb3B1cDogdHJ1ZVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIF1cbiAgICAgICAgfTtcblxuICAgICAgICByZXR1cm4gdmlldztcbiAgICB9XG5cbiAgICBkZWxldGVJdGVtKG9iamVjdHMpIHtcbiAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xuXG4gICAgICAgIGxldCBpdGVtcyA9IFtdLFxuICAgICAgICAgICAgaWRzID0gW10sXG4gICAgICAgICAgICBpbmRleGVzID0gW107XG5cbiAgICAgICAgZm9yIChsZXQgb2JqIG9mIG9iamVjdHMpIHtcbiAgICAgICAgICAgIGlkcy5wdXNoKG9iai5pZCk7XG4gICAgICAgICAgICBsZXQgaXRlbSA9IHNlbGYudGFibGUuZ2V0SXRlbShvYmouaWQpO1xuICAgICAgICAgICAgaXRlbXMucHVzaChpdGVtKVxuICAgICAgICAgICAgaW5kZXhlcy5wdXNoKGl0ZW0uaW5kZXgpO1xuICAgICAgICB9XG5cbiAgICAgICAgd2ViaXguY29uZmlybSh7XG4gICAgICAgICAgICB0aXRsZTogXCJEZWxldGUgYWxlcnRzXCIsXG4gICAgICAgICAgICBvazogXCJZZXNcIixcbiAgICAgICAgICAgIGNhbmNlbDogXCJOb1wiLFxuICAgICAgICAgICAgdGV4dDogYERlbGV0ZSBhbGVydCBpdGVtKHMpIG9mICR7aW5kZXhlcy5qb2luKFwiLCBcIil9YFxuICAgICAgICB9KS50aGVuKCgpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGlkZW50aWZpZXJzID0gaXRlbXMubWFwKChpdGVtKSA9PiBpdGVtLmlkZW50aWZpZXIpO1xuICAgICAgICAgICAgc2VsZi50YWJsZS5zaG93UHJvZ3Jlc3Moe1xuICAgICAgICAgICAgICAgIGhpZGU6IGZhbHNlXG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgYWxlcnRzLmRlbGV0ZShpZGVudGlmaWVycykudGhlbigoKSA9PiB7XG4gICAgICAgICAgICAgICAgc2VsZi50YWJsZS5yZW1vdmUoaWRzKVxuICAgICAgICAgICAgICAgIHNlbGYudGFibGUuc2hvd1Byb2dyZXNzKHtcbiAgICAgICAgICAgICAgICAgICAgaGlkZTogdHJ1ZVxuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgdmlld0l0ZW0oaWQpIHtcbiAgICAgICAgdGhpcy5hbGVydFZpZXcuc2hvd0Zvcih0aGlzLnRhYmxlLmdldEl0ZW0oaWQpKTtcbiAgICB9XG5cbiAgICBpbml0KCkge1xuICAgICAgICAvLyB0aGlzLnVzZShwbHVnaW5zLlByb2dyZXNzQmFyLCBcInByb2dyZXNzXCIpO1xuICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgICAgIHNlbGYudGFibGUgPSAkJChcImFsZXJ0c190YWJsZVwiKTtcbiAgICAgICAgc2VsZi5hbGVydFZpZXcgPSBzZWxmLnVpKEFsZXJ0Vmlldyk7XG5cbiAgICAgICAgd2ViaXguZXh0ZW5kKHNlbGYudGFibGUsIHdlYml4LlByb2dyZXNzQmFyKTtcbiAgICAgICAgd2ViaXgucmVhZHkoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgc2VsZi50YWJsZS5jbGVhckFsbCgpO1xuICAgICAgICAgICAgc2VsZi50YWJsZS5zaG93UHJvZ3Jlc3Moe1xuICAgICAgICAgICAgICAgIGhpZGU6IGZhbHNlXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGFsZXJ0cy5saXN0KCkudGhlbihkYXRhID0+IHtcbiAgICAgICAgICAgICAgICBsZXQgYWxlcnRzID0gZGF0YS5qc29uKCkuYWxlcnRzO1xuICAgICAgICAgICAgICAgIHNlbGYudGFibGUucGFyc2UoYWxlcnRzKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcblxuICAgICAgICB3ZWJpeC51aSh7XG4gICAgICAgICAgICB2aWV3OiBcImNvbnRleHRtZW51XCIsXG4gICAgICAgICAgICBpZDogXCJhbGVydHNfY21cIixcbiAgICAgICAgICAgIGRhdGE6IFtcIlZpZXdcIiwgXCJEZWxldGVcIl1cbiAgICAgICAgfSkuYXR0YWNoVG8oc2VsZi50YWJsZSk7XG5cblxuICAgICAgICBzZWxmLnRhYmxlLmF0dGFjaEV2ZW50KFwib25JdGVtRGJsQ2xpY2tcIiwgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgc2VsZi52aWV3SXRlbShzZWxmLnRhYmxlLmdldFNlbGVjdGVkSWQoKSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgICQkKFwiYWxlcnRzX2NtXCIpLmF0dGFjaEV2ZW50KFwib25NZW51SXRlbUNsaWNrXCIsIGZ1bmN0aW9uIChpZCkge1xuICAgICAgICAgICAgaWYgKGlkID09IFwiRGVsZXRlXCIpIHtcbiAgICAgICAgICAgICAgICBzZWxmLmRlbGV0ZUl0ZW0oc2VsZi50YWJsZS5nZXRTZWxlY3RlZElkKHRydWUpKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoaWQgPT0gXCJWaWV3XCIpIHtcbiAgICAgICAgICAgICAgICBzZWxmLnZpZXdJdGVtKHNlbGYudGFibGUuZ2V0U2VsZWN0ZWRJZCgpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc291cmNlcy92aWV3cy9hbGVydHMvaW5kZXguanMiLCJpbXBvcnQgQW5zaVVwIGZyb20gXCJhbnNpX3VwXCI7XG5cbmV4cG9ydCBjb25zdCBhbnNpVXAgPSBuZXcgQW5zaVVwKCk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zb3VyY2VzL2NvbW1vbi9jb2xvcnMuanMiLCJpbXBvcnQgeyBFeHRlcm5hbFZpZXcgfSBmcm9tIFwiLi4vZXh0ZXJuYWxcIjtcbmltcG9ydCB7IGFkbWluIH0gZnJvbSBcIi4uLy4uL3NlcnZpY2VzL2FkbWluXCI7XG5cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ2FwYWNpdHlWaWV3IGV4dGVuZHMgRXh0ZXJuYWxWaWV3IHtcbiAgICBjb25zdHJ1Y3RvcihhcHAsIG5hbWUpIHtcbiAgICAgICAgc3VwZXIoYXBwLCBuYW1lKTtcbiAgICB9XG5cbiAgICBzaG93SWZyYW1lKCkge1xuICAgICAgICBhZG1pbi5nZXRfZXhwbG9yZXIoKS50aGVuKChkYXRhKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBleHBsb3JlciA9IGRhdGEuanNvbigpO1xuICAgICAgICAgICAgbGV0IHVybCA9IGV4cGxvcmVyLnVybDtcblxuICAgICAgICAgICAgaWYgKCF1cmwuc3RhcnRzV2l0aCgnaHR0cCcpKSB7XG4gICAgICAgICAgICAgICAgdXJsID0gYGh0dHBzOi8vJHt1cmx9YDtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdGhpcy5leHRlcm5hbElmcmFtZS5zaG93KCk7XG4gICAgICAgICAgICB0aGlzLmV4dGVybmFsSWZyYW1lLnNob3dQcm9ncmVzcyh7IHR5cGU6IFwiaWNvblwiIH0pO1xuICAgICAgICAgICAgdGhpcy5leHRlcm5hbElmcmFtZS5sb2FkKHVybCk7XG4gICAgICAgIH0pXG4gICAgfVxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc291cmNlcy92aWV3cy9jYXBhY2l0eS9pbmRleC5qcyIsImltcG9ydCB7IEpldFZpZXcgfSBmcm9tIFwid2ViaXgtamV0XCI7XG5cbmltcG9ydCB7IEVycm9yVmlldyB9IGZyb20gXCIuLi9lcnJvcnMvZGlhbG9nXCI7XG5pbXBvcnQgeyB0YWlnYSB9IGZyb20gXCIuLi8uLi9zZXJ2aWNlcy90YWlnYVwiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDaXJjbGVzVmlldyBleHRlbmRzIEpldFZpZXcge1xuICAgIGNvbmZpZygpIHtcbiAgICAgICAgY29uc3QgZ3JpZCA9IHtcbiAgICAgICAgICAgIHJvd3M6IFt7XG4gICAgICAgICAgICAgICAgLy9IZWFkZXJcbiAgICAgICAgICAgICAgICB2aWV3OiBcInRlbXBsYXRlXCIsXG4gICAgICAgICAgICAgICAgdHlwZTogXCJoZWFkZXJcIixcbiAgICAgICAgICAgICAgICB0ZW1wbGF0ZTogXCJDaXJjbGVzXCIsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgeyAvL0RhdGFUYWJsZVxuICAgICAgICAgICAgICAgIHZpZXc6IFwiZGF0YXRhYmxlXCIsXG4gICAgICAgICAgICAgICAgaWQ6IFwiY2lyY2xlc190YWJsZVwiLFxuICAgICAgICAgICAgICAgIHJlc2l6ZUNvbHVtbjogdHJ1ZSxcbiAgICAgICAgICAgICAgICB0eXBlOiB7XG4gICAgICAgICAgICAgICAgICAgIGhlaWdodDogMjAwLFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgc2Nyb2xsOiBcInh5XCIsXG4gICAgICAgICAgICAgICAgYXV0b0NvbmZpZzogdHJ1ZSxcbiAgICAgICAgICAgICAgICB2aWV3OiBcImRhdGF0YWJsZVwiLFxuICAgICAgICAgICAgICAgIHNlbGVjdDogdHJ1ZSxcbiAgICAgICAgICAgICAgICBjc3M6IFwid2ViaXhfaGVhZGVyX2JvcmRlciB3ZWJpeF9kYXRhX2JvcmRlclwiLFxuICAgICAgICAgICAgICAgIG9uQ29udGV4dDoge30sXG4gICAgICAgICAgICAgICAgY29sdW1uczogW3tcbiAgICAgICAgICAgICAgICAgICAgaWQ6IFwiSURcIixcbiAgICAgICAgICAgICAgICAgICAgaGVhZGVyOiBcIklEXCIsXG4gICAgICAgICAgICAgICAgICAgIHNvcnQ6IFwiaW50XCIsXG4gICAgICAgICAgICAgICAgICAgIGF1dG93aWR0aDogdHJ1ZSxcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgaWQ6IFwiTmFtZVwiLFxuICAgICAgICAgICAgICAgICAgICBoZWFkZXI6IFwiTmFtZVwiLFxuICAgICAgICAgICAgICAgICAgICBzb3J0OiBcInN0cmluZ1wiLFxuICAgICAgICAgICAgICAgICAgICB3aWR0aDogMjAwXG4gICAgICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgICAgICBpZDogXCJPd25lclwiLFxuICAgICAgICAgICAgICAgICAgICBoZWFkZXI6IFtcIk93bmVyXCIsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRlbnQ6IFwidGV4dEZpbHRlclwiXG4gICAgICAgICAgICAgICAgICAgIH1dLFxuICAgICAgICAgICAgICAgICAgICBzb3J0OiBcInN0cmluZ1wiLFxuICAgICAgICAgICAgICAgICAgICB3aWR0aDogMjAwXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIGlkOiBcIkRlc2NyaXB0aW9uXCIsXG4gICAgICAgICAgICAgICAgICAgIGhlYWRlcjogXCJEZXNjcmlwdGlvblwiLFxuICAgICAgICAgICAgICAgICAgICBzb3J0OiBcInN0cmluZ1wiLFxuICAgICAgICAgICAgICAgICAgICB3aWR0aDogMTMwMCxcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICBzY2hlbWU6IHtcbiAgICAgICAgICAgICAgICAgICAgJGluaXQ6IGZ1bmN0aW9uIChvYmopIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG9iai5pbmRleCA9IHRoaXMuY291bnQoKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIF1cbiAgICAgICAgfTtcbiAgICAgICAgcmV0dXJuIGdyaWQ7XG4gICAgfVxuXG4gICAgc2hvd0Vycm9yKG1lc3NhZ2UpIHtcbiAgICAgICAgdGhpcy5lcnJvclZpZXcuc2hvd0Vycm9yKG1lc3NhZ2UpO1xuICAgIH1cblxuICAgIGluaXQodmlldykge1xuICAgICAgICBjb25zdCBzZWxmID0gdGhpcztcblxuICAgICAgICBzZWxmLmVycm9yVmlldyA9IHRoaXMudWkoRXJyb3JWaWV3KTtcblxuICAgICAgICBjb25zdCBtZW51ID0gd2ViaXgudWkoe1xuICAgICAgICAgICAgdmlldzogXCJjb250ZXh0bWVudVwiLFxuICAgICAgICAgICAgaWQ6IFwiY2lyY2xlc19jbVwiXG4gICAgICAgIH0pO1xuXG4gICAgICAgIHRoaXMuY2lyY2xlVGFibGUgPSB0aGlzLiQkKFwiY2lyY2xlc190YWJsZVwiKTtcbiAgICAgICAgd2ViaXguZXh0ZW5kKHRoaXMuY2lyY2xlVGFibGUsIHdlYml4LlByb2dyZXNzQmFyKTtcblxuXG4gICAgICAgIHdlYml4LmFqYXgoKS5nZXQoXCIvYXV0aC9hdXRoZW50aWNhdGVkXCIsIGZ1bmN0aW9uIChkYXRhKSB7XG4gICAgICAgICAgICBjb25zdCBpbmZvID0gSlNPTi5wYXJzZShkYXRhKTtcbiAgICAgICAgICAgIGNvbnN0IHVzZXJuYW1lID0gaW5mby51c2VybmFtZS5yZXBsYWNlKFwiLjNib3RcIiwgXCJcIilcbiAgICAgICAgICAgIHRhaWdhLnVzZXJDaXJjbGVzKHVzZXJuYW1lKS50aGVuKGRhdGEgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IGNpcmNsZXMgPSBkYXRhLmpzb24oKTtcbiAgICAgICAgICAgICAgICBzZWxmLmNpcmNsZVRhYmxlLnBhcnNlKGNpcmNsZXMpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuXG5cbiAgICB9XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zb3VyY2VzL3ZpZXdzL2NpcmNsZXMvaW5kZXguanMiLCJpbXBvcnQgeyBKZXRWaWV3IH0gZnJvbSBcIndlYml4LWpldFwiO1xuXG5pbXBvcnQgeyBFcnJvclZpZXcgfSBmcm9tIFwiLi4vZXJyb3JzL2RpYWxvZ1wiO1xuaW1wb3J0IHsgdGFpZ2EgfSBmcm9tIFwiLi4vLi4vc2VydmljZXMvdGFpZ2FcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ2lyY2xlc3Rvcmllc1ZpZXcgZXh0ZW5kcyBKZXRWaWV3IHtcbiAgICBjb25maWcoKSB7XG4gICAgICAgIGNvbnN0IGdyaWQgPSB7XG4gICAgICAgICAgICByb3dzOiBbe1xuICAgICAgICAgICAgICAgIC8vSGVhZGVyXG4gICAgICAgICAgICAgICAgdmlldzogXCJ0ZW1wbGF0ZVwiLFxuICAgICAgICAgICAgICAgIHR5cGU6IFwiaGVhZGVyXCIsXG4gICAgICAgICAgICAgICAgdGVtcGxhdGU6IFwiQ2lyY2xlc1N0b3JpZXNcIixcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7IC8vRGF0YVRhYmxlXG4gICAgICAgICAgICAgICAgdmlldzogXCJkYXRhdGFibGVcIixcbiAgICAgICAgICAgICAgICBpZDogXCJjaXJjbGVzdG9yaWVzX3RhYmxlXCIsXG4gICAgICAgICAgICAgICAgcmVzaXplQ29sdW1uOiB0cnVlLFxuICAgICAgICAgICAgICAgIHR5cGU6IHtcbiAgICAgICAgICAgICAgICAgICAgaGVpZ2h0OiAyMDAsXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBzY3JvbGw6IFwieHlcIixcbiAgICAgICAgICAgICAgICBhdXRvQ29uZmlnOiB0cnVlLFxuICAgICAgICAgICAgICAgIHZpZXc6IFwiZGF0YXRhYmxlXCIsXG4gICAgICAgICAgICAgICAgc2VsZWN0OiB0cnVlLFxuICAgICAgICAgICAgICAgIGNzczogXCJ3ZWJpeF9oZWFkZXJfYm9yZGVyIHdlYml4X2RhdGFfYm9yZGVyXCIsXG4gICAgICAgICAgICAgICAgb25Db250ZXh0OiB7fSxcbiAgICAgICAgICAgICAgICBjb2x1bW5zOiBbe1xuICAgICAgICAgICAgICAgICAgICBpZDogXCJJRFwiLFxuICAgICAgICAgICAgICAgICAgICBoZWFkZXI6IFwiSURcIixcbiAgICAgICAgICAgICAgICAgICAgc29ydDogXCJpbnRcIixcbiAgICAgICAgICAgICAgICAgICAgYXV0b3dpZHRoOiB0cnVlLFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBpZDogXCJQcm9qZWN0XCIsXG4gICAgICAgICAgICAgICAgICAgIGhlYWRlcjogW1wiUHJvamVjdFwiLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb250ZW50OiBcInRleHRGaWx0ZXJcIlxuICAgICAgICAgICAgICAgICAgICB9XSxcbiAgICAgICAgICAgICAgICAgICAgc29ydDogXCJzdHJpbmdcIixcbiAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDMwMFxuICAgICAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICAgICAgaWQ6IFwiU3ViamVjdFwiLFxuICAgICAgICAgICAgICAgICAgICBoZWFkZXI6IFwiU3ViamVjdFwiLFxuICAgICAgICAgICAgICAgICAgICBzb3J0OiBcInN0cmluZ1wiLFxuICAgICAgICAgICAgICAgICAgICB3aWR0aDogNzAwXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIGlkOiBcIk1pbGVzdG9uZVwiLFxuICAgICAgICAgICAgICAgICAgICBoZWFkZXI6IFwiTWlsZXN0b25lXCIsXG4gICAgICAgICAgICAgICAgICAgIHNvcnQ6IFwic3RyaW5nXCIsXG4gICAgICAgICAgICAgICAgICAgIHdpZHRoOiAyMDAsXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIGlkOiBcIlN0YXR1c1wiLFxuICAgICAgICAgICAgICAgICAgICBoZWFkZXI6IFwiU3RhdHVzXCIsXG4gICAgICAgICAgICAgICAgICAgIHNvcnQ6IFwic3RyaW5nXCIsXG4gICAgICAgICAgICAgICAgICAgIHdpZHRoOiAyMDAsXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIGlkOiBcIkR1ZSBkYXRlXCIsXG4gICAgICAgICAgICAgICAgICAgIGhlYWRlcjogXCJEdWUgZGF0ZVwiLFxuICAgICAgICAgICAgICAgICAgICBzb3J0OiBcInN0cmluZ1wiLFxuICAgICAgICAgICAgICAgICAgICB3aWR0aDogMjAwLFxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgIHNjaGVtZToge1xuICAgICAgICAgICAgICAgICAgICAkaW5pdDogZnVuY3Rpb24gKG9iaikge1xuICAgICAgICAgICAgICAgICAgICAgICAgb2JqLmluZGV4ID0gdGhpcy5jb3VudCgpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgXVxuICAgICAgICB9O1xuICAgICAgICByZXR1cm4gZ3JpZDtcbiAgICB9XG5cbiAgICBzaG93RXJyb3IobWVzc2FnZSkge1xuICAgICAgICB0aGlzLmVycm9yVmlldy5zaG93RXJyb3IobWVzc2FnZSk7XG4gICAgfVxuXG4gICAgaW5pdCh2aWV3KSB7XG4gICAgICAgIGNvbnN0IHNlbGYgPSB0aGlzO1xuXG4gICAgICAgIHNlbGYuZXJyb3JWaWV3ID0gdGhpcy51aShFcnJvclZpZXcpO1xuXG4gICAgICAgIGNvbnN0IG1lbnUgPSB3ZWJpeC51aSh7XG4gICAgICAgICAgICB2aWV3OiBcImNvbnRleHRtZW51XCIsXG4gICAgICAgICAgICBpZDogXCJjaXJjbGVzdG9yaWVzX2NtXCJcbiAgICAgICAgfSk7XG5cbiAgICAgICAgdGhpcy5zdG9yaWVzVGFibGUgPSB0aGlzLiQkKFwiY2lyY2xlc3Rvcmllc190YWJsZVwiKTtcbiAgICAgICAgd2ViaXguZXh0ZW5kKHRoaXMuc3Rvcmllc1RhYmxlLCB3ZWJpeC5Qcm9ncmVzc0Jhcik7XG5cbiAgICAgICAgd2ViaXguYWpheCgpLmdldChcIi9hdXRoL2F1dGhlbnRpY2F0ZWRcIiwgZnVuY3Rpb24gKGRhdGEpIHtcbiAgICAgICAgICAgIGNvbnN0IGluZm8gPSBKU09OLnBhcnNlKGRhdGEpO1xuICAgICAgICAgICAgY29uc3QgdXNlcm5hbWUgPSBpbmZvLnVzZXJuYW1lLnJlcGxhY2UoXCIuM2JvdFwiLCBcIlwiKVxuICAgICAgICAgICAgdGFpZ2EudXNlclN0b3JpZXModXNlcm5hbWUpLnRoZW4oZGF0YSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3Qgc3RvcmllcyA9IGRhdGEuanNvbigpO1xuICAgICAgICAgICAgICAgIHNlbGYuc3Rvcmllc1RhYmxlLnBhcnNlKHN0b3JpZXMpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuXG5cbiAgICB9XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zb3VyY2VzL3ZpZXdzL2NpcmNsZXN0b3JpZXMvaW5kZXguanMiLCJpbXBvcnQgeyBKZXRWaWV3IH0gZnJvbSBcIndlYml4LWpldFwiO1xuXG5pbXBvcnQgeyBFcnJvclZpZXcgfSBmcm9tIFwiLi4vZXJyb3JzL2RpYWxvZ1wiO1xuaW1wb3J0IHsgdGFpZ2EgfSBmcm9tIFwiLi4vLi4vc2VydmljZXMvdGFpZ2FcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ2lyY2xlc1Rhc2tzVmlldyBleHRlbmRzIEpldFZpZXcge1xuICAgIGNvbmZpZygpIHtcbiAgICAgICAgY29uc3QgZ3JpZCA9IHtcbiAgICAgICAgICAgIHJvd3M6IFt7XG4gICAgICAgICAgICAgICAgLy9IZWFkZXJcbiAgICAgICAgICAgICAgICB2aWV3OiBcInRlbXBsYXRlXCIsXG4gICAgICAgICAgICAgICAgdHlwZTogXCJoZWFkZXJcIixcbiAgICAgICAgICAgICAgICB0ZW1wbGF0ZTogXCJDaXJjbGVzVGFza3NcIixcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7IC8vRGF0YVRhYmxlXG4gICAgICAgICAgICAgICAgdmlldzogXCJkYXRhdGFibGVcIixcbiAgICAgICAgICAgICAgICBpZDogXCJjaXJjbGVzdGFza3NfdGFibGVcIixcbiAgICAgICAgICAgICAgICByZXNpemVDb2x1bW46IHRydWUsXG4gICAgICAgICAgICAgICAgdHlwZToge1xuICAgICAgICAgICAgICAgICAgICBoZWlnaHQ6IDIwMCxcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHNjcm9sbDogXCJ4eVwiLFxuICAgICAgICAgICAgICAgIGF1dG9Db25maWc6IHRydWUsXG4gICAgICAgICAgICAgICAgdmlldzogXCJkYXRhdGFibGVcIixcbiAgICAgICAgICAgICAgICBzZWxlY3Q6IHRydWUsXG4gICAgICAgICAgICAgICAgY3NzOiBcIndlYml4X2hlYWRlcl9ib3JkZXIgd2ViaXhfZGF0YV9ib3JkZXJcIixcbiAgICAgICAgICAgICAgICBvbkNvbnRleHQ6IHt9LFxuICAgICAgICAgICAgICAgIGNvbHVtbnM6IFt7XG4gICAgICAgICAgICAgICAgICAgIGlkOiBcIklEXCIsXG4gICAgICAgICAgICAgICAgICAgIGhlYWRlcjogXCJJRFwiLFxuICAgICAgICAgICAgICAgICAgICBzb3J0OiBcImludFwiLFxuICAgICAgICAgICAgICAgICAgICBhdXRvd2lkdGg6IHRydWUsXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIGlkOiBcIlByb2plY3RcIixcbiAgICAgICAgICAgICAgICAgICAgaGVhZGVyOiBbXCJQcm9qZWN0XCIsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRlbnQ6IFwidGV4dEZpbHRlclwiXG4gICAgICAgICAgICAgICAgICAgIH1dLFxuICAgICAgICAgICAgICAgICAgICBzb3J0OiBcInN0cmluZ1wiLFxuICAgICAgICAgICAgICAgICAgICB3aWR0aDogMzAwXG4gICAgICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgICAgICBpZDogXCJTdWJqZWN0XCIsXG4gICAgICAgICAgICAgICAgICAgIGhlYWRlcjogXCJTdWJqZWN0XCIsXG4gICAgICAgICAgICAgICAgICAgIHNvcnQ6IFwic3RyaW5nXCIsXG4gICAgICAgICAgICAgICAgICAgIHdpZHRoOiA4MDBcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgaWQ6IFwiTWlsZXN0b25lXCIsXG4gICAgICAgICAgICAgICAgICAgIGhlYWRlcjogXCJNaWxlc3RvbmVcIixcbiAgICAgICAgICAgICAgICAgICAgc29ydDogXCJzdHJpbmdcIixcbiAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDIwMCxcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgaWQ6IFwiU3RhdHVzXCIsXG4gICAgICAgICAgICAgICAgICAgIGhlYWRlcjogXCJTdGF0dXNcIixcbiAgICAgICAgICAgICAgICAgICAgc29ydDogXCJzdHJpbmdcIixcbiAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDMwMCxcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICBzY2hlbWU6IHtcbiAgICAgICAgICAgICAgICAgICAgJGluaXQ6IGZ1bmN0aW9uIChvYmopIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG9iai5pbmRleCA9IHRoaXMuY291bnQoKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIF1cbiAgICAgICAgfTtcbiAgICAgICAgcmV0dXJuIGdyaWQ7XG4gICAgfVxuXG4gICAgc2hvd0Vycm9yKG1lc3NhZ2UpIHtcbiAgICAgICAgdGhpcy5lcnJvclZpZXcuc2hvd0Vycm9yKG1lc3NhZ2UpO1xuICAgIH1cblxuICAgIGluaXQodmlldykge1xuICAgICAgICBjb25zdCBzZWxmID0gdGhpcztcblxuICAgICAgICBzZWxmLmVycm9yVmlldyA9IHRoaXMudWkoRXJyb3JWaWV3KTtcblxuICAgICAgICBjb25zdCBtZW51ID0gd2ViaXgudWkoe1xuICAgICAgICAgICAgdmlldzogXCJjb250ZXh0bWVudVwiLFxuICAgICAgICAgICAgaWQ6IFwiY2lyY2xlc3Rhc2tzX2NtXCJcbiAgICAgICAgfSk7XG5cbiAgICAgICAgdGhpcy50YXNrc1RhYmxlID0gdGhpcy4kJChcImNpcmNsZXN0YXNrc190YWJsZVwiKTtcbiAgICAgICAgd2ViaXguZXh0ZW5kKHRoaXMudGFza3NUYWJsZSwgd2ViaXguUHJvZ3Jlc3NCYXIpO1xuXG4gICAgICAgIHRhaWdhLnVzZXJUYXNrcygzNikudGhlbihkYXRhID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGNpcmNsZXMgPSBkYXRhLmpzb24oKTtcbiAgICAgICAgICAgIHNlbGYudGFza3NUYWJsZS5wYXJzZShjaXJjbGVzKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgd2ViaXguYWpheCgpLmdldChcIi9hdXRoL2F1dGhlbnRpY2F0ZWRcIiwgZnVuY3Rpb24gKGRhdGEpIHtcbiAgICAgICAgICAgIGNvbnN0IGluZm8gPSBKU09OLnBhcnNlKGRhdGEpO1xuICAgICAgICAgICAgY29uc3QgdXNlcm5hbWUgPSBpbmZvLnVzZXJuYW1lLnJlcGxhY2UoXCIuM2JvdFwiLCBcIlwiKVxuICAgICAgICAgICAgdGFpZ2EudXNlclRhc2tzKHVzZXJuYW1lKS50aGVuKGRhdGEgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IHRhc2tzID0gZGF0YS5qc29uKCk7XG4gICAgICAgICAgICAgICAgc2VsZi50YXNrc1RhYmxlLnBhcnNlKHRhc2tzKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcblxuXG4gICAgfVxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc291cmNlcy92aWV3cy9jaXJjbGV0YXNrcy9pbmRleC5qcyIsImltcG9ydCB7IEV4dGVybmFsVmlldyB9IGZyb20gXCIuLi9leHRlcm5hbFwiO1xuXG5jb25zdCBDT0RFX1VSTCA9IFwiL2NvZGVzZXJ2ZXIvP2ZvbGRlcj0vc2FuZGJveC9jb2RlXCI7XG5jb25zdCBSRVFVSVJFRF9QQUNLQUdFUyA9IHtcbiAgICBcInplcm9ib3QuY29kZXNlcnZlclwiOiBcImh0dHBzOi8vZ2l0aHViLmNvbS90aHJlZWZvbGR0ZWNoL2p1bXBzY2FsZVhfdGhyZWVib3QvdHJlZS9kZXZlbG9wbWVudC9UaHJlZUJvdFBhY2thZ2VzL3plcm9ib3QvY29kZXNlcnZlclwiXG59XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIENvZGVzZXJ2ZXJWaWV3IGV4dGVuZHMgRXh0ZXJuYWxWaWV3IHtcbiAgICBjb25zdHJ1Y3RvcihhcHAsIG5hbWUpIHtcbiAgICAgICAgc3VwZXIoYXBwLCBuYW1lLCBDT0RFX1VSTCwgUkVRVUlSRURfUEFDS0FHRVMpO1xuICAgIH1cbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NvdXJjZXMvdmlld3MvY29kZXNlcnZlci9pbmRleC5qcyIsImltcG9ydCB7IEpldFZpZXcgfSBmcm9tIFwid2ViaXgtamV0XCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFRvcFZpZXcgZXh0ZW5kcyBKZXRWaWV3IHtcblx0Y29uZmlnKCkge1xuXHRcdHJldHVybiB7XG5cdFx0XHR0eXBlOiBcInNwYWNlXCIsXG5cdFx0XHRyZXNwb25zaXZlOiB0cnVlLFxuXHRcdFx0cm93czogW1xuXHRcdFx0XHR7XG5cdFx0XHRcdFx0Y29sczogW3tcblx0XHRcdFx0XHRcdCRzdWJ2aWV3OiBcImRhc2guanN4SW5mb1wiXG5cdFx0XHRcdFx0fSxcblx0XHRcdFx0XHR7XG5cdFx0XHRcdFx0XHQkc3VidmlldzogXCJkYXNoLmhlYWx0aFwiXG5cdFx0XHRcdFx0fSxcblx0XHRcdFx0XHR7XG5cdFx0XHRcdFx0XHQkc3VidmlldzogXCJkYXNoLmRpc2tTcGFjZVwiXG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdF1cblx0XHRcdFx0fSxcblx0XHRcdFx0e1xuXHRcdFx0XHRcdGNvbHM6IFt7XG5cdFx0XHRcdFx0XHQkc3VidmlldzogXCJkYXNoLnByb2Nlc3Nlc1wiXG5cdFx0XHRcdFx0fSxcblx0XHRcdFx0XHR7ICRzdWJ2aWV3OiBcImRhc2gucnVubmluZ1BvcnRzXCIgfV1cblx0XHRcdFx0fSxcblx0XHRcdF1cblx0XHR9O1xuXHR9XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zb3VyY2VzL3ZpZXdzL2Rhc2gvaW5kZXguanMiLCJpbXBvcnQgeyBKZXRWaWV3IH0gZnJvbSBcIndlYml4LWpldFwiO1xuXG5pbXBvcnQgeyBFcnJvclZpZXcgfSBmcm9tIFwiLi4vZXJyb3JzL2RpYWxvZ1wiO1xuaW1wb3J0IHsgc29sdXRpb25zIH0gZnJvbSBcIi4uLy4uL3NlcnZpY2VzL2RlcGxveWVkU29sdXRpb25zXCI7XG5cbmltcG9ydCBSZXNlcnZhdGlvblZpZXcgZnJvbSBcIi4vcmVzZXJ2YXRpb25cIjtcblxuY29uc3QgVU5LTk9XTl9TVEFUVVMgPSAnVW5rbm93bic7XG5cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRGVwbG95ZWRTb2x1dGlvbnNWaWV3IGV4dGVuZHMgSmV0VmlldyB7XG4gICAgY29uZmlnKCkge1xuICAgICAgICBjb25zdCBncmlkID0ge1xuICAgICAgICAgICAgcm93czogW3tcbiAgICAgICAgICAgICAgICAvL0hlYWRlclxuICAgICAgICAgICAgICAgIHZpZXc6IFwidGVtcGxhdGVcIixcbiAgICAgICAgICAgICAgICB0eXBlOiBcImhlYWRlclwiLFxuICAgICAgICAgICAgICAgIHRlbXBsYXRlOiBcIkRlcGxveWVkIFNvbHV0aW9uc1wiLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHsgLy9EYXRhVGFibGVcbiAgICAgICAgICAgICAgICB2aWV3OiBcImRhdGF0YWJsZVwiLFxuICAgICAgICAgICAgICAgIGlkOiBcInNvbHV0aW9uc190YWJsZVwiLFxuICAgICAgICAgICAgICAgIHJlc2l6ZUNvbHVtbjogdHJ1ZSxcbiAgICAgICAgICAgICAgICB0eXBlOiB7XG4gICAgICAgICAgICAgICAgICAgIGhlaWdodDogMjAwLFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgc2Nyb2xsOiBcInh5XCIsXG4gICAgICAgICAgICAgICAgYXV0b0NvbmZpZzogdHJ1ZSxcbiAgICAgICAgICAgICAgICB2aWV3OiBcImRhdGF0YWJsZVwiLFxuICAgICAgICAgICAgICAgIHNlbGVjdDogdHJ1ZSxcbiAgICAgICAgICAgICAgICBjc3M6IFwid2ViaXhfaGVhZGVyX2JvcmRlciB3ZWJpeF9kYXRhX2JvcmRlclwiLFxuICAgICAgICAgICAgICAgIG9uQ29udGV4dDoge30sXG4gICAgICAgICAgICAgICAgY29sdW1uczogW3tcbiAgICAgICAgICAgICAgICAgICAgaWQ6IFwiaW5kZXhcIixcbiAgICAgICAgICAgICAgICAgICAgaGVhZGVyOiBcIiNcIixcbiAgICAgICAgICAgICAgICAgICAgc29ydDogXCJpbnRcIixcbiAgICAgICAgICAgICAgICAgICAgYXV0b3dpZHRoOiB0cnVlLFxuICAgICAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICAgICAgaWQ6IFwic29sdXRpb25OYW1lXCIsXG4gICAgICAgICAgICAgICAgICAgIGhlYWRlcjogW1wiU29sdXRpb24gTmFtZVwiLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb250ZW50OiBcInRleHRGaWx0ZXJcIlxuICAgICAgICAgICAgICAgICAgICB9XSxcbiAgICAgICAgICAgICAgICAgICAgc29ydDogXCJzdHJpbmdcIixcbiAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDIwMFxuICAgICAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICAgICAgaWQ6IFwicmVzdklkXCIsXG4gICAgICAgICAgICAgICAgICAgIGhlYWRlcjogW1wiUmVzZXJ2YXRpb24gSWRcIiwge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29udGVudDogXCJ0ZXh0RmlsdGVyXCJcbiAgICAgICAgICAgICAgICAgICAgfV0sXG4gICAgICAgICAgICAgICAgICAgIHNvcnQ6IFwic3RyaW5nXCIsXG4gICAgICAgICAgICAgICAgICAgIHdpZHRoOiAyMDBcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgaWQ6IFwic29sdXRpb25UeXBlXCIsXG4gICAgICAgICAgICAgICAgICAgIGhlYWRlcjogW1wiU29sdXRpb24gVHlwZVwiLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb250ZW50OiBcInNlbGVjdEZpbHRlclwiXG4gICAgICAgICAgICAgICAgICAgIH1dLFxuICAgICAgICAgICAgICAgICAgICBzb3J0OiBcInN0cmluZ1wiLFxuICAgICAgICAgICAgICAgICAgICB3aWR0aDogMjAwXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIGlkOiBcIm5leHRBY3Rpb25cIixcbiAgICAgICAgICAgICAgICAgICAgaGVhZGVyOiBbXCJOZXh0IGFjdGlvblwiLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb250ZW50OiBcInNlbGVjdEZpbHRlclwiXG4gICAgICAgICAgICAgICAgICAgIH1dLFxuICAgICAgICAgICAgICAgICAgICBzb3J0OiBcInN0cmluZ1wiLFxuICAgICAgICAgICAgICAgICAgICB3aWR0aDogMjAwXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgc2NoZW1lOiB7XG4gICAgICAgICAgICAgICAgICAgICRpbml0OiBmdW5jdGlvbiAob2JqKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBvYmouc29sdXRpb25OYW1lID0gb2JqLm5hbWU7XG4gICAgICAgICAgICAgICAgICAgICAgICBvYmoucmVzdklkID0gb2JqLnJlc2VydmF0aW9uLmlkO1xuICAgICAgICAgICAgICAgICAgICAgICAgb2JqLnNvbHV0aW9uVHlwZSA9IG9iai50eXBlO1xuICAgICAgICAgICAgICAgICAgICAgICAgb2JqLm5leHRBY3Rpb24gPSBvYmoucmVzZXJ2YXRpb24ubmV4dF9hY3Rpb247XG4gICAgICAgICAgICAgICAgICAgICAgICBvYmouaW5kZXggPSB0aGlzLmNvdW50KCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIG9uOiB7XG4gICAgICAgICAgICAgICAgICAgIG9uQWZ0ZXJMb2FkOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIXRoaXMuY291bnQoKSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNob3dPdmVybGF5KFwiU29ycnksIHRoZXJlIGlzIG5vIGRhdGFcIik7XG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5oaWRlT3ZlcmxheSgpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgXVxuICAgICAgICB9O1xuICAgICAgICByZXR1cm4gZ3JpZDtcbiAgICB9XG5cbiAgICBzaG93RXJyb3IobWVzc2FnZSkge1xuICAgICAgICB0aGlzLmVycm9yVmlldy5zaG93RXJyb3IobWVzc2FnZSk7XG4gICAgfVxuXG4gICAgaGFuZGxlUmVzdWx0KHByb21pc2UsIGNhbGxiYWNrKSB7XG4gICAgICAgIHRoaXMuc29sdXRpb25zVGFibGUuc2hvd1Byb2dyZXNzKHsgaGlkZTogZmFsc2UgfSk7XG5cbiAgICAgICAgcHJvbWlzZS50aGVuKChkYXRhKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBzb2x1dGlvbkl0ZW0gPSBkYXRhLmpzb24oKS5zb2x1dGlvbjtcbiAgICAgICAgICAgIGlmIChjYWxsYmFjayBpbnN0YW5jZW9mIEZ1bmN0aW9uKSB7XG4gICAgICAgICAgICAgICAgY2FsbGJhY2soc29sdXRpb25JdGVtKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgd2ViaXgubWVzc2FnZSh7XG4gICAgICAgICAgICAgICAgdHlwZTogXCJzdWNjZXNzXCIsXG4gICAgICAgICAgICAgICAgdGV4dDogXCJUaGUgb3BlcmF0aW9uIGhhcyBiZWVkIGRvbmUgc3VjY2Vzc2Z1bGx5XCJcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICB0aGlzLnNvbHV0aW9uc1RhYmxlLnNob3dQcm9ncmVzcyh7IGhpZGU6IHRydWUgfSk7XG4gICAgICAgIH0pLmNhdGNoKGVycm9yID0+IHtcbiAgICAgICAgICAgIHRoaXMuc2hvd0Vycm9yKFwiRXJyb3IgaGFzIGhhcHBlbmVkIGR1cmluZyB0aGlzIG9wZXJhdGlvbjogXCIgKyBlcnJvci5yZXNwb25zZSwgXCJFcnJvclwiKTtcbiAgICAgICAgICAgIHRoaXMuc29sdXRpb25zVGFibGUuc2hvd1Byb2dyZXNzKHsgaGlkZTogdHJ1ZSB9KTtcbiAgICAgICAgfSlcbiAgICB9XG5cbiAgICBkZWxldGVTb2x1dGlvbihzb2x1dGlvblR5cGUsIHNvbHV0aW9uTmFtZSwgaXRlbUlkKSB7XG4gICAgICAgIHRoaXMuaGFuZGxlUmVzdWx0KHNvbHV0aW9ucy5kZWxldGUoc29sdXRpb25UeXBlLCBzb2x1dGlvbk5hbWUpLCAoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLnNvbHV0aW9uc1RhYmxlLnJlbW92ZShpdGVtSWQpXG4gICAgICAgIH0pO1xuXG4gICAgfVxuXG4gICAgbG9hZFNvbHV0aW9ucygpIHtcbiAgICAgICAgc29sdXRpb25zLmxpc3QoKS50aGVuKGRhdGEgPT4ge1xuICAgICAgICAgICAgbGV0IHNvbHV0aW9ucyA9IGRhdGEuanNvbigpLnNvbHV0aW9uc1xuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzb2x1dGlvbnMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICBzb2x1dGlvbnNbaV0ucmVzZXJ2YXRpb24gPSBKU09OLnBhcnNlKHNvbHV0aW9uc1tpXS5yZXNlcnZhdGlvbilcbiAgICAgICAgICAgICAgICBzb2x1dGlvbnNbaV0uZm9ybV9pbmZvID0gSlNPTi5wYXJzZShzb2x1dGlvbnNbaV0uZm9ybV9pbmZvKVxuXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLnNvbHV0aW9uc1RhYmxlLnBhcnNlKHNvbHV0aW9ucyk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHZpZXdJdGVtKGlkKSB7XG4gICAgICAgIHRoaXMucmVzZXJ2YXRpb25WaWV3LnNob3dGb3IodGhpcy5zb2x1dGlvbnNUYWJsZS5nZXRJdGVtKGlkKSk7XG4gICAgfVxuXG4gICAgaW5pdCh2aWV3KSB7XG4gICAgICAgIGNvbnN0IHNlbGYgPSB0aGlzO1xuXG4gICAgICAgIHNlbGYuZXJyb3JWaWV3ID0gdGhpcy51aShFcnJvclZpZXcpO1xuICAgICAgICBzZWxmLnJlc2VydmF0aW9uVmlldyA9IHNlbGYudWkoUmVzZXJ2YXRpb25WaWV3KTtcblxuICAgICAgICBjb25zdCBtZW51ID0gd2ViaXgudWkoe1xuICAgICAgICAgICAgdmlldzogXCJjb250ZXh0bWVudVwiLFxuICAgICAgICAgICAgaWQ6IFwic29sdXRpb25zX2NtXCJcbiAgICAgICAgfSk7XG5cbiAgICAgICAgdGhpcy5zb2x1dGlvbnNUYWJsZSA9IHRoaXMuJCQoXCJzb2x1dGlvbnNfdGFibGVcIik7XG4gICAgICAgIHNlbGYubG9hZFNvbHV0aW9ucygpO1xuICAgICAgICB3ZWJpeC5leHRlbmQodGhpcy5zb2x1dGlvbnNUYWJsZSwgd2ViaXguUHJvZ3Jlc3NCYXIpO1xuXG4gICAgICAgIGZ1bmN0aW9uIGNoZWNrQWN0aW9uKGFjdGlvbiwgc2VsZWN0ZWRJdGVtSWQpIHtcbiAgICAgICAgICAgIGNvbnN0IGl0ZW0gPSBzZWxmLnNvbHV0aW9uc1RhYmxlLmdldEl0ZW0oc2VsZWN0ZWRJdGVtSWQpO1xuICAgICAgICAgICAgaWYgKGl0ZW0pIHtcbiAgICAgICAgICAgICAgICBsZXQgaXRlbUlkID0gaXRlbS5pZDtcbiAgICAgICAgICAgICAgICBsZXQgc29sdXRpb25OYW1lID0gaXRlbS5zb2x1dGlvbk5hbWU7XG4gICAgICAgICAgICAgICAgbGV0IHNvbHV0aW9uVHlwZSA9IGl0ZW0uc29sdXRpb25UeXBlO1xuICAgICAgICAgICAgICAgIGxldCBuZXh0QWN0aW9uID0gaXRlbS5yZXNlcnZhdGlvbi5uZXh0X2FjdGlvblxuXG4gICAgICAgICAgICAgICAgaWYgKGFjdGlvbiA9PSAnZGVsZXRlJykge1xuICAgICAgICAgICAgICAgICAgICB3ZWJpeC5jb25maXJtKHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRpdGxlOiBcIkNhbmNlbCBTb2x1dGlvblwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgb2s6IFwiWWVzXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICB0ZXh0OiBgQXJlIHlvdSBzdXJlIHlvdSB3YW50IHRvIGNhbmNlbCAke3NvbHV0aW9uTmFtZX0/YCxcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhbmNlbDogXCJOb1wiLFxuICAgICAgICAgICAgICAgICAgICB9KS50aGVuKCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuZGVsZXRlU29sdXRpb24oc29sdXRpb25UeXBlLCBzb2x1dGlvbk5hbWUsIGl0ZW1JZClcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB3ZWJpeC5tZXNzYWdlKFwiWW91IG5lZWQgdG8gc2VsZWN0IGEgc29sdXRpb25cIilcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgICQkKFwic29sdXRpb25zX2NtXCIpLmF0dGFjaEV2ZW50KFwib25NZW51SXRlbUNsaWNrXCIsIGZ1bmN0aW9uIChpZCkge1xuICAgICAgICAgICAgY2hlY2tBY3Rpb24oaWQsIHNlbGYuc29sdXRpb25zVGFibGUuZ2V0U2VsZWN0ZWRJZCgpKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgc2VsZi5zb2x1dGlvbnNUYWJsZS5hdHRhY2hFdmVudChcIm9uSXRlbURibENsaWNrXCIsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHNlbGYudmlld0l0ZW0oc2VsZi5zb2x1dGlvbnNUYWJsZS5nZXRTZWxlY3RlZElkKCkpO1xuICAgICAgICB9KTtcblxuICAgICAgICB3ZWJpeC5ldmVudChzZWxmLnNvbHV0aW9uc1RhYmxlLiR2aWV3LCBcImNvbnRleHRtZW51XCIsIGZ1bmN0aW9uIChlIC8qTW91c2VFdmVudCovKSB7XG4gICAgICAgICAgICBjb25zdCBwb3MgPSBzZWxmLnNvbHV0aW9uc1RhYmxlLmxvY2F0ZShlKTtcbiAgICAgICAgICAgIGlmIChwb3MpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBpdGVtID0gc2VsZi5zb2x1dGlvbnNUYWJsZS5nZXRJdGVtKHBvcy5yb3cpO1xuICAgICAgICAgICAgICAgIGNvbnN0IGFjdGlvbnMgPSBbJ2RlbGV0ZSddO1xuXG4gICAgICAgICAgICAgICAgbWVudS5jbGVhckFsbCgpO1xuICAgICAgICAgICAgICAgIG1lbnUucGFyc2UoYWN0aW9ucyk7XG4gICAgICAgICAgICAgICAgbWVudS5zaG93KGUpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHdlYml4Lmh0bWwucHJldmVudEV2ZW50KGUpO1xuICAgICAgICB9KVxuXG4gICAgfVxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc291cmNlcy92aWV3cy9kZXBsb3llZFNvbHV0aW9ucy9pbmRleC5qcyIsImltcG9ydCB7IEV4dGVybmFsVmlldyB9IGZyb20gXCIuLi9leHRlcm5hbFwiO1xuXG5jb25zdCBVUkwgPSBcIi90aHJlZWJvdC9mYXJtbWFuYWdlbWVudFwiO1xuY29uc3QgUkVRVUlSRURfUEFDS0FHRVMgPSB7XG4gICAgXCJ0aHJlZWJvdC5mYXJtbWFuYWdlbWVudFwiOiBcImh0dHBzOi8vZ2l0aHViLmNvbS90aHJlZWZvbGR0ZWNoL2p1bXBzY2FsZVhfdGhyZWVib3QvdHJlZS9kZXZlbG9wbWVudC9UaHJlZUJvdFBhY2thZ2VzL3RocmVlYm90L2Zhcm1tYW5hZ2VtZW50XCJcbn1cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRmFybW1hbmFnZW1lbnRWaWV3IGV4dGVuZHMgRXh0ZXJuYWxWaWV3IHtcbiAgICBjb25zdHJ1Y3RvcihhcHAsIG5hbWUpIHtcbiAgICAgICAgc3VwZXIoYXBwLCBuYW1lLCBVUkwsIFJFUVVJUkVEX1BBQ0tBR0VTKTtcbiAgICB9XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zb3VyY2VzL3ZpZXdzL2Zhcm1tYW5hZ2VtZW50L2luZGV4LmpzIiwiaW1wb3J0IHsgRXh0ZXJuYWxWaWV3IH0gZnJvbSBcIi4uL2V4dGVybmFsXCI7XG5cbmNvbnN0IFVSTCA9IFwiL3RocmVlZm9sZC9zaW11bGF0b3Ivbm90ZWJvb2svXCI7XG5jb25zdCBSRVFVSVJFRF9QQUNLQUdFUyA9IHtcbiAgICBcInRocmVlZm9sZC5zaW11bGF0b3JcIjogXCJodHRwczovL2dpdGh1Yi5jb20vdGhyZWVmb2xkdGVjaC9qdW1wc2NhbGVYX3RocmVlYm90L3RyZWUvZGV2ZWxvcG1lbnQvVGhyZWVCb3RQYWNrYWdlcy90aHJlZWZvbGQvc2ltdWxhdG9yXCJcbn1cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgSnVweXRlclZpZXcgZXh0ZW5kcyBFeHRlcm5hbFZpZXcge1xuICAgIGNvbnN0cnVjdG9yKGFwcCwgbmFtZSkge1xuICAgICAgICBzdXBlcihhcHAsIG5hbWUsIFVSTCwgUkVRVUlSRURfUEFDS0FHRVMpO1xuICAgIH1cbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NvdXJjZXMvdmlld3MvanVweXRlci9pbmRleC5qcyIsImltcG9ydCB7IEpldFZpZXcgfSBmcm9tIFwid2ViaXgtamV0XCI7XG5cbmltcG9ydCBBcHBMb2dzVmlldyBmcm9tIFwiLi9hcHBMb2dzXCI7XG5pbXBvcnQgeyBsb2dzIH0gZnJvbSBcIi4uLy4uL3NlcnZpY2VzL2xvZ3NcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTG9nc1ZpZXcgZXh0ZW5kcyBKZXRWaWV3IHtcbiAgICBjb25maWcoKSB7XG5cbiAgICAgICAgY29uc3QgdmlldyA9IHtcbiAgICAgICAgICAgIHJvd3M6IFt7XG4gICAgICAgICAgICAgICAgY29sczogW1xuICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICB2aWV3OiBcInRlbXBsYXRlXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICB0eXBlOiBcImhlYWRlclwiLCB0ZW1wbGF0ZTogXCJMb2dzXCIsXG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZpZXc6IFwiY29tYm9cIixcbiAgICAgICAgICAgICAgICAgICAgICAgIGlkOiBcImFwcHNfY29tYm9cIixcbiAgICAgICAgICAgICAgICAgICAgICAgIHBsYWNlaG9sZGVyOiBcIkNob29zZSB5b3VyIGFwcGxpY2F0aW9uXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBvbjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlOiBmdW5jdGlvbiAoYXBwTmFtZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLiRzY29wZS5zaG93Rm9yKGFwcE5hbWUpXG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBBcHBMb2dzVmlld1xuICAgICAgICAgICAgXVxuICAgICAgICB9O1xuXG4gICAgICAgIHJldHVybiB2aWV3O1xuICAgIH1cblxuICAgIGluaXQodmlldykge1xuICAgICAgICB2aWV3LmFwcHNDb21ibyA9ICQkKFwiYXBwc19jb21ib1wiKTtcbiAgICAgICAgbG9ncy5saXN0QXBwcygpLnRoZW4oZGF0YSA9PiB7XG4gICAgICAgICAgICB2aWV3LmFwcHNDb21iby5kZWZpbmUoXCJvcHRpb25zXCIsIGRhdGEuanNvbigpKTtcbiAgICAgICAgICAgIHZpZXcuYXBwc0NvbWJvLnJlbmRlcigpO1xuICAgICAgICB9KTtcblxuICAgIH1cblxuICAgIHVybENoYW5nZSh2aWV3LCB1cmwpIHtcbiAgICAgICAgY29uc3QgYXBwTmFtZSA9IHVybFswXS5wYXJhbXMuYXBwbmFtZSwgbG9nSWQgPSB1cmxbMF0ucGFyYW1zLmxvZ2lkO1xuICAgICAgICBpZiAoYXBwTmFtZSkge1xuICAgICAgICAgICAgdGhpcy5zaG93Rm9yKGFwcE5hbWUsIGxvZ0lkKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHNob3dGb3IoYXBwTmFtZSwgbG9nSWQpIHtcbiAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgICAgICBzZWxmLmFwcExvZ3MgPSAkJChcImFwcGxvZ3NfdGFibGVcIik7XG5cbiAgICAgICAgd2ViaXguZXh0ZW5kKHNlbGYuYXBwTG9ncywgd2ViaXguUHJvZ3Jlc3NCYXIpO1xuICAgICAgICBzZWxmLmFwcExvZ3Muc2hvd1Byb2dyZXNzKHsgaGlkZTogZmFsc2UgfSk7XG5cbiAgICAgICAgbG9ncy5saXN0KGFwcE5hbWUsIGxvZ0lkKS50aGVuKGRhdGEgPT4ge1xuICAgICAgICAgICAgc2VsZi5hcHBMb2dzLmNsZWFyQWxsKClcbiAgICAgICAgICAgIHNlbGYuYXBwTG9ncy5wYXJzZShkYXRhLmpzb24oKVswXSlcbiAgICAgICAgICAgIHNlbGYuYXBwTG9ncy5zaG93UHJvZ3Jlc3MoeyBoaWRlOiB0cnVlIH0pO1xuICAgICAgICB9KTtcbiAgICB9XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zb3VyY2VzL3ZpZXdzL2xvZ3MvaW5kZXguanMiLCJpbXBvcnQgeyBKZXRWaWV3IH0gZnJvbSBcIndlYml4LWpldFwiO1xuXG5pbXBvcnQgeyBFcnJvclZpZXcgfSBmcm9tIFwiLi4vZXJyb3JzL2RpYWxvZ1wiO1xuaW1wb3J0IHsgcGFja2FnZXMgfSBmcm9tIFwiLi4vLi4vc2VydmljZXMvcGFja2FnZXNcIjtcblxuY29uc3QgVU5LTk9XTl9TVEFUVVMgPSAnVW5rbm93bic7XG5cbmNvbnN0IFBBQ0tBR0VfU1RBVEVTID0gW1xuICAgIHtcbiAgICAgICAgbmFtZTogXCJJbml0XCIsXG4gICAgICAgIGFjdGlvbnM6IFtdXG4gICAgfSxcbiAgICB7XG4gICAgICAgIG5hbWU6IFwiQ29uZmlnXCIsXG4gICAgICAgIGFjdGlvbnM6IFsnaW5zdGFsbCddLFxuICAgIH0sXG4gICAge1xuICAgICAgICBuYW1lOiBcIkluc3RhbGxlZFwiLFxuICAgICAgICBhY3Rpb25zOiBbJ3N0YXJ0J11cbiAgICB9LFxuICAgIHtcbiAgICAgICAgbmFtZTogXCJSdW5uaW5nXCIsXG4gICAgICAgIGFjdGlvbnM6IFtcInN0b3BcIl1cbiAgICB9LFxuICAgIHtcbiAgICAgICAgbmFtZTogXCJIYWx0ZWRcIixcbiAgICAgICAgYWN0aW9uczogW1wic3RhcnRcIiwgXCJkaXNhYmxlXCJdXG4gICAgfSxcbiAgICB7XG4gICAgICAgIG5hbWU6IFwiRGlzYWJsZWRcIixcbiAgICAgICAgYWN0aW9uczogW1wiZW5hYmxlXCJdXG4gICAgfSxcbiAgICB7XG4gICAgICAgIG5hbWU6IFwiRXJyb3JcIixcbiAgICAgICAgYWN0aW9uczogWydpbnN0YWxsJ11cbiAgICB9XG5dO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBQYWNrYWdlc1ZpZXcgZXh0ZW5kcyBKZXRWaWV3IHtcbiAgICBjb25maWcoKSB7XG4gICAgICAgIGNvbnN0IGdyaWQgPSB7XG4gICAgICAgICAgICByb3dzOiBbe1xuICAgICAgICAgICAgICAgIC8vSGVhZGVyXG4gICAgICAgICAgICAgICAgdmlldzogXCJ0ZW1wbGF0ZVwiLFxuICAgICAgICAgICAgICAgIHR5cGU6IFwiaGVhZGVyXCIsXG4gICAgICAgICAgICAgICAgdGVtcGxhdGU6IFwiUGFja2FnZXNcIixcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7IC8vYWRkaW5nIFBhY2thZ2VcbiAgICAgICAgICAgICAgICBjb2xzOiBbe1xuICAgICAgICAgICAgICAgICAgICAvL3NlbGVjdG9yXG4gICAgICAgICAgICAgICAgICAgIHZpZXc6IFwic2VsZWN0XCIsXG4gICAgICAgICAgICAgICAgICAgIGlkOiAnbWV0aG9kX3NlbGVjdG9yJyxcbiAgICAgICAgICAgICAgICAgICAgb3B0aW9uczogW1wiUGF0aFwiLCBcIkdpdHVybFwiXSxcbiAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDEwMFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgLy90ZXh0IGFyZWFcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIHZpZXc6IFwidGV4dFwiLFxuICAgICAgICAgICAgICAgICAgICBpZDogJ3BhY2thZ2VfcGF0aCcsXG4gICAgICAgICAgICAgICAgICAgIGlucHV0QWxpZ246IFwibGVmdFwiLFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgLy9zdWJtaXQgYnV0dG9uXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICB2aWV3OiBcImJ1dHRvblwiLFxuICAgICAgICAgICAgICAgICAgICBpZDogXCJhZGRfcGFja2FnZV9idXR0b25cIixcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU6IFwiQWRkIHBhY2thZ2VcIixcbiAgICAgICAgICAgICAgICAgICAgYXV0b3dpZHRoOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICB0eXBlOiBcIlwiLFxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgeyAvL0RhdGFUYWJsZVxuICAgICAgICAgICAgICAgIHZpZXc6IFwiZGF0YXRhYmxlXCIsXG4gICAgICAgICAgICAgICAgaWQ6IFwicGFja2FnZXNfdGFibGVcIixcbiAgICAgICAgICAgICAgICByZXNpemVDb2x1bW46IHRydWUsXG4gICAgICAgICAgICAgICAgdHlwZToge1xuICAgICAgICAgICAgICAgICAgICBoZWlnaHQ6IDIwMCxcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHNjcm9sbDogXCJ4eVwiLFxuICAgICAgICAgICAgICAgIGF1dG9Db25maWc6IHRydWUsXG4gICAgICAgICAgICAgICAgdmlldzogXCJkYXRhdGFibGVcIixcbiAgICAgICAgICAgICAgICBzZWxlY3Q6IHRydWUsXG4gICAgICAgICAgICAgICAgY3NzOiBcIndlYml4X2hlYWRlcl9ib3JkZXIgd2ViaXhfZGF0YV9ib3JkZXJcIixcbiAgICAgICAgICAgICAgICBvbkNvbnRleHQ6IHt9LFxuICAgICAgICAgICAgICAgIGNvbHVtbnM6IFt7XG4gICAgICAgICAgICAgICAgICAgIGlkOiBcImluZGV4XCIsXG4gICAgICAgICAgICAgICAgICAgIGhlYWRlcjogXCIjXCIsXG4gICAgICAgICAgICAgICAgICAgIHNvcnQ6IFwiaW50XCIsXG4gICAgICAgICAgICAgICAgICAgIGF1dG93aWR0aDogdHJ1ZSxcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgaWQ6IFwiYXV0aG9yXCIsXG4gICAgICAgICAgICAgICAgICAgIGhlYWRlcjogW1wiQXV0aG9yXCIsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRlbnQ6IFwic2VsZWN0RmlsdGVyXCJcbiAgICAgICAgICAgICAgICAgICAgfV0sXG4gICAgICAgICAgICAgICAgICAgIHNvcnQ6IFwic3RyaW5nXCIsXG4gICAgICAgICAgICAgICAgICAgIHdpZHRoOiAyMDBcbiAgICAgICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgICAgIGlkOiBcInNvdXJjZV9uYW1lXCIsXG4gICAgICAgICAgICAgICAgICAgIGhlYWRlcjogW1wiTmFtZVwiLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb250ZW50OiBcInRleHRGaWx0ZXJcIlxuICAgICAgICAgICAgICAgICAgICB9XSxcbiAgICAgICAgICAgICAgICAgICAgc29ydDogXCJzdHJpbmdcIixcbiAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDIwMFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBpZDogXCJzdGF0dXNcIixcbiAgICAgICAgICAgICAgICAgICAgaGVhZGVyOiBcIlN0YXR1c1wiLFxuICAgICAgICAgICAgICAgICAgICBzb3J0OiBcInN0cmluZ1wiLFxuICAgICAgICAgICAgICAgICAgICBmb3JtYXQ6ICh2YWx1ZSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3Qgc3RhdHVzID0gUEFDS0FHRV9TVEFURVNbdmFsdWVdO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHN0YXR1cyAmJiBzdGF0dXMubmFtZSB8fCBVTktOT1dOX1NUQVRVUztcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgICAgIGlkOiBcInBhdGhcIixcbiAgICAgICAgICAgICAgICAgICAgaGVhZGVyOiBcIlBhdGhcIixcbiAgICAgICAgICAgICAgICAgICAgc29ydDogXCJzdHJpbmdcIixcbiAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDcwMFxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgIHNjaGVtZToge1xuICAgICAgICAgICAgICAgICAgICAkaW5pdDogZnVuY3Rpb24gKG9iaikge1xuICAgICAgICAgICAgICAgICAgICAgICAgb2JqLnNvdXJjZV9uYW1lID0gb2JqLnNvdXJjZS5uYW1lO1xuICAgICAgICAgICAgICAgICAgICAgICAgb2JqLmF1dGhvciA9IG9iai5zb3VyY2UudGhyZWVib3Q7XG4gICAgICAgICAgICAgICAgICAgICAgICBvYmouaW5kZXggPSB0aGlzLmNvdW50KCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBdXG4gICAgICAgIH07XG4gICAgICAgIHJldHVybiBncmlkO1xuICAgIH1cblxuICAgIHNob3dFcnJvcihtZXNzYWdlKSB7XG4gICAgICAgIHRoaXMuZXJyb3JWaWV3LnNob3dFcnJvcihtZXNzYWdlKTtcbiAgICB9XG5cbiAgICBoYW5kbGVSZXN1bHQocHJvbWlzZSwgY2FsbGJhY2spIHtcbiAgICAgICAgdGhpcy5wYWNrYWdlVGFibGUuc2hvd1Byb2dyZXNzKHsgaGlkZTogZmFsc2UgfSk7XG5cbiAgICAgICAgcHJvbWlzZS50aGVuKChkYXRhKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBwYWNrYWdlSXRlbSA9IGRhdGEuanNvbigpLnBhY2thZ2U7XG4gICAgICAgICAgICBpZiAoY2FsbGJhY2sgaW5zdGFuY2VvZiBGdW5jdGlvbikge1xuICAgICAgICAgICAgICAgIGNhbGxiYWNrKHBhY2thZ2VJdGVtKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgd2ViaXgubWVzc2FnZSh7XG4gICAgICAgICAgICAgICAgdHlwZTogXCJzdWNjZXNzXCIsXG4gICAgICAgICAgICAgICAgdGV4dDogXCJUaGUgb3BlcmF0aW9uIGhhcyBiZWVkIGRvbmUgc3VjY2Vzc2Z1bGx5XCJcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICB0aGlzLnBhY2thZ2VUYWJsZS5zaG93UHJvZ3Jlc3MoeyBoaWRlOiB0cnVlIH0pO1xuICAgICAgICB9KS5jYXRjaChlcnJvciA9PiB7XG4gICAgICAgICAgICB0aGlzLnNob3dFcnJvcihcIkVycm9yIGhhcyBoYXBwZW5lZCBkdXJpbmcgdGhpcyBvcGVyYXRpb246IFwiICsgZXJyb3IucmVzcG9uc2UsIFwiRXJyb3JcIik7XG4gICAgICAgICAgICB0aGlzLnBhY2thZ2VUYWJsZS5zaG93UHJvZ3Jlc3MoeyBoaWRlOiB0cnVlIH0pO1xuICAgICAgICB9KVxuICAgIH1cblxuICAgIGFkZFBhY2thZ2UocGF0aCwgZ2l0VXJsLCBpdGVtSWQpIHtcbiAgICAgICAgdGhpcy5oYW5kbGVSZXN1bHQocGFja2FnZXMuYWRkKHBhdGgsIGdpdFVybCksIChpdGVtKSA9PiB7XG4gICAgICAgICAgICBpZiAoaXRlbUlkKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5wYWNrYWdlVGFibGUudXBkYXRlSXRlbShpdGVtSWQsIGl0ZW0pO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLnBhY2thZ2VUYWJsZS5hZGQoaXRlbSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGRlbGV0ZVBhY2thZ2UocGFja2FnZU5hbWUsIGl0ZW1JZCkge1xuICAgICAgICB0aGlzLmhhbmRsZVJlc3VsdChwYWNrYWdlcy5kZWxldGUocGFja2FnZU5hbWUpLCAoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLnBhY2thZ2VUYWJsZS5yZW1vdmUoaXRlbUlkKVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBzdGFydFBhY2thZ2UocGFja2FnZU5hbWUsIGl0ZW1JZCkge1xuICAgICAgICB0aGlzLmhhbmRsZVJlc3VsdChwYWNrYWdlcy5zdGFydChwYWNrYWdlTmFtZSksIChpdGVtKSA9PiB7XG4gICAgICAgICAgICB0aGlzLnBhY2thZ2VUYWJsZS51cGRhdGVJdGVtKGl0ZW1JZCwgaXRlbSk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHN0b3BQYWNrYWdlKHBhY2thZ2VOYW1lLCBpdGVtSWQpIHtcbiAgICAgICAgdGhpcy5oYW5kbGVSZXN1bHQocGFja2FnZXMuc3RvcChwYWNrYWdlTmFtZSksIChpdGVtKSA9PiB7XG4gICAgICAgICAgICB0aGlzLnBhY2thZ2VUYWJsZS51cGRhdGVJdGVtKGl0ZW1JZCwgaXRlbSk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGVuYWJsZVBhY2thZ2UocGFja2FnZU5hbWUsIGl0ZW1JZCkge1xuICAgICAgICB0aGlzLmhhbmRsZVJlc3VsdChwYWNrYWdlcy5lbmFibGUocGFja2FnZU5hbWUpLCAoaXRlbSkgPT4ge1xuICAgICAgICAgICAgdGhpcy5wYWNrYWdlVGFibGUudXBkYXRlSXRlbShpdGVtSWQsIGl0ZW0pO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBkaXNhYmxlUGFja2FnZShwYWNrYWdlTmFtZSwgaXRlbUlkKSB7XG4gICAgICAgIHRoaXMuaGFuZGxlUmVzdWx0KHBhY2thZ2VzLmRpc2FibGUocGFja2FnZU5hbWUpLCAoaXRlbSkgPT4ge1xuICAgICAgICAgICAgdGhpcy5wYWNrYWdlVGFibGUudXBkYXRlSXRlbShpdGVtSWQsIGl0ZW0pO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBsb2FkUGFja2FnZXMoKSB7XG4gICAgICAgIHBhY2thZ2VzLmxpc3QoKS50aGVuKGRhdGEgPT4ge1xuICAgICAgICAgICAgdGhpcy5wYWNrYWdlVGFibGUucGFyc2UoZGF0YS5qc29uKCkucGFja2FnZXMpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBpbml0KHZpZXcpIHtcbiAgICAgICAgY29uc3Qgc2VsZiA9IHRoaXM7XG5cbiAgICAgICAgc2VsZi5lcnJvclZpZXcgPSB0aGlzLnVpKEVycm9yVmlldyk7XG4gICAgICAgIHNlbGYuX3JlcXVpcmVkcGFja2FnZXMgPSBbXCJ6ZXJvYm90LmJhc2VcIiwgXCJ6ZXJvYm90LndlYmludGVyZmFjZVwiLCBcInplcm9ib3QuYWRtaW5cIl1cblxuICAgICAgICBjb25zdCBtZW51ID0gd2ViaXgudWkoe1xuICAgICAgICAgICAgdmlldzogXCJjb250ZXh0bWVudVwiLFxuICAgICAgICAgICAgaWQ6IFwicGFja2FnZXNfY21cIlxuICAgICAgICB9KTtcblxuICAgICAgICB0aGlzLnBhY2thZ2VUYWJsZSA9IHRoaXMuJCQoXCJwYWNrYWdlc190YWJsZVwiKTtcbiAgICAgICAgd2ViaXguZXh0ZW5kKHRoaXMucGFja2FnZVRhYmxlLCB3ZWJpeC5Qcm9ncmVzc0Jhcik7XG5cbiAgICAgICAgZnVuY3Rpb24gY2hlY2tBY3Rpb24oYWN0aW9uLCBzZWxlY3RlZEl0ZW1JZCkge1xuICAgICAgICAgICAgY29uc3QgaXRlbSA9IHNlbGYucGFja2FnZVRhYmxlLmdldEl0ZW0oc2VsZWN0ZWRJdGVtSWQpO1xuICAgICAgICAgICAgaWYgKGl0ZW0pIHtcbiAgICAgICAgICAgICAgICBsZXQgaXRlbUlkID0gaXRlbS5pZDtcbiAgICAgICAgICAgICAgICBsZXQgcGFja2FnZU5hbWUgPSBpdGVtLm5hbWU7XG5cbiAgICAgICAgICAgICAgICBpZiAoYWN0aW9uID09ICdpbnN0YWxsJykge1xuICAgICAgICAgICAgICAgICAgICBzZWxmLmFkZFBhY2thZ2UoaXRlbS5wYXRoLCBudWxsLCBpdGVtSWQpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoYWN0aW9uID09ICdkZWxldGUnKSB7XG4gICAgICAgICAgICAgICAgICAgIHdlYml4LmNvbmZpcm0oe1xuICAgICAgICAgICAgICAgICAgICAgICAgdGl0bGU6IFwiRGVsZXRlIFBhY2thZ2VcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIG9rOiBcIlllc1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgdGV4dDogYEFyZSB5b3Ugc3VyZSB5b3Ugd2FudCB0byBkZWxldGUgJHtwYWNrYWdlTmFtZX0/YCxcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhbmNlbDogXCJOb1wiLFxuICAgICAgICAgICAgICAgICAgICB9KS50aGVuKCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuZGVsZXRlUGFja2FnZShwYWNrYWdlTmFtZSwgaXRlbUlkKVxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgLy9cbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGFjdGlvbiA9PSAnc3RhcnQnKSB7XG4gICAgICAgICAgICAgICAgICAgIHNlbGYuc3RhcnRQYWNrYWdlKHBhY2thZ2VOYW1lLCBpdGVtSWQpXG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChhY3Rpb24gPT0gJ3N0b3AnKSB7XG4gICAgICAgICAgICAgICAgICAgIHNlbGYuc3RvcFBhY2thZ2UocGFja2FnZU5hbWUsIGl0ZW1JZClcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGFjdGlvbiA9PSAnZGlzYWJsZScpIHtcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5kaXNhYmxlUGFja2FnZShwYWNrYWdlTmFtZSwgaXRlbUlkKVxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoYWN0aW9uID09ICdlbmFibGUnKSB7XG4gICAgICAgICAgICAgICAgICAgIHNlbGYuZW5hYmxlUGFja2FnZShwYWNrYWdlTmFtZSwgaXRlbUlkKVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgd2ViaXgubWVzc2FnZShcInlvdSBoYXZlIHRvIHNlbGVjdCBhIHBhY2thZ2VcIilcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgICQkKFwiYWRkX3BhY2thZ2VfYnV0dG9uXCIpLmF0dGFjaEV2ZW50KFwib25JdGVtQ2xpY2tcIiwgZnVuY3Rpb24gKGlkKSB7XG4gICAgICAgICAgICBsZXQgcGFjYWtnZUxvY2F0aW9uID0gJCQoXCJwYWNrYWdlX3BhdGhcIikuZ2V0VmFsdWUoKVxuICAgICAgICAgICAgaWYgKHBhY2FrZ2VMb2NhdGlvbiA9PSBcIlwiKSB7XG4gICAgICAgICAgICAgICAgYWxlcnQoXCJwbGVhc2UgZW50ZXIgcGFja2FnZSBsb2NhdGlvblwiKVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBsZXQgcGFja2FnZU1ldGhvZCA9ICQkKFwibWV0aG9kX3NlbGVjdG9yXCIpLmdldFZhbHVlKClcbiAgICAgICAgICAgICAgICBsZXQgZ2l0VXJsID0gbnVsbDtcbiAgICAgICAgICAgICAgICBsZXQgcGF0aCA9IG51bGw7XG4gICAgICAgICAgICAgICAgaWYgKHBhY2thZ2VNZXRob2QgPT0gXCJHaXR1cmxcIikge1xuICAgICAgICAgICAgICAgICAgICBnaXRVcmwgPSBwYWNha2dlTG9jYXRpb25cbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHBhY2thZ2VNZXRob2QgPT0gXCJQYXRoXCIpIHtcbiAgICAgICAgICAgICAgICAgICAgcGF0aCA9IHBhY2FrZ2VMb2NhdGlvblxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGFsZXJ0KFwic29tZXRoaW5nIHdlbnQgd3JvbmcgZHVyaW5nIHNlbGVjdGluZyB0aGUgcGFja2FnZSBtZXRob2RcIilcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgc2VsZi5hZGRQYWNrYWdlKHBhdGgsIGdpdFVybClcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgJCQoXCJwYWNrYWdlc19jbVwiKS5hdHRhY2hFdmVudChcIm9uTWVudUl0ZW1DbGlja1wiLCBmdW5jdGlvbiAoaWQpIHtcbiAgICAgICAgICAgIGNoZWNrQWN0aW9uKGlkLCBzZWxmLnBhY2thZ2VUYWJsZS5nZXRTZWxlY3RlZElkKCkpO1xuICAgICAgICB9KTtcblxuXG4gICAgICAgIHdlYml4LmV2ZW50KHNlbGYucGFja2FnZVRhYmxlLiR2aWV3LCBcImNvbnRleHRtZW51XCIsIGZ1bmN0aW9uIChlIC8qTW91c2VFdmVudCovKSB7XG4gICAgICAgICAgICBjb25zdCBwb3MgPSBzZWxmLnBhY2thZ2VUYWJsZS5sb2NhdGUoZSk7XG4gICAgICAgICAgICBpZiAocG9zKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgaXRlbSA9IHNlbGYucGFja2FnZVRhYmxlLmdldEl0ZW0ocG9zLnJvdyk7XG4gICAgICAgICAgICAgICAgaWYoIHNlbGYuX3JlcXVpcmVkcGFja2FnZXMuaW5jbHVkZXMoaXRlbS5uYW1lKSApe1xuICAgICAgICAgICAgICAgICAgICB3ZWJpeC5tZXNzYWdlKHsgdHlwZTogXCJlcnJvclwiLCB0ZXh0OiBgJHtpdGVtLm5hbWV9IGlzIHJlcXVpcmVkIHBhY2thZ2VgIH0pO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm5cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgY29uc3QgYWN0aW9ucyA9IFsuLi5QQUNLQUdFX1NUQVRFU1tpdGVtLnN0YXR1c10uYWN0aW9ucywgJ2RlbGV0ZSddO1xuXG4gICAgICAgICAgICAgICAgbWVudS5jbGVhckFsbCgpO1xuICAgICAgICAgICAgICAgIG1lbnUucGFyc2UoYWN0aW9ucyk7XG4gICAgICAgICAgICAgICAgbWVudS5zaG93KGUpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHdlYml4Lmh0bWwucHJldmVudEV2ZW50KGUpO1xuICAgICAgICB9KVxuXG4gICAgICAgIHNlbGYubG9hZFBhY2thZ2VzKCk7XG4gICAgfVxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc291cmNlcy92aWV3cy9wYWNrYWdlcy9pbmRleC5qcyIsImltcG9ydCB7IEV4dGVybmFsVmlldyB9IGZyb20gXCIuLi9leHRlcm5hbFwiO1xuXG5jb25zdCBVUkwgPSBcIi90aHJlZWZvbGQvc2RrZXhhbXBsZXMvbm90ZWJvb2svXCI7XG5jb25zdCBSRVFVSVJFRF9QQUNLQUdFUyA9IHtcbiAgICBcInRocmVlZm9sZC5zZGtleGFtcGxlc1wiOiBcImh0dHBzOi8vZ2l0aHViLmNvbS90aHJlZWZvbGR0ZWNoL2p1bXBzY2FsZVhfdGhyZWVib3QvdHJlZS9kZXZlbG9wbWVudC9UaHJlZUJvdFBhY2thZ2VzL3RocmVlZm9sZC9zZGtleGFtcGxlc1wiXG59XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEp1cHl0ZXJWaWV3IGV4dGVuZHMgRXh0ZXJuYWxWaWV3IHtcbiAgICBjb25zdHJ1Y3RvcihhcHAsIG5hbWUpIHtcbiAgICAgICAgc3VwZXIoYXBwLCBuYW1lLCBVUkwsIFJFUVVJUkVEX1BBQ0tBR0VTKTtcbiAgICB9XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zb3VyY2VzL3ZpZXdzL3Nka2V4YW1wbGVzL2luZGV4LmpzIiwiaW1wb3J0IHsgSmV0VmlldyB9IGZyb20gXCJ3ZWJpeC1qZXRcIjtcblxuXG5pbXBvcnQgQWRtaW5zVmlldyBmcm9tIFwiLi9hZG1pbnNcIjtcbmltcG9ydCBHZW5lcmFsVmlldyBmcm9tIFwiLi9nZW5lcmFsXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFNldHRpbmdzVmlldyBleHRlbmRzIEpldFZpZXcge1xuICAgIGNvbmZpZygpIHtcbiAgICAgICAgY29uc3QgdmlldyA9IHtcbiAgICAgICAgICAgIHZpZXc6IFwidGFidmlld1wiLFxuICAgICAgICAgICAgY2VsbHM6IFt7XG4gICAgICAgICAgICAgICAgaGVhZGVyOiBcIkdlbmVyYWxcIixcbiAgICAgICAgICAgICAgICBib2R5OiBHZW5lcmFsVmlldyxcbiAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICBoZWFkZXI6IFwiQWRtaW5pc3RyYXRvcnNcIixcbiAgICAgICAgICAgICAgICBib2R5OiBBZG1pbnNWaWV3XG4gICAgICAgICAgICB9XVxuICAgICAgICB9O1xuXG4gICAgICAgIHJldHVybiB2aWV3O1xuICAgIH1cblxuICAgIGluaXQodmlldykge1xuICAgIH1cbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NvdXJjZXMvdmlld3Mvc2V0dGluZ3MvaW5kZXguanMiLCJpbXBvcnQgeyBKZXRWaWV3IH0gZnJvbSBcIndlYml4LWpldFwiO1xuXG5pbXBvcnQgV2FsbGV0Rm9ybVZpZXcgZnJvbSBcIi4vd2FsbGV0Rm9ybVwiO1xuaW1wb3J0IFdhbGxldERldGFpbHNWaWV3IGZyb20gXCIuL3dhbGxldERldGFpbHNcIjtcbmltcG9ydCBXYWxsZXRJbXBvcnRWaWV3IGZyb20gIFwiLi9pbXBvcnRGb3JtXCJcbmltcG9ydCB7IHdhbGxldCB9IGZyb20gXCIuLi8uLi9zZXJ2aWNlcy93YWxsZXRcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgV2FsbGV0TWFuYWdlclZpZXcgZXh0ZW5kcyBKZXRWaWV3IHtcbiAgICBjb25maWcoKSB7XG4gICAgICAgIGNvbnN0IHdhbGxldHMgPSB7XG4gICAgICAgICAgICB2aWV3OiBcImRhdGF0YWJsZVwiLFxuICAgICAgICAgICAgaWQ6IFwid2FsbGV0c190YWJsZVwiLFxuICAgICAgICAgICAgcmVzaXplQ29sdW1uOiB0cnVlLFxuICAgICAgICAgICAgc2VsZWN0OiB0cnVlLFxuICAgICAgICAgICAgbXVsdGlzZWxlY3Q6IHRydWUsXG4gICAgICAgICAgICBjc3M6IFwid2ViaXhfaGVhZGVyX2JvcmRlciB3ZWJpeF9kYXRhX2JvcmRlclwiLFxuICAgICAgICAgICAgc2Nyb2xsOiB0cnVlLFxuICAgICAgICAgICAgYXV0b0NvbmZpZzogdHJ1ZSxcbiAgICAgICAgICAgIGNvbHVtbnM6IFt7XG4gICAgICAgICAgICAgICAgaWQ6IFwiaW5kZXhcIixcbiAgICAgICAgICAgICAgICBoZWFkZXI6IFwiI1wiLFxuICAgICAgICAgICAgICAgIHNvcnQ6IFwiaW50XCIsXG4gICAgICAgICAgICAgICAgYXV0b3dpZHRoOiB0cnVlLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBpZDogXCJuYW1lXCIsXG4gICAgICAgICAgICAgICAgaGVhZGVyOiBbXCJOYW1lXCJdLFxuICAgICAgICAgICAgICAgIHNvcnQ6IFwic3RyaW5nXCIsXG4gICAgICAgICAgICAgICAgYXV0b3dpZHRoOiB0cnVlLFxuICAgICAgICAgICAgICAgIHdpZHRoOiAxNDBcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgaWQ6IFwiYWRkcmVzc1wiLFxuICAgICAgICAgICAgICAgIGhlYWRlcjogW1wiQWRkcmVzc1wiXSxcbiAgICAgICAgICAgICAgICBzb3J0OiBcInN0cmluZ1wiLFxuICAgICAgICAgICAgICAgIGF1dG93aWR0aDogdHJ1ZSxcbiAgICAgICAgICAgICAgICB3aWR0aDogJ2F1dG8nXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBdLFxuICAgICAgICAgICAgc2NoZW1lOiB7XG4gICAgICAgICAgICAgICAgJGluaXQ6IGZ1bmN0aW9uIChvYmopIHtcbiAgICAgICAgICAgICAgICAgICAgb2JqLmluZGV4ID0gdGhpcy5jb3VudCgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcblxuICAgICAgICBjb25zdCB2aWV3ID0ge1xuICAgICAgICAgICAgY29sczogW1xuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgdmlldzogXCJ0ZW1wbGF0ZVwiLFxuICAgICAgICAgICAgICAgICAgICB0eXBlOiBcImhlYWRlclwiLCB0ZW1wbGF0ZTogXCJXYWxsZXRzXCIsXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIHZpZXc6XCJidXR0b25cIiwgXG4gICAgICAgICAgICAgICAgICAgIGlkOlwiYnRuX2NyZWF0ZVwiLCBcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU6XCJDcmVhdGUgV2FsbGV0XCIsIFxuICAgICAgICAgICAgICAgICAgICBjc3M6XCJ3ZWJpeF9zZWNvbmRhcnlcIiwgXG4gICAgICAgICAgICAgICAgICAgIGF1dG93aWR0aDp0cnVlLFxuICAgICAgICAgICAgICAgICAgICBjbGljazogZnVuY3Rpb24gKCl7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLiRzY29wZS5XYWxsZXRGb3JtVmlldy5zaG93Rm9ybSgpXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgdmlldzpcImJ1dHRvblwiLCBcbiAgICAgICAgICAgICAgICAgICAgaWQ6XCJidG5faW1wb3J0XCIsIFxuICAgICAgICAgICAgICAgICAgICB2YWx1ZTpcIkltcG9ydCBXYWxsZXRcIiwgXG4gICAgICAgICAgICAgICAgICAgIGNzczpcIndlYml4X3NlY29uZGFyeVwiLCBcbiAgICAgICAgICAgICAgICAgICAgYXV0b3dpZHRoOnRydWUsXG4gICAgICAgICAgICAgICAgICAgIGNsaWNrOiBmdW5jdGlvbiAoKXtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuJHNjb3BlLldhbGxldEltcG9ydFZpZXcuc2hvd0Zvcm0oKVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgXVxuICAgICAgICB9O1xuXG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICByb3dzOiBbXG4gICAgICAgICAgICAgICAgdmlldyxcbiAgICAgICAgICAgICAgICB3YWxsZXRzXG4gICAgICAgICAgICBdXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBpbml0KHZpZXcpIHtcbiAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xuXG4gICAgICAgIHNlbGYud2FsbGV0c190YWJsZSA9ICQkKFwid2FsbGV0c190YWJsZVwiKTtcbiAgICAgICAgc2VsZi5XYWxsZXREZXRhaWxzVmlldyA9IHNlbGYudWkoV2FsbGV0RGV0YWlsc1ZpZXcpXG4gICAgICAgIHNlbGYuV2FsbGV0Rm9ybVZpZXcgPSBzZWxmLnVpKFdhbGxldEZvcm1WaWV3KTtcbiAgICAgICAgc2VsZi5XYWxsZXRJbXBvcnRWaWV3ID0gc2VsZi51aShXYWxsZXRJbXBvcnRWaWV3KTtcblxuICAgICAgICBzZWxmLndhbGxldHNfdGFibGUuYXR0YWNoRXZlbnQoXCJvbkl0ZW1EYmxDbGlja1wiLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBsZXQgaXRlbSA9IHNlbGYud2FsbGV0c190YWJsZS5nZXRTZWxlY3RlZEl0ZW0oKVxuICAgICAgICAgICAgd2FsbGV0Lm1hbmFnZVdhbGxldChpdGVtLm5hbWUpLnRoZW4oZGF0YSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coZGF0YS5qc29uKCkpXG4gICAgICAgICAgICAgICAgbGV0IHJlcyA9IGRhdGEuanNvbigpXG4gICAgICAgICAgICAgICAgdmFyIGluZm8gPSB7XG4gICAgICAgICAgICAgICAgICAgICduYW1lJzogaXRlbS5uYW1lLFxuICAgICAgICAgICAgICAgICAgICAnYWRkcmVzcyc6IHJlcy5hZGRyZXNzLFxuICAgICAgICAgICAgICAgICAgICAnc2VjcmV0JzogcmVzLnNlY3JldCxcbiAgICAgICAgICAgICAgICAgICAgJ2JhbGFuY2VzJzogcmVzLmJhbGFuY2VzXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHNlbGYuV2FsbGV0RGV0YWlsc1ZpZXcuc2hvd0luZm8oaW5mbylcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICB1cmxDaGFuZ2UodmlldywgdXJsKSB7XG4gICAgICAgIHZhciBzZWxmID0gdGhpcztcbiAgICBcbiAgICAgICAgc2VsZi53YWxsZXRzX3RhYmxlID0gICQkKFwid2FsbGV0c190YWJsZVwiKTtcbiAgICAgICAgd2FsbGV0LmdldFdhbGxldHMoKS50aGVuKGRhdGEgPT4ge1xuICAgICAgICAgICAgY29uc29sZS5sb2coZGF0YS5qc29uKCkpXG4gICAgICAgICAgICBzZWxmLndhbGxldHNfdGFibGUucGFyc2UoZGF0YS5qc29uKCkpXG4gICAgICAgIH0pO1xuICAgIH1cbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NvdXJjZXMvdmlld3Mvd2FsbGV0c01hbmFnZXIvaW5kZXguanMiLCJpbXBvcnQgeyBKZXRWaWV3IH0gZnJvbSBcIndlYml4LWpldFwiO1xuaW1wb3J0IHsgcGFja2FnZXMgfSBmcm9tIFwiLi4vLi4vc2VydmljZXMvd2lraVwiO1xuXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFdpa2lzVmlldyBleHRlbmRzIEpldFZpZXcge1xuICAgIGNvbmZpZygpIHtcbiAgICAgICAgY29uc3QgdmlldyA9IHtcbiAgICAgICAgICAgIHZpZXc6IFwiZGF0YXRhYmxlXCIsXG4gICAgICAgICAgICBpZDogXCJ3aWtpc190YWJsZVwiLFxuICAgICAgICAgICAgcmVzaXplQ29sdW1uOiB0cnVlLFxuICAgICAgICAgICAgc2VsZWN0OiB0cnVlLFxuICAgICAgICAgICAgbXVsdGlzZWxlY3Q6IHRydWUsXG4gICAgICAgICAgICBjc3M6IFwid2ViaXhfaGVhZGVyX2JvcmRlciB3ZWJpeF9kYXRhX2JvcmRlclwiLFxuICAgICAgICAgICAgY29sdW1uczogW3tcbiAgICAgICAgICAgICAgICBpZDogXCJpbmRleFwiLFxuICAgICAgICAgICAgICAgIGhlYWRlcjogXCIjXCIsXG4gICAgICAgICAgICAgICAgc29ydDogXCJpbnRcIixcbiAgICAgICAgICAgICAgICBhdXRvd2lkdGg6IHRydWUsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGlkOiBcIm5hbWVcIixcbiAgICAgICAgICAgICAgICBoZWFkZXI6IFwiUGFja2FnZVwiLFxuICAgICAgICAgICAgICAgIHNvcnQ6IFwic3RyaW5nXCIsXG4gICAgICAgICAgICAgICAgd2lkdGg6IDMwMFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBpZDogXCJhY3Rpb25zXCIsXG4gICAgICAgICAgICAgICAgaGVhZGVyOiBcIkFjdGlvbnNcIixcbiAgICAgICAgICAgICAgICBzb3J0OiBcInN0cmluZ1wiLFxuICAgICAgICAgICAgICAgIHdpZHRoOiAyMDAsXG4gICAgICAgICAgICAgICAgdGVtcGxhdGU6ZnVuY3Rpb24ob2JqKXsgXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBcIjxkaXYgY2xhc3M9J3dlYml4X2VsX2J1dHRvbic+PGJ1dHRvbiBjbGFzcz0nYnRuX3ZpZXcnPiBWaWV3IDwvYnV0dG9uPjwvZGl2PlwiO1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB9XSxcbiAgICAgICAgICAgIG9uQ2xpY2s6e1xuICAgICAgICAgICAgICAgIGJ0bl92aWV3OmZ1bmN0aW9uKGV2LCBpZCl7XG4gICAgICAgICAgICAgICAgICAgIHZhciBpdGVtID0gdGhpcy5nZXRJdGVtKGlkKTtcbiAgICAgICAgICAgICAgICAgICAgd2luZG93LmxvY2F0aW9uLmhyZWYgPSBgL2FkbWluLyMhL21haW4vd2lraXMudmlldz9uYW1lPSR7aXRlbS5uYW1lfWBcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBhdXRvQ29uZmlnOiB0cnVlLFxuICAgICAgICAgICAgc2NoZW1lOiB7XG4gICAgICAgICAgICAgICAgJGluaXQ6IGZ1bmN0aW9uIChvYmopIHtcbiAgICAgICAgICAgICAgICAgICAgb2JqLmluZGV4ID0gdGhpcy5jb3VudCgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgIH07XG5cbiAgICAgICAgcmV0dXJuIHZpZXc7XG4gICAgfVxuXG4gICAgaW5pdCh2aWV3KSB7XG4gICAgICAgIHBhY2thZ2VzLmxpc3QoKS50aGVuKGRhdGEgPT4ge1xuICAgICAgICAgICAgdmlldy5wYXJzZShkYXRhLmpzb24oKSlcbiAgICAgICAgfSk7XG4gICAgfVxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc291cmNlcy92aWV3cy93aWtpcy9pbmRleC5qcyIsImltcG9ydCB7IEpldFZpZXcgfSBmcm9tIFwid2ViaXgtamV0XCI7XG5cbmltcG9ydCB7IGFuc2lVcCB9IGZyb20gXCIuLi8uLi9jb21tb24vY29sb3JzXCI7XG5pbXBvcnQgeyBMRVZFTFMsIFNUQVRFUywgVFlQRVMgfSBmcm9tIFwiLi9kYXRhXCI7XG5pbXBvcnQgeyBkYXRlRm9ybWF0dGVyIH0gZnJvbSBcIi4uLy4uL2NvbW1vbi9mb3JtYXR0ZXJzXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEFsZXJ0VmlldyBleHRlbmRzIEpldFZpZXcge1xuICAgIGNvbmZpZygpIHtcbiAgICAgICAgY29uc3QgaW5mbyA9IHtcbiAgICAgICAgICAgIHZpZXc6IFwiZm9ybVwiLFxuICAgICAgICAgICAgaWQ6IFwiZm9ybVwiLFxuICAgICAgICAgICAgZWxlbWVudHNDb25maWc6IHsgbGFiZWxXaWR0aDogMTQwIH0sXG4gICAgICAgICAgICBlbGVtZW50czogW1xuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgdmlldzogXCJ0ZXh0XCIsXG4gICAgICAgICAgICAgICAgICAgIGxhYmVsOiBcIklEXCIsXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiaWRlbnRpZmllclwiLFxuICAgICAgICAgICAgICAgICAgICByZWFkb25seTogdHJ1ZVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICB2aWV3OiBcInRleHRcIixcbiAgICAgICAgICAgICAgICAgICAgbGFiZWw6IFwiVHlwZVwiLFxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImFsZXJ0X3R5cGVcIixcbiAgICAgICAgICAgICAgICAgICAgcmVhZG9ubHk6IHRydWVcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgdmlldzogXCJ0ZXh0XCIsXG4gICAgICAgICAgICAgICAgICAgIGxhYmVsOiBcIlN0YXR1c1wiLFxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcInN0YXR1c1wiLFxuICAgICAgICAgICAgICAgICAgICByZWFkb25seTogdHJ1ZVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICB2aWV3OiBcInRleHRcIixcbiAgICAgICAgICAgICAgICAgICAgbGFiZWw6IFwiTGV2ZWxcIixcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJsZXZlbFwiLFxuICAgICAgICAgICAgICAgICAgICByZWFkb25seTogdHJ1ZVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICB2aWV3OiBcInRleHRcIixcbiAgICAgICAgICAgICAgICAgICAgbGFiZWw6IFwiQ291bnRcIixcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJjb3VudFwiLFxuICAgICAgICAgICAgICAgICAgICByZWFkb25seTogdHJ1ZVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICB2aWV3OiBcInRleHRcIixcbiAgICAgICAgICAgICAgICAgICAgbGFiZWw6IFwiQ2F0ZWdvcnlcIixcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJjYXRcIixcbiAgICAgICAgICAgICAgICAgICAgcmVhZG9ubHk6IHRydWVcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgdmlldzogXCJ0ZXh0XCIsXG4gICAgICAgICAgICAgICAgICAgIGxhYmVsOiBcIkZpcnN0IHRpbWVcIixcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJ0aW1lX2ZpcnN0XCIsXG4gICAgICAgICAgICAgICAgICAgIHJlYWRvbmx5OiB0cnVlXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIHZpZXc6IFwidGV4dFwiLFxuICAgICAgICAgICAgICAgICAgICBsYWJlbDogXCJMYXN0IHRpbWVcIixcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJ0aW1lX2xhc3RcIixcbiAgICAgICAgICAgICAgICAgICAgcmVhZG9ubHk6IHRydWVcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgdmlldzogXCJ0ZXh0XCIsXG4gICAgICAgICAgICAgICAgICAgIGxhYmVsOiBcIk1lc3NhZ2UgKHB1YilcIixcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJwdWJsaWNcIixcbiAgICAgICAgICAgICAgICAgICAgcmVhZG9ubHk6IHRydWUsXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIF1cbiAgICAgICAgfTtcblxuICAgICAgICBjb25zdCB0YWIgPSB7XG4gICAgICAgICAgICB2aWV3OiBcInRhYnZpZXdcIixcbiAgICAgICAgICAgIGNlbGxzOiBbXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBoZWFkZXI6IFwiSW5mb3JtYXRpb25cIixcbiAgICAgICAgICAgICAgICAgICAgYm9keTogaW5mbyxcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgaGVhZGVyOiBcIk1lc3NhZ2VcIixcbiAgICAgICAgICAgICAgICAgICAgYm9keToge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWQ6IFwibWVzc2FnZVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgdmlldzogXCJ0ZW1wbGF0ZVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgdGVtcGxhdGU6IFwiXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBzY3JvbGw6IFwiYXV0b1wiLFxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIGhlYWRlcjogXCJUcmFjZWJhY2tzXCIsXG4gICAgICAgICAgICAgICAgICAgIGJvZHk6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJvd3M6IFtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZpZXc6IFwidGFiYmFyXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlkOiBcInRiX3RhYnNcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbXVsdGl2aWV3OiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvcHRpb25zOiBbXVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2aWV3OiBcIm11bHRpdmlld1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZDogXCJ0Yl92aWV3c1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjZWxsczogW1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRlbXBsYXRlOiBcIlwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgaWQ6IFwibG9nc1wiLFxuICAgICAgICAgICAgICAgICAgICB2aWV3OiBcImRhdGF0YWJsZVwiLFxuICAgICAgICAgICAgICAgICAgICByZXNpemVDb2x1bW46IHRydWUsXG4gICAgICAgICAgICAgICAgICAgIHNlbGVjdDogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgbXVsdGlzZWxlY3Q6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgIGNzczogXCJ3ZWJpeF9oZWFkZXJfYm9yZGVyIHdlYml4X2RhdGFfYm9yZGVyXCIsXG4gICAgICAgICAgICAgICAgICAgIHNjcm9sbDogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgYXV0b0NvbmZpZzogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgY29sdW1uczogW1xuICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlkOiBcImluZGV4XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaGVhZGVyOiBcIiNcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzb3J0OiBcImludFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGF1dG93aWR0aDogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aWR0aDogNjBcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWQ6IFwidGhyZWVib3RfbmFtZVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhlYWRlcjogXCJUaHJlZWJvdCBOYW1lXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc29ydDogXCJzdHJpbmdcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aWR0aDogMTgwXG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlkOiBcImFwcF9uYW1lXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaGVhZGVyOiBcIkFwcCBOYW1lXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc29ydDogXCJzdHJpbmdcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aWR0aDogMTgwXG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlkOiBcImxhdGVzdF9sb2dpZFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhlYWRlcjogXCJMYXRlc3QgTG9nI1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNvcnQ6IFwiaW50XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDE4MFxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgICAgICBzY2hlbWU6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICRpbml0OiBmdW5jdGlvbiAob2JqKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb2JqLmluZGV4ID0gdGhpcy5jb3VudCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIF1cbiAgICAgICAgfTtcblxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgdmlldzogXCJ3aW5kb3dcIixcbiAgICAgICAgICAgIGhlYWQ6IFwiQWxlcnRcIixcbiAgICAgICAgICAgIG1vZGFsOiB0cnVlLFxuICAgICAgICAgICAgd2lkdGg6IDYwMCxcbiAgICAgICAgICAgIGhlaWdodDogODAwLFxuICAgICAgICAgICAgcG9zaXRpb246IFwiY2VudGVyXCIsXG4gICAgICAgICAgICBib2R5OiB7XG4gICAgICAgICAgICAgICAgcm93czogW1xuICAgICAgICAgICAgICAgICAgICB0YWIsXG4gICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZpZXc6IFwiYnV0dG9uXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZTogXCJPS1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgY3NzOiBcIndlYml4X3ByaW1hcnlcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIGNsaWNrOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5nZXRUb3BQYXJlbnRWaWV3KCkuaGlkZSgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG5cbiAgICBpbml0KCkge1xuICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgICAgIHRoaXMuZm9ybSA9ICQkKFwiZm9ybVwiKTtcbiAgICAgICAgdGhpcy5tZXNzYWdlID0gJCQoXCJtZXNzYWdlXCIpO1xuICAgICAgICB0aGlzLmxvZ3MgPSAkJChcImxvZ3NcIik7XG5cbiAgICAgICAgdGhpcy50YlZpZXdzID0gJCQoXCJ0Yl92aWV3c1wiKTtcbiAgICAgICAgdGhpcy50YlRhYnMgPSAkJChcInRiX3RhYnNcIik7XG5cbiAgICAgICAgdGhpcy5sb2dzLmF0dGFjaEV2ZW50KFwib25JdGVtRGJsQ2xpY2tcIiwgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgbGV0IGxvZ0RhdGEgPSBzZWxmLmxvZ3MuZ2V0U2VsZWN0ZWRJdGVtKClcbiAgICAgICAgICAgIHRoaXMuJHNjb3BlLnNob3coYC9tYWluL2xvZ3M/YXBwbmFtZT0ke2xvZ0RhdGEuYXBwX25hbWV9JmxvZ2lkPSR7bG9nRGF0YS5sYXRlc3RfbG9naWR9YClcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgYWRkVHJhY2ViYWNrKHRiKSB7XG4gICAgICAgIGNvbnN0IHRiSWQgPSBgJHt0Yi50aHJlZWJvdF9uYW1lfV8ke3RiLnByb2Nlc3NfaWR9YDtcbiAgICAgICAgY29uc3QgdGJUaXRsZSA9IGAke3RiLnRocmVlYm90X25hbWV9IC0gUElEOiAoJHt0Yi5wcm9jZXNzX2lkfSlgO1xuXG4gICAgICAgIHRoaXMudGJWaWV3cy5hZGRWaWV3KHtcbiAgICAgICAgICAgIHZpZXc6IFwidGVtcGxhdGVcIixcbiAgICAgICAgICAgIGlkOiB0YklkLFxuICAgICAgICAgICAgc2Nyb2xsOiBcInh5XCIsXG4gICAgICAgICAgICB0ZW1wbGF0ZTogYDxwPiR7YW5zaVVwLmFuc2lfdG9faHRtbCh0Yi5mb3JtYXR0ZWQpfTwvcD5gXG4gICAgICAgIH0pO1xuXG4gICAgICAgIHRoaXMudGJUYWJzLmFkZE9wdGlvbih0YklkLCB0YlRpdGxlLCB0cnVlKTtcbiAgICB9XG5cbiAgICBjbGVhclRyYWNlQmFja3MoKSB7XG4gICAgICAgIGxldCBpZCA9IHRoaXMudGJUYWJzLmdldFZhbHVlKCk7XG5cbiAgICAgICAgd2hpbGUgKGlkKSB7XG4gICAgICAgICAgICB0aGlzLnRiVGFicy5yZW1vdmVPcHRpb24oaWQpO1xuICAgICAgICAgICAgdGhpcy50YlZpZXdzLnJlbW92ZVZpZXcoaWQpO1xuXG4gICAgICAgICAgICBpZCA9IHRoaXMudGJUYWJzLmdldFZhbHVlKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBzaG93Rm9yKGl0ZW0pIHtcbiAgICAgICAgbGV0IHZhbHVlcyA9IE9iamVjdC5hc3NpZ24oe30sIGl0ZW0pO1xuXG4gICAgICAgIHZhbHVlcy5hbGVydF90eXBlID0gVFlQRVNbaXRlbS5hbGVydF90eXBlXTtcbiAgICAgICAgdmFsdWVzLnN0YXR1cyA9IFNUQVRFU1tpdGVtLnN0YXR1c107XG4gICAgICAgIHZhbHVlcy5sZXZlbCA9IExFVkVMU1tpdGVtLmxldmVsXTtcbiAgICAgICAgdmFsdWVzLnRpbWVfZmlyc3QgPSBkYXRlRm9ybWF0dGVyKGl0ZW0udGltZV9maXJzdCk7XG4gICAgICAgIHZhbHVlcy50aW1lX2xhc3QgPSBkYXRlRm9ybWF0dGVyKGl0ZW0udGltZV9sYXN0KTtcbiAgICAgICAgdGhpcy5mb3JtLnNldFZhbHVlcyh2YWx1ZXMpO1xuXG4gICAgICAgIHRoaXMubWVzc2FnZS5zZXRIVE1MKGA8cD4ke2Fuc2lVcC5hbnNpX3RvX2h0bWwoaXRlbS5tZXNzYWdlKX08L3A+YCk7XG5cbiAgICAgICAgdGhpcy5jbGVhclRyYWNlQmFja3MoKTtcblxuICAgICAgICBmb3IgKGxldCB0YiBvZiBpdGVtLnRyYWNlYmFja3MpIHtcbiAgICAgICAgICAgIHRoaXMuYWRkVHJhY2ViYWNrKHRiKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMubG9ncy5jbGVhckFsbCgpXG4gICAgICAgIHRoaXMubG9ncy5wYXJzZShpdGVtLmxvZ3MpO1xuXG4gICAgICAgIHRoaXMuZ2V0Um9vdCgpLnNob3coKTtcbiAgICB9XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zb3VyY2VzL3ZpZXdzL2FsZXJ0cy9hbGVydC5qcyIsImltcG9ydCB7IFNlcnZpY2UgfSBmcm9tIFwiLi4vY29tbW9uL2FwaVwiO1xuXG5jb25zdCBCQVNFX1VSTCA9IFwiL3plcm9ib3QvYWRtaW4vYWN0b3JzL2FkbWluXCI7XG5cbmNsYXNzIEFkbWluU2VydmljZSBleHRlbmRzIFNlcnZpY2Uge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICBzdXBlcihCQVNFX1VSTCk7XG4gICAgfVxuXG4gICAgbGlzdCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0Q2FsbChcImFkbWluX2xpc3RcIik7XG4gICAgfVxuXG5cbiAgICBhZGQobmFtZSkge1xuICAgICAgICByZXR1cm4gdGhpcy5wb3N0Q2FsbChcImFkbWluX2FkZFwiLCB7XG4gICAgICAgICAgICBcIm5hbWVcIjogbmFtZVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBkZWxldGUobmFtZSkge1xuICAgICAgICByZXR1cm4gdGhpcy5wb3N0Q2FsbChcImFkbWluX2RlbGV0ZVwiLCB7XG4gICAgICAgICAgICBcIm5hbWVcIjogbmFtZVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBnZXRfZXhwbG9yZXIoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmdldENhbGwoJ2dldF9leHBsb3JlcicpO1xuICAgIH1cblxuICAgIHNldF9leHBsb3Jlcih0eXBlKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnBvc3RDYWxsKCdzZXRfZXhwbG9yZXInLCB7XG4gICAgICAgICAgICBleHBsb3Jlcl90eXBlOiB0eXBlXG4gICAgICAgIH0pXG4gICAgfVxufVxuXG5leHBvcnQgY29uc3QgYWRtaW4gPSBuZXcgQWRtaW5TZXJ2aWNlKCk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zb3VyY2VzL3NlcnZpY2VzL2FkbWluLmpzIiwiaW1wb3J0IHsgU2VydmljZSB9IGZyb20gXCIuLi9jb21tb24vYXBpXCI7XG5cbmNvbnN0IEJBU0VfVVJMID0gXCIvdGZncmlkL3RhaWdhL2FjdG9ycy90YWlnYVwiO1xuXG5cbmNsYXNzIFRhaWdhU2VydmljZSBleHRlbmRzIFNlcnZpY2Uge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICBzdXBlcihCQVNFX1VSTCk7XG4gICAgfVxuXG4gICAgdXNlckNpcmNsZXModXNlcm5hbWUpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucG9zdENhbGwoXCJnZXRfdXNlcl9jaXJjbGVzXCIsIHsgdXNlcm5hbWU6IHVzZXJuYW1lLCBvdXRwdXRfdHlwZTogXCJqc29uXCIgfSk7XG4gICAgfVxuXG4gICAgdXNlclN0b3JpZXModXNlcm5hbWUpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucG9zdENhbGwoXCJnZXRfdXNlcl9zdG9yaWVzXCIsIHsgdXNlcm5hbWU6IHVzZXJuYW1lLCBvdXRwdXRfdHlwZTogXCJqc29uXCIgfSk7XG4gICAgfVxuXG4gICAgdXNlclRhc2tzKHVzZXJuYW1lKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnBvc3RDYWxsKFwiZ2V0X3VzZXJfdGFza3NcIiwgeyB1c2VybmFtZTogdXNlcm5hbWUsIG91dHB1dF90eXBlOiBcImpzb25cIiB9KTtcbiAgICB9XG5cbn1cblxuXG5leHBvcnQgY29uc3QgdGFpZ2EgPSBuZXcgVGFpZ2FTZXJ2aWNlKCk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zb3VyY2VzL3NlcnZpY2VzL3RhaWdhLmpzIiwiaW1wb3J0IHtcbiAgICBKZXRWaWV3XG59IGZyb20gXCJ3ZWJpeC1qZXRcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUHJvY2Vzc2VzQ2hpbGRWaWV3IGV4dGVuZHMgSmV0VmlldyB7XG5cbiAgICBjb25maWcoKSB7XG4gICAgICAgIGNvbnN0IHZpZXcgPSB7XG4gICAgICAgICAgICB2aWV3OiBcImRhdGF0YWJsZVwiLFxuICAgICAgICAgICAgaWQ6IFwicHJvY2Vzc190YWJsZVwiLFxuICAgICAgICAgICAgcmVzaXplQ29sdW1uOiB0cnVlLFxuICAgICAgICAgICAgc2VsZWN0OiB0cnVlLFxuICAgICAgICAgICAgbXVsdGlzZWxlY3Q6IHRydWUsXG4gICAgICAgICAgICBjc3M6IFwid2ViaXhfaGVhZGVyX2JvcmRlciB3ZWJpeF9kYXRhX2JvcmRlclwiLFxuICAgICAgICAgICAgc2Nyb2xsOiB0cnVlLFxuICAgICAgICAgICAgYXV0b0NvbmZpZzogdHJ1ZSxcbiAgICAgICAgICAgIGNvbHVtbnM6IFt7XG4gICAgICAgICAgICAgICAgICAgIGlkOiBcImluZGV4XCIsXG4gICAgICAgICAgICAgICAgICAgIGhlYWRlcjogXCIjXCIsXG4gICAgICAgICAgICAgICAgICAgIHNvcnQ6IFwiaW50XCIsXG4gICAgICAgICAgICAgICAgICAgIGF1dG93aWR0aDogdHJ1ZSxcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgaWQ6IFwibmFtZVwiLFxuICAgICAgICAgICAgICAgICAgICBoZWFkZXI6IFtcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiUHJvY2Nlc3NcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb250ZW50OiBcInRleHRGaWx0ZXJcIlxuICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICAgICAgc29ydDogXCJzdHJpbmdcIixcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgaWQ6IFwicGlkXCIsXG4gICAgICAgICAgICAgICAgICAgIGhlYWRlcjogXCJQSURcIixcbiAgICAgICAgICAgICAgICAgICAgc29ydDogXCJpbnRcIlxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBpZDogXCJ1c2VybmFtZVwiLFxuICAgICAgICAgICAgICAgICAgICBoZWFkZXI6IFwiVXNlcm5hbWVcIixcbiAgICAgICAgICAgICAgICAgICAgc29ydDogXCJzdHJpbmdcIlxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBpZDogXCJyc3NcIixcbiAgICAgICAgICAgICAgICAgICAgaGVhZGVyOiBcIk1lbW9yeSBVc2FnZVwiLFxuICAgICAgICAgICAgICAgICAgICBzb3J0OiBcImludFwiLFxuICAgICAgICAgICAgICAgICAgICBmb3JtYXQ6IGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIE1hdGguY2VpbCh2YWx1ZSlcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBdLFxuICAgICAgICAgICAgc2NoZW1lOiB7XG4gICAgICAgICAgICAgICAgJGluaXQ6IGZ1bmN0aW9uIChvYmopIHtcbiAgICAgICAgICAgICAgICAgICAgb2JqLmluZGV4ID0gdGhpcy5jb3VudCgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgdmlldzogXCJ3aW5kb3dcIixcbiAgICAgICAgICAgIGhlYWQ6IFwiUnVubmluZyBQcm9jZXNzZXMsIE1lbW9yeSB1c2FnZSBpbiBNQlwiLFxuICAgICAgICAgICAgbW9kYWw6IHRydWUsXG4gICAgICAgICAgICB3aWR0aDogNTUwLFxuICAgICAgICAgICAgaGVpZ2h0OiA2MDAsXG4gICAgICAgICAgICBwb3NpdGlvbjogXCJjZW50ZXJcIixcbiAgICAgICAgICAgIGJvZHk6IHtcbiAgICAgICAgICAgICAgICByb3dzOiBbXG4gICAgICAgICAgICAgICAgICAgIHZpZXcsXG4gICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZpZXc6IFwiYnV0dG9uXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZTogXCJPS1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgY3NzOiBcIndlYml4X3ByaW1hcnlcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIGNsaWNrOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5nZXRUb3BQYXJlbnRWaWV3KCkuaGlkZSgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgfVxuXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBzaG93Rm9yKGRhdGEpIHtcbiAgICAgICAgdGhpcy50YWJsZS5wYXJzZShkYXRhKVxuICAgICAgICB0aGlzLmdldFJvb3QoKS5zaG93KCk7XG4gICAgfVxuXG4gICAgaW5pdCgpIHtcbiAgICAgICAgdGhpcy50YWJsZSA9ICQkKFwicHJvY2Vzc190YWJsZVwiKTtcbiAgICB9XG59XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc291cmNlcy92aWV3cy9kYXNoL3Byb2Nlc3Nlc0NoaWxkVmlldy5qcyIsImltcG9ydCB7IEpldFZpZXcgfSBmcm9tIFwid2ViaXgtamV0XCI7XG5cbmltcG9ydCB7IGFuc2lVcCB9IGZyb20gXCIuLi8uLi9jb21tb24vY29sb3JzXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFJlc2VydmF0aW9uVmlldyBleHRlbmRzIEpldFZpZXcge1xuICAgIGNvbmZpZygpIHtcbiAgICAgICAgY29uc3QgaW5mbyA9IHtcbiAgICAgICAgICAgIHZpZXc6IFwiZm9ybVwiLFxuICAgICAgICAgICAgaWQ6IFwiZm9ybVwiLFxuICAgICAgICAgICAgZWxlbWVudHNDb25maWc6IHsgbGFiZWxXaWR0aDogMTQwIH0sXG4gICAgICAgICAgICBlbGVtZW50czogW1xuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgdmlldzogXCJ0ZXh0XCIsXG4gICAgICAgICAgICAgICAgICAgIGxhYmVsOiBcIklEXCIsXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiaWRcIixcbiAgICAgICAgICAgICAgICAgICAgcmVhZG9ubHk6IHRydWVcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgdmlldzogXCJ0ZXh0XCIsXG4gICAgICAgICAgICAgICAgICAgIGxhYmVsOiBcIkN1c3RvbWVyIHRpZFwiLFxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImN1c3RvbWVyX3RpZFwiLFxuICAgICAgICAgICAgICAgICAgICByZWFkb25seTogdHJ1ZVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICB2aWV3OiBcInRleHRcIixcbiAgICAgICAgICAgICAgICAgICAgbGFiZWw6IFwiTmV4dCBhY3Rpb25cIixcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJuZXh0X2FjdGlvblwiLFxuICAgICAgICAgICAgICAgICAgICByZWFkb25seTogdHJ1ZVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICB2aWV3OiBcInRleHRcIixcbiAgICAgICAgICAgICAgICAgICAgbGFiZWw6IFwiZXhwaXJhdGlvblwiLFxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImV4cGlyYXRpb25cIixcbiAgICAgICAgICAgICAgICAgICAgcmVhZG9ubHk6IHRydWVcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICBdXG4gICAgICAgIH07XG5cbiAgICAgICAgY29uc3QgdGFiID0ge1xuICAgICAgICAgICAgdmlldzogXCJ0YWJ2aWV3XCIsXG4gICAgICAgICAgICBpZDogXCJ0YWJ2aWV3XCIsXG4gICAgICAgICAgICBjZWxsczogW1xuICAgICAgICAgICAgICAgIHtcblxuICAgICAgICAgICAgICAgICAgICBoZWFkZXI6IFwiT3ZlcnZpZXdcIixcbiAgICAgICAgICAgICAgICAgICAgcm93czogW1xuICAgICAgICAgICAgICAgICAgICAgICAgaW5mbyxcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2aWV3OiBcImxpc3RcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsYWJlbDogXCJGb3JtIGlucHV0c1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiRm9ybSBpbnB1dHNcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXRhOiBbeyBcInRpdGxlXCI6IFwiRm9ybSBpbnB1dHNcIiB9XSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0ZW1wbGF0ZTogXCI8Yj4gI3RpdGxlIyA8Yj5cIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhdXRvaGVpZ2h0OiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlYWRvbmx5OiB0cnVlXG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlkOiBcImZvcm1JbmZvXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmlldzogXCJsaXN0XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGVtcGxhdGU6IFwiPGI+I2tleSMgPC9iPiAgOiAgICN2YWx1ZSNcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzY3JvbGw6IFwiYXV0b1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBdXG5cblxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBpZDogXCJuZXR3b3Jrc1wiLFxuICAgICAgICAgICAgICAgICAgICBoZWFkZXI6IFwiTmV0d29ya3NcIixcbiAgICAgICAgICAgICAgICAgICAgdmlldzogXCJkYXRhdGFibGVcIixcbiAgICAgICAgICAgICAgICAgICAgcmVzaXplQ29sdW1uOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICBzZWxlY3Q6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgIG11bHRpc2VsZWN0OiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICBjc3M6IFwid2ViaXhfaGVhZGVyX2JvcmRlciB3ZWJpeF9kYXRhX2JvcmRlclwiLFxuICAgICAgICAgICAgICAgICAgICBzY3JvbGw6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgIGF1dG9Db25maWc6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgIGNvbHVtbnM6IFtcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZDogXCJpbmRleFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhlYWRlcjogXCIjXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc29ydDogXCJpbnRcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhdXRvd2lkdGg6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDYwXG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlkOiBcIm5ldHdvcmtfbmFtZVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhlYWRlcjogXCJOYW1lXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc29ydDogXCJzdHJpbmdcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aWR0aDogMTgwXG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlkOiBcImlwX3JhbmdlXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaGVhZGVyOiBcIklwIHJhbmdlXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc29ydDogXCJzdHJpbmdcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aWR0aDogMTgwXG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlkOiBcImZhcm1lcl90aWRcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBoZWFkZXI6IFwiRmFybWVyXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc29ydDogXCJzdHJpbmdcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aWR0aDogMTgwXG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgICAgIHNjaGVtZToge1xuICAgICAgICAgICAgICAgICAgICAgICAgJGluaXQ6IGZ1bmN0aW9uIChvYmopIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvYmoubmV0d29ya19uYW1lID0gb2JqLm5hbWU7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb2JqLmlwX3JhbmdlID0gb2JqLmlwcmFuZ2U7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb2JqLmZhcm1lcl90aWQgPSBvYmouZmFybWVyX3RpZDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvYmouaW5kZXggPSB0aGlzLmNvdW50KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0sIG9uOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBvbkFmdGVyTG9hZDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICghdGhpcy5jb3VudCgpKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNob3dPdmVybGF5KFwiTm8gbmV0d29ya3MgaW4gcmVzZXJ2YXRpb25cIik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmhpZGVPdmVybGF5KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgaWQ6IFwiY29udGFpbmVyc1wiLFxuICAgICAgICAgICAgICAgICAgICBoZWFkZXI6IFwiQ29udGFpbmVyc1wiLFxuICAgICAgICAgICAgICAgICAgICB2aWV3OiBcImRhdGF0YWJsZVwiLFxuICAgICAgICAgICAgICAgICAgICByZXNpemVDb2x1bW46IHRydWUsXG4gICAgICAgICAgICAgICAgICAgIHNlbGVjdDogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgbXVsdGlzZWxlY3Q6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgIGNzczogXCJ3ZWJpeF9oZWFkZXJfYm9yZGVyIHdlYml4X2RhdGFfYm9yZGVyXCIsXG4gICAgICAgICAgICAgICAgICAgIHNjcm9sbDogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgYXV0b0NvbmZpZzogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgY29sdW1uczogW1xuICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlkOiBcImluZGV4XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaGVhZGVyOiBcIiNcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzb3J0OiBcImludFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGF1dG93aWR0aDogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aWR0aDogNjBcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZDogXCJub2RlX2lkXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaGVhZGVyOiBcIk5vZGUgaWRcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzb3J0OiBcInN0cmluZ1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGF1dG93aWR0aDogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aWR0aDogMTgwXG4gICAgICAgICAgICAgICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWQ6IFwiZmxpc3RcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBoZWFkZXI6IFwiRmxpc3RcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzb3J0OiBcInN0cmluZ1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGF1dG93aWR0aDogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aWR0aDogMTgwXG4gICAgICAgICAgICAgICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWQ6IFwiZW50cnlwb2ludFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhlYWRlcjogXCJFbnRyeXBvaW50XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc29ydDogXCJzdHJpbmdcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhdXRvd2lkdGg6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDE4MFxuICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZDogXCJodWJfdXJsXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaGVhZGVyOiBcIkh1YiB1cmxcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzb3J0OiBcInN0cmluZ1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGF1dG93aWR0aDogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aWR0aDogMTgwXG4gICAgICAgICAgICAgICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWQ6IFwiaW50ZXJhY3RpdmVcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBoZWFkZXI6IFwiSW50ZXJhY3RpdmVcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzb3J0OiBcInN0cmluZ1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGF1dG93aWR0aDogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aWR0aDogMTgwXG4gICAgICAgICAgICAgICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWQ6IFwiZmFybWVyX3RpZFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhlYWRlcjogXCJGYXJtZXJfdGlkXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc29ydDogXCJzdHJpbmdcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhdXRvd2lkdGg6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDE4MFxuICAgICAgICAgICAgICAgICAgICAgICAgfSxcblxuICAgICAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgICAgICBzY2hlbWU6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICRpbml0OiBmdW5jdGlvbiAob2JqKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb2JqLm5vZGVfaWQgPSBvYmoubm9kZV9pZDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvYmouZmxpc3QgPSBvYmouZmxpc3Q7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb2JqLmVudHJ5cG9pbnQgPSBvYmouZW50cnlwb2ludDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvYmouaHViX3VybCA9IG9iai5odWJfdXJsO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9iai5pbnRlcmFjdGl2ZSA9IG9iai5pbnRlcmFjdGl2ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvYmouZmFybWVyX3RpZCA9IG9iai5mYXJtZXJfdGlkO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9iai5pbmRleCA9IHRoaXMuY291bnQoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSwgb246IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG9uQWZ0ZXJMb2FkOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCF0aGlzLmNvdW50KCkpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2hvd092ZXJsYXkoXCJObyBjb250YWluZXJzIGluIHJlc2VydmF0aW9uXCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5oaWRlT3ZlcmxheSgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIGlkOiBcInZvbHVtZXNcIixcbiAgICAgICAgICAgICAgICAgICAgaGVhZGVyOiBcIlZvbHVtZXNcIixcbiAgICAgICAgICAgICAgICAgICAgdmlldzogXCJkYXRhdGFibGVcIixcbiAgICAgICAgICAgICAgICAgICAgcmVzaXplQ29sdW1uOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICBzZWxlY3Q6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgIG11bHRpc2VsZWN0OiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICBjc3M6IFwid2ViaXhfaGVhZGVyX2JvcmRlciB3ZWJpeF9kYXRhX2JvcmRlclwiLFxuICAgICAgICAgICAgICAgICAgICBzY3JvbGw6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgIGF1dG9Db25maWc6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgIGNvbHVtbnM6IFtcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZDogXCJpbmRleFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhlYWRlcjogXCIjXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc29ydDogXCJpbnRcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhdXRvd2lkdGg6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDYwXG4gICAgICAgICAgICAgICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWQ6IFwibm9kZV9pZFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhlYWRlcjogXCJOb2RlIGlkXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc29ydDogXCJzdHJpbmdcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhdXRvd2lkdGg6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDE4MFxuICAgICAgICAgICAgICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlkOiBcInNpemVcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBoZWFkZXI6IFwiU2l6ZVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNvcnQ6IFwic3RyaW5nXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYXV0b3dpZHRoOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdpZHRoOiAxODBcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZDogXCJ0eXBlXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaGVhZGVyOiBcIlR5cGVcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzb3J0OiBcInN0cmluZ1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGF1dG93aWR0aDogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aWR0aDogMTgwXG4gICAgICAgICAgICAgICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWQ6IFwiZmFybWVyX3RpZFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhlYWRlcjogXCJGYXJtZXJfdGlkXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc29ydDogXCJzdHJpbmdcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhdXRvd2lkdGg6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDE4MFxuICAgICAgICAgICAgICAgICAgICAgICAgfSxcblxuICAgICAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgICAgICBzY2hlbWU6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICRpbml0OiBmdW5jdGlvbiAob2JqKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb2JqLm5vZGVfaWQgPSBvYmoubm9kZV9pZDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvYmouc2l6ZSA9IG9iai5zaXplO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9iai50eXBlID0gb2JqLnR5cGU7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb2JqLmZhcm1lcl90aWQgPSBvYmouZmFybWVyX3RpZDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvYmouaW5kZXggPSB0aGlzLmNvdW50KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0sIG9uOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBvbkFmdGVyTG9hZDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICghdGhpcy5jb3VudCgpKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNob3dPdmVybGF5KFwiTm8gdm9sdW1lcyBpbiByZXNlcnZhdGlvblwiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuaGlkZU92ZXJsYXkoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICAgICAgaWQ6IFwiemRic1wiLFxuICAgICAgICAgICAgICAgICAgICBoZWFkZXI6IFwiWmRic1wiLFxuICAgICAgICAgICAgICAgICAgICB2aWV3OiBcImRhdGF0YWJsZVwiLFxuICAgICAgICAgICAgICAgICAgICByZXNpemVDb2x1bW46IHRydWUsXG4gICAgICAgICAgICAgICAgICAgIHNlbGVjdDogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgbXVsdGlzZWxlY3Q6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgIGNzczogXCJ3ZWJpeF9oZWFkZXJfYm9yZGVyIHdlYml4X2RhdGFfYm9yZGVyXCIsXG4gICAgICAgICAgICAgICAgICAgIHNjcm9sbDogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgYXV0b0NvbmZpZzogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgY29sdW1uczogW1xuICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlkOiBcImluZGV4XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaGVhZGVyOiBcIiNcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzb3J0OiBcImludFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGF1dG93aWR0aDogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aWR0aDogNjBcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZDogXCJub2RlX2lkXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaGVhZGVyOiBcIk5vZGUgaWRcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzb3J0OiBcInN0cmluZ1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGF1dG93aWR0aDogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aWR0aDogMTgwXG4gICAgICAgICAgICAgICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWQ6IFwic2l6ZVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhlYWRlcjogXCJTaXplXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc29ydDogXCJzdHJpbmdcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhdXRvd2lkdGg6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDE4MFxuICAgICAgICAgICAgICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlkOiBcImRpc2tfdHlwZVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhlYWRlcjogXCJEaXNrIHR5cGVcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzb3J0OiBcInN0cmluZ1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGF1dG93aWR0aDogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aWR0aDogMTgwXG4gICAgICAgICAgICAgICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWQ6IFwibW9kZVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhlYWRlcjogXCJNb2RlXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc29ydDogXCJzdHJpbmdcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhdXRvd2lkdGg6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDE4MFxuICAgICAgICAgICAgICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlkOiBcInB1YmxpY1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhlYWRlcjogXCJwdWJsaWNcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzb3J0OiBcInN0cmluZ1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGF1dG93aWR0aDogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aWR0aDogMTgwXG4gICAgICAgICAgICAgICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWQ6IFwiZmFybWVyX3RpZFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhlYWRlcjogXCJGYXJtZXJfdGlkXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc29ydDogXCJzdHJpbmdcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhdXRvd2lkdGg6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDE4MFxuICAgICAgICAgICAgICAgICAgICAgICAgfSxcblxuICAgICAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgICAgICBzY2hlbWU6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICRpbml0OiBmdW5jdGlvbiAob2JqKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb2JqLmluZGV4ID0gdGhpcy5jb3VudCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9LCBvbjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgb25BZnRlckxvYWQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoIXRoaXMuY291bnQoKSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zaG93T3ZlcmxheShcIk5vIHpkYnMgaW4gcmVzZXJ2YXRpb25cIik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmhpZGVPdmVybGF5KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgICAgIGlkOiBcImt1YmVybmV0ZXNcIixcbiAgICAgICAgICAgICAgICAgICAgaGVhZGVyOiBcIkt1YmVybmV0ZXNcIixcbiAgICAgICAgICAgICAgICAgICAgdmlldzogXCJkYXRhdGFibGVcIixcbiAgICAgICAgICAgICAgICAgICAgcmVzaXplQ29sdW1uOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICBzZWxlY3Q6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgIG11bHRpc2VsZWN0OiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICBjc3M6IFwid2ViaXhfaGVhZGVyX2JvcmRlciB3ZWJpeF9kYXRhX2JvcmRlclwiLFxuICAgICAgICAgICAgICAgICAgICBzY3JvbGw6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgIGF1dG9Db25maWc6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgIGNvbHVtbnM6IFtcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZDogXCJpbmRleFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhlYWRlcjogXCIjXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc29ydDogXCJpbnRcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhdXRvd2lkdGg6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDYwXG4gICAgICAgICAgICAgICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWQ6IFwibm9kZV9pZFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhlYWRlcjogXCJOb2RlIGlkXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc29ydDogXCJzdHJpbmdcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhdXRvd2lkdGg6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDE4MFxuICAgICAgICAgICAgICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlkOiBcInNpemVcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBoZWFkZXI6IFwiU2l6ZVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNvcnQ6IFwic3RyaW5nXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYXV0b3dpZHRoOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdpZHRoOiAxODBcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZDogXCJuZXR3b3JrX2lkXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaGVhZGVyOiBcIk5ldHdvcmsgaWRcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzb3J0OiBcInN0cmluZ1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGF1dG93aWR0aDogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aWR0aDogMTgwXG4gICAgICAgICAgICAgICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWQ6IFwiaXBhZGRyZXNzXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaGVhZGVyOiBcIklwIGFkZHJlc3NcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzb3J0OiBcInN0cmluZ1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGF1dG93aWR0aDogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aWR0aDogMTgwXG4gICAgICAgICAgICAgICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWQ6IFwibWFzdGVyX2lwc19zdHJcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBoZWFkZXI6IFwiTWFzdGVyIGlwc1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNvcnQ6IFwic3RyaW5nXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYXV0b3dpZHRoOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdpZHRoOiAxODBcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZDogXCJmYXJtZXJfdGlkXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaGVhZGVyOiBcIkZhcm1lcl90aWRcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzb3J0OiBcInN0cmluZ1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGF1dG93aWR0aDogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aWR0aDogMTgwXG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxuXG4gICAgICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgICAgIHNjaGVtZToge1xuICAgICAgICAgICAgICAgICAgICAgICAgJGluaXQ6IGZ1bmN0aW9uIChvYmopIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvYmoubWFzdGVyX2lwc19zdHIgPSBvYmoubWFzdGVyX2lwcy50b1N0cmluZygpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb2JqLmluZGV4ID0gdGhpcy5jb3VudCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9LCBvbjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgb25BZnRlckxvYWQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoIXRoaXMuY291bnQoKSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zaG93T3ZlcmxheShcIk5vIGt1YmVybmV0ZXMgaW4gcmVzZXJ2YXRpb25cIik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmhpZGVPdmVybGF5KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9LFxuXG4gICAgICAgICAgICBdXG4gICAgICAgIH07XG5cbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHZpZXc6IFwid2luZG93XCIsXG4gICAgICAgICAgICBoZWFkOiBcIlJlc2VydmF0aW9uXCIsXG4gICAgICAgICAgICBpZDogXCJyZXNlcnZhdGlvbl92aWV3XCIsXG4gICAgICAgICAgICBtb2RhbDogdHJ1ZSxcbiAgICAgICAgICAgIHdpZHRoOiA2MDAsXG4gICAgICAgICAgICBoZWlnaHQ6IDgwMCxcbiAgICAgICAgICAgIHBvc2l0aW9uOiBcImNlbnRlclwiLFxuICAgICAgICAgICAgYm9keToge1xuICAgICAgICAgICAgICAgIHJvd3M6IFtcbiAgICAgICAgICAgICAgICAgICAgdGFiLFxuICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICB2aWV3OiBcImJ1dHRvblwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU6IFwiT0tcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIGNzczogXCJ3ZWJpeF9wcmltYXJ5XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBjbGljazogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZ2V0VG9wUGFyZW50VmlldygpLmhpZGUoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuXG4gICAgaW5pdCgpIHtcbiAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgICAgICB0aGlzLmZvcm0gPSAkJChcImZvcm1cIik7XG5cbiAgICB9XG5cblxuICAgIHNob3dGb3IoaXRlbSkge1xuICAgICAgICBsZXQgdmFsdWVzID0gT2JqZWN0LmFzc2lnbih7fSwgaXRlbSk7XG4gICAgICAgIHRoaXMucmVzZXJ2YXRpb25fdmlldyA9ICQkKFwicmVzZXJ2YXRpb25fdmlld1wiKTtcbiAgICAgICAgdGhpcy5yZXNlcnZhdGlvbl92aWV3LmdldEhlYWQoKS5zZXRIVE1MKFwiUmVzZXJ2YXRpb246IFwiICsgaXRlbS5zb2x1dGlvbk5hbWUpO1xuXG4gICAgICAgIGxldCByZXNlcnZhdGlvbiA9IGl0ZW0ucmVzZXJ2YXRpb25cbiAgICAgICAgdmFsdWVzLmlkID0gcmVzZXJ2YXRpb24uaWRcbiAgICAgICAgdmFsdWVzLmN1c3RvbWVyX3RpZCA9IHJlc2VydmF0aW9uLmN1c3RvbWVyX3RpZFxuICAgICAgICB2YWx1ZXMubmV4dF9hY3Rpb24gPSByZXNlcnZhdGlvbi5uZXh0X2FjdGlvblxuICAgICAgICB2YWx1ZXMucmVzdWx0cyA9IHJlc2VydmF0aW9uLnJlc3VsdHNcbiAgICAgICAgdmFsdWVzLmV4cGlyYXRpb24gPSByZXNlcnZhdGlvbi5kYXRhX3Jlc2VydmF0aW9uLmV4cGlyYXRpb25fcmVzZXJ2YXRpb25cblxuICAgICAgICB2YWx1ZXMuY29udGFpbmVycyA9IHJlc2VydmF0aW9uLmRhdGFfcmVzZXJ2YXRpb24uY29udGFpbmVyc1xuICAgICAgICB2YWx1ZXMudm9sdW1lcyA9IHJlc2VydmF0aW9uLmRhdGFfcmVzZXJ2YXRpb24udm9sdW1lc1xuICAgICAgICB2YWx1ZXMuemRicyA9IHJlc2VydmF0aW9uLmRhdGFfcmVzZXJ2YXRpb24uemRic1xuICAgICAgICB2YWx1ZXMubmV0d29ya3MgPSByZXNlcnZhdGlvbi5kYXRhX3Jlc2VydmF0aW9uLm5ldHdvcmtzXG4gICAgICAgIHZhbHVlcy5rdWJlcm5ldGVzID0gcmVzZXJ2YXRpb24uZGF0YV9yZXNlcnZhdGlvbi5rdWJlcm5ldGVzXG4gICAgICAgIHZhbHVlcy5mb3JtX2luZm8gPSBpdGVtLmZvcm1faW5mb1xuXG4gICAgICAgIHRoaXMuZm9ybS5zZXRWYWx1ZXModmFsdWVzKTtcbiAgICAgICAgdGhpcy5mb3JtX2luZm8gPSAkJChcImZvcm1JbmZvXCIpO1xuICAgICAgICB0aGlzLmZvcm1faW5mby5jbGVhckFsbCgpO1xuXG4gICAgICAgIGxldCBmb3JtX2xpc3QgPSBbXTtcbiAgICAgICAgbGV0IGZvcm1fa2V5cyA9IE9iamVjdC5rZXlzKHZhbHVlcy5mb3JtX2luZm8pXG4gICAgICAgIGxldCBmb3JtX3ZhbHVlcyA9IE9iamVjdC52YWx1ZXModmFsdWVzLmZvcm1faW5mbylcbiAgICAgICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IGZvcm1fa2V5cy5sZW5ndGg7IGluZGV4KyspIHtcbiAgICAgICAgICAgIGxldCBmb3JtX2RpY3QgPSBuZXcgT2JqZWN0KCk7XG4gICAgICAgICAgICBmb3JtX2RpY3RbJ2tleSddID0gZm9ybV9rZXlzW2luZGV4XTtcbiAgICAgICAgICAgIGZvcm1fZGljdFsndmFsdWUnXSA9IGZvcm1fdmFsdWVzW2luZGV4XTtcbiAgICAgICAgICAgIGZvcm1fbGlzdC5wdXNoKGZvcm1fZGljdClcblxuICAgICAgICB9XG4gICAgICAgIHRoaXMuZm9ybV9pbmZvLnBhcnNlKGZvcm1fbGlzdCk7XG5cbiAgICAgICAgLy8gQWRkIG5ldHdvcmtzIHRhYiBjb250ZW50XG4gICAgICAgIHRoaXMubmV0d29ya3MgPSAkJChcIm5ldHdvcmtzXCIpO1xuICAgICAgICB0aGlzLm5ldHdvcmtzLmNsZWFyQWxsKClcbiAgICAgICAgdGhpcy5uZXR3b3Jrcy5wYXJzZSh2YWx1ZXMubmV0d29ya3MpO1xuXG4gICAgICAgIC8vIEFkZCBjb3RhaW5lciB0YWIgY29udGVudFxuICAgICAgICB0aGlzLmNvbnRhaW5lcnMgPSAkJChcImNvbnRhaW5lcnNcIik7XG4gICAgICAgIHRoaXMuY29udGFpbmVycy5jbGVhckFsbCgpXG4gICAgICAgIHRoaXMuY29udGFpbmVycy5wYXJzZSh2YWx1ZXMuY29udGFpbmVycyk7XG5cblxuICAgICAgICAvLyBBZGQgdm9sdW1lcyB0YWIgY29udGVudFxuICAgICAgICB0aGlzLnZvbHVtZXMgPSAkJChcInZvbHVtZXNcIik7XG4gICAgICAgIHRoaXMudm9sdW1lcy5jbGVhckFsbCgpXG4gICAgICAgIHRoaXMudm9sdW1lcy5wYXJzZSh2YWx1ZXMudm9sdW1lcyk7XG5cbiAgICAgICAgLy8gQWRkIHpkYiB0YWIgY29udGVudFxuICAgICAgICB0aGlzLnpkYnMgPSAkJChcInpkYnNcIik7XG4gICAgICAgIHRoaXMuemRicy5jbGVhckFsbCgpXG4gICAgICAgIHRoaXMuemRicy5wYXJzZSh2YWx1ZXMuemRicyk7XG5cblxuICAgICAgICAvLyBBZGQga3ViZXJuZXRlcyB0YWIgY29udGVudFxuICAgICAgICB0aGlzLmt1YmVybmV0ZXMgPSAkJChcImt1YmVybmV0ZXNcIik7XG4gICAgICAgIHRoaXMua3ViZXJuZXRlcy5jbGVhckFsbCgpXG4gICAgICAgIHRoaXMua3ViZXJuZXRlcy5wYXJzZSh2YWx1ZXMua3ViZXJuZXRlcyk7XG5cblxuICAgICAgICB0aGlzLmdldFJvb3QoKS5zaG93KCk7XG4gICAgfVxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc291cmNlcy92aWV3cy9kZXBsb3llZFNvbHV0aW9ucy9yZXNlcnZhdGlvbi5qcyIsImltcG9ydCB7IEpldFZpZXcgfSBmcm9tIFwid2ViaXgtamV0XCI7XG5cbmltcG9ydCB7IGRhdGVGb3JtYXR0ZXIgfSBmcm9tIFwiLi4vLi4vY29tbW9uL2Zvcm1hdHRlcnNcIjtcbmltcG9ydCB7IExFVkVMUyB9IGZyb20gXCIuLi9hbGVydHMvZGF0YVwiO1xuaW1wb3J0IHsgY3JlYXRlRmlsdGVyT3B0aW9ucyB9IGZyb20gXCIuLi8uLi9jb21tb24vZmlsdGVyc1wiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBBcHBMb2dzVmlldyBleHRlbmRzIEpldFZpZXcge1xuICAgIGNvbmZpZygpIHtcbiAgICAgICAgdmFyIHBhZ2VyID0ge1xuICAgICAgICAgICAgdmlldzogXCJwYWdlclwiLFxuICAgICAgICAgICAgaWQ6IFwicGFnZXJcIixcbiAgICAgICAgICAgIHNpemU6IDEwMCxcbiAgICAgICAgICAgIGdyb3VwOiAyMFxuICAgICAgICB9O1xuICAgICAgICBjb25zdCBhcHBsb2dzID0ge1xuICAgICAgICAgICAgdmlldzogXCJkYXRhdGFibGVcIixcbiAgICAgICAgICAgIGlkOiBcImFwcGxvZ3NfdGFibGVcIixcbiAgICAgICAgICAgIHBhZ2VyOiBcInBhZ2VyXCIsXG4gICAgICAgICAgICByZXNpemVDb2x1bW46IHRydWUsXG4gICAgICAgICAgICBzZWxlY3Q6IHRydWUsXG4gICAgICAgICAgICBtdWx0aXNlbGVjdDogdHJ1ZSxcbiAgICAgICAgICAgIGNzczogXCJ3ZWJpeF9oZWFkZXJfYm9yZGVyIHdlYml4X2RhdGFfYm9yZGVyXCIsXG4gICAgICAgICAgICBzY3JvbGw6IHRydWUsXG4gICAgICAgICAgICBhdXRvQ29uZmlnOiB0cnVlLFxuICAgICAgICAgICAgb246IHtcbiAgICAgICAgICAgICAgICBvbkFmdGVyTG9hZDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnNvcnQoXCJlcG9jaFwiLCBcImRlc1wiKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5tYXJrU29ydGluZyhcImVwb2NoXCIsIFwiZGVzXCIpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG5cbiAgICAgICAgICAgIGNvbHVtbnM6IFt7XG4gICAgICAgICAgICAgICAgaWQ6IFwiaWRcIixcbiAgICAgICAgICAgICAgICBoZWFkZXI6IFtcbiAgICAgICAgICAgICAgICAgICAgXCJMb2cjXCIsXG4gICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRlbnQ6IFwidGV4dEZpbHRlclwiXG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICBzb3J0OiBcImludFwiLFxuICAgICAgICAgICAgICAgIHdpZHRoOiA1MCxcbiAgICAgICAgICAgICAgICBhdXRvd2lkdGg6IHRydWUsXG4gICAgICAgICAgICB9LFxuXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgaWQ6IFwiZmlsZXBhdGhcIixcbiAgICAgICAgICAgICAgICBoZWFkZXI6IFtcbiAgICAgICAgICAgICAgICAgICAgXCJQYXRoXCIsXG4gICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRlbnQ6IFwidGV4dEZpbHRlclwiXG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICBzb3J0OiBcInN0cmluZ1wiLFxuICAgICAgICAgICAgICAgIGF1dG93aWR0aDogdHJ1ZSxcbiAgICAgICAgICAgICAgICB3aWR0aDogMTQwXG4gICAgICAgICAgICB9LFxuXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgaWQ6IFwibGluZW5yXCIsXG4gICAgICAgICAgICAgICAgaGVhZGVyOiBbXG4gICAgICAgICAgICAgICAgICAgIFwiTGluZS5uclwiLFxuICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb250ZW50OiBcInRleHRGaWx0ZXJcIlxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgc29ydDogXCJpbnRcIixcbiAgICAgICAgICAgICAgICBhdXRvd2lkdGg6IHRydWUsXG4gICAgICAgICAgICAgICAgd2lkdGg6IDYwXG4gICAgICAgICAgICB9LFxuXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgaWQ6IFwiY29udGV4dFwiLFxuICAgICAgICAgICAgICAgIGhlYWRlcjogW1xuICAgICAgICAgICAgICAgICAgICBcIkNvbnRleHRcIixcbiAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29udGVudDogXCJ0ZXh0RmlsdGVyXCJcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgIHNvcnQ6IFwic3RyaW5nXCJcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgaWQ6IFwibWVzc2FnZVwiLFxuICAgICAgICAgICAgICAgIGhlYWRlcjogW1xuICAgICAgICAgICAgICAgICAgICBcIk1lc3NhZ2VcIixcbiAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29udGVudDogXCJ0ZXh0RmlsdGVyXCJcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgIHNvcnQ6IFwic3RyaW5nXCIsXG4gICAgICAgICAgICAgICAgd2lkdGg6IDUwMCxcbiAgICAgICAgICAgICAgICBhdXRvd2lkdGg6IHRydWVcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgaWQ6IFwibGV2ZWxcIixcbiAgICAgICAgICAgICAgICBoZWFkZXI6IFtcbiAgICAgICAgICAgICAgICAgICAgXCJMZXZlbFwiLFxuICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb250ZW50OiBcInNlbGVjdEZpbHRlclwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgb3B0aW9uczogY3JlYXRlRmlsdGVyT3B0aW9ucyhMRVZFTFMpXG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICBzb3J0OiBcImludFwiLFxuICAgICAgICAgICAgICAgIGZvcm1hdDogKHZhbHVlKSA9PiBMRVZFTFNbdmFsdWVdLFxuICAgICAgICAgICAgICAgIHdpZHRoOiAxMDBcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgaWQ6IFwiZXBvY2hcIixcbiAgICAgICAgICAgICAgICBoZWFkZXI6IFtcbiAgICAgICAgICAgICAgICAgICAgXCJUaW1lXCIsXG4gICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRlbnQ6IFwidGV4dEZpbHRlclwiXG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICBzb3J0OiBcImRhdGVcIixcbiAgICAgICAgICAgICAgICBmb3JtYXQ6IGRhdGVGb3JtYXR0ZXIsXG4gICAgICAgICAgICAgICAgd2lkdGg6IDEzMFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBpZDogXCJwcm9jZXNzaWRcIixcbiAgICAgICAgICAgICAgICBoZWFkZXI6IFtcbiAgICAgICAgICAgICAgICAgICAgXCJQSURcIixcbiAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29udGVudDogXCJ0ZXh0RmlsdGVyXCJcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgIHNvcnQ6IFwiaW50XCIsXG4gICAgICAgICAgICAgICAgd2lkdGg6IDYwXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGlkOiBcImNhdFwiLFxuICAgICAgICAgICAgICAgIGhlYWRlcjogW1xuICAgICAgICAgICAgICAgICAgICBcIkNhdGVnb3J5XCIsXG4gICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRlbnQ6IFwidGV4dEZpbHRlclwiXG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICBzb3J0OiBcInN0cmluZ1wiLFxuICAgICAgICAgICAgICAgIHdpZHRoOiA4MFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBpZDogXCJkYXRhXCIsXG4gICAgICAgICAgICAgICAgaGVhZGVyOiBbXG4gICAgICAgICAgICAgICAgICAgIFwiRGF0YVwiLFxuICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb250ZW50OiBcInRleHRGaWx0ZXJcIlxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgc29ydDogXCJzdHJpbmdcIlxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBdLFxuXG4gICAgICAgIH1cblxuXG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICByb3dzOiBbXG4gICAgICAgICAgICAgICAgYXBwbG9ncyxcbiAgICAgICAgICAgICAgICBwYWdlclxuICAgICAgICAgICAgXVxuICAgICAgICB9XG4gICAgfVxuXG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zb3VyY2VzL3ZpZXdzL2xvZ3MvYXBwTG9ncy5qcyIsImltcG9ydCB7IEpldFZpZXcgfSBmcm9tIFwid2ViaXgtamV0XCI7XG5cbmltcG9ydCB7IGlucHV0RGlhbG9nIH0gZnJvbSBcIi4uLy4uL2NvbW1vbi9kaWFsb2dzXCI7XG5pbXBvcnQgeyBhZG1pbiB9IGZyb20gXCIuLi8uLi9zZXJ2aWNlcy9hZG1pblwiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBBZG1pbnNWaWV3IGV4dGVuZHMgSmV0VmlldyB7XG4gICAgY29uZmlnKCkge1xuICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XG5cbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHJvd3M6IFt7XG4gICAgICAgICAgICAgICAgY29sczogW3tcbiAgICAgICAgICAgICAgICAgICAgdmlldzogXCJ0ZW1wbGF0ZVwiLFxuICAgICAgICAgICAgICAgICAgICB0ZW1wbGF0ZTogXCJBbGwgb2YgdGhlIGZvbGxvd2luZyAzQm90IG5hbWVzIGNhbiBhY2Nlc3MgZGFzaGJvYXJkLCB5b3UgY2FuIGFkZCBvciByZW1vdmUgdGhlbSBmcm9tIGhlcmVcIixcbiAgICAgICAgICAgICAgICAgICAgYXV0b2hlaWdodDogdHJ1ZSxcbiAgICAgICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgICAgIGxvY2FsSWQ6IFwiYWRkLWFkbWluXCIsXG4gICAgICAgICAgICAgICAgICAgIHZpZXc6IFwiYnV0dG9uXCIsXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlOiBcIkFkZCBuZXcgYWRtaW5pc3RyYXRvclwiLFxuICAgICAgICAgICAgICAgICAgICBjbGljazogc2VsZi5hZGRBZG1pbi5iaW5kKHNlbGYpLFxuICAgICAgICAgICAgICAgIH1dXG4gICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgbG9jYWxJZDogXCJhZG1pbnMtdGFibGVcIixcbiAgICAgICAgICAgICAgICB2aWV3OiBcImRhdGF0YWJsZVwiLFxuICAgICAgICAgICAgICAgIGF1dG9oZWlnaHQ6IHRydWUsXG4gICAgICAgICAgICAgICAgY29sdW1uczogW3tcbiAgICAgICAgICAgICAgICAgICAgaWQ6IFwibmFtZVwiLFxuICAgICAgICAgICAgICAgICAgICB3aWR0aDogNTAwLFxuICAgICAgICAgICAgICAgICAgICBoZWFkZXI6IFtcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiTmFtZVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRlbnQ6IFwidGV4dEZpbHRlclwiXG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgICAgIHNvcnQ6IFwic3RyaW5nXCIsXG4gICAgICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgICAgICBoZWFkZXI6IFwiRGVsZXRlXCIsXG4gICAgICAgICAgICAgICAgICAgIHRlbXBsYXRlOiBmdW5jdGlvbiAob2JqKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gXCI8c3BhbiBjbGFzcz0nd2ViaXhfaWNvbiBtZGkgbWRpLXRyYXNoLWNhbiB3ZWJpeF9kYW5nZXIgZGVsZXRlX2FkbWluJz48L3NwYW4+XCI7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XSxcbiAgICAgICAgICAgICAgICBvbkNsaWNrOiB7XG4gICAgICAgICAgICAgICAgICAgIGRlbGV0ZV9hZG1pbjogZnVuY3Rpb24gKGUsIGlkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLiRzY29wZS5kZWxldGVBZG1pbihpZCk7XG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfV1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIGhhbmRsZVJlc3VsdCgpIHtcblxuICAgIH1cblxuICAgIGFkZEFkbWluKCkge1xuICAgICAgICBjb25zdCBzZWxmID0gdGhpcztcblxuICAgICAgICBpbnB1dERpYWxvZyhcIkFkZCBhZG1pblwiLCBcIjNCb3QgbmFtZVwiLCBcIkFkZFwiLCAoaW5wdXQpID0+IHtcbiAgICAgICAgICAgIGlmIChhZG1pbi5hZGQoaW5wdXQpKSB7XG4gICAgICAgICAgICAgICAgc2VsZi50YWJsZS5hZGQoeyBuYW1lOiBpbnB1dCB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgZGVsZXRlQWRtaW4oaXRlbUlkKSB7XG4gICAgICAgIGNvbnN0IHNlbGYgPSB0aGlzO1xuXG4gICAgICAgIGNvbnN0IGl0ZW0gPSBzZWxmLnRhYmxlLmdldEl0ZW0oaXRlbUlkKTtcblxuICAgICAgICB3ZWJpeC5jb25maXJtKHtcbiAgICAgICAgICAgIHRpdGxlOiBcIkRlbGV0ZSBhZG1pblwiLFxuICAgICAgICAgICAgb2s6IFwiWWVzXCIsXG4gICAgICAgICAgICB0ZXh0OiBgQXJlIHlvdSBzdXJlIHlvdSB3YW50IHRvIGRlbGV0ZSBcIiR7aXRlbS5uYW1lfVwiP2AsXG4gICAgICAgICAgICBjYW5jZWw6IFwiTm9cIixcbiAgICAgICAgfSkudGhlbigoKSA9PiB7XG4gICAgICAgICAgICBpZiAoYWRtaW4uZGVsZXRlKGl0ZW0ubmFtZSkpIHtcbiAgICAgICAgICAgICAgICBzZWxmLnRhYmxlLnJlbW92ZShpdGVtSWQpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBpbml0KCkge1xuICAgICAgICB0aGlzLnRhYmxlID0gdGhpcy4kJChcImFkbWlucy10YWJsZVwiKTtcblxuICAgICAgICBhZG1pbi5saXN0KCkudGhlbihkYXRhID0+IHtcbiAgICAgICAgICAgIHRoaXMudGFibGUucGFyc2UoZGF0YS5qc29uKCkpO1xuICAgICAgICB9KTtcblxuICAgICAgICAvL3dlYml4LmV4dGVuZCh0aGlzLnRhYmxlLCB3ZWJpeC5Qcm9ncmVzc0Jhcik7XG4gICAgfVxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc291cmNlcy92aWV3cy9zZXR0aW5ncy9hZG1pbnMuanMiLCJpbXBvcnQgeyBKZXRWaWV3IH0gZnJvbSBcIndlYml4LWpldFwiO1xuXG5pbXBvcnQgeyBhZG1pbiB9IGZyb20gXCIuLi8uLi9zZXJ2aWNlcy9hZG1pblwiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBHZW5lcmFsVmlldyBleHRlbmRzIEpldFZpZXcge1xuICAgIGNvbmZpZygpIHtcblxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgbG9jYWxJZDogXCJnZW5lcmFsX2Zvcm1cIixcbiAgICAgICAgICAgIHZpZXc6IFwiZm9ybVwiLFxuICAgICAgICAgICAgZWxlbWVudHM6IFtcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIHZpZXc6IFwicmljaHNlbGVjdFwiLFxuICAgICAgICAgICAgICAgICAgICBpZDogXCJleHBsb3Jlcl9saXN0XCIsXG4gICAgICAgICAgICAgICAgICAgIGxhYmVsOiBcIkV4cGxvcmVyXCIsXG4gICAgICAgICAgICAgICAgICAgIGxhYmVsV2lkdGg6IDE1MCxcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU6IFwidGVzdG5ldFwiLFxuICAgICAgICAgICAgICAgICAgICB5Q291bnQ6IDIsXG4gICAgICAgICAgICAgICAgICAgIG9wdGlvbnM6IFtcbiAgICAgICAgICAgICAgICAgICAgICAgIHsgaWQ6IFwidGVzdG5ldFwiLCB2YWx1ZTogXCJUZXN0IE5ldFwiIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICB7IGlkOiBcIm1haW5cIiwgdmFsdWU6IFwiTWFpblwiIH0sXG4gICAgICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgbG9jYWxJZDogXCJleHBsb3Jlcl9hZGRyZXNzXCIsXG4gICAgICAgICAgICAgICAgICAgIHZpZXc6IFwidGV4dFwiLFxuICAgICAgICAgICAgICAgICAgICB0eXBlOiBcInRleHRcIixcbiAgICAgICAgICAgICAgICAgICAgcmVhZG9ubHk6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgIGxhYmVsOiBcIkV4cGxvcmVyIGFkZHJlc3NcIixcbiAgICAgICAgICAgICAgICAgICAgbGFiZWxXaWR0aDogMTUwLFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBdXG4gICAgICAgIH1cblxuICAgIH1cblxuICAgIGRvQWN0aW9uKHByb21pc2UsIGNhbGxiYWNrKSB7XG4gICAgICAgIHRoaXMuZm9ybS5zaG93UHJvZ3Jlc3MoKVxuICAgICAgICBwcm9taXNlLnRoZW4oKGRhdGEpID0+IHtcbiAgICAgICAgICAgIGlmIChjYWxsYmFjaykge1xuICAgICAgICAgICAgICAgIGNhbGxiYWNrKGRhdGEpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY29uc29sZS5sb2coZGF0YSk7XG4gICAgICAgICAgICB0aGlzLmZvcm0uc2hvd1Byb2dyZXNzKHsgaGlkZTogdHJ1ZSB9KTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgaW5pdCgpIHtcbiAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xuXG4gICAgICAgIHNlbGYuZm9ybSA9IHNlbGYuJCQoJ2dlbmVyYWxfZm9ybScpO1xuICAgICAgICB3ZWJpeC5leHRlbmQoc2VsZi5mb3JtLCB3ZWJpeC5Qcm9ncmVzc0Jhcik7XG5cbiAgICAgICAgc2VsZi5leHBsb3Jlckxpc3QgPSBzZWxmLiQkKCdleHBsb3Jlcl9saXN0Jyk7XG4gICAgICAgIHNlbGYuZXhwbG9yZXJBZGRyZXNzID0gc2VsZi4kJCgnZXhwbG9yZXJfYWRkcmVzcycpO1xuXG5cbiAgICAgICAgc2VsZi5kb0FjdGlvbihhZG1pbi5nZXRfZXhwbG9yZXIoKSwgKGRhdGEpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGV4cGxvcmVyID0gZGF0YS5qc29uKCk7XG4gICAgICAgICAgICBzZWxmLmV4cGxvcmVyTGlzdC5zZXRWYWx1ZShleHBsb3Jlci50eXBlKTtcbiAgICAgICAgICAgIHNlbGYuZXhwbG9yZXJBZGRyZXNzLnNldFZhbHVlKGV4cGxvcmVyLnVybCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHNlbGYuZXhwbG9yZXJMaXN0LmF0dGFjaEV2ZW50KFwib25DaGFuZ2VcIiwgKG5ld1ZhbHVlKSA9PiB7XG4gICAgICAgICAgICBzZWxmLmRvQWN0aW9uKGFkbWluLnNldF9leHBsb3JlcihuZXdWYWx1ZS50b0xvd2VyQ2FzZSgpKSwgKGRhdGEpID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCBleHBsb3JlciA9IGRhdGEuanNvbigpO1xuICAgICAgICAgICAgICAgIHNlbGYuZXhwbG9yZXJBZGRyZXNzLnNldFZhbHVlKGV4cGxvcmVyLnVybCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG5cblxuICAgIH1cbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NvdXJjZXMvdmlld3Mvc2V0dGluZ3MvZ2VuZXJhbC5qcyIsImltcG9ydCB7IEpldFZpZXcgfSBmcm9tIFwid2ViaXgtamV0XCI7XG5pbXBvcnQgeyB3YWxsZXQgfSBmcm9tIFwiLi4vLi4vc2VydmljZXMvd2FsbGV0XCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFdhbGxldEZvcm1WaWV3IGV4dGVuZHMgSmV0VmlldyB7XG4gICAgY29uZmlnKCkge1xuICAgICAgICBjb25zdCBpbmZvID0ge1xuICAgICAgICAgICAgdmlldzogXCJmb3JtXCIsXG4gICAgICAgICAgICBpZDogXCJmb3JtXCIsXG4gICAgICAgICAgICBlbGVtZW50c0NvbmZpZzogeyBsYWJlbFdpZHRoOiAyMDAgfSxcbiAgICAgICAgICAgIGVsZW1lbnRzOiBbXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICB2aWV3OiBcInRleHRcIixcbiAgICAgICAgICAgICAgICAgICAgbGFiZWw6IFwiTmFtZVwiLFxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcIm5hbWVcIixcbiAgICAgICAgICAgICAgICAgICAgcGxhY2Vob2xkZXI6IFwiV2FsbGV0IG5hbWVcIlxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIF1cbiAgICAgICAgfTtcblxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgdmlldzogXCJ3aW5kb3dcIixcbiAgICAgICAgICAgIGhlYWQ6IFwiQ3JlYXRlIG5ldyB3YWxsZXRcIixcbiAgICAgICAgICAgIG1vZGFsOiB0cnVlLFxuICAgICAgICAgICAgd2lkdGg6IDYwMCxcbiAgICAgICAgICAgIGhlaWdodDogNDAwLFxuICAgICAgICAgICAgcG9zaXRpb246IFwiY2VudGVyXCIsXG4gICAgICAgICAgICBib2R5OiB7XG4gICAgICAgICAgICAgICAgcm93czogW1xuICAgICAgICAgICAgICAgICAgICBpbmZvLFxuICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICB2aWV3OiBcImJ1dHRvblwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU6IFwiT0tcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIGNzczogXCJ3ZWJpeF9wcmltYXJ5XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBjbGljazogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciB3YWxsZXRfbmFtZSA9ICQkKCdmb3JtJykuZ2V0VmFsdWVzKCkubmFtZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuJHNjb3BlLmNyZWF0ZVdhbGxldCh3YWxsZXRfbmFtZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBpbml0KCkge1xuICAgICAgICB0aGlzLmZvcm0gPSAkJChcImZvcm1cIik7XG4gICAgfVxuXG4gICAgc2hvd0Zvcm0oKSB7XG4gICAgICAgIHRoaXMuZ2V0Um9vdCgpLnNob3coKTtcbiAgICB9XG5cbiAgICBjcmVhdGVXYWxsZXQobmFtZSl7XG5cbiAgICAgICAgd2ViaXguZXh0ZW5kKHRoaXMuZm9ybSwgd2ViaXguUHJvZ3Jlc3NCYXIpO1xuICAgICAgICB0aGlzLmZvcm0uc2hvd1Byb2dyZXNzKHtcbiAgICAgICAgICAgIHR5cGU6XCJpY29uXCIsXG4gICAgICAgICAgICBoaWRlOiBmYWxzZVxuICAgICAgICB9KTtcbiAgICAgICAgd2FsbGV0LmNyZWF0ZVdhbGxldChuYW1lKS50aGVuKGRhdGEgPT4ge1xuICAgICAgICAgICAgd2ViaXgubWVzc2FnZSh7IHR5cGU6IFwic3VjY2Vzc1wiLCB0ZXh0OiBcIldhbGxldCBjcmVhdGVkIHN1Y2Nlc3NmdWxseVwiIH0pO1xuICAgICAgICAgICAgdGhpcy5mb3JtLnNob3dQcm9ncmVzcyh7aGlkZTogdHJ1ZX0pO1xuICAgICAgICAgICAgdGhpcy5mb3JtLmdldFRvcFBhcmVudFZpZXcoKS5oaWRlKCk7XG4gICAgICAgICAgICB0aGlzLmFwcC5yZWZyZXNoKClcbiAgICAgICAgfSkuY2F0Y2goZXJyb3IgPT4ge1xuICAgICAgICAgICAgd2ViaXgubWVzc2FnZSh7IHR5cGU6IFwiZXJyb3JcIiwgdGV4dDogXCJDb3VsZCBub3QgY3JlYXRlIHdhbGxldFwiIH0pO1xuICAgICAgICAgICAgdGhpcy5mb3JtLnNob3dQcm9ncmVzcyh7aGlkZTogdHJ1ZX0pO1xuICAgICAgICAgICAgdGhpcy5mb3JtLmdldFRvcFBhcmVudFZpZXcoKS5oaWRlKCk7XG4gICAgICAgICAgICB0aGlzLmFwcC5yZWZyZXNoKClcbiAgICAgICAgfSk7XG4gICAgfVxufVxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NvdXJjZXMvdmlld3Mvd2FsbGV0c01hbmFnZXIvd2FsbGV0Rm9ybS5qcyIsImltcG9ydCB7IFNlcnZpY2UgfSBmcm9tIFwiLi4vY29tbW9uL2FwaVwiO1xuXG5jb25zdCBCQVNFX1VSTCA9IFwiL3plcm9ib3QvYWRtaW4vYWN0b3JzL3dhbGxldFwiO1xuXG5jbGFzcyBXYWxsZXRTZXJ2aWNlIGV4dGVuZHMgU2VydmljZSB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHN1cGVyKEJBU0VfVVJMKTtcbiAgICB9XG5cbiAgICBjcmVhdGVXYWxsZXQobmFtZSkge1xuICAgICAgICByZXR1cm4gdGhpcy5nZXRDYWxsKFwiY3JlYXRlX3dhbGxldFwiLCBuYW1lKTtcbiAgICB9XG5cbiAgICBtYW5hZ2VXYWxsZXQobmFtZSkge1xuICAgICAgICByZXR1cm4gdGhpcy5nZXRDYWxsKFwibWFuYWdlX3dhbGxldFwiLCBuYW1lKTtcbiAgICB9XG5cbiAgICBnZXRXYWxsZXRzKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5nZXRDYWxsKFwiZ2V0X3dhbGxldHNcIik7XG4gICAgfVxuXG4gICAgaW1wb3J0V2FsbGV0KG5hbWUsIHNlY3JldCkge1xuICAgICAgICByZXR1cm4gdGhpcy5nZXRDYWxsKFwiaW1wb3J0X3dhbGxldFwiLCB7bmFtZSwgc2VjcmV0fSlcbiAgICB9XG59XG5cbmV4cG9ydCBjb25zdCB3YWxsZXQgPSBuZXcgV2FsbGV0U2VydmljZSgpO1xuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NvdXJjZXMvc2VydmljZXMvd2FsbGV0LmpzIiwiaW1wb3J0IHsgSmV0VmlldyB9IGZyb20gXCJ3ZWJpeC1qZXRcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgV2FsbGV0RGV0YWlsc1ZpZXcgZXh0ZW5kcyBKZXRWaWV3IHtcbiAgICBjb25maWcoKSB7XG4gICAgICAgIGNvbnN0IGluZm8gPSB7XG4gICAgICAgICAgICBpZDogXCJ3YWxsZXRfaW5mb1wiLFxuICAgICAgICAgICAgdmlldzogXCJsaXN0XCIsXG4gICAgICAgICAgICByZXNwb25zaXZlOiB0cnVlLFxuICAgICAgICAgICAgdHlwZToge1xuICAgICAgICAgICAgICAgIGhlaWdodDogJ2F1dG8nLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHRlbXBsYXRlOiBgXG4gICAgICAgICAgICAgICAgPHA+PC9mb250Pjxmb250IHNpemU9XCIzXCI+PGI+I2tleSM6IDwvYj4jdmFsdWUjPC9mb250Pjxicj48L3A+XG4gICAgICAgICAgICBgXG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgdmlldzogXCJ3aW5kb3dcIixcbiAgICAgICAgICAgIGhlYWQ6IFwiV2FsbGV0IERldGFpbHNcIixcbiAgICAgICAgICAgIG1vZGFsOiB0cnVlLFxuICAgICAgICAgICAgd2lkdGg6IDgwMCxcbiAgICAgICAgICAgIGhlaWdodDogNTAwLFxuICAgICAgICAgICAgcG9zaXRpb246IFwiY2VudGVyXCIsXG4gICAgICAgICAgICBib2R5OiB7XG4gICAgICAgICAgICAgICAgcm93czogW1xuICAgICAgICAgICAgICAgICAgICBpbmZvLFxuICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICB2aWV3OiBcImJ1dHRvblwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgaWQ6IFwic2VjcmV0X2J0blwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU6IFwiU2hvdyBTZWNyZXRcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIGNzczogXCJ3ZWJpeF9wcmltYXJ5XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBjbGljazogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuJHNjb3BlLnNob3dTZWNyZXQoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmlldzogXCJidXR0b25cIixcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlOiBcIk9LXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBjc3M6IFwid2ViaXhfcHJpbWFyeVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgY2xpY2s6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAkJChcInNlY3JldF9idG5cIikuZW5hYmxlKClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmdldFRvcFBhcmVudFZpZXcoKS5oaWRlKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBpbml0KCkge1xuICAgICAgICBjb25zdCBzZWxmID0gdGhpcztcbiAgICAgICAgc2VsZi5pbmZvID0gdGhpcy4kJChcIndhbGxldF9pbmZvXCIpO1xuICAgICAgICBzZWxmLnNlY3JldF9idG4gPSB0aGlzLiQkKFwic2VjcmV0X2J0blwiKTtcbiAgICAgICAgc2VsZi5zZWNyZXQgPSBcIlwiO1xuICAgIH1cblxuICAgIHNob3dTZWNyZXQoKSB7XG4gICAgICAgIHZhciBzZWxmID0gdGhpcztcblxuICAgICAgICBzZWxmLmluZm8uYWRkKHtcbiAgICAgICAgICAgIGtleTogJ1NlY3JldCcsXG4gICAgICAgICAgICB2YWx1ZTogc2VsZi5zZWNyZXRcbiAgICAgICAgfSk7XG4gICAgICAgIHNlbGYuc2VjcmV0X2J0bi5kaXNhYmxlKClcbiAgICB9XG4gICAgXG4gICAgc2hvd0luZm8oZGF0YSl7XG4gICAgICAgIHZhciBzZWxmID0gdGhpc1xuXG4gICAgICAgIHZhciBiYWxhbmNlcyA9IFwiXCI7XG4gICAgICAgIGZvciAodmFyIGkgaW4gZGF0YS5iYWxhbmNlcykge1xuICAgICAgICAgICAgYmFsYW5jZXMgKz0gYDxicj4ke2RhdGEuYmFsYW5jZXNbaV0uYmFsYW5jZX0gPGI+JHtkYXRhLmJhbGFuY2VzW2ldLmFzc2V0X2NvZGV9PC9iPiAke2RhdGEuYmFsYW5jZXNbaV0uYXNzZXRfaXNzdWVyfWBcbiAgICAgICAgfVxuICAgICAgICBzZWxmLmluZm8uY2xlYXJBbGwoKVxuICAgICAgICBzZWxmLmluZm8uYWRkKHtcbiAgICAgICAgICAgIGtleTogJ05hbWUnLFxuICAgICAgICAgICAgdmFsdWU6IGRhdGEubmFtZVxuICAgICAgICB9KTtcbiAgICAgICAgc2VsZi5pbmZvLmFkZCh7XG4gICAgICAgICAgICBrZXk6ICdBZGRyZXNzJyxcbiAgICAgICAgICAgIHZhbHVlOiBkYXRhLmFkZHJlc3NcbiAgICAgICAgfSk7XG4gICAgICAgIHNlbGYuaW5mby5hZGQoe1xuICAgICAgICAgICAga2V5OiAnQmFsYW5jZXMnLFxuICAgICAgICAgICAgdmFsdWU6IGJhbGFuY2VzXG4gICAgICAgIH0pO1xuICAgICAgICBzZWxmLnNlY3JldCA9IGRhdGEuc2VjcmV0O1xuXG4gICAgICAgIHRoaXMuZ2V0Um9vdCgpLnNob3coKTtcbiAgICB9XG59XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc291cmNlcy92aWV3cy93YWxsZXRzTWFuYWdlci93YWxsZXREZXRhaWxzLmpzIiwiaW1wb3J0IHsgSmV0VmlldyB9IGZyb20gXCJ3ZWJpeC1qZXRcIjtcblxuaW1wb3J0IHsgd2FsbGV0IH0gZnJvbSBcIi4uLy4uL3NlcnZpY2VzL3dhbGxldFwiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBXYWxsZXRJbXBvcnRWaWV3IGV4dGVuZHMgSmV0VmlldyB7XG4gICAgY29uZmlnKCkge1xuICAgICAgICBjb25zdCBpbmZvID0ge1xuICAgICAgICAgICAgdmlldzogXCJmb3JtXCIsXG4gICAgICAgICAgICBpZDogXCJpbXBvcnRfZm9ybVwiLFxuICAgICAgICAgICAgZWxlbWVudHNDb25maWc6IHsgbGFiZWxXaWR0aDogMjAwIH0sXG4gICAgICAgICAgICBlbGVtZW50czogW1xuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgdmlldzogXCJ0ZXh0XCIsXG4gICAgICAgICAgICAgICAgICAgIGxhYmVsOiBcIlNlY3JldFwiLFxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcInNlY3JldFwiLFxuICAgICAgICAgICAgICAgICAgICBwbGFjZWhvbGRlcjogXCJXYWxsZXQgc2VjcmV0XCJcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgdmlldzogXCJ0ZXh0XCIsXG4gICAgICAgICAgICAgICAgICAgIGxhYmVsOiBcIk5hbWVcIixcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJuYW1lXCIsXG4gICAgICAgICAgICAgICAgICAgIHBsYWNlaG9sZGVyOiBcIldhbGxldCBuYW1lXCJcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICBdXG4gICAgICAgIH07XG5cbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHZpZXc6IFwid2luZG93XCIsXG4gICAgICAgICAgICBoZWFkOiBcIkltcG9ydCB3YWxsZXRcIixcbiAgICAgICAgICAgIG1vZGFsOiB0cnVlLFxuICAgICAgICAgICAgd2lkdGg6IDYwMCxcbiAgICAgICAgICAgIGhlaWdodDogNDAwLFxuICAgICAgICAgICAgcG9zaXRpb246IFwiY2VudGVyXCIsXG4gICAgICAgICAgICBib2R5OiB7XG4gICAgICAgICAgICAgICAgcm93czogW1xuICAgICAgICAgICAgICAgICAgICBpbmZvLFxuICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICB2aWV3OiBcImJ1dHRvblwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU6IFwiT0tcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIGNzczogXCJ3ZWJpeF9wcmltYXJ5XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBjbGljazogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBuYW1lID0gJCQoJ2ltcG9ydF9mb3JtJykuZ2V0VmFsdWVzKCkubmFtZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBzZWNyZXQgPSAkJCgnaW1wb3J0X2Zvcm0nKS5nZXRWYWx1ZXMoKS5zZWNyZXRcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhuYW1lKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhzZWNyZXQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuJHNjb3BlLmltcG9ydFdhbGxldChuYW1lLCBzZWNyZXQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgaW5pdCgpIHtcbiAgICAgICAgdGhpcy5mb3JtID0gJCQoXCJpbXBvcnRfZm9ybVwiKTtcbiAgICB9XG5cbiAgICBzaG93Rm9ybSgpIHtcbiAgICAgICAgdGhpcy5nZXRSb290KCkuc2hvdygpO1xuICAgIH1cblxuICAgIGltcG9ydFdhbGxldChuYW1lLCBzZWNyZXQpIHtcbiAgICAgICAgXG4gICAgICAgIHdlYml4LmV4dGVuZCh0aGlzLmZvcm0sIHdlYml4LlByb2dyZXNzQmFyKTtcbiAgICAgICAgdGhpcy5mb3JtLnNob3dQcm9ncmVzcyh7XG4gICAgICAgICAgICB0eXBlOlwiaWNvblwiLFxuICAgICAgICAgICAgaGlkZTogZmFsc2VcbiAgICAgICAgfSk7XG4gICAgICAgIHdhbGxldC5pbXBvcnRXYWxsZXQobmFtZSwgc2VjcmV0KS50aGVuKGRhdGEgPT4ge1xuICAgICAgICAgICAgd2ViaXgubWVzc2FnZSh7IHR5cGU6IFwic3VjY2Vzc1wiLCB0ZXh0OiBcIldhbGxldCBpbXBvcnRlZCBzdWNjZXNzZnVsbHlcIiB9KTtcbiAgICAgICAgICAgIHRoaXMuZm9ybS5zaG93UHJvZ3Jlc3Moe2hpZGU6IHRydWV9KTtcbiAgICAgICAgICAgIHRoaXMuZm9ybS5jbGVhcigpOyBcbiAgICAgICAgICAgIHRoaXMuZm9ybS5nZXRUb3BQYXJlbnRWaWV3KCkuaGlkZSgpO1xuICAgICAgICAgICAgdGhpcy5hcHAucmVmcmVzaCgpXG4gICAgICAgIH0pLmNhdGNoKGVycm9yID0+IHtcbiAgICAgICAgICAgIHdlYml4Lm1lc3NhZ2UoeyB0eXBlOiBcImVycm9yXCIsIHRleHQ6IFwiQ291bGQgbm90IGltcG9ydCB3YWxsZXRcIiB9KTtcbiAgICAgICAgICAgIHRoaXMuZm9ybS5zaG93UHJvZ3Jlc3Moe2hpZGU6IHRydWV9KTtcbiAgICAgICAgICAgIHRoaXMuZm9ybS5jbGVhcigpOyBcbiAgICAgICAgICAgIHRoaXMuZm9ybS5nZXRUb3BQYXJlbnRWaWV3KCkuaGlkZSgpO1xuICAgICAgICAgICAgdGhpcy5hcHAucmVmcmVzaCgpXG4gICAgICAgIH0pO1xuICAgIH1cbn1cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zb3VyY2VzL3ZpZXdzL3dhbGxldHNNYW5hZ2VyL2ltcG9ydEZvcm0uanMiLCJleHBvcnQgZnVuY3Rpb24gY3JlYXRlRmlsdGVyT3B0aW9ucyhvYmopIHtcbiAgICAvLyByZXR1cm5zIGEgbmV3IG9iamVjdCBhcyB7aWQ6IHZhbHVlfSwgdXNlZCBhcyBkYXRhIHRhYmxlIGZpbHRlciBvcHRpb25zXG4gICAgLy8gb2JqOiBjYW4gYmUgYW4gYXJyYXkgb3IgYSBtYXBwaW5nIG9iamVjdFxuXG4gICAgaWYgKG9iaiBpbnN0YW5jZW9mIEFycmF5KSB7XG4gICAgICAgIHJldHVybiBvYmoubWFwKCh2YWx1ZSwgaW5kZXgpID0+IHtcbiAgICAgICAgICAgIHJldHVybiB7IGlkOiBpbmRleCwgdmFsdWU6IHZhbHVlIH1cbiAgICAgICAgfSk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgLy8gYXNzdW1lIGl0J3MganVzdCBhIG1hcHBpbmcgb3RoZXJ3aXNlXG4gICAgICAgIHJldHVybiBPYmplY3Qua2V5cyhvYmopLm1hcChrZXkgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIHsgaWQ6IGtleSwgdmFsdWU6IG9ialtrZXldIH1cbiAgICAgICAgfSk7XG4gICAgfVxuXG5cbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NvdXJjZXMvY29tbW9uL2ZpbHRlcnMuanMiLCJpbXBvcnQgeyBTZXJ2aWNlIH0gZnJvbSBcIi4uL2NvbW1vbi9hcGlcIjtcblxuY29uc3QgQkFTRV9VUkwgPSBcIi96ZXJvYm90L2FkbWluL2FjdG9ycy9wYWNrYWdlX21hbmFnZXJcIjtcblxuXG5jbGFzcyBQYWNrYWdlc1NlcnZpY2UgZXh0ZW5kcyBTZXJ2aWNlIHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgc3VwZXIoQkFTRV9VUkwpO1xuICAgIH1cblxuICAgIGdldFN0YXR1cyhuYW1lcykge1xuICAgICAgICAvLyBwb3N0IGNhbGwgdG8gc2VuZCBhcmdzIGFzIGpzb25cbiAgICAgICAgcmV0dXJuIHRoaXMucG9zdENhbGwoXCJwYWNrYWdlc19nZXRfc3RhdHVzXCIsIHtcbiAgICAgICAgICAgIG5hbWVzOiBuYW1lc1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBsaXN0KG9wdHMpIHtcbiAgICAgICAgb3B0cyA9IG9wdHMgfHwge307XG4gICAgICAgIHJldHVybiB0aGlzLmdldENhbGwoXCJwYWNrYWdlc19saXN0XCIpO1xuICAgIH1cblxuICAgIGFkZChwYXRoLCBnaXRVcmwpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucG9zdENhbGwoXCJwYWNrYWdlX2FkZFwiLCB7XG4gICAgICAgICAgICBwYXRoOiBwYXRoLFxuICAgICAgICAgICAgZ2l0X3VybDogZ2l0VXJsXG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGRlbGV0ZShwYWNrYWdlTmFtZSkge1xuICAgICAgICByZXR1cm4gdGhpcy5wb3N0Q2FsbChcInBhY2thZ2VfZGVsZXRlXCIsIHsgbmFtZTogcGFja2FnZU5hbWUgfSk7XG5cbiAgICB9XG5cbiAgICBzdGFydChwYWNrYWdlTmFtZSkge1xuICAgICAgICByZXR1cm4gdGhpcy5wb3N0Q2FsbChcInBhY2thZ2Vfc3RhcnRcIiwgeyBuYW1lOiBwYWNrYWdlTmFtZSB9KTtcbiAgICB9XG5cbiAgICBzdG9wKHBhY2thZ2VOYW1lKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnBvc3RDYWxsKFwicGFja2FnZV9zdG9wXCIsIHsgbmFtZTogcGFja2FnZU5hbWUgfSk7XG5cbiAgICB9XG5cbiAgICBkaXNhYmxlKHBhY2thZ2VOYW1lKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnBvc3RDYWxsKFwicGFja2FnZV9kaXNhYmxlXCIsIHsgbmFtZTogcGFja2FnZU5hbWUgfSk7XG5cbiAgICB9XG5cbiAgICBlbmFibGUocGFja2FnZU5hbWUpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucG9zdENhbGwoXCJwYWNrYWdlX2VuYWJsZVwiLCB7IG5hbWU6IHBhY2thZ2VOYW1lIH0pO1xuICAgIH1cbn1cblxuXG5leHBvcnQgY29uc3QgcGFja2FnZXMgPSBuZXcgUGFja2FnZXNTZXJ2aWNlKCk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zb3VyY2VzL3NlcnZpY2VzL3BhY2thZ2VzLmpzIiwiaW1wb3J0IHsgSmV0VmlldyB9IGZyb20gXCJ3ZWJpeC1qZXRcIjtcbmltcG9ydCB7IGhlYWx0aCB9IGZyb20gXCIuLi8uLi9zZXJ2aWNlcy9oZWFsdGhcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRGlza1NwYWNlVmlldyBleHRlbmRzIEpldFZpZXcge1xuICAgIGNvbmZpZygpIHtcbiAgICAgICAgY29uc3QgZGlza1NwYWNlID0ge1xuICAgICAgICAgICAgaWQ6IFwiZGlza1NwYWNlXCIsXG4gICAgICAgICAgICByZXNwb25zaXZlOiB0cnVlLFxuICAgICAgICAgICAgdmlldzogXCJsaXN0XCIsXG4gICAgICAgICAgICB0eXBlOiB7XG4gICAgICAgICAgICAgICAgaGVpZ2h0OiA2MCxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB0ZW1wbGF0ZTogYFxuICAgICAgICAgICAgPHA+PGZvbnQgc2l6ZT1cIjNcIj48Yj4ja2V5IzogPC9iPjwvZm9udD4gPGZvbnQgc2l6ZT1cIjNcIj4jdmFsdWUjPC9mb250PjwvcD5cbiAgICAgICAgICAgIGBcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICB0eXBlOiBcInNwYWNlXCIsXG4gICAgICAgICAgICByb3dzOiBbe1xuICAgICAgICAgICAgICAgIHRlbXBsYXRlOiBcIjxkaXYgc3R5bGU9J3dpZHRoOmF1dG87dGV4dC1hbGlnbjpjZW50ZXInPjxoMz5EaXNrIFNwYWNlPGgzLz48L2Rpdj5cIixcbiAgICAgICAgICAgICAgICBoZWlnaHQ6IDUwXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIGRpc2tTcGFjZVxuICAgICAgICAgICAgXVxuICAgICAgICB9XG4gICAgfVxuXG5cbiAgICBpbml0KCkge1xuICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XG5cbiAgICAgICAgdGhpcy5kaXNrSW5mbyA9IHRoaXMuJCQoXCJkaXNrU3BhY2VcIik7XG5cbiAgICAgICAgaGVhbHRoLmdldERpc2tTcGFjZSgpLnRoZW4oZGF0YSA9PiB7XG4gICAgICAgICAgICBkYXRhID0gZGF0YS5qc29uKCk7XG5cbiAgICAgICAgICAgIHNlbGYuZGlza0luZm8uYWRkKHtcbiAgICAgICAgICAgICAgICBrZXk6IFwiVXNlZFwiLFxuICAgICAgICAgICAgICAgIHZhbHVlOiBkYXRhLnVzZWQgKyBcIiBHQlwiXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHNlbGYuZGlza0luZm8uYWRkKHtcbiAgICAgICAgICAgICAgICBrZXk6IFwiRnJlZVwiLFxuICAgICAgICAgICAgICAgIHZhbHVlOiBkYXRhLmZyZWUgKyBcIiBHQlwiXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHNlbGYuZGlza0luZm8uYWRkKHtcbiAgICAgICAgICAgICAgICBrZXk6IFwiVG90YWxcIixcbiAgICAgICAgICAgICAgICB2YWx1ZTogZGF0YS50b3RhbCArIFwiIEdCXCJcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgc2VsZi5kaXNrSW5mby5hZGQoe1xuICAgICAgICAgICAgICAgIGtleTogXCJQZXJjZW50XCIsXG4gICAgICAgICAgICAgICAgdmFsdWU6IGRhdGEucGVyY2VudCArIFwiICVcIlxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH1cblxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc291cmNlcy92aWV3cy9kYXNoL2Rpc2tTcGFjZS5qcyIsImltcG9ydCB7IEpldFZpZXcgfSBmcm9tIFwid2ViaXgtamV0XCI7XG5pbXBvcnQgeyBoZWFsdGggfSBmcm9tIFwiLi4vLi4vc2VydmljZXMvaGVhbHRoXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIGhlYWx0aEluZm9WaWV3IGV4dGVuZHMgSmV0VmlldyB7XG4gICAgY29uZmlnKCkge1xuICAgICAgICBjb25zdCBoZWFsdGhJbmZvID0ge1xuICAgICAgICAgICAgaWQ6IFwiaGVhbHRoSW5mb1wiLFxuICAgICAgICAgICAgcmVzcG9uc2l2ZTogdHJ1ZSxcbiAgICAgICAgICAgIHZpZXc6IFwibGlzdFwiLFxuICAgICAgICAgICAgcmVzcG9uc2l2ZTogdHJ1ZSxcbiAgICAgICAgICAgIHR5cGU6IHtcbiAgICAgICAgICAgICAgICBoZWlnaHQ6IDYwLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHRlbXBsYXRlOiBgXG4gICAgICAgICAgICA8cD48Zm9udCBzaXplPVwiM1wiPjxiPiNrZXkjOiA8L2I+PC9mb250PiAjdmFsdWUjPC9wPlxuICAgICAgICAgICAgYFxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHR5cGU6IFwic3BhY2VcIixcbiAgICAgICAgICAgIHJvd3M6IFt7XG4gICAgICAgICAgICAgICAgdGVtcGxhdGU6IFwiPGRpdiBzdHlsZT0nd2lkdGg6YXV0bzt0ZXh0LWFsaWduOmNlbnRlcic+PGgzPkhlYWx0aCBDaGVja3M8aDMvPjwvZGl2PlwiLFxuICAgICAgICAgICAgICAgIGhlaWdodDogNTBcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgaGVhbHRoSW5mb11cbiAgICAgICAgfVxuICAgIH1cbiAgICBpbml0KHZpZXcpIHtcbiAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xuXG4gICAgICAgIHRoaXMuaGVhbHRoSW5mbyA9IHRoaXMuJCQoXCJoZWFsdGhJbmZvXCIpO1xuXG4gICAgICAgIGhlYWx0aC5nZXRIZWFsdGgoKS50aGVuKGRhdGEgPT4ge1xuICAgICAgICAgICAgZGF0YSA9IGRhdGEuanNvbigpO1xuXG4gICAgICAgICAgICBpZiAoZGF0YS5iY2RiID09PSBcIk9LXCIpIHtcbiAgICAgICAgICAgICAgICBzZWxmLmhlYWx0aEluZm8uYWRkKHtcbiAgICAgICAgICAgICAgICAgICAga2V5OiBcIkJDREIgU3RhdHVzXCIsXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlOiBgPHNwYW4gY2xhc3M9J3dlYml4X2ljb24gd3hpLWNoZWNrYm94LW1hcmtlZCcgc3R5bGU9XCJjb2xvcjpncmVlblwiPk9LPC9zcGFuPmBcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGRhdGEuYmNkYiA9PT0gXCJFcnJvclwiKSB7XG4gICAgICAgICAgICAgICAgc2VsZi5oZWFsdGhJbmZvLmFkZCh7XG4gICAgICAgICAgICAgICAgICAgIGtleTogXCJCQ0RCXCIsXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlOiBgPHNwYW4gY2xhc3M9J3dlYml4X2ljb24gd3hpLWNsb3NlLWNpcmNsZScgc3R5bGU9XCJjb2xvcjpyZWRcIj5FcnJvcjwvc3Bhbj5gXG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChkYXRhLndpa2lzID09PSBcIk9LXCIpIHtcbiAgICAgICAgICAgICAgICBzZWxmLmhlYWx0aEluZm8uYWRkKHtcbiAgICAgICAgICAgICAgICAgICAga2V5OiBcIldpa2lzXCIsXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlOiBgPHNwYW4gY2xhc3M9J3dlYml4X2ljb24gd3hpLWNoZWNrYm94LW1hcmtlZCcgc3R5bGU9XCJjb2xvcjpncmVlblwiPk9LPC9zcGFuPmBcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGRhdGEud2lraXMgPT09IFwiRXJyb3JcIikge1xuICAgICAgICAgICAgICAgIHNlbGYuaGVhbHRoSW5mby5hZGQoe1xuICAgICAgICAgICAgICAgICAgICBrZXk6IFwiV2lraXNcIixcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU6IGA8c3BhbiBjbGFzcz0nd2ViaXhfaWNvbiB3eGktY2xvc2UtY2lyY2xlJyBzdHlsZT1cImNvbG9yOnJlZFwiPkVycm9yPC9zcGFuPmBcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGRhdGEuY29kZXNlcnZlciA9PT0gXCJPS1wiKSB7XG4gICAgICAgICAgICAgICAgc2VsZi5oZWFsdGhJbmZvLmFkZCh7XG4gICAgICAgICAgICAgICAgICAgIGtleTogXCJDb2Rlc2VydmVyXCIsXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlOiBgPHNwYW4gY2xhc3M9J3dlYml4X2ljb24gd3hpLWNoZWNrYm94LW1hcmtlZCcgc3R5bGU9XCJjb2xvcjpncmVlblwiPk9LPC9zcGFuPmBcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGRhdGEuY29kZXNlcnZlciA9PT0gXCJFcnJvclwiKSB7XG4gICAgICAgICAgICAgICAgc2VsZi5oZWFsdGhJbmZvLmFkZCh7XG4gICAgICAgICAgICAgICAgICAgIGtleTogXCJDb2Rlc2VydmVyXCIsXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlOiBgPHNwYW4gY2xhc3M9J3dlYml4X2ljb24gd3hpLWNsb3NlLWNpcmNsZScgc3R5bGU9XCJjb2xvcjpyZWRcIj5FcnJvcjwvc3Bhbj5gXG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChkYXRhLmp1cHl0ZXIgPT09IFwiT0tcIikge1xuICAgICAgICAgICAgICAgIHNlbGYuaGVhbHRoSW5mby5hZGQoe1xuICAgICAgICAgICAgICAgICAgICBrZXk6IFwiSnVweXRlclwiLFxuICAgICAgICAgICAgICAgICAgICB2YWx1ZTogYDxzcGFuIGNsYXNzPSd3ZWJpeF9pY29uIHd4aS1jaGVja2JveC1tYXJrZWQnIHN0eWxlPVwiY29sb3I6Z3JlZW5cIj5PSzwvc3Bhbj5gXG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChkYXRhLmp1cHl0ZXIgPT09IFwiRXJyb3JcIikge1xuICAgICAgICAgICAgICAgIHNlbGYuaGVhbHRoSW5mby5hZGQoe1xuICAgICAgICAgICAgICAgICAgICBrZXk6IFwiSnVweXRlclwiLFxuICAgICAgICAgICAgICAgICAgICB2YWx1ZTogYDxzcGFuIGNsYXNzPSd3ZWJpeF9pY29uIHd4aS1jbG9zZS1jaXJjbGUnIHN0eWxlPVwiY29sb3I6cmVkXCI+RXJyb3I8L3NwYW4+YFxuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgfVxuXG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zb3VyY2VzL3ZpZXdzL2Rhc2gvaGVhbHRoLmpzIiwiaW1wb3J0IHsgSmV0VmlldyB9IGZyb20gXCJ3ZWJpeC1qZXRcIjtcbmltcG9ydCB7IGhlYWx0aCB9IGZyb20gXCIuLi8uLi9zZXJ2aWNlcy9oZWFsdGhcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgSlNYSW5mb1ZpZXcgZXh0ZW5kcyBKZXRWaWV3IHtcbiAgICBjb25maWcoKSB7XG4gICAgICAgIGNvbnN0IGluZm8gPSB7XG4gICAgICAgICAgICBpZDogXCJqc3hJbmZvXCIsXG4gICAgICAgICAgICByZXNwb25zaXZlOiB0cnVlLFxuICAgICAgICAgICAgdmlldzogXCJsaXN0XCIsXG4gICAgICAgICAgICByZXNwb25zaXZlOiB0cnVlLFxuICAgICAgICAgICAgdHlwZToge1xuICAgICAgICAgICAgICAgIGhlaWdodDogNjAsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgdGVtcGxhdGU6IGBcbiAgICAgICAgICAgICAgICA8cD48Zm9udCBzaXplPVwiM1wiPjxiPiNrZXkjOiA8L2I+PC9mb250PiA8Zm9udCBzaXplPVwiM1wiPiN2YWx1ZSM8L2ZvbnQ+PC9wPlxuICAgICAgICAgICAgYFxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHR5cGU6IFwic3BhY2VcIixcbiAgICAgICAgICAgIHJvd3M6IFt7XG4gICAgICAgICAgICAgICAgdGVtcGxhdGU6IFwiPGRpdiBzdHlsZT0nd2lkdGg6YXV0bzt0ZXh0LWFsaWduOmNlbnRlcic+PGgzPkpTWCBJbmZvPGgzLz48L2Rpdj5cIixcbiAgICAgICAgICAgICAgICBoZWlnaHQ6IDUwXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIGluZm9cbiAgICAgICAgICAgIF1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIGluaXQoKSB7XG4gICAgICAgIGNvbnN0IHNlbGYgPSB0aGlzO1xuXG4gICAgICAgIHRoaXMuaW5mbyA9IHRoaXMuJCQoXCJqc3hJbmZvXCIpO1xuXG4gICAgICAgIGhlYWx0aC5nZXRJZGVudGl0eSgpLnRoZW4oZGF0YSA9PiB7XG4gICAgICAgICAgICBzZWxmLmluZm8uYWRkKHtcbiAgICAgICAgICAgICAgICBrZXk6IFwiM2JvdFwiLFxuICAgICAgICAgICAgICAgIHZhbHVlOiBkYXRhLnRleHQoKVxuICAgICAgICAgICAgfSlcbiAgICAgICAgfSlcblxuICAgICAgICBoZWFsdGguZ2V0TmV0d29ya0luZm8oKS50aGVuKGRhdGEgPT4ge1xuICAgICAgICAgICAgZGF0YSA9IGRhdGEuanNvbigpO1xuICAgICAgICAgICAgc2VsZi5pbmZvLmFkZCh7XG4gICAgICAgICAgICAgICAga2V5OiBcIklQXCIsXG4gICAgICAgICAgICAgICAgdmFsdWU6IGRhdGEuaXAsXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGlmIChkYXRhLmlwNi5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICBzZWxmLmluZm8uYWRkKHtcbiAgICAgICAgICAgICAgICAgICAga2V5OiBcIklQdjZcIixcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU6IGRhdGEuaXA2XG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgc2VsZi5pbmZvLmFkZCh7XG4gICAgICAgICAgICAgICAgICAgIGtleTogXCJJUHY2XCIsXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlOiBcIk5vdCBzZXRcIlxuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGhlYWx0aC5nZXRKc3hWZXJzaW9uKCkudGhlbihkYXRhID0+IHtcbiAgICAgICAgICAgIHNlbGYuaW5mby5hZGQoe1xuICAgICAgICAgICAgICAgIGtleTogXCJKU1ggVmVyc2lvblwiLFxuICAgICAgICAgICAgICAgIHZhbHVlOiBkYXRhLnRleHQoKVxuICAgICAgICAgICAgfSlcbiAgICAgICAgfSlcblxuICAgIH1cblxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc291cmNlcy92aWV3cy9kYXNoL2pzeEluZm8uanMiLCJpbXBvcnQge1xuICAgIEpldFZpZXdcbn0gZnJvbSBcIndlYml4LWpldFwiO1xuXG5pbXBvcnQgUHJvY2Vzc2VzQ2hpbGRWaWV3IGZyb20gXCIuL3Byb2Nlc3Nlc0NoaWxkVmlld1wiO1xuaW1wb3J0IHtcbiAgICBoZWFsdGhcbn0gZnJvbSBcIi4uLy4uL3NlcnZpY2VzL2hlYWx0aFwiO1xuXG5jb25zdCBjb2xvcnNEYXRhc2V0ID0gW3tcbiAgICAgICAgY29sb3I6IFwiI2VlMzYzOVwiXG4gICAgfSxcbiAgICB7XG4gICAgICAgIGNvbG9yOiBcIiNlZTllMzZcIlxuICAgIH0sXG4gICAge1xuICAgICAgICBjb2xvcjogXCIjZWVlYTM2XCJcbiAgICB9LFxuICAgIHtcbiAgICAgICAgY29sb3I6IFwiI2E5ZWUzNlwiXG4gICAgfSxcbiAgICB7XG4gICAgICAgIGNvbG9yOiBcIiMzNmQzZWVcIlxuICAgIH0sXG4gICAge1xuICAgICAgICBjb2xvcjogXCIjMzY3ZmVlXCJcbiAgICB9LFxuICAgIHtcbiAgICAgICAgY29sb3I6IFwiIzliMzZlZVwiXG4gICAgfVxuXTtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUHJvY2Vzc2VzVmlldyBleHRlbmRzIEpldFZpZXcge1xuXG4gICAgY29uZmlnKCkge1xuICAgICAgICBjb25zdCBwcm9jZXNzZXNJbmZvID0ge1xuICAgICAgICAgICAgaWQ6IFwicHJvY2Vzc1wiLFxuICAgICAgICAgICAgdmlldzogXCJjaGFydFwiLFxuICAgICAgICAgICAgcmVzcG9uc2l2ZTogdHJ1ZSxcbiAgICAgICAgICAgIHR5cGU6IFwicGllXCIsXG4gICAgICAgICAgICB3aWR0aDogNTAwLFxuICAgICAgICAgICAgaGVpZ2h0OiA0MDAsXG4gICAgICAgICAgICBjb2xvcjogXCIjY29sb3IjXCIsXG4gICAgICAgICAgICB2YWx1ZTogXCIjcnNzI1wiLFxuICAgICAgICAgICAgbGFiZWw6IFwiPGg0PiNuYW1lIzwvaDQ+XCIsXG4gICAgICAgICAgICBwaWVJbm5lclRleHQ6IFwiPGg0PiNyc3MjPC9oND5cIixcbiAgICAgICAgICAgIGRhdGE6IFwiI2NoYXJ0c0RhdGEjXCIsXG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgdHlwZTogXCJzcGFjZVwiLFxuICAgICAgICAgICAgcm93czogW3tcbiAgICAgICAgICAgICAgICAgICAgdGVtcGxhdGU6IFwiPGRpdiBzdHlsZT0nd2lkdGg6YXV0bzt0ZXh0LWFsaWduOmNlbnRlcic+PGgzPlJ1bm5pbmcgcHJvY2Vzc2VzIG1lbW9yeSB1c2FnZSAoUlNTKSAoTUIpPGgzLz48L2Rpdj5cIixcbiAgICAgICAgICAgICAgICAgICAgaGVpZ2h0OiA1MFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgcHJvY2Vzc2VzSW5mbyxcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIHZpZXc6IFwiYnV0dG9uXCIsXG4gICAgICAgICAgICAgICAgICAgIGlkOiBcInNob3dfYWxsXCIsXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlOiBcIlNob3cgQWxsXCIsXG4gICAgICAgICAgICAgICAgICAgIGFsaWduOiBcImNlbnRlclwiLFxuICAgICAgICAgICAgICAgICAgICBjc3M6IFwid2ViaXhfcHJpbWFyeVwiLFxuICAgICAgICAgICAgICAgICAgICBpbnB1dFdpZHRoOiAxMDAsXG4gICAgICAgICAgICAgICAgICAgIGNsaWNrOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLiRzY29wZS5jaGlsZHZpZXcuc2hvd0Zvcih0aGlzLiRzY29wZS5wcm9jZXNzZXNMaXN0KVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBdXG4gICAgICAgIH1cbiAgICB9XG5cblxuICAgIGluaXQodmlldykge1xuICAgICAgICBjb25zdCBzZWxmID0gdGhpcztcblxuICAgICAgICB0aGlzLnByb2Nlc3Nlc0xpc3QgPSBbXVxuXG4gICAgICAgIHRoaXMucnVuUHJvY2Vzc0luZm8gPSB0aGlzLiQkKFwicHJvY2Vzc1wiKTtcblxuICAgICAgICBzZWxmLmNoaWxkdmlldyA9IHNlbGYudWkoUHJvY2Vzc2VzQ2hpbGRWaWV3KTtcblxuICAgICAgICBoZWFsdGguZ2V0UnVubmluZ1Byb2Nlc3NlcygpLnRoZW4oZGF0YSA9PiB7XG4gICAgICAgICAgICB2YXIgY2hhcnRzRGF0YSA9IFtdXG5cbiAgICAgICAgICAgIGRhdGEgPSBkYXRhLmpzb24oKTtcbiAgICAgICAgICAgIHNlbGYucHJvY2Vzc2VzTGlzdCA9IGRhdGEucHJvY2Vzc2VzX2xpc3RcblxuICAgICAgICAgICAgLy8gbWVtb3J5IHVzYWdlXG4gICAgICAgICAgICBzZWxmLm1lbW9yeVVzYWdlID0gZGF0YS5tZW1vcnlfdXNhZ2VcbiAgICAgICAgICAgIHNlbGYudG90YWxNZW1vcnkgPSBzZWxmLm1lbW9yeVVzYWdlLnRvdGFsX21lbVxuICAgICAgICAgICAgc2VsZi5wZXJjZW50ID0gc2VsZi5tZW1vcnlVc2FnZS51c2FnZV9wZXJjZW50XG5cblxuICAgICAgICAgICAgc2VsZi5ydW5Qcm9jZXNzSW5mby5kZWZpbmUoXCJsZWdlbmRcIiwge1xuICAgICAgICAgICAgICAgIGxheW91dDogXCJ4XCIsXG4gICAgICAgICAgICAgICAgd2lkdGg6IDExMCxcbiAgICAgICAgICAgICAgICB2YWx1ZXM6IFt7XG4gICAgICAgICAgICAgICAgICAgICAgICB0ZXh0OiBgPGI+VG90YWwgbWVtb3J5OiA8L2I+JHtzZWxmLnRvdGFsTWVtb3J5fUdCYFxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0ZXh0OiBgPGI+VXNhZ2U6IDwvYj4ke3NlbGYucGVyY2VudH0lYFxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIHNlbGYucnVuUHJvY2Vzc0luZm8ucmVmcmVzaCgpXG5cbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc2VsZi5wcm9jZXNzZXNMaXN0Lmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgLy9CcmVhayB3aGVuIHRoZXJlIGlzIG5vIG1vcmUgY29sb3JzXG4gICAgICAgICAgICAgICAgaWYgKGkgPT0gY29sb3JzRGF0YXNldC5sZW5ndGgpXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICAgICAgdmFyIHRlbXAgPSB7XG4gICAgICAgICAgICAgICAgICAgIFwiY29sb3JcIjogY29sb3JzRGF0YXNldFtpXS5jb2xvcixcbiAgICAgICAgICAgICAgICAgICAgXCJuYW1lXCI6IHNlbGYucHJvY2Vzc2VzTGlzdFtpXS5uYW1lLFxuICAgICAgICAgICAgICAgICAgICBcInJzc1wiOiBNYXRoLmNlaWwoc2VsZi5wcm9jZXNzZXNMaXN0W2ldLnJzcyksXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGNoYXJ0c0RhdGEucHVzaCh0ZW1wKVxuICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKG15QXJyYXlbaV0pO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBzZWxmLnJ1blByb2Nlc3NJbmZvLnBhcnNlKHtcbiAgICAgICAgICAgICAgICBkYXRhOiBjaGFydHNEYXRhLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH1cblxufVxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NvdXJjZXMvdmlld3MvZGFzaC9wcm9jZXNzZXMuanMiLCJpbXBvcnQgeyBKZXRWaWV3IH0gZnJvbSBcIndlYml4LWpldFwiO1xuXG5pbXBvcnQgeyBoZWFsdGggfSBmcm9tIFwiLi4vLi4vc2VydmljZXMvaGVhbHRoXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIHJ1bm5pbmdQb3J0c1ZpZXcgZXh0ZW5kcyBKZXRWaWV3IHtcbiAgICBjb25maWcoKSB7XG4gICAgICAgIGNvbnN0IHBvcnRzID0ge1xuICAgICAgICAgICAgaWQ6IFwicnVubmluZ1BvcnRzXCIsXG4gICAgICAgICAgICB2aWV3OiBcImRhdGF0YWJsZVwiLFxuICAgICAgICAgICAgcmVzcG9uc2l2ZTogdHJ1ZSxcbiAgICAgICAgICAgIGF1dG9Db25maWc6IHRydWUsXG4gICAgICAgICAgICB0eXBlOiB7XG4gICAgICAgICAgICAgICAgaGVpZ2h0OiAyMDAsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgdGVtcGxhdGU6IFwiUnVubmluZyBQb3J0c1wiLFxuICAgICAgICAgICAgcmVzaXplQ29sdW1uOiB0cnVlLFxuICAgICAgICAgICAgc2VsZWN0OiB0cnVlLFxuICAgICAgICAgICAgbXVsdGlzZWxlY3Q6IHRydWUsXG4gICAgICAgICAgICBjc3M6IFwid2ViaXhfaGVhZGVyX2JvcmRlciB3ZWJpeF9kYXRhX2JvcmRlclwiLFxuICAgICAgICAgICAgY29sdW1uczogW3tcbiAgICAgICAgICAgICAgICBpZDogXCJpbmRleFwiLFxuICAgICAgICAgICAgICAgIGhlYWRlcjogXCIjXCIsXG4gICAgICAgICAgICAgICAgc29ydDogXCJpbnRcIixcbiAgICAgICAgICAgICAgICBhdXRvd2lkdGg6IHRydWUsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGlkOiBcInBvcnRfbnVtYmVyXCIsXG4gICAgICAgICAgICAgICAgaGVhZGVyOiBbXCJQb3J0IE51bWJlclwiLCB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnRlbnQ6IFwidGV4dEZpbHRlclwiXG4gICAgICAgICAgICAgICAgfSxdLFxuICAgICAgICAgICAgICAgIHNvcnQ6IFwic3RyaW5nXCJcbiAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICBpZDogXCJwcm9jZXNzXCIsXG4gICAgICAgICAgICAgICAgaGVhZGVyOiBbXCJQcm9jZXNzXCIsIHtcbiAgICAgICAgICAgICAgICAgICAgY29udGVudDogXCJ0ZXh0RmlsdGVyXCJcbiAgICAgICAgICAgICAgICB9XSxcbiAgICAgICAgICAgICAgICBzb3J0OiBcInN0cmluZ1wiXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBdLFxuICAgICAgICAgICAgc2NoZW1lOiB7XG4gICAgICAgICAgICAgICAgJGluaXQ6IGZ1bmN0aW9uIChvYmopIHtcbiAgICAgICAgICAgICAgICAgICAgb2JqLmluZGV4ID0gdGhpcy5jb3VudCgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgdHlwZTogXCJzcGFjZVwiLFxuICAgICAgICAgICAgcm93czogW1xuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgdGVtcGxhdGU6IFwiPGRpdiBzdHlsZT0nd2lkdGg6YXV0bzt0ZXh0LWFsaWduOmNlbnRlcic+PGgzPlBvcnRzPGgzLz48L2Rpdj5cIixcbiAgICAgICAgICAgICAgICAgICAgaGVpZ2h0OiA1MFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgcG9ydHNcbiAgICAgICAgICAgIF1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIGluaXQoKSB7XG4gICAgICAgIGNvbnN0IHNlbGYgPSB0aGlzO1xuXG4gICAgICAgIHNlbGYucG9ydHNUYWJsZSA9IHRoaXMuJCQoXCJydW5uaW5nUG9ydHNcIik7XG4gICAgICAgIGhlYWx0aC5nZXRSdW5uaW5nUG9ydHMoKS50aGVuKGRhdGEgPT4ge1xuICAgICAgICAgICAgc2VsZi5wb3J0c1RhYmxlLnBhcnNlKGRhdGEuanNvbigpKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zb3VyY2VzL3ZpZXdzL2Rhc2gvcnVubmluZ1BvcnRzLmpzIiwiaW1wb3J0IHsgSmV0VmlldywgcGx1Z2lucyB9IGZyb20gXCJ3ZWJpeC1qZXRcIjtcbmltcG9ydCB7IGF1dGggfSBmcm9tIFwiLi4vc2VydmljZXMvYXV0aFwiO1xuXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFRvcFZpZXcgZXh0ZW5kcyBKZXRWaWV3IHtcbiAgICBjb25maWcoKSB7XG4gICAgICAgIGNvbnN0IGhlYWRlciA9IHtcbiAgICAgICAgICAgIGNvbHM6IFtcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIGlkOiBcImJ1dHRvbl9oaWRlX21lbnVcIixcbiAgICAgICAgICAgICAgICAgICAgdmlldzogXCJpY29uXCIsIGljb246IFwibWRpIG1kaS1tZW51XCIsXG4gICAgICAgICAgICAgICAgICAgIGNzczogXCJjdXN0b21fZGFya1wiLCBoZWlnaHQ6IDU4LFxuICAgICAgICAgICAgICAgICAgICBjbGljazogdGhpcy5oaWRlTWVudSxcbiAgICAgICAgICAgICAgICAgICAgdG9vbHRpcDogXCJIaWRlIG1lbnVcIixcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgaWQ6IFwiaGVhZGVyXCIsXG4gICAgICAgICAgICAgICAgICAgIHR5cGU6IFwiaGVhZGVyXCIsXG4gICAgICAgICAgICAgICAgICAgIGNzczogXCJjdXN0b21fZGFya1wiLCBoZWlnaHQ6IDU4LFxuICAgICAgICAgICAgICAgICAgICB0ZW1wbGF0ZTogXCJBRE1JTlwiLFxuICAgICAgICAgICAgICAgICAgICBib3JkZXJsZXNzOiB0cnVlLFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBdXG4gICAgICAgIH07XG5cbiAgICAgICAgY29uc3Qgc2lkZWJhckRhdGEgPSBbe1xuICAgICAgICAgICAgaWQ6IFwiZGFzaFwiLFxuICAgICAgICAgICAgdmFsdWU6IFwiRGFzaGJvYXJkXCIsXG4gICAgICAgICAgICBpY29uOiBcIm1kaSBtZGktdmlldy1kYXNoYm9hcmRcIlxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgICBpZDogXCJ3aWtpc1wiLFxuICAgICAgICAgICAgdmFsdWU6IFwiUGFja2FnZXMgRG9jc1wiLFxuICAgICAgICAgICAgaWNvbjogXCJtZGkgbWRpLW5ld3NwYXBlclwiXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICAgIGlkOiBcImFsZXJ0c1wiLFxuICAgICAgICAgICAgdmFsdWU6IFwiQWxlcnRzXCIsXG4gICAgICAgICAgICBpY29uOiBcIm1kaSBtZGktYmVsbC1hbGVydFwiXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICAgIGlkOiBcImxvZ3NcIixcbiAgICAgICAgICAgIHZhbHVlOiBcIkxvZ3NcIixcbiAgICAgICAgICAgIGljb246IFwibWRpIG1kaS1oaXN0b3J5XCJcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgICAgaWQ6IFwibXlqb2JzX21haW5cIixcbiAgICAgICAgICAgIHZhbHVlOiBcIk15IGpvYnNcIixcbiAgICAgICAgICAgIGljb246IFwibWRpIG1kaS1hbmltYXRpb24tcGxheVwiLFxuICAgICAgICAgICAgZGF0YTogW3tcbiAgICAgICAgICAgICAgICBpZDogXCJteWpvYnNcIixcbiAgICAgICAgICAgICAgICBpY29uOiBcIm1kaSBtZGktYm9vay1vcGVuXCIsXG4gICAgICAgICAgICAgICAgdmFsdWU6IFwiSm9ic1wiXG4gICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgaWQ6IFwid29ya2Vyc1wiLFxuICAgICAgICAgICAgICAgIGljb246IFwibWRpIG1kaS13b3JrZXJcIixcbiAgICAgICAgICAgICAgICB2YWx1ZTogXCJXb3JrZXJzXCJcbiAgICAgICAgICAgIH1dXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICAgIGlkOiBcInRmd2lraXNfbWFpblwiLFxuICAgICAgICAgICAgdmFsdWU6IFwiVEYgV2lraXNcIixcbiAgICAgICAgICAgIGljb246IFwibWRpIG1kaS1hbmltYXRpb24tcGxheVwiLFxuICAgICAgICAgICAgZGF0YTogW3tcbiAgICAgICAgICAgICAgICBpZDogXCJ0ZmdyaWRzZGtcIixcbiAgICAgICAgICAgICAgICBpY29uOiBcIm1kaSBtZGktYm9vay1vcGVuXCIsXG4gICAgICAgICAgICAgICAgdmFsdWU6IFwiVEZHcmlkU0RLXCJcbiAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICBpZDogXCJ0aHJlZWZvbGRcIixcbiAgICAgICAgICAgICAgICBpY29uOiBcIm1kaSBtZGktd29ya2VyXCIsXG4gICAgICAgICAgICAgICAgdmFsdWU6IFwiVGhyZWVmb2xkXCJcbiAgICAgICAgICAgIH1dXG4gICAgICAgIH0sXG5cbiAgICAgICAge1xuICAgICAgICAgICAgaWQ6IFwicGFja2FnZXNcIixcbiAgICAgICAgICAgIHZhbHVlOiBcIlBhY2thZ2VzXCIsXG4gICAgICAgICAgICBpY29uOiBcIm1kaSBtZGktcGFja2FnZVwiXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICAgIGlkOiBcImRlcGxveWVkU29sdXRpb25zXCIsXG4gICAgICAgICAgICB2YWx1ZTogXCJEZXBsb3llZCBTb2x1dGlvbnNcIixcbiAgICAgICAgICAgIGljb246IFwibWRpIG1kaS1hbmltYXRpb24tcGxheVwiXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICAgIGlkOiBcInNvbHV0aW9uc1wiLFxuICAgICAgICAgICAgdmFsdWU6IFwiU29sdXRpb25zXCIsXG4gICAgICAgICAgICBpY29uOiBcIm1kaSBtZGktYW5pbWF0aW9uLXBsYXlcIixcbiAgICAgICAgICAgIGRhdGE6IFt7XG4gICAgICAgICAgICAgICAgaWQ6IFwibmV0d29ya1wiLFxuICAgICAgICAgICAgICAgIHZhbHVlOiAnPHNwYW4+PGltZyBjbGFzcz1cInNvbHV0aW9ucy1pY29uXCIgc3JjPVwic3RhdGljL2ltZy9uZXR3b3JrLnBuZ1wiLz5OZXR3b3JrPC9zcGFuPidcbiAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICBpZDogXCJ1YnVudHVcIixcbiAgICAgICAgICAgICAgICB2YWx1ZTogJzxzcGFuPjxpbWcgY2xhc3M9XCJzb2x1dGlvbnMtaWNvblwiIHNyYz1cInN0YXRpYy9pbWcvdWJ1bnR1LnBuZ1wiLz5VYnVudHU8L3NwYW4+J1xuICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIGlkOiBcImZsaXN0XCIsXG4gICAgICAgICAgICAgICAgdmFsdWU6ICc8c3Bhbj48aW1nIGNsYXNzPVwic29sdXRpb25zLWljb25cIiBzcmM9XCJzdGF0aWMvaW1nL2ZsaXN0LnBuZ1wiLz5HZW5lcmljIGZsaXN0PC9zcGFuPidcbiAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICBpZDogXCJtaW5pb1wiLFxuICAgICAgICAgICAgICAgIHZhbHVlOiAnPHNwYW4+PGltZyBjbGFzcz1cInNvbHV0aW9ucy1pY29uXCIgc3JjPVwic3RhdGljL2ltZy9taW5pby5wbmdcIi8+TWluaW8gLyBTMzwvc3Bhbj4nXG4gICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgaWQ6IFwiazhzX2NsdXN0ZXJcIixcbiAgICAgICAgICAgICAgICB2YWx1ZTogJzxzcGFuPjxpbWcgY2xhc3M9XCJzb2x1dGlvbnMtaWNvblwiIHNyYz1cInN0YXRpYy9pbWcvazhzLnBuZ1wiLz5LdWJlcm5ldGVzIGNsdXN0ZXI8L3NwYW4+J1xuICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIGlkOiBcIndlYmdhdGV3YXlcIixcbiAgICAgICAgICAgICAgICB2YWx1ZTogJ1dlYiBHYXRld2F5JyxcbiAgICAgICAgICAgICAgICBpY29uOiBcIm1kaSBtZGktbmV0d29ya1wiXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBdXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICAgIGlkOiBcIndhbGxldHNNYW5hZ2VyXCIsXG4gICAgICAgICAgICB2YWx1ZTogXCJXYWxsZXRzIE1hbmFnZXJcIixcbiAgICAgICAgICAgIGljb246IFwibWRpIG1kaS13YWxsZXRcIlxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgICBpZDogXCJjYXBhY2l0eVwiLFxuICAgICAgICAgICAgdmFsdWU6IFwiQ2FwYWNpdHlcIixcbiAgICAgICAgICAgIGljb246IFwibWRpIG1kaS1zZXJ2ZXJcIlxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgICBpZDogXCJmYXJtbWFuYWdlbWVudFwiLFxuICAgICAgICAgICAgdmFsdWU6IFwiRmFybSBNYW5hZ2VtZW50XCIsXG4gICAgICAgICAgICBpY29uOiBcIm1kaSBtZGktc2VydmVyXCJcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgICAgaWQ6IFwic2RrZXhhbXBsZXNcIixcbiAgICAgICAgICAgIHZhbHVlOiBcIlNESyBFeGFtcGxlc1wiLFxuICAgICAgICAgICAgaWNvbjogXCJtZGkgbWRpLWZpbGVcIlxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgICBpZDogXCJjb2Rlc2VydmVyXCIsXG4gICAgICAgICAgICB2YWx1ZTogXCJDb2Rlc2VydmVyXCIsXG4gICAgICAgICAgICBpY29uOiBcIm1kaSBtZGktY29kZS10YWdzXCJcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgICAgaWQ6IFwianVweXRlclwiLFxuICAgICAgICAgICAgdmFsdWU6IFwiVEYgU2ltdWxhdG9yXCIsXG4gICAgICAgICAgICBpY29uOiBcIm1kaSBtZGktcGxheVwiXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICAgIGlkOiBcInNldHRpbmdzXCIsXG4gICAgICAgICAgICB2YWx1ZTogXCJTZXR0aW5nc1wiLFxuICAgICAgICAgICAgaWNvbjogXCJtZGkgbWRpLXNldHRpbmdzXCJcbiAgICAgICAgfSxcbiAgICAgICAgXVxuXG4gICAgICAgIGNvbnN0IHJlc3BvbnNlID0gd2ViaXguYWpheCgpLnN5bmMoKS5nZXQoXCIvemVyb2JvdC9hZG1pbi9hY3RvcnMvcGFja2FnZV9tYW5hZ2VyL3BhY2thZ2VzX2xpc3RcIiwgeyBoYXNfZnJvbnRlbmRfYXJnczogdHJ1ZSwgc3RhdHVzOiBcImluc3RhbGxlZFwiIH0pO1xuICAgICAgICBsZXQgcGFja2FnZXM7XG5cbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIHBhY2thZ2VzID0gSlNPTi5wYXJzZShyZXNwb25zZS5yZXNwb25zZVRleHQpLnBhY2thZ2VzO1xuICAgICAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICAgICAgcGFja2FnZXMgPSBbXTtcbiAgICAgICAgfVxuXG4gICAgICAgIGZvciAoY29uc3QgcCBvZiBwYWNrYWdlcykge1xuICAgICAgICAgICAgc2lkZWJhckRhdGEucHVzaChwLmZyb250ZW5kX2FyZ3MpO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3Qgc2lkZWJhciA9IHtcbiAgICAgICAgICAgIGxvY2FsSWQ6IFwibWVudVwiLFxuICAgICAgICAgICAgdmlldzogXCJzaWRlYmFyXCIsXG4gICAgICAgICAgICBjc3M6IFwid2ViaXhfZGFya1wiLFxuICAgICAgICAgICAgd2lkdGg6IDIwMCxcbiAgICAgICAgICAgIGRhdGE6IHNpZGViYXJEYXRhLFxuICAgICAgICB9O1xuXG4gICAgICAgIGNvbnN0IHRvb2xiYXIgPSB7XG4gICAgICAgICAgICB2aWV3OiBcInRvb2xiYXJcIixcbiAgICAgICAgICAgIHBhZGRpbmc6IDksXG4gICAgICAgICAgICBoZWlnaHQ6IDU4LFxuICAgICAgICAgICAgY29sczogW3tcbiAgICAgICAgICAgICAgICBpZDogXCJidXR0b25fc2hvd19tZW51XCIsXG4gICAgICAgICAgICAgICAgdmlldzogXCJpY29uXCIsXG4gICAgICAgICAgICAgICAgaWNvbjogXCJtZGkgbWRpLW1lbnVcIixcbiAgICAgICAgICAgICAgICBjbGljazogdGhpcy5zaG93TWVudSxcbiAgICAgICAgICAgICAgICBoaWRkZW46IHRydWUsIC8vIGhpZGRlbiBieSBkZWZhdWx0XG4gICAgICAgICAgICAgICAgdG9vbHRpcDogXCJTaG93IG1lbnVcIixcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgdmlldzogXCJ0ZW1wbGF0ZVwiLFxuICAgICAgICAgICAgICAgIHRlbXBsYXRlOiBgPGltZyBjbGFzcz1cIndlYml4X2ljb25cIiBzcmM9XCJzdGF0aWMvaW1nLzNib3QucG5nXCIvPmAsXG4gICAgICAgICAgICAgICAgYm9yZGVybGVzczogdHJ1ZSxcbiAgICAgICAgICAgICAgICBoZWlnaHQ6IDQwLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBpZDogXCJ1c2VybmFtZV9sYWJlbFwiLFxuICAgICAgICAgICAgICAgIHZpZXc6IFwibGFiZWxcIixcbiAgICAgICAgICAgICAgICBsYWJlbDogXCJ1c2VybmFtZVwiLFxuICAgICAgICAgICAgICAgIGJvcmRlcmxlc3M6IHRydWUsXG4gICAgICAgICAgICAgICAgYWxpZ246IFwicmlnaHRcIixcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgaWQ6IFwidXNlcl9pY29uXCIsXG4gICAgICAgICAgICAgICAgdmlldzogXCJpY29uXCIsXG4gICAgICAgICAgICAgICAgaWNvbjogXCJtZGkgbWRpLWFjY291bnQtY2lyY2xlXCIsXG4gICAgICAgICAgICAgICAgYm9yZGVybGVzczogdHJ1ZSxcbiAgICAgICAgICAgICAgICBwb3B1cDogXCJ1c2VyX21lbnVcIlxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgXVxuICAgICAgICB9O1xuXG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICB0eXBlOiBcImNsZWFuXCIsXG4gICAgICAgICAgICBjb2xzOiBbe1xuICAgICAgICAgICAgICAgIHJvd3M6IFtoZWFkZXIsIHNpZGViYXJdXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHJvd3M6IFtcbiAgICAgICAgICAgICAgICAgICAgdG9vbGJhcixcbiAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgJHN1YnZpZXc6IHRydWVcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIF1cbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICBzaG93TWVudSgpIHtcbiAgICAgICAgdGhpcy4kc2NvcGUubWVudS5zaG93KCk7XG4gICAgICAgIHRoaXMuJHNjb3BlLmhlYWRlci5zaG93KCk7XG4gICAgICAgIHRoaXMuJHNjb3BlLmJ1dHRvbkhpZGVNZW51LnNob3coKTtcblxuICAgICAgICB0aGlzLiRzY29wZS5idXR0b25TaG93TWVudS5oaWRlKCk7XG4gICAgfVxuXG4gICAgaGlkZU1lbnUoKSB7XG4gICAgICAgIHRoaXMuJHNjb3BlLm1lbnUuaGlkZSgpO1xuICAgICAgICB0aGlzLiRzY29wZS5oZWFkZXIuaGlkZSgpO1xuICAgICAgICB0aGlzLiRzY29wZS5idXR0b25IaWRlTWVudS5oaWRlKCk7XG5cbiAgICAgICAgdGhpcy4kc2NvcGUuYnV0dG9uU2hvd01lbnUuc2hvdygpO1xuICAgIH1cblxuICAgIGluaXQoKSB7XG4gICAgICAgIHZhciBzZWxmID0gdGhpcztcblxuICAgICAgICB0aGlzLnVzZShwbHVnaW5zLk1lbnUsIHtcbiAgICAgICAgICAgIGlkOiBcIm1lbnVcIixcbiAgICAgICAgICAgIHVybHM6IHtcbiAgICAgICAgICAgICAgICBteWpvYnM6IFwibXlqb2JzLmpvYnNcIixcbiAgICAgICAgICAgICAgICB3b3JrZXJzOiBcIm15am9icy53b3JrZXJzXCIsXG4gICAgICAgICAgICAgICAgdGZncmlkc2RrOiBcInRmd2lraXMudGZncmlkc2RrXCIsXG4gICAgICAgICAgICAgICAgdGhyZWVmb2xkOiBcInRmd2lraXMudGhyZWVmb2xkXCIsXG4gICAgICAgICAgICAgICAgdWJ1bnR1OiBcInNvbHV0aW9ucy5jaGF0Zmxvdz9hdXRob3I9dGZncmlkX3NvbHV0aW9ucyZwYWNrYWdlPXRmZ3JpZF9zb2x1dGlvbnMmY2hhdD11YnVudHVfZGVwbG95XCIsXG4gICAgICAgICAgICAgICAgbmV0d29yazogXCJzb2x1dGlvbnMuY2hhdGZsb3c/YXV0aG9yPXRmZ3JpZF9zb2x1dGlvbnMmcGFja2FnZT10ZmdyaWRfc29sdXRpb25zJmNoYXQ9bmV0d29ya19kZXBsb3lcIixcbiAgICAgICAgICAgICAgICBmbGlzdDogXCJzb2x1dGlvbnMuY2hhdGZsb3c/YXV0aG9yPXRmZ3JpZF9zb2x1dGlvbnMmcGFja2FnZT10ZmdyaWRfc29sdXRpb25zJmNoYXQ9eW91cl9mbGlzdFwiLFxuICAgICAgICAgICAgICAgIG1pbmlvOiBcInNvbHV0aW9ucy5jaGF0Zmxvdz9hdXRob3I9dGZncmlkX3NvbHV0aW9ucyZwYWNrYWdlPXRmZ3JpZF9zb2x1dGlvbnMmY2hhdD1taW5pb19kZXBsb3lcIixcbiAgICAgICAgICAgICAgICB3ZWJnYXRld2F5OiBcInNvbHV0aW9ucy5jaGF0Zmxvdz9hdXRob3I9dGZncmlkX3NvbHV0aW9ucyZwYWNrYWdlPXRmZ3JpZF9zb2x1dGlvbnMmY2hhdD13ZWJnYXRld2F5X2RlcGxveVwiLFxuICAgICAgICAgICAgICAgIGs4c19jbHVzdGVyOiBcInNvbHV0aW9ucy5jaGF0Zmxvdz9hdXRob3I9dGZncmlkX3NvbHV0aW9ucyZwYWNrYWdlPXRmZ3JpZF9zb2x1dGlvbnMmY2hhdD1rdWJlcm5ldGVzX2NsdXN0ZXJfZGVwbG95XCIsXG4gICAgICAgICAgICAgICAgdGhyZWVib3Q6IFwic29sdXRpb25zLmNoYXRmbG93P2F1dGhvcj10ZmdyaWQmcGFja2FnZT10aHJlZWJvdF9wcm92aXNpb25pbmcmY2hhdD10aHJlZWJvdF9yZXNlcnZhdGlvblwiLFxuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICB0aGlzLm1lbnUgPSB0aGlzLiQkKFwibWVudVwiKTtcbiAgICAgICAgdGhpcy5oZWFkZXIgPSB0aGlzLiQkKFwiaGVhZGVyXCIpO1xuXG4gICAgICAgIHRoaXMuYnV0dG9uU2hvd01lbnUgPSB0aGlzLiQkKFwiYnV0dG9uX3Nob3dfbWVudVwiKTtcbiAgICAgICAgdGhpcy5idXR0b25IaWRlTWVudSA9IHRoaXMuJCQoXCJidXR0b25faGlkZV9tZW51XCIpO1xuXG5cbiAgICAgICAgdGhpcy53ZWJpeC51aSh7XG4gICAgICAgICAgICB2aWV3OiBcInN1Ym1lbnVcIixcbiAgICAgICAgICAgIGlkOiBcInVzZXJfbWVudVwiLFxuICAgICAgICAgICAgYXV0b3dpZHRoOiB0cnVlLFxuICAgICAgICAgICAgZGF0YTogW11cbiAgICAgICAgfSk7XG5cbiAgICAgICAgdGhpcy51c2VyTWVudSA9ICQkKFwidXNlcl9tZW51XCIpO1xuICAgICAgICB0aGlzLnVzZXJNZW51LmF0dGFjaEV2ZW50KFwib25JdGVtQ2xpY2tcIiwgZnVuY3Rpb24gKGlkLCBlLCBub2RlKSB7XG4gICAgICAgICAgICBpZiAoaWQgPT0gXCJsb2dvdXRcIikge1xuICAgICAgICAgICAgICAgIGF1dGgubG9nb3V0KCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHRoaXMudXNlcm5hbWVMYWJlbCA9ICQkKFwidXNlcm5hbWVfbGFiZWxcIik7XG5cbiAgICAgICAgYXV0aC5nZXRDdXJyZW50VXNlcigpLnRoZW4oZGF0YSA9PiB7XG4gICAgICAgICAgICBjb25zdCBpbmZvID0gZGF0YS5qc29uKClcbiAgICAgICAgICAgIGxldCB1c2VybmFtZSA9IGluZm8udXNlcm5hbWU7XG5cbiAgICAgICAgICAgIGlmIChpbmZvLmRldm1vZGUpIHtcbiAgICAgICAgICAgICAgICB1c2VybmFtZSArPSBcIiBbZGV2ZWxvcG1lbnRdXCJcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgc2VsZi51c2VybmFtZUxhYmVsLmNvbmZpZy5sYWJlbCA9IHVzZXJuYW1lO1xuICAgICAgICAgICAgc2VsZi51c2VybmFtZUxhYmVsLmNvbmZpZy53aWR0aCA9IHdlYml4Lmh0bWwuZ2V0VGV4dFNpemUodXNlcm5hbWUpICsgMTA7XG4gICAgICAgICAgICBzZWxmLnVzZXJuYW1lTGFiZWwucmVmcmVzaCgpO1xuXG4gICAgICAgICAgICBzZWxmLnVzZXJNZW51LmFkZCh7IGlkOiAnZW1haWwnLCB2YWx1ZTogaW5mby5lbWFpbCB9KVxuICAgICAgICAgICAgc2VsZi51c2VyTWVudS5hZGQoeyBpZDogJ2xvZ291dCcsIHZhbHVlOiBcIkxvZ291dFwiIH0pXG4gICAgICAgIH0pLmNhdGNoKCgpID0+IHtcbiAgICAgICAgICAgIGF1dGgubG9nb3V0KCk7XG4gICAgICAgIH0pO1xuICAgIH1cblxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc291cmNlcy92aWV3cy9tYWluLmpzIiwiaW1wb3J0IHsgSmV0VmlldyB9IGZyb20gXCJ3ZWJpeC1qZXRcIjtcblxuaW1wb3J0IHsgZGF0ZUZvcm1hdHRlciB9IGZyb20gXCIuLi8uLi9jb21tb24vZm9ybWF0dGVyc1wiO1xuaW1wb3J0IHsgbXlqb2JzIH0gZnJvbSBcIi4uLy4uL3NlcnZpY2VzL215am9ic1wiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBKb2JzVmlldyBleHRlbmRzIEpldFZpZXcge1xuICAgIGNvbmZpZygpIHtcbiAgICAgICAgY29uc3QgdmlldyA9IHtcbiAgICAgICAgICAgIHZpZXc6IFwiZGF0YXRhYmxlXCIsXG4gICAgICAgICAgICBpZDogXCJqb2JzX3RhYmxlXCIsXG4gICAgICAgICAgICByZXNpemVDb2x1bW46IHRydWUsXG4gICAgICAgICAgICBzZWxlY3Q6IHRydWUsXG4gICAgICAgICAgICBtdWx0aXNlbGVjdDogdHJ1ZSxcbiAgICAgICAgICAgIGNzczogXCJ3ZWJpeF9oZWFkZXJfYm9yZGVyIHdlYml4X2RhdGFfYm9yZGVyXCIsXG4gICAgICAgICAgICBjb2x1bW5zOiBbe1xuICAgICAgICAgICAgICAgIGlkOiBcImluZGV4XCIsXG4gICAgICAgICAgICAgICAgaGVhZGVyOiBcIiNcIixcbiAgICAgICAgICAgICAgICBzb3J0OiBcImludFwiLFxuICAgICAgICAgICAgICAgIGF1dG93aWR0aDogdHJ1ZSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgaWQ6IFwiY2F0ZWdvcnlcIixcbiAgICAgICAgICAgICAgICBoZWFkZXI6IFwiQ2F0ZWdvcnlcIixcbiAgICAgICAgICAgICAgICBzb3J0OiBcInN0cmluZ1wiXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGlkOiBcInRpbWVfc3RhcnRcIixcbiAgICAgICAgICAgICAgICBoZWFkZXI6IFwiU3RhcnQgdGltZVwiLFxuICAgICAgICAgICAgICAgIHNvcnQ6IFwiZGF0ZVwiLFxuICAgICAgICAgICAgICAgIGZvcm1hdDogZGF0ZUZvcm1hdHRlcixcbiAgICAgICAgICAgICAgICB3aWR0aDogMjAwXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGlkOiBcInRpbWVfc3RvcFwiLFxuICAgICAgICAgICAgICAgIGhlYWRlcjogXCJTdG9wIHRpbWVcIixcbiAgICAgICAgICAgICAgICBzb3J0OiBcImRhdGVcIixcbiAgICAgICAgICAgICAgICBmb3JtYXQ6IGRhdGVGb3JtYXR0ZXIsXG4gICAgICAgICAgICAgICAgd2lkdGg6IDIwMFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBpZDogXCJ0aW1lb3V0XCIsXG4gICAgICAgICAgICAgICAgaGVhZGVyOiBcIlRpbWVvdXRcIixcbiAgICAgICAgICAgICAgICBzb3J0OiBcImludFwiXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGlkOiBcImFjdGlvbl9pZFwiLFxuICAgICAgICAgICAgICAgIGhlYWRlcjogXCJBY3Rpb25cIixcbiAgICAgICAgICAgICAgICBzb3J0OiBcInN0cmluZ1wiXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGlkOiBcImt3YXJnc1wiLFxuICAgICAgICAgICAgICAgIGhlYWRlcjogXCJBcmd1bWVudHNcIixcbiAgICAgICAgICAgICAgICBzb3J0OiBcInN0cmluZ1wiLFxuICAgICAgICAgICAgICAgIGZvcm1hdDogSlNPTi5zdHJpbmdpZnlcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgaWQ6IFwicmVzdWx0XCIsXG4gICAgICAgICAgICAgICAgaGVhZGVyOiBbXG4gICAgICAgICAgICAgICAgICAgIFwiUmVzdWx0XCIsXG4gICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRlbnQ6IFwidGV4dEZpbHRlclwiXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgIHNvcnQ6IFwic3RyaW5nXCIsXG4gICAgICAgICAgICAgICAgZm9ybWF0OiBKU09OLnN0cmluZ2lmeSxcbiAgICAgICAgICAgIH1dLFxuICAgICAgICAgICAgc2NoZW1lOiB7XG4gICAgICAgICAgICAgICAgJGluaXQ6IGZ1bmN0aW9uIChvYmopIHtcbiAgICAgICAgICAgICAgICAgICAgb2JqLmluZGV4ID0gdGhpcy5jb3VudCgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgIH07XG5cbiAgICAgICAgcmV0dXJuIHZpZXc7XG4gICAgfVxuXG4gICAgaW5pdCh2aWV3KSB7XG4gICAgICAgIG15am9icy5saXN0Sm9icygpLnRoZW4oZGF0YSA9PiB7XG4gICAgICAgICAgICB2aWV3LnBhcnNlKGRhdGEpO1xuICAgICAgICB9KTtcbiAgICB9XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zb3VyY2VzL3ZpZXdzL215am9icy9qb2JzLmpzIiwiaW1wb3J0IHsgU2VydmljZSB9IGZyb20gXCIuLi9jb21tb24vYXBpXCI7XG5cbmNvbnN0IEJBU0VfVVJMID0gXCIvemVyb2JvdC9hZG1pbi9hY3RvcnMvbXlqb2JzXCI7XG5cbmNsYXNzIE15am9ic1NlcnZpY2UgZXh0ZW5kcyBTZXJ2aWNlIHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgc3VwZXIoQkFTRV9VUkwpO1xuICAgIH1cblxuICAgIGxpc3RKb2JzKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5nZXRDYWxsKFwibGlzdF9qb2JzXCIpO1xuICAgIH1cblxuICAgIGxpc3RXb3JrZXJzKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5nZXRDYWxsKFwibGlzdF93b3JrZXJzXCIpO1xuICAgIH1cbn1cblxuZXhwb3J0IGNvbnN0IG15am9icyA9IG5ldyBNeWpvYnNTZXJ2aWNlKCk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zb3VyY2VzL3NlcnZpY2VzL215am9icy5qcyIsImltcG9ydCB7IEpldFZpZXcgfSBmcm9tIFwid2ViaXgtamV0XCI7XG5cbmltcG9ydCB7IGRhdGVGb3JtYXR0ZXIgfSBmcm9tIFwiLi4vLi4vY29tbW9uL2Zvcm1hdHRlcnNcIjtcbmltcG9ydCB7IG15am9icyB9IGZyb20gXCIuLi8uLi9zZXJ2aWNlcy9teWpvYnNcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgSm9ic1ZpZXcgZXh0ZW5kcyBKZXRWaWV3IHtcbiAgICBjb25maWcoKSB7XG4gICAgICAgIGNvbnN0IHZpZXcgPSB7XG4gICAgICAgICAgICB2aWV3OiBcImRhdGF0YWJsZVwiLFxuICAgICAgICAgICAgaWQ6IFwid29ya2Vyc190YWJsZVwiLFxuICAgICAgICAgICAgcmVzaXplQ29sdW1uOiB0cnVlLFxuICAgICAgICAgICAgc2VsZWN0OiB0cnVlLFxuICAgICAgICAgICAgbXVsdGlzZWxlY3Q6IHRydWUsXG4gICAgICAgICAgICBjc3M6IFwid2ViaXhfaGVhZGVyX2JvcmRlciB3ZWJpeF9kYXRhX2JvcmRlclwiLFxuICAgICAgICAgICAgY29sdW1uczogW3tcbiAgICAgICAgICAgICAgICBpZDogXCJpbmRleFwiLFxuICAgICAgICAgICAgICAgIGhlYWRlcjogXCIjXCIsXG4gICAgICAgICAgICAgICAgc29ydDogXCJpbnRcIixcbiAgICAgICAgICAgICAgICBhdXRvd2lkdGg6IHRydWUsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGlkOiBcInN0YXRlXCIsXG4gICAgICAgICAgICAgICAgaGVhZGVyOiBcIlN0YXRlXCIsXG4gICAgICAgICAgICAgICAgc29ydDogXCJzdHJpbmdcIlxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBpZDogXCJoYWx0XCIsXG4gICAgICAgICAgICAgICAgaGVhZGVyOiBcIkhhbHRlZFwiLFxuICAgICAgICAgICAgICAgIHNvcnQ6IFwic3RyaW5nXCIsXG4gICAgICAgICAgICAgICAgZm9ybWF0OiBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHZhbHVlID8gJ1llcycgOiAnTm8nO1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGlkOiBcInBpZFwiLFxuICAgICAgICAgICAgICAgIGhlYWRlcjogXCJQSURcIixcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgaWQ6IFwiY3VycmVudF9qb2JcIixcbiAgICAgICAgICAgICAgICBoZWFkZXI6IFwiQ3VycmVudCBqb2JcIixcbiAgICAgICAgICAgICAgICBmb3JtYXQ6IGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdmFsdWUgPT0gMjE0NzQ4MzY0NyA/ICdOL0EnIDogdmFsdWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBpZDogXCJsYXN0X3VwZGF0ZVwiLFxuICAgICAgICAgICAgICAgIGhlYWRlcjogXCJMYXN0IHVwZGF0ZVwiLFxuICAgICAgICAgICAgICAgIHNvcnQ6IFwiZGF0ZVwiLFxuICAgICAgICAgICAgICAgIGZvcm1hdDogZGF0ZUZvcm1hdHRlcixcbiAgICAgICAgICAgICAgICB3aWR0aDogMjAwXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGlkOiBcInRpbWVfc3RhcnRcIixcbiAgICAgICAgICAgICAgICBoZWFkZXI6IFwiU3RhcnQgdGltZVwiLFxuICAgICAgICAgICAgICAgIHNvcnQ6IFwiZGF0ZVwiLFxuICAgICAgICAgICAgICAgIGZvcm1hdDogZGF0ZUZvcm1hdHRlcixcbiAgICAgICAgICAgICAgICB3aWR0aDogMjAwXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGlkOiBcInRpbWVvdXRcIixcbiAgICAgICAgICAgICAgICBoZWFkZXI6IFwiVGltZW91dFwiLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBpZDogXCJ0eXBlXCIsXG4gICAgICAgICAgICAgICAgaGVhZGVyOiBcIlR5cGVcIixcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgaWQ6IFwiZXJyb3JcIixcbiAgICAgICAgICAgICAgICBoZWFkZXI6IFwiRXJyb3JcIixcbiAgICAgICAgICAgIH1dLFxuICAgICAgICAgICAgYXV0b0NvbmZpZzogdHJ1ZSxcbiAgICAgICAgICAgIHNjaGVtZToge1xuICAgICAgICAgICAgICAgICRpbml0OiBmdW5jdGlvbiAob2JqKSB7XG4gICAgICAgICAgICAgICAgICAgIG9iai5pbmRleCA9IHRoaXMuY291bnQoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICB9O1xuXG4gICAgICAgIHJldHVybiB2aWV3O1xuICAgIH1cblxuICAgIGluaXQodmlldykge1xuICAgICAgICBteWpvYnMubGlzdFdvcmtlcnMoKS50aGVuKGRhdGEgPT4ge1xuICAgICAgICAgICAgdmlldy5wYXJzZShkYXRhKTtcbiAgICAgICAgfSk7XG5cbiAgICB9XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zb3VyY2VzL3ZpZXdzL215am9icy93b3JrZXJzLmpzIiwiaW1wb3J0IHsgRXh0ZXJuYWxWaWV3IH0gZnJvbSBcIi4uL2V4dGVybmFsXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIENoYXRmbG93VmlldyBleHRlbmRzIEV4dGVybmFsVmlldyB7XG4gICAgY29uc3RydWN0b3IoYXBwLCBuYW1lKSB7XG4gICAgICAgIHN1cGVyKGFwcCwgbmFtZSk7XG5cbiAgICAgICAgdGhpcy5iYXNlR2l0VXJsID0gXCJodHRwczovL2dpdGh1Yi5jb20vdGhyZWVmb2xkdGVjaC9qdW1wc2NhbGVYX3RocmVlYm90L3RyZWUvZGV2ZWxvcG1lbnQvVGhyZWVCb3RQYWNrYWdlc1wiO1xuXG4gICAgfVxuXG4gICAgdXJsQ2hhbmdlKHZpZXcsIHVybCkge1xuICAgICAgICBjb25zdCBwYXJhbXMgPSB1cmxbMF0ucGFyYW1zO1xuICAgICAgICBpZiAoT2JqZWN0LmtleXMocGFyYW1zKS5sZW5ndGggIT09IDMpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IHBhY2thZ2VOYW1lID0gYCR7cGFyYW1zLmF1dGhvcn0uJHtwYXJhbXMucGFja2FnZX1gXG4gICAgICAgIGNvbnN0IHBhY2thZ2VVcmwgPSBwYWNrYWdlTmFtZS5yZXBsYWNlKFwiLlwiLCBcIi9cIik7XG5cbiAgICAgICAgdGhpcy50YXJnZXRVcmwgPSBgLyR7cGFja2FnZVVybH0vY2hhdC8ke3BhcmFtcy5jaGF0fT9ub2hlYWRlcj15ZXNgO1xuICAgICAgICB0aGlzLnJlcXVpcmVkUGFja2FnZXMgPSB7fVxuICAgICAgICB0aGlzLnJlcXVpcmVkUGFja2FnZXNbcGFja2FnZU5hbWVdID0gYCR7dGhpcy5iYXNlR2l0VXJsfS8ke3BhY2thZ2VVcmx9YDtcblxuICAgICAgICB0aGlzLmluaXQodmlldyk7XG4gICAgfVxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc291cmNlcy92aWV3cy9zb2x1dGlvbnMvY2hhdGZsb3cuanMiLCJpbXBvcnQgeyBFeHRlcm5hbFZpZXcgfSBmcm9tIFwiLi4vZXh0ZXJuYWxcIjtcblxuY29uc3QgVEZHUklEU0RLX1VSTCA9IFwiL3RocmVlZm9sZC9pbmZvX3RmZ3JpZHNkay9cIjtcbmNvbnN0IFJFUVVJUkVEX1BBQ0tBR0VTID0ge1xuICAgIFwidGhyZWVmb2xkLndpa2lzXCI6IFwiaHR0cHM6Ly9naXRodWIuY29tL3RocmVlZm9sZHRlY2gvanVtcHNjYWxlWF90aHJlZWJvdC90cmVlL2RldmVsb3BtZW50L1RocmVlQm90UGFja2FnZXMvdGhyZWVmb2xkL3dpa2lzXCJcbn1cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVEZHcmlkU0RLV2lraSBleHRlbmRzIEV4dGVybmFsVmlldyB7XG4gICAgY29uc3RydWN0b3IoYXBwLCBuYW1lKSB7XG4gICAgICAgIHN1cGVyKGFwcCwgbmFtZSwgVEZHUklEU0RLX1VSTCwgUkVRVUlSRURfUEFDS0FHRVMpO1xuICAgIH1cbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NvdXJjZXMvdmlld3MvdGZ3aWtpcy90ZmdyaWRzZGsuanMiLCJpbXBvcnQgeyBFeHRlcm5hbFZpZXcgfSBmcm9tIFwiLi4vZXh0ZXJuYWxcIjtcblxuY29uc3QgVEhSRUVGT0xEX1VSTCA9IFwiL3RocmVlZm9sZC9pbmZvX3RocmVlZm9sZC9cIjtcbmNvbnN0IFJFUVVJUkVEX1BBQ0tBR0VTID0ge1xuICAgIFwidGhyZWVmb2xkLndpa2lzXCI6IFwiaHR0cHM6Ly9naXRodWIuY29tL3RocmVlZm9sZHRlY2gvanVtcHNjYWxlWF90aHJlZWJvdC90cmVlL2RldmVsb3BtZW50L1RocmVlQm90UGFja2FnZXMvdGhyZWVmb2xkL3dpa2lzXCJcbn1cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVGhyZWVmb2xkV2lraSBleHRlbmRzIEV4dGVybmFsVmlldyB7XG4gICAgY29uc3RydWN0b3IoYXBwLCBuYW1lKSB7XG4gICAgICAgIHN1cGVyKGFwcCwgbmFtZSwgVEhSRUVGT0xEX1VSTCwgUkVRVUlSRURfUEFDS0FHRVMpO1xuICAgIH1cbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NvdXJjZXMvdmlld3MvdGZ3aWtpcy90aHJlZWZvbGQuanMiLCJpbXBvcnQgeyBFeHRlcm5hbFZpZXcgfSBmcm9tIFwiLi4vZXh0ZXJuYWxcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgV2lraUV4dGVybmFsVmlldyBleHRlbmRzIEV4dGVybmFsVmlldyB7XG4gICAgY29uc3RydWN0b3IoYXBwLCBuYW1lKSB7XG4gICAgICAgIHN1cGVyKGFwcCwgbmFtZSk7XG5cbiAgICB9XG5cbiAgICB1cmxDaGFuZ2UodmlldywgdXJsKSB7XG4gICAgICAgIGNvbnN0IHBhcmFtcyA9IHVybFswXS5wYXJhbXM7XG4gICAgICAgIGlmIChPYmplY3Qua2V5cyhwYXJhbXMpLmxlbmd0aCAhPT0gMSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy50YXJnZXRVcmwgPSBgL3dpa2kvJHtwYXJhbXMubmFtZX1gO1xuICAgICAgICBcbiAgICAgICAgdGhpcy5pbml0KHZpZXcpO1xuICAgIH1cbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NvdXJjZXMvdmlld3Mvd2lraXMvdmlldy5qcyIsImltcG9ydCBcIi4vc3R5bGVzL2FwcC5jc3NcIjtcbmltcG9ydCB7SmV0QXBwfSBmcm9tIFwid2ViaXgtamV0XCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEludmVudG9yeUFwcCBleHRlbmRzIEpldEFwcCB7XG5cdGNvbnN0cnVjdG9yKGNvbmZpZyl7XG5cdFx0c3VwZXIod2ViaXguZXh0ZW5kKHtcblx0XHRcdGlkOlx0XHRcdEFQUE5BTUUsXG5cdFx0XHR2ZXJzaW9uOlx0VkVSU0lPTixcblx0XHRcdHN0YXJ0Olx0XHRcIi9tYWluL2Rhc2hcIixcblx0XHRcdGRlYnVnOlx0XHQhUFJPRFVDVElPTlxuXHRcdH0sIGNvbmZpZywgdHJ1ZSkpO1xuXG5cdFx0LyogZXJyb3IgdHJhY2tpbmcgKi9cblx0XHR0aGlzLmF0dGFjaEV2ZW50KFwiYXBwOmVycm9yOnJlc29sdmVcIiwgZnVuY3Rpb24obmFtZSwgZXJyb3Ipe1xuXHRcdFx0d2luZG93LmNvbnNvbGUuZXJyb3IoZXJyb3IpO1xuXHRcdH0pO1xuXHR9XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zb3VyY2VzL2FwcC5qcyIsIi8vIHJlbW92ZWQgYnkgZXh0cmFjdC10ZXh0LXdlYnBhY2stcGx1Z2luXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9zb3VyY2VzL3N0eWxlcy9hcHAuY3NzXG4vLyBtb2R1bGUgaWQgPSA1M1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJ2YXIgbWFwID0ge1xuXHRcIi4vYWxlcnRzXCI6IDcsXG5cdFwiLi9hbGVydHMvXCI6IDcsXG5cdFwiLi9hbGVydHMvYWxlcnRcIjogMjQsXG5cdFwiLi9hbGVydHMvYWxlcnQuanNcIjogMjQsXG5cdFwiLi9hbGVydHMvZGF0YVwiOiA0LFxuXHRcIi4vYWxlcnRzL2RhdGEuanNcIjogNCxcblx0XCIuL2FsZXJ0cy9pbmRleFwiOiA3LFxuXHRcIi4vYWxlcnRzL2luZGV4LmpzXCI6IDcsXG5cdFwiLi9jYXBhY2l0eVwiOiA5LFxuXHRcIi4vY2FwYWNpdHkvXCI6IDksXG5cdFwiLi9jYXBhY2l0eS9pbmRleFwiOiA5LFxuXHRcIi4vY2FwYWNpdHkvaW5kZXguanNcIjogOSxcblx0XCIuL2NpcmNsZXNcIjogMTAsXG5cdFwiLi9jaXJjbGVzL1wiOiAxMCxcblx0XCIuL2NpcmNsZXMvaW5kZXhcIjogMTAsXG5cdFwiLi9jaXJjbGVzL2luZGV4LmpzXCI6IDEwLFxuXHRcIi4vY2lyY2xlc3Rvcmllc1wiOiAxMSxcblx0XCIuL2NpcmNsZXN0b3JpZXMvXCI6IDExLFxuXHRcIi4vY2lyY2xlc3Rvcmllcy9pbmRleFwiOiAxMSxcblx0XCIuL2NpcmNsZXN0b3JpZXMvaW5kZXguanNcIjogMTEsXG5cdFwiLi9jaXJjbGV0YXNrc1wiOiAxMixcblx0XCIuL2NpcmNsZXRhc2tzL1wiOiAxMixcblx0XCIuL2NpcmNsZXRhc2tzL2luZGV4XCI6IDEyLFxuXHRcIi4vY2lyY2xldGFza3MvaW5kZXguanNcIjogMTIsXG5cdFwiLi9jb2Rlc2VydmVyXCI6IDEzLFxuXHRcIi4vY29kZXNlcnZlci9cIjogMTMsXG5cdFwiLi9jb2Rlc2VydmVyL2luZGV4XCI6IDEzLFxuXHRcIi4vY29kZXNlcnZlci9pbmRleC5qc1wiOiAxMyxcblx0XCIuL2Rhc2hcIjogMTQsXG5cdFwiLi9kYXNoL1wiOiAxNCxcblx0XCIuL2Rhc2gvZGlza1NwYWNlXCI6IDM4LFxuXHRcIi4vZGFzaC9kaXNrU3BhY2UuanNcIjogMzgsXG5cdFwiLi9kYXNoL2hlYWx0aFwiOiAzOSxcblx0XCIuL2Rhc2gvaGVhbHRoLmpzXCI6IDM5LFxuXHRcIi4vZGFzaC9pbmRleFwiOiAxNCxcblx0XCIuL2Rhc2gvaW5kZXguanNcIjogMTQsXG5cdFwiLi9kYXNoL2pzeEluZm9cIjogNDAsXG5cdFwiLi9kYXNoL2pzeEluZm8uanNcIjogNDAsXG5cdFwiLi9kYXNoL3Byb2Nlc3Nlc1wiOiA0MSxcblx0XCIuL2Rhc2gvcHJvY2Vzc2VzLmpzXCI6IDQxLFxuXHRcIi4vZGFzaC9wcm9jZXNzZXNDaGlsZFZpZXdcIjogMjcsXG5cdFwiLi9kYXNoL3Byb2Nlc3Nlc0NoaWxkVmlldy5qc1wiOiAyNyxcblx0XCIuL2Rhc2gvcnVubmluZ1BvcnRzXCI6IDQyLFxuXHRcIi4vZGFzaC9ydW5uaW5nUG9ydHMuanNcIjogNDIsXG5cdFwiLi9kZXBsb3llZFNvbHV0aW9uc1wiOiAxNSxcblx0XCIuL2RlcGxveWVkU29sdXRpb25zL1wiOiAxNSxcblx0XCIuL2RlcGxveWVkU29sdXRpb25zL2luZGV4XCI6IDE1LFxuXHRcIi4vZGVwbG95ZWRTb2x1dGlvbnMvaW5kZXguanNcIjogMTUsXG5cdFwiLi9kZXBsb3llZFNvbHV0aW9ucy9yZXNlcnZhdGlvblwiOiAyOCxcblx0XCIuL2RlcGxveWVkU29sdXRpb25zL3Jlc2VydmF0aW9uLmpzXCI6IDI4LFxuXHRcIi4vZXJyb3JzL2RpYWxvZ1wiOiAzLFxuXHRcIi4vZXJyb3JzL2RpYWxvZy5qc1wiOiAzLFxuXHRcIi4vZXh0ZXJuYWxcIjogMSxcblx0XCIuL2V4dGVybmFsL1wiOiAxLFxuXHRcIi4vZXh0ZXJuYWwvaW5kZXhcIjogMSxcblx0XCIuL2V4dGVybmFsL2luZGV4LmpzXCI6IDEsXG5cdFwiLi9mYXJtbWFuYWdlbWVudFwiOiAxNixcblx0XCIuL2Zhcm1tYW5hZ2VtZW50L1wiOiAxNixcblx0XCIuL2Zhcm1tYW5hZ2VtZW50L2luZGV4XCI6IDE2LFxuXHRcIi4vZmFybW1hbmFnZW1lbnQvaW5kZXguanNcIjogMTYsXG5cdFwiLi9qdXB5dGVyXCI6IDE3LFxuXHRcIi4vanVweXRlci9cIjogMTcsXG5cdFwiLi9qdXB5dGVyL2luZGV4XCI6IDE3LFxuXHRcIi4vanVweXRlci9pbmRleC5qc1wiOiAxNyxcblx0XCIuL2xvZ3NcIjogMTgsXG5cdFwiLi9sb2dzL1wiOiAxOCxcblx0XCIuL2xvZ3MvYXBwTG9nc1wiOiAyOSxcblx0XCIuL2xvZ3MvYXBwTG9ncy5qc1wiOiAyOSxcblx0XCIuL2xvZ3MvaW5kZXhcIjogMTgsXG5cdFwiLi9sb2dzL2luZGV4LmpzXCI6IDE4LFxuXHRcIi4vbWFpblwiOiA0Myxcblx0XCIuL21haW4uanNcIjogNDMsXG5cdFwiLi9teWpvYnMvam9ic1wiOiA0NCxcblx0XCIuL215am9icy9qb2JzLmpzXCI6IDQ0LFxuXHRcIi4vbXlqb2JzL3dvcmtlcnNcIjogNDYsXG5cdFwiLi9teWpvYnMvd29ya2Vycy5qc1wiOiA0Nixcblx0XCIuL3BhY2thZ2VzXCI6IDE5LFxuXHRcIi4vcGFja2FnZXMvXCI6IDE5LFxuXHRcIi4vcGFja2FnZXMvaW5kZXhcIjogMTksXG5cdFwiLi9wYWNrYWdlcy9pbmRleC5qc1wiOiAxOSxcblx0XCIuL3Nka2V4YW1wbGVzXCI6IDIwLFxuXHRcIi4vc2RrZXhhbXBsZXMvXCI6IDIwLFxuXHRcIi4vc2RrZXhhbXBsZXMvaW5kZXhcIjogMjAsXG5cdFwiLi9zZGtleGFtcGxlcy9pbmRleC5qc1wiOiAyMCxcblx0XCIuL3NldHRpbmdzXCI6IDIxLFxuXHRcIi4vc2V0dGluZ3MvXCI6IDIxLFxuXHRcIi4vc2V0dGluZ3MvYWRtaW5zXCI6IDMwLFxuXHRcIi4vc2V0dGluZ3MvYWRtaW5zLmpzXCI6IDMwLFxuXHRcIi4vc2V0dGluZ3MvZ2VuZXJhbFwiOiAzMSxcblx0XCIuL3NldHRpbmdzL2dlbmVyYWwuanNcIjogMzEsXG5cdFwiLi9zZXR0aW5ncy9pbmRleFwiOiAyMSxcblx0XCIuL3NldHRpbmdzL2luZGV4LmpzXCI6IDIxLFxuXHRcIi4vc29sdXRpb25zL2NoYXRmbG93XCI6IDQ3LFxuXHRcIi4vc29sdXRpb25zL2NoYXRmbG93LmpzXCI6IDQ3LFxuXHRcIi4vdGZ3aWtpcy90ZmdyaWRzZGtcIjogNDgsXG5cdFwiLi90Zndpa2lzL3RmZ3JpZHNkay5qc1wiOiA0OCxcblx0XCIuL3Rmd2lraXMvdGhyZWVmb2xkXCI6IDQ5LFxuXHRcIi4vdGZ3aWtpcy90aHJlZWZvbGQuanNcIjogNDksXG5cdFwiLi93YWxsZXRzTWFuYWdlclwiOiAyMixcblx0XCIuL3dhbGxldHNNYW5hZ2VyL1wiOiAyMixcblx0XCIuL3dhbGxldHNNYW5hZ2VyL2ltcG9ydEZvcm1cIjogMzUsXG5cdFwiLi93YWxsZXRzTWFuYWdlci9pbXBvcnRGb3JtLmpzXCI6IDM1LFxuXHRcIi4vd2FsbGV0c01hbmFnZXIvaW5kZXhcIjogMjIsXG5cdFwiLi93YWxsZXRzTWFuYWdlci9pbmRleC5qc1wiOiAyMixcblx0XCIuL3dhbGxldHNNYW5hZ2VyL3dhbGxldERldGFpbHNcIjogMzQsXG5cdFwiLi93YWxsZXRzTWFuYWdlci93YWxsZXREZXRhaWxzLmpzXCI6IDM0LFxuXHRcIi4vd2FsbGV0c01hbmFnZXIvd2FsbGV0Rm9ybVwiOiAzMixcblx0XCIuL3dhbGxldHNNYW5hZ2VyL3dhbGxldEZvcm0uanNcIjogMzIsXG5cdFwiLi93aWtpc1wiOiAyMyxcblx0XCIuL3dpa2lzL1wiOiAyMyxcblx0XCIuL3dpa2lzL2luZGV4XCI6IDIzLFxuXHRcIi4vd2lraXMvaW5kZXguanNcIjogMjMsXG5cdFwiLi93aWtpcy92aWV3XCI6IDUwLFxuXHRcIi4vd2lraXMvdmlldy5qc1wiOiA1MFxufTtcbmZ1bmN0aW9uIHdlYnBhY2tDb250ZXh0KHJlcSkge1xuXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyh3ZWJwYWNrQ29udGV4dFJlc29sdmUocmVxKSk7XG59O1xuZnVuY3Rpb24gd2VicGFja0NvbnRleHRSZXNvbHZlKHJlcSkge1xuXHR2YXIgaWQgPSBtYXBbcmVxXTtcblx0aWYoIShpZCArIDEpKSAvLyBjaGVjayBmb3IgbnVtYmVyIG9yIHN0cmluZ1xuXHRcdHRocm93IG5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIgKyByZXEgKyBcIicuXCIpO1xuXHRyZXR1cm4gaWQ7XG59O1xud2VicGFja0NvbnRleHQua2V5cyA9IGZ1bmN0aW9uIHdlYnBhY2tDb250ZXh0S2V5cygpIHtcblx0cmV0dXJuIE9iamVjdC5rZXlzKG1hcCk7XG59O1xud2VicGFja0NvbnRleHQucmVzb2x2ZSA9IHdlYnBhY2tDb250ZXh0UmVzb2x2ZTtcbm1vZHVsZS5leHBvcnRzID0gd2VicGFja0NvbnRleHQ7XG53ZWJwYWNrQ29udGV4dC5pZCA9IDU0O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vc291cmNlcy92aWV3cyBeXFwuXFwvLiokXG4vLyBtb2R1bGUgaWQgPSA1NFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvKiAgYW5zaV91cC5qc1xuICogIGF1dGhvciA6IERydSBOZWxzb25cbiAqICBsaWNlbnNlIDogTUlUXG4gKiAgaHR0cDovL2dpdGh1Yi5jb20vZHJ1ZHJ1L2Fuc2lfdXBcbiAqL1xuKGZ1bmN0aW9uIChyb290LCBmYWN0b3J5KSB7XG4gICAgaWYgKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZCkge1xuICAgICAgICAvLyBBTUQuIFJlZ2lzdGVyIGFzIGFuIGFub255bW91cyBtb2R1bGUuXG4gICAgICAgIGRlZmluZShbJ2V4cG9ydHMnXSwgZmFjdG9yeSk7XG4gICAgfSBlbHNlIGlmICh0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIGV4cG9ydHMubm9kZU5hbWUgIT09ICdzdHJpbmcnKSB7XG4gICAgICAgIC8vIENvbW1vbkpTXG4gICAgICAgIGZhY3RvcnkoZXhwb3J0cyk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgLy8gQnJvd3NlciBnbG9iYWxzXG4gICAgICAgIHZhciBleHAgPSB7fTtcbiAgICAgICAgZmFjdG9yeShleHApO1xuICAgICAgICByb290LkFuc2lVcCA9IGV4cC5kZWZhdWx0O1xuICAgIH1cbn0odGhpcywgZnVuY3Rpb24gKGV4cG9ydHMpIHtcblwidXNlIHN0cmljdFwiO1xudmFyIF9fbWFrZVRlbXBsYXRlT2JqZWN0ID0gKHRoaXMgJiYgdGhpcy5fX21ha2VUZW1wbGF0ZU9iamVjdCkgfHwgZnVuY3Rpb24gKGNvb2tlZCwgcmF3KSB7XG4gICAgaWYgKE9iamVjdC5kZWZpbmVQcm9wZXJ0eSkgeyBPYmplY3QuZGVmaW5lUHJvcGVydHkoY29va2VkLCBcInJhd1wiLCB7IHZhbHVlOiByYXcgfSk7IH0gZWxzZSB7IGNvb2tlZC5yYXcgPSByYXc7IH1cbiAgICByZXR1cm4gY29va2VkO1xufTtcbnZhciBQYWNrZXRLaW5kO1xuKGZ1bmN0aW9uIChQYWNrZXRLaW5kKSB7XG4gICAgUGFja2V0S2luZFtQYWNrZXRLaW5kW1wiRU9TXCJdID0gMF0gPSBcIkVPU1wiO1xuICAgIFBhY2tldEtpbmRbUGFja2V0S2luZFtcIlRleHRcIl0gPSAxXSA9IFwiVGV4dFwiO1xuICAgIFBhY2tldEtpbmRbUGFja2V0S2luZFtcIkluY29tcGxldGVcIl0gPSAyXSA9IFwiSW5jb21wbGV0ZVwiO1xuICAgIFBhY2tldEtpbmRbUGFja2V0S2luZFtcIkVTQ1wiXSA9IDNdID0gXCJFU0NcIjtcbiAgICBQYWNrZXRLaW5kW1BhY2tldEtpbmRbXCJVbmtub3duXCJdID0gNF0gPSBcIlVua25vd25cIjtcbiAgICBQYWNrZXRLaW5kW1BhY2tldEtpbmRbXCJTR1JcIl0gPSA1XSA9IFwiU0dSXCI7XG4gICAgUGFja2V0S2luZFtQYWNrZXRLaW5kW1wiT1NDVVJMXCJdID0gNl0gPSBcIk9TQ1VSTFwiO1xufSkoUGFja2V0S2luZCB8fCAoUGFja2V0S2luZCA9IHt9KSk7XG52YXIgQW5zaVVwID0gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBBbnNpVXAoKSB7XG4gICAgICAgIHRoaXMuVkVSU0lPTiA9IFwiNC4wLjRcIjtcbiAgICAgICAgdGhpcy5zZXR1cF9wYWxldHRlcygpO1xuICAgICAgICB0aGlzLl91c2VfY2xhc3NlcyA9IGZhbHNlO1xuICAgICAgICB0aGlzLl9lc2NhcGVfZm9yX2h0bWwgPSB0cnVlO1xuICAgICAgICB0aGlzLmJvbGQgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5mZyA9IHRoaXMuYmcgPSBudWxsO1xuICAgICAgICB0aGlzLl9idWZmZXIgPSAnJztcbiAgICAgICAgdGhpcy5fdXJsX3doaXRlbGlzdCA9IHsgJ2h0dHAnOiAxLCAnaHR0cHMnOiAxIH07XG4gICAgfVxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShBbnNpVXAucHJvdG90eXBlLCBcInVzZV9jbGFzc2VzXCIsIHtcbiAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fdXNlX2NsYXNzZXM7XG4gICAgICAgIH0sXG4gICAgICAgIHNldDogZnVuY3Rpb24gKGFyZykge1xuICAgICAgICAgICAgdGhpcy5fdXNlX2NsYXNzZXMgPSBhcmc7XG4gICAgICAgIH0sXG4gICAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxuICAgIH0pO1xuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShBbnNpVXAucHJvdG90eXBlLCBcImVzY2FwZV9mb3JfaHRtbFwiLCB7XG4gICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2VzY2FwZV9mb3JfaHRtbDtcbiAgICAgICAgfSxcbiAgICAgICAgc2V0OiBmdW5jdGlvbiAoYXJnKSB7XG4gICAgICAgICAgICB0aGlzLl9lc2NhcGVfZm9yX2h0bWwgPSBhcmc7XG4gICAgICAgIH0sXG4gICAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxuICAgIH0pO1xuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShBbnNpVXAucHJvdG90eXBlLCBcInVybF93aGl0ZWxpc3RcIiwge1xuICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl91cmxfd2hpdGVsaXN0O1xuICAgICAgICB9LFxuICAgICAgICBzZXQ6IGZ1bmN0aW9uIChhcmcpIHtcbiAgICAgICAgICAgIHRoaXMuX3VybF93aGl0ZWxpc3QgPSBhcmc7XG4gICAgICAgIH0sXG4gICAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxuICAgIH0pO1xuICAgIEFuc2lVcC5wcm90b3R5cGUuc2V0dXBfcGFsZXR0ZXMgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgICAgIHRoaXMuYW5zaV9jb2xvcnMgPVxuICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgICAgICAgeyByZ2I6IFswLCAwLCAwXSwgY2xhc3NfbmFtZTogXCJhbnNpLWJsYWNrXCIgfSxcbiAgICAgICAgICAgICAgICAgICAgeyByZ2I6IFsxODcsIDAsIDBdLCBjbGFzc19uYW1lOiBcImFuc2ktcmVkXCIgfSxcbiAgICAgICAgICAgICAgICAgICAgeyByZ2I6IFswLCAxODcsIDBdLCBjbGFzc19uYW1lOiBcImFuc2ktZ3JlZW5cIiB9LFxuICAgICAgICAgICAgICAgICAgICB7IHJnYjogWzE4NywgMTg3LCAwXSwgY2xhc3NfbmFtZTogXCJhbnNpLXllbGxvd1wiIH0sXG4gICAgICAgICAgICAgICAgICAgIHsgcmdiOiBbMCwgMCwgMTg3XSwgY2xhc3NfbmFtZTogXCJhbnNpLWJsdWVcIiB9LFxuICAgICAgICAgICAgICAgICAgICB7IHJnYjogWzE4NywgMCwgMTg3XSwgY2xhc3NfbmFtZTogXCJhbnNpLW1hZ2VudGFcIiB9LFxuICAgICAgICAgICAgICAgICAgICB7IHJnYjogWzAsIDE4NywgMTg3XSwgY2xhc3NfbmFtZTogXCJhbnNpLWN5YW5cIiB9LFxuICAgICAgICAgICAgICAgICAgICB7IHJnYjogWzI1NSwgMjU1LCAyNTVdLCBjbGFzc19uYW1lOiBcImFuc2ktd2hpdGVcIiB9XG4gICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgICAgIHsgcmdiOiBbODUsIDg1LCA4NV0sIGNsYXNzX25hbWU6IFwiYW5zaS1icmlnaHQtYmxhY2tcIiB9LFxuICAgICAgICAgICAgICAgICAgICB7IHJnYjogWzI1NSwgODUsIDg1XSwgY2xhc3NfbmFtZTogXCJhbnNpLWJyaWdodC1yZWRcIiB9LFxuICAgICAgICAgICAgICAgICAgICB7IHJnYjogWzAsIDI1NSwgMF0sIGNsYXNzX25hbWU6IFwiYW5zaS1icmlnaHQtZ3JlZW5cIiB9LFxuICAgICAgICAgICAgICAgICAgICB7IHJnYjogWzI1NSwgMjU1LCA4NV0sIGNsYXNzX25hbWU6IFwiYW5zaS1icmlnaHQteWVsbG93XCIgfSxcbiAgICAgICAgICAgICAgICAgICAgeyByZ2I6IFs4NSwgODUsIDI1NV0sIGNsYXNzX25hbWU6IFwiYW5zaS1icmlnaHQtYmx1ZVwiIH0sXG4gICAgICAgICAgICAgICAgICAgIHsgcmdiOiBbMjU1LCA4NSwgMjU1XSwgY2xhc3NfbmFtZTogXCJhbnNpLWJyaWdodC1tYWdlbnRhXCIgfSxcbiAgICAgICAgICAgICAgICAgICAgeyByZ2I6IFs4NSwgMjU1LCAyNTVdLCBjbGFzc19uYW1lOiBcImFuc2ktYnJpZ2h0LWN5YW5cIiB9LFxuICAgICAgICAgICAgICAgICAgICB7IHJnYjogWzI1NSwgMjU1LCAyNTVdLCBjbGFzc19uYW1lOiBcImFuc2ktYnJpZ2h0LXdoaXRlXCIgfVxuICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgIF07XG4gICAgICAgIHRoaXMucGFsZXR0ZV8yNTYgPSBbXTtcbiAgICAgICAgdGhpcy5hbnNpX2NvbG9ycy5mb3JFYWNoKGZ1bmN0aW9uIChwYWxldHRlKSB7XG4gICAgICAgICAgICBwYWxldHRlLmZvckVhY2goZnVuY3Rpb24gKHJlYykge1xuICAgICAgICAgICAgICAgIF90aGlzLnBhbGV0dGVfMjU2LnB1c2gocmVjKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICAgICAgdmFyIGxldmVscyA9IFswLCA5NSwgMTM1LCAxNzUsIDIxNSwgMjU1XTtcbiAgICAgICAgZm9yICh2YXIgciA9IDA7IHIgPCA2OyArK3IpIHtcbiAgICAgICAgICAgIGZvciAodmFyIGcgPSAwOyBnIDwgNjsgKytnKSB7XG4gICAgICAgICAgICAgICAgZm9yICh2YXIgYiA9IDA7IGIgPCA2OyArK2IpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGNvbCA9IHsgcmdiOiBbbGV2ZWxzW3JdLCBsZXZlbHNbZ10sIGxldmVsc1tiXV0sIGNsYXNzX25hbWU6ICd0cnVlY29sb3InIH07XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucGFsZXR0ZV8yNTYucHVzaChjb2wpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICB2YXIgZ3JleV9sZXZlbCA9IDg7XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgMjQ7ICsraSwgZ3JleV9sZXZlbCArPSAxMCkge1xuICAgICAgICAgICAgdmFyIGdyeSA9IHsgcmdiOiBbZ3JleV9sZXZlbCwgZ3JleV9sZXZlbCwgZ3JleV9sZXZlbF0sIGNsYXNzX25hbWU6ICd0cnVlY29sb3InIH07XG4gICAgICAgICAgICB0aGlzLnBhbGV0dGVfMjU2LnB1c2goZ3J5KTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgQW5zaVVwLnByb3RvdHlwZS5lc2NhcGVfdHh0X2Zvcl9odG1sID0gZnVuY3Rpb24gKHR4dCkge1xuICAgICAgICByZXR1cm4gdHh0LnJlcGxhY2UoL1smPD5dL2dtLCBmdW5jdGlvbiAoc3RyKSB7XG4gICAgICAgICAgICBpZiAoc3RyID09PSBcIiZcIilcbiAgICAgICAgICAgICAgICByZXR1cm4gXCImYW1wO1wiO1xuICAgICAgICAgICAgaWYgKHN0ciA9PT0gXCI8XCIpXG4gICAgICAgICAgICAgICAgcmV0dXJuIFwiJmx0O1wiO1xuICAgICAgICAgICAgaWYgKHN0ciA9PT0gXCI+XCIpXG4gICAgICAgICAgICAgICAgcmV0dXJuIFwiJmd0O1wiO1xuICAgICAgICB9KTtcbiAgICB9O1xuICAgIEFuc2lVcC5wcm90b3R5cGUuYXBwZW5kX2J1ZmZlciA9IGZ1bmN0aW9uICh0eHQpIHtcbiAgICAgICAgdmFyIHN0ciA9IHRoaXMuX2J1ZmZlciArIHR4dDtcbiAgICAgICAgdGhpcy5fYnVmZmVyID0gc3RyO1xuICAgIH07XG4gICAgQW5zaVVwLnByb3RvdHlwZS5nZXRfbmV4dF9wYWNrZXQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBwa3QgPSB7XG4gICAgICAgICAgICBraW5kOiBQYWNrZXRLaW5kLkVPUyxcbiAgICAgICAgICAgIHRleHQ6ICcnLFxuICAgICAgICAgICAgdXJsOiAnJ1xuICAgICAgICB9O1xuICAgICAgICB2YXIgbGVuID0gdGhpcy5fYnVmZmVyLmxlbmd0aDtcbiAgICAgICAgaWYgKGxlbiA9PSAwKVxuICAgICAgICAgICAgcmV0dXJuIHBrdDtcbiAgICAgICAgdmFyIHBvcyA9IHRoaXMuX2J1ZmZlci5pbmRleE9mKFwiXFx4MUJcIik7XG4gICAgICAgIGlmIChwb3MgPT0gLTEpIHtcbiAgICAgICAgICAgIHBrdC5raW5kID0gUGFja2V0S2luZC5UZXh0O1xuICAgICAgICAgICAgcGt0LnRleHQgPSB0aGlzLl9idWZmZXI7XG4gICAgICAgICAgICB0aGlzLl9idWZmZXIgPSAnJztcbiAgICAgICAgICAgIHJldHVybiBwa3Q7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHBvcyA+IDApIHtcbiAgICAgICAgICAgIHBrdC5raW5kID0gUGFja2V0S2luZC5UZXh0O1xuICAgICAgICAgICAgcGt0LnRleHQgPSB0aGlzLl9idWZmZXIuc2xpY2UoMCwgcG9zKTtcbiAgICAgICAgICAgIHRoaXMuX2J1ZmZlciA9IHRoaXMuX2J1ZmZlci5zbGljZShwb3MpO1xuICAgICAgICAgICAgcmV0dXJuIHBrdDtcbiAgICAgICAgfVxuICAgICAgICBpZiAocG9zID09IDApIHtcbiAgICAgICAgICAgIGlmIChsZW4gPT0gMSkge1xuICAgICAgICAgICAgICAgIHBrdC5raW5kID0gUGFja2V0S2luZC5JbmNvbXBsZXRlO1xuICAgICAgICAgICAgICAgIHJldHVybiBwa3Q7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB2YXIgbmV4dF9jaGFyID0gdGhpcy5fYnVmZmVyLmNoYXJBdCgxKTtcbiAgICAgICAgICAgIGlmICgobmV4dF9jaGFyICE9ICdbJykgJiYgKG5leHRfY2hhciAhPSAnXScpKSB7XG4gICAgICAgICAgICAgICAgcGt0LmtpbmQgPSBQYWNrZXRLaW5kLkVTQztcbiAgICAgICAgICAgICAgICBwa3QudGV4dCA9IHRoaXMuX2J1ZmZlci5zbGljZSgwLCAxKTtcbiAgICAgICAgICAgICAgICB0aGlzLl9idWZmZXIgPSB0aGlzLl9idWZmZXIuc2xpY2UoMSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHBrdDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChuZXh0X2NoYXIgPT0gJ1snKSB7XG4gICAgICAgICAgICAgICAgaWYgKCF0aGlzLl9jc2lfcmVnZXgpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fY3NpX3JlZ2V4ID0gcmd4KF9fbWFrZVRlbXBsYXRlT2JqZWN0KFtcIlxcbiAgICAgICAgICAgICAgICAgICAgICAgIF4gICAgICAgICAgICAgICAgICAgICAgICAgICAjIGJlZ2lubmluZyBvZiBsaW5lXFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICNcXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIyBGaXJzdCBhdHRlbXB0XFxuICAgICAgICAgICAgICAgICAgICAgICAgKD86ICAgICAgICAgICAgICAgICAgICAgICAgICMgbGVnYWwgc2VxdWVuY2VcXG4gICAgICAgICAgICAgICAgICAgICAgICAgIFxcdTAwMUJbICAgICAgICAgICAgICAgICAgICAgICMgQ1NJXFxuICAgICAgICAgICAgICAgICAgICAgICAgICAoWzwtP10/KSAgICAgICAgICAgICAgIyBwcml2YXRlLW1vZGUgY2hhclxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgKFtkO10qKSAgICAgICAgICAgICAgICAgICAgIyBhbnkgZGlnaXRzIG9yIHNlbWljb2xvbnNcXG4gICAgICAgICAgICAgICAgICAgICAgICAgIChbIC0vXT8gICAgICAgICAgICAgICAjIGFuIGludGVybWVkaWF0ZSBtb2RpZmllclxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgW0Atfl0pICAgICAgICAgICAgICAgICMgdGhlIGNvbW1hbmRcXG4gICAgICAgICAgICAgICAgICAgICAgICApXFxuICAgICAgICAgICAgICAgICAgICAgICAgfCAgICAgICAgICAgICAgICAgICAgICAgICAgICMgYWx0ZXJuYXRlIChzZWNvbmQgYXR0ZW1wdClcXG4gICAgICAgICAgICAgICAgICAgICAgICAoPzogICAgICAgICAgICAgICAgICAgICAgICAgIyBpbGxlZ2FsIHNlcXVlbmNlXFxuICAgICAgICAgICAgICAgICAgICAgICAgICBcXHUwMDFCWyAgICAgICAgICAgICAgICAgICAgICAjIENTSVxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgWyAtfl0qICAgICAgICAgICAgICAgICMgYW55dGhpbmcgbGVnYWxcXG4gICAgICAgICAgICAgICAgICAgICAgICAgIChbXFwwLVxcdTAwMUY6XSkgICAgICAgICAgICAgICMgYW55dGhpbmcgaWxsZWdhbFxcbiAgICAgICAgICAgICAgICAgICAgICAgIClcXG4gICAgICAgICAgICAgICAgICAgIFwiXSwgW1wiXFxuICAgICAgICAgICAgICAgICAgICAgICAgXiAgICAgICAgICAgICAgICAgICAgICAgICAgICMgYmVnaW5uaW5nIG9mIGxpbmVcXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgI1xcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAjIEZpcnN0IGF0dGVtcHRcXG4gICAgICAgICAgICAgICAgICAgICAgICAoPzogICAgICAgICAgICAgICAgICAgICAgICAgIyBsZWdhbCBzZXF1ZW5jZVxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgXFxcXHgxYlxcXFxbICAgICAgICAgICAgICAgICAgICAgICMgQ1NJXFxuICAgICAgICAgICAgICAgICAgICAgICAgICAoW1xcXFx4M2MtXFxcXHgzZl0/KSAgICAgICAgICAgICAgIyBwcml2YXRlLW1vZGUgY2hhclxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgKFtcXFxcZDtdKikgICAgICAgICAgICAgICAgICAgICMgYW55IGRpZ2l0cyBvciBzZW1pY29sb25zXFxuICAgICAgICAgICAgICAgICAgICAgICAgICAoW1xcXFx4MjAtXFxcXHgyZl0/ICAgICAgICAgICAgICAgIyBhbiBpbnRlcm1lZGlhdGUgbW9kaWZpZXJcXG4gICAgICAgICAgICAgICAgICAgICAgICAgIFtcXFxceDQwLVxcXFx4N2VdKSAgICAgICAgICAgICAgICAjIHRoZSBjb21tYW5kXFxuICAgICAgICAgICAgICAgICAgICAgICAgKVxcbiAgICAgICAgICAgICAgICAgICAgICAgIHwgICAgICAgICAgICAgICAgICAgICAgICAgICAjIGFsdGVybmF0ZSAoc2Vjb25kIGF0dGVtcHQpXFxuICAgICAgICAgICAgICAgICAgICAgICAgKD86ICAgICAgICAgICAgICAgICAgICAgICAgICMgaWxsZWdhbCBzZXF1ZW5jZVxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgXFxcXHgxYlxcXFxbICAgICAgICAgICAgICAgICAgICAgICMgQ1NJXFxuICAgICAgICAgICAgICAgICAgICAgICAgICBbXFxcXHgyMC1cXFxceDdlXSogICAgICAgICAgICAgICAgIyBhbnl0aGluZyBsZWdhbFxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgKFtcXFxceDAwLVxcXFx4MWY6XSkgICAgICAgICAgICAgICMgYW55dGhpbmcgaWxsZWdhbFxcbiAgICAgICAgICAgICAgICAgICAgICAgIClcXG4gICAgICAgICAgICAgICAgICAgIFwiXSkpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB2YXIgbWF0Y2ggPSB0aGlzLl9idWZmZXIubWF0Y2godGhpcy5fY3NpX3JlZ2V4KTtcbiAgICAgICAgICAgICAgICBpZiAobWF0Y2ggPT09IG51bGwpIHtcbiAgICAgICAgICAgICAgICAgICAgcGt0LmtpbmQgPSBQYWNrZXRLaW5kLkluY29tcGxldGU7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBwa3Q7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmIChtYXRjaFs0XSkge1xuICAgICAgICAgICAgICAgICAgICBwa3Qua2luZCA9IFBhY2tldEtpbmQuRVNDO1xuICAgICAgICAgICAgICAgICAgICBwa3QudGV4dCA9IHRoaXMuX2J1ZmZlci5zbGljZSgwLCAxKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fYnVmZmVyID0gdGhpcy5fYnVmZmVyLnNsaWNlKDEpO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcGt0O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAoKG1hdGNoWzFdICE9ICcnKSB8fCAobWF0Y2hbM10gIT0gJ20nKSlcbiAgICAgICAgICAgICAgICAgICAgcGt0LmtpbmQgPSBQYWNrZXRLaW5kLlVua25vd247XG4gICAgICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgICAgICBwa3Qua2luZCA9IFBhY2tldEtpbmQuU0dSO1xuICAgICAgICAgICAgICAgIHBrdC50ZXh0ID0gbWF0Y2hbMl07XG4gICAgICAgICAgICAgICAgdmFyIHJwb3MgPSBtYXRjaFswXS5sZW5ndGg7XG4gICAgICAgICAgICAgICAgdGhpcy5fYnVmZmVyID0gdGhpcy5fYnVmZmVyLnNsaWNlKHJwb3MpO1xuICAgICAgICAgICAgICAgIHJldHVybiBwa3Q7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAobmV4dF9jaGFyID09ICddJykge1xuICAgICAgICAgICAgICAgIGlmIChsZW4gPCA0KSB7XG4gICAgICAgICAgICAgICAgICAgIHBrdC5raW5kID0gUGFja2V0S2luZC5JbmNvbXBsZXRlO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcGt0O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAoKHRoaXMuX2J1ZmZlci5jaGFyQXQoMikgIT0gJzgnKVxuICAgICAgICAgICAgICAgICAgICB8fCAodGhpcy5fYnVmZmVyLmNoYXJBdCgzKSAhPSAnOycpKSB7XG4gICAgICAgICAgICAgICAgICAgIHBrdC5raW5kID0gUGFja2V0S2luZC5FU0M7XG4gICAgICAgICAgICAgICAgICAgIHBrdC50ZXh0ID0gdGhpcy5fYnVmZmVyLnNsaWNlKDAsIDEpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9idWZmZXIgPSB0aGlzLl9idWZmZXIuc2xpY2UoMSk7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBwa3Q7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmICghdGhpcy5fb3NjX3N0KSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX29zY19zdCA9IHJneEcoX19tYWtlVGVtcGxhdGVPYmplY3QoW1wiXFxuICAgICAgICAgICAgICAgICAgICAgICAgKD86ICAgICAgICAgICAgICAgICAgICAgICAgICMgbGVnYWwgc2VxdWVuY2VcXG4gICAgICAgICAgICAgICAgICAgICAgICAgIChcXHUwMDFCXFxcXCkgICAgICAgICAgICAgICAgICAgICMgRVNDICAgICAgICAgICAgICAgICAgICAgICAgICAgfCAgICAgICAgICAgICAgICAgICAgICAgICAgICMgYWx0ZXJuYXRlXFxuICAgICAgICAgICAgICAgICAgICAgICAgICAoXFx1MDAwNykgICAgICAgICAgICAgICAgICAgICAgIyBCRUwgKHdoYXQgeHRlcm0gZGlkKVxcbiAgICAgICAgICAgICAgICAgICAgICAgIClcXG4gICAgICAgICAgICAgICAgICAgICAgICB8ICAgICAgICAgICAgICAgICAgICAgICAgICAgIyBhbHRlcm5hdGUgKHNlY29uZCBhdHRlbXB0KVxcbiAgICAgICAgICAgICAgICAgICAgICAgICggICAgICAgICAgICAgICAgICAgICAgICAgICAjIGlsbGVnYWwgc2VxdWVuY2VcXG4gICAgICAgICAgICAgICAgICAgICAgICAgIFtcXDAtXFx1MDAwNl0gICAgICAgICAgICAgICAgICMgYW55dGhpbmcgaWxsZWdhbFxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgfCAgICAgICAgICAgICAgICAgICAgICAgICAgICMgYWx0ZXJuYXRlXFxuICAgICAgICAgICAgICAgICAgICAgICAgICBbXFxiLVxcdTAwMUFdICAgICAgICAgICAgICAgICAjIGFueXRoaW5nIGlsbGVnYWxcXG4gICAgICAgICAgICAgICAgICAgICAgICAgIHwgICAgICAgICAgICAgICAgICAgICAgICAgICAjIGFsdGVybmF0ZVxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgW1xcdTAwMUMtXFx1MDAxRl0gICAgICAgICAgICAgICAgICMgYW55dGhpbmcgaWxsZWdhbFxcbiAgICAgICAgICAgICAgICAgICAgICAgIClcXG4gICAgICAgICAgICAgICAgICAgIFwiXSwgW1wiXFxuICAgICAgICAgICAgICAgICAgICAgICAgKD86ICAgICAgICAgICAgICAgICAgICAgICAgICMgbGVnYWwgc2VxdWVuY2VcXG4gICAgICAgICAgICAgICAgICAgICAgICAgIChcXFxceDFiXFxcXFxcXFwpICAgICAgICAgICAgICAgICAgICAjIEVTQyBcXFxcXFxuICAgICAgICAgICAgICAgICAgICAgICAgICB8ICAgICAgICAgICAgICAgICAgICAgICAgICAgIyBhbHRlcm5hdGVcXG4gICAgICAgICAgICAgICAgICAgICAgICAgIChcXFxceDA3KSAgICAgICAgICAgICAgICAgICAgICAjIEJFTCAod2hhdCB4dGVybSBkaWQpXFxuICAgICAgICAgICAgICAgICAgICAgICAgKVxcbiAgICAgICAgICAgICAgICAgICAgICAgIHwgICAgICAgICAgICAgICAgICAgICAgICAgICAjIGFsdGVybmF0ZSAoc2Vjb25kIGF0dGVtcHQpXFxuICAgICAgICAgICAgICAgICAgICAgICAgKCAgICAgICAgICAgICAgICAgICAgICAgICAgICMgaWxsZWdhbCBzZXF1ZW5jZVxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgW1xcXFx4MDAtXFxcXHgwNl0gICAgICAgICAgICAgICAgICMgYW55dGhpbmcgaWxsZWdhbFxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgfCAgICAgICAgICAgICAgICAgICAgICAgICAgICMgYWx0ZXJuYXRlXFxuICAgICAgICAgICAgICAgICAgICAgICAgICBbXFxcXHgwOC1cXFxceDFhXSAgICAgICAgICAgICAgICAgIyBhbnl0aGluZyBpbGxlZ2FsXFxuICAgICAgICAgICAgICAgICAgICAgICAgICB8ICAgICAgICAgICAgICAgICAgICAgICAgICAgIyBhbHRlcm5hdGVcXG4gICAgICAgICAgICAgICAgICAgICAgICAgIFtcXFxceDFjLVxcXFx4MWZdICAgICAgICAgICAgICAgICAjIGFueXRoaW5nIGlsbGVnYWxcXG4gICAgICAgICAgICAgICAgICAgICAgICApXFxuICAgICAgICAgICAgICAgICAgICBcIl0pKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdGhpcy5fb3NjX3N0Lmxhc3RJbmRleCA9IDA7XG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICB2YXIgbWF0Y2hfMSA9IHRoaXMuX29zY19zdC5leGVjKHRoaXMuX2J1ZmZlcik7XG4gICAgICAgICAgICAgICAgICAgIGlmIChtYXRjaF8xID09PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBwa3Qua2luZCA9IFBhY2tldEtpbmQuSW5jb21wbGV0ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBwa3Q7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgaWYgKG1hdGNoXzFbM10pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHBrdC5raW5kID0gUGFja2V0S2luZC5FU0M7XG4gICAgICAgICAgICAgICAgICAgICAgICBwa3QudGV4dCA9IHRoaXMuX2J1ZmZlci5zbGljZSgwLCAxKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2J1ZmZlciA9IHRoaXMuX2J1ZmZlci5zbGljZSgxKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBwa3Q7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICB2YXIgbWF0Y2hfMiA9IHRoaXMuX29zY19zdC5leGVjKHRoaXMuX2J1ZmZlcik7XG4gICAgICAgICAgICAgICAgICAgIGlmIChtYXRjaF8yID09PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBwa3Qua2luZCA9IFBhY2tldEtpbmQuSW5jb21wbGV0ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBwa3Q7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgaWYgKG1hdGNoXzJbM10pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHBrdC5raW5kID0gUGFja2V0S2luZC5FU0M7XG4gICAgICAgICAgICAgICAgICAgICAgICBwa3QudGV4dCA9IHRoaXMuX2J1ZmZlci5zbGljZSgwLCAxKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2J1ZmZlciA9IHRoaXMuX2J1ZmZlci5zbGljZSgxKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBwa3Q7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKCF0aGlzLl9vc2NfcmVnZXgpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fb3NjX3JlZ2V4ID0gcmd4KF9fbWFrZVRlbXBsYXRlT2JqZWN0KFtcIlxcbiAgICAgICAgICAgICAgICAgICAgICAgIF4gICAgICAgICAgICAgICAgICAgICAgICAgICAjIGJlZ2lubmluZyBvZiBsaW5lXFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICNcXG4gICAgICAgICAgICAgICAgICAgICAgICBcXHUwMDFCXTg7ICAgICAgICAgICAgICAgICAgICAjIE9TQyBIeXBlcmxpbmtcXG4gICAgICAgICAgICAgICAgICAgICAgICBbIC06PC1+XSogICAgICAgIyBwYXJhbXMgKGV4Y2x1ZGluZyA7KVxcbiAgICAgICAgICAgICAgICAgICAgICAgIDsgICAgICAgICAgICAgICAgICAgICAgICAgICAjIGVuZCBvZiBwYXJhbXNcXG4gICAgICAgICAgICAgICAgICAgICAgICAoWyEtfl17MCw1MTJ9KSAgICAgICAgIyBVUkwgY2FwdHVyZVxcbiAgICAgICAgICAgICAgICAgICAgICAgICg/OiAgICAgICAgICAgICAgICAgICAgICAgICAjIFNUXFxuICAgICAgICAgICAgICAgICAgICAgICAgICAoPzpcXHUwMDFCXFxcXCkgICAgICAgICAgICAgICAgICAjIEVTQyAgICAgICAgICAgICAgICAgICAgICAgICAgIHwgICAgICAgICAgICAgICAgICAgICAgICAgICAjIGFsdGVybmF0ZVxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgKD86XFx1MDAwNykgICAgICAgICAgICAgICAgICAgICMgQkVMICh3aGF0IHh0ZXJtIGRpZClcXG4gICAgICAgICAgICAgICAgICAgICAgICApXFxuICAgICAgICAgICAgICAgICAgICAgICAgKFshLX5dKykgICAgICAgICAgICAgICMgVEVYVCBjYXB0dXJlXFxuICAgICAgICAgICAgICAgICAgICAgICAgXFx1MDAxQl04OzsgICAgICAgICAgICAgICAgICAgIyBPU0MgSHlwZXJsaW5rIEVuZFxcbiAgICAgICAgICAgICAgICAgICAgICAgICg/OiAgICAgICAgICAgICAgICAgICAgICAgICAjIFNUXFxuICAgICAgICAgICAgICAgICAgICAgICAgICAoPzpcXHUwMDFCXFxcXCkgICAgICAgICAgICAgICAgICAjIEVTQyAgICAgICAgICAgICAgICAgICAgICAgICAgIHwgICAgICAgICAgICAgICAgICAgICAgICAgICAjIGFsdGVybmF0ZVxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgKD86XFx1MDAwNykgICAgICAgICAgICAgICAgICAgICMgQkVMICh3aGF0IHh0ZXJtIGRpZClcXG4gICAgICAgICAgICAgICAgICAgICAgICApXFxuICAgICAgICAgICAgICAgICAgICBcIl0sIFtcIlxcbiAgICAgICAgICAgICAgICAgICAgICAgIF4gICAgICAgICAgICAgICAgICAgICAgICAgICAjIGJlZ2lubmluZyBvZiBsaW5lXFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICNcXG4gICAgICAgICAgICAgICAgICAgICAgICBcXFxceDFiXFxcXF04OyAgICAgICAgICAgICAgICAgICAgIyBPU0MgSHlwZXJsaW5rXFxuICAgICAgICAgICAgICAgICAgICAgICAgW1xcXFx4MjAtXFxcXHgzYVxcXFx4M2MtXFxcXHg3ZV0qICAgICAgICMgcGFyYW1zIChleGNsdWRpbmcgOylcXG4gICAgICAgICAgICAgICAgICAgICAgICA7ICAgICAgICAgICAgICAgICAgICAgICAgICAgIyBlbmQgb2YgcGFyYW1zXFxuICAgICAgICAgICAgICAgICAgICAgICAgKFtcXFxceDIxLVxcXFx4N2VdezAsNTEyfSkgICAgICAgICMgVVJMIGNhcHR1cmVcXG4gICAgICAgICAgICAgICAgICAgICAgICAoPzogICAgICAgICAgICAgICAgICAgICAgICAgIyBTVFxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgKD86XFxcXHgxYlxcXFxcXFxcKSAgICAgICAgICAgICAgICAgICMgRVNDIFxcXFxcXG4gICAgICAgICAgICAgICAgICAgICAgICAgIHwgICAgICAgICAgICAgICAgICAgICAgICAgICAjIGFsdGVybmF0ZVxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgKD86XFxcXHgwNykgICAgICAgICAgICAgICAgICAgICMgQkVMICh3aGF0IHh0ZXJtIGRpZClcXG4gICAgICAgICAgICAgICAgICAgICAgICApXFxuICAgICAgICAgICAgICAgICAgICAgICAgKFtcXFxceDIxLVxcXFx4N2VdKykgICAgICAgICAgICAgICMgVEVYVCBjYXB0dXJlXFxuICAgICAgICAgICAgICAgICAgICAgICAgXFxcXHgxYlxcXFxdODs7ICAgICAgICAgICAgICAgICAgICMgT1NDIEh5cGVybGluayBFbmRcXG4gICAgICAgICAgICAgICAgICAgICAgICAoPzogICAgICAgICAgICAgICAgICAgICAgICAgIyBTVFxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgKD86XFxcXHgxYlxcXFxcXFxcKSAgICAgICAgICAgICAgICAgICMgRVNDIFxcXFxcXG4gICAgICAgICAgICAgICAgICAgICAgICAgIHwgICAgICAgICAgICAgICAgICAgICAgICAgICAjIGFsdGVybmF0ZVxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgKD86XFxcXHgwNykgICAgICAgICAgICAgICAgICAgICMgQkVMICh3aGF0IHh0ZXJtIGRpZClcXG4gICAgICAgICAgICAgICAgICAgICAgICApXFxuICAgICAgICAgICAgICAgICAgICBcIl0pKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdmFyIG1hdGNoID0gdGhpcy5fYnVmZmVyLm1hdGNoKHRoaXMuX29zY19yZWdleCk7XG4gICAgICAgICAgICAgICAgaWYgKG1hdGNoID09PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgICAgIHBrdC5raW5kID0gUGFja2V0S2luZC5FU0M7XG4gICAgICAgICAgICAgICAgICAgIHBrdC50ZXh0ID0gdGhpcy5fYnVmZmVyLnNsaWNlKDAsIDEpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9idWZmZXIgPSB0aGlzLl9idWZmZXIuc2xpY2UoMSk7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBwa3Q7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHBrdC5raW5kID0gUGFja2V0S2luZC5PU0NVUkw7XG4gICAgICAgICAgICAgICAgcGt0LnVybCA9IG1hdGNoWzFdO1xuICAgICAgICAgICAgICAgIHBrdC50ZXh0ID0gbWF0Y2hbMl07XG4gICAgICAgICAgICAgICAgdmFyIHJwb3MgPSBtYXRjaFswXS5sZW5ndGg7XG4gICAgICAgICAgICAgICAgdGhpcy5fYnVmZmVyID0gdGhpcy5fYnVmZmVyLnNsaWNlKHJwb3MpO1xuICAgICAgICAgICAgICAgIHJldHVybiBwa3Q7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9O1xuICAgIEFuc2lVcC5wcm90b3R5cGUuYW5zaV90b19odG1sID0gZnVuY3Rpb24gKHR4dCkge1xuICAgICAgICB0aGlzLmFwcGVuZF9idWZmZXIodHh0KTtcbiAgICAgICAgdmFyIGJsb2NrcyA9IFtdO1xuICAgICAgICB3aGlsZSAodHJ1ZSkge1xuICAgICAgICAgICAgdmFyIHBhY2tldCA9IHRoaXMuZ2V0X25leHRfcGFja2V0KCk7XG4gICAgICAgICAgICBpZiAoKHBhY2tldC5raW5kID09IFBhY2tldEtpbmQuRU9TKVxuICAgICAgICAgICAgICAgIHx8IChwYWNrZXQua2luZCA9PSBQYWNrZXRLaW5kLkluY29tcGxldGUpKVxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgaWYgKChwYWNrZXQua2luZCA9PSBQYWNrZXRLaW5kLkVTQylcbiAgICAgICAgICAgICAgICB8fCAocGFja2V0LmtpbmQgPT0gUGFja2V0S2luZC5Vbmtub3duKSlcbiAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgIGlmIChwYWNrZXQua2luZCA9PSBQYWNrZXRLaW5kLlRleHQpXG4gICAgICAgICAgICAgICAgYmxvY2tzLnB1c2godGhpcy50cmFuc2Zvcm1fdG9faHRtbCh0aGlzLndpdGhfc3RhdGUocGFja2V0KSkpO1xuICAgICAgICAgICAgZWxzZSBpZiAocGFja2V0LmtpbmQgPT0gUGFja2V0S2luZC5TR1IpXG4gICAgICAgICAgICAgICAgdGhpcy5wcm9jZXNzX2Fuc2kocGFja2V0KTtcbiAgICAgICAgICAgIGVsc2UgaWYgKHBhY2tldC5raW5kID09IFBhY2tldEtpbmQuT1NDVVJMKVxuICAgICAgICAgICAgICAgIGJsb2Nrcy5wdXNoKHRoaXMucHJvY2Vzc19oeXBlcmxpbmsocGFja2V0KSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGJsb2Nrcy5qb2luKFwiXCIpO1xuICAgIH07XG4gICAgQW5zaVVwLnByb3RvdHlwZS53aXRoX3N0YXRlID0gZnVuY3Rpb24gKHBrdCkge1xuICAgICAgICByZXR1cm4geyBib2xkOiB0aGlzLmJvbGQsIGZnOiB0aGlzLmZnLCBiZzogdGhpcy5iZywgdGV4dDogcGt0LnRleHQgfTtcbiAgICB9O1xuICAgIEFuc2lVcC5wcm90b3R5cGUucHJvY2Vzc19hbnNpID0gZnVuY3Rpb24gKHBrdCkge1xuICAgICAgICB2YXIgc2dyX2NtZHMgPSBwa3QudGV4dC5zcGxpdCgnOycpO1xuICAgICAgICB3aGlsZSAoc2dyX2NtZHMubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgdmFyIHNncl9jbWRfc3RyID0gc2dyX2NtZHMuc2hpZnQoKTtcbiAgICAgICAgICAgIHZhciBudW0gPSBwYXJzZUludChzZ3JfY21kX3N0ciwgMTApO1xuICAgICAgICAgICAgaWYgKGlzTmFOKG51bSkgfHwgbnVtID09PSAwKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5mZyA9IHRoaXMuYmcgPSBudWxsO1xuICAgICAgICAgICAgICAgIHRoaXMuYm9sZCA9IGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAobnVtID09PSAxKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5ib2xkID0gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKG51bSA9PT0gMjIpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmJvbGQgPSBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKG51bSA9PT0gMzkpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmZnID0gbnVsbDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKG51bSA9PT0gNDkpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmJnID0gbnVsbDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKChudW0gPj0gMzApICYmIChudW0gPCAzOCkpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmZnID0gdGhpcy5hbnNpX2NvbG9yc1swXVsobnVtIC0gMzApXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKChudW0gPj0gNDApICYmIChudW0gPCA0OCkpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmJnID0gdGhpcy5hbnNpX2NvbG9yc1swXVsobnVtIC0gNDApXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKChudW0gPj0gOTApICYmIChudW0gPCA5OCkpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmZnID0gdGhpcy5hbnNpX2NvbG9yc1sxXVsobnVtIC0gOTApXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKChudW0gPj0gMTAwKSAmJiAobnVtIDwgMTA4KSkge1xuICAgICAgICAgICAgICAgIHRoaXMuYmcgPSB0aGlzLmFuc2lfY29sb3JzWzFdWyhudW0gLSAxMDApXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKG51bSA9PT0gMzggfHwgbnVtID09PSA0OCkge1xuICAgICAgICAgICAgICAgIGlmIChzZ3JfY21kcy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBpc19mb3JlZ3JvdW5kID0gKG51bSA9PT0gMzgpO1xuICAgICAgICAgICAgICAgICAgICB2YXIgbW9kZV9jbWQgPSBzZ3JfY21kcy5zaGlmdCgpO1xuICAgICAgICAgICAgICAgICAgICBpZiAobW9kZV9jbWQgPT09ICc1JyAmJiBzZ3JfY21kcy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgcGFsZXR0ZV9pbmRleCA9IHBhcnNlSW50KHNncl9jbWRzLnNoaWZ0KCksIDEwKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChwYWxldHRlX2luZGV4ID49IDAgJiYgcGFsZXR0ZV9pbmRleCA8PSAyNTUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoaXNfZm9yZWdyb3VuZClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5mZyA9IHRoaXMucGFsZXR0ZV8yNTZbcGFsZXR0ZV9pbmRleF07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmJnID0gdGhpcy5wYWxldHRlXzI1NltwYWxldHRlX2luZGV4XTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBpZiAobW9kZV9jbWQgPT09ICcyJyAmJiBzZ3JfY21kcy5sZW5ndGggPiAyKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgciA9IHBhcnNlSW50KHNncl9jbWRzLnNoaWZ0KCksIDEwKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBnID0gcGFyc2VJbnQoc2dyX2NtZHMuc2hpZnQoKSwgMTApO1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGIgPSBwYXJzZUludChzZ3JfY21kcy5zaGlmdCgpLCAxMCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoKHIgPj0gMCAmJiByIDw9IDI1NSkgJiYgKGcgPj0gMCAmJiBnIDw9IDI1NSkgJiYgKGIgPj0gMCAmJiBiIDw9IDI1NSkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgYyA9IHsgcmdiOiBbciwgZywgYl0sIGNsYXNzX25hbWU6ICd0cnVlY29sb3InIH07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGlzX2ZvcmVncm91bmQpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZmcgPSBjO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5iZyA9IGM7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9O1xuICAgIEFuc2lVcC5wcm90b3R5cGUudHJhbnNmb3JtX3RvX2h0bWwgPSBmdW5jdGlvbiAoZnJhZ21lbnQpIHtcbiAgICAgICAgdmFyIHR4dCA9IGZyYWdtZW50LnRleHQ7XG4gICAgICAgIGlmICh0eHQubGVuZ3RoID09PSAwKVxuICAgICAgICAgICAgcmV0dXJuIHR4dDtcbiAgICAgICAgaWYgKHRoaXMuX2VzY2FwZV9mb3JfaHRtbClcbiAgICAgICAgICAgIHR4dCA9IHRoaXMuZXNjYXBlX3R4dF9mb3JfaHRtbCh0eHQpO1xuICAgICAgICBpZiAoIWZyYWdtZW50LmJvbGQgJiYgZnJhZ21lbnQuZmcgPT09IG51bGwgJiYgZnJhZ21lbnQuYmcgPT09IG51bGwpXG4gICAgICAgICAgICByZXR1cm4gdHh0O1xuICAgICAgICB2YXIgc3R5bGVzID0gW107XG4gICAgICAgIHZhciBjbGFzc2VzID0gW107XG4gICAgICAgIHZhciBmZyA9IGZyYWdtZW50LmZnO1xuICAgICAgICB2YXIgYmcgPSBmcmFnbWVudC5iZztcbiAgICAgICAgaWYgKGZyYWdtZW50LmJvbGQpXG4gICAgICAgICAgICBzdHlsZXMucHVzaCgnZm9udC13ZWlnaHQ6Ym9sZCcpO1xuICAgICAgICBpZiAoIXRoaXMuX3VzZV9jbGFzc2VzKSB7XG4gICAgICAgICAgICBpZiAoZmcpXG4gICAgICAgICAgICAgICAgc3R5bGVzLnB1c2goXCJjb2xvcjpyZ2IoXCIgKyBmZy5yZ2Iuam9pbignLCcpICsgXCIpXCIpO1xuICAgICAgICAgICAgaWYgKGJnKVxuICAgICAgICAgICAgICAgIHN0eWxlcy5wdXNoKFwiYmFja2dyb3VuZC1jb2xvcjpyZ2IoXCIgKyBiZy5yZ2IgKyBcIilcIik7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBpZiAoZmcpIHtcbiAgICAgICAgICAgICAgICBpZiAoZmcuY2xhc3NfbmFtZSAhPT0gJ3RydWVjb2xvcicpIHtcbiAgICAgICAgICAgICAgICAgICAgY2xhc3Nlcy5wdXNoKGZnLmNsYXNzX25hbWUgKyBcIi1mZ1wiKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHN0eWxlcy5wdXNoKFwiY29sb3I6cmdiKFwiICsgZmcucmdiLmpvaW4oJywnKSArIFwiKVwiKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoYmcpIHtcbiAgICAgICAgICAgICAgICBpZiAoYmcuY2xhc3NfbmFtZSAhPT0gJ3RydWVjb2xvcicpIHtcbiAgICAgICAgICAgICAgICAgICAgY2xhc3Nlcy5wdXNoKGJnLmNsYXNzX25hbWUgKyBcIi1iZ1wiKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHN0eWxlcy5wdXNoKFwiYmFja2dyb3VuZC1jb2xvcjpyZ2IoXCIgKyBiZy5yZ2Iuam9pbignLCcpICsgXCIpXCIpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICB2YXIgY2xhc3Nfc3RyaW5nID0gJyc7XG4gICAgICAgIHZhciBzdHlsZV9zdHJpbmcgPSAnJztcbiAgICAgICAgaWYgKGNsYXNzZXMubGVuZ3RoKVxuICAgICAgICAgICAgY2xhc3Nfc3RyaW5nID0gXCIgY2xhc3M9XFxcIlwiICsgY2xhc3Nlcy5qb2luKCcgJykgKyBcIlxcXCJcIjtcbiAgICAgICAgaWYgKHN0eWxlcy5sZW5ndGgpXG4gICAgICAgICAgICBzdHlsZV9zdHJpbmcgPSBcIiBzdHlsZT1cXFwiXCIgKyBzdHlsZXMuam9pbignOycpICsgXCJcXFwiXCI7XG4gICAgICAgIHJldHVybiBcIjxzcGFuXCIgKyBzdHlsZV9zdHJpbmcgKyBjbGFzc19zdHJpbmcgKyBcIj5cIiArIHR4dCArIFwiPC9zcGFuPlwiO1xuICAgIH07XG4gICAgO1xuICAgIEFuc2lVcC5wcm90b3R5cGUucHJvY2Vzc19oeXBlcmxpbmsgPSBmdW5jdGlvbiAocGt0KSB7XG4gICAgICAgIHZhciBwYXJ0cyA9IHBrdC51cmwuc3BsaXQoJzonKTtcbiAgICAgICAgaWYgKHBhcnRzLmxlbmd0aCA8IDEpXG4gICAgICAgICAgICByZXR1cm4gJyc7XG4gICAgICAgIGlmICghdGhpcy5fdXJsX3doaXRlbGlzdFtwYXJ0c1swXV0pXG4gICAgICAgICAgICByZXR1cm4gJyc7XG4gICAgICAgIHZhciByZXN1bHQgPSBcIjxhIGhyZWY9XFxcIlwiICsgdGhpcy5lc2NhcGVfdHh0X2Zvcl9odG1sKHBrdC51cmwpICsgXCJcXFwiPlwiICsgdGhpcy5lc2NhcGVfdHh0X2Zvcl9odG1sKHBrdC50ZXh0KSArIFwiPC9hPlwiO1xuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH07XG4gICAgcmV0dXJuIEFuc2lVcDtcbn0oKSk7XG5mdW5jdGlvbiByZ3godG1wbE9iaikge1xuICAgIHZhciBzdWJzdCA9IFtdO1xuICAgIGZvciAodmFyIF9pID0gMTsgX2kgPCBhcmd1bWVudHMubGVuZ3RoOyBfaSsrKSB7XG4gICAgICAgIHN1YnN0W19pIC0gMV0gPSBhcmd1bWVudHNbX2ldO1xuICAgIH1cbiAgICB2YXIgcmVnZXhUZXh0ID0gdG1wbE9iai5yYXdbMF07XG4gICAgdmFyIHdzcmd4ID0gL15cXHMrfFxccytcXG58XFxzKiNbXFxzXFxTXSo/XFxufFxcbi9nbTtcbiAgICB2YXIgdHh0MiA9IHJlZ2V4VGV4dC5yZXBsYWNlKHdzcmd4LCAnJyk7XG4gICAgcmV0dXJuIG5ldyBSZWdFeHAodHh0Mik7XG59XG5mdW5jdGlvbiByZ3hHKHRtcGxPYmopIHtcbiAgICB2YXIgc3Vic3QgPSBbXTtcbiAgICBmb3IgKHZhciBfaSA9IDE7IF9pIDwgYXJndW1lbnRzLmxlbmd0aDsgX2krKykge1xuICAgICAgICBzdWJzdFtfaSAtIDFdID0gYXJndW1lbnRzW19pXTtcbiAgICB9XG4gICAgdmFyIHJlZ2V4VGV4dCA9IHRtcGxPYmoucmF3WzBdO1xuICAgIHZhciB3c3JneCA9IC9eXFxzK3xcXHMrXFxufFxccyojW1xcc1xcU10qP1xcbnxcXG4vZ207XG4gICAgdmFyIHR4dDIgPSByZWdleFRleHQucmVwbGFjZSh3c3JneCwgJycpO1xuICAgIHJldHVybiBuZXcgUmVnRXhwKHR4dDIsICdnJyk7XG59XG4vLyMgc291cmNlTWFwcGluZ1VSTD1hbnNpX3VwLmpzLm1hcFxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbiAgICBleHBvcnRzLmRlZmF1bHQgPSBBbnNpVXA7XG59KSk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9ub2RlX21vZHVsZXMvYW5zaV91cC9hbnNpX3VwLmpzIiwiaW1wb3J0IHsgU2VydmljZSB9IGZyb20gXCIuLi9jb21tb24vYXBpXCI7XG5cbmNvbnN0IEJBU0VfVVJMID0gXCIvemVyb2JvdC9hZG1pbi9hY3RvcnMvYWxlcnRhXCI7XG5cbmNsYXNzIEFsZXJ0c1NlcnZpY2UgZXh0ZW5kcyBTZXJ2aWNlIHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgc3VwZXIoQkFTRV9VUkwpO1xuICAgIH1cblxuICAgIGxpc3QoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmdldENhbGwoXCJsaXN0X2FsZXJ0c1wiKTtcbiAgICB9XG5cbiAgICBkZWxldGUoaWRlbnRpZmllcnMpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucG9zdENhbGwoXCJkZWxldGVfYWxlcnRzXCIsIHtcbiAgICAgICAgICAgIGlkZW50aWZpZXJzOiBpZGVudGlmaWVyc1xuICAgICAgICB9KTtcbiAgICB9XG59XG5cbmV4cG9ydCBjb25zdCBhbGVydHMgPSBuZXcgQWxlcnRzU2VydmljZSgpO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc291cmNlcy9zZXJ2aWNlcy9hbGVydHMuanMiLCJpbXBvcnQgeyBTZXJ2aWNlIH0gZnJvbSBcIi4uL2NvbW1vbi9hcGlcIjtcblxuY29uc3QgQkFTRV9VUkwgPSBcIi90ZmdyaWRfc29sdXRpb25zL3RmZ3JpZF9zb2x1dGlvbnMvYWN0b3JzL3RmZ3JpZF9zb2x1dGlvbnNcIjtcblxuXG5jbGFzcyBTb2x1dGlvbnNTZXJ2aWNlIGV4dGVuZHMgU2VydmljZSB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHN1cGVyKEJBU0VfVVJMKTtcbiAgICB9XG5cblxuICAgIGxpc3Qob3B0cykge1xuICAgICAgICBvcHRzID0gb3B0cyB8fCB7fTtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0Q2FsbChcInNvbHV0aW9uc19saXN0XCIpO1xuICAgIH1cblxuXG4gICAgZGVsZXRlKHNvbHV0aW9uVHlwZSwgc29sdXRpb25OYW1lKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnBvc3RDYWxsKFwic29sdXRpb25fZGVsZXRlXCIsIHsgc29sdXRpb25fdHlwZTogc29sdXRpb25UeXBlLCBzb2x1dGlvbl9uYW1lOiBzb2x1dGlvbk5hbWUgfSk7XG5cbiAgICB9XG5cbn1cblxuZXhwb3J0IGNvbnN0IHNvbHV0aW9ucyA9IG5ldyBTb2x1dGlvbnNTZXJ2aWNlKCk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zb3VyY2VzL3NlcnZpY2VzL2RlcGxveWVkU29sdXRpb25zLmpzIiwiaW1wb3J0IHsgU2VydmljZSB9IGZyb20gXCIuLi9jb21tb24vYXBpXCI7XG5cbmNvbnN0IEJBU0VfVVJMID0gXCIvemVyb2JvdC9hZG1pbi9hY3RvcnMvbG9nc1wiO1xuXG5jbGFzcyBMb2dzU2VydmljZSBleHRlbmRzIFNlcnZpY2Uge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICBzdXBlcihCQVNFX1VSTCk7XG4gICAgfVxuXG4gICAgbGlzdEFwcHMoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmdldENhbGwoXCJsaXN0X2FwcHNcIik7XG4gICAgfVxuXG4gICAgbGlzdChhcHBOYW1lLCBsb2dJZCkge1xuICAgICAgICByZXR1cm4gdGhpcy5wb3N0Q2FsbChcImxpc3RcIiwge1xuICAgICAgICAgICAgYXBwbmFtZTogYXBwTmFtZSxcbiAgICAgICAgICAgIGlkX2Zyb206IGxvZ0lkXG4gICAgICAgIH0pO1xuICAgIH1cbn1cblxuZXhwb3J0IGNvbnN0IGxvZ3MgPSBuZXcgTG9nc1NlcnZpY2UoKTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NvdXJjZXMvc2VydmljZXMvbG9ncy5qcyIsImltcG9ydCB7IFNlcnZpY2UgfSBmcm9tIFwiLi4vY29tbW9uL2FwaVwiO1xuXG5jb25zdCBCQVNFX1VSTCA9IFwiL2F1dGhcIjtcblxuY2xhc3MgQXV0aFNlcnZpY2UgZXh0ZW5kcyBTZXJ2aWNlIHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgc3VwZXIoQkFTRV9VUkwpO1xuICAgIH1cblxuICAgIGdldEN1cnJlbnRVc2VyKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5nZXRDYWxsKFwiYXV0aG9yaXplZFwiKTtcbiAgICB9XG5cbiAgICBsb2dvdXQoKSB7XG4gICAgICAgIGNvbnN0IG5leHRVcmwgPSB3aW5kb3cubG9jYXRpb24ucGF0aG5hbWUgKyB3aW5kb3cubG9jYXRpb24uaGFzaDtcbiAgICAgICAgd2luZG93LmxvY2F0aW9uLmhyZWYgPSBgL2F1dGgvbG9nb3V0P25leHRfdXJsPSR7bmV4dFVybH1gO1xuICAgIH1cbn1cblxuZXhwb3J0IGNvbnN0IGF1dGggPSBuZXcgQXV0aFNlcnZpY2UoKTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NvdXJjZXMvc2VydmljZXMvYXV0aC5qcyIsImV4cG9ydCBmdW5jdGlvbiBpbnB1dERpYWxvZyhoZWFkLCBsYWJlbCwgYnV0dG9uTGFiZWwsIGNhbGxiYWNrKSB7XG4gICAgY29uc3Qgd2luZG93ID0gd2ViaXgudWkoe1xuICAgICAgICB2aWV3OiBcIndpbmRvd1wiLFxuICAgICAgICBoZWlnaHQ6IDIwMCxcbiAgICAgICAgd2lkdGg6IDMwMCxcbiAgICAgICAgbW9kYWw6IHRydWUsXG4gICAgICAgIHBvc2l0aW9uOiBcImNlbnRlclwiLFxuICAgICAgICBoZWFkOiBoZWFkIHx8IFwiSW5wdXRcIixcbiAgICAgICAgYm9keToge1xuICAgICAgICAgICAgdmlldzogXCJmb3JtXCIsXG4gICAgICAgICAgICBlbGVtZW50czogW3tcbiAgICAgICAgICAgICAgICBpZDogXCJpbnB1dF9kaWFsb2dfdGV4dFwiLFxuICAgICAgICAgICAgICAgIHZpZXc6IFwidGV4dFwiLFxuICAgICAgICAgICAgICAgIG5hbWU6IFwiaW5wdXRcIixcbiAgICAgICAgICAgICAgICBsYWJlbDogbGFiZWwgfHwgXCJWYWx1ZVwiLFxuICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIGNvbHM6IFt7XG4gICAgICAgICAgICAgICAgICAgIHZpZXc6IFwiYnV0dG9uXCIsXG4gICAgICAgICAgICAgICAgICAgIGxhYmVsOiBcIkNhbmNlbFwiLFxuICAgICAgICAgICAgICAgICAgICBjbGljazogKCkgPT4gd2luZG93LmhpZGUoKSxcbiAgICAgICAgICAgICAgICAgICAgY3NzOiBcIndlYml4X2RhbmdlclwiXG4gICAgICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgICAgICB2aWV3OiBcImJ1dHRvblwiLFxuICAgICAgICAgICAgICAgICAgICBsYWJlbDogYnV0dG9uTGFiZWwgfHwgXCJPa1wiLFxuICAgICAgICAgICAgICAgICAgICBjbGljazogaGFuZGxlSW5wdXQsXG4gICAgICAgICAgICAgICAgICAgIGNzczogXCJ3ZWJpeF9wcmltYXJ5XCJcbiAgICAgICAgICAgICAgICB9XVxuICAgICAgICAgICAgfV1cbiAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgZnVuY3Rpb24gaGFuZGxlSW5wdXQoKSB7XG4gICAgICAgIGNvbnN0IHZhbHVlID0gdGhpcy5nZXRGb3JtVmlldygpLmVsZW1lbnRzLmlucHV0LmdldFZhbHVlKCkudHJpbSgpO1xuICAgICAgICBpZiAoIXZhbHVlKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoY2FsbGJhY2sgaW5zdGFuY2VvZiBGdW5jdGlvbikge1xuICAgICAgICAgICAgY2FsbGJhY2sodmFsdWUpO1xuICAgICAgICB9XG5cbiAgICAgICAgd2luZG93LmhpZGUoKTtcbiAgICB9XG5cblxuICAgIGNvbnN0IHRleHRJbnB1dCA9ICQkKFwiaW5wdXRfZGlhbG9nX3RleHRcIik7XG4gICAgdGV4dElucHV0LmF0dGFjaEV2ZW50KFwib25FbnRlclwiLCBoYW5kbGVJbnB1dC5iaW5kKHRleHRJbnB1dCkpO1xuXG4gICAgd2luZG93LnNob3coKTtcbiAgICB3ZWJpeC5VSU1hbmFnZXIuc2V0Rm9jdXModGV4dElucHV0KTtcbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NvdXJjZXMvY29tbW9uL2RpYWxvZ3MuanMiLCJpbXBvcnQgeyBTZXJ2aWNlIH0gZnJvbSBcIi4uL2NvbW1vbi9hcGlcIjtcblxuY29uc3QgQkFTRV9VUkwgPSBcIi96ZXJvYm90L3dlYmludGVyZmFjZS9hY3RvcnMvbWRib29rXCI7XG5cbmNsYXNzIFdpa2lzU2VydmljZSBleHRlbmRzIFNlcnZpY2Uge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICBzdXBlcihCQVNFX1VSTCk7XG4gICAgfVxuXG4gICAgbGlzdChvcHRzKSB7XG4gICAgICAgIG9wdHMgPSBvcHRzIHx8IHt9O1xuICAgICAgICByZXR1cm4gdGhpcy5nZXRDYWxsKFwiYm9va3NfbGlzdFwiKTtcbiAgICB9XG59XG5cblxuZXhwb3J0IGNvbnN0IHBhY2thZ2VzID0gbmV3IFdpa2lzU2VydmljZSgpO1xuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NvdXJjZXMvc2VydmljZXMvd2lraS5qcyIsInZhciBtYXAgPSB7XG5cdFwiLi9lblwiOiA1MSxcblx0XCIuL2VuLmpzXCI6IDUxXG59O1xuZnVuY3Rpb24gd2VicGFja0NvbnRleHQocmVxKSB7XG5cdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKHdlYnBhY2tDb250ZXh0UmVzb2x2ZShyZXEpKTtcbn07XG5mdW5jdGlvbiB3ZWJwYWNrQ29udGV4dFJlc29sdmUocmVxKSB7XG5cdHZhciBpZCA9IG1hcFtyZXFdO1xuXHRpZighKGlkICsgMSkpIC8vIGNoZWNrIGZvciBudW1iZXIgb3Igc3RyaW5nXG5cdFx0dGhyb3cgbmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIiArIHJlcSArIFwiJy5cIik7XG5cdHJldHVybiBpZDtcbn07XG53ZWJwYWNrQ29udGV4dC5rZXlzID0gZnVuY3Rpb24gd2VicGFja0NvbnRleHRLZXlzKCkge1xuXHRyZXR1cm4gT2JqZWN0LmtleXMobWFwKTtcbn07XG53ZWJwYWNrQ29udGV4dC5yZXNvbHZlID0gd2VicGFja0NvbnRleHRSZXNvbHZlO1xubW9kdWxlLmV4cG9ydHMgPSB3ZWJwYWNrQ29udGV4dDtcbndlYnBhY2tDb250ZXh0LmlkID0gNjI7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9zb3VyY2VzL2xvY2FsZXMgXlxcLlxcLy4qJFxuLy8gbW9kdWxlIGlkID0gNjJcbi8vIG1vZHVsZSBjaHVua3MgPSAwIl0sInNvdXJjZVJvb3QiOiIifQ==