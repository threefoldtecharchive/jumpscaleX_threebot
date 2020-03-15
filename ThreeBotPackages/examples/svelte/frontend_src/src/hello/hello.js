// Transcrypt'ed from Python, 2020-03-15 21:54:38
import {AssertionError, AttributeError, BaseException, DeprecationWarning, Exception, IndexError, IterableError, KeyError, NotImplementedError, RuntimeWarning, StopIteration, UserWarning, ValueError, Warning, __JsIterator__, __PyIterator__, __Terminal__, __add__, __and__, __call__, __class__, __envir__, __eq__, __floordiv__, __ge__, __get__, __getcm__, __getitem__, __getslice__, __getsm__, __gt__, __i__, __iadd__, __iand__, __idiv__, __ijsmod__, __ilshift__, __imatmul__, __imod__, __imul__, __in__, __init__, __ior__, __ipow__, __irshift__, __isub__, __ixor__, __jsUsePyNext__, __jsmod__, __k__, __kwargtrans__, __le__, __lshift__, __lt__, __matmul__, __mergefields__, __mergekwargtrans__, __mod__, __mul__, __ne__, __neg__, __nest__, __or__, __pow__, __pragma__, __proxy__, __pyUseJsNext__, __rshift__, __setitem__, __setproperty__, __setslice__, __sort__, __specialattrib__, __sub__, __super__, __t__, __terminal__, __truediv__, __withblock__, __xor__, abs, all, any, assert, bool, bytearray, bytes, callable, chr, copy, deepcopy, delattr, dict, dir, divmod, enumerate, filter, float, getattr, hasattr, input, int, isinstance, issubclass, len, list, map, max, min, object, ord, pow, print, property, py_TypeError, py_iter, py_metatype, py_next, py_reversed, py_typeof, range, repr, round, set, setattr, sorted, str, sum, tuple, zip} from './org.transcrypt.__runtime__.js';
import {chain} from './itertools.js';
var __name__ = '__main__';
export var Person =  __class__ ('Person', [object], {
	__module__: __name__,
	get __init__ () {return __get__ (this, function (self, py_name, number) {
		self.ws = new WebSocket (self.ws_url);
		self.ws.onopen = self.onopen;
		self.ws.onmessage = self.onmessage;
		self.ws.onclose = self.onclose;
		self.ws.onerror = self.onerror;
		self._name = py_name;
		self._number = number;
	});},
	get _get_ws_url () {return __get__ (this, function (self) {
		return ((window.location.protocol.py_replace ('http', 'ws') + '//') + window.location.host) + '/svelte_example/websocket';
	});},
	get get_number () {return __get__ (this, function (self) {
		return self._number;
	});},
	get set_number () {return __get__ (this, function (self, value) {
		self._number = value;
		self.ws.send ('set:{}'.format (self.json ()));
	});},
	get get_name () {return __get__ (this, function (self) {
		return self._name;
	});},
	get set_name () {return __get__ (this, function (self, value) {
		self._name = value;
		self.ws.send ('set:{}'.format (self.json ()));
	});},
	get json () {return __get__ (this, function (self) {
		return JSON.stringify (dict ({'name': self.py_name, 'number': self.number}));
	});},
	get onopen () {return __get__ (this, function (self, e) {
		console.log ('opened');
	});},
	get onmessage () {return __get__ (this, function (self, e) {
		console.log (e.data);
	});},
	get onclose () {return __get__ (this, function (self, e) {
		console.log (e);
	});},
	get onerror () {return __get__ (this, function (self, e) {
		console.log (e);
	});}
});
Object.defineProperty (Person, 'name', property.call (Person, Person.get_name, Person.set_name));
Object.defineProperty (Person, 'number', property.call (Person, Person.get_number, Person.set_number));
Object.defineProperty (Person, 'ws_url', property.call (Person, Person._get_ws_url));;
export var Company =  __class__ ('Company', [object], {
	__module__: __name__,
	get success () {return __get__ (this, function (self, data) {
		console.log (data);
	});},
	get fail () {return __get__ (this, function (self, err) {
		console.log (err);
	});},
	get add_company () {return __get__ (this, function (self, data, callback) {
		console.log ('data passed', data);
		return axios.post ('/jumpscale/svelte/model/jumpscale.svelte.company.1', data);
	});},
	get delete_company () {return __get__ (this, function (self, id) {
		jq.ajax (dict ({'url': '/jumoscale/svelte/model/threebot.examples.person.1/' + id, 'type': 'DELETE', 'dataType': 'json', 'contentType': 'application/json', 'success': self.success, 'fail': self.fail}));
	});},
	get list_companies () {return __get__ (this, function (self, py_name) {
		if (typeof py_name == 'undefined' || (py_name != null && py_name.hasOwnProperty ("__kwargtrans__"))) {;
			var py_name = null;
		};
		if (py_name === null) {
			jq.ajax (dict ({'url': '/jumpscale/svelte/model/threebot.examples.person.1', 'type': 'GET', 'dataType': 'json', 'contentType': 'application/json', 'success': self.success, 'fail': self.fail}));
		}
		else {
			jq.ajax (dict ({'url': '/threebot/svelte/model/threebot.examples.person.1?name=' + py_name, 'type': 'GET', 'dataType': 'json', 'contentType': 'application/json', 'success': self.success, 'fail': self.fail}));
		}
	});},
	get update_company () {return __get__ (this, function (self, data) {
		jq.ajax (dict ({'url': '/threebot/svelte/model/threebot.examples.person.1/' + id, 'type': 'POST', 'data': JSON.stringify (data), 'dataType': 'json', 'contentType': 'application/json', 'success': self.success, 'fail': self.fail}));
	});},
	get delete_company () {return __get__ (this, function (self, id) {
		jq.ajax (dict ({'url': '/threebot/svelte/model/threebot.examples.person.1/' + id, 'type': 'DELETE', 'dataType': 'json', 'contentType': 'application/json', 'success': self.success, 'fail': self.fail}));
	});}
});

//# sourceMappingURL=hello.map
