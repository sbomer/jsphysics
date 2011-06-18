function World(id) {
	this.canvas = document.getElementById(id);
	this.canvas.width = this.canvas.offsetWidth;
	this.canvas.height = this.canvas.offsetHeight;
	this.context = this.canvas.getContext('2d');
	this.scale = 40; //pixels per meter
	this.width = this.canvas.width / this.scale;
	this.height = this.canvas.height / this.scale;
	this.origin = new Vector(this.width/2, this.height/2);
	this.framerate = 45; //frames per seconds
	this.dt = 1 / this.framerate; //seconds per frame
	this.shapes = [];
}
World.prototype = {
	add: function(shape) {
		this.shapes.push(shape);
		shape.world = this;
	},
	move: function(dt) {
		for(var i = 0; i < this.shapes.length; i++) {
			this.shapes[i].move(dt);
		}
	},
	draw: function() {
		for(var i = 0; i < this.shapes.length; i++) {
			this.shapes[i].draw();
		}
	},
	clear: function() {
		this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
	},
	update: function() {
		this.move(this.dt);
		this.clear();
		this.draw();
	},
	listen: function() {
		var s = this.scale;
		var o = this.origin;
		var h = this.height;
		var f = function(event) {
			var p = new Vector(event.x/s-o.get(0), h-event.y/s-o.get(1));
			w.add(new Shape(p));
		};
		this.canvas.addEventListener("click", f, false);
	},
	start: function() {
		var w = this;
		var f = function() { w.update(); };
		this.interval = window.setInterval(f, 100*this.dt); //time in ms
		this.listen();
	},
	get: function(i) {
		return this.shapes[i];
	},
	size: function() {
		return this.shapes.length;
	}
}
