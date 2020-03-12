// Transcrypt'ed from Python, 2020-03-12 13:08:01
import {AssertionError, AttributeError, BaseException, DeprecationWarning, Exception, IndexError, IterableError, KeyError, NotImplementedError, RuntimeWarning, StopIteration, UserWarning, ValueError, Warning, __JsIterator__, __PyIterator__, __Terminal__, __add__, __and__, __call__, __class__, __envir__, __eq__, __floordiv__, __ge__, __get__, __getcm__, __getitem__, __getslice__, __getsm__, __gt__, __i__, __iadd__, __iand__, __idiv__, __ijsmod__, __ilshift__, __imatmul__, __imod__, __imul__, __in__, __init__, __ior__, __ipow__, __irshift__, __isub__, __ixor__, __jsUsePyNext__, __jsmod__, __k__, __kwargtrans__, __le__, __lshift__, __lt__, __matmul__, __mergefields__, __mergekwargtrans__, __mod__, __mul__, __ne__, __neg__, __nest__, __or__, __pow__, __pragma__, __proxy__, __pyUseJsNext__, __rshift__, __setitem__, __setproperty__, __setslice__, __sort__, __specialattrib__, __sub__, __super__, __t__, __terminal__, __truediv__, __withblock__, __xor__, abs, all, any, assert, bool, bytearray, bytes, callable, chr, copy, deepcopy, delattr, dict, dir, divmod, enumerate, filter, float, getattr, hasattr, input, int, isinstance, issubclass, len, list, map, max, min, object, ord, pow, print, property, py_TypeError, py_iter, py_metatype, py_next, py_reversed, py_typeof, range, repr, round, set, setattr, sorted, str, sum, tuple, zip} from './org.transcrypt.__runtime__.js';
import {chain} from './itertools.js';
var __name__ = '__main__';
export var SolarSystem =  __class__ ('SolarSystem', [object], {
	__module__: __name__,
	planets: (function () {
		var __accu0__ = [];
		for (var [index, planet] of enumerate (tuple ([tuple (['Mercury', 'hot', 2240]), tuple (['Venus', 'sulphurous', 6052]), tuple (['Earth', 'fertile', 6378]), tuple (['Mars', 'reddish', 3397]), tuple (['Jupiter', 'stormy', 71492]), tuple (['Saturn', 'ringed', 60268]), tuple (['Uranus', 'cold', 25559]), tuple (['Neptune', 'very cold', 24766])]))) {
			__accu0__.append (list (chain (planet, tuple ([index + 1]))));
		}
		return __accu0__;
	}) (),
	lines: tuple (['{} is a {} planet', 'The radius of {} is {} km', '{} is planet nr. {} counting from the sun']),
	get __init__ () {return __get__ (this, function (self) {
		self.lineIndex = 0;
	});},
	get greet () {return __get__ (this, function (self) {
		self.planet = self.planets [int (Math.random () * len (self.planets))];
		document.getElementById ('greet').innerHTML = 'Hello {}'.format (self.planet [0]);
		self.explain ();
	});},
	get explain () {return __get__ (this, function (self) {
		document.getElementById ('explain').innerHTML = self.lines [self.lineIndex].format (self.planet [0], self.planet [self.lineIndex + 1]);
		self.lineIndex = __mod__ (self.lineIndex + 1, 3);
	});}
});
export var solarSystem = SolarSystem ();
export var Person =  __class__ ('Person', [object], {
	__module__: __name__,
	get __init__ () {return __get__ (this, function (self, py_name, number) {
		self.ws = new WebSocket ('ws://172.17.0.2:8080/websocket');
		self.ws.onopen = self.onopen;
		self.ws.onmessage = self.onmessage;
		self.ws.onclose = self.onclose;
		self.ws.onerror = self.onerror;
		self._name = py_name;
		self._number = number;
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

//# sourceMappingURL=hello.map