function Vector(elements) {
	this.elements = elements || [];
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
	length: function() {
		var sum = 0;
		for(var i = 0, j = this.size(); i < j; i++) {
			sum += this.get(i)*this.get(i);
		}
		return Math.sqrt(sum);
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
	}
}

var v = new Vector([3,4]);

