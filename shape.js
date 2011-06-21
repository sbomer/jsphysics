function Shape(position, velocity, mass) {
	this.position = position;
	this.velocity = velocity || new Vector(0, 0);
	this.mass = mass || 1;
	this.radius = Math.pow(this.mass*3/4/Math.PI, 1/3); //radius of 1kg/m^3 sphere
}
Shape.prototype = {
	gravity: function() {
		var f = new Vector(0, 0);
		var w = this.world;
		for(var i = 0, j = w.size(); i < j; i++) {
			var s = w.get(i);
			if(s != this) {
				var r = s.position.minus(this.position);
				var g = r.normal().times(w.G*this.mass*s.mass/r.dot(r));
				f = f.plus(g);
			}
		}
		return f;
	},
	acceleration: function() {
		var f = new Vector(0, 0);
		if(this.world.G > 0) {
			f = f.plus(this.gravity());
		}
		return f.times(1/this.mass);
	},
	derivative: function() {
		return this.velocity.join(this.acceleration());
	},
	getState: function() {
		return this.position.join(this.velocity);
	},
	setState: function(s) {
		this.position = s.cut(0, this.position.size());
		this.velocity = s.cut(this.position.size(), this.velocity.size());
	},
	move: function(h) {
		var s = this;
		s.old = s.getState();
		s.k1 = s.derivative();
		s.setState(s.old.plus(s.k1.times(h/2)));
		s.k2 = s.derivative();
		s.setState(s.old.plus(s.k2.times(h/2)));
		s.k3 = s.derivative();
		s.setState(s.old.plus(s.k3.times(h)));
		s.k4 = s.derivative();
		s.setState(s.old.plus(s.k1.plus(s.k2.plus(s.k3).times(2)).plus(s.k4).times(h/6)));
	},
	intersects: function(shape) {
		var r = shape.position.minus(this.position).length();
		return r < this.radius + shape.radius;
	},
	draw: function() {
		var p = this.position;
		var w = this.world;
		var s = w.scale;
		var c = w.context;
		c.beginPath();
		c.arc(s*(p.get(0)+w.width/2), s*(w.height/2-p.get(1)), s*this.radius, 2*Math.PI, false);
		c.fill();
	}
}
