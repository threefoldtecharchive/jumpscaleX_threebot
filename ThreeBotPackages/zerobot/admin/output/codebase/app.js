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
/******/ 	return __webpack_require__(__webpack_require__.s = 27);
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
        return __webpack_require__(29)("./" + url);
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
        var data = __webpack_require__(33)("./" + path);
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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__common_colors__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__common_formatters__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__services_alerts__ = __webpack_require__(31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__alert__ = __webpack_require__(14);
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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_packages__ = __webpack_require__(18);
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }





var CODE_URL = "/codeserver/?folder=/sandbox/code";
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
                }]
            }, iframe]
        };
    };

    CodeserverView.prototype.installCodeserverPackage = function installCodeserverPackage() {
        __WEBPACK_IMPORTED_MODULE_2__services_packages__["a" /* packages */].add(PACKAGE_PATH).then(function (data) {
            webix.message("Package installed successfully");
        }).fail(function (error) {
            webix.message("An error occurred while trying to install the package!");
        });
    };

    CodeserverView.prototype.init = function init(view) {
        view.codeserverIframe = $$("iframe-codeserver");
        view.installPackageContainer = $$("install-package");

        webix.extend(view.codeserverIframe, webix.ProgressBar);

        view.codeserverIframe.disable();
        view.codeserverIframe.showProgress({ type: "icon" });
        view.codeserverIframe.load(CODE_URL);

        $$("install_btn").attachEvent("onItemClick", this.installCodeserverPackage);

        __WEBPACK_IMPORTED_MODULE_1__services_health__["a" /* health */].getHealth().then(function (data) {
            var codeServerStatus = data.json().codeserver;
            if (codeServerStatus == "OK") {
                view.codeserverIframe.show();
                view.installPackageContainer.hide();
            } else {
                view.codeserverIframe.hide();
                view.installPackageContainer.show();
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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__appLogs__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_logs__ = __webpack_require__(32);
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
/* 9 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_webix_jet__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__common_formatters__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_myjobs__ = __webpack_require__(25);
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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__errors_dialog__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_packages__ = __webpack_require__(18);
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

        promise.then(function (data) {
            if (callback instanceof Function) {
                callback(data);
            }

            webix.message({
                type: "success",
                text: "The operation has beed done successfully"
            });
        }).catch(function (error) {
            _this2.showError("Error has happened during this operation: " + error.response, "Error");
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

        __WEBPACK_IMPORTED_MODULE_2__services_packages__["a" /* packages */].list().then(function (data) {
            var allPackages = data.json().packages;
            self.packageTable.parse(mapData(allPackages));
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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_myjobs__ = __webpack_require__(25);
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
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ansiUp; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_ansi_up__ = __webpack_require__(30);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_ansi_up___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_ansi_up__);


var ansiUp = new __WEBPACK_IMPORTED_MODULE_0_ansi_up___default.a();

/***/ }),
/* 14 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_webix_jet__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__common_colors__ = __webpack_require__(13);
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
/* 15 */
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
/* 16 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ErrorView", function() { return ErrorView; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_webix_jet__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__common_colors__ = __webpack_require__(13);
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
/* 17 */
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
/* 18 */
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
/* 19 */
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
/* 20 */
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
/* 21 */
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
/* 22 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_webix_jet__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__processesChildView__ = __webpack_require__(15);
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
/* 23 */
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
        __WEBPACK_IMPORTED_MODULE_1__services_health__["a" /* health */].getRunningPorts().then(function (data) {
            self.portsTable.parse(data.json());
        });
    };

    return runningPortsView;
}(__WEBPACK_IMPORTED_MODULE_0_webix_jet__["b" /* JetView */]);

/* harmony default export */ __webpack_exports__["default"] = (runningPortsView);

/***/ }),
/* 24 */
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
/* 25 */
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
/* 26 */
/***/ (function(module, exports) {



/***/ }),
/* 27 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__styles_app_css__ = __webpack_require__(28);
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
/* 28 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./alerts": 3,
	"./alerts/": 3,
	"./alerts/alert": 14,
	"./alerts/alert.js": 14,
	"./alerts/index": 3,
	"./alerts/index.js": 3,
	"./codeserver": 5,
	"./codeserver/": 5,
	"./codeserver/index": 5,
	"./codeserver/index.js": 5,
	"./dash": 6,
	"./dash/": 6,
	"./dash/diskSpace": 19,
	"./dash/diskSpace.js": 19,
	"./dash/health": 20,
	"./dash/health.js": 20,
	"./dash/index": 6,
	"./dash/index.js": 6,
	"./dash/jsxInfo": 21,
	"./dash/jsxInfo.js": 21,
	"./dash/processes": 22,
	"./dash/processes.js": 22,
	"./dash/processesChildView": 15,
	"./dash/processesChildView.js": 15,
	"./dash/runningPorts": 23,
	"./dash/runningPorts.js": 23,
	"./errors/dialog": 16,
	"./errors/dialog.js": 16,
	"./jupyter": 7,
	"./jupyter/": 7,
	"./jupyter/index": 7,
	"./jupyter/index.js": 7,
	"./logs": 8,
	"./logs/": 8,
	"./logs/appLogs": 17,
	"./logs/appLogs.js": 17,
	"./logs/index": 8,
	"./logs/index.js": 8,
	"./main": 24,
	"./main.js": 24,
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
webpackContext.id = 29;

/***/ }),
/* 30 */
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
/* 31 */
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
/* 32 */
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
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./en": 26,
	"./en.js": 26
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
webpackContext.id = 33;

/***/ })
/******/ ])["default"];
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgNWY5ZmRlOGJkYWEzNjAzMTZkNzUiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3dlYml4LWpldC9kaXN0L2VzNi9qZXQuanMiLCJ3ZWJwYWNrOi8vLy4vc291cmNlcy9zZXJ2aWNlcy9oZWFsdGguanMiLCJ3ZWJwYWNrOi8vLy4vc291cmNlcy9jb21tb24vYXBpLmpzIiwid2VicGFjazovLy8uL3NvdXJjZXMvdmlld3MvYWxlcnRzL2luZGV4LmpzIiwid2VicGFjazovLy8uL3NvdXJjZXMvY29tbW9uL2Zvcm1hdHRlcnMuanMiLCJ3ZWJwYWNrOi8vLy4vc291cmNlcy92aWV3cy9jb2Rlc2VydmVyL2luZGV4LmpzIiwid2VicGFjazovLy8uL3NvdXJjZXMvdmlld3MvZGFzaC9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9zb3VyY2VzL3ZpZXdzL2p1cHl0ZXIvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vc291cmNlcy92aWV3cy9sb2dzL2luZGV4LmpzIiwid2VicGFjazovLy8uL3NvdXJjZXMvdmlld3MvbXlqb2JzL2luZGV4LmpzIiwid2VicGFjazovLy8uL3NvdXJjZXMvdmlld3MvcGFja2FnZXMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vc291cmNlcy92aWV3cy93aWtpcy9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9zb3VyY2VzL3ZpZXdzL3dvcmtlcnMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vc291cmNlcy9jb21tb24vY29sb3JzLmpzIiwid2VicGFjazovLy8uL3NvdXJjZXMvdmlld3MvYWxlcnRzL2FsZXJ0LmpzIiwid2VicGFjazovLy8uL3NvdXJjZXMvdmlld3MvZGFzaC9wcm9jZXNzZXNDaGlsZFZpZXcuanMiLCJ3ZWJwYWNrOi8vLy4vc291cmNlcy92aWV3cy9lcnJvcnMvZGlhbG9nLmpzIiwid2VicGFjazovLy8uL3NvdXJjZXMvdmlld3MvbG9ncy9hcHBMb2dzLmpzIiwid2VicGFjazovLy8uL3NvdXJjZXMvc2VydmljZXMvcGFja2FnZXMuanMiLCJ3ZWJwYWNrOi8vLy4vc291cmNlcy92aWV3cy9kYXNoL2Rpc2tTcGFjZS5qcyIsIndlYnBhY2s6Ly8vLi9zb3VyY2VzL3ZpZXdzL2Rhc2gvaGVhbHRoLmpzIiwid2VicGFjazovLy8uL3NvdXJjZXMvdmlld3MvZGFzaC9qc3hJbmZvLmpzIiwid2VicGFjazovLy8uL3NvdXJjZXMvdmlld3MvZGFzaC9wcm9jZXNzZXMuanMiLCJ3ZWJwYWNrOi8vLy4vc291cmNlcy92aWV3cy9kYXNoL3J1bm5pbmdQb3J0cy5qcyIsIndlYnBhY2s6Ly8vLi9zb3VyY2VzL3ZpZXdzL21haW4uanMiLCJ3ZWJwYWNrOi8vLy4vc291cmNlcy9zZXJ2aWNlcy9teWpvYnMuanMiLCJ3ZWJwYWNrOi8vLy4vc291cmNlcy9hcHAuanMiLCJ3ZWJwYWNrOi8vLy4vc291cmNlcy9zdHlsZXMvYXBwLmNzcyIsIndlYnBhY2s6Ly8vLi9zb3VyY2VzL3ZpZXdzIF5cXC5cXC8uKiQiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2Fuc2lfdXAvYW5zaV91cC5qcyIsIndlYnBhY2s6Ly8vLi9zb3VyY2VzL3NlcnZpY2VzL2FsZXJ0cy5qcyIsIndlYnBhY2s6Ly8vLi9zb3VyY2VzL3NlcnZpY2VzL2xvZ3MuanMiLCJ3ZWJwYWNrOi8vLy4vc291cmNlcy9sb2NhbGVzIF5cXC5cXC8uKiQiXSwibmFtZXMiOlsiTmF2aWdhdGlvbkJsb2NrZWQiLCJKZXRCYXNlIiwid2ViaXgiLCJ3ZWJpeEpldCIsIl9ldmVudHMiLCJfc3VicyIsIl9kYXRhIiwiZ2V0Um9vdCIsIl9yb290IiwiZGVzdHJ1Y3RvciIsIl9kZXRhY2hFdmVudHMiLCJfZGVzdHJveVN1YnMiLCJfY29udGFpbmVyIiwiYXBwIiwiX3BhcmVudCIsInNldFBhcmFtIiwiaWQiLCJ2YWx1ZSIsInVybCIsIl9zZWdtZW50IiwidXBkYXRlIiwic2hvdyIsImdldFBhcmFtIiwicGFyZW50IiwidmlldyIsImdldFBhcmVudFZpZXciLCJnZXRVcmwiLCJzdWJ1cmwiLCJnZXRVcmxTdHJpbmciLCJ0b1N0cmluZyIsIiQkIiwicm9vdCIsInF1ZXJ5VmlldyIsIm9iaiIsImNvbmZpZyIsImxvY2FsSWQiLCIkc2NvcGUiLCJvbiIsIm5hbWUiLCJjb2RlIiwiYXR0YWNoRXZlbnQiLCJwdXNoIiwiY29udGFpbnMiLCJrZXkiLCJraWQiLCJnZXRTdWJWaWV3Iiwic3ViIiwiZ2V0U3ViVmlld0luZm8iLCJzdWJ2aWV3IiwicG9wdXAiLCJldmVudHMiLCJpIiwibGVuZ3RoIiwiZGV0YWNoRXZlbnQiLCJzdWJWaWV3IiwiX2luaXRfdXJsX2RhdGEiLCJjdXJyZW50IiwiZXh0ZW5kIiwicGFyYW1zIiwiX2dldERlZmF1bHRTdWIiLCJkZWZhdWx0IiwiYnJhbmNoIiwiY2hpbGQiLCJfcm91dGVkX3ZpZXciLCJwYXJzZSIsInN1YnN0ciIsInBhcnRzIiwic3BsaXQiLCJjaHVua3MiLCJ0ZXN0IiwicmVzdWx0IiwicG9zIiwiaW5kZXhPZiIsInBhcmFtIiwiZGNodW5rIiwiZGVjb2RlVVJJQ29tcG9uZW50IiwicGFnZSIsImlzTmV3IiwidXJsMnN0ciIsInN0YWNrIiwiY2h1bmsiLCJvYmoyc3RyIiwiam9pbiIsInN0ciIsImVuY29kZVVSSUNvbXBvbmVudCIsIlJvdXRlIiwicm91dGUiLCJpbmRleCIsIl9uZXh0IiwicGF0aCIsIm5leHQiLCJzbGljZSIsInNoaWZ0IiwicmVmcmVzaCIsIl9qb2luIiwia2lkcyIsIm9sZCIsImNvbmNhdCIsImFwcGVuZCIsIlByb21pc2UiLCJyZXMiLCJyZWoiLCJyZWRpcmVjdCIsImNvbmZpcm0iLCJyZXNvbHZlIiwiY2FsbEV2ZW50IiwiY2F0Y2giLCJlcnIiLCJ0aGVuIiwic2l6ZSIsIm4iLCJKZXRWaWV3IiwiX2NoaWxkcmVuIiwidWkiLCJjb250YWluZXIiLCJqZXR2aWV3IiwiY3JlYXRlVmlldyIsInJlbmRlciIsInRhcmdldCIsIl9yZW5kZXJGcmFtZUxvY2siLCJfc2hvdyIsInNlZ21lbnQiLCJfdXJsQ2hhbmdlIiwibGlua1JvdXRlciIsImdldFJvdXRlciIsInNldCIsInNpbGVudCIsImluaXQiLCJfJHZpZXciLCJfJCIsInJlYWR5IiwiXyR1cmwiLCJtZXNzYWdlIiwidXJsQ2hhbmdlIiwiZGVzdHJveSIsIl9kZXN0cm95S2lkcyIsInVzZSIsInBsdWdpbiIsInRhZ05hbWUiLCJfcmVuZGVyIiwiZG9jdW1lbnQiLCJib2R5IiwidG9Ob2RlIiwiX3JlbmRlcl9maW5hbCIsImNmZyIsInNsb3QiLCJyZWplY3QiLCJyZXNwb25zZSIsImNvcHlDb25maWciLCJvbGR1aSIsImFzV2luIiwic2V0UG9zaXRpb24iLCJpc1Zpc2libGUiLCJfaW5pdCIsIl9pbml0VXJsIiwiZSIsIl9pbml0RXJyb3IiLCJ3YWl0cyIsImZyYW1lIiwid2FpdCIsImFsbCIsImxvY2siLCJfcmVuZGVyRnJhbWUiLCJfY3JlYXRlU3ViVmlldyIsImVycm9yIiwiY3JlYXRlRnJvbVVSTCIsInVpcyIsIkpldFZpZXdSYXciLCJfdWkiLCJTdWJSb3V0ZXIiLCJjYiIsImEiLCJnZXQiLCJfb25jZSIsIkpldEFwcEJhc2UiLCJ3aW5kb3ciLCJ2ZXJzaW9uIiwic3RhcnQiLCJfc2VydmljZXMiLCJFdmVudFN5c3RlbSIsIl9zdWJTZWdtZW50IiwiZ2V0U2VydmljZSIsInNldFNlcnZpY2UiLCJoYW5kbGVyIiwicHJvdG90eXBlIiwiJHN1YnZpZXciLCJhZGRTdWJWaWV3IiwiQXJyYXkiLCJtZXRob2QiLCJwb2ludCIsIkRhdGFDb2xsZWN0aW9uIiwiUmVnRXhwIiwiRGF0ZSIsImNvcHkiLCIkcm91dGVyIiwiY2xpY2tIYW5kbGVyIiwic3JjRWxlbWVudCIsImdldEF0dHJpYnV0ZSIsInRyaWdnZXIiLCJfZm9yVmlldyIsImNhbmNlbEJ1YmJsZSIsInByZXZlbnREZWZhdWx0IiwicGFyZW50Tm9kZSIsImxvYWRWaWV3Iiwidmlld3MiLCJfbG9hZEVycm9yIiwiRXJyb3IiLCJfbG9hZFZpZXdEeW5hbWljIiwibW9kdWxlIiwiX19lc01vZHVsZSIsInJvdXRlciIsInJlc3QiLCJhcHBseSIsImRhdGEiLCJhY3Rpb24iLCJiaW5kIiwiZXIiLCJkZWJ1ZyIsImNvbnNvbGUiLCJ0ZXh0IiwicmVwbGFjZSIsImlubmVySFRNTCIsInR5cGUiLCJleHBpcmUiLCJmaXJzdEluaXQiLCJldmVudCIsIl9maXJzdF9zdGFydCIsInRvcCIsImJhc2UiLCJzZXRUaW1lb3V0IiwiYW5pbWF0aW9uIiwibm9kZSIsImh0bWwiLCJhZGRDc3MiLCJyZW1vdmVDc3MiLCJ1cmxTdHJpbmciLCJ0ZW1wbGF0ZSIsInVpZCIsIkhhc2hSb3V0ZXIiLCJfZGV0ZWN0UHJlZml4Iiwib25wb3BzdGF0ZSIsInJvdXRlcyIsImNvbXBhcmUiLCJoaXN0b3J5IiwicHVzaFN0YXRlIiwicHJlZml4Iiwic3VmaXgiLCJfZ2V0UmF3Iiwicm91dGVyUHJlZml4IiwibG9jYXRpb24iLCJocmVmIiwiaXNQYXRjaGVkIiwicGF0Y2giLCJ3Iiwid2luIiwicHJvbWlzZSIsImZyZWV6ZSIsInNvbWUiLCIkZnJlZXplIiwicmVzaXplIiwiYmFzZUFkZCIsImJhc2VsYXlvdXQiLCJhZGRWaWV3IiwiYmFzZVJlbW92ZSIsInJlbW92ZVZpZXciLCJqdmlldyIsInN1YnMiLCJhcmd1bWVudHMiLCJsYXlvdXQiLCJwcm90b1VJIiwiJGluaXQiLCIkYXBwIiwiJHJlYWR5Iiwib3JpZ2luIiwicHJveHkiLCJKZXRBcHAiLCJyZXF1aXJlIiwiU3RvcmVSb3V0ZXIiLCJzdG9yYWdlIiwic2Vzc2lvbiIsInN0b3JlTmFtZSIsInB1dCIsIlVybFJvdXRlciIsInBhdGhuYW1lIiwic2VhcmNoIiwiRW1wdHlSb3V0ZXIiLCJfJGNvbmZpZyIsIlVubG9hZEd1YXJkIiwiaGFzIiwic3RvcmUiLCJPYmplY3QiLCJoYXNPd25Qcm9wZXJ0eSIsImNhbGwiLCJmb3JFYWNoIiwiY29udGV4dCIsInRyaW0iLCJ3YXJuIiwieCIsIlN0cmluZyIsImRlbGltaXRlciIsInJ1c3NpYW5QbHVyYWxHcm91cHMiLCJlbmQiLCJwbHVyYWxUeXBlcyIsImFyYWJpYyIsImxhc3RUd28iLCJib3NuaWFuX3NlcmJpYW4iLCJjaGluZXNlIiwiY3JvYXRpYW4iLCJmcmVuY2giLCJnZXJtYW4iLCJydXNzaWFuIiwibGl0aHVhbmlhbiIsImN6ZWNoIiwicG9saXNoIiwiaWNlbGFuZGljIiwic2xvdmVuaWFuIiwicGx1cmFsVHlwZVRvTGFuZ3VhZ2VzIiwibGFuZ1RvVHlwZU1hcCIsIm1hcHBpbmciLCJyZXQiLCJsYW5ncyIsImxhbmciLCJwbHVyYWxUeXBlTmFtZSIsImxvY2FsZSIsImxhbmdUb1BsdXJhbFR5cGUiLCJlbiIsInBsdXJhbFR5cGVJbmRleCIsImNvdW50IiwiZXNjYXBlIiwidG9rZW4iLCJjb25zdHJ1Y3RUb2tlblJlZ2V4Iiwib3B0cyIsInN1ZmZpeCIsIlJhbmdlRXJyb3IiLCJkb2xsYXJSZWdleCIsImRvbGxhckJpbGxzWWFsbCIsImRlZmF1bHRUb2tlblJlZ2V4IiwidHJhbnNmb3JtUGhyYXNlIiwicGhyYXNlIiwic3Vic3RpdHV0aW9ucyIsInRva2VuUmVnZXgiLCJUeXBlRXJyb3IiLCJpbnRlcnBvbGF0aW9uUmVnZXgiLCJvcHRpb25zIiwic21hcnRfY291bnQiLCJ0ZXh0cyIsImV4cHJlc3Npb24iLCJhcmd1bWVudCIsIlBvbHlnbG90IiwicGhyYXNlcyIsImN1cnJlbnRMb2NhbGUiLCJhbGxvd01pc3NpbmciLCJvbk1pc3NpbmdLZXkiLCJpbnRlcnBvbGF0aW9uIiwibmV3TG9jYWxlIiwibW9yZVBocmFzZXMiLCJwcmVmaXhlZEtleSIsInVuc2V0IiwiY2xlYXIiLCJuZXdQaHJhc2VzIiwidCIsIl8iLCJ0cmFuc2Zvcm0iLCJ3ZWJpeFBvbHlnbG90IiwiTG9jYWxlIiwiX3ZpZXciLCJzZXRMYW5nRGF0YSIsInBjb25maWciLCJwb2x5Z2xvdCIsInBvbHkiLCJzZXJ2aWNlIiwibG9jTmFtZSIsImkxOG4iLCJzZXRMb2NhbGUiLCJnZXRMYW5nIiwic2V0TGFuZyIsInVybHMiLCJNZW51IiwiZ2V0VmFsdWUiLCJzZXRWYWx1ZSIsImdldFNlbGVjdGVkSWQiLCJzZWxlY3QiLCJleGlzdHMiLCJiYXNlaWNvbnMiLCJnb29kIiwic2F2aW5nIiwiYmFzZXRleHQiLCJTdGF0dXMiLCJzdGF0dXMiLCJpc2Vycm9yIiwiZXhwaXJlRGVsYXkiLCJpY29ucyIsImNvbnRlbnQiLCJhcmVhIiwic2V0SFRNTCIsInN1Y2Nlc3MiLCJzZXRTdGF0dXMiLCJmYWlsIiwiZ2V0U3RhdHVzIiwiaGlkZVN0YXR1cyIsIm1vZGUiLCJyZXNwb25zZVRleHQiLCJ0cmFjayIsImRwIiwiX2lkIiwiX29iaiIsInJlbW90ZSIsImFqYXgiLCJfbW9kZSIsIl91cmwiLCJfcmVxdWVzdCIsIl9oZWFkZXJzIiwiX2ZpbGVzIiwiVGhlbWUiLCJ0aGVtZSIsImdldFRoZW1lIiwic2V0VGhlbWUiLCJsaW5rcyIsImdldEVsZW1lbnRzQnlUYWdOYW1lIiwibG5hbWUiLCJkaXNhYmxlZCIsInNraW4iLCJjb3B5UGFyYW1zIiwiVXJsUGFyYW0iLCJvcyIsIm9nIiwidmFsIiwiVXNlciIsImxvZ2luIiwibG9nb3V0IiwiYWZ0ZXJMb2dpbiIsImFmdGVyTG9nb3V0IiwicGluZyIsIm1vZGVsIiwidXNlciIsImdldFVzZXIiLCJzZXJ2ZXIiLCJwYXNzIiwiY2FuTmF2aWdhdGUiLCJfJHJvb3QiLCJwdWJsaWMiLCJzZXRJbnRlcnZhbCIsInBsdWdpbnMiLCJlcnJvcnMiLCJCQVNFX1VSTCIsIkhlYWx0aFNlcnZpY2UiLCJnZXREaXNrU3BhY2UiLCJnZXRDYWxsIiwiZ2V0SGVhbHRoIiwiZ2V0SWRlbnRpdHkiLCJnZXROZXR3b3JrSW5mbyIsImdldEpzeFZlcnNpb24iLCJnZXRSdW5uaW5nUHJvY2Vzc2VzIiwiZ2V0UnVubmluZ1BvcnRzIiwiU2VydmljZSIsImhlYWx0aCIsImhlYWRlcnMiLCJiYXNlVXJsIiwiam9pblVybCIsImFyZ3MiLCJ0b0xvd2VyQ2FzZSIsInBvc3QiLCJWYWx1ZUVycm9yIiwicG9zdENhbGwiLCJNQVhfTVNHX0xFTiIsIkFsZXJ0c1ZpZXciLCJyb3dzIiwicmVzaXplQ29sdW1uIiwibXVsdGlzZWxlY3QiLCJjc3MiLCJjb2x1bW5zIiwiaGVhZGVyIiwic29ydCIsImF1dG93aWR0aCIsImZvcm1hdCIsImRhdGVGb3JtYXR0ZXIiLCJ3aWR0aCIsImZpbGxzcGFjZSIsImFuc2lVcCIsImFuc2lfdG9faHRtbCIsImF1dG9Db25maWciLCJzY2hlbWUiLCJkZWxldGVJdGVtIiwib2JqZWN0cyIsInNlbGYiLCJpdGVtcyIsImlkcyIsImluZGV4ZXMiLCJpdGVtIiwidGFibGUiLCJnZXRJdGVtIiwidGl0bGUiLCJvayIsImNhbmNlbCIsImlkZW50aWZpZXJzIiwibWFwIiwiaWRlbnRpZmllciIsInNob3dQcm9ncmVzcyIsImhpZGUiLCJhbGVydHMiLCJkZWxldGUiLCJyZW1vdmUiLCJ2aWV3SXRlbSIsImFsZXJ0VmlldyIsInNob3dGb3IiLCJBbGVydFZpZXciLCJQcm9ncmVzc0JhciIsImNsZWFyQWxsIiwibGlzdCIsImpzb24iLCJhdHRhY2hUbyIsImRhdGVGb3JtYXQiLCJ3ZWJpeERhdGVGb3JtYXR0ZXIiLCJkYXRlVG9TdHIiLCJwYXJzZUludCIsIkNPREVfVVJMIiwiUEFDS0FHRV9QQVRIIiwiQ29kZXNlcnZlclZpZXciLCJpZnJhbWUiLCJvbkFmdGVyTG9hZCIsImhpZGVQcm9ncmVzcyIsImVuYWJsZSIsImNvbHMiLCJoZWlnaHQiLCJpbnB1dFdpZHRoIiwiaW5zdGFsbENvZGVzZXJ2ZXJQYWNrYWdlIiwicGFja2FnZXMiLCJhZGQiLCJjb2Rlc2VydmVySWZyYW1lIiwiaW5zdGFsbFBhY2thZ2VDb250YWluZXIiLCJkaXNhYmxlIiwibG9hZCIsImNvZGVTZXJ2ZXJTdGF0dXMiLCJjb2Rlc2VydmVyIiwiVG9wVmlldyIsInJlc3BvbnNpdmUiLCJKdXB5dGVyVmlldyIsImNsaWNrIiwiYWRkVG9MaXN0IiwibXlsaXN0IiwiTG9nc1ZpZXciLCJwbGFjZWhvbGRlciIsIm9uQ2hhbmdlIiwiYXBwTmFtZSIsIkFwcExvZ3NWaWV3IiwiYXBwc0NvbWJvIiwibG9ncyIsImxpc3RBcHBzIiwiZGVmaW5lIiwiYXBwbmFtZSIsImxvZ0lkIiwibG9naWQiLCJhcHBMb2dzIiwiSm9ic1ZpZXciLCJKU09OIiwic3RyaW5naWZ5IiwibXlqb2JzIiwibGlzdEpvYnMiLCJwa2dTdGF0dXMiLCJhY3Rpb25zIiwiUGFja2FnZXNWaWV3IiwiZ3JpZCIsImlucHV0QWxpZ24iLCJzY3JvbGwiLCJvbkNvbnRleHQiLCJzaG93RXJyb3IiLCJlcnJvclZpZXciLCJoYW5kbGVSZXN1bHQiLCJjYWxsYmFjayIsIkZ1bmN0aW9uIiwiYWRkUGFja2FnZSIsImdpdFVybCIsImRlbGV0ZVBhY2thZ2UiLCJwYWNrYWdlTmFtZSIsImVsZW1lbnRJRCIsInBhY2thZ2VUYWJsZSIsInN0YXJ0UGFja2FnZSIsInN0b3BQYWNrYWdlIiwic3RvcCIsImVuYWJsZVBhY2thZ2UiLCJkaXNhYmxlUGFja2FnZSIsIkVycm9yVmlldyIsIm1lbnUiLCJjaGVja0FjdGlvbiIsInNlbGVjdGVkSXRlbUlkIiwiYXV0aG9yIiwicGFjYWtnZUxvY2F0aW9uIiwiYWxlcnQiLCJwYWNrYWdlTWV0aG9kIiwiJHZpZXciLCJsb2NhdGUiLCJtZW51ZGF0YSIsInJvdyIsImFkZEFjdGlvbnMiLCJwcmV2ZW50RXZlbnQiLCJtYXBEYXRhIiwiYWxsaXRlbXMiLCJzb3VyY2UiLCJ0aHJlZWJvdCIsInBrZ0luZGV4IiwiaiIsImFsbFBhY2thZ2VzIiwiV2lraXNWaWV3Iiwic3JjIiwibGlzdFdvcmtlcnMiLCJBbnNpVXAiLCJpbmZvIiwiZWxlbWVudHNDb25maWciLCJsYWJlbFdpZHRoIiwiZWxlbWVudHMiLCJsYWJlbCIsInJlYWRvbmx5IiwidGFiIiwiY2VsbHMiLCJtdWx0aXZpZXciLCJoZWFkIiwibW9kYWwiLCJwb3NpdGlvbiIsImdldFRvcFBhcmVudFZpZXciLCJmb3JtIiwidGJWaWV3cyIsInRiVGFicyIsImxvZ0RhdGEiLCJnZXRTZWxlY3RlZEl0ZW0iLCJhcHBfbmFtZSIsImxhdGVzdF9sb2dpZCIsImFkZFRyYWNlYmFjayIsInRiIiwidGJJZCIsInRocmVlYm90X25hbWUiLCJwcm9jZXNzX2lkIiwidGJUaXRsZSIsImZvcm1hdHRlZCIsImFkZE9wdGlvbiIsImNsZWFyVHJhY2VCYWNrcyIsInJlbW92ZU9wdGlvbiIsInNldFZhbHVlcyIsInRyYWNlYmFja3MiLCJQcm9jZXNzZXNDaGlsZFZpZXciLCJNYXRoIiwiY2VpbCIsImdldEhlYWQiLCJwYWdlciIsImdyb3VwIiwiYXBwbG9ncyIsIm1hcmtTb3J0aW5nIiwiUGFja2FnZXNTZXJ2aWNlIiwiZ2l0X3VybCIsIkRpc2tTcGFjZVZpZXciLCJkaXNrU3BhY2UiLCJkaXNrSW5mbyIsInVzZWQiLCJmcmVlIiwidG90YWwiLCJwZXJjZW50IiwiaGVhbHRoSW5mb1ZpZXciLCJoZWFsdGhJbmZvIiwiYmNkYiIsIndpa2lzIiwianVweXRlciIsIkpTWEluZm9WaWV3IiwiaXAiLCJpcDYiLCJjb2xvcnNEYXRhc2V0IiwiY29sb3IiLCJQcm9jZXNzZXNWaWV3IiwicHJvY2Vzc2VzSW5mbyIsInBpZUlubmVyVGV4dCIsImFsaWduIiwiY2hpbGR2aWV3IiwicHJvY2Vzc2VzTGlzdCIsInJ1blByb2Nlc3NJbmZvIiwiY2hhcnRzRGF0YSIsInByb2Nlc3Nlc19saXN0IiwibWVtb3J5VXNhZ2UiLCJtZW1vcnlfdXNhZ2UiLCJ0b3RhbE1lbW9yeSIsInRvdGFsX21lbSIsInVzYWdlX3BlcmNlbnQiLCJ2YWx1ZXMiLCJ0ZW1wIiwidm1zIiwicnVubmluZ1BvcnRzVmlldyIsInBvcnRzIiwicG9ydHNUYWJsZSIsImljb24iLCJoaWRlTWVudSIsInRvb2x0aXAiLCJib3JkZXJsZXNzIiwic2lkZWJhciIsInRvb2xiYXIiLCJwYWRkaW5nIiwic2hvd01lbnUiLCJoaWRkZW4iLCJidXR0b25IaWRlTWVudSIsImJ1dHRvblNob3dNZW51IiwidXNlck1lbnUiLCJ1c2VybmFtZUxhYmVsIiwidXNlcm5hbWUiLCJnZXRUZXh0U2l6ZSIsImVtYWlsIiwiTXlqb2JzU2VydmljZSIsIkludmVudG9yeUFwcCIsIkFQUE5BTUUiLCJWRVJTSU9OIiwiUFJPRFVDVElPTiIsImZhY3RvcnkiLCJleHBvcnRzIiwibm9kZU5hbWUiLCJleHAiLCJfX21ha2VUZW1wbGF0ZU9iamVjdCIsImNvb2tlZCIsInJhdyIsImRlZmluZVByb3BlcnR5IiwiUGFja2V0S2luZCIsInNldHVwX3BhbGV0dGVzIiwiX3VzZV9jbGFzc2VzIiwiX2VzY2FwZV9mb3JfaHRtbCIsImJvbGQiLCJmZyIsImJnIiwiX2J1ZmZlciIsIl91cmxfd2hpdGVsaXN0IiwiYXJnIiwiZW51bWVyYWJsZSIsImNvbmZpZ3VyYWJsZSIsIl90aGlzIiwiYW5zaV9jb2xvcnMiLCJyZ2IiLCJjbGFzc19uYW1lIiwicGFsZXR0ZV8yNTYiLCJwYWxldHRlIiwicmVjIiwibGV2ZWxzIiwiciIsImciLCJiIiwiY29sIiwiZ3JleV9sZXZlbCIsImdyeSIsImVzY2FwZV90eHRfZm9yX2h0bWwiLCJ0eHQiLCJhcHBlbmRfYnVmZmVyIiwiZ2V0X25leHRfcGFja2V0IiwicGt0Iiwia2luZCIsIkVPUyIsImxlbiIsIlRleHQiLCJJbmNvbXBsZXRlIiwibmV4dF9jaGFyIiwiY2hhckF0IiwiRVNDIiwiX2NzaV9yZWdleCIsInJneCIsIm1hdGNoIiwiVW5rbm93biIsIlNHUiIsInJwb3MiLCJfb3NjX3N0Iiwicmd4RyIsImxhc3RJbmRleCIsIm1hdGNoXzEiLCJleGVjIiwibWF0Y2hfMiIsIl9vc2NfcmVnZXgiLCJPU0NVUkwiLCJibG9ja3MiLCJwYWNrZXQiLCJ0cmFuc2Zvcm1fdG9faHRtbCIsIndpdGhfc3RhdGUiLCJwcm9jZXNzX2Fuc2kiLCJwcm9jZXNzX2h5cGVybGluayIsInNncl9jbWRzIiwic2dyX2NtZF9zdHIiLCJudW0iLCJpc05hTiIsImlzX2ZvcmVncm91bmQiLCJtb2RlX2NtZCIsInBhbGV0dGVfaW5kZXgiLCJjIiwiZnJhZ21lbnQiLCJzdHlsZXMiLCJjbGFzc2VzIiwiY2xhc3Nfc3RyaW5nIiwic3R5bGVfc3RyaW5nIiwidG1wbE9iaiIsInN1YnN0IiwiX2kiLCJyZWdleFRleHQiLCJ3c3JneCIsInR4dDIiLCJBbGVydHNTZXJ2aWNlIiwiTG9nc1NlcnZpY2UiLCJpZF9mcm9tIl0sIm1hcHBpbmdzIjoiOztRQUFBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBOzs7UUFHQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQSxLQUFLO1FBQ0w7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwyQkFBMkIsMEJBQTBCLEVBQUU7UUFDdkQsaUNBQWlDLGVBQWU7UUFDaEQ7UUFDQTtRQUNBOztRQUVBO1FBQ0Esc0RBQXNELCtEQUErRDs7UUFFckg7UUFDQTs7UUFFQTtRQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0lDN0RNQSxpQjs7OztJQUVBQyxPO0FBQ0YscUJBQVlDLEtBQVosRUFBbUI7QUFBQTs7QUFDZixhQUFLQyxRQUFMLEdBQWdCLElBQWhCO0FBQ0EsYUFBS0QsS0FBTCxHQUFhQSxLQUFiO0FBQ0EsYUFBS0UsT0FBTCxHQUFlLEVBQWY7QUFDQSxhQUFLQyxLQUFMLEdBQWEsRUFBYjtBQUNBLGFBQUtDLEtBQUwsR0FBYSxFQUFiO0FBQ0g7O3NCQUNEQyxPLHNCQUFVO0FBQ04sZUFBTyxLQUFLQyxLQUFaO0FBQ0gsSzs7c0JBQ0RDLFUseUJBQWE7QUFDVCxhQUFLQyxhQUFMO0FBQ0EsYUFBS0MsWUFBTDtBQUNBLGFBQUtQLE9BQUwsR0FBZSxLQUFLUSxVQUFMLEdBQWtCLEtBQUtDLEdBQUwsR0FBVyxLQUFLQyxPQUFMLEdBQWUsS0FBS04sS0FBTCxHQUFhLElBQXhFO0FBQ0gsSzs7c0JBQ0RPLFEscUJBQVNDLEUsRUFBSUMsSyxFQUFPQyxHLEVBQUs7QUFDckIsWUFBSSxLQUFLWixLQUFMLENBQVdVLEVBQVgsTUFBbUJDLEtBQXZCLEVBQThCO0FBQzFCLGlC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ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwge1xuIFx0XHRcdFx0Y29uZmlndXJhYmxlOiBmYWxzZSxcbiBcdFx0XHRcdGVudW1lcmFibGU6IHRydWUsXG4gXHRcdFx0XHRnZXQ6IGdldHRlclxuIFx0XHRcdH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIi9jb2RlYmFzZS9cIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSAyNyk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gd2VicGFjay9ib290c3RyYXAgNWY5ZmRlOGJkYWEzNjAzMTZkNzUiLCJjbGFzcyBOYXZpZ2F0aW9uQmxvY2tlZCB7IH1cblxuY2xhc3MgSmV0QmFzZSB7XHJcbiAgICBjb25zdHJ1Y3Rvcih3ZWJpeCkge1xyXG4gICAgICAgIHRoaXMud2ViaXhKZXQgPSB0cnVlO1xyXG4gICAgICAgIHRoaXMud2ViaXggPSB3ZWJpeDtcclxuICAgICAgICB0aGlzLl9ldmVudHMgPSBbXTtcclxuICAgICAgICB0aGlzLl9zdWJzID0ge307XHJcbiAgICAgICAgdGhpcy5fZGF0YSA9IHt9O1xyXG4gICAgfVxyXG4gICAgZ2V0Um9vdCgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fcm9vdDtcclxuICAgIH1cclxuICAgIGRlc3RydWN0b3IoKSB7XHJcbiAgICAgICAgdGhpcy5fZGV0YWNoRXZlbnRzKCk7XHJcbiAgICAgICAgdGhpcy5fZGVzdHJveVN1YnMoKTtcclxuICAgICAgICB0aGlzLl9ldmVudHMgPSB0aGlzLl9jb250YWluZXIgPSB0aGlzLmFwcCA9IHRoaXMuX3BhcmVudCA9IHRoaXMuX3Jvb3QgPSBudWxsO1xyXG4gICAgfVxyXG4gICAgc2V0UGFyYW0oaWQsIHZhbHVlLCB1cmwpIHtcclxuICAgICAgICBpZiAodGhpcy5fZGF0YVtpZF0gIT09IHZhbHVlKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2RhdGFbaWRdID0gdmFsdWU7XHJcbiAgICAgICAgICAgIHRoaXMuX3NlZ21lbnQudXBkYXRlKGlkLCB2YWx1ZSwgMCk7XHJcbiAgICAgICAgICAgIGlmICh1cmwpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLnNob3cobnVsbCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBnZXRQYXJhbShpZCwgcGFyZW50KSB7XHJcbiAgICAgICAgY29uc3QgdmFsdWUgPSB0aGlzLl9kYXRhW2lkXTtcclxuICAgICAgICBpZiAodHlwZW9mIHZhbHVlICE9PSBcInVuZGVmaW5lZFwiIHx8ICFwYXJlbnQpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHZhbHVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjb25zdCB2aWV3ID0gdGhpcy5nZXRQYXJlbnRWaWV3KCk7XHJcbiAgICAgICAgaWYgKHZpZXcpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHZpZXcuZ2V0UGFyYW0oaWQsIHBhcmVudCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgZ2V0VXJsKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9zZWdtZW50LnN1YnVybCgpO1xyXG4gICAgfVxyXG4gICAgZ2V0VXJsU3RyaW5nKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9zZWdtZW50LnRvU3RyaW5nKCk7XHJcbiAgICB9XHJcbiAgICBnZXRQYXJlbnRWaWV3KCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9wYXJlbnQ7XHJcbiAgICB9XHJcbiAgICAkJChpZCkge1xyXG4gICAgICAgIGlmICh0eXBlb2YgaWQgPT09IFwic3RyaW5nXCIpIHtcclxuICAgICAgICAgICAgY29uc3Qgcm9vdCA9IHRoaXMuZ2V0Um9vdCgpO1xyXG4gICAgICAgICAgICByZXR1cm4gcm9vdC5xdWVyeVZpZXcoKG9iaiA9PiAob2JqLmNvbmZpZy5pZCA9PT0gaWQgfHwgb2JqLmNvbmZpZy5sb2NhbElkID09PSBpZCkgJiZcclxuICAgICAgICAgICAgICAgIChvYmouJHNjb3BlID09PSByb290LiRzY29wZSkpLCBcInNlbGZcIik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICByZXR1cm4gaWQ7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgb24ob2JqLCBuYW1lLCBjb2RlKSB7XHJcbiAgICAgICAgY29uc3QgaWQgPSBvYmouYXR0YWNoRXZlbnQobmFtZSwgY29kZSk7XHJcbiAgICAgICAgdGhpcy5fZXZlbnRzLnB1c2goeyBvYmosIGlkIH0pO1xyXG4gICAgICAgIHJldHVybiBpZDtcclxuICAgIH1cclxuICAgIGNvbnRhaW5zKHZpZXcpIHtcclxuICAgICAgICBmb3IgKGNvbnN0IGtleSBpbiB0aGlzLl9zdWJzKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGtpZCA9IHRoaXMuX3N1YnNba2V5XS52aWV3O1xyXG4gICAgICAgICAgICBpZiAoa2lkID09PSB2aWV3IHx8IGtpZC5jb250YWlucyh2aWV3KSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG4gICAgZ2V0U3ViVmlldyhuYW1lKSB7XHJcbiAgICAgICAgY29uc3Qgc3ViID0gdGhpcy5nZXRTdWJWaWV3SW5mbyhuYW1lKTtcclxuICAgICAgICBpZiAoc3ViKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBzdWIuc3Vidmlldy52aWV3O1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGdldFN1YlZpZXdJbmZvKG5hbWUpIHtcclxuICAgICAgICBjb25zdCBzdWIgPSB0aGlzLl9zdWJzW25hbWUgfHwgXCJkZWZhdWx0XCJdO1xyXG4gICAgICAgIGlmIChzdWIpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHsgc3Vidmlldzogc3ViLCBwYXJlbnQ6IHRoaXMgfTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKG5hbWUgPT09IFwiX3RvcFwiKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX3N1YnNbbmFtZV0gPSB7IHVybDogXCJcIiwgaWQ6IG51bGwsIHBvcHVwOiB0cnVlIH07XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmdldFN1YlZpZXdJbmZvKG5hbWUpO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvLyB3aGVuIGNhbGxlZCBmcm9tIGEgY2hpbGQgdmlldywgc2VhcmNoZXMgZm9yIG5lYXJlc3QgcGFyZW50IHdpdGggc3Vidmlld1xyXG4gICAgICAgIGlmICh0aGlzLl9wYXJlbnQpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3BhcmVudC5nZXRTdWJWaWV3SW5mbyhuYW1lKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICB9XHJcbiAgICBfZGV0YWNoRXZlbnRzKCkge1xyXG4gICAgICAgIGNvbnN0IGV2ZW50cyA9IHRoaXMuX2V2ZW50cztcclxuICAgICAgICBmb3IgKGxldCBpID0gZXZlbnRzLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSB7XHJcbiAgICAgICAgICAgIGV2ZW50c1tpXS5vYmouZGV0YWNoRXZlbnQoZXZlbnRzW2ldLmlkKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBfZGVzdHJveVN1YnMoKSB7XHJcbiAgICAgICAgLy8gZGVzdHJveSBzdWIgdmlld3NcclxuICAgICAgICBmb3IgKGNvbnN0IGtleSBpbiB0aGlzLl9zdWJzKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHN1YlZpZXcgPSB0aGlzLl9zdWJzW2tleV0udmlldztcclxuICAgICAgICAgICAgLy8gaXQgcG9zc2libGUgdGhhdCBzdWJ2aWV3IHdhcyBub3QgbG9hZGVkIHdpdGggYW55IGNvbnRlbnQgeWV0XHJcbiAgICAgICAgICAgIC8vIHNvIGNoZWNrIG9uIG51bGxcclxuICAgICAgICAgICAgaWYgKHN1YlZpZXcpIHtcclxuICAgICAgICAgICAgICAgIHN1YlZpZXcuZGVzdHJ1Y3RvcigpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIHJlc2V0IHRvIHByZXZlbnQgbWVtb3J5IGxlYWtzXHJcbiAgICAgICAgdGhpcy5fc3VicyA9IHt9O1xyXG4gICAgfVxyXG4gICAgX2luaXRfdXJsX2RhdGEoKSB7XHJcbiAgICAgICAgY29uc3QgdXJsID0gdGhpcy5fc2VnbWVudC5jdXJyZW50KCk7XHJcbiAgICAgICAgdGhpcy5fZGF0YSA9IHt9O1xyXG4gICAgICAgIHRoaXMud2ViaXguZXh0ZW5kKHRoaXMuX2RhdGEsIHVybC5wYXJhbXMsIHRydWUpO1xyXG4gICAgfVxyXG4gICAgX2dldERlZmF1bHRTdWIoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuX3N1YnMuZGVmYXVsdCkge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fc3Vicy5kZWZhdWx0O1xyXG4gICAgICAgIH1cclxuICAgICAgICBmb3IgKGNvbnN0IGtleSBpbiB0aGlzLl9zdWJzKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHN1YiA9IHRoaXMuX3N1YnNba2V5XTtcclxuICAgICAgICAgICAgaWYgKCFzdWIuYnJhbmNoICYmIHN1Yi52aWV3ICYmIGtleSAhPT0gXCJfdG9wXCIpIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGNoaWxkID0gc3ViLnZpZXcuX2dldERlZmF1bHRTdWIoKTtcclxuICAgICAgICAgICAgICAgIGlmIChjaGlsZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBjaGlsZDtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIF9yb3V0ZWRfdmlldygpIHtcclxuICAgICAgICBjb25zdCBwYXJlbnQgPSB0aGlzLmdldFBhcmVudFZpZXcoKTtcclxuICAgICAgICBpZiAoIXBhcmVudCkge1xyXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgY29uc3Qgc3ViID0gcGFyZW50Ll9nZXREZWZhdWx0U3ViKCk7XHJcbiAgICAgICAgaWYgKCFzdWIgJiYgc3ViICE9PSB0aGlzKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHBhcmVudC5fcm91dGVkX3ZpZXcoKTtcclxuICAgIH1cclxufVxuXG5mdW5jdGlvbiBwYXJzZSh1cmwpIHtcclxuICAgIC8vIHJlbW92ZSBzdGFydGluZyAvXHJcbiAgICBpZiAodXJsWzBdID09PSBcIi9cIikge1xyXG4gICAgICAgIHVybCA9IHVybC5zdWJzdHIoMSk7XHJcbiAgICB9XHJcbiAgICAvLyBzcGxpdCB1cmwgYnkgXCIvXCJcclxuICAgIGNvbnN0IHBhcnRzID0gdXJsLnNwbGl0KFwiL1wiKTtcclxuICAgIGNvbnN0IGNodW5rcyA9IFtdO1xyXG4gICAgLy8gZm9yIGVhY2ggcGFnZSBpbiB1cmxcclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcGFydHMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICBjb25zdCB0ZXN0ID0gcGFydHNbaV07XHJcbiAgICAgICAgY29uc3QgcmVzdWx0ID0ge307XHJcbiAgICAgICAgLy8gZGV0ZWN0IHBhcmFtc1xyXG4gICAgICAgIC8vIHN1cHBvcnQgb2xkIFx0XHRcdHNvbWU6YT1iOmM9ZFxyXG4gICAgICAgIC8vIGFuZCBuZXcgbm90YXRpb25cdFx0c29tZT9hPWImYz1kXHJcbiAgICAgICAgbGV0IHBvcyA9IHRlc3QuaW5kZXhPZihcIjpcIik7XHJcbiAgICAgICAgaWYgKHBvcyA9PT0gLTEpIHtcclxuICAgICAgICAgICAgcG9zID0gdGVzdC5pbmRleE9mKFwiP1wiKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHBvcyAhPT0gLTEpIHtcclxuICAgICAgICAgICAgY29uc3QgcGFyYW1zID0gdGVzdC5zdWJzdHIocG9zICsgMSkuc3BsaXQoL1tcXDpcXD9cXCZdL2cpO1xyXG4gICAgICAgICAgICAvLyBjcmVhdGUgaGFzaCBvZiBuYW1lZCBwYXJhbXNcclxuICAgICAgICAgICAgZm9yIChjb25zdCBwYXJhbSBvZiBwYXJhbXMpIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGRjaHVuayA9IHBhcmFtLnNwbGl0KFwiPVwiKTtcclxuICAgICAgICAgICAgICAgIHJlc3VsdFtkY2h1bmtbMF1dID0gZGVjb2RlVVJJQ29tcG9uZW50KGRjaHVua1sxXSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gc3RvcmUgcGFyc2VkIHZhbHVlc1xyXG4gICAgICAgIGNodW5rc1tpXSA9IHtcclxuICAgICAgICAgICAgcGFnZTogKHBvcyA+IC0xID8gdGVzdC5zdWJzdHIoMCwgcG9zKSA6IHRlc3QpLFxyXG4gICAgICAgICAgICBwYXJhbXM6IHJlc3VsdCxcclxuICAgICAgICAgICAgaXNOZXc6IHRydWVcclxuICAgICAgICB9O1xyXG4gICAgfVxyXG4gICAgLy8gcmV0dXJuIGFycmF5IG9mIHBhZ2Ugb2JqZWN0c1xyXG4gICAgcmV0dXJuIGNodW5rcztcclxufVxyXG5mdW5jdGlvbiB1cmwyc3RyKHN0YWNrKSB7XHJcbiAgICBjb25zdCB1cmwgPSBbXTtcclxuICAgIGZvciAoY29uc3QgY2h1bmsgb2Ygc3RhY2spIHtcclxuICAgICAgICB1cmwucHVzaChcIi9cIiArIGNodW5rLnBhZ2UpO1xyXG4gICAgICAgIGNvbnN0IHBhcmFtcyA9IG9iajJzdHIoY2h1bmsucGFyYW1zKTtcclxuICAgICAgICBpZiAocGFyYW1zKSB7XHJcbiAgICAgICAgICAgIHVybC5wdXNoKFwiP1wiICsgcGFyYW1zKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gdXJsLmpvaW4oXCJcIik7XHJcbn1cclxuZnVuY3Rpb24gb2JqMnN0cihvYmopIHtcclxuICAgIGNvbnN0IHN0ciA9IFtdO1xyXG4gICAgZm9yIChjb25zdCBrZXkgaW4gb2JqKSB7XHJcbiAgICAgICAgaWYgKHN0ci5sZW5ndGgpIHtcclxuICAgICAgICAgICAgc3RyLnB1c2goXCImXCIpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBzdHIucHVzaChrZXkgKyBcIj1cIiArIGVuY29kZVVSSUNvbXBvbmVudChvYmpba2V5XSkpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHN0ci5qb2luKFwiXCIpO1xyXG59XG5cbmNsYXNzIFJvdXRlIHtcclxuICAgIGNvbnN0cnVjdG9yKHJvdXRlLCBpbmRleCkge1xyXG4gICAgICAgIHRoaXMuX25leHQgPSAxO1xyXG4gICAgICAgIGlmICh0eXBlb2Ygcm91dGUgPT09IFwic3RyaW5nXCIpIHtcclxuICAgICAgICAgICAgdGhpcy5yb3V0ZSA9IHtcclxuICAgICAgICAgICAgICAgIHVybDogcGFyc2Uocm91dGUpLFxyXG4gICAgICAgICAgICAgICAgcGF0aDogcm91dGVcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMucm91dGUgPSByb3V0ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5pbmRleCA9IGluZGV4O1xyXG4gICAgfVxyXG4gICAgY3VycmVudCgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5yb3V0ZS51cmxbdGhpcy5pbmRleF07XHJcbiAgICB9XHJcbiAgICBuZXh0KCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnJvdXRlLnVybFt0aGlzLmluZGV4ICsgdGhpcy5fbmV4dF07XHJcbiAgICB9XHJcbiAgICBzdWJ1cmwoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMucm91dGUudXJsLnNsaWNlKHRoaXMuaW5kZXgpO1xyXG4gICAgfVxyXG4gICAgc2hpZnQoKSB7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBSb3V0ZSh0aGlzLnJvdXRlLCB0aGlzLmluZGV4ICsgdGhpcy5fbmV4dCk7XHJcbiAgICB9XHJcbiAgICByZWZyZXNoKCkge1xyXG4gICAgICAgIGNvbnN0IHVybCA9IHRoaXMucm91dGUudXJsO1xyXG4gICAgICAgIGZvciAobGV0IGkgPSB0aGlzLmluZGV4ICsgMTsgaSA8IHVybC5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICB1cmxbaV0uaXNOZXcgPSB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHRvU3RyaW5nKCkge1xyXG4gICAgICAgIGNvbnN0IHN0ciA9IHVybDJzdHIodGhpcy5zdWJ1cmwoKSk7XHJcbiAgICAgICAgcmV0dXJuIHN0ciA/IHN0ci5zdWJzdHIoMSkgOiBcIlwiO1xyXG4gICAgfVxyXG4gICAgX2pvaW4ocGF0aCwga2lkcykge1xyXG4gICAgICAgIGxldCB1cmwgPSB0aGlzLnJvdXRlLnVybDtcclxuICAgICAgICBpZiAocGF0aCA9PT0gbnVsbCkgeyAvLyBjaGFuZ2Ugb2YgcGFyYW1ldGVycywgcm91dGUgZWxlbWVudHMgYXJlIG5vdCBhZmZlY3RlZFxyXG4gICAgICAgICAgICByZXR1cm4gdXJsO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjb25zdCBvbGQgPSB0aGlzLnJvdXRlLnVybDtcclxuICAgICAgICB1cmwgPSBvbGQuc2xpY2UoMCwgdGhpcy5pbmRleCArIChraWRzID8gdGhpcy5fbmV4dCA6IDApKTtcclxuICAgICAgICBpZiAocGF0aCkge1xyXG4gICAgICAgICAgICB1cmwgPSB1cmwuY29uY2F0KHBhcnNlKHBhdGgpKTtcclxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB1cmwubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgIGlmIChvbGRbaV0pIHtcclxuICAgICAgICAgICAgICAgICAgICB1cmxbaV0udmlldyA9IG9sZFtpXS52aWV3O1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYgKG9sZFtpXSAmJiB1cmxbaV0ucGFnZSA9PT0gb2xkW2ldLnBhZ2UpIHtcclxuICAgICAgICAgICAgICAgICAgICB1cmxbaV0uaXNOZXcgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdXJsO1xyXG4gICAgfVxyXG4gICAgYXBwZW5kKHBhdGgpIHtcclxuICAgICAgICBjb25zdCB1cmwgPSB0aGlzLl9qb2luKHBhdGgsIHRydWUpO1xyXG4gICAgICAgIHRoaXMucm91dGUucGF0aCA9IHVybDJzdHIodXJsKTtcclxuICAgICAgICB0aGlzLnJvdXRlLnVybCA9IHVybDtcclxuICAgICAgICByZXR1cm4gdGhpcy5yb3V0ZS5wYXRoO1xyXG4gICAgfVxyXG4gICAgc2hvdyhwYXRoLCB2aWV3LCBraWRzKSB7XHJcbiAgICAgICAgY29uc3QgdXJsID0gdGhpcy5fam9pbihwYXRoLCBraWRzKTtcclxuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlcywgcmVqKSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnN0IHJlZGlyZWN0ID0gdXJsMnN0cih1cmwpO1xyXG4gICAgICAgICAgICBjb25zdCBvYmogPSB7XHJcbiAgICAgICAgICAgICAgICB1cmwsXHJcbiAgICAgICAgICAgICAgICByZWRpcmVjdCxcclxuICAgICAgICAgICAgICAgIGNvbmZpcm06IFByb21pc2UucmVzb2x2ZSgpXHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIGNvbnN0IGFwcCA9IHZpZXcgPyB2aWV3LmFwcCA6IG51bGw7XHJcbiAgICAgICAgICAgIC8vIHdoZW4gY3JlYXRpbmcgYSBuZXcgcm91dGUsIGl0IHBvc3NpYmxlIHRoYXQgaXQgd2lsbCBub3QgaGF2ZSBhbnkgY29udGVudFxyXG4gICAgICAgICAgICAvLyBndWFyZCBpcyBub3QgbmVjZXNzYXJ5IGluIHN1Y2ggY2FzZVxyXG4gICAgICAgICAgICBpZiAoYXBwKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCByZXN1bHQgPSBhcHAuY2FsbEV2ZW50KFwiYXBwOmd1YXJkXCIsIFtvYmoucmVkaXJlY3QsIHZpZXcsIG9ial0pO1xyXG4gICAgICAgICAgICAgICAgaWYgKCFyZXN1bHQpIHtcclxuICAgICAgICAgICAgICAgICAgICByZWoobmV3IE5hdmlnYXRpb25CbG9ja2VkKCkpO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBvYmouY29uZmlybS5jYXRjaChlcnIgPT4gcmVqKGVycikpLnRoZW4oKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKG9iai5yZWRpcmVjdCA9PT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJlaihuZXcgTmF2aWdhdGlvbkJsb2NrZWQoKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYgKG9iai5yZWRpcmVjdCAhPT0gcmVkaXJlY3QpIHtcclxuICAgICAgICAgICAgICAgICAgICBhcHAuc2hvdyhvYmoucmVkaXJlY3QpO1xyXG4gICAgICAgICAgICAgICAgICAgIHJlaihuZXcgTmF2aWdhdGlvbkJsb2NrZWQoKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgdGhpcy5yb3V0ZS5wYXRoID0gcmVkaXJlY3Q7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnJvdXRlLnVybCA9IHVybDtcclxuICAgICAgICAgICAgICAgIHJlcygpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuICAgIHNpemUobikge1xyXG4gICAgICAgIHRoaXMuX25leHQgPSBuO1xyXG4gICAgfVxyXG4gICAgc3BsaXQoKSB7XHJcbiAgICAgICAgY29uc3Qgcm91dGUgPSB7XHJcbiAgICAgICAgICAgIHVybDogdGhpcy5yb3V0ZS51cmwuc2xpY2UodGhpcy5pbmRleCArIDEpLFxyXG4gICAgICAgICAgICBwYXRoOiBcIlwiXHJcbiAgICAgICAgfTtcclxuICAgICAgICBpZiAocm91dGUudXJsLmxlbmd0aCkge1xyXG4gICAgICAgICAgICByb3V0ZS5wYXRoID0gdXJsMnN0cihyb3V0ZS51cmwpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gbmV3IFJvdXRlKHJvdXRlLCAwKTtcclxuICAgIH1cclxuICAgIHVwZGF0ZShuYW1lLCB2YWx1ZSwgaW5kZXgpIHtcclxuICAgICAgICBjb25zdCBjaHVuayA9IHRoaXMucm91dGUudXJsW3RoaXMuaW5kZXggKyAoaW5kZXggfHwgMCldO1xyXG4gICAgICAgIGlmICghY2h1bmspIHtcclxuICAgICAgICAgICAgdGhpcy5yb3V0ZS51cmwucHVzaCh7IHBhZ2U6IFwiXCIsIHBhcmFtczoge30gfSk7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnVwZGF0ZShuYW1lLCB2YWx1ZSwgaW5kZXgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAobmFtZSA9PT0gXCJcIikge1xyXG4gICAgICAgICAgICBjaHVuay5wYWdlID0gdmFsdWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICBjaHVuay5wYXJhbXNbbmFtZV0gPSB2YWx1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5yb3V0ZS5wYXRoID0gdXJsMnN0cih0aGlzLnJvdXRlLnVybCk7XHJcbiAgICB9XHJcbn1cblxuY2xhc3MgSmV0VmlldyBleHRlbmRzIEpldEJhc2Uge1xyXG4gICAgY29uc3RydWN0b3IoYXBwLCBjb25maWcpIHtcclxuICAgICAgICBzdXBlcihhcHAud2ViaXgpO1xyXG4gICAgICAgIHRoaXMuYXBwID0gYXBwO1xyXG4gICAgICAgIC8vdGhpcy4kY29uZmlnID0gY29uZmlnO1xyXG4gICAgICAgIHRoaXMuX2NoaWxkcmVuID0gW107XHJcbiAgICB9XHJcbiAgICB1aSh1aSwgY29uZmlnKSB7XHJcbiAgICAgICAgY29uZmlnID0gY29uZmlnIHx8IHt9O1xyXG4gICAgICAgIGNvbnN0IGNvbnRhaW5lciA9IGNvbmZpZy5jb250YWluZXIgfHwgdWkuY29udGFpbmVyO1xyXG4gICAgICAgIGNvbnN0IGpldHZpZXcgPSB0aGlzLmFwcC5jcmVhdGVWaWV3KHVpKTtcclxuICAgICAgICB0aGlzLl9jaGlsZHJlbi5wdXNoKGpldHZpZXcpO1xyXG4gICAgICAgIGpldHZpZXcucmVuZGVyKGNvbnRhaW5lciwgdGhpcy5fc2VnbWVudCwgdGhpcyk7XHJcbiAgICAgICAgaWYgKHR5cGVvZiB1aSAhPT0gXCJvYmplY3RcIiB8fCAodWkgaW5zdGFuY2VvZiBKZXRCYXNlKSkge1xyXG4gICAgICAgICAgICAvLyByYXcgd2ViaXggVUlcclxuICAgICAgICAgICAgcmV0dXJuIGpldHZpZXc7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICByZXR1cm4gamV0dmlldy5nZXRSb290KCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgc2hvdyhwYXRoLCBjb25maWcpIHtcclxuICAgICAgICBjb25maWcgPSBjb25maWcgfHwge307XHJcbiAgICAgICAgLy8gY29udmVydCBwYXJhbWV0ZXJzIG9iamVjdCB0byB1cmxcclxuICAgICAgICBpZiAodHlwZW9mIHBhdGggPT09IFwib2JqZWN0XCIpIHtcclxuICAgICAgICAgICAgZm9yIChjb25zdCBrZXkgaW4gcGF0aCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zZXRQYXJhbShrZXksIHBhdGhba2V5XSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcGF0aCA9IG51bGw7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAvLyBkZWxpZ2F0ZSB0byBhcHAgaW4gY2FzZSBvZiByb290IHByZWZpeFxyXG4gICAgICAgICAgICBpZiAocGF0aC5zdWJzdHIoMCwgMSkgPT09IFwiL1wiKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5hcHAuc2hvdyhwYXRoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAvLyBsb2NhbCBwYXRoLCBkbyBub3RoaW5nXHJcbiAgICAgICAgICAgIGlmIChwYXRoLmluZGV4T2YoXCIuL1wiKSA9PT0gMCkge1xyXG4gICAgICAgICAgICAgICAgcGF0aCA9IHBhdGguc3Vic3RyKDIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIC8vIHBhcmVudCBwYXRoLCBjYWxsIHBhcmVudCB2aWV3XHJcbiAgICAgICAgICAgIGlmIChwYXRoLmluZGV4T2YoXCIuLi9cIikgPT09IDApIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHBhcmVudCA9IHRoaXMuZ2V0UGFyZW50VmlldygpO1xyXG4gICAgICAgICAgICAgICAgaWYgKHBhcmVudCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBwYXJlbnQuc2hvdyhwYXRoLnN1YnN0cigzKSwgY29uZmlnKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmFwcC5zaG93KFwiL1wiICsgcGF0aC5zdWJzdHIoMykpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGNvbnN0IHN1YiA9IHRoaXMuZ2V0U3ViVmlld0luZm8oY29uZmlnLnRhcmdldCk7XHJcbiAgICAgICAgICAgIGlmIChzdWIpIHtcclxuICAgICAgICAgICAgICAgIGlmIChzdWIucGFyZW50ICE9PSB0aGlzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHN1Yi5wYXJlbnQuc2hvdyhwYXRoLCBjb25maWcpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZSBpZiAoY29uZmlnLnRhcmdldCAmJiBjb25maWcudGFyZ2V0ICE9PSBcImRlZmF1bHRcIikge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl9yZW5kZXJGcmFtZUxvY2soY29uZmlnLnRhcmdldCwgc3ViLnN1YnZpZXcsIHBhdGgpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgaWYgKHBhdGgpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5hcHAuc2hvdyhcIi9cIiArIHBhdGgpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0aGlzLl9zaG93KHRoaXMuX3NlZ21lbnQsIHBhdGgsIHRoaXMpO1xyXG4gICAgfVxyXG4gICAgX3Nob3coc2VnbWVudCwgcGF0aCwgdmlldykge1xyXG4gICAgICAgIHJldHVybiBzZWdtZW50LnNob3cocGF0aCwgdmlldywgdHJ1ZSkudGhlbigoKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuX2luaXRfdXJsX2RhdGEoKTtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3VybENoYW5nZSgpO1xyXG4gICAgICAgIH0pLnRoZW4oKCkgPT4ge1xyXG4gICAgICAgICAgICBpZiAoc2VnbWVudC5yb3V0ZS5saW5rUm91dGVyKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmFwcC5nZXRSb3V0ZXIoKS5zZXQoc2VnbWVudC5yb3V0ZS5wYXRoLCB7IHNpbGVudDogdHJ1ZSB9KTtcclxuICAgICAgICAgICAgICAgIHRoaXMuYXBwLmNhbGxFdmVudChcImFwcDpyb3V0ZVwiLCBbc2VnbWVudC5yb3V0ZS5wYXRoXSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxuICAgIGluaXQoXyR2aWV3LCBfJCkge1xyXG4gICAgICAgIC8vIHN0dWJcclxuICAgIH1cclxuICAgIHJlYWR5KF8kdmlldywgXyR1cmwpIHtcclxuICAgICAgICAvLyBzdHViXHJcbiAgICB9XHJcbiAgICBjb25maWcoKSB7XHJcbiAgICAgICAgdGhpcy5hcHAud2ViaXgubWVzc2FnZShcIlZpZXc6Q29uZmlnIGlzIG5vdCBpbXBsZW1lbnRlZFwiKTtcclxuICAgIH1cclxuICAgIHVybENoYW5nZShfJHZpZXcsIF8kdXJsKSB7XHJcbiAgICAgICAgLy8gc3R1YlxyXG4gICAgfVxyXG4gICAgZGVzdHJveSgpIHtcclxuICAgICAgICAvLyBzdHViXHJcbiAgICB9XHJcbiAgICBkZXN0cnVjdG9yKCkge1xyXG4gICAgICAgIHRoaXMuZGVzdHJveSgpO1xyXG4gICAgICAgIHRoaXMuX2Rlc3Ryb3lLaWRzKCk7XHJcbiAgICAgICAgLy8gZGVzdHJveSBhY3R1YWwgVUlcclxuICAgICAgICB0aGlzLl9yb290LmRlc3RydWN0b3IoKTtcclxuICAgICAgICBzdXBlci5kZXN0cnVjdG9yKCk7XHJcbiAgICB9XHJcbiAgICB1c2UocGx1Z2luLCBjb25maWcpIHtcclxuICAgICAgICBwbHVnaW4odGhpcy5hcHAsIHRoaXMsIGNvbmZpZyk7XHJcbiAgICB9XHJcbiAgICByZWZyZXNoKCkge1xyXG4gICAgICAgIGNvbnN0IHVybCA9IHRoaXMuZ2V0VXJsKCk7XHJcbiAgICAgICAgdGhpcy5kZXN0cm95KCk7XHJcbiAgICAgICAgdGhpcy5fZGVzdHJveUtpZHMoKTtcclxuICAgICAgICB0aGlzLl9kZXN0cm95U3VicygpO1xyXG4gICAgICAgIHRoaXMuX2RldGFjaEV2ZW50cygpO1xyXG4gICAgICAgIGlmICh0aGlzLl9jb250YWluZXIudGFnTmFtZSkge1xyXG4gICAgICAgICAgICB0aGlzLl9yb290LmRlc3RydWN0b3IoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5fc2VnbWVudC5yZWZyZXNoKCk7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX3JlbmRlcih0aGlzLl9zZWdtZW50KTtcclxuICAgIH1cclxuICAgIHJlbmRlcihyb290LCB1cmwsIHBhcmVudCkge1xyXG4gICAgICAgIGlmICh0eXBlb2YgdXJsID09PSBcInN0cmluZ1wiKSB7XHJcbiAgICAgICAgICAgIHVybCA9IG5ldyBSb3V0ZSh1cmwsIDApO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLl9zZWdtZW50ID0gdXJsO1xyXG4gICAgICAgIHRoaXMuX3BhcmVudCA9IHBhcmVudDtcclxuICAgICAgICB0aGlzLl9pbml0X3VybF9kYXRhKCk7XHJcbiAgICAgICAgcm9vdCA9IHJvb3QgfHwgZG9jdW1lbnQuYm9keTtcclxuICAgICAgICBjb25zdCBfY29udGFpbmVyID0gKHR5cGVvZiByb290ID09PSBcInN0cmluZ1wiKSA/IHRoaXMud2ViaXgudG9Ob2RlKHJvb3QpIDogcm9vdDtcclxuICAgICAgICBpZiAodGhpcy5fY29udGFpbmVyICE9PSBfY29udGFpbmVyKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2NvbnRhaW5lciA9IF9jb250YWluZXI7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9yZW5kZXIodXJsKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl91cmxDaGFuZ2UoKS50aGVuKCgpID0+IHRoaXMuZ2V0Um9vdCgpKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBfcmVuZGVyKHVybCkge1xyXG4gICAgICAgIGNvbnN0IGNvbmZpZyA9IHRoaXMuY29uZmlnKCk7XHJcbiAgICAgICAgaWYgKGNvbmZpZy50aGVuKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBjb25maWcudGhlbihjZmcgPT4gdGhpcy5fcmVuZGVyX2ZpbmFsKGNmZywgdXJsKSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fcmVuZGVyX2ZpbmFsKGNvbmZpZywgdXJsKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBfcmVuZGVyX2ZpbmFsKGNvbmZpZywgdXJsKSB7XHJcbiAgICAgICAgLy8gZ2V0IHByZXZpb3VzIHZpZXcgaW4gdGhlIHNhbWUgc2xvdFxyXG4gICAgICAgIGxldCBzbG90ID0gbnVsbDtcclxuICAgICAgICBsZXQgY29udGFpbmVyID0gbnVsbDtcclxuICAgICAgICBsZXQgc2hvdyA9IGZhbHNlO1xyXG4gICAgICAgIGlmICghdGhpcy5fY29udGFpbmVyLnRhZ05hbWUpIHtcclxuICAgICAgICAgICAgc2xvdCA9IHRoaXMuX2NvbnRhaW5lcjtcclxuICAgICAgICAgICAgaWYgKHNsb3QucG9wdXApIHtcclxuICAgICAgICAgICAgICAgIGNvbnRhaW5lciA9IGRvY3VtZW50LmJvZHk7XHJcbiAgICAgICAgICAgICAgICBzaG93ID0gdHJ1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGNvbnRhaW5lciA9IHRoaXMud2ViaXguJCQoc2xvdC5pZCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIGNvbnRhaW5lciA9IHRoaXMuX2NvbnRhaW5lcjtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gdmlldyBhbHJlYWR5IGRlc3Ryb3llZFxyXG4gICAgICAgIGlmICghdGhpcy5hcHAgfHwgIWNvbnRhaW5lcikge1xyXG4gICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QobnVsbCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxldCByZXNwb25zZTtcclxuICAgICAgICBjb25zdCBjdXJyZW50ID0gdGhpcy5fc2VnbWVudC5jdXJyZW50KCk7XHJcbiAgICAgICAgLy8gdXNpbmcgd3JhcHBlciBvYmplY3QsIHNvIHVpIGNhbiBiZSBjaGFuZ2VkIGZyb20gYXBwOnJlbmRlciBldmVudFxyXG4gICAgICAgIGNvbnN0IHJlc3VsdCA9IHsgdWk6IHt9IH07XHJcbiAgICAgICAgdGhpcy5hcHAuY29weUNvbmZpZyhjb25maWcsIHJlc3VsdC51aSwgdGhpcy5fc3Vicyk7XHJcbiAgICAgICAgdGhpcy5hcHAuY2FsbEV2ZW50KFwiYXBwOnJlbmRlclwiLCBbdGhpcywgdXJsLCByZXN1bHRdKTtcclxuICAgICAgICByZXN1bHQudWkuJHNjb3BlID0gdGhpcztcclxuICAgICAgICAvKiBkZXN0cm95IG9sZCBIVE1MIGF0dGFjaGVkIHZpZXdzIGJlZm9yZSBjcmVhdGluZyBuZXcgb25lICovXHJcbiAgICAgICAgaWYgKCFzbG90ICYmIGN1cnJlbnQuaXNOZXcgJiYgY3VycmVudC52aWV3KSB7XHJcbiAgICAgICAgICAgIGN1cnJlbnQudmlldy5kZXN0cnVjdG9yKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIC8vIHNwZWNpYWwgaGFuZGxpbmcgZm9yIGFkZGluZyBpbnNpZGUgb2YgbXVsdGl2aWV3IC0gcHJlc2VydmUgb2xkIGlkXHJcbiAgICAgICAgICAgIGlmIChzbG90ICYmICFzaG93KSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBvbGR1aSA9IGNvbnRhaW5lcjtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHBhcmVudCA9IG9sZHVpLmdldFBhcmVudFZpZXcoKTtcclxuICAgICAgICAgICAgICAgIGlmIChwYXJlbnQgJiYgcGFyZW50Lm5hbWUgPT09IFwibXVsdGl2aWV3XCIgJiYgIXJlc3VsdC51aS5pZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdC51aS5pZCA9IG9sZHVpLmNvbmZpZy5pZDtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLl9yb290ID0gdGhpcy5hcHAud2ViaXgudWkocmVzdWx0LnVpLCBjb250YWluZXIpO1xyXG4gICAgICAgICAgICBjb25zdCBhc1dpbiA9IHRoaXMuX3Jvb3Q7XHJcbiAgICAgICAgICAgIC8vIGNoZWNrIGZvciB1cmwgYWRkZWQgdG8gaWdub3JlIHRoaXMudWkgY2FsbHNcclxuICAgICAgICAgICAgaWYgKHNob3cgJiYgYXNXaW4uc2V0UG9zaXRpb24gJiYgIWFzV2luLmlzVmlzaWJsZSgpKSB7XHJcbiAgICAgICAgICAgICAgICBhc1dpbi5zaG93KCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgLy8gY2hlY2ssIGlmIHdlIGFyZSByZXBsYWNpbmcgc29tZSBvbGRlciB2aWV3XHJcbiAgICAgICAgICAgIGlmIChzbG90KSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoc2xvdC52aWV3ICYmIHNsb3QudmlldyAhPT0gdGhpcyAmJiBzbG90LnZpZXcgIT09IHRoaXMuYXBwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgc2xvdC52aWV3LmRlc3RydWN0b3IoKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHNsb3QuaWQgPSB0aGlzLl9yb290LmNvbmZpZy5pZDtcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmdldFBhcmVudFZpZXcoKSB8fCAhdGhpcy5hcHAuYXBwKVxyXG4gICAgICAgICAgICAgICAgICAgIHNsb3QudmlldyA9IHRoaXM7XHJcbiAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAvLyB3aGVuIHdlIGhhdmUgc3ViYXBwLCBzZXQgd2hvbGUgYXBwIGFzIGEgdmlld1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIHNvIG9uIGRlc3RydWN0aW9uLCB0aGUgd2hvbGUgYXBwIHdpbGwgYmUgZGVzdHJveWVkXHJcbiAgICAgICAgICAgICAgICAgICAgc2xvdC52aWV3ID0gdGhpcy5hcHA7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKGN1cnJlbnQuaXNOZXcpIHtcclxuICAgICAgICAgICAgICAgIGN1cnJlbnQudmlldyA9IHRoaXM7XHJcbiAgICAgICAgICAgICAgICBjdXJyZW50LmlzTmV3ID0gZmFsc2U7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmVzcG9uc2UgPSBQcm9taXNlLnJlc29sdmUodGhpcy5faW5pdCh0aGlzLl9yb290LCB1cmwpKS50aGVuKCgpID0+IHtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl91cmxDaGFuZ2UoKS50aGVuKCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9pbml0VXJsID0gbnVsbDtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5yZWFkeSh0aGlzLl9yb290LCB1cmwuc3VidXJsKCkpO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjYXRjaCAoZSkge1xyXG4gICAgICAgICAgICByZXNwb25zZSA9IFByb21pc2UucmVqZWN0KGUpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gcmVzcG9uc2UuY2F0Y2goZXJyID0+IHRoaXMuX2luaXRFcnJvcih0aGlzLCBlcnIpKTtcclxuICAgIH1cclxuICAgIF9pbml0KHZpZXcsIHVybCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmluaXQodmlldywgdXJsLnN1YnVybCgpKTtcclxuICAgIH1cclxuICAgIF91cmxDaGFuZ2UoKSB7XHJcbiAgICAgICAgdGhpcy5hcHAuY2FsbEV2ZW50KFwiYXBwOnVybGNoYW5nZVwiLCBbdGhpcywgdGhpcy5fc2VnbWVudF0pO1xyXG4gICAgICAgIGNvbnN0IHdhaXRzID0gW107XHJcbiAgICAgICAgZm9yIChjb25zdCBrZXkgaW4gdGhpcy5fc3Vicykge1xyXG4gICAgICAgICAgICBjb25zdCBmcmFtZSA9IHRoaXMuX3N1YnNba2V5XTtcclxuICAgICAgICAgICAgY29uc3Qgd2FpdCA9IHRoaXMuX3JlbmRlckZyYW1lTG9jayhrZXksIGZyYW1lLCBudWxsKTtcclxuICAgICAgICAgICAgaWYgKHdhaXQpIHtcclxuICAgICAgICAgICAgICAgIHdhaXRzLnB1c2god2FpdCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIFByb21pc2UuYWxsKHdhaXRzKS50aGVuKCgpID0+IHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMudXJsQ2hhbmdlKHRoaXMuX3Jvb3QsIHRoaXMuX3NlZ21lbnQuc3VidXJsKCkpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgX3JlbmRlckZyYW1lTG9jayhrZXksIGZyYW1lLCBwYXRoKSB7XHJcbiAgICAgICAgLy8gaWYgc3VidmlldyBpcyBub3Qgb2NjdXBpZWQgYnkgc29tZSByZW5kZXJpbmcgeWV0XHJcbiAgICAgICAgaWYgKCFmcmFtZS5sb2NrKSB7XHJcbiAgICAgICAgICAgIC8vIHJldHJlaXZlIGFuZCBzdG9yZSByZW5kZXJpbmcgZW5kIHByb21pc2VcclxuICAgICAgICAgICAgY29uc3QgbG9jayA9IHRoaXMuX3JlbmRlckZyYW1lKGtleSwgZnJhbWUsIHBhdGgpO1xyXG4gICAgICAgICAgICBpZiAobG9jaykge1xyXG4gICAgICAgICAgICAgICAgLy8gY2xlYXIgbG9jayBhZnRlciBmcmFtZSByZW5kZXJpbmdcclxuICAgICAgICAgICAgICAgIC8vIGFzIHByb21pc2UuZmluYWxseSBpcyBub3Qgc3VwcG9ydGVkIGJ5ICBXZWJpeCBsZXNzZXIgdGhhbiA2LjJcclxuICAgICAgICAgICAgICAgIC8vIHVzaW5nIGEgbW9yZSB2ZXJib3NlIG5vdGF0aW9uXHJcbiAgICAgICAgICAgICAgICBmcmFtZS5sb2NrID0gbG9jay50aGVuKCgpID0+IGZyYW1lLmxvY2sgPSBudWxsLCAoKSA9PiBmcmFtZS5sb2NrID0gbnVsbCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gcmV0dXJuIHJlbmRlcmluZyBlbmQgcHJvbWlzZVxyXG4gICAgICAgIHJldHVybiBmcmFtZS5sb2NrO1xyXG4gICAgfVxyXG4gICAgX3JlbmRlckZyYW1lKGtleSwgZnJhbWUsIHBhdGgpIHtcclxuICAgICAgICAvL2RlZmF1bHQgcm91dGVcclxuICAgICAgICBpZiAoa2V5ID09PSBcImRlZmF1bHRcIikge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5fc2VnbWVudC5uZXh0KCkpIHtcclxuICAgICAgICAgICAgICAgIC8vIHdlIGhhdmUgYSBuZXh0IHNlZ21lbnQgaW4gdXJsLCByZW5kZXIgaXRcclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl9jcmVhdGVTdWJWaWV3KGZyYW1lLCB0aGlzLl9zZWdtZW50LnNoaWZ0KCkpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2UgaWYgKGZyYW1lLnZpZXcgJiYgZnJhbWUucG9wdXApIHtcclxuICAgICAgICAgICAgICAgIC8vIHRoZXJlIGlzIG5vIG5leHQgc2VnbWVudCwgZGVsZXRlIHRoZSBleGlzdGluZyBzdWItdmlld1xyXG4gICAgICAgICAgICAgICAgZnJhbWUudmlldy5kZXN0cnVjdG9yKCk7XHJcbiAgICAgICAgICAgICAgICBmcmFtZS52aWV3ID0gbnVsbDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICAvL2lmIG5ldyBwYXRoIHByb3ZpZGVkLCBzZXQgaXQgdG8gdGhlIGZyYW1lXHJcbiAgICAgICAgaWYgKHBhdGggIT09IG51bGwpIHtcclxuICAgICAgICAgICAgZnJhbWUudXJsID0gcGF0aDtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gaW4gY2FzZSBvZiByb3V0ZWQgc3ViLXZpZXdcclxuICAgICAgICBpZiAoZnJhbWUucm91dGUpIHtcclxuICAgICAgICAgICAgLy8gd2UgaGF2ZSBhIG5ldyBwYXRoIGZvciBzdWItdmlld1xyXG4gICAgICAgICAgICBpZiAocGF0aCAhPT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZyYW1lLnJvdXRlLnNob3cocGF0aCwgZnJhbWUudmlldykudGhlbigoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2NyZWF0ZVN1YlZpZXcoZnJhbWUsIGZyYW1lLnJvdXRlKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIC8vIGRvIG5vdCB0cmlnZ2VyIG9uQ2hhbmdlIGZvciBpc29sYXRlZCBzdWItdmlld3NcclxuICAgICAgICAgICAgaWYgKGZyYW1lLmJyYW5jaCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxldCB2aWV3ID0gZnJhbWUudmlldztcclxuICAgICAgICAvLyBpZiB2aWV3IGRvZXNuJ3QgZXhpc3RzIHlldCwgaW5pdCBpdFxyXG4gICAgICAgIGlmICghdmlldyAmJiBmcmFtZS51cmwpIHtcclxuICAgICAgICAgICAgaWYgKHR5cGVvZiBmcmFtZS51cmwgPT09IFwic3RyaW5nXCIpIHtcclxuICAgICAgICAgICAgICAgIC8vIHN0cmluZywgc28gd2UgaGF2ZSBpc29sYXRlZCBzdWJ2aWV3IHVybFxyXG4gICAgICAgICAgICAgICAgZnJhbWUucm91dGUgPSBuZXcgUm91dGUoZnJhbWUudXJsLCAwKTtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl9jcmVhdGVTdWJWaWV3KGZyYW1lLCBmcmFtZS5yb3V0ZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAvLyBvYmplY3QsIHNvIHdlIGhhdmUgYW4gZW1iZWRlZCBzdWJ2aWV3XHJcbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mIGZyYW1lLnVybCA9PT0gXCJmdW5jdGlvblwiICYmICEodmlldyBpbnN0YW5jZW9mIGZyYW1lLnVybCkpIHtcclxuICAgICAgICAgICAgICAgICAgICB2aWV3ID0gbmV3IGZyYW1lLnVybCh0aGlzLmFwcCwgXCJcIik7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZiAoIXZpZXcpIHtcclxuICAgICAgICAgICAgICAgICAgICB2aWV3ID0gZnJhbWUudXJsO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIHRyaWdnZXIgb25DaGFuZ2UgZm9yIGFscmVhZHkgZXhpc3RlZCB2aWV3XHJcbiAgICAgICAgaWYgKHZpZXcpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHZpZXcucmVuZGVyKGZyYW1lLCAoZnJhbWUucm91dGUgfHwgdGhpcy5fc2VnbWVudCksIHRoaXMpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIF9pbml0RXJyb3IodmlldywgZXJyKSB7XHJcbiAgICAgICAgLypcclxuICAgICAgICAgICAgaWYgdmlldyBpcyBkZXN0cm95ZWQsIGlnbm9yZSBhbnkgdmlldyByZWxhdGVkIGVycm9yc1xyXG4gICAgICAgICovXHJcbiAgICAgICAgaWYgKHRoaXMuYXBwKSB7XHJcbiAgICAgICAgICAgIHRoaXMuYXBwLmVycm9yKFwiYXBwOmVycm9yOmluaXR2aWV3XCIsIFtlcnIsIHZpZXddKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICB9XHJcbiAgICBfY3JlYXRlU3ViVmlldyhzdWIsIHN1YnVybCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmFwcC5jcmVhdGVGcm9tVVJMKHN1YnVybC5jdXJyZW50KCkpLnRoZW4odmlldyA9PiB7XHJcbiAgICAgICAgICAgIHJldHVybiB2aWV3LnJlbmRlcihzdWIsIHN1YnVybCwgdGhpcyk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICBfZGVzdHJveUtpZHMoKSB7XHJcbiAgICAgICAgLy8gZGVzdHJveSBjaGlsZCB2aWV3c1xyXG4gICAgICAgIGNvbnN0IHVpcyA9IHRoaXMuX2NoaWxkcmVuO1xyXG4gICAgICAgIGZvciAobGV0IGkgPSB1aXMubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIHtcclxuICAgICAgICAgICAgaWYgKHVpc1tpXSAmJiB1aXNbaV0uZGVzdHJ1Y3Rvcikge1xyXG4gICAgICAgICAgICAgICAgdWlzW2ldLmRlc3RydWN0b3IoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICAvLyByZXNldCB2YXJzIGZvciBiZXR0ZXIgR0MgcHJvY2Vzc2luZ1xyXG4gICAgICAgIHRoaXMuX2NoaWxkcmVuID0gW107XHJcbiAgICB9XHJcbn1cblxuLy8gd3JhcHBlciBmb3IgcmF3IG9iamVjdHMgYW5kIEpldCAxLnggc3RydWN0c1xyXG5jbGFzcyBKZXRWaWV3UmF3IGV4dGVuZHMgSmV0VmlldyB7XHJcbiAgICBjb25zdHJ1Y3RvcihhcHAsIGNvbmZpZykge1xyXG4gICAgICAgIHN1cGVyKGFwcCwgY29uZmlnKTtcclxuICAgICAgICB0aGlzLl91aSA9IGNvbmZpZy51aTtcclxuICAgIH1cclxuICAgIGNvbmZpZygpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fdWk7XHJcbiAgICB9XHJcbn1cblxuY2xhc3MgU3ViUm91dGVyIHtcclxuICAgIGNvbnN0cnVjdG9yKGNiLCBjb25maWcsIGFwcCkge1xyXG4gICAgICAgIHRoaXMucGF0aCA9IFwiXCI7XHJcbiAgICAgICAgdGhpcy5hcHAgPSBhcHA7XHJcbiAgICB9XHJcbiAgICBzZXQocGF0aCwgY29uZmlnKSB7XHJcbiAgICAgICAgdGhpcy5wYXRoID0gcGF0aDtcclxuICAgICAgICBjb25zdCBhID0gdGhpcy5hcHA7XHJcbiAgICAgICAgYS5hcHAuZ2V0Um91dGVyKCkuc2V0KGEuX3NlZ21lbnQuYXBwZW5kKHRoaXMucGF0aCksIHsgc2lsZW50OiB0cnVlIH0pO1xyXG4gICAgfVxyXG4gICAgZ2V0KCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnBhdGg7XHJcbiAgICB9XHJcbn1cblxubGV0IF9vbmNlID0gdHJ1ZTtcclxuY2xhc3MgSmV0QXBwQmFzZSBleHRlbmRzIEpldEJhc2Uge1xyXG4gICAgY29uc3RydWN0b3IoY29uZmlnKSB7XHJcbiAgICAgICAgY29uc3Qgd2ViaXggPSAoY29uZmlnIHx8IHt9KS53ZWJpeCB8fCB3aW5kb3cud2ViaXg7XHJcbiAgICAgICAgc3VwZXIod2ViaXgpO1xyXG4gICAgICAgIC8vIGluaXQgY29uZmlnXHJcbiAgICAgICAgdGhpcy5jb25maWcgPSB0aGlzLndlYml4LmV4dGVuZCh7XHJcbiAgICAgICAgICAgIG5hbWU6IFwiQXBwXCIsXHJcbiAgICAgICAgICAgIHZlcnNpb246IFwiMS4wXCIsXHJcbiAgICAgICAgICAgIHN0YXJ0OiBcIi9ob21lXCJcclxuICAgICAgICB9LCBjb25maWcsIHRydWUpO1xyXG4gICAgICAgIHRoaXMuYXBwID0gdGhpcy5jb25maWcuYXBwO1xyXG4gICAgICAgIHRoaXMucmVhZHkgPSBQcm9taXNlLnJlc29sdmUoKTtcclxuICAgICAgICB0aGlzLl9zZXJ2aWNlcyA9IHt9O1xyXG4gICAgICAgIHRoaXMud2ViaXguZXh0ZW5kKHRoaXMsIHRoaXMud2ViaXguRXZlbnRTeXN0ZW0pO1xyXG4gICAgfVxyXG4gICAgZ2V0VXJsKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9zdWJTZWdtZW50LnN1YnVybCgpO1xyXG4gICAgfVxyXG4gICAgZ2V0VXJsU3RyaW5nKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9zdWJTZWdtZW50LnRvU3RyaW5nKCk7XHJcbiAgICB9XHJcbiAgICBnZXRTZXJ2aWNlKG5hbWUpIHtcclxuICAgICAgICBsZXQgb2JqID0gdGhpcy5fc2VydmljZXNbbmFtZV07XHJcbiAgICAgICAgaWYgKHR5cGVvZiBvYmogPT09IFwiZnVuY3Rpb25cIikge1xyXG4gICAgICAgICAgICBvYmogPSB0aGlzLl9zZXJ2aWNlc1tuYW1lXSA9IG9iaih0aGlzKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIG9iajtcclxuICAgIH1cclxuICAgIHNldFNlcnZpY2UobmFtZSwgaGFuZGxlcikge1xyXG4gICAgICAgIHRoaXMuX3NlcnZpY2VzW25hbWVdID0gaGFuZGxlcjtcclxuICAgIH1cclxuICAgIGRlc3RydWN0b3IoKSB7XHJcbiAgICAgICAgdGhpcy5nZXRTdWJWaWV3KCkuZGVzdHJ1Y3RvcigpO1xyXG4gICAgICAgIHN1cGVyLmRlc3RydWN0b3IoKTtcclxuICAgIH1cclxuICAgIC8vIGNvcHkgb2JqZWN0IGFuZCBjb2xsZWN0IGV4dHJhIGhhbmRsZXJzXHJcbiAgICBjb3B5Q29uZmlnKG9iaiwgdGFyZ2V0LCBjb25maWcpIHtcclxuICAgICAgICAvLyByYXcgdWkgY29uZmlnXHJcbiAgICAgICAgaWYgKG9iaiBpbnN0YW5jZW9mIEpldEJhc2UgfHxcclxuICAgICAgICAgICAgKHR5cGVvZiBvYmogPT09IFwiZnVuY3Rpb25cIiAmJiBvYmoucHJvdG90eXBlIGluc3RhbmNlb2YgSmV0QmFzZSkpIHtcclxuICAgICAgICAgICAgb2JqID0geyAkc3Vidmlldzogb2JqIH07XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIHN1YnZpZXcgcGxhY2Vob2xkZXJcclxuICAgICAgICBpZiAodHlwZW9mIG9iai4kc3VidmlldyAhPSBcInVuZGVmaW5lZFwiKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmFkZFN1YlZpZXcob2JqLCB0YXJnZXQsIGNvbmZpZyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIHByb2Nlc3Mgc3ViLXByb3BlcnRpZXNcclxuICAgICAgICB0YXJnZXQgPSB0YXJnZXQgfHwgKG9iaiBpbnN0YW5jZW9mIEFycmF5ID8gW10gOiB7fSk7XHJcbiAgICAgICAgZm9yIChjb25zdCBtZXRob2QgaW4gb2JqKSB7XHJcbiAgICAgICAgICAgIGxldCBwb2ludCA9IG9ialttZXRob2RdO1xyXG4gICAgICAgICAgICAvLyB2aWV3IGNsYXNzXHJcbiAgICAgICAgICAgIGlmICh0eXBlb2YgcG9pbnQgPT09IFwiZnVuY3Rpb25cIiAmJiBwb2ludC5wcm90b3R5cGUgaW5zdGFuY2VvZiBKZXRCYXNlKSB7XHJcbiAgICAgICAgICAgICAgICBwb2ludCA9IHsgJHN1YnZpZXc6IHBvaW50IH07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKHBvaW50ICYmIHR5cGVvZiBwb2ludCA9PT0gXCJvYmplY3RcIiAmJlxyXG4gICAgICAgICAgICAgICAgIShwb2ludCBpbnN0YW5jZW9mIHRoaXMud2ViaXguRGF0YUNvbGxlY3Rpb24pICYmICEocG9pbnQgaW5zdGFuY2VvZiBSZWdFeHApKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAocG9pbnQgaW5zdGFuY2VvZiBEYXRlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGFyZ2V0W21ldGhvZF0gPSBuZXcgRGF0ZShwb2ludCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBjb3B5ID0gdGhpcy5jb3B5Q29uZmlnKHBvaW50LCAocG9pbnQgaW5zdGFuY2VvZiBBcnJheSA/IFtdIDoge30pLCBjb25maWcpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChjb3B5ICE9PSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRhcmdldFttZXRob2RdID0gY29weTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB0YXJnZXRbbWV0aG9kXSA9IHBvaW50O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0YXJnZXQ7XHJcbiAgICB9XHJcbiAgICBnZXRSb3V0ZXIoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuJHJvdXRlcjtcclxuICAgIH1cclxuICAgIGNsaWNrSGFuZGxlcihlLCB0YXJnZXQpIHtcclxuICAgICAgICBpZiAoZSkge1xyXG4gICAgICAgICAgICB0YXJnZXQgPSB0YXJnZXQgfHwgKGUudGFyZ2V0IHx8IGUuc3JjRWxlbWVudCk7XHJcbiAgICAgICAgICAgIGlmICh0YXJnZXQgJiYgdGFyZ2V0LmdldEF0dHJpYnV0ZSkge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgdHJpZ2dlciA9IHRhcmdldC5nZXRBdHRyaWJ1dGUoXCJ0cmlnZ2VyXCIpO1xyXG4gICAgICAgICAgICAgICAgaWYgKHRyaWdnZXIpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9mb3JWaWV3KHRhcmdldCwgdmlldyA9PiB2aWV3LmFwcC50cmlnZ2VyKHRyaWdnZXIpKTtcclxuICAgICAgICAgICAgICAgICAgICBlLmNhbmNlbEJ1YmJsZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGNvbnN0IHJvdXRlID0gdGFyZ2V0LmdldEF0dHJpYnV0ZShcInJvdXRlXCIpO1xyXG4gICAgICAgICAgICAgICAgaWYgKHJvdXRlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fZm9yVmlldyh0YXJnZXQsIHZpZXcgPT4gdmlldy5zaG93KHJvdXRlKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgZS5jYW5jZWxCdWJibGUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgY29uc3QgcGFyZW50ID0gdGFyZ2V0LnBhcmVudE5vZGU7XHJcbiAgICAgICAgaWYgKHBhcmVudCkge1xyXG4gICAgICAgICAgICB0aGlzLmNsaWNrSGFuZGxlcihlLCBwYXJlbnQpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGdldFJvb3QoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0U3ViVmlldygpLmdldFJvb3QoKTtcclxuICAgIH1cclxuICAgIHJlZnJlc2goKSB7XHJcbiAgICAgICAgaWYgKCF0aGlzLl9zdWJTZWdtZW50KSB7XHJcbiAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUobnVsbCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0aGlzLmdldFN1YlZpZXcoKS5yZWZyZXNoKCkudGhlbih2aWV3ID0+IHtcclxuICAgICAgICAgICAgdGhpcy5jYWxsRXZlbnQoXCJhcHA6cm91dGVcIiwgW3RoaXMuZ2V0VXJsKCldKTtcclxuICAgICAgICAgICAgcmV0dXJuIHZpZXc7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICBsb2FkVmlldyh1cmwpIHtcclxuICAgICAgICBjb25zdCB2aWV3cyA9IHRoaXMuY29uZmlnLnZpZXdzO1xyXG4gICAgICAgIGxldCByZXN1bHQgPSBudWxsO1xyXG4gICAgICAgIGlmICh1cmwgPT09IFwiXCIpIHtcclxuICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSh0aGlzLl9sb2FkRXJyb3IoXCJcIiwgbmV3IEVycm9yKFwiV2ViaXggSmV0OiBFbXB0eSB1cmwgc2VnbWVudFwiKSkpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICBpZiAodmlld3MpIHtcclxuICAgICAgICAgICAgICAgIGlmICh0eXBlb2Ygdmlld3MgPT09IFwiZnVuY3Rpb25cIikge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIGN1c3RvbSBsb2FkaW5nIHN0cmF0ZWd5XHJcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0ID0gdmlld3ModXJsKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIHByZWRlZmluZWQgaGFzaFxyXG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdCA9IHZpZXdzW3VybF07XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mIHJlc3VsdCA9PT0gXCJzdHJpbmdcIikge1xyXG4gICAgICAgICAgICAgICAgICAgIHVybCA9IHJlc3VsdDtcclxuICAgICAgICAgICAgICAgICAgICByZXN1bHQgPSBudWxsO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmICghcmVzdWx0KSB7XHJcbiAgICAgICAgICAgICAgICBpZiAodXJsID09PSBcIl9ibGFua1wiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0ID0ge307XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICByZXN1bHQgPSB0aGlzLl9sb2FkVmlld0R5bmFtaWModXJsKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBjYXRjaCAoZSkge1xyXG4gICAgICAgICAgICByZXN1bHQgPSB0aGlzLl9sb2FkRXJyb3IodXJsLCBlKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gY3VzdG9tIGhhbmRsZXIgY2FuIHJldHVybiB2aWV3IG9yIGl0cyBwcm9taXNlXHJcbiAgICAgICAgaWYgKCFyZXN1bHQudGhlbikge1xyXG4gICAgICAgICAgICByZXN1bHQgPSBQcm9taXNlLnJlc29sdmUocmVzdWx0KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gc2V0IGVycm9yIGhhbmRsZXJcclxuICAgICAgICByZXN1bHQgPSByZXN1bHRcclxuICAgICAgICAgICAgLnRoZW4obW9kdWxlID0+IG1vZHVsZS5fX2VzTW9kdWxlID8gbW9kdWxlLmRlZmF1bHQgOiBtb2R1bGUpXHJcbiAgICAgICAgICAgIC5jYXRjaChlcnIgPT4gdGhpcy5fbG9hZEVycm9yKHVybCwgZXJyKSk7XHJcbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcclxuICAgIH1cclxuICAgIF9mb3JWaWV3KHRhcmdldCwgaGFuZGxlcikge1xyXG4gICAgICAgIGNvbnN0IHZpZXcgPSB0aGlzLndlYml4LiQkKHRhcmdldCk7XHJcbiAgICAgICAgaWYgKHZpZXcpIHtcclxuICAgICAgICAgICAgaGFuZGxlcih2aWV3LiRzY29wZSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgX2xvYWRWaWV3RHluYW1pYyh1cmwpIHtcclxuICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgIH1cclxuICAgIGNyZWF0ZUZyb21VUkwoY2h1bmspIHtcclxuICAgICAgICBsZXQgdmlldztcclxuICAgICAgICBpZiAoY2h1bmsuaXNOZXcgfHwgIWNodW5rLnZpZXcpIHtcclxuICAgICAgICAgICAgdmlldyA9IHRoaXMubG9hZFZpZXcoY2h1bmsucGFnZSlcclxuICAgICAgICAgICAgICAgIC50aGVuKHVpID0+IHRoaXMuY3JlYXRlVmlldyh1aSwgbmFtZSkpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgdmlldyA9IFByb21pc2UucmVzb2x2ZShjaHVuay52aWV3KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHZpZXc7XHJcbiAgICB9XHJcbiAgICBjcmVhdGVWaWV3KHVpLCBuYW1lKSB7XHJcbiAgICAgICAgbGV0IG9iajtcclxuICAgICAgICBpZiAodHlwZW9mIHVpID09PSBcImZ1bmN0aW9uXCIpIHtcclxuICAgICAgICAgICAgaWYgKHVpLnByb3RvdHlwZSBpbnN0YW5jZW9mIEpldEFwcEJhc2UpIHtcclxuICAgICAgICAgICAgICAgIC8vIFVJIGNsYXNzXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gbmV3IHVpKHsgYXBwOiB0aGlzLCBuYW1lLCByb3V0ZXI6IFN1YlJvdXRlciB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIGlmICh1aS5wcm90b3R5cGUgaW5zdGFuY2VvZiBKZXRCYXNlKSB7XHJcbiAgICAgICAgICAgICAgICAvLyBVSSBjbGFzc1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIG5ldyB1aSh0aGlzLCB7IG5hbWUgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAvLyBVSSBmYWN0b3J5IGZ1bmN0aW9uc1xyXG4gICAgICAgICAgICAgICAgdWkgPSB1aSh0aGlzKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodWkgaW5zdGFuY2VvZiBKZXRCYXNlKSB7XHJcbiAgICAgICAgICAgIG9iaiA9IHVpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgLy8gVUkgb2JqZWN0XHJcbiAgICAgICAgICAgIG9iaiA9IG5ldyBKZXRWaWV3UmF3KHRoaXMsIHsgbmFtZSwgdWkgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBvYmo7XHJcbiAgICB9XHJcbiAgICAvLyBzaG93IHZpZXcgcGF0aFxyXG4gICAgc2hvdyh1cmwpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5yZW5kZXIodGhpcy5fY29udGFpbmVyLCAodXJsIHx8IHRoaXMuY29uZmlnLnN0YXJ0KSk7XHJcbiAgICB9XHJcbiAgICAvLyBldmVudCBoZWxwZXJzXHJcbiAgICB0cmlnZ2VyKG5hbWUsIC4uLnJlc3QpIHtcclxuICAgICAgICB0aGlzLmFwcGx5KG5hbWUsIHJlc3QpO1xyXG4gICAgfVxyXG4gICAgYXBwbHkobmFtZSwgZGF0YSkge1xyXG4gICAgICAgIHRoaXMuY2FsbEV2ZW50KG5hbWUsIGRhdGEpO1xyXG4gICAgfVxyXG4gICAgYWN0aW9uKG5hbWUpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy53ZWJpeC5iaW5kKGZ1bmN0aW9uICguLi5yZXN0KSB7XHJcbiAgICAgICAgICAgIHRoaXMuYXBwbHkobmFtZSwgcmVzdCk7XHJcbiAgICAgICAgfSwgdGhpcyk7XHJcbiAgICB9XHJcbiAgICBvbihuYW1lLCBoYW5kbGVyKSB7XHJcbiAgICAgICAgdGhpcy5hdHRhY2hFdmVudChuYW1lLCBoYW5kbGVyKTtcclxuICAgIH1cclxuICAgIHVzZShwbHVnaW4sIGNvbmZpZykge1xyXG4gICAgICAgIHBsdWdpbih0aGlzLCBudWxsLCBjb25maWcpO1xyXG4gICAgfVxyXG4gICAgZXJyb3IobmFtZSwgZXIpIHtcclxuICAgICAgICB0aGlzLmNhbGxFdmVudChuYW1lLCBlcik7XHJcbiAgICAgICAgdGhpcy5jYWxsRXZlbnQoXCJhcHA6ZXJyb3JcIiwgZXIpO1xyXG4gICAgICAgIC8qIHRzbGludDpkaXNhYmxlICovXHJcbiAgICAgICAgaWYgKHRoaXMuY29uZmlnLmRlYnVnKSB7XHJcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgZXIubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoZXJbaV0pO1xyXG4gICAgICAgICAgICAgICAgaWYgKGVyW2ldIGluc3RhbmNlb2YgRXJyb3IpIHtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgdGV4dCA9IGVyW2ldLm1lc3NhZ2U7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRleHQuaW5kZXhPZihcIk1vZHVsZSBidWlsZCBmYWlsZWRcIikgPT09IDApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGV4dCA9IHRleHQucmVwbGFjZSgvXFx4MWJcXFtbMC05O10qbS9nLCBcIlwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZG9jdW1lbnQuYm9keS5pbm5lckhUTUwgPSBgPHByZSBzdHlsZT0nZm9udC1zaXplOjE2cHg7IGJhY2tncm91bmQtY29sb3I6ICNlYzY4NzM7IGNvbG9yOiAjMDAwOyBwYWRkaW5nOjEwcHg7Jz4ke3RleHR9PC9wcmU+YDtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRleHQgKz0gXCI8YnI+PGJyPkNoZWNrIGNvbnNvbGUgZm9yIG1vcmUgZGV0YWlsc1wiO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLndlYml4Lm1lc3NhZ2UoeyB0eXBlOiBcImVycm9yXCIsIHRleHQ6IHRleHQsIGV4cGlyZTogLTEgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGRlYnVnZ2VyO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvKiB0c2xpbnQ6ZW5hYmxlICovXHJcbiAgICB9XHJcbiAgICAvLyByZW5kZXJzIHRvcCB2aWV3XHJcbiAgICByZW5kZXIocm9vdCwgdXJsLCBwYXJlbnQpIHtcclxuICAgICAgICB0aGlzLl9jb250YWluZXIgPSAodHlwZW9mIHJvb3QgPT09IFwic3RyaW5nXCIpID9cclxuICAgICAgICAgICAgdGhpcy53ZWJpeC50b05vZGUocm9vdCkgOlxyXG4gICAgICAgICAgICAocm9vdCB8fCBkb2N1bWVudC5ib2R5KTtcclxuICAgICAgICBjb25zdCBmaXJzdEluaXQgPSAhdGhpcy4kcm91dGVyO1xyXG4gICAgICAgIGxldCBwYXRoID0gbnVsbDtcclxuICAgICAgICBpZiAoZmlyc3RJbml0KSB7XHJcbiAgICAgICAgICAgIGlmIChfb25jZSAmJiBcInRhZ05hbWVcIiBpbiB0aGlzLl9jb250YWluZXIpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMud2ViaXguZXZlbnQoZG9jdW1lbnQuYm9keSwgXCJjbGlja1wiLCBlID0+IHRoaXMuY2xpY2tIYW5kbGVyKGUpKTtcclxuICAgICAgICAgICAgICAgIF9vbmNlID0gZmFsc2U7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKHR5cGVvZiB1cmwgPT09IFwic3RyaW5nXCIpIHtcclxuICAgICAgICAgICAgICAgIHVybCA9IG5ldyBSb3V0ZSh1cmwsIDApO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMuX3N1YlNlZ21lbnQgPSB0aGlzLl9maXJzdF9zdGFydCh1cmwpO1xyXG4gICAgICAgICAgICB0aGlzLl9zdWJTZWdtZW50LnJvdXRlLmxpbmtSb3V0ZXIgPSB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgaWYgKHR5cGVvZiB1cmwgPT09IFwic3RyaW5nXCIpIHtcclxuICAgICAgICAgICAgICAgIHBhdGggPSB1cmw7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5hcHApIHtcclxuICAgICAgICAgICAgICAgICAgICBwYXRoID0gdXJsLnNwbGl0KCkucm91dGUucGF0aCB8fCB0aGlzLmNvbmZpZy5zdGFydDtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHBhdGggPSB1cmwudG9TdHJpbmcoKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBjb25zdCB0b3AgPSB0aGlzLmdldFN1YlZpZXcoKTtcclxuICAgICAgICBjb25zdCBzZWdtZW50ID0gdGhpcy5fc3ViU2VnbWVudDtcclxuICAgICAgICBjb25zdCByZWFkeSA9IHNlZ21lbnQuc2hvdyhwYXRoLCB0b3ApXHJcbiAgICAgICAgICAgIC50aGVuKCgpID0+IHRoaXMuY3JlYXRlRnJvbVVSTChzZWdtZW50LmN1cnJlbnQoKSkpXHJcbiAgICAgICAgICAgIC50aGVuKHZpZXcgPT4gdmlldy5yZW5kZXIocm9vdCwgc2VnbWVudCkpXHJcbiAgICAgICAgICAgIC50aGVuKGJhc2UgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLiRyb3V0ZXIuc2V0KHNlZ21lbnQucm91dGUucGF0aCwgeyBzaWxlbnQ6IHRydWUgfSk7XHJcbiAgICAgICAgICAgIHRoaXMuY2FsbEV2ZW50KFwiYXBwOnJvdXRlXCIsIFt0aGlzLmdldFVybCgpXSk7XHJcbiAgICAgICAgICAgIHJldHVybiBiYXNlO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHRoaXMucmVhZHkgPSB0aGlzLnJlYWR5LnRoZW4oKCkgPT4gcmVhZHkpO1xyXG4gICAgICAgIHJldHVybiByZWFkeTtcclxuICAgIH1cclxuICAgIGdldFN1YlZpZXcoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuX3N1YlNlZ21lbnQpIHtcclxuICAgICAgICAgICAgY29uc3QgdmlldyA9IHRoaXMuX3N1YlNlZ21lbnQuY3VycmVudCgpLnZpZXc7XHJcbiAgICAgICAgICAgIGlmICh2aWV3KVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHZpZXc7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBuZXcgSmV0Vmlldyh0aGlzLCB7fSk7XHJcbiAgICB9XHJcbiAgICBfZmlyc3Rfc3RhcnQocm91dGUpIHtcclxuICAgICAgICB0aGlzLl9zZWdtZW50ID0gcm91dGU7XHJcbiAgICAgICAgY29uc3QgY2IgPSAoYSkgPT4gc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuc2hvdyhhKS5jYXRjaChlID0+IHtcclxuICAgICAgICAgICAgICAgIGlmICghKGUgaW5zdGFuY2VvZiBOYXZpZ2F0aW9uQmxvY2tlZCkpXHJcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgZTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSwgMSk7XHJcbiAgICAgICAgdGhpcy4kcm91dGVyID0gbmV3ICh0aGlzLmNvbmZpZy5yb3V0ZXIpKGNiLCB0aGlzLmNvbmZpZywgdGhpcyk7XHJcbiAgICAgICAgLy8gc3RhcnQgYW5pbWF0aW9uIGZvciB0b3AtbGV2ZWwgYXBwXHJcbiAgICAgICAgaWYgKHRoaXMuX2NvbnRhaW5lciA9PT0gZG9jdW1lbnQuYm9keSAmJiB0aGlzLmNvbmZpZy5hbmltYXRpb24gIT09IGZhbHNlKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IG5vZGUgPSB0aGlzLl9jb250YWluZXI7XHJcbiAgICAgICAgICAgIHRoaXMud2ViaXguaHRtbC5hZGRDc3Mobm9kZSwgXCJ3ZWJpeGFwcHN0YXJ0XCIpO1xyXG4gICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMud2ViaXguaHRtbC5yZW1vdmVDc3Mobm9kZSwgXCJ3ZWJpeGFwcHN0YXJ0XCIpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy53ZWJpeC5odG1sLmFkZENzcyhub2RlLCBcIndlYml4YXBwXCIpO1xyXG4gICAgICAgICAgICB9LCAxMCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICghcm91dGUpIHtcclxuICAgICAgICAgICAgLy8gaWYgbm8gdXJsIGRlZmluZWQsIGNoZWNrIHJvdXRlciBmaXJzdFxyXG4gICAgICAgICAgICBsZXQgdXJsU3RyaW5nID0gdGhpcy4kcm91dGVyLmdldCgpO1xyXG4gICAgICAgICAgICBpZiAoIXVybFN0cmluZykge1xyXG4gICAgICAgICAgICAgICAgdXJsU3RyaW5nID0gdGhpcy5jb25maWcuc3RhcnQ7XHJcbiAgICAgICAgICAgICAgICB0aGlzLiRyb3V0ZXIuc2V0KHVybFN0cmluZywgeyBzaWxlbnQ6IHRydWUgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcm91dGUgPSBuZXcgUm91dGUodXJsU3RyaW5nLCAwKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZiAodGhpcy5hcHApIHtcclxuICAgICAgICAgICAgcm91dGUuY3VycmVudCgpLnZpZXcgPSB0aGlzO1xyXG4gICAgICAgICAgICBpZiAocm91dGUubmV4dCgpKSB7XHJcbiAgICAgICAgICAgICAgICByb3V0ZS5yZWZyZXNoKCk7XHJcbiAgICAgICAgICAgICAgICByb3V0ZSA9IHJvdXRlLnNwbGl0KCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICByb3V0ZSA9IG5ldyBSb3V0ZSh0aGlzLmNvbmZpZy5zdGFydCwgMCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHJvdXRlO1xyXG4gICAgfVxyXG4gICAgLy8gZXJyb3IgZHVyaW5nIHZpZXcgcmVzb2x2aW5nXHJcbiAgICBfbG9hZEVycm9yKHVybCwgZXJyKSB7XHJcbiAgICAgICAgdGhpcy5lcnJvcihcImFwcDplcnJvcjpyZXNvbHZlXCIsIFtlcnIsIHVybF0pO1xyXG4gICAgICAgIHJldHVybiB7IHRlbXBsYXRlOiBcIiBcIiB9O1xyXG4gICAgfVxyXG4gICAgYWRkU3ViVmlldyhvYmosIHRhcmdldCwgY29uZmlnKSB7XHJcbiAgICAgICAgY29uc3QgdXJsID0gb2JqLiRzdWJ2aWV3ICE9PSB0cnVlID8gb2JqLiRzdWJ2aWV3IDogbnVsbDtcclxuICAgICAgICBjb25zdCBuYW1lID0gb2JqLm5hbWUgfHwgKHVybCA/IHRoaXMud2ViaXgudWlkKCkgOiBcImRlZmF1bHRcIik7XHJcbiAgICAgICAgdGFyZ2V0LmlkID0gb2JqLmlkIHx8IFwic1wiICsgdGhpcy53ZWJpeC51aWQoKTtcclxuICAgICAgICBjb25zdCB2aWV3ID0gY29uZmlnW25hbWVdID0ge1xyXG4gICAgICAgICAgICBpZDogdGFyZ2V0LmlkLFxyXG4gICAgICAgICAgICB1cmwsXHJcbiAgICAgICAgICAgIGJyYW5jaDogb2JqLmJyYW5jaCxcclxuICAgICAgICAgICAgcG9wdXA6IG9iai5wb3B1cFxyXG4gICAgICAgIH07XHJcbiAgICAgICAgcmV0dXJuIHZpZXcucG9wdXAgPyBudWxsIDogdGFyZ2V0O1xyXG4gICAgfVxyXG59XG5cbmNsYXNzIEhhc2hSb3V0ZXIge1xyXG4gICAgY29uc3RydWN0b3IoY2IsIGNvbmZpZykge1xyXG4gICAgICAgIHRoaXMuY29uZmlnID0gY29uZmlnIHx8IHt9O1xyXG4gICAgICAgIHRoaXMuX2RldGVjdFByZWZpeCgpO1xyXG4gICAgICAgIHRoaXMuY2IgPSBjYjtcclxuICAgICAgICB3aW5kb3cub25wb3BzdGF0ZSA9ICgpID0+IHRoaXMuY2IodGhpcy5nZXQoKSk7XHJcbiAgICB9XHJcbiAgICBzZXQocGF0aCwgY29uZmlnKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuY29uZmlnLnJvdXRlcykge1xyXG4gICAgICAgICAgICBjb25zdCBjb21wYXJlID0gcGF0aC5zcGxpdChcIj9cIiwgMik7XHJcbiAgICAgICAgICAgIGZvciAoY29uc3Qga2V5IGluIHRoaXMuY29uZmlnLnJvdXRlcykge1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuY29uZmlnLnJvdXRlc1trZXldID09PSBjb21wYXJlWzBdKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcGF0aCA9IGtleSArIChjb21wYXJlLmxlbmd0aCA+IDEgPyBcIj9cIiArIGNvbXBhcmVbMV0gOiBcIlwiKTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodGhpcy5nZXQoKSAhPT0gcGF0aCkge1xyXG4gICAgICAgICAgICB3aW5kb3cuaGlzdG9yeS5wdXNoU3RhdGUobnVsbCwgbnVsbCwgdGhpcy5wcmVmaXggKyB0aGlzLnN1Zml4ICsgcGF0aCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICghY29uZmlnIHx8ICFjb25maWcuc2lsZW50KSB7XHJcbiAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4gdGhpcy5jYihwYXRoKSwgMSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgZ2V0KCkge1xyXG4gICAgICAgIGxldCBwYXRoID0gdGhpcy5fZ2V0UmF3KCkucmVwbGFjZSh0aGlzLnByZWZpeCwgXCJcIikucmVwbGFjZSh0aGlzLnN1Zml4LCBcIlwiKTtcclxuICAgICAgICBwYXRoID0gKHBhdGggIT09IFwiL1wiICYmIHBhdGggIT09IFwiI1wiKSA/IHBhdGggOiBcIlwiO1xyXG4gICAgICAgIGlmICh0aGlzLmNvbmZpZy5yb3V0ZXMpIHtcclxuICAgICAgICAgICAgY29uc3QgY29tcGFyZSA9IHBhdGguc3BsaXQoXCI/XCIsIDIpO1xyXG4gICAgICAgICAgICBjb25zdCBrZXkgPSB0aGlzLmNvbmZpZy5yb3V0ZXNbY29tcGFyZVswXV07XHJcbiAgICAgICAgICAgIGlmIChrZXkpIHtcclxuICAgICAgICAgICAgICAgIHBhdGggPSBrZXkgKyAoY29tcGFyZS5sZW5ndGggPiAxID8gXCI/XCIgKyBjb21wYXJlWzFdIDogXCJcIik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHBhdGg7XHJcbiAgICB9XHJcbiAgICBfZGV0ZWN0UHJlZml4KCkge1xyXG4gICAgICAgIC8vIHVzZSBcIiMhXCIgZm9yIGJhY2t3YXJkIGNvbXBhdGliaWxpdHlcclxuICAgICAgICBjb25zdCBzdWZpeCA9IHRoaXMuY29uZmlnLnJvdXRlclByZWZpeDtcclxuICAgICAgICB0aGlzLnN1Zml4ID0gXCIjXCIgKyAoKHR5cGVvZiBzdWZpeCA9PT0gXCJ1bmRlZmluZWRcIikgPyBcIiFcIiA6IHN1Zml4KTtcclxuICAgICAgICB0aGlzLnByZWZpeCA9IGRvY3VtZW50LmxvY2F0aW9uLmhyZWYuc3BsaXQoXCIjXCIsIDIpWzBdO1xyXG4gICAgfVxyXG4gICAgX2dldFJhdygpIHtcclxuICAgICAgICByZXR1cm4gZG9jdW1lbnQubG9jYXRpb24uaHJlZjtcclxuICAgIH1cclxufVxuXG5sZXQgaXNQYXRjaGVkID0gZmFsc2U7XHJcbmZ1bmN0aW9uIHBhdGNoKHcpIHtcclxuICAgIGlmIChpc1BhdGNoZWQgfHwgIXcpIHtcclxuICAgICAgICByZXR1cm47XHJcbiAgICB9XHJcbiAgICBpc1BhdGNoZWQgPSB0cnVlO1xyXG4gICAgLy8gY3VzdG9tIHByb21pc2UgZm9yIElFOFxyXG4gICAgY29uc3Qgd2luID0gd2luZG93O1xyXG4gICAgaWYgKCF3aW4uUHJvbWlzZSkge1xyXG4gICAgICAgIHdpbi5Qcm9taXNlID0gdy5wcm9taXNlO1xyXG4gICAgfVxyXG4gICAgY29uc3QgdmVyc2lvbiA9IHcudmVyc2lvbi5zcGxpdChcIi5cIik7XHJcbiAgICAvLyB3aWxsIGJlIGZpeGVkIGluIHdlYml4IDUuM1xyXG4gICAgaWYgKHZlcnNpb25bMF0gKiAxMCArIHZlcnNpb25bMV0gKiAxIDwgNTMpIHtcclxuICAgICAgICB3LnVpLmZyZWV6ZSA9IGZ1bmN0aW9uIChoYW5kbGVyKSB7XHJcbiAgICAgICAgICAgIC8vIGRpc2FibGVkIGJlY2F1c2Ugd2ViaXggamV0IDUuMCBjYW4ndCBoYW5kbGUgcmVzaXplIG9mIHNjcm9sbHZpZXcgY29ycmVjdGx5XHJcbiAgICAgICAgICAgIC8vIHcudWkuJGZyZWV6ZSA9IHRydWU7XHJcbiAgICAgICAgICAgIGNvbnN0IHJlcyA9IGhhbmRsZXIoKTtcclxuICAgICAgICAgICAgaWYgKHJlcyAmJiByZXMudGhlbikge1xyXG4gICAgICAgICAgICAgICAgcmVzLnRoZW4oZnVuY3Rpb24gKHNvbWUpIHtcclxuICAgICAgICAgICAgICAgICAgICB3LnVpLiRmcmVlemUgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICB3LnVpLnJlc2l6ZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBzb21lO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB3LnVpLiRmcmVlemUgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIHcudWkucmVzaXplKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIHJlcztcclxuICAgICAgICB9O1xyXG4gICAgfVxyXG4gICAgLy8gYWRkaW5nIHZpZXdzIGFzIGNsYXNzZXNcclxuICAgIGNvbnN0IGJhc2VBZGQgPSB3LnVpLmJhc2VsYXlvdXQucHJvdG90eXBlLmFkZFZpZXc7XHJcbiAgICBjb25zdCBiYXNlUmVtb3ZlID0gdy51aS5iYXNlbGF5b3V0LnByb3RvdHlwZS5yZW1vdmVWaWV3O1xyXG4gICAgY29uc3QgY29uZmlnID0ge1xyXG4gICAgICAgIGFkZFZpZXcodmlldywgaW5kZXgpIHtcclxuICAgICAgICAgICAgLy8gdHJpZ2dlciBsb2dpYyBvbmx5IGZvciB3aWRnZXRzIGluc2lkZSBvZiBqZXQtdmlld1xyXG4gICAgICAgICAgICAvLyBpZ25vcmUgY2FzZSB3aGVuIGFkZFZpZXcgdXNlZCB3aXRoIGFscmVhZHkgaW5pdGlhbGl6ZWQgd2lkZ2V0XHJcbiAgICAgICAgICAgIGlmICh0aGlzLiRzY29wZSAmJiB0aGlzLiRzY29wZS53ZWJpeEpldCAmJiAhdmlldy5xdWVyeVZpZXcpIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGp2aWV3ID0gdGhpcy4kc2NvcGU7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBzdWJzID0ge307XHJcbiAgICAgICAgICAgICAgICB2aWV3ID0ganZpZXcuYXBwLmNvcHlDb25maWcodmlldywge30sIHN1YnMpO1xyXG4gICAgICAgICAgICAgICAgYmFzZUFkZC5hcHBseSh0aGlzLCBbdmlldywgaW5kZXhdKTtcclxuICAgICAgICAgICAgICAgIGZvciAoY29uc3Qga2V5IGluIHN1YnMpIHtcclxuICAgICAgICAgICAgICAgICAgICBqdmlldy5fcmVuZGVyRnJhbWUoa2V5LCBzdWJzW2tleV0sIG51bGwpLnRoZW4oKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBqdmlldy5fc3Vic1trZXldID0gc3Vic1trZXldO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHZpZXcuaWQ7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gYmFzZUFkZC5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuICAgICAgICByZW1vdmVWaWV3KCkge1xyXG4gICAgICAgICAgICBiYXNlUmVtb3ZlLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLiRzY29wZSAmJiB0aGlzLiRzY29wZS53ZWJpeEpldCkge1xyXG4gICAgICAgICAgICAgICAgY29uc3Qgc3VicyA9IHRoaXMuJHNjb3BlLl9zdWJzO1xyXG4gICAgICAgICAgICAgICAgLy8gY2hlY2sgYWxsIHN1Yi12aWV3cywgZGVzdHJveSBhbmQgY2xlYW4gdGhlIHJlbW92ZWQgb25lXHJcbiAgICAgICAgICAgICAgICBmb3IgKGNvbnN0IGtleSBpbiBzdWJzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgdGVzdCA9IHN1YnNba2V5XTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoIXcuJCQodGVzdC5pZCkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGVzdC52aWV3LmRlc3RydWN0b3IoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZGVsZXRlIHN1YnNba2V5XTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9O1xyXG4gICAgdy5leHRlbmQody51aS5sYXlvdXQucHJvdG90eXBlLCBjb25maWcsIHRydWUpO1xyXG4gICAgdy5leHRlbmQody51aS5iYXNlbGF5b3V0LnByb3RvdHlwZSwgY29uZmlnLCB0cnVlKTtcclxuICAgIC8vIHdyYXBwZXIgZm9yIHVzaW5nIEpldCBBcHBzIGFzIHZpZXdzXHJcbiAgICB3LnByb3RvVUkoe1xyXG4gICAgICAgIG5hbWU6IFwiamV0YXBwXCIsXHJcbiAgICAgICAgJGluaXQoY2ZnKSB7XHJcbiAgICAgICAgICAgIHRoaXMuJGFwcCA9IG5ldyB0aGlzLmFwcChjZmcpO1xyXG4gICAgICAgICAgICBjb25zdCBpZCA9IHcudWlkKCkudG9TdHJpbmcoKTtcclxuICAgICAgICAgICAgY2ZnLmJvZHkgPSB7IGlkIH07XHJcbiAgICAgICAgICAgIHRoaXMuJHJlYWR5LnB1c2goZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy4kYXBwLnJlbmRlcih7IGlkIH0pO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgZm9yICh2YXIga2V5IGluIHRoaXMuJGFwcCkge1xyXG4gICAgICAgICAgICAgICAgdmFyIG9yaWdpbiA9IHRoaXMuJGFwcFtrZXldO1xyXG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBvcmlnaW4gPT09IFwiZnVuY3Rpb25cIiAmJiAhdGhpc1trZXldKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpc1trZXldID0gb3JpZ2luLmJpbmQodGhpcy4kYXBwKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH0sIHcudWkucHJveHkpO1xyXG59XG5cbmNsYXNzIEpldEFwcCBleHRlbmRzIEpldEFwcEJhc2Uge1xyXG4gICAgY29uc3RydWN0b3IoY29uZmlnKSB7XHJcbiAgICAgICAgY29uZmlnLnJvdXRlciA9IGNvbmZpZy5yb3V0ZXIgfHwgSGFzaFJvdXRlcjtcclxuICAgICAgICBzdXBlcihjb25maWcpO1xyXG4gICAgICAgIHBhdGNoKHRoaXMud2ViaXgpO1xyXG4gICAgfVxyXG4gICAgX2xvYWRWaWV3RHluYW1pYyh1cmwpIHtcclxuICAgICAgICB1cmwgPSB1cmwucmVwbGFjZSgvXFwuL2csIFwiL1wiKTtcclxuICAgICAgICByZXR1cm4gcmVxdWlyZShcImpldC12aWV3cy9cIiArIHVybCk7XHJcbiAgICB9XHJcbn1cblxuY2xhc3MgU3RvcmVSb3V0ZXIge1xyXG4gICAgY29uc3RydWN0b3IoY2IsIGNvbmZpZywgYXBwKSB7XHJcbiAgICAgICAgdGhpcy5zdG9yYWdlID0gY29uZmlnLnN0b3JhZ2UgfHwgYXBwLndlYml4LnN0b3JhZ2Uuc2Vzc2lvbjtcclxuICAgICAgICB0aGlzLm5hbWUgPSAoY29uZmlnLnN0b3JlTmFtZSB8fCBjb25maWcuaWQgKyBcIjpyb3V0ZVwiKTtcclxuICAgICAgICB0aGlzLmNiID0gY2I7XHJcbiAgICB9XHJcbiAgICBzZXQocGF0aCwgY29uZmlnKSB7XHJcbiAgICAgICAgdGhpcy5zdG9yYWdlLnB1dCh0aGlzLm5hbWUsIHBhdGgpO1xyXG4gICAgICAgIGlmICghY29uZmlnIHx8ICFjb25maWcuc2lsZW50KSB7XHJcbiAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4gdGhpcy5jYihwYXRoKSwgMSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgZ2V0KCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnN0b3JhZ2UuZ2V0KHRoaXMubmFtZSk7XHJcbiAgICB9XHJcbn1cblxuY2xhc3MgVXJsUm91dGVyIGV4dGVuZHMgSGFzaFJvdXRlciB7XHJcbiAgICBfZGV0ZWN0UHJlZml4KCkge1xyXG4gICAgICAgIHRoaXMucHJlZml4ID0gXCJcIjtcclxuICAgICAgICB0aGlzLnN1Zml4ID0gdGhpcy5jb25maWcucm91dGVyUHJlZml4IHx8IFwiXCI7XHJcbiAgICB9XHJcbiAgICBfZ2V0UmF3KCkge1xyXG4gICAgICAgIHJldHVybiBkb2N1bWVudC5sb2NhdGlvbi5wYXRobmFtZSArIChkb2N1bWVudC5sb2NhdGlvbi5zZWFyY2ggfHwgXCJcIik7XHJcbiAgICB9XHJcbn1cblxuY2xhc3MgRW1wdHlSb3V0ZXIge1xyXG4gICAgY29uc3RydWN0b3IoY2IsIF8kY29uZmlnKSB7XHJcbiAgICAgICAgdGhpcy5wYXRoID0gXCJcIjtcclxuICAgICAgICB0aGlzLmNiID0gY2I7XHJcbiAgICB9XHJcbiAgICBzZXQocGF0aCwgY29uZmlnKSB7XHJcbiAgICAgICAgdGhpcy5wYXRoID0gcGF0aDtcclxuICAgICAgICBpZiAoIWNvbmZpZyB8fCAhY29uZmlnLnNpbGVudCkge1xyXG4gICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHRoaXMuY2IocGF0aCksIDEpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGdldCgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5wYXRoO1xyXG4gICAgfVxyXG59XG5cbmZ1bmN0aW9uIFVubG9hZEd1YXJkKGFwcCwgdmlldywgY29uZmlnKSB7XHJcbiAgICB2aWV3Lm9uKGFwcCwgYGFwcDpndWFyZGAsIGZ1bmN0aW9uIChfJHVybCwgcG9pbnQsIHByb21pc2UpIHtcclxuICAgICAgICBpZiAocG9pbnQgPT09IHZpZXcgfHwgcG9pbnQuY29udGFpbnModmlldykpIHtcclxuICAgICAgICAgICAgY29uc3QgcmVzID0gY29uZmlnKCk7XHJcbiAgICAgICAgICAgIGlmIChyZXMgPT09IGZhbHNlKSB7XHJcbiAgICAgICAgICAgICAgICBwcm9taXNlLmNvbmZpcm0gPSBQcm9taXNlLnJlamVjdChuZXcgTmF2aWdhdGlvbkJsb2NrZWQoKSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBwcm9taXNlLmNvbmZpcm0gPSBwcm9taXNlLmNvbmZpcm0udGhlbigoKSA9PiByZXMpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcbn1cblxuLy8gICAgIChjKSAyMDEyLTIwMTggQWlyYm5iLCBJbmMuXG5cbi8vIHZhciBoYXMgPSByZXF1aXJlKCdoYXMnKTtcbmZ1bmN0aW9uIGhhcyhzdG9yZSwga2V5KSB7XG4gIHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoc3RvcmUsIGtleSk7XG59XG4vLyB2YXIgZm9yRWFjaCA9IHJlcXVpcmUoJ2Zvci1lYWNoJyk7XG5mdW5jdGlvbiBmb3JFYWNoKG9iaiwgaGFuZGxlciwgY29udGV4dCkge1xuICBmb3IgKHZhciBrZXkgaW4gb2JqKSB7XG4gICAgaWYgKGhhcyhvYmosIGtleSkpIHtcbiAgICAgIGhhbmRsZXIuY2FsbCgoY29udGV4dCB8fCBvYmopLCBvYmpba2V5XSwga2V5LCBvYmopO1xuICAgIH1cbiAgfVxufVxuLy8gdmFyIHRyaW0gPSByZXF1aXJlKCdzdHJpbmcucHJvdG90eXBlLnRyaW0nKTtcbmZ1bmN0aW9uIHRyaW0oc3RyKSB7XG4gIHJldHVybiBzdHIucmVwbGFjZSgvXltcXHNcXHVGRUZGXFx4QTBdK3xbXFxzXFx1RkVGRlxceEEwXSskL2csICcnKTtcbn1cbi8vIHZhciB3YXJuaW5nID0gcmVxdWlyZSgnd2FybmluZycpO1xuZnVuY3Rpb24gd2FybihtZXNzYWdlKSB7XG4gIG1lc3NhZ2UgPSAnV2FybmluZzogJyArIG1lc3NhZ2U7XG4gIGlmICh0eXBlb2YgY29uc29sZSAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICBjb25zb2xlLmVycm9yKG1lc3NhZ2UpO1xuICB9XG5cbiAgdHJ5IHsgdGhyb3cgbmV3IEVycm9yKG1lc3NhZ2UpOyB9IGNhdGNoICh4KSB7fVxufVxuXG52YXIgcmVwbGFjZSA9IFN0cmluZy5wcm90b3R5cGUucmVwbGFjZTtcbnZhciBzcGxpdCA9IFN0cmluZy5wcm90b3R5cGUuc3BsaXQ7XG5cbi8vICMjIyMgUGx1cmFsaXphdGlvbiBtZXRob2RzXG4vLyBUaGUgc3RyaW5nIHRoYXQgc2VwYXJhdGVzIHRoZSBkaWZmZXJlbnQgcGhyYXNlIHBvc3NpYmlsaXRpZXMuXG52YXIgZGVsaW1pdGVyID0gJ3x8fHwnO1xuXG52YXIgcnVzc2lhblBsdXJhbEdyb3VwcyA9IGZ1bmN0aW9uIChuKSB7XG4gIHZhciBlbmQgPSBuICUgMTA7XG4gIGlmIChuICE9PSAxMSAmJiBlbmQgPT09IDEpIHtcbiAgICByZXR1cm4gMDtcbiAgfVxuICBpZiAoMiA8PSBlbmQgJiYgZW5kIDw9IDQgJiYgIShuID49IDEyICYmIG4gPD0gMTQpKSB7XG4gICAgcmV0dXJuIDE7XG4gIH1cbiAgcmV0dXJuIDI7XG59O1xuXG4vLyBNYXBwaW5nIGZyb20gcGx1cmFsaXphdGlvbiBncm91cCBwbHVyYWwgbG9naWMuXG52YXIgcGx1cmFsVHlwZXMgPSB7XG4gIGFyYWJpYzogZnVuY3Rpb24gKG4pIHtcbiAgICAvLyBodHRwOi8vd3d3LmFyYWJleWVzLm9yZy9QbHVyYWxfRm9ybXNcbiAgICBpZiAobiA8IDMpIHsgcmV0dXJuIG47IH1cbiAgICB2YXIgbGFzdFR3byA9IG4gJSAxMDA7XG4gICAgaWYgKGxhc3RUd28gPj0gMyAmJiBsYXN0VHdvIDw9IDEwKSByZXR1cm4gMztcbiAgICByZXR1cm4gbGFzdFR3byA+PSAxMSA/IDQgOiA1O1xuICB9LFxuICBib3NuaWFuX3NlcmJpYW46IHJ1c3NpYW5QbHVyYWxHcm91cHMsXG4gIGNoaW5lc2U6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIDA7IH0sXG4gIGNyb2F0aWFuOiBydXNzaWFuUGx1cmFsR3JvdXBzLFxuICBmcmVuY2g6IGZ1bmN0aW9uIChuKSB7IHJldHVybiBuID4gMSA/IDEgOiAwOyB9LFxuICBnZXJtYW46IGZ1bmN0aW9uIChuKSB7IHJldHVybiBuICE9PSAxID8gMSA6IDA7IH0sXG4gIHJ1c3NpYW46IHJ1c3NpYW5QbHVyYWxHcm91cHMsXG4gIGxpdGh1YW5pYW46IGZ1bmN0aW9uIChuKSB7XG4gICAgaWYgKG4gJSAxMCA9PT0gMSAmJiBuICUgMTAwICE9PSAxMSkgeyByZXR1cm4gMDsgfVxuICAgIHJldHVybiBuICUgMTAgPj0gMiAmJiBuICUgMTAgPD0gOSAmJiAobiAlIDEwMCA8IDExIHx8IG4gJSAxMDAgPiAxOSkgPyAxIDogMjtcbiAgfSxcbiAgY3plY2g6IGZ1bmN0aW9uIChuKSB7XG4gICAgaWYgKG4gPT09IDEpIHsgcmV0dXJuIDA7IH1cbiAgICByZXR1cm4gKG4gPj0gMiAmJiBuIDw9IDQpID8gMSA6IDI7XG4gIH0sXG4gIHBvbGlzaDogZnVuY3Rpb24gKG4pIHtcbiAgICBpZiAobiA9PT0gMSkgeyByZXR1cm4gMDsgfVxuICAgIHZhciBlbmQgPSBuICUgMTA7XG4gICAgcmV0dXJuIDIgPD0gZW5kICYmIGVuZCA8PSA0ICYmIChuICUgMTAwIDwgMTAgfHwgbiAlIDEwMCA+PSAyMCkgPyAxIDogMjtcbiAgfSxcbiAgaWNlbGFuZGljOiBmdW5jdGlvbiAobikgeyByZXR1cm4gKG4gJSAxMCAhPT0gMSB8fCBuICUgMTAwID09PSAxMSkgPyAxIDogMDsgfSxcbiAgc2xvdmVuaWFuOiBmdW5jdGlvbiAobikge1xuICAgIHZhciBsYXN0VHdvID0gbiAlIDEwMDtcbiAgICBpZiAobGFzdFR3byA9PT0gMSkge1xuICAgICAgcmV0dXJuIDA7XG4gICAgfVxuICAgIGlmIChsYXN0VHdvID09PSAyKSB7XG4gICAgICByZXR1cm4gMTtcbiAgICB9XG4gICAgaWYgKGxhc3RUd28gPT09IDMgfHwgbGFzdFR3byA9PT0gNCkge1xuICAgICAgcmV0dXJuIDI7XG4gICAgfVxuICAgIHJldHVybiAzO1xuICB9XG59O1xuXG5cbi8vIE1hcHBpbmcgZnJvbSBwbHVyYWxpemF0aW9uIGdyb3VwIHRvIGluZGl2aWR1YWwgbGFuZ3VhZ2UgY29kZXMvbG9jYWxlcy5cbi8vIFdpbGwgbG9vayB1cCBiYXNlZCBvbiBleGFjdCBtYXRjaCwgaWYgbm90IGZvdW5kIGFuZCBpdCdzIGEgbG9jYWxlIHdpbGwgcGFyc2UgdGhlIGxvY2FsZVxuLy8gZm9yIGxhbmd1YWdlIGNvZGUsIGFuZCBpZiB0aGF0IGRvZXMgbm90IGV4aXN0IHdpbGwgZGVmYXVsdCB0byAnZW4nXG52YXIgcGx1cmFsVHlwZVRvTGFuZ3VhZ2VzID0ge1xuICBhcmFiaWM6IFsnYXInXSxcbiAgYm9zbmlhbl9zZXJiaWFuOiBbJ2JzLUxhdG4tQkEnLCAnYnMtQ3lybC1CQScsICdzcmwtUlMnLCAnc3ItUlMnXSxcbiAgY2hpbmVzZTogWydpZCcsICdpZC1JRCcsICdqYScsICdrbycsICdrby1LUicsICdsbycsICdtcycsICd0aCcsICd0aC1USCcsICd6aCddLFxuICBjcm9hdGlhbjogWydocicsICdoci1IUiddLFxuICBnZXJtYW46IFsnZmEnLCAnZGEnLCAnZGUnLCAnZW4nLCAnZXMnLCAnZmknLCAnZWwnLCAnaGUnLCAnaGktSU4nLCAnaHUnLCAnaHUtSFUnLCAnaXQnLCAnbmwnLCAnbm8nLCAncHQnLCAnc3YnLCAndHInXSxcbiAgZnJlbmNoOiBbJ2ZyJywgJ3RsJywgJ3B0LWJyJ10sXG4gIHJ1c3NpYW46IFsncnUnLCAncnUtUlUnXSxcbiAgbGl0aHVhbmlhbjogWydsdCddLFxuICBjemVjaDogWydjcycsICdjcy1DWicsICdzayddLFxuICBwb2xpc2g6IFsncGwnXSxcbiAgaWNlbGFuZGljOiBbJ2lzJ10sXG4gIHNsb3ZlbmlhbjogWydzbC1TTCddXG59O1xuXG5mdW5jdGlvbiBsYW5nVG9UeXBlTWFwKG1hcHBpbmcpIHtcbiAgdmFyIHJldCA9IHt9O1xuICBmb3JFYWNoKG1hcHBpbmcsIGZ1bmN0aW9uIChsYW5ncywgdHlwZSkge1xuICAgIGZvckVhY2gobGFuZ3MsIGZ1bmN0aW9uIChsYW5nKSB7XG4gICAgICByZXRbbGFuZ10gPSB0eXBlO1xuICAgIH0pO1xuICB9KTtcbiAgcmV0dXJuIHJldDtcbn1cblxuZnVuY3Rpb24gcGx1cmFsVHlwZU5hbWUobG9jYWxlKSB7XG4gIHZhciBsYW5nVG9QbHVyYWxUeXBlID0gbGFuZ1RvVHlwZU1hcChwbHVyYWxUeXBlVG9MYW5ndWFnZXMpO1xuICByZXR1cm4gbGFuZ1RvUGx1cmFsVHlwZVtsb2NhbGVdXG4gICAgfHwgbGFuZ1RvUGx1cmFsVHlwZVtzcGxpdC5jYWxsKGxvY2FsZSwgLy0vLCAxKVswXV1cbiAgICB8fCBsYW5nVG9QbHVyYWxUeXBlLmVuO1xufVxuXG5mdW5jdGlvbiBwbHVyYWxUeXBlSW5kZXgobG9jYWxlLCBjb3VudCkge1xuICByZXR1cm4gcGx1cmFsVHlwZXNbcGx1cmFsVHlwZU5hbWUobG9jYWxlKV0oY291bnQpO1xufVxuXG5mdW5jdGlvbiBlc2NhcGUodG9rZW4pIHtcbiAgcmV0dXJuIHRva2VuLnJlcGxhY2UoL1suKis/XiR7fSgpfFtcXF1cXFxcXS9nLCAnXFxcXCQmJyk7XG59XG5cbmZ1bmN0aW9uIGNvbnN0cnVjdFRva2VuUmVnZXgob3B0cykge1xuICB2YXIgcHJlZml4ID0gKG9wdHMgJiYgb3B0cy5wcmVmaXgpIHx8ICcleyc7XG4gIHZhciBzdWZmaXggPSAob3B0cyAmJiBvcHRzLnN1ZmZpeCkgfHwgJ30nO1xuXG4gIGlmIChwcmVmaXggPT09IGRlbGltaXRlciB8fCBzdWZmaXggPT09IGRlbGltaXRlcikge1xuICAgIHRocm93IG5ldyBSYW5nZUVycm9yKCdcIicgKyBkZWxpbWl0ZXIgKyAnXCIgdG9rZW4gaXMgcmVzZXJ2ZWQgZm9yIHBsdXJhbGl6YXRpb24nKTtcbiAgfVxuXG4gIHJldHVybiBuZXcgUmVnRXhwKGVzY2FwZShwcmVmaXgpICsgJyguKj8pJyArIGVzY2FwZShzdWZmaXgpLCAnZycpO1xufVxuXG52YXIgZG9sbGFyUmVnZXggPSAvXFwkL2c7XG52YXIgZG9sbGFyQmlsbHNZYWxsID0gJyQkJztcbnZhciBkZWZhdWx0VG9rZW5SZWdleCA9IC8lXFx7KC4qPylcXH0vZztcblxuLy8gIyMjIHRyYW5zZm9ybVBocmFzZShwaHJhc2UsIHN1YnN0aXR1dGlvbnMsIGxvY2FsZSlcbi8vXG4vLyBUYWtlcyBhIHBocmFzZSBzdHJpbmcgYW5kIHRyYW5zZm9ybXMgaXQgYnkgY2hvb3NpbmcgdGhlIGNvcnJlY3Rcbi8vIHBsdXJhbCBmb3JtIGFuZCBpbnRlcnBvbGF0aW5nIGl0LlxuLy9cbi8vICAgICB0cmFuc2Zvcm1QaHJhc2UoJ0hlbGxvLCAle25hbWV9IScsIHtuYW1lOiAnU3Bpa2UnfSk7XG4vLyAgICAgLy8gXCJIZWxsbywgU3Bpa2UhXCJcbi8vXG4vLyBUaGUgY29ycmVjdCBwbHVyYWwgZm9ybSBpcyBzZWxlY3RlZCBpZiBzdWJzdGl0dXRpb25zLnNtYXJ0X2NvdW50XG4vLyBpcyBzZXQuIFlvdSBjYW4gcGFzcyBpbiBhIG51bWJlciBpbnN0ZWFkIG9mIGFuIE9iamVjdCBhcyBgc3Vic3RpdHV0aW9uc2Bcbi8vIGFzIGEgc2hvcnRjdXQgZm9yIGBzbWFydF9jb3VudGAuXG4vL1xuLy8gICAgIHRyYW5zZm9ybVBocmFzZSgnJXtzbWFydF9jb3VudH0gbmV3IG1lc3NhZ2VzIHx8fHwgMSBuZXcgbWVzc2FnZScsIHtzbWFydF9jb3VudDogMX0sICdlbicpO1xuLy8gICAgIC8vIFwiMSBuZXcgbWVzc2FnZVwiXG4vL1xuLy8gICAgIHRyYW5zZm9ybVBocmFzZSgnJXtzbWFydF9jb3VudH0gbmV3IG1lc3NhZ2VzIHx8fHwgMSBuZXcgbWVzc2FnZScsIHtzbWFydF9jb3VudDogMn0sICdlbicpO1xuLy8gICAgIC8vIFwiMiBuZXcgbWVzc2FnZXNcIlxuLy9cbi8vICAgICB0cmFuc2Zvcm1QaHJhc2UoJyV7c21hcnRfY291bnR9IG5ldyBtZXNzYWdlcyB8fHx8IDEgbmV3IG1lc3NhZ2UnLCA1LCAnZW4nKTtcbi8vICAgICAvLyBcIjUgbmV3IG1lc3NhZ2VzXCJcbi8vXG4vLyBZb3Ugc2hvdWxkIHBhc3MgaW4gYSB0aGlyZCBhcmd1bWVudCwgdGhlIGxvY2FsZSwgdG8gc3BlY2lmeSB0aGUgY29ycmVjdCBwbHVyYWwgdHlwZS5cbi8vIEl0IGRlZmF1bHRzIHRvIGAnZW4nYCB3aXRoIDIgcGx1cmFsIGZvcm1zLlxuZnVuY3Rpb24gdHJhbnNmb3JtUGhyYXNlKHBocmFzZSwgc3Vic3RpdHV0aW9ucywgbG9jYWxlLCB0b2tlblJlZ2V4KSB7XG4gIGlmICh0eXBlb2YgcGhyYXNlICE9PSAnc3RyaW5nJykge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ1BvbHlnbG90LnRyYW5zZm9ybVBocmFzZSBleHBlY3RzIGFyZ3VtZW50ICMxIHRvIGJlIHN0cmluZycpO1xuICB9XG5cbiAgaWYgKHN1YnN0aXR1dGlvbnMgPT0gbnVsbCkge1xuICAgIHJldHVybiBwaHJhc2U7XG4gIH1cblxuICB2YXIgcmVzdWx0ID0gcGhyYXNlO1xuICB2YXIgaW50ZXJwb2xhdGlvblJlZ2V4ID0gdG9rZW5SZWdleCB8fCBkZWZhdWx0VG9rZW5SZWdleDtcblxuICAvLyBhbGxvdyBudW1iZXIgYXMgYSBwbHVyYWxpemF0aW9uIHNob3J0Y3V0XG4gIHZhciBvcHRpb25zID0gdHlwZW9mIHN1YnN0aXR1dGlvbnMgPT09ICdudW1iZXInID8geyBzbWFydF9jb3VudDogc3Vic3RpdHV0aW9ucyB9IDogc3Vic3RpdHV0aW9ucztcblxuICAvLyBTZWxlY3QgcGx1cmFsIGZvcm06IGJhc2VkIG9uIGEgcGhyYXNlIHRleHQgdGhhdCBjb250YWlucyBgbmBcbiAgLy8gcGx1cmFsIGZvcm1zIHNlcGFyYXRlZCBieSBgZGVsaW1pdGVyYCwgYSBgbG9jYWxlYCwgYW5kIGEgYHN1YnN0aXR1dGlvbnMuc21hcnRfY291bnRgLFxuICAvLyBjaG9vc2UgdGhlIGNvcnJlY3QgcGx1cmFsIGZvcm0uIFRoaXMgaXMgb25seSBkb25lIGlmIGBjb3VudGAgaXMgc2V0LlxuICBpZiAob3B0aW9ucy5zbWFydF9jb3VudCAhPSBudWxsICYmIHJlc3VsdCkge1xuICAgIHZhciB0ZXh0cyA9IHNwbGl0LmNhbGwocmVzdWx0LCBkZWxpbWl0ZXIpO1xuICAgIHJlc3VsdCA9IHRyaW0odGV4dHNbcGx1cmFsVHlwZUluZGV4KGxvY2FsZSB8fCAnZW4nLCBvcHRpb25zLnNtYXJ0X2NvdW50KV0gfHwgdGV4dHNbMF0pO1xuICB9XG5cbiAgLy8gSW50ZXJwb2xhdGU6IENyZWF0ZXMgYSBgUmVnRXhwYCBvYmplY3QgZm9yIGVhY2ggaW50ZXJwb2xhdGlvbiBwbGFjZWhvbGRlci5cbiAgcmVzdWx0ID0gcmVwbGFjZS5jYWxsKHJlc3VsdCwgaW50ZXJwb2xhdGlvblJlZ2V4LCBmdW5jdGlvbiAoZXhwcmVzc2lvbiwgYXJndW1lbnQpIHtcbiAgICBpZiAoIWhhcyhvcHRpb25zLCBhcmd1bWVudCkgfHwgb3B0aW9uc1thcmd1bWVudF0gPT0gbnVsbCkgeyByZXR1cm4gZXhwcmVzc2lvbjsgfVxuICAgIC8vIEVuc3VyZSByZXBsYWNlbWVudCB2YWx1ZSBpcyBlc2NhcGVkIHRvIHByZXZlbnQgc3BlY2lhbCAkLXByZWZpeGVkIHJlZ2V4IHJlcGxhY2UgdG9rZW5zLlxuICAgIHJldHVybiByZXBsYWNlLmNhbGwob3B0aW9uc1thcmd1bWVudF0sIGRvbGxhclJlZ2V4LCBkb2xsYXJCaWxsc1lhbGwpO1xuICB9KTtcblxuICByZXR1cm4gcmVzdWx0O1xufVxuXG4vLyAjIyMgUG9seWdsb3QgY2xhc3MgY29uc3RydWN0b3JcbmZ1bmN0aW9uIFBvbHlnbG90KG9wdGlvbnMpIHtcbiAgdmFyIG9wdHMgPSBvcHRpb25zIHx8IHt9O1xuICB0aGlzLnBocmFzZXMgPSB7fTtcbiAgdGhpcy5leHRlbmQob3B0cy5waHJhc2VzIHx8IHt9KTtcbiAgdGhpcy5jdXJyZW50TG9jYWxlID0gb3B0cy5sb2NhbGUgfHwgJ2VuJztcbiAgdmFyIGFsbG93TWlzc2luZyA9IG9wdHMuYWxsb3dNaXNzaW5nID8gdHJhbnNmb3JtUGhyYXNlIDogbnVsbDtcbiAgdGhpcy5vbk1pc3NpbmdLZXkgPSB0eXBlb2Ygb3B0cy5vbk1pc3NpbmdLZXkgPT09ICdmdW5jdGlvbicgPyBvcHRzLm9uTWlzc2luZ0tleSA6IGFsbG93TWlzc2luZztcbiAgdGhpcy53YXJuID0gb3B0cy53YXJuIHx8IHdhcm47XG4gIHRoaXMudG9rZW5SZWdleCA9IGNvbnN0cnVjdFRva2VuUmVnZXgob3B0cy5pbnRlcnBvbGF0aW9uKTtcbn1cblxuLy8gIyMjIHBvbHlnbG90LmxvY2FsZShbbG9jYWxlXSlcbi8vXG4vLyBHZXQgb3Igc2V0IGxvY2FsZS4gSW50ZXJuYWxseSwgUG9seWdsb3Qgb25seSB1c2VzIGxvY2FsZSBmb3IgcGx1cmFsaXphdGlvbi5cblBvbHlnbG90LnByb3RvdHlwZS5sb2NhbGUgPSBmdW5jdGlvbiAobmV3TG9jYWxlKSB7XG4gIGlmIChuZXdMb2NhbGUpIHRoaXMuY3VycmVudExvY2FsZSA9IG5ld0xvY2FsZTtcbiAgcmV0dXJuIHRoaXMuY3VycmVudExvY2FsZTtcbn07XG5cbi8vICMjIyBwb2x5Z2xvdC5leHRlbmQocGhyYXNlcylcbi8vXG4vLyBVc2UgYGV4dGVuZGAgdG8gdGVsbCBQb2x5Z2xvdCBob3cgdG8gdHJhbnNsYXRlIGEgZ2l2ZW4ga2V5LlxuLy9cbi8vICAgICBwb2x5Z2xvdC5leHRlbmQoe1xuLy8gICAgICAgXCJoZWxsb1wiOiBcIkhlbGxvXCIsXG4vLyAgICAgICBcImhlbGxvX25hbWVcIjogXCJIZWxsbywgJXtuYW1lfVwiXG4vLyAgICAgfSk7XG4vL1xuLy8gVGhlIGtleSBjYW4gYmUgYW55IHN0cmluZy4gIEZlZWwgZnJlZSB0byBjYWxsIGBleHRlbmRgIG11bHRpcGxlIHRpbWVzO1xuLy8gaXQgd2lsbCBvdmVycmlkZSBhbnkgcGhyYXNlcyB3aXRoIHRoZSBzYW1lIGtleSwgYnV0IGxlYXZlIGV4aXN0aW5nIHBocmFzZXNcbi8vIHVudG91Y2hlZC5cbi8vXG4vLyBJdCBpcyBhbHNvIHBvc3NpYmxlIHRvIHBhc3MgbmVzdGVkIHBocmFzZSBvYmplY3RzLCB3aGljaCBnZXQgZmxhdHRlbmVkXG4vLyBpbnRvIGFuIG9iamVjdCB3aXRoIHRoZSBuZXN0ZWQga2V5cyBjb25jYXRlbmF0ZWQgdXNpbmcgZG90IG5vdGF0aW9uLlxuLy9cbi8vICAgICBwb2x5Z2xvdC5leHRlbmQoe1xuLy8gICAgICAgXCJuYXZcIjoge1xuLy8gICAgICAgICBcImhlbGxvXCI6IFwiSGVsbG9cIixcbi8vICAgICAgICAgXCJoZWxsb19uYW1lXCI6IFwiSGVsbG8sICV7bmFtZX1cIixcbi8vICAgICAgICAgXCJzaWRlYmFyXCI6IHtcbi8vICAgICAgICAgICBcIndlbGNvbWVcIjogXCJXZWxjb21lXCJcbi8vICAgICAgICAgfVxuLy8gICAgICAgfVxuLy8gICAgIH0pO1xuLy9cbi8vICAgICBjb25zb2xlLmxvZyhwb2x5Z2xvdC5waHJhc2VzKTtcbi8vICAgICAvLyB7XG4vLyAgICAgLy8gICAnbmF2LmhlbGxvJzogJ0hlbGxvJyxcbi8vICAgICAvLyAgICduYXYuaGVsbG9fbmFtZSc6ICdIZWxsbywgJXtuYW1lfScsXG4vLyAgICAgLy8gICAnbmF2LnNpZGViYXIud2VsY29tZSc6ICdXZWxjb21lJ1xuLy8gICAgIC8vIH1cbi8vXG4vLyBgZXh0ZW5kYCBhY2NlcHRzIGFuIG9wdGlvbmFsIHNlY29uZCBhcmd1bWVudCwgYHByZWZpeGAsIHdoaWNoIGNhbiBiZSB1c2VkXG4vLyB0byBwcmVmaXggZXZlcnkga2V5IGluIHRoZSBwaHJhc2VzIG9iamVjdCB3aXRoIHNvbWUgc3RyaW5nLCB1c2luZyBkb3Rcbi8vIG5vdGF0aW9uLlxuLy9cbi8vICAgICBwb2x5Z2xvdC5leHRlbmQoe1xuLy8gICAgICAgXCJoZWxsb1wiOiBcIkhlbGxvXCIsXG4vLyAgICAgICBcImhlbGxvX25hbWVcIjogXCJIZWxsbywgJXtuYW1lfVwiXG4vLyAgICAgfSwgXCJuYXZcIik7XG4vL1xuLy8gICAgIGNvbnNvbGUubG9nKHBvbHlnbG90LnBocmFzZXMpO1xuLy8gICAgIC8vIHtcbi8vICAgICAvLyAgICduYXYuaGVsbG8nOiAnSGVsbG8nLFxuLy8gICAgIC8vICAgJ25hdi5oZWxsb19uYW1lJzogJ0hlbGxvLCAle25hbWV9J1xuLy8gICAgIC8vIH1cbi8vXG4vLyBUaGlzIGZlYXR1cmUgaXMgdXNlZCBpbnRlcm5hbGx5IHRvIHN1cHBvcnQgbmVzdGVkIHBocmFzZSBvYmplY3RzLlxuUG9seWdsb3QucHJvdG90eXBlLmV4dGVuZCA9IGZ1bmN0aW9uIChtb3JlUGhyYXNlcywgcHJlZml4KSB7XG4gIGZvckVhY2gobW9yZVBocmFzZXMsIGZ1bmN0aW9uIChwaHJhc2UsIGtleSkge1xuICAgIHZhciBwcmVmaXhlZEtleSA9IHByZWZpeCA/IHByZWZpeCArICcuJyArIGtleSA6IGtleTtcbiAgICBpZiAodHlwZW9mIHBocmFzZSA9PT0gJ29iamVjdCcpIHtcbiAgICAgIHRoaXMuZXh0ZW5kKHBocmFzZSwgcHJlZml4ZWRLZXkpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnBocmFzZXNbcHJlZml4ZWRLZXldID0gcGhyYXNlO1xuICAgIH1cbiAgfSwgdGhpcyk7XG59O1xuXG4vLyAjIyMgcG9seWdsb3QudW5zZXQocGhyYXNlcylcbi8vIFVzZSBgdW5zZXRgIHRvIHNlbGVjdGl2ZWx5IHJlbW92ZSBrZXlzIGZyb20gYSBwb2x5Z2xvdCBpbnN0YW5jZS5cbi8vXG4vLyAgICAgcG9seWdsb3QudW5zZXQoXCJzb21lX2tleVwiKTtcbi8vICAgICBwb2x5Z2xvdC51bnNldCh7XG4vLyAgICAgICBcImhlbGxvXCI6IFwiSGVsbG9cIixcbi8vICAgICAgIFwiaGVsbG9fbmFtZVwiOiBcIkhlbGxvLCAle25hbWV9XCJcbi8vICAgICB9KTtcbi8vXG4vLyBUaGUgdW5zZXQgbWV0aG9kIGNhbiB0YWtlIGVpdGhlciBhIHN0cmluZyAoZm9yIHRoZSBrZXkpLCBvciBhbiBvYmplY3QgaGFzaCB3aXRoXG4vLyB0aGUga2V5cyB0aGF0IHlvdSB3b3VsZCBsaWtlIHRvIHVuc2V0LlxuUG9seWdsb3QucHJvdG90eXBlLnVuc2V0ID0gZnVuY3Rpb24gKG1vcmVQaHJhc2VzLCBwcmVmaXgpIHtcbiAgaWYgKHR5cGVvZiBtb3JlUGhyYXNlcyA9PT0gJ3N0cmluZycpIHtcbiAgICBkZWxldGUgdGhpcy5waHJhc2VzW21vcmVQaHJhc2VzXTtcbiAgfSBlbHNlIHtcbiAgICBmb3JFYWNoKG1vcmVQaHJhc2VzLCBmdW5jdGlvbiAocGhyYXNlLCBrZXkpIHtcbiAgICAgIHZhciBwcmVmaXhlZEtleSA9IHByZWZpeCA/IHByZWZpeCArICcuJyArIGtleSA6IGtleTtcbiAgICAgIGlmICh0eXBlb2YgcGhyYXNlID09PSAnb2JqZWN0Jykge1xuICAgICAgICB0aGlzLnVuc2V0KHBocmFzZSwgcHJlZml4ZWRLZXkpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgZGVsZXRlIHRoaXMucGhyYXNlc1twcmVmaXhlZEtleV07XG4gICAgICB9XG4gICAgfSwgdGhpcyk7XG4gIH1cbn07XG5cbi8vICMjIyBwb2x5Z2xvdC5jbGVhcigpXG4vL1xuLy8gQ2xlYXJzIGFsbCBwaHJhc2VzLiBVc2VmdWwgZm9yIHNwZWNpYWwgY2FzZXMsIHN1Y2ggYXMgZnJlZWluZ1xuLy8gdXAgbWVtb3J5IGlmIHlvdSBoYXZlIGxvdHMgb2YgcGhyYXNlcyBidXQgbm8gbG9uZ2VyIG5lZWQgdG9cbi8vIHBlcmZvcm0gYW55IHRyYW5zbGF0aW9uLiBBbHNvIHVzZWQgaW50ZXJuYWxseSBieSBgcmVwbGFjZWAuXG5Qb2x5Z2xvdC5wcm90b3R5cGUuY2xlYXIgPSBmdW5jdGlvbiAoKSB7XG4gIHRoaXMucGhyYXNlcyA9IHt9O1xufTtcblxuLy8gIyMjIHBvbHlnbG90LnJlcGxhY2UocGhyYXNlcylcbi8vXG4vLyBDb21wbGV0ZWx5IHJlcGxhY2UgdGhlIGV4aXN0aW5nIHBocmFzZXMgd2l0aCBhIG5ldyBzZXQgb2YgcGhyYXNlcy5cbi8vIE5vcm1hbGx5LCBqdXN0IHVzZSBgZXh0ZW5kYCB0byBhZGQgbW9yZSBwaHJhc2VzLCBidXQgdW5kZXIgY2VydGFpblxuLy8gY2lyY3Vtc3RhbmNlcywgeW91IG1heSB3YW50IHRvIG1ha2Ugc3VyZSBubyBvbGQgcGhyYXNlcyBhcmUgbHlpbmcgYXJvdW5kLlxuUG9seWdsb3QucHJvdG90eXBlLnJlcGxhY2UgPSBmdW5jdGlvbiAobmV3UGhyYXNlcykge1xuICB0aGlzLmNsZWFyKCk7XG4gIHRoaXMuZXh0ZW5kKG5ld1BocmFzZXMpO1xufTtcblxuXG4vLyAjIyMgcG9seWdsb3QudChrZXksIG9wdGlvbnMpXG4vL1xuLy8gVGhlIG1vc3QtdXNlZCBtZXRob2QuIFByb3ZpZGUgYSBrZXksIGFuZCBgdGAgd2lsbCByZXR1cm4gdGhlXG4vLyBwaHJhc2UuXG4vL1xuLy8gICAgIHBvbHlnbG90LnQoXCJoZWxsb1wiKTtcbi8vICAgICA9PiBcIkhlbGxvXCJcbi8vXG4vLyBUaGUgcGhyYXNlIHZhbHVlIGlzIHByb3ZpZGVkIGZpcnN0IGJ5IGEgY2FsbCB0byBgcG9seWdsb3QuZXh0ZW5kKClgIG9yXG4vLyBgcG9seWdsb3QucmVwbGFjZSgpYC5cbi8vXG4vLyBQYXNzIGluIGFuIG9iamVjdCBhcyB0aGUgc2Vjb25kIGFyZ3VtZW50IHRvIHBlcmZvcm0gaW50ZXJwb2xhdGlvbi5cbi8vXG4vLyAgICAgcG9seWdsb3QudChcImhlbGxvX25hbWVcIiwge25hbWU6IFwiU3Bpa2VcIn0pO1xuLy8gICAgID0+IFwiSGVsbG8sIFNwaWtlXCJcbi8vXG4vLyBJZiB5b3UgbGlrZSwgeW91IGNhbiBwcm92aWRlIGEgZGVmYXVsdCB2YWx1ZSBpbiBjYXNlIHRoZSBwaHJhc2UgaXMgbWlzc2luZy5cbi8vIFVzZSB0aGUgc3BlY2lhbCBvcHRpb24ga2V5IFwiX1wiIHRvIHNwZWNpZnkgYSBkZWZhdWx0LlxuLy9cbi8vICAgICBwb2x5Z2xvdC50KFwiaV9saWtlX3RvX3dyaXRlX2luX2xhbmd1YWdlXCIsIHtcbi8vICAgICAgIF86IFwiSSBsaWtlIHRvIHdyaXRlIGluICV7bGFuZ3VhZ2V9LlwiLFxuLy8gICAgICAgbGFuZ3VhZ2U6IFwiSmF2YVNjcmlwdFwiXG4vLyAgICAgfSk7XG4vLyAgICAgPT4gXCJJIGxpa2UgdG8gd3JpdGUgaW4gSmF2YVNjcmlwdC5cIlxuLy9cblBvbHlnbG90LnByb3RvdHlwZS50ID0gZnVuY3Rpb24gKGtleSwgb3B0aW9ucykge1xuICB2YXIgcGhyYXNlLCByZXN1bHQ7XG4gIHZhciBvcHRzID0gb3B0aW9ucyA9PSBudWxsID8ge30gOiBvcHRpb25zO1xuICBpZiAodHlwZW9mIHRoaXMucGhyYXNlc1trZXldID09PSAnc3RyaW5nJykge1xuICAgIHBocmFzZSA9IHRoaXMucGhyYXNlc1trZXldO1xuICB9IGVsc2UgaWYgKHR5cGVvZiBvcHRzLl8gPT09ICdzdHJpbmcnKSB7XG4gICAgcGhyYXNlID0gb3B0cy5fO1xuICB9IGVsc2UgaWYgKHRoaXMub25NaXNzaW5nS2V5KSB7XG4gICAgdmFyIG9uTWlzc2luZ0tleSA9IHRoaXMub25NaXNzaW5nS2V5O1xuICAgIHJlc3VsdCA9IG9uTWlzc2luZ0tleShrZXksIG9wdHMsIHRoaXMuY3VycmVudExvY2FsZSwgdGhpcy50b2tlblJlZ2V4KTtcbiAgfSBlbHNlIHtcbiAgICB0aGlzLndhcm4oJ01pc3NpbmcgdHJhbnNsYXRpb24gZm9yIGtleTogXCInICsga2V5ICsgJ1wiJyk7XG4gICAgcmVzdWx0ID0ga2V5O1xuICB9XG4gIGlmICh0eXBlb2YgcGhyYXNlID09PSAnc3RyaW5nJykge1xuICAgIHJlc3VsdCA9IHRyYW5zZm9ybVBocmFzZShwaHJhc2UsIG9wdHMsIHRoaXMuY3VycmVudExvY2FsZSwgdGhpcy50b2tlblJlZ2V4KTtcbiAgfVxuICByZXR1cm4gcmVzdWx0O1xufTtcblxuXG4vLyAjIyMgcG9seWdsb3QuaGFzKGtleSlcbi8vXG4vLyBDaGVjayBpZiBwb2x5Z2xvdCBoYXMgYSB0cmFuc2xhdGlvbiBmb3IgZ2l2ZW4ga2V5XG5Qb2x5Z2xvdC5wcm90b3R5cGUuaGFzID0gZnVuY3Rpb24gKGtleSkge1xuICByZXR1cm4gaGFzKHRoaXMucGhyYXNlcywga2V5KTtcbn07XG5cbi8vIGV4cG9ydCB0cmFuc2Zvcm1QaHJhc2VcblBvbHlnbG90LnRyYW5zZm9ybVBocmFzZSA9IGZ1bmN0aW9uIHRyYW5zZm9ybShwaHJhc2UsIHN1YnN0aXR1dGlvbnMsIGxvY2FsZSkge1xuICByZXR1cm4gdHJhbnNmb3JtUGhyYXNlKHBocmFzZSwgc3Vic3RpdHV0aW9ucywgbG9jYWxlKTtcbn07XG5cbnZhciB3ZWJpeFBvbHlnbG90ID0gUG9seWdsb3Q7XG5cbmZ1bmN0aW9uIExvY2FsZShhcHAsIF92aWV3LCBjb25maWcpIHtcclxuICAgIGNvbmZpZyA9IGNvbmZpZyB8fCB7fTtcclxuICAgIGNvbnN0IHN0b3JhZ2UgPSBjb25maWcuc3RvcmFnZTtcclxuICAgIGxldCBsYW5nID0gc3RvcmFnZSA/IChzdG9yYWdlLmdldChcImxhbmdcIikgfHwgXCJlblwiKSA6IChjb25maWcubGFuZyB8fCBcImVuXCIpO1xyXG4gICAgZnVuY3Rpb24gc2V0TGFuZ0RhdGEobmFtZSwgZGF0YSwgc2lsZW50KSB7XHJcbiAgICAgICAgaWYgKGRhdGEuX19lc01vZHVsZSkge1xyXG4gICAgICAgICAgICBkYXRhID0gZGF0YS5kZWZhdWx0O1xyXG4gICAgICAgIH1cclxuICAgICAgICBjb25zdCBwY29uZmlnID0geyBwaHJhc2VzOiBkYXRhIH07XHJcbiAgICAgICAgaWYgKGNvbmZpZy5wb2x5Z2xvdCkge1xyXG4gICAgICAgICAgICBhcHAud2ViaXguZXh0ZW5kKHBjb25maWcsIGNvbmZpZy5wb2x5Z2xvdCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNvbnN0IHBvbHkgPSBzZXJ2aWNlLnBvbHlnbG90ID0gbmV3IHdlYml4UG9seWdsb3QocGNvbmZpZyk7XHJcbiAgICAgICAgcG9seS5sb2NhbGUobmFtZSk7XHJcbiAgICAgICAgc2VydmljZS5fID0gYXBwLndlYml4LmJpbmQocG9seS50LCBwb2x5KTtcclxuICAgICAgICBsYW5nID0gbmFtZTtcclxuICAgICAgICBpZiAoc3RvcmFnZSkge1xyXG4gICAgICAgICAgICBzdG9yYWdlLnB1dChcImxhbmdcIiwgbGFuZyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChjb25maWcud2ViaXgpIHtcclxuICAgICAgICAgICAgY29uc3QgbG9jTmFtZSA9IGNvbmZpZy53ZWJpeFtuYW1lXTtcclxuICAgICAgICAgICAgaWYgKGxvY05hbWUpIHtcclxuICAgICAgICAgICAgICAgIGFwcC53ZWJpeC5pMThuLnNldExvY2FsZShsb2NOYW1lKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoIXNpbGVudCkge1xyXG4gICAgICAgICAgICByZXR1cm4gYXBwLnJlZnJlc2goKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSgpO1xyXG4gICAgfVxyXG4gICAgZnVuY3Rpb24gZ2V0TGFuZygpIHsgcmV0dXJuIGxhbmc7IH1cclxuICAgIGZ1bmN0aW9uIHNldExhbmcobmFtZSwgc2lsZW50KSB7XHJcbiAgICAgICAgLy8gaWdub3JlIHNldExhbmcgaWYgbG9hZGluZyBieSBwYXRoIGlzIGRpc2FibGVkXHJcbiAgICAgICAgaWYgKGNvbmZpZy5wYXRoID09PSBmYWxzZSkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNvbnN0IHBhdGggPSAoY29uZmlnLnBhdGggPyBjb25maWcucGF0aCArIFwiL1wiIDogXCJcIikgKyBuYW1lO1xyXG4gICAgICAgIGNvbnN0IGRhdGEgPSByZXF1aXJlKFwiamV0LWxvY2FsZXMvXCIgKyBwYXRoKTtcclxuICAgICAgICBzZXRMYW5nRGF0YShuYW1lLCBkYXRhLCBzaWxlbnQpO1xyXG4gICAgfVxyXG4gICAgY29uc3Qgc2VydmljZSA9IHtcclxuICAgICAgICBnZXRMYW5nLCBzZXRMYW5nLCBzZXRMYW5nRGF0YSwgXzogbnVsbCwgcG9seWdsb3Q6IG51bGxcclxuICAgIH07XHJcbiAgICBhcHAuc2V0U2VydmljZShcImxvY2FsZVwiLCBzZXJ2aWNlKTtcclxuICAgIHNldExhbmcobGFuZywgdHJ1ZSk7XHJcbn1cblxuZnVuY3Rpb24gc2hvdyh2aWV3LCBjb25maWcsIHZhbHVlKSB7XHJcbiAgICBpZiAoY29uZmlnLnVybHMpIHtcclxuICAgICAgICB2YWx1ZSA9IGNvbmZpZy51cmxzW3ZhbHVlXSB8fCB2YWx1ZTtcclxuICAgIH1cclxuICAgIGVsc2UgaWYgKGNvbmZpZy5wYXJhbSkge1xyXG4gICAgICAgIHZhbHVlID0geyBbY29uZmlnLnBhcmFtXTogdmFsdWUgfTtcclxuICAgIH1cclxuICAgIHZpZXcuc2hvdyh2YWx1ZSk7XHJcbn1cclxuZnVuY3Rpb24gTWVudShhcHAsIHZpZXcsIGNvbmZpZykge1xyXG4gICAgY29uc3QgZnJhbWUgPSB2aWV3LmdldFN1YlZpZXdJbmZvKCkucGFyZW50O1xyXG4gICAgY29uc3QgdWkgPSB2aWV3LiQkKGNvbmZpZy5pZCB8fCBjb25maWcpO1xyXG4gICAgbGV0IHNpbGVudCA9IGZhbHNlO1xyXG4gICAgdWkuYXR0YWNoRXZlbnQoXCJvbmNoYW5nZVwiLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgaWYgKCFzaWxlbnQpIHtcclxuICAgICAgICAgICAgc2hvdyhmcmFtZSwgY29uZmlnLCB0aGlzLmdldFZhbHVlKCkpO1xyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG4gICAgdWkuYXR0YWNoRXZlbnQoXCJvbmFmdGVyc2VsZWN0XCIsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBpZiAoIXNpbGVudCkge1xyXG4gICAgICAgICAgICBsZXQgaWQgPSBudWxsO1xyXG4gICAgICAgICAgICBpZiAodWkuc2V0VmFsdWUpIHtcclxuICAgICAgICAgICAgICAgIGlkID0gdGhpcy5nZXRWYWx1ZSgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2UgaWYgKHVpLmdldFNlbGVjdGVkSWQpIHtcclxuICAgICAgICAgICAgICAgIGlkID0gdWkuZ2V0U2VsZWN0ZWRJZCgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHNob3coZnJhbWUsIGNvbmZpZywgaWQpO1xyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG4gICAgdmlldy5vbihhcHAsIGBhcHA6cm91dGVgLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgbGV0IG5hbWUgPSBcIlwiO1xyXG4gICAgICAgIGlmIChjb25maWcucGFyYW0pIHtcclxuICAgICAgICAgICAgbmFtZSA9IHZpZXcuZ2V0UGFyYW0oY29uZmlnLnBhcmFtLCB0cnVlKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHNlZ21lbnQgPSBmcmFtZS5nZXRVcmwoKVsxXTtcclxuICAgICAgICAgICAgaWYgKHNlZ21lbnQpIHtcclxuICAgICAgICAgICAgICAgIG5hbWUgPSBzZWdtZW50LnBhZ2U7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKG5hbWUpIHtcclxuICAgICAgICAgICAgc2lsZW50ID0gdHJ1ZTtcclxuICAgICAgICAgICAgaWYgKHVpLnNldFZhbHVlICYmIHVpLmdldFZhbHVlKCkgIT09IG5hbWUpIHtcclxuICAgICAgICAgICAgICAgIHVpLnNldFZhbHVlKG5hbWUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2UgaWYgKHVpLnNlbGVjdCAmJiB1aS5leGlzdHMobmFtZSkgJiYgdWkuZ2V0U2VsZWN0ZWRJZCgpICE9PSBuYW1lKSB7XHJcbiAgICAgICAgICAgICAgICB1aS5zZWxlY3QobmFtZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgc2lsZW50ID0gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcbn1cblxuY29uc3QgYmFzZWljb25zID0ge1xyXG4gICAgZ29vZDogXCJjaGVja1wiLFxyXG4gICAgZXJyb3I6IFwid2FybmluZ1wiLFxyXG4gICAgc2F2aW5nOiBcInJlZnJlc2ggZmEtc3BpblwiXHJcbn07XHJcbmNvbnN0IGJhc2V0ZXh0ID0ge1xyXG4gICAgZ29vZDogXCJPa1wiLFxyXG4gICAgZXJyb3I6IFwiRXJyb3JcIixcclxuICAgIHNhdmluZzogXCJDb25uZWN0aW5nLi4uXCJcclxufTtcclxuZnVuY3Rpb24gU3RhdHVzKGFwcCwgdmlldywgY29uZmlnKSB7XHJcbiAgICBsZXQgc3RhdHVzID0gXCJnb29kXCI7XHJcbiAgICBsZXQgY291bnQgPSAwO1xyXG4gICAgbGV0IGlzZXJyb3IgPSBmYWxzZTtcclxuICAgIGxldCBleHBpcmVEZWxheSA9IGNvbmZpZy5leHBpcmU7XHJcbiAgICBpZiAoIWV4cGlyZURlbGF5ICYmIGV4cGlyZURlbGF5ICE9PSBmYWxzZSkge1xyXG4gICAgICAgIGV4cGlyZURlbGF5ID0gMjAwMDtcclxuICAgIH1cclxuICAgIGNvbnN0IHRleHRzID0gY29uZmlnLnRleHRzIHx8IGJhc2V0ZXh0O1xyXG4gICAgY29uc3QgaWNvbnMgPSBjb25maWcuaWNvbnMgfHwgYmFzZWljb25zO1xyXG4gICAgaWYgKHR5cGVvZiBjb25maWcgPT09IFwic3RyaW5nXCIpIHtcclxuICAgICAgICBjb25maWcgPSB7IHRhcmdldDogY29uZmlnIH07XHJcbiAgICB9XHJcbiAgICBmdW5jdGlvbiByZWZyZXNoKGNvbnRlbnQpIHtcclxuICAgICAgICBjb25zdCBhcmVhID0gdmlldy4kJChjb25maWcudGFyZ2V0KTtcclxuICAgICAgICBpZiAoYXJlYSkge1xyXG4gICAgICAgICAgICBpZiAoIWNvbnRlbnQpIHtcclxuICAgICAgICAgICAgICAgIGNvbnRlbnQgPSBcIjxkaXYgY2xhc3M9J3N0YXR1c19cIiArXHJcbiAgICAgICAgICAgICAgICAgICAgc3RhdHVzICtcclxuICAgICAgICAgICAgICAgICAgICBcIic+PHNwYW4gY2xhc3M9J3dlYml4X2ljb24gZmEtXCIgK1xyXG4gICAgICAgICAgICAgICAgICAgIGljb25zW3N0YXR1c10gKyBcIic+PC9zcGFuPiBcIiArIHRleHRzW3N0YXR1c10gKyBcIjwvZGl2PlwiO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGFyZWEuc2V0SFRNTChjb250ZW50KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBmdW5jdGlvbiBzdWNjZXNzKCkge1xyXG4gICAgICAgIGNvdW50LS07XHJcbiAgICAgICAgc2V0U3RhdHVzKFwiZ29vZFwiKTtcclxuICAgIH1cclxuICAgIGZ1bmN0aW9uIGZhaWwoZXJyKSB7XHJcbiAgICAgICAgY291bnQtLTtcclxuICAgICAgICBzZXRTdGF0dXMoXCJlcnJvclwiLCBlcnIpO1xyXG4gICAgfVxyXG4gICAgZnVuY3Rpb24gc3RhcnQocHJvbWlzZSkge1xyXG4gICAgICAgIGNvdW50Kys7XHJcbiAgICAgICAgc2V0U3RhdHVzKFwic2F2aW5nXCIpO1xyXG4gICAgICAgIGlmIChwcm9taXNlICYmIHByb21pc2UudGhlbikge1xyXG4gICAgICAgICAgICBwcm9taXNlLnRoZW4oc3VjY2VzcywgZmFpbCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgZnVuY3Rpb24gZ2V0U3RhdHVzKCkge1xyXG4gICAgICAgIHJldHVybiBzdGF0dXM7XHJcbiAgICB9XHJcbiAgICBmdW5jdGlvbiBoaWRlU3RhdHVzKCkge1xyXG4gICAgICAgIGlmIChjb3VudCA9PT0gMCkge1xyXG4gICAgICAgICAgICByZWZyZXNoKFwiIFwiKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBmdW5jdGlvbiBzZXRTdGF0dXMobW9kZSwgZXJyKSB7XHJcbiAgICAgICAgaWYgKGNvdW50IDwgMCkge1xyXG4gICAgICAgICAgICBjb3VudCA9IDA7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChtb2RlID09PSBcInNhdmluZ1wiKSB7XHJcbiAgICAgICAgICAgIHN0YXR1cyA9IFwic2F2aW5nXCI7XHJcbiAgICAgICAgICAgIHJlZnJlc2goKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIGlzZXJyb3IgPSAobW9kZSA9PT0gXCJlcnJvclwiKTtcclxuICAgICAgICAgICAgaWYgKGNvdW50ID09PSAwKSB7XHJcbiAgICAgICAgICAgICAgICBzdGF0dXMgPSBpc2Vycm9yID8gXCJlcnJvclwiIDogXCJnb29kXCI7XHJcbiAgICAgICAgICAgICAgICBpZiAoaXNlcnJvcikge1xyXG4gICAgICAgICAgICAgICAgICAgIGFwcC5lcnJvcihcImFwcDplcnJvcjpzZXJ2ZXJcIiwgW2Vyci5yZXNwb25zZVRleHQgfHwgZXJyXSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoZXhwaXJlRGVsYXkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2V0VGltZW91dChoaWRlU3RhdHVzLCBleHBpcmVEZWxheSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgcmVmcmVzaCgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgZnVuY3Rpb24gdHJhY2soZGF0YSkge1xyXG4gICAgICAgIGNvbnN0IGRwID0gYXBwLndlYml4LmRwKGRhdGEpO1xyXG4gICAgICAgIGlmIChkcCkge1xyXG4gICAgICAgICAgICB2aWV3Lm9uKGRwLCBcIm9uQWZ0ZXJEYXRhU2VuZFwiLCBzdGFydCk7XHJcbiAgICAgICAgICAgIHZpZXcub24oZHAsIFwib25BZnRlclNhdmVFcnJvclwiLCAoX2lkLCBfb2JqLCByZXNwb25zZSkgPT4gZmFpbChyZXNwb25zZSkpO1xyXG4gICAgICAgICAgICB2aWV3Lm9uKGRwLCBcIm9uQWZ0ZXJTYXZlXCIsIHN1Y2Nlc3MpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGFwcC5zZXRTZXJ2aWNlKFwic3RhdHVzXCIsIHtcclxuICAgICAgICBnZXRTdGF0dXMsXHJcbiAgICAgICAgc2V0U3RhdHVzLFxyXG4gICAgICAgIHRyYWNrXHJcbiAgICB9KTtcclxuICAgIGlmIChjb25maWcucmVtb3RlKSB7XHJcbiAgICAgICAgdmlldy5vbihhcHAud2ViaXgsIFwib25SZW1vdGVDYWxsXCIsIHN0YXJ0KTtcclxuICAgIH1cclxuICAgIGlmIChjb25maWcuYWpheCkge1xyXG4gICAgICAgIHZpZXcub24oYXBwLndlYml4LCBcIm9uQmVmb3JlQWpheFwiLCAoX21vZGUsIF91cmwsIF9kYXRhLCBfcmVxdWVzdCwgX2hlYWRlcnMsIF9maWxlcywgcHJvbWlzZSkgPT4ge1xyXG4gICAgICAgICAgICBzdGFydChwcm9taXNlKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuICAgIGlmIChjb25maWcuZGF0YSkge1xyXG4gICAgICAgIHRyYWNrKGNvbmZpZy5kYXRhKTtcclxuICAgIH1cclxufVxuXG5mdW5jdGlvbiBUaGVtZShhcHAsIF92aWV3LCBjb25maWcpIHtcclxuICAgIGNvbmZpZyA9IGNvbmZpZyB8fCB7fTtcclxuICAgIGNvbnN0IHN0b3JhZ2UgPSBjb25maWcuc3RvcmFnZTtcclxuICAgIGxldCB0aGVtZSA9IHN0b3JhZ2UgP1xyXG4gICAgICAgIChzdG9yYWdlLmdldChcInRoZW1lXCIpIHx8IFwiZmxhdC1kZWZhdWx0XCIpXHJcbiAgICAgICAgOlxyXG4gICAgICAgICAgICAoY29uZmlnLnRoZW1lIHx8IFwiZmxhdC1kZWZhdWx0XCIpO1xyXG4gICAgY29uc3Qgc2VydmljZSA9IHtcclxuICAgICAgICBnZXRUaGVtZSgpIHsgcmV0dXJuIHRoZW1lOyB9LFxyXG4gICAgICAgIHNldFRoZW1lKG5hbWUsIHNpbGVudCkge1xyXG4gICAgICAgICAgICBjb25zdCBwYXJ0cyA9IG5hbWUuc3BsaXQoXCItXCIpO1xyXG4gICAgICAgICAgICBjb25zdCBsaW5rcyA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKFwibGlua1wiKTtcclxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsaW5rcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgbG5hbWUgPSBsaW5rc1tpXS5nZXRBdHRyaWJ1dGUoXCJ0aXRsZVwiKTtcclxuICAgICAgICAgICAgICAgIGlmIChsbmFtZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChsbmFtZSA9PT0gbmFtZSB8fCBsbmFtZSA9PT0gcGFydHNbMF0pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGlua3NbaV0uZGlzYWJsZWQgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxpbmtzW2ldLmRpc2FibGVkID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgYXBwLndlYml4LnNraW4uc2V0KHBhcnRzWzBdKTtcclxuICAgICAgICAgICAgLy8gcmVtb3ZlIG9sZCBjc3NcclxuICAgICAgICAgICAgYXBwLndlYml4Lmh0bWwucmVtb3ZlQ3NzKGRvY3VtZW50LmJvZHksIFwidGhlbWUtXCIgKyB0aGVtZSk7XHJcbiAgICAgICAgICAgIC8vIGFkZCBuZXcgY3NzXHJcbiAgICAgICAgICAgIGFwcC53ZWJpeC5odG1sLmFkZENzcyhkb2N1bWVudC5ib2R5LCBcInRoZW1lLVwiICsgbmFtZSk7XHJcbiAgICAgICAgICAgIHRoZW1lID0gbmFtZTtcclxuICAgICAgICAgICAgaWYgKHN0b3JhZ2UpIHtcclxuICAgICAgICAgICAgICAgIHN0b3JhZ2UucHV0KFwidGhlbWVcIiwgbmFtZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKCFzaWxlbnQpIHtcclxuICAgICAgICAgICAgICAgIGFwcC5yZWZyZXNoKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9O1xyXG4gICAgYXBwLnNldFNlcnZpY2UoXCJ0aGVtZVwiLCBzZXJ2aWNlKTtcclxuICAgIHNlcnZpY2Uuc2V0VGhlbWUodGhlbWUsIHRydWUpO1xyXG59XG5cbmZ1bmN0aW9uIGNvcHlQYXJhbXMoZGF0YSwgdXJsLCByb3V0ZSkge1xyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCByb3V0ZS5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgIGRhdGFbcm91dGVbaV1dID0gdXJsW2kgKyAxXSA/IHVybFtpICsgMV0ucGFnZSA6IFwiXCI7XHJcbiAgICB9XHJcbn1cclxuZnVuY3Rpb24gVXJsUGFyYW0oYXBwLCB2aWV3LCBjb25maWcpIHtcclxuICAgIGNvbnN0IHJvdXRlID0gY29uZmlnLnJvdXRlIHx8IGNvbmZpZztcclxuICAgIGNvbnN0IGRhdGEgPSB7fTtcclxuICAgIHZpZXcub24oYXBwLCBcImFwcDp1cmxjaGFuZ2VcIiwgZnVuY3Rpb24gKHN1YnZpZXcsIHNlZ21lbnQpIHtcclxuICAgICAgICBpZiAodmlldyA9PT0gc3Vidmlldykge1xyXG4gICAgICAgICAgICBjb3B5UGFyYW1zKGRhdGEsIHNlZ21lbnQuc3VidXJsKCksIHJvdXRlKTtcclxuICAgICAgICAgICAgc2VnbWVudC5zaXplKHJvdXRlLmxlbmd0aCArIDEpO1xyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG4gICAgY29uc3Qgb3MgPSB2aWV3LnNldFBhcmFtO1xyXG4gICAgY29uc3Qgb2cgPSB2aWV3LmdldFBhcmFtO1xyXG4gICAgdmlldy5zZXRQYXJhbSA9IGZ1bmN0aW9uIChuYW1lLCB2YWx1ZSwgc2hvdykge1xyXG4gICAgICAgIGNvbnN0IGluZGV4ID0gcm91dGUuaW5kZXhPZihuYW1lKTtcclxuICAgICAgICBpZiAoaW5kZXggPj0gMCkge1xyXG4gICAgICAgICAgICBkYXRhW25hbWVdID0gdmFsdWU7XHJcbiAgICAgICAgICAgIHRoaXMuX3NlZ21lbnQudXBkYXRlKFwiXCIsIHZhbHVlLCBpbmRleCArIDEpO1xyXG4gICAgICAgICAgICBpZiAoc2hvdykge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHZpZXcuc2hvdyhudWxsKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgcmV0dXJuIG9zLmNhbGwodGhpcywgbmFtZSwgdmFsdWUsIHNob3cpO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcbiAgICB2aWV3LmdldFBhcmFtID0gZnVuY3Rpb24gKGtleSwgbW9kZSkge1xyXG4gICAgICAgIGNvbnN0IHZhbCA9IGRhdGFba2V5XTtcclxuICAgICAgICBpZiAodHlwZW9mIHZhbCAhPT0gXCJ1bmRlZmluZWRcIikge1xyXG4gICAgICAgICAgICByZXR1cm4gdmFsO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gb2cuY2FsbCh0aGlzLCBrZXksIG1vZGUpO1xyXG4gICAgfTtcclxuICAgIGNvcHlQYXJhbXMoZGF0YSwgdmlldy5nZXRVcmwoKSwgcm91dGUpO1xyXG59XG5cbmZ1bmN0aW9uIFVzZXIoYXBwLCBfdmlldywgY29uZmlnKSB7XHJcbiAgICBjb25maWcgPSBjb25maWcgfHwge307XHJcbiAgICBjb25zdCBsb2dpbiA9IGNvbmZpZy5sb2dpbiB8fCBcIi9sb2dpblwiO1xyXG4gICAgY29uc3QgbG9nb3V0ID0gY29uZmlnLmxvZ291dCB8fCBcIi9sb2dvdXRcIjtcclxuICAgIGNvbnN0IGFmdGVyTG9naW4gPSBjb25maWcuYWZ0ZXJMb2dpbiB8fCBhcHAuY29uZmlnLnN0YXJ0O1xyXG4gICAgY29uc3QgYWZ0ZXJMb2dvdXQgPSBjb25maWcuYWZ0ZXJMb2dvdXQgfHwgXCIvbG9naW5cIjtcclxuICAgIGNvbnN0IHBpbmcgPSBjb25maWcucGluZyB8fCA1ICogNjAgKiAxMDAwO1xyXG4gICAgY29uc3QgbW9kZWwgPSBjb25maWcubW9kZWw7XHJcbiAgICBsZXQgdXNlciA9IGNvbmZpZy51c2VyO1xyXG4gICAgY29uc3Qgc2VydmljZSA9IHtcclxuICAgICAgICBnZXRVc2VyKCkge1xyXG4gICAgICAgICAgICByZXR1cm4gdXNlcjtcclxuICAgICAgICB9LFxyXG4gICAgICAgIGdldFN0YXR1cyhzZXJ2ZXIpIHtcclxuICAgICAgICAgICAgaWYgKCFzZXJ2ZXIpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiB1c2VyICE9PSBudWxsO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiBtb2RlbC5zdGF0dXMoKS5jYXRjaCgoKSA9PiBudWxsKS50aGVuKGRhdGEgPT4ge1xyXG4gICAgICAgICAgICAgICAgdXNlciA9IGRhdGE7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgbG9naW4obmFtZSwgcGFzcykge1xyXG4gICAgICAgICAgICByZXR1cm4gbW9kZWwubG9naW4obmFtZSwgcGFzcykudGhlbihkYXRhID0+IHtcclxuICAgICAgICAgICAgICAgIHVzZXIgPSBkYXRhO1xyXG4gICAgICAgICAgICAgICAgaWYgKCFkYXRhKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiQWNjZXNzIGRlbmllZFwiKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGFwcC5jYWxsRXZlbnQoXCJhcHA6dXNlcjpsb2dpblwiLCBbdXNlcl0pO1xyXG4gICAgICAgICAgICAgICAgYXBwLnNob3coYWZ0ZXJMb2dpbik7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgbG9nb3V0KCkge1xyXG4gICAgICAgICAgICB1c2VyID0gbnVsbDtcclxuICAgICAgICAgICAgcmV0dXJuIG1vZGVsLmxvZ291dCgpLnRoZW4ocmVzID0+IHtcclxuICAgICAgICAgICAgICAgIGFwcC5jYWxsRXZlbnQoXCJhcHA6dXNlcjpsb2dvdXRcIiwgW10pO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlcztcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuICAgIGZ1bmN0aW9uIGNhbk5hdmlnYXRlKHVybCwgb2JqKSB7XHJcbiAgICAgICAgaWYgKHVybCA9PT0gbG9nb3V0KSB7XHJcbiAgICAgICAgICAgIHNlcnZpY2UubG9nb3V0KCk7XHJcbiAgICAgICAgICAgIG9iai5yZWRpcmVjdCA9IGFmdGVyTG9nb3V0O1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmICh1cmwgIT09IGxvZ2luICYmICFzZXJ2aWNlLmdldFN0YXR1cygpKSB7XHJcbiAgICAgICAgICAgIG9iai5yZWRpcmVjdCA9IGxvZ2luO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGFwcC5zZXRTZXJ2aWNlKFwidXNlclwiLCBzZXJ2aWNlKTtcclxuICAgIGFwcC5hdHRhY2hFdmVudChgYXBwOmd1YXJkYCwgZnVuY3Rpb24gKHVybCwgXyRyb290LCBvYmopIHtcclxuICAgICAgICBpZiAoY29uZmlnLnB1YmxpYyAmJiBjb25maWcucHVibGljKHVybCkpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0eXBlb2YgdXNlciA9PT0gXCJ1bmRlZmluZWRcIikge1xyXG4gICAgICAgICAgICBvYmouY29uZmlybSA9IHNlcnZpY2UuZ2V0U3RhdHVzKHRydWUpLnRoZW4oKCkgPT4gY2FuTmF2aWdhdGUodXJsLCBvYmopKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGNhbk5hdmlnYXRlKHVybCwgb2JqKTtcclxuICAgIH0pO1xyXG4gICAgaWYgKHBpbmcpIHtcclxuICAgICAgICBzZXRJbnRlcnZhbCgoKSA9PiBzZXJ2aWNlLmdldFN0YXR1cyh0cnVlKSwgcGluZyk7XHJcbiAgICB9XHJcbn1cblxuLypcclxuTUlUIExpY2Vuc2VcclxuQ29weXJpZ2h0IChjKSAyMDE5IFhCIFNvZnR3YXJlXHJcbiovXHJcbmxldCB3ZWJpeCA9IHdpbmRvdy53ZWJpeDtcclxuaWYgKHdlYml4KSB7XHJcbiAgICBwYXRjaCh3ZWJpeCk7XHJcbn1cclxuY29uc3QgcGx1Z2lucyA9IHtcclxuICAgIFVubG9hZEd1YXJkLCBMb2NhbGUsIE1lbnUsIFRoZW1lLCBVc2VyLCBTdGF0dXMsIFVybFBhcmFtXHJcbn07XHJcbmNvbnN0IGVycm9ycyA9IHsgTmF2aWdhdGlvbkJsb2NrZWQgfTtcclxuY29uc3QgdyA9IHdpbmRvdztcclxuaWYgKCF3LlByb21pc2UpIHtcclxuICAgIHcuUHJvbWlzZSA9IHcud2ViaXgucHJvbWlzZTtcclxufVxuXG5leHBvcnQgeyBwbHVnaW5zLCBlcnJvcnMsIEpldEFwcCwgSmV0VmlldywgSGFzaFJvdXRlciwgU3RvcmVSb3V0ZXIsIFVybFJvdXRlciwgRW1wdHlSb3V0ZXIsIFN1YlJvdXRlciB9O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9amV0LmpzLm1hcFxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vbm9kZV9tb2R1bGVzL3dlYml4LWpldC9kaXN0L2VzNi9qZXQuanMiLCJpbXBvcnQgeyBTZXJ2aWNlIH0gZnJvbSBcIi4uL2NvbW1vbi9hcGlcIjtcblxuY29uc3QgQkFTRV9VUkwgPSBcIi96ZXJvYm90L2FkbWluL2FjdG9ycy9oZWFsdGhcIjtcblxuY2xhc3MgSGVhbHRoU2VydmljZSBleHRlbmRzIFNlcnZpY2Uge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICBzdXBlcihCQVNFX1VSTCk7XG4gICAgfVxuXG4gICAgZ2V0RGlza1NwYWNlKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5nZXRDYWxsKFwiZ2V0X2Rpc2tfc3BhY2VcIik7XG4gICAgfVxuXG4gICAgZ2V0SGVhbHRoKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5nZXRDYWxsKFwiaGVhbHRoXCIpO1xuICAgIH1cblxuICAgIGdldElkZW50aXR5KCkge1xuICAgICAgICByZXR1cm4gdGhpcy5nZXRDYWxsKFwiZ2V0X2lkZW50aXR5XCIpO1xuICAgIH1cblxuICAgIGdldE5ldHdvcmtJbmZvKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5nZXRDYWxsKFwibmV0d29ya19pbmZvXCIpO1xuICAgIH1cblxuICAgIGdldEpzeFZlcnNpb24oKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmdldENhbGwoXCJqc3hfdmVyc2lvblwiKTtcbiAgICB9XG5cbiAgICBnZXRSdW5uaW5nUHJvY2Vzc2VzKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5nZXRDYWxsKFwiZ2V0X3J1bm5pbmdfcHJvY2Vzc2VzXCIpO1xuICAgIH1cblxuICAgIGdldFJ1bm5pbmdQb3J0cygpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0Q2FsbChcImdldF9ydW5uaW5nX3BvcnRzXCIpO1xuICAgIH1cbn1cblxuZXhwb3J0IGNvbnN0IGhlYWx0aCA9IG5ldyBIZWFsdGhTZXJ2aWNlKCk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zb3VyY2VzL3NlcnZpY2VzL2hlYWx0aC5qcyIsImNvbnN0IGFqYXggPSB3ZWJpeC5hamF4KCkuaGVhZGVycyh7IFwiQ29udGVudC10eXBlXCI6IFwiYXBwbGljYXRpb24vanNvblwiIH0pO1xuXG5leHBvcnQgY2xhc3MgU2VydmljZSB7XG4gICAgY29uc3RydWN0b3IoYmFzZVVybCkge1xuICAgICAgICB0aGlzLmJhc2VVcmwgPSBiYXNlVXJsO1xuICAgIH1cblxuICAgIGpvaW5VcmwodXJsKSB7XG4gICAgICAgIGlmICh0aGlzLmJhc2VVcmwpIHtcbiAgICAgICAgICAgIHJldHVybiBgJHt0aGlzLmJhc2VVcmx9LyR7dXJsfWA7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHVybDtcbiAgICB9XG5cbiAgICBjYWxsKG1ldGhvZCwgdXJsLCBhcmdzKSB7XG4gICAgICAgIG1ldGhvZCA9IG1ldGhvZC50b0xvd2VyQ2FzZSgpO1xuICAgICAgICB1cmwgPSB0aGlzLmpvaW5VcmwodXJsKTtcblxuICAgICAgICBpZiAoYXJncykge1xuICAgICAgICAgICAgYXJncyA9IHsgYXJnczogYXJncyB9O1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgYXJncyA9IHt9O1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKG1ldGhvZCA9PT0gXCJnZXRcIikge1xuICAgICAgICAgICAgcmV0dXJuIGFqYXguZ2V0KHVybCwgYXJncyk7XG4gICAgICAgIH0gZWxzZSBpZiAobWV0aG9kID09IFwicG9zdFwiKSB7XG4gICAgICAgICAgICByZXR1cm4gYWpheC5wb3N0KHVybCwgYXJncyk7XG4gICAgICAgIH1cblxuICAgICAgICB0aHJvdyBWYWx1ZUVycm9yKGAke21ldGhvZH0gaXMgbm90IHN1cHBvcnRlZGApO1xuICAgIH1cblxuICAgIGdldENhbGwodXJsLCBhcmdzKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmNhbGwoXCJnZXRcIiwgdXJsLCBhcmdzKTtcbiAgICB9XG5cbiAgICBwb3N0Q2FsbCh1cmwsIGFyZ3MpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuY2FsbChcInBvc3RcIiwgdXJsLCBhcmdzKTtcbiAgICB9XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zb3VyY2VzL2NvbW1vbi9hcGkuanMiLCJpbXBvcnQgeyBKZXRWaWV3IH0gZnJvbSBcIndlYml4LWpldFwiO1xuXG5pbXBvcnQgeyBhbnNpVXAgfSBmcm9tIFwiLi4vLi4vY29tbW9uL2NvbG9yc1wiO1xuaW1wb3J0IHsgZGF0ZUZvcm1hdHRlciB9IGZyb20gXCIuLi8uLi9jb21tb24vZm9ybWF0dGVyc1wiO1xuaW1wb3J0IHsgYWxlcnRzIH0gZnJvbSBcIi4uLy4uL3NlcnZpY2VzL2FsZXJ0c1wiO1xuXG5pbXBvcnQgQWxlcnRWaWV3IGZyb20gXCIuL2FsZXJ0XCI7XG5cbmNvbnN0IE1BWF9NU0dfTEVOID0gMTAwO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBBbGVydHNWaWV3IGV4dGVuZHMgSmV0VmlldyB7XG4gICAgY29uZmlnKCkge1xuICAgICAgICBjb25zdCB2aWV3ID0ge1xuICAgICAgICAgICAgcm93czogW1xuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgdmlldzogXCJkYXRhdGFibGVcIixcbiAgICAgICAgICAgICAgICAgICAgaWQ6IFwiYWxlcnRzX3RhYmxlXCIsXG4gICAgICAgICAgICAgICAgICAgIHJlc2l6ZUNvbHVtbjogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgc2VsZWN0OiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICBtdWx0aXNlbGVjdDogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgY3NzOiBcIndlYml4X2hlYWRlcl9ib3JkZXIgd2ViaXhfZGF0YV9ib3JkZXJcIixcbiAgICAgICAgICAgICAgICAgICAgY29sdW1uczogW3tcbiAgICAgICAgICAgICAgICAgICAgICAgIGlkOiBcImluZGV4XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBoZWFkZXI6IFwiI1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgc29ydDogXCJpbnRcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIGF1dG93aWR0aDogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWQ6IFwiYWxlcnRfdHlwZVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgaGVhZGVyOiBcIlR5cGVcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIHNvcnQ6IFwic3RyaW5nXCJcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWQ6IFwiY291bnRcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIGhlYWRlcjogXCJDb3VudFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgc29ydDogXCJpbnRcIlxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZDogXCJzdGF0dXNcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIGhlYWRlcjogXCJTdGF0dXNcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIHNvcnQ6IFwic3RyaW5nXCJcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWQ6IFwibGV2ZWxcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIGhlYWRlcjogXCJMZXZlbFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgc29ydDogXCJpbnRcIlxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZDogXCJjYXRcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIGhlYWRlcjogW1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiQ2F0ZWdvcnlcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRlbnQ6IFwidGV4dEZpbHRlclwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHNvcnQ6IFwic3RyaW5nXCJcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWQ6IFwidGltZV9maXJzdFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgaGVhZGVyOiBcIkZpcnN0IHRpbWVcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIHNvcnQ6IFwiZGF0ZVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgZm9ybWF0OiBkYXRlRm9ybWF0dGVyLFxuICAgICAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDIwMFxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZDogXCJ0aW1lX2xhc3RcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIGhlYWRlcjogXCJMYXN0IHRpbWVcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIHNvcnQ6IFwiZGF0ZVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgZm9ybWF0OiBkYXRlRm9ybWF0dGVyLFxuICAgICAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDIwMFxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZDogXCJtZXNzYWdlXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBoZWFkZXI6IFtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIk1lc3NhZ2VcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRlbnQ6IFwidGV4dEZpbHRlclwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgICAgICAgICBzb3J0OiBcInN0clwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgZmlsbHNwYWNlOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgZm9ybWF0OiBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodmFsdWUubGVuZ3RoID4gTUFYX01TR19MRU4pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWUgPSB2YWx1ZS5zdWJzdHIoMCwgTUFYX01TR19MRU4pICsgJy4uLic7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBhbnNpVXAuYW5zaV90b19odG1sKHZhbHVlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICAgICAgYXV0b0NvbmZpZzogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgLy8gdXJsOntcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgICRwcm94eTp0cnVlLFxuICAgICAgICAgICAgICAgICAgICAvLyAgICAgbG9hZDogZnVuY3Rpb24odmlldywgcGFyYW1zKXtcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgICBsZXQgZGF0YSA9IHdlYml4LmFqYXgoXCIvemVyb2JvdC9hbGVydGEvYWN0b3JzL2FsZXJ0YS9saXN0X2FsZXJ0c1wiKTtcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgICByZXR1cm4gZGF0YTtcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIC8vIH1cbiAgICAgICAgICAgICAgICAgICAgc2NoZW1lOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAkaW5pdDogZnVuY3Rpb24gKG9iaikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9iai5pbmRleCA9IHRoaXMuY291bnQoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgJHN1YnZpZXc6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgIHBvcHVwOiB0cnVlXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgXVxuICAgICAgICB9O1xuXG4gICAgICAgIHJldHVybiB2aWV3O1xuICAgIH1cblxuICAgIGRlbGV0ZUl0ZW0ob2JqZWN0cykge1xuICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XG5cbiAgICAgICAgbGV0IGl0ZW1zID0gW10sXG4gICAgICAgICAgICBpZHMgPSBbXSxcbiAgICAgICAgICAgIGluZGV4ZXMgPSBbXTtcblxuICAgICAgICBmb3IgKGxldCBvYmogb2Ygb2JqZWN0cykge1xuICAgICAgICAgICAgaWRzLnB1c2gob2JqLmlkKTtcbiAgICAgICAgICAgIGxldCBpdGVtID0gc2VsZi50YWJsZS5nZXRJdGVtKG9iai5pZCk7XG4gICAgICAgICAgICBpdGVtcy5wdXNoKGl0ZW0pXG4gICAgICAgICAgICBpbmRleGVzLnB1c2goaXRlbS5pbmRleCk7XG4gICAgICAgIH1cblxuICAgICAgICB3ZWJpeC5jb25maXJtKHtcbiAgICAgICAgICAgIHRpdGxlOiBcIkRlbGV0ZSBhbGVydHNcIixcbiAgICAgICAgICAgIG9rOiBcIlllc1wiLFxuICAgICAgICAgICAgY2FuY2VsOiBcIk5vXCIsXG4gICAgICAgICAgICB0ZXh0OiBgRGVsZXRlIGFsZXJ0IGl0ZW0ocykgb2YgJHtpbmRleGVzLmpvaW4oXCIsIFwiKX1gXG4gICAgICAgIH0pLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgaWRlbnRpZmllcnMgPSBpdGVtcy5tYXAoKGl0ZW0pID0+IGl0ZW0uaWRlbnRpZmllcik7XG4gICAgICAgICAgICBzZWxmLnRhYmxlLnNob3dQcm9ncmVzcyh7XG4gICAgICAgICAgICAgICAgaGlkZTogZmFsc2VcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICBhbGVydHMuZGVsZXRlKGlkZW50aWZpZXIpLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgICAgIHNlbGYudGFibGUucmVtb3ZlKGlkcylcbiAgICAgICAgICAgICAgICBzZWxmLnRhYmxlLnNob3dQcm9ncmVzcyh7XG4gICAgICAgICAgICAgICAgICAgIGhpZGU6IHRydWVcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHZpZXdJdGVtKGlkKSB7XG4gICAgICAgIHRoaXMuYWxlcnRWaWV3LnNob3dGb3IodGhpcy50YWJsZS5nZXRJdGVtKGlkKSk7XG4gICAgfVxuXG4gICAgaW5pdCh2aWV3KSB7XG4gICAgICAgIC8vIHRoaXMudXNlKHBsdWdpbnMuUHJvZ3Jlc3NCYXIsIFwicHJvZ3Jlc3NcIik7XG4gICAgICAgIHZhciBzZWxmID0gdGhpcztcbiAgICAgICAgc2VsZi50YWJsZSA9ICQkKFwiYWxlcnRzX3RhYmxlXCIpO1xuICAgICAgICBzZWxmLmFsZXJ0VmlldyA9IHNlbGYudWkoQWxlcnRWaWV3KTtcblxuICAgICAgICB3ZWJpeC5leHRlbmQoc2VsZi50YWJsZSwgd2ViaXguUHJvZ3Jlc3NCYXIpO1xuICAgICAgICB3ZWJpeC5yZWFkeShmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBzZWxmLnRhYmxlLmNsZWFyQWxsKCk7XG4gICAgICAgICAgICBzZWxmLnRhYmxlLnNob3dQcm9ncmVzcyh7XG4gICAgICAgICAgICAgICAgaGlkZTogZmFsc2VcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgYWxlcnRzLmxpc3QoKS50aGVuKGRhdGEgPT4ge1xuICAgICAgICAgICAgICAgIGxldCBhbGVydHMgPSBkYXRhLmpzb24oKS5hbGVydHM7XG4gICAgICAgICAgICAgICAgc2VsZi50YWJsZS5wYXJzZShhbGVydHMpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHdlYml4LnVpKHtcbiAgICAgICAgICAgIHZpZXc6IFwiY29udGV4dG1lbnVcIixcbiAgICAgICAgICAgIGlkOiBcImFsZXJ0c19jbVwiLFxuICAgICAgICAgICAgZGF0YTogW1wiVmlld1wiLCBcIkRlbGV0ZVwiXVxuICAgICAgICB9KS5hdHRhY2hUbyhzZWxmLnRhYmxlKTtcblxuXG4gICAgICAgIHNlbGYudGFibGUuYXR0YWNoRXZlbnQoXCJvbkl0ZW1EYmxDbGlja1wiLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBzZWxmLnZpZXdJdGVtKHNlbGYudGFibGUuZ2V0U2VsZWN0ZWRJZCgpKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgJCQoXCJhbGVydHNfY21cIikuYXR0YWNoRXZlbnQoXCJvbk1lbnVJdGVtQ2xpY2tcIiwgZnVuY3Rpb24gKGlkKSB7XG4gICAgICAgICAgICBpZiAoaWQgPT0gXCJEZWxldGVcIikge1xuICAgICAgICAgICAgICAgIHNlbGYuZGVsZXRlSXRlbShzZWxmLnRhYmxlLmdldFNlbGVjdGVkSWQodHJ1ZSkpO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChpZCA9PSBcIlZpZXdcIikge1xuICAgICAgICAgICAgICAgIHNlbGYudmlld0l0ZW0oc2VsZi50YWJsZS5nZXRTZWxlY3RlZElkKCkpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zb3VyY2VzL3ZpZXdzL2FsZXJ0cy9pbmRleC5qcyIsImV4cG9ydCBjb25zdCBkYXRlRm9ybWF0ID0gXCIlWS0lbS0lZCAlRzolaTolc1wiO1xuXG5leHBvcnQgY29uc3Qgd2ViaXhEYXRlRm9ybWF0dGVyID0gd2ViaXguRGF0ZS5kYXRlVG9TdHIoZGF0ZUZvcm1hdCk7XG5cbmV4cG9ydCBjb25zdCBkYXRlRm9ybWF0dGVyID0gZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgLy8gZm9ybWF0IGVwb2NoIHRpbWVzdGFtcHNcbiAgICBpZiAodmFsdWUgaW5zdGFuY2VvZiBTdHJpbmcpIHtcbiAgICAgICAgdmFsdWUgPSBwYXJzZUludCh2YWx1ZSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHdlYml4RGF0ZUZvcm1hdHRlcihuZXcgRGF0ZSh2YWx1ZSAqIDEwMDApKTtcbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NvdXJjZXMvY29tbW9uL2Zvcm1hdHRlcnMuanMiLCJpbXBvcnQgeyBKZXRWaWV3IH0gZnJvbSBcIndlYml4LWpldFwiO1xuaW1wb3J0IHsgaGVhbHRoIH0gZnJvbSBcIi4uLy4uL3NlcnZpY2VzL2hlYWx0aFwiO1xuaW1wb3J0IHsgcGFja2FnZXMgfSBmcm9tIFwiLi4vLi4vc2VydmljZXMvcGFja2FnZXNcIjtcblxuY29uc3QgQ09ERV9VUkwgPSBcIi9jb2Rlc2VydmVyLz9mb2xkZXI9L3NhbmRib3gvY29kZVwiO1xuY29uc3QgUEFDS0FHRV9QQVRIID0gXCIvc2FuZGJveC9jb2RlL2dpdGh1Yi90aHJlZWZvbGR0ZWNoL2p1bXBzY2FsZVhfdGhyZWVib3QvVGhyZWVCb3RQYWNrYWdlcy96ZXJvYm90L2NvZGVzZXJ2ZXJcIlxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDb2Rlc2VydmVyVmlldyBleHRlbmRzIEpldFZpZXcge1xuICAgIGNvbmZpZygpIHtcbiAgICAgICAgY29uc3QgaWZyYW1lID0ge1xuICAgICAgICAgICAgdmlldzogXCJpZnJhbWVcIixcbiAgICAgICAgICAgIGlkOiBcImlmcmFtZS1jb2Rlc2VydmVyXCIsXG4gICAgICAgICAgICBvbjoge1xuICAgICAgICAgICAgICAgIG9uQWZ0ZXJMb2FkOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmhpZGVQcm9ncmVzcykge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5oaWRlUHJvZ3Jlc3MoKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB0aGlzLmVuYWJsZSgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcblxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgcm93czogW3tcbiAgICAgICAgICAgICAgICBpZDogXCJpbnN0YWxsLXBhY2thZ2VcIixcbiAgICAgICAgICAgICAgICBjb2xzOiBbXG4gICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRlbXBsYXRlOiBcIjxkaXYgc3R5bGU9J3dpZHRoOmF1dG87dGV4dC1hbGlnbjpjZW50ZXInPjxoMz5Zb3UgbmVlZCB0byBpbnN0YWxsIENvZGVzZXJ2ZXIgcGFja2FnZTxoMy8+PC9kaXY+XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBoZWlnaHQ6IDUwLFxuICAgICAgICAgICAgICAgICAgICAgICAgaWQ6IFwiaW5mby1tZXNzYWdlXCJcbiAgICAgICAgICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmlldzogXCJidXR0b25cIixcbiAgICAgICAgICAgICAgICAgICAgICAgIGlkOiBcImluc3RhbGxfYnRuXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZTogXCJJbnN0YWxsIFBhY2thZ2VcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIGNzczogXCJ3ZWJpeF9wcmltYXJ5XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBpbnB1dFdpZHRoOiAxNDAsXG4gICAgICAgICAgICAgICAgICAgICAgICBoZWlnaHQ6IDUwXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICB9LCBpZnJhbWVdXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBpbnN0YWxsQ29kZXNlcnZlclBhY2thZ2UoKSB7XG4gICAgICAgIHBhY2thZ2VzLmFkZChQQUNLQUdFX1BBVEgpLnRoZW4oKGRhdGEpID0+IHtcbiAgICAgICAgICAgIHdlYml4Lm1lc3NhZ2UoXCJQYWNrYWdlIGluc3RhbGxlZCBzdWNjZXNzZnVsbHlcIik7XG4gICAgICAgIH0pLmZhaWwoKGVycm9yKSA9PiB7XG4gICAgICAgICAgICB3ZWJpeC5tZXNzYWdlKFwiQW4gZXJyb3Igb2NjdXJyZWQgd2hpbGUgdHJ5aW5nIHRvIGluc3RhbGwgdGhlIHBhY2thZ2UhXCIpO1xuICAgICAgICB9KTtcblxuICAgIH1cblxuICAgIGluaXQodmlldykge1xuICAgICAgICB2aWV3LmNvZGVzZXJ2ZXJJZnJhbWUgPSAkJChcImlmcmFtZS1jb2Rlc2VydmVyXCIpO1xuICAgICAgICB2aWV3Lmluc3RhbGxQYWNrYWdlQ29udGFpbmVyID0gJCQoXCJpbnN0YWxsLXBhY2thZ2VcIik7XG5cbiAgICAgICAgd2ViaXguZXh0ZW5kKHZpZXcuY29kZXNlcnZlcklmcmFtZSwgd2ViaXguUHJvZ3Jlc3NCYXIpO1xuXG4gICAgICAgIHZpZXcuY29kZXNlcnZlcklmcmFtZS5kaXNhYmxlKCk7XG4gICAgICAgIHZpZXcuY29kZXNlcnZlcklmcmFtZS5zaG93UHJvZ3Jlc3MoeyB0eXBlOiBcImljb25cIiB9KTtcbiAgICAgICAgdmlldy5jb2Rlc2VydmVySWZyYW1lLmxvYWQoQ09ERV9VUkwpO1xuXG4gICAgICAgICQkKFwiaW5zdGFsbF9idG5cIikuYXR0YWNoRXZlbnQoXCJvbkl0ZW1DbGlja1wiLCB0aGlzLmluc3RhbGxDb2Rlc2VydmVyUGFja2FnZSk7XG5cbiAgICAgICAgaGVhbHRoLmdldEhlYWx0aCgpLnRoZW4oZGF0YSA9PiB7XG4gICAgICAgICAgICBsZXQgY29kZVNlcnZlclN0YXR1cyA9IGRhdGEuanNvbigpLmNvZGVzZXJ2ZXJcbiAgICAgICAgICAgIGlmIChjb2RlU2VydmVyU3RhdHVzID09IFwiT0tcIikge1xuICAgICAgICAgICAgICAgIHZpZXcuY29kZXNlcnZlcklmcmFtZS5zaG93KCk7XG4gICAgICAgICAgICAgICAgdmlldy5pbnN0YWxsUGFja2FnZUNvbnRhaW5lci5oaWRlKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICB2aWV3LmNvZGVzZXJ2ZXJJZnJhbWUuaGlkZSgpO1xuICAgICAgICAgICAgICAgIHZpZXcuaW5zdGFsbFBhY2thZ2VDb250YWluZXIuc2hvdygpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG5cbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NvdXJjZXMvdmlld3MvY29kZXNlcnZlci9pbmRleC5qcyIsImltcG9ydCB7IEpldFZpZXcgfSBmcm9tIFwid2ViaXgtamV0XCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFRvcFZpZXcgZXh0ZW5kcyBKZXRWaWV3IHtcblx0Y29uZmlnKCkge1xuXHRcdHJldHVybiB7XG5cdFx0XHR0eXBlOiBcInNwYWNlXCIsXG5cdFx0XHRyZXNwb25zaXZlOiB0cnVlLFxuXHRcdFx0cm93czogW1xuXHRcdFx0XHR7XG5cdFx0XHRcdFx0Y29sczogW3tcblx0XHRcdFx0XHRcdCRzdWJ2aWV3OiBcImRhc2guanN4SW5mb1wiXG5cdFx0XHRcdFx0fSxcblx0XHRcdFx0XHR7XG5cdFx0XHRcdFx0XHQkc3VidmlldzogXCJkYXNoLmhlYWx0aFwiXG5cdFx0XHRcdFx0fSxcblx0XHRcdFx0XHR7XG5cdFx0XHRcdFx0XHQkc3VidmlldzogXCJkYXNoLmRpc2tTcGFjZVwiXG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdF1cblx0XHRcdFx0fSxcblx0XHRcdFx0e1xuXHRcdFx0XHRcdGNvbHM6IFt7XG5cdFx0XHRcdFx0XHQkc3VidmlldzogXCJkYXNoLnByb2Nlc3Nlc1wiXG5cdFx0XHRcdFx0fSxcblx0XHRcdFx0XHR7ICRzdWJ2aWV3OiBcImRhc2gucnVubmluZ1BvcnRzXCIgfV1cblx0XHRcdFx0fSxcblx0XHRcdF1cblx0XHR9O1xuXHR9XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zb3VyY2VzL3ZpZXdzL2Rhc2gvaW5kZXguanMiLCJpbXBvcnQge1xuICAgIEpldFZpZXdcbn0gZnJvbSBcIndlYml4LWpldFwiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBKdXB5dGVyVmlldyBleHRlbmRzIEpldFZpZXcge1xuICAgIGNvbmZpZygpIHtcbiAgICAgICAgY29uc3QgdmlldyA9IHtcbiAgICAgICAgICAgIHJvd3M6IFt7XG4gICAgICAgICAgICAgICAgdmlldzogXCJ0ZW1wbGF0ZVwiLFxuICAgICAgICAgICAgICAgIHR5cGU6IFwiaGVhZGVyXCIsXG4gICAgICAgICAgICAgICAgdGVtcGxhdGU6IFwiSnVweXRlclwiLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICB2aWV3OiBcInRlbXBsYXRlXCIsXG4gICAgICAgICAgICAgICAgdGVtcGxhdGU6IFwiMm5kIHJvd1wiLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBjb2xzOiBbe1xuICAgICAgICAgICAgICAgICAgICB2aWV3OiBcInRlbXBsYXRlXCIsXG4gICAgICAgICAgICAgICAgICAgIHRlbXBsYXRlOiBcIjFzdCBjb2xcIixcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgdmlldzogXCJ0ZW1wbGF0ZVwiLFxuICAgICAgICAgICAgICAgICAgICB0ZW1wbGF0ZTogXCIybmQgY29sXCIsXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIHJvd3M6IFt7XG4gICAgICAgICAgICAgICAgICAgICAgICB2aWV3OiBcImxpc3RcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIGlkOiBcIm15bGlzdFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgdGVtcGxhdGU6IFwiI2lkIyAtICN0aXRsZSNcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIGRhdGE6IFt7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWQ6IDEsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGl0bGU6IFwiSXRlbSAxXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWQ6IDIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGl0bGU6IFwiSXRlbSAyXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWQ6IDMsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGl0bGU6IFwiSXRlbSAzXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmlldzogXCJidXR0b25cIixcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlOiBcImFkZFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgY2xpY2s6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLiRzY29wZS5hZGRUb0xpc3QoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIF1cbiAgICAgICAgfTtcblxuICAgICAgICByZXR1cm4gdmlldztcbiAgICB9XG5cbiAgICBhZGRUb0xpc3QoKSB7XG4gICAgICAgIHRoaXMubXlsaXN0LmFkZCh7XG4gICAgICAgICAgICBpZDogNSxcbiAgICAgICAgICAgIHRpdGxlOiBcImhhbWFkYVwiXG4gICAgICAgIH0sIDApO1xuICAgIH1cblxuICAgIGluaXQodmlldykge1xuICAgICAgICB0aGlzLm15bGlzdCA9ICQkKFwibXlsaXN0XCIpO1xuICAgIH1cbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NvdXJjZXMvdmlld3MvanVweXRlci9pbmRleC5qcyIsImltcG9ydCB7IEpldFZpZXcgfSBmcm9tIFwid2ViaXgtamV0XCI7XG5cbmltcG9ydCBBcHBMb2dzVmlldyBmcm9tIFwiLi9hcHBMb2dzXCI7XG5pbXBvcnQgeyBsb2dzIH0gZnJvbSBcIi4uLy4uL3NlcnZpY2VzL2xvZ3NcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTG9nc1ZpZXcgZXh0ZW5kcyBKZXRWaWV3IHtcbiAgICBjb25maWcoKSB7XG5cbiAgICAgICAgY29uc3QgdmlldyA9IHtcbiAgICAgICAgICAgIHJvd3M6IFt7XG4gICAgICAgICAgICAgICAgY29sczogW1xuICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICB2aWV3OiBcInRlbXBsYXRlXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICB0eXBlOiBcImhlYWRlclwiLCB0ZW1wbGF0ZTogXCJMb2dzXCIsXG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZpZXc6IFwiY29tYm9cIixcbiAgICAgICAgICAgICAgICAgICAgICAgIGlkOiBcImFwcHNfY29tYm9cIixcbiAgICAgICAgICAgICAgICAgICAgICAgIHBsYWNlaG9sZGVyOiBcIkNob29zZSB5b3VyIGFwcGxpY2F0aW9uXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBvbjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlOiBmdW5jdGlvbiAoYXBwTmFtZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLiRzY29wZS5zaG93Rm9yKGFwcE5hbWUpXG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBBcHBMb2dzVmlld1xuICAgICAgICAgICAgXVxuICAgICAgICB9O1xuXG4gICAgICAgIHJldHVybiB2aWV3O1xuICAgIH1cblxuICAgIGluaXQodmlldykge1xuICAgICAgICB2aWV3LmFwcHNDb21ibyA9ICQkKFwiYXBwc19jb21ib1wiKTtcbiAgICAgICAgbG9ncy5saXN0QXBwcygpLnRoZW4oZGF0YSA9PiB7XG4gICAgICAgICAgICB2aWV3LmFwcHNDb21iby5kZWZpbmUoXCJvcHRpb25zXCIsIGRhdGEuanNvbigpKTtcbiAgICAgICAgICAgIHZpZXcuYXBwc0NvbWJvLnJlbmRlcigpO1xuICAgICAgICB9KTtcblxuICAgIH1cblxuICAgIHVybENoYW5nZSh2aWV3LCB1cmwpIHtcbiAgICAgICAgY29uc3QgYXBwTmFtZSA9IHVybFswXS5wYXJhbXMuYXBwbmFtZSwgbG9nSWQgPSB1cmxbMF0ucGFyYW1zLmxvZ2lkO1xuICAgICAgICBpZiAoYXBwTmFtZSkge1xuICAgICAgICAgICAgdGhpcy5zaG93Rm9yKGFwcE5hbWUsIGxvZ0lkKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHNob3dGb3IoYXBwTmFtZSwgbG9nSWQpIHtcbiAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgICAgICBzZWxmLmFwcExvZ3MgPSAkJChcImFwcGxvZ3NfdGFibGVcIik7XG5cbiAgICAgICAgd2ViaXguZXh0ZW5kKHNlbGYuYXBwTG9ncywgd2ViaXguUHJvZ3Jlc3NCYXIpO1xuICAgICAgICBzZWxmLmFwcExvZ3Muc2hvd1Byb2dyZXNzKHsgaGlkZTogZmFsc2UgfSk7XG5cbiAgICAgICAgbG9ncy5saXN0KGFwcE5hbWUsIGxvZ0lkKS50aGVuKGRhdGEgPT4ge1xuICAgICAgICAgICAgc2VsZi5hcHBMb2dzLmNsZWFyQWxsKClcbiAgICAgICAgICAgIHNlbGYuYXBwTG9ncy5wYXJzZShkYXRhLmpzb24oKVswXSlcbiAgICAgICAgICAgIHNlbGYuYXBwTG9ncy5zaG93UHJvZ3Jlc3MoeyBoaWRlOiB0cnVlIH0pO1xuICAgICAgICB9KTtcbiAgICB9XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zb3VyY2VzL3ZpZXdzL2xvZ3MvaW5kZXguanMiLCJpbXBvcnQgeyBKZXRWaWV3IH0gZnJvbSBcIndlYml4LWpldFwiO1xuXG5pbXBvcnQgeyBkYXRlRm9ybWF0dGVyIH0gZnJvbSBcIi4uLy4uL2NvbW1vbi9mb3JtYXR0ZXJzXCI7XG5pbXBvcnQgeyBteWpvYnMgfSBmcm9tIFwiLi4vLi4vc2VydmljZXMvbXlqb2JzXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEpvYnNWaWV3IGV4dGVuZHMgSmV0VmlldyB7XG4gICAgY29uZmlnKCkge1xuICAgICAgICBjb25zdCB2aWV3ID0ge1xuICAgICAgICAgICAgdmlldzogXCJkYXRhdGFibGVcIixcbiAgICAgICAgICAgIGlkOiBcImpvYnNfdGFibGVcIixcbiAgICAgICAgICAgIHJlc2l6ZUNvbHVtbjogdHJ1ZSxcbiAgICAgICAgICAgIHNlbGVjdDogdHJ1ZSxcbiAgICAgICAgICAgIG11bHRpc2VsZWN0OiB0cnVlLFxuICAgICAgICAgICAgY3NzOiBcIndlYml4X2hlYWRlcl9ib3JkZXIgd2ViaXhfZGF0YV9ib3JkZXJcIixcbiAgICAgICAgICAgIGNvbHVtbnM6IFt7XG4gICAgICAgICAgICAgICAgaWQ6IFwiaW5kZXhcIixcbiAgICAgICAgICAgICAgICBoZWFkZXI6IFwiI1wiLFxuICAgICAgICAgICAgICAgIHNvcnQ6IFwiaW50XCIsXG4gICAgICAgICAgICAgICAgYXV0b3dpZHRoOiB0cnVlLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBpZDogXCJjYXRlZ29yeVwiLFxuICAgICAgICAgICAgICAgIGhlYWRlcjogXCJDYXRlZ29yeVwiLFxuICAgICAgICAgICAgICAgIHNvcnQ6IFwic3RyaW5nXCJcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgaWQ6IFwidGltZV9zdGFydFwiLFxuICAgICAgICAgICAgICAgIGhlYWRlcjogXCJTdGFydCB0aW1lXCIsXG4gICAgICAgICAgICAgICAgc29ydDogXCJkYXRlXCIsXG4gICAgICAgICAgICAgICAgZm9ybWF0OiBkYXRlRm9ybWF0dGVyLFxuICAgICAgICAgICAgICAgIHdpZHRoOiAyMDBcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgaWQ6IFwidGltZV9zdG9wXCIsXG4gICAgICAgICAgICAgICAgaGVhZGVyOiBcIlN0b3AgdGltZVwiLFxuICAgICAgICAgICAgICAgIHNvcnQ6IFwiZGF0ZVwiLFxuICAgICAgICAgICAgICAgIGZvcm1hdDogZGF0ZUZvcm1hdHRlcixcbiAgICAgICAgICAgICAgICB3aWR0aDogMjAwXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGlkOiBcInRpbWVvdXRcIixcbiAgICAgICAgICAgICAgICBoZWFkZXI6IFwiVGltZW91dFwiLFxuICAgICAgICAgICAgICAgIHNvcnQ6IFwiaW50XCJcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgaWQ6IFwiYWN0aW9uX2lkXCIsXG4gICAgICAgICAgICAgICAgaGVhZGVyOiBcIkFjdGlvblwiLFxuICAgICAgICAgICAgICAgIHNvcnQ6IFwic3RyaW5nXCJcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgaWQ6IFwia3dhcmdzXCIsXG4gICAgICAgICAgICAgICAgaGVhZGVyOiBcIkFyZ3VtZW50c1wiLFxuICAgICAgICAgICAgICAgIHNvcnQ6IFwic3RyaW5nXCIsXG4gICAgICAgICAgICAgICAgZm9ybWF0OiBKU09OLnN0cmluZ2lmeVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBpZDogXCJyZXN1bHRcIixcbiAgICAgICAgICAgICAgICBoZWFkZXI6IFtcbiAgICAgICAgICAgICAgICAgICAgXCJSZXN1bHRcIixcbiAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29udGVudDogXCJ0ZXh0RmlsdGVyXCJcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgc29ydDogXCJzdHJpbmdcIixcbiAgICAgICAgICAgICAgICBmb3JtYXQ6IEpTT04uc3RyaW5naWZ5LFxuICAgICAgICAgICAgfV0sXG4gICAgICAgICAgICBzY2hlbWU6IHtcbiAgICAgICAgICAgICAgICAkaW5pdDogZnVuY3Rpb24gKG9iaikge1xuICAgICAgICAgICAgICAgICAgICBvYmouaW5kZXggPSB0aGlzLmNvdW50KCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgfTtcblxuICAgICAgICByZXR1cm4gdmlldztcbiAgICB9XG5cbiAgICBpbml0KHZpZXcpIHtcbiAgICAgICAgbXlqb2JzLmxpc3RKb2JzKCkudGhlbihkYXRhID0+IHtcbiAgICAgICAgICAgIHZpZXcucGFyc2UoZGF0YSk7XG4gICAgICAgIH0pO1xuICAgIH1cbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NvdXJjZXMvdmlld3MvbXlqb2JzL2luZGV4LmpzIiwiaW1wb3J0IHsgSmV0VmlldyB9IGZyb20gXCJ3ZWJpeC1qZXRcIjtcblxuaW1wb3J0IHsgRXJyb3JWaWV3IH0gZnJvbSBcIi4uL2Vycm9ycy9kaWFsb2dcIjtcbmltcG9ydCB7IHBhY2thZ2VzIH0gZnJvbSBcIi4uLy4uL3NlcnZpY2VzL3BhY2thZ2VzXCI7XG5cbmNvbnN0IHBrZ1N0YXR1cyA9IFtcbiAgICB7XG4gICAgICAgIG5hbWU6IFwiSW5pdFwiLFxuICAgICAgICBhY3Rpb25zOiBbXCJkZWxldGVcIl1cbiAgICB9LFxuICAgIHtcbiAgICAgICAgbmFtZTogXCJJbnN0YWxsZWRcIixcbiAgICAgICAgYWN0aW9uczogWydkZWxldGUnLCBcInN0YXJ0XCJdXG4gICAgfSxcbiAgICB7XG4gICAgICAgIG5hbWU6IFwiUnVubmluZ1wiLFxuICAgICAgICBhY3Rpb25zOiBbJ2RlbGV0ZScsIFwic3RvcFwiXVxuICAgIH0sXG4gICAge1xuICAgICAgICBuYW1lOiBcIkhhbHRlZFwiLFxuICAgICAgICBhY3Rpb25zOiBbJ2RlbGV0ZScsIFwic3RhcnRcIiwgXCJkaXNhYmxlXCJdXG4gICAgfSxcbiAgICB7XG4gICAgICAgIG5hbWU6IFwiRGlzYWJsZWRcIixcbiAgICAgICAgYWN0aW9uczogWydkZWxldGUnLCBcImVuYWJsZVwiXVxuICAgIH0sXG4gICAge1xuICAgICAgICBuYW1lOiBcIkVycm9yXCIsXG4gICAgICAgIGFjdGlvbnM6IFtcImRlbGV0ZVwiXVxuICAgIH1cbl1cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUGFja2FnZXNWaWV3IGV4dGVuZHMgSmV0VmlldyB7XG4gICAgY29uZmlnKCkge1xuICAgICAgICBjb25zdCBncmlkID0ge1xuICAgICAgICAgICAgcm93czogW3tcbiAgICAgICAgICAgICAgICAvL0hlYWRlclxuICAgICAgICAgICAgICAgIHZpZXc6IFwidGVtcGxhdGVcIixcbiAgICAgICAgICAgICAgICB0eXBlOiBcImhlYWRlclwiLFxuICAgICAgICAgICAgICAgIHRlbXBsYXRlOiBcIlBhY2thZ2VzXCIsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgeyAvL2FkZGluZyBQYWNrYWdlXG4gICAgICAgICAgICAgICAgY29sczogW3tcbiAgICAgICAgICAgICAgICAgICAgLy9zZWxlY3RvclxuICAgICAgICAgICAgICAgICAgICB2aWV3OiBcInNlbGVjdFwiLFxuICAgICAgICAgICAgICAgICAgICBpZDogJ21ldGhvZF9zZWxlY3RvcicsXG4gICAgICAgICAgICAgICAgICAgIG9wdGlvbnM6IFtcIlBhdGhcIiwgXCJHaXR1cmxcIl0sXG4gICAgICAgICAgICAgICAgICAgIHdpZHRoOiAxMDBcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIC8vdGV4dCBhcmVhXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICB2aWV3OiBcInRleHRcIixcbiAgICAgICAgICAgICAgICAgICAgaWQ6ICdwYWNrYWdlX3BhdGgnLFxuICAgICAgICAgICAgICAgICAgICBpbnB1dEFsaWduOiBcImxlZnRcIixcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIC8vc3VibWl0IGJ1dHRvblxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgdmlldzogXCJidXR0b25cIixcbiAgICAgICAgICAgICAgICAgICAgaWQ6IFwiYWRkX3BhY2thZ2VfYnV0dG9uXCIsXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlOiBcIkFkZCBwYWNrYWdlXCIsXG4gICAgICAgICAgICAgICAgICAgIGF1dG93aWR0aDogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgdHlwZTogXCJcIixcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHsgLy9EYXRhVGFibGVcbiAgICAgICAgICAgICAgICB2aWV3OiBcImRhdGF0YWJsZVwiLFxuICAgICAgICAgICAgICAgIGlkOiBcInBhY2thZ2VzX3RhYmxlXCIsXG4gICAgICAgICAgICAgICAgcmVzaXplQ29sdW1uOiB0cnVlLFxuICAgICAgICAgICAgICAgIHR5cGU6IHtcbiAgICAgICAgICAgICAgICAgICAgaGVpZ2h0OiAyMDAsXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBzY3JvbGw6IFwieHlcIixcbiAgICAgICAgICAgICAgICBhdXRvQ29uZmlnOiB0cnVlLFxuICAgICAgICAgICAgICAgIHZpZXc6IFwiZGF0YXRhYmxlXCIsXG4gICAgICAgICAgICAgICAgc2VsZWN0OiB0cnVlLFxuICAgICAgICAgICAgICAgIGNzczogXCJ3ZWJpeF9oZWFkZXJfYm9yZGVyIHdlYml4X2RhdGFfYm9yZGVyXCIsXG4gICAgICAgICAgICAgICAgb25Db250ZXh0OiB7fSxcbiAgICAgICAgICAgICAgICBjb2x1bW5zOiBbe1xuICAgICAgICAgICAgICAgICAgICBpZDogXCJpbmRleFwiLFxuICAgICAgICAgICAgICAgICAgICBoZWFkZXI6IFwiI1wiLFxuICAgICAgICAgICAgICAgICAgICBzb3J0OiBcImludFwiLFxuICAgICAgICAgICAgICAgICAgICBhdXRvd2lkdGg6IHRydWUsXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIGlkOiBcImF1dGhvclwiLFxuICAgICAgICAgICAgICAgICAgICBoZWFkZXI6IFtcIkF1dGhvclwiLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb250ZW50OiBcInNlbGVjdEZpbHRlclwiXG4gICAgICAgICAgICAgICAgICAgIH1dLFxuICAgICAgICAgICAgICAgICAgICBzb3J0OiBcInN0cmluZ1wiLFxuICAgICAgICAgICAgICAgICAgICB3aWR0aDogMjAwXG4gICAgICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgICAgICBpZDogXCJuYW1lXCIsXG4gICAgICAgICAgICAgICAgICAgIGhlYWRlcjogW1wiTmFtZVwiLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb250ZW50OiBcInRleHRGaWx0ZXJcIlxuICAgICAgICAgICAgICAgICAgICB9XSxcbiAgICAgICAgICAgICAgICAgICAgc29ydDogXCJzdHJpbmdcIixcbiAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDIwMFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBpZDogXCJzdGF0dXNcIixcbiAgICAgICAgICAgICAgICAgICAgaGVhZGVyOiBcIlN0YXR1c1wiLFxuICAgICAgICAgICAgICAgICAgICBzb3J0OiBcInN0cmluZ1wiXG4gICAgICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgICAgICBpZDogXCJwYXRoXCIsXG4gICAgICAgICAgICAgICAgICAgIGhlYWRlcjogXCJQYXRoXCIsXG4gICAgICAgICAgICAgICAgICAgIHNvcnQ6IFwic3RyaW5nXCIsXG4gICAgICAgICAgICAgICAgICAgIHdpZHRoOiA3MDBcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICBzY2hlbWU6IHtcbiAgICAgICAgICAgICAgICAgICAgJGluaXQ6IGZ1bmN0aW9uIChvYmopIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG9iai5pbmRleCA9IHRoaXMuY291bnQoKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIF1cbiAgICAgICAgfTtcbiAgICAgICAgcmV0dXJuIGdyaWQ7XG4gICAgfVxuXG4gICAgc2hvd0Vycm9yKG1lc3NhZ2UpIHtcbiAgICAgICAgdGhpcy5lcnJvclZpZXcuc2hvd0Vycm9yKG1lc3NhZ2UpO1xuICAgIH1cblxuICAgIGhhbmRsZVJlc3VsdChwcm9taXNlLCBjYWxsYmFjaykge1xuICAgICAgICBwcm9taXNlLnRoZW4oKGRhdGEpID0+IHtcbiAgICAgICAgICAgIGlmIChjYWxsYmFjayBpbnN0YW5jZW9mIEZ1bmN0aW9uKSB7XG4gICAgICAgICAgICAgICAgY2FsbGJhY2soZGF0YSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHdlYml4Lm1lc3NhZ2Uoe1xuICAgICAgICAgICAgICAgIHR5cGU6IFwic3VjY2Vzc1wiLFxuICAgICAgICAgICAgICAgIHRleHQ6IFwiVGhlIG9wZXJhdGlvbiBoYXMgYmVlZCBkb25lIHN1Y2Nlc3NmdWxseVwiXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSkuY2F0Y2goZXJyb3IgPT4ge1xuICAgICAgICAgICAgdGhpcy5zaG93RXJyb3IoXCJFcnJvciBoYXMgaGFwcGVuZWQgZHVyaW5nIHRoaXMgb3BlcmF0aW9uOiBcIiArIGVycm9yLnJlc3BvbnNlLCBcIkVycm9yXCIpO1xuICAgICAgICB9KVxuICAgIH1cblxuICAgIGFkZFBhY2thZ2UocGF0aCwgZ2l0VXJsKSB7XG4gICAgICAgIHRoaXMuaGFuZGxlUmVzdWx0KHBhY2thZ2VzLmFkZChwYXRoLCBnaXRVcmwpKTtcbiAgICB9XG5cblxuICAgIGRlbGV0ZVBhY2thZ2UocGFja2FnZU5hbWUsIGVsZW1lbnRJRCkge1xuICAgICAgICB0aGlzLmhhbmRsZVJlc3VsdChwYWNrYWdlcy5kZWxldGUocGFja2FnZU5hbWUpLCAoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLnBhY2thZ2VUYWJsZS5yZW1vdmUoZWxlbWVudElEKVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBzdGFydFBhY2thZ2UocGFja2FnZU5hbWUpIHtcbiAgICAgICAgdGhpcy5oYW5kbGVSZXN1bHQocGFja2FnZXMuc3RhcnQocGFja2FnZU5hbWUpKTtcbiAgICB9XG5cbiAgICBzdG9wUGFja2FnZShwYWNrYWdlTmFtZSkge1xuICAgICAgICB0aGlzLmhhbmRsZVJlc3VsdChwYWNrYWdlcy5zdG9wKHBhY2thZ2VOYW1lKSk7XG5cbiAgICB9XG5cbiAgICBlbmFibGVQYWNrYWdlKHBhY2thZ2VOYW1lKSB7XG4gICAgICAgIHRoaXMuaGFuZGxlUmVzdWx0KHBhY2thZ2VzLmVuYWJsZVBhY2thZ2UocGFja2FnZU5hbWUpKTtcbiAgICB9XG5cbiAgICBkaXNhYmxlUGFja2FnZShwYWNrYWdlTmFtZSkge1xuICAgICAgICB0aGlzLmhhbmRsZVJlc3VsdChwYWNrYWdlcy5kaXNhYmxlKHBhY2thZ2VOYW1lKSk7XG5cbiAgICB9XG5cbiAgICBpbml0KHZpZXcpIHtcbiAgICAgICAgY29uc3Qgc2VsZiA9IHRoaXM7XG5cbiAgICAgICAgc2VsZi5lcnJvclZpZXcgPSB0aGlzLnVpKEVycm9yVmlldyk7XG5cbiAgICAgICAgY29uc3QgbWVudSA9IHdlYml4LnVpKHtcbiAgICAgICAgICAgIHZpZXc6IFwiY29udGV4dG1lbnVcIixcbiAgICAgICAgICAgIGlkOiBcInBhY2thZ2VzX2NtXCJcbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMucGFja2FnZVRhYmxlID0gdGhpcy4kJChcInBhY2thZ2VzX3RhYmxlXCIpO1xuXG5cbiAgICAgICAgZnVuY3Rpb24gY2hlY2tBY3Rpb24oYWN0aW9uLCBzZWxlY3RlZEl0ZW1JZCkge1xuICAgICAgICAgICAgaWYgKHNlbGYucGFja2FnZVRhYmxlLmdldEl0ZW0oc2VsZWN0ZWRJdGVtSWQpKSB7XG4gICAgICAgICAgICAgICAgbGV0IG5hbWUgPSBzZWxmLnBhY2thZ2VUYWJsZS5nZXRJdGVtKHNlbGVjdGVkSXRlbUlkKS5uYW1lXG4gICAgICAgICAgICAgICAgbGV0IGF1dGhvciA9IHNlbGYucGFja2FnZVRhYmxlLmdldEl0ZW0oc2VsZWN0ZWRJdGVtSWQpLmF1dGhvclxuICAgICAgICAgICAgICAgIGxldCBlbGVtZW50SUQgPSBzZWxmLnBhY2thZ2VUYWJsZS5nZXRJdGVtKHNlbGVjdGVkSXRlbUlkKS5pZFxuICAgICAgICAgICAgICAgIGxldCBwYWNrYWdlTmFtZSA9IGF1dGhvciArIFwiLlwiICsgbmFtZVxuICAgICAgICAgICAgICAgIGlmIChhY3Rpb24gPT0gJ2RlbGV0ZScpIHtcbiAgICAgICAgICAgICAgICAgICAgLy9kZWxldGVQYWNrYWdlKHBhY2thZ2VOYW1lKVxuICAgICAgICAgICAgICAgICAgICAvLyBzZWxmLnBhY2thZ2VUYWJsZS5yZW1vdmUoZWxlbWVudElEKVxuICAgICAgICAgICAgICAgICAgICAvL1xuICAgICAgICAgICAgICAgICAgICB3ZWJpeC5jb25maXJtKHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRpdGxlOiBcIkRlbGV0ZSBQYWNrYWdlXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBvazogXCJZZXNcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIHRleHQ6IGBBcmUgeW91IHN1cmUgeW91IHdhbnQgdG8gZGVsZXRlICR7YXV0aG9yfS4ke25hbWV9P2AsXG4gICAgICAgICAgICAgICAgICAgICAgICBjYW5jZWw6IFwiTm9cIixcbiAgICAgICAgICAgICAgICAgICAgfSkudGhlbigoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxmLmRlbGV0ZVBhY2thZ2UocGFja2FnZU5hbWUsIGVsZW1lbnRJRClcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIC8vXG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChhY3Rpb24gPT0gJ3N0YXJ0Jykge1xuICAgICAgICAgICAgICAgICAgICBzZWxmLnN0YXJ0UGFja2FnZShwYWNrYWdlTmFtZSlcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGFjdGlvbiA9PSAnc3RvcCcpIHtcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5zdG9wUGFja2FnZShwYWNrYWdlTmFtZSlcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGFjdGlvbiA9PSAnZGlzYWJsZScpIHtcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5kaXNhYmxlUGFja2FnZShwYWNrYWdlTmFtZSlcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGFjdGlvbiA9PSAnZW5hYmxlJykge1xuICAgICAgICAgICAgICAgICAgICBzZWxmLmVuYWJsZVBhY2thZ2UocGFja2FnZU5hbWUpXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB3ZWJpeC5tZXNzYWdlKFwieW91IGhhdmUgdG8gc2VsZWN0IGEgcGFja2FnZVwiKVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgJCQoXCJhZGRfcGFja2FnZV9idXR0b25cIikuYXR0YWNoRXZlbnQoXCJvbkl0ZW1DbGlja1wiLCBmdW5jdGlvbiAoaWQpIHtcbiAgICAgICAgICAgIGxldCBwYWNha2dlTG9jYXRpb24gPSAkJChcInBhY2thZ2VfcGF0aFwiKS5nZXRWYWx1ZSgpXG4gICAgICAgICAgICBpZiAocGFjYWtnZUxvY2F0aW9uID09IFwiXCIpIHtcbiAgICAgICAgICAgICAgICBhbGVydChcInBsZWFzZSBlbnRlciBwYWNrYWdlIGxvY2F0aW9uXCIpXG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGxldCBwYWNrYWdlTWV0aG9kID0gJCQoXCJtZXRob2Rfc2VsZWN0b3JcIikuZ2V0VmFsdWUoKVxuICAgICAgICAgICAgICAgIGxldCBnaXRVcmwgPSBudWxsO1xuICAgICAgICAgICAgICAgIGxldCBwYXRoID0gbnVsbDtcbiAgICAgICAgICAgICAgICBpZiAocGFja2FnZU1ldGhvZCA9PSBcIkdpdHVybFwiKSB7XG4gICAgICAgICAgICAgICAgICAgIGdpdFVybCA9IHBhY2FrZ2VMb2NhdGlvblxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAocGFja2FnZU1ldGhvZCA9PSBcIlBhdGhcIikge1xuICAgICAgICAgICAgICAgICAgICBwYXRoID0gcGFjYWtnZUxvY2F0aW9uXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgYWxlcnQoXCJzb21ldGhpbmcgd2VudCB3cm9uZyBkdXJpbmcgc2VsZWN0aW5nIHRoZSBwYWNrYWdlIG1ldGhvZFwiKVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBzZWxmLmFkZFBhY2thZ2UocGF0aCwgZ2l0VXJsKVxuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICAkJChcInBhY2thZ2VzX2NtXCIpLmF0dGFjaEV2ZW50KFwib25NZW51SXRlbUNsaWNrXCIsIGZ1bmN0aW9uIChpZCkge1xuICAgICAgICAgICAgY2hlY2tBY3Rpb24oaWQsIHNlbGYucGFja2FnZVRhYmxlLmdldFNlbGVjdGVkSWQoKSk7XG4gICAgICAgIH0pO1xuXG5cbiAgICAgICAgd2ViaXguZXZlbnQoc2VsZi5wYWNrYWdlVGFibGUuJHZpZXcsIFwiY29udGV4dG1lbnVcIiwgZnVuY3Rpb24gKGUgLypNb3VzZUV2ZW50Ki8pIHtcbiAgICAgICAgICAgIHZhciBwb3MgPSBzZWxmLnBhY2thZ2VUYWJsZS5sb2NhdGUoZSk7XG4gICAgICAgICAgICB2YXIgbWVudWRhdGEgPSBbXTtcbiAgICAgICAgICAgIGlmIChwb3MpIHtcbiAgICAgICAgICAgICAgICB2YXIgaXRlbSA9IHNlbGYucGFja2FnZVRhYmxlLmdldEl0ZW0ocG9zLnJvdyk7XG4gICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBwa2dTdGF0dXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHBrZ1N0YXR1c1tpXS5uYW1lID09IGl0ZW0uc3RhdHVzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBtZW51ZGF0YSA9IGFkZEFjdGlvbnMobWVudWRhdGEsIGkpXG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIG1lbnUuY2xlYXJBbGwoKTtcbiAgICAgICAgICAgIG1lbnUucGFyc2UobWVudWRhdGEpO1xuICAgICAgICAgICAgbWVudS5zaG93KGUpO1xuICAgICAgICAgICAgcmV0dXJuIHdlYml4Lmh0bWwucHJldmVudEV2ZW50KGUpO1xuICAgICAgICB9KVxuXG4gICAgICAgIC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG5cblxuICAgICAgICAvLyBIZWxwZXIgZnVuY3Rpb25zXG5cbiAgICAgICAgLy8gTWFwcGluZyB0aGUgZGF0YSB0byB0aGUgcmlnaHQgZm9ybWF0IHRvIGJlIGFibGUgdG8gZGlwbGF5IHRoZSBhY3R1YWwgc3RhdHVzXG4gICAgICAgIGZ1bmN0aW9uIG1hcERhdGEoYWxsaXRlbXMpIHtcbiAgICAgICAgICAgIHJldHVybiBhbGxpdGVtcy5tYXAoaXRlbSA9PiB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICAgICAgXCJuYW1lXCI6IGl0ZW0uc291cmNlLm5hbWUsXG4gICAgICAgICAgICAgICAgICAgIFwiYXV0aG9yXCI6IGl0ZW0uc291cmNlLnRocmVlYm90LFxuICAgICAgICAgICAgICAgICAgICBcInBhdGhcIjogaXRlbS5wYXRoLFxuICAgICAgICAgICAgICAgICAgICBcInN0YXR1c1wiOiBwa2dTdGF0dXNbaXRlbS5zdGF0dXNdLm5hbWVcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIGZ1bmN0aW9uIGFkZEFjdGlvbnMobWVudWRhdGEsIHBrZ0luZGV4KSB7XG4gICAgICAgICAgICBmb3IgKHZhciBqID0gMDsgaiA8IHBrZ1N0YXR1c1twa2dJbmRleF0uYWN0aW9ucy5sZW5ndGg7IGorKylcbiAgICAgICAgICAgICAgICBtZW51ZGF0YS5wdXNoKHBrZ1N0YXR1c1twa2dJbmRleF0uYWN0aW9uc1tqXSk7XG4gICAgICAgICAgICByZXR1cm4gbWVudWRhdGFcblxuICAgICAgICB9XG5cbiAgICAgICAgcGFja2FnZXMubGlzdCgpLnRoZW4oZGF0YSA9PiB7XG4gICAgICAgICAgICBjb25zdCBhbGxQYWNrYWdlcyA9IGRhdGEuanNvbigpLnBhY2thZ2VzO1xuICAgICAgICAgICAgc2VsZi5wYWNrYWdlVGFibGUucGFyc2UobWFwRGF0YShhbGxQYWNrYWdlcykpO1xuICAgICAgICB9KTtcblxuXG4gICAgfVxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc291cmNlcy92aWV3cy9wYWNrYWdlcy9pbmRleC5qcyIsImltcG9ydCB7IEpldFZpZXcgfSBmcm9tIFwid2ViaXgtamV0XCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFdpa2lzVmlldyBleHRlbmRzIEpldFZpZXcge1xuICAgIGNvbmZpZygpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHZpZXc6IFwiaWZyYW1lXCIsXG4gICAgICAgICAgICBpZDogXCJpZnJhbWUtd2lraXNcIixcbiAgICAgICAgICAgIHNyYzogXCIvd2lraVwiXG4gICAgICAgIH07XG4gICAgfVxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc291cmNlcy92aWV3cy93aWtpcy9pbmRleC5qcyIsImltcG9ydCB7IEpldFZpZXcgfSBmcm9tIFwid2ViaXgtamV0XCI7XG5cbmltcG9ydCB7IGRhdGVGb3JtYXR0ZXIgfSBmcm9tIFwiLi4vLi4vY29tbW9uL2Zvcm1hdHRlcnNcIjtcbmltcG9ydCB7IG15am9icyB9IGZyb20gXCIuLi8uLi9zZXJ2aWNlcy9teWpvYnNcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgSm9ic1ZpZXcgZXh0ZW5kcyBKZXRWaWV3IHtcbiAgICBjb25maWcoKSB7XG4gICAgICAgIGNvbnN0IHZpZXcgPSB7XG4gICAgICAgICAgICB2aWV3OiBcImRhdGF0YWJsZVwiLFxuICAgICAgICAgICAgaWQ6IFwid29ya2Vyc190YWJsZVwiLFxuICAgICAgICAgICAgcmVzaXplQ29sdW1uOiB0cnVlLFxuICAgICAgICAgICAgc2VsZWN0OiB0cnVlLFxuICAgICAgICAgICAgbXVsdGlzZWxlY3Q6IHRydWUsXG4gICAgICAgICAgICBjc3M6IFwid2ViaXhfaGVhZGVyX2JvcmRlciB3ZWJpeF9kYXRhX2JvcmRlclwiLFxuICAgICAgICAgICAgY29sdW1uczogW3tcbiAgICAgICAgICAgICAgICBpZDogXCJpbmRleFwiLFxuICAgICAgICAgICAgICAgIGhlYWRlcjogXCIjXCIsXG4gICAgICAgICAgICAgICAgc29ydDogXCJpbnRcIixcbiAgICAgICAgICAgICAgICBhdXRvd2lkdGg6IHRydWUsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGlkOiBcInN0YXRlXCIsXG4gICAgICAgICAgICAgICAgaGVhZGVyOiBcIlN0YXRlXCIsXG4gICAgICAgICAgICAgICAgc29ydDogXCJzdHJpbmdcIlxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBpZDogXCJoYWx0XCIsXG4gICAgICAgICAgICAgICAgaGVhZGVyOiBcIkhhbHRlZFwiLFxuICAgICAgICAgICAgICAgIHNvcnQ6IFwic3RyaW5nXCIsXG4gICAgICAgICAgICAgICAgZm9ybWF0OiBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHZhbHVlID8gJ1llcycgOiAnTm8nO1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGlkOiBcInBpZFwiLFxuICAgICAgICAgICAgICAgIGhlYWRlcjogXCJQSURcIixcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgaWQ6IFwiY3VycmVudF9qb2JcIixcbiAgICAgICAgICAgICAgICBoZWFkZXI6IFwiQ3VycmVudCBqb2JcIixcbiAgICAgICAgICAgICAgICBmb3JtYXQ6IGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdmFsdWUgPT0gMjE0NzQ4MzY0NyA/ICdOL0EnIDogdmFsdWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBpZDogXCJsYXN0X3VwZGF0ZVwiLFxuICAgICAgICAgICAgICAgIGhlYWRlcjogXCJMYXN0IHVwZGF0ZVwiLFxuICAgICAgICAgICAgICAgIHNvcnQ6IFwiZGF0ZVwiLFxuICAgICAgICAgICAgICAgIGZvcm1hdDogZGF0ZUZvcm1hdHRlcixcbiAgICAgICAgICAgICAgICB3aWR0aDogMjAwXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGlkOiBcInRpbWVfc3RhcnRcIixcbiAgICAgICAgICAgICAgICBoZWFkZXI6IFwiU3RhcnQgdGltZVwiLFxuICAgICAgICAgICAgICAgIHNvcnQ6IFwiZGF0ZVwiLFxuICAgICAgICAgICAgICAgIGZvcm1hdDogZGF0ZUZvcm1hdHRlcixcbiAgICAgICAgICAgICAgICB3aWR0aDogMjAwXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGlkOiBcInRpbWVvdXRcIixcbiAgICAgICAgICAgICAgICBoZWFkZXI6IFwiVGltZW91dFwiLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBpZDogXCJ0eXBlXCIsXG4gICAgICAgICAgICAgICAgaGVhZGVyOiBcIlR5cGVcIixcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgaWQ6IFwiZXJyb3JcIixcbiAgICAgICAgICAgICAgICBoZWFkZXI6IFwiRXJyb3JcIixcbiAgICAgICAgICAgIH1dLFxuICAgICAgICAgICAgYXV0b0NvbmZpZzogdHJ1ZSxcbiAgICAgICAgICAgIHNjaGVtZToge1xuICAgICAgICAgICAgICAgICRpbml0OiBmdW5jdGlvbiAob2JqKSB7XG4gICAgICAgICAgICAgICAgICAgIG9iai5pbmRleCA9IHRoaXMuY291bnQoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICB9O1xuXG4gICAgICAgIHJldHVybiB2aWV3O1xuICAgIH1cblxuICAgIGluaXQodmlldykge1xuICAgICAgICBteWpvYnMubGlzdFdvcmtlcnMoKS50aGVuKGRhdGEgPT4ge1xuICAgICAgICAgICAgdmlldy5wYXJzZShkYXRhKTtcbiAgICAgICAgfSk7XG5cbiAgICB9XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zb3VyY2VzL3ZpZXdzL3dvcmtlcnMvaW5kZXguanMiLCJpbXBvcnQgQW5zaVVwIGZyb20gXCJhbnNpX3VwXCI7XG5cbmV4cG9ydCBjb25zdCBhbnNpVXAgPSBuZXcgQW5zaVVwKCk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zb3VyY2VzL2NvbW1vbi9jb2xvcnMuanMiLCJpbXBvcnQgeyBKZXRWaWV3IH0gZnJvbSBcIndlYml4LWpldFwiO1xuXG5pbXBvcnQgeyBhbnNpVXAgfSBmcm9tIFwiLi4vLi4vY29tbW9uL2NvbG9yc1wiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBBbGVydFZpZXcgZXh0ZW5kcyBKZXRWaWV3IHtcbiAgICBjb25maWcoKSB7XG4gICAgICAgIGNvbnN0IGluZm8gPSB7XG4gICAgICAgICAgICB2aWV3OiBcImZvcm1cIixcbiAgICAgICAgICAgIGlkOiBcImZvcm1cIixcbiAgICAgICAgICAgIGVsZW1lbnRzQ29uZmlnOiB7IGxhYmVsV2lkdGg6IDE0MCB9LFxuICAgICAgICAgICAgZWxlbWVudHM6IFtcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIHZpZXc6IFwidGV4dFwiLFxuICAgICAgICAgICAgICAgICAgICBsYWJlbDogXCJJRFwiLFxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImlkZW50aWZpZXJcIixcbiAgICAgICAgICAgICAgICAgICAgcmVhZG9ubHk6IHRydWVcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgdmlldzogXCJ0ZXh0XCIsXG4gICAgICAgICAgICAgICAgICAgIGxhYmVsOiBcIlR5cGVcIixcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJhbGVydF90eXBlXCIsXG4gICAgICAgICAgICAgICAgICAgIHJlYWRvbmx5OiB0cnVlXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIHZpZXc6IFwidGV4dFwiLFxuICAgICAgICAgICAgICAgICAgICBsYWJlbDogXCJTdGF0dXNcIixcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJzdGF0dXNcIixcbiAgICAgICAgICAgICAgICAgICAgcmVhZG9ubHk6IHRydWVcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgdmlldzogXCJ0ZXh0XCIsXG4gICAgICAgICAgICAgICAgICAgIGxhYmVsOiBcIkxldmVsXCIsXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwibGV2ZWxcIixcbiAgICAgICAgICAgICAgICAgICAgcmVhZG9ubHk6IHRydWVcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgdmlldzogXCJ0ZXh0XCIsXG4gICAgICAgICAgICAgICAgICAgIGxhYmVsOiBcIkNvdW50XCIsXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiY291bnRcIixcbiAgICAgICAgICAgICAgICAgICAgcmVhZG9ubHk6IHRydWVcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgdmlldzogXCJ0ZXh0XCIsXG4gICAgICAgICAgICAgICAgICAgIGxhYmVsOiBcIkNhdGVnb3J5XCIsXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiY2F0XCIsXG4gICAgICAgICAgICAgICAgICAgIHJlYWRvbmx5OiB0cnVlXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIHZpZXc6IFwidGV4dFwiLFxuICAgICAgICAgICAgICAgICAgICBsYWJlbDogXCJGaXJzdCB0aW1lXCIsXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwidGltZV9maXJzdFwiLFxuICAgICAgICAgICAgICAgICAgICByZWFkb25seTogdHJ1ZVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICB2aWV3OiBcInRleHRcIixcbiAgICAgICAgICAgICAgICAgICAgbGFiZWw6IFwiTGFzdCB0aW1lXCIsXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwidGltZV9sYXN0XCIsXG4gICAgICAgICAgICAgICAgICAgIHJlYWRvbmx5OiB0cnVlXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIHZpZXc6IFwidGV4dFwiLFxuICAgICAgICAgICAgICAgICAgICBsYWJlbDogXCJNZXNzYWdlIChwdWIpXCIsXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwicHVibGljXCIsXG4gICAgICAgICAgICAgICAgICAgIHJlYWRvbmx5OiB0cnVlLFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBdXG4gICAgICAgIH07XG5cbiAgICAgICAgY29uc3QgdGFiID0ge1xuICAgICAgICAgICAgdmlldzogXCJ0YWJ2aWV3XCIsXG4gICAgICAgICAgICBjZWxsczogW1xuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgaGVhZGVyOiBcIkluZm9ybWF0aW9uXCIsXG4gICAgICAgICAgICAgICAgICAgIGJvZHk6IGluZm8sXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIGhlYWRlcjogXCJNZXNzYWdlXCIsXG4gICAgICAgICAgICAgICAgICAgIGJvZHk6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlkOiBcIm1lc3NhZ2VcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIHZpZXc6IFwidGVtcGxhdGVcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIHRlbXBsYXRlOiBcIlwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgc2Nyb2xsOiBcImF1dG9cIixcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBoZWFkZXI6IFwiVHJhY2ViYWNrc1wiLFxuICAgICAgICAgICAgICAgICAgICBib2R5OiB7XG4gICAgICAgICAgICAgICAgICAgICAgICByb3dzOiBbXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2aWV3OiBcInRhYmJhclwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZDogXCJ0Yl90YWJzXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG11bHRpdmlldzogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb3B0aW9uczogW11cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmlldzogXCJtdWx0aXZpZXdcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWQ6IFwidGJfdmlld3NcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2VsbHM6IFtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0ZW1wbGF0ZTogXCJcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIGlkOiBcImxvZ3NcIixcbiAgICAgICAgICAgICAgICAgICAgdmlldzogXCJkYXRhdGFibGVcIixcbiAgICAgICAgICAgICAgICAgICAgcmVzaXplQ29sdW1uOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICBzZWxlY3Q6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgIG11bHRpc2VsZWN0OiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICBjc3M6IFwid2ViaXhfaGVhZGVyX2JvcmRlciB3ZWJpeF9kYXRhX2JvcmRlclwiLFxuICAgICAgICAgICAgICAgICAgICBzY3JvbGw6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgIGF1dG9Db25maWc6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgIGNvbHVtbnM6IFtcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZDogXCJpbmRleFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhlYWRlcjogXCIjXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc29ydDogXCJpbnRcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhdXRvd2lkdGg6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDYwXG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlkOiBcInRocmVlYm90X25hbWVcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBoZWFkZXI6IFwiVGhyZWVib3QgTmFtZVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNvcnQ6IFwic3RyaW5nXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDE4MFxuICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZDogXCJhcHBfbmFtZVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhlYWRlcjogXCJBcHAgTmFtZVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNvcnQ6IFwic3RyaW5nXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDE4MFxuICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZDogXCJsYXRlc3RfbG9naWRcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBoZWFkZXI6IFwiTGF0ZXN0IExvZyNcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzb3J0OiBcImludFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdpZHRoOiAxODBcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICAgICAgc2NoZW1lOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAkaW5pdDogZnVuY3Rpb24gKG9iaikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9iai5pbmRleCA9IHRoaXMuY291bnQoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICBdXG4gICAgICAgIH07XG5cbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHZpZXc6IFwid2luZG93XCIsXG4gICAgICAgICAgICBoZWFkOiBcIkFsZXJ0XCIsXG4gICAgICAgICAgICBtb2RhbDogdHJ1ZSxcbiAgICAgICAgICAgIHdpZHRoOiA2MDAsXG4gICAgICAgICAgICBoZWlnaHQ6IDgwMCxcbiAgICAgICAgICAgIHBvc2l0aW9uOiBcImNlbnRlclwiLFxuICAgICAgICAgICAgYm9keToge1xuICAgICAgICAgICAgICAgIHJvd3M6IFtcbiAgICAgICAgICAgICAgICAgICAgdGFiLFxuICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICB2aWV3OiBcImJ1dHRvblwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU6IFwiT0tcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIGNzczogXCJ3ZWJpeF9wcmltYXJ5XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBjbGljazogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZ2V0VG9wUGFyZW50VmlldygpLmhpZGUoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuXG4gICAgaW5pdCgpIHtcbiAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgICAgICB0aGlzLmZvcm0gPSAkJChcImZvcm1cIik7XG4gICAgICAgIHRoaXMubWVzc2FnZSA9ICQkKFwibWVzc2FnZVwiKTtcbiAgICAgICAgdGhpcy5sb2dzID0gJCQoXCJsb2dzXCIpO1xuXG4gICAgICAgIHRoaXMudGJWaWV3cyA9ICQkKFwidGJfdmlld3NcIik7XG4gICAgICAgIHRoaXMudGJUYWJzID0gJCQoXCJ0Yl90YWJzXCIpO1xuXG4gICAgICAgIHRoaXMubG9ncy5hdHRhY2hFdmVudChcIm9uSXRlbURibENsaWNrXCIsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIGxldCBsb2dEYXRhID0gc2VsZi5sb2dzLmdldFNlbGVjdGVkSXRlbSgpXG4gICAgICAgICAgICB0aGlzLiRzY29wZS5zaG93KGAvbWFpbi9sb2dzP2FwcG5hbWU9JHtsb2dEYXRhLmFwcF9uYW1lfSZsb2dpZD0ke2xvZ0RhdGEubGF0ZXN0X2xvZ2lkfWApXG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGFkZFRyYWNlYmFjayh0Yikge1xuICAgICAgICBjb25zdCB0YklkID0gYCR7dGIudGhyZWVib3RfbmFtZX1fJHt0Yi5wcm9jZXNzX2lkfWA7XG4gICAgICAgIGNvbnN0IHRiVGl0bGUgPSBgJHt0Yi50aHJlZWJvdF9uYW1lfSAtIFBJRDogKCR7dGIucHJvY2Vzc19pZH0pYDtcblxuICAgICAgICB0aGlzLnRiVmlld3MuYWRkVmlldyh7XG4gICAgICAgICAgICB2aWV3OiBcInRlbXBsYXRlXCIsXG4gICAgICAgICAgICBpZDogdGJJZCxcbiAgICAgICAgICAgIHNjcm9sbDogXCJ4eVwiLFxuICAgICAgICAgICAgdGVtcGxhdGU6IGA8cD4ke2Fuc2lVcC5hbnNpX3RvX2h0bWwodGIuZm9ybWF0dGVkKX08L3A+YFxuICAgICAgICB9KTtcblxuICAgICAgICB0aGlzLnRiVGFicy5hZGRPcHRpb24odGJJZCwgdGJUaXRsZSwgdHJ1ZSk7XG4gICAgfVxuXG4gICAgY2xlYXJUcmFjZUJhY2tzKCkge1xuICAgICAgICBsZXQgaWQgPSB0aGlzLnRiVGFicy5nZXRWYWx1ZSgpO1xuXG4gICAgICAgIHdoaWxlIChpZCkge1xuICAgICAgICAgICAgdGhpcy50YlRhYnMucmVtb3ZlT3B0aW9uKGlkKTtcbiAgICAgICAgICAgIHRoaXMudGJWaWV3cy5yZW1vdmVWaWV3KGlkKTtcblxuICAgICAgICAgICAgaWQgPSB0aGlzLnRiVGFicy5nZXRWYWx1ZSgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgc2hvd0ZvcihpdGVtKSB7XG4gICAgICAgIHRoaXMuZm9ybS5zZXRWYWx1ZXMoaXRlbSk7XG4gICAgICAgIHRoaXMubWVzc2FnZS5zZXRIVE1MKGA8cD4ke2Fuc2lVcC5hbnNpX3RvX2h0bWwoaXRlbS5tZXNzYWdlKX08L3A+YCk7XG5cbiAgICAgICAgdGhpcy5jbGVhclRyYWNlQmFja3MoKTtcblxuICAgICAgICBmb3IgKGxldCB0YiBvZiBpdGVtLnRyYWNlYmFja3MpIHtcbiAgICAgICAgICAgIHRoaXMuYWRkVHJhY2ViYWNrKHRiKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMubG9ncy5jbGVhckFsbCgpXG4gICAgICAgIHRoaXMubG9ncy5wYXJzZShpdGVtLmxvZ3MpO1xuXG4gICAgICAgIHRoaXMuZ2V0Um9vdCgpLnNob3coKTtcbiAgICB9XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zb3VyY2VzL3ZpZXdzL2FsZXJ0cy9hbGVydC5qcyIsImltcG9ydCB7IEpldFZpZXcgfSBmcm9tIFwid2ViaXgtamV0XCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFByb2Nlc3Nlc0NoaWxkVmlldyBleHRlbmRzIEpldFZpZXcge1xuXG4gICAgY29uZmlnKCkge1xuICAgICAgICBjb25zdCB2aWV3ID0ge1xuICAgICAgICAgICAgdmlldzogXCJkYXRhdGFibGVcIixcbiAgICAgICAgICAgIGlkOiBcInByb2Nlc3NfdGFibGVcIixcbiAgICAgICAgICAgIHJlc2l6ZUNvbHVtbjogdHJ1ZSxcbiAgICAgICAgICAgIHNlbGVjdDogdHJ1ZSxcbiAgICAgICAgICAgIG11bHRpc2VsZWN0OiB0cnVlLFxuICAgICAgICAgICAgY3NzOiBcIndlYml4X2hlYWRlcl9ib3JkZXIgd2ViaXhfZGF0YV9ib3JkZXJcIixcbiAgICAgICAgICAgIHNjcm9sbDogdHJ1ZSxcbiAgICAgICAgICAgIGF1dG9Db25maWc6IHRydWUsXG4gICAgICAgICAgICBjb2x1bW5zOiBbXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBpZDogXCJpbmRleFwiLFxuICAgICAgICAgICAgICAgICAgICBoZWFkZXI6IFwiI1wiLFxuICAgICAgICAgICAgICAgICAgICBzb3J0OiBcImludFwiLFxuICAgICAgICAgICAgICAgICAgICBhdXRvd2lkdGg6IHRydWUsXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIGlkOiBcIm5hbWVcIixcbiAgICAgICAgICAgICAgICAgICAgaGVhZGVyOiBbXG4gICAgICAgICAgICAgICAgICAgICAgICBcIlByb2NjZXNzXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29udGVudDogXCJ0ZXh0RmlsdGVyXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgICAgIHNvcnQ6IFwic3RyaW5nXCIsXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIGlkOiBcInBpZFwiLFxuICAgICAgICAgICAgICAgICAgICBoZWFkZXI6IFwiUElEXCIsXG4gICAgICAgICAgICAgICAgICAgIHNvcnQ6IFwiaW50XCJcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgaWQ6IFwidXNlcm5hbWVcIixcbiAgICAgICAgICAgICAgICAgICAgaGVhZGVyOiBcIlVzZXJuYW1lXCIsXG4gICAgICAgICAgICAgICAgICAgIHNvcnQ6IFwic3RyaW5nXCJcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgaWQ6IFwidm1zXCIsXG4gICAgICAgICAgICAgICAgICAgIGhlYWRlcjogXCJNZW1vcnkgVXNhZ2VcIixcbiAgICAgICAgICAgICAgICAgICAgc29ydDogXCJpbnRcIixcbiAgICAgICAgICAgICAgICAgICAgZm9ybWF0OiBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBNYXRoLmNlaWwodmFsdWUpXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgXSxcbiAgICAgICAgICAgIHNjaGVtZToge1xuICAgICAgICAgICAgICAgICRpbml0OiBmdW5jdGlvbiAob2JqKSB7XG4gICAgICAgICAgICAgICAgICAgIG9iai5pbmRleCA9IHRoaXMuY291bnQoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHZpZXc6IFwid2luZG93XCIsXG4gICAgICAgICAgICBoZWFkOiBcIlJ1bm5pbmcgUHJvY2Vzc2VzLCBNZW1vcnkgdXNhZ2UgaW4gTUJcIixcbiAgICAgICAgICAgIG1vZGFsOiB0cnVlLFxuICAgICAgICAgICAgd2lkdGg6IDU1MCxcbiAgICAgICAgICAgIGhlaWdodDogNjAwLFxuICAgICAgICAgICAgcG9zaXRpb246IFwiY2VudGVyXCIsXG4gICAgICAgICAgICBib2R5OiB7XG4gICAgICAgICAgICAgICAgcm93czogW1xuICAgICAgICAgICAgICAgICAgICB2aWV3LFxuICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICB2aWV3OiBcImJ1dHRvblwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU6IFwiT0tcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIGNzczogXCJ3ZWJpeF9wcmltYXJ5XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBjbGljazogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZ2V0VG9wUGFyZW50VmlldygpLmhpZGUoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgIH1cblxuICAgICAgICB9XG4gICAgfVxuXG4gICAgc2hvd0ZvcihkYXRhKSB7XG4gICAgICAgIHRoaXMudGFibGUucGFyc2UoZGF0YSlcbiAgICAgICAgdGhpcy5nZXRSb290KCkuc2hvdygpO1xuICAgIH1cblxuICAgIGluaXQoKSB7XG4gICAgICAgIHRoaXMudGFibGUgPSAkJChcInByb2Nlc3NfdGFibGVcIik7XG4gICAgfVxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc291cmNlcy92aWV3cy9kYXNoL3Byb2Nlc3Nlc0NoaWxkVmlldy5qcyIsImltcG9ydCB7IEpldFZpZXcgfSBmcm9tIFwid2ViaXgtamV0XCI7XG5cbmltcG9ydCB7IGFuc2lVcCB9IGZyb20gXCIuLi8uLi9jb21tb24vY29sb3JzXCI7XG5cbmV4cG9ydCBjbGFzcyBFcnJvclZpZXcgZXh0ZW5kcyBKZXRWaWV3IHtcbiAgICBjb25maWcoKSB7XG4gICAgICAgIGNvbnN0IG1lc3NhZ2UgPSB7XG4gICAgICAgICAgICB2aWV3OiBcInRlbXBsYXRlXCIsXG4gICAgICAgICAgICBpZDogXCJlcnJvcl90ZW1wbGF0ZVwiLFxuICAgICAgICAgICAgdGVtcGxhdGU6IFwiXCIsXG4gICAgICAgICAgICBzY3JvbGw6IFwieHlcIlxuICAgICAgICB9O1xuXG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICB2aWV3OiBcIndpbmRvd1wiLFxuICAgICAgICAgICAgaGVhZDogXCJFcnJvclwiLFxuICAgICAgICAgICAgbW9kYWw6IHRydWUsXG4gICAgICAgICAgICB3aWR0aDogNTAwLFxuICAgICAgICAgICAgaGVpZ2h0OiA2MDAsXG4gICAgICAgICAgICBwb3NpdGlvbjogXCJjZW50ZXJcIixcbiAgICAgICAgICAgIGJvZHk6IHtcbiAgICAgICAgICAgICAgICByb3dzOiBbXG4gICAgICAgICAgICAgICAgICAgIG1lc3NhZ2UsXG4gICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZpZXc6IFwiYnV0dG9uXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZTogXCJPS1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgY3NzOiBcIndlYml4X3ByaW1hcnlcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIGNsaWNrOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5nZXRUb3BQYXJlbnRWaWV3KCkuaGlkZSgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgaW5pdCgpIHtcbiAgICAgICAgdGhpcy5tZXNzYWdlID0gJCQoXCJlcnJvcl90ZW1wbGF0ZVwiKTtcbiAgICB9XG5cbiAgICBzaG93RXJyb3IobWVzc2FnZSwgaGVhZCkge1xuICAgICAgICB0aGlzLm1lc3NhZ2Uuc2V0SFRNTChgPHA+JHthbnNpVXAuYW5zaV90b19odG1sKG1lc3NhZ2UpfTwvcD5gKTtcbiAgICAgICAgaWYgKGhlYWQpIHtcbiAgICAgICAgICAgIHRoaXMubWVzc2FnZS5nZXRIZWFkKCkuc2V0SFRNTChoZWFkKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuZ2V0Um9vdCgpLnNob3coKTtcbiAgICB9XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zb3VyY2VzL3ZpZXdzL2Vycm9ycy9kaWFsb2cuanMiLCJpbXBvcnQgeyBKZXRWaWV3IH0gZnJvbSBcIndlYml4LWpldFwiO1xuXG5pbXBvcnQgeyBkYXRlRm9ybWF0dGVyIH0gZnJvbSBcIi4uLy4uL2NvbW1vbi9mb3JtYXR0ZXJzXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEFwcExvZ3NWaWV3IGV4dGVuZHMgSmV0VmlldyB7XG4gICAgY29uZmlnKCkge1xuICAgICAgICB2YXIgcGFnZXIgPSB7XG4gICAgICAgICAgICB2aWV3OiBcInBhZ2VyXCIsXG4gICAgICAgICAgICBpZDogXCJwYWdlclwiLFxuICAgICAgICAgICAgc2l6ZTogMTAwLFxuICAgICAgICAgICAgZ3JvdXA6IDIwXG4gICAgICAgIH07XG4gICAgICAgIGNvbnN0IGFwcGxvZ3MgPSB7XG4gICAgICAgICAgICB2aWV3OiBcImRhdGF0YWJsZVwiLFxuICAgICAgICAgICAgaWQ6IFwiYXBwbG9nc190YWJsZVwiLFxuICAgICAgICAgICAgcGFnZXI6IFwicGFnZXJcIixcbiAgICAgICAgICAgIHJlc2l6ZUNvbHVtbjogdHJ1ZSxcbiAgICAgICAgICAgIHNlbGVjdDogdHJ1ZSxcbiAgICAgICAgICAgIG11bHRpc2VsZWN0OiB0cnVlLFxuICAgICAgICAgICAgY3NzOiBcIndlYml4X2hlYWRlcl9ib3JkZXIgd2ViaXhfZGF0YV9ib3JkZXJcIixcbiAgICAgICAgICAgIHNjcm9sbDogdHJ1ZSxcbiAgICAgICAgICAgIGF1dG9Db25maWc6IHRydWUsXG4gICAgICAgICAgICBvbjoge1xuICAgICAgICAgICAgICAgIG9uQWZ0ZXJMb2FkOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc29ydChcImVwb2NoXCIsIFwiZGVzXCIpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm1hcmtTb3J0aW5nKFwiZXBvY2hcIiwgXCJkZXNcIik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcblxuICAgICAgICAgICAgY29sdW1uczogW3tcbiAgICAgICAgICAgICAgICBpZDogXCJpZFwiLFxuICAgICAgICAgICAgICAgIGhlYWRlcjogW1xuICAgICAgICAgICAgICAgICAgICBcIkxvZyNcIixcbiAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29udGVudDogXCJ0ZXh0RmlsdGVyXCJcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgIHNvcnQ6IFwiaW50XCIsXG4gICAgICAgICAgICAgICAgd2lkdGg6IDUwLFxuICAgICAgICAgICAgICAgIGF1dG93aWR0aDogdHJ1ZSxcbiAgICAgICAgICAgIH0sXG5cbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBpZDogXCJmaWxlcGF0aFwiLFxuICAgICAgICAgICAgICAgIGhlYWRlcjogW1xuICAgICAgICAgICAgICAgICAgICBcIlBhdGhcIixcbiAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29udGVudDogXCJ0ZXh0RmlsdGVyXCJcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgIHNvcnQ6IFwic3RyaW5nXCIsXG4gICAgICAgICAgICAgICAgYXV0b3dpZHRoOiB0cnVlLFxuICAgICAgICAgICAgICAgIHdpZHRoOiAxNDBcbiAgICAgICAgICAgIH0sXG5cbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBpZDogXCJsaW5lbnJcIixcbiAgICAgICAgICAgICAgICBoZWFkZXI6IFtcbiAgICAgICAgICAgICAgICAgICAgXCJMaW5lLm5yXCIsXG4gICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRlbnQ6IFwidGV4dEZpbHRlclwiXG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICBzb3J0OiBcImludFwiLFxuICAgICAgICAgICAgICAgIGF1dG93aWR0aDogdHJ1ZSxcbiAgICAgICAgICAgICAgICB3aWR0aDogNjBcbiAgICAgICAgICAgIH0sXG5cbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBpZDogXCJjb250ZXh0XCIsXG4gICAgICAgICAgICAgICAgaGVhZGVyOiBbXG4gICAgICAgICAgICAgICAgICAgIFwiQ29udGV4dFwiLFxuICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb250ZW50OiBcInRleHRGaWx0ZXJcIlxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgc29ydDogXCJzdHJpbmdcIlxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBpZDogXCJtZXNzYWdlXCIsXG4gICAgICAgICAgICAgICAgaGVhZGVyOiBbXG4gICAgICAgICAgICAgICAgICAgIFwiTWVzc2FnZVwiLFxuICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb250ZW50OiBcInRleHRGaWx0ZXJcIlxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgc29ydDogXCJzdHJpbmdcIixcbiAgICAgICAgICAgICAgICB3aWR0aDogNTAwLFxuICAgICAgICAgICAgICAgIGF1dG93aWR0aDogdHJ1ZVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBpZDogXCJsZXZlbFwiLFxuICAgICAgICAgICAgICAgIGhlYWRlcjogW1xuICAgICAgICAgICAgICAgICAgICBcIkxldmVsXCIsXG4gICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRlbnQ6IFwidGV4dEZpbHRlclwiXG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICBzb3J0OiBcImludFwiLFxuICAgICAgICAgICAgICAgIHdpZHRoOiA1MFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBpZDogXCJlcG9jaFwiLFxuICAgICAgICAgICAgICAgIGhlYWRlcjogW1xuICAgICAgICAgICAgICAgICAgICBcIlRpbWVcIixcbiAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29udGVudDogXCJ0ZXh0RmlsdGVyXCJcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgIHNvcnQ6IFwiZGF0ZVwiLFxuICAgICAgICAgICAgICAgIGZvcm1hdDogZGF0ZUZvcm1hdHRlcixcbiAgICAgICAgICAgICAgICB3aWR0aDogMTMwXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGlkOiBcInByb2Nlc3NpZFwiLFxuICAgICAgICAgICAgICAgIGhlYWRlcjogW1xuICAgICAgICAgICAgICAgICAgICBcIlBJRFwiLFxuICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb250ZW50OiBcInRleHRGaWx0ZXJcIlxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgc29ydDogXCJpbnRcIixcbiAgICAgICAgICAgICAgICB3aWR0aDogNjBcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgaWQ6IFwiY2F0XCIsXG4gICAgICAgICAgICAgICAgaGVhZGVyOiBbXG4gICAgICAgICAgICAgICAgICAgIFwiQ2F0ZWdvcnlcIixcbiAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29udGVudDogXCJ0ZXh0RmlsdGVyXCJcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgIHNvcnQ6IFwic3RyaW5nXCIsXG4gICAgICAgICAgICAgICAgd2lkdGg6IDgwXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGlkOiBcImRhdGFcIixcbiAgICAgICAgICAgICAgICBoZWFkZXI6IFtcbiAgICAgICAgICAgICAgICAgICAgXCJEYXRhXCIsXG4gICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRlbnQ6IFwidGV4dEZpbHRlclwiXG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICBzb3J0OiBcInN0cmluZ1wiXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIF0sXG5cbiAgICAgICAgfVxuXG5cbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHJvd3M6IFtcbiAgICAgICAgICAgICAgICBhcHBsb2dzLFxuICAgICAgICAgICAgICAgIHBhZ2VyXG4gICAgICAgICAgICBdXG4gICAgICAgIH1cbiAgICB9XG5cbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NvdXJjZXMvdmlld3MvbG9ncy9hcHBMb2dzLmpzIiwiaW1wb3J0IHsgU2VydmljZSB9IGZyb20gXCIuLi9jb21tb24vYXBpXCI7XG5cbmNvbnN0IEJBU0VfVVJMID0gXCIvemVyb2JvdC9wYWNrYWdlbWFuYWdlci9hY3RvcnMvcGFja2FnZV9tYW5hZ2VyXCI7XG5cblxuY2xhc3MgUGFja2FnZXNTZXJ2aWNlIGV4dGVuZHMgU2VydmljZSB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHN1cGVyKEJBU0VfVVJMKTtcbiAgICB9XG5cbiAgICBsaXN0KCkge1xuICAgICAgICByZXR1cm4gdGhpcy5nZXRDYWxsKFwicGFja2FnZXNfbGlzdFwiKTtcbiAgICB9XG5cbiAgICBhZGQocGF0aCwgZ2l0VXJsKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnBvc3RDYWxsKFwicGFja2FnZV9hZGRcIiwge1xuICAgICAgICAgICAgcGF0aDogcGF0aCxcbiAgICAgICAgICAgIGdpdF91cmw6IGdpdFVybFxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBkZWxldGUocGFja2FnZU5hbWUpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucG9zdENhbGwoXCJwYWNrYWdlX2RlbGV0ZVwiLCB7IG5hbWU6IHBhY2thZ2VOYW1lIH0pO1xuXG4gICAgfVxuXG4gICAgc3RhcnQocGFja2FnZU5hbWUpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucG9zdENhbGwoXCJwYWNrYWdlX3N0YXJ0XCIsIHsgbmFtZTogcGFja2FnZU5hbWUgfSk7XG4gICAgfVxuXG4gICAgc3RvcChwYWNrYWdlTmFtZSkge1xuICAgICAgICByZXR1cm4gdGhpcy5wb3N0Q2FsbChcInBhY2thZ2Vfc3RvcFwiLCB7IG5hbWU6IHBhY2thZ2VOYW1lIH0pO1xuXG4gICAgfVxuXG4gICAgZGlzYWJsZShwYWNrYWdlTmFtZSkge1xuICAgICAgICByZXR1cm4gdGhpcy5wb3N0Q2FsbChcInBhY2thZ2VfZGlzYWJsZVwiLCB7IG5hbWU6IHBhY2thZ2VOYW1lIH0pO1xuXG4gICAgfVxuXG4gICAgZW5hYmxlKHBhY2thZ2VOYW1lKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnBvc3RDYWxsKFwicGFja2FnZV9lbmFibGVcIiwgeyBuYW1lOiBwYWNrYWdlTmFtZSB9KTtcbiAgICB9XG59XG5cblxuZXhwb3J0IGNvbnN0IHBhY2thZ2VzID0gbmV3IFBhY2thZ2VzU2VydmljZSgpO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc291cmNlcy9zZXJ2aWNlcy9wYWNrYWdlcy5qcyIsImltcG9ydCB7IEpldFZpZXcgfSBmcm9tIFwid2ViaXgtamV0XCI7XG5pbXBvcnQgeyBoZWFsdGggfSBmcm9tIFwiLi4vLi4vc2VydmljZXMvaGVhbHRoXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIERpc2tTcGFjZVZpZXcgZXh0ZW5kcyBKZXRWaWV3IHtcbiAgICBjb25maWcoKSB7XG4gICAgICAgIGNvbnN0IGRpc2tTcGFjZSA9IHtcbiAgICAgICAgICAgIGlkOiBcImRpc2tTcGFjZVwiLFxuICAgICAgICAgICAgcmVzcG9uc2l2ZTogdHJ1ZSxcbiAgICAgICAgICAgIHZpZXc6IFwibGlzdFwiLFxuICAgICAgICAgICAgdHlwZToge1xuICAgICAgICAgICAgICAgIGhlaWdodDogNjAsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgdGVtcGxhdGU6IGBcbiAgICAgICAgICAgIDxwPjxmb250IHNpemU9XCIzXCI+PGI+I2tleSM6IDwvYj48L2ZvbnQ+IDxmb250IHNpemU9XCIzXCI+I3ZhbHVlIzwvZm9udD48L3A+XG4gICAgICAgICAgICBgXG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgdHlwZTogXCJzcGFjZVwiLFxuICAgICAgICAgICAgcm93czogW3tcbiAgICAgICAgICAgICAgICB0ZW1wbGF0ZTogXCI8ZGl2IHN0eWxlPSd3aWR0aDphdXRvO3RleHQtYWxpZ246Y2VudGVyJz48aDM+RGlzayBTcGFjZTxoMy8+PC9kaXY+XCIsXG4gICAgICAgICAgICAgICAgaGVpZ2h0OiA1MFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBkaXNrU3BhY2VcbiAgICAgICAgICAgIF1cbiAgICAgICAgfVxuICAgIH1cblxuXG4gICAgaW5pdCgpIHtcbiAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xuXG4gICAgICAgIHRoaXMuZGlza0luZm8gPSB0aGlzLiQkKFwiZGlza1NwYWNlXCIpO1xuXG4gICAgICAgIGhlYWx0aC5nZXREaXNrU3BhY2UoKS50aGVuKGRhdGEgPT4ge1xuICAgICAgICAgICAgZGF0YSA9IGRhdGEuanNvbigpO1xuXG4gICAgICAgICAgICBzZWxmLmRpc2tJbmZvLmFkZCh7XG4gICAgICAgICAgICAgICAga2V5OiBcIlVzZWRcIixcbiAgICAgICAgICAgICAgICB2YWx1ZTogZGF0YS51c2VkICsgXCIgR0JcIlxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBzZWxmLmRpc2tJbmZvLmFkZCh7XG4gICAgICAgICAgICAgICAga2V5OiBcIkZyZWVcIixcbiAgICAgICAgICAgICAgICB2YWx1ZTogZGF0YS5mcmVlICsgXCIgR0JcIlxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBzZWxmLmRpc2tJbmZvLmFkZCh7XG4gICAgICAgICAgICAgICAga2V5OiBcIlRvdGFsXCIsXG4gICAgICAgICAgICAgICAgdmFsdWU6IGRhdGEudG90YWwgKyBcIiBHQlwiXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHNlbGYuZGlza0luZm8uYWRkKHtcbiAgICAgICAgICAgICAgICBrZXk6IFwiUGVyY2VudFwiLFxuICAgICAgICAgICAgICAgIHZhbHVlOiBkYXRhLnBlcmNlbnQgKyBcIiAlXCJcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9XG5cbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NvdXJjZXMvdmlld3MvZGFzaC9kaXNrU3BhY2UuanMiLCJpbXBvcnQgeyBKZXRWaWV3IH0gZnJvbSBcIndlYml4LWpldFwiO1xuaW1wb3J0IHsgaGVhbHRoIH0gZnJvbSBcIi4uLy4uL3NlcnZpY2VzL2hlYWx0aFwiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBoZWFsdGhJbmZvVmlldyBleHRlbmRzIEpldFZpZXcge1xuICAgIGNvbmZpZygpIHtcbiAgICAgICAgY29uc3QgaGVhbHRoSW5mbyA9IHtcbiAgICAgICAgICAgIGlkOiBcImhlYWx0aEluZm9cIixcbiAgICAgICAgICAgIHJlc3BvbnNpdmU6IHRydWUsXG4gICAgICAgICAgICB2aWV3OiBcImxpc3RcIixcbiAgICAgICAgICAgIHJlc3BvbnNpdmU6IHRydWUsXG4gICAgICAgICAgICB0eXBlOiB7XG4gICAgICAgICAgICAgICAgaGVpZ2h0OiA2MCxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB0ZW1wbGF0ZTogYFxuICAgICAgICAgICAgPHA+PGZvbnQgc2l6ZT1cIjNcIj48Yj4ja2V5IzogPC9iPjwvZm9udD4gI3ZhbHVlIzwvcD5cbiAgICAgICAgICAgIGBcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICB0eXBlOiBcInNwYWNlXCIsXG4gICAgICAgICAgICByb3dzOiBbe1xuICAgICAgICAgICAgICAgIHRlbXBsYXRlOiBcIjxkaXYgc3R5bGU9J3dpZHRoOmF1dG87dGV4dC1hbGlnbjpjZW50ZXInPjxoMz5IZWFsdGggQ2hlY2tzPGgzLz48L2Rpdj5cIixcbiAgICAgICAgICAgICAgICBoZWlnaHQ6IDUwXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIGhlYWx0aEluZm9dXG4gICAgICAgIH1cbiAgICB9XG4gICAgaW5pdCh2aWV3KSB7XG4gICAgICAgIHZhciBzZWxmID0gdGhpcztcblxuICAgICAgICB0aGlzLmhlYWx0aEluZm8gPSB0aGlzLiQkKFwiaGVhbHRoSW5mb1wiKTtcblxuICAgICAgICBoZWFsdGguZ2V0SGVhbHRoKCkudGhlbihkYXRhID0+IHtcbiAgICAgICAgICAgIGRhdGEgPSBkYXRhLmpzb24oKTtcblxuICAgICAgICAgICAgaWYgKGRhdGEuYmNkYiA9PT0gXCJPS1wiKSB7XG4gICAgICAgICAgICAgICAgc2VsZi5oZWFsdGhJbmZvLmFkZCh7XG4gICAgICAgICAgICAgICAgICAgIGtleTogXCJCQ0RCIFN0YXR1c1wiLFxuICAgICAgICAgICAgICAgICAgICB2YWx1ZTogYDxzcGFuIGNsYXNzPSd3ZWJpeF9pY29uIHd4aS1jaGVja2JveC1tYXJrZWQnIHN0eWxlPVwiY29sb3I6Z3JlZW5cIj5PSzwvc3Bhbj5gXG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChkYXRhLmJjZGIgPT09IFwiRXJyb3JcIikge1xuICAgICAgICAgICAgICAgIHNlbGYuaGVhbHRoSW5mby5hZGQoe1xuICAgICAgICAgICAgICAgICAgICBrZXk6IFwiQkNEQlwiLFxuICAgICAgICAgICAgICAgICAgICB2YWx1ZTogYDxzcGFuIGNsYXNzPSd3ZWJpeF9pY29uIHd4aS1jbG9zZS1jaXJjbGUnIHN0eWxlPVwiY29sb3I6cmVkXCI+RXJyb3I8L3NwYW4+YFxuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoZGF0YS53aWtpcyA9PT0gXCJPS1wiKSB7XG4gICAgICAgICAgICAgICAgc2VsZi5oZWFsdGhJbmZvLmFkZCh7XG4gICAgICAgICAgICAgICAgICAgIGtleTogXCJXaWtpc1wiLFxuICAgICAgICAgICAgICAgICAgICB2YWx1ZTogYDxzcGFuIGNsYXNzPSd3ZWJpeF9pY29uIHd4aS1jaGVja2JveC1tYXJrZWQnIHN0eWxlPVwiY29sb3I6Z3JlZW5cIj5PSzwvc3Bhbj5gXG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChkYXRhLndpa2lzID09PSBcIkVycm9yXCIpIHtcbiAgICAgICAgICAgICAgICBzZWxmLmhlYWx0aEluZm8uYWRkKHtcbiAgICAgICAgICAgICAgICAgICAga2V5OiBcIldpa2lzXCIsXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlOiBgPHNwYW4gY2xhc3M9J3dlYml4X2ljb24gd3hpLWNsb3NlLWNpcmNsZScgc3R5bGU9XCJjb2xvcjpyZWRcIj5FcnJvcjwvc3Bhbj5gXG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChkYXRhLmNvZGVzZXJ2ZXIgPT09IFwiT0tcIikge1xuICAgICAgICAgICAgICAgIHNlbGYuaGVhbHRoSW5mby5hZGQoe1xuICAgICAgICAgICAgICAgICAgICBrZXk6IFwiQ29kZXNlcnZlclwiLFxuICAgICAgICAgICAgICAgICAgICB2YWx1ZTogYDxzcGFuIGNsYXNzPSd3ZWJpeF9pY29uIHd4aS1jaGVja2JveC1tYXJrZWQnIHN0eWxlPVwiY29sb3I6Z3JlZW5cIj5PSzwvc3Bhbj5gXG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChkYXRhLmNvZGVzZXJ2ZXIgPT09IFwiRXJyb3JcIikge1xuICAgICAgICAgICAgICAgIHNlbGYuaGVhbHRoSW5mby5hZGQoe1xuICAgICAgICAgICAgICAgICAgICBrZXk6IFwiQ29kZXNlcnZlclwiLFxuICAgICAgICAgICAgICAgICAgICB2YWx1ZTogYDxzcGFuIGNsYXNzPSd3ZWJpeF9pY29uIHd4aS1jbG9zZS1jaXJjbGUnIHN0eWxlPVwiY29sb3I6cmVkXCI+RXJyb3I8L3NwYW4+YFxuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoZGF0YS5qdXB5dGVyID09PSBcIk9LXCIpIHtcbiAgICAgICAgICAgICAgICBzZWxmLmhlYWx0aEluZm8uYWRkKHtcbiAgICAgICAgICAgICAgICAgICAga2V5OiBcIkp1cHl0ZXJcIixcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU6IGA8c3BhbiBjbGFzcz0nd2ViaXhfaWNvbiB3eGktY2hlY2tib3gtbWFya2VkJyBzdHlsZT1cImNvbG9yOmdyZWVuXCI+T0s8L3NwYW4+YFxuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoZGF0YS5qdXB5dGVyID09PSBcIkVycm9yXCIpIHtcbiAgICAgICAgICAgICAgICBzZWxmLmhlYWx0aEluZm8uYWRkKHtcbiAgICAgICAgICAgICAgICAgICAga2V5OiBcIkp1cHl0ZXJcIixcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU6IGA8c3BhbiBjbGFzcz0nd2ViaXhfaWNvbiB3eGktY2xvc2UtY2lyY2xlJyBzdHlsZT1cImNvbG9yOnJlZFwiPkVycm9yPC9zcGFuPmBcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgIH1cblxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc291cmNlcy92aWV3cy9kYXNoL2hlYWx0aC5qcyIsImltcG9ydCB7IEpldFZpZXcgfSBmcm9tIFwid2ViaXgtamV0XCI7XG5pbXBvcnQgeyBoZWFsdGggfSBmcm9tIFwiLi4vLi4vc2VydmljZXMvaGVhbHRoXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEpTWEluZm9WaWV3IGV4dGVuZHMgSmV0VmlldyB7XG4gICAgY29uZmlnKCkge1xuICAgICAgICBjb25zdCBpbmZvID0ge1xuICAgICAgICAgICAgaWQ6IFwianN4SW5mb1wiLFxuICAgICAgICAgICAgcmVzcG9uc2l2ZTogdHJ1ZSxcbiAgICAgICAgICAgIHZpZXc6IFwibGlzdFwiLFxuICAgICAgICAgICAgcmVzcG9uc2l2ZTogdHJ1ZSxcbiAgICAgICAgICAgIHR5cGU6IHtcbiAgICAgICAgICAgICAgICBoZWlnaHQ6IDYwLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHRlbXBsYXRlOiBgXG4gICAgICAgICAgICAgICAgPHA+PGZvbnQgc2l6ZT1cIjNcIj48Yj4ja2V5IzogPC9iPjwvZm9udD4gPGZvbnQgc2l6ZT1cIjNcIj4jdmFsdWUjPC9mb250PjwvcD5cbiAgICAgICAgICAgIGBcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICB0eXBlOiBcInNwYWNlXCIsXG4gICAgICAgICAgICByb3dzOiBbe1xuICAgICAgICAgICAgICAgIHRlbXBsYXRlOiBcIjxkaXYgc3R5bGU9J3dpZHRoOmF1dG87dGV4dC1hbGlnbjpjZW50ZXInPjxoMz5KU1ggSW5mbzxoMy8+PC9kaXY+XCIsXG4gICAgICAgICAgICAgICAgaGVpZ2h0OiA1MFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBpbmZvXG4gICAgICAgICAgICBdXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBpbml0KCkge1xuICAgICAgICBjb25zdCBzZWxmID0gdGhpcztcblxuICAgICAgICB0aGlzLmluZm8gPSB0aGlzLiQkKFwianN4SW5mb1wiKTtcblxuICAgICAgICBoZWFsdGguZ2V0SWRlbnRpdHkoKS50aGVuKGRhdGEgPT4ge1xuICAgICAgICAgICAgc2VsZi5pbmZvLmFkZCh7XG4gICAgICAgICAgICAgICAga2V5OiBcIjNib3RcIixcbiAgICAgICAgICAgICAgICB2YWx1ZTogZGF0YS50ZXh0KClcbiAgICAgICAgICAgIH0pXG4gICAgICAgIH0pXG5cbiAgICAgICAgaGVhbHRoLmdldE5ldHdvcmtJbmZvKCkudGhlbihkYXRhID0+IHtcbiAgICAgICAgICAgIGRhdGEgPSBkYXRhLmpzb24oKTtcbiAgICAgICAgICAgIHNlbGYuaW5mby5hZGQoe1xuICAgICAgICAgICAgICAgIGtleTogXCJJUFwiLFxuICAgICAgICAgICAgICAgIHZhbHVlOiBkYXRhLmlwLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBpZiAoZGF0YS5pcDYubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgc2VsZi5pbmZvLmFkZCh7XG4gICAgICAgICAgICAgICAgICAgIGtleTogXCJJUHY2XCIsXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlOiBkYXRhLmlwNlxuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHNlbGYuaW5mby5hZGQoe1xuICAgICAgICAgICAgICAgICAgICBrZXk6IFwiSVB2NlwiLFxuICAgICAgICAgICAgICAgICAgICB2YWx1ZTogXCJOb3Qgc2V0XCJcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICBoZWFsdGguZ2V0SnN4VmVyc2lvbigpLnRoZW4oZGF0YSA9PiB7XG4gICAgICAgICAgICBzZWxmLmluZm8uYWRkKHtcbiAgICAgICAgICAgICAgICBrZXk6IFwiSlNYIFZlcnNpb25cIixcbiAgICAgICAgICAgICAgICB2YWx1ZTogZGF0YS50ZXh0KClcbiAgICAgICAgICAgIH0pXG4gICAgICAgIH0pXG5cbiAgICB9XG5cbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NvdXJjZXMvdmlld3MvZGFzaC9qc3hJbmZvLmpzIiwiaW1wb3J0IHsgSmV0VmlldyB9IGZyb20gXCJ3ZWJpeC1qZXRcIjtcblxuaW1wb3J0IFByb2Nlc3Nlc0NoaWxkVmlldyBmcm9tIFwiLi9wcm9jZXNzZXNDaGlsZFZpZXdcIjtcbmltcG9ydCB7IGhlYWx0aCB9IGZyb20gXCIuLi8uLi9zZXJ2aWNlcy9oZWFsdGhcIjtcblxuY29uc3QgY29sb3JzRGF0YXNldCA9IFtcbiAgICB7XG4gICAgICAgIGNvbG9yOiBcIiNlZTM2MzlcIlxuICAgIH0sXG4gICAge1xuICAgICAgICBjb2xvcjogXCIjZWU5ZTM2XCJcbiAgICB9LFxuICAgIHtcbiAgICAgICAgY29sb3I6IFwiI2VlZWEzNlwiXG4gICAgfSxcbiAgICB7XG4gICAgICAgIGNvbG9yOiBcIiNhOWVlMzZcIlxuICAgIH0sXG4gICAge1xuICAgICAgICBjb2xvcjogXCIjMzZkM2VlXCJcbiAgICB9LFxuICAgIHtcbiAgICAgICAgY29sb3I6IFwiIzM2N2ZlZVwiXG4gICAgfSxcbiAgICB7XG4gICAgICAgIGNvbG9yOiBcIiM5YjM2ZWVcIlxuICAgIH1cbl07XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFByb2Nlc3Nlc1ZpZXcgZXh0ZW5kcyBKZXRWaWV3IHtcblxuICAgIGNvbmZpZygpIHtcbiAgICAgICAgY29uc3QgcHJvY2Vzc2VzSW5mbyA9IHtcbiAgICAgICAgICAgIGlkOiBcInByb2Nlc3NcIixcbiAgICAgICAgICAgIHZpZXc6IFwiY2hhcnRcIixcbiAgICAgICAgICAgIHJlc3BvbnNpdmU6IHRydWUsXG4gICAgICAgICAgICB0eXBlOiBcInBpZVwiLFxuICAgICAgICAgICAgd2lkdGg6IDUwMCxcbiAgICAgICAgICAgIGhlaWdodDogNDAwLFxuICAgICAgICAgICAgY29sb3I6IFwiI2NvbG9yI1wiLFxuICAgICAgICAgICAgdmFsdWU6IFwiI3ZtcyNcIixcbiAgICAgICAgICAgIGxhYmVsOiBcIjxoND4jbmFtZSM8L2g0PlwiLFxuICAgICAgICAgICAgcGllSW5uZXJUZXh0OiBcIjxoND4jdm1zIzwvaDQ+XCIsXG4gICAgICAgICAgICBkYXRhOiBcIiNjaGFydHNEYXRhI1wiLFxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHR5cGU6IFwic3BhY2VcIixcbiAgICAgICAgICAgIHJvd3M6IFtcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIHRlbXBsYXRlOiBcIjxkaXYgc3R5bGU9J3dpZHRoOmF1dG87dGV4dC1hbGlnbjpjZW50ZXInPjxoMz5SdW5uaW5nIHByb2Nlc3NlcyBtZW1vcnkgdXNhZ2UgKE1CKTxoMy8+PC9kaXY+XCIsXG4gICAgICAgICAgICAgICAgICAgIGhlaWdodDogNTBcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHByb2Nlc3Nlc0luZm8sXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICB2aWV3OiBcImJ1dHRvblwiLFxuICAgICAgICAgICAgICAgICAgICBpZDogXCJzaG93X2FsbFwiLFxuICAgICAgICAgICAgICAgICAgICB2YWx1ZTogXCJTaG93IEFsbFwiLFxuICAgICAgICAgICAgICAgICAgICBhbGlnbjogXCJjZW50ZXJcIixcbiAgICAgICAgICAgICAgICAgICAgY3NzOiBcIndlYml4X3ByaW1hcnlcIixcbiAgICAgICAgICAgICAgICAgICAgaW5wdXRXaWR0aDogMTAwLFxuICAgICAgICAgICAgICAgICAgICBjbGljazogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy4kc2NvcGUuY2hpbGR2aWV3LnNob3dGb3IodGhpcy4kc2NvcGUucHJvY2Vzc2VzTGlzdClcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgXVxuICAgICAgICB9XG4gICAgfVxuXG5cbiAgICBpbml0KHZpZXcpIHtcbiAgICAgICAgY29uc3Qgc2VsZiA9IHRoaXM7XG5cbiAgICAgICAgdGhpcy5wcm9jZXNzZXNMaXN0ID0gW11cblxuICAgICAgICB0aGlzLnJ1blByb2Nlc3NJbmZvID0gdGhpcy4kJChcInByb2Nlc3NcIik7XG5cbiAgICAgICAgc2VsZi5jaGlsZHZpZXcgPSBzZWxmLnVpKFByb2Nlc3Nlc0NoaWxkVmlldyk7XG5cbiAgICAgICAgaGVhbHRoLmdldFJ1bm5pbmdQcm9jZXNzZXMoKS50aGVuKGRhdGEgPT4ge1xuICAgICAgICAgICAgdmFyIGNoYXJ0c0RhdGEgPSBbXVxuXG4gICAgICAgICAgICBkYXRhID0gZGF0YS5qc29uKCk7XG4gICAgICAgICAgICBzZWxmLnByb2Nlc3Nlc0xpc3QgPSBkYXRhLnByb2Nlc3Nlc19saXN0XG5cbiAgICAgICAgICAgIC8vIG1lbW9yeSB1c2FnZVxuICAgICAgICAgICAgc2VsZi5tZW1vcnlVc2FnZSA9IGRhdGEubWVtb3J5X3VzYWdlXG4gICAgICAgICAgICBzZWxmLnRvdGFsTWVtb3J5ID0gc2VsZi5tZW1vcnlVc2FnZS50b3RhbF9tZW1cbiAgICAgICAgICAgIHNlbGYucGVyY2VudCA9IHNlbGYubWVtb3J5VXNhZ2UudXNhZ2VfcGVyY2VudFxuXG5cbiAgICAgICAgICAgIHNlbGYucnVuUHJvY2Vzc0luZm8uZGVmaW5lKFwibGVnZW5kXCIsIHtcbiAgICAgICAgICAgICAgICBsYXlvdXQ6IFwieFwiLFxuICAgICAgICAgICAgICAgIHdpZHRoOiAxMTAsXG4gICAgICAgICAgICAgICAgdmFsdWVzOiBbXG4gICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRleHQ6IGA8Yj5Ub3RhbCBtZW1vcnk6IDwvYj4ke3NlbGYudG90YWxNZW1vcnl9R0JgXG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRleHQ6IGA8Yj5Vc2FnZTogPC9iPiR7c2VsZi5wZXJjZW50fSVgXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgc2VsZi5ydW5Qcm9jZXNzSW5mby5yZWZyZXNoKClcblxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzZWxmLnByb2Nlc3Nlc0xpc3QubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICAvL0JyZWFrIHdoZW4gdGhlcmUgaXMgbm8gbW9yZSBjb2xvcnNcbiAgICAgICAgICAgICAgICBpZiAoaSA9PSBjb2xvcnNEYXRhc2V0Lmxlbmd0aClcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgICAgICB2YXIgdGVtcCA9IHtcbiAgICAgICAgICAgICAgICAgICAgXCJjb2xvclwiOiBjb2xvcnNEYXRhc2V0W2ldLmNvbG9yLFxuICAgICAgICAgICAgICAgICAgICBcIm5hbWVcIjogc2VsZi5wcm9jZXNzZXNMaXN0W2ldLm5hbWUsXG4gICAgICAgICAgICAgICAgICAgIFwidm1zXCI6IE1hdGguY2VpbChzZWxmLnByb2Nlc3Nlc0xpc3RbaV0udm1zKSxcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgY2hhcnRzRGF0YS5wdXNoKHRlbXApXG4gICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2cobXlBcnJheVtpXSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHNlbGYucnVuUHJvY2Vzc0luZm8ucGFyc2Uoe1xuICAgICAgICAgICAgICAgIGRhdGE6IGNoYXJ0c0RhdGEsXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zb3VyY2VzL3ZpZXdzL2Rhc2gvcHJvY2Vzc2VzLmpzIiwiaW1wb3J0IHsgSmV0VmlldyB9IGZyb20gXCJ3ZWJpeC1qZXRcIjtcblxuaW1wb3J0IHsgaGVhbHRoIH0gZnJvbSBcIi4uLy4uL3NlcnZpY2VzL2hlYWx0aFwiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBydW5uaW5nUG9ydHNWaWV3IGV4dGVuZHMgSmV0VmlldyB7XG4gICAgY29uZmlnKCkge1xuICAgICAgICBjb25zdCBwb3J0cyA9IHtcbiAgICAgICAgICAgIGlkOiBcInJ1bm5pbmdQb3J0c1wiLFxuICAgICAgICAgICAgdmlldzogXCJkYXRhdGFibGVcIixcbiAgICAgICAgICAgIHJlc3BvbnNpdmU6IHRydWUsXG4gICAgICAgICAgICBhdXRvQ29uZmlnOiB0cnVlLFxuICAgICAgICAgICAgdHlwZToge1xuICAgICAgICAgICAgICAgIGhlaWdodDogMjAwLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHRlbXBsYXRlOiBcIlJ1bm5pbmcgUG9ydHNcIixcbiAgICAgICAgICAgIHJlc2l6ZUNvbHVtbjogdHJ1ZSxcbiAgICAgICAgICAgIHNlbGVjdDogdHJ1ZSxcbiAgICAgICAgICAgIG11bHRpc2VsZWN0OiB0cnVlLFxuICAgICAgICAgICAgY3NzOiBcIndlYml4X2hlYWRlcl9ib3JkZXIgd2ViaXhfZGF0YV9ib3JkZXJcIixcbiAgICAgICAgICAgIGNvbHVtbnM6IFt7XG4gICAgICAgICAgICAgICAgaWQ6IFwiaW5kZXhcIixcbiAgICAgICAgICAgICAgICBoZWFkZXI6IFwiI1wiLFxuICAgICAgICAgICAgICAgIHNvcnQ6IFwiaW50XCIsXG4gICAgICAgICAgICAgICAgYXV0b3dpZHRoOiB0cnVlLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBpZDogXCJwb3J0X251bWJlclwiLFxuICAgICAgICAgICAgICAgIGhlYWRlcjogW1wiUG9ydCBOdW1iZXJcIiwge1xuICAgICAgICAgICAgICAgICAgICBjb250ZW50OiBcInRleHRGaWx0ZXJcIlxuICAgICAgICAgICAgICAgIH0sXSxcbiAgICAgICAgICAgICAgICBzb3J0OiBcInN0cmluZ1wiXG4gICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgaWQ6IFwicHJvY2Vzc1wiLFxuICAgICAgICAgICAgICAgIGhlYWRlcjogW1wiUHJvY2Vzc1wiLCB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnRlbnQ6IFwidGV4dEZpbHRlclwiXG4gICAgICAgICAgICAgICAgfV0sXG4gICAgICAgICAgICAgICAgc29ydDogXCJzdHJpbmdcIlxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgXSxcbiAgICAgICAgICAgIHNjaGVtZToge1xuICAgICAgICAgICAgICAgICRpbml0OiBmdW5jdGlvbiAob2JqKSB7XG4gICAgICAgICAgICAgICAgICAgIG9iai5pbmRleCA9IHRoaXMuY291bnQoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHR5cGU6IFwic3BhY2VcIixcbiAgICAgICAgICAgIHJvd3M6IFtcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIHRlbXBsYXRlOiBcIjxkaXYgc3R5bGU9J3dpZHRoOmF1dG87dGV4dC1hbGlnbjpjZW50ZXInPjxoMz5Qb3J0czxoMy8+PC9kaXY+XCIsXG4gICAgICAgICAgICAgICAgICAgIGhlaWdodDogNTBcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHBvcnRzXG4gICAgICAgICAgICBdXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBpbml0KCkge1xuICAgICAgICBjb25zdCBzZWxmID0gdGhpcztcblxuICAgICAgICBzZWxmLnBvcnRzVGFibGUgPSB0aGlzLiQkKFwicnVubmluZ1BvcnRzXCIpO1xuICAgICAgICBoZWFsdGguZ2V0UnVubmluZ1BvcnRzKCkudGhlbihkYXRhID0+IHtcbiAgICAgICAgICAgIHNlbGYucG9ydHNUYWJsZS5wYXJzZShkYXRhLmpzb24oKSk7XG4gICAgICAgIH0pO1xuICAgIH1cblxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc291cmNlcy92aWV3cy9kYXNoL3J1bm5pbmdQb3J0cy5qcyIsImltcG9ydCB7XG4gICAgSmV0VmlldyxcbiAgICBwbHVnaW5zXG59IGZyb20gXCJ3ZWJpeC1qZXRcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVG9wVmlldyBleHRlbmRzIEpldFZpZXcge1xuICAgIGNvbmZpZygpIHtcbiAgICAgICAgY29uc3QgaGVhZGVyID0ge1xuICAgICAgICAgICAgY29sczogW1xuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgaWQ6IFwiYnV0dG9uX2hpZGVfbWVudVwiLFxuICAgICAgICAgICAgICAgICAgICB2aWV3OiBcImljb25cIiwgaWNvbjogXCJtZGkgbWRpLW1lbnVcIixcbiAgICAgICAgICAgICAgICAgICAgY3NzOiBcImN1c3RvbV9kYXJrXCIsIGhlaWdodDogNTgsXG4gICAgICAgICAgICAgICAgICAgIGNsaWNrOiB0aGlzLmhpZGVNZW51LFxuICAgICAgICAgICAgICAgICAgICB0b29sdGlwOiBcIkhpZGUgbWVudVwiLFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBpZDogXCJoZWFkZXJcIixcbiAgICAgICAgICAgICAgICAgICAgdHlwZTogXCJoZWFkZXJcIixcbiAgICAgICAgICAgICAgICAgICAgY3NzOiBcImN1c3RvbV9kYXJrXCIsIGhlaWdodDogNTgsXG4gICAgICAgICAgICAgICAgICAgIHRlbXBsYXRlOiBcIkFETUlOXCIsXG4gICAgICAgICAgICAgICAgICAgIGJvcmRlcmxlc3M6IHRydWUsXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIF1cbiAgICAgICAgfTtcblxuICAgICAgICBjb25zdCBzaWRlYmFyID0ge1xuICAgICAgICAgICAgbG9jYWxJZDogXCJtZW51XCIsXG4gICAgICAgICAgICB2aWV3OiBcInNpZGViYXJcIixcbiAgICAgICAgICAgIGNzczogXCJ3ZWJpeF9kYXJrXCIsXG4gICAgICAgICAgICB3aWR0aDogMjAwLFxuICAgICAgICAgICAgZGF0YTogW3tcbiAgICAgICAgICAgICAgICBpZDogXCJkYXNoXCIsXG4gICAgICAgICAgICAgICAgdmFsdWU6IFwiRGFzaGJvYXJkXCIsXG4gICAgICAgICAgICAgICAgaWNvbjogXCJtZGkgbWRpLXZpZXctZGFzaGJvYXJkXCJcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgaWQ6IFwid2lraXNcIixcbiAgICAgICAgICAgICAgICB2YWx1ZTogXCJXaWtpc1wiLFxuICAgICAgICAgICAgICAgIGljb246IFwibWRpIG1kaS1uZXdzcGFwZXJcIlxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBpZDogXCJhbGVydHNcIixcbiAgICAgICAgICAgICAgICB2YWx1ZTogXCJBbGVydHNcIixcbiAgICAgICAgICAgICAgICBpY29uOiBcIm1kaSBtZGktYmVsbC1hbGVydFwiXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGlkOiBcImxvZ3NcIixcbiAgICAgICAgICAgICAgICB2YWx1ZTogXCJMb2dzXCIsXG4gICAgICAgICAgICAgICAgaWNvbjogXCJtZGkgbWRpLWhpc3RvcnlcIlxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBpZDogXCJteWpvYnNfbWFpblwiLFxuICAgICAgICAgICAgICAgIHZhbHVlOiBcIk15IGpvYnNcIixcbiAgICAgICAgICAgICAgICBpY29uOiBcIm1kaSBtZGktYW5pbWF0aW9uLXBsYXlcIixcbiAgICAgICAgICAgICAgICBkYXRhOiBbe1xuICAgICAgICAgICAgICAgICAgICBpZDogXCJteWpvYnNcIixcbiAgICAgICAgICAgICAgICAgICAgaWNvbjogXCJtZGkgbWRpLWJvb2stb3BlblwiLFxuICAgICAgICAgICAgICAgICAgICB2YWx1ZTogXCJKb2JzXCJcbiAgICAgICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgICAgIGlkOiBcIndvcmtlcnNcIixcbiAgICAgICAgICAgICAgICAgICAgaWNvbjogXCJtZGkgbWRpLXdvcmtlclwiLFxuICAgICAgICAgICAgICAgICAgICB2YWx1ZTogXCJXb3JrZXJzXCJcbiAgICAgICAgICAgICAgICB9XVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBpZDogXCJwYWNrYWdlc1wiLFxuICAgICAgICAgICAgICAgIHZhbHVlOiBcIlBhY2thZ2VzXCIsXG4gICAgICAgICAgICAgICAgaWNvbjogXCJtZGkgbWRpLXBhY2thZ2VcIlxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBpZDogXCJjb2Rlc2VydmVyXCIsXG4gICAgICAgICAgICAgICAgdmFsdWU6IFwiQ29kZXNlcnZlclwiLFxuICAgICAgICAgICAgICAgIGljb246IFwibWRpIG1kaS1jb2RlLXRhZ3NcIlxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBpZDogXCJqdXB5dGVyXCIsXG4gICAgICAgICAgICAgICAgdmFsdWU6IFwiSnVweXRlclwiLFxuICAgICAgICAgICAgICAgIGljb246IFwibWRpIG1kaS1wbGF5XCJcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBdXG4gICAgICAgIH07XG5cbiAgICAgICAgY29uc3QgdG9vbGJhciA9IHtcbiAgICAgICAgICAgIHZpZXc6IFwidG9vbGJhclwiLFxuICAgICAgICAgICAgcGFkZGluZzogOSxcbiAgICAgICAgICAgIGhlaWdodDogNTgsXG4gICAgICAgICAgICBjb2xzOiBbe1xuICAgICAgICAgICAgICAgIGlkOiBcImJ1dHRvbl9zaG93X21lbnVcIixcbiAgICAgICAgICAgICAgICB2aWV3OiBcImljb25cIixcbiAgICAgICAgICAgICAgICBpY29uOiBcIm1kaSBtZGktbWVudVwiLFxuICAgICAgICAgICAgICAgIGNsaWNrOiB0aGlzLnNob3dNZW51LFxuICAgICAgICAgICAgICAgIGhpZGRlbjogdHJ1ZSwgLy8gaGlkZGVuIGJ5IGRlZmF1bHRcbiAgICAgICAgICAgICAgICB0b29sdGlwOiBcIlNob3cgbWVudVwiLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICB2aWV3OiBcInRlbXBsYXRlXCIsXG4gICAgICAgICAgICAgICAgdGVtcGxhdGU6IGA8aW1nIGNsYXNzPVwid2ViaXhfaWNvblwiIHNyYz1cInN0YXRpYy9pbWcvM2JvdC5wbmdcIi8+YCxcbiAgICAgICAgICAgICAgICBib3JkZXJsZXNzOiB0cnVlLFxuICAgICAgICAgICAgICAgIGhlaWdodDogNDAsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGlkOiBcInVzZXJuYW1lX2xhYmVsXCIsXG4gICAgICAgICAgICAgICAgdmlldzogXCJsYWJlbFwiLFxuICAgICAgICAgICAgICAgIGxhYmVsOiBcInVzZXJuYW1lXCIsXG4gICAgICAgICAgICAgICAgYm9yZGVybGVzczogdHJ1ZSxcbiAgICAgICAgICAgICAgICBhbGlnbjogXCJyaWdodFwiLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBpZDogXCJ1c2VyX2ljb25cIixcbiAgICAgICAgICAgICAgICB2aWV3OiBcImljb25cIixcbiAgICAgICAgICAgICAgICBpY29uOiBcIm1kaSBtZGktYWNjb3VudC1jaXJjbGVcIixcbiAgICAgICAgICAgICAgICBib3JkZXJsZXNzOiB0cnVlLFxuICAgICAgICAgICAgICAgIHBvcHVwOiBcInVzZXJfbWVudVwiXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBdXG4gICAgICAgIH07XG5cbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHR5cGU6IFwiY2xlYW5cIixcbiAgICAgICAgICAgIGNvbHM6IFt7XG4gICAgICAgICAgICAgICAgcm93czogW2hlYWRlciwgc2lkZWJhcl1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgcm93czogW1xuICAgICAgICAgICAgICAgICAgICB0b29sYmFyLFxuICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAkc3VidmlldzogdHJ1ZVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgXVxuICAgICAgICB9O1xuICAgIH1cblxuICAgIHNob3dNZW51KCkge1xuICAgICAgICB0aGlzLiRzY29wZS5tZW51LnNob3coKTtcbiAgICAgICAgdGhpcy4kc2NvcGUuaGVhZGVyLnNob3coKTtcbiAgICAgICAgdGhpcy4kc2NvcGUuYnV0dG9uSGlkZU1lbnUuc2hvdygpO1xuXG4gICAgICAgIHRoaXMuJHNjb3BlLmJ1dHRvblNob3dNZW51LmhpZGUoKTtcbiAgICB9XG5cbiAgICBoaWRlTWVudSgpIHtcbiAgICAgICAgdGhpcy4kc2NvcGUubWVudS5oaWRlKCk7XG4gICAgICAgIHRoaXMuJHNjb3BlLmhlYWRlci5oaWRlKCk7XG4gICAgICAgIHRoaXMuJHNjb3BlLmJ1dHRvbkhpZGVNZW51LmhpZGUoKTtcblxuICAgICAgICB0aGlzLiRzY29wZS5idXR0b25TaG93TWVudS5zaG93KCk7XG4gICAgfVxuXG4gICAgaW5pdCgpIHtcbiAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xuXG4gICAgICAgIHRoaXMudXNlKHBsdWdpbnMuTWVudSwgXCJtZW51XCIpO1xuICAgICAgICB0aGlzLm1lbnUgPSB0aGlzLiQkKFwibWVudVwiKTtcbiAgICAgICAgdGhpcy5oZWFkZXIgPSB0aGlzLiQkKFwiaGVhZGVyXCIpO1xuXG4gICAgICAgIHRoaXMuYnV0dG9uU2hvd01lbnUgPSB0aGlzLiQkKFwiYnV0dG9uX3Nob3dfbWVudVwiKTtcbiAgICAgICAgdGhpcy5idXR0b25IaWRlTWVudSA9IHRoaXMuJCQoXCJidXR0b25faGlkZV9tZW51XCIpO1xuXG5cbiAgICAgICAgdGhpcy53ZWJpeC51aSh7XG4gICAgICAgICAgICB2aWV3OiBcInN1Ym1lbnVcIixcbiAgICAgICAgICAgIGlkOiBcInVzZXJfbWVudVwiLFxuICAgICAgICAgICAgYXV0b3dpZHRoOiB0cnVlLFxuICAgICAgICAgICAgZGF0YTogW11cbiAgICAgICAgfSk7XG5cbiAgICAgICAgdGhpcy51c2VyTWVudSA9ICQkKFwidXNlcl9tZW51XCIpO1xuICAgICAgICB0aGlzLnVzZXJNZW51LmF0dGFjaEV2ZW50KFwib25JdGVtQ2xpY2tcIiwgZnVuY3Rpb24gKGlkLCBlLCBub2RlKSB7XG4gICAgICAgICAgICBpZiAoaWQgPT0gXCJsb2dvdXRcIikge1xuICAgICAgICAgICAgICAgIHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gXCIvYXV0aC9sb2dvdXQ/bmV4dF91cmw9L2FkbWluXCI7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHRoaXMudXNlcm5hbWVMYWJlbCA9ICQkKFwidXNlcm5hbWVfbGFiZWxcIik7XG5cbiAgICAgICAgd2ViaXguYWpheCgpLmdldChcIi9hdXRoL2F1dGhlbnRpY2F0ZWRcIiwgZnVuY3Rpb24gKGRhdGEpIHtcbiAgICAgICAgICAgIGNvbnN0IGluZm8gPSBKU09OLnBhcnNlKGRhdGEpO1xuICAgICAgICAgICAgc2VsZi51c2VybmFtZUxhYmVsLmNvbmZpZy5sYWJlbCA9IGluZm8udXNlcm5hbWU7XG4gICAgICAgICAgICBzZWxmLnVzZXJuYW1lTGFiZWwuY29uZmlnLndpZHRoID0gd2ViaXguaHRtbC5nZXRUZXh0U2l6ZShpbmZvLnVzZXJuYW1lKSArIDEwO1xuICAgICAgICAgICAgc2VsZi51c2VybmFtZUxhYmVsLnJlZnJlc2goKTtcblxuICAgICAgICAgICAgc2VsZi51c2VyTWVudS5hZGQoeyBpZDogJ2VtYWlsJywgdmFsdWU6IGluZm8uZW1haWwgfSlcbiAgICAgICAgICAgIHNlbGYudXNlck1lbnUuYWRkKHsgaWQ6ICdsb2dvdXQnLCB2YWx1ZTogXCJMb2dvdXRcIiB9KVxuICAgICAgICB9KTtcbiAgICB9XG5cbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NvdXJjZXMvdmlld3MvbWFpbi5qcyIsImltcG9ydCB7IFNlcnZpY2UgfSBmcm9tIFwiLi4vY29tbW9uL2FwaVwiO1xuXG5jb25zdCBCQVNFX1VSTCA9IFwiL3plcm9ib3QvbXlqb2JzX3VpL2FjdG9ycy9teWpvYnNcIjtcblxuY2xhc3MgTXlqb2JzU2VydmljZSBleHRlbmRzIFNlcnZpY2Uge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICBzdXBlcihCQVNFX1VSTCk7XG4gICAgfVxuXG4gICAgbGlzdEpvYnMoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmdldENhbGwoXCJsaXN0X2pvYnNcIik7XG4gICAgfVxuXG4gICAgbGlzdFdvcmtlcnMoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmdldENhbGwoXCJsaXN0X3dvcmtlcnNcIik7XG4gICAgfVxufVxuXG5leHBvcnQgY29uc3QgbXlqb2JzID0gbmV3IE15am9ic1NlcnZpY2UoKTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NvdXJjZXMvc2VydmljZXMvbXlqb2JzLmpzIiwiaW1wb3J0IFwiLi9zdHlsZXMvYXBwLmNzc1wiO1xuaW1wb3J0IHtKZXRBcHB9IGZyb20gXCJ3ZWJpeC1qZXRcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgSW52ZW50b3J5QXBwIGV4dGVuZHMgSmV0QXBwIHtcblx0Y29uc3RydWN0b3IoY29uZmlnKXtcblx0XHRzdXBlcih3ZWJpeC5leHRlbmQoe1xuXHRcdFx0aWQ6XHRcdFx0QVBQTkFNRSxcblx0XHRcdHZlcnNpb246XHRWRVJTSU9OLFxuXHRcdFx0c3RhcnQ6XHRcdFwiL21haW4vZGFzaFwiLFxuXHRcdFx0ZGVidWc6XHRcdCFQUk9EVUNUSU9OXG5cdFx0fSwgY29uZmlnLCB0cnVlKSk7XG5cblx0XHQvKiBlcnJvciB0cmFja2luZyAqL1xuXHRcdHRoaXMuYXR0YWNoRXZlbnQoXCJhcHA6ZXJyb3I6cmVzb2x2ZVwiLCBmdW5jdGlvbihuYW1lLCBlcnJvcil7XG5cdFx0XHR3aW5kb3cuY29uc29sZS5lcnJvcihlcnJvcik7XG5cdFx0fSk7XG5cdH1cbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NvdXJjZXMvYXBwLmpzIiwiLy8gcmVtb3ZlZCBieSBleHRyYWN0LXRleHQtd2VicGFjay1wbHVnaW5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3NvdXJjZXMvc3R5bGVzL2FwcC5jc3Ncbi8vIG1vZHVsZSBpZCA9IDI4XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsInZhciBtYXAgPSB7XG5cdFwiLi9hbGVydHNcIjogMyxcblx0XCIuL2FsZXJ0cy9cIjogMyxcblx0XCIuL2FsZXJ0cy9hbGVydFwiOiAxNCxcblx0XCIuL2FsZXJ0cy9hbGVydC5qc1wiOiAxNCxcblx0XCIuL2FsZXJ0cy9pbmRleFwiOiAzLFxuXHRcIi4vYWxlcnRzL2luZGV4LmpzXCI6IDMsXG5cdFwiLi9jb2Rlc2VydmVyXCI6IDUsXG5cdFwiLi9jb2Rlc2VydmVyL1wiOiA1LFxuXHRcIi4vY29kZXNlcnZlci9pbmRleFwiOiA1LFxuXHRcIi4vY29kZXNlcnZlci9pbmRleC5qc1wiOiA1LFxuXHRcIi4vZGFzaFwiOiA2LFxuXHRcIi4vZGFzaC9cIjogNixcblx0XCIuL2Rhc2gvZGlza1NwYWNlXCI6IDE5LFxuXHRcIi4vZGFzaC9kaXNrU3BhY2UuanNcIjogMTksXG5cdFwiLi9kYXNoL2hlYWx0aFwiOiAyMCxcblx0XCIuL2Rhc2gvaGVhbHRoLmpzXCI6IDIwLFxuXHRcIi4vZGFzaC9pbmRleFwiOiA2LFxuXHRcIi4vZGFzaC9pbmRleC5qc1wiOiA2LFxuXHRcIi4vZGFzaC9qc3hJbmZvXCI6IDIxLFxuXHRcIi4vZGFzaC9qc3hJbmZvLmpzXCI6IDIxLFxuXHRcIi4vZGFzaC9wcm9jZXNzZXNcIjogMjIsXG5cdFwiLi9kYXNoL3Byb2Nlc3Nlcy5qc1wiOiAyMixcblx0XCIuL2Rhc2gvcHJvY2Vzc2VzQ2hpbGRWaWV3XCI6IDE1LFxuXHRcIi4vZGFzaC9wcm9jZXNzZXNDaGlsZFZpZXcuanNcIjogMTUsXG5cdFwiLi9kYXNoL3J1bm5pbmdQb3J0c1wiOiAyMyxcblx0XCIuL2Rhc2gvcnVubmluZ1BvcnRzLmpzXCI6IDIzLFxuXHRcIi4vZXJyb3JzL2RpYWxvZ1wiOiAxNixcblx0XCIuL2Vycm9ycy9kaWFsb2cuanNcIjogMTYsXG5cdFwiLi9qdXB5dGVyXCI6IDcsXG5cdFwiLi9qdXB5dGVyL1wiOiA3LFxuXHRcIi4vanVweXRlci9pbmRleFwiOiA3LFxuXHRcIi4vanVweXRlci9pbmRleC5qc1wiOiA3LFxuXHRcIi4vbG9nc1wiOiA4LFxuXHRcIi4vbG9ncy9cIjogOCxcblx0XCIuL2xvZ3MvYXBwTG9nc1wiOiAxNyxcblx0XCIuL2xvZ3MvYXBwTG9ncy5qc1wiOiAxNyxcblx0XCIuL2xvZ3MvaW5kZXhcIjogOCxcblx0XCIuL2xvZ3MvaW5kZXguanNcIjogOCxcblx0XCIuL21haW5cIjogMjQsXG5cdFwiLi9tYWluLmpzXCI6IDI0LFxuXHRcIi4vbXlqb2JzXCI6IDksXG5cdFwiLi9teWpvYnMvXCI6IDksXG5cdFwiLi9teWpvYnMvaW5kZXhcIjogOSxcblx0XCIuL215am9icy9pbmRleC5qc1wiOiA5LFxuXHRcIi4vcGFja2FnZXNcIjogMTAsXG5cdFwiLi9wYWNrYWdlcy9cIjogMTAsXG5cdFwiLi9wYWNrYWdlcy9pbmRleFwiOiAxMCxcblx0XCIuL3BhY2thZ2VzL2luZGV4LmpzXCI6IDEwLFxuXHRcIi4vd2lraXNcIjogMTEsXG5cdFwiLi93aWtpcy9cIjogMTEsXG5cdFwiLi93aWtpcy9pbmRleFwiOiAxMSxcblx0XCIuL3dpa2lzL2luZGV4LmpzXCI6IDExLFxuXHRcIi4vd29ya2Vyc1wiOiAxMixcblx0XCIuL3dvcmtlcnMvXCI6IDEyLFxuXHRcIi4vd29ya2Vycy9pbmRleFwiOiAxMixcblx0XCIuL3dvcmtlcnMvaW5kZXguanNcIjogMTJcbn07XG5mdW5jdGlvbiB3ZWJwYWNrQ29udGV4dChyZXEpIHtcblx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18od2VicGFja0NvbnRleHRSZXNvbHZlKHJlcSkpO1xufTtcbmZ1bmN0aW9uIHdlYnBhY2tDb250ZXh0UmVzb2x2ZShyZXEpIHtcblx0dmFyIGlkID0gbWFwW3JlcV07XG5cdGlmKCEoaWQgKyAxKSkgLy8gY2hlY2sgZm9yIG51bWJlciBvciBzdHJpbmdcblx0XHR0aHJvdyBuZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiICsgcmVxICsgXCInLlwiKTtcblx0cmV0dXJuIGlkO1xufTtcbndlYnBhY2tDb250ZXh0LmtleXMgPSBmdW5jdGlvbiB3ZWJwYWNrQ29udGV4dEtleXMoKSB7XG5cdHJldHVybiBPYmplY3Qua2V5cyhtYXApO1xufTtcbndlYnBhY2tDb250ZXh0LnJlc29sdmUgPSB3ZWJwYWNrQ29udGV4dFJlc29sdmU7XG5tb2R1bGUuZXhwb3J0cyA9IHdlYnBhY2tDb250ZXh0O1xud2VicGFja0NvbnRleHQuaWQgPSAyOTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3NvdXJjZXMvdmlld3MgXlxcLlxcLy4qJFxuLy8gbW9kdWxlIGlkID0gMjlcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLyogIGFuc2lfdXAuanNcbiAqICBhdXRob3IgOiBEcnUgTmVsc29uXG4gKiAgbGljZW5zZSA6IE1JVFxuICogIGh0dHA6Ly9naXRodWIuY29tL2RydWRydS9hbnNpX3VwXG4gKi9cbihmdW5jdGlvbiAocm9vdCwgZmFjdG9yeSkge1xuICAgIGlmICh0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQpIHtcbiAgICAgICAgLy8gQU1ELiBSZWdpc3RlciBhcyBhbiBhbm9ueW1vdXMgbW9kdWxlLlxuICAgICAgICBkZWZpbmUoWydleHBvcnRzJ10sIGZhY3RvcnkpO1xuICAgIH0gZWxzZSBpZiAodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnICYmIHR5cGVvZiBleHBvcnRzLm5vZGVOYW1lICE9PSAnc3RyaW5nJykge1xuICAgICAgICAvLyBDb21tb25KU1xuICAgICAgICBmYWN0b3J5KGV4cG9ydHMpO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIC8vIEJyb3dzZXIgZ2xvYmFsc1xuICAgICAgICB2YXIgZXhwID0ge307XG4gICAgICAgIGZhY3RvcnkoZXhwKTtcbiAgICAgICAgcm9vdC5BbnNpVXAgPSBleHAuZGVmYXVsdDtcbiAgICB9XG59KHRoaXMsIGZ1bmN0aW9uIChleHBvcnRzKSB7XG5cInVzZSBzdHJpY3RcIjtcbnZhciBfX21ha2VUZW1wbGF0ZU9iamVjdCA9ICh0aGlzICYmIHRoaXMuX19tYWtlVGVtcGxhdGVPYmplY3QpIHx8IGZ1bmN0aW9uIChjb29rZWQsIHJhdykge1xuICAgIGlmIChPYmplY3QuZGVmaW5lUHJvcGVydHkpIHsgT2JqZWN0LmRlZmluZVByb3BlcnR5KGNvb2tlZCwgXCJyYXdcIiwgeyB2YWx1ZTogcmF3IH0pOyB9IGVsc2UgeyBjb29rZWQucmF3ID0gcmF3OyB9XG4gICAgcmV0dXJuIGNvb2tlZDtcbn07XG52YXIgUGFja2V0S2luZDtcbihmdW5jdGlvbiAoUGFja2V0S2luZCkge1xuICAgIFBhY2tldEtpbmRbUGFja2V0S2luZFtcIkVPU1wiXSA9IDBdID0gXCJFT1NcIjtcbiAgICBQYWNrZXRLaW5kW1BhY2tldEtpbmRbXCJUZXh0XCJdID0gMV0gPSBcIlRleHRcIjtcbiAgICBQYWNrZXRLaW5kW1BhY2tldEtpbmRbXCJJbmNvbXBsZXRlXCJdID0gMl0gPSBcIkluY29tcGxldGVcIjtcbiAgICBQYWNrZXRLaW5kW1BhY2tldEtpbmRbXCJFU0NcIl0gPSAzXSA9IFwiRVNDXCI7XG4gICAgUGFja2V0S2luZFtQYWNrZXRLaW5kW1wiVW5rbm93blwiXSA9IDRdID0gXCJVbmtub3duXCI7XG4gICAgUGFja2V0S2luZFtQYWNrZXRLaW5kW1wiU0dSXCJdID0gNV0gPSBcIlNHUlwiO1xuICAgIFBhY2tldEtpbmRbUGFja2V0S2luZFtcIk9TQ1VSTFwiXSA9IDZdID0gXCJPU0NVUkxcIjtcbn0pKFBhY2tldEtpbmQgfHwgKFBhY2tldEtpbmQgPSB7fSkpO1xudmFyIEFuc2lVcCA9IChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gQW5zaVVwKCkge1xuICAgICAgICB0aGlzLlZFUlNJT04gPSBcIjQuMC40XCI7XG4gICAgICAgIHRoaXMuc2V0dXBfcGFsZXR0ZXMoKTtcbiAgICAgICAgdGhpcy5fdXNlX2NsYXNzZXMgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5fZXNjYXBlX2Zvcl9odG1sID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5ib2xkID0gZmFsc2U7XG4gICAgICAgIHRoaXMuZmcgPSB0aGlzLmJnID0gbnVsbDtcbiAgICAgICAgdGhpcy5fYnVmZmVyID0gJyc7XG4gICAgICAgIHRoaXMuX3VybF93aGl0ZWxpc3QgPSB7ICdodHRwJzogMSwgJ2h0dHBzJzogMSB9O1xuICAgIH1cbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoQW5zaVVwLnByb3RvdHlwZSwgXCJ1c2VfY2xhc3Nlc1wiLCB7XG4gICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3VzZV9jbGFzc2VzO1xuICAgICAgICB9LFxuICAgICAgICBzZXQ6IGZ1bmN0aW9uIChhcmcpIHtcbiAgICAgICAgICAgIHRoaXMuX3VzZV9jbGFzc2VzID0gYXJnO1xuICAgICAgICB9LFxuICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgICAgICBjb25maWd1cmFibGU6IHRydWVcbiAgICB9KTtcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoQW5zaVVwLnByb3RvdHlwZSwgXCJlc2NhcGVfZm9yX2h0bWxcIiwge1xuICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9lc2NhcGVfZm9yX2h0bWw7XG4gICAgICAgIH0sXG4gICAgICAgIHNldDogZnVuY3Rpb24gKGFyZykge1xuICAgICAgICAgICAgdGhpcy5fZXNjYXBlX2Zvcl9odG1sID0gYXJnO1xuICAgICAgICB9LFxuICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgICAgICBjb25maWd1cmFibGU6IHRydWVcbiAgICB9KTtcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoQW5zaVVwLnByb3RvdHlwZSwgXCJ1cmxfd2hpdGVsaXN0XCIsIHtcbiAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fdXJsX3doaXRlbGlzdDtcbiAgICAgICAgfSxcbiAgICAgICAgc2V0OiBmdW5jdGlvbiAoYXJnKSB7XG4gICAgICAgICAgICB0aGlzLl91cmxfd2hpdGVsaXN0ID0gYXJnO1xuICAgICAgICB9LFxuICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgICAgICBjb25maWd1cmFibGU6IHRydWVcbiAgICB9KTtcbiAgICBBbnNpVXAucHJvdG90eXBlLnNldHVwX3BhbGV0dGVzID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgICB0aGlzLmFuc2lfY29sb3JzID1cbiAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgICAgIHsgcmdiOiBbMCwgMCwgMF0sIGNsYXNzX25hbWU6IFwiYW5zaS1ibGFja1wiIH0sXG4gICAgICAgICAgICAgICAgICAgIHsgcmdiOiBbMTg3LCAwLCAwXSwgY2xhc3NfbmFtZTogXCJhbnNpLXJlZFwiIH0sXG4gICAgICAgICAgICAgICAgICAgIHsgcmdiOiBbMCwgMTg3LCAwXSwgY2xhc3NfbmFtZTogXCJhbnNpLWdyZWVuXCIgfSxcbiAgICAgICAgICAgICAgICAgICAgeyByZ2I6IFsxODcsIDE4NywgMF0sIGNsYXNzX25hbWU6IFwiYW5zaS15ZWxsb3dcIiB9LFxuICAgICAgICAgICAgICAgICAgICB7IHJnYjogWzAsIDAsIDE4N10sIGNsYXNzX25hbWU6IFwiYW5zaS1ibHVlXCIgfSxcbiAgICAgICAgICAgICAgICAgICAgeyByZ2I6IFsxODcsIDAsIDE4N10sIGNsYXNzX25hbWU6IFwiYW5zaS1tYWdlbnRhXCIgfSxcbiAgICAgICAgICAgICAgICAgICAgeyByZ2I6IFswLCAxODcsIDE4N10sIGNsYXNzX25hbWU6IFwiYW5zaS1jeWFuXCIgfSxcbiAgICAgICAgICAgICAgICAgICAgeyByZ2I6IFsyNTUsIDI1NSwgMjU1XSwgY2xhc3NfbmFtZTogXCJhbnNpLXdoaXRlXCIgfVxuICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAgICAgICB7IHJnYjogWzg1LCA4NSwgODVdLCBjbGFzc19uYW1lOiBcImFuc2ktYnJpZ2h0LWJsYWNrXCIgfSxcbiAgICAgICAgICAgICAgICAgICAgeyByZ2I6IFsyNTUsIDg1LCA4NV0sIGNsYXNzX25hbWU6IFwiYW5zaS1icmlnaHQtcmVkXCIgfSxcbiAgICAgICAgICAgICAgICAgICAgeyByZ2I6IFswLCAyNTUsIDBdLCBjbGFzc19uYW1lOiBcImFuc2ktYnJpZ2h0LWdyZWVuXCIgfSxcbiAgICAgICAgICAgICAgICAgICAgeyByZ2I6IFsyNTUsIDI1NSwgODVdLCBjbGFzc19uYW1lOiBcImFuc2ktYnJpZ2h0LXllbGxvd1wiIH0sXG4gICAgICAgICAgICAgICAgICAgIHsgcmdiOiBbODUsIDg1LCAyNTVdLCBjbGFzc19uYW1lOiBcImFuc2ktYnJpZ2h0LWJsdWVcIiB9LFxuICAgICAgICAgICAgICAgICAgICB7IHJnYjogWzI1NSwgODUsIDI1NV0sIGNsYXNzX25hbWU6IFwiYW5zaS1icmlnaHQtbWFnZW50YVwiIH0sXG4gICAgICAgICAgICAgICAgICAgIHsgcmdiOiBbODUsIDI1NSwgMjU1XSwgY2xhc3NfbmFtZTogXCJhbnNpLWJyaWdodC1jeWFuXCIgfSxcbiAgICAgICAgICAgICAgICAgICAgeyByZ2I6IFsyNTUsIDI1NSwgMjU1XSwgY2xhc3NfbmFtZTogXCJhbnNpLWJyaWdodC13aGl0ZVwiIH1cbiAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICBdO1xuICAgICAgICB0aGlzLnBhbGV0dGVfMjU2ID0gW107XG4gICAgICAgIHRoaXMuYW5zaV9jb2xvcnMuZm9yRWFjaChmdW5jdGlvbiAocGFsZXR0ZSkge1xuICAgICAgICAgICAgcGFsZXR0ZS5mb3JFYWNoKGZ1bmN0aW9uIChyZWMpIHtcbiAgICAgICAgICAgICAgICBfdGhpcy5wYWxldHRlXzI1Ni5wdXNoKHJlYyk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgICAgIHZhciBsZXZlbHMgPSBbMCwgOTUsIDEzNSwgMTc1LCAyMTUsIDI1NV07XG4gICAgICAgIGZvciAodmFyIHIgPSAwOyByIDwgNjsgKytyKSB7XG4gICAgICAgICAgICBmb3IgKHZhciBnID0gMDsgZyA8IDY7ICsrZykge1xuICAgICAgICAgICAgICAgIGZvciAodmFyIGIgPSAwOyBiIDwgNjsgKytiKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBjb2wgPSB7IHJnYjogW2xldmVsc1tyXSwgbGV2ZWxzW2ddLCBsZXZlbHNbYl1dLCBjbGFzc19uYW1lOiAndHJ1ZWNvbG9yJyB9O1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnBhbGV0dGVfMjU2LnB1c2goY29sKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgdmFyIGdyZXlfbGV2ZWwgPSA4O1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IDI0OyArK2ksIGdyZXlfbGV2ZWwgKz0gMTApIHtcbiAgICAgICAgICAgIHZhciBncnkgPSB7IHJnYjogW2dyZXlfbGV2ZWwsIGdyZXlfbGV2ZWwsIGdyZXlfbGV2ZWxdLCBjbGFzc19uYW1lOiAndHJ1ZWNvbG9yJyB9O1xuICAgICAgICAgICAgdGhpcy5wYWxldHRlXzI1Ni5wdXNoKGdyeSk7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIEFuc2lVcC5wcm90b3R5cGUuZXNjYXBlX3R4dF9mb3JfaHRtbCA9IGZ1bmN0aW9uICh0eHQpIHtcbiAgICAgICAgcmV0dXJuIHR4dC5yZXBsYWNlKC9bJjw+XS9nbSwgZnVuY3Rpb24gKHN0cikge1xuICAgICAgICAgICAgaWYgKHN0ciA9PT0gXCImXCIpXG4gICAgICAgICAgICAgICAgcmV0dXJuIFwiJmFtcDtcIjtcbiAgICAgICAgICAgIGlmIChzdHIgPT09IFwiPFwiKVxuICAgICAgICAgICAgICAgIHJldHVybiBcIiZsdDtcIjtcbiAgICAgICAgICAgIGlmIChzdHIgPT09IFwiPlwiKVxuICAgICAgICAgICAgICAgIHJldHVybiBcIiZndDtcIjtcbiAgICAgICAgfSk7XG4gICAgfTtcbiAgICBBbnNpVXAucHJvdG90eXBlLmFwcGVuZF9idWZmZXIgPSBmdW5jdGlvbiAodHh0KSB7XG4gICAgICAgIHZhciBzdHIgPSB0aGlzLl9idWZmZXIgKyB0eHQ7XG4gICAgICAgIHRoaXMuX2J1ZmZlciA9IHN0cjtcbiAgICB9O1xuICAgIEFuc2lVcC5wcm90b3R5cGUuZ2V0X25leHRfcGFja2V0ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgcGt0ID0ge1xuICAgICAgICAgICAga2luZDogUGFja2V0S2luZC5FT1MsXG4gICAgICAgICAgICB0ZXh0OiAnJyxcbiAgICAgICAgICAgIHVybDogJydcbiAgICAgICAgfTtcbiAgICAgICAgdmFyIGxlbiA9IHRoaXMuX2J1ZmZlci5sZW5ndGg7XG4gICAgICAgIGlmIChsZW4gPT0gMClcbiAgICAgICAgICAgIHJldHVybiBwa3Q7XG4gICAgICAgIHZhciBwb3MgPSB0aGlzLl9idWZmZXIuaW5kZXhPZihcIlxceDFCXCIpO1xuICAgICAgICBpZiAocG9zID09IC0xKSB7XG4gICAgICAgICAgICBwa3Qua2luZCA9IFBhY2tldEtpbmQuVGV4dDtcbiAgICAgICAgICAgIHBrdC50ZXh0ID0gdGhpcy5fYnVmZmVyO1xuICAgICAgICAgICAgdGhpcy5fYnVmZmVyID0gJyc7XG4gICAgICAgICAgICByZXR1cm4gcGt0O1xuICAgICAgICB9XG4gICAgICAgIGlmIChwb3MgPiAwKSB7XG4gICAgICAgICAgICBwa3Qua2luZCA9IFBhY2tldEtpbmQuVGV4dDtcbiAgICAgICAgICAgIHBrdC50ZXh0ID0gdGhpcy5fYnVmZmVyLnNsaWNlKDAsIHBvcyk7XG4gICAgICAgICAgICB0aGlzLl9idWZmZXIgPSB0aGlzLl9idWZmZXIuc2xpY2UocG9zKTtcbiAgICAgICAgICAgIHJldHVybiBwa3Q7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHBvcyA9PSAwKSB7XG4gICAgICAgICAgICBpZiAobGVuID09IDEpIHtcbiAgICAgICAgICAgICAgICBwa3Qua2luZCA9IFBhY2tldEtpbmQuSW5jb21wbGV0ZTtcbiAgICAgICAgICAgICAgICByZXR1cm4gcGt0O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdmFyIG5leHRfY2hhciA9IHRoaXMuX2J1ZmZlci5jaGFyQXQoMSk7XG4gICAgICAgICAgICBpZiAoKG5leHRfY2hhciAhPSAnWycpICYmIChuZXh0X2NoYXIgIT0gJ10nKSkge1xuICAgICAgICAgICAgICAgIHBrdC5raW5kID0gUGFja2V0S2luZC5FU0M7XG4gICAgICAgICAgICAgICAgcGt0LnRleHQgPSB0aGlzLl9idWZmZXIuc2xpY2UoMCwgMSk7XG4gICAgICAgICAgICAgICAgdGhpcy5fYnVmZmVyID0gdGhpcy5fYnVmZmVyLnNsaWNlKDEpO1xuICAgICAgICAgICAgICAgIHJldHVybiBwa3Q7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAobmV4dF9jaGFyID09ICdbJykge1xuICAgICAgICAgICAgICAgIGlmICghdGhpcy5fY3NpX3JlZ2V4KSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2NzaV9yZWdleCA9IHJneChfX21ha2VUZW1wbGF0ZU9iamVjdChbXCJcXG4gICAgICAgICAgICAgICAgICAgICAgICBeICAgICAgICAgICAgICAgICAgICAgICAgICAgIyBiZWdpbm5pbmcgb2YgbGluZVxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAjXFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICMgRmlyc3QgYXR0ZW1wdFxcbiAgICAgICAgICAgICAgICAgICAgICAgICg/OiAgICAgICAgICAgICAgICAgICAgICAgICAjIGxlZ2FsIHNlcXVlbmNlXFxuICAgICAgICAgICAgICAgICAgICAgICAgICBcXHUwMDFCWyAgICAgICAgICAgICAgICAgICAgICAjIENTSVxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgKFs8LT9dPykgICAgICAgICAgICAgICMgcHJpdmF0ZS1tb2RlIGNoYXJcXG4gICAgICAgICAgICAgICAgICAgICAgICAgIChbZDtdKikgICAgICAgICAgICAgICAgICAgICMgYW55IGRpZ2l0cyBvciBzZW1pY29sb25zXFxuICAgICAgICAgICAgICAgICAgICAgICAgICAoWyAtL10/ICAgICAgICAgICAgICAgIyBhbiBpbnRlcm1lZGlhdGUgbW9kaWZpZXJcXG4gICAgICAgICAgICAgICAgICAgICAgICAgIFtALX5dKSAgICAgICAgICAgICAgICAjIHRoZSBjb21tYW5kXFxuICAgICAgICAgICAgICAgICAgICAgICAgKVxcbiAgICAgICAgICAgICAgICAgICAgICAgIHwgICAgICAgICAgICAgICAgICAgICAgICAgICAjIGFsdGVybmF0ZSAoc2Vjb25kIGF0dGVtcHQpXFxuICAgICAgICAgICAgICAgICAgICAgICAgKD86ICAgICAgICAgICAgICAgICAgICAgICAgICMgaWxsZWdhbCBzZXF1ZW5jZVxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgXFx1MDAxQlsgICAgICAgICAgICAgICAgICAgICAgIyBDU0lcXG4gICAgICAgICAgICAgICAgICAgICAgICAgIFsgLX5dKiAgICAgICAgICAgICAgICAjIGFueXRoaW5nIGxlZ2FsXFxuICAgICAgICAgICAgICAgICAgICAgICAgICAoW1xcMC1cXHUwMDFGOl0pICAgICAgICAgICAgICAjIGFueXRoaW5nIGlsbGVnYWxcXG4gICAgICAgICAgICAgICAgICAgICAgICApXFxuICAgICAgICAgICAgICAgICAgICBcIl0sIFtcIlxcbiAgICAgICAgICAgICAgICAgICAgICAgIF4gICAgICAgICAgICAgICAgICAgICAgICAgICAjIGJlZ2lubmluZyBvZiBsaW5lXFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICNcXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIyBGaXJzdCBhdHRlbXB0XFxuICAgICAgICAgICAgICAgICAgICAgICAgKD86ICAgICAgICAgICAgICAgICAgICAgICAgICMgbGVnYWwgc2VxdWVuY2VcXG4gICAgICAgICAgICAgICAgICAgICAgICAgIFxcXFx4MWJcXFxcWyAgICAgICAgICAgICAgICAgICAgICAjIENTSVxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgKFtcXFxceDNjLVxcXFx4M2ZdPykgICAgICAgICAgICAgICMgcHJpdmF0ZS1tb2RlIGNoYXJcXG4gICAgICAgICAgICAgICAgICAgICAgICAgIChbXFxcXGQ7XSopICAgICAgICAgICAgICAgICAgICAjIGFueSBkaWdpdHMgb3Igc2VtaWNvbG9uc1xcbiAgICAgICAgICAgICAgICAgICAgICAgICAgKFtcXFxceDIwLVxcXFx4MmZdPyAgICAgICAgICAgICAgICMgYW4gaW50ZXJtZWRpYXRlIG1vZGlmaWVyXFxuICAgICAgICAgICAgICAgICAgICAgICAgICBbXFxcXHg0MC1cXFxceDdlXSkgICAgICAgICAgICAgICAgIyB0aGUgY29tbWFuZFxcbiAgICAgICAgICAgICAgICAgICAgICAgIClcXG4gICAgICAgICAgICAgICAgICAgICAgICB8ICAgICAgICAgICAgICAgICAgICAgICAgICAgIyBhbHRlcm5hdGUgKHNlY29uZCBhdHRlbXB0KVxcbiAgICAgICAgICAgICAgICAgICAgICAgICg/OiAgICAgICAgICAgICAgICAgICAgICAgICAjIGlsbGVnYWwgc2VxdWVuY2VcXG4gICAgICAgICAgICAgICAgICAgICAgICAgIFxcXFx4MWJcXFxcWyAgICAgICAgICAgICAgICAgICAgICAjIENTSVxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgW1xcXFx4MjAtXFxcXHg3ZV0qICAgICAgICAgICAgICAgICMgYW55dGhpbmcgbGVnYWxcXG4gICAgICAgICAgICAgICAgICAgICAgICAgIChbXFxcXHgwMC1cXFxceDFmOl0pICAgICAgICAgICAgICAjIGFueXRoaW5nIGlsbGVnYWxcXG4gICAgICAgICAgICAgICAgICAgICAgICApXFxuICAgICAgICAgICAgICAgICAgICBcIl0pKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdmFyIG1hdGNoID0gdGhpcy5fYnVmZmVyLm1hdGNoKHRoaXMuX2NzaV9yZWdleCk7XG4gICAgICAgICAgICAgICAgaWYgKG1hdGNoID09PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgICAgIHBrdC5raW5kID0gUGFja2V0S2luZC5JbmNvbXBsZXRlO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcGt0O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAobWF0Y2hbNF0pIHtcbiAgICAgICAgICAgICAgICAgICAgcGt0LmtpbmQgPSBQYWNrZXRLaW5kLkVTQztcbiAgICAgICAgICAgICAgICAgICAgcGt0LnRleHQgPSB0aGlzLl9idWZmZXIuc2xpY2UoMCwgMSk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2J1ZmZlciA9IHRoaXMuX2J1ZmZlci5zbGljZSgxKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHBrdDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKChtYXRjaFsxXSAhPSAnJykgfHwgKG1hdGNoWzNdICE9ICdtJykpXG4gICAgICAgICAgICAgICAgICAgIHBrdC5raW5kID0gUGFja2V0S2luZC5Vbmtub3duO1xuICAgICAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICAgICAgcGt0LmtpbmQgPSBQYWNrZXRLaW5kLlNHUjtcbiAgICAgICAgICAgICAgICBwa3QudGV4dCA9IG1hdGNoWzJdO1xuICAgICAgICAgICAgICAgIHZhciBycG9zID0gbWF0Y2hbMF0ubGVuZ3RoO1xuICAgICAgICAgICAgICAgIHRoaXMuX2J1ZmZlciA9IHRoaXMuX2J1ZmZlci5zbGljZShycG9zKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gcGt0O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKG5leHRfY2hhciA9PSAnXScpIHtcbiAgICAgICAgICAgICAgICBpZiAobGVuIDwgNCkge1xuICAgICAgICAgICAgICAgICAgICBwa3Qua2luZCA9IFBhY2tldEtpbmQuSW5jb21wbGV0ZTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHBrdDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKCh0aGlzLl9idWZmZXIuY2hhckF0KDIpICE9ICc4JylcbiAgICAgICAgICAgICAgICAgICAgfHwgKHRoaXMuX2J1ZmZlci5jaGFyQXQoMykgIT0gJzsnKSkge1xuICAgICAgICAgICAgICAgICAgICBwa3Qua2luZCA9IFBhY2tldEtpbmQuRVNDO1xuICAgICAgICAgICAgICAgICAgICBwa3QudGV4dCA9IHRoaXMuX2J1ZmZlci5zbGljZSgwLCAxKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fYnVmZmVyID0gdGhpcy5fYnVmZmVyLnNsaWNlKDEpO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcGt0O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAoIXRoaXMuX29zY19zdCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9vc2Nfc3QgPSByZ3hHKF9fbWFrZVRlbXBsYXRlT2JqZWN0KFtcIlxcbiAgICAgICAgICAgICAgICAgICAgICAgICg/OiAgICAgICAgICAgICAgICAgICAgICAgICAjIGxlZ2FsIHNlcXVlbmNlXFxuICAgICAgICAgICAgICAgICAgICAgICAgICAoXFx1MDAxQlxcXFwpICAgICAgICAgICAgICAgICAgICAjIEVTQyAgICAgICAgICAgICAgICAgICAgICAgICAgIHwgICAgICAgICAgICAgICAgICAgICAgICAgICAjIGFsdGVybmF0ZVxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgKFxcdTAwMDcpICAgICAgICAgICAgICAgICAgICAgICMgQkVMICh3aGF0IHh0ZXJtIGRpZClcXG4gICAgICAgICAgICAgICAgICAgICAgICApXFxuICAgICAgICAgICAgICAgICAgICAgICAgfCAgICAgICAgICAgICAgICAgICAgICAgICAgICMgYWx0ZXJuYXRlIChzZWNvbmQgYXR0ZW1wdClcXG4gICAgICAgICAgICAgICAgICAgICAgICAoICAgICAgICAgICAgICAgICAgICAgICAgICAgIyBpbGxlZ2FsIHNlcXVlbmNlXFxuICAgICAgICAgICAgICAgICAgICAgICAgICBbXFwwLVxcdTAwMDZdICAgICAgICAgICAgICAgICAjIGFueXRoaW5nIGlsbGVnYWxcXG4gICAgICAgICAgICAgICAgICAgICAgICAgIHwgICAgICAgICAgICAgICAgICAgICAgICAgICAjIGFsdGVybmF0ZVxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgW1xcYi1cXHUwMDFBXSAgICAgICAgICAgICAgICAgIyBhbnl0aGluZyBpbGxlZ2FsXFxuICAgICAgICAgICAgICAgICAgICAgICAgICB8ICAgICAgICAgICAgICAgICAgICAgICAgICAgIyBhbHRlcm5hdGVcXG4gICAgICAgICAgICAgICAgICAgICAgICAgIFtcXHUwMDFDLVxcdTAwMUZdICAgICAgICAgICAgICAgICAjIGFueXRoaW5nIGlsbGVnYWxcXG4gICAgICAgICAgICAgICAgICAgICAgICApXFxuICAgICAgICAgICAgICAgICAgICBcIl0sIFtcIlxcbiAgICAgICAgICAgICAgICAgICAgICAgICg/OiAgICAgICAgICAgICAgICAgICAgICAgICAjIGxlZ2FsIHNlcXVlbmNlXFxuICAgICAgICAgICAgICAgICAgICAgICAgICAoXFxcXHgxYlxcXFxcXFxcKSAgICAgICAgICAgICAgICAgICAgIyBFU0MgXFxcXFxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgfCAgICAgICAgICAgICAgICAgICAgICAgICAgICMgYWx0ZXJuYXRlXFxuICAgICAgICAgICAgICAgICAgICAgICAgICAoXFxcXHgwNykgICAgICAgICAgICAgICAgICAgICAgIyBCRUwgKHdoYXQgeHRlcm0gZGlkKVxcbiAgICAgICAgICAgICAgICAgICAgICAgIClcXG4gICAgICAgICAgICAgICAgICAgICAgICB8ICAgICAgICAgICAgICAgICAgICAgICAgICAgIyBhbHRlcm5hdGUgKHNlY29uZCBhdHRlbXB0KVxcbiAgICAgICAgICAgICAgICAgICAgICAgICggICAgICAgICAgICAgICAgICAgICAgICAgICAjIGlsbGVnYWwgc2VxdWVuY2VcXG4gICAgICAgICAgICAgICAgICAgICAgICAgIFtcXFxceDAwLVxcXFx4MDZdICAgICAgICAgICAgICAgICAjIGFueXRoaW5nIGlsbGVnYWxcXG4gICAgICAgICAgICAgICAgICAgICAgICAgIHwgICAgICAgICAgICAgICAgICAgICAgICAgICAjIGFsdGVybmF0ZVxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgW1xcXFx4MDgtXFxcXHgxYV0gICAgICAgICAgICAgICAgICMgYW55dGhpbmcgaWxsZWdhbFxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgfCAgICAgICAgICAgICAgICAgICAgICAgICAgICMgYWx0ZXJuYXRlXFxuICAgICAgICAgICAgICAgICAgICAgICAgICBbXFxcXHgxYy1cXFxceDFmXSAgICAgICAgICAgICAgICAgIyBhbnl0aGluZyBpbGxlZ2FsXFxuICAgICAgICAgICAgICAgICAgICAgICAgKVxcbiAgICAgICAgICAgICAgICAgICAgXCJdKSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHRoaXMuX29zY19zdC5sYXN0SW5kZXggPSAwO1xuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIG1hdGNoXzEgPSB0aGlzLl9vc2Nfc3QuZXhlYyh0aGlzLl9idWZmZXIpO1xuICAgICAgICAgICAgICAgICAgICBpZiAobWF0Y2hfMSA9PT0gbnVsbCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcGt0LmtpbmQgPSBQYWNrZXRLaW5kLkluY29tcGxldGU7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gcGt0O1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGlmIChtYXRjaF8xWzNdKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBwa3Qua2luZCA9IFBhY2tldEtpbmQuRVNDO1xuICAgICAgICAgICAgICAgICAgICAgICAgcGt0LnRleHQgPSB0aGlzLl9idWZmZXIuc2xpY2UoMCwgMSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9idWZmZXIgPSB0aGlzLl9idWZmZXIuc2xpY2UoMSk7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gcGt0O1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIG1hdGNoXzIgPSB0aGlzLl9vc2Nfc3QuZXhlYyh0aGlzLl9idWZmZXIpO1xuICAgICAgICAgICAgICAgICAgICBpZiAobWF0Y2hfMiA9PT0gbnVsbCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcGt0LmtpbmQgPSBQYWNrZXRLaW5kLkluY29tcGxldGU7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gcGt0O1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGlmIChtYXRjaF8yWzNdKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBwa3Qua2luZCA9IFBhY2tldEtpbmQuRVNDO1xuICAgICAgICAgICAgICAgICAgICAgICAgcGt0LnRleHQgPSB0aGlzLl9idWZmZXIuc2xpY2UoMCwgMSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9idWZmZXIgPSB0aGlzLl9idWZmZXIuc2xpY2UoMSk7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gcGt0O1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmICghdGhpcy5fb3NjX3JlZ2V4KSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX29zY19yZWdleCA9IHJneChfX21ha2VUZW1wbGF0ZU9iamVjdChbXCJcXG4gICAgICAgICAgICAgICAgICAgICAgICBeICAgICAgICAgICAgICAgICAgICAgICAgICAgIyBiZWdpbm5pbmcgb2YgbGluZVxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAjXFxuICAgICAgICAgICAgICAgICAgICAgICAgXFx1MDAxQl04OyAgICAgICAgICAgICAgICAgICAgIyBPU0MgSHlwZXJsaW5rXFxuICAgICAgICAgICAgICAgICAgICAgICAgWyAtOjwtfl0qICAgICAgICMgcGFyYW1zIChleGNsdWRpbmcgOylcXG4gICAgICAgICAgICAgICAgICAgICAgICA7ICAgICAgICAgICAgICAgICAgICAgICAgICAgIyBlbmQgb2YgcGFyYW1zXFxuICAgICAgICAgICAgICAgICAgICAgICAgKFshLX5dezAsNTEyfSkgICAgICAgICMgVVJMIGNhcHR1cmVcXG4gICAgICAgICAgICAgICAgICAgICAgICAoPzogICAgICAgICAgICAgICAgICAgICAgICAgIyBTVFxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgKD86XFx1MDAxQlxcXFwpICAgICAgICAgICAgICAgICAgIyBFU0MgICAgICAgICAgICAgICAgICAgICAgICAgICB8ICAgICAgICAgICAgICAgICAgICAgICAgICAgIyBhbHRlcm5hdGVcXG4gICAgICAgICAgICAgICAgICAgICAgICAgICg/OlxcdTAwMDcpICAgICAgICAgICAgICAgICAgICAjIEJFTCAod2hhdCB4dGVybSBkaWQpXFxuICAgICAgICAgICAgICAgICAgICAgICAgKVxcbiAgICAgICAgICAgICAgICAgICAgICAgIChbIS1+XSspICAgICAgICAgICAgICAjIFRFWFQgY2FwdHVyZVxcbiAgICAgICAgICAgICAgICAgICAgICAgIFxcdTAwMUJdODs7ICAgICAgICAgICAgICAgICAgICMgT1NDIEh5cGVybGluayBFbmRcXG4gICAgICAgICAgICAgICAgICAgICAgICAoPzogICAgICAgICAgICAgICAgICAgICAgICAgIyBTVFxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgKD86XFx1MDAxQlxcXFwpICAgICAgICAgICAgICAgICAgIyBFU0MgICAgICAgICAgICAgICAgICAgICAgICAgICB8ICAgICAgICAgICAgICAgICAgICAgICAgICAgIyBhbHRlcm5hdGVcXG4gICAgICAgICAgICAgICAgICAgICAgICAgICg/OlxcdTAwMDcpICAgICAgICAgICAgICAgICAgICAjIEJFTCAod2hhdCB4dGVybSBkaWQpXFxuICAgICAgICAgICAgICAgICAgICAgICAgKVxcbiAgICAgICAgICAgICAgICAgICAgXCJdLCBbXCJcXG4gICAgICAgICAgICAgICAgICAgICAgICBeICAgICAgICAgICAgICAgICAgICAgICAgICAgIyBiZWdpbm5pbmcgb2YgbGluZVxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAjXFxuICAgICAgICAgICAgICAgICAgICAgICAgXFxcXHgxYlxcXFxdODsgICAgICAgICAgICAgICAgICAgICMgT1NDIEh5cGVybGlua1xcbiAgICAgICAgICAgICAgICAgICAgICAgIFtcXFxceDIwLVxcXFx4M2FcXFxceDNjLVxcXFx4N2VdKiAgICAgICAjIHBhcmFtcyAoZXhjbHVkaW5nIDspXFxuICAgICAgICAgICAgICAgICAgICAgICAgOyAgICAgICAgICAgICAgICAgICAgICAgICAgICMgZW5kIG9mIHBhcmFtc1xcbiAgICAgICAgICAgICAgICAgICAgICAgIChbXFxcXHgyMS1cXFxceDdlXXswLDUxMn0pICAgICAgICAjIFVSTCBjYXB0dXJlXFxuICAgICAgICAgICAgICAgICAgICAgICAgKD86ICAgICAgICAgICAgICAgICAgICAgICAgICMgU1RcXG4gICAgICAgICAgICAgICAgICAgICAgICAgICg/OlxcXFx4MWJcXFxcXFxcXCkgICAgICAgICAgICAgICAgICAjIEVTQyBcXFxcXFxuICAgICAgICAgICAgICAgICAgICAgICAgICB8ICAgICAgICAgICAgICAgICAgICAgICAgICAgIyBhbHRlcm5hdGVcXG4gICAgICAgICAgICAgICAgICAgICAgICAgICg/OlxcXFx4MDcpICAgICAgICAgICAgICAgICAgICAjIEJFTCAod2hhdCB4dGVybSBkaWQpXFxuICAgICAgICAgICAgICAgICAgICAgICAgKVxcbiAgICAgICAgICAgICAgICAgICAgICAgIChbXFxcXHgyMS1cXFxceDdlXSspICAgICAgICAgICAgICAjIFRFWFQgY2FwdHVyZVxcbiAgICAgICAgICAgICAgICAgICAgICAgIFxcXFx4MWJcXFxcXTg7OyAgICAgICAgICAgICAgICAgICAjIE9TQyBIeXBlcmxpbmsgRW5kXFxuICAgICAgICAgICAgICAgICAgICAgICAgKD86ICAgICAgICAgICAgICAgICAgICAgICAgICMgU1RcXG4gICAgICAgICAgICAgICAgICAgICAgICAgICg/OlxcXFx4MWJcXFxcXFxcXCkgICAgICAgICAgICAgICAgICAjIEVTQyBcXFxcXFxuICAgICAgICAgICAgICAgICAgICAgICAgICB8ICAgICAgICAgICAgICAgICAgICAgICAgICAgIyBhbHRlcm5hdGVcXG4gICAgICAgICAgICAgICAgICAgICAgICAgICg/OlxcXFx4MDcpICAgICAgICAgICAgICAgICAgICAjIEJFTCAod2hhdCB4dGVybSBkaWQpXFxuICAgICAgICAgICAgICAgICAgICAgICAgKVxcbiAgICAgICAgICAgICAgICAgICAgXCJdKSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHZhciBtYXRjaCA9IHRoaXMuX2J1ZmZlci5tYXRjaCh0aGlzLl9vc2NfcmVnZXgpO1xuICAgICAgICAgICAgICAgIGlmIChtYXRjaCA9PT0gbnVsbCkge1xuICAgICAgICAgICAgICAgICAgICBwa3Qua2luZCA9IFBhY2tldEtpbmQuRVNDO1xuICAgICAgICAgICAgICAgICAgICBwa3QudGV4dCA9IHRoaXMuX2J1ZmZlci5zbGljZSgwLCAxKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fYnVmZmVyID0gdGhpcy5fYnVmZmVyLnNsaWNlKDEpO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcGt0O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBwa3Qua2luZCA9IFBhY2tldEtpbmQuT1NDVVJMO1xuICAgICAgICAgICAgICAgIHBrdC51cmwgPSBtYXRjaFsxXTtcbiAgICAgICAgICAgICAgICBwa3QudGV4dCA9IG1hdGNoWzJdO1xuICAgICAgICAgICAgICAgIHZhciBycG9zID0gbWF0Y2hbMF0ubGVuZ3RoO1xuICAgICAgICAgICAgICAgIHRoaXMuX2J1ZmZlciA9IHRoaXMuX2J1ZmZlci5zbGljZShycG9zKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gcGt0O1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfTtcbiAgICBBbnNpVXAucHJvdG90eXBlLmFuc2lfdG9faHRtbCA9IGZ1bmN0aW9uICh0eHQpIHtcbiAgICAgICAgdGhpcy5hcHBlbmRfYnVmZmVyKHR4dCk7XG4gICAgICAgIHZhciBibG9ja3MgPSBbXTtcbiAgICAgICAgd2hpbGUgKHRydWUpIHtcbiAgICAgICAgICAgIHZhciBwYWNrZXQgPSB0aGlzLmdldF9uZXh0X3BhY2tldCgpO1xuICAgICAgICAgICAgaWYgKChwYWNrZXQua2luZCA9PSBQYWNrZXRLaW5kLkVPUylcbiAgICAgICAgICAgICAgICB8fCAocGFja2V0LmtpbmQgPT0gUGFja2V0S2luZC5JbmNvbXBsZXRlKSlcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGlmICgocGFja2V0LmtpbmQgPT0gUGFja2V0S2luZC5FU0MpXG4gICAgICAgICAgICAgICAgfHwgKHBhY2tldC5raW5kID09IFBhY2tldEtpbmQuVW5rbm93bikpXG4gICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICBpZiAocGFja2V0LmtpbmQgPT0gUGFja2V0S2luZC5UZXh0KVxuICAgICAgICAgICAgICAgIGJsb2Nrcy5wdXNoKHRoaXMudHJhbnNmb3JtX3RvX2h0bWwodGhpcy53aXRoX3N0YXRlKHBhY2tldCkpKTtcbiAgICAgICAgICAgIGVsc2UgaWYgKHBhY2tldC5raW5kID09IFBhY2tldEtpbmQuU0dSKVxuICAgICAgICAgICAgICAgIHRoaXMucHJvY2Vzc19hbnNpKHBhY2tldCk7XG4gICAgICAgICAgICBlbHNlIGlmIChwYWNrZXQua2luZCA9PSBQYWNrZXRLaW5kLk9TQ1VSTClcbiAgICAgICAgICAgICAgICBibG9ja3MucHVzaCh0aGlzLnByb2Nlc3NfaHlwZXJsaW5rKHBhY2tldCkpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBibG9ja3Muam9pbihcIlwiKTtcbiAgICB9O1xuICAgIEFuc2lVcC5wcm90b3R5cGUud2l0aF9zdGF0ZSA9IGZ1bmN0aW9uIChwa3QpIHtcbiAgICAgICAgcmV0dXJuIHsgYm9sZDogdGhpcy5ib2xkLCBmZzogdGhpcy5mZywgYmc6IHRoaXMuYmcsIHRleHQ6IHBrdC50ZXh0IH07XG4gICAgfTtcbiAgICBBbnNpVXAucHJvdG90eXBlLnByb2Nlc3NfYW5zaSA9IGZ1bmN0aW9uIChwa3QpIHtcbiAgICAgICAgdmFyIHNncl9jbWRzID0gcGt0LnRleHQuc3BsaXQoJzsnKTtcbiAgICAgICAgd2hpbGUgKHNncl9jbWRzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIHZhciBzZ3JfY21kX3N0ciA9IHNncl9jbWRzLnNoaWZ0KCk7XG4gICAgICAgICAgICB2YXIgbnVtID0gcGFyc2VJbnQoc2dyX2NtZF9zdHIsIDEwKTtcbiAgICAgICAgICAgIGlmIChpc05hTihudW0pIHx8IG51bSA9PT0gMCkge1xuICAgICAgICAgICAgICAgIHRoaXMuZmcgPSB0aGlzLmJnID0gbnVsbDtcbiAgICAgICAgICAgICAgICB0aGlzLmJvbGQgPSBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKG51bSA9PT0gMSkge1xuICAgICAgICAgICAgICAgIHRoaXMuYm9sZCA9IHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmIChudW0gPT09IDIyKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5ib2xkID0gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmIChudW0gPT09IDM5KSB7XG4gICAgICAgICAgICAgICAgdGhpcy5mZyA9IG51bGw7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmIChudW0gPT09IDQ5KSB7XG4gICAgICAgICAgICAgICAgdGhpcy5iZyA9IG51bGw7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmICgobnVtID49IDMwKSAmJiAobnVtIDwgMzgpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5mZyA9IHRoaXMuYW5zaV9jb2xvcnNbMF1bKG51bSAtIDMwKV07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmICgobnVtID49IDQwKSAmJiAobnVtIDwgNDgpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5iZyA9IHRoaXMuYW5zaV9jb2xvcnNbMF1bKG51bSAtIDQwKV07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmICgobnVtID49IDkwKSAmJiAobnVtIDwgOTgpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5mZyA9IHRoaXMuYW5zaV9jb2xvcnNbMV1bKG51bSAtIDkwKV07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmICgobnVtID49IDEwMCkgJiYgKG51bSA8IDEwOCkpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmJnID0gdGhpcy5hbnNpX2NvbG9yc1sxXVsobnVtIC0gMTAwKV07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmIChudW0gPT09IDM4IHx8IG51bSA9PT0gNDgpIHtcbiAgICAgICAgICAgICAgICBpZiAoc2dyX2NtZHMubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgaXNfZm9yZWdyb3VuZCA9IChudW0gPT09IDM4KTtcbiAgICAgICAgICAgICAgICAgICAgdmFyIG1vZGVfY21kID0gc2dyX2NtZHMuc2hpZnQoKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKG1vZGVfY21kID09PSAnNScgJiYgc2dyX2NtZHMubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHBhbGV0dGVfaW5kZXggPSBwYXJzZUludChzZ3JfY21kcy5zaGlmdCgpLCAxMCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAocGFsZXR0ZV9pbmRleCA+PSAwICYmIHBhbGV0dGVfaW5kZXggPD0gMjU1KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGlzX2ZvcmVncm91bmQpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZmcgPSB0aGlzLnBhbGV0dGVfMjU2W3BhbGV0dGVfaW5kZXhdO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5iZyA9IHRoaXMucGFsZXR0ZV8yNTZbcGFsZXR0ZV9pbmRleF07XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgaWYgKG1vZGVfY21kID09PSAnMicgJiYgc2dyX2NtZHMubGVuZ3RoID4gMikge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHIgPSBwYXJzZUludChzZ3JfY21kcy5zaGlmdCgpLCAxMCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgZyA9IHBhcnNlSW50KHNncl9jbWRzLnNoaWZ0KCksIDEwKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBiID0gcGFyc2VJbnQoc2dyX2NtZHMuc2hpZnQoKSwgMTApO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKChyID49IDAgJiYgciA8PSAyNTUpICYmIChnID49IDAgJiYgZyA8PSAyNTUpICYmIChiID49IDAgJiYgYiA8PSAyNTUpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGMgPSB7IHJnYjogW3IsIGcsIGJdLCBjbGFzc19uYW1lOiAndHJ1ZWNvbG9yJyB9O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpc19mb3JlZ3JvdW5kKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmZnID0gYztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuYmcgPSBjO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfTtcbiAgICBBbnNpVXAucHJvdG90eXBlLnRyYW5zZm9ybV90b19odG1sID0gZnVuY3Rpb24gKGZyYWdtZW50KSB7XG4gICAgICAgIHZhciB0eHQgPSBmcmFnbWVudC50ZXh0O1xuICAgICAgICBpZiAodHh0Lmxlbmd0aCA9PT0gMClcbiAgICAgICAgICAgIHJldHVybiB0eHQ7XG4gICAgICAgIGlmICh0aGlzLl9lc2NhcGVfZm9yX2h0bWwpXG4gICAgICAgICAgICB0eHQgPSB0aGlzLmVzY2FwZV90eHRfZm9yX2h0bWwodHh0KTtcbiAgICAgICAgaWYgKCFmcmFnbWVudC5ib2xkICYmIGZyYWdtZW50LmZnID09PSBudWxsICYmIGZyYWdtZW50LmJnID09PSBudWxsKVxuICAgICAgICAgICAgcmV0dXJuIHR4dDtcbiAgICAgICAgdmFyIHN0eWxlcyA9IFtdO1xuICAgICAgICB2YXIgY2xhc3NlcyA9IFtdO1xuICAgICAgICB2YXIgZmcgPSBmcmFnbWVudC5mZztcbiAgICAgICAgdmFyIGJnID0gZnJhZ21lbnQuYmc7XG4gICAgICAgIGlmIChmcmFnbWVudC5ib2xkKVxuICAgICAgICAgICAgc3R5bGVzLnB1c2goJ2ZvbnQtd2VpZ2h0OmJvbGQnKTtcbiAgICAgICAgaWYgKCF0aGlzLl91c2VfY2xhc3Nlcykge1xuICAgICAgICAgICAgaWYgKGZnKVxuICAgICAgICAgICAgICAgIHN0eWxlcy5wdXNoKFwiY29sb3I6cmdiKFwiICsgZmcucmdiLmpvaW4oJywnKSArIFwiKVwiKTtcbiAgICAgICAgICAgIGlmIChiZylcbiAgICAgICAgICAgICAgICBzdHlsZXMucHVzaChcImJhY2tncm91bmQtY29sb3I6cmdiKFwiICsgYmcucmdiICsgXCIpXCIpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgaWYgKGZnKSB7XG4gICAgICAgICAgICAgICAgaWYgKGZnLmNsYXNzX25hbWUgIT09ICd0cnVlY29sb3InKSB7XG4gICAgICAgICAgICAgICAgICAgIGNsYXNzZXMucHVzaChmZy5jbGFzc19uYW1lICsgXCItZmdcIik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBzdHlsZXMucHVzaChcImNvbG9yOnJnYihcIiArIGZnLnJnYi5qb2luKCcsJykgKyBcIilcIik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGJnKSB7XG4gICAgICAgICAgICAgICAgaWYgKGJnLmNsYXNzX25hbWUgIT09ICd0cnVlY29sb3InKSB7XG4gICAgICAgICAgICAgICAgICAgIGNsYXNzZXMucHVzaChiZy5jbGFzc19uYW1lICsgXCItYmdcIik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBzdHlsZXMucHVzaChcImJhY2tncm91bmQtY29sb3I6cmdiKFwiICsgYmcucmdiLmpvaW4oJywnKSArIFwiKVwiKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgdmFyIGNsYXNzX3N0cmluZyA9ICcnO1xuICAgICAgICB2YXIgc3R5bGVfc3RyaW5nID0gJyc7XG4gICAgICAgIGlmIChjbGFzc2VzLmxlbmd0aClcbiAgICAgICAgICAgIGNsYXNzX3N0cmluZyA9IFwiIGNsYXNzPVxcXCJcIiArIGNsYXNzZXMuam9pbignICcpICsgXCJcXFwiXCI7XG4gICAgICAgIGlmIChzdHlsZXMubGVuZ3RoKVxuICAgICAgICAgICAgc3R5bGVfc3RyaW5nID0gXCIgc3R5bGU9XFxcIlwiICsgc3R5bGVzLmpvaW4oJzsnKSArIFwiXFxcIlwiO1xuICAgICAgICByZXR1cm4gXCI8c3BhblwiICsgc3R5bGVfc3RyaW5nICsgY2xhc3Nfc3RyaW5nICsgXCI+XCIgKyB0eHQgKyBcIjwvc3Bhbj5cIjtcbiAgICB9O1xuICAgIDtcbiAgICBBbnNpVXAucHJvdG90eXBlLnByb2Nlc3NfaHlwZXJsaW5rID0gZnVuY3Rpb24gKHBrdCkge1xuICAgICAgICB2YXIgcGFydHMgPSBwa3QudXJsLnNwbGl0KCc6Jyk7XG4gICAgICAgIGlmIChwYXJ0cy5sZW5ndGggPCAxKVxuICAgICAgICAgICAgcmV0dXJuICcnO1xuICAgICAgICBpZiAoIXRoaXMuX3VybF93aGl0ZWxpc3RbcGFydHNbMF1dKVxuICAgICAgICAgICAgcmV0dXJuICcnO1xuICAgICAgICB2YXIgcmVzdWx0ID0gXCI8YSBocmVmPVxcXCJcIiArIHRoaXMuZXNjYXBlX3R4dF9mb3JfaHRtbChwa3QudXJsKSArIFwiXFxcIj5cIiArIHRoaXMuZXNjYXBlX3R4dF9mb3JfaHRtbChwa3QudGV4dCkgKyBcIjwvYT5cIjtcbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9O1xuICAgIHJldHVybiBBbnNpVXA7XG59KCkpO1xuZnVuY3Rpb24gcmd4KHRtcGxPYmopIHtcbiAgICB2YXIgc3Vic3QgPSBbXTtcbiAgICBmb3IgKHZhciBfaSA9IDE7IF9pIDwgYXJndW1lbnRzLmxlbmd0aDsgX2krKykge1xuICAgICAgICBzdWJzdFtfaSAtIDFdID0gYXJndW1lbnRzW19pXTtcbiAgICB9XG4gICAgdmFyIHJlZ2V4VGV4dCA9IHRtcGxPYmoucmF3WzBdO1xuICAgIHZhciB3c3JneCA9IC9eXFxzK3xcXHMrXFxufFxccyojW1xcc1xcU10qP1xcbnxcXG4vZ207XG4gICAgdmFyIHR4dDIgPSByZWdleFRleHQucmVwbGFjZSh3c3JneCwgJycpO1xuICAgIHJldHVybiBuZXcgUmVnRXhwKHR4dDIpO1xufVxuZnVuY3Rpb24gcmd4Ryh0bXBsT2JqKSB7XG4gICAgdmFyIHN1YnN0ID0gW107XG4gICAgZm9yICh2YXIgX2kgPSAxOyBfaSA8IGFyZ3VtZW50cy5sZW5ndGg7IF9pKyspIHtcbiAgICAgICAgc3Vic3RbX2kgLSAxXSA9IGFyZ3VtZW50c1tfaV07XG4gICAgfVxuICAgIHZhciByZWdleFRleHQgPSB0bXBsT2JqLnJhd1swXTtcbiAgICB2YXIgd3NyZ3ggPSAvXlxccyt8XFxzK1xcbnxcXHMqI1tcXHNcXFNdKj9cXG58XFxuL2dtO1xuICAgIHZhciB0eHQyID0gcmVnZXhUZXh0LnJlcGxhY2Uod3NyZ3gsICcnKTtcbiAgICByZXR1cm4gbmV3IFJlZ0V4cCh0eHQyLCAnZycpO1xufVxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9YW5zaV91cC5qcy5tYXBcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG4gICAgZXhwb3J0cy5kZWZhdWx0ID0gQW5zaVVwO1xufSkpO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vbm9kZV9tb2R1bGVzL2Fuc2lfdXAvYW5zaV91cC5qcyIsImltcG9ydCB7IFNlcnZpY2UgfSBmcm9tIFwiLi4vY29tbW9uL2FwaVwiO1xuXG5jb25zdCBCQVNFX1VSTCA9IFwiL3plcm9ib3QvYWxlcnRhL2FjdG9ycy9hbGVydGFcIjtcblxuY2xhc3MgQWxlcnRzU2VydmljZSBleHRlbmRzIFNlcnZpY2Uge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICBzdXBlcihCQVNFX1VSTCk7XG4gICAgfVxuXG4gICAgbGlzdCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0Q2FsbChcImxpc3RfYWxlcnRzXCIpO1xuICAgIH1cblxuICAgIGRlbGV0ZShpZGVudGlmaWVycykge1xuICAgICAgICByZXR1cm4gdGhpcy5wb3N0Q2FsbChcImRlbGV0ZV9hbGVydHNcIiwge1xuICAgICAgICAgICAgaWRlbnRpZmllcnM6IGlkZW50aWZpZXJzXG4gICAgICAgIH0pO1xuICAgIH1cbn1cblxuZXhwb3J0IGNvbnN0IGFsZXJ0cyA9IG5ldyBBbGVydHNTZXJ2aWNlKCk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zb3VyY2VzL3NlcnZpY2VzL2FsZXJ0cy5qcyIsImltcG9ydCB7IFNlcnZpY2UgfSBmcm9tIFwiLi4vY29tbW9uL2FwaVwiO1xuXG5jb25zdCBCQVNFX1VSTCA9IFwiL3plcm9ib3QvYWRtaW4vYWN0b3JzL2xvZ3NcIjtcblxuY2xhc3MgTG9nc1NlcnZpY2UgZXh0ZW5kcyBTZXJ2aWNlIHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgc3VwZXIoQkFTRV9VUkwpO1xuICAgIH1cblxuICAgIGxpc3RBcHBzKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5nZXRDYWxsKFwibGlzdF9hcHBzXCIpO1xuICAgIH1cblxuICAgIGxpc3QoYXBwTmFtZSwgbG9nSWQpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucG9zdENhbGwoXCJsaXN0XCIsIHtcbiAgICAgICAgICAgIGFwcG5hbWU6IGFwcE5hbWUsXG4gICAgICAgICAgICBpZF9mcm9tOiBsb2dJZFxuICAgICAgICB9KTtcbiAgICB9XG59XG5cbmV4cG9ydCBjb25zdCBsb2dzID0gbmV3IExvZ3NTZXJ2aWNlKCk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zb3VyY2VzL3NlcnZpY2VzL2xvZ3MuanMiLCJ2YXIgbWFwID0ge1xuXHRcIi4vZW5cIjogMjYsXG5cdFwiLi9lbi5qc1wiOiAyNlxufTtcbmZ1bmN0aW9uIHdlYnBhY2tDb250ZXh0KHJlcSkge1xuXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyh3ZWJwYWNrQ29udGV4dFJlc29sdmUocmVxKSk7XG59O1xuZnVuY3Rpb24gd2VicGFja0NvbnRleHRSZXNvbHZlKHJlcSkge1xuXHR2YXIgaWQgPSBtYXBbcmVxXTtcblx0aWYoIShpZCArIDEpKSAvLyBjaGVjayBmb3IgbnVtYmVyIG9yIHN0cmluZ1xuXHRcdHRocm93IG5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIgKyByZXEgKyBcIicuXCIpO1xuXHRyZXR1cm4gaWQ7XG59O1xud2VicGFja0NvbnRleHQua2V5cyA9IGZ1bmN0aW9uIHdlYnBhY2tDb250ZXh0S2V5cygpIHtcblx0cmV0dXJuIE9iamVjdC5rZXlzKG1hcCk7XG59O1xud2VicGFja0NvbnRleHQucmVzb2x2ZSA9IHdlYnBhY2tDb250ZXh0UmVzb2x2ZTtcbm1vZHVsZS5leHBvcnRzID0gd2VicGFja0NvbnRleHQ7XG53ZWJwYWNrQ29udGV4dC5pZCA9IDMzO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vc291cmNlcy9sb2NhbGVzIF5cXC5cXC8uKiRcbi8vIG1vZHVsZSBpZCA9IDMzXG4vLyBtb2R1bGUgY2h1bmtzID0gMCJdLCJzb3VyY2VSb290IjoiIn0=
