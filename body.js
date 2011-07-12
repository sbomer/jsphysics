function Body(position, velocity, mass) {
	this.position = position;
	this.velocity = velocity || new Vector(0, 0);
	this.mass = mass || 1;
	this.radius = Math.pow(this.mass*3/4/Math.PI, 1/3); //radius of 1kg/m^3 sphere
        this.j = Vector.zero(2);
        this.aposition = new Vector(0); // radians
        this.avelocity = new Vector(1); // radians per second
}
Body.prototype = {
	getState: function() {
		return this.position.join(this.velocity).join(this.aposition).join(this.avelocity);
	},
	setState: function(s) {
                var i = 0;
		this.position = s.cut(i, this.position.size());
                i += this.position.size();
		this.velocity = s.cut(i, this.velocity.size());
                i += this.velocity.size();
                this.aposition = s.cut(i, this.aposition.size());
                this.aposition.set(0, this.aposition.get(0) % (2*Math.PI));
                i += this.aposition.size();
                this.avelocity = s.cut(i, this.avelocity.size());
	},
	distance: function(s) {
		return s.position.minus(this.position);
	},
	acceleration: function() {
		return this.force.times(1/this.mass);
	},
        torque: function() {
                return new Vector(0);
        },
	derivative: function() {
		return this.velocity.join(this.acceleration()).join(this.avelocity).join(this.torque());
	},
	gravity: function(s) {
		var r = this.distance(s);
		return r.normal().times(World.G*this.mass*s.mass/r.dot(r));
	},
	intersects: function(s) {
		var d = s.position.minus(this.position);
		var r = this.radius + s.radius;
		return d.dot(d) < r*r;
	},
	impulse: function(s) {
		var r = this.distance(s);
		var v = s.velocity.minus(this.velocity).project(r);
		return v.times((World.e+1)/(1/this.mass+1/s.mass));
	},
	draw: function(drawing) {
            drawing.drawCircle(this.position, this.aposition, this.radius);
	}
}