function Shape(position, velocity, mass) {
	this.position = position;
	this.velocity = velocity || new Vector(0, 0);
	this.mass = mass || 1;
	this.radius = Math.pow(this.mass*3/4/Math.PI, 1/3);
}
Shape.prototype = {
	acceleration: function() {
		var f = new Vector(0, 0);
		if(this.world.G > 0) {
			f = f.plus(this.gravity());
		}
		return f.times(1/this.mass);
	},
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
	draw: function() {
		var p = this.position;
		var w = this.world;
		var s = w.scale;
		var c = w.context;
		c.beginPath();
		c.arc(s*(p.get(0)+w.width/2), s*(w.height/2-p.get(1)), s*this.radius, 2*Math.PI, false);
		c.fill();
	},
	getState: function() {
		return this.position.join(this.velocity);
	},
	setState: function(s) {
		this.position = s.cut(0, this.position.size());
		this.velocity = s.cut(this.position.size(), this.velocity.size());
	},
	derivative: function() {
		return this.velocity.join(this.acceleration());
	}
}
