function Vector(elements) {
	this.elements = Array.prototype.slice.call(arguments) || [];
}
Vector.prototype = {
	get: function(i) {
		return this.elements[i];
	},
	set: function(i, x) {
		this.elements[i] = x;
	},
	join: function(v) {
		var u = new Vector();
		u.elements = this.elements.concat(v.elements);
		return u;
	},
	cut: function(start, length) {
		var u = new Vector();
		u.elements = this.elements.slice(start, start+length);
		return u;
	},
	size: function() {
		return this.elements.length;
	},
	each: function(f) {
		for(var i = 0, j = this.size(); i < j; i++) {
			f(i, this.get(i));
		}
	},
	plus: function(v) {
		var u = new Vector();
		this.each(function(i, e) { u.set(i, e + v.get(i)); });
		return u;
	},
	times: function(c) {
		var u = new Vector();
		this.each(function(i, e) { u.set(i, c*e); });
		return u;
	},
	minus: function(v) {
		return this.plus(v.times(-1));
	},
	dot: function(v) {
		var sum = 0;
		this.each(function(i, e) { sum += e * v.get(i) });
		return sum;
	},
	length: function() {
		return Math.sqrt(this.dot(this));
	},
	normal: function() {
		return this.times(1/this.length());
	},
	angle: function(v) {
		return Math.acos(this.dot(v)/this.length()/v.length());
	}
}
