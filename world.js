function World(id, scale, speed) {
	this.canvas = document.getElementById(id);
	this.canvas.width = this.canvas.offsetWidth;
	this.canvas.height = this.canvas.offsetHeight;
	this.context = this.canvas.getContext('2d');
	this.scale = scale || 40; //pixels per meter, larger zooms in
	this.width = this.canvas.width / this.scale;
	this.height = this.canvas.height / this.scale;
	this.framerate = 45; //frames per second
	this.speed = speed || 1; //larger moves faster
	this.dt = this.speed / this.framerate; //seconds per frame
	this.shapes = [];
	this.G = 6.673e-11;
}
World.prototype = {
	add: function(shape) {
		this.shapes.push(shape);
		shape.world = this;
	},
	move: function(dt) {
		for(var i = 0; i < this.shapes.length; i++) {
			var s = this.shapes[i];
			s.move(dt);
		}
	},
	draw: function() {
		for(var i = 0; i < this.shapes.length; i++) {
			this.get(i).draw();
		}
	},
	clear: function() {
		this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
	},
	update: function() {
		this.move(this.dt);
		//this.clear();
		this.draw();
	},
	listen: function() {
		var w = this;
		var s = this.scale;
		var f = function(event) {
			var p = new Vector(event.offsetX/s-w.width/2, w.height/2-event.offsetY/s);
			w.add(new Shape(p));
		};
		this.canvas.addEventListener("click", f, false);
	},
	start: function() {
		var w = this;
		var f = function() { w.update(); };
		this.interval = window.setInterval(f, 1000 / this.framerate); //ms per frame
	},
	stop: function() {
		clearInterval(this.interval);
	},
	get: function(i) {
		return this.shapes[i];
	},
	size: function() {
		return this.shapes.length;
	}
}
