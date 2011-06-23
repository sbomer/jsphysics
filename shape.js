function Shape(position, velocity, mass) {
	this.position = position;
	this.velocity = velocity || new Vector(0, 0);
	this.mass = mass || 1;
	this.radius = Math.pow(this.mass*3/4/Math.PI, 1/3); //radius of 1kg/m^3 sphere
	this.force = Vector.zero;
}
Shape.prototype = {
	getState: function() {
		return this.position.join(this.velocity);
	},
	setState: function(s) {
		this.position = s.cut(0, this.position.size());
		this.velocity = s.cut(this.position.size(), this.velocity.size());
	},
	distance: function(s) {
		return s.position.minus(this.position);
	},
	gravity: function(s) {
		var r = this.distance(s);
		return r.normal().times(World.G*this.mass*s.mass/r.dot(r));
	 },
	totalGravity: function() {
		var f = Vector.zero;
		var s = this;
		var w = s.world;
		w.pair(function(s, o) { f = f.plus(s.gravity(o)); });
		return f;
	},
	acceleration: function() {
		return this.force.times(1/this.mass);
	},
	derivative: function() {
		return this.velocity.join(this.acceleration());
	},
	move: function(h) {
		var s = this;
		s.old = s.getState();
		s.k1 = s.derivative().times(h);
		s.setState(s.old.plus(s.k1.times(1/2)));
		s.k2 = s.derivative().times(h);
		s.setState(s.old.plus(s.k2.times(1/2)));
		s.k3 = s.derivative().times(h);
		s.setState(s.old.plus(s.k3));
		s.k4 = s.derivative().times(h);
		s.setState(s.old.plus(s.k1.plus(s.k2.plus(s.k3).times(2)).plus(s.k4).times(1/6)));
	},
	intersects: function(s) {
		var d = s.position.minus(this.position);
		var r = this.radius + s.radius;
		return d.dot(d) < r*r;
	},
	impulse: function() {
		var j = new Vector(0, 0);
		var s = this;
		var w = s.world;
		w.each(function(o) {
			if(o != s && s.intersects(o)) {
				var r = o.position.minus(s.position);
				var v = o.velocity.minus(s.velocity).project(r);
				j = j.plus(v.times((w.e+1)/(1/s.mass+1/o.mass)));
			}
		});
		return j;
	},
	draw: function(canvas) {
		var p = this.position;
		var w = this.world;
		var s = w.scale;
		var c = w.context;
		c.beginPath();
		c.arc(s*(p.get(0)+w.width/2), s*(w.height/2-p.get(1)), s*this.radius, 2*Math.PI, false);
		c.fill();
	}
}
