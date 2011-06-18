function Shape(position, velocity) {
	this.position = position;
	this.velocity = velocity || new Vector(0, 0);
}
Shape.prototype = {
	force: function() {
		var f = new Vector(0, 0);
		for(var i = 0, j = this.world.size(); i < j; i++) {
			
		}
		return f;
	},
	move: function(dt) {
		this.velocity = this.velocity.plus(this.force().times(dt));
		this.position = this.position.plus(this.velocity.times(dt));
	},
	draw: function() {
		var r = 10;
		var p = this.position;
		var w = this.world;
		var s = w.scale;
		var c = w.context;
		c.beginPath();
		c.arc(s*(p.get(0)+w.width/2), s*(w.height/2-p.get(1)), r, 2*Math.PI, false);
		c.fill();
	}
}
