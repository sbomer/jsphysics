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
	size: function() {
		return this.elements.length;
	},
	plus: function(v) {
		var u = new Vector();
		for(var i = 0, j = this.size(); i < j; i++) {
			u.set(i, this.get(i) + v.get(i));
		}
		return u;
	},
	times: function(c) {
		var u = new Vector();
		for(var i = 0, j = this.size(); i < j; i++) {
			u.set(i, c*this.get(i));
		}
		return u;
	},
	minus: function(v) {
		return this.plus(v.times(-1));
	},
	dot: function(v) {
		var sum = 0;
		for(var i = 0, j = this.size(); i < j; i++) {
			sum += this.get(i) * v.get(i);
		}
		return sum;
	},
	length: function() {
		return Math.sqrt(this.dot(this));
	},
	normal: function() {
		return this.times(1/this.length());
	},
	angleTo: function(v) {
		return Math.acos(this.dot(v)/this.length()/v.length());
	}
}
