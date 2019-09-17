
(function(l, i, v, e) { v = l.createElement(i); v.async = 1; v.src = '//' + (location.host || 'localhost').split(':')[0] + ':35729/livereload.js?snipver=1'; e = l.getElementsByTagName(i)[0]; e.parentNode.insertBefore(v, e)})(document, 'script');
var app = (function () {
    'use strict';

    function noop() { }
    function add_location(element, file, line, column, char) {
        element.__svelte_meta = {
            loc: { file, line, column, char }
        };
    }
    function run(fn) {
        return fn();
    }
    function blank_object() {
        return Object.create(null);
    }
    function run_all(fns) {
        fns.forEach(run);
    }
    function is_function(thing) {
        return typeof thing === 'function';
    }
    function safe_not_equal(a, b) {
        return a != a ? b == b : a !== b || ((a && typeof a === 'object') || typeof a === 'function');
    }
    function validate_store(store, name) {
        if (!store || typeof store.subscribe !== 'function') {
            throw new Error(`'${name}' is not a store with a 'subscribe' method`);
        }
    }
    function subscribe(store, callback) {
        const unsub = store.subscribe(callback);
        return unsub.unsubscribe ? () => unsub.unsubscribe() : unsub;
    }
    function component_subscribe(component, store, callback) {
        component.$$.on_destroy.push(subscribe(store, callback));
    }

    function append(target, node) {
        target.appendChild(node);
    }
    function insert(target, node, anchor) {
        target.insertBefore(node, anchor || null);
    }
    function detach(node) {
        node.parentNode.removeChild(node);
    }
    function destroy_each(iterations, detaching) {
        for (let i = 0; i < iterations.length; i += 1) {
            if (iterations[i])
                iterations[i].d(detaching);
        }
    }
    function element(name) {
        return document.createElement(name);
    }
    function text(data) {
        return document.createTextNode(data);
    }
    function space() {
        return text(' ');
    }
    function empty() {
        return text('');
    }
    function attr(node, attribute, value) {
        if (value == null)
            node.removeAttribute(attribute);
        else
            node.setAttribute(attribute, value);
    }
    function children(element) {
        return Array.from(element.childNodes);
    }
    function custom_event(type, detail) {
        const e = document.createEvent('CustomEvent');
        e.initCustomEvent(type, false, false, detail);
        return e;
    }

    let current_component;
    function set_current_component(component) {
        current_component = component;
    }
    function get_current_component() {
        if (!current_component)
            throw new Error(`Function called outside component initialization`);
        return current_component;
    }
    function onMount(fn) {
        get_current_component().$$.on_mount.push(fn);
    }

    const dirty_components = [];
    const binding_callbacks = [];
    const render_callbacks = [];
    const flush_callbacks = [];
    const resolved_promise = Promise.resolve();
    let update_scheduled = false;
    function schedule_update() {
        if (!update_scheduled) {
            update_scheduled = true;
            resolved_promise.then(flush);
        }
    }
    function add_render_callback(fn) {
        render_callbacks.push(fn);
    }
    function flush() {
        const seen_callbacks = new Set();
        do {
            // first, call beforeUpdate functions
            // and update components
            while (dirty_components.length) {
                const component = dirty_components.shift();
                set_current_component(component);
                update(component.$$);
            }
            while (binding_callbacks.length)
                binding_callbacks.pop()();
            // then, once components are updated, call
            // afterUpdate functions. This may cause
            // subsequent updates...
            for (let i = 0; i < render_callbacks.length; i += 1) {
                const callback = render_callbacks[i];
                if (!seen_callbacks.has(callback)) {
                    callback();
                    // ...so guard against infinite loops
                    seen_callbacks.add(callback);
                }
            }
            render_callbacks.length = 0;
        } while (dirty_components.length);
        while (flush_callbacks.length) {
            flush_callbacks.pop()();
        }
        update_scheduled = false;
    }
    function update($$) {
        if ($$.fragment) {
            $$.update($$.dirty);
            run_all($$.before_update);
            $$.fragment.p($$.dirty, $$.ctx);
            $$.dirty = null;
            $$.after_update.forEach(add_render_callback);
        }
    }
    const outroing = new Set();
    let outros;
    function group_outros() {
        outros = {
            r: 0,
            c: [],
            p: outros // parent group
        };
    }
    function check_outros() {
        if (!outros.r) {
            run_all(outros.c);
        }
        outros = outros.p;
    }
    function transition_in(block, local) {
        if (block && block.i) {
            outroing.delete(block);
            block.i(local);
        }
    }
    function transition_out(block, local, detach, callback) {
        if (block && block.o) {
            if (outroing.has(block))
                return;
            outroing.add(block);
            outros.c.push(() => {
                outroing.delete(block);
                if (callback) {
                    if (detach)
                        block.d(1);
                    callback();
                }
            });
            block.o(local);
        }
    }

    const globals = (typeof window !== 'undefined' ? window : global);
    function mount_component(component, target, anchor) {
        const { fragment, on_mount, on_destroy, after_update } = component.$$;
        fragment.m(target, anchor);
        // onMount happens before the initial afterUpdate
        add_render_callback(() => {
            const new_on_destroy = on_mount.map(run).filter(is_function);
            if (on_destroy) {
                on_destroy.push(...new_on_destroy);
            }
            else {
                // Edge case - component was destroyed immediately,
                // most likely as a result of a binding initialising
                run_all(new_on_destroy);
            }
            component.$$.on_mount = [];
        });
        after_update.forEach(add_render_callback);
    }
    function destroy_component(component, detaching) {
        if (component.$$.fragment) {
            run_all(component.$$.on_destroy);
            component.$$.fragment.d(detaching);
            // TODO null out other refs, including component.$$ (but need to
            // preserve final state?)
            component.$$.on_destroy = component.$$.fragment = null;
            component.$$.ctx = {};
        }
    }
    function make_dirty(component, key) {
        if (!component.$$.dirty) {
            dirty_components.push(component);
            schedule_update();
            component.$$.dirty = blank_object();
        }
        component.$$.dirty[key] = true;
    }
    function init(component, options, instance, create_fragment, not_equal, prop_names) {
        const parent_component = current_component;
        set_current_component(component);
        const props = options.props || {};
        const $$ = component.$$ = {
            fragment: null,
            ctx: null,
            // state
            props: prop_names,
            update: noop,
            not_equal,
            bound: blank_object(),
            // lifecycle
            on_mount: [],
            on_destroy: [],
            before_update: [],
            after_update: [],
            context: new Map(parent_component ? parent_component.$$.context : []),
            // everything else
            callbacks: blank_object(),
            dirty: null
        };
        let ready = false;
        $$.ctx = instance
            ? instance(component, props, (key, ret, value = ret) => {
                if ($$.ctx && not_equal($$.ctx[key], $$.ctx[key] = value)) {
                    if ($$.bound[key])
                        $$.bound[key](value);
                    if (ready)
                        make_dirty(component, key);
                }
                return ret;
            })
            : props;
        $$.update();
        ready = true;
        run_all($$.before_update);
        $$.fragment = create_fragment($$.ctx);
        if (options.target) {
            if (options.hydrate) {
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                $$.fragment.l(children(options.target));
            }
            else {
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                $$.fragment.c();
            }
            if (options.intro)
                transition_in(component.$$.fragment);
            mount_component(component, options.target, options.anchor);
            flush();
        }
        set_current_component(parent_component);
    }
    let SvelteElement;
    if (typeof HTMLElement !== 'undefined') {
        SvelteElement = class extends HTMLElement {
            constructor() {
                super();
                this.attachShadow({ mode: 'open' });
            }
            connectedCallback() {
                // @ts-ignore todo: improve typings
                for (const key in this.$$.slotted) {
                    // @ts-ignore todo: improve typings
                    this.appendChild(this.$$.slotted[key]);
                }
            }
            attributeChangedCallback(attr, _oldValue, newValue) {
                this[attr] = newValue;
            }
            $destroy() {
                destroy_component(this, 1);
                this.$destroy = noop;
            }
            $on(type, callback) {
                // TODO should this delegate to addEventListener?
                const callbacks = (this.$$.callbacks[type] || (this.$$.callbacks[type] = []));
                callbacks.push(callback);
                return () => {
                    const index = callbacks.indexOf(callback);
                    if (index !== -1)
                        callbacks.splice(index, 1);
                };
            }
            $set() {
                // overridden by instance, if it has props
            }
        };
    }
    class SvelteComponent {
        $destroy() {
            destroy_component(this, 1);
            this.$destroy = noop;
        }
        $on(type, callback) {
            const callbacks = (this.$$.callbacks[type] || (this.$$.callbacks[type] = []));
            callbacks.push(callback);
            return () => {
                const index = callbacks.indexOf(callback);
                if (index !== -1)
                    callbacks.splice(index, 1);
            };
        }
        $set() {
            // overridden by instance, if it has props
        }
    }

    function dispatch_dev(type, detail) {
        document.dispatchEvent(custom_event(type, detail));
    }
    function append_dev(target, node) {
        dispatch_dev("SvelteDOMInsert", { target, node });
        append(target, node);
    }
    function insert_dev(target, node, anchor) {
        dispatch_dev("SvelteDOMInsert", { target, node, anchor });
        insert(target, node, anchor);
    }
    function detach_dev(node) {
        dispatch_dev("SvelteDOMRemove", { node });
        detach(node);
    }
    function attr_dev(node, attribute, value) {
        attr(node, attribute, value);
        if (value == null)
            dispatch_dev("SvelteDOMRemoveAttribute", { node, attribute });
        else
            dispatch_dev("SvelteDOMSetAttribute", { node, attribute, value });
    }
    function set_data_dev(text, data) {
        data = '' + data;
        if (text.data === data)
            return;
        dispatch_dev("SvelteDOMSetData", { node: text, data });
        text.data = data;
    }
    class SvelteComponentDev extends SvelteComponent {
        constructor(options) {
            if (!options || (!options.target && !options.$$inline)) {
                throw new Error(`'target' is a required option`);
            }
            super();
        }
        $destroy() {
            super.$destroy();
            this.$destroy = () => {
                console.warn(`Component was already destroyed`); // eslint-disable-line no-console
            };
        }
    }

    /* src/components/Nav.svelte generated by Svelte v3.12.0 */

    function create_fragment(ctx) {
    	var t;

    	const block = {
    		c: function create() {
    			t = text("NAV");
    		},

    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},

    		m: function mount(target, anchor) {
    			insert_dev(target, t, anchor);
    		},

    		p: noop,
    		i: noop,
    		o: noop,

    		d: function destroy(detaching) {
    			if (detaching) {
    				detach_dev(t);
    			}
    		}
    	};
    	dispatch_dev("SvelteRegisterBlock", { block, id: create_fragment.name, type: "component", source: "", ctx });
    	return block;
    }

    class Nav extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, null, create_fragment, safe_not_equal, []);
    		dispatch_dev("SvelteRegisterComponent", { component: this, tagName: "Nav", options, id: create_fragment.name });
    	}
    }

    const subscriber_queue = [];
    /**
     * Creates a `Readable` store that allows reading by subscription.
     * @param value initial value
     * @param {StartStopNotifier}start start and stop notifications for subscriptions
     */
    function readable(value, start) {
        return {
            subscribe: writable(value, start).subscribe,
        };
    }
    /**
     * Create a `Writable` store that allows both updating and reading by subscription.
     * @param {*=}value initial value
     * @param {StartStopNotifier=}start start and stop notifications for subscriptions
     */
    function writable(value, start = noop) {
        let stop;
        const subscribers = [];
        function set(new_value) {
            if (safe_not_equal(value, new_value)) {
                value = new_value;
                if (stop) { // store is ready
                    const run_queue = !subscriber_queue.length;
                    for (let i = 0; i < subscribers.length; i += 1) {
                        const s = subscribers[i];
                        s[1]();
                        subscriber_queue.push(s, value);
                    }
                    if (run_queue) {
                        for (let i = 0; i < subscriber_queue.length; i += 2) {
                            subscriber_queue[i][0](subscriber_queue[i + 1]);
                        }
                        subscriber_queue.length = 0;
                    }
                }
            }
        }
        function update(fn) {
            set(fn(value));
        }
        function subscribe(run, invalidate = noop) {
            const subscriber = [run, invalidate];
            subscribers.push(subscriber);
            if (subscribers.length === 1) {
                stop = start(set) || noop;
            }
            run(value);
            return () => {
                const index = subscribers.indexOf(subscriber);
                if (index !== -1) {
                    subscribers.splice(index, 1);
                }
                if (subscribers.length === 0) {
                    stop();
                    stop = null;
                }
            };
        }
        return { set, update, subscribe };
    }
    /**
     * Derived value store by synchronizing one or more readable stores and
     * applying an aggregation function over its input values.
     * @param {Stores} stores input stores
     * @param {function(Stores=, function(*)=):*}fn function callback that aggregates the values
     * @param {*=}initial_value when used asynchronously
     */
    function derived(stores, fn, initial_value) {
        const single = !Array.isArray(stores);
        const stores_array = single
            ? [stores]
            : stores;
        const auto = fn.length < 2;
        return readable(initial_value, (set) => {
            let inited = false;
            const values = [];
            let pending = 0;
            let cleanup = noop;
            const sync = () => {
                if (pending) {
                    return;
                }
                cleanup();
                const result = fn(single ? values[0] : values, set);
                if (auto) {
                    set(result);
                }
                else {
                    cleanup = is_function(result) ? result : noop;
                }
            };
            const unsubscribers = stores_array.map((store, i) => store.subscribe((value) => {
                values[i] = value;
                pending &= ~(1 << i);
                if (inited) {
                    sync();
                }
            }, () => {
                pending |= (1 << i);
            }));
            inited = true;
            sync();
            return function stop() {
                run_all(unsubscribers);
                cleanup();
            };
        });
    }

    function regexparam (str, loose) {
    	if (str instanceof RegExp) return { keys:false, pattern:str };
    	var c, o, tmp, ext, keys=[], pattern='', arr = str.split('/');
    	arr[0] || arr.shift();

    	while (tmp = arr.shift()) {
    		c = tmp[0];
    		if (c === '*') {
    			keys.push('wild');
    			pattern += '/(.*)';
    		} else if (c === ':') {
    			o = tmp.indexOf('?', 1);
    			ext = tmp.indexOf('.', 1);
    			keys.push( tmp.substring(1, !!~o ? o : !!~ext ? ext : tmp.length) );
    			pattern += !!~o && !~ext ? '(?:/([^/]+?))?' : '/([^/]+?)';
    			if (!!~ext) pattern += (!!~o ? '?' : '') + '\\' + tmp.substring(ext);
    		} else {
    			pattern += '/' + tmp;
    		}
    	}

    	return {
    		keys: keys,
    		pattern: new RegExp('^' + pattern + (loose ? '(?=$|\/)' : '\/?$'), 'i')
    	};
    }

    /* node_modules/svelte-spa-router/Router.svelte generated by Svelte v3.12.0 */
    const { Error: Error_1, Object: Object_1 } = globals;

    function create_fragment$1(ctx) {
    	var switch_instance_anchor, current;

    	var switch_value = ctx.component;

    	function switch_props(ctx) {
    		return {
    			props: { params: ctx.componentParams },
    			$$inline: true
    		};
    	}

    	if (switch_value) {
    		var switch_instance = new switch_value(switch_props(ctx));
    	}

    	const block = {
    		c: function create() {
    			if (switch_instance) switch_instance.$$.fragment.c();
    			switch_instance_anchor = empty();
    		},

    		l: function claim(nodes) {
    			throw new Error_1("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},

    		m: function mount(target, anchor) {
    			if (switch_instance) {
    				mount_component(switch_instance, target, anchor);
    			}

    			insert_dev(target, switch_instance_anchor, anchor);
    			current = true;
    		},

    		p: function update(changed, ctx) {
    			var switch_instance_changes = {};
    			if (changed.componentParams) switch_instance_changes.params = ctx.componentParams;

    			if (switch_value !== (switch_value = ctx.component)) {
    				if (switch_instance) {
    					group_outros();
    					const old_component = switch_instance;
    					transition_out(old_component.$$.fragment, 1, 0, () => {
    						destroy_component(old_component, 1);
    					});
    					check_outros();
    				}

    				if (switch_value) {
    					switch_instance = new switch_value(switch_props(ctx));

    					switch_instance.$$.fragment.c();
    					transition_in(switch_instance.$$.fragment, 1);
    					mount_component(switch_instance, switch_instance_anchor.parentNode, switch_instance_anchor);
    				} else {
    					switch_instance = null;
    				}
    			}

    			else if (switch_value) {
    				switch_instance.$set(switch_instance_changes);
    			}
    		},

    		i: function intro(local) {
    			if (current) return;
    			if (switch_instance) transition_in(switch_instance.$$.fragment, local);

    			current = true;
    		},

    		o: function outro(local) {
    			if (switch_instance) transition_out(switch_instance.$$.fragment, local);
    			current = false;
    		},

    		d: function destroy(detaching) {
    			if (detaching) {
    				detach_dev(switch_instance_anchor);
    			}

    			if (switch_instance) destroy_component(switch_instance, detaching);
    		}
    	};
    	dispatch_dev("SvelteRegisterBlock", { block, id: create_fragment$1.name, type: "component", source: "", ctx });
    	return block;
    }

    /**
     * @typedef {Object} Location
     * @property {string} location - Location (page/view), for example `/book`
     * @property {string} [querystring] - Querystring from the hash, as a string not parsed
     */
    /**
     * Returns the current location from the hash.
     *
     * @returns {Location} Location object
     * @private
     */
    function getLocation() {
    const hashPosition = window.location.href.indexOf('#/');
    let location = (hashPosition > -1) ? window.location.href.substr(hashPosition + 1) : '/';

    // Check if there's a querystring
    const qsPosition = location.indexOf('?');
    let querystring = '';
    if (qsPosition > -1) {
        querystring = location.substr(qsPosition + 1);
        location = location.substr(0, qsPosition);
    }

    return {location, querystring}
    }

    /**
     * Readable store that returns the current full location (incl. querystring)
     */
    const loc = readable(
    getLocation(),
    // eslint-disable-next-line prefer-arrow-callback
    function start(set) {
        const update = () => {
            set(getLocation());
        };
        window.addEventListener('hashchange', update, false);

        return function stop() {
            window.removeEventListener('hashchange', update, false);
        }
    }
    );

    /**
     * Readable store that returns the current location
     */
    const location = derived(
    loc,
    ($loc) => $loc.location
    );

    /**
     * Readable store that returns the current querystring
     */
    const querystring = derived(
    loc,
    ($loc) => $loc.querystring
    );

    function instance($$self, $$props, $$invalidate) {
    	let $loc;

    	validate_store(loc, 'loc');
    	component_subscribe($$self, loc, $$value => { $loc = $$value; $$invalidate('$loc', $loc); });

    	/**
     * Dictionary of all routes, in the format `'/path': component`.
     *
     * For example:
     * ````js
     * import HomeRoute from './routes/HomeRoute.svelte'
     * import BooksRoute from './routes/BooksRoute.svelte'
     * import NotFoundRoute from './routes/NotFoundRoute.svelte'
     * routes = {
     *     '/': HomeRoute,
     *     '/books': BooksRoute,
     *     '*': NotFoundRoute
     * }
     * ````
     */
    let { routes = {} } = $$props;

    /**
     * Container for a route: path, component
     */
    class RouteItem {
        /**
         * Initializes the object and creates a regular expression from the path, using regexparam.
         *
         * @param {string} path - Path to the route (must start with '/' or '*')
         * @param {SvelteComponent} component - Svelte component for the route
         */
        constructor(path, component) {
            // Path must be a regular or expression, or a string starting with '/' or '*'
            if (!path || 
                (typeof path == 'string' && (path.length < 1 || (path.charAt(0) != '/' && path.charAt(0) != '*'))) ||
                (typeof path == 'object' && !(path instanceof RegExp))
            ) {
                throw Error('Invalid value for "path" argument')
            }

            const {pattern, keys} = regexparam(path);

            this.path = path;
            this.component = component;

            this._pattern = pattern;
            this._keys = keys;
        }

        /**
         * Checks if `path` matches the current route.
         * If there's a match, will return the list of parameters from the URL (if any).
         * In case of no match, the method will return `null`.
         *
         * @param {string} path - Path to test
         * @returns {null|Object.<string, string>} List of paramters from the URL if there's a match, or `null` otherwise.
         */
        match(path) {
            const matches = this._pattern.exec(path);
            if (matches === null) {
                return null
            }

            // If the input was a regular expression, this._keys would be false, so return matches as is
            if (this._keys === false) {
                return matches
            }

            const out = {};
            let i = 0;
            while (i < this._keys.length) {
                out[this._keys[i]] = matches[++i] || null;
            }
            return out
        }
    }

    // We need an iterable: if it's not a Map, use Object.entries
    const routesIterable = (routes instanceof Map) ? routes : Object.entries(routes);

    // Set up all routes
    const routesList = [];
    for (const [path, route] of routesIterable) {
        routesList.push(new RouteItem(path, route));
    }

    // Props for the component to render
    let component = null;
    let componentParams = {};

    	const writable_props = ['routes'];
    	Object_1.keys($$props).forEach(key => {
    		if (!writable_props.includes(key) && !key.startsWith('$$')) console.warn(`<Router> was created with unknown prop '${key}'`);
    	});

    	$$self.$set = $$props => {
    		if ('routes' in $$props) $$invalidate('routes', routes = $$props.routes);
    	};

    	$$self.$capture_state = () => {
    		return { routes, component, componentParams, $loc };
    	};

    	$$self.$inject_state = $$props => {
    		if ('routes' in $$props) $$invalidate('routes', routes = $$props.routes);
    		if ('component' in $$props) $$invalidate('component', component = $$props.component);
    		if ('componentParams' in $$props) $$invalidate('componentParams', componentParams = $$props.componentParams);
    		if ('$loc' in $$props) loc.set($loc);
    	};

    	$$self.$$.update = ($$dirty = { component: 1, $loc: 1 }) => {
    		if ($$dirty.component || $$dirty.$loc) { {
                // Find a route matching the location
                $$invalidate('component', component = null);
                let i = 0;
                while (!component && i < routesList.length) {
                    const match = routesList[i].match($loc.location);
                    if (match) {
                        $$invalidate('component', component = routesList[i].component);
                        $$invalidate('componentParams', componentParams = match);
                    }
                    i++;
                }
            } }
    	};

    	return { routes, component, componentParams };
    }

    class Router extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance, create_fragment$1, safe_not_equal, ["routes"]);
    		dispatch_dev("SvelteRegisterComponent", { component: this, tagName: "Router", options, id: create_fragment$1.name });
    	}

    	get routes() {
    		throw new Error_1("<Router>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set routes(value) {
    		throw new Error_1("<Router>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src/components/NotFound.svelte generated by Svelte v3.12.0 */

    const file = "src/components/NotFound.svelte";

    function create_fragment$2(ctx) {
    	var h2, t_1, h3;

    	const block = {
    		c: function create() {
    			h2 = element("h2");
    			h2.textContent = "Not Found";
    			t_1 = space();
    			h3 = element("h3");
    			h3.textContent = "Oops, this route doesn't exist!";
    			add_location(h2, file, 0, 0, 0);
    			add_location(h3, file, 2, 0, 20);
    		},

    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},

    		m: function mount(target, anchor) {
    			insert_dev(target, h2, anchor);
    			insert_dev(target, t_1, anchor);
    			insert_dev(target, h3, anchor);
    		},

    		p: noop,
    		i: noop,
    		o: noop,

    		d: function destroy(detaching) {
    			if (detaching) {
    				detach_dev(h2);
    				detach_dev(t_1);
    				detach_dev(h3);
    			}
    		}
    	};
    	dispatch_dev("SvelteRegisterBlock", { block, id: create_fragment$2.name, type: "component", source: "", ctx });
    	return block;
    }

    class NotFound extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, null, create_fragment$2, safe_not_equal, []);
    		dispatch_dev("SvelteRegisterComponent", { component: this, tagName: "NotFound", options, id: create_fragment$2.name });
    	}
    }

    /* src/components/Home.svelte generated by Svelte v3.12.0 */

    function create_fragment$3(ctx) {
    	var t;

    	const block = {
    		c: function create() {
    			t = text("HOME");
    		},

    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},

    		m: function mount(target, anchor) {
    			insert_dev(target, t, anchor);
    		},

    		p: noop,
    		i: noop,
    		o: noop,

    		d: function destroy(detaching) {
    			if (detaching) {
    				detach_dev(t);
    			}
    		}
    	};
    	dispatch_dev("SvelteRegisterBlock", { block, id: create_fragment$3.name, type: "component", source: "", ctx });
    	return block;
    }

    class Home extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, null, create_fragment$3, safe_not_equal, []);
    		dispatch_dev("SvelteRegisterComponent", { component: this, tagName: "Home", options, id: create_fragment$3.name });
    	}
    }

    var bind = function bind(fn, thisArg) {
      return function wrap() {
        var args = new Array(arguments.length);
        for (var i = 0; i < args.length; i++) {
          args[i] = arguments[i];
        }
        return fn.apply(thisArg, args);
      };
    };

    /*!
     * Determine if an object is a Buffer
     *
     * @author   Feross Aboukhadijeh <https://feross.org>
     * @license  MIT
     */

    var isBuffer = function isBuffer (obj) {
      return obj != null && obj.constructor != null &&
        typeof obj.constructor.isBuffer === 'function' && obj.constructor.isBuffer(obj)
    };

    /*global toString:true*/

    // utils is a library of generic helper functions non-specific to axios

    var toString = Object.prototype.toString;

    /**
     * Determine if a value is an Array
     *
     * @param {Object} val The value to test
     * @returns {boolean} True if value is an Array, otherwise false
     */
    function isArray(val) {
      return toString.call(val) === '[object Array]';
    }

    /**
     * Determine if a value is an ArrayBuffer
     *
     * @param {Object} val The value to test
     * @returns {boolean} True if value is an ArrayBuffer, otherwise false
     */
    function isArrayBuffer(val) {
      return toString.call(val) === '[object ArrayBuffer]';
    }

    /**
     * Determine if a value is a FormData
     *
     * @param {Object} val The value to test
     * @returns {boolean} True if value is an FormData, otherwise false
     */
    function isFormData(val) {
      return (typeof FormData !== 'undefined') && (val instanceof FormData);
    }

    /**
     * Determine if a value is a view on an ArrayBuffer
     *
     * @param {Object} val The value to test
     * @returns {boolean} True if value is a view on an ArrayBuffer, otherwise false
     */
    function isArrayBufferView(val) {
      var result;
      if ((typeof ArrayBuffer !== 'undefined') && (ArrayBuffer.isView)) {
        result = ArrayBuffer.isView(val);
      } else {
        result = (val) && (val.buffer) && (val.buffer instanceof ArrayBuffer);
      }
      return result;
    }

    /**
     * Determine if a value is a String
     *
     * @param {Object} val The value to test
     * @returns {boolean} True if value is a String, otherwise false
     */
    function isString(val) {
      return typeof val === 'string';
    }

    /**
     * Determine if a value is a Number
     *
     * @param {Object} val The value to test
     * @returns {boolean} True if value is a Number, otherwise false
     */
    function isNumber(val) {
      return typeof val === 'number';
    }

    /**
     * Determine if a value is undefined
     *
     * @param {Object} val The value to test
     * @returns {boolean} True if the value is undefined, otherwise false
     */
    function isUndefined(val) {
      return typeof val === 'undefined';
    }

    /**
     * Determine if a value is an Object
     *
     * @param {Object} val The value to test
     * @returns {boolean} True if value is an Object, otherwise false
     */
    function isObject(val) {
      return val !== null && typeof val === 'object';
    }

    /**
     * Determine if a value is a Date
     *
     * @param {Object} val The value to test
     * @returns {boolean} True if value is a Date, otherwise false
     */
    function isDate(val) {
      return toString.call(val) === '[object Date]';
    }

    /**
     * Determine if a value is a File
     *
     * @param {Object} val The value to test
     * @returns {boolean} True if value is a File, otherwise false
     */
    function isFile(val) {
      return toString.call(val) === '[object File]';
    }

    /**
     * Determine if a value is a Blob
     *
     * @param {Object} val The value to test
     * @returns {boolean} True if value is a Blob, otherwise false
     */
    function isBlob(val) {
      return toString.call(val) === '[object Blob]';
    }

    /**
     * Determine if a value is a Function
     *
     * @param {Object} val The value to test
     * @returns {boolean} True if value is a Function, otherwise false
     */
    function isFunction(val) {
      return toString.call(val) === '[object Function]';
    }

    /**
     * Determine if a value is a Stream
     *
     * @param {Object} val The value to test
     * @returns {boolean} True if value is a Stream, otherwise false
     */
    function isStream(val) {
      return isObject(val) && isFunction(val.pipe);
    }

    /**
     * Determine if a value is a URLSearchParams object
     *
     * @param {Object} val The value to test
     * @returns {boolean} True if value is a URLSearchParams object, otherwise false
     */
    function isURLSearchParams(val) {
      return typeof URLSearchParams !== 'undefined' && val instanceof URLSearchParams;
    }

    /**
     * Trim excess whitespace off the beginning and end of a string
     *
     * @param {String} str The String to trim
     * @returns {String} The String freed of excess whitespace
     */
    function trim(str) {
      return str.replace(/^\s*/, '').replace(/\s*$/, '');
    }

    /**
     * Determine if we're running in a standard browser environment
     *
     * This allows axios to run in a web worker, and react-native.
     * Both environments support XMLHttpRequest, but not fully standard globals.
     *
     * web workers:
     *  typeof window -> undefined
     *  typeof document -> undefined
     *
     * react-native:
     *  navigator.product -> 'ReactNative'
     * nativescript
     *  navigator.product -> 'NativeScript' or 'NS'
     */
    function isStandardBrowserEnv() {
      if (typeof navigator !== 'undefined' && (navigator.product === 'ReactNative' ||
                                               navigator.product === 'NativeScript' ||
                                               navigator.product === 'NS')) {
        return false;
      }
      return (
        typeof window !== 'undefined' &&
        typeof document !== 'undefined'
      );
    }

    /**
     * Iterate over an Array or an Object invoking a function for each item.
     *
     * If `obj` is an Array callback will be called passing
     * the value, index, and complete array for each item.
     *
     * If 'obj' is an Object callback will be called passing
     * the value, key, and complete object for each property.
     *
     * @param {Object|Array} obj The object to iterate
     * @param {Function} fn The callback to invoke for each item
     */
    function forEach(obj, fn) {
      // Don't bother if no value provided
      if (obj === null || typeof obj === 'undefined') {
        return;
      }

      // Force an array if not already something iterable
      if (typeof obj !== 'object') {
        /*eslint no-param-reassign:0*/
        obj = [obj];
      }

      if (isArray(obj)) {
        // Iterate over array values
        for (var i = 0, l = obj.length; i < l; i++) {
          fn.call(null, obj[i], i, obj);
        }
      } else {
        // Iterate over object keys
        for (var key in obj) {
          if (Object.prototype.hasOwnProperty.call(obj, key)) {
            fn.call(null, obj[key], key, obj);
          }
        }
      }
    }

    /**
     * Accepts varargs expecting each argument to be an object, then
     * immutably merges the properties of each object and returns result.
     *
     * When multiple objects contain the same key the later object in
     * the arguments list will take precedence.
     *
     * Example:
     *
     * ```js
     * var result = merge({foo: 123}, {foo: 456});
     * console.log(result.foo); // outputs 456
     * ```
     *
     * @param {Object} obj1 Object to merge
     * @returns {Object} Result of all merge properties
     */
    function merge(/* obj1, obj2, obj3, ... */) {
      var result = {};
      function assignValue(val, key) {
        if (typeof result[key] === 'object' && typeof val === 'object') {
          result[key] = merge(result[key], val);
        } else {
          result[key] = val;
        }
      }

      for (var i = 0, l = arguments.length; i < l; i++) {
        forEach(arguments[i], assignValue);
      }
      return result;
    }

    /**
     * Function equal to merge with the difference being that no reference
     * to original objects is kept.
     *
     * @see merge
     * @param {Object} obj1 Object to merge
     * @returns {Object} Result of all merge properties
     */
    function deepMerge(/* obj1, obj2, obj3, ... */) {
      var result = {};
      function assignValue(val, key) {
        if (typeof result[key] === 'object' && typeof val === 'object') {
          result[key] = deepMerge(result[key], val);
        } else if (typeof val === 'object') {
          result[key] = deepMerge({}, val);
        } else {
          result[key] = val;
        }
      }

      for (var i = 0, l = arguments.length; i < l; i++) {
        forEach(arguments[i], assignValue);
      }
      return result;
    }

    /**
     * Extends object a by mutably adding to it the properties of object b.
     *
     * @param {Object} a The object to be extended
     * @param {Object} b The object to copy properties from
     * @param {Object} thisArg The object to bind function to
     * @return {Object} The resulting value of object a
     */
    function extend(a, b, thisArg) {
      forEach(b, function assignValue(val, key) {
        if (thisArg && typeof val === 'function') {
          a[key] = bind(val, thisArg);
        } else {
          a[key] = val;
        }
      });
      return a;
    }

    var utils = {
      isArray: isArray,
      isArrayBuffer: isArrayBuffer,
      isBuffer: isBuffer,
      isFormData: isFormData,
      isArrayBufferView: isArrayBufferView,
      isString: isString,
      isNumber: isNumber,
      isObject: isObject,
      isUndefined: isUndefined,
      isDate: isDate,
      isFile: isFile,
      isBlob: isBlob,
      isFunction: isFunction,
      isStream: isStream,
      isURLSearchParams: isURLSearchParams,
      isStandardBrowserEnv: isStandardBrowserEnv,
      forEach: forEach,
      merge: merge,
      deepMerge: deepMerge,
      extend: extend,
      trim: trim
    };

    function encode(val) {
      return encodeURIComponent(val).
        replace(/%40/gi, '@').
        replace(/%3A/gi, ':').
        replace(/%24/g, '$').
        replace(/%2C/gi, ',').
        replace(/%20/g, '+').
        replace(/%5B/gi, '[').
        replace(/%5D/gi, ']');
    }

    /**
     * Build a URL by appending params to the end
     *
     * @param {string} url The base of the url (e.g., http://www.google.com)
     * @param {object} [params] The params to be appended
     * @returns {string} The formatted url
     */
    var buildURL = function buildURL(url, params, paramsSerializer) {
      /*eslint no-param-reassign:0*/
      if (!params) {
        return url;
      }

      var serializedParams;
      if (paramsSerializer) {
        serializedParams = paramsSerializer(params);
      } else if (utils.isURLSearchParams(params)) {
        serializedParams = params.toString();
      } else {
        var parts = [];

        utils.forEach(params, function serialize(val, key) {
          if (val === null || typeof val === 'undefined') {
            return;
          }

          if (utils.isArray(val)) {
            key = key + '[]';
          } else {
            val = [val];
          }

          utils.forEach(val, function parseValue(v) {
            if (utils.isDate(v)) {
              v = v.toISOString();
            } else if (utils.isObject(v)) {
              v = JSON.stringify(v);
            }
            parts.push(encode(key) + '=' + encode(v));
          });
        });

        serializedParams = parts.join('&');
      }

      if (serializedParams) {
        var hashmarkIndex = url.indexOf('#');
        if (hashmarkIndex !== -1) {
          url = url.slice(0, hashmarkIndex);
        }

        url += (url.indexOf('?') === -1 ? '?' : '&') + serializedParams;
      }

      return url;
    };

    function InterceptorManager() {
      this.handlers = [];
    }

    /**
     * Add a new interceptor to the stack
     *
     * @param {Function} fulfilled The function to handle `then` for a `Promise`
     * @param {Function} rejected The function to handle `reject` for a `Promise`
     *
     * @return {Number} An ID used to remove interceptor later
     */
    InterceptorManager.prototype.use = function use(fulfilled, rejected) {
      this.handlers.push({
        fulfilled: fulfilled,
        rejected: rejected
      });
      return this.handlers.length - 1;
    };

    /**
     * Remove an interceptor from the stack
     *
     * @param {Number} id The ID that was returned by `use`
     */
    InterceptorManager.prototype.eject = function eject(id) {
      if (this.handlers[id]) {
        this.handlers[id] = null;
      }
    };

    /**
     * Iterate over all the registered interceptors
     *
     * This method is particularly useful for skipping over any
     * interceptors that may have become `null` calling `eject`.
     *
     * @param {Function} fn The function to call for each interceptor
     */
    InterceptorManager.prototype.forEach = function forEach(fn) {
      utils.forEach(this.handlers, function forEachHandler(h) {
        if (h !== null) {
          fn(h);
        }
      });
    };

    var InterceptorManager_1 = InterceptorManager;

    /**
     * Transform the data for a request or a response
     *
     * @param {Object|String} data The data to be transformed
     * @param {Array} headers The headers for the request or response
     * @param {Array|Function} fns A single function or Array of functions
     * @returns {*} The resulting transformed data
     */
    var transformData = function transformData(data, headers, fns) {
      /*eslint no-param-reassign:0*/
      utils.forEach(fns, function transform(fn) {
        data = fn(data, headers);
      });

      return data;
    };

    var isCancel = function isCancel(value) {
      return !!(value && value.__CANCEL__);
    };

    var normalizeHeaderName = function normalizeHeaderName(headers, normalizedName) {
      utils.forEach(headers, function processHeader(value, name) {
        if (name !== normalizedName && name.toUpperCase() === normalizedName.toUpperCase()) {
          headers[normalizedName] = value;
          delete headers[name];
        }
      });
    };

    /**
     * Update an Error with the specified config, error code, and response.
     *
     * @param {Error} error The error to update.
     * @param {Object} config The config.
     * @param {string} [code] The error code (for example, 'ECONNABORTED').
     * @param {Object} [request] The request.
     * @param {Object} [response] The response.
     * @returns {Error} The error.
     */
    var enhanceError = function enhanceError(error, config, code, request, response) {
      error.config = config;
      if (code) {
        error.code = code;
      }

      error.request = request;
      error.response = response;
      error.isAxiosError = true;

      error.toJSON = function() {
        return {
          // Standard
          message: this.message,
          name: this.name,
          // Microsoft
          description: this.description,
          number: this.number,
          // Mozilla
          fileName: this.fileName,
          lineNumber: this.lineNumber,
          columnNumber: this.columnNumber,
          stack: this.stack,
          // Axios
          config: this.config,
          code: this.code
        };
      };
      return error;
    };

    /**
     * Create an Error with the specified message, config, error code, request and response.
     *
     * @param {string} message The error message.
     * @param {Object} config The config.
     * @param {string} [code] The error code (for example, 'ECONNABORTED').
     * @param {Object} [request] The request.
     * @param {Object} [response] The response.
     * @returns {Error} The created error.
     */
    var createError = function createError(message, config, code, request, response) {
      var error = new Error(message);
      return enhanceError(error, config, code, request, response);
    };

    /**
     * Resolve or reject a Promise based on response status.
     *
     * @param {Function} resolve A function that resolves the promise.
     * @param {Function} reject A function that rejects the promise.
     * @param {object} response The response.
     */
    var settle = function settle(resolve, reject, response) {
      var validateStatus = response.config.validateStatus;
      if (!validateStatus || validateStatus(response.status)) {
        resolve(response);
      } else {
        reject(createError(
          'Request failed with status code ' + response.status,
          response.config,
          null,
          response.request,
          response
        ));
      }
    };

    // Headers whose duplicates are ignored by node
    // c.f. https://nodejs.org/api/http.html#http_message_headers
    var ignoreDuplicateOf = [
      'age', 'authorization', 'content-length', 'content-type', 'etag',
      'expires', 'from', 'host', 'if-modified-since', 'if-unmodified-since',
      'last-modified', 'location', 'max-forwards', 'proxy-authorization',
      'referer', 'retry-after', 'user-agent'
    ];

    /**
     * Parse headers into an object
     *
     * ```
     * Date: Wed, 27 Aug 2014 08:58:49 GMT
     * Content-Type: application/json
     * Connection: keep-alive
     * Transfer-Encoding: chunked
     * ```
     *
     * @param {String} headers Headers needing to be parsed
     * @returns {Object} Headers parsed into an object
     */
    var parseHeaders = function parseHeaders(headers) {
      var parsed = {};
      var key;
      var val;
      var i;

      if (!headers) { return parsed; }

      utils.forEach(headers.split('\n'), function parser(line) {
        i = line.indexOf(':');
        key = utils.trim(line.substr(0, i)).toLowerCase();
        val = utils.trim(line.substr(i + 1));

        if (key) {
          if (parsed[key] && ignoreDuplicateOf.indexOf(key) >= 0) {
            return;
          }
          if (key === 'set-cookie') {
            parsed[key] = (parsed[key] ? parsed[key] : []).concat([val]);
          } else {
            parsed[key] = parsed[key] ? parsed[key] + ', ' + val : val;
          }
        }
      });

      return parsed;
    };

    var isURLSameOrigin = (
      utils.isStandardBrowserEnv() ?

      // Standard browser envs have full support of the APIs needed to test
      // whether the request URL is of the same origin as current location.
        (function standardBrowserEnv() {
          var msie = /(msie|trident)/i.test(navigator.userAgent);
          var urlParsingNode = document.createElement('a');
          var originURL;

          /**
        * Parse a URL to discover it's components
        *
        * @param {String} url The URL to be parsed
        * @returns {Object}
        */
          function resolveURL(url) {
            var href = url;

            if (msie) {
            // IE needs attribute set twice to normalize properties
              urlParsingNode.setAttribute('href', href);
              href = urlParsingNode.href;
            }

            urlParsingNode.setAttribute('href', href);

            // urlParsingNode provides the UrlUtils interface - http://url.spec.whatwg.org/#urlutils
            return {
              href: urlParsingNode.href,
              protocol: urlParsingNode.protocol ? urlParsingNode.protocol.replace(/:$/, '') : '',
              host: urlParsingNode.host,
              search: urlParsingNode.search ? urlParsingNode.search.replace(/^\?/, '') : '',
              hash: urlParsingNode.hash ? urlParsingNode.hash.replace(/^#/, '') : '',
              hostname: urlParsingNode.hostname,
              port: urlParsingNode.port,
              pathname: (urlParsingNode.pathname.charAt(0) === '/') ?
                urlParsingNode.pathname :
                '/' + urlParsingNode.pathname
            };
          }

          originURL = resolveURL(window.location.href);

          /**
        * Determine if a URL shares the same origin as the current location
        *
        * @param {String} requestURL The URL to test
        * @returns {boolean} True if URL shares the same origin, otherwise false
        */
          return function isURLSameOrigin(requestURL) {
            var parsed = (utils.isString(requestURL)) ? resolveURL(requestURL) : requestURL;
            return (parsed.protocol === originURL.protocol &&
                parsed.host === originURL.host);
          };
        })() :

      // Non standard browser envs (web workers, react-native) lack needed support.
        (function nonStandardBrowserEnv() {
          return function isURLSameOrigin() {
            return true;
          };
        })()
    );

    var cookies = (
      utils.isStandardBrowserEnv() ?

      // Standard browser envs support document.cookie
        (function standardBrowserEnv() {
          return {
            write: function write(name, value, expires, path, domain, secure) {
              var cookie = [];
              cookie.push(name + '=' + encodeURIComponent(value));

              if (utils.isNumber(expires)) {
                cookie.push('expires=' + new Date(expires).toGMTString());
              }

              if (utils.isString(path)) {
                cookie.push('path=' + path);
              }

              if (utils.isString(domain)) {
                cookie.push('domain=' + domain);
              }

              if (secure === true) {
                cookie.push('secure');
              }

              document.cookie = cookie.join('; ');
            },

            read: function read(name) {
              var match = document.cookie.match(new RegExp('(^|;\\s*)(' + name + ')=([^;]*)'));
              return (match ? decodeURIComponent(match[3]) : null);
            },

            remove: function remove(name) {
              this.write(name, '', Date.now() - 86400000);
            }
          };
        })() :

      // Non standard browser env (web workers, react-native) lack needed support.
        (function nonStandardBrowserEnv() {
          return {
            write: function write() {},
            read: function read() { return null; },
            remove: function remove() {}
          };
        })()
    );

    var xhr = function xhrAdapter(config) {
      return new Promise(function dispatchXhrRequest(resolve, reject) {
        var requestData = config.data;
        var requestHeaders = config.headers;

        if (utils.isFormData(requestData)) {
          delete requestHeaders['Content-Type']; // Let the browser set it
        }

        var request = new XMLHttpRequest();

        // HTTP basic authentication
        if (config.auth) {
          var username = config.auth.username || '';
          var password = config.auth.password || '';
          requestHeaders.Authorization = 'Basic ' + btoa(username + ':' + password);
        }

        request.open(config.method.toUpperCase(), buildURL(config.url, config.params, config.paramsSerializer), true);

        // Set the request timeout in MS
        request.timeout = config.timeout;

        // Listen for ready state
        request.onreadystatechange = function handleLoad() {
          if (!request || request.readyState !== 4) {
            return;
          }

          // The request errored out and we didn't get a response, this will be
          // handled by onerror instead
          // With one exception: request that using file: protocol, most browsers
          // will return status as 0 even though it's a successful request
          if (request.status === 0 && !(request.responseURL && request.responseURL.indexOf('file:') === 0)) {
            return;
          }

          // Prepare the response
          var responseHeaders = 'getAllResponseHeaders' in request ? parseHeaders(request.getAllResponseHeaders()) : null;
          var responseData = !config.responseType || config.responseType === 'text' ? request.responseText : request.response;
          var response = {
            data: responseData,
            status: request.status,
            statusText: request.statusText,
            headers: responseHeaders,
            config: config,
            request: request
          };

          settle(resolve, reject, response);

          // Clean up request
          request = null;
        };

        // Handle browser request cancellation (as opposed to a manual cancellation)
        request.onabort = function handleAbort() {
          if (!request) {
            return;
          }

          reject(createError('Request aborted', config, 'ECONNABORTED', request));

          // Clean up request
          request = null;
        };

        // Handle low level network errors
        request.onerror = function handleError() {
          // Real errors are hidden from us by the browser
          // onerror should only fire if it's a network error
          reject(createError('Network Error', config, null, request));

          // Clean up request
          request = null;
        };

        // Handle timeout
        request.ontimeout = function handleTimeout() {
          reject(createError('timeout of ' + config.timeout + 'ms exceeded', config, 'ECONNABORTED',
            request));

          // Clean up request
          request = null;
        };

        // Add xsrf header
        // This is only done if running in a standard browser environment.
        // Specifically not if we're in a web worker, or react-native.
        if (utils.isStandardBrowserEnv()) {
          var cookies$1 = cookies;

          // Add xsrf header
          var xsrfValue = (config.withCredentials || isURLSameOrigin(config.url)) && config.xsrfCookieName ?
            cookies$1.read(config.xsrfCookieName) :
            undefined;

          if (xsrfValue) {
            requestHeaders[config.xsrfHeaderName] = xsrfValue;
          }
        }

        // Add headers to the request
        if ('setRequestHeader' in request) {
          utils.forEach(requestHeaders, function setRequestHeader(val, key) {
            if (typeof requestData === 'undefined' && key.toLowerCase() === 'content-type') {
              // Remove Content-Type if data is undefined
              delete requestHeaders[key];
            } else {
              // Otherwise add header to the request
              request.setRequestHeader(key, val);
            }
          });
        }

        // Add withCredentials to request if needed
        if (config.withCredentials) {
          request.withCredentials = true;
        }

        // Add responseType to request if needed
        if (config.responseType) {
          try {
            request.responseType = config.responseType;
          } catch (e) {
            // Expected DOMException thrown by browsers not compatible XMLHttpRequest Level 2.
            // But, this can be suppressed for 'json' type as it can be parsed by default 'transformResponse' function.
            if (config.responseType !== 'json') {
              throw e;
            }
          }
        }

        // Handle progress if needed
        if (typeof config.onDownloadProgress === 'function') {
          request.addEventListener('progress', config.onDownloadProgress);
        }

        // Not all browsers support upload events
        if (typeof config.onUploadProgress === 'function' && request.upload) {
          request.upload.addEventListener('progress', config.onUploadProgress);
        }

        if (config.cancelToken) {
          // Handle cancellation
          config.cancelToken.promise.then(function onCanceled(cancel) {
            if (!request) {
              return;
            }

            request.abort();
            reject(cancel);
            // Clean up request
            request = null;
          });
        }

        if (requestData === undefined) {
          requestData = null;
        }

        // Send the request
        request.send(requestData);
      });
    };

    var DEFAULT_CONTENT_TYPE = {
      'Content-Type': 'application/x-www-form-urlencoded'
    };

    function setContentTypeIfUnset(headers, value) {
      if (!utils.isUndefined(headers) && utils.isUndefined(headers['Content-Type'])) {
        headers['Content-Type'] = value;
      }
    }

    function getDefaultAdapter() {
      var adapter;
      // Only Node.JS has a process variable that is of [[Class]] process
      if (typeof process !== 'undefined' && Object.prototype.toString.call(process) === '[object process]') {
        // For node use HTTP adapter
        adapter = xhr;
      } else if (typeof XMLHttpRequest !== 'undefined') {
        // For browsers use XHR adapter
        adapter = xhr;
      }
      return adapter;
    }

    var defaults = {
      adapter: getDefaultAdapter(),

      transformRequest: [function transformRequest(data, headers) {
        normalizeHeaderName(headers, 'Accept');
        normalizeHeaderName(headers, 'Content-Type');
        if (utils.isFormData(data) ||
          utils.isArrayBuffer(data) ||
          utils.isBuffer(data) ||
          utils.isStream(data) ||
          utils.isFile(data) ||
          utils.isBlob(data)
        ) {
          return data;
        }
        if (utils.isArrayBufferView(data)) {
          return data.buffer;
        }
        if (utils.isURLSearchParams(data)) {
          setContentTypeIfUnset(headers, 'application/x-www-form-urlencoded;charset=utf-8');
          return data.toString();
        }
        if (utils.isObject(data)) {
          setContentTypeIfUnset(headers, 'application/json;charset=utf-8');
          return JSON.stringify(data);
        }
        return data;
      }],

      transformResponse: [function transformResponse(data) {
        /*eslint no-param-reassign:0*/
        if (typeof data === 'string') {
          try {
            data = JSON.parse(data);
          } catch (e) { /* Ignore */ }
        }
        return data;
      }],

      /**
       * A timeout in milliseconds to abort a request. If set to 0 (default) a
       * timeout is not created.
       */
      timeout: 0,

      xsrfCookieName: 'XSRF-TOKEN',
      xsrfHeaderName: 'X-XSRF-TOKEN',

      maxContentLength: -1,

      validateStatus: function validateStatus(status) {
        return status >= 200 && status < 300;
      }
    };

    defaults.headers = {
      common: {
        'Accept': 'application/json, text/plain, */*'
      }
    };

    utils.forEach(['delete', 'get', 'head'], function forEachMethodNoData(method) {
      defaults.headers[method] = {};
    });

    utils.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {
      defaults.headers[method] = utils.merge(DEFAULT_CONTENT_TYPE);
    });

    var defaults_1 = defaults;

    /**
     * Determines whether the specified URL is absolute
     *
     * @param {string} url The URL to test
     * @returns {boolean} True if the specified URL is absolute, otherwise false
     */
    var isAbsoluteURL = function isAbsoluteURL(url) {
      // A URL is considered absolute if it begins with "<scheme>://" or "//" (protocol-relative URL).
      // RFC 3986 defines scheme name as a sequence of characters beginning with a letter and followed
      // by any combination of letters, digits, plus, period, or hyphen.
      return /^([a-z][a-z\d\+\-\.]*:)?\/\//i.test(url);
    };

    /**
     * Creates a new URL by combining the specified URLs
     *
     * @param {string} baseURL The base URL
     * @param {string} relativeURL The relative URL
     * @returns {string} The combined URL
     */
    var combineURLs = function combineURLs(baseURL, relativeURL) {
      return relativeURL
        ? baseURL.replace(/\/+$/, '') + '/' + relativeURL.replace(/^\/+/, '')
        : baseURL;
    };

    /**
     * Throws a `Cancel` if cancellation has been requested.
     */
    function throwIfCancellationRequested(config) {
      if (config.cancelToken) {
        config.cancelToken.throwIfRequested();
      }
    }

    /**
     * Dispatch a request to the server using the configured adapter.
     *
     * @param {object} config The config that is to be used for the request
     * @returns {Promise} The Promise to be fulfilled
     */
    var dispatchRequest = function dispatchRequest(config) {
      throwIfCancellationRequested(config);

      // Support baseURL config
      if (config.baseURL && !isAbsoluteURL(config.url)) {
        config.url = combineURLs(config.baseURL, config.url);
      }

      // Ensure headers exist
      config.headers = config.headers || {};

      // Transform request data
      config.data = transformData(
        config.data,
        config.headers,
        config.transformRequest
      );

      // Flatten headers
      config.headers = utils.merge(
        config.headers.common || {},
        config.headers[config.method] || {},
        config.headers || {}
      );

      utils.forEach(
        ['delete', 'get', 'head', 'post', 'put', 'patch', 'common'],
        function cleanHeaderConfig(method) {
          delete config.headers[method];
        }
      );

      var adapter = config.adapter || defaults_1.adapter;

      return adapter(config).then(function onAdapterResolution(response) {
        throwIfCancellationRequested(config);

        // Transform response data
        response.data = transformData(
          response.data,
          response.headers,
          config.transformResponse
        );

        return response;
      }, function onAdapterRejection(reason) {
        if (!isCancel(reason)) {
          throwIfCancellationRequested(config);

          // Transform response data
          if (reason && reason.response) {
            reason.response.data = transformData(
              reason.response.data,
              reason.response.headers,
              config.transformResponse
            );
          }
        }

        return Promise.reject(reason);
      });
    };

    /**
     * Config-specific merge-function which creates a new config-object
     * by merging two configuration objects together.
     *
     * @param {Object} config1
     * @param {Object} config2
     * @returns {Object} New object resulting from merging config2 to config1
     */
    var mergeConfig = function mergeConfig(config1, config2) {
      // eslint-disable-next-line no-param-reassign
      config2 = config2 || {};
      var config = {};

      utils.forEach(['url', 'method', 'params', 'data'], function valueFromConfig2(prop) {
        if (typeof config2[prop] !== 'undefined') {
          config[prop] = config2[prop];
        }
      });

      utils.forEach(['headers', 'auth', 'proxy'], function mergeDeepProperties(prop) {
        if (utils.isObject(config2[prop])) {
          config[prop] = utils.deepMerge(config1[prop], config2[prop]);
        } else if (typeof config2[prop] !== 'undefined') {
          config[prop] = config2[prop];
        } else if (utils.isObject(config1[prop])) {
          config[prop] = utils.deepMerge(config1[prop]);
        } else if (typeof config1[prop] !== 'undefined') {
          config[prop] = config1[prop];
        }
      });

      utils.forEach([
        'baseURL', 'transformRequest', 'transformResponse', 'paramsSerializer',
        'timeout', 'withCredentials', 'adapter', 'responseType', 'xsrfCookieName',
        'xsrfHeaderName', 'onUploadProgress', 'onDownloadProgress', 'maxContentLength',
        'validateStatus', 'maxRedirects', 'httpAgent', 'httpsAgent', 'cancelToken',
        'socketPath'
      ], function defaultToConfig2(prop) {
        if (typeof config2[prop] !== 'undefined') {
          config[prop] = config2[prop];
        } else if (typeof config1[prop] !== 'undefined') {
          config[prop] = config1[prop];
        }
      });

      return config;
    };

    /**
     * Create a new instance of Axios
     *
     * @param {Object} instanceConfig The default config for the instance
     */
    function Axios(instanceConfig) {
      this.defaults = instanceConfig;
      this.interceptors = {
        request: new InterceptorManager_1(),
        response: new InterceptorManager_1()
      };
    }

    /**
     * Dispatch a request
     *
     * @param {Object} config The config specific for this request (merged with this.defaults)
     */
    Axios.prototype.request = function request(config) {
      /*eslint no-param-reassign:0*/
      // Allow for axios('example/url'[, config]) a la fetch API
      if (typeof config === 'string') {
        config = arguments[1] || {};
        config.url = arguments[0];
      } else {
        config = config || {};
      }

      config = mergeConfig(this.defaults, config);
      config.method = config.method ? config.method.toLowerCase() : 'get';

      // Hook up interceptors middleware
      var chain = [dispatchRequest, undefined];
      var promise = Promise.resolve(config);

      this.interceptors.request.forEach(function unshiftRequestInterceptors(interceptor) {
        chain.unshift(interceptor.fulfilled, interceptor.rejected);
      });

      this.interceptors.response.forEach(function pushResponseInterceptors(interceptor) {
        chain.push(interceptor.fulfilled, interceptor.rejected);
      });

      while (chain.length) {
        promise = promise.then(chain.shift(), chain.shift());
      }

      return promise;
    };

    Axios.prototype.getUri = function getUri(config) {
      config = mergeConfig(this.defaults, config);
      return buildURL(config.url, config.params, config.paramsSerializer).replace(/^\?/, '');
    };

    // Provide aliases for supported request methods
    utils.forEach(['delete', 'get', 'head', 'options'], function forEachMethodNoData(method) {
      /*eslint func-names:0*/
      Axios.prototype[method] = function(url, config) {
        return this.request(utils.merge(config || {}, {
          method: method,
          url: url
        }));
      };
    });

    utils.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {
      /*eslint func-names:0*/
      Axios.prototype[method] = function(url, data, config) {
        return this.request(utils.merge(config || {}, {
          method: method,
          url: url,
          data: data
        }));
      };
    });

    var Axios_1 = Axios;

    /**
     * A `Cancel` is an object that is thrown when an operation is canceled.
     *
     * @class
     * @param {string=} message The message.
     */
    function Cancel(message) {
      this.message = message;
    }

    Cancel.prototype.toString = function toString() {
      return 'Cancel' + (this.message ? ': ' + this.message : '');
    };

    Cancel.prototype.__CANCEL__ = true;

    var Cancel_1 = Cancel;

    /**
     * A `CancelToken` is an object that can be used to request cancellation of an operation.
     *
     * @class
     * @param {Function} executor The executor function.
     */
    function CancelToken(executor) {
      if (typeof executor !== 'function') {
        throw new TypeError('executor must be a function.');
      }

      var resolvePromise;
      this.promise = new Promise(function promiseExecutor(resolve) {
        resolvePromise = resolve;
      });

      var token = this;
      executor(function cancel(message) {
        if (token.reason) {
          // Cancellation has already been requested
          return;
        }

        token.reason = new Cancel_1(message);
        resolvePromise(token.reason);
      });
    }

    /**
     * Throws a `Cancel` if cancellation has been requested.
     */
    CancelToken.prototype.throwIfRequested = function throwIfRequested() {
      if (this.reason) {
        throw this.reason;
      }
    };

    /**
     * Returns an object that contains a new `CancelToken` and a function that, when called,
     * cancels the `CancelToken`.
     */
    CancelToken.source = function source() {
      var cancel;
      var token = new CancelToken(function executor(c) {
        cancel = c;
      });
      return {
        token: token,
        cancel: cancel
      };
    };

    var CancelToken_1 = CancelToken;

    /**
     * Syntactic sugar for invoking a function and expanding an array for arguments.
     *
     * Common use case would be to use `Function.prototype.apply`.
     *
     *  ```js
     *  function f(x, y, z) {}
     *  var args = [1, 2, 3];
     *  f.apply(null, args);
     *  ```
     *
     * With `spread` this example can be re-written.
     *
     *  ```js
     *  spread(function(x, y, z) {})([1, 2, 3]);
     *  ```
     *
     * @param {Function} callback
     * @returns {Function}
     */
    var spread = function spread(callback) {
      return function wrap(arr) {
        return callback.apply(null, arr);
      };
    };

    /**
     * Create an instance of Axios
     *
     * @param {Object} defaultConfig The default config for the instance
     * @return {Axios} A new instance of Axios
     */
    function createInstance(defaultConfig) {
      var context = new Axios_1(defaultConfig);
      var instance = bind(Axios_1.prototype.request, context);

      // Copy axios.prototype to instance
      utils.extend(instance, Axios_1.prototype, context);

      // Copy context to instance
      utils.extend(instance, context);

      return instance;
    }

    // Create the default instance to be exported
    var axios = createInstance(defaults_1);

    // Expose Axios class to allow class inheritance
    axios.Axios = Axios_1;

    // Factory for creating new instances
    axios.create = function create(instanceConfig) {
      return createInstance(mergeConfig(axios.defaults, instanceConfig));
    };

    // Expose Cancel & CancelToken
    axios.Cancel = Cancel_1;
    axios.CancelToken = CancelToken_1;
    axios.isCancel = isCancel;

    // Expose all/spread
    axios.all = function all(promises) {
      return Promise.all(promises);
    };
    axios.spread = spread;

    var axios_1 = axios;

    // Allow use of default import syntax in TypeScript
    var default_1 = axios;
    axios_1.default = default_1;

    var axios$1 = axios_1;

    const members = [{"avatar": "images/abdelrahman_ghanem_processed.jpg", "full_name": "Abdelrahman Ghanem", "description": "Software Engineer", "why_threefold": "", "function": "Engineer", "project_ids": [1, 8], "contribution_ids": [6, 6], "nationality": "Egyptian"}, {"avatar": "images/abdelrahman_hussein_processed.jpg", "full_name": "Abdelrahman Hussein", "description": "Software Engineer working on jumpscale platforms. Regressions break my heart, I like to make things work!", "why_threefold": "", "function": "Engineer", "rank": 0, "project_ids": [1, 8], "contribution_ids": [6, 6], "nationality": "Egyptian"}, {"avatar": "images/abdul_rehman_processed.jpg", "full_name": "Abdul Rehman", "description": "A dynamic hardworking individual, a dreamer, a thinker, a planner, an explorer. Never an idle day! Over 8 years of industrial experience in Telecom - IT Management and opensource technologies, particularly Telecom/VoIP, Networks, IT Systems and Support, Systems Engineering and Servers Administration.", "why_threefold": "", "function": "Engineer", "project_ids": [1, 5], "contribution_ids": [6, 6], "nationality": "Egyptian"}, {"avatar": "images/adnan_fatayerji_processed.jpg", "full_name": "Adnan Fatayerji", "description": "Adnan is an international entrepreneur and part of a diverse team of innovators trying to redefine the foundation of internet.  Adnan has been based in the United Arab Emirates for the past 15 years, he has built grass root businesses and invested startups in various sectors. At Threefold he is responsible for driving operations and is honored to be part of a team that has the potential to make the world a better place by connecting billions of people to a new neutral and green internet accessible by all.", "why_threefold": "", "function": "Co-Founder", "rank": 2, "project_ids": [1, 3, 5, 12, 13, 14, 16], "contribution_ids": [1, 3, 3, 3, 3, 3, 3], "nationality": "American"}, {"avatar": "images/adriano_marques_processed.jpg", "full_name": "Adriano Marques", "description": "Adriano has a 20-year career in which he held multiple roles in the Telecom/IT industry. He took part in IT projects across Brazil and Belgium, ranging from the start up of mobile service providers and business transformations. He helps customers get the best out of Enterprise Software solutions and navigate the trenches of emerging technologies such IoT and 5G. Tech-geek at heart, Adriano is an enthusiast of Blockchain technologies and sees it as an instrument that could help shape our world into a more decentralized society. When not working or thinking about technology, you will find Adriano enjoying time with his family or maybe rocking with his band on stage.", "why_threefold": "I’m delighted to join ThreeFold as an ambassador and help share with the world our vision of how a neutral, scalable and accessible internet can also foster a more sustainable future. Edge computing will play a key role in a range of emerging applications, so there is enormous value to be created for consumers and businesses. I’m impressed by the team’s vision and their ability to put together the intricate pieces of this technology.", "function": "Ambassador", "rank": 0, "project_ids": [1], "contribution_ids": [2], "nationality": "Belgian-Brazilian"}, {"avatar": "images/ahmed_elsayed_processed.jpg", "full_name": "Ahmed Elsayed", "description": "Software test engineer", "why_threefold": "", "function": "Engineer", "rank": 0, "project_ids": [1, 8], "contribution_ids": [6, 6], "nationality": "Egyptian"}, {"avatar": "images/ahmed_hanafy_processed.png", "full_name": "Ahmed Hanafy", "description": "Software test engineer", "why_threefold": "", "function": "Engineer", "rank": 0, "project_ids": [1, 8], "contribution_ids": [6, 6], "nationality": "Egyptian"}, {"avatar": "images/ahmed_odeh_processed.jpg", "full_name": "Ahmed Odeh", "description": "Ahmed is a legal consultant specializing in civil & criminal dispute resolution in the UAE. Areas of practice also include commercial, real estate, arbitration and labour. Ahmed also has showcased proven results in managing legal teams in litigation and corporate services, fostering teamwork for projects such as due diligence and client reporting. He is also the author of knowyourrights.dubizzle.com", "why_threefold": "I believe that ThreeFold token will be the leading digital currency as it has a clear vision to utilise the best of blockchain technology to deliver IT capacity to everyone around the world", "function": "Ambassador", "rank": 0, "project_ids": [1], "contribution_ids": [2], "nationality": "Jordanian"}, {"avatar": "images/ahmed_siddique_processed.jpg", "full_name": "Ahmed Siddique", "description": "IT-Telecom ,Networking", "why_threefold": "", "function": "Engineer", "rank": 0, "project_ids": [1, 5], "contribution_ids": [6, 6], "nationality": "Egyptian"}, {"avatar": "images/ahmed_thabet_processed.jpg", "full_name": "Ahmed Thabet", "description": "Ahmed is an Electrical Engineer with great passion in Computer Science, Currently working with TF-Chain team", "why_threefold": "", "function": "Engineer", "rank": 0, "project_ids": [1, 8], "contribution_ids": [6, 6], "nationality": "Egyptian"}, {"avatar": "images/alain_andries_processed.jpg", "full_name": "Alain Andries", "description": "Experienced Managing Director with a demonstrated history of working in the information services industry since 1995. Skilled in Negotiation, Coaching, Sales and Management. Strong business development professional with a Post-Graduate, focused in Sales and Marketing Management.", "why_threefold": "I believe in the great idea of the ThreeFold Foundation, it nurtures my believe we can live in a better world.", "function": "Ambassador", "rank": 0, "project_ids": [1], "contribution_ids": [2], "nationality": "Belgian"}, {"avatar": "images/ali_chaddad_processed.jpg", "full_name": "Ali Chaddad", "description": "Software Engineer", "why_threefold": "", "function": "Engineer", "rank": 0, "project_ids": [1, 8], "contribution_ids": [6, 6], "nationality": "Egyptian"}, {"avatar": "images/ali_omari_processed.jpg", "full_name": "Ali Omari", "description": "Ali is the CEO of Safe City Group in Abu Dhabi, United Arab Emirates. 20 years of accumulative experience in the industry with a passion to concentrate on providing the latest technologies and solutions. ", "why_threefold": "I believe in ThreeFold Foundation’s dream in helping the world to become a better place.", "function": "Ambassador", "rank": 0, "project_ids": [1], "contribution_ids": [8], "nationality": "Emirati"}, {"full_name": "Amparo Miguel", "description": "", "why_threefold": "", "function": "", "rank": 0, "project_ids": [10], "contribution_ids": [3], "nationality": "Spanish"}, {"avatar": "images/andreas_hartl_processed.jpg", "full_name": "Andreas Hartl", "description": "Establishing new brands and building solid successful teams have been Andreas passion for more than 15 years. He held several senior roles at major ICT firms in both global and regional management responsibilities. Andreas was the Head of Global Channel Sales at GIG Technology, a technology company at the forefront of distributed IT infrastructure. Prior to this Andreas spent eight years at Riverbed in numerous senior roles including Regional Head for Germany, Austria and Switzerland and also EMEA Head of Channel Sales. Andreas has a strong track record of developing and executing business strategies and delivering revenues in new markets. He has a degree in Business Economics from the University of Regensburg in Regensburg, Germany.", "why_threefold": "", "function": "Co-Founder", "rank": 6, "project_ids": [1], "contribution_ids": [1], "nationality": "German"}, {"avatar": "images/andrew_ayoub_processed.jpg", "full_name": "Andrew Ayoub", "description": "Andrew is a passionate Computer Scientist who loves exploring new areas in life and technology", "why_threefold": "", "function": "Engineer", "rank": 0, "project_ids": [1, 2], "contribution_ids": [6, 6], "nationality": "Egyptian"}, {"avatar": "images/andy_brauer_processed.jpg", "full_name": "Andy Brauer", "description": "With 40 years of experience in the ICT Industry he covered most areas including Electronics, Telecommunications, Software Development, Business Development, and Innovation and with roles of Executive Director, Technical Director, Chief Information Officer and Chief Technology Officer. He also served on the Meraka Advisory Panel at the Council for Scientific and Industrial research in South Africa and as an advisor to Enterprise Ireland.   Previously Chief Technology Officer of Business Connexion, the largest Information and Communications technology company in Africa. Currently focused on Self Healing Technology, Deep Learning, as well an advance renewable energy. He has received Citation Awards for innovation.  His philosophy is to keep on learning.", "why_threefold": "The boiling frog is a parable describing a frog being slowly boiled alive. The premise is that if a frog is put suddenly into boiling water, it will jump out, but if the frog is put in tepid water which is then brought to a boil slowly, it will not perceive the danger and will be cooked to death. ThreeFold is key in helping people and companies think ahead and not end up in hot water.", "function": "Ambassador", "rank": 0, "project_ids": [1], "contribution_ids": [2], "nationality": "South African"}, {"full_name": "", "description": "", "why_threefold": "", "function": "", "rank": 0, "project_ids": [], "contribution_ids": [], "nationality": " "}, {"avatar": "images/ashraf_fouda_processed.jpg", "full_name": "Ashraf Fouda", "description": "Software Engineer with passion in new technologies, love every thing that is realy new and challenging.", "why_threefold": "", "function": "Engineer", "rank": 0, "project_ids": [1, 8], "contribution_ids": [6, 6], "nationality": "Egyptian"}, {"avatar": "images/atef_nazmy_processed.jpg", "full_name": "Atef Nazmy", "description": "IT-Telecom & Networking Engineer", "why_threefold": "", "function": "Engineer", "rank": 0, "project_ids": [1, 8], "contribution_ids": [6, 6], "nationality": "Egyptian"}, {"avatar": "images/bart_weijermars_processed.jpg", "full_name": "Bart Weijermars", "description": "Bart Weijermars has extensive international experience in the telecommunications industry. He has over 20 years experience in Board positions of international operators in Europe, including the role of CEO of T-Mobile in the Netherlands. As a Commercial Director for T-Mobile in Macedonia and the Netherlands, Eircom in Ireland and KPN Mobile in the Netherlands, he has successfully introduced new business models for growth and value creation. He currently is the CEO of Artilium plc, a London AIM listed software company that provides (tele)communication, IoT, billing, and identity management solutions to enterprises and telecom operators.", "why_threefold": "I strongly believe that new technologies can help people to make this world a better place. This requires neutral and equal access to internet infrastructure, all over the world. The ThreeFold Foundation enables just that.", "function": "", "rank": 0, "project_ids": [1], "contribution_ids": [2], "nationality": "Dutch"}, {"avatar": "images/binoy_r_v_meghraj_processed.jpg", "full_name": "Binoy R. V. Mehhraj", "description": "Binoy R. V. Meghraj is the Executive Vice Chairman of Meghraj Group, an investment banking advisory, fiduciary services and infrastructure consulting organisation headquartered in London, with offices in Europe, Asia and Africa, that looks after more than USD 15 billion in client assets. Binoy is responsible for the Group's strategy, investment banking advisory businesses and new business initiatives, and he has particular experience advising Japanese multinational companies on acquisitions and partnerships overseas. Binoy was born in London, and is now based between Dubai and Tokyo. He is a Trustee of two family charitable trutst focused on education and healthcare. He has an Honours Degree in Commerce and Accounting from the University of Birmingham, and an MBA with distinction from London Business School.", "why_threefold": "I believe in the TFF project because it is addressing fundamental challenges to the growth in data requirements through a green ecosystem, which combines a crypto currency backed by an efficient, distributed, less power hungry data network. It provides an innovative solution to the challenges, and believes in important principles including education and equality, benefits to the environment and that a currency should be backed by tangible assets.", "function": "Ambassador", "rank": 0, "project_ids": [1], "contribution_ids": [2], "nationality": "British"}, {"avatar": "images/bishoy_mikhaiel_processed.jpg", "full_name": "Bishoy Mikhaiel", "description": "I am cloud system engineer with 6 years experience on different platform Worked with openstack and virtualization Worked as an application support on tomcat and MySQL platform and on jumpsacle and postgres Worked on DCPM racktivity application.", "why_threefold": "", "function": "Engineer", "rank": 0, "project_ids": [1, 8], "contribution_ids": [6, 6], "nationality": "Egyptian"}, {"avatar": "images/bola_nasr_processed.jpg", "full_name": "Bola E. Nasr", "description": "Software Engineer with a passion for everything new and challenging in life and technology.", "why_threefold": "", "function": "Engineer", "rank": 0, "project_ids": [1, 8], "contribution_ids": [6, 6], "nationality": "Egyptian"}, {"avatar": "images/brian_bogaerts_processed.jpg", "full_name": "Brian Bogaerts", "description": "Brian is an internationally well-connected entrepreneur, with a passion for people and technology, at his best launching and building initiatives from scratch. He comes with relentless energy and a solid track record at Alcatel-Lucent, The Boston Consulting Group and KPN, where he held senior management positions in strategy, innovation and business development roles. More recently, Brian launched and sold a few data-driven companies, mainly focusing on cross- and up-sell logic and in the web analytics space.Today, Brian is a co-founder at DataTeam.Services, a pan European go-to-market company focusing on international expansion (and other activities) for its partners. He comes with an MSc in electromechanical engineering, holds an MBA, lives in The Hague and can be reached at +31613934639.", "why_threefold": "The ThreeFold Foundation is a future path to an accessible and sustainable digital world, for entrepreneurs from around the world to build upon. Unleashing entrepreneurial power of the many, rather than the few.", "function": "Ambassador", "rank": 0, "project_ids": [1], "contribution_ids": [2], "nationality": "Belgian"}, {"avatar": "images/bruce_lites_processed.jpg", "full_name": "Bruce Lites", "description": "Bruce is an internationally recognized astrophysicist specializing in studies of the Sun and its magnetic fields. He is best known for leading the development of innovative instrumentation for observing solar magnetic fields, both from the ground and in space. Throughout his career spanning more than 40 years, he has contributed to the advancement of our understanding of the Sun as witnessed by his authorship of over 170 scientific publications in peer-reviewed journals. He received a PhD in Physics and Astrophysics at the University of Colorado, USA, and in retirement he is a Senior Scientist Emeritus and Distinguished Scholar at the National Center for Atmospheric Research, USA.", "why_threefold": "I believe that access to a neutral, efficient, and secure internet is essential to the survival of humanity Planet Earth. The ThreeFold foundation is a shining example of facing these challenges with pragmatism and conscience.", "function": "Ambassador", "rank": 0, "project_ids": [1, 15], "contribution_ids": [2, 1], "nationality": "American"}, {"avatar": "images/carlos_mario_sanches_avila_processed.jpg", "full_name": "Carlos Mario Sanches Avila", "description": "Mario is the Founder of The 5 ELEMENTS Therapy™ and has been sharing his healing gift all over the world for the past 11 years. His passion to travel, charisma and unmatchable energy has brought transforming exceptional results of long-term effect to the patients in more than 35 countries. With his own unique Healing Waves therapy, he now continues to spread his work globally both through private sessions, and teaching with his workshop series.", "why_threefold": "Bruce is an internationally recognized astrophysicist specializing in studies of the Sun and its magnetic fields. He is best known for leading the development of innovative instrumentation for observing solar magnetic fields, both from the ground and in space. Throughout his career spanning more than 40 years, he has contributed to the advancement of our understanding of the Sun as witnessed by his authorship of over 170 scientific publications in peer-reviewed journals. He received a PhD in Physics and Astrophysics at the University of Colorado, USA, and in retirement he is a Senior Scientist Emeritus and Distinguished Scholar at the National Center for Atmospheric Research, USA.", "function": "Ambassador", "rank": 0, "project_ids": [1], "contribution_ids": [2], "nationality": "Mexican"}, {"avatar": "images/chris_hurd_processed.jpg", "full_name": "Chris Hurd", "description": "A graduate of Cambridge University, Chris has spent most of his career to date in the financial services sector, with the last 20 years spent in senior banking roles in London, Singapore and Moscow. These and other previous positions have contributed to a rich and varied set of skills and experience which he is now deploying in the non-executive and advisory spheres. In this context, the aims of ThreeFold Foundation are both close to his heart and offer the opportunity for him to make a strong contribution and impact. Chris is married with 3 children and currently resides in the UK, but travels widely and maintains strong ties with Asia in particular. He greatly enjoys working with people and exploring new interests and cultures.", "why_threefold": "ThreeFold Foundation offers new channels of access and investment to a very diverse audience and so deserves to succeed. It is a step into the future whose potential for good knows no boundaries", "function": "Ambassador", "rank": 0, "project_ids": [1], "contribution_ids": [2], "nationality": "British"}, {"avatar": "images/chris_hutton_processed.jpg", "full_name": "Chris Hutton", "description": "A serial entrepreneur and technology fanatic for 25 years now. Always researching tech trends and looking for new technologies to introduce to Africa. The continent of Africa is unique, to say the least, and the issues prohibiting growth and development are unique. Africa has proven its ability to leap frog a generation in technology with the rapid adoption of mobile telecommunications and its time to bring the new internet to this continent and watch how access to information creates equality and opportunity for Africa.", "why_threefold": "", "function": "Co-Founder", "rank": 2, "project_ids": [1, 2], "contribution_ids": [1, 1], "nationality": "South African"}, {"avatar": "images/christian_seidl_processed.jpg", "full_name": "Christian Seidl", "description": "Christian is the founder and managing partner of Seidl Consult GmbH, which offers to its clients strategy consulting, transaction advisory services and project management support, especially in IT & Compliance related projects. Prior to starting his own company, Christian worked thirteen years in the financial industry, successfully managing several alternative investment funds. Over the last couple of years, Christian became passionate about digitalization and cryptocurrency and new business models deriving from it. Helping organizations to get smarter and better by adapting this new technology is what he loves doing.", "why_threefold": "Christian is a strong believer and early supporter of the TFF dream „…to make the Internet accessible for all people; securely, equally and seamlessly ​through ​environmentally-sustainable ​technology.“ Access to internet capacity will become a basic right and necessity for all humans and existing technology and network infrastructure will not be able to cope with the growing demand. TFF’s vision and solution to tackle these shortcomings is unique and groundbreaking and Christian is proud and exited to be part of the TFF community and support TFF’s great team as an ambassador.", "function": "Ambassador", "rank": 0, "project_ids": [1], "contribution_ids": [2], "nationality": "German"}, {"avatar": "images/christophe_de_carvalho_pereira_martins_processed.jpg", "full_name": "Christophe De Carvalho Pereira Martins", "description": "Christophe is a passionate developer that likes to travel the world. Trying to improve the world around him using technology is one of his goals. He is currently working for TF Tech and is involved in the 0-OS projects among other things.", "why_threefold": "", "function": "Engineer", "rank": 0, "project_ids": [1, 2, 17], "contribution_ids": [6, 6, 3], "nationality": "Belgian"}, {"avatar": "images/daniela_nikolova_processed.jpg", "full_name": "Daniela Nikolova", "description": "Daniela Nikolova is an Integrative Nutrition Health Coach, Emotional and Spiritual Intelligence Guide, Intuitive Personal and Business Advisor who combines her knowledge and natural gifts in different therapies and healing modalities in order to assist others achieve balance, awareness and alignment on all levels and areas of their lives. Her journey began back in 2008 when she was faced with numerous health challenges. She sees that phase of her life as one of her biggest blessings where she learned the true value of life, love, compassion and gratitude. It was during her time of healing through awareness, energy and alternative medicine when she discovered her true life purpose and desire to helping others and guiding them towards living life on purpose and truth. Daniela is passionate about contribution and is currently involved in few voluntary projects worldwide. She believes that we are here to create Heaven on Earth through finding balance between our intellect and heart wisdom, our skills and intuition. Her recipe for achieving and reaching any goal in life is: Starting point: Love followed by intention setting+ action + consistency and faith. Daniela follows a vegan diet, loves dancing, loves life.", "why_threefold": "", "function": "Company life coach & spiritual healer", "rank": 17, "project_ids": [1], "contribution_ids": [1], "nationality": "Ukranian"}, {"avatar": "images/didem_gordon_processed.jpg", "full_name": "Didem Gordon", "description": "Didem has over 25 years of experience in building and developing businesses in emerging markets and strategic management. Her career as a top executive in investment banking and wealth management and an opinion leader in the Turkish finance sector resulted in a valuable global reach over the years. Didem's thirst for knowledge and passion for creation paved her way into venture consulting over the recent years where she advises in make ideas into enterprises with a focus on operational excellence, talent management, and stakeholder relations​. Having a keen interest in technology and innovation, as a water-bearer, she has been investing her time in continuously learning and working with high-tech startups in Europe and the US. Making a positive impact for a better world defines her business scope as she carefully choses the projects she works on that aim towards a better world and is in the process of establishing her startup, Phaida Ventures upon this key principle. Didem is very honored to be part of the ThreeFold team in thriving to provide a green and neutral internet shared by all.", "why_threefold": "", "function": "Business Developer", "rank": 13, "project_ids": [1, 2], "contribution_ids": [1, 1], "nationality": "Turkish"}, {"avatar": "images/dieter_legat_processed.jpg", "full_name": "Dieter Legat", "description": "", "why_threefold": "", "function": "", "project_ids": [1, 2], "contribution_ids": [1, 1], "nationality": "Austrian"}, {"avatar": "images/dina_abdelrahman_processed.jpg", "full_name": "Dina Abdelrahman", "description": "Dina 1 year experience in CloudComputing, getting her Bachelor degree in Communication Engineer Free time = Reading, Cooking, watching movies and keep in touch with technology", "why_threefold": "", "function": "Engineer", "rank": 0, "project_ids": [1, 8], "contribution_ids": [6, 3], "nationality": "Egyptian"}, {"avatar": "images/dina_magdy_processed.jpg", "full_name": "Dina Magdy", "description": "Dina Magdy is working as an Automation Software Testing Engineer, starting her carreer at codescalers , and now has about 2 year experience in cloudcomputing software .", "why_threefold": "", "function": "Engineer", "rank": 0, "project_ids": [1, 8], "contribution_ids": [6, 3], "nationality": "Egyptian"}, {"avatar": "images/ehab_hassan_processed.jpg", "full_name": "Ehab Hassan", "description": "I am a person who is positive about every aspect of lifes.", "why_threefold": "", "function": "Senior Graphic Designer & Webdeveloper", "rank": 0, "project_ids": [1, 8], "contribution_ids": [6, 6], "nationality": "Egyptian"}, {"avatar": "images/erik_de_rijk_processed.jpg", "full_name": "Erik de Rijk", "description": "Erik fell in love with Unix/Linux/Open Source in 1989 on his Highschool and it never left him. His passion is programming (Shell, php, C and C++) but last few years barely been able to sit behind a Linux terminal to write some proper code (although his hands are itching whenever he sees the crap that is floating out there). Co-founded Unix Support Nederland (USN) with 8 other students and now co-founder and head of a Linux consultancy company (Proxy) with 50 highly qualified Unix/Linux/Open Source technicians in the Netherlands (who call themselves Nerds...).", "why_threefold": "After the software/OS revolution that Linux invoked, we need a similar revolution in compute and storage and the ThreeFold foundation may be the spark we need to start this.", "function": "Ambassador", "rank": 0, "project_ids": [1], "contribution_ids": [2], "nationality": "Dutch"}, {"avatar": "images/erik_reitsma_processed.jpeg", "full_name": "Erik Reitsma", "description": "Erik is an entrepreneur and designer from Holland. Together with his companions he loves to invent, create and make things possible. By looking at things from another perspective they reinvent reality. That is how unexpected but often simple solutions arise on things such as one's own pension fund, circulair material use and sharing-projects. To be able to accomplish things, he strongly believes in keeping things simple and bringing people together.", "why_threefold": "I love the TFF’s decentralized solution for the future of internet and like to help making it a reality for everyone in any way i can.", "function": "Ambassador", "rank": 0, "project_ids": [1], "contribution_ids": [2], "nationality": "Dutch"}, {"avatar": "images/erik_van_der_meulen_processed.jpg", "full_name": "Erik van der Meulen", "description": "Erik firmly believes that entrepreneurship provides the only sustainable solution to many of humanity's greatest challenges. He has been active as an entrepreneur for over 25 years and co-founded several succesful businesses. Some of these are united in Powered By Meaning, a growing ecosystem of companies that have one shared mission: make impact through collective entrepreneurship. Erik is passionate about conceiving and realising new creative business concepts that unite both social and economic value.", "why_threefold": "The Treefold Foundation aims to solve some of the fundamental shortcomings of the technologies that shape our future. I strongly support the values and the goals of the team and am exited about the opportunity to support them as ambassador.", "function": "Ambassador", "rank": 0, "project_ids": [1], "contribution_ids": [2], "nationality": "Dutch"}, {"avatar": "images/erwin_raets_processed.jpg", "full_name": "Erwin Raets", "description": "Erwin has always been interested by the latest technologies, and always eager to try out the latest crazy things. He worked in the entertainment business, autosports, as a software developer and architect, and currently also running a company that provides charging solutions for electric cars. He came to realize in the past few years that we as humans need to address some very important issues to make sure we don’t ruin our planet in front of our grandchildren. That is why he want to help focus on making effective use of energy resources and fine-tuning the capture and storage of green energy.", "why_threefold": "I strongly believe that blockchain technology will bring about big changes in the foreseeable future, and what the ThreeFold Foundation has set forth as goals, and the way they want to do it, has my full support.The edge computing backbone combined with a value-backed token will provide a solid foundation to expand the internet to those that currently have no access to the world’s information highway.", "function": "Ambassador", "rank": 0, "project_ids": [1], "contribution_ids": [2], "nationality": "Belgian"}, {"avatar": "images/evon_yacoub_processed.jpg", "full_name": "Evon Yacoub", "description": "", "why_threefold": "Experienced Office Manager with a demonstrated history of working in the computer software industry. Skilled in Human Resources, Management, Office Administration .. has Strong administrative professional", "function": "Office Manager", "rank": 0, "project_ids": [1, 8], "contribution_ids": [6, 3], "nationality": "Egyptian"}, {"avatar": "images/franco_sorgi_processed.jpg", "full_name": "Franco Sorgi", "description": "Born and raised in Italy, living in the USA, Citizen of the world, let's see what's next. Vice president of Fine Foods Solutions, food and service industry California, USA (currently). Director of operations 'Brandy Melville Canada', woman fashion and apparel, ontario Canada (currently). Blockchain believer, Bitcoin enthousiast, cryptocurrency fanatic.", "why_threefold": "I strongly believe in decentralization, net neutrality, privacy, open source organizations, transparancy, equal distribution, and the freedom to connect to anyone in the world without any filter. But then again... I may be crazy! I believe that the ThreeFold Foundation falls exactly in the categories I just mentioned, thus I'd love to give my support.", "function": "Ambassador", "rank": 0, "project_ids": [1], "contribution_ids": [2], "nationality": "Italian/American"}, {"avatar": "images/frederico_fumagalli_processed.jpg", "full_name": "Frederico Fumagalli", "description": "Federico,46, holds a Bachelor in Economy and an Executive Management certificate at SDA Bocconi. After having spent 10+ in IT, Federico served for several years a multinational company active in machines industry where he’s been engaged in different executive management positions. Actually, Federico is COO of an innovative Swiss Biomedical company and actively engaged in other innovative and edge-technology initiatives.", "why_threefold": "I firmly believe that TFF fills at the best the huge mid-long term gap between availability and demand for one of the key resources: IT capacity. I share the vision of granting whoever and wherever a fair priced, nature friendly and close-by internet capacity. TFF is backed not only with assets but with the right core human values.", "function": "Ambassador", "rank": 0, "project_ids": [1], "contribution_ids": [2], "nationality": "Italian"}, {"avatar": "images/garry_veale_processed.jpg", "full_name": "Garry Veale", "description": "Technology veteran & previous EMC EMEA Vice President - who was part of the original/founding EMC EMEA team that was recognised by for both creating a new market category & being the fastest growing technology company of the decade. Expertise around introducing and developing world class, disruptive & game changing technologies – previous experience also includes EMEA Director & VP roles at IBM, HP & Avaya - plus several tech start-ups", "why_threefold": "Sometimes in life - it's about making a stand, calling it as it is & doing the right thing. That's what the ThreeFold Foundation is about - innovation & integrity!", "function": "Ambassador", "rank": 0, "project_ids": [1], "contribution_ids": [2], "nationality": "Welsh"}, {"avatar": "images/geert_machtelinckx_processed.jpg", "full_name": "Geert Machtelinckx", "description": "Geert has 24 years of experience in IT of a Belgian financial institution, and is passionate about new technologies such as AI and blockchain.", "why_threefold": "With digitisation and blockchain, the world is changing. I believe that doing it the ThreeFold way, the world will change according to the true spirit of blockchain, enabling a real decentralisation and bringing more equality. Moreover, having internet capacity used as a real world value backing and a monetary instrument, ThreeFold can make the bridge between the cryptoworld and the ‘old’ world.", "function": "Ambassador", "rank": 0, "project_ids": [1], "contribution_ids": [2], "nationality": "Belgian"}, {"avatar": "images/georges_gesek_processed.jpg", "full_name": "Georges Gesek", "description": "George Gesek is the founder and CEO of NOVARION.systems, the high performance computer maker, who wants to create the first commercially successful Quantum Computer. After his studies of physics at the Technical University of Vienna, Gesek entered the ICT industry to foster the beginning merge of computer and quantum science. This milestone of humanity seems to be reached now with the state of the art production techniques in the nanometer realm.", "why_threefold": "I see the ThreeFold Foundation as the first comprehensive attempt to create a fail-safe and non-manipulable algorithmic transaction system, which will be capable of distributing fundamental resources, like compute power or food, equally and suitably to all humans.", "function": "Ambassador", "rank": 0, "project_ids": [1], "contribution_ids": [2], "nationality": "Austrian"}, {"avatar": "images/gert_de_spiegeleer_processed.jpg", "full_name": "Gert De Spiegeleer", "description": "After a brief period of working in the financial world, Gert fell in love with education. He has been teaching (business) economics and accounting in a secondary school in Flanders for years. Gert became the schoolmanager in 2008 and in 2016 he was elected general manager of his schoolcommunity. Gert is a true believer of life long learning.", "why_threefold": "I strongly believe that IT can help to create a better world and that is exactly the mission of the ThreeFold Foundation. Every human being, born on this planet should have acces to good education and equal chances in the pursuit of happiness. We need to create a legacy of a greener, healthier and happier world for our children.", "function": "", "rank": 0, "project_ids": [], "contribution_ids": [], "nationality": "Belgian"}, {"avatar": "images/glen_de_cauwsemaecker_processed.jpg", "full_name": "Glen De Cauwsemaecker", "description": "Research & Develop Open Source Software", "why_threefold": "", "function": "Engineer", "rank": 0, "project_ids": [1, 2, 3], "contribution_ids": [6, 6, 3], "nationality": "Belgian"}, {"full_name": "", "description": "", "why_threefold": "", "function": "", "rank": 0, "project_ids": [], "contribution_ids": [], "nationality": " "}, {"avatar": "images/gregor_sideris_processed.jpg", "full_name": "Gregor Sideris", "description": "Gregor lives in Vienna, Austria and is currently a Digital Marketing Manager responsible for Social Media at IBM Central Europe Region headquarters. Since 2009 Gregor is very active in Social Media where he now reaches over 8 million people every month and runs a successful Lifestyle Blog (www.theviennablog.com). As one of the leading Tech & Lifestyle Influencer in Europe he is often invited as a consultant and public speaker.", "why_threefold": "I am sure the concept and strategy of ThreeFold is exactly what the world/markets needs now. Most importantly I believe in the people and Ambassadors who are part of the movement/mission.", "function": "Ambassador", "rank": 0, "project_ids": [1, 2], "contribution_ids": [2, 5], "nationality": "Austrian"}, {"avatar": "images/hamdy_farag_processed.jpg", "full_name": "Hamdy Farag", "description": "Senior Software Engineer", "why_threefold": "", "function": "Engineer", "rank": 0, "project_ids": [1, 8], "contribution_ids": [6, 6], "nationality": "Egyptian"}, {"avatar": "images/his_excellency_dr_kanwal_sibal_processed.jpg", "full_name": "His Excellency Dr. Kanwal Sibal", "description": "Kanwal Sibal, with 41 years of experience in diplomacy, is a former Foreign Secretary to the Government of India. He has served as Ambassador to Turkey, Egypt, France and Russia. He was a member of India's National Security Advisory Board from 2008 to 2010. He is on the Board of the New York based East-West Institute. He has written more than 450 Op-Eds and other articles for major national journals and periodicals on international affairs. He was made a Grand Officier of the Ordre National du Merite by the French President. In 2017 he received the Padam Shree award from the President of India.", "why_threefold": "The use of the internet will explode in the years ahead as more and more people across the globe connect to it as countries lagging behind in internet usage catch up with the rest. Energy use will grow commensurately and hence the need for “green” solutions which, I believe, the model proposed by the ThreeFold foundation will promote through highly efficient energy storage, distributed computing, anti-hacking safeguards, and protecting our rights to privacy through blockchain, and all this through an innovative financial structure.", "function": "Ambassador", "rank": 0, "project_ids": [1], "contribution_ids": [2], "nationality": "Indian"}, {"avatar": "images/isabelle_peeters_processed.jpg", "full_name": "Isabelle Peeters", "description": "Isabelle is a fun-loving person, besides being an advit evangelist of the ThreeFold Movement she is the owner of the Veda boats and hosts retreats on the beautiful river Nile. Everything Isabella does comes from the heart with an enormous amount of passion. Her dreams is to help people grow in awareness, and make the world a more colorful and peaceful place by doing so.", "why_threefold": "", "function": "Co-Founder", "rank": 16, "project_ids": [1, 10], "contribution_ids": [1, 1], "nationality": "Belgian"}, {"avatar": "images/islam_taha_processed.jpg", "full_name": "Islam Taha", "description": "Senior Software Testing Engineer", "why_threefold": "", "function": "Engineer", "rank": 0, "project_ids": [1, 8], "contribution_ids": [6, 6], "nationality": "Egyptian"}, {"full_name": "", "description": "", "why_threefold": "", "function": "", "rank": 0, "project_ids": [], "contribution_ids": [], "nationality": " "}, {"avatar": "images/james_gareth_short_processed.jpg", "full_name": "James Gareth Short", "description": "James is a successful entrepreneur with a background in large scale property development. He was the Chairman and Founder of BioGen Power and delivered the UK’s first Gasification EfW plant. He also partnered with Acorn Power and GE to develop a large power station facility. James expertise are anchored around building effective management teams and creating relevant partnerships.", "why_threefold": "Philippe Guillemot, 58, is the former Chief Operating Officer at Alcatel-Lucent SA, Boulogne-Billancourt, France, prior to its acquisition by Nokia Oyj at the beginning of 2016. Prior to this tenure with Alcatel-Lucent, Guillemot was Chief Executive Officer and Board Director of Europcar Group from 2010 to 2012, Guyancourt, France; Chairman and CEO of Areva T&D, Paris, from 2004 to 2010; Group Executive Vice President, Faurecia SA, Paris, from 2001 to 2003; Group Vice President, Valeo, Paris, from 1998 to 2000; and he held several global executive positions with Michelin from 1983 to 1998. Guillemot is graduated from Ecole Nationale Supérieure des Mines de Nancy, France; and received an MBA from Harvard Business School. He serves on the board of directors of Constellium a global aluminium products manufacturer, Amsterdam, The Netherlands; Sonoca a global provider of a variety of consumer packaging, Hartsville, S.C. USA and previously served on the Board of Visteon Corporation, an auto parts manufacturer, Detroit, MI USA.", "function": "Ambassador", "rank": 0, "project_ids": [1], "contribution_ids": [2], "nationality": "British"}, {"avatar": "images/jan_de_landtsheer_processed.jpg", "full_name": "Jan de Landtsheer", "description": "Head of Research & Development", "why_threefold": "", "function": "Head of Research & Development", "rank": 0, "project_ids": [1, 2], "contribution_ids": [6, 6], "nationality": "Belgian"}, {"avatar": "images/jennifer_long_processed.jpg", "full_name": "Jennifer Long", "description": "I believe in this endeavor of the ThreeFold Foundation because it equates to actually being the 'people's internet' in that it is distributed around the world to share with the population of the planet where we decide who and what can access our information. Additionally, I believe this will be a catalyst for countries lacking in internet capability to motivate those countries to upgrade their IT so that they can utilize this system on ThreeFold to generate income for the country as well as to spread the opportunity to individuals in those same countries to use a node, cluster or even join cooperative farming efforts.", "why_threefold": "I believe in this endeavor of the ThreeFold Foundation because it equates to actually being the 'people's internet' in that it is distributed around the world to share with the population of the planet where we decide who and what can access our information. Additionally, I believe this will be a catalyst for countries lacking in internet capability to motivate those countries to upgrade their IT so that they can utilize this system on ThreeFold to generate income for the country as well as to spread the opportunity to individuals in those same countries to use a node, cluster or even join cooperative farming efforts.", "function": "Ambassador", "rank": 0, "project_ids": [1, 15], "contribution_ids": [2, 1], "nationality": "American"}, {"avatar": "images/jo_de_boeck_processed.jpg", "full_name": "Jo de Boeck", "description": "Jo has over 10 years of experience in CloudComputing software. After getting his Bachelor degree in ICT he joined Kristof and his team. Currently Jo is working as a development teamleader working on OpenvCloud [https://github.com/0-complexity/home] and Zero-OS [https://github.com/zero-os/home]. In his free time he likes to watch movies, series and keep in touch with technology.", "why_threefold": "", "function": "Engineer", "rank": 0, "project_ids": [1, 8], "contribution_ids": [6, 6], "nationality": "Belgian"}, {"avatar": "images/john_kheir_processed.jpg", "full_name": "John Kheir", "description": "John has started his carrer working for GIG, He has now about 3 years of experience in Cloud Computing software. Currently John is working as a Automation Software Testing Engineer for TFtech, working on writinig automation testsuites for all the project components.", "why_threefold": "", "function": "", "rank": 0, "project_ids": [1, 8], "contribution_ids": [6, 6], "nationality": "Egyptian"}, {"full_name": "", "description": "", "why_threefold": "", "function": "", "rank": 0, "project_ids": [], "contribution_ids": [], "nationality": " "}, {"avatar": "images/joris_vermeulen_processed.jpg", "full_name": "Joris Vermeulen", "description": "Joris Vermeulen is a passionate entrepreneur always ready for new challenges, he graduated with a Master of Science degree and has over 2 decades of experience in IT. He started his career as a programmer and gradually worked his way up to become a business consultant and later a senior/head solution architect within various large companies (AG Insurance, 3M, Honda, BNP Paribas). Joris is also enterprising and as a side business, he combined the professional network he had built throughout the years with the needs of several companies (AG Insurance, BNP Paribas, Bank Delen) to help them recruit highly trained IT consultants. Joris is a very warm, open and versatile person.", "why_threefold": "", "function": "Advisor", "rank": 18, "project_ids": [1, 2, 4], "contribution_ids": [1, 4, 4], "nationality": "Belgian"}, {"avatar": "images/judi_bechard_processed.jpg", "full_name": "Judi Bechard", "description": "Judi holds qualifications in Information Systems having spent 12 years working internationally for corporations as a Technical Specialist in the field of Information Technology. Judi Bechard is also a certified and experienced Intuitive Consultant and Healing Therapist, working with clients in 8 countries and counting. In addition to her current private practice, Judi is the Director of HealthCare Victoria, a community resource providing access to over 1600 natural healthcare providers.", "why_threefold": "It was love at first byte! When you know, you know.ThreeFold has an admirable and worthy mission to expand and revolutionize the way the global community connects online in a responsible, sustainable, future-minded way.", "function": "Ambassador", "rank": 0, "project_ids": [1], "contribution_ids": [2], "nationality": "Canadian"}, {"avatar": "images/kevin_louis_obeegadoo_processed.jpg", "full_name": "Kevin Louis Obeegadoo", "description": "Kevin enjoys 20+ years’ consulting across private and government sectors, on strategy, value creation, and assisting in structuring for international business, and is based in Mauritius since 2001. Having consulted across various business sectors including Automobile, Financial Services, FMCG, IT and Telecommunications, Media, Property Development & Management, he enjoys team‐working on game-changing projects, creating value, and moving businesses to new levels, while being committed to charitable and social endeavours.", "why_threefold": "With a unique, realistic, and achievable solution to building a green, decentralised, distributed, and neutral IT infrastructure globally, committed to true values and charity, how can anyone not believe in the ThreeFold Foundation vision ?", "function": "Ambassador", "rank": 0, "project_ids": [1], "contribution_ids": [2], "nationality": "British - Mauritian"}, {"avatar": "images/krish_r_krishnan_processed.jpg", "full_name": "Kris R. Krishnan", "description": "Mr. Krish R. Krishnan is a founder director and CEO of Green Village Ventures (GVV, a rural India oriented, solar off-grid based social venture. GVV has entered in a Public Private Partnership with the Government of India and has installations in 250 village communities. During an Indian Republic day event held in 2016, the Indian Prime Minister Mr. Narendra Modi and French President Mr. Francois Hollande commended GVV through a joint statement. Mr. Krishnan was awarded a Citation by the Government of Nepal for his Climate Change Policy Advisory efforts and in designing, assisting and sponsoring the Nepalese Cabinet Meeting at the Mount Everest Base Camp. He has testified before the US Senate on Environment, Technology & Internet issues. Mr. Krishnan has been a recognized expert in the field of Sustainable Environmental Development, Renewable Energy Development, “Paperless” Compliance and Software Technology.", "why_threefold": "The ability to deliver positive social, climate change and economic returns carves out an unique position for the ThreeFold Foundation. Such a mission has the inherent ability to effect transformative changes to Emerging Economies", "function": "Ambassador", "rank": 0, "project_ids": [1], "contribution_ids": [2], "nationality": "Indian"}, {"avatar": "images/kristian_jarnefeld_processed.jpg", "full_name": "Kristian Järnefeld", "description": "Kristian Järnefelt is the Executive Vice President of Consumer security of F-Secure Corporation. He has been a member of the Leadership Team since February 2016, when he joined F-Secure. Prior to joining the Company, Mr. Järnefelt worked for Fujitsu Finland Oy as Sales Director (2014-2015). Previously he has also worked as CEO and partner at Miradore Oy (2010-2014), CEO and partner at Concilio Networks Oy (2006-2009) and in several senior leadership roles at Hewlett Packard (1994-2006). He holds a Master's Degree in Economics and Business Administration.", "why_threefold": "The internet has turned into a centralized mainframe like phenomena dominated by a few global giants and ThreeFold Foundation’s grid-like distributed & eco-friendly internet is taking it back to its roots providing an alternative. Using this infrastructure to back-up the new Coin Offering brings also a solid alternative to the speculative virtual currencies making it also more tangible.", "function": "Ambassador", "rank": 0, "project_ids": [1], "contribution_ids": [2], "nationality": "Finnish"}, {"avatar": "images/kristof_de_spiegeleer_processed.jpg", "full_name": "kristof de spiegeleer", "description": "Kristof is a humanist & motivated entrepreneur, passionate to help make the world a better place.\nHe likes to develop and invent infrastructure IT systems (storage, automation, cloud computing).\nKristof has founded more than 10 companies from which 6 have been acquired by large IT players.\nHe was lucky to be part of the first teams building the Internet and has helped to grow datacenters & ISPs mainly in Europe.\nCurrently Kristof is CEO of the ThreeFold Foundation.\nKristof strongly believes there is need for a neutral internet owned by millions.", "why_threefold": "", "function": "Co-Founder", "rank": 1, "project_ids": [1, 2, 3], "contribution_ids": [1, 1], "nationality": " "}, {"avatar": "images/kyle_weber_processed.jpg", "full_name": "Kyle Weber", "description": "Kyle has spent the last 10 years working in/on sustainability projects ranging from large scale commercial solar farms to rural NGO tuberculosis control programs. He has worked on a number of startups and founder of EVERA, a Dubai-based organization trying to make mobility more sustainable. Everyday he tries very hard not to be an idiot, or take himself too seriously. Sometimes he is successful.", "why_threefold": "I believe in ThreeFold Foundation because I believe in the people behind the movement.", "function": "Ambassador", "rank": 0, "project_ids": [1], "contribution_ids": [2], "nationality": "American"}, {"avatar": "images/lee_smet_processed.jpg", "full_name": "Lee Smet", "description": "Lee is a software developer working on the TF-chain. Before ThreeFold Lee was mainly involved in the creation of Itsyou.online in his time at GIG.tech. In his spare time, Lee can be found on the soccer pitch in keeping the scoreboard against his team Sint-Anna Lokeren on a steady 0.", "why_threefold": "", "function": "Engineer", "rank": 0, "project_ids": [1, 2], "contribution_ids": [6, 6], "nationality": "Belgian"}, {"avatar": "images/leonora_blekaityte_processed.jpg", "full_name": "Leonora Blekaityte", "description": "Leonora (Be You) Blekaityte: a motivational speaker, personal development consultant, book author, creator of femininity unleashing techniques and certified body consiousness technique NIA trainer. Leonora successfully completed different psychological studies and is closely collaborating with recognized psychologists, therapists and scientists. Leonora specializes in human personal growth and especially focuses on women psychology and spirituality. Leonora has been been delivering trainings, seminars, individual consultations, group meditations, giving speeches and organizing retreats all over the world.", "why_threefold": "ThreeFold Foundation is a world empowering project. I believe in it’s vision and actions, which helps to connect the world in a more eco friendly, decentralized and independent way, helping the world to be a better place", "function": "Ambassador", "rank": 0, "project_ids": [1], "contribution_ids": [2], "nationality": "Lithuanian"}, {"avatar": "images/lieve_vereycken_processed.jpg", "full_name": "Lieve Vereycken", "description": "In 1999, I started my own business in the market of recruitment, the time internet got introduced in the business world. Wicked problems for matching talent to job opportunities were faced. I realised we could do far better by giving back control over personal data to the individual and start redefining business processes and businesses. Therefore I shared, learned and connected myself. I connected myself to initiatives for knowledge sharing, networking and innovation. Because I do believe it is the responsibility and the opportunity of our generation to get the appropriate digitale infrastructure available to move to our next level of prosperity.", "why_threefold": "Thanks to ThreeFold Foundation robust technology comes available in good organisational design. A design that takes in account that humankind strives for prosperity for all.", "function": "Ambassador", "rank": 0, "project_ids": [1], "contribution_ids": [2], "nationality": "Belgian"}, {"avatar": "images/liliana_carrillo_processed.jpg.jpg", "full_name": "Liliana Carrillo", "description": "Social and Digital Entrepreneur and Researcher, proud ThreeFold Ambassador", "why_threefold": "When water does not flow it gets foul. Other resources are for me like water.  When resources do not flow they also 'foul', they get concentrated in the hands of a few, leading to the concentration of power.  I am part of the ThreeFold movement because the team is creating technology that enables resources to flow, distribute them and decentralize them.  Most of my work is related to the decentralization of power at different levels, starting from individual work to global movements. I am contributing to a global shift and decentralization of data storage, decision power, business, education to mention some.  Join the ThreeFold movement!", "function": "R&D Manager and HR", "rank": 0, "project_ids": [1], "contribution_ids": [2], "nationality": "World citizen, Colombian/Spanish living in Belgium"}, {"avatar": "images/lucia_groenfelt_processed.jpg", "full_name": "Lucia Groenfelt", "description": "Lucia has been working in Human Resources for most of her life and has a passion for getting things done the right way for the company, but certainly also for the individual. She's looking forward to bring this movement to the next level and get internet capacity in the hands of people that have had very poor access to it to date.", "why_threefold": "ThreeFold's vision is an ambitious one: to create a neutral, private, efficient and affordable internet. ThreeFold's team has breakthrough technology that will create a new, distributed and accessible for anyone internet. The world is dying for an alternative to large, non-transparent and privacy-invading service providers of today. Equal chances for every one of us, not a happy few of us.", "function": "Ambassador", "rank": 0, "project_ids": [1], "contribution_ids": [2], "nationality": "Dutch"}, {"avatar": "images/lucie_nguyen_processed.jpg", "full_name": "Lucie Nguyen", "description": " International sales executive with more than 12 years experience managing large corporate accounts across Europe and having lived in France, Belgium and the UK. Lucie has in-depth knowledge and understanding of the global telecommunications industry.\nPassionate about new technologies, especially how this can be used to solve customers’ pain points, Lucie has an excellent track record for developing new business opportunities and building excellent working relationships at all levels within large multinational corporations.\n", "why_threefold": "", "function": "Co-Founder", "rank": 23, "project_ids": [1, 2], "contribution_ids": [1, 1], "nationality": " French "}, {"full_name": "", "description": "", "why_threefold": "", "function": "", "rank": 0, "project_ids": [], "contribution_ids": [], "nationality": " "}, {"avatar": "images/maria_marchenko_processed.jpg", "full_name": "Maria Marchenko", "description": "Maria has over 10 years experience on Russian IT market. Now she is the Founder & CEO of Data Frame (www.data-frame.ru). She holds an MBA in Finance from California State University, East Bay, USA and degree in Economics from Moscow StateUniversity of Economics, Statistic and Computer Technologies. Prior to founding Data Frame, Maria spent five years as a Vice President for Business Development working in DataSpace — the leading data center colocation operator where she managed to sign service contracts with number of domestic and international companies, including leading Russian banks and closed the most important and significant deal with Moscow Exchange. From 2004 to 2010, Maria served as Leasing Account Director at Cisco Capital, the leading vendor finance company owned by Cisco Systems, Inc. She was awarded Best Deal Achiever FY’06 and Sales Achiever Award FY ’08.", "why_threefold": "I believe in the ThreeFold Foundation since it provides the innovative solutions to the revolutionary crypto currency technology. It solves challenges of complexity, costs and energy usage.", "function": "Ambassador", "rank": 0, "project_ids": [1], "contribution_ids": [2], "nationality": "Russian"}, {"avatar": "images/marina_achillea_processed.jpg", "full_name": "Marina Achillea", "description": "My name is Marina Achillea and I am a 36 year old fashion designer from Sweden working and living in London with my husband. I am proud to be reperesenting the ThreeFold foundatoin and look forward to exciting and changing times ahead", "why_threefold": "I believe that the internet should be a fundamental right for every person in the world. That belief is shared by the ThreeFold foundation in it’s quest to expand the reach of the web to every corner of the world.", "function": "Ambassador", "rank": 0, "project_ids": [1], "contribution_ids": [2], "nationality": "Swedish"}, {"full_name": "", "description": "", "why_threefold": "", "function": "Ambassador", "rank": 0, "project_ids": [], "contribution_ids": [], "nationality": " "}, {"avatar": "images/maxime_daniel_processed.jpg", "full_name": "Maxime Daniel", "description": "C, python and nodejs developer, Gentoo user, Linux and Music addict", "why_threefold": "", "function": "Engineer", "rank": 0, "project_ids": [1, 2], "contribution_ids": [6, 6], "nationality": "Belgian"}, {"avatar": "images/michael_gaffney_processed.jpg", "full_name": "Michael Gaffney", "description": "Michael is extremely grateful to be serving as a ThreeFold ambassador and fully supports ThreeFold’s mission of a sustainable internet in the hands of the people. Michael believes in humanity’s inherent goodness and its willingness to help and lift others up –ThreeFold holds this view as well and challenges us to believe it can and will be accomplished. Michael is currently an information specialist with an energy policy think tank in Saudi Arabia and in his spare time is a fitness/calisthenics junkie and an avid traveler.", "why_threefold": "What's not to love about a foundation that has the technological skill and know how to build a new Internet and the compassion and heart to give it to the people. I love ThreeFold's vision and mission and I'm thrilled to be able to be a part of it.", "function": "Ambassador", "rank": 0, "project_ids": [1], "contribution_ids": [2], "nationality": "American"}, {"avatar": "images/michael_wellesley_wesley_processed.jpg", "full_name": "Michael Wellesley-Wesley", "description": "Michael is a seasoned veteran with over 30 years of experience working in both the US and UK. He is a former CEO of public and private media and technology companies, most recently of NASDAQ quoted ChyronHego. He is Director and Founder of Inogesis, a London-based accelerator that enables blue-chip organizations to harness the power of disruptive technology. He is a Director of Conduce Technology, an innovative pioneer in the field of data visualisation based in California and also an Advisor and Venture Investor in Alpha Venture Partners, a technology-focused venture capital firm based in New York. Michael has served as Managing Director of Wit Soundview Ventures, COO of Data Broadcasting Corporation and Director of Financial News Network. He founded and served as Director of London-based boutique technology investment bank Stephen Rose and Partners.", "why_threefold": "I fully support and endorse the the ThreeFold Foundation vision of a decentralised, sustainable and greener internet that provides lower cost computational power and connectivity to large groups of people who , until today, have been excluded from the benefits and possibilities inherent in the digital revolution.", "function": "Ambassador", "rank": 0, "project_ids": [1], "contribution_ids": [2], "nationality": "British"}, {"avatar": "images/michel_coucke_processed.jpg", "full_name": "Michel Coucke", "description": "Michel leads the CEO & Board Practice for Lancor, an executive search firm. Prior to founding Lancor, Michel was Co-Managing Partner of the Global Technology & Media Practice at Whitehead Mann, as well as setting up & managing the European Telecommunications & Internet Infrastructure Practice at Heidrick & Struggles, based in London. In his early career, he was Deputy MD of the Benelux countries for AT&T. Michel has a master’s degree in industrial engineering and biochemistry from Institut Meurice Engineering School Brussels and an executive master’s degree in management from Universite Libre de Bruxelles. He is also an AMP graduate from the IMD, Lausanne.", "why_threefold": "ThreeFold is opening a new chapter. With the ThreeFold project we are contributing to the construction of a better world not just financially but globally. It is not just about another 'coin', it is a real revolution.", "function": "Ambassador", "rank": 0, "project_ids": [1], "contribution_ids": [2], "nationality": "Belgian"}, {"avatar": "images/mihos_vasilopoulos_processed.jpg", "full_name": "Mihos Vasilopoulos", "description": "A serial entrepreuner: Co-Founder and until recently Executive Vice President of NEWAGE ENERGY, presently UK's largest private oil and gas company. Also co-Founder of Global Process Systems the leading Middle East fabricator of process modules, as well as co-Founder of HYDROCYCLONICS, a US based company developing water treatment systems. Previously held numerous Senior positions with KVAERNER (Head of Energy Asia), Executive Vice President of PETROPLUS, Advisor to the President of HYUNDAI HEAVY INDUSTRIES, Advisor to the Chairman of TRANSCANADA, and Senior Consultant with MARATHON OIL.", "why_threefold": "The world is fast adopting e-currencies (against artificial FIAT); Backed by Capacity and supported by unique disruptive green technology, the TFT Token is a unique IT monetary instrument, that unlike other cryptocurrencies, has real value. In fact, ThreeFold Token is the pre-cursor of an exciting IT-created utility.", "function": "Ambassador", "rank": 0, "project_ids": [1], "contribution_ids": [2], "nationality": "Greek"}, {"avatar": "images/mikhail_erenburg_processed.jpg", "full_name": "Mikhail Erenburg", "description": "Mikhail Erenburg, 38, is the former Senior Vice President at Sberbank, Eastern Europe's largest bank. Prior to this he was Chief Executive Officer of Asteros, one of top 3 IT system integrators in Russia; COO of Rusal, the worlds largest Aluminum company. Mikhail holds Phd degree from Moscow Aviation Institute and graduated executive programs from Columbia business school and Massachusetts Institute of technology.", "why_threefold": "There is no doubt anymore, that the world wants digital currency. At the same time, existing solutions, although highly popular already, lack critical attributes to become truly sustainable long term. I know Kristof good enough to be sure that ThreeFold token can become the next Big Thing.", "function": "Ambassador", "rank": 0, "project_ids": [1], "contribution_ids": [2], "nationality": "Russian"}, {"avatar": "images/milind_sathe_processed.jpg", "full_name": "Milind Sathe", "description": "Extensive international experience in senior management positions with The Coca-Cola Company in managing operations in diverse emerging markets across continents. Proven track record in building organizational culture, multi-national leadership teams, coaching, mentoring and change management. Passionate about traveling, making friends, experiencing new cultures and cuisines.", "why_threefold": "I believe ThreeFold Foundation’s idea holds great promise to empower local communities, develop much needed skills to face the challenges of the impending fourth industrial revolution and make businesses more competitive by making available low cost affordable digital resources.", "function": "Ambassador", "rank": 0, "project_ids": [1], "contribution_ids": [2], "nationality": "Indian"}, {"avatar": "images/muhamad_azmy_processed.jpg", "full_name": "Muhamad Azmy", "description": "A highly driven IT professional, and a perfection seeker.", "why_threefold": "", "function": "", "rank": 0, "project_ids": [1, 8], "contribution_ids": [6, 6], "nationality": "Egyptian"}, {"avatar": "images/nayer_sobhy_processed.jpg", "full_name": "Nayer Sobhy", "description": "Nayer is a passionate about people’s development, and that we can be the change we want to see. After his B.Sc. in Business Management from Cairo University in Egypt, he got a postgraduate degree in Human resources management from The American University in Cairo, Egypt. Currently he is part of Threefold's family, managing cairo's office since June 2014", "why_threefold": "", "function": "Co-Founder", "rank": 21, "project_ids": [1, 8], "contribution_ids": [1, 1], "nationality": "Egyptian"}, {"avatar": "images/nickolay_babenko_processed.jpg", "full_name": "Nickolay Babenko", "description": "Nickolay is an engineer, crypto-entrepreneur and investor and bhakti-yogi. The combination of a technical mindset and deep understanding of the psychology of relationships helps him to to achieve ambitious and practical goals and secure long-standing relationships. Having 11 years of experience in the IT industry and 4 years specifically in blockchain industry, Nickolay is eager for new opportunities to make people happier in general and with the help of technology in particular. Previously to joining GIG Technology he co-founded one of the first bitcoin payment processors and multicurrency wallets.", "why_threefold": "", "function": "Co-Founder", "rank": 8, "project_ids": [1, 5], "contribution_ids": [1, 3], "nationality": "Ukranian"}, {"avatar": "images/nicola_moresi_processed.jpg", "full_name": "Nicola Moresi", "description": "Nicola is a non-stop entrepreneur and connects technology concepts with business opportunities and growth capital. He builds business around technology. Data Center owner, Working on Cloud technologies since 2011, he master consulting and integration on the whole IT Scene.", "why_threefold": "Finally with ThreeFold Foundation the positive impact that technology has on our life, can be brought in a neutral and secure way to all people around the world. Living in a Digital world where our life, our memories, our history is digital, the help of a secure and neutral Internet is the basis for building up our new distributed life.", "function": "Ambassador", "rank": 0, "project_ids": [1], "contribution_ids": [2], "nationality": "Swiss"}, {"avatar": "images/nino_d_auria_processed.jpg", "full_name": "Nino D'Auria", "description": "Nino has 25+ years of experience in the ICT market, building and leading winning teams and partnerships. Always in Sales and Marketing roles, he has an international career's path and a proven ability to create world-class organizations, nurture enduring client and partners relationships and win new business. He held senior/executive roles at firms like Digital Equipment, Compaq, EMC, Riverbed and Ericsson, he was the CEO of an Italian System Integrator and he is an expert in new business development, merge and acquisition, partnerships and complex opportunities management. He has been one of the pioneers of the Cloud wave, working on big Cloud transformation projects together with Service Providers and consulting firms. He has a degree in Business Economics from the University of Pavia, Italy. He is a relentless supporter of Inter Football Club.", "why_threefold": "Internet capacity is the fastest growing commodity in the world and the creation of an exclusive currency for buying and selling it is ingenious. Based on the stability, neutrality and transparency principles I do believe the TF Token can be recognized as 'The currency' in the IT capacity exchange.", "function": "Ambassador", "rank": 0, "project_ids": [1], "contribution_ids": [2], "nationality": "Italian"}, {"avatar": "images/nisha_grimes_processed.jpg", "full_name": "Nisha Grimes", "description": "Nisha Grimes is an explorer, creator and a capacity development professional. She is passionate about building a just and sustainable world where all people have equal access to knowledge and opportunities. She has traveled to almost 50 countries and has designed and facilitated development projects on 5 continents ranging from social business initiatives in Africa, service learning projects in the Middle East and organic farmers markets in rural Latin America. Nisha was a Peace Corps Coverdell Fellow and is an avid volunteer, traveler and outdoor enthusiast. Some of her adventures include trekking across Spain, visiting ancient ruins in Ethiopia and bungee jumping off bridges in Costa Rica.", "why_threefold": "Nisha is honored to serve as an Ambassador for the ThreeFold Foundation because of its empowering mission and transparant nature. She believes this technology will revolutionize the way the world utilizes capital, does business and unlocks personal and entrepreneurial potential.", "function": "Ambassador", "rank": 0, "project_ids": [1], "contribution_ids": [2], "nationality": "American"}, {"avatar": "images/olivia_jurado_processed.jpg", "full_name": "Olivia Jurado", "description": "Olivia is passionate about getting back to a manner of living that is more harmonious with nature by embracing the principles of a regenerative and slow lifestyle. It is vitally important that we make conscious decisions in our everyday life - all of our actions and choices impact the environment and fellow earthlings. We are part of nature and that is why it is our duty now to stop harming ourselves and help our planet Earth heal.", "why_threefold": "", "function": "Co-Founder", "rank": 15, "project_ids": [1, 5, 7], "contribution_ids": [1, 3, 1], "nationality": ""}, {"avatar": "images/olivia_kemp_processed.png", "full_name": "Olivia Kemp", "description": "After completing school and sports education (focus on skiing, swimming, volleyball) I had various international assignments and education (Stanford, South Africa) and am now completing my master studies in economics and law. In addition I work at a law firm in Vienna and have occasional hosting assignments at Red Bull Racing.", "why_threefold": "I believe in the ThreeFold Token Foundation because I am one of the first generations growing up with the internet. However, current developments show, companies are making internet users very dependent on all their technologies. So as I see it, an opportunity to have alternative ways of providing cyber space without contributing to the „vitreous human“, will be a major stepping stone.", "function": "Ambassador", "rank": 0, "project_ids": [1], "contribution_ids": [2], "nationality": "Austrian, British"}, {"avatar": "images/osama_shihab_firtoria_processed.jpg", "full_name": "Osama Shihab Fitoria", "description": "Osama is a cryptoeconomy investor and entrepreneur. He has been based in the Middle East for 3 decades during which he led business expansion roles for global tech firms and founded e-commerce startups.", "why_threefold": "ThreeFold's vision is an ambitious one: to create a neutral, efficient and affordable net. ThreeFold's team has already developed breakthrough technology which can and will enable this", "function": "Ambassador", "rank": 0, "project_ids": [1], "contribution_ids": [2], "nationality": "Nicaraguan/Jordanian"}, {"avatar": "images/oscar_landman_processed.jpg", "full_name": "Oscar Landman", "description": "Oscar is working in IT for 30 years, being active international for almost half the time. He has a Master in IT and professionally certified in several IT architecture directions, together with his sales experience, he combined a couple of interesting skills to add value. He worked for corporates for 10 years after which he started his own company, driving his own beliefs.", "why_threefold": "ThreeFold to me, is a new-age organization (driven from love and believe instead of ego), combining a couple of true new technologies. With this global movement, it is time to start a new economy. An economy based on other values, where responsibility and going Green are key words.", "function": "Ambassador", "rank": 0, "project_ids": [1], "contribution_ids": [2], "nationality": "Dutch"}, {"avatar": "images/osman_khan_processed.jpg", "full_name": "Osman Khan", "description": "Osman is a Chartered Accountant (Ontario, Canada & Pakistan) and CPA (Massachusetts). His High School education was in Pakistan and England respectively. Osman graduated in 1993 from Brown University (Providence, RI) with a bachelor in Economics and IR, and did his Master in Business Administration (Accounting) from Boston University (Boston, MA) in 1994. Osman worked for Ernst & Young & Feeley & Driscoll LLP and in 1996 joined Data General which was subsequently acquired by EMC. He also served in a number of different roles within EMC with his last two roles being CFO for Northern Europe and Country Manager for Pakistan and Afghanistan (opened and developed the subsidiary into a $15-20M operation). Recently, Osman served as the head of SAP in Pakistan. He is also the Honorary Consul for Ireland in Pakistan and on the board of a number of public and private companies.", "why_threefold": "Virtual currencies are the future and the foundation is enabling a new mechanism for IT currency payments that can / will be the defect standard and a means of utilising capacity from day 1. They are educating and developing the market at the same time.", "function": "Ambassador", "rank": 12, "project_ids": [1], "contribution_ids": [1], "nationality": "Pakistani/UK"}, {"avatar": "images/owen_kemp_processed.jpg", "full_name": "Owen Kemp", "description": "In all walks of life, Owen looks for an equitable exchange of value and believes in doing everything in a socially responsible way. He loves working with diverse teams as they best represent our amazing planet. Emerging markets have been his passion and his profession. he has travelled to almost 150 countries helping local teams to flourish. Once described as an optimist and anarchist. he has humour and enjoys doing things in an unconventional way.", "why_threefold": "", "function": "Co-Founder", "rank": 3, "project_ids": [1], "contribution_ids": [1], "nationality": " "}, {"avatar": "images/paolo_piccardo_processed.jpg", "full_name": "Paolo Piccardo", "description": "Moved by the passion for the knowledge and for our role in this time, Paolo has constantly been forming and training himself in both natural and human sciences. The professorships gives him the responsibility to talk to the next active generation and to transfer the desire to learn and to make the best use out of what we have. Culture in all forms is for Paolo, actually working in materials for clean energy, a renewable and precious source of power. His main aim is to contribute to reunify art, science, and relationships, because these define our 'being human in a natural world'. Gathering people in special events to communicate and inspire has been something Paolo learned in numerous past experiences.", "why_threefold": "To change is possible, it is always a possible way in front of us, but to change is an opportunity to wisely use. When a change is felt positive, it is because of a new balance between us and the place and time in which we live has increased and this change can be called improvement. Transforming the economy seems impossible, but we made it the way it is today and we are the only element in the universe able to improve it by making it more natural. The ThreeFold Token project is for me a clear step forward in this direction heading to a more balanced future to be profited by all of us.", "function": "Ambassador", "rank": 0, "project_ids": [1], "contribution_ids": [2], "nationality": "italian"}, {"avatar": "images/peter_nashaat_processed.jpg", "full_name": "Peter Nashaat", "description": "Passionate DevOps Engineer", "why_threefold": "", "function": "Engineer", "rank": 0, "project_ids": [1, 8], "contribution_ids": [6, 6], "nationality": "Egyptian"}, {"avatar": "images/peter_vanderhenst_processed.jpg", "full_name": "Peter van der Henst", "description": "Peter is HR-manager and Financial Advisor For TF Tech. Besides that Peter is an entrepreneur active in the world of start-ups and scale-ups for about 8 years now. Next to running the best business center in Belgium, where he lets companies grow and develop themselves, he is Kristof’s financial guy for several interesting projects in Belgium, Spain & Egypt.", "why_threefold": "", "function": "Co-Founder", "rank": 19, "project_ids": [1, 2, 5], "contribution_ids": [1, 1, 1], "nationality": "Belgian"}, {"avatar": "images/phil_horn_processed.jpg", "full_name": "Phil Horn", "description": "Philip is based in Munich Germany, 48 (in 2018). Studied chemistry and computer science, deeply involved in core Internet and IT technologies since 1990. As scientist at heart I’m always curious and try to be open minded. Founder of a handful of companies and passionately mentoring startups to create successful strategies and prepare them for funding and market entrance. Currently head of digitalization and innovation in EMEA for a large service provider. Solid background in all aspects of IT infrastructure but even more so in how to utilize it to achieve desired business outcomes, support strategic development and create sustainable ecosystems.", "why_threefold": "I love ThreeFold because of its disruptive technology with groundbreaking design integrated into a great philosophy to democratize the Internet. It makes clever use of blockchain to back transactions and has security and data privacy deeply embedded and thus has more than just the potential to make the world a better place", "function": "Ambassador", "rank": 0, "project_ids": [1], "contribution_ids": [2], "nationality": "German"}, {"avatar": "images/phillippe_guillemot_processed.jpg", "full_name": "Phillippe Guillemot", "description": "Philippe Guillemot, 58, is the former Chief Operating Officer at Alcatel-Lucent SA, Boulogne-Billancourt, France, prior to its acquisition by Nokia Oyj at the beginning of 2016. Prior to this tenure with Alcatel-Lucent, Guillemot was Chief Executive Officer and Board Director of Europcar Group from 2010 to 2012, Guyancourt, France; Chairman and CEO of Areva T&D, Paris, from 2004 to 2010; Group Executive Vice President, Faurecia SA, Paris, from 2001 to 2003; Group Vice President, Valeo, Paris, from 1998 to 2000; and he held several global executive positions with Michelin from 1983 to 1998. Guillemot is graduated from Ecole Nationale Supérieure des Mines de Nancy, France; and received an MBA from Harvard Business School. He serves on the board of directors of Constellium a global aluminium products manufacturer, Amsterdam, The Netherlands; Sonoca a global provider of a variety of consumer packaging, Hartsville, S.C. USA and previously served on the Board of Visteon Corporation, an auto parts manufacturer, Detroit, MI USA.", "why_threefold": "Access to the digital world has become as essential as access to water and electricity. Internet and cloud, even though a utility, is today dominated by a few large multinational companies. ThreeFold Foundation ambition is to build an internet and cloud that is close and belong to its users.", "function": "Ambassador", "rank": 0, "project_ids": [1], "contribution_ids": [2], "nationality": "French"}, {"avatar": "images/pierre_van_hoorebeke_processed.jpg", "full_name": "Pierre van Hoorebeke", "description": "Experienced business lawyer, assisting founders, investors and private companies on corporate, commercial and IP matters. Advising on venture capital and private equity transactions, capital restructurings, contribution and shareholders’ agreements, issuance of stock options, warrants, etc. Counselling in M&A and corporate transactions (including corporate restructuring, due diligence, share and asset deals, national and cross-border mergers, etc.); Drafting and negotiating complex commercial transactions (including NDA’s, distributor and reseller agreements, sale and lease agreements, license agreements, OEM agreements, etc.); Trusted corporate advisor (incorporation, director’s liability, corporate housekeeping, insolvency proceedings, liquidations, etc.).", "why_threefold": "", "function": "Legal Advisor", "rank": 4, "project_ids": [1, 2], "contribution_ids": [1, 4], "nationality": "Belgian"}, {"full_name": "Ragheb Abushahba", "description": "Ragheb Abushahba, Independent Egyptologist, intuitive life coach, Siddha Yogi, affectionately known as RA the Coach.  RA will connect you with the wisdom of Ancient Egypt, Cosmology, advanced emotional healing and Self-Knowledge. A 20 year career in engineering and business consulting, RA has a solid grounding in science and technology.  He continues to apply his scientific and business knowledge in support of sustainable projects to support conscious living. Since 2004 RA has been leading groups on adventurous journeys.  He leads an internal journey of self-realization, during an external journey around the globe.", "why_threefold": "", "function": "Ambassador", "rank": 0, "project_ids": [1], "contribution_ids": [2], "nationality": "Egyptian", "avatar": "images/ragheb_abushahba_processed.jpg"}, {"full_name": "Ramez Saeed", "description": "Ramez has about 10 years of experience in CloudComputing software. He joined Kristof and his team on 2008, Started in Q-layer, Amplidata, GiG and currently TFtech. Currently Ramez is working as a quality control and operations teamleader.", "why_threefold": "", "function": "Engineer", "rank": 0, "project_ids": [1, 8], "contribution_ids": [6, 6], "nationality": "Egyptian", "avatar": "images/ramez_saeed_processed.jpg"}, {"full_name": "Rana Hassan", "description": "Rana is an enthusiastic Computer Engineer with a passion in learning and development. She enjoys a good cup of coffee and exploring new technologies.", "why_threefold": "", "function": "Engineer", "rank": 0, "project_ids": [1, 8], "contribution_ids": [6, 6], "nationality": "Egyptian", "avatar": "images/rana_tarek_processed.jpg"}, {"full_name": "Reem Khamis", "description": "Reem believes in books, and that technology is the key to making the world a little bit better. She loved studying Digital Media Engineering Technology and Computer Science in university and hasn't looked back since. She's currently a development coordinator, product owner and senior developer at CodeScalers. Reem is a big fan of chocolate. Please don't contact her after working hours unless you are offering chocolate.", "why_threefold": "", "function": "Tech Lead", "rank": 0, "project_ids": [1, 8], "contribution_ids": [6, 6], "nationality": "Egyptian", "avatar": "images/reem_khamis_processed.jpg"}, {"full_name": "Richard Sutton", "description": "Richard is a business-builder, creative and an esoteric cosmologist. He has a 30-year career founded in the automobile business, first as writer and publisher, then as electronic media entrepreneur, and moreover as an international event promoter, showman and brand-builder. He has worked with a wide variety of heritage brands, mostly in the high-end and auto sectors, but does so as an ardent protector of our environment and nurturer of right-action.", "why_threefold": "I am thrilled by everything ThreeFold Foundation stands for and promises to be. The bright-eyed skills and gravitas of its creators and executors; the neatness and purity of its vision and form; its sustainability and neutrality; and its foundational mission to contribute. ThreeFold Foundation is a trail-blazing example of a higher state of consciousness in business. It’s a shaft of light in a tortured, still descending world and a manifestation of something genius.", "function": "Ambassador", "rank": 0, "project_ids": [1], "contribution_ids": [2], "nationality": "British", "avatar": "images/richard_sutton_processed.jpeg"}, {"full_name": "Richard Walker", "description": "Richard is an experienced senior leader offering a global perspective, having lived and worked in Europe, North America and Asia. A passionate, collaborative and decisive leader, he’s demonstrated the ability to drive change and build, motivate and lead teams to achieve outstanding business results in both developed and high growth emerging markets. He was most recently CEO of electric motorcycle start-up, Zero Motorcycles in California and had an extensive career at Hewlett Packard including running the consumer desktop PC business, a $6B piece of the overall PC business. He currently lives and works in Silicon Valley where he provides executive advisory services to a number of start-up companies. He is also a guest lecturer at the Leavey School of Business at Santa Clara University and for the MBA program at USF in San Francisco, focusing his work on international marketing and the humanity of business.", "why_threefold": "ThreeFold is setting out to transform computing as we know it today, in the most economic, socially positive and sustainable manner. Their innovative use of blockchain technology combined with an asset back token will ensure that a neutral, secure internet is available to all. I’m impressed with their mission/vision and I’m delighted to be a ThreeFold Ambassador.", "function": "Ambassador", "rank": 0, "project_ids": [1], "contribution_ids": [2], "nationality": "British/American", "avatar": "images/richard_walker_processed.jpg"}, {"full_name": "Rob Tol", "description": "Rob is a passionate coach, qigong teacher and former tour professional golfer. He combines several disciplines and different fields of science in his coaching work. People are often touched by his stillness and inner peace or triggered by his sharp observations and straightforward messages that effortlessly uncover the essence of your being. In whatever way you come into contact with Rob, one thing is for sure: it will change your life.", "why_threefold": "ThreeFold's intention of creating a self-healing, small-scaled but world wide Internet seamlessly fits my idea of 'One world, One mind'. As humans, we are already connected at a deep level. A level before ideas of separation and perceived differences. I see ThreeFold as a physical, real world reflection of this connectedness. A move towards unity and equality.", "function": "Ambassador", "rank": 0, "project_ids": [1], "contribution_ids": [2], "nationality": "Dutch", "avatar": "images/rob_tol_processed.jpg"}, {"full_name": "Rob van Mieghem", "description": "Rob is passionate about software and technology and how it can help to make the world a better place. He started his career in technology startups and later became a technology consultant where amongst other assignments also worked at a competence center of an international bank for a couple of years. After some years in a pure management position, he returned back to his passion, creating technology. Rob joined Incubaid early 2012, initially as VP R&d at Awingu, later at Mothership 1 and then as VP R&D at Green It Globe when it was founded. The focus shifted completely to Research at Green IT Globe later. Rob has been involved in several Blockchain projects and used to write GPU miners as a hobby.", "why_threefold": "", "function": "Blockchain Tech Team Lead", "rank": 0, "project_ids": [1, 2], "contribution_ids": [6, 6], "nationality": "Belgian", "avatar": "images/rob_van_mieghem_processed.jpg"}, {"full_name": "Roel P. Castelein", "description": "Roel is experienced in designing and executing global strategies at Microsoft, Autodesk and Dell EMC. Making organizations smarter, better adapted and more sustainable is what he loves doing. Roel is comfortable at cross roads between business and IT, using the latter to transform the first. He delivered quantifiable results in multinational environments, and ensured they were repeatable. Presently Roel is active at retailer Colruyt Group supporting them in their data-driven approach to grow both financially and sustainably. In addition Roel kindles his passion for sustainability as EMEA Marketing Chair for The Green Grid (the Greenpeace of the ICT industry).", "why_threefold": "The combination of 'resource efficient ICT' with a 'new global currency' address two of humanity's biggest challenges. How to grow sustainably both 'economically' and 'data-wise' within the limits of Earth's resources? Nobody knows. TF ambassadors attempt to tackle these challenges and spread the news.", "function": "Ambassador", "rank": 0, "project_ids": [1], "contribution_ids": [2], "nationality": "Belgian", "avatar": "images/roel_p_castelein_processed.jpg"}, {"full_name": "Roel van Sabben", "description": " An advertising art director that always had a passion for data and measuring the effects of advertising campaigns. Now Digital Marketeer at BetterToken & Threefold Foundation.Besides work you can find me out with my family or on the mats being a teacher and forever a student of the beautiful martial art Brazilian Jiu Jitsu.", "why_threefold": "", "function": "Digital Marketeer", "rank": 11, "project_ids": [1, 2, 4], "contribution_ids": [1, 1, 1], "nationality": "Dutch", "avatar": "images/roel_van_sabben_processed.jpg"}, {"full_name": "Sabrina Sadika", "description": "Sabrina is a jack of all trades when it comes to ThreeFold. She is the owner of the app, handles most of the customer communication, is in charge of the logistic aspects and helps out whevever needed. She's known internally as the Token Fairy. Sabrina is an outgoing person who loves to laugh and be with friends and family, but she's secretly also a bit of a nerd who loves the calmth of being alone and reading a book while her daughter is asleep. Her hobbies include reading, watching Netflix and GoT, and being a kick-ass mom.", "why_threefold": "", "function": "Co-Founder", "rank": 10, "project_ids": [1, 2], "contribution_ids": [1, 1], "nationality": "Belgian", "avatar": "images/sabrina_sadik_processed.jpg"}, {"full_name": "Sam Taggart", "description": "I am currently supporting brand-building and awareness efforts for threefold. Previously was the first hire and spent eight years at social & digital-turned-full service agency VaynerMedia, co-founded by Gary & AJ Vaynerchuk. Left to pursue the unknown. Travelled southeast asia for sixteen months. Background in creative strategy, social/digital platform strategy, emerging technologies, partnerships, account management, client relations, & company culture.", "why_threefold": "I believe in following momentum, & momentum led me to threefold. The threefold movement represents a new frontier, a new mindset, and a better, more fair & honest way forward. I believe through this movement we have the opportunity & ability to have great, positive, and widespread impact on the world. And I don't want to sit on the sidelines. I want to help to bring the movement to, and connect, like-minded individuals all around the globe.", "function": "Marketing & Storytelling", "rank": 0, "project_ids": [1, 12], "contribution_ids": [1, 3], "nationality": "United States", "avatar": "images/sam_taggart_processed.jpg"}, {"full_name": "Samar Adel", "description": "Samar has over 3 years of practical experience in designing, implementing software, including web and mobile UI development, API design and she is passionate about everything Javascript, Designing pages as well. she loves exploring new libraries.", "why_threefold": "", "function": "UI Developer", "rank": 0, "project_ids": [1, 8], "contribution_ids": [6, 6], "nationality": "Egyptian", "avatar": "images/samar_adel_processed.jpg"}, {"full_name": "Samir Hosny", "description": "Samir is a person who has a passion for learning new technologies all the time , I got my Bachelor degree in Computer Science and then started working in the field of cloud computing since 5 years", "why_threefold": "", "function": "Engineer", "rank": 0, "project_ids": [1, 8], "contribution_ids": [6, 6], "nationality": "Egyptian", "avatar": "images/samir_hosny_processed.jpg"}, {"full_name": "Sarah Boctor", "description": "Sarah graduated 7 years ago from the German University in Cairo and is currently working as a software engineer on Zero-OS [https://github.com/zero-os/home].", "why_threefold": "", "function": "Engineer", "rank": 0, "project_ids": [1, 8], "contribution_ids": [6, 6], "nationality": "Egyptian", "avatar": "images/sarah_boctor_processed.jpg"}, {"full_name": "Simin Gerards", "description": "Simin’s career spans over 23 years in the in the finance sector, working closely with institutional investors in Turkey and globally, specializing on the capital markets business, trading and exchanges. She has taken place in several primary and secondary offerings and placements, organized roadshows and investor conferences and events, and have built, led and supervised sales and research teams at executive positions during her career. Most recently, she has been the CEO of Erste Securities in İstanbul. She is inspired by form and harmony, and finds great outlet in sculpting and designing metal artifacts.", "why_threefold": "", "function": "Co-Founder", "rank": 22, "project_ids": [1, 2], "contribution_ids": [1, 1], "nationality": "Turkish", "avatar": "images/simin_gerards_processed.jpg"}, {"full_name": "Sophie De Maesschalck", "description": "Sophie has over 10 years of experience in technology incubation, international financing and mergers and acquisitions. She is currently the CFO of ThreeFold Foundation, GIG Technology and GIG Holding. Besides ThreeFold Foundation, she is a partner and group CFO at Incubaid, one of the most disruptive incubators in the tech scene that has supported a portfolio of over 15 start-ups and successfully exited 6 companies to large, international corporations as Western Digital and Oracle. Sophie holds an MSc and PhD in Electrotechnical engineering from Ghent University (Belgium) and an MBA from Vlerick Business School (Belgium). Prior to working at ThreeFold, she held positions at Bain & Company, the management consultancy and Proximus, the leading Belgian mobile operator.", "why_threefold": "", "function": "", "rank": 0, "project_ids": [], "contribution_ids": [], "nationality": "Belgian", "avatar": "images/sophie_de_maesschalck_processed.jpg"}, {"full_name": "Stela Suils Cuesta", "description": "Stela is a firm believer that it’s possible to do business from the heart. She is a passionate team builder and thrives in challenging situations. Stela is a very active member of the community and organises TEDx events as well as Lean In Circles and mentorships programs. Stela is passionate about Positive Psychology, D&I, Women Empowerment and Social Entrepreneurship, specially in Blockchain and Crypto.", "why_threefold": "", "function": "Co-Founder", "rank": 12, "project_ids": [1, 2], "contribution_ids": [1, 1], "nationality": "Spanish", "avatar": "images/stela_suils_cuesta_processed.jpg"}, {"full_name": "Tony Henderson", "description": "Tony has an extensive commercial background in Telecoms, TV & Entertainment technology and is currently Head of Europe, Media Products & Services for Intertrust Technologies Corporation, the inventor of in Digital Rights Management technology. He has also been a strategic adviser to a number of ventures including web video platforms, a shared payment platform, telecoms service providers and blockchain ventures. Previously Tony held a number of business management roles at Microsoft’s entertainment business helping operators and broadcasters to deliver Pay TV and Over The Top entertainment services. Prior to Microsoft Tony ran a leadership network for CEOs and also held senior technology and business roles with the BBC and the music industry. In 2012 Tony published his first book “The Leopard In A Pinstripe Suit” which is a fun perspective on today’s business world; he continues to write on various topics. In his spare time Tony also runs ultra-marathons, recently completing an 83 mile run along the length of Hadrian’s wall. Tony is a graduate of Edinburgh University.", "why_threefold": "I believe in the ThreeFold Foundation because it will drive open and widescale investment into cloud infrastructure and empower those at the edge of the network to build new localised and global services and be rewarded for their innovation. In short, it is a gamechanger.", "function": "Ambassador", "rank": 0, "project_ids": [1], "macontribution_ids": [2], "nationality": "British", "avatar": "images/tony_henderson_processed.jpg"}, {"full_name": "Virgil Ilian", "description": "Virgil is a researcher and innovator who is always looking to improve the world around him both on a macro and micro scale. For the past 11 years he has been working with new technologies, helping organizations integrate them into their existing services and create their new products. He holds a PhD in autonomous robotics, artificial intelligence and reliability. Virgil also lectures at a technical university and an academy.", "why_threefold": "", "function": "Co-Founder", "rank": 9, "project_ids": [1], "contribution_ids": [1], "nationality": "Romanian", "avatar": "images/virgil_ilian_processed.jpg"}, {"full_name": "Weynand Kuijpers", "description": "A Master degree in space technology Weynand experienced that fundamental research and advances in space technology were not quick enough, therefore, he shifted to slingshotting internet technologies in customer centric orbits. He was involved in the early 90's in the first large scale data centers that were being built in Europe to deliver Managed Services over the Internet. Since then he worked in executive roles in large American and Japanese telecom operators. As VP of Operations and later VP Marketing and Sales Strategy sold and delivered one of the largest sport ePortals in the world, uefa.com. Worked as a consultant for uefa to restructure their IT department and helped them to deliver a safe and successfull EURO tournament in Ukraine and Poland in 2012. As a person he is a social thinker that inspires people and organizations to do things different, aspire to their full potential, develop unique strengths, grow personal influence, liberate collective intelligence and achieve personal and business goals. The only constant is change.", "why_threefold": "", "function": "co-founder", "rank": 5, "project_ids": [1], "contribution_ids": [1], "nationality": " ", "avatar": "images/weynand_kuijpers_processed.jpg"}, {"full_name": "Wieger Atsma", "description": "Wieger have been working for several companies in the field of communications and advertising for over 20 years. It taught him to look at details, while keeping an eye on the big picture. His aim is to never fully grow up, and to never stop wondering. By connecting people, humor, ideas and an open mind, he believes anything is possible.", "why_threefold": "The ThreeFold Foundation combines several core values that I hold dear, connecting people in a meaningful way by means of state-of-the-art blockchain technology. I believe internet access should be available for all, without straining the planet’s resources. Sustainable internet for all just makes sense to me.", "function": "Ambassador", "rank": 0, "project_ids": [1], "contribution_ids": [2], "nationality": "Dutch", "avatar": "images/wieger_atsma_processed.jpg"}, {"full_name": "Wolfgang Wittmer", "description": "Wolfgang is an IT Sales and Service veteran with 38 years at Hewlett Packard, Compaq and Digital Equipment, with global VP sales experience in Europe, Asia and the emerging markets. He has a strong track record of making things happen through execution and has completed some of the largest Merger and Spin-of projects in the IT sector.", "why_threefold": "I believe in the ThreeFold Foundation, because I have experienced in my former business life the huge complexity of datacenters, cloud infrastructure and services around the globe. This amazing TFF project is addressing today’s challenges of complexity, costs and energy usage.TFF will be at the heart of empowering the internet, generating new mind blowing efficiency and economy.", "function": "Ambassador", "rank": 0, "project_ids": [1, 2], "contribution_ids": [2, 2], "nationality": "Austrian", "avatar": "images/wolfgang_wittmer_processed.jpg"}, {"full_name": "Xander van der Heijden", "description": "Xander is a serial entrepreneur and venture mentor. He started his first software development / Internet company – Beeyond, back in 1995, where he created and patented InterLingua™ - a pioneering cloud technology in the areas of electronic data communications, database organized, flexible format electronic data message management, client-server and distributed software applications. Currently, Xander is founder and CEO of 2SQRS – a research, development and investment company that grows human-tech concepts to global ventures. He is also a co-founder of Web3 Ventures – an incubator for decentralized autonomous services that enables entrepreneurs and developers in bringing infrastructural innovation to the growing blockchain community.", "why_threefold": "I strongly believe in decentralized infrastructure as the foundation for creating the real Web 3.0 Internet. Empowering us to handle the increasing amounts of data traffic and to respond to the growing need for internet capacity, Blockchain and edge computing are providing the tools and ThreeFold is how we get to the Web 3.0 world! Contributing to a better place for everybody.", "function": "Ambassador", "rank": 0, "project_ids": [1], "contribution_ids": [2], "nationality": "Dutch", "avatar": "images/xander_van_der_heijden_processed.jpg"}, {"full_name": "Yves Kerwyn", "description": "Chief Evangelist", "why_threefold": "", "function": "Ambassador", "rank": 0, "project_ids": [1], "contribution_ids": [2], "nationality": "Belgian", "avatar": "images/yves_kerwyn_processed.jpg"}];

    const partners = [{ "name": "Test1", "description": "description", "stars": 4, "logo": "logo.png" }, { "name": "Test2", "description": "description", "stars": 5, "logo": "logo.png" }];

    axios$1.defaults.headers.post['Content-Type'] = 'application/json';

    // class API {
    //     getMembers() {
    //         return axios.post("/actors/team/list_members")
    //     }

    //     getPartners() {
    //         return axios.post("/actors/community/list_partners")

    //     }

    // }
    class API {
        getMembers() {
            return new Promise(function (resolve, reject) {
                resolve(members);
            });
        }

        getPartners() {
            return new Promise(function (resolve, reject) {
                resolve(partners);
            });
        }

    }
    let api = new API();

    /* src/components/Team.svelte generated by Svelte v3.12.0 */

    const file$1 = "src/components/Team.svelte";

    function create_fragment$4(ctx) {
    	var div;

    	const block = {
    		c: function create() {
    			div = element("div");
    			div.textContent = "TEAM page";
    			add_location(div, file$1, 12, 0, 244);
    		},

    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},

    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    		},

    		p: noop,
    		i: noop,
    		o: noop,

    		d: function destroy(detaching) {
    			if (detaching) {
    				detach_dev(div);
    			}
    		}
    	};
    	dispatch_dev("SvelteRegisterBlock", { block, id: create_fragment$4.name, type: "component", source: "", ctx });
    	return block;
    }

    function instance$1($$self) {
    	
      let posts = [];
      onMount(() => {
        console.log("onmount team");
        api.getMembers().then(data => {
          console.log("data..", data);
        });
      });

    	$$self.$capture_state = () => {
    		return {};
    	};

    	$$self.$inject_state = $$props => {
    		if ('posts' in $$props) posts = $$props.posts;
    	};

    	return {};
    }

    class Team extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$1, create_fragment$4, safe_not_equal, []);
    		dispatch_dev("SvelteRegisterComponent", { component: this, tagName: "Team", options, id: create_fragment$4.name });
    	}
    }

    /* src/components/Star.svelte generated by Svelte v3.12.0 */

    const file$2 = "src/components/Star.svelte";

    function create_fragment$5(ctx) {
    	var span, i;

    	const block = {
    		c: function create() {
    			span = element("span");
    			i = element("i");
    			attr_dev(i, "class", "text-warning fa fa-star");
    			add_location(i, file$2, 1, 2, 41);
    			attr_dev(span, "class", "float-right single-star");
    			add_location(span, file$2, 0, 0, 0);
    		},

    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},

    		m: function mount(target, anchor) {
    			insert_dev(target, span, anchor);
    			append_dev(span, i);
    		},

    		p: noop,
    		i: noop,
    		o: noop,

    		d: function destroy(detaching) {
    			if (detaching) {
    				detach_dev(span);
    			}
    		}
    	};
    	dispatch_dev("SvelteRegisterBlock", { block, id: create_fragment$5.name, type: "component", source: "", ctx });
    	return block;
    }

    class Star extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, null, create_fragment$5, safe_not_equal, []);
    		dispatch_dev("SvelteRegisterComponent", { component: this, tagName: "Star", options, id: create_fragment$5.name });
    	}
    }

    /* src/components/Stars.svelte generated by Svelte v3.12.0 */

    const file$3 = "src/components/Stars.svelte";

    function get_each_context(ctx, list, i) {
    	const child_ctx = Object.create(ctx);
    	child_ctx.item = list[i];
    	return child_ctx;
    }

    // (8:0) {#if count > 0}
    function create_if_block(ctx) {
    	var div, current;

    	let each_value = ctx.starsArr;

    	let each_blocks = [];

    	for (let i = 0; i < each_value.length; i += 1) {
    		each_blocks[i] = create_each_block(get_each_context(ctx, each_value, i));
    	}

    	const out = i => transition_out(each_blocks[i], 1, 1, () => {
    		each_blocks[i] = null;
    	});

    	const block = {
    		c: function create() {
    			div = element("div");

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}
    			attr_dev(div, "class", "stars");
    			add_location(div, file$3, 8, 2, 133);
    		},

    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].m(div, null);
    			}

    			current = true;
    		},

    		p: function update(changed, ctx) {
    			if (changed.starsArr) {
    				const old_length = each_value.length;
    				each_value = ctx.starsArr;

    				let i;
    				for (i = old_length; i < each_value.length; i += 1) {
    					const child_ctx = get_each_context(ctx, each_value, i);

    					if (each_blocks[i]) {
    						transition_in(each_blocks[i], 1);
    					} else {
    						each_blocks[i] = create_each_block(child_ctx);
    						each_blocks[i].c();
    						transition_in(each_blocks[i], 1);
    						each_blocks[i].m(div, null);
    					}
    				}

    				group_outros();
    				for (i = each_value.length; i < each_blocks.length; i += 1) {
    					out(i);
    				}
    				check_outros();
    			}
    		},

    		i: function intro(local) {
    			if (current) return;
    			for (let i = 0; i < each_value.length; i += 1) {
    				transition_in(each_blocks[i]);
    			}

    			current = true;
    		},

    		o: function outro(local) {
    			each_blocks = each_blocks.filter(Boolean);
    			for (let i = 0; i < each_blocks.length; i += 1) {
    				transition_out(each_blocks[i]);
    			}

    			current = false;
    		},

    		d: function destroy(detaching) {
    			if (detaching) {
    				detach_dev(div);
    			}

    			destroy_each(each_blocks, detaching);
    		}
    	};
    	dispatch_dev("SvelteRegisterBlock", { block, id: create_if_block.name, type: "if", source: "(8:0) {#if count > 0}", ctx });
    	return block;
    }

    // (10:4) {#each starsArr as item}
    function create_each_block(ctx) {
    	var current;

    	var star = new Star({ $$inline: true });

    	const block = {
    		c: function create() {
    			star.$$.fragment.c();
    		},

    		m: function mount(target, anchor) {
    			mount_component(star, target, anchor);
    			current = true;
    		},

    		i: function intro(local) {
    			if (current) return;
    			transition_in(star.$$.fragment, local);

    			current = true;
    		},

    		o: function outro(local) {
    			transition_out(star.$$.fragment, local);
    			current = false;
    		},

    		d: function destroy(detaching) {
    			destroy_component(star, detaching);
    		}
    	};
    	dispatch_dev("SvelteRegisterBlock", { block, id: create_each_block.name, type: "each", source: "(10:4) {#each starsArr as item}", ctx });
    	return block;
    }

    function create_fragment$6(ctx) {
    	var if_block_anchor, current;

    	var if_block = (ctx.count > 0) && create_if_block(ctx);

    	const block = {
    		c: function create() {
    			if (if_block) if_block.c();
    			if_block_anchor = empty();
    		},

    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},

    		m: function mount(target, anchor) {
    			if (if_block) if_block.m(target, anchor);
    			insert_dev(target, if_block_anchor, anchor);
    			current = true;
    		},

    		p: function update(changed, ctx) {
    			if (ctx.count > 0) {
    				if (if_block) {
    					if_block.p(changed, ctx);
    					transition_in(if_block, 1);
    				} else {
    					if_block = create_if_block(ctx);
    					if_block.c();
    					transition_in(if_block, 1);
    					if_block.m(if_block_anchor.parentNode, if_block_anchor);
    				}
    			} else if (if_block) {
    				group_outros();
    				transition_out(if_block, 1, 1, () => {
    					if_block = null;
    				});
    				check_outros();
    			}
    		},

    		i: function intro(local) {
    			if (current) return;
    			transition_in(if_block);
    			current = true;
    		},

    		o: function outro(local) {
    			transition_out(if_block);
    			current = false;
    		},

    		d: function destroy(detaching) {
    			if (if_block) if_block.d(detaching);

    			if (detaching) {
    				detach_dev(if_block_anchor);
    			}
    		}
    	};
    	dispatch_dev("SvelteRegisterBlock", { block, id: create_fragment$6.name, type: "component", source: "", ctx });
    	return block;
    }

    function instance$2($$self, $$props, $$invalidate) {
    	let { count = 5 } = $$props;

    	const writable_props = ['count'];
    	Object.keys($$props).forEach(key => {
    		if (!writable_props.includes(key) && !key.startsWith('$$')) console.warn(`<Stars> was created with unknown prop '${key}'`);
    	});

    	$$self.$set = $$props => {
    		if ('count' in $$props) $$invalidate('count', count = $$props.count);
    	};

    	$$self.$capture_state = () => {
    		return { count, starsArr };
    	};

    	$$self.$inject_state = $$props => {
    		if ('count' in $$props) $$invalidate('count', count = $$props.count);
    		if ('starsArr' in $$props) $$invalidate('starsArr', starsArr = $$props.starsArr);
    	};

    	let starsArr;

    	$$self.$$.update = ($$dirty = { count: 1 }) => {
    		if ($$dirty.count) { $$invalidate('starsArr', starsArr = new Array(count)); }
    	};

    	return { count, starsArr };
    }

    class Stars extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$2, create_fragment$6, safe_not_equal, ["count"]);
    		dispatch_dev("SvelteRegisterComponent", { component: this, tagName: "Stars", options, id: create_fragment$6.name });
    	}

    	get count() {
    		throw new Error("<Stars>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set count(value) {
    		throw new Error("<Stars>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src/components/Partner.svelte generated by Svelte v3.12.0 */

    const file$4 = "src/components/Partner.svelte";

    function create_fragment$7(ctx) {
    	var div4, div0, t0_value = ctx.partner.name + "", t0, t1, div1, img, img_src_value, img_alt_value, t2, div2, t3_value = ctx.partner.description + "", t3, t4, div3, current;

    	var stars = new Stars({
    		props: { count: ctx.partner.stars },
    		$$inline: true
    	});

    	const block = {
    		c: function create() {
    			div4 = element("div");
    			div0 = element("div");
    			t0 = text(t0_value);
    			t1 = space();
    			div1 = element("div");
    			img = element("img");
    			t2 = space();
    			div2 = element("div");
    			t3 = text(t3_value);
    			t4 = space();
    			div3 = element("div");
    			stars.$$.fragment.c();
    			attr_dev(div0, "class", "partner-name");
    			add_location(div0, file$4, 6, 2, 109);
    			attr_dev(img, "src", img_src_value = ctx.partner.logo);
    			attr_dev(img, "alt", img_alt_value = ctx.partner.name);
    			add_location(img, file$4, 8, 4, 189);
    			attr_dev(div1, "class", "partner-logo");
    			add_location(div1, file$4, 7, 2, 158);
    			attr_dev(div2, "class", "partner-description");
    			add_location(div2, file$4, 10, 2, 246);
    			attr_dev(div3, "class", "partner-stars");
    			add_location(div3, file$4, 11, 2, 309);
    			attr_dev(div4, "class", "partner");
    			add_location(div4, file$4, 5, 0, 85);
    		},

    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},

    		m: function mount(target, anchor) {
    			insert_dev(target, div4, anchor);
    			append_dev(div4, div0);
    			append_dev(div0, t0);
    			append_dev(div4, t1);
    			append_dev(div4, div1);
    			append_dev(div1, img);
    			append_dev(div4, t2);
    			append_dev(div4, div2);
    			append_dev(div2, t3);
    			append_dev(div4, t4);
    			append_dev(div4, div3);
    			mount_component(stars, div3, null);
    			current = true;
    		},

    		p: function update(changed, ctx) {
    			if ((!current || changed.partner) && t0_value !== (t0_value = ctx.partner.name + "")) {
    				set_data_dev(t0, t0_value);
    			}

    			if ((!current || changed.partner) && img_src_value !== (img_src_value = ctx.partner.logo)) {
    				attr_dev(img, "src", img_src_value);
    			}

    			if ((!current || changed.partner) && img_alt_value !== (img_alt_value = ctx.partner.name)) {
    				attr_dev(img, "alt", img_alt_value);
    			}

    			if ((!current || changed.partner) && t3_value !== (t3_value = ctx.partner.description + "")) {
    				set_data_dev(t3, t3_value);
    			}

    			var stars_changes = {};
    			if (changed.partner) stars_changes.count = ctx.partner.stars;
    			stars.$set(stars_changes);
    		},

    		i: function intro(local) {
    			if (current) return;
    			transition_in(stars.$$.fragment, local);

    			current = true;
    		},

    		o: function outro(local) {
    			transition_out(stars.$$.fragment, local);
    			current = false;
    		},

    		d: function destroy(detaching) {
    			if (detaching) {
    				detach_dev(div4);
    			}

    			destroy_component(stars);
    		}
    	};
    	dispatch_dev("SvelteRegisterBlock", { block, id: create_fragment$7.name, type: "component", source: "", ctx });
    	return block;
    }

    function instance$3($$self, $$props, $$invalidate) {
    	let { partner = {} } = $$props;

    	const writable_props = ['partner'];
    	Object.keys($$props).forEach(key => {
    		if (!writable_props.includes(key) && !key.startsWith('$$')) console.warn(`<Partner> was created with unknown prop '${key}'`);
    	});

    	$$self.$set = $$props => {
    		if ('partner' in $$props) $$invalidate('partner', partner = $$props.partner);
    	};

    	$$self.$capture_state = () => {
    		return { partner };
    	};

    	$$self.$inject_state = $$props => {
    		if ('partner' in $$props) $$invalidate('partner', partner = $$props.partner);
    	};

    	return { partner };
    }

    class Partner extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$3, create_fragment$7, safe_not_equal, ["partner"]);
    		dispatch_dev("SvelteRegisterComponent", { component: this, tagName: "Partner", options, id: create_fragment$7.name });
    	}

    	get partner() {
    		throw new Error("<Partner>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set partner(value) {
    		throw new Error("<Partner>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src/components/Community.svelte generated by Svelte v3.12.0 */
    const { console: console_1 } = globals;

    const file$5 = "src/components/Community.svelte";

    function get_each_context$1(ctx, list, i) {
    	const child_ctx = Object.create(ctx);
    	child_ctx.partner = list[i];
    	return child_ctx;
    }

    // (16:0) {:else}
    function create_else_block(ctx) {
    	var t;

    	const block = {
    		c: function create() {
    			t = text("no partners..");
    		},

    		m: function mount(target, anchor) {
    			insert_dev(target, t, anchor);
    		},

    		d: function destroy(detaching) {
    			if (detaching) {
    				detach_dev(t);
    			}
    		}
    	};
    	dispatch_dev("SvelteRegisterBlock", { block, id: create_else_block.name, type: "else", source: "(16:0) {:else}", ctx });
    	return block;
    }

    // (14:0) {#each partners as partner}
    function create_each_block$1(ctx) {
    	var current;

    	var partner = new Partner({
    		props: { partner: ctx.partner },
    		$$inline: true
    	});

    	const block = {
    		c: function create() {
    			partner.$$.fragment.c();
    		},

    		m: function mount(target, anchor) {
    			mount_component(partner, target, anchor);
    			current = true;
    		},

    		p: function update(changed, ctx) {
    			var partner_changes = {};
    			if (changed.partners) partner_changes.partner = ctx.partner;
    			partner.$set(partner_changes);
    		},

    		i: function intro(local) {
    			if (current) return;
    			transition_in(partner.$$.fragment, local);

    			current = true;
    		},

    		o: function outro(local) {
    			transition_out(partner.$$.fragment, local);
    			current = false;
    		},

    		d: function destroy(detaching) {
    			destroy_component(partner, detaching);
    		}
    	};
    	dispatch_dev("SvelteRegisterBlock", { block, id: create_each_block$1.name, type: "each", source: "(14:0) {#each partners as partner}", ctx });
    	return block;
    }

    function create_fragment$8(ctx) {
    	var t, div, current;

    	let each_value = ctx.partners;

    	let each_blocks = [];

    	for (let i = 0; i < each_value.length; i += 1) {
    		each_blocks[i] = create_each_block$1(get_each_context$1(ctx, each_value, i));
    	}

    	const out = i => transition_out(each_blocks[i], 1, 1, () => {
    		each_blocks[i] = null;
    	});

    	let each_1_else = null;

    	if (!each_value.length) {
    		each_1_else = create_else_block(ctx);
    		each_1_else.c();
    	}

    	const block = {
    		c: function create() {
    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			t = space();
    			div = element("div");
    			div.textContent = "COOMMUNITY page";
    			add_location(div, file$5, 16, 0, 367);
    		},

    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},

    		m: function mount(target, anchor) {
    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].m(target, anchor);
    			}

    			if (each_1_else) {
    				each_1_else.m(target, anchor);
    			}

    			insert_dev(target, t, anchor);
    			insert_dev(target, div, anchor);
    			current = true;
    		},

    		p: function update(changed, ctx) {
    			if (changed.partners) {
    				each_value = ctx.partners;

    				let i;
    				for (i = 0; i < each_value.length; i += 1) {
    					const child_ctx = get_each_context$1(ctx, each_value, i);

    					if (each_blocks[i]) {
    						each_blocks[i].p(changed, child_ctx);
    						transition_in(each_blocks[i], 1);
    					} else {
    						each_blocks[i] = create_each_block$1(child_ctx);
    						each_blocks[i].c();
    						transition_in(each_blocks[i], 1);
    						each_blocks[i].m(t.parentNode, t);
    					}
    				}

    				group_outros();
    				for (i = each_value.length; i < each_blocks.length; i += 1) {
    					out(i);
    				}
    				check_outros();
    			}

    			if (each_value.length) {
    				if (each_1_else) {
    					each_1_else.d(1);
    					each_1_else = null;
    				}
    			} else if (!each_1_else) {
    				each_1_else = create_else_block(ctx);
    				each_1_else.c();
    				each_1_else.m(t.parentNode, t);
    			}
    		},

    		i: function intro(local) {
    			if (current) return;
    			for (let i = 0; i < each_value.length; i += 1) {
    				transition_in(each_blocks[i]);
    			}

    			current = true;
    		},

    		o: function outro(local) {
    			each_blocks = each_blocks.filter(Boolean);
    			for (let i = 0; i < each_blocks.length; i += 1) {
    				transition_out(each_blocks[i]);
    			}

    			current = false;
    		},

    		d: function destroy(detaching) {
    			destroy_each(each_blocks, detaching);

    			if (each_1_else) each_1_else.d(detaching);

    			if (detaching) {
    				detach_dev(t);
    				detach_dev(div);
    			}
    		}
    	};
    	dispatch_dev("SvelteRegisterBlock", { block, id: create_fragment$8.name, type: "component", source: "", ctx });
    	return block;
    }

    function instance$4($$self, $$props, $$invalidate) {
    	
      let { partners = [] } = $$props;
      onMount(() => {
        api.getPartners().then(data => {
          $$invalidate('partners', partners = data);
          console.log("data..", data);
        });
      });

    	const writable_props = ['partners'];
    	Object.keys($$props).forEach(key => {
    		if (!writable_props.includes(key) && !key.startsWith('$$')) console_1.warn(`<Community> was created with unknown prop '${key}'`);
    	});

    	$$self.$set = $$props => {
    		if ('partners' in $$props) $$invalidate('partners', partners = $$props.partners);
    	};

    	$$self.$capture_state = () => {
    		return { partners };
    	};

    	$$self.$inject_state = $$props => {
    		if ('partners' in $$props) $$invalidate('partners', partners = $$props.partners);
    	};

    	return { partners };
    }

    class Community extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$4, create_fragment$8, safe_not_equal, ["partners"]);
    		dispatch_dev("SvelteRegisterComponent", { component: this, tagName: "Community", options, id: create_fragment$8.name });
    	}

    	get partners() {
    		throw new Error("<Community>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set partners(value) {
    		throw new Error("<Community>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    let routes;
    routes = new Map();
    routes.set('/team', Team);
    routes.set('/community', Community);
    routes.set('/', Home);



    // Catch-all, must be last
    routes.set('*', NotFound);

    var routes$1 = routes;

    /* src/App.svelte generated by Svelte v3.12.0 */

    const file$6 = "src/App.svelte";

    function create_fragment$9(ctx) {
    	var div0, t, div1, current;

    	var nav = new Nav({ $$inline: true });

    	var router = new Router({
    		props: { routes: routes$1 },
    		$$inline: true
    	});

    	const block = {
    		c: function create() {
    			div0 = element("div");
    			nav.$$.fragment.c();
    			t = space();
    			div1 = element("div");
    			router.$$.fragment.c();
    			add_location(div0, file$6, 6, 0, 140);
    			attr_dev(div1, "class", "container-fluid");
    			add_location(div1, file$6, 11, 0, 183);
    		},

    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},

    		m: function mount(target, anchor) {
    			insert_dev(target, div0, anchor);
    			mount_component(nav, div0, null);
    			insert_dev(target, t, anchor);
    			insert_dev(target, div1, anchor);
    			mount_component(router, div1, null);
    			current = true;
    		},

    		p: noop,

    		i: function intro(local) {
    			if (current) return;
    			transition_in(nav.$$.fragment, local);

    			transition_in(router.$$.fragment, local);

    			current = true;
    		},

    		o: function outro(local) {
    			transition_out(nav.$$.fragment, local);
    			transition_out(router.$$.fragment, local);
    			current = false;
    		},

    		d: function destroy(detaching) {
    			if (detaching) {
    				detach_dev(div0);
    			}

    			destroy_component(nav);

    			if (detaching) {
    				detach_dev(t);
    				detach_dev(div1);
    			}

    			destroy_component(router);
    		}
    	};
    	dispatch_dev("SvelteRegisterBlock", { block, id: create_fragment$9.name, type: "component", source: "", ctx });
    	return block;
    }

    class App extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, null, create_fragment$9, safe_not_equal, []);
    		dispatch_dev("SvelteRegisterComponent", { component: this, tagName: "App", options, id: create_fragment$9.name });
    	}
    }

    const app = new App({
    	target: document.body,
    	props: {
    		name: 'world'
    	}
    });

    return app;

}());
//# sourceMappingURL=bundle.js.map
