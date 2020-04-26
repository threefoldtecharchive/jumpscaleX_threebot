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

        // self.info.add({
        //     key: 'Secret',
        //     value: self.secret
        // });
        // self.secret_btn.disable()
        self.info.hideItem(1);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgYzhkYzVlODk1MDQzNmQyNmRhOTQiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3dlYml4LWpldC9kaXN0L2VzNi9qZXQuanMiLCJ3ZWJwYWNrOi8vLy4vc291cmNlcy92aWV3cy9leHRlcm5hbC9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9zb3VyY2VzL2NvbW1vbi9hcGkuanMiLCJ3ZWJwYWNrOi8vLy4vc291cmNlcy92aWV3cy9lcnJvcnMvZGlhbG9nLmpzIiwid2VicGFjazovLy8uL3NvdXJjZXMvdmlld3MvYWxlcnRzL2RhdGEuanMiLCJ3ZWJwYWNrOi8vLy4vc291cmNlcy9jb21tb24vZm9ybWF0dGVycy5qcyIsIndlYnBhY2s6Ly8vLi9zb3VyY2VzL3NlcnZpY2VzL2hlYWx0aC5qcyIsIndlYnBhY2s6Ly8vLi9zb3VyY2VzL3ZpZXdzL2FsZXJ0cy9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9zb3VyY2VzL2NvbW1vbi9jb2xvcnMuanMiLCJ3ZWJwYWNrOi8vLy4vc291cmNlcy92aWV3cy9jYXBhY2l0eS9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9zb3VyY2VzL3ZpZXdzL2NpcmNsZXMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vc291cmNlcy92aWV3cy9jaXJjbGVzdG9yaWVzL2luZGV4LmpzIiwid2VicGFjazovLy8uL3NvdXJjZXMvdmlld3MvY2lyY2xldGFza3MvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vc291cmNlcy92aWV3cy9jb2Rlc2VydmVyL2luZGV4LmpzIiwid2VicGFjazovLy8uL3NvdXJjZXMvdmlld3MvZGFzaC9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9zb3VyY2VzL3ZpZXdzL2RlcGxveWVkU29sdXRpb25zL2luZGV4LmpzIiwid2VicGFjazovLy8uL3NvdXJjZXMvdmlld3MvZmFybW1hbmFnZW1lbnQvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vc291cmNlcy92aWV3cy9qdXB5dGVyL2luZGV4LmpzIiwid2VicGFjazovLy8uL3NvdXJjZXMvdmlld3MvbG9ncy9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9zb3VyY2VzL3ZpZXdzL3BhY2thZ2VzL2luZGV4LmpzIiwid2VicGFjazovLy8uL3NvdXJjZXMvdmlld3Mvc2RrZXhhbXBsZXMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vc291cmNlcy92aWV3cy9zZXR0aW5ncy9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9zb3VyY2VzL3ZpZXdzL3dhbGxldHNNYW5hZ2VyL2luZGV4LmpzIiwid2VicGFjazovLy8uL3NvdXJjZXMvdmlld3Mvd2lraXMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vc291cmNlcy92aWV3cy9hbGVydHMvYWxlcnQuanMiLCJ3ZWJwYWNrOi8vLy4vc291cmNlcy9zZXJ2aWNlcy9hZG1pbi5qcyIsIndlYnBhY2s6Ly8vLi9zb3VyY2VzL3NlcnZpY2VzL3RhaWdhLmpzIiwid2VicGFjazovLy8uL3NvdXJjZXMvdmlld3MvZGFzaC9wcm9jZXNzZXNDaGlsZFZpZXcuanMiLCJ3ZWJwYWNrOi8vLy4vc291cmNlcy92aWV3cy9kZXBsb3llZFNvbHV0aW9ucy9yZXNlcnZhdGlvbi5qcyIsIndlYnBhY2s6Ly8vLi9zb3VyY2VzL3ZpZXdzL2xvZ3MvYXBwTG9ncy5qcyIsIndlYnBhY2s6Ly8vLi9zb3VyY2VzL3ZpZXdzL3NldHRpbmdzL2FkbWlucy5qcyIsIndlYnBhY2s6Ly8vLi9zb3VyY2VzL3ZpZXdzL3NldHRpbmdzL2dlbmVyYWwuanMiLCJ3ZWJwYWNrOi8vLy4vc291cmNlcy92aWV3cy93YWxsZXRzTWFuYWdlci93YWxsZXRGb3JtLmpzIiwid2VicGFjazovLy8uL3NvdXJjZXMvc2VydmljZXMvd2FsbGV0LmpzIiwid2VicGFjazovLy8uL3NvdXJjZXMvdmlld3Mvd2FsbGV0c01hbmFnZXIvd2FsbGV0RGV0YWlscy5qcyIsIndlYnBhY2s6Ly8vLi9zb3VyY2VzL3ZpZXdzL3dhbGxldHNNYW5hZ2VyL2ltcG9ydEZvcm0uanMiLCJ3ZWJwYWNrOi8vLy4vc291cmNlcy9jb21tb24vZmlsdGVycy5qcyIsIndlYnBhY2s6Ly8vLi9zb3VyY2VzL3NlcnZpY2VzL3BhY2thZ2VzLmpzIiwid2VicGFjazovLy8uL3NvdXJjZXMvdmlld3MvZGFzaC9kaXNrU3BhY2UuanMiLCJ3ZWJwYWNrOi8vLy4vc291cmNlcy92aWV3cy9kYXNoL2hlYWx0aC5qcyIsIndlYnBhY2s6Ly8vLi9zb3VyY2VzL3ZpZXdzL2Rhc2gvanN4SW5mby5qcyIsIndlYnBhY2s6Ly8vLi9zb3VyY2VzL3ZpZXdzL2Rhc2gvcHJvY2Vzc2VzLmpzIiwid2VicGFjazovLy8uL3NvdXJjZXMvdmlld3MvZGFzaC9ydW5uaW5nUG9ydHMuanMiLCJ3ZWJwYWNrOi8vLy4vc291cmNlcy92aWV3cy9tYWluLmpzIiwid2VicGFjazovLy8uL3NvdXJjZXMvdmlld3MvbXlqb2JzL2pvYnMuanMiLCJ3ZWJwYWNrOi8vLy4vc291cmNlcy9zZXJ2aWNlcy9teWpvYnMuanMiLCJ3ZWJwYWNrOi8vLy4vc291cmNlcy92aWV3cy9teWpvYnMvd29ya2Vycy5qcyIsIndlYnBhY2s6Ly8vLi9zb3VyY2VzL3ZpZXdzL3NvbHV0aW9ucy9jaGF0Zmxvdy5qcyIsIndlYnBhY2s6Ly8vLi9zb3VyY2VzL3ZpZXdzL3Rmd2lraXMvdGZncmlkc2RrLmpzIiwid2VicGFjazovLy8uL3NvdXJjZXMvdmlld3MvdGZ3aWtpcy90aHJlZWZvbGQuanMiLCJ3ZWJwYWNrOi8vLy4vc291cmNlcy92aWV3cy93aWtpcy92aWV3LmpzIiwid2VicGFjazovLy8uL3NvdXJjZXMvYXBwLmpzIiwid2VicGFjazovLy8uL3NvdXJjZXMvc3R5bGVzL2FwcC5jc3MiLCJ3ZWJwYWNrOi8vLy4vc291cmNlcy92aWV3cyBeXFwuXFwvLiokIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9hbnNpX3VwL2Fuc2lfdXAuanMiLCJ3ZWJwYWNrOi8vLy4vc291cmNlcy9zZXJ2aWNlcy9hbGVydHMuanMiLCJ3ZWJwYWNrOi8vLy4vc291cmNlcy9zZXJ2aWNlcy9kZXBsb3llZFNvbHV0aW9ucy5qcyIsIndlYnBhY2s6Ly8vLi9zb3VyY2VzL3NlcnZpY2VzL2xvZ3MuanMiLCJ3ZWJwYWNrOi8vLy4vc291cmNlcy9zZXJ2aWNlcy9hdXRoLmpzIiwid2VicGFjazovLy8uL3NvdXJjZXMvY29tbW9uL2RpYWxvZ3MuanMiLCJ3ZWJwYWNrOi8vLy4vc291cmNlcy9zZXJ2aWNlcy93aWtpLmpzIiwid2VicGFjazovLy8uL3NvdXJjZXMvbG9jYWxlcyBeXFwuXFwvLiokIl0sIm5hbWVzIjpbIk5hdmlnYXRpb25CbG9ja2VkIiwiSmV0QmFzZSIsIndlYml4Iiwid2ViaXhKZXQiLCJfZXZlbnRzIiwiX3N1YnMiLCJfZGF0YSIsImdldFJvb3QiLCJfcm9vdCIsImRlc3RydWN0b3IiLCJfZGV0YWNoRXZlbnRzIiwiX2Rlc3Ryb3lTdWJzIiwiX2NvbnRhaW5lciIsImFwcCIsIl9wYXJlbnQiLCJzZXRQYXJhbSIsImlkIiwidmFsdWUiLCJ1cmwiLCJfc2VnbWVudCIsInVwZGF0ZSIsInNob3ciLCJnZXRQYXJhbSIsInBhcmVudCIsInZpZXciLCJnZXRQYXJlbnRWaWV3IiwiZ2V0VXJsIiwic3VidXJsIiwiZ2V0VXJsU3RyaW5nIiwidG9TdHJpbmciLCIkJCIsInJvb3QiLCJxdWVyeVZpZXciLCJvYmoiLCJjb25maWciLCJsb2NhbElkIiwiJHNjb3BlIiwib24iLCJuYW1lIiwiY29kZSIsImF0dGFjaEV2ZW50IiwicHVzaCIsImNvbnRhaW5zIiwia2V5Iiwia2lkIiwiZ2V0U3ViVmlldyIsInN1YiIsImdldFN1YlZpZXdJbmZvIiwic3VidmlldyIsInBvcHVwIiwiZXZlbnRzIiwiaSIsImxlbmd0aCIsImRldGFjaEV2ZW50Iiwic3ViVmlldyIsIl9pbml0X3VybF9kYXRhIiwiY3VycmVudCIsImV4dGVuZCIsInBhcmFtcyIsIl9nZXREZWZhdWx0U3ViIiwiZGVmYXVsdCIsImJyYW5jaCIsImNoaWxkIiwiX3JvdXRlZF92aWV3IiwicGFyc2UiLCJzdWJzdHIiLCJwYXJ0cyIsInNwbGl0IiwiY2h1bmtzIiwidGVzdCIsInJlc3VsdCIsInBvcyIsImluZGV4T2YiLCJwYXJhbSIsImRjaHVuayIsImRlY29kZVVSSUNvbXBvbmVudCIsInBhZ2UiLCJpc05ldyIsInVybDJzdHIiLCJzdGFjayIsImNodW5rIiwib2JqMnN0ciIsImpvaW4iLCJzdHIiLCJlbmNvZGVVUklDb21wb25lbnQiLCJSb3V0ZSIsInJvdXRlIiwiaW5kZXgiLCJfbmV4dCIsInBhdGgiLCJuZXh0Iiwic2xpY2UiLCJzaGlmdCIsInJlZnJlc2giLCJfam9pbiIsImtpZHMiLCJvbGQiLCJjb25jYXQiLCJhcHBlbmQiLCJQcm9taXNlIiwicmVzIiwicmVqIiwicmVkaXJlY3QiLCJjb25maXJtIiwicmVzb2x2ZSIsImNhbGxFdmVudCIsImNhdGNoIiwiZXJyIiwidGhlbiIsInNpemUiLCJuIiwiSmV0VmlldyIsIl9jaGlsZHJlbiIsInVpIiwiY29udGFpbmVyIiwiamV0dmlldyIsImNyZWF0ZVZpZXciLCJyZW5kZXIiLCJ0YXJnZXQiLCJfcmVuZGVyRnJhbWVMb2NrIiwiX3Nob3ciLCJzZWdtZW50IiwiX3VybENoYW5nZSIsImxpbmtSb3V0ZXIiLCJnZXRSb3V0ZXIiLCJzZXQiLCJzaWxlbnQiLCJpbml0IiwiXyR2aWV3IiwiXyQiLCJyZWFkeSIsIl8kdXJsIiwibWVzc2FnZSIsInVybENoYW5nZSIsImRlc3Ryb3kiLCJfZGVzdHJveUtpZHMiLCJ1c2UiLCJwbHVnaW4iLCJ0YWdOYW1lIiwiX3JlbmRlciIsImRvY3VtZW50IiwiYm9keSIsInRvTm9kZSIsIl9yZW5kZXJfZmluYWwiLCJjZmciLCJzbG90IiwicmVqZWN0IiwicmVzcG9uc2UiLCJjb3B5Q29uZmlnIiwib2xkdWkiLCJhc1dpbiIsInNldFBvc2l0aW9uIiwiaXNWaXNpYmxlIiwiX2luaXQiLCJfaW5pdFVybCIsImUiLCJfaW5pdEVycm9yIiwid2FpdHMiLCJmcmFtZSIsIndhaXQiLCJhbGwiLCJsb2NrIiwiX3JlbmRlckZyYW1lIiwiX2NyZWF0ZVN1YlZpZXciLCJlcnJvciIsImNyZWF0ZUZyb21VUkwiLCJ1aXMiLCJKZXRWaWV3UmF3IiwiX3VpIiwiU3ViUm91dGVyIiwiY2IiLCJhIiwiZ2V0IiwiX29uY2UiLCJKZXRBcHBCYXNlIiwid2luZG93IiwidmVyc2lvbiIsInN0YXJ0IiwiX3NlcnZpY2VzIiwiRXZlbnRTeXN0ZW0iLCJfc3ViU2VnbWVudCIsImdldFNlcnZpY2UiLCJzZXRTZXJ2aWNlIiwiaGFuZGxlciIsInByb3RvdHlwZSIsIiRzdWJ2aWV3IiwiYWRkU3ViVmlldyIsIkFycmF5IiwibWV0aG9kIiwicG9pbnQiLCJEYXRhQ29sbGVjdGlvbiIsIlJlZ0V4cCIsIkRhdGUiLCJjb3B5IiwiJHJvdXRlciIsImNsaWNrSGFuZGxlciIsInNyY0VsZW1lbnQiLCJnZXRBdHRyaWJ1dGUiLCJ0cmlnZ2VyIiwiX2ZvclZpZXciLCJjYW5jZWxCdWJibGUiLCJwcmV2ZW50RGVmYXVsdCIsInBhcmVudE5vZGUiLCJsb2FkVmlldyIsInZpZXdzIiwiX2xvYWRFcnJvciIsIkVycm9yIiwiX2xvYWRWaWV3RHluYW1pYyIsIm1vZHVsZSIsIl9fZXNNb2R1bGUiLCJyb3V0ZXIiLCJyZXN0IiwiYXBwbHkiLCJkYXRhIiwiYWN0aW9uIiwiYmluZCIsImVyIiwiZGVidWciLCJjb25zb2xlIiwidGV4dCIsInJlcGxhY2UiLCJpbm5lckhUTUwiLCJ0eXBlIiwiZXhwaXJlIiwiZmlyc3RJbml0IiwiZXZlbnQiLCJfZmlyc3Rfc3RhcnQiLCJ0b3AiLCJiYXNlIiwic2V0VGltZW91dCIsImFuaW1hdGlvbiIsIm5vZGUiLCJodG1sIiwiYWRkQ3NzIiwicmVtb3ZlQ3NzIiwidXJsU3RyaW5nIiwidGVtcGxhdGUiLCJ1aWQiLCJIYXNoUm91dGVyIiwiX2RldGVjdFByZWZpeCIsIm9ucG9wc3RhdGUiLCJyb3V0ZXMiLCJjb21wYXJlIiwiaGlzdG9yeSIsInB1c2hTdGF0ZSIsInByZWZpeCIsInN1Zml4IiwiX2dldFJhdyIsInJvdXRlclByZWZpeCIsImxvY2F0aW9uIiwiaHJlZiIsImlzUGF0Y2hlZCIsInBhdGNoIiwidyIsIndpbiIsInByb21pc2UiLCJmcmVlemUiLCJzb21lIiwiJGZyZWV6ZSIsInJlc2l6ZSIsImJhc2VBZGQiLCJiYXNlbGF5b3V0IiwiYWRkVmlldyIsImJhc2VSZW1vdmUiLCJyZW1vdmVWaWV3IiwianZpZXciLCJzdWJzIiwiYXJndW1lbnRzIiwibGF5b3V0IiwicHJvdG9VSSIsIiRpbml0IiwiJGFwcCIsIiRyZWFkeSIsIm9yaWdpbiIsInByb3h5IiwiSmV0QXBwIiwicmVxdWlyZSIsIlN0b3JlUm91dGVyIiwic3RvcmFnZSIsInNlc3Npb24iLCJzdG9yZU5hbWUiLCJwdXQiLCJVcmxSb3V0ZXIiLCJwYXRobmFtZSIsInNlYXJjaCIsIkVtcHR5Um91dGVyIiwiXyRjb25maWciLCJVbmxvYWRHdWFyZCIsImhhcyIsInN0b3JlIiwiT2JqZWN0IiwiaGFzT3duUHJvcGVydHkiLCJjYWxsIiwiZm9yRWFjaCIsImNvbnRleHQiLCJ0cmltIiwid2FybiIsIngiLCJTdHJpbmciLCJkZWxpbWl0ZXIiLCJydXNzaWFuUGx1cmFsR3JvdXBzIiwiZW5kIiwicGx1cmFsVHlwZXMiLCJhcmFiaWMiLCJsYXN0VHdvIiwiYm9zbmlhbl9zZXJiaWFuIiwiY2hpbmVzZSIsImNyb2F0aWFuIiwiZnJlbmNoIiwiZ2VybWFuIiwicnVzc2lhbiIsImxpdGh1YW5pYW4iLCJjemVjaCIsInBvbGlzaCIsImljZWxhbmRpYyIsInNsb3ZlbmlhbiIsInBsdXJhbFR5cGVUb0xhbmd1YWdlcyIsImxhbmdUb1R5cGVNYXAiLCJtYXBwaW5nIiwicmV0IiwibGFuZ3MiLCJsYW5nIiwicGx1cmFsVHlwZU5hbWUiLCJsb2NhbGUiLCJsYW5nVG9QbHVyYWxUeXBlIiwiZW4iLCJwbHVyYWxUeXBlSW5kZXgiLCJjb3VudCIsImVzY2FwZSIsInRva2VuIiwiY29uc3RydWN0VG9rZW5SZWdleCIsIm9wdHMiLCJzdWZmaXgiLCJSYW5nZUVycm9yIiwiZG9sbGFyUmVnZXgiLCJkb2xsYXJCaWxsc1lhbGwiLCJkZWZhdWx0VG9rZW5SZWdleCIsInRyYW5zZm9ybVBocmFzZSIsInBocmFzZSIsInN1YnN0aXR1dGlvbnMiLCJ0b2tlblJlZ2V4IiwiVHlwZUVycm9yIiwiaW50ZXJwb2xhdGlvblJlZ2V4Iiwib3B0aW9ucyIsInNtYXJ0X2NvdW50IiwidGV4dHMiLCJleHByZXNzaW9uIiwiYXJndW1lbnQiLCJQb2x5Z2xvdCIsInBocmFzZXMiLCJjdXJyZW50TG9jYWxlIiwiYWxsb3dNaXNzaW5nIiwib25NaXNzaW5nS2V5IiwiaW50ZXJwb2xhdGlvbiIsIm5ld0xvY2FsZSIsIm1vcmVQaHJhc2VzIiwicHJlZml4ZWRLZXkiLCJ1bnNldCIsImNsZWFyIiwibmV3UGhyYXNlcyIsInQiLCJfIiwidHJhbnNmb3JtIiwid2ViaXhQb2x5Z2xvdCIsIkxvY2FsZSIsIl92aWV3Iiwic2V0TGFuZ0RhdGEiLCJwY29uZmlnIiwicG9seWdsb3QiLCJwb2x5Iiwic2VydmljZSIsImxvY05hbWUiLCJpMThuIiwic2V0TG9jYWxlIiwiZ2V0TGFuZyIsInNldExhbmciLCJ1cmxzIiwiTWVudSIsImdldFZhbHVlIiwic2V0VmFsdWUiLCJnZXRTZWxlY3RlZElkIiwic2VsZWN0IiwiZXhpc3RzIiwiYmFzZWljb25zIiwiZ29vZCIsInNhdmluZyIsImJhc2V0ZXh0IiwiU3RhdHVzIiwic3RhdHVzIiwiaXNlcnJvciIsImV4cGlyZURlbGF5IiwiaWNvbnMiLCJjb250ZW50IiwiYXJlYSIsInNldEhUTUwiLCJzdWNjZXNzIiwic2V0U3RhdHVzIiwiZmFpbCIsImdldFN0YXR1cyIsImhpZGVTdGF0dXMiLCJtb2RlIiwicmVzcG9uc2VUZXh0IiwidHJhY2siLCJkcCIsIl9pZCIsIl9vYmoiLCJyZW1vdGUiLCJhamF4IiwiX21vZGUiLCJfdXJsIiwiX3JlcXVlc3QiLCJfaGVhZGVycyIsIl9maWxlcyIsIlRoZW1lIiwidGhlbWUiLCJnZXRUaGVtZSIsInNldFRoZW1lIiwibGlua3MiLCJnZXRFbGVtZW50c0J5VGFnTmFtZSIsImxuYW1lIiwiZGlzYWJsZWQiLCJza2luIiwiY29weVBhcmFtcyIsIlVybFBhcmFtIiwib3MiLCJvZyIsInZhbCIsIlVzZXIiLCJsb2dpbiIsImxvZ291dCIsImFmdGVyTG9naW4iLCJhZnRlckxvZ291dCIsInBpbmciLCJtb2RlbCIsInVzZXIiLCJnZXRVc2VyIiwic2VydmVyIiwicGFzcyIsImNhbk5hdmlnYXRlIiwiXyRyb290IiwicHVibGljIiwic2V0SW50ZXJ2YWwiLCJwbHVnaW5zIiwiZXJyb3JzIiwiU1RBVFVTX0lOU1RBTExFRCIsIkV4dGVybmFsVmlldyIsInRhcmdldFVybCIsInJlcXVpcmVkUGFja2FnZXMiLCJzZWxmIiwiaWZyYW1lIiwib25BZnRlckxvYWQiLCJoaWRlUHJvZ3Jlc3MiLCJlbmFibGUiLCJyb3dzIiwiaGlkZGVuIiwiY29scyIsImF1dG9oZWlnaHQiLCJjc3MiLCJoZWlnaHQiLCJjbGljayIsImluc3RhbGxSZXF1aXJlZFBhY2thZ2VzIiwicHJvbWlzZXMiLCJ2YWx1ZXMiLCJwYWNrYWdlc1RvSW5zdGFsbCIsIm1hcCIsInBhY2thZ2VzIiwiYWRkIiwiaW5zdGFsbEJ1dHRvbiIsImRpc2FibGUiLCJyZWxvYWQiLCJzaG93SWZyYW1lIiwiZXh0ZXJuYWxJZnJhbWUiLCJzaG93UHJvZ3Jlc3MiLCJsb2FkIiwiUHJvZ3Jlc3NCYXIiLCJwYWNrYWdlTmFtZXMiLCJrZXlzIiwicmVxdWlyZWRQYWNrYWdlc0RpdiIsImluc3RhbGxQYWNrYWdlQ29udGFpbmVyIiwicGFja2FnZVN0YXRlcyIsImpzb24iLCJwYWNrYWdlTmFtZXNUb0luc3RhbGwiLCJoaWRlIiwibmFtZXMiLCJoZWFkZXJzIiwiU2VydmljZSIsImJhc2VVcmwiLCJqb2luVXJsIiwiYXJncyIsInRvTG93ZXJDYXNlIiwicG9zdCIsIlZhbHVlRXJyb3IiLCJnZXRDYWxsIiwicG9zdENhbGwiLCJFcnJvclZpZXciLCJzY3JvbGwiLCJoZWFkIiwibW9kYWwiLCJ3aWR0aCIsInBvc2l0aW9uIiwiZ2V0VG9wUGFyZW50VmlldyIsInNob3dFcnJvciIsImFuc2lVcCIsImFuc2lfdG9faHRtbCIsImdldEhlYWQiLCJNQVhfTVNHX0xFTiIsIkxFVkVMUyIsIlNUQVRFUyIsIlRZUEVTIiwiZGF0ZUZvcm1hdCIsIndlYml4RGF0ZUZvcm1hdHRlciIsImRhdGVUb1N0ciIsImRhdGVGb3JtYXR0ZXIiLCJwYXJzZUludCIsIkJBU0VfVVJMIiwiSGVhbHRoU2VydmljZSIsImdldERpc2tTcGFjZSIsImdldEhlYWx0aCIsImdldElkZW50aXR5IiwiZ2V0TmV0d29ya0luZm8iLCJnZXRKc3hWZXJzaW9uIiwiZ2V0UnVubmluZ1Byb2Nlc3NlcyIsImdldFJ1bm5pbmdQb3J0cyIsImhlYWx0aCIsIkFsZXJ0c1ZpZXciLCJyZXNpemVDb2x1bW4iLCJtdWx0aXNlbGVjdCIsImNvbHVtbnMiLCJoZWFkZXIiLCJzb3J0IiwiYXV0b3dpZHRoIiwiZm9ybWF0IiwiY3JlYXRlRmlsdGVyT3B0aW9ucyIsImZpbGxzcGFjZSIsImF1dG9Db25maWciLCJzY2hlbWUiLCJkZWxldGVJdGVtIiwib2JqZWN0cyIsIml0ZW1zIiwiaWRzIiwiaW5kZXhlcyIsIml0ZW0iLCJ0YWJsZSIsImdldEl0ZW0iLCJ0aXRsZSIsIm9rIiwiY2FuY2VsIiwiaWRlbnRpZmllcnMiLCJpZGVudGlmaWVyIiwiYWxlcnRzIiwiZGVsZXRlIiwicmVtb3ZlIiwidmlld0l0ZW0iLCJhbGVydFZpZXciLCJzaG93Rm9yIiwiQWxlcnRWaWV3IiwiY2xlYXJBbGwiLCJsaXN0IiwiYXR0YWNoVG8iLCJBbnNpVXAiLCJDYXBhY2l0eVZpZXciLCJhZG1pbiIsImdldF9leHBsb3JlciIsImV4cGxvcmVyIiwic3RhcnRzV2l0aCIsIkNpcmNsZXNWaWV3IiwiZ3JpZCIsIm9uQ29udGV4dCIsImVycm9yVmlldyIsIm1lbnUiLCJjaXJjbGVUYWJsZSIsImluZm8iLCJKU09OIiwidXNlcm5hbWUiLCJ0YWlnYSIsInVzZXJDaXJjbGVzIiwiY2lyY2xlcyIsIkNpcmNsZXN0b3JpZXNWaWV3Iiwic3Rvcmllc1RhYmxlIiwidXNlclN0b3JpZXMiLCJzdG9yaWVzIiwiQ2lyY2xlc1Rhc2tzVmlldyIsInRhc2tzVGFibGUiLCJ1c2VyVGFza3MiLCJ0YXNrcyIsIkNPREVfVVJMIiwiUkVRVUlSRURfUEFDS0FHRVMiLCJDb2Rlc2VydmVyVmlldyIsIlRvcFZpZXciLCJyZXNwb25zaXZlIiwiVU5LTk9XTl9TVEFUVVMiLCJEZXBsb3llZFNvbHV0aW9uc1ZpZXciLCJzb2x1dGlvbk5hbWUiLCJyZXN2SWQiLCJyZXNlcnZhdGlvbiIsInNvbHV0aW9uVHlwZSIsIm5leHRBY3Rpb24iLCJuZXh0X2FjdGlvbiIsInNob3dPdmVybGF5IiwiaGlkZU92ZXJsYXkiLCJoYW5kbGVSZXN1bHQiLCJjYWxsYmFjayIsInNvbHV0aW9uc1RhYmxlIiwic29sdXRpb25JdGVtIiwic29sdXRpb24iLCJGdW5jdGlvbiIsImRlbGV0ZVNvbHV0aW9uIiwiaXRlbUlkIiwic29sdXRpb25zIiwibG9hZFNvbHV0aW9ucyIsImZvcm1faW5mbyIsInJlc2VydmF0aW9uVmlldyIsIlJlc2VydmF0aW9uVmlldyIsImNoZWNrQWN0aW9uIiwic2VsZWN0ZWRJdGVtSWQiLCIkdmlldyIsImxvY2F0ZSIsInJvdyIsImFjdGlvbnMiLCJwcmV2ZW50RXZlbnQiLCJVUkwiLCJGYXJtbWFuYWdlbWVudFZpZXciLCJKdXB5dGVyVmlldyIsIkxvZ3NWaWV3IiwicGxhY2Vob2xkZXIiLCJvbkNoYW5nZSIsImFwcE5hbWUiLCJBcHBMb2dzVmlldyIsImFwcHNDb21ibyIsImxvZ3MiLCJsaXN0QXBwcyIsImRlZmluZSIsImFwcG5hbWUiLCJsb2dJZCIsImxvZ2lkIiwiYXBwTG9ncyIsIlBBQ0tBR0VfU1RBVEVTIiwiUGFja2FnZXNWaWV3IiwiaW5wdXRBbGlnbiIsInNvdXJjZV9uYW1lIiwic291cmNlIiwiYXV0aG9yIiwidGhyZWVib3QiLCJwYWNrYWdlVGFibGUiLCJwYWNrYWdlSXRlbSIsInBhY2thZ2UiLCJhZGRQYWNrYWdlIiwiZ2l0VXJsIiwidXBkYXRlSXRlbSIsImRlbGV0ZVBhY2thZ2UiLCJwYWNrYWdlTmFtZSIsInN0YXJ0UGFja2FnZSIsInN0b3BQYWNrYWdlIiwic3RvcCIsImVuYWJsZVBhY2thZ2UiLCJkaXNhYmxlUGFja2FnZSIsImxvYWRQYWNrYWdlcyIsIl9yZXF1aXJlZHBhY2thZ2VzIiwicGFjYWtnZUxvY2F0aW9uIiwiYWxlcnQiLCJwYWNrYWdlTWV0aG9kIiwiaW5jbHVkZXMiLCJTZXR0aW5nc1ZpZXciLCJjZWxscyIsIkdlbmVyYWxWaWV3IiwiQWRtaW5zVmlldyIsIldhbGxldE1hbmFnZXJWaWV3Iiwid2FsbGV0cyIsIldhbGxldEZvcm1WaWV3Iiwic2hvd0Zvcm0iLCJXYWxsZXRJbXBvcnRWaWV3Iiwid2FsbGV0c190YWJsZSIsIldhbGxldERldGFpbHNWaWV3IiwiZ2V0U2VsZWN0ZWRJdGVtIiwid2FsbGV0IiwibWFuYWdlV2FsbGV0IiwibG9nIiwiYWRkcmVzcyIsInNlY3JldCIsImJhbGFuY2VzIiwic2hvd0luZm8iLCJnZXRXYWxsZXRzIiwiV2lraXNWaWV3Iiwib25DbGljayIsImJ0bl92aWV3IiwiZXYiLCJlbGVtZW50c0NvbmZpZyIsImxhYmVsV2lkdGgiLCJlbGVtZW50cyIsImxhYmVsIiwicmVhZG9ubHkiLCJ0YWIiLCJtdWx0aXZpZXciLCJmb3JtIiwidGJWaWV3cyIsInRiVGFicyIsImxvZ0RhdGEiLCJhcHBfbmFtZSIsImxhdGVzdF9sb2dpZCIsImFkZFRyYWNlYmFjayIsInRiIiwidGJJZCIsInRocmVlYm90X25hbWUiLCJwcm9jZXNzX2lkIiwidGJUaXRsZSIsImZvcm1hdHRlZCIsImFkZE9wdGlvbiIsImNsZWFyVHJhY2VCYWNrcyIsInJlbW92ZU9wdGlvbiIsImFzc2lnbiIsImFsZXJ0X3R5cGUiLCJsZXZlbCIsInRpbWVfZmlyc3QiLCJ0aW1lX2xhc3QiLCJzZXRWYWx1ZXMiLCJ0cmFjZWJhY2tzIiwiQWRtaW5TZXJ2aWNlIiwic2V0X2V4cGxvcmVyIiwiZXhwbG9yZXJfdHlwZSIsIlRhaWdhU2VydmljZSIsIm91dHB1dF90eXBlIiwiUHJvY2Vzc2VzQ2hpbGRWaWV3IiwiTWF0aCIsImNlaWwiLCJuZXR3b3JrX25hbWUiLCJpcF9yYW5nZSIsImlwcmFuZ2UiLCJmYXJtZXJfdGlkIiwibm9kZV9pZCIsImZsaXN0IiwiZW50cnlwb2ludCIsImh1Yl91cmwiLCJpbnRlcmFjdGl2ZSIsIm1hc3Rlcl9pcHNfc3RyIiwibWFzdGVyX2lwcyIsInJlc2VydmF0aW9uX3ZpZXciLCJjdXN0b21lcl90aWQiLCJyZXN1bHRzIiwiZXhwaXJhdGlvbiIsImRhdGFfcmVzZXJ2YXRpb24iLCJleHBpcmF0aW9uX3Jlc2VydmF0aW9uIiwiY29udGFpbmVycyIsInZvbHVtZXMiLCJ6ZGJzIiwibmV0d29ya3MiLCJrdWJlcm5ldGVzIiwiZm9ybV9saXN0IiwiZm9ybV9rZXlzIiwiZm9ybV92YWx1ZXMiLCJmb3JtX2RpY3QiLCJwYWdlciIsImdyb3VwIiwiYXBwbG9ncyIsIm1hcmtTb3J0aW5nIiwiYWRkQWRtaW4iLCJkZWxldGVfYWRtaW4iLCJkZWxldGVBZG1pbiIsImlucHV0RGlhbG9nIiwiaW5wdXQiLCJ5Q291bnQiLCJkb0FjdGlvbiIsImV4cGxvcmVyTGlzdCIsImV4cGxvcmVyQWRkcmVzcyIsIm5ld1ZhbHVlIiwid2FsbGV0X25hbWUiLCJnZXRWYWx1ZXMiLCJjcmVhdGVXYWxsZXQiLCJXYWxsZXRTZXJ2aWNlIiwiaW1wb3J0V2FsbGV0Iiwic2hvd1NlY3JldCIsInNlY3JldF9idG4iLCJoaWRlSXRlbSIsImJhbGFuY2UiLCJhc3NldF9jb2RlIiwiYXNzZXRfaXNzdWVyIiwiUGFja2FnZXNTZXJ2aWNlIiwiZ2l0X3VybCIsIkRpc2tTcGFjZVZpZXciLCJkaXNrU3BhY2UiLCJkaXNrSW5mbyIsInVzZWQiLCJmcmVlIiwidG90YWwiLCJwZXJjZW50IiwiaGVhbHRoSW5mb1ZpZXciLCJoZWFsdGhJbmZvIiwiYmNkYiIsIndpa2lzIiwiY29kZXNlcnZlciIsImp1cHl0ZXIiLCJKU1hJbmZvVmlldyIsImlwIiwiaXA2IiwiY29sb3JzRGF0YXNldCIsImNvbG9yIiwiUHJvY2Vzc2VzVmlldyIsInByb2Nlc3Nlc0luZm8iLCJwaWVJbm5lclRleHQiLCJhbGlnbiIsImlucHV0V2lkdGgiLCJjaGlsZHZpZXciLCJwcm9jZXNzZXNMaXN0IiwicnVuUHJvY2Vzc0luZm8iLCJjaGFydHNEYXRhIiwicHJvY2Vzc2VzX2xpc3QiLCJtZW1vcnlVc2FnZSIsIm1lbW9yeV91c2FnZSIsInRvdGFsTWVtb3J5IiwidG90YWxfbWVtIiwidXNhZ2VfcGVyY2VudCIsInRlbXAiLCJyc3MiLCJydW5uaW5nUG9ydHNWaWV3IiwicG9ydHMiLCJwb3J0c1RhYmxlIiwiaWNvbiIsImhpZGVNZW51IiwidG9vbHRpcCIsImJvcmRlcmxlc3MiLCJzaWRlYmFyRGF0YSIsInN5bmMiLCJoYXNfZnJvbnRlbmRfYXJncyIsInAiLCJmcm9udGVuZF9hcmdzIiwic2lkZWJhciIsInRvb2xiYXIiLCJwYWRkaW5nIiwic2hvd01lbnUiLCJidXR0b25IaWRlTWVudSIsImJ1dHRvblNob3dNZW51IiwibXlqb2JzIiwid29ya2VycyIsInRmZ3JpZHNkayIsInRocmVlZm9sZCIsInVidW50dSIsIm5ldHdvcmsiLCJtaW5pbyIsIndlYmdhdGV3YXkiLCJrOHNfY2x1c3RlciIsInVzZXJNZW51IiwiYXV0aCIsInVzZXJuYW1lTGFiZWwiLCJnZXRDdXJyZW50VXNlciIsImRldm1vZGUiLCJnZXRUZXh0U2l6ZSIsImVtYWlsIiwiSm9ic1ZpZXciLCJzdHJpbmdpZnkiLCJsaXN0Sm9icyIsIk15am9ic1NlcnZpY2UiLCJsaXN0V29ya2VycyIsIkNoYXRmbG93VmlldyIsImJhc2VHaXRVcmwiLCJwYWNrYWdlVXJsIiwiY2hhdCIsIlRGR1JJRFNES19VUkwiLCJURkdyaWRTREtXaWtpIiwiVEhSRUVGT0xEX1VSTCIsIlRocmVlZm9sZFdpa2kiLCJXaWtpRXh0ZXJuYWxWaWV3IiwiSW52ZW50b3J5QXBwIiwiQVBQTkFNRSIsIlZFUlNJT04iLCJQUk9EVUNUSU9OIiwiZmFjdG9yeSIsImV4cG9ydHMiLCJub2RlTmFtZSIsImV4cCIsIl9fbWFrZVRlbXBsYXRlT2JqZWN0IiwiY29va2VkIiwicmF3IiwiZGVmaW5lUHJvcGVydHkiLCJQYWNrZXRLaW5kIiwic2V0dXBfcGFsZXR0ZXMiLCJfdXNlX2NsYXNzZXMiLCJfZXNjYXBlX2Zvcl9odG1sIiwiYm9sZCIsImZnIiwiYmciLCJfYnVmZmVyIiwiX3VybF93aGl0ZWxpc3QiLCJhcmciLCJlbnVtZXJhYmxlIiwiY29uZmlndXJhYmxlIiwiX3RoaXMiLCJhbnNpX2NvbG9ycyIsInJnYiIsImNsYXNzX25hbWUiLCJwYWxldHRlXzI1NiIsInBhbGV0dGUiLCJyZWMiLCJsZXZlbHMiLCJyIiwiZyIsImIiLCJjb2wiLCJncmV5X2xldmVsIiwiZ3J5IiwiZXNjYXBlX3R4dF9mb3JfaHRtbCIsInR4dCIsImFwcGVuZF9idWZmZXIiLCJnZXRfbmV4dF9wYWNrZXQiLCJwa3QiLCJraW5kIiwiRU9TIiwibGVuIiwiVGV4dCIsIkluY29tcGxldGUiLCJuZXh0X2NoYXIiLCJjaGFyQXQiLCJFU0MiLCJfY3NpX3JlZ2V4Iiwicmd4IiwibWF0Y2giLCJVbmtub3duIiwiU0dSIiwicnBvcyIsIl9vc2Nfc3QiLCJyZ3hHIiwibGFzdEluZGV4IiwibWF0Y2hfMSIsImV4ZWMiLCJtYXRjaF8yIiwiX29zY19yZWdleCIsIk9TQ1VSTCIsImJsb2NrcyIsInBhY2tldCIsInRyYW5zZm9ybV90b19odG1sIiwid2l0aF9zdGF0ZSIsInByb2Nlc3NfYW5zaSIsInByb2Nlc3NfaHlwZXJsaW5rIiwic2dyX2NtZHMiLCJzZ3JfY21kX3N0ciIsIm51bSIsImlzTmFOIiwiaXNfZm9yZWdyb3VuZCIsIm1vZGVfY21kIiwicGFsZXR0ZV9pbmRleCIsImMiLCJmcmFnbWVudCIsInN0eWxlcyIsImNsYXNzZXMiLCJjbGFzc19zdHJpbmciLCJzdHlsZV9zdHJpbmciLCJ0bXBsT2JqIiwic3Vic3QiLCJfaSIsInJlZ2V4VGV4dCIsIndzcmd4IiwidHh0MiIsIkFsZXJ0c1NlcnZpY2UiLCJTb2x1dGlvbnNTZXJ2aWNlIiwic29sdXRpb25fdHlwZSIsInNvbHV0aW9uX25hbWUiLCJMb2dzU2VydmljZSIsImlkX2Zyb20iLCJBdXRoU2VydmljZSIsIm5leHRVcmwiLCJoYXNoIiwiYnV0dG9uTGFiZWwiLCJoYW5kbGVJbnB1dCIsImdldEZvcm1WaWV3IiwidGV4dElucHV0IiwiVUlNYW5hZ2VyIiwic2V0Rm9jdXMiLCJXaWtpc1NlcnZpY2UiXSwibWFwcGluZ3MiOiI7O1FBQUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7OztRQUdBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBLEtBQUs7UUFDTDtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLDJCQUEyQiwwQkFBMEIsRUFBRTtRQUN2RCxpQ0FBaUMsZUFBZTtRQUNoRDtRQUNBO1FBQ0E7O1FBRUE7UUFDQSxzREFBc0QsK0RBQStEOztRQUVySDtRQUNBOztRQUVBO1FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7SUM3RE1BLGlCOzs7O0lBRUFDLE87QUFDRixxQkFBWUMsS0FBWixFQUFtQjtBQUFBOztBQUNmLGFBQUtDLFFBQUwsR0FBZ0IsSUFBaEI7QUFDQSxhQUFLRCxLQUFMLEdBQWFBLEtBQWI7QUFDQSxhQUFLRSxPQUFMLEdBQWUsRUFBZjtBQUNBLGFBQUtDLEtBQUwsR0FBYSxFQUFiO0FBQ0EsYUFBS0MsS0FBTCxHQUFhLEVBQWI7QUFDSDs7c0JBQ0RDLE8sc0JBQVU7QUFDTixlQUFPLEtBQUtDLEtBQVo7QUFDSCxLOztzQkFDREMsVSx5QkFBYTtBQUNULGFBQUtDLGFBQUw7QUFDQSxhQUFLQyxZQUFMO0FBQ0EsYUFBS1AsT0FBTCxHQUFlLEtBQUtRLFVBQUwsR0FBa0IsS0FBS0MsR0FBTCxHQUFXLEtBQUtDLE9BQUwsR0FBZSxLQUFLTixL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LFFBQVEsRUFBZjtBQUNBLGVBQU8sS0FBS2lLLE9BQUwsQ0FBYSxZQUFiLENBQVA7QUFDSCxLOzs7RUFSc0JQLDREOztBQVlwQixJQUFNcEIsV0FBVyxJQUFJb2YsWUFBSixFQUFqQixDOzs7Ozs7QUNoQlA7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsdUIiLCJmaWxlIjoiYXBwLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7XG4gXHRcdFx0XHRjb25maWd1cmFibGU6IGZhbHNlLFxuIFx0XHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcbiBcdFx0XHRcdGdldDogZ2V0dGVyXG4gXHRcdFx0fSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiL2NvZGViYXNlL1wiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IDUyKTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyB3ZWJwYWNrL2Jvb3RzdHJhcCBjOGRjNWU4OTUwNDM2ZDI2ZGE5NCIsImNsYXNzIE5hdmlnYXRpb25CbG9ja2VkIHsgfVxuXG5jbGFzcyBKZXRCYXNlIHtcclxuICAgIGNvbnN0cnVjdG9yKHdlYml4KSB7XHJcbiAgICAgICAgdGhpcy53ZWJpeEpldCA9IHRydWU7XHJcbiAgICAgICAgdGhpcy53ZWJpeCA9IHdlYml4O1xyXG4gICAgICAgIHRoaXMuX2V2ZW50cyA9IFtdO1xyXG4gICAgICAgIHRoaXMuX3N1YnMgPSB7fTtcclxuICAgICAgICB0aGlzLl9kYXRhID0ge307XHJcbiAgICB9XHJcbiAgICBnZXRSb290KCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9yb290O1xyXG4gICAgfVxyXG4gICAgZGVzdHJ1Y3RvcigpIHtcclxuICAgICAgICB0aGlzLl9kZXRhY2hFdmVudHMoKTtcclxuICAgICAgICB0aGlzLl9kZXN0cm95U3VicygpO1xyXG4gICAgICAgIHRoaXMuX2V2ZW50cyA9IHRoaXMuX2NvbnRhaW5lciA9IHRoaXMuYXBwID0gdGhpcy5fcGFyZW50ID0gdGhpcy5fcm9vdCA9IG51bGw7XHJcbiAgICB9XHJcbiAgICBzZXRQYXJhbShpZCwgdmFsdWUsIHVybCkge1xyXG4gICAgICAgIGlmICh0aGlzLl9kYXRhW2lkXSAhPT0gdmFsdWUpIHtcclxuICAgICAgICAgICAgdGhpcy5fZGF0YVtpZF0gPSB2YWx1ZTtcclxuICAgICAgICAgICAgdGhpcy5fc2VnbWVudC51cGRhdGUoaWQsIHZhbHVlLCAwKTtcclxuICAgICAgICAgICAgaWYgKHVybCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuc2hvdyhudWxsKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGdldFBhcmFtKGlkLCBwYXJlbnQpIHtcclxuICAgICAgICBjb25zdCB2YWx1ZSA9IHRoaXMuX2RhdGFbaWRdO1xyXG4gICAgICAgIGlmICh0eXBlb2YgdmFsdWUgIT09IFwidW5kZWZpbmVkXCIgfHwgIXBhcmVudCkge1xyXG4gICAgICAgICAgICByZXR1cm4gdmFsdWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNvbnN0IHZpZXcgPSB0aGlzLmdldFBhcmVudFZpZXcoKTtcclxuICAgICAgICBpZiAodmlldykge1xyXG4gICAgICAgICAgICByZXR1cm4gdmlldy5nZXRQYXJhbShpZCwgcGFyZW50KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBnZXRVcmwoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX3NlZ21lbnQuc3VidXJsKCk7XHJcbiAgICB9XHJcbiAgICBnZXRVcmxTdHJpbmcoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX3NlZ21lbnQudG9TdHJpbmcoKTtcclxuICAgIH1cclxuICAgIGdldFBhcmVudFZpZXcoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX3BhcmVudDtcclxuICAgIH1cclxuICAgICQkKGlkKSB7XHJcbiAgICAgICAgaWYgKHR5cGVvZiBpZCA9PT0gXCJzdHJpbmdcIikge1xyXG4gICAgICAgICAgICBjb25zdCByb290ID0gdGhpcy5nZXRSb290KCk7XHJcbiAgICAgICAgICAgIHJldHVybiByb290LnF1ZXJ5Vmlldygob2JqID0+IChvYmouY29uZmlnLmlkID09PSBpZCB8fCBvYmouY29uZmlnLmxvY2FsSWQgPT09IGlkKSAmJlxyXG4gICAgICAgICAgICAgICAgKG9iai4kc2NvcGUgPT09IHJvb3QuJHNjb3BlKSksIFwic2VsZlwiKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIHJldHVybiBpZDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBvbihvYmosIG5hbWUsIGNvZGUpIHtcclxuICAgICAgICBjb25zdCBpZCA9IG9iai5hdHRhY2hFdmVudChuYW1lLCBjb2RlKTtcclxuICAgICAgICB0aGlzLl9ldmVudHMucHVzaCh7IG9iaiwgaWQgfSk7XHJcbiAgICAgICAgcmV0dXJuIGlkO1xyXG4gICAgfVxyXG4gICAgY29udGFpbnModmlldykge1xyXG4gICAgICAgIGZvciAoY29uc3Qga2V5IGluIHRoaXMuX3N1YnMpIHtcclxuICAgICAgICAgICAgY29uc3Qga2lkID0gdGhpcy5fc3Vic1trZXldLnZpZXc7XHJcbiAgICAgICAgICAgIGlmIChraWQgPT09IHZpZXcgfHwga2lkLmNvbnRhaW5zKHZpZXcpKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcbiAgICBnZXRTdWJWaWV3KG5hbWUpIHtcclxuICAgICAgICBjb25zdCBzdWIgPSB0aGlzLmdldFN1YlZpZXdJbmZvKG5hbWUpO1xyXG4gICAgICAgIGlmIChzdWIpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHN1Yi5zdWJ2aWV3LnZpZXc7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgZ2V0U3ViVmlld0luZm8obmFtZSkge1xyXG4gICAgICAgIGNvbnN0IHN1YiA9IHRoaXMuX3N1YnNbbmFtZSB8fCBcImRlZmF1bHRcIl07XHJcbiAgICAgICAgaWYgKHN1Yikge1xyXG4gICAgICAgICAgICByZXR1cm4geyBzdWJ2aWV3OiBzdWIsIHBhcmVudDogdGhpcyB9O1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAobmFtZSA9PT0gXCJfdG9wXCIpIHtcclxuICAgICAgICAgICAgdGhpcy5fc3Vic1tuYW1lXSA9IHsgdXJsOiBcIlwiLCBpZDogbnVsbCwgcG9wdXA6IHRydWUgfTtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZ2V0U3ViVmlld0luZm8obmFtZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIHdoZW4gY2FsbGVkIGZyb20gYSBjaGlsZCB2aWV3LCBzZWFyY2hlcyBmb3IgbmVhcmVzdCBwYXJlbnQgd2l0aCBzdWJ2aWV3XHJcbiAgICAgICAgaWYgKHRoaXMuX3BhcmVudCkge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fcGFyZW50LmdldFN1YlZpZXdJbmZvKG5hbWUpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgIH1cclxuICAgIF9kZXRhY2hFdmVudHMoKSB7XHJcbiAgICAgICAgY29uc3QgZXZlbnRzID0gdGhpcy5fZXZlbnRzO1xyXG4gICAgICAgIGZvciAobGV0IGkgPSBldmVudHMubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIHtcclxuICAgICAgICAgICAgZXZlbnRzW2ldLm9iai5kZXRhY2hFdmVudChldmVudHNbaV0uaWQpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIF9kZXN0cm95U3VicygpIHtcclxuICAgICAgICAvLyBkZXN0cm95IHN1YiB2aWV3c1xyXG4gICAgICAgIGZvciAoY29uc3Qga2V5IGluIHRoaXMuX3N1YnMpIHtcclxuICAgICAgICAgICAgY29uc3Qgc3ViVmlldyA9IHRoaXMuX3N1YnNba2V5XS52aWV3O1xyXG4gICAgICAgICAgICAvLyBpdCBwb3NzaWJsZSB0aGF0IHN1YnZpZXcgd2FzIG5vdCBsb2FkZWQgd2l0aCBhbnkgY29udGVudCB5ZXRcclxuICAgICAgICAgICAgLy8gc28gY2hlY2sgb24gbnVsbFxyXG4gICAgICAgICAgICBpZiAoc3ViVmlldykge1xyXG4gICAgICAgICAgICAgICAgc3ViVmlldy5kZXN0cnVjdG9yKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gcmVzZXQgdG8gcHJldmVudCBtZW1vcnkgbGVha3NcclxuICAgICAgICB0aGlzLl9zdWJzID0ge307XHJcbiAgICB9XHJcbiAgICBfaW5pdF91cmxfZGF0YSgpIHtcclxuICAgICAgICBjb25zdCB1cmwgPSB0aGlzLl9zZWdtZW50LmN1cnJlbnQoKTtcclxuICAgICAgICB0aGlzLl9kYXRhID0ge307XHJcbiAgICAgICAgdGhpcy53ZWJpeC5leHRlbmQodGhpcy5fZGF0YSwgdXJsLnBhcmFtcywgdHJ1ZSk7XHJcbiAgICB9XHJcbiAgICBfZ2V0RGVmYXVsdFN1YigpIHtcclxuICAgICAgICBpZiAodGhpcy5fc3Vicy5kZWZhdWx0KSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9zdWJzLmRlZmF1bHQ7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGZvciAoY29uc3Qga2V5IGluIHRoaXMuX3N1YnMpIHtcclxuICAgICAgICAgICAgY29uc3Qgc3ViID0gdGhpcy5fc3Vic1trZXldO1xyXG4gICAgICAgICAgICBpZiAoIXN1Yi5icmFuY2ggJiYgc3ViLnZpZXcgJiYga2V5ICE9PSBcIl90b3BcIikge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgY2hpbGQgPSBzdWIudmlldy5fZ2V0RGVmYXVsdFN1YigpO1xyXG4gICAgICAgICAgICAgICAgaWYgKGNoaWxkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGNoaWxkO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgX3JvdXRlZF92aWV3KCkge1xyXG4gICAgICAgIGNvbnN0IHBhcmVudCA9IHRoaXMuZ2V0UGFyZW50VmlldygpO1xyXG4gICAgICAgIGlmICghcGFyZW50KSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjb25zdCBzdWIgPSBwYXJlbnQuX2dldERlZmF1bHRTdWIoKTtcclxuICAgICAgICBpZiAoIXN1YiAmJiBzdWIgIT09IHRoaXMpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gcGFyZW50Ll9yb3V0ZWRfdmlldygpO1xyXG4gICAgfVxyXG59XG5cbmZ1bmN0aW9uIHBhcnNlKHVybCkge1xyXG4gICAgLy8gcmVtb3ZlIHN0YXJ0aW5nIC9cclxuICAgIGlmICh1cmxbMF0gPT09IFwiL1wiKSB7XHJcbiAgICAgICAgdXJsID0gdXJsLnN1YnN0cigxKTtcclxuICAgIH1cclxuICAgIC8vIHNwbGl0IHVybCBieSBcIi9cIlxyXG4gICAgY29uc3QgcGFydHMgPSB1cmwuc3BsaXQoXCIvXCIpO1xyXG4gICAgY29uc3QgY2h1bmtzID0gW107XHJcbiAgICAvLyBmb3IgZWFjaCBwYWdlIGluIHVybFxyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBwYXJ0cy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgIGNvbnN0IHRlc3QgPSBwYXJ0c1tpXTtcclxuICAgICAgICBjb25zdCByZXN1bHQgPSB7fTtcclxuICAgICAgICAvLyBkZXRlY3QgcGFyYW1zXHJcbiAgICAgICAgLy8gc3VwcG9ydCBvbGQgXHRcdFx0c29tZTphPWI6Yz1kXHJcbiAgICAgICAgLy8gYW5kIG5ldyBub3RhdGlvblx0XHRzb21lP2E9YiZjPWRcclxuICAgICAgICBsZXQgcG9zID0gdGVzdC5pbmRleE9mKFwiOlwiKTtcclxuICAgICAgICBpZiAocG9zID09PSAtMSkge1xyXG4gICAgICAgICAgICBwb3MgPSB0ZXN0LmluZGV4T2YoXCI/XCIpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAocG9zICE9PSAtMSkge1xyXG4gICAgICAgICAgICBjb25zdCBwYXJhbXMgPSB0ZXN0LnN1YnN0cihwb3MgKyAxKS5zcGxpdCgvW1xcOlxcP1xcJl0vZyk7XHJcbiAgICAgICAgICAgIC8vIGNyZWF0ZSBoYXNoIG9mIG5hbWVkIHBhcmFtc1xyXG4gICAgICAgICAgICBmb3IgKGNvbnN0IHBhcmFtIG9mIHBhcmFtcykge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgZGNodW5rID0gcGFyYW0uc3BsaXQoXCI9XCIpO1xyXG4gICAgICAgICAgICAgICAgcmVzdWx0W2RjaHVua1swXV0gPSBkZWNvZGVVUklDb21wb25lbnQoZGNodW5rWzFdKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICAvLyBzdG9yZSBwYXJzZWQgdmFsdWVzXHJcbiAgICAgICAgY2h1bmtzW2ldID0ge1xyXG4gICAgICAgICAgICBwYWdlOiAocG9zID4gLTEgPyB0ZXN0LnN1YnN0cigwLCBwb3MpIDogdGVzdCksXHJcbiAgICAgICAgICAgIHBhcmFtczogcmVzdWx0LFxyXG4gICAgICAgICAgICBpc05ldzogdHJ1ZVxyXG4gICAgICAgIH07XHJcbiAgICB9XHJcbiAgICAvLyByZXR1cm4gYXJyYXkgb2YgcGFnZSBvYmplY3RzXHJcbiAgICByZXR1cm4gY2h1bmtzO1xyXG59XHJcbmZ1bmN0aW9uIHVybDJzdHIoc3RhY2spIHtcclxuICAgIGNvbnN0IHVybCA9IFtdO1xyXG4gICAgZm9yIChjb25zdCBjaHVuayBvZiBzdGFjaykge1xyXG4gICAgICAgIHVybC5wdXNoKFwiL1wiICsgY2h1bmsucGFnZSk7XHJcbiAgICAgICAgY29uc3QgcGFyYW1zID0gb2JqMnN0cihjaHVuay5wYXJhbXMpO1xyXG4gICAgICAgIGlmIChwYXJhbXMpIHtcclxuICAgICAgICAgICAgdXJsLnB1c2goXCI/XCIgKyBwYXJhbXMpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiB1cmwuam9pbihcIlwiKTtcclxufVxyXG5mdW5jdGlvbiBvYmoyc3RyKG9iaikge1xyXG4gICAgY29uc3Qgc3RyID0gW107XHJcbiAgICBmb3IgKGNvbnN0IGtleSBpbiBvYmopIHtcclxuICAgICAgICBpZiAoc3RyLmxlbmd0aCkge1xyXG4gICAgICAgICAgICBzdHIucHVzaChcIiZcIik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHN0ci5wdXNoKGtleSArIFwiPVwiICsgZW5jb2RlVVJJQ29tcG9uZW50KG9ialtrZXldKSk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gc3RyLmpvaW4oXCJcIik7XHJcbn1cblxuY2xhc3MgUm91dGUge1xyXG4gICAgY29uc3RydWN0b3Iocm91dGUsIGluZGV4KSB7XHJcbiAgICAgICAgdGhpcy5fbmV4dCA9IDE7XHJcbiAgICAgICAgaWYgKHR5cGVvZiByb3V0ZSA9PT0gXCJzdHJpbmdcIikge1xyXG4gICAgICAgICAgICB0aGlzLnJvdXRlID0ge1xyXG4gICAgICAgICAgICAgICAgdXJsOiBwYXJzZShyb3V0ZSksXHJcbiAgICAgICAgICAgICAgICBwYXRoOiByb3V0ZVxyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5yb3V0ZSA9IHJvdXRlO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmluZGV4ID0gaW5kZXg7XHJcbiAgICB9XHJcbiAgICBjdXJyZW50KCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnJvdXRlLnVybFt0aGlzLmluZGV4XTtcclxuICAgIH1cclxuICAgIG5leHQoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMucm91dGUudXJsW3RoaXMuaW5kZXggKyB0aGlzLl9uZXh0XTtcclxuICAgIH1cclxuICAgIHN1YnVybCgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5yb3V0ZS51cmwuc2xpY2UodGhpcy5pbmRleCk7XHJcbiAgICB9XHJcbiAgICBzaGlmdCgpIHtcclxuICAgICAgICByZXR1cm4gbmV3IFJvdXRlKHRoaXMucm91dGUsIHRoaXMuaW5kZXggKyB0aGlzLl9uZXh0KTtcclxuICAgIH1cclxuICAgIHJlZnJlc2goKSB7XHJcbiAgICAgICAgY29uc3QgdXJsID0gdGhpcy5yb3V0ZS51cmw7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IHRoaXMuaW5kZXggKyAxOyBpIDwgdXJsLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIHVybFtpXS5pc05ldyA9IHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgdG9TdHJpbmcoKSB7XHJcbiAgICAgICAgY29uc3Qgc3RyID0gdXJsMnN0cih0aGlzLnN1YnVybCgpKTtcclxuICAgICAgICByZXR1cm4gc3RyID8gc3RyLnN1YnN0cigxKSA6IFwiXCI7XHJcbiAgICB9XHJcbiAgICBfam9pbihwYXRoLCBraWRzKSB7XHJcbiAgICAgICAgbGV0IHVybCA9IHRoaXMucm91dGUudXJsO1xyXG4gICAgICAgIGlmIChwYXRoID09PSBudWxsKSB7IC8vIGNoYW5nZSBvZiBwYXJhbWV0ZXJzLCByb3V0ZSBlbGVtZW50cyBhcmUgbm90IGFmZmVjdGVkXHJcbiAgICAgICAgICAgIHJldHVybiB1cmw7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNvbnN0IG9sZCA9IHRoaXMucm91dGUudXJsO1xyXG4gICAgICAgIHVybCA9IG9sZC5zbGljZSgwLCB0aGlzLmluZGV4ICsgKGtpZHMgPyB0aGlzLl9uZXh0IDogMCkpO1xyXG4gICAgICAgIGlmIChwYXRoKSB7XHJcbiAgICAgICAgICAgIHVybCA9IHVybC5jb25jYXQocGFyc2UocGF0aCkpO1xyXG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHVybC5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgaWYgKG9sZFtpXSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHVybFtpXS52aWV3ID0gb2xkW2ldLnZpZXc7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZiAob2xkW2ldICYmIHVybFtpXS5wYWdlID09PSBvbGRbaV0ucGFnZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHVybFtpXS5pc05ldyA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB1cmw7XHJcbiAgICB9XHJcbiAgICBhcHBlbmQocGF0aCkge1xyXG4gICAgICAgIGNvbnN0IHVybCA9IHRoaXMuX2pvaW4ocGF0aCwgdHJ1ZSk7XHJcbiAgICAgICAgdGhpcy5yb3V0ZS5wYXRoID0gdXJsMnN0cih1cmwpO1xyXG4gICAgICAgIHRoaXMucm91dGUudXJsID0gdXJsO1xyXG4gICAgICAgIHJldHVybiB0aGlzLnJvdXRlLnBhdGg7XHJcbiAgICB9XHJcbiAgICBzaG93KHBhdGgsIHZpZXcsIGtpZHMpIHtcclxuICAgICAgICBjb25zdCB1cmwgPSB0aGlzLl9qb2luKHBhdGgsIGtpZHMpO1xyXG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzLCByZWopID0+IHtcclxuICAgICAgICAgICAgY29uc3QgcmVkaXJlY3QgPSB1cmwyc3RyKHVybCk7XHJcbiAgICAgICAgICAgIGNvbnN0IG9iaiA9IHtcclxuICAgICAgICAgICAgICAgIHVybCxcclxuICAgICAgICAgICAgICAgIHJlZGlyZWN0LFxyXG4gICAgICAgICAgICAgICAgY29uZmlybTogUHJvbWlzZS5yZXNvbHZlKClcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgY29uc3QgYXBwID0gdmlldyA/IHZpZXcuYXBwIDogbnVsbDtcclxuICAgICAgICAgICAgLy8gd2hlbiBjcmVhdGluZyBhIG5ldyByb3V0ZSwgaXQgcG9zc2libGUgdGhhdCBpdCB3aWxsIG5vdCBoYXZlIGFueSBjb250ZW50XHJcbiAgICAgICAgICAgIC8vIGd1YXJkIGlzIG5vdCBuZWNlc3NhcnkgaW4gc3VjaCBjYXNlXHJcbiAgICAgICAgICAgIGlmIChhcHApIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHJlc3VsdCA9IGFwcC5jYWxsRXZlbnQoXCJhcHA6Z3VhcmRcIiwgW29iai5yZWRpcmVjdCwgdmlldywgb2JqXSk7XHJcbiAgICAgICAgICAgICAgICBpZiAoIXJlc3VsdCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJlaihuZXcgTmF2aWdhdGlvbkJsb2NrZWQoKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIG9iai5jb25maXJtLmNhdGNoKGVyciA9PiByZWooZXJyKSkudGhlbigoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAob2JqLnJlZGlyZWN0ID09PSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVqKG5ldyBOYXZpZ2F0aW9uQmxvY2tlZCgpKTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZiAob2JqLnJlZGlyZWN0ICE9PSByZWRpcmVjdCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGFwcC5zaG93KG9iai5yZWRpcmVjdCk7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVqKG5ldyBOYXZpZ2F0aW9uQmxvY2tlZCgpKTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB0aGlzLnJvdXRlLnBhdGggPSByZWRpcmVjdDtcclxuICAgICAgICAgICAgICAgIHRoaXMucm91dGUudXJsID0gdXJsO1xyXG4gICAgICAgICAgICAgICAgcmVzKCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgc2l6ZShuKSB7XHJcbiAgICAgICAgdGhpcy5fbmV4dCA9IG47XHJcbiAgICB9XHJcbiAgICBzcGxpdCgpIHtcclxuICAgICAgICBjb25zdCByb3V0ZSA9IHtcclxuICAgICAgICAgICAgdXJsOiB0aGlzLnJvdXRlLnVybC5zbGljZSh0aGlzLmluZGV4ICsgMSksXHJcbiAgICAgICAgICAgIHBhdGg6IFwiXCJcclxuICAgICAgICB9O1xyXG4gICAgICAgIGlmIChyb3V0ZS51cmwubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgIHJvdXRlLnBhdGggPSB1cmwyc3RyKHJvdXRlLnVybCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBuZXcgUm91dGUocm91dGUsIDApO1xyXG4gICAgfVxyXG4gICAgdXBkYXRlKG5hbWUsIHZhbHVlLCBpbmRleCkge1xyXG4gICAgICAgIGNvbnN0IGNodW5rID0gdGhpcy5yb3V0ZS51cmxbdGhpcy5pbmRleCArIChpbmRleCB8fCAwKV07XHJcbiAgICAgICAgaWYgKCFjaHVuaykge1xyXG4gICAgICAgICAgICB0aGlzLnJvdXRlLnVybC5wdXNoKHsgcGFnZTogXCJcIiwgcGFyYW1zOiB7fSB9KTtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMudXBkYXRlKG5hbWUsIHZhbHVlLCBpbmRleCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChuYW1lID09PSBcIlwiKSB7XHJcbiAgICAgICAgICAgIGNodW5rLnBhZ2UgPSB2YWx1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIGNodW5rLnBhcmFtc1tuYW1lXSA9IHZhbHVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLnJvdXRlLnBhdGggPSB1cmwyc3RyKHRoaXMucm91dGUudXJsKTtcclxuICAgIH1cclxufVxuXG5jbGFzcyBKZXRWaWV3IGV4dGVuZHMgSmV0QmFzZSB7XHJcbiAgICBjb25zdHJ1Y3RvcihhcHAsIGNvbmZpZykge1xyXG4gICAgICAgIHN1cGVyKGFwcC53ZWJpeCk7XHJcbiAgICAgICAgdGhpcy5hcHAgPSBhcHA7XHJcbiAgICAgICAgLy90aGlzLiRjb25maWcgPSBjb25maWc7XHJcbiAgICAgICAgdGhpcy5fY2hpbGRyZW4gPSBbXTtcclxuICAgIH1cclxuICAgIHVpKHVpLCBjb25maWcpIHtcclxuICAgICAgICBjb25maWcgPSBjb25maWcgfHwge307XHJcbiAgICAgICAgY29uc3QgY29udGFpbmVyID0gY29uZmlnLmNvbnRhaW5lciB8fCB1aS5jb250YWluZXI7XHJcbiAgICAgICAgY29uc3QgamV0dmlldyA9IHRoaXMuYXBwLmNyZWF0ZVZpZXcodWkpO1xyXG4gICAgICAgIHRoaXMuX2NoaWxkcmVuLnB1c2goamV0dmlldyk7XHJcbiAgICAgICAgamV0dmlldy5yZW5kZXIoY29udGFpbmVyLCB0aGlzLl9zZWdtZW50LCB0aGlzKTtcclxuICAgICAgICBpZiAodHlwZW9mIHVpICE9PSBcIm9iamVjdFwiIHx8ICh1aSBpbnN0YW5jZW9mIEpldEJhc2UpKSB7XHJcbiAgICAgICAgICAgIC8vIHJhdyB3ZWJpeCBVSVxyXG4gICAgICAgICAgICByZXR1cm4gamV0dmlldztcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIHJldHVybiBqZXR2aWV3LmdldFJvb3QoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBzaG93KHBhdGgsIGNvbmZpZykge1xyXG4gICAgICAgIGNvbmZpZyA9IGNvbmZpZyB8fCB7fTtcclxuICAgICAgICAvLyBjb252ZXJ0IHBhcmFtZXRlcnMgb2JqZWN0IHRvIHVybFxyXG4gICAgICAgIGlmICh0eXBlb2YgcGF0aCA9PT0gXCJvYmplY3RcIikge1xyXG4gICAgICAgICAgICBmb3IgKGNvbnN0IGtleSBpbiBwYXRoKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNldFBhcmFtKGtleSwgcGF0aFtrZXldKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBwYXRoID0gbnVsbDtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIC8vIGRlbGlnYXRlIHRvIGFwcCBpbiBjYXNlIG9mIHJvb3QgcHJlZml4XHJcbiAgICAgICAgICAgIGlmIChwYXRoLnN1YnN0cigwLCAxKSA9PT0gXCIvXCIpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmFwcC5zaG93KHBhdGgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIC8vIGxvY2FsIHBhdGgsIGRvIG5vdGhpbmdcclxuICAgICAgICAgICAgaWYgKHBhdGguaW5kZXhPZihcIi4vXCIpID09PSAwKSB7XHJcbiAgICAgICAgICAgICAgICBwYXRoID0gcGF0aC5zdWJzdHIoMik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgLy8gcGFyZW50IHBhdGgsIGNhbGwgcGFyZW50IHZpZXdcclxuICAgICAgICAgICAgaWYgKHBhdGguaW5kZXhPZihcIi4uL1wiKSA9PT0gMCkge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgcGFyZW50ID0gdGhpcy5nZXRQYXJlbnRWaWV3KCk7XHJcbiAgICAgICAgICAgICAgICBpZiAocGFyZW50KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHBhcmVudC5zaG93KHBhdGguc3Vic3RyKDMpLCBjb25maWcpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuYXBwLnNob3coXCIvXCIgKyBwYXRoLnN1YnN0cigzKSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY29uc3Qgc3ViID0gdGhpcy5nZXRTdWJWaWV3SW5mbyhjb25maWcudGFyZ2V0KTtcclxuICAgICAgICAgICAgaWYgKHN1Yikge1xyXG4gICAgICAgICAgICAgICAgaWYgKHN1Yi5wYXJlbnQgIT09IHRoaXMpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gc3ViLnBhcmVudC5zaG93KHBhdGgsIGNvbmZpZyk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlIGlmIChjb25maWcudGFyZ2V0ICYmIGNvbmZpZy50YXJnZXQgIT09IFwiZGVmYXVsdFwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3JlbmRlckZyYW1lTG9jayhjb25maWcudGFyZ2V0LCBzdWIuc3VidmlldywgcGF0aCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBpZiAocGF0aCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmFwcC5zaG93KFwiL1wiICsgcGF0aCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX3Nob3codGhpcy5fc2VnbWVudCwgcGF0aCwgdGhpcyk7XHJcbiAgICB9XHJcbiAgICBfc2hvdyhzZWdtZW50LCBwYXRoLCB2aWV3KSB7XHJcbiAgICAgICAgcmV0dXJuIHNlZ21lbnQuc2hvdyhwYXRoLCB2aWV3LCB0cnVlKS50aGVuKCgpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5faW5pdF91cmxfZGF0YSgpO1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fdXJsQ2hhbmdlKCk7XHJcbiAgICAgICAgfSkudGhlbigoKSA9PiB7XHJcbiAgICAgICAgICAgIGlmIChzZWdtZW50LnJvdXRlLmxpbmtSb3V0ZXIpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuYXBwLmdldFJvdXRlcigpLnNldChzZWdtZW50LnJvdXRlLnBhdGgsIHsgc2lsZW50OiB0cnVlIH0pO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5hcHAuY2FsbEV2ZW50KFwiYXBwOnJvdXRlXCIsIFtzZWdtZW50LnJvdXRlLnBhdGhdKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgaW5pdChfJHZpZXcsIF8kKSB7XHJcbiAgICAgICAgLy8gc3R1YlxyXG4gICAgfVxyXG4gICAgcmVhZHkoXyR2aWV3LCBfJHVybCkge1xyXG4gICAgICAgIC8vIHN0dWJcclxuICAgIH1cclxuICAgIGNvbmZpZygpIHtcclxuICAgICAgICB0aGlzLmFwcC53ZWJpeC5tZXNzYWdlKFwiVmlldzpDb25maWcgaXMgbm90IGltcGxlbWVudGVkXCIpO1xyXG4gICAgfVxyXG4gICAgdXJsQ2hhbmdlKF8kdmlldywgXyR1cmwpIHtcclxuICAgICAgICAvLyBzdHViXHJcbiAgICB9XHJcbiAgICBkZXN0cm95KCkge1xyXG4gICAgICAgIC8vIHN0dWJcclxuICAgIH1cclxuICAgIGRlc3RydWN0b3IoKSB7XHJcbiAgICAgICAgdGhpcy5kZXN0cm95KCk7XHJcbiAgICAgICAgdGhpcy5fZGVzdHJveUtpZHMoKTtcclxuICAgICAgICAvLyBkZXN0cm95IGFjdHVhbCBVSVxyXG4gICAgICAgIHRoaXMuX3Jvb3QuZGVzdHJ1Y3RvcigpO1xyXG4gICAgICAgIHN1cGVyLmRlc3RydWN0b3IoKTtcclxuICAgIH1cclxuICAgIHVzZShwbHVnaW4sIGNvbmZpZykge1xyXG4gICAgICAgIHBsdWdpbih0aGlzLmFwcCwgdGhpcywgY29uZmlnKTtcclxuICAgIH1cclxuICAgIHJlZnJlc2goKSB7XHJcbiAgICAgICAgY29uc3QgdXJsID0gdGhpcy5nZXRVcmwoKTtcclxuICAgICAgICB0aGlzLmRlc3Ryb3koKTtcclxuICAgICAgICB0aGlzLl9kZXN0cm95S2lkcygpO1xyXG4gICAgICAgIHRoaXMuX2Rlc3Ryb3lTdWJzKCk7XHJcbiAgICAgICAgdGhpcy5fZGV0YWNoRXZlbnRzKCk7XHJcbiAgICAgICAgaWYgKHRoaXMuX2NvbnRhaW5lci50YWdOYW1lKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX3Jvb3QuZGVzdHJ1Y3RvcigpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLl9zZWdtZW50LnJlZnJlc2goKTtcclxuICAgICAgICByZXR1cm4gdGhpcy5fcmVuZGVyKHRoaXMuX3NlZ21lbnQpO1xyXG4gICAgfVxyXG4gICAgcmVuZGVyKHJvb3QsIHVybCwgcGFyZW50KSB7XHJcbiAgICAgICAgaWYgKHR5cGVvZiB1cmwgPT09IFwic3RyaW5nXCIpIHtcclxuICAgICAgICAgICAgdXJsID0gbmV3IFJvdXRlKHVybCwgMCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuX3NlZ21lbnQgPSB1cmw7XHJcbiAgICAgICAgdGhpcy5fcGFyZW50ID0gcGFyZW50O1xyXG4gICAgICAgIHRoaXMuX2luaXRfdXJsX2RhdGEoKTtcclxuICAgICAgICByb290ID0gcm9vdCB8fCBkb2N1bWVudC5ib2R5O1xyXG4gICAgICAgIGNvbnN0IF9jb250YWluZXIgPSAodHlwZW9mIHJvb3QgPT09IFwic3RyaW5nXCIpID8gdGhpcy53ZWJpeC50b05vZGUocm9vdCkgOiByb290O1xyXG4gICAgICAgIGlmICh0aGlzLl9jb250YWluZXIgIT09IF9jb250YWluZXIpIHtcclxuICAgICAgICAgICAgdGhpcy5fY29udGFpbmVyID0gX2NvbnRhaW5lcjtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3JlbmRlcih1cmwpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3VybENoYW5nZSgpLnRoZW4oKCkgPT4gdGhpcy5nZXRSb290KCkpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIF9yZW5kZXIodXJsKSB7XHJcbiAgICAgICAgY29uc3QgY29uZmlnID0gdGhpcy5jb25maWcoKTtcclxuICAgICAgICBpZiAoY29uZmlnLnRoZW4pIHtcclxuICAgICAgICAgICAgcmV0dXJuIGNvbmZpZy50aGVuKGNmZyA9PiB0aGlzLl9yZW5kZXJfZmluYWwoY2ZnLCB1cmwpKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9yZW5kZXJfZmluYWwoY29uZmlnLCB1cmwpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIF9yZW5kZXJfZmluYWwoY29uZmlnLCB1cmwpIHtcclxuICAgICAgICAvLyBnZXQgcHJldmlvdXMgdmlldyBpbiB0aGUgc2FtZSBzbG90XHJcbiAgICAgICAgbGV0IHNsb3QgPSBudWxsO1xyXG4gICAgICAgIGxldCBjb250YWluZXIgPSBudWxsO1xyXG4gICAgICAgIGxldCBzaG93ID0gZmFsc2U7XHJcbiAgICAgICAgaWYgKCF0aGlzLl9jb250YWluZXIudGFnTmFtZSkge1xyXG4gICAgICAgICAgICBzbG90ID0gdGhpcy5fY29udGFpbmVyO1xyXG4gICAgICAgICAgICBpZiAoc2xvdC5wb3B1cCkge1xyXG4gICAgICAgICAgICAgICAgY29udGFpbmVyID0gZG9jdW1lbnQuYm9keTtcclxuICAgICAgICAgICAgICAgIHNob3cgPSB0cnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgY29udGFpbmVyID0gdGhpcy53ZWJpeC4kJChzbG90LmlkKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgY29udGFpbmVyID0gdGhpcy5fY29udGFpbmVyO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvLyB2aWV3IGFscmVhZHkgZGVzdHJveWVkXHJcbiAgICAgICAgaWYgKCF0aGlzLmFwcCB8fCAhY29udGFpbmVyKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdChudWxsKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IHJlc3BvbnNlO1xyXG4gICAgICAgIGNvbnN0IGN1cnJlbnQgPSB0aGlzLl9zZWdtZW50LmN1cnJlbnQoKTtcclxuICAgICAgICAvLyB1c2luZyB3cmFwcGVyIG9iamVjdCwgc28gdWkgY2FuIGJlIGNoYW5nZWQgZnJvbSBhcHA6cmVuZGVyIGV2ZW50XHJcbiAgICAgICAgY29uc3QgcmVzdWx0ID0geyB1aToge30gfTtcclxuICAgICAgICB0aGlzLmFwcC5jb3B5Q29uZmlnKGNvbmZpZywgcmVzdWx0LnVpLCB0aGlzLl9zdWJzKTtcclxuICAgICAgICB0aGlzLmFwcC5jYWxsRXZlbnQoXCJhcHA6cmVuZGVyXCIsIFt0aGlzLCB1cmwsIHJlc3VsdF0pO1xyXG4gICAgICAgIHJlc3VsdC51aS4kc2NvcGUgPSB0aGlzO1xyXG4gICAgICAgIC8qIGRlc3Ryb3kgb2xkIEhUTUwgYXR0YWNoZWQgdmlld3MgYmVmb3JlIGNyZWF0aW5nIG5ldyBvbmUgKi9cclxuICAgICAgICBpZiAoIXNsb3QgJiYgY3VycmVudC5pc05ldyAmJiBjdXJyZW50LnZpZXcpIHtcclxuICAgICAgICAgICAgY3VycmVudC52aWV3LmRlc3RydWN0b3IoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgLy8gc3BlY2lhbCBoYW5kbGluZyBmb3IgYWRkaW5nIGluc2lkZSBvZiBtdWx0aXZpZXcgLSBwcmVzZXJ2ZSBvbGQgaWRcclxuICAgICAgICAgICAgaWYgKHNsb3QgJiYgIXNob3cpIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IG9sZHVpID0gY29udGFpbmVyO1xyXG4gICAgICAgICAgICAgICAgY29uc3QgcGFyZW50ID0gb2xkdWkuZ2V0UGFyZW50VmlldygpO1xyXG4gICAgICAgICAgICAgICAgaWYgKHBhcmVudCAmJiBwYXJlbnQubmFtZSA9PT0gXCJtdWx0aXZpZXdcIiAmJiAhcmVzdWx0LnVpLmlkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0LnVpLmlkID0gb2xkdWkuY29uZmlnLmlkO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMuX3Jvb3QgPSB0aGlzLmFwcC53ZWJpeC51aShyZXN1bHQudWksIGNvbnRhaW5lcik7XHJcbiAgICAgICAgICAgIGNvbnN0IGFzV2luID0gdGhpcy5fcm9vdDtcclxuICAgICAgICAgICAgLy8gY2hlY2sgZm9yIHVybCBhZGRlZCB0byBpZ25vcmUgdGhpcy51aSBjYWxsc1xyXG4gICAgICAgICAgICBpZiAoc2hvdyAmJiBhc1dpbi5zZXRQb3NpdGlvbiAmJiAhYXNXaW4uaXNWaXNpYmxlKCkpIHtcclxuICAgICAgICAgICAgICAgIGFzV2luLnNob3coKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAvLyBjaGVjaywgaWYgd2UgYXJlIHJlcGxhY2luZyBzb21lIG9sZGVyIHZpZXdcclxuICAgICAgICAgICAgaWYgKHNsb3QpIHtcclxuICAgICAgICAgICAgICAgIGlmIChzbG90LnZpZXcgJiYgc2xvdC52aWV3ICE9PSB0aGlzICYmIHNsb3QudmlldyAhPT0gdGhpcy5hcHApIHtcclxuICAgICAgICAgICAgICAgICAgICBzbG90LnZpZXcuZGVzdHJ1Y3RvcigpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgc2xvdC5pZCA9IHRoaXMuX3Jvb3QuY29uZmlnLmlkO1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuZ2V0UGFyZW50VmlldygpIHx8ICF0aGlzLmFwcC5hcHApXHJcbiAgICAgICAgICAgICAgICAgICAgc2xvdC52aWV3ID0gdGhpcztcclxuICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIHdoZW4gd2UgaGF2ZSBzdWJhcHAsIHNldCB3aG9sZSBhcHAgYXMgYSB2aWV3XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gc28gb24gZGVzdHJ1Y3Rpb24sIHRoZSB3aG9sZSBhcHAgd2lsbCBiZSBkZXN0cm95ZWRcclxuICAgICAgICAgICAgICAgICAgICBzbG90LnZpZXcgPSB0aGlzLmFwcDtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoY3VycmVudC5pc05ldykge1xyXG4gICAgICAgICAgICAgICAgY3VycmVudC52aWV3ID0gdGhpcztcclxuICAgICAgICAgICAgICAgIGN1cnJlbnQuaXNOZXcgPSBmYWxzZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXNwb25zZSA9IFByb21pc2UucmVzb2x2ZSh0aGlzLl9pbml0KHRoaXMuX3Jvb3QsIHVybCkpLnRoZW4oKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3VybENoYW5nZSgpLnRoZW4oKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2luaXRVcmwgPSBudWxsO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLnJlYWR5KHRoaXMuX3Jvb3QsIHVybC5zdWJ1cmwoKSk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNhdGNoIChlKSB7XHJcbiAgICAgICAgICAgIHJlc3BvbnNlID0gUHJvbWlzZS5yZWplY3QoZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiByZXNwb25zZS5jYXRjaChlcnIgPT4gdGhpcy5faW5pdEVycm9yKHRoaXMsIGVycikpO1xyXG4gICAgfVxyXG4gICAgX2luaXQodmlldywgdXJsKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuaW5pdCh2aWV3LCB1cmwuc3VidXJsKCkpO1xyXG4gICAgfVxyXG4gICAgX3VybENoYW5nZSgpIHtcclxuICAgICAgICB0aGlzLmFwcC5jYWxsRXZlbnQoXCJhcHA6dXJsY2hhbmdlXCIsIFt0aGlzLCB0aGlzLl9zZWdtZW50XSk7XHJcbiAgICAgICAgY29uc3Qgd2FpdHMgPSBbXTtcclxuICAgICAgICBmb3IgKGNvbnN0IGtleSBpbiB0aGlzLl9zdWJzKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGZyYW1lID0gdGhpcy5fc3Vic1trZXldO1xyXG4gICAgICAgICAgICBjb25zdCB3YWl0ID0gdGhpcy5fcmVuZGVyRnJhbWVMb2NrKGtleSwgZnJhbWUsIG51bGwpO1xyXG4gICAgICAgICAgICBpZiAod2FpdCkge1xyXG4gICAgICAgICAgICAgICAgd2FpdHMucHVzaCh3YWl0KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gUHJvbWlzZS5hbGwod2FpdHMpLnRoZW4oKCkgPT4ge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy51cmxDaGFuZ2UodGhpcy5fcm9vdCwgdGhpcy5fc2VnbWVudC5zdWJ1cmwoKSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICBfcmVuZGVyRnJhbWVMb2NrKGtleSwgZnJhbWUsIHBhdGgpIHtcclxuICAgICAgICAvLyBpZiBzdWJ2aWV3IGlzIG5vdCBvY2N1cGllZCBieSBzb21lIHJlbmRlcmluZyB5ZXRcclxuICAgICAgICBpZiAoIWZyYW1lLmxvY2spIHtcclxuICAgICAgICAgICAgLy8gcmV0cmVpdmUgYW5kIHN0b3JlIHJlbmRlcmluZyBlbmQgcHJvbWlzZVxyXG4gICAgICAgICAgICBjb25zdCBsb2NrID0gdGhpcy5fcmVuZGVyRnJhbWUoa2V5LCBmcmFtZSwgcGF0aCk7XHJcbiAgICAgICAgICAgIGlmIChsb2NrKSB7XHJcbiAgICAgICAgICAgICAgICAvLyBjbGVhciBsb2NrIGFmdGVyIGZyYW1lIHJlbmRlcmluZ1xyXG4gICAgICAgICAgICAgICAgLy8gYXMgcHJvbWlzZS5maW5hbGx5IGlzIG5vdCBzdXBwb3J0ZWQgYnkgIFdlYml4IGxlc3NlciB0aGFuIDYuMlxyXG4gICAgICAgICAgICAgICAgLy8gdXNpbmcgYSBtb3JlIHZlcmJvc2Ugbm90YXRpb25cclxuICAgICAgICAgICAgICAgIGZyYW1lLmxvY2sgPSBsb2NrLnRoZW4oKCkgPT4gZnJhbWUubG9jayA9IG51bGwsICgpID0+IGZyYW1lLmxvY2sgPSBudWxsKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICAvLyByZXR1cm4gcmVuZGVyaW5nIGVuZCBwcm9taXNlXHJcbiAgICAgICAgcmV0dXJuIGZyYW1lLmxvY2s7XHJcbiAgICB9XHJcbiAgICBfcmVuZGVyRnJhbWUoa2V5LCBmcmFtZSwgcGF0aCkge1xyXG4gICAgICAgIC8vZGVmYXVsdCByb3V0ZVxyXG4gICAgICAgIGlmIChrZXkgPT09IFwiZGVmYXVsdFwiKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLl9zZWdtZW50Lm5leHQoKSkge1xyXG4gICAgICAgICAgICAgICAgLy8gd2UgaGF2ZSBhIG5leHQgc2VnbWVudCBpbiB1cmwsIHJlbmRlciBpdFxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2NyZWF0ZVN1YlZpZXcoZnJhbWUsIHRoaXMuX3NlZ21lbnQuc2hpZnQoKSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSBpZiAoZnJhbWUudmlldyAmJiBmcmFtZS5wb3B1cCkge1xyXG4gICAgICAgICAgICAgICAgLy8gdGhlcmUgaXMgbm8gbmV4dCBzZWdtZW50LCBkZWxldGUgdGhlIGV4aXN0aW5nIHN1Yi12aWV3XHJcbiAgICAgICAgICAgICAgICBmcmFtZS52aWV3LmRlc3RydWN0b3IoKTtcclxuICAgICAgICAgICAgICAgIGZyYW1lLnZpZXcgPSBudWxsO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vaWYgbmV3IHBhdGggcHJvdmlkZWQsIHNldCBpdCB0byB0aGUgZnJhbWVcclxuICAgICAgICBpZiAocGF0aCAhPT0gbnVsbCkge1xyXG4gICAgICAgICAgICBmcmFtZS51cmwgPSBwYXRoO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvLyBpbiBjYXNlIG9mIHJvdXRlZCBzdWItdmlld1xyXG4gICAgICAgIGlmIChmcmFtZS5yb3V0ZSkge1xyXG4gICAgICAgICAgICAvLyB3ZSBoYXZlIGEgbmV3IHBhdGggZm9yIHN1Yi12aWV3XHJcbiAgICAgICAgICAgIGlmIChwYXRoICE9PSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZnJhbWUucm91dGUuc2hvdyhwYXRoLCBmcmFtZS52aWV3KS50aGVuKCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fY3JlYXRlU3ViVmlldyhmcmFtZSwgZnJhbWUucm91dGUpO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgLy8gZG8gbm90IHRyaWdnZXIgb25DaGFuZ2UgZm9yIGlzb2xhdGVkIHN1Yi12aWV3c1xyXG4gICAgICAgICAgICBpZiAoZnJhbWUuYnJhbmNoKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IHZpZXcgPSBmcmFtZS52aWV3O1xyXG4gICAgICAgIC8vIGlmIHZpZXcgZG9lc24ndCBleGlzdHMgeWV0LCBpbml0IGl0XHJcbiAgICAgICAgaWYgKCF2aWV3ICYmIGZyYW1lLnVybCkge1xyXG4gICAgICAgICAgICBpZiAodHlwZW9mIGZyYW1lLnVybCA9PT0gXCJzdHJpbmdcIikge1xyXG4gICAgICAgICAgICAgICAgLy8gc3RyaW5nLCBzbyB3ZSBoYXZlIGlzb2xhdGVkIHN1YnZpZXcgdXJsXHJcbiAgICAgICAgICAgICAgICBmcmFtZS5yb3V0ZSA9IG5ldyBSb3V0ZShmcmFtZS51cmwsIDApO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2NyZWF0ZVN1YlZpZXcoZnJhbWUsIGZyYW1lLnJvdXRlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIC8vIG9iamVjdCwgc28gd2UgaGF2ZSBhbiBlbWJlZGVkIHN1YnZpZXdcclxuICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgZnJhbWUudXJsID09PSBcImZ1bmN0aW9uXCIgJiYgISh2aWV3IGluc3RhbmNlb2YgZnJhbWUudXJsKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHZpZXcgPSBuZXcgZnJhbWUudXJsKHRoaXMuYXBwLCBcIlwiKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmICghdmlldykge1xyXG4gICAgICAgICAgICAgICAgICAgIHZpZXcgPSBmcmFtZS51cmw7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gdHJpZ2dlciBvbkNoYW5nZSBmb3IgYWxyZWFkeSBleGlzdGVkIHZpZXdcclxuICAgICAgICBpZiAodmlldykge1xyXG4gICAgICAgICAgICByZXR1cm4gdmlldy5yZW5kZXIoZnJhbWUsIChmcmFtZS5yb3V0ZSB8fCB0aGlzLl9zZWdtZW50KSwgdGhpcyk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgX2luaXRFcnJvcih2aWV3LCBlcnIpIHtcclxuICAgICAgICAvKlxyXG4gICAgICAgICAgICBpZiB2aWV3IGlzIGRlc3Ryb3llZCwgaWdub3JlIGFueSB2aWV3IHJlbGF0ZWQgZXJyb3JzXHJcbiAgICAgICAgKi9cclxuICAgICAgICBpZiAodGhpcy5hcHApIHtcclxuICAgICAgICAgICAgdGhpcy5hcHAuZXJyb3IoXCJhcHA6ZXJyb3I6aW5pdHZpZXdcIiwgW2Vyciwgdmlld10pO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH1cclxuICAgIF9jcmVhdGVTdWJWaWV3KHN1Yiwgc3VidXJsKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuYXBwLmNyZWF0ZUZyb21VUkwoc3VidXJsLmN1cnJlbnQoKSkudGhlbih2aWV3ID0+IHtcclxuICAgICAgICAgICAgcmV0dXJuIHZpZXcucmVuZGVyKHN1Yiwgc3VidXJsLCB0aGlzKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuICAgIF9kZXN0cm95S2lkcygpIHtcclxuICAgICAgICAvLyBkZXN0cm95IGNoaWxkIHZpZXdzXHJcbiAgICAgICAgY29uc3QgdWlzID0gdGhpcy5fY2hpbGRyZW47XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IHVpcy5sZW5ndGggLSAxOyBpID49IDA7IGktLSkge1xyXG4gICAgICAgICAgICBpZiAodWlzW2ldICYmIHVpc1tpXS5kZXN0cnVjdG9yKSB7XHJcbiAgICAgICAgICAgICAgICB1aXNbaV0uZGVzdHJ1Y3RvcigpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIHJlc2V0IHZhcnMgZm9yIGJldHRlciBHQyBwcm9jZXNzaW5nXHJcbiAgICAgICAgdGhpcy5fY2hpbGRyZW4gPSBbXTtcclxuICAgIH1cclxufVxuXG4vLyB3cmFwcGVyIGZvciByYXcgb2JqZWN0cyBhbmQgSmV0IDEueCBzdHJ1Y3RzXHJcbmNsYXNzIEpldFZpZXdSYXcgZXh0ZW5kcyBKZXRWaWV3IHtcclxuICAgIGNvbnN0cnVjdG9yKGFwcCwgY29uZmlnKSB7XHJcbiAgICAgICAgc3VwZXIoYXBwLCBjb25maWcpO1xyXG4gICAgICAgIHRoaXMuX3VpID0gY29uZmlnLnVpO1xyXG4gICAgfVxyXG4gICAgY29uZmlnKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl91aTtcclxuICAgIH1cclxufVxuXG5jbGFzcyBTdWJSb3V0ZXIge1xyXG4gICAgY29uc3RydWN0b3IoY2IsIGNvbmZpZywgYXBwKSB7XHJcbiAgICAgICAgdGhpcy5wYXRoID0gXCJcIjtcclxuICAgICAgICB0aGlzLmFwcCA9IGFwcDtcclxuICAgIH1cclxuICAgIHNldChwYXRoLCBjb25maWcpIHtcclxuICAgICAgICB0aGlzLnBhdGggPSBwYXRoO1xyXG4gICAgICAgIGNvbnN0IGEgPSB0aGlzLmFwcDtcclxuICAgICAgICBhLmFwcC5nZXRSb3V0ZXIoKS5zZXQoYS5fc2VnbWVudC5hcHBlbmQodGhpcy5wYXRoKSwgeyBzaWxlbnQ6IHRydWUgfSk7XHJcbiAgICB9XHJcbiAgICBnZXQoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMucGF0aDtcclxuICAgIH1cclxufVxuXG5sZXQgX29uY2UgPSB0cnVlO1xyXG5jbGFzcyBKZXRBcHBCYXNlIGV4dGVuZHMgSmV0QmFzZSB7XHJcbiAgICBjb25zdHJ1Y3Rvcihjb25maWcpIHtcclxuICAgICAgICBjb25zdCB3ZWJpeCA9IChjb25maWcgfHwge30pLndlYml4IHx8IHdpbmRvdy53ZWJpeDtcclxuICAgICAgICBzdXBlcih3ZWJpeCk7XHJcbiAgICAgICAgLy8gaW5pdCBjb25maWdcclxuICAgICAgICB0aGlzLmNvbmZpZyA9IHRoaXMud2ViaXguZXh0ZW5kKHtcclxuICAgICAgICAgICAgbmFtZTogXCJBcHBcIixcclxuICAgICAgICAgICAgdmVyc2lvbjogXCIxLjBcIixcclxuICAgICAgICAgICAgc3RhcnQ6IFwiL2hvbWVcIlxyXG4gICAgICAgIH0sIGNvbmZpZywgdHJ1ZSk7XHJcbiAgICAgICAgdGhpcy5hcHAgPSB0aGlzLmNvbmZpZy5hcHA7XHJcbiAgICAgICAgdGhpcy5yZWFkeSA9IFByb21pc2UucmVzb2x2ZSgpO1xyXG4gICAgICAgIHRoaXMuX3NlcnZpY2VzID0ge307XHJcbiAgICAgICAgdGhpcy53ZWJpeC5leHRlbmQodGhpcywgdGhpcy53ZWJpeC5FdmVudFN5c3RlbSk7XHJcbiAgICB9XHJcbiAgICBnZXRVcmwoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX3N1YlNlZ21lbnQuc3VidXJsKCk7XHJcbiAgICB9XHJcbiAgICBnZXRVcmxTdHJpbmcoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX3N1YlNlZ21lbnQudG9TdHJpbmcoKTtcclxuICAgIH1cclxuICAgIGdldFNlcnZpY2UobmFtZSkge1xyXG4gICAgICAgIGxldCBvYmogPSB0aGlzLl9zZXJ2aWNlc1tuYW1lXTtcclxuICAgICAgICBpZiAodHlwZW9mIG9iaiA9PT0gXCJmdW5jdGlvblwiKSB7XHJcbiAgICAgICAgICAgIG9iaiA9IHRoaXMuX3NlcnZpY2VzW25hbWVdID0gb2JqKHRoaXMpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gb2JqO1xyXG4gICAgfVxyXG4gICAgc2V0U2VydmljZShuYW1lLCBoYW5kbGVyKSB7XHJcbiAgICAgICAgdGhpcy5fc2VydmljZXNbbmFtZV0gPSBoYW5kbGVyO1xyXG4gICAgfVxyXG4gICAgZGVzdHJ1Y3RvcigpIHtcclxuICAgICAgICB0aGlzLmdldFN1YlZpZXcoKS5kZXN0cnVjdG9yKCk7XHJcbiAgICAgICAgc3VwZXIuZGVzdHJ1Y3RvcigpO1xyXG4gICAgfVxyXG4gICAgLy8gY29weSBvYmplY3QgYW5kIGNvbGxlY3QgZXh0cmEgaGFuZGxlcnNcclxuICAgIGNvcHlDb25maWcob2JqLCB0YXJnZXQsIGNvbmZpZykge1xyXG4gICAgICAgIC8vIHJhdyB1aSBjb25maWdcclxuICAgICAgICBpZiAob2JqIGluc3RhbmNlb2YgSmV0QmFzZSB8fFxyXG4gICAgICAgICAgICAodHlwZW9mIG9iaiA9PT0gXCJmdW5jdGlvblwiICYmIG9iai5wcm90b3R5cGUgaW5zdGFuY2VvZiBKZXRCYXNlKSkge1xyXG4gICAgICAgICAgICBvYmogPSB7ICRzdWJ2aWV3OiBvYmogfTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gc3VidmlldyBwbGFjZWhvbGRlclxyXG4gICAgICAgIGlmICh0eXBlb2Ygb2JqLiRzdWJ2aWV3ICE9IFwidW5kZWZpbmVkXCIpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuYWRkU3ViVmlldyhvYmosIHRhcmdldCwgY29uZmlnKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gcHJvY2VzcyBzdWItcHJvcGVydGllc1xyXG4gICAgICAgIHRhcmdldCA9IHRhcmdldCB8fCAob2JqIGluc3RhbmNlb2YgQXJyYXkgPyBbXSA6IHt9KTtcclxuICAgICAgICBmb3IgKGNvbnN0IG1ldGhvZCBpbiBvYmopIHtcclxuICAgICAgICAgICAgbGV0IHBvaW50ID0gb2JqW21ldGhvZF07XHJcbiAgICAgICAgICAgIC8vIHZpZXcgY2xhc3NcclxuICAgICAgICAgICAgaWYgKHR5cGVvZiBwb2ludCA9PT0gXCJmdW5jdGlvblwiICYmIHBvaW50LnByb3RvdHlwZSBpbnN0YW5jZW9mIEpldEJhc2UpIHtcclxuICAgICAgICAgICAgICAgIHBvaW50ID0geyAkc3VidmlldzogcG9pbnQgfTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAocG9pbnQgJiYgdHlwZW9mIHBvaW50ID09PSBcIm9iamVjdFwiICYmXHJcbiAgICAgICAgICAgICAgICAhKHBvaW50IGluc3RhbmNlb2YgdGhpcy53ZWJpeC5EYXRhQ29sbGVjdGlvbikgJiYgIShwb2ludCBpbnN0YW5jZW9mIFJlZ0V4cCkpIHtcclxuICAgICAgICAgICAgICAgIGlmIChwb2ludCBpbnN0YW5jZW9mIERhdGUpIHtcclxuICAgICAgICAgICAgICAgICAgICB0YXJnZXRbbWV0aG9kXSA9IG5ldyBEYXRlKHBvaW50KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGNvcHkgPSB0aGlzLmNvcHlDb25maWcocG9pbnQsIChwb2ludCBpbnN0YW5jZW9mIEFycmF5ID8gW10gOiB7fSksIGNvbmZpZyk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGNvcHkgIT09IG51bGwpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGFyZ2V0W21ldGhvZF0gPSBjb3B5O1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHRhcmdldFttZXRob2RdID0gcG9pbnQ7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRhcmdldDtcclxuICAgIH1cclxuICAgIGdldFJvdXRlcigpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy4kcm91dGVyO1xyXG4gICAgfVxyXG4gICAgY2xpY2tIYW5kbGVyKGUsIHRhcmdldCkge1xyXG4gICAgICAgIGlmIChlKSB7XHJcbiAgICAgICAgICAgIHRhcmdldCA9IHRhcmdldCB8fCAoZS50YXJnZXQgfHwgZS5zcmNFbGVtZW50KTtcclxuICAgICAgICAgICAgaWYgKHRhcmdldCAmJiB0YXJnZXQuZ2V0QXR0cmlidXRlKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCB0cmlnZ2VyID0gdGFyZ2V0LmdldEF0dHJpYnV0ZShcInRyaWdnZXJcIik7XHJcbiAgICAgICAgICAgICAgICBpZiAodHJpZ2dlcikge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2ZvclZpZXcodGFyZ2V0LCB2aWV3ID0+IHZpZXcuYXBwLnRyaWdnZXIodHJpZ2dlcikpO1xyXG4gICAgICAgICAgICAgICAgICAgIGUuY2FuY2VsQnViYmxlID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgY29uc3Qgcm91dGUgPSB0YXJnZXQuZ2V0QXR0cmlidXRlKFwicm91dGVcIik7XHJcbiAgICAgICAgICAgICAgICBpZiAocm91dGUpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9mb3JWaWV3KHRhcmdldCwgdmlldyA9PiB2aWV3LnNob3cocm91dGUpKTtcclxuICAgICAgICAgICAgICAgICAgICBlLmNhbmNlbEJ1YmJsZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBjb25zdCBwYXJlbnQgPSB0YXJnZXQucGFyZW50Tm9kZTtcclxuICAgICAgICBpZiAocGFyZW50KSB7XHJcbiAgICAgICAgICAgIHRoaXMuY2xpY2tIYW5kbGVyKGUsIHBhcmVudCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgZ2V0Um9vdCgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5nZXRTdWJWaWV3KCkuZ2V0Um9vdCgpO1xyXG4gICAgfVxyXG4gICAgcmVmcmVzaCgpIHtcclxuICAgICAgICBpZiAoIXRoaXMuX3N1YlNlZ21lbnQpIHtcclxuICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZShudWxsKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0U3ViVmlldygpLnJlZnJlc2goKS50aGVuKHZpZXcgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLmNhbGxFdmVudChcImFwcDpyb3V0ZVwiLCBbdGhpcy5nZXRVcmwoKV0pO1xyXG4gICAgICAgICAgICByZXR1cm4gdmlldztcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuICAgIGxvYWRWaWV3KHVybCkge1xyXG4gICAgICAgIGNvbnN0IHZpZXdzID0gdGhpcy5jb25maWcudmlld3M7XHJcbiAgICAgICAgbGV0IHJlc3VsdCA9IG51bGw7XHJcbiAgICAgICAgaWYgKHVybCA9PT0gXCJcIikge1xyXG4gICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKHRoaXMuX2xvYWRFcnJvcihcIlwiLCBuZXcgRXJyb3IoXCJXZWJpeCBKZXQ6IEVtcHR5IHVybCBzZWdtZW50XCIpKSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIGlmICh2aWV3cykge1xyXG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZiB2aWV3cyA9PT0gXCJmdW5jdGlvblwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gY3VzdG9tIGxvYWRpbmcgc3RyYXRlZ3lcclxuICAgICAgICAgICAgICAgICAgICByZXN1bHQgPSB2aWV3cyh1cmwpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gcHJlZGVmaW5lZCBoYXNoXHJcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0ID0gdmlld3NbdXJsXTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgcmVzdWx0ID09PSBcInN0cmluZ1wiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdXJsID0gcmVzdWx0O1xyXG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdCA9IG51bGw7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKCFyZXN1bHQpIHtcclxuICAgICAgICAgICAgICAgIGlmICh1cmwgPT09IFwiX2JsYW5rXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXN1bHQgPSB7fTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdCA9IHRoaXMuX2xvYWRWaWV3RHluYW1pYyh1cmwpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNhdGNoIChlKSB7XHJcbiAgICAgICAgICAgIHJlc3VsdCA9IHRoaXMuX2xvYWRFcnJvcih1cmwsIGUpO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvLyBjdXN0b20gaGFuZGxlciBjYW4gcmV0dXJuIHZpZXcgb3IgaXRzIHByb21pc2VcclxuICAgICAgICBpZiAoIXJlc3VsdC50aGVuKSB7XHJcbiAgICAgICAgICAgIHJlc3VsdCA9IFByb21pc2UucmVzb2x2ZShyZXN1bHQpO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvLyBzZXQgZXJyb3IgaGFuZGxlclxyXG4gICAgICAgIHJlc3VsdCA9IHJlc3VsdFxyXG4gICAgICAgICAgICAudGhlbihtb2R1bGUgPT4gbW9kdWxlLl9fZXNNb2R1bGUgPyBtb2R1bGUuZGVmYXVsdCA6IG1vZHVsZSlcclxuICAgICAgICAgICAgLmNhdGNoKGVyciA9PiB0aGlzLl9sb2FkRXJyb3IodXJsLCBlcnIpKTtcclxuICAgICAgICByZXR1cm4gcmVzdWx0O1xyXG4gICAgfVxyXG4gICAgX2ZvclZpZXcodGFyZ2V0LCBoYW5kbGVyKSB7XHJcbiAgICAgICAgY29uc3QgdmlldyA9IHRoaXMud2ViaXguJCQodGFyZ2V0KTtcclxuICAgICAgICBpZiAodmlldykge1xyXG4gICAgICAgICAgICBoYW5kbGVyKHZpZXcuJHNjb3BlKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBfbG9hZFZpZXdEeW5hbWljKHVybCkge1xyXG4gICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgfVxyXG4gICAgY3JlYXRlRnJvbVVSTChjaHVuaykge1xyXG4gICAgICAgIGxldCB2aWV3O1xyXG4gICAgICAgIGlmIChjaHVuay5pc05ldyB8fCAhY2h1bmsudmlldykge1xyXG4gICAgICAgICAgICB2aWV3ID0gdGhpcy5sb2FkVmlldyhjaHVuay5wYWdlKVxyXG4gICAgICAgICAgICAgICAgLnRoZW4odWkgPT4gdGhpcy5jcmVhdGVWaWV3KHVpLCBuYW1lKSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICB2aWV3ID0gUHJvbWlzZS5yZXNvbHZlKGNodW5rLnZpZXcpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdmlldztcclxuICAgIH1cclxuICAgIGNyZWF0ZVZpZXcodWksIG5hbWUpIHtcclxuICAgICAgICBsZXQgb2JqO1xyXG4gICAgICAgIGlmICh0eXBlb2YgdWkgPT09IFwiZnVuY3Rpb25cIikge1xyXG4gICAgICAgICAgICBpZiAodWkucHJvdG90eXBlIGluc3RhbmNlb2YgSmV0QXBwQmFzZSkge1xyXG4gICAgICAgICAgICAgICAgLy8gVUkgY2xhc3NcclxuICAgICAgICAgICAgICAgIHJldHVybiBuZXcgdWkoeyBhcHA6IHRoaXMsIG5hbWUsIHJvdXRlcjogU3ViUm91dGVyIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2UgaWYgKHVpLnByb3RvdHlwZSBpbnN0YW5jZW9mIEpldEJhc2UpIHtcclxuICAgICAgICAgICAgICAgIC8vIFVJIGNsYXNzXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gbmV3IHVpKHRoaXMsIHsgbmFtZSB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIC8vIFVJIGZhY3RvcnkgZnVuY3Rpb25zXHJcbiAgICAgICAgICAgICAgICB1aSA9IHVpKHRoaXMpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh1aSBpbnN0YW5jZW9mIEpldEJhc2UpIHtcclxuICAgICAgICAgICAgb2JqID0gdWk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAvLyBVSSBvYmplY3RcclxuICAgICAgICAgICAgb2JqID0gbmV3IEpldFZpZXdSYXcodGhpcywgeyBuYW1lLCB1aSB9KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIG9iajtcclxuICAgIH1cclxuICAgIC8vIHNob3cgdmlldyBwYXRoXHJcbiAgICBzaG93KHVybCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnJlbmRlcih0aGlzLl9jb250YWluZXIsICh1cmwgfHwgdGhpcy5jb25maWcuc3RhcnQpKTtcclxuICAgIH1cclxuICAgIC8vIGV2ZW50IGhlbHBlcnNcclxuICAgIHRyaWdnZXIobmFtZSwgLi4ucmVzdCkge1xyXG4gICAgICAgIHRoaXMuYXBwbHkobmFtZSwgcmVzdCk7XHJcbiAgICB9XHJcbiAgICBhcHBseShuYW1lLCBkYXRhKSB7XHJcbiAgICAgICAgdGhpcy5jYWxsRXZlbnQobmFtZSwgZGF0YSk7XHJcbiAgICB9XHJcbiAgICBhY3Rpb24obmFtZSkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLndlYml4LmJpbmQoZnVuY3Rpb24gKC4uLnJlc3QpIHtcclxuICAgICAgICAgICAgdGhpcy5hcHBseShuYW1lLCByZXN0KTtcclxuICAgICAgICB9LCB0aGlzKTtcclxuICAgIH1cclxuICAgIG9uKG5hbWUsIGhhbmRsZXIpIHtcclxuICAgICAgICB0aGlzLmF0dGFjaEV2ZW50KG5hbWUsIGhhbmRsZXIpO1xyXG4gICAgfVxyXG4gICAgdXNlKHBsdWdpbiwgY29uZmlnKSB7XHJcbiAgICAgICAgcGx1Z2luKHRoaXMsIG51bGwsIGNvbmZpZyk7XHJcbiAgICB9XHJcbiAgICBlcnJvcihuYW1lLCBlcikge1xyXG4gICAgICAgIHRoaXMuY2FsbEV2ZW50KG5hbWUsIGVyKTtcclxuICAgICAgICB0aGlzLmNhbGxFdmVudChcImFwcDplcnJvclwiLCBlcik7XHJcbiAgICAgICAgLyogdHNsaW50OmRpc2FibGUgKi9cclxuICAgICAgICBpZiAodGhpcy5jb25maWcuZGVidWcpIHtcclxuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBlci5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihlcltpXSk7XHJcbiAgICAgICAgICAgICAgICBpZiAoZXJbaV0gaW5zdGFuY2VvZiBFcnJvcikge1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCB0ZXh0ID0gZXJbaV0ubWVzc2FnZTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAodGV4dC5pbmRleE9mKFwiTW9kdWxlIGJ1aWxkIGZhaWxlZFwiKSA9PT0gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0ZXh0ID0gdGV4dC5yZXBsYWNlKC9cXHgxYlxcW1swLTk7XSptL2csIFwiXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBkb2N1bWVudC5ib2R5LmlubmVySFRNTCA9IGA8cHJlIHN0eWxlPSdmb250LXNpemU6MTZweDsgYmFja2dyb3VuZC1jb2xvcjogI2VjNjg3MzsgY29sb3I6ICMwMDA7IHBhZGRpbmc6MTBweDsnPiR7dGV4dH08L3ByZT5gO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGV4dCArPSBcIjxicj48YnI+Q2hlY2sgY29uc29sZSBmb3IgbW9yZSBkZXRhaWxzXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMud2ViaXgubWVzc2FnZSh7IHR5cGU6IFwiZXJyb3JcIiwgdGV4dDogdGV4dCwgZXhwaXJlOiAtMSB9KTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZGVidWdnZXI7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8qIHRzbGludDplbmFibGUgKi9cclxuICAgIH1cclxuICAgIC8vIHJlbmRlcnMgdG9wIHZpZXdcclxuICAgIHJlbmRlcihyb290LCB1cmwsIHBhcmVudCkge1xyXG4gICAgICAgIHRoaXMuX2NvbnRhaW5lciA9ICh0eXBlb2Ygcm9vdCA9PT0gXCJzdHJpbmdcIikgP1xyXG4gICAgICAgICAgICB0aGlzLndlYml4LnRvTm9kZShyb290KSA6XHJcbiAgICAgICAgICAgIChyb290IHx8IGRvY3VtZW50LmJvZHkpO1xyXG4gICAgICAgIGNvbnN0IGZpcnN0SW5pdCA9ICF0aGlzLiRyb3V0ZXI7XHJcbiAgICAgICAgbGV0IHBhdGggPSBudWxsO1xyXG4gICAgICAgIGlmIChmaXJzdEluaXQpIHtcclxuICAgICAgICAgICAgaWYgKF9vbmNlICYmIFwidGFnTmFtZVwiIGluIHRoaXMuX2NvbnRhaW5lcikge1xyXG4gICAgICAgICAgICAgICAgdGhpcy53ZWJpeC5ldmVudChkb2N1bWVudC5ib2R5LCBcImNsaWNrXCIsIGUgPT4gdGhpcy5jbGlja0hhbmRsZXIoZSkpO1xyXG4gICAgICAgICAgICAgICAgX29uY2UgPSBmYWxzZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAodHlwZW9mIHVybCA9PT0gXCJzdHJpbmdcIikge1xyXG4gICAgICAgICAgICAgICAgdXJsID0gbmV3IFJvdXRlKHVybCwgMCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5fc3ViU2VnbWVudCA9IHRoaXMuX2ZpcnN0X3N0YXJ0KHVybCk7XHJcbiAgICAgICAgICAgIHRoaXMuX3N1YlNlZ21lbnQucm91dGUubGlua1JvdXRlciA9IHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICBpZiAodHlwZW9mIHVybCA9PT0gXCJzdHJpbmdcIikge1xyXG4gICAgICAgICAgICAgICAgcGF0aCA9IHVybDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmFwcCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHBhdGggPSB1cmwuc3BsaXQoKS5yb3V0ZS5wYXRoIHx8IHRoaXMuY29uZmlnLnN0YXJ0O1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcGF0aCA9IHVybC50b1N0cmluZygpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNvbnN0IHRvcCA9IHRoaXMuZ2V0U3ViVmlldygpO1xyXG4gICAgICAgIGNvbnN0IHNlZ21lbnQgPSB0aGlzLl9zdWJTZWdtZW50O1xyXG4gICAgICAgIGNvbnN0IHJlYWR5ID0gc2VnbWVudC5zaG93KHBhdGgsIHRvcClcclxuICAgICAgICAgICAgLnRoZW4oKCkgPT4gdGhpcy5jcmVhdGVGcm9tVVJMKHNlZ21lbnQuY3VycmVudCgpKSlcclxuICAgICAgICAgICAgLnRoZW4odmlldyA9PiB2aWV3LnJlbmRlcihyb290LCBzZWdtZW50KSlcclxuICAgICAgICAgICAgLnRoZW4oYmFzZSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuJHJvdXRlci5zZXQoc2VnbWVudC5yb3V0ZS5wYXRoLCB7IHNpbGVudDogdHJ1ZSB9KTtcclxuICAgICAgICAgICAgdGhpcy5jYWxsRXZlbnQoXCJhcHA6cm91dGVcIiwgW3RoaXMuZ2V0VXJsKCldKTtcclxuICAgICAgICAgICAgcmV0dXJuIGJhc2U7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgdGhpcy5yZWFkeSA9IHRoaXMucmVhZHkudGhlbigoKSA9PiByZWFkeSk7XHJcbiAgICAgICAgcmV0dXJuIHJlYWR5O1xyXG4gICAgfVxyXG4gICAgZ2V0U3ViVmlldygpIHtcclxuICAgICAgICBpZiAodGhpcy5fc3ViU2VnbWVudCkge1xyXG4gICAgICAgICAgICBjb25zdCB2aWV3ID0gdGhpcy5fc3ViU2VnbWVudC5jdXJyZW50KCkudmlldztcclxuICAgICAgICAgICAgaWYgKHZpZXcpXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdmlldztcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIG5ldyBKZXRWaWV3KHRoaXMsIHt9KTtcclxuICAgIH1cclxuICAgIF9maXJzdF9zdGFydChyb3V0ZSkge1xyXG4gICAgICAgIHRoaXMuX3NlZ21lbnQgPSByb3V0ZTtcclxuICAgICAgICBjb25zdCBjYiA9IChhKSA9PiBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5zaG93KGEpLmNhdGNoKGUgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKCEoZSBpbnN0YW5jZW9mIE5hdmlnYXRpb25CbG9ja2VkKSlcclxuICAgICAgICAgICAgICAgICAgICB0aHJvdyBlO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9LCAxKTtcclxuICAgICAgICB0aGlzLiRyb3V0ZXIgPSBuZXcgKHRoaXMuY29uZmlnLnJvdXRlcikoY2IsIHRoaXMuY29uZmlnLCB0aGlzKTtcclxuICAgICAgICAvLyBzdGFydCBhbmltYXRpb24gZm9yIHRvcC1sZXZlbCBhcHBcclxuICAgICAgICBpZiAodGhpcy5fY29udGFpbmVyID09PSBkb2N1bWVudC5ib2R5ICYmIHRoaXMuY29uZmlnLmFuaW1hdGlvbiAhPT0gZmFsc2UpIHtcclxuICAgICAgICAgICAgY29uc3Qgbm9kZSA9IHRoaXMuX2NvbnRhaW5lcjtcclxuICAgICAgICAgICAgdGhpcy53ZWJpeC5odG1sLmFkZENzcyhub2RlLCBcIndlYml4YXBwc3RhcnRcIik7XHJcbiAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy53ZWJpeC5odG1sLnJlbW92ZUNzcyhub2RlLCBcIndlYml4YXBwc3RhcnRcIik7XHJcbiAgICAgICAgICAgICAgICB0aGlzLndlYml4Lmh0bWwuYWRkQ3NzKG5vZGUsIFwid2ViaXhhcHBcIik7XHJcbiAgICAgICAgICAgIH0sIDEwKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKCFyb3V0ZSkge1xyXG4gICAgICAgICAgICAvLyBpZiBubyB1cmwgZGVmaW5lZCwgY2hlY2sgcm91dGVyIGZpcnN0XHJcbiAgICAgICAgICAgIGxldCB1cmxTdHJpbmcgPSB0aGlzLiRyb3V0ZXIuZ2V0KCk7XHJcbiAgICAgICAgICAgIGlmICghdXJsU3RyaW5nKSB7XHJcbiAgICAgICAgICAgICAgICB1cmxTdHJpbmcgPSB0aGlzLmNvbmZpZy5zdGFydDtcclxuICAgICAgICAgICAgICAgIHRoaXMuJHJvdXRlci5zZXQodXJsU3RyaW5nLCB7IHNpbGVudDogdHJ1ZSB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByb3V0ZSA9IG5ldyBSb3V0ZSh1cmxTdHJpbmcsIDApO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmICh0aGlzLmFwcCkge1xyXG4gICAgICAgICAgICByb3V0ZS5jdXJyZW50KCkudmlldyA9IHRoaXM7XHJcbiAgICAgICAgICAgIGlmIChyb3V0ZS5uZXh0KCkpIHtcclxuICAgICAgICAgICAgICAgIHJvdXRlLnJlZnJlc2goKTtcclxuICAgICAgICAgICAgICAgIHJvdXRlID0gcm91dGUuc3BsaXQoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHJvdXRlID0gbmV3IFJvdXRlKHRoaXMuY29uZmlnLnN0YXJ0LCAwKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gcm91dGU7XHJcbiAgICB9XHJcbiAgICAvLyBlcnJvciBkdXJpbmcgdmlldyByZXNvbHZpbmdcclxuICAgIF9sb2FkRXJyb3IodXJsLCBlcnIpIHtcclxuICAgICAgICB0aGlzLmVycm9yKFwiYXBwOmVycm9yOnJlc29sdmVcIiwgW2VyciwgdXJsXSk7XHJcbiAgICAgICAgcmV0dXJuIHsgdGVtcGxhdGU6IFwiIFwiIH07XHJcbiAgICB9XHJcbiAgICBhZGRTdWJWaWV3KG9iaiwgdGFyZ2V0LCBjb25maWcpIHtcclxuICAgICAgICBjb25zdCB1cmwgPSBvYmouJHN1YnZpZXcgIT09IHRydWUgPyBvYmouJHN1YnZpZXcgOiBudWxsO1xyXG4gICAgICAgIGNvbnN0IG5hbWUgPSBvYmoubmFtZSB8fCAodXJsID8gdGhpcy53ZWJpeC51aWQoKSA6IFwiZGVmYXVsdFwiKTtcclxuICAgICAgICB0YXJnZXQuaWQgPSBvYmouaWQgfHwgXCJzXCIgKyB0aGlzLndlYml4LnVpZCgpO1xyXG4gICAgICAgIGNvbnN0IHZpZXcgPSBjb25maWdbbmFtZV0gPSB7XHJcbiAgICAgICAgICAgIGlkOiB0YXJnZXQuaWQsXHJcbiAgICAgICAgICAgIHVybCxcclxuICAgICAgICAgICAgYnJhbmNoOiBvYmouYnJhbmNoLFxyXG4gICAgICAgICAgICBwb3B1cDogb2JqLnBvcHVwXHJcbiAgICAgICAgfTtcclxuICAgICAgICByZXR1cm4gdmlldy5wb3B1cCA/IG51bGwgOiB0YXJnZXQ7XHJcbiAgICB9XHJcbn1cblxuY2xhc3MgSGFzaFJvdXRlciB7XHJcbiAgICBjb25zdHJ1Y3RvcihjYiwgY29uZmlnKSB7XHJcbiAgICAgICAgdGhpcy5jb25maWcgPSBjb25maWcgfHwge307XHJcbiAgICAgICAgdGhpcy5fZGV0ZWN0UHJlZml4KCk7XHJcbiAgICAgICAgdGhpcy5jYiA9IGNiO1xyXG4gICAgICAgIHdpbmRvdy5vbnBvcHN0YXRlID0gKCkgPT4gdGhpcy5jYih0aGlzLmdldCgpKTtcclxuICAgIH1cclxuICAgIHNldChwYXRoLCBjb25maWcpIHtcclxuICAgICAgICBpZiAodGhpcy5jb25maWcucm91dGVzKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGNvbXBhcmUgPSBwYXRoLnNwbGl0KFwiP1wiLCAyKTtcclxuICAgICAgICAgICAgZm9yIChjb25zdCBrZXkgaW4gdGhpcy5jb25maWcucm91dGVzKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5jb25maWcucm91dGVzW2tleV0gPT09IGNvbXBhcmVbMF0pIHtcclxuICAgICAgICAgICAgICAgICAgICBwYXRoID0ga2V5ICsgKGNvbXBhcmUubGVuZ3RoID4gMSA/IFwiP1wiICsgY29tcGFyZVsxXSA6IFwiXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0aGlzLmdldCgpICE9PSBwYXRoKSB7XHJcbiAgICAgICAgICAgIHdpbmRvdy5oaXN0b3J5LnB1c2hTdGF0ZShudWxsLCBudWxsLCB0aGlzLnByZWZpeCArIHRoaXMuc3VmaXggKyBwYXRoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKCFjb25maWcgfHwgIWNvbmZpZy5zaWxlbnQpIHtcclxuICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB0aGlzLmNiKHBhdGgpLCAxKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBnZXQoKSB7XHJcbiAgICAgICAgbGV0IHBhdGggPSB0aGlzLl9nZXRSYXcoKS5yZXBsYWNlKHRoaXMucHJlZml4LCBcIlwiKS5yZXBsYWNlKHRoaXMuc3VmaXgsIFwiXCIpO1xyXG4gICAgICAgIHBhdGggPSAocGF0aCAhPT0gXCIvXCIgJiYgcGF0aCAhPT0gXCIjXCIpID8gcGF0aCA6IFwiXCI7XHJcbiAgICAgICAgaWYgKHRoaXMuY29uZmlnLnJvdXRlcykge1xyXG4gICAgICAgICAgICBjb25zdCBjb21wYXJlID0gcGF0aC5zcGxpdChcIj9cIiwgMik7XHJcbiAgICAgICAgICAgIGNvbnN0IGtleSA9IHRoaXMuY29uZmlnLnJvdXRlc1tjb21wYXJlWzBdXTtcclxuICAgICAgICAgICAgaWYgKGtleSkge1xyXG4gICAgICAgICAgICAgICAgcGF0aCA9IGtleSArIChjb21wYXJlLmxlbmd0aCA+IDEgPyBcIj9cIiArIGNvbXBhcmVbMV0gOiBcIlwiKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gcGF0aDtcclxuICAgIH1cclxuICAgIF9kZXRlY3RQcmVmaXgoKSB7XHJcbiAgICAgICAgLy8gdXNlIFwiIyFcIiBmb3IgYmFja3dhcmQgY29tcGF0aWJpbGl0eVxyXG4gICAgICAgIGNvbnN0IHN1Zml4ID0gdGhpcy5jb25maWcucm91dGVyUHJlZml4O1xyXG4gICAgICAgIHRoaXMuc3VmaXggPSBcIiNcIiArICgodHlwZW9mIHN1Zml4ID09PSBcInVuZGVmaW5lZFwiKSA/IFwiIVwiIDogc3VmaXgpO1xyXG4gICAgICAgIHRoaXMucHJlZml4ID0gZG9jdW1lbnQubG9jYXRpb24uaHJlZi5zcGxpdChcIiNcIiwgMilbMF07XHJcbiAgICB9XHJcbiAgICBfZ2V0UmF3KCkge1xyXG4gICAgICAgIHJldHVybiBkb2N1bWVudC5sb2NhdGlvbi5ocmVmO1xyXG4gICAgfVxyXG59XG5cbmxldCBpc1BhdGNoZWQgPSBmYWxzZTtcclxuZnVuY3Rpb24gcGF0Y2godykge1xyXG4gICAgaWYgKGlzUGF0Y2hlZCB8fCAhdykge1xyXG4gICAgICAgIHJldHVybjtcclxuICAgIH1cclxuICAgIGlzUGF0Y2hlZCA9IHRydWU7XHJcbiAgICAvLyBjdXN0b20gcHJvbWlzZSBmb3IgSUU4XHJcbiAgICBjb25zdCB3aW4gPSB3aW5kb3c7XHJcbiAgICBpZiAoIXdpbi5Qcm9taXNlKSB7XHJcbiAgICAgICAgd2luLlByb21pc2UgPSB3LnByb21pc2U7XHJcbiAgICB9XHJcbiAgICBjb25zdCB2ZXJzaW9uID0gdy52ZXJzaW9uLnNwbGl0KFwiLlwiKTtcclxuICAgIC8vIHdpbGwgYmUgZml4ZWQgaW4gd2ViaXggNS4zXHJcbiAgICBpZiAodmVyc2lvblswXSAqIDEwICsgdmVyc2lvblsxXSAqIDEgPCA1Mykge1xyXG4gICAgICAgIHcudWkuZnJlZXplID0gZnVuY3Rpb24gKGhhbmRsZXIpIHtcclxuICAgICAgICAgICAgLy8gZGlzYWJsZWQgYmVjYXVzZSB3ZWJpeCBqZXQgNS4wIGNhbid0IGhhbmRsZSByZXNpemUgb2Ygc2Nyb2xsdmlldyBjb3JyZWN0bHlcclxuICAgICAgICAgICAgLy8gdy51aS4kZnJlZXplID0gdHJ1ZTtcclxuICAgICAgICAgICAgY29uc3QgcmVzID0gaGFuZGxlcigpO1xyXG4gICAgICAgICAgICBpZiAocmVzICYmIHJlcy50aGVuKSB7XHJcbiAgICAgICAgICAgICAgICByZXMudGhlbihmdW5jdGlvbiAoc29tZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHcudWkuJGZyZWV6ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgIHcudWkucmVzaXplKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHNvbWU7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHcudWkuJGZyZWV6ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgdy51aS5yZXNpemUoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gcmVzO1xyXG4gICAgICAgIH07XHJcbiAgICB9XHJcbiAgICAvLyBhZGRpbmcgdmlld3MgYXMgY2xhc3Nlc1xyXG4gICAgY29uc3QgYmFzZUFkZCA9IHcudWkuYmFzZWxheW91dC5wcm90b3R5cGUuYWRkVmlldztcclxuICAgIGNvbnN0IGJhc2VSZW1vdmUgPSB3LnVpLmJhc2VsYXlvdXQucHJvdG90eXBlLnJlbW92ZVZpZXc7XHJcbiAgICBjb25zdCBjb25maWcgPSB7XHJcbiAgICAgICAgYWRkVmlldyh2aWV3LCBpbmRleCkge1xyXG4gICAgICAgICAgICAvLyB0cmlnZ2VyIGxvZ2ljIG9ubHkgZm9yIHdpZGdldHMgaW5zaWRlIG9mIGpldC12aWV3XHJcbiAgICAgICAgICAgIC8vIGlnbm9yZSBjYXNlIHdoZW4gYWRkVmlldyB1c2VkIHdpdGggYWxyZWFkeSBpbml0aWFsaXplZCB3aWRnZXRcclxuICAgICAgICAgICAgaWYgKHRoaXMuJHNjb3BlICYmIHRoaXMuJHNjb3BlLndlYml4SmV0ICYmICF2aWV3LnF1ZXJ5Vmlldykge1xyXG4gICAgICAgICAgICAgICAgY29uc3QganZpZXcgPSB0aGlzLiRzY29wZTtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHN1YnMgPSB7fTtcclxuICAgICAgICAgICAgICAgIHZpZXcgPSBqdmlldy5hcHAuY29weUNvbmZpZyh2aWV3LCB7fSwgc3Vicyk7XHJcbiAgICAgICAgICAgICAgICBiYXNlQWRkLmFwcGx5KHRoaXMsIFt2aWV3LCBpbmRleF0pO1xyXG4gICAgICAgICAgICAgICAgZm9yIChjb25zdCBrZXkgaW4gc3Vicykge1xyXG4gICAgICAgICAgICAgICAgICAgIGp2aWV3Ll9yZW5kZXJGcmFtZShrZXksIHN1YnNba2V5XSwgbnVsbCkudGhlbigoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGp2aWV3Ll9zdWJzW2tleV0gPSBzdWJzW2tleV07XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdmlldy5pZDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBiYXNlQWRkLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LFxyXG4gICAgICAgIHJlbW92ZVZpZXcoKSB7XHJcbiAgICAgICAgICAgIGJhc2VSZW1vdmUuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcclxuICAgICAgICAgICAgaWYgKHRoaXMuJHNjb3BlICYmIHRoaXMuJHNjb3BlLndlYml4SmV0KSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBzdWJzID0gdGhpcy4kc2NvcGUuX3N1YnM7XHJcbiAgICAgICAgICAgICAgICAvLyBjaGVjayBhbGwgc3ViLXZpZXdzLCBkZXN0cm95IGFuZCBjbGVhbiB0aGUgcmVtb3ZlZCBvbmVcclxuICAgICAgICAgICAgICAgIGZvciAoY29uc3Qga2V5IGluIHN1YnMpIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCB0ZXN0ID0gc3Vic1trZXldO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICghdy4kJCh0ZXN0LmlkKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0ZXN0LnZpZXcuZGVzdHJ1Y3RvcigpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBkZWxldGUgc3Vic1trZXldO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH07XHJcbiAgICB3LmV4dGVuZCh3LnVpLmxheW91dC5wcm90b3R5cGUsIGNvbmZpZywgdHJ1ZSk7XHJcbiAgICB3LmV4dGVuZCh3LnVpLmJhc2VsYXlvdXQucHJvdG90eXBlLCBjb25maWcsIHRydWUpO1xyXG4gICAgLy8gd3JhcHBlciBmb3IgdXNpbmcgSmV0IEFwcHMgYXMgdmlld3NcclxuICAgIHcucHJvdG9VSSh7XHJcbiAgICAgICAgbmFtZTogXCJqZXRhcHBcIixcclxuICAgICAgICAkaW5pdChjZmcpIHtcclxuICAgICAgICAgICAgdGhpcy4kYXBwID0gbmV3IHRoaXMuYXBwKGNmZyk7XHJcbiAgICAgICAgICAgIGNvbnN0IGlkID0gdy51aWQoKS50b1N0cmluZygpO1xyXG4gICAgICAgICAgICBjZmcuYm9keSA9IHsgaWQgfTtcclxuICAgICAgICAgICAgdGhpcy4kcmVhZHkucHVzaChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLiRhcHAucmVuZGVyKHsgaWQgfSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICBmb3IgKHZhciBrZXkgaW4gdGhpcy4kYXBwKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgb3JpZ2luID0gdGhpcy4kYXBwW2tleV07XHJcbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mIG9yaWdpbiA9PT0gXCJmdW5jdGlvblwiICYmICF0aGlzW2tleV0pIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzW2tleV0gPSBvcmlnaW4uYmluZCh0aGlzLiRhcHApO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfSwgdy51aS5wcm94eSk7XHJcbn1cblxuY2xhc3MgSmV0QXBwIGV4dGVuZHMgSmV0QXBwQmFzZSB7XHJcbiAgICBjb25zdHJ1Y3Rvcihjb25maWcpIHtcclxuICAgICAgICBjb25maWcucm91dGVyID0gY29uZmlnLnJvdXRlciB8fCBIYXNoUm91dGVyO1xyXG4gICAgICAgIHN1cGVyKGNvbmZpZyk7XHJcbiAgICAgICAgcGF0Y2godGhpcy53ZWJpeCk7XHJcbiAgICB9XHJcbiAgICBfbG9hZFZpZXdEeW5hbWljKHVybCkge1xyXG4gICAgICAgIHVybCA9IHVybC5yZXBsYWNlKC9cXC4vZywgXCIvXCIpO1xyXG4gICAgICAgIHJldHVybiByZXF1aXJlKFwiamV0LXZpZXdzL1wiICsgdXJsKTtcclxuICAgIH1cclxufVxuXG5jbGFzcyBTdG9yZVJvdXRlciB7XHJcbiAgICBjb25zdHJ1Y3RvcihjYiwgY29uZmlnLCBhcHApIHtcclxuICAgICAgICB0aGlzLnN0b3JhZ2UgPSBjb25maWcuc3RvcmFnZSB8fCBhcHAud2ViaXguc3RvcmFnZS5zZXNzaW9uO1xyXG4gICAgICAgIHRoaXMubmFtZSA9IChjb25maWcuc3RvcmVOYW1lIHx8IGNvbmZpZy5pZCArIFwiOnJvdXRlXCIpO1xyXG4gICAgICAgIHRoaXMuY2IgPSBjYjtcclxuICAgIH1cclxuICAgIHNldChwYXRoLCBjb25maWcpIHtcclxuICAgICAgICB0aGlzLnN0b3JhZ2UucHV0KHRoaXMubmFtZSwgcGF0aCk7XHJcbiAgICAgICAgaWYgKCFjb25maWcgfHwgIWNvbmZpZy5zaWxlbnQpIHtcclxuICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB0aGlzLmNiKHBhdGgpLCAxKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBnZXQoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuc3RvcmFnZS5nZXQodGhpcy5uYW1lKTtcclxuICAgIH1cclxufVxuXG5jbGFzcyBVcmxSb3V0ZXIgZXh0ZW5kcyBIYXNoUm91dGVyIHtcclxuICAgIF9kZXRlY3RQcmVmaXgoKSB7XHJcbiAgICAgICAgdGhpcy5wcmVmaXggPSBcIlwiO1xyXG4gICAgICAgIHRoaXMuc3VmaXggPSB0aGlzLmNvbmZpZy5yb3V0ZXJQcmVmaXggfHwgXCJcIjtcclxuICAgIH1cclxuICAgIF9nZXRSYXcoKSB7XHJcbiAgICAgICAgcmV0dXJuIGRvY3VtZW50LmxvY2F0aW9uLnBhdGhuYW1lICsgKGRvY3VtZW50LmxvY2F0aW9uLnNlYXJjaCB8fCBcIlwiKTtcclxuICAgIH1cclxufVxuXG5jbGFzcyBFbXB0eVJvdXRlciB7XHJcbiAgICBjb25zdHJ1Y3RvcihjYiwgXyRjb25maWcpIHtcclxuICAgICAgICB0aGlzLnBhdGggPSBcIlwiO1xyXG4gICAgICAgIHRoaXMuY2IgPSBjYjtcclxuICAgIH1cclxuICAgIHNldChwYXRoLCBjb25maWcpIHtcclxuICAgICAgICB0aGlzLnBhdGggPSBwYXRoO1xyXG4gICAgICAgIGlmICghY29uZmlnIHx8ICFjb25maWcuc2lsZW50KSB7XHJcbiAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4gdGhpcy5jYihwYXRoKSwgMSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgZ2V0KCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnBhdGg7XHJcbiAgICB9XHJcbn1cblxuZnVuY3Rpb24gVW5sb2FkR3VhcmQoYXBwLCB2aWV3LCBjb25maWcpIHtcclxuICAgIHZpZXcub24oYXBwLCBgYXBwOmd1YXJkYCwgZnVuY3Rpb24gKF8kdXJsLCBwb2ludCwgcHJvbWlzZSkge1xyXG4gICAgICAgIGlmIChwb2ludCA9PT0gdmlldyB8fCBwb2ludC5jb250YWlucyh2aWV3KSkge1xyXG4gICAgICAgICAgICBjb25zdCByZXMgPSBjb25maWcoKTtcclxuICAgICAgICAgICAgaWYgKHJlcyA9PT0gZmFsc2UpIHtcclxuICAgICAgICAgICAgICAgIHByb21pc2UuY29uZmlybSA9IFByb21pc2UucmVqZWN0KG5ldyBOYXZpZ2F0aW9uQmxvY2tlZCgpKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHByb21pc2UuY29uZmlybSA9IHByb21pc2UuY29uZmlybS50aGVuKCgpID0+IHJlcyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9KTtcclxufVxuXG4vLyAgICAgKGMpIDIwMTItMjAxOCBBaXJibmIsIEluYy5cblxuLy8gdmFyIGhhcyA9IHJlcXVpcmUoJ2hhcycpO1xuZnVuY3Rpb24gaGFzKHN0b3JlLCBrZXkpIHtcbiAgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChzdG9yZSwga2V5KTtcbn1cbi8vIHZhciBmb3JFYWNoID0gcmVxdWlyZSgnZm9yLWVhY2gnKTtcbmZ1bmN0aW9uIGZvckVhY2gob2JqLCBoYW5kbGVyLCBjb250ZXh0KSB7XG4gIGZvciAodmFyIGtleSBpbiBvYmopIHtcbiAgICBpZiAoaGFzKG9iaiwga2V5KSkge1xuICAgICAgaGFuZGxlci5jYWxsKChjb250ZXh0IHx8IG9iaiksIG9ialtrZXldLCBrZXksIG9iaik7XG4gICAgfVxuICB9XG59XG4vLyB2YXIgdHJpbSA9IHJlcXVpcmUoJ3N0cmluZy5wcm90b3R5cGUudHJpbScpO1xuZnVuY3Rpb24gdHJpbShzdHIpIHtcbiAgcmV0dXJuIHN0ci5yZXBsYWNlKC9eW1xcc1xcdUZFRkZcXHhBMF0rfFtcXHNcXHVGRUZGXFx4QTBdKyQvZywgJycpO1xufVxuLy8gdmFyIHdhcm5pbmcgPSByZXF1aXJlKCd3YXJuaW5nJyk7XG5mdW5jdGlvbiB3YXJuKG1lc3NhZ2UpIHtcbiAgbWVzc2FnZSA9ICdXYXJuaW5nOiAnICsgbWVzc2FnZTtcbiAgaWYgKHR5cGVvZiBjb25zb2xlICE9PSAndW5kZWZpbmVkJykge1xuICAgIGNvbnNvbGUuZXJyb3IobWVzc2FnZSk7XG4gIH1cblxuICB0cnkgeyB0aHJvdyBuZXcgRXJyb3IobWVzc2FnZSk7IH0gY2F0Y2ggKHgpIHt9XG59XG5cbnZhciByZXBsYWNlID0gU3RyaW5nLnByb3RvdHlwZS5yZXBsYWNlO1xudmFyIHNwbGl0ID0gU3RyaW5nLnByb3RvdHlwZS5zcGxpdDtcblxuLy8gIyMjIyBQbHVyYWxpemF0aW9uIG1ldGhvZHNcbi8vIFRoZSBzdHJpbmcgdGhhdCBzZXBhcmF0ZXMgdGhlIGRpZmZlcmVudCBwaHJhc2UgcG9zc2liaWxpdGllcy5cbnZhciBkZWxpbWl0ZXIgPSAnfHx8fCc7XG5cbnZhciBydXNzaWFuUGx1cmFsR3JvdXBzID0gZnVuY3Rpb24gKG4pIHtcbiAgdmFyIGVuZCA9IG4gJSAxMDtcbiAgaWYgKG4gIT09IDExICYmIGVuZCA9PT0gMSkge1xuICAgIHJldHVybiAwO1xuICB9XG4gIGlmICgyIDw9IGVuZCAmJiBlbmQgPD0gNCAmJiAhKG4gPj0gMTIgJiYgbiA8PSAxNCkpIHtcbiAgICByZXR1cm4gMTtcbiAgfVxuICByZXR1cm4gMjtcbn07XG5cbi8vIE1hcHBpbmcgZnJvbSBwbHVyYWxpemF0aW9uIGdyb3VwIHBsdXJhbCBsb2dpYy5cbnZhciBwbHVyYWxUeXBlcyA9IHtcbiAgYXJhYmljOiBmdW5jdGlvbiAobikge1xuICAgIC8vIGh0dHA6Ly93d3cuYXJhYmV5ZXMub3JnL1BsdXJhbF9Gb3Jtc1xuICAgIGlmIChuIDwgMykgeyByZXR1cm4gbjsgfVxuICAgIHZhciBsYXN0VHdvID0gbiAlIDEwMDtcbiAgICBpZiAobGFzdFR3byA+PSAzICYmIGxhc3RUd28gPD0gMTApIHJldHVybiAzO1xuICAgIHJldHVybiBsYXN0VHdvID49IDExID8gNCA6IDU7XG4gIH0sXG4gIGJvc25pYW5fc2VyYmlhbjogcnVzc2lhblBsdXJhbEdyb3VwcyxcbiAgY2hpbmVzZTogZnVuY3Rpb24gKCkgeyByZXR1cm4gMDsgfSxcbiAgY3JvYXRpYW46IHJ1c3NpYW5QbHVyYWxHcm91cHMsXG4gIGZyZW5jaDogZnVuY3Rpb24gKG4pIHsgcmV0dXJuIG4gPiAxID8gMSA6IDA7IH0sXG4gIGdlcm1hbjogZnVuY3Rpb24gKG4pIHsgcmV0dXJuIG4gIT09IDEgPyAxIDogMDsgfSxcbiAgcnVzc2lhbjogcnVzc2lhblBsdXJhbEdyb3VwcyxcbiAgbGl0aHVhbmlhbjogZnVuY3Rpb24gKG4pIHtcbiAgICBpZiAobiAlIDEwID09PSAxICYmIG4gJSAxMDAgIT09IDExKSB7IHJldHVybiAwOyB9XG4gICAgcmV0dXJuIG4gJSAxMCA+PSAyICYmIG4gJSAxMCA8PSA5ICYmIChuICUgMTAwIDwgMTEgfHwgbiAlIDEwMCA+IDE5KSA/IDEgOiAyO1xuICB9LFxuICBjemVjaDogZnVuY3Rpb24gKG4pIHtcbiAgICBpZiAobiA9PT0gMSkgeyByZXR1cm4gMDsgfVxuICAgIHJldHVybiAobiA+PSAyICYmIG4gPD0gNCkgPyAxIDogMjtcbiAgfSxcbiAgcG9saXNoOiBmdW5jdGlvbiAobikge1xuICAgIGlmIChuID09PSAxKSB7IHJldHVybiAwOyB9XG4gICAgdmFyIGVuZCA9IG4gJSAxMDtcbiAgICByZXR1cm4gMiA8PSBlbmQgJiYgZW5kIDw9IDQgJiYgKG4gJSAxMDAgPCAxMCB8fCBuICUgMTAwID49IDIwKSA/IDEgOiAyO1xuICB9LFxuICBpY2VsYW5kaWM6IGZ1bmN0aW9uIChuKSB7IHJldHVybiAobiAlIDEwICE9PSAxIHx8IG4gJSAxMDAgPT09IDExKSA/IDEgOiAwOyB9LFxuICBzbG92ZW5pYW46IGZ1bmN0aW9uIChuKSB7XG4gICAgdmFyIGxhc3RUd28gPSBuICUgMTAwO1xuICAgIGlmIChsYXN0VHdvID09PSAxKSB7XG4gICAgICByZXR1cm4gMDtcbiAgICB9XG4gICAgaWYgKGxhc3RUd28gPT09IDIpIHtcbiAgICAgIHJldHVybiAxO1xuICAgIH1cbiAgICBpZiAobGFzdFR3byA9PT0gMyB8fCBsYXN0VHdvID09PSA0KSB7XG4gICAgICByZXR1cm4gMjtcbiAgICB9XG4gICAgcmV0dXJuIDM7XG4gIH1cbn07XG5cblxuLy8gTWFwcGluZyBmcm9tIHBsdXJhbGl6YXRpb24gZ3JvdXAgdG8gaW5kaXZpZHVhbCBsYW5ndWFnZSBjb2Rlcy9sb2NhbGVzLlxuLy8gV2lsbCBsb29rIHVwIGJhc2VkIG9uIGV4YWN0IG1hdGNoLCBpZiBub3QgZm91bmQgYW5kIGl0J3MgYSBsb2NhbGUgd2lsbCBwYXJzZSB0aGUgbG9jYWxlXG4vLyBmb3IgbGFuZ3VhZ2UgY29kZSwgYW5kIGlmIHRoYXQgZG9lcyBub3QgZXhpc3Qgd2lsbCBkZWZhdWx0IHRvICdlbidcbnZhciBwbHVyYWxUeXBlVG9MYW5ndWFnZXMgPSB7XG4gIGFyYWJpYzogWydhciddLFxuICBib3NuaWFuX3NlcmJpYW46IFsnYnMtTGF0bi1CQScsICdicy1DeXJsLUJBJywgJ3NybC1SUycsICdzci1SUyddLFxuICBjaGluZXNlOiBbJ2lkJywgJ2lkLUlEJywgJ2phJywgJ2tvJywgJ2tvLUtSJywgJ2xvJywgJ21zJywgJ3RoJywgJ3RoLVRIJywgJ3poJ10sXG4gIGNyb2F0aWFuOiBbJ2hyJywgJ2hyLUhSJ10sXG4gIGdlcm1hbjogWydmYScsICdkYScsICdkZScsICdlbicsICdlcycsICdmaScsICdlbCcsICdoZScsICdoaS1JTicsICdodScsICdodS1IVScsICdpdCcsICdubCcsICdubycsICdwdCcsICdzdicsICd0ciddLFxuICBmcmVuY2g6IFsnZnInLCAndGwnLCAncHQtYnInXSxcbiAgcnVzc2lhbjogWydydScsICdydS1SVSddLFxuICBsaXRodWFuaWFuOiBbJ2x0J10sXG4gIGN6ZWNoOiBbJ2NzJywgJ2NzLUNaJywgJ3NrJ10sXG4gIHBvbGlzaDogWydwbCddLFxuICBpY2VsYW5kaWM6IFsnaXMnXSxcbiAgc2xvdmVuaWFuOiBbJ3NsLVNMJ11cbn07XG5cbmZ1bmN0aW9uIGxhbmdUb1R5cGVNYXAobWFwcGluZykge1xuICB2YXIgcmV0ID0ge307XG4gIGZvckVhY2gobWFwcGluZywgZnVuY3Rpb24gKGxhbmdzLCB0eXBlKSB7XG4gICAgZm9yRWFjaChsYW5ncywgZnVuY3Rpb24gKGxhbmcpIHtcbiAgICAgIHJldFtsYW5nXSA9IHR5cGU7XG4gICAgfSk7XG4gIH0pO1xuICByZXR1cm4gcmV0O1xufVxuXG5mdW5jdGlvbiBwbHVyYWxUeXBlTmFtZShsb2NhbGUpIHtcbiAgdmFyIGxhbmdUb1BsdXJhbFR5cGUgPSBsYW5nVG9UeXBlTWFwKHBsdXJhbFR5cGVUb0xhbmd1YWdlcyk7XG4gIHJldHVybiBsYW5nVG9QbHVyYWxUeXBlW2xvY2FsZV1cbiAgICB8fCBsYW5nVG9QbHVyYWxUeXBlW3NwbGl0LmNhbGwobG9jYWxlLCAvLS8sIDEpWzBdXVxuICAgIHx8IGxhbmdUb1BsdXJhbFR5cGUuZW47XG59XG5cbmZ1bmN0aW9uIHBsdXJhbFR5cGVJbmRleChsb2NhbGUsIGNvdW50KSB7XG4gIHJldHVybiBwbHVyYWxUeXBlc1twbHVyYWxUeXBlTmFtZShsb2NhbGUpXShjb3VudCk7XG59XG5cbmZ1bmN0aW9uIGVzY2FwZSh0b2tlbikge1xuICByZXR1cm4gdG9rZW4ucmVwbGFjZSgvWy4qKz9eJHt9KCl8W1xcXVxcXFxdL2csICdcXFxcJCYnKTtcbn1cblxuZnVuY3Rpb24gY29uc3RydWN0VG9rZW5SZWdleChvcHRzKSB7XG4gIHZhciBwcmVmaXggPSAob3B0cyAmJiBvcHRzLnByZWZpeCkgfHwgJyV7JztcbiAgdmFyIHN1ZmZpeCA9IChvcHRzICYmIG9wdHMuc3VmZml4KSB8fCAnfSc7XG5cbiAgaWYgKHByZWZpeCA9PT0gZGVsaW1pdGVyIHx8IHN1ZmZpeCA9PT0gZGVsaW1pdGVyKSB7XG4gICAgdGhyb3cgbmV3IFJhbmdlRXJyb3IoJ1wiJyArIGRlbGltaXRlciArICdcIiB0b2tlbiBpcyByZXNlcnZlZCBmb3IgcGx1cmFsaXphdGlvbicpO1xuICB9XG5cbiAgcmV0dXJuIG5ldyBSZWdFeHAoZXNjYXBlKHByZWZpeCkgKyAnKC4qPyknICsgZXNjYXBlKHN1ZmZpeCksICdnJyk7XG59XG5cbnZhciBkb2xsYXJSZWdleCA9IC9cXCQvZztcbnZhciBkb2xsYXJCaWxsc1lhbGwgPSAnJCQnO1xudmFyIGRlZmF1bHRUb2tlblJlZ2V4ID0gLyVcXHsoLio/KVxcfS9nO1xuXG4vLyAjIyMgdHJhbnNmb3JtUGhyYXNlKHBocmFzZSwgc3Vic3RpdHV0aW9ucywgbG9jYWxlKVxuLy9cbi8vIFRha2VzIGEgcGhyYXNlIHN0cmluZyBhbmQgdHJhbnNmb3JtcyBpdCBieSBjaG9vc2luZyB0aGUgY29ycmVjdFxuLy8gcGx1cmFsIGZvcm0gYW5kIGludGVycG9sYXRpbmcgaXQuXG4vL1xuLy8gICAgIHRyYW5zZm9ybVBocmFzZSgnSGVsbG8sICV7bmFtZX0hJywge25hbWU6ICdTcGlrZSd9KTtcbi8vICAgICAvLyBcIkhlbGxvLCBTcGlrZSFcIlxuLy9cbi8vIFRoZSBjb3JyZWN0IHBsdXJhbCBmb3JtIGlzIHNlbGVjdGVkIGlmIHN1YnN0aXR1dGlvbnMuc21hcnRfY291bnRcbi8vIGlzIHNldC4gWW91IGNhbiBwYXNzIGluIGEgbnVtYmVyIGluc3RlYWQgb2YgYW4gT2JqZWN0IGFzIGBzdWJzdGl0dXRpb25zYFxuLy8gYXMgYSBzaG9ydGN1dCBmb3IgYHNtYXJ0X2NvdW50YC5cbi8vXG4vLyAgICAgdHJhbnNmb3JtUGhyYXNlKCcle3NtYXJ0X2NvdW50fSBuZXcgbWVzc2FnZXMgfHx8fCAxIG5ldyBtZXNzYWdlJywge3NtYXJ0X2NvdW50OiAxfSwgJ2VuJyk7XG4vLyAgICAgLy8gXCIxIG5ldyBtZXNzYWdlXCJcbi8vXG4vLyAgICAgdHJhbnNmb3JtUGhyYXNlKCcle3NtYXJ0X2NvdW50fSBuZXcgbWVzc2FnZXMgfHx8fCAxIG5ldyBtZXNzYWdlJywge3NtYXJ0X2NvdW50OiAyfSwgJ2VuJyk7XG4vLyAgICAgLy8gXCIyIG5ldyBtZXNzYWdlc1wiXG4vL1xuLy8gICAgIHRyYW5zZm9ybVBocmFzZSgnJXtzbWFydF9jb3VudH0gbmV3IG1lc3NhZ2VzIHx8fHwgMSBuZXcgbWVzc2FnZScsIDUsICdlbicpO1xuLy8gICAgIC8vIFwiNSBuZXcgbWVzc2FnZXNcIlxuLy9cbi8vIFlvdSBzaG91bGQgcGFzcyBpbiBhIHRoaXJkIGFyZ3VtZW50LCB0aGUgbG9jYWxlLCB0byBzcGVjaWZ5IHRoZSBjb3JyZWN0IHBsdXJhbCB0eXBlLlxuLy8gSXQgZGVmYXVsdHMgdG8gYCdlbidgIHdpdGggMiBwbHVyYWwgZm9ybXMuXG5mdW5jdGlvbiB0cmFuc2Zvcm1QaHJhc2UocGhyYXNlLCBzdWJzdGl0dXRpb25zLCBsb2NhbGUsIHRva2VuUmVnZXgpIHtcbiAgaWYgKHR5cGVvZiBwaHJhc2UgIT09ICdzdHJpbmcnKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcignUG9seWdsb3QudHJhbnNmb3JtUGhyYXNlIGV4cGVjdHMgYXJndW1lbnQgIzEgdG8gYmUgc3RyaW5nJyk7XG4gIH1cblxuICBpZiAoc3Vic3RpdHV0aW9ucyA9PSBudWxsKSB7XG4gICAgcmV0dXJuIHBocmFzZTtcbiAgfVxuXG4gIHZhciByZXN1bHQgPSBwaHJhc2U7XG4gIHZhciBpbnRlcnBvbGF0aW9uUmVnZXggPSB0b2tlblJlZ2V4IHx8IGRlZmF1bHRUb2tlblJlZ2V4O1xuXG4gIC8vIGFsbG93IG51bWJlciBhcyBhIHBsdXJhbGl6YXRpb24gc2hvcnRjdXRcbiAgdmFyIG9wdGlvbnMgPSB0eXBlb2Ygc3Vic3RpdHV0aW9ucyA9PT0gJ251bWJlcicgPyB7IHNtYXJ0X2NvdW50OiBzdWJzdGl0dXRpb25zIH0gOiBzdWJzdGl0dXRpb25zO1xuXG4gIC8vIFNlbGVjdCBwbHVyYWwgZm9ybTogYmFzZWQgb24gYSBwaHJhc2UgdGV4dCB0aGF0IGNvbnRhaW5zIGBuYFxuICAvLyBwbHVyYWwgZm9ybXMgc2VwYXJhdGVkIGJ5IGBkZWxpbWl0ZXJgLCBhIGBsb2NhbGVgLCBhbmQgYSBgc3Vic3RpdHV0aW9ucy5zbWFydF9jb3VudGAsXG4gIC8vIGNob29zZSB0aGUgY29ycmVjdCBwbHVyYWwgZm9ybS4gVGhpcyBpcyBvbmx5IGRvbmUgaWYgYGNvdW50YCBpcyBzZXQuXG4gIGlmIChvcHRpb25zLnNtYXJ0X2NvdW50ICE9IG51bGwgJiYgcmVzdWx0KSB7XG4gICAgdmFyIHRleHRzID0gc3BsaXQuY2FsbChyZXN1bHQsIGRlbGltaXRlcik7XG4gICAgcmVzdWx0ID0gdHJpbSh0ZXh0c1twbHVyYWxUeXBlSW5kZXgobG9jYWxlIHx8ICdlbicsIG9wdGlvbnMuc21hcnRfY291bnQpXSB8fCB0ZXh0c1swXSk7XG4gIH1cblxuICAvLyBJbnRlcnBvbGF0ZTogQ3JlYXRlcyBhIGBSZWdFeHBgIG9iamVjdCBmb3IgZWFjaCBpbnRlcnBvbGF0aW9uIHBsYWNlaG9sZGVyLlxuICByZXN1bHQgPSByZXBsYWNlLmNhbGwocmVzdWx0LCBpbnRlcnBvbGF0aW9uUmVnZXgsIGZ1bmN0aW9uIChleHByZXNzaW9uLCBhcmd1bWVudCkge1xuICAgIGlmICghaGFzKG9wdGlvbnMsIGFyZ3VtZW50KSB8fCBvcHRpb25zW2FyZ3VtZW50XSA9PSBudWxsKSB7IHJldHVybiBleHByZXNzaW9uOyB9XG4gICAgLy8gRW5zdXJlIHJlcGxhY2VtZW50IHZhbHVlIGlzIGVzY2FwZWQgdG8gcHJldmVudCBzcGVjaWFsICQtcHJlZml4ZWQgcmVnZXggcmVwbGFjZSB0b2tlbnMuXG4gICAgcmV0dXJuIHJlcGxhY2UuY2FsbChvcHRpb25zW2FyZ3VtZW50XSwgZG9sbGFyUmVnZXgsIGRvbGxhckJpbGxzWWFsbCk7XG4gIH0pO1xuXG4gIHJldHVybiByZXN1bHQ7XG59XG5cbi8vICMjIyBQb2x5Z2xvdCBjbGFzcyBjb25zdHJ1Y3RvclxuZnVuY3Rpb24gUG9seWdsb3Qob3B0aW9ucykge1xuICB2YXIgb3B0cyA9IG9wdGlvbnMgfHwge307XG4gIHRoaXMucGhyYXNlcyA9IHt9O1xuICB0aGlzLmV4dGVuZChvcHRzLnBocmFzZXMgfHwge30pO1xuICB0aGlzLmN1cnJlbnRMb2NhbGUgPSBvcHRzLmxvY2FsZSB8fCAnZW4nO1xuICB2YXIgYWxsb3dNaXNzaW5nID0gb3B0cy5hbGxvd01pc3NpbmcgPyB0cmFuc2Zvcm1QaHJhc2UgOiBudWxsO1xuICB0aGlzLm9uTWlzc2luZ0tleSA9IHR5cGVvZiBvcHRzLm9uTWlzc2luZ0tleSA9PT0gJ2Z1bmN0aW9uJyA/IG9wdHMub25NaXNzaW5nS2V5IDogYWxsb3dNaXNzaW5nO1xuICB0aGlzLndhcm4gPSBvcHRzLndhcm4gfHwgd2FybjtcbiAgdGhpcy50b2tlblJlZ2V4ID0gY29uc3RydWN0VG9rZW5SZWdleChvcHRzLmludGVycG9sYXRpb24pO1xufVxuXG4vLyAjIyMgcG9seWdsb3QubG9jYWxlKFtsb2NhbGVdKVxuLy9cbi8vIEdldCBvciBzZXQgbG9jYWxlLiBJbnRlcm5hbGx5LCBQb2x5Z2xvdCBvbmx5IHVzZXMgbG9jYWxlIGZvciBwbHVyYWxpemF0aW9uLlxuUG9seWdsb3QucHJvdG90eXBlLmxvY2FsZSA9IGZ1bmN0aW9uIChuZXdMb2NhbGUpIHtcbiAgaWYgKG5ld0xvY2FsZSkgdGhpcy5jdXJyZW50TG9jYWxlID0gbmV3TG9jYWxlO1xuICByZXR1cm4gdGhpcy5jdXJyZW50TG9jYWxlO1xufTtcblxuLy8gIyMjIHBvbHlnbG90LmV4dGVuZChwaHJhc2VzKVxuLy9cbi8vIFVzZSBgZXh0ZW5kYCB0byB0ZWxsIFBvbHlnbG90IGhvdyB0byB0cmFuc2xhdGUgYSBnaXZlbiBrZXkuXG4vL1xuLy8gICAgIHBvbHlnbG90LmV4dGVuZCh7XG4vLyAgICAgICBcImhlbGxvXCI6IFwiSGVsbG9cIixcbi8vICAgICAgIFwiaGVsbG9fbmFtZVwiOiBcIkhlbGxvLCAle25hbWV9XCJcbi8vICAgICB9KTtcbi8vXG4vLyBUaGUga2V5IGNhbiBiZSBhbnkgc3RyaW5nLiAgRmVlbCBmcmVlIHRvIGNhbGwgYGV4dGVuZGAgbXVsdGlwbGUgdGltZXM7XG4vLyBpdCB3aWxsIG92ZXJyaWRlIGFueSBwaHJhc2VzIHdpdGggdGhlIHNhbWUga2V5LCBidXQgbGVhdmUgZXhpc3RpbmcgcGhyYXNlc1xuLy8gdW50b3VjaGVkLlxuLy9cbi8vIEl0IGlzIGFsc28gcG9zc2libGUgdG8gcGFzcyBuZXN0ZWQgcGhyYXNlIG9iamVjdHMsIHdoaWNoIGdldCBmbGF0dGVuZWRcbi8vIGludG8gYW4gb2JqZWN0IHdpdGggdGhlIG5lc3RlZCBrZXlzIGNvbmNhdGVuYXRlZCB1c2luZyBkb3Qgbm90YXRpb24uXG4vL1xuLy8gICAgIHBvbHlnbG90LmV4dGVuZCh7XG4vLyAgICAgICBcIm5hdlwiOiB7XG4vLyAgICAgICAgIFwiaGVsbG9cIjogXCJIZWxsb1wiLFxuLy8gICAgICAgICBcImhlbGxvX25hbWVcIjogXCJIZWxsbywgJXtuYW1lfVwiLFxuLy8gICAgICAgICBcInNpZGViYXJcIjoge1xuLy8gICAgICAgICAgIFwid2VsY29tZVwiOiBcIldlbGNvbWVcIlxuLy8gICAgICAgICB9XG4vLyAgICAgICB9XG4vLyAgICAgfSk7XG4vL1xuLy8gICAgIGNvbnNvbGUubG9nKHBvbHlnbG90LnBocmFzZXMpO1xuLy8gICAgIC8vIHtcbi8vICAgICAvLyAgICduYXYuaGVsbG8nOiAnSGVsbG8nLFxuLy8gICAgIC8vICAgJ25hdi5oZWxsb19uYW1lJzogJ0hlbGxvLCAle25hbWV9Jyxcbi8vICAgICAvLyAgICduYXYuc2lkZWJhci53ZWxjb21lJzogJ1dlbGNvbWUnXG4vLyAgICAgLy8gfVxuLy9cbi8vIGBleHRlbmRgIGFjY2VwdHMgYW4gb3B0aW9uYWwgc2Vjb25kIGFyZ3VtZW50LCBgcHJlZml4YCwgd2hpY2ggY2FuIGJlIHVzZWRcbi8vIHRvIHByZWZpeCBldmVyeSBrZXkgaW4gdGhlIHBocmFzZXMgb2JqZWN0IHdpdGggc29tZSBzdHJpbmcsIHVzaW5nIGRvdFxuLy8gbm90YXRpb24uXG4vL1xuLy8gICAgIHBvbHlnbG90LmV4dGVuZCh7XG4vLyAgICAgICBcImhlbGxvXCI6IFwiSGVsbG9cIixcbi8vICAgICAgIFwiaGVsbG9fbmFtZVwiOiBcIkhlbGxvLCAle25hbWV9XCJcbi8vICAgICB9LCBcIm5hdlwiKTtcbi8vXG4vLyAgICAgY29uc29sZS5sb2cocG9seWdsb3QucGhyYXNlcyk7XG4vLyAgICAgLy8ge1xuLy8gICAgIC8vICAgJ25hdi5oZWxsbyc6ICdIZWxsbycsXG4vLyAgICAgLy8gICAnbmF2LmhlbGxvX25hbWUnOiAnSGVsbG8sICV7bmFtZX0nXG4vLyAgICAgLy8gfVxuLy9cbi8vIFRoaXMgZmVhdHVyZSBpcyB1c2VkIGludGVybmFsbHkgdG8gc3VwcG9ydCBuZXN0ZWQgcGhyYXNlIG9iamVjdHMuXG5Qb2x5Z2xvdC5wcm90b3R5cGUuZXh0ZW5kID0gZnVuY3Rpb24gKG1vcmVQaHJhc2VzLCBwcmVmaXgpIHtcbiAgZm9yRWFjaChtb3JlUGhyYXNlcywgZnVuY3Rpb24gKHBocmFzZSwga2V5KSB7XG4gICAgdmFyIHByZWZpeGVkS2V5ID0gcHJlZml4ID8gcHJlZml4ICsgJy4nICsga2V5IDoga2V5O1xuICAgIGlmICh0eXBlb2YgcGhyYXNlID09PSAnb2JqZWN0Jykge1xuICAgICAgdGhpcy5leHRlbmQocGhyYXNlLCBwcmVmaXhlZEtleSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMucGhyYXNlc1twcmVmaXhlZEtleV0gPSBwaHJhc2U7XG4gICAgfVxuICB9LCB0aGlzKTtcbn07XG5cbi8vICMjIyBwb2x5Z2xvdC51bnNldChwaHJhc2VzKVxuLy8gVXNlIGB1bnNldGAgdG8gc2VsZWN0aXZlbHkgcmVtb3ZlIGtleXMgZnJvbSBhIHBvbHlnbG90IGluc3RhbmNlLlxuLy9cbi8vICAgICBwb2x5Z2xvdC51bnNldChcInNvbWVfa2V5XCIpO1xuLy8gICAgIHBvbHlnbG90LnVuc2V0KHtcbi8vICAgICAgIFwiaGVsbG9cIjogXCJIZWxsb1wiLFxuLy8gICAgICAgXCJoZWxsb19uYW1lXCI6IFwiSGVsbG8sICV7bmFtZX1cIlxuLy8gICAgIH0pO1xuLy9cbi8vIFRoZSB1bnNldCBtZXRob2QgY2FuIHRha2UgZWl0aGVyIGEgc3RyaW5nIChmb3IgdGhlIGtleSksIG9yIGFuIG9iamVjdCBoYXNoIHdpdGhcbi8vIHRoZSBrZXlzIHRoYXQgeW91IHdvdWxkIGxpa2UgdG8gdW5zZXQuXG5Qb2x5Z2xvdC5wcm90b3R5cGUudW5zZXQgPSBmdW5jdGlvbiAobW9yZVBocmFzZXMsIHByZWZpeCkge1xuICBpZiAodHlwZW9mIG1vcmVQaHJhc2VzID09PSAnc3RyaW5nJykge1xuICAgIGRlbGV0ZSB0aGlzLnBocmFzZXNbbW9yZVBocmFzZXNdO1xuICB9IGVsc2Uge1xuICAgIGZvckVhY2gobW9yZVBocmFzZXMsIGZ1bmN0aW9uIChwaHJhc2UsIGtleSkge1xuICAgICAgdmFyIHByZWZpeGVkS2V5ID0gcHJlZml4ID8gcHJlZml4ICsgJy4nICsga2V5IDoga2V5O1xuICAgICAgaWYgKHR5cGVvZiBwaHJhc2UgPT09ICdvYmplY3QnKSB7XG4gICAgICAgIHRoaXMudW5zZXQocGhyYXNlLCBwcmVmaXhlZEtleSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBkZWxldGUgdGhpcy5waHJhc2VzW3ByZWZpeGVkS2V5XTtcbiAgICAgIH1cbiAgICB9LCB0aGlzKTtcbiAgfVxufTtcblxuLy8gIyMjIHBvbHlnbG90LmNsZWFyKClcbi8vXG4vLyBDbGVhcnMgYWxsIHBocmFzZXMuIFVzZWZ1bCBmb3Igc3BlY2lhbCBjYXNlcywgc3VjaCBhcyBmcmVlaW5nXG4vLyB1cCBtZW1vcnkgaWYgeW91IGhhdmUgbG90cyBvZiBwaHJhc2VzIGJ1dCBubyBsb25nZXIgbmVlZCB0b1xuLy8gcGVyZm9ybSBhbnkgdHJhbnNsYXRpb24uIEFsc28gdXNlZCBpbnRlcm5hbGx5IGJ5IGByZXBsYWNlYC5cblBvbHlnbG90LnByb3RvdHlwZS5jbGVhciA9IGZ1bmN0aW9uICgpIHtcbiAgdGhpcy5waHJhc2VzID0ge307XG59O1xuXG4vLyAjIyMgcG9seWdsb3QucmVwbGFjZShwaHJhc2VzKVxuLy9cbi8vIENvbXBsZXRlbHkgcmVwbGFjZSB0aGUgZXhpc3RpbmcgcGhyYXNlcyB3aXRoIGEgbmV3IHNldCBvZiBwaHJhc2VzLlxuLy8gTm9ybWFsbHksIGp1c3QgdXNlIGBleHRlbmRgIHRvIGFkZCBtb3JlIHBocmFzZXMsIGJ1dCB1bmRlciBjZXJ0YWluXG4vLyBjaXJjdW1zdGFuY2VzLCB5b3UgbWF5IHdhbnQgdG8gbWFrZSBzdXJlIG5vIG9sZCBwaHJhc2VzIGFyZSBseWluZyBhcm91bmQuXG5Qb2x5Z2xvdC5wcm90b3R5cGUucmVwbGFjZSA9IGZ1bmN0aW9uIChuZXdQaHJhc2VzKSB7XG4gIHRoaXMuY2xlYXIoKTtcbiAgdGhpcy5leHRlbmQobmV3UGhyYXNlcyk7XG59O1xuXG5cbi8vICMjIyBwb2x5Z2xvdC50KGtleSwgb3B0aW9ucylcbi8vXG4vLyBUaGUgbW9zdC11c2VkIG1ldGhvZC4gUHJvdmlkZSBhIGtleSwgYW5kIGB0YCB3aWxsIHJldHVybiB0aGVcbi8vIHBocmFzZS5cbi8vXG4vLyAgICAgcG9seWdsb3QudChcImhlbGxvXCIpO1xuLy8gICAgID0+IFwiSGVsbG9cIlxuLy9cbi8vIFRoZSBwaHJhc2UgdmFsdWUgaXMgcHJvdmlkZWQgZmlyc3QgYnkgYSBjYWxsIHRvIGBwb2x5Z2xvdC5leHRlbmQoKWAgb3Jcbi8vIGBwb2x5Z2xvdC5yZXBsYWNlKClgLlxuLy9cbi8vIFBhc3MgaW4gYW4gb2JqZWN0IGFzIHRoZSBzZWNvbmQgYXJndW1lbnQgdG8gcGVyZm9ybSBpbnRlcnBvbGF0aW9uLlxuLy9cbi8vICAgICBwb2x5Z2xvdC50KFwiaGVsbG9fbmFtZVwiLCB7bmFtZTogXCJTcGlrZVwifSk7XG4vLyAgICAgPT4gXCJIZWxsbywgU3Bpa2VcIlxuLy9cbi8vIElmIHlvdSBsaWtlLCB5b3UgY2FuIHByb3ZpZGUgYSBkZWZhdWx0IHZhbHVlIGluIGNhc2UgdGhlIHBocmFzZSBpcyBtaXNzaW5nLlxuLy8gVXNlIHRoZSBzcGVjaWFsIG9wdGlvbiBrZXkgXCJfXCIgdG8gc3BlY2lmeSBhIGRlZmF1bHQuXG4vL1xuLy8gICAgIHBvbHlnbG90LnQoXCJpX2xpa2VfdG9fd3JpdGVfaW5fbGFuZ3VhZ2VcIiwge1xuLy8gICAgICAgXzogXCJJIGxpa2UgdG8gd3JpdGUgaW4gJXtsYW5ndWFnZX0uXCIsXG4vLyAgICAgICBsYW5ndWFnZTogXCJKYXZhU2NyaXB0XCJcbi8vICAgICB9KTtcbi8vICAgICA9PiBcIkkgbGlrZSB0byB3cml0ZSBpbiBKYXZhU2NyaXB0LlwiXG4vL1xuUG9seWdsb3QucHJvdG90eXBlLnQgPSBmdW5jdGlvbiAoa2V5LCBvcHRpb25zKSB7XG4gIHZhciBwaHJhc2UsIHJlc3VsdDtcbiAgdmFyIG9wdHMgPSBvcHRpb25zID09IG51bGwgPyB7fSA6IG9wdGlvbnM7XG4gIGlmICh0eXBlb2YgdGhpcy5waHJhc2VzW2tleV0gPT09ICdzdHJpbmcnKSB7XG4gICAgcGhyYXNlID0gdGhpcy5waHJhc2VzW2tleV07XG4gIH0gZWxzZSBpZiAodHlwZW9mIG9wdHMuXyA9PT0gJ3N0cmluZycpIHtcbiAgICBwaHJhc2UgPSBvcHRzLl87XG4gIH0gZWxzZSBpZiAodGhpcy5vbk1pc3NpbmdLZXkpIHtcbiAgICB2YXIgb25NaXNzaW5nS2V5ID0gdGhpcy5vbk1pc3NpbmdLZXk7XG4gICAgcmVzdWx0ID0gb25NaXNzaW5nS2V5KGtleSwgb3B0cywgdGhpcy5jdXJyZW50TG9jYWxlLCB0aGlzLnRva2VuUmVnZXgpO1xuICB9IGVsc2Uge1xuICAgIHRoaXMud2FybignTWlzc2luZyB0cmFuc2xhdGlvbiBmb3Iga2V5OiBcIicgKyBrZXkgKyAnXCInKTtcbiAgICByZXN1bHQgPSBrZXk7XG4gIH1cbiAgaWYgKHR5cGVvZiBwaHJhc2UgPT09ICdzdHJpbmcnKSB7XG4gICAgcmVzdWx0ID0gdHJhbnNmb3JtUGhyYXNlKHBocmFzZSwgb3B0cywgdGhpcy5jdXJyZW50TG9jYWxlLCB0aGlzLnRva2VuUmVnZXgpO1xuICB9XG4gIHJldHVybiByZXN1bHQ7XG59O1xuXG5cbi8vICMjIyBwb2x5Z2xvdC5oYXMoa2V5KVxuLy9cbi8vIENoZWNrIGlmIHBvbHlnbG90IGhhcyBhIHRyYW5zbGF0aW9uIGZvciBnaXZlbiBrZXlcblBvbHlnbG90LnByb3RvdHlwZS5oYXMgPSBmdW5jdGlvbiAoa2V5KSB7XG4gIHJldHVybiBoYXModGhpcy5waHJhc2VzLCBrZXkpO1xufTtcblxuLy8gZXhwb3J0IHRyYW5zZm9ybVBocmFzZVxuUG9seWdsb3QudHJhbnNmb3JtUGhyYXNlID0gZnVuY3Rpb24gdHJhbnNmb3JtKHBocmFzZSwgc3Vic3RpdHV0aW9ucywgbG9jYWxlKSB7XG4gIHJldHVybiB0cmFuc2Zvcm1QaHJhc2UocGhyYXNlLCBzdWJzdGl0dXRpb25zLCBsb2NhbGUpO1xufTtcblxudmFyIHdlYml4UG9seWdsb3QgPSBQb2x5Z2xvdDtcblxuZnVuY3Rpb24gTG9jYWxlKGFwcCwgX3ZpZXcsIGNvbmZpZykge1xyXG4gICAgY29uZmlnID0gY29uZmlnIHx8IHt9O1xyXG4gICAgY29uc3Qgc3RvcmFnZSA9IGNvbmZpZy5zdG9yYWdlO1xyXG4gICAgbGV0IGxhbmcgPSBzdG9yYWdlID8gKHN0b3JhZ2UuZ2V0KFwibGFuZ1wiKSB8fCBcImVuXCIpIDogKGNvbmZpZy5sYW5nIHx8IFwiZW5cIik7XHJcbiAgICBmdW5jdGlvbiBzZXRMYW5nRGF0YShuYW1lLCBkYXRhLCBzaWxlbnQpIHtcclxuICAgICAgICBpZiAoZGF0YS5fX2VzTW9kdWxlKSB7XHJcbiAgICAgICAgICAgIGRhdGEgPSBkYXRhLmRlZmF1bHQ7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNvbnN0IHBjb25maWcgPSB7IHBocmFzZXM6IGRhdGEgfTtcclxuICAgICAgICBpZiAoY29uZmlnLnBvbHlnbG90KSB7XHJcbiAgICAgICAgICAgIGFwcC53ZWJpeC5leHRlbmQocGNvbmZpZywgY29uZmlnLnBvbHlnbG90KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgY29uc3QgcG9seSA9IHNlcnZpY2UucG9seWdsb3QgPSBuZXcgd2ViaXhQb2x5Z2xvdChwY29uZmlnKTtcclxuICAgICAgICBwb2x5LmxvY2FsZShuYW1lKTtcclxuICAgICAgICBzZXJ2aWNlLl8gPSBhcHAud2ViaXguYmluZChwb2x5LnQsIHBvbHkpO1xyXG4gICAgICAgIGxhbmcgPSBuYW1lO1xyXG4gICAgICAgIGlmIChzdG9yYWdlKSB7XHJcbiAgICAgICAgICAgIHN0b3JhZ2UucHV0KFwibGFuZ1wiLCBsYW5nKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKGNvbmZpZy53ZWJpeCkge1xyXG4gICAgICAgICAgICBjb25zdCBsb2NOYW1lID0gY29uZmlnLndlYml4W25hbWVdO1xyXG4gICAgICAgICAgICBpZiAobG9jTmFtZSkge1xyXG4gICAgICAgICAgICAgICAgYXBwLndlYml4LmkxOG4uc2V0TG9jYWxlKGxvY05hbWUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICghc2lsZW50KSB7XHJcbiAgICAgICAgICAgIHJldHVybiBhcHAucmVmcmVzaCgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKCk7XHJcbiAgICB9XHJcbiAgICBmdW5jdGlvbiBnZXRMYW5nKCkgeyByZXR1cm4gbGFuZzsgfVxyXG4gICAgZnVuY3Rpb24gc2V0TGFuZyhuYW1lLCBzaWxlbnQpIHtcclxuICAgICAgICAvLyBpZ25vcmUgc2V0TGFuZyBpZiBsb2FkaW5nIGJ5IHBhdGggaXMgZGlzYWJsZWRcclxuICAgICAgICBpZiAoY29uZmlnLnBhdGggPT09IGZhbHNlKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgY29uc3QgcGF0aCA9IChjb25maWcucGF0aCA/IGNvbmZpZy5wYXRoICsgXCIvXCIgOiBcIlwiKSArIG5hbWU7XHJcbiAgICAgICAgY29uc3QgZGF0YSA9IHJlcXVpcmUoXCJqZXQtbG9jYWxlcy9cIiArIHBhdGgpO1xyXG4gICAgICAgIHNldExhbmdEYXRhKG5hbWUsIGRhdGEsIHNpbGVudCk7XHJcbiAgICB9XHJcbiAgICBjb25zdCBzZXJ2aWNlID0ge1xyXG4gICAgICAgIGdldExhbmcsIHNldExhbmcsIHNldExhbmdEYXRhLCBfOiBudWxsLCBwb2x5Z2xvdDogbnVsbFxyXG4gICAgfTtcclxuICAgIGFwcC5zZXRTZXJ2aWNlKFwibG9jYWxlXCIsIHNlcnZpY2UpO1xyXG4gICAgc2V0TGFuZyhsYW5nLCB0cnVlKTtcclxufVxuXG5mdW5jdGlvbiBzaG93KHZpZXcsIGNvbmZpZywgdmFsdWUpIHtcclxuICAgIGlmIChjb25maWcudXJscykge1xyXG4gICAgICAgIHZhbHVlID0gY29uZmlnLnVybHNbdmFsdWVdIHx8IHZhbHVlO1xyXG4gICAgfVxyXG4gICAgZWxzZSBpZiAoY29uZmlnLnBhcmFtKSB7XHJcbiAgICAgICAgdmFsdWUgPSB7IFtjb25maWcucGFyYW1dOiB2YWx1ZSB9O1xyXG4gICAgfVxyXG4gICAgdmlldy5zaG93KHZhbHVlKTtcclxufVxyXG5mdW5jdGlvbiBNZW51KGFwcCwgdmlldywgY29uZmlnKSB7XHJcbiAgICBjb25zdCBmcmFtZSA9IHZpZXcuZ2V0U3ViVmlld0luZm8oKS5wYXJlbnQ7XHJcbiAgICBjb25zdCB1aSA9IHZpZXcuJCQoY29uZmlnLmlkIHx8IGNvbmZpZyk7XHJcbiAgICBsZXQgc2lsZW50ID0gZmFsc2U7XHJcbiAgICB1aS5hdHRhY2hFdmVudChcIm9uY2hhbmdlXCIsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBpZiAoIXNpbGVudCkge1xyXG4gICAgICAgICAgICBzaG93KGZyYW1lLCBjb25maWcsIHRoaXMuZ2V0VmFsdWUoKSk7XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcbiAgICB1aS5hdHRhY2hFdmVudChcIm9uYWZ0ZXJzZWxlY3RcIiwgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIGlmICghc2lsZW50KSB7XHJcbiAgICAgICAgICAgIGxldCBpZCA9IG51bGw7XHJcbiAgICAgICAgICAgIGlmICh1aS5zZXRWYWx1ZSkge1xyXG4gICAgICAgICAgICAgICAgaWQgPSB0aGlzLmdldFZhbHVlKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSBpZiAodWkuZ2V0U2VsZWN0ZWRJZCkge1xyXG4gICAgICAgICAgICAgICAgaWQgPSB1aS5nZXRTZWxlY3RlZElkKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgc2hvdyhmcmFtZSwgY29uZmlnLCBpZCk7XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcbiAgICB2aWV3Lm9uKGFwcCwgYGFwcDpyb3V0ZWAsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBsZXQgbmFtZSA9IFwiXCI7XHJcbiAgICAgICAgaWYgKGNvbmZpZy5wYXJhbSkge1xyXG4gICAgICAgICAgICBuYW1lID0gdmlldy5nZXRQYXJhbShjb25maWcucGFyYW0sIHRydWUpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgY29uc3Qgc2VnbWVudCA9IGZyYW1lLmdldFVybCgpWzFdO1xyXG4gICAgICAgICAgICBpZiAoc2VnbWVudCkge1xyXG4gICAgICAgICAgICAgICAgbmFtZSA9IHNlZ21lbnQucGFnZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAobmFtZSkge1xyXG4gICAgICAgICAgICBzaWxlbnQgPSB0cnVlO1xyXG4gICAgICAgICAgICBpZiAodWkuc2V0VmFsdWUgJiYgdWkuZ2V0VmFsdWUoKSAhPT0gbmFtZSkge1xyXG4gICAgICAgICAgICAgICAgdWkuc2V0VmFsdWUobmFtZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSBpZiAodWkuc2VsZWN0ICYmIHVpLmV4aXN0cyhuYW1lKSAmJiB1aS5nZXRTZWxlY3RlZElkKCkgIT09IG5hbWUpIHtcclxuICAgICAgICAgICAgICAgIHVpLnNlbGVjdChuYW1lKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBzaWxlbnQgPSBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxufVxuXG5jb25zdCBiYXNlaWNvbnMgPSB7XHJcbiAgICBnb29kOiBcImNoZWNrXCIsXHJcbiAgICBlcnJvcjogXCJ3YXJuaW5nXCIsXHJcbiAgICBzYXZpbmc6IFwicmVmcmVzaCBmYS1zcGluXCJcclxufTtcclxuY29uc3QgYmFzZXRleHQgPSB7XHJcbiAgICBnb29kOiBcIk9rXCIsXHJcbiAgICBlcnJvcjogXCJFcnJvclwiLFxyXG4gICAgc2F2aW5nOiBcIkNvbm5lY3RpbmcuLi5cIlxyXG59O1xyXG5mdW5jdGlvbiBTdGF0dXMoYXBwLCB2aWV3LCBjb25maWcpIHtcclxuICAgIGxldCBzdGF0dXMgPSBcImdvb2RcIjtcclxuICAgIGxldCBjb3VudCA9IDA7XHJcbiAgICBsZXQgaXNlcnJvciA9IGZhbHNlO1xyXG4gICAgbGV0IGV4cGlyZURlbGF5ID0gY29uZmlnLmV4cGlyZTtcclxuICAgIGlmICghZXhwaXJlRGVsYXkgJiYgZXhwaXJlRGVsYXkgIT09IGZhbHNlKSB7XHJcbiAgICAgICAgZXhwaXJlRGVsYXkgPSAyMDAwO1xyXG4gICAgfVxyXG4gICAgY29uc3QgdGV4dHMgPSBjb25maWcudGV4dHMgfHwgYmFzZXRleHQ7XHJcbiAgICBjb25zdCBpY29ucyA9IGNvbmZpZy5pY29ucyB8fCBiYXNlaWNvbnM7XHJcbiAgICBpZiAodHlwZW9mIGNvbmZpZyA9PT0gXCJzdHJpbmdcIikge1xyXG4gICAgICAgIGNvbmZpZyA9IHsgdGFyZ2V0OiBjb25maWcgfTtcclxuICAgIH1cclxuICAgIGZ1bmN0aW9uIHJlZnJlc2goY29udGVudCkge1xyXG4gICAgICAgIGNvbnN0IGFyZWEgPSB2aWV3LiQkKGNvbmZpZy50YXJnZXQpO1xyXG4gICAgICAgIGlmIChhcmVhKSB7XHJcbiAgICAgICAgICAgIGlmICghY29udGVudCkge1xyXG4gICAgICAgICAgICAgICAgY29udGVudCA9IFwiPGRpdiBjbGFzcz0nc3RhdHVzX1wiICtcclxuICAgICAgICAgICAgICAgICAgICBzdGF0dXMgK1xyXG4gICAgICAgICAgICAgICAgICAgIFwiJz48c3BhbiBjbGFzcz0nd2ViaXhfaWNvbiBmYS1cIiArXHJcbiAgICAgICAgICAgICAgICAgICAgaWNvbnNbc3RhdHVzXSArIFwiJz48L3NwYW4+IFwiICsgdGV4dHNbc3RhdHVzXSArIFwiPC9kaXY+XCI7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgYXJlYS5zZXRIVE1MKGNvbnRlbnQpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGZ1bmN0aW9uIHN1Y2Nlc3MoKSB7XHJcbiAgICAgICAgY291bnQtLTtcclxuICAgICAgICBzZXRTdGF0dXMoXCJnb29kXCIpO1xyXG4gICAgfVxyXG4gICAgZnVuY3Rpb24gZmFpbChlcnIpIHtcclxuICAgICAgICBjb3VudC0tO1xyXG4gICAgICAgIHNldFN0YXR1cyhcImVycm9yXCIsIGVycik7XHJcbiAgICB9XHJcbiAgICBmdW5jdGlvbiBzdGFydChwcm9taXNlKSB7XHJcbiAgICAgICAgY291bnQrKztcclxuICAgICAgICBzZXRTdGF0dXMoXCJzYXZpbmdcIik7XHJcbiAgICAgICAgaWYgKHByb21pc2UgJiYgcHJvbWlzZS50aGVuKSB7XHJcbiAgICAgICAgICAgIHByb21pc2UudGhlbihzdWNjZXNzLCBmYWlsKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBmdW5jdGlvbiBnZXRTdGF0dXMoKSB7XHJcbiAgICAgICAgcmV0dXJuIHN0YXR1cztcclxuICAgIH1cclxuICAgIGZ1bmN0aW9uIGhpZGVTdGF0dXMoKSB7XHJcbiAgICAgICAgaWYgKGNvdW50ID09PSAwKSB7XHJcbiAgICAgICAgICAgIHJlZnJlc2goXCIgXCIpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGZ1bmN0aW9uIHNldFN0YXR1cyhtb2RlLCBlcnIpIHtcclxuICAgICAgICBpZiAoY291bnQgPCAwKSB7XHJcbiAgICAgICAgICAgIGNvdW50ID0gMDtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKG1vZGUgPT09IFwic2F2aW5nXCIpIHtcclxuICAgICAgICAgICAgc3RhdHVzID0gXCJzYXZpbmdcIjtcclxuICAgICAgICAgICAgcmVmcmVzaCgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgaXNlcnJvciA9IChtb2RlID09PSBcImVycm9yXCIpO1xyXG4gICAgICAgICAgICBpZiAoY291bnQgPT09IDApIHtcclxuICAgICAgICAgICAgICAgIHN0YXR1cyA9IGlzZXJyb3IgPyBcImVycm9yXCIgOiBcImdvb2RcIjtcclxuICAgICAgICAgICAgICAgIGlmIChpc2Vycm9yKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgYXBwLmVycm9yKFwiYXBwOmVycm9yOnNlcnZlclwiLCBbZXJyLnJlc3BvbnNlVGV4dCB8fCBlcnJdKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChleHBpcmVEZWxheSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KGhpZGVTdGF0dXMsIGV4cGlyZURlbGF5KTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICByZWZyZXNoKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBmdW5jdGlvbiB0cmFjayhkYXRhKSB7XHJcbiAgICAgICAgY29uc3QgZHAgPSBhcHAud2ViaXguZHAoZGF0YSk7XHJcbiAgICAgICAgaWYgKGRwKSB7XHJcbiAgICAgICAgICAgIHZpZXcub24oZHAsIFwib25BZnRlckRhdGFTZW5kXCIsIHN0YXJ0KTtcclxuICAgICAgICAgICAgdmlldy5vbihkcCwgXCJvbkFmdGVyU2F2ZUVycm9yXCIsIChfaWQsIF9vYmosIHJlc3BvbnNlKSA9PiBmYWlsKHJlc3BvbnNlKSk7XHJcbiAgICAgICAgICAgIHZpZXcub24oZHAsIFwib25BZnRlclNhdmVcIiwgc3VjY2Vzcyk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgYXBwLnNldFNlcnZpY2UoXCJzdGF0dXNcIiwge1xyXG4gICAgICAgIGdldFN0YXR1cyxcclxuICAgICAgICBzZXRTdGF0dXMsXHJcbiAgICAgICAgdHJhY2tcclxuICAgIH0pO1xyXG4gICAgaWYgKGNvbmZpZy5yZW1vdGUpIHtcclxuICAgICAgICB2aWV3Lm9uKGFwcC53ZWJpeCwgXCJvblJlbW90ZUNhbGxcIiwgc3RhcnQpO1xyXG4gICAgfVxyXG4gICAgaWYgKGNvbmZpZy5hamF4KSB7XHJcbiAgICAgICAgdmlldy5vbihhcHAud2ViaXgsIFwib25CZWZvcmVBamF4XCIsIChfbW9kZSwgX3VybCwgX2RhdGEsIF9yZXF1ZXN0LCBfaGVhZGVycywgX2ZpbGVzLCBwcm9taXNlKSA9PiB7XHJcbiAgICAgICAgICAgIHN0YXJ0KHByb21pc2UpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgaWYgKGNvbmZpZy5kYXRhKSB7XHJcbiAgICAgICAgdHJhY2soY29uZmlnLmRhdGEpO1xyXG4gICAgfVxyXG59XG5cbmZ1bmN0aW9uIFRoZW1lKGFwcCwgX3ZpZXcsIGNvbmZpZykge1xyXG4gICAgY29uZmlnID0gY29uZmlnIHx8IHt9O1xyXG4gICAgY29uc3Qgc3RvcmFnZSA9IGNvbmZpZy5zdG9yYWdlO1xyXG4gICAgbGV0IHRoZW1lID0gc3RvcmFnZSA/XHJcbiAgICAgICAgKHN0b3JhZ2UuZ2V0KFwidGhlbWVcIikgfHwgXCJmbGF0LWRlZmF1bHRcIilcclxuICAgICAgICA6XHJcbiAgICAgICAgICAgIChjb25maWcudGhlbWUgfHwgXCJmbGF0LWRlZmF1bHRcIik7XHJcbiAgICBjb25zdCBzZXJ2aWNlID0ge1xyXG4gICAgICAgIGdldFRoZW1lKCkgeyByZXR1cm4gdGhlbWU7IH0sXHJcbiAgICAgICAgc2V0VGhlbWUobmFtZSwgc2lsZW50KSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHBhcnRzID0gbmFtZS5zcGxpdChcIi1cIik7XHJcbiAgICAgICAgICAgIGNvbnN0IGxpbmtzID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoXCJsaW5rXCIpO1xyXG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxpbmtzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBsbmFtZSA9IGxpbmtzW2ldLmdldEF0dHJpYnV0ZShcInRpdGxlXCIpO1xyXG4gICAgICAgICAgICAgICAgaWYgKGxuYW1lKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGxuYW1lID09PSBuYW1lIHx8IGxuYW1lID09PSBwYXJ0c1swXSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsaW5rc1tpXS5kaXNhYmxlZCA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGlua3NbaV0uZGlzYWJsZWQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBhcHAud2ViaXguc2tpbi5zZXQocGFydHNbMF0pO1xyXG4gICAgICAgICAgICAvLyByZW1vdmUgb2xkIGNzc1xyXG4gICAgICAgICAgICBhcHAud2ViaXguaHRtbC5yZW1vdmVDc3MoZG9jdW1lbnQuYm9keSwgXCJ0aGVtZS1cIiArIHRoZW1lKTtcclxuICAgICAgICAgICAgLy8gYWRkIG5ldyBjc3NcclxuICAgICAgICAgICAgYXBwLndlYml4Lmh0bWwuYWRkQ3NzKGRvY3VtZW50LmJvZHksIFwidGhlbWUtXCIgKyBuYW1lKTtcclxuICAgICAgICAgICAgdGhlbWUgPSBuYW1lO1xyXG4gICAgICAgICAgICBpZiAoc3RvcmFnZSkge1xyXG4gICAgICAgICAgICAgICAgc3RvcmFnZS5wdXQoXCJ0aGVtZVwiLCBuYW1lKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoIXNpbGVudCkge1xyXG4gICAgICAgICAgICAgICAgYXBwLnJlZnJlc2goKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH07XHJcbiAgICBhcHAuc2V0U2VydmljZShcInRoZW1lXCIsIHNlcnZpY2UpO1xyXG4gICAgc2VydmljZS5zZXRUaGVtZSh0aGVtZSwgdHJ1ZSk7XHJcbn1cblxuZnVuY3Rpb24gY29weVBhcmFtcyhkYXRhLCB1cmwsIHJvdXRlKSB7XHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHJvdXRlLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgZGF0YVtyb3V0ZVtpXV0gPSB1cmxbaSArIDFdID8gdXJsW2kgKyAxXS5wYWdlIDogXCJcIjtcclxuICAgIH1cclxufVxyXG5mdW5jdGlvbiBVcmxQYXJhbShhcHAsIHZpZXcsIGNvbmZpZykge1xyXG4gICAgY29uc3Qgcm91dGUgPSBjb25maWcucm91dGUgfHwgY29uZmlnO1xyXG4gICAgY29uc3QgZGF0YSA9IHt9O1xyXG4gICAgdmlldy5vbihhcHAsIFwiYXBwOnVybGNoYW5nZVwiLCBmdW5jdGlvbiAoc3Vidmlldywgc2VnbWVudCkge1xyXG4gICAgICAgIGlmICh2aWV3ID09PSBzdWJ2aWV3KSB7XHJcbiAgICAgICAgICAgIGNvcHlQYXJhbXMoZGF0YSwgc2VnbWVudC5zdWJ1cmwoKSwgcm91dGUpO1xyXG4gICAgICAgICAgICBzZWdtZW50LnNpemUocm91dGUubGVuZ3RoICsgMSk7XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcbiAgICBjb25zdCBvcyA9IHZpZXcuc2V0UGFyYW07XHJcbiAgICBjb25zdCBvZyA9IHZpZXcuZ2V0UGFyYW07XHJcbiAgICB2aWV3LnNldFBhcmFtID0gZnVuY3Rpb24gKG5hbWUsIHZhbHVlLCBzaG93KSB7XHJcbiAgICAgICAgY29uc3QgaW5kZXggPSByb3V0ZS5pbmRleE9mKG5hbWUpO1xyXG4gICAgICAgIGlmIChpbmRleCA+PSAwKSB7XHJcbiAgICAgICAgICAgIGRhdGFbbmFtZV0gPSB2YWx1ZTtcclxuICAgICAgICAgICAgdGhpcy5fc2VnbWVudC51cGRhdGUoXCJcIiwgdmFsdWUsIGluZGV4ICsgMSk7XHJcbiAgICAgICAgICAgIGlmIChzaG93KSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdmlldy5zaG93KG51bGwpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICByZXR1cm4gb3MuY2FsbCh0aGlzLCBuYW1lLCB2YWx1ZSwgc2hvdyk7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuICAgIHZpZXcuZ2V0UGFyYW0gPSBmdW5jdGlvbiAoa2V5LCBtb2RlKSB7XHJcbiAgICAgICAgY29uc3QgdmFsID0gZGF0YVtrZXldO1xyXG4gICAgICAgIGlmICh0eXBlb2YgdmFsICE9PSBcInVuZGVmaW5lZFwiKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB2YWw7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBvZy5jYWxsKHRoaXMsIGtleSwgbW9kZSk7XHJcbiAgICB9O1xyXG4gICAgY29weVBhcmFtcyhkYXRhLCB2aWV3LmdldFVybCgpLCByb3V0ZSk7XHJcbn1cblxuZnVuY3Rpb24gVXNlcihhcHAsIF92aWV3LCBjb25maWcpIHtcclxuICAgIGNvbmZpZyA9IGNvbmZpZyB8fCB7fTtcclxuICAgIGNvbnN0IGxvZ2luID0gY29uZmlnLmxvZ2luIHx8IFwiL2xvZ2luXCI7XHJcbiAgICBjb25zdCBsb2dvdXQgPSBjb25maWcubG9nb3V0IHx8IFwiL2xvZ291dFwiO1xyXG4gICAgY29uc3QgYWZ0ZXJMb2dpbiA9IGNvbmZpZy5hZnRlckxvZ2luIHx8IGFwcC5jb25maWcuc3RhcnQ7XHJcbiAgICBjb25zdCBhZnRlckxvZ291dCA9IGNvbmZpZy5hZnRlckxvZ291dCB8fCBcIi9sb2dpblwiO1xyXG4gICAgY29uc3QgcGluZyA9IGNvbmZpZy5waW5nIHx8IDUgKiA2MCAqIDEwMDA7XHJcbiAgICBjb25zdCBtb2RlbCA9IGNvbmZpZy5tb2RlbDtcclxuICAgIGxldCB1c2VyID0gY29uZmlnLnVzZXI7XHJcbiAgICBjb25zdCBzZXJ2aWNlID0ge1xyXG4gICAgICAgIGdldFVzZXIoKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB1c2VyO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgZ2V0U3RhdHVzKHNlcnZlcikge1xyXG4gICAgICAgICAgICBpZiAoIXNlcnZlcikge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHVzZXIgIT09IG51bGw7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIG1vZGVsLnN0YXR1cygpLmNhdGNoKCgpID0+IG51bGwpLnRoZW4oZGF0YSA9PiB7XHJcbiAgICAgICAgICAgICAgICB1c2VyID0gZGF0YTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBsb2dpbihuYW1lLCBwYXNzKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBtb2RlbC5sb2dpbihuYW1lLCBwYXNzKS50aGVuKGRhdGEgPT4ge1xyXG4gICAgICAgICAgICAgICAgdXNlciA9IGRhdGE7XHJcbiAgICAgICAgICAgICAgICBpZiAoIWRhdGEpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJBY2Nlc3MgZGVuaWVkXCIpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgYXBwLmNhbGxFdmVudChcImFwcDp1c2VyOmxvZ2luXCIsIFt1c2VyXSk7XHJcbiAgICAgICAgICAgICAgICBhcHAuc2hvdyhhZnRlckxvZ2luKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBsb2dvdXQoKSB7XHJcbiAgICAgICAgICAgIHVzZXIgPSBudWxsO1xyXG4gICAgICAgICAgICByZXR1cm4gbW9kZWwubG9nb3V0KCkudGhlbihyZXMgPT4ge1xyXG4gICAgICAgICAgICAgICAgYXBwLmNhbGxFdmVudChcImFwcDp1c2VyOmxvZ291dFwiLCBbXSk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVzO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG4gICAgZnVuY3Rpb24gY2FuTmF2aWdhdGUodXJsLCBvYmopIHtcclxuICAgICAgICBpZiAodXJsID09PSBsb2dvdXQpIHtcclxuICAgICAgICAgICAgc2VydmljZS5sb2dvdXQoKTtcclxuICAgICAgICAgICAgb2JqLnJlZGlyZWN0ID0gYWZ0ZXJMb2dvdXQ7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYgKHVybCAhPT0gbG9naW4gJiYgIXNlcnZpY2UuZ2V0U3RhdHVzKCkpIHtcclxuICAgICAgICAgICAgb2JqLnJlZGlyZWN0ID0gbG9naW47XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgYXBwLnNldFNlcnZpY2UoXCJ1c2VyXCIsIHNlcnZpY2UpO1xyXG4gICAgYXBwLmF0dGFjaEV2ZW50KGBhcHA6Z3VhcmRgLCBmdW5jdGlvbiAodXJsLCBfJHJvb3QsIG9iaikge1xyXG4gICAgICAgIGlmIChjb25maWcucHVibGljICYmIGNvbmZpZy5wdWJsaWModXJsKSkge1xyXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHR5cGVvZiB1c2VyID09PSBcInVuZGVmaW5lZFwiKSB7XHJcbiAgICAgICAgICAgIG9iai5jb25maXJtID0gc2VydmljZS5nZXRTdGF0dXModHJ1ZSkudGhlbigoKSA9PiBjYW5OYXZpZ2F0ZSh1cmwsIG9iaikpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gY2FuTmF2aWdhdGUodXJsLCBvYmopO1xyXG4gICAgfSk7XHJcbiAgICBpZiAocGluZykge1xyXG4gICAgICAgIHNldEludGVydmFsKCgpID0+IHNlcnZpY2UuZ2V0U3RhdHVzKHRydWUpLCBwaW5nKTtcclxuICAgIH1cclxufVxuXG4vKlxyXG5NSVQgTGljZW5zZVxyXG5Db3B5cmlnaHQgKGMpIDIwMTkgWEIgU29mdHdhcmVcclxuKi9cclxubGV0IHdlYml4ID0gd2luZG93LndlYml4O1xyXG5pZiAod2ViaXgpIHtcclxuICAgIHBhdGNoKHdlYml4KTtcclxufVxyXG5jb25zdCBwbHVnaW5zID0ge1xyXG4gICAgVW5sb2FkR3VhcmQsIExvY2FsZSwgTWVudSwgVGhlbWUsIFVzZXIsIFN0YXR1cywgVXJsUGFyYW1cclxufTtcclxuY29uc3QgZXJyb3JzID0geyBOYXZpZ2F0aW9uQmxvY2tlZCB9O1xyXG5jb25zdCB3ID0gd2luZG93O1xyXG5pZiAoIXcuUHJvbWlzZSkge1xyXG4gICAgdy5Qcm9taXNlID0gdy53ZWJpeC5wcm9taXNlO1xyXG59XG5cbmV4cG9ydCB7IHBsdWdpbnMsIGVycm9ycywgSmV0QXBwLCBKZXRWaWV3LCBIYXNoUm91dGVyLCBTdG9yZVJvdXRlciwgVXJsUm91dGVyLCBFbXB0eVJvdXRlciwgU3ViUm91dGVyIH07XG4vLyMgc291cmNlTWFwcGluZ1VSTD1qZXQuanMubWFwXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9ub2RlX21vZHVsZXMvd2ViaXgtamV0L2Rpc3QvZXM2L2pldC5qcyIsImltcG9ydCB7IEpldFZpZXcgfSBmcm9tIFwid2ViaXgtamV0XCI7XG5pbXBvcnQgeyBwYWNrYWdlcyB9IGZyb20gXCIuLi8uLi9zZXJ2aWNlcy9wYWNrYWdlc1wiO1xuXG5jb25zdCBTVEFUVVNfSU5TVEFMTEVEID0gMztcblxuZXhwb3J0IGNsYXNzIEV4dGVybmFsVmlldyBleHRlbmRzIEpldFZpZXcge1xuICAgIGNvbnN0cnVjdG9yKGFwcCwgbmFtZSwgdGFyZ2V0VXJsLCByZXF1aXJlZFBhY2thZ2VzKSB7XG4gICAgICAgIHN1cGVyKGFwcCwgbmFtZSk7XG5cbiAgICAgICAgdGhpcy50YXJnZXRVcmwgPSB0YXJnZXRVcmwgfHwgXCIvXCI7XG4gICAgICAgIHRoaXMucmVxdWlyZWRQYWNrYWdlcyA9IHJlcXVpcmVkUGFja2FnZXMgfHwge307IC8vIHJlcXVpcmVkIHBhY2thZ2VzIGFzIG5hbWU6IGdpdF91cmwgcGFpcnNcbiAgICB9XG5cbiAgICBjb25maWcoKSB7XG4gICAgICAgIGNvbnN0IHNlbGYgPSB0aGlzO1xuICAgICAgICBjb25zdCBpZnJhbWUgPSB7XG4gICAgICAgICAgICB2aWV3OiBcImlmcmFtZVwiLFxuICAgICAgICAgICAgbG9jYWxJZDogXCJpZnJhbWUtZXh0ZXJuYWxcIixcbiAgICAgICAgICAgIG9uOiB7XG4gICAgICAgICAgICAgICAgb25BZnRlckxvYWQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuaGlkZVByb2dyZXNzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmhpZGVQcm9ncmVzcygpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZW5hYmxlKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuXG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICByb3dzOiBbe1xuICAgICAgICAgICAgICAgIGxvY2FsSWQ6IFwiaW5zdGFsbC1wYWNrYWdlc1wiLFxuICAgICAgICAgICAgICAgIGhpZGRlbjogdHJ1ZSxcbiAgICAgICAgICAgICAgICBjb2xzOiBbXG4gICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxvY2FsSWQ6IFwicmVxdWlyZWRfcGFja2FnZXNfZGl2XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICB2aWV3OiBcInRlbXBsYXRlXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBhdXRvaGVpZ2h0OiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgICAgICAgICB2aWV3OiBcImJ1dHRvblwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgbG9jYWxJZDogXCJpbnN0YWxsX2J0blwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU6IFwiSW5zdGFsbCByZXF1aXJlZCBwYWNrYWdlc1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgY3NzOiBcIndlYml4X3ByaW1hcnlcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIGhlaWdodDogNTAsXG4gICAgICAgICAgICAgICAgICAgICAgICBjbGljazogc2VsZi5pbnN0YWxsUmVxdWlyZWRQYWNrYWdlcy5iaW5kKHNlbGYpXG4gICAgICAgICAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZpZXc6IFwiYnV0dG9uXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBsb2NhbElkOiBcImdvX3RvX3BhY2thZ2VzX2J0blwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU6IFwiR28gdG8gcGFja2FnZXMgYW5kIGluc3RhbGwgdGhlbSBtYW51YWxseVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgY3NzOiBcIndlYml4X3ByaW1hcnlcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIGhlaWdodDogNTAsXG4gICAgICAgICAgICAgICAgICAgICAgICBjbGljazogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuJHNjb3BlLnNob3coXCIvbWFpbi9wYWNrYWdlc1wiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgIH0sIGlmcmFtZV1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIGluc3RhbGxSZXF1aXJlZFBhY2thZ2VzKCkge1xuICAgICAgICBsZXQgcHJvbWlzZXMgPSBPYmplY3QudmFsdWVzKHRoaXMucGFja2FnZXNUb0luc3RhbGwpLm1hcCgocGF0aCkgPT4ge1xuICAgICAgICAgICAgLy8gYWRkIGJ5IGdpdCB1cmxcbiAgICAgICAgICAgIHJldHVybiBwYWNrYWdlcy5hZGQobnVsbCwgcGF0aCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHRoaXMuaW5zdGFsbEJ1dHRvbi5kaXNhYmxlKCk7XG4gICAgICAgIFByb21pc2UuYWxsKHByb21pc2VzKS50aGVuKCgpID0+IHtcbiAgICAgICAgICAgIHdlYml4Lm1lc3NhZ2UoeyB0eXBlOiBcInN1Y2Nlc3NcIiwgdGV4dDogXCJBbGwgcmVxdWlyZWQgcGFja2FnZXMgaW5zdGFsbGVkIHN1Y2Nlc3NmdWxseSwgcGFnZSB3aWxsIGJlIHJlbG9hZGVkIGluIDIgc2Vjb25kc1wiIH0pO1xuICAgICAgICAgICAgc2V0SW50ZXJ2YWwoKCkgPT4gd2luZG93LmxvY2F0aW9uLnJlbG9hZCh0cnVlKSwgMjAwMCk7XG4gICAgICAgIH0pLmNhdGNoKCgpID0+IHtcbiAgICAgICAgICAgIHdlYml4Lm1lc3NhZ2UoeyB0eXBlOiBcImVycm9yXCIsIHRleHQ6IFwiQW4gZXJyb3Igb2NjdXJyZWQsIHBsZWFzZSB0cnkgaW5zdGFsbGluZyBmcm9tIHBhY2thZ2VzIGZvciBtb3JlIGRldGFpbHNcIiB9KTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgc2hvd0lmcmFtZSgpIHtcbiAgICAgICAgdGhpcy5leHRlcm5hbElmcmFtZS5zaG93KCk7XG4gICAgICAgIHRoaXMuZXh0ZXJuYWxJZnJhbWUuc2hvd1Byb2dyZXNzKHsgdHlwZTogXCJpY29uXCIgfSk7XG4gICAgICAgIHRoaXMuZXh0ZXJuYWxJZnJhbWUubG9hZCh0aGlzLnRhcmdldFVybCk7XG4gICAgfVxuXG4gICAgaW5pdCh2aWV3KSB7XG4gICAgICAgIHRoaXMuZXh0ZXJuYWxJZnJhbWUgPSB0aGlzLiQkKFwiaWZyYW1lLWV4dGVybmFsXCIpO1xuICAgICAgICB0aGlzLmV4dGVybmFsSWZyYW1lLmRpc2FibGUoKTtcbiAgICAgICAgd2ViaXguZXh0ZW5kKHRoaXMuZXh0ZXJuYWxJZnJhbWUsIHdlYml4LlByb2dyZXNzQmFyKTtcblxuICAgICAgICB0aGlzLnBhY2thZ2VOYW1lcyA9IE9iamVjdC5rZXlzKHRoaXMucmVxdWlyZWRQYWNrYWdlcyk7IC8vIG9ubHkgbmFtZXNcblxuICAgICAgICBpZiAoIXRoaXMucGFja2FnZU5hbWVzLmxlbmd0aCkge1xuICAgICAgICAgICAgdGhpcy5zaG93SWZyYW1lKCk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnJlcXVpcmVkUGFja2FnZXNEaXYgPSB0aGlzLiQkKFwicmVxdWlyZWRfcGFja2FnZXNfZGl2XCIpO1xuICAgICAgICB0aGlzLmluc3RhbGxQYWNrYWdlQ29udGFpbmVyID0gdGhpcy4kJChcImluc3RhbGwtcGFja2FnZXNcIik7XG4gICAgICAgIHRoaXMuaW5zdGFsbEJ1dHRvbiA9IHRoaXMuJCQoXCJpbnN0YWxsX2J0blwiKTtcblxuICAgICAgICAvLyBjaGVjayB3aGljaCBwYWNrYWdlcyB0byBpbnN0YWxsXG4gICAgICAgIHRoaXMucGFja2FnZXNUb0luc3RhbGwgPSB7fTtcbiAgICAgICAgLy8gdHJ5IHRvIGdldCBpbmZvIGFib3V0IHJlcXVpcmVkIHBhY2thZ2VzXG4gICAgICAgIC8vIGlmIGFueSBpcyBhbHJlYWR5IHJlZ2lzdGVyZWQgYW5kIGluc3RhbGxlZCwgdGhlbiBqdXN0IGlnbm9yZSBpdFxuICAgICAgICBwYWNrYWdlcy5nZXRTdGF0dXModGhpcy5wYWNrYWdlTmFtZXMpLnRoZW4oZGF0YSA9PiB7XG4gICAgICAgICAgICBjb25zdCBwYWNrYWdlU3RhdGVzID0gZGF0YS5qc29uKCk7XG5cbiAgICAgICAgICAgIC8vIG5vdyBnbyBvdmVyIHJlcXVpcmVkIHBhY2thZ2VzXG4gICAgICAgICAgICBmb3IgKGxldCBuYW1lIG9mIHRoaXMucGFja2FnZU5hbWVzKSB7XG4gICAgICAgICAgICAgICAgLy8gY2hlY2sgaWYgYSByZXF1aXJlZCBwYWNrYWdlIGlzIHJlZ2lzdGVyZWQgYW5kIGluc3RhbGxlZFxuICAgICAgICAgICAgICAgIGlmIChwYWNrYWdlU3RhdGVzW25hbWVdID09IFNUQVRVU19JTlNUQUxMRUQpIHtcbiAgICAgICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgdGhpcy5wYWNrYWdlc1RvSW5zdGFsbFtuYW1lXSA9IHRoaXMucmVxdWlyZWRQYWNrYWdlc1tuYW1lXTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy8gY2hlY2sgcGFja2FnZXMgdG8gYmUgaW5zdGFsbGVkIGFnYWluIGlmIHN0aWxsIG5lZWQgdG8gaW5zdGFsbCBhbnkgb2YgdGhlbVxuICAgICAgICAgICAgY29uc3QgcGFja2FnZU5hbWVzVG9JbnN0YWxsID0gT2JqZWN0LmtleXModGhpcy5wYWNrYWdlc1RvSW5zdGFsbCk7XG4gICAgICAgICAgICBpZiAocGFja2FnZU5hbWVzVG9JbnN0YWxsLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgIHRoaXMuaW5zdGFsbFBhY2thZ2VDb250YWluZXIuc2hvdygpO1xuICAgICAgICAgICAgICAgIHRoaXMuZXh0ZXJuYWxJZnJhbWUuaGlkZSgpO1xuXG4gICAgICAgICAgICAgICAgY29uc3QgbmFtZXMgPSBwYWNrYWdlTmFtZXNUb0luc3RhbGwuam9pbihcIiwgXCIpO1xuICAgICAgICAgICAgICAgIHRoaXMucmVxdWlyZWRQYWNrYWdlc0Rpdi5zZXRIVE1MKFxuICAgICAgICAgICAgICAgICAgICBgPGRpdiBzdHlsZT0nd2lkdGg6YXV0bzt0ZXh0LWFsaWduOmNlbnRlcic+PGgzPllvdSBuZWVkIHRvIGluc3RhbGwgdGhlIGZvbGxvd2luZyByZXF1aXJlZCBwYWNrYWdlczogJHtuYW1lc308aDMvPjwvZGl2PmBcbiAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLmluc3RhbGxQYWNrYWdlQ29udGFpbmVyLmhpZGUoKTtcbiAgICAgICAgICAgICAgICB0aGlzLnNob3dJZnJhbWUoKVxuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG5cbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NvdXJjZXMvdmlld3MvZXh0ZXJuYWwvaW5kZXguanMiLCJjb25zdCBhamF4ID0gd2ViaXguYWpheCgpLmhlYWRlcnMoeyBcIkNvbnRlbnQtVHlwZVwiOiBcImFwcGxpY2F0aW9uL2pzb25cIiB9KTtcblxuZXhwb3J0IGNsYXNzIFNlcnZpY2Uge1xuICAgIGNvbnN0cnVjdG9yKGJhc2VVcmwpIHtcbiAgICAgICAgdGhpcy5iYXNlVXJsID0gYmFzZVVybDtcbiAgICB9XG5cbiAgICBqb2luVXJsKHVybCkge1xuICAgICAgICBpZiAodGhpcy5iYXNlVXJsKSB7XG4gICAgICAgICAgICByZXR1cm4gYCR7dGhpcy5iYXNlVXJsfS8ke3VybH1gO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB1cmw7XG4gICAgfVxuXG4gICAgY2FsbChtZXRob2QsIHVybCwgYXJncykge1xuICAgICAgICBtZXRob2QgPSBtZXRob2QudG9Mb3dlckNhc2UoKTtcbiAgICAgICAgdXJsID0gdGhpcy5qb2luVXJsKHVybCk7XG5cbiAgICAgICAgaWYgKGFyZ3MpIHtcbiAgICAgICAgICAgIGFyZ3MgPSB7IGFyZ3M6IGFyZ3MgfTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGFyZ3MgPSB7fTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChtZXRob2QgPT09IFwiZ2V0XCIpIHtcbiAgICAgICAgICAgIHJldHVybiBhamF4LmdldCh1cmwsIGFyZ3MpO1xuICAgICAgICB9IGVsc2UgaWYgKG1ldGhvZCA9PSBcInBvc3RcIikge1xuICAgICAgICAgICAgcmV0dXJuIGFqYXgucG9zdCh1cmwsIGFyZ3MpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhyb3cgVmFsdWVFcnJvcihgJHttZXRob2R9IGlzIG5vdCBzdXBwb3J0ZWRgKTtcbiAgICB9XG5cbiAgICBnZXRDYWxsKHVybCwgYXJncykge1xuICAgICAgICByZXR1cm4gdGhpcy5jYWxsKFwiZ2V0XCIsIHVybCwgYXJncyk7XG4gICAgfVxuXG4gICAgcG9zdENhbGwodXJsLCBhcmdzKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmNhbGwoXCJwb3N0XCIsIHVybCwgYXJncyk7XG4gICAgfVxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc291cmNlcy9jb21tb24vYXBpLmpzIiwiaW1wb3J0IHsgSmV0VmlldyB9IGZyb20gXCJ3ZWJpeC1qZXRcIjtcblxuaW1wb3J0IHsgYW5zaVVwIH0gZnJvbSBcIi4uLy4uL2NvbW1vbi9jb2xvcnNcIjtcblxuZXhwb3J0IGNsYXNzIEVycm9yVmlldyBleHRlbmRzIEpldFZpZXcge1xuICAgIGNvbmZpZygpIHtcbiAgICAgICAgY29uc3QgbWVzc2FnZSA9IHtcbiAgICAgICAgICAgIHZpZXc6IFwidGVtcGxhdGVcIixcbiAgICAgICAgICAgIGlkOiBcImVycm9yX3RlbXBsYXRlXCIsXG4gICAgICAgICAgICB0ZW1wbGF0ZTogXCJcIixcbiAgICAgICAgICAgIHNjcm9sbDogXCJ4eVwiXG4gICAgICAgIH07XG5cbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHZpZXc6IFwid2luZG93XCIsXG4gICAgICAgICAgICBoZWFkOiBcIkVycm9yXCIsXG4gICAgICAgICAgICBtb2RhbDogdHJ1ZSxcbiAgICAgICAgICAgIHdpZHRoOiAxMTAwLFxuICAgICAgICAgICAgaGVpZ2h0OiA3MDAsXG4gICAgICAgICAgICBwb3NpdGlvbjogXCJjZW50ZXJcIixcbiAgICAgICAgICAgIGJvZHk6IHtcbiAgICAgICAgICAgICAgICByb3dzOiBbXG4gICAgICAgICAgICAgICAgICAgIG1lc3NhZ2UsXG4gICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZpZXc6IFwiYnV0dG9uXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZTogXCJPS1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgY3NzOiBcIndlYml4X3ByaW1hcnlcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIGNsaWNrOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5nZXRUb3BQYXJlbnRWaWV3KCkuaGlkZSgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgaW5pdCgpIHtcbiAgICAgICAgdGhpcy5tZXNzYWdlID0gJCQoXCJlcnJvcl90ZW1wbGF0ZVwiKTtcbiAgICB9XG5cbiAgICBzaG93RXJyb3IobWVzc2FnZSwgaGVhZCkge1xuICAgICAgICB0aGlzLm1lc3NhZ2Uuc2V0SFRNTChgPHA+JHthbnNpVXAuYW5zaV90b19odG1sKG1lc3NhZ2UpfTwvcD5gKTtcbiAgICAgICAgaWYgKGhlYWQpIHtcbiAgICAgICAgICAgIHRoaXMubWVzc2FnZS5nZXRIZWFkKCkuc2V0SFRNTChoZWFkKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuZ2V0Um9vdCgpLnNob3coKTtcbiAgICB9XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zb3VyY2VzL3ZpZXdzL2Vycm9ycy9kaWFsb2cuanMiLCJcbmV4cG9ydCBjb25zdCBNQVhfTVNHX0xFTiA9IDEwMDtcbmV4cG9ydCBjb25zdCBMRVZFTFMgPSB7XG4gICAgNTA6IFwiQ1JJVElDQUxcIixcbiAgICA0MDogXCJFUlJPUlwiLFxuICAgIDMwOiBcIldBUk5JTkdcIixcbiAgICAyMDogXCJJTkZPXCIsXG4gICAgMTU6IFwiU1RET1VUXCIsXG4gICAgMTA6IFwiREVCVUdcIlxufTtcblxuZXhwb3J0IGNvbnN0IFNUQVRFUyA9IFtcbiAgICAnQ0xPU0VEJyxcbiAgICAnTkVXJyxcbiAgICAnT1BFTicsXG4gICAgJ1JFT1BFTidcbl1cblxuZXhwb3J0IGNvbnN0IFRZUEVTID0gW1xuICAgICdCVUcnLFxuICAgICdRVUVTVElPTicsXG4gICAgJ0VWRU5UX1NZU1RFTScsXG4gICAgJ0VWRU5UX01PTklUT1InLFxuICAgICdFVkVOVF9PUEVSQVRPUicsXG5dXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zb3VyY2VzL3ZpZXdzL2FsZXJ0cy9kYXRhLmpzIiwiZXhwb3J0IGNvbnN0IGRhdGVGb3JtYXQgPSBcIiVZLSVtLSVkICVHOiVpOiVzXCI7XG5cbmV4cG9ydCBjb25zdCB3ZWJpeERhdGVGb3JtYXR0ZXIgPSB3ZWJpeC5EYXRlLmRhdGVUb1N0cihkYXRlRm9ybWF0KTtcblxuZXhwb3J0IGNvbnN0IGRhdGVGb3JtYXR0ZXIgPSBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAvLyBmb3JtYXQgZXBvY2ggdGltZXN0YW1wc1xuICAgIGlmICh2YWx1ZSBpbnN0YW5jZW9mIFN0cmluZykge1xuICAgICAgICB2YWx1ZSA9IHBhcnNlSW50KHZhbHVlKTtcbiAgICB9XG5cbiAgICByZXR1cm4gd2ViaXhEYXRlRm9ybWF0dGVyKG5ldyBEYXRlKHZhbHVlICogMTAwMCkpO1xufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc291cmNlcy9jb21tb24vZm9ybWF0dGVycy5qcyIsImltcG9ydCB7IFNlcnZpY2UgfSBmcm9tIFwiLi4vY29tbW9uL2FwaVwiO1xuXG5jb25zdCBCQVNFX1VSTCA9IFwiL3plcm9ib3QvYWRtaW4vYWN0b3JzL2hlYWx0aFwiO1xuXG5jbGFzcyBIZWFsdGhTZXJ2aWNlIGV4dGVuZHMgU2VydmljZSB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHN1cGVyKEJBU0VfVVJMKTtcbiAgICB9XG5cbiAgICBnZXREaXNrU3BhY2UoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmdldENhbGwoXCJnZXRfZGlza19zcGFjZVwiKTtcbiAgICB9XG5cbiAgICBnZXRIZWFsdGgoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmdldENhbGwoXCJoZWFsdGhcIik7XG4gICAgfVxuXG4gICAgZ2V0SWRlbnRpdHkoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmdldENhbGwoXCJnZXRfaWRlbnRpdHlcIik7XG4gICAgfVxuXG4gICAgZ2V0TmV0d29ya0luZm8oKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmdldENhbGwoXCJuZXR3b3JrX2luZm9cIik7XG4gICAgfVxuXG4gICAgZ2V0SnN4VmVyc2lvbigpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0Q2FsbChcImpzeF92ZXJzaW9uXCIpO1xuICAgIH1cblxuICAgIGdldFJ1bm5pbmdQcm9jZXNzZXMoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmdldENhbGwoXCJnZXRfcnVubmluZ19wcm9jZXNzZXNcIik7XG4gICAgfVxuXG4gICAgZ2V0UnVubmluZ1BvcnRzKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5nZXRDYWxsKFwiZ2V0X3J1bm5pbmdfcG9ydHNcIik7XG4gICAgfVxufVxuXG5leHBvcnQgY29uc3QgaGVhbHRoID0gbmV3IEhlYWx0aFNlcnZpY2UoKTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NvdXJjZXMvc2VydmljZXMvaGVhbHRoLmpzIiwiaW1wb3J0IHsgSmV0VmlldyB9IGZyb20gXCJ3ZWJpeC1qZXRcIjtcblxuaW1wb3J0IHsgYW5zaVVwIH0gZnJvbSBcIi4uLy4uL2NvbW1vbi9jb2xvcnNcIjtcbmltcG9ydCB7IExFVkVMUywgTUFYX01TR19MRU4sIFNUQVRFUywgVFlQRVMgfSBmcm9tIFwiLi9kYXRhXCI7XG5pbXBvcnQgeyBkYXRlRm9ybWF0dGVyIH0gZnJvbSBcIi4uLy4uL2NvbW1vbi9mb3JtYXR0ZXJzXCI7XG5pbXBvcnQgeyBhbGVydHMgfSBmcm9tIFwiLi4vLi4vc2VydmljZXMvYWxlcnRzXCI7XG5cbmltcG9ydCBBbGVydFZpZXcgZnJvbSBcIi4vYWxlcnRcIjtcbmltcG9ydCB7IGNyZWF0ZUZpbHRlck9wdGlvbnMgfSBmcm9tIFwiLi4vLi4vY29tbW9uL2ZpbHRlcnNcIjtcblxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBBbGVydHNWaWV3IGV4dGVuZHMgSmV0VmlldyB7XG4gICAgY29uZmlnKCkge1xuICAgICAgICBjb25zdCB2aWV3ID0ge1xuICAgICAgICAgICAgcm93czogW1xuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgdmlldzogXCJkYXRhdGFibGVcIixcbiAgICAgICAgICAgICAgICAgICAgaWQ6IFwiYWxlcnRzX3RhYmxlXCIsXG4gICAgICAgICAgICAgICAgICAgIHJlc2l6ZUNvbHVtbjogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgc2VsZWN0OiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICBtdWx0aXNlbGVjdDogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgc2Nyb2xsOiBcInh5XCIsXG4gICAgICAgICAgICAgICAgICAgIGNzczogXCJ3ZWJpeF9oZWFkZXJfYm9yZGVyIHdlYml4X2RhdGFfYm9yZGVyXCIsXG4gICAgICAgICAgICAgICAgICAgIGNvbHVtbnM6IFt7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZDogXCJpbmRleFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgaGVhZGVyOiBcIiNcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIHNvcnQ6IFwiaW50XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBhdXRvd2lkdGg6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlkOiBcImFsZXJ0X3R5cGVcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIHNvcnQ6IFwiaW50XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBmb3JtYXQ6ICh2YWx1ZSkgPT4gVFlQRVNbdmFsdWVdLFxuICAgICAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDE1MCxcbiAgICAgICAgICAgICAgICAgICAgICAgIGhlYWRlcjogW1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiVHlwZVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29udGVudDogXCJzZWxlY3RGaWx0ZXJcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb3B0aW9uczogY3JlYXRlRmlsdGVyT3B0aW9ucyhUWVBFUylcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZDogXCJjb3VudFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgaGVhZGVyOiBcIkNvdW50XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBzb3J0OiBcImludFwiXG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlkOiBcInN0YXR1c1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgc29ydDogXCJpbnRcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvcm1hdDogKHZhbHVlKSA9PiBTVEFURVNbdmFsdWVdLFxuICAgICAgICAgICAgICAgICAgICAgICAgaGVhZGVyOiBbXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJTdGF0dXNcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRlbnQ6IFwic2VsZWN0RmlsdGVyXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9wdGlvbnM6IGNyZWF0ZUZpbHRlck9wdGlvbnMoU1RBVEVTKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlkOiBcImxldmVsXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBzb3J0OiBcImludFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgZm9ybWF0OiAodmFsdWUpID0+IExFVkVMU1t2YWx1ZV0sXG4gICAgICAgICAgICAgICAgICAgICAgICBoZWFkZXI6IFtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIkxldmVsXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb250ZW50OiBcInNlbGVjdEZpbHRlclwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvcHRpb25zOiBjcmVhdGVGaWx0ZXJPcHRpb25zKExFVkVMUylcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZDogXCJjYXRcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIGhlYWRlcjogW1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiQ2F0ZWdvcnlcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRlbnQ6IFwidGV4dEZpbHRlclwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHNvcnQ6IFwic3RyaW5nXCJcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWQ6IFwidGltZV9maXJzdFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgaGVhZGVyOiBcIkZpcnN0IHRpbWVcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIHNvcnQ6IFwiZGF0ZVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgZm9ybWF0OiBkYXRlRm9ybWF0dGVyLFxuICAgICAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDIwMFxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZDogXCJ0aW1lX2xhc3RcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIGhlYWRlcjogXCJMYXN0IHRpbWVcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIHNvcnQ6IFwiZGF0ZVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgZm9ybWF0OiBkYXRlRm9ybWF0dGVyLFxuICAgICAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDIwMFxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZDogXCJtZXNzYWdlXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBoZWFkZXI6IFtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIk1lc3NhZ2VcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRlbnQ6IFwidGV4dEZpbHRlclwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgICAgICAgICBzb3J0OiBcInN0clwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgZmlsbHNwYWNlOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgZm9ybWF0OiBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodmFsdWUubGVuZ3RoID4gTUFYX01TR19MRU4pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWUgPSB2YWx1ZS5zdWJzdHIoMCwgTUFYX01TR19MRU4pICsgJy4uLic7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBhbnNpVXAuYW5zaV90b19odG1sKHZhbHVlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICAgICAgYXV0b0NvbmZpZzogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgLy8gdXJsOntcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgICRwcm94eTp0cnVlLFxuICAgICAgICAgICAgICAgICAgICAvLyAgICAgbG9hZDogZnVuY3Rpb24odmlldywgcGFyYW1zKXtcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgICBsZXQgZGF0YSA9IHdlYml4LmFqYXgoXCIvemVyb2JvdC9hbGVydGEvYWN0b3JzL2FsZXJ0YS9saXN0X2FsZXJ0c1wiKTtcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgICByZXR1cm4gZGF0YTtcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIC8vIH1cbiAgICAgICAgICAgICAgICAgICAgc2NoZW1lOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAkaW5pdDogZnVuY3Rpb24gKG9iaikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9iai5pbmRleCA9IHRoaXMuY291bnQoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgJHN1YnZpZXc6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgIHBvcHVwOiB0cnVlXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgXVxuICAgICAgICB9O1xuXG4gICAgICAgIHJldHVybiB2aWV3O1xuICAgIH1cblxuICAgIGRlbGV0ZUl0ZW0ob2JqZWN0cykge1xuICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XG5cbiAgICAgICAgbGV0IGl0ZW1zID0gW10sXG4gICAgICAgICAgICBpZHMgPSBbXSxcbiAgICAgICAgICAgIGluZGV4ZXMgPSBbXTtcblxuICAgICAgICBmb3IgKGxldCBvYmogb2Ygb2JqZWN0cykge1xuICAgICAgICAgICAgaWRzLnB1c2gob2JqLmlkKTtcbiAgICAgICAgICAgIGxldCBpdGVtID0gc2VsZi50YWJsZS5nZXRJdGVtKG9iai5pZCk7XG4gICAgICAgICAgICBpdGVtcy5wdXNoKGl0ZW0pXG4gICAgICAgICAgICBpbmRleGVzLnB1c2goaXRlbS5pbmRleCk7XG4gICAgICAgIH1cblxuICAgICAgICB3ZWJpeC5jb25maXJtKHtcbiAgICAgICAgICAgIHRpdGxlOiBcIkRlbGV0ZSBhbGVydHNcIixcbiAgICAgICAgICAgIG9rOiBcIlllc1wiLFxuICAgICAgICAgICAgY2FuY2VsOiBcIk5vXCIsXG4gICAgICAgICAgICB0ZXh0OiBgRGVsZXRlIGFsZXJ0IGl0ZW0ocykgb2YgJHtpbmRleGVzLmpvaW4oXCIsIFwiKX1gXG4gICAgICAgIH0pLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgaWRlbnRpZmllcnMgPSBpdGVtcy5tYXAoKGl0ZW0pID0+IGl0ZW0uaWRlbnRpZmllcik7XG4gICAgICAgICAgICBzZWxmLnRhYmxlLnNob3dQcm9ncmVzcyh7XG4gICAgICAgICAgICAgICAgaGlkZTogZmFsc2VcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICBhbGVydHMuZGVsZXRlKGlkZW50aWZpZXJzKS50aGVuKCgpID0+IHtcbiAgICAgICAgICAgICAgICBzZWxmLnRhYmxlLnJlbW92ZShpZHMpXG4gICAgICAgICAgICAgICAgc2VsZi50YWJsZS5zaG93UHJvZ3Jlc3Moe1xuICAgICAgICAgICAgICAgICAgICBoaWRlOiB0cnVlXG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICB2aWV3SXRlbShpZCkge1xuICAgICAgICB0aGlzLmFsZXJ0Vmlldy5zaG93Rm9yKHRoaXMudGFibGUuZ2V0SXRlbShpZCkpO1xuICAgIH1cblxuICAgIGluaXQoKSB7XG4gICAgICAgIC8vIHRoaXMudXNlKHBsdWdpbnMuUHJvZ3Jlc3NCYXIsIFwicHJvZ3Jlc3NcIik7XG4gICAgICAgIHZhciBzZWxmID0gdGhpcztcbiAgICAgICAgc2VsZi50YWJsZSA9ICQkKFwiYWxlcnRzX3RhYmxlXCIpO1xuICAgICAgICBzZWxmLmFsZXJ0VmlldyA9IHNlbGYudWkoQWxlcnRWaWV3KTtcblxuICAgICAgICB3ZWJpeC5leHRlbmQoc2VsZi50YWJsZSwgd2ViaXguUHJvZ3Jlc3NCYXIpO1xuICAgICAgICB3ZWJpeC5yZWFkeShmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBzZWxmLnRhYmxlLmNsZWFyQWxsKCk7XG4gICAgICAgICAgICBzZWxmLnRhYmxlLnNob3dQcm9ncmVzcyh7XG4gICAgICAgICAgICAgICAgaGlkZTogZmFsc2VcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgYWxlcnRzLmxpc3QoKS50aGVuKGRhdGEgPT4ge1xuICAgICAgICAgICAgICAgIGxldCBhbGVydHMgPSBkYXRhLmpzb24oKS5hbGVydHM7XG4gICAgICAgICAgICAgICAgc2VsZi50YWJsZS5wYXJzZShhbGVydHMpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHdlYml4LnVpKHtcbiAgICAgICAgICAgIHZpZXc6IFwiY29udGV4dG1lbnVcIixcbiAgICAgICAgICAgIGlkOiBcImFsZXJ0c19jbVwiLFxuICAgICAgICAgICAgZGF0YTogW1wiVmlld1wiLCBcIkRlbGV0ZVwiXVxuICAgICAgICB9KS5hdHRhY2hUbyhzZWxmLnRhYmxlKTtcblxuXG4gICAgICAgIHNlbGYudGFibGUuYXR0YWNoRXZlbnQoXCJvbkl0ZW1EYmxDbGlja1wiLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBzZWxmLnZpZXdJdGVtKHNlbGYudGFibGUuZ2V0U2VsZWN0ZWRJZCgpKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgJCQoXCJhbGVydHNfY21cIikuYXR0YWNoRXZlbnQoXCJvbk1lbnVJdGVtQ2xpY2tcIiwgZnVuY3Rpb24gKGlkKSB7XG4gICAgICAgICAgICBpZiAoaWQgPT0gXCJEZWxldGVcIikge1xuICAgICAgICAgICAgICAgIHNlbGYuZGVsZXRlSXRlbShzZWxmLnRhYmxlLmdldFNlbGVjdGVkSWQodHJ1ZSkpO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChpZCA9PSBcIlZpZXdcIikge1xuICAgICAgICAgICAgICAgIHNlbGYudmlld0l0ZW0oc2VsZi50YWJsZS5nZXRTZWxlY3RlZElkKCkpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zb3VyY2VzL3ZpZXdzL2FsZXJ0cy9pbmRleC5qcyIsImltcG9ydCBBbnNpVXAgZnJvbSBcImFuc2lfdXBcIjtcblxuZXhwb3J0IGNvbnN0IGFuc2lVcCA9IG5ldyBBbnNpVXAoKTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NvdXJjZXMvY29tbW9uL2NvbG9ycy5qcyIsImltcG9ydCB7IEV4dGVybmFsVmlldyB9IGZyb20gXCIuLi9leHRlcm5hbFwiO1xuaW1wb3J0IHsgYWRtaW4gfSBmcm9tIFwiLi4vLi4vc2VydmljZXMvYWRtaW5cIjtcblxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDYXBhY2l0eVZpZXcgZXh0ZW5kcyBFeHRlcm5hbFZpZXcge1xuICAgIGNvbnN0cnVjdG9yKGFwcCwgbmFtZSkge1xuICAgICAgICBzdXBlcihhcHAsIG5hbWUpO1xuICAgIH1cblxuICAgIHNob3dJZnJhbWUoKSB7XG4gICAgICAgIGFkbWluLmdldF9leHBsb3JlcigpLnRoZW4oKGRhdGEpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGV4cGxvcmVyID0gZGF0YS5qc29uKCk7XG4gICAgICAgICAgICBsZXQgdXJsID0gZXhwbG9yZXIudXJsO1xuXG4gICAgICAgICAgICBpZiAoIXVybC5zdGFydHNXaXRoKCdodHRwJykpIHtcbiAgICAgICAgICAgICAgICB1cmwgPSBgaHR0cHM6Ly8ke3VybH1gO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB0aGlzLmV4dGVybmFsSWZyYW1lLnNob3coKTtcbiAgICAgICAgICAgIHRoaXMuZXh0ZXJuYWxJZnJhbWUuc2hvd1Byb2dyZXNzKHsgdHlwZTogXCJpY29uXCIgfSk7XG4gICAgICAgICAgICB0aGlzLmV4dGVybmFsSWZyYW1lLmxvYWQodXJsKTtcbiAgICAgICAgfSlcbiAgICB9XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zb3VyY2VzL3ZpZXdzL2NhcGFjaXR5L2luZGV4LmpzIiwiaW1wb3J0IHsgSmV0VmlldyB9IGZyb20gXCJ3ZWJpeC1qZXRcIjtcblxuaW1wb3J0IHsgRXJyb3JWaWV3IH0gZnJvbSBcIi4uL2Vycm9ycy9kaWFsb2dcIjtcbmltcG9ydCB7IHRhaWdhIH0gZnJvbSBcIi4uLy4uL3NlcnZpY2VzL3RhaWdhXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIENpcmNsZXNWaWV3IGV4dGVuZHMgSmV0VmlldyB7XG4gICAgY29uZmlnKCkge1xuICAgICAgICBjb25zdCBncmlkID0ge1xuICAgICAgICAgICAgcm93czogW3tcbiAgICAgICAgICAgICAgICAvL0hlYWRlclxuICAgICAgICAgICAgICAgIHZpZXc6IFwidGVtcGxhdGVcIixcbiAgICAgICAgICAgICAgICB0eXBlOiBcImhlYWRlclwiLFxuICAgICAgICAgICAgICAgIHRlbXBsYXRlOiBcIkNpcmNsZXNcIixcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7IC8vRGF0YVRhYmxlXG4gICAgICAgICAgICAgICAgdmlldzogXCJkYXRhdGFibGVcIixcbiAgICAgICAgICAgICAgICBpZDogXCJjaXJjbGVzX3RhYmxlXCIsXG4gICAgICAgICAgICAgICAgcmVzaXplQ29sdW1uOiB0cnVlLFxuICAgICAgICAgICAgICAgIHR5cGU6IHtcbiAgICAgICAgICAgICAgICAgICAgaGVpZ2h0OiAyMDAsXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBzY3JvbGw6IFwieHlcIixcbiAgICAgICAgICAgICAgICBhdXRvQ29uZmlnOiB0cnVlLFxuICAgICAgICAgICAgICAgIHZpZXc6IFwiZGF0YXRhYmxlXCIsXG4gICAgICAgICAgICAgICAgc2VsZWN0OiB0cnVlLFxuICAgICAgICAgICAgICAgIGNzczogXCJ3ZWJpeF9oZWFkZXJfYm9yZGVyIHdlYml4X2RhdGFfYm9yZGVyXCIsXG4gICAgICAgICAgICAgICAgb25Db250ZXh0OiB7fSxcbiAgICAgICAgICAgICAgICBjb2x1bW5zOiBbe1xuICAgICAgICAgICAgICAgICAgICBpZDogXCJJRFwiLFxuICAgICAgICAgICAgICAgICAgICBoZWFkZXI6IFwiSURcIixcbiAgICAgICAgICAgICAgICAgICAgc29ydDogXCJpbnRcIixcbiAgICAgICAgICAgICAgICAgICAgYXV0b3dpZHRoOiB0cnVlLFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBpZDogXCJOYW1lXCIsXG4gICAgICAgICAgICAgICAgICAgIGhlYWRlcjogXCJOYW1lXCIsXG4gICAgICAgICAgICAgICAgICAgIHNvcnQ6IFwic3RyaW5nXCIsXG4gICAgICAgICAgICAgICAgICAgIHdpZHRoOiAyMDBcbiAgICAgICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgICAgIGlkOiBcIk93bmVyXCIsXG4gICAgICAgICAgICAgICAgICAgIGhlYWRlcjogW1wiT3duZXJcIiwge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29udGVudDogXCJ0ZXh0RmlsdGVyXCJcbiAgICAgICAgICAgICAgICAgICAgfV0sXG4gICAgICAgICAgICAgICAgICAgIHNvcnQ6IFwic3RyaW5nXCIsXG4gICAgICAgICAgICAgICAgICAgIHdpZHRoOiAyMDBcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgaWQ6IFwiRGVzY3JpcHRpb25cIixcbiAgICAgICAgICAgICAgICAgICAgaGVhZGVyOiBcIkRlc2NyaXB0aW9uXCIsXG4gICAgICAgICAgICAgICAgICAgIHNvcnQ6IFwic3RyaW5nXCIsXG4gICAgICAgICAgICAgICAgICAgIHdpZHRoOiAxMzAwLFxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgIHNjaGVtZToge1xuICAgICAgICAgICAgICAgICAgICAkaW5pdDogZnVuY3Rpb24gKG9iaikge1xuICAgICAgICAgICAgICAgICAgICAgICAgb2JqLmluZGV4ID0gdGhpcy5jb3VudCgpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgXVxuICAgICAgICB9O1xuICAgICAgICByZXR1cm4gZ3JpZDtcbiAgICB9XG5cbiAgICBzaG93RXJyb3IobWVzc2FnZSkge1xuICAgICAgICB0aGlzLmVycm9yVmlldy5zaG93RXJyb3IobWVzc2FnZSk7XG4gICAgfVxuXG4gICAgaW5pdCh2aWV3KSB7XG4gICAgICAgIGNvbnN0IHNlbGYgPSB0aGlzO1xuXG4gICAgICAgIHNlbGYuZXJyb3JWaWV3ID0gdGhpcy51aShFcnJvclZpZXcpO1xuXG4gICAgICAgIGNvbnN0IG1lbnUgPSB3ZWJpeC51aSh7XG4gICAgICAgICAgICB2aWV3OiBcImNvbnRleHRtZW51XCIsXG4gICAgICAgICAgICBpZDogXCJjaXJjbGVzX2NtXCJcbiAgICAgICAgfSk7XG5cbiAgICAgICAgdGhpcy5jaXJjbGVUYWJsZSA9IHRoaXMuJCQoXCJjaXJjbGVzX3RhYmxlXCIpO1xuICAgICAgICB3ZWJpeC5leHRlbmQodGhpcy5jaXJjbGVUYWJsZSwgd2ViaXguUHJvZ3Jlc3NCYXIpO1xuXG5cbiAgICAgICAgd2ViaXguYWpheCgpLmdldChcIi9hdXRoL2F1dGhlbnRpY2F0ZWRcIiwgZnVuY3Rpb24gKGRhdGEpIHtcbiAgICAgICAgICAgIGNvbnN0IGluZm8gPSBKU09OLnBhcnNlKGRhdGEpO1xuICAgICAgICAgICAgY29uc3QgdXNlcm5hbWUgPSBpbmZvLnVzZXJuYW1lLnJlcGxhY2UoXCIuM2JvdFwiLCBcIlwiKVxuICAgICAgICAgICAgdGFpZ2EudXNlckNpcmNsZXModXNlcm5hbWUpLnRoZW4oZGF0YSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3QgY2lyY2xlcyA9IGRhdGEuanNvbigpO1xuICAgICAgICAgICAgICAgIHNlbGYuY2lyY2xlVGFibGUucGFyc2UoY2lyY2xlcyk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG5cblxuICAgIH1cbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NvdXJjZXMvdmlld3MvY2lyY2xlcy9pbmRleC5qcyIsImltcG9ydCB7IEpldFZpZXcgfSBmcm9tIFwid2ViaXgtamV0XCI7XG5cbmltcG9ydCB7IEVycm9yVmlldyB9IGZyb20gXCIuLi9lcnJvcnMvZGlhbG9nXCI7XG5pbXBvcnQgeyB0YWlnYSB9IGZyb20gXCIuLi8uLi9zZXJ2aWNlcy90YWlnYVwiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDaXJjbGVzdG9yaWVzVmlldyBleHRlbmRzIEpldFZpZXcge1xuICAgIGNvbmZpZygpIHtcbiAgICAgICAgY29uc3QgZ3JpZCA9IHtcbiAgICAgICAgICAgIHJvd3M6IFt7XG4gICAgICAgICAgICAgICAgLy9IZWFkZXJcbiAgICAgICAgICAgICAgICB2aWV3OiBcInRlbXBsYXRlXCIsXG4gICAgICAgICAgICAgICAgdHlwZTogXCJoZWFkZXJcIixcbiAgICAgICAgICAgICAgICB0ZW1wbGF0ZTogXCJDaXJjbGVzU3Rvcmllc1wiLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHsgLy9EYXRhVGFibGVcbiAgICAgICAgICAgICAgICB2aWV3OiBcImRhdGF0YWJsZVwiLFxuICAgICAgICAgICAgICAgIGlkOiBcImNpcmNsZXN0b3JpZXNfdGFibGVcIixcbiAgICAgICAgICAgICAgICByZXNpemVDb2x1bW46IHRydWUsXG4gICAgICAgICAgICAgICAgdHlwZToge1xuICAgICAgICAgICAgICAgICAgICBoZWlnaHQ6IDIwMCxcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHNjcm9sbDogXCJ4eVwiLFxuICAgICAgICAgICAgICAgIGF1dG9Db25maWc6IHRydWUsXG4gICAgICAgICAgICAgICAgdmlldzogXCJkYXRhdGFibGVcIixcbiAgICAgICAgICAgICAgICBzZWxlY3Q6IHRydWUsXG4gICAgICAgICAgICAgICAgY3NzOiBcIndlYml4X2hlYWRlcl9ib3JkZXIgd2ViaXhfZGF0YV9ib3JkZXJcIixcbiAgICAgICAgICAgICAgICBvbkNvbnRleHQ6IHt9LFxuICAgICAgICAgICAgICAgIGNvbHVtbnM6IFt7XG4gICAgICAgICAgICAgICAgICAgIGlkOiBcIklEXCIsXG4gICAgICAgICAgICAgICAgICAgIGhlYWRlcjogXCJJRFwiLFxuICAgICAgICAgICAgICAgICAgICBzb3J0OiBcImludFwiLFxuICAgICAgICAgICAgICAgICAgICBhdXRvd2lkdGg6IHRydWUsXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIGlkOiBcIlByb2plY3RcIixcbiAgICAgICAgICAgICAgICAgICAgaGVhZGVyOiBbXCJQcm9qZWN0XCIsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRlbnQ6IFwidGV4dEZpbHRlclwiXG4gICAgICAgICAgICAgICAgICAgIH1dLFxuICAgICAgICAgICAgICAgICAgICBzb3J0OiBcInN0cmluZ1wiLFxuICAgICAgICAgICAgICAgICAgICB3aWR0aDogMzAwXG4gICAgICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgICAgICBpZDogXCJTdWJqZWN0XCIsXG4gICAgICAgICAgICAgICAgICAgIGhlYWRlcjogXCJTdWJqZWN0XCIsXG4gICAgICAgICAgICAgICAgICAgIHNvcnQ6IFwic3RyaW5nXCIsXG4gICAgICAgICAgICAgICAgICAgIHdpZHRoOiA3MDBcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgaWQ6IFwiTWlsZXN0b25lXCIsXG4gICAgICAgICAgICAgICAgICAgIGhlYWRlcjogXCJNaWxlc3RvbmVcIixcbiAgICAgICAgICAgICAgICAgICAgc29ydDogXCJzdHJpbmdcIixcbiAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDIwMCxcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgaWQ6IFwiU3RhdHVzXCIsXG4gICAgICAgICAgICAgICAgICAgIGhlYWRlcjogXCJTdGF0dXNcIixcbiAgICAgICAgICAgICAgICAgICAgc29ydDogXCJzdHJpbmdcIixcbiAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDIwMCxcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgaWQ6IFwiRHVlIGRhdGVcIixcbiAgICAgICAgICAgICAgICAgICAgaGVhZGVyOiBcIkR1ZSBkYXRlXCIsXG4gICAgICAgICAgICAgICAgICAgIHNvcnQ6IFwic3RyaW5nXCIsXG4gICAgICAgICAgICAgICAgICAgIHdpZHRoOiAyMDAsXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgc2NoZW1lOiB7XG4gICAgICAgICAgICAgICAgICAgICRpbml0OiBmdW5jdGlvbiAob2JqKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBvYmouaW5kZXggPSB0aGlzLmNvdW50KCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBdXG4gICAgICAgIH07XG4gICAgICAgIHJldHVybiBncmlkO1xuICAgIH1cblxuICAgIHNob3dFcnJvcihtZXNzYWdlKSB7XG4gICAgICAgIHRoaXMuZXJyb3JWaWV3LnNob3dFcnJvcihtZXNzYWdlKTtcbiAgICB9XG5cbiAgICBpbml0KHZpZXcpIHtcbiAgICAgICAgY29uc3Qgc2VsZiA9IHRoaXM7XG5cbiAgICAgICAgc2VsZi5lcnJvclZpZXcgPSB0aGlzLnVpKEVycm9yVmlldyk7XG5cbiAgICAgICAgY29uc3QgbWVudSA9IHdlYml4LnVpKHtcbiAgICAgICAgICAgIHZpZXc6IFwiY29udGV4dG1lbnVcIixcbiAgICAgICAgICAgIGlkOiBcImNpcmNsZXN0b3JpZXNfY21cIlxuICAgICAgICB9KTtcblxuICAgICAgICB0aGlzLnN0b3JpZXNUYWJsZSA9IHRoaXMuJCQoXCJjaXJjbGVzdG9yaWVzX3RhYmxlXCIpO1xuICAgICAgICB3ZWJpeC5leHRlbmQodGhpcy5zdG9yaWVzVGFibGUsIHdlYml4LlByb2dyZXNzQmFyKTtcblxuICAgICAgICB3ZWJpeC5hamF4KCkuZ2V0KFwiL2F1dGgvYXV0aGVudGljYXRlZFwiLCBmdW5jdGlvbiAoZGF0YSkge1xuICAgICAgICAgICAgY29uc3QgaW5mbyA9IEpTT04ucGFyc2UoZGF0YSk7XG4gICAgICAgICAgICBjb25zdCB1c2VybmFtZSA9IGluZm8udXNlcm5hbWUucmVwbGFjZShcIi4zYm90XCIsIFwiXCIpXG4gICAgICAgICAgICB0YWlnYS51c2VyU3Rvcmllcyh1c2VybmFtZSkudGhlbihkYXRhID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCBzdG9yaWVzID0gZGF0YS5qc29uKCk7XG4gICAgICAgICAgICAgICAgc2VsZi5zdG9yaWVzVGFibGUucGFyc2Uoc3Rvcmllcyk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG5cblxuICAgIH1cbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NvdXJjZXMvdmlld3MvY2lyY2xlc3Rvcmllcy9pbmRleC5qcyIsImltcG9ydCB7IEpldFZpZXcgfSBmcm9tIFwid2ViaXgtamV0XCI7XG5cbmltcG9ydCB7IEVycm9yVmlldyB9IGZyb20gXCIuLi9lcnJvcnMvZGlhbG9nXCI7XG5pbXBvcnQgeyB0YWlnYSB9IGZyb20gXCIuLi8uLi9zZXJ2aWNlcy90YWlnYVwiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDaXJjbGVzVGFza3NWaWV3IGV4dGVuZHMgSmV0VmlldyB7XG4gICAgY29uZmlnKCkge1xuICAgICAgICBjb25zdCBncmlkID0ge1xuICAgICAgICAgICAgcm93czogW3tcbiAgICAgICAgICAgICAgICAvL0hlYWRlclxuICAgICAgICAgICAgICAgIHZpZXc6IFwidGVtcGxhdGVcIixcbiAgICAgICAgICAgICAgICB0eXBlOiBcImhlYWRlclwiLFxuICAgICAgICAgICAgICAgIHRlbXBsYXRlOiBcIkNpcmNsZXNUYXNrc1wiLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHsgLy9EYXRhVGFibGVcbiAgICAgICAgICAgICAgICB2aWV3OiBcImRhdGF0YWJsZVwiLFxuICAgICAgICAgICAgICAgIGlkOiBcImNpcmNsZXN0YXNrc190YWJsZVwiLFxuICAgICAgICAgICAgICAgIHJlc2l6ZUNvbHVtbjogdHJ1ZSxcbiAgICAgICAgICAgICAgICB0eXBlOiB7XG4gICAgICAgICAgICAgICAgICAgIGhlaWdodDogMjAwLFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgc2Nyb2xsOiBcInh5XCIsXG4gICAgICAgICAgICAgICAgYXV0b0NvbmZpZzogdHJ1ZSxcbiAgICAgICAgICAgICAgICB2aWV3OiBcImRhdGF0YWJsZVwiLFxuICAgICAgICAgICAgICAgIHNlbGVjdDogdHJ1ZSxcbiAgICAgICAgICAgICAgICBjc3M6IFwid2ViaXhfaGVhZGVyX2JvcmRlciB3ZWJpeF9kYXRhX2JvcmRlclwiLFxuICAgICAgICAgICAgICAgIG9uQ29udGV4dDoge30sXG4gICAgICAgICAgICAgICAgY29sdW1uczogW3tcbiAgICAgICAgICAgICAgICAgICAgaWQ6IFwiSURcIixcbiAgICAgICAgICAgICAgICAgICAgaGVhZGVyOiBcIklEXCIsXG4gICAgICAgICAgICAgICAgICAgIHNvcnQ6IFwiaW50XCIsXG4gICAgICAgICAgICAgICAgICAgIGF1dG93aWR0aDogdHJ1ZSxcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgaWQ6IFwiUHJvamVjdFwiLFxuICAgICAgICAgICAgICAgICAgICBoZWFkZXI6IFtcIlByb2plY3RcIiwge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29udGVudDogXCJ0ZXh0RmlsdGVyXCJcbiAgICAgICAgICAgICAgICAgICAgfV0sXG4gICAgICAgICAgICAgICAgICAgIHNvcnQ6IFwic3RyaW5nXCIsXG4gICAgICAgICAgICAgICAgICAgIHdpZHRoOiAzMDBcbiAgICAgICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgICAgIGlkOiBcIlN1YmplY3RcIixcbiAgICAgICAgICAgICAgICAgICAgaGVhZGVyOiBcIlN1YmplY3RcIixcbiAgICAgICAgICAgICAgICAgICAgc29ydDogXCJzdHJpbmdcIixcbiAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDgwMFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBpZDogXCJNaWxlc3RvbmVcIixcbiAgICAgICAgICAgICAgICAgICAgaGVhZGVyOiBcIk1pbGVzdG9uZVwiLFxuICAgICAgICAgICAgICAgICAgICBzb3J0OiBcInN0cmluZ1wiLFxuICAgICAgICAgICAgICAgICAgICB3aWR0aDogMjAwLFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBpZDogXCJTdGF0dXNcIixcbiAgICAgICAgICAgICAgICAgICAgaGVhZGVyOiBcIlN0YXR1c1wiLFxuICAgICAgICAgICAgICAgICAgICBzb3J0OiBcInN0cmluZ1wiLFxuICAgICAgICAgICAgICAgICAgICB3aWR0aDogMzAwLFxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgIHNjaGVtZToge1xuICAgICAgICAgICAgICAgICAgICAkaW5pdDogZnVuY3Rpb24gKG9iaikge1xuICAgICAgICAgICAgICAgICAgICAgICAgb2JqLmluZGV4ID0gdGhpcy5jb3VudCgpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgXVxuICAgICAgICB9O1xuICAgICAgICByZXR1cm4gZ3JpZDtcbiAgICB9XG5cbiAgICBzaG93RXJyb3IobWVzc2FnZSkge1xuICAgICAgICB0aGlzLmVycm9yVmlldy5zaG93RXJyb3IobWVzc2FnZSk7XG4gICAgfVxuXG4gICAgaW5pdCh2aWV3KSB7XG4gICAgICAgIGNvbnN0IHNlbGYgPSB0aGlzO1xuXG4gICAgICAgIHNlbGYuZXJyb3JWaWV3ID0gdGhpcy51aShFcnJvclZpZXcpO1xuXG4gICAgICAgIGNvbnN0IG1lbnUgPSB3ZWJpeC51aSh7XG4gICAgICAgICAgICB2aWV3OiBcImNvbnRleHRtZW51XCIsXG4gICAgICAgICAgICBpZDogXCJjaXJjbGVzdGFza3NfY21cIlxuICAgICAgICB9KTtcblxuICAgICAgICB0aGlzLnRhc2tzVGFibGUgPSB0aGlzLiQkKFwiY2lyY2xlc3Rhc2tzX3RhYmxlXCIpO1xuICAgICAgICB3ZWJpeC5leHRlbmQodGhpcy50YXNrc1RhYmxlLCB3ZWJpeC5Qcm9ncmVzc0Jhcik7XG5cbiAgICAgICAgdGFpZ2EudXNlclRhc2tzKDM2KS50aGVuKGRhdGEgPT4ge1xuICAgICAgICAgICAgY29uc3QgY2lyY2xlcyA9IGRhdGEuanNvbigpO1xuICAgICAgICAgICAgc2VsZi50YXNrc1RhYmxlLnBhcnNlKGNpcmNsZXMpO1xuICAgICAgICB9KTtcblxuICAgICAgICB3ZWJpeC5hamF4KCkuZ2V0KFwiL2F1dGgvYXV0aGVudGljYXRlZFwiLCBmdW5jdGlvbiAoZGF0YSkge1xuICAgICAgICAgICAgY29uc3QgaW5mbyA9IEpTT04ucGFyc2UoZGF0YSk7XG4gICAgICAgICAgICBjb25zdCB1c2VybmFtZSA9IGluZm8udXNlcm5hbWUucmVwbGFjZShcIi4zYm90XCIsIFwiXCIpXG4gICAgICAgICAgICB0YWlnYS51c2VyVGFza3ModXNlcm5hbWUpLnRoZW4oZGF0YSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3QgdGFza3MgPSBkYXRhLmpzb24oKTtcbiAgICAgICAgICAgICAgICBzZWxmLnRhc2tzVGFibGUucGFyc2UodGFza3MpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuXG5cbiAgICB9XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zb3VyY2VzL3ZpZXdzL2NpcmNsZXRhc2tzL2luZGV4LmpzIiwiaW1wb3J0IHsgRXh0ZXJuYWxWaWV3IH0gZnJvbSBcIi4uL2V4dGVybmFsXCI7XG5cbmNvbnN0IENPREVfVVJMID0gXCIvY29kZXNlcnZlci8/Zm9sZGVyPS9zYW5kYm94L2NvZGVcIjtcbmNvbnN0IFJFUVVJUkVEX1BBQ0tBR0VTID0ge1xuICAgIFwiemVyb2JvdC5jb2Rlc2VydmVyXCI6IFwiaHR0cHM6Ly9naXRodWIuY29tL3RocmVlZm9sZHRlY2gvanVtcHNjYWxlWF90aHJlZWJvdC90cmVlL2RldmVsb3BtZW50L1RocmVlQm90UGFja2FnZXMvemVyb2JvdC9jb2Rlc2VydmVyXCJcbn1cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ29kZXNlcnZlclZpZXcgZXh0ZW5kcyBFeHRlcm5hbFZpZXcge1xuICAgIGNvbnN0cnVjdG9yKGFwcCwgbmFtZSkge1xuICAgICAgICBzdXBlcihhcHAsIG5hbWUsIENPREVfVVJMLCBSRVFVSVJFRF9QQUNLQUdFUyk7XG4gICAgfVxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc291cmNlcy92aWV3cy9jb2Rlc2VydmVyL2luZGV4LmpzIiwiaW1wb3J0IHsgSmV0VmlldyB9IGZyb20gXCJ3ZWJpeC1qZXRcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVG9wVmlldyBleHRlbmRzIEpldFZpZXcge1xuXHRjb25maWcoKSB7XG5cdFx0cmV0dXJuIHtcblx0XHRcdHR5cGU6IFwic3BhY2VcIixcblx0XHRcdHJlc3BvbnNpdmU6IHRydWUsXG5cdFx0XHRyb3dzOiBbXG5cdFx0XHRcdHtcblx0XHRcdFx0XHRjb2xzOiBbe1xuXHRcdFx0XHRcdFx0JHN1YnZpZXc6IFwiZGFzaC5qc3hJbmZvXCJcblx0XHRcdFx0XHR9LFxuXHRcdFx0XHRcdHtcblx0XHRcdFx0XHRcdCRzdWJ2aWV3OiBcImRhc2guaGVhbHRoXCJcblx0XHRcdFx0XHR9LFxuXHRcdFx0XHRcdHtcblx0XHRcdFx0XHRcdCRzdWJ2aWV3OiBcImRhc2guZGlza1NwYWNlXCJcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XVxuXHRcdFx0XHR9LFxuXHRcdFx0XHR7XG5cdFx0XHRcdFx0Y29sczogW3tcblx0XHRcdFx0XHRcdCRzdWJ2aWV3OiBcImRhc2gucHJvY2Vzc2VzXCJcblx0XHRcdFx0XHR9LFxuXHRcdFx0XHRcdHsgJHN1YnZpZXc6IFwiZGFzaC5ydW5uaW5nUG9ydHNcIiB9XVxuXHRcdFx0XHR9LFxuXHRcdFx0XVxuXHRcdH07XG5cdH1cbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NvdXJjZXMvdmlld3MvZGFzaC9pbmRleC5qcyIsImltcG9ydCB7IEpldFZpZXcgfSBmcm9tIFwid2ViaXgtamV0XCI7XG5cbmltcG9ydCB7IEVycm9yVmlldyB9IGZyb20gXCIuLi9lcnJvcnMvZGlhbG9nXCI7XG5pbXBvcnQgeyBzb2x1dGlvbnMgfSBmcm9tIFwiLi4vLi4vc2VydmljZXMvZGVwbG95ZWRTb2x1dGlvbnNcIjtcblxuaW1wb3J0IFJlc2VydmF0aW9uVmlldyBmcm9tIFwiLi9yZXNlcnZhdGlvblwiO1xuXG5jb25zdCBVTktOT1dOX1NUQVRVUyA9ICdVbmtub3duJztcblxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBEZXBsb3llZFNvbHV0aW9uc1ZpZXcgZXh0ZW5kcyBKZXRWaWV3IHtcbiAgICBjb25maWcoKSB7XG4gICAgICAgIGNvbnN0IGdyaWQgPSB7XG4gICAgICAgICAgICByb3dzOiBbe1xuICAgICAgICAgICAgICAgIC8vSGVhZGVyXG4gICAgICAgICAgICAgICAgdmlldzogXCJ0ZW1wbGF0ZVwiLFxuICAgICAgICAgICAgICAgIHR5cGU6IFwiaGVhZGVyXCIsXG4gICAgICAgICAgICAgICAgdGVtcGxhdGU6IFwiRGVwbG95ZWQgU29sdXRpb25zXCIsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgeyAvL0RhdGFUYWJsZVxuICAgICAgICAgICAgICAgIHZpZXc6IFwiZGF0YXRhYmxlXCIsXG4gICAgICAgICAgICAgICAgaWQ6IFwic29sdXRpb25zX3RhYmxlXCIsXG4gICAgICAgICAgICAgICAgcmVzaXplQ29sdW1uOiB0cnVlLFxuICAgICAgICAgICAgICAgIHR5cGU6IHtcbiAgICAgICAgICAgICAgICAgICAgaGVpZ2h0OiAyMDAsXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBzY3JvbGw6IFwieHlcIixcbiAgICAgICAgICAgICAgICBhdXRvQ29uZmlnOiB0cnVlLFxuICAgICAgICAgICAgICAgIHZpZXc6IFwiZGF0YXRhYmxlXCIsXG4gICAgICAgICAgICAgICAgc2VsZWN0OiB0cnVlLFxuICAgICAgICAgICAgICAgIGNzczogXCJ3ZWJpeF9oZWFkZXJfYm9yZGVyIHdlYml4X2RhdGFfYm9yZGVyXCIsXG4gICAgICAgICAgICAgICAgb25Db250ZXh0OiB7fSxcbiAgICAgICAgICAgICAgICBjb2x1bW5zOiBbe1xuICAgICAgICAgICAgICAgICAgICBpZDogXCJpbmRleFwiLFxuICAgICAgICAgICAgICAgICAgICBoZWFkZXI6IFwiI1wiLFxuICAgICAgICAgICAgICAgICAgICBzb3J0OiBcImludFwiLFxuICAgICAgICAgICAgICAgICAgICBhdXRvd2lkdGg6IHRydWUsXG4gICAgICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgICAgICBpZDogXCJzb2x1dGlvbk5hbWVcIixcbiAgICAgICAgICAgICAgICAgICAgaGVhZGVyOiBbXCJTb2x1dGlvbiBOYW1lXCIsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRlbnQ6IFwidGV4dEZpbHRlclwiXG4gICAgICAgICAgICAgICAgICAgIH1dLFxuICAgICAgICAgICAgICAgICAgICBzb3J0OiBcInN0cmluZ1wiLFxuICAgICAgICAgICAgICAgICAgICB3aWR0aDogMjAwXG4gICAgICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgICAgICBpZDogXCJyZXN2SWRcIixcbiAgICAgICAgICAgICAgICAgICAgaGVhZGVyOiBbXCJSZXNlcnZhdGlvbiBJZFwiLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb250ZW50OiBcInRleHRGaWx0ZXJcIlxuICAgICAgICAgICAgICAgICAgICB9XSxcbiAgICAgICAgICAgICAgICAgICAgc29ydDogXCJzdHJpbmdcIixcbiAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDIwMFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBpZDogXCJzb2x1dGlvblR5cGVcIixcbiAgICAgICAgICAgICAgICAgICAgaGVhZGVyOiBbXCJTb2x1dGlvbiBUeXBlXCIsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRlbnQ6IFwic2VsZWN0RmlsdGVyXCJcbiAgICAgICAgICAgICAgICAgICAgfV0sXG4gICAgICAgICAgICAgICAgICAgIHNvcnQ6IFwic3RyaW5nXCIsXG4gICAgICAgICAgICAgICAgICAgIHdpZHRoOiAyMDBcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgaWQ6IFwibmV4dEFjdGlvblwiLFxuICAgICAgICAgICAgICAgICAgICBoZWFkZXI6IFtcIk5leHQgYWN0aW9uXCIsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRlbnQ6IFwic2VsZWN0RmlsdGVyXCJcbiAgICAgICAgICAgICAgICAgICAgfV0sXG4gICAgICAgICAgICAgICAgICAgIHNvcnQ6IFwic3RyaW5nXCIsXG4gICAgICAgICAgICAgICAgICAgIHdpZHRoOiAyMDBcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICBzY2hlbWU6IHtcbiAgICAgICAgICAgICAgICAgICAgJGluaXQ6IGZ1bmN0aW9uIChvYmopIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG9iai5zb2x1dGlvbk5hbWUgPSBvYmoubmFtZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIG9iai5yZXN2SWQgPSBvYmoucmVzZXJ2YXRpb24uaWQ7XG4gICAgICAgICAgICAgICAgICAgICAgICBvYmouc29sdXRpb25UeXBlID0gb2JqLnR5cGU7XG4gICAgICAgICAgICAgICAgICAgICAgICBvYmoubmV4dEFjdGlvbiA9IG9iai5yZXNlcnZhdGlvbi5uZXh0X2FjdGlvbjtcbiAgICAgICAgICAgICAgICAgICAgICAgIG9iai5pbmRleCA9IHRoaXMuY291bnQoKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgb246IHtcbiAgICAgICAgICAgICAgICAgICAgb25BZnRlckxvYWQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghdGhpcy5jb3VudCgpKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2hvd092ZXJsYXkoXCJTb3JyeSwgdGhlcmUgaXMgbm8gZGF0YVwiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmhpZGVPdmVybGF5KCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBdXG4gICAgICAgIH07XG4gICAgICAgIHJldHVybiBncmlkO1xuICAgIH1cblxuICAgIHNob3dFcnJvcihtZXNzYWdlKSB7XG4gICAgICAgIHRoaXMuZXJyb3JWaWV3LnNob3dFcnJvcihtZXNzYWdlKTtcbiAgICB9XG5cbiAgICBoYW5kbGVSZXN1bHQocHJvbWlzZSwgY2FsbGJhY2spIHtcbiAgICAgICAgdGhpcy5zb2x1dGlvbnNUYWJsZS5zaG93UHJvZ3Jlc3MoeyBoaWRlOiBmYWxzZSB9KTtcblxuICAgICAgICBwcm9taXNlLnRoZW4oKGRhdGEpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IHNvbHV0aW9uSXRlbSA9IGRhdGEuanNvbigpLnNvbHV0aW9uO1xuICAgICAgICAgICAgaWYgKGNhbGxiYWNrIGluc3RhbmNlb2YgRnVuY3Rpb24pIHtcbiAgICAgICAgICAgICAgICBjYWxsYmFjayhzb2x1dGlvbkl0ZW0pO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB3ZWJpeC5tZXNzYWdlKHtcbiAgICAgICAgICAgICAgICB0eXBlOiBcInN1Y2Nlc3NcIixcbiAgICAgICAgICAgICAgICB0ZXh0OiBcIlRoZSBvcGVyYXRpb24gaGFzIGJlZWQgZG9uZSBzdWNjZXNzZnVsbHlcIlxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIHRoaXMuc29sdXRpb25zVGFibGUuc2hvd1Byb2dyZXNzKHsgaGlkZTogdHJ1ZSB9KTtcbiAgICAgICAgfSkuY2F0Y2goZXJyb3IgPT4ge1xuICAgICAgICAgICAgdGhpcy5zaG93RXJyb3IoXCJFcnJvciBoYXMgaGFwcGVuZWQgZHVyaW5nIHRoaXMgb3BlcmF0aW9uOiBcIiArIGVycm9yLnJlc3BvbnNlLCBcIkVycm9yXCIpO1xuICAgICAgICAgICAgdGhpcy5zb2x1dGlvbnNUYWJsZS5zaG93UHJvZ3Jlc3MoeyBoaWRlOiB0cnVlIH0pO1xuICAgICAgICB9KVxuICAgIH1cblxuICAgIGRlbGV0ZVNvbHV0aW9uKHNvbHV0aW9uVHlwZSwgc29sdXRpb25OYW1lLCBpdGVtSWQpIHtcbiAgICAgICAgdGhpcy5oYW5kbGVSZXN1bHQoc29sdXRpb25zLmRlbGV0ZShzb2x1dGlvblR5cGUsIHNvbHV0aW9uTmFtZSksICgpID0+IHtcbiAgICAgICAgICAgIHRoaXMuc29sdXRpb25zVGFibGUucmVtb3ZlKGl0ZW1JZClcbiAgICAgICAgfSk7XG5cbiAgICB9XG5cbiAgICBsb2FkU29sdXRpb25zKCkge1xuICAgICAgICBzb2x1dGlvbnMubGlzdCgpLnRoZW4oZGF0YSA9PiB7XG4gICAgICAgICAgICBsZXQgc29sdXRpb25zID0gZGF0YS5qc29uKCkuc29sdXRpb25zXG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHNvbHV0aW9ucy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIHNvbHV0aW9uc1tpXS5yZXNlcnZhdGlvbiA9IEpTT04ucGFyc2Uoc29sdXRpb25zW2ldLnJlc2VydmF0aW9uKVxuICAgICAgICAgICAgICAgIHNvbHV0aW9uc1tpXS5mb3JtX2luZm8gPSBKU09OLnBhcnNlKHNvbHV0aW9uc1tpXS5mb3JtX2luZm8pXG5cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuc29sdXRpb25zVGFibGUucGFyc2Uoc29sdXRpb25zKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgdmlld0l0ZW0oaWQpIHtcbiAgICAgICAgdGhpcy5yZXNlcnZhdGlvblZpZXcuc2hvd0Zvcih0aGlzLnNvbHV0aW9uc1RhYmxlLmdldEl0ZW0oaWQpKTtcbiAgICB9XG5cbiAgICBpbml0KHZpZXcpIHtcbiAgICAgICAgY29uc3Qgc2VsZiA9IHRoaXM7XG5cbiAgICAgICAgc2VsZi5lcnJvclZpZXcgPSB0aGlzLnVpKEVycm9yVmlldyk7XG4gICAgICAgIHNlbGYucmVzZXJ2YXRpb25WaWV3ID0gc2VsZi51aShSZXNlcnZhdGlvblZpZXcpO1xuXG4gICAgICAgIGNvbnN0IG1lbnUgPSB3ZWJpeC51aSh7XG4gICAgICAgICAgICB2aWV3OiBcImNvbnRleHRtZW51XCIsXG4gICAgICAgICAgICBpZDogXCJzb2x1dGlvbnNfY21cIlxuICAgICAgICB9KTtcblxuICAgICAgICB0aGlzLnNvbHV0aW9uc1RhYmxlID0gdGhpcy4kJChcInNvbHV0aW9uc190YWJsZVwiKTtcbiAgICAgICAgc2VsZi5sb2FkU29sdXRpb25zKCk7XG4gICAgICAgIHdlYml4LmV4dGVuZCh0aGlzLnNvbHV0aW9uc1RhYmxlLCB3ZWJpeC5Qcm9ncmVzc0Jhcik7XG5cbiAgICAgICAgZnVuY3Rpb24gY2hlY2tBY3Rpb24oYWN0aW9uLCBzZWxlY3RlZEl0ZW1JZCkge1xuICAgICAgICAgICAgY29uc3QgaXRlbSA9IHNlbGYuc29sdXRpb25zVGFibGUuZ2V0SXRlbShzZWxlY3RlZEl0ZW1JZCk7XG4gICAgICAgICAgICBpZiAoaXRlbSkge1xuICAgICAgICAgICAgICAgIGxldCBpdGVtSWQgPSBpdGVtLmlkO1xuICAgICAgICAgICAgICAgIGxldCBzb2x1dGlvbk5hbWUgPSBpdGVtLnNvbHV0aW9uTmFtZTtcbiAgICAgICAgICAgICAgICBsZXQgc29sdXRpb25UeXBlID0gaXRlbS5zb2x1dGlvblR5cGU7XG4gICAgICAgICAgICAgICAgbGV0IG5leHRBY3Rpb24gPSBpdGVtLnJlc2VydmF0aW9uLm5leHRfYWN0aW9uXG5cbiAgICAgICAgICAgICAgICBpZiAoYWN0aW9uID09ICdkZWxldGUnKSB7XG4gICAgICAgICAgICAgICAgICAgIHdlYml4LmNvbmZpcm0oe1xuICAgICAgICAgICAgICAgICAgICAgICAgdGl0bGU6IFwiQ2FuY2VsIFNvbHV0aW9uXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBvazogXCJZZXNcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIHRleHQ6IGBBcmUgeW91IHN1cmUgeW91IHdhbnQgdG8gY2FuY2VsICR7c29sdXRpb25OYW1lfT9gLFxuICAgICAgICAgICAgICAgICAgICAgICAgY2FuY2VsOiBcIk5vXCIsXG4gICAgICAgICAgICAgICAgICAgIH0pLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5kZWxldGVTb2x1dGlvbihzb2x1dGlvblR5cGUsIHNvbHV0aW9uTmFtZSwgaXRlbUlkKVxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHdlYml4Lm1lc3NhZ2UoXCJZb3UgbmVlZCB0byBzZWxlY3QgYSBzb2x1dGlvblwiKVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgJCQoXCJzb2x1dGlvbnNfY21cIikuYXR0YWNoRXZlbnQoXCJvbk1lbnVJdGVtQ2xpY2tcIiwgZnVuY3Rpb24gKGlkKSB7XG4gICAgICAgICAgICBjaGVja0FjdGlvbihpZCwgc2VsZi5zb2x1dGlvbnNUYWJsZS5nZXRTZWxlY3RlZElkKCkpO1xuICAgICAgICB9KTtcblxuICAgICAgICBzZWxmLnNvbHV0aW9uc1RhYmxlLmF0dGFjaEV2ZW50KFwib25JdGVtRGJsQ2xpY2tcIiwgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgc2VsZi52aWV3SXRlbShzZWxmLnNvbHV0aW9uc1RhYmxlLmdldFNlbGVjdGVkSWQoKSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHdlYml4LmV2ZW50KHNlbGYuc29sdXRpb25zVGFibGUuJHZpZXcsIFwiY29udGV4dG1lbnVcIiwgZnVuY3Rpb24gKGUgLypNb3VzZUV2ZW50Ki8pIHtcbiAgICAgICAgICAgIGNvbnN0IHBvcyA9IHNlbGYuc29sdXRpb25zVGFibGUubG9jYXRlKGUpO1xuICAgICAgICAgICAgaWYgKHBvcykge1xuICAgICAgICAgICAgICAgIGNvbnN0IGl0ZW0gPSBzZWxmLnNvbHV0aW9uc1RhYmxlLmdldEl0ZW0ocG9zLnJvdyk7XG4gICAgICAgICAgICAgICAgY29uc3QgYWN0aW9ucyA9IFsnZGVsZXRlJ107XG5cbiAgICAgICAgICAgICAgICBtZW51LmNsZWFyQWxsKCk7XG4gICAgICAgICAgICAgICAgbWVudS5wYXJzZShhY3Rpb25zKTtcbiAgICAgICAgICAgICAgICBtZW51LnNob3coZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gd2ViaXguaHRtbC5wcmV2ZW50RXZlbnQoZSk7XG4gICAgICAgIH0pXG5cbiAgICB9XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zb3VyY2VzL3ZpZXdzL2RlcGxveWVkU29sdXRpb25zL2luZGV4LmpzIiwiaW1wb3J0IHsgRXh0ZXJuYWxWaWV3IH0gZnJvbSBcIi4uL2V4dGVybmFsXCI7XG5cbmNvbnN0IFVSTCA9IFwiL3RocmVlYm90L2Zhcm1tYW5hZ2VtZW50XCI7XG5jb25zdCBSRVFVSVJFRF9QQUNLQUdFUyA9IHtcbiAgICBcInRocmVlYm90LmZhcm1tYW5hZ2VtZW50XCI6IFwiaHR0cHM6Ly9naXRodWIuY29tL3RocmVlZm9sZHRlY2gvanVtcHNjYWxlWF90aHJlZWJvdC90cmVlL2RldmVsb3BtZW50L1RocmVlQm90UGFja2FnZXMvdGhyZWVib3QvZmFybW1hbmFnZW1lbnRcIlxufVxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBGYXJtbWFuYWdlbWVudFZpZXcgZXh0ZW5kcyBFeHRlcm5hbFZpZXcge1xuICAgIGNvbnN0cnVjdG9yKGFwcCwgbmFtZSkge1xuICAgICAgICBzdXBlcihhcHAsIG5hbWUsIFVSTCwgUkVRVUlSRURfUEFDS0FHRVMpO1xuICAgIH1cbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NvdXJjZXMvdmlld3MvZmFybW1hbmFnZW1lbnQvaW5kZXguanMiLCJpbXBvcnQgeyBFeHRlcm5hbFZpZXcgfSBmcm9tIFwiLi4vZXh0ZXJuYWxcIjtcblxuY29uc3QgVVJMID0gXCIvdGhyZWVmb2xkL3NpbXVsYXRvci9ub3RlYm9vay9cIjtcbmNvbnN0IFJFUVVJUkVEX1BBQ0tBR0VTID0ge1xuICAgIFwidGhyZWVmb2xkLnNpbXVsYXRvclwiOiBcImh0dHBzOi8vZ2l0aHViLmNvbS90aHJlZWZvbGR0ZWNoL2p1bXBzY2FsZVhfdGhyZWVib3QvdHJlZS9kZXZlbG9wbWVudC9UaHJlZUJvdFBhY2thZ2VzL3RocmVlZm9sZC9zaW11bGF0b3JcIlxufVxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBKdXB5dGVyVmlldyBleHRlbmRzIEV4dGVybmFsVmlldyB7XG4gICAgY29uc3RydWN0b3IoYXBwLCBuYW1lKSB7XG4gICAgICAgIHN1cGVyKGFwcCwgbmFtZSwgVVJMLCBSRVFVSVJFRF9QQUNLQUdFUyk7XG4gICAgfVxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc291cmNlcy92aWV3cy9qdXB5dGVyL2luZGV4LmpzIiwiaW1wb3J0IHsgSmV0VmlldyB9IGZyb20gXCJ3ZWJpeC1qZXRcIjtcblxuaW1wb3J0IEFwcExvZ3NWaWV3IGZyb20gXCIuL2FwcExvZ3NcIjtcbmltcG9ydCB7IGxvZ3MgfSBmcm9tIFwiLi4vLi4vc2VydmljZXMvbG9nc1wiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBMb2dzVmlldyBleHRlbmRzIEpldFZpZXcge1xuICAgIGNvbmZpZygpIHtcblxuICAgICAgICBjb25zdCB2aWV3ID0ge1xuICAgICAgICAgICAgcm93czogW3tcbiAgICAgICAgICAgICAgICBjb2xzOiBbXG4gICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZpZXc6IFwidGVtcGxhdGVcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU6IFwiaGVhZGVyXCIsIHRlbXBsYXRlOiBcIkxvZ3NcIixcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmlldzogXCJjb21ib1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgaWQ6IFwiYXBwc19jb21ib1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgcGxhY2Vob2xkZXI6IFwiQ2hvb3NlIHlvdXIgYXBwbGljYXRpb25cIixcbiAgICAgICAgICAgICAgICAgICAgICAgIG9uOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb25DaGFuZ2U6IGZ1bmN0aW9uIChhcHBOYW1lKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuJHNjb3BlLnNob3dGb3IoYXBwTmFtZSlcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIEFwcExvZ3NWaWV3XG4gICAgICAgICAgICBdXG4gICAgICAgIH07XG5cbiAgICAgICAgcmV0dXJuIHZpZXc7XG4gICAgfVxuXG4gICAgaW5pdCh2aWV3KSB7XG4gICAgICAgIHZpZXcuYXBwc0NvbWJvID0gJCQoXCJhcHBzX2NvbWJvXCIpO1xuICAgICAgICBsb2dzLmxpc3RBcHBzKCkudGhlbihkYXRhID0+IHtcbiAgICAgICAgICAgIHZpZXcuYXBwc0NvbWJvLmRlZmluZShcIm9wdGlvbnNcIiwgZGF0YS5qc29uKCkpO1xuICAgICAgICAgICAgdmlldy5hcHBzQ29tYm8ucmVuZGVyKCk7XG4gICAgICAgIH0pO1xuXG4gICAgfVxuXG4gICAgdXJsQ2hhbmdlKHZpZXcsIHVybCkge1xuICAgICAgICBjb25zdCBhcHBOYW1lID0gdXJsWzBdLnBhcmFtcy5hcHBuYW1lLCBsb2dJZCA9IHVybFswXS5wYXJhbXMubG9naWQ7XG4gICAgICAgIGlmIChhcHBOYW1lKSB7XG4gICAgICAgICAgICB0aGlzLnNob3dGb3IoYXBwTmFtZSwgbG9nSWQpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgc2hvd0ZvcihhcHBOYW1lLCBsb2dJZCkge1xuICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgICAgIHNlbGYuYXBwTG9ncyA9ICQkKFwiYXBwbG9nc190YWJsZVwiKTtcblxuICAgICAgICB3ZWJpeC5leHRlbmQoc2VsZi5hcHBMb2dzLCB3ZWJpeC5Qcm9ncmVzc0Jhcik7XG4gICAgICAgIHNlbGYuYXBwTG9ncy5zaG93UHJvZ3Jlc3MoeyBoaWRlOiBmYWxzZSB9KTtcblxuICAgICAgICBsb2dzLmxpc3QoYXBwTmFtZSwgbG9nSWQpLnRoZW4oZGF0YSA9PiB7XG4gICAgICAgICAgICBzZWxmLmFwcExvZ3MuY2xlYXJBbGwoKVxuICAgICAgICAgICAgc2VsZi5hcHBMb2dzLnBhcnNlKGRhdGEuanNvbigpWzBdKVxuICAgICAgICAgICAgc2VsZi5hcHBMb2dzLnNob3dQcm9ncmVzcyh7IGhpZGU6IHRydWUgfSk7XG4gICAgICAgIH0pO1xuICAgIH1cbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NvdXJjZXMvdmlld3MvbG9ncy9pbmRleC5qcyIsImltcG9ydCB7IEpldFZpZXcgfSBmcm9tIFwid2ViaXgtamV0XCI7XG5cbmltcG9ydCB7IEVycm9yVmlldyB9IGZyb20gXCIuLi9lcnJvcnMvZGlhbG9nXCI7XG5pbXBvcnQgeyBwYWNrYWdlcyB9IGZyb20gXCIuLi8uLi9zZXJ2aWNlcy9wYWNrYWdlc1wiO1xuXG5jb25zdCBVTktOT1dOX1NUQVRVUyA9ICdVbmtub3duJztcblxuY29uc3QgUEFDS0FHRV9TVEFURVMgPSBbXG4gICAge1xuICAgICAgICBuYW1lOiBcIkluaXRcIixcbiAgICAgICAgYWN0aW9uczogW11cbiAgICB9LFxuICAgIHtcbiAgICAgICAgbmFtZTogXCJDb25maWdcIixcbiAgICAgICAgYWN0aW9uczogWydpbnN0YWxsJ10sXG4gICAgfSxcbiAgICB7XG4gICAgICAgIG5hbWU6IFwiSW5zdGFsbGVkXCIsXG4gICAgICAgIGFjdGlvbnM6IFsnc3RhcnQnXVxuICAgIH0sXG4gICAge1xuICAgICAgICBuYW1lOiBcIlJ1bm5pbmdcIixcbiAgICAgICAgYWN0aW9uczogW1wic3RvcFwiXVxuICAgIH0sXG4gICAge1xuICAgICAgICBuYW1lOiBcIkhhbHRlZFwiLFxuICAgICAgICBhY3Rpb25zOiBbXCJzdGFydFwiLCBcImRpc2FibGVcIl1cbiAgICB9LFxuICAgIHtcbiAgICAgICAgbmFtZTogXCJEaXNhYmxlZFwiLFxuICAgICAgICBhY3Rpb25zOiBbXCJlbmFibGVcIl1cbiAgICB9LFxuICAgIHtcbiAgICAgICAgbmFtZTogXCJFcnJvclwiLFxuICAgICAgICBhY3Rpb25zOiBbJ2luc3RhbGwnXVxuICAgIH1cbl07XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFBhY2thZ2VzVmlldyBleHRlbmRzIEpldFZpZXcge1xuICAgIGNvbmZpZygpIHtcbiAgICAgICAgY29uc3QgZ3JpZCA9IHtcbiAgICAgICAgICAgIHJvd3M6IFt7XG4gICAgICAgICAgICAgICAgLy9IZWFkZXJcbiAgICAgICAgICAgICAgICB2aWV3OiBcInRlbXBsYXRlXCIsXG4gICAgICAgICAgICAgICAgdHlwZTogXCJoZWFkZXJcIixcbiAgICAgICAgICAgICAgICB0ZW1wbGF0ZTogXCJQYWNrYWdlc1wiLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHsgLy9hZGRpbmcgUGFja2FnZVxuICAgICAgICAgICAgICAgIGNvbHM6IFt7XG4gICAgICAgICAgICAgICAgICAgIC8vc2VsZWN0b3JcbiAgICAgICAgICAgICAgICAgICAgdmlldzogXCJzZWxlY3RcIixcbiAgICAgICAgICAgICAgICAgICAgaWQ6ICdtZXRob2Rfc2VsZWN0b3InLFxuICAgICAgICAgICAgICAgICAgICBvcHRpb25zOiBbXCJQYXRoXCIsIFwiR2l0dXJsXCJdLFxuICAgICAgICAgICAgICAgICAgICB3aWR0aDogMTAwXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAvL3RleHQgYXJlYVxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgdmlldzogXCJ0ZXh0XCIsXG4gICAgICAgICAgICAgICAgICAgIGlkOiAncGFja2FnZV9wYXRoJyxcbiAgICAgICAgICAgICAgICAgICAgaW5wdXRBbGlnbjogXCJsZWZ0XCIsXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAvL3N1Ym1pdCBidXR0b25cbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIHZpZXc6IFwiYnV0dG9uXCIsXG4gICAgICAgICAgICAgICAgICAgIGlkOiBcImFkZF9wYWNrYWdlX2J1dHRvblwiLFxuICAgICAgICAgICAgICAgICAgICB2YWx1ZTogXCJBZGQgcGFja2FnZVwiLFxuICAgICAgICAgICAgICAgICAgICBhdXRvd2lkdGg6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgIHR5cGU6IFwiXCIsXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7IC8vRGF0YVRhYmxlXG4gICAgICAgICAgICAgICAgdmlldzogXCJkYXRhdGFibGVcIixcbiAgICAgICAgICAgICAgICBpZDogXCJwYWNrYWdlc190YWJsZVwiLFxuICAgICAgICAgICAgICAgIHJlc2l6ZUNvbHVtbjogdHJ1ZSxcbiAgICAgICAgICAgICAgICB0eXBlOiB7XG4gICAgICAgICAgICAgICAgICAgIGhlaWdodDogMjAwLFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgc2Nyb2xsOiBcInh5XCIsXG4gICAgICAgICAgICAgICAgYXV0b0NvbmZpZzogdHJ1ZSxcbiAgICAgICAgICAgICAgICB2aWV3OiBcImRhdGF0YWJsZVwiLFxuICAgICAgICAgICAgICAgIHNlbGVjdDogdHJ1ZSxcbiAgICAgICAgICAgICAgICBjc3M6IFwid2ViaXhfaGVhZGVyX2JvcmRlciB3ZWJpeF9kYXRhX2JvcmRlclwiLFxuICAgICAgICAgICAgICAgIG9uQ29udGV4dDoge30sXG4gICAgICAgICAgICAgICAgY29sdW1uczogW3tcbiAgICAgICAgICAgICAgICAgICAgaWQ6IFwiaW5kZXhcIixcbiAgICAgICAgICAgICAgICAgICAgaGVhZGVyOiBcIiNcIixcbiAgICAgICAgICAgICAgICAgICAgc29ydDogXCJpbnRcIixcbiAgICAgICAgICAgICAgICAgICAgYXV0b3dpZHRoOiB0cnVlLFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBpZDogXCJhdXRob3JcIixcbiAgICAgICAgICAgICAgICAgICAgaGVhZGVyOiBbXCJBdXRob3JcIiwge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29udGVudDogXCJzZWxlY3RGaWx0ZXJcIlxuICAgICAgICAgICAgICAgICAgICB9XSxcbiAgICAgICAgICAgICAgICAgICAgc29ydDogXCJzdHJpbmdcIixcbiAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDIwMFxuICAgICAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICAgICAgaWQ6IFwic291cmNlX25hbWVcIixcbiAgICAgICAgICAgICAgICAgICAgaGVhZGVyOiBbXCJOYW1lXCIsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRlbnQ6IFwidGV4dEZpbHRlclwiXG4gICAgICAgICAgICAgICAgICAgIH1dLFxuICAgICAgICAgICAgICAgICAgICBzb3J0OiBcInN0cmluZ1wiLFxuICAgICAgICAgICAgICAgICAgICB3aWR0aDogMjAwXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIGlkOiBcInN0YXR1c1wiLFxuICAgICAgICAgICAgICAgICAgICBoZWFkZXI6IFwiU3RhdHVzXCIsXG4gICAgICAgICAgICAgICAgICAgIHNvcnQ6IFwic3RyaW5nXCIsXG4gICAgICAgICAgICAgICAgICAgIGZvcm1hdDogKHZhbHVlKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBzdGF0dXMgPSBQQUNLQUdFX1NUQVRFU1t2YWx1ZV07XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gc3RhdHVzICYmIHN0YXR1cy5uYW1lIHx8IFVOS05PV05fU1RBVFVTO1xuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICAgICAgaWQ6IFwicGF0aFwiLFxuICAgICAgICAgICAgICAgICAgICBoZWFkZXI6IFwiUGF0aFwiLFxuICAgICAgICAgICAgICAgICAgICBzb3J0OiBcInN0cmluZ1wiLFxuICAgICAgICAgICAgICAgICAgICB3aWR0aDogNzAwXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgc2NoZW1lOiB7XG4gICAgICAgICAgICAgICAgICAgICRpbml0OiBmdW5jdGlvbiAob2JqKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBvYmouc291cmNlX25hbWUgPSBvYmouc291cmNlLm5hbWU7XG4gICAgICAgICAgICAgICAgICAgICAgICBvYmouYXV0aG9yID0gb2JqLnNvdXJjZS50aHJlZWJvdDtcbiAgICAgICAgICAgICAgICAgICAgICAgIG9iai5pbmRleCA9IHRoaXMuY291bnQoKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIF1cbiAgICAgICAgfTtcbiAgICAgICAgcmV0dXJuIGdyaWQ7XG4gICAgfVxuXG4gICAgc2hvd0Vycm9yKG1lc3NhZ2UpIHtcbiAgICAgICAgdGhpcy5lcnJvclZpZXcuc2hvd0Vycm9yKG1lc3NhZ2UpO1xuICAgIH1cblxuICAgIGhhbmRsZVJlc3VsdChwcm9taXNlLCBjYWxsYmFjaykge1xuICAgICAgICB0aGlzLnBhY2thZ2VUYWJsZS5zaG93UHJvZ3Jlc3MoeyBoaWRlOiBmYWxzZSB9KTtcblxuICAgICAgICBwcm9taXNlLnRoZW4oKGRhdGEpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IHBhY2thZ2VJdGVtID0gZGF0YS5qc29uKCkucGFja2FnZTtcbiAgICAgICAgICAgIGlmIChjYWxsYmFjayBpbnN0YW5jZW9mIEZ1bmN0aW9uKSB7XG4gICAgICAgICAgICAgICAgY2FsbGJhY2socGFja2FnZUl0ZW0pO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB3ZWJpeC5tZXNzYWdlKHtcbiAgICAgICAgICAgICAgICB0eXBlOiBcInN1Y2Nlc3NcIixcbiAgICAgICAgICAgICAgICB0ZXh0OiBcIlRoZSBvcGVyYXRpb24gaGFzIGJlZWQgZG9uZSBzdWNjZXNzZnVsbHlcIlxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIHRoaXMucGFja2FnZVRhYmxlLnNob3dQcm9ncmVzcyh7IGhpZGU6IHRydWUgfSk7XG4gICAgICAgIH0pLmNhdGNoKGVycm9yID0+IHtcbiAgICAgICAgICAgIHRoaXMuc2hvd0Vycm9yKFwiRXJyb3IgaGFzIGhhcHBlbmVkIGR1cmluZyB0aGlzIG9wZXJhdGlvbjogXCIgKyBlcnJvci5yZXNwb25zZSwgXCJFcnJvclwiKTtcbiAgICAgICAgICAgIHRoaXMucGFja2FnZVRhYmxlLnNob3dQcm9ncmVzcyh7IGhpZGU6IHRydWUgfSk7XG4gICAgICAgIH0pXG4gICAgfVxuXG4gICAgYWRkUGFja2FnZShwYXRoLCBnaXRVcmwsIGl0ZW1JZCkge1xuICAgICAgICB0aGlzLmhhbmRsZVJlc3VsdChwYWNrYWdlcy5hZGQocGF0aCwgZ2l0VXJsKSwgKGl0ZW0pID0+IHtcbiAgICAgICAgICAgIGlmIChpdGVtSWQpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnBhY2thZ2VUYWJsZS51cGRhdGVJdGVtKGl0ZW1JZCwgaXRlbSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMucGFja2FnZVRhYmxlLmFkZChpdGVtKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgZGVsZXRlUGFja2FnZShwYWNrYWdlTmFtZSwgaXRlbUlkKSB7XG4gICAgICAgIHRoaXMuaGFuZGxlUmVzdWx0KHBhY2thZ2VzLmRlbGV0ZShwYWNrYWdlTmFtZSksICgpID0+IHtcbiAgICAgICAgICAgIHRoaXMucGFja2FnZVRhYmxlLnJlbW92ZShpdGVtSWQpXG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHN0YXJ0UGFja2FnZShwYWNrYWdlTmFtZSwgaXRlbUlkKSB7XG4gICAgICAgIHRoaXMuaGFuZGxlUmVzdWx0KHBhY2thZ2VzLnN0YXJ0KHBhY2thZ2VOYW1lKSwgKGl0ZW0pID0+IHtcbiAgICAgICAgICAgIHRoaXMucGFja2FnZVRhYmxlLnVwZGF0ZUl0ZW0oaXRlbUlkLCBpdGVtKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgc3RvcFBhY2thZ2UocGFja2FnZU5hbWUsIGl0ZW1JZCkge1xuICAgICAgICB0aGlzLmhhbmRsZVJlc3VsdChwYWNrYWdlcy5zdG9wKHBhY2thZ2VOYW1lKSwgKGl0ZW0pID0+IHtcbiAgICAgICAgICAgIHRoaXMucGFja2FnZVRhYmxlLnVwZGF0ZUl0ZW0oaXRlbUlkLCBpdGVtKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgZW5hYmxlUGFja2FnZShwYWNrYWdlTmFtZSwgaXRlbUlkKSB7XG4gICAgICAgIHRoaXMuaGFuZGxlUmVzdWx0KHBhY2thZ2VzLmVuYWJsZShwYWNrYWdlTmFtZSksIChpdGVtKSA9PiB7XG4gICAgICAgICAgICB0aGlzLnBhY2thZ2VUYWJsZS51cGRhdGVJdGVtKGl0ZW1JZCwgaXRlbSk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGRpc2FibGVQYWNrYWdlKHBhY2thZ2VOYW1lLCBpdGVtSWQpIHtcbiAgICAgICAgdGhpcy5oYW5kbGVSZXN1bHQocGFja2FnZXMuZGlzYWJsZShwYWNrYWdlTmFtZSksIChpdGVtKSA9PiB7XG4gICAgICAgICAgICB0aGlzLnBhY2thZ2VUYWJsZS51cGRhdGVJdGVtKGl0ZW1JZCwgaXRlbSk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGxvYWRQYWNrYWdlcygpIHtcbiAgICAgICAgcGFja2FnZXMubGlzdCgpLnRoZW4oZGF0YSA9PiB7XG4gICAgICAgICAgICB0aGlzLnBhY2thZ2VUYWJsZS5wYXJzZShkYXRhLmpzb24oKS5wYWNrYWdlcyk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGluaXQodmlldykge1xuICAgICAgICBjb25zdCBzZWxmID0gdGhpcztcblxuICAgICAgICBzZWxmLmVycm9yVmlldyA9IHRoaXMudWkoRXJyb3JWaWV3KTtcbiAgICAgICAgc2VsZi5fcmVxdWlyZWRwYWNrYWdlcyA9IFtcInplcm9ib3QuYmFzZVwiLCBcInplcm9ib3Qud2ViaW50ZXJmYWNlXCIsIFwiemVyb2JvdC5hZG1pblwiXVxuXG4gICAgICAgIGNvbnN0IG1lbnUgPSB3ZWJpeC51aSh7XG4gICAgICAgICAgICB2aWV3OiBcImNvbnRleHRtZW51XCIsXG4gICAgICAgICAgICBpZDogXCJwYWNrYWdlc19jbVwiXG4gICAgICAgIH0pO1xuXG4gICAgICAgIHRoaXMucGFja2FnZVRhYmxlID0gdGhpcy4kJChcInBhY2thZ2VzX3RhYmxlXCIpO1xuICAgICAgICB3ZWJpeC5leHRlbmQodGhpcy5wYWNrYWdlVGFibGUsIHdlYml4LlByb2dyZXNzQmFyKTtcblxuICAgICAgICBmdW5jdGlvbiBjaGVja0FjdGlvbihhY3Rpb24sIHNlbGVjdGVkSXRlbUlkKSB7XG4gICAgICAgICAgICBjb25zdCBpdGVtID0gc2VsZi5wYWNrYWdlVGFibGUuZ2V0SXRlbShzZWxlY3RlZEl0ZW1JZCk7XG4gICAgICAgICAgICBpZiAoaXRlbSkge1xuICAgICAgICAgICAgICAgIGxldCBpdGVtSWQgPSBpdGVtLmlkO1xuICAgICAgICAgICAgICAgIGxldCBwYWNrYWdlTmFtZSA9IGl0ZW0ubmFtZTtcblxuICAgICAgICAgICAgICAgIGlmIChhY3Rpb24gPT0gJ2luc3RhbGwnKSB7XG4gICAgICAgICAgICAgICAgICAgIHNlbGYuYWRkUGFja2FnZShpdGVtLnBhdGgsIG51bGwsIGl0ZW1JZCk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChhY3Rpb24gPT0gJ2RlbGV0ZScpIHtcbiAgICAgICAgICAgICAgICAgICAgd2ViaXguY29uZmlybSh7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aXRsZTogXCJEZWxldGUgUGFja2FnZVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgb2s6IFwiWWVzXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICB0ZXh0OiBgQXJlIHlvdSBzdXJlIHlvdSB3YW50IHRvIGRlbGV0ZSAke3BhY2thZ2VOYW1lfT9gLFxuICAgICAgICAgICAgICAgICAgICAgICAgY2FuY2VsOiBcIk5vXCIsXG4gICAgICAgICAgICAgICAgICAgIH0pLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5kZWxldGVQYWNrYWdlKHBhY2thZ2VOYW1lLCBpdGVtSWQpXG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAvL1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoYWN0aW9uID09ICdzdGFydCcpIHtcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5zdGFydFBhY2thZ2UocGFja2FnZU5hbWUsIGl0ZW1JZClcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGFjdGlvbiA9PSAnc3RvcCcpIHtcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5zdG9wUGFja2FnZShwYWNrYWdlTmFtZSwgaXRlbUlkKVxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoYWN0aW9uID09ICdkaXNhYmxlJykge1xuICAgICAgICAgICAgICAgICAgICBzZWxmLmRpc2FibGVQYWNrYWdlKHBhY2thZ2VOYW1lLCBpdGVtSWQpXG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChhY3Rpb24gPT0gJ2VuYWJsZScpIHtcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5lbmFibGVQYWNrYWdlKHBhY2thZ2VOYW1lLCBpdGVtSWQpXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB3ZWJpeC5tZXNzYWdlKFwieW91IGhhdmUgdG8gc2VsZWN0IGEgcGFja2FnZVwiKVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgJCQoXCJhZGRfcGFja2FnZV9idXR0b25cIikuYXR0YWNoRXZlbnQoXCJvbkl0ZW1DbGlja1wiLCBmdW5jdGlvbiAoaWQpIHtcbiAgICAgICAgICAgIGxldCBwYWNha2dlTG9jYXRpb24gPSAkJChcInBhY2thZ2VfcGF0aFwiKS5nZXRWYWx1ZSgpXG4gICAgICAgICAgICBpZiAocGFjYWtnZUxvY2F0aW9uID09IFwiXCIpIHtcbiAgICAgICAgICAgICAgICBhbGVydChcInBsZWFzZSBlbnRlciBwYWNrYWdlIGxvY2F0aW9uXCIpXG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGxldCBwYWNrYWdlTWV0aG9kID0gJCQoXCJtZXRob2Rfc2VsZWN0b3JcIikuZ2V0VmFsdWUoKVxuICAgICAgICAgICAgICAgIGxldCBnaXRVcmwgPSBudWxsO1xuICAgICAgICAgICAgICAgIGxldCBwYXRoID0gbnVsbDtcbiAgICAgICAgICAgICAgICBpZiAocGFja2FnZU1ldGhvZCA9PSBcIkdpdHVybFwiKSB7XG4gICAgICAgICAgICAgICAgICAgIGdpdFVybCA9IHBhY2FrZ2VMb2NhdGlvblxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAocGFja2FnZU1ldGhvZCA9PSBcIlBhdGhcIikge1xuICAgICAgICAgICAgICAgICAgICBwYXRoID0gcGFjYWtnZUxvY2F0aW9uXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgYWxlcnQoXCJzb21ldGhpbmcgd2VudCB3cm9uZyBkdXJpbmcgc2VsZWN0aW5nIHRoZSBwYWNrYWdlIG1ldGhvZFwiKVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBzZWxmLmFkZFBhY2thZ2UocGF0aCwgZ2l0VXJsKVxuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICAkJChcInBhY2thZ2VzX2NtXCIpLmF0dGFjaEV2ZW50KFwib25NZW51SXRlbUNsaWNrXCIsIGZ1bmN0aW9uIChpZCkge1xuICAgICAgICAgICAgY2hlY2tBY3Rpb24oaWQsIHNlbGYucGFja2FnZVRhYmxlLmdldFNlbGVjdGVkSWQoKSk7XG4gICAgICAgIH0pO1xuXG5cbiAgICAgICAgd2ViaXguZXZlbnQoc2VsZi5wYWNrYWdlVGFibGUuJHZpZXcsIFwiY29udGV4dG1lbnVcIiwgZnVuY3Rpb24gKGUgLypNb3VzZUV2ZW50Ki8pIHtcbiAgICAgICAgICAgIGNvbnN0IHBvcyA9IHNlbGYucGFja2FnZVRhYmxlLmxvY2F0ZShlKTtcbiAgICAgICAgICAgIGlmIChwb3MpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBpdGVtID0gc2VsZi5wYWNrYWdlVGFibGUuZ2V0SXRlbShwb3Mucm93KTtcbiAgICAgICAgICAgICAgICBpZiggc2VsZi5fcmVxdWlyZWRwYWNrYWdlcy5pbmNsdWRlcyhpdGVtLm5hbWUpICl7XG4gICAgICAgICAgICAgICAgICAgIHdlYml4Lm1lc3NhZ2UoeyB0eXBlOiBcImVycm9yXCIsIHRleHQ6IGAke2l0ZW0ubmFtZX0gaXMgcmVxdWlyZWQgcGFja2FnZWAgfSk7XG4gICAgICAgICAgICAgICAgICAgIHJldHVyblxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBjb25zdCBhY3Rpb25zID0gWy4uLlBBQ0tBR0VfU1RBVEVTW2l0ZW0uc3RhdHVzXS5hY3Rpb25zLCAnZGVsZXRlJ107XG5cbiAgICAgICAgICAgICAgICBtZW51LmNsZWFyQWxsKCk7XG4gICAgICAgICAgICAgICAgbWVudS5wYXJzZShhY3Rpb25zKTtcbiAgICAgICAgICAgICAgICBtZW51LnNob3coZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gd2ViaXguaHRtbC5wcmV2ZW50RXZlbnQoZSk7XG4gICAgICAgIH0pXG5cbiAgICAgICAgc2VsZi5sb2FkUGFja2FnZXMoKTtcbiAgICB9XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zb3VyY2VzL3ZpZXdzL3BhY2thZ2VzL2luZGV4LmpzIiwiaW1wb3J0IHsgRXh0ZXJuYWxWaWV3IH0gZnJvbSBcIi4uL2V4dGVybmFsXCI7XG5cbmNvbnN0IFVSTCA9IFwiL3RocmVlZm9sZC9zZGtleGFtcGxlcy9ub3RlYm9vay9cIjtcbmNvbnN0IFJFUVVJUkVEX1BBQ0tBR0VTID0ge1xuICAgIFwidGhyZWVmb2xkLnNka2V4YW1wbGVzXCI6IFwiaHR0cHM6Ly9naXRodWIuY29tL3RocmVlZm9sZHRlY2gvanVtcHNjYWxlWF90aHJlZWJvdC90cmVlL2RldmVsb3BtZW50L1RocmVlQm90UGFja2FnZXMvdGhyZWVmb2xkL3Nka2V4YW1wbGVzXCJcbn1cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgSnVweXRlclZpZXcgZXh0ZW5kcyBFeHRlcm5hbFZpZXcge1xuICAgIGNvbnN0cnVjdG9yKGFwcCwgbmFtZSkge1xuICAgICAgICBzdXBlcihhcHAsIG5hbWUsIFVSTCwgUkVRVUlSRURfUEFDS0FHRVMpO1xuICAgIH1cbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NvdXJjZXMvdmlld3Mvc2RrZXhhbXBsZXMvaW5kZXguanMiLCJpbXBvcnQgeyBKZXRWaWV3IH0gZnJvbSBcIndlYml4LWpldFwiO1xuXG5cbmltcG9ydCBBZG1pbnNWaWV3IGZyb20gXCIuL2FkbWluc1wiO1xuaW1wb3J0IEdlbmVyYWxWaWV3IGZyb20gXCIuL2dlbmVyYWxcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU2V0dGluZ3NWaWV3IGV4dGVuZHMgSmV0VmlldyB7XG4gICAgY29uZmlnKCkge1xuICAgICAgICBjb25zdCB2aWV3ID0ge1xuICAgICAgICAgICAgdmlldzogXCJ0YWJ2aWV3XCIsXG4gICAgICAgICAgICBjZWxsczogW3tcbiAgICAgICAgICAgICAgICBoZWFkZXI6IFwiR2VuZXJhbFwiLFxuICAgICAgICAgICAgICAgIGJvZHk6IEdlbmVyYWxWaWV3LFxuICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIGhlYWRlcjogXCJBZG1pbmlzdHJhdG9yc1wiLFxuICAgICAgICAgICAgICAgIGJvZHk6IEFkbWluc1ZpZXdcbiAgICAgICAgICAgIH1dXG4gICAgICAgIH07XG5cbiAgICAgICAgcmV0dXJuIHZpZXc7XG4gICAgfVxuXG4gICAgaW5pdCh2aWV3KSB7XG4gICAgfVxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc291cmNlcy92aWV3cy9zZXR0aW5ncy9pbmRleC5qcyIsImltcG9ydCB7IEpldFZpZXcgfSBmcm9tIFwid2ViaXgtamV0XCI7XG5cbmltcG9ydCBXYWxsZXRGb3JtVmlldyBmcm9tIFwiLi93YWxsZXRGb3JtXCI7XG5pbXBvcnQgV2FsbGV0RGV0YWlsc1ZpZXcgZnJvbSBcIi4vd2FsbGV0RGV0YWlsc1wiO1xuaW1wb3J0IFdhbGxldEltcG9ydFZpZXcgZnJvbSAgXCIuL2ltcG9ydEZvcm1cIlxuaW1wb3J0IHsgd2FsbGV0IH0gZnJvbSBcIi4uLy4uL3NlcnZpY2VzL3dhbGxldFwiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBXYWxsZXRNYW5hZ2VyVmlldyBleHRlbmRzIEpldFZpZXcge1xuICAgIGNvbmZpZygpIHtcbiAgICAgICAgY29uc3Qgd2FsbGV0cyA9IHtcbiAgICAgICAgICAgIHZpZXc6IFwiZGF0YXRhYmxlXCIsXG4gICAgICAgICAgICBpZDogXCJ3YWxsZXRzX3RhYmxlXCIsXG4gICAgICAgICAgICByZXNpemVDb2x1bW46IHRydWUsXG4gICAgICAgICAgICBzZWxlY3Q6IHRydWUsXG4gICAgICAgICAgICBtdWx0aXNlbGVjdDogdHJ1ZSxcbiAgICAgICAgICAgIGNzczogXCJ3ZWJpeF9oZWFkZXJfYm9yZGVyIHdlYml4X2RhdGFfYm9yZGVyXCIsXG4gICAgICAgICAgICBzY3JvbGw6IHRydWUsXG4gICAgICAgICAgICBhdXRvQ29uZmlnOiB0cnVlLFxuICAgICAgICAgICAgY29sdW1uczogW3tcbiAgICAgICAgICAgICAgICBpZDogXCJpbmRleFwiLFxuICAgICAgICAgICAgICAgIGhlYWRlcjogXCIjXCIsXG4gICAgICAgICAgICAgICAgc29ydDogXCJpbnRcIixcbiAgICAgICAgICAgICAgICBhdXRvd2lkdGg6IHRydWUsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGlkOiBcIm5hbWVcIixcbiAgICAgICAgICAgICAgICBoZWFkZXI6IFtcIk5hbWVcIl0sXG4gICAgICAgICAgICAgICAgc29ydDogXCJzdHJpbmdcIixcbiAgICAgICAgICAgICAgICBhdXRvd2lkdGg6IHRydWUsXG4gICAgICAgICAgICAgICAgd2lkdGg6IDE0MFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBpZDogXCJhZGRyZXNzXCIsXG4gICAgICAgICAgICAgICAgaGVhZGVyOiBbXCJBZGRyZXNzXCJdLFxuICAgICAgICAgICAgICAgIHNvcnQ6IFwic3RyaW5nXCIsXG4gICAgICAgICAgICAgICAgYXV0b3dpZHRoOiB0cnVlLFxuICAgICAgICAgICAgICAgIHdpZHRoOiAnYXV0bydcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIF0sXG4gICAgICAgICAgICBzY2hlbWU6IHtcbiAgICAgICAgICAgICAgICAkaW5pdDogZnVuY3Rpb24gKG9iaikge1xuICAgICAgICAgICAgICAgICAgICBvYmouaW5kZXggPSB0aGlzLmNvdW50KCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuXG4gICAgICAgIGNvbnN0IHZpZXcgPSB7XG4gICAgICAgICAgICBjb2xzOiBbXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICB2aWV3OiBcInRlbXBsYXRlXCIsXG4gICAgICAgICAgICAgICAgICAgIHR5cGU6IFwiaGVhZGVyXCIsIHRlbXBsYXRlOiBcIldhbGxldHNcIixcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgdmlldzpcImJ1dHRvblwiLCBcbiAgICAgICAgICAgICAgICAgICAgaWQ6XCJidG5fY3JlYXRlXCIsIFxuICAgICAgICAgICAgICAgICAgICB2YWx1ZTpcIkNyZWF0ZSBXYWxsZXRcIiwgXG4gICAgICAgICAgICAgICAgICAgIGNzczpcIndlYml4X3NlY29uZGFyeVwiLCBcbiAgICAgICAgICAgICAgICAgICAgYXV0b3dpZHRoOnRydWUsXG4gICAgICAgICAgICAgICAgICAgIGNsaWNrOiBmdW5jdGlvbiAoKXtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuJHNjb3BlLldhbGxldEZvcm1WaWV3LnNob3dGb3JtKClcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICB2aWV3OlwiYnV0dG9uXCIsIFxuICAgICAgICAgICAgICAgICAgICBpZDpcImJ0bl9pbXBvcnRcIiwgXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlOlwiSW1wb3J0IFdhbGxldFwiLCBcbiAgICAgICAgICAgICAgICAgICAgY3NzOlwid2ViaXhfc2Vjb25kYXJ5XCIsIFxuICAgICAgICAgICAgICAgICAgICBhdXRvd2lkdGg6dHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgY2xpY2s6IGZ1bmN0aW9uICgpe1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy4kc2NvcGUuV2FsbGV0SW1wb3J0Vmlldy5zaG93Rm9ybSgpXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICBdXG4gICAgICAgIH07XG5cbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHJvd3M6IFtcbiAgICAgICAgICAgICAgICB2aWV3LFxuICAgICAgICAgICAgICAgIHdhbGxldHNcbiAgICAgICAgICAgIF1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIGluaXQodmlldykge1xuICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XG5cbiAgICAgICAgc2VsZi53YWxsZXRzX3RhYmxlID0gJCQoXCJ3YWxsZXRzX3RhYmxlXCIpO1xuICAgICAgICBzZWxmLldhbGxldERldGFpbHNWaWV3ID0gc2VsZi51aShXYWxsZXREZXRhaWxzVmlldylcbiAgICAgICAgc2VsZi5XYWxsZXRGb3JtVmlldyA9IHNlbGYudWkoV2FsbGV0Rm9ybVZpZXcpO1xuICAgICAgICBzZWxmLldhbGxldEltcG9ydFZpZXcgPSBzZWxmLnVpKFdhbGxldEltcG9ydFZpZXcpO1xuICAgICAgICBcbiAgICAgICAgc2VsZi53YWxsZXRzX3RhYmxlLmF0dGFjaEV2ZW50KFwib25JdGVtRGJsQ2xpY2tcIiwgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgd2ViaXguZXh0ZW5kKHNlbGYud2FsbGV0c190YWJsZSwgd2ViaXguUHJvZ3Jlc3NCYXIpO1xuICAgICAgICAgICAgc2VsZi53YWxsZXRzX3RhYmxlLnNob3dQcm9ncmVzcyh7XG4gICAgICAgICAgICAgICAgdHlwZTpcImljb25cIixcbiAgICAgICAgICAgICAgICBoaWRlOiBmYWxzZVxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIGxldCBpdGVtID0gc2VsZi53YWxsZXRzX3RhYmxlLmdldFNlbGVjdGVkSXRlbSgpXG4gICAgICAgICAgICB3YWxsZXQubWFuYWdlV2FsbGV0KGl0ZW0ubmFtZSkudGhlbihkYXRhID0+IHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhkYXRhLmpzb24oKSlcbiAgICAgICAgICAgICAgICBsZXQgcmVzID0gZGF0YS5qc29uKClcbiAgICAgICAgICAgICAgICB2YXIgaW5mbyA9IHtcbiAgICAgICAgICAgICAgICAgICAgJ25hbWUnOiBpdGVtLm5hbWUsXG4gICAgICAgICAgICAgICAgICAgICdhZGRyZXNzJzogcmVzLmFkZHJlc3MsXG4gICAgICAgICAgICAgICAgICAgICdzZWNyZXQnOiByZXMuc2VjcmV0LFxuICAgICAgICAgICAgICAgICAgICAnYmFsYW5jZXMnOiByZXMuYmFsYW5jZXNcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgc2VsZi53YWxsZXRzX3RhYmxlLnNob3dQcm9ncmVzcyh7aGlkZTogdHJ1ZX0pO1xuICAgICAgICAgICAgICAgIHNlbGYuV2FsbGV0RGV0YWlsc1ZpZXcuc2hvd0luZm8oaW5mbylcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICB1cmxDaGFuZ2UodmlldywgdXJsKSB7XG4gICAgICAgIHZhciBzZWxmID0gdGhpcztcbiAgICBcbiAgICAgICAgc2VsZi53YWxsZXRzX3RhYmxlID0gICQkKFwid2FsbGV0c190YWJsZVwiKTtcbiAgICAgICAgd2FsbGV0LmdldFdhbGxldHMoKS50aGVuKGRhdGEgPT4ge1xuICAgICAgICAgICAgY29uc29sZS5sb2coZGF0YS5qc29uKCkpXG4gICAgICAgICAgICBzZWxmLndhbGxldHNfdGFibGUucGFyc2UoZGF0YS5qc29uKCkpXG4gICAgICAgIH0pO1xuICAgIH1cbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NvdXJjZXMvdmlld3Mvd2FsbGV0c01hbmFnZXIvaW5kZXguanMiLCJpbXBvcnQgeyBKZXRWaWV3IH0gZnJvbSBcIndlYml4LWpldFwiO1xuaW1wb3J0IHsgcGFja2FnZXMgfSBmcm9tIFwiLi4vLi4vc2VydmljZXMvd2lraVwiO1xuXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFdpa2lzVmlldyBleHRlbmRzIEpldFZpZXcge1xuICAgIGNvbmZpZygpIHtcbiAgICAgICAgY29uc3QgdmlldyA9IHtcbiAgICAgICAgICAgIHZpZXc6IFwiZGF0YXRhYmxlXCIsXG4gICAgICAgICAgICBpZDogXCJ3aWtpc190YWJsZVwiLFxuICAgICAgICAgICAgcmVzaXplQ29sdW1uOiB0cnVlLFxuICAgICAgICAgICAgc2VsZWN0OiB0cnVlLFxuICAgICAgICAgICAgbXVsdGlzZWxlY3Q6IHRydWUsXG4gICAgICAgICAgICBjc3M6IFwid2ViaXhfaGVhZGVyX2JvcmRlciB3ZWJpeF9kYXRhX2JvcmRlclwiLFxuICAgICAgICAgICAgY29sdW1uczogW3tcbiAgICAgICAgICAgICAgICBpZDogXCJpbmRleFwiLFxuICAgICAgICAgICAgICAgIGhlYWRlcjogXCIjXCIsXG4gICAgICAgICAgICAgICAgc29ydDogXCJpbnRcIixcbiAgICAgICAgICAgICAgICBhdXRvd2lkdGg6IHRydWUsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGlkOiBcIm5hbWVcIixcbiAgICAgICAgICAgICAgICBoZWFkZXI6IFwiUGFja2FnZVwiLFxuICAgICAgICAgICAgICAgIHNvcnQ6IFwic3RyaW5nXCIsXG4gICAgICAgICAgICAgICAgd2lkdGg6IDMwMFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBpZDogXCJhY3Rpb25zXCIsXG4gICAgICAgICAgICAgICAgaGVhZGVyOiBcIkFjdGlvbnNcIixcbiAgICAgICAgICAgICAgICBzb3J0OiBcInN0cmluZ1wiLFxuICAgICAgICAgICAgICAgIHdpZHRoOiAyMDAsXG4gICAgICAgICAgICAgICAgdGVtcGxhdGU6ZnVuY3Rpb24ob2JqKXsgXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBcIjxkaXYgY2xhc3M9J3dlYml4X2VsX2J1dHRvbic+PGJ1dHRvbiBjbGFzcz0nYnRuX3ZpZXcnPiBWaWV3IDwvYnV0dG9uPjwvZGl2PlwiO1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB9XSxcbiAgICAgICAgICAgIG9uQ2xpY2s6e1xuICAgICAgICAgICAgICAgIGJ0bl92aWV3OmZ1bmN0aW9uKGV2LCBpZCl7XG4gICAgICAgICAgICAgICAgICAgIHZhciBpdGVtID0gdGhpcy5nZXRJdGVtKGlkKTtcbiAgICAgICAgICAgICAgICAgICAgd2luZG93LmxvY2F0aW9uLmhyZWYgPSBgL2FkbWluLyMhL21haW4vd2lraXMudmlldz9uYW1lPSR7aXRlbS5uYW1lfWBcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBhdXRvQ29uZmlnOiB0cnVlLFxuICAgICAgICAgICAgc2NoZW1lOiB7XG4gICAgICAgICAgICAgICAgJGluaXQ6IGZ1bmN0aW9uIChvYmopIHtcbiAgICAgICAgICAgICAgICAgICAgb2JqLmluZGV4ID0gdGhpcy5jb3VudCgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgIH07XG5cbiAgICAgICAgcmV0dXJuIHZpZXc7XG4gICAgfVxuXG4gICAgaW5pdCh2aWV3KSB7XG4gICAgICAgIHBhY2thZ2VzLmxpc3QoKS50aGVuKGRhdGEgPT4ge1xuICAgICAgICAgICAgdmlldy5wYXJzZShkYXRhLmpzb24oKSlcbiAgICAgICAgfSk7XG4gICAgfVxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc291cmNlcy92aWV3cy93aWtpcy9pbmRleC5qcyIsImltcG9ydCB7IEpldFZpZXcgfSBmcm9tIFwid2ViaXgtamV0XCI7XG5cbmltcG9ydCB7IGFuc2lVcCB9IGZyb20gXCIuLi8uLi9jb21tb24vY29sb3JzXCI7XG5pbXBvcnQgeyBMRVZFTFMsIFNUQVRFUywgVFlQRVMgfSBmcm9tIFwiLi9kYXRhXCI7XG5pbXBvcnQgeyBkYXRlRm9ybWF0dGVyIH0gZnJvbSBcIi4uLy4uL2NvbW1vbi9mb3JtYXR0ZXJzXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEFsZXJ0VmlldyBleHRlbmRzIEpldFZpZXcge1xuICAgIGNvbmZpZygpIHtcbiAgICAgICAgY29uc3QgaW5mbyA9IHtcbiAgICAgICAgICAgIHZpZXc6IFwiZm9ybVwiLFxuICAgICAgICAgICAgaWQ6IFwiZm9ybVwiLFxuICAgICAgICAgICAgZWxlbWVudHNDb25maWc6IHsgbGFiZWxXaWR0aDogMTQwIH0sXG4gICAgICAgICAgICBlbGVtZW50czogW1xuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgdmlldzogXCJ0ZXh0XCIsXG4gICAgICAgICAgICAgICAgICAgIGxhYmVsOiBcIklEXCIsXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiaWRlbnRpZmllclwiLFxuICAgICAgICAgICAgICAgICAgICByZWFkb25seTogdHJ1ZVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICB2aWV3OiBcInRleHRcIixcbiAgICAgICAgICAgICAgICAgICAgbGFiZWw6IFwiVHlwZVwiLFxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImFsZXJ0X3R5cGVcIixcbiAgICAgICAgICAgICAgICAgICAgcmVhZG9ubHk6IHRydWVcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgdmlldzogXCJ0ZXh0XCIsXG4gICAgICAgICAgICAgICAgICAgIGxhYmVsOiBcIlN0YXR1c1wiLFxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcInN0YXR1c1wiLFxuICAgICAgICAgICAgICAgICAgICByZWFkb25seTogdHJ1ZVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICB2aWV3OiBcInRleHRcIixcbiAgICAgICAgICAgICAgICAgICAgbGFiZWw6IFwiTGV2ZWxcIixcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJsZXZlbFwiLFxuICAgICAgICAgICAgICAgICAgICByZWFkb25seTogdHJ1ZVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICB2aWV3OiBcInRleHRcIixcbiAgICAgICAgICAgICAgICAgICAgbGFiZWw6IFwiQ291bnRcIixcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJjb3VudFwiLFxuICAgICAgICAgICAgICAgICAgICByZWFkb25seTogdHJ1ZVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICB2aWV3OiBcInRleHRcIixcbiAgICAgICAgICAgICAgICAgICAgbGFiZWw6IFwiQ2F0ZWdvcnlcIixcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJjYXRcIixcbiAgICAgICAgICAgICAgICAgICAgcmVhZG9ubHk6IHRydWVcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgdmlldzogXCJ0ZXh0XCIsXG4gICAgICAgICAgICAgICAgICAgIGxhYmVsOiBcIkZpcnN0IHRpbWVcIixcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJ0aW1lX2ZpcnN0XCIsXG4gICAgICAgICAgICAgICAgICAgIHJlYWRvbmx5OiB0cnVlXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIHZpZXc6IFwidGV4dFwiLFxuICAgICAgICAgICAgICAgICAgICBsYWJlbDogXCJMYXN0IHRpbWVcIixcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJ0aW1lX2xhc3RcIixcbiAgICAgICAgICAgICAgICAgICAgcmVhZG9ubHk6IHRydWVcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgdmlldzogXCJ0ZXh0XCIsXG4gICAgICAgICAgICAgICAgICAgIGxhYmVsOiBcIk1lc3NhZ2UgKHB1YilcIixcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJwdWJsaWNcIixcbiAgICAgICAgICAgICAgICAgICAgcmVhZG9ubHk6IHRydWUsXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIF1cbiAgICAgICAgfTtcblxuICAgICAgICBjb25zdCB0YWIgPSB7XG4gICAgICAgICAgICB2aWV3OiBcInRhYnZpZXdcIixcbiAgICAgICAgICAgIGNlbGxzOiBbXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBoZWFkZXI6IFwiSW5mb3JtYXRpb25cIixcbiAgICAgICAgICAgICAgICAgICAgYm9keTogaW5mbyxcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgaGVhZGVyOiBcIk1lc3NhZ2VcIixcbiAgICAgICAgICAgICAgICAgICAgYm9keToge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWQ6IFwibWVzc2FnZVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgdmlldzogXCJ0ZW1wbGF0ZVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgdGVtcGxhdGU6IFwiXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBzY3JvbGw6IFwiYXV0b1wiLFxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIGhlYWRlcjogXCJUcmFjZWJhY2tzXCIsXG4gICAgICAgICAgICAgICAgICAgIGJvZHk6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJvd3M6IFtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZpZXc6IFwidGFiYmFyXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlkOiBcInRiX3RhYnNcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbXVsdGl2aWV3OiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvcHRpb25zOiBbXVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2aWV3OiBcIm11bHRpdmlld1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZDogXCJ0Yl92aWV3c1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjZWxsczogW1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRlbXBsYXRlOiBcIlwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgaWQ6IFwibG9nc1wiLFxuICAgICAgICAgICAgICAgICAgICB2aWV3OiBcImRhdGF0YWJsZVwiLFxuICAgICAgICAgICAgICAgICAgICByZXNpemVDb2x1bW46IHRydWUsXG4gICAgICAgICAgICAgICAgICAgIHNlbGVjdDogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgbXVsdGlzZWxlY3Q6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgIGNzczogXCJ3ZWJpeF9oZWFkZXJfYm9yZGVyIHdlYml4X2RhdGFfYm9yZGVyXCIsXG4gICAgICAgICAgICAgICAgICAgIHNjcm9sbDogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgYXV0b0NvbmZpZzogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgY29sdW1uczogW1xuICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlkOiBcImluZGV4XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaGVhZGVyOiBcIiNcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzb3J0OiBcImludFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGF1dG93aWR0aDogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aWR0aDogNjBcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWQ6IFwidGhyZWVib3RfbmFtZVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhlYWRlcjogXCJUaHJlZWJvdCBOYW1lXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc29ydDogXCJzdHJpbmdcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aWR0aDogMTgwXG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlkOiBcImFwcF9uYW1lXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaGVhZGVyOiBcIkFwcCBOYW1lXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc29ydDogXCJzdHJpbmdcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aWR0aDogMTgwXG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlkOiBcImxhdGVzdF9sb2dpZFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhlYWRlcjogXCJMYXRlc3QgTG9nI1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNvcnQ6IFwiaW50XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDE4MFxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgICAgICBzY2hlbWU6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICRpbml0OiBmdW5jdGlvbiAob2JqKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb2JqLmluZGV4ID0gdGhpcy5jb3VudCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIF1cbiAgICAgICAgfTtcblxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgdmlldzogXCJ3aW5kb3dcIixcbiAgICAgICAgICAgIGhlYWQ6IFwiQWxlcnRcIixcbiAgICAgICAgICAgIG1vZGFsOiB0cnVlLFxuICAgICAgICAgICAgd2lkdGg6IDYwMCxcbiAgICAgICAgICAgIGhlaWdodDogODAwLFxuICAgICAgICAgICAgcG9zaXRpb246IFwiY2VudGVyXCIsXG4gICAgICAgICAgICBib2R5OiB7XG4gICAgICAgICAgICAgICAgcm93czogW1xuICAgICAgICAgICAgICAgICAgICB0YWIsXG4gICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZpZXc6IFwiYnV0dG9uXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZTogXCJPS1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgY3NzOiBcIndlYml4X3ByaW1hcnlcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIGNsaWNrOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5nZXRUb3BQYXJlbnRWaWV3KCkuaGlkZSgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG5cbiAgICBpbml0KCkge1xuICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgICAgIHRoaXMuZm9ybSA9ICQkKFwiZm9ybVwiKTtcbiAgICAgICAgdGhpcy5tZXNzYWdlID0gJCQoXCJtZXNzYWdlXCIpO1xuICAgICAgICB0aGlzLmxvZ3MgPSAkJChcImxvZ3NcIik7XG5cbiAgICAgICAgdGhpcy50YlZpZXdzID0gJCQoXCJ0Yl92aWV3c1wiKTtcbiAgICAgICAgdGhpcy50YlRhYnMgPSAkJChcInRiX3RhYnNcIik7XG5cbiAgICAgICAgdGhpcy5sb2dzLmF0dGFjaEV2ZW50KFwib25JdGVtRGJsQ2xpY2tcIiwgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgbGV0IGxvZ0RhdGEgPSBzZWxmLmxvZ3MuZ2V0U2VsZWN0ZWRJdGVtKClcbiAgICAgICAgICAgIHRoaXMuJHNjb3BlLnNob3coYC9tYWluL2xvZ3M/YXBwbmFtZT0ke2xvZ0RhdGEuYXBwX25hbWV9JmxvZ2lkPSR7bG9nRGF0YS5sYXRlc3RfbG9naWR9YClcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgYWRkVHJhY2ViYWNrKHRiKSB7XG4gICAgICAgIGNvbnN0IHRiSWQgPSBgJHt0Yi50aHJlZWJvdF9uYW1lfV8ke3RiLnByb2Nlc3NfaWR9YDtcbiAgICAgICAgY29uc3QgdGJUaXRsZSA9IGAke3RiLnRocmVlYm90X25hbWV9IC0gUElEOiAoJHt0Yi5wcm9jZXNzX2lkfSlgO1xuXG4gICAgICAgIHRoaXMudGJWaWV3cy5hZGRWaWV3KHtcbiAgICAgICAgICAgIHZpZXc6IFwidGVtcGxhdGVcIixcbiAgICAgICAgICAgIGlkOiB0YklkLFxuICAgICAgICAgICAgc2Nyb2xsOiBcInh5XCIsXG4gICAgICAgICAgICB0ZW1wbGF0ZTogYDxwPiR7YW5zaVVwLmFuc2lfdG9faHRtbCh0Yi5mb3JtYXR0ZWQpfTwvcD5gXG4gICAgICAgIH0pO1xuXG4gICAgICAgIHRoaXMudGJUYWJzLmFkZE9wdGlvbih0YklkLCB0YlRpdGxlLCB0cnVlKTtcbiAgICB9XG5cbiAgICBjbGVhclRyYWNlQmFja3MoKSB7XG4gICAgICAgIGxldCBpZCA9IHRoaXMudGJUYWJzLmdldFZhbHVlKCk7XG5cbiAgICAgICAgd2hpbGUgKGlkKSB7XG4gICAgICAgICAgICB0aGlzLnRiVGFicy5yZW1vdmVPcHRpb24oaWQpO1xuICAgICAgICAgICAgdGhpcy50YlZpZXdzLnJlbW92ZVZpZXcoaWQpO1xuXG4gICAgICAgICAgICBpZCA9IHRoaXMudGJUYWJzLmdldFZhbHVlKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBzaG93Rm9yKGl0ZW0pIHtcbiAgICAgICAgbGV0IHZhbHVlcyA9IE9iamVjdC5hc3NpZ24oe30sIGl0ZW0pO1xuXG4gICAgICAgIHZhbHVlcy5hbGVydF90eXBlID0gVFlQRVNbaXRlbS5hbGVydF90eXBlXTtcbiAgICAgICAgdmFsdWVzLnN0YXR1cyA9IFNUQVRFU1tpdGVtLnN0YXR1c107XG4gICAgICAgIHZhbHVlcy5sZXZlbCA9IExFVkVMU1tpdGVtLmxldmVsXTtcbiAgICAgICAgdmFsdWVzLnRpbWVfZmlyc3QgPSBkYXRlRm9ybWF0dGVyKGl0ZW0udGltZV9maXJzdCk7XG4gICAgICAgIHZhbHVlcy50aW1lX2xhc3QgPSBkYXRlRm9ybWF0dGVyKGl0ZW0udGltZV9sYXN0KTtcbiAgICAgICAgdGhpcy5mb3JtLnNldFZhbHVlcyh2YWx1ZXMpO1xuXG4gICAgICAgIHRoaXMubWVzc2FnZS5zZXRIVE1MKGA8cD4ke2Fuc2lVcC5hbnNpX3RvX2h0bWwoaXRlbS5tZXNzYWdlKX08L3A+YCk7XG5cbiAgICAgICAgdGhpcy5jbGVhclRyYWNlQmFja3MoKTtcblxuICAgICAgICBmb3IgKGxldCB0YiBvZiBpdGVtLnRyYWNlYmFja3MpIHtcbiAgICAgICAgICAgIHRoaXMuYWRkVHJhY2ViYWNrKHRiKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMubG9ncy5jbGVhckFsbCgpXG4gICAgICAgIHRoaXMubG9ncy5wYXJzZShpdGVtLmxvZ3MpO1xuXG4gICAgICAgIHRoaXMuZ2V0Um9vdCgpLnNob3coKTtcbiAgICB9XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zb3VyY2VzL3ZpZXdzL2FsZXJ0cy9hbGVydC5qcyIsImltcG9ydCB7IFNlcnZpY2UgfSBmcm9tIFwiLi4vY29tbW9uL2FwaVwiO1xuXG5jb25zdCBCQVNFX1VSTCA9IFwiL3plcm9ib3QvYWRtaW4vYWN0b3JzL2FkbWluXCI7XG5cbmNsYXNzIEFkbWluU2VydmljZSBleHRlbmRzIFNlcnZpY2Uge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICBzdXBlcihCQVNFX1VSTCk7XG4gICAgfVxuXG4gICAgbGlzdCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0Q2FsbChcImFkbWluX2xpc3RcIik7XG4gICAgfVxuXG5cbiAgICBhZGQobmFtZSkge1xuICAgICAgICByZXR1cm4gdGhpcy5wb3N0Q2FsbChcImFkbWluX2FkZFwiLCB7XG4gICAgICAgICAgICBcIm5hbWVcIjogbmFtZVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBkZWxldGUobmFtZSkge1xuICAgICAgICByZXR1cm4gdGhpcy5wb3N0Q2FsbChcImFkbWluX2RlbGV0ZVwiLCB7XG4gICAgICAgICAgICBcIm5hbWVcIjogbmFtZVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBnZXRfZXhwbG9yZXIoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmdldENhbGwoJ2dldF9leHBsb3JlcicpO1xuICAgIH1cblxuICAgIHNldF9leHBsb3Jlcih0eXBlKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnBvc3RDYWxsKCdzZXRfZXhwbG9yZXInLCB7XG4gICAgICAgICAgICBleHBsb3Jlcl90eXBlOiB0eXBlXG4gICAgICAgIH0pXG4gICAgfVxufVxuXG5leHBvcnQgY29uc3QgYWRtaW4gPSBuZXcgQWRtaW5TZXJ2aWNlKCk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zb3VyY2VzL3NlcnZpY2VzL2FkbWluLmpzIiwiaW1wb3J0IHsgU2VydmljZSB9IGZyb20gXCIuLi9jb21tb24vYXBpXCI7XG5cbmNvbnN0IEJBU0VfVVJMID0gXCIvdGZncmlkL3RhaWdhL2FjdG9ycy90YWlnYVwiO1xuXG5cbmNsYXNzIFRhaWdhU2VydmljZSBleHRlbmRzIFNlcnZpY2Uge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICBzdXBlcihCQVNFX1VSTCk7XG4gICAgfVxuXG4gICAgdXNlckNpcmNsZXModXNlcm5hbWUpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucG9zdENhbGwoXCJnZXRfdXNlcl9jaXJjbGVzXCIsIHsgdXNlcm5hbWU6IHVzZXJuYW1lLCBvdXRwdXRfdHlwZTogXCJqc29uXCIgfSk7XG4gICAgfVxuXG4gICAgdXNlclN0b3JpZXModXNlcm5hbWUpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucG9zdENhbGwoXCJnZXRfdXNlcl9zdG9yaWVzXCIsIHsgdXNlcm5hbWU6IHVzZXJuYW1lLCBvdXRwdXRfdHlwZTogXCJqc29uXCIgfSk7XG4gICAgfVxuXG4gICAgdXNlclRhc2tzKHVzZXJuYW1lKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnBvc3RDYWxsKFwiZ2V0X3VzZXJfdGFza3NcIiwgeyB1c2VybmFtZTogdXNlcm5hbWUsIG91dHB1dF90eXBlOiBcImpzb25cIiB9KTtcbiAgICB9XG5cbn1cblxuXG5leHBvcnQgY29uc3QgdGFpZ2EgPSBuZXcgVGFpZ2FTZXJ2aWNlKCk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zb3VyY2VzL3NlcnZpY2VzL3RhaWdhLmpzIiwiaW1wb3J0IHtcbiAgICBKZXRWaWV3XG59IGZyb20gXCJ3ZWJpeC1qZXRcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUHJvY2Vzc2VzQ2hpbGRWaWV3IGV4dGVuZHMgSmV0VmlldyB7XG5cbiAgICBjb25maWcoKSB7XG4gICAgICAgIGNvbnN0IHZpZXcgPSB7XG4gICAgICAgICAgICB2aWV3OiBcImRhdGF0YWJsZVwiLFxuICAgICAgICAgICAgaWQ6IFwicHJvY2Vzc190YWJsZVwiLFxuICAgICAgICAgICAgcmVzaXplQ29sdW1uOiB0cnVlLFxuICAgICAgICAgICAgc2VsZWN0OiB0cnVlLFxuICAgICAgICAgICAgbXVsdGlzZWxlY3Q6IHRydWUsXG4gICAgICAgICAgICBjc3M6IFwid2ViaXhfaGVhZGVyX2JvcmRlciB3ZWJpeF9kYXRhX2JvcmRlclwiLFxuICAgICAgICAgICAgc2Nyb2xsOiB0cnVlLFxuICAgICAgICAgICAgYXV0b0NvbmZpZzogdHJ1ZSxcbiAgICAgICAgICAgIGNvbHVtbnM6IFt7XG4gICAgICAgICAgICAgICAgICAgIGlkOiBcImluZGV4XCIsXG4gICAgICAgICAgICAgICAgICAgIGhlYWRlcjogXCIjXCIsXG4gICAgICAgICAgICAgICAgICAgIHNvcnQ6IFwiaW50XCIsXG4gICAgICAgICAgICAgICAgICAgIGF1dG93aWR0aDogdHJ1ZSxcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgaWQ6IFwibmFtZVwiLFxuICAgICAgICAgICAgICAgICAgICBoZWFkZXI6IFtcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiUHJvY2Nlc3NcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb250ZW50OiBcInRleHRGaWx0ZXJcIlxuICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICAgICAgc29ydDogXCJzdHJpbmdcIixcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgaWQ6IFwicGlkXCIsXG4gICAgICAgICAgICAgICAgICAgIGhlYWRlcjogXCJQSURcIixcbiAgICAgICAgICAgICAgICAgICAgc29ydDogXCJpbnRcIlxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBpZDogXCJ1c2VybmFtZVwiLFxuICAgICAgICAgICAgICAgICAgICBoZWFkZXI6IFwiVXNlcm5hbWVcIixcbiAgICAgICAgICAgICAgICAgICAgc29ydDogXCJzdHJpbmdcIlxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBpZDogXCJyc3NcIixcbiAgICAgICAgICAgICAgICAgICAgaGVhZGVyOiBcIk1lbW9yeSBVc2FnZVwiLFxuICAgICAgICAgICAgICAgICAgICBzb3J0OiBcImludFwiLFxuICAgICAgICAgICAgICAgICAgICBmb3JtYXQ6IGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIE1hdGguY2VpbCh2YWx1ZSlcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBdLFxuICAgICAgICAgICAgc2NoZW1lOiB7XG4gICAgICAgICAgICAgICAgJGluaXQ6IGZ1bmN0aW9uIChvYmopIHtcbiAgICAgICAgICAgICAgICAgICAgb2JqLmluZGV4ID0gdGhpcy5jb3VudCgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgdmlldzogXCJ3aW5kb3dcIixcbiAgICAgICAgICAgIGhlYWQ6IFwiUnVubmluZyBQcm9jZXNzZXMsIE1lbW9yeSB1c2FnZSBpbiBNQlwiLFxuICAgICAgICAgICAgbW9kYWw6IHRydWUsXG4gICAgICAgICAgICB3aWR0aDogNTUwLFxuICAgICAgICAgICAgaGVpZ2h0OiA2MDAsXG4gICAgICAgICAgICBwb3NpdGlvbjogXCJjZW50ZXJcIixcbiAgICAgICAgICAgIGJvZHk6IHtcbiAgICAgICAgICAgICAgICByb3dzOiBbXG4gICAgICAgICAgICAgICAgICAgIHZpZXcsXG4gICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZpZXc6IFwiYnV0dG9uXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZTogXCJPS1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgY3NzOiBcIndlYml4X3ByaW1hcnlcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIGNsaWNrOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5nZXRUb3BQYXJlbnRWaWV3KCkuaGlkZSgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgfVxuXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBzaG93Rm9yKGRhdGEpIHtcbiAgICAgICAgdGhpcy50YWJsZS5wYXJzZShkYXRhKVxuICAgICAgICB0aGlzLmdldFJvb3QoKS5zaG93KCk7XG4gICAgfVxuXG4gICAgaW5pdCgpIHtcbiAgICAgICAgdGhpcy50YWJsZSA9ICQkKFwicHJvY2Vzc190YWJsZVwiKTtcbiAgICB9XG59XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc291cmNlcy92aWV3cy9kYXNoL3Byb2Nlc3Nlc0NoaWxkVmlldy5qcyIsImltcG9ydCB7IEpldFZpZXcgfSBmcm9tIFwid2ViaXgtamV0XCI7XG5cbmltcG9ydCB7IGFuc2lVcCB9IGZyb20gXCIuLi8uLi9jb21tb24vY29sb3JzXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFJlc2VydmF0aW9uVmlldyBleHRlbmRzIEpldFZpZXcge1xuICAgIGNvbmZpZygpIHtcbiAgICAgICAgY29uc3QgaW5mbyA9IHtcbiAgICAgICAgICAgIHZpZXc6IFwiZm9ybVwiLFxuICAgICAgICAgICAgaWQ6IFwiZm9ybVwiLFxuICAgICAgICAgICAgZWxlbWVudHNDb25maWc6IHsgbGFiZWxXaWR0aDogMTQwIH0sXG4gICAgICAgICAgICBlbGVtZW50czogW1xuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgdmlldzogXCJ0ZXh0XCIsXG4gICAgICAgICAgICAgICAgICAgIGxhYmVsOiBcIklEXCIsXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiaWRcIixcbiAgICAgICAgICAgICAgICAgICAgcmVhZG9ubHk6IHRydWVcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgdmlldzogXCJ0ZXh0XCIsXG4gICAgICAgICAgICAgICAgICAgIGxhYmVsOiBcIkN1c3RvbWVyIHRpZFwiLFxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImN1c3RvbWVyX3RpZFwiLFxuICAgICAgICAgICAgICAgICAgICByZWFkb25seTogdHJ1ZVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICB2aWV3OiBcInRleHRcIixcbiAgICAgICAgICAgICAgICAgICAgbGFiZWw6IFwiTmV4dCBhY3Rpb25cIixcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJuZXh0X2FjdGlvblwiLFxuICAgICAgICAgICAgICAgICAgICByZWFkb25seTogdHJ1ZVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICB2aWV3OiBcInRleHRcIixcbiAgICAgICAgICAgICAgICAgICAgbGFiZWw6IFwiZXhwaXJhdGlvblwiLFxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImV4cGlyYXRpb25cIixcbiAgICAgICAgICAgICAgICAgICAgcmVhZG9ubHk6IHRydWVcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICBdXG4gICAgICAgIH07XG5cbiAgICAgICAgY29uc3QgdGFiID0ge1xuICAgICAgICAgICAgdmlldzogXCJ0YWJ2aWV3XCIsXG4gICAgICAgICAgICBpZDogXCJ0YWJ2aWV3XCIsXG4gICAgICAgICAgICBjZWxsczogW1xuICAgICAgICAgICAgICAgIHtcblxuICAgICAgICAgICAgICAgICAgICBoZWFkZXI6IFwiT3ZlcnZpZXdcIixcbiAgICAgICAgICAgICAgICAgICAgcm93czogW1xuICAgICAgICAgICAgICAgICAgICAgICAgaW5mbyxcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2aWV3OiBcImxpc3RcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsYWJlbDogXCJGb3JtIGlucHV0c1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiRm9ybSBpbnB1dHNcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXRhOiBbeyBcInRpdGxlXCI6IFwiRm9ybSBpbnB1dHNcIiB9XSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0ZW1wbGF0ZTogXCI8Yj4gI3RpdGxlIyA8Yj5cIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhdXRvaGVpZ2h0OiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlYWRvbmx5OiB0cnVlXG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlkOiBcImZvcm1JbmZvXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmlldzogXCJsaXN0XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGVtcGxhdGU6IFwiPGI+I2tleSMgPC9iPiAgOiAgICN2YWx1ZSNcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzY3JvbGw6IFwiYXV0b1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBdXG5cblxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBpZDogXCJuZXR3b3Jrc1wiLFxuICAgICAgICAgICAgICAgICAgICBoZWFkZXI6IFwiTmV0d29ya3NcIixcbiAgICAgICAgICAgICAgICAgICAgdmlldzogXCJkYXRhdGFibGVcIixcbiAgICAgICAgICAgICAgICAgICAgcmVzaXplQ29sdW1uOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICBzZWxlY3Q6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgIG11bHRpc2VsZWN0OiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICBjc3M6IFwid2ViaXhfaGVhZGVyX2JvcmRlciB3ZWJpeF9kYXRhX2JvcmRlclwiLFxuICAgICAgICAgICAgICAgICAgICBzY3JvbGw6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgIGF1dG9Db25maWc6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgIGNvbHVtbnM6IFtcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZDogXCJpbmRleFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhlYWRlcjogXCIjXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc29ydDogXCJpbnRcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhdXRvd2lkdGg6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDYwXG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlkOiBcIm5ldHdvcmtfbmFtZVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhlYWRlcjogXCJOYW1lXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc29ydDogXCJzdHJpbmdcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aWR0aDogMTgwXG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlkOiBcImlwX3JhbmdlXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaGVhZGVyOiBcIklwIHJhbmdlXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc29ydDogXCJzdHJpbmdcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aWR0aDogMTgwXG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlkOiBcImZhcm1lcl90aWRcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBoZWFkZXI6IFwiRmFybWVyXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc29ydDogXCJzdHJpbmdcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aWR0aDogMTgwXG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgICAgIHNjaGVtZToge1xuICAgICAgICAgICAgICAgICAgICAgICAgJGluaXQ6IGZ1bmN0aW9uIChvYmopIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvYmoubmV0d29ya19uYW1lID0gb2JqLm5hbWU7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb2JqLmlwX3JhbmdlID0gb2JqLmlwcmFuZ2U7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb2JqLmZhcm1lcl90aWQgPSBvYmouZmFybWVyX3RpZDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvYmouaW5kZXggPSB0aGlzLmNvdW50KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0sIG9uOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBvbkFmdGVyTG9hZDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICghdGhpcy5jb3VudCgpKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNob3dPdmVybGF5KFwiTm8gbmV0d29ya3MgaW4gcmVzZXJ2YXRpb25cIik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmhpZGVPdmVybGF5KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgaWQ6IFwiY29udGFpbmVyc1wiLFxuICAgICAgICAgICAgICAgICAgICBoZWFkZXI6IFwiQ29udGFpbmVyc1wiLFxuICAgICAgICAgICAgICAgICAgICB2aWV3OiBcImRhdGF0YWJsZVwiLFxuICAgICAgICAgICAgICAgICAgICByZXNpemVDb2x1bW46IHRydWUsXG4gICAgICAgICAgICAgICAgICAgIHNlbGVjdDogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgbXVsdGlzZWxlY3Q6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgIGNzczogXCJ3ZWJpeF9oZWFkZXJfYm9yZGVyIHdlYml4X2RhdGFfYm9yZGVyXCIsXG4gICAgICAgICAgICAgICAgICAgIHNjcm9sbDogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgYXV0b0NvbmZpZzogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgY29sdW1uczogW1xuICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlkOiBcImluZGV4XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaGVhZGVyOiBcIiNcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzb3J0OiBcImludFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGF1dG93aWR0aDogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aWR0aDogNjBcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZDogXCJub2RlX2lkXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaGVhZGVyOiBcIk5vZGUgaWRcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzb3J0OiBcInN0cmluZ1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGF1dG93aWR0aDogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aWR0aDogMTgwXG4gICAgICAgICAgICAgICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWQ6IFwiZmxpc3RcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBoZWFkZXI6IFwiRmxpc3RcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzb3J0OiBcInN0cmluZ1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGF1dG93aWR0aDogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aWR0aDogMTgwXG4gICAgICAgICAgICAgICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWQ6IFwiZW50cnlwb2ludFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhlYWRlcjogXCJFbnRyeXBvaW50XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc29ydDogXCJzdHJpbmdcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhdXRvd2lkdGg6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDE4MFxuICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZDogXCJodWJfdXJsXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaGVhZGVyOiBcIkh1YiB1cmxcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzb3J0OiBcInN0cmluZ1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGF1dG93aWR0aDogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aWR0aDogMTgwXG4gICAgICAgICAgICAgICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWQ6IFwiaW50ZXJhY3RpdmVcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBoZWFkZXI6IFwiSW50ZXJhY3RpdmVcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzb3J0OiBcInN0cmluZ1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGF1dG93aWR0aDogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aWR0aDogMTgwXG4gICAgICAgICAgICAgICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWQ6IFwiZmFybWVyX3RpZFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhlYWRlcjogXCJGYXJtZXJfdGlkXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc29ydDogXCJzdHJpbmdcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhdXRvd2lkdGg6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDE4MFxuICAgICAgICAgICAgICAgICAgICAgICAgfSxcblxuICAgICAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgICAgICBzY2hlbWU6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICRpbml0OiBmdW5jdGlvbiAob2JqKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb2JqLm5vZGVfaWQgPSBvYmoubm9kZV9pZDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvYmouZmxpc3QgPSBvYmouZmxpc3Q7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb2JqLmVudHJ5cG9pbnQgPSBvYmouZW50cnlwb2ludDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvYmouaHViX3VybCA9IG9iai5odWJfdXJsO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9iai5pbnRlcmFjdGl2ZSA9IG9iai5pbnRlcmFjdGl2ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvYmouZmFybWVyX3RpZCA9IG9iai5mYXJtZXJfdGlkO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9iai5pbmRleCA9IHRoaXMuY291bnQoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSwgb246IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG9uQWZ0ZXJMb2FkOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCF0aGlzLmNvdW50KCkpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2hvd092ZXJsYXkoXCJObyBjb250YWluZXJzIGluIHJlc2VydmF0aW9uXCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5oaWRlT3ZlcmxheSgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIGlkOiBcInZvbHVtZXNcIixcbiAgICAgICAgICAgICAgICAgICAgaGVhZGVyOiBcIlZvbHVtZXNcIixcbiAgICAgICAgICAgICAgICAgICAgdmlldzogXCJkYXRhdGFibGVcIixcbiAgICAgICAgICAgICAgICAgICAgcmVzaXplQ29sdW1uOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICBzZWxlY3Q6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgIG11bHRpc2VsZWN0OiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICBjc3M6IFwid2ViaXhfaGVhZGVyX2JvcmRlciB3ZWJpeF9kYXRhX2JvcmRlclwiLFxuICAgICAgICAgICAgICAgICAgICBzY3JvbGw6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgIGF1dG9Db25maWc6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgIGNvbHVtbnM6IFtcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZDogXCJpbmRleFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhlYWRlcjogXCIjXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc29ydDogXCJpbnRcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhdXRvd2lkdGg6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDYwXG4gICAgICAgICAgICAgICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWQ6IFwibm9kZV9pZFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhlYWRlcjogXCJOb2RlIGlkXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc29ydDogXCJzdHJpbmdcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhdXRvd2lkdGg6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDE4MFxuICAgICAgICAgICAgICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlkOiBcInNpemVcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBoZWFkZXI6IFwiU2l6ZVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNvcnQ6IFwic3RyaW5nXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYXV0b3dpZHRoOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdpZHRoOiAxODBcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZDogXCJ0eXBlXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaGVhZGVyOiBcIlR5cGVcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzb3J0OiBcInN0cmluZ1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGF1dG93aWR0aDogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aWR0aDogMTgwXG4gICAgICAgICAgICAgICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWQ6IFwiZmFybWVyX3RpZFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhlYWRlcjogXCJGYXJtZXJfdGlkXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc29ydDogXCJzdHJpbmdcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhdXRvd2lkdGg6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDE4MFxuICAgICAgICAgICAgICAgICAgICAgICAgfSxcblxuICAgICAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgICAgICBzY2hlbWU6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICRpbml0OiBmdW5jdGlvbiAob2JqKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb2JqLm5vZGVfaWQgPSBvYmoubm9kZV9pZDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvYmouc2l6ZSA9IG9iai5zaXplO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9iai50eXBlID0gb2JqLnR5cGU7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb2JqLmZhcm1lcl90aWQgPSBvYmouZmFybWVyX3RpZDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvYmouaW5kZXggPSB0aGlzLmNvdW50KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0sIG9uOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBvbkFmdGVyTG9hZDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICghdGhpcy5jb3VudCgpKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNob3dPdmVybGF5KFwiTm8gdm9sdW1lcyBpbiByZXNlcnZhdGlvblwiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuaGlkZU92ZXJsYXkoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICAgICAgaWQ6IFwiemRic1wiLFxuICAgICAgICAgICAgICAgICAgICBoZWFkZXI6IFwiWmRic1wiLFxuICAgICAgICAgICAgICAgICAgICB2aWV3OiBcImRhdGF0YWJsZVwiLFxuICAgICAgICAgICAgICAgICAgICByZXNpemVDb2x1bW46IHRydWUsXG4gICAgICAgICAgICAgICAgICAgIHNlbGVjdDogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgbXVsdGlzZWxlY3Q6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgIGNzczogXCJ3ZWJpeF9oZWFkZXJfYm9yZGVyIHdlYml4X2RhdGFfYm9yZGVyXCIsXG4gICAgICAgICAgICAgICAgICAgIHNjcm9sbDogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgYXV0b0NvbmZpZzogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgY29sdW1uczogW1xuICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlkOiBcImluZGV4XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaGVhZGVyOiBcIiNcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzb3J0OiBcImludFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGF1dG93aWR0aDogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aWR0aDogNjBcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZDogXCJub2RlX2lkXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaGVhZGVyOiBcIk5vZGUgaWRcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzb3J0OiBcInN0cmluZ1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGF1dG93aWR0aDogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aWR0aDogMTgwXG4gICAgICAgICAgICAgICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWQ6IFwic2l6ZVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhlYWRlcjogXCJTaXplXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc29ydDogXCJzdHJpbmdcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhdXRvd2lkdGg6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDE4MFxuICAgICAgICAgICAgICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlkOiBcImRpc2tfdHlwZVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhlYWRlcjogXCJEaXNrIHR5cGVcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzb3J0OiBcInN0cmluZ1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGF1dG93aWR0aDogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aWR0aDogMTgwXG4gICAgICAgICAgICAgICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWQ6IFwibW9kZVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhlYWRlcjogXCJNb2RlXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc29ydDogXCJzdHJpbmdcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhdXRvd2lkdGg6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDE4MFxuICAgICAgICAgICAgICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlkOiBcInB1YmxpY1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhlYWRlcjogXCJwdWJsaWNcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzb3J0OiBcInN0cmluZ1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGF1dG93aWR0aDogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aWR0aDogMTgwXG4gICAgICAgICAgICAgICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWQ6IFwiZmFybWVyX3RpZFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhlYWRlcjogXCJGYXJtZXJfdGlkXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc29ydDogXCJzdHJpbmdcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhdXRvd2lkdGg6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDE4MFxuICAgICAgICAgICAgICAgICAgICAgICAgfSxcblxuICAgICAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgICAgICBzY2hlbWU6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICRpbml0OiBmdW5jdGlvbiAob2JqKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb2JqLmluZGV4ID0gdGhpcy5jb3VudCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9LCBvbjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgb25BZnRlckxvYWQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoIXRoaXMuY291bnQoKSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zaG93T3ZlcmxheShcIk5vIHpkYnMgaW4gcmVzZXJ2YXRpb25cIik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmhpZGVPdmVybGF5KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgICAgIGlkOiBcImt1YmVybmV0ZXNcIixcbiAgICAgICAgICAgICAgICAgICAgaGVhZGVyOiBcIkt1YmVybmV0ZXNcIixcbiAgICAgICAgICAgICAgICAgICAgdmlldzogXCJkYXRhdGFibGVcIixcbiAgICAgICAgICAgICAgICAgICAgcmVzaXplQ29sdW1uOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICBzZWxlY3Q6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgIG11bHRpc2VsZWN0OiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICBjc3M6IFwid2ViaXhfaGVhZGVyX2JvcmRlciB3ZWJpeF9kYXRhX2JvcmRlclwiLFxuICAgICAgICAgICAgICAgICAgICBzY3JvbGw6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgIGF1dG9Db25maWc6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgIGNvbHVtbnM6IFtcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZDogXCJpbmRleFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhlYWRlcjogXCIjXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc29ydDogXCJpbnRcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhdXRvd2lkdGg6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDYwXG4gICAgICAgICAgICAgICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWQ6IFwibm9kZV9pZFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhlYWRlcjogXCJOb2RlIGlkXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc29ydDogXCJzdHJpbmdcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhdXRvd2lkdGg6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDE4MFxuICAgICAgICAgICAgICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlkOiBcInNpemVcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBoZWFkZXI6IFwiU2l6ZVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNvcnQ6IFwic3RyaW5nXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYXV0b3dpZHRoOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdpZHRoOiAxODBcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZDogXCJuZXR3b3JrX2lkXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaGVhZGVyOiBcIk5ldHdvcmsgaWRcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzb3J0OiBcInN0cmluZ1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGF1dG93aWR0aDogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aWR0aDogMTgwXG4gICAgICAgICAgICAgICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWQ6IFwiaXBhZGRyZXNzXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaGVhZGVyOiBcIklwIGFkZHJlc3NcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzb3J0OiBcInN0cmluZ1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGF1dG93aWR0aDogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aWR0aDogMTgwXG4gICAgICAgICAgICAgICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWQ6IFwibWFzdGVyX2lwc19zdHJcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBoZWFkZXI6IFwiTWFzdGVyIGlwc1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNvcnQ6IFwic3RyaW5nXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYXV0b3dpZHRoOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdpZHRoOiAxODBcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZDogXCJmYXJtZXJfdGlkXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaGVhZGVyOiBcIkZhcm1lcl90aWRcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzb3J0OiBcInN0cmluZ1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGF1dG93aWR0aDogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aWR0aDogMTgwXG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxuXG4gICAgICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgICAgIHNjaGVtZToge1xuICAgICAgICAgICAgICAgICAgICAgICAgJGluaXQ6IGZ1bmN0aW9uIChvYmopIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvYmoubWFzdGVyX2lwc19zdHIgPSBvYmoubWFzdGVyX2lwcy50b1N0cmluZygpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb2JqLmluZGV4ID0gdGhpcy5jb3VudCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9LCBvbjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgb25BZnRlckxvYWQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoIXRoaXMuY291bnQoKSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zaG93T3ZlcmxheShcIk5vIGt1YmVybmV0ZXMgaW4gcmVzZXJ2YXRpb25cIik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmhpZGVPdmVybGF5KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9LFxuXG4gICAgICAgICAgICBdXG4gICAgICAgIH07XG5cbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHZpZXc6IFwid2luZG93XCIsXG4gICAgICAgICAgICBoZWFkOiBcIlJlc2VydmF0aW9uXCIsXG4gICAgICAgICAgICBpZDogXCJyZXNlcnZhdGlvbl92aWV3XCIsXG4gICAgICAgICAgICBtb2RhbDogdHJ1ZSxcbiAgICAgICAgICAgIHdpZHRoOiA2MDAsXG4gICAgICAgICAgICBoZWlnaHQ6IDgwMCxcbiAgICAgICAgICAgIHBvc2l0aW9uOiBcImNlbnRlclwiLFxuICAgICAgICAgICAgYm9keToge1xuICAgICAgICAgICAgICAgIHJvd3M6IFtcbiAgICAgICAgICAgICAgICAgICAgdGFiLFxuICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICB2aWV3OiBcImJ1dHRvblwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU6IFwiT0tcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIGNzczogXCJ3ZWJpeF9wcmltYXJ5XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBjbGljazogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZ2V0VG9wUGFyZW50VmlldygpLmhpZGUoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuXG4gICAgaW5pdCgpIHtcbiAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgICAgICB0aGlzLmZvcm0gPSAkJChcImZvcm1cIik7XG5cbiAgICB9XG5cblxuICAgIHNob3dGb3IoaXRlbSkge1xuICAgICAgICBsZXQgdmFsdWVzID0gT2JqZWN0LmFzc2lnbih7fSwgaXRlbSk7XG4gICAgICAgIHRoaXMucmVzZXJ2YXRpb25fdmlldyA9ICQkKFwicmVzZXJ2YXRpb25fdmlld1wiKTtcbiAgICAgICAgdGhpcy5yZXNlcnZhdGlvbl92aWV3LmdldEhlYWQoKS5zZXRIVE1MKFwiUmVzZXJ2YXRpb246IFwiICsgaXRlbS5zb2x1dGlvbk5hbWUpO1xuXG4gICAgICAgIGxldCByZXNlcnZhdGlvbiA9IGl0ZW0ucmVzZXJ2YXRpb25cbiAgICAgICAgdmFsdWVzLmlkID0gcmVzZXJ2YXRpb24uaWRcbiAgICAgICAgdmFsdWVzLmN1c3RvbWVyX3RpZCA9IHJlc2VydmF0aW9uLmN1c3RvbWVyX3RpZFxuICAgICAgICB2YWx1ZXMubmV4dF9hY3Rpb24gPSByZXNlcnZhdGlvbi5uZXh0X2FjdGlvblxuICAgICAgICB2YWx1ZXMucmVzdWx0cyA9IHJlc2VydmF0aW9uLnJlc3VsdHNcbiAgICAgICAgdmFsdWVzLmV4cGlyYXRpb24gPSByZXNlcnZhdGlvbi5kYXRhX3Jlc2VydmF0aW9uLmV4cGlyYXRpb25fcmVzZXJ2YXRpb25cblxuICAgICAgICB2YWx1ZXMuY29udGFpbmVycyA9IHJlc2VydmF0aW9uLmRhdGFfcmVzZXJ2YXRpb24uY29udGFpbmVyc1xuICAgICAgICB2YWx1ZXMudm9sdW1lcyA9IHJlc2VydmF0aW9uLmRhdGFfcmVzZXJ2YXRpb24udm9sdW1lc1xuICAgICAgICB2YWx1ZXMuemRicyA9IHJlc2VydmF0aW9uLmRhdGFfcmVzZXJ2YXRpb24uemRic1xuICAgICAgICB2YWx1ZXMubmV0d29ya3MgPSByZXNlcnZhdGlvbi5kYXRhX3Jlc2VydmF0aW9uLm5ldHdvcmtzXG4gICAgICAgIHZhbHVlcy5rdWJlcm5ldGVzID0gcmVzZXJ2YXRpb24uZGF0YV9yZXNlcnZhdGlvbi5rdWJlcm5ldGVzXG4gICAgICAgIHZhbHVlcy5mb3JtX2luZm8gPSBpdGVtLmZvcm1faW5mb1xuXG4gICAgICAgIHRoaXMuZm9ybS5zZXRWYWx1ZXModmFsdWVzKTtcbiAgICAgICAgdGhpcy5mb3JtX2luZm8gPSAkJChcImZvcm1JbmZvXCIpO1xuICAgICAgICB0aGlzLmZvcm1faW5mby5jbGVhckFsbCgpO1xuXG4gICAgICAgIGxldCBmb3JtX2xpc3QgPSBbXTtcbiAgICAgICAgbGV0IGZvcm1fa2V5cyA9IE9iamVjdC5rZXlzKHZhbHVlcy5mb3JtX2luZm8pXG4gICAgICAgIGxldCBmb3JtX3ZhbHVlcyA9IE9iamVjdC52YWx1ZXModmFsdWVzLmZvcm1faW5mbylcbiAgICAgICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IGZvcm1fa2V5cy5sZW5ndGg7IGluZGV4KyspIHtcbiAgICAgICAgICAgIGxldCBmb3JtX2RpY3QgPSBuZXcgT2JqZWN0KCk7XG4gICAgICAgICAgICBmb3JtX2RpY3RbJ2tleSddID0gZm9ybV9rZXlzW2luZGV4XTtcbiAgICAgICAgICAgIGZvcm1fZGljdFsndmFsdWUnXSA9IGZvcm1fdmFsdWVzW2luZGV4XTtcbiAgICAgICAgICAgIGZvcm1fbGlzdC5wdXNoKGZvcm1fZGljdClcblxuICAgICAgICB9XG4gICAgICAgIHRoaXMuZm9ybV9pbmZvLnBhcnNlKGZvcm1fbGlzdCk7XG5cbiAgICAgICAgLy8gQWRkIG5ldHdvcmtzIHRhYiBjb250ZW50XG4gICAgICAgIHRoaXMubmV0d29ya3MgPSAkJChcIm5ldHdvcmtzXCIpO1xuICAgICAgICB0aGlzLm5ldHdvcmtzLmNsZWFyQWxsKClcbiAgICAgICAgdGhpcy5uZXR3b3Jrcy5wYXJzZSh2YWx1ZXMubmV0d29ya3MpO1xuXG4gICAgICAgIC8vIEFkZCBjb3RhaW5lciB0YWIgY29udGVudFxuICAgICAgICB0aGlzLmNvbnRhaW5lcnMgPSAkJChcImNvbnRhaW5lcnNcIik7XG4gICAgICAgIHRoaXMuY29udGFpbmVycy5jbGVhckFsbCgpXG4gICAgICAgIHRoaXMuY29udGFpbmVycy5wYXJzZSh2YWx1ZXMuY29udGFpbmVycyk7XG5cblxuICAgICAgICAvLyBBZGQgdm9sdW1lcyB0YWIgY29udGVudFxuICAgICAgICB0aGlzLnZvbHVtZXMgPSAkJChcInZvbHVtZXNcIik7XG4gICAgICAgIHRoaXMudm9sdW1lcy5jbGVhckFsbCgpXG4gICAgICAgIHRoaXMudm9sdW1lcy5wYXJzZSh2YWx1ZXMudm9sdW1lcyk7XG5cbiAgICAgICAgLy8gQWRkIHpkYiB0YWIgY29udGVudFxuICAgICAgICB0aGlzLnpkYnMgPSAkJChcInpkYnNcIik7XG4gICAgICAgIHRoaXMuemRicy5jbGVhckFsbCgpXG4gICAgICAgIHRoaXMuemRicy5wYXJzZSh2YWx1ZXMuemRicyk7XG5cblxuICAgICAgICAvLyBBZGQga3ViZXJuZXRlcyB0YWIgY29udGVudFxuICAgICAgICB0aGlzLmt1YmVybmV0ZXMgPSAkJChcImt1YmVybmV0ZXNcIik7XG4gICAgICAgIHRoaXMua3ViZXJuZXRlcy5jbGVhckFsbCgpXG4gICAgICAgIHRoaXMua3ViZXJuZXRlcy5wYXJzZSh2YWx1ZXMua3ViZXJuZXRlcyk7XG5cblxuICAgICAgICB0aGlzLmdldFJvb3QoKS5zaG93KCk7XG4gICAgfVxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc291cmNlcy92aWV3cy9kZXBsb3llZFNvbHV0aW9ucy9yZXNlcnZhdGlvbi5qcyIsImltcG9ydCB7IEpldFZpZXcgfSBmcm9tIFwid2ViaXgtamV0XCI7XG5cbmltcG9ydCB7IGRhdGVGb3JtYXR0ZXIgfSBmcm9tIFwiLi4vLi4vY29tbW9uL2Zvcm1hdHRlcnNcIjtcbmltcG9ydCB7IExFVkVMUyB9IGZyb20gXCIuLi9hbGVydHMvZGF0YVwiO1xuaW1wb3J0IHsgY3JlYXRlRmlsdGVyT3B0aW9ucyB9IGZyb20gXCIuLi8uLi9jb21tb24vZmlsdGVyc1wiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBBcHBMb2dzVmlldyBleHRlbmRzIEpldFZpZXcge1xuICAgIGNvbmZpZygpIHtcbiAgICAgICAgdmFyIHBhZ2VyID0ge1xuICAgICAgICAgICAgdmlldzogXCJwYWdlclwiLFxuICAgICAgICAgICAgaWQ6IFwicGFnZXJcIixcbiAgICAgICAgICAgIHNpemU6IDEwMCxcbiAgICAgICAgICAgIGdyb3VwOiAyMFxuICAgICAgICB9O1xuICAgICAgICBjb25zdCBhcHBsb2dzID0ge1xuICAgICAgICAgICAgdmlldzogXCJkYXRhdGFibGVcIixcbiAgICAgICAgICAgIGlkOiBcImFwcGxvZ3NfdGFibGVcIixcbiAgICAgICAgICAgIHBhZ2VyOiBcInBhZ2VyXCIsXG4gICAgICAgICAgICByZXNpemVDb2x1bW46IHRydWUsXG4gICAgICAgICAgICBzZWxlY3Q6IHRydWUsXG4gICAgICAgICAgICBtdWx0aXNlbGVjdDogdHJ1ZSxcbiAgICAgICAgICAgIGNzczogXCJ3ZWJpeF9oZWFkZXJfYm9yZGVyIHdlYml4X2RhdGFfYm9yZGVyXCIsXG4gICAgICAgICAgICBzY3JvbGw6IHRydWUsXG4gICAgICAgICAgICBhdXRvQ29uZmlnOiB0cnVlLFxuICAgICAgICAgICAgb246IHtcbiAgICAgICAgICAgICAgICBvbkFmdGVyTG9hZDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnNvcnQoXCJlcG9jaFwiLCBcImRlc1wiKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5tYXJrU29ydGluZyhcImVwb2NoXCIsIFwiZGVzXCIpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG5cbiAgICAgICAgICAgIGNvbHVtbnM6IFt7XG4gICAgICAgICAgICAgICAgaWQ6IFwiaWRcIixcbiAgICAgICAgICAgICAgICBoZWFkZXI6IFtcbiAgICAgICAgICAgICAgICAgICAgXCJMb2cjXCIsXG4gICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRlbnQ6IFwidGV4dEZpbHRlclwiXG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICBzb3J0OiBcImludFwiLFxuICAgICAgICAgICAgICAgIHdpZHRoOiA1MCxcbiAgICAgICAgICAgICAgICBhdXRvd2lkdGg6IHRydWUsXG4gICAgICAgICAgICB9LFxuXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgaWQ6IFwiZmlsZXBhdGhcIixcbiAgICAgICAgICAgICAgICBoZWFkZXI6IFtcbiAgICAgICAgICAgICAgICAgICAgXCJQYXRoXCIsXG4gICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRlbnQ6IFwidGV4dEZpbHRlclwiXG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICBzb3J0OiBcInN0cmluZ1wiLFxuICAgICAgICAgICAgICAgIGF1dG93aWR0aDogdHJ1ZSxcbiAgICAgICAgICAgICAgICB3aWR0aDogMTQwXG4gICAgICAgICAgICB9LFxuXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgaWQ6IFwibGluZW5yXCIsXG4gICAgICAgICAgICAgICAgaGVhZGVyOiBbXG4gICAgICAgICAgICAgICAgICAgIFwiTGluZS5uclwiLFxuICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb250ZW50OiBcInRleHRGaWx0ZXJcIlxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgc29ydDogXCJpbnRcIixcbiAgICAgICAgICAgICAgICBhdXRvd2lkdGg6IHRydWUsXG4gICAgICAgICAgICAgICAgd2lkdGg6IDYwXG4gICAgICAgICAgICB9LFxuXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgaWQ6IFwiY29udGV4dFwiLFxuICAgICAgICAgICAgICAgIGhlYWRlcjogW1xuICAgICAgICAgICAgICAgICAgICBcIkNvbnRleHRcIixcbiAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29udGVudDogXCJ0ZXh0RmlsdGVyXCJcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgIHNvcnQ6IFwic3RyaW5nXCJcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgaWQ6IFwibWVzc2FnZVwiLFxuICAgICAgICAgICAgICAgIGhlYWRlcjogW1xuICAgICAgICAgICAgICAgICAgICBcIk1lc3NhZ2VcIixcbiAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29udGVudDogXCJ0ZXh0RmlsdGVyXCJcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgIHNvcnQ6IFwic3RyaW5nXCIsXG4gICAgICAgICAgICAgICAgd2lkdGg6IDUwMCxcbiAgICAgICAgICAgICAgICBhdXRvd2lkdGg6IHRydWVcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgaWQ6IFwibGV2ZWxcIixcbiAgICAgICAgICAgICAgICBoZWFkZXI6IFtcbiAgICAgICAgICAgICAgICAgICAgXCJMZXZlbFwiLFxuICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb250ZW50OiBcInNlbGVjdEZpbHRlclwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgb3B0aW9uczogY3JlYXRlRmlsdGVyT3B0aW9ucyhMRVZFTFMpXG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICBzb3J0OiBcImludFwiLFxuICAgICAgICAgICAgICAgIGZvcm1hdDogKHZhbHVlKSA9PiBMRVZFTFNbdmFsdWVdLFxuICAgICAgICAgICAgICAgIHdpZHRoOiAxMDBcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgaWQ6IFwiZXBvY2hcIixcbiAgICAgICAgICAgICAgICBoZWFkZXI6IFtcbiAgICAgICAgICAgICAgICAgICAgXCJUaW1lXCIsXG4gICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRlbnQ6IFwidGV4dEZpbHRlclwiXG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICBzb3J0OiBcImRhdGVcIixcbiAgICAgICAgICAgICAgICBmb3JtYXQ6IGRhdGVGb3JtYXR0ZXIsXG4gICAgICAgICAgICAgICAgd2lkdGg6IDEzMFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBpZDogXCJwcm9jZXNzaWRcIixcbiAgICAgICAgICAgICAgICBoZWFkZXI6IFtcbiAgICAgICAgICAgICAgICAgICAgXCJQSURcIixcbiAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29udGVudDogXCJ0ZXh0RmlsdGVyXCJcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgIHNvcnQ6IFwiaW50XCIsXG4gICAgICAgICAgICAgICAgd2lkdGg6IDYwXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGlkOiBcImNhdFwiLFxuICAgICAgICAgICAgICAgIGhlYWRlcjogW1xuICAgICAgICAgICAgICAgICAgICBcIkNhdGVnb3J5XCIsXG4gICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRlbnQ6IFwidGV4dEZpbHRlclwiXG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICBzb3J0OiBcInN0cmluZ1wiLFxuICAgICAgICAgICAgICAgIHdpZHRoOiA4MFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBpZDogXCJkYXRhXCIsXG4gICAgICAgICAgICAgICAgaGVhZGVyOiBbXG4gICAgICAgICAgICAgICAgICAgIFwiRGF0YVwiLFxuICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb250ZW50OiBcInRleHRGaWx0ZXJcIlxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgc29ydDogXCJzdHJpbmdcIlxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBdLFxuXG4gICAgICAgIH1cblxuXG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICByb3dzOiBbXG4gICAgICAgICAgICAgICAgYXBwbG9ncyxcbiAgICAgICAgICAgICAgICBwYWdlclxuICAgICAgICAgICAgXVxuICAgICAgICB9XG4gICAgfVxuXG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zb3VyY2VzL3ZpZXdzL2xvZ3MvYXBwTG9ncy5qcyIsImltcG9ydCB7IEpldFZpZXcgfSBmcm9tIFwid2ViaXgtamV0XCI7XG5cbmltcG9ydCB7IGlucHV0RGlhbG9nIH0gZnJvbSBcIi4uLy4uL2NvbW1vbi9kaWFsb2dzXCI7XG5pbXBvcnQgeyBhZG1pbiB9IGZyb20gXCIuLi8uLi9zZXJ2aWNlcy9hZG1pblwiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBBZG1pbnNWaWV3IGV4dGVuZHMgSmV0VmlldyB7XG4gICAgY29uZmlnKCkge1xuICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XG5cbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHJvd3M6IFt7XG4gICAgICAgICAgICAgICAgY29sczogW3tcbiAgICAgICAgICAgICAgICAgICAgdmlldzogXCJ0ZW1wbGF0ZVwiLFxuICAgICAgICAgICAgICAgICAgICB0ZW1wbGF0ZTogXCJBbGwgb2YgdGhlIGZvbGxvd2luZyAzQm90IG5hbWVzIGNhbiBhY2Nlc3MgZGFzaGJvYXJkLCB5b3UgY2FuIGFkZCBvciByZW1vdmUgdGhlbSBmcm9tIGhlcmVcIixcbiAgICAgICAgICAgICAgICAgICAgYXV0b2hlaWdodDogdHJ1ZSxcbiAgICAgICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgICAgIGxvY2FsSWQ6IFwiYWRkLWFkbWluXCIsXG4gICAgICAgICAgICAgICAgICAgIHZpZXc6IFwiYnV0dG9uXCIsXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlOiBcIkFkZCBuZXcgYWRtaW5pc3RyYXRvclwiLFxuICAgICAgICAgICAgICAgICAgICBjbGljazogc2VsZi5hZGRBZG1pbi5iaW5kKHNlbGYpLFxuICAgICAgICAgICAgICAgIH1dXG4gICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgbG9jYWxJZDogXCJhZG1pbnMtdGFibGVcIixcbiAgICAgICAgICAgICAgICB2aWV3OiBcImRhdGF0YWJsZVwiLFxuICAgICAgICAgICAgICAgIGF1dG9oZWlnaHQ6IHRydWUsXG4gICAgICAgICAgICAgICAgY29sdW1uczogW3tcbiAgICAgICAgICAgICAgICAgICAgaWQ6IFwibmFtZVwiLFxuICAgICAgICAgICAgICAgICAgICB3aWR0aDogNTAwLFxuICAgICAgICAgICAgICAgICAgICBoZWFkZXI6IFtcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiTmFtZVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRlbnQ6IFwidGV4dEZpbHRlclwiXG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgICAgIHNvcnQ6IFwic3RyaW5nXCIsXG4gICAgICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgICAgICBoZWFkZXI6IFwiRGVsZXRlXCIsXG4gICAgICAgICAgICAgICAgICAgIHRlbXBsYXRlOiBmdW5jdGlvbiAob2JqKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gXCI8c3BhbiBjbGFzcz0nd2ViaXhfaWNvbiBtZGkgbWRpLXRyYXNoLWNhbiB3ZWJpeF9kYW5nZXIgZGVsZXRlX2FkbWluJz48L3NwYW4+XCI7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XSxcbiAgICAgICAgICAgICAgICBvbkNsaWNrOiB7XG4gICAgICAgICAgICAgICAgICAgIGRlbGV0ZV9hZG1pbjogZnVuY3Rpb24gKGUsIGlkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLiRzY29wZS5kZWxldGVBZG1pbihpZCk7XG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfV1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIGhhbmRsZVJlc3VsdCgpIHtcblxuICAgIH1cblxuICAgIGFkZEFkbWluKCkge1xuICAgICAgICBjb25zdCBzZWxmID0gdGhpcztcblxuICAgICAgICBpbnB1dERpYWxvZyhcIkFkZCBhZG1pblwiLCBcIjNCb3QgbmFtZVwiLCBcIkFkZFwiLCAoaW5wdXQpID0+IHtcbiAgICAgICAgICAgIGlmIChhZG1pbi5hZGQoaW5wdXQpKSB7XG4gICAgICAgICAgICAgICAgc2VsZi50YWJsZS5hZGQoeyBuYW1lOiBpbnB1dCB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgZGVsZXRlQWRtaW4oaXRlbUlkKSB7XG4gICAgICAgIGNvbnN0IHNlbGYgPSB0aGlzO1xuXG4gICAgICAgIGNvbnN0IGl0ZW0gPSBzZWxmLnRhYmxlLmdldEl0ZW0oaXRlbUlkKTtcblxuICAgICAgICB3ZWJpeC5jb25maXJtKHtcbiAgICAgICAgICAgIHRpdGxlOiBcIkRlbGV0ZSBhZG1pblwiLFxuICAgICAgICAgICAgb2s6IFwiWWVzXCIsXG4gICAgICAgICAgICB0ZXh0OiBgQXJlIHlvdSBzdXJlIHlvdSB3YW50IHRvIGRlbGV0ZSBcIiR7aXRlbS5uYW1lfVwiP2AsXG4gICAgICAgICAgICBjYW5jZWw6IFwiTm9cIixcbiAgICAgICAgfSkudGhlbigoKSA9PiB7XG4gICAgICAgICAgICBpZiAoYWRtaW4uZGVsZXRlKGl0ZW0ubmFtZSkpIHtcbiAgICAgICAgICAgICAgICBzZWxmLnRhYmxlLnJlbW92ZShpdGVtSWQpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBpbml0KCkge1xuICAgICAgICB0aGlzLnRhYmxlID0gdGhpcy4kJChcImFkbWlucy10YWJsZVwiKTtcblxuICAgICAgICBhZG1pbi5saXN0KCkudGhlbihkYXRhID0+IHtcbiAgICAgICAgICAgIHRoaXMudGFibGUucGFyc2UoZGF0YS5qc29uKCkpO1xuICAgICAgICB9KTtcblxuICAgICAgICAvL3dlYml4LmV4dGVuZCh0aGlzLnRhYmxlLCB3ZWJpeC5Qcm9ncmVzc0Jhcik7XG4gICAgfVxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc291cmNlcy92aWV3cy9zZXR0aW5ncy9hZG1pbnMuanMiLCJpbXBvcnQgeyBKZXRWaWV3IH0gZnJvbSBcIndlYml4LWpldFwiO1xuXG5pbXBvcnQgeyBhZG1pbiB9IGZyb20gXCIuLi8uLi9zZXJ2aWNlcy9hZG1pblwiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBHZW5lcmFsVmlldyBleHRlbmRzIEpldFZpZXcge1xuICAgIGNvbmZpZygpIHtcblxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgbG9jYWxJZDogXCJnZW5lcmFsX2Zvcm1cIixcbiAgICAgICAgICAgIHZpZXc6IFwiZm9ybVwiLFxuICAgICAgICAgICAgZWxlbWVudHM6IFtcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIHZpZXc6IFwicmljaHNlbGVjdFwiLFxuICAgICAgICAgICAgICAgICAgICBpZDogXCJleHBsb3Jlcl9saXN0XCIsXG4gICAgICAgICAgICAgICAgICAgIGxhYmVsOiBcIkV4cGxvcmVyXCIsXG4gICAgICAgICAgICAgICAgICAgIGxhYmVsV2lkdGg6IDE1MCxcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU6IFwidGVzdG5ldFwiLFxuICAgICAgICAgICAgICAgICAgICB5Q291bnQ6IDIsXG4gICAgICAgICAgICAgICAgICAgIG9wdGlvbnM6IFtcbiAgICAgICAgICAgICAgICAgICAgICAgIHsgaWQ6IFwidGVzdG5ldFwiLCB2YWx1ZTogXCJUZXN0IE5ldFwiIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICB7IGlkOiBcIm1haW5cIiwgdmFsdWU6IFwiTWFpblwiIH0sXG4gICAgICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgbG9jYWxJZDogXCJleHBsb3Jlcl9hZGRyZXNzXCIsXG4gICAgICAgICAgICAgICAgICAgIHZpZXc6IFwidGV4dFwiLFxuICAgICAgICAgICAgICAgICAgICB0eXBlOiBcInRleHRcIixcbiAgICAgICAgICAgICAgICAgICAgcmVhZG9ubHk6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgIGxhYmVsOiBcIkV4cGxvcmVyIGFkZHJlc3NcIixcbiAgICAgICAgICAgICAgICAgICAgbGFiZWxXaWR0aDogMTUwLFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBdXG4gICAgICAgIH1cblxuICAgIH1cblxuICAgIGRvQWN0aW9uKHByb21pc2UsIGNhbGxiYWNrKSB7XG4gICAgICAgIHRoaXMuZm9ybS5zaG93UHJvZ3Jlc3MoKVxuICAgICAgICBwcm9taXNlLnRoZW4oKGRhdGEpID0+IHtcbiAgICAgICAgICAgIGlmIChjYWxsYmFjaykge1xuICAgICAgICAgICAgICAgIGNhbGxiYWNrKGRhdGEpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY29uc29sZS5sb2coZGF0YSk7XG4gICAgICAgICAgICB0aGlzLmZvcm0uc2hvd1Byb2dyZXNzKHsgaGlkZTogdHJ1ZSB9KTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgaW5pdCgpIHtcbiAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xuXG4gICAgICAgIHNlbGYuZm9ybSA9IHNlbGYuJCQoJ2dlbmVyYWxfZm9ybScpO1xuICAgICAgICB3ZWJpeC5leHRlbmQoc2VsZi5mb3JtLCB3ZWJpeC5Qcm9ncmVzc0Jhcik7XG5cbiAgICAgICAgc2VsZi5leHBsb3Jlckxpc3QgPSBzZWxmLiQkKCdleHBsb3Jlcl9saXN0Jyk7XG4gICAgICAgIHNlbGYuZXhwbG9yZXJBZGRyZXNzID0gc2VsZi4kJCgnZXhwbG9yZXJfYWRkcmVzcycpO1xuXG5cbiAgICAgICAgc2VsZi5kb0FjdGlvbihhZG1pbi5nZXRfZXhwbG9yZXIoKSwgKGRhdGEpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGV4cGxvcmVyID0gZGF0YS5qc29uKCk7XG4gICAgICAgICAgICBzZWxmLmV4cGxvcmVyTGlzdC5zZXRWYWx1ZShleHBsb3Jlci50eXBlKTtcbiAgICAgICAgICAgIHNlbGYuZXhwbG9yZXJBZGRyZXNzLnNldFZhbHVlKGV4cGxvcmVyLnVybCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHNlbGYuZXhwbG9yZXJMaXN0LmF0dGFjaEV2ZW50KFwib25DaGFuZ2VcIiwgKG5ld1ZhbHVlKSA9PiB7XG4gICAgICAgICAgICBzZWxmLmRvQWN0aW9uKGFkbWluLnNldF9leHBsb3JlcihuZXdWYWx1ZS50b0xvd2VyQ2FzZSgpKSwgKGRhdGEpID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCBleHBsb3JlciA9IGRhdGEuanNvbigpO1xuICAgICAgICAgICAgICAgIHNlbGYuZXhwbG9yZXJBZGRyZXNzLnNldFZhbHVlKGV4cGxvcmVyLnVybCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG5cblxuICAgIH1cbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NvdXJjZXMvdmlld3Mvc2V0dGluZ3MvZ2VuZXJhbC5qcyIsImltcG9ydCB7IEpldFZpZXcgfSBmcm9tIFwid2ViaXgtamV0XCI7XG5pbXBvcnQgeyB3YWxsZXQgfSBmcm9tIFwiLi4vLi4vc2VydmljZXMvd2FsbGV0XCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFdhbGxldEZvcm1WaWV3IGV4dGVuZHMgSmV0VmlldyB7XG4gICAgY29uZmlnKCkge1xuICAgICAgICBjb25zdCBpbmZvID0ge1xuICAgICAgICAgICAgdmlldzogXCJmb3JtXCIsXG4gICAgICAgICAgICBpZDogXCJmb3JtXCIsXG4gICAgICAgICAgICBlbGVtZW50c0NvbmZpZzogeyBsYWJlbFdpZHRoOiAyMDAgfSxcbiAgICAgICAgICAgIGVsZW1lbnRzOiBbXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICB2aWV3OiBcInRleHRcIixcbiAgICAgICAgICAgICAgICAgICAgbGFiZWw6IFwiTmFtZVwiLFxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcIm5hbWVcIixcbiAgICAgICAgICAgICAgICAgICAgcGxhY2Vob2xkZXI6IFwiV2FsbGV0IG5hbWVcIlxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIF1cbiAgICAgICAgfTtcblxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgdmlldzogXCJ3aW5kb3dcIixcbiAgICAgICAgICAgIGhlYWQ6IFwiQ3JlYXRlIG5ldyB3YWxsZXRcIixcbiAgICAgICAgICAgIG1vZGFsOiB0cnVlLFxuICAgICAgICAgICAgd2lkdGg6IDYwMCxcbiAgICAgICAgICAgIGhlaWdodDogNDAwLFxuICAgICAgICAgICAgcG9zaXRpb246IFwiY2VudGVyXCIsXG4gICAgICAgICAgICBib2R5OiB7XG4gICAgICAgICAgICAgICAgcm93czogW1xuICAgICAgICAgICAgICAgICAgICBpbmZvLFxuICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICB2aWV3OiBcImJ1dHRvblwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU6IFwiT0tcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIGNzczogXCJ3ZWJpeF9wcmltYXJ5XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBjbGljazogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciB3YWxsZXRfbmFtZSA9ICQkKCdmb3JtJykuZ2V0VmFsdWVzKCkubmFtZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuJHNjb3BlLmNyZWF0ZVdhbGxldCh3YWxsZXRfbmFtZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBpbml0KCkge1xuICAgICAgICB0aGlzLmZvcm0gPSAkJChcImZvcm1cIik7XG4gICAgfVxuXG4gICAgc2hvd0Zvcm0oKSB7XG4gICAgICAgIHRoaXMuZ2V0Um9vdCgpLnNob3coKTtcbiAgICB9XG5cbiAgICBjcmVhdGVXYWxsZXQobmFtZSl7XG5cbiAgICAgICAgd2ViaXguZXh0ZW5kKHRoaXMuZm9ybSwgd2ViaXguUHJvZ3Jlc3NCYXIpO1xuICAgICAgICB0aGlzLmZvcm0uc2hvd1Byb2dyZXNzKHtcbiAgICAgICAgICAgIHR5cGU6XCJpY29uXCIsXG4gICAgICAgICAgICBoaWRlOiBmYWxzZVxuICAgICAgICB9KTtcbiAgICAgICAgd2FsbGV0LmNyZWF0ZVdhbGxldChuYW1lKS50aGVuKGRhdGEgPT4ge1xuICAgICAgICAgICAgd2ViaXgubWVzc2FnZSh7IHR5cGU6IFwic3VjY2Vzc1wiLCB0ZXh0OiBcIldhbGxldCBjcmVhdGVkIHN1Y2Nlc3NmdWxseVwiIH0pO1xuICAgICAgICAgICAgdGhpcy5mb3JtLnNob3dQcm9ncmVzcyh7aGlkZTogdHJ1ZX0pO1xuICAgICAgICAgICAgdGhpcy5mb3JtLmdldFRvcFBhcmVudFZpZXcoKS5oaWRlKCk7XG4gICAgICAgICAgICB0aGlzLmFwcC5yZWZyZXNoKClcbiAgICAgICAgfSkuY2F0Y2goZXJyb3IgPT4ge1xuICAgICAgICAgICAgd2ViaXgubWVzc2FnZSh7IHR5cGU6IFwiZXJyb3JcIiwgdGV4dDogXCJDb3VsZCBub3QgY3JlYXRlIHdhbGxldFwiIH0pO1xuICAgICAgICAgICAgdGhpcy5mb3JtLnNob3dQcm9ncmVzcyh7aGlkZTogdHJ1ZX0pO1xuICAgICAgICAgICAgdGhpcy5mb3JtLmdldFRvcFBhcmVudFZpZXcoKS5oaWRlKCk7XG4gICAgICAgICAgICB0aGlzLmFwcC5yZWZyZXNoKClcbiAgICAgICAgfSk7XG4gICAgfVxufVxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NvdXJjZXMvdmlld3Mvd2FsbGV0c01hbmFnZXIvd2FsbGV0Rm9ybS5qcyIsImltcG9ydCB7IFNlcnZpY2UgfSBmcm9tIFwiLi4vY29tbW9uL2FwaVwiO1xuXG5jb25zdCBCQVNFX1VSTCA9IFwiL3plcm9ib3QvYWRtaW4vYWN0b3JzL3dhbGxldFwiO1xuXG5jbGFzcyBXYWxsZXRTZXJ2aWNlIGV4dGVuZHMgU2VydmljZSB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHN1cGVyKEJBU0VfVVJMKTtcbiAgICB9XG5cbiAgICBjcmVhdGVXYWxsZXQobmFtZSkge1xuICAgICAgICByZXR1cm4gdGhpcy5nZXRDYWxsKFwiY3JlYXRlX3dhbGxldFwiLCBuYW1lKTtcbiAgICB9XG5cbiAgICBtYW5hZ2VXYWxsZXQobmFtZSkge1xuICAgICAgICByZXR1cm4gdGhpcy5nZXRDYWxsKFwibWFuYWdlX3dhbGxldFwiLCBuYW1lKTtcbiAgICB9XG5cbiAgICBnZXRXYWxsZXRzKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5nZXRDYWxsKFwiZ2V0X3dhbGxldHNcIik7XG4gICAgfVxuXG4gICAgaW1wb3J0V2FsbGV0KG5hbWUsIHNlY3JldCkge1xuICAgICAgICByZXR1cm4gdGhpcy5nZXRDYWxsKFwiaW1wb3J0X3dhbGxldFwiLCB7bmFtZSwgc2VjcmV0fSlcbiAgICB9XG59XG5cbmV4cG9ydCBjb25zdCB3YWxsZXQgPSBuZXcgV2FsbGV0U2VydmljZSgpO1xuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NvdXJjZXMvc2VydmljZXMvd2FsbGV0LmpzIiwiaW1wb3J0IHsgSmV0VmlldyB9IGZyb20gXCJ3ZWJpeC1qZXRcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgV2FsbGV0RGV0YWlsc1ZpZXcgZXh0ZW5kcyBKZXRWaWV3IHtcbiAgICBjb25maWcoKSB7XG4gICAgICAgIGNvbnN0IGluZm8gPSB7XG4gICAgICAgICAgICBpZDogXCJ3YWxsZXRfaW5mb1wiLFxuICAgICAgICAgICAgdmlldzogXCJsaXN0XCIsXG4gICAgICAgICAgICByZXNwb25zaXZlOiB0cnVlLFxuICAgICAgICAgICAgdHlwZToge1xuICAgICAgICAgICAgICAgIGhlaWdodDogJ2F1dG8nLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHRlbXBsYXRlOiBgXG4gICAgICAgICAgICAgICAgPHA+PC9mb250Pjxmb250IHNpemU9XCIzXCI+PGI+I2tleSM6IDwvYj4jdmFsdWUjPC9mb250Pjxicj48L3A+XG4gICAgICAgICAgICBgXG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgdmlldzogXCJ3aW5kb3dcIixcbiAgICAgICAgICAgIGhlYWQ6IFwiV2FsbGV0IERldGFpbHNcIixcbiAgICAgICAgICAgIG1vZGFsOiB0cnVlLFxuICAgICAgICAgICAgd2lkdGg6IDgwMCxcbiAgICAgICAgICAgIGhlaWdodDogNTAwLFxuICAgICAgICAgICAgcG9zaXRpb246IFwiY2VudGVyXCIsXG4gICAgICAgICAgICBib2R5OiB7XG4gICAgICAgICAgICAgICAgcm93czogW1xuICAgICAgICAgICAgICAgICAgICBpbmZvLFxuICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICB2aWV3OiBcImJ1dHRvblwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgaWQ6IFwic2VjcmV0X2J0blwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU6IFwiU2hvdyBTZWNyZXRcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIGNzczogXCJ3ZWJpeF9wcmltYXJ5XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBjbGljazogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuJHNjb3BlLnNob3dTZWNyZXQoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmlldzogXCJidXR0b25cIixcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlOiBcIk9LXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBjc3M6IFwid2ViaXhfcHJpbWFyeVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgY2xpY2s6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAkJChcInNlY3JldF9idG5cIikuZW5hYmxlKClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmdldFRvcFBhcmVudFZpZXcoKS5oaWRlKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBpbml0KCkge1xuICAgICAgICBjb25zdCBzZWxmID0gdGhpcztcbiAgICAgICAgc2VsZi5pbmZvID0gdGhpcy4kJChcIndhbGxldF9pbmZvXCIpO1xuICAgICAgICBzZWxmLnNlY3JldF9idG4gPSB0aGlzLiQkKFwic2VjcmV0X2J0blwiKTtcbiAgICAgICAgc2VsZi5zZWNyZXQgPSBcIlwiO1xuICAgIH1cblxuICAgIHNob3dTZWNyZXQoKSB7XG4gICAgICAgIHZhciBzZWxmID0gdGhpcztcblxuICAgICAgICAvLyBzZWxmLmluZm8uYWRkKHtcbiAgICAgICAgLy8gICAgIGtleTogJ1NlY3JldCcsXG4gICAgICAgIC8vICAgICB2YWx1ZTogc2VsZi5zZWNyZXRcbiAgICAgICAgLy8gfSk7XG4gICAgICAgIC8vIHNlbGYuc2VjcmV0X2J0bi5kaXNhYmxlKClcbiAgICAgICAgc2VsZi5pbmZvLmhpZGVJdGVtKDEpXG4gICAgfVxuICAgIFxuICAgIHNob3dJbmZvKGRhdGEpe1xuICAgICAgICB2YXIgc2VsZiA9IHRoaXNcblxuICAgICAgICB2YXIgYmFsYW5jZXMgPSBcIlwiO1xuICAgICAgICBmb3IgKHZhciBpIGluIGRhdGEuYmFsYW5jZXMpIHtcbiAgICAgICAgICAgIGJhbGFuY2VzICs9IGA8YnI+JHtkYXRhLmJhbGFuY2VzW2ldLmJhbGFuY2V9IDxiPiR7ZGF0YS5iYWxhbmNlc1tpXS5hc3NldF9jb2RlfTwvYj4gJHtkYXRhLmJhbGFuY2VzW2ldLmFzc2V0X2lzc3Vlcn1gXG4gICAgICAgIH1cbiAgICAgICAgc2VsZi5pbmZvLmNsZWFyQWxsKClcbiAgICAgICAgc2VsZi5pbmZvLmFkZCh7XG4gICAgICAgICAgICBrZXk6ICdOYW1lJyxcbiAgICAgICAgICAgIHZhbHVlOiBkYXRhLm5hbWVcbiAgICAgICAgfSk7XG4gICAgICAgIHNlbGYuaW5mby5hZGQoe1xuICAgICAgICAgICAga2V5OiAnQWRkcmVzcycsXG4gICAgICAgICAgICB2YWx1ZTogZGF0YS5hZGRyZXNzXG4gICAgICAgIH0pO1xuICAgICAgICBzZWxmLmluZm8uYWRkKHtcbiAgICAgICAgICAgIGtleTogJ0JhbGFuY2VzJyxcbiAgICAgICAgICAgIHZhbHVlOiBiYWxhbmNlc1xuICAgICAgICB9KTtcbiAgICAgICAgc2VsZi5zZWNyZXQgPSBkYXRhLnNlY3JldDtcblxuICAgICAgICB0aGlzLmdldFJvb3QoKS5zaG93KCk7XG4gICAgfVxufVxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NvdXJjZXMvdmlld3Mvd2FsbGV0c01hbmFnZXIvd2FsbGV0RGV0YWlscy5qcyIsImltcG9ydCB7IEpldFZpZXcgfSBmcm9tIFwid2ViaXgtamV0XCI7XG5cbmltcG9ydCB7IHdhbGxldCB9IGZyb20gXCIuLi8uLi9zZXJ2aWNlcy93YWxsZXRcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgV2FsbGV0SW1wb3J0VmlldyBleHRlbmRzIEpldFZpZXcge1xuICAgIGNvbmZpZygpIHtcbiAgICAgICAgY29uc3QgaW5mbyA9IHtcbiAgICAgICAgICAgIHZpZXc6IFwiZm9ybVwiLFxuICAgICAgICAgICAgaWQ6IFwiaW1wb3J0X2Zvcm1cIixcbiAgICAgICAgICAgIGVsZW1lbnRzQ29uZmlnOiB7IGxhYmVsV2lkdGg6IDIwMCB9LFxuICAgICAgICAgICAgZWxlbWVudHM6IFtcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIHZpZXc6IFwidGV4dFwiLFxuICAgICAgICAgICAgICAgICAgICBsYWJlbDogXCJTZWNyZXRcIixcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJzZWNyZXRcIixcbiAgICAgICAgICAgICAgICAgICAgcGxhY2Vob2xkZXI6IFwiV2FsbGV0IHNlY3JldFwiXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIHZpZXc6IFwidGV4dFwiLFxuICAgICAgICAgICAgICAgICAgICBsYWJlbDogXCJOYW1lXCIsXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwibmFtZVwiLFxuICAgICAgICAgICAgICAgICAgICBwbGFjZWhvbGRlcjogXCJXYWxsZXQgbmFtZVwiXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgXVxuICAgICAgICB9O1xuXG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICB2aWV3OiBcIndpbmRvd1wiLFxuICAgICAgICAgICAgaGVhZDogXCJJbXBvcnQgd2FsbGV0XCIsXG4gICAgICAgICAgICBtb2RhbDogdHJ1ZSxcbiAgICAgICAgICAgIHdpZHRoOiA2MDAsXG4gICAgICAgICAgICBoZWlnaHQ6IDQwMCxcbiAgICAgICAgICAgIHBvc2l0aW9uOiBcImNlbnRlclwiLFxuICAgICAgICAgICAgYm9keToge1xuICAgICAgICAgICAgICAgIHJvd3M6IFtcbiAgICAgICAgICAgICAgICAgICAgaW5mbyxcbiAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmlldzogXCJidXR0b25cIixcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlOiBcIk9LXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBjc3M6IFwid2ViaXhfcHJpbWFyeVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgY2xpY2s6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgbmFtZSA9ICQkKCdpbXBvcnRfZm9ybScpLmdldFZhbHVlcygpLm5hbWVcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgc2VjcmV0ID0gJCQoJ2ltcG9ydF9mb3JtJykuZ2V0VmFsdWVzKCkuc2VjcmV0XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2cobmFtZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coc2VjcmV0KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLiRzY29wZS5pbXBvcnRXYWxsZXQobmFtZSwgc2VjcmV0KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIGluaXQoKSB7XG4gICAgICAgIHRoaXMuZm9ybSA9ICQkKFwiaW1wb3J0X2Zvcm1cIik7XG4gICAgfVxuXG4gICAgc2hvd0Zvcm0oKSB7XG4gICAgICAgIHRoaXMuZ2V0Um9vdCgpLnNob3coKTtcbiAgICB9XG5cbiAgICBpbXBvcnRXYWxsZXQobmFtZSwgc2VjcmV0KSB7XG4gICAgICAgIFxuICAgICAgICB3ZWJpeC5leHRlbmQodGhpcy5mb3JtLCB3ZWJpeC5Qcm9ncmVzc0Jhcik7XG4gICAgICAgIHRoaXMuZm9ybS5zaG93UHJvZ3Jlc3Moe1xuICAgICAgICAgICAgdHlwZTpcImljb25cIixcbiAgICAgICAgICAgIGhpZGU6IGZhbHNlXG4gICAgICAgIH0pO1xuICAgICAgICB3YWxsZXQuaW1wb3J0V2FsbGV0KG5hbWUsIHNlY3JldCkudGhlbihkYXRhID0+IHtcbiAgICAgICAgICAgIHdlYml4Lm1lc3NhZ2UoeyB0eXBlOiBcInN1Y2Nlc3NcIiwgdGV4dDogXCJXYWxsZXQgaW1wb3J0ZWQgc3VjY2Vzc2Z1bGx5XCIgfSk7XG4gICAgICAgICAgICB0aGlzLmZvcm0uc2hvd1Byb2dyZXNzKHtoaWRlOiB0cnVlfSk7XG4gICAgICAgICAgICB0aGlzLmZvcm0uY2xlYXIoKTsgXG4gICAgICAgICAgICB0aGlzLmZvcm0uZ2V0VG9wUGFyZW50VmlldygpLmhpZGUoKTtcbiAgICAgICAgICAgIHRoaXMuYXBwLnJlZnJlc2goKVxuICAgICAgICB9KS5jYXRjaChlcnJvciA9PiB7XG4gICAgICAgICAgICB3ZWJpeC5tZXNzYWdlKHsgdHlwZTogXCJlcnJvclwiLCB0ZXh0OiBcIkNvdWxkIG5vdCBpbXBvcnQgd2FsbGV0XCIgfSk7XG4gICAgICAgICAgICB0aGlzLmZvcm0uc2hvd1Byb2dyZXNzKHtoaWRlOiB0cnVlfSk7XG4gICAgICAgICAgICB0aGlzLmZvcm0uY2xlYXIoKTsgXG4gICAgICAgICAgICB0aGlzLmZvcm0uZ2V0VG9wUGFyZW50VmlldygpLmhpZGUoKTtcbiAgICAgICAgICAgIHRoaXMuYXBwLnJlZnJlc2goKVxuICAgICAgICB9KTtcbiAgICB9XG59XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc291cmNlcy92aWV3cy93YWxsZXRzTWFuYWdlci9pbXBvcnRGb3JtLmpzIiwiZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZUZpbHRlck9wdGlvbnMob2JqKSB7XG4gICAgLy8gcmV0dXJucyBhIG5ldyBvYmplY3QgYXMge2lkOiB2YWx1ZX0sIHVzZWQgYXMgZGF0YSB0YWJsZSBmaWx0ZXIgb3B0aW9uc1xuICAgIC8vIG9iajogY2FuIGJlIGFuIGFycmF5IG9yIGEgbWFwcGluZyBvYmplY3RcblxuICAgIGlmIChvYmogaW5zdGFuY2VvZiBBcnJheSkge1xuICAgICAgICByZXR1cm4gb2JqLm1hcCgodmFsdWUsIGluZGV4KSA9PiB7XG4gICAgICAgICAgICByZXR1cm4geyBpZDogaW5kZXgsIHZhbHVlOiB2YWx1ZSB9XG4gICAgICAgIH0pO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIC8vIGFzc3VtZSBpdCdzIGp1c3QgYSBtYXBwaW5nIG90aGVyd2lzZVxuICAgICAgICByZXR1cm4gT2JqZWN0LmtleXMob2JqKS5tYXAoa2V5ID0+IHtcbiAgICAgICAgICAgIHJldHVybiB7IGlkOiBrZXksIHZhbHVlOiBvYmpba2V5XSB9XG4gICAgICAgIH0pO1xuICAgIH1cblxuXG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zb3VyY2VzL2NvbW1vbi9maWx0ZXJzLmpzIiwiaW1wb3J0IHsgU2VydmljZSB9IGZyb20gXCIuLi9jb21tb24vYXBpXCI7XG5cbmNvbnN0IEJBU0VfVVJMID0gXCIvemVyb2JvdC9hZG1pbi9hY3RvcnMvcGFja2FnZV9tYW5hZ2VyXCI7XG5cblxuY2xhc3MgUGFja2FnZXNTZXJ2aWNlIGV4dGVuZHMgU2VydmljZSB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHN1cGVyKEJBU0VfVVJMKTtcbiAgICB9XG5cbiAgICBnZXRTdGF0dXMobmFtZXMpIHtcbiAgICAgICAgLy8gcG9zdCBjYWxsIHRvIHNlbmQgYXJncyBhcyBqc29uXG4gICAgICAgIHJldHVybiB0aGlzLnBvc3RDYWxsKFwicGFja2FnZXNfZ2V0X3N0YXR1c1wiLCB7XG4gICAgICAgICAgICBuYW1lczogbmFtZXNcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgbGlzdChvcHRzKSB7XG4gICAgICAgIG9wdHMgPSBvcHRzIHx8IHt9O1xuICAgICAgICByZXR1cm4gdGhpcy5nZXRDYWxsKFwicGFja2FnZXNfbGlzdFwiKTtcbiAgICB9XG5cbiAgICBhZGQocGF0aCwgZ2l0VXJsKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnBvc3RDYWxsKFwicGFja2FnZV9hZGRcIiwge1xuICAgICAgICAgICAgcGF0aDogcGF0aCxcbiAgICAgICAgICAgIGdpdF91cmw6IGdpdFVybFxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBkZWxldGUocGFja2FnZU5hbWUpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucG9zdENhbGwoXCJwYWNrYWdlX2RlbGV0ZVwiLCB7IG5hbWU6IHBhY2thZ2VOYW1lIH0pO1xuXG4gICAgfVxuXG4gICAgc3RhcnQocGFja2FnZU5hbWUpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucG9zdENhbGwoXCJwYWNrYWdlX3N0YXJ0XCIsIHsgbmFtZTogcGFja2FnZU5hbWUgfSk7XG4gICAgfVxuXG4gICAgc3RvcChwYWNrYWdlTmFtZSkge1xuICAgICAgICByZXR1cm4gdGhpcy5wb3N0Q2FsbChcInBhY2thZ2Vfc3RvcFwiLCB7IG5hbWU6IHBhY2thZ2VOYW1lIH0pO1xuXG4gICAgfVxuXG4gICAgZGlzYWJsZShwYWNrYWdlTmFtZSkge1xuICAgICAgICByZXR1cm4gdGhpcy5wb3N0Q2FsbChcInBhY2thZ2VfZGlzYWJsZVwiLCB7IG5hbWU6IHBhY2thZ2VOYW1lIH0pO1xuXG4gICAgfVxuXG4gICAgZW5hYmxlKHBhY2thZ2VOYW1lKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnBvc3RDYWxsKFwicGFja2FnZV9lbmFibGVcIiwgeyBuYW1lOiBwYWNrYWdlTmFtZSB9KTtcbiAgICB9XG59XG5cblxuZXhwb3J0IGNvbnN0IHBhY2thZ2VzID0gbmV3IFBhY2thZ2VzU2VydmljZSgpO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc291cmNlcy9zZXJ2aWNlcy9wYWNrYWdlcy5qcyIsImltcG9ydCB7IEpldFZpZXcgfSBmcm9tIFwid2ViaXgtamV0XCI7XG5pbXBvcnQgeyBoZWFsdGggfSBmcm9tIFwiLi4vLi4vc2VydmljZXMvaGVhbHRoXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIERpc2tTcGFjZVZpZXcgZXh0ZW5kcyBKZXRWaWV3IHtcbiAgICBjb25maWcoKSB7XG4gICAgICAgIGNvbnN0IGRpc2tTcGFjZSA9IHtcbiAgICAgICAgICAgIGlkOiBcImRpc2tTcGFjZVwiLFxuICAgICAgICAgICAgcmVzcG9uc2l2ZTogdHJ1ZSxcbiAgICAgICAgICAgIHZpZXc6IFwibGlzdFwiLFxuICAgICAgICAgICAgdHlwZToge1xuICAgICAgICAgICAgICAgIGhlaWdodDogNjAsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgdGVtcGxhdGU6IGBcbiAgICAgICAgICAgIDxwPjxmb250IHNpemU9XCIzXCI+PGI+I2tleSM6IDwvYj48L2ZvbnQ+IDxmb250IHNpemU9XCIzXCI+I3ZhbHVlIzwvZm9udD48L3A+XG4gICAgICAgICAgICBgXG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgdHlwZTogXCJzcGFjZVwiLFxuICAgICAgICAgICAgcm93czogW3tcbiAgICAgICAgICAgICAgICB0ZW1wbGF0ZTogXCI8ZGl2IHN0eWxlPSd3aWR0aDphdXRvO3RleHQtYWxpZ246Y2VudGVyJz48aDM+RGlzayBTcGFjZTxoMy8+PC9kaXY+XCIsXG4gICAgICAgICAgICAgICAgaGVpZ2h0OiA1MFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBkaXNrU3BhY2VcbiAgICAgICAgICAgIF1cbiAgICAgICAgfVxuICAgIH1cblxuXG4gICAgaW5pdCgpIHtcbiAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xuXG4gICAgICAgIHRoaXMuZGlza0luZm8gPSB0aGlzLiQkKFwiZGlza1NwYWNlXCIpO1xuXG4gICAgICAgIGhlYWx0aC5nZXREaXNrU3BhY2UoKS50aGVuKGRhdGEgPT4ge1xuICAgICAgICAgICAgZGF0YSA9IGRhdGEuanNvbigpO1xuXG4gICAgICAgICAgICBzZWxmLmRpc2tJbmZvLmFkZCh7XG4gICAgICAgICAgICAgICAga2V5OiBcIlVzZWRcIixcbiAgICAgICAgICAgICAgICB2YWx1ZTogZGF0YS51c2VkICsgXCIgR0JcIlxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBzZWxmLmRpc2tJbmZvLmFkZCh7XG4gICAgICAgICAgICAgICAga2V5OiBcIkZyZWVcIixcbiAgICAgICAgICAgICAgICB2YWx1ZTogZGF0YS5mcmVlICsgXCIgR0JcIlxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBzZWxmLmRpc2tJbmZvLmFkZCh7XG4gICAgICAgICAgICAgICAga2V5OiBcIlRvdGFsXCIsXG4gICAgICAgICAgICAgICAgdmFsdWU6IGRhdGEudG90YWwgKyBcIiBHQlwiXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHNlbGYuZGlza0luZm8uYWRkKHtcbiAgICAgICAgICAgICAgICBrZXk6IFwiUGVyY2VudFwiLFxuICAgICAgICAgICAgICAgIHZhbHVlOiBkYXRhLnBlcmNlbnQgKyBcIiAlXCJcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9XG5cbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NvdXJjZXMvdmlld3MvZGFzaC9kaXNrU3BhY2UuanMiLCJpbXBvcnQgeyBKZXRWaWV3IH0gZnJvbSBcIndlYml4LWpldFwiO1xuaW1wb3J0IHsgaGVhbHRoIH0gZnJvbSBcIi4uLy4uL3NlcnZpY2VzL2hlYWx0aFwiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBoZWFsdGhJbmZvVmlldyBleHRlbmRzIEpldFZpZXcge1xuICAgIGNvbmZpZygpIHtcbiAgICAgICAgY29uc3QgaGVhbHRoSW5mbyA9IHtcbiAgICAgICAgICAgIGlkOiBcImhlYWx0aEluZm9cIixcbiAgICAgICAgICAgIHJlc3BvbnNpdmU6IHRydWUsXG4gICAgICAgICAgICB2aWV3OiBcImxpc3RcIixcbiAgICAgICAgICAgIHJlc3BvbnNpdmU6IHRydWUsXG4gICAgICAgICAgICB0eXBlOiB7XG4gICAgICAgICAgICAgICAgaGVpZ2h0OiA2MCxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB0ZW1wbGF0ZTogYFxuICAgICAgICAgICAgPHA+PGZvbnQgc2l6ZT1cIjNcIj48Yj4ja2V5IzogPC9iPjwvZm9udD4gI3ZhbHVlIzwvcD5cbiAgICAgICAgICAgIGBcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICB0eXBlOiBcInNwYWNlXCIsXG4gICAgICAgICAgICByb3dzOiBbe1xuICAgICAgICAgICAgICAgIHRlbXBsYXRlOiBcIjxkaXYgc3R5bGU9J3dpZHRoOmF1dG87dGV4dC1hbGlnbjpjZW50ZXInPjxoMz5IZWFsdGggQ2hlY2tzPGgzLz48L2Rpdj5cIixcbiAgICAgICAgICAgICAgICBoZWlnaHQ6IDUwXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIGhlYWx0aEluZm9dXG4gICAgICAgIH1cbiAgICB9XG4gICAgaW5pdCh2aWV3KSB7XG4gICAgICAgIHZhciBzZWxmID0gdGhpcztcblxuICAgICAgICB0aGlzLmhlYWx0aEluZm8gPSB0aGlzLiQkKFwiaGVhbHRoSW5mb1wiKTtcblxuICAgICAgICBoZWFsdGguZ2V0SGVhbHRoKCkudGhlbihkYXRhID0+IHtcbiAgICAgICAgICAgIGRhdGEgPSBkYXRhLmpzb24oKTtcblxuICAgICAgICAgICAgaWYgKGRhdGEuYmNkYiA9PT0gXCJPS1wiKSB7XG4gICAgICAgICAgICAgICAgc2VsZi5oZWFsdGhJbmZvLmFkZCh7XG4gICAgICAgICAgICAgICAgICAgIGtleTogXCJCQ0RCIFN0YXR1c1wiLFxuICAgICAgICAgICAgICAgICAgICB2YWx1ZTogYDxzcGFuIGNsYXNzPSd3ZWJpeF9pY29uIHd4aS1jaGVja2JveC1tYXJrZWQnIHN0eWxlPVwiY29sb3I6Z3JlZW5cIj5PSzwvc3Bhbj5gXG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChkYXRhLmJjZGIgPT09IFwiRXJyb3JcIikge1xuICAgICAgICAgICAgICAgIHNlbGYuaGVhbHRoSW5mby5hZGQoe1xuICAgICAgICAgICAgICAgICAgICBrZXk6IFwiQkNEQlwiLFxuICAgICAgICAgICAgICAgICAgICB2YWx1ZTogYDxzcGFuIGNsYXNzPSd3ZWJpeF9pY29uIHd4aS1jbG9zZS1jaXJjbGUnIHN0eWxlPVwiY29sb3I6cmVkXCI+RXJyb3I8L3NwYW4+YFxuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoZGF0YS53aWtpcyA9PT0gXCJPS1wiKSB7XG4gICAgICAgICAgICAgICAgc2VsZi5oZWFsdGhJbmZvLmFkZCh7XG4gICAgICAgICAgICAgICAgICAgIGtleTogXCJXaWtpc1wiLFxuICAgICAgICAgICAgICAgICAgICB2YWx1ZTogYDxzcGFuIGNsYXNzPSd3ZWJpeF9pY29uIHd4aS1jaGVja2JveC1tYXJrZWQnIHN0eWxlPVwiY29sb3I6Z3JlZW5cIj5PSzwvc3Bhbj5gXG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChkYXRhLndpa2lzID09PSBcIkVycm9yXCIpIHtcbiAgICAgICAgICAgICAgICBzZWxmLmhlYWx0aEluZm8uYWRkKHtcbiAgICAgICAgICAgICAgICAgICAga2V5OiBcIldpa2lzXCIsXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlOiBgPHNwYW4gY2xhc3M9J3dlYml4X2ljb24gd3hpLWNsb3NlLWNpcmNsZScgc3R5bGU9XCJjb2xvcjpyZWRcIj5FcnJvcjwvc3Bhbj5gXG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChkYXRhLmNvZGVzZXJ2ZXIgPT09IFwiT0tcIikge1xuICAgICAgICAgICAgICAgIHNlbGYuaGVhbHRoSW5mby5hZGQoe1xuICAgICAgICAgICAgICAgICAgICBrZXk6IFwiQ29kZXNlcnZlclwiLFxuICAgICAgICAgICAgICAgICAgICB2YWx1ZTogYDxzcGFuIGNsYXNzPSd3ZWJpeF9pY29uIHd4aS1jaGVja2JveC1tYXJrZWQnIHN0eWxlPVwiY29sb3I6Z3JlZW5cIj5PSzwvc3Bhbj5gXG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChkYXRhLmNvZGVzZXJ2ZXIgPT09IFwiRXJyb3JcIikge1xuICAgICAgICAgICAgICAgIHNlbGYuaGVhbHRoSW5mby5hZGQoe1xuICAgICAgICAgICAgICAgICAgICBrZXk6IFwiQ29kZXNlcnZlclwiLFxuICAgICAgICAgICAgICAgICAgICB2YWx1ZTogYDxzcGFuIGNsYXNzPSd3ZWJpeF9pY29uIHd4aS1jbG9zZS1jaXJjbGUnIHN0eWxlPVwiY29sb3I6cmVkXCI+RXJyb3I8L3NwYW4+YFxuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoZGF0YS5qdXB5dGVyID09PSBcIk9LXCIpIHtcbiAgICAgICAgICAgICAgICBzZWxmLmhlYWx0aEluZm8uYWRkKHtcbiAgICAgICAgICAgICAgICAgICAga2V5OiBcIkp1cHl0ZXJcIixcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU6IGA8c3BhbiBjbGFzcz0nd2ViaXhfaWNvbiB3eGktY2hlY2tib3gtbWFya2VkJyBzdHlsZT1cImNvbG9yOmdyZWVuXCI+T0s8L3NwYW4+YFxuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoZGF0YS5qdXB5dGVyID09PSBcIkVycm9yXCIpIHtcbiAgICAgICAgICAgICAgICBzZWxmLmhlYWx0aEluZm8uYWRkKHtcbiAgICAgICAgICAgICAgICAgICAga2V5OiBcIkp1cHl0ZXJcIixcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU6IGA8c3BhbiBjbGFzcz0nd2ViaXhfaWNvbiB3eGktY2xvc2UtY2lyY2xlJyBzdHlsZT1cImNvbG9yOnJlZFwiPkVycm9yPC9zcGFuPmBcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgIH1cblxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc291cmNlcy92aWV3cy9kYXNoL2hlYWx0aC5qcyIsImltcG9ydCB7IEpldFZpZXcgfSBmcm9tIFwid2ViaXgtamV0XCI7XG5pbXBvcnQgeyBoZWFsdGggfSBmcm9tIFwiLi4vLi4vc2VydmljZXMvaGVhbHRoXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEpTWEluZm9WaWV3IGV4dGVuZHMgSmV0VmlldyB7XG4gICAgY29uZmlnKCkge1xuICAgICAgICBjb25zdCBpbmZvID0ge1xuICAgICAgICAgICAgaWQ6IFwianN4SW5mb1wiLFxuICAgICAgICAgICAgcmVzcG9uc2l2ZTogdHJ1ZSxcbiAgICAgICAgICAgIHZpZXc6IFwibGlzdFwiLFxuICAgICAgICAgICAgcmVzcG9uc2l2ZTogdHJ1ZSxcbiAgICAgICAgICAgIHR5cGU6IHtcbiAgICAgICAgICAgICAgICBoZWlnaHQ6IDYwLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHRlbXBsYXRlOiBgXG4gICAgICAgICAgICAgICAgPHA+PGZvbnQgc2l6ZT1cIjNcIj48Yj4ja2V5IzogPC9iPjwvZm9udD4gPGZvbnQgc2l6ZT1cIjNcIj4jdmFsdWUjPC9mb250PjwvcD5cbiAgICAgICAgICAgIGBcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICB0eXBlOiBcInNwYWNlXCIsXG4gICAgICAgICAgICByb3dzOiBbe1xuICAgICAgICAgICAgICAgIHRlbXBsYXRlOiBcIjxkaXYgc3R5bGU9J3dpZHRoOmF1dG87dGV4dC1hbGlnbjpjZW50ZXInPjxoMz5KU1ggSW5mbzxoMy8+PC9kaXY+XCIsXG4gICAgICAgICAgICAgICAgaGVpZ2h0OiA1MFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBpbmZvXG4gICAgICAgICAgICBdXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBpbml0KCkge1xuICAgICAgICBjb25zdCBzZWxmID0gdGhpcztcblxuICAgICAgICB0aGlzLmluZm8gPSB0aGlzLiQkKFwianN4SW5mb1wiKTtcblxuICAgICAgICBoZWFsdGguZ2V0SWRlbnRpdHkoKS50aGVuKGRhdGEgPT4ge1xuICAgICAgICAgICAgc2VsZi5pbmZvLmFkZCh7XG4gICAgICAgICAgICAgICAga2V5OiBcIjNib3RcIixcbiAgICAgICAgICAgICAgICB2YWx1ZTogZGF0YS50ZXh0KClcbiAgICAgICAgICAgIH0pXG4gICAgICAgIH0pXG5cbiAgICAgICAgaGVhbHRoLmdldE5ldHdvcmtJbmZvKCkudGhlbihkYXRhID0+IHtcbiAgICAgICAgICAgIGRhdGEgPSBkYXRhLmpzb24oKTtcbiAgICAgICAgICAgIHNlbGYuaW5mby5hZGQoe1xuICAgICAgICAgICAgICAgIGtleTogXCJJUFwiLFxuICAgICAgICAgICAgICAgIHZhbHVlOiBkYXRhLmlwLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBpZiAoZGF0YS5pcDYubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgc2VsZi5pbmZvLmFkZCh7XG4gICAgICAgICAgICAgICAgICAgIGtleTogXCJJUHY2XCIsXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlOiBkYXRhLmlwNlxuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHNlbGYuaW5mby5hZGQoe1xuICAgICAgICAgICAgICAgICAgICBrZXk6IFwiSVB2NlwiLFxuICAgICAgICAgICAgICAgICAgICB2YWx1ZTogXCJOb3Qgc2V0XCJcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICBoZWFsdGguZ2V0SnN4VmVyc2lvbigpLnRoZW4oZGF0YSA9PiB7XG4gICAgICAgICAgICBzZWxmLmluZm8uYWRkKHtcbiAgICAgICAgICAgICAgICBrZXk6IFwiSlNYIFZlcnNpb25cIixcbiAgICAgICAgICAgICAgICB2YWx1ZTogZGF0YS50ZXh0KClcbiAgICAgICAgICAgIH0pXG4gICAgICAgIH0pXG5cbiAgICB9XG5cbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NvdXJjZXMvdmlld3MvZGFzaC9qc3hJbmZvLmpzIiwiaW1wb3J0IHtcbiAgICBKZXRWaWV3XG59IGZyb20gXCJ3ZWJpeC1qZXRcIjtcblxuaW1wb3J0IFByb2Nlc3Nlc0NoaWxkVmlldyBmcm9tIFwiLi9wcm9jZXNzZXNDaGlsZFZpZXdcIjtcbmltcG9ydCB7XG4gICAgaGVhbHRoXG59IGZyb20gXCIuLi8uLi9zZXJ2aWNlcy9oZWFsdGhcIjtcblxuY29uc3QgY29sb3JzRGF0YXNldCA9IFt7XG4gICAgICAgIGNvbG9yOiBcIiNlZTM2MzlcIlxuICAgIH0sXG4gICAge1xuICAgICAgICBjb2xvcjogXCIjZWU5ZTM2XCJcbiAgICB9LFxuICAgIHtcbiAgICAgICAgY29sb3I6IFwiI2VlZWEzNlwiXG4gICAgfSxcbiAgICB7XG4gICAgICAgIGNvbG9yOiBcIiNhOWVlMzZcIlxuICAgIH0sXG4gICAge1xuICAgICAgICBjb2xvcjogXCIjMzZkM2VlXCJcbiAgICB9LFxuICAgIHtcbiAgICAgICAgY29sb3I6IFwiIzM2N2ZlZVwiXG4gICAgfSxcbiAgICB7XG4gICAgICAgIGNvbG9yOiBcIiM5YjM2ZWVcIlxuICAgIH1cbl07XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFByb2Nlc3Nlc1ZpZXcgZXh0ZW5kcyBKZXRWaWV3IHtcblxuICAgIGNvbmZpZygpIHtcbiAgICAgICAgY29uc3QgcHJvY2Vzc2VzSW5mbyA9IHtcbiAgICAgICAgICAgIGlkOiBcInByb2Nlc3NcIixcbiAgICAgICAgICAgIHZpZXc6IFwiY2hhcnRcIixcbiAgICAgICAgICAgIHJlc3BvbnNpdmU6IHRydWUsXG4gICAgICAgICAgICB0eXBlOiBcInBpZVwiLFxuICAgICAgICAgICAgd2lkdGg6IDUwMCxcbiAgICAgICAgICAgIGhlaWdodDogNDAwLFxuICAgICAgICAgICAgY29sb3I6IFwiI2NvbG9yI1wiLFxuICAgICAgICAgICAgdmFsdWU6IFwiI3JzcyNcIixcbiAgICAgICAgICAgIGxhYmVsOiBcIjxoND4jbmFtZSM8L2g0PlwiLFxuICAgICAgICAgICAgcGllSW5uZXJUZXh0OiBcIjxoND4jcnNzIzwvaDQ+XCIsXG4gICAgICAgICAgICBkYXRhOiBcIiNjaGFydHNEYXRhI1wiLFxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHR5cGU6IFwic3BhY2VcIixcbiAgICAgICAgICAgIHJvd3M6IFt7XG4gICAgICAgICAgICAgICAgICAgIHRlbXBsYXRlOiBcIjxkaXYgc3R5bGU9J3dpZHRoOmF1dG87dGV4dC1hbGlnbjpjZW50ZXInPjxoMz5SdW5uaW5nIHByb2Nlc3NlcyBtZW1vcnkgdXNhZ2UgKFJTUykgKE1CKTxoMy8+PC9kaXY+XCIsXG4gICAgICAgICAgICAgICAgICAgIGhlaWdodDogNTBcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHByb2Nlc3Nlc0luZm8sXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICB2aWV3OiBcImJ1dHRvblwiLFxuICAgICAgICAgICAgICAgICAgICBpZDogXCJzaG93X2FsbFwiLFxuICAgICAgICAgICAgICAgICAgICB2YWx1ZTogXCJTaG93IEFsbFwiLFxuICAgICAgICAgICAgICAgICAgICBhbGlnbjogXCJjZW50ZXJcIixcbiAgICAgICAgICAgICAgICAgICAgY3NzOiBcIndlYml4X3ByaW1hcnlcIixcbiAgICAgICAgICAgICAgICAgICAgaW5wdXRXaWR0aDogMTAwLFxuICAgICAgICAgICAgICAgICAgICBjbGljazogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy4kc2NvcGUuY2hpbGR2aWV3LnNob3dGb3IodGhpcy4kc2NvcGUucHJvY2Vzc2VzTGlzdClcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgXVxuICAgICAgICB9XG4gICAgfVxuXG5cbiAgICBpbml0KHZpZXcpIHtcbiAgICAgICAgY29uc3Qgc2VsZiA9IHRoaXM7XG5cbiAgICAgICAgdGhpcy5wcm9jZXNzZXNMaXN0ID0gW11cblxuICAgICAgICB0aGlzLnJ1blByb2Nlc3NJbmZvID0gdGhpcy4kJChcInByb2Nlc3NcIik7XG5cbiAgICAgICAgc2VsZi5jaGlsZHZpZXcgPSBzZWxmLnVpKFByb2Nlc3Nlc0NoaWxkVmlldyk7XG5cbiAgICAgICAgaGVhbHRoLmdldFJ1bm5pbmdQcm9jZXNzZXMoKS50aGVuKGRhdGEgPT4ge1xuICAgICAgICAgICAgdmFyIGNoYXJ0c0RhdGEgPSBbXVxuXG4gICAgICAgICAgICBkYXRhID0gZGF0YS5qc29uKCk7XG4gICAgICAgICAgICBzZWxmLnByb2Nlc3Nlc0xpc3QgPSBkYXRhLnByb2Nlc3Nlc19saXN0XG5cbiAgICAgICAgICAgIC8vIG1lbW9yeSB1c2FnZVxuICAgICAgICAgICAgc2VsZi5tZW1vcnlVc2FnZSA9IGRhdGEubWVtb3J5X3VzYWdlXG4gICAgICAgICAgICBzZWxmLnRvdGFsTWVtb3J5ID0gc2VsZi5tZW1vcnlVc2FnZS50b3RhbF9tZW1cbiAgICAgICAgICAgIHNlbGYucGVyY2VudCA9IHNlbGYubWVtb3J5VXNhZ2UudXNhZ2VfcGVyY2VudFxuXG5cbiAgICAgICAgICAgIHNlbGYucnVuUHJvY2Vzc0luZm8uZGVmaW5lKFwibGVnZW5kXCIsIHtcbiAgICAgICAgICAgICAgICBsYXlvdXQ6IFwieFwiLFxuICAgICAgICAgICAgICAgIHdpZHRoOiAxMTAsXG4gICAgICAgICAgICAgICAgdmFsdWVzOiBbe1xuICAgICAgICAgICAgICAgICAgICAgICAgdGV4dDogYDxiPlRvdGFsIG1lbW9yeTogPC9iPiR7c2VsZi50b3RhbE1lbW9yeX1HQmBcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGV4dDogYDxiPlVzYWdlOiA8L2I+JHtzZWxmLnBlcmNlbnR9JWBcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICBzZWxmLnJ1blByb2Nlc3NJbmZvLnJlZnJlc2goKVxuXG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHNlbGYucHJvY2Vzc2VzTGlzdC5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIC8vQnJlYWsgd2hlbiB0aGVyZSBpcyBubyBtb3JlIGNvbG9yc1xuICAgICAgICAgICAgICAgIGlmIChpID09IGNvbG9yc0RhdGFzZXQubGVuZ3RoKVxuICAgICAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgICAgIHZhciB0ZW1wID0ge1xuICAgICAgICAgICAgICAgICAgICBcImNvbG9yXCI6IGNvbG9yc0RhdGFzZXRbaV0uY29sb3IsXG4gICAgICAgICAgICAgICAgICAgIFwibmFtZVwiOiBzZWxmLnByb2Nlc3Nlc0xpc3RbaV0ubmFtZSxcbiAgICAgICAgICAgICAgICAgICAgXCJyc3NcIjogTWF0aC5jZWlsKHNlbGYucHJvY2Vzc2VzTGlzdFtpXS5yc3MpLFxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBjaGFydHNEYXRhLnB1c2godGVtcClcbiAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhteUFycmF5W2ldKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgc2VsZi5ydW5Qcm9jZXNzSW5mby5wYXJzZSh7XG4gICAgICAgICAgICAgICAgZGF0YTogY2hhcnRzRGF0YSxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9XG5cbn1cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zb3VyY2VzL3ZpZXdzL2Rhc2gvcHJvY2Vzc2VzLmpzIiwiaW1wb3J0IHsgSmV0VmlldyB9IGZyb20gXCJ3ZWJpeC1qZXRcIjtcblxuaW1wb3J0IHsgaGVhbHRoIH0gZnJvbSBcIi4uLy4uL3NlcnZpY2VzL2hlYWx0aFwiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBydW5uaW5nUG9ydHNWaWV3IGV4dGVuZHMgSmV0VmlldyB7XG4gICAgY29uZmlnKCkge1xuICAgICAgICBjb25zdCBwb3J0cyA9IHtcbiAgICAgICAgICAgIGlkOiBcInJ1bm5pbmdQb3J0c1wiLFxuICAgICAgICAgICAgdmlldzogXCJkYXRhdGFibGVcIixcbiAgICAgICAgICAgIHJlc3BvbnNpdmU6IHRydWUsXG4gICAgICAgICAgICBhdXRvQ29uZmlnOiB0cnVlLFxuICAgICAgICAgICAgdHlwZToge1xuICAgICAgICAgICAgICAgIGhlaWdodDogMjAwLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHRlbXBsYXRlOiBcIlJ1bm5pbmcgUG9ydHNcIixcbiAgICAgICAgICAgIHJlc2l6ZUNvbHVtbjogdHJ1ZSxcbiAgICAgICAgICAgIHNlbGVjdDogdHJ1ZSxcbiAgICAgICAgICAgIG11bHRpc2VsZWN0OiB0cnVlLFxuICAgICAgICAgICAgY3NzOiBcIndlYml4X2hlYWRlcl9ib3JkZXIgd2ViaXhfZGF0YV9ib3JkZXJcIixcbiAgICAgICAgICAgIGNvbHVtbnM6IFt7XG4gICAgICAgICAgICAgICAgaWQ6IFwiaW5kZXhcIixcbiAgICAgICAgICAgICAgICBoZWFkZXI6IFwiI1wiLFxuICAgICAgICAgICAgICAgIHNvcnQ6IFwiaW50XCIsXG4gICAgICAgICAgICAgICAgYXV0b3dpZHRoOiB0cnVlLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBpZDogXCJwb3J0X251bWJlclwiLFxuICAgICAgICAgICAgICAgIGhlYWRlcjogW1wiUG9ydCBOdW1iZXJcIiwge1xuICAgICAgICAgICAgICAgICAgICBjb250ZW50OiBcInRleHRGaWx0ZXJcIlxuICAgICAgICAgICAgICAgIH0sXSxcbiAgICAgICAgICAgICAgICBzb3J0OiBcInN0cmluZ1wiXG4gICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgaWQ6IFwicHJvY2Vzc1wiLFxuICAgICAgICAgICAgICAgIGhlYWRlcjogW1wiUHJvY2Vzc1wiLCB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnRlbnQ6IFwidGV4dEZpbHRlclwiXG4gICAgICAgICAgICAgICAgfV0sXG4gICAgICAgICAgICAgICAgc29ydDogXCJzdHJpbmdcIlxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgXSxcbiAgICAgICAgICAgIHNjaGVtZToge1xuICAgICAgICAgICAgICAgICRpbml0OiBmdW5jdGlvbiAob2JqKSB7XG4gICAgICAgICAgICAgICAgICAgIG9iai5pbmRleCA9IHRoaXMuY291bnQoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHR5cGU6IFwic3BhY2VcIixcbiAgICAgICAgICAgIHJvd3M6IFtcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIHRlbXBsYXRlOiBcIjxkaXYgc3R5bGU9J3dpZHRoOmF1dG87dGV4dC1hbGlnbjpjZW50ZXInPjxoMz5Qb3J0czxoMy8+PC9kaXY+XCIsXG4gICAgICAgICAgICAgICAgICAgIGhlaWdodDogNTBcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHBvcnRzXG4gICAgICAgICAgICBdXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBpbml0KCkge1xuICAgICAgICBjb25zdCBzZWxmID0gdGhpcztcblxuICAgICAgICBzZWxmLnBvcnRzVGFibGUgPSB0aGlzLiQkKFwicnVubmluZ1BvcnRzXCIpO1xuICAgICAgICBoZWFsdGguZ2V0UnVubmluZ1BvcnRzKCkudGhlbihkYXRhID0+IHtcbiAgICAgICAgICAgIHNlbGYucG9ydHNUYWJsZS5wYXJzZShkYXRhLmpzb24oKSk7XG4gICAgICAgIH0pO1xuICAgIH1cblxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc291cmNlcy92aWV3cy9kYXNoL3J1bm5pbmdQb3J0cy5qcyIsImltcG9ydCB7IEpldFZpZXcsIHBsdWdpbnMgfSBmcm9tIFwid2ViaXgtamV0XCI7XG5pbXBvcnQgeyBhdXRoIH0gZnJvbSBcIi4uL3NlcnZpY2VzL2F1dGhcIjtcblxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBUb3BWaWV3IGV4dGVuZHMgSmV0VmlldyB7XG4gICAgY29uZmlnKCkge1xuICAgICAgICBjb25zdCBoZWFkZXIgPSB7XG4gICAgICAgICAgICBjb2xzOiBbXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBpZDogXCJidXR0b25faGlkZV9tZW51XCIsXG4gICAgICAgICAgICAgICAgICAgIHZpZXc6IFwiaWNvblwiLCBpY29uOiBcIm1kaSBtZGktbWVudVwiLFxuICAgICAgICAgICAgICAgICAgICBjc3M6IFwiY3VzdG9tX2RhcmtcIiwgaGVpZ2h0OiA1OCxcbiAgICAgICAgICAgICAgICAgICAgY2xpY2s6IHRoaXMuaGlkZU1lbnUsXG4gICAgICAgICAgICAgICAgICAgIHRvb2x0aXA6IFwiSGlkZSBtZW51XCIsXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIGlkOiBcImhlYWRlclwiLFxuICAgICAgICAgICAgICAgICAgICB0eXBlOiBcImhlYWRlclwiLFxuICAgICAgICAgICAgICAgICAgICBjc3M6IFwiY3VzdG9tX2RhcmtcIiwgaGVpZ2h0OiA1OCxcbiAgICAgICAgICAgICAgICAgICAgdGVtcGxhdGU6IFwiQURNSU5cIixcbiAgICAgICAgICAgICAgICAgICAgYm9yZGVybGVzczogdHJ1ZSxcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgXVxuICAgICAgICB9O1xuXG4gICAgICAgIGNvbnN0IHNpZGViYXJEYXRhID0gW3tcbiAgICAgICAgICAgIGlkOiBcImRhc2hcIixcbiAgICAgICAgICAgIHZhbHVlOiBcIkRhc2hib2FyZFwiLFxuICAgICAgICAgICAgaWNvbjogXCJtZGkgbWRpLXZpZXctZGFzaGJvYXJkXCJcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgICAgaWQ6IFwid2lraXNcIixcbiAgICAgICAgICAgIHZhbHVlOiBcIlBhY2thZ2VzIERvY3NcIixcbiAgICAgICAgICAgIGljb246IFwibWRpIG1kaS1uZXdzcGFwZXJcIlxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgICBpZDogXCJhbGVydHNcIixcbiAgICAgICAgICAgIHZhbHVlOiBcIkFsZXJ0c1wiLFxuICAgICAgICAgICAgaWNvbjogXCJtZGkgbWRpLWJlbGwtYWxlcnRcIlxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgICBpZDogXCJsb2dzXCIsXG4gICAgICAgICAgICB2YWx1ZTogXCJMb2dzXCIsXG4gICAgICAgICAgICBpY29uOiBcIm1kaSBtZGktaGlzdG9yeVwiXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICAgIGlkOiBcIm15am9ic19tYWluXCIsXG4gICAgICAgICAgICB2YWx1ZTogXCJNeSBqb2JzXCIsXG4gICAgICAgICAgICBpY29uOiBcIm1kaSBtZGktYW5pbWF0aW9uLXBsYXlcIixcbiAgICAgICAgICAgIGRhdGE6IFt7XG4gICAgICAgICAgICAgICAgaWQ6IFwibXlqb2JzXCIsXG4gICAgICAgICAgICAgICAgaWNvbjogXCJtZGkgbWRpLWJvb2stb3BlblwiLFxuICAgICAgICAgICAgICAgIHZhbHVlOiBcIkpvYnNcIlxuICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIGlkOiBcIndvcmtlcnNcIixcbiAgICAgICAgICAgICAgICBpY29uOiBcIm1kaSBtZGktd29ya2VyXCIsXG4gICAgICAgICAgICAgICAgdmFsdWU6IFwiV29ya2Vyc1wiXG4gICAgICAgICAgICB9XVxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgICBpZDogXCJ0Zndpa2lzX21haW5cIixcbiAgICAgICAgICAgIHZhbHVlOiBcIlRGIFdpa2lzXCIsXG4gICAgICAgICAgICBpY29uOiBcIm1kaSBtZGktYW5pbWF0aW9uLXBsYXlcIixcbiAgICAgICAgICAgIGRhdGE6IFt7XG4gICAgICAgICAgICAgICAgaWQ6IFwidGZncmlkc2RrXCIsXG4gICAgICAgICAgICAgICAgaWNvbjogXCJtZGkgbWRpLWJvb2stb3BlblwiLFxuICAgICAgICAgICAgICAgIHZhbHVlOiBcIlRGR3JpZFNES1wiXG4gICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgaWQ6IFwidGhyZWVmb2xkXCIsXG4gICAgICAgICAgICAgICAgaWNvbjogXCJtZGkgbWRpLXdvcmtlclwiLFxuICAgICAgICAgICAgICAgIHZhbHVlOiBcIlRocmVlZm9sZFwiXG4gICAgICAgICAgICB9XVxuICAgICAgICB9LFxuXG4gICAgICAgIHtcbiAgICAgICAgICAgIGlkOiBcInBhY2thZ2VzXCIsXG4gICAgICAgICAgICB2YWx1ZTogXCJQYWNrYWdlc1wiLFxuICAgICAgICAgICAgaWNvbjogXCJtZGkgbWRpLXBhY2thZ2VcIlxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgICBpZDogXCJkZXBsb3llZFNvbHV0aW9uc1wiLFxuICAgICAgICAgICAgdmFsdWU6IFwiRGVwbG95ZWQgU29sdXRpb25zXCIsXG4gICAgICAgICAgICBpY29uOiBcIm1kaSBtZGktYW5pbWF0aW9uLXBsYXlcIlxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgICBpZDogXCJzb2x1dGlvbnNcIixcbiAgICAgICAgICAgIHZhbHVlOiBcIlNvbHV0aW9uc1wiLFxuICAgICAgICAgICAgaWNvbjogXCJtZGkgbWRpLWFuaW1hdGlvbi1wbGF5XCIsXG4gICAgICAgICAgICBkYXRhOiBbe1xuICAgICAgICAgICAgICAgIGlkOiBcIm5ldHdvcmtcIixcbiAgICAgICAgICAgICAgICB2YWx1ZTogJzxzcGFuPjxpbWcgY2xhc3M9XCJzb2x1dGlvbnMtaWNvblwiIHNyYz1cInN0YXRpYy9pbWcvbmV0d29yay5wbmdcIi8+TmV0d29yazwvc3Bhbj4nXG4gICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgaWQ6IFwidWJ1bnR1XCIsXG4gICAgICAgICAgICAgICAgdmFsdWU6ICc8c3Bhbj48aW1nIGNsYXNzPVwic29sdXRpb25zLWljb25cIiBzcmM9XCJzdGF0aWMvaW1nL3VidW50dS5wbmdcIi8+VWJ1bnR1PC9zcGFuPidcbiAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICBpZDogXCJmbGlzdFwiLFxuICAgICAgICAgICAgICAgIHZhbHVlOiAnPHNwYW4+PGltZyBjbGFzcz1cInNvbHV0aW9ucy1pY29uXCIgc3JjPVwic3RhdGljL2ltZy9mbGlzdC5wbmdcIi8+R2VuZXJpYyBmbGlzdDwvc3Bhbj4nXG4gICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgaWQ6IFwibWluaW9cIixcbiAgICAgICAgICAgICAgICB2YWx1ZTogJzxzcGFuPjxpbWcgY2xhc3M9XCJzb2x1dGlvbnMtaWNvblwiIHNyYz1cInN0YXRpYy9pbWcvbWluaW8ucG5nXCIvPk1pbmlvIC8gUzM8L3NwYW4+J1xuICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIGlkOiBcIms4c19jbHVzdGVyXCIsXG4gICAgICAgICAgICAgICAgdmFsdWU6ICc8c3Bhbj48aW1nIGNsYXNzPVwic29sdXRpb25zLWljb25cIiBzcmM9XCJzdGF0aWMvaW1nL2s4cy5wbmdcIi8+S3ViZXJuZXRlcyBjbHVzdGVyPC9zcGFuPidcbiAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICBpZDogXCJ3ZWJnYXRld2F5XCIsXG4gICAgICAgICAgICAgICAgdmFsdWU6ICdXZWIgR2F0ZXdheScsXG4gICAgICAgICAgICAgICAgaWNvbjogXCJtZGkgbWRpLW5ldHdvcmtcIlxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgXVxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgICBpZDogXCJ3YWxsZXRzTWFuYWdlclwiLFxuICAgICAgICAgICAgdmFsdWU6IFwiV2FsbGV0cyBNYW5hZ2VyXCIsXG4gICAgICAgICAgICBpY29uOiBcIm1kaSBtZGktd2FsbGV0XCJcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgICAgaWQ6IFwiY2FwYWNpdHlcIixcbiAgICAgICAgICAgIHZhbHVlOiBcIkNhcGFjaXR5XCIsXG4gICAgICAgICAgICBpY29uOiBcIm1kaSBtZGktc2VydmVyXCJcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgICAgaWQ6IFwiZmFybW1hbmFnZW1lbnRcIixcbiAgICAgICAgICAgIHZhbHVlOiBcIkZhcm0gTWFuYWdlbWVudFwiLFxuICAgICAgICAgICAgaWNvbjogXCJtZGkgbWRpLXNlcnZlclwiXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICAgIGlkOiBcInNka2V4YW1wbGVzXCIsXG4gICAgICAgICAgICB2YWx1ZTogXCJTREsgRXhhbXBsZXNcIixcbiAgICAgICAgICAgIGljb246IFwibWRpIG1kaS1maWxlXCJcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgICAgaWQ6IFwiY29kZXNlcnZlclwiLFxuICAgICAgICAgICAgdmFsdWU6IFwiQ29kZXNlcnZlclwiLFxuICAgICAgICAgICAgaWNvbjogXCJtZGkgbWRpLWNvZGUtdGFnc1wiXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICAgIGlkOiBcImp1cHl0ZXJcIixcbiAgICAgICAgICAgIHZhbHVlOiBcIlRGIFNpbXVsYXRvclwiLFxuICAgICAgICAgICAgaWNvbjogXCJtZGkgbWRpLXBsYXlcIlxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgICBpZDogXCJzZXR0aW5nc1wiLFxuICAgICAgICAgICAgdmFsdWU6IFwiU2V0dGluZ3NcIixcbiAgICAgICAgICAgIGljb246IFwibWRpIG1kaS1zZXR0aW5nc1wiXG4gICAgICAgIH0sXG4gICAgICAgIF1cblxuICAgICAgICBjb25zdCByZXNwb25zZSA9IHdlYml4LmFqYXgoKS5zeW5jKCkuZ2V0KFwiL3plcm9ib3QvYWRtaW4vYWN0b3JzL3BhY2thZ2VfbWFuYWdlci9wYWNrYWdlc19saXN0XCIsIHsgaGFzX2Zyb250ZW5kX2FyZ3M6IHRydWUsIHN0YXR1czogXCJpbnN0YWxsZWRcIiB9KTtcbiAgICAgICAgbGV0IHBhY2thZ2VzO1xuXG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBwYWNrYWdlcyA9IEpTT04ucGFyc2UocmVzcG9uc2UucmVzcG9uc2VUZXh0KS5wYWNrYWdlcztcbiAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICAgIHBhY2thZ2VzID0gW107XG4gICAgICAgIH1cblxuICAgICAgICBmb3IgKGNvbnN0IHAgb2YgcGFja2FnZXMpIHtcbiAgICAgICAgICAgIHNpZGViYXJEYXRhLnB1c2gocC5mcm9udGVuZF9hcmdzKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IHNpZGViYXIgPSB7XG4gICAgICAgICAgICBsb2NhbElkOiBcIm1lbnVcIixcbiAgICAgICAgICAgIHZpZXc6IFwic2lkZWJhclwiLFxuICAgICAgICAgICAgY3NzOiBcIndlYml4X2RhcmtcIixcbiAgICAgICAgICAgIHdpZHRoOiAyMDAsXG4gICAgICAgICAgICBkYXRhOiBzaWRlYmFyRGF0YSxcbiAgICAgICAgfTtcblxuICAgICAgICBjb25zdCB0b29sYmFyID0ge1xuICAgICAgICAgICAgdmlldzogXCJ0b29sYmFyXCIsXG4gICAgICAgICAgICBwYWRkaW5nOiA5LFxuICAgICAgICAgICAgaGVpZ2h0OiA1OCxcbiAgICAgICAgICAgIGNvbHM6IFt7XG4gICAgICAgICAgICAgICAgaWQ6IFwiYnV0dG9uX3Nob3dfbWVudVwiLFxuICAgICAgICAgICAgICAgIHZpZXc6IFwiaWNvblwiLFxuICAgICAgICAgICAgICAgIGljb246IFwibWRpIG1kaS1tZW51XCIsXG4gICAgICAgICAgICAgICAgY2xpY2s6IHRoaXMuc2hvd01lbnUsXG4gICAgICAgICAgICAgICAgaGlkZGVuOiB0cnVlLCAvLyBoaWRkZW4gYnkgZGVmYXVsdFxuICAgICAgICAgICAgICAgIHRvb2x0aXA6IFwiU2hvdyBtZW51XCIsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHZpZXc6IFwidGVtcGxhdGVcIixcbiAgICAgICAgICAgICAgICB0ZW1wbGF0ZTogYDxpbWcgY2xhc3M9XCJ3ZWJpeF9pY29uXCIgc3JjPVwic3RhdGljL2ltZy8zYm90LnBuZ1wiLz5gLFxuICAgICAgICAgICAgICAgIGJvcmRlcmxlc3M6IHRydWUsXG4gICAgICAgICAgICAgICAgaGVpZ2h0OiA0MCxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgaWQ6IFwidXNlcm5hbWVfbGFiZWxcIixcbiAgICAgICAgICAgICAgICB2aWV3OiBcImxhYmVsXCIsXG4gICAgICAgICAgICAgICAgbGFiZWw6IFwidXNlcm5hbWVcIixcbiAgICAgICAgICAgICAgICBib3JkZXJsZXNzOiB0cnVlLFxuICAgICAgICAgICAgICAgIGFsaWduOiBcInJpZ2h0XCIsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGlkOiBcInVzZXJfaWNvblwiLFxuICAgICAgICAgICAgICAgIHZpZXc6IFwiaWNvblwiLFxuICAgICAgICAgICAgICAgIGljb246IFwibWRpIG1kaS1hY2NvdW50LWNpcmNsZVwiLFxuICAgICAgICAgICAgICAgIGJvcmRlcmxlc3M6IHRydWUsXG4gICAgICAgICAgICAgICAgcG9wdXA6IFwidXNlcl9tZW51XCJcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIF1cbiAgICAgICAgfTtcblxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgdHlwZTogXCJjbGVhblwiLFxuICAgICAgICAgICAgY29sczogW3tcbiAgICAgICAgICAgICAgICByb3dzOiBbaGVhZGVyLCBzaWRlYmFyXVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICByb3dzOiBbXG4gICAgICAgICAgICAgICAgICAgIHRvb2xiYXIsXG4gICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICRzdWJ2aWV3OiB0cnVlXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBdXG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgc2hvd01lbnUoKSB7XG4gICAgICAgIHRoaXMuJHNjb3BlLm1lbnUuc2hvdygpO1xuICAgICAgICB0aGlzLiRzY29wZS5oZWFkZXIuc2hvdygpO1xuICAgICAgICB0aGlzLiRzY29wZS5idXR0b25IaWRlTWVudS5zaG93KCk7XG5cbiAgICAgICAgdGhpcy4kc2NvcGUuYnV0dG9uU2hvd01lbnUuaGlkZSgpO1xuICAgIH1cblxuICAgIGhpZGVNZW51KCkge1xuICAgICAgICB0aGlzLiRzY29wZS5tZW51LmhpZGUoKTtcbiAgICAgICAgdGhpcy4kc2NvcGUuaGVhZGVyLmhpZGUoKTtcbiAgICAgICAgdGhpcy4kc2NvcGUuYnV0dG9uSGlkZU1lbnUuaGlkZSgpO1xuXG4gICAgICAgIHRoaXMuJHNjb3BlLmJ1dHRvblNob3dNZW51LnNob3coKTtcbiAgICB9XG5cbiAgICBpbml0KCkge1xuICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XG5cbiAgICAgICAgdGhpcy51c2UocGx1Z2lucy5NZW51LCB7XG4gICAgICAgICAgICBpZDogXCJtZW51XCIsXG4gICAgICAgICAgICB1cmxzOiB7XG4gICAgICAgICAgICAgICAgbXlqb2JzOiBcIm15am9icy5qb2JzXCIsXG4gICAgICAgICAgICAgICAgd29ya2VyczogXCJteWpvYnMud29ya2Vyc1wiLFxuICAgICAgICAgICAgICAgIHRmZ3JpZHNkazogXCJ0Zndpa2lzLnRmZ3JpZHNka1wiLFxuICAgICAgICAgICAgICAgIHRocmVlZm9sZDogXCJ0Zndpa2lzLnRocmVlZm9sZFwiLFxuICAgICAgICAgICAgICAgIHVidW50dTogXCJzb2x1dGlvbnMuY2hhdGZsb3c/YXV0aG9yPXRmZ3JpZF9zb2x1dGlvbnMmcGFja2FnZT10ZmdyaWRfc29sdXRpb25zJmNoYXQ9dWJ1bnR1X2RlcGxveVwiLFxuICAgICAgICAgICAgICAgIG5ldHdvcms6IFwic29sdXRpb25zLmNoYXRmbG93P2F1dGhvcj10ZmdyaWRfc29sdXRpb25zJnBhY2thZ2U9dGZncmlkX3NvbHV0aW9ucyZjaGF0PW5ldHdvcmtfZGVwbG95XCIsXG4gICAgICAgICAgICAgICAgZmxpc3Q6IFwic29sdXRpb25zLmNoYXRmbG93P2F1dGhvcj10ZmdyaWRfc29sdXRpb25zJnBhY2thZ2U9dGZncmlkX3NvbHV0aW9ucyZjaGF0PXlvdXJfZmxpc3RcIixcbiAgICAgICAgICAgICAgICBtaW5pbzogXCJzb2x1dGlvbnMuY2hhdGZsb3c/YXV0aG9yPXRmZ3JpZF9zb2x1dGlvbnMmcGFja2FnZT10ZmdyaWRfc29sdXRpb25zJmNoYXQ9bWluaW9fZGVwbG95XCIsXG4gICAgICAgICAgICAgICAgd2ViZ2F0ZXdheTogXCJzb2x1dGlvbnMuY2hhdGZsb3c/YXV0aG9yPXRmZ3JpZF9zb2x1dGlvbnMmcGFja2FnZT10ZmdyaWRfc29sdXRpb25zJmNoYXQ9d2ViZ2F0ZXdheV9kZXBsb3lcIixcbiAgICAgICAgICAgICAgICBrOHNfY2x1c3RlcjogXCJzb2x1dGlvbnMuY2hhdGZsb3c/YXV0aG9yPXRmZ3JpZF9zb2x1dGlvbnMmcGFja2FnZT10ZmdyaWRfc29sdXRpb25zJmNoYXQ9a3ViZXJuZXRlc19jbHVzdGVyX2RlcGxveVwiLFxuICAgICAgICAgICAgICAgIHRocmVlYm90OiBcInNvbHV0aW9ucy5jaGF0Zmxvdz9hdXRob3I9dGZncmlkJnBhY2thZ2U9dGhyZWVib3RfcHJvdmlzaW9uaW5nJmNoYXQ9dGhyZWVib3RfcmVzZXJ2YXRpb25cIixcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgdGhpcy5tZW51ID0gdGhpcy4kJChcIm1lbnVcIik7XG4gICAgICAgIHRoaXMuaGVhZGVyID0gdGhpcy4kJChcImhlYWRlclwiKTtcblxuICAgICAgICB0aGlzLmJ1dHRvblNob3dNZW51ID0gdGhpcy4kJChcImJ1dHRvbl9zaG93X21lbnVcIik7XG4gICAgICAgIHRoaXMuYnV0dG9uSGlkZU1lbnUgPSB0aGlzLiQkKFwiYnV0dG9uX2hpZGVfbWVudVwiKTtcblxuXG4gICAgICAgIHRoaXMud2ViaXgudWkoe1xuICAgICAgICAgICAgdmlldzogXCJzdWJtZW51XCIsXG4gICAgICAgICAgICBpZDogXCJ1c2VyX21lbnVcIixcbiAgICAgICAgICAgIGF1dG93aWR0aDogdHJ1ZSxcbiAgICAgICAgICAgIGRhdGE6IFtdXG4gICAgICAgIH0pO1xuXG4gICAgICAgIHRoaXMudXNlck1lbnUgPSAkJChcInVzZXJfbWVudVwiKTtcbiAgICAgICAgdGhpcy51c2VyTWVudS5hdHRhY2hFdmVudChcIm9uSXRlbUNsaWNrXCIsIGZ1bmN0aW9uIChpZCwgZSwgbm9kZSkge1xuICAgICAgICAgICAgaWYgKGlkID09IFwibG9nb3V0XCIpIHtcbiAgICAgICAgICAgICAgICBhdXRoLmxvZ291dCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICB0aGlzLnVzZXJuYW1lTGFiZWwgPSAkJChcInVzZXJuYW1lX2xhYmVsXCIpO1xuXG4gICAgICAgIGF1dGguZ2V0Q3VycmVudFVzZXIoKS50aGVuKGRhdGEgPT4ge1xuICAgICAgICAgICAgY29uc3QgaW5mbyA9IGRhdGEuanNvbigpXG4gICAgICAgICAgICBsZXQgdXNlcm5hbWUgPSBpbmZvLnVzZXJuYW1lO1xuXG4gICAgICAgICAgICBpZiAoaW5mby5kZXZtb2RlKSB7XG4gICAgICAgICAgICAgICAgdXNlcm5hbWUgKz0gXCIgW2RldmVsb3BtZW50XVwiXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHNlbGYudXNlcm5hbWVMYWJlbC5jb25maWcubGFiZWwgPSB1c2VybmFtZTtcbiAgICAgICAgICAgIHNlbGYudXNlcm5hbWVMYWJlbC5jb25maWcud2lkdGggPSB3ZWJpeC5odG1sLmdldFRleHRTaXplKHVzZXJuYW1lKSArIDEwO1xuICAgICAgICAgICAgc2VsZi51c2VybmFtZUxhYmVsLnJlZnJlc2goKTtcblxuICAgICAgICAgICAgc2VsZi51c2VyTWVudS5hZGQoeyBpZDogJ2VtYWlsJywgdmFsdWU6IGluZm8uZW1haWwgfSlcbiAgICAgICAgICAgIHNlbGYudXNlck1lbnUuYWRkKHsgaWQ6ICdsb2dvdXQnLCB2YWx1ZTogXCJMb2dvdXRcIiB9KVxuICAgICAgICB9KS5jYXRjaCgoKSA9PiB7XG4gICAgICAgICAgICBhdXRoLmxvZ291dCgpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NvdXJjZXMvdmlld3MvbWFpbi5qcyIsImltcG9ydCB7IEpldFZpZXcgfSBmcm9tIFwid2ViaXgtamV0XCI7XG5cbmltcG9ydCB7IGRhdGVGb3JtYXR0ZXIgfSBmcm9tIFwiLi4vLi4vY29tbW9uL2Zvcm1hdHRlcnNcIjtcbmltcG9ydCB7IG15am9icyB9IGZyb20gXCIuLi8uLi9zZXJ2aWNlcy9teWpvYnNcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgSm9ic1ZpZXcgZXh0ZW5kcyBKZXRWaWV3IHtcbiAgICBjb25maWcoKSB7XG4gICAgICAgIGNvbnN0IHZpZXcgPSB7XG4gICAgICAgICAgICB2aWV3OiBcImRhdGF0YWJsZVwiLFxuICAgICAgICAgICAgaWQ6IFwiam9ic190YWJsZVwiLFxuICAgICAgICAgICAgcmVzaXplQ29sdW1uOiB0cnVlLFxuICAgICAgICAgICAgc2VsZWN0OiB0cnVlLFxuICAgICAgICAgICAgbXVsdGlzZWxlY3Q6IHRydWUsXG4gICAgICAgICAgICBjc3M6IFwid2ViaXhfaGVhZGVyX2JvcmRlciB3ZWJpeF9kYXRhX2JvcmRlclwiLFxuICAgICAgICAgICAgY29sdW1uczogW3tcbiAgICAgICAgICAgICAgICBpZDogXCJpbmRleFwiLFxuICAgICAgICAgICAgICAgIGhlYWRlcjogXCIjXCIsXG4gICAgICAgICAgICAgICAgc29ydDogXCJpbnRcIixcbiAgICAgICAgICAgICAgICBhdXRvd2lkdGg6IHRydWUsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGlkOiBcImNhdGVnb3J5XCIsXG4gICAgICAgICAgICAgICAgaGVhZGVyOiBcIkNhdGVnb3J5XCIsXG4gICAgICAgICAgICAgICAgc29ydDogXCJzdHJpbmdcIlxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBpZDogXCJ0aW1lX3N0YXJ0XCIsXG4gICAgICAgICAgICAgICAgaGVhZGVyOiBcIlN0YXJ0IHRpbWVcIixcbiAgICAgICAgICAgICAgICBzb3J0OiBcImRhdGVcIixcbiAgICAgICAgICAgICAgICBmb3JtYXQ6IGRhdGVGb3JtYXR0ZXIsXG4gICAgICAgICAgICAgICAgd2lkdGg6IDIwMFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBpZDogXCJ0aW1lX3N0b3BcIixcbiAgICAgICAgICAgICAgICBoZWFkZXI6IFwiU3RvcCB0aW1lXCIsXG4gICAgICAgICAgICAgICAgc29ydDogXCJkYXRlXCIsXG4gICAgICAgICAgICAgICAgZm9ybWF0OiBkYXRlRm9ybWF0dGVyLFxuICAgICAgICAgICAgICAgIHdpZHRoOiAyMDBcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgaWQ6IFwidGltZW91dFwiLFxuICAgICAgICAgICAgICAgIGhlYWRlcjogXCJUaW1lb3V0XCIsXG4gICAgICAgICAgICAgICAgc29ydDogXCJpbnRcIlxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBpZDogXCJhY3Rpb25faWRcIixcbiAgICAgICAgICAgICAgICBoZWFkZXI6IFwiQWN0aW9uXCIsXG4gICAgICAgICAgICAgICAgc29ydDogXCJzdHJpbmdcIlxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBpZDogXCJrd2FyZ3NcIixcbiAgICAgICAgICAgICAgICBoZWFkZXI6IFwiQXJndW1lbnRzXCIsXG4gICAgICAgICAgICAgICAgc29ydDogXCJzdHJpbmdcIixcbiAgICAgICAgICAgICAgICBmb3JtYXQ6IEpTT04uc3RyaW5naWZ5XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGlkOiBcInJlc3VsdFwiLFxuICAgICAgICAgICAgICAgIGhlYWRlcjogW1xuICAgICAgICAgICAgICAgICAgICBcIlJlc3VsdFwiLFxuICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb250ZW50OiBcInRleHRGaWx0ZXJcIlxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICBzb3J0OiBcInN0cmluZ1wiLFxuICAgICAgICAgICAgICAgIGZvcm1hdDogSlNPTi5zdHJpbmdpZnksXG4gICAgICAgICAgICB9XSxcbiAgICAgICAgICAgIHNjaGVtZToge1xuICAgICAgICAgICAgICAgICRpbml0OiBmdW5jdGlvbiAob2JqKSB7XG4gICAgICAgICAgICAgICAgICAgIG9iai5pbmRleCA9IHRoaXMuY291bnQoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICB9O1xuXG4gICAgICAgIHJldHVybiB2aWV3O1xuICAgIH1cblxuICAgIGluaXQodmlldykge1xuICAgICAgICBteWpvYnMubGlzdEpvYnMoKS50aGVuKGRhdGEgPT4ge1xuICAgICAgICAgICAgdmlldy5wYXJzZShkYXRhKTtcbiAgICAgICAgfSk7XG4gICAgfVxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc291cmNlcy92aWV3cy9teWpvYnMvam9icy5qcyIsImltcG9ydCB7IFNlcnZpY2UgfSBmcm9tIFwiLi4vY29tbW9uL2FwaVwiO1xuXG5jb25zdCBCQVNFX1VSTCA9IFwiL3plcm9ib3QvYWRtaW4vYWN0b3JzL215am9ic1wiO1xuXG5jbGFzcyBNeWpvYnNTZXJ2aWNlIGV4dGVuZHMgU2VydmljZSB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHN1cGVyKEJBU0VfVVJMKTtcbiAgICB9XG5cbiAgICBsaXN0Sm9icygpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0Q2FsbChcImxpc3Rfam9ic1wiKTtcbiAgICB9XG5cbiAgICBsaXN0V29ya2VycygpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0Q2FsbChcImxpc3Rfd29ya2Vyc1wiKTtcbiAgICB9XG59XG5cbmV4cG9ydCBjb25zdCBteWpvYnMgPSBuZXcgTXlqb2JzU2VydmljZSgpO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc291cmNlcy9zZXJ2aWNlcy9teWpvYnMuanMiLCJpbXBvcnQgeyBKZXRWaWV3IH0gZnJvbSBcIndlYml4LWpldFwiO1xuXG5pbXBvcnQgeyBkYXRlRm9ybWF0dGVyIH0gZnJvbSBcIi4uLy4uL2NvbW1vbi9mb3JtYXR0ZXJzXCI7XG5pbXBvcnQgeyBteWpvYnMgfSBmcm9tIFwiLi4vLi4vc2VydmljZXMvbXlqb2JzXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEpvYnNWaWV3IGV4dGVuZHMgSmV0VmlldyB7XG4gICAgY29uZmlnKCkge1xuICAgICAgICBjb25zdCB2aWV3ID0ge1xuICAgICAgICAgICAgdmlldzogXCJkYXRhdGFibGVcIixcbiAgICAgICAgICAgIGlkOiBcIndvcmtlcnNfdGFibGVcIixcbiAgICAgICAgICAgIHJlc2l6ZUNvbHVtbjogdHJ1ZSxcbiAgICAgICAgICAgIHNlbGVjdDogdHJ1ZSxcbiAgICAgICAgICAgIG11bHRpc2VsZWN0OiB0cnVlLFxuICAgICAgICAgICAgY3NzOiBcIndlYml4X2hlYWRlcl9ib3JkZXIgd2ViaXhfZGF0YV9ib3JkZXJcIixcbiAgICAgICAgICAgIGNvbHVtbnM6IFt7XG4gICAgICAgICAgICAgICAgaWQ6IFwiaW5kZXhcIixcbiAgICAgICAgICAgICAgICBoZWFkZXI6IFwiI1wiLFxuICAgICAgICAgICAgICAgIHNvcnQ6IFwiaW50XCIsXG4gICAgICAgICAgICAgICAgYXV0b3dpZHRoOiB0cnVlLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBpZDogXCJzdGF0ZVwiLFxuICAgICAgICAgICAgICAgIGhlYWRlcjogXCJTdGF0ZVwiLFxuICAgICAgICAgICAgICAgIHNvcnQ6IFwic3RyaW5nXCJcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgaWQ6IFwiaGFsdFwiLFxuICAgICAgICAgICAgICAgIGhlYWRlcjogXCJIYWx0ZWRcIixcbiAgICAgICAgICAgICAgICBzb3J0OiBcInN0cmluZ1wiLFxuICAgICAgICAgICAgICAgIGZvcm1hdDogZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB2YWx1ZSA/ICdZZXMnIDogJ05vJztcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBpZDogXCJwaWRcIixcbiAgICAgICAgICAgICAgICBoZWFkZXI6IFwiUElEXCIsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGlkOiBcImN1cnJlbnRfam9iXCIsXG4gICAgICAgICAgICAgICAgaGVhZGVyOiBcIkN1cnJlbnQgam9iXCIsXG4gICAgICAgICAgICAgICAgZm9ybWF0OiBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHZhbHVlID09IDIxNDc0ODM2NDcgPyAnTi9BJyA6IHZhbHVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgaWQ6IFwibGFzdF91cGRhdGVcIixcbiAgICAgICAgICAgICAgICBoZWFkZXI6IFwiTGFzdCB1cGRhdGVcIixcbiAgICAgICAgICAgICAgICBzb3J0OiBcImRhdGVcIixcbiAgICAgICAgICAgICAgICBmb3JtYXQ6IGRhdGVGb3JtYXR0ZXIsXG4gICAgICAgICAgICAgICAgd2lkdGg6IDIwMFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBpZDogXCJ0aW1lX3N0YXJ0XCIsXG4gICAgICAgICAgICAgICAgaGVhZGVyOiBcIlN0YXJ0IHRpbWVcIixcbiAgICAgICAgICAgICAgICBzb3J0OiBcImRhdGVcIixcbiAgICAgICAgICAgICAgICBmb3JtYXQ6IGRhdGVGb3JtYXR0ZXIsXG4gICAgICAgICAgICAgICAgd2lkdGg6IDIwMFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBpZDogXCJ0aW1lb3V0XCIsXG4gICAgICAgICAgICAgICAgaGVhZGVyOiBcIlRpbWVvdXRcIixcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgaWQ6IFwidHlwZVwiLFxuICAgICAgICAgICAgICAgIGhlYWRlcjogXCJUeXBlXCIsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGlkOiBcImVycm9yXCIsXG4gICAgICAgICAgICAgICAgaGVhZGVyOiBcIkVycm9yXCIsXG4gICAgICAgICAgICB9XSxcbiAgICAgICAgICAgIGF1dG9Db25maWc6IHRydWUsXG4gICAgICAgICAgICBzY2hlbWU6IHtcbiAgICAgICAgICAgICAgICAkaW5pdDogZnVuY3Rpb24gKG9iaikge1xuICAgICAgICAgICAgICAgICAgICBvYmouaW5kZXggPSB0aGlzLmNvdW50KCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgfTtcblxuICAgICAgICByZXR1cm4gdmlldztcbiAgICB9XG5cbiAgICBpbml0KHZpZXcpIHtcbiAgICAgICAgbXlqb2JzLmxpc3RXb3JrZXJzKCkudGhlbihkYXRhID0+IHtcbiAgICAgICAgICAgIHZpZXcucGFyc2UoZGF0YSk7XG4gICAgICAgIH0pO1xuXG4gICAgfVxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc291cmNlcy92aWV3cy9teWpvYnMvd29ya2Vycy5qcyIsImltcG9ydCB7IEV4dGVybmFsVmlldyB9IGZyb20gXCIuLi9leHRlcm5hbFwiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDaGF0Zmxvd1ZpZXcgZXh0ZW5kcyBFeHRlcm5hbFZpZXcge1xuICAgIGNvbnN0cnVjdG9yKGFwcCwgbmFtZSkge1xuICAgICAgICBzdXBlcihhcHAsIG5hbWUpO1xuXG4gICAgICAgIHRoaXMuYmFzZUdpdFVybCA9IFwiaHR0cHM6Ly9naXRodWIuY29tL3RocmVlZm9sZHRlY2gvanVtcHNjYWxlWF90aHJlZWJvdC90cmVlL2RldmVsb3BtZW50L1RocmVlQm90UGFja2FnZXNcIjtcblxuICAgIH1cblxuICAgIHVybENoYW5nZSh2aWV3LCB1cmwpIHtcbiAgICAgICAgY29uc3QgcGFyYW1zID0gdXJsWzBdLnBhcmFtcztcbiAgICAgICAgaWYgKE9iamVjdC5rZXlzKHBhcmFtcykubGVuZ3RoICE9PSAzKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBwYWNrYWdlTmFtZSA9IGAke3BhcmFtcy5hdXRob3J9LiR7cGFyYW1zLnBhY2thZ2V9YFxuICAgICAgICBjb25zdCBwYWNrYWdlVXJsID0gcGFja2FnZU5hbWUucmVwbGFjZShcIi5cIiwgXCIvXCIpO1xuXG4gICAgICAgIHRoaXMudGFyZ2V0VXJsID0gYC8ke3BhY2thZ2VVcmx9L2NoYXQvJHtwYXJhbXMuY2hhdH0/bm9oZWFkZXI9eWVzYDtcbiAgICAgICAgdGhpcy5yZXF1aXJlZFBhY2thZ2VzID0ge31cbiAgICAgICAgdGhpcy5yZXF1aXJlZFBhY2thZ2VzW3BhY2thZ2VOYW1lXSA9IGAke3RoaXMuYmFzZUdpdFVybH0vJHtwYWNrYWdlVXJsfWA7XG5cbiAgICAgICAgdGhpcy5pbml0KHZpZXcpO1xuICAgIH1cbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NvdXJjZXMvdmlld3Mvc29sdXRpb25zL2NoYXRmbG93LmpzIiwiaW1wb3J0IHsgRXh0ZXJuYWxWaWV3IH0gZnJvbSBcIi4uL2V4dGVybmFsXCI7XG5cbmNvbnN0IFRGR1JJRFNES19VUkwgPSBcIi90aHJlZWZvbGQvaW5mb190ZmdyaWRzZGsvXCI7XG5jb25zdCBSRVFVSVJFRF9QQUNLQUdFUyA9IHtcbiAgICBcInRocmVlZm9sZC53aWtpc1wiOiBcImh0dHBzOi8vZ2l0aHViLmNvbS90aHJlZWZvbGR0ZWNoL2p1bXBzY2FsZVhfdGhyZWVib3QvdHJlZS9kZXZlbG9wbWVudC9UaHJlZUJvdFBhY2thZ2VzL3RocmVlZm9sZC93aWtpc1wiXG59XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFRGR3JpZFNES1dpa2kgZXh0ZW5kcyBFeHRlcm5hbFZpZXcge1xuICAgIGNvbnN0cnVjdG9yKGFwcCwgbmFtZSkge1xuICAgICAgICBzdXBlcihhcHAsIG5hbWUsIFRGR1JJRFNES19VUkwsIFJFUVVJUkVEX1BBQ0tBR0VTKTtcbiAgICB9XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zb3VyY2VzL3ZpZXdzL3Rmd2lraXMvdGZncmlkc2RrLmpzIiwiaW1wb3J0IHsgRXh0ZXJuYWxWaWV3IH0gZnJvbSBcIi4uL2V4dGVybmFsXCI7XG5cbmNvbnN0IFRIUkVFRk9MRF9VUkwgPSBcIi90aHJlZWZvbGQvaW5mb190aHJlZWZvbGQvXCI7XG5jb25zdCBSRVFVSVJFRF9QQUNLQUdFUyA9IHtcbiAgICBcInRocmVlZm9sZC53aWtpc1wiOiBcImh0dHBzOi8vZ2l0aHViLmNvbS90aHJlZWZvbGR0ZWNoL2p1bXBzY2FsZVhfdGhyZWVib3QvdHJlZS9kZXZlbG9wbWVudC9UaHJlZUJvdFBhY2thZ2VzL3RocmVlZm9sZC93aWtpc1wiXG59XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFRocmVlZm9sZFdpa2kgZXh0ZW5kcyBFeHRlcm5hbFZpZXcge1xuICAgIGNvbnN0cnVjdG9yKGFwcCwgbmFtZSkge1xuICAgICAgICBzdXBlcihhcHAsIG5hbWUsIFRIUkVFRk9MRF9VUkwsIFJFUVVJUkVEX1BBQ0tBR0VTKTtcbiAgICB9XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zb3VyY2VzL3ZpZXdzL3Rmd2lraXMvdGhyZWVmb2xkLmpzIiwiaW1wb3J0IHsgRXh0ZXJuYWxWaWV3IH0gZnJvbSBcIi4uL2V4dGVybmFsXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFdpa2lFeHRlcm5hbFZpZXcgZXh0ZW5kcyBFeHRlcm5hbFZpZXcge1xuICAgIGNvbnN0cnVjdG9yKGFwcCwgbmFtZSkge1xuICAgICAgICBzdXBlcihhcHAsIG5hbWUpO1xuXG4gICAgfVxuXG4gICAgdXJsQ2hhbmdlKHZpZXcsIHVybCkge1xuICAgICAgICBjb25zdCBwYXJhbXMgPSB1cmxbMF0ucGFyYW1zO1xuICAgICAgICBpZiAoT2JqZWN0LmtleXMocGFyYW1zKS5sZW5ndGggIT09IDEpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMudGFyZ2V0VXJsID0gYC93aWtpLyR7cGFyYW1zLm5hbWV9YDtcbiAgICAgICAgXG4gICAgICAgIHRoaXMuaW5pdCh2aWV3KTtcbiAgICB9XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zb3VyY2VzL3ZpZXdzL3dpa2lzL3ZpZXcuanMiLCJpbXBvcnQgXCIuL3N0eWxlcy9hcHAuY3NzXCI7XG5pbXBvcnQge0pldEFwcH0gZnJvbSBcIndlYml4LWpldFwiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBJbnZlbnRvcnlBcHAgZXh0ZW5kcyBKZXRBcHAge1xuXHRjb25zdHJ1Y3Rvcihjb25maWcpe1xuXHRcdHN1cGVyKHdlYml4LmV4dGVuZCh7XG5cdFx0XHRpZDpcdFx0XHRBUFBOQU1FLFxuXHRcdFx0dmVyc2lvbjpcdFZFUlNJT04sXG5cdFx0XHRzdGFydDpcdFx0XCIvbWFpbi9kYXNoXCIsXG5cdFx0XHRkZWJ1ZzpcdFx0IVBST0RVQ1RJT05cblx0XHR9LCBjb25maWcsIHRydWUpKTtcblxuXHRcdC8qIGVycm9yIHRyYWNraW5nICovXG5cdFx0dGhpcy5hdHRhY2hFdmVudChcImFwcDplcnJvcjpyZXNvbHZlXCIsIGZ1bmN0aW9uKG5hbWUsIGVycm9yKXtcblx0XHRcdHdpbmRvdy5jb25zb2xlLmVycm9yKGVycm9yKTtcblx0XHR9KTtcblx0fVxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc291cmNlcy9hcHAuanMiLCIvLyByZW1vdmVkIGJ5IGV4dHJhY3QtdGV4dC13ZWJwYWNrLXBsdWdpblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vc291cmNlcy9zdHlsZXMvYXBwLmNzc1xuLy8gbW9kdWxlIGlkID0gNTNcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwidmFyIG1hcCA9IHtcblx0XCIuL2FsZXJ0c1wiOiA3LFxuXHRcIi4vYWxlcnRzL1wiOiA3LFxuXHRcIi4vYWxlcnRzL2FsZXJ0XCI6IDI0LFxuXHRcIi4vYWxlcnRzL2FsZXJ0LmpzXCI6IDI0LFxuXHRcIi4vYWxlcnRzL2RhdGFcIjogNCxcblx0XCIuL2FsZXJ0cy9kYXRhLmpzXCI6IDQsXG5cdFwiLi9hbGVydHMvaW5kZXhcIjogNyxcblx0XCIuL2FsZXJ0cy9pbmRleC5qc1wiOiA3LFxuXHRcIi4vY2FwYWNpdHlcIjogOSxcblx0XCIuL2NhcGFjaXR5L1wiOiA5LFxuXHRcIi4vY2FwYWNpdHkvaW5kZXhcIjogOSxcblx0XCIuL2NhcGFjaXR5L2luZGV4LmpzXCI6IDksXG5cdFwiLi9jaXJjbGVzXCI6IDEwLFxuXHRcIi4vY2lyY2xlcy9cIjogMTAsXG5cdFwiLi9jaXJjbGVzL2luZGV4XCI6IDEwLFxuXHRcIi4vY2lyY2xlcy9pbmRleC5qc1wiOiAxMCxcblx0XCIuL2NpcmNsZXN0b3JpZXNcIjogMTEsXG5cdFwiLi9jaXJjbGVzdG9yaWVzL1wiOiAxMSxcblx0XCIuL2NpcmNsZXN0b3JpZXMvaW5kZXhcIjogMTEsXG5cdFwiLi9jaXJjbGVzdG9yaWVzL2luZGV4LmpzXCI6IDExLFxuXHRcIi4vY2lyY2xldGFza3NcIjogMTIsXG5cdFwiLi9jaXJjbGV0YXNrcy9cIjogMTIsXG5cdFwiLi9jaXJjbGV0YXNrcy9pbmRleFwiOiAxMixcblx0XCIuL2NpcmNsZXRhc2tzL2luZGV4LmpzXCI6IDEyLFxuXHRcIi4vY29kZXNlcnZlclwiOiAxMyxcblx0XCIuL2NvZGVzZXJ2ZXIvXCI6IDEzLFxuXHRcIi4vY29kZXNlcnZlci9pbmRleFwiOiAxMyxcblx0XCIuL2NvZGVzZXJ2ZXIvaW5kZXguanNcIjogMTMsXG5cdFwiLi9kYXNoXCI6IDE0LFxuXHRcIi4vZGFzaC9cIjogMTQsXG5cdFwiLi9kYXNoL2Rpc2tTcGFjZVwiOiAzOCxcblx0XCIuL2Rhc2gvZGlza1NwYWNlLmpzXCI6IDM4LFxuXHRcIi4vZGFzaC9oZWFsdGhcIjogMzksXG5cdFwiLi9kYXNoL2hlYWx0aC5qc1wiOiAzOSxcblx0XCIuL2Rhc2gvaW5kZXhcIjogMTQsXG5cdFwiLi9kYXNoL2luZGV4LmpzXCI6IDE0LFxuXHRcIi4vZGFzaC9qc3hJbmZvXCI6IDQwLFxuXHRcIi4vZGFzaC9qc3hJbmZvLmpzXCI6IDQwLFxuXHRcIi4vZGFzaC9wcm9jZXNzZXNcIjogNDEsXG5cdFwiLi9kYXNoL3Byb2Nlc3Nlcy5qc1wiOiA0MSxcblx0XCIuL2Rhc2gvcHJvY2Vzc2VzQ2hpbGRWaWV3XCI6IDI3LFxuXHRcIi4vZGFzaC9wcm9jZXNzZXNDaGlsZFZpZXcuanNcIjogMjcsXG5cdFwiLi9kYXNoL3J1bm5pbmdQb3J0c1wiOiA0Mixcblx0XCIuL2Rhc2gvcnVubmluZ1BvcnRzLmpzXCI6IDQyLFxuXHRcIi4vZGVwbG95ZWRTb2x1dGlvbnNcIjogMTUsXG5cdFwiLi9kZXBsb3llZFNvbHV0aW9ucy9cIjogMTUsXG5cdFwiLi9kZXBsb3llZFNvbHV0aW9ucy9pbmRleFwiOiAxNSxcblx0XCIuL2RlcGxveWVkU29sdXRpb25zL2luZGV4LmpzXCI6IDE1LFxuXHRcIi4vZGVwbG95ZWRTb2x1dGlvbnMvcmVzZXJ2YXRpb25cIjogMjgsXG5cdFwiLi9kZXBsb3llZFNvbHV0aW9ucy9yZXNlcnZhdGlvbi5qc1wiOiAyOCxcblx0XCIuL2Vycm9ycy9kaWFsb2dcIjogMyxcblx0XCIuL2Vycm9ycy9kaWFsb2cuanNcIjogMyxcblx0XCIuL2V4dGVybmFsXCI6IDEsXG5cdFwiLi9leHRlcm5hbC9cIjogMSxcblx0XCIuL2V4dGVybmFsL2luZGV4XCI6IDEsXG5cdFwiLi9leHRlcm5hbC9pbmRleC5qc1wiOiAxLFxuXHRcIi4vZmFybW1hbmFnZW1lbnRcIjogMTYsXG5cdFwiLi9mYXJtbWFuYWdlbWVudC9cIjogMTYsXG5cdFwiLi9mYXJtbWFuYWdlbWVudC9pbmRleFwiOiAxNixcblx0XCIuL2Zhcm1tYW5hZ2VtZW50L2luZGV4LmpzXCI6IDE2LFxuXHRcIi4vanVweXRlclwiOiAxNyxcblx0XCIuL2p1cHl0ZXIvXCI6IDE3LFxuXHRcIi4vanVweXRlci9pbmRleFwiOiAxNyxcblx0XCIuL2p1cHl0ZXIvaW5kZXguanNcIjogMTcsXG5cdFwiLi9sb2dzXCI6IDE4LFxuXHRcIi4vbG9ncy9cIjogMTgsXG5cdFwiLi9sb2dzL2FwcExvZ3NcIjogMjksXG5cdFwiLi9sb2dzL2FwcExvZ3MuanNcIjogMjksXG5cdFwiLi9sb2dzL2luZGV4XCI6IDE4LFxuXHRcIi4vbG9ncy9pbmRleC5qc1wiOiAxOCxcblx0XCIuL21haW5cIjogNDMsXG5cdFwiLi9tYWluLmpzXCI6IDQzLFxuXHRcIi4vbXlqb2JzL2pvYnNcIjogNDQsXG5cdFwiLi9teWpvYnMvam9icy5qc1wiOiA0NCxcblx0XCIuL215am9icy93b3JrZXJzXCI6IDQ2LFxuXHRcIi4vbXlqb2JzL3dvcmtlcnMuanNcIjogNDYsXG5cdFwiLi9wYWNrYWdlc1wiOiAxOSxcblx0XCIuL3BhY2thZ2VzL1wiOiAxOSxcblx0XCIuL3BhY2thZ2VzL2luZGV4XCI6IDE5LFxuXHRcIi4vcGFja2FnZXMvaW5kZXguanNcIjogMTksXG5cdFwiLi9zZGtleGFtcGxlc1wiOiAyMCxcblx0XCIuL3Nka2V4YW1wbGVzL1wiOiAyMCxcblx0XCIuL3Nka2V4YW1wbGVzL2luZGV4XCI6IDIwLFxuXHRcIi4vc2RrZXhhbXBsZXMvaW5kZXguanNcIjogMjAsXG5cdFwiLi9zZXR0aW5nc1wiOiAyMSxcblx0XCIuL3NldHRpbmdzL1wiOiAyMSxcblx0XCIuL3NldHRpbmdzL2FkbWluc1wiOiAzMCxcblx0XCIuL3NldHRpbmdzL2FkbWlucy5qc1wiOiAzMCxcblx0XCIuL3NldHRpbmdzL2dlbmVyYWxcIjogMzEsXG5cdFwiLi9zZXR0aW5ncy9nZW5lcmFsLmpzXCI6IDMxLFxuXHRcIi4vc2V0dGluZ3MvaW5kZXhcIjogMjEsXG5cdFwiLi9zZXR0aW5ncy9pbmRleC5qc1wiOiAyMSxcblx0XCIuL3NvbHV0aW9ucy9jaGF0Zmxvd1wiOiA0Nyxcblx0XCIuL3NvbHV0aW9ucy9jaGF0Zmxvdy5qc1wiOiA0Nyxcblx0XCIuL3Rmd2lraXMvdGZncmlkc2RrXCI6IDQ4LFxuXHRcIi4vdGZ3aWtpcy90ZmdyaWRzZGsuanNcIjogNDgsXG5cdFwiLi90Zndpa2lzL3RocmVlZm9sZFwiOiA0OSxcblx0XCIuL3Rmd2lraXMvdGhyZWVmb2xkLmpzXCI6IDQ5LFxuXHRcIi4vd2FsbGV0c01hbmFnZXJcIjogMjIsXG5cdFwiLi93YWxsZXRzTWFuYWdlci9cIjogMjIsXG5cdFwiLi93YWxsZXRzTWFuYWdlci9pbXBvcnRGb3JtXCI6IDM1LFxuXHRcIi4vd2FsbGV0c01hbmFnZXIvaW1wb3J0Rm9ybS5qc1wiOiAzNSxcblx0XCIuL3dhbGxldHNNYW5hZ2VyL2luZGV4XCI6IDIyLFxuXHRcIi4vd2FsbGV0c01hbmFnZXIvaW5kZXguanNcIjogMjIsXG5cdFwiLi93YWxsZXRzTWFuYWdlci93YWxsZXREZXRhaWxzXCI6IDM0LFxuXHRcIi4vd2FsbGV0c01hbmFnZXIvd2FsbGV0RGV0YWlscy5qc1wiOiAzNCxcblx0XCIuL3dhbGxldHNNYW5hZ2VyL3dhbGxldEZvcm1cIjogMzIsXG5cdFwiLi93YWxsZXRzTWFuYWdlci93YWxsZXRGb3JtLmpzXCI6IDMyLFxuXHRcIi4vd2lraXNcIjogMjMsXG5cdFwiLi93aWtpcy9cIjogMjMsXG5cdFwiLi93aWtpcy9pbmRleFwiOiAyMyxcblx0XCIuL3dpa2lzL2luZGV4LmpzXCI6IDIzLFxuXHRcIi4vd2lraXMvdmlld1wiOiA1MCxcblx0XCIuL3dpa2lzL3ZpZXcuanNcIjogNTBcbn07XG5mdW5jdGlvbiB3ZWJwYWNrQ29udGV4dChyZXEpIHtcblx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18od2VicGFja0NvbnRleHRSZXNvbHZlKHJlcSkpO1xufTtcbmZ1bmN0aW9uIHdlYnBhY2tDb250ZXh0UmVzb2x2ZShyZXEpIHtcblx0dmFyIGlkID0gbWFwW3JlcV07XG5cdGlmKCEoaWQgKyAxKSkgLy8gY2hlY2sgZm9yIG51bWJlciBvciBzdHJpbmdcblx0XHR0aHJvdyBuZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiICsgcmVxICsgXCInLlwiKTtcblx0cmV0dXJuIGlkO1xufTtcbndlYnBhY2tDb250ZXh0LmtleXMgPSBmdW5jdGlvbiB3ZWJwYWNrQ29udGV4dEtleXMoKSB7XG5cdHJldHVybiBPYmplY3Qua2V5cyhtYXApO1xufTtcbndlYnBhY2tDb250ZXh0LnJlc29sdmUgPSB3ZWJwYWNrQ29udGV4dFJlc29sdmU7XG5tb2R1bGUuZXhwb3J0cyA9IHdlYnBhY2tDb250ZXh0O1xud2VicGFja0NvbnRleHQuaWQgPSA1NDtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3NvdXJjZXMvdmlld3MgXlxcLlxcLy4qJFxuLy8gbW9kdWxlIGlkID0gNTRcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLyogIGFuc2lfdXAuanNcbiAqICBhdXRob3IgOiBEcnUgTmVsc29uXG4gKiAgbGljZW5zZSA6IE1JVFxuICogIGh0dHA6Ly9naXRodWIuY29tL2RydWRydS9hbnNpX3VwXG4gKi9cbihmdW5jdGlvbiAocm9vdCwgZmFjdG9yeSkge1xuICAgIGlmICh0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQpIHtcbiAgICAgICAgLy8gQU1ELiBSZWdpc3RlciBhcyBhbiBhbm9ueW1vdXMgbW9kdWxlLlxuICAgICAgICBkZWZpbmUoWydleHBvcnRzJ10sIGZhY3RvcnkpO1xuICAgIH0gZWxzZSBpZiAodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnICYmIHR5cGVvZiBleHBvcnRzLm5vZGVOYW1lICE9PSAnc3RyaW5nJykge1xuICAgICAgICAvLyBDb21tb25KU1xuICAgICAgICBmYWN0b3J5KGV4cG9ydHMpO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIC8vIEJyb3dzZXIgZ2xvYmFsc1xuICAgICAgICB2YXIgZXhwID0ge307XG4gICAgICAgIGZhY3RvcnkoZXhwKTtcbiAgICAgICAgcm9vdC5BbnNpVXAgPSBleHAuZGVmYXVsdDtcbiAgICB9XG59KHRoaXMsIGZ1bmN0aW9uIChleHBvcnRzKSB7XG5cInVzZSBzdHJpY3RcIjtcbnZhciBfX21ha2VUZW1wbGF0ZU9iamVjdCA9ICh0aGlzICYmIHRoaXMuX19tYWtlVGVtcGxhdGVPYmplY3QpIHx8IGZ1bmN0aW9uIChjb29rZWQsIHJhdykge1xuICAgIGlmIChPYmplY3QuZGVmaW5lUHJvcGVydHkpIHsgT2JqZWN0LmRlZmluZVByb3BlcnR5KGNvb2tlZCwgXCJyYXdcIiwgeyB2YWx1ZTogcmF3IH0pOyB9IGVsc2UgeyBjb29rZWQucmF3ID0gcmF3OyB9XG4gICAgcmV0dXJuIGNvb2tlZDtcbn07XG52YXIgUGFja2V0S2luZDtcbihmdW5jdGlvbiAoUGFja2V0S2luZCkge1xuICAgIFBhY2tldEtpbmRbUGFja2V0S2luZFtcIkVPU1wiXSA9IDBdID0gXCJFT1NcIjtcbiAgICBQYWNrZXRLaW5kW1BhY2tldEtpbmRbXCJUZXh0XCJdID0gMV0gPSBcIlRleHRcIjtcbiAgICBQYWNrZXRLaW5kW1BhY2tldEtpbmRbXCJJbmNvbXBsZXRlXCJdID0gMl0gPSBcIkluY29tcGxldGVcIjtcbiAgICBQYWNrZXRLaW5kW1BhY2tldEtpbmRbXCJFU0NcIl0gPSAzXSA9IFwiRVNDXCI7XG4gICAgUGFja2V0S2luZFtQYWNrZXRLaW5kW1wiVW5rbm93blwiXSA9IDRdID0gXCJVbmtub3duXCI7XG4gICAgUGFja2V0S2luZFtQYWNrZXRLaW5kW1wiU0dSXCJdID0gNV0gPSBcIlNHUlwiO1xuICAgIFBhY2tldEtpbmRbUGFja2V0S2luZFtcIk9TQ1VSTFwiXSA9IDZdID0gXCJPU0NVUkxcIjtcbn0pKFBhY2tldEtpbmQgfHwgKFBhY2tldEtpbmQgPSB7fSkpO1xudmFyIEFuc2lVcCA9IChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gQW5zaVVwKCkge1xuICAgICAgICB0aGlzLlZFUlNJT04gPSBcIjQuMC40XCI7XG4gICAgICAgIHRoaXMuc2V0dXBfcGFsZXR0ZXMoKTtcbiAgICAgICAgdGhpcy5fdXNlX2NsYXNzZXMgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5fZXNjYXBlX2Zvcl9odG1sID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5ib2xkID0gZmFsc2U7XG4gICAgICAgIHRoaXMuZmcgPSB0aGlzLmJnID0gbnVsbDtcbiAgICAgICAgdGhpcy5fYnVmZmVyID0gJyc7XG4gICAgICAgIHRoaXMuX3VybF93aGl0ZWxpc3QgPSB7ICdodHRwJzogMSwgJ2h0dHBzJzogMSB9O1xuICAgIH1cbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoQW5zaVVwLnByb3RvdHlwZSwgXCJ1c2VfY2xhc3Nlc1wiLCB7XG4gICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3VzZV9jbGFzc2VzO1xuICAgICAgICB9LFxuICAgICAgICBzZXQ6IGZ1bmN0aW9uIChhcmcpIHtcbiAgICAgICAgICAgIHRoaXMuX3VzZV9jbGFzc2VzID0gYXJnO1xuICAgICAgICB9LFxuICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgICAgICBjb25maWd1cmFibGU6IHRydWVcbiAgICB9KTtcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoQW5zaVVwLnByb3RvdHlwZSwgXCJlc2NhcGVfZm9yX2h0bWxcIiwge1xuICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9lc2NhcGVfZm9yX2h0bWw7XG4gICAgICAgIH0sXG4gICAgICAgIHNldDogZnVuY3Rpb24gKGFyZykge1xuICAgICAgICAgICAgdGhpcy5fZXNjYXBlX2Zvcl9odG1sID0gYXJnO1xuICAgICAgICB9LFxuICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgICAgICBjb25maWd1cmFibGU6IHRydWVcbiAgICB9KTtcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoQW5zaVVwLnByb3RvdHlwZSwgXCJ1cmxfd2hpdGVsaXN0XCIsIHtcbiAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fdXJsX3doaXRlbGlzdDtcbiAgICAgICAgfSxcbiAgICAgICAgc2V0OiBmdW5jdGlvbiAoYXJnKSB7XG4gICAgICAgICAgICB0aGlzLl91cmxfd2hpdGVsaXN0ID0gYXJnO1xuICAgICAgICB9LFxuICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgICAgICBjb25maWd1cmFibGU6IHRydWVcbiAgICB9KTtcbiAgICBBbnNpVXAucHJvdG90eXBlLnNldHVwX3BhbGV0dGVzID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgICB0aGlzLmFuc2lfY29sb3JzID1cbiAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgICAgIHsgcmdiOiBbMCwgMCwgMF0sIGNsYXNzX25hbWU6IFwiYW5zaS1ibGFja1wiIH0sXG4gICAgICAgICAgICAgICAgICAgIHsgcmdiOiBbMTg3LCAwLCAwXSwgY2xhc3NfbmFtZTogXCJhbnNpLXJlZFwiIH0sXG4gICAgICAgICAgICAgICAgICAgIHsgcmdiOiBbMCwgMTg3LCAwXSwgY2xhc3NfbmFtZTogXCJhbnNpLWdyZWVuXCIgfSxcbiAgICAgICAgICAgICAgICAgICAgeyByZ2I6IFsxODcsIDE4NywgMF0sIGNsYXNzX25hbWU6IFwiYW5zaS15ZWxsb3dcIiB9LFxuICAgICAgICAgICAgICAgICAgICB7IHJnYjogWzAsIDAsIDE4N10sIGNsYXNzX25hbWU6IFwiYW5zaS1ibHVlXCIgfSxcbiAgICAgICAgICAgICAgICAgICAgeyByZ2I6IFsxODcsIDAsIDE4N10sIGNsYXNzX25hbWU6IFwiYW5zaS1tYWdlbnRhXCIgfSxcbiAgICAgICAgICAgICAgICAgICAgeyByZ2I6IFswLCAxODcsIDE4N10sIGNsYXNzX25hbWU6IFwiYW5zaS1jeWFuXCIgfSxcbiAgICAgICAgICAgICAgICAgICAgeyByZ2I6IFsyNTUsIDI1NSwgMjU1XSwgY2xhc3NfbmFtZTogXCJhbnNpLXdoaXRlXCIgfVxuICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAgICAgICB7IHJnYjogWzg1LCA4NSwgODVdLCBjbGFzc19uYW1lOiBcImFuc2ktYnJpZ2h0LWJsYWNrXCIgfSxcbiAgICAgICAgICAgICAgICAgICAgeyByZ2I6IFsyNTUsIDg1LCA4NV0sIGNsYXNzX25hbWU6IFwiYW5zaS1icmlnaHQtcmVkXCIgfSxcbiAgICAgICAgICAgICAgICAgICAgeyByZ2I6IFswLCAyNTUsIDBdLCBjbGFzc19uYW1lOiBcImFuc2ktYnJpZ2h0LWdyZWVuXCIgfSxcbiAgICAgICAgICAgICAgICAgICAgeyByZ2I6IFsyNTUsIDI1NSwgODVdLCBjbGFzc19uYW1lOiBcImFuc2ktYnJpZ2h0LXllbGxvd1wiIH0sXG4gICAgICAgICAgICAgICAgICAgIHsgcmdiOiBbODUsIDg1LCAyNTVdLCBjbGFzc19uYW1lOiBcImFuc2ktYnJpZ2h0LWJsdWVcIiB9LFxuICAgICAgICAgICAgICAgICAgICB7IHJnYjogWzI1NSwgODUsIDI1NV0sIGNsYXNzX25hbWU6IFwiYW5zaS1icmlnaHQtbWFnZW50YVwiIH0sXG4gICAgICAgICAgICAgICAgICAgIHsgcmdiOiBbODUsIDI1NSwgMjU1XSwgY2xhc3NfbmFtZTogXCJhbnNpLWJyaWdodC1jeWFuXCIgfSxcbiAgICAgICAgICAgICAgICAgICAgeyByZ2I6IFsyNTUsIDI1NSwgMjU1XSwgY2xhc3NfbmFtZTogXCJhbnNpLWJyaWdodC13aGl0ZVwiIH1cbiAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICBdO1xuICAgICAgICB0aGlzLnBhbGV0dGVfMjU2ID0gW107XG4gICAgICAgIHRoaXMuYW5zaV9jb2xvcnMuZm9yRWFjaChmdW5jdGlvbiAocGFsZXR0ZSkge1xuICAgICAgICAgICAgcGFsZXR0ZS5mb3JFYWNoKGZ1bmN0aW9uIChyZWMpIHtcbiAgICAgICAgICAgICAgICBfdGhpcy5wYWxldHRlXzI1Ni5wdXNoKHJlYyk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgICAgIHZhciBsZXZlbHMgPSBbMCwgOTUsIDEzNSwgMTc1LCAyMTUsIDI1NV07XG4gICAgICAgIGZvciAodmFyIHIgPSAwOyByIDwgNjsgKytyKSB7XG4gICAgICAgICAgICBmb3IgKHZhciBnID0gMDsgZyA8IDY7ICsrZykge1xuICAgICAgICAgICAgICAgIGZvciAodmFyIGIgPSAwOyBiIDwgNjsgKytiKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBjb2wgPSB7IHJnYjogW2xldmVsc1tyXSwgbGV2ZWxzW2ddLCBsZXZlbHNbYl1dLCBjbGFzc19uYW1lOiAndHJ1ZWNvbG9yJyB9O1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnBhbGV0dGVfMjU2LnB1c2goY29sKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgdmFyIGdyZXlfbGV2ZWwgPSA4O1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IDI0OyArK2ksIGdyZXlfbGV2ZWwgKz0gMTApIHtcbiAgICAgICAgICAgIHZhciBncnkgPSB7IHJnYjogW2dyZXlfbGV2ZWwsIGdyZXlfbGV2ZWwsIGdyZXlfbGV2ZWxdLCBjbGFzc19uYW1lOiAndHJ1ZWNvbG9yJyB9O1xuICAgICAgICAgICAgdGhpcy5wYWxldHRlXzI1Ni5wdXNoKGdyeSk7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIEFuc2lVcC5wcm90b3R5cGUuZXNjYXBlX3R4dF9mb3JfaHRtbCA9IGZ1bmN0aW9uICh0eHQpIHtcbiAgICAgICAgcmV0dXJuIHR4dC5yZXBsYWNlKC9bJjw+XS9nbSwgZnVuY3Rpb24gKHN0cikge1xuICAgICAgICAgICAgaWYgKHN0ciA9PT0gXCImXCIpXG4gICAgICAgICAgICAgICAgcmV0dXJuIFwiJmFtcDtcIjtcbiAgICAgICAgICAgIGlmIChzdHIgPT09IFwiPFwiKVxuICAgICAgICAgICAgICAgIHJldHVybiBcIiZsdDtcIjtcbiAgICAgICAgICAgIGlmIChzdHIgPT09IFwiPlwiKVxuICAgICAgICAgICAgICAgIHJldHVybiBcIiZndDtcIjtcbiAgICAgICAgfSk7XG4gICAgfTtcbiAgICBBbnNpVXAucHJvdG90eXBlLmFwcGVuZF9idWZmZXIgPSBmdW5jdGlvbiAodHh0KSB7XG4gICAgICAgIHZhciBzdHIgPSB0aGlzLl9idWZmZXIgKyB0eHQ7XG4gICAgICAgIHRoaXMuX2J1ZmZlciA9IHN0cjtcbiAgICB9O1xuICAgIEFuc2lVcC5wcm90b3R5cGUuZ2V0X25leHRfcGFja2V0ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgcGt0ID0ge1xuICAgICAgICAgICAga2luZDogUGFja2V0S2luZC5FT1MsXG4gICAgICAgICAgICB0ZXh0OiAnJyxcbiAgICAgICAgICAgIHVybDogJydcbiAgICAgICAgfTtcbiAgICAgICAgdmFyIGxlbiA9IHRoaXMuX2J1ZmZlci5sZW5ndGg7XG4gICAgICAgIGlmIChsZW4gPT0gMClcbiAgICAgICAgICAgIHJldHVybiBwa3Q7XG4gICAgICAgIHZhciBwb3MgPSB0aGlzLl9idWZmZXIuaW5kZXhPZihcIlxceDFCXCIpO1xuICAgICAgICBpZiAocG9zID09IC0xKSB7XG4gICAgICAgICAgICBwa3Qua2luZCA9IFBhY2tldEtpbmQuVGV4dDtcbiAgICAgICAgICAgIHBrdC50ZXh0ID0gdGhpcy5fYnVmZmVyO1xuICAgICAgICAgICAgdGhpcy5fYnVmZmVyID0gJyc7XG4gICAgICAgICAgICByZXR1cm4gcGt0O1xuICAgICAgICB9XG4gICAgICAgIGlmIChwb3MgPiAwKSB7XG4gICAgICAgICAgICBwa3Qua2luZCA9IFBhY2tldEtpbmQuVGV4dDtcbiAgICAgICAgICAgIHBrdC50ZXh0ID0gdGhpcy5fYnVmZmVyLnNsaWNlKDAsIHBvcyk7XG4gICAgICAgICAgICB0aGlzLl9idWZmZXIgPSB0aGlzLl9idWZmZXIuc2xpY2UocG9zKTtcbiAgICAgICAgICAgIHJldHVybiBwa3Q7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHBvcyA9PSAwKSB7XG4gICAgICAgICAgICBpZiAobGVuID09IDEpIHtcbiAgICAgICAgICAgICAgICBwa3Qua2luZCA9IFBhY2tldEtpbmQuSW5jb21wbGV0ZTtcbiAgICAgICAgICAgICAgICByZXR1cm4gcGt0O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdmFyIG5leHRfY2hhciA9IHRoaXMuX2J1ZmZlci5jaGFyQXQoMSk7XG4gICAgICAgICAgICBpZiAoKG5leHRfY2hhciAhPSAnWycpICYmIChuZXh0X2NoYXIgIT0gJ10nKSkge1xuICAgICAgICAgICAgICAgIHBrdC5raW5kID0gUGFja2V0S2luZC5FU0M7XG4gICAgICAgICAgICAgICAgcGt0LnRleHQgPSB0aGlzLl9idWZmZXIuc2xpY2UoMCwgMSk7XG4gICAgICAgICAgICAgICAgdGhpcy5fYnVmZmVyID0gdGhpcy5fYnVmZmVyLnNsaWNlKDEpO1xuICAgICAgICAgICAgICAgIHJldHVybiBwa3Q7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAobmV4dF9jaGFyID09ICdbJykge1xuICAgICAgICAgICAgICAgIGlmICghdGhpcy5fY3NpX3JlZ2V4KSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2NzaV9yZWdleCA9IHJneChfX21ha2VUZW1wbGF0ZU9iamVjdChbXCJcXG4gICAgICAgICAgICAgICAgICAgICAgICBeICAgICAgICAgICAgICAgICAgICAgICAgICAgIyBiZWdpbm5pbmcgb2YgbGluZVxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAjXFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICMgRmlyc3QgYXR0ZW1wdFxcbiAgICAgICAgICAgICAgICAgICAgICAgICg/OiAgICAgICAgICAgICAgICAgICAgICAgICAjIGxlZ2FsIHNlcXVlbmNlXFxuICAgICAgICAgICAgICAgICAgICAgICAgICBcXHUwMDFCWyAgICAgICAgICAgICAgICAgICAgICAjIENTSVxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgKFs8LT9dPykgICAgICAgICAgICAgICMgcHJpdmF0ZS1tb2RlIGNoYXJcXG4gICAgICAgICAgICAgICAgICAgICAgICAgIChbZDtdKikgICAgICAgICAgICAgICAgICAgICMgYW55IGRpZ2l0cyBvciBzZW1pY29sb25zXFxuICAgICAgICAgICAgICAgICAgICAgICAgICAoWyAtL10/ICAgICAgICAgICAgICAgIyBhbiBpbnRlcm1lZGlhdGUgbW9kaWZpZXJcXG4gICAgICAgICAgICAgICAgICAgICAgICAgIFtALX5dKSAgICAgICAgICAgICAgICAjIHRoZSBjb21tYW5kXFxuICAgICAgICAgICAgICAgICAgICAgICAgKVxcbiAgICAgICAgICAgICAgICAgICAgICAgIHwgICAgICAgICAgICAgICAgICAgICAgICAgICAjIGFsdGVybmF0ZSAoc2Vjb25kIGF0dGVtcHQpXFxuICAgICAgICAgICAgICAgICAgICAgICAgKD86ICAgICAgICAgICAgICAgICAgICAgICAgICMgaWxsZWdhbCBzZXF1ZW5jZVxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgXFx1MDAxQlsgICAgICAgICAgICAgICAgICAgICAgIyBDU0lcXG4gICAgICAgICAgICAgICAgICAgICAgICAgIFsgLX5dKiAgICAgICAgICAgICAgICAjIGFueXRoaW5nIGxlZ2FsXFxuICAgICAgICAgICAgICAgICAgICAgICAgICAoW1xcMC1cXHUwMDFGOl0pICAgICAgICAgICAgICAjIGFueXRoaW5nIGlsbGVnYWxcXG4gICAgICAgICAgICAgICAgICAgICAgICApXFxuICAgICAgICAgICAgICAgICAgICBcIl0sIFtcIlxcbiAgICAgICAgICAgICAgICAgICAgICAgIF4gICAgICAgICAgICAgICAgICAgICAgICAgICAjIGJlZ2lubmluZyBvZiBsaW5lXFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICNcXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIyBGaXJzdCBhdHRlbXB0XFxuICAgICAgICAgICAgICAgICAgICAgICAgKD86ICAgICAgICAgICAgICAgICAgICAgICAgICMgbGVnYWwgc2VxdWVuY2VcXG4gICAgICAgICAgICAgICAgICAgICAgICAgIFxcXFx4MWJcXFxcWyAgICAgICAgICAgICAgICAgICAgICAjIENTSVxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgKFtcXFxceDNjLVxcXFx4M2ZdPykgICAgICAgICAgICAgICMgcHJpdmF0ZS1tb2RlIGNoYXJcXG4gICAgICAgICAgICAgICAgICAgICAgICAgIChbXFxcXGQ7XSopICAgICAgICAgICAgICAgICAgICAjIGFueSBkaWdpdHMgb3Igc2VtaWNvbG9uc1xcbiAgICAgICAgICAgICAgICAgICAgICAgICAgKFtcXFxceDIwLVxcXFx4MmZdPyAgICAgICAgICAgICAgICMgYW4gaW50ZXJtZWRpYXRlIG1vZGlmaWVyXFxuICAgICAgICAgICAgICAgICAgICAgICAgICBbXFxcXHg0MC1cXFxceDdlXSkgICAgICAgICAgICAgICAgIyB0aGUgY29tbWFuZFxcbiAgICAgICAgICAgICAgICAgICAgICAgIClcXG4gICAgICAgICAgICAgICAgICAgICAgICB8ICAgICAgICAgICAgICAgICAgICAgICAgICAgIyBhbHRlcm5hdGUgKHNlY29uZCBhdHRlbXB0KVxcbiAgICAgICAgICAgICAgICAgICAgICAgICg/OiAgICAgICAgICAgICAgICAgICAgICAgICAjIGlsbGVnYWwgc2VxdWVuY2VcXG4gICAgICAgICAgICAgICAgICAgICAgICAgIFxcXFx4MWJcXFxcWyAgICAgICAgICAgICAgICAgICAgICAjIENTSVxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgW1xcXFx4MjAtXFxcXHg3ZV0qICAgICAgICAgICAgICAgICMgYW55dGhpbmcgbGVnYWxcXG4gICAgICAgICAgICAgICAgICAgICAgICAgIChbXFxcXHgwMC1cXFxceDFmOl0pICAgICAgICAgICAgICAjIGFueXRoaW5nIGlsbGVnYWxcXG4gICAgICAgICAgICAgICAgICAgICAgICApXFxuICAgICAgICAgICAgICAgICAgICBcIl0pKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdmFyIG1hdGNoID0gdGhpcy5fYnVmZmVyLm1hdGNoKHRoaXMuX2NzaV9yZWdleCk7XG4gICAgICAgICAgICAgICAgaWYgKG1hdGNoID09PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgICAgIHBrdC5raW5kID0gUGFja2V0S2luZC5JbmNvbXBsZXRlO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcGt0O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAobWF0Y2hbNF0pIHtcbiAgICAgICAgICAgICAgICAgICAgcGt0LmtpbmQgPSBQYWNrZXRLaW5kLkVTQztcbiAgICAgICAgICAgICAgICAgICAgcGt0LnRleHQgPSB0aGlzLl9idWZmZXIuc2xpY2UoMCwgMSk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2J1ZmZlciA9IHRoaXMuX2J1ZmZlci5zbGljZSgxKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHBrdDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKChtYXRjaFsxXSAhPSAnJykgfHwgKG1hdGNoWzNdICE9ICdtJykpXG4gICAgICAgICAgICAgICAgICAgIHBrdC5raW5kID0gUGFja2V0S2luZC5Vbmtub3duO1xuICAgICAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICAgICAgcGt0LmtpbmQgPSBQYWNrZXRLaW5kLlNHUjtcbiAgICAgICAgICAgICAgICBwa3QudGV4dCA9IG1hdGNoWzJdO1xuICAgICAgICAgICAgICAgIHZhciBycG9zID0gbWF0Y2hbMF0ubGVuZ3RoO1xuICAgICAgICAgICAgICAgIHRoaXMuX2J1ZmZlciA9IHRoaXMuX2J1ZmZlci5zbGljZShycG9zKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gcGt0O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKG5leHRfY2hhciA9PSAnXScpIHtcbiAgICAgICAgICAgICAgICBpZiAobGVuIDwgNCkge1xuICAgICAgICAgICAgICAgICAgICBwa3Qua2luZCA9IFBhY2tldEtpbmQuSW5jb21wbGV0ZTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHBrdDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKCh0aGlzLl9idWZmZXIuY2hhckF0KDIpICE9ICc4JylcbiAgICAgICAgICAgICAgICAgICAgfHwgKHRoaXMuX2J1ZmZlci5jaGFyQXQoMykgIT0gJzsnKSkge1xuICAgICAgICAgICAgICAgICAgICBwa3Qua2luZCA9IFBhY2tldEtpbmQuRVNDO1xuICAgICAgICAgICAgICAgICAgICBwa3QudGV4dCA9IHRoaXMuX2J1ZmZlci5zbGljZSgwLCAxKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fYnVmZmVyID0gdGhpcy5fYnVmZmVyLnNsaWNlKDEpO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcGt0O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAoIXRoaXMuX29zY19zdCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9vc2Nfc3QgPSByZ3hHKF9fbWFrZVRlbXBsYXRlT2JqZWN0KFtcIlxcbiAgICAgICAgICAgICAgICAgICAgICAgICg/OiAgICAgICAgICAgICAgICAgICAgICAgICAjIGxlZ2FsIHNlcXVlbmNlXFxuICAgICAgICAgICAgICAgICAgICAgICAgICAoXFx1MDAxQlxcXFwpICAgICAgICAgICAgICAgICAgICAjIEVTQyAgICAgICAgICAgICAgICAgICAgICAgICAgIHwgICAgICAgICAgICAgICAgICAgICAgICAgICAjIGFsdGVybmF0ZVxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgKFxcdTAwMDcpICAgICAgICAgICAgICAgICAgICAgICMgQkVMICh3aGF0IHh0ZXJtIGRpZClcXG4gICAgICAgICAgICAgICAgICAgICAgICApXFxuICAgICAgICAgICAgICAgICAgICAgICAgfCAgICAgICAgICAgICAgICAgICAgICAgICAgICMgYWx0ZXJuYXRlIChzZWNvbmQgYXR0ZW1wdClcXG4gICAgICAgICAgICAgICAgICAgICAgICAoICAgICAgICAgICAgICAgICAgICAgICAgICAgIyBpbGxlZ2FsIHNlcXVlbmNlXFxuICAgICAgICAgICAgICAgICAgICAgICAgICBbXFwwLVxcdTAwMDZdICAgICAgICAgICAgICAgICAjIGFueXRoaW5nIGlsbGVnYWxcXG4gICAgICAgICAgICAgICAgICAgICAgICAgIHwgICAgICAgICAgICAgICAgICAgICAgICAgICAjIGFsdGVybmF0ZVxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgW1xcYi1cXHUwMDFBXSAgICAgICAgICAgICAgICAgIyBhbnl0aGluZyBpbGxlZ2FsXFxuICAgICAgICAgICAgICAgICAgICAgICAgICB8ICAgICAgICAgICAgICAgICAgICAgICAgICAgIyBhbHRlcm5hdGVcXG4gICAgICAgICAgICAgICAgICAgICAgICAgIFtcXHUwMDFDLVxcdTAwMUZdICAgICAgICAgICAgICAgICAjIGFueXRoaW5nIGlsbGVnYWxcXG4gICAgICAgICAgICAgICAgICAgICAgICApXFxuICAgICAgICAgICAgICAgICAgICBcIl0sIFtcIlxcbiAgICAgICAgICAgICAgICAgICAgICAgICg/OiAgICAgICAgICAgICAgICAgICAgICAgICAjIGxlZ2FsIHNlcXVlbmNlXFxuICAgICAgICAgICAgICAgICAgICAgICAgICAoXFxcXHgxYlxcXFxcXFxcKSAgICAgICAgICAgICAgICAgICAgIyBFU0MgXFxcXFxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgfCAgICAgICAgICAgICAgICAgICAgICAgICAgICMgYWx0ZXJuYXRlXFxuICAgICAgICAgICAgICAgICAgICAgICAgICAoXFxcXHgwNykgICAgICAgICAgICAgICAgICAgICAgIyBCRUwgKHdoYXQgeHRlcm0gZGlkKVxcbiAgICAgICAgICAgICAgICAgICAgICAgIClcXG4gICAgICAgICAgICAgICAgICAgICAgICB8ICAgICAgICAgICAgICAgICAgICAgICAgICAgIyBhbHRlcm5hdGUgKHNlY29uZCBhdHRlbXB0KVxcbiAgICAgICAgICAgICAgICAgICAgICAgICggICAgICAgICAgICAgICAgICAgICAgICAgICAjIGlsbGVnYWwgc2VxdWVuY2VcXG4gICAgICAgICAgICAgICAgICAgICAgICAgIFtcXFxceDAwLVxcXFx4MDZdICAgICAgICAgICAgICAgICAjIGFueXRoaW5nIGlsbGVnYWxcXG4gICAgICAgICAgICAgICAgICAgICAgICAgIHwgICAgICAgICAgICAgICAgICAgICAgICAgICAjIGFsdGVybmF0ZVxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgW1xcXFx4MDgtXFxcXHgxYV0gICAgICAgICAgICAgICAgICMgYW55dGhpbmcgaWxsZWdhbFxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgfCAgICAgICAgICAgICAgICAgICAgICAgICAgICMgYWx0ZXJuYXRlXFxuICAgICAgICAgICAgICAgICAgICAgICAgICBbXFxcXHgxYy1cXFxceDFmXSAgICAgICAgICAgICAgICAgIyBhbnl0aGluZyBpbGxlZ2FsXFxuICAgICAgICAgICAgICAgICAgICAgICAgKVxcbiAgICAgICAgICAgICAgICAgICAgXCJdKSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHRoaXMuX29zY19zdC5sYXN0SW5kZXggPSAwO1xuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIG1hdGNoXzEgPSB0aGlzLl9vc2Nfc3QuZXhlYyh0aGlzLl9idWZmZXIpO1xuICAgICAgICAgICAgICAgICAgICBpZiAobWF0Y2hfMSA9PT0gbnVsbCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcGt0LmtpbmQgPSBQYWNrZXRLaW5kLkluY29tcGxldGU7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gcGt0O1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGlmIChtYXRjaF8xWzNdKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBwa3Qua2luZCA9IFBhY2tldEtpbmQuRVNDO1xuICAgICAgICAgICAgICAgICAgICAgICAgcGt0LnRleHQgPSB0aGlzLl9idWZmZXIuc2xpY2UoMCwgMSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9idWZmZXIgPSB0aGlzLl9idWZmZXIuc2xpY2UoMSk7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gcGt0O1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIG1hdGNoXzIgPSB0aGlzLl9vc2Nfc3QuZXhlYyh0aGlzLl9idWZmZXIpO1xuICAgICAgICAgICAgICAgICAgICBpZiAobWF0Y2hfMiA9PT0gbnVsbCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcGt0LmtpbmQgPSBQYWNrZXRLaW5kLkluY29tcGxldGU7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gcGt0O1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGlmIChtYXRjaF8yWzNdKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBwa3Qua2luZCA9IFBhY2tldEtpbmQuRVNDO1xuICAgICAgICAgICAgICAgICAgICAgICAgcGt0LnRleHQgPSB0aGlzLl9idWZmZXIuc2xpY2UoMCwgMSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9idWZmZXIgPSB0aGlzLl9idWZmZXIuc2xpY2UoMSk7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gcGt0O1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmICghdGhpcy5fb3NjX3JlZ2V4KSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX29zY19yZWdleCA9IHJneChfX21ha2VUZW1wbGF0ZU9iamVjdChbXCJcXG4gICAgICAgICAgICAgICAgICAgICAgICBeICAgICAgICAgICAgICAgICAgICAgICAgICAgIyBiZWdpbm5pbmcgb2YgbGluZVxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAjXFxuICAgICAgICAgICAgICAgICAgICAgICAgXFx1MDAxQl04OyAgICAgICAgICAgICAgICAgICAgIyBPU0MgSHlwZXJsaW5rXFxuICAgICAgICAgICAgICAgICAgICAgICAgWyAtOjwtfl0qICAgICAgICMgcGFyYW1zIChleGNsdWRpbmcgOylcXG4gICAgICAgICAgICAgICAgICAgICAgICA7ICAgICAgICAgICAgICAgICAgICAgICAgICAgIyBlbmQgb2YgcGFyYW1zXFxuICAgICAgICAgICAgICAgICAgICAgICAgKFshLX5dezAsNTEyfSkgICAgICAgICMgVVJMIGNhcHR1cmVcXG4gICAgICAgICAgICAgICAgICAgICAgICAoPzogICAgICAgICAgICAgICAgICAgICAgICAgIyBTVFxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgKD86XFx1MDAxQlxcXFwpICAgICAgICAgICAgICAgICAgIyBFU0MgICAgICAgICAgICAgICAgICAgICAgICAgICB8ICAgICAgICAgICAgICAgICAgICAgICAgICAgIyBhbHRlcm5hdGVcXG4gICAgICAgICAgICAgICAgICAgICAgICAgICg/OlxcdTAwMDcpICAgICAgICAgICAgICAgICAgICAjIEJFTCAod2hhdCB4dGVybSBkaWQpXFxuICAgICAgICAgICAgICAgICAgICAgICAgKVxcbiAgICAgICAgICAgICAgICAgICAgICAgIChbIS1+XSspICAgICAgICAgICAgICAjIFRFWFQgY2FwdHVyZVxcbiAgICAgICAgICAgICAgICAgICAgICAgIFxcdTAwMUJdODs7ICAgICAgICAgICAgICAgICAgICMgT1NDIEh5cGVybGluayBFbmRcXG4gICAgICAgICAgICAgICAgICAgICAgICAoPzogICAgICAgICAgICAgICAgICAgICAgICAgIyBTVFxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgKD86XFx1MDAxQlxcXFwpICAgICAgICAgICAgICAgICAgIyBFU0MgICAgICAgICAgICAgICAgICAgICAgICAgICB8ICAgICAgICAgICAgICAgICAgICAgICAgICAgIyBhbHRlcm5hdGVcXG4gICAgICAgICAgICAgICAgICAgICAgICAgICg/OlxcdTAwMDcpICAgICAgICAgICAgICAgICAgICAjIEJFTCAod2hhdCB4dGVybSBkaWQpXFxuICAgICAgICAgICAgICAgICAgICAgICAgKVxcbiAgICAgICAgICAgICAgICAgICAgXCJdLCBbXCJcXG4gICAgICAgICAgICAgICAgICAgICAgICBeICAgICAgICAgICAgICAgICAgICAgICAgICAgIyBiZWdpbm5pbmcgb2YgbGluZVxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAjXFxuICAgICAgICAgICAgICAgICAgICAgICAgXFxcXHgxYlxcXFxdODsgICAgICAgICAgICAgICAgICAgICMgT1NDIEh5cGVybGlua1xcbiAgICAgICAgICAgICAgICAgICAgICAgIFtcXFxceDIwLVxcXFx4M2FcXFxceDNjLVxcXFx4N2VdKiAgICAgICAjIHBhcmFtcyAoZXhjbHVkaW5nIDspXFxuICAgICAgICAgICAgICAgICAgICAgICAgOyAgICAgICAgICAgICAgICAgICAgICAgICAgICMgZW5kIG9mIHBhcmFtc1xcbiAgICAgICAgICAgICAgICAgICAgICAgIChbXFxcXHgyMS1cXFxceDdlXXswLDUxMn0pICAgICAgICAjIFVSTCBjYXB0dXJlXFxuICAgICAgICAgICAgICAgICAgICAgICAgKD86ICAgICAgICAgICAgICAgICAgICAgICAgICMgU1RcXG4gICAgICAgICAgICAgICAgICAgICAgICAgICg/OlxcXFx4MWJcXFxcXFxcXCkgICAgICAgICAgICAgICAgICAjIEVTQyBcXFxcXFxuICAgICAgICAgICAgICAgICAgICAgICAgICB8ICAgICAgICAgICAgICAgICAgICAgICAgICAgIyBhbHRlcm5hdGVcXG4gICAgICAgICAgICAgICAgICAgICAgICAgICg/OlxcXFx4MDcpICAgICAgICAgICAgICAgICAgICAjIEJFTCAod2hhdCB4dGVybSBkaWQpXFxuICAgICAgICAgICAgICAgICAgICAgICAgKVxcbiAgICAgICAgICAgICAgICAgICAgICAgIChbXFxcXHgyMS1cXFxceDdlXSspICAgICAgICAgICAgICAjIFRFWFQgY2FwdHVyZVxcbiAgICAgICAgICAgICAgICAgICAgICAgIFxcXFx4MWJcXFxcXTg7OyAgICAgICAgICAgICAgICAgICAjIE9TQyBIeXBlcmxpbmsgRW5kXFxuICAgICAgICAgICAgICAgICAgICAgICAgKD86ICAgICAgICAgICAgICAgICAgICAgICAgICMgU1RcXG4gICAgICAgICAgICAgICAgICAgICAgICAgICg/OlxcXFx4MWJcXFxcXFxcXCkgICAgICAgICAgICAgICAgICAjIEVTQyBcXFxcXFxuICAgICAgICAgICAgICAgICAgICAgICAgICB8ICAgICAgICAgICAgICAgICAgICAgICAgICAgIyBhbHRlcm5hdGVcXG4gICAgICAgICAgICAgICAgICAgICAgICAgICg/OlxcXFx4MDcpICAgICAgICAgICAgICAgICAgICAjIEJFTCAod2hhdCB4dGVybSBkaWQpXFxuICAgICAgICAgICAgICAgICAgICAgICAgKVxcbiAgICAgICAgICAgICAgICAgICAgXCJdKSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHZhciBtYXRjaCA9IHRoaXMuX2J1ZmZlci5tYXRjaCh0aGlzLl9vc2NfcmVnZXgpO1xuICAgICAgICAgICAgICAgIGlmIChtYXRjaCA9PT0gbnVsbCkge1xuICAgICAgICAgICAgICAgICAgICBwa3Qua2luZCA9IFBhY2tldEtpbmQuRVNDO1xuICAgICAgICAgICAgICAgICAgICBwa3QudGV4dCA9IHRoaXMuX2J1ZmZlci5zbGljZSgwLCAxKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fYnVmZmVyID0gdGhpcy5fYnVmZmVyLnNsaWNlKDEpO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcGt0O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBwa3Qua2luZCA9IFBhY2tldEtpbmQuT1NDVVJMO1xuICAgICAgICAgICAgICAgIHBrdC51cmwgPSBtYXRjaFsxXTtcbiAgICAgICAgICAgICAgICBwa3QudGV4dCA9IG1hdGNoWzJdO1xuICAgICAgICAgICAgICAgIHZhciBycG9zID0gbWF0Y2hbMF0ubGVuZ3RoO1xuICAgICAgICAgICAgICAgIHRoaXMuX2J1ZmZlciA9IHRoaXMuX2J1ZmZlci5zbGljZShycG9zKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gcGt0O1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfTtcbiAgICBBbnNpVXAucHJvdG90eXBlLmFuc2lfdG9faHRtbCA9IGZ1bmN0aW9uICh0eHQpIHtcbiAgICAgICAgdGhpcy5hcHBlbmRfYnVmZmVyKHR4dCk7XG4gICAgICAgIHZhciBibG9ja3MgPSBbXTtcbiAgICAgICAgd2hpbGUgKHRydWUpIHtcbiAgICAgICAgICAgIHZhciBwYWNrZXQgPSB0aGlzLmdldF9uZXh0X3BhY2tldCgpO1xuICAgICAgICAgICAgaWYgKChwYWNrZXQua2luZCA9PSBQYWNrZXRLaW5kLkVPUylcbiAgICAgICAgICAgICAgICB8fCAocGFja2V0LmtpbmQgPT0gUGFja2V0S2luZC5JbmNvbXBsZXRlKSlcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGlmICgocGFja2V0LmtpbmQgPT0gUGFja2V0S2luZC5FU0MpXG4gICAgICAgICAgICAgICAgfHwgKHBhY2tldC5raW5kID09IFBhY2tldEtpbmQuVW5rbm93bikpXG4gICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICBpZiAocGFja2V0LmtpbmQgPT0gUGFja2V0S2luZC5UZXh0KVxuICAgICAgICAgICAgICAgIGJsb2Nrcy5wdXNoKHRoaXMudHJhbnNmb3JtX3RvX2h0bWwodGhpcy53aXRoX3N0YXRlKHBhY2tldCkpKTtcbiAgICAgICAgICAgIGVsc2UgaWYgKHBhY2tldC5raW5kID09IFBhY2tldEtpbmQuU0dSKVxuICAgICAgICAgICAgICAgIHRoaXMucHJvY2Vzc19hbnNpKHBhY2tldCk7XG4gICAgICAgICAgICBlbHNlIGlmIChwYWNrZXQua2luZCA9PSBQYWNrZXRLaW5kLk9TQ1VSTClcbiAgICAgICAgICAgICAgICBibG9ja3MucHVzaCh0aGlzLnByb2Nlc3NfaHlwZXJsaW5rKHBhY2tldCkpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBibG9ja3Muam9pbihcIlwiKTtcbiAgICB9O1xuICAgIEFuc2lVcC5wcm90b3R5cGUud2l0aF9zdGF0ZSA9IGZ1bmN0aW9uIChwa3QpIHtcbiAgICAgICAgcmV0dXJuIHsgYm9sZDogdGhpcy5ib2xkLCBmZzogdGhpcy5mZywgYmc6IHRoaXMuYmcsIHRleHQ6IHBrdC50ZXh0IH07XG4gICAgfTtcbiAgICBBbnNpVXAucHJvdG90eXBlLnByb2Nlc3NfYW5zaSA9IGZ1bmN0aW9uIChwa3QpIHtcbiAgICAgICAgdmFyIHNncl9jbWRzID0gcGt0LnRleHQuc3BsaXQoJzsnKTtcbiAgICAgICAgd2hpbGUgKHNncl9jbWRzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIHZhciBzZ3JfY21kX3N0ciA9IHNncl9jbWRzLnNoaWZ0KCk7XG4gICAgICAgICAgICB2YXIgbnVtID0gcGFyc2VJbnQoc2dyX2NtZF9zdHIsIDEwKTtcbiAgICAgICAgICAgIGlmIChpc05hTihudW0pIHx8IG51bSA9PT0gMCkge1xuICAgICAgICAgICAgICAgIHRoaXMuZmcgPSB0aGlzLmJnID0gbnVsbDtcbiAgICAgICAgICAgICAgICB0aGlzLmJvbGQgPSBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKG51bSA9PT0gMSkge1xuICAgICAgICAgICAgICAgIHRoaXMuYm9sZCA9IHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmIChudW0gPT09IDIyKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5ib2xkID0gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmIChudW0gPT09IDM5KSB7XG4gICAgICAgICAgICAgICAgdGhpcy5mZyA9IG51bGw7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmIChudW0gPT09IDQ5KSB7XG4gICAgICAgICAgICAgICAgdGhpcy5iZyA9IG51bGw7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmICgobnVtID49IDMwKSAmJiAobnVtIDwgMzgpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5mZyA9IHRoaXMuYW5zaV9jb2xvcnNbMF1bKG51bSAtIDMwKV07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmICgobnVtID49IDQwKSAmJiAobnVtIDwgNDgpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5iZyA9IHRoaXMuYW5zaV9jb2xvcnNbMF1bKG51bSAtIDQwKV07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmICgobnVtID49IDkwKSAmJiAobnVtIDwgOTgpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5mZyA9IHRoaXMuYW5zaV9jb2xvcnNbMV1bKG51bSAtIDkwKV07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmICgobnVtID49IDEwMCkgJiYgKG51bSA8IDEwOCkpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmJnID0gdGhpcy5hbnNpX2NvbG9yc1sxXVsobnVtIC0gMTAwKV07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmIChudW0gPT09IDM4IHx8IG51bSA9PT0gNDgpIHtcbiAgICAgICAgICAgICAgICBpZiAoc2dyX2NtZHMubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgaXNfZm9yZWdyb3VuZCA9IChudW0gPT09IDM4KTtcbiAgICAgICAgICAgICAgICAgICAgdmFyIG1vZGVfY21kID0gc2dyX2NtZHMuc2hpZnQoKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKG1vZGVfY21kID09PSAnNScgJiYgc2dyX2NtZHMubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHBhbGV0dGVfaW5kZXggPSBwYXJzZUludChzZ3JfY21kcy5zaGlmdCgpLCAxMCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAocGFsZXR0ZV9pbmRleCA+PSAwICYmIHBhbGV0dGVfaW5kZXggPD0gMjU1KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGlzX2ZvcmVncm91bmQpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZmcgPSB0aGlzLnBhbGV0dGVfMjU2W3BhbGV0dGVfaW5kZXhdO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5iZyA9IHRoaXMucGFsZXR0ZV8yNTZbcGFsZXR0ZV9pbmRleF07XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgaWYgKG1vZGVfY21kID09PSAnMicgJiYgc2dyX2NtZHMubGVuZ3RoID4gMikge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHIgPSBwYXJzZUludChzZ3JfY21kcy5zaGlmdCgpLCAxMCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgZyA9IHBhcnNlSW50KHNncl9jbWRzLnNoaWZ0KCksIDEwKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBiID0gcGFyc2VJbnQoc2dyX2NtZHMuc2hpZnQoKSwgMTApO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKChyID49IDAgJiYgciA8PSAyNTUpICYmIChnID49IDAgJiYgZyA8PSAyNTUpICYmIChiID49IDAgJiYgYiA8PSAyNTUpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGMgPSB7IHJnYjogW3IsIGcsIGJdLCBjbGFzc19uYW1lOiAndHJ1ZWNvbG9yJyB9O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpc19mb3JlZ3JvdW5kKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmZnID0gYztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuYmcgPSBjO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfTtcbiAgICBBbnNpVXAucHJvdG90eXBlLnRyYW5zZm9ybV90b19odG1sID0gZnVuY3Rpb24gKGZyYWdtZW50KSB7XG4gICAgICAgIHZhciB0eHQgPSBmcmFnbWVudC50ZXh0O1xuICAgICAgICBpZiAodHh0Lmxlbmd0aCA9PT0gMClcbiAgICAgICAgICAgIHJldHVybiB0eHQ7XG4gICAgICAgIGlmICh0aGlzLl9lc2NhcGVfZm9yX2h0bWwpXG4gICAgICAgICAgICB0eHQgPSB0aGlzLmVzY2FwZV90eHRfZm9yX2h0bWwodHh0KTtcbiAgICAgICAgaWYgKCFmcmFnbWVudC5ib2xkICYmIGZyYWdtZW50LmZnID09PSBudWxsICYmIGZyYWdtZW50LmJnID09PSBudWxsKVxuICAgICAgICAgICAgcmV0dXJuIHR4dDtcbiAgICAgICAgdmFyIHN0eWxlcyA9IFtdO1xuICAgICAgICB2YXIgY2xhc3NlcyA9IFtdO1xuICAgICAgICB2YXIgZmcgPSBmcmFnbWVudC5mZztcbiAgICAgICAgdmFyIGJnID0gZnJhZ21lbnQuYmc7XG4gICAgICAgIGlmIChmcmFnbWVudC5ib2xkKVxuICAgICAgICAgICAgc3R5bGVzLnB1c2goJ2ZvbnQtd2VpZ2h0OmJvbGQnKTtcbiAgICAgICAgaWYgKCF0aGlzLl91c2VfY2xhc3Nlcykge1xuICAgICAgICAgICAgaWYgKGZnKVxuICAgICAgICAgICAgICAgIHN0eWxlcy5wdXNoKFwiY29sb3I6cmdiKFwiICsgZmcucmdiLmpvaW4oJywnKSArIFwiKVwiKTtcbiAgICAgICAgICAgIGlmIChiZylcbiAgICAgICAgICAgICAgICBzdHlsZXMucHVzaChcImJhY2tncm91bmQtY29sb3I6cmdiKFwiICsgYmcucmdiICsgXCIpXCIpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgaWYgKGZnKSB7XG4gICAgICAgICAgICAgICAgaWYgKGZnLmNsYXNzX25hbWUgIT09ICd0cnVlY29sb3InKSB7XG4gICAgICAgICAgICAgICAgICAgIGNsYXNzZXMucHVzaChmZy5jbGFzc19uYW1lICsgXCItZmdcIik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBzdHlsZXMucHVzaChcImNvbG9yOnJnYihcIiArIGZnLnJnYi5qb2luKCcsJykgKyBcIilcIik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGJnKSB7XG4gICAgICAgICAgICAgICAgaWYgKGJnLmNsYXNzX25hbWUgIT09ICd0cnVlY29sb3InKSB7XG4gICAgICAgICAgICAgICAgICAgIGNsYXNzZXMucHVzaChiZy5jbGFzc19uYW1lICsgXCItYmdcIik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBzdHlsZXMucHVzaChcImJhY2tncm91bmQtY29sb3I6cmdiKFwiICsgYmcucmdiLmpvaW4oJywnKSArIFwiKVwiKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgdmFyIGNsYXNzX3N0cmluZyA9ICcnO1xuICAgICAgICB2YXIgc3R5bGVfc3RyaW5nID0gJyc7XG4gICAgICAgIGlmIChjbGFzc2VzLmxlbmd0aClcbiAgICAgICAgICAgIGNsYXNzX3N0cmluZyA9IFwiIGNsYXNzPVxcXCJcIiArIGNsYXNzZXMuam9pbignICcpICsgXCJcXFwiXCI7XG4gICAgICAgIGlmIChzdHlsZXMubGVuZ3RoKVxuICAgICAgICAgICAgc3R5bGVfc3RyaW5nID0gXCIgc3R5bGU9XFxcIlwiICsgc3R5bGVzLmpvaW4oJzsnKSArIFwiXFxcIlwiO1xuICAgICAgICByZXR1cm4gXCI8c3BhblwiICsgc3R5bGVfc3RyaW5nICsgY2xhc3Nfc3RyaW5nICsgXCI+XCIgKyB0eHQgKyBcIjwvc3Bhbj5cIjtcbiAgICB9O1xuICAgIDtcbiAgICBBbnNpVXAucHJvdG90eXBlLnByb2Nlc3NfaHlwZXJsaW5rID0gZnVuY3Rpb24gKHBrdCkge1xuICAgICAgICB2YXIgcGFydHMgPSBwa3QudXJsLnNwbGl0KCc6Jyk7XG4gICAgICAgIGlmIChwYXJ0cy5sZW5ndGggPCAxKVxuICAgICAgICAgICAgcmV0dXJuICcnO1xuICAgICAgICBpZiAoIXRoaXMuX3VybF93aGl0ZWxpc3RbcGFydHNbMF1dKVxuICAgICAgICAgICAgcmV0dXJuICcnO1xuICAgICAgICB2YXIgcmVzdWx0ID0gXCI8YSBocmVmPVxcXCJcIiArIHRoaXMuZXNjYXBlX3R4dF9mb3JfaHRtbChwa3QudXJsKSArIFwiXFxcIj5cIiArIHRoaXMuZXNjYXBlX3R4dF9mb3JfaHRtbChwa3QudGV4dCkgKyBcIjwvYT5cIjtcbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9O1xuICAgIHJldHVybiBBbnNpVXA7XG59KCkpO1xuZnVuY3Rpb24gcmd4KHRtcGxPYmopIHtcbiAgICB2YXIgc3Vic3QgPSBbXTtcbiAgICBmb3IgKHZhciBfaSA9IDE7IF9pIDwgYXJndW1lbnRzLmxlbmd0aDsgX2krKykge1xuICAgICAgICBzdWJzdFtfaSAtIDFdID0gYXJndW1lbnRzW19pXTtcbiAgICB9XG4gICAgdmFyIHJlZ2V4VGV4dCA9IHRtcGxPYmoucmF3WzBdO1xuICAgIHZhciB3c3JneCA9IC9eXFxzK3xcXHMrXFxufFxccyojW1xcc1xcU10qP1xcbnxcXG4vZ207XG4gICAgdmFyIHR4dDIgPSByZWdleFRleHQucmVwbGFjZSh3c3JneCwgJycpO1xuICAgIHJldHVybiBuZXcgUmVnRXhwKHR4dDIpO1xufVxuZnVuY3Rpb24gcmd4Ryh0bXBsT2JqKSB7XG4gICAgdmFyIHN1YnN0ID0gW107XG4gICAgZm9yICh2YXIgX2kgPSAxOyBfaSA8IGFyZ3VtZW50cy5sZW5ndGg7IF9pKyspIHtcbiAgICAgICAgc3Vic3RbX2kgLSAxXSA9IGFyZ3VtZW50c1tfaV07XG4gICAgfVxuICAgIHZhciByZWdleFRleHQgPSB0bXBsT2JqLnJhd1swXTtcbiAgICB2YXIgd3NyZ3ggPSAvXlxccyt8XFxzK1xcbnxcXHMqI1tcXHNcXFNdKj9cXG58XFxuL2dtO1xuICAgIHZhciB0eHQyID0gcmVnZXhUZXh0LnJlcGxhY2Uod3NyZ3gsICcnKTtcbiAgICByZXR1cm4gbmV3IFJlZ0V4cCh0eHQyLCAnZycpO1xufVxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9YW5zaV91cC5qcy5tYXBcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG4gICAgZXhwb3J0cy5kZWZhdWx0ID0gQW5zaVVwO1xufSkpO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vbm9kZV9tb2R1bGVzL2Fuc2lfdXAvYW5zaV91cC5qcyIsImltcG9ydCB7IFNlcnZpY2UgfSBmcm9tIFwiLi4vY29tbW9uL2FwaVwiO1xuXG5jb25zdCBCQVNFX1VSTCA9IFwiL3plcm9ib3QvYWRtaW4vYWN0b3JzL2FsZXJ0YVwiO1xuXG5jbGFzcyBBbGVydHNTZXJ2aWNlIGV4dGVuZHMgU2VydmljZSB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHN1cGVyKEJBU0VfVVJMKTtcbiAgICB9XG5cbiAgICBsaXN0KCkge1xuICAgICAgICByZXR1cm4gdGhpcy5nZXRDYWxsKFwibGlzdF9hbGVydHNcIik7XG4gICAgfVxuXG4gICAgZGVsZXRlKGlkZW50aWZpZXJzKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnBvc3RDYWxsKFwiZGVsZXRlX2FsZXJ0c1wiLCB7XG4gICAgICAgICAgICBpZGVudGlmaWVyczogaWRlbnRpZmllcnNcbiAgICAgICAgfSk7XG4gICAgfVxufVxuXG5leHBvcnQgY29uc3QgYWxlcnRzID0gbmV3IEFsZXJ0c1NlcnZpY2UoKTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NvdXJjZXMvc2VydmljZXMvYWxlcnRzLmpzIiwiaW1wb3J0IHsgU2VydmljZSB9IGZyb20gXCIuLi9jb21tb24vYXBpXCI7XG5cbmNvbnN0IEJBU0VfVVJMID0gXCIvdGZncmlkX3NvbHV0aW9ucy90ZmdyaWRfc29sdXRpb25zL2FjdG9ycy90ZmdyaWRfc29sdXRpb25zXCI7XG5cblxuY2xhc3MgU29sdXRpb25zU2VydmljZSBleHRlbmRzIFNlcnZpY2Uge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICBzdXBlcihCQVNFX1VSTCk7XG4gICAgfVxuXG5cbiAgICBsaXN0KG9wdHMpIHtcbiAgICAgICAgb3B0cyA9IG9wdHMgfHwge307XG4gICAgICAgIHJldHVybiB0aGlzLmdldENhbGwoXCJzb2x1dGlvbnNfbGlzdFwiKTtcbiAgICB9XG5cblxuICAgIGRlbGV0ZShzb2x1dGlvblR5cGUsIHNvbHV0aW9uTmFtZSkge1xuICAgICAgICByZXR1cm4gdGhpcy5wb3N0Q2FsbChcInNvbHV0aW9uX2RlbGV0ZVwiLCB7IHNvbHV0aW9uX3R5cGU6IHNvbHV0aW9uVHlwZSwgc29sdXRpb25fbmFtZTogc29sdXRpb25OYW1lIH0pO1xuXG4gICAgfVxuXG59XG5cbmV4cG9ydCBjb25zdCBzb2x1dGlvbnMgPSBuZXcgU29sdXRpb25zU2VydmljZSgpO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc291cmNlcy9zZXJ2aWNlcy9kZXBsb3llZFNvbHV0aW9ucy5qcyIsImltcG9ydCB7IFNlcnZpY2UgfSBmcm9tIFwiLi4vY29tbW9uL2FwaVwiO1xuXG5jb25zdCBCQVNFX1VSTCA9IFwiL3plcm9ib3QvYWRtaW4vYWN0b3JzL2xvZ3NcIjtcblxuY2xhc3MgTG9nc1NlcnZpY2UgZXh0ZW5kcyBTZXJ2aWNlIHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgc3VwZXIoQkFTRV9VUkwpO1xuICAgIH1cblxuICAgIGxpc3RBcHBzKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5nZXRDYWxsKFwibGlzdF9hcHBzXCIpO1xuICAgIH1cblxuICAgIGxpc3QoYXBwTmFtZSwgbG9nSWQpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucG9zdENhbGwoXCJsaXN0XCIsIHtcbiAgICAgICAgICAgIGFwcG5hbWU6IGFwcE5hbWUsXG4gICAgICAgICAgICBpZF9mcm9tOiBsb2dJZFxuICAgICAgICB9KTtcbiAgICB9XG59XG5cbmV4cG9ydCBjb25zdCBsb2dzID0gbmV3IExvZ3NTZXJ2aWNlKCk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zb3VyY2VzL3NlcnZpY2VzL2xvZ3MuanMiLCJpbXBvcnQgeyBTZXJ2aWNlIH0gZnJvbSBcIi4uL2NvbW1vbi9hcGlcIjtcblxuY29uc3QgQkFTRV9VUkwgPSBcIi9hdXRoXCI7XG5cbmNsYXNzIEF1dGhTZXJ2aWNlIGV4dGVuZHMgU2VydmljZSB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHN1cGVyKEJBU0VfVVJMKTtcbiAgICB9XG5cbiAgICBnZXRDdXJyZW50VXNlcigpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0Q2FsbChcImF1dGhvcml6ZWRcIik7XG4gICAgfVxuXG4gICAgbG9nb3V0KCkge1xuICAgICAgICBjb25zdCBuZXh0VXJsID0gd2luZG93LmxvY2F0aW9uLnBhdGhuYW1lICsgd2luZG93LmxvY2F0aW9uLmhhc2g7XG4gICAgICAgIHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gYC9hdXRoL2xvZ291dD9uZXh0X3VybD0ke25leHRVcmx9YDtcbiAgICB9XG59XG5cbmV4cG9ydCBjb25zdCBhdXRoID0gbmV3IEF1dGhTZXJ2aWNlKCk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zb3VyY2VzL3NlcnZpY2VzL2F1dGguanMiLCJleHBvcnQgZnVuY3Rpb24gaW5wdXREaWFsb2coaGVhZCwgbGFiZWwsIGJ1dHRvbkxhYmVsLCBjYWxsYmFjaykge1xuICAgIGNvbnN0IHdpbmRvdyA9IHdlYml4LnVpKHtcbiAgICAgICAgdmlldzogXCJ3aW5kb3dcIixcbiAgICAgICAgaGVpZ2h0OiAyMDAsXG4gICAgICAgIHdpZHRoOiAzMDAsXG4gICAgICAgIG1vZGFsOiB0cnVlLFxuICAgICAgICBwb3NpdGlvbjogXCJjZW50ZXJcIixcbiAgICAgICAgaGVhZDogaGVhZCB8fCBcIklucHV0XCIsXG4gICAgICAgIGJvZHk6IHtcbiAgICAgICAgICAgIHZpZXc6IFwiZm9ybVwiLFxuICAgICAgICAgICAgZWxlbWVudHM6IFt7XG4gICAgICAgICAgICAgICAgaWQ6IFwiaW5wdXRfZGlhbG9nX3RleHRcIixcbiAgICAgICAgICAgICAgICB2aWV3OiBcInRleHRcIixcbiAgICAgICAgICAgICAgICBuYW1lOiBcImlucHV0XCIsXG4gICAgICAgICAgICAgICAgbGFiZWw6IGxhYmVsIHx8IFwiVmFsdWVcIixcbiAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICBjb2xzOiBbe1xuICAgICAgICAgICAgICAgICAgICB2aWV3OiBcImJ1dHRvblwiLFxuICAgICAgICAgICAgICAgICAgICBsYWJlbDogXCJDYW5jZWxcIixcbiAgICAgICAgICAgICAgICAgICAgY2xpY2s6ICgpID0+IHdpbmRvdy5oaWRlKCksXG4gICAgICAgICAgICAgICAgICAgIGNzczogXCJ3ZWJpeF9kYW5nZXJcIlxuICAgICAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICAgICAgdmlldzogXCJidXR0b25cIixcbiAgICAgICAgICAgICAgICAgICAgbGFiZWw6IGJ1dHRvbkxhYmVsIHx8IFwiT2tcIixcbiAgICAgICAgICAgICAgICAgICAgY2xpY2s6IGhhbmRsZUlucHV0LFxuICAgICAgICAgICAgICAgICAgICBjc3M6IFwid2ViaXhfcHJpbWFyeVwiXG4gICAgICAgICAgICAgICAgfV1cbiAgICAgICAgICAgIH1dXG4gICAgICAgIH1cbiAgICB9KTtcblxuICAgIGZ1bmN0aW9uIGhhbmRsZUlucHV0KCkge1xuICAgICAgICBjb25zdCB2YWx1ZSA9IHRoaXMuZ2V0Rm9ybVZpZXcoKS5lbGVtZW50cy5pbnB1dC5nZXRWYWx1ZSgpLnRyaW0oKTtcbiAgICAgICAgaWYgKCF2YWx1ZSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGNhbGxiYWNrIGluc3RhbmNlb2YgRnVuY3Rpb24pIHtcbiAgICAgICAgICAgIGNhbGxiYWNrKHZhbHVlKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHdpbmRvdy5oaWRlKCk7XG4gICAgfVxuXG5cbiAgICBjb25zdCB0ZXh0SW5wdXQgPSAkJChcImlucHV0X2RpYWxvZ190ZXh0XCIpO1xuICAgIHRleHRJbnB1dC5hdHRhY2hFdmVudChcIm9uRW50ZXJcIiwgaGFuZGxlSW5wdXQuYmluZCh0ZXh0SW5wdXQpKTtcblxuICAgIHdpbmRvdy5zaG93KCk7XG4gICAgd2ViaXguVUlNYW5hZ2VyLnNldEZvY3VzKHRleHRJbnB1dCk7XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zb3VyY2VzL2NvbW1vbi9kaWFsb2dzLmpzIiwiaW1wb3J0IHsgU2VydmljZSB9IGZyb20gXCIuLi9jb21tb24vYXBpXCI7XG5cbmNvbnN0IEJBU0VfVVJMID0gXCIvemVyb2JvdC93ZWJpbnRlcmZhY2UvYWN0b3JzL21kYm9va1wiO1xuXG5jbGFzcyBXaWtpc1NlcnZpY2UgZXh0ZW5kcyBTZXJ2aWNlIHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgc3VwZXIoQkFTRV9VUkwpO1xuICAgIH1cblxuICAgIGxpc3Qob3B0cykge1xuICAgICAgICBvcHRzID0gb3B0cyB8fCB7fTtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0Q2FsbChcImJvb2tzX2xpc3RcIik7XG4gICAgfVxufVxuXG5cbmV4cG9ydCBjb25zdCBwYWNrYWdlcyA9IG5ldyBXaWtpc1NlcnZpY2UoKTtcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zb3VyY2VzL3NlcnZpY2VzL3dpa2kuanMiLCJ2YXIgbWFwID0ge1xuXHRcIi4vZW5cIjogNTEsXG5cdFwiLi9lbi5qc1wiOiA1MVxufTtcbmZ1bmN0aW9uIHdlYnBhY2tDb250ZXh0KHJlcSkge1xuXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyh3ZWJwYWNrQ29udGV4dFJlc29sdmUocmVxKSk7XG59O1xuZnVuY3Rpb24gd2VicGFja0NvbnRleHRSZXNvbHZlKHJlcSkge1xuXHR2YXIgaWQgPSBtYXBbcmVxXTtcblx0aWYoIShpZCArIDEpKSAvLyBjaGVjayBmb3IgbnVtYmVyIG9yIHN0cmluZ1xuXHRcdHRocm93IG5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIgKyByZXEgKyBcIicuXCIpO1xuXHRyZXR1cm4gaWQ7XG59O1xud2VicGFja0NvbnRleHQua2V5cyA9IGZ1bmN0aW9uIHdlYnBhY2tDb250ZXh0S2V5cygpIHtcblx0cmV0dXJuIE9iamVjdC5rZXlzKG1hcCk7XG59O1xud2VicGFja0NvbnRleHQucmVzb2x2ZSA9IHdlYnBhY2tDb250ZXh0UmVzb2x2ZTtcbm1vZHVsZS5leHBvcnRzID0gd2VicGFja0NvbnRleHQ7XG53ZWJwYWNrQ29udGV4dC5pZCA9IDYyO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vc291cmNlcy9sb2NhbGVzIF5cXC5cXC8uKiRcbi8vIG1vZHVsZSBpZCA9IDYyXG4vLyBtb2R1bGUgY2h1bmtzID0gMCJdLCJzb3VyY2VSb290IjoiIn0=