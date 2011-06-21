function World(id, scale, speed) {
	this.canvas = document.getElementById(id);
	this.canvas.width = this.canvas.clientWidth;
	this.canvas.height = this.canvas.clientHeight;
	this.context = this.canvas.getContext('2d');
	this.scale = scale || 40; //pixels per meter, larger zooms in
	this.width = this.canvas.width / this.scale;
	this.height = this.canvas.height / this.scale;
	this.framerate = 30; //frames per second
	this.speed = speed || 1; //larger moves faster
	this.dt = this.speed / this.framerate; //seconds per frame
	this.shapes = [];
	this.G = 6.673e-11;
	this.e = 1;
}
World.prototype = {
	add: function(shape) {
		this.shapes.push(shape);
		shape.world = this;
	},
	each: function(f) {
		for(var i = 0, j = this.size(); i < j; i++) {
			f(this.get(i));
		}
	},
	move: function(h) {
		this.each(function(s) { s.old = s.getState(); });
		this.each(function(s) { s.k1 = s.derivative(); });
		this.each(function(s) { s.setState(s.old.plus(s.k1.times(h/2))); });
		this.each(function(s) { s.k2 = s.derivative(); });
		this.each(function(s) { s.setState(s.old.plus(s.k2.times(h/2))); });
		this.each(function(s) { s.k3 = s.derivative(); });
		this.each(function(s) { s.setState(s.old.plus(s.k3.times(h))); });
		this.each(function(s) { s.k4 = s.derivative(); });
		this.each(function(s) { s.setState(s.old.plus(s.k1.plus(s.k2.plus(s.k3).times(2)).plus(s.k4).times(h/6))); });
		if(this.collides()) {
			var pair = this.collides();
			var s = pair[0];
			var o = pair[1];
			var j = this.impulse(s, o);
			s.velocity = s.velocity.plus(j.times(1/s.mass));
			o.velocity = o.velocity.minus(j.times(1/o.mass));
		}
	},
	draw: function() {
		for(var i = 0, j = this.size(); i < j; i++) {
			this.get(i).draw();
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
	collides: function() {
		for(var i = 0, j = this.size(); i < j; i++) {
			var s = this.get(i);
			if(s.collides()) {
				return [s, s.collides()];
			}
		}
		return false;
	},
	listen: function() {
		var w = this;
		var s = this.scale;
		var add = function(event) {
			var x = event.pageX-w.offset().x-w.canvas.clientLeft;
			var y = event.pageY-w.offset().y-w.canvas.clientTop;
			var p = new Vector(x/s-w.width/2, w.height/2-y/s);
			w.add(new Shape(p));
		};
		this.canvas.addEventListener("click", add, false);
		
		var resize = function() {
			w.resize();
		}
		window.addEventListener("resize", resize, false);
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
	},
	resize: function() {
		this.canvas.width = this.canvas.offsetWidth;
		this.canvas.height = this.canvas.offsetHeight;
		this.width = this.canvas.width / this.scale;
		this.height = this.canvas.height / this.scale;
	},
	offset: function() {
		var c = this.canvas;
		var offsetX = offsetY = 0;
		do {
			offsetX += c.offsetLeft;
			offsetY += c.offsetTop;
		} while(c = c.offsetParent);
		return { x: offsetX, y: offsetY };
	},
	impulse: function(a, b) {
		var r = b.position.minus(a.position);
		var v = a.velocity.plus(b.velocity).project(r);
		return v.times(-(this.e+1)/(1/a.mass+1/b.mass));
	}
}
