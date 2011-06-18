function Shape(position, velocity) {
	this.position = position;
	this.velocity = velocity || new Vector(0, 0);
}
Shape.prototype = {
	force: function() {
		var f = new Vector(0, 0);
		for(var i = 0, j = w.size(); i < j; i++) {
			
		}
		return f;
	},
	move: function(dt) {
		this.velocity = this.velocity.plus(this.force().times(dt));
		this.position = this.position.plus(this.velocity.times(dt));
	},
	draw: function() {
		var p = this.position.plus(w.origin);
		var s = this.world.scale;
		var o = this.world.origin;
		var c = this.world.context;
		c.beginPath();
		c.arc(s*p.get(0), s*(w.height-p.get(1)), 10, 2*Math.PI, false);
		c.fill();
	}
}
